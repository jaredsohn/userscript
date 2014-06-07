// ==UserScript==
// @name           MDC_ja_to_en
// @namespace      http://d.hatena.ne.jp/javascripter/
// @include        http://developer.mozilla.org/ja/*
// ==/UserScript==
function ja2en(doc) {
  Array.forEach(doc.getElementsByClassName('new'),
  function(link) {
    link.href = 'http://developer.mozilla.org/en/docs/' + link.title;
  });
}

ja2en(document.body);

window.AutoPagerize && window.AutoPagerize.addFilter(function(docs) {
  docs.forEach(ja2en)
});

