function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

(function ($) {
  function changeMenuOption(option) {
    $('.'+option+'-option').addClass('-selected');
  }
  Drupal.behaviors.myBehavior = {
    attach: function (context, settings) {
      var nodeid = settings.path.currentPath.split("/").pop();
      // console.log(nodeid)
      // console.log(context)
      // console.log(settings.path.currentPath);
      var path = getAbsolutePath();

      $('.search-box').keypress(function() {
        var value = $('.search-box').val();
        $.ajax({
          url: path + 'api/topicsJSON',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/hal+json'
          },
          success: function(data, status, xhr) {
            // here the magic
          }
        })
      });

      // *******************************************************
      // FUNCTIONS FOR GALLERY TOPICS PAGE
      // *******************************************************

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

      //*******************************************************
      //FUNCTIONS FOR GALLERY NEWS PAGE
      //*******************************************************

      if ($(context).find('.news-page').length !== 0) {
        var gallerytopics = document.querySelector(".gallery-scroll");


        $('.option-category').click(function(){
          $('.option-category').removeClass('-selected');
          var dataValue = $(this).data('bar');
          $('.small-bar').css('top', dataValue+'px');
          $(this).addClass('-selected');
        });

        $.ajax({
          url: path+"api/newsJSON",
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/hal+json"
          },
          success: function(data, status, xhr) {
            console.log(data);
            for(var i = 0; i<3; i++){
              var contentbox = '<div data-category="' + data[i].field_category + '" class="info-news"><h2>' + data[i].field_title +
              '</h2><span class="date">' + data[i].field_publication_date +
              '</span><div class="text">'+data[i].body+
              '</div><a class="butn -primary" href="' + data[i].path + '">read more</a></div>';
              $(gallerytopics).append(contentbox);
            }
          }
        })
      }
      if ($(context).find('.node-pages').length !== 0) {
        //*******************************************************
        //FUNCTIONS FOR NEWS DETAIL PAGE
        //*******************************************************
        if (path.indexOf('/news/') !== -1) {
          $('.node-pages').addClass('news-detail-page');
          changeMenuOption('news');
          $.ajax({
            url: "/api/newsJSON",
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/hal+json"
            },
            success: function(data, status, xhr) {
              console.log(data);
              for(var i = 0; i<data.length; i++){
                if(nodeid === data[i].nid) {
                  $('.title-node').html(data[i].field_title);
                  $('.date-node').html(data[i].field_publication_date);
                  $('.content-node').append(data[i].body);
                }
              }
            }
          })
        }
      } else {
        changeMenuOption(settings.path.currentPath);
      }
    }
  };
}(jQuery));
