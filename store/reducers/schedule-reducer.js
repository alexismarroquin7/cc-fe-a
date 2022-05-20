import { scheduleAction as action } from "../actions";

export const scheduleReducer = (state, {type, payload}) => {
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
        list: payload.schedules
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

    case action.archive.by.schedule.id.start:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      };
    case action.archive.by.schedule.id.success:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          message: ''
        },
        list: state.list.filter(item => item.id !== payload.schedule_id)
      };
    case action.archive.by.schedule.id.fail:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          message: 'an error occured'
        }
      };

    default:
      throw Error(`unkown action: ${type}`);
  }
}