// Save this as src/App.js in a create-react-app project

import React, { useState } from "react";

const initialContacts = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", email: "" });

  // Handle form changes for adding new contact
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new contact
  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    const newContact = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
    };

    setContacts([...contacts, newContact]);
    setFormData({ name: "", email: "" });
  };

  // Start editing contact
  const handleEditClick = (contact) => {
    setEditId(contact.id);
    setEditFormData({ name: contact.name, email: contact.email });
  };

  // Handle changes for edit form
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Save edited contact
  const handleEditSave = (id) => {
    if (!editFormData.name.trim() || !editFormData.email.trim()) return;

    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, ...editFormData } : contact
    );
    setContacts(updatedContacts);
    setEditId(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditId(null);
  };

  // Delete contact
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter((contact) => contact.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>React CRUD Contacts App</h1>

      {/* Add Contact Form */}
      <form onSubmit={handleAdd} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.addButton}>
          Add Contact
        </button>
      </form>

      {/* Contacts List */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="3" style={styles.noData}>
                No contacts available. Please add some.
              </td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact.id} style={styles.tableRow}>
                {editId === contact.id ? (
                  <>
                    <td style={styles.td}>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        style={styles.input}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditChange}
                        style={styles.input}
                      />
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleEditSave(contact.id)}
                        style={styles.saveButton}
                      >
                        Save
                      </button>
                      <button onClick={handleCancelEdit} style={styles.cancelButton}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}>{contact.name}</td>
                    <td style={styles.td}>{contact.email}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleEditClick(contact)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  form: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeaderRow: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  th: {
    padding: 12,
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #ddd",
  },
  tableRow: {
    backgroundColor: "white",
  },
  noData: {
    padding: 20,
    textAlign: "center",
    color: "#888",
  },
  editButton: {
    marginRight: 10,
    padding: "6px 10px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  deleteButton: {
    padding: "6px 10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  saveButton: {
    marginRight: 10,
    padding: "6px 10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  cancelButton: {
    padding: "6px 10px",
    backgroundColor: "#9e9e9e",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};

export default App;
