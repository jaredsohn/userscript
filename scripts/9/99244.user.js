// ==UserScript==
// @name          magnetkugels gc-print-optimation
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Geocache Ausdruck optimieren
// @include       http://www.geocaching.com/seek/cdpf.aspx*
// ==/UserScript==

//entfernt leerzeichen aus strings
function trim (zeichenkette) {
  return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');
}

//cache-informationen ermitteln
var cacheID = trim(document.getElementById('Header').getElementsByTagName('h1')[1].textContent);
var cacheName = trim(document.getElementById('Content').getElementsByTagName('h2')[0].textContent);
var cacheSymbol = document.getElementById('Content').getElementsByTagName('h2')[0].getElementsByTagName('img')[0];
var cachePlacedby = trim(document.getElementsByClassName('Meta')[0].textContent);
var cachePlaceddate = trim(document.getElementsByClassName('Meta')[1].textContent);
cachePlaceddate = cachePlaceddate.substr(13,10);

//pagetitle
document.getElementById('pageTitle').innerHTML = (cacheID + " - " + cacheName);

//text-knoten erstellen
var cacheID = document.createTextNode(" " + cacheID + " - ");
var cacheName = document.createTextNode(cacheName);

//cachename als Überschrift gestalten (symbol, id, name)
document.getElementById('Content').getElementsByTagName('h2')[0].innerHTML = "";
document.getElementById('Content').getElementsByTagName('h2')[0].appendChild(cacheSymbol);
document.getElementById('Content').getElementsByTagName('h2')[0].appendChild(cacheID);
document.getElementById('Content').getElementsByTagName('h2')[0].appendChild(cacheName);

//placed by stevo on 12/11/2011
document.getElementsByClassName('Meta')[0].textContent = (cachePlacedby + " on " + cachePlaceddate);

//weck mit dem schas
document.getElementById('Header').style.display = "none";
document.getElementById('Footer').style.display = "none";
document.getElementsByClassName('UTM Meta')[0].style.display = "none";
document.getElementsByClassName('Meta')[1].style.display = "none";
document.getElementsByClassName('item')[8].getElementsByTagName('div')[0].style.display = "none";
document.getElementsByClassName('item-header')[1].style.display = "none";
document.getElementsByClassName('item-header')[2].style.display = "none";
document.getElementsByClassName('item-header')[4].style.display = "none";
document.getElementsByClassName('item-content')[2].style.marginTop = "10px";
document.getElementsByClassName('NoSpacing')[0].textContent = "";
