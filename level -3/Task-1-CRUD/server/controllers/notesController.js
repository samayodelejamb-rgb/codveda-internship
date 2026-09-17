const { readAll, writeAll } = require("../store");
const { createNoteObject } = require("../models/Note");

function getNotes(req, res) {
  try {
    const { search = "", view = "all" } = req.query;
    let notes = readAll();

    if (view === "trash") {
      notes = notes.filter((n) => n.isTrashed);
    } else {
      notes = notes.filter((n) => !n.isTrashed);
      if (view === "favorites") notes = notes.filter((n) => n.isFavorite);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      notes = notes.filter(
        (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
      );
    }

    notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes", error: err.message });
  }
}

function getNoteById(req, res) {
  try {
    const note = readAll().find((n) => n._id === req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch note", error: err.message });
  }
}

function createNote(req, res) {
  try {
    const notes = readAll();
    const note = createNoteObject(req.body);
    notes.push(note);
    writeAll(notes);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: "Failed to create note", error: err.message });
  }
}

function updateNote(req, res) {
  try {
    const notes = readAll();
    const index = notes.findIndex((n) => n._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Note not found" });

    const { title, content } = req.body;
    notes[index] = {
      ...notes[index],
      title: title?.trim() || "Untitled",
      content: content ?? notes[index].content,
      updatedAt: new Date().toISOString(),
    };
    writeAll(notes);
    res.json(notes[index]);
  } catch (err) {
    res.status(400).json({ message: "Failed to update note", error: err.message });
  }
}

function toggleFavorite(req, res) {
  try {
    const notes = readAll();
    const index = notes.findIndex((n) => n._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Note not found" });

    notes[index].isFavorite = !notes[index].isFavorite;
    notes[index].updatedAt = new Date().toISOString();
    writeAll(notes);
    res.json(notes[index]);
  } catch (err) {
    res.status(400).json({ message: "Failed to update favorite", error: err.message });
  }
}

function trashNote(req, res) {
  try {
    const notes = readAll();
    const index = notes.findIndex((n) => n._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Note not found" });

    notes[index].isTrashed = true;
    notes[index].trashedAt = new Date().toISOString();
    notes[index].updatedAt = new Date().toISOString();
    writeAll(notes);
    res.json(notes[index]);
  } catch (err) {
    res.status(400).json({ message: "Failed to trash note", error: err.message });
  }
}

function restoreNote(req, res) {
  try {
    const notes = readAll();
    const index = notes.findIndex((n) => n._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Note not found" });

    notes[index].isTrashed = false;
    notes[index].trashedAt = null;
    notes[index].updatedAt = new Date().toISOString();
    writeAll(notes);
    res.json(notes[index]);
  } catch (err) {
    res.status(400).json({ message: "Failed to restore note", error: err.message });
  }
}

function deleteNote(req, res) {
  try {
    const notes = readAll();
    const exists = notes.some((n) => n._id === req.params.id);
    if (!exists) return res.status(404).json({ message: "Note not found" });

    writeAll(notes.filter((n) => n._id !== req.params.id));
    res.json({ message: "Note permanently deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note", error: err.message });
  }
}

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  toggleFavorite,
  trashNote,
  restoreNote,
  deleteNote,
};
