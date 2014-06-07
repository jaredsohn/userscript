// ==UserScript==
// @name           Conquer Club - Hide Spoils
// @namespace      namespace
// @description    Hides spoils in conquer club
// @include        http*://*.conquerclub.com/game.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function() {
	var timeout = null;
	var delay = 500;

	$('#cards').hide().parent().mouseenter(function(){
	  timeout = setTimeout(function() {
		timeout = null;
		$('#cards').fadeIn("slow");
	  }, delay);
	}).mouseleave(function(){
	  if (timeout == null) {
		$('#cards').fadeOut("fast");
	  }
	  else {
		clearTimeout(timeout);
	  }
	});
});
