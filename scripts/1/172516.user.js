// ==UserScript==
// @name        Team-Fortress.SU css design fix
// @namespace   SARFEX
// @include     http://forum.team-fortress.su/*
// @version     1.0
// ==/UserScript==

document.addEventListener("readystatechange", init, true);

function init() {
    var fileref = document.createElement('link');
    fileref.setAttribute("rel","stylesheet");
    fileref.setAttribute("href", "http://sarfex.ru/forum.css?r=1");
    if (typeof fileref!="undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}
