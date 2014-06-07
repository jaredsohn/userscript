// ==UserScript==
// @name        Fidelity.com auto-login
// @namespace   bo33b.dyndns.org
// @description Simple auto-login script for Fidelity.com
// @version     2.0.1
// @include     https://login.fidelity.com/ftgw/Fas/Fidelity/RtlCust/Login/Init
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

setTimeout(function() {
   var u = document.forms[0].SSN;
   var p = document.forms[0].PIN;
   if (u && !GM_getValue('u')) GM_setValue('u',setValue(prompt('Enter Login ID (just this once)\n\n')));
   if (p && !GM_getValue('p')) GM_setValue('p',setValue(prompt('Enter Password (just this once)\n\n')));
   if (u) u.value = u.previousSibling.value = getValue(GM_getValue('u'));
   if (p) p.value = getValue(GM_getValue('p'));
   document.forms[0].submit();
},10);

function setValue(v) {
   if (!v) return undefined;
   return window.btoa(unescape(encodeURIComponent(v)));
}

function getValue(v) {
   return decodeURIComponent(escape(window.atob(v)));
}
