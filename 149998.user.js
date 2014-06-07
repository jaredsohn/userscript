// ==UserScript==
// @name        Webcomic Navigator
// @namespace   http://userscripts.org
// @description Let you browse through xkcd and explosm. 'n','v' for newest. Keys are: zxc, <?>, asd, <- ->
// @include        http://www.xkcd.com/*
// @include        http://xkcd.com/*
// @include        http://www.xkcd.org/*
// @include        http://xkcd.org/*
// @include        http://www.xkcd.net/*
// @include        http://xkcd.net/*
// @include        https://www.xkcd.com/*
// @include        https://xkcd.com/*
// @include        http://www.explosm.net/*
// @include        http://explosm.net/*
// @version     1.1
// @grant		 metadata
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Let you browse through xkcd, explosm
// Keys are: zxc, <?>, asd, <- ->
// n,v for newest.

// a function that loads jQuery and calls a callback function when jQuery has finished loading
// credit to Erik Vergobbi Vold & Tyler G. Hicks-Wright for:
// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {

var prevUrl = $('a[rel="prev"]').attr("href");
var nextUrl = $('a[rel="next"]').attr("href");
var randUrl;
var lastUrl;

if(window.location.href.search("xkcd.com")>=0) {
	randUrl="http://dynamic.xkcd.com/random/comic/";
	lastUrl="/";
}

if(window.location.href.search("explosm.net/comics/")>=0) {
	randUrl="/comics/random/";
	lastUrl="/comics/new/";
}
function onKeyUp(evt) {
  if (evt = evt ? evt : window.event ? event : null) {
    switch (evt.keyCode) {
      case 90: // z
      case 188: // <
      case 65: // a
		case 37: // left arrow
        document.location.href = prevUrl; break;
      case 88: // x
      case 191: // ?
		case 83: // s
        document.location.href = randUrl; break;
      case 67: // c
      case 190: // >
      case 68: // d
      case 39: // right arrow
        document.location.href = nextUrl; break;
      case 86: // v
      case 78: // n
      case 70: // f
	document.location.href = lastUrl; break;
    }
  }
}
if (document.addEventListener) {
    document.addEventListener("keyup", onKeyUp, false);
} else {
    document.onkeyup = onKeyUp;
}

}

// load jQuery and execute the main function
addJQuery(main);
