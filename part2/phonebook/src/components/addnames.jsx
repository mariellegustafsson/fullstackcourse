const addNames = ({newName}, {persons}, {newNumber}, {setPersons}) => {

if (persons.some((person) => newName === person.name)){ 
  alert(`${newName} already in phonebook`)
}
else{
  const Object = {name: newName, number: newNumber,}
    setPersons(persons.concat(Object))
}

}

export default addNames