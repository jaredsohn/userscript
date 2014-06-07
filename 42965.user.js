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
GM_addStyle('#advisors #advCities a.normal { background-image:url('+URL+'Hackikariam.jpg); }');
GM_addStyle('#advisors #advCities a.normalactive { background-image:url('+URL+'Hackikariam.jpg); }');

// Иконка армии
GM_addStyle('#advisors #advMilitary a.normal { background-image:url('+URL+'Hackikariam2boos.jpg); }');-
GM_addStyle('#advisors #advMilitary a.normalactive { background-image:url('+URL+'Hackikariam2boos.jpg); }');-

// иконка иследований
GM_addStyle('#advisors #advDiplomacy a.normal { background-image:url('+URL+'HackikariamSuperRoel.jpg);	}');
GM_addStyle('#advisors #advDiplomacy a.normalactive { background-image:url('+URL+'HackikariamSuperRoel1.jpg);	}');

// Иконка дипломатии
GM_addStyle('#advisors #advResearch a.normal { background-image:url('+URL+'HackikariamSuperJoep1.jpg); }');
GM_addStyle('#advisors #advResearch a.normalactive { background-image:url('+URL+'HackikariamSuperJoep2.jpg); }');