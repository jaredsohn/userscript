// ==UserScript==
// @name		Ika-Premium Advisors
// @namespace 		http://www.colonial-fleet.nl
// @description 	Brings back good old advisors
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

var URL = 'http://www.iv.pl//images/';

GM_addStyle('#advisors #advCities a.normal { background-image:url('+URL+'51183095207457995682.gif); }');
GM_addStyle('#advisors #advCities a.normalactive { background-image:url('+URL+'93430226016474559615.gif); }');

GM_addStyle('#advisors #advMilitary a.normal { background-image:url('+URL+'63089563174023765820.gif); }');-
GM_addStyle('#advisors #advMilitary a.normalactive { background-image:url('+URL+'16667888489722932643.gif); }');-
GM_addStyle('#advisors #advMilitary a.normalalert { background-image:url('+URL+'21617677694871712829.png); }');

GM_addStyle('#advisors #advDiplomacy a.normal { background-image:url('+URL+'10920591334241368183.gif);	}');
GM_addStyle('#advisors #advDiplomacy a.normalactive { background-image:url('+URL+'58955676838993536846.gif);	}');

GM_addStyle('#advisors #advResearch a.normal { background-image:url('+URL+'09781565100631325826.gif); }');
GM_addStyle('#advisors #advResearch a.normalactive { background-image:url('+URL+'09519988121262364436.gif); }');