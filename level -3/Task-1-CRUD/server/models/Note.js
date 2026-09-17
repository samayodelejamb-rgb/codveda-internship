const crypto = require("crypto");

function createNoteObject({ title, content }) {
  const now = new Date().toISOString();
  return {
    _id: crypto.randomUUID(),
    title: title?.trim() || "Untitled",
    content: content || "",
    isFavorite: false,
    isTrashed: false,
    trashedAt: null,
    createdAt: now,
    updatedAt: now,
  };
}

module.exports = { createNoteObject };
