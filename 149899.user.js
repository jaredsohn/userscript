// ==UserScript==
// @name        IS MUNI (remember password)
// @namespace   is_muni_cz
// @description This script forces the browser to remember user's password for IS MUNI.
// @include     https://is.muni.cz/auth/
// @author		Marek Osvald
// @version     1.2
// @grant		none
// ==/UserScript==

var cred = document.getElementsByName('credential_1').item(0)
cred.autocomplete = 'on'