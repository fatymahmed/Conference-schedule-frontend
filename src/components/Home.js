import React from 'react';
import axios from 'axios';
import Registration from './auth/Registration';
import Login from './auth/Login';
import './style.css';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push('/talks');
  }

  handleLogoutClick() {
    axios.delete("http://localhost:3001/logout", 
    { withCredentials: true })
    .then(response => { 
      this.props.handleLogout();
     })
     .catch(error => {
       console.log("logout error", error);
     })
  }
  render() {
    const { user } = this.props;
    if(Object.keys(user).length === 0){
    return(
      <div>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        <p className='signInText'>Already have an account?</p>
        <button >Sign In</button>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    )
    }
    else{
      return(
        <div>
          <p style={{textAlign: 'center', paddingTop: 10}}>You are already logged In</p>
          <button onClick={ () =>this.handleLogoutClick()}>Logout</button>
        </div>
      )
    }
  }
}