const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
const contactsPath = path.join(__dirname, 'contacts.json');
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);

  return result || null;
}

async function removeContact(id) {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);

    return result;
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone }; 
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}
module.exports = { listContacts, getContactById, removeContact, addContact };
