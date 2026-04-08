export const Person = (props) => {
  console.log("props name and number", props);
  return (
    <li>
      {props.name}
      {props.number}
      <button onClick={() => props.deletePerson(props.id, props.name)}>
        delete
      </button>
    </li>
  );
};
