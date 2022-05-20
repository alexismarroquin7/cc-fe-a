import { CircularProgress } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Grid } from "../../components";
import { axiosInstance } from "../../utils";

const initialValues = {
  name: '',
  phoneNumber: ''
}

export const EmployeeForm = () => {
  const [ values, setValues ] = useState(initialValues);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axiosInstance()
      .post('/employees', values);
      setStatus('success');
    } catch (err) {
      setStatus('fail');

    }
  }

  useEffect(() => {
    if(status !== 'success') return;
    router.push(`/employees`);
  }, [router, status]);

  return (
  <Grid
    width="100%"
    dir="column wrap"
    ai="center"
  >
    <form
      onSubmit={handleSubmit}
      style={{width: "90%"}}
    >
      <Grid
        width="100%"
        dir="column wrap"
        gap="1rem"
      >
        
        <Typography variant="h4">New Employee</Typography>
        
        <TextField
          variant="outlined"
          type="text"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          fullWidth
          required
        />
        
        <TextField
          variant="outlined"
          type="text"
          placeholder="Phone"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          fullWidth
          required
        />
        
        
        <Grid
          width="100%"
          gap="1rem"
        >
          <Button
            variant="contained"
            size="small"
            fullWidth
            type="submit"
          >{status === 'loading' ? <CircularProgress/> : 'Submit'}</Button>
          <Button
            variant="contained"
            fullWidth
            size="small"
            color="error"
          >Cancel</Button>
        </Grid>

      </Grid>
    </form>
  </Grid>
  )
}