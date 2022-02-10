const supportedChains = [
    {
        networkName: "Ethereum Mainnet",
        chain_id: "0x1",
        network_id: 56,
        rpc_url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        network_type: "binance",
        currency_symbol: "ETH"
    },
    {
        networkName: "Optimism",
        chain_id: "0x10",
        network_id: 97,
        rpc_url: "https://mainnet.optimism.io/",
        currency_symbol: "OETH"
    },
    {
        networkName: "Metadium Testnet",
        chain_id: "0x12",
        network_id: 78,
        rpc_url: "https://api.metadium.com/dev",
        network_type: "binance",
        currency_symbol: "KAL"
    },
    {
        networkName: "ThunderCore Testnet",
        chain_id: "0x18",
        network_id: 95,
        rpc_url: "https://testnet-rpc.thundercore.com",
        currency_symbol: "TST"
    },
]
export default supportedChains;