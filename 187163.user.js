// ==UserScript==
// @name        Github Project Description in Page Title
// @namespace   http://userscripts.org/scripts/show/187163
// @description Put the description of a Github project in page title
// @include     https://github.com/*
// @version     0.1
// @grant       none
// ==/UserScript==
(function() {
	var project_description = document.getElementsByClassName('repository-description');
	if (project_description.length > 0) {
		project_description = project_description[0].textContent + '';
		if (project_description != '') {
			document.title = document.title + ' - ' + project_description;
		}
	}
})();