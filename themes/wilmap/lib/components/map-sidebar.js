'use strict';

//  $('.list-country-search-map').append('<li>' + data[i].title + '</li>');

App.MapSidebar = class MapSidebar {

  constructor (el, settings) {
    this.options = Object.assign({}, settings);
    this.el = $(el);
    this.setContinents();
    this.render();
  }

  static createContinent(continent, callback) {
    return $(`<li>${continent.title}</li>`)
      .addClass('continent')
      .attr('data-nid', continent.nid)
      .click(() => callback())
      .append('<ul></ul>');
  }

  static createRegion(region, callback) {
    return $(`<li>${region.field_title}</li>`)
      .addClass('region')
      .attr('data-nid', region.nid)
      .click(() => callback())
      .append('<ul></ul>');
  }

  setContinents() {
    this.continents = $(document.createDocumentFragment());
    $.getJSON('api/continentsJSON', (data) => {
      data.forEach((continent) => {
        this.continents.append(MapSidebar.createContinent(continent, () => this.setRegions(continent.nid)));
      });
      this.render();
    });
  }

  setRegions(continentId) {
    const regions = $(document.createDocumentFragment());
    $.getJSON(`api/regionsJSON?field_continent_target_id=${continentId}`, (data) => {
      data.forEach((region) => {
        regions.append(MapSidebar.createRegion(region, () => this.setCountries(region.nid)));
      });
      this.el.find(`.continent[data-nid=${continentId}]`).children()[0].append(regions);
    });
  }

  setCountries(regionId) {

  }

  render() {
    this.el.html(this.continents);
  }

};
