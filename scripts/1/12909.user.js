// Lachschon.de css retro-style user script
// version 1.1.0
// 2007-10-10
// Copyright (c) 2007, Christian Arndt
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Lachschon.de css retro-style", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Lachschon.de css retro-style
// @namespace     http://www.chaos-raid.de
// @description   changes colors via css on every page, retro like
// @include       http://lachschon.pcgames.de/*
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
//unkommentiert die folgenden zwei zeilen, um die top-werbung verschwinden zu lassen
//addGlobalStyle('div#ads_top { display: none; }');
//addGlobalStyle('div#header { margin-top: 20px; }');
addGlobalStyle('body { background-color: #505152; position: relative; }');
addGlobalStyle('h1 { color: #c03000; }');
addGlobalStyle('#page { margin: 0px auto;}');
addGlobalStyle('span.username_title_guest { color: #c03000; }');
addGlobalStyle('span.subtitle { color: #000; font-weight: bold; }');
addGlobalStyle('.username { color: #c03000; }');
addGlobalStyle('div.joke a { color: #c03000; }');
addGlobalStyle('span.username_guest { color: #c03000; }');
addGlobalStyle('.pagesel_title { color: #c03000; }');
addGlobalStyle('#content h3 { color: #c03000; }');
addGlobalStyle('span.pagesel_title { color: #c03000; }');
addGlobalStyle('div#rating { background-image: none; background-color: #efefef; }');
addGlobalStyle('form#vote fieldset { background-image: none; background-color: #efefef; }');
addGlobalStyle('div#rating p.value { color: #c03000; }');
addGlobalStyle('form#vote ul li p { color: #c03000; }');
addGlobalStyle('div#tags h2 { color: #c03000; }');
addGlobalStyle('div.pagetitle { color: #c03000; }');
addGlobalStyle('#imglist td span.title { color: #c03000; }');
addGlobalStyle('#imglist td a { color: #c03000; }');
addGlobalStyle('ul#nav { margin: 0px auto; }');
addGlobalStyle('ul#nav li a { background-image: none; background-color: #efefef; color: #c03000; }');
addGlobalStyle('ul#nav li a.active { background-image: none; background-color: #fff; color: #000; }');
addGlobalStyle('ul#nav li a.shop { background-image: none; background-color: #c03000; color: #fff; }');
addGlobalStyle('div#header { background-image: url(http://img20.imageshack.us/img20/9824/lachschonheaderak5.png); }');
addGlobalStyle('div#header a { display: block; height: 120px; width: 540px; position: absolute; }');
addGlobalStyle('div#header img#headerleft { visibility: hidden; }');
addGlobalStyle('div#header img#lachschon { visibility: hidden; }');
// Pfeile ausblenden
//Arrow left - http://img503.imageshack.us/img503/6764/algi0.png
//Arrow right - http://img503.imageshack.us/img503/5438/arcv9.png
//comments navi, leider keine pfeile möglich atm
addGlobalStyle('div.pageselection a.direction img { display: none; }');
//die übern bild
addGlobalStyle('div#slide_nav img { display: none }');
addGlobalStyle('span.slide_nav a { background-image: url(http://img503.imageshack.us/img503/6764/algi0.png); background-repeat: no-repeat; background-position: center left; padding-left: 14px; }');
addGlobalStyle('span.slide_nav.right a { background-image: url(http://img503.imageshack.us/img503/5438/arcv9.png); background-repeat: no-repeat; background-position: center right; padding-right: 14px; }');
//die beim random bild
addGlobalStyle('div#random_images ul li img { display: none; }');
addGlobalStyle('div#random_images ul li.first { background-image: url(http://img503.imageshack.us/img503/6764/algi0.png); background-repeat: no-repeat; background-position: center left; padding-left: 14px; width: 25%; }');
addGlobalStyle('div#random_images ul li.last { background-image: url(http://img503.imageshack.us/img503/5438/arcv9.png); background-repeat: no-repeat; background-position: center right; padding-right: 14px; width: 25%; }');
//skyscraper
addGlobalStyle('div#skyskraper { height: 620px; width: 200px; left: 0px; position: static; }');
