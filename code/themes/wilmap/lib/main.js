function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

(function ($) {
  Drupal.behaviors.myBehavior = {
    attach: function (context, settings) {
      console.log(settings);
      // console.log(settings.path.currentPath);

      var path = getAbsolutePath();
      if ($(context).find('.topics-page').length !== 0) {
        var gallerytopics = document.querySelector(".gallery-topics");
        $.ajax({
          url: path+"api/topicsJSON",
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/hal+json"
          },
          success: function(data, status, xhr) {
            for(var i = 0; i<data.length; i++){
              var contentbox = '<a href="#" class="info-topics"><div><h3>' + data[i].field_name + '</h3>' +
              '<hr><p class="paragraph">' + data[i].field_d + '</p></div></a>';
              $(gallerytopics).append(contentbox);
            }
          }
        })
      }
    }
  };
}(jQuery));
