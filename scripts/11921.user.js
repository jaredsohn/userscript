// ==UserScript==
// @name          Bring_Back_Dystopia
// @description   Show LJ pages in Dystopia
// @version       0.1
// @author        rosefox@livejournal.com (Rose Fox)
// @include       http://www.livejournal.com/
// @include       http://www.livejournal.com/update.bml*
// @include       http://my.livejournal.com/
// @include       http://www.livejournal.com/portal/
// @include       http://*.livejournal.com/*?mode=reply*
// @include       http://*.livejournal.com/*.html*
// ==/UserScript==

var href = window.location.href;
if (!href.match(/dystopia/i)){
   if (!href.match(/\#/i)){
      if (href.match(/\?/i)) {
         window.location.href += '&usescheme=dystopia';
         } else {
         window.location.href += '?usescheme=dystopia';
         };
      };
   };