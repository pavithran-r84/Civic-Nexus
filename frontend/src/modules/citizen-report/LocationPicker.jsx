import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, MapPin } from 'lucide-react';

// Fix default Leaflet icon paths in Vite bundler
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapClickHandler({ setCoords, setLocationText, onSelectCoords }) {
  useMapEvents({
    click(e) {
      const lat = parseFloat(e.latlng.lat.toFixed(5));
      const lng = parseFloat(e.latlng.lng.toFixed(5));
      setCoords({ lat, lng });
      const newLocText = `Green Park Ward 4 (${lat}, ${lng})`;
      setLocationText(newLocText);
      if (onSelectCoords) {
        onSelectCoords({ lat, lng });
      }
    }
  });
  return null;
}

export function LocationPicker({ locationText, setLocationText, onSelectCoords }) {
  const [coords, setCoords] = useState({ lat: 28.5562, lng: 77.2065 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Interactive Map & Location Pin — Green Park
        </label>
        <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
          📍 Lat: {coords.lat}, Lng: {coords.lng}
        </span>
      </div>

      {/* Leaflet OpenStreetMap Container */}
      <div style={{
        height: '240px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border-medium)',
        position: 'relative',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coords.lat, coords.lng]} icon={customIcon} />
          <MapClickHandler
            setCoords={setCoords}
            setLocationText={setLocationText}
            onSelectCoords={onSelectCoords}
          />
        </MapContainer>

        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(4px)',
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <Navigation size={12} color="var(--brand-primary)" />
          Click anywhere on map to drop pin
        </div>
      </div>

      <input
        type="text"
        value={locationText}
        onChange={(e) => setLocationText(e.target.value)}
        placeholder="Specific spot, e.g., Near Green Park Government School Gate 2"
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-medium)',
          fontSize: '0.9rem',
          outline: 'none'
        }}
      />
    </div>
  );
}
