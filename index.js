const argv = require('yargs').argv;
const contacts = require('./contacts.js');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      try {
        const allContacts = await contacts.listContacts();
        console.log(allContacts);
      } catch (error) {
        console.log('\x1B[31mAn error has occurred! Try again.');
      }
      break;

    case 'get':
      if (typeof id === 'boolean' || !id) {
        console.log('\x1B[31mNot successful. ID is required!');
        break;
      }
      try {
        const contact = await contacts.getContactById(String(id));
        if (contact === null) {
          console.log(`\x1B[31mAn error has occurred! Can't find contact with ID ${id}!`);
          break;
        }
        console.log(contact);
      } catch (error) {
        console.log('\x1B[31mAn error has occurred! Try again.');
      }
      break;

    case 'add':
      let isError = false;
      if (typeof name === 'boolean' || !name) {
        console.log('\x1B[31mName is required!');
        isError = true;
      }
      if (typeof email === 'boolean' || !email) {
        console.log('\x1B[31mEmail is required!');
        isError = true;
      }
      if (typeof phone === 'boolean' || !phone) {
        console.log('\x1B[31mPhone is required!');
        isError = true;
      }
      if (isError) {
        console.log('\x1B[31mNot successful. Please enter all fields!');
        break;
      }
      try {
        const newContact = await contacts.addContact(name, email, phone);
        console.log('\x1B[32mCreated \n\x1b[0m', newContact);
      } catch (error) {
        console.log('\x1B[31mAn error has occurred! Try again.');
      }
      break;

    case 'remove':
      if (typeof id === 'boolean' || !id) {
        console.log('\x1B[31mNot successful. ID is required!');
        break;
      }
      try {
        const updContacts = await contacts.removeContact(String(id));
        if (updContacts === null) {
          console.log(`\x1B[31mAn error has occurred! Can't find contact with ID ${id}!`);
          break;
        }
        console.log('\x1B[32mDeleted \nUpdated contacts list:\n\x1b[0m', updContacts);
      } catch (error) {
        console.log('\x1B[31mAn error has occurred! Try again.');
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
