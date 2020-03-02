import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };

  state = {
    query: ""
  };

  updateQuery = query => {
    this.setState(() => ({
      query: query.trim()
    }));
  };
  clearQuery = () => {
    this.updateQuery("");
  };

  render() {
    // const people = this.props.contacts;
    console.log("Prop:", this.props);
    const { query } = this.state;
    const { contacts, onDeleteContact } = this.props;
    const showingContacts =
      query === ""
        ? contacts
        : contacts.filter(c =>
            c.name.toLowerCase().includes(query.toLocaleLowerCase())
          );
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="search"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
          <Link to="/create" className="add-contact">
            Add Contact
          </Link>
        </div>
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {showingContacts.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}>show all</button>
          </div>
        )}

        <ol className="contact-list">
          {showingContacts.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              ></div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => onDeleteContact(contact)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

// import React from "react";
// import PropTypes from "prop-types";

// function ListContacts(props) {
//   const people = props.contacts;
//   return (
//     <ol className="contact-list">
//       {people.map(contact => (
//         <li key={contact.id} className="contact-list-item">
//           <div
//             className="contact-avatar"
//             style={{
//               backgroundImage: `url(${contact.avatarURL})`
//             }}
//           ></div>
//           <div className="contact-details">
//             <p>{contact.name}</p>
//             <p>{contact.handle}</p>
//           </div>
//           <button
//             className="contact-remove"
//             onClick={() => props.onDeleteContact(contact)}
//           >
//             Remove
//           </button>
//         </li>
//       ))}
//     </ol>
//   );
// }

// ListContacts.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   onDeleteContact: PropTypes.func.isRequired
// };

export default ListContacts;
