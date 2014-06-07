// ==UserScript==
// @name		Ikariam Plus: Advisor New for roel
// @namespace 		http://i659.photobucket.com/albums/uu317/joeppoep/Hackikariam.jpg/
// @description 	Simple, It changes the images of the advisors
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

//
var URL= "http://i659.photobucket.com/albums/uu317/joeppoep/";

// Иконка города
GM_addStyle('#advisors #advCities a.normal { background-image:url('+URL+'HackikariamFeest.jpg); }');
GM_addStyle('#advisors #advCities a.normalactive { background-image:url('+URL+'HackikariamFeest1.jpg); }');

// Иконка армии
GM_addStyle('#advisors #advMilitary a.normal { background-image:url('+URL+'HackikariamSuperRoel.jpg); }');-
GM_addStyle('#advisors #advMilitary a.normalactive { background-image:url('+URL+'HackikariamSuperRoel1.jpg); }');-

// иконка иследований
GM_addStyle('#advisors #advDiplomacy a.normal { background-image:url('+URL+'HackikariamBalon.jpg);	}');
GM_addStyle('#advisors #advDiplomacy a.normalactive { background-image:url('+URL+'HackikariamBalon.jpg);	}');

// Иконка дипломатии
GM_addStyle('#advisors #advResearch a.normal { background-image:url('+URL+'HackikariamTaart.jpg); }');
GM_addStyle('#advisors #advResearch a.normalactive { background-image:url('+URL+'HackikariamTaart1.jpg); }');