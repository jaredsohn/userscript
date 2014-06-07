// ==UserScript==
// @name           Index UG
// @namespace      detunized.net
// @description    Index UG
// @include        http://leprosorium.ru/
// ==/UserScript==


var sum = 0;
var iterator = document.evaluate('/html/body/div/div/div[2]/div[2]/div[2]/div/div/div/div/div[2]/div[2]/div/span/em', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
try {
    var thisNode = iterator.iterateNext();
    while (thisNode) {
        sum += parseInt(thisNode.textContent);
        thisNode = iterator.iterateNext();
    }
} catch (e) {
}

document.title += " [UG: " + (sum / 40 - 100) + "]";