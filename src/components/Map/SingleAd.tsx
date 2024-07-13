import { AdEntity } from '@backend-types/index';
import { useEffect, useState } from 'react';

interface Props {
  id: string;
}

const SingleAd = ({ id }: Props) => {
  const [ad, setAd] = useState<AdEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3001/ad/${id}`);
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        const data = await res.json();
        setAd(data);
        console.log(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (ad === null) {
    return <p>No ad found</p>;
  }
  return (
    <>
      <h2>{id}</h2>
      <h2>name: {ad?.name}</h2>
      <h2>
        price:{' '}
        {!!ad.price && (
          <p>
            <b>{ad.price}$</b>
          </p>
        )}{' '}
      </h2>
      <h2>
        url:{' '}
        <a href={ad?.url} target="_blank" rel="noreferrer">
          Open the advert{' '}
        </a>
      </h2>
    </>
  );
};

export { SingleAd };
