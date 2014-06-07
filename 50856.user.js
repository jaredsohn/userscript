// ==UserScript==
// @name           Reddit Keyboard Shortcuts (Gmail Style)
// @namespace      rks
// @description    Adds j/k/o navigation to the main reddit pages, highlighting the current link with a blue border
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @exclude        http://reddit.com/*/comments
// @exclude        http://*.reddit.com/*/comments
// @exclude        http://*.reddit.com/*/submit
// @exclude        http://*.reddit.com/*/comments/*
// @exclude        http://reddit.com/*/comments/*
// @version        1.0 - 6/5/2009
// ==/UserScript==

// Reddit uses JQuery, so let's use that
// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
	// window.setTimeout(GM_wait,100);
    }
    else {
	$ = unsafeWindow.jQuery;
	letsJQuery();
    }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    var myctr = 0; // which link we're pointed at
    //    var links = $("#siteTable .linkcompressed"); // all the links
    var links = $("#siteTable .entry"); // all the links

    // highlight the top link on the page
    if (links.length > 0) {
	links.eq(0).css("border", "2px dotted blue");
    }

    // scroll to the element if it is not in the visible viewport
    function scroll(elem) {
	var A = $(window).scrollTop(); // window top
	var B = A + $(window).height();// window bot
	var C = links.eq(myctr).offset().top; // elem top
	var D = C + links.eq(myctr).height(); // elem bot
	var P = 10; // padding

	if ((D+P) > B) { // if elem is below viewport
	    $(window).scrollTop( $(window).scrollTop() + ((D+P)-B) );
	} else if ((C-P) < A) { // if elem is above viewport
	    $(window).scrollTop( $(window).scrollTop() - (A-(C-P)) );
	}
	
	// if first or last link, scroll to the absolute
	// top or bottom
	if (myctr == links.length-1) {
	    $(window).scrollTop( $("body")[0].scrollHeight - $(window).height() );
	} else if (myctr == 0) {
	    $(window).scrollTop(0);
	}
    }
    
    // handle our keyboard shortcuts
    // j -> go down
    // k -> go up
    // o -> open link
    // O -> open link in new tab/window
    $(window).keypress(function(event){
	var code = event.which;
	switch (code) {
	case 74:
	case 106: // j -> down
	    myctr = (myctr >= links.length - 1) ? links.length -1 : myctr + 1;
	    break;
	case 75:
	case 107: // k -> up
	    myctr = (myctr <= 0) ? 0 : myctr -1;
	    break;
	case 79:  // o -> open link
	    //	    var href = $("#siteTable .linkcompressed a.title").eq(myctr).attr("href");
	    var href = $("#siteTable .entry a.title").eq(myctr).attr("href");
	    window.open(href);
	    break;
	case 111: // O aka Shift + o -> open link in new tab/window
	    var href = $("#siteTable .entry a.title").eq(myctr).attr("href");
	    window.location = href;
	    break;
	default:  // we're not interested
	    return;
	}

	// highlight the current link
	links.css("border", "none");
	links.eq(myctr).css("border", "2px dotted blue");

	// scroll if link is offscreen
	scroll(links.eq(myctr));
    });
}