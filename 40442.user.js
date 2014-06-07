// ==UserScript==
// @name           embiggen
// @namespace      atdhe
// @include        http://atdhe.net/*
// ==/UserScript==

//this script will embiggen a video hosted on atdhe.net to pretty much as big as you can make it without actually fullscreening it.  I admit there is very little reason why you would want this, but I have one.

var w = document.getElementsByTagName('embed')[0];
var size;

size = document.documentElement.clientWidth - 90;
w.setAttribute('width',size);
size = window.innerHeight - 90;
w.setAttribute('height',size);


w=document.getElementById('myId');

size = document.documentElement.clientWidth - 40;
w.setAttribute('width',size);
size = window.innerHeight - 90;
w.setAttribute('height',size);
