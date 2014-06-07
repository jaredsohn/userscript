// ==UserScript==
// @name           Reddit Ignorance is Bliss
// @namespace      Reddit Ignorance is Bliss
// @description    Hides: comment points, story points, downvote arrows in comments and karma panels
// customized "Reddit forget comment points" script by lazyttrick
// special thanks to reddit users shub and checksinthemail for their help
// @include        http://*reddit.com/*
// ==/UserScript==

////////////////////////////////////////////////

// hide comment points .
var spans = xpathArray('//span[contains(@id,"score_t1")]');
spans.forEach(function(s){
	s.innerHTML = '';
});

// hide article points .
var spans = xpathArray('//span[contains(@id,"score_t3")]');
spans.forEach(function(s){
	s.innerHTML = '';
});

// hide comment arrows.
var divs = xpathArray('//div[contains(@id,"down_t1_")]');
divs.forEach(function(d){
	d.style.display = "none";
});

// hide submission upvote/downvotes.
var divs = xpathArray('//div[(@class="raisedbox linkinfo")]');
divs.forEach(function(d){
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