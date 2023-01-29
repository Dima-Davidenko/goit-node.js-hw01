const argv = require('yargs').argv;
const contacts = require('./contacts.js');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case 'get':
      if (typeof id === 'boolean' || !id) {
        console.log('\x1B[31mNot successful. ID is required!');
        break;
      }
      const contact = await contacts.getContactById(String(id));
      console.log(contact);
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
      const newContact = await contacts.addContact(name, email, phone);
      console.log('\x1B[32mCreated \n\x1b[0m', newContact);
      break;

    case 'remove':
      if (typeof id === 'boolean' || !id) {
        console.log('\x1B[31mNot successful. ID is required!');
        break;
      }
      const updContacts = await contacts.removeContact(String(id));
      console.log('\x1B[32mDeleted \nUpdated contacts list:\n\x1b[0m', updContacts);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
