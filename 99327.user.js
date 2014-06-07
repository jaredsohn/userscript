// ==UserScript==
// @name           VBForums Cleanup
// @namespace      http://userscripts.org/users/309240
// @description    Cleanup vbforums.com thread display
// @include        http://www.vbforums.com/showthread.php?*
// ==/UserScript==
// window.addEventListener ("load", GSFunc, false);

function getElementByXpath(xP) {
var el = document.evaluate(xP, document, null, XPathResult.ANY_TYPE, null).iterateNext();
return el;
}

function GSFunc()
{
getElementByXpath("/html/body/table/tbody/tr/td/div").style.display = "none";
getElementByXpath("/html/body/center/span").style.display = "none";
getElementByXpath("/html/body/table/tbody/tr/td").style.display = "none";
document.body.removeChild(getElementByXpath("//*[@id=\"navitoolbarcontainer\"]").nextElementSibling);
}
GSFunc();