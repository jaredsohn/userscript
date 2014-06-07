// ==UserScript==
// @name            Thank You, Phineas, You May Go
// @namespace       http://www.gibberish.com/
// @description     Hides the Trends and News section on Brizzly.com
// @include         http://www.brizzly.com/*
// @include         http://brizzly.com/*
// @include         https://www.brizzly.com/*
// @include         https://brizzly.com/*
// ==/UserScript==


var killhim = setInterval(function(){
  if (document.getElementsByClassName("trend-header").length) {
	document.getElementsByClassName("trends")[0].style.display = "none";
	clearInterval(killhim);
  }
}, 250);