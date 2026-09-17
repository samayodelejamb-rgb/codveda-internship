const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "data", "notes.json");

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
}

function readAll() {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeAll(notes) {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

module.exports = { readAll, writeAll };
