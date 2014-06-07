// ==UserScript==
// @name           No more eFreedom
// @namespace      http://github.com/mooz/
// @description    Remove eFreedom from Google Search Result
// @include        http://www.google.tld/search?*
// ==/UserScript==

function hide(target) {
    Array.prototype.slice.call(target.querySelectorAll("#ires li.g"))
        .filter(function (li) {
            return !!li.querySelector('a[href^="http://ja.efreedom.com"]');
        })
        .forEach(function (li) {
            var cont = li.querySelector(".s");
            cont.style.display = "none";
            var title = li.querySelector(".tl");
            title.style.opacity = "0.4";
        });
}

document.body.addEventListener('AutoPagerize_DOMNodeInserted', function (ev) {
    hide(ev.target);
}, false);

hide(document);
