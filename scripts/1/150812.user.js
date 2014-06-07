// ==UserScript==
// @name        entlogin
// @namespace   ent
// @description active autocomplete pour eviter de retaper son mdp
// @include     https://sso-cas.univ-rennes1.fr/login*
// @grant none
// @version     1
// ==/UserScript==

removeAttributeOfElement('autocomplete','//input'); 
