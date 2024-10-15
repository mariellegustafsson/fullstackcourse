import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll=() =>{
    const request =  axios.get(baseUrl)
     return request.then(response =>response.data )
}

const deleteObject = (id, name) => {
    console.log(id)
    console.log(`${baseUrl}/${id}`)

/* confirm here */
if (confirm(`Delete ${name}?`) == true) {
    axios.delete(`${baseUrl}/${id}`)
    .then(console.log(`deleted post with ID ${id}`))
    window.location.reload(false);
  }
else{
    return
}}

const create = (Object) => {
    const request = axios.post(baseUrl, Object)
    return request.then(response => response.data)
  }
 export default {getAll, create, deleteObject}



