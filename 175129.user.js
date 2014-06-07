// ==UserScript==
// @name        TMD filtru torrente culori
// @description coloreaza torrentele care le doresti
// @include     *torrentsmd.com/*
// @include     *torrentsmd.*/*
// @include     *torrentsmoldova.*/*
// @version     1.0
// @author      Drakulaboy
// @icon         http://s017.radikal.ru/i432/1308/7b/34fa18a96812.png
// @require     http://code.jquery.com/jquery-1.10.2.js
// ==/UserScript==

$(document).ready(function () {
    var exclude = ['LostFilm', 
                   'Dexter',
                  'Suits',
                  'Lightroom',
                  'Breaking Bad',
                  'Supernatural',
                  'Sherlock',
                  'Under the Dome',
                  'Hannibal',
                  'Arrow',
                  'Warehouse 13',
                  'Revolution',
                  'Homeland',
                  'The Big Bang Theory',
                  'Formula 1',
                  'Română',
                  'Elementary',
                  'Simpsons',
                  'Futurama',
                  'română',
                  'Snooker',];
    
    exclude.forEach(function(i){
        $('.tableTorrents tr:contains(' + i + ')').css("background-color", "#bbbbff") ;
    });
});