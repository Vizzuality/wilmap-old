'use strict';

App.Component.Tabs = class Tabs {

  /**
   * @param {String|HTMLElement} el
   * @param {Object} settings
   */
  constructor(el, settings) {
    this.options = Object.assign({}, settings);
    this.el = $(el);
    this.callback = this.options.callback;
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

  setListeners(callback) {
    this.el.children('li').click(function() {
      $('li').removeClass('-selected');
      var dataValue = $(this).data('value');
      var offset = $(this).offset().top - $('.nav-categories').parent().offset().top;
      $('.small-bar').css('top', offset - 10 + 'px');
      $('.small-bar').css('height', $(this).height() + 20 + 'px');
      $(this).addClass('-selected');
      // update tab content
      callback(dataValue);
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
    this.setListeners(this.callback);
  }

  render() {
    this.el.append(this.template);
  }
};
