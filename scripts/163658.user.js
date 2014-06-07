// ==UserScript==
// @name        RT Custom actions
// @namespace   Derry
// @include     http://rt.easter-eggs.org/demos/stable/Ticket/Display.html?id=*
// @version     1
// ==/UserScript==

var tt = document.getElementsByName("id").item(0).value;

var a1 = document.createElement("a");
a1.id = "newID1";
a1.className = "menu-item";
a1.href = "Display.html?id=" + tt + "&Status=rejected&Owner=44";
var linkText = document.createTextNode("QuickReject");
a1.appendChild(linkText);

var newLink1 = document.createElement("li");
newLink1.id = "li-custom1";
newLink1.appendChild(a1);

var pageBasic = document.getElementById("li-page-basics");

var placeHolder = document.getElementById("page-menu");
placeHolder.appendChild(newLink1);
placeHolder.insertBefore(newLink1, pageBasic);
