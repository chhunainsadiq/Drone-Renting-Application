import C from '../../config/constants'
import { combineReducers } from 'redux'
import quad from '../../quad';
import initialState from '../../initialState.json';


export const PopulateDrones = (state={}, action) => {

  switch(action.type) {
    case C.POPULATE_ALL : 
      return {"JLT":{availableDrones:action.payload,rentedDrones:[]},"BusinessBay":{availableDrones:action.payload,rentedDrones:[]},"InternetCity":{availableDrones:action.payload,rentedDrones:[]}};
    case C.CLEAR_ALL :
      return {};     
    case C.SET_DRONE_ON_RENT:
      let id = action.payload[0];
      let stationName = action.payload[1];
      let drone = state[stationName].availableDrones.find(item=>item.id===id)
      let modifiedAvailableDrones=state[stationName].availableDrones.filter(item=>item.id!==id);
      let changedRentedDrones = state[stationName].rentedDrones.concat(drone);
      return {...state,[stationName]:{availableDrones:modifiedAvailableDrones,rentedDrones:changedRentedDrones}};

    case C.PUT_IN_AVAILABLE:
    
      let modelId = action.payload[0];
      let stationName1 = action.payload[1];
      let droneItem = state[stationName1].rentedDrones.find(item=>item.id===modelId);
      if(droneItem){
        droneItem['charge'] = action.payload[3];
        droneItem['maxFlightTime']=action.payload[2];
        var modifiedAvailableDrones1 =state[stationName1].availableDrones.concat(droneItem);
      }
      let modifiedRentedDrones=state[stationName1].rentedDrones.filter(item=>item.id!==modelId);
      return {...state,[stationName1]:{availableDrones:modifiedAvailableDrones1,rentedDrones:modifiedRentedDrones}};
    default:
      return state
  }

}

export const userAuth=(state=false,action)=>{
  switch(action.type) {
    case C.USER_AUTH : 
      var auth =false;
      return auth =  action.payload;
    case C.CLEAR_AUTH:
      return auth=action.payload;
    default:
      return state;
   } 
}


export const userinfo=(state={},action)=>{
  switch(action.type) {
    case C.USER_INFO : 
      return action.payload
    case C.CLEAR_USER_INFO:
      return action.payload
    default:
      return state;
   } 
}

export const rentedUsers=(state=[],action)=>{
  switch(action.type) {
    case C.PUT_IN_RENTED : 
        let userEmail =action.payload['userEmail'];
        let id =action.payload['id'];
        let stationName =action.payload['stationName'];
        let maxFlightTime =action.payload['maxFlightTime'];
        let charge = action.payload['charge'];
        let timeString = action.payload['time'];

      return [...state,{[userEmail]:[id,stationName,maxFlightTime,charge,timeString]}]   
    case C.Remove_From_RENTED :
        let Email =action.payload['userEmail'];
        let newState = state.filter(item=>item[Email]===undefined);
      return newState;
    default:
      return state;
   } 
}

// export const userTimer=(state=[],action)=>{
//   switch(action.type) {

//     case C.SET_TIMER_VALUE :
//       let email = action.payload['userEmail'];
//       let counterArray = action.payload['counterArray']
//       var index=state.findIndex(item=>item[email]);
//       if(index!==-1){
//         state[index][email]=counterArray;
//         return state;
//       }
//       return [...state,{[email]:[counterArray]}]
//     default:
//       return state;
//    } 
// }



export default combineReducers({
  PopulateDrones,
  userDetails: combineReducers({
    userAuth,
    userinfo
  }),
  rentedUsers,

})




