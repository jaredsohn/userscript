// ==UserScript==
// @name        Signalfire
// @namespace   http://fluidapp.com
// @description Sets a dockbadge for unread messages
// @include     https://signalfire.com/rooms/*
// @include     https://*.signalfire.com/rooms/*
// @author      James Adam <james@lazyatom.com>
// ==/UserScript==

Signalfire = {
  mostRecentlyViewedMessage: null,
  inBackground: false,
  
  intoBackground: function() {
    window.console.log("Message checking activated");
    Signalfire.inBackground = true;
    Signalfire.mostRecentlyViewedMessage = Signalfire.messages()[0];
    Signalfire.checkMessages();
  },

  intoForeground: function() {
    Signalfire.inBackground = false;
    Signalfire.clearDockBadge();
    window.console.log("Message checking deactivated");
  },
  
  clearDockBadge: function() {
    window.fluid.dockBadge = "";
  },
  
  messages: function() {
    return $$("#messages tr");
  },
  
  checkMessages: function() {
    var unreadMessages = Signalfire.messages().indexOf(Signalfire.mostRecentlyViewedMessage);
    if (unreadMessages > 0) { window.fluid.dockBadge = unreadMessages }
    if (Signalfire.inBackground) { 
      setTimeout(Signalfire.checkMessages, 500);
    } else {
      Signalfire.clearDockBadge();
    }
  }
}

if (window.fluid) {
    Event.observe(window, 'blur', function() { Signalfire.intoBackground(); });
    Event.observe(window, 'focus', function() { Signalfire.intoForeground(); });

    window.console.log("Message checker active.");
}