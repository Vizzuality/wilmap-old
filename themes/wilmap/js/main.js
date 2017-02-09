'use strict';

function getAbsolutePath() {
  var loc = window.location;
  var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
  return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

function changeMenuOption(option) {
  document.querySelector('.' + option + '-option').classList.add('-selected');
}

(function ($) {
  Drupal.behaviors.myBehavior = {
    attach: function drupal(context, settings) {
      var path = getAbsolutePath();
      var nodeid = settings.path.currentPath.split('/').pop();
      var host = window.location.host;

      // *******************************************************
      // FUNCTIONS FOR ALL PAGES
      // *******************************************************

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
        // const value = $('.search-box').val();
        $.ajax({
          url: path + 'api/topicsJSON',
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/hal+json'
          },
          success: function searchTerm(data, status, xhr) {
            // here the magic
          }
        });
      });

      // *******************************************************
      // FUNCTIONS FOR MAP PAGE
      // *******************************************************
      if (settings.path.currentPath === 'map') {
        $.getJSON(path + 'api/continentsJSON', function (data) {
          for (var i = 0; i < data.length; i += 1) {
            $('.list-country-search-map').append('<li>' + data[i].title + '</li>');
          }
        });
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGVjdG9ydWNoIiwiYSI6ImNpeXk3NzgzMjAwMDYzM3BuNXdiN3NiMDAifQ.v801v1GQOc5LhKNe5cAplQ';
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/hectoruch/ciyy8zgf900242sln9d7630km'
        });
      }

      // *******************************************************
      // FUNCTIONS FOR GALLERY EXPLORE PAGE
      // *******************************************************
      if (settings.path.currentPath === 'explore') {
        $('.filter-document').select2({
          placeholder: 'Document Type',
          allowClear: true,
          minimumResultsForSearch: Infinity,
          theme: 'wilmap-select-document'
        });
        $('.filter-country').select2({
          placeholder: 'Country',
          allowClear: true,
          minimumResultsForSearch: Infinity,
          theme: 'wilmap-select-country'
        });

        $('.filter-year').select2({
          placeholder: 'Year',
          allowClear: true,
          minimumResultsForSearch: Infinity,
          theme: 'wilmap-select-year'
        });

        $('.filter-group').select2({
          placeholder: 'Nothing',
          allowClear: true,
          minimumResultsForSearch: Infinity,
          theme: 'wilmap-select-year'
        });

        $('.filter-sort').select2({
          placeholder: 'Newest firts',
          allowClear: true,
          minimumResultsForSearch: Infinity,
          theme: 'wilmap-select-year'
        });
      }

      // *******************************************************
      // FUNCTIONS FOR GALLERY TOPICS PAGE
      // *******************************************************
      if (settings.path.currentPath === 'topics') {
        (function () {
          var gallerytopics = document.querySelector('.gallery-topics');
          $.ajax({
            url: path + 'api/topicsJSON',
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
        })();
      }

      // *******************************************************
      // FUNCTIONS FOR GALLERY NEWS PAGE
      // *******************************************************
      if (settings.path.currentPath === 'news') {
        (function () {
          var showNewsGallery = function showNewsGallery(page, categoryFilter) {
            var numbersPager = '';
            var urlJSON = '';
            if (categoryFilter !== 'all') {
              urlJSON = path + 'api/newsJSON?field_category_target_id=' + categoryFilter + '&items_per_page=3&page=' + page;
            } else {
              urlJSON = path + 'api/newsJSON?items_per_page=3&page=' + page;
            }
            $.ajax({
              url: '' + urlJSON,
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/hal+json'
              },
              success: function showNews(data) {
                if (data.length === 0) {
                  $(gallerynews).html('<h2 class="text-main-header">No news.</h2>');
                } else {
                  $(gallerynews).html('');
                }
                for (var i = 0; i < data.length; i += 1) {
                  var contentbox = '<div data-category="' + data[i].field_category + '" class="info-news">\n                <h2>' + data[i].title + '</h2>\n                <span class="date">' + data[i].field_date_published + '</span>\n                <div class="text">' + data[i].field_summary + '</div>\n                <a class="butn -primary" href="' + data[i].path + '">read more</a>\n                </div>';
                  $(gallerynews).append(contentbox);
                }
                if (page > 1) {
                  numbersPager += '<li class="butn -primary numberPagerClick" data-value="' + (page - 1) + '">back</li>';
                }
                for (var j = page; j < page + 8; j += 1) {
                  if (j <= totalPages) {
                    if (j === page) {
                      numbersPager += '<li class="-selected numberPagerClick" data-value="' + j + '">' + j + '</li>';
                    }

                    if (j === page + 6) {
                      numbersPager += '<li class="numberPagerClick" data-value="' + j + '">...</li>';
                    }

                    if (j === page + 7) {
                      numbersPager += '<li class="numberPagerClick" data-value="' + totalPages + '">' + totalPages + '</li>';
                    }

                    if (j !== page && j !== page + 6 && j !== page + 7) {
                      numbersPager += '<li class="numberPagerClick" data-value="' + j + '">' + j + '</li>';
                    }
                  }
                }
                if (page < totalPages) {
                  numbersPager += '<li class="butn -primary numberPagerClick" data-value="' + (page + 1) + '">next</li>';
                }
                $('.pager-numbers').html(numbersPager);
                $('.numberPagerClick').click(function () {
                  showNewsGallery($(this).data('value'), category);
                });
              }
            });
          };

          var getPager = function getPager(categoryPager) {
            var urlJSON = '';
            if (categoryPager !== 'all') {
              urlJSON = path + 'api/newsJSON?field_category_target_id=' + categoryPager;
            } else {
              urlJSON = path + 'api/newsJSON';
            }
            $.ajax({
              url: '' + urlJSON,
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/hal+json'
              },
              success: function success(dataNewsCount) {
                totalPages = parseInt(dataNewsCount.length / 3);
                showNewsGallery(1, categoryPager);
              }
            });
          };

          // showNewsGalleryPage(path);
          var gallerynews = document.querySelector('.gallery-scroll');
          var totalPages = 0;
          var category = 'all';

          $.ajax({
            url: path + 'api/categoriesJSON',
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/hal+json'
            },
            success: function showTopics(data) {
              for (var i = 0; i < data.length; i += 1) {
                var contentFilter = '<li data-value="' + data[i].nid + '" class="option-category">' + data[i].title + '</li>';
                $('.list-categories').append(contentFilter);
              }
              $('.option-category').click(function clickCategory() {
                $('.option-category').removeClass('-selected');
                var dataValue = $(this).data('value');
                var offset = $(this).offset().top - $('.nav-categories').parent().offset().top;
                $('.small-bar').css('top', offset - 10 + 'px');
                $('.small-bar').css('height', $(this).height() + 20 + 'px');
                $(this).addClass('-selected');
                getPager(dataValue);
              });
            }
          });
          // Call pager function then call show data function
          getPager(category);
        })();
      }

      // *******************************************************
      // FUNCTIONS FOR NEWS DETAIL PAGE
      // *******************************************************
      if ($(context).find('.news-detail-page').length !== 0) {
        (function () {
          var categoryId = '';
          $('.node-pages').addClass('news-detail-page');
          changeMenuOption('news');
          $.ajax({
            url: '/api/newsJSON?nid=' + nodeid,
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/hal+json'
            },
            success: function showDetail(data) {
              categoryId = data[0].field_category;
              $('.title-news-detail').html(data[0].title);
              $('.date-news-detail').html(data[0].field_date_published);
              $('.content-news-detail').html(data[0].field_summary);

              $.ajax({
                url: '/api/newsJSON?field_category_target_id=' + categoryId,
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/hal+json'
                },
                success: function success(dataRelated) {
                  for (var i = 0; i < 2; i += 1) {
                    var randomValue = Math.floor(Math.random() * dataRelated.length + 1);
                    var boxRelated = '<a href="' + dataRelated[randomValue].path + '" class="news-info">\n                    <strong class="related-title">' + dataRelated[randomValue].title + '</strong>\n                    <span class="related-date">' + dataRelated[randomValue].field_date_published + '</span>\n                    <div class="text paragraph">\n                        ' + dataRelated[randomValue].field_summary + '\n                    </div>\n                    <div class="shadow"></div>\n                  </a>';
                    $('.gallery-news-related').append(boxRelated);
                  }
                }
              });
            }
          });
        })();
      } else {
        changeMenuOption(settings.path.currentPath);
      }
    }
  };
})(jQuery);