// ==UserScript==
// @name           Comcast TV Listing Fixer
// @namespace      cbmarkwardt.com
// @description    Makes Comcast cable television listings a little more easy to read (now displayed as "Fancast").  The listing grid is resized to your window size, so that you can see all of it without messing with two different scroll bars at the same time.  When you first load the page, the window is scrolled to a position where the listing grid completely fills the page, so you should never need to adjust the window scroller, only the listing scroller.  If you click on any program, the details appear in a floating box in the upper right hand corner of the screen, rather than occupying the full right hand half of the screen.
//
// @include        http://www.comcast.net/tv/tv-listings/*
// @include        http://www.fancast.com/*-listings/*
// ==/UserScript==


var ht = '550px';  // Old hard-coded height
var wht = window.innerHeight;
var wmargin = 125; // Margin needed for non-grid portions of IFRAME
var main = document.getElementById('fancastHeader');
var first = 1;

function comcast_height() {

    // Reset internal grid listing to window height minus margin
    var el = document.getElementById('listing-div');
    if (el && el.style) {
	el.style['width']      = '100%';
	el.style['height']     = (wht-wmargin) + 'px';
    }

    // Document height of IFRAME
    var el = document.getElementById('comcastnet');
    if (el && el.style) {
	el.style['height']     = wht + 'px';
    }


    // Document height of IFRAME
    if (main) {
	main['height'] = wht + 'px';
	main.style['height'] = wht + 'px';
    }

    // Have the detail view be a small floating sub-window instead of
    // occupying the entire right half of the screen
    el = document.getElementById('tvlistings-searchResults-details-module');
    if (el && first == 1) {
	first = 0;
	if (el.style) {
	    el.style['position'] = 'fixed';
	    el.style['height']   = '';
	    el.style['top']      = (wmargin+25)+'px';
	    el.style['right']    = '20px';
	    el.style['bottom']   = 'auto';
	}

	var els = el.getElementsByTagName('DIV');
	for (var i = 0; i < els.length; i++) {
	    if (els[i].className == 'wrapper' && els[i].style) {
		els[i].style['height'] = 'auto';
	    }
	}
    }

}

function scroll_to_content() {
    if (main) {
	window.scrollTo(0, main.offsetTop);
    }
}


comcast_height();

scroll_to_content();

document.addEventListener('DOMSubtreeModified', comcast_height, false);


