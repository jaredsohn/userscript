// ==UserScript==
// @name           wiki.archlinux.pl
// @namespace      lobotomius.at.gmail.com
// @include        http://wiki.archlinux.pl/*
// ==/UserScript==


GM_addStyle ( "a:visited, #bodyContent a.external:visited { color: #07b } "


)

function sn(xp, ct) {
	var r = document.evaluate(xp, ct, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	if(r) 
		return r.singleNodeValue
	else 
		return null;
}


var r = sn('.//a[@id="logo"]', document); if(r) r.setAttribute('href', 'http://wiki.archlinux.pl');



//