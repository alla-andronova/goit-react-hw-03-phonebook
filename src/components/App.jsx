import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      name,
      number,
      id: uuidv4(),
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onDeleteClick = e => {
    const id = e.target.dataset.id;
    const newContacts = this.state.contacts.filter(
      contact => contact.id !== id,
    );

    this.setState({
      contacts: newContacts,
      filter: '',
    });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = normalizedFilter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter),
        )
      : contacts;

    return (
      <>
        <h1 style={{ textAlign: 'center' }}>Phonebook</h1>

        <ContactForm onSubmit={this.addContact} />

        {contacts.length > 0 && (
          <h2 style={{ textAlign: 'center' }}>Contacts</h2>
        )}

        {contacts.length > 0 && (
          <Filter onChange={this.handleFilterChange} value={filter} />
        )}

        <ContactList
          contacts={filteredContacts}
          onDeleteClick={this.onDeleteClick}
        />
      </>
    );
  }
}

export default App;
