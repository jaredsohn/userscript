// ==UserScript==
// @name        No thank you
// @namespace   NOTHANKYOU
// @include     https://crowdworks.jp/dashboard
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @version     1
// ==/UserScript==

// NG word (RegExp)：
var ngwords = /hoeg|fuga/i;

GM_addStyle('._GM_wordFilter { display: none !important; }');
var wordFilter = function (elem) {
  var thanks = elem.querySelector('a').textContent;
  if (ngwords.test(thanks)) {
    elem.parentNode.classList.add('_GM_wordFilter');
  }
}
function init() {
  Array.prototype.forEach.call(document.querySelectorAll('.notice .message'), function(elem) {
    wordFilter(elem);
  });
}
init();