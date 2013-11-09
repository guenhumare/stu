jQuery(function($){

var ANUBIS = window.ANUBIS || {};

/* ==================================================
   Drop Menu
================================================== */

ANUBIS.subMenu = function(){
	$('#menu-nav').supersubs({
		minWidth: 12,
		maxWidth: 27,
		extraWidth: 0 // set to 1 if lines turn over
	}).superfish({
		delay: 0,
		animation: {opacity:'show'},
		speed: 'fast',
		autoArrows: false,
		dropShadows: false
	});	
}

/* ==================================================
   Mobile Navigation
================================================== */
/* Clone Menu for use later */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

ANUBIS.mobileNav = function(){
	var windowWidth = $(window).width();
	
	// Show Menu or Hide the Menu
	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('header');
			$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile').wrap('<div class="container"><div class="row"><div class="span12" />');
		}
	} else {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');	
		}
	}
}

// Call the Event for Menu 
ANUBIS.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		$('#navigation-mobile').stop().slideToggle(350, 'easeOutExpo');
		
		e.preventDefault();
	});
}

/* ==================================================
   Slider Settings
================================================== */

ANUBIS.slider = function(){
	var tpj=jQuery;
	tpj.noConflict();

	tpj(document).ready(function() {

	if (tpj.fn.cssOriginal!=undefined)
		tpj.fn.css = tpj.fn.cssOriginal;

		// Full Screen Slider
		tpj('.fullwidthbanner').revolution(
			{
				delay:9000,
				startwidth:1200,
				startheight:700,

				onHoverStop:"on",						// Stop Banner Timet at Hover on Slide on/off

				thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
				thumbHeight:50,
				thumbAmount:3,

				hideThumbs:0,
				navigationType:"bullet",				// bullet, thumb, none
				navigationArrows:"solo",				// nexttobullets, solo (old name verticalcentered), none

				navigationStyle:"round",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom


				navigationHAlign:"center",				// Vertical Align top,center,bottom
				navigationVAlign:"bottom",				// Horizontal Align left,center,right
				navigationHOffset:0,
				navigationVOffset:20,

				soloArrowLeftHalign:"left",
				soloArrowLeftValign:"center",
				soloArrowLeftHOffset:20,
				soloArrowLeftVOffset:0,

				soloArrowRightHalign:"right",
				soloArrowRightValign:"center",
				soloArrowRightHOffset:20,
				soloArrowRightVOffset:0,

				touchenabled:"on",						// Enable Swipe Function : on/off



				stopAtSlide:1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
				stopAfterLoops:0,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

				hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
				hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
				hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value


				fullWidth:"on",

				shadow:0								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)

			});
			
			// Simple Slider
			tpj('.sliderbanner').revolution(
			{
				delay:9000,
				startwidth:1170,
				startheight:600,

				onHoverStop:"on",						// Stop Banner Timet at Hover on Slide on/off

				thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
				thumbHeight:50,
				thumbAmount:3,

				hideThumbs:0,
				navigationType:"bullet",				// bullet, thumb, none
				navigationArrows:"solo",				// nexttobullets, solo (old name verticalcentered), none

				navigationStyle:"round",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom


				navigationHAlign:"center",				// Vertical Align top,center,bottom
				navigationVAlign:"bottom",				// Horizontal Align left,center,right
				navigationHOffset:0,
				navigationVOffset:20,

				soloArrowLeftHalign:"left",
				soloArrowLeftValign:"center",
				soloArrowLeftHOffset:20,
				soloArrowLeftVOffset:0,

				soloArrowRightHalign:"right",
				soloArrowRightValign:"center",
				soloArrowRightHOffset:20,
				soloArrowRightVOffset:0,

				touchenabled:"on",						// Enable Swipe Function : on/off



				stopAtSlide:1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
				stopAfterLoops:0,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

				hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
				hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
				hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value


				fullWidth:"on",

				shadow:0								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)

			});
	});
}

/* ==================================================
   Hover for Touch Devices
================================================== */

// Fix Hover on Touch Devices
ANUBIS.utils = function(){
	
	$('.work-item-thumbs, .box, .post-thumb, .single-people, .item-project, .lightbox').bind('touchstart', function(){
		$(".tapped").removeClass("tapped");
      	$(this).addClass('tapped');
    });
	
}



/* ==================================================
   Filter Team
================================================== */

ANUBIS.people = function (){
	if($('#team-people').length > 0){		
		var $container = $('#team-people');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  // options
			  animationEngine: 'best-available',
			  itemSelector : '.single-people',
			  layoutMode : 'fitRows'
			});
		});
	
		
		// filter items when filter link is clicked
		var $optionSets = $('#team-filter .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}
			
			return false;
		});
	}
}

