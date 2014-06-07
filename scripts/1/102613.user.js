// ==UserScript==
// @name		Seiyonnet Mod
// @namespace	http://userscripts.org/users/94814
// @include		*seiyon.net/*
// ==/UserScript==

// document title
if (document.getElementsByClassName("vtitle")[0]) { document.title = document.getElementsByClassName("vtitle")[0].firstChild.nodeValue; }

// color nick
var el = document.getElementsByClassName("comm_nick_ano");
for (i=0; i<el.length; i++) {
	el[i].innerHTML = el[i].innerHTML.replace(/([0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F])/g, '<span style="color: #$1;">$1</span>');
}
