import { useReducer } from "react"
import { scheduleReducer, scheduleAction as action } from "../store";
import { axiosInstance as axios } from "../utils";

export const useSchedule = (initialState) => {
  const [state, dispatch] = useReducer(scheduleReducer, initialState);

  const findAll = async (query) => {
    
    dispatch({
      type: action.find.all.start
    });
    
    try {
      const createQueryString = () => {
        let paramsToAdd = [];
        
        if(query.sortBy === 'name') {
          paramsToAdd.push('sortBy=name');
        } else if(query.sortBy === 'date'){
          paramsToAdd.push('sortBy=date');
        }
        
        if(query.direction === 'asc') {
          paramsToAdd.push('direction=asc');
        } else if(query.direction === 'desc'){
          paramsToAdd.push('direction=desc');
        }

        if(query.date_after !== '') {
          paramsToAdd.push(`date_after=${query.date_after}`);
        }
        
        if(query.date_before !== ''){
          paramsToAdd.push(`date_before=${query.date_before}`);
        }
        
        if(paramsToAdd.length === 0) return '';
        
        let queryString = '';
        paramsToAdd.forEach((param, i) => {
          queryString += `${i === 0 ? '?' : '&'}${param}`;
        })
  
        return queryString;
      }
      const res = await axios().get(`/schedules${createQueryString()}`);
      dispatch({
        type: action.find.all.success,
        payload: {
          schedules: res.data.results
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
  
  const archiveByScheduleId = async (schedule_id) => {
    dispatch({
      type: action.archive.by.schedule.id.start
    });
    try {
      const res = await axios().put(`/schedules/${schedule_id}`, {archived: true});
      dispatch({
        type: action.archive.by.schedule.id.success,
        payload: {
          schedule_id: res.data.id
        }
      });
      
    } catch (err) {
      dispatch({
        type: action.archive.by.schedule.id.fail
      });
    }
  }

  
  return {
    state,
    dispatch,
    findAll,
    archiveByScheduleId
  };
}