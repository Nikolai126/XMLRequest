const fs = require('fs');

function getNotes() {
  try {
    const notesBuffer = fs.readFileSync('notes.json');
    return JSON.parse(notesBuffer.toString());
  } catch (err) {
    return [];
  }
}

function addNote(title, body) {
  const notes = getNotes();
  const titles = notes.map((note) => note.title);

  if (titles.includes(title)) {
    return;
  }
  notes.push({ title, body });
  fs.writeFileSync('notes.json', JSON.stringify(notes), function(err) {
    if (err) console.log('error:', err)
  });
}


function delNote(title) {
  const notes = getNotes();
  let index = notes.findIndex(function (note) {
      return note.title === title;
  });
  if (index > -1) {
    notes.splice(index, 1);
    fs.writeFileSync('notes.json', JSON.stringify(notes), function(err) {
      if (err) console.log('error:', err)
    });
  }
  else {
    console.log(`WARNING! "${title}" is not exist!`);
  }  
}

module.exports = {
  addNote,
  delNote
};

