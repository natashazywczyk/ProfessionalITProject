import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase auth

const CreateProfile = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [currentUser, setCurrentUser] = useState(null); // State to store the logged-in user
    const navigate = useNavigate();

    //Check and log the currently logged-in user
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user); // Set the logged-in user
            console.log("Currently logged-in user:", 
              {
                uid: user.uid,
                email: user.email,
              });
          } 
          else {
            setCurrentUser(null);
            console.log("No user is currently logged in.");
          }
      });

      // Cleanup the listener
      return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          // Call method to allow for Firebase authentication
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const uid = userCredential.user.uid; // Get the Firebase UID

          console.log("Firebase user created with UID: ", uid);

          // Make user profile using values below
          const profile = { username, email, password, profilePicture, score: 0, uid };

          navigate("/login");

          // Push user information to database
          const response = await axios.post("http://localhost:4000/api/profiles", profile);
          console.log("Profile created successfully:", response.data);
      }
      catch (error) {
        console.error("Could not create profile: ", error);
        alert("Could not make profile. Please try again. Make sure all fields are filled.");
      }
    };

    return (
        <div>
          <h2>Create Trivia Profile!</h2>
          <br />
          <div className="container w-50 mt-6">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username: </label>
                  {/*Username Input */}
                  <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <label>Email: </label>
                  {/*Email Input */}
                  <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <label>Password: </label>
                  {/*Password Input */}
                  <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <label>Profile Picture: </label>
                  {/*Profile Picture Input */}
                  <input
                      className="form-control"
                      value={profilePicture}
                      onChange={(e) => setProfilePicture(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input type="submit" value="Create Profile"  style=
                    {{ 
                      backgroundColor: "#9587f8", 
                      color: "white", 
                      border: "none", 
                      borderRadius: "10px",
                      padding: "10px"
                    }} 
                  />
                </div>
            </form>
          </div>
          <br></br><br></br>
        <p>Already have an account?</p>
        <button 
        style=
        {{ 
          backgroundColor: "#d2afff", 
          color: "white", 
          border: "none", 
          borderRadius: "10px"
        }} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    );
};

export default CreateProfile;
