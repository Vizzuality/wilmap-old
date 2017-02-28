(($) => {
  $.getJSON('api/continentsJSON', (data) => {
    for (let i = 0; i < data.length; i += 1) {
      $('.list-country-search-map').append('<li>' + data[i].title + '</li>');
    }
  });
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVjdG9ydWNoIiwiYSI6ImNpeXk3NzgzMjAwMDYzM3BuNXdiN3NiMDAifQ.v801v1GQOc5LhKNe5cAplQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hectoruch/ciyy8zgf900242sln9d7630km'
  });
})(jQuery);
