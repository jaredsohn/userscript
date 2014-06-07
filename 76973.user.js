// ==UserScript==
// @name           BvS Jackpot Selecter
// @namespace      Ranatama
// @include        http://*animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==

var row1 = document.getElementsByName('rowone')[0];
var row2 = document.getElementsByName('rowtwo')[0];
var row3 = document.getElementsByName('rowthree')[0];
var row4 = document.getElementsByName('rowfour')[0];
var row5 = document.getElementsByName('rowfive')[0];

row1.checked = true;
row2.checked = true;
row3.checked = true;
row4.checked = true;
row5.checked = true;

var jack = document.getElementsByName('multijack')[0];
jack.checked = true;