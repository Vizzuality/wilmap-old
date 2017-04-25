(() => {
  let map;
  const nodeid = drupalSettings.path.currentPath.split('/').pop();

  const getTabContent = (content) => { // Show entries and news on country detail page
    const heading = document.querySelector('.js-content-heading');
    heading.textContent = content.label;
  };

  const tabs = new App.Component.Tabs('.list-categories', { // Tabs
    fetch: true,
    tab: {
      id: 'field_category_entry_1',
      label: 'field_category_entry'
    },
    endpoint: `/api/categoriesForCountryJSON?country=${nodeid}`,
    callback: getTabContent
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
})();
