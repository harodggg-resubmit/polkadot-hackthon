const {ApiPromise,Keyring,WsProvider} = require('@polkadot/api');

const wsProvider = new WsProvider("ws://127.0.0.1:9944");
const keyring = new Keyring({type:'sr25519'});
const prompt = require('prompt-sync')({sigint: true});
async function main(){
	const api = await ApiPromise.create({provider: wsProvider});
	const hash = api.genesisHash.toHex();
	console.log(hash);
	const alice = keyring.addFromUri('//Alice');
	console.log(alice.toJson());
	const bob = keyring.addFromUri('//Bob');
	const charlie = keyring.addFromUri('//Charlie');
	const dave = keyring.addFromUri('//Dave');
	const eve = keyring.addFromUri('//Eve');
	const ferdie = keyring.addFromUri('//Ferdie');
	const accounts = [alice, bob, charlie, dave, eve, ferdie];


	console.log('The following accounts are available:');
	console.log('1 ------ Alice');
	console.log('2 ------ Bob');
	console.log('3 ----- Charlie');
	console.log('4 -----  Dave');
	console.log('5 -----  Eve');
	console.log('6 -----  Ferdie');

	const signerIndex = prompt('Enter the user sign number: ').trim();
	const signer = accounts[signerIndex - 1];
	const signatories = prompt('Enter the other signatorie(number): ')
		.split(',')
		.map(s => s.trim())
		.filter(s => s.length !== 0)
		.map(i => accounts[i - 1].address);

	const threshold = prompt('Enter approval threshold: ');
	const contents = prompt('Enter remark contents: ');
	const hash_contents= api.tx.system.remark(contents).toHex();
	const back = await api.tx.multisig
		.approveAsMulti(threshold, signatories, null, hash_contents, 0)
		.signAndSend(signer, ({ status }) => {
			console.info("TransactionStatus: " + status.type);
			if (status.isFinalized) {
				console.info("BlockHash: " + status.asFinalized.toString());
				process.exit(0);
			}
		})
		.catch(console.error);
	return back;


}


main().catch(console.error);






