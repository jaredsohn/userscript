// ==UserScript==
// @name        autocomplete forms
// @namespace   MAF-Soft
// @description removes autocomplete=off attributes from all forms and input fields.
// @include     https://*.paypal.com/*cmd=_login-run*
// @include     https://banking.postbank.de/rai/login
// @version     1
// @grant       none
// ==/UserScript==

[].forEach.call(
   document.querySelectorAll('form[autocomplete="off"], input[autocomplete="off"]'),
   function(el) {el.removeAttribute('autocomplete');}
);

// Explanation: querySelectorAll takes CSS-selectors and returns a NodeList, which
// doesn't have a forEach - so we take it from an Array. Hope that helps :)