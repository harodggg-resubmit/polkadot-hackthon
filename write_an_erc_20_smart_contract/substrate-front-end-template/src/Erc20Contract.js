import metadata from './Erc20Metadata.json';
import {Abi, ContractPromise} from "@polkadot/api-contract";

export const defaultGasLimit = 300000n * 1000000n;
const ErcContractAddress = '5DCYF7b58FWKdvCdUjUTyssURg3vDCgL3r9H6RM38jWKn6nQ';

export default function Erc(api) {
	const abi = new Abi(metadata);
	return new ContractPromise(api,abi, ErcContractAddress);
}

export function displayErc(balance) {
	return balance.toString() + 'ERC20';
}
