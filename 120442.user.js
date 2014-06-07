// ==UserScript==
// @name           twitter-short-url-expand
// @namespace      https://twitter.com/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

function hasClass(elm, className) {
    var c = elm.getAttribute("class");
    if (c != null) {
        var classes = c.split(" ");
        for(var i = 0; i < classes.length; i++) {
            if(classes[i] == className) {
                return true;
            }
        }
    }
    return false;
}

function addButton(short_link) {
    if (hasClass(short_link, "twitter-timeline-link")) {
        var parent = short_link.parentNode;
        var button = document.createElement("span");
        button.addEventListener("mousedown", function(e) {
            button.removeEventListener('mousedown', arguments.callee, false);
            button.innerHTML = "";
            var lnk = document.createElement("a");
            lnk.href = short_link.title;
            lnk.innerHTML = "<span style='padding: 0 0.2ex; color: #f00;'>[ " + short_link.title + " ]</span>";
            button.appendChild(lnk);
            return false;
        }, false);
        button.innerHTML = "<span style='padding: 0 0.2ex; color: #f00;'>[L]</span>";
        var next = short_link.nextSibling;
        if (next == null) {
            parent.appendChild(button);
        } else {
            parent.insertBefore(button, next);
        }
    }
}

function runOnTweets(callback) {
    var elems = document.getElementsByClassName("stream-item");
    for(var i = 0; i < elems.length; i++) {
        callback(elems[i]);
    }
    document.addEventListener("DOMNodeInserted", function(e) {
        if(hasClass(e.target, "stream-item")) {
            callback(e.target);
        }
    }, true);
}

window.addEventListener("load", function() {
    runOnTweets(function(tweet) {
        var lnks = tweet.getElementsByTagName("a");
        for (var i = 0; i < lnks.length; i++) {
            addButton(lnks[i]);
        }
    });
}, false);
