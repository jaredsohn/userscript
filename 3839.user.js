// ==UserScript==
// @name            Hide Google Calendar Navigation Bar
// @namespace       http://espion.just-size.jp/archives/05/136155838.html
// @description     The display of the navigation bar will be switched.
// @include         http://calendar.google.tld/*
// @include         https://calendar.google.tld/*
// @include         http://www.google.tld/calendar*
// @include         https://www.google.tld/calendar*
// @include         http://google.tld/calendar*
// @include         https://google.tld/calendar*
// ==/UserScript==
/*
$Id: HideGoogleCalendarNav.user.js 1133 2006-09-29 06:57:39Z takayama $

2006-09-28:
   - added @include.

2006-09-29:
   - change styles.
*/

(function() {

   {
      var $ = function(e) { return document.getElementById(e) };

      var disp;
      function toggle() {
         disp = !disp;
         $('nav').style.display = (disp) ? 'none' : '';

         unsafeWindow._ResizeCalFrame();
         // unsafeWindow._SetMode('custom');
      }

      var elm = document.createElement('div');
      elm.appendChild(document.createTextNode(' [ Toggle MenuBar ] '));
      elm.addEventListener('click', toggle, false);

      with(elm.style) {
         position = 'absolute';
         top      = '0px';
         left     = '400px';
         cursor   = 'pointer';
      }

      document.body.appendChild(elm);

      toggle();
   }

})();

