// ==UserScript==
// @name           x360a Ad Remover
// @namespace      EDB_gm
// @include        *xbox360achievements.org*
// @include        *x360a.org*
// @exclude        Removes ads from x360a
// ==/UserScript==

var thisLink = document.getElementsByTagName("body")[0].innerHTML;
var workingLink = thisLink.substring(thisLink.indexOf("<!-- BEGIN GN Ad Tag"));
workingLink = workingLink.substring(workingLink.indexOf("-->")+3, workingLink.indexOf("<!-- END AD TAG -->"));
thisLink = thisLink.replace(workingLink, "");
document.getElementsByTagName("body")[0].innerHTML = thisLink;