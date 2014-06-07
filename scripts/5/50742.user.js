// ==UserScript==
// @name            Antiques Roadshow Re-Suspenser
// @namespace       http://turnt.org
// @description		hides appraisal value on Antiques Roadshow site, thus resuspensifying.
// @include         http://www.pbs.org/wgbh/roadshow/*
// ==/UserScript==

//  by brian dowtin 
//     The best part of Antiques Roadshow is guessing the value of an item
//      The website version puts the values right out there - spoiling the fun
//      I got tired of trying to cover up the answer so this simple little oneliner 
//      finds the prices and hides them - making antiques roadshow on line just as fun as the real deal

var match_re = new RegExp(/\$[\d,]*/g);
document.body.innerHTML = document.body.innerHTML.replace(match_re,'');