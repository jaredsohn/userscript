// ==UserScript==
// @name        long-click
// @namespace   grill
// @include     *
// @copyright   2012, Gabriel Grill (https://github.com/grill/long-click)
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @description This script opens a link in a new tab in the background when it's clicked for a second.
// @version     2
// ==/UserScript==
$(document).ready(function() {
var longclick = false;
var cancel = false;

$("a").mousedown(function(e) {
   if(e.which == 1) {
      longclick = true;

      setTimeout(function() {
         if(longclick) {
		    longclick = false;
		    $(e.target).unbind('mousemove');
		    GM_openInTab($(e.target).prop("href"));
		    cancel = true;
         }
      }, 500);

      $(e.target).bind('click', function(event) {
         if(cancel) {
	        cancel = false;
		    event.preventDefault();
	     } else {
            longclick = false;
	     }
	     $(e.target).unbind('click');
      });

      $(e.target).bind('mouseleave', function() {
         longclick = false;
	     $(e.target).unbind('mouseleave');
      });
   }
});

});