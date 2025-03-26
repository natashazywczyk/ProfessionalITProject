import React, { useEffect, useState } from "react";
import axios from "axios";

const GeneralKnowledge = () => {
  const [apiData, setApiData] = useState([]); // Store data from API
  const [loading, setLoading] = useState(true); // Display while fetch is happening
  const [error, setError] = useState(null); // Handle errors
  const [rightCorrectAnswers, setRightCorrectAnswers] = useState(0); // Keeps track of the users correct answer guesses
  let randomisedAnswers = [];

  // Function to ranodmise position of possible answers, ensuring correct answer isn't always first
  const randomise = (answers) => 
  {
    return answers.sort(() => Math.random() - 0.5);
  };

  // Function to handle when an answer is clicked
  const handleAnswerClick = (chosenAnswer, correctAnswer) => {
    if (chosenAnswer === correctAnswer) {
      setRightCorrectAnswers(prevCount => prevCount + 1); // Increment if answer is correctly guessed
    }
  };

  useEffect(() => {
    const fetchTriviaData = () => {
      // Fetch randomised questions from the trivia API
      axios.get("https://the-trivia-api.com/v2/questions/")
        .then((response) => {
          console.log(response.data); // Log response data to check structure
          setApiData(response.data); // Store data to useState
          setLoading(false); // Set loading to false as data is loaded
        })
        .catch((error) => {
          setError("There was an error with the request.");
          setLoading(false);
          console.error(error); // Display error to console
        });
    };

    fetchTriviaData();
  }, []); 

  // While loading or if there's an error
  if (loading) {
    return <div>Loading, please wait...</div>;
  }

  if (error) {
    return <div>{error}</div>; // If there's an error, display error message
  }

  return (
    <div>
      {/* Display the correct answers counter in the top left, but under the navigation bar */}
      <div style={{ position: "absolute", top: "50px", left: "10px" }}>
        Correct Answers: {rightCorrectAnswers}
      </div>

      <h1>Welcome to the Trivia App!</h1>
      <div>
        {/* Display 10 questions with their correlating possible answers */}
        {apiData.map((question, number) => {
          // Place both correct and incorrect answers into one array
          const allAnswers = [
            question.correctAnswer,
            ...question.incorrectAnswers, // New line for each answer
          ];
          // Randomise question positions
          randomisedAnswers = randomise(allAnswers);

          return (
            <div key={question.id}>
              <h3>Question {number + 1}:</h3> {/* Display question number */}
              <h5>{question.question.text}</h5> {/* Display question text */}
              <div>
                <p>Choose One: </p>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: "0",
                    textAlign: "center",
                    display: "grid", // Use grid layout
                    gridTemplateColumns: "repeat(2, auto)", // Use auto width for columns
                    gap: "5px",
                    justifyContent: "center", // Center the grid horizontally
                  }}
                >
                  {/* Display possible answers below question */}
                  {randomisedAnswers.map((answer, answerIndex) => (
                    <li key={answerIndex}>
                      <button
                        style={{
                          width: "350px",
                          padding: "20px 40px",
                          margin: "0",
                          backgroundColor: "Purple",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleAnswerClick(answer, question.correctAnswer)} // Check if the clicked answer is correct
                      >
                        {answer}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneralKnowledge;