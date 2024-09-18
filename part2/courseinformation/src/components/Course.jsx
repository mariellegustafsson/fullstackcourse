const Header = ({name}) =>{
  return(
    <div>
      <h2>{name}</h2>
    </div>
  )
}

const Content = ({parts}) =>{
  return(
  <div>
  {parts.map(part => <p key={part.name}> {part.name} {part.exercises}</p>)}
  </div>
)
}

const Total = ({parts}) =>{
  let total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return(
    <p><b>total of {total} exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
  <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
  </div>
  )
}

export default Course

