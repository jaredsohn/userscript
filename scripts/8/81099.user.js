// ==UserScript==
// @name           Instapaper: show full url instead of host
// @namespace      http://relaxedcolumn.blog8.fc2.com/
// @description    show full url instead of host
// @include        http://www.instapaper.com/u*
// @include        http://www.instapaper.com/starred*
// @include        http://www.instapaper.com/archive*
// ==/UserScript==

(function() {
function _() {
    Array.slice(
        document.querySelectorAll("#bookmark_list > div")
    ).forEach(function(article) {
        article.querySelector(".host").textContent
            = article.querySelector(".tableViewCellTitleLink").href;
    });
}
_();

// work with AutoPagerize
document.addEventListener('AutoPagerize_DOMNodeInserted', _, false);
})();
