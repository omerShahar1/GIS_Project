import React, { useEffect, useRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import Papa from 'papaparse'; // Import PapaParse library for parsing CSV

const MapComponent = () => {
  const [capitalCities, setCapitalCities] = useState([]);

  useEffect(() => {
    // Parse the CSV file and process the data
    Papa.parse('C:\Users\omer\login-app\src\my-react-app\src\capitalsCSV.csv', 
    {
      header: true,
      download: true,
      complete: (results) => {
        // Extract relevant data from the parsed CSV
        const formattedData = results.data.map(city => ({
          name: city.CapitalName,
          population: parseInt(city.Population),
          coordinates: [parseFloat(city.Longitude), parseFloat(city.Latitude)]
        }));
        // Set the formatted data to the state
        setCapitalCities(formattedData);
      }
    });
  }, []);

  // Render the map and capital cities
  return (
    <div style={{ height: 600 }}>
      <MapView
        mapProperties={{ basemap: 'streets-navigation-vector' }}
        viewProperties={{ center: [0, 20], zoom: 2 }}
        onLoad={(view) => {
          capitalCities.forEach(city => {
            const point = new Point({
              longitude: city.coordinates[0],
              latitude: city.coordinates[1]
            });

            const symbol = {
              type: 'simple-marker',
              color: 'red',
              outline: {
                color: 'white',
                width: 1
              }
            };

            const attributes = {
              Name: city.name,
              Population: city.population
            };

            const popupTemplate = new PopupTemplate({
              title: "{Name}",
              content: "Population: {Population}"
            });

            const graphic = new Graphic({
              geometry: point,
              symbol: symbol,
              attributes: attributes,
              popupTemplate: popupTemplate
            });

            view.graphics.add(graphic);
          });
        }}
      />
    </div>
  );
};

export default MapComponent;