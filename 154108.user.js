// ==UserScript==
// @name        decline all facebook events
// @namespace   http://www.facebook.com
// @include     https://www.facebook.com/events/list
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js
// @version     1
// ==/UserScript==
$(window).load(function() {
  $('body').prepend('<a class="deny" style="display:table;position:fixed;bottom:0;left:0;z-index:1000;"><h1>DECLINE ALL</h1></a>');
  $('.deny').on('click', function() {
	$('.uiButtonText:contains(Decline)').trigger('click');
  });
});