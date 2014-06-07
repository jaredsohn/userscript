// ==UserScript==
// @name           TAU Student Messages
// @namespace      http://userscripts.org/users/81717
// @include        http://graddsp.tau.ac.il/msgclist.asp*
// ==/UserScript==
var allDivs, thisDiv;
allDivs = document.evaluate("//div[@onClick!='']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
thisDiv = allDivs.snapshotItem(i);
// do something with thisDiv
link = "messDlg.asp?messIdx=" + thisDiv.getAttribute("onClick").substr(12,1) + "&show_mode=0";
newElement = document.createElement('div');
newElement.innerHTML = "<a href='" + link + "'>" +  thisDiv.innerHTML + "</a>";
thisDiv.parentNode.insertBefore(newElement, thisDiv);
thisDiv.parentNode.removeChild(thisDiv);
//alert(thisDiv.innerHTML);
}