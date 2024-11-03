import React, { createContext, useContext, useEffect, useState } from "react";
import { Mission } from "../types/mission";

interface MissionContextProps {
  missions: Mission[];
  error: string | null;
  fetchMissions: () => void;
  addMission: (mission: Mission) => Promise<void>;
  deleteMission: (missionId: string) => Promise<void>;
  updateMissionStatus: (missionId: string, currentStatus: Mission["status"]) => Promise<void>;
}

const MissionContext = createContext<MissionContextProps>({
  missions: [],
  error: null,
  fetchMissions: () => {},
  addMission: async () => {},
  deleteMission: async () => {},
  updateMissionStatus: async () => {},
});

export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_API_KEY; 
  const baseUrl = import.meta.env.VITE_BASE_URL; 

  const fetchMissions = async () => {
    try {
      const res = await fetch(`${baseUrl}/${apiKey}`);
      if (!res.ok) throw new Error("Failed to fetch missions");
      const data = await res.json();
      setMissions(data);
    } catch (error) {
      setError("Failed to load missions");
    }
  };

  const addMission = async (mission: Mission) => {
    try {
      const response = await fetch(`${baseUrl}/${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mission),
      });
      if (!response.ok) throw new Error("Failed to add mission");
      fetchMissions();
    } catch {
      setError("Failed to add mission");
    }
  };

  const deleteMission = async (missionId: string) => {
    try {
      await fetch(`${baseUrl}/${apiKey}/${missionId}`, {
        method: "DELETE",
      });
      setMissions((prevMissions) => prevMissions.filter((m) => m._id !== missionId));
    } catch {
      setError("Failed to delete mission");
    }
  };

  const updateMissionStatus = async (missionId: string, currentStatus: Mission["status"]) => {
    let newStatus: Mission["status"] | null = null;
    if (currentStatus === "Pending") newStatus = "In Progress";
    else if (currentStatus === "In Progress") newStatus = "Completed";

    if (newStatus) {
      try {
        await fetch(`${baseUrl}/${apiKey}/progress/${missionId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        setMissions((prevMissions) =>
          prevMissions.map((m) => (m._id === missionId ? { ...m, status: newStatus } : m))
        );
      } catch {
        setError("Failed to update status");
      }
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  return (
    <MissionContext.Provider
      value={{ missions, error, fetchMissions, addMission, deleteMission, updateMissionStatus }}
    >
      {children}
    </MissionContext.Provider>
  );
};

export const useMissions = () => useContext(MissionContext);
