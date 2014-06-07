// ==UserScript==
// @name ebay keepMeSignInOption
// @namespace      http://home.versanet.de/~cstrebin/
// @description    Checks the "keep me logged in" checkbox on the ebay login page
// @include        https://signin.ebay.*
// ==/UserScript==

document.getElementsByName("keepMeSignInOption")[0].checked = true;
document.getElementsByName("userid")[0].focus();	// login name text field
