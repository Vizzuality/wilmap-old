(($) => {
  const gallerynews = document.querySelector('.gallery-scroll');
  let totalPages = 0;
  const category = 'all';

  function showNewsGallery(page, categoryFilter) {
    let numbersPager = '';
    let urlJSON = '';
    if (categoryFilter !== 'all') {
      urlJSON = `api/newsJSON?field_category_target_id=${categoryFilter}&items_per_page=3&page=${page}`;
    } else {
      urlJSON = `api/newsJSON?items_per_page=3&page=${page}`;
    }
    $.ajax({
      url: `${urlJSON}`,
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
        for (let i = 0; i < data.length; i += 1) {
          const contentbox = `<div data-category="${data[i].field_category}" class="info-news">
                <h2>${data[i].title}</h2>
                <span class="date">${data[i].field_date_published}</span>
                <div class="text">${data[i].field_summary}</div>
                <a class="butn -primary" href="${data[i].path}">read more</a>
                </div>`;
          $(gallerynews).append(contentbox);
        }
        if (page > 1) {
          numbersPager += `<li class="butn -primary numberPagerClick" data-value="${page - 1}">back</li>`;
        }
        // previous pages
        for (let j = page - 4; j < page; j += 1) {
          if (j < 1) continue;

          if (j === (page - 4) && j >= 2) {
            numbersPager += `<li class="numberPagerClick" data-value="1">1</li>`;
            numbersPager += `<li class="numberPagerClick" data-value="${j}">…</li>`;
            continue;
          }

          if (j <= totalPages) {
            if (j < page) {
              numbersPager += `<li class="numberPagerClick" data-value="${j}">${j}</li>`;
            }
          }
        }
        // next pages
        for (let j = page; j < (page + 5); j += 1) {
          if (j <= totalPages) {
            if (j === page) {
              numbersPager += `<li class="-selected numberPagerClick" data-value="${j}">${j}</li>`;
              continue;
            }

            if (j < (page + 4)) {
              numbersPager += `<li class="numberPagerClick" data-value="${j}">${j}</li>`;
            }

            if (j === (page + 4)) {
              numbersPager += `<li class="numberPagerClick" data-value="${j}">…</li>`;
              numbersPager += `<li class="numberPagerClick" data-value="${totalPages}">${totalPages}</li>`;
            }
          }
        }
        if (page < totalPages) {
          numbersPager += `<li class="butn -primary numberPagerClick" data-value="${page + 1}">next</li>`;
        }

        $('.pager-numbers').html(numbersPager);
        $('.numberPagerClick').click(function(){
          showNewsGallery($(this).data('value'), category);
        });
      }
    });
  }

  function getPager(categoryPager) {
    let urlJSON = '';
    if (categoryPager !== 'all') {
      urlJSON = `api/newsJSON?field_category_target_id=${categoryPager}`;
    } else {
      urlJSON = `api/newsJSON`;
    }
    $.ajax({
      url: `${urlJSON}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/hal+json'
      },
      success: function (dataNewsCount) {
        totalPages = parseInt(dataNewsCount.length / 3);
        showNewsGallery(1, categoryPager);
      }
    });
  }

  $.getJSON(`api/categoriesJSON`, function (data) {
    for (let i = 0; i < data.length; i += 1) {
      const contentFilter = `<li data-value="${data[i].nid}" class="option-category">${data[i].title}</li>`;
      $('.list-categories').append(contentFilter);
    }
    $('.option-category').click(function clickCategory() {
      $('.option-category').removeClass('-selected');
      const dataValue = $(this).data('value');
      const offset = $(this).offset().top - $('.nav-categories').parent().offset().top;
      $('.small-bar').css('top', `${offset - 10}px`);
      $('.small-bar').css('height', `${($(this).height() + 20)}px`);
      $(this).addClass('-selected');
      getPager(dataValue);
    });
  });
  // Call pager function then call show data function
  getPager(category);
})(jQuery);
