import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
import SubmitBar from './components/SubmitBar';
import Note from './components/note';
import * as db from './services/datastore';

let firstTime = true;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
    this.addNewNote = this.addNewNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      // eslint-disable-next-line new-cap
      this.setState({ notes: Map(notes) });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addNewNote(title) {
    db.addNote(title);
    firstTime = false;
    this.state.counter += 1;
  }

  // eslint-disable-next-line class-methods-use-this
  deleteNote(id) {
    db.deleteNote(id);
    this.state.counter -= 1;
  }

  // eslint-disable-next-line class-methods-use-this
  updateNote(id, data) {
    db.onUpdate(id, data);
  }


  // eslint-disable-next-line class-methods-use-this
  renderInstructions(notes) {
    if (firstTime) {
      return (
        <div id="instructions">
          <div id="greeting">Welcome</div> <br />To get started, create a note by<br />entering a title and clicking Submit<br /><br />To add an image, type: ![](<i> *your-img-url* </i>)
          <div id="quote"><i>Writing means <strong>sharing</strong>. It is part of the human condition to want to share things - thoughts, ideas, opinions.</i> </div>
        </div>
      );
    } else { return <p />; }
  }

  render() {
    return (
      <div id="board">
        <SubmitBar onSubmit={this.addNewNote} noteListSize={this.state.notes.size} />
        <div id="instructions">{this.renderInstructions(this.state.notes)}</div>
        <div id="note-component">
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (
              <Note id={id} note={note} delete={this.deleteNote} onUpdate={this.updateNote} />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
