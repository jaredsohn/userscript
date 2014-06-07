// ==UserScript==
// @name           WotDKP
// @namespace      aetho
// @description    Add WotDKP to Quicklinks
// @include        http://www.aetho.com/*
// ==/UserScript==


var navButtons = document.getElementsByClassName("css_nav");
var navbar = navButtons[0].parentNode;

navbar.innerHTML = "<td class=\"css_nav\" height=\"34\" width=\"78\"><a href=\"http://www.webdkp.com/dkp/Shadow+Council/Wings+of+Tomorrow/\">DKP</a></td>" + navbar.innerHTML;





