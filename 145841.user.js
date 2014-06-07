// ==UserScript==
// @name          Invaders no fixed bg
// @namespace     http://localhost
// @description   Removed fixed bg
// @include       http://www.invadersgaming.org/forum/*
// @version		1
// ==/UserScript==

document.getElementsByTagName('html')[0].style.backgroundAttachment = "scroll";

return;