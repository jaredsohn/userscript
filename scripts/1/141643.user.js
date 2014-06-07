// ==UserScript==
// @name        mazda-cas-autocomplete-login
// @namespace   http://mazdaeur.com/cas-autocomplete-login
// @description Enable auto complete
// @include     https://mwas1.mme.mazdaeur.com/cas/login?*
// @include     https://moa.mazdaeur.com/cas/login?*
// @include     https://mappsacc.mazdaeur.com/cas/login?*
// @include     https://mapps.mazdaeur.com/cas/login?*
// @version     1
// ==/UserScript==

var passwordField = document.getElementById("password");

passwordField.autocomplete = true;
