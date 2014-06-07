// ==UserScript==
// @name          three hits
// @namespace     http://userscripts.org/scripts/show/55611
// @description   3 hit
// @include       http://www.douban.com/group/*
// @exclude       http://www.douban.com/group/discover
// @author         matt
// @version        0.5
// ==/UserScript==


if (GM_getValue("a")==null){
	GM_setValue("a","init");
}

alert(GM_getValue("a"));

GM_setValue("a", GM_getValue("a")+"1");