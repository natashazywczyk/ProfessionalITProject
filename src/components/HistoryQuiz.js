import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";

const HistoryQuiz = () => {
 const [apiData, setApiData] = useState([]); // Store data from API
   const [loading, setLoading] = useState(true); // Display while fetch is happening
   const [error, setError] = useState(null); // Handle errors
   const [rightCorrectAnswers, setRightCorrectAnswers] = useState(0); // Keeps track of the user's correct answer guesses
   const [showCorrectAnswer, setShowCorrectAnswer] = useState(null); // Track the correct answer to show it when answer is guessed
   const [showWrongAnswer, setShowWrongAnswer] = useState(null); // Track the wrong answer to show it when answer is guessed
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index
   const [allAnswers, setAllAnswers] = useState([]); // Store randomized answers for the current question
   const [scoreUpdated, setScoreUpdated] = useState(false); // Checks to see if score has already been updated
   const [timeLeft, setTimeLeft] = useState(10); // Timer for each question
 
   // Function to randomize the position of possible answers
   const randomise = (answers) => {
     return answers.sort(() => Math.random() - 0.5);
   };
 
   // Function to handle when an answer is clicked
   const handleAnswerClick = (chosenAnswer, correctAnswer, answerIndex) => {
     const correctAnswerIndex = allAnswers.findIndex((answer) => answer === correctAnswer);
     setShowCorrectAnswer(correctAnswerIndex);
 
     if (chosenAnswer === correctAnswer) {
       setRightCorrectAnswers((prevCount) => prevCount + 1);
     } else {
       setShowWrongAnswer(answerIndex);
     }
 
     setTimeout(() => {
       setShowCorrectAnswer(null);
       setShowWrongAnswer(null);
       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
       setTimeLeft(10); //Sets timer back to 10
     }, 2000);
   };

  const fetchTriviaData = () => {
    axios
      .get("https://the-trivia-api.com/v2/questions", {
        params: {
          categories: "history", // Gets history style questions
        },
      })
      .then((response) => {
        console.log(response.data);
        setApiData(response.data); // Store the questions
        setLoading(false); // Set loading to false as data is loaded
      })
      // If any errors
      .catch((error) => {
        setError("There was an error with the request.");
        setLoading(false);
        console.error(error);
      });
  };

  // Timer logic
    useEffect(() => {
      if (timeLeft === 0) {
        // If time runs out, show the correct answer and move to the next question
        const correctAnswerIndex = allAnswers.indexOf(apiData[currentQuestionIndex]?.correctAnswer);
        setShowCorrectAnswer(correctAnswerIndex);
  
        setTimeout(() => {
          setShowCorrectAnswer(null);
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setTimeLeft(10); // Sets timer back to 10
        }, 2000);
      }
  
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0)); // Once it hits zero, answer is shown and timer stops
      }, 1000);
  
      return () => clearInterval(timer); // Makes sure to reset timer once timer runs out/question is answered
    }, [timeLeft, allAnswers, currentQuestionIndex, apiData]);
  
    // Randomize answers when the question changes
    useEffect(() => {
      if (apiData.length > 0 && currentQuestionIndex < apiData.length) {
        const currentQuestion = apiData[currentQuestionIndex];
        const randomizedAnswers = randomise([
          currentQuestion.correctAnswer,
          ...currentQuestion.incorrectAnswers,
        ]);
        setAllAnswers(randomizedAnswers);
      }
    }, [currentQuestionIndex, apiData]);
  

  // Update user specific score to database
  const updateScoreInDatabase = async (score) => {
    const currentUser = auth.currentUser; // Get the logged-in user
    if (!currentUser) {
        console.error("No user is currently logged in.");
        return;
    }

    const uid = currentUser.uid; // Check session's current user id from firebase
    try {
        const response = await axios.post("http://localhost:4000/api/updatescore", {
            uid: uid,
            score: Number(score),
        });
        console.log("Score updated successfully:", response.data);
    } 
    catch (error) {
        console.error("Error updating score in database:", error);
    }
};

  useEffect(() => {
    fetchTriviaData();
  }, []);

  // Randomize answers when the question changes
  useEffect(() => {
    if (apiData.length > 0 && currentQuestionIndex < apiData.length) {
      const currentQuestion = apiData[currentQuestionIndex];
      const randomizedAnswers = randomise([
        currentQuestion.correctAnswer,
        ...currentQuestion.incorrectAnswers,
      ]);
      setAllAnswers(randomizedAnswers);
    }
  }, [currentQuestionIndex, apiData]);

  useEffect(() => {
    if (currentQuestionIndex >= apiData.length && apiData.length > 0 && !scoreUpdated) {
        // Update the total score when the quiz is completed
        updateScoreInDatabase(rightCorrectAnswers); // Update score by correct answers
        setScoreUpdated(true); // Mark the score as updated, preventing multiple updates at once
    }
}, [currentQuestionIndex, apiData.length, rightCorrectAnswers, scoreUpdated]);

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
            setCurrentQuestionIndex(0);
            setRightCorrectAnswers(0);
            setScoreUpdated(false);
            setTimeLeft(10); // Set timer back to 10
            fetchTriviaData();
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = apiData[currentQuestionIndex];

  return (
    <div>
      {/* Display the correct answers counter in the top left, but under the navigation bar */}
      <div style={{ position: "absolute", top: "50px", left: "10px" }}>
        Correct Answers: {rightCorrectAnswers}
      </div>

      <div style={{ position: "absolute", top: "50px", right: "10px" }}>
        Time Left: {timeLeft}s
      </div>

      <h1>History Quiz</h1>
      <div>
        {/* Display the current question */}
        <div key={currentQuestion.id}>
          <h3>Question {currentQuestionIndex + 1}:</h3>{" "}
          {/* Display question number */}
          <h5>{currentQuestion.question.text}</h5> {/* Display question text */}
          <div>
            <p style={{ marginTop: "150px" }}>Choose One: </p>
            <ul
              style={{
                listStyleType: "none",
                padding: "0",
                textAlign: "center",
                display: "grid",
                gridTemplateColumns: "repeat(2, auto)", 
                gap: "5px",
                justifyContent: "center", 
                marginTop: "20px",
              }}
            >
              {/* Display possible answers */}
              {allAnswers.map((answer, answerIndex) => {
                const buttonColors = ["#87bdf8", "#9587f8", "#d987f8", "#f887b2"];
                const backgroundColor =
                  showCorrectAnswer === answerIndex ? "#35ee65"
                    : showWrongAnswer === answerIndex ? "#f84545"
                    : buttonColors[answerIndex]

                return (
                  <li key={answerIndex}>
                    <button
                      style={{
                        width: "350px",
                        padding: "20px 40px",
                        margin: "0",
                        backgroundColor: backgroundColor, 
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleAnswerClick(answer, currentQuestion.correctAnswer,  answerIndex)
                      }
                    >
                      {answer}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HistoryQuiz;