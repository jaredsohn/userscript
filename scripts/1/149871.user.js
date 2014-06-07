// ==UserScript==
// @name           Turn On Autocomplete @webmail
// @namespace      http://userscripts.org/users/412300
// @description    Sets the autocomplete field of Username and Password fields to "ON"
// @include        https://webmail-studs.info.uaic.ro/*
// ==/UserScript==

document.getElementById("rcmloginuser").autocomplete="on";
document.getElementById("rcmloginpwd").autocomplete="on";