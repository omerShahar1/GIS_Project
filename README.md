## How to run
before starting, dawnload the following SDK:
```
npm install @arcgis/core
```

After that, write the following command in the terminal:
```
npm start
```

## About the project
The project is a React-based GIS web-application. I am using for this app the ArcGIS Maps SDK.
I created “MapComponent” as the primary component of this app. This component consist of a pre-made map from the given SDK.
The map start by focusing on Israel location (around [34.8516, 31.0461]).
We added to the map ‘view’ constant another layer to show geographic locations of capital cities around the world. The cities are kept in a list of objects with the relevant information about each city.
Each city is represented on the map with a red bubble. You can press the bubble and receive the specific information regarding that city (currently name and population).

## possible future improvments:
* Move the cities data into a data base. This will allow us to change the data without the need to redeploy the application.
* We need to test the system in different resolutions (phones, iPads, etc.)
* We should prepare for what happens if there are network problems (slow network or disconnections).
