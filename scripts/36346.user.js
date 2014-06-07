// ==UserScript==
// @name           Forumwarz score obscurer
// @namespace      Forumwarz score obscurer
// @description    Disables Fail/win/score for posts
// @include        http://*forumwarz.com/discussions*
// ==/UserScript==

// hide comment points .
var spans = xpathArray('//span[contains(@id,"fail_win")]');
spans.forEach(function(s){
	s.innerHTML = '';
});

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