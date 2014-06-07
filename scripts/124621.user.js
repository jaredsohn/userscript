// ==UserScript==
// @name           Resumator Name in Title
// @namespace      http://ns.theresumator.com/greasemonkey
// @description    Changes The Resumator resume pages to puts the applicant's name in the page title
// @include        http://app.theresumator.com/app/resumes/profile/*
// ==/UserScript==

(function() {
	window.addEventListener('load', 
	function() {
		document.title = document.getElementById('title_center').textContent + ' - Resumator';
	});
})();