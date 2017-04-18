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

  setListeners() {
    this.el.children().click(function() {
      $('.option-category').removeClass('-selected');
      var dataValue = $(this).data('value');
      var offset = $(this).offset().top - $('.nav-categories').parent().offset().top;
      $('.small-bar').css('top', offset - 10 + 'px');
      $('.small-bar').css('height', $(this).height() + 20 + 'px');
      $(this).addClass('-selected');
      // getPager(dataValue);
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
    // this.setListeners();
  }

  render() {
    this.el.html(this.template);
  }
};
