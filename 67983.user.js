// ==UserScript==
// @name		  PureLink
// @namespace	  http://userscripts.org/users/130612
// @description   Removes any redirect links and use the destination url.
// @match      http://*/*
// ==/UserScript==

var links = document.getElementsByTagName("a");
var links = document.links;

for (var i = 0; i < links.length; i++) {
    var link = links[i];

    var linkString = link.toString();
    var indexOf = linkString.toLowerCase().indexOf('http://', 6);

    if (indexOf > 6) {
        link.href = linkString.substring(indexOf);
    }
}