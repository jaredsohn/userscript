// ==UserScript==
// @name          Polite Listeningroom
// @namespace     http://listeningroom.fettig.net
// @include       http://listeningroom.fettig.net/room/*
// @match         http://listeningroom.fettig.net/room/*
// ==/UserScript==



var p = unsafeWindow;



if(window.navigator.vendor.match(/Google/)) {
	var div = document.createElement("div");
	div.setAttribute("onclick", "return window;");
	p = div.onclick();
};

var $ = p.$;

$(function(){
  $('.remove').live('load, ready, mouseover', function(e) { $(this).remove(); });
});