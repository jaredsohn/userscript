// ==UserScript==
// @author         THE_DRAGON_AWAKES
// @version        4.6.1
// @name           Katz hacked
// @namespace      dragon-awakes@live.com
// @description    Hide the unneeded elements and ads on Katz.cd Downloads
// @include        http://katz.ws/*
// @include        http://katz.cd/*
// @include        http://games.katz.cd/*
// @include        http://apps.katz.cd/*
// @include        http://tv.katz.cd/*
// @include        http://movies.katz.cd/*
// @include        http://music.katz.cd/*
// @include        http://ebooks.katz.cd/*
// @include        http://other.katz.cd/* 
// @include        http://www.katzporn.com/*
// @scriptsource   http://userscripts.org/scripts/show/34276
// ==/UserScript==





// Gets css style necessary for modification.
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


// Changes width of download heading container.
addGlobalStyle('#heading div {width:947px;}');
// Moves mouse over effect for download hosts.
addGlobalStyle('.sub dd.fh.show {right:-337px;}');
// Changes width of download links container.
addGlobalStyle('.sub {width:947px;}');
// Removes footer ads.
addGlobalStyle('#footer {display: none;}');
// Removes right pan ads.
addGlobalStyle('#panright {display: none;}');
// Removes headers ads and logo.
addGlobalStyle('#header {display: none;}');
// Removes more links display.
addGlobalStyle('#main #more {display: none;}');
// Moves Page selection bar to align with content.
addGlobalStyle('#pages {margin:0 15px 0 210px;}');
// moves settings  menu to align with content.
addGlobalStyle('#settings {margin:0 -170px 7px 0;}');

// Tests for the 3 fake links displayed on a no results search.
//var fakelinks = document.getElementById('spell'); < This code was incorrect and removed results on all searches.
var fakelinks = document.getElementById('suggestions');
if (fakelinks) {
// Removes fake download links if found 
addGlobalStyle('#heading {display: none;}');
addGlobalStyle('#list {display: none;}');
} else {
    // there are no fake links on this page(Do-nothing extra).
}
