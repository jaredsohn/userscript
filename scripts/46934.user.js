// ==UserScript==
// @name           Change All Images
// @namespace      Aaron Russell
// @inclue        *
// ==/UserScript==

var pic = "http://www.makeuseof.com/wp-content/uploads/2008/12/greasemonkeylogo.gif";
var a = "-1";
while (a<document.images.length) {
a++;
document.images[a].src=pic;
}