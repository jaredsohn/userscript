// ==UserScript==
// @name            4chan threading
// @description     Implement collapsible, persistent threads on 4chan
// @author          Timothy Watt, 2006
// @version         0.1
// @include         http://*.4chan.org/*
// @namespace       http://harbl.localdomain/4chan
// ==/UserScript==

// $Id: 4chanthreading.user.js 3 2006-03-19 01:36:07Z riceman $

/* 4chanthreading.user.js -- persistent, collapsible threading on 4chan
  version 0.1, March 18, 2006

  Copyright (C) 2006 Timothy Watt

  This software is provided 'as-is', without any express or implied
  warranty.  In no event will the authors be held liable for any damages
  arising from the use of this software.

  Permission is granted to anyone to use this software for any purpose,
  including commercial applications, and to alter it and redistribute it
  freely, subject to the following restrictions:

  1. The origin of this software must not be misrepresented; you must not
     claim that you wrote the original software. If you use this software
     in a product, an acknowledgment in the product documentation would be
     appreciated but is not required.
  2. Altered source versions must be plainly marked as such, and must not be
     misrepresented as being the original software.
  3. This notice may not be removed or altered from any source distribution.

  Timothy Watt  timwatt@gmail.com
*/

// Changelog:
// 0.1 - 2005-03-18: initial version.
//      Threads and reply-groups can be (independently) collapsed.
//      Persistence seems to work.
//      No effort has been made to optimize functions yet: it is not exactly
//      slow, so might not bother at all.

//TODO
//  - it would be nice to expire threads from the set over time.
//      thought:
//          1. find highest numbered thread in current page
//          2. protect window of +/- 1000 (we might be on the last/middle/first
//          page)
//          3. iterate through all entries, removing those with numbers less
//          than the window minimum
//      ALT thought: (easier)
//          Since priority is somewhat represented in the list (newly collapsed
//          things get removed from the set and appended to the end), a limit
//          could be implemented to restrict the list to N entries, with old
//          entries expiring off the front.


// set to true to see some progress information (not much for now) in the JS
// console
var DEBUG = false;
function log(stuff) {
    if( DEBUG ) {
        GM_log(stuff);
    }
}

// To avoid clashing with site-defined styles, we prefix our CSS classes and IDs
var NS_PREFIX = "harbl_";
function ns(str) {
    return NS_PREFIX + str;
}
function mkClass(raw) {
    return ns(raw);
}
function classIs(actual, desired) {
    return actual == mkClass(desired);
}

function mkId(raw) {
    return ns(raw);
}


// Applies an XPath expression against the current document.
// type and root are optional.
// type is an XPathResult *_TYPE constant; default = unordered snapshot
// root is any node in the document (a.k.a. the context node); default =
//      document
// Returns an XPathResult. Access .singleNodeValue if you just want the first
// match
function select(xpath, type, root) {
    if( typeof(type) == "undefined" ) {
        type = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
    }

    if( typeof(root) == "undefined" ) {
        root = document;
    }

    return document.evaluate(xpath, root, null, type, null);
}

// like select, but type is automatically set to FIRST_ORDERED_NODE_TYPE
function selectInOrder(xpath, root) {
    return select(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE, root);
}

// given a filesize SPAN *OR* the root DIV of a wrapped thread, finds the
// thread number associated with it.
// Returns null if no number can be found.
function getThreadNum(rootDivORrootFilesizeSpan) {
    var xpath = "./following-sibling::span[@id]";

    if( classIs(rootDivORrootFilesizeSpan.className, "thread") ) {
        xpath = "./span[@id]";
    }

    var spn = selectInOrder( xpath, rootDivORrootFilesizeSpan ).singleNodeValue;

    if( spn ) {
        return spn.id.replace( /nothread/, "" );
    }
    return null;
}

