import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const PlayerStatsItem = (props) => {

    useEffect(() => {
        console.log("Player Profile:", props.myprofiles);
    }, [props.myprofiles]);


    return (
        <div>
        <div className="container w-50 mt-6">
        <Card>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <header>{props.myprofiles.username}</header>
              <img src={props.myprofiles.profilePicture} alt={props.myprofiles.username} //Makes Image change with div
                style={{ maxWidth: '40%', height: 'auto' }} //Adjust size if needed 
                />
              <footer style={{ fontSize: '15px' }}>{props.myprofiles.score}</footer>
              <p></p>
            </blockquote>
          </Card.Body>  
        </Card>
      </div>
      </div>
    );
};

export default PlayerStatsItem;