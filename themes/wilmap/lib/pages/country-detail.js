(($, settings) => {
  let map;
  const nodeid = settings.path.currentPath.split('/').pop();

  const getContentCountry = () => { // Show entries and news on country detail page
    let urlJSON = '';
  };

  const tabs = new App.Component.Tabs('.list-categories', { // Tabs
    fetch: true,
    endpoint: '/api/categoriesJSON',
    callback: getContentCountry
  });

  const initMap = () => { // Init map on header
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbWFwMiIsImEiOiJjajB0a2tvamowMmxmMndvN3IzdWc0a2RkIn0.CD_s7nTMkFLz5ZA4NpOz0A';
    map = new mapboxgl.Map({
      container: 'mapCover',
      style: 'mapbox://styles/wilmap2/cj0v5s204010w2rt8oz3r89vj',
      center: [0, 0],
      zoom: 2
    });

    map.on('load', () => {
      map.setFilter('countries', ['==', 'name', '']);
      map.setFilter('continents', ['==', 'CONTINENT', '']);
    });
  };

  initMap();
})(jQuery, drupalSettings);
