// ==UserScript==
// @name           kekeke autorefresh
// @version 	   1.0.0
// @description	   As title
// @include        http://kekeke.cc/*
// ==/UserScript==
function autorefresh()
 {
      window.location.reload();
 }
 setTimeout(autorefresh, 600000);