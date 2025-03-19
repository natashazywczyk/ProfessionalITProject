import React, { useEffect, useState } from "react";
import axios from "axios";

const GeneralKnowledge = () => {
  const [apiData, setApiData] = useState([]); // Store data from API
  const [loading, setLoading] = useState(true); // Display while fetch is happening
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    const fetchTriviaData= () => {
        //Fetch randomised questions from the trivia API
        axios.get("https://the-trivia-api.com/v2/questions/")

        .then((response) => {
          console.log(response.data); 
          setApiData(response.data);    // Store data to useState
          setLoading(false);    // Set loading to false, as data is loaded
        })

        .catch((error) => {
          setError("There was an error with the request.");
          setLoading(false);           
          console.error(error); // Display error to console
        });
    };

    fetchTriviaData();
  }, []);

  if (loading) {
    return <div>Loading, please wait...</div>;
  }

  if (error) {
    return <div>{error}</div>; // If there's an error, display error message
  }

  return (
    <div>
      <h1>Welcome to the Trivia App!</h1>
      <div>
        {/*Display 10 questions with its correlating possible answers*/}
        {apiData.map((question, index) => ( // Keep track of the question and its index
          <div key={question.id}>
            <h3>Question {index + 1}:</h3> <h5>{question.question.text}</h5>  {/*Display question number and the question from api*/}
            <div>
              <p>Choose One: </p>
              <ul style={{listStyleType: 'none', padding: '0', textAlign: 'center'}}>
                {/*Display possible answers below question */}
                {[
                  question.correctAnswer, 
                  ...question.incorrectAnswers
                ].map((answer, answerIndex) => (
                  <li key={answerIndex}>{answer}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralKnowledge;
