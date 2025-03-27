import React, { useEffect, useState } from "react";
import axios from "axios";

const GeneralKnowledge = () => {
  const [apiData, setApiData] = useState([]); // Store data from API
  const [loading, setLoading] = useState(true); // Display while fetch is happening
  const [error, setError] = useState(null); // Handle errors
  const [rightCorrectAnswers, setRightCorrectAnswers] = useState(0); // Keeps track of the user's correct answer guesses
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index
  const [correctAnswersTotal, setCorrectAnswersTotal ] = useState(() => { // Keeps track of user's overall correct answer guesses
    // Retrieve the total correct answers from local storage or default to 0
    const storedTotal = localStorage.getItem("correctAnswersTotal");
    return storedTotal ? parseInt(storedTotal, 10) : 0;
  });
  // Function to randomize the position of possible answers
  const randomise = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  // Function to handle when an answer is clicked
  const handleAnswerClick = (chosenAnswer, correctAnswer) => {
    if (chosenAnswer === correctAnswer) {
      setRightCorrectAnswers((prevCount) => prevCount + 1); // Increment if the answer is correct
    }

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

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
    useEffect(() => {
      fetchTriviaData();
  }, []);

  // Update local storage whenever correctAnswersTotal changes
  useEffect(() => {
    localStorage.setItem("correctAnswersTotal", correctAnswersTotal);
  }, [correctAnswersTotal]);

  // While loading or if there's an error
  if (loading) {
    return <div>Loading, please wait...</div>;
  }

  if (error) {
    return <div>{error}</div>; // If there's an error, display error message
  }

  // If all questions have been answered
  if (currentQuestionIndex >= apiData.length) {
    return (
      <div>
        <h1>Quiz Complete!</h1>
        <p>You answered {rightCorrectAnswers} out of {apiData.length} questions correctly.</p>
        {rightCorrectAnswers >= 5 ? (
          <p>Well done! You answered over half correct. Keep it up!</p>
        ) : (
          <p>You answered less than half correct. Better luck next time!</p>
        )}
        {/* Button to restart quiz */}
        <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "Purple",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          setCorrectAnswersTotal((prevTotal) => prevTotal + rightCorrectAnswers); // Add current correct answers to overall correct answer total
          setCurrentQuestionIndex(0); // Reset question index
          setRightCorrectAnswers(0); // Reset correct answers count
          fetchTriviaData();
        }}> 
          Restart Quiz
        </button>
      </div>
    );
  }

  // Get the current question
  const currentQuestion = apiData[currentQuestionIndex];
  const allAnswers = randomise([
    currentQuestion.correctAnswer,
    ...currentQuestion.incorrectAnswers,
  ]);

  return (
    <div>
      {/* Display the correct answers counter in the top left, but under the navigation bar */}
      <div style={{ position: "absolute", top: "50px", left: "10px" }}>
        Correct Answers: {rightCorrectAnswers}
      </div>

      <div style= {{position: "absolute", top: "50px", right: "10px"}}>
        Total Correct Answers: {correctAnswersTotal}
      </div>

      <h1>Welcome to the Trivia App!</h1>
      <div>
        {/* Display the current question */}
        <div key={currentQuestion.id}>
          <h3>Question {currentQuestionIndex + 1}:</h3> {/* Display question number */}
          <h5>{currentQuestion.question.text}</h5> {/* Display question text */}
          <div>
            <p style={{marginTop: "150px"}}>Choose One: </p>
            <ul
              style={{
                listStyleType: "none",
                padding: "0",
                textAlign: "center",
                display: "grid", // Use grid layout
                gridTemplateColumns: "repeat(2, auto)", // Use auto width for columns
                gap: "5px",
                justifyContent: "center", // Center the grid horizontally
                marginTop: "20px"
              }}
            >
              {/* Display possible answers */}
              {allAnswers.map((answer, answerIndex) => (
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
                    onClick={() =>
                      handleAnswerClick(answer, currentQuestion.correctAnswer)
                    } // Check if the clicked answer is correct
                  >
                    {answer}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralKnowledge;