import React, { useRef, useState, useEffect } from "react";
import styles from "./map.module.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX;
export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.59796);
  const [lat, setLat] = useState(12.96991);
  const [zoom, setZoom] = useState(12.5);
  const [areas, setAreas] = useState();
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    fetchAreas();
  });
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    if (areas) {
    map.current.on("load", () => {
      map.current.addSource("maine", {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': areas[1].coordinates,
          },
        },
      });
      map.current.addLayer({
        'id': "maine",
        'type': "fill",
        'source': "maine", // reference the data source
        'layout': {},
        'paint': {
          "fill-color": "#000", // black color fill
          "fill-opacity": 0.5,
        },
      });
      map.current.addLayer({
        'id': "outline",
        'type': "line",
        'source': "maine",
        'layout': {},
        'paint': {
          "line-color": "#000",
          "line-width": 3,
        },
      });
    });
    }
    

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const fetchAreas = async () => {
    const data = await fetch("https://kyupid-api.vercel.app/api/areas");
    const areasJSON = await data.json();
    // console.log(areasJSON.features[0].coordinates);
    setAreas(areasJSON.features);
  };
  return <div ref={mapContainer} className={styles.rightview}></div>;
}
