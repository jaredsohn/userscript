// ==UserScript==
// @name        Password reader
// @namespace   http://userscripts.org/users/268703
// @description Shows automatically filled passwords
// @include     *
// @version     1
// ==/UserScript==

function foreach (a, f) {
  for (i in a) {
    f(a[i], i, a);
  }
}

function showPasswords () {
  foreach(document.getElementsByTagName('INPUT'), function (el) {
    if ('password' != el.type) {
      return false;
    }
    el.title = el.value;
  });
}

GM_registerMenuCommand('Show password(s)', showPasswords);