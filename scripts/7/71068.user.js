// ==UserScript==
// @name           Reddit Hide Comments
// @description    Automatically hides all child comments except for the initial responses to OP. Individual links to expand comments for a single response as well as for all responses.
// @include        http://www.reddit.com/*/comments/*
// @include        http://www.reddit.com/comments/*
// @include        http://www.reddit.com/*/search*
// ==/UserScript==

var linkColor = "green";	// other options: blue, red, "" for default color, #000000, etc...

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
		t.find('ul.buttons').append($('<li></li>').append($('<a href="#"><font color="' + linkColor + '">toggle all children</font></a>').click(
			function(e) {
				$('div.commentarea > div.sitetable > div.thing > div.child').each(
				function() {
					$(this).children('div').toggle();
				});
				e.preventDefault();
			})))
	});
	
	$('div.commentarea > div.sitetable > div.thing > div.child').each(
	function() {
		var t=$(this);
		if (t.children().length > 0) 
			t.prev().find('ul.buttons').append($('<li></li>').append($('<a href="#" class="togglechildren"><font color="' + linkColor + '">toggle children</font></a>').click(
			function(e){
				t.children('div').toggle();
				e.preventDefault();
			})))
	}).children('div').toggle()();
}