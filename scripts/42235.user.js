// ==UserScript==
// @name           Nettby Status
// @description    Uendelig lengde på statusmelding.
// @include        *nettby.no*

// ==/UserScript==
var limited;
limited=document.evaluate(
"//input[@maxlength]",
document, 
null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0; i<limited.snapshotLength; i++)
limited.snapshotItem(i).removeAttribute("maxlength");
