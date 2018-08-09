import React, { Component } from 'react'
import ListContacts from "./components/ListContacts"
import AddContact from "./components/AddContact"
import * as ContactAPI from "./utils/ContactsAPI"
import { Route } from 'react-router-dom'

class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
  }


  componentDidMount() {
    ContactAPI.getAll().then(users => {
      console.log("Received users");
      this.setState({ contacts: users })
    })
      .catch(err => console.error(err))
  }


  deleteContact = (_contactToDelete) => {
    ContactAPI.remove(_contactToDelete).then(value => {
      console.log(value);
    })
      .catch(err => console.error(err))
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(contact => { return contact.id != _contactToDelete.id })
    }))
  }


  addContact = (_contactToAdd) => {
    ContactAPI.create(_contactToAdd).then(createdContact => {
      this.setState(currentState => ({
        contacts: [...currentState.contacts, createdContact]
      }))
    })
      .catch(err => console.error(err))

  }


  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onDeleteContact={this.deleteContact}
            contacts={this.state.contacts}
          />

        )} />



        <Route path='/create' render={({ history }) => (
          < AddContact
            onCreateContact={(contact) => {
              this.addContact(contact);
              history.push('/')
            }}
          />

        )} />


      </div>
    )
  }
}

export default App;
