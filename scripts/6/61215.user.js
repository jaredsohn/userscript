// ==UserScript==
// @name           Bedre VG
// @namespace      misund
// @description    Få vg.no til å se mer fornuftig ut
// @include        http*vg.no/*
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://server.hemmeligadresse.com/greasemonkey/vg.css';
cssNode.media = 'screen';
headID.appendChild(cssNode);

var bodyID = document.getElementsByTagName("body")[0];
var cred = document.createElement('div');
cred.id = 'cred';
cred.innerHTML = '<p>Stylet av <span id="design-cred"><a href="http://hemmeligadresse.com/bloggdesign/">Thomas Misund</a></span></p>';
bodyID.appendChild(cred);