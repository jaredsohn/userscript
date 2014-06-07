// ==UserScript==
// @name          Zhihu Unfolder
// @include       http://www.zhihu.com/*
// ==/UserScript==

(function () {
  // Div for folded answers
  var ans_div = 'xmf';
  // Div containing link to toggle folding
  var fold_link = 'xmdw';

  var ans = document.getElementById(ans_div).style;
  ans.cssText = "display: block;";
  var fd = document.getElementById(fold_link);
  fd.childNodes.item(3).setAttribute('name', 'collap');
  fd.className += " xbe";
})();