// ==UserScript==
// @name           Google ssl top bar
// @description    Google ssl top bar
// @include        https://*.google.com/*
// @author         Wim De Rammelaere
// @copyright      2010 by Wim De Rammelaere
// @license        AGPL v3+
// @version        1.01
// @lastupdated    2010-10-24
// ==/UserScript==
/*

Google ssl topbar

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License at <http://www.gnu.org/licenses>.
*/

var query = null;

// get query element
var forms = document.getElementsByTagName("form");
for (var i = 0, f; (f = forms[i]); i++) {
  if ( f.action.indexOf("/search") !=-1 ) { // just the search box
    for (var gw=document.getElementsByName("q"), j=0, g; (g = gw[j]); j++) {
      if (j == 0) { query = g.value; }
    }
  }
}


var linksdiv = document.createElement('div');
linksdiv.setAttribute('id', 'gbar');

// Google web
var webtext = document.createElement('a');
webtext.href = "http://www.google.com/search?q="+query;
var webcontent = document.createTextNode('Web');
webtext.appendChild(webcontent);
webtext.setAttribute('class', 'gb1');


var nbsp = document.createTextNode('\u00A0');

// Google Images
var imageslink = document.createElement('a');
imageslink.href = "http://images.google.com/images?q="+query;
var imagescontent = document.createTextNode('Images');
imageslink.appendChild(imagescontent);
imageslink.setAttribute('class', 'gb1');


var nbsp2 = document.createTextNode('\u00A0');

// Google Videos
var videolink = document.createElement('a');
if(query=='')
videolink.href = "http://video.google.com/";
else
videolink.href = "https://www.google.com/search?q="+query+"&tbs=vid:1";
var videocontent = document.createTextNode('Videos');
videolink.appendChild(videocontent);
videolink.setAttribute('class', 'gb1');


var nbsp3 = document.createTextNode('\u00A0');

// Google Maps
var gmapslink = document.createElement('a');
gmapslink.href = "https://maps.google.com/maps?f=q&hl=en&geocode=&q="+query+"&ie=UTF8&z=12&iwloc=addr&om=1";
var gmapscontent = document.createTextNode('Maps');
gmapslink.appendChild(gmapscontent);
gmapslink.setAttribute('class', 'gb1');

// putting the topbar together
linksdiv.appendChild(webtext);
linksdiv.appendChild(nbsp);
linksdiv.appendChild(imageslink);
linksdiv.appendChild(nbsp2);
linksdiv.appendChild(videolink);
linksdiv.appendChild(nbsp3);
linksdiv.appendChild(gmapslink);

try {

  var gog=document.getElementById("gog");
  gog.insertBefore(linksdiv, gog.firstChild);
  linksdiv.style.display = "block";

} catch(e) {
}


