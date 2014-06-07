// ==UserScript==
// @name           Google Search - Remove Redirection
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.tld/search?*
// @version        2.02
// @description	   Remove annoying redirection from links in Google search
// ==/UserScript==

handle(document);

function handle(doc) {
  var links = document.evaluate('descendant::a', doc, null, 7, null);
  for (var i = 0; i < links.snapshotLength; i++){
    links.snapshotItem(i).removeAttribute('onmousedown');
  }
}

function registerPageHandler() {
  window.AutoPagerize.addFilter(function(pages) {
    pages.forEach(function(page) {
      handle(page);
    });
  });
}
if (window.AutoPagerize) {
  registerPageHandler();
} else {
  window.addEventListener('GM_AutoPagerizeLoaded', registerPageHandler, false);
}
