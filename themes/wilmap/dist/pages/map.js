'use strict';

(function () {
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbWFwMiIsImEiOiJjajB0a2tvamowMmxmMndvN3IzdWc0a2RkIn0.CD_s7nTMkFLz5ZA4NpOz0A';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/wilmap2/cj0tkrrvy00hw2rqpc5selayi',
    center: [0, 0],
    zoom: 2
  });

  map.on('load', function () {
    map.setFilter('countries', ['==', 'name', '']);
    map.setFilter('continents', ['==', 'CONTINENT', '']);
    // map.setPaintProperty('bg_countries', 'fill-color', '#faafee');
  });

  var continentSelected = void 0;

  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['countries_bg', 'continents_bg'] });

    var country = features.find(function (feature) {
      return feature.layer.id === 'countries_bg';
    });
    var continent = features.find(function (feature) {
      return feature.layer.id === 'continents_bg';
    });
    if (country === undefined || continent === undefined) {
      console.warn('nothing here.');
      return;
    }

    if (continentSelected !== continent.properties.CONTINENT) {
      // select continent
      continentSelected = country.properties.continent;
      map.setFilter('continents', ['==', 'CONTINENT', continentSelected]);

      // reset country
      map.setFilter('countries', ['==', 'name', '']);
    } else {
      // select country
      map.setFilter('countries', ['==', 'name', country.properties.name]);
    }
  });
  // const sidebar = new App.Component.MapAccordion('.list-country-search-map');
})();