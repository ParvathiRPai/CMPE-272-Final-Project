import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import tableau from 'tableau-api';


class Dashboard extends Component {
	constructor(props){
		super(props);
		this.handleBack=this.handleBack.bind(this)
	}


	componentDidMount(){
		// this.initViz();
	}

	handleBack(){
		this.props.history.goBack()
	}	
	
	// initViz =() => {
	// 	const options = {
	// 		hideToolbar : true,
	// 	}
	//
	// 	const vizContainer = this.vizContainer;
	// 	this.div = new window.tableau.Viz(vizContainer, process.env.REACT_APP_TABLEAU_URL, options);
	// }

	render(){
		return(
		<div>
		<button onClick ={this.handleBack}>Back</button><br/>
		{/*<div ref = {div => this.vizContainer = div}>*/}
		{/*</div>*/}
		</div>
		)
	}
}

export default Dashboard

