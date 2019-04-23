import firebase from 'firebase';

// Set the configuration for your app
// TODO: Replace with your project's config object
const config = {
  apiKey: 'AIzaSyDQ8rquNnO6mAXAXtQdKGahbOy8tBcn8do',
  authDomain: 'lab3-a2cbb.firebaseapp.com',
  databaseURL: 'https://lab3-a2cbb.firebaseio.com/',
  storageBucket: 'lab3-a2cbb.appspot.com',
  projectId: 'lab3-a2cbb',
};

firebase.initializeApp(config);

// Get a reference to the database service
const databaseRef = firebase.database();

export function fetchNotes(callback) {
  // do something here
  databaseRef.ref('notes').on('value', (snapshot) => {
    // callback() when done
    callback(snapshot.val());
  });
}

export function addNote(title) {
  const newNote = {
    title, text: '', x: 0, y: 0, z: 0,
  };
  databaseRef.ref('notes').push(newNote);
}

export function onUpdate(id, data) {
  databaseRef.ref('notes').child(id).update(data);
}

export function deleteNote(id) {
  databaseRef.ref('notes').child(id).remove();
}
