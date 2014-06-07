// ==UserScript==
// @name			Userscript Search
// @version			2013 Nov 1st
// @author			XFox Prower
// @namespace			http://www.TailsArchive.net/
// @description			Adds a Script Search box on Userscript.org
// @include			http://userscripts.org/*
// ==/UserScript==

D=document;
H=D.getElementById('header');
M=D.getElementById('mainmenu');
if(H&&M)
	{
	F=D.createElement('form');
	F.action='/scripts/search';
	F.method='get';
	I=D.createElement('input');
	I.placeholder='Search scripts';
	H.appendChild(F);
	F.appendChild(H.getElementsByTagName('div').item(0));
	M.appendChild(D.createElement('li')).appendChild(I);
	}