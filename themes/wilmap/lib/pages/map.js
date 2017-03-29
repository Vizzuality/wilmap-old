(() => {
  const popupTemplate = _.template($('#map-popup-template').html());
  let popup = new mapboxgl.Popup();

  let currentContinent;
  let currentCountry;
  let map;

  const resetCountry = () => {
    currentCountry = '';
    map.setFilter('countries', ['==', 'name', '']);
    popup.remove();
  };

  const selectContinent = (continentId) => {
    currentContinent = (continentId === currentContinent) ? '' : continentId;
    map.setFilter('continents', ['==', 'CONTINENT', currentContinent]);

    $('.js-accordion').toggleClass('-collapsed', currentContinent === '');

    resetCountry();

    $('.js-accordion .js-continent-container').removeClass('-open');
    $(`.js-accordion .js-continent-container[data-id='${currentContinent}']`).addClass('-open');
  };

  const selectCountry = (countryId, point) => {
    if (currentCountry === countryId) {
      resetCountry();
      return;
    }
    currentCountry = countryId;
    const countryFilter = ['==', 'name', currentCountry];
    map.setFilter('countries', countryFilter);

    const countries = map.queryRenderedFeatures({
      layers: ['countries_bg'],
      filter: countryFilter
    });

    if (!countries.length) {
      return;
    }

    const center = (point === undefined) ?
      turf.centroid(countries[0]).geometry.coordinates :
      map.unproject(point);

    popup.remove();

    popup = new mapboxgl.Popup()
    .setLngLat(center)
    .setHTML(popupTemplate({
      name: countryId,
      link: 'https://www.yobyot.com/wp-content/uploads/2011/04/hatedrupal.jpg'
    }))
    .addTo(map);
  };

  const init = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbWFwMiIsImEiOiJjajB0a2tvamowMmxmMndvN3IzdWc0a2RkIn0.CD_s7nTMkFLz5ZA4NpOz0A';
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/wilmap2/cj0v5s204010w2rt8oz3r89vj',
      center: [0, 0],
      zoom: 2
    });

    map.on('load', () => {
      map.setFilter('countries', ['==', 'name', '']);
      map.setFilter('continents', ['==', 'CONTINENT', '']);
    });

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['countries_bg', 'continents_bg'] });

      const country = features.find(feature => feature.layer.id === 'countries_bg');
      const continent = features.find(feature => feature.layer.id === 'continents_bg');
      if (country === undefined || continent === undefined) {
        console.warn('nothing here.');
        return;
      }

      if (currentContinent !== continent.properties.CONTINENT) {
        selectContinent(country.properties.continent);
      } else {
        selectCountry(country.properties.name, e.point);
      }
    });

    const accordionTemplate = _.template($('#map-accordion-template').html());

    const fetchPromises = ['api/continentsJSON', 'api/regionsJSON', 'api/countriesJSON'].map(url => fetch(url));
    Promise.all(fetchPromises)
    .then(responses => Promise.all(responses.map(res => res.text())))
    .then(texts => Promise.all(texts.map(text => JSON.parse(text))))
    .then((jsons) => {
      const continents = jsons[0].slice(3);
      const regions = jsons[1];
      const countries = jsons[2];

      regions.forEach((region) => {
        const regionContinent = continents.find(continent => continent.nid === region.field_continent);
        if (regionContinent) {
          if (regionContinent.regions === undefined) {
            regionContinent.regions = [];
          }
          regionContinent.regions.push(region);
        }
      });
      countries.forEach((country) => {
        const countryContinent = continents.find(continent => continent.nid === country.field_continent_country);
        if (countryContinent) {
          if (countryContinent.countries === undefined) {
            countryContinent.countries = [];
          }
          countryContinent.countries.push(country);
        }
      });

      console.warn(continents);
      $('.js-accordion').html(accordionTemplate({ continents }));

      $('.js-accordion .js-continent').on('click', (e) => {
        selectContinent($(e.currentTarget).parent('.js-continent-container').data().id);
      });
      $('.js-accordion .js-country').on('click', (e) => { selectCountry($(e.currentTarget).data().id); });
    });
  };

  init();
})();
