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

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id)
      setQuestions(updatedQuestions)
    })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex})
    })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if(q.id === updatedQuestion.id) return updatedQuestion
        return q;
      });
      setQuestions(updatedQuestions)
    })
  }
  

  const renderedQuestions = questions.map((question) => {
    return(
      <QuestionItem 
      question={question}
      key={question.id}
      handleDelete={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
      ></QuestionItem>
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
