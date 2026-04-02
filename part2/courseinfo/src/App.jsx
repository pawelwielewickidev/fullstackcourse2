const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => {
  console.log(props);
  const totalExercises = props.part.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      {props.part.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    <Total total = {totalExercises}/>  
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

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
