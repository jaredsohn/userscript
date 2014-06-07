// ==UserScript==
// @name            Quake Live Player Status (QLHM Edition)
// @version         1.1
// @description     Extends QuakeLive chat area
// @author          PredatH0r, rahzei
// @include         http://*.quakelive.com/*
// @exclude         http://*.quakelive.com/forum*
// ==/UserScript==

/*
This script is modified version of rahzei's http://userscripts.org/scripts/review/96328 version 0.4
It is now compatible with the QL standalone launcher and QLHM

Version 1.1
- fixed "Uncaught TypeError: Cannot read property 'ADDRESS' of null" error messges

*/

(function (unsafeWindow) { // enforce a local scope for variables and functions

  var quakelive, $;

  var GameTypes = {
    0: "FFA",
    1: "DUEL",
    2: "FFA",
    3: "TDM",
    4: "CA",
    5: "CTF"
  };

  var Locations = {
    40: 'ARG',
    14: 'AUS',
    33: 'AUS',
    35: 'AUS',
    51: 'AUS',
    26: 'CAN',
    38: 'CHL',
    18: 'DE',
    28: 'ES',
    20: 'FR',
    19: 'UK',
    41: 'ISL',
    42: 'JPN',
    49: 'KOR',
    17: 'NL',
    32: 'PL',
    37: 'RO',
    39: 'RO',
    44: 'RU',
    47: 'SRB',
    29: 'SE',
    58: 'UKR',
    6: 'TX',
    10: 'CA',
    11: 'VA',
    16: 'CA',
    21: 'IL',
    22: 'GA',
    23: 'WA',
    24: 'NY',
    25: 'CA',
    46: 'ZAF'
  };

  function GM_addStyle(css) {
    $("head").append("<style>" + css + "</style>");
  }


  /*
  Copy from ql source, out of scope 
  */

  function JID(a) {
    this.bare = a;
    var d = a.indexOf("@");
    if (d != -1) this.username = a.substring(0, d);
    else {
      this.username = a;
      this.bare = a + "@" + quakelive.siteConfig.xmppDomain
    }
  }

  JID.prototype.Clone = function () {
    return new JID(this.bare)
  };

  /*
  Wait for playerlist to make it into the DOM
  */

  function init() {
    try {
      // setup our globals
      $ = unsafeWindow.jQuery;
      quakelive = unsafeWindow.quakelive;

      // Loop timer till playerlist is complete
      if ($(".player_name").length == 0) {
        window.setTimeout(init, 1000);
        //console.log("Waiting on quakelive object init...");
        return;
      }

      quakelive.AddHook("IM_OnConnected", init);

      // Override OnPresence()
      QuakeLiveChatExtender();

      // Run initial update on player_name nodes
      initRoster();
    }
    catch (e) { }
  }

  function QuakeLiveChatExtender() {

    // Override
    quakelive.xmppClient.roster.OnPresence = function (a) {
      try {
        if (a = quakelive.Eval(a)) {
          var d = new JID(a.who);
          if (typeof this.items[d.username] != "undefined") {
            d = this.items[d.username];
            this.ChangeItemPresence(d, a.presence);
            d.status = a.status;
            var nick = a.who.substring(0, a.who.indexOf("@"));

            // update status message
            updateNode(nick, a.status);

          }
        }
      }
      catch (e) { }
    };
  }

  /*
  Updates the rosteritem with the correct nick
  */

  function updateNode(nick, status) {
    try {
      status = quakelive.Eval(status);
      $(".player_name").each(function (i, item) {
        var that = this;
        var prehtml = $(this).html();
        var nodeNick = $(this).html().indexOf("<small>") >= 0 ? $(this).html().substring(prehtml.indexOf("</small>") + "</small>".length).toLowerCase() : $(this).html().toLowerCase();

        // FIXED: I'm an idiot & id changes stuff all the time :(
        nodeNick = nodeNick.substring(nodeNick.indexOf("<span>") + "<span>".length, nodeNick.indexOf("</span>"));
        nodeNick = nodeNick.indexOf("<br>") >= 0 ? nodeNick.substring(0, nodeNick.indexOf("<br>")) : nodeNick;

        if (nodeNick != nick)
          return;

        // Idle
        if (!status) {
          // cut off status 
          $(that).html(prehtml.substring(prehtml.indexOf("<br />")));

          var rosteritem = $(that).parent().parent();

          $(rosteritem).children(".rosteritem-name").css({ 'margin-bottom': '0px' });

          if ($(rosteritem).hasClass('rosteritem-selected'))
            $(rosteritem).css({ 'height': '26px' });
          else
            $(rosteritem).css({ 'height': '20px' });

          return;
        }


        // Online game
        if (status.ADDRESS.length > 8) {
          $.ajax({
            url: "/browser/details",
            data: {
              ids: status.SERVER_ID
            },
            dataType: "json",
            port: "joinserver",
            cache: false,
            success: function (x) {
              if ($.isArray(x) || x.length > 0) {
                var gametype = (typeof GameTypes[x[0].game_type] != 'undefined') ? GameTypes[x[0].game_type] : x[0].game_type_title;

                if (prehtml.indexOf("<br") > 0)
                  prehtml = prehtml.substring(0, prehtml.indexOf("<br>"));

                var str = prehtml + "<br /><p style=\"height: 15px;margin-top: -4px; margin-bottom: 0px; padding-top: 0px; font-size: 9px; color: rgb(102, 102, 102);\">";

                // teamgame
                if (x[0].teamsize) {
                  str += "<span style=\"font-weight: bold;font-size: 9px\">" + gametype + "</span> on ";

                  if (x[0].g_gamestate === "PRE_GAME" && x[0].num_players < (x[0].teamsize * 2))
                    str += x[0].map_title + " - " + Locations[x[0].location_id] + "<span style=\"font-size: 9px; color: #000;\"> (" + x[0].num_players + "/" + (x[0].teamsize * 2) + ") </span></p>";
                  else
                    str += x[0].map_title + " - " + Locations[x[0].location_id] + " (" + x[0].num_players + "/" + (x[0].teamsize * 2) + ") </p>";
                }

                // duel
                else
                  str += "<span style=\"font-weight: bold;font-size: 9px\">" + gametype + "</span> on " + x[0].map_title + " - " + Locations[x[0].location_id] + " (" + x[0].num_players + "/" + x[0].max_clients + ")</p>";

                $(that).html(str);

                $(that).parent().parent().css({ 'height': '35px' });
              }
            }
          });

          // Prac game
        } else if (status.ADDRESS === "loopback") {
          if (prehtml.indexOf("<br") > 0)
            prehtml = prehtml.substring(0, prehtml.indexOf("<br>"));

          $(that).html(prehtml + "<br /><p style=\"margin-top: -4px; margin-bottom: 0px; padding-top: 0px; font-size: 9px; color: rgb(102, 102, 102);\">Playing Practice Game</p>");

          $(that).parent().parent().css({ 'height': '35px' });


          // Demo
        } else if (status.ADDRESS === "bot") {
          if (prehtml.indexOf("<br") > 0)
            prehtml = prehtml.substring(0, prehtml.indexOf("<br>"));

          $(that).html(prehtml + "<br /><p style=\"margin-top: -4px; margin-bottom: 0px; padding-top: 0px; font-size: 9px; color: rgb(102, 102, 102);\">Watching demo</p>");

          $(that).parent().parent().css({ 'height': '35px' });
        }
      });
    }
    catch (e) { }
  }

  function updateRoster() {
    try {
      if (unsafeWindow.fullScreen)
        return;

      var items = unsafeWindow.quakelive.xmppClient.roster.items;

      for (var i in items) {
        if (items[i].status && typeof items[i].status != "undefined") {
          updateNode(items[i].jid.username, items[i].status);
        }
      }
    }
    catch (e) { }
  }

  /*
  Iterates over roster.items from the xmppClient object and updates status where due
  */

  function initRoster() {
    $ = unsafeWindow.jQuery;

    // Update roster, so status is the correct info regarding players/maxplayers etc
    window.setInterval(updateRoster, 120 * 1000);

    GM_addStyle(".rosteritem-selected { text-align:left;font-weight:bold;font-size:12px;height:26px;line-height:20px;border-bottom:1px solid #a1a0a3;background:url() repeat-y #fff !important }");

    // resize chat area
    window.setTimeout(function () {
      updateRoster();
      //$("#im-body").css({'height':'500px'});
      GM_addStyle(".rosteritem-selected { text-align:left;font-size:12px;height:26px;line-height:20px;border-bottom:1px solid #a1a0a3;background:url() repeat-y #fff !important }");
      GM_addStyle(".rosteritem-selected .rosteritem-name { font-weight:bold;line-height:20px; !important }");

    }, 10 * 1000);
  }

  init();
})(window);