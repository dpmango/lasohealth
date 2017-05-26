$(document).ready(function(){

  const _window = $(window);
  const _document = $(document);

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

  // HERO FOCUS
  $('.hero__searchbar__input input').focusin(function(){
    $(this).parent().addClass('focused');
  });

  $('.hero__searchbar__input input').focusout(function(){
    $(this).parent().removeClass('focused');
  });

  // CAROUSELS

  $('.trending__wrapper').slick({
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

  // Magnific Popup
  var startWindowScroll = 0;
  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        startWindowScroll = _window.scrollTop();
        $('html').addClass('mfp-helper');
      },
      close: function() {
        $('html').removeClass('mfp-helper');
        _window.scrollTop(startWindowScroll);
      }
    }
  });

  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  $('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});

  // Masked input
  $("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
  $("input[name='phone']").mask("9 (999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");

});
