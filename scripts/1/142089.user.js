// ==UserScript==
// @name        AOL Mail ad remover
// @description Removes the ads in Aol Mail.
// @include     http://mail.aol.com/*
// @version     1.0
// ==/UserScript==

// Change width of sidepanel, main area expands automatically.
var sidepanel = document.getElementById("SidePanel").style.width = 0;
