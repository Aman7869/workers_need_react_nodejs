// export default (status)=>{
//     return {
//         type:'UPDATE_STATUS',
//         payload: status
//     }
// }

import {createAction} from "@reduxjs/toolkit";
export const updateStatus = createAction("UPDATE_STATUS");