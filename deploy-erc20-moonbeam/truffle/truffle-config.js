const PrivateKeyProvider = require ('./private-provider')
var privateKey = "d1b0e6e5cb2e3f1f67c58a1889c19967be8560a572504b91c9c4f78ba864cc04";

module.exports = {
  networks: {
    development: {
      provider: () => new PrivateKeyProvider(privateKey, "http://localhost:9933/", 43),
      network_id: 43
    },
    live: {
	    networkCheckTimeout: 30000,
      provider: () => new PrivateKeyProvider(privateKey, "https://rpc.testnet.moonbeam.network/", 43),
      network_id: 43,
	    timeoutBlocks: 200,
    },
    ganache: {
      provider: () => new PrivateKeyProvider(privateKey, "http://localhost:8545/", 43),
      network_id: 43
    }
  }
}
