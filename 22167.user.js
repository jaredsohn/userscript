// ==UserScript==
// @name           Dead Awaken - Add Transfer to Mob Members Page
// @namespace      http://www.deadawaken.com
// @include        http://www.deadawaken.com/game.php?sec=ho&scr=hocharinfo&listId=*
// ==/UserScript==

currentURL = document.URL;
var returnedValue = currentURL.substring(currentURL.indexOf("listId=")+7,currentURL.indexOf("&r="));
var a = document.createElement("a");
a.setAttribute( 'href', '/game.php?sec=tsf&scr=tsf&tsfId=' +returnedValue);
a.setAttribute( 'style', 'position:absolute;right:90px;top:282px');
a.innerHTML="<b>Transfer Stuff</b>";

function $xfirst(path,context)
{
return document.evaluate(path,context||document,
null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var sendElement = $xfirst("/html/body/div/div[@id='content']/table[1]/tbody/tr/td[3]");
sendElement.parentNode.appendChild(a);