// ==UserScript==
// @name           HabrahabrRemoveRefreshButton
// @namespace      http://ivan.homelinux.org
// @description    Removes habrahabr.ru refresh button which slowdown scrolling
// @include        http://*habrahabr.ru/*
// ==/UserScript==
//
//

m = document.getElementById("main-content");
x = document.getElementById("xsidebar");
if (m != null && x != null) m.removeChild(x);
