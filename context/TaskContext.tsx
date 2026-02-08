import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Project Proposal",
      description: "",
      createdAt: new Date("2026-10-24T08:00:00"),
      deadline: {
        date: new Date("2026-10-24"),
        time: new Date("2026-10-24T14:00:00"),
      },
      important: true,
      reminderEnabled: false,
      reminderTiming: null,
    },
    {
      id: 2,
      title: "Grocery Shopping",
      description: "",
      createdAt: new Date("2026-10-24T10:15:00"),
      deadline: {
        date: new Date("2026-10-24"),
        time: new Date("2026-10-24T18:00:00"),
      },
      important: false,
      reminderEnabled: false,
      reminderTiming: null,
    },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
