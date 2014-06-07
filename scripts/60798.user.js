// ==UserScript==
// @name           Hide sponsored google ads
// @namespace      http://www.fiveminuteargument.com
// @description    Hide sponsored google ads
// @include        http://www.google.tld/search?*
// ==/UserScript==

remove("tads");
remove("rhsline");

function remove(id)
{
	var o = document.getElementById(id);
	if (o && o.style) o.style.display = 'none';
}