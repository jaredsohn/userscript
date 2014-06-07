// ==UserScript==
// @name        NP2 Export
// @description Very basic star data export script
// @namespace   http://userscripts.org/users/AnnanFay
// @include     http*://triton.ironhelmet.com/game/*
// @version     3
// @require     http://userscripts.org/scripts/source/181520.user.js
// @run-at      document-start
// @grant       none
// ==/UserScript==

/* globals $, NP2M */
(function () {
    "strict true";

    var DEBUG   = false,
        NAME    = 'Export'
        VERSION = '3';

    function debug () {
        if (DEBUG) {
            console.log.apply(this, arguments);
        }
    }

    function pre_init_hook () {
        debug(NAME + ': pre_init_hook');
    }

    function replace_widget_handlers (widget, name, func) {
        var handlers = widget.handlers;
        // remove all previous handlers with that event name
        for (var i = handlers.length - 1; i >= 0; i--) {
            var h = widget.handlers[i];
            if (h.name === name) {
                handlers.splice(i, 1);
                h.node.ui.off(h.name, h.func);
            }
        }
        // add the new one
        widget.on(name, func);
    }
    function toCSV (o, keys) {
        var h = s = '';

        // header
        for (var k in keys) {
            h += keys[k] + ',';
        }

        // rows
        for (var i in o) {
            for (var j in keys) {
                s += JSON.stringify(o[i][keys[j]]) + ',';
            }
            s += '\n';
        };

        return h + '\n' + s;
    }

    function post_init_hook (data) {
        debug(NAME + ': post_init_hook', data);
        replace_widget_handlers(data.np, "order:full_universe",
            function (event, newGalaxy) {
                var keys = ['uid','puid','n','e','i','s','nr','r','ga','y','x','st','v','c'],
                    data = toCSV(newGalaxy.stars, keys);
                $('body').html('<textarea></textarea>');
                $('textarea')
                    .width(window.innerWidth)
                    .height(window.innerHeight)
                    .val(data);
            });
    }

    NP2M.register(NAME, VERSION, pre_init_hook, post_init_hook);
})();