import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'

class ListContacts extends Component {

  state = {
    query: ''
  }

  /**
   * Set query to filter contacts
   * @param {string} value - Query to filter contacts
   */
  changeQuery(value) {
    this.setState(currState => ({ query: value.trim() }))
  }

  /**
   * Resets the query which is set to filter contacts
   */
  resetQuery() {
    this.changeQuery('')
  }

  /**
   * Render fucntion of the ListContacts component which is responsible 
   * to render all contact which match the entered search-criteria
   */
  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state

    /* Get contacts which match the search-criteria. case-insensitiv */
    const contactsToShow = query.length === 0
      ? contacts
      : contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))

    return (
      <div className='list-contacts'>
        { /* Search-field to filter contacts */}
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search Contacts'
            onChange={(event) => { this.changeQuery(event.target.value) }}
            value={query}
          />
          <Link to="/create" className='add-contact'>
            Add Contact
          </Link>
        </div>
        {
          /* If contacts has been filtered, show an information */
          contactsToShow.length !== contacts.length && (
            <div className='showing-contacts'>
              <span>{`Currently showing ${contactsToShow.length} of ${contacts.length} users - `}</span>
              <button onClick={() => this.resetQuery()}>Show all</button>
            </div>
          )
        }
        { /* Show all contacts (name, avatar, remove-Button) which match the search-criteria */ }
        <ol className='contact-list'>
          {
            contactsToShow.map(contact =>
              <li key={contact.id} className='contact-list-item'>
                <div className='contact-avatar'
                  style={{ backgroundImage: `url(${contact.avatarURL})` }}>
                </div>
                <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.handle}</p>
                </div>
                <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                  Remove
                </button>
              </li>
            )
          }
        </ol>
      </div>
    )
  }
}

ListContacts.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
}

export default ListContacts