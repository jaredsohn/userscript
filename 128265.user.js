// Neptun fejléc lecserélése csöcsös csajokra
// Copyright (c) 2012, Dudas David
//
// --------------------------------------------------------------------
//
// Tesztelve:
// Google Chrome
// Firefox with Greasemonkey
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Neptun csöcsös szőke
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Cseréld le a neptun fejéced csöcsös szőkére
// @include       https://frame.neptun.bme.hu/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var randomnumber = Math.round(Math.random()*5)+''
var kep='http://users.hszk.bme.hu/~dd768/neptun/header_' + randomnumber + '.jpg';

addGlobalStyle(".main_header_r{background-color:#fff;background-image:url('" + kep + "');background-repeat:no-repeat;width:582px;height:200px;text-align:right;vertical-align:top}");


