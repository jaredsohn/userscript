// ==UserScript==
// @name   Photobucket Download Link
// @namespace  google.ca
// @include*.photobucket.com*
// ==/UserScript==

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
	var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
	GM_JQ = document.createElement('script');

	GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	GM_JQ.type = 'text/javascript';
	GM_JQ.async = true;

	GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		main();
	}
}

// Execute code.
function main() {
	//var string = '<img id="fullImage" src="http://i225.photobucket.com/albums/dd313/xoxokelsie1994/imagejpeg_0_2.jpg" alt="imagejpeg_0_2.jpg " GALLERYIMG="no">';
	//var matches = /<img(?:.*?)src="(.*?)"/i.exec(string);
	//$('.imgEnv').append('<a href="' + matches[1] + '">[link]</a>');

	$('.thumbnail').each(function(index){
		var img = $(this).attr('pbthumburl');
		img = img.replace('th_', '');
		$(this).append('<a href="' + img + '">link</a>');
	});

}