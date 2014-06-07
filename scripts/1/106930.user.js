// ==UserScript==
// @name Remove Header Banner
// @namespace http://k11i.biz/
// @include http://www.ustream.tv/*
// ==/UserScript==

(
    function() {
	var elem = document.getElementById("PopupLeaderBoard");
	elem.parentNode.style.display = "none";
    }
)();
