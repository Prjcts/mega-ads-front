import './App.scss';

const App = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__logo">
          <strong>Mega </strong> Ads
        </h1>
        <button className="header__button">Add Ad</button>
        <div className="header__search">
          <input type="text" className="header__input" />
          <button className="header__button header__button--search">Find</button>
        </div>
      </header>

      <div className="map"></div>
    </>
  );
};

export { App };
