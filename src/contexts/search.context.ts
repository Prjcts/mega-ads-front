import { createContext } from 'react';

const SearchContext = createContext({
  search: '',
  setSearch: (s: string) => {},
});

export { SearchContext };