// given a filesize SPAN (technically, any top-level node in the thread will
// do), returns the node AFTER the last node in the thread (think C++
// iterators--just check for != end).
// Returns null if the thread end could not be found (e.g., the layout changed,
// etc.)
function findThreadEnd(rootFilesizeSpan) {
    var end = selectInOrder(
        "./following-sibling::hr", rootFilesizeSpan
    ).singleNodeValue;

    // nodes are separated by BR-HR pairs. We want the BR to be the end.
    // However, BR is used for other things, too, so we don't want to risk
    // searching for that.
    end = end.previousSibling;

    return end;
}

// simplification function wrapping the details of injecting a node before
// another node (i.e., as its previous sibling).
function insertBefore(nodeToInsert, beforeWhat) {
    beforeWhat.parentNode.insertBefore(nodeToInsert, beforeWhat);
}

// ======== Wrapping / Mangling functions ========

// appends nodes to 'into' starting with 'from' and stopping before 'to'.
// NOTE: a null 'to' will cause all following siblings to be wrapped.
function wrapFromToInto(from, to, into) {
    var pos = from;
    var end = to;
    while( pos && pos != end ) {
        // when pos gets moved in the DOM, its nextSibling will no longer be
        // what we want. get that now.
        var nextPos = pos.nextSibling;
        into.appendChild(pos);
        pos = nextPos;
    }
}

// given a filesize SPAN, collects the thread (until the BR-HR separator) into
// a DIV whose class will be "thread" and id will be the thread number preceded
// by "t".
// Returns the thread-wrapping DIV node or null (on failure).
function wrapThread(rootFilesizeSpan) {
    var wrapper = document.createElement("DIV");
    insertBefore(wrapper, rootFilesizeSpan);

    wrapper.className = mkClass("thread");
    wrapper.id = mkId("t" + getThreadNum(rootFilesizeSpan));

    wrapFromToInto(rootFilesizeSpan, findThreadEnd(rootFilesizeSpan), wrapper);

    return wrapper;
}

// given a thread DIV (of an already-wrapped thread--hence WThread), wraps the
// replies in a DIV whose class will be "replies" and id will be the thread
// number preceded by "r".
// *NO DIV* will be inserted if no replies are detected.
// Returns the replies-wrapping DIV node or null (on failure)..
function wrapRepliesInWThread(wrappedThread) {
    var firstReply = selectInOrder("./table", wrappedThread).singleNodeValue;
    var wrapper = null;

    if( firstReply ) {
        wrapper = document.createElement("DIV");
        insertBefore(wrapper, firstReply);

        wrapper.className = mkClass("replies");
        wrapper.id = mkId("r" + getThreadNum(wrappedThread));

        wrapFromToInto(firstReply, null, wrapper);
    }

    return wrapper;
}

// Inserts a link before the given div that will collapse/expand the div and
// change the link text appropriately.
// All togglers start life in an expanded state.
// Call toggleHandler directly for programmatically changing the state.
function insertTogglerBefore(div) {
    var toggler = document.createElement("A");
    toggler.style.backgroundColor = "lightgray";
    toggler.style.textAlign = "center";
    toggler.style.paddingLeft = "0.5em";
    toggler.style.paddingRight = "0.5em";
    toggler.style.fontWeight = "900";
    toggler.href = "#";
    toggler.innerHTML = "[-]";

    // toggleHandler the link to immediately precede the direct object div
    insertBefore(toggler, div);
    try {
        toggler.addEventListener("click", function(event) {
            event.preventDefault();
            return toggleHandler(event.target, true);
        }, false);
    } catch(e) {
        GM_log("Unable to addEventListener: " + e);
    }
}

// ======== END Wrapping / Mangling functions ========


// ========= Persistence functions =========

// returns a "set" of thread and reply IDs that should be collapsed, stored as
// an opaque object (i.e., don't interact with it)
// In reality, it's a string of ':'-surrounded thread/reply IDs
function getPersistentCollapses() {
    return GM_getValue("collapsedThreads", "");
}

