// ==UserScript==
// @name          Google Image Relinker Mod
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5059
// @version       0.5.11
// @date          2010-10-27
// @copyright     2006-2010, thorbenhauer
// @license       GPL 2 or later
// @include       http://images.google.tld/images?*
// @include       http://www.google.tld/images?*
//                for Opera (which doesn't understand tld):
// @include       http://images.google.com/images?*
// @include       http://images.google.de/images?*
// @include       http://www.google.com/images?*
// @include       http://www.google.de/images?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
//
// Based on Google Image Relinker user script by Patrick Cavit
// http://userscripts.org/users/187
// Script location: http://userscripts.org/scripts/show/792 
//
// Copyright Notice by Patrick Cavit, pcavit@gmail.com:
// Copy, use, modify, spread as you see fit. Massive thanks go out to
// Eric Hamiter, this code is just a quick modification of his extension at
// http://roachfiend.com/
//
// With Modifications inspired by
// FurYy http://userscripts.org/users/1618
// Juhani Naskali http://userscripts.org/users/8345
// ekbworldwide http://userscripts.org/users/39581
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------

(function () { // function wrapper for Opera

/* set targetBlank = true for opening image links with target=_blank */
var targetBlank = true;
    
/* sites for which content-disposition HTTP response header workaround is
   enabled - use regular expressions here */
var sites = new Array(
//  /.*/, // CATCH ALL rule
//  /^http:\/\/(\d\.)?bp\d?\.blog(spot|ger)\.com\//, // header removed
//  /^http:\/\/img(\d)?\.blogs\.yahoo\.co\.jp\//
);
    
/* content-disposition HTTP response header workaround */
var q = document.evaluate("//input[@name = 'q']/@value", document, null,
  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (q != null) {
  q = q.value;
  if (q.indexOf(":girm:") == 0) {
    var s = q.split(":girm:");
    var url = s[1].replace(/link:/, '');
    var context = s[2].replace(/context:/, '');
    document.body = document.createElement("body");
    document.body.innerHTML = "<a href=\"" + context +
      "\" style=\"color: white\" title=\"Click to see the full site\">" +
      "<img src=\"" + url + "\"></a>";
    document.getElementsByTagName("head")[0].innerHTML = "";
    return;    
  }
}

var elem = document.evaluate("//div[@id = 'rg']", document, null,
  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elem) {
  elem.addEventListener("DOMNodeInserted",
    function (event) {
      if (event.target.id == "rg_h") {
        createLinksDynamic(event.target); 
      }
    }, true);
}

function createLinksDynamic(div) {
  var googLink = document.evaluate(".//a[contains(@href, " +
    "'/imgres?imgurl=')][contains(@href, '&imgrefurl=')]",
    div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var googFont = document.evaluate(".//span[@id = 'rg_hr']",
    div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var gmatch, contextLink, imgLink;       
  gmatch = googLink.href.match(/&imgrefurl=(.*?)(&start=|&h=|&usg=)/);
  contextLink = decodeURIComponent(gmatch[1]);
  googFont.innerHTML = "<a href=\"" + contextLink + "\">" + googFont.innerHTML +
    "</a>";
  gmatch = googLink.href.match(/\/imgres\?imgurl=(.*?)&imgrefurl=/);
  imgLink = decodeURIComponent(gmatch[1]);
  /* content-disposition HTTP response header workaround */
  for (var j = 0; j < sites.length; j++) {
    if (imgLink.search(sites[j]) > -1) {
      imgLink = "http://images.google.com/images?gbv=1&q=" +
        ":girm:link:" + encodeURIComponent(imgLink) + ":girm:context:" +
        contextLink;
      break;
    }
  }
  googLink.href = imgLink;
  if (targetBlank) {
    googLink.setAttribute("target", "_blank"); 
  }
}

/* JS disabled */

var googLinks = document.evaluate("//td/a[contains(@href, " +
  "'/imgres?imgurl=')][contains(@href, '&imgrefurl=')]",
  document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var googFonts = document.evaluate("//font[contains(@color, '#0e774a')]",
  document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var link, gmatch, font, newDiv, newLink, contextLink, imgLink;       
for (var i = 0; i < googLinks.snapshotLength; i++) {
  link = googLinks.snapshotItem(i);
  font = googFonts.snapshotItem(i);
  gmatch = link.href.match(/&imgrefurl=(.*?)(&start=|&h=|&usg=)/);
  contextLink = decodeURIComponent(gmatch[1]);
  font.innerHTML = "<a href=\"" + contextLink + "\">" + font.innerHTML +
    "</a>";
  if (font.parentNode.getAttribute("framedView") == null) {
    newDiv = document.createElement("div");
    newDiv.setAttribute("style", "margin-top: 2px; font-size: x-small;");
    newLink = document.createElement("a");
    font.parentNode.setAttribute("framedView", "set");
    newLink.href = link.href;
    newLink.innerHTML = "Framed View";
    newDiv.appendChild(newLink);
    font.parentNode.appendChild(newDiv);
  }
  gmatch = link.href.match(/\/imgres\?imgurl=(.*?)&imgrefurl=/);
  imgLink = decodeURIComponent(gmatch[1]);
  /* content-disposition HTTP response header workaround */
  for (var j = 0; j < sites.length; j++) {
    if (imgLink.search(sites[j]) > -1) {
      imgLink = "http://images.google.com/images?gbv=1&q=" +
        ":girm:link:" + encodeURIComponent(imgLink) + ":girm:context:" +
        contextLink;
      break;
    }
  }
  link.href = imgLink;
  if (targetBlank) {
    link.setAttribute("target", "_blank"); 
  }
}


})(); // function wrapper for Opera