// ==UserScript==
// @name        Quake Live Disable In-Game AJAX (QLHM Edition)
// @version     1.1
// @author      PredatH0r
// @description	Reduce in-game lags by disabling the browser's HTTP requests.
// @include     http://*.quakelive.com/*
// @exclude     http://*.quakelive.com/forum*
// ==/UserScript==

/*

Version 1.1
- allowing comma separated list of white-listed URLs in sv_ajaxWhitelist
- execute /web_reload when leaving a game

Version 1.0
- crude prototype

*/

(function (win) {
  var oldHandlers = {};
  var handlerNames = ["IM_OnMessage", "IM_OnPresence", "IM_OnItemAdded", "IM_OnItemRemoved"];
  var allowedRequests = ["/request/invite", "/startamatch/invites"];
  var $ = win.$;

  function debug(msg) {
    win.console.log(msg);
  }

  function init() {
    // hook into XMPP events
    for (var i = 0; i < handlerNames.length; i++) {
      var eventName = handlerNames[i];
      oldHandlers[eventName] = win[eventName];
      var handler = new MyEventHandler(eventName);
      win[eventName] = MyEventHandler.prototype.Handle.bind(handler);
    }
    oldHandlers.jQuery_ajax = $.ajax;
    $.ajax = jQuery_ajax;

    // add whitelist URLs from CVAR
    var whitelist = quakelive.cvars.Get("cl_ajaxWhitelist").value;
    if (whitelist) {
      $.each(whitelist.split(","), function (index, item) {
        allowedRequests.push(item);
      });
    }
    
    quakelive.AddHook('OnGameModeStarted', function () {
      quakelive.cfgUpdater.pauseCommit = true;
    });
    quakelive.AddHook('OnGameModeEnded', function () {
      quakelive.cfgUpdater.pauseCommit = false;
      quakelive.cfgUpdater.Commit();
      qz_instance.SendGameCommand("web_reload");
    });
  }

  function MyEventHandler(eventName) {
    this.eventName = eventName;
  }

  MyEventHandler.prototype.Handle = function () {
    try {
      if (quakelive.IsGameRunning())
        return;
      var args = Array.prototype.slice.call(arguments);
      oldHandlers[this.eventName].apply(win, args);
    } catch (e) {
      win.console.log(e);
    }
  };

  function jQuery_ajax(arg /* ... */) {
    try {
      var makeCall = true;
      if (quakelive.IsGameRunning()) {
        var url = typeof arg == "string" ? arg : arg.url;
        makeCall = false;
        for (var i = 0; i < allowedRequests.length; i++) {
          if (url.indexOf(allowedRequests[i]) === 0) {
            debug("sending ajax request: " + url);
            makeCall = true;
            break;
          }
        }
      }
      if (makeCall)
        return oldHandlers.jQuery_ajax.apply($, Array.prototype.slice.call(arguments));
    }
    catch (e) {
      win.console.log(e);
    }
    return {
      done: function () { }
      , fail: function () { }
    };
  }

  init();
})(window);