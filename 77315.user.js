// ==UserScript==
// @name          Ausgamers QGL Skin
// @namespace     http://www.qgl.org
// @description   Removes crap from Ausgamers QGL forum skin
// @include       http://www.ausgamers.com/forums/*
// @run-at document-start
// ==/UserScript==

var header = document.getElementById('Header');
header.style.display = 'none';

var compactfeatures = document.getElementById('CompactFeatures');
compactfeatures.style.display = 'none';
