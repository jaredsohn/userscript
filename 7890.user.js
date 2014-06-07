// ==UserScript==
// @name            Order of the Stick Keyboard Navigation
// @namespace       http://freecog.net/2007/
// @description     Adds keyboard shortcuts for navigating between strips.
// @include         http://www.giantitp.com/comics/*
// ==/UserScript==

//GM_setValue("debug", true);

var debug = GM_getValue("debug", false);
var unsafe_debug = GM_getValue("unsafe_debug", false);

var debug_queue = [];

function log() {
    if (debug && unsafe_debug) {
        // Pass debug messages to Firebug
        unsafeWindow.console.log.apply(unsafeWindow.console, arguments);
    } else if (debug) {
        // Pass to Greasemonkey's icky log function
        GM_log(Array.join(arguments, ' '));
    } else {
        // Push them onto the queue so that they can be 
        // spit out if debugging is enabled.
        debug_queue.push(Array.slice(arguments));
    }
};

function pump_debug_messages() {
    var msg;
    while ((msg = debug_queue.shift())) log.apply(null, msg);
}

GM_registerMenuCommand("Enable/Disable Debugging", function() {
    GM_setValue("debug", (debug = !debug));
    alert("Debugging has been " + (debug ? "enabled" : "disabled") + ".");
    pump_debug_messages();
});

GM_registerMenuCommand("Enable/Disable Firebug Debugging", function() {
    var msg = '';
    if (!debug && !unsafe_debug) {
        GM_setValue("debug", (debug = true));
        msg = "Debugging has been enabled.";
    }
    GM_setValue("unsafe_debug", (unsafe_debug = !unsafe_debug));
    alert("Firebug debugging has been " + (unsafe_debug ? "enabled" : "disabled") + ".");
    pump_debug_messages();
});

// Maps image link titles to keys under which to place the link 
// URL in the `urls` mapping.
var title_to_key = {
    "Next Comic": "next",
    "Previous Comic": "prev",
};

// Maps key ordinals to the key of the URL in the `urls` mapping.
var ord_to_key = {
    '110,f': "next", // n
    '98,f': "prev", // b
    '112,f': "prev", // p
    '44,f': "prev", // <
    '46,f': "next", // >
    '37,t': "prev", // CTRL + Left Arrow
    '39,t': "next", // CTRL + Right Arrow
};

var urls = {}; // "prev" and "next" keys -> URLs
var comic = null;

function is_comic_image(img) {
    // Older comics have a rational naming scheme
    if (img.src.match(/\/oots\d+\.(gif|png|jpe?g)/i)) return true;
    
    // Newer comics use jibberish URLs, e.g.
    // /comics/images/E4IVQ7hQwmd9fuZnPsj.gif
    // So we do some sniffing.
    if (img.getAttribute("src").match(/^\/comics\/images\/.*\.(gif|png|jpe?g)$/) && 
            img.parentNode.nodeName == 'TD' &&
            img.parentNode.getAttribute("align").match(/center/i)) {
        return true;
    }
    
    return false;
}


Array.slice(document.getElementsByTagName("img")).forEach(function(img) {
    // Get link URLs
    var title = img.title;
    var parent = img.parentNode;
    var is_link = (parent.nodeName == 'A' && parent.href);
    if (title in title_to_key && is_link) {
        urls[title_to_key[title]] = parent.href;
        log("Got URL for %s (%o).", title, img);
    }
    
    // Is this the comic?
    if (is_comic_image(img)) {
        comic = img;
        log("Found comic: %o", img);
    }
});

window.addEventListener("keypress", function(evt) {
    var ord = (evt.charCode || evt.keyCode) + ',' + (evt.ctrlKey ? 't' : 'f');
    log("Key event: %s %o", ord, evt.wrappedJSObject);
    if (ord_to_key[ord]) {
        document.location.href = urls[ord_to_key[ord]];
        evt.stopPropagation();
        evt.preventDefault();
    }
}, false);

// Scroll the comic to the top of the viewport
if (comic && GM_getValue("scroll_to_strip", true)) {
    window.addEventListener("load", function() {
        var top = 0, node = comic;
        do {
            top += node.offsetTop;
        } while ((node = node.offsetParent));
        log("Scroll top calculated: " + top);
        document.body.scrollTop = top;
    }, false);
}
