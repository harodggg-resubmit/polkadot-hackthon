const { ApiPromise, WsProvider } = require('@polkadot/api');

const wsProvider = new WsProvider('wss://rpc.polkadot.io');

async function run() {

	const api = await ApiPromise.create( { provider: wsProvider });
	const lastHeader = await api.rpc.chain.getHeader();
	console.log(`last block #${lastHeader.number}`);
}

run();

