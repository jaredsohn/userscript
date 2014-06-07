// ==UserScript==
// @name           New Walla Talkback Remover
// @namespace      http://*.walla.co.il/*
// @description    New Walla design talkback remover
// @include        http://*.walla.co.il/*
// @version        0.12
// Walla Talkbacks Remover
// ==/UserScript==

var currentElement, allElements = document.evaluate("//div[@id = 'talkbackList']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < allElements.snapshotLength; ++i) 
{
   currentElement = allElements.snapshotItem(i);
   currentElement.parentNode.removeChild(currentElement);
}