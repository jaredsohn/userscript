// ==UserScript==
// @name           anonib image fixer
// @namespace      anonib
// @description    no more passnimage.php on anonib images
// @include        http://www.anonib.com/*
// ==/UserScript==


var allElements, thisElement;
allElements = document.getElementsByTagName('a');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    thisElement.href = thisElement.href.replace('http://www.anonib.com/passnimage.php?imagePassn=','');
}