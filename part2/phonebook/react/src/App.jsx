import { useEffect, useState } from "react";
import { Display } from "./components/Display";
import personsService from "./service/PersonsService";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addEntry = (event) => {
    event.preventDefault();
    const nameExists = persons.find((person) => person.name === newName);
    if (nameExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const changedName = { ...nameExists, number: newNumber };
        console.log(nameExists.id);
        personsService
          .update(nameExists.id, changedName)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== nameExists.id ? person : returnedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
          });
        return;
      }
    }
    console.log("clicked button", event.target);
    const newObject = {
      name: newName,
      number: newNumber,
    };

    personsService.create(newObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");

      setNotification(`Added ${returnedPerson.name}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  };

  const searchResult = persons.filter((person) => {
    const nameLower = person.name.toLowerCase();
    const searchLower = searchName.toLocaleLowerCase();
    return nameLower.includes(searchLower);
  });

  const deleteEntry = (id, name) => {
    console.log(id);
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`Failed to delete ${name}`);
        });
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <div>
        filter shown with:{" "}
        <input value={searchName} onChange={handleSearchChange} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Display persons={searchResult} deletePerson={deleteEntry} />
    </div>
  );
};

export default App;
