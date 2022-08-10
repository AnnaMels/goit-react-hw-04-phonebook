import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import Form from '../ContactForm';
import ContactList from '../ContactsList';
import Filter from '../Filter';
import { PhonebookTitle } from './App.styled';
import { ContactsTitle } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  const addContact = (newContact) => {
    setContacts(prevState => [...prevState, newContact]);
  }


  const handleFilter = (e) => {
    const { value } = e.target;
    setFilter(value);
  }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);
  
  const deleteContact = (id) => {
    const contactsAfterDelete = contacts.filter(contact => contact.id !== id);
    setContacts(contactsAfterDelete);
  }

  return (
    <>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <Form addContact={addContact} contacts={contacts} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter handleFilter={handleFilter} />
      <ContactList contacts={contacts} filter={filter} deleteHandler={deleteContact} />
    </>
  );
}

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  newContact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.number
  })
};

