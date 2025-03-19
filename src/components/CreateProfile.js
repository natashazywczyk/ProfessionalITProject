import { useState } from "react";
import axios from "axios";

const CreateProfile = () => {
    //Information to be stored
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    //const [score, setScore] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const profile = {username, password, profilePicture};
        console.log(profile);

        axios.post('http://localhost:4000/api/profiles', profile)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.data));
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