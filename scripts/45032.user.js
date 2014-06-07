// ==UserScript==
// @name           Reddit Ignorance is Bliss v2
// @namespace      Reddit Ignorance is Bliss v2
// @description    Hides: comment points, story points, downvote arrows in comments and karma panels
// updated "Reddit Ignorance is Bliss" script as the original stopped working after changes on Reddit were made
// by ProducedRaw, original script by lazyttrick
// @include        http://*reddit.com/*
// ==/UserScript==

////////////////////////////////////////////////

// hide points
var divs = xpathArray('//div[contains(@class,"score")]');
divs.forEach(function(s){
    s.innerHTML = '';
});

// hide vote arrows
var divs = xpathArray('//div[contains(@class,"arrow down")]');
divs.forEach(function(d){
    d.style.display = "none";
});

// hide comment points
var spans = xpathArray('//span[contains(@class,"score")]');
spans.forEach(function(d){
    d.style.display = "none";
});

///////////////////////////////////////////////

function xpathArray(p, context) {
  if (!context)
    context = document;
  var i, arr = [], xpr = xpath(p, context);
  for (i = 0; item = xpr.snapshotItem(i); i++)
    arr.push(item);
  return arr;
}

function xpath(p, context) {
  if (!context)
    context = document;
  return document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
} 