import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const addEvent = async () => {
    const res = await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date }),
    });
    const newEvent = await res.json();
    setEvents([...events, newEvent]);
  };

  const deleteEvent = async (id) => {
    await fetch(`http://localhost:5000/events/${id}`, {
      method: "DELETE"
    });
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="App">
      <h1>📅 My Calendar</h1>

      <div className="form">
        <input
          placeholder="Event title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button onClick={addEvent}>Add</button>
      </div>

      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.title} - {event.date}
            <button onClick={() => deleteEvent(event.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
``
