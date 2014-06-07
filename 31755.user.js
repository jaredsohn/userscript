// ==UserScript==
// @name			Ikariam Plus: Advisor Skin
// @namespace 		http://www.anime-il.com
// @description 	Simple, It changes the images of the advisers
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

function addAnimStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
var URL= "http://s200.photobucket.com/albums/aa94/ExtraKiller/";
addAnimStyle('#advisors #advDiplomacy a.normal { background-image:url('+URL+'/diplomat_premium.gif);	}');
addAnimStyle('#advisors #advCities a.normal { background-image:url('+URL+'/mayor_premium.gif); }');
addAnimStyle('#advisors #advMilitary a.normal { background-image:url('+URL+'/general_premium.gif); }');-
addAnimStyle('#advisors #advResearch a.normal { background-image:url('+URL+'/scientist_premium.gif); }');
addAnimStyle('#advisors #advDiplomacy a.normalactive { background-image:url('+URL+'/diplomat_premium_active.jpg);	}');
addAnimStyle('#advisors #advCities a.normalactive { background-image:url('+URL+'/mayor_premium_active.jpg); }');
addAnimStyle('#advisors #advMilitary a.normalactive { background-image:url('+URL+'/general_premium_active.jpg); }');-
addAnimStyle('#advisors #advResearch a.normalactive { background-image:url('+URL+'/scientist_premium_active.jpg); }');