// ==UserScript==
// @name         Reddit New Comment Highlighting
// @description  A free Gold feature
// @version      1.0.1
// @license      Public Domain
// @include      http*://*.reddit.com/*
// @grant        none
// ==/UserScript==

/**
 * @namespace HLN
 */
var HLN = HLN || {};

/**
 * @param {number} cutoff Highlight all comments newer this time.
 */
HLN.highlight = function(cutoff) {
    $('.entry').each(function() {
        var date = new Date($(this).find('time').attr('datetime')).getTime();
        if (date > cutoff) {
            $(this).addClass('new-comment');
        } else {
            $(this).removeClass('new-comment');
        }
    });
};

/**
 * @returns {string} the ID of the current post, or null
 */
HLN.postID = function() {
    var match = /\/comments\/([a-z0-9]{6,})/.exec(window.location);
    return match != null ? match[1] : null;
};

/**
 * @returns {number} the time of the last visit, or null
 */
HLN.lastvisit = function() {
    var id = HLN.postID();
    if (id != null) {
        var last = window.localStorage[id + '-lastvisit'];
        if (last != null) {
            return parseFloat(last);
        } else {
            return null;
        }
    } else {
        return null;
    }
};

/**
 * Sets the last visit time.
 * @param {number} [time]
 */
HLN.mark = function(time) {
    var id = HLN.postID();
    if (id != null) {
        return window.localStorage[id + '-lastvisit']
            = time || Date.now();
    } else {
        return null;
    }
};

/**
 * Updates the page to match the last visit time.
 */
HLN.run = function() {
    var last = HLN.lastvisit();
    if (last != null) {
        HLN.highlight(last);
    }
    HLN.mark();
};

HLN.run();
