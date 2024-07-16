import classNames from 'classnames';
import styles from './Btn.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  modifier?: string;
  text: string;
  to?: string;
};

const Btn = ({ text, modifier, to}: Props) => {
  const buttonClass = classNames(styles.header__button, {
    [styles[`header__button--${modifier}`]]: modifier,
    [styles[`header__button--link`]]: to,
  });
  return to ? (
    <Link to={to} className={buttonClass}>
      {text}
    </Link>
  ) : (
    <button className={buttonClass}>{text}</button>
  );
};

export { Btn };
