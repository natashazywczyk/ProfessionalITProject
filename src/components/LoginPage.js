import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import Firebase auth
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //Firebase login
            const userLogin = await signInWithEmailAndPassword(auth, email, password);
            const uid = userLogin.user.uid;

            console.log('Logged in user UID:', uid);

            //Use the UID to get user inf9ormation from mongoDB
            const response = await axios.get(`http://localhost:4000/api/profiles?uid=${uid}`);
            const userProfile = response.data;

            if (userProfile) {
                alert("Welcome!");
                // Perform further actions, such as redirecting to a dashboard
            } 
            else {
                setErrorMessage('User profile not found in the database.');
            }
        } 
        catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            <h5>Log into your account below</h5>
            <br />
            <div className="container w-50 mt-6">
                <form onSubmit={handleSubmit}>
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
                    <br />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <div className="form-group">
                        <input type="submit" value="Login" style=
                            {{ 
                                backgroundColor: "#9587f8", 
                                color: "white", 
                                border: "none", 
                                borderRadius: "10px",
                                padding: "10px 20px"
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;