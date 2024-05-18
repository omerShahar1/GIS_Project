// src/MapView.js
import React, { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PopupTemplate from '@arcgis/core/PopupTemplate';


// data of capitl cities and pops 
const capitalCities = [
    { name: 'Kabul', population: 4273156, coordinates: [69.2075, 34.5553] },
    { name: 'Tirana', population: 418495, coordinates: [19.8189, 41.3275] },
    { name: 'Algiers', population: 3415811, coordinates: [3.0588, 36.7538] },
    { name: 'Andorra la Vella', population: 22226, coordinates: [1.5333, 42.5078] },
    { name: 'Luanda', population: 8417000, coordinates: [13.2383, -8.8383] },
    { name: 'Buenos Aires', population: 2891082, coordinates: [-58.3816, -34.6037] },
    { name: 'Yerevan', population: 1075800, coordinates: [44.5152, 40.1872] },
    { name: 'Canberra', population: 462000, coordinates: [149.1300, -35.2809] },
    { name: 'Vienna', population: 1911191, coordinates: [16.3738, 48.2082] },
    { name: 'Baku', population: 2278000, coordinates: [49.8671, 40.4093] },
    { name: 'Nassau', population: 274400, coordinates: [-77.3554, 25.0343] },
    { name: 'Manama', population: 200000, coordinates: [50.5860, 26.2235] },
    { name: 'Dhaka', population: 8906039, coordinates: [90.4125, 23.8103] },
    { name: 'Bridgetown', population: 110000, coordinates: [-59.6167, 13.0975] },
    { name: 'Minsk', population: 2009786, coordinates: [27.5615, 53.9045] },
    { name: 'Brussels', population: 1211035, coordinates: [4.3517, 50.8503] },
    { name: 'Belmopan', population: 16826, coordinates: [-88.7770, 17.2514] },
    { name: 'Porto-Novo', population: 264320, coordinates: [2.6264, 6.4969] },
    { name: 'Thimphu', population: 114551, coordinates: [89.6390, 27.4728] },
    { name: 'La Paz', population: 816044, coordinates: [-68.1193, -16.5000] },
    { name: 'Sarajevo', population: 275524, coordinates: [18.4131, 43.8563] },
    { name: 'Gaborone', population: 231626, coordinates: [25.9200, -24.6583] },
    { name: 'Brasília', population: 3015268, coordinates: [-47.9292, -15.7801] },
    { name: 'Bandar Seri Begawan', population: 100700, coordinates: [114.9463, 4.9031] },
    { name: 'Sofia', population: 1241675, coordinates: [23.3219, 42.6977] },
    { name: 'Ouagadougou', population: 2453496, coordinates: [-1.5197, 12.3714] },
    { name: 'Gitega', population: 135467, coordinates: [29.9246, -3.4264] },
    { name: 'Phnom Penh', population: 2273000, coordinates: [104.9282, 11.5564] },
    { name: 'Yaoundé', population: 2440462, coordinates: [11.5021, 3.8480] },
    { name: 'Ottawa', population: 934243, coordinates: [-75.6972, 45.4215] },
    { name: 'Praia', population: 159050, coordinates: [-23.5133, 14.9331] },
    { name: 'Bangui', population: 889231, coordinates: [18.5582, 4.3947] },
    { name: 'NDjamena', population: 1297000, coordinates: [15.0481, 12.1348] },
    { name: 'Santiago', population: 5614000, coordinates: [-70.6483, -33.4489] },
    { name: 'Beijing', population: 21542000, coordinates: [116.4074, 39.9042] },
    { name: 'Bogotá', population: 7878783, coordinates: [-74.0721, 4.7110] },
    { name: 'Moroni', population: 111329, coordinates: [43.2551, -11.7172] },
    { name: 'Kinshasa', population: 15208000, coordinates: [15.2663, -4.4419] },
    { name: 'Brazzaville', population: 1867000, coordinates: [15.2832, -4.2634] },
    { name: 'San José', population: 342188, coordinates: [-84.0907, 9.9281] },
    { name: 'Zagreb', population: 806341, coordinates: [15.9819, 45.8150] },
    { name: 'Havana', population: 2135490, coordinates: [-82.3666, 23.1136] },
    { name: 'Nicosia', population: 200452, coordinates: [33.3650, 35.1856] },
    { name: 'Prague', population: 1308632, coordinates: [14.4378, 50.0755] },
    { name: 'Copenhagen', population: 794128, coordinates: [12.5683, 55.6761] },
    { name: 'Djibouti', population: 604000, coordinates: [43.1510, 11.5721] },
    { name: 'Roseau', population: 14997, coordinates: [-61.3870, 15.3092] },
    { name: 'Santo Domingo', population: 2900000, coordinates: [-69.9312, 18.4861] },
    { name: 'Quito', population: 2011388, coordinates: [-78.4678, -0.1807] },
    { name: 'Cairo', population: 9500000, coordinates: [31.2357, 30.0444] },
    { name: 'San Salvador', population: 541453, coordinates: [-89.2182, 13.6929] },
    { name: 'Malabo', population: 297000, coordinates: [8.7833, 3.7500] },
    { name: 'Asmara', population: 963000, coordinates: [38.9236, 15.3229] },
    { name: 'Tallinn', population: 437619, coordinates: [24.7535, 59.4370] },
    { name: 'Mbabane', population: 94020, coordinates: [31.1440, -26.3054] },
    { name: 'Addis Ababa', population: 3041002, coordinates: [38.7636, 9.0114] },
    { name: 'Suva', population: 88271, coordinates: [178.4501, -18.1248] },
    { name: 'Helsinki', population: 656920, coordinates: [24.9410, 60.1695] },
    { name: 'Paris', population: 2148327, coordinates: [2.3522, 48.8566] },
];

const popupTemplate = new PopupTemplate({
    title: "{Name}",
    content: [{
      type: "text",
      text: "<b>Population:</b> {Population}"
    }],
    className: "custom-popup-template"
  });

const MapComponent = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const webMap = new WebMap({
            basemap: 'streets-navigation-vector'
        });

        const view = new MapView({
            container: mapRef.current,
            map: webMap,
            center: [34.8516, 31.0461],  // Centering on Israel
            zoom: 7
        });

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

            const graphic = new Graphic({
                geometry: point,
                symbol: symbol,
                attributes: attributes,
                popupTemplate: popupTemplate
            });

            view.graphics.add(graphic);
        });

        return () => {
            if (view) {
                view.destroy();
            }
        };
    }, []);

    return <div style={{ height: 680 }} ref={mapRef}></div>;
};

export default MapComponent;
