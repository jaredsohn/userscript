// ==UserScript==
// @name        Prefetch Notifier
// @namespace   http://tr.ashcan.org/
// @description Makes prefetched resources visible to the user by dashing links' underlines
// @include     *
// ==/UserScript==

(function() {
    var makeArray = function(obj) { return Array.prototype.slice.call(obj); };

    var prefetchURLs = makeArray(document.getElementsByTagName('link')).filter(
        function(elem, index, arr) {
            return elem.rel == 'prefetch';
        }
    ).map(
        function(link) {
            return link.href;
        }
    );

    makeArray(document.getElementsByTagName('a')).filter(
        function(elem, index, arr) {
            return prefetchURLs.indexOf(elem.href) != -1;
        }
    ).map(
        function(a) {
            a.style.textDecoration = 'none';
            a.style.borderBottomStyle = 'dashed';
            a.style.borderBottomWidth = '1px';
        }
    )
})()
