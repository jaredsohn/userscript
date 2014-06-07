// ==UserScript==
// @name           CalilPagerize
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://calil.jp/*
// @version        0.1
// @date           2010081403
// ==/UserScript==

var $ = unsafeWindow.$;

function ap(node) {
  $('.thumbnail', node).each(function() {
    $(this).animate({ opacity: 1 },500);
  });

  var Calil = unsafeWindow.Calil;
  var list = Calil.isbn_list = [];
  $('.libinfo', node).each(function() {
    list.push(this.id);
  });
  Calil.search();
}

document.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
  var node = evt.target;
  ap(node);
}, false);