import React, { Component } from 'react';

class SubmitBar extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  addNote(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.title);

    // resetting the variable title after note is created
    this.setState({ title: '' });
  }

  render() {
    return (
      <form id="add-note">
        <input type="text" id="inputText" placeholder="New Title" onChange={this.onInputChange} value={this.state.title} />
        <button type="button" id="submitButton" onClick={this.addNote}>Submit</button>
        <div id="wrap-counter">
          <div id="total"><strong>Total Cards:</strong> {this.props.noteListSize}</div>
        </div>
      </form>
    );
  }
}


export default SubmitBar;
