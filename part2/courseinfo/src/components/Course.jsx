const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => {
  console.log(props);
  const totalExercises = props.part.reduce(
    (sum, part) => sum + part.exercises,
    0,
  );
  return (
    <div>
      {props.part.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Total total={totalExercises} />
    </div>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = (props) => <h4>Total of exercises {props.total}</h4>;

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content part={props.course.parts} />
    </div>
  );
};

export default Course;
