// ==UserScript==
// @name           Bing Images direct link
// @namespace      http://twitter.com/cxx
// @include        http://www.bing.com/images/*
// @version        0.0.1.20100403
// ==/UserScript==

(function() {

function $(id) {
  return document.getElementById(id);
}

$('scroll_panel').addEventListener('click', function(e) {
    var target = e.target;
    if (target.tagName == 'IMG') {
        window.open(target.parentNode.href.match(/&furl=(.*)/)[1].replace(/&amp;/g, '&'));
        e.preventDefault();
        e.stopPropagation();
    }
}, true);

})();
