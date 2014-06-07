// ==UserScript==
// @name        IRCCloud Unread Highlights as Dock Badge
// @namespace   http://fluidapp.com
// @description Display a count of unread highlights on IRCCloud as a dock badge
// @include     http://irccloud.com/*
// @include     https://irccloud.com/*
// @author      Bryce Mecum
//
//  Modified from Martin Dittus' IRCCloud Growl Notifications userscript
//
// ==/UserScript==

(function () {
  
  var oldRenderEventHandler;
  var hasFocus = true;
  var unread_messages = 0;
  
  function updateDockBadge(unread_messages) {
    window.fluid.dockBadge = unread_messages;
  }
  
  function renderEventHook(bufferView, message, seenEid, selectedBuffer, lastTime) { 
    oldRenderEventHandler.apply(controller.view, arguments);
    
    if(!hasFocus && message.highlight) {
      unread_messages += 1;
      updateDockBadge(unread_messages);
    }
  } 
  
  if (window.fluid) {
    $(window).bind("blur", function() {
      hasFocus = false;
    });

    $(window).bind("focus", function() {
      hasFocus = true;
      
      unread_messages = 0;
      updateDockBadge(null);
    });
      
    oldRenderEventHandler = MainView.prototype.renderEvent; 
    MainView.prototype.renderEvent = renderEventHook; 
  }
})();
