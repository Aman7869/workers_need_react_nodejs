import {createReducer} from '@reduxjs/toolkit';
const initialState = {
    name:"Ramesh",
    age:20,
    status:"coder"
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
})