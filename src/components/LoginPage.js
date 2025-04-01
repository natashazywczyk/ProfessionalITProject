import React, { useState, useEffect } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profiles, setProfiles] = useState([]); // State to store all profiles

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