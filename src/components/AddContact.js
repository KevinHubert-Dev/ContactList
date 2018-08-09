import React, { Component } from "react"
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'
import PropTypes from "prop-types"

class AddContact extends Component {

  state = {
    name: '',
    handle: ''
  }

  /**
   * Wrapper around async-setState-call to set values of new user which should be created
   * @param {string} key - state-key which should be modified 
   * @param {string} value - value which get set for the specific key in the state
   */
  handleInput(key, value) {
    this.setState(currState => ({ [key]: value }))
  }

  /**
   * Create new user based on the input of the form.
   * @param {event} e - Event of button.
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true })
    console.log(values);
    console.log(values);
    console.log(values);
    this.props.onCreateContact(values);
  }

  /**
   * Render function of the AddContacts-component
   */
  render() {
    return (
      <div>
        <Link className='close-create-contact' to='/'>Close</Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          { /* Avatar */ }
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='create-contact-details'>
            { /* Name-inputfield */}
            <input
              type='text'
              placeholder='Name'
              name='name'
              onChange={(event) => { this.handleInput('name', event.target.value) }}
              value={this.state.name}
            />
            { /* Nickname-inputfield */}
            <input
              type='text'
              placeholder='Handle'
              name='handle'
              onChange={(event) => { this.handleInput('handle', event.target.value) }}
              value={this.state.handle}
            />
            <button>Create</button>
          </div>
        </form>
      </div >
    )
  }
}

AddContact.propTypes = {
  onCreateContact: PropTypes.func.isRequired,
}

export default AddContact