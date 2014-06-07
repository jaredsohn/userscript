// ==UserScript==
// @name        Twitch Plays Pokemon Chat Filter
// @namespace   http://userscripts.org/users/magmarfire
// @include     *twitch.tv/twitchplayspokemon
// @version     1.3
// @grant       none
// @updateURL   https://userscripts.org/scripts/source/449779.meta.js
// @downloadURL https://userscripts.org/scripts/source/449779.user.js
// ==/UserScript==

// Changelog:
// v1.3: Betting commands now filtered.
// v1.2: Nintendo DS support added.
// v1.1: Added support for comma syntax (in Democracy mode).
// v1.0: Original script

var regex = /^((((a|b|l|r|x|y|left|right|up|down|start|select|wait|anarchy|democracy|\d)(\d|\+|,)?)*)|(\!bet \d* (red|blue)))$/i;

$("head").append("<style type='text/css'>.chat-messages div.chat-line { display: none; }</style>");

setInterval(function() {
    var messages = $(".chat-messages div.chat-line");
    messages.each(function() {
        var message = $(".message", this);

        if (!regex.test(message.text().trim())) {
            $(this).show();
        }
    });
}, 200);