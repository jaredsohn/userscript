// ==UserScript==
// @name           element14 Firefox Spellcheck Enabler
// @namespace      http://www.element14.com/
// @include        http://www.element14.com/community/*
// ==/UserScript==

window.addEventListener("load", function() {
	var a = document.getElementById('tinymce');
	if (a != null) a.setAttribute('spellcheck', true);
}, false);