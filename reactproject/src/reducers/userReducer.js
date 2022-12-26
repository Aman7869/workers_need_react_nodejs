import {createReducer} from '@reduxjs/toolkit';
import {updateStatus} from '../reducers/actions';
const initialState = {
    name:"",
    age:20,
    status:"coder",
    email:"",
  }

// export default (state = initialState, action) => {
//     if(action.type == "UPDATE_NAME"){
//         return {
//             ...state,
//             age: action.payload
//         }
//     }
//     return state;

// }

export default createReducer(initialState, (builder)=> {
 builder.addCase("UPDATE_NAME", (state, action)=> {
    state.name = action.payload
 })
 builder.addCase("UPDATE_EMAIL", (state, action)=> {
    state.email = action.payload
 })
 builder.addCase(updateStatus, (state, action)=> {
    state.status = action.payload
 })
})