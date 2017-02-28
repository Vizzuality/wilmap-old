'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

App.Loader = function () {
  function Loader(el, settings) {
    _classCallCheck(this, Loader);

    this.options = Object.assign({}, settings);
    this.el = $('<div></div>');
    this.el.addClass('box-loader');
    if (this.options.hidden) this.$el.addClass('-hidden');

    this.template = '\n<ul>\n<li class="title-loader -short"></li>\n<li class="title-loader"></li>\n<li class="date-loader -medium"></li>\n<li class="text-loader -short"></li>\n<li class="text-loader"></li>\n<li class="text-loader -medium"></li>\n<li class="text-loader -medium"></li>\n<li class="text-loader"></li>\n</ul>';

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.render();
  }

  _createClass(Loader, [{
    key: 'toggleVisibility',
    value: function toggleVisibility() {
      this.el.toggleClass('-hidden');
    }
  }, {
    key: 'render',
    value: function render() {
      this.el.html(this.template);
    }
  }]);

  return Loader;
}();