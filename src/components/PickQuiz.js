import React from "react";
import { useNavigate } from "react-router-dom";

const PickQuiz = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Pick Your Quiz Type</h1>
            <div style={{ marginTop: "30px" }}>
                {/* Button for Text Choice Questions */}
                <button
                    style={{
                        padding: "15px 30px",
                        margin: "10px",
                        backgroundColor: "purple",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                    onClick={() => navigate("/generalknowledge")} // Redirect to GeneralKnowledge
                >
                    Text Choice Questions
                </button>

                {/* Button for Picture Questions */}
                <button
                    style={{
                        padding: "15px 30px",
                        margin: "10px",
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                    onClick={() => alert("Picture Questions Coming Soon!")} // Placeholder for now
                >
                    Picture Questions
                </button>
            </div>
        </div>
    );
};

export default PickQuiz;