// ==UserScript==
// @name           KoL: Save kmails by default
// @namespace      http://userscripts.org/users/121156
// @description    Automatically checks the box in the Kingdom of Loathing to save your kmails.  There’s not a lot to it.
// @include        http://127.0.0.1:*/sendmessage.php
// @include        http://*kingdomofloathing.com/sendmessage.php
// ==/UserScript==

var inputs = document.getElementsByTagName('input');

for (var i = 0, j = inputs.length; i < j; i++) {
  var current = inputs[i];
  if (current.name == 'savecopy') current.checked = true;
}
