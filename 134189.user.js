// ==UserScript==
// @name  SRK Alert Fix
// @description Show SRK alerts and inbox notifications above obtrusive ads
// @match http://*.shoryuken.com/*
// @match http://*.shoryuken.tv/*
// ==/UserScript==

(function (exports, undefined) {
var menus = document.querySelectorAll(".Menu"),
    search = document.getElementById("searchBar");

if (search) {
	search.style.zIndex = 999999;
}

if (menus) {
	Array.prototype.forEach.call(menus, function (element) {
		element.style.zIndex = 1000000;
	});
}

})(this);
