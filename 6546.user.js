// ==UserScript==
// @name           30Boxes Scroller
// @namespace      http://menno.b10m.net/greasemonkey
// @description    Navigate your 30boxes.com calendar with your scrollwheel
// @include        http://*30boxes.com/*
// ==/UserScript==

(function() {
	window.addEventListener("DOMMouseScroll", scroll, false);
})();

function scroll(e) {
   var mvCal = unsafeWindow.moveCalendar;
   var i = (e.detail < 0) ? -60 : 60;

   if(mvCal) {
      mvCal(i*60*24*7*1000);
   }
}
