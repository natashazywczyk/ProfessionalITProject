import React from "react";
import { useNavigate } from "react-router-dom";

const PickQuiz = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Pick Your Quiz Type</h1>
            <h4>Choose the type of quiz you'd like to take below!</h4>
            <div style={{ marginTop: "60px"}}>
                {/* Click to go to text question quiz */}
                <button
                    style={{
                        padding: "15px 30px",
                        margin: "10px",
                        backgroundColor: "#87bdf8",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                    }}
                    onClick={() => navigate("/generalknowledge")}
                >
                    General Knowledge
                </button>

                {/* Click to get history quiz*/}
                <button
                    style={{
                        padding: "15px 30px",
                        margin: "10px",
                        backgroundColor: "#9587f8",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                    }}
                    onClick={() => navigate("/historyquiz")}
                >
                    History
                </button>

                {/* Click to get music quiz */}
                <button
                    style={{
                        padding: "15px 30px",
                        margin: "10px",
                        backgroundColor: "#d987f8",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                    }}
                    onClick={() => navigate("/musicquiz")}
                >
                    Music
                </button>
            </div>
        </div>
    );
};

export default PickQuiz;