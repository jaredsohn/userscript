// ==UserScript==
// @name          300mbUnited Link Plus
// @namespace     erosman
// @description   Adds Alternative Download links
// @updateURL     https://userscripts.org/scripts/source/443481.meta.js
// @downloadURL   https://userscripts.org/scripts/source/443481.user.js
// @include       http://www.300mbunited.me/*
// @grant         none
// @author        erosman
// @version       1.0
// ==/UserScript==

/* --------- Note ---------
  This script adds alternative linkbucks links in case some are not working.
  It also changes the old format linkbucks links to the new format.



  --------- History ---------


  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (frameElement) { return; } // end execution if in a frame/object/embedding points

var linkbucks = [
'allanalpass.com',
'amy.gs',
'any.gs',
'cash4files.com',
'deb.gs',
'drstickyfingers.com',
'dyo.gs',
'fapoff.com',
'filesonthe.net',
'freean.us',
'galleries.bz',
'goneviral.com',
'hornywood.tv',
'linkbabes.com',
'linkbucks.com',
'megaline.co',
'miniurls.co',
'picbucks.com',
'poontown.net',
'qqc.co',
'rqq.co',
'seriousdeals.net',
'sexpalace.gs',
'theseblogs.com',
'theseforums.com',
'tinylinks.co',
'tnabucks.com',
'tubeviral.com',
'ultrafiles.net',
'urlbeat.net',
'whackyvidz.com',
'youfap.me',
'yyv.co',
'zff.co',
];


var lb = document.querySelector('blockquote a');
if (!lb) { return; }  // end execution if not found

var m = lb.hostname.match(/([^.]+\.)?([^.]+\.[^.]+)$/);
var dom = m ? m[2] : 0;
if (linkbucks.indexOf(dom) === -1) { return; }    // end execution if not linkbucks

var key = lb.pathname.substr(1);                  // new format linkbucks
if (!key) {                                       // old format linkbucks
  key = m[1].slice(0, -1);
  lb.href = 'http://www.' + dom + '/' + key;
  lb.textContent = lb.href;
  lb.parentNode.appendChild(document.createTextNode(' (new format)'));
}

// template & temp container
var docfrag = document.createDocumentFragment();
var br = document.createElement('br');


for (var i = 0, len = linkbucks.length; i < len; i++) {

  if (linkbucks[i] === dom) { continue; }

  var a = lb.cloneNode(false);
  a.href = 'http://www.' + linkbucks[i] + '/' + key;
  a.textContent = a.href;
  docfrag.appendChild(br.cloneNode(false));
  docfrag.appendChild(a);

}


if (docfrag.hasChildNodes()) {
 lb.parentNode.appendChild(br.cloneNode(false));
 lb.parentNode.appendChild(br.cloneNode(false));
 lb.parentNode.appendChild(document.createTextNode('Alternative Links:'));
 lb.parentNode.appendChild(docfrag);
}


})(); // end of anonymous function