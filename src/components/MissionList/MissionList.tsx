import React from "react";
import "./MissionList.css";
import { useMissions } from "../../context/MissionContext";

const MissionList: React.FC = () => {
  const { missions, error, deleteMission, updateMissionStatus } = useMissions();

  if (error) return <div>{error}</div>;

  return (
    <div className="mission-list">
      <h2>Military Missions</h2>
      <ul>
        {missions.map((mission) => (
          <li key={mission._id} className={`mission-item ${mission.status.toLowerCase()}`}>
            <h3>{mission.name}</h3>
            <p>Status: {mission.status}</p>
            <p>Priority: {mission.priority}</p>
            <p>Description: {mission.description}</p>
            <button className="delete-btn" onClick={() => deleteMission(mission._id)}>
              Delete
            </button>
            {mission.status === "Pending" && (
              <button className="start-btn" onClick={() => updateMissionStatus(mission._id, mission.status)}>
                Start
              </button>
            )}
            {mission.status === "In Progress" && (
              <button className="complete-btn" onClick={() => updateMissionStatus(mission._id, mission.status)}>
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionList;
