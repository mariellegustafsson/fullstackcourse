import Course from './components/Course'


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return <Course course={courses} />
}

export default App




/* fungerande gammal version 
const Course = ({course}) =>{
  console.log(course.parts)

  let total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

   return(
  <div>
  <h1>{course.name}</h1>
  <ul>
    {course.parts.map(parts => 
      <li key={parts.id}>
        {parts.name} {parts.exercises}
      </li>
    )}
      </ul>
  <p> total of {total} exercises</p>
  
</div>
)}

*/