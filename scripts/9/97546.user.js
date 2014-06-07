// ==UserScript==
// @name			Ikariam China Advisors
// @namespace 		http://www.colonial-fleet.nl
// @description 	Brings back good old advisors
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

var URL = 'http://www.iv.pl/images/';

GM_addStyle('#advisors #advCities a.normal { background-image:url('+URL+'97834999556578895805.jpg); }');
GM_addStyle('#advisors #advCities a.normalactive { background-image:url('+URL+'52511750082300745186.jpg); }');

GM_addStyle('#advisors #advMilitary a.normal { background-image:url('+URL+'17438227936507515624.jpg); }');-
GM_addStyle('#advisors #advMilitary a.normalactive { background-image:url('+URL+'61303338642164322829.jpg); }');-
GM_addStyle('#advisors #advMilitary a.normalalert { background-image:url('+URL+'57662968505418864394.jpg); }');

GM_addStyle('#advisors #advDiplomacy a.normal { background-image:url('+URL+'25201269249240126990.jpg);	}');
GM_addStyle('#advisors #advDiplomacy a.normalactive { background-image:url('+URL+'92105162992184647646.jpg);	}');

GM_addStyle('#advisors #advResearch a.normal { background-image:url('+URL+'83473802828691302143.jpg); }');
GM_addStyle('#advisors #advResearch a.normalactive { background-image:url('+URL+'82931997773174148864.jpg); }');