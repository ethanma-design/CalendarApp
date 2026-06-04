const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let events = [];
let idCounter = 1;

// Get all events
app.get("/events", (req, res) => {
  res.json(events);
});

// Add event
app.post("/events", (req, res) => {
  const { title, date } = req.body;
  const event = {
    id: idCounter++,
    title,
    date,
  };
  events.push(event);
  res.json(event);
});

// Delete event
app.delete("/events/:id", (req, res) => {
  const id = parseInt(req.params.id);
  events = events.filter(e => e.id !== id);
  res.sendStatus(204);
});

app.listen(5000, () => console.log("Server running on port 5000"));
