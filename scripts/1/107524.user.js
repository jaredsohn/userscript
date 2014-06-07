// ==UserScript==
// @name           Twitter Full Size Profile Image
// @namespace      http://userscripts.org/scripts/show/107524
// @description    When on a user profile on Twitter, and you click on their profile picture, this script will show the full-size image (This is a fix for a current bug with Twitter, where the profile picture file ending in "_bigger" is actually NOT the full size)
// @include        https://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
function getElementsByClass( searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	} 
	return el;
}
(function(doc){
    doc.body.addEventListener('DOMNodeInserted', function(e) {
        
	var tus_a = getElementsByClass('profile-picture',document,'a');
	
	for (i = 0; i < tus_a.length; i++) {
		var tus_href = tus_a[i].getAttribute("href");
		tus_href = tus_href.replace(/_bigger\./i, ".", tus_href);
		tus_a[i].setAttribute("href", tus_href);
	}

    }, true);
})(document);