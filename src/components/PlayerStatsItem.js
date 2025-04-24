import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const PlayerStatsItem = (props) => {
  useEffect(() => {
      console.log("Player Profile:", props.myprofiles);
  }, [props.myprofiles]);

  return (
    <div className="container w-50 mt-6">
      <Card>
          <Card.Body style={{ display: "flex", alignItems: "center" }}>
            <img src={props.myprofiles.profilePicture} alt={props.myprofiles.username}
                style={{
                    width: "100px", 
                    height: "100px", 
                    borderRadius: "50%", 
                    objectFit: "cover", 
                    marginRight: "15px"
                }}
            />
            <div>
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