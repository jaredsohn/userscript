// ==UserScript==
// @name        Anti-Galf
// @namespace   Niuchan
// @description Elimina il tripcode di Galf, tramutandolo in un anon come tutti gli altri
// @include     http://niuchan.org/*
// @include     http://www.niuchan.org/*
// @version     v.1
// ==/UserScript==

var pts = document.getElementsByClassName("postertrip");
for(var i = 0, l = pts.length; i < l; i++) {
	var pt = pts[i];
	if (pt.innerHTML == '!0PGALF.zPM') {
	   pt.previousSibling.innerHTML = pt.previousSibling.innerHTML.replace('OPERATOR' , 'Anonimo');
       pt.parentNode.removeChild(pt);
	};
}