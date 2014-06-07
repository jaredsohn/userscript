// ==UserScript==
// @name          Hello World
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Beispielscript, das eine Meldung mit dem Inhalt Hello World ausgibt.
// @include       forum.szene1.at/chat
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==


var allElements, thisElement;
allElements = document.evaluate(
    '//*[@title]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    switch (thisElement.nodeName.toUpperCase()) {
        case 'A':
            // this is a link, do something
			alert(thisElement.nodeName.toUpperCase())
            break;
        case 'IMG':
            // this is an image, do something else
            break;
        default:
            // do something with other kinds of HTML elements
    }
}