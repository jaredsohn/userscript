// ==UserScript==
// @name           fanfou-autorefresh
// @namespace      fanfou
// @include        http://fanfou.com/home
// ==/UserScript==

function $q(sel) { return document.querySelector(sel); }
function $qa(sel) { return document.querySelectorAll(sel); }

var $mention_count = $q('#navtabs a[href="/mentions"]>.count'),
    $pricatemsg_count = $q('#navtabs a[href="/privatemsg"]>.count');

function e2i(elem) { return elem.textContent.slice(1, -1); }

if ($mention_count)
    document.title = '[' + e2i($mention_count) + '] ' + document.title;
if ($pricatemsg_count)
    document.title = '{' + e2i($pricatemsg_count) + '} ' + document.title;

$q('#timeline-count').addEventListener('DOMSubtreeModified', function() {
    var timeline_count = this.textContent;
    if (timeline_count >= 20 &&
        $q('#message textarea').value == "" &&
        window.scrollY < 250) {
        location.reload();
    }
}, false);