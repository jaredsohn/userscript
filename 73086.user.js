// ==UserScript==
// @name           no-facebook
// @namespace      http://userscripts.org/users/133663
// @include        http://boards.4chan.org/*
// ==/UserScript==
// That was in pretty poor taste, moot.

var shit = document.getElementById('fb_tr');
shit.innerHTML = "<!-- moot is a faggot -->";
var shit2 = document.getElementsByTagName('h3')[0];
if (/facebook/i.test(shit2.innerHTML)){
	shit2.innerHTML = "<!-- moot is a faggot -->";
}