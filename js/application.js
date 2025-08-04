/**
*	Application.js for Ask4 Myaccount 
*/

var myaccount = myaccount || {};

myaccount.toggleNav = function() {

	if ($("#mnav").hasClass('active')) {
		myaccount.hideNav();
 	}
 	else {
 		myaccount.showNav();
 	}
}

myaccount.showNav = function() {
	$("#mnav").addClass("active");
 	$('#blanker').height($(document).height()).addClass('fade show');
}

myaccount.hideNav = function() {

	var mnav = $("#mnav");

	if(mnav.hasClass('active')) {
		mnav.removeClass('active');
		$('#blanker').removeClass('fade');
		setTimeout(function() {
			// This isnt ideal, but its easier than making ontransitionend event work across browsers.
			$('#blanker').removeClass('show');
		},300); 
	}	
}


// ============== mobile language selection ===============
myaccount.toggleLang = function() {

	if ($("#mlang").hasClass('active')) {
		myaccount.hideLang();
 	}
 	else {
 		myaccount.showLang();
 	}
}

myaccount.showLang = function() {
	$("#mlang").addClass("active");
 	$('#blanker').height($(document).height()).addClass('fade show');
}

myaccount.hideLang = function() {

	var mnav = $("#mlang");

	if(mnav.hasClass('active')) {
		mnav.removeClass('active');
		$('#blanker').removeClass('fade');
		setTimeout(function() {
			// This isnt ideal, but its easier than making ontransitionend event work across browsers.
			$('#blanker').removeClass('show');
		},300); 
	}	
}

// ============== desktop nav selection ===============
myaccount.toggleDesktopNav = function() {

	if ($("#dnav").hasClass('active')) {
		myaccount.hideDesktopNav();
 	}
 	else {
 		myaccount.showDesktopNav();
 	}
}

myaccount.showDesktopNav = function() {
	$("#dnav").addClass("active");
 	$('#blanker').height($(document).height()).addClass('fade show');
	$(".menu-background").addClass("active");
}

myaccount.hideDesktopNav = function() {

	var dnav = $("#dnav");

	if(dnav.hasClass('active')) {
		dnav.removeClass('active');
		$(".menu-background").removeClass('active');
		$('#blanker').removeClass('fade');
		setTimeout(function() {
			// This isnt ideal, but its easier than making ontransitionend event work across browsers.
			$('#blanker').removeClass('show');
		},300); 
	}	
}

//alert(Modernizr.hasEvent("transitionend"));

$(function() {

 	/**
	*	HTML5 placeholder attribute polyfill - For browsers that dont support placeholder
	*/
 	$('input,textarea').placeholder();

 	/**
	*	Some common javascript features that are used throught the app
	* 	Simply add data-method="confirm" and data-message="are you sure?"
	* 	to an <a> or <input> tag to create a confirm dialog
	*/
 	/**
	*	Same for a print button
	*/

 	$('input[data-method="print"]').on('click', function() {
 		e.preventDefault();
		window.print();
	});

	/**
	*	Show Confirm Signout message for Touch Devices - relies on 
	* 	modernizr classes being set
	*/

 	// $('html.touch #link-signout').click(function() {
 	// 	return confirm("Sign Out?");
 	// });

	// ======== desktop nav ===========
	$('#desktop-menu').click(function(e) {
		myaccount.toggleDesktopNav();
		return false;
	});

	$("#desktop-menu a").click(function() {
		myaccount.toggleDesktopNav();
	});

	// ======== mobile nav ===========
 	$('#mnav-link').on('click', function() {
 		myaccount.toggleNav();
 		return false;
 	});

 	$("#mnav a").on('click', function() {
 		myaccount.toggleNav();
 	});

 	$("#mnav a").on('touchend', function(e) {
 		e.stopPropagation();
 	});
 	
 	// ========= mobile lang ===========
 	$('#mlang-link').on('click', function() {
 		myaccount.toggleLang();
 		return false;
 	});

 	$("#mlang a").on('click', function() {
 		myaccount.toggleLang();
 	});

 	$("#mlang a").on('touchend', function(e) {
 		e.stopPropagation();
 	});
 	
 	
 	$(document).on('click', function() {
 		myaccount.hideNav();
 		myaccount.hideLang();
		myaccount.hideDesktopNav();
 	});
 	

 	$(".blanker").on('touchend', function(e) {
 		e.preventDefault();
 	  	myaccount.hideNav();
 	  	myaccount.hideLang();
 	});

 
 	

});

//document.addEventListener("click", function(){ $(".mobile-nav").hide() }, true);

/**
*	Allow CSS :active styles to work in Mobile Webkit.
*/

//document.addEventListener("touchstart", function(){}, true);


/*
  * Normalized hide address bar for iOS & Android
  * (c) Scott Jehl, scottjehl.com
  * MIT License
*/
(function( win ){
	var doc = win.document;

	// If there's a hash, or addEventListener is undefined, stop here
	if( !location.hash && win.addEventListener ){

		//scroll to 1
		window.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},

			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );

		win.addEventListener( "load", function(){
			setTimeout(function(){
				//at load, if user hasn't scrolled more than 20 or so...
				if( getScrollTop() < 20 ){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		} );
	}
})( this );

