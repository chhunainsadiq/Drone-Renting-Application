import React from 'react';
import {connect} from 'react-redux';
import {populate,clearStations,clearAuth,clearUser} from '../store/actions'
import {bindActionCreators} from 'redux';
import Presentation from '../components/presentation';
import Station from './station';
import { Redirect } from 'react-router-dom'
import styles from '../assets/styles.css'

class Home extends React.Component{
    constructor(props){
        super(props)
        if(!localStorage["redux-store"]){
          console.log('inside called populate');
          this.props.populate();
        }
    }

          
      buttonHandler=(e)=>{
        e.preventDefault();
        this.props.clearAuth();
        this.props.clearUser();
      }

      renderRedirect = () => {
        if (this.props.auth===false) {
          return <Redirect to='/login'/>
        }
      }

    render(){
        return(
            <div>
              {this.renderRedirect()}
              <Station allDrones={this.props.station1} stationName="JLT"/>
              <Station allDrones={this.props.station2} stationName="BusinessBay"/>
              <Station allDrones={this.props.station3} stationName="InternetCity"/>
              <button className="btn logout" onClick={(e)=>{this.buttonHandler(e)}}>LogOut</button>
            </div>
        )
      
    }

}

function mapStateToProps(state) {
    return {
        station1:state.PopulateDrones.JLT,
        station2:state.PopulateDrones.BusinessBay,
        station3:state.PopulateDrones.InternetCity,
        auth:state.userDetails.userAuth
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        populate,
        clearStations,
        clearAuth,
        clearUser
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)
  