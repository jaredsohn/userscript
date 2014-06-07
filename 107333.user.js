scr_meta=<><![CDATA[
// ==UserScript==
// @name           Quake Live Pro Auto Invite
// @namespace      http://userscripts.org/users/194012
// @description    Your friends will be able to write the word "invite" to you, and automatically get a real invite to the server you're on.
// @author         flugsio
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==
]]></>.toString();

var $ = unsafeWindow.jQuery, quakelive = unsafeWindow.quakelive;

// shitty wait-function...
ql_wait();
function ql_wait() {
    if (typeof quakelive.hooks.IM_OnMessage == 'undefined') {
        window.setTimeout(ql_wait, 1000);
    } else {
        gogogo();
    }
}

function gogogo() {
  quakelive.hooks.IM_OnMessage.push(function(r) {
    r = quakelive.Eval(r);

    var H = quakelive.modules.friends.roster.fullRoster[quakelive.modules.friends.roster.GetIndexByName(r.who.substring(0,r.who.indexOf("@")))];

    if(r.what == 'invite') {
      H.FriendsContextMenuHandler('invite', H.node);
    }
  });
};