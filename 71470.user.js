// ==UserScript==
// @name           Keyboard shortcut for Google's 'did you mean'
// @namespace      eh
// @include        http://www.google.co.uk/*
// @include        http://www.google.com/*
// ==/UserScript==

var allAs, thisA;
allAs = document.evaluate(
    "//a[@class='spell']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
document.addEventListener('keypress', function(event) {

	if( event.which==0144 && event.target.type != "text" && event.target.type != "textarea") {
    thisA = allAs.snapshotItem(0);
	link=thisA.getAttribute('href');
	link="http://www.google.co.uk" + link;
	window.location.href = link;
	}
}, true);