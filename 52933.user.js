// ==UserScript==
// @name          Oodler
// @namespace     http://userscripts.org/users/95591
// @description	  It pwns
// @include       http://www.gsn.com/games/free/*
// @include       http://www.gsn.com/shows/*
// ==/UserScript==

var str = document.getElementById('currencychallenge').innerHTML

var patt = /(?=.*)question_popup.*?'\);/m

var js = str.match(patt)

window.setTimeout(js, 500);
