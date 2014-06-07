// ==UserScript==
// @name            Script Para mybrute.com, elbruto.es labrute.fr
// @namespace       http://kings-darkness.es.tl
// @description     Script Para mybrute.com, elbruto.es labrute.fr
// @include http://*.labrute.fr/cellule
// @include http://*.elbruto.es/cellule
// @include http://*.mybrute.com/cellule
// ==/UserScript==
var oLevelBar = document.getElementsByClassName('levelBar')[0];
var oLevelTxt = document.createElement('div');

var sLevelPercent = oLevelBar.style.width;
var sLevel = new String(sLevelPercent).substr(0, sLevelPercent.length - 1);

oLevelTxt.innerHTML = '<a href="http://stile.dog.mybrute.com" title="get this cool add-on at userscripts.org" target="_blank">' + new Number(sLevel).toFixed(2) + '%</a>';

oLevelTxt.style.width = '100px'; //oLevelBar.parentNode.style.width
oLevelTxt.style.fontSize = '12px';
oLevelTxt.style.textAlign = 'center';

document.getElementsByClassName('level')[0].appendChild(oLevelTxt);


// ==UserScript==
// @name           Remueve Publicidad
// @namespace       http://kings-darkness.es.tl
// @description    Remueve publicidad de mybrute.com, elbruto.es labrute.fr
// @include        http://*.mybrute.com/*
// @include        http://*.elbruto.es/*
// @include        http://*.labrute.fr/*
// ==/UserScript==

/* ChangeLog
  0.3.1 - Dec 10, 2009
  - New: Remove header clutter.
  - Fix: Avoid null element on 'what fight?' page.

  0.3.0 - Dec 7, 2009
  - New: Option to remove text and image clutter in addition to the ads.
  - Fix: Adjust page when watching a recorded fight.

  0.2.0 - Dec 5, 2009
	- New: Remove ads from fight page.
	- New: Navigation aid: Option to show links as soon as the fight page is loaded.
	- New: Remove xmas ads from cellule page.
*/

// Settings
var showLinks     = true;
var removeClutter = true;

// Initialization
var adClasses = ['cellulePub', 'teamPub', 'pub', 'btn-iphone', 'btn-tshirt'];
var page      = /^\/(\w*)/.exec(location.pathname)[1];

// Main logic
removeAllAds();
removeAllClutter();

// Core Functions
function removeAllAds() {
  adClasses.forEach(removeByClass);
  adjustFightPage();
}

function adjustFightPage() {
  if(!onFightPage()) return;
  var element = document.getElementById('debrief');
  if(!element) return;
  element.style.marginLeft = "244px";
  if(showLinks) element.style.display = "block";
  element = document.getElementById('swf_client');
  element.style.marginLeft = "244px";
}

function removeAllClutter() {
  if(!removeClutter) return;
  removeBySelector(".url, #headArtworkLeft, #headArtworkRight");
  removePageClutter();
}

function removePageClutter () {
  var selectors = {
    "cellule": "div.caracs>p, div.objects>:first-child",
    "arene"  : ".caracs>.center>img, .areneRight>div:not([id]), .areneRight>img" }
  selector = selectors[page];
  if(selector) removeBySelector(selector);
}

// Helpers
function removeNode(node) { node.parentNode.removeChild(node); }
function removeByClass(cssClass) { Array.forEach(document.getElementsByClassName(cssClass), removeNode); }
function removeBySelector(cssSelector) { Array.forEach(document.querySelectorAll(cssSelector), removeNode); }
function onFightPage() { return page == 'fight' || page == 'tf' }