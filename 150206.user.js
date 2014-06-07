// ==UserScript==
// @name           World Wide Wabbit
// @namespace      http://www.webwalter.com/
// @description    All The Web is a Wabbit
// @include        http://*.the-west.*/game.php*
// @include        http://*.the-west.*
// @include	   http://*.facebook.com/*
// @include	   http://tw-db.info/*
// @include	   http://*.tribalwars.com.*
// @include	   http://*.tribalwars.com.pt/*
// @include        http*://*.youtube.com/*
// @include        http*://youtube.com/*
// @include        https://*.facebook.*
// @include        http://ask.fm/*
// @exclude	   http://*.atualsistemas.*/
// ==/UserScript==

var head = document.getElementsByTagName("head")[0];
if (!head) return;

var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9YGDhUWA/hQUvcAAAAVdEVYdENyZWF0aW9uIFRpbWUAB9YGDhUSKZKGvVUAAAAKSURBVAgdY2AAAAACAAHPyDXlAAAAAElFTkSuQmCC");
head.appendChild(link);

if (document.title.indexOf(wabbit) > -1) wabbit = "";
var docTitle = document.title == "" ? location.href : document.title;
document.title = wabbit + docTitle;