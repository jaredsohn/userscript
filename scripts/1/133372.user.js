// ==UserScript==
// @name        new 4chan_keynav
// @namespace   /a/non
// @description Use the Keyboard to Navigate 4chan
// @match     http://boards.4chan.org/*
// @match     https://boards.4chan.org/*
// ==/UserScript==

var cursor;
var last_cursor;

var THREAD = 'thread';
var POST   = 'postContainer';
var THREADCLASS = '.' + THREAD;
var POSTCLASS = '.' + POST;
var MARGIN = 20;

function navigate(evt) {
    var target = event.srcElement || event.target;
    if (/^(?:input|textarea)$/.test(target.nodeName.toLowerCase())) {
        return;
    }
    var el;
    switch (evt.keyCode) {
    case 106:
    case 115:
        // j, s
        el = nextPost(cursor);
        break;
    case 107:
    case 119:
        // k, w
        el = prevPost(cursor);
        break;
    case 110:
    case 100:
        // n, d
        el = nextThread(cursor);
        break;
    case 112:
    case 97:
        // p, a
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
        last_cursor = cursor;
        cursor = el;
    }
    cursor.classList.add('cursor');
    scrollTo(cursor);
}

function scrollTo(el) {
    var up = el.offsetTop - window.scrollY;
    var down = up + el.offsetHeight - window.innerHeight;

    if (up > 0 && down < 0) return;

    if (Math.abs(up) < Math.abs(down)) {
        window.scrollBy(0, up - MARGIN);
    } else {
        window.scrollBy(0, down + MARGIN);
    }
}

// returns the current selected post
function currentPost(evt) {
    if (evt === null || evt.type === 'hashchange') {
        var hash = window.location.hash;
        if (hash) {
            var post = document.querySelector(hash);
            target = post? post.parentElement : null;
            if (target === null) {
                // hash isn't in thread yet
                // So let's grab the last post
                target = document.querySelector('.thread').lastElementChild;
            }
            return target;
        }
        // just return the first post
        return document.querySelector(POSTCLASS);
    } else if (evt.type === 'click') {

        target = evt.srcElement;
        if (elementHasAnyClass(target, ['postMessage', 'post', 'postContainer'])) {
            while (target && !target.classList.contains('postContainer')) {
                target = target.parentElement;
            }
            return target;
        }
    }
    return null;
}

// returns true if any of the strings in the
// list is in the classList of the element
function elementHasAnyClass(el, list) {
    for(var i=0, l=list.length; i < l; i++) {
        if (el.classList.contains(list[i])) {
            return true;
        }
    }
    return false;
}

function nextThreadFirstPost(el) {
    var thread = nextClassName(THREAD, el)
    if (thread) return thread.firstElementChild;
    return null;
}

function prevThreadFirstPost(el) {
    var thread = previousClassName(THREAD, el);
    if (thread) return thread.firstElementChild;
    return null;
}

// returns next thread or null
function nextThread(el) {
    var thread = el.parentElement;
    // check if we are on the last thread
    if (null === nextClassName(THREAD, thread)) {
        // if we are at the last post, go 
        // back to the first post of the page
        // else, go to the last post
        if (el === thread.lastChild) {
            return document.querySelector(POSTCLASS);
        }
        return thread.lastChild;
    }
    return nextThreadFirstPost(thread);
}

function prevThread(el) {
    var thread = el.parentElement;
    // first go to the op post
    if (el !== thread.firstChild) {
        return thread.firstChild;
    }
    // check if we are on the first thread
    if (thread.previousElementSibling === null) {
        //return null;
        // return first Post
        return thread.firstChild;
    }
    return prevThreadFirstPost(thread);
}

// returns next post or null
function nextPost(el) {
    // returns the first post of the next thread if it's the last post
    if (el.nextElementSibling == null) {
        return nextThreadFirstPost(el.parentElement);
    }
    return nextClassName(POST, el);
}

function prevPost(el) {
    // returns the last post of the prev thread if it's the first post of the
    // thread or null if if the first post overall
    if (el.previousElementSibling == null) {
        var thread =  previousClassName(THREAD, el.parentElement);
        if (thread) return thread.lastElementChild;
        return null;
    }
    return previousClassName(POST, el);
}

function nextClassName(classname, el) {
    el = el.nextElementSibling;
    while (el && !el.classList.contains(classname)) {
        el = el.nextElementSibling;
    }
    return el;
}

function previousClassName(classname, el) {
    el = el.previousElementSibling;
    while (el && !el.classList.contains(classname)) {
        el = el.previousElementSibling;
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
    GM_addStyle('.cursor {border-left: 2px solid blue !important;} div.opContainer{display:block !important;} .postContainer{border-left:2px solid transparent;clear:left;} div.post.op{display:block!important;} div.post.op:after{content:"";display:table;clear:both;}');

    document.addEventListener('keypress', navigate, false);
    window.addEventListener('hashchange', mouseNav, false);
    document.addEventListener('click', mouseNav, false);

    cursor = currentPost(null);
    updateCursor();
}
main();
