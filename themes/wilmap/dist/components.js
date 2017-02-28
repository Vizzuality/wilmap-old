'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

App.Loader = function () {
  function Loader(settings) {
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
'use strict';

//  $('.list-country-search-map').append('<li>' + data[i].title + '</li>');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

App.MapSidebar = function () {
  function MapSidebar(el, settings) {
    _classCallCheck(this, MapSidebar);

    this.options = Object.assign({}, settings);
    this.el = $(el);
    this.setContinents();
    this.render();
  }

  _createClass(MapSidebar, [{
    key: 'setContinents',
    value: function setContinents() {
      var _this = this;

      this.continents = $(document.createDocumentFragment());
      $.getJSON('api/continentsJSON', function (data) {
        data.forEach(function (continent) {
          _this.continents.append(MapSidebar.createContinent(continent, function () {
            return _this.setRegions(continent.nid);
          }));
        });
        _this.render();
      });
    }
  }, {
    key: 'setRegions',
    value: function setRegions(continentId) {
      var _this2 = this;

      var regions = $(document.createDocumentFragment());
      $.getJSON('api/regionsJSON?field_continent_target_id=' + continentId, function (data) {
        data.forEach(function (region) {
          regions.append(MapSidebar.createRegion(region, function () {
            return _this2.setCountries(region.nid);
          }));
        });
        _this2.el.find('.continent[data-nid=' + continentId + ']').children()[0].append(regions);
      });
    }
  }, {
    key: 'setCountries',
    value: function setCountries(regionId) {}
  }, {
    key: 'render',
    value: function render() {
      this.el.html(this.continents);
    }
  }], [{
    key: 'createContinent',
    value: function createContinent(continent, callback) {
      return $('<li>' + continent.title + '</li>').addClass('continent').attr('data-nid', continent.nid).click(function () {
        return callback();
      }).append('<ul></ul>');
    }
  }, {
    key: 'createRegion',
    value: function createRegion(region, callback) {
      return $('<li>' + region.field_title + '</li>').addClass('region').attr('data-nid', region.nid).click(function () {
        return callback();
      }).append('<ul></ul>');
    }
  }]);

  return MapSidebar;
}();