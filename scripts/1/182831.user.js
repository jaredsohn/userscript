// ==UserScript==
// @name Clien.net
// @description Easy navigate for clien.net
// @namespace http://userscripts.org/users/538647
// @author Steven Baek
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include http://www.clien.net/*
// @include http://clien.net/*
// @license GNU General Public License v3.0
// @version 0.0.1
// ==/UserScript==

//Changelog
//version 0.0.1 (beta) released on the 12th of November 2013
//console.log("start monkey script");
window.addEventListener("keydown", function (e) {keyListener(e)}, false);
function keyListener(event) {
 //DEBUG:
 console.log("keydown event occurred:" + event.keyCode);
   if ( event.keyCode == 37 ) {
      alert("left");
      $("#snb").hide();
   }
   else if ( event.keyCode == 39 ) {
      alert("right");
      $("#snb").show();
   }
}