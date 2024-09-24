const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
if (persons.some((person) => newName === person.name)){ 
  alert(`${newName} already in phonebook`)
}
else{
  const Object = {name: newName, number: newNumber,}
    setPersons(persons.concat(Object))
}}

export default addName