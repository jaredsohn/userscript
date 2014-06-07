// ==UserScript==
// @name AutoKongrat
// @description Automatically kongratulates badges
// @include http://www.kongregate.com/games/*
// @author Zaphio
// @version 5
// @date 03/06/10
// ==/UserScript==
var dom = (typeof unsafeWindow === "undefined" ? window : unsafeWindow);
var BADGE_RE = /Congratulations! You just won the (.+) Badge and (?:5|15|30|60) points!/;
function savePref(name, value)
{
	setTimeout(function() {
	GM_setValue(name, value);
	}, 0);
}
setTimeout(function () {
    if (dom.holodeck) {
        var lastBadge = "";
        var autoKongrat = GM_getValue("autoKongrat", true);
	var blacklist = GM_getValue("blacklist", "").split(",");
        dom.holodeck.addChatCommand("autokongrat", function () {
            autoKongrat = !autoKongrat;
            dom.holodeck._active_dialogue.kongBotMessage("Set autokongrat to "+autoKongrat);
            savePref("autoKongrat", autoKongrat);
            return false;
        });
        dom.holodeck.addChatCommand("blacklist", function (holo, input) {
            var p = input.replace(/\s+/g, " ").split(" ");
            if (p.length > 1) {
                for(var i=0;i<blacklist.length;i++) {
                    if(blacklist[i] == p[1]) {
                        dom.holodeck._active_dialogue.kongBotMessage("The following username was removed from the blacklist: "+p[1]);
                        blacklist.splice(i, 1);
                        savePref("blacklist", blacklist.join());
                        return false;
                    }
                }
                dom.holodeck._active_dialogue.kongBotMessage("The following username was added to the blacklist: "+p[1]);
                blacklist.push(p[1]);
                savePref("blacklist", blacklist.join());
            } else {
                dom.holodeck._active_dialogue.kongBotMessage("Blacklist contains the following usernames: "+blacklist);
            }
            return false;
        });
        dom.holodeck._event_dispatcher.register("room_message", function (event) {
            if (dom.holodeck._username == event.data.user.username) return;
            if (autoKongrat && BADGE_RE.test(event.data.message) && !dom.holodeck._chat_window._active_room._presence) {
                for(var i=0;i<blacklist.length;i++) {
                    if (blacklist[i] == event.data.user.username) {
                        return;
                    }
                }
                var badge_match = event.data.message.match(BADGE_RE) || [];
                if (badge_match[0] != lastBadge && event.data.room.id == dom.holodeck._chat_window._active_room.getId()) {
                    lastBadge = badge_match[0];
                    setTimeout(function () {
                        dom.holodeck._chat_window._active_room.sendRoomMessage("Kongrats " + event.data.user.username + "!");
                    }, Math.random() * 3000 + 2000);
                }
            }
        });
    }
}, 5000);