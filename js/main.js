(function($) {
	"use strict"

	///////////////////////////
	// Preloader


	$("#hidme").hide();

	
	var images = ["0.jpg", "1.jpg", "2.jpg","3.jpg","4.jpg","5.jpg"];
	var i = 0;
    setTimeout(function(){
	$("#bg-img").css("background-image", "url(./img/" + images[i] + ")");
	setInterval(function () {
		i++;
		if (i == images.length) {
			i = 0;
		}
		$("#bg-img").fadeOut("fast", function () {
			$(this).css("background-image", "url(./img/" + images[i] + ")");
			$(this).fadeIn("fast");
		});
		console.log(i);
	},5000);
}, 40000);

	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();
	});
    
	///////////////////////////
	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	///////////////////////////
	// Smooth scroll
	$("#nav .main-nav a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$('#back-to-top').on('click', function(){
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	$('#newsredirect').on('click', function(){
		window.location = 'news.html';
	});

	///////////////////////////
	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function() {
		$('#nav').toggleClass('open');
	});

	///////////////////////////
	// Mobile dropdown
	$('.has-dropdown a').on('click', function() {
		$(this).parent().toggleClass('open-drop');
	});

	///////////////////////////
	// On Scroll
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	///////////////////////////
	// magnificPopup
	$('.work').magnificPopup({
		delegate: '.lightbox',
		type: 'image'
	});

	///////////////////////////
	// Owl Carousel


	
	$('#about-slider').owlCarousel({
		items:1,
		loop:true,
		margin:15,
		nav: true,
		navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		dots : true,
		autoplay : true,
		animateOut: 'fadeOut'
	});

	$('#testimonial-slider').owlCarousel({
		loop:true,
		margin:15,
		dots : true,
		nav: false,
		autoplay : true,
		responsive:{
			0: {
				items:1
			},
			992:{
				items:2
			}
		}
	});


	$('#Carousel').carousel({
		interval: 5000
	})
	
	$('.carousel[data-type="multi"] .item').each(function(){
		var next = $(this).next();
		if (!next.length) {
		  next = $(this).siblings(':first');
		}
		next.children(':first-child').clone().appendTo($(this));
		
		for (var i=0;i<4;i++) {
		  next=next.next();
		  if (!next.length) {
			  next = $(this).siblings(':first');
			}
		  
		  next.children(':first-child').clone().appendTo($(this));
		}
	  });

	 
	  

})(jQuery);



$(document).ready(function(){

	

	$('#fbLink').on('click', function(){
		fbLogin();
	});

	window.fbAsyncInit = function() {
		// FB JavaScript SDK configuration and setup
		FB.init({
		  appId      : '482524448873586', // FB App ID
		  cookie     : true,  // enable cookies to allow the server to access the session
		  xfbml      : true,  // parse social plugins on this page
		  version    : 'v2.8' // use graph api version 2.8
		});
		
		// Check whether the user already logged in
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				//display user data
				getFbUserData();
			}
		});
	};
	
	// Load the JavaScript SDK asynchronously
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	// Facebook login with JavaScript SDK
	function fbLogin() {
		FB.login(function (response) {
			if (response.authResponse) {
				// Get and display the user profile data
				getFbUserData(response);
				
				
			} else {
				document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
			}
		}, {scope: 'email'});
	}
	
	// Fetch the user profile data from facebook
	function getFbUserData(){
		FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
		function (response) {
				$.post('fblogin/userData.php', {oauth_provider:'facebook',userData: JSON.stringify(response)}, function(data){ return true; });
			
			console.log(response)
				$('#hidme').show();
				$('#fbLink').hide();
		});


	}



    
	var clickEvent = false;
	$('#mcl').carousel({
		interval:   4000	
	}).on('click', '.list-group li', function() {
			clickEvent = true;
			$('.list-group li').removeClass('active');
			$(this).addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.list-group').children().length -1;
			var current = $('.list-group li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.list-group li').first().addClass('active');	
			}
		}
		clickEvent = false;
	});

	

})

$(window).load(function() {
    var boxheight = $('#mcl .carousel-inner').innerHeight();
    var itemlength = $('#mcl .item').length;
    var triggerheight = Math.round(boxheight/itemlength+1);
	$('#mcl .list-group-item').outerHeight(triggerheight);
});

$('[data-show="more"]').on('click', function(event) {
	event.preventDefault();
	   if ( $(this).attr('more-collapse') === 'false' ) {     
		$(this).attr('more-collapse', 'true'); 
		$(this).prev('.more-text').removeClass('hide');
		$(this).text('less');
	   }  else {
			$(this).text('more');
			$(this).attr('more-collapse', 'false'); 
			$(this).prev('.more-text').addClass('hide');
	   }  
   });   
   
   
   
   