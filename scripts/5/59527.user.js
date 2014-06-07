// ==UserScript==
// @name          TinySig

// @description   Nigger shit fuck in the ass
// @include       http://www.tinychan.org/*
// @include       http://tinychan.org/*
// ==/UserScript==

var sig = '[spoiler]N[spoiler]a[spoiler]m[spoiler]e[spoiler]f[spoiler]a[spoiler]g[spoiler] [spoiler]f[spoiler]a[spoiler]p[spoiler]s[spoiler] [spoiler]t[/spoiler]o[/spoiler] [/spoiler]N[/spoiler]a[/spoiler]r[/spoiler]u[/spoiler]t[/spoiler]o[/spoiler] [/spoiler]p[/spoiler]o[/spoiler]r[/spoiler]n[/spoiler]';

function addSig()
{
	document.getElementsByName('msg')[0].value += "\n_______\n" + sig;
}
	
window.addEventListener('submit', addSig, true);