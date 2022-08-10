import PropTypes from "prop-types";
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm.styled';
import { AddContactButton } from './ContactForm.styled';
import { Input } from './ContactForm.styled';
import { Label } from './ContactForm.styled';

export default function Form({contacts, addContact}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    
    const handleNameInfo = e => {
        const { name, value } = e.target;

       switch (name) {
           case 'name':
               setName(value)
               break;
           case 'number':
               setNumber(value)
               break;
           default:
               break;
       }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        for (const el of contacts) {
            if (el.name === name) {
                alert(`${el.name} is already in contacts`);
                return;
            }
        };
        
        const newContact = {
            id: nanoid(),
            name: name,
            number: number,
        };

        addContact(newContact);
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };


    return (
        <ContactForm onSubmit={onSubmit}>
            <Label>Name
                <Input
                    onChange={handleNameInfo}
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </Label>
            <Label>Number
                <Input
                    onChange={handleNameInfo}
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </Label>
            <AddContactButton>Add contact</AddContactButton>
        </ContactForm>
    );
}

Form.propTypes = {
        name: PropTypes.string,
        number: PropTypes.number
    };

