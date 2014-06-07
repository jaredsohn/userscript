// JavaScript Document
// ==UserScript==
// @name           Ikariam: Graphics Pack 3.0
// @version        0.0.6 (for Ikariam 0.2.8)
// @autor          off-ptz
// @email          off-ptz@mail.ru
// @namespace      Ikariam
// @description    Insert Ikariam 3.0 background
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @exclude        http://s666.ikariam.*/*
// @exclude        http://s99.ikariam.*/*
// ==/UserScript==

// Version 0.0.6 (for Ikariam 0.2.8)
// Test version
// =================================================
function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// =================================================
// City phase
addStyle('#city #container .phase1 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level1.jpg);}');
addStyle('#city #container .phase2 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level2.jpg);}');
addStyle('#city #container .phase3 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level3.jpg);}');
addStyle('#city #container .phase4 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level4.jpg);}');
addStyle('#city #container .phase5 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level5.jpg);}');
addStyle('#city #container .phase6 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level6.jpg);}');
addStyle('#city #container .phase7 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level7.jpg);}');
addStyle('#city #container .phase8 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level8.jpg);}');
addStyle('#city #container .phase9 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level9.jpg);}');
addStyle('#city #container .phase10 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level10.jpg);}');
addStyle('#city #container .phase11 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level11.jpg);}');
addStyle('#city #container .phase12 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level12.jpg);}');
addStyle('#city #container .phase13 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level13.jpg);}');
addStyle('#city #container .phase14 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level14.jpg);}');
addStyle('#city #container .phase15 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level15.jpg);}');
addStyle('#city #container .phase16 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level16.jpg);}');
addStyle('#city #container .phase17 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level17.jpg);}');
addStyle('#city #container .phase18 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level18.jpg);}');
addStyle('#city #container .phase19 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level19.jpg);}');
addStyle('#city #container .phase20 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level20.jpg);}');
// Test
addStyle('#city #container .phase21 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level21.jpg);}');
addStyle('#city #container .phase22 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level22.jpg);}');
addStyle('#city #container .phase23 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level23.jpg);}');
addStyle('#city #container .phase24 {    background-image:url(http://offptz.ucoz.ru/ikar_gp/city_level24.jpg);}');
// =================================================
// ConstructionSite
addStyle('#city #container #mainview #locations li .constructionSite { left:-20px; top:-30px; width:114px; height:81px; background-image:url(http://offptz.ucoz.ru/ikar_gp/constructionSite.gif);	}');
// =================================================
// Wall
addStyle('#city #container #mainview #locations .wall .buildingimg {	left:-500px; top:-15px; width:720px; height:137px;   background-image:url(http://offptz.ucoz.ru/ikar_gp/building_wall.gif);	}');
// =================================================