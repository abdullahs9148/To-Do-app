"use client";
import React, { useState, useEffect } from "react";

const page = () => {
  const [todo, settodo] = useState("");
  const [desc, setdesc] = useState("");
  const [maintask, setmaintask] = useState([]);

  // Fetch all tasks from backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setmaintask(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add a task to backend
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo, desc }),
      });
      const newTask = await res.json();
      setmaintask([...maintask, newTask]);
      settodo("");
      setdesc("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task from backend
  const deletehandler = async (id, index) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
        method: "DELETE",
      });
      const updated = [...maintask];
      updated.splice(index, 1);
      setmaintask(updated);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Render task list
  let renderTask = (
    <h3 className="text-center text-xl font-bold">No Task Available</h3>
  );

  if (maintask.length > 0) {
    renderTask = maintask.map((target, index) => (
      <li
        key={target._id}
        className="flex items-center justify-between border-[1px] opacity-90 border-slate-400 p-4 bg-slate-200 mb-2"
      >
        <div className="w-full flex justify-between items-center">
          <h4 className="text-lg font-bold opacity-100">{target.todo}</h4>
          <h6 className="opacity-100">{target.desc}</h6>
        </div>
        <button
          onClick={() => deletehandler(target._id, index)}
          className="bg-red-700 border-[2px] text-white border-zinc-800 px-3 py-2 rounded-lg opacity-100"
        >
          Delete
        </button>
      </li>
    ));
  }

  return (
    <div className="relative w-full h-screen">
      <img
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        src="https://images.unsplash.com/photo-1719836257725-cc6659c4100e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNDh8fHxlbnwwfHx8fHw%3D"
        alt="Background"
      />
      <div className="relative">
        <h1 className="bg-black text-white p-4 text-center text-[40px] font-bold">
          ToDo List
        </h1>
        <form className="w-full m-5 my-12" onSubmit={submithandler}>
          <input
            type="text"
            placeholder="Write your todo"
            className="h-11 w-[300px] border-zinc-800 border-2 rounded-md bg-gray-300 px-2 py-4"
            value={todo}
            onChange={(e) => settodo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Description"
            className="h-11 w-[300px] border-zinc-800 border-2 rounded-md bg-gray-300 px-2 py-4 mx-5"
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
            required
          />
          <button className="bg-black border-[2px] text-white border-zinc-800 px-3 py-2 rounded-lg">
            Add Task
          </button>
        </form>
        <div className="p-6 bg-slate-100 bg-opacity-40 rounded-lg">
          <ul>{renderTask}</ul>
        </div>
      </div>
    </div>
  );
};

export default page;
