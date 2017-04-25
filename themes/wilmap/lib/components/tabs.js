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
    this.el.children('li').click((e) => {
      const el = e.target;
      if (!$(this).hasClass('-selected')) {
        $('li').removeClass('-selected');
        const dataValue = $(el).data('value');
        const offset = $(el).offset().top - $('.nav-categories').parent().offset().top;
        const smallBar = $('.small-bar');
        smallBar.css('top', `${offset - 10}px`);
        smallBar.css('height', `${$(el).height() + 20}px`);
        $(this).addClass('-selected');
        // update tab content
        callback({ data: dataValue, label: el.textContent });
      }
    });
  }

  /**
   * Initializes the gallery
   */
  init() {
    this.template = $(document.createDocumentFragment());
    const { id, label } = this.options.tab;
    this.data.forEach((tab) => {
      const tabHtml = `<li data-value="${tab[id]}" class="option-category"> ${tab[label]} </li>`;
      this.template.append(tabHtml);
    });

    this.render();
    this.setListeners(this.callback);
  }

  render() {
    this.el.append(this.template);
  }
};
