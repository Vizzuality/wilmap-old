'use strict';

(function ($) {
  var gallerytopics = document.querySelector('.gallery-topics');
  $.ajax({
    url: 'api/topicsJSON',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/hal+json'
    },
    success: function showTopics(data, status, xhr) {
      for (var i = 0; i < data.length; i += 1) {
        var contentbox = '<a href="#" class="info-topics"><div><h3>' + data[i].field_name_topic + '</h3>\n              <hr><div class="paragraph">' + data[i].field_definition_topic + '</div></div></a>';
        $(gallerytopics).append(contentbox);
      }
    }
  });
})(jQuery);