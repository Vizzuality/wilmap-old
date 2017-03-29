(() => {
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbWFwMiIsImEiOiJjajB0a2tvamowMmxmMndvN3IzdWc0a2RkIn0.CD_s7nTMkFLz5ZA4NpOz0A';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/wilmap2/cj0v5s204010w2rt8oz3r89vj',
    center: [0, 0],
    zoom: 2
  });

  const popupTemplate = _.template($('#map-popup-template').html());

  map.on('load', () => {
    map.setFilter('countries', ['==', 'name', '']);
    map.setFilter('continents', ['==', 'CONTINENT', '']);
  });

  let continentSelected;

  map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point, { layers: ['countries_bg', 'continents_bg'] });

    const country = features.find(feature => feature.layer.id === 'countries_bg');
    const continent = features.find(feature => feature.layer.id === 'continents_bg');
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

      const popup = new mapboxgl.Popup()
        .setLngLat(map.unproject(e.point))
        .setHTML(popupTemplate({
          name: country.properties.name,
          link: 'https://www.yobyot.com/wp-content/uploads/2011/04/hatedrupal.jpg'
        }))
        .addTo(map);
    }
  });

  // const sidebar = new App.Component.MapAccordion('.list-country-search-map');
})();
