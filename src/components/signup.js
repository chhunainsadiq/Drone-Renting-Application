import React from 'react';
import  Mock  from '../quad.js';
import { Login } from './login';
import validateEmail from '../config/utils';
import {ToastsContainer, ToastsStore } from 'react-toasts'
import styles from '../assets/styles.css'

class SignUp extends React.Component {

    constructor(props){
        super(props);

        this.state= {
            firstName:'',
            lastName:'',
            email:'',
            phoneNum:'',
            password:'',
        }

    }

    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(validateEmail(this.state.email));
        if (this.state.firstName.trim().length === 0) {
            ToastsStore.error('First name can not be empty')
            this.setState({password:''});
          } else if (this.state.email.trim().length !== 0 && !validateEmail(this.state.email)) {
            ToastsStore.error('Invalid Email address format')
            this.setState({password:''});
            this.setState({email:''});
          } else if(this.state.email.trim().length === 0 ){
            ToastsStore.error('Email can not be empty')
          } else if (this.state.password.trim().length === 0) {
            ToastsStore.error('password can not be empty')
          } else if (this.state.password.trim().length < 4) {
            ToastsStore.error('minimum password length is 5')
            this.setState({password:''});
          } else if(localStorage["RegisteredUsers"]){
            let users =  JSON.parse(localStorage["RegisteredUsers"]);
            var alreadyExisting = users.find(item=>item.email===this.state.email);
            if(alreadyExisting){
                ToastsStore.error('Already Existing users');
                this.setState({password:''});
                this.setState({email:''});
            }else{
            users.push(this.state);
            localStorage["RegisteredUsers"] = JSON.stringify(users);
            this.props.history.push("/login");
            }
         }else{
            let users= Mock.users;
            var alreadyExisting = users.find(item=>item.email===this.state.email);
            if(alreadyExisting){
                ToastsStore.error('Already Existing users');
                this.setState({password:''});
                this.setState({email:''});
            }else{
                users.push(this.state)
                localStorage["RegisteredUsers"] = JSON.stringify(users);
                this.props.history.push("/login");
            }
         }
    }

    loginClick=(e)=>{
        e.preventDefault();
        this.props.history.push("/login");
    }


    render(){
        return(
        <div align="center">
              <ToastsContainer store={ToastsStore}/>    
            <form>
                <label>First Name</label>
                <input type="text" name="firstName" value={this.state.firstName}
                    onChange={e => this.setState({ firstName: e.target.value })}/><br/>

                <label>Last Name</label>
                <input type="text" name="lastName" value={this.state.lastName}
                    onChange={e => this.setState({ lastName: e.target.value })}/><br/>
        

                <label>Email</label>
                <input type="email" name="email" value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}/><br/>

                
                <label>Phone</label>
                <input type="text" name="PhoneNum" value={this.state.phoneNum}
                    onChange={e => this.setState({ phoneNum: e.target.value })}/><br/>

                <label>Password</label>
                <input type="password" name="Password" value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}/><br/>    

                <input className="btn" type="submit" onClick={e => this.handleSubmit(e)} value="Register" />
            </form>
            <button className="btn" onClick={e => this.loginClick(e)}>Login</button>
        </div>
        )
    }

}

export default SignUp;