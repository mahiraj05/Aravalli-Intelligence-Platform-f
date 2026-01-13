import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet Default Icon Issue in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ areas }) => {
    // Defensive check
    const safeAreas = Array.isArray(areas) ? areas : [];

    // Center on Aravalli / Jaipur
    const position = [26.9124, 75.7873];

    const getStyle = (feature) => {
        const risk = feature.properties.riskLevel;
        let color = '#10b981'; // Green (Low)

        if (risk === 'high') color = '#ef4444'; // Red
        if (risk === 'medium') color = '#f59e0b'; // Orange

        return {
            fillColor: color,
            weight: 2,
            opacity: 1,
            color: 'white', // Border
            dashArray: '3',
            fillOpacity: 0.6
        };
    };

    const onEachFeature = (feature, layer) => {
        const { type, riskLevel, areaHa, confidence } = feature.properties;
        layer.bindPopup(`
      <div class="p-2">
        <h3 class="font-bold text-lg capitalize mb-1">${type} Detected</h3>
        <p><span class="font-semibold">Risk:</span> <span class="capitalize ${riskLevel === 'high' ? 'text-red-600' : 'text-orange-500'}">${riskLevel}</span></p>
        <p><span class="font-semibold">Area:</span> ${areaHa} ha</p>
        <p><span class="font-semibold">Confidence:</span> ${(confidence * 100).toFixed(1)}%</p>
      </div>
    `);
    };

    return (
        <div className="h-[500px] w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative z-0">
            <MapContainer
                center={position}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {safeAreas.map((analysis) => {
                    // If the analysis has a geojsonUrl, we would typically fetch it first.
                    // BUT for MVP, if we stored the 'summary' or small polygons directly in firestore, we could use that.
                    // However, the backend uploads full GeoJSON to storage.
                    // FOR MVP SIMPLICITY: We will assume the backend *also* might return 'polygons' in the response 
                    // OR we fetch the GeoJSON from the URL.

                    // To make this robust without extra fetching logic for now, 
                    // let's assume the frontend loads the mock data directly if needed, 
                    // or we simulate that the API response includes a 'preview' geometry.

                    // Wait, the 'mock-polygons.json' was uploaded. 
                    // Let's modify the frontend to actually FETCH that URL if valid, or fallback to local mock 
                    // if we can't fetch CORS enabled storage easily from localhost.

                    // ACTUALLY, checking the backend service `analysis.service.js`, 
                    // we only return `geojsonUrl` and summary in the list.
                    // We DO NOT return the geometry in `/api/areas`.

                    // FIX: I should have thought of this. 
                    // OPTION 1: Update backend to return geometry.
                    // OPTION 2: Fetch the geometry from the URL.

                    // Let's try OPTION 2 (Fetch). But for mapped array, that's many requests.
                    // OPTION 3 (Better for MVP): The mock data is static. I'll use the local mock data 
                    // in the frontend 'src/data' just to render the map for the demo 
                    // if the API doesn't return geometry. 
                    // BUT the user required "consuming real backend data".

                    // Let's implement a wrapper component that renders `GeoJSON` after fetching the data if needed.
                    // For now, let's look at what `areas` contains.
                    // If `areas` is null, render nothing.

                    return null;
                })}

                {/*
           Since fetching every geojsonUrl might be loop-heavy, 
           and for this specific MVP the backend saves the SAME mock-polygon.json every time,
           we will fetch it ONCE and display it, colored differently based on the metadata of individual analysis?
           
           Actually, the mock-polygons.json contains features. 
           Let's fetch the first valid geojsonUrl we see, or just render a standard set of polygons 
           representing the "current state".
        */}

                <AsyncGeoJSONLoader analyses={safeAreas} getStyle={getStyle} onEachFeature={onEachFeature} />

            </MapContainer>
        </div>
    );
};

// Component to handle async fetching of GeoJSON from the URL provided by backend
const AsyncGeoJSONLoader = ({ analyses, getStyle, onEachFeature }) => {
    const [geoData, setGeoData] = React.useState(null);

    React.useEffect(() => {
        // For MVP, we take the LATEST analysis and show its polygons. 
        // In a real app, we might merge them or show a heatmap.
        if (analyses && analyses.length > 0) {
            const latest = analyses[0];
            if (latest.geojsonUrl) {
                fetch(latest.geojsonUrl)
                    .then(res => res.json())
                    .then(data => setGeoData(data))
                    .catch(err => console.error("Failed to load map data", err));
            }
        }
    }, [analyses]);

    if (!geoData) return null;

    return <GeoJSON data={geoData} style={getStyle} onEachFeature={onEachFeature} />;
};

export default MapView;
