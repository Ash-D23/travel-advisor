import React, { useState, useEffect } from 'react';
import Dashboard from './Components/Dashboard/Dashboard'
import SearchCity from './Components/SearchCity/SearchCity'
import Header from './Components/Header/Header'
import './App.css'

function App() {

  const [city, setcity] = useState(null)

  return (
    <div>
      <Header setcity={setcity} />
      {city ? <Dashboard city={city} /> : <SearchCity setcity={setcity}/>}
    </div>
    
  )
}

export default App;
