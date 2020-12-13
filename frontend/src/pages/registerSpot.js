import React, { Component } from 'react';
import axios from 'axios';

    class CharityRegistrationForm extends Component {
      constructor() {
        super();
        this.state = {
          cname: '',
          location: '',
          email: '',
          description: '',
          file: ''
        };
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

      onChangeFile = (event) => {
      		this.setState({
      			file: event.target.files[0]
      		});
      	}

      onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        var bodyFormData = new FormData();
        //bodyFormData.append('charity', {"cname": this.state.cname, "location": this.state.location,
        //"email": this.state.email, "description": this.state.description, "file": this.state.file});
        bodyFormData.append("cname", this.state.cname);
        bodyFormData.append("location", this.state.location);
        bodyFormData.append("email", this.state.email);
        bodyFormData.append("description", this.state.description);
        bodyFormData.append("file", this.state.file)
        axios({
            method: 'post',
            url: `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/charity`,
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
          .then((result) => {
            console.log(result);
            alert("Charity Registered");
          }).catch((err) =>{
            console.log(err);
          });
      }

      render() {
        const { cname, location, email, description, file } = this.state;
        return (
          <form onSubmit={this.onSubmit}>
          <label>
            Charity Name:
            <input
              type="text"
              name="cname"
              value={cname}
              onChange={this.onChange}
            />
          </label>
            <br/>
            <label>
             Charity Location:
            <input
              type="text"
              name="location"
              value={location}
              onChange={this.onChange}
            />
             </label>
             <br/>
             <label>
             Charity Email:
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.onChange}
            />
            </label>
            <br/>
            <label>
            Charity Description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.onChange}
            />
            </label>
            <br/>
            <label>
            Charity Image:
            <input
              type="file"
              onChange={this.onChangeFile}
            />
            </label>
            <br/>
            <label>
            <input type="submit" value="Submit" />
            </label>
          </form>
        );
      }
    }

     function registerSpot(){
       return (
           <div className="App">
           <CharityRegistrationForm/>
         </div>
       );
     }

export default registerSpot;