// ==UserScript==
// @name           GetRidOfFollowLinks
// @namespace      http://userscripts.org/users/411522
// @description    Gets rid of annoying floating follow boxes on webpages.
// ==/UserScript==

//getelementsbyclass function from http://www.dustindiaz.com/getelementsbyclass

function getElementsByClass(searchClass,node,tag) {

	var classElements = new Array();

	if ( node == null )

		node = document;

	if ( tag == null )

		tag = '*';

	var els = node.getElementsByTagName(tag);

	var elsLen = els.length;

	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");

	for (i = 0, j = 0; i < elsLen; i++) {

		if ( pattern.test(els[i].className) ) {

			classElements[j] = els[i];

			j++;

		}

	}

	return classElements;

}

var annoyances = getElementsByClass("loggedout-follow-typekit");

for(var i = 0; i < annoyances.length; i++)
{
	annoyances[i].setAttribute('style', "visibility:hidden;");

}

var annoyances = getElementsByClass("loggedout-follow-normal");

for(var i = 0; i < annoyances.length; i++)
{
	annoyances[i].setAttribute('style', "visibility:hidden;");

}