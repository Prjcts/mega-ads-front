import classNames from 'classnames';
import styles from './AddForm.module.scss';
import { Btn } from '../common/Btn';
import { SyntheticEvent, useState } from 'react';
import { geoCoding } from '../utils/geocoding';

const AddForm = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    url: '',
    address: '',
  });

  const saveAd = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { lat, lon } = await geoCoding(form.address);

      const res = await fetch(`http://localhost:3001/ad`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          lat,
          lon,
        }),
      });
      const data = await res.json()
      setId(data.id)
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: string, value: string | number) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  if (loading) {
    return <h1>the advert is being search</h1>;
  }

if(id){
  return <h1>Your advert has been added</h1>
}

  return (
    <form action="" className={styles.addForm} onSubmit={saveAd}>
      <h1>Adding an advert</h1>
      <p className={styles.addForm__singlePart}>
        <label className={styles.addForm__label}>
          Name:
          <input
            className={styles.addForm__input}
            type="text"
            name="name"
            required
            maxLength={99}
            value={form.name}
            onChange={(e) => updateForm('name', e.target.value)}
          />
        </label>
      </p>

      <p className={styles.addForm__singlePart}>
        <label className={styles.addForm__label}>
          Description:
          <textarea
            name="description"
            className={classNames(
              styles.addForm__input,
              styles.addForm__textarea
            )}
            maxLength={999}
            value={form.description}
            onChange={(e) => updateForm('description', e.target.value)}
          />
        </label>
      </p>

      <p className={styles.addForm__singlePart}>
        <label className={styles.addForm__label}>
          Price:
          <input
            className={styles.addForm__input}
            type="number"
            name="price"
            maxLength={9999999}
            value={form.price}
            onChange={(e) =>
              updateForm('price', parseFloat(e.target.value) || 0)
            }
          />
          <small>0 does not show the price</small>
        </label>
      </p>

      <p className={styles.addForm__singlePart}>
        <label className={styles.addForm__label}>
          url:
          <input
            className={styles.addForm__input}
            type="url"
            name="url"
            maxLength={100}
            value={form.url}
            onChange={(e) => updateForm('url', e.target.value)}
          />
        </label>
      </p>

      <p className={styles.addForm__singlePart}>
        <label className={styles.addForm__label}>
          address:
          <input
            className={styles.addForm__input}
            type="text"
            name="address"
            required
            maxLength={100}
            value={form.address}
            onChange={(e) => updateForm('address', e.target.value)}
          />
        </label>
      </p>

      <Btn text="Save" />
    </form>
  );
};

export { AddForm };
