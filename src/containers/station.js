import React from 'react';
import { Link } from  'react-router-dom'
import {connect} from 'react-redux';
import {ToastsContainer, ToastsStore } from 'react-toasts'
import { setDroneOnRent ,putUserInRentedList} from '../store/actions'
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router-dom'
import styles from '../assets/styles.css'



class Station extends React.Component{
    
    constructor(props){
        super(props)
    }

    onClickHandler=(e,stationName,userEmail,maxFlightTime,charge)=>{
        e.preventDefault();
        if(charge==='0%'){
            ToastsStore.error('Sorry,Charging is too low for this Drone');
        }else{
            let id = e.target.id;
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            this.props.setDroneOnRent(id,stationName);
            this.props.putUserInRentedList(stationName,id,userEmail,maxFlightTime,charge,time);

        }

    }

    renderRedirect = () => {
        
        let rentedUsers = this.props.userStatus;
        let userEmail = this.props.userEmail;
        if (rentedUsers) {
            let userExists = rentedUsers.find(item=>item[userEmail]);
            if(userExists){
                return <Redirect to='/countDown'/>
            }
          
        }
    }

    showStationDrones = (allDrones) => {
        if(allDrones){     
            if(allDrones.availableDrones){
                return(
                    allDrones.availableDrones.map((item)=>{
                        return (
                            <div className="drone-item" key={item.id}>
                                {this.renderRedirect()}
                                <h2>{item.model}</h2><br/>
                                <label>Manufacturer: </label>
                                {item.manufacturer}<br/> 
                                <label>Charging Available: </label>
                                {item.charge}<br/>
                                <label>Flight Time: </label>
                                {item.maxFlightTime}<br/>
                                <button className="btn" name={item.model} id={item.id} onClick={(e)=>{this.onClickHandler(e,this.props.stationName,this.props.userEmail,item.maxFlightTime,item.charge)}}>Take on Rent</button>
                                <ToastsContainer store={ToastsStore}/>
                            </div>
                        )    
                    })
                )
            }    
        }else{
            return(
                <div>
                     <h2>Sorry,this station don't have Any Drone Available for Now</h2><br/>
                </div>
            )
        }
    }

    render(){
        return (
            <div className="station_header">
                <h3>{`Station ${this.props.stationName} `}</h3>
                <div className="station_grid">
                    {this.showStationDrones(this.props.allDrones)}
                </div>
            </div>        
        )
    }

}


function mapStateToProps(state) {
    return {
        userEmail:state.userDetails.userinfo.email,
        userStatus:state.rentedUsers
    }
}

function mapDispatchToProps(dispatch) {
return bindActionCreators({
    setDroneOnRent,
    putUserInRentedList
}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Station)