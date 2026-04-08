import { Person } from "./Person";

export const Display = (props) => {
  console.log("display persona", props);
  return (
    <ul>
      {props.persons.map((person, index) => (
        <Person
          key={index}
          id={person.id}
          name={person.name}
          number={person.number}
          deletePerson={props.deletePerson}
        />
      ))}
    </ul>
  );
};
