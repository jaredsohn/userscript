// ==UserScript==
// @name           Watch Dragonball Next/Prev Links
// @namespace      http://userscripts.org/users/91669
// @include        http://www.watch-dragonball.com/watch/*
// @description    Adds next/previous links to episodes.
// ==/UserScript==

var s = document.location.href;
for (var i=4; i>0; i--) {
	eval('var e = /[0-9]{'+i+'}/.exec(s);');
	if (e!=null) break;
}
var ss = s.split(e);
var LinkHtml = '<a href="' + ss.join((e-1).toString()) + '">Previous Episode</a> - </span><a href="' + ss.join((e-0+1).toString()) + '">Next Episode</a>';

var s = '<embed src="http://www.pisogaforum.com/';
document.body.innerHTML = document.body.innerHTML.replace(s, '<br/>' + LinkHtml + '<br/><br/>' + s);

