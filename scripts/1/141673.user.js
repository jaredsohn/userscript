// ==UserScript==
// @name        Twitle
// @namespace   https://github.com/iSnow
// @description Mute the browers window title changes on Twitter that show the number of new tweets.
// @include     http://twitter.com/*
// @include     http://*.twitter.com/*
// @include     https://twitter.com/*
// @include     https://*.twitter.com/*
// @version     1
// ==/UserScript==

var title = document.getElementsByTagName("title")[0];
if (title !== undefined) { 
   setTimeout(function(){
		title.addEventListener("DOMSubtreeModified", function () { 
			var winTitle = document.title.replace(/\(.+?\)/g,""); ;
  			if (document.title != winTitle) {
  				document.title = winTitle;
  			}
  			return false;
  		}, false, true);
		document.title = "Twitle [Greasemonkey] installed";	
  	},1000);
}