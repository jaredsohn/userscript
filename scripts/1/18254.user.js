// ==UserScript==
// @name           Google Reader for Maemo
// @namespace      MaemoGoogleReader
// @description    Fix up display for Nokia internet tablet
// @include        http://www.google.com/reader/*
// ==/UserScript==

function getPath(path) {
    return document.evaluate(path, document, null, XPathResult.ANY_TYPE,null).iterateNext();
}
const READER_STYLES = [
   "#viewer-controls-container table { margin: 0;}",
   "#main, div#nav { margin: 0; padding:0;}",
   "#chrome { padding:0;}",
   "div#nav-toggler { width: 12px;}",
   ".hide-nav span#hide-nav-min-toggle-icon { background-color: #c3d9ff;background-position: 50% 50%; padding: 3px 14px;}",
   "ul.scroll-tree li a { padding: 4px 5px 4px 4px }",
   ".entry-container { font-size: 140%; }",
   ""
   ].join("\n");

function moveToMore(text) {
    var tag = getPath("//span[@class='gb1'][a[text()='"+text+"']]");
    if (tag) {
        var more = getPath("//span[@class='gb3']");
        if (more) {
            more.appendChild(tag);
            tag.className = 'gb2';
        }
    }
}

function moveToTop(text) {
    var tag = getPath("//span[@class='gb2'][a[text()='"+text+"']|text()='"+text+"']");
    if (tag) {
        tag.className = 'gb1';
    }
}

function fixTopBar(more, top) {
    for (var i = 0; i < more.length; i++) {
        moveToMore(more[i]);
    }
    for (var i = 0; i < top.length; i++) {
        moveToTop(top[i]);
    }
}
function init() {
    var more = ['Calendar', 'Documents', 'Photos', 'News', 'Shopping'];
    var top = [];
    fixTopBar(more, top);
    GM_addStyle(READER_STYLES);
}
init();
