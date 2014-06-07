// ==UserScript==
// @name           hatena star everywhere
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        *
// @exclude        http://s.hatena.ne.jp/*
// ==/UserScript==

function click(target) {
  var evt = document.createEvent('MouseEvents');
  evt.initEvent('click', true, true);
  evt.element = function (){ return evt.target; }
  target.dispatchEvent(evt);
}

addEventListener('load', function() {
  Array.filter(document.getElementsByTagName('img'), function (e) {
    return e.alt == 'Add Star';
  }).forEach(function(e) {
    click(e);
  });
}, false);
