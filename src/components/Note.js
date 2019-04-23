import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Draggable from 'react-draggable';
import marked from 'marked';

// to keep track of Z index
let zIndex = 0;
class Note extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { editing: false };

    this.titleChange = this.titleChange.bind(this);
    this.textChange = this.textChange.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.isEditingCheck = this.isEditingCheck.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderText = this.renderText.bind(this);
  }

  titleChange(event) {
    this.props.update(this.props.id, { title: event.target.value });
  }

  textChange(event) {
    this.props.update(this.props.id, { text: event.target.value });
  }

  deleteNote(event) {
    event.preventDefault();
    this.props.delete(this.props.id);
  }

  // eslint-disable-next-line class-methods-use-this
  startDrag(event) {
    // change index to largest number when note is dragged
    zIndex += 1;
  }

  drag(e, ui) {
    this.props.update(this.props.id, { x: ui.x, y: ui.y, z: zIndex });
  }

  // Adapted from:  https://eddyerburgh.me/toggle-visibility-with-react
  isEditingCheck(event) {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  renderButton() {
    if (this.state.editing) {
      return (<i className="fas fa-check-circle" />);
    } else {
      return (<i className="fas fa-pen" />);
    }
  }

  renderTitle() {
    const { title } = this.props.note;
    if (this.state.editing) {
      return (<input type="text" onChange={this.titleChange} className="title" value={title} />);
    } else {
      return (<p className="title">{title}</p>);
    }
  }

  renderText() {
    if (this.state.editing) {
      return (<TextareaAutosize className="text" value={this.props.note.text} onChange={this.textChange} />);
    } else {
      return (
        // eslint-disable-next-line react/no-danger
        <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".class-of-note-mover-element"
        grid={[25, 25]}
        defaultPosition={{ x: 50, y: 50 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.startDrag}
        onDrag={this.drag}
      >
        <div id={this.props.id} className="wrapper" style={{ zIndex: this.props.note.z }}>
          <div id="title-component">
            {this.renderTitle()}
            <div id="button-container">
              <button id="edit-note" type="button" onClick={this.isEditingCheck}>{this.renderButton()}</button>
              <button id="move-note" className="class-of-note-mover-element" type="button"><i className="fas fa-arrows-alt" /></button>
              <button id="delete-note" type="button" onClick={this.deleteNote}><i className="fa fa-trash" /></button>
            </div>
          </div>
          {this.renderText()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
