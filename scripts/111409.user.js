// ==UserScript==
// @name           Vote Overflow
// @namespace      http://piotrl.pl/
// @description    Replaces dull voting arrows on Stack Overflow with something more appropriate.
// @include        http://stackoverflow.com/questions/*
// @match          http://stackoverflow.com/questions/*
// ==/UserScript==
// vim: set et fenc=utf-8 :

// v2.5 changes:
//   - removed redundant code

// v2 changes:
//   - made it work on Chrome
//   - removed reliance on jQuery and Greasemonkey-specific stuff
//   - made CSS refer to Symbola directly, instead of relying on font fallback
//   - added interval updates, to update when new answers are inserted dynamically

(function() {
    var css = [
        '.vote-down-off, .vote-down-on, .vote-up-off, .vote-up-on {',
        '   background: none !important; font-size: 1.8em !important; text-indent: 0 !important;',
        '   font-weight: normal !important; font-family: Symbola, sans-serif !important;',
        '}',
        '.vote-down-off:hover, .vote-down-up:hover, .vote-up-off:hover, .vote-up-on:hover {',
        '   text-decoration: none !important;',
        '}',
        '.vote-down-off, .vote-up-off { color: gray !important; }',
        '.vote-up-on   { color: cyan  !important; }',
        '.vote-down-on { color: brown !important; }'
    ].join('\n');

    var style_el      = document.createElement('style');
    style_el.type     = 'text/css';
    var style_el_text = document.createTextNode(css);

    style_el.appendChild(style_el_text);
    document.body.appendChild(style_el);

    function nodes_by_class(class_name) {
        return Array.prototype.slice.call(document.getElementsByClassName(class_name));
    }

    function update_inner_text(text, node) {
        node.innerHTML = text;
    }

    function update_arrows() {
        var nodes_up   = nodes_by_class('vote-up-off').concat(nodes_by_class('vote-up-on'));
        var nodes_down = nodes_by_class('vote-down-off').concat(nodes_by_class('vote-down-on'));

        // upboat
        nodes_up.forEach(update_inner_text.bind(null, '\u26F5'));
        // downpoo
        nodes_down.forEach(update_inner_text.bind(null, '\uD83D\uDCA9'));
    }

    // update every 15s. this is here to update when new answers are added dynamically
    // this probably can be done better, but meh
    window.setInterval(update_arrows, 15000);
    update_arrows();
})();