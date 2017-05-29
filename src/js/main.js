'use strict';

$(document).ready(function () {

  // GLOBAL VARIABLES
  var _window = $(window);
  var _document = $(document);

  /////////
  // C'OMMON
  /////////

  // Prevent # behavior
  $('[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // Smoth scroll
  $('a[href^="#section"]').click(function (e) {
    var el = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $(el).offset().top }, 1000);
    return false;
  });

  // HEADER SEARCH FOCUS
  // blue color on focus
  $('.header__search__input input').focusin(function () {
    $(this).parent().addClass('focused');
  });

  $('.header__search__input input').focusout(function () {
    $(this).parent().removeClass('focused');
  });

  // and make it red if filed is not empty
  $('.header__search__input input').keyup(function () {
    if (this.value) {
      $(this).parent().addClass('filled');
    } else {
      $(this).parent().removeClass('filled');
    }
  });

  // HEADER SCROLL
  _window.scrolled(10, function () {
    // scrolled is a constructor for scroll delay listener
    var vScroll = _window.scrollTop();
    var header = $('.header').not('.header--static');
    var headerHeight = header.height();
    var heroHeight = $('.hero').outerHeight() - headerHeight;

    if (vScroll > headerHeight) {
      header.addClass('header--transformed');
    } else {
      header.removeClass('header--transformed');
    }

    if (vScroll > heroHeight) {
      header.addClass('header--fixed');
    } else {
      header.removeClass('header--fixed');
    }
  });

  // MOBILE
  $('.header__mobile--search').on('click', function () {
    $(this).toggleClass('active');
    $('.header').toggleClass('header--search-enabled');
  });

  /////////
  // MODAL
  ////////

  $('*[data-modal]').on('click', function () {
    // remove all active first
    $('.modal').removeClass('opened');

    // find by id
    var target = $(this).data('modal');
    $('#' + target).addClass('opened');
  });

  $('.modal__close').on('click', function () {
    $(this).closest('.modal').removeClass('opened');
  });

  // INPUTS FOCUS
  // Codedrops based - pure javascript
  (function () {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function () {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call(document.querySelectorAll('.input--dynamic input')).forEach(function (inputEl) {
      // in case the input is already filled..
      if (inputEl.value.trim() !== '') {
        classie.add(inputEl.parentNode, 'input--focused');
      }

      // events:
      inputEl.addEventListener('focus', onInputFocus);
      inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
      classie.add(ev.target.parentNode, 'input--focused');
    }

    function onInputBlur(ev) {
      if (ev.target.value.trim() === '') {
        classie.remove(ev.target.parentNode, 'input--focused');
      }
    }
  })();

  ///////////
  // MAINPAGE
  ///////////

  // HERO FOCUS
  $('.hero__searchbar__input input').focusin(function () {
    $(this).parent().addClass('focused');
  });

  $('.hero__searchbar__input input').focusout(function () {
    $(this).parent().removeClass('focused');
  });

  // CAROUSELS

  $('.trending__wrapper').slick({
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });

  $('.testimonials__slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1
  });

  $('.testimonials__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.testimonials__nav a').each(function (i, val) {
      if ($(val).data('slide') == nextSlide) {
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });
  });

  $('.testimonials__nav a').on('click', function () {
    var selectedSlide = $(this).data('slide');

    $('.testimonials__slider').slick('slickGoTo', selectedSlide);
  });

  /////////////
  // RESULTS
  ////////////


  // FIlter toggle
  $('.results__filter__head').on('click', function () {
    $(this).closest('.results__filter').toggleClass('active');
  });

  // DATEPICKER
  $('.js-datepicker').datepicker({
    language: 'en',
    range: true,
    multipleDatesSeparator: " - "
  });

  // RANGESLIDER
  var rangeSlider = document.querySelector('.js-rangeslider');

  if ($('.js-rangeslider').length > 0) {
    noUiSlider.create(rangeSlider, {
      start: [90, 120],
      connect: true,
      tooltips: true,
      step: 5,
      // pips: { // Show a scale with the slider
      // 	mode: 'steps',
      // 	stepped: true,
      // 	density: 4
      // },
      range: {
        'min': [80],
        'max': [120]
      }
    });
  }

  // OPTIONAL
  // hero parallax on mousemove

  var movementStrength = 50;
  var height = movementStrength / _window.height();
  var width = movementStrength / _window.width();
  $(".hero").mousemove(function (e) {
    var pageX = e.pageX - _window.width() / 2;
    var pageY = e.pageY - _window.height() / 2;
    var newvalueX = width * pageX * -1 - 25;
    var newvalueY = height * pageY * -1 - 50;
    $('.hero-bg').css("background-position", newvalueX + "px     " + newvalueY + "px");
  });
});