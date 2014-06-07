// ==UserScript==
// @name                   Startupseeds Quote Fix
// @namespace        http://www.downit.co.il/susscript
// @description         Fix the Quote bug on FF3
// @include                http://www.startupseeds.com/Forums/NewMessage.aspx*
// @include                http://startupseeds.com/Forums/NewMessage.aspx*
// ==/UserScript==
//--------------------------/Created by Adir--------------------------
var allDivs, thisDiv;
allDivs = document.evaluate(
"//table[@class='Quote']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    var hr = document.createElement("br");
    thisDiv.parentNode.appendChild(hr);
    hr.focus();
}
//--------------------------/Created by Adir--------------------------