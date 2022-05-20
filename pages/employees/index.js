import { useEffect } from "react"
import { useEmployee } from "../../hooks/useEmployee";
import { EmployeeList } from "../../widgets/EmployeeList";
import { CircularProgress } from "@material-ui/core";
import { Grid } from "../../components";

const initialState = {
  list: [],
  loading: false,
  error: { message: '' }
}

export default function Employees() {
  const {
    state,
    findAll
  } = useEmployee(initialState);

  useEffect(() => {
    findAll();
  }, []);
  
  return <Grid
    width="100%"
    dir="column wrap"
    ai="center"
  >
    {
      state.loading 
      ? <CircularProgress/> 
      : <EmployeeList employees={state.list}/>
    }
    
  </Grid>
}