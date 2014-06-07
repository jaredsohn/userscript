// ==UserScript==
// @name           web.de-navigator-blocker
// @namespace      binfalse.de
// @description    ban web.de navi bar
// @include        https://freemailng*.web.de/*
// ==/UserScript==

var v = document.getElementById ("navigator");
if (v)
{
	v.style.visibility = "hidden";
}
v = document.getElementById ("canvas");
if (v)
{
	v.style.top = 0;
}
