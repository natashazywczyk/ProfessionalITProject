import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const PlayerStatsItem = (props) => {
  useEffect(() => {
      console.log("Player Profile:", props.myprofiles);
  }, [props.myprofiles]);

  // Icons to be displayed for top 3 users
  const top3img = {
    1: "https://cdn-icons-png.flaticon.com/512/5551/5551284.png",
    2: "https://cdn-icons-png.freepik.com/512/5005/5005572.png",
    3: "https://cdn-icons-png.flaticon.com/512/5005/5005579.png",
  };

  return (
    <div  className="container w-50 mt-6"
      style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px", 
      }}>
      {/* Shows the rank of the user to the left of the user card */}
      <div
        style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginRight: "15px", 
            width: "40px", 
            textAlign: "center"
        }}
        >
        {/* If rank is less/equal to 3, display imgs */}
        {props.rank <= 3 ? (
          <img
              src={top3img[props.rank]}
              alt={`Rank ${props.rank}`}
              style={{ width: "50px", height: "50px"}}
          />
        ) : (
          // If not in top 3, show text
            props.rank + "."
        )}
    </div>

      {/* Shows the user information */}
      <Card style={{ width: "100%"}}>
          <Card.Body style={{ display: "flex", alignItems: "center" }}>
            <img src={props.myprofiles.profilePicture} alt={props.myprofiles.username}
              style={{
                  width: "100px", 
                  height: "100px", 
                  borderRadius: "50%", 
                  objectFit: "cover", 
                  marginRight: "30px"
              }}
            />
            <div style= {{ textAlign: "left" }}>
              <header style={{ fontSize: "20px", fontWeight: "bold" }}>
                {props.myprofiles.username}
              </header>

              <footer>
                Score: {props.myprofiles.score}
              </footer>
            </div>
          </Card.Body>
      </Card>
    </div>
  );
};


export default PlayerStatsItem;