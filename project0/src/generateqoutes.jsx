import React, { useEffect, useState } from 'react'

function Generateqoutes() {
  let [qoute,setqoute]= useState("click on btn to get a qoute");
  let [all,setall] = useState([])
    useEffect(()=>{
      let havingqoute = async()=>{
        try{
          let res = await fetch("../qoutes.json")
          let data =await res.json();
          setall(data.q);
        }
        catch(err){
          console.log("error with loading data",err)
        }
      };
      havingqoute()
    },[])

    let handelq =()=>{
      let rand = all.length * Math.random();
      setqoute(all[Math.floor(rand)]);
    }

  return (
    <div>
      <button onClick={handelq}>change qoute</button>
      <h3>{qoute}</h3>
    </div>
  )
}

export default Generateqoutes;
