import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Draggable from 'react-draggable';
import marked from 'marked';

let zIndex = 0;
class Note extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { isEditing: false };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.isEditingCheck = this.isEditingCheck.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderText = this.renderText.bind(this);
  }

  onTitleChange(event) {
    this.props.onUpdate(this.props.id, { title: event.target.value });
  }

  onTextChange(event) {
    this.props.onUpdate(this.props.id, { text: event.target.value });
  }

  onDeleteClick(event) {
    event.preventDefault();
    this.props.delete(this.props.id);
  }

  // eslint-disable-next-line class-methods-use-this
  onStartDrag(event) {
    zIndex += 1;
  }

  onDrag(e, ui) {
    this.props.onUpdate(this.props.id, { x: ui.x, y: ui.y, z: zIndex });
  }

  isEditingCheck(event) {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }

  renderEditButton() {
    if (this.state.isEditing) {
      return (<i className="fas fa-check-circle" />);
    } else {
      return (<i className="fas fa-pen" />);
    }
  }

  renderTitle() {
    if (this.state.isEditing) {
      return (
        <input type="text" onChange={this.onTitleChange} className="title" value={this.props.note.title} />
      );
    } else {
      return (
        <p className="title">{this.props.note.title}</p>
      );
    }
  }

  renderText() {
    if (this.state.isEditing) {
      return (
        <TextareaAutosize className="text" value={this.props.note.text} onChange={this.onTextChange} />
      );
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
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div id={this.props.id} className="wrapper" style={{ zIndex: this.props.note.z }}>
          <div id="title-component">
            {this.renderTitle()}
            <div id="button-container">
              <button id="edit-note" type="button" onClick={this.isEditingCheck}>{this.renderEditButton()}</button>
              <button id="move-note" className="class-of-note-mover-element" type="button"><i className="fas fa-arrows-alt" /></button>
              <button id="delete-note" type="button" onClick={this.onDeleteClick}><i className="fa fa-trash" /></button>
            </div>
          </div>
          {this.renderText()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
