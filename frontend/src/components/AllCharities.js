import React, { Component } from 'react'
import axios from 'axios';

export default class AllCharities extends Component {

  constructor() {
    super();

    this.state = {
      tableData: [{
        id: '',
        cname: '',
        location: '',
        email: '',
        description: '',
        approved: '',
      }],
    };
  }

  fetchData = () => {
    axios.get(`http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/charity`, { responseType: 'json' })
      .then(response => {
        this.setState({ tableData: response.data });
      })
  }

  updateData = (id) => {
    axios.put(`http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/charity/charity_approval/` + id, { responseType: 'json' })
      .then(response => {
        this.fetchData();
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { tableData } = this.state;
    const columns = ['ID', 'Name', 'Location', 'Email', 'Desc', 'Approved', 'Admin Action'];
    return (<div><table align="center"><tbody><tr>
      {columns.map((header) => <th><p>{header}</p></th>)}
    </tr>
      {this.state.tableData.map((row) => {
        return (<tr><td>{row.id}</td><td>{row.cname}</td><td>{row.location}</td><td>{row.email}</td><td>{row.description}</td><td>{row.approved.toString()}</td><td><button type="button" onClick={() => { this.updateData(row.id) }}>Approve!</button></td></tr>);
      })}
    </tbody>
    </table></div>);
  }
}
