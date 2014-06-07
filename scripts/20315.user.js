// ==UserScript==
// @name          Auto-netid Bluestem
// @namespace     http://www-dave.cs.uiuc.edu/greasemonkey/
// @description   Autofills in my netid
// @include       https://www-s4.uiuc.edu/bluestem/login.cgi*
// @include       https://www-s5.uiuc.edu/bluestem/login.cgi*
// @include       https://www-s6.uiuc.edu/bluestem/login.cgi*
// ==/UserScript==
// version 3 - 9 Jan 2007 - new bluestem screens

var NetID = "mussulma";

form = document.forms.namedItem("userid");

if (!form) {
  form = document.forms.namedItem("id");
}

input = form.elements.namedItem("UserID");

if (input) {

  input.setAttribute("value", NetID);
  input.select()
}

