import React, { useState, useEffect } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profiles, setProfiles] = useState([]); // State to store all profiles
    const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

    useEffect(() => {
        // Fetch all profiles from the backend
        const fetchProfiles = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/profiles');
                const data = await response.json();

                // Check if the response contains profiles
                if (data && Array.isArray(data.profiles)) {
                    setProfiles(data.profiles); // Store profiles in state
                } else {
                    console.error('Unexpected response format:', data);
                }
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        fetchProfiles();
    }, []); // Run only once when the component loads

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the entered username and password match any profile
        const matchingProfile = profiles.find(
            (profile) => profile.username === username && profile.password === password
        );

        if (matchingProfile) {
            // Successful login
            alert(`Welcome, ${matchingProfile.username}!`);
            // Redirect or perform further actions here
        } else {
            // Failed login
            setErrorMessage('Invalid username or password. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login to Your Trivia Profile</h2>
            <br />
            <div className="container w-50 mt-6">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <br />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;