// ==UserScript==
// @name           HC Custom
// @namespace      Napzter
// @description    Custom additions for Hyperactivity Community.
// @include        http://hyperactivitycommunity.com/*
// @include        http://www.hyperactivitycommunity.com/*
// ==/UserScript==

var newText = document.createElement('div');
newText.innerHTML = '<div><input type="text" name="type" value="" /></div>';

var allElements, thisElement;
allElements = document.getElementsByTagName('select');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    thisElement.parentNode.insertBefore(newText, thisElement.nextSibling);
    thisElement.parentNode.removeChild(thisElement);
}

