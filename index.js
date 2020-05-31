require('dotenv').config();
require('isomorphic-fetch');
const slugify = require('slugify');

const server = 'http://127.0.0.1:41184/';

/**
 * Search tag id given tag title
 * @param {string} tagTitle existing tag title
 * @return {string} existing tag id
 */
function searchTagId(tagTitle) {
  const url = [
    server,
    'search?',
    'token=',
    process.env.API_KEY,
    '&query=',
    tagTitle,
    '&type=',
    'tag',
  ].join('');

  return (
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('searching tag id for tag title: ', tagTitle);
        if (data && data.length >= 1) {
          const tagId = data[0].id;
          console.log('> result: ', tagId);
          return (Promise.resolve(tagId));
        }
        return (Promise.reject('Error: tag ', tagTitle, ' not found.'));
      })
  );
}

/**
 * Creates a tag with name specified.
 * @param {string} title original note title
 * @return {string} new tag id
 */
function createTag(title) {
  const url = [
    server,
    'tags?',
    'token=',
    process.env.API_KEY,
  ].join('');
  const tagName = slugify(title, { remove: /[*+~.():;'"!@]/g, lower: true});

  return (
    fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: tagName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('creating tag with name: ', tagName);
        if (data.id) {
          console.log('and id:', data.id);
          return (Promise.resolve(data.id));
        } else if (data.error.includes('already exists')) {
          // look for the tag id using search endpoint
          return (searchTagId(tagName))
            .then((tagId) => {
              return (Promise.resolve(tagId));
            })
        }
        return (Promise.reject('Error creating tag'));
      })
  );
}

/**
 * Assigns given tag to given note.
 * @param {string} tagId
 * @param {string} nodeId
 * @param {string} noteTitle for log
 */
function assignTagToNote(tagId, noteId, noteTitle) {
  const url = [
    server,
    'tags/',
    tagId,
    '/notes',
    '?token=',
    process.env.API_KEY,
  ].join('');

  return (
    fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: noteId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`* assigning tag (${tagId}) to note ${noteTitle} (${noteId})`);
      })
  );
}

/**
 * Run all over all joplin notes, assigning each one a tag named as its own title
 */
function fetchAllNotes() {
  const url = [
    server,
    'notes?',
    'token=',
    process.env.API_KEY,
  ].join('');

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((note) => {
        const { id: noteId, title: noteTitle } = note;
        createTag(noteTitle)
          .then((tagId) => {
            assignTagToNote(tagId, noteId, noteTitle);
          })
          .catch((err) => {
            console.log('ERROR: ', err);
          })
      });
    })
}

fetchAllNotes();