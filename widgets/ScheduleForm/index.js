import styled from "styled-components"
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils";
import { useRouter } from "next/router";

const initialValues = {
  employee: {
    id: ''
  },
  date: {
    start: {
      date: '',
      hr: '12',
      min: '00',
      timeOfDay: ''
    },
    end: {
      date: '',
      hr: '12',
      min: '00',
      timeOfDay: ''
    }
  },
  duration: '0'
}

const StyledScheduleForm = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  width: 100%;

  
  .StyledScheduleForm__Container {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    gap: 1rem;
  }
  
  .StyledScheduleForm__Container__Row {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 100%
  }
`;

const createHrs = () => {
  let hrs = [{text: "12"}];
  const len = 11;
  for(let i = 0; i<len; i++){
    let num = i + 1;

    if(num < 10){
      num = `0${num}`
    } else {
      num = `${num}`
    }

    hrs.push({
      text: num
    });
  }

  return hrs;
}

const createMins = () => {
  let mins = [];
  const len = 60;
  for(let i = 0; i<len; i++){
    let num = i;

    if(num < 10){
      num = `0${num}`
    } else {
      num = `${num}`
    }

    mins.push({
      text: num
    });
  }

  return mins;
}

const initialOptions = {
  employees: [],
  timeOfDay: [
    {
      name: '--select--',
      value: '',
    },
    {
      name: 'AM',
      value: 'AM'
    },
    {
      name: 'PM',
      value: 'PM'
    }
  ],
  hrs: createHrs(),
  mins: createMins()
}

export const ScheduleForm = ({props}) => {
  const [values, setValues] = useState(initialValues);
  const [options, setOptions] = useState(initialOptions);
  const [status, setStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance().get('/employees');
        

        setOptions(o => {
          return {
            ...o,
            employees: [
              {
                id: 0,
                name: '--select--'
              },
              ...res.data.results.map(emp => {
                return {
                  name: emp.properties.name.title[0].text.content,
                  id: emp.id
                }
              })
            ]
          }
        });

      } catch (err) {
        console.log(err);
      }
    }

    if(values.date.start.date === ''){
      const date = new Date();
      const year = date.getFullYear();
      const currdate = date.getDate();
      const month = date.getMonth() + 1;

      setValues(v => {
        return {
          ...v,
          date: {
            ...v.date,
            start: {
              ...v.date.start,
              date: `${year}-${month < 10 ? '0' : ''}${month}-${currdate < 10 ? '0' : ''}${currdate}`
            }
          }
        }
      });
    }
    
    if(values.date.end.date === ''){
      const date = new Date();
      const year = date.getFullYear();
      const currdate = date.getDate();
      const month = date.getMonth() + 1;

      setValues(v => {
        return {
          ...v,
          date: {
            ...v.date,
            end: {
              ...v.date.end,
              date: `${year}-${month < 10 ? '0' : ''}${month}-${currdate < 10 ? '0' : ''}${currdate}`
            }
          }
        }
      });
    }
    
    fetchEmployees();
  }, []);

  const handleChange = e => {
    const {name, value} = e.target;
    if(name === 'employee'){
      setValues({
        ...values,
        employee: {
          id: value
        }
      });
    } else if (name === 'startDate'){
      setValues({
        ...values,
        date: {
          ...values.date,
          start: {
            ...values.date.start,
            date: value
          },
          end: {
            ...values.date.end,
            date: value
          }
        }
      });
    } else if (name === 'endDate'){
      setValues({
        ...values,
        date: {
          ...values.date,
          end: {
            ...values.date.end,
            date: value
          }
        }
      });

    } else if (name === 'startDateHr'){
      setValues({
        ...values,
        date: {
          ...values.date,
          start: {
            ...values.date.start,
            hr: value
          }
        }
      });

    } else if (name === 'endDateHr'){
      setValues({
        ...values,
        date: {
          ...values.date,
          end: {
            ...values.date.end,
            hr: value
          }
        }
      });
    
    } else if (name === 'startDateMin'){
      setValues({
        ...values,
        date: {
          ...values.date,
          start: {
            ...values.date.start,
            min: value
          }
        }
      });

    } else if (name === 'endDateMin'){
      setValues({
        ...values,
        date: {
          ...values.date,
          end: {
            ...values.date.end,
            min: value
          }
        }
      });
    } else if (name === 'startDateTimeOfDay'){
      setValues({
        ...values,
        date: {
          ...values.date,
          start: {
            ...values.date.start,
            timeOfDay: value
          }
        }
      });
    } else if (name === 'endDateTimeOfDay'){
      setValues({
        ...values,
        date: {
          ...values.date,
          end: {
            ...values.date.end,
            timeOfDay: value
          }
        }
      });
    
    } else if (name === 'duration'){
      setValues({
        ...values,
        duration: value
      });

    }
  }

  useEffect(() => {
    if(status !== 'success') return;
    router.push('/schedules');
  }, [router, status]);

  const handleSubmit = e => {
    e.preventDefault();
    const createSchedule = async () => {
      setStatus('loading');

      try {
        const res = await axiosInstance()
        .post(
          '/schedules',
          {
            employee_id: values.employee.id,
            date: {
              // use ISO format
              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
              start: `${values.date.start.date}T${values.date.start.timeOfDay === 'PM' ? `${Number(values.date.start.hr) + 12}` : `${values.date.start.hr}`}:${values.date.start.min}:00.000Z`,
              end: `${values.date.end.date}T${values.date.end.timeOfDay === 'PM' ? `${Number(values.date.end.hr) + 12}` : `${values.date.end.hr}`}:${values.date.end.min}:00.000Z`,
              time_zone: 'America/Los_Angeles'
            },
            duration: Number(values.duration)
          }
        );
        setStatus('success');
        
      } catch (err) {
        setStatus('fail');

      }

    }
    
    createSchedule();

  }
  
  return <StyledScheduleForm 
    {...props} 
    onSubmit={handleSubmit}
  >
    <div className="StyledScheduleForm__Container">
  
      <div className="StyledScheduleForm__Container__Row">
        <label>Employee</label>
        <select 
          name="employee"
          value={values.employee.id}
          onChange={handleChange}
        >
          {options.employees.map(emp => {
            return <option key={emp.id} value={emp.id}>{emp.name}</option>
          })}
        </select>
      </div>

      <div className="StyledScheduleForm__Container__Row">
        <label>Start</label>
        <input 
          type="date"
          name="startDate"
          value={values.date.start.date}
          onChange={handleChange}
        />
      </div>
      
      <div className="StyledScheduleForm__Container__Row">
        <label>Hour</label>
        <select
          name="startDateHr"
          value={values.date.start.hr} 
          onChange={handleChange}
        >
          {options.hrs.map(hr => {
            return <option
              key={hr.text}
              value={hr.text} 
            >
              {hr.text}
            </option>
          })}
        </select>
      </div>
      
      <div className="StyledScheduleForm__Container__Row">
        <label>Min</label>
        <select
          name="startDateMin"
          value={values.date.start.min} 
          onChange={handleChange}
        >
          {options.mins.map(min => {
            return <option
              key={min.text}
              value={min.text} 
            >
              {min.text}
            </option>
          })}
        </select>
      </div>

      <div className="StyledScheduleForm__Container__Row">
        <label>Time Of Day</label>
        <select
          name="startDateTimeOfDay"
          value={values.date.start.timeOfDay}
          onChange={handleChange}
        >
          {options.timeOfDay.map(item => {
            return <option key={item.name}>
              {item.name}
            </option>
          })}
        </select>
      </div>
      
      <div className="StyledScheduleForm__Container__Row">    
        <label>End</label>
        <input 
          type="date"
          name="endDate"
          value={values.date.end.date}
          onChange={handleChange}
          min={values.date.start.date}
        />
      </div>

      <div className="StyledScheduleForm__Container__Row">
        <label>Hour</label>
        <select
          name="endDateHr"
          value={values.date.end.hr} 
          onChange={handleChange}
          >
          {options.hrs.map(hr => {
            return <option
              key={hr.text}
              value={hr.text} 
            >
              {hr.text}
            </option>
          })}
        </select>

      </div>
      
      <div className="StyledScheduleForm__Container__Row">
        <label>Min</label>
        <select
          name="endDateMin"
          value={values.date.end.min} 
          onChange={handleChange}
        >
          {options.mins.map(min => {
            return <option
              key={min.text}
              value={min.text} 
            >
              {min.text}
            </option>
          })}
        </select>
      </div>
      

      <div className="StyledScheduleForm__Container__Row">
        <label>Time Of Day</label>
        <select
          name="endDateTimeOfDay"
          value={values.date.end.timeOfDay}
          onChange={handleChange}
        >
          {options.timeOfDay.map(item => {
            return <option key={item.name}>
              {item.name}
            </option>
          })}
        </select>
      </div>

      <div className="StyledScheduleForm__Container__Row">
        <label>Duration</label>
        <input
          type="number"
          name="duration"
          onChange={handleChange}
          value={values.duration}
        />
      </div>
      
      <div>
        <button>Cancel</button>
        <button>Submit</button>
      </div>
    
    </div>

  </StyledScheduleForm>
}