import { useState } from "react";

const Display = (props) => {
  console.log("display persona", props);
  return (
    <ul>
      {props.persons.map((person, index) => (
        <Person key={index} name={person.name} />
      ))}
    </ul>
  );
};

const Person = (props) => {
  console.log("props name", props);
  return <li>{props.name}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    console.log("clicked button", event.target);
    const nameObject = {
      name: newName,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Display persons={persons} />
    </div>
  );
};

export default App;
