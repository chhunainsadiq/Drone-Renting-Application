import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import {clearAuth,clearUser,putInAvailableDrone,removeUserFromRentedList} from '../store/actions'
import styles from '../assets/styles.css'

class CountDown extends React.Component {
    constructor(props){
        super(props);
        this.state={
            hours: '',
            minutes:'',
            seconds:'',
            Handler:()=>{},
            counter:0
        }
    }

    componentDidMount(){
        var intervalHandler=setInterval(()=>{
           var counterArray=this.calculateCounter();
           let appendedCounterArray = counterArray.map((item)=>{
                   if(item<10){
                       return '0'+item;
                   }
                   return item;
               })
           this.setState({hours:appendedCounterArray[0]})
           this.setState({minutes:appendedCounterArray[1]})
           this.setState({seconds:appendedCounterArray[2]})
       },1000);
       //intervalHandler
       this.setState({Handler:intervalHandler})
    }

    buttonHandler=(e)=>{
        e.preventDefault();
        this.props.clearAuth();
        this.props.clearUser();
        clearInterval(this.state.Handler);
    }

    returnButtonHandler=(e)=>{
        e.preventDefault();
        let droneInfo = this.props.rentedUsers.find(item=>item[this.props.userEmail]);
        let remainingPercentage = this.calculateFlightTime();
        droneInfo[this.props.userEmail][3]=remainingPercentage;
        droneInfo[this.props.userEmail][2]=this.state.minutes+'min';      
        this.props.putInAvailableDrone(droneInfo[this.props.userEmail]);
        this.props.removeUserFromRentedList(this.props.userEmail);
        clearInterval(this.state.Handler);
    }

    calculateFlightTime=()=>{
        let droneDetail = this.props.rentedUsers.find(item=>item[this.props.userEmail]);
        if(droneDetail){
            droneDetail=droneDetail[this.props.userEmail];
            let maxTimeFlight = droneDetail[2];
    
            let percentage = droneDetail[3];
            let minAllowed =parseInt(maxTimeFlight.split('m')[0]);
            let percentageValue =parseInt(percentage.split('%')[0]);
            let perMinutePercentageRequire =percentageValue/minAllowed;
            perMinutePercentageRequire=perMinutePercentageRequire.toFixed(2);
            let minutesRemaining = this.state.minutes;
            let percentageModified =  Math.ceil(perMinutePercentageRequire*minutesRemaining);
            return percentageModified+'%';
        
        }    
    }

    renderRedirect = () => {
        if (this.props.auth===false) {
          return <Redirect to='/login'/>
        }
        let rentedUsers = this.props.rentedUsers;
        let userEmail = this.props.userEmail;
        if (rentedUsers) {
            let userExists = rentedUsers.find(item=>item[userEmail]);
            if(!userExists){
                return <Redirect to='/'/>
            }
          
        }
    }

    calculateTimeAllowed =()=>{
        let droneDetail = this.props.rentedUsers.find(item=>item[this.props.userEmail]);
        
        if(droneDetail){
            droneDetail=droneDetail[this.props.userEmail];
            let droneRentingTime = droneDetail[4];
            let maxTimeFlight = droneDetail[2];
            let minAllowed =parseInt(maxTimeFlight.split('m')[0]);
            let droneRentingTimeArray=droneRentingTime.split(':');
            let minutes = parseInt(droneRentingTimeArray[1])+minAllowed;
            let timeArray=droneRentingTimeArray.map((item,i)=>{
                if(i==1){
                    return minutes;
                }
                return parseInt(item);
            })

            if(minutes>60){
                timeArray[0]= parseInt(droneRentingTimeArray[0])+1;
                let min = minutes %60;
                timeArray[1]=min;
                timeArray[2]=parseInt(droneRentingTimeArray[2]);
            }

            return timeArray;
        }
    }

   

    calculateCounter=()=>{
        var timeArray = this.calculateTimeAllowed();
        if(timeArray){
            var today = new Date();
            var toMinus = false;
            var toMinuteMinus = false;
            var counterArray = timeArray.map((item,i)=>{
                if(i==0)
                return item-today.getHours();
                else if(i==1){
                    var currentMinutes=today.getMinutes();
                    var mins=item-currentMinutes;
                    var currentSec=today.getSeconds();
                    if(mins<0){
                        toMinus = true;
                        return (60-currentMinutes)+item
                    }else{
                        return mins;
                    }
                }else if(i==2){
                    var currentSec=today.getSeconds();
                    if(currentSec>item){
                        toMinuteMinus= true;
                    }
                    var secs=item-currentSec;
                    if(secs<0){
                        return (60-currentSec)+item
                    }
                    else{
                        return secs;
                    }
                }
                
            })

            if(toMinus){
                counterArray[0]-=1;
            }
            if(toMinuteMinus){
                counterArray[1]-=1;
            }
                return counterArray;
        }
        
    }

    checkStatus=()=>{
        var timeArray = this.calculateTimeAllowed();
        if(timeArray){
            var timeString = timeArray[0]+":"+timeArray[1]+":"+timeArray[2];
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            if(timeString==time){ 
                let droneInfo = this.props.rentedUsers.find(item=>item[this.props.userEmail]);
                if(droneInfo){
                    droneInfo[this.props.userEmail][2]='0min';
                    droneInfo[this.props.userEmail][3]='0'+'%';
                    this.props.putInAvailableDrone(droneInfo[this.props.userEmail]);
                    this.props.removeUserFromRentedList(this.props.userEmail);
                    clearInterval(this.state.Handler);
                }
            }
        }
    }

    render(){
        return(
            <div className="countdown">
                {this.renderRedirect()} 
                {this.checkStatus()}
                <h2>Hours:Minutes:seconds</h2>
                {(this.state.minutes!==''?<h1>{`${this.state.hours}:${this.state.minutes}:${this.state.seconds}`}</h1>:'')}
                <button className="btn"  onClick={(e)=>{this.buttonHandler(e)}}>LogOut</button>
                <button className="btn" onClick={(e)=>{this.returnButtonHandler(e)}}>Return Drone</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth:state.userDetails.userAuth,
        userEmail:state.userDetails.userinfo.email,
        rentedUsers:state.rentedUsers,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearAuth,
        clearUser,
        putInAvailableDrone,
        removeUserFromRentedList,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CountDown)
