// ==UserScript==
// @name        XKCD News Substitution Fun
// @namespace   xkcd.new.substitution.fun
// @description Replaces text of pages as per http://xkcd.com/1288/
// @version     1.0.6
// @grant       none
// @include     http://*
// @exclude     http://userscripts.org/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$('*').contents().filter(function() {
    return this.nodeType == Node.TEXT_NODE && this.nodeValue.trim() != '';
}).each(function() {
    this.nodeValue = this.nodeValue.replace(/witnesses/ig, 'these dudes I know');
    this.nodeValue = this.nodeValue.replace(/allegedly/ig, 'kinda probably');
    this.nodeValue = this.nodeValue.replace(/new study/ig, 'Tumblr post');
    this.nodeValue = this.nodeValue.replace(/rebuild/ig, 'avenge');
    this.nodeValue = this.nodeValue.replace(/space/ig, 'spaaace');
    this.nodeValue = this.nodeValue.replace(/google glass/ig, 'Virtual Boy');
    this.nodeValue = this.nodeValue.replace(/smartphone/ig, 'Pokedex');
    this.nodeValue = this.nodeValue.replace(/electric/ig, 'atomic');
    this.nodeValue = this.nodeValue.replace(/senator/ig, 'Elf-Lord');
    this.nodeValue = this.nodeValue.replace(/car/ig, 'cat');
    this.nodeValue = this.nodeValue.replace(/election/ig, 'eating contest');
    this.nodeValue = this.nodeValue.replace(/congressional leaders/ig, 'River Spirits');
    this.nodeValue = this.nodeValue.replace(/homeland security/ig, 'Homestar Runner');
    this.nodeValue = this.nodeValue.replace(/could not be reached for comment/ig, 'is guilty and everyone knows it');
});