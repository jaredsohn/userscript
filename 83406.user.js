// ==UserScript==
// @name           newscientist_full_article
// @namespace      http://www.comedicironpyrite.com/022509.invalid
// @description    Redirects applicable NewScientist articles to their single page format
// @include        http://www.newscientist.com/article/*
// @version        1.0 2009-02-25
// ==/UserScript==

/* Written 2009 by Gillelmus
 */

var myloc = window.location.href
var myparam = /full\=true/
var PageElementId = document.getElementById('artpaginator floatclear');
if (myloc.match(myparam)) 
{
//do nothing
}
else 
{
	if (PageElementId) {
		if (myloc.match(/\?/)) {
		window.location.href = window.location.href += '&sp=true';
		}
		else {
		window.location.href = window.location.href += '?sp=true';
		}
	}
}