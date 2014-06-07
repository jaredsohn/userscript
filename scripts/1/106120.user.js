// ==UserScript==
// @name                Remove Google notification count
// @namespace	        http://lucifr.com/project/remove-google-notification-count/
// @description	        Remove Google notification count from Google pages except Google plus.
// @version 0.1
// @include		*
// @exclude		https://plus.google.com/*
// // ==/UserScript==

var elmDeleted = document.getElementById("gbg1");
elmDeleted.parentNode.removeChild(elmDeleted);
