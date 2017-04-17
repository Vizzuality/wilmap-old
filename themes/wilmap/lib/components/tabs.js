'use strict';

App.Component.Tabs = class Tabs {

  /**
   * @param {String|HTMLElement} el
   * @param {Object} settings
   */
  constructor(el, settings) {
    this.options = Object.assign({}, settings);
    this.el = $(el);
    if (this.options.fetch) {
      this.fetch()
      .then(this.init.bind(this));
    } else {
      this.data = this.options.data;
      this.init.bind(this);
    }
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
    this.data.forEach((tab) => {
      let tabHtml = '<li data-value="' + tab.nid + '" class="option-category">' + tab.title + '</li>';
      this.template.append(tabHtml);
    });

    this.render();
  }

  render() {
    this.el.html(this.template);
  }
};
