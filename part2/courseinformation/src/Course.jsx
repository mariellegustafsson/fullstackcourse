
const Course = ({course}) =>{
  return(
    <div>
  {course.map(kurs => {
     let total = kurs.parts.reduce((sum, part) => sum + part.exercises, 0); 

  return(
      <div key={kurs.id}> 
      <h1> {kurs.name} </h1>
<ul>
          {kurs.parts.map(part => (
            <li key={part.id}>
              {part.name} {part.exercises}
              </li>
        ))}
        </ul>
        <p> total of {total} exercises</p>
        </div>
      )}
    )}    
        </div>
  )}

export default Course