$(document).ready(function(){

  // GLOBAL VARIABLES
  const _window = $(window);
  const _document = $(document);

  /////////
  // COMMON
  /////////

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click(function(e) {
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // HEADER SEARCH FOCUS
  // blue color on focus
  $('.header__search__input input').focusin(function(){
    $(this).parent().addClass('focused');
  });

  $('.header__search__input input').focusout(function(){
    $(this).parent().removeClass('focused').removeClass('searched');
  });

  // autcompleate
  // writeup
  $('.header__search__input input').keyup(function(){
    // 2 letter minum for search request
    if ( $(this).val().length > 1 ){
      $(this).parent().addClass('searched')
    } else {
      $(this).parent().removeClass('searched')
    }
  });

  // and make it red if filed is not empty
  $('.header__search__input input').keyup(function(){
    if( this.value ) {
      $(this).parent().addClass('filled');
    } else {
      $(this).parent().removeClass('filled');
    }
  });

  // HEADER SCROLL
  _window.scrolled(10, function() { // scrolled is a constructor for scroll delay listener
    var vScroll = _window.scrollTop();
    var header = $('.header').not('.header--static');
    var headerHeight = header.height();
    var heroHeight = $('.hero').outerHeight() - headerHeight;

    if ( vScroll > headerHeight ){
      header.addClass('header--transformed');
    } else {
      header.removeClass('header--transformed');
    }

    if ( vScroll > heroHeight ){
      header.addClass('header--fixed');
    } else {
      header.removeClass('header--fixed');
    }

  });

  // scrollbars
  $('.scrollbar-dynamic').scrollbar();

  // MOBILE
  $('.header__mobile--search').on('click', function(){
    $(this).toggleClass('active');
    $('.header').toggleClass('header--search-enabled');
  });

  /////////
  // MODAL
  ////////

  $('*[data-modal]').on('click', function(){
    // remove all active first
    $('.modal').removeClass('opened');

    // find by id
    var target = $(this).data('modal');
    $('#'+target).addClass('opened');

    window.location.hash = target;
  });

  $('.modal__close').on('click', function(){
    $(this).closest('.modal').removeClass('opened');
    window.location.hash = "";
  });

  // CHECK SAVED STATE
  if(window.location.hash) {
    var hash = window.location.hash.substring(1);
    $('#'+hash).addClass('opened');
  }

  // INPUTS FOCUS
  // Codedrops based - pure javascript
  (function() {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call( document.querySelectorAll( '.input--dynamic input' ) ).forEach( function( inputEl ) {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--focused' );
      }

      // events:
      inputEl.addEventListener( 'focus', onInputFocus );
      inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
      classie.add( ev.target.parentNode, 'input--focused' );
    }

    function onInputBlur( ev ) {
      if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--focused' );
      }
    }
  })();



  ///////////
  // MAINPAGE
  ///////////

  // HERO FOCUS
  $('.hero__searchbar__input input').focusin(function(){
    $(this).parent().addClass('focused');
  });

  $('.hero__searchbar__input input').focusout(function(){
    $(this).parent().removeClass('focused').removeClass('searched');
  });

  $('.hero__searchbar__input input').keyup(function(){
    // 2 letter minum for search request
    if ( $(this).val().length > 1 ){
      $(this).parent().addClass('searched')
    } else {
      $(this).parent().removeClass('searched')
    }
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


  $('.testimonials__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('.testimonials__nav a').each(function(i,val){
      if ( $(val).data('slide') == nextSlide ){
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });
  });

  $('.testimonials__nav a').on('click', function(){
    var selectedSlide = $(this).data('slide');

    $('.testimonials__slider').slick('slickGoTo', selectedSlide);
  });

  // VIDEO PLAY
  $('.video .icon-video-play').on('click', function(){
    $(this).closest('.video').toggleClass('playing');
    $(this).closest('.video').find('.video__iframe iframe').attr("src", $(".video__iframe iframe").attr("src").replace("autoplay=0", "autoplay=1"));
  });


  /////////////
  // RESULTS
  ////////////


  // FIlter toggle
  $('.results__filter__head').on('click', function(){
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

  if ( $('.js-rangeslider').length > 0 ){
    noUiSlider.create( rangeSlider, {
    	start: [ 90, 120 ],
      connect: true,
      tooltips: true,
      step: 1,
      // pips: { // Show a scale with the slider
    	// 	mode: 'steps',
    	// 	stepped: true,
    	// 	density: 4
    	// },
    	range: {
    		'min': [  80 ],
    		'max': [ 120 ]
    	}
    });

    // method to get current value
    // rangeSlider.noUiSlider.get();

    // docs on noUiSlider
    // https://refreshless.com/nouislider/slider-read-write/

  }

  // Toggle map results
  $('.results__map-toggler').on('click', function(){
    $(this).parent().toggleClass('active');

    if ( $(this).find('span').text() == 'Show on map' ){
      $(this).find('span').text('Hide map');
    } else {
      $(this).find('span').text('Show on map');
    }
  });

  // STICKY MAP RESULTS
  _window.scrolled(10, function () {
    var stickyEl = $('.results__map');
    var windowBottomScroll = _window.scrollTop() + _window.height();
    var stopPoint = _document.height() - $('footer').outerHeight();

    if (windowBottomScroll >= stopPoint) {
      stickyEl.addClass('results__map--stop');
    } else if (windowBottomScroll < stopPoint) {
      stickyEl.removeClass('results__map--stop');
    }
  });

  // OPTIONAL
  // hero parallax on mousemove

  var movementStrength = 50;
  var height = movementStrength / _window.height();
  var width = movementStrength / _window.width();
  $(".hero").mousemove(function(e){
    var pageX = e.pageX - (_window.width() / 2);
    var pageY = e.pageY - (_window.height() / 2);
    var newvalueX = width * pageX * -1 - 25;
    var newvalueY = height * pageY * -1 - 50;
    $('.hero-bg').css("background-position", newvalueX+"px     "+newvalueY+"px");
  });

});
