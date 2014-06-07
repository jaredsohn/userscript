// ==UserScript==
// @name           delete all my posts ever
// @namespace      none
// @include        http://www.reddit.com/user/*
// ==/UserScript==
setTimeout('var deleted = 0;var links = document.getElementsByTagName("a");var i = 0;var d = 0;for (i = 0; i < links.length; i++) {var l = links[i];if (l.href) {if (l.innerHTML == "delete") {toggle(l);   d = 1;  }  if (d && (l.innerHTML == "yes")) { deleted=1; change_state(l, "del", hide_thing); d = 0; } } } if (deleted) { setTimeout("location.reload(true);",100); }', 400);
