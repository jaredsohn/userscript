// ==UserScript==
// @name           Wurzelimperium - Autologin
// @namespace      Woems
// @include        http://www.wurzelimperium.de/*
// ==/UserScript==

window.setTimeout(function () {
  unsafeWindow.submitLogin();
}, 5000);

