// JavaScript Document
// ==UserScript==
// @name           Ikaraimpsons: City Pack [WEB BASED]
// @autor          Blazed-d
// @email          J_yarbor@hotmail.com
// @namespace      Ikariam
// @description    A simple edit to Ikariam that replaces the advisors with other characters from the Simpons show. This package is the City pack and includes characters that are from the City.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

/*TEST VERSION, SLOW CODED ONLY FOR TESTING PURPOSE*/

function addAnimStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//*********
//addAnimStyle('');
//'+URL+'/
//*********
var URL= "http://www.ikariamods.blazed-designs.com/mods/Ikaraimpsons";
//0.6.7

//-diplomat
addAnimStyle('#advisors #advDiplomacy a.normal { background-image:url('+URL+'/diplomat.gif);	}');
//-mayor
addAnimStyle('#advisors #advCities a.normal { background-image:url('+URL+'/mayor.gif); }');
//-military
addAnimStyle('#advisors #advMilitary a.normal { background-image:url('+URL+'/military.gif); }');-
//-Research
addAnimStyle('#advisors #advResearch a.normal { background-image:url('+URL+'/research.gif); }');
//-diplomatactive
addAnimStyle('#advisors #advDiplomacy a.normalactive { background-image:url('+URL+'/diplomatactive.gif);	}');
//-mayoractive
addAnimStyle('#advisors #advCities a.normalactive { background-image:url('+URL+'/mayoractive.gif); }');
//-militaryactive
addAnimStyle('#advisors #advMilitary a.normalactive { background-image:url('+URL+'/militaryactive.gif); }');-
//-Researchactive
addAnimStyle('#advisors #advResearch a.normalactive { background-image:url('+URL+'/researchactive.gif); }');