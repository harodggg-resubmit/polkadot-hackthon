import React, { useState } from 'react';
import { Button, Form, Input, Grid, Label, Icon } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';
import ErcContract, { defaultGasLimit } from './Erc20Contract';

export default function Main (props) {
	const { api, keyring } = useSubstrate();
	const [formState, setFormState] = useState({ addressTo: null, amount: 0 });
	const { accountPair } = props;
	const ercContract = ErcContract(api);

	const onChange = (_, data) =>
		setFormState(prev => ({ ...prev, [data.state]: data.value }));

	const { addressTo, amount } = formState;

	const onClickHandler = async () => {
		await ercContract.tx
			.transfer(0, defaultGasLimit, addressTo, amount)
			.signAndSend(accountPair);
	}

	return (
		<Grid.Column width={8}>
		<h1>ERC20 Transfer</h1>
		<h3>
		After submitting, please refresh your browser...
		</h3>
		<Form>
		<Form.Field>
		<Label basic color='teal'>
		<Icon name='hand point right' />
		1 Unit = 1000000000000000
		</Label>
		</Form.Field>
		<Form.Field>Transfer more than the existential amount for account with 0 balance</Form.Field>
		<Form.Field>
		<Input
		fluid
		label='To'
		type='text'
		placeholder='address'
		state='addressTo'
		onChange={onChange}
		/>
		</Form.Field>
		<Form.Field>
		<Input
		fluid
		label='Amount'
		type='number'
		state='amount'
		onChange={onChange}
		/>
		</Form.Field>
		<Form.Field style={{ textAlign: 'center' }}>
		<Button onClick = {onClickHandler}>Submit</Button>
		</Form.Field>
		<div style={{ overflowWrap: 'break-word' }}>{status}</div>
		</Form>
		</Grid.Column>
	);
}

