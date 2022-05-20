import { CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Grid } from "../../components";
import  { useSchedule } from "../../hooks"
import { ScheduleList, ScheduleSearchBar } from "../../widgets";

const initialState = {
  // list: [
  //   {
  //   "object": "page",
  //   "id": "97d1e4dd-5006-4b3e-b1d6-a21c266a7100",
  //   "created_time": "2022-05-17T18:52:00.000Z",
  //   "last_edited_time": "2022-05-17T18:52:00.000Z",
  //   "created_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "last_edited_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "cover": null,
  //   "icon": null,
  //   "parent": {
  //   "type": "database_id",
  //   "database_id": "b4d320f3-662d-4105-95c2-78624ce54e89"
  //   },
  //   "archived": false,
  //   "properties": {
  //   "employee": {
  //   "id": "%5CZ~A",
  //   "type": "relation",
  //   "relation": [
  //   {
  //   "object": "page",
  //   "id": "bdd9dca0-84c3-4a59-b66f-24c9c8d09108",
  //   "created_time": "2022-05-17T17:22:00.000Z",
  //   "last_edited_time": "2022-05-17T17:22:00.000Z",
  //   "created_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "last_edited_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "cover": null,
  //   "icon": null,
  //   "parent": {
  //   "type": "database_id",
  //   "database_id": "764a1694-ca2c-4c60-bbe2-d6d5a0ef56de"
  //   },
  //   "archived": false,
  //   "properties": {
  //   "phone_number": {
  //   "id": "tUDy",
  //   "type": "phone_number",
  //   "phone_number": "123"
  //   },
  //   "name": {
  //   "id": "title",
  //   "type": "title",
  //   "title": [
  //   {
  //   "type": "text",
  //   "text": {
  //   "content": "foo",
  //   "link": null
  //   },
  //   "annotations": {
  //   "bold": false,
  //   "italic": false,
  //   "strikethrough": false,
  //   "underline": false,
  //   "code": false,
  //   "color": "default"
  //   },
  //   "plain_text": "foo",
  //   "href": null
  //   }
  //   ]
  //   }
  //   },
  //   "url": "https://www.notion.so/foo-bdd9dca084c34a59b66f24c9c8d09108"
  //   }
  //   ]
  //   },
  //   "date": {
  //   "id": "k%5D%7B%5B",
  //   "type": "date",
  //   "date": {
  //   "start": "2022-05-17T00:00:00.000-07:00",
  //   "end": "2022-05-17T13:00:00.000-07:00",
  //   "time_zone": null
  //   }
  //   },
  //   "name": {
  //   "id": "title",
  //   "type": "title",
  //   "title": []
  //   }
  //   },
  //   "url": "https://www.notion.so/97d1e4dd50064b3eb1d6a21c266a7100"
  //   },
  //   {
  //   "object": "page",
  //   "id": "578a5d96-34b3-41a4-9744-c6eeaf2f9f22",
  //   "created_time": "2022-05-17T15:15:00.000Z",
  //   "last_edited_time": "2022-05-17T18:52:00.000Z",
  //   "created_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "last_edited_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "cover": null,
  //   "icon": null,
  //   "parent": {
  //   "type": "database_id",
  //   "database_id": "b4d320f3-662d-4105-95c2-78624ce54e89"
  //   },
  //   "archived": false,
  //   "properties": {
  //   "employee": {
  //   "id": "%5CZ~A",
  //   "type": "relation",
  //   "relation": [
  //   {
  //   "object": "page",
  //   "id": "9a957f51-dbbe-45e4-b6b0-a5f301bf77fc",
  //   "created_time": "2022-05-17T17:22:00.000Z",
  //   "last_edited_time": "2022-05-17T17:22:00.000Z",
  //   "created_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "last_edited_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "cover": null,
  //   "icon": null,
  //   "parent": {
  //   "type": "database_id",
  //   "database_id": "764a1694-ca2c-4c60-bbe2-d6d5a0ef56de"
  //   },
  //   "archived": false,
  //   "properties": {
  //   "phone_number": {
  //   "id": "tUDy",
  //   "type": "phone_number",
  //   "phone_number": "5235"
  //   },
  //   "name": {
  //   "id": "title",
  //   "type": "title",
  //   "title": [
  //   {
  //   "type": "text",
  //   "text": {
  //   "content": "Josh",
  //   "link": null
  //   },
  //   "annotations": {
  //   "bold": false,
  //   "italic": false,
  //   "strikethrough": false,
  //   "underline": false,
  //   "code": false,
  //   "color": "default"
  //   },
  //   "plain_text": "Josh",
  //   "href": null
  //   }
  //   ]
  //   }
  //   },
  //   "url": "https://www.notion.so/Josh-9a957f51dbbe45e4b6b0a5f301bf77fc"
  //   }
  //   ]
  //   },
  //   "date": {
  //   "id": "k%5D%7B%5B",
  //   "type": "date",
  //   "date": {
  //   "start": "2022-05-17T00:00:00.000-07:00",
  //   "end": "2022-05-17T13:00:00.000-07:00",
  //   "time_zone": null
  //   }
  //   },
  //   "name": {
  //   "id": "title",
  //   "type": "title",
  //   "title": []
  //   }
  //   },
  //   "url": "https://www.notion.so/578a5d9634b341a49744c6eeaf2f9f22"
  //   },
  //   {
  //   "object": "page",
  //   "id": "f43706b1-73d8-4e6a-889f-3009bf1d86c6",
  //   "created_time": "2022-05-17T21:27:00.000Z",
  //   "last_edited_time": "2022-05-17T21:27:00.000Z",
  //   "created_by": {
  //   "object": "user",
  //   "id": "4f4eb128-8bdd-42d3-b7d7-6210b18807c0"
  //   },
  //   "last_edited_by": {
  //   "object": "user",
  //   "id": "4f4eb128-8bdd-42d3-b7d7-6210b18807c0"
  //   },
  //   "cover": null,
  //   "icon": null,
  //   "parent": {
  //   "type": "database_id",
  //   "database_id": "b4d320f3-662d-4105-95c2-78624ce54e89"
  //   },
  //   "archived": false,
  //   "properties": {
  //   "employee": {
  //   "id": "%5CZ~A",
  //   "type": "relation",
  //   "relation": [
  //   {
  //   "object": "page",
  //   "id": "597df9aa-5ea7-4acd-bfd9-0305d7446f58",
  //   "created_time": "2022-05-17T17:22:00.000Z",
  //   "last_edited_time": "2022-05-17T17:22:00.000Z",
  //   "created_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "last_edited_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "cover": null,
  //   "icon": null,
  //   "parent": {
  //   "type": "database_id",
  //   "database_id": "764a1694-ca2c-4c60-bbe2-d6d5a0ef56de"
  //   },
  //   "archived": false,
  //   "properties": {
  //   "phone_number": {
  //   "id": "tUDy",
  //   "type": "phone_number",
  //   "phone_number": "523523"
  //   },
  //   "name": {
  //   "id": "title",
  //   "type": "title",
  //   "title": [
  //   {
  //   "type": "text",
  //   "text": {
  //   "content": "Drake smith",
  //   "link": null
  //   },
  //   "annotations": {
  //   "bold": false,
  //   "italic": false,
  //   "strikethrough": false,
  //   "underline": false,
  //   "code": false,
  //   "color": "default"
  //   },
  //   "plain_text": "Drake smith",
  //   "href": null
  //   }
  //   ]
  //   }
  //   },
  //   "url": "https://www.notion.so/Drake-smith-597df9aa5ea74acdbfd90305d7446f58"
  //   }
  //   ]
  //   },
  //   "date": {
  //   "id": "k%5D%7B%5B",
  //   "type": "date",
  //   "date": {
  //   "start": "2022-05-18T08:00:00.000-07:00",
  //   "end": "2022-05-18T16:00:00.000-07:00",
  //   "time_zone": null
  //   }
  //   },
  //   "name": {
  //   "id": "title",
  //   "type": "title",
  //   "title": []
  //   }
  //   },
  //   "url": "https://www.notion.so/f43706b173d84e6a889f3009bf1d86c6"
  //   },
  //   {
  //   "object": "page",
  //   "id": "3e075b6f-5f8c-4d30-ab4f-706dcaf6c508",
  //   "created_time": "2022-05-17T19:29:00.000Z",
  //   "last_edited_time": "2022-05-17T19:29:00.000Z",
  //   "created_by": {
  //   "object": "user",
  //   "id": "4f4eb128-8bdd-42d3-b7d7-6210b18807c0"
  //   },
  //   "last_edited_by": {
  //   "object": "user",
  //   "id": "4f4eb128-8bdd-42d3-b7d7-6210b18807c0"
  //   },
  //   "cover": null,
  //   "icon": null,
  //   "parent": {
  //   "type": "database_id",
  //   "database_id": "b4d320f3-662d-4105-95c2-78624ce54e89"
  //   },
  //   "archived": false,
  //   "properties": {
  //   "employee": {
  //   "id": "%5CZ~A",
  //   "type": "relation",
  //   "relation": [
  //   {
  //   "object": "page",
  //   "id": "dd66e0c6-65b3-4969-bc70-56d28e89057a",
  //   "created_time": "2022-05-17T17:22:00.000Z",
  //   "last_edited_time": "2022-05-17T17:22:00.000Z",
  //   "created_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "last_edited_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "cover": null,
  //   "icon": null,
  //   "parent": {
  //   "type": "database_id",
  //   "database_id": "764a1694-ca2c-4c60-bbe2-d6d5a0ef56de"
  //   },
  //   "archived": false,
  //   "properties": {
  //   "phone_number": {
  //   "id": "tUDy",
  //   "type": "phone_number",
  //   "phone_number": "123"
  //   },
  //   "name": {
  //   "id": "title",
  //   "type": "title",
  //   "title": [
  //   {
  //   "type": "text",
  //   "text": {
  //   "content": "Alexis",
  //   "link": null
  //   },
  //   "annotations": {
  //   "bold": false,
  //   "italic": false,
  //   "strikethrough": false,
  //   "underline": false,
  //   "code": false,
  //   "color": "default"
  //   },
  //   "plain_text": "Alexis",
  //   "href": null
  //   }
  //   ]
  //   }
  //   },
  //   "url": "https://www.notion.so/Alexis-dd66e0c665b34969bc7056d28e89057a"
  //   }
  //   ]
  //   },
  //   "date": {
  //   "id": "k%5D%7B%5B",
  //   "type": "date",
  //   "date": {
  //   "start": "2022-05-24T04:00:00.000-07:00",
  //   "end": "2022-05-24T06:00:00.000-07:00",
  //   "time_zone": null
  //   }
  //   },
  //   "name": {
  //   "id": "title",
  //   "type": "title",
  //   "title": []
  //   }
  //   },
  //   "url": "https://www.notion.so/3e075b6f5f8c4d30ab4f706dcaf6c508"
  //   },
  //   {
  //   "object": "page",
  //   "id": "77523d3e-5f7d-4f49-b51d-117ae0c9f4e2",
  //   "created_time": "2022-05-17T19:28:00.000Z",
  //   "last_edited_time": "2022-05-17T19:28:00.000Z",
  //   "created_by": {
  //   "object": "user",
  //   "id": "4f4eb128-8bdd-42d3-b7d7-6210b18807c0"
  //   },
  //   "last_edited_by": {
  //   "object": "user",
  //   "id": "4f4eb128-8bdd-42d3-b7d7-6210b18807c0"
  //   },
  //   "cover": null,
  //   "icon": null,
  //   "parent": {
  //   "type": "database_id",
  //   "database_id": "b4d320f3-662d-4105-95c2-78624ce54e89"
  //   },
  //   "archived": false,
  //   "properties": {
  //   "employee": {
  //   "id": "%5CZ~A",
  //   "type": "relation",
  //   "relation": [
  //   {
  //   "object": "page",
  //   "id": "dd66e0c6-65b3-4969-bc70-56d28e89057a",
  //   "created_time": "2022-05-17T17:22:00.000Z",
  //   "last_edited_time": "2022-05-17T17:22:00.000Z",
  //   "created_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "last_edited_by": {
  //   "object": "user",
  //   "id": "2494ac0a-caa8-4789-b387-298ec2127bd4"
  //   },
  //   "cover": null,
  //   "icon": null,
  //   "parent": {
  //   "type": "database_id",
  //   "database_id": "764a1694-ca2c-4c60-bbe2-d6d5a0ef56de"
  //   },
  //   "archived": false,
  //   "properties": {
  //   "phone_number": {
  //   "id": "tUDy",
  //   "type": "phone_number",
  //   "phone_number": "123"
  //   },
  //   "name": {
  //   "id": "title",
  //   "type": "title",
  //   "title": [
  //   {
  //   "type": "text",
  //   "text": {
  //   "content": "Alexis",
  //   "link": null
  //   },
  //   "annotations": {
  //   "bold": false,
  //   "italic": false,
  //   "strikethrough": false,
  //   "underline": false,
  //   "code": false,
  //   "color": "default"
  //   },
  //   "plain_text": "Alexis",
  //   "href": null
  //   }
  //   ]
  //   }
  //   },
  //   "url": "https://www.notion.so/Alexis-dd66e0c665b34969bc7056d28e89057a"
  //   }
  //   ]
  //   },
  //   "date": {
  //   "id": "k%5D%7B%5B",
  //   "type": "date",
  //   "date": {
  //   "start": "2022-05-24T04:00:00.000-07:00",
  //   "end": "2022-05-24T06:00:00.000-07:00",
  //   "time_zone": null
  //   }
  //   },
  //   "name": {
  //   "id": "title",
  //   "type": "title",
  //   "title": []
  //   }
  //   },
  //   "url": "https://www.notion.so/77523d3e5f7d4f49b51d117ae0c9f4e2"
  //   }
  //   ],
  list: [],
  loading: false,
  error: { message: '' }
}

const initialQuery = {
  sortBy: 'date',
  direction: 'asc',
  date_after: '',
  date_before: '',
  name: ''
}

export default function Schedules() {
  const {
    state,
    findAll,
    archiveByScheduleId
  } = useSchedule(initialState);
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
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
    router.push(`/schedules${createQueryString()}`);
    findAll(query);
  }, [query]);

  return <Grid
    width="100%"
    dir="column wrap"
    ai="center"
    padding="2rem 0 0 0"
  >
    <Grid
      width="90%"
    >
      <Typography variant="h3">Schedules</Typography>
    </Grid>

    <ScheduleSearchBar 
      query={query} 
      setQuery={setQuery}
    />

    <Grid
      width="90%"
    >
      <Typography>results: {state.list.length}</Typography>
    </Grid>

    {state.loading ? (
      
      <CircularProgress/>
      
    ) : (
      <ScheduleList 
        schedules={state.list} 
        archiveSchedule={archiveByScheduleId}
      />
    )}
    
  
  </Grid>
}