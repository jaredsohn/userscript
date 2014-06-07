// ==UserScript==
// @name           GoDaddy Stop Annoying Me!
// @namespace      http://codr.us/category/Greasemonkey/GoDaddy-Stop-Annoying-Me
// @description    Removes the 'add domain search to firefox' box that pops down on godaddy.com
// @include        *.godaddy.com*
// ==/UserScript==

var box = document.getElementById("ffds");
box.parentNode.removeChild(box);