import React, { useState } from "react";
import "./AddMission.css";
import { useMissions } from "../../context/MissionContext";
import { Mission } from "../../types/mission";

const AddMission: React.FC = () => {
  const { addMission } = useMissions();
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed">("Pending");
  const [priority, setPriority] = useState<"Low" | "High">("Low");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMission: Mission = {
      _id: Math.random().toString(36).substr(2, 9), 
      name,
      status,
      priority,
      description,
    };
    await addMission(newMission);
    setName("");
    setStatus("Pending");
    setPriority("Low");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-mission-form">
      <h2>Add a New Mission</h2>
      <input
        type="text"
        placeholder="Mission Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value as "Low" | "High")}>
        <option value="Low">Low</option>
        <option value="High">High</option>
      </select>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Mission</button>
    </form>
  );
};

export default AddMission;
