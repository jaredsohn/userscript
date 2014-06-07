// ==UserScript==
// @name        phpBB Previous and Next Swapper
// @description swaps 'previous' and 'next' links in phpBB topic view
// @namespace   http://wagner.pp.ru/~slobin/firefox/
// @include     http://forum.freeforums.org/viewtopic.php?*
// ==/UserScript==

var NODE = XPathResult.FIRST_ORDERED_NODE_TYPE;

function getNode(query)
{
    var answer = document.evaluate(query, document, null, NODE, null);
    return answer.singleNodeValue;
}

var previous = getNode("//a[contains(@href, 'view=previous')]");
var next = getNode("//a[contains(@href, 'view=next')]");

if (previous && next) {
    var href = previous.href;
    var innerHTML = previous.innerHTML;
    previous.href = next.href;
    previous.innerHTML = next.innerHTML;
    next.href = href;
    next.innerHTML = innerHTML;
}
