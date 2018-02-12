'use strict';

//cutText
function cutText() {
  var filler = '...';
  var filler_length = filler.length;
  $('.cut-text').each(function () {
    var value = $(this).data('cut') - filler_length;
    var text = $.trim($(this).text());
    if (text.length > value && value > 0) {
      var newText = text.substring(0, value) + filler;
      $(this).text(newText);
    }
  });
};

//itemSlider
function itemSlider(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    arrows: false
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });
  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });
};

//articlesSlider
function articlesSlider(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });
  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });
};

//productTabs
function productTabs() {
  $('.product-tab__item').not(':first').hide();
  $('.js-tab .product-tabs-list__item').click(function () {
    $('.js-tab .product-tabs-list__item').removeClass('active').eq($(this).index()).addClass('active');
    $('.js-tab .product-tab__item').hide().eq($(this).index()).fadeIn();
    $('.articles-slider').slick('unslick');
    articlesSlider('.articles-slider');
  }).eq(0).addClass('active');
};

//reviewsTabs
function reviewsTabs() {
  $('.reviews-tab__item').not(':first').hide();
  $('.js-tab2 .tabs-list__item').click(function () {
    $('.js-tab2 .tabs-list__item').removeClass('active').eq($(this).index()).addClass('active');
    $('.js-tab2 .reviews-tab__item').hide().eq($(this).index()).fadeIn();
  }).eq(0).addClass('active');
};

//accessoriesTabs
function accessoriesTabs() {
  $('.accs-tab__item').not(':first').hide();
  $('.js-tab3 .tabs-list__item').click(function () {
    $('.js-tab3 .tabs-list__item').removeClass('active').eq($(this).index()).addClass('active');
    $('.js-tab3 .accs-tab__item').hide().removeClass('active').eq($(this).index()).fadeIn().addClass('active');
    $('.js-accs-slider').slick('setPosition');
  }).eq(0).addClass('active');
};

//showMore
function showMore(button, block) {
  $(button).on('click', function (e) {
    e.preventDefault();
    $(this).siblings(block).addClass('show');
    $(this).remove();
  });
};

//Product View Gallery
function checkFirstView() {
  var firstTab = $('.product-view__tabs li:first');
  firstTab.addClass('active');
  var productContent = $('.product-view__content');
  if (firstTab.attr('data-img')) {
    var picLargeSrc = firstTab.data('img');
    productContent.empty().append('<img src="' + picLargeSrc + '" alt="">');
    $('.product-view__content img').wrap('<a href="' + picLargeSrc + '" data-fancybox></a>');
  }
  if (firstTab.attr('data-video')) {
    var videoSrc = firstTab.data('video');
    productContent.empty().append('<iframe width="399" height="224" src="' + videoSrc + '" allowfullscreen></iframe>');
  }
};
function productView() {
  $('.product-view__tabs li').each(function () {
    if ($(this).attr('data-video')) {
      $(this).addClass('video');
    }
  });
  $('.product-view__tabs li').click(function () {
    $('.product-view__tabs li').removeClass('active');
    $(this).addClass('active');
    var productContent = $('.product-view__content');
    if ($(this).attr('data-img')) {
      var picLargeSrc = $(this).data('img');
      productContent.empty().append('<img src="' + picLargeSrc + '" alt="">');
      $('.product-view__content img').wrap('<a href="' + picLargeSrc + '" data-fancybox></a>');
      productContent.addClass('preload');
      $('.product-view__content img').on('load', function () {
        productContent.removeClass('preload');
      });
    }
    if ($(this).attr('data-video')) {
      var videoSrc = $(this).data('video');
      productContent.empty().append('<iframe width="399" height="224" src="' + videoSrc + '" allowfullscreen></iframe>');
    }
  });
};

$(document).ready(function () {
  $('.footer_placeholder').height($('.footer').outerHeight());
  cutText();
  itemSlider('.js-similar-slider', '.js-similar-prev', '.js-similar-next');
  itemSlider('.js-accs-slider', '.js-accs-prev', '.js-accs-next');
  itemSlider('.js-compatible-slider', '.js-compatible-prev', '.js-compatible-next');
  itemSlider('.js-viewed-slider', '.js-viewed-prev', '.js-viewed-next');
  articlesSlider('.articles-slider', '.js-articles-prev', '.js-articles-next');
  productTabs();
  reviewsTabs();
  accessoriesTabs();
  showMore('.js-show-table', '.table');
  showMore('.js-show-descript', '.product-tab__text');
  showMore('.js-show-reviews', '.reviews-item__text');
  productView();
  checkFirstView();
  $('select').styler();

  //heder dropdown
  $('.header-city__list .header-city__label').click(function (e) {
    e.preventDefault();
    $(this).closest('.header-city__list').toggleClass('active');
    return false;
  });
  $('.phone .phone__show').click(function (e) {
    e.preventDefault();
    $(this).closest('.phone').toggleClass('active');
    return false;
  });

  //reviews show all
  $('.js-all-reviews').click(function (e) {
    e.preventDefault();
    var info = {};
    info['action'] = $(this).attr('data-action');
    info['page'] = $(this).attr('data-page');
    info['per_page'] = $(this).attr('data-per-page');
    $('.preloader').show();
    $(this).remove();
    $.ajax({
      url: 'ajax-test.php',
      data: info,
      method: 'POST',
      success: function success(data) {
        if (data === undefined) {
          alert('no data');
        } else {
          $('.reviews-tab__item-wrap').append(data);
          $('.preloader').hide();
        }
      }
    });
  });
});

$(document).click(function (e) {
  if ($(e.target).closest('.header-city__list .header-city__label').length) {
    return;
  }
  if ($(e.target).closest('.phone .phone__show').length) {
    return;
  }
  $('.header-city__list, .phone').removeClass('active');
  e.stopPropagation();
});

$(window).load(function () {});

$(window).resize(function () {
  $('.footer_placeholder').height($('.footer').outerHeight());
});