import React, { useEffect, useState } from "react";
import axios from "axios";

const GeneralKnowledge = () => {
  const [apiData, setApiData] = useState([]); // Store data from API
  const [loading, setLoading] = useState(true); // Display while fetch is happening
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    const fetchData = () => {
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

    fetchData();
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
    </div>
  );
};

export default GeneralKnowledge;
