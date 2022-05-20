import {v4 as uuid } from "uuid";
import { Box, Modal, TextField, Typography } from "@mui/material"
import { Button, Grid } from "../../components"
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';

const StyledScheduleSearchBar = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;

  input {
    width: 80%;
    font-size: 1rem;
    padding: .5rem;
  }
  
  button {
    width: 20%;
    padding: .5rem;
    border: 1px solid black;
    background-color: #cccccc;
  }
`

const initialModalActive = {
  sortBy: false,
  direction: false,
  dateRange: false
}

const initialOptions = {
  sortBy: [
    {
      id: uuid(),
      name: 'Name',
      value: 'name'
    },
    {
      id: uuid(),
      name: 'Date',
      value: 'date'
    },
  ],
  direction: [
    {
      id: uuid(),
      name: 'Ascending',
      value: 'asc'
    },
    {
      id: uuid(),
      name: 'Descending',
      value: 'desc'
    },
  ]
}

// const initialDateRange = {
//   start: "", 
//   end: ""
// }

const sx = {
  box: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    justifyContent: "space-between",
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '30vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 0
  }
}

export const ScheduleSearchBar = ({query, setQuery}) => {
  const [modalActive, setModalActive] = useState(initialModalActive);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({after: query.date_after, before: query.date_before});
  
  const handleChange = e => setSearch(e.target.value);
  
  const handleSubmit = e => {
    e.preventDefault();
    setQuery({
      ...query,
      name: search
    });
  }

  return (
  <StyledScheduleSearchBar>
  
    <Grid
      width="90%"
    >
      <input
        placeholder="Search by name"
        onChange={handleChange}
        value={search}
      />
      <Button><SearchIcon sx={{fontSize: "1rem"}}/></Button>
    </Grid>
   
    <Grid
      gap="1rem"
      padding="1rem 0"
      width="90%"
    >
      <Grid
        bgColor={query.sortBy === 'date' ? "" : "#cccccc"}
        borderRadius="20px"
        border="1px solid #cccccc"
        padding=".5rem"
        onClick={() => {
          setModalActive({...modalActive, sortBy: true});
        }}
      >
        <Typography variant="button">Sort By</Typography>
      </Grid>    
      
      <Modal
        open={modalActive.sortBy}
        onClose={() => setModalActive({...modalActive, sortBy: false})}
      >
          <Box
            sx={sx.box}
          >
            <Grid
              dir="column wrap"
              gap="1rem"
              width="100%"
              height="100vh"
              ai="center"
              jc="space-evenly"
            >
              <Button
                width="100%"
                padding="1rem"
                onClick={() => {
                  setQuery({
                    ...query,
                    sortBy: 'date'
                  });
                }}
                fontSize="2rem"
                variant={query.sortBy === 'date' ? "contained" : "outlined"}
                borderRadius="50px"
              >
                <Grid
                  width="100%"
                  jc="space-between"
                >
                  <Typography variant="h4">Date</Typography>
                  {query.sortBy === 'date' && <CheckIcon sx={{fontSize: "2rem"}}/>}
                </Grid>
              
              </Button>
              <Button
                width="100%"
                padding="1rem"
                onClick={() => {
                  setQuery({
                    ...query,
                    sortBy: 'name'
                  });
                }}
                variant={query.sortBy === 'name' ? "contained" : "outlined"}
                fontSize="2rem"
                borderRadius="50px"
              >
                <Grid
                  width="100%"
                  jc="space-between"
                >
                  <Typography variant="h4">Name</Typography>
                  {query.sortBy === 'name' && <CheckIcon sx={{fontSize: "2rem"}}/>}
                </Grid>
              </Button>
            </Grid>
          </Box>
      </Modal>

      <Grid
        bgColor={query.direction === 'asc' ? "" : "#cccccc"}
        borderRadius="20px"
        border="1px solid #cccccc"
        padding=".5rem"
        onClick={() => {
          setModalActive({...modalActive, direction: true});
        }}
      >
        <Typography variant="button">Direction</Typography>
      </Grid>    

      <Modal
        open={modalActive.direction}
        onClose={() => setModalActive({...modalActive, direction: false})}
      >
          <Box
            sx={sx.box}
          >
            <Grid
              dir="column wrap"
              gap="1rem"
              width="100%"
              ai="center"
              jc="flex-end"
            >
              <Button
                width="100%"
                fontSize="2rem"
                variant={query.direction === 'asc' ? "contained" : 'outlined'}
                padding="1rem"
                onClick={() => {
                  setQuery({
                    ...query,
                    direction: 'asc'
                  });
                }}
                borderRadius="50px"
              >
                <Grid
                  width="100%"
                  jc="space-between"
                >
                  <Typography variant="h4">Ascending</Typography>
                  {query.direction === 'asc' && <CheckIcon sx={{fontSize: "2rem"}}/>}
                </Grid>
              </Button>
              <Button
                width="100%"
                fontSize="2rem"
                variant={query.direction === 'desc' ? "contained" : 'outlined'}
                padding="1rem"
                onClick={() => {
                  setQuery({
                    ...query,
                    direction: 'desc'
                  });
                }}
                borderRadius="50px"
              >
                <Grid
                  width="100%"
                  jc="space-between"
                >
                  <Typography variant="h4">Descending</Typography>
                  {query.direction === 'desc' && <CheckIcon sx={{fontSize: "2rem"}}/>}
                </Grid>
                
              </Button>
            </Grid>
          </Box>
      </Modal>

      <Grid
        bgColor={(query.date_after !== '' || query.date_before !== '') ? "#cccccc" : ''}
        borderRadius="20px"
        border="1px solid #cccccc"
        padding=".5rem"
        onClick={() => {
          setModalActive({...modalActive, dateRange: true});
        }}
      >
        <Typography variant="button">Date Range</Typography>
      </Grid>    

      <Modal
        open={modalActive.dateRange}
        onClose={() => setModalActive({...modalActive, dateRange: false})}
      >
          <Box
            sx={sx.box}
          >
            <Grid
              dir="column wrap"
              gap="1rem"
              width="100%"
              ai="center"
              jc="flex-end"
            >

              <Grid
                width="100%"
                gap="1rem"
                jc="space-between"
                ai="center"
              >
                <Typography variant="h5">After</Typography>
                <input 
                  type="date"
                  value={dateRange.after}
                  onChange={(e) => {
                    setDateRange({
                      ...dateRange,
                      after: e.target.value
                    });
                  }}
                />
              </Grid>

              <Grid
                width="100%"
                gap="1rem"
                jc="space-between"
                ai="center"
              >
                <Typography variant="h5">Before</Typography>
                <input 
                  type="date"
                  value={dateRange.before}
                  onChange={(e) => {
                    setDateRange({
                      ...dateRange,
                      before: e.target.value
                    });
                  }}
                  min={dateRange.after}
                />
              </Grid>
            
              <Grid
                width="100%"
                jc="space-evenly"
              >
                <Button
                  variant="outlined"
                  width="40%"
                  fontSize="2rem"
                  borderRadius="50px"
                  onClick={() => {
                    setQuery({
                      date_after: '',
                      date_before: ''
                    });
                    setDateRange({
                      after: '',
                      end: ''
                    });
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  width="40%"
                  fontSize="2rem"
                  borderRadius="50px"
                  onClick={() => {
                    setQuery({
                      ...query,
                      date_after: dateRange.after,
                      date_before: dateRange.before
                    });
                    setModalActive({...modalActive, dateRange: false})
                  }}
                >
                  Apply  
                </Button>
              </Grid>
            </Grid>
          </Box>
      </Modal>

    </Grid>
  
  </StyledScheduleSearchBar>
  )
}