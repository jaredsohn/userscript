// ==UserScript==
// @name           Forum Breadcrumbs
// @namespace      saintjimmy
// @description    Adds Forum Breadcrumbs link to the bottom of the page
// @include        http://forums.myspace.com/*
// ==/UserScript==

(function appendBreadcrumbs() {
	var crumbspan = document.createElement('span');
	crumbspan.innerHTML = document.getElementById('ctl00_ctl00_ctl00_cpMain_cpMain_CommonTop_BreadCrumb1').innerHTML;
	crumbspan.className = 'breadCrumb';
	crumbspan.id = 'ctl00_ctl00_ctl00_cpMain_cpMain_CommonTop_BreadCrumb2';

	document.getElementById('ctl00_ctl00_ctl00_cpMain_cpMain_bcr_PostListSorter1_PostListSorter1').parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(crumbspan);
})();