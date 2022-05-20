import { employeeAction as action } from "../actions";

export const employeeReducer = (state, {type, payload}) => {
  switch(type){
    case action.find.all.start:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      }
    case action.find.all.success:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          message: ''
        },
        list: payload.employees
      }
    case action.find.all.fail:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          message: ''
        }
      }
    default:
      throw Error(`unkown action: ${type}`);
  }
}