// ==UserScript==
// @name        Hobbyking Dailybox Remover
// @namespace   com.figge.crew.hobbyking
// @description Removes the daily box with daily video player from hobby king webpage
// @include     http://hobbyking.com/hobbyking/store/*
// @include     http://www.hobbyking.com/hobbyking/store/*
// @version     0.1
// ==/UserScript==
(function() {
  // The following "if" is not really necessary but with it this script will work for Opera too
	if (!document.location.href.match(/hobbyking\.com\/hobbyking\/store\//))
		return;
	var myFunc = (function () {
    $('#daily').remove();
  }).toString();
  var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
})();