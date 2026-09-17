const express = require("express");
const router = express.Router();
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  toggleFavorite,
  trashNote,
  restoreNote,
  deleteNote,
} = require("../controllers/notesController");

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.patch("/:id/favorite", toggleFavorite);
router.patch("/:id/trash", trashNote);
router.patch("/:id/restore", restoreNote);
router.delete("/:id", deleteNote);

module.exports = router;
