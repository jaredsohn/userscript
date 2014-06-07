// ==UserScript==
// @name                Post Hide
// @namespace	        http://mylifeisnerdy.co.cc
// @description	        script to hide a specific post
// @include		http*://www.facebook.com/bailey.falk.58*
// ==/UserScript==

var elmDeleted = document.getElementById("tl_unit_-5159289269662276802");
elmDeleted.parentNode.removeChild(elmDeleted);
