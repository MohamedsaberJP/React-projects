import { useState } from 'react';
import './App.css'

export default function Todolist(){
  let [allnotes,setallnotes] = useState([]);
  let [note,setnote] = useState("");
  let [isexist,setisexist] = useState(null);

  let handelnote =(note)=>{
    if(note.trim() == '') return ;

    let newelements;
    if(isexist !== null){
      newelements = allnotes.map((e,index)=>{
        if(isexist === index){
          setisexist(null);
          return note
        } else{ return e}
      })
      setallnotes(newelements)    }

    else{  setallnotes([...allnotes,note]);  }
    setnote("");
  }

  function handelremove(key){
    if(isexist !== null) return;
    let newnotes =allnotes.filter((e,index)=> index !== key);
    setallnotes(newnotes);
  }

  function handeledit(el,index){
    setnote(el);
    setisexist(index)
  }

  return (<>
  <Inputcard note={note} setnote={setnote} isexist={isexist} handelnote={handelnote}/>

  {allnotes.map((e,index)=> 
    <div key={index} className="element">
      <Outputcard e = {e} index={index} handeledit={handeledit} handelremove={handelremove} />
    </div>)}
  </>)
}




let Outputcard =({e,index,handeledit,handelremove})=>{

  return(<>
    <h3>{e}</h3>
    <button onClick={()=>handeledit(e,index)}>edit</button>
    <button onClick={()=>handelremove(index)}>remove</button>
  </>)
}

let Inputcard =({note,setnote,isexist,handelnote})=>{

  return (<>
      <input type="text" onChange={e=>setnote(e.target.value)} value={note}  />
      <button onClick={()=>handelnote(note)}> {isexist === null ? "add" : "update"}</button>
  </>)
}