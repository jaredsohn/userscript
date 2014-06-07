// ==UserScript==
// @name           Standard userhead enforcer
// @namespace      http://goodsoft.lv/
// @description    Forces standard userhead in LJ
// @include        http://*.livejournal.com/*
// @include        http://livejournal.com/*
// ==/UserScript==


elems = document.getElementsByTagName('IMG');
for (i in elems) {
    var elem = elems[i];
    if (elem.src.indexOf("http://files.livejournal.com/userhead/") >= 0)
		elem.src = "http://l-stat.livejournal.com/img/userinfo.gif?v=1";
}

