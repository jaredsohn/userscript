// ==UserScript==
// @name		Plus: Advisor New
// @namespace 		http://s604.photobucket.com/albums/tt121/prof07/th_Hackikariam.jpg
// @description 	Simple, It changes the images of the advisors
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==


//
var URL= "http://s604.photobucket.com/albums/tt121/prof07/";

// Иконка города
GM_addStyle('#advisors #advCities a.normal { background-image:url('+URL+'+URL+'th_HackikariamL.jpg); }');
GM_addStyle('#advisors #advCities a.normalactive { background-image:url('+URL+'th_HackikariamL.jpg); }');

// Иконка армии
GM_addStyle('#advisors #advMilitary a.normal { background-image:url('+URL+'+URL+'th_HackikariamD.jpg); }');-
GM_addStyle('#advisors #advMilitary a.normalactive { background-image:url('+URL+'th_HackikariamD.jpg); }');-

// иконка иследований
GM_addStyle('#advisors #advDiplomacy a.normal { background-image:url('+URL+'th_HackikariamC.jpg);	}');
GM_addStyle('#advisors #advDiplomacy a.normalactive { background-image:url('+URL+'th_HackikariamC.jpg);	}');

// Иконка дипломатии
GM_addStyle('#advisors #advResearch a.normal { background-image:url('+URL+'th_HackikariamL.jpg); }');
GM_addStyle('#advisors #advResearch a.normalactive { background-image:url('+URL+'th_HackikariamL.jpg); }');