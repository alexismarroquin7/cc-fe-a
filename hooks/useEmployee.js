import { useReducer } from "react"
import { employeeReducer, employeeAction as action } from "../store";
import {axiosInstance as axios } from "../utils";

export const useEmployee = (initialState) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  const findAll = async () => {
    
    dispatch({
      type: action.find.all.start
    });
    
    try {
      const res = await axios().get('/employees');
      dispatch({
        type: action.find.all.success,
        payload: {
          employees: res.data.results
        }
      });
      
    } catch (err) {
      dispatch({
        type: action.find.all.fail,
        payload: {
          error: {
            message: err.response
            ? err.response.data.message
            : err
          }
        }
      });
      
    }
  }

  const logger = ({action, prevState, currState}) => {
    console.log(action, prevState, currState)
  }
  
  return {
    state,
    dispatch,
    findAll
  };
}