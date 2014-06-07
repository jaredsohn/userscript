// ==UserScript==
// @name           add moderators links
// @namespace      vladislav
// @description    add moderators links
// @include        http://football.hiblogger.net/*
// @include        http://hiblogger.net/*
// @include        http://*.hiblogger.net/*


// XPath by JoeSimmons
function xp(exp, t, n) {
var r = document.evaluate((exp||"//body"),(n||document),null,(t||6),null);
if(t && t>-1 && t<10) switch(t) {
case 1: r=r.numberValue; break;
case 2: r=r.stringValue; break;
case 3: r=r.booleanValue; break;
case 8: case 9: r=r.singleNodeValue; break;
} return r;
}


var newElement = document.createElement("li");
var main = xp("//li/a[contains(@onmouseover,'plans')]", 9);
if (main) {
    newElement.innerHTML = '<li><a href="http://football.hiblogger.net/moderators/" title="Модеры"  onmouseover="showSubMenu(\'plans\');">Модеры</a></li>';
    main.parentNode.replaceChild(newElement, main);
}


var newElement = document.createElement("a");
var main = xp("//li/a[contains(@href,'plans/add')]", 9);
if (main) {

if (main) {
    newElement.innerHTML = '<a href="http://football.hiblogger.net/moderators/logs/" title="Действия модераторов">Действия модераторов</a>';
    main.parentNode.replaceChild(newElement, main);
}

var newElement = document.createElement("a");
var main = xp("//li/a[contains(@href,'plans/index')]", 9);
if (main) {
    newElement.innerHTML = '<a href="http://football.hiblogger.net/moderators/" title="Список модераторов">Список модераторов</a>';
    main.parentNode.replaceChild(newElement, main);
}

var newElement = document.createElement("a");
var main = xp("//li/a[contains(@href,'plans/friends')]", 9);
if (main) {
    newElement.innerHTML = '<a href="http://hiblogger.net/moderators/" title="Список модераторов с ХБ">Список модераторов с ХБ</a>';
    main.parentNode.replaceChild(newElement, main);
}

var newElement = document.createElement("a");
var main = xp("//li/a[contains(@href,'plans/list')]", 9);
if (main) {
    newElement.innerHTML = '<a href="http://hiblogger.net/moderators/logs/" title="Действия модераторов на ХБ">Действия модераторов на ХБ</a>';
    main.parentNode.replaceChild(newElement, main);
}
}

else {
var newElement = document.createElement("nobr");
var main = xp("id('sub-menu-plans')/li[1]", 9);
if (main) {


    newElement.innerHTML = '<li><a href="http://football.hiblogger.net/moderators/" title="Список модераторов">Список модераторов</a></li>';

    newElement.innerHTML = newElement.innerHTML +  '<li><a href="http://football.hiblogger.net/moderators/logs/" title="Действия модераторов">Действия модераторов</a></li>';

    newElement.innerHTML = newElement.innerHTML + '<li><a href="http://hiblogger.net/moderators/" title="Список модераторов с ХБ">Список модераторов с ХБ</a></li>';

    newElement.innerHTML = newElement.innerHTML + '<li><a href="http://hiblogger.net/moderators/logs/" title="Действия модераторов на ХБ">Действия модераторов на ХБ</a></li>';
    
    main.parentNode.insertBefore(newElement, main.nextSibling);
    main.parentNode.removeChild(main);

}

}





var main = xp("//li/a[contains(@href,'lang=ua')]", 9);
if (main) {
    main.parentNode.removeChild(main);
}
var main = xp("//li/a[contains(@href,'lang=ru')]", 9);
if (main) {
    main.parentNode.removeChild(main);
}
// ==/UserScript== 