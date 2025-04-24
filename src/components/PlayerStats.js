import { useEffect, useState } from "react";
import PlayerStatsItem from "./PlayerStatsItem";

const PlayerStats = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/profiles");
                const data = await response.json();

                // Sort profiles in descending order of score
                if (data && Array.isArray(data.profiles)) {
                    const descendingProfiles = data.profiles.sort((profile1, profile2) => profile2.score - profile1.score);
                    setProfiles(descendingProfiles);
                } 
                else {
                    console.error("Unexpected response format:", data);
                    setProfiles([]); 
                }
            } 
            catch (error) {
                console.error("Error fetching profiles:", error);
                setProfiles([]);
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