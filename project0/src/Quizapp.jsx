import React, { useEffect, useState } from "react";

function Quizapp() {
  let [role, setrole] = useState(0);
  let [counter, setcounter] = useState(10);
  let [state, setstate] = useState(false);
  let [allquestions, setallquestions] = useState([]);
  let [choice, setchoice] = useState("");
  let [total, settotal] = useState(0);
  let [isfinished, setisfinished] = useState(false);

  let [quiz, setquiz] = useState({
    amount: 10,
    category: "17",
    type: "boolean",
    difficulty: "easy",
  });

  let handelchanges = (e) => {
    setquiz({ ...quiz, [e.target.name]: e.target.value });
  };

  let handelexam = async () => {
    try {
      let req = await fetch(
        `https://opentdb.com/api.php?amount=${quiz.amount}&category=${quiz.category}&difficulty=${quiz.difficulty}&type=${quiz.type}`,
      );
      let data = await req.json();

      if (data.results && data.results.length > 0) {
        console.log(data.results);
        
        setallquestions(data.results);
        setstate(true);
        setcounter(10);
        setrole(0);
        settotal(0);
        setisfinished(false);
      }
    } catch (err) {
      console.log("error in loading ", err);
    }
  };

  useEffect(() => {
    function move_next() {
      if (choice == allquestions[role].correct_answer) {
        settotal((prev) => prev + 1);
      }

      if (role == allquestions.length - 1) {
        setisfinished(true);
        setstate(false);
      } else {
        setrole((prev) => prev + 1);
        setchoice("");
        setcounter(10);
      }
    }

    let timer;
    if (state && role < allquestions.length) {
      timer = setInterval(() => {
        if (counter > 1) {
          setcounter((prev) => prev - 1);
        } else {
          move_next();
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [counter, choice, role, state, allquestions]);

  return (
    <>
      <div>
        <input
          type="number"
          name="amount"
          id="amount"
          value={quiz.amount}
          onChange={(e) => handelchanges(e)}
        />

        <select
          name="category"
          id="category"
          value={quiz.category}
          onChange={(e) => handelchanges(e)}
        >
          <option value="17">Science & Nature</option>
          <option value="18">Science & Computers</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="27">Animals</option>
        </select>

        <select
          name="difficulty"
          id="difficulty"
          value={quiz.difficulty}
          onChange={(e) => handelchanges(e)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          name="type"
          id="type"
          value={quiz.type}
          onChange={(e) => handelchanges(e)}
        >
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>

        <button onClick={handelexam}>Start Quiz</button>
      </div>

      {state && <h1>{counter}</h1>}
      {state && (
        <h2
          dangerouslySetInnerHTML={{ __html: allquestions[role]?.question }}
        />
      )}
      <div>
        {state === true &&
          role < allquestions.length &&
          (quiz.type == "boolean" ? (
            <Truefalse
              answers={["True", "False"]}
              selected={choice}
              setselected={setchoice}
            />
          ) : (
            <Muliple
              answers={[
                ...allquestions[role].incorrect_answers,
                allquestions[role].correct_answer,
              ].sort()}
              selected={choice}
              setselected={setchoice}
            />
          ))}
      </div>
      {isfinished && <p>your score are :{total}</p>}
    </>
  );
}

export default Quizapp;
let Truefalse = ({ answers, selected, setselected }) => {
  return (
    <>
      {answers.map((el, i) => {
        return (
          <div key={i}>
            <label htmlFor={el}>{el}</label>
            <input
              type="radio"
              name="choice"
              id={el}
              value={el}
              checked={el == selected}
              onChange={(e) => setselected(e.currentTarget.value)}
            />
          </div>
        );
      })}
    </>
  );
};

let Muliple = ({ answers, selected, setselected }) => {
  return (
    <>
      {answers.map((el, i) => {
        return (
          <div key={i}>
            <label htmlFor={el}>{el}</label>
            <input
              type="radio"
              name="choice"
              id={el}
              value={el}
              checked={el == selected}
              onChange={(e) => setselected(e.currentTarget.value)}
            />
          </div>
        );
      })}
    </>
  );
};
