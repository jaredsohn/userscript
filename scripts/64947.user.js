// ==UserScript==
// @name          Danbooru Wiki Restore
// @description   Restores the Danbooru Wiki sidebar back to the way it used to be.
// @namespace     http://userscripts.org/users/82984
// @include http://danbooru.donmai.us/post*tags*
// @include http://danbooru.donmai.us/post/index*
// @exclude http://danbooru.donmai.us/post/show/*
// ==/UserScript==

function fix_wiki(parent, wiki)
{
	wiki.style.cssText = "margin-top: 1em;"; // make visible
	
	var label = document.createElement("h5");
	label.innerHTML = "Wiki";
	
	wiki.insertBefore(label, wiki.firstChild);
}

function fix_sidebar()
{
	var wiki = document.getElementById('sidebar-wiki');

	var parent = document.evaluate("../h5", wiki, null, XPathResult.ANY_TYPE, null).iterateNext();
	
	if (!parent) return;

	if (parent.innerHTML.search(/Wiki/) != -1)
		fix_wiki(parent, wiki);
	
	parent.innerHTML = "Tags"; // Kill two stones with one bird =3
}

fix_sidebar();
