'use strict';

App.Component.Card = class Card {

  /**
   * @param {Object} settings
   */
  constructor(settings) {
    this.options = Object.assign({}, settings);
    this.el = $(`<div class="c-card ${this.options.extended ? '-extended' : ''}"></div>`);
    this.template = _.template($('#card-template').html());

    this.render();
  }

  render() {
    this.el.html(this.template(this.options));
  }

};
