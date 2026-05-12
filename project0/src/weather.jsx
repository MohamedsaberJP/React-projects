import React, { useEffect, useState } from 'react'

function Weather() {
    let [status,setstatus] = useState({});
    let [search,setsearch] = useState("");
    let [city,setcity] = useState("");

    let api_key = "6222b7e615ed4466964173236262904";
    let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`;

    useEffect(()=>{
        if(city != ""){
            let ww = async()=>{
            try{
                let response = await fetch(url);
                let data = await response.json();
                setstatus(data);
                console.log(data)
            }

            catch(err) {
                console.log("error in loading",err)
            }
        }
        ww();
        }

    },[url,city])

    let handelsearch =()=>{
        setcity(search);
        setsearch("");
    }

  return (
    <>
    <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)} placeholder='search about city ...'/>
    <button onClick={handelsearch}>search</button>
    {status.current && <>
      <h1>{status.current.last_updated.slice(0,10)}</h1>
      <img src={status.current.condition.icon} alt="weather icon" />
      <h2>{status.current.temp_c}°C</h2>
      <h1>{status.location.name} <br />{status.location?.country}</h1></>}

    </>
  )
}

export default Weather;
