import React from 'react';
import styles from '../assets/styles.css'
import {connect} from 'react-redux';


const Footer=(props)=>{
    return (
        (props.auth?
        <footer>
            <div>
                <h2>Let's Keep in Touch!</h2>
                <ul className="contact-list">
                    <li><a href="mailto:email@example.com">email@example.com</a></li>
                    <li><a href="http://twitter.com/" target="_blank">Twitter</a></li>
                    <li><a href="#" target="_blank">LinkedIn</a></li>
                </ul>
            </div>
      </footer>:'')
    )
}

function mapStateToProps(state) {    
  return {
    auth:state.userDetails.userAuth
  }
}

export default connect(mapStateToProps,null)(Footer);