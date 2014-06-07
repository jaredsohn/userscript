// ==UserScript==
// @name          Sort PW New Releases
// @namespace     http://splib.pbworks.com
// @description   Sort Publishers Weekly new releases by size of print run.
// @include       http://www.publishersweekly.com/*
// @creator       Cab Vinton
// @source        http://userscripts.org/scripts/show/
// @identifier    http://userscripts.org/scripts/source/
// ==/UserScript==

var elem = document.getElementById("article").
	getElementsByTagName("span")[1].
	getElementsByTagName("span")[0];

// extract lines into array
var lines = [];
elem.innerHTML.replace(/.+?\d+\s+copies\.\s*<br>/g, function($0) { lines.push($0) } );

// sort an array
            lines.sort(function(a, b) {
                 function getNum(p) {
                     return parseInt(
                          p.match(/([\d,]+)\s+copies/)[1].replace(/,/g, ""),10);
                 }
                 return getNum(a) - getNum(b);
        });

// put it back
elem.innerHTML = lines.join("");