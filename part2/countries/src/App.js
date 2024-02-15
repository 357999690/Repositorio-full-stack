import React, {useState, useEffect} from "react";
import axios from "axios";

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState("")

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        
        setCountries(response.data)
      })
  }, [])

const handleCountrieChange = (event) => {
  setSearchCountries(event.target.value)
}

const handleShowCountry = (e) => {
  setSearchCountries(e)
}

const filterCountries = countries.filter(countrie => countrie.name.common.toUpperCase().startsWith(searchCountries.toUpperCase()))

const minusTen = filterCountries.map( e => <div key={e.ccn3}>
  <li>{e.name.common}</li><button onClick={() => {handleShowCountry(e.name.common)}}>show</button>
  </div>)

const languages = () => filterCountries.length === 1 ?
  Object.values(filterCountries[0].languages) :
  null

const oneCountrie = () => {
  return(
  filterCountries.length === 1 ?
    <div>
      <h2>{filterCountries[0].name.common}</h2>
      <p>
        Capital {filterCountries[0].capital[0]}
      </p>
      <p>
        area {filterCountries[0].area}
      </p>
      <h2>lenguages:</h2>
      {languages().map(p => <li key={p}>{p}</li>)}
      <img src={filterCountries[0].flags.png}/>
    </div> :
    null)
    
}

  return(
    <div>
      <div>
        find countries <input
          value={searchCountries}
          onChange={handleCountrieChange}/>
      </div>
      <div>
        {filterCountries.length > 10 && filterCountries.length > 0 ?
          <p>Too many matches, specify filter</p> :
          null}
        {filterCountries.length <= 10 && filterCountries.length != 1 ?
          minusTen :
          null}
          {oneCountrie()}
      </div>
    </div>
  )
}

export default App;
