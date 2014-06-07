// ==UserScript==
// @name           Quake Live IRC Client
// @namespace      
// @description    Connect to QuakeNet.org IRC from within the QL window.
// @author         PredatH0r
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==

(function (win) { // limit scope of variables/functions
  var $ = jQuery;
  var url = "http://webchat.quakenet.org/?nick=" + quakelive.username + "&channels=quakelive&prompt=1";

  var oldShowApp;
  var oldShowOverlay;

  function initIrcWindow() {
    oldShowApp = quakelive.mod_friends.roster.UI_ShowApp;
    quakelive.mod_friends.roster.UI_ShowApp = UI_ShowApp;

    oldShowOverlay = quakelive.mod_friends.roster.UI_ShowOverlay;
    quakelive.mod_friends.roster.UI_ShowOverlay = UI_ShowOverlay;
    insertLink();
  }

  function insertLink() {
    var $imHeader = $("#im-overlay-header");
    var $imBody = $("#im-overlay-body");
    if ($imHeader.length == 0) {
      $imHeader = $("#im-header");
      $imBody = $("#im-body");
    }

    $imHeader.after("<div id='irc_link' style='text-align:left'>"
      + "<a href='" + url + "' target='_blank'>Open QuakeNet IRC WebChat</a></div>");
    var $irc = $("#irc_link");
    $irc.css({
      "height": "18px",
      "background-color": "#404040",
      "text-align": "left",
      "padding-left": "6px"
    });
    $imBody.css("height", (parseInt($imBody.css("height")) - 18) + "px");
  }

  function UI_ShowOverlay() {
    oldShowOverlay.call(quakelive.mod_friends.roster);
    insertLink();
  }

  function UI_ShowApp() {
    oldShowApp.call(quakelive.mod_friends.roster);
    insertLink();
  }

  initIrcWindow();
})(window);