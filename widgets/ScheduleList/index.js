import { Grid } from "../../components";
import { ScheduleItem } from "../ScheduleItem";

export const ScheduleList = ({schedules, archiveSchedule}) => {
  return (
    <Grid
      width="100%"
      dir="column wrap"
      ai="center"
    >
      {schedules.map(schedule => {        
        return <ScheduleItem 
          key={schedule.id}
          archiveSchedule={archiveSchedule}
          schedule={schedule}
        />
      })}
    </Grid>
  )
}