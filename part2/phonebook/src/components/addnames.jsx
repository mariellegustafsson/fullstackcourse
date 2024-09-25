
import nameService from '../services/name'
const addNames = ({newName}, {persons}, {newNumber}, {setPersons}) => {

if (persons.some((person) => newName === person.name)){ 
  alert(`${newName} already in phonebook`)
}
else{
  const Object = {name: newName, number: newNumber,}
  nameService.create(Object)
  .then(returnedObject => {
    setPersons(persons.concat(returnedObject))
  })
}}



export default addNames