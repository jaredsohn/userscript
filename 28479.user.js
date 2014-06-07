// ==UserScript==
// @name           AutoResizeTextarea
// @namespace      http://d.hatena.ne.jp/javascripter/
// @include        http*
// ==/UserScript==

function autoResize(doc) {
  Array.forEach(doc.getElementsByTagName('textarea'),
  function(elem) {
    elem.style.overflowY = 'hidden';
    elem.style.height='auto';
    var min = elem.rows;
    elem.addEventListener('input',
    function() {
      this.rows = Math.max(min, this.value.split('\n').length);
    },
    false);

  })
}

autoResize(document.body);

window.AutoPagerize && window.AutoPagerize.addFilter(function(docs) {
  docs.forEach(autoResize)
});

