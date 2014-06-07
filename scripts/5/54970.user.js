// ==UserScript==
// @name           Ask.com remove sponsored results
// @namespace      http://www.askremovesponsoredresults.org/
// @description	  Removes sponsored results because they're usually disguised as normal results
// @include        http://www.ask.com/web?*
// ==/UserScript==

GM_log("Starting Ask.com remove sponsored results");

function getElementsByClassName(classname, node) {
  if (!node) {
    node = document.getElementsByTagName("body")[0];
  }
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i = 0,j = els.length; i < j; ++i) {
    if (re.test(els[i].className)) {
      a.push(els[i]);
    }
  }
  return a;
}

var adBlocks = getElementsByClassName("spl_shd_plus")
for (var i = 0; i < adBlocks.length; ++i) {
  adBlocks[i].style.display = "none";
}