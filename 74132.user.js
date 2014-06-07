// ==UserScript==
// @name           Fix links
// @include        https://www.flashback.org/*
// ==/UserScript==

(function () {

var leave = "https://www.flashback.org/leave.php?u=";

$x("//a[starts-with(@href, '" + leave + "')]").forEach(function (element)
{
GM_log("In loop");
	element.href = unescape(element.href.replace(leave, "")).replace(/&amp;/gi, "&");
	if (!element.href.match(/:\/\//))	// No protocol, add http
		element.href = "http://" + element.href;
});



function $x(expression, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(expression, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

})();