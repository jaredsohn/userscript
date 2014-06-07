// ==UserScript==
// @name           Crappy Quake Live Console
// @namespace      http://userscripts.org/users/194012
// @description    More commands and shit
// @author         flugsio
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==

if (typeof(unsafeWindow) !== 'undefined') {
  var $ = unsafeWindow.jQuery, quakelive = unsafeWindow.quakelive;

  // Need to wait a bit till the shit is loaded
  $(document).ready(function() {
    CrappyConsole.wait();
  });
} else {
  var $ = window.jQuery, quakelive = window.quakelive;
}

var CrappyConsole = {
  wait: function() {
    if (typeof(quakelive.hooks.IM_OnMessage) === 'undefined') {
        window.setTimeout(CrappyConsole.wait, 1000);
    } else {
        CrappyConsole.init();
    }
  },

  init: function() {
    /* this puts a hook so that we can spy on the conversation */
    quakelive.hooks.IM_OnMessage.push(CrappyConsole.translateMessage);
    quakelive.hooks.IM_OnMessage.push(function(r){console.log(r);});
  },
 
  /* converts the JSON-message to a object and only process messages from roster friends */ 
  translateMessage: function(r) {
    var r = quakelive.Eval(r);
    if(QuakeHelper.isFromMe(r.who)) {
      CrappyConsole.processMessage(r.what);
    } else {
      var from = QuakeHelper.getRosterFriend(r.who);
      CrappyConsole.processMessageFrom(from, r.what);
    }
  },

  /* commands that friends can activate */
  processMessageFrom: function(from, what) {
    if(what == 'invite') {
      QuakeHelper.sendInvite(from);
    }
  },

  /* commands that you yourself can use */
  processMessage: function(what) {
    var params = what.split(" ");
    /* TODO: yes, this should use a case-switch instead of else if; but i'm going to replace it with something better */
    if(params[0] == 'help') {
      QuakeHelper.messageSelf("invite USER, befriend USER, unfriend USER, block USER, unblock USER, help2, pingme");
    } else if(params[0] == 'help2') {
      QuakeHelper.messageSelf("bind F12 \"tell_buddy YOURNAME pingme;+messagemode5\"");
    } else if(params[0] == 'pingme') {
      QuakeHelper.messageSelf("Master, how can i serve you?");
    } else if(params[0] == 'invite') {
      QuakeHelper.sendInvite(params[1]);
    } else if(params[0] == 'befriend') {
      QuakeHelper.befriend(params[1]);
    } else if(params[0] == 'unfriend') {
      QuakeHelper.unfriend(params[1]);
    } else if(params[0] == 'block') {
      QuakeHelper.block(params[1]);
    } else if(params[0] == 'unblock') {
      QuakeHelper.unblock(params[1]);
    }
  }

};

var QuakeHelper = {
  getRosterFriend: function(username) {
    return quakelive.modules.friends.roster.fullRoster[quakelive.modules.friends.roster.GetIndexByName(username.substring(0,(username + "@").indexOf("@")))];
  },

  sendInvite: function(rosterFriend) {
    if(rosterFriend.FriendsContextMenuHandler == undefined) {
      rosterFriend = QuakeHelper.getRosterFriend(rosterFriend);
    }
    rosterFriend.FriendsContextMenuHandler('invite', rosterFriend.node);
  },

  isFromMe: function(who) {
    return who == quakelive.xmppClient.jid.bare;
  },

  messageSelf: function(message) {
    qz_instance.IM_SendMessage(quakelive.xmppClient.jid.bare, message);
  },

  befriend: function (r) {
    quakelive.mod_friends.Subscribe(r)
  },

  unfriend: function (r) {
    quakelive.mod_friends.Unsubscribe(r)
  },

  block: function (r) {
    quakelive.mod_friends.BlockPlayer(r);
  },

  unblock: function (r) {
    quakelive.mod_friends.UnblockPlayer(r);
  }
};
