// ==UserScript==
// @name           Twitter - NG Word Filter
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @description    Hide NG word
// @version        0.2
// @date           20121111
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @grant          GM_addStyle
// @grant          GM_registerMenuCommand
// ==/UserScript==

// NG word (RegExp)：
var ngwords = /#4ji|#followme|I'm at/i;

// user name：
// GM_addStyle('.tweet[data-name="USER_NAME1"], .tweet[data-name="USER_NAME2"] {display:none !important;}');


GM_addStyle('._GM_wordFilter { display: none !important; border: 3px dashed red; }');
// GM_addStyle('._GM_wordFilter { background-color:pink !important; border: 3px dashed red; }'); //debug
var wordFilter = function (elem) {
  var tweet = elem.querySelector('.js-tweet-text').textContent;
  if (ngwords.test(tweet)) {
    elem.classList.add('_GM_wordFilter');
  }
}
function init() {
  Array.prototype.forEach.call(document.querySelectorAll('.stream-item'), function(elem) {
    wordFilter(elem);
  });
}
init();

var MutationObserver =  unsafeWindow.MutationObserver ||
                        unsafeWindow.WebKitMutationObserver ||
                        unsafeWindow.MozMutationObserver;
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    for (var i = 0, len = mutation.addedNodes.length; i < len; i++) {
      var elem = mutation.addedNodes[i];
      if (elem.id && elem.id.indexOf('stream-item-tweet') !== -1) {
        wordFilter(elem);
      }
    }
  });
});
observer.observe(document.getElementById('stream-items-id'), { childList: true });

GM_addStyle('._GM_wordFilterMark { display: block !important; }');
GM_registerMenuCommand("Twitter - NG Word Filter > visible", function() {
  Array.prototype.forEach.call(document.querySelectorAll('._GM_wordFilter'), function(elem) {
    elem.classList.add('_GM_wordFilterMark');
  });
});