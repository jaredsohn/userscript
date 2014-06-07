// ==UserScript==
// @name           Gmail logouter
// @namespace      Bohocmasni
// @include        https://mail.google.com/*
// ==/UserScript==

document.body.setAttribute("onbeforeunload","document.location = 'http://www.google.com/accounts/Logout?continue=http://www.google.hu/'; alert('logout');");
