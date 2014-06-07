// ==UserScript==
// @name          Rllmuk adblock
// @namespace     http://thedespinator.com/rllmukadblock
// @description   Removes ads from rllmuk
// @include       http://www.rllmukforum.com/*
// @include       http://www.rpsoft.co.uk/*
// @include       http://www.extranoise.co.uk/*
// @include       http://rllmukforum.com/*
// @include       http://rpsoft.co.uk/*
// @include       http://extranoise.co.uk/*
// ==/UserScript==

var theDivs = document.getElementsByTagName("div");

var theDiv = theDivs[0];
theDiv.style.display = 'none';

theDiv = theDivs[theDivs.length-1];
theDiv.style.display = 'none';