// ==UserScript==
// @name           Reddit Show Images Inline
// @description    Toggles showing linked images in comments inline, also shows submitted link inline if it is an image.
// @include        http://www.reddit.com/*/comments/*
// @include        http://www.reddit.com/comments/*
// @include        http://www.reddit.com/*/search*
// ==/UserScript==

var linkColor = "blue";	// other options: blue, red, "" for default color, #000000, etc...

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
	$('div.content > div.sitetable > div.thing > div.entry').each(
	function() {
		var t=$(this);
		t.find('ul.buttons').append($('<li></li>').append($('<a href="#"><font color="' + linkColor + '">show images inline</font></a>').click(
			function(e) {
			
				// Add/toggle images for all links to images.
				$('.md').find('a').each(addToggleImage);
				
				// Add/toggle image entry url -- in a different location.
				$('p.title').find('a').each(addToggleImage);
				e.preventDefault();
			})))
	});
}

function addToggleImage() {
	var a = $(this);
	var href = a.attr('href');
	if (a.hasClass('inlineImage')) {
		a.children('div.inlineImage').toggle();
	}
	else if(isImage(href)) {
		a.append($("<div class='inlineImage' style='display:block;max-width:780px'></div>").append($("<img style='display:block;max-width:780px;' src='" + href + "'/>")));
		a.addClass('inlineImage');
	}
}

function isImage(href) {
	return href && (href.indexOf('png') != -1 || href.indexOf('jpg') != -1 || href.indexOf('jpeg') != -1 || href.indexOf('gif') != -1);
}