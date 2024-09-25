import nameService from '../services/name'

const deleteName = (id, name) => {
    console.log('button clicked, id ' + id)
    nameService.deleteObject(id, name)
}


const RenderNames = ({names}) => {
    return (
        <div>

    {names.map((person) => <p key={person.id}> {person.name} {person.number} <button onClick={() => deleteName(person.id, person.name)}>delete</button></p>)}
   </div>
   
)}


export default RenderNames