// persists the collapse state (specified in 'collapse', a boolean) of 'wrapId'
// (which may or may not have the namespace prefix).
// WARNING: this may be called with UNTRUSTED parameters (i.e., from content).
function setShouldCollapse(wrapId, collapse) {
    wrapId = String(wrapId);
    collapse = Boolean(collapse);

    var id = /[tr]?[0-9]+/.exec(wrapId);
    id = id[0];

    var set = getPersistentCollapses();
    set = set.replace(":" + id + ":", "");

    if( collapse ) {
        set += ":" + id + ":";
        log("Saving collapse: " + id);
    } else {
        log("Clearing collapse: " + id);
    }

    GM_setValue("collapsedThreads", set);
}

// given a thread/reply ID (with or without the namespacing prefix), returns
// true if it should be collapsed according to persisted state, or false
// otherwise.
function getShouldCollapse(wrapId) {
    var id = /[tr]?[0-9]+/.exec(wrapId);
    id = id[0];
    return getPersistentCollapses().indexOf(":" + id + ":") >= 0;
}

// Looks at all threads and reply-chains in the current page and collapses any
// that were persistently marked as collapsed. There are far fewer threads in a
// page than we might persist as closed, which is why we do not loop through
// the persisted collapsed threads.
function applyPersistentSettings() {
    var things = select("//div[@class='" + mkClass("thread") + "'] | " +
        "//div[@class='" + mkClass("replies") + "']");

    for( var i = 0; i < things.snapshotLength; ++i ) {
        var thing = things.snapshotItem(i);
        if( getShouldCollapse( thing.id ) ) {
            log( "Collapsing persisted thing: " + thing.id );
            toggleHandler( thing, false );
        }
    }
    log("Applied persistent settings.");
}

function clearPersistentCollapses() {
    GM_setValue("collapsedThreads", "");
}
GM_registerMenuCommand(
    "Clear persisted 4chan collapses", clearPersistentCollapses
);

// ========= END Persistence functions =========



// ========== Injected functions ============

//injected into the document to simplify collapse/expand links
// (toggles the related DIV between display:none and
// display:block, and the related A's text between [+] and [-])
// NOTE: the persistence-related function is not available (intentionally)
// until all already-persisted changes have been applied to the page.
function toggleHandler(context, persist) {
    var div;
    var link;

    if( context.nodeName == "A" ) {
        link = context;
        div = context.nextSibling;

    } else if( context.nodeName == "DIV" ) {
        link = context.previousSibling;
        div = context;
    }

    if( div && link ) {
        if( div.style.display == "none" ) {
            div.style.display = "block";
            link.innerHTML = "[-]";
            if( persist ) {
                window.setCollapsed(div.id, false);
            }

        } else {
            div.style.display = "none";
            link.innerHTML = "[+]";
            if( persist ) {
                window.setCollapsed(div.id, true);
            }
        }
    } else {
        alert("Unable to figure this out: " + context.nodeName);
    }

    return false;
}

// ========== END Injected functions ================

//injects the given script (a string) into the document's HEAD
function insertScriptText(script) {
    var h = selectInOrder("//head").singleNodeValue;
    var scr = document.createElement("SCRIPT");
    h.appendChild(scr);

    scr.type = "text/javascript";
    scr.appendChild(document.createTextNode(script));
}

// ====== MAIN CODE ==============
try {
    insertScriptText(toggleHandler.toSource());

    var threads = select("//form/span[@class='filesize']");
    var count = threads.snapshotLength;
    for( var i = 0; i < count; ++i ) {
        var wthr = wrapThread(threads.snapshotItem(i));
        if( wthr ) {
            var wrep = wrapRepliesInWThread(wthr);
            insertTogglerBefore(wthr);
            if( wrep ) {
                insertTogglerBefore(wrep);
            }
        }
    }

    applyPersistentSettings();
    window.setCollapsed = function(threadnum, collapsed) {
        setShouldCollapse(threadnum, collapsed);
    };
    unsafeWindow.setCollapsed = window.setCollapsed;

} catch(e) {
    GM_log("OOPS: " + e);
}

// END OF SCRIPT
