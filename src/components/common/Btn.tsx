import classNames from 'classnames';
import styles from './Btn.module.scss';

type Props = {
  modifier?: string;
  text: string;
};

const Btn = ({ text, modifier }: Props) => {
  const buttonClass = classNames(styles.header__button, {
    [styles[`header__button--${modifier}`]]: modifier,
  });
  return <button className={buttonClass}>{text}</button>;
};

export { Btn };
