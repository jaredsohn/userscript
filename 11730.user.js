//
// Reddit Score Revealer
//
// Peteris Krumins (peter@catonmat.net), 2007.08.25
// http://www.catonmat.net  -  good coders code, great reuse
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Once you have it installed, reload this page and the FireFox will
// offer you to install it automatically.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Reddit Score Revealer
// @namespace     http://www.catonmat.net
// @description   Reveals score of newly published posts
// @include       http://*.reddit.com/*
// @include       http://reddit.com/*
// ==/UserScript==
//
// =======================================================================

// Each subreddit has its own widget, we need to find which subreddit we're at.
var subreddit = find_subreddit(location.host);

// Find *all* entries, I wrote this function, might come handy if I develop
// something else cool for reddit :)
var entries = find_entries();

// Find just the newly posted entries (score not visible), and center align
// existing vote boxes (so it looked better)
var new_entries = [];
for (var i = 0; i < entries.length; i++) {
    if (!entries[i].score_visible) new_entries.push(entries[i]);
    else entries[i].vote_td.setAttribute('align', 'center');
}

display_votes(new_entries);

//
// display_votes
//
// Given a list of reddit entries, changes the <td> containing up/down vote
// with the widget
//
function display_votes(entries) {
    for (var i = 0; i < entries.length; i++) {
        entries[i].vote_td.innerHTML = generate_widget_html(entries[i]);
    }
}

//
// generate_widget_html
//
// Given an entry, generates HTML code for up/down voting widget
//
function generate_widget_html(entry) {
    var host = "reddit.com";
    if (subreddit.length) {
        host = subreddit + ".reddit.com";
    }
    var html = '<iframe src="http://' + host + '/button?t=2&url=';
    html += encodeURIComponent(entry.url);
    html += '&title=' + encodeURIComponent(entry.title);
    html += '" height="51" width="39" scrolling="no" frameborder="0" style="margin-left: -5px"></iframe>';

    return html;
}

//
// find_subreddit
//
// Given a host, returns subreddit's name.
// For example, given "programming.reddit.com" it returns "programming"
// Given just "reddit.com" it returns null
//
function find_subreddit(host) {
    var sub = host.match(/^\w+/);
    if (sub == "reddit")
        return '';

    return sub;
}

//
// find_entries
//
// Returns an array of objects representing all reddit entries
//
function find_entries() {
    // Each entry is represented by two <tr>s.
    // The first one contains entry number, up/down vote and title
    // The second contains info when it was posted, by whom, etc.
    //
    const TITLE_TR = 1;
    const DATE_TR  = 2;

    // Each entry is encompassed in <tr class="evenRow"> or <tr class="oddRow">
    //
    var trs = document.getElementsByTagName('tr'); // gets all <tr>s

    var entries = [];
    var entry = {};
    var tr_state = TITLE_TR; 
    for (var i = 0; i < trs.length; i++) {
        if (/(even|odd)Row/.test(trs[i].className)) {
            if (tr_state == TITLE_TR) {
                var info  = get_title_url_box(trs[i]);
                if (!info) break;

                for (var e in info)
                    entry[e] = info[e];

                tr_state = DATE_TR;
            }
            else {
                var time_info = get_time_info(trs[i]);
                if (!time_info) break;

                for (var e in time_info)
                    entry[e] = time_info[e];

                entries.push(entry);
                entry = {};

                tr_state = TITLE_TR;
            }
        }
    }

    return entries;
}

//
// get_title_url_box
//
// Gets title, url and vote box <td> element from the first <tr>
// representing a reddit entry.
//
function get_title_url_box(tr) {
    var tds = tr.getElementsByTagName('td');
    if (!tds) return;

    var a = first_elem_child(tds[2], 1 /* Node.ELEMENT_NODE */);
    if (!a) return;

    return {
        vote_td: tds[1],
        url:     a.href,
        title:   a.text.replace(/^\s+/, '')
    };
}

//
// get_time_info
//
// Gets time info for an entry
//
function get_time_info(tr) {
    var td = first_elem_child(tr, 1 /* Node.ELEMENT_NODE */);
    if (!td) return;

    var time_text = first_elem_child(td, 3 /* Node.TEXT_NODE */);
    if (!time_text) return;

    var time_ago = extract_time_info(time_text.textContent);
    if (time_ago) {
        return {
            time_ago:      time_ago,
            score_visible: false
        };
    }
    else {
        time_text = get_elem_child(td, 3 /* Node.TEXT_NODE */, 2);
        if (!time_text) return;

        time_ago = extract_time_info(time_text.textContent);
        if (time_ago) {
            return {
                time_ago:      time_ago,
                score_visible: true
            };
        }
        return;
    }
}

//
// extract_time_info
//
// Extracts how long ago the entry was posted
//
function extract_time_info(str) {
    var m = str.match(/posted (\d+ .+) ago/);
    if (m) return m[1];

    return;
}

//
// first_elem_child
//
// Returns first child of a node which is of a given type
//
function first_elem_child(node, type) {
    return get_elem_child(node, type, 1);
}

//
// get_elem_child
//
// Returns n-th child of a node which is of a given type
//
function get_elem_child(node, type, n) {
    var child = node.firstChild;
    var i = 1;
    while (child) {
        if (child.nodeType == type && i++ == n) break;
        child = child.nextSibling;
    }

    return child;
}

