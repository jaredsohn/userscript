// ==UserScript==
// @name        Google Dictionary
// @namespace   http://bo33b.dyndns.org
// @description See description at userscripts.org/scripts/show/142695 
// @version     2.0.1
// @include     https://www.google.com/webhp#q*li:1
// @grant       none
// ==/UserScript==

var v = setInterval(function() {
   if(!document.getElementsByClassName('vk_aru')[0]) {
       document.getElementsByClassName('vk_ard')[0].click();
       window.scrollTo(125,170);
   } else {
       clearInterval(v);
   }
},100);
