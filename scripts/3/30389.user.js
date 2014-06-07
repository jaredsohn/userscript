// ==UserScript==
// @name	    Flickriver groups
// @namespace	    http://flickr.com/photos/marcinkowalski/
// @include	    http://www.flickr.com/groups/*
// @include	    http://flickr.com/groups/*
// @description	    Adds 'Most interresting' flickriver.com link to flickr group pages
// @author	    Marcin Kowalski
// @version	    1
// ==/UserScript==

inviteLink= /\/groups\/([^/]+)\/pool\//;

hrefs=document.getElementsByTagName("a");

for (var i=0; i<hrefs.length; i++) {
    link=hrefs[i].getAttribute("href");
    match=inviteLink.exec(link);
    if (match) {
	separator=hrefs[i].nextSibling;
	do {
	    if (separator == null) {
		break;
	    }
	    if (separator.tagName=='IMG') {
		separator=separator.cloneNode(true);
		break;
	    }
	    separator=separator.nextSibling;
	}
	while(true);
	if (separator == null) {
	    break;
	}
	newLink = document.createElement("a");
	newLink.innerHTML = "Most&nbsp;interresting";
	newLink.setAttribute("href","http://flickriver.com/groups/"+match[1]+"/pool/interesting/");
	hrefs[i].parentNode.insertBefore(separator, null);
	hrefs[i].parentNode.insertBefore(document.createTextNode(' '), null);
	hrefs[i].parentNode.insertBefore(newLink, null);
	break;
    }
}

