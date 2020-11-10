const request = require('request');

const account = process.argv[2];
const depth = process.argv[3];
const baseURL = 'http://127.0.0.1:8080';
const accPPURL = `/accounts/${account}/staking-payouts?depth=${depth}`;

request(`${baseURL + accPPURL}&unclaimedOnly=true`, { json: true }, (err, res, body) => {
	if (err) { return console.error(err); }

	console.log(`Pending Payouts (KSM):`)
	console.log("Account Address:", account);
	console.log("Depth:",depth);
	console.log(body);

	for (let { payouts} of body.erasPayouts) {
		for (let {nominatorStakingPayout} of payouts) {
			console.log(`${parseInt(nominatorStakingPayout) / Math.pow(10, 12)} KSM`) ;
		}

		console.log();
	}
});
