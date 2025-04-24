import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const PlayerStatsItem = (props) => {
  useEffect(() => {
      console.log("Player Profile:", props.myprofiles);
  }, [props.myprofiles]);

  return (
    <div  className="container w-50 mt-6"
      style={{
          display: "flex", // Use flexbox for alignment
          alignItems: "center", // Vertically align items
          marginBottom: "20px", // Add space between items
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
          {props.rank}.
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