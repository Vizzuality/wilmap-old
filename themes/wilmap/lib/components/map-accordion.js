'use strict';
App.Component.MapAccordion = class MapSidebar {
  /**
   * @param {String|HTMLElement} el
   * @param {Object} settings
   */
  constructor(el, settings) {
    this.options = Object.assign({}, settings);
    this.el = $(el);
    this.el.addClass('c-map-accordion');
    this.current = {};
    this.fetch()
      .then(this.init.bind(this));
  }

  /**
   * Fetches all countries, regions and countries and parses the data as a hierarchy.
   * @returns {Promise}
   */
  fetch() {
    this.data = {};
    return $.getJSON('api/regionsJSON')
      .then((res) => {
        res.forEach((region) => {
          this.data = { ...this.data, [region.nid]: region };
        });
        return $.getJSON('api/countriesJSON');
      })
      .then((res) => {
        res.forEach((country) => {
          if (country.field_region) {
            this.data[country.field_region].countries = {
              ...this.data[country.field_region].countries,
              [country.nid]: country
            };
          }
        });
      });
  }

  /**
   * Inits the accordion sections
   */
  init() {
    // Create fragment where we'll render the sections
    this.accordion = $(document.createDocumentFragment());
    Object.keys(this.data).forEach((regionKey) => {
      const region = this.data[regionKey];
      const regionConfig = {
        className: 'accordion-section',
        childrenClass: 'js-countries',
        title: region.field_title,
        nid: region.nid
      };
      const regionSection = MapSidebar.createSection(regionConfig, this.toggleSection.bind(this));
      Object.keys(region.countries).forEach((countryKey) => {
        const country = region.countries[countryKey];
        const countryConfig = {
          className: 'accordion-subsection',
          title: country.title,
          nid: country.nid
        };
        // create a country section and append it to the region section previously created
        const countriesSection = regionSection.find('.js-countries');
        countriesSection.append(MapSidebar.createSection(countryConfig, this.onSelectLeaf.bind(this)))
      });
      // append the continent section already containing regions and countries to the accordion
      this.accordion.append(regionSection);
    });
    this.render();
  }

  /**
   * Handles the click onn an accordion section
   * @param {Event} e
   */
  toggleSection(e) {
    e.preventDefault();
    e.stopPropagation();
    const section = $(e.target).closest('li');
    const level = section.data('level');
    const nid = parseInt(section.data('nid'), 10);
    this.setCurrent(level, nid);
    if (this.current[level] && section.find('>ul').children().length) {
      section.toggleClass('-open');
      if (this.hasOpenSection()) return this.el.removeClass('-collapsed');
    }
    if (!section.closest('.-open').length) this.el.addClass('-collapsed');
  }

  /**
   * Updates the current selected section and closes the previously selected one
   * @param {String} level
   * @param {Number} nid
   */
  setCurrent(level, nid) {
    let distinct = true;
    if (typeof this.current[level] !== 'undefined') {
      distinct = this.current[level] !== nid;
      this.resetCurrent(level);
    }
    this.current[level] = distinct ? nid : null;
  }

  /**
   * Resets the current selected sections
   * @param {String} level
   */
  resetCurrent(level) {
    const previous = $(`[data-nid="${this.current[level]}"]`);
    previous.removeClass('-open');
    const openChild = previous.find('.-open');
    openChild.removeClass('-open');
    this.current[level] = null;
    if (openChild.length) this.current[openChild.data('level')] = null;
  }

  /**
   * Tests whether the accordion has an open section
   */
  hasOpenSection() {
    return Object.keys(this.current)
      .some(key => this.current[key] !== null);
  }

  /**
   * Handles the lead
   * @param {Event} e
   */
  onSelectLeaf(e) {
    e.preventDefault();
    e.stopPropagation();
    const country = $(e.target).closest('li').find('>span').text();
    console.info(country);
  }

  /**
   * Creates an accordion section
   * @param className - css class of the section
   * @param childrenClass - css class of the subsections
   * @param title - section title
   * @param nid - section unique id
   * @param onClick - click callback
   * @returns {*|jQuery}
   */
  static createSection({ className, childrenClass, title, nid }, onClick) {
    const template = `<li>
<span>${title}</span>
</li>`;
    const section = $(template)
      .addClass(className)
      .attr('data-level', className)
      .attr('data-nid', nid)
      .click(onClick);
    if (childrenClass) section.append(`<ul class="${childrenClass}"></ul>`);
    return section;
  }

  render() {
    this.el.html(this.accordion);
  }
};
