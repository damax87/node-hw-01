const argv = require("yargs").argv;
const contactsService = require("./contacts")

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
        const allContacts = await contactsService.listContacts();
        return console.log(allContacts);
        break;
  
      case "get":
        const oneContact = await contactsService.getContactById(id);
        return console.log(oneContact);
        break;
  
      case "add":
        const newContact = await contactsService.addContact({name, email, phone});
        return console.log(newContact);
        break;
  
      case "remove":
        const deleteContact = await contactsService.removeContact(id);
        return console.log(deleteContact);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }

  invokeAction(argv);