/* ==================================================
   Filter Portfolio
================================================== */

ANUBIS.portfolio = function (){
	if($('#portfolio-projects').length > 0){		
		var $container = $('#portfolio-projects');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  // options
			  animationEngine: 'best-available',
			  itemSelector : '.item-project',
			  layoutMode : 'fitRows'
			});
		});
	
		
		// filter items when filter link is clicked
		var $optionSets = $('#portfolio-filter .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}
			
			return false;
		});
	}
}


/* ==================================================
   DropDown 
================================================== */

ANUBIS.dropDown = function(){
	$('.dropmenu').on('click', function(e){
		$(this).toggleClass('open');
		
		$('.dropmenu-active').stop().slideToggle(350, 'easeOutExpo');
		
		e.preventDefault();
	});
	
	$('.dropmenu-active a').on('click', function(e){
		var dropdown = $(this).parents('.dropdown');
		var selected = dropdown.find('.dropmenu .selected');
		var newSelect = $(this).html();
		
		$('.dropmenu').removeClass('open');
		$('.dropmenu-active').slideUp(350, 'easeOutExpo');
		
		selected.html(newSelect);
		
		e.preventDefault();
	});
}


/* ==================================================
   FancyBox
================================================== */

ANUBIS.fancyBox = function(){
	if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){
		
		$(".fancybox").fancybox({				
			padding : 0,
			helpers : {
				title : { type: 'inside' },
			}
		});
			
		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});
		
		$(".fancybox-various").fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '70%',
			height		: '70%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}
}


/* ==================================================
   Contact Form
================================================== */

ANUBIS.contactForm = function(){
	$("#contact-submit").on('click',function() {
		$contact_form = $('#contact-form');
		$('#response').text('Отправляем...')
		
		var fields = $contact_form.serialize();

		
		$.ajax({
			type: "POST",
			url: "/app/feedback.php",
			data: fields,
			success: function () {
				$('#contact-form input').val('');
				$('#contact-form textarea').val('');
			},
			complete: function (response) {
				$('#response').empty().html(response.responseText);
			}
		});

		return false;
	});
}


/* ==================================================
   Map
================================================== */

ANUBIS.map = function(){
	if($('.map').length > 0)
	{

		$('.map').each(function(i,e){

			$map = $(e);
			$map_id = $map.attr('id');
			$map_lat = $map.attr('data-mapLat');
			$map_lon = $map.attr('data-mapLon');
			$map_zoom = parseInt($map.attr('data-mapZoom'));
			$map_title = $map.attr('data-mapTitle');
			
			
			
			var latlng = new google.maps.LatLng($map_lat, $map_lon);			
			var options = { 
				scrollwheel: false,
				draggable: false, 
				zoomControl: false,
				disableDoubleClickZoom: false,
				disableDefaultUI: true,
				zoom: $map_zoom,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var styles = [ 
							{
								// Insert Here Your Custom Style if you Want Colorize the Map
							}
						];
			
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
			
			var map = new google.maps.Map(document.getElementById($map_id), options);
		
			var image = '_include/img/map-marker.png';
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: $map_title,
				icon: image
			});
			
			map.mapTypes.set('map_style', styledMap);
  			map.setMapTypeId('map_style');
			
			var contentString = '<p><strong>Company Name</strong><br>Address here</p>';
       
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			
			google.maps.event.addListener(marker, 'click', function() {
      			infowindow.open(map,marker);
    		});

		});
	}	
}

/* ==================================================
   Flickr Widget
================================================== */

ANUBIS.flickr = function(){
	// check if flickr_list exists
	if($('.flickr-list').length > 0){
		
		// cycling all the flickr_list
		$('.flickr-list').each(function(){
			$count = $(this).attr('data-count'); // set photos counts by attribute data-count
			
			// append ul into flickr_list
			$(this).html('<ul></ul>');
			
			$(this).find('ul').jflickrfeed({
				limit: $count, // photos limit
				itemTemplate: '<li><a href="{{link}}" title="{{title}}" target="_blank"><span class="overlay"></span><i class="font-icon-search"></i><img src="{{image_m}}" alt="{{title}}" title="{{title}}" /></a></li>', // list html template
				qstrings: {
					id: '52617155@N08' // your Flickr ID 
				}
			});
		}); 
	}
}

/* ==================================================
   Twitter Widget
================================================== */

ANUBIS.twitter = function(){
	// check if twitter_list exists
	if($('.twitter-list').length > 0){
		
		// cycling all the twitter_list  
		$(".twitter-list").each(function(){
			$count = $(this).attr('data-count'); // set tweet counts by attribute data-count
			
			$(this).tweet({
				join_text: '',
				username: "Bluxart", // your Twitter ID
				count: $count, // tweets limit
				view_text: "View on Twitter" // alt text
			});	
		});
	}	
}

