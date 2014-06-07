// ==UserScript==
// @name           Dead Awaken - Create Meat Grinder Link on Stamina Page
// @namespace      http://www.deadawaken.com
// @include        http://www.deadawaken.com/game.php?sec=home&scr=foodnitems&r=*
// ==/UserScript==

var a = document.createElement("a");
a.setAttribute( 'href', '/game.php?sec=home&scr=useitem&itemId=2&r=92');
a.setAttribute( 'style', 'position:absolute;right:318px;top:285px');
a.innerHTML="<b>* Use a Meat Grinder! *</b>";

function $xfirst(path,context)
{
return document.evaluate(path,context||document,
null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var sendElement = $xfirst("/html/body/div/div[@id='content']/form[2]/div/table/tbody/tr[2]/td[2]");
sendElement.parentNode.appendChild(a);