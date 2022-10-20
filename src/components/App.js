import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList ';
import { Container, Title, SecondTitle } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (nextContacts !== prevContacts) {
      console.log('add contact');
      console.log(nextContacts);
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = newContact => {
    const { name, number } = newContact;
    if (this.checkContactsName(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getContactsByName = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  checkContactsName = name => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    return contacts.some(({ name }) => normalizedName === name.toLowerCase());
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.getContactsByName();
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />

        <SecondTitle>Contacts</SecondTitle>
        {contacts.length > 0 && (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          </>
        )}
        {contacts.length === 0 && <p>There is no contacts</p>}
      </Container>
    );
  }
}
