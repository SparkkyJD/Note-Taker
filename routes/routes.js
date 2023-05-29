const express = require('express');
// creates express router
const router = express.Router(); 
// generates unique id's
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
// path for db.json
const dataBase = './db/db.json';

// reads db.json
const readData = async () => {
  const data = await fs.readFile(dataBase, 'utf8');
  return JSON.parse(data);
};

// writes data to db.json
const writeData = async (notes) => {
  await fs.writeFile(dataBase, JSON.stringify(notes, null, 2));
};

// gets /notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await readData();
    res.json(notes);
  } catch (err) {
    console.error(err);
  }
});

// post to /notes
router.post('/notes', async (req, res) => {
  try {
    const { title, text } = req.body;
    // reads db.json
    const notes = await readData();
    const newNote = {
      // generates unique ID for new note
      id: uuidv4(),
      title,
      text,
    };
    // Adds new note to array and write updated data to db.json
    notes.push(newNote);
    // write updated data to db.json
    await writeData(notes);
    res.json();
  } catch (err) {
    console.error(err);
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    const noteDelete = req.params.id;
    // reads db.json
    let notes = await readData();
    // removes note & ID from array
    notes = notes.filter((note) => note.id !== noteDelete);
    await writeData(notes);
    res.json();
  } catch (err) {
    console.error(err);
  }
});
// exports router for other files
module.exports = router;