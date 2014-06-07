// ==UserScript==
// @name        LoUWarriors tools
// @description Adds extra functionality to Lord of Ultima
// @namespace   Ghost Warriors
// @include     http://prodgame30.lordofultima.com/227/index.aspx*
// @version     1.0.0.1
// @grant       none
// ==/UserScript==
(function () {
  /*
   * Changelog
   * 08/01/2013
   * 0.1   - initial
   * 0.2   - include auto update
   * 0.2.1 - dependency checks
   * 0.3   - rewrite code
   * 0.3.1 - remove functions
   * 0.3.2 - add language strings
   * 0.4   - switch to generic commands
   * 0.4.1 - add emoticons
   * 0.4.2 - add more emoticons
   * 0.4.3 - add more emoticons ;)
   * 0.4.4 - complete emoticons
   * 0.4.5 - add first custom bbCode [img]
   * 0.5   - remove emoticons and bbcode
   * 0.5.1 - rebuild emoticons
   * 0.5.2 - fix wrong chat notify for empty string with emoticon
   * 0.5.3 - minor fix, add some shortcuts and fix the devil ;)
   * 0.6   - add data provider
   * 0.6.1 - minor fix
   * 0.6.2 - remove tooltip icons
   * 0.6.3 - better tooltip style
   * 0.6.4 - remove <br>
   * 0.6.5 - fix empty data and cleanup code
   * 0.6.6 - play around with data
   * 0.6.7 - remove settler from castle
   * 0.6.8 - add attr view/data
   * 0.6.9 - change to continent data / clear code
   * 0.7   - improve!
   * 0.7.1 - tweak more info, minor fix Cityguard ts and Baron
   * 0.7.2 - fix br within tooltips
   * 0.8   - add dungeon and boss tooltip
   * 0.8.1 - fix boss tooltips
   * 0.8.2 - round up dungeon and boss ts
   * 0.8.3 - fix bonus
   * 0.8.4 - add empty data tipp
   * 0.8.5 - fix boss tooltip
   * 0.8.6 - fix boss tooltip again
   * 0.8.7 - * menu working
   * 0.8.8 - * menu working
   * 0.8.9 - add BOS
   * 0.9   - context menu
   * 0.9.1 - clear up code with JSLint
   * 0.9.2 - prepare settler tooltip
   * 0.9.3 - BETA bugfixing
   * 0.9.3.1 - bugfixing
   * 0.9.3.2 - bugfixing
   * 0.9.3.3 - bugfixing
   * 0.9.3.4 - bugfixing
   * 0.9.3.5 - bugfixing
   * 0.9.3.6 - bugfixing
   * 0.9.4 - new release
   * 0.9.5 - rtmf
   * 0.9.6 - add settle LL
   * 0.9.7 - force data handle
   * 0.9.7.1 - add error for needed command slot
   * 0.9.8 - add processible notes
   * 0.9.8.1 - bugfixing
   * 0.9.9 - new version - settle without bot
   * 0.9.9.1 - add color management
   * 0.9.9.2 - add youtube video
   * 0.9.9.3 - remove sizzlemctwizzle.com while its broken
   * 0.9.9.4 - change world 'Welt 16'
   * 0.9.9.5 - *working*
   * 0.9.9.6 - fix claim
   * 0.9.9.7 - *working*
   * 0.9.9.8 - add social check and non ally protection
   */
  var main = function () {
    var AlsiusTweakVersion = '1.0.0.1';

    function debug(msg) {
      msg = (msg instanceof Error && msg.stack) ? msg.stack : String(msg);
      if (window.console && typeof console.log === "function") {
        console.log('AlsiusTweak: ' + msg);
      }
    }

    function checkDependencies() {
      var app = qx.core.Init.getApplication(),
        dependencies = [
          app.serverBar,
          app.chat,
          app.cityInfoView,
          webfrontend.data.City.getInstance(),
          webfrontend.config.Config.getInstance()
            .getChat(),
          webfrontend.base.Timer.getInstance(),
          webfrontend.data.Server.getInstance()
        ],
        i = dependencies.length;
      while (i--) {
        if (!dependencies[i]) {
          return false;
        }
      }
      return true;
    }
    /*
     * @language
     * i18 language support
     */
    var DefaultLang = "DE",
      LocalizedStrings = {
        "en": {
          "ext:weak": "Weakness",
          "ext:error_on_command": "Failed to run command",
          "ext:you_are_logged_in": "You are logged in",
          "ext:login_failed": "Login failed",
          "ext:login_kicked": "Login kicked",
          "ext:login_unknown": "Stand-alone",
          "ext:licence_info": "Click to show license and other informations",
          "ext:fill_build_queue": "Click to Fill build queue",
          "ext:convert_all_builds": "Click to Convert all builds",
          "ext:error_message": "Error",
          "ext:ok_message": "Successfully ",
          "ext:like_message": " like you :x",
          "ext:poke_message": " poke you <:-P",
          "ext:vote_message": " vote you :-bd",
          "ext:love_message": "Someone love you @};-",
          "ext:slap_message": "Someone slap you :-q",
          "ext:no_data": "[i]no data[/i]",
          "ext:no_data_or_credentials": "[i]no data or credentials[/i] ",
          "ext:settler": "Settle",
          "ext:settle": "settle",
          "ext:no_settle": "[i]nobody settle[/i]",
          "ext:claimer": "Claims",
          "ext:claims": "claims",
          "ext:no_claim": "[i]nobody claims[/i]",
          "ext:info": "Informations",
          "ext:no_info": "[i]none[/i]",
          "ext:prior": "Preceding",
          "ext:process_data": "[i]process Data...[/i]",
          "ext:since": "since",
          "ext:progress": "Progress",
          "ext:unit_ts": "Unit TS",
          "ext:online": "Online",
          "ext:offline": "Offline",
          "ext:if_bm_available": "If build minister is available",
          "ext:if_wm_available": "If war minister is available",
          "ext:if_bos_available": "If BOS tool is available",
          "ext:cancel_all_orders": "Cancel all",
          "ext:cancel_raid_orders": "Cancel raids",
          "ext:schedule_raid_orders": "Schedule raids",
          "ext:return_time": "Latest return time:",
          "ext:apply": "Apply",
          "ext:close": "Close",
          "ext:apply_tooltip": "Click to apply changes",
          "ext:2 days": "2 Days",
          "ext:3 days": "3 Days",
          "ext:4 days": "4 Days",
          "ext:5 days": "5 Days",
          "ext:6 days": "6 Days",
          "ext:7 days": "7 Days",
          "ext:today": "Today",
          "ext:tomorrow": "Tomorrow",
          "ext:load_intel": "Load bos intel",
          "ext:install_bos": "install or update BOS tool",
          "ext:bos_link_text": "This link will lead you to userscripts.org.<br/><b>LoU BoS</b> provides additions to Lord of Ultima: summary, food calculator, recruitment speed calculator, combat calculator and various other features.",
          "ext:copy_to_chat": "Copy to chat",
          "ext:copy_to_mail": "Copy to mail",
          "ext:tools": "Tools",
          "ext:switch_to_city": "switch to: ",
          "ext:plunder": "plunder",
          "ext:to_settle": "settle",
          "ext:scout": "scout",
          "ext:send_army": "Truppen schicken",
          "ext:send_resources": "send resources",
          "ext:view_reports": "view reports",
          "ext:coordinates": "Coordinates",
          "ext:player": "Player",
          "ext:alliance": "Alliance",
          "ext:enable_emoticons": "enable emoticons",
          "ext:claim_city": "claim city",
          "ext:delete_claim": "delete claim",
          "ext:settle_by_land": "settle by land",
          "ext:settle_by_water": "settle by water",
          "ext:delete_settle": "delete settle",
          "ext:settlement_area": "settlement area",
          "ext:lawless_city": "Lawless city",
          "ext:lawless_city_with_castle": "Lawless city with castle",
          "ext:ruins": "Ruins",
          "ext:claim_ok": "Claim: ",
          "ext:claim_nok": "Claiming error: ",
          "ext:unclaim_ok": "Claim canceled: ",
          "ext:unclaim_nok": "Cancel error: ",
          "ext:settle_ok": "Settle: ",
          "ext:settle_nok": "Settle error: ",
          "ext:unsettle_ok": "Settle canceled: ",
          "ext:unsettle_nok": "Cancel error: ",
          "ext:baron_needed": "baron needed",
          "ext:resources_needed": "resources needed",
          "ext:is_castle": "target is a castle",
          "ext:traiders_needed": "traiders needed", 
          "ext:unknown": "unknown",
          "ext:freeslot_needed": "freeslot needed",
          "ext:notepad": "Notepad",
          "ext:edit": "Edit",
          "ext:save": "Save",
          "ext:done": "Done",
          "ext:note_ok": "Note: ",
          "ext:note_nok": "Note error: ",
          "ext:settlement": "Settlement"
        },
        "de": {
          "ext:weak": "Schwäche",
          "ext:error_on_command": "Fehler beim ausführen von",
          "ext:you_are_logged_in": "Du bist angemeldet",
          "ext:login_failed": "Fehler bei der Anmeldung",
          "ext:login_kicked": "Anmeldung abgewiesen",
          "ext:login_unknown": "Autonom",
          "ext:licence_info": "Lizenz und Info's",
          "ext:fill_build_queue": "Bauliste füllen",
          "ext:convert_all_builds": "Aufträge bezahlen",
          "ext:error_message": "Fehler",
          "ext:ok_message": "Erfolgreich ",
          "ext:like_message": " mag Dich :x",
          "ext:poke_message": " stubst Dich an <:-P",
          "ext:vote_message": " votet Dich :-bd",
          "ext:love_message": "Jemand mag Dich @};-",
          "ext:slap_message": "Jemand slapt Dich :-q",
          "ext:no_data": "[i]keine Daten[/i]",
          "ext:no_data_or_credentials": "[i]keine Daten oder Berechtigung[/i] ",
          "ext:settler": "Siedler",
          "ext:settle": "siedelt",
          "ext:no_settle": "[i]niemand siedelt[/i]",
          "ext:claimer": "Reservierungen",
          "ext:claims": "reserviert",
          "ext:no_claim": "[i]keine Reservierung[/i]",
          "ext:info": "Informationen",
          "ext:no_info": "[i]keine[/i]",
          "ext:prior": "Vorherig",
          "ext:process_data": "[i]verarbeite Daten...[/i]",
          "ext:since": "seit",
          "ext:progress": "Fortschritt",
          "ext:unit_ts": "Einheiten TS",
          "ext:online": "Online",
          "ext:offline": "Offline",
          "ext:if_bm_available": "Funktionen für Bauminister",
          "ext:if_wm_available": "Funktionen für Kriegsminister",
          "ext:if_bos_available": "Funktionen für BOS Tools",
          "ext:cancel_all_orders": "Befehle löschen",
          "ext:cancel_raid_orders": "Raids abbrechen",
          "ext:schedule_raid_orders": "Raids Zeitplan",
          "ext:return_time": "Späteste Rückkehr:",
          "ext:apply": "Speichern",
          "ext:close": "Schließen",
          "ext:apply_tooltip": "Klicke hier, um die Änderungen zu speichern",
          "ext:2 days": "2 Tage",
          "ext:3 days": "3 Tage",
          "ext:4 days": "4 Tage",
          "ext:5 days": "5 Tage",
          "ext:6 days": "6 Tage",
          "ext:7 days": "7 Tage",
          "ext:today": "Heute",
          "ext:tomorrow": "Morgen",
          "ext:load_intel": "lade Intelligence",
          "ext:install_bos": "BOS Tool",
          "ext:bos_link_text": "Dieser Link wird dich zu userscripts.org weiterleiten.<br/><b>LoU BoS</b> bietet Ergänzungen: Übersichten, Nahrungs Rechner, Rekrutierungsgeschwindigkeit Rechner, Kampf Rechner und verschiedene andere Funktionen.",
          "ext:copy_to_chat": "in den Chat",
          "ext:copy_to_mail": "in die Mail",
          "ext:tools": "Tools",
          "ext:switch_to_city": "wechseln zu: ",
          "ext:plunder": "Plündern",
          "ext:to_settle": "Siedeln",
          "ext:scout": "Auskundschaften",
          "ext:send_army": "Truppen schicken",
          "ext:send_resources": "Ressourcen schicken",
          "ext:view_reports": "Berichte",
          "ext:coordinates": "Position",
          "ext:player": "Spieler",
          "ext:alliance": "Allianz",
          "ext:enable_emoticons": "Emoticons",
          "ext:claim_city": "Reservieren",
          "ext:delete_claim": "Reservierung löschen",
          "ext:settle_by_land": "Siedeln über Land",
          "ext:settle_by_water": "Siedeln über Wasser",
          "ext:delete_settle": "Siedlung löschen",
          "ext:settlement_area": "Siedlungsgebiet",
          "ext:lawless_city": "Gesetzlose Stadt",
          "ext:lawless_city_with_castle": "Gesetzlose Stadt mit Burg",
          "ext:claim_ok": "Reservierung: ",
          "ext:claim_nok": "Reservierung Fehler: ",
          "ext:unclaim_ok": "Stornierung: ",
          "ext:unclaim_nok": "Stornierung Fehler: ",
          "ext:settle_ok": "Siedeln: ",
          "ext:settle_nok": "Siedeln Fehler: ",
          "ext:unsettle_ok": "Stornierung: ",
          "ext:unsettle_nok": "Stornierung Fehler: ",
          "ext:baron_needed": "kein Baron",
          "ext:resources_needed": "zu wenig Ressourcen",
          "ext:is_castle": "Ziel ist eine Burg",
          "ext:traiders_needed": "keine Karren/Schiffe", 
          "ext:unknown": "unbekannt",
          "ext:freeslot_needed": "keinen freien Slot",
          "ext:notepad": "Notizen",
          "ext:edit": "Bearbeiten",
          "ext:save": "Speichern",
          "ext:done": "Fertig",
          "ext:note_ok": "Notiz: ",
          "ext:note_nok": "Notiz Fehler: ",
          "ext:settlement": "Siedlung"
        }
      };

    function i18n(messageId) {
      var locale = qx.locale.Manager.getInstance()
        .getLocale(),
        retvar = messageId;
      if (typeof LocalizedStrings[locale] !== 'undefined' && typeof LocalizedStrings[locale][messageId] !== 'undefined') {
        retvar = LocalizedStrings[locale][messageId];
      } else if (typeof LocalizedStrings[DefaultLang][messageId] !== 'undefined') {
        retvar = LocalizedStrings[DefaultLang][messageId];
      }
      return retvar;
    }
    /*
     * @Contribute  http://benalman.com/projects/javascript-emotify/
     * Spezial thanks to Ben Alman, http://benalman.com/about/license/
     */
    var EMOTICON_RE,
    emoticons = {},
    lookup = [],
      emotify = function (txt, callback) {
        callback = callback || function (img, title, smiley, text) {
          title = (title + ', ' + smiley)
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;');
          return '<img src="' + img + '" title="' + title + '" alt="" class="smiley" style="vertical-align: -20%;"/>';
        };
        return txt.replace(EMOTICON_RE, function (a, b, text) {
          var i = 0,
            smiley = text,
            e = emoticons[text];
          // If smiley matches on manual regexp, reverse-lookup the smiley.
          if (!e) {
            while (i < lookup.length && !lookup[i].regexp.test(text)) {
              i++;
            }
            smiley = lookup[i].name;
            e = emoticons[smiley];
          }
          // If the smiley was found, return HTML, otherwise the original search string
          return e ? (b + callback(e[0], e[1], smiley, text)) : a;
        });
      };
    emotify.emoticons = function () {
      var args = Array.prototype.slice.call(arguments),
        base_url = typeof args[0] === 'string' ? args.shift() : '',
        replace_all = typeof args[0] === 'boolean' ? args.shift() : false,
        smilies = args[0],
        e,
        arr = [],
        alts,
        i,
        regexp_str;
      if (smilies) {
        if (replace_all) {
          emoticons = {};
          lookup = [];
        }
        for (e in smilies) {
          emoticons[e] = smilies[e];
          emoticons[e][0] = base_url + emoticons[e][0];
        }
        // Generate the smiley-match regexp.
        for (e in emoticons) {
          if (emoticons[e].length > 2) {
            // Generate regexp from smiley and alternates.
            alts = emoticons[e].slice(2)
              .concat(e);
            i = alts.length;
            while (i--) {
              alts[i] = alts[i].replace(/(\W)/g, '\\$1');
            }
            regexp_str = alts.join('|');
            // Manual regexp, map regexp back to smiley so we can reverse-match.
            lookup.push({
              name: e,
              regexp: new RegExp('^' + regexp_str + '$')
            });
          } else {
            // Generate regexp from smiley.
            regexp_str = e.replace(/(\W)/g, '\\$1');
          }
          arr.push(regexp_str);
        }
        EMOTICON_RE = new RegExp('(^|\\s)(' + arr.join('|') + ')(?=(?:$|\\s))', 'g');
      }
      return emoticons;
    };
    /* 
     * @Core
     * main script that defines the plugin 
     */
    var createTweak = function () {
      var EXTversion = AlsiusTweakVersion,
        EXTbotname = "GhoWar",
        EXTgreeting = "",
        EXTauthors = "",
        EXTpolltrip = 1000 * 60 * 5,
        EXTmaxlogonretrys = 3,
        EXTdataversion = '1.5',
        EXTendpoint = '',
        EXTprovider = '', // next step - remove this!
        EXTisbeta = false;
      qx.Class.define("AlsiusTweak.Main", {
        // let's create a new instance for EXT additional tweaks.
        type: "singleton",
        extend: qx.core.Object,
        members: {
          app: null,
          tick: null,
          ministerPresent: null,
          bosPresent: null,
          cityInfoView: null,
          continents: null,
          panel: null,
          botState: null,
          logOnRetrys: null,
          buildQueueContainer: null,
          // functions
          initialize: function () {
            this.ministerPresent = {
              'TradeMinister': false,
              'BuildMinister': false,
              'DefenseMinister': false,
              'MilitaryMinister': false
            };
            this.bosPresent = false;
            this.tick = null;
            this.botState = 0;
            this.logOnRetrys = 0;
            this.continents = [];
            this.app = qx.core.Init.getApplication();
            this.cityInfoView = this.app.getCityInfoView();
            this.buildQueueContainer = this.cityInfoView.buildingQueue;
            this.tweakEXT();
          },
          tweakEXT: function () {
            this.inception();
            this.toolTip();
            this.chat = webfrontend.data.Chat.getInstance();
						webfrontend.data.FriendList.prototype.isFriendName = this.isFriendName;
            qx.util.TimerManager.getInstance()
              .start(function () {
              this.checkMinisterPresent();
              this.checkBosPresent();
              this.checkDeprecated();
            }, null, this, null, 1000 * 5);
            this.panel = new AlsiusTweak.ui.ExtraTools("Warriors Tools" + EXTversion + ' ~ ' + ((EXTisbeta) ? 'Beta' : EXTgreeting) + ' ~ ');
            this.addPanel(this.panel);
            this.hijackMessage();
            this.emotifyIcons();
            this.worldData();
            this.contextMenu();
            this.checkBotState();
          },
          setPanelState: function (state) {
            this.panel.setState(state);
          },
          checkMinisterPresent: function () {
            var player = webfrontend.data.Player.getInstance();
            this.ministerPresent.TradeMinister = player.getMinisterTradePresent();
            this.ministerPresent.BuildMinister = player.getMinisterBuildPresent();
            this.ministerPresent.DefenseMinister = player.getMinisterDefencePresent();
            this.ministerPresent.MilitaryMinister = player.getMinisterMilitaryPresent();
            qx.util.TimerManager.getInstance()
              .start(function () {
              this.checkMinisterPresent();
            }, null, this, null, 1000 * 60);
          },
          checkBosPresent: function () {
            this.bosPresent = (typeof window.bos !== 'undefined') ? true : false;
            qx.util.TimerManager.getInstance()
              .start(function () {
              this.checkBosPresent();
            }, null, this, null, 1000 * 60);
          },
          checkDeprecated: function () {
            var deprecated = [
                  'LoUBBCode',
                  'nessusRiverGuardian',
                  'PakTweak',
                  'ttt_main'
                ],
              i = deprecated.length;
            while (i--) {
              if ((typeof window[deprecated[i]] !== 'undefined')) {
                alert('The ' + deprecated[i] + ' is deprecated, please uninstall!');
              }
            }
            qx.util.TimerManager.getInstance()
              .start(function () {
              this.checkDeprecated();
            }, null, this, null, 1000 * 60);
          },
          checkBotState: function () {
            var delay = 1;
            if (this.botState === 0) {this.logOn();}
            if (this.logOnRetrys === EXTmaxlogonretrys) {
              this.setPanelState(false);
              AlsiusTweak.Chat.getInstance()
                .addChatMessage(i18n('ext:login_unknown') + '!', true);
              delay = 60;
            }
            qx.util.TimerManager.getInstance()
              .start(function () {
              this.checkBotState();
            }, null, this, null, 1000 * 60 * delay);
          },
          isBotState: function () {
            var ret = false;
            if (Boolean(this.botState) && this.botState !== -1) {ret = true;}
            return ret;
          },
          contextMenu: function () {
            AlsiusTweak.ui.contextMenu.getInstance()
              .init();
          },
          worldData: function () {
            AlsiusTweak.worldData.getInstance()
              .init();
          },
          inception: function () {
            AlsiusTweak.Inception.getInstance()
              .init();
          },
          toolTip: function () {
            AlsiusTweak.Tooltip.getInstance()
              .init();
          },
          addPanel: function (panel) {
            this.buildQueueContainer.getLayoutParent()
              .addBefore(panel, this.buildQueueContainer);
          },
          logOn: function () {
            this.logOnRetrys++;
            this.chat.addMsg('/whisper ' + EXTbotname + ' !alsius.lou.Login ' + EXTversion + ' ' + webfrontend.net.CommandManager.getInstance()
              .getInstanceGuid());
          },
          hijackMessage: function () {
            AlsiusTweak.Chat.getInstance()
              .init();
          },
          registerTick: function () {
            this.getContinents();
            var tp = AlsiusTweak.Provider.getInstance();
            //tp.pollData([{"Service": "getData", "Args": {"continent": '-1'}}]);
            this.continents.forEach(function (c) {
              tp.pollData([{
                "Service": "getData",
                "Args": {
                  "continent": c
                }
              }]);
              this.tick = qx.util.TimerManager.getInstance()
                .start(tp.pollData, EXTpolltrip, tp, [{
                "Service": "getData",
                "Args": {
                  "continent": c
                }
              }]);
            });
          },
          unRegisterTick: function () {
            qx.util.TimerManager.getInstance()
              .stop(this.tick);
          },
          getContinents: function () {
            this.continents = webfrontend.data.Server.getInstance()
              .getActiveContinents();
          },
          emotifyIcons: function () {
            var smilies = {
              ">:)": ["19.gif", "devil", ">:-)", "&gt;:-)", "&gt;:)"],
              ":)": ["1.gif", "happy", ":-)", "*g", "*g*", "*G", "*G*"],
              ":(": ["2.gif", "sad", ":-(", ":/"],
              ";)": ["3.gif", "winking", ";-)"],
              ":D": ["4.gif", "big grin", "xD", ":-D", "*gg*", "gg", "GG", "*GG*"],
              ";;)": ["5.gif", "batting eyelashes"],
              ">:D<": ["6.gif", "big hug", "&gt;:D&lt;", ":DD", "xDD"],
              ":-/": ["7.gif", "confused", ":/"],
              ":x": ["8.gif", "love struck", ":X"],
              ":\">": ["9.gif", "blushing", ":\"&gt;"],
              ":P": ["10.gif", "tongue", ":p", ":-p", ":-P"],
              ":-*": ["11.gif", "kiss", ":*"],
              "=((": ["12.gif", "broken heart"],
              ":-O": ["13.gif", "surprise", ":O", "*huh*"],
              "X(": ["14.gif", "angry"],
              ":>": ["15.gif", "smug", ":&gt;"],
              "B-)": ["16.gif", "cool"],
              ":-S": ["17.gif", "worried"],
              "#:-S": ["18.gif", "whew!", "#:-s"],
              ":((": ["20.gif", "crying", ":-((", ":'(", ":'-("],
              ":))": ["21.gif", "laughing", ":-))"],
              ":|": ["22.gif", "straight face", ":-|"],
              "/:)": ["23.gif", "raised eyebrow", "/:-)"],
              "=))": ["24.gif", "rolling on the floor"],
              "O:-)": ["25.gif", "angel", "O:)"],
              ":-B": ["26.gif", "nerd"],
              "=;": ["27.gif", "talk to the hand"],
              "I-)": ["28.gif", "sleepy"],
              "8-|": ["29.gif", "rolling eyes"],
              "L-)": ["30.gif", "loser"],
              ":-&": ["31.gif", "sick"],
              ":-$": ["32.gif", "don't tell anyone"],
              "[-(": ["33.gif", "not talking"],
              ":O)": ["34.gif", "clown"],
              "8-}": ["35.gif", "silly"],
              "<:-P": ["36.gif", "party", "<:-p", "&lt;:-P", "&lt;:-p"],
              "(:|": ["37.gif", "yawn"],
              "=P~": ["38.gif", "drooling"],
              ":-?": ["39.gif", "thinking"],
              "#-o": ["40.gif", "d'oh", "#-O"],
              "=D>": ["41.gif", "applause", "=D&gt;"],
              ":-SS": ["42.gif", "nailbiting", ":-ss"],
              "@-)": ["43.gif", "hypnotized"],
              ":^o": ["44.gif", "liar"],
              ":-w": ["45.gif", "waiting", ":-W"],
              ":-<": ["46.gif", "sigh", ":-&lt;"],
              ">:P": ["47.gif", "phbbbbt", ">:p", "&gt;:P", "&gt;:p"],
              "<):)": ["48.gif", "cowboy", "&lt;):)"],
              ":@)": ["49.gif", "pig"],
              "3:-O": ["50.gif", "cow", "3:-o"],
              ":(|)": ["51.gif", "monkey"],
              "~:>": ["52.gif", "chicken", "~:&gt;"],
              "@};-": ["53.gif", "rose"],
              "%%-": ["54.gif", "good luck"],
              "**==": ["55.gif", "flag"],
              "(~~)": ["56.gif", "pumpkin"],
              "~O)": ["57.gif", "coffee"],
              "*-:)": ["58.gif", "idea"],
              "8-X": ["59.gif", "skull"],
              "=:)": ["60.gif", "bug"],
              ">-)": ["61.gif", "alien", "&gt;-)"],
              ":-L": ["62.gif", "frustrated", ":L"],
              "[-O<": ["63.gif", "praying", "[-O&lt;"],
              "$-)": ["64.gif", "money eyes"],
              ":-\"": ["65.gif", "whistling"],
              "b-(": ["66.gif", "feeling beat up"],
              ":)>-": ["67.gif", "peace sign", ":)&gt;-"],
              "[-X": ["68.gif", "shame on you"],
              "\\:D/": ["69.gif", "dancing"],
              ">:/": ["70.gif", "bring it on", "&gt;:/"],
              ";))": ["71.gif", "hee hee"],
              "o->": ["72.gif", "hiro", "o-&gt;"],
              "o=>": ["73.gif", "billy", "o=&gt;"],
              "o-+": ["74.gif", "april"],
              "(%)": ["75.gif", "yin yang"],
              ":-@": ["76.gif", "chatterbox"],
              "^:)^": ["77.gif", "not worthy"],
              ":-j": ["78.gif", "oh go on"],
              "(*)": ["79.gif", "star"],
              ":)]": ["100.gif", "on the phone"],
              ":-c": ["101.gif", "call me"],
              "~X(": ["102.gif", "at wits' end"],
              ":-h": ["103.gif", "wave"],
              ":-t": ["104.gif", "time out"],
              "8->": ["105.gif", "daydreaming", "8-&gt;"],
              ":-??": ["106.gif", "I don't know"],
              "%-(": ["107.gif", "not listening"],
              ":o3": ["108.gif", "puppy dog eyes"],
              "X_X": ["109.gif", "I don't want to see", "x_x"],
              ":!!": ["110.gif", "hurry up!"],
              "\\m/": ["111.gif", "rock on!"],
              ":-q": ["112.gif", "thumbs down"],
              ":-bd": ["113.gif", "thumbs up"],
              "^#(^": ["114.gif", "it wasn't me"],
              ":bz": ["115.gif", "bee"],
              ":ar!": ["pirate.gif", "pirate"],
              "[..]": ["transformer.gif", "transformer"]
            };
            emotify.emoticons('http://lou-bot.de/shared/emoticons/Yahoo.AdiumEmoticonset/', smilies);
          },
					isFriendName: function (j) {
						var k = webfrontend.data.FriendList.getInstance().getFriends(),
							i;
						if (k == null) {return false;}
						for (i = 0; i < k.length; i++) {if (k[i].pn == j) {return true;}}
						return false;
					}
        }
      });
      qx.Class.define("AlsiusTweak.Inception", {
        type: "singleton",
        extend: qx.core.Object,
        construct: function () {
          this.base(arguments);
        },
        members: {
          // functions
          init: function () {
            qx.core.Init.getApplication()
              .chat._outputMsg = this.outputMsgIntercept;
            webfrontend.gui.Util._convertBBCode = webfrontend.gui.Util.convertBBCode;
            webfrontend.gui.Util.convertBBCode = this.convertBBCode;
          },
          convertBBCode: function (pq, pr, ps) {
            // place for various custom BBCodes
            var ar = "",
              // fix wrong chat notify for empty string with emoticon
              ig = /^<img src="[^"]*" title="[^"]*" alt="" class="smiley" style="[^"]*"\/>$/gi;
            if (pq !== null) {
              if (!pr) {
                /*
                Including an video, use the movie code from the YouTube URL in your browser. For example, http://youtube.com/watch?v=JFwCCL0Vh6U
                [youtube]JFwCCL0Vh6U[/youtube]
                */
                pq = pq.replace(/\[youtube\](.*?)\[\/youtube\]/gi, '<iframe width="425" height="350" src="http://www.youtube.com/embed/$1?theme=dark&color=red&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>');
                /*
                Set a positive integer. This parameter causes the player to begin playing the video at the given number of seconds from the start of the video.
                [youtube=60]JFwCCL0Vh6U[/youtube]
                */
                pq = pq.replace(/\[youtube=([0-9]*?)\](.*?)\[\/youtube\]/gi, '<iframe width="425" height="350" src="http://www.youtube.com/embed/$2?theme=dark&color=red&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&start=$1" frameborder="0" allowfullscreen></iframe>');
                /*
                Including an image
                [img]http://www.bbcode.org/images/lubeck_small.jpg[/img]
                Resizing the image
                [img=100x50]http://www.bbcode.org/images/lubeck_small.jpg[/img]
                Making the image clickable (in this case linking to the original image)
                [url=http://www.bbcode.org/images/lubeck.jpg][img]http://www.bbcode.org/images/lubeck_small.jpg[/img][/url]
                */
                pq = pq.replace(/\[img\](.*?)\[\/img\]/gi, '<img title="" alt="" class="image" src="$1">');
                pq = pq.replace(/\[img=([0-9]*?)x([0-9]*?)\](.*?)\[\/img\]/gi, '<img width="$1" height="$2" title="" alt="" class="image" src="$3">');
                pq = pq.replace(/\[url=([^\]]*?)\](.*?)\[\/url\]/gi, '<a href=# onClick="webfrontend.gui.Util.openLink(\'$1\');">$2</a>');
                pq = pq.replace(/\[pre\]([\s\S]*?)\[\/pre\]/gi, '<pre>$1</pre>');
              } else {
                pq = pq.replace(/\[youtube\](.*?)\[\/youtube\]/gi, '[url]http://www.youtube.com/v/$1[/url]');
                pq = pq.replace(/\[youtube=([0-9]*?)\](.*?)\](.*?)\[\/youtube\]/gi, '[url]http://www.youtube.com/v/$2[/url]');
                pq = pq.replace(/\[img\](.*?)\[\/img\]/gi, '[url]$1[/url]');
                pq = pq.replace(/\[img=([0-9]*?)x([0-9]*?)\](.*?)\[\/img\]/gi, '[url]$3[/url]');
                pq = pq.replace(/\[url=([^\]]*?)\](.*?)\[\/url\]/gi, '[url]$1[/url]');
                pq = pq.replace(/\[pre\]([\s\S]*?)\[\/pre\]/gi, '$1');
              }
              ar = emotify(pq);
              if (!pr && ig.test(ar)) {
                ar = "&thinsp;" + ar;
              }
            }
            return webfrontend.gui.Util._convertBBCode(ar, pr, ps);
          },
          outputMsgIntercept: function (eY, fa, fb) {
            var t1 = /!alsius\.[a-zA-Z0-9\-]*\.[a-zA-Z]*[\.]?.*/,
              t2 = /!LoU\.[a-zA-Z]*/i,
              p = '__proto__';
            if (t1.test(eY) || t2.test(eY)) {
              // hide alsius commands from chat
              return;
            }
            this[p]._outputMsg.call(this, eY, fa, fb);
          }
        }
      });
      var bl = '<table cellspacing="0"><tr><td style="max-width: 150px;">',
        bl2 = '<tr><th colspan="2">',
        bl3 = '<table cellspacing="0"><tr><td colspan="2">',
        bl4 = '<tr><td colspan="2">',
        bl5 = '<table cellspacing="0">',
        w = "tnf:lawless city with castle",
        bf = "tnf:lawless city without castle",
        T = "</td><td></td></tr>",
        k = "<tr><td>",
        kl = '<tr><td colspan="2">',
        k2 = '<tr><td style="white-space: nowrap;">',
        k3 = '<tr><td style="vertical-align:top;">',
        hl = "<hr>",
        F = "tnf:points:",
        m = '</td><td style="white-space: nowrap;">',
        m1 = "</td><td>",
        l = "</td></tr>",
        l2 = "</th></tr>",
        j = "</table>",
        //removed tipps
        o2 = "tnf:you can define the coloring in the world",
        P2 = "tnf:lou on this world",
        bd2 = "tnf:lou on another world",
        b2 = "tnf:double-click the city to switch to it",
        g = "tnf:regionmap city settle tp",
        f = "tnf:regionmap city siege tp",
        bo1 = "tnf:regionmap city attack tp",
        v = "tnf:regionmap city return tp",
        bj = "tnf:regionmap city support tp",
        bp = "tnf:regionmap city trade tp",
        tp1 = "tnf:regionmap city return tp",
        tp2 = "tnf:regionmap dungeon return tp",
        tp3 = "tnf:regionmap boss return tp",
        //tnf:regionmap city alliance attacked tp
        //prepared tipps
        bo2 = "tnf:regionmap city support tp",
        t = "tnf:regionmap city support other tp",
        pl = "tnf:regionmap city alliance sieged tp",
        bk = "tnf:regionmap city sieged tp",
        P = "tnf:regionmap city attacked tp",
        V = "tnf:regionmap city support own tp",
        A = "tnf:abandoned - cannot be conquered yet",
        C = "tnf:regionmap city alliance attacked tp",
        n = "<br>",
        ku = "application/json",
        h = "",
        gu = "completed",
        fu = "POST",
        d = "failed",
        c = "Content-Type",
        b = '{"session":"',
        a = "timeout",
        M = ",",
        J = ';',
        I = '","requestid":"',
        q = "}",
        o = '\f',
        p = ":",
        p2 = "+",
        p3 = "%",
        nu = '","requests":',
        y = '"}',
        B = "\f",
        nb = "&nbsp;",
        ts = "TS",
        sq = "[",
        qs = "]",
        nl = "\n",
        gr = "g";
      qx.Class.define("AlsiusTweak.Provider", {
        type: 'singleton',
        extend: qx.core.Object,
        construct: function (enabled) {
          this.base(arguments);
          this.requestCounter = 0;
          this.waitForResponse = false;
          this.timeoutCounter = 0;
          this.lastPoll = 0;
          this.Data = {};
          this.Key = '';
          this.Requests = [];
        },
        members: {
          requestCounter: null,
          waitForResponse: null,
          timeoutCounter: null,
          Data: null,
          lastPoll: null,
          Key: null,
          // functions
          pollData: function (o) {
            this.Key = AlsiusTweak.Command.getInstance()
              .getKey();
            if (this.Key === null) {
              return;
            }
            this.requestCounter++;
            if (this.timeoutCounter >= 3 && this.requestCounter >= 15) {
              this.timeoutCounter = 0;
            }
            var url = EXTprovider + EXTendpoint,
              req = new qx.io.remote.Request(url, "POST", "application/json");
            req.setProhibitCaching(false);
            req.setRequestHeader("Content-Type", "application/json");
            req.setCrossDomain(true);
            req.setTimeout(5000);
            req.setParameter("key", this.Key);
            if (o !== null) {
              var payload = JSON.stringify(o);
              req.setData(payload);
            }
            req.addListener("completed", function (e) {
              this.waitForResponse = false;
              this.timeoutCounter = 0;
              var data = e.getContent() || null;
              this.lastPoll = new Date()
                .getTime();
              if (data !== null && data.reqid && data.version === EXTdataversion && typeof data.continent !== 'undefined') {
                this.Data[data.continent.id] = data.continent;
              }
            }, this);
            req.addListener("failed", function (e) {
              this.waitForResponse = false;
              this.requestCounter = 0;
              this.timeoutCounter++;
            }, this);
            req.addListener("timeout", function (e) {
              this.waitForResponse = false;
              this.requestCounter = 0;
              this.timeoutCounter++;
            }, this);
            this.waitForResponse = true;
            req.send();
            return true;
          },
          getData: function () {
            return this.Data;
          },
          getContiData: function (c) {
            return (typeof this.Data[c] !== 'undefined') ? this.Data[c] : null;
          }
        }
      });
      var units = {
        "1": {
          "en": "Cityguard",
          "de": "Stadtwächter"
        },
        "2": {
          "en": "Ballista",
          "de": "Balliste"
        },
        "3": {
          "en": "Ranger",
          "de": "Jäger"
        },
        "4": {
          "en": "Guardian",
          "de": "Pikenier"
        },
        "5": {
          "en": "Templar",
          "de": "Templer"
        },
        "6": {
          "en": "Berserker",
          "de": "Berserker"
        },
        "7": {
          "en": "Mage",
          "de": "Magier"
        },
        "8": {
          "en": "Scout",
          "de": "Kundschafter"
        },
        "9": {
          "en": "Crossbowman",
          "de": "Armbrustschütze"
        },
        "10": {
          "en": "Paladin",
          "de": "Paladin"
        },
        "11": {
          "en": "Knight",
          "de": "Ritter"
        },
        "12": {
          "en": "Warlock",
          "de": "Hexenmeister"
        },
        "13": {
          "en": "Ram",
          "de": "Rammbock"
        },
        "14": {
          "en": "Catapult",
          "de": "Katapult"
        },
        "15": {
          "en": "Fregate",
          "de": "Fregatte"
        },
        "16": {
          "en": "Slope",
          "de": "Schaluppe"
        },
        "17": {
          "en": "War Galleon",
          "de": "Kriegsgaleone"
        },
        "19": {
          "en": "Baron",
          "de": "Baron"
        }
      },
      uts = {
        "1": 1,
        "2": 10,
        "3": 1,
        "4": 1,
        "5": 1,
        "6": 1,
        "7": 1,
        "8": 2,
        "9": 2,
        "10": 2,
        "11": 2,
        "12": 2,
        "13": 10,
        "14": 10,
        "15": 100,
        "16": 100,
        "17": 400,
        "19": 1
      },
      tytowe = {
        "1": 0, //undeath
        "2": 3, //ship wreck
        "3": 4, //hill
        "4": 1, //mountain
        "5": 2, //forest
        "6": 2, //boss forest/dragon
        "7": 4, //boss hill/moloch
        "8": 1, //boss mountain/hydra
        "12": 3 //boss sea/octopus
      },
      bkill = {
        "6": { //  34, 200, 1360, 2640,  6640, 10000, 13600, 20000, 30000, 40000
          "t": [null, 50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000],
          "1": 0.67,
          "2": 1,
          "4": 1,
          "m": 1
        },
        "7": { //  24, 143,  972, 1886, 4743,  7143,  9715, 14286, 21429, 28572
          "t": [null, 36, 215, 1429, 2858, 7143, 10715, 14286, 21429, 32143, 42858],
          "1": 1,
          "2": 1,
          "4": 0.67,
          "m": 1
        },
        "11": { //  19, 112,  756, 1467, 3689, 5556,  7556, 11112, 16667, 22223
          "t": [null, 28, 167, 1112, 2223, 5556, 8334, 11112, 16667, 25000, 33334],
          "1": 1,
          "2": 0.67,
          "4": 1,
          "m": 2
        },
        "15": {
          "t": [null, 1, 4, 23, 44, 111, 167, 227, 334, 500, 667],
          "3": 1,
          "m": 100
        },
        "16": {
          "t": [null, 2, 9, 57, 110, 277, 417, 567, 834, 1250, 1667],
          "3": 1,
          "m": 100
        },
        "17": {
          "t": [null, 1, 1, 6, 11, 28, 42, 57, 84, 125, 167],
          "3": 1,
          "m": 400
        }
      },
      dkill = [15, 100, 340, 1400, 3000, 5500, 12500, 20000, 35000, 60000],
      CITY = 1,
      LAWLESS = 2,
      ABANDONED = 4,
      BOSS = 8,
      DUNGEON = 16,
      SHRINE = 32,
      MOONGATE = 64,
      EMPTY = 128,
      ATTACKABLE = 256,
      ANY = 512,
      NONE_TYPE = '',
      CITY_TYPE = 'City',
      LAWLESS_TYPE = 'LawlessCity',
      BOSS_TYPE = 'Boss',
      DUNGEON_TYPE = 'Dungeon',
      SHRINE_TYPE = 'Shrine',
      MOONGATE_TYPE = 'Moongate',
      EMPTY_TYPE = 'FreeSlot',
      ABANDONED_TYPE = 'AbandonedCity',
      GPL;
      qx.Class.define("AlsiusTweak.Tooltip", {
        type: 'singleton',
        extend: qx.core.Object,
        construct: function (enabled) {
          this.base(arguments);
        },
        members: {
          // functions
          init: function () {
            webfrontend.gui.WorldMapHelper._getLawlessCityTooltip = webfrontend.gui.WorldMapHelper.getLawlessCityTooltip;
            webfrontend.gui.WorldMapHelper.getLawlessCityTooltip = this.getLawlessCityTooltip;
            webfrontend.gui.WorldMapHelper._getFreeTooltip = webfrontend.gui.WorldMapHelper.getFreeTooltip;
            webfrontend.gui.WorldMapHelper.getFreeTooltip = this.getFreeTooltip;
            webfrontend.gui.WorldMapHelper._getCityTooltip = webfrontend.gui.WorldMapHelper.getCityTooltip;
            webfrontend.gui.WorldMapHelper.getCityTooltip = this.getCityTooltip;
            webfrontend.gui.WorldMapHelper._getBossTooltip = webfrontend.gui.WorldMapHelper.getBossTooltip;
            webfrontend.gui.WorldMapHelper.getBossTooltip = this.getBossTooltip;
            webfrontend.gui.WorldMapHelper._getDungeonTooltip = webfrontend.gui.WorldMapHelper.getDungeonTooltip;
            webfrontend.gui.WorldMapHelper.getDungeonTooltip = this.getDungeonTooltip;
          },
          getBossTooltip: function (bT, bU, bV, bW, bX, bY) {
            return AlsiusTweak.Tooltip._getBossTooltip(bT, bU, bV, bW, bX, bY);
          },
          getDungeonTooltip: function (cf, cg, ch, ci, cj, ck, cl, cm) {
            return AlsiusTweak.Tooltip._getDungeonTooltip(cf, cg, ch, ci, cj, ck, cl, cm);
          },
          getLawlessCityTooltip: function (ca, cb, cs, ct, cu, cv, cw) {
            var cc = webfrontend.data.Server.getInstance()
                .getContinentFromCoords(cu & 0xFFFF, cu >> 16),
              tp = AlsiusTweak.Provider.getInstance(),
              cd = tp.getContiData(cc);
            if (cd === null && AlsiusTweak.Main.getInstance().isBotState()) {
              tp.pollData([{
                "Service": "getData",
                "Args": {
                  "continent": cc
                }
              }]);
            }
            return AlsiusTweak.Tooltip._getLawlessCityTooltip(ca, cb, cs, ct, cu, cv, cw, cd);
          },
          getFreeTooltip: function (cI, cJ, cK) {
            var cC = webfrontend.data.Server.getInstance()
                .getContinentFromCoords(cI & 0xFFFF, cI >> 16),
              tp = AlsiusTweak.Provider.getInstance(),
              cD = tp.getContiData(cC);
            if (cD === null && AlsiusTweak.Main.getInstance().isBotState()) {
              tp.pollData([{
                "Service": "getData",
                "Args": {
                  "continent": cC
                }
              }]);
            }
            return AlsiusTweak.Tooltip._getFreeTooltip(cI, cJ, cK, cD);
          },
          getCityTooltip: function (bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ) {
            var bc = webfrontend.data.Server.getInstance()
                .getContinentFromCoords(bD & 0xFFFF, bD >> 16),
              tp = AlsiusTweak.Provider.getInstance(),
              bD2 = tp.getContiData(bc);
            if (bD2 === null && AlsiusTweak.Main.getInstance().isBotState()) {
              tp.pollData([{
                "Service": "getData",
                "Args": {
                  "continent": bc
                }
              }]);
            }
            return AlsiusTweak.Tooltip._getCityTooltip(bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ, bD2);
          }
        },
        statics: {
          _getBossTooltip: function (bT, bU, bV, bW, bX, bY) {
            var cd = new qx.util.StringBuilder(),
              tip = webfrontend.gui.WorldMapHelper._getBossTooltip(bT, bU, bV, bW, bX, bY),
              ca = webfrontend.res.Main.getInstance(),
              cb = webfrontend.data.Tech.getInstance(),
              bM = qx.core.Init.getApplication(),
              weak = ca.attackTypes[tytowe[bT]].dn,
              //get research & bonus
              //bersis = 6
              research6 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 6),
              shrine6 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 6),
              bonus6 = 1 + ((shrine6 + research6) / 100),
              //mages = 7
              research7 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 7),
              shrine7 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 7),
              bonus7 = 1 + ((shrine7 + research7) / 100),
              //knights = 11
              research11 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 11),
              shrine11 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 11),
              bonus11 = 1 + ((shrine11 + research11) / 100),
              //ships
              research15 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 15),
              shrine15 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 15),
              bonus15 = 1 + ((shrine15 + research15) / 100),
              research16 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 16),
              shrine16 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 16),
              bonus16 = 1 + ((shrine16 + research16) / 100),
              research17 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 17),
              shrine17 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 17),
              bonus17 = 1 + ((shrine17 + research17) / 100),
              default_1 = null,
              name_1 = null,
              research_1 = null,
              default_2 = null,
              name_2 = null,
              research_2 = null,
              default_3 = null,
              name_3 = null,
              research_3 = null;
            if (tytowe[bT] !== 3) {
              //get default ts bersis
              default_1 = parseInt(Math.ceil(bkill["6"][tytowe[bT]] * bkill["6"].t[bV]) / bonus6 * bkill["6"].m, 10);
              name_1 = ca.units["6"].dn;
              research_1 = shrine6 + research6;
              //get default ts mages
              default_2 = parseInt(Math.ceil(bkill["7"][tytowe[bT]] * bkill["7"].t[bV]) / bonus7 * bkill["7"].m, 10);
              name_2 = ca.units["7"].dn;
              research_2 = shrine7 + research7;
              //get default ts knights
              default_3 = parseInt(Math.ceil(bkill["11"][tytowe[bT]] * bkill["11"].t[bV]) / bonus11 * bkill["11"].m, 10);
              name_3 = ca.units["11"].dn;
              research_3 = shrine11 + research11;
            } else {
              //get default ts ships
              default_1 = parseInt(Math.ceil(bkill["15"][tytowe[bT]] * bkill["15"].t[bV]) / bonus15 * bkill["11"].m, 10);
              name_1 = ca.units["15"].dn;
              research_1 = shrine15 + research15;
              default_2 = parseInt(Math.ceil(bkill["16"][tytowe[bT]] * bkill["16"].t[bV]) / bonus16 * bkill["11"].m, 10);
              name_2 = ca.units["16"].dn;
              research_2 = shrine16 + research16;
              default_3 = parseInt(Math.ceil(bkill["17"][tytowe[bT]] * bkill["17"].t[bV]) / bonus17 * bkill["11"].m, 10);
              name_3 = ca.units["17"].dn;
              research_3 = shrine17 + research17;
            }
            //round it
            var ts_1 = webfrontend.gui.Util.formatNumbers(this._roundup(default_1)),
              ts_2 = webfrontend.gui.Util.formatNumbers(this._roundup(default_2)),
              ts_3 = webfrontend.gui.Util.formatNumbers(this._roundup(default_3));
            cd.add(bl3);
            cd.add(tip.replace(new RegExp(bM.tr(tp3), "m"), h)
              .replace(new RegExp(n + n, gr), h)
              .replace(new RegExp("([a-zA-Z]{1,}\\.)\\s?([a-zA-Z]{1,})", gr), "$1<br>$2"));
            cd.add(l, k);
            AlsiusTweak.Tooltip._buildProcessHeadline(cd);
            cd.add(k, i18n('ext:weak') + p, m1, weak, l, k, name_1 + nb + p2 + research_1 + p3 + p, m1, ts_1 + nb + ts, l, k, name_2 + nb + p2 + research_2 + p3 + p, m1, ts_2 + nb + ts, l, k, name_3 + nb + p2 + research_3 + p3 + p, m1, ts_3 + nb + ts, l);
            cd.add(l, j);
            return cd.get();
          },
          _getDungeonTooltip: function (cf, cg, ch, ci, cj, ck, cl, cm) {
            var cq = new qx.util.StringBuilder(),
              tip = webfrontend.gui.WorldMapHelper._getDungeonTooltip(cf, cg, ch, ci, cj, ck, cl, cm),
              cn = webfrontend.res.Main.getInstance(),
              bM = qx.core.Init.getApplication(),
              weak = cn.attackTypes[tytowe[cg]].dn,
              progress = parseInt((cj * 0.0175 + 1.0875) * dkill[parseInt(ci, 10) - 1], 10),
              progress_ts = webfrontend.gui.Util.formatNumbers(this._roundup(progress)),
              default_ts = webfrontend.gui.Util.formatNumbers(dkill[parseInt(ci, 10) - 1]);
            cq.add(bl3);
            cq.add(tip.replace(new RegExp(bM.tr(tp2), "m"), h)
              .replace(new RegExp(n + n, gr), h)
              .replace(new RegExp("([a-zA-Z]{1,}\\.)\\s?([a-zA-Z]{1,})", gr), "$1<br>$2"));
            cq.add(l, k);
            AlsiusTweak.Tooltip._buildProcessHeadline(cq);
            cq.add(k, i18n('ext:weak') + p, m1, weak, l, k, i18n('ext:unit_ts') + p, m1, default_ts, l, k, ts + ' + ' + i18n('ext:progress') + p, m1, progress_ts, l);
            cq.add(l, j);
            return cq.get();
          },
          _getCityTooltip: function (bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ, bD2) {
            var bS = new qx.util.StringBuilder(),
              bM = qx.core.Init.getApplication(),
              tip = webfrontend.gui.WorldMapHelper._getCityTooltip(bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ);
            bS.add(bl3);
            // remove ore prepare tipps
            bS.add(tip.replace(new RegExp(bM.tr(o2), "m"), h)
              .replace(new RegExp(bM.tr(P2), "m"), h)
              .replace(new RegExp(bM.tr(bd2), "m"), h)
              .replace(new RegExp(bM.tr(b2), "m"), h)
              .replace(new RegExp(bM.tr(tp1), "m"), h)
              .replace(new RegExp(n + n, gr), h)
              .replace(new RegExp("([a-zA-Z]{1,}\\.)\\s?([a-zA-Z]{1,})", gr), "$1<br>$2"));
            bS.add(l, k);
            var pos = webfrontend.gui.Util.formatCoordinates(bD & 0xFFFF, bD >> 16);
            if (bD2 !== null) {
              AlsiusTweak.Tooltip._buildProcessHeadline(bS);
              var pre = bS.get();
              AlsiusTweak.Tooltip._buildPriorTip(bS, bD2, pos);
              AlsiusTweak.Tooltip._buildInfoTip(bS, bD2, pos);
              AlsiusTweak.Tooltip._buildUnitsTip(bS, bD2, pos);
              AlsiusTweak.Tooltip._buildProcessDataTip(bS, bD2);
              if (pre === bS.get()) {
                AlsiusTweak.Tooltip._buildEmptyDataTip(bS);
              }
            } else {
              AlsiusTweak.Tooltip._buildNoDataOrAccess(bS);
            }
            bS.add(l, j);
            return bS.get();
          },
          _getFreeTooltip: function (cI, cJ, cK, cD) {
            var cN = new qx.util.StringBuilder(),
              tip = webfrontend.gui.WorldMapHelper._getFreeTooltip(cI, cJ, cK);
            cN.add(bl3);
            var worldViewToolTip = qx.core.Init.getApplication().worldViewToolTip;
            var fk = ClientLib.Vis.VisMain.GetInstance().GetObjectFromViewPosition((worldViewToolTip.x - worldViewToolTip.getWorldView().getContentLocation().left), (worldViewToolTip.y - worldViewToolTip.getWorldView().getContentLocation().top));
            // remove ore prepare tipps
            cN.add(tip.replace(new RegExp(n + n, gr), h)
              .replace(new RegExp("([a-zA-Z]{1,}\\.)\\s?([a-zA-Z]{1,})", gr), "$1<br>$2"));
            cN.add(l, k);
            var pos = webfrontend.gui.Util.formatCoordinates(cI & 0xFFFF, cI >> 16);
            if (typeof fk !== 'undefined' && fk !== null) {
              if (cD !== null && (fk.get_UIType() === EMPTY_TYPE || (typeof cD.info !== 'undefined' && cD.info !== null && cD.info[pos]))) {
                AlsiusTweak.Tooltip._buildProcessHeadline(cN);
                if (fk.get_UIType() === EMPTY_TYPE) {
									if (typeof cD.info === 'undefined' || cD.info === null) {
										cD.info = [];
									}
									cD.info[pos] = {'txt': i18n("ext:settlement_area")};
								}
                AlsiusTweak.Tooltip._buildInfoTip(cN, cD, pos);
                AlsiusTweak.Tooltip._buildSettlerTip(cN, cD, pos);
                AlsiusTweak.Tooltip._buildProcessDataTip(cN, cD);
              } else if (fk.get_UIType() !== null) {
                AlsiusTweak.Tooltip._buildNoDataOrAccess(cN);
              }
            }
            cN.add(l, j);
            return cN.get();
          },
          _getLawlessCityTooltip: function (ca, cb, cs, ct, cu, cv, cw, cd) {
            var cy = new qx.util.StringBuilder(),
              tip = webfrontend.gui.WorldMapHelper._getLawlessCityTooltip(ca, cb, cs, ct, cu, cv, cw);
            cy.add(bl3);
            // remove ore prepare tipps
            cy.add(tip.replace(new RegExp(n + n, gr), h)
              .replace(new RegExp("([a-zA-Z]{1,}\\.)\\s?([a-zA-Z]{1,})", gr), "$1<br>$2"));
            cy.add(l, k);
            var pos = webfrontend.gui.Util.formatCoordinates(cu & 0xFFFF, cu >> 16);
            if (cd !== null) {
              AlsiusTweak.Tooltip._buildProcessHeadline(cy);
              AlsiusTweak.Tooltip._buildSettlerTip(cy, cd, pos, ca);
              AlsiusTweak.Tooltip._buildPriorTip(cy, cd, pos);
              AlsiusTweak.Tooltip._buildInfoTip(cy, cd, pos);
              AlsiusTweak.Tooltip._buildUnitsTip(cy, cd, pos);
              AlsiusTweak.Tooltip._buildProcessDataTip(cy, cd);
            } else {
              AlsiusTweak.Tooltip._buildNoDataOrAccess(cy);
            }
            cy.add(l, j);
            return cy.get();
          },
          _buildNoDataOrAccess: function (br) {
            br.add(bl3 + 'Warriors Tools:' + m + nb + nb + nb + nb + nb + nb + nb + nb + nb + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_data_or_credentials')) + l);
          },
          _buildProcessHeadline: function (br) {
            br.add(bl2 + 'Warriors Tools: v' + EXTversion + l2 + kl + hl + l);
          },
          _buildProcessDataTip: function (br, bs) {
            if (typeof bs === 'undefined' || (isNaN(parseFloat(bs.id)) && isFinite(bs.id))) {
              br.add(kl + webfrontend.gui.Util.convertBBCode(i18n('ext:process_data')) + l);
            }
          },
          _buildEmptyDataTip: function (br) {
            br.add(k + i18n('ext:info') + p);
            if (!AlsiusTweak.Main.getInstance().isBotState()) {
              br.add(m + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_info')) + l);
            } else {
              br.add(kl + webfrontend.gui.Util.convertBBCode(i18n('ext:process_data')) + l);
            }
          },
          _buildSettlerTip: function (br, bs, bk, bf) {
            if (typeof bs !== 'undefined') {
              if (typeof bs.settler !== 'undefined' && bf !== true) {
                br.add(k + i18n('ext:settler') + p);
                if (bs.settler[bk]) {
                  br.add(m + nb + bs.settler[bk].name + nb + i18n('ext:settle') + nb + i18n('ext:since') + p + nb + bs.settler[bk].time + 'h' + ' ETE: ' + bs.settler[bk].ete + 'h' + l);
                } else {
                  br.add(m + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_settle')) + l);
                }
              }
              if (typeof bs.claimer !== 'undefined' && (typeof bs.settler !== 'undefined' && !bs.settler[bk])) {
                if (bs.claimer[bk] || bf === true) {
                  br.add(k + i18n('ext:claimer') + p);
                }
                if (bs.claimer[bk]) {
                  br.add(m + nb + bs.claimer[bk].name + nb + i18n('ext:claims') + nb + i18n('ext:since') + p + nb + bs.claimer[bk].time + 'h' + l);
                } else if (bf === true) {
                  br.add(m + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_claim')) + l);
                }
              }
            }
          },
          _buildPriorTip: function (br, bs, bk) {
            if (typeof bs !== 'undefined' && bs.prior !== null && bs.prior[bk] && bs.prior[bk].name) {
              br.add(k + i18n('ext:prior') + p);
              br.add(m + nb + bs.prior[bk].name);
              if (bs.prior[bk].alliance_name) {
                br.add(sq + bs.prior[bk].alliance_name + qs);
              }
              br.add(l);
            }
          },
          _buildInfoTip: function (br, bs, bk) {
            if (typeof bs !== 'undefined' && bs.info !== null) {
              if (bs.info[bk]) {
                br.add(k3 + i18n('ext:info') + p);
                br.add(m + nb + webfrontend.gui.Util.convertBBCode(bs.info[bk].txt.replace(new RegExp(nl, gr), n + nb)) + l);
              } else {
                br.add(k + i18n('ext:info') + p);
                br.add(m + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_info')) + l);
              }
            }
          },
          _buildUnitsTip: function (br, bs, bk) {
            if (typeof bs !== 'undefined' && bs.units !== null) {
              if (bs.units[bk]) {
                var locale = qx.locale.Manager.getInstance()
                  .getLocale();
                bs.units[bk].forEach(function (u) {
                  br.add(k + units[u.type][locale] + p);
                  br.add(m + nb + webfrontend.gui.Util.formatNumbers(u.ts * uts[u.type]) + nb + ts + l);
                });
              }
            }
          },
          //pads right
          _rpad: function (string, padString, length) {
            while (string.length < length) {
              string = string + padString;
            }
            return string;
          },
          _roundup: function (number) {
            var one = "1",
              fqp = Math.round(String(number)
                .length / 2),
              tep = parseInt(this._rpad(one, "0", fqp), 10);
            return Math.round(number / tep) * tep;
          }
        }
      });
      qx.Class.define("AlsiusTweak.Chat", {
        type: "singleton",
        extend: qx.core.Object,
        construct: function (enabled) {
          this.base(arguments);
        },
        members: {
          // functions
          init: function () {
            this.chat = webfrontend.data.Chat.getInstance();
            this.chat.addListener('newMessage', this.onNewMessage, this);
          },
          onNewMessage: function (e) {
            var eu = e.getData(),
              commands = AlsiusTweak.Command.getInstance(),
              t = /^!alsius\.([a-zA-Z0-9\-]*)\.[a-zA-Z]*[\.]?.*/,
              p = /^!alsius\.([a-zA-Z0-9\-]*)\.Command\.([a-zA-Z]*) (.*)$/,
              d = /^!alsius\.([a-zA-Z0-9\-]*)\.Data\.([a-zA-Z]*) (.*)$/,
              r = /^!alsius\.([a-zA-Z0-9\-]*)\.Error\.([a-zA-Z]*) (.*)$/,
              pq = eu.m,
              commandParts = null,
              errorParts = null,
              dataParts = null,
              command = null,
              data = null;
            if (eu.c === 'privatein' && eu.s === EXTbotname) {
              if (t.test(pq)) {
                commandParts = pq.match(p);
                errorParts = pq.match(r);
                dataParts = pq.match(d);
                if (commandParts !== null && commandParts.length === 4) {
                  command = commandParts[2]; // Bot commands allways use camelWords
                  if (commands[command] !== null) {
                    try {
                      // call command
                      var uuid = commandParts[1];
                      data = qx.lang.String.trim(commandParts[3]); // trimming input
                      if (commands[command](data, uuid)) {
                        this.chat.addMsg('/whisper ' + EXTbotname + ' !alsius.lou.Ok ' + command);
                      }
                    } catch (err_1) {
                      //console.log(err_1);
                      this.addChatMessage(i18n('ext:error_on_command') + ': ' + command, true);
                    }
                  } else {
                    this.chat.addMsg('/whisper ' + EXTbotname + ' !alsius.lou.Error ' + command);
                  }
                } else if (errorParts !== null && errorParts.length === 4) {
                  this.addChatMessage(i18n('ext:error_message') + ': ' + errorParts[2] + ', ' + errorParts[3], true);
                } else if (dataParts  !== null && dataParts.length === 4) {
                  debug(dataParts[3]);
                }
              }
            } else if (eu.c === 'privatein') {
              t = /^!LoU\.[a-zA-Z]*/i;
              p = /^!LoU\.([a-zA-Z]{2,})\s*(.*)$/i;
              if (t.test(pq)) {
                commandParts = pq.match(p);
                if (commandParts !== null && commandParts.length >= 2) {
                  command = commandParts[1].toLowerCase(); // Public commands are lowercase
                  if (commands[command] !== null) {
                    try {
                      // call command
                      data = qx.lang.String.trim(commandParts[2]) || ""; // trimming input
                      if (commands[command](data.toLowerCase(), eu.s)) {
                        this.chat.addMsg('/whisper ' + eu.s + ' !LoU.Ok ' + command);
                      }
                    } catch (err_2) {
                      //console.log(err_2);
                      this.addChatMessage(i18n('ext:error_on_command') + ': ' + command, true);
                    }
                  } else {
                    this.chat.addMsg('/whisper ' + eu.s + ' !LoU.Error ' + command);
                  }
                }
              }
            }
          },
          //important colors = downtimeAnnouncement,LoUWin,System,Info,social
          addChatMessage: function (message, prefix, color) {
            var _color = color || 'Info',
              _prefix = (prefix) ? 'Warriors Tools: (' + AlsiusTweakVersion + ') ' : '',
              eV = webfrontend.config.Config.getInstance()
              .getChat(),
              eN = '<font size="' + eV.getFontSize() + '" color="' + eV.getChannelColor(_color) + '" style="word-wrap: break-word;">' + _prefix + emotify(message) + '</font>';
            if (eV.getTimeStamp()) {
              var eO = webfrontend.data.ServerTime.getInstance(),
                eU = eO.getServerStep();
              if (eU) {
                eN = '<font color="' + eV.getTimeStampColor() + '">' + webfrontend.Util.getDateTimeString(eO.getStepTime(eU), false, true) + ' ' + eN;
              }
            }
            qx.core.Init.getApplication()
              .chat._outputMsg(eN, 'SYSTEM', 7);
          }
        }
      });
      qx.Class.define("AlsiusTweak.Stack", {
        type: "singleton",
        extend: qx.core.Object,
        construct: function () {
          this.base(arguments);
          this.stack = {};
        },
        members: {
          stack: null,
          // functions
          store: function (command) {
            var uuid = this.serial();
            this.stack[uuid] = command;
            return uuid;
          },
          execute: function (uuid, e) {
            if (this.stack.hasOwnProperty(uuid)) {
              this.stack[uuid].invoke(e);
              delete this.stack[uuid];
            }
          },
          cancel: function (uuid) {
            if (this.stack.hasOwnProperty(uuid)) {
              delete this.stack[uuid];
            }
          },
          serial: function () {
            var sn = function () {
              return Math.floor(
                Math.random() * 0x10000 /* 65536 */
              ).toString(16);
            };
            return (sn() + sn() + "-" +
                    sn() + "-" +
                    sn() + "-" +
                    sn() + "-" +
                    sn() + sn() + sn()
            ).toString();
          }
        }
      });
      qx.Class.define("AlsiusTweak.Command", {
        type: "singleton",
        extend: qx.core.Object,
        construct: function (enabled) {
          this.base(arguments);
        },
        members: {
          commandKey: null,
          enabled: true,
          stack: null,
          // bot & internal functions
          setEnable: function (enabled) {
            if (this.enabled === enabled) {
              return;
            }
            this.enabled = Boolean(Number(enabled));
            var main = AlsiusTweak.Main.getInstance();
            if(!this.enabled) {
              main.botState = -1;
              main.unRegisterTick();
              main.setPanelState(false);
              AlsiusTweak.Chat.getInstance()
                .addChatMessage(i18n('ext:login_kicked') + '!', true);
            } else {
              main.botState = 0;
            }
            return false;
          },
          setKey: function (key) {
            var retval = true;
            var main = AlsiusTweak.Main.getInstance();
            if (this.commandKey === key) {
              return retval;
            }
            if (key !== '') {
              this.commandKey = key;
              main.botState = 1;
              main.registerTick();
              main.setPanelState(true);
              AlsiusTweak.Chat.getInstance()
                .addChatMessage(i18n('ext:you_are_logged_in') + '!', true);
            } else {
              this.commandKey = null;
              main.botState = 0;
              main.unRegisterTick();
              main.setPanelState(false);
              AlsiusTweak.Chat.getInstance()
                .addChatMessage(i18n('ext:login_failed') + '!', true);
              retval = false;
            }
            return retval;
          },
          getKey: function () {
            return this.commandKey;
          },
          Note: function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
              .execute(key, result);
          },
          Claim: function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
              .execute(key, result);
          },
          Unclaim: function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
              .execute(key, result);
          },
          Settle: function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
              .execute(key, result);
          },
          Unsettle: function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
              .execute(key, result);
          },
          // public functions
          error: function (data, sender) {
            AlsiusTweak.Chat.getInstance()
              .addChatMessage(i18n('ext:error_on_command') + ': ' + data.charAt(0)
              .toUpperCase() + data.slice(1) + '@' + sender, true);
            return false;
          },
          ok: function (data, sender) { 
            AlsiusTweak.Chat.getInstance()
              .addChatMessage(i18n('ext:ok_message') + ': ' + data.charAt(0)
              .toUpperCase() + data.slice(1) + '@' + sender, true);
            return false;
          },
          like: function (data, sender) {
            AlsiusTweak.Chat.getInstance()
              .addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:like_message'), false, 'social');
						return (webfrontend.data.FriendList.getInstance().isFriendName(sender)||(webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
          },
          poke: function (data, sender) {
            AlsiusTweak.Chat.getInstance()
              .addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:poke_message'), false, 'social');
            return (webfrontend.data.FriendList.getInstance().isFriendName(sender)||(webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
          },
          vote: function (data, sender) {
            AlsiusTweak.Chat.getInstance()
              .addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:vote_message'), false, 'social');
            return (webfrontend.data.FriendList.getInstance().isFriendName(sender)||(webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
          },
          love: function (data, sender) {
            AlsiusTweak.Chat.getInstance()
              .addChatMessage(i18n('ext:love_message'), false, 'social');
            return (webfrontend.data.FriendList.getInstance().isFriendName(sender)||(webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
          },
          slap: function (data, sender) {
            AlsiusTweak.Chat.getInstance()
              .addChatMessage(i18n('ext:slap_message'), false, 'social');
            return (webfrontend.data.FriendList.getInstance().isFriendName(sender)||(webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
          }
        }
      });
      qx.Class.define("AlsiusTweak.ui.LeftPanel", {
        extend: qx.ui.container.Composite,
        construct: function (label) {
          this.base(arguments);
          this.stateIcon = new qx.ui.basic.Image('webfrontend/ui/icons/icon_alliance_grey_17.png')
            .set({
            toolTipText: i18n('ext:offline'),
            width: 17,
            height: 17,
            scale: true
          });
          this.state = false;
          this.buildPanelUI(label);
        },
        members: {
          content: null,
          state: null,
          stateIcon: null,
          // functions
          buildPanelUI: function (labelText) {
            this.setLayout(new qx.ui.layout.Canvas());
            this.set({
              marginTop: 3,
              marginBottom: 3
            });
            var bg = new qx.ui.basic.Image('webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_scaler.png')
              .set({
              width: 338,
              scale: true,
              allowGrowY: true,
              height: 75
            });
            this.add(bg, {
              left: 0,
              top: 26
            });
            bg = new qx.ui.basic.Image('webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png');
            this.add(bg, {
              left: 0,
              top: 78
            });
            bg = new qx.ui.basic.Image("webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_wide.png");
            this.add(bg, {
              left: 0,
              top: 5
            });
            this.add(this.stateIcon, {
              left: 310,
              top: 12
            });
            var label = new qx.ui.basic.Label(labelText);
            label.setFont('font_headline_serif_small');
            label.setWidth(290);
            label.setAppearance('sidewindow-subheadline');
            label.setTextAlign('left');
            this.add(label, {
              left: 12,
              top: 9
            });
            this.content = new qx.ui.container.Composite();
            this.content.setLayout(new qx.ui.layout.VBox(5));
            this.content.set({
              width: 322,
              marginBottom: 8
            });
            this.add(this.content, {
              top: 38,
              left: 8
            });
          },
          getContent: function () {
            return this.content;
          },
          addContent: function (widget, args) {
            this.content.add(widget, args);
          },
          setState: function (state) {
            if (state) {
              this.state = true;
              this.stateIcon.setSource('webfrontend/ui/icons/icon_alliance_green_17.png');
              this.stateIcon.setToolTipText(i18n('ext:you_are_logged_in'));
            } else {
              this.state = false;
              this.stateIcon.setSource('webfrontend/ui/icons/icon_alliance_red_17.png');
              this.stateIcon.setToolTipText(i18n('ext:login_failed'));
            }
          }
        }
      });
      /* Thanks to One Defiant Extension, or The Defiant (TDK) Extension http://www.senocular.com/chrome/extensions/lou/LoUDefiant_about.html */
      qx.Class.define("AlsiusTweak.ui.Notepad", {
        extend: qx.ui.window.Window,
        events:{
          dataChanged: "qx.event.type.Event"
        },
        statics: {
          getRenderedText: function(sourceText) {
            return webfrontend.gui.Util.convertBBCode(webfrontend.gui.Util.generateBBCode(sourceText));
          },
          create: function(sourceText, isSaved) {
            var note = new AlsiusTweak.ui.Notepad(sourceText, Boolean(isSaved));
            note.center();
            note.open();
            return note;
          }
        },
        construct: function(sourceText, saved) {
          this.base(arguments, i18n("ext:notepad"));
          this.buildUI();
          this.addListener("close", this.updateData, this);
          this.setSourceText(sourceText);
          if (sourceText) {
            this.setState('displayRendered');
          } else {
            this.setState('displayEdit');
          }
          this.rememberCheck.setValue(Boolean(saved));
        },
        members: {
          state:null,
          sourceText:null,
          updateText:null,
          displayContainer:null,
          displayRendered:null,
          displayEdit:null,
          renderedText:null,
          rememberCheck:null,
          toggleEditButton:null,
          buildUI: function() {
            var app = qx.core.Init.getApplication();
            this.set({width:    300,
                      minWidth: 100,
                      maxWidth: 1000,
                      height:   300,
                      minHeight:100,
                      maxHeight:800,
                      allowMaximize:false,
                      allowMinimize:false,
                      showMaximize:false,
                      showMinimize:false,
                      showStatusbar:false,
                      showClose:false,
                      resizeSensitivity:7,
                      contentPadding:5,
                      useMoveFrame:true
            });
            this.setLayout(new qx.ui.layout.VBox(2));
            this.moveTo(406,64);
            webfrontend.gui.Util.formatWinClose(this);
            
            // create elements
            this.displayContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
            this.displayRendered = new qx.ui.container.Scroll();
            var renderedTextContainer = new qx.ui.container.Composite(new qx.ui.layout.Grow());
            this.renderedText = new qx.ui.basic.Label("").set({rich:true, selectable:true});
            var buttonRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
            this.rememberCheck = new qx.ui.form.CheckBox(i18n("ext:save"));
            var buttonSpacer = new qx.ui.core.Spacer();
            this.toggleEditButton = new qx.ui.form.Button(i18n("ext:edit"));
            this.toggleEditButton.addListener("execute", this.toggleEdit, this);
            this.displayEdit = new qx.ui.form.TextArea("");
            app.setElementModalInput(this.displayEdit);
            
            // add elements
            this.displayRendered.add(renderedTextContainer);
            renderedTextContainer.add(this.renderedText);
            this.add(this.displayContainer, {flex:1});
            this.add(buttonRow);
            buttonRow.add(this.rememberCheck);
            buttonRow.add(buttonSpacer, {flex:1});
            buttonRow.add(this.toggleEditButton);
          },
          getSaved: function() {
            return this.rememberCheck.getValue();
          },
          setSaved: function(value) {
            this.rememberCheck.setValue(value);
          },
          getSourceText: function() {
            return this.displayEdit.getValue();
          },
          setState: function(state) {
            if (this.state === state) {
              return;
            }
            this.displayContainer.removeAll();
            this.state = state;
            switch (this.state) {
              case 'displayRendered':
                this.displayContainer.add(this.displayRendered, {flex:1});
                this.toggleEditButton.setLabel(i18n("ext:edit"));
                this.rememberCheck.setVisibility("excluded");
                break;
              case 'displayEdit':
                this.displayContainer.add(this.displayEdit, {flex:1});
                this.toggleEditButton.setLabel(i18n("ext:done"));
                this.rememberCheck.setVisibility("visible");
                break;
            }
          },
          setSourceText: function(sourceText) {
            
            if (!sourceText) {
              this.sourceText = "";
              this.updateText = "";
            } else {
              this.sourceText = sourceText;
              this.displayEdit.setValue(this.sourceText);
              this.updateRenderedText();
            }
          },
          updateRenderedText: function() {
            this.updateText = this.displayEdit.getValue();
            this.renderedText.setValue(AlsiusTweak.ui.Notepad.getRenderedText(this.updateText));
          },
          toggleEdit: function() {
            if (this.state === 'displayRendered') {
              this.setState('displayEdit');
            } else {
              this.setState('displayRendered');
              this.updateData(true);
            }
          },
          updateData: function(saveText) {
            if (this.getSaved() && this.updateText !== this.getSourceText() && saveText) {
              this.updateRenderedText();
              console.log('note: update');
              this.fireNonBubblingEvent("dataChanged");
            } else {
              if (this.updateText !== this.getSourceText()) {
                this.setSourceText(this.updateText);
              }
              console.log('note: no update');
            }
          }
        }
      });
      qx.Class.define("AlsiusTweak.ui.ExtraTools", {
        extend: AlsiusTweak.ui.LeftPanel,
        construct: function (title) {
          this.base(arguments, title);
          this.buildUI();
          qx.util.TimerManager.getInstance()
            .start(function () {
            this.checkButtons();
          }, null, this, null, 1000 * 5);
        },
        statics: {
          getOrderList: function (filterFunc) {
            var activeCity = webfrontend.data.City.getInstance(),
              unitOrders = activeCity.getUnitOrders(),
              idList = [];
            if (unitOrders !== null) {
              unitOrders.forEach(function (order) {
                if (filterFunc(order)) {
                  idList.push(order.id);
                }
              });
            }
            return idList;
          },
          cancelAll: function (callback, self) {
            var orderList = this.getOrderList(function (order) {
              return AlsiusTweak.ui.ExtraTools.canOrderBeCancelled(order) || (order.type === 8 && order.recurringType !== 0);
            });
            AlsiusTweak.ui.ExtraTools.cancelOrders(orderList, callback, self);
          },
          cancelAllRaids: function (callback, self) {
            var orderList = this.getOrderList(function (order) {
              return order.type === 8 && (order.recurringType !== 0 || AlsiusTweak.ui.ExtraTools.canOrderBeCancelled(order));
            });
            AlsiusTweak.ui.ExtraTools.cancelOrders(orderList, callback, self);
          },
          loadBosIntel: function (callback, self) {
            if (typeof window.bos === 'undefined') {
              return false;
            }
          },
          canOrderBeCancelled: function (order) {
            var serverTime = webfrontend.data.ServerTime.getInstance();
            return (order.state !== 2) && (order.start > serverTime.getServerStep() - 600);
          },
          getOrder: function (city, orderId) {
            var unitOrders = city.getUnitOrders(),
              i = null;
            if (unitOrders !== null) {
              for (i = 0; i < unitOrders.length; i++) {
                if (unitOrders[i].id === orderId) {
                  return unitOrders[i];
                }
              }
            }
            return null;
          },
          cancelUnitOrder: function (orderId, callback, self) {
            var activeCity = webfrontend.data.City.getInstance(),
              order = this.getOrder(activeCity, orderId);
            if (order === null) {
              throw new Error("Order not found");
            }
            if (!this.canOrderBeCancelled(order)) {
              throw new Error("Order cannot be cancelled");
            }
            var command = "CancelUnitOrder",
              request = {
                cityid: activeCity.getId(),
                id: orderId,
                isDelayed: order.state === 0
              };
            var commandManager = webfrontend.net.CommandManager.getInstance();
            commandManager.sendCommand(command, request, null, function (unknown, ok) {
              callback.call(self, ok ? null : new Error("Error executing " + command + " command"));
            });
          },
          cancelRaidOrder: function (orderId, callback, self) {
            var activeCity = webfrontend.data.City.getInstance(),
              order = this.getOrder(activeCity, orderId);
            if (order === null) {
              throw new Error("Order not found");
            }
            if (order.type !== 8) {
              throw new Error("Order is not a raid");
            }
            var command = "UnitOrderSetRecurringOptions",
              request = {
                cityid: activeCity.getId(),
                id: orderId,
                isDelayed: order.state === 0,
                recurringType: 0
              };
            var commandManager = webfrontend.net.CommandManager.getInstance();
            commandManager.sendCommand(command, request, null, function (unknown, ok) {
              callback.call(self, ok ? null : new Error("Error executing " + command + " command"));
            });
          },
          cancelOrder: function (orderId, callback, self) {
            var activeCity = webfrontend.data.City.getInstance(),
              order = this.getOrder(activeCity, orderId);
            if (order === null) {
              throw new Error("Order not found");
            }
            if (this.canOrderBeCancelled(order)) {
              this.cancelUnitOrder(orderId, callback, self);
            } else {
              if (order.type === 8) {
                this.cancelRaidOrder(orderId, callback, self);
              } else {
                throw new Error("Order cannot be cancelled");
              }
            }
          },
          cancelOrders: function (orderIdList, callback, self) {
            var that = this,
              listCopy = [].concat(orderIdList),
              delay = 0;
            var cancelFunc = function (err) {
              if (err) {
                callback.call(self, err);
                return;
              }
              var orderId = listCopy.pop();
              if (orderId) {
                window.setTimeout(function () {
                  delay = 500;
                  try {
                    that.cancelOrder(orderId, cancelFunc);
                  } catch (ex) {
                    callback.call(self, ex);
                  }
                }, delay);
              } else {
                callback.call(self, null);
              }
            };
            cancelFunc(null);
          }
        },
        members: {
          fillQueueButton: null,
          payQueueButton: null,
          infoButton: null,
          cancelAllButton: null,
          cancelRaidsButton: null,
          scheduleButton: null,
          loadIntelButton: null,
          installBosButton: null,
          // functions
          buildUI: function () {
            // first row
            // Queue buttons (Thank you MousePak!)
            var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)),
              bmImage = new qx.ui.basic.Image('webfrontend/ui/icons/ministers/icon_build_minister_btn.png')
                .set({
                paddingTop: 3,
                height: 17,
                width: 27,
                scale: true
              });
            bmImage.setToolTipText(i18n('ext:if_bm_available'));
            row.add(bmImage);
            // fillQueueButton
            this.fillQueueButton = new qx.ui.form.Button(i18n('ext:fill_build_queue'))
              .set({
              width: 96,
              appearance: "button-text-small",
              toolTipText: i18n('ext:fill_build_queue')
            });
            this.fillQueueButton.addListener("execute", this.fillBuildingQueue, this);
            row.add(this.fillQueueButton, {
              top: 0,
              left: 32
            });
            this.fillQueueButton.setEnabled(false);
            // payQueueButton
            this.payQueueButton = new qx.ui.form.Button(i18n('ext:convert_all_builds'))
              .set({
              width: 104,
              appearance: "button-text-small",
              toolTipText: i18n('ext:convert_all_builds')
            });
            this.payQueueButton.addListener("execute", this.payBuildingQueue, this);
            row.add(this.payQueueButton);
            this.payQueueButton.setEnabled(false);
            // Spacer
            row.add(new qx.ui.core.Widget()
              .set({
              height: 0
            }), {
              flex: 1
            });
            // infoButton
            var infoButton = new qx.ui.form.Button("?")
              .set({
              width: 25,
              appearance: "button-text-small",
              toolTipText: i18n('ext:licence_info')
            });
            infoButton.addListener("execute", this.showHelp, this);
            row.add(infoButton);
            this.addContent(row, {
              top: 3,
              left: 0
            });
            // second row
            // Cancel order buttons (Thank you ventrix!)
            row = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
            var wmImage = new qx.ui.basic.Image('webfrontend/ui/icons/ministers/icon_war_minister_btn.png')
              .set({
              paddingTop: 3,
              paddingRight: 6,
              height: 17,
              width: 27,
              scale: true
            });
            wmImage.setToolTipText(i18n('ext:if_wm_available'));
            row.add(wmImage);
            // cancelAllButton
            this.cancelAllButton = new qx.ui.form.Button(i18n('ext:cancel_all_orders'))
              .set({
              width: 96,
              appearance: "button-text-small",
              toolTipText: i18n('ext:cancel_all_orders')
            });
            this.cancelAllButton.addListener("execute", this.cancelAllOrders, this);
            row.add(this.cancelAllButton, {
              top: 0,
              left: 32
            });
            this.cancelAllButton.setEnabled(false);
            // cancelRaidsButton
            this.cancelRaidsButton = new qx.ui.form.Button(i18n('ext:cancel_raid_orders'))
              .set({
              width: 104,
              appearance: "button-text-small",
              toolTipText: i18n('ext:cancel_raid_orders')
            });
            this.cancelRaidsButton.addListener("execute", this.cancelRaidOrders, this);
            row.add(this.cancelRaidsButton);
            this.cancelRaidsButton.setEnabled(false);
            // Spacer
            row.add(new qx.ui.core.Widget()
              .set({
              height: 0
            }), {
              flex: 1
            });
            // scheduleButton
            this.scheduleButton = new qx.ui.form.Button('\u267a')
              .set({
              width: 25,
              appearance: "button-text-small",
              toolTipText: i18n('ext:schedule_raid_orders')
            });
            this.scheduleButton.addListener("execute", this.scheduleRaidOrders, this);
            row.add(this.scheduleButton);
            this.scheduleButton.setEnabled(false);
            this.addContent(row, {
              top: 30,
              left: 0
            });
            // third row
            row = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
            var bosImage = new qx.ui.basic.Image("data:;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAARCAYAAAAsT9czAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAVlJREFUSEvdVKFOw1AUfQIxMwRuaSYICaIaEmzFEswEaj+wTyDBg0PVzJFMkSBRSyZIEMwiCAIxRRB8Ql05p5zb3Lx0natok5O+d9/pufe+e29DWZahK3TmiAn12FlAcg1Ywzb2tcT+Evhx3HesJxFnDNurOI/UAObGwTrMdZjhPQCutV850r1sPCOHeJDNi61guwEOgBHwstNZVcQQTiRSaH+u/RdFXACHLstEXArcOU7SltlQkfGjKmKXaR6PCM7e5HAmrmX7CfuVD07n9TX62t2COBQhl2CbMwuM18tamdYW69PGmkn8GIRf4BvgVVkN25xNo0ahxlJOP3Y6k8OFiGyadE/NCgal7+qm0p7NguX/X4qPdWPVxnguAAoQVnjjMEt2mu/GzIlRgJ3L2pPHoJ+9s3jO6IRzljbMGWfL+OScRZwn2DhbG/F4lUe1s65+wj3/N3Z5jX84GscB59wFIgAAAABJRU5ErkJggg==")
              .set({
              paddingTop: 3,
              paddingRight: 6,
              height: 17,
              width: 27,
              scale: true
            });
            bosImage.setToolTipText(i18n('ext:if_bos_available'));
            row.add(bosImage);
            // loadIntelButton
            this.loadIntelButton = new qx.ui.form.Button(i18n('ext:load_intel'))
              .set({
              width: 96,
              appearance: "button-text-small",
              toolTipText: i18n('ext:load_intel')
            });
            this.loadIntelButton.addListener("execute", this.loadIntel, this);
            row.add(this.loadIntelButton, {
              top: 0,
              left: 32
            });
            this.loadIntelButton.setEnabled(false);
            // Spacer
            row.add(new qx.ui.core.Widget()
              .set({
              height: 0
            }), {
              flex: 1
            });
            // installBosButton
            var installBosButton = new qx.ui.form.Button("\u26a1")
              .set({
              width: 25,
              appearance: "button-text-small",
              toolTipText: i18n('ext:install_bos')
            });
            installBosButton.addListener("execute", this.goInstallBos, this);
            row.add(installBosButton);
            this.addContent(row, {
              top: 57,
              left: 0
            });
          },
          goInstallBos: function () {
            webfrontend.gui.Util.openLink('http://userscripts.org/scripts/show/84343', i18n('ext:bos_link_text'));
          },
          loadIntel: function () {
            this.loadIntelButton.setEnabled(false);
            this.self(arguments)
              .loadBosIntel(function (err) {
              this.loadIntelButton.setEnabled(true);
              if (err) {
                debug(err);
              }
            }, this);
          },
          scheduleRaidOrders: function () {
            var dialog = AlsiusTweak.ui.ReturnByWindow.getInstance();
            dialog.center();
            dialog.show();
          },
          cancelAllOrders: function () {
            this.cancelAllButton.setEnabled(false);
            this.self(arguments)
              .cancelAll(function (err) {
              this.cancelAllButton.setEnabled(true);
              if (err) {
                debug(err);
              }
            }, this);
          },
          cancelRaidOrders: function () {
            this.cancelRaidsButton.setEnabled(false);
            this.self(arguments)
              .cancelAllRaids(function (err) {
              this.cancelRaidsButton.setEnabled(true);
              if (err) {
                debug(err);
              }
            }, this);
          },
          fillBuildingQueue: function () {
            var activeCity = webfrontend.data.City.getInstance();
            webfrontend.net.CommandManager.getInstance()
              .sendCommand("BuildingQueueFill", {
              cityid: activeCity.getId()
            }, null, function () {});
          },
          payBuildingQueue: function () {
            var activeCity = webfrontend.data.City.getInstance();
            webfrontend.net.CommandManager.getInstance()
              .sendCommand("BuildingQueuePayAll", {
              cityid: activeCity.getId()
            }, null, function () {});
          },
          showHelp: function () {
            var dialog = AlsiusTweak.ui.AboutWindow.getInstance();
            dialog.center();
            dialog.show();
          },
          checkButtons: function () {
            this.fillQueueButton.setEnabled(AlsiusTweak.Main.getInstance()
              .ministerPresent.BuildMinister);
            this.payQueueButton.setEnabled(AlsiusTweak.Main.getInstance()
              .ministerPresent.BuildMinister);
            this.cancelAllButton.setEnabled(AlsiusTweak.Main.getInstance()
              .ministerPresent.MilitaryMinister);
            this.cancelRaidsButton.setEnabled(AlsiusTweak.Main.getInstance()
              .ministerPresent.MilitaryMinister);
            this.scheduleButton.setEnabled(AlsiusTweak.Main.getInstance()
              .ministerPresent.MilitaryMinister);
            this.loadIntelButton.setEnabled(AlsiusTweak.Main.getInstance()
              .bosPresent && this.state);
            qx.util.TimerManager.getInstance()
              .start(function () {
              this.checkButtons();
            }, null, this, null, 1000 * 60);
          }
        }
      });
      qx.Class.define("AlsiusTweak.ui.TimePicker", {
        extend: qx.ui.container.Composite,
        construct: function (caption) {
          this.base(arguments);
          this.buildUI(caption);
        },
        properties: {
          value: {
            check: "Date",
            init: new Date(0),
            apply: "_applyValue"
          }
        },
        events: {
          changeValue: "qx.event.type.Data"
        },
        members: {
          _dateSelect: null,
          _hourText: null,
          _minuteText: null,
          _secondText: null,
          _applyingValue: false,
          _updatingValue: false,
          // functions
          buildUI: function (caption) {
            var app = qx.core.Init.getApplication();
            this.setLayout(new qx.ui.layout.HBox(5));
            if (caption !== null) {
              var captionLabel = new qx.ui.basic.Label(caption);
              captionLabel.set({
                allowGrowX: false,
                font: "bold",
                paddingTop: 3
              });
              captionLabel.setTextAlign('left');
              this.add(captionLabel);
              this.add(new qx.ui.core.Widget()
                .set({
                height: 0
              }), {
                flex: 1
              });
            }
            this._hourText = new qx.ui.form.TextField("0");
            this._hourText.set({
              width: 26,
              maxLength: 2
            });
            this._hourText.addListener("changeValue", this._onValidateHour, this._hourText);
            app.setElementModalInput(this._hourText);
            this.add(this._hourText);
            this._minuteText = new qx.ui.form.TextField("0");
            this._minuteText.set({
              width: 26,
              maxLength: 2
            });
            this._minuteText.addListener("changeValue", this._onValidateMinute, this._minuteText);
            app.setElementModalInput(this._minuteText);
            this.add(this._minuteText);
            this._secondText = new qx.ui.form.TextField("0");
            this._secondText.set({
              width: 26,
              maxLength: 2
            });
            this._secondText.addListener("changeValue", this._onValidateMinute, this._secondText);
            app.setElementModalInput(this._secondText);
            this.add(this._secondText);
            this._dateSelect = new qx.ui.form.SelectBox();
            this._dateSelect.set({
              width: 90
            });
            this._dateSelect.add(new qx.ui.form.ListItem(i18n("ext:today"), null, 0));
            this._dateSelect.add(new qx.ui.form.ListItem(i18n("ext:tomorrow"), null, 1));
            this._dateSelect.add(new qx.ui.form.ListItem(i18n("ext:2 days"), null, 2));
            this._dateSelect.add(new qx.ui.form.ListItem(i18n("ext:3 days"), null, 3));
            this._dateSelect.add(new qx.ui.form.ListItem(i18n("ext:4 days"), null, 4));
            this._dateSelect.add(new qx.ui.form.ListItem(i18n("ext:5 days"), null, 5));
            this._dateSelect.add(new qx.ui.form.ListItem(i18n("ext:6 days"), null, 6));
            this._dateSelect.add(new qx.ui.form.ListItem(i18n("ext:7 days"), null, 7));
            this.add(this._dateSelect);
            this._hourText.addListener("changeValue", this._updateValue, this);
            this._minuteText.addListener("changeValue", this._updateValue, this);
            this._secondText.addListener("changeValue", this._updateValue, this);
            this._dateSelect.addListener("changeSelection", this._updateValue, this);
          },
          fireChangeValue: function () {
            this.fireDataEvent("changeValue", this.getValue());
          },
          _applyValue: function (value) {
            if (this._updatingValue) {
              return;
            }
            var gameNow = webfrontend.Util.getCurrentTime()
              .getTime(),
              totalDaysNow = Math.floor(gameNow / (24 * 3600 * 1000)),
              totalDaysValue = Math.floor(value.getTime() / (24 * 3600 * 1000)),
              daysOffset = totalDaysValue - totalDaysNow;
            try {
              this._applyingValue = true;
              this._hourText.setValue(String(value.getUTCHours()));
              this._minuteText.setValue(String(value.getUTCMinutes()));
              this._secondText.setValue(String(value.getUTCSeconds()));
              this._dateSelect.setModelSelection([daysOffset]);
            } finally {
              this._applyingValue = false;
            }
            this.fireChangeValue();
          },
          _updateValue: function () {
            if (this._applyingValue) {
              return;
            }
            var dz = webfrontend.data.ServerTime.getInstance(),
            dy = webfrontend.Util.getCurrentTime(),
            dA = 0;
            if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
              dy.setHours(dy.getHours() + dy.getTimezoneOffset() / 60);
              dA += dy.getTimezoneOffset() / 60;
            }
            if (webfrontend.config.Config.getInstance().getTimeZone() === 1) {
              dA += dz.getServerOffset() / 1000 / 60 / 60;
            } else if (webfrontend.config.Config.getInstance().getTimeZone() === 2) {
              dA += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
            }
            dy.setDate(dy.getDate() + this._dateSelect.getSelection()[0].getModel());
            dy.setHours(this._hourText.getValue() - dA);
            dy.setMinutes(this._minuteText.getValue());
            dy.setSeconds(this._secondText.getValue());
            try {
              this._updatingValue = true;
              this.setValue(dy);
            }
            finally {
              this._updatingValue = false;
            }
            this.fireChangeValue();
          },
          _onValidateHour: function (e) {
            var num = Math.floor(Number(e.getData()));
            if (num > 23) {
              e.stopPropagation();
              this.setValue("23");
            } else {
              if (num < 0 || isNaN(num)) {
                e.stopPropagation();
                this.setValue("0");
              } else {
                if (String(num) !== e.getData()) {
                  e.stopPropagation();
                  this.setValue(String(num));
                }
              }
            }
          },
          _onValidateMinute: function (e) {
            var num = Math.floor(Number(e.getData()));
            if (num > 59) {
              e.stopPropagation();
              this.setValue("59");
            } else {
              if (num < 0 || isNaN(num)) {
                e.stopPropagation();
                this.setValue("0");
              } else {
                if (String(num) !== e.getData()) {
                  e.stopPropagation();
                  this.setValue(String(num));
                }
              }
            }
          }
        }
      });
      qx.Class.define("AlsiusTweak.ui.ReturnByWindow", {
        type: "singleton",
        extend: qx.ui.window.Window,
        construct: function () {
          this.base(arguments, i18n('ext:schedule_raid_orders'));
          this.buildUI();
        },
        members: {
          _returnTime: null,
          // functions
          buildUI: function () {
            var app = qx.core.Init.getApplication();
            this.setLayout(new qx.ui.layout.VBox(2));
            this.set({
              allowMaximize: false,
              allowMinimize: false,
              showMaximize: false,
              showMinimize: false,
              showStatusbar: false,
              showClose: false,
              contentPadding: 5,
              useMoveFrame: true,
              resizable: false
            });
            this.setWidth(280);
            webfrontend.gui.Util.formatWinClose(this);
            this._returnTime = new AlsiusTweak.ui.TimePicker(i18n("ext:return_time"));
            this.add(this._returnTime);
            var firstRow = new qx.ui.container.Composite();
            firstRow.setLayout(new qx.ui.layout.HBox());
            this.add(firstRow);
            var applyButton = new qx.ui.form.Button(i18n("ext:apply"))
              .set({
              appearance: "button-text-small",
              toolTipText: i18n('ext:apply_tooltip')
            });
            applyButton.addListener("execute", this.returnRaidsBy, this);
            firstRow.add(applyButton);
            firstRow.add(new qx.ui.core.Widget()
              .set({
              height: 0
            }), {
              flex: 1
            });
            var closeButton = new qx.ui.form.Button(i18n("ext:close"))
              .set({
              appearance: "button-text-small"
            });
            closeButton.addListener("execute", this.hide, this);
            firstRow.add(closeButton);
          },
          returnRaidsBy: function () {
            var returnBy = this._returnTime.getValue()
              .getTime(),
              st = webfrontend.data.ServerTime.getInstance(),
              serverStep = st.getServerStep(),
              gameNow = webfrontend.Util.getCurrentTime()
                .getTime(),
              delta = Math.floor((returnBy - gameNow) / 1000) + 1,
              currRecurrType = 2,
              orders = webfrontend.data.City.getInstance()
                .unitOrders,
              i = null;
            returnBy = serverStep + delta;
            for (i in orders) {
              if (orders[i].type === 8) {
                webfrontend.net.CommandManager.getInstance()
                  .sendCommand("UnitOrderSetRecurringOptions", {
                  cityid: webfrontend.data.City.getInstance()
                    .getId(),
                  id: orders[i].id,
                  isDelayed: orders[i].isDelayed,
                  recurringType: currRecurrType,
                  recurringEndStep: (returnBy)
                }, null, null);
              }
            }
            this.hide();
          }
        }
      });
      qx.Class.define("AlsiusTweak.ui.AboutWindow", {
        type: "singleton",
        extend: qx.ui.window.Window,
        construct: function () {
          this.base(arguments, 'Warriors Tools v' + EXTversion);
          this.buildUI();
          // Refresh dev info every time
          this.addListener("appear", this.loadDeveloperInfo, this);
        },
        members: {
          _developerInfoText: null,
          _player: null,
          // functions
          getPlayerData: function () {
            var player = webfrontend.data.Player.getInstance(),
              server = webfrontend.data.Server.getInstance(),
              _player = {
                id: player.getId(),
                name: player.getName(),
                version: EXTversion
              };
            return _player;
          },
          buildUI: function () {
            var app = qx.core.Init.getApplication();
            this.setLayout(new qx.ui.layout.VBox(10));
            this.set({
              allowMaximize: false,
              allowMinimize: false,
              showMaximize: false,
              showMinimize: false,
              showStatusbar: false,
              showClose: false,
              contentPadding: 5,
              useMoveFrame: true,
              resizable: true
            });
            this.setWidth(400);
            webfrontend.gui.Util.formatWinClose(this);
            // Licensing
            var licenseLabel = new qx.ui.basic.Label("License")
              .set({
              font: "bold"
            });
            this.add(licenseLabel);
            var license = "Warriors Tools - GreaseMonkey script for Lord of Ultima™";
            license += "\nCopyright © 2013 " + EXTauthors;
            license += "\n\n";
            license += GPL;
            var licenseText = new qx.ui.form.TextArea();
            licenseText.set({
              readOnly: true,
              wrap: true,
              autoSize: true,
              tabIndex: 303,
              minHeight: 280
            });
            licenseText.setValue(license);
            this.add(licenseText);
            // Developer Info
            var devInfoLabel = new qx.ui.basic.Label("Developer Info")
              .set({
              font: "bold"
            });
            this.add(devInfoLabel);
            this._player = this.getPlayerData();
            this._developerInfoText = new qx.ui.form.TextArea();
            this._developerInfoText.set({
              readOnly: true,
              autoSize: true,
              tabIndex: 304,
              height: 50
            });
            app.setElementModalInput(this._developerInfoText);
            this.add(this._developerInfoText);
            // Close button
            var closeButton = new qx.ui.form.Button("Close");
            closeButton.addListener("execute", this.hide, this);
            this.add(closeButton);
          },
          loadDeveloperInfo: function () {
            var output = 'Session ID: ' + webfrontend.net.CommandManager.getInstance()
              .getInstanceGuid() + '\n';
            output += 'City ID: ' + webfrontend.data.City.getInstance()
              .getId() + '\n';
            output += 'Player ID: ' + this._player.id + '\n';
            output += 'Player Name: ' + this._player.name + '\n';
            output += 'Player ExT: ' + this._player.version + '\n';
            this._developerInfoText.setValue(output);
            this._developerInfoText.selectAllText();
          }
        }
      });
      qx.Class.define("AlsiusTweak.worldData", {
        type: "singleton",
        extend: qx.core.Object,
        construct: function () {
          this.base(arguments);
        },
        members: {
          contextObject: null,
          worldCoords: null,
          init: function () {
            // add mouse event
            qx.bom.Element.addListener(qx.core.Init.getApplication()
              .worldView, "mousedown", this.onMouseDown, this);
            var fc = ClientLib.Vis.VisMain.GetInstance();
            fc.get_Data = function (a, b) {
              var d = ((b << 0x10) | a),
                e = Math.floor(Math.floor((a / 32))),
                f = Math.floor(Math.floor((b / 32))),
                g = ((f << 5) | e),
                h = ClientLib.Data.MainData.GetInstance()
                .OP()
                .AV(g);
  
              if (h !== null) {
                var i = (a - (e * 0x20)),
                  j = (b - (f * 0x20)),
                  k = h.GetObject(i, j);
                if (k === null) {
                  return null;
                }
                if (k.Type === ClientLib.Data.WorldSector.ObjectType.City) {
                  k.p = h.GetPlayer(k.Player);
                  k.a = ((k.p !== null) ? h.GetAlliance(k.p.Alliance) : null);
                }
                return k;
              }
            };
            //todo: find a better place to extend webfrontend.gui.Util
            webfrontend.gui.Util.getDistance = function (a, b, c, d) {//getDistanceByCoord
                var dX = Math.abs(a - c),
                  dY = Math.abs(b - d);
                return Math.sqrt(Math.pow(dX, 2.0) + Math.pow(dY, 2.0));
            };
            webfrontend.gui.Util.getDistanceUsingIds = function (iS, iT) {
                return webfrontend.gui.Util.getDistance(iS & 0xFFFF, iS >> 16, iT & 0xFFFF, iT >> 16);
            };
            webfrontend.gui.Util.convertCoordinatesToId = function (a, b) {
                var iD = (a << 16) & b;
                return iD;
            };
            webfrontend.gui.Util.getContinentFromId = function (iD) {
              return webfrontend.data.Server.getInstance()
                .getContinentFromCoords(iD & 0xFFFF, iD >> 16);
            };
          },
          onMouseDown: function (eJ) {
            if (eJ.getButton() !== 'right') {
              return;
            }
            if (this.worldCoords === null) {
              this.worldCoords = {};
            }
            qx.core.Init.getApplication()
              .worldView.capture();
            var eK = ClientLib.Vis.VisMain.GetInstance();
            if (eK.get_Mode() !== ClientLib.Vis.Mode.City) {
              var location = qx.core.Init.getApplication()
                .worldView.getContentLocation();
              this.worldCoords.x = (eJ.getDocumentLeft() - location.left);
              this.worldCoords.y = (eJ.getDocumentTop() - location.top);
              return this.updateContextObject();
            }
          },
          getContextObject: function () {
            return this.contextObject;
          },
          initContextObject: function () {
            this.contextObject = {};
            this.contextObject.dirty = false;
            this.contextObject.nodata = true;
          },
          updateContextObject: function () {
            this.initContextObject();
            var fc = ClientLib.Vis.VisMain.GetInstance();
            
            if (fc.get_Mode() !== ClientLib.Vis.Mode.City) {
              if (fc.get_Mode() === ClientLib.Vis.Mode.Region) {
                fc.get_Region()
                  .ShowSelectorMarkerRegion(-1, - 1);
              } else {
                fc.get_World()
                  .ShowSelectorMarkerWorld(-1, - 1);
              }
              var fg = fc.GetObjectCoordsFromViewPosition(this.worldCoords.x, this.worldCoords.y);
              if (fg !== -1) {
                var fk = fc.GetObjectFromViewPosition(this.worldCoords.x, this.worldCoords.y);
                this.contextObject = fk;
                this.contextObject.nodata = false;
                this.contextObject.id = fg;
                this.contextObject.get_Id = function () {
                  return this.id;
                };
                this.contextObject.xPos = fg & 0xFFFF;
                this.contextObject.get_PosX = function () {
                  return this.xPos;
                };
                this.contextObject.yPos = fg >> 16;
                this.contextObject.get_PosY = function () {
                  return this.yPos;
                };
                this.contextObject.get_Pos = function () {
                  return webfrontend.gui.Util.formatCoordinates(this.xPos, this.yPos);
                };
                if (fc.get_Mode() === ClientLib.Vis.Mode.Region) {
                  fc.get_Region()
                    .ShowSelectorMarkerRegion(fg & 0xFFFF, fg >> 16);
                  var _or = fc.get_Data(fg & 0xFFFF, fg >> 16);
                  if (_or !== null) {
                    switch (_or.Type) {
                      case ClientLib.Data.WorldSector.ObjectType.City:
                        this.contextObject.Castle = _or.Castle;
                        this.contextObject.get_StrongHold = function () {
                          return this.Castle;
                        };
                        this.contextObject.Water = _or.Water;
                        this.contextObject.get_OnWater = function () {
                          return this.Water;
                        };
                        break;
                      case ClientLib.Data.WorldSector.ObjectType.Moongate:
                        this.contextObject.State = _or.eMoongateState;
                        this.contextObject.get_State = function () {
                          return this.State;
                        };
                        break;
                      case ClientLib.Data.WorldSector.ObjectType.LawlessCity:
                        this.calculateSettle(fg); 
                        this.contextObject.get_UIType = function () {
                          return (_or.Abandoned) ? ABANDONED_TYPE : LAWLESS_TYPE;
                        };
                        this.contextObject.Name = (_or.Castle) ? i18n("ext:lawless_city_with_castle") : ((_or.Ruin) ? i18n("ext:ruins") : i18n("ext:lawless_city"));
                        this.contextObject.get_Name = function () {
                          return this.Name;
                        };
                        this.contextObject.Castle = _or.Castle;
                        this.contextObject.get_StrongHold = function () {
                          return this.Castle;
                        };
                        this.contextObject.Ruin = _or.Ruin;
                        this.contextObject.get_Ruin = function () {
                          return this.Ruin;
                        };
                        this.contextObject.Water = _or.Water;
                        this.contextObject.get_OnWater = function () {
                          return this.Water;
                        };
                        break;
                      case ClientLib.Data.WorldSector.ObjectType.FreeSlot:
                        this.calculateSettle(fg);
                        this.contextObject.get_UIType = function () {
                          return EMPTY_TYPE;
                        };
                        break;
                    }
                  }
                } else {
                  fc.get_World()
                    .ShowSelectorMarkerWorld(fg & 0xFFFF, fg >> 16);
                  var _od = fc.get_Data(fg & 0xFFFF, fg >> 16);
                  this.contextObject.dirty = true;
                  if (_od !== null) {
                    switch (_od.Type) {
                      case ClientLib.Data.WorldSector.ObjectType.City: 
                        this.contextObject.get_UIType = function () {
                          return CITY_TYPE;
                        };
                        this.contextObject.Name = _od.Name;
                        this.contextObject.get_Name = function () {
                          return this.Name;
                        };
                        this.contextObject.AllianceName = _od.a.Name;
                        this.contextObject.get_AllianceName = function () {
                          return this.AllianceName;
                        };
                        this.contextObject.AllianceId = _od.a.Id;
                        this.contextObject.get_AllianceId = function () {
                          return this.AllianceId;
                        };
                        this.contextObject.PlayerName = _od.p.Name;
                        this.contextObject.get_PlayerName = function () {
                          return this.PlayerName;
                        };
                        this.contextObject.PlayerId = _od.p.Id;
                        this.contextObject.get_PlayerId = function () {
                          return this.PlayerId;
                        };
                        this.contextObject.Points = _od.Points;
                        this.contextObject.get_Points = function () {
                          return this.Points;
                        };
                        this.contextObject.PlayerPoints = _od.p.Points;
                        this.contextObject.get_PlayerPoints = function () {
                          return this.PlayerPoints;
                        };
                        this.contextObject.AlliancePoints = _od.a.Points;
                        this.contextObject.get_AlliancePoints = function () {
                          return this.AlliancePoints;
                        };
                        this.contextObject.Castle = _od.Castle;
                        this.contextObject.get_StrongHold = function () {
                          return this.Castle;
                        };
                        this.contextObject.Water = _od.Water;
                        this.contextObject.get_OnWater = function () {
                          return this.Water;
                        };
                        break;
                      case ClientLib.Data.WorldSector.ObjectType.Dungeon:
                        this.contextObject.get_UIType = function () {
                          return DUNGEON_TYPE;
                        };
                        this.contextObject.DungeonType = _od.DungeonType;
                        this.contextObject.get_Type = function () {
                          return this.DungeonType;
                        };
                        this.contextObject.DungeonLevel = _od.DungeonLevel;
                        this.contextObject.get_Level = function () {
                          return this.DungeonLevel;
                        };
                        this.contextObject.Progress = _od.Progress;
                        this.contextObject.get_Progress = function () {
                          return this.Progress;
                        };
                        this.contextObject.State = _od.State;
                        this.contextObject.get_Active = function () {
                          return this.State;
                        };
                        break;
                      case ClientLib.Data.WorldSector.ObjectType.Boss:
                        this.contextObject.get_UIType = function () {
                          return BOSS_TYPE;
                        };
                        this.contextObject.BossType = _od.BossType;
                        this.contextObject.get_Type = function () {
                          return this.BossType;
                        };
                        this.contextObject.BossLevel = _od.BossLevel;
                        this.contextObject.get_Level = function () {
                          return this.BossLevel;
                        };
                        break;
                      case ClientLib.Data.WorldSector.ObjectType.Moongate:
                        this.contextObject.get_UIType = function () {
                          return MOONGATE_TYPE;
                        };
                        this.contextObject.State = _od.eMoongateState;
                        this.contextObject.get_State = function () {
                          return this.State;
                        };
                        break;
                      case ClientLib.Data.WorldSector.ObjectType.Shrine:
                        this.contextObject.get_UIType = function () {
                          return SHRINE_TYPE;
                        };
                        this.contextObject.ShrineType = _od.ShrineType;
                        this.contextObject.get_Type = function () {
                          return this.ShrineType;
                        };
                        break;
                      case ClientLib.Data.WorldSector.ObjectType.LawlessCity:
                        this.calculateSettle(fg);
                        this.contextObject.get_UIType = function () {
                          return (_od.Abandoned) ? ABANDONED_TYPE : LAWLESS_TYPE;
                        };
                        this.contextObject.Name = (_od.Castle) ? i18n("ext:lawless_city_with_castle") : ((_od.Ruin) ? i18n("ext:ruins") : i18n("ext:lawless_city"));
                        this.contextObject.get_Name = function () {
                          return this.Name;
                        };
                        this.contextObject.AllianceName = '';
                        this.contextObject.get_AllianceName = function () {
                          return this.AllianceName;
                        };
                        this.contextObject.AllianceId = null;
                        this.contextObject.get_AllianceId = function () {
                          return this.AllianceId;
                        };
                        this.contextObject.PlayerName = '';
                        this.contextObject.get_PlayerName = function () {
                          return this.PlayerName;
                        };
                        this.contextObject.PlayerId = null;
                        this.contextObject.get_PlayerId = function () {
                          return this.PlayerId;
                        };
                        this.contextObject.Points = _od.Points;
                        this.contextObject.get_Points = function () {
                          return this.Points;
                        };
                        this.contextObject.PlayerPoints = null;
                        this.contextObject.get_PlayerPoints = function () {
                          return this.PlayerPoints;
                        };
                        this.contextObject.AlliancePoints = null;
                        this.contextObject.get_AlliancePoints = function () {
                          return this.AlliancePoints;
                        };
                        this.contextObject.Castle = _od.Castle;
                        this.contextObject.get_StrongHold = function () {
                          return this.Castle;
                        };
                        this.contextObject.Ruin = _od.Ruin;
                        this.contextObject.get_Ruin = function () {
                          return this.Ruin;
                        };
                        this.contextObject.Water = _od.Water;
                        this.contextObject.get_OnWater = function () {
                          return this.Water;
                        };
                        break;
                      case ClientLib.Data.WorldSector.ObjectType.FreeSlot:
                        this.calculateSettle(fg);
                        this.contextObject.get_UIType = function () {
                          return EMPTY_TYPE;
                        };
                        break;
                    }
                  }
                  /*console.log(_od);
                  console.log(this.contextObject);*/
                }
              } else {
                this.contextObject.get_UIType = function () {
                  return NONE_TYPE;
                };
              }
            }
            return;
          },
          checkType: function (types) {
            var o = this.contextObject,
              r = false,
              t = o.get_UIType();
            if (types & CITY && (t === CITY_TYPE || t === LAWLESS_TYPE || t === ABANDONED_TYPE)) {
              r = true;
            } else if (types & LAWLESS && t === LAWLESS_TYPE) {
              r = true;
            } else if (types & BOSS && t === BOSS_TYPE) {
              r = true;
            } else if (types & DUNGEON && t === DUNGEON_TYPE) {
              r = true;
            } else if (types & SHRINE && t === SHRINE_TYPE) {
              r = true;
            } else if (types & MOONGATE && t === MOONGATE_TYPE) {
              r = true;
            } else if (types & EMPTY && t === EMPTY_TYPE) {
              r = true;
            } else if (types & ATTACKABLE && (t === CITY_TYPE || t === BOSS_TYPE || t === DUNGEON_TYPE || t === LAWLESS_TYPE || t === ABANDONED_TYPE)) {
              r = true;
            } else if (types & ANY) {
              r = true;
            }
            return r;
          },
          getMinUnitTs: function () {
            var iz = 0, ix = 0, 
              iA = webfrontend.data.Player.getInstance(),
              iC = iA.getNumCities(),
              iy = webfrontend.res.Main.getInstance().combatAttackCity.c,
              iu = webfrontend.data.City.getInstance(),
              iv = Math.max(iu.getUnitLimit(), iu.getUnitCount()),
              iB = webfrontend.res.Main.getInstance().combatAttackCity.u,
              i;
            for (ix = 0; i < iy.length; ++i) {
              if (iy[i].c > iC) {break;}
              iz = iy[i].m;
            }
            for (i = 0; i < iB.length; ++i) {
              if (iB[i].c > iv) {break;}
              ix = iB[i].m;
            }
            return Math.max(iz, ix);
          },
          calculateSettle: function (id) {
            var uc = webfrontend.data.City
                .getInstance(),
              sd = webfrontend.data.Server
                .getInstance(),
              st = webfrontend.data.ServerTime
                .getInstance(),
              ss = st.getServerStep(),
              te = webfrontend.data.Tech
                .getInstance(),
              cartTech = te.getBonus("tradeSpeed", webfrontend.data.Tech.research, 1),
              shipTech = te.getBonus("tradeSpeed", webfrontend.data.Tech.research, 2),
              cartShrine = te.getBonus("tradeSpeed", webfrontend.data.Tech.shrine, 1),
              shipShrine = te.getBonus("tradeSpeed", webfrontend.data.Tech.shrine, 2),
              pl = webfrontend.data.Player
                .getInstance(),
              bcb = [sd.getTradeSpeedLand(), sd.getTradeSpeedShip()],
              cI = pl.getDistanceByCoord(uc.getId(), id & 0xFFFF, id >> 16),
              cG = null,
              ete_l = cI.l,
              eta_l = ete_l,
              ete_w = (cI.w === -2 && !uc.getOnWater()) ? -1 : cI.w,
              eta_w = ete_w;
            
            //force land calculate
            if (cI.l === -2 && webfrontend.gui.Util.getContinentFromId(uc.getId()) === webfrontend.gui.Util.getContinentFromId(id)) {cI.l = webfrontend.gui.Util.getDistanceUsingIds(uc.getId(), id);}
            if (cI.l !== -2) {            
              //land
              if (cI.l !== -1) {
                cG = Math.max(0, cI.l * bcb[0]);
                ete_l = webfrontend.Util.getTimespanString(st.getTimeSpan(parseInt(cG / (1 + (cartTech + cartShrine) / 100), 10)), true);
                eta_l = webfrontend.Util.getDateTimeString(st.getStepTime(parseInt(ss + cG / (1 + (cartTech + cartShrine) / 100), 10)));
              }
            }
            if (cI.w !== -2) {
              //sea
              if (cI.w !== -1) {
                var cF = bcb[1] / (1 + (shipTech + shipShrine) / 100);
                cG = Math.max(0, cI.w * cF + sd.getTradeShipPreparationTime());
                ete_w = webfrontend.Util.getTimespanString(st.getTimeSpan(cG, true));
                eta_w = webfrontend.Util.getDateTimeString(st.getStepTime(ss + cG));
              }
            }  
            return {1: {ete: ete_l, eta: eta_l}, 2: {ete: ete_w, eta: eta_w}};
          }
        }
      });
      
      /*
       * @Contribute  Nessus River Guardian Tools - https://userscripts.org/scripts/show/129990
       * Spezial thanks to Brian Hixon for this idea, https://userscripts.org/users/443813
       */
      qx.Class.define("AlsiusTweak.ui.contextMenu", {
        type: "singleton",
        extend: qx.core.Object,
        construct: function () {
          this.base(arguments);
        },
        members: {
          contextMenu: null,
          subCopyMenu: null,
          subInfoMenu: null,
          subToolMenu: null,
          subSettleMenu: null,
          selectCityBtn: null,
          multiCopyMenu: null,
          multiMailMenu: null,
          multiInfoMenu: null,
          multiToolMenu: null,
          multiSettleMenu: null,
          viewReportsBtn: null,
          plunderCityBtn: null,
          scoutCityBtn: null,
          sendResCityBtn: null,
          sendArmyBtn: null,
          settleLandCityBtn: null,
          settleWaterCityBtn: null,
          unsettleCityBtn: null,
          claimCityBtn: null,
          unclaimCityBtn: null,
          copyCoordBtn: null,
          copyPlayerBtn: null,
          copyAllianceBtn: null,
          infoPlayerBtn: null,
          infoAllianceBtn: null,
          toolEnableEmoticons: null,
          // functions
          func: function (obj) {},
          init: function () {
            // create menu
            this.contextMenu = new qx.ui.menu.Menu();
            this.contextMenu.setIconColumnWidth(0);
            //sub copy menu
            this.subCopyMenu = new qx.ui.menu.Menu();
            this.subCopyMenu.setIconColumnWidth(0);
            //sub info menu
            this.subInfoMenu = new qx.ui.menu.Menu();
            this.subInfoMenu.setIconColumnWidth(0);
            //sub tool menu
            this.subToolMenu = new qx.ui.menu.Menu();
            this.subToolMenu.setIconColumnWidth(0);
            //sub settle menu
            this.subSettleMenu = new qx.ui.menu.Menu();
            this.subSettleMenu.setIconColumnWidth(0);
            //multi menus
            this.multiCopyMenu = new qx.ui.menu.Button(i18n("ext:copy_to_chat"), null, null, this.subCopyMenu);
            this.multiMailMenu = new qx.ui.menu.Button(i18n("ext:copy_to_mail"), null, null, this.subCopyMenu);
            this.multiInfoMenu = new qx.ui.menu.Button(i18n("ext:info"), null, null, this.subInfoMenu);
            this.multiToolMenu = new qx.ui.menu.Button(i18n("ext:tools"), null, null, this.subToolMenu);
            this.multiSettleMenu = new qx.ui.menu.Button(i18n("ext:to_settle"), null, null, this.subSettleMenu);
            //city buttons
            this.selectCityBtn = new qx.ui.menu.Button(i18n("ext:switch_to_city"));
            this.plunderCityBtn = new qx.ui.menu.Button(i18n("ext:plunder"));
            this.scoutCityBtn = new qx.ui.menu.Button(i18n("ext:scout"));
            this.sendResCityBtn = new qx.ui.menu.Button(i18n("ext:send_resources"));
            this.editNotesCityBtn = new qx.ui.menu.Button(i18n("ext:notepad"));
            //misc
            this.viewReportsBtn = new qx.ui.menu.Button(i18n("ext:view_reports"));
            this.sendArmyBtn = new qx.ui.menu.Button(i18n("ext:send_army"));
            //submenu buttons
            this.copyCoordBtn = new qx.ui.menu.Button(i18n("ext:coordinates"));
            this.copyPlayerBtn = new qx.ui.menu.Button(i18n("ext:player"));
            this.copyAllianceBtn = new qx.ui.menu.Button(i18n("ext:alliance"));
            this.infoPlayerBtn = new qx.ui.menu.Button(i18n("ext:player"));
            this.infoAllianceBtn = new qx.ui.menu.Button(i18n("ext:alliance"));
            this.toolEnableEmoticons = new qx.ui.menu.CheckBox(i18n("ext:enable_emoticons"));
            this.toolEnableEmoticons.setValue(true);
            this.claimCityBtn = new qx.ui.menu.Button(i18n("ext:claim_city"));
            this.unclaimCityBtn = new qx.ui.menu.Button(i18n("ext:delete_claim"));
            this.settleLandCityBtn = new qx.ui.menu.Button(i18n("ext:settle_by_land"));
            this.settleWaterCityBtn = new qx.ui.menu.Button(i18n("ext:settle_by_water"));
            this.unsettleCityBtn = new qx.ui.menu.Button(i18n("ext:delete_settle"));
            //prepare submenus
            this.subCopyMenu.add(this.copyCoordBtn);
            this.subCopyMenu.add(this.copyPlayerBtn);
            this.subCopyMenu.add(this.copyAllianceBtn);
            this.subInfoMenu.add(this.infoPlayerBtn);
            this.subInfoMenu.add(this.infoAllianceBtn);
            this.subToolMenu.add(this.toolEnableEmoticons);
            this.subSettleMenu.add(this.claimCityBtn);
            this.subSettleMenu.add(this.unclaimCityBtn);
            this.subSettleMenu.add(this.settleLandCityBtn);
            this.subSettleMenu.add(this.settleWaterCityBtn);
            this.subSettleMenu.add(this.unsettleCityBtn);
            //global context menu
            this.contextMenu.add(this.selectCityBtn);
            //this.contextMenu.add(new qx.ui.menu.Separator());
            this.contextMenu.add(this.plunderCityBtn);
            this.contextMenu.add(this.scoutCityBtn);
            this.contextMenu.add(this.sendResCityBtn);
            this.contextMenu.add(this.sendArmyBtn);
            this.contextMenu.add(this.viewReportsBtn);
            this.contextMenu.add(this.editNotesCityBtn);
            //this.contextMenu.add(new qx.ui.menu.Separator());
            this.contextMenu.add(this.multiInfoMenu);
            this.contextMenu.add(this.multiCopyMenu);
            this.contextMenu.add(this.multiMailMenu);
            this.contextMenu.add(this.multiSettleMenu);
            //this.contextMenu.add(new qx.ui.menu.Separator());
            this.contextMenu.add(this.multiToolMenu);
            /* exclude list */
            this.multiCopyMenu.setVisibility("excluded");
            this.multiMailMenu.setVisibility("excluded");
            this.multiInfoMenu.setVisibility("excluded");
            this.multiToolMenu.setVisibility("excluded");
            this.subCopyMenu.setVisibility("excluded");
            this.subInfoMenu.setVisibility("excluded");
            this.subToolMenu.setVisibility("excluded");
            this.copyCoordBtn.setVisibility("excluded");
            this.copyPlayerBtn.setVisibility("excluded");
            this.copyAllianceBtn.setVisibility("excluded");
            this.infoPlayerBtn.setVisibility("excluded");
            this.infoAllianceBtn.setVisibility("excluded");
            this.toolEnableEmoticons.setVisibility("excluded");
            // initialize
            var wV = qx.core.Init.getApplication()
              .worldView;
            wV.setContextMenu(this.contextMenu);
            wV.addListener("beforeContextmenuOpen", function () {
              this.updateContextMenu();
            }, this);
            // prepare button functions
            /* select city */
            this.selectCityBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                .getContextObject(),
                fe = webfrontend.data.Player.getInstance()
                  .getCity(ct.get_Id());
              if (AlsiusTweak.worldData.getInstance()
                .checkType(CITY) && fe && !ct.nodata) {
                webfrontend.data.City.getInstance()
                  .setRequestId(ct.get_Id());
                webfrontend.net.UpdateManager.getInstance()
                  .pollNow(null);
              }
              /*
              else {
                webfrontend.gui.Util.openCityProfile(ct.get_Id() & 0xFFFF, ct.get_Id() >> 16);
              }*/
            }, this);
            /* plunder city */
            this.plunderCityBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                .getContextObject(),
                fe = webfrontend.data.Player.getInstance()
                  .getCity(ct.get_Id()),
                i = null;
              if (AlsiusTweak.worldData.getInstance()
                .checkType(CITY) && !fe && !ct.nodata) {
                var unitsToSend = [],
                  uc = webfrontend.data.City.getInstance();
                if (typeof uc.units !== 'undefined' && uc.units !== null) {
                  for (i = 0; i < 13; i++) {
                    if (typeof uc.units[i] !== 'undefined' && uc.units[i] !== null) {
                      if (uc.units[i].count > 0) {
                        var unitString = i.toString();
                        unitsToSend.push({
                          t: unitString,
                          c: uc.units[i].count
                        });
                      }
                    }
                  }
                  webfrontend.net.CommandManager.getInstance()
                    .sendCommand("OrderUnits", {
                    cityid: uc.getId(),
                    units: unitsToSend,
                    targetPlayer: ct.get_PlayerName(),
                    targetCity: ct.get_Pos(),
                    order: 2,
                    transport: 1,
                    iUnitOrderOptions: 0,
                    timeReferenceType: 1,
                    referenceTimeUTCMillis: 0,
                    raidTimeReferenceType: 0,
                    raidReferenceTimeUTCMillis: 0,
                    createCity: ""
                  }, this, this._onTroopsSent);
                }
              }
            }, this);
            /* view reports */
            this.viewReportsBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                .getContextObject();
              if (AlsiusTweak.worldData.getInstance()
                .checkType(ATTACKABLE)) {
                var a = qx.core.Init.getApplication();
                a.showInfoPage(a.getCityInfoPage(), {
                  "id": ct.get_Id()
                });
              }
            }, this);
            /* scout city */
            this.scoutCityBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                .getContextObject(),
                fe = webfrontend.data.Player.getInstance()
                  .getCity(ct.get_Id()); 
              if (AlsiusTweak.worldData.getInstance()
                .checkType(CITY) && !fe && !ct.nodata) {
                var unitsToSend = [],
                  uc = webfrontend.data.City.getInstance(),
                  mt = AlsiusTweak.worldData.getInstance().getMinUnitTs();
                if (typeof uc.units !== 'undefined' && uc.units !== null && typeof uc.units[8] !== 'undefined' && uc.units[8] !== null && uc.units[8].count >= mt/2) {
                  unitsToSend.push({
                    t: '8',
                    c: mt/2
                  });
                  webfrontend.net.CommandManager.getInstance()
                    .sendCommand("OrderUnits", {
                    cityid: uc.getId(),
                    units: unitsToSend,
                    targetPlayer: ct.get_PlayerName(),
                    targetCity: ct.get_Pos(),
                    order: 1,
                    transport: 1,
                    iUnitOrderOptions: 0,
                    timeReferenceType: 1,
                    referenceTimeUTCMillis: 0,
                    raidTimeReferenceType: 0,
                    raidReferenceTimeUTCMillis: 0,
                    createCity: ""
                  }, this, this._onTroopsSent);
                }
              }
            }, this);
            /* send army to city */
            this.sendArmyBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                .getContextObject();
              if (AlsiusTweak.worldData.getInstance()
                .checkType(ATTACKABLE) && !ct.nodata) {
                qx.core.Init.getApplication()
                  .showSendArmy(ct.get_PosX(), ct.get_PosY());
              }
            }, this);
            /* edit city notes*/
            this.editNotesCityBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                .getContextObject();
              if (AlsiusTweak.worldData.getInstance()
                .checkType(CITY) && !ct.nodata) {
                var cc = webfrontend.data.Server.getInstance()
                      .getContinentFromCoords(ct.get_Id() & 0xFFFF, ct.get_Id() >> 16),
                    cd = AlsiusTweak.Provider.getInstance()
                    .getContiData(cc),
                    ci = null,
                    cn = null,
                    st = i18n('ext:no_info');
                if (cd !== null && typeof cd.info !== 'undefined') {
                  ci = cd.info[ct.get_Pos()]; 
                  if ((typeof ci !== 'undefined') && ci !== null) {
                    st = ci.txt;
                    cn = AlsiusTweak.ui.Notepad.create(ci.txt, true);
                  } else {
                    cn = AlsiusTweak.ui.Notepad.create(null, false);
                    cn.setSourceText(i18n('ext:no_info'));
                  }
                  cn.addListener("dataChanged", function (e) {
                    var key = AlsiusTweak.Stack.getInstance()
                      .store({
                        pos: ct.get_Pos(),
                        id: ct.get_Id(),
                        nt: cn.getSourceText(), 
                        invoke: function (result) {
                          if (result.status && !result.eror) {
                            AlsiusTweak.Chat.getInstance()
                              .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:note_ok') + result.message), false, 'LoUWin');
                            var pl = webfrontend.data.Player
                                .getInstance(),
                              cc = webfrontend.data.Server.getInstance()
                                .getContinentFromCoords(this.id & 0xFFFF, this.id >> 16),
                              cd = AlsiusTweak.Provider.getInstance()
                              .getContiData(cc);
                            if (cd === null) {
                              cd = {info: []};
                            } else if (typeof cd.info === 'undefined' && cd.info !== null) {
															cd.info = [];
														}
                            cd.info[this.pos] = {txt: webfrontend.gui.Util.generateBBCode(this.nt), by: pl.getName(), time: 0};                              
                          } else if (result.status) {
                            AlsiusTweak.Chat.getInstance()
                              .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:note_nok') + result.message), false, 'Sytem');
                          } else {
                            AlsiusTweak.Chat.getInstance()
                              .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:note_nok') + result.message), true);
                          }
                        }
                      }),
                      note =  escape(cn.getSourceText());
                    AlsiusTweak.Main.getInstance().chat.addMsg('/whisper ' + EXTbotname + ' !alsius.' + key + '.Note ' + ct.get_Pos() + ' ' + note);
                  }, this);
                }
              }
            }, this);
            /* send res to city */
            this.sendResCityBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                .getContextObject();
              if (ct.get_UIType() === CITY_TYPE && !ct.nodata) {
                qx.core.Init.getApplication()
                  .showTrade(ct.get_PosX(), ct.get_PosY());
              }
            }, this);
            /* claim city or free_slot*/
            this.claimCityBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                  .getContextObject(),
                key = AlsiusTweak.Stack.getInstance()
                  .store({
                    pos: ct.get_Pos(),
                    id: ct.get_Id(),
                    invoke: function (result) {
                      if (result.status && !result.eror) {
                        AlsiusTweak.Chat.getInstance()
                          .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:claim_ok') + result.message), false, 'LoUWin');
                        var pl = webfrontend.data.Player
                            .getInstance(),
                          cc = webfrontend.data.Server.getInstance()
                            .getContinentFromCoords(this.id & 0xFFFF, this.id >> 16),
                          cd = AlsiusTweak.Provider.getInstance()
                          .getContiData(cc);
                        if (cd === null) {
                          cd = {claimer: [], settler: []};
                        }
                        cd.claimer[this.pos] = {uid: pl.getId(), name: pl.getName(), time: '00:00'};                        
                      } else if (result.status) {
                        AlsiusTweak.Chat.getInstance()
                          .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:claim_nok') + result.message), false, 'System');
                      } else {
                        AlsiusTweak.Chat.getInstance()
                          .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:claim_nok') + result.message), true);
                      }
                    }
                }),
              lawless = (ct.get_UIType() === LAWLESS_TYPE) ? ' LL' : '';
              AlsiusTweak.Main.getInstance().chat.addMsg('/whisper ' + EXTbotname + ' !alsius.' + key + '.Claim ' + ct.get_Pos() + lawless);
            }, this);
            /* unclaim city or free_slot */
            this.unclaimCityBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                  .getContextObject(),
                key = AlsiusTweak.Stack.getInstance()
                  .store({
                    pos: ct.get_Pos(),
                    id: ct.get_Id(),
                    invoke: function (result) {
                      if (result.status && !result.eror) {
                        AlsiusTweak.Chat.getInstance()
                          .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:unclaim_ok') + result.message), false, 'LoUWin');
                        var cc = webfrontend.data.Server.getInstance()
                            .getContinentFromCoords(this.id & 0xFFFF, this.id >> 16),
                          cd = AlsiusTweak.Provider.getInstance()
                          .getContiData(cc);
                        if (cd !== null) {delete cd.claimer[this.pos];}
                      } else if (result.status) {
                        AlsiusTweak.Chat.getInstance()
                          .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:unclaim_nok') + result.message), false, 'System');
                      } else {
                        AlsiusTweak.Chat.getInstance()
                          .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:unclaim_nok') + result.message), true);
                      }
                    }
                }),
              lawless = (ct.get_UIType() === LAWLESS_TYPE) ? ' LL' : '';
              AlsiusTweak.Main.getInstance().chat.addMsg('/whisper ' + EXTbotname + ' !alsius.' + key + '.Unclaim ' + ct.get_Pos() + lawless);
            }, this);
            /* settle city or free_slot by land */
            this.settleLandCityBtn.addListener("execute", function (e) {
              if (AlsiusTweak.Main.getInstance().isBotState()) {
                var ct = AlsiusTweak.worldData.getInstance()
                    .getContextObject(),
                  key = AlsiusTweak.Stack.getInstance()
                    .store({
                      pos: ct.get_Pos(),
                      id: ct.get_Id(),
                      invoke: function (result) {
                        if (result.status && !result.eror) {
                          var curcityId = webfrontend.data.City.getInstance().getId(),
                            settle = {
                              cityid: curcityId,
                              units: [{ "t": "19", "c": 1}],
                              targetPlayer: "",
                              targetCity: this.pos,
                              order: 9,
                              transport: 1,
                              createCity: (ct.get_UIType() === EMPTY_TYPE) ? 'Alsen Dorf' : 'LL Alsius',
                              timeReferenceType: 1,
                              referenceTimeUTCMillis: 0,
                              raidTimeReferenceType: 0,
                              raidReferenceTimeUTCMillis: 0,
                              iUnitOrderOptions: 0
                            };
                          webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", settle, this, this._onSendDone, settle);
                          AlsiusTweak.Chat.getInstance()
                            .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_ok') + result.message), false, 'LoUWin');
                          var pl = webfrontend.data.Player
                              .getInstance(),
                            cc = webfrontend.data.Server.getInstance()
                              .getContinentFromCoords(this.id & 0xFFFF, this.id >> 16),
                            cd = AlsiusTweak.Provider.getInstance()
                              .getContiData(cc),
                            es = AlsiusTweak.worldData.getInstance().calculateSettle(this.id);
                          if (cd === null) {
                            cd = {claimer: [], settler: []};
                          }
                          cd.settler[this.pos] = {uid: pl.getId(), name: pl.getName(), time: '00:00', ete: es[1].ete};
                          delete cd.claimer[this.pos];
                        } else if (result.status) {
                          AlsiusTweak.Chat.getInstance()
                            .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_nok') + result.message), false, 'System');
                        } else {
                          AlsiusTweak.Chat.getInstance()
                            .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_nok') + result.message), true);
                        }
                      },
                      _onSendDone: function (ok, errorCode, context) {
                        try {
                          if (!ok || errorCode.r0 !== 0 || errorCode.r1 !== 0) {
                            var messages = [];
                            if (errorCode.r0 & 4) {messages.push(i18n('ext:baron_needed'));}
                            if (errorCode.r0 & 64) {messages.push(i18n('ext:freeslot_needed'));}
                            if (errorCode.r0 & 32768) {messages.push(i18n('ext:resources_needed'));}
                            if (errorCode.r0 & 65536) {messages.push(i18n('ext:is_castle'));}
                            if (errorCode.r0 & 131072) {messages.push(i18n('ext:traiders_needed'));}
                            if (messages.length === 0) {messages.push(i18n('ext:unknown'));}
                            AlsiusTweak.Chat.getInstance()
                              .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:error_on_command') + ': ' + i18n('ext:settle_by_land') + ' ' + context.targetCity + ' (' + messages.join(', ') + ')'), true);
                          }
                        } catch (e) {
                          debug(i18n('ext:error_message') + ': ' + e);
                        }
                      } 
                  }),
                lawless = (ct.get_UIType() === LAWLESS_TYPE) ? ' LL' : '',
                es = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id());
                AlsiusTweak.Main.getInstance().chat.addMsg('/whisper ' + EXTbotname + ' !alsius.' + key + '.Settle ' + ct.get_Pos() + ' ' + es[1].ete + lawless);
              } else {
                var ct = AlsiusTweak.worldData.getInstance()
                    .getContextObject(),
                  curcityId = webfrontend.data.City.getInstance().getId(),
                  settle = {
                    cityid: curcityId,
                    units: [{ "t": "19", "c": 1}],
                    targetPlayer: "",
                    targetCity: ct.get_Pos(),
                    order: 9,
                    transport: 1,
                    createCity: (ct.get_UIType() === EMPTY_TYPE) ? i18n("ext:settlement") : 'Lawless',
                    timeReferenceType: 1,
                    referenceTimeUTCMillis: 0,
                    raidTimeReferenceType: 0,
                    raidReferenceTimeUTCMillis: 0,
                    iUnitOrderOptions: 0
                  },
                es = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id()),
                lawless = (ct.get_UIType() === LAWLESS_TYPE) ? ' LL' : '';
                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", settle, this, function (ok, errorCode, context) {
                  try {
                    if (!ok || errorCode.r0 !== 0 || errorCode.r1 !== 0) {
                      var messages = [];
                      if (errorCode.r0 & 4) {messages.push(i18n('ext:baron_needed'));}
                      if (errorCode.r0 & 64) {messages.push(i18n('ext:freeslot_needed'));}
                      if (errorCode.r0 & 32768) {messages.push(i18n('ext:resources_needed'));}
                      if (errorCode.r0 & 65536) {messages.push(i18n('ext:is_castle'));}
                      if (errorCode.r0 & 131072) {messages.push(i18n('ext:traiders_needed'));}
                      if (messages.length === 0) {messages.push(i18n('ext:unknown'));}
                      AlsiusTweak.Chat.getInstance()
                        .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:error_on_command') + ': ' + i18n('ext:settle_by_land') + ' ' + context.targetCity + ' (' + messages.join(', ') + ')'), true);
                    }
                  } catch (e) {
                    debug(i18n('ext:error_message') + ': ' + e);
                  }
                }, settle);
                AlsiusTweak.Chat.getInstance()
                  .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_ok') + ct.get_Pos() + lawless + ' ETE: ' + es[1].ete + 'h'), false, 'LoUWin');
              }
            }, this);
            /* settle city or free_slot by water */
            this.settleWaterCityBtn.addListener("execute", function (e) {
              if (AlsiusTweak.Main.getInstance().isBotState()) {
                var ct = AlsiusTweak.worldData.getInstance()
                    .getContextObject(),
                  key = AlsiusTweak.Stack.getInstance()
                    .store({
                      pos: ct.get_Pos(),
                      id: ct.get_Id(),
                      invoke: function (result) {
                        if (result.status && !result.eror) {
                          var curcityId = webfrontend.data.City.getInstance().getId(),
                            settle = {
                              cityid: curcityId,
                              units: [{ "t": "19", "c": 1}],
                              targetPlayer: "",
                              targetCity: this.pos,
                              order: 9,
                              transport: 2,
                              createCity: (ct.get_UIType() === EMPTY_TYPE) ? 'Alsen Dorf' : 'LL Alsius',
                              timeReferenceType: 1,
                              referenceTimeUTCMillis: 0,
                              raidTimeReferenceType: 0,
                              raidReferenceTimeUTCMillis: 0,
                              iUnitOrderOptions: 0
                            };
                          webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", settle, this, this._onSendDone, settle);
                          AlsiusTweak.Chat.getInstance()
                            .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_ok') + result.message), false, 'LoUWin');
                          var pl = webfrontend.data.Player
                              .getInstance(),
                            cc = webfrontend.data.Server.getInstance()
                              .getContinentFromCoords(this.id & 0xFFFF, this.id >> 16),
                            cd = AlsiusTweak.Provider.getInstance()
                              .getContiData(cc),
                            es = AlsiusTweak.worldData.getInstance().calculateSettle(this.id);
                          if (cd === null) {
                            cd = {claimer: [], settler: []};
                          }
                          cd.settler[this.pos] = {uid: pl.getId(), name: pl.getName(), time: '00:00', ete: es[2].ete};
                        } else if (result.status) {
                          AlsiusTweak.Chat.getInstance()
                            .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_nok') + result.message), false, 'System');
                        } else {
                          AlsiusTweak.Chat.getInstance()
                            .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_nok') + result.message), true);
                        }
                      },
                      _onSendDone: function (ok, errorCode, context) {
                        try {
                          if (!ok || errorCode.r0 !== 0 || errorCode.r1 !== 0) {
                            var messages = [];
                            if (errorCode.r0 & 4) {messages.push(i18n('ext:baron_needed'));}
                            if (errorCode.r0 & 64) {messages.push(i18n('ext:freeslot_needed'));}
                            if (errorCode.r0 & 32768) {messages.push(i18n('ext:resources_needed'));}
                            if (errorCode.r0 & 65536) {messages.push(i18n('ext:is_castle'));}
                            if (errorCode.r0 & 131072) {messages.push(i18n('ext:traiders_needed'));}
                            if (messages.length === 0) {messages.push(i18n('ext:unknown'));}
                            AlsiusTweak.Chat.getInstance()
                              .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:error_on_command') + ': ' + i18n('ext:settle_by_water') + ' ' + context.targetCity + ' (' + messages.join(', ') + ')'), true);
                          }
                        } catch (e) {
                          debug(i18n('ext:error_message') + ': ' + e);
                        }
                      } 
                  }),
                lawless = (ct.get_UIType() === LAWLESS_TYPE) ? ' LL' : '',
                es = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id());
                AlsiusTweak.Main.getInstance().chat.addMsg('/whisper ' + EXTbotname + ' !alsius.' + key + '.Settle ' + ct.get_Pos() + ' ' + es[2].ete + lawless);
              } else {
                var ct = AlsiusTweak.worldData.getInstance()
                    .getContextObject(),
                  curcityId = webfrontend.data.City.getInstance().getId(),
                  settle = {
                    cityid: curcityId,
                    units: [{ "t": "19", "c": 1}],
                    targetPlayer: "",
                    targetCity: ct.get_Pos(),
                    order: 9,
                    transport: 2,
                    createCity: (ct.get_UIType() === EMPTY_TYPE) ? i18n("ext:settlement") : 'Lawless',
                    timeReferenceType: 1,
                    referenceTimeUTCMillis: 0,
                    raidTimeReferenceType: 0,
                    raidReferenceTimeUTCMillis: 0,
                    iUnitOrderOptions: 0
                  },
                es = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id()),
                lawless = (ct.get_UIType() === LAWLESS_TYPE) ? ' LL' : '';
                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", settle, this, function (ok, errorCode, context) {
                  try {
                    if (!ok || errorCode.r0 !== 0 || errorCode.r1 !== 0) {
                      var messages = [];
                      if (errorCode.r0 & 4) {messages.push(i18n('ext:baron_needed'));}
                      if (errorCode.r0 & 64) {messages.push(i18n('ext:freeslot_needed'));}
                      if (errorCode.r0 & 32768) {messages.push(i18n('ext:resources_needed'));}
                      if (errorCode.r0 & 65536) {messages.push(i18n('ext:is_castle'));}
                      if (errorCode.r0 & 131072) {messages.push(i18n('ext:traiders_needed'));}
                      if (messages.length === 0) {messages.push(i18n('ext:unknown'));}
                      AlsiusTweak.Chat.getInstance()
                        .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:error_on_command') + ': ' + i18n('ext:settle_by_water') + ' ' + context.targetCity + ' (' + messages.join(', ') + ')'), true);
                    }
                  } catch (e) {
                    debug(i18n('ext:error_message') + ': ' + e);
                  }
                }, settle);
                AlsiusTweak.Chat.getInstance()
                  .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_ok') + ct.get_Pos() + lawless + ' ETE: ' + es[2].ete + 'h'), false, 'LoUWin');
              }
            }, this);
            /* unsettle city  or free_slot */
            this.unsettleCityBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                  .getContextObject(),
                key = AlsiusTweak.Stack.getInstance()
                  .store({
                    pos: ct.get_Pos(),
                    id: ct.get_Id(),
                    invoke: function (result) {
                      if (result.status && !result.eror) {
                        AlsiusTweak.Chat.getInstance()
                          .addChatMessage(i18n('ext:unsettle_ok') + this.pos, false, 'LoUWin');
                        var cc = webfrontend.data.Server.getInstance()
                            .getContinentFromCoords(this.id & 0xFFFF, this.id >> 16),
                          cd = AlsiusTweak.Provider.getInstance()
                            .getContiData(cc);
                        if (cd !== null) {delete cd.settler[this.pos];}
                      } else if (result.status) {
                        AlsiusTweak.Chat.getInstance()
                          .addChatMessage(i18n('ext:unsettle_nok') + result.message, false, 'System');
                      } else {
                        AlsiusTweak.Chat.getInstance()
                          .addChatMessage(i18n('ext:unsettle_nok') + result.message, true);
                      }
                    }
                }),
              lawless = (ct.get_UIType() === LAWLESS_TYPE) ? ' LL' : '';
              AlsiusTweak.Main.getInstance().chat.addMsg('/whisper ' + EXTbotname + ' !alsius.' + key + '.Unsettle ' + ct.get_Pos() + lawless);
            }, this);
          },
          _onTroopsSent: function (ok, errorCode) {
            try {
              if (!ok || errorCode.r0 !== 0 || errorCode.r1 !== 0) {
                AlsiusTweak.Chat.getInstance()
                  .addChatMessage(i18n('ext:error_on_command') + ': ' + i18n('ext:send_army'), true);
              }
            } catch (e) {
              debug(i18n('ext:error_message') + ': ' + e);
            }
          },
          updateContextMenu: function () {
            this.multiSettleMenu.setVisibility("excluded");
            /*
            this.multiCopyMenu.setVisibility("excluded");
            this.multiMailMenu.setVisibility("excluded");
            this.multiInfoMenu.setVisibility("excluded");
            this.multiToolMenu.setVisibility("excluded");
            this.subCopyMenu.setVisibility("excluded");
            this.subInfoMenu.setVisibility("excluded");
            this.subToolMenu.setVisibility("excluded");
            this.copyCoordBtn.setVisibility("excluded");
            this.copyPlayerBtn.setVisibility("excluded");
            this.copyAllianceBtn.setVisibility("excluded");
            this.infoPlayerBtn.setVisibility("excluded");
            this.infoAllianceBtn.setVisibility("excluded");
            this.toolEnableEmoticons.setVisibility("excluded");
            */
            this.sendArmyBtn.setVisibility("excluded");
            this.sendResCityBtn.setVisibility("excluded");
            this.editNotesCityBtn.setVisibility("excluded");
            this.scoutCityBtn.setVisibility("excluded");
            this.plunderCityBtn.setVisibility("excluded");
            this.viewReportsBtn.setVisibility("excluded");
            this.selectCityBtn.setVisibility("excluded");
            var fc = ClientLib.Vis.VisMain.GetInstance();
            var ct = AlsiusTweak.worldData.getInstance()
              .getContextObject();
            if (fc.get_Mode() !== ClientLib.Vis.Mode.City && !ct.nodata) {
              var pl = webfrontend.data.Player
                  .getInstance(),
                uc = webfrontend.data.City
                  .getInstance(),
                jf = webfrontend.data.Server.getInstance(),
                cc = jf.getContinentFromCoords(ct.get_Id() & 0xFFFF, ct.get_Id() >> 16),
                cd = AlsiusTweak.Provider.getInstance()
                .getContiData(cc),
                et = pl.getDistance(uc.getId(), ct.get_Id()),
                mt = AlsiusTweak.worldData.getInstance().getMinUnitTs();
              switch (ct.get_UIType()) {
              case BOSS_TYPE:
              case DUNGEON_TYPE:
                this.selectCityBtn.setVisibility("visible");
                this.selectCityBtn.setEnabled(false);
                this.selectCityBtn.setLabel(webfrontend.res.Main.getInstance().dungeons[ct.get_Type()].dn + ' (' +ct.get_Level()+ ')');
                this.sendArmyBtn.setVisibility("visible");
                if (ct.get_Active()) {
                  this.sendArmyBtn.setEnabled(true);
                } else {
                  this.sendArmyBtn.setEnabled(false);
                }
                this.viewReportsBtn.setVisibility("visible");
                break;
              case CITY_TYPE:
                var fe = webfrontend.data.Player.getInstance()
                  .getCity(ct.get_Id());
                this.selectCityBtn.setVisibility("visible");
                this.selectCityBtn.setEnabled(false);
                this.selectCityBtn.setLabel(ct.get_Name());
                if (fe) {
                  if (uc.getId() !== ct.get_Id()) {
                    this.selectCityBtn.setEnabled(true);
                    this.selectCityBtn.setLabel(i18n('ext:switch_to_city') + ct.get_Name());
                  }
                } else if (uc.getStrongHold()) {
                  this.plunderCityBtn.setVisibility("visible");
                  this.scoutCityBtn.setVisibility("visible");
                  if (jf.getContinentFromCoords(uc.getId() & 0xFFFF, uc.getId() >> 16) === cc && !uc.getSieged() && typeof uc.units !== 'undefined' && uc.units !== null) { // || (ct.get_OnWater() && uc.getOnWater() && !uc.getSieged())
                    this.plunderCityBtn.setEnabled(true);
                    if (typeof uc.units[8] !== 'undefined' && uc.units[8] !== null && uc.units[8].count >= mt/2) {
                      this.scoutCityBtn.setEnabled(true);
                    } else {
                      this.scoutCityBtn.setEnabled(false);
                    }
                  } else {
                    this.plunderCityBtn.setEnabled(false);
                    this.scoutCityBtn.setEnabled(false);
                  }
                }
                this.sendArmyBtn.setVisibility("visible");
                this.sendArmyBtn.setEnabled(true);
                this.sendResCityBtn.setVisibility("visible");
                if (AlsiusTweak.Main.getInstance().isBotState()) {
                  this.editNotesCityBtn.setVisibility("visible");
                  if (cd !== null && AlsiusTweak.Main.getInstance().isBotState() && (cd.rules.grand || cd.rules.warlord || cd.rules.officer)) {
                    this.editNotesCityBtn.setEnabled(true);
                  } else {
                    this.editNotesCityBtn.setEnabled(false);
                  }
                }
                this.viewReportsBtn.setVisibility("visible");
                break;
              case ABANDONED_TYPE:
                this.selectCityBtn.setVisibility("visible");
                this.selectCityBtn.setEnabled(false);
                this.selectCityBtn.setLabel(ct.get_Name());
                this.viewReportsBtn.setVisibility("visible");
                if (uc.getStrongHold()) {
                  this.plunderCityBtn.setVisibility("visible");
                  this.scoutCityBtn.setVisibility("visible");
                  if (jf.getContinentFromCoords(uc.getId() & 0xFFFF, uc.getId() >> 16) === cc && !uc.getSieged() && typeof uc.units !== 'undefined' && uc.units !== null) { // || (ct.get_OnWater() && uc.getOnWater() && !uc.getSieged())
                    this.plunderCityBtn.setEnabled(true);
                    if (typeof uc.units[8] !== 'undefined' && uc.units[8] !== null && uc.units[8].count >= mt/2) {
                      this.scoutCityBtn.setEnabled(true);
                    } else {
                      this.scoutCityBtn.setEnabled(false);
                    }
                  } else {
                    this.plunderCityBtn.setEnabled(false);
                    this.scoutCityBtn.setEnabled(false);
                  }
                }
                this.sendArmyBtn.setVisibility("visible");
                this.sendArmyBtn.setEnabled(true);
                if (AlsiusTweak.Main.getInstance().isBotState()) {
                  this.editNotesCityBtn.setVisibility("visible");
                  if (cd !== null && AlsiusTweak.Main.getInstance().isBotState() && (cd.rules.grand || cd.rules.warlord || cd.rules.officer)) {
                    this.editNotesCityBtn.setEnabled(true);
                  } else {
                    this.editNotesCityBtn.setEnabled(false);
                  }
                }
                this.viewReportsBtn.setVisibility("visible");
                break;
              case EMPTY_TYPE:
              case LAWLESS_TYPE:
                if (ct.get_UIType() !== EMPTY_TYPE) {
                  this.selectCityBtn.setVisibility("visible");
                  this.selectCityBtn.setEnabled(false);
                  this.selectCityBtn.setLabel(ct.get_Name());
                  if (uc.getStrongHold()) {
                    this.plunderCityBtn.setVisibility("visible");
                    this.scoutCityBtn.setVisibility("visible");
                    if (jf.getContinentFromCoords(uc.getId() & 0xFFFF, uc.getId() >> 16) === cc && !uc.getSieged() && typeof uc.units !== 'undefined' && uc.units !== null) { // || (ct.get_OnWater() && uc.getOnWater() && !uc.getSieged())
                      this.plunderCityBtn.setEnabled(true);
                      if (typeof uc.units[8] !== 'undefined' && uc.units[8] !== null && uc.units[8].count >= mt/2) {
                        this.scoutCityBtn.setEnabled(true);
                      } else {
                        this.scoutCityBtn.setEnabled(false);
                      }
                    } else {
                      this.plunderCityBtn.setEnabled(false);
                      this.scoutCityBtn.setEnabled(false);
                    }
                  }
                  this.sendArmyBtn.setVisibility("visible");
                  this.sendArmyBtn.setEnabled(true);
                  if (AlsiusTweak.Main.getInstance().isBotState()) {
                    this.editNotesCityBtn.setVisibility("visible");
                    if (cd !== null && AlsiusTweak.Main.getInstance().isBotState() && (cd.rules.grand || cd.rules.warlord || cd.rules.officer)) {
                      this.editNotesCityBtn.setEnabled(true);
                    } else {
                      this.editNotesCityBtn.setEnabled(false);
                    }
                  }
                  this.viewReportsBtn.setVisibility("visible");
                } else {
                  this.selectCityBtn.setVisibility("visible");
                  this.selectCityBtn.setEnabled(false);
                  this.selectCityBtn.setLabel(i18n("ext:settlement_area"));
                }
                this.multiSettleMenu.setVisibility("visible");
                // bot active?
                if (AlsiusTweak.Main.getInstance().isBotState()) {
                  this.multiSettleMenu.setEnabled(true);
                  // is claimed by self and not settled by anyone?
                  if (cd !== null && typeof cd.claimer !== 'undefined' && cd.claimer[ct.get_Pos()] && parseInt(cd.claimer[ct.get_Pos()].uid, 10) === pl.getId()) {
                    this.unclaimCityBtn.setEnabled(true);
                    this.claimCityBtn.setEnabled(false);
                  // is claimed or settled by anyone?
                  } else if (cd !== null && ((typeof cd.settler !== 'undefined' && cd.settler[ct.get_Pos()]) || (typeof cd.claimer !== 'undefined' && cd.claimer[ct.get_Pos()]))) {
                    this.unclaimCityBtn.setEnabled(false);
                    this.claimCityBtn.setEnabled(false);
                  } else {
                    this.unclaimCityBtn.setEnabled(false);
                    this.claimCityBtn.setEnabled(true);
                  }
                  // unsettle
                  // is settled by self?
                  if (cd !== null && typeof cd.settler !== 'undefined' && cd.settler[ct.get_Pos()] && parseInt(cd.settler[ct.get_Pos()].uid, 10) === pl.getId()) {
                    this.unsettleCityBtn.setVisibility("visible");
                    this.unsettleCityBtn.setEnabled(true);
                  } else {
                    this.unsettleCityBtn.setEnabled(false);
                    // settle
                    // have barons, have traiders, have ressources and is not a castle?
                    var tr = uc.getTraders();
                    this.unsettleCityBtn.setVisibility("excluded");
                    var haveBaron = (typeof uc.units !== 'undefined' && uc.units !== null && typeof uc.units[19] !== 'undefined' && uc.units[19] !== null && uc.units[19].count >= 1) ? true : false;
                    var haveRess = webfrontend.gui.Util.checkResourcesObject(jf.getNewCityResources());
                    if (haveBaron && haveRess && tr !== null && !(ct.get_UIType() !== EMPTY_TYPE && ct.get_StrongHold())) {
                      // have carts and target on same continent?
                      var ti = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id()), tooltip; 
                      if (ti[1].ete !== -1 && tr[1] !== null && tr[1].count >= 250 && (jf.getContinentFromCoords(uc.getId() & 0xFFFF, uc.getId() >> 16) === cc) && !(uc.getStrongHold() && uc.getSieged())) {
                        this.settleLandCityBtn.setVisibility("visible");
                        this.unsettleCityBtn.setVisibility("visible");
                        if (ti[1].ete !== -2) {
                          this.settleLandCityBtn.setEnabled(true);
                          this.settleLandCityBtn.setBlockToolTip(false);
                          tooltip = new qx.ui.tooltip.ToolTip(ti[1].eta, null);
                          this.settleLandCityBtn.setToolTip(tooltip);
                        } else {
                          this.settleLandCityBtn.setEnabled(false);
                          this.settleLandCityBtn.setBlockToolTip(false);
                          tooltip = new qx.ui.tooltip.ToolTip('...', null);
                          this.settleLandCityBtn.setToolTip(tooltip);
                        }
                      } else {
                        this.settleLandCityBtn.setVisibility("excluded");
                        this.settleLandCityBtn.setBlockToolTip(true);
                      }
                      // have ships and is water?
                      if (ti[2].ete !== -1 && tr[2] !== null && tr[2].count >= 25 && (ct.get_UIType() === EMPTY_TYPE || ct.get_OnWater()) && !(uc.getStrongHold() && uc.getSieged()) && uc.getOnWater()) {
                        this.settleWaterCityBtn.setVisibility("visible");
                        this.unsettleCityBtn.setVisibility("visible");
                        if (ti[2].ete !== -2) {
                          this.settleWaterCityBtn.setEnabled(true);
                          this.settleWaterCityBtn.setBlockToolTip(false);
                          tooltip = new qx.ui.tooltip.ToolTip(ti[2].eta, null);
                          this.settleWaterCityBtn.setToolTip(tooltip);
                        } else {
                          this.settleWaterCityBtn.setEnabled(false);
                          this.settleWaterCityBtn.setBlockToolTip(false);
                          tooltip = new qx.ui.tooltip.ToolTip('...', null);
                          this.settleWaterCityBtn.setToolTip(tooltip);
                          qx.util.TimerManager.getInstance()
                            .start(function () {
                            var id = ct.get_Id(), ti = AlsiusTweak.worldData.getInstance().calculateSettle(id);
                            if (ti[2].ete !== -2) {
                              this.settleWaterCityBtn.setEnabled(true);
                              this.settleWaterCityBtn.setBlockToolTip(false);
                              tooltip = new qx.ui.tooltip.ToolTip(ti[2].eta, null);
                              this.settleWaterCityBtn.setToolTip(tooltip);
                            } else {
                              this.settleWaterCityBtn.setVisibility("excluded");
                              this.settleWaterCityBtn.setBlockToolTip(true);
                            }
                          }, null, this, null, 1000 * 5);
                        }
                      } else {
                        this.settleWaterCityBtn.setVisibility("excluded");
                        this.settleWaterCityBtn.setBlockToolTip(true);
                      }
                    } else {
                      this.settleLandCityBtn.setVisibility("excluded");
                      this.settleWaterCityBtn.setVisibility("excluded");
                    }
                  }
                } else {
                  // settle without bot
                  this.multiSettleMenu.setEnabled(true);
                  this.claimCityBtn.setVisibility("excluded");
                  this.unclaimCityBtn.setVisibility("excluded");
                  this.unsettleCityBtn.setVisibility("excluded");
                  // have barons, have traiders, have ressources and is not a castle?
                  var tr = uc.getTraders();
                  var haveBaron = (typeof uc.units !== 'undefined' && uc.units !== null && typeof uc.units[19] !== 'undefined' && uc.units[19] !== null && uc.units[19].count >= 1) ? true : false;
                  var haveRess = webfrontend.gui.Util.checkResourcesObject(jf.getNewCityResources());
                  if (haveBaron && haveRess && tr !== null && !(ct.get_UIType() !== EMPTY_TYPE && ct.get_StrongHold())) {
                    // have carts and target on same continent?
                    var ti = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id()),
											tooltip; 
                    if (ti[1].ete !== -1 && tr[1] !== null && tr[1].count >= 250 && (jf.getContinentFromCoords(uc.getId() & 0xFFFF, uc.getId() >> 16) === cc) && !(uc.getStrongHold() && uc.getSieged())) {
                      this.settleLandCityBtn.setVisibility("visible");
                      if (ti[1].ete !== -2) {
                        this.settleLandCityBtn.setEnabled(true);
                        this.settleLandCityBtn.setBlockToolTip(false);
                        tooltip = new qx.ui.tooltip.ToolTip(ti[1].eta, null);
                        this.settleLandCityBtn.setToolTip(tooltip);
                      } else {
                        this.settleLandCityBtn.setEnabled(false);
                        this.settleLandCityBtn.setBlockToolTip(false);
                        tooltip = new qx.ui.tooltip.ToolTip('...', null);
                        this.settleLandCityBtn.setToolTip(tooltip);
                      }
                    } else {
                      this.settleLandCityBtn.setVisibility("excluded");
                      this.settleLandCityBtn.setBlockToolTip(true);
                    }
                    // have ships and is water?
                    if (ti[2].ete !== -1 && tr[2] !== null && tr[2].count >= 25 && (ct.get_UIType() === EMPTY_TYPE || ct.get_OnWater()) && !(uc.getStrongHold() && uc.getSieged()) && uc.getOnWater()) {
                      this.settleWaterCityBtn.setVisibility("visible");
                      if (ti[2].ete !== -2) {
                        this.settleWaterCityBtn.setEnabled(true);
                        this.settleWaterCityBtn.setBlockToolTip(false);
                        tooltip = new qx.ui.tooltip.ToolTip(ti[2].eta, null);
                        this.settleWaterCityBtn.setToolTip(tooltip);
                      } else {
                        this.settleWaterCityBtn.setEnabled(false);
                        this.settleWaterCityBtn.setBlockToolTip(false);
                        tooltip = new qx.ui.tooltip.ToolTip('...', null);
                        this.settleWaterCityBtn.setToolTip(tooltip);
                        qx.util.TimerManager.getInstance()
                          .start(function () {
                          var id = ct.get_Id(), ti = AlsiusTweak.worldData.getInstance().calculateSettle(id);
                          if (ti[2].ete !== -2) {
                            this.settleWaterCityBtn.setEnabled(true);
                            this.settleWaterCityBtn.setBlockToolTip(false);
                            tooltip = new qx.ui.tooltip.ToolTip(ti[2].eta, null);
                            this.settleWaterCityBtn.setToolTip(tooltip);
                          } else {
                            this.settleWaterCityBtn.setVisibility("excluded");
                            this.settleWaterCityBtn.setBlockToolTip(true);
                          }
                        }, null, this, null, 1000 * 5);
                      }
                    } else {
                      this.settleWaterCityBtn.setVisibility("excluded");
                      this.settleWaterCityBtn.setBlockToolTip(true);
                    }
                  } else {
                    this.multiSettleMenu.setEnabled(false);
                    this.settleLandCityBtn.setVisibility("excluded");
                    this.settleWaterCityBtn.setVisibility("excluded");
                  }
                }
                break;
              case MOONGATE_TYPE:
              case SHRINE_TYPE:
                break;
              default:
                return false;
              }
            }
          }
        }
      });
      // GPL header - I put this here out of way, even that its used in the code above
      GPL = "This program is free software: you can redistribute it and/or modify" + " it under the terms of the GNU General Public License as published by" + " the Free Software Foundation, either version 3 of the License, or" + " (at your option) any later version." + "\n\n" + "This program is distributed in the hope that it will be useful," + " but WITHOUT ANY WARRANTY; without even the implied warranty of" + " MERCHANTABILITY or FITNESS FOR A EXTRTICULAR PURPOSE.  See the" + " GNU General Public License for more details." + "\n\n" + "You should have received a copy of the GNU General Public License" + " along with this program. If not, see http://www.gnu.org/licenses/.";
    };
    /* startup script to launch the tweak */
    var startup = function () {
      if (typeof qx === 'undefined') {
        window.setTimeout(startup, 1000);
      } else {
        if (checkDependencies()) {
          if (!startup.initialized) {
            startup.initialized = true;
            createTweak();
            AlsiusTweak.Main.getInstance()
              .initialize();
          }
        } else {
          window.setTimeout(startup, 2000);
        }
      }
    };
    window.setTimeout(startup, 1000);
  };

  function debug(e) {
    if (window.console && typeof console.log === "function") {
      console.log('AlsiusTweak: ' + e);
    }
  }
  /* inject this script into the website */
  function inject() {
    debug('Injecting script');
    var script = document.createElement("script"),
      txt = main.toString();
    if (typeof window.opera !== 'undefined') {
      txt = txt.replace(/</g, "<");
    }
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  if (/lordofultima\.com/i.test(document.domain)) {
    inject();
  }
}());