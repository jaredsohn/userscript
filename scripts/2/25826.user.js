// ==UserScript==
// @name           HKEPC - unblock
// @namespace      thinkpandapanda
// @include        http://forum.hkepc.com/viewthread.php*
// ==/UserScript==

var links = document.getElementsByTagName("a");

function replaceLink(link, pattern, replaceBy) {

	var l = link.href;

	if (l.indexOf(pattern)!=-1) {
		link.href=link.href.replace(pattern,replaceBy);
		link.innerHtml = link.innerHtml(pattern,replaceBy);
	}

}

for(var i=0;i<links.length;i++) {

	replaceLink(links[i],"xn--6qq514b", "uwants");
	replaceLink(links[i],"xn--e02akp", "discuss");
	replaceLink(links[i],"xn--6qqu29h", "youtube");

}
