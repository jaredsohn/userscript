// ==UserScript==
// @name           Pop YouTube Video Into Sidebar
// @namespace      http://userscripts.org/users/40991
// @description    Adds a button to open the YouTube video in sidebar.
// @include        *
// ==/UserScript==

if(window != window.parent) return;

var xpath = './/embed|.//a';
getElementsByXPath(xpath).forEach(insertLink);
document.addEventListener('DOMNodeInserted', function(e) {
    if(!e.target) return;
    window.setTimeout(function() {
        getElementsByXPath(xpath, e.target).forEach(insertLink);
    }, 0);
}, false);

function insertLink(e) {
    var src = e.src;
    if(!src && e.href) {
        if(new RegExp('^' + location.href.replace('?', '\\?')).test(e.href)) return;
        if(/^http:\/\/[^\.]+\.youtube\.com\/watch\?v=([^&]+)[^#]*$/.test(e.href)) {
            src = 'http://www.youtube.com/v/' + RegExp.$1;
        }
    }
    if(!/^http:\/\/www\.youtube\.com/.test(src)) return;
    var span = document.createElement('span');
    var link = document.createElement('a');
    link.setAttribute('href', src + '&autoplay=1');
    link.setAttribute('target', '_search');
    link.setAttribute('title', 'open in sidebar');
    var img = document.createElement('img');
    img.src = getIcon();
    img.setAttribute('alt', 'open in sidebar');
    span.style.cssText = 'text-align:left;vertical-align:top;';
    img.style.cssText = link.style.cssText = 'border:0;margin:0;padding:0;';
    link.appendChild(img);
    span.appendChild(link);
    e.parentNode.insertBefore(span, e);
}

function getIcon() {
    return ["data:image/png,",
    "%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0B%08%0",
    "2%00%00%00%26%CE%E0q%00%00%00%06tRNS%00%00%00%FF%00%FF%FD%3C%DC",
    "%F1%00%00%00%7CIDATx%9Cu%90Q%0E%C30%08C%9D%AA%F7%82%9B%95%DC%CC",
    "%9C%CC%FB%F0%C4%DAM%F3%17%82g%93%B0%20%01%00P%7B%E3Gu%5D%CBD%ED",
    "%9D%99%11%01%A0%BB%01DDw%93%3C%C6%3Dc%92%0Ep%E7%B0%DB-%8F'%CC%3",
    "A%CD%92%1C7I%17v%9E%C3%DA%F7%95A%F2C%DC%A1%A9%1F%19%DD%1D%11%F7",
    "%17%F8So%223g%FD%E4%FB%1E%A8*%92z%8AdUA%82%B4%20%FD%BB%A6%8B%17",
    "%1E%E2f%F8%A9%0F%7C%01%00%00%00%00IEND%AEB%60%82"].join('');
}

function getElementsByXPath(xpath, context) {
    var nodes = [], context = context || document;
    try {
        var r = document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var i = 0; i < r.snapshotLength; nodes.push(r.snapshotItem(i++)));
    } catch(e) { log(e) }
    return nodes;
};

function log(s) { console && console.log(s) }