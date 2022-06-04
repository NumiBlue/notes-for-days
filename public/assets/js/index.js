let noteWhat;
let noteTxt;
let savNote;
let newNotes;
let listaNotes;

if (window.location.pathname === '/notes') {
  noteWhat = document.querySelector('.note-title');
  noteTxt = document.querySelector('.note-textarea');
  savNote = document.querySelector('.save-note');
  newNotes = document.querySelector('.new-note');
  listaNotes = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const savNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hide(savNote);

  if (activeNote.id) {
    noteWhat.setAttribute('readonly', true);
    noteTxt.setAttribute('readonly', true);
    noteWhat.value = activeNote.title;
    noteTxt.value = activeNote.text;
  } else {
    noteWhat.removeAttribute('readonly');
    noteTxt.removeAttribute('readonly');
    noteWhat.value = '';
    noteTxt.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteWhat.value,
    text: noteTxt.value,
  };
  savNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteWhat.value.trim() || !noteTxt.value.trim()) {
    hide(savNote);
  } else {
    show(savNote);
  }
};

// Render the list of note titles
const renderlistaNotes = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    listaNotes.forEach((el) => (el.innerHTML = ''));
  }

  let listaNotesItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    listaNotesItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    listaNotesItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    listaNotesItems.forEach((note) => listaNotes[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderlistaNotes);

if (window.location.pathname === '/notes') {
  savNote.addEventListener('click', handleNoteSave);
  newNotes.addEventListener('click', handleNewNoteView);
  noteWhat.addEventListener('keyup', handleRenderSaveBtn);
  noteTxt.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
