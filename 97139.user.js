// ==UserScript==
// @name           איקרים העיר הגדולה
// @namespace      איקרים העיר הגדולה - מחליפה את העיר בעיר יפה יותר משלב 24
// @version        1.2.0
// @source         http://userscripts.org/scripts/show/51406
// @identifier     http://userscripts.org/scripts/source/51406.user.js
// @mail           Soon@Soon.Soon
// @description    איקרים העיר הגדולה - מחליפה את העיר בעיר יפה יותר משלב 24 
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.co.il/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

// ***************** Start *****************

function addNewStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// ***************** Background ************* !
addNewStyle('#city #container .phase1, #city #container .phase2, #city #container .phase3, #city #container .phase4, #city #container .phase5, #city #container .phase6, #city #container .phase7, #city #container .phase8, #city #container .phase9, #city #container .phase10, #city #container .phase11, #city #container .phase12, #city #container .phase13, #city #container .phase14, #city #container .phase15, #city #container .phase16, #city #container .phase17, #city #container .phase18, #city #container .phase19, #city #container .phase20, #city #container .phase21, #city #container .phase22, #city #container .phase23, #city #container .phase24, #city #container .phase25, #city #container .phase26, #city #container .phase27, #city #container .phase28, #city #container .phase29, #city #container .phase30, #city #container .phase31, #city #container .phase32, #city #container .phase33, #city #container .phase34, #city #container .phase35, #city #container .phase36, #city #container .phase37, #city #container .phase38, #city #container .phase39, #city #container .phase40, #city #container .phase1012 {background-image:url(http://s2.il.ikariam.com/skin/rtl/img/city/city_level24.jpg);}');
// ***************** End *****************