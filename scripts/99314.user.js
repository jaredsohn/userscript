// ==UserScript==
// @name           BOA Frontpage Click
// @namespace      http://userscripts.org/users/num
// @description    Click the "Sign In" button on the front page of the Bank Of America website
// @include        https://www.bankofamerica.com/*
// @exclude        https://www.bankofamerica.com/Control.do?*
// ==/UserScript==
window.addEventListener ("load", GSFunc, false);

function GSFunc()
{                                          
var userIDfield = document.getElementById("multiID");
var loginButton = document.getElementById("top-button");
loginButton.click();
}