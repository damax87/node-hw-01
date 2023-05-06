const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");


async function listContacts() {
   const data = await fs.readFile(contactsPath);
   return JSON.parse(data);
  }
  
async function getContactById(id) {
    const contacts = await listContacts();
    const data = contacts.find(item => item.id === id);
    return data || null;
  }
  
async function addContact(data) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

async function removeContact(id) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [data] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return data;
  }
  
  

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  };