import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setQuestions(data)
    })
  }, [])

  const renderedQuestions = questions.map((question) => {
    return(
      <QuestionItem question={question}></QuestionItem>
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderedQuestions}</ul>
    </section>
  );
}

export default QuestionList;
