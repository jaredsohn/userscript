// ==UserScript==
// @name          Linkbucks Plus
// @namespace     erosman
// @description   Adds Additional Linkbucks Clone-Domains Links
// @updateURL     https://userscripts.org/scripts/source/465680.meta.js
// @downloadURL   https://userscripts.org/scripts/source/465680.user.js
// @include       http://minirlss.net/*-mkv/*
// @include       http://minishares.org/*
// @grant         none
// @author        erosman
// @version       1.1
// ==/UserScript==

/* --------- Note ---------
  This script adds alternative linkbucks links in case some are not working or blocked.
  It also changes the old format linkbucks links to the new format.
  All links use the same ID and lead to the same place.
  Click on the arrow next to the link to get additional links.



  --------- History ---------


  1.1 Code & Style Improvement
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


var lb = document.querySelectorAll('a[href*=".linkbucks.com"]');
if (!lb[0]) { return; }  // end execution if not found


// templates & containers
var docfrag = document.createDocumentFragment();
var br = document.createElement('br');

var a = document.createElement('a');              // link template
a.style.color = '#4682b4';

var span = document.createElement('span');        // span for the arrow
span.setAttribute('style', 'color: #ffd700; font-size: 1.5em; margin-left: 20px; cursor: pointer;');
span.textContent = '\u27a4';
span.title = 'Click for more links';

var div0 = document.createElement('div');         // background
var div1 = div0.cloneNode(false);                 // main container
var div2 = div0.cloneNode(false);                 // header
var div3 = div0.cloneNode(false);                 // links container

div0.setAttribute('style',
  'display: none; margin: 0; background-color: rgba(0, 0, 0, 0.8); width: 100%; height: 100%; ' +
  'position: fixed; top: 0; left: 0; transition: all 1s ease-in-out 0s; opacity: 0; z-index: 9999');

div1.setAttribute('style',
  'color: #2f4f4f; text-align: left; border-radius: 15px; margin: auto; background-color: #eee; ' +
  'font-size: 14px; line-height: normal; font-family: "Open Sans",Verdana,Arial,sans-serif;' +
  'position: fixed; top: 0; right: 0; bottom: 0; left: 0; width: 350px; height: 500px;');

div2.setAttribute('style',
  'font-size: 1.2em; padding: 10px; border-radius: 15px 15px 0 0; '+
  'background: #aaa linear-gradient(to bottom, #ddd, #aaa); ' +
  'text-shadow: 0px -1px 1px #999, 0px 1px 0px #eee; box-shadow: 0px 0.2em 0.5em #000;');
div2.textContent = 'Alternative Links';

var sp1 = span.cloneNode(false);                  // close button
sp1.setAttribute('style',
  'color: #fff; margin-right: 10px; padding: 0.3em 0.5em; font-size: 0.7em; font-weight: bold;' +
  'border-radius: 25px; float: right; cursor: pointer;' +
  'background: #f12519 linear-gradient(to bottom, #b00, #f00, #800);');
sp1.textContent = 'X';
sp1.title = 'Close';
div2.appendChild(sp1);
sp1.addEventListener('click', getOnclick, false);

div3.setAttribute('style',
  'padding: 10px; margin-top: 10px; max-height: 400px; ' +
  'overflow: auto; overflow-y: scroll !important;');

div0.appendChild(div1);
div1.appendChild(div2);
div1.appendChild(div3);
document.body.insertBefore(div0, document.body.firstChild);


// add clickable arrow
for (var i = 0, len = lb.length; i < len; i++) {

  var sp = span.cloneNode(true);
  sp.id = lb[i].pathname === '/' ? lb[i].hostname.match(/[^.]+/) : lb[i].pathname.slice(1);
  lb[i].parentNode.insertBefore(sp, lb[i].nextSibling);
  sp.addEventListener('click', genLinks, false);
}


// generate clone-domain links
function genLinks() {

  var key = this.id;

  for (var i = 0, len = linkbucks.length; i < len; i++) {

    var lnk = a.cloneNode(false);
    lnk.href = 'http://www.' + linkbucks[i] + '/' + key;
    lnk.textContent = lnk.href;
    docfrag.appendChild(lnk);
    docfrag.appendChild(br.cloneNode(false));
  }

  if (docfrag.hasChildNodes()) {
    div3.textContent = '';                        // clear content
    div3.appendChild(docfrag);
    div0.style.display = 'block';
    window.getComputedStyle(div0).opacity;
    div0.style.opacity = 1;
  }
}

// close button
function getOnclick() {

  div0.style.opacity = 0;
  setTimeout(function(){ div0.style.display = 'none'; }, 1000);
}

})(); // end of anonymous function
