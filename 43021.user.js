// ==UserScript==
// @name		Ikariam Plus: Advisor New
// @namespace 		http://i659.photobucket.com/albums/uu317/joeppoep/Hackikariam.jpg/
// @description 	Simple, It changes the images of the advisors
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

//
var URL= "http://i659.photobucket.com/albums/uu317/joeppoep/";

// Иконка города
GM_addStyle('#advisors #advCities a.normal { background-image:url('+URL+'Ikariamhartje.jpg); }');
GM_addStyle('#advisors #advCities a.normalactive { background-image:url('+URL+'Ikariamhartje1.jpg); }');

// Иконка армии
GM_addStyle('#advisors #advMilitary a.normal { background-image:url('+URL+'Ikariamroos.jpg); }');-
GM_addStyle('#advisors #advMilitary a.normalactive { background-image:url('+URL+'Ikariamroos1.jpg); }');-

// иконка иследований
GM_addStyle('#advisors #advDiplomacy a.normal { background-image:url('+URL+'IkariamChoco.jpg);	}');
GM_addStyle('#advisors #advDiplomacy a.normalactive { background-image:url('+URL+'IkariamChoco1.jpg);	}');

// Иконка дипломатии
GM_addStyle('#advisors #advResearch a.normal { background-image:url('+URL+'IkariamZwaan.jpg); }');
GM_addStyle('#advisors #advResearch a.normalactive { background-image:url('+URL+'IkariamZwaan1.jpg); }');