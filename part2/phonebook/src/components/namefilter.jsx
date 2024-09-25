const namefilter = ({persons}, {searchName}) => {
  return persons.filter(person => 
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );
}

export default namefilter