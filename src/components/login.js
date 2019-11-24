import React, { useState, useEffect } from 'react'
import {ToastsContainer, ToastsStore } from 'react-toasts'
import { authenticateUser, userDetails } from '../store/actions'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { SignUp } from './signup';
import styles from '../assets/styles.css'

class Login extends React.Component {
  state = {
      email: '',
      password: '',
    
  }
 
  handleFormSubmit( event ) {
      event.preventDefault();
      this.props.authenticateUser(this.state.email,this.state.password);
      if(this.props.auth ===false){
        ToastsStore.error('Wrong Email or Password');
      }
  }

  renderRedirect = () => {
    if (this.props.auth===true) {
        this.props.userDetails(this.state.email,this.state.password);
      return <Redirect to='/'/>
    }
  }

  sighUpClick=(e)=>{
    e.preventDefault();
    this.props.history.push("/signup");
  }

  render(){
      return (
       <div className="login_container" align="center">
         <ToastsContainer store={ToastsStore}/>  
        {this.renderRedirect()}
        <form>
            <label>Email</label>
            <input type="email" name="email" value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}/><br/>

            <label>Password</label>
            <input type="password" name="password" value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}/><br/>

            <input className="btn"  type="submit" onClick={e => this.handleFormSubmit(e)} value="Login" />
        </form>
        <button className="btn" onClick={e => this.sighUpClick(e)}>SignUp</button>
      </div>
      );
  }
}


function mapStateToProps(state) {    
   
  return {
    auth:state.userDetails.userAuth
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({authenticateUser,userDetails}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)




