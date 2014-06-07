// ==UserScript==
// @name           Ocado: allow password autocomplete
// @namespace      http://raines.me.uk/
// @description    This script permits saving of the username and password to login at ocado.com.
// @include        http://www.ocado.com/*
// ==/UserScript==

var password = document.getElementById("password");
if (password) {
    password.removeAttribute("autocomplete");
}

