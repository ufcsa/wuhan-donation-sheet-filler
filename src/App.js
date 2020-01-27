import React from 'react';
import { List, InputItem, Button, Picker, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios';

class L extends React.Component {
	constructor() {
		super();
		this.state = {
			method: ''
		};
	}
	onSubmit = () => {
		this.props.form.validateFields({ force: true }, err => {
			if (!err) {
				console.log(this.props.form.getFieldsValue());
				const obj = {
					...this.props.form.getFieldsValue(),
					method: this.props.form.getFieldsValue().method[0]
				};
				console.log(obj);
				axios.post('/api/update', obj).then(res => {
					console.log('callback');
					if (err) {
						console.log('err');
						Toast.fail('Update failed!', 5);
					} else {
						if (res.status === 422) {
							console.log('err');
							Toast.fail('Update failed!', 5);
						} else {
							console.log('suc');
							Toast.success('Update successfully!', 5);
						}
					}
				});
			} else {
				Toast.fail('Missing field(s)!', 2);
			}
		});
	};
	render() {
		const mList = [
			{
				label: 'zelle',
				value: 'zelle'
			},
			{
				label: 'QuickPay',
				value: 'QuickPay'
			},
			{
				label: 'paypal',
				value: 'paypal'
			},
			{
				label: 'Venmo',
				value: 'Venmo'
			}
		];
		const { getFieldProps, getFieldError } = this.props.form;
		return (
			<div>
				<h2 style={{ textAlign: 'center' }}>Wuhan Donation Info</h2>
				<List>
					<InputItem
						{...getFieldProps('name', {
							rules: [{ required: true, message: 'Required!' }]
						})}
						error={!!getFieldError('name')}
						placeholder='name'
					>
						Name
					</InputItem>
					<InputItem
						{...getFieldProps('amount', {
							rules: [{ required: true, message: 'Required!' }]
						})}
						error={!!getFieldError('amount')}
						placeholder='amount'
					>
						Amount
					</InputItem>
					{/* <InputItem
						{...getFieldProps('name', {
							rules: [{ required: true, message: 'Required!' }]
						})}
						error={!!getFieldError('name')}
						placeholder='name'
					>
						Name
					</InputItem>
					<InputItem
						{...getFieldProps('name', {
							rules: [{ required: true, message: 'Required!' }]
						})}
						error={!!getFieldError('name')}
						placeholder='name'
					>
						Name
          </InputItem>
           */}
					<Picker
						data={mList}
						title='payment method'
						value={this.state.method}
						{...getFieldProps('method', {
							rules: [{ required: true, message: 'Required!' }]
						})}
						cols={1}
						extra='choices'
						okText='Done'
						dismissText='Cancel'
						// onChange={v => this.setState({ method: v })}
						// onOk={v => this.setState({ method: v })}
					>
						<List.Item arrow='horizontal'>Method</List.Item>
					</Picker>
					<InputItem
						{...getFieldProps('role', {
							rules: [{ required: true, message: 'Required!' }]
						})}
						error={!!getFieldError('role')}
						placeholder='role(student/staff/alumni)'
					>
						Name
					</InputItem>
					<List.Item>
						<Button type='primary' onClick={this.onSubmit}>
							Submit
						</Button>
					</List.Item>
				</List>
			</div>
		);
	}
}

const App = createForm()(L);

export default App;
