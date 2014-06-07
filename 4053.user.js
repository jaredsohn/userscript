// ==UserScript==
// @name            Google Calendar Wheel Viewer
// @namespace       http://espion.just-size.jp/archives/05/136155838.html
// @description     Moves your calendar with the mousewheel.
// @include         http://calendar.google.tld/*
// @include         https://calendar.google.tld/*
// @include         http://www.google.tld/calendar*
// @include         https://www.google.tld/calendar*
// @include         http://google.tld/calendar*
// @include         https://google.tld/calendar*
// ==/UserScript==

/*
$Id: GoogleCalendarWheelViewer.user.js 1434 2008-04-17 09:48:19Z takayama $

2008-04-17:
   - avoid security problem.

2006-09-28:
   - added @include. (thx, cwernham)

2006-09-29:
   - added new event to the date-picker (thx, Nick Howell)
*/

(function() {

   {
      var $ = unsafeWindow._$;

      $('maincell').addEventListener(
         "DOMMouseScroll",
         function(e) {
            if($("mainbody").style.display == 'none') return false;
            if($("gridcontainercell")) return false;

            unsafeWindow._EH_nav((e.detail < 0) ? -1 : 1);
            /*
            var x = {};
            x.target  = e.target;
            x.keyCode = (e.detail < 0) ? 80 : 78;
            unsafeWindow._calKeyDown(x);
            */
         },
         false
      );

      $('dp_0').addEventListener(
         "DOMMouseScroll",
         function(e) {
            var c = (e.detail < 0) ? 'dp_0_mhl' : 'dp_0_mhr';
            unsafeWindow._$(c).onmousedown();
         },
         false
      );
   }

})();

