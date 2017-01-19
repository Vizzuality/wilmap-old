'use strict';

function getAbsolutePath() {
  var loc = window.location;
  var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
  return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

(function ($) {
  function changeMenuOption(option) {
    $('.' + option + '-option').addClass('-selected'); // `Hello, ${name}!`;
  }
  Drupal.behaviors.myBehavior = {
    attach: function attach(context, settings) {
      var nodeid = settings.path.currentPath.split('/').pop();
      var path = getAbsolutePath();

      $('.search-box').click(function () {
        $('.search-modal').css('display', 'block');
        $('.search-back').css('display', 'block');
        setTimeout(function () {
          $('.search-modal').addClass('-visible');
          $('.search-back').addClass('-visible');
        }, 10);
      });

      $('.search-back').click(function () {
        $('.search-modal').removeClass('-visible');
        $('.search-back').removeClass('-visible');
        setTimeout(function () {
          $('.search-modal').css('display', 'none');
          $('.search-back').css('display', 'none');
        }, 201);
      });

      $('.search-box').keypress(function () {
        var value = $('.search-box').val();
        $.ajax({
          url: path + 'api/topicsJSON',
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/hal+json'
          },
          success: function success(data, status, xhr) {
            // here the magic
          }
        });
      });

      // *******************************************************
      // FUNCTIONS FOR GALLERY TOPICS PAGE
      // *******************************************************

      if ($(context).find('.topics-page').length !== 0) {
        (function () {
          var gallerytopics = document.querySelector('.gallery-topics');
          $.ajax({
            url: path + 'api/topicsJSON',
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/hal+json'
            },
            success: function success(data, status, xhr) {
              for (var i = 0; i < data.length; i++) {
                var contentbox = '<a href="#" class="info-topics"><div><h3>' + data[i].field_name + '</h3>' + '<hr><p class="paragraph">' + data[i].field_d + '</p></div></a>';
                $(gallerytopics).append(contentbox);
              }
            }
          });
        })();
      }

      // *******************************************************
      // FUNCTIONS FOR GALLERY NEWS PAGE
      // *******************************************************

      if ($(context).find('.news-page').length !== 0) {
        var gallerynews = document.querySelector(".gallery-scroll");

        $('.option-category').click(function () {
          $('.option-category').removeClass('-selected');
          var dataValue = $(this).data('bar');
          $('.small-bar').css('top', dataValue + 'px');
          $(this).addClass('-selected');
        });

        $.ajax({
          url: path + 'api/newsJSON',
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/hal+json'
          },
          success: function success(data, status, xhr) {
            for (var i = 0; i < 3; i++) {
              console.log(data[i]);
              var contentbox = '<div class="info-news"><h2>' + data[i].field_title + '</h2><span class="date">' + data[i].field_publication_date + '</span><div class="text">' + data[i].body + '</div><a class="butn -primary" href="' + data[i].path + '">read more</a></div>';
              $(gallerynews).append(contentbox);
            }
          }
        });
      }
      if ($(context).find('.node-pages').length !== 0) {
        // *******************************************************
        // FUNCTIONS FOR NEWS DETAIL PAGE
        // *******************************************************
        if (path.indexOf('/news/') !== -1) {
          $('.node-pages').addClass('news-detail-page');
          changeMenuOption('news');
          $.ajax({
            url: '/api/newsJSON',
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/hal+json'
            },
            success: function success(data, status, xhr) {
              for (var i = 0; i < data.length; i++) {
                if (nodeid === data[i].nid) {
                  $('.title-node').html(data[i].field_title);
                  $('.date-node').html(data[i].field_publication_date);
                  $('.content-node').append(data[i].body);
                }
              }
            }
          });
        }
      } else {
        changeMenuOption(settings.path.currentPath);
      }
    }
  };
})(jQuery);