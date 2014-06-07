// ==UserScript==
// @name       twitch plays pokemon chat filter
// @namespace  http://www.twitch.tv/twitchplayspokemon
// @version    0.7
// @description  removes the button commands from chat
// @match      http://www.twitch.tv/twitchplayspokemon
// @copyright  2014+, xephero
// ==/UserScript==

/*global unsafeWindow*/
/* jshint globalstrict:true */

"use strict";

if (unsafeWindow) {
    // pull in globals if needed (for Scriptish)
    var Chat = unsafeWindow.Chat;
    var App = unsafeWindow.App;
    var jQuery = unsafeWindow.jQuery;
}

jQuery(function () {
    var pattern = /^(((start)|(select)|a|b|(up)|(down)|(left)|(right)|(wait))\d?)+$/;
    var insert_chat_line = Chat.prototype.insert_chat_line;
    var addMessage = App.Room.prototype.addMessage;
    
    var isCommand = function (msg) {
        return (msg == "anarchy" || msg.match(pattern));
    };

    // old chat
    Chat.prototype.insert_chat_line = function (a) {
        if (!isCommand(a.message)) {
            insert_chat_line.call(this, a);
        } else {
            // console.log("Filtered: " + a.message);
        }
    };
    
    // new chat
    App.Room.prototype.addMessage = function (e) {
        if (!isCommand(e.message.toLowerCase())) {
            addMessage.call(this, e);
        } else {
            // console.log("Filtered: " + e.message);
        }
    };
});