// ==UserScript==
// @name           Del.icio.us AutoTag 2
// @namespace      http://culich.net
// @description    Inserts popular and recommended tags automatically into the tag field. This script works with the summer 2008 updates to del.icio.us.
// @include        http://del.icio.us/*
// @include        http://delicious.com/*
// ==/UserScript==

var tags = document.evaluate("//li[@id='save-pop-tags']/*//a|//li[@id='save-reco-tags']/*//a", document, null, XPathResult.ANY_TYPE, null );
var form_tags = document.getElementById('tags').value;

var tag = null;
while (tag = tags.iterateNext()) {
    var string = tag.firstChild.textContent;
    if (document.getElementById('tags').value.toLowerCase().search("\\b" + string.toLowerCase() + "\\b") == -1) {
	document.getElementById('tags').value += string + " ";
    }
}

document.getElementById('tags').focus();
