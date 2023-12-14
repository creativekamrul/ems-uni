import {GET_COMPANY_EMPLOYEES, SET_USER_TASKS, SIGN_IN, USER_SET} from "./Actions";
const MainReducer = (state, action) => {
  if ((action.type === SIGN_IN)) {
    return {
      ...state,
      isUserSignedIn: true
    };
  }
  if(action.type === USER_SET){
        return {
          ...state,
          user : action.payload,
          isUserSignedIn : true
        }
  }
  if(action.type === GET_COMPANY_EMPLOYEES){
    const {res} = action.payload
    return {
      ...state,
      companyEmployees: res
    }

  }
  if (action.type === SET_USER_TASKS){
    const data = action.payload
    return {
      ...state,
      userTasks : data
    }
  }
    return { ...state };

};
export default MainReducer;
