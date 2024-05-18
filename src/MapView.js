import React, { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PopupTemplate from '@arcgis/core/PopupTemplate';


// data of capitl cities and pops
// the data is currently saved in a list of 'capitalCities' objects.
const capitalCities = [
    { name: 'Kabul', population: 4136000, coordinates: [69.13675829, 34.53091193] },
    { name: 'Tirana', population: 418495, coordinates: [19.83200436, 41.33199592] },
    { name: 'Algiers', population: 3608000, coordinates: [3.050001347, 36.78329694] },
    { name: 'Pago Pago', population: 3656, coordinates: [-170.6978607, -14.26837498] },
    { name: 'Andorra La Valla', population: 22205, coordinates: [1.516662363, 42.49999796] },
    { name: 'Luanda', population: 7555000, coordinates: [13.23500442, -8.811998951] },
    { name: 'The Valley', population: 2812, coordinates: [-63.06666263, 18.21666602] },
    { name: 'Saint Johns', population: 0, coordinates: [-61.84217656, 17.12477703] },
    { name: 'Buenos Aires', population: 15416728, coordinates: [-58.4498337, -34.62249601] },
    { name: 'Yerevan', population: 1079732, coordinates: [44.53267533, 40.20803107] },
    { name: 'Oranjestad', population: 28295, coordinates: [-70.02600262, 12.52500301] },
    { name: 'Canberra', population: 420960, coordinates: [149.0420074, -35.35000206] },
    { name: 'Baku', population: 2270030, coordinates: [49.8159993, 40.32399607] },
    { name: 'Manama', population: 0, coordinates: [50.58333942, 26.21666704] },
    { name: 'Dhaka', population: 8906035, coordinates: [90.40714232, 23.70991494] },
    { name: 'Bridgetown', population: 0, coordinates: [-59.61584662, 13.09587298] },
    { name: 'Minsk', population: 1982444, coordinates: [27.57555933, 53.89993803] },
    { name: 'Belmopan', population: 13939, coordinates: [-88.8000026, 17.11999803] },
    { name: 'Porto Novo', population: 264320, coordinates: [2.632500307, 6.601104041] },
    { name: 'Hamilton', population: 854, coordinates: [-64.77916465, 32.28903] },
    { name: 'Thimphu', population: 114551, coordinates: [89.66700044, 27.44299792] },
    { name: 'La Paz', population: 2143000, coordinates: [-68.14624461, -16.49900699] },
    { name: 'Sarajevo', population: 0, coordinates: [18.43000231, 43.86999596] },
    { name: 'Gaborone', population: 231592, coordinates: [25.9507984, -24.63992993] },
    { name: 'Brasilia', population: 2481272, coordinates: [-47.89774766, -15.79211094] },
    { name: 'Road Town', population: 0, coordinates: [-64.62170066, 18.40906808] },
    { name: 'Bandar Seri Begawan', population: 0, coordinates: [114.9669994, 4.932998971] },
    { name: 'Ouagadougou', population: 3662000, coordinates: [-1.67000367, 12.48000304] },
    { name: 'Bujumbura', population: 0, coordinates: [29.35600232, -3.372002996] },
    { name: 'Phnom Penh', population: 1958000, coordinates: [104.9131893, 11.56473907] },
    { name: 'Yaounde', population: 3420000, coordinates: [11.51399737, 3.864996064] },
    { name: 'Ottawa', population: 1028514, coordinates: [-75.65100268, 45.37400396] },
    { name: 'Praia', population: 0, coordinates: [-23.52099556, 14.92299908] },
    { name: 'George Town', population: 28089, coordinates: [-81.38332767, 19.29999602] },
    { name: 'Bangui', population: 0, coordinates: [18.56234737, 4.36585503] },
    { name: 'Ndjamena', population: 1522000, coordinates: [15.2408254, 12.10413603] },
    { name: 'Santiago', population: 6748000, coordinates: [-70.64751555, -33.47502305] },
    { name: 'Beijing', population: 20781000, coordinates: [116.3880364, 39.90618905] },
    { name: 'The Settlement', population: 0, coordinates: [105.7167004, -10.41669896] },
    { name: 'West Island', population: 0, coordinates: [96.82607738, -12.15753294] },
    { name: 'Moroni', population: 0, coordinates: [43.24300243, -11.70000008] },
    { name: 'Brazzaville', population: 2074000, coordinates: [15.28514142, -4.285187997] },
    { name: 'Kinshasa', population: 12322000, coordinates: [15.29900134, -4.320998992] },
    { name: 'Avarua', population: 0, coordinates: [-159.7666946, -21.23330401] },
    { name: 'San Jose', population: 347398, coordinates: [-84.0786206, 9.93047408] },
    { name: 'Yamoussoukro', population: 212670, coordinates: [-5.282999628, 6.81800397] },
    { name: 'Zagreb', population: 790017, coordinates: [15.96400239, 45.80700304] },
    { name: 'Havana', population: 2131937, coordinates: [-82.41645556, 23.04895501] },
    { name: 'Nicosia', population: 0, coordinates: [33.36900339, 35.17100107] },
    { name: 'Prague', population: 1294513, coordinates: [14.45699732, 50.10599695] },
    { name: 'Djibouti', population: 0, coordinates: [43.10000138, 11.50000202] },
    { name: 'Roseau', population: 0, coordinates: [-61.38846868, 15.29900095] },
    { name: 'Santo Domingo', population: 965040, coordinates: [-69.89900367, 18.48899701] },
    { name: 'Quito', population: 1619146, coordinates: [-78.52427957, -0.229499918] },
    { name: 'Cairo', population: 9539673, coordinates: [31.25079932, 30.07791] },
    { name: 'San Salvador', population: 1910000, coordinates: [-89.20023261, 13.70141095] },
    { name: 'Malabo', population: 0, coordinates: [8.772561312, 3.743604037] },
    { name: 'Asmara', population: 0, coordinates: [38.97000039, 15.32999703] },
    { name: 'Tallinn', population: 430805, coordinates: [24.75000032, 59.41666793] },
    { name: 'Mbabane', population: 0, coordinates: [31.19130033, -26.30338193] },
    { name: 'Addis Ababa', population: 3881000, coordinates: [38.70000039, 9.029997066] },
    { name: 'Stanley', population: 2108, coordinates: [-57.84900258, -51.70100404] },
    { name: 'Torshavn', population: 13408, coordinates: [-6.769997561, 62.02099796] },
    { name: 'Suva', population: 0, coordinates: [178.4477254, -18.13453197] },
    { name: 'Helsinki', population: 639227, coordinates: [24.97670135, 60.19641899] },
    { name: 'Paris', population: 2206488, coordinates: [2.354953148, 48.85828743] },
    { name: 'Cayenne', population: 57614, coordinates: [-52.32700369, 4.933002024] },
    { name: 'Libreville', population: 797003, coordinates: [9.463001397, 0.38538898] },
    { name: 'Banjul', population: 345089, coordinates: [-16.59170127, 13.45387694] },
    { name: 'Tbilisi', population: 1041399, coordinates: [44.79300033, 41.72500097] },
    { name: 'Berlin', population: 3426354, coordinates: [13.39960232, 52.52376498] },
    { name: 'Accra', population: 2020000, coordinates: [-0.216691019, 5.550034053] },
    { name: 'Athens', population: 664046, coordinates: [23.72830716, 37.98414804] },
    { name: 'Nuuk', population: 18426, coordinates: [-51.72140072, 64.19828122] },
    { name: 'Saint Georges', population: 0, coordinates: [-61.74840896, 12.05263334] },
    { name: 'Basse Terre', population: 0, coordinates: [-61.72499664, 15.99999907] },
    { name: 'Hagatna', population: 0, coordinates: [144.7504453, 13.47499893] },
    { name: 'Guatemala City', population: 5425000, coordinates: [-90.52700636, 14.62113495] },
    { name: 'Conakry', population: 3584583, coordinates: [-13.67703165, 9.531522973] },
    { name: 'Bissau', population: 430000, coordinates: [-15.59836034, 11.86502397] },
    { name: 'Georgetown', population: 235017, coordinates: [-58.15500068, 6.801973993] },
    { name: 'Port au Prince', population: 1237000, coordinates: [-72.33601014, 18.54297002] },
    { name: 'Tegucigalpa', population: 1130000, coordinates: [-87.21752907, 14.10399903] },
    { name: 'Budapest', population: 1752286, coordinates: [19.08200336, 47.50195205] },
    { name: 'Reykjavik', population: 136036, coordinates: [-21.8959892, 64.15002409] },
    { name: 'New Delhi', population: 31870000, coordinates: [77.22500032, 28.66699704] },
    { name: 'Jakarta', population: 10563715, coordinates: [106.8283004, -6.172499963] },
    { name: 'Tehran', population: 9720000, coordinates: [51.42434164, 35.67194003] },
    { name: 'Baghdad', population: 6375000, coordinates: [44.36192642, 33.33864833] },
    { name: 'Dublin', population: 1045669, coordinates: [-6.248889515, 53.33306195] },
    { name: 'Jerusalem', population: 936425, coordinates: [35.20662536, 31.77840761] },
    { name: 'Kingston', population: 669771, coordinates: [-76.76743329, 17.97707616] },
    { name: 'Tokyo', population: 37393128, coordinates: [139.7494616, 35.68696211] },
    { name: 'Amman', population: 1271453, coordinates: [35.93638213, 31.96399895] },
    { name: 'Astana', population: 808000, coordinates: [71.42777461, 51.17996002] },
    { name: 'Nairobi', population: 2740000, coordinates: [36.82199636, -1.283346007] },
    { name: 'Tarawa', population: 0, coordinates: [173.0175708, 1.338188999] },
    { name: 'Pristina', population: 550000, coordinates: [21.16598401, 42.66670997] },
    { name: 'Kuwait City', population: 3000000, coordinates: [47.97830116, 29.36971703] },
    { name: 'Bishkek', population: 1028000, coordinates: [74.58953763, 42.87502598] },
    { name: 'Vientiane', population: 948477, coordinates: [102.5999817, 18.23798795] },
    { name: 'Riga', population: 642233, coordinates: [24.09996579, 56.94889196] },
    { name: 'Beirut', population: 1931000, coordinates: [35.50970823, 33.87267496] },
    { name: 'Maseru', population: 330760, coordinates: [27.46995969, -29.31513595] },
    { name: 'Monrovia', population: 1300000, coordinates: [-10.80475166, 6.310556091] },
    { name: 'Tripoli', population: 1895000, coordinates: [13.18001179, 32.89250002] },
    { name: 'Vaduz', population: 5211, coordinates: [9.521585014, 47.13998199] },
    { name: 'Vilnius', population: 541229, coordinates: [25.31663526, 54.69607811] },
    { name: 'Luxembourg', population: 94000, coordinates: [6.131935388, 49.61166038] },
    { name: 'Antananarivo', population: 2618000, coordinates: [47.50790554, -18.91469001] },
    { name: 'Lilongwe', population: 989318, coordinates: [33.78200126, -13.98329502] },
    { name: 'Kuala Lumpur', population: 1788000, coordinates: [101.6999983, 3.166665038] },
    { name: 'Male', population: 132152, coordinates: [73.49994701, 4.166708966] },
    { name: 'Bamako', population: 5187000, coordinates: [-8.001985697, 12.64584199] },
    { name: 'Valletta', population: 0, coordinates: [14.5147054, 35.89973203] },
    { name: 'Majuro', population: 0, coordinates: [171.3800309, 7.103004094] },
    { name: 'Nouakchott', population: 1264000, coordinates: [-15.97534042, 18.08642705] },
    { name: 'Port Louis', population: 149226, coordinates: [57.49773982, -20.16571793] },
    { name: 'Mexico City', population: 9209944, coordinates: [-99.13100001, 19.44244299] },
    { name: 'Palikir', population: 0, coordinates: [158.1499743, 6.916643008] },
    { name: 'Chisinau', population: 668843, coordinates: [28.85771106, 47.01046916] },
    { name: 'Monaco', population: 0, coordinates: [7.420015687, 43.73964569] },
    { name: 'Ulaanbaatar', population: 1567000, coordinates: [106.9146881, 47.92138697] },
    { name: 'Podgorica', population: 189000, coordinates: [19.26361146, 42.46597298] },
    { name: 'Plymouth', population: 0, coordinates: [-62.21055681, 16.70529799] },
    { name: 'Rabat', population: 1738000, coordinates: [-6.841611567, 34.02530109] },
    { name: 'Maputo', population: 1873000, coordinates: [32.58721759, -25.95445201] },
    { name: 'Naypyidaw', population: 0, coordinates: [96.13927869, 19.76357294] },
    { name: 'Windhoek', population: 431000, coordinates: [17.0835461, -22.57000692] },
    { name: 'Yaren', population: 0, coordinates: [166.9332586, -0.547699613] },
    { name: 'Kathmandu', population: 1183300, coordinates: [85.31660454, 27.7180041] },
    { name: 'Amsterdam', population: 1136164, coordinates: [4.918924819, 52.35191456] },
    { name: 'Noumea', population: 0, coordinates: [166.4572134, -22.25587202] },
    { name: 'Managua', population: 1040000, coordinates: [-86.26849197, 12.15301612] },
    { name: 'Niamey', population: 1566000, coordinates: [2.115656604, 13.5167058] },
    { name: 'Abuja', population: 1235880, coordinates: [7.166997502, 9.180512028] },
    { name: 'Pyongyang', population: 3147800, coordinates: [125.7527002, 39.02138482] },
    { name: 'Skopje', population: 507089, coordinates: [21.43164905, 41.99808156] },
    { name: 'Oslo', population: 1014985, coordinates: [10.74803774, 59.91899005] },
    { name: 'Muscat', population: 1300000, coordinates: [58.59331213, 23.61332483] },
    { name: 'Islamabad', population: 1070000, coordinates: [73.05450272, 33.70799794] },
    { name: 'Panama City', population: 880691, coordinates: [-79.5350041, 8.967062087] },
    { name: 'Port Moresby', population: 410954, coordinates: [147.1925036, -9.46470764] },
    { name: 'Asuncion', population: 542023, coordinates: [-57.63592134, -25.29640201] },
    { name: 'Lima', population: 12150000, coordinates: [-77.12700846, -12.04801272] },
    { name: 'Manila', population: 13830000, coordinates: [120.9820179, 14.60420044] },
    { name: 'Warsaw', population: 1793579, coordinates: [21.01178018, 52.22967602] },
    { name: 'Lisbon', population: 544851, coordinates: [-9.144866009, 38.72272223] },
    { name: 'San Juan', population: 319515, coordinates: [-66.13999684, 18.39850736] },
    { name: 'Doha', population: 1536952, coordinates: [51.53166894, 25.28655601] },
    { name: 'Brazzaville', population: 2275000, coordinates: [15.28999062, -4.259185398] },
    { name: 'Bucharest', population: 1877155, coordinates: [26.09790796, 44.43531793] },
    { name: 'Moscow', population: 12380664, coordinates: [37.61901124, 55.75216412] },
    { name: 'Kigali', population: 1040865, coordinates: [30.0585853, -1.944072673] },
    { name: 'Gustavia', population: 0, coordinates: [-62.84997391, 17.89618093] },
    { name: 'Jamestown', population: 0, coordinates: [-5.716751508, -15.93822754] },
    { name: 'Basseterre', population: 12920, coordinates: [-62.71700922, 17.30203048] },
    { name: 'Castries', population: 10000, coordinates: [-60.99999859, 14.00197395] },
    { name: 'Marigot', population: 0, coordinates: [-63.08300726, 18.0700072] },
    { name: 'Saint Pierre', population: 0, coordinates: [-56.17705086, 46.7673081] },
    { name: 'Kingstown', population: 0, coordinates: [-61.21003506, 13.14827861] },
    { name: 'Apia', population: 37707, coordinates: [-171.7513817, -13.84154578] },
    { name: 'San Marino', population: 0, coordinates: [12.45174793, 43.93388113] },
    { name: 'Sao Tome', population: 24800, coordinates: [6.734973511, 0.333402896] },
    { name: 'Riyadh', population: 6884000, coordinates: [46.71099668, 24.64083315] },
    { name: 'Dakar', population: 3770000, coordinates: [-17.47399585, 14.71583102] },
    { name: 'Victoria', population: 0, coordinates: [55.44648846, -4.616631065] },
    { name: 'Freetown', population: 1272000, coordinates: [-13.23172254, 8.471004566] },
    { name: 'Singapore', population: 5646190, coordinates: [103.850076, 1.293033466] },
    { name: 'Philipsburg', population: 0, coordinates: [-63.050022, 18.02544779] },
    { name: 'Bratislava', population: 432864, coordinates: [17.10726107, 48.14816194] },
    { name: 'Ljubljana', population: 295504, coordinates: [14.51496903, 46.05108092] },
    { name: 'Honiara', population: 92297, coordinates: [159.9497653, -9.437994105] },
    { name: 'Mogadishu', population: 2277000, coordinates: [45.36618682, 2.066681334] },
    { name: 'Pretoria', population: 0, coordinates: [28.22927319, -25.74603746] },
    { name: 'Madrid', population: 3242000, coordinates: [-3.681093093, 40.00250115] },
    { name: 'Colombo', population: 648034, coordinates: [79.8577507, 6.931964831] },
    { name: 'Khartoum', population: 6395981, coordinates: [32.53195033, 15.58807819] },
    { name: 'Paramaribo', population: 254103, coordinates: [-55.16703031, 5.835030551] },
    { name: 'Mbabane', population: 76618, coordinates: [31.13999385, -26.3166085] },
    { name: 'Stockholm', population: 1736486, coordinates: [18.10396184, 59.33278813] },
    { name: 'Bern', population: 133798, coordinates: [7.466976063, 46.91668275] },
    { name: 'Damascus', population: 2767500, coordinates: [36.29999341, 33.50003466] },
    { name: 'Taipei', population: 2544000, coordinates: [121.5643996, 25.03583333] },
    { name: 'Dushanbe', population: 926000, coordinates: [68.78639948, 38.56139994] },
    { name: 'Dodoma', population: 410956, coordinates: [35.73817766, -6.172499963] },
    { name: 'Bangkok', population: 5460000, coordinates: [100.5166447, 13.74999921] },
    { name: 'Lome', population: 1919999, coordinates: [1.222757518, 6.131937717] },
    { name: 'Nukualofa', population: 0, coordinates: [-175.2196251, -21.13851217] },
    { name: 'Port of Spain', population: 544000, coordinates: [-61.51702788, 10.65200743] },
    { name: 'Tunis', population: 6388453, coordinates: [10.1796781, 36.80277814] },
    { name: 'Ankara', population: 3517182, coordinates: [32.85404304, 39.92003292] },
    { name: 'Ashgabat', population: 507000, coordinates: [58.37998573, 37.94999431] },
    { name: 'Funafuti', population: 0, coordinates: [179.1945613, -8.516651998] },
    { name: 'Kampala', population: 1530000, coordinates: [32.57399618, 0.318606067] },
    { name: 'Kyiv', population: 2963199, coordinates: [30.51468215, 50.43498097] },
    { name: 'Abu Dhabi', population: 1450000, coordinates: [54.36659338, 24.46668395] },
    { name: 'London', population: 9787426, coordinates: [-0.118667702, 51.50194058] },
    { name: 'Washington DC', population: 718355, coordinates: [-77.03597419, 38.89954938] },
    { name: 'Montevideo', population: 1764998, coordinates: [-56.16702829, -34.85804173] },
    { name: 'Tashkent', population: 2396000, coordinates: [69.28135586, 41.31170188] },
    { name: 'Port Vila', population: 0, coordinates: [168.3166404, -17.73335007] },
    { name: 'Caracas', population: 1943901, coordinates: [-66.92706683, 10.50199793] },
    { name: 'Hanoi', population: 4388000, coordinates: [105.8480682, 21.03499474] },
    { name: 'Mata-Utu', population: 0, coordinates: [-178.1166797, -13.28332999] },
    { name: 'Sanaa', population: 2826917, coordinates: [44.20755501, 15.3547333] },
    { name: 'Lusaka', population: 2539074, coordinates: [28.28263226, -15.41469807] },
    { name: 'Harare', population: 1890000, coordinates: [31.04568615, -17.81778978] },
];

// the popupTemplate is pre design template from "https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html".
// currently we only used it for the population number.
const popupTemplate = new PopupTemplate({
    title: "{Name}",
    content: [{
        type: "text",
        text: "<b>Population:</b> {Population}"
    }],
    className: "custom-popup-template"
  });

const MapComponent = () => {
    const mapRef = useRef(null); // reference to the map component

    useEffect(() => {
        const webMap = new WebMap({
            basemap: 'streets-navigation-vector' // There have more maps designs in "https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html" 
        });

        const view = new MapView({
            container: mapRef.current,
            map: webMap,
            center: [34.8516, 31.0461],  // Centering on Israel
            zoom: 7
        });

        capitalCities.forEach(city => { // Iterator for all the 'capitalCities' objects from the list above
            const point = new Point({
                longitude: city.coordinates[0],
                latitude: city.coordinates[1]
            });

            const symbol = { // design of the red circle for capital cities.
                type: 'simple-marker',
                color: 'red',
                outline: 
                {
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
