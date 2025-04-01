import { useEffect, useState } from 'react';

const PlayerStats = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/profiles/list');
                const data = await response.json();
                setProfiles(data);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div>
            {/* Insert Home Page content, providing intro to app and allow users to log in */}
            <h1>Player Stats</h1>
            <ul>
                {profiles.map((profile, index) => (
                    <li key={index}>{profile.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerStats;