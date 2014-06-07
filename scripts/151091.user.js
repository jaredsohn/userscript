// ==UserScript==
// @name        Youtube verify age bypass
// @namespace   LuK1337
// @include     http://www.youtube.com/watch*
// @include     https://www.youtube.com/watch*
// @version     0.4
// ==/UserScript==

var doc = document.getElementsByTagName('meta'), i2 = 0;

var span_unav = document.evaluate("//*[@id=\"unavailable-message\"]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var div_unav = document.evaluate("//*[@id=\"player-unavailable\"]/div", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var div_content = document.evaluate("//*[@id=\"player-unavailable\"]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if(span_unav != null)
{
    div_unav.style.display = "none";
    div_content.innerHTML = "<iframe src='" + doc[9].getAttribute('content') + "' height='390' width='640' frameborder='0' allowfullscreen></iframe>";
}