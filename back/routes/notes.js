const express = require("express");
const Note = require("../models/Note");
const moment = require("moment-timezone");
const router = express.Router();

// Create a note
router.post("/", async (req, res) => {
  const { title, content, tags, image } = req.body;
  try {
    const newNote = await Note.create({ title, content, tags, image });
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note", details: err });
  }
});

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();

    // Форматируем дату для каждой заметки
    const formattedNotes = notes.map((note) => {
      note.createdAt = moment(note.createdAt)
        .tz("Asia/Bishkek")
        .format("YYYY-MM-DD HH:mm:ss");
      return note;
    });

    res.status(200).json(formattedNotes);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve notes", details: err });
  }
});

// Get a note by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    // Форматируем дату для этой заметки
    note.createdAt = moment(note.createdAt)
      .tz("Asia/Bishkek")
      .format("YYYY-MM-DD HH:mm:ss");
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve note", details: err });
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, image } = req.body; // image - необязательное поле
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, tags, image },
      { new: true, runValidators: true }
    );
    if (!updatedNote) return res.status(404).json({ error: "Note not found" });

    // Форматируем дату для обновленной заметки
    updatedNote.createdAt = moment(updatedNote.createdAt)
      .tz("Asia/Bishkek")
      .format("YYYY-MM-DD HH:mm:ss");
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note", details: err });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) return res.status(404).json({ error: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note", details: err });
  }
});

module.exports = router;
