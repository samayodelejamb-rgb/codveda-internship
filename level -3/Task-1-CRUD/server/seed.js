const { writeAll } = require("./store");
const { createNoteObject } = require("./models/Note");

const samples = [
  {
    title: "Lecture about UML Diagrams",
    content:
      "UML Diagrams: UML (Unified Modeling Language) diagrams are a standardized way to visualize the design of a system, including class relationships, sequences of interactions, and state transitions.",
  },
  {
    title: "Untitled",
    content:
      "Hey there! We're so glad you're watching this. Here's some information on the Eiffel tower: we'll cover its history, height, and why it's still one of the most visited landmarks in the world.",
  },
  {
    title: "New note for an example",
    content: "",
  },
];

const notes = samples.map(createNoteObject);
writeAll(notes);
console.log(`Seeded ${notes.length} notes.`);
