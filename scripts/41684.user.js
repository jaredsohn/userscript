// ==UserScript==
// @name           Gamesgamesgame
// @namespace      http://www.lutralutra.co.uk
// @description    Gives the thread its proper name
// @include        http://talk.guardian.co.uk/*
// ==/UserScript==

if (document.body.innerHTML.search(/Games! Games! Games!/)>-1)
{
	document.body.innerHTML = document.body.innerHTML.replace(/Games! Games! Games!/,"Games!Games!Game!");
	if (document.body.innerHTML.search(/New subscription messages/)==-1)
	{
		document.title="Games!Games!Game!";
	}
}