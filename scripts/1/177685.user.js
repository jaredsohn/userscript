// ==UserScript==
// @name        Google auto-login
// @namespace   bo33b.org
// @description Automatically log in to Google's web services.
// @version     2.0.1
// @include     https://accounts.google.com/ServiceLogin*
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

if(!GM_getValue('p') || location.href.indexOf('LoginAuth')>0) {
    GM_setValue('u',setValue(prompt('Enter Username (just this once)\n\n')));
    GM_setValue('p',setValue(prompt('Enter Password (just this once)\n\n')));
}

with(document){
   getElementById('Email').value = getValue(GM_getValue('u'));
   getElementById('Passwd').value= getValue(GM_getValue('p'));
   getElementById('signIn').click();
}

function setValue(v) {
   if (!v) return undefined;
   return window.btoa(unescape(encodeURIComponent(v)));
}

function getValue(v) {
   return decodeURIComponent(escape(window.atob(v)));
}
