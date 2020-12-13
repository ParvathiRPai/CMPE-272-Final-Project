import React, { Component } from 'react';
import Dashboard from "./Dashboard";
import { withOktaAuth } from '@okta/okta-react';
import styled from 'styled-components';
import AllCharities from "../components/AllCharities";
import Donations from "../components/Donations";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: darkslateblue;
`;

const H2 = styled.h2`
  font-size: 23px;
  font-weight: bold;
  color: darkslateblue;
`;

async function checkUser() {
	if (this.props.authState.isAuthenticated && !this.state.userInfo) {
		const userInfo = await this.props.authService.getUser();
		let apiToken = this.props.apiToken;
		const request = async () => {
			const response = await fetch(`${this.props.hostName}/api/v1/users/${userInfo.sub}/groups`,
				{
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': `SSWS ${apiToken}`
					},
				});
			const json = await response.json();
			userInfo.groups = json;
			userInfo.isAdmin = userInfo.groups.filter(group => group.profile.name == "theAdmins").length == 1;
			if (this._isMounted) {
				this.setState({ userInfo });
			}
		};
		request();
	}
}

export default withOktaAuth(class AdminDashboard extends Dashboard {

	_isMounted = false;

	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.state = { userInfo: null };
		this.checkUser = checkUser.bind(this);
	}

	async login() {
		this.props.history.push('/login');
	}

	async logout() {
		this.props.authService.logout('/');
	}

	async componentDidMount() {
		this._isMounted = true;
		this.checkUser();
	}

	async componentDidUpdate() {
		this._isMounted = true;
		this.checkUser();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}



	render() {
		if (this.props.authState.isPending) return null;
		return (
			<div>
				{this.props.authState.isAuthenticated && this.state.userInfo && (
					<div>
						<div>
							{this.state.userInfo.isAdmin && (
								<h1>Hello - esteemed admin. Welcome to thy wonderful dashboard</h1>
							)}
						</div>
						<div>
						  Charities
							<AllCharities />
						</div>
						<div>
						  Donations
							<Donations />
						</div>
					</div>
				)}
			</div>
		);
	}
});
