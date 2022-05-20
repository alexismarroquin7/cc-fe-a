import { Grid, Button } from "../../components";
import { Typography } from "@mui/material";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function formatDate (timestamp) {
  const date = new Date(timestamp);
  
  const d = date.getDate();
  const day = date.getDay();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const hr = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  function asString ({
    clock = '24hr',
    fullYear = false,
    monthAsString = false,
    includeDay = false,
    includeSeconds = false,
  }){      
    let customString = '';
    
    if(includeDay){
      customString += `${days[day]} `;
    }
    
    if(monthAsString){
      const months = [
        '',
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ];
      customString += `${months[month]} `;
      customString += `${d < 10 ? '0' : ''}${d}, `;
      
    } else {
      customString += `${month < 10 ? '0' : ''}${month}-`
      customString += `${d < 10 ? '0' : ''}${d}-`;

    }
    
    
    if(fullYear) {
      customString += `${year} `
    } else {
      customString += `${`${year}`.slice(2)} `;
    }

    if(clock === '24hr') {

      customString += `${hr < 10 ? '0' : ''}${hr}:${min  < 10 ? '0' : ''}${min}`;
      
      if(includeSeconds) {
        const secToUse = `${sec < 10 ? '0' : ''}${sec} `
        customString += `:${secToUse} `;  
      }
    
    } else if(clock === '12hr') {

      if(hr === 0 || hr === 12){
        customString += `12:`
      } else if(hr < 10){
        customString += `0${hr}:`
      } else if(hr > 12){
        customString += `0${hr - 12}:`
      } else {
        customString += `${hr}:`

      }

      const minToUse = `${min < 10 ? '0' : ''}${min}`
      
      customString += `${minToUse}`;
      
      if(includeSeconds) {
        const secToUse = `${sec < 10 ? '0' : ''}${sec} `
        customString += `:${secToUse} `;  
      }

      customString += `${hr < 12 ? 'AM' : 'PM'}`;
      
    }

    return customString;
  }

  return {
    date: d,
    day: days[day],
    month,
    year,
    hr,
    min,
    sec,
    asString 
  }
}

export const ScheduleItem = ({schedule, archiveSchedule}) => {
  const { properties: prop } = schedule;
        
  const [ employee ] = prop.employee.relation;
  
  const startDate = formatDate(prop.date.date.start);
  const endDate = formatDate(prop.date.date.end);

  return (
  <Grid
    key={schedule.id}
    width="95%"
    dir="column wrap"
    padding="1rem"
    gap="1rem"
  >
    <Grid 
      width="100%"
      bgColor="black"
      padding=".1rem"
    ></Grid>
    <Grid
      width="100%"
      dir="row wrap"
      jc="flex-end"
      
    >
      <Button
        onClick={() => {
          archiveSchedule(schedule.id);
        }}
      >x</Button>
    </Grid>
    
    <Grid
      width="100%"
      jc="space-between"
      ai="center"
    >
      <Grid
        gap="1rem"
      >
        <AccountCircleIcon/>
        <Typography>
          employee:
        </Typography>
      </Grid>

      <Typography>
        {employee.properties.name.title[0].text.content}
      </Typography>
    </Grid>
    
    <Grid
      width="100%"
      jc="space-between"
                    
      ai="center"
    >
      <Grid
        gap="1rem"
      >
        <AccessTimeIcon/>
        <Typography>
          IN: 
        </Typography>
      </Grid>
      <Typography>
        {startDate.asString({
          clock: '12hr',
          fullYear: true,
          monthAsString: false,
          includeDay: true,
          includeSeconds: false
        })}
      </Typography>
    </Grid>
    
    <Grid
      width="100%"
      jc="space-between"
                    
    >
      <Grid
        gap="1rem"
      >
        <AccessTimeIcon/>
        <Typography>
          OUT: 
        </Typography>
      </Grid>
      <Typography>
        {endDate.asString({
          clock: '12hr',
          fullYear: true,
          monthAsString: false,
          includeDay: true,
          includeSeconds: false
        })}
      </Typography>
    </Grid>

    <Grid
      width="100%"
      jc="space-between"
    >
      <Grid
        gap="1rem"
      >
        <AccessTimeIcon/>
        <Typography>Duration</Typography>
      </Grid>
      <Typography>{prop.duration.number.toFixed(1)}</Typography>
    </Grid>
    
  </Grid>
  )
}