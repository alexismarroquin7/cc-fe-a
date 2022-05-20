import { Typography } from "@material-ui/core";
import { Grid } from "../../components";

export const EmployeeList = ({employees}) => {

  return <Grid
    width="90%"
    dir="column wrap"
    ai="center"
    gap="1rem"
  >
    {employees.length > 0 && 
      employees.map(employee => {
        const { properties } = employee;
        return <Grid
          key={employee.id}
          width="100%"
          border=".1rem solid black"
          borderRadius="10px"
          padding="1rem"
          dir="column wrap"
        >
          <Grid
            width="100%"
            jc="space-between"
          >
            <Typography variant="body1">name:</Typography>
            <Typography variant="body1">{properties.name.title[0].text.content}</Typography>
          </Grid>

          <Grid border=".01rem solid gray" width="100%" bgColor="black"></Grid>

          <Grid
            width="100%"
            jc="space-between"
          >
            <Typography variant="body1">phone:</Typography>
            <Typography variant="body1">{properties.phone_number.phone_number}</Typography>
          </Grid>

        </Grid>
      })
    }
  </Grid>
}