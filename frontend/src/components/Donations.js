import React, { Component } from 'react'
import axios from 'axios';

export default class Donations extends Component {

  constructor() {
    super();

    this.state = {
      tableData: [{
        id: '',
        email: '',
        paypalId: '',
        amount: '',
      }],
    };
  }

  fetchData = () => {
    axios.get(`http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/charity/donations`, { responseType: 'json' })
      .then(response => {
        this.setState({ tableData: response.data });
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { tableData } = this.state;
    const columns = ['ID', 'Email', 'Paypal Id', 'Amount'];
    return (<div><table align="center"><tbody><tr>
      {columns.map((header) => <th><p>{header}</p></th>)}
    </tr>
      {this.state.tableData.map((row) => {
        return (<tr><td>{row.id}</td><td>{row.email}</td><td>{row.paypalId}</td><td>{row.amount.toString()}</td></tr>);
      })}
    </tbody>
    </table></div>);
  }
}
