// ==UserScript==
// @name		BPL Navigator
// @namespace		glowyzoey
// @description 	Use arrow keys on your keyboard to move through library catalog.
// @description 	Right arrow for next page of listings, left for previous page.
// @description 	This script is based on Googlecuts by Tom Dean
// @include		http://ipac.city.burnaby.bc.ca/ipac20/ipac.jsp*
// ==/UserScript==

(function() {

var par = parseInt(getQueryParam("page"))+1;
var lar = parseInt(getQueryParam("page"))-1;
function getQueryParam(param) {
	var result =  window.location.search.match(
	new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)"));    	
	return result ? result[3] : 1;
	}

	reb = unescape(location.search);
	str = /&menu=search.+/;
	goa = reb.replace(str,'&menu=search&page=' + par);
	loa = reb.replace(str,'&menu=search&page=' + lar);
	_go = function() { window.location.href = "http://ipac.city.burnaby.bc.ca/ipac20/ipac.jsp" + goa};
	_ba = function() { window.location.href = "http://ipac.city.burnaby.bc.ca/ipac20/ipac.jsp" + loa};
	_cl = function(e) { if (e.keyCode in _mp) _mp[e.keyCode](); }
	_mp = { 39: _go, 92: _go, 37: _ba, 91: _ba }
	document.addEventListener('keypress', _cl, true);
	})();