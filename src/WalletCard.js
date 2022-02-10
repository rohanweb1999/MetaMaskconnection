import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supportedChains from './SupportedChains'
toast.configure();

const WalletCard = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [chainId, setchainId] = useState();
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");

    const ID = window.ethereum.chainId;

    useEffect(() => {
        if (window.ethereum && window.ethereum.chainId) {
            setchainId(window.ethereum.chainId)
        }
    }, [])
    // const chainId = supportedChains.find((items) => {
    //     return ID === items.chain_id
    // })
    console.log("chainId", chainId);
    const connectWalletHandler = async () => {
        if (window.ethereum) {

            const ID = window.ethereum.chainId;
            const chainId = supportedChains.find((items) => {
                return ID === items.chain_id
            })
            if (ID === '0x1') {
                setchainId(chainId)
                window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(res => {
                        console.log("res", res)
                        accountChangedHandler(res[0]);
                        toast.success("Connected Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                    });
            }
            else {
                toast.error("Invalid Network!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                setDefaultAccount(null);
                setConnButtonText("Connect Wallet");
            }
        }
        else {
            setErrorMessage("Install Metamask");
            toast.error("Install Metamask!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
        setConnButtonText("Wallet Connected");
    }
    const getUserBalance = (address) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
            .then(balance => {
                setUserBalance(ethers.utils.formatEther(balance));
            })
    }

    const chainChangedHandler = (chainId) => {
        if (chainId !== "0x1") {
            toast.error("Invalid Network!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            setDefaultAccount(null);
            setConnButtonText("Connect Wallet");
        } else {
            connectWalletHandler()
        }
    }

    useEffect(() => {

        window.ethereum.on('chainChanged', chainChangedHandler)
        window.ethereum.on('accountsChanged', accountChangedHandler);
    }, [])

    return (
        <div>
            <h1>Connect to Metamask </h1>

            <div>
                <button onClick={connectWalletHandler}>{connButtonText}</button>
                {
                    defaultAccount === null ? null : (
                        <div>
                            <h3>Connected Network: {chainId && chainId.networkName}</h3>
                            <h3>Address: {defaultAccount}</h3>
                            <h3>Balance: {userBalance}</h3>
                            <h3>currency Symbol: {chainId && chainId.currency_symbol}</h3>

                        </div>
                    )
                }
            </div>
            {errorMessage}
        </div>
    )
}

export default WalletCard