/* ==================================================
   Accordion
================================================== */

ANUBIS.accordion = function(){
	var accordion_trigger = $('.accordion-heading.accordionize');
	
	accordion_trigger.delegate('.accordion-toggle','click', function(e){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');          
		  	accordion_trigger.find('.active').removeClass('active');   
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		e.preventDefault();
	});
}

/* ==================================================
   Toggle
================================================== */

ANUBIS.toggle = function(){
	var accordion_trigger_toggle = $('.accordion-heading.togglize');
	
	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(e){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		e.preventDefault();
	});
}


/* ==================================================
   Tooltip
================================================== */

ANUBIS.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}


/* ==================================================
	Scroll to Top
================================================== */

ANUBIS.scrollToTop = function(){
	var didScroll = false;

	var $arrow = $('#back-to-top');

	$arrow.click(function(e) {
		$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
		e.preventDefault();
	})

	$(window).scroll(function() {
		didScroll = true;
	});

	setInterval(function() {
		if( didScroll ) {
			didScroll = false;

			if( $(window).scrollTop() > 1000 ) {
				$arrow.css('display', 'block');
			} else {
				$arrow.css('display', 'none');
			}
		}
	}, 250);
}


/* ==================================================
	Center Images
================================================== */

ANUBIS.getSize = function(){
	
	if($('#image-static .fullimage-container').length > 0){
		$('#image-static .fullimage-container').each(function() {
			
			var img = $(this).find('img');	
			
			// Get on screen image
			var screenImage = img;
	
			// Create new offscreen image to test
			var theImage = new Image();
			theImage.src = screenImage.attr("src");
	
			// Get accurate measurements from that.
			var imageWidth = theImage.width;
			var imageHeight = theImage.height;
			
			screenImage.attr('width', imageWidth);
			screenImage.attr('height', imageHeight);
		});
	}
	
}

ANUBIS.centerImg = function(){
	if($('#image-static .fullimage-container').length > 0){
		$('#image-static .fullimage-container').each(function(){
			var img = $(this).find('img'),
				vpWidth = $(window).width(),
				vpHeight,
				imgHeight = img.attr('height'),
				imgWidth = img.attr('width'),
				imgAspectRatio = imgWidth / imgHeight,
				vpAspectRatio,
				newImgWidth,
				newImgHeight = vpWidth / imgAspectRatio;
		
			if( vpWidth <= 660 ) {
				vpHeight = 400;
				newImgWidth = imgWidth * vpHeight / imgHeight;
			} else if( vpWidth > 660 && vpWidth <= 1024 ) {
				vpHeight = 500;
				newImgWidth = imgWidth * vpHeight / imgHeight;
			} else {
				vpHeight = 700;
				newImgWidth = imgWidth * vpHeight / imgHeight;
			}
			
			vpAspectRatio = vpWidth / vpHeight;
									
			if( vpAspectRatio <= imgAspectRatio ) {
				img.css({
					'margin-top': 0,
					'width': newImgWidth,
					'height': '100%',
					'margin-left': (vpWidth - newImgWidth)/2
				});
			} else {
				img.css({
					'width': '100%',
					'height': newImgHeight,
					'margin-left': 'auto',
					'margin-top': (vpHeight - newImgHeight)/2
				});
			}
		});
	}
}

/* ==================================================
   Opacity Slider Elements on Scroll
================================================== */

ANUBIS.changeOpacity = function(){
	var arrows = $('.fullwidthbanner-container .tparrows, .fullwidthbanner-container .tp-bullets');
	
	$(window).scroll(function(){
		var st = $(this).scrollTop();
		arrows.css({ 'opacity' : (1 - st/600) });
	});
}


/* ==================================================
	Init
================================================== */

ANUBIS.slider();

$(document).ready(function(){
	ANUBIS.utils();
	
	ANUBIS.getSize();
	ANUBIS.centerImg();
	
	ANUBIS.mobileNav();
	ANUBIS.listenerMenu();
	ANUBIS.subMenu();
	ANUBIS.dropDown();
	ANUBIS.people();
	ANUBIS.portfolio();
	ANUBIS.accordion();
	ANUBIS.toggle();
	ANUBIS.toolTip();
	ANUBIS.fancyBox();
	ANUBIS.map();
	ANUBIS.flickr();
	ANUBIS.twitter();
	ANUBIS.contactForm();
	ANUBIS.scrollToTop();
	ANUBIS.changeOpacity();
});

$(window).resize(function(){
	ANUBIS.centerImg();
	ANUBIS.mobileNav();
});

});
