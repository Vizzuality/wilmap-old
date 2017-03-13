'use strict';

App.Component.Card = class Card {

  constructor (settings) {
    this.options = Object.assign({}, settings);
    this.el = $('<div class="c-card"></div>');

    this.template = `
<h3 class="card-heading">${this.options.heading}</h3>
<div class="card-content">${this.options.content}</div>
`;

    this.render();
  }

  render() {
    this.el.html(this.template);
  }

};
