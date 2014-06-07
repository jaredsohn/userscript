// ==UserScript==
// @name         Google Clock by Imre Attila
// @namespace     http://localhost/
// @description   Google Clock
// @include      http://*.google.*/*

// ==/UserScript==
var oldLogo = document.getElementById('hplogo');
var newLogo = document.createElement('embed');
newLogo.id = "SemperVideo-Logo";
newLogo.border = 'no'
//newLogo.src = 'http://img339.imageshack.us/img339/7638/micigoogle.jpg'; // A micimackós google használatához töröld ki a sor előtti // jeleket és a következő 3 sort, majd a második sorban az "embed" szót cseréld "img" -re
newLogo.src = 'http://flash-clocks.com/free-flash-clocks-blog-topics/free-flash-clock-152.swf';
newLogo.height = '110';
newLogo.width = '150';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);