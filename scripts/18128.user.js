// ==UserScript==
// @name           Google topbar
// @namespace      GoogleTopBar
// @description    Customise Google top bar
// @include		http://*.google.*/*
// ==/UserScript==

function getPath(path) {
    return document.evaluate(path, document, null, XPathResult.ANY_TYPE,null).iterateNext();
}

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

function fixTopBar() {
    var more = ['News', 'Shopping'];
    for (var i = 0; i < more.length; i++) {
        moveToMore(more[i]);
    }
    var top = ['Groups', 'Documents', 'Calendar', 'Reader'];
    for (var i = 0; i < top.length; i++) {
        moveToTop(top[i]);
    }
}
fixTopBar();
