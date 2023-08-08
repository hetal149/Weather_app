import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import ListGroup from 'react-bootstrap/ListGroup';
import { Autocomplete, Button } from '@mui/material';
const Dashboard = () => {
  const [countryDetails, setCountryDetails] = useState("")
  const [selected, setSelected] = useState("")
  const [allCountries, setAllCountries] = useState({})
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fetchAllData = async () => {
      const allData = await axios.get(`https://restcountries.com/v3.1/all`)
      const transformedData = allData.data.map(country => ({
        label: country.name.common,
        value: country.name.common
      }));
      setAllCountries(transformedData)
    }
    fetchAllData();
  }, [])

  useEffect(() => {
    const fetchAllData = async () => {
      const allData = await axios.get(`http://api.weatherstack.com/current?access_key=657eff28902ae0da20e5e7c99b8025ab&query=${selected?.value}`)
      setCountryDetails(allData.data)

    }
    fetchAllData();
  }, [selected])
  console.log(countryDetails)
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={allCountries}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" />}
        onChange={(event, value) => { setSelected(value) }}
      />
      {selected !== "" && <ListGroup>
        <ListGroup.Item>Country name: {selected?.value}</ListGroup.Item>
        <ListGroup.Item>Capital of {selected?.value} : {countryDetails?.location?.name}</ListGroup.Item>
        {show && <>
          <ListGroup.Item>Temperature: {countryDetails?.current?.temperature}°C</ListGroup.Item>
          <ListGroup.Item>Wind Speed: {countryDetails?.current?.wind_speed}km/h</ListGroup.Item>
          <ListGroup.Item>Preciption: {countryDetails?.current?.precip}</ListGroup.Item>
        </>
        }
      </ListGroup>
      }
      <Button variant="contained" color="secondary" onClick={() => { setShow(true) }}>Show Weather</Button>
    </>
  )
}

export default Dashboard