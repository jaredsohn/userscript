// ==UserScript==
// @name           HideRememberTheMilkLogo
// @namespace      http://www.bigbluesea.org/monkey
// @description    Hide the too-cartoony logo of the wonderful RememberTheMilk list manager.
// @include        http://www.rememberthemilk.com/*
// ==/UserScript==


var logo = document.getElementById('appheaderlogo');
if (logo) {
	logo.style.display = "none";
}
