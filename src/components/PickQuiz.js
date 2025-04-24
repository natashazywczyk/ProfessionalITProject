import React from "react";
import { useNavigate } from "react-router-dom";

const PickQuiz = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Pick Your Quiz Type</h1>
            <div>
                {/* Click to go to text question quiz */}
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
                    onClick={() => navigate("/generalknowledge")}
                >
                    General Knowledge
                </button>

                {/* Click to get picture quesiton quiz*/}
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
                    onClick={() => navigate("/historyquiz")} // Placeholder for now
                >
                    History
                </button>
            </div>
        </div>
    );
};

export default PickQuiz;