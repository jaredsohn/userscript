// ==UserScript==
// @name        Jandan XX Post Hidden
// @namespace   -
// @description 隐藏煎蛋下面XX比较多的评论
// @include     http://jandan.net/*
// @version     1.1
// @rut-at      document-start
// @copyright   公有领域
// @grant       none
// ==/UserScript==

var isDisplay = function (support, unsupport) {
  return support * 1.05 + 2 > unsupport;
};

var styles = [
  'ol.commentlist>li:not(.tip):not([xx-display="display"]) { display: none !important; }'
].join('');

var doHidden = function () { try {
  var l = document.querySelectorAll('ol.commentlist>li[id^="comment"]:not(.tip):not([xx-display])'), i;
  for (i = 0; i < l.length; i++) (function (p) { try {
    var support = Number(p.querySelector('span[id^="cos_support"]').innerHTML);
    var unsupport = Number(p.querySelector('span[id^="cos_unsupport"]').innerHTML);
    var hidden = !isDisplay(support, unsupport);
    p.setAttribute('xx-display', hidden ? 'hidden' : 'display');
  } catch (e) {} }(l[i]));
} catch (e) {} };

var addStyle = function (s) {
  var t = document.createElement('style');
  t.innerHTML = s;
  document.querySelector('head').appendChild(t);
};

(function () {
  try { addStyle(styles); }
  catch(e) { setTimeout(arguments.callee, 1); }
}());

setInterval(doHidden, 20);


