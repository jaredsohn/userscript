// ==UserScript==
// @name           Facebook Blocker
// @namespace      DMKL
// @description    Blocks facebook including proxies
// @include        http://*
// @include        https://*
// ==/UserScript==

facebook_desc = " Facebook is a social utility that connects people with friends and others who work, study and live around them. People use Facebook to keep up with friends, upload an unlimited number of photos, post links and videos, and learn more about the people they meet.";

function xpath_is_facebook() {
    var expr = ".//meta";
    var results = document.evaluate(expr, document, null, 7, null);
    for (var i=0; i < results.snapshotLength; i++) {
        var tag = results.snapshotItem(i);
        if (tag.name == "description") {
            if (tag.content == facebook_desc) {
                return true;
            }
        }
    }
    return false;
}

function is_facebook() {
    var tags = document.getElementsByTagName("meta");
    for (var i=0; i < tags.length; i++) {
        if (tags[i].name == "description") {
            if (tags[i].content == facebook_desc) {
                return true;
            }
        }
    }

    return false;
}

function _main() {
    function do_stuff() {
        if (is_facebook() || xpath_is_facebook()) {
            window.location.replace('http://objection.mrdictionary.net/go.php?n=3734434');
        }
    }
    setTimeout(do_stuff, 1000);
}

document.onload = _main();
//setTimeout(_main, 3000);