import { useState, useEffect } from 'react'
import namefilter from './components/namefilter'
import addNames from './components/addnames'
import RenderNames from './components/renderNames'
import axios from 'axios'
import nameService from './services/name'


const App = () => {

  const [persons, setPersons] = useState([]) 
 /* { name: 'Arto Hellas', number:'0' }*/
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    addNames({newName}, {persons}, {newNumber}, {setPersons})
  }


  useEffect(() => {
      nameService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <div> 
        filter shown with <input value={searchName} onChange={handleSearchChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <RenderNames names={namefilter({persons}, {searchName})} />
      </ul>
    </div>
  )
}

export default App