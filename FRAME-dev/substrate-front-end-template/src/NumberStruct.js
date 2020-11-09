import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card, Statistic , Button} from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

function Main (props) {
	const { api } = useSubstrate();
	const { accountPair } = props;

	// The transaction submission status
	const [status, setStatus] = useState('');

	// The currently stored value
	const [currentNumber, setCurrentNumber] = useState(0);
	const [formNumber, setFormNumber] = useState(0);

	useEffect(() => {
		let unsubscribe;
		api.query.templateModule.number(newValue => {
			if (newValue.isNone) {
				setCurrentNumber(0)
			} else {
				console.log(newValue)
				setCurrentNumber(newValue.Number.toString())
			}
		}).then(unsub => {
			unsubscribe = unsub;
		})
			.catch(console.error);

		return () => unsubscribe && unsubscribe();
	}, [api.query.templateModule]);

	return (
		<Grid.Column width={8}>
		<h1>Number</h1>
		<Card centered>
		<Card.Content textAlign='center'>
		<Card.Header content={`Number`} />
		<Statistic
		label='number:'
		value={currentNumber}
		/>
		</Card.Content>
		</Card>
		<Form>
		<Form.Field>
		<Input
		label='Number'
		state='please input  number'
		type='number'
		onChange={(_, { value }) => setFormNumber(value)}
		/>
		</Form.Field>
		<Form.Field style={{ textAlign: 'center' }}>
		<TxButton
		accountPair={accountPair}
		label='Save'
		type='SIGNED-TX'
		setStatus={setStatus}
		attrs={{
			palletRpc: 'templateModule',
				callable: 'getNum',
				inputParams: [{"Number": formNumber}],
				paramFields: [true]
		}}
		/>
		</Form.Field>
		<div style={{ overflowWrap: 'break-word' }}>{status}</div>
		</Form>
		</Grid.Column>
	);
}

export default function Number(props) {
	const { api } = useSubstrate();
	return (api.query.templateModule && api.query.templateModule.number
		? <Main {...props} /> : null);
}

