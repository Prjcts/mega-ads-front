import { useState } from 'react';
import { Header } from './components/layout/Header';
import {Map} from './components/Map/Map'
import './App.scss';
import {SearchContext} from './contexts/search.context'

const App = () => {
const [search, setSearch] = useState('')

  return (
  <SearchContext.Provider value={{search, setSearch}}>
    <Header />
    <Map />
  </SearchContext.Provider>  
  );
};

export { App };
