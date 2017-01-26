function getAbsolutePath() {
  const loc = window.location;
  const pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
  return loc.href.substring(0, loc.href.length -
  ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

function changeMenuOption(option) {
  document.querySelector(`.${option}-option`).classList.add('-selected');
}

(function ($) {
  Drupal.behaviors.myBehavior = {
    attach: function drupal(context, settings) {
      const path = getAbsolutePath();
      const nodeid = settings.path.currentPath.split('/').pop();
      // *******************************************************
      // FUNCTIONS FOR GALLERY ALL PAGES
      // *******************************************************

      $('.search-box').click(function(){
        $('.search-modal').css('display', 'block');
        $('.search-back').css('display', 'block');
        setTimeout(function(){
          $('.search-modal').addClass('-visible');
          $('.search-back').addClass('-visible');
        }, 10);
      });

      $('.search-back').click(function(){
        $('.search-modal').removeClass('-visible');
        $('.search-back').removeClass('-visible');
        setTimeout(function(){
          $('.search-modal').css('display', 'none');
          $('.search-back').css('display', 'none');
        }, 201);
      });

      $('.search-box').keypress(function() {
        // const value = $('.search-box').val();
        $.ajax({
          url: `${path}api/topicsJSON`,
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
        const gallerytopics = document.querySelector('.gallery-topics');
        $.ajax({
          url: `${path}api/topicsJSON`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/hal+json'
          },
          success: function showTopics(data, status, xhr) {
            for (let i = 0; i < data.length; i += 1) {
              const contentbox = `<a href="#" class="info-topics"><div><h3>${data[i].field_name_topic}</h3>
              <hr><div class="paragraph">${data[i].field_definition_topic}</div></div></a>`;
              $(gallerytopics).append(contentbox);
            }
          }
        });
      }

      // *******************************************************
      // FUNCTIONS FOR GALLERY NEWS PAGE
      // *******************************************************
      if (settings.path.currentPath === 'news') {
        const gallerynews = document.querySelector('.gallery-scroll');
        $('.option-category').click(function clickCategory() {
          $('.option-category').removeClass('-selected');
          const dataValue = $(this).data('bar');
          $('.small-bar').css('top', `${dataValue}px`);
          $(this).addClass('-selected');
        });

        $.ajax({
          url: `${path}api/newsJSON`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/hal+json'
          },
          success: function showNews(data, status, xhr) {
            for (let i = 0; i < 3; i += 1) {
              const contentbox = `<div data-category="${data[i].field_category}" class="info-news">
              <h2>${data[i].title}</h2>
              <span class="date">${data[i].field_date_published}</span>
              <div class="text">${data[i].field_summary}</div>
              <a class="butn -primary" href="${data[i].path}">read more</a>
              </div>`;
              $(gallerynews).append(contentbox);
            }
          }
        });
      }

      // *******************************************************
      // FUNCTIONS FOR NEWS DETAIL PAGE
      // *******************************************************
      if ($(context).find('.node-pages').length !== 0) {
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
            success: function showDetail(data, status, xhr) {
              for (let i = 0; i < data.length; i += 1) {
                if (nodeid === data[i].nid) {
                  $('.title-node').html(data[i].field_title);
                  $('.date-node').html(data[i].field_date_published);
                  $('.content-node').append(data[i].field_summary);
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
}(jQuery));