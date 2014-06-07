// ==UserScript==
// @name		FaceClean
// @creator		Michael D. Risser
// @namespace	http://userscripts.org/users/mdrisser
// @include		http://*.facebook.com/*
// @include		https://*.facebook.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

//|-- BEGIN USER CONFIGURATION -->
$delay = 2000;		// Time delay before cleaning Facebook; 1000 = 1 sec.

// Change each of the following:
// true = show
// false = hide
$lists = true;			// FRIENDS nav
$groups = true;			// GROUPS nav
$apps = false;			// APPS nav
$pages = false;			// PAGES nav
$developer = false;		// DELEVLOPER nav
$interests = true;		// INTERESTS nav
$pokes = false;			// Pokes
$rightColumn = false;	// The right column
//<-- END USER CONFIGURATION --|

function FaceClean() {
	if(!$lists) {
		$('#listsNav').hide();
	}
	
	if(!$groups) {
		$('#groupsNav').hide();
	}
	
	if(!$apps) {
		$('#appsNav').hide();
	}
	
	if(!$pages) {
		$('#pagesNav').hide();
	}
	
	if(!$developer) {
		$('#developerNav').hide();
	}
	
	if(!$interests) {
		$('#interestsNav').hide();
	}
	
	if(!$pokes) {
		$('img').each(function() {
			if($(this).attr('alt') == 'Pokes') {
				$(this).parent().hide();
			}
		});
	}
	
	if(!$rightColumn) {
		$('#u_0_1h').hide();
	}
}

jQuery(function($) {
	if($delay > 0) {
		window.setTimeout(FaceClean, $delay);
	} else {
		FaceClean();
	}
});