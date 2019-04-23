# lab3-StickyNotes

## Description

My program is a sticky-note based app where multiple user can add, move, edit, and delete notes. This app uses React and Firebase as a backend database to store collections of notes. In Firebase, the poition (including z-indexing) of the notes are stored so that multiple browsers can edit in real time. The notes support markdaon (so that images can be input) and editing of titles and text. 

In my structure, I have a main class that acts as the board the sticky notes are placed on. I have a note class where individual notes can be updated, modified, or deleted based on their unique ids. I have a submit class that holds the data to create a new class given an input-ed title. All of this information is stored in Firebase. 

## What Did/Didn't Work

Did not work: 
- At first, I tried to make too many react components for an individual sticky note. The passing of data immedately became too complex. 
- Jumping into react without mapping the flow of the data was a poor decision. It led to lots of errors and unnecesarily complex code.

Did work: 
- using the debugger saved lots of time in this project. To step through my program and follow the data helped me catch errors a bit quicker.


## Extra Credit
+ z-indexing
+ total card counter
+ styling

lab3-overlake333 created by GitHub Classroom
