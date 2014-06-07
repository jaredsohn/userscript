// ==UserScript==
// @name           Get rid of logout dialog box on FurAffinity
// @namespace      http://www.thornvalley.com
// @description    Get rid of logout dialog box on FurAffinity
// @include        http://www.furaffinity.net/*
// ==/UserScript==

var logout_link = document.getElementById('logout-link');
if(logout_link)
{
	var logout_link_clone = logout_link.cloneNode(true);
	logout_link_clone.id = 'logout-link-clone';
	logout_link.parentNode.insertBefore(logout_link_clone, logout_link);
	logout_link.parentNode.removeChild(logout_link);
} 