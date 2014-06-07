// ==UserScript==
// @name           My Brute Ad Sweeper
// @description    Removes advertising from My Brute sites mybrute.com, elbruto.es and labrute.fr
// @version        0.3.5
// @include        http://*.mybrute.com/*
// @include        http://*.elbruto.es/*
// @include        http://*.labrute.fr/*
// @include        http://*.meinbrutalo.de/*
// ==/UserScript==

// Settings
var showLinks     = true;
var removeClutter = true;

// Initialization
var allAds = '.btn-iphone+div:not([id]), .btn-iphone, .cellulePub, .teamPub, .pub, .btn-tshirt';
var page   = /^\/(\w*)/.exec(location.pathname)[1];

// Main logic
removeBySelector(allAds);
adjustFightPage();
removeAllClutter();

// Core Functions
function adjustFightPage() {
  if(!onFightPage()) return;
  var element = document.getElementById('debrief');
  if(!element) return;
  removeBySelector("a[href*='trax.motion-twin.com']");
  element.style.marginLeft = "244px";
  if(showLinks) element.style.display = "block";
  element = document.getElementById('swf_client');
  element.style.marginLeft = "244px";
}

function removeAllClutter() {
  if(!removeClutter) return;
  removeBySelector(".url, #headArtworkLeft, #headArtworkRight, #footer");
  removePageClutter();
}

function removePageClutter () {
  var selectors = {
    "cellule": "div.caracs>p, div.objects>div:not([id])",
    "arene"  : ".caracs>.center>img, .areneRight>div:not([id]), .areneRight>img" }
  selector = selectors[page];
  if(selector) removeBySelector(selector);
}

// Helpers
function removeNode(node) { node.parentNode.removeChild(node); }
function removeBySelector(cssSelector) { each(document.querySelectorAll(cssSelector), removeNode); }
function onFightPage() { return page == 'fight' || page == 'tf' }
function each(list, func) { for (var i = 0, e; e = list[i]; i++) { func(e); } }