// ==UserScript==
// @name  The Hunter Autologin
// @include http://www.thehunter.com/pub/
// ==/UserScript==

window.signIn = function() {
  document.forms[0].submit();
}

setTimeout(signIn, 2000);
