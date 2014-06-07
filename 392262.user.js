// ==UserScript==
// @name       Twitch plays Pokemon - chatfilter
// @namespace  http://www.twitch.tv/twitchplayspokemon
// @version    0.1
// @description  Hides commands so you can talk. Promotes democracy.
// @match      http://www.twitch.tv/twitchplayspokemon
// @copyright  2013+, atomicnom
// ==/UserScript==

/*global unsafeWindow*/
/* jshint globalstrict:true */

"use strict";

if (unsafeWindow) {
    // pull in globals if needed (for Scriptish)
    var Chat = unsafeWindow.Chat,
        jQuery = unsafeWindow.jQuery;
}

jQuery(function () {
    
    var a = "anarchy";
    var b = "democracy";
    
    var pattern = /^(((start)|(select)|a|b|(up)|(down)|(left)|(right))\d?)+$/,
        insert_chat_line = Chat.prototype.insert_chat_line,
        isCommand = function (msg) {
            // this function is gonna run a bunch, so we want to short-circuit
            // as quickly as possible with progressively rarer cases
            if ((msg === a) ||
                    (msg === b) ||
                    (msg.match(pattern))) {
                return true;
            }

            return false;
        };

    Chat.prototype.insert_chat_line = function (a) {
        if (!isCommand(a.message.toLowerCase())) {
            insert_chat_line.call(this, a);
        } else {
            //console.log("Filtered: " + a.message);
        }
    };
    
    var prevTime = 0;
    var interval = 33;
    
    setInterval(function () {
        var e = Math.round((new Date).getTime() / 1e3);
        if (e - prevTime > interval) {
            prevTime = e;
            $("#chat_text_input").val(b);
            $("#chat_speak").trigger("click");
        }
    }, 400);
    
    
});



