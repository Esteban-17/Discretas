// Importa Leaflet si usas npm
import L from 'leaflet';

// Inicializa el mapa
const map = L.map('map').setView([4.6097, -74.0817], 13); // Coordenadas iniciales (Bogotá)

// Agrega el fondo del mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Agrega un marcador en una ubicación específica
const marker = L.marker([4.6097, -74.0817]).addTo(map);
marker.bindPopup('Centro de Salud').openPopup();

const centrosSalud = [
    { nombre: 'Hospital A', coords: [4.6097, -74.0817] },
    { nombre: 'Hospital B', coords: [4.6170, -74.0720] }
  ];
  
  centrosSalud.forEach(centro => {
    L.marker(centro.coords).addTo(map).bindPopup(centro.nombre);
  });
  
  const calcularRuta = async (ubicacionAccidente) => {
    const response = await fetch('https://tu-backend-url/api/shortest-route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accidente: ubicacionAccidente })
    });
    const data = await response.json();
    return data.ruta; // Suponiendo que el backend devuelva una lista de coordenadas.
  };
  
  // Ejemplo de uso
  const ubicacionAccidente = [4.6057, -74.0820]; // Coordenadas del accidente
  calcularRuta(ubicacionAccidente).then(ruta => {
    L.polyline(ruta, { color: 'red' }).addTo(map); // Dibuja la ruta en el mapa
  });

  const iconoPersonalizado = L.icon({
    iconUrl: 'url-del-icono.png',
    iconSize: [38, 38],
    iconAnchor: [22, 38]
  });
  
  L.marker([4.6097, -74.0817], { icon: iconoPersonalizado }).addTo(map);
  