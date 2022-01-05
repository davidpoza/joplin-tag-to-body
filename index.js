require('dotenv').config();
require('isomorphic-fetch');
const slugify = require('slugify');

const server = 'http://127.0.0.1:41184/';

/*returns a string like "#tag1 #complex-tag #another-tag" */
async function getNoteTags(noteId) {
  const url = [
    server,
    `notes/${noteId}/tags`,
    '?token=',
    process.env.API_KEY,
  ].join('');
  const res = await fetch(url);
  const data = await res.json();
  if (!data.items) return '';
  return data.items.reduce((prev, curr) => {
    return (`${prev} #${slugify(curr.title)}`);
  }, '');
}

/**
 * Run all over all joplin notes in specified folder.
 * If not folderId is provided then fetches all notes.
 * @param {string} folderId
 */
async function getAllNotes(folderId, page) {
  const url = [
    server,
    folderId ? `folders/${folderId}/notes?` : 'notes?',
    'token=',
    process.env.API_KEY,
    '&fields=id,body,title',
    '&limit=100',
    `&page=${page}`
  ].join('');

  const res = await fetch(url);
  const data = await res.json();

  return data;
}

function updateNoteBody(noteId, newBody) {
  const url = [
    server,
    `notes/${noteId}`,
    '?token=',
    process.env.API_KEY,
  ].join('');

  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      body: newBody
    })
  });
}

(async () => {
  let total = 0;
  let pageNum = 1;
  let res = { items: [], has_more: true };
  do {
    console.log(`retrieving page: ${pageNum}`);
    res = await getAllNotes(null, pageNum);
    total += res.items.length;
		res.items.forEach(async (note) => {
      const oldBody = note.body;
      const tags = await getNoteTags(note.id);
      const newBody = `${tags}\n${oldBody}`;
      if (tags) console.log(`${note.title}, adding ${tags}`);
      try {
        await updateNoteBody(note.id, newBody);
      } catch (err) {
        console.log(err);
        return;
      }
    });
    pageNum++;
	} while (res.has_more);
  console.log(`SUCCESS!. ${total} notes were tagged.`)
})();

