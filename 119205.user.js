// ==UserScript==
// @name           youtube link to sirius song
// @namespace      alexismejias.com
// @include        http://*siriusxm.com/*
// ==/UserScript==
var artist = document.getElementById('band36').innerHTML;
var song = document.getElementById('song36');
var ele = document.createElement('a');
ele.setAttribute('href','http://www.youtube.com/results?search_query='+artist+song.innerHTML);
var txt = 'youtube link';
var node = document.createTextNode(txt);
ele.appendChild(node);
song.appendChild(ele); 