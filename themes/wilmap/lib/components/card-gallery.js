'use strict';

App.Component.CardGallery = class CardGallery {

  /**
   * @param {String|HTMLElement} el
   * @param {Object} settings
   */
  constructor(el, settings) {
    this.options = Object.assign({}, settings);
    this.el = $(el);
    this.el.addClass('c-card-gallery');
    this.fetch()
      .then(this.init.bind(this));
  }

  /**
   * Fetches the gallery cards data from the give endpoint
   * @returns {Promise}
   */
  fetch() {
    return $.getJSON(this.options.endpoint)
      .then((data) => {
        this.data = data;
      });
  }

  /**
   * Initializes the gallery
   */
  init() {
    this.template = $(document.createDocumentFragment());
    this.data.forEach((topic) => {
      const config = this.options.card;
      // TODO: remove default values, when data is ready. For now, leave them as an example
      const card = new App.Component.Card({
        style: config.style,
        heading: config.headingName ? topic[config.headingName] || 'Heading' : null,
        subheading: config.subheadingName ? topic[config.subheadingName] || 'Sub-heading' : null,
        details: config.detailsName ? topic[config.detailsName] || 'details' : null,
        location: config.locationName ? topic[config.locationName] || 'location' : null,
        content: config.contentName ? topic[config.contentName] || 'content' : null,
        alias: topic.path
      });
      this.template.append(card.el);
    });

    this.render();
  }

  render() {
    this.el.html(this.template);
  }
};
