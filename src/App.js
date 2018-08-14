import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ListContacts from "./components/ListContacts"
import AddContact from "./components/AddContact"

import * as ContactAPI from "./utils/ContactsAPI"


class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
  }

  /**
   * Load all Contacts from Server
   */
  componentDidMount() {
    ContactAPI.getAll().then(users => {
      this.setState({ contacts: users })
    })
      .catch(err => console.error(err))
  }

  /**
   * Delete as specfic contact
   * @param {object} _contactToDelete - Contact Object from Contact-List which should get deleted
   */
  deleteContact = (_contactToDelete) => {
    ContactAPI.remove(_contactToDelete).then(value => {
      console.log(value);
    })
      .catch(err => console.error(err))
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(contact => { return contact.id != _contactToDelete.id })
    }))
  }

  /**
   * Add a new Contact
   * @param {object} _contactToAdd - Contact Object to add to the ContactList.
   */
  addContact = (_contactToAdd) => {
    ContactAPI.create(_contactToAdd).then(createdContact => {
      this.setState(currentState => ({
        contacts: [...currentState.contacts, createdContact]
      }))
    })
      .catch(err => console.error(err))
  }

  /**
   * Render method of the App-Component
   */
  render() {
    return (
      <div>
        {/* Render all contacts */}
        <Route exact path='/' render={() =>
          (
            <ListContacts
              onDeleteContact={this.deleteContact}
              contacts={this.state.contacts}
            />
          )}
        />

        {/* Render Component to create a new Contact */}
        <Route path='/create' render={({ history }) =>
          (
            <AddContact
              onCreateContact={(contact) => {
                this.addContact(contact);
                history.push('/')
              }}
            />
          )}
        />
      </div>
    )
  }
}

export default App;
