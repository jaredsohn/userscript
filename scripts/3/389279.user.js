// ==UserScript==
// @name        Aj Di równe i kolorowe
// @namespace   http://userscripts.org/users/587687
// @include     http://www.karachan.org/b/res/*
// @include     http://karachan.org/b/res/*
// @version     1
// @grant       none
// ==/UserScript==

uids = document.getElementsByClassName("posteruid");

function toColor(num) {
    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = ( (num & 0xFF000000) >>> 24 ) / 255 ;
    return "rgba(" + [r, g, b, a].join(",") + ")";
}

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
	
    return hash;
} 

function hashString(c, acc) {
	c = ((c << 5) - c) + acc.charCodeAt(0);
	return c&c;
}

for (var i = 0; i < uids.length; i++) {
	var id = uids[i].innerHTML.substr(5, 8);
	var hash = hashCode(id);
	hash = Math.abs(hash);
	uids[i].style.backgroundColor = toColor(hash);
}