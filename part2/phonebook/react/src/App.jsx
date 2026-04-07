import { useState } from "react";

const Display = (props) => {
  console.log("display persona", props);
  return (
    <ul>
      {props.persons.map((person, index) => (
        <Person key={index} name={person.name} number={person.number} />
      ))}
    </ul>
  );
};

const Person = (props) => {
  console.log("props name and number", props);
  return (
    <li>
      {props.name}
      {props.number}
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const addEntry = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    console.log("clicked button", event.target);
    const newObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newObject));
    setNewName("");
    setNewNumber("");
  };

  const searchResult = persons.filter((person) => {
    const nameLower = person.name.toLowerCase();
    const searchLower = searchName.toLocaleLowerCase();
    return nameLower.includes(searchLower);
  });

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
      <Display persons={searchResult} />
    </div>
  );
};

export default App;
