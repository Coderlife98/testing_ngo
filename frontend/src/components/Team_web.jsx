import axios from "axios";
import React, { useEffect, useState } from "react";
const Team_web = () => {
  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    fetch_data();
  }, []);
  const fetch_data = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/dynamic/listTeam"
      );
      if (Array.isArray(response.data.data)) {
        setTeamData(response.data.data);
      }
      
    } catch (error) {
        Console.log(error);
    }
  };
  return (
    <div className="text-white">
      <div className="grid md:grid-cols-3">
        {console.log(teamData)}
        
      </div>
    </div>
  );
};

export default Team_web;
