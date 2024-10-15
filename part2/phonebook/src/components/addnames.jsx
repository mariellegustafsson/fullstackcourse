import nameService from '../services/name'

const addNames = ({newName}, {persons}, {newNumber}, {setPersons}, {setMessage}) => {
console.log("entered addNames")
if (persons.some((person) => newName === person.name)){ 
  alert(`${newName} already in phonebook`)
}
else{
  const Object = {name: newName, number: newNumber,}
  nameService.create(Object)
  .then(returnedObject => {
    setPersons(persons.concat(returnedObject))
  })
  setMessage(`added ${newName}`)
  setTimeout(() => {
    setMessage(null)
  }, 5000)
  
}}



export default addNames