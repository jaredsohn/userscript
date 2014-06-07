// ==UserScript==
// @name       Flickr Darkr
// @namespace  http://use.i.E.your.homepage/
// @version    0.1.2
// @description  enter something useful
// @match      http://www.flickr.com/photos/*
// @match      http://www.flickr.com/explore*
// @copyright  2012+, You
// @homepage       http://userscripts.org/scripts/show/158810
// @updateURL      https://userscripts.org/scripts/source/158810.meta.js
// @downloadURL    https://userscripts.org/scripts/source/158810.user.js
// @require        http://code.jquery.com/jquery-1.8.3.js
// ==/UserScript==

// Initiate custom CSS function
function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}
GM_addStyle(" \
.js #photo-list-holder.loaded {background: #060606;}\
#global-nav {position:absolute;}\
body {color: #888;background: #141414;}\
#global-nav {color: #999;background: #000;}\
#sidebar, #global-nav, #nav, #meta, #invites-and-comments {opacity:0;}\
#sidecar h4, #sidebar-contexts h4, h3 {color: #999;}\
.gn-link span, .gn-link:link span, .gn-link:visited span {text-shadow: 0 0 0;}\
.photo-context-menu {display:none !important;}\
#photo-drag-proxy {display:none;}\
#view-holder {background: #060606;}\
\ ");

$(window).bind('mousewheel', function () { $("#sidebar, #global-nav, #nav, #meta, #invites-and-comments").css(  "opacity","0.8"). css( "transition", "opacity .5s ease-in-out").css( "-moz-transition", "opacity .5s ease-in-out").css("-webkit-transition", "opacity .5s ease-in-out" );  } );
$(window).bind('DOMMouseScroll', function () { $("#sidebar, #global-nav, #nav, #meta, #invites-and-comments").css(  "opacity","0.8"). css( "transition", "opacity .5s ease-in-out").css( "-moz-transition", "opacity .5s ease-in-out").css("-webkit-transition", "opacity .5s ease-in-out" );  } );