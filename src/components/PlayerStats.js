import { useEffect, useState } from 'react';
import PlayerStatsItem from './PlayerStatsItem';

const PlayerStats = () => {
    const [profiles, setProfiles] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/profiles');
                const data = await response.json();

                // Extract the profiles from the object
                if (data && Array.isArray(data.profiles)) {
                    setProfiles(data.profiles);
                } else {
                    console.error('Unexpected response format:', data);
                    setProfiles([]); // Empty array if error
                }
            } catch (error) {
                console.error('Error fetching profiles:', error);
                setProfiles([]); // Empty array if error
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div>
            <h1>Player Stats</h1>
            {profiles.length > 0 ? (
                profiles.map((profile) => (
                    <PlayerStatsItem
                        myprofiles={profile} // Pass each profile to PlayerStatsItem
                        key={profile._id}
                    />
                ))
            ) : (
                <p>Loading profiles...</p> // Show a loading message if profiles are not yet loaded
            )}
        </div>
    );
};

export default PlayerStats;