import { useState, useEffect } from 'react'
import namefilter from './components/namefilter'
import addNames from './components/addnames'
import RenderNames from './components/renderNames'
import axios from 'axios'
import nameService from './services/name'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([]) 
 /* { name: 'Arto Hellas', number:'0' }*/
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [Message, setMessage] = useState(null)


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    console.log("new name set: ", newName)
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
    console.log('button clicked 2', event.target)
    console.log('newName: ', newName)
    addNames({newName}, {persons}, {newNumber}, {setPersons}, {setMessage})

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
      <Notification message={Message} />
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
        <RenderNames names={persons} />
      </ul>
    </div>
  )
}
//<RenderNames names={namefilter({persons}, {searchName})} />

export default App