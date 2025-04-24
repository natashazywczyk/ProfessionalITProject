import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
    //Information to be stored
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create profile object with all fields
        const profile = { 
            username, 
            email,     // Make sure email is included
            password, 
            profilePicture, 
            score: 0,
            uid: null  // Initialize uid as null
        };
        
        console.log('Sending profile:', profile); // Debug log

        axios.post('http://localhost:4000/api/profiles', profile)
        .then((res) => {
            console.log('Server response:', res.data);
            navigate('/login');
        })
        .catch((err) => {
            console.error('Error creating profile:', err);
            alert('Failed to create profile. Please try again.');
        });
    }

    return (  
        <div>
          <h2>Create Trivia Profile!</h2>
          <br></br>
          <div className="container w-50 mt-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username: </label>
                  <input type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                  />
              </div>
              <div className="form-group">
                <label>Email: </label>
                  <input 
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    required
                  />
              </div>
              <div className="form-group">
                <label>Password: </label>
                  <input type="text"
                    className="form-control"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
              </div>
              <div className="form-group">
                <label>Profile Picture: </label>
                  <input
                    className="form-control"
                    value={profilePicture}
                    onChange={(e) => { setProfilePicture(e.target.value) }}
                  />
              </div>
                <br></br>
                <div className="form-group">
                    <input type="submit" value="Create Profile" className="btn btn-success" />
                </div>
              </form>
          </div>
        </div>
      );
}
export default CreateProfile;