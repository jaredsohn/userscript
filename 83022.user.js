// ==UserScript==
// @name           Reddit: Random link colors 
// @namespace      http://reddit.com/*
// @namespace      http://*.reddit.com/*
// @description    colors all links on reddit randomly
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*

var cols = "0123456789abcdef";
var links = document.getElementsByTagName( 'a' );

for ( var i = 0; i < links.length; i++ ) {
  var element = links[ i ];
  var col = "#";
  for (var j = 0; j < 6;j=j+1) 
    col = col + cols[Math.floor(Math.random()*16)];
  element.style.color = col;
}

// ==/UserScript==//
