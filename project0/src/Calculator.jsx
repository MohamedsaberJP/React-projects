import {useState} from 'react'

function Calculator() {
    let [result , setresult] = useState(0);
    let [el1,setel1] = useState("");
    let [el2,setel2] = useState("");


    let handeloperation =(t)=>{
      if(el1 == ""|| el2 == "") return ;
      let num1 = Number(el1);
      let num2 = Number(el2);
      switch (t) {
        case "add": setresult(num1 + num2); break;
        case "min": setresult(num1 - num2); break;
        case "mult": setresult(num1 * num2); break;
        case "divi": setresult(num2 === 0 ? "Error" : num1 / num2); break;
        default: setresult(0);
      }
      setel1("");
      setel2("");
    }
  return (
    <div>
      <input type="number" name="el1" id="el1" value={el1} onChange={(e)=>setel1(e.target.value)}/>
      <input type="number" name="el2" id="el2"  value={el2} onChange={(e)=>setel2(e.target.value)}/>
      <button onClick={()=>handeloperation("add")}>+</button>
      <button onClick={()=>handeloperation("min")}>-</button>
      <button onClick={()=>handeloperation("mult")}>*</button>
      <button onClick={()=>handeloperation("divi")}>/</button>

      <button onClick={()=> setresult(0)}>reset</button>

      <h3>the result : {result}</h3>
    </div>
  )
}

export default Calculator;

// using use reducer 
// import {useReducer, useState} from 'react'
//     let initial = 0;
//     let reducer = (state,action)=>{
//       let n1 = Number(action.payload.n1);
//       let n2 = Number(action.payload.n2);
//         switch(action.type){
//             case "add" : return  +n1 + n2 ;
//             case "min" : return  n1 - n2 ;
//             case "mult" : return  n1 * n2 ;
//             case "divi" :  return  (n2 != 0) ? n1 / n2 :"can not div on 0";
//             default : return state ;
//         }
//     }
// function Calculator() {
//     let [el1,setel1] = useState("");
//     let [el2,setel2] = useState("");

//     let [state,dispatch]=useReducer(reducer,initial);

//     let handeloperation =(t)=>{
//       if(el1 == ""|| el2 == "") return ;
//       dispatch({
//         type : t,
//       payload : {n1 : el1 , n2 : el2}})
//       setel1("");
//       setel2("");
//     }
//   return (
//     <div>
//       <input type="number" name="el1" id="el1" value={el1} onChange={(e)=>setel1(e.target.value)}/>
//       <input type="number" name="el2" id="el2"  value={el2} onChange={(e)=>setel2(e.target.value)}/>
//       <button onClick={()=>handeloperation("add")}>+</button>
//       <button onClick={()=>handeloperation("min")}>-</button>
//       <button onClick={()=>handeloperation("mult")}>*</button>
//       <button onClick={()=>handeloperation("divi")}>/</button>

//       <h3>the result : {state}</h3>
//     </div>
//   )
// }

// export default Calculator
