// ==UserScript==
// @name           Mozilla Login Focus
// @author         Ajnasz
// @namespace      http://ajnasz.hu/mozilla-login-focus
// @description    put the focus into the email/pass field on addons.mozilla.com login page
// @include        https://addons.mozilla.org/en-US/firefox/users/login*
// ==/UserScript==

(function() {
  var e = document.getElementById('LoginEmail');
  var p = document.getElementById('LoginPassword');
  if(e && e.value == '') {
    e.focus();
  } else if(p) {
    p.focus();
  }
})();
