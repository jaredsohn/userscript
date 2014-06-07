// ==UserScript==
// @name		NoFap Redtube
// @description	Nie ma fapowania Sebastian
// @include		http://*redtube.com*
// ==/UserScript==

(function () {
	var b = (document.getElementsByTagName("body")[0]);
	b.setAttribute('style', 'display:none!important');
	alert("Nie ma fapu");
})();