// ==UserScript==
// @name			Ikariam Original Advisors
// @namespace 		http://www.colonial-fleet.nl
// @description 	Brings back good old advisors
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

var URL = 'http://'+top.location.host+'/skin/layout/advisors/';

GM_addStyle('#advisors #advCities a.normal { background-image:url('+URL+'mayor.gif); }');
GM_addStyle('#advisors #advCities a.normalactive { background-image:url('+URL+'mayor_active.gif); }');

GM_addStyle('#advisors #advMilitary a.normal { background-image:url('+URL+'general.gif); }');-
GM_addStyle('#advisors #advMilitary a.normalactive { background-image:url('+URL+'general_active.gif); }');-
GM_addStyle('#advisors #advMilitary a.normalalert { background-image:url('+URL+'general_alert.gif); }');

GM_addStyle('#advisors #advDiplomacy a.normal { background-image:url('+URL+'diplomat.gif);	}');
GM_addStyle('#advisors #advDiplomacy a.normalactive { background-image:url('+URL+'diplomat_active.gif);	}');

GM_addStyle('#advisors #advResearch a.normal { background-image:url('+URL+'scientist.gif); }');
GM_addStyle('#advisors #advResearch a.normalactive { background-image:url('+URL+'scientist_active.gif); }');