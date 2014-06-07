// ==UserScript==
// @name           c! Redux - Inline Preview Settings Toggle
// @namespace      #eh
// @description    Addon for c! Redux stylesheet (http://userstyles.org/styles/43181)
// @description    Adds inline preview toggle for inline preview script by treason (http://userscripts.org/scripts/show/88511)
// @include        http://cheggit.net/browsetorrents.php
// @include        http://cheggit.net/browsetorrents.php?*
// @include        http://cheggit.net/users.php?userid=*
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
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {

// Inline preview toggle
  $("#navbar").after("<div><a id='preview_t' href='#'>inline preview settings</a></div>");
  $("#preview_t").toggle( function(event){
          $("#torrentcontrols.menubox div:last-child").css("display", "block");
//          $("#preview_t").html("- inline preview settings");
          event.preventDefault();
       }, 
       function (event){
          $("#torrentcontrols.menubox div:last-child").css("display", "none");
//          $("#preview_t").html("+ inline preview settings");
          event.preventDefault();
  });

}