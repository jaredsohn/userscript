// ==UserScript==
// @id             186527
// @name           Quake Live Left-Hand-Side Playerlist Popup
// @version        1.3
// @description    Displays a QuakeLive server's player list on the left side of the cursor
// @namespace      
// @homepage       
// @author         PredatH0r
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// ==/UserScript==

/*

Version 1.3
- moved popup up so that current server browser like is fully visible

Version 1.2:
- added try/catch
- fixed timing gap between read/write of DisplayMatchPlayers

*/

(function (win) { // limit scope of variables and functions

  var $ = jQuery;
  var quakelive = win.quakelive;
  var oldDisplayMatchPlayers;

  function init() {
    oldDisplayMatchPlayers = quakelive.matchtip.DisplayMatchPlayers;
    quakelive.matchtip.DisplayMatchPlayers = function (server) {
      var ret = oldDisplayMatchPlayers.call(quakelive.matchtip, server);
      try {
        var tip = $('#lgi_tip');
        var cli = $('#lgi_cli');
        var bot = $('#lgi_cli_bot');
        var link = bot.find('a');
        if (link.length == 0) {
          if (parseInt(bot.css("height")) < 15) {
            bot.css("height", "15px");
          }
          link = bot.append('<a>close</a>').find('a');
          var linkLeft = parseInt(cli.css("width")) - parseInt(link.css("width")) - 30;
          link.css({ "font-size": "9pt", "position": "absolute", "left": linkLeft + "px" });
          link.click(function() { quakelive.HideTooltip(); });
        }

        var left = (parseInt(tip.css("left")) - parseInt(cli.css("width"))) + 5;
        var top = parseInt(tip.css("top")) + 150 - parseInt(cli.css("height"));
        if (top < 0) {
          top = 0;
        }
        cli.css({ "left": left + "px", "top": top + "px" });
      }
      catch(e) {}
      return ret;
    };
  }

  // New Alt Browser script (http://userscripts.org/scripts/review/73076) overwrites quakelive.DisplayMatchPlayer
  // without calling the base implementation. So we delay the init a bit and hope other scripts are done by then.
  win.setTimeout(init, 7000);
})(window);