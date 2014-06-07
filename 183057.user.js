// ==UserScript==
// @name        NP2 Self Mail
// @description Patches the inbox module to allow sending mail to your self.
// @namespace   http://userscripts.org/users/AnnanFay
// @include     http*://triton.ironhelmet.com/game/*
// @version     1
// @require     http://userscripts.org/scripts/source/181520.user.js
// @run-at      document-start
// @grant       none
// ==/UserScript==

/* globals $, NP2M, d3 */
(function () {
    "strict true";

    var DEBUG   = false,
        NAME    = 'Self Mail'
        VERSION = '1';

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

    function post_init_hook (data) {
        debug(NAME + ': post_init_hook', data);
        var npui        = data.npui,
            inbox       = data.inbox,
            universe    = data.universe;

        npui.ComposeDiplomacyScreen = NP2M.wrap(npui.ComposeDiplomacyScreen, function (args, cds) {
            // allow sending even when no recipients are selected
            // also removes the need for subjects, yay!
            cds.validate = function () {
                cds.send.enable();
            };
            cds.validate();

            return cds;
        });

        inbox.onDraftSend = function () {
            var i;
            var to = inbox.draft.to;
            var to_uids = [];
            var to_aliases = [];
            var to_colors = [];

            // add the sending player to the recipient list if the list is empty
            if (to.length === 0) {
                to.unshift(universe.player.uid);
            }
            var player, players = universe.galaxy.players;
            for (i = 0; i < to.length; i+=1 ) {
                player = players[to[i]];
                
                to_uids.push(player.uid);
                to_aliases.push(player.rawAlias);
                to_colors.push(player.color);
            }

            inbox.trigger("server_request", {
                type: "create_game_message",
                from_color: universe.player.color,
                to_uids: to_uids.join(','),
                to_aliases: to_aliases.join(','),
                to_colors: to_colors.join(','),
                subject: inbox.draft.subject,
                body: inbox.draft.body
            });

            inbox.trigger("hide_screen");
            inbox.clearDraft();
        };

        replace_widget_handlers(inbox, "inbox_draft_send", inbox.onDraftSend);
    }

    NP2M.register(NAME, VERSION, pre_init_hook, post_init_hook);
})();