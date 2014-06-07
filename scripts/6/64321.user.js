// ==UserScript==
// @name           FunkySouls redirection remover
// @description    Make links direct
// @namespace      http://nobodyzzz.dontexist.org/
// @include        http://forum.funkysouls.com/*
// @version        0.0.1
// ==/UserScript==

var lnks = document.querySelectorAll("a[href*='http://forum.funkysouls.com/go.php?']");

for(var i = 0, n = lnks.length; i < n; i += 1){
	lnks[i].href = lnks[i].href.replace("http://forum.funkysouls.com/go.php?", "");
}
