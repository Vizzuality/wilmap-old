'use strict';

(function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVjdG9ydWNoIiwiYSI6ImNpeXk3NzgzMjAwMDYzM3BuNXdiN3NiMDAifQ.v801v1GQOc5LhKNe5cAplQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hectoruch/cizr9hdsh00o22rpdwsk30jfg'
  });
  var mapSidebar = new App.MapSidebar('.list-country-search-map');
})();