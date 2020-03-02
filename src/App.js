import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";

class App extends Component {
  state = {
    contacts: [],
    screen: "list"
  };

  componentDidMount() {
    ContactsAPI.getAll().then(contact => {
      console.log("Contacts in did mount : ", contact);

      this.setState(() => ({
        contacts: contact
      }));
    });
  }

  removeContact = contact => {
    this.setState(CurrentState => ({
      contacts: CurrentState.contacts.filter(c => {
        return c.id !== contact.id;
      })
    }));
    ContactsAPI.remove(contact);
  };

  createContact = contact => {
    ContactsAPI.create(contact).then(res_contact => {
      this.setState(CurrentState => ({
        contacts: CurrentState.contacts.concat([res_contact])
      }));
    });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
              onNavigate={() => {
                this.setState(() => ({
                  screen: "create"
                }));
              }}
            />
          )}
        ></Route>
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        ></Route>
      </div>
    );
  }
}

export default App;
