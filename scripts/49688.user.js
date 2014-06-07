// ==UserScript==
// @name           MetaFilter Live New Comments
// @namespace      http://plutor.org/
// @description    Watches for new comments in threads, and notifies you when they're available
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

var CHECK_FREQUENCY = 30000; // msec
var debug = 0;

// DONE 2009-05-20
// * Use if-modified-since header
//
// TODO
// * Actually load the new comments
// * Don't check threads that are closed
// * Does this work on all subsites?

// =============================================================================

function watch_thread(id) {
    if (debug) GM_log("Watching thread " + id);

    // Attach to mouse and scroll events, so we only watch when the thread
    // is in the active tab/window
    $(window).bind("scroll mousemove", {domain: location.host, id: id}, check_thread);
}

var last_check = new Date();
function check_thread(e) {
    var now = new Date();
    if (now.getTime() - last_check.getTime() < CHECK_FREQUENCY) return;
    last_check = now;

    // Do the check
    var id = e.data.id;
    var domain = e.data.domain;

    if (debug) GM_log("Checking thread " + id);
    $.ajax({
        url: "http://" + domain + "/" + id + "/x/rss",
        data: { domain: domain, id: id },
        success: handle_rss,
        dataType: "xml",
        ifModified: true
    });
}

function handle_rss(data, textstatus) {
    var items = $('item', data);
    if (debug) GM_log("Got an rss feed with " + items.length + " items");

    var comments = $(".comments .smallcopy");

    // Start at the bottom of items, and go until we find an item
    // that's on this page
    var newcomments = 0;
    var found;

    while (newcomments < items.length-1) {
        var url = items.eq(items.length - newcomments - 1).children("link").text();
        var hash = url.match(/#(\d+)$/)[1];

        if (debug) GM_log("Looking for a[href$=" + hash + "]");
        if ( comments.find("a[href$=" + hash + "]").length > 0 )
            break;

        newcomments++;
    }

    if (debug) GM_log("There are " + newcomments + " new comments in the rss feed");

    if (newcomments > 0)
        show_newcomment_msg(newcomments);
}

function show_newcomment_msg(n) {
    var msg = $("#new_comment_msg");
    if (!msg || msg.length < 1) {
        msg = $('<div id="new_comment_msg"></div>');
        msg.appendTo("body")
            .hide().fadeIn("fast");
    }

    var verb = (n != 1) ? "are" : "is";
    var pl = (n != 1) ? "s" : "";

    msg.html('<p>There ' + verb + ' ' + n + ' new comment' + pl +
      '<br>in this thread</p>' +
      '<p><a href="javascript:location.reload()">Click to reload</a></p>')
        .css({
            border: "solid 1px red",
            background: "#fdd",
            color: "#333",
            padding: "0.5em",
            margin: "1em",
            position: "fixed",
            bottom: 0,
            right: 0,
            "-moz-border-radius": "0.5em"
        });
    msg.find("a").css({ color: "blue" });
    msg.find("p").css({ 'text-align': "center", margin: '0.5em' });
}

function init() {
    var url = location.pathname;

    if (match = url.match(/^\/(\d+)/)) {
        watch_thread(match[1]);
    } /*else if (url.match('^/contribute/customize.cfm')) {
        mq_init_preferences();
    }*/
}

$(init);
