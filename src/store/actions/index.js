import C from '../../config/constants'
import Mock from '../../quad.js';


export function authenticateUser(email,password){
    let registeredUsers = localStorage["RegisteredUsers"]?JSON.parse(localStorage["RegisteredUsers"]):Mock.users;
    var user = registeredUsers.find((el)=>el.email===email && el.password===password);
    if(user){
       var auth=true
    }else{
        var auth=false
    }

    return{
        type:C.USER_AUTH,
        payload:auth
    }
}

export function userDetails(email,password){
    
   
    let registeredUsers = localStorage["RegisteredUsers"]?JSON.parse(localStorage["RegisteredUsers"]):Mock.users;
    var user = registeredUsers.find((el)=>el.email===email && el.password===password);
    if(user){
        user={name:user.firstName,email:user.email}
    }else{
        user={}
    }

    return{
        type:C.USER_INFO,
        payload:user
    }
}

export function clearAuth() {

    return {
        type: C.CLEAR_AUTH,
        payload: false
    }

}

export function clearUser() {

    return {
        type: C.CLEAR_USER_INFO,
        payload: {}
    }

}

export function populate() {

    return {
        type: C.POPULATE_ALL,
        payload: Mock.quads
    }

}

export function clearStations() {

    return {
        type: C.CLEAR_ALL,
        payload: {}
    }

}

export function setDroneOnRent(id,stationName){
    return {
        type:C.SET_DRONE_ON_RENT,
        payload:[id,stationName]
    }
}

export function putUserInRentedList(stationName,id,userEmail,maxFlightTime,charge,time){
   
    return {
        type:C.PUT_IN_RENTED,
        payload:{id,stationName,userEmail,maxFlightTime,charge,time}
    }
}


export function removeUserFromRentedList(userEmail){

    return {
        type:C.Remove_From_RENTED,
        payload:{userEmail}
    }
}

export function putInAvailableDrone(droneInfo){

    return {
        type:C.PUT_IN_AVAILABLE,
        payload:droneInfo
    }
}




