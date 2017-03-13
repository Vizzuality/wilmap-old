(() => {
  const topics = document.querySelector('.gallery-topics');
  const renderCards = (data) => {
    const gallery = $(document.createDocumentFragment());
    data.forEach((topic) => {
      const card = new App.Component.Card({
        heading: topic.field_name_topic,
        content: topic.field_definition_topic
      });
      gallery.append(card.el);
    });
    $(topics).append(gallery);
  };

  const init = () => {
    $.getJSON('api/topicsJSON')
      .then(renderCards);
  };

  init();

})();
