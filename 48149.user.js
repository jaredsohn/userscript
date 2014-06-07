// ==UserScript==
// @name            THEBARGE's Clickable URLs and PMN in Kongregate Chat
// @namespace      http://userscripts.org/users/89095
// @description    Makes URL links clickable in Kongregate's chat and lets you start private message networks by typing /pmn_start username and then all messages prefixed with /pmn will be sent to these users
// @include        http://*kongregate.com/games*
// @copyright      CREATED BY KONGREGATE USER "thebarge", posted here with permission
// ==/UserScript==

/* 
  trying as hard as I can to get this working ;P
*/
function BargeCode(hd) {
    this.initialize(hd);
}
BargeCode.prototype = {
    initialize: function(hd) {
        this._holodeck = hd;
        this._pmn_users = new Array();
    },
    enableChatLinks: function () {
        this._holodeck.chatWindow()._active_room.receivedMessage = function(a) {
            var message = this._chat_dialogue.sanitizeIncomingMessage(a.data.message);
            var pat = /(http:\/\/.*?)(\s|$)/;
            if (message.match(pat)) {
                var link = RegExp.$1;
                message = message.replace(pat, "<a target=\"_new\" href=\"" + link + "\">" + link + "</a> ");
            }
            this._chat_dialogue.displayUnsanitizedMessage(a.data.user.username, message);
        }
        console.info("Links in chat have now been enabled.");
    },
    enablePrivateSessions: function() {
        this._holodeck.addChatCommand("pmn_start",
            function(hd, command) {
                var m = command.match(/^\/([^\s]+)\s+(.+)$/) || [],
                cmd = m[1],
                message = m[2],
                chat_window = holodeck.chatWindow(),
                active_room = chat_window.activeRoom();

                var users = message.split(" ");
                if (message && chat_window && active_room && (users.size() > 0)) {
                    this._pmn_users = new Array();
                    for (var i = 0; i < users.size(); i++) {
                        this._pmn_users.push(users[i]);
                    }
                    hd.activeDialogue().displayMessage("Kong Bot", "Private Message Network started with " + this._pmn_users.join(", "), { "class": "whisper received_whisper" }, { non_user: true })
                    return(false);
                }
            }
        );
        this._holodeck.addChatCommand("pmn",
            function(hd, command) {
                var m = command.match(/^\/([^\s]+)\s+(.+)$/) || [],
                cmd = m[1],
                message = m[2],
                chat_window = holodeck.chatWindow(),
                active_room = chat_window.activeRoom();

                if (message && chat_window && active_room) {
                    if (this._pmn_users.size() > 0) {
                        for (var i = 0; i < this._pmn_users.size(); i++) {
                            hd.activeDialogue().sendPrivateMessage(this._pmn_users[i], "[via PMN] " + message);
                        }
                    } else {
                        hd.activeDialogue().displayMessage("Kong Bot", "You have not started a Private Message Network session.", { "class": "whisper received_whisper" }, { non_user: true })
                    }
                    return(false);
                }
            }
        );
    }
}

var bargeCode = new BargeCode(holodeck);
bargeCode.enableChatLinks();
bargeCode.enablePrivateSessions();
