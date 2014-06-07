// ==UserScript==
// @name        4chan_keynav
// @namespace   /a/non
// @description Use the Keyboard to Navigate 4chan
// @include     http://boards.4chan.org/*/
// @include     http://boards.4chan.org/*/res/*
// @match       http://boards.4chan.org/*/
// @match       http://boards.4chan.org/*/res/*
// ==/UserScript==

var cursor;

function navigate(evt) {
    var target = event.srcElement || event.target;
    if (/^(?:input|textarea)$/.test(target.nodeName.toLowerCase())) {
        return;
    }
    var el;
    switch (evt.keyCode) {
    case 106:
        // j
        el = nextPost(cursor);
        break;
    case 107:
        // k
        el = prevPost(cursor);
        break;
    case 110:
        // n
        el = nextThread(cursor);
        break;
    case 112:
        // p
        el = prevThread(cursor);
        break;
    }
    updateCursor(el);
}

function mouseNav(evt) {
    var el = currentPost(evt);
    if (el) {
        updateCursor(el);
    }
}

function updateCursor(el) {
    if (el) {
        cursor.classList.remove('cursor');
        scrollTo(el);
        cursor = el;
        cursor.classList.add('cursor');
    } else {
        cursor.classList.add('cursor');
        scrollTo(cursor);
    }
}

function scrollTo(el) {
    window.scroll(0, el.offsetTop);
}

// returns the current selected post
function currentPost(evt) {
    if (evt === null || evt.type === 'hashchange') {
        var hash = window.location.hash;
        if (hash) {
            target = document.querySelector('[name="' + hash.slice(1) + '"]');
            if (target === null) {
                // hash isn't in thread yet
                // So let's grab the last post
                target = document.querySelector('[name="delform"] > hr');
                target = target.previousElementSibling.previousElementSibling;
            } else if (target.nextElementSibling.tagName === 'TABLE') {
                target = target.nextElementSibling;
            }
            return target;
        }
        // just return the first post
        return document.querySelector('[name="delform"] > .filesize');

    } else if (evt.type === 'click'){

        target = evt.srcElement;
        if (/^(?:table|td)$/.test(target.nodeName.toLowerCase())) {
            while (target && target.nodeName !== 'TABLE') {
                target = target.parentNode;
            }
            if (target && target.parentNode.name === "delform") {
                return target;
            }
        }
    }
    return null;
}

// returns next thread or null
function nextThread(el) {
    el = nextTagName('HR', el);
    // if it's the last thread
    if (el.nextElementSibling.tagName == 'CENTER') {
        return null;
    }
    return el.nextElementSibling;
}

function prevThread(el) {
    // if it's the first thread
    if (el.previousElementSibling === null) {
        return null;
    }
    el = previousTagName('HR', el.previousElementSibling);
    if (el === null) {
        return document.querySelector('[name="delform"] > .filesize');
    }
    return el.nextElementSibling;
}

// returns next post or null
function nextPost(el) {
    // if the next is not a post
    if (el.tagName == 'TABLE' && el.nextElementSibling.tagName == 'BR') {
        return nextThread(el);
    }
    el = nextTagName('TABLE', el);
    return el;
}

function prevPost(el) {
    // if the prev is not a post
    if (el.tagName == 'TABLE' && el.previousElementSibling.previousElementSibling.tagName != 'TABLE') {
        return prevThread(el);
    }
    el = previousTagName('TABLE', el);
    return el;
}

function nextTagName(tagname, el) {
    el = el.nextSibling;
    while (el && el.tagName != tagname) {
        el = el.nextSibling;
    }
    return el;
}

function nextClassName(classname, el) {
    el = el.nextSibling;
    while (el && el.className != tagname) {
        el = el.nextSibling;
    }
    return el;
}

function previousTagName(tagname, el) {
    el = el.previousSibling;
    while (el && el.tagName != tagname) {
        el = el.previousSibling;
    }
    return el;
}

function previousClassName(classname, el) {
    el = el.previousSibling;
    while (el && el.className != tagname) {
        el = el.previousSibling;
    }
    return el;
}


if( typeof(GM_addStyle)=='undefined' ){
    function GM_addStyle(css) {
        var style = document.createElement('style');
        style.innerHTML = css;
        style.type='text/css';
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}
function main() {
    GM_addStyle('.cursor {border-left: 2px solid blue !important;}');

    document.addEventListener('keypress', navigate, false);
    window.addEventListener('hashchange', mouseNav,false);
    document.addEventListener('click', mouseNav,false);

    cursor = currentPost(null);
    updateCursor();
}

main();

