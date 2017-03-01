(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVjdG9ydWNoIiwiYSI6ImNpeXk3NzgzMjAwMDYzM3BuNXdiN3NiMDAifQ.v801v1GQOc5LhKNe5cAplQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hectoruch/cizr9hdsh00o22rpdwsk30jfg',
    center: [0, 0],
    zoom: 2
  });
  map.on('load', function () {
    map.addLayer({
      id: 'state-fills',
      type: 'fill',
      source: {
        type: 'geojson',
        data: 'themes/wilmap/lib/geoJSON/countries.geo.json'
      },
      paint: {
        'fill-color': '#FFF',
        'fill-opacity': 0
      }
    });

    map.addLayer({
      id: 'states-layer',
      type: 'line',
      source: {
        type: 'geojson',
        data: 'themes/wilmap/lib/geoJSON/countries.geo.json'
      },
      paint: {
        'line-color': '#b3001e',
        'line-width': 3
      }
    });

    map.addLayer({
      id: 'state-fills-click',
      type: 'fill',
      source: {
        type: 'geojson',
        data: 'themes/wilmap/lib/geoJSON/countries.geo.json'
      },
      paint: {
        'fill-color': '#b3001e',
        'fill-opacity': 0.6
      },
      filter: ['==', 'name', '']
    });
  });

  map.on('click', function(e) {
    const features = map.queryRenderedFeatures(e.point, { layers: ['state-fills'] });
    if (features.length) {
      map.setFilter('state-fills-click', ['==', 'name', features[0].properties.name]);
      map.flyTo({
        center: map.unproject(e.point),
        zoom: 4,
        bearing: 0,
        speed: 0.6, // make the flying slow
        curve: 1, // change the speed at which it zooms out
      });
      const popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(map.unproject(e.point))
        .setHTML(`
        <div class="pop-up-map">
        <div class="number-articles">
        <h3 class="text-secondary-header -white">15</h3>
        <span class="paragraph -white">Articles</span>
        </div>
        <div class="info-country">
        <strong class="paragraph -black">${features[0].properties.name}</strong>
        <ul>
        <li class="paragraph"><b>7</b>Legislation</li>
        <li class="paragraph"class="paragraph -black"><b>3</b>Bills and leg prop</li>
        <li class="paragraph"><b>12</b>Decisions</li>
        </ul>
        <a href="" class="button-country">
          GO TO COUNTRY PAGE
        </a>
        </div>
        <div>
        `)
        .addTo(map);
    } else {
      map.setFilter('state-fills-click', ['==', 'name', '']);
    }
  });

  map.on('mousemove', function (e) {
    const features = map.queryRenderedFeatures(e.point, { layers: ['state-fills'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  const mapSidebar = new App.MapSidebar('.list-country-search-map');
})();
