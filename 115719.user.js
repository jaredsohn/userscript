// ==UserScript==
// @name           Google Reader hide sidebar on load
// @include        http://www.google.com/reader/*
// ==/UserScript==

(function() {
	var evObj = document.createEvent("MouseEvents");
	evObj.initEvent('click', true, false);
	document.getElementById('chrome-lhn-toggle').dispatchEvent(evObj);
})();