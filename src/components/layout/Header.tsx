import { SyntheticEvent, useContext, useState } from 'react';
import { Btn } from '../common/Btn';
import styles from './Header.module.scss';
import { SearchContext } from 'src/contexts/search.context';

const Header = () => {
  const { search, setSearch } = useContext(SearchContext);
  const [inputVal, setInputVal] = useState(search);

  const setSearchFromLocalState = (e: SyntheticEvent) => {
    e.preventDefault();
    setSearch(inputVal);
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>
        <strong>Mega </strong> Ads
      </h1>
      <Btn to="/add" text="Add Ad" modifier="link"/>
      <form className="header__search" onSubmit={setSearchFromLocalState}>
        <input
          type="text"
          className="header__input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <Btn text="Find" modifier="search"></Btn>
      </form>
    </header>
  );
};

export { Header };
