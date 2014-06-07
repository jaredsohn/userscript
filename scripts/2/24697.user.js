/* Time-stamp: "2008-01-01 01:14:18 AST" -*-coding: latin-1;-*-             Âµ */
// ==UserScript==
// @name          No_Background_Images
// @description   This deletes background images on web pages
// @include       *
// @author        Rezy
// @version       0.0.1
// @namespace     http://www.orkut.com/Community.aspx?cmm=33337390
// ==/UserScript==
/*
 This is a Greasemonkey user script.
 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
*/
var Apply_immediately = true;  /*
 true means we go right ahead and kill all background images
 false means that this is just an option you can select under "View: Page Style"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

if (     // Basic sanity
 document && document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body
) {
  (
   Apply_immediately ? global_css : alternative_css 
  )( 'body, * { background-image: none !important; }', "NoBgImages");
}

function global_css (cssdata) {
  var style = document.createElement("style");
  style.setAttribute("type", 'text/css');
  style.setAttribute("media", 'screen');
  style.appendChild( document.createTextNode( cssdata ) );
  get_head().appendChild(style);
  return style;
}

function alternative_css (cssdata,title) { // a.k.a. alternate stylesheet, etc
  var link = document.createElement("link");
  link.setAttribute("href", css2data(cssdata));
  link.setAttribute("title", title || "NoBgImages");
  link.setAttribute("rel", "alternate stylesheet");
  link.setAttribute("type", 'text/css');
  link.setAttribute("media", 'screen');
  get_head().appendChild(link);
  return link;
}

function get_head () {
  var head;
  head = document.body.previousSibling;    // most common case
  if(head && head.nodeName == "HEAD") { return head; }
  head = document.getElementsByTagName("head")[0]; // slower but surer
  if(!head) throw "No head?!";
  return head;
}

function css2data (dat) {
  return 'data:text/css,' + encodeURIComponent(dat);
}

//~~~ More fun at http://interglacial.com/hoj/ for you JavaScript goons! ~~~
//End