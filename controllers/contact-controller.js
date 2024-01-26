import { Contact } from '../models/contact.js';
import { year } from '../utils/date.js';

export const getContacts = (req, res) => {
  Contact.find({}, { name: 1, phone: 1, email: 1, _id: 0 }).then((contacts) => {
    res.render('contacts', {
      title: 'Contacts',
      year,
      contacts: contacts.map((contact) => contact.toJSON()),
    });
  });
};
