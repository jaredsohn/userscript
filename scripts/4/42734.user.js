// ==UserScript==
// @name           Onlinetvrecorder Autologin
// @namespace      tool
// @description    Autologin für Onlinetvrecorder, Passwort muss gespeichert sein!
// @include        http://www.onlinetvrecorder.com/*
// ==/UserScript==

if(document.forms[0].elements[4].name == "btn_login") {
document.forms[0].elements[4].click();
}