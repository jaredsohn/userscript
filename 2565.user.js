/* Time-stamp: "2006-01-09 01:59:01 AST" -*-coding: latin-1;-*-             Âµ */
// ==UserScript==
// @name          YahooWeather_simplifier
// @description   simplify design of Yahoo Weather pages
// @include       http://weather.yahoo.com/forecast/*
// @version       0.0.2
// @namespace     http://interglacial.com/~sburke/pub/
// ==/UserScript==
/*  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
    !!
    !! This is a Greasemonkey user script.
    !! See http://greasemonkey.mozdev.org/ for info on using such things.
    !!
    -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
*/

var DEBUG = 0;
function trace (level,msg) { if(DEBUG >= level) GM_log(msg); return; }

if (     // Basic sanity
 document && document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body
) {

 global_css( [
   'img,td[width="180"],form,',
   //'table[height="100"],',
   'div#west	{ display: none }'
   //,
   //'table[width="750"],tr[width="750"],td[width="750"] { width: auto !important; }'
 ].join("\n"));

 var tables = document.getElementsByTagName("table");
 for(var i = 0; i < tables.length; i++) {
   var t = tables[i];
   var w = t.getAttribute('width');
   if(!w) continue;
   trace(3, "width= " +  w.toString());
   if( /^[0-9]+$/.test(w.toString()) && (1*w) > 300 ) {
     trace(2, "Turning " + w.toString() + " to nix." );
     t.setAttribute('width', '100%');
     //t.removeAttribute('width');
     t.style.width = "100%";
   }
 }
}


function global_css (cssdata) {
  var style = document.createElement("style");
  style.setAttribute("type", 'text/css');
  style.setAttribute("media", 'screen');
  style.appendChild( document.createTextNode( cssdata ) );
  get_head().appendChild(style);
  return style;
}

function get_head () {
  var head;
  head = document.body.previousSibling;    // most common case
  if(head && head.nodeName == "HEAD") { return head; }
  head = document.getElementsByTagName("head")[0]; // slower but surer
  if(!head) throw "No head?!";
  return head;
}

//~~~ More fun at http://interglacial.com/hoj/ for you JavaScript goons! ~~~
//End
