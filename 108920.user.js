// ==UserScript==
// @name            irccloud-colornicks
// @description     Colors nick names in IRCCloud
// @version         0.8.1
// @author          Alex Vidal, based on http://userscripts.org/scripts/show/88258, based on http://chatlogs.musicbrainz.org/mb_chatlogger.user.js
// @licence         BSD
//
// @include         http://irccloud.com/*
// @include         https://irccloud.com/*
// @include         http://www.irccloud.com/*
// @include         https://www.irccloud.com/*
// @include         http://alpha.irccloud.com/*
// @include         https://alpha.irccloud.com/*
// ==/UserScript==

/*
 * Based on this userscript http://userscripts.org/scripts/show/88258
 * by Lukáš Lalinský
 */

// Hashing and color algorithms borrowed from the chromatabs Firefox extension.

function colornicks() {
    'use strict';

    var _cache = [];
    var S = 0.8;
    var L = 0.25;

    var is_alpha = typeof(window.SESSIONVIEW) !== 'undefined';

    // create the stylesheet
    var style = document.createElement('style');
    $('body').append(style);

    function clean_nick(nick) {
        // attempts to clean up a nickname
        // by removing alternate characters from the end
        // nc_ becomes nc, avidal` becomes avidal

        nick = nick.toLowerCase();

        // typically ` and _ are used on the end alone
        nick = nick.replace(/[`_]+$/, '');

        // remove |<anything> from the end
        nick = nick.replace(/|.*$/, '');

        return nick;
    }

    function hash(nick) {
        var cleaned = clean_nick(nick);
        var h = 0;

        for(var i = 0; i < cleaned.length; i++) {
            h = cleaned.charCodeAt(i) + (h << 6) + (h << 16) - h;
        }

        return h;

    }


    function get_color(nick) {
        var nickhash = hash(nick);

        // get a positive value for the hue
        var deg = nickhash % 360;
        var h = deg < 0 ? 360 + deg : deg;

        // default L is 50
        var l = 50;

        // half of the hues are too light, for those we
        // decrease lightness
        if(h >= 30 && h <= 210) {
            l = 30;
        }

        // keep saturation above 20
        var s = 20 + Math.abs(nickhash) % 80;

        return "hsl(" + h + "," + s + "%," + l + "%)";

    }

    function add_style(author, color) {
        var cur = $(style).text();
        var attr = "", chat_rule = "", list_rule = "", rule = "", _style = "";

        attr = "[data-name='"+author+"']";
        list_rule = "ul.memberList li.user a.present"+attr;

        if(is_alpha === true) {
            chat_rule = "a.author"+attr;
        } else {
            chat_rule = "div.me a.author"+attr+", span.author a"+attr;
        }

        rule = chat_rule + ", " + list_rule;
        _style = "color: " + color + " !important;";

        $(style).text(cur + rule + "{" + _style + "}\n");
    }


    function process_message(message) {
        if(message.type !== 'buffer_msg') {
            return;
        }

        var author = message.from;
        if(_cache[author]) {
            return;
        }

        var color = get_color(author);

        _cache[author] = color;

        add_style(author, color);

    }

    window.SESSION.backend.bind('message', process_message);

}

function inject(fn) {
    'use strict';
    /*
     * This function injects a small piece of code into the page as soon
     * as jQuery is ready, and then waits until the backend is ready,
     * tested via the presence of window.SESSION.
     *
     * Once both are ready, we call the plugin function.
     *
     * The end result is your function looks like this on the page:
     * (function() {
     *     function colornicks() {
     *         ...
     *     }
     * })()
     */

    function waitloop(fn) {
        var has_session = typeof(window.SESSION) !== 'undefined';
        var has_jquery = typeof(window.jQuery) !== 'undefined';

        if(has_jquery === false || has_session === false) {
            console.log("[CN] Resources are not ready...");
            window.setTimeout(function() { waitloop(fn); }, 100);
            return;
        }

        console.log("[CN] Required resources are ready, calling plugin function.");
        fn();
    }

    var wrap = "(" + fn.toString() + ")";

    console.log("[CN] Injecting wrapper script.");
    var script = document.createElement('script');
    script.textContent += "(" + waitloop.toString() + ')(' + wrap + ');';
    document.body.appendChild(script);
    console.log("[CN] Done injecting wrapper script.");

}

inject(colornicks);
