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
      const card = new App.Component.Card({
        heading: topic[this.options.headingName],
        content: topic[this.options.contentName]
      });
      this.template.append(card.el);
    });

    this.render();
  }

  render() {
    this.el.html(this.template);
  }
};
