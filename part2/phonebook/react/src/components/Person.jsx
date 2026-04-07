export const Person = (props) => {
  console.log("props name and number", props);
  return (
    <li>
      {props.name}
      {props.number}
    </li>
  );
};
