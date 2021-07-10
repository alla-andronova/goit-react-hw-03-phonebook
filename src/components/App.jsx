import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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
