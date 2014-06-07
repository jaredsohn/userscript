// ==UserScript==
// @name			Last.fm Header Quick Links
// @namespace		http://straylight.cz/userscripts/
// @description		Add various profile links on the right side of the header.
// @version			0.8
// @date			2009-09-12
// @include			http://*.last.fm/*
// @include			http://*.lastfm.tld/*
// ==/UserScript==
//
// Changelog
// 0.8 (2009-09-12) * New Last.fm header - much simplified code
//					* Removed obsolete function addHighlight
// 0.6 (2009-06-08) Update for changes at Last.fm website
// 0.5 (2008-07-30) Minor fix - fixed domains inclusion, should be international now
// 0.4 (2008-07-23) Fix for language selector; colors disabled by default
// 0.3 (2008-07-20) Very minor update: Added CSS for links highlight
// 0.2 (2008-07-20) Update of (never published) script for old Last.fm

(function ()
{
/***** Get username from top-right badge	*********/
	var badge = document.getElementById('idBadgerUser');
	if(!badge)
		return;
	var user = badge.textContent;

/***** Get reference objects	*********************/
	var parent = document.getElementById('headerLinks');
	var firstChild = document.getElementById('headerLangToggle');

/***** Make and format list of links 	*************/
	var links = new Array
	(
		'<a href="/user/'+user+'/groups">Groups</a>',
		'<a href="/user/'+user+'/friends">Friends</a>',
		'<a href="/user/'+user+'/tags">Tags</a>'
	);

	var wrap = document.createElement('span');
	wrap.innerHTML = links.join(' | ') + ' | ';

/***** Append to the menu just next to the Language switcher */
	parent.insertBefore(wrap, firstChild);
})();

