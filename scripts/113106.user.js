// ==UserScript==
// @name			Ika-TK Advisors
// @namespace 		http://www.colonial-fleet.nl
// @description 	Brings back good old advisors
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

var URL = 'http://www.iv.pl/images/';

GM_addStyle('#advisors #advCities a.normal { background-image:url('+URL+'58099349369275231452.png); }');
GM_addStyle('#advisors #advCities a.normalactive { background-image:url('+URL+'97426948000392565848.gif); }');

GM_addStyle('#advisors #advMilitary a.normal { background-image:url('+URL+'11675526805860535994.png); }');-
GM_addStyle('#advisors #advMilitary a.normalactive { background-image:url('+URL+'78092242176191560385.gif); }');-
GM_addStyle('#advisors #advMilitary a.normalalert { background-image:url('+URL+'15799881039053050926.gif); }');

GM_addStyle('#advisors #advDiplomacy a.normal { background-image:url('+URL+'09290392824711059129.png);	}');
GM_addStyle('#advisors #advDiplomacy a.normalactive { background-image:url('+URL+'66187802118193065008.gif);	}');

GM_addStyle('#advisors #advResearch a.normal { background-image:url('+URL+'22087014323047926949.png); }');
GM_addStyle('#advisors #advResearch a.normalactive { background-image:url('+URL+'10314807966223560700.gif); }');