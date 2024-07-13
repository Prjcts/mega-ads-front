import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from 'src/contexts/search.context';
import { SimpleAdEntity } from '@backend-types/index';
import { SingleAd } from './SingleAd';

const Map = () => {
  const { search } = useContext(SearchContext);
  const [ads, setAds] = useState<SimpleAdEntity[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/ad/search/${search}`);

      const data = await res.json();
      setAds(data);
    })();
  }, [search]);

  return (
    <div className={styles.map}>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {ads.map((ad) => (
          <Marker key={ad.id} position={[ad.lat, ad.lon]}>
            <Popup>
              <SingleAd id={ad.id} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export { Map };
