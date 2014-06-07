// ==UserScript==
// @name        LoUWPK Tools
// @description Adds extra functionality to Lord of Ultima
// @namespace   Wolfpack
// @include     http://prodgame25.lordofultima.com/282/index.aspx*
// @version     1.8.1
// @grant       none
// ==/UserScript==
(function () {
  /*
   * Changelog
   * 02/16/2014

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
   * 0.9.9.9 - *working*
   * 1.0Beta - fix settle by ship
   * 1.0.1 - fix result.error
   * 1.0.2 - remove tips
   * 1.0.2.1 - bugfixing
   * 1.0.2.2 - fix function name after update
   * 1.0.3 - refactoring login
   * 1.0.4 - add dragon
   * 1.0.5 - add IncomingAttacksPage tooltip
   * 1.0.6 - add OutgoingAttacksPage tooltip
   * 1.0.7 - add coords to OutgoingAttacksPage tooltip
   * 1.0.8 - add FoodCityOverviewWidget tooltip and refactor to _buildExtraCityTooltip
   * 1.0.9 - add return value to bot settle
   * 1.0.9.1 - bugfix
   * 1.0.9.2 - bugfix
   * 1.0.9.3 - bugfix
   * 1.1 - add regular Error Message to Settle
   * 1.2 - fixing for lou update
   * 1.2.1 - bugfix units locale
   * 1.2.2 - bugfix alliance overview tooltips after update
   * 1.3 - change emoticons hosting
   * 1.4 - make Charts with bbcodes? YUP!
   * 1.4.1 - bugfix
   * 1.4.2 - bugfix
   * 1.5 - add Google-Jsapi
   * 1.6 - fixing for lou update
   * 1.6.1 - fixing LL title
   * 1.6.2 - add emoticon shared url
   * 1.6.3 - fix get_State BOS on WORLD view function
   * 1.6.4 - enable debug text
   * 1.6.4.1 - copy for WPK
   * 1.7 - add allied chat
   * 1.7.1 - fix notes
   * 1.7.2 - add rule for note
   * 1.7.3 - summer update
   * 1.8 - use binary smilies
   * 1.8.1 - fix lawless name
   */
  var main = function () {
    var AlsiusTweakVersion = '1.8.1';

    function debug(msg) {
      msg = (msg instanceof Error && msg.stack) ? msg.stack : String(msg);
      if (window.console && typeof console.log === "function") {
        console.log('WpkTweak: ' + msg);
      }
    }
    
    function exec(fn) {
      var script = document.createElement('script');
      script.setAttribute("type", "application/javascript");
      script.textContent = '(' + fn + ')();';
      document.body.appendChild(script); // run the script
      document.body.removeChild(script); // clean up
    }
    
    function colorLuminance(hex, lum) {
      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
      }
      lum = lum || 0;
      // convert to decimal and change luminosity
      var rgb = "#", c, i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
      }
      return rgb;
    }
    
    function htmlEntityDecode(str) {
     var ta = document.createElement("textarea");
     ta.innerHTML = str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
     return ta.value;
    }
    
    function serializeQuery(obj) {
      var str = [];
      for(var p in obj)
         str.push(p + "=" + obj[p]);
      return str.join("&");
    }
    
    function injectJsapi() {
      debug('Injecting Google-Jsapi');
      var script = document.createElement("script");
      script.setAttribute("src", "//www.google.com/jsapi");
      script.addEventListener('load', function () {
        exec(jsapiLoaded);
      }, false);
      document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    function jsapiLoaded() {
      google.load("visualization", "1", { packages: ["corechart"], "callback": function(){ AlsiusTweak.Main.getInstance().setChart(); } });
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
    var DefaultLang = "de",
    LocalizedStrings = {
      "en" : {
        "ext:weak" : "Weakness",
        "ext:error_on_command" : "Failed to run command",
        "ext:you_are_logged_in" : "You are logged in",
        "ext:login_failed" : "Login failed",
        "ext:login_kicked" : "Login kicked",
        "ext:login_unknown" : "Stand-alone",
        "ext:licence_info" : "Click to show license and other informations",
        "ext:fill_build_queue" : "Click to Fill build queue",
        "ext:convert_all_builds" : "Click to Convert all builds",
        "ext:error_message" : "Error",
        "ext:ok_message" : "Successfully ",
        "ext:like_message" : " like you :x",
        "ext:poke_message" : " poke you <:-P",
        "ext:vote_message" : " vote you :-bd",
        "ext:love_message" : "Someone love you @};-",
        "ext:slap_message" : "Someone slap you :-q",
        "ext:no_data" : "[i]no data[/i]",
        "ext:no_data_or_credentials" : "[i]no data or credentials[/i] ",
        "ext:settler" : "Settle",
        "ext:settle" : "settle",
        "ext:no_settle" : "[i]nobody settle[/i]",
        "ext:claimer" : "Claims",
        "ext:claims" : "claims",
        "ext:no_claim" : "[i]nobody claims[/i]",
        "ext:info" : "Informations",
        "ext:no_info" : "[i]none[/i]",
        "ext:prior" : "Preceding",
        "ext:process_data" : "[i]process Data...[/i]",
        "ext:since" : "since",
        "ext:progress" : "Progress",
        "ext:unit_ts" : "Unit TS",
        "ext:online" : "Online",
        "ext:offline" : "Offline",
        "ext:if_bm_available" : "If build minister is available",
        "ext:if_wm_available" : "If war minister is available",
        "ext:if_bos_available" : "If BOS tool is available",
        "ext:cancel_all_orders" : "Cancel all",
        "ext:cancel_raid_orders" : "Cancel raids",
        "ext:schedule_raid_orders" : "Schedule raids",
        "ext:return_time" : "Latest return time:",
        "ext:apply" : "Apply",
        "ext:close" : "Close",
        "ext:apply_tooltip" : "Click to apply changes",
        "ext:2 days" : "2 Days",
        "ext:3 days" : "3 Days",
        "ext:4 days" : "4 Days",
        "ext:5 days" : "5 Days",
        "ext:6 days" : "6 Days",
        "ext:7 days" : "7 Days",
        "ext:today" : "Today",
        "ext:tomorrow" : "Tomorrow",
        "ext:load_intel" : "Load bos intel",
        "ext:install_bos" : "install or update BOS tool",
        "ext:bos_link_text" : "This link will lead you to userscripts.org.<br/><b>LoU BoS</b> provides additions to Lord of Ultima: summary, food calculator, recruitment speed calculator, combat calculator and various other features.",
        "ext:copy_to_chat" : "Copy to chat",
        "ext:copy_to_mail" : "Copy to mail",
        "ext:tools" : "Tools",
        "ext:switch_to_city" : "switch to: ",
        "ext:plunder" : "plunder",
        "ext:to_settle" : "settle",
        "ext:scout" : "scout",
        "ext:send_army" : "Truppen schicken",
        "ext:send_resources" : "send resources",
        "ext:view_reports" : "view reports",
        "ext:coordinates" : "Coordinates",
        "ext:player" : "Player",
        "ext:alliance" : "Alliance",
        "ext:enable_emoticons" : "enable emoticons",
        "ext:claim_city" : "claim city",
        "ext:delete_claim" : "delete claim",
        "ext:settle_by_land" : "settle by land",
        "ext:settle_by_water" : "settle by water",
        "ext:delete_settle" : "delete settle",
        "ext:settlement_area" : "settlement area",
        "ext:lawless_city" : "Lawless city",
        "ext:lawless_city_with_castle" : "Lawless city with castle",
        "ext:ruins" : "Ruins",
        "ext:claim_ok" : "Claim: ",
        "ext:claim_nok" : "Claiming error: ",
        "ext:unclaim_ok" : "Claim canceled: ",
        "ext:unclaim_nok" : "Cancel error: ",
        "ext:settle_ok" : "Settle: ",
        "ext:settle_nok" : "Settle error: ",
        "ext:unsettle_ok" : "Settle canceled: ",
        "ext:unsettle_nok" : "Cancel error: ",
        "ext:baron_needed" : "baron needed",
        "ext:resources_needed" : "resources needed",
        "ext:is_castle" : "target is a castle",
        "ext:traiders_needed" : "traiders needed",
        "ext:unknown" : "unknown",
        "ext:freeslot_needed" : "freeslot needed",
        "ext:notepad" : "Notepad",
        "ext:edit" : "Edit",
        "ext:save" : "Save",
        "ext:done" : "Done",
        "ext:note_ok" : "Note: ",
        "ext:note_nok" : "Note error: ",
        "ext:settlement" : "Settlement",
        "ext:continent_abbr" : "C"
      },
      "de" : {
        "ext:weak" : "Schwäche",
        "ext:error_on_command" : "Fehler beim ausführen von",
        "ext:you_are_logged_in" : "Du bist angemeldet",
        "ext:login_failed" : "Fehler bei der Anmeldung",
        "ext:login_kicked" : "Anmeldung abgewiesen",
        "ext:login_unknown" : "Autonom",
        "ext:licence_info" : "Lizenz und Info's",
        "ext:fill_build_queue" : "Bauliste füllen",
        "ext:convert_all_builds" : "Aufträge bezahlen",
        "ext:error_message" : "Fehler",
        "ext:ok_message" : "Erfolgreich ",
        "ext:like_message" : " mag Dich :x",
        "ext:poke_message" : " stubst Dich an <:-P",
        "ext:vote_message" : " votet Dich :-bd",
        "ext:love_message" : "Jemand mag Dich @};-",
        "ext:slap_message" : "Jemand slapt Dich :-q",
        "ext:no_data" : "[i]keine Daten[/i]",
        "ext:no_data_or_credentials" : "[i]keine Daten oder Berechtigung[/i] ",
        "ext:settler" : "Siedler",
        "ext:settle" : "siedelt",
        "ext:no_settle" : "[i]niemand siedelt[/i]",
        "ext:claimer" : "Reservierungen",
        "ext:claims" : "reserviert",
        "ext:no_claim" : "[i]keine Reservierung[/i]",
        "ext:info" : "Informationen",
        "ext:no_info" : "[i]keine[/i]",
        "ext:prior" : "Vorherig",
        "ext:process_data" : "[i]verarbeite Daten...[/i]",
        "ext:since" : "seit",
        "ext:progress" : "Fortschritt",
        "ext:unit_ts" : "Einheiten TS",
        "ext:online" : "Online",
        "ext:offline" : "Offline",
        "ext:if_bm_available" : "Funktionen für Bauminister",
        "ext:if_wm_available" : "Funktionen für Kriegsminister",
        "ext:if_bos_available" : "Funktionen für BOS Tools",
        "ext:cancel_all_orders" : "Befehle löschen",
        "ext:cancel_raid_orders" : "Raids abbrechen",
        "ext:schedule_raid_orders" : "Raids Zeitplan",
        "ext:return_time" : "Späteste Rückkehr:",
        "ext:apply" : "Speichern",
        "ext:close" : "Schließen",
        "ext:apply_tooltip" : "Klicke hier, um die Änderungen zu speichern",
        "ext:2 days" : "2 Tage",
        "ext:3 days" : "3 Tage",
        "ext:4 days" : "4 Tage",
        "ext:5 days" : "5 Tage",
        "ext:6 days" : "6 Tage",
        "ext:7 days" : "7 Tage",
        "ext:today" : "Heute",
        "ext:tomorrow" : "Morgen",
        "ext:load_intel" : "lade Intelligence",
        "ext:install_bos" : "BOS Tool",
        "ext:bos_link_text" : "Dieser Link wird dich zu userscripts.org weiterleiten.<br/><b>LoU BoS</b> bietet Ergänzungen: Übersichten, Nahrungs Rechner, Rekrutierungsgeschwindigkeit Rechner, Kampf Rechner und verschiedene andere Funktionen.",
        "ext:copy_to_chat" : "in den Chat",
        "ext:copy_to_mail" : "in die Mail",
        "ext:tools" : "Tools",
        "ext:switch_to_city" : "wechseln zu: ",
        "ext:plunder" : "Plündern",
        "ext:to_settle" : "Siedeln",
        "ext:scout" : "Auskundschaften",
        "ext:send_army" : "Truppen schicken",
        "ext:send_resources" : "Ressourcen schicken",
        "ext:view_reports" : "Berichte",
        "ext:coordinates" : "Position",
        "ext:player" : "Spieler",
        "ext:alliance" : "Allianz",
        "ext:enable_emoticons" : "Emoticons",
        "ext:claim_city" : "Reservieren",
        "ext:delete_claim" : "Reservierung löschen",
        "ext:settle_by_land" : "Siedeln über Land",
        "ext:settle_by_water" : "Siedeln über Wasser",
        "ext:delete_settle" : "Siedlung löschen",
        "ext:settlement_area" : "Siedlungsgebiet",
        "ext:lawless_city" : "Gesetzlose Stadt",
        "ext:lawless_city_with_castle" : "Gesetzlose Stadt mit Burg",
        "ext:claim_ok" : "Reservierung: ",
        "ext:claim_nok" : "Reservierung Fehler: ",
        "ext:unclaim_ok" : "Stornierung: ",
        "ext:unclaim_nok" : "Stornierung Fehler: ",
        "ext:settle_ok" : "Siedeln: ",
        "ext:settle_nok" : "Siedeln Fehler: ",
        "ext:unsettle_ok" : "Stornierung: ",
        "ext:unsettle_nok" : "Stornierung Fehler: ",
        "ext:baron_needed" : "kein Baron",
        "ext:resources_needed" : "zu wenig Ressourcen",
        "ext:is_castle" : "Ziel ist eine Burg",
        "ext:traiders_needed" : "keine Karren/Schiffe",
        "ext:unknown" : "unbekannt",
        "ext:freeslot_needed" : "keinen freien Slot",
        "ext:notepad" : "Notizen",
        "ext:edit" : "Bearbeiten",
        "ext:save" : "Speichern",
        "ext:done" : "Fertig",
        "ext:note_ok" : "Notiz: ",
        "ext:note_nok" : "Notiz Fehler: ",
        "ext:settlement" : "Siedlung",
        "ext:continent_abbr" : "K"
      }
    };

    function i18n(messageId) {
      var locale = qx.locale.Manager.getInstance()
        .getLocale().split('_')[0],
      retvar = messageId;
      if (typeof LocalizedStrings[locale] !== 'undefined' && typeof LocalizedStrings[locale][messageId] !== 'undefined') {
        retvar = LocalizedStrings[locale][messageId];
      } else if (LocalizedStrings[DefaultLang] && typeof LocalizedStrings[DefaultLang][messageId] !== 'undefined') {
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
          if (smilies.hasOwnProperty(e)) {
            emoticons[e] = smilies[e];
            emoticons[e][0] = base_url + emoticons[e][0];
          }
        }
        // Generate the smiley-match regexp.
        for (e in emoticons) {
          if (emoticons.hasOwnProperty(e)) {
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
                name : e,
                regexp : new RegExp('^' + regexp_str + '$')
              });
            } else {
              // Generate regexp from smiley.
              regexp_str = e.replace(/(\W)/g, '\\$1');
            }
            arr.push(regexp_str);
          }
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
      EXTbotname = "Rebos",
      EXTgreeting = "Strength in Unity",
      EXTauthors = "BloodHeart",
      EXTpolltrip = 1000 * 60 * 5,
      EXTmaxlogonretrys = 3,
      EXTdata = {
        'version' : null,
        'endpoint' : null,
        'provider' : null
      };
      EXTallied = null;
      qx.Class.define("AlsiusTweak.Main", {
        // let's create a new instance for EXT additional tweaks.
        type : "singleton",
        extend : qx.core.Object,
        members : {
          app : null,
          tick : null,
          ministerPresent : null,
          bosPresent : null,
          cityInfoView : null,
          continents : null,
          panel : null,
          debug : null,
          botState : null,
          logOnRetrys : null,
          drawChart : null,
          buildQueueContainer : null,
          // functions
          initialize : function () {
            this.ministerPresent = {
              'TradeMinister' : false,
              'BuildMinister' : false,
              'DefenseMinister' : false,
              'MilitaryMinister' : false
            };
            this.bosPresent = false;
            this.tick = null;
            this.debug = false;
            this.botState = 0;
            this.logOnRetrys = 0;
            this.continents = [];
            this.app = qx.core.Init.getApplication();
            this.cityInfoView = this.app.getCityInfoView();
            this.buildQueueContainer = this.cityInfoView.buildingQueue;
            this.tweakEXT();
            this.drawChart = false;
            injectJsapi();
          },
          setChart : function () {
            this.drawChart = true;
          },
          useGoogleChart : function () {
            var ret = false;
            if (Boolean(this.drawChart) && this.drawChart !== -1) {
              ret = true;
            }
            return ret;
          },
          tweakEXT : function () {
            if (this.debug) webfrontend.data.Server.getInstance()
              .setTestServer(true);
            this.inception();
            this.toolTip();
            this.chat = webfrontend.data.Chat.getInstance();
            webfrontend.data.FriendList.prototype.isFriendName = this.isFriendName;
            webfrontend.gui.Overviews.Alliance.IncomingAttacksPage.prototype.__ng = this.incomingAttacksPageTooltip;
            webfrontend.gui.Overviews.Alliance.OutgoingAttacksPage.prototype.__ng = this.outgoingAttacksPageTooltip;
            webfrontend.gui.FoodCityOverviewWidget.prototype.__ng = this.foodCityOverviewTooltip;
            qx.util.TimerManager.getInstance()
            .start(function () {
              this.checkMinisterPresent();
              this.checkBosPresent();
              this.checkDeprecated();
            }, null, this, null, 1000 * 5);
            this.panel = new AlsiusTweak.ui.ExtraTools("Wolfpack Tools v" + EXTversion + ' ~ ' + EXTgreeting + ' ~ ');
            this.addPanel(this.panel);
            this.hijackMessage();
            this.emotifyIcons();
            this.worldData();
            this.contextMenu();
            this.checkBotState();
          },
          setPanelState : function (state) {
            this.panel.setState(state);
          },
          checkMinisterPresent : function () {
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
          checkBosPresent : function () {
            this.bosPresent = (typeof window.bos !== 'undefined') ? true : false;
            qx.util.TimerManager.getInstance()
            .start(function () {
              this.checkBosPresent();
            }, null, this, null, 1000 * 60);
          },
          checkDeprecated : function () {
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
          checkBotState : function () {
            var delay = 1;
            if (this.botState === 0) {
              this.logOn();
            }
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
          isBotOnline : function () {
            var ret = false;
            if (Boolean(this.botState) && this.botState !== -1) {
              ret = true;
            }
            return ret;
          },
          contextMenu : function () {
            AlsiusTweak.ui.contextMenu.getInstance()
            .init();
          },
          worldData : function () {
            AlsiusTweak.worldData.getInstance()
            .init();
          },
          inception : function () {
            AlsiusTweak.Inception.getInstance()
            .init();
          },
          toolTip : function () {
            AlsiusTweak.Tooltip.getInstance()
            .init();
          },
          addPanel : function (panel) {
            this.buildQueueContainer.getLayoutParent()
            .addBefore(panel, this.buildQueueContainer);
          },
          logOn : function () {
            this.logOnRetrys++;
            var key = AlsiusTweak.Stack.getInstance()
              .store({
                invoke : function (result) {
                  if (result.status && !result.error) {
                    AlsiusTweak.Chat.getInstance()
                    .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:you_are_logged_in') + result.message), true, 'LoUWin');
                    EXTdata = {
                      'version' : result.version,
                      'endpoint' : result.endpoint,
                      'provider' : result.provider
                    };
                    EXTallied = result.allied;
                  } else if (result.status) {
                    AlsiusTweak.Chat.getInstance()
                    .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:login_failed') + result.message), true, 'System');
                    EXTdata = {
                      'version' : result.version,
                      'endpoint' : result.endpoint,
                      'provider' : result.provider
                    };
                    EXTallied = result.allied;
                  } else {
                    AlsiusTweak.Chat.getInstance()
                    .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:login_failed') + result.message), true);
                  }
                }
              });
            this.chat.addMsg('/whisper ' + EXTbotname + ' !alsius.' + key + '.Login ' + EXTversion + ' ' + webfrontend.net.CommandManager.getInstance()
              .getInstanceGuid());
          },
          hijackMessage : function () {
            AlsiusTweak.Chat.getInstance()
            .init();
          },
          registerTick : function () {
            this.getContinents();
            var tp = AlsiusTweak.Provider.getInstance();
            //tp.pollData([{"Service": "getData", "Args": {"continent": '-1'}}]);
            this.continents.forEach(function (c) {
              tp.pollData([{
                    "Service" : "getData",
                    "Args" : {
                      "continent" : c
                    }
                  }
                ]);
              this.tick = qx.util.TimerManager.getInstance()
                .start(tp.pollData, EXTpolltrip, tp, [{
                      "Service" : "getData",
                      "Args" : {
                        "continent" : c
                      }
                    }
                  ]);
            });
          },
          unRegisterTick : function () {
            qx.util.TimerManager.getInstance()
            .stop(this.tick);
          },
          getContinents : function () {
            this.continents = webfrontend.data.Server.getInstance()
              .getActiveContinents();
          },
          emotifyIcons : function () {
            var smilies = {
							">:)" : ["data:image/gif;base64,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", "devil", ">:-)", "&gt;:-)", "&gt;:)"],
							"(devil)" : ["data:image/gif;base64,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", "devil.gif", "devil"],
							"(doh)" : ["data:image/gif;base64,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", "doh"],
							"(drunk)" : ["data:image/gif;base64,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", "drunk"],
							"(hi)" : ["data:image/gif;base64,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", "Hi"],
							":#" : ["data:image/gif;base64,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", "Lips Sealed", ":-#"],
							"|-(" : ["data:image/gif;base64,R0lGODlhEwATAOYAAP//////9///7//35v/vxf/mzv/mpf/etf/erf/epf/ehP/eY//eWv/eIf/eGf/WY//WUv/WSv/WOv/WKf/WMf/WIf/MZv/OUv/OQv/OOv/OKf/OIf/Fc//MM//Fa//FQv/FOv/FKf+9e//FMf/FIf+9c/+9a/+9Y/+9Qv+9Kf+9Mf+9If+1Wv+1Y/+1Sv+1Qv+1Ov+1Mf+1If+1Kf+tWv+tOv+tQv+tMf+tKf+lQv+lOv+lMf+lKf+ZM5lmMzMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBAACwAAAAAEwATAAAH/4BAgoIFJTktiDklBYONgi0iBwKTkwciLY5AAzkIBJ6fnwg5A4ObCQaoqaoGCaOCNB4KsrO0sx40QAU9Fj69vgu+vhY9hTsXFwE/PwERzcnLEBc7JTo8HxgBAAABEt0C2gEYGDg6OzgpHQ8DAwsT7gzrCx0hODvmMiEaGhX8DQ38GzSEWCHD3owUK0hs4FfBgQOGG0ismLGjxo0UIRQurOAPYMSJNUxcDJFPg7uTE/SFSHFjUY0YJPWhdKcyRQ1GLGCoGNGhp7IfFHqOCAGDhaABNWDw7JChaVOhMGqQOmoDBggQTp+CgPFiaqMTL1Cg+ADiwwcUL05kGlSAgwsXaAZdcGDUKBAAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsBQAHAAkAAQAABwiAPz9AhISCgQAh+QQFCgBAACwFAAYACQADAAAHD4AAAECEhIKFiIQ/P4mLgQAh+QQFCgBAACwEAAcACgACAAAHEIA/QABAhUCCAIIDhodAA4EAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsAAAAAAEAAQAABwOAQIEAIfkEBQoAQAAsBAAGAAkAAwAABxCAPz9AhISChYiEDwOJDAOBACH5BAUKAEAALAQABwAJAAEAAAcJgAEAQISEAgCBACH5BAUKAEAALAQABgAKAAEAAAcKgAFAP0CFQII/gQAh+QQJCgBAACwAAAAAEwATAAAHHYBAgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmoqBADs=", "dull", "|("],
							"(emo)" : ["data:image/gif;base64,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", "emo"],
							"]:)" : ["data:image/gif;base64,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", "evilgrin", "]:-)"],
							":)" : ["data:image/gif;base64,R0lGODlhEgASAPc/APO2M/TQSPnlmPfZY/XkY/jya/746fj3cfjZfPaVPfa4SfTMQffrZPbhWfinSu7TVufMV/TcW//GxvjEVuy/TffuZ/XZUeSyQPPHPPvxvfblXvWlNd6eMeq2NNWhM/jiZvjQX89vETMzzMzM//758d+lOOqQONqRKOi7RdBjEfi5Yu2oVOjBS//d3ffmavjjhPK9M+V9LffiXwAAAGYzM9eIItSBHu+KO/zYtfPDU+KqOeqyL/j5c6uCNP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQF7gI/ACwAAAAAEgASAEAI0wB/CBxIsCDBHhISOHjwAIUHDygegFiRYEMPgz96aNyIMSOJDA0YFBhZgUGDADsuDuwhwAWKGCFihoiBosEClQd7GBAwYAEGGBoL6hSggQcPEUaRFpARAIDKHjhSxCBwwKhVAjFSOD1IAYGFBho0NLCwwANOgxs5duzxMQJYsWS3HjRAoAKPf1X/8ahgE2ePFiomuOAxwmjhDxMUyEW4woSLAxkiZ6gaY4VFgT0QvPAQ4oELAp8fhIiYcmUOog1XrIgYIYBZtD1gYFjgs0PQjrgJBgQAIfkEBQoAPwAsBQAFAAcABQBACCMAfxQ48OPAgQI/ePxYmLCACBojRtAQUcEACR8YDfwAwHBhQAAh+QQFMgA/ACwFAAUABwAFAEAIHwB/8Pgn8B+PHwd+KETogscIHg4h8hABkeKPBwsVBgQAIfkEBQoAPwAsBQAFAAcABQBACCMAfxQ48OPAgQI/ePxYmLCACBojRtAQUcEACR8YDfwAwHBhQAA7", "happy", ":-)", "*g", "*g*", "*G", "*G*"],
							":(" : ["data:image/gif;base64,R0lGODlhEgASAOZ/AOrLUtaJN8R1V9OCHvXaUfj3cfG7Mui6L/TMQe3RVey8OuW7TPTIPPbhWe67NdmSKf3WOvHZWe2/Tv766OKvP+e9R81pC//68fjxa+q2NN2cW/frZPblXc5yB/G4HrlbHu6yHOezOfrgT/nqXvjvae7MTuW3RNaYNtByC/jpev3UNvPHPM9vD/jzbdWhM/fuZ/fqY+3UWcxmC/jwafj1cPj4cvXwbNR/G/HCWPjnhvfdf/jVeu3Vz2JnbfnlnD5njvzwy/foafXYZPjya/HSUOKlUNeGINeLJfXtat2bMOvCReGmOuqzM+y1NOKsPPLhYeKpONmNJOWmLfC2LvTQRs2Lc/nHK89xEM58HPDQZuCbD9+jNfvxvuGmJPnmWOWnGeioFuDm7daZXPblZfjkk+OzUrJEDK5DEdONQ8hxGufErP3YPc+ONNbCZfzPMO/BPPrtochuGNeed9STMvnfTfDdX/PcV+yvGs1/JPriUdmhQOrHTvj5c6uCNP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFvAJ/ACwAAAAAEgASAEAHyoB/goOEhYR9fiUmBXyNjgUYJQ59hn99l5iVlhdcJzwtGBgtPCdUTJSDfT4SGhUJMTEJJhpKCKiHfRNkQggrBpeFfRdwGx9hP20xP34fMAS/gn1AKTM0NY58NTQkDQy3lhI6BA0cHA0ECC7fwZjAmsILJx/lHycLU+u5Yyd+PQUFPfycaPDmFqIUAE5ooMCQQoAAAJR4i+YnyBBG2PhA4mAr2o4cG/ZouEHyhoYIGwhkMIgDB4cNM0KR2NAggzpDlxw0XLFynaafgQAAIfkEBQoAfwAsAwACAA0ADgBAB4OAf4JVYoIPcYKJiTYxjYp/ZVp3HiBfB5MeYF2PREYsUY9qaHQiXoIjeSIhaYJbJjE2gnUAFBV2CH9LLE5IBQU0T1AyUoICAnp/H2xnc3hmgnJWKhAQIiMqaxBuWH9ZD1csKB0dKCgWAyGP6o8JDzIDRwMySRGJRSXrCgOPDEwKTY8CAQAh+QQFMgB/ACwDAAIADQAHAEAHUoB/ghNkgisGgoJwGx9+P3x8P34fMAR/F1wnPC2CLTwnVEyCER9hPW0xPZMYJQ6Xaid/HBwfJwtTg2MvLTQFBTQtLw1vfykAJxoUyhQBAQBKf4EAIfkEBQoAfwAsAwACAA0ABwBAB1WAf4JVYoIPcYKCZVp3HiBfB40eYF1/amh0Il6CI3kiIWmCWyYxNnx8dQAUFXYIfwICen8fbGdzeGaCclYqEBAiIyprEG5Yf1kPVywoHR0oKBYDIX+BADs=", "sad", ":-("],
							";)" : ["data:image/gif;base64,R0lGODlhEgASAOZ/APDdX/PPRfj3cbGIN/jxa/TOQ/TNQ/j4cvbiWt2dMvfnUvS/M/S6LfPIPfblXffpVfj2cfjwadmMSL9tKPjzbeW4Rfj1cPbiW/jvaHFMYnRvqPXbUtSdj/jya0ZQsGdnserMoPfnye3HbvblXuiwL/nulvTSSfnkmvbfeO22MdesV+q3NPTbUfj5a/PNQvPIPvPPSNarVvXaUfj1a/nlk/flafblW9+0mfjs1+e6WPTNQvbiWffrY/LoaL9sOfXaY/nth/bhWfLjyvbjW/714vPHPeW0QPPj3/j3bvfaefrttffic/vorv343vn5jfbgUvO+Mu+8NPjoefG5MOCnQfjnivbmXo1oNfXdVPfrZPj3bPTSR/j2cPfuZ+u+QOe5Qvj5cu3Vz/PCN/bwaNJ5H/LiYfn4Y/j4bfLkZPDWVL9rJeCjPfn5X/b0bd6vXvfrZcBwPNuyTfPieduuSPj5bvn5ZL9oIvnvgfn4W+/HQ+StMMxmC/j5c6uCNP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFZAB/ACwAAAAAEgASAEAH1IB/goOEhYR9BSMdAnx8AI+PRjl+fYZ/fZiZlpcMWwhZEQQEGBU+N0KVg4gXYnsBWgIzAQM1J6mHfVAwPyhKRJiFfQteXwkTEwB8TgkeHyA4qX0vV3sDZmCNfAcWGFJMt5cpBiwKDw8KT0kq4MGZwJt9DC4yOw4OQUtNIex9OghdFCxAgNAjgR8OR271aYAgApcDxipQkZBBQwlKghBZGeOqRTY+AggAwXhpwQYSrs40OoCEAo8qIhROMTEEy56b1WzQiMHuUp8oDQwYKLLi3aajgwIBACH5BAUMAH8ALAMABAAKAAkAQAc1gH+Cg39laoMkhIqEfI1oG3ISfhyDfn8XEW17AYtpbnBxg2GCaxIZGmSKHQJ8i39XfwNsioEAIfkEBRsAfwAsBAAEAAUACgBAByeAeXY+c39/A4d4hot3fh4fhlwHfC1/YX4ci5qGfH9vFG16AYYkhoEAIfkEBQwAfwAsBAAEAAUACgBAByiAWwhZEX9/JH8BWoaMchJ+HIZtewF8f25wcYybhi1/V3sDbJZ/WIaBACH5BAUMAH8ALAMABAAKAAkAQAczgH+Cg38YFYNihIqEAI0AXl8JExODCX9XewNmYIsIXRQWlYIRXAeSimN7AYt/JH8BZ4qBACH5BAUKAH8ALAMACAAFAAQAQAcVgH9jewEtFySEdFd7A3Vgf28DAgeBACH5BAVkAH8ALAMACAAFAAQAQAcVgH8dAnx8V3sDZmBWY3sBLX8kjmeBADs=", "winking", ";-)"],
							":D" : ["data:image/gif;base64,R0lGODlhEgASANUiAKuCNP///5mZ/+ioKszM//XZUPj2cZttbMz//3d3d66goDNmzLKysqyPjoJ8fJkzM/vwvDOZzImJycxmZpKSkoZSUpiSkvvxvmYzM72DLoBgJsyZMzMAZuWqLemsLbF5PUh84+26WgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQF9AEiACwAAAAAEgASAEAGnECRcEgsEg8MQSCgZAYQAgQiojGKANis9Tq4FAwcA9hQKAwAQ8AAw3A6oYTEwFHEQpaQPLZ4OFgaDQqCgoB9BxVCGUgCEhILj48SSgloaQMfEw+aDxMUc1tXWXtbagFkX2VmlUJqXmKvr2VnQosEBAK2uLe2EYgifrhuSnACVIkgDATCT0oCCXSsaxNNSnFy0ERYAwNlHh2joOEiQQAh+QQFDwAiACwFAAQACAACAEAGDkCRKEAkiigbSiiE3AQBACH5BAUyACIALAUABAAIAAIAQAYLQJGIYzAQRcVkMggAIfkEBQ8AIgAsBQAEAAgAAgBABg5AkShAJIooG0oohNwEAQAh+QQF9AEiACwFAAQACAACAEAGC0CRiGMwEEXFZDIIADs=", "big grin", "xD", ":-D", "*gg*", "gg", "GG", "*GG*"],
							";;)" : ["data:image/gif;base64,R0lGODlhEgASANU/APfqZquCNNORMeuud+GpO6g4E/j4cvbjXOEikPTaUu26NfPHPOW3UfjxavrxtPz36vnkl+ZLjPjZfdagM7JMJO3Tyv////TMQo5YUNmmQtqrn8VpGO3TWcPJv/XaZeTFVfjpefTAM+6af/758T5njv/M//KsnPr6lvOOtvTRR+fHv4+lgMJyYPfHqvPDU/zwy/jnhtCHWebDr+fDZPDVr8eAZ86PgPn0h+u/Tdfa7vC2Lu3eZfPDcumuMOSjK////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFZAA/ACwAAAAAEgASAEAGtMCfcEgsEgOWw+10cjAYHA6OEFMEjL+AdovNjjQVi0UjaGQ0FNZ1GIAAGi2CwoBShA6X9THwgHguCyFaRQEjAywdJB0WDwYYiiobawEvIA0GmJkGJSYlC3pZOBIJB6UHCRcToIRbg10BFRpoAqUJBAKrATIaHYsWNQYaOWN6SDM2K4oWNAQYKx0qqkJIb5qaDQk9kxIwAC0IIpkiKCUJVmwuEAdvA+AABynSrAoLF4BWq136QQAh+QQFCgA/ACwDAAMADQALAEAGWMDfyOE5HH7Iiw6JHDCZCB6ykPlkChvBpCCwFh6ARsNA/jUAh8uP82wjfe6Is+04hMU/dKqHDBsAOwY/BmcJChwFiR9kgokFIT8QESBtUkdMJhERPJoeTEEAIfkEBQoAPwAsAwADAA0ACwBABl7AX0WjoQh+SMIR+WsxmagScmZbkToWGgGz6qgmMk0Ha6n9NDmL5gd4upG9N0L01lQs6mOmyEKyOlcWDz8YVyobBzcnJw4MDBw/OAQxCj8NBgZuUlJMLQQKBigKIUxBACH5BAUKAD8ALAMAAwANAAsAQAZYwN/I4TkcfsiLDokcMJkIHrKQ+WQKG8GkILAWHoBGw0D+NQCHy4/zbCN97oiz7TiExT90qocMGwA7Bj8GZwkKHAWJH2SCiQUhPxARIG1SR0wmERE8mh5MQQAh+QQFCgA/ACwDAAMADQALAEAGXsBfRaOhCH5IwhH5azGZqBJyZluROhYaAbPqqCYyTQdrqf00OYvmB3i6kb03QvTWVCzqY6bIQrI6VxYPPxhXKhsHNycnDgwMHD84BDEKPw0GBm5SUkwtBAoGKAohTEEAIfkEBQoAPwAsAAAAAAEAAQBABgPAXxAAIfkEBQoAPwAsAAAAAAEAAQBABgPAXxAAIfkEBQoAPwAsAwADAA0ACwBABljA38jhORx+yIsOiRwwmQgespD5ZAobwaQgsBYegEbDQP41AIfLj/NsI33uiLPtOITFP3SqhwwbADsGPwZnCQocBYkfZIKJBSE/EBEgbVJHTCYRETyaHkxBACH5BAUUAD8ALAMAAwANAAsAQAZewF9Fo6EIfkjCEflrMZmoEnJmW5E6FhoBs+qoJjJNB2up/TQ5i+YHeLqRvTdC9NZULOpjpshCsjpXFg8/GFcqGwc3JycODAwcPzgEMQo/DQYGblJSTC0ECgYoCiFMQQA7", "batting eyelashes"],
							">:D<" : ["data:image/gif;base64,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", "big hug", "&gt;:D&lt;", ":DD", "xDD"],
							":-/" : ["data:image/gif;base64,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", "confused", ":/"],
							":x" : ["data:image/gif;base64,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", "love struck", ":X"],
							":\">" : ["data:image/gif;base64,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", "blushing", ":\"&gt;"],
							"(blush)" : ["data:image/gif;base64,R0lGODlhEwATAOYAAP//////9///7//35v/vxf/vpf/mzv/mpf/mnP/mhP/mjP/etf/erf/enP/ehP/eY//eIf/Wa//eGf/WUv/WSv/WOv/WKf/WMf/WIf/MZv/OUv/OQv/OOv/OKf/Fc//OIf/MM//Fa//FOv/FQv+9e//FKf/FMf/FIf+9a/+9c//FGf+9Y/+9Qv+9Ov+9Kf+9Mf+9Gf+9If+1Y/+1Wv+1Uv+1Sv+1Qv+1Mf+1Ov+1Kf+1If+1Gf+tWv+tOv+tMf+tKf+tIf+tGf+lQv+lOv+lKf+lMf+lGf+lIf+cIf+cKf+cGf+ZM/+UIf+UEP+UGf+MGf+MEP+EGf+EEP97Gf97EP9zEP9rEP9rCP9jCP9aCJlmMzMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBcACwAAAAAEwATAAAH/4BcgoIGKUIyiEIpBoONgjIkCwKTkwskMo5cA0IMBJ6fnwxCA4ObDQeoWloIqqgHDaOCPCEOtVq1CQkOt7UhPFwGSxHDEQpbWwXHCg/ES4VFGhoTEwHHAMcBFNMaRSlDRCMbGxUBAObmARUc4j9DRT85Ny4lDwMDCfYPJS78P0XvSpw4AXICAwYIEDCcMCLQCJB/SKJYqeIEhkEJEjDsgDLxyZEiPZBMyZIFyg6DCDEEkZIFy5MkPVAkeUKFipIYFnJisKDDSU0nRFAYKEIECRIgW3Iq3QLEKBEfjGb0kGcCxLGrIPa56DFD0IAeOKqC4ECWLAgQJnD0IOXVBg4RIiHKmhVhwwbbRitssGABV8QIFjZWZBpkwEMNG4dreGDUKBAAIfkEBQoAXAAsAAAAAAEAAQAABwOAXIEAIfkEBQoAXAAsAAADABIADAAAB0+AXIKDXAcHhYeEioIOio2LkJGSk5SVHZCXikdIRlwfih87Rp2CR05SUEYni0pSUkqDT1RVsItNVVRcRLpIT0+kikZPTkeER0c5kUDFlZCBACH5BAUKAFwALAAABQASAAoAAAdGgFyCg1wCAoWHhIqLjI1bW1yPjZOUQDqNMTpAloJITko7jEFKSkaCREhPTkEniipBTU6mgkdISJeLOkazgz85jS5cuJSNgQAh+QQFCgBcACwAAAgAEgAHAAAHTIBcgiAgF4KHhx0giFwlHR2Mgh8dJTGCOS4xJx8YjBgYHycxOVw+LiWbH54foTE+gqeOW4xbjyUugj03JY4dW7+/FrZcPZFcF8jIkYEAIfkEBQoAXAAsAAAAAAEAAQAABwOAXIEAIfkEBQoAXAAsAAAIABIABwAAB1GAXIIvJR2Ch4clJYhcQDoxjIIxOkBAgkRITko7J4wqQUpKRpaYT05BnYifTU5GRIJHSEg6qYcnOkajgj4/PzkuWxbCwlsuOjpcPpFcW83NkYEAIfkEBQoAXAAsAAAFABIACgAAB0SAXIKDXFtbhYeEiouMjQCPj42Sk0hGjTtGmYNOUlCWi0pSUkqCSU9UVUowijtNVVROg0hPT5+KRk+xhEdHjTpcvZOSgQAh+QQFCgBcACwAAAMAEgAMAAAHS4BcgoNcWlqFh4SKgomDjYuQkZKTlJMlkJeKSk5OXCeKJ0acg0hRVlVOMItQp0+DU1lZUJBSWVhcSbhPVFRKkE68naRIQJFISJWRgQAh+QQFCgBcACwAAAAAAQABAAAHA4BcgQAh+QQFCgBcACwAAAAAAQABAAAHA4BcgQAh+QQFCgBcACwAAAAAAQABAAAHA4BcgQAh+QQJCgBcACwAAAAAEwATAAAHHYBcgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmoqBADs=", "blushing", "(blushing)"],
							"(bow)" : ["data:image/gif;base64,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", "bow", "(bow)"],
							"(boxing)" : ["data:image/gif;base64,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", "boxing", "(box)"],
							":P" : ["data:image/gif;base64,R0lGODlhEgASAOZXAPj3cf9/APj4cs5mDfjzbfj2ccxmM/jxa/+ZzPj1cMyFPczMM/XZUPbhWPjyaz5njvbhWeSvO/758ffrZPblXcwzM/jwaffqY/jvaPj1b++8NPPLQPXYZPPDU/blZfjxavblXvXNQfbiWffrY/bkXPjpe8+hNPS+MfC2LvjzbPzdyf755vXMQfPHO/bkXffdf/TQRv/68fXIPPnVRv8AAPXdXfjkk/6hwvPMQe6/TvbiWvzwy/7PxfPIPf766ffoaeqyL/ftZvvwvPvxvvTMQPrtoffuZ/C6M///MwAAAO3Fb/r0dfj2cPj5c6uCNP+Zmf/MM8yZM//////MzP/M/2YzM5kAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQF9AFXACwAAAAAEgASAEAH14BXgoOEhYROUiAOAE2NjgUfJCFOhldOTiZWT5tVhk4SQzoTFgcHGBcQMECUg04IC1FQUAAACQRRUVSsh04rNhw4LSeXhU4xRRNKAw+NAssRDEesTjsIU1Aqjk0CCVFTuoc5LzNWVAE0VgFVBpWCl++7nhJCNSIUFBAMGyjxlj4eRggkKFAgQ4ogDYjsQlRiiYIIUqYoUDBFioIGMqZJ+bFIWyMAB1ywmHZjipUFVAQ0A0BgxAAECzvwgGLFwIAqAypYsYKEXTEnGnpoClAhgLp2haooLRQIACH5BAVkAFcALAQABQAKAAMAQAcbgFeCSYJXhFcWTAJUVxERVBkYVwQFhVcPKReBACH5BAUKAFcALAQABQAKAAMAQAcbgFeCCYJXKYJLChFSVwoKU1IKV0oDhVcDDxGBACH5BAVkAFcALAQABQAKAAMAQAcbgFeCSYJXhFcWTAJUVxERVBkYVwQFhVcPKReBACH5BAUKAFcALAQABQAKAAMAQAcbgFeCCYJXKYJLChFSVwoKU1IKV0oDhVcDDxGBADs=", "tongue", ":p", ":-p", ":-P"],
							":-*" : ["data:image/gif;base64,R0lGODlhEgASAOZ/APj2cfTMQc/X0fG8M/nsW9iNJfjSQu8uD/NOGfbhWfXaUfjoVuy3SvnoY/TYZPjoh/blYvblXc5rDu3KSv766PvxvdEHDfnllPnxX+iwZvjlVfuXN/PGO+q2M/758e25Ne29dft2K9WhM/n2YfTIPfPiVvqlPfrmnPTBNfjxa/TEU/rKSvbtcvthJPjMPPftZvzxy/jkU/TRR/jdTPjVevn3ZPnzYPjhVfHVVPfrZPjvaOClMvjpe/jqYtdaRvrrdfnSTvq9RZZVN/jwafrJ1OCfL/jya+7SM2b/zP3L+NSBHj5njvatMPmULb6HMO3SV/bdXvG3L/fdf+qyL/rtoYXqqO7QTPbvYPZyEOKvP/n5ZvfoadU5F/vwaPz02PvvTvrCR/fmavj1cPrxU36wn0mQutNJHfZaIvndU9e7SfjhWb/G9ziGtPvok7i/9fPBQu/ATvfOSfjHSO7BPf8SBP+9AOSUTfvvngNnzPjzbfrgfu3NUPj5c6uCNP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFPAB/ACwAAAAAEgASAEAHyoB/goOEhYR9fgs2NQRAQUFAGDU2CwZ9hn99mpuYmR4VGgQYNjYYBDEGHZeDfScNNyYtBwctJhqoq4d9FG1QBi4omoV9HncERRI7Wlo7yQQzA6t9MD8YGiZnFha1CxgxLrmZcHpzb2BgcTMGIuHDm8KdxBVqGgsLMepR7bsNEyU1AEeUmICLlZ9qNa4UsGKlwJUR3sAJQtSj1IoNIUJsWEGqkjQaDwig2YBAG4INN559yNVHRZsbcjBqXIGKnSFNKHJycLGyXaefgQAAIfkEBQ8AfwAsAwACAA0ADgBAB5WAf4J/Fw4BHAODfzxDNl9NTEdNfA86CSRUOWwPRV5eRQ9lPQqDUgoJEREJCgGKfwk5QykpOj0JMlN/EUYAbnh8fGRrACkRrX9jSQd/XAhELwnHglCoqqyKEC9dYgAAf13QrYxHVULAQlV1liRbvMDvfMTGfzkYGQdYCAdpeTkKHYQgfGFygM4RArdcDSARIAAJgIMCAQAh+QQFDwB/ACwEAAUACgAJAEAHRIB/f0WCf2KEhTlfTE86OYWQkX9OSEuCS0hOf0RZT01HDFhPWUR/Qn5CfHynQoUCraYCgg5EqrabGWE6fwhcZn9JY3+BACH5BAXIAH8ALAIACQAOAAYAQAc2gFIZICx/hoYsIBk0h4YQE5AMe42KBUoOfJl8DhISdoNKPoWNfyw+EiCHdpZKrZ6kjTg4aKSBACH5BAUPAH8ALAIACQAOAAYAQAc9gH5bRgB/hoZ8ACkRh4Y5X0xPOjmNNA9EWU9NRwxYT1lECh0wPA5EjYZEGQkkhzpJCFxmCEljqI0REQmogQAh+QQFDwB/ACwEAAUACgAJAEAHSoB/f12CfyOEhV9MB3RHBIWQkX9HVUKCQlV1fzkYGQdYCAdpeTl/bA9FXl5FD2WFbniCZGuCQzZfTUxHTX8POg1jfwcHXH9EL3+BACH5BAUPAH8ALAMAAgANAA4AQAeRgH+Cf21QBi4og38/GBomZxYWLSYLGDEudwRFEjtaWjucBDODenNvYGBxMwaKfxoEGDY2GAQxBh1/CzY1BEBBQUAYNTYLrH83Ji1/B5MatopqGgsLMauKDRMlNdt/JRPPjDVXBVZWBVcjli49sysbISEbK7LFfwRoGwiRCBs3oh+Ebsh5F2/FM0UoEnJwAXBQIAA7", "kiss", ":*"],
							"(kiss)" : ["data:image/gif;base64,R0lGODlhEwATAOYAAP//////9///7//35v/vxf/vpf/mzv/mpf/mnP/mhP/mjP/etf/erf/enP/ehP/eY//eIf/Wa//eGf/WUv/WSv/WOv/WKf/WMf/WIf/OUv/MZv/OQv/OOv/OKf/Fc//OIf/MM//Fa//FOv/FQv+9e//FKf/FMf+9c//FIf+9a/+9Y//FGf+9Qv+9Ov+9Kf+9Mf+9Gf+9If+1Y/+1Wv+1Uv+1Sv+1Qv+1Mf+1Ov+1Kf+1If+1Gf+tWv+tOv+tMf+tKf+tIf+tGf+lQv+lOv+lKf+lMf+lIf+lGf+cIf+cKf+cGf+ZM/+UEP+UGf+MGf+MEP+EEP97EP8AMzMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBUACwAAAAAEwATAAAH/4BUgoIGJ0IyiEInBoONgjIkCwKTkwskMo5UA0IMBJ6fnwxCA4ObDQeoqAipqA2jgjwhDrO0CQm0syE8VAZLEb8RU8IPwlMPwEuFRRkZExMU0NHQzhlFJ0NEIxsbFd3e3hzbP0NFPy4vLh0W6+wWHSUuLj9F5UZIRjooGFIQUhgoO44IBELPSBMoT47AkMKQIQwlT54oMVKkRxInUaIoaciRScYmRHqkSILEiRMjMThKiXHESRMk1gwUIWIESA51DS2U0AHEyA8fjGb0uOHCBIgLSJGCMBEPxwxBA3rgMAqCg1WrIJbi6EEKqg0cIkRcxSrCho2ujVTYYMEirIgRLBBsqMg0yICHGjbw1vDAqFEgACH5BAUKAFQALAAAAAABAAEAAAcDgFSBACH5BAUKAFQALAAACAASAAcAAAdMgFSCVCaDhoOFhkA6VB9UGFQQjTE6OotUP0ZKRzsokIKQO0ejgkRGTUpBKIcrQUpKRoJFRrSMFoO3OkdGQIY/ObgWtx0lOYyHyMlUgQAh+QQFCgBUACwAAAUAEgAKAAAHRYBUgoMPg4KFhomKi4yNjokdijGOKIpAOigfGBgSElQfKzs7OoZAQDGagxgfMDuXgzk6mB0WtRifKLKDPTcujiW+PY+LgQAh+QQFCgBUACwAAAUAEgAKAAAHQoBUgoNUDw+Fh4SKg1NTVI2LkZKSF5OLJR0dkR8dJYQuMSgfkRgfKJ8loo4YEBCPH6aKJZiPjY0WmSUui5q8vZaTgQAh+QQFCgBUACwFAAUACQAJAAAHMYBUCgICBYQKVFQBiQCJi4pTUwCRjw8DAwmXD4mcnZ6eUx+eGFNUUxaoGBaliZGuiYEAIfkEBQoAVAAsAAAAAAEAAQAABwOAVIEAIfkEBQoAVAAsBQAFAAkACQAAByqAVA+DhA9UVBSHiYiHFY6PFYcWk5QWh5eYmZkfU5lTH1QdU6OjlpKVh4EAIfkEBQoAVAAsAAAFABIACgAAB0aAVIKDVFNThYeEioMUjY6LkJGQHZKLMTEokCgoMYRAQDqZiys7O56fMR9UUqxUHzA7oIQ6oVQWtxgWHyi0OoslkCXAlZWBACH5BAUKAFQALAAABQASAAoAAAdEgFSCg1ODgoWGiYqLjI2OiSWKQI46ikpHOyhUUpxUKztHoYZNSkEonKgrQUpKRoNGsDqaqFQoOkeugj4/P445lT6Pi4EAIfkEBQoAVAAsAAAIABIABwAAB0mAVIJULoOGg4WGSEZUKFRSj407R5SCRk1QT0cwkIKQSk9PSoJJTlFRSp2DUkynTaRITk6MqpBHTk1IhkZAq1KQJTpAjIfFxlSBACH5BAUKAFQALAAAAAABAAEAAAcDgFSBACH5BAkKAFQALAAAAAATABMAAAcdgFSCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmaioEAOw==", "kiss", "*kiss*"],
							"=((" : ["data:image/gif;base64,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", "broken heart"],
							":-O" : ["data:image/gif;base64,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", "surprise", ":O", "*huh*"],
							"X(" : ["data:image/gif;base64,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", "angry"],
							":@" : ["data:image/gif;base64,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", "angry", ":-@"],
							":>" : ["data:image/gif;base64,R0lGODlhEgASANU/AKuCNOrFTMyFPfj5c5lmM8yZM/////j3cffrZPj2cPjxa/TJPvjzbfTMQfbhWfjwaf766P758e+8NPblXvbiWvnllPjpe19bWOq2NPPHPNWhM2YzM/juZ/TNQ/vxvfblXfXZUPPMQfj4cvjvafTRR96/Pvrtofv4T/blZffmavPIPfjya/XaUd68OvjVevbkYO6/Tvfdf/nlnPXYZPfoafzwy/jnhvPDU+qyL/XbUvm+GvbfW/C4Me3QjOrIef///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAA/ACwAAAAAEgASAEAGtMCfcEgsEgGGyeowCDifzgbA+ANYr9RqxBNAPBSKEcJBwk2HAFmKw0gcFnCOQ2q0QiqzUEZiLQIiJggMAQIDAiICDAQBfEIANRYPCQWUApYEiy1njjAxORQTExQsDRqbdVd9WX8eOxQfHw4gITynVRAohAQbCQkCGwR0jgaRCQEXBgLHBosqZ0g0J5QD1NQHAQQlzy42ggci1CIHDAggGJsANxUvXmBiZKaoEiodHRnntln6QQAh+QQFAwA/ACwFAAQACQADAEAGFMCfgLD5CTcEn1HxYxp7gagxGggCACH5BAUFAD8ALAUAAwAJAAIAQAYPwICAsPn9BBvCT8E0MhVBACH5BAUDAD8ALAUAAwAJAAIAQAYRQM+O8vn9QCHeT0DYGAUbQhAAIfkEBQYAPwAsBQAEAAkAAwBABhbAH+Kh+AkdJIZx8BMZfwEBYWMUbAhBACH5BAUDAD8ALAUABAAJAAoAQAYmwJ+AsPkJNwSj8cBUOp0+o+I3fVp7gawxG7B6vQudWLd4LgrlXxAAIfkEBVAAPwAsCAADAAYADABABh7An1CwIRiOBqFyyWz+FCOEcjBAOEjOrLKw4G4LyiAAIfkEBQMAPwAsCAADAAYADABABh/AnxAU4umOOqFyyWz+FoWFUjESbAjOrPLAPSgnFGUQACH5BAn0AT8ALAUABAAJAAoAQAYqwB/iofgJHSSjccFUOp0M4+Anelp/AQFhYxRsCNfwUzQYiA5Rp2KEMAYBADs=", "smug", ":&gt;"],
							"B-)" : ["data:image/gif;base64,R0lGODlhEgASANU/AKuCNOSvOwAAZvLalffrZPnkl+y4NPbhWfTKPvjZfTc3N/TMQsxmC5KSkv///8yZM/XaUVxcXPblXvj2cfLyzPj5c/jxau6+TzNmmaCuzPjzbeTHjvvxveOiO/755tWhM/TRR/758fTHPNqTK/XdVOOqePjvaPjtZvXYZPS+MfblZeqyL/C2Lujhi/j1b/jnhvXdXfjperOZmffmavPDU/z136WlpfntocPDw3Jyqvfdn/ruxdG6j+jq7fvxrf///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFlgA/ACwAAAAAEgASAEAGq8CfcEgsEgEORaTRiAgwy6YiADD+ANis9RriHAiWsIlwAK2qQ0BhxrgMJhOX5nRYoI8ATwG1EKWwRQIjAQiFhocBIwJCAC0xAQ8PARUVkJIHIndXFwkQBxISBxALH5pFWVpbAF0wn6EQCCymAQEqJhoucHJ0tDJCAsDBAgoKwsGMFAHEChi0GMu0aAAJLyTWlJTWBBAGdwA0BQMMHeRjZaVGWCkiC33dplvxQQAh+QQFBQA/ACwFAAsABgADAEAGC0DGb0j8CY2OpDIIACH5BAUyAD8ALAUACwAIAAIAQAYLwB9jSIw8fkjkMQgAIfkEBQEAPwAsAwAIAAYABwBABh7Anw2Hs/1+vs3xONhsBj+ebnlsWJe3krakq+20vyAAIfkEBQEAPwAsAwAGAAsACQBABibAX2BILAIuv6RyGXg8AktlpNGIRJOzx3W7VXi5JIaYEaUVBuJrEAAh+QQFAQA/ACwDAAYACwAJAEAGJsAfYkgs8nS/pHI52GwGS6UNh7NFk77NdbtteLm3krgU1dV24msQACH5BAVkAD8ALAMABgALAAkAQAYmwF9gSCwCLr+kchl4PAJLZaTRiESTs8d1u1V4uSSGmBGlFQbiaxAAIfkEBQEAPwAsBAAGAAwABQBABiJAhHAoLBQGm59yqdwMbgWm0obD2RoD6S+T63a1vXAvVAsCACH5BAUUAD8ALAQABgAMAAUAQAYewIBwSAyMfsgk8hE4iJTISKMRUQSgP4F2i8UovsIgACH5BAUCAD8ALAMABgAGAAkAQAYewB9iOOTpfkjkYLMZJJ8/3wYKbVgzyFtp+9PtdtwgACH5BAUyAD8ALAMABgAGAAkAQAYewF9gOARcfkhk4PEIJJ+/2QMKVVgxSBJj+6MVBtwgACH5BAUFAD8ALAQABgAJAAgAQAYfQIRw+Csaj8jkz8RgdDoMjXKanFSulYn0R7AcDqZiEAAh+QQFvAI/ACwFAAYACQAIAEAGG8CfUIgoIobIpJJxGUwmLqV0SiIhq0JGZ4sMAgA7", "cool", "B-)"],
							"8)" : ["data:image/gif;base64,R0lGODlhEwATAOYAAP//////7//35v/vxd7v///mzubm/+bm5v/mpf/mnM7m///etf/erf/enP/ehLXe///eIf/eGf/WWv/WSv/WKf/WMf/WIf/OOr3O9//OKf/MM//Fc//OIf/Fa//FOv/FQv+9e//FKf/FMf/FIf+9c/+9a/+9Y/+9Qv+9Ov+9Mf+9Kf+9If+1Y/+1Wv+1Sv+1Ur29vf+1Qv+1Ov+1Mf+1Kf+1If+tWv+tOv+tMbW1tf+tKXO9//+lQv+lOv+lKf+lMXu192u19/+ZM1q1/2Ol95mZmTGl/2uU5oyMjDqM7xCU/wCZ/wCZ/wiU/3t7eyF77xl77xB77xBz72ZmZjFj3ilj3iFa3lJSUilC1jMzzDMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBbACwAAAAAEwATAAAH/4BbgoIFJDwsiDwkBYONgiwgCwGTkwsgLI5bAjwMA56fnww8AoObDQioqAmpqA2jgjYdDrO0tbQdNlsFQlq9vr+9Ob1ChT9aWVZRS1FWWlhWUkoAVFo/JD0+x8nLzc9ABAAGSDo9PzopWttRWhTpTzsASB46Pz80NSG/FhAQvgchK2rUo6FixQgOFhJGiJDQgoQRK2j8uIFDRYiDCPdBSMiBA0QcN0pUDBEiQwYKKC20MxlCBY5FN2aQNAmMAssUNxi1kJFChAYNFYIG/SkihIwWggTckOFTw4WnT4nKuEEqaQwZHjxAjeohRoyqjUzEOHEiq4cPJ2KYyDSowAYXMQfgutjAqFEgACH5BAUKAFsALAAAAAABAAEAAAcDgFuBACH5BAUKAFsALAoABQAHAAkAAAchgFuCW1ODg0FWg0lDQUdXg0ZBVyKGToaCF5eaFIYUnIaBACH5BAUKAFsALAkABQAIAAkAAAcdgFuCglqDhlGGW1JNUVaFgotRj4aThhyJmJkUmYEAIfkEBQoAWwAsAAAAAAEAAQAABwOAW4EAIfkEBQoAWwAsCQAFAAgACQAABx+AW4KCU4OGQYZbSUNBR1eDUEZBj4lOiYIXl5qJWpqBACH5BAUKAFsALAoABQAHAAkAAAcfgFuCW0WDgwpVg0QPChhOg0MKj4YwhoITlpmWWlqWgQAh+QQFCgBbACwMAAUABQAIAAAHHIBbWzmCggCCQAQABkhbOwBIHoIHhVsSlYValYEAIfkEBQoAWwAsAAAAAAEAAQAABwOAW4EAIfkEBQoAWwAsAAAAAAEAAQAABwOAW4EAIfkEBQoAWwAsAAAAAAEAAQAABwOAW4EAIfkEBQoAWwAsAAAAAAEAAQAABwOAW4EAIfkECQoAWwAsAAAAABMAEwAABx2AW4KDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqKgQA7", "cool", "8-)"],
							":-S" : ["data:image/gif;base64,R0lGODlhEgASANU/AKuCNOrFTPfoYfj5c/S+McyZM/j2cfjxa/blXfTMQfXaUcyFPdXV0/v7+/////TIPPjvaP766PjwafbhWffrZP758fj4cvnllPvxveq2NPTRR/jtZuGsM8aRMvbiWtWhMz5njvjya9qTK/jpe8xmMwEBAbKysvr6Yvjzbffdf/frY/r0XPPLQPj1cPbhWvfmavbkYPC7NPzwy+6/TvfoaeqyL/nlnPC2LvrtofXYZPPDU/jnhvPMQfjVevv7WP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFPAA/ACwAAAAAEgASAEAGtsCfcEgsEgGOQEjAbDJXgQTA+ANYr9RqBbMISA4HSGChqU2HANtLTAoYWqjNRGq0Ri453oNgLQIqOAENICYnPiYgDQEKMWcAMiMSBhYDAwUkBQEQEw9nQgAzKQoeCAgeCgkfnnVXfVl/GAEipSIBLDerVRGCJQwGBgwlinSfDiNdAcnKY5yODjQhBpXTAwYHCMQAPTsUAQUWBd8nBSoKGZ4AOhcwFF9hFC4aqqwxHB0dHOe5WfxBACH5BAUDAD8ALAUABQAHAAIAQAYNwBLD8WMIQSaiCcQIAgAh+QQFLQA/ACwGAAUABwACAEAGDUDH71diOByMIcgkDAIAIfkEBQMAPwAsBgAFAAcAAgBABg1Axu/HKDEapqEJJAwCACH5BAUDAD8ALAUABQAHAAIAQAYOwEaJ8TMwSg2Q6eczgYIAIfkEBQMAPwAsBgAFAAcAAgBABgxARun3awhNIGIDGQQAIfkEBS0APwAsBgAFAAYAAgBABgxAB6P0+zkcJlDREQQAIfkEBQMAPwAsBgAFAAYAAgBABgxARsnw+zFMoFPRFAQAIfkEBSgAPwAsBgAFAAcAAgBABg7AEuP3Y5QaIBPRBGoEAQAh+QQFCQA/ACwFAAoACAADAEAGEMCf8BcQFoaFoxD18/mIxCAAIfkEBQkAPwAsBQAKAAgAAwBABhLAnzBQ+AUgQqMhGfhZCoHnLwgAIfkEBQkAPwAsCAAKAAUAAgBABgrAwe9XCBB/p0IQACH5BAUJAD8ALAUACgAIAAMAQAYQwJ/wFxAWhoWjEPXz+YjEIAAh+QQFCQA/ACwFAAoACAADAEAGEsCfMFD4BSBCoyEZ+FkKgecvCAAh+QQFCQA/ACwIAAoABQACAEAGCsDB71cIEH+nQhAAIfkEBQkAPwAsBQAKAAgAAwBABhDAn/AXEBaGhaMQ9fP5iMQgACH5BAUJAD8ALAUACgAIAAMAQAYSwJ8wUPgFIEKjIRn4WQqB5y8IACH5BAUJAD8ALAgACgAFAAIAQAYKwMHvVwgQf6dCEAAh+QQFCQA/ACwFAAoACAADAEAGEMCf8BcQFoaFoxD18/mIxCAAIfkEBQkAPwAsBQAKAAgAAwBABhLAnzBQ+AUgQqMhGfhZCoHnLwgAIfkEBQkAPwAsCAAKAAUAAgBABgrAwe9XCBB/p0IQACH5BAUJAD8ALAUACgAIAAMAQAYQwJ/wFxAWhoWjEPXz+YjEIAAh+QQFCQA/ACwFAAoACAADAEAGEsCfMFD4BSBCoyEZ+FkKgecvCAA7", "worried"],
							"(worried)" : ["data:image/gif;base64,R0lGODlhEwATAOYAAP//////9///7//35v/vxf/ve//mzv/mpf/mnP/etf/erf/enP/ehP/ee//eY//eWv/eIf/Wa//eGf/WUv/WSv/WOv/WKf/WMf/WIf/MZv/OUv/OQv/OOv/OKf/Fc//MM//OIf/Fa//FQv/FOv/FMf+9e//FKf+9c//FIf+9a/+9Y/+9Qv+9Ov+9Mf+9Kf+9If+1Y/+1Wv+1Sv+1Uv+1Qv+1Ov+1Mf+1If+1Kf+tWv+tOv+tMf+tKf+lQv+lOv+lMf+lKf+ZM5lmMzMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBEACwAAAAAEwATAAAH/4BEgoIGJz0wiD0nBoONgjAlCQKTkwklMI5EAz0KBJ6fnwo9A4ObCweoQkIIqqgHC6OCOSEMtUK1uLe1ITlEBkERwREOxMXEwkGFPxoaExMNAwMI0Q0Uzho/Jz5AIhsbFQFDQwDiARUc3jw+PzwtHx8XAuLkQwIWHR8mPD8/ODcmHTo8iFYg2gMQHUy8uMEPh4sXKEBgmChBwkQMIFC8wPFDxw4XJiJKxAABwkQQGV/s0JHiowmAHSzIxCAzoAkXOxbpsPEy4BCZ4u4lbKGDUYwaLUi8uyDuAtMPJEjUiCFogI4aSj9w2Lr1nVQdpKrSqDFiBNeuI2jQCNtIBY0VKxZEjBAhYgUNFZkGGfAgg0ZfGR4YNQoEACH5BAUKAEQALAAAAAABAAEAAAcDgESBACH5BAUKAEQALAAAAAABAAEAAAcDgESBACH5BAUKAEQALAAAAAABAAEAAAcDgESBACH5BAUKAEQALAAAAAABAAEAAAcDgESBACH5BAUKAEQALAAAAAABAAEAAAcDgESBACH5BAUKAEQALAUAAgAJAA0AAAcogESCQkSEgocHRImHjIyGjY+NkpOUlZaUQ4JDmYcXmxeehxyjox9EgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwFAAIACQANAAAHKYAEgoODRIZCRIiGi4yGEY2GDpCTlJWWl40WmhgWjEOaQ5+LF6EXpESBACH5BAUKAEQALAAAAAABAAEAAAcDgESBACH5BAkKAEQALAAAAAATABMAAAcdgESCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmaioEAOw==", "worried"],
							"(mm)" : ["data:image/gif;base64,R0lGODlhEwATAPd/AP/aHv+pK//on//LJ//SUf/pzf/RLv+0Jf/EMv/GJf/ehv/wx//KMv+8cf/aZf/npv/oo/+4O/+0ZP/NNf/WIv+5Jf+xK//RMv/NIf/IJv/hgP/LOf/66v/VJv/KQf/dY//UIP/QIv/VTv+iMv7GPv+6Lv/Xav/PKv/TJf/OVf+mPv/OMv/QN/+kQf/05f/IN//z5v/KIf/CLf/CKf+/Jf/YIP/RH//PJf/QPf+4Rv/ML//ZSv/Sav/UMv/NOv/88/+9If/ZKf+jL//grf/Ecv/bG/+/ZP/BQP+zN//hef+qPf+uMv+lMv/WK//kjP/87//65P+sNv+2Qv+7Qv/ftf+2SP/gof+/ev/COf+vPP/YJf+eMv+iPv+vJ//HLP/npP++Lf/ggv/KP//PP//EaP/AIv/BJf/EIv/KKv/ILv/EKf/ZaP/DH/+7KP+/bv/DaP/Ab//fhP+xQP/vyf/igP+/MP+wWP+3WP/UOv///v/TLP/gX//phf/YNzMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgB/ACwAAAAAEwATAAAI/wD/CBRYoAEXCQi5NCgwsKFACVeoPJk4kcoVCQ7/wGgxZM6CjyA/DmkBY+BGKw8efIEAQQBLCF8eWFFR8o+dNwoUxAmjoSednmHiKCBj50+BLTxMmFjjhAMHCE6dOFhjgseWgkJSECAg4ocfP3m+/hCxNYWQBioCePCAA4dXsGLx4BgjJoCKEV3AMNBh4AMUKHz+7tFjQMeMLiPwVkgw4AYKCjUAAKhBIcSNDEAOjGBioUKZGCFAUABQpAgAEDYwsMnMRImFNmYSYAgBWXIN1DHO0LCgxM2SNjMyDPDTQYvxDn5uDEhAYwmcAlFKyPDC96t1PSfQqCkRheEdJHUQME5YcaGH+R4XdKSRgeSOQBdZIiB4MYGFffsTGCCIkMXFQBdyRIDFCxv4YOAGL2ARgRz+OWSEFFMcQcKER0whhREZDVQAEVXk4GEVRDDUUEAAIfkEBQoAfwAsBgAFAAcACQAACB4AHTj4QPCDgyQcOAhImOSPw4cQI0qcSDEiCol+AgIAIfkEBQoAfwAsBQAGAAgACAAACCQA/4jYQbDgHz9//vRJiFBPkyAQgzRJSLGixYsV/aDAiLCinoAAIfkEBWQAfwAsBAAHAAoABwAACBgA//j5Q7CgQIMIEypcyFDgAIYDDTYhGBAAIfkEBQoAfwAsBAAHAAoABwAACBoA/+D4Q7DgHzwGEypcyLDhnwx+GupIGPFPQAAh+QQFCgB/ACwFAAYACAAIAAAIJwD/JOHAQQDBJH9+/PmTZ6HCD1Cg8Im4Z6HFixgzXhzgR6MBjH4CAgAh+QQFCgB/ACwGAAUABwAJAAAIHgCdcOAAYaCTH3785En444/DhxAjSpxIMaIfiXoCAgA7", "Mmm..."],
							"#:-S" : ["data:image/gif;base64,R0lGODlhIgASANU/AKuCNP///7e0U/bhWvjya2ZmM/XaUceNOOq2NPXIPPnll/TMQvj2cMDAwPy2ts1mDPj5c/zwy/faferFTPfrZPblYPnYZfC8M21zUv/MzIZvMP758f765uWPVvjuZ9WhM/vxvfjvafTRRz5njmYzM8zM/+6/Tvrtofjpe/fmaru7pP+9APPDU+SvOwAAAPv1TMzMM/fiSatTB5SUeayskfn5auqyL/C2LvjpUISCAN/f37WnQDZafIlbNG6Nqv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFZAA/ACwAAAAAIgASAEAGvMCfcEgsGo9HQAAVYgRcgWeAERokAMgsEQC4JBaLBIKrLQsBG9BgUKkMDIsb1pxMOCgEBmQPYRAoDmN0WlyFc4NIABwVHgcPDwyPLQMLh4g/Sh15Dg4TE5x+HZWXQwAsChUUIQQEIRQDIh+WpLSkXBwKFmEXZLVnaQOqrK6wNrODaCcUB1HNAQ8UBry0ShV5ASNR2X4Vo7YWoHx8DJxXtQAKKR4yj48dHpTHiAAmEgYDCAhvC7K+RYa9fAUBACH5BAkKAD8ALAUABAAQAAoAQAY5wJ9wSBwWCsWkMIBUJgsBZuDHYAQYhMcw2mA6iTCv8KElE4/MRqvxcwxbRG5hkqRvoc3vr5v/HodBACH5BAkKAD8ALAAAAAAiABIAQAaSwJ9wSCwaj8ghIzAKMAOM0CABKCSv2KwWNBhUKgVnGNYIWLVGAmMik00YBIoDAUBnC+Gy+WwvBg4MSwwFOXgNMGZ9RAwODhMTjXAdC3WKlpdGDQWafJhFYWFmYp4DFA8PBBpmZaGdfS0BJU6yLRQGFwAwrnYTAXplEwQVlJ4/DBDIyYwOVMUeHqenzwPExdbXfUEAIfkECQoAPwAsAAAAACIAEgBABtPAn3BILBqPR0AAZWAEGoFngBEaJADILBEAuCQWiwSCqy0LARvQoBBtFN7RQMFcBEgcFMIKQiLVVgQUDmN0Wlw9cHEBM4V1HBUGD28MDARvLm+NQ0odBAwZGRMToJUdC1iaZywKFRQZBAQZLwMiH6ipWm8YM3O4mwAcCmyKcb2aaGrDOTlQblHGhWgnFBMBI1EjHBMvMRe3jUoVnsRTBBWnuAARDg4MEBMQ7xAM7Fe+AAopHhMMDw8MEzwMQOfrBwATEgzgOHBggIEFtgrW4UJR4o8gACH5BAkKAD8ALAAAAAAiABIAQAbOwJ9w+CsYj0aicqkEBFAGRqARmAYEgkECwOwuAYBLYrFIIMDeNBEwQxamDVhAVVAzARIHhbCCkEg1KwQUDmd2XjRuVlUBdYdNHBVtR4x0Go9NAR0EDBkZExOeDAQdC1yYQwAsChUUGQQEGS8DIh+nqEtvjLuOuEO6uw3CVb2oABsgwHBVdDS+xycUEwE+OolHOxe3mE4VnLtVoxWmzxEODgwQExDqEAznW74/AAopHhMMDw8MEx4D5PLmmZBgAMeBAwMMLLAVsAmYhw1/BAEAIfkECQoAPwAsAAAAACIAEgBABs3An3BYKBqLw6RyOQQEUAZGoBGYqgShQQLA7C4BgEtisUggwN50cnYsTBuwgKqg7gIkDgphBSGRaisEFA5ndV00bVNVVXSGXxxsRotzO1yOSU4dBAwZGRMTnQwEHQuWl0IALAoVFBkEBBkvAyIfpqdJbou6jbdEulUNwYy9qBu5wFRyBRrEABsnFBMBPIhGAgYXto5OFZu/AaIVpb0AEQ4ODBATEOoQDOdbzQopHhMMDw8MEx4D48Q/AExIMIDjwIEBBhbU+qcEjENtt4IAACH5BAkeAD8ALAAAAAAiABIAQAbKwJ9QWCgai8OkcpkEBFAGRqARCMxUjNAgAWB6lwDAJbFYJBDhr3o4OxamDVhAVVh/ARIHhbCCkEg1KwQUDmh2TDRuU1VVdYdMAG1GjHQ7C12PTQEdBAwZGRMTnwwEHZeZTSwKFRQZBAQZLwMiH5ioSW+Muo63Q7m6DcGNvUMAv3BVdGm9ABsnFBI6GEc7LwYXtplOFZ26VaQVp7cAEQ4ODBATEOkQDOZcxAAKKR4TDA8PDBMeA+LxJhIM4DhwYICBBbWIgQnDUKGQIAAh+QQJGQA/ACwAAAAAIgASAEAGzcCfcFgoGovDpHI5BARQBkagEZiqBKFBAsDsLgGAS2KxSCDA3nRydixMG7CAqqDuAiQOCmEFIZFqKwQUDmd1XTRtU1VVdIZfHGxGi3M7XI5JTh0EDBkZExOdDAQdC5aXQgAsChUUGQQEGS8DIh+mp0lui7qNt0S6VQ3BjL2oG7nAVHIFGsQAGycUEwE8iEYCBhe2jk4Vm78BohWlvQARDg4MEBMQ6hAM51vNCikeEwwPDwwTHgPjxD8ATEgwgOPAgQEGFtT6pwSMQ223ggAAIfkECRkAPwAsAAAAACIAEgBABs7An3D4KxiPRqJyqQQEUAZGoBGYBgSCQQLA7C4BgEtisUggwN40ETBDFqYNWEBVUDMBEgeFsIKQSDUrBBQOZ3ZeNG5WVQF1h00cFW1HjHQaj00BHQQMGRkTE54MBB0LXJhDACwKFRQZBAQZLwMiH6eoS2+Mu464Q7q7DcJVvagAGyDAcFV0NL7HJxQTAT46iUc7F7eYThWcu1WjFabPEQ4ODBATEOoQDOdbvj8ACikeEwwPDwwTHgPk8uaZkGAAx4EDAwwssBWwCZiHDX8EAQAh+QQJEAA/ACwAAAAAIgASAEAG08CfcEgsGo9HQABlYAQagWeAERokAMgsEQC4JBaLBIKrLQsBG9CgEG0U3tFAwVwESBwUwgpCItVWBBQOY3RaXD1wcQEzhXUcFQYPbwwMBG8ub41DSh0EDBkZExOglR0LWJpnLAoVFBkEBBkvAyIfqKlabxgzc7ibABwKbIpxvZpoasM5OVBuUcaFaCcUEwEjUSMcEy8xF7eNShWexFMEFae4ABEODgwQExDvEAzsV74ACikeEwwPDwwTPAxA5+sHABMSDOA4cGCAgQW2CtbhQlHijyAAIfkECRAAPwAsAAAAACIAEgBABtrAn3BILBqPR0AAZWAEGoFngBEaJAAFpHYIAFwSi0UC0d2ahYANaDCoVApROAyaPXMlDgphBSGRaisEFA5kdltdWHBQAQV1hlwcFQYPDJUMBTmNDTCMjz9KHQQMGRkTE6QMBB0LAJ5cLAoVFBkEBBkvAyIfra5bDQW/jr1oABwKFnBwjHG9aWuTDwQajHTMj2knFBMBI1EjHBMvBhcAMMJnShWiUexTBBWszREODgwQExD3EAz0V8MAClJ4mMDgASUDHgbEG/bJhAQDOA4cGGBgwS6GRRAhwvgjCAAh+QQJEAA/ACwAAAAAIgASAEAG7MCfcEgsGo9HQABlYAQagWeAERokAD9SNFBAJgGXxGKRQACw3vQQsAENBpXKwLC4ARp4fLSrBkgcFAQrECQkNSsEFA5mao1nj2gFkpOSjUIAHBUGDwydDAQHOAtoWnuOAR0EDBkZExOsnx2jQpIzlj8ALAoVFBkEBBkvAyIfaLfHyF5nHAoWZBcABXjSDdJclmxumw8EDw8GIjYAhVvXfRsnFBMBI1EjHBMvBtBZW3xpShWq5VGfFbOlzOGL4MABAwgTICCEwKDglWSXFKTwMIGBNwYTPAyYBfGSCQkGcBw4MGdBsY5GIJ1BKSQIACH5BAkAAD8ALAAAAAAiABIAQAb1wJ9wSCwajZlGowgIoEKMwCggDTBCgwRAWAh0vUcjAHBJLBYJxDjMFm9Ag0GlMjAsbltit+EFHwEJDhQEDBMyMhMMBBQOalwBDSUFbWJjlmwNXZMlbAAcFQEHDFGKDwMLeUNKfJNhTR2EDg4TE7KKHahCmVSSlAAsChUUIQQEIRQDIh+plM3OXKoZnH+eChZoF2tFmpCtrm8DFA8PBOPJNsw/BbvebicULQElvAEtFAbZugUF8+1iARUITIBEhc8EAhVyqdvlx5UFWxAiSmQgS8sjSJl8KUjhwcO4cR1PMdvnr5MJCQYGIEBQZ8GyZ74saYNZJAgAIfkECQAAPwAsAAAAACIAEgBABvnAn3BILBqPw0am9AMEUCFGYBSYBhihQQIgLAS8X2QRALgkFosEgixuEwEb0GBQqQwMixuX6G18w0cACQ4UBAwTMjITDAQUDmtdAQ0lBW5jZJhiDV6VbQAcFQEHDFKMDwMLe0kNfp2BAR2GDg4TE7OMHalCm1WUbgAsChUUIQQEIRQDIh+qls7OrkNMRmQcChZpF2xFnJLR1HEDFA8PBOTKNs0/BbzfbxsnFC0BJb0BLRQG2rsFBfXubwJUIDBBUhU/EwhU0LWOFyAkACzcgkCxIoNZWyJJ2vRLQQoPHsiRA4mqWT+AgUxIMDAAAYI7C5g9+4Vp28wiQQAAIfkECQoAPwAsAAAAACIAEgBABvDAn3BILBqPR0AAFWIEXIFngBEaJAC/QkC7RRoBgEtisUggwN40EbABDQaVysCwuGGH2sa2iwQkHBQEDBCEEAwEFA5nWQENJQVqX2CTSA1akGoAHBUBBwxOhw8DC3dCDad8fQEdgg4OExOuhx2kP5ZRj5EALAoVFCEEBCEUAyIfpZHJkZjJYBwKFmUXaESXjcx9bQMUDw8E3cU2yAW32F8bJxQteg5RAS0UBtO2BQUlqaoVBBMBI1H+EwhUqEWOi7kvFmQVKsTA1RVGjSzpUpDCg4xu3Tp4GFWq3kEvAExIMDAAAYI5C44pyzSJ2soiQQAAIfkECQoAPwAsAAAAACIAEgBABuvAn3BILBqPR0AAFWIEXIFngBEaJACFQFaLTAIuicUigQAAumgiYAMaDCqVgWFxOwuzDS23C0g4KAQMEIMQDAQUDmV4JQVpXmZmRw1ZjY4AHBUBBwxOhg8DC3Y/DaR7fAEdgQ4OExOrhh2hk1GMjj8ALAoVFCEEBCEUAyIforbGXZXGZhwKFmMXkUOUAZOWbAMUDw8E2sI2ogWzyUhrJxQteQ5RAS0UBtCTBSWmpxUEEwEjUfoTBBWh4baMI2fhFSFCDFZd2UJqIDkFKTzI0KatgwdQdgpoPHbLhAQDAxAgkLOAGEc+kKKdHBIEACH5BAkKAD8ALAAAAAAiABIAQAbZwJ9wSCwaj0dAABViBFyBZ4ARGiQAhWgByQUALonFIoHwcs9EwAY0GFQqA8PiBhgWtughIOGgEBgQgRAMBBQOZQF4eUlejYtoABwVAQcMToQPAwtKAQ2Jj0odfw4OExOkhB2bMJ+PPwAsChUUIQQEIRQDIh91rr6/jBwKFmMXZsB6awMUDw8Ezbo2WFkFDaAbJxQtng5RAS0UBsZRDYqQARUEEwEjUe0TBBWbia15ABaogoIMpFee5vYUpPAgo1mzDh40TUMGwIQEAwMQIIizgBcyI40cXfwRBAAh+QQFLAE/ACwAAAAAIgASAEAGvMCfcEgsGo9HQAAVYgRcgWeAERokAMgsEQC4JBaLBIKrLQsBG9BgUKkMDIsb1pxMOCgEBmQPYRAoDmN0WlyFc4NIABwVHgcPDwyPLQMLh4g/Sh15Dg4TE5x+HZWXQwAsChUUIQQEIRQDIh+WpLSkXBwKFmEXZLVnaQOqrK6wNrODaCcUB1HNAQ8UBry0ShV5ASNR2X4Vo7YWoHx8DJxXtQAKKR4yj48dHpTHiAAmEgYDCAhvC7K+RYa9fAUBADs=", "whew!", "#:-s"],
							":((" : ["data:image/gif;base64,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", "crying", ":-((", ":'(", ":'-("],
							";(" : ["data:image/gif;base64,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", "crying", ";("],
							":))" : ["data:image/gif;base64,R0lGODlhEgASANU/AItjMkorEMxmC/v7+5kAAGZmZv+ZmcyFPf8AAMd9ffv5UvS+MfbhWffrZP755//MzPj5c/TNQz5njvj2cf9mZvPHPOq2NMdtbc5mDfXIPMzKM9WhMwAAAP758fblXfXZUO+8NPvwvcnZZOSvO+rFTPjzbPPMQfjVevXYZOzZbO6/Tn+/APPDU/jkk4JXMpnMM/j1b9fSTfTMQPjxavzwy/PLQPXdXeqyL/C2Lvv2TfjvaPnvUvjpe/////rtof///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCQA/ACwAAAAAEgASAEAGqcCfcEgsEgEGw+EgaDqXSZfxB6hap9ROiNGYeXUNRuQGOGoIAQIBgVCnNeVi1dFCmSqLqrzja5QmEIEQEyUNHyBxSAIBBY2OjQECBnFCACopK05NLxuURlZXWABaNgweHgwfNTieVA4kGBIcAwOyGCMylAA9PAq+goEwOgwZcRcGBAK0y8sCBAYXlSeLAdXW1gIWuiwiawMPFBRtGp2fACAVEREV2q1Y70EAIfkEBQkAPwAsAQAEABAACQBABk7An5CEkXAGAyNmJGzGmtDoL/ETBArYLDYgmP4MhsNBQC6Lwa4fTRhou9vCDHSXU8AmE1ipwWgmDAQCSIODAgQGVA9Wb4wCD00HUlCRP0EAIfkEBQkAPwAsAwADAAwABgBABiZAAAkj4QwGRcwIIAg4n1ABQXCsVqWGw0HA7WoNzYJ4LA5woWhzEAAh+QQFCQA/ACwDAAMADAAGAEAGNMBfJ2RjeDyMTw33IwgG0ChUQHDscgrYZAIrNRiyDgkj4UDLmNHNcDgI3vC24fcr2O92ehAAOw==", "laughing", ":-))"],
							":|" : ["data:image/gif;base64,R0lGODlhEgASANU/AItjMvj3cfj5c/jZff///0RsjfTMQuKsO/jzbfTIPPjxatBrFfS+MfXaUfbhWfblY/frZPblXfjvaNXdePjtZv758fbiWv766Pj4cvj2cPj2ceDaaPnllPfqY/vxveq2NPTRR5lmZtWhMwAAAPftZvj1b/j1cOu/affmavfoafjofvbiWfbhWvnlnPPMQe6/TvC2LuqyL/zwy/PLQPXYZPPDU/C7NPXdXfDWWPrtoY2pwtXVb+SxPsqdROvBYf///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQF9AE/ACwAAAAAEgASAEAGsMCfcEgsEgGEiCIgaDo1BIIBYPwBrtiqteKxbDYKxa7jAMWoQ0ALJUHgDgcTguKYGq8XDs2VYFyLABU5EBkbBRMThwgdDTZoADI+ByELlZYhPA4JaEIALwMNFlEWDQYinHdYf1qBHjcrEREODTMwqFYXD4UjiLwkDi6cSCoKGRg6TToYJVGbnQQpAdLT1BF2VgMnbQjc3XMNH8I1HA8QEucSECwgp6k2CQYGCeG3WvZBACH5BAUKAD8ALAMABwAJAAYAQAYWwJ/wJxAWh79MIGBCOp/IExQJGUogQQAh+QQFCgA/ACwDAAQACwAKAEAGI8CfEKIQSoTIpHLJRGgwAgFGw6ySej8NFVvtLlWQahipKCeDACH5BAUKAD8ALAYABQAGAAEAQAYHQITp9yshggAh+QQFCgA/ACwDAAQACwAKAEAGK8CfcLMR7oTIHwJpWiafz8ymMJlQhT4oVDqqdqE6YVgLPUmEiLSTkpS4k0EAOw==", "straight face", ":-|"],
							"/:)" : ["data:image/gif;base64,R0lGODlhEgASANU/AItjMvv7+///////merFTPTIPPjxavj4csyFPfS+Mc5mDfj2cfblXvfrZPXaUfjzbfbhWezFUfXMQf766PbiWv758fTNQ+q2NPnllPvxvdWhM/juZ/jpez5njnNzc2YzM/TRR/fqY8yZmfjvaffuZ/v7U/biWfjVevnlnPjnhvPLQP39j/zwy/C7NPblZfbkYPPDU/fmavfdf/foaeqyL/XdXfC2LvrtofbhWvXYZO6/TvPMQfbhYf7+lPn6a////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFtAA/ACwAAAAAEgASAEAGtMCfcEgsEgECBiLw8QQIgY6TIAEYf4Cs9oqtZCiNkcEwCkFANOsQgIptIiKFIvLYQKrG7AST2xUSWUUAFTcXCAgKCD48cggXLWoALBwDlZUHK5YDBWpCADoyDhQMDBQOEhqdeVqBXIMZNSakEA4qNqpYEy4kDwu+Cw8kd51IHAgCHx8CBMjKCJyeAjNQAdXW1VSRJykNDxElB+HADQ4XxDAYL2FjIw04IKmrLQUWFgXmuFz6QQAh+QQFFgA/ACwEAAUACwAIAEAGI8CfcMhTKBDDpFKEMIqUUGjjsTgcfoKsAPlDdKLCHlgZUQYBACH5BAWQAT8ALAQABAALAAkAQAYiwJ9wyFMoCEORIvJbDJ/QqHRK/UGuPwJiqBB6PNmqkDkNAgAh+QQFAQA/ACwFAAYACAADAEAGFMCf8EcYIjqBw6/jESiEiJ/nJwgCACH5BAV4AD8ALAQABAAIAAUAQAYYwJ9wSBB2Dj9Bx4McOp/Fn+KHQBA8v0MQACH5BAUBAD8ALAQABAAIAAUAQAYYwJ9wyBMiOr8DoeMZOp+/hfGnUCAIP08QACH5BAXIAD8ALAUABgAIAAMAQAYUwJ/w5xsGEJ3AL9DxIISKn+DnCQIAIfkEBQEAPwAsBAAEAAsACQBABiPAn3A4CkFAw4hI8YsMn9CodEr98RRMiWi4/X0+P0RV+KAGAQAh+QQF9AE/ACwEAAUACwAIAEAGI8CfcLh4kCDDpBIh+HwEymj0gkAoED+e4noRfjxS4SCsVCiDADs=", "raised eyebrow", "/:-)"],
							"=))" : ["data:image/gif;base64,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", "rolling on the floor"],
							"O:-)" : ["data:image/gif;base64,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", "angel", "O:)"],
							"(angel)" : ["data:image/gif;base64,R0lGODlhEwATAPfOAP///zMzM5lmM//44f/04v/z4//64//iiOO3A//crv/UHf///v/DMv+/aP/Hff7THP/88v/89P/fqv/drf/Lav/ssf/ss//JK//ktP/Eav/jjP/PJf+4Kf/DKv/bh//IH/+5JP+5Jv/GLv/XGv/FK/+5PP+9Kv/rtf/JIv+7Jf/Va//cXP/aXf+qLP/eq//HKv/LOP/QIP7FL/+/Of+0KP/MH//Xaf/CMv/DLf/JO/7IL//QTf/MIv/AI//rtP7NIf+yJ//chv/OJP+7K//HIf/Fd//PH/+0K/+8MP+zNP/MJv++Mf/GeP/jtP+/J//RTP/NKP/jjf/hi//QI/7RHv/RJP7HL/+/Lv+7Pf/ih//MOf+8J/+/If/YaP/ALP/OT//EI//EUf+7R//pgf/PNf/sp/+yKv/gqf++RP+9Nv/rs/+0Lv+8M/++Uf7ILv/ZZ//EMuO3Av/EJv+2Jf+wJ//RHf/FJv+uN/+3Iv+/Kf/AM//BL//55P/XG//CJf/gjP/TS/+5Lv/CKf+8Wf/CaOjEMv/HZv/EZv+8Of+2NP/Gd//CTuzNUf/AP//z5P/76//EaP/BU/+/QOrJQfPfkP/hif/Ba/+xOP+8WuO2AOe/IPz24OrIQO/Vbe7SYf/77P/67P367/378PTkn//HJ/+xOf/Kaue/If/04/z34/367PDXdPv23+jCK/fqtP/ssuS3Bf+9Of/Laf/druW8FPz24fjsvP/fqf+7WuS4B/+/P+jEMf/BVP/Bav/DaPnuxO7SYv+1NP/EZ//Gdvjtv/++P//Caea9Ge7TZv/BTv/HZ//+/f+8WO7RYP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFFADOACwAAAAAEwATAAAI7wCdCRxIsKDBgwgTKlzIkGACBw2YNHCQQGGBIk0GaNSIQVGBgwUInVBjoYLJVxZ8HPpYEJOHPwJiZokpQEqQQQUniFHRJQqoR2UefdLwxgaaCQQtYfnyJEKAAAueRgC0YwYkgnfM5NAC4WnUABDIwJiThGALIHkusOBjYIwBAyugyMFDh+AlGinA8IihoM8IBUY+cAGRiGCGI1v8oPhB5cGDOjWI9AhhiKCLNUMEBVCyocoUIQHsOOEgoWCbQF5IPF39ooOJRQYJlECyR4YVHW5E4LiCiMBBApHY6GEAh8GNJWF8J5RAQVKaRhTOGAwIACH5BAUKAM4ALAcABgAFAAIAAAgNAAUIcCaw0gFnBw4EBAAh+QQFCgDOACwGAAEABwAKAAAIHwBHccpEkNMoZwgTKlzIsKHDhgECOIv4EAAAZxadBQQAIfkEBQoAzgAsBQAAAAkADwAACC8AWXkqhKBgoWabNB3r9KsWMWS0Tm0CRtCgp03OMmrcyLGjx48gQ4ocSRIkKY8BAQAh+QQFyADOACwCAAAADwATAAAIawCdhaLEaBICZwgRTGJEKRRCTbl2rXKVCqGtTq1gaUIoiuCkOCBBLqQkCqHJkyhTqkzpaOWwlggdGVvpTBhMXDQRMnM2K+fJXj4R+gpKFGUposGKKiua8oLKZAhR5YyFkhfTW6aKOdMlC2VAADs=", "angel", "(angel)"],
							":-B" : ["data:image/gif;base64,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", "nerd"],
							"8-|" : ["data:image/gif;base64,R0lGODlhEwATAPcAAP/////87//05f/05v/z5//z5v/wyP/wx//xx//vyf/pzf/ozv/ozf/npf/oo//npP/no//oof/oov/npv/mp//gof/grP/grf/ftf/igP/hgP/hgf/fg//fhP/ggf/ggv/ehf/ehv/dh//dY//cY//Xav/Wa//bHv7bHv7bG//bG//aH//aHv/ZKP/YN//ZHf/YJf/YIP7ZHv/XLP/Rav/Saf7ZIP/WLP/XJv/XH//WLf/WIP/VK//WIf/ULf/WJf/UJv/PVP/VH//UH//SK//TJf/TIf/RN//NVv/RJ//RIv/QN//QNv/QMf/RLP/SH//PN//NOv/QH//PKv/OMv/MNv/PIv/PJf/NNP/MOv/ML//NIv/MKP/MLf/LOf/Ecf/KM//MIP/Ecv/KMf/INf/IOf/DaP/EaP/JN//KKv/KJv/KIP/JIv/ILv7HPf/IJf/HJP/FPv/Ab//HJ//HLP7FPv+/ev+/bv/EM//FMP+/ZP/EKf/FJ/+/Y//FJf+9cP/COf/BQP/CNP/AQP/EIv/DLf+7cv/DH//BKv/CKP/BLP+/MP/BJf+/Jv++Lf/AIv++JP+7Qv+7Lf+9If+3V/+5Rv+3WP+1Y/+4Pf+8IP+7J/+7Kf+4Rf+4Rv+0Zf+2Qv+4Of+5Jf+2SP+4L/+4JP+2Ov+zN/+wWP+wV/+0Jv+0JP+xP/+yN/+wQP+xKf+vPP+xLP+wLf+wJ/+uMv+vJv+tMv+sNv+tKP+qPP+qPf+pKv+mPf+oK/+kQP+lP/+kQv+kMv+lMv+iPv+jLv+jMv+iL/+hMv+eMplmMzMzMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAAACwAAAAAEwATAAAI/wABCBS4wJAwTwiFGVowsKHAS3YwBJg4EYOdSw4BFPh1IcGBAwhCfjRg4VeBgQV6VaCArKWDCBJaIptQwRcBgafMiADBwcMGDRoyaNjwoUOIM6gAMDhGw0Syp8lIjBgBNVmJGscY/CmGJBnFAFC/Jgsy7M8uXk8nek3mYq3aZLp2Gbu1yCvFZDPsqkVEyxgxWaT2VG2B4kTVNplUEQPmKhQjNlOA9JCRQoWNH0W2HJqUKhiuWJoYwdmipEeMFSxyDJGyhhAkWLnu1NqUaA6XJEBwwICB+YoaP41myVFga5QiOl2c+NAx4wYPIlPS7JFkSwEAS6wW5RlDpWqyJlraFEkyRUnggFelBJGpAmXJkSNMsIDBA+qVgIECWmECVMZLlihReIEGIJiscp9DenwSySB1uBFHIJF80kdGAykghiidVMKJKF9Y11BAACH5BAUKAAAALAAAAAABAAEAAAgEAAEEBAAh+QQFCgAAACwFAAIACQACAAAIEgCRCQRAUCCyBhAcEATgwMGDgAAh+QQFCgAAACwFAAIACQACAAAIEQATHDgAoOBAA8gSFgSQEFlAACH5BAUKAAAALAUAAgAJAAIAAAgSAJEJBEBQILIGEBwQBODAwYOAACH5BAUKAAAALAUAAgAJAAIAAAgRABMcOACg4EADyBIWBJAQWUAAIfkEBQoAAAAsAAAAAAEAAQAACAQAAQQEACH5BAkKAAAALAAAAAABAAEAAAgEAAEEBAA7", "nerd", "B-|", "(nerd)", "8|", "B=|", "8-|"],
							"=;" : ["data:image/gif;base64,R0lGODlhEgASANU/AGZmZotjMv//////zOrFTMyFPczMzP+ZmcxmZs5mDfj5c8zM//blXf758fjzbJkzM/bhWffrZPj2cT5njsjHhPvxvcaRMvfuZ9WhM/j4cvTNQ/TMQfTRR/v7UvjwaZmZmfPHPPnml+etNvbiWvjvaffqY/755vPLQPbiWfbhWvv4T/XZUOqyL/766fC2LswzM/PMQfS+MXlLMvXYZPblZfXdXfv3TvrwRvr6Y8nDnZJLMrGxj3l5aPryL9qaNP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJZAA/ACwAAAAAEgASAEAGtcCfcEgsEgEAAWCQBCwWCoJgSngJl1NlYLs1CgONyijiKRRsJQiHFfhhB4a4VIlAPG6bdnFrCs1gIDFdRGA5ABQFUxMdEgRmIjJLkkxMSFEEB5kBb3BTTAwJoRh6XlxcXl9hNSgMDBArJy6kXy00Fw4FBAQdDhcQeUObTYdTOBlSEwUPTZSSCgpmBE8Hy5RZBokAGRIOCAcImwMCBnBzACokESkco1fiA+JKGhoWFoNHSEioQkEAIfkEBRQAPwAsAAAAABIAEgBABsPAn3BILBZ1AIAAsCMsFgqCYEp4DZPJT2C7NQoDjcoo4ikUbCUIhxUQAgYDg3ywRNgft027uDWFZjAgMV1EYCERBAVTEx0SiQUiMj8ABANvAAYAPAhRBAefbW9wBgKWPQwJqRh7XlxcXl9hNSgMDBArJy6sXy00Fw4FBAQdDhcQekMBAh8AH1JTOBlSEwUPPwRKlwafB2ZOCwfWlHRTpAAKGRIOCAcIoXFxUgAeKiQRKRyrQx/kAj4gGjRYsEAIlkEhQQAAIfkECR4APwAsAAAGAAsADABABjrAn/CXA1CGP8BAgBQMAMkncpCEAgBMqgAaZQ4Jv61QKShzkdetcZwdPhUK5VlYUC+RYS55oJ1Xr2dBACH5BAUUAD8ALAAAAAASABIAQAZlwJ9wSCwWdQCAALAjLBZGYjL5CVij2KwQMBgYvoMlQks2BhqhCKEgEEywAMKACzAAeOMot2sQzHsMZYKDhFkBAh8AHwRtAlgESnQGB5Rwco19AApwXl6MAB4qWR9hbT4gGhqFWUEAIfkECR4APwAsAAAGAAsADABABjrAn/CXA1CGP8BAgBQMAMkncpCEAgBMqgAaZQ4Jv61QKShzkdetcZwdPhUK5VlYUC+RYS55oJ1Xr2dBACH5BAUUAD8ALAAAAAASABIAQAZlwJ9wSCwWdQCAALAjLBZGYjL5CVij2KwQMBgYvoMlQks2BhqhCKEgEEywAMKACzAAeOMot2sQzHsMZYKDhFkBAh8AHwRtAlgESnQGB5Rwco19AApwXl6MAB4qWR9hbT4gGhqFWUEAIfkEBQoAPwAsAAAGAAsADABABjrAn/CXA1CGP8BAgBQMAMkncpCEAgBMqgAaZQ4Jv61QKShzkdetcZwdPhUK5VlYUC+RYS55oJ1Xr2dBACH5BAX0AT8ALAgABQAIAAUAQAYawJ9k+CsWCYmixMNQKAiWYtJYLPySgqzAGAQAIfkEBcgAPwAsCAAFAAgABQBABhTAH4HwKxoFgiJBMEFOFMaodFoMAgA7", "talk to the hand"],
							"I-)" : ["data:image/gif;base64,R0lGODlhFQASANU/AItjMurFTDNmmfj5c/nll2RMMwAzZv////jZffjwapmZZvTMQvqmefbhWfj2cXo5B/blY/jzbPfrZOq2NMzM//blXsz///PHPP766P758fj4cvXaUf+9APvxvWaZzPTRR/jvaPjpe/fuZ8qFPNSgM/jtZvjnhvzwy++8NPfqY/XdXfPDU/n5au6/Tvfh4f/MzPnsUPrtoffmavj1b/foaeWPVqNiIWYzM7h0MPC2LvS+MeqyL/XYZM6jRU1zjP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgA/ACwAAAAAFQASAEAGyMCfcCgoGodIIeAQSjgCj2hAEwDBFIDkEABAXRaLy4SrRQIyHZXAcmgLPALDwWBGmDiMQGAw0DgiAQwMWWVKRXJ0cEYeZhgQIhEKejMRMAIHbBYCWwc0gi58AwqSFBRYWgArBBUSCSM3I3ofJISFQmuYB5u2SgAYBAYWBkZtFppmaA0ScQbNznNvWxkxEpEsfAFPPs7DnBURTwGlfApRp2YnHC+CoX16gbVbBDIiASM1HDWvDQvxZi0INjSooGfDAlq8enEhYysIACH5BAkKAD8ALAAAAAAVABIAQAa9wJ9wKCgah0gh4BBKOAKPaEATAMEUgOQQAEBdFovLhKtFAjIdlcByaAtyWS0AYeIwAoHBQOOIBBgMcWU/AEUGBwaDWxgQIhEKeDMRJQ0LglsHNIAuegMKkBQUWHIrBBUSCSM3I3gfJJeDawdsAopbABgEBhYGRbBmaA0SAgbFxR87v2cxEo8segFPkKNmBxURTwGhegpR1FsnHC+AnXt4f8oEMiIBIzUcNaqVv0otCBsNFXgbC6+2SlwC2goCACH5BAXIAD8ALAAAAAAVABIAQAavwJ9wSCwaAYdQwhF4OAOaAAimABiFAADqslhcJtnrEJDpqBqVSmOzyFmPCBOHEQgMBhpHJMBgvMVZgX+AGBAiEQp1MxElDQuDWAc0fS53AwqJFBRVRysEFRIJIzcjdR8kkGKqgAAYBDxeOmGAZQ2hCQkgKQ0fO6lkMRKILHcBTImcREgVEUwBmncKTsljJxwvfZZ4dXy/BDIiASM1HDWjjqlYLQgbaHVsqKtYgulDQQAh+QQFAwA/ACwCAAoADQAHAEAGK8BfxDH4GY9IZCLB+Y1ui4LxxWAkr9ifNJQwurJGDiMQqM0mH+MIPJkMSEEAIfkEBQMAPwAsAwAKAA4ABwBABjLAn3BIxOGIRJCk1yj8JgAJ5/VjECW2CXIrBAwdVRfR1rgMRRwrOFJ6FqDISkP4+fy8QQAh+QQFCgA/ACwRAAgABAAFAEAGEECDwGP4FX/IosEjEByehyAAIfkEBQoAPwAsDAACAAYABgBABhdAgXAosByOQ8PB8CsejIKfwWJIGq6GIAAh+QQJyAA/ACwGAAAADAARAEAGOUCBcPgrGo/IpLIosByeAs9yKjQcDD+pUWuE/Q6WX3hKRjbBB4HSYDEIv8WwwECvw7NJ31Fd7vvLQQAh+QQFAwA/ACwAAAAAFQASAEAGocCfcCgoGofI5PDBDGgCIJgC8DMoh5fF4jIBAApXpcByKAs8AsPBquS8GIzBQOOIBODUsLCotqKNHnoKAQEzETACB2QWAnpyAwqDFBRTekIJmBwBIzcLYJY/Y4oHjaBDBAYWBkZlFox6aQays2tneixyAQ4BPrOregGTcgpMlWxJDD8uj0+EDFQHVxwMhDUzEx8NCyOmDRWEGxMTAySm5kJBADs=", "sleepy"],
							"8-|" : ["data:image/gif;base64,R0lGODlhEgASANU/AItjMvj5c8zM/1QvD/////v7+/S+Mfjxavj2cfXaUcyFPfzyy/blXfbhWffrZPTVS/XMQYZfM9bV0vTIPPTNQ2ZmZvj4cv758erFTPjzbfnllPbiWs5mDfPHPOq2NNWhM/755/jvaMxmZj5njvvwvfjtZmYzM/TRR/jpet62QPXYZPbiWfjVevC7NPfdf/PLQPbhWvnnne6/TvPMQfjnhvC2LvXdXf+9APfmavbkYPPDU/n6a5ycnOqyL/foaf///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFFgA/ACwAAAAAEgASAEAGs8CfcEgsEgEEhkAhEASeTSYEYPwBrtiq9bIYRAaCg8A7UFCHgBgu9FCITCLFozE1XkEa1axjuBYBFzEKBU0cAYNNES1nAAsoBwgWT08WCCENE2dCADIuCRspKRsJEB+adlh+WoAkNisMDA0JLzWnViADhCMDCLkCu5pIKBUFxZPFBRWZmwQ+kJNPOwgHDHVWLDQOGQgYHCYcGBkOCR7BOho5Dg/r6zAnpqgtExQUHeW2WvlBACH5BAUUAD8ALAYABQAIAAMAQAYPQALhR/wJBYLiD/kbKZtBACH5BAUQAD8ALAMABAAMAAsAQAZWwB9p4zgcfiFH49T7OTEckwiTKTkrBcEo4Cz8RhXGoEAgDALj8iDhbDt37jiDEV/8IgMBQnAfKCAKWT8cP4F8EQ0CCgIRbQKMfG4WAQEWCHFORgdJbUEAIfkEBcgAPwAsAwAFAAwACgBABjhAUGX4Kw4rjWLxpmz+JJGfQBlVSH68a0GB1SogzjD2Rq6My9jfoFDkqdnTcED8E3EwCPoPg3EGAQAh+QQFDQA/ACwDAAUADAAIAEAGMcDFIDL4GYcDxU9gbDYjTAWTwPlJf4RIw8ltDgoEQvEbLlZGAoLxnP4xur8d3GgScYMAIfkEBQ8APwAsBAAGAAgABABABhJAgeBH/AkJhGIAOSoSm07iMAgAIfkEBRQAPwAsAwAEAAsACwBABkhAxSAyEPwEw8Hi93somD/FgylQCIzUqiDCLDw53ScUGhiPU6nxYCQoDH7r9qBSqJcD9ULFd0DsyAEIB1AYHCYcGGZND4xTTEEAIfkEBRQAPwAsBAAFAAgAAgBABgtAwuhH/AkJRSIyCAAh+QQFFgA/ACwDAAQADAALAEAGTcCLYhAZCA4C4mDx+4UeCpFJpHg0GQLFT9AMbBWCWIQgKCgCHLK5yW672Yxfqg0aEEaFAcKOH6AqTQVdgYBdO29tCBgcJhwYbw5tVk1BADs=", "rolling eyes"],
							"L-)" : ["data:image/gif;base64,R0lGODlhGAASANU/AItjMv////v7+2ZmZrW1tvnll+rFTOq2NP//mffZfdqTK5KSknd3d/j5c/jxasxmC/bhWfG8M/TMQdHRyPj2cfzyy/bkYvrlOfTIPD5njvXaUa2trfjzbPfrZIyHX/jvaP755/blXf758YeGgbq1alp+offqY/TRR9WhM8yZmfvxvfftZvjpe2dnZ/j1b/C2Lvjnhv38j+6/TvPDU/XdXeqyL/XYZPfoaVxZV927iPrtof39/Z2dnYCAgbh+Lv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFZAA/ACwAAAAAGAASAEAGt8CfcEgsGo9DQIDlMDgbUOcHggEgk4AIRqJQHADWa1KkokFCIYhG8gojAQmYQUCv1w1fMRYM1idBFiscLhQULhwrEBJuRko3CgIZJQIGAZIBCheMRQAzBRYdDqIfHQ8nKJt+qo0AIAU2EhgRfXoAZBChoyYQJzWpYzodHBRQUBQcJhqzbwEhOV0PKQ0pDw8KBppvFSyQGQyUkd+Zv0IABQjo6BQx6QjkSTIJGhAG1Q8GqKs/fHxGQQAh+QQJCgA/ACwEAAsABQAFAEAGEcCB8EcUGieD3m8QCBQnzV8QACH5BAkKAD8ALAAAAAAYABIAQAY1wJ9wSCwajYNBq3VsOp/Q6HMQqAYACal2yzW2AlRqtwkYm8/otHTAoDK732QSUBnL5+o8NwgAIfkECQoAPwAsAAAAABgAEgBABtzAn3BILBqHg0AysBgAAiyHYdqoTj8QDOBIBAAiGIlCcfASCQvloCtS0SChEEQjeW2Lg7wzATMI/oCABmVcRV6Hd0QLBAFKQwAgFiscLhQULhwrEBKJSYyNTzcKAhklAgYBpQEKF4lGADMFFh0OtR8dDycoroW9RHlHXiAFNhIYEWZDaWmOPwBtELS2JhAnNXdLA03OIjodHBRVVRQcJhrIQp4LaU8hOWMPKQ0pDw8KBq1IjUoAFSyjGRicIiWQFa8uBRAoVEghxkIEBw3JSKABgoF6Dwzs8tUF0cEgACH5BAn0AT8ALAAAAAAYABIAQAbgwJ9wOBwQj0jhIEDAMXqbHWGxIDQaBsMHggEkiQBABCNRKA7h728xGIwCAxINEgpBNJKX98sewAwCgYKCBmhqSz0/YYt7SUstATgLFQQeODgEFC4cKxASjUU8AaMBEwsZJQIGAagBChegRwAzBRYdDrgfHQ8nKLFHS0Zqwz/BOCAFNhIYEWlJbAEMIww4HiQkuSYQJzWxS288OKKjOzhXFBwmGs1EbFUT5BsKDykNKQ8PCgawSG1UCz4EZGCgSiDBV7+GACiAoGFDCjEcIkgIRkYCDRAM4HtgwBcxMIx+BQEAIfkECQoAPwAsAAAAABgAEgBABtzAn3BILBqHg0AysBgAAiyHYdqoTj8QDOBIBAAiGIlCcfASCQvloCtS0SChEEQjeW2Lg7wzATMI/oCABmVcRV6Hd0QLBAFKQwAgFiscLhQULhwrEBKJSYyNTzcKAhklAgYBpQEKF4lGADMFFh0OtR8dDycoroW9RHlHXiAFNhIYEWZDaWmOPwBtELS2JhAnNXdLA03OIjodHBRVVRQcJhrIQp4LaU8hOWMPKQ0pDw8KBq1IjUoAFSyjGRicIiWQFa8uBRAoVEghxkIEBw3JSKABgoF6Dwzs8tUF0cEgACH5BAkKAD8ALAAAAAAYABIAQAbPwJ9wSCwajYNBqwUIsByGaGMa/UAwgCMRAIhgJArFgastAkQqGiQUgmgkryxxEKgHAAmYQcDv9w1jZVtchIJbIBYrHC4UFC4cKxAScj8tAXR0TTcKAhklAgYBngEKF5RGADMFFh0Orh8dDycop4a2ZVwgBTYSGBFkhmcqEK2vJhAnNbVbIjodHBRTUxQcJhq/QwMMdEwBITlhDykNKQ8PCgamQpZJSQAVLJwZDKCd9KWn7e4FCP39FDH8IVhmRkYCDRAMmHtggNYtIYQKFQkCACH5BAUKAD8ALAAAAAAYABIAQAbGwJ9wSCwaj0NAgOUwOBtQ5weCASCTgAhGolAcANZrUqSiQUIhiEbyChcHgQAgATMI7ni84SvGgsF9SSAWKxwuFBQuHCsQEm5GSjcKAhklAgYBlQEKF48/AxNxADMFFh0OqB8dDyconoGwkAAgBTYSGBGAfQBkEKepJhAnNa9jOh0cFFBQFBwmGrlISiE5XQ8pDSkPDwoGnW8DAwAVLJMZDJeU6JyeoAM9AAUI8/MUMfQIxeHhADIJGhAMbHtgwFWsH3/+GAkCADs=", "loser"],
							":-&" : ["data:image/gif;base64,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", "sick", "(sick)"],
							":-$" : ["data:image/gif;base64,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", "don't tell anyone"],
							"[-(" : ["data:image/gif;base64,R0lGODlhEgASAMQfAItjMvjya/z8+/v41PfqZfj4cs5nDmZmZvW4M/bZVPKkHNPT0/XTTvj2cPOrJ5KSkvS0KvXCO/bgW/TORvj1jTMzM/nvlsyFPfnzn/bnf/OgF3d3d1xcXG9lWv796////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFDQAfACwAAAAAEgASAEAFpeAnikBpjiigREThvm5DDQD6HMciLNWyHADc7fEBOBiEQONiMDSagtooeLjhJIRkIEGdQibYgJgioKUUCEkA5jIUMFGSxjFpvS6NAMGSkX6qGzo5O0AAO4RTAEgZFgMeJSgkCmBJDZZKZX4AGggJBE8wlgNmRSufbDFkUiqdDWxNBhkYmg5fpzEvfh8PhIc4DBJcviIdOhw6yDgHAhUCBzbKVkSRIQAh+QQFDQAfACwFAAQACQAHAEAFGOD3NddnNKaoruhaGOsXlGoDq0Gsu6IRAgAh+QQFDQAfACwHAAQACAAHAEAFFeBXXJ9BfWiqro2hNmRZuGiz3qmNhgAh+QQFDQAfACwHAAQACAAHAEAFFuB3GV9DfmiqqgamXgGaGUUarzh6fiEAIfkEBQ0AHwAsBQAEAAkABwBABRjg913G15SCqK7F+hntejUrvNJurpZfFgIAIfkEBQ0AHwAsBAAEAAoABwBABRbg913GV5SUqK5iwxoFKwZvLN94KRohACH5BAUNAB8ALAQABAAKAAcAQAUX4Pc112c0pqiuYsAWBiuWaxPLeF6oWQgAIfkEBQ0AHwAsBQAEAAkABwBABRjg9zXXZzSmqK7oWhjrF5RqA6tBrLuiEQIAIfkEBQ0AHwAsBwAEAAgABwBABRXgV1yfQX1oqq6NoTZkWbhos96pjYYAIfkEBQ0AHwAsBwAEAAgABwBABRbgdxlfQ35oqqoGpl4BmhlFGq84en4hACH5BAUNAB8ALAUABAAJAAcAQAUY4PddxteUgqiuxfoZ7Xo1K7zSbq6WXxYCACH5BAUNAB8ALAQABAAKAAcAQAUW4PddxleUlKiuYsMaBSsGbyzfeCkaIQAh+QQFDQAfACwEAAQACgAHAEAFF+D3NddnNKaormLAFgYrlmsTy3heqFkIACH5BAUNAB8ALAUABAAJAAcAQAUY4Pc112c0pqiu6FoY6xeUagOrQay7ohECACH5BAUOAB8ALAcABAAIAAcAQAUV4Fdcn0F9aKqujaE2ZFm4aLPeqY2GACH5BAUPAB8ALAcABAAIAAcAQAUW4HcZX0N+aKqqBqZeAZoZRRqvOHp+IQAh+QQFLAEfACwFAAQACQAHAEAFGOD3XcbXlIKorsX6Ge16NSu80m6ull8WAgA7", "not talking"],
							":O)" : ["data:image/gif;base64,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", "clown"],
							"8-}" : ["data:image/gif;base64,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", "silly"],
							"<:-P" : ["data:image/gif;base64,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", "party", "<:-p", "&lt;:-P", "&lt;:-p"],
							"(:|" : ["data:image/gif;base64,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", "yawn"],
							"=P~" : ["data:image/gif;base64,R0lGODlhEgASANU/AItjMvv7+8xmC+SvO/j5c5kAAGZmZs5mDf+ZmczM/wAAAP/////MzP766PXMQf758fbhWPnllP8AAPvxvZlmzNWhM/frZPblXfjxa/TRR0Fjj/j3ceWPVvXIPDMzzOq2NGZmzPPHO/PLQPbiWfPIPfbkXPjpe/S+MfTNQ3+/AJnMM/jya/C2LvPMQfXZUPjVevzwy+qyL/nlnMwzM/jwZ/PDU/XYZPblXszMM/fmT/rtofC6M/XdXfblZfjwaf///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFDwA/ACwAAAAAEgASAEAGs8CfcEgsEgGL22pDaDo3mJIDYPwBrtiq9THJDQaYAe2biVGHABmnoChIJOwChHA+AhoRWyt0uhYBDzoWBwEaAYUBBxYuO2cAMAgFAoeUAQIFCB11VgQ4KQIgCQICMxWbf1h+WoATPCMXFwcDIiyndz0DB7IBCokQU2gLJj4DAQmHx2IQmkJICAgco9Kjz8BWLwwCCgbc3QoCDB91ADURKgUBDB4JcBmmRlcEJCgJJOKnWvlBACH5BAUSAD8ALAgADQAEAAQAQAYPwN9v4flREj/BkPJLgH5BACH5BAUWAD8ALAkADQADAAQAQAYMwN+PAhoufglK4hcEACH5BAUeAD8ALAkADQADAAUAQAYOwF/CkwAJFz9QIvn7BQEAIfkEBRIAPwAsCQANAAMABQBABgzA3+JHSRATBGNxGAQAIfkEBRYAPwAsCQANAAMABABABgzA348CGi4WCUriFwQAOw==", "drooling"],
							":-?" : ["data:image/gif;base64,R0lGODlhEgASANU/AItjMv////TOQ2ZmZsyFPZlmM+rFTMyZM/j5c/+9APj3cfjxa/biWvjzbWYzM/bmXvXbUniVhvfrY/vzS/PIPfS/M8vVevblXfj1b/TNQvjoevjuZ/S6Lfv7+/343/nth/j4cvjvaPntj/v0wPj1cPrtte22MffnyfLjyvXaY/G5MPbfePv4T/nlkxQ0Uvr5YiJJbvjs1/TSSfPPSP714szMZvflafv5UPPNQvO+Mu+8NPnxYvbjX/jpUPblXv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFgA/ACwAAAAAEgASAEAG18CfUAgoGodIgOCxeDwQUOjr8LEMBgQkUjAICAqFgHjwA2QIDkchUcA0CJoAIKmSMRIHwSIk4bW6AQMCRBw4EAwXFwYGHidzQwAUXx0uEQQdMBEYISJyRBUQBw0KIAICBwUHEoIBBUkAOhSAggJiY5AAOTMpKyU0RVplHIsGIQsGDgSMKI9lFQIODRYGBAgRFjcSIzGPSqbf3wgKLB+eZRQMBAcGBwRrIAQJGrNlAgwbCSQKCiQNGzb0iJjIcMjHgDU2CAAKpMUIKzFfapEJJiTijytXCAQBACH5BAkWAD8ALAAAAAASABIAQAbWwJ9QCCgah0iA4LF4PBBQ6OvwEQwGBCSycC14A+DBD5AhOByFRAHTIGgCgKRKxkgcBIvdZNIahAVEHDgQDBcXBgYeJ3FDABQCBR0uEQQdMBEYISJwRBUQBw0KIAICBwUHEgMCAVmNADp+ATU1YLUBYkQAOTMpKyU0RVpjHIgGIQsGDgSJKIxjFQIODRYGBAgRFjcSIzGMSqTg4AgKLB+cYxQMBAcGBwRpIAQJGrFiSgwbCSQKCiQNGzbqNTKRAUIPLAfcYamFy5WqWpAKrGooDMmVKwSCAAAh+QQFFgA/ACwAAAAAEgASAEAG0sCfUAgoGodIgOCxeDwQUOjr8BEMBgWkVlAoYAPgwQ+QITgchUQB0yBoAoCkSsZIHASLkITXGoQFRBw4EAwXFwYGHidxQwAUXB0uEQQdMBEYISJwRBUQBw0KIAICBwUHEgMCAVmNAH5gsLEBYkQAOTMpKyU0RVpjHIgGIQsGDgSJKIxjFQIODRYGBAgRFjcSIzGMSqPc3AgKLB+bYxQMBAcGBwRpIAQJGq9iSgwbCSQKCiQNGzbxjSYZIFy5QoDAlzBaXHVRFYBLAVW0fGkZOIBAEAAh+QQFFgA/ACwFAAgADQAJAEAGJ8CfcEgUEoaFweBXKBJ3k4lzSjzqlr9ajcrtTns/wuFgLAIGggA1CAA7", "thinking"],
							"#-o" : ["data:image/gif;base64,R0lGODlhGAASANU/AItjMvj5c9qTK/jxaurFTPnll/j2cfPIPe66NPfrZPjZff///7Ozs5OTk2ZmZvblXfTNQtWiNJ5jKfbiWfblY/jzbfj4cv766P758fXaUcnJxvj1cObm5vvxvWYzM/jpe/PHPPjuZ//MzKOjo/+9APjvaPzwy/XdXe6/TvjnhvrtoffoaffmavPDU/j1b5R1RPXYZPjtRY9TU/TTSeCdP8zM//Pz805gl35+fvr2XuHXq8S7eHFxYtXAVoJXMv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAA/ACwAAAAAGAASAEAGsMCfcEgsGomAxWdgsARqNRqNUNMdAEckAHGAQA5XbBaJ6ZwmAsEkQxCIswBFKlFpkggRiSRxiLzHPwCCg4BIFxQhBAsLBi45ijN/RUkrTAGXmAYDfZJILQUPCQOjJXychaipghcFMBAgCIKoAGUTCQIEBKUEUp1DtCp0BA03CxaKxbFwCw+WmJeap0cAJktNzxYbJdLTBSwhdQYGGxUhYL5IKAoZEw8PE2B+qUKDhIVBACH5BAUKAD8ALAYAAwAJAA4AQAY3wJ9Q+BgajwaBUvIjSATH42BKIPwe0GF1K7RGr8XrcGPo/mIQayCQkEhKk69RIHmJKvIvCDEMAgAh+QQFMgA/ACwIAAYACAAKAEAGKMCf8CcYDg+/GdLI/EmIz18gYDGIXiKhhEAkRLVRSFNoECI94mHGGAQAIfkEBQoAPwAsCgAMAAUABABABhPAn+glOhx+k0PkUPGQfr/D8xcEACH5BAUKAD8ALAoADAAEAAQAQAYOQNFLlPglDj+Ph4Rk/oIAIfkEBQoAPwAsCQAMAAQABABABg9A0UtU8fQyM8+PFFpmfkEAIfkEBRQAPwAsCgANAAUAAwBABgvAn/B3IA5lh+IvCAAh+QQFBQA/ACwPAAsABQAFAEAGEcDfz0EsOoQ4h+b4WyyOzmUQACH5BAkKAD8ALA8ACgAIAAYAQAYZwN/PQXQIj4uk8ehYNJe/xQ+3lBqfOOYyCAAh+QQJCgA/ACwAAAAAGAASAEAGQMCfcEgsGo9Io2OxaDST0Kh0iowAmg3GwkHten8ObtcKbiy3XUCYif6633D3Ovs+MxpjtXPbnqrZWmJeYWFxRkEAIfkECQoAPwAsAAAAABgAEgBABtnAn3BILBqJgMVnYCAEnhKJQDI5ADQLR9YIACAOEAgI0T1yMZ3T5PGYZB4CwE+rcRQBilSiYrAERC8iFQkHEQAODHZmP12NcotIFxQhBBsGBi4EAjEQADYYCzYNiowLK0xPqQEGA4UADBocpEIALQUPCQMDHjIHvoaQwcJDXRcFMGIPZUIOs8RoE7m6BNRwryMciUgYKnsGAlPUAgQSZM2xpEkPqKnkEtSdGtiyxCZLfaoWGyUHPEmhzgAUYBGCjwEPHkiE8CWnmRkAKBRkWPOAxK9HwxwtgxQEACH5BAX0AT8ALAAAAAAYABIAQAbFwJ9wOGw0HA6icghYfAYGQmAqkQgkkwNgqQQAEAcIBITwcpcATOc0cSwcjUWjmeQCFKlExWAJiF4iFQkHEVtnRABucW8Lb4c/ABcUIQQbBgYuBAIxED6HTStQU6MBBgOEhnYtBQ8JAwMeMgezhY9KcAsMjUi2Ql4XBW6MDLp1dmoTrgMOBHA7Ao7HKnoGAlcEmgQSZWdND6Kj2hLYEKldJk98pBYbJaifBSwhewYeHiQhs+Z2KAoZEw8ekKC175GXgwWXBAEAOw==", "d'oh", "#-O"],
							"=D>" : ["data:image/gif;base64,R0lGODlhEgASANU/AGZmZv///4tjMpKSkvru19m3UPj5c/K8MvblXfXZUPj2cbKysvbiWerFTPTMQf7865ZIA/jzbfv7+5lmM/758ffrZOq3NPjxa/vxvfjvaCNHadqTKz5njvj4cvjwafXIPPjpe/jya/jkk/nlOvC2Lv755vXYZPXdXfj1b/LPMf+9APPHO/v0TPrtofblZfjVevfoafzwy/nlnPPDU/jnhvv6UXh2Z+6/TvrsQmtmX8zMmdC2THl5eYZdMuzZbP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgA/ACwAAAAAEgASAEAGx8CfcCgoGodIAYAQADQSUGhD1RgIhICAFoAELJlcYslViGgkCtS5MLr+ls1mxXNJZBCAQZYQ/gkoGCcMCAgMCQ4kbkICASAAGx0SDwYGWhkMH25LAxURChsQoRN7AwF6TE0CBx8WFlkDAwtNSH4CJSImDisHRbR+gAwFwhcZwgUpin8tnQocAQYdzhUJvItNfJTZBgoXCA6aTAMNoBPlEBtepj88YA0NnuQRGXsLp00LAAmD3nlbpllaUhmBE0BWHy99hiDsEwQAIfkECQEAPwAsAAAAABIAEgBABsDAn3AoKBqHSEEAFlIACAFAItFQDRoCpBAQ6AKeUIBWUHIVIhqJApUujLLE2TMaRQAGXIKYSMGcGAgIDAkOJHBCSiAeCh0SABsGXRkMH3ACLzQVTwMQnXkDAQNac1GgAwMLUVo/RSUiJg4rB0WrAn0MBbkXGbkFKYe2LRURChwBBh3GFQmziAEITQZPAAYGChcIDpYxinMDExMQX6ELRDI2YQ0NExF5C6JEcwALX6B0e0NcXVFQAan4o778+CJwSBAAIfkECRYAPwAsAAAAABIAEgBABrPAn3AoKBqHSEEAFlI0EoDAYgBQNRoCJDIqBQC0QkHJVYhoJArUuTDKEmciVhRADQQAOzeRgjkxEAgMCQ4kej9KIB4KHRIPBgA6ARkMH24CLzQVNQMLXAMBAzgWhocCUVQLd6REYiImDisHRWACfAwFuBcZuAUperUtFREKHAEGHcUVCbJhAQhNBtFzNRcIDpYxiQ0bc6cLlL8yMHJ2XFNtWgI3Pqfldz1gQ1ygd/FgXl5gQQAh+QQJAQA/ACwAAAAAEgASAEAGwMCfcCgoGodIQQAWUgAIAUAi0VANGgKkEBDoAp5QgFZQchUiGokClS6MssTZMxpFAAZcgphIwZwYCAgMCQ4kcEJKIB4KHRIAGwZdGQwfcAIvNBVPAxCdeQMBA1pzUaADAwtRWj9FJSImDisHRasCfQwFuRcZuQUph7YtFREKHAEGHcYVCbOIAQhNBk8ABgYKFwgOljGKcwMTExBfoQtEMjZhDQ0TEXkLokRzAAtfoHR7Q1xdUVABqfijvvz4InBIEAAh+QQFAQA/ACwAAAAAEgASAEAGw8CfcCgoGodIQQAGIAQAiWiioRo0BEhAYAv4AZrObrLkKkQ0EgUKXRhhh83n85JAAAZaglgooGBODAgIDAkOJG98ASAeCgASDwYGWxkMH28CL00DChsQnnkDAQNwTk8fFloDAwtPSHwCJSImDisHRa4/fRgMBb0XGb0FKYh9LRURChwBBh3KFQm2iQghTQCRkQoXCA6XMXEDEBPiEF+iC0M5YQ0NnRMReQujQnEACwCCd1yt81tcAnEBWO2B84VgwSFBAAA7", "applause", "=D&gt;"],
							":-SS" : ["data:image/gif;base64,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", "nailbiting", ":-ss"],
							"@-)" : ["data:image/gif;base64,R0lGODlhEgASANU/AItjMvbkXeq2NPjZfd+pMvj2cdbRy+SvO/TMQv//zPj5c/G8M7el2s5mDfbhWvTIPMJbCP////v7+4xvxPjzbffrZPXaUf758fnllNWhM+GsM/jvaP/Mmf+9APjwaZlmZvjtZvblXVYrocyZM8yFPffoaevNSvXYZPzwy/jnht+8RO6/TvnlnPPDU/TRR/755vC2LvjrU+HKUfbkYPfmavjpeqWP0Y1wr3pavDMAmZh9vNXM6e7r9fbzzbOg1v///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCAA/ACwAAAAAEgASAEAGtcCfcEgsEgGRQKcBOQQCBEijEzABjD+AdovNXgiJm4FEMtwSBNV1CGDRNpSCvEABORDrI+CFOSEeC1pFAF8SOzY8Ujw2OxIEgUIAKDUeBQqXmAUbDg95WSsDFg4REQ4WCBmeg1uCXYQETCEhUgQwqgBgNzg2Bwc2OGcEeUgHIxISCb0JxyMHMmtIJU/T1AExeJEDKRVxHB8fHHQVFgLDLRgzFR4aGhsVDi6pRloLDwh/5apd+0EAIfkEBQgAPwAsBAAEAAoABABABhvA30Q0+f10xB9jWBQSGQxRQmSUihjKCTaLDQIAIfkEBQgAPwAsBAAEAAoABABABhnA388gFBJ/E0aCIVQyJrplQiidIEXWqzUIACH5BAUIAD8ALAQABAAKAAQAQAYYwB9j+Pv5iIzET7lcMny/SbEoZQiJV2sQACH5BAUIAD8ALAQABAAKAAQAQAYawF9i+Pv1iJKkpKiU9CS55Q8qSUyrxUTyFwQAOw==", "hypnotized"],
							":^o" : ["data:image/gif;base64,R0lGODlhEgASANU/AItjMsyZM/j5c+SvO85mDfv7+/S+MfTIPGYzM/j3cerFTPblXvTMQuq3NPXaUfjzbfj4cvfrZNSgMv766PbhWcyFPf758ZlmmfTRR/////TMQPnllPr5Y/vxvfjpe/j1cPjya/jxa/+9AD5njvv7W/jwafjvaGZmZvPMQfrtofC7NPrySPfoafzwy/C2Lvfdf/nlnN3bM/TRPvXdXfjVevr0XfryUZON6PjnhuqyL/XYZPjuZ/HBUZmZ//fmav///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFeAA/ACwAAAAAEgASAEAGvsCfcEgsDgGZBSghaDoJgQUDYPwBrtiq1dKpEBS1kGJQweSoR5hv9xBdLp8HAzM1XicbHepguBYBFikDAwUjATEjBQE2DipoAC0eJR8QCgEiHBAfJhQHaEIAPC8OFAsLAQ0MEp92WH5agB0zAysLFRIyLqxWE4MFBQMcvwEUGp9IkgMBPQEENwQnxJ6gGSxLTZYICAEKUo80OBEPCRAkJBAJDxEODcc8GwsRFwEhJqgYq60qBwwMB+27tAj8EQQAIfkEBQwAPwAsCwAHAAMAAwBABgrA3ymACCgihEAQACH5BAUMAD8ALAsABwAEAAMAQAYNQMLvFPghAgpBhBAIAgAh+QQFCgA/ACwMAAcABAADAEAGDEAC4XRCGAMCQYQQBAAh+QQFDAA/ACwPAAcAAQACAEAGBEDCKQgAIfkEBQwAPwAsDgAHAAMAAwBABgpAwonwQwQEkVMQACH5BAn0AT8ALA8ABwADAAMAQAYKQMIp8EMoBIxTEAAh+QQJDAA/ACwAAAAAEgASAEAGH8CfcEgsGo/FyAnJbDqf0Kh0Sq1ar9ETYYoIYL/gYxAAIfkEBQwAPwAsAAAAABIAEgBABr7An3BILA4BmQUoIWg6nZGT8QeoWqdUS6dCUNRCikEFkwMQATDf7iG6XD4PBoZhLlYnGx3qYKjaLSkDAwUjATEjBQE2Dip1AC0eJR8QCgEiHBAfJhQHdUIAPC8OFAsLAQ0MEp5GVldYAFozAysLFRIyLqtUE4IFBQMcvgEUGp5IkQMBPQEENwTPBCcEnxksS02VCNrbAZ80OBEPCRAkJBAJDxEODcY8GwsRFwEhJqcYqqwAKgcMDAfsurAI/BEEACH5BAUKAD8ALA8ABwABAAIAQAYEwBMhCAAh+QQFDAA/ACwMAAcABAADAEAGDMDTKQD4BRSACIEYBAAh+QQFDAA/ACwLAAcABAADAEAGDMDTL3AYKhgRQoARBAA7", "liar"],
							":-w" : ["data:image/gif;base64,R0lGODlhFwASANU/AItjMnluX/////j5c85mDfTMQfXvrfj2cfbkXfTIPPjxa8yFPfG8M+rFTPXaUV0zJPblY/bhWeSvO/LaZffrZP758fjwafbiWv766PjvaO3EUPfqY/blXpKSkvnllPvxve3aL/TRR/blXfv8U8LC59WhM/jya+q2NPfuZz5njsDAwPC2LvXYZPbkXPfdf/biWffoafjVevnlnOqyL/TXTfzwy/j1b/jzbfbhWvXdXfjnhvPDU/jpevrtoffmav///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJDQA/ACwAAAAAFwASAEAG2MCfcAgoGofIJEAAMx0G0OhBgSgAktis8PEIGLxgIQADQd1sh4OtgYpYtT/AzsOhWBSKDAUXKl0DHYABSAAVHzkvIiIRDgUrV1pLDRISC5aXlA0JkEoxOhQEoaKhFA4nnFlFDAkgIAmnAFwBArO1hGMeLAUJDEVwYoYXdngZGxEhM6iEFT00Dc8jIxIkJBsOvakCHE4CKVApAlMtb1gANTwWCOoTE+oIGRGbkTI+GhMDExr4Gm7KShouHFzgwOFCIz8/wHz5Us6IrwcCvtCaOOgXlgAqMA4KAgAh+QQJDQA/ACwAAAAAFwASAEAG2MCfcAgoGofIJEAAMx0G0OhBgSgAktis8PEIGLyBABEDQd1sh4OtgYpYtT/AzsOhWBSKDAUXKl0DHYBfRBUfOS8iIhEOBStXWksNEhILlZaTDQmPSjE6FASgoaAUDiebWUUMCSAgCaYAXAECsrRIRRgeLAUJDEVwQgCFF3Z4GRsRITOnthU9NA3QIyMSJCQbDr2oAhxOAilQKQJTLW9YADU8FgjrExPrCBkRmpAyPhoTAxMa+Rpuy2JENLhwcIEDhwuM/PwA82WWOSO+HghoSGvQLyxiAP4IAgAh+QQJDQA/ACwAAAAAFwASAEAG2cCfcAgoGofIJEAAMx0G0OhBgSgAktis8PEIGFQBMBEDQd1sh4OtgYpYtT/AzsOhWBSKDAUXKl0DXoFEFR85LyIiEQ4FK1daSw0SEguUlZINCY5KMToUBJ+gnxQOJ5pZRQwJICAJpQBcAQKxs0hFGB4sBQkMRXBCAIQXdngZGxEhM6a1FT00Dc8jIxIkJBsOvKcCHE4CKVApAlMtb1gANTwWCOoTE+oIGRGZjzI+GhMDExr4Gm6OHQH/amlw4eACBw4XFvn5EUiWrHJGej0QYGBWxYq+sgRIEgQAIfkECQ0APwAsAAAAABcAEgBABtjAn3AIKBqHyCRAADMdBtDoQYEoAJLYrPDx6ARU3wARA0HdbIeDrYGKWLU/wM7DoVgUigwFFyoBAgaAgkQVHzkvIiIRDgUrV1pLDRISC5WWkw0Jj0oxOhQEoKGgFA4nm1lFDAkgIAmmAFwBArK0SEUYHiwFCQxFcEIAhRd2eBkbESEzp7YVPTQN0CMjEiQkGw69qAIcTgIpUCkCUy1vWAA1PBYI6xMT6wgZEZqQMj4aEwMTGvkablcBXrzY0uDCwQUOHC4w8vOD1qxZ5oz4eiAgkMVBvzL+CAIAIfkECQ0APwAsAAAAABcAEgBABtnAn3AIKBqHyCRAADMdBtDoQYEoAJLYrPDx6ARUX0NACMBAUDfb4WBroCJW7Q+w83AoFoUiQ8GFSgABYmJjRBUfOS8iIhEOBStXWksNEhILl5iVDQmRSjE6FASio6IUDiedWUUMCSAgCagAXAECtLZIRRgeLAUJDEVyZIcXeHoZGxEhM6m4FT00DdEjIxIkJBsOv6oCHE4CKVApAlMtcVgANTwWCOwTE+wIGRGckjI+GhMDExr6GnBXAbx0UKLBhYMLHDhccAToh61aYs4ZAfZAwCBBt4IFGxMEACH5BAUNAD8ALAAAAAAXABIAQAbYwJ9wCCgah8gkQAAzHQbQ6EGBKACS2Kzw8egEAgZwQAjAQFA32+Fga6AiVu0PsPNwKBaFIkPBhUoAYF5eSAAVHzkvIiIRDgUrV1pLDRISC5eYlQ0JkUoxOhQEoqOiFA4nnVlFDAkgIAmoAFwBArS2hWUeLAUJDEVyZIcXeHoZGxEhM6mFFT00DdAjIxIkJBsOvqoCHE4CKVApAlMtcVgANTwWCOsTE+sIGRGckjI+GhMDExr5GnBXY6o0uHBwgQOHC44A/bAVJow5I78eCGhoqxYwOQFUjAkCADs=", "waiting", ":-W"],
							":-<" : ["data:image/gif;base64,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", "sigh", ":-&lt;"],
							">:P" : ["data:image/gif;base64,R0lGODlhEgASANU/AItjMvXDNf//mfjxavj4cvTMQv///89vEfblXfXaUPS+MfbhWfj2cfjzbZgzM/bkYtm+Rf765/befvfrZPTIPf758fbiWvnllPJTGPvxvfTRR/fqY/juZ9WhM/jpe/PHO/jvaOq2NDMzZvfuZ/mULeOuN85SLPbiWfbhWvXdXfPMQfjVevPLQPfmavj1b/foafnkZ/jnhu6/TvPDU+qyL/C2Lvzwy/nlnPXYZPC7M/rtofHUTdU5F92aK+W3PP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFZAA/ACwAAAAAEgASAEAGscCfcEgsEgEGxEBgOAQCB4NggCgAjD+AdovNVjKWyWAM2iw0tOsQcGtxGlBng7OwGrWRC071UWiLABU6cQSFBAcHJQk5agA2HgKRkpMLFGpCADISCRYICBYJBR2Xd1t/XYEZKSeeCwksNaRZEQ8jDS4MDC4NIwsql0geAwYGIk8ixCCVjQYvAwxP0U9UdlkrMRMNDIYEDA0TCSHAMxcPEwdjBxMoGqOlORQFBR/isl33QQAh+QQFCgA/ACwHAA0ABAABAEAGBkCTw2EKAgAh+QQFCgA/ACwFAAcACAAIAEAGIcCfEAIRGn8OkmN4ZCJNGN7yR6wWf4Ss1ujAdE1HafIXBAAh+QQFMgA/ACwDAAUADAAMAEAGR8BfAgb7GX/EROLowGCax2MgapwaI6XDwaj1UX8kCoX0BTefZCOspG4bdz+B5Ncz1ufx3U4i6Mv1UWQOPw5pUU9OT2WEg1FBACH5BAUKAD8ALAMABQAMAAwAQAZPwN9j1PgZf43RQnWcOEwY3vEImRqrxoHBIDKKttYfwUFyhH85SqHwCR11ASNBfkz8BoIftpr/eQQCBIKDgFNFGD8YJmEJFjwOZGc/AABWQQAh+QQFCgA/ACwFAAcACAAIAEAGJcCfMBAQGn+EpJBxHApNDodpIjQciAeDUMDtGgOHa+OIQFgSvyAAIfkEBSwBPwAsBwANAAQAAQBABgbAw2BwCAIAOw==", "phbbbbt", ">:p", "&gt;:P", "&gt;:p"],
							"<):)" : ["data:image/gif;base64,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", "cowboy", "&lt;):)"],
							":@)" : ["data:image/gif;base64,R0lGODlhEgASANU/AMxlkMxpkf6zt9Wlpf/MzP////6vuJJPbP6suf6ouv6puv6ytwAA//6wuP/4+v6ku89qk//I2f+80/6uuf/d5tmGqf+bvf6vvv+cuv65x4BVXgAAAP+eu/+dvf+evf/09/6gvP+TuP6tuf+Luv6vyv+WuP+bvv+KuP6uuP6lu/+evP+oyv+UvP+Xu/+Xvv6quv7Az/7N2P6wwP/l7v+lyv6rvP+dvv/M3P+Uuf+dvN+mqv68wv6xuPZ4r/ipsv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAA/ACwAAAAAEgASAEAGw8BfIPArGo/FYRFQeDUCgqg0YFBwAMglYLvNDgEOiq7AaBgYhQEoBIAQf4CbbDKsB3YJFVZICBy2HxEkNiYtW319cA4xCAMFdmkIDyV7ADMZBlAHUZsBKAkYe0s0EikaGxsaDx0jogEEiXBcXXx9rwFgFAMDCgq7HTgAtz8QAB8XjgwLC2gDCTltSwWYA1BTAxOglQUXTwKb3wJUVpUSMCIBC1ICCwGSbEYAKxE1CHYICSAnovEALhYePFhgQSuLQYNBAAAh+QQFAwA/ACwFAAUACAAIAEAGHsDfL0AMCI/IoQApCPCKxZ1SQDUKD1emcCnkIRuiIAAh+QQFAwA/ACwFAAUACAAIAEAGJMDfj7FYMITI5G8QSAaYC4FUsGgWAthAASkQdpEHYVjYRAZ2QQAh+QQFAwA/ACwFAAYACAAIAEAGJ8DfjyEQMITI5M8XSAYWAd5iumg0B4FsYPCD/ARCMPIgJAubyMAuCAAh+QQFAwA/ACwFAAYACAAIAEAGIMDfL0AMCI/IoQApCEyKxZ1SQDUaD0Lscfnj/hBIRCIIACH5BAUDAD8ALAUABQAIAAgAQAYewN8vQAwIj8ihACkI8IrFnVJANQoPV6ZwKeQhG6IgACH5BAUDAD8ALAUABQAIAAgAQAYkwN+PsVgwhMjkbxBIBpgLgVSwaBYC2EABKRB2kQdhWNhEBnZBACH5BAUDAD8ALAUABgAIAAgAQAYnwN+PIRAwhMjkzxdIBhYB3mK6aDQHgWxg8IP8BEIw8iAkC5vIwC4IACH5BAUDAD8ALAUABgAIAAgAQAYgwN8vQAwIj8ihACkITIrFnVJANRoPQuxx+eP+EEhEIggAIfkEBQMAPwAsBQAFAAgACABABh7A3y9ADAiPyKEAKQjwisWdUkA1Cg9XpnAp5CEboiAAIfkEBQMAPwAsBQAFAAgACABABiTA34+xWDCEyORvEEgGmAuBVLBoFgLYQAEpEHaRB2FY2EQGdkEAIfkEBQMAPwAsBQAGAAgACABABifA348hEDCEyOTPF0gGFgHeYrpoNAeBbGDwg/wEQjDyICQLm8jALggAIfkEBQMAPwAsBQAGAAgACABABiDA3y9ADAiPyKEAKQhMisWdUkA1Gg9C7HH54/4QSEQiCAAh+QQFAwA/ACwFAAUACAAIAEAGHsDfL0AMCI/IoQApCPCKxZ1SQDUKD1emcCnkIRuiIAAh+QQFXgE/ACwFAAUACAAIAEAGJMDfj7FYMITI5G8QSAaYC4FUsGgWAthAASkQdpEHYVjYRAZ2QQAh+QQFAgA/ACwFAAMACgAFAEAGHMBfpfITEnvCojJpHDqPFcSkOEFUer3hckH8BQEAIfkEBRQAPwAsBQADAAoABQBABh7A32DwExJxwqIyKSwwFgtGgZjTOYvSASg0KCynxSAAIfkEBQIAPwAsBQADAAoABQBABhzAX6XyExJ7wqIyaRw6jxXEpDhBVHq94XJB/AUBACH5BAXIAD8ALAUAAwAKAAUAQAYewN9g8BMSccKiMiksMBYLRoGY0zmL0gEoNCgsp8UgADs=", "pig"],
							"3:-O" : ["data:image/gif;base64,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", "cow", "3:-o"],
							":(|)" : ["data:image/gif;base64,R0lGODlhFQASAMQcAGYzAP/MmWYAAMyZZpkzAK1FFXUmAcRqQ8zMzIYsALB5QfrhyMxmM////wAAADMzM4BAAdihandJHJ6DVGYRAJqAU410SHtfOYtxR6OFUbR9R3lHFv///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAAcACwAAAAAFQASAEAFmyAnjmRpCkMQCAWRGMGDBEhjCGYOAGkwACeFIIA5HFqJBIEAoOBMgEKL0VMtFhbg6bkzGrUlgWIlOLoMCISBcRs8R4L4krAeVDIOwBsaZShSCzwpYDkjOzuFImI/AF5SUoSKf24XZi8GSihCcAMEK0cvAQ02aQZuJCgDAy10AQ4zMnE6rARUV1cTkYZStWNWh7okh6oqxcGFwCYhACH5BAUMABwALAkAAwAGAAYAQAUVIMcRpIggXNOIomEUcJK0BneKqxgCACH5BAkMABwALAsADAAIAAYAQAUWICeOwBhpHABxQZuyZTu1UTmy0XqPIQAh+QQJMgAcACwAAAAAFQASAEAFNyAnjmRpnmiKSpomAQAEqXTNBcGyWFIUbLagcEjEGXGOwIzIbDqfUJJEYjviIkmqympcqmCAUwgAIfkECQwAHAAsAAAAABUAEgBABaEgJ45kaQpDEAgFkRjB0wRIYwhmDgBppO0QkkAhCGAOh4KykEgAKDgTQElgpFSBxcKyO0V3SCQgN1wJki6D2oBAoKIjgZxAN1grGQcALp0yFFcqAzsBYzkjO12HHEODAGEtdIZCgAMCF2gvBpoDRHEDBCtJLzQIBg02lkIDrJEwDggxbnyIkVUDWloTkyVTLX9YKhMqEbwkiazBxEGLiIkmIQAh+QQJRgAcACwAAAAAFQASAEAFqCAnjmRpCkMQCAWRGMHTBEhjCGYOAJKmSTsIZCRQCAKYw6HALCQSAArOBGASGClVYLGwSCKBDUkw3SmVgFxxJVi6DHADAoGaEsmEvAFbyTgAdlRVDApZWloOAUM5HDs7jCJFA2ZKLXlpJZIDAhduLwafA0ZEAwQrSy80CAYNNptjA7GWMA4IMXSBI1V5VwNcXBNpEhIlVS2Eh4cRicTFO7HJWouQjY8mIQAh+QQJDAAcACwAAAAAFQASAEAFoSAnjmRpCkMQCAWRGMHTBEhjCGYOAGmk7RCSQCEIYA6HgrKQSAAoOBNASWCkVIHFwrI7RXdIJCA3XAmSLoPagECgoiOBnEA3WCsZBwAunTIUVyoDOwFjOSM7XYccQ4MAYS10hkKAAwIXaC8GmgNEcQMEK0kvNAgGDTaWQgOskTAOCDFufIiRVQNaWhOTJVMtf1gqEyoRvCSJrMHEQYuIiSYhACH5BAWQARwALAAAAAAVABIAQAWbICeOZGkKQxAIBZEYwYMESGMIZg4AaTAAJ4UggDkcWokEgQCg4EyAQovRUy0WFuDpuTMatSWBYiU4ugwIhIFxGzxHgviSsB5UMg7AGxplKFILPClgOSM7O4UiYj8AXlJShIp/bhdmLwZKKEJwAwQrRy8BDTZpBm4kKAMDLXQBDjMycTqsBFRXVxORhlK1Y1aHuiSHqirFwYXAJiEAOw==", "monkey"],
							"~:>" : ["data:image/gif;base64,R0lGODlhEgASAMQXAP8AADMzAMyZM////5lmAP/MM//MZpkAAP9mZswzM///mf//zFVfAP+ZAP//Zv8zMwAAADMzM//MAJkzAP9mAP8zAMxmAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAAXACwAAAAAEgASAEAFjuAlisB4IaYZGEMbsUakLEoRpCegHwCKk7rg7ncJFFqGh6PQIBwNghsuAThcgsSioFAQHA6CrXQUaLUggoEBMlsYxqIAwTKRNCgHBgFuqgAqCRdUgUQ9JIFVWQg9CTxgEHxxCmZmC5Y2KpQvajKWb2STSA8ADwozNXBGBAkSXHcEBFE/CIsTDTw+WSMlRCEAIfkEBQEAFwAsAgAGAA0ACABABSPgdRmOUVwFaYhs614CITM0LRNCnru6qMey34XwchGLSOQpBAAh+QQFAgAXACwCAAYADQAIAEAFL+B1CUIhXAdZiALhMjDsEmVhOIZp40W/i0CeaJcr3XIXE6nlWpYIu9WQRwBaracQACH5BAUBABcALAIABgANAAgAQAU24HUZjlFcBWmIQztAwmBAyrIYAqEzPK8TgmBQRBSKhDkd8kJwRQyySG1BULhWIkVNcSJ6iacQACH5BAUyABcALAIABgANAAgAQAUp4HUJRSFch0CKbOtexiBHsREpi1LKhlsMvYtCRhwsjoXL4OUKMp/MUwgAIfkEBQEAFwAsAgAGAA0ACABABSPgdRmOUVwFaYhs614CITM0LRNCnru6qMey34XwchGLSOQpBAAh+QQFAgAXACwCAAYADQAIAEAFL+B1CUIhXAdZiALhMjDsEmVhOIZp40W/i0CeaJcr3XIXE6nlWpYIu9WQRwBaracQACH5BAUBABcALAIABgANAAgAQAU24HUZjlFcBWmIQztAwmBAyrIYAqEzPK8TgmBQRBSKhDkd8kJwRQyySG1BULhWIkVNcSJ6iacQACH5BAXCARcALAIABgANAAgAQAUp4HUJRSFch0CKbOtexiBHsREpi1LKhlsMvYtCRhwsjoXL4OUKMp/MUwgAOw==", "chicken", "~:&gt;"],
							"@};-" : ["data:image/gif;base64,R0lGODlhEgASAMQfAP+ZzKUAIcwAZjOZM/8zZv8AAABmM8zMzCo/AFUfVWMEF852qpn/Zv9mmc4tYf/N5vuxyaoJYZKvoP1skl3DSPyNrPuWp//i8H4PO8YAFfyfvo4JMD6kSP2KsNMAEP///yH5BAEAAB8ALAAAAAASABIAQAWE4CeOZFkCQoQpWTFVTQCY9DeUxggshJA0hYCgMKs9AMjk43JAHGgAAsFRrIkWiUJHAwkSoNJeQKFIyJ7Wj8EwaK8HCAkUmdaJs4TqabEINDYJDkJ6JABjAS4WEAIyJwKPEWMeBQWMhCJJUwGbAE1oNAMUDAwPDDZNcjUMHG8Dawh1JjchADs=", "rose"],
							"%%-" : ["data:image/gif;base64,R0lGODlhEgASANUgADRGJ2iIVUhkOVd2RXiWZm2NW1JrQ3qkX1JrOWF+THKiU3qpW3SoU22UVXu0VW+aU3uwV2qLTnqwVXCcVXSmUjtQLXSlVmSCUHKdV1x4RkJXMXuyVXiyUnu2U3CYWXaqVf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAASABIAQAaWQJBwSCwSAQCBIZMIOAMJBBJpPAKqQgGBcDgsIgLMMyC4ggABQmBgQJYHH4tnYAYJNg5HR5AdDARlRVpbBYVPdGYACg1jTgkKYwVtQlNDSZRUgoB8Q2UAFYJdCxASfAIUDw9+dYNbXQVjA1KCF4aHdWccDBOQT01OfggGGgAIAbDAsgMMjMeTAAbRVJcAfnRYmNhYlUVBADs=", "good luck"],
							"**==" : ["data:image/gif;base64,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", "flag"],
							"(~~)" : ["data:image/gif;base64,R0lGODlhEQASANU/AOKHOIhLI5pYKuWGQgRbK9h6OPWnSMd1Of6lUqxcLGo6HNSEOvzOcIdUKPOvZcBtNP7uaf7NUkgmEvGJQEAiEFszGFArFLppMv2fSX9FIp5zRfqWRfWRRiuqb/2VTf2XQO2RSa5kLJdaNbZlLaZlMk4vGI5YM/CXQv6vTfeaTP+8U6h7O+iXTLhxN9WTROR5QfWdV5FOJ8JoJzqFQx2RW//sgtCjUeijSOiaW5ZrO+x3NM9vNeKxSsR6LgAmDv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgA/ACwAAAAAEQASAEAG3sCfcEikEQhEBGzzkDlYCE7gwECgDoKKMKYQBCQxk0SSoYyJQpxhMPEkABcB8TVIJKSxSaFRerQaGmVoQx1Igz8ODh8oJzsYHgEPGDEBFxk/ExsFGCAXPQggCjEfLhWiFj8XCQIFHwITHxEFPBErCqiHQoW5gx0zvAgGHAg7LDAxBQuRAUMIGAMGADsIGwEJHwkNB5cYCAMDVBGcCic1ECsCMRZsLSAgAiHPFhUFD2QBFN8XATI7AQUAIlQYYYCBAAUUftiJkWBBCA0HbOSI4KKEGTQKFEjIaKaCBCJBAAAh+QQFCgA/ACwAAAAAEQASAEAGkMCfcEgU+oqYT0LxG6R+GdKPNShCrVgi7AcYLh7YEAkQE/wOP8vvEsi6i4gh+Nc4xGO7dnE0h06qAWY/LVIjbAUyGA8sCFJvj5BWKRtnIBgiAF0/JlY3RSEYP3pECyQOA4AhPww5P4IgaBw/CVgBDRIFBUINZg8JcT8TDkRSIgIXTAkuPyhoFVkUzz8lPxREQQAh+QQJCgA/ACwBAAQAEAAOAEAGYMCfEPcbCI9IYUJgFBYCx0byl/mBML/A5WfgTL/g7wMLThyOgY8wIz3udA1AAbH7ocCouicJDf8Sbl8Yago9PxAaRxNCID8hXw0BFEcJjzsydxcnKkkxPwVSLX5HEgphQQAh+QQFCgA/ACwAAAAAEQASAEAG2cCfcEgUEooYTgHguKE4gQNDpToIKkJRRhCQBEwSSYYSLv5wqcHEkwA8BMVBIoQJxD4FU+nRamjGZoFFDg4fCCw7GB4NDxgxARcBPwMbBRggMj0IIAoCJy4VWxI/GiQCACoXKAYRLjwQKwoWgrS1tQ4pOAg7IB4iAAABD5JCCCkcKAA7CBsBCRgJDQcZPzAIAwALDBEqHAoGNbACArMTBwMgAnQDFhUFD2IBFNghCS4LGTofDBUjBgwCFFD4QSJBDAEuCmhYYUMDBBsWKAwkokCBhAoCL04UEgQAIfkECQoAPwAsAQAEAA8ADgBABlvAn/BnGAovxsmPxBEqG8LHEDbZFX4so/YXM3a3QgTHcAKDkcaPMPC7CH6FT+KEGUY0Q8Rvg9IutkpbHyNbPWaHPwBabANuMjsBBRMRWwkiQguEdgslPxJbCmZBACH5BAUKAD8ALAAAAAARABIAQAbOwJ9wSCwOYZtRzMHCcAIXBgpxEAxjGUFAEjBJLBmKRGLEGQYTT+L0sBJBCcEkIC80LI9LQ5Mx+o0OCB8oJzsYHg0PGDFQfRMbBRhwhiAKAR8uFQF3PxchAjs6DScAKgUGERoKFn+trq4IBhsoOyAeIgMAAQ8BQwgYAzcAOwgbAQkfIwE7fRgIuS0OKB+VBTUMGgJuEwcDIAIhGAAWFQUPEhm9Py8XASMyyzsqFSMGDAIKQnEmAgUCGi1caIiwoEQJMkQUKJBQQYGYCgiFBAEAIfkECQoAPwAsAAAEABAADgBABnzAn/CHgA1/gMvxN/iFML8YB/Ar/Q65I6dAvaGEh18k8jMJRaLlT6JGqH+B91G2+P4Ep6VI8CtgRigoZDwQK29uLDAxBQtqKRx2ag1hbkI9DBARHD8GP4U/DUI7PykJckNNCQuNOhtkFxEQQyIJMT8uBT8rNp42FhR6aadBADs=", "pumpkin"],
							"~O)" : ["data:image/gif;base64,R0lGODlhEgASANU4ADIjGGNeUXx0YoyGneXcvU9JPeHWuFBMQkM9NYiAbXpyYb+2nWNdUN3TtT85MGtkVo6Gcp6WgEI8Mrmxl9TLrk5KP52VgJ2Vf62ljs7EqaujizgsInJqWtHHrDYpHq+mjlJORMa+o2liU0A+NXx1ZJyUf42Fcs3EqdPJrX11ZFVRRcG4nsC3nVZRRUpEO2liVXdvXoN7adPLr+bcvWJcTrKpkq+nkI6Hc////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJDwA4ACwAAAAAEgASAEAGgECccEgcEIkCQuJQaDoRgCMRQK0GpNihMZucnWolE+kFgl4DUek2y27jBIZGZmKBKBgVByDAT+MQBCgrNhcxAS0bVldYA41uRWuPkjgXMho3KRwiNCojWEkEFAsYEQkPBxJVfnBydHZ4emdpcKGjpaepskQuHSEsHwIwHnzEk1JBACH5BAkPADgALAAAAAASABIAQAZ9QJxwSBwQiQJC4lBoOhGAIxFArQak2OwxOTvVSibSCwS9BqJSo3a9FhgamYkFomBUHICAHo1DEFArNhcxAS0bVldYA4tsRY2PRxcyGjcpHCI0KiNYSQQUCxgRCQ8HElV8bnBydHZ4ZmhunqCipKavRC4dISwfAjAeesGQUkEAIfkECQ8AOAAsAAAAABIAEgBABn1AnHBIHAyIQwEhcSg4nwgAkgioWgPTrBapnJ1qJRPpBYpiA9Ktep0VGBqZiQWiYFQcgIA+jUMQUCs2FzEBLRtXWFlGR2yNSEaNFzIaNykcIjQqI20EBBQLGBEJDwcSVnxucHJ0dnhnaW6eoKKkpq9ELh0hLB8CMB56wY5TQQAh+QQJDwA4ACwAAAAAEgASAEAGfECccEgcDIhDASFxKDifCACSCKhaA9OsFqmcnWolE+kFimID0q16nRUYGpmJBaJgVByAgD6NQxBQKzYXMQEtG1dYW0dsjFlGaxcyGjcpHCI0KiNtBAQUCxgRCQ8HElZ8bnBydHZ4Z2lunZ+ho6WuRC4dISwfAjAeesCNU0EAIfkECQ8AOAAsAAAAABIAEgBABn1AnHBIxA2KQgEhcSg4nwgAcgioWgPTrFGrnJ1qJRPpBYpiA1Ktej0VGBqZiQWiYFQcgIA+jUMQUCs2FzEBLRtXWGyKA0eKQoxrFzIaNykcIjQqI20EBBQLGBEJDwcSVnxucHJ0dnhnaW6eoKKkpq9ELh0hLB8CMB56wY5IQQAh+QQFDwA4ACwAAAAAEgASAEAGf0CccEgsEgWExKHAbCIAxiFgSg1Er7gBFjk71Uom0gv0tAagRi12vRYYGpmJBaJgVByAgB6NQxBQKzYXMQEtG1VWUWpsRAOLjFmPURcyGjcpHCI0KiNRSAQUCxgRCQ8HElR8bnBydHZ4ZmhuoKKkpqixRC4dISwfAjAeesOQUUEAIfkEBQ8AOAAsCAABAAEAAQBABgPAQRAAOw==", "coffee"],
							"(coffee)" : ["data:image/gif;base64,R0lGODlhEwATAMQAAPf3/+b3/+bv997v/97v99bm/9bm99bm787m/87m973e/7Xe/63W/63O96XO/5nM/5TF95y93pS93pS13oy11oSt1nOl1pmZmXOczmaZzP///wAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAaACwCAAAAEAATAAAFcaAmahdpjuhYrmnKli36xq4J0zia7Xy/64FBAaFYMByPRQYoJCqOyZ1EoMkEh0WokrITWJtZpFJzyEy+WKN4qeFaBdjnWuS+EtVRckaCvmszXBhedmFRZlQZBmByDw1sIhEVCWlHEBYSKAARPjwTACghACH5BAkKABoALAIAAAAQABMAAAVwoCZqF2mOqFiuacuWbfrG6EzfaabvvI5mgUEBoVgwHI9F5hccKhTHpE4i0ACFRCNSSdEJrk6tVHPITMDZqFLUBQqc0O1S026m5eSMBF1UZ7oYX3Z9cmZVGQZYT1ENcyIRFQlhRxAWEigAET07EwAoIQAh+QQJCgAaACwCAAAAEAATAAAFcaAmXhpJimharqeqmqubwq1My3ie7Xy/p5nAoIBQLBiOxyIDFBIVCqRyJxFogsPiMbmk7ATY53aqOWQmYa10KfIGBc8ol6lxO9XzckaSNq4zXhhgd35zZ1YZBllQUg10IhEVCWJIEBYSKQARPjwTACkhACH5BAUKABoALAIAAAAQABMAAAVyoCZeGkmKaDqWrKqarbvCMgqfda5mfO/zqUxgUEAoFgzHY5EJDosKRXLJkwg0QqIRqWRSeIIslEvVHDIT8XbKFH2FAqi029S8n2u6OSNRH9kZXxhheH90aFcZBlpRUw11IhEVCWNJEBYSKQARPz0TACkhACH5BAkKABoALAIAAAAQABMAAAUVoCaOZGmeaKqubOu+cCzPdG3fOBkCADs=", "coffee", "(coffee)"],
							"*-:)" : ["data:image/gif;base64,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", "idea"],
							"8-X" : ["data:image/gif;base64,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", "skull"],
							"=:)" : ["data:image/gif;base64,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", "bug"],
							"(bug)" : ["data:image/gif;base64,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", "bug", "(bug)"],
							"(cake)" : ["data:image/gif;base64,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", "cake", "(cake)"],
							"(call)" : ["data:image/gif;base64,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", "Call"],
							"(cash)" : ["data:image/gif;base64,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", "cash", "(cash)"],
							"(cellphone)" : ["data:image/gif;base64,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", "cellphone", "(cellphone)"],
							"(wait)" : ["data:image/gif;base64,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", "wait"],
							">-)" : ["data:image/gif;base64,R0lGODlhEgASANU/AOzETgFaYcyFPffmmgABAYtjMgJGSyirtBmLlNmzWANgaPbiVwc6Q/TWbiGdpvfqZUynqP///wEpLBp9gylzdf75yvj4ci24wml0bQdweM6cM/jxam2UcbGFNeSvO/3557rW2AlrcvO8Ms5mDeq2NP758be3b/TLQGYzMx2Wn+Ps6g5ka8vS0jMAmfjofj5njtfp6oFeNxB2fHtOMuqyLy+/yPC2Lj1wSyFZVT6IjvP4+bRmIxxjW6mHWDBcYf///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAA/ACwAAAAAEgASAEAGosCfcEgsEguRxcZieTgfzM3iVDD+Ctis9VryLB4bgWDzWHho1WFhAN4QUHBCmWrEfgaN00mELRZKAwAaEREjAoQaAAt8QgUVLktMIpNRU2mNAC4LGnAoGical3VZfVt/HgIjCwuGHjaiVx8eFREvHh4vERUedI0RkA+pt4ZQlr5gTMnJUr0FDS7ICQTTGmQLJJcFAANfb3FToaMienrYsFvoQQAh+QQFCgA/ACwFAAoACAAGAEAGFsCfcBjYBByOwHApDDCUy6MyAI1WhUEAIfkEBQoAPwAsBQAKAAkABwBABhzAn/AXEAaKQ+QwiXM4iseZchlwCJ8NoxHqrCqDACH5BAkKAD8ALAMABwAOAAsAQAY/wJ9wSAr8AshhwHF0BADDKDJAqFp/zln0R1gunUpmVUhYTIVn43aNdjrA27EaG4h9nVVU9z0/GlFsTUxMMWtBACH5BAUUAD8ALAAAAAASABIAQAZ6wJ9wSCwaFxuL5SFpNgPQADHgcFADsULByBV6XpFKlxKVGM5VzmnbHY4EnnbRs7tWpUPXxmk+G544U1BOVBonGmxyilwCCwsncYsCEVAAUEV6DwIjHk9Qd0QPSXx8VFZ5g01+fxIkiT+mAX1Vj4hFsVYAJ66vQ1GXbUEAIfkECRQAPwAsBgAIAAwABwBABi3An/DHYKwyw9/qF6AEIipMklikOHWsydAgk02/VecPImQYGNYnbMohUAigbxAAIfkECTIAPwAsAAAAABIAEgBABnLAn3BILBqHjORkEmg6HIFhwPGbBgqFo7bYbA5z3gjBQYhEnlDedr1OKn5vWZaoXAbMrSdkXhXKAhA5gk03fGyHiIdQDm9aOUmQVVFGdUxmEU2GHAwtAZYRLRlPV0JTUKIOGapQATyGUz8+UBC0akeTiEEAIfkECQoAPwAsAAAAABIAEgBABpbAn3BILBJxlFZgEohEWhmH1BGg/qpUamAbKBiFhZJnYTBMJuWAhnvlVqNSgjRw8hYLhc+gcRoJPHZDYSZmZ00qOVlWVxlwjXBTVHZuWwQEWGqBRnicmndiAiM3BiYLJ4B3HxxlhjkrigFgEYVMTi0IEzIKbFURcgROkXNbPwUBjcKwJF6YXFGXVCcagc1cc3hF1otfQkEAIfkECQoAPwAsAAAAABIAEgBABs7An3CYSDSGv4BD6QAEIi3lE5pxOA6Xi4IZ6Aq73V5H0ynEhopMBpE6uBEhBcKR2iIVqSpiIrkqkEQKaWqECIZbAT8rARNXNRchIBERVgc1fx4VIVUOhFaOBwoAFks9AAM/CgQEAYdCCwsnSBoDK4hggkw/JQmDanOfVggKDqkZMikOF48UK5OVKz8fASoBbRdTLZ/LW04OEQQOBM+VF6FdRi5qwQ4TMuZ/XwEeAw+LCgYSIQgyQw8LYBIASLVlwgQFJxKeICHAihRAEIUEAQAh+QQJCgA/ACwAAAAAEgASAEAGtkDN4DNo/I7I5A/m+AUirYDjCc04HIfLRcFiPZSBcAB5KpOOikwGkTq4ESEFwpFS/ABIRcqKmEiwdkgVeWlqhgiIgT8rARNYNRchIBERVwc1dh8/IVYOhlePB4pKCgQEAYlJDyWDSCsKYmEKCjqkhmugoAiBaTIpDheQFCuUlitHASoBbRdULaDBgVIRBA4ExZYXokpquQ4TMtqKHkmMCgYSIQgySu2zjROjPwsOA+1KHRodBTFBACH5BAX0AT8ALAAAAAASABIAQAaVwJ9wSCwSA5FWwIFMZhyOw+WiMAoD2IBVqMhkEKmDGBFSIBypKlGReiImkqjaqOh674j8fBWYRGsXISAREVAHNXMhTw53UH8Hc0UKBAQBeltDKwpZWHU6kndfjo4Ial0yKQ4XgBQrhIYrVyoBYRdNLY6raksRBA4Er4YXkEVeow4TMsORRHwKBhIhCDKYXJsTE8zVmEEAOw==", "alien", "&gt;-)"],
							":-L" : ["data:image/gif;base64,R0lGODlhEgASANU/ALSOQ/7Sv5mZM968qHluX/nPuti6pf3SvurWxvzRvfXNtv////DJseTBpuzGrfLKs/HKsu3MtPrQu/fOuPPLtfXVw/z7+vLdzefDqcDAwOfCruTCqszMMwAAAMWhfrCZi+LApfLNtvbNt/Hf0ffu5+3Ir+K/ouG+qvTPuta2mfjq4O7NufnPu93HsPjPutrCpvPPutW6pP349frQvNO1nuHBq+HCrPz38+XPefPYx/jPudq7nffp3/DJsvbh0////yH5BAEAAD8ALAAAAAASABIAQAazwJ9wSCwSAQuK5LDoBAKdxaHw2ACMP4B2i81aVBCRq1DQKRgY2nUIGMFOg4Qm/vmsrEbt7RJpmAZaRQAWPnMDA084GRkKDgZrACQVBQlPh08JBT02a0IALwglEBQUECUNHp15W4Fdgzw9DA8PDA4NMapZMiETMwkHBwkcEwwNnUgVAsrLzBw1kAsoS0/UAQcsVZAIOSIE3t/eIg5qbC0XvAUSEgUiEBipqzsghyAprV34Q0EAOw==", "frustrated", ":L"],
							"[-O<" : ["data:image/gif;base64,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", "praying", "[-O&lt;"],
							"$-)" : ["data:image/gif;base64,R0lGODlhEgASANU/AItjMu61PP///2ZmZswzM/j5c/+9ANl9NtSTMJkzM6dOMvj2cPXaUfj4cvXMQfXJOvTNQ/jwavv7+7dDM/bhWf758fblXWYzM4SChPjzbf7558zM/+q2NNWhM/nllPPHPPjvaPTRR/vxvffqY/PDU/jVevfdf+qyL/XYZPjnhvzwy/nonvC2LvjpetFKOffrZO+8NO6/TsA8M/PMQVxcXPC6M/jjPPfoafj1b/fuZ/S+MfbgXPbiWfPLQPblZf///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgA/ACwAAAAAEgASAEAGuMCfcEgsEieCAOJhMAQCTQMi4JgYf4Cs9oqtiHiviBg0ooROACJgFTgEJBu4xO1IF7MaD2r20WXvFSsvGQsNBQUNCxkjDDV2CiotEYWHhw04IBQPCmoxJgxPTwwOHXZXWltcAF47PBYWFAw9LKZCABo+ORk4Cws4GTkUdUMKSQaUTYg4TptCSDcBGANTSgMYARYOMrYlKS4ECQkE4OIENhymACQebRfjF24hpUZZMB8QEB/otVz9P0EAIfkEBQoAPwAsBAAFAAoABABABhpAn2EYCAwNFIFSUFwKEDQapoiJIhDLphIRBAAh+QQFyAA/ACwDAAMADAAFAEAGJcDfDzHACDEDhFApbDoRCIGAJhBOpcqoNBCQCpQY6aX6E4wFmCAAIfkEBQgAPwAsAwADAAwABQBABirA30+04wkpjJ4wIGw6fwGNz0AVUg0Ux5D3inhBI0rot0LQaBgh5oxgBAEAIfkEBQgAPwAsBAAFAAoABABABiDAXy6DWyxwmdzPsGgUDIZCA2d4ZZoF6SIz+j2gvyU4CAAh+QQFFgA/ACwDAAIADAAJAEAGLsCfMBAYFoXGI1EpGDgFzScxOoA6q0Kq9YlsCqbYX6D5g5KhReivqg6X32+BMAgAIfkEBQgAPwAsAwACAAwACQBABk7An1DjEX50wuSiURAWGjjh6pVZFp6LzIhREfFekTBoRAkJEQ+DIRBQGxBJ0Y5nsVAYvaEv98MtFlE5FA4/Bgs/BWpNOAZJGD9wkD+PP0EAIfkEBRYAPwAsAwACAAwACQBABi7AnzAQGBaFxiNRKRg4Bc0nMTqAOqtCqvWJbAqm2F+g+YOSoUXor6oOl99vgTAIACH5BAUIAD8ALAMAAgAMAAkAQAZOwJ9Q4xF+dMLkolEQFho44eqVWRaei8yIURHxXpEwaEQJCREPgyEQUBsQSdGOZ7FQGL2hL/fDLRZRORQOPwYLPwVqTTgGSRg/cJA/jz9BACH5BAVkAD8ALAMAAgAMAAkAQAYuwJ8wEBgWhcYjUSkYOAXNJzE6gDqrQqr1iWwKpthfoPmDkqFF6K+qDpffb4EwCAA7", "money eyes"],
							":-\"" : ["data:image/gif;base64,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", "whistling", "(whistling)"],
							"b-(" : ["data:image/gif;base64,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", "feeling beat up"],
							":)>-" : ["data:image/gif;base64,R0lGODlhFgASANU/AItjMmZmZv///5CQkPfiXdOEIP//zPj5c0FBQfTJQPj3ceu3M/nll7y8vPjxavbiWvK+M/TNQ8zM//j4cvXTR/nvYGxsbPjzbffrZPblXvPIPZlmM8yZM/XbUvS6LQAAANesV/fqY8DAwJ2aiPfic/714oJXMvjnivv1VPfaefr2XuvJbPXcV/vxlfjoefbjX97VrffnyXlLMv343vvorvPPSPr7Y/flafv5WPjvadexQ/PNQvfuZ8Kxa56env///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFZAA/ACwAAAAAFgASAEAGs8CfcEgsGo2ASMahOBCe0KcAcCQCrtiq1UN5YARgVChRKJiqyQfvolBAKzcGVXuF1Mqt0pUO6WDYCRISEwkCHwIwc1YaDzkKHJBlBRsbLjSKRQALER0PGRkPLCkgmHRYe1pDAB47HQUJCQ8kMzGlVhFqFwmHOCqFAjJHAIyOEwfHZYESU0hKTDo2x8duG8yZfX8KxgcTChcYJyu2P6tdGDkODjkYLwykqXUaEREaC6ip+ENBACH5BAkKAD8ALAEADwAJAAMAQAYVwF9g8Cv6EIOAQTBUChDKQDFpQAQBACH5BAkKAD8ALAAAAAAWABIAQAY8wJ9wSCwaj8ikMMAMIJTQKDFgCAgH1Kd0y+16p1WsQfstm8/odGAwHCHYUapgLSdD5XWAFBtoGAQIdklBACH5BAkKAD8ALAAAAAAWABIAQAbVwJ9wSCwaiYEBIJIZIQaEqDQqAAgHSUFyIGggAGDwsQjwUB4YgRoVShQKpmLAoKUjLgqFtHJjWMc/YBA1by0lYmMAEB0YeAkSEhMJAh8CMH8/c1pYdhwcbwUbGy40mFgBDXYIHQ8ZGQ8sKSCYgIFhiLWBHjsdBQkJDyQzMbRkEQ88FwmVOCqTAjJHABoPOQoTB9lvjxJVQ3MBS5wINtnZehve3wZJcwjX2RMKFxgnK8UB+QEIaDkODjkwvGAwCwm7fA26INAQIYKGBbiEWGCHJZXCXEEAACH5BAkKAD8ALAAAAAAWABIAQAbKwJ9wSCwaiQGDIClAHAjQKFQAIA4C2MDgB+h6j0It1zNCDARoVChRKJiG17P23EAoFNHKjVEFcwEQNW0tJV1GTFpMCAkSEhMJAh8CMH0/VwENSggIHJ1tBRsbLjR9FnKZDXUDDxkZDywpIJV+f16zfgAeOx0FCQkPJDMxt0kBXFcGi5I4KpACMkXFyAgTB9ZtjBJU0Vl2OjbW1ngb22EGWQ0CddUHEwoXGCcrpedXmeoIOQ4OORgvDLKQYEqlCoKGCBE0LDBEqyGRIAAh+QQJHgA/ACwAAAAAFgASAEAG7cCfcEgsGokNw8CiXB0I0ChUABAOAoNGdoD4Ab7g40A0EAI8PRFCwEaFEoWCaYhVBiwNQQOhUEQrNwxVR2YAEDVxLSVfRgMGDYaOAwoJEhITCQIfAjCDS3UCaggcpHEFGxsuNFUWIiIWeAYGEgEBFBkZDywpIIOEQ2BhjRZlZh4IAwUJCQ8kMzG+PwGyZQARMAIICZs4KpkCMkQBrg3jBggTB+pxlRJURFfECHw6NurqfhvvP0xXWBJK0KmboOAChhMrWL3S0sqAHgQ5HDjIgeEFg15WLEjIYkBEAwsIIGiIEEHDAkZGLNS686tIEAAh+QQJFAA/ACwAAAAAFgASAEAGysCfcEgsGokBgyApQBwI0ChUACAOAtjA4Afoeo9CLdczQgwEaFQoUSiYhtez9txAKBTRyo1RBXMBEDVtLSVdRkxaTAgJEhITCQIfAjB9P1cBDUoICBydbQUbGy40fRZymQ11Aw8ZGQ8sKSCVfn9es34AHjsdBQkJDyQzMbdJAVxXBouSOCqQAjJFxcgIEwfWbYwSVNFZdjo21tZ4G9thBlkNAnXVBxMKFxgnK6XnV5nqCDkODjkYLwyykGBKpQqChggRNCwwRKshkSAAIfkECUYAPwAsAAAAABYAEgBABu3An3BILBqJDcPAolwdCNAoVAAQDgKDRnaA+AG+4ONANBACPD0RQsBGhRKFgmmIVQYsDUEDoVBEKzcMVUdmABA1cS0lX0YDBg2GjgMKCRISEwkCHwIwg0t1AmoIHKRxBRsbLjRVFiIiFngGBhIBARQZGQ8sKSCDhENgYY0WZWYeCAMFCQkPJDMxvj8BsmUAETACCAmbOCqZAjJEAa4N4wYIEwfqcZUSVERXxAh8Ojbq6n4b7z9MV1gSStCpm6DgAoYTK1i90tLKgB4EORw4yIHhBYNeVixIyGJARAMLCCBoiBBBwwJGRizUuvOrSBAAIfkECfQBPwAsAAAAABYAEgBABtvAn3BILBqHAUNgkEQoDoSoNCoACAOBhraBGPwA4PCxCPBQHhiBGhVKFAompBLbEHAvCoW0cmNYx18AEDVvLSVgRUkBX0wGTgkSEhMJAh8CMH9XWAEIOQocoG8FGxsuNFYWSkwNBnYIHQ8ZGQ8sKSCZgIFhuIBlOx0FCQkPJDMxvEtCACNdFwmWOCqUAjJyAktJAggTB91vkBJV1tlOOjbd3Xob4j9MWa0ICHjcBxMKFxgnK1ZMA9cD/rhgyOHAQQ4MLxjcEmLB3zstXSBoiBBBwwJERdxh8ZJrSBAAIfkECQoAPwAsAAAAABYAEgBABtXAn3BILBqJgQEgkhkhBoSoNCoACAdJQXIgaCAAYPCxCPBQHhiBGhVKFAqmYsCgpSMuCoW0cmNYxz9gEDVvLSViYwAQHRh4CRISEwkCHwIwfz9zWlh2HBxvBRsbLjSYWAENdggdDxkZDywpIJiAgWGItYEeOx0FCQkPJDMxtGQRDzwXCZU4KpMCMkcAGg85ChMH2W+PElVDcwFLnAg22dl6G97fBklzCNfZEwoXGCcrxQH5AQhoOQ4OOTC8YDALCbt8Dbog0BAhgoYFuIRYYIcllcJcQQAAIfkECQoAPwAsAAAAABYAEgBABtPAn3BILBqNgEjGoTgQntCnAEAMWAMIIWDLPRYBHsoDIyijQolCwTQMGALCgRtxUSiglRuD6v1tITVqLSVbfQAQHRh1CRISEwkCHwIwfEQAGg85ChycagUbGy40lW4BcgYIER0PGRkPLCkglX1+XIW0Wh47HQUJCQ8kMzGzXxEPPBcJkjgqkAIyR5eZChMH1mqMElNISkw6NtbWdxvbQqZ+ECMIA9TWEwoXGCcrfG4CpvYIGDkODjkYLxjIqmLgXkEEhzREiKBhwa0hcgI0OJgF148gACH5BAUKAD8ALAAAAAAWABIAQAbGwJ9wSCwajYBIxqE4EJ7QpwAgDBgCwoEVAeh6j0WAh/LACM6oUKJQMIGTD95FoYBWbgwq+NeF1NgtJV17ABAdGHMJEhITCQIfAjB6RAAaDzkKHJpsBRsbLjSTYQsRHQ8ZGQ8sKSCihF6De0NiOx0FCQkPJDMxrpQRcRcJkDgqjgIyR5WXChMHz2yKElNISkw6Ns/PdRvUYYaIzc8TChcYJyu+fGNlOQ4OORgvDK1EAQNDPggDEBoRERoWxBpiRcC9gghkCQkCADs=", "peace sign", ":)&gt;-"],
							"[-X" : ["data:image/gif;base64,R0lGODlhFgASANU/ANq0TmZmZvj4cvr4y0tGPPj1b5GRka2trf7++/fcV6pyLFZWV8uKOvn46vW4M/v52dXV1cnJrfnml/XUTHV1c9LKZ4iFd/brZOqcG/KiGrKvac5mDfLffPjxa/SzKvfhWvTCPPj1jPnwmPbmbY6DUbq6u/jrZvXJRfSrJ/fnYsfHyffxZ4aGhurq139/gebmyp+fnry8o9nZx/bsfPr4q/juaDs1KOnp6JWViXdwTqegZKysksaCJYhTL6hpLP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgA/ACwAAAAAFgASAEAGx8CfcEgsGoeBQUCRcSQuBYF0WgghFMJAoMQtEQw/hXh8LDJPn0unwGYjBtisUltCeCeflKnWuYwkcWViEyMzIg8NYkVJAWFNCSYFG1NSBQ9wRFpaBCeQa1IboRsiWIwGWwN2BBkoDiCvIACBZUJjZLRDCh54Fyu+Vg+zp2BhuylrDKECoVdIqUuPkZTLBTTNcggBPsaflFXBSKgIBAR4JshsNSIcWMPZBgaqDicTCR8JCRKyWfGoXF8YMgjMgEFRkVOaiOESEgQAIfkECQoAPwAsAAAAABYAEgBABtvAn3BILBqJgUgk4EhcCoKotBBCKIaBwKFUoiwMirD4WFRkTp9Lp8BmIwZXoSHwMiwokC46Zap1LiMScWRhEyMzIg8NYUcBAwEZTSYFG1JRBQ9wRHNZOSQJJmtRG6QbInEBMiwBBi8NDS4LHg4gtSAAg2RCYmO6QwoeE2krxFUPuXKswBMpawykAqRWRQEtEEygUJYbBTTTSA0Bwc3aUyHHQxQBCyUDNzYAH6EFDGw1Ihxxcy4QXwcIMAicmJDgQ4IEEnBhMXAAxoMXKmAswJChYgYMjIxwYuWLSBAAIfkECQoAPwAsAAAAABYAEgBABtXAn3BILBqNgZchcSkIntBCCKEgBgIGFWVBMSi+3yPREMicPpdOYb1GDKpCQ8yiOixYt8DikzLVOhcjEnBiXxMjMyIPDWFiAQgBCSYFG1BPBQ9vRDBXFFeSak8boxsicGQlLgYRLQgQCygOILMgAIRiQmBguEQKHhNoK8JTD7dWEQETKWoMowKjVEdJS5OWzwU00UUBJSUGaU6WUsVDVwMLBwMQBB8mzGs1IhynMRFdATAQDRYnEwkfCRJIsGXFQIkWMlpAMEAgg8MMGBoZIXPFAK8hQQAAIfkECQoAPwAsAAAAABYAEgBABtLAn3BILBqNCl6gFSgIntBCCKEoBgIGw2Jh6Cm+1SNRwQgALp2CWo0YhIWBCKsEW8AgNkDKVOtcRhJvR18TIzMiDw1fYj8KGQEPTRtQTwUPbkRXOxQsFAsaaU8boxsibwZYJTIDDQgHCw4gsiAAgoxgYIxjHhMfFyvAUw+2Y3EBFwUMowKjVIOPDS4VlMwFNM5EqAEWKgEVTpRSw0MBMQENXAMlCyZpDGo1IhxvASrrFC4HCCUAEwkfCRJIqGUFRokHJW5AWMAgg0MMi8RoM6BrSBAAIfkECQoAPwAsAAAAABYAEgBABtDAn3BILBqNCp4jEGsFBFBoIYRQFAOBiEwFgREUYOuRqMicPpVOYb1GDMTDwGCBCLAGMFLKVOtcRhJwR2ATIzMiDw1gYz9lDjpMT1ECBQ9vRQYBOAEkBwEVBVAboxsiggEHBhQwLFwBDCCxIACCjGFhjGQeEx8XK79UD7W6ExUBGgyjAqNVgxkOCQENkqIFNM1FCgEe0gE6k5QhwkSZWRYsLgsaagxrNSIcpyUGqgElKjYACR8JCRK0mAKoaPFiAIIGLBhkyIBh0ZhyWAjk+hEEACH5BAkKAD8ALAAAAAAWABIAQAbMwJ9wSCwajYqMA1AJyCABgbQQQiiOAUMABlvYFOBjMXn6XDqVSmGNGFyLAQiXtZDJKJVa5zKSvMVgEyMzIg8NYYBKCSZNAwEaUw9uRVoBODILFDBRAhueGyJ/QlsqAy8xNxALACCtAKJiP2CzsIAeE2YrulUPtUMKtykdOgE+G50bVkdJDosaAS8BFZ0FNMqUAdnECNJSAlS9RRR3EAYuEY8FDGs1IhywWS4sFAYwEDYVHwkJEq9YBipaIECgggSDDBgQxcqWzUasH0EAACH5BAkKAD8ALAAAAAAWABIAQAbQwJ9wSCwajQqeIxBrBQRQaCGEUBQDgYhMBYERFGDrkajInD6VTmG9RgzEw8BggQiwBjBSylTrXEYScEdgEyMzIg8NYGM/ZQ46TE9RAgUPb0UGATgBJAcBFQVQG6MbIoIBBwYUMCxcAQwgsSAAgoxhYYxkHhMfFyu/VA+1uhMVARoMowKjVYMZDgkBDZKiBTTNRQoBHtIBOpOUIcJEmVkWLC4LGmoMazUiHKclBqoBJSo2AAkfCQkStJgCqGjxYgCCBiwYZMiAYdGYclgI5PoRBAAh+QQJCgA/ACwAAAAAFgASAEAG0sCfcEgsGo0KXqAVKAie0EIIoSgGAgbDYmHoKb7VI1HBCAAunYJajRiEhYEIqwRbwCA2QMpU61xGEm9HXxMjMyIPDV9iPwoZAQ9NG1BPBQ9uRFc7FCwUCxppTxujGyJvBlglMgMNCAcLDiCyIACCjGBgjGMeEx8XK8BTD7ZjcQEXBQyjAqNUg48NLhWUzAU0zkSoARYqARVOlFLDQwExAQ1cAyULJmkMajUiHG8BKusULgcIJQATCR8JEkioZQVGiQclbkBYwCCDQwyLxGgzoGtIEAAh+QQJCgA/ACwAAAAAFgASAEAG1cCfcEgsGo2BlyFxKQie0EIIoSAGAgYVZUExKL7fI9EQyJw+l05hvUYMqkJDzKI6LFi3wOKTMtU6FyMScGJfEyMzIg8NYWIBCAEJJgUbUE8FD29EMFcUV5JqTxujGyJwZCUuBhEtCBALKA4gsyAAhGJCYGC4RAoeE2grwlMPt1YRARMpagyjAqNUR0lLk5bPBTTRRQElJQZpTpZSxUNXAwsHAxAEHybMazUiHKcxEV0BMBANFicTCR8JEkiwZcVAiRYyWkAwQCCDwwwYGhkhc8UAryFBAAAh+QQFCgA/ACwAAAAAFgASAEAG28CfcEgsGomBSCTgSFwKgqi0EEIohoHAoVSiLAyKsPhYVGROn0unwGYjBlehIfAyLCiQLjplqnUuIxJxZGETIzMiDw1hRwEDARlNJgUbUlEFD3BEc1k5JAkma1EbpBsicQEyLAEGLw0NLgseDiC1IACDZEJiY7pDCh4TaSvEVQ+5cqzAEylrDKQCpFZFAS0QTKBQlhsFNNNIDQHBzdpTIcdDFAELJQM3NgAfoQUMbDUiHHFzLhBfBwgwCJyYkOBDggQScGExcADGgxcqYCzAkKFiBgyMjHBi5YtIEAA7", "shame on you"],
							"\\:D/" : ["data:image/gif;base64,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", "dancing"],
							">:/" : ["data:image/gif;base64,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", "bring it on", "&gt;:/"],
							";))" : ["data:image/gif;base64,R0lGODlhEgASANU/AOKpO4tjMsVvYvrxt/bjXOW3Ueqvefj4cnxSKfv7+/XaUfz36rJNKZBSJfjxa/nll2ZmFfjZff///++9NvPHPNqrn5mZM8PJv/758crKZfTNQu6af/r6lvfrZPjpe+EfkffHqpY1IAAAAOfHvz5nju3UWf/M//OOtvS/MpFcUPXYZI+lgPfmar9tWfn0h/zwy/jnhvfoacqDYvDVr/PDU+vATcZsGVBQG86PgNuQItfa7n9fINuqRPjwafjuZ////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJMgA/ACwAAAAAEgASAEAGzsCfUBgoGofIgCTmODifTodih0Agr0IEJMG1EheVykUikR0qOkKlkaQ9CJ2e4bPpEBAWRJeIGRD+fwoAOQFJEh44KyIhEjMAixIjAIU/AREwHSB0TxsnegkWCV6VARMUGhoUegIWGaJJAQsPKqkoRVgBfQIVDC0OPTy8ApSVGAYCFyRjCwcpJJE2lEoELhwcAwUFJSU1ADIT0i8ePVBPJhVVohaVDyw+IAATBycTKHdcGeuVNREKgAQKELgS9QqWkU8JTCSAgAVLFQg3hgQBACH5BAkKAD8ALAAAAAASABIAQAbIwJ9QGCgah8iAJOY4OJ9Oxw6BQFqFCEhiWx0GFpXKRSKRHSo6QqWRpD0InZ7hs+kgLAiuFzMg+P0KADkBSRIeOCsiIRIzAIoSIwCEPwERMB0gdE8beQkWCV1EARMUGhp5AhYZoFZFCw8qGhQoRVcBfAIVDC0OPTy6ApOUGAYCFyRjCwcpJJA2k0oELhwcAwUFJSU1ADIT0C8ePVBPJlSgFkQPLD4gABMHJxMonRnoRDURCn8ECKugrK2MdEpgIgGEK1eoQLiBJAgAIfkECQoAPwAsAAAAABIAEgBABr7An3BILA4DEoKLwxkUCqVSbYdABIy/gBYBSXgRxQBmIKgwWo4ezyy4Hh8sHwgwOZwQFsQ3HFg8VBoUKFphGAYCFyQXEgsHKSQSIzZuAS8ePQeZmnoJFglgRzURCgQEegIWGZ9YWVqurFljpbMKADluRwsVFYsSMgcVOgQVDUcSHjgrIiESMwDLkQCUEjEOmtdVnxZCAREwHSAfG5obnBnb3DQPBB09Bh8Iqp+rRFoTFBqcCSYJELBDVSDcKBIEACH5BAkKAD8ALAAAAAASABIAQAa/wJ9QGCgah8iAJOY4OJ/OHQIRQFp/CEhii7AGFpXKRSKRHSo6QqWRpD0InZ7hs0FYENwkZkDo9xUAOVVDSh44KyIhEjMAiRIjAIMBETAdIHRPeAkWCV1JARMUGngCFhmdV0ULDyoaFChFqXsCFQwtDj08tQKDPwEYBgIXJGMLBykkjzaSEgQuHBwDBQUlJTUAMhOSLx49UJl4doQPLD4gABMHJxOaGRZJNREKfginnaipRZoJJgkQV1emQLhhJQgAIfkECQoAPwAsAAAAABIAEgBABr7An3BILA4DEoKLwxkUCqVSbYdABIy/gBYBSXgRxQBmIKgwWo4ezyy4Hh8sHwgwOZwQFsQ3HFg8VBoUKFphGAYCFyQXEgsHKSQSIzZuAS8ePQeZmnoJFglgRzURCgQEegIWGZ9YWVqurFljpbMKADluRwsVFYsSMgcVOgQVDUcSHjgrIiESMwDLkQCUEjEOmtdVnxZCAREwHSAfG5obnBnb3DQPBB09Bh8Iqp+rRFoTFBqcCSYJELBDVSDcKBIEACH5BAkKAD8ALAAAAAASABIAQAa/wJ9QGCgah8iAJOY4OJ/OHQIRQFp/CEhii7AGFpXKRSKRHSo6QqWRpD0InZ7hs0FYENwkZkDo9xUAOVVDSh44KyIhEjMAiRIjAIMBETAdIHRPeAkWCV1JARMUGngCFhmdV0ULDyoaFChFqXsCFQwtDj08tQKDPwEYBgIXJGMLBykkjzaSEgQuHBwDBQUlJTUAMhOSLx49UJl4doQPLD4gABMHJxOaGRZJNREKfginnaipRZoJJgkQV1emQLhhJQgAIfkECQoAPwAsAAAAABIAEgBABr7An3BILA4DEoKLwxkUCqVSbYdABIy/gBYBSXgRxQBmIKgwWo4ezyy4Hh8sHwgwOZwQFsQ3HFg8VBoUKFphGAYCFyQXEgsHKSQSIzZuAS8ePQeZmnoJFglgRzURCgQEegIWGZ9YWVqurFljpbMKADluRwsVFYsSMgcVOgQVDUcSHjgrIiESMwDLkQCUEjEOmtdVnxZCAREwHSAfG5obnBnb3DQPBB09Bh8Iqp+rRFoTFBqcCSYJELBDVSDcKBIEACH5BAkKAD8ALAAAAAASABIAQAa/wJ9QGCgah8iAJOY4OJ/OHQIRQFp/CEhii7AGFpXKRSKRHSo6QqWRpD0InZ7hs0FYENwkZkDo9xUAOVVDSh44KyIhEjMAiRIjAIMBETAdIHRPeAkWCV1JARMUGngCFhmdV0ULDyoaFChFqXsCFQwtDj08tQKDPwEYBgIXJGMLBykkjzaSEgQuHBwDBQUlJTUAMhOSLx49UJl4doQPLD4gABMHJxOaGRZJNREKfginnaipRZoJJgkQV1emQLhhJQgAIfkECQoAPwAsAAAAABIAEgBABr7An3BILA4DEoKLwxkUCqVSbYdABIy/gBYBSXgRxQBmIKgwWo4ezyy4Hh8sHwgwOZwQFsQ3HFg8VBoUKFphGAYCFyQXEgsHKSQSIzZuAS8ePQeZmnoJFglgRzURCgQEegIWGZ9YWVqurFljpbMKADluRwsVFYsSMgcVOgQVDUcSHjgrIiESMwDLkQCUEjEOmtdVnxZCAREwHSAfG5obnBnb3DQPBB09Bh8Iqp+rRFoTFBqcCSYJELBDVSDcKBIEACH5BAkKAD8ALAAAAAASABIAQAa/wJ9QGCgah8iAJOY4OJ/OHQIRQFp/CEhii7AGFpXKRSKRHSo6QqWRpD0InZ7hs0FYENwkZkDo9xUAOVVDSh44KyIhEjMAiRIjAIMBETAdIHRPeAkWCV1JARMUGngCFhmdV0ULDyoaFChFqXsCFQwtDj08tQKDPwEYBgIXJGMLBykkjzaSEgQuHBwDBQUlJTUAMhOSLx49UJl4doQPLD4gABMHJxOaGRZJNREKfginnaipRZoJJgkQV1emQLhhJQgAIfkECQoAPwAsAAAAABIAEgBABr7An3BILA4DEoKLwxkUCqVSbYdABIy/gBYBSXgRxQBmIKgwWo4ezyy4Hh8sHwgwOZwQFsQ3HFg8VBoUKFphGAYCFyQXEgsHKSQSIzZuAS8ePQeZmnoJFglgRzURCgQEegIWGZ9YWVqurFljpbMKADluRwsVFYsSMgcVOgQVDUcSHjgrIiESMwDLkQCUEjEOmtdVnxZCAREwHSAfG5obnBnb3DQPBB09Bh8Iqp+rRFoTFBqcCSYJELBDVSDcKBIEACH5BAkKAD8ALAAAAAASABIAQAa/wJ9QGCgah8iAJOY4OJ/OHQIRQFp/CEhii7AGFpXKRSKRHSo6QqWRpD0InZ7hs0FYENwkZkDo9xUAOVVDSh44KyIhEjMAiRIjAIMBETAdIHRPeAkWCV1JARMUGngCFhmdV0ULDyoaFChFqXsCFQwtDj08tQKDPwEYBgIXJGMLBykkjzaSEgQuHBwDBQUlJTUAMhOSLx49UJl4doQPLD4gABMHJxOaGRZJNREKfginnaipRZoJJgkQV1emQLhhJQgAIfkECQoAPwAsAAAAABIAEgBABr7An3BILA4DEoKLwxkUCqVSbYdABIy/gBYBSXgRxQBmIKgwWo4ezyy4Hh8sHwgwOZwQFsQ3HFg8VBoUKFphGAYCFyQXEgsHKSQSIzZuAS8ePQeZmnoJFglgRzURCgQEegIWGZ9YWVqurFljpbMKADluRwsVFYsSMgcVOgQVDUcSHjgrIiESMwDLkQCUEjEOmtdVnxZCAREwHSAfG5obnBnb3DQPBB09Bh8Iqp+rRFoTFBqcCSYJELBDVSDcKBIEACH5BAkKAD8ALAAAAAASABIAQAa/wJ9QGCgah8iAJOY4OJ/OHQIRQFp/CEhii7AGFpXKRSKRHSo6QqWRpD0InZ7hs0FYENwkZkDo9xUAOVVDSh44KyIhEjMAiRIjAIMBETAdIHRPeAkWCV1JARMUGngCFhmdV0ULDyoaFChFqXsCFQwtDj08tQKDPwEYBgIXJGMLBykkjzaSEgQuHBwDBQUlJTUAMhOSLx49UJl4doQPLD4gABMHJxOaGRZJNREKfginnaipRZoJJgkQV1emQLhhJQgAIfkECQoAPwAsAAAAABIAEgBABr7An3BILA4DEoKLwxkUCqVSbYdABIy/gBYBSXgRxQBmIKgwWo4ezyy4Hh8sHwgwOZwQFsQ3HFg8VBoUKFphGAYCFyQXEgsHKSQSIzZuAS8ePQeZmnoJFglgRzURCgQEegIWGZ9YWVqurFljpbMKADluRwsVFYsSMgcVOgQVDUcSHjgrIiESMwDLkQCUEjEOmtdVnxZCAREwHSAfG5obnBnb3DQPBB09Bh8Iqp+rRFoTFBqcCSYJELBDVSDcKBIEACH5BAkKAD8ALAAAAAASABIAQAbIwJ9QGCgah8iAJOY4OJ9Oxw6BQFqFCEhiWx0GFpXKRSKRHSo6QqWRpD0InZ7hs+kgLAiuFzMg+P0KADkBSRIeOCsiIRIzAIoSIwCEPwERMB0gdE8beQkWCV1EARMUGhp5AhYZoFZFCw8qGhQoRVcBfAIVDC0OPTy6ApOUGAYCFyRjCwcpJJA2k0oELhwcAwUFJSU1ADIT0C8ePVBPJlSgFkQPLD4gABMHJxMonRnoRDURCn8ECKugrK2MdEpgIgGEK1eoQLiBJAgAIfkEBSwBPwAsAAAAABIAEgBABs7An1AYKBqHyIAk5jg4n06HYodAIK9CBCTBtRIXlcpFIpEdKjpCpZGkPQidnuGz6RAQFkSXiBkQ/n8KADkBSRIeOCsiIRIzAIsSIwCFPwERMB0gdE8bJ3oJFglelQETFBoaFHoCFhmiSQELDyqpKEVYAX0CFQwtDj08vAKUlRgGAhckYwsHKSSRNpRKBC4cHAMFBSUlNQAyE9IvHj1QTyYVVaIWlQ8sPiAAEwcnEyh3XBnrlTURCoAEChC4EvUKlpFPCUwkgIAFSxUIN4YEAQA7", "hee hee"],
							"o->" : ["data:image/gif;base64,R0lGODlhEgASANU/ABwcHK14Ulk3JKWQaNGZav7jp+67hvKmbgANMQAAAPzXnZZoRMCjeGdWQP/1tSgQCK5VLMt1STMzM//GgxY4VwADJOC8iNOreKQ8DPzLkmNBLMmOX///x4cmAExMTOnJlP/urhkRC59UNZc2C4w9JFlLNWB3jmJIMnpPMo82EZEmAH5cQJA5Fg8LCOC0foNeQOKRXgUKCnBJL5FEKgABF6lAEb1hOOnFj+rVn//lnR4RCcdcJZlBGwQeOwAACP///yH5BAEAAD8ALAAAAAASABIAQAa2wJ9wOOxRjshiIpDLODKDxEKWACCIw5HL4PrYOlisZJwomwFoLMSScDgaLVAB9yGowkKPZzxGA8JmJQIhGhwrZ39CCRETARcPCwdNIC0yAlgdLg4FcgUFFhsYeFh7fH14pXx+iUQ+ZmUhg2V+Q2UrLxw5FgM4Kw9VACa1AhoCEwYxCSgwGzoJFUQ0NgcnOAMECyAKLgwENVg8NwwKChYXBQo4EaJhNRsWJDPvFzujQykBIiIso0EAOw==", "hiro", "o-&gt;"],
							"o=>" : ["data:image/gif;base64,R0lGODlhEgASANU/APbOVfO4DMlxEK5aE/bRFc6ODuyoBPrppfv+yPjdjvPFAPvoI/vvnfP+7MyegP7zKfDIO/nbd/7/1fa5L/nWBtOQJd7PsOWJAPrfG/PHFe+wCOF8AOaQAN2tTeqdAfG/D+mWAPvttKJXTP/0HkRHTfvkA7e0mGtzZnFwC/mkHX9uPenToHhOAMnImGuFif/jcRkoMAAANRcFEP/+vGG28MGILZbB1eW+gMyWYqOOZM+dQRY6WumaCNyiO+G5c////yH5BAEAAD8ALAAAAAASABIAQAb0wJ9w+FMYAhoFcVhCvUKpBkxGMqUooMIi8CEWAIAIuCKcXC6UoYJjyGgynsfnEnhcMJehAGCSSCwtEggMYA4CDyBDGx4EBgQbAQsPBht4ig8BHBgbExQBARgPb44eQgInNBA5DTYIEiEJBz4iC4lCFQl+EjMhBwkdIhsLmkscRh9cGwoleUR3BB4LyG4EkxkjG0NxGQYYHxzRoh+jQhrYEx8JKywoNRMYBBoPGw8/DDInCAUkKj6DCQYgWNBhx9SBGH5c7BCE4EAIALRsDQBwAIErhhF+CWjU7MfEAzcG4DgAocdGEMM4LBlQoUaFAUN4CMkTBAA7", "billy", "o=&gt;"],
							"o-+" : ["data:image/gif;base64,R0lGODlhEgASANU/AHMAAKdYNq2Ud4QBATkAAP7EhZMAANGyh41SUnoBAYwBAdSRaf/qtWQLC+/VsHUkF7Z4U///xoolIVQTEmUAAGsCAhkKBP+5ef7YnIU3KU4BA//2vsZ0R5RBMF4MDIkZGXYcGf3jq/emaFsAAFMBAnorJ3UHBmgKClYODu6zfWYGB6ghHpMWFl5JN5hiTf/OkNiGUY1jYyNSNqV+ZPmucP//6uOjcHwTCOGoaIULCeuWWXsNDbjEk7ClhwQ6IP///yH5BAEAAD8ALAAAAAASABIAQAbewJ9w+IsRJqgjUTgZnFIMx8bhKUAoKqdiKYQsFoFhKZFYDs6DEcCgMHgGFQCL2En1GAxBCPPqaBIGJlwAI22BJgMJAAhDGmsKBAI1CxpqblpCKwAKBTgFLRAvGwUPByAqW0QwFy8cARcXDxQGDQoDXD8SIAkmbxIfjFyJKIBtJiYqAB9EOwkqFRlXa4cKtUInAwolLi4RERodMwANmD9nJBYtETYWFhghJQETqEMrOTwy3j4hIQUZN8duDXm1IQSDUQVoPKigABEXDiIi6uDwIwG5BA5w/YAAYUkZIUEAADs=", "april"],
							"(%)" : ["data:image/gif;base64,R0lGODlhEgASANU/AERDQzEwMGlpadLS0ltbW2hoaE5OTmdnZ11dXWVlZdDQ0GBgYLi4uGJiYmNjYz4+PktLS8fHx+Li4sLCwszMzJOTk0FBQfX19f///8rKytHR0aSkpMjIyDs7O09PT1JSUnV1dUpKSs/Pz1ZWVsDAwGRkZHp6er29vZ+fn1dXV4uLi7+/v87OzoaGhvb29jU1NcfFv7S0sN/f3350XZmYlZ2dnYODg8XFxba2tvPz8qqqqnJycrGxscvLyNbW1v///yH5BAEAAD8ALAAAAAASABIAQAa7wJ9wSCwSAZhTRjFobgSCQglhCBh/gCwgYL0CLhLGBDYDRSqET6crBFBWlcTBtDskGoSqMZvrxVAqIVlFAC4+ExQKGk0aIAkLKRZdABIRHCw6UFAFBw4EIWxYFRspBAgIBCMGL6GEWoNXWBcyOAw0KAwmHg8dhBcnNxQiEwosFXgGvW0YliKLTpyeEJMYJEsDDDaaUlSTPBwTKwUFm3YLIw9sADQZKgsNNS0OC2lcewAeEAYGEJKtsQCDAAA7", "yin yang"],
							":-@" : ["data:image/gif;base64,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", "chatterbox"],
							"^:)^" : ["data:image/gif;base64,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", "not worthy"],
							":-j" : ["data:image/gif;base64,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", "oh go on"],
							"(*)" : ["data:image/gif;base64,R0lGODlhEgASANU/ALhzQPntW/rvl+jOZ////vfINvTpZ+XFWN6rRvz3rc12JMxmC/DMir5sLfn0Y9qbOf745/34yOvUWuqSGPjbSve8LfahFeCIG/evIvjSQPi4St6iPOS6c//89v762vnpxN2xVQAAgNuEH/vnO+WXKPPaVPHXp/jjUfadEfrqSfv1f9qrUM6JR9V7HuvJTvrv2/zsVfXsYPjjXfv4UMV9Q+2uL/jDQ/rZRdmdaPTccPjUSP347vnt4fSqPvLezP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgA/ACwAAAAAEgASAEAGksCfcCgEAIjIH+AwWxBClFGIsLCIjkqWEZvcNrhDAIKSeYCRgFgAtmgvChjLGY3YzJUgg0TiJEQJVBcXEwpgAGsnZAUVGGcAKzEOay5GG4wWKF9JYXebSmR3W1ttZG2iRkoHDg5OUFJUmC2GEgGkGW0YE3OPtSlktxiyaCuSMIkZi3EXXEsOEltFRiIoukqdXQBBACH5BAUKAD8ALAQABQAJAAUAQAYhwN+PdhIWAMIfrPgrVISBZBLzc5WKmUKN5AgsFr/MFxMEACH5BAUKAD8ALAYABwAGAAYAQAYUwMXi9xPCiMQKEgk7EQvKpfRXCQIAIfkEBQoAPwAsBgAHAAYABQBABhJAQuj3CxEWCyKSwGw6mcToLwgAIfkEBcgAPwAsBAAFAAkACABABiTA32+xEBKFwwUlcxwikUVhSpiBEgi/0XUxK4Yoo5DzSS4XfkEAIfkEBQoAPwAsAgACAAkADABABjTAn3DI4Qx/KoPsmDMNI6qj0BSJ+H4fwTCXGhp+AalUkBD/PJEfI5EWCmDP8q905DjEIHMQACH5BAUKAD8ALAIAAwAOAA0AQAZJwJ9w+PsQiZ3OLyHI3Y5QQmJo0ogGqhx0S4Qotx2CsAMRakjDl4dpKHGhkN17PBW+GL3fq/6TDjVHBElrOTZQHR4RbwxMKgZvQQAh+QQFCgA/ACwCAAIADwAOAEAGY8CfcIhADI9DVeRHaDaRA8lQBhvueC+fMBGBdIQdyIehoSF/CErmcf4dZkOPYNjZHZeQe7gtVPORFDptBw4OQwIqdBA8QxKGQgSQX0ccSxFNSwR2Qx8/Hl5Omh8cR3NtDxZCQQAh+QQFCgA/ACwCAAIADwAPAEAGWsCfcPjbEI+/AOxEyRRsDCSRMhpeLiTcKuYIGHLCXWdMIEjPUupQEx3GAgGiANJBn832fCYvVAsxPRxEcT9NQjYmRytxKU03Px+KXQEyOQIRYmNCBw4Sd2U/QQA7", "star"],
							":)]" : ["data:image/gif;base64,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", "on the phone"],
							":-c" : ["data:image/gif;base64,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", "call me"],
							"~X(" : ["data:image/gif;base64,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", "at wits' end"],
							":-h" : ["data:image/gif;base64,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", "wave"],
							":-t" : ["data:image/gif;base64,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", "time out"],
							"8->" : ["data:image/gif;base64,R0lGODlhFwASANU/AGZmZv///8zM/6uCNOjo/5loM2ZmM/j5c///zLy8vPC6M8yZMwAAAPTMQfPIPMVwHPjxavv7+5CQkHtcM9OCHvbiWfblXvXaUdimMPj1cPv6VvfrZX+ALejo6HVfQtmSKZ2Ke/TQRvW7M/fcQdFtYfjuZ/fmavC2LolbNPjkk97ETZmZM5iUVsSSNfbkYHd1L/XYZOqyL/S+Mcn0cMKRL/jvaPr6Y9iKI/755n1mV+Tja6iERvnvV9fW2/rwRv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAA/ACwAAAAAFwASAEAG68CfcDgcGI/EpBDwCixImYP0wDFIBABBAKDMCiTcoVeQCCt/HoEg8tGk1x9fY0AEBO6BhEHh2kAgCgZ3BIQEZGZDDB4MAhUCigwNJ3RnPwMBH2oaBzZqmTUVDpRLAVodKxsUBHctgggSr6VlS1p3AgYqDg0Gq4VqiEkgOTopMA0OMkaViYwRDBAMzQwjMaNJOwAR2iMHI9oRADwXCtZDBQEWEFFTUgocgQZJdh0sMxgLCxQUBghbCAh2ZtlBkEDCHhMl8hUIFKDfP0JYfmTBo0fBhQoWDGhB4GuWmFpYUBjJAvFXJQAou6AEFgQAIfkEBQoAPwAsBAABAA0ABgBABjPAn3AwwAmPQhBDmHD8nL/ExAmaLBaP38OKDQ0L2Z/FAT5OGJPCInNOY4W3rO130D56vyAAIfkECQoAPwAsBAACAA0ABgBABjPAn3AovBF/CAZjcvg9lEsF6IfBLIQPkZVW+Q1+WqGiIBIJPdQFbfKbLDC0B/sotIRCwiAAIfkEBQoAPwAsAAAAABcAEgBABlXAn3BILBqPyKRyiZwwJoVFxgldPJhY5aDwEFQsDm7jpA3curbDQfB49GrZuHxOB00WVsjjbg0pQQwREQkOBw6CCRMOSgUBFhAZapIHChx0l5iZmplBACH5BAUKAD8ALAQAAQANAAYAQAYywJ8QlNMJj8IdQBgZ/Zy/CID3YzAEEUb1moUyPNqf4Bv+eQTYj+ac9gk/gp/mZxPDf0EAIfkECQoAPwAsBAABAA0ABwBABj7An3AwwAmPQg8Ds6BNfpMFhvZ4DiYizOOnKIhEjxASaQmJj4PC9me5qYWgCYa5yDyyzcoPwWBMDj8PfX4KQQAh+QQFCgA/ACwAAAAAFwASAEAGX8CfcEgsGo/IpHKJnDAmhUXGCV08mFjloPAQVCwObuOkDdy6tsNB8Hj0atm4PDsY4FKwhkNWX4ImC1YQD4BWIUogDBERCQ4HDosJEw5KBQEWEBlqmwcKHHOgoaKjpERBACH5BAUKAD8ALAQAAQANAAYAQAYywJ8QlNMJj8IdQBgZ/Zy/CID3YzAEEUb1moUyPNqf4Bv+eQTYj+ac9gk/gp/mZxPDf0EAIfkECQoAPwAsBAABAA0ABwBABj7An3AwwAmPQg8Ds6BNfpMFhvZ4DiYizOOnKIhEjxASaQmJj4PC9me5qYWgCYa5yDyyzcoPwWBMDj8PfX4KQQAh+QQFCgA/ACwAAAAAFwASAEAGX8CfcEgsGo/IpHKJnDAmhUXGCV08mFjloPAQVCwObuOkDdy6tsNB8Hj0atm4PDsY4FKwhkNWX4ImC1YQD4BWIUogDBERCQ4HDosJEw5KBQEWEBlqmwcKHHOgoaKjpERBACH5BAX0AT8ALAQAAQANAAYAQAYywJ8QlNMJj8IdQBgZ/Zy/CID3YzAEEUb1moUyPNqf4Bv+eQTYj+ac9gk/gp/mZxPDf0EAOw==", "daydreaming", "8-&gt;"],
							":-??" : ["data:image/gif;base64,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", "I don't know"],
							"%-(" : ["data:image/gif;base64,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", "not listening"],
							":o3" : ["data:image/gif;base64,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", "puppy dog eyes"],
							"X_X" : ["data:image/gif;base64,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", "I don't want to see", "x_x"],
							":!!" : ["data:image/gif;base64,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", "hurry up!"],
							"\\m/" : ["data:image/gif;base64,R0lGODlhIAASANU/AP3TQpycnfO5Lf3IMNunX/3rncXFxc9fBf7hUMmTMq2DL9AEAP/1a+W9kdehL6V9M/7rY6V2HfX09dXW1//5uvTRXb2da6d7J1oOBOmrKF5QR5wDAdXY4isQB//7ceTk5td7FN7e3//74M49APTbwXRNJOWaBZJqJZA5DLiDXuGXIR1dpMvN0OS9Uvvs3KNME8zLcr18G7lqHmOPxKhfILd5Pf7dduTq+Le6ugMscp9vFbRqN8LY+2xsbP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgA/ACwAAAAAIAASAAAG/8CfcEgsGo/IpPHCfDiVwl7PKJ1GLoQKACCjPZE935QYZvUiPoKvgCi4CDLBA+ybjKM+Fjrl81EofSIvAHJHYXZDZT06Ii4+OTCAfQwIA3OGAQFVZTprBTYaCRUfOTgMDAAOl0U9mgYhPSxmnTYDEAi4AD0tpwgAq2SaPhKbFy42DhWnpx4QLRW+wGQGYhMhIRPGFRkJ3d4JBLe/YNQ9En0+FyQFAy0ELfDvylvSiZmaPTg+D24DCAwQICxrRqheIhzn0P24UAAAggrwlAWsZDCRAQMsPnww86BCLQACA94aoArKJilCOtYasAXAAJIVoaR8IKBlwZgyhzjZiTOnTwMhQQAAIfkECQoAPwAsAAAAACAAEgAABvTAn3BILBqPyKRyOez1jM6n8PKoVpc9n7TpYz0vF0KNQIgprsjsZPvLeiOiXaMyGAhqMsEj7Vtz3z4pJD4+CBSENBl6aQEBUW49OiQEhD4QlQ12e0c9jgYhPSxeOj4uNj4zOZc3PB4QAwmbRZ1ZEo+kNnYCuwA9OQwMCBmyswZaEyEhE7gAwM4QCB7Bw2nGPRKVOiI2LQnOzgQOwsREnY1OOD46NgUANQk18fLBsUk9ONiVHDouABUVEL65AkCumAEWHz54uQDABgIGEP4xkIbAQcFZj6QwtOHPBoSPACwySfLgQgUAABAAGHZxJBErVlzKVBIEACH5BAkAAD8ALAAAAAAgABIAAAb8wJ9wSCwaj8ikcins9YzO5/BBrSp7PukQy5JeLoRUokFQUJHYifbHfUZEFlIFABgMBILHMa1t/yIuDRQCMQkQEAkvIHl7AQFRfhEWIi0vJBQMDCI+KRl6UI8GIT0sXX8ELhVjPj4MHqwiAp6gWBKQPREEIgAtPjczEBS/IggDn0U9BlkTISETLLkFCBA+DRoZAwkaMMXHRMlZEqw+LDoE0gwAEJmZ692Njk445DoKLgAMLRXsmS0Ds3twiBvHAde9aTUSKFTYAoA3ZAYMsPjwwVSECgXUQahQwQZHAA4eIrs15OIcBBX00QnJJMmFB/7s/DvTUkkVKzVzJgkCACH5BAkAAD8ALAAAAAAgABIAAAbswJ9wSCwaj8hhr1dcMpPQXy/0FPY+vmr0ONX2fFnh5UEmb6XUZ48VjlwIjValkjFDnUupj9WLSEgVAwMAggMCD1FLH1QBWREuJDYACAgtEAgZNId3jRJ4EQ0FABAJNA0MDAUiNQ8KSUtZEx8fEQQuFQgVKWAUDGA+JohIsF9gOgQ+AAwVJD48BR7OPgPCXD0BAUs4xz4IEAwiIhoJAAU9FtR3BhK/tSLKEJOo8wACF4lrsywRJN7LCRVaEBBY54wUJxcAuECAqkWChwQcOKhmUEyLAt48QJiDYGJFI2NwIQBA0s5HI2XKnFxJJAgAIfkECQAAPwAsAAAAACAAEgAABuPAn3BILBqPyKRyWez1jM4n89jzSYdV1nVKrE622eflQSZPvdfw5UIoAATwMbMXCESzEZcIMBgA+AMCD0t0PQYhPSw4eRJ/CC0ODBACKAIXSoU+Ek4BEQ1uEAkWIgwMIiIWFwqYBlYTIREELgAIFSk+PhQeuD6WrFYSPrE+AAwVLj4zMLsrOAODSXR1TsMIpQUtCS1+FnyXmDjBwrLWDAAVpaUQDoKEBgYsHx8XDTYQktrZCQnPZ3cXAEiUg9CihT0ADqBxGQKwAQQEEB5WGJBwoZEHFywQcMAxgRmLRzCWUUgkCAAh+QQJAAA/ACwAAAAAIAASAAAG48CfcEgsGo/IpHJp7PWaTiay53sSqaze5bF9PKQ/6sQqpEYujQah0Up4mWKyWWSxAe6ATEbwXfYCAU5OEXQFGTIODBANKSB8foEGIT0sEQoUAy8fPgwePj41GX1Jf1QSPREEJDYOBp8MFJ+Ybn6uPROpIggInzkwFDy+eaNTthK5CAwFeAAIAAzDkICoBLqKKmlpGdAOF3A4Ej4XqskOKBjoGC8IA7S1BiwfFy02CCAYFwoKJSgAj1KCtFQgsUuRDQgQ/DkgBubHBQAN7Di742BhQyNcUiSo6EDBm4tHuHj5WCQIACH5BAkAAD8ALAAAAAAgABIAAAbswJ9wSCwaj0hir2dcMpPQnu85lLJ6j6wWqvRNqD/p5eIom7PcsJcqjYgUjVarklE5Bo90LxBw9twWNTICAAIvIAIOAnlRfQYhPSwRDTsmhAyWMRmJjEl7UhJ/DSQ1CgkJLagJCAN2nUg9BlMTkyIUPisVNiIrBR6FDq9HsVMSERYiCAgAmwMtDB6swVx7fH/ICBkgBAQJBxUeEAPT1DgSPhEKyQkcITgBKQfh48LDBgYsHxEuGSgY//9QKMtQD5aTCwAaYCihQI4CGgAAkEtTBGELBBUqQAgnsSDFH1lsKFOGx+NHIVq2nFx5JAgAIfkECQAAPwAsAAAAACAAEgAABvfAn3BILBqPyF7PqFwin8KezzmUsqjQo3SCtWIf4DB0S/UOL5dCAeGgxcDPXiDQNP8ujt2g0m4J/g9JdAYhPSxXQhEUCQkyMjsJDgwADgKBTHQ+EnVLEQgIAAIZoxAeEAMOl0wGUxMhIRMsERkQGQQkLrkEHh6UqVqsPRI+xLK2Lj4cyjc+Kh4IGb+Yc0o4PsYqHB3b2z0yz9GqRT04w8TJFxky2xgb7u0VbNKrBiwfH1fpLx0bC/7/GSglEDeOkxAFBzAsGHEAxAh/ouZlIaLAwYsMCBiYEiXAwcCJRyo6GDAAAABUHgmCHKLggYOXMOGsfBJGjJEgACH5BAkAAD8ALAAAAAAgABIAAAbhwJ9wSCwaj8Vez6hcIp/Cns85lLKoQ512i5ROsFbsT6dIOGQyhZbp+1Z916KO5hDIEi2AIKFjBgJNYXIRaAkEFRB6fUmABiE9LHFEOgkDABWIEJoAfIxSEoFYOhkqCQ0ECSCaEAOLRD0GUxMhIROSYwQ+EhMfEyQOm65VsT0SPse3OgQ4HRjNGjTBfn9KOHBUyiXNzh0oLYnCVTjGxz4c2AQlGwvsCxsZrOFRBgYsHx+3Qjov7e0gil1CGdEBQoUAAC0OjDAoD8pAAQIsAdDTyaFDShkgZlhj0eIWjh1DOgwCACH5BAkCAD8ALAAAAAAgABIAAAb/wF+v9ysah0RjUfFoNpXKni959LGoP4UikaDFEk6o0DfBSq/GFy0hkLUyAIH8AZWWq2jj5SWToU4IEAhxAnRRAQFIZ1QPMTEODhAeHgwMg4V1iQYhPSx5RQ8OchkCABCVlgJgh1ISilQRJiAEDbUHpwwQAKtRBlMTISETeRENPj4cHDckGZQMAA6GR749EsdWVBcWHdwdGi+SlhnSRT2IiT042EoKJd3czR4I42Lp1tccWAooGxjdMpOgkStnwACLDx8+LVnAsOEID7p41XkF5cKIixcZjkCAYMBAMSB/XHBACgAAFSMODIoWsuWSGAIGAODIcQBLly6bKMgwoGehCo84QToJE7So0SAAIfkECQAAPwAsAAAAACAAEgAABvDAn3BILBqPyGGvZ1z+HtBostjzMYlVaCIhizkS0KmwOrmOHwmHIJYQAAYCsJhsztJiMdqjBUEABAoPcwEBS0toXgQIHgwQjgAZglM9hQYhPSwPGRkqnSoCjn0DckmUVRKHKgQkLiQNBBmNEAAOkqUGVhMhaC4TOAaWCQiNCAK2SD24PRI+PmglHR0YGiWxfcaDhEs4ziUY0dExEAzFx8g4zM3OLxsbGO8oAOTYc8AsHx+ZC/v8CxmztcSMMdQDzYGDI/aNyIBggDmBQh7EyDDgjYoDICoGhGgECkUAAPwMiMQxiUcBAiI9LFkkysofQQAAIfkECQAAPwAsAAAAACAAEgAABv/An3BILA4Vj2TSaOz1ms6fQpFI0GIJJVPY8z2JXVbvRUsIZK0MQMB+bLuTL9cnvrxkMtQJAUGsBW5NPnFDYT0PMTEODhAeHgwMfoBvAQFOTnSHDmwZAgAQkJECWUw9lgYhPSxiPxEmIAQNsgegDBAApE2WPhKXThENPj4cHDckGY8MAA6BTQZeEyEhE3UWHdcdGi+NkRnNRT3PPRLCmVIl2NfIHgjelJVOOOYKKBsY2DKOy9/gOOTlHJ4oWECw4AgPt3KVMmCAxYcPrC6MmDiR4AgECAbwg+JLyAUHnQAAUDHigB9mW1IKURBDwAAAGDEOQKlSZRIFGQboBLSxJhMHJVp8Ch0aBAAh+QQJAgA/ACwAAAAAIAASAAAG/8Bfr/crGodEY1HxaDaVyp4vefSxqD+FIpGgxRJOqNA3wUqvxhctIZC1MgCB/AGVlqto4+Ulk6FOCBAIcQJ0UQEBSGdUDzExDg4QHh4MDIOFdYkGIT0seUUPDnIZAgAQlZYCYIdSEopUESYgBA21B6cMEACrUQZTEyEhE3kRDT4+HBw3JBmUDAAOhke+PRLHVlQXFh3cHRovkpYZ0kU9iIk9ONhKCiXd3M0eCONi6dbXHFgKKBsY3TKToJErZ8AAiw8fPi1ZwLDhCA+6eNV5BeXCiIsXGY5AgGDAQDEgf1xwQAoAABUjDgyKFrLlkhgCBgDgyHEAS5cumyjIMKBnoQqPOEE6CRO0qNEgACH5BAkCAD8ALAAAAAAgABIAAAbwwJ9wSCwaj8hhr2dc/h7QaLLY8zGJVWgiIYs5EtCpsDq5jh8JhyCWEAAGArCYbM7SYjHaowVBAAQKD3MBAUtLaF4ECB4MEI4AGYJTPYUGIT0sDxkZKp0qAo59A3JJlFUShyoEJC4kDQQZjRAADpKlBlYTIWguEzgGlgkIjQgCtkg9uD0SPj5oJR0dGBolsX3Gg4RLOM4lGNHRMRAMxcfIOMzNzi8bGxjvKADk2HPALB8fmQv7/AsZs7XEjDHUA82BgyP2jciAYIA5gUIexMgw4I2KAyAqBoRoBApFAAD8DIjEMYlHAQIiPSxZJMrKH0EAACH5BAkAAD8ALAAAAAAgABIAAAb/wJ9wSCwOFY9k0mjs9ZrOn0KRSNBiCSVT2PM9iV1W70VLCGStDEDAfmy7ky/XJ768ZDLUCQFBrAVuTT5xQ2E9DzExDg4QHh4MDH6AbwEBTk50hw5sGQIAEJCRAllMPZYGIT0sYj8RJiAEDbIHoAwQAKRNlj4Sl04RDT4+HBw3JBmPDAAOgU0GXhMhIRN1Fh3XHRovjZEZzUU9zz0SwplSJdjXyB4I3pSVTjjmCigbGNgyjsvf4Djk5RyeKFhAsOAID7dylTJggMWHD6wujJg4keAIBAgG8IPiS8gFB50AAFAx4oAfZltSClEQQ8AAABgxDkCpUmUSBRkG6AS0sSYTByVafAodGgQAIfkECQAAPwAsAAAAACAAEgAABv/AX6/3KxqHRGNR8Wg2lcqeL3n0sag/hSKRoMUSTqjQN8FKr8YXLSGQtTIAgfwBlZaraOPlJZOhTggQCHECdFEBAUhnVA8xMQ4OEB4eDAyDhXWJBiE9LHlFDw5yGQIAEJWWAmCHUhKKVBEmIAQNtQenDBAAq1EGUxMhIRN5EQ0+PhwcNyQZlAwADoZHvj0Sx1ZUFxYd3B0aL5KWGdJFPYiJPTjYSgol3dzNHgjjYunW1xxYCigbGN0yk6CRK2fAAIsPHz4tWcCw4QgPunjVeQXlwoiLFxmOQIBgwEAxIH9ccEAKAAAVIw4Mihay5ZIYAgYA4MhxAEuXLpsoyDCgZ6EKjzhBOgkTtKjRIAAh+QQJAAA/ACwAAAAAIAASAAAG/8CfcEgsGo/HXs+oXA4Vj2gUKez5nEMry6lQJBK0mEOKtE6wP+3yRUsIZIIMQEB/JH3nrG8rvLxkMiUnEBAIcwJ2TAEBTWo/DzFiDhAeHgwMhohJjAYhPSx8PxcOdBkCABCXmAIJiUQ9jD4SjUsRJiAEDboHqQwQAK1JBlcTISETWxENPj4cHDckGZYMAGPCVxLMe0sXFh3fHRovlB4IGa6vi4w9ONtCCiXg39Ll52U42docXCgbGBjfZFSqhu6VAQMsPnwI9UPBgocQR3j4FawMrSEXRmjU+HBEBQQDClIpMsoUAAAqRoAwZG0kEgUxBAwAgKAmyJYuXz5QkGGATwlEInMakULmSBAAIfkECQAAPwAsAAAAACAAEgAABvDAn3BILBqPyGGvZ1z+HtBostjzMYlVaCIhizkS0KmwOrmOHwmHIJYQAAYCsJhsztJiMdqjBUEABAoPcwEBS0toXgQIHgwQjgAZglM9hQYhPSwPGRkqnSoCjn0DckmUVRKHKgQkLiQNBBmNEAAOkqUGVhMhaC4TOAaWCQiNCAK2SD24PRI+PmglHR0YGiWxfcaDhEs4ziUY0dExEAzFx8g4zM3OLxsbGO8oAOTYc8AsHx+ZC/v8CxmztcSMMdQDzYGDI/aNyIBggDmBQh7EyDDgjYoDICoGhGgECkUAAPwMiMQxiUcBAiI9LFkkysofQQAAIfkECQAAPwAsAAAAACAAEgAABv/An3BILA4Vj2TSaOz1ms6fQpFI0GIJJVPY8z2JXVbvRUsIZK0MQMB+bLuTL9cnvrxkMtQJAUGsBW5NPnFDYT0PMTEODhAeHgwMfoBvAQFOTnSHDmwZAgAQkJECWUw9lgYhPSxiPxEmIAQNsgegDBAApE2WPhKXThENPj4cHDckGY8MAA6BTQZeEyEhE3UWHdcdGi+NkRnNRT3PPRLCmVIl2NfIHgjelJVOOOYKKBsY2DKOy9/gOOTlHJ4oWECw4AgPt3KVMmCAxYcPrC6MmDiR4AgECAbwg+JLyAUHnQAAUDHigB9mW1IKURBDwAAAGDEOQKlSZRIFGQboBLSxJhMHJVp8Ch0aBAAh+QQJAAA/ACwAAAAAIAASAAAG/8Bfr/crGodEY1HxaDaVyp4vefSxqD+FIpGgxRJOqNA3wUqvxhctIZC1MgCB/AGVlqto4+Ulk6FOCBAIcQJ0UQEBSGdUDzExDg4QHh4MDIOFdYkGIT0seUUPDnIZAgAQlZYCYIdSEopUESYgBA21B6cMEACrUQZTEyEhE3kRDT4+HBw3JBmUDAAOhke+PRLHVlQXFh3cHRovkpYZ0kU9iIk9ONhKCiXd3M0eCONi6dbXHFgKKBsY3TKToJErZ8AAiw8fPi1ZwLDhCA+6eNV5BeXCiIsXGY5AgGDAQDEgf1xwQAoAABUjDgyKFrLlkhgCBgDgyHEAS5cumyjIMKBnoQqPOEE6CRO0qNEgACH5BAkAAD8ALAAAAAAgABIAAAb/wJ9wSCwaj8dez6hcDhWPaBQp7PmcQyvLqVAkErSYQ4q0TrA/7fJFSwhkggxAQH8kfeesbyu8vGQyJScQEAhzAnZMAQFNaj8PMWIOEB4eDAyGiEmMBiE9LHw/Fw50GQIAEJeYAgmJRD2MPhKNSxEmIAQNugepDBAArUkGVxMhIRNbEQ0+PhwcNyQZlgwAY8JXEsx7SxcWHd8dGi+UHggZrq+LjD0420IKJeDf0uXnZTjZ2hxcKBsYGN9kVKqG7pUBAyw+fAj1Q8GChxBHePgVrAytIRdGaNT4cEQFBAMKUikyyhQAACpGgDBkbSQSBTEEDACAoCbIli5fPlCQYYBPCUQicxqRQuZIEAAh+QQJAAA/ACwAAAAAIAASAAAG/sCfcEgsGo/IX69nXDKFj6g0Kez5nkMri3m5UBotBygWTVonWKVve/E1AAPBCyQzDR7IM1bbi/h2LzEJLzQJAwMOAnhHPQEBTnwRDQkJDg4EFS0IAAIOi02PBiE9LFsRA5sZIKsgGR4IAxmejI8+EpCnFSANJD6+bwxws4wGVxMhIROnIL4czr4qr4ifRT3FPRK+PhEJJD0d4OAaNRUQ03mOjz04PhcHGuEY8uAq5sOMONna7uAYC/8AD0DoRK2aAQMsPnzYogDDhn8jRgAcgeBeHkhMFDjYcCCDAAEqIoI4RwWJRgQMPKiEQ7KkyQc2ACDYdKegyyNSptzcWTIIACH5BAkAAD8ALAAAAAAgABIAAAb3wJ9wSCwaj8hez6hcIp/Cns85lLKo0KN0grViH+AwdEv1Di+XQgHhoMXAz14g0DT/Lo7doNJuCf4PSXQGIT0sV0IRFAkJMjI7CQ4MAA4CgUx0PhJ1SxEICAACGaMQHhADDpdMBlMTISETLBEZEBkEJC65BB4elKlarD0SPsSyti4+HMo3PioeCBm/mHNKOD7GKhwd29s9Ms/RqkU9OMPEyRcZMtsYG+7tFWzSqwYsHx9X6S8dGwv+/xkoJRA3jpMQBQcwLBhxAMQIf6LmZSGiwMGLDAgYmBIlwMHAiUcqOhgwAAAAVB4Jghyi4IGDlzDhrHwSRoyRIAAh+QQJAAA/ACwAAAAAIAASAAAG/8CfcEgsGo/IXs+oXCKfwp7POZSyqL+HdguVTrBW5+ViKZcV2qTvW/VdhRdfw1IBIBwZBzoZCDTDPxciNS8gAhAAIDQxA3tMfgYhPSxvPxENNCYtFR4mAwgyCAIPRz1+PhJ/PREKIg03ARotFg89LQwADqRMBlMTISETVw0FNgW0A8c9Hh6iu0U9vT0SPtXDNggQAioghgjMEAPPRKZ9SjhuPQ3YIA0uPi4kKgwe4ePkONTVPhw9FgUAXpTQUGLgCxXNRiUxYIDFhw9vLlBQgQKDxYsHGCC4B00VnAoEUERoAaHeiRh3OEIZ8gCAnQowIUBIuRKKlgoDXAIQp7JmkQctXHwKXRkEACH5BAWQAT8ALAAAAAAgABIAAAb/wJ9wSCwaj8hfr2dcMoWX6GOaFPZ8z+GVxbxEKAUIADCgIq+TrNLHjfh2u0wFQHslymdfWsvuuV8+PgUABS4ENBkCD2cBAU5bPToNKYEUFIE+KAAOi0c9jgYhPSxcOj4iLj45MJeBDAgDCp1Fn1cSj6YFBQ0aCTYfOTgMYpxnBlgTISETpjYDrwgIAD0wDK8Zs7THPRKYzQ4V1uIQLRUIioyNSzg+OiI2GQkt8/MOCdfZtDjd3jYFAwQcWEiQgAABGwwAJMhHpIcBAyw+fGjjYgCCYRDEeYDFkNajLoQGVJgX7tWmjlWgtHAGIJq0AcVSJpnSQsCAm5xQyiQypafOBZ1AhwQBADs=", "rock on!"],
							":-q" : ["data:image/gif;base64,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", "thumbs down"],
							":-bd" : ["data:image/gif;base64,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", "thumbs up"],
							"^#(^" : ["data:image/gif;base64,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", "it wasn't me"],
							":bz" : ["data:image/gif;base64,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", "bee"],
							":ar!" : ["data:image/gif;base64,R0lGODlhFAAUAPf/ALkpD6cGAMIkALohALMTAD9BSsIiALwiAP////Dp28oxAPjv7+vj69TAyc82ALcnD80xAMwwAPbp6vHc3L+gYubfw/zjl9meIP/oiejKRP/yjNvK06weE7qIUNA3ANE4AN/S3MhxN7yitrqJUdqmJ+7l2OWvLMJlYs60hZ9nTsIdALaSieWoJcJQQ//rUvfNP7QbAP/4aZ8OB8KLQa0bBfn17/TAOZkAALlXELUlD7W40bMZAK9FJcalbsCSPve+KNnb6fTu5NO+x/nx8t/Brfvqt/zVSv38+sOcWtiuUf/xasp6eccwAPbgYGVmaMCYUoN4RIF7TMZnGJsFBtG6lOng6PLg4P/hV8BHB9mYloRvMd3Mr52eYsePIPr09K58ZasSBqUZGvXm58elP9fCncmjWuS8vbAWALcVAL0kAEpLUfj07f7POLuITrkaAJeQTbUvJsWfXbMaAPnv7//2aTg6Ra0XA74jAMcuAKwTAK9GI6wOAMalbcMfAMCSPbYnF9K8hFZUR//yY+PDiqkiEnt1R/q+Iv/vY6thKevSnLF3LrSHNb2EP9HKvsKgYr+zWPn//865wu2uH8ktAMWpccSLPcirevLZYf/cYMOcKqgYDrxqWcJXGrk8NGJjZ/LhY/LjZbBjJvTjZP/bOYx2SKqRPLeOR9u2UtmRQdzY4b+RPd7OsriaN+ni6vTYR6mfUfjjU+HERdOWmp8sF9iWlslzcMOiaLQ3E9rMqNS+mpuZa8JXTcCMJvrBLPn08v3pV6Z4Zda2P9i0OamaSsSeUvbt4NuiH+nLy76WWLceALiLPufd0cWlXkRGT+K5ur+KJ6KUfdypqfG2Jcqea8SNRe/n2k5QWfa/Ku7ers23wP7MOFVOPOWrJr2IS7EkGL4eAJiTTcFlZbEsJsyvccSdXcKcWM00ALmZoswzAP/5av/3aL2POzQ2RfXm5rYYAFdaha8WANSqTcUsAI1jMrIaAtrK064QAL6VL+7u+K8MAPe/KEhIQ2xsbK0eEWtrbP///yH5BAEAAP8ALAAAAAAUABQAAAj/AP8JHEiwoEGCC5ZwyPEAAIAH/cJNOPjPjLdv6D44kHcgGR4D4qwYPGYvggcFA+DtOHBHgJsAU+YQlAAGgoM0eQ5MMkCAxi1OUhD5GojghABzcmAIQCNDDypMglyMIkFm4BA7Cs64I9Bp0zxdXMC9GVbq3qIaAp3R2xOAkKxUkADFisKumZoC20g1EhjtRpgQxBC801FM2Ctr/PxZ02ICmsB2s4hoyLQMCD4UGR7VceKpACtpfARmCVUBg6sx45gFUwKq0L5AUF5w6yEwHw5cFk41gfUrHZ0Y6j6JuqLtQi6Bf7BQKpICGLJySOKQK3PpkJFeXUoI3MVEEbZp5xpkYWtQb4OQFfHYSHpyRGCtPjwoJPoSCUQVBgxaiWBk6Fm1gS2oQEsCjgxCzQxtjNBBN5WwwMsqBGkChxj/JGBLEjboc80P0hizzhYFLeDFQGtQYYoqPvihjCVBUOTiizAeFBAAOw==", "pirate"],
							"[..]" : ["data:image/gif;base64,R0lGODlhFAASAPfpACVeavv8/DZ3iM/b3T6EmD+FmC91hz2Clj2BlAwwNT6DlyRdaQAAAHmepTNxgTNwgECGmvz8/Dd4iSljcTuBlTqBlD+FmTF4izB4i/T29jp/kSdgbCdgbfn6+vP29hU8Qv7+/jF3ijJvf87a3C53ii92iICjq0V/jYUFBQkfIrnIylOHk3ygqD8DBDh9jyo5O3CQlS1peDyClklrcVwNDyxvgB1ld/j6+j1yezxwejd2hTmAkiZkbw0zOE5gbQkgIippditmc8DP0TJwgNrj5Cpndff5+T1jaUh4gD1hbiJqfTuBlhpKVChgbfDz9CxqeAMPESx0hhtQWy1lcB1QWnacpPT299/m55uztYqqsi9qdQQKCxdOWDNygSo0Nejt7UmCkDEAABdMVzpxfipibhQEBHOZoKQCAj+EmFOIlT5zfmOMkz5xerXGyOHo6dAAAMAAAD6ElzBzgylibzJ5jfb4+AMCAhE0OhU6QYeipuwDAzN5jDF/kTR7jTV6jCJYYylicDqAkzJ4izh8jhA0OihgbMrW2S1ndChibilpeDJ4jH2gqDJ3hydsfStsfDF1hQkbHTZ6jTl+j0pgbdjj5D2Dltzl53MCAipkcjyBlPr7+zyAlDdSVTF/khpKU6K6vRI4PjR3iDZDRC9gbR5UXQACATF6jnuiq+7x8SpgbUGIm/0DA561tytreDWBky9xgzyClRIzOSdkb3ugp6W+wqW+wz6DliBYYuvw8K/Cww4xNT6FmC9sfA8AADlveJClp1qFjSpodSpkcDVKSzyBlbLFyDh/kaW8v42ts+vv8Dh4ihAsMjJ7jhAyOCVcaBY6QD2ClfH19XiepTV3ia/CxC48PnmepjR2h9Dc3RdCSjJeauHo6ipicAYdILnJy/H09TJwfrHCxM3b3Tt/kXicosbU1jd5iittfTR8kf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAOkALAAAAAAUABIAAAj/ANMJHNjBjSVxlLZZGciQYQBDWVaA0XEizali3xoOjGZNDoklxAjIoICuERIiGo0AezVNmQABEl5KMFeDjZOBQmqRwzFlAYCft3wCWEDG1xpan5Ids3HBjwsNGvi4ktWnk7FxkiLtUZLjCi41mABxa5JqUhIu2nyM4jBnwoQg5dLVySOFyg8GZfScsXNpVQsGkEiJgdEhnYdZzCp8KNULDopuNN6EYYBnh6kqAdJpQkZHQahsW5b9ecTjGZQP12xdMCEwwyJBCCy0evGEwIFdjAghIrApRIMI6TKwUIRAQTBRQyDEgTAI1IYDmUJIy+yhAQZoCoBUK+RAhIMYzTgcX0CAwQzwdNS6BEJTxIuuBPB7pNhQCZYjbwMDYAFXgcmwQw+I8AAvd3hCQSK5gNAQK1pwcoQFBUSoijOxCBOOgg3d0MYvY0RhwIclnDODCplpJBAq2IwwwIoDjPCFRgEBADs=", "transformer"],
							"(li)" : ["data:image/gif;base64,R0lGODlhEwATALMPAN2pF2yTyPHbfq3I5Fdwq4+r0frwxff7/MTU69zo8Yaaz0Bcn6G02q6932aAvv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAPACwAAAAAEwATAAAEZ/DJOc9BKR3Kn81FEQSD1XFhwTBF2VnIIKtFLG/W1zQKwisKx6ARSDwysQIQgeGJHIiR5JAYBBw9BGPAUBC+Qk4iQHBgzQTAYuHAJXwFx3pOnxMa3UB9HSic/oCBgoOEhYaHiImKfxEAIfkEBQoADwAsBQAKAAUACQAABBLQHPOeuRVd+jTun3VUFieSVgQAIfkEBQoADwAsBQAKAAUACQAABBJQGPGqfUXoCu7rVCVZm2hcQgQAIfkECRQADwAsAAAAABMAEgAABHrwyUlfqrgexkpBGcYMT0OCYYKAjfms2TEgzPtwylpQKtdcEk5B8VDsJAdEIVBLNBANhmMaQFGWCgUj63gQHAFeSeH4mgnoLxgx6JjL5ULjARAAMvV7JZ8R+Ct+ehgLd4J0AgshDwt+AhN2ihKMgo6REnWWGIaZl5UZEQAh+QQFCgAPACwAAAAAEwATAAAEe/DJOc9BKR3Kn81FEQSD1XFhwTBF2VnIIKtFLG/W1zQKwisKx6ARSDwysQIQgeGJHIiR5JAYBBw9BGPAUBC+Qk4iQHBgzQTAYuHAJXwFx3pOnxMa3UB9HSicKAIGAn9/BoaEJwUCi4gdAIYGjRyPg5KAkZYTjJkSgZyWEQAh+QQFCgAPACwFAAoABQAJAAAEEtAc86p9yOiKLn5UJVmbeFxGBAA7", "lightning"],
							"(music)" : ["data:image/gif;base64,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", "music"],
							"(rain)" : ["data:image/gif;base64,R0lGODlhEwATALMAAP///+/v7+bm5t7e3tbW1szMzMXFxZnM/729vbW1ta2traWlpZycpZmZmWaZzP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAPACwAAAAAEwATAAAEcfDJ+dpqjWq9hk9GgmyUIgQBERaEQibWmRpNSiQacjaATaAqHCXhIxhVBpqBMbEcjcloVLGoSK9YA+LCwHi/YIzr4ZiUJWfy5qBml90PuCZNN1Pe7TzejuarNXCBeht1fYZ9gnh7h4V/FGwSkHETkg8RACH5BAkKAA8ALAAAAAATABMAAARy8Mn52mqNar2GT0aCbJQiBAERFoRCJtaZGk1KJBpyNoBNoCocJeEjGFUGmoExsRyNyWhUsahIr1gD4sLAeL9gjOvheBzIZvS5fJ6UJW80fLNOs9VySnzv1tv/dW1zg3lxE4F4d4aEfISJgHiHkhKCgg8RACH5BAkKAA8ALAAAAAATABMAAARy8Mn52mqNar2GR0aCbJQiBAERFoRCJhaaGk1KJBpyNoBNoCocJeEjGFUGmoExsRyNyWhUsahIr1gD4sLAeL9gjGviIJslZfPhUV632Y/1GY6eT9xxOB6vSdP/fnqCb29zfocbe4N5gXWOgBRrknmTkw8RACH5BAkKAA8ALAAAAAATABMAAARx8Mn52mqNar2GR0aCbJQiBAERFoRCJhaaGk1KJBpyNoBNoCocJeEjGFUGmoExsRyNyWhUsahIr1gD4sLAeL9gjOtxeDjIZvS5fNa005L3O81W28sTeX6vqfvpcBR6cXyEf2uAhYOBE4d3jBJ4aJGNEhEAOw==", "rain"],
							"(sun)" : ["data:image/gif;base64,R0lGODlhEwATANUAAP//5v//zP/mlP/mjP/mhP/vIf/ma//mUv/ehP/eY//eIf/WY//WIebWUv/OUubOUv/FIf+1Sv+1Qt69If+tGf+lUv+lOv+lGf+lEP+cSv+ZM/+UKf+ZAP+MSv+MKf+EGTMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAhACwAAAAAEwATAAAGrMCQcCjsfDrE5LCDNH6OIaZS+PxcrtfqNPThcARgsPeT7Gy6CMRgIBgQ0pwnMrrBLBJ4gx6fWMTnXBwODyAgDQcNhQ8OcUscEAwgCgUglAUKIAwQHEgVEo8MkwWjpAqafxIaoKKko6abcqqQla2jmbBNoBO0pCATp4CyDLuFhb8MjUUaFJAMoQqmzrBkURpdEM3O0n+AQsuP2NhjWxoaHV7oWlNSTlBSW0tQU0EAIfkECQoAIQAsAAAAABMAEwAABhrAkHBILBqPyKRyyWw6n9CodEqtWq/YrFYZBAAh+QQFCgAhACwAAAAAEwATAAAGsMCQcOjpDDueoVKJ9BSdxaUQ2bxYrc6OlunkcARgsBeqzHg4CMRgIBgQ0hwnUYNZJO6G/D2x4BhDUBwODyAgDQcNhQ8OcUZIHBAMIAoFIJUFCiAMEI0AEZAMlAWjpAqbcR4BFaCipKOmnEYeFqCWrqOanEmPkRO2pCATp1EdtL2FyMIMqH8VFJEMoQqm0bF/IRZnENDR1ahKTs6Q29teTVIA2V7rclJHUE1R7u9E10NBACH5BAkKACEALAAAAAATABMAAAYawJBwSCwaj8ikcslsOp/QqHRKrVqv2KxWGQQAOw==", "sun"],
							"(hug)" : ["data:image/gif;base64,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", "hug", "(bear)"],
							"(muscle)" : ["data:image/gif;base64,R0lGODlhEwATAOYAAP/39/f37/fv7/fv5u/m3u/m5ube1ubezubWzt7Wzt7Wxf/Mmd7Oxd7OvdbOvf/FjPfFlPfFjO/FlNbFvfe9jO+9jPe1c/e1e++1e/e1a++1hOa1jO+1c+a1hN61hM61pc61nPetY/eta++ta++tc8W1nOate++tY96te9ate8WtlO+lY++lWu+lUt6la9ale72ljO+cSuacUuacSt6cWs6cc+aUSt6USrWce86UWtaUSs6UUq2UhK2Uc9aMSs6MUs6MSsWMSrWMWq2Mc62Ma72ESq2EY7WESq2EUq2EWqWEY6WEWrV7Sq17SqV7WqV7SqV7Upx7WqVzSpxzUpxzSpRrSpRrQmZmZkJCQkI6Ov///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgBaACwAAAAAEwATAAAH1YBaBjBUOAZaiImKiQNGSR5IS4eLlB9UCxIVSDyUlFQvEBwcLlAAnYpUEBgnJCIsSaeJUBcjLD4+NlCxiFAPIzJMVMGeVFQwWlQWI1lZU0QIi1QV08bMWVhZBJ3SFSQ5VFlXV1jYqMVB3d7g48zFiNwVQSQkK9/WIxUQT1TI0/P0MYIUu8FixYgREaBY6ZCORIyAAokUmRGDxcGEKAA+hMivx8SKBuet2MgRUYMoRYLYADlyYxCBKhIxcHIkyA2SLwXyW4RACRMgOV8Wi3kKRLGjOxcFAgAh+QQJCgBaACwAAAAAEwATAAAHnYBagloqVIaDiImChRUVVDCKioyNjpGJVI0kmo+WgpiaK6BUnVqfJDFBMTGjnVlZJCtBVEGyiIacWllXrresnpSculdYWZGYFSQ5o65YxLaGQcjJo1QkrlmsxxVBoMqloY2Hx5qwqNQroSSO45qqtKMfVDHpjsgrqqjvnqro5Pf4+gbN4ocOXz5fngYapCUL4SJoDN9RUdGp161IgQAAIfkEBQoAWgAsAgAAABEAEwAAB82AWoKCB1RUH4OJiiVJFSlWDIqDBQ6GCxUQQlSSgkNUJg8YJBc1m5xUGxgjLCQcOVUKkgRZFiMjMz8sIVIDkllXWRc0TU02PqaGVDBav8BZVckqWlQV1cq/WFhZAwbJhtUkOYZZWdofVDXVFUEVJOGGIxrk3+rrJCviVCscFCsrVOzauVsRI8ghKrYgrDA4wh2JGAUNTmMxgoM/WwQhRtxERQZFDP4yQgwicZqPGBQziNw46NyMGC1YjCRpKBEMKkWA6JhZU5EAFd6ScQoEACH5BAkKAFoALAIAAAARABMAAAcdgFqCghODhoeIiYqLjI2Oj5CRkpOUlZaXmJmaloEAIfkECQoAWgAsAAAAABMAEwAAB52AWoJaKlSGAYOJioRUFRVUMIuLhY6OVJKKjRUknJCYgo2cK6KXn6EkMUExMaWYWVkkK0FUQbOJhp5aWVevuK1amo+Ru1dYWZKaJDmXr1jGt4ZBm8qXVCSvWaXBQaLLwKOW1Y6csanVK6Mkj8mcq7WXH1Qx6Y+bK6up76Cr6OT3+PoG0eKHDl++X8AGGqw1CyEjWgzfUVFhypchSYEAADs=", "muscle", "(flex)"],
							"(brokenheart)" : ["data:image/gif;base64,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", "brokenheart"],
							"(heart)" : ["data:image/gif;base64,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", "heart"],
							"(inlove)" : ["data:image/gif;base64,R0lGODlhEwATAPYCAP9CQv/ehP+9e85rSv/etf/mpf/vxf+1Y///7zMzM//mnP+9c//mhP/35v/mzv+9Qv+9Kf+9MdYAAP+1Wv+9Y/+1Qv/Fa//FQv+1Ov+1Kf+tWv+tOv+tMf/Wa//37//mjP/eIf/eGf/WY//WUv/WOv+1Sv+1Mf+1If/WMf/WKf/WGf/WIf/OUv/OQv+lQv+lOv+lMf+ZM//WSv//9//vpf/eY//eWv/enP/erf/////OOv+lKf+9a/+tKf/Fc//MM//FOv/FKf/FMf/FIf/mxf/OKf/OIf/39/+9If8AAKUAAM5rQsxmM//v3s5rOs5zWs5za+/Wvc5KIf97e85jKdZSKc57e3MZGc5aMc5aIc5KGc5jIcVCGcVSUsUxEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgACACwAAAAAEwATAAAH/4ACgoIOCy4HiC4LSUkCjIKPjAQIlJQEEgCMEgKYU4xJEgaio0oSoEoCpZmnBQUKrQUDpUpQAl2lp04BAQwMuwFLSlgaAg5es0wfHg00DQ0fIh1MHTGFMFxKVCMzCQk53TMyIyMsMAsvOxdbLToI3d8JCCQ6LS09LzA9ET8/RTXODJzZSFHkR5AeMGBkOBGkSJEVEEGAgGikSBAkJxJmgIBkiBGIKkKEUKHCiJEhSDLA2MABQpAhCT6CVLEiJkoOG3i0DNIwQQqIEGNahMDBh4MNJng67MbU4dANDgRMwBBBCD8UWLHyExIEwwRBDTZgsPpDh1mzWzFAHdSgAgYgQCHOogVSoUKDQYMoVHjwAC6QCw8qUMBLmIiPEhUQlzBKOBAAIfkECQoARAAsAAAAABMAEwAAB/+ARIIARA4LLgeJLgtJSUSNgpEHAgQIlpYSAFONSZlEDS44BqOkBkqZjRJKny43BQAFsQqxA6edSlZEGhYBvb4MDL1Op0pVhQAdHQAiHx4NNA0NHyJMSkwxhjAsLCMjMwkJOeAzMiNULDALLzsXLS06CODiCQgkOu49LzA9ET8/RTWiMYhmI0WRH0F6wICR4USQIkVWSAQBQqKRIkGQnFiYAQKSIUYkqggRQoUKI0aGIMkAYwMHCEGGJAgpUsWKmSo5bODxMsjDBCkkSpyJEQIHHw42mPAJEZxTiEU3OCAyAUMEIf5QaNXqT0gQDBMENdiAAesPHWjRdsWwoUGkBhUlMAABklYtkAoV3EYSRKHCgwdzgVx4UIHC3sMOfJSosLgE0sOBAAAh+QQJCgBJACwAAAAAEwATAAAH/4BJgoIOCy4HiC4LDoIAg4MAEgQIlJQEAgcej0kNLpEGoKEGADguDYOdNwMDBa0KrbA3po4aFgG3uAwMuLcWGkkOMR3DIh8eDTQNDR8iAMMAhTAsLCMjMwkJOdgzMtUsMAsvOxctLToI2NoJCCQ65T0vMD0RPz9FNcoMyjYpRT9BPWDAyHAiSJEiKxKCAJHQSJEgSE4IzAAByRAjCVWECKFChREjQ5BkgLGBA4QgQxJgzKhihcqQHDbwMBnEYIIUCROqfAiBgw8HG0zUPIit6EGeGxhNwBBBSD0UUKHWExIEwwRBDTZgcPpDh1evUzFsOIW1AgYgQL6CBVKhAtlHFBgqPHiAFsiFBxUoHNk0iIiPEhUAl/i5KRAAIfkEBQoAAAAsAAAAABMAEwAAB/+AAIKCDgsuB4guCw6DjYISSRIIk5MEAgeOAA0uShJKBqChBjguDYObNwNKAwUFCq2wN6WCGhYBAUu3AQwMurcWGgAOMR3FIh8eDTQNDR8ixR0xhTAsLCMjMwkJOdozMtcsMAsvOxctLToI2twJCCQ65z0vMD0RPz9FNcwMzDYpRT+C9IABI8OJIEWKrFgIAsRCI0WCIDlBMAMEJEOMLFQRIoQKFUaMDEGSAcYGDhCCDEmgcaOKFSxHctjAA2UQhAlSLFzIMiIEDj4cbDBxM6G2owl9bmA0AUMEIfdQSJV6T0gQDBMENdiAAeoPHWDBVsWwwZTWChiAAAkrFkiFCmYaG1Go8OCBWiAXHlSgkGkQER8lKgQu4YOIo0AAIfkECQoAAQAsAwAAABAAEgAAB0CASUkOggEBABKGioYSAIKJh5CLAUoSSRJKhk9Pk4YDlUoDnYpNhktKTqOjTKqtrq+wsbKztLWzRLawDrmuR4qBACH5BAkKAAQALAIAAAARABMAAAf/gARJSQ6DBwcSSRJRBI2NEgBTg4oIShJKAgeOBJYAg5cGT0pPBjguDY1SlopKAwoFAwWyNy5NjUuWSk4BDAwBv78WGo0dTEpLHg00DQ0fIh3QMQ4sLCNUMwkJOdkzMiMjLDALFy0tOgjZ2wkIJDrlPS8RPz9FNcwMzDYpRT9BPTAnghQpsqIgCBAFjRQJguQEDAhIhhgpqCJECBUqjBgZgiTDwyBDEkykqGKFSI4cNkAIIjBBioIFRS6EwMEHAZYDs+kcOHODAwwRhMxDQZToPCFBMExohEHoDx1QoR7FsAEVgQoYgACJKhVIhQpWG1Go8OCBViAXHlSgsKmtWwdtAgMBACH5BAUKAAoALAIAAAARABMAAAf/gAqCAAsuB0lJLoiCjIIHAgQICBIAiBIHjQAuOAadBkoSSRJKOC4Ngi43BasABQOgSgMFN6YKFgG4uQxOSk65FhoKHQAdIgAeDTQNUB8iHc8xDiwsIyMzCQk52DMy1SwwCxctLToI2NoJCCQ64z0vET8/RTUNDQz1NilFP0E9MCdBihRZQRAECIJGigRBcgIGBCRDjBBUESKEChVGjAxBksFhkCEJJE5UsSLkRg4bIAQJmCAFQYIhFULg4MPESoHYcgqUucEBhghC4qEYOjSekCAYJijYgCHoDx1QoRrFsOFUgwoYgACJKhVIhQqnGFGo8OCBViAXHlSg0IgRER8lCCrELeHDQdtAACH5BAUKAAEALAEAAAASABMAAAdKgAGCAQ6DhoeIghIAU0mOEh6DABKHSouPSoaThgUDlkkSSgOGVViITpZKTokdgh+DUEpLibQBV7W4ubq7vL2+v71EwL6Fw8aEu4EAIfkECQoADwAsAQAAABIAEgAAB1SAD4KDggcHAAsOhIuDCI4IBAIAEoMSSZSDAAabm5ODShJKBaOjCqQAAwMPTYJKSwGwsAwMsYxMjAANDQCMvYMJvsHCw8TFxsfIyb2KyscNzcZHg4EAIfkEBQoAJQAsAAAAABMAEgAAB/+AJYKCDgsuB4guC1GDjYIHAgQIk5MEAhJJEoJJSQ2cBqChoUoSSoISAJwSBawFCq0FA0pSTSWkmUoBugEMDLsBSxYaJU+kSkwiHx4NNA0NHyId0jGFWkpUIyMzCQk53DMy2SwwCy87WS0tOgjc3gkIJDrpPS8wPRE/P0U1zgzONimK/AjSAwaMDCeCFCmyoiEIEA2NFAmC5ITBDBCQDDHSUEWIECpUGDEyBEkGGBs4QAgyJAHHjipWuCzJYUMJlUEUJkjRsKHLiRA4+HCwwUTOhdySLgS6wUGJCRgiCMmHomrVfEKCYJggqMEGDFN/6Bg7FiuGDQ0GNaiAAQgQsmUUgVSokNYRhQoPHrgFcuFBBQqNAgEAOw==", "inlove"],
							"(mooning)" : ["data:image/gif;base64,R0lGODlhEwATAMQAAP/////Fvfe1te+ttdalte+cpeaUnNaUnP+EhOaElNaEjHOcxbWMnHOUtVqUtcVjcwCU1sVaa1JzlFprlAB7va1KKQBjjJkzAAAhWgAAmQAAewAAZgAAAP///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAdACwAAAAAEwATAAAFpWDXHVFZHmKqiiQAJEEQoasaJQCXDHFUp5FBYmgIDAq+X6c0aBaalmj0d0AYCoQoZAuROlYRhpZL7n5ZEcmWQimzu+iBBcKu29mWWVCOl/otFBYDTBEYURmIGRuJGVGDexiLiRqSGRoaGIMkAxgYl5cbG5+UGDMjJZGhoamqGDQpE56XnbKdSp2IGLG5Ez8VFxe0HbTANRXHv8HDwMkryMfFzMgiIQAh+QQFCgAdACwAAAAAAQABAAAFA2AXAgAh+QQJCgAdACwAAAAAEwATAAAFFmAnjmRpnmiqrmzrvnAsz3Rt33iuqyEAIfkECQoAHQAsAAAAABMAEwAABaBg1x1RWR5iqookACRBEKGrGiUAlwxxVKeRQWJoCAwKvl+nNGgWmpZo9HdAGAqEKGQLkTpWEYaWS+5+VZIthVJed1MkC2RNr68trKB0z4+iggMWTU1DgEIJFjNBERgmjo8YA0wDGBgalxobG5iZkYpNGJqioaIbniMlE5aXlauVJyuVGRkYqrMYShUXF60drbs1FcK6vL67xCvDwsDHwyIhACH5BAkKAB0ALAAAAQATABIAAAWbYNcdURk9h6iuIgkASRBEKbtGCcAlgxzZqsggQTQEBpZk0lYaOAtJiBSidKwOCEOSwu12LdagckxetpoygC+gPv5GQqFAJjBE5ke7SDjgO4l+gClxERiGGIAJh4Y0fIUZkIsYkBkYfSROGBqbG52dmxqWPyQlmhqdGJ+MNCyGka6VQB0VFxeHE4e1NhW8tLYdGLW+LL28usK9IiEAIfkEBQoAHQAsAAACABMAEQAABZhg1x1RGT2HqK4iCQBJEERsHSUAlwyB5fsOVmSQKBp8EIryFxSVBgOfYtpoLKYKCwshKckGEUvkW1KRhjKAbKwOgFXDoUAmMETmbrsTOoQSE31/NB1xJUWHN4gYe2AYjiYZJhGPByRQGBkZjpmajo5vlgOYnKOdfC0lm52jiyUpKhUXF54TnrI1Fbmxsx0Ysrssurm3v7oiIQAh+QQFCgAdACwAAAAAAQABAAAFA2AXAgAh+QQFCgAdACwAAAAAAQABAAAFA2AXAgAh+QQJCgAdACwAAAIAEwARAAAFFWAnjmRpnmiqrmzrvnAsz3Rt3/gdAgAh+QQJCgAdACwAAAEAEwASAAAFm2DXHVEZPYeoriIJAEkQRCm7RgnAJYMc2arIIEE0BAaWZNJWGjgLSYgUonSsDghDksLtdi3WoHJMXraaMoAvoD7+RkKhQCYwROZHu0g44DuJfoApcREYhhiACYeGNHyFGZCLGJAZGH0kThgamxudnZsalj8kJZoanRifjDQshpGulUAdFRcXhxOHtTYVvLS2HRi1viy9vLrCvSIhACH5BAkKAB0ALAAAAAATABMAAAWgYNcdUVkeYqqKJAAkQRChqxolAJcMcVSnkUFiaAgMCr5fpzRoFpqWaPR3QBgKhChkC5E6VhGGlkvuflWSLYVSXndTJAtkTa+vLaygdM+PooIDFk1NQ4BCCRYzQREYJo6PGANMAxgYGpcaGxuYmZGKTRiaoqGiG54jJROWl5WrlScrlRkZGKqzGEoVFxetHa27NRXCury+u8Qrw8LAx8MiIQA7", "mooning"],
							"(poolparty)" : ["data:image/gif;base64,R0lGODlhEwATAMQAAP/37//35v/v7//v5vfm1vfmzv/e3v/ezvfevffWtf/MzN7WxffOrffOnPfOpe/FlP+1tf+tpf+ZmfechP+ZZsWlc/+MjP97e2aZzP9za/9mZqV7UoxaIcwzAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAeACwDAAAADQATAAAFZ6AnesvGbcuoetXjVuv4YPMTi4z7MLcHJI8EIHbQGREig0UzMeoGno5Gk3lQrA/EozEUaCQNncMzeBA8Co0i50p4CGPP5UuX0CMizdLOp4v6gBoQKy4ehTeFhzGJNog2ioSPjZFGKiEAIfkECQoAHgAsAwAAAA0AEwAABSegJ45kaZ5oqq5s675wLHuFhyD06XhAw58+wC5wwhVqOBPA41j6YCEAIfkECQoAHgAsAwABAA0AEgAABWugJ3rLxm3LqHrV41br+GDzE4uM+zC3BySPBCB20BkRIoNFMzHqBp6ORpN5UKwPxKMxFGgkDZ3DM3gQPAqNIudKeAhjz+VLl9AjIs3SzqeL+oAaECoFWVoFNw4PAGFDMTkDkDdlDJQ3TjYjIQA7", "poolparty"],
							"(party)" : ["data:image/gif;base64,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", "party"],
							"(pizza)" : ["data:image/gif;base64,R0lGODlhEwATAPUAAO97Sve9nMwAAP/MM//37+ZrKbWMGf//97WUMf/39//WWuZzGf+tSuacSv+9a/+lOuZzOv+lMf+cOv+tUu+MY//ea/elSu/v5v+1Y/+tQvelId6lWs6EIeZjIe97Kd5KGe+cQv+lQvetSv+lSv+lUvetOv/v5v+tWrWUOu+USs6EGf+tOu+cSgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAAACwAAAAAEwATAAAGz0CAcMgiSY6WzWXIFE4mEYhUGslgCE0ANNUReL0dSATTdES9i3TaK2YknAyIID1QDDSDNYRxEj7kCwOCdQMGggsCEBIADWeBCIYIdXaIHQ8jEoCDGgqdAyqGlUeaggoVFQgKBpKimXMDHAamIhV2dYgFR12BBrKnKJIKCLhHHq+EnbaUArkgD7uyhYYlhbgRIQkhu4Oxd9XMElgTDx9zgYN51iFCB+MFaGqIzNcmTCMPBe9fzAWXB00HRoRYka/gNTdZhBAI8UBChIcjsDAJAgAh+QQFCgAAACwAAAAAAQABAAACAkQBACH5BAUKAAAALAAAAAABAAEAAAICRAEAIfkEBQoAAAAsAAAAAAEAAQAAAgJEAQAh+QQJCgAAACwAAAAACgAJAAACCISPqcvtD2EBACH5BAUKAAAALAAAAwAJAAYAAAUcIAA4YilODGSKDyQsZdBE7jKUUj3sYv7uAwUgBAAh+QQJCgAAACwAAAAACgATAAACDISPqcvtD6OctNpbAAAh+QQFCgAAACwAAAMACgAPAAAGR0AAwCEsFicMiLH4gAgWxQCgEXEuBkaJdcAtap/cgQJQ+V45BkVFJOmADWmhxAMWF0EP98JgTIT0SwATDx+BAAcThopLB4FBACH5BAkKAAAALAAAAAATAAoAAAIMhI+py+0Po5y02lsAACH5BAUKAAAALAAAAAASAAoAAAVJICCOpGRtF6mqEBRlGLGugtC5GOnMy1JDogRgwgCqNIOe6gERLEYBwMAwGFEAjUhzUR0NFCvJdkAegcNj8nkGEDsHHIOiIoqqQgAh+QQJCgAAACwAAAAACQAKAAACCISPqcvtD2EBACH5BAUKAAIALAQABQAFAAUAAAIGlBWne6AFACH5BAkKAAAALAAAAAAQABMAAAIPhI+py+0Po5y02ouz3hwVACH5BAUKAAwALAAAAAAQABMAAAZmQIZwSJRYNheicgiBRDIYwpIoEHScmOlwsahCtEPNgAtmBBgDw6A8HCjYwzccDlieh5KOYJE2yBkIbggLEh57A25KbmMgD3oLBlMGXQkhj0t1DF0MEw8fbAUMBxNzpUoHbAlzUgxBACH5BAkKAAAALAAAAAAIABAAAAIKhI+py+0Po5ysAAAh+QQFCgABACwEAAkAAQABAAACAkQBACH5BAkKAAAALAMAAAANABMAAAINhI+py+0Po5y02oszLQAh+QQJCgAMACwDAAUADQANAAAEIpBJGaa9OOt9Aa4cgwwKsmzkcG7GImge44ZMQd/MsRFMEgEAIfkECQoADAAsAwADABAADwAABCSQyUmrvZiFzLv/FGBtIDIoyOKdg+oZi9CJTAwyxU0dXfIRlQgAIfkEBQoAAgAsBAAFAA0ACQAABROgIArBaFJmqq5sC6hlK880+5ohACH5BAUKAAAALAAAAAABAAEAAAICRAEAOw==", "pizza"],
							"(swear)" : ["data:image/gif;base64,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", "swear"],
							"(beer)" : ["data:image/gif;base64,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", "beer"],
							"(drink)" : ["data:image/gif;base64,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", "drink"],
							"(smoking)" : ["data:image/gif;base64,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", "smoking", "(smoke)"],
							"(cigar)" : ["data:image/png;base64,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", "Cigar", "(cigar)"],		
              "(doctor)" : ["data:image/gif;base64,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", "Doctor", "(doc)", "(dr)"],
              "[!]" : ["data:image/gif;base64,R0lGODlhDgASAMIHAP3+/qiqy1RZmSKx////IgAuowAAXP///yH/C05FVFNDQVBFMi4wAwEAAAAh/hFDcmVhdGVkIHdpdGggR0lNUAAh+QQFlgAHACwAAAAADgASAAADDni63P4wykmrvTjrzXtPACH5BAUiAAcALAMAAQAJABAAAAMTeBrH2iFKKKu9OM/Nmf5gKI5WAgAh+QQFIgAHACwDAAEACQAQAAADF3gqI7oiyiOrHDg3y3skEhiOXmmeaGomACH5BAXIAAcALAMAAQAJABAAAAMgeFrHeiZKA6d92GpZNOxV9FFaZ3XolJpqaaTcK5+blgAAIfkEASIABwAsAwABAAkAEAAAAxV4KsfaIkooq3vL6h0pZRMnjmRpkgkAIfkEASIABwAsAwABAAkAEAAAAxN4GsfaIUooq704z82Z/mAojlYCADs=", "Tardis", "[!]"],
							"(wasntme)" : ["data:image/gif;base64,R0lGODlhEwATAOYAAP//////9///7//35v/vxf/vvf/vpf/vnP/mzv/mpf/mnP/etf/erf/enP/ehP/eY//eIf/eGf/Wa//WUv/WSv/WOv/WKf/WMf/WIf/MZv/OUv/OQv/OOv/OKf/Fc//OIf/MM//Fa//FQv/FOv/FKf+9e//FMf/FIf+9c/+9a/+9Y/+9Qv+9Ov+9Mf+9Kf+9If+1Y/+1Wv+1Uv+1Sv+1Qv+1Mf+1Ov+1Kf+1If+tWv+tOv+tMf+tKf+lQv+lOv+lMf+lKf+ZM5lmMzMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBEACwAAAAAEwATAAAH/4BEgoIIKD0wiD0oCIONgjAlCwKTkwslMI5EAz0MBARCoJ+gDD0Dg5sNCQlCqgqqqkINpYI5IQ63BAFDQ7m7tyE5RAhBEsUFAAC7yLsFxUGFPxoaEwHI1tYBExo/KD5AIhsb1dfY4Tw+PzwtICAG5NYJICQ8Pz83OCQdHQeTB/wCBzqQeIGj3g0XL058wMAwQgSGGD6ceHHjh44dLkgoXIgBAgSGHyS+2KEjBUYS+TpYWIlhpT4SLnYs0lEDpb6VOC28bKGDUQwbLUyAGHKhaFF2JkjYiCFogA4bQofu4sABqQ0dpprSsDFiBNWvIEbQoJG1kQoaK1aIGCFCxAoaKg4yDULgYQYNuzM8MGoUCAAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwIAAQABgADAAAHDoABBEREgoSHRENDhIqBACH5BAUKAEQALAcABQAHAAMAAAcQgEQAAESCAEOCRIiHi0OIgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwFAAIACgAIAAAHNYBERASEg4VECUKKRIpCCYwOkZIOQhIPl5iXEhMUnZ6dExWio6McFxaoqagdRBhDrxCvQ0SBACH5BAUKAEQALAUAAgAKAAgAAAc1gEREQoSDhYMJCQqJiUJEBAEBBJCSDgUAmJmYBQEAQ0OYnwCRnqClowaamglEBwICB66wRIEAIfkEBQoARAAsBQACAAoACAAABzSABIKDg0QJCUKJRIlCCYsOkJEOQhIPlpeWEhMUnJ2cExWhoqIcFxanqKcdRBhDrhCuQ0SBACH5BAUKAEQALAUAAgAKAAgAAAc1gEREQoSDhYMJCQqJiUJEBAEBBJCSDgUAmJmYBQEAQ0OYnwCRnqClowaamglEBwICB66wRIEAIfkEBQoARAAsAAAAAAEAAQAABwOARIEAIfkEBQoARAAsAAAAAAEAAQAABwOARIEAIfkEBQoARAAsAAAAAAEAAQAABwOARIEAIfkEBQoARAAsBwAFAAcAAwAABxCARENDRIJDAIJEiIeIioiBACH5BAUKAEQALAgABAAGAAMAAAcNgENDRESChIdEAIqLgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQFCgBEACwAAAAAAQABAAAHA4BEgQAh+QQJCgBEACwAAAAAEwATAAAHHYBEgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmoqBADs=", "itwasntme"],
							"(makeup)" : ["data:image/gif;base64,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", "Makeup"],
							"(think)" : ["data:image/gif;base64,R0lGODlhEwATAOYAAP//////9///7//35v/vxf/vvf/vpf/vnP/mzv/mpf/mnP/etf/erf/enP/ehP/eIf/Wa//eGf/WUv/WKf/WMf/WIf/MZv/OUv/OQv/OOv/OKf/Fc//OIf/MM//Fa//FQv/FOv/FMf+9e//FKf+9c//FIf+9a/+9Y/+9Qv+9Ov+9Mf+9Kf+9If+1Y/+1Wv+1Uv+1Sv+1Qv+1Ov+1Mf+1If+1Kf+tWv+tUv+tOv+tMf+tKf+lQv+lOv+lMf+lKf+ZM5lmMzMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBCACwAAAAAEwATAAAH/4BCgoIIJDstiDskCIONgi0iCwKTkwsiLY5CAzsMBARAoJ+gDDsDg5sNCQlAqgqqqkANpYI2Hg63BAFBQbm7tx42Qgg/EMUFAAC7yLsFxT+FPRcXEgHI1tYBEhc9JDw+HxgY1dfY4To8PToqHR0G5NYJHSM6PT01NCMaGgeTB/wCBzSMYEGjXo0VLEpwqMAwQgSGFTiUYFGjB44cK0YoXFjhwQOGHCSyyIHDBMYR+TRMWFlhpb4RK3JsQIBjBkp9K3NOeKkCByMXMlSE6LBrFwUK7EKEkOFC0AAcMoZ2yECValIZOEw5jSEDBIiqVkHEiKG10YkYKFB8APHhA4oYJw0yDUKwAUYMuzBmOgoEACH5BAUKAEIALAAAAAABAAEAAAcDgEKBACH5BAUKAEIALAAAAAABAAEAAAcDgEKBACH5BAUKAEIALAAAAAABAAEAAAcDgEKBACH5BAUKAEIALAAAAAABAAEAAAcDgEKBACH5BAUKAEIALAAAAAABAAEAAAcDgEKBACH5BAUKAEIALAAAAAABAAEAAAcDgEKBACH5BAUKAEIALAAAAAABAAEAAAcDgEKBACH5BAUKAEIALAAAAAABAAEAAAcDgEKBACH5BAUKAEIALAYABAAIAAsAAAcbgEJBQgSChIYAiEKLjI2Oj5CRkpOSHYxBg0KBACH5BAUKAEIALAAAAAABAAEAAAcDgEKBACH5BAUKAEIALAUAAgAKAA0AAAcrgEJAggSDQgSCCUIKikKJQkGHkJKOkQCTl46am5ydnp+goaKjnRQUmpFCgQAh+QQFCgBCACwAAAAAAQABAAAHA4BCgQAh+QQFCgBCACwAAAAAAQABAAAHA4BCgQAh+QQFCgBCACwAAAAAAQABAAAHA4BCgQAh+QQFCgBCACwAAAAAAQABAAAHA4BCgQAh+QQFCgBCACwAAAAAAQABAAAHA4BCgQAh+QQFCgBCACwAAAAAAQABAAAHA4BCgQAh+QQFCgBCACwAAAAAAQABAAAHA4BCgQAh+QQFCgBCACwAAAAAAQABAAAHA4BCgQAh+QQFCgBCACwFAAIACgANAAAHK4BCBEJCQIOFQglAiQqEiYuDQYJCkoQAlEKXlY6cnZ6foKGio6SfQZsdhIEAIfkECQoAQgAsAAAAABMAEwAABx2AQoKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqKgQA7", "Thinking"],
							"(rofl)" : ["data:image/gif;base64,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", "Rofl"],
							"(whew)" : ["data:image/gif;base64,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", "Whew"],
							"(smirk)" : ["data:image/gif;base64,R0lGODlhEwATAOYAAP//////9///7//37//35v/vxf/vpf/mzv/mpf/mhP/mjP/etf/erf/epf/ehP/eY//eWv/eIf/eGf/Wa//WUv/WSv/WOv/WMf/WKf/WIf/OUv/MZv/OQv/OOv/OKf/Fc//MM//OIf/Fa//FOv/FQv/FMf/FKf+9e//FIf+9c/+9a/+9Y/+9Qv+9Mf+9Kf+9If+1Wv+1Y/+1Sv+1Qv+1Ov+1Mf+1If+1Kf+tWv+tQv+tOv+tMf+tKf+lQv+lOv+lKf+lMf+ZMzMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBDACwAAAAAEwATAAAH/4BDgoIHKT0xiD0pB4ONgjEnCwKTkwsnMY5DBD0MBZ6fnww9BIObDQioqaoIDaOCOCIOsrMOCbQOIjhDB0ETvhMPwcLBv0GFQBoaFAEAAAEVzM4UFBpAKT4/JBwcQkIAAhbdzh3bPD5APC0gIA8EBBAYEO4PHiAmPEDoNiYeHhn/ESL8C+HBxAsb+W64eIEixL8MEiQ8DIHixQ0gOna4MNHQYYaAAyla1KFCowkTQjxgWMmynwkXOxbpqHHSQ7ebQjC4bKGDEQwaLUqsA3Gh6IV1JUrQgCGIgA4aQkF0mDoVKQ0dpJrmoDFiBNWqI2jMyNpoxQwWLLqOIMFixopMgwwOfJAho62MD4waBQIAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsBQAHAAkABwAABxSAAUNCQ0MCg4WJiouMjY6PiIyEgQAh+QQFCgBDACwFAAUACQAEAAAHIoBDCgMCBgICCkMUQ0JCAI1DFR0BjY9CARYXDwQECZwPGIEAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkEBQoAQwAsAAAAAAEAAQAABwOAQ4EAIfkECQoAQwAsAAAAABMAEwAABz2AQ4KDhIWGh4iJiouMjYoPkJEPiwFDAAEVAQBDlYkBQkMCFgJDQp2IDwRDEBgQQwSTjrKztLW2t7i5uomBADs=", "Smirk"],
							"(nod)" : ["data:image/gif;base64,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", "Nod"],
							"(shake)" : ["data:image/gif;base64,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", "Shaking"],
							"(bandit)" : ["data:image/gif;base64,R0lGODlhEwATAPcrAP/RPf/RPs3Nzf/559mzPBAQEN+3NsysSP/88//dbp+fn9/f37KyskBAQD8/PzAnDP/cbvLy8i8nC8/Pz4CAgNnZ2ZmZmf/TR/Pz8//TSOXl5aWlpc2tSO/v72ZmZrOzs3Nzc5CQkL+/v//lkv/mkv///v/lkf/lkwAAADMzM////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgArACwAAAAAEwATAAAIsQBXCBTYYYODFP9SOLCwYKBDgQwKIJyYsACDhwIVUNyYUMFDDRITiuRYwSGIkSgpehi4gKPLhBMEhnjpkoLABjRTNhAo8QGBAAkGDDghNEEAAg8QroiQ0ECAAAhSpCghFcFTAwgjCGj6NOrUqlcRCtiaQsJPCEJNCIVwVIJYsinjvpVLd6xIDgAC5N2r94BIuwgBZAAAQGoKwhcA/MUg8gDhx5D9IlShgu5LFSIsx/0QEAAh+QQFCgArACwGAAgABgAEAAAIFABXCCQhMMUKFQYRHkwocMUIgQEBACH5BAVkACsALAcADwAFAAEAAAgGAFMIFBgQACH5BAUKACsALAcADwAFAAEAAAgHAAGsGAggIAAh+QQFMgArACwGAAgABgAEAAAIFQBXCDwhEMGKFCUOGkR4UOAKEwIDAgAh+QQFCgArACwHAAgABgAEAAAIFABXrCAhcIWKFSkOJkSoUOCIggEBACH5BAVkACsALAcADwAFAAEAAAgGAFMIFBgQACH5BAUAACsALAcADwAFAAEAAAgHAAGsGAggIAA7", "Bandit"],
							"(finger)" : ["data:image/gif;base64,R0lGODlhEwATAOYAAP//////9///7//37//35v/vxf/mzv/mpebm5v/mnP/mjP/etf/erf/enP/ehP/eY//eWv/eIdbW1v/Wa//eGf/WUv/WSv/WOv/WMf/WKf/WIf/OUv/MZv/OQv/OOv/OKf/Fc//OIf/MM//Fa//FQv/FOv/FKf/FMf+9e/+9a//FIf+9c8XFvf+9Y/+9Qv+9Ov+9Kf+9Mf+9If+1Y/+1Wv+1Sv+1Qv+1Ov+1Mf+1Kf+1If+tWv+tUv+tOsW1jP+tMf+tKcW1c/+lQsW1Uv+lOv+lKf+lMcWte8Wta8WtWsWtY8WtUsWle/+ZM8WcY8WUWoyMjJlmMzMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBTACwAAAAAEwATAAAH/4BTgoIGK0IziEIrBoONgjMoCwKTkwsoM45TBEIMBZ6fnwxCBIObDQdRqQcJB62tDaOCOyMOtbVRDqmptSM7UwZNE8IKAwIKDwqTCsITTYVGGxsVAFJSARbU1hUVG0YrREUkHR3ZAhfZAR7jQERGQDEiIg8EBBAZEPRBUEkmQEZGOXSY+PBBg8EIEQxCAQBFho5/OWDIUBHCoAYKFBQylJHDSI8fMExQrKgBoUYoUH70SAHSxMAPGWJqSIKSIUMmBnrgcEmwWrWFQAEwnELjRowT8TAoxbBQqFMomnrcQCrCg1UPUBA4BYAAqiYbN0qUuIpVglahErwKamHDhQsSJRVIkIAioW7aTAZA1LCxtwYIlCgFBQIAIfkEBQoAUwAsAAAAAAEAAQAABwOAU4EAIfkECQoAUwAsAAAAABMAEwAABx2AU4KDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqKgQAh+QQJCgBTACwAAAAAEwATAAAH/4BTgoIGK0IziEIrBoONgjMoCwKTkwsoM45TBEIMBZ6fnwxCBIObDQdRqQcJB62tDaOCOyMOtbVRDqmptSM7UwZNE8IKAwIKDwqTCsITTYVGGxsVAFJSARbU1hUVG0YrREUkHR3ZAhfZLFBKHUBERkAxIiIPBAQQGRD1UABQJkBGRnLoMPHhg4aDESIc3AdFhg6AOWDIUBHioAYKFBbyg5LDSI8fMExQrKgh4RAoDPk5SQHSBMEPGWJqSLmPn4EeOFwWrFatJoCf/KbQuBHjhDwMSDFAQQAUAAIomnrcMCrCg1UPUCQw/SkBqiYbN0qUuGo1q4SzXge1sOHCBYkSJBFIuECJMtMvEDVs5K0BglGjQAAh+QQJCgBTACwAAAAAEwATAAAH/4BTgoIGK0IziEIrBoONgjMoCwKTkwsoM45TBEIMBZ6fnwxCBIObDQdRqQcJB62tDaOCOyMOtbVRDqmptSM7UwZNE8IKAwIKDwqTCsITTYVGGxsVAFJSARbUUixQSBtGK0RFJB0d2QIX2VAAUB1AREZAMSIiDwQEEBkQ9upQJkBGRnLoMPHhg4aDESIc5AdFB8AcMGSoCHFQAwUKQ6DwW/ekxw8YJiZS1JBwo7p1KT6aIPghg0sNJwHIXGegB46VBatVg4JgJgAEUKbQuBHjxDwMSDFAkdBTpoSgBHrcMCrCg1WrSyVoDSqIgI0bJUpctSpCo8ZMLWy4cEGiBAkSLhBstMg0yACIGjbw1gDBqFEgACH5BAUKAFMALAAAAAATABMAAAf/gFOCggYrQjOIQisGg42CMygLApOTCygzjlMEQgwFnp+fDEIEg5sNB1GpBwkHra0No4I7Iw61tVEOqam1IztTBk0TwgoDAgoPCpM+UEcTTYVGGxsVAFJSARbVUlAAUBtGK0RFJB0d2gIX2txQHUBERkAxIiIPBAQQGRD261BARkY5dJj48EGDwQgRhkBZ1+0JQBgyVIQwqIECBYbcuvX4AcOExIkaEGYEQLJbCo4mBn7IwFIDFAQlASCAYqAHjpQErVmDIgEmSQlQptC4EePEPAxIkfKUwDSoph43jIrwQJWqiIULSQkiYONGiRJVrZawYUNroxY2XLggUYIECRc2D1pkGmQARA0bd2uAYNQoEAAh+QQFCgBTACwAAAAAAQABAAAHA4BTgQAh+QQFCgBTACwLAAUACAAMAAAHN4BTUwoThYKCLFBIh4yNjCaCGhqHUDpGQ1CMUE+CmZmHAIyhUwijpFNQEqUAABKeErCulFC0goEAIfkECQoAUwAsAAAAABMAEwAAB0iAU4KDhIWGh4iJiouMjY6PhwEVFZAsUEqQmYUyjRoag1A5RotDUIRQTo2mpo4AhK6MCLBTCIxQErIAABKsircSwL2LUMTCmYEAOw==", "Finger"],
							"(tmi)" : ["data:image/gif;base64,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", "tmi"],
							"(tired)" : ["data:image/gif;base64,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", "tired"],
							"(puke)" : ["data:image/gif;base64,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", "puke"],
							"(squirrell)" : ["data:image/gif;base64,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", "squirrell"],
							"(fubar)" : ["data:image/gif;base64,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", "fubar"],
							"(flower)" : ["data:image/gif;base64,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", "flower"],
							"+/_\\" : ["data:image/gif;base64,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","moar cowbell", "(cowbell)", "+/'\\"],
							"(facepalm)" : ["data:image/gif;base64,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", "facepalm"],
							"(horse)" : ["data:image/gif;base64,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", "horse"],
							"(flash)" : ["data:image/gif;base64,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", "flash"],
							"(batman)" : ["data:image/gif;base64,R0lGODlhJAAUAPcAAAAAAAMDAwUFAgQEBAcHBAYGBgkIBgsKBg0LBQwMBQkJCQ0MCQwMDBAOCBYWBRMTCxYWDRsbDRISEhQUEBQUFBYWFhwbEx4eEhwcFB0dFhoaGh0dHSQYGCMjGCIiGyEhHi0tHzMpFDQtHzg4DjMxFDAwFzQyHSwsJTcxITY2Kzs7Jz87JUE7F0g4FEREE0VFKklJNlBMNlBONlxAM15DN15GOlxWIVhWPVxWPltbM1tYOFhYPmFcMGRfNmtZNWhoH3JuHnhyGnRqInFtPnhsNX9/IX5yOF1SR3xfTnZyQIZrK4JiMo19M5J/OoprRoB+To96To2EI4mELoyMJIuJLIiIMZGGI5CFLJOGPZKRKZ2dO7GdH6uPI6aUKqmaI6ufL6aSM7GeJ7acLrKbNrCdP7qUML6hHqSiP6+mOb6iKLSgNbWiO7epMLykMLipPbe3L7y0Nby8NL+5OIGARYyCT4mGUJeTS5eXVa6VTqmdcbOfb7mZZaumT6ysQailV7ClTrCoS7CtT76jXLW1Rr2xRLq6RLe2VrexXLi4WKulYKqlZKWlea+vdLOkbrOsYLe1dbS0fLq6eMKcKMaaMsKvH8i8H8GtN8K6JMa/Kc+0J8KyNMOxOMC4MsqxNcixN8m3Ns2zMc6xN8ixONCgO9O0JNayJdG8Jta9KN2xIt+1INy2I9q1LtCxN9SxN+a8EfK/G+SxJOS9K+S/KcGmS8awRsWyTci9QsevaMisYcSveNfDH8XEN87KMdDDLNTMKt3MIuTMB+bMDeTLFuDJH+LMHebMGeTMG+vGEenFFu7DEe7EEejMF+7MEPfGBvbFCPTGC/DMAffMAPHMDvTMC/rHBfrIBfvLBPvKBvvMBPnMBv7MAOjDIMzMXcTEY8zMd6WlgKinhayshbGxgbaxgbe0hLiymru7lr67mr+7nLy8mbi4obi4rMu5jcy6n8LCgMHBj8zGhM3AnMzFnsXFrszArMPAtMXAtMDAvMbGucbGv8jIuMnJvtLJtdvWsNzc3AAAACH5BAEAAP8ALAAAAAAkABQAAAj/AP8JHEiQoD164L4pFCev3r6CECMSNOcNkahWsHj5MkbMV6xQngh1aycxor91ueS8KRRMm0s+arTpksLMZbRSo0zdQldSYD9HvSg5gdHGpUs6LcLMcbHM6LAYOs6kmnVOIiRLaX5EADCimFFtSACIZbHt6xMAFGp86aQH4jhSV06IBVDi1Ncec1Gs+ipDbAAPRDZFIpju0pIGcwEQAHIM2zVnK+Z+EFPNWrM1CxIreLHr0UBbWRLPlbBjCpMjBRKrUBLFBwXRAAQI0aTuX7xTJGDr3r07g5dE/+AFOsC7ePEBQfz84waIuPHnopErf1cLAfTrYitw+fMvXxwaojdovMBe4HXiEJPyCAyHBkSA2Dw4wRlywQQeKBbmYkhSBscEG5JgQkUCYj2ABS0ECQKGCAF0YIZLzGwBiktjcACAAU1Io40rZCTj0i8OAFBBEYPoU9AeXeTAgBXZfOXSM0YwMMMrLrr0CQQpVNEHPhGRU4gWdyhTozaZ3MDGkMzYUYcbjfAo0T2MxOHKNDVKowo1NUKDTCW4zNMTQewc4gkqwkAzpDbAyMKKIe54+WVE/HyjyB901knnIuXU01NAADs=", "batman"],
							"(headbang)" : ["data:image/gif;base64,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", "headbang"]
						};
            emotify.emoticons(smilies);
          },
          isFriendName : function (j) {
            var k = webfrontend.data.FriendList.getInstance().getFriends(),
            i;
            if (k === null) {
              return false;
            }
            for (i = 0; i < k.length; i++) {
              if (k[i].pn === j) {
                return true;
              }
            }
            return false;
          },
          incomingAttacksPageTooltip : function (cS, cT, cU) {
            var db = this.__yu.getRowData(cT),
            cY = db.command,
            da = cY.m,
            cX = cY.ms,
            q = "tnf:is moongate_tt ao",
            cW = webfrontend.gui.Overviews.Alliance.IncomingAttacksPage.cols,
            O = "",
            cV = O,
            h = "<br/>",
            m = "tnf:latest return time: %1 tt ao",
            V = "<b>",
            Q = "</b>";

            switch (cS) {
            case cW.icon:
              if (da === true) {
                cV = this.tr(q);
                if (cX !== 0) {
                  cV += h + this.tr(m, V + webfrontend.Util.getDateTimeString(webfrontend.data.ServerTime.getInstance().getStepTime(cX)) + Q);
                }
              }
              break;
            case cW.type:
              cV = db.type;
              break;
            case cW.defender:
              cV = db.defPlayer;
              break;
            case cW.target:
            case cW.coordinates:
              cV = AlsiusTweak.Tooltip._buildExtraCityTooltip(cY.tc, true);
              break;
            case cW.arrives:
              cV = db.time;
              break;
            case cW.attacker:
              cV = db.sourcePlayer;
              break;
            case cW.alliance:
              cV = db.sourceAlliance;
              break;
            case cW.sourceCoords:
            case cW.source:
              cV = AlsiusTweak.Tooltip._buildExtraCityTooltip(cY.c);
              break;
            case cW.spotted:
              cV = db.spotted;
              break;
            case cW.ts_attacker:
              cV = db.ts_attacker;
              break;
            case cW.ts_defender:
              cV = db.ts_defender;
              break;
            case cW.claim:
              cV = db.claim;
              break;
            }
            cV = cV + O;
            if (cS !== cW.icon && cS !== cW.source && cS !== cW.sourceCoords && cS !== cW.target && cS !== cW.coordinates) {
              cV = qx.lang.String.stripTags(cV);
            }
            if (cV === O) {
              return null;
            }
            return cV;
          },
          outgoingAttacksPageTooltip : function (ck, cl, cm) {
            var cp = this.__HN.getRowData(cl),
            cq = cp.data,
            cr = cq.m,
            co = cq.ms,
            r = "tnf:is moongate_tt ao",
            v = "tnf:scheduled to start",
            cn = webfrontend.gui.Overviews.Alliance.OutgoingAttacksPage.cols,
            O = "",
            cs = O,
            C = "<br/>",
            bh = "tnf:latest return time: %1 tt ao",
            X = "<b>",
            A = "</b>";

            switch (ck) {
            case cn.iconTime:
              if (cq.s == webfrontend.base.GameObjects.eUnitOrderState.None) {
                cs = this.tr(v);
              };
              break;
            case cn.icon:
              if (cr === true) {
                cs = this.tr(r);
                if (co !== 0) {
                  cs += C + this.tr(bh, X + webfrontend.Util.getDateTimeString(webfrontend.data.ServerTime.getInstance().getStepTime(co)) + A);
                }
              }
              break;
            case cn.type:
              cs = cp.type;
              break;
            case cn.targetPlayer:
              cs = cp.targetPlayer;
              break;
            case cn.alliance:
              cs = cp.alliance;
              break;
            case cn.targetCity:
            case cn.coordinates:
              cs = AlsiusTweak.Tooltip._buildExtraCityTooltip(cq.tc);
              break;
            case cn.arrives:
              cs = cp.arrives;
              break;
            case cn.attacker:
              cs = cp.attacker;
              break;
            case cn.source:
            case cn.sourceCoords:
              cs = AlsiusTweak.Tooltip._buildExtraCityTooltip(cq.sc, true);
              break;
            case cn.ts_attacker:
              cs = cp.ts_attacker;
              break;
            case cn.ts_defender:
              cs = cp.ts_defender;
              break;
            case cn.claim:
              cs = cp.claim;
              break;
            };
            cs = cs + O;
            if (ck !== cn.icon && ck !== cn.iconTime && ck !== cn.targetCity && ck !== cn.coordinates && ck !== cn.source && ck !== cn.sourceCoords) {
              cs = qx.lang.String.stripTags(cs);
            }
            if (cs === O) {
              return null;
            }
            return cs;
          },
          foodCityOverviewTooltip : function (bC, bD, bE) { 
            var bF = this.__HN.getRowData(bD),
              bG = this.__HO[bF.id],
              F1 = "tnf:tt switch city %1 goto food setting",
              l1 = "tnf:tt switch city %1 goto food request",
              O = "",
              cs = O,
              cn = webfrontend.gui.FoodCityOverviewWidget.cols;
              
            switch (bC) {
            case cn.settings:
              cs = this.tr(F1, bG.n);
              break;
            case cn.requests:
              cs = this.tr(l1, bG.n);
              break;
            case cn.city:
              cs = AlsiusTweak.Tooltip._buildExtraCityTooltip(bG.i, true);
              break;
            };
            cs = cs + O;
            if (bC !== cn.city) {
              cs = qx.lang.String.stripTags(cs);
            }
            if (cs === O) {
              return null;
            }
            return cs;
          }
        }
      });
      qx.Class.define("AlsiusTweak.Inception", {
        type : "singleton",
        extend : qx.core.Object,
        construct : function () {
          this.base(arguments);
        },
        members : {
          // functions
          init : function () {
            qx.core.Init.getApplication()
            .chat._outputMsg = this.outputMsgIntercept;
            webfrontend.gui.Util._convertBBCode = webfrontend.gui.Util.convertBBCode;
            webfrontend.gui.Util.convertBBCode = this.convertBBCode;
          },
          convertBBCode : function (pq, pr, ps) {
            // place for various custom BBCodes
            var ar = "",
            // fix wrong chat notify for empty string with emoticon
            ig = /^<img src="[^"]*" title="[^"]*" alt="" class="smiley" style="[^"]*"\/>$/gi;
            if (pq !== null) {
              if (!pr) {
                /* 
                Make Charts with bbcodes? YUP!
                @see https://developers.google.com/chart/image/docs/making_charts
                 */
                pq = pq.replace(/\[chart (.*?)\](.*?)\[\/chart\]/gi, function (match, contents, title, pos) {
                    var result = [], params = {}, patt = /(\w+)=["']?((?:.(?!["']?\s+(?:\w+)=|[>"']))+.)["']?/g,
                      defaults = {'data': '', 
                                  'colors': '', 
                                  'size': '400x200', 
                                  'bgcolor': 'post',
                                  'title': '',
                                  'labels': '',
                                  'type': 'pie'
                      },
                      type = {'line': 'lc', 
                              'xyline': 'lxy', 
                              'sparkline': 'ls', 
                              'meter': 'gom',
                              'scatter': 's', 
                              'venn': 'v', 
                              'pie3d': 'p3',
                              'pie': 'p',
                              'pie2d': 'p'
                      },
                      bcolors = {'post': 'EFDCB9',
                                 'igm': 'EEE7D4'
                      };
                        
                    while (result = patt.exec(contents)) {
                      params[result[1]] = result[2].trim();
                    }
                    var title = params['title'] = title.trim();
                    for (var property in defaults) {                   
                      if (!params.hasOwnProperty(property)) {
                        params[property] = defaults[property];
                      }
                    }
                    if (params['data'] == '') return '<!-- bbcode:chart: no data -->';
                    var datas = params['data'].split(","),
                      max_val = Math.max.apply(Math, datas),
                      labels = params['labels'].split(",");
                    params['size'] = (!isNaN( params['size'] )) ? params['size'] + "x" + params['size'] : params['size'];
                    var size = params['size'].split("x");
                    if ( isNaN(size[0]) || isNaN(size[1]) || Math.max(size[0], size[1]) > 1000)
                      return '<!-- bbcode:chart: invalid size -->';
                    params['bgcolor']  = (bcolors.hasOwnProperty(params['bgcolor'].toLowerCase())) ? bcolors[params['bgcolor'].toLowerCase()] : params['bgcolor'];
                    if (AlsiusTweak.Main.getInstance().useGoogleChart()) {
                      var chart_id = function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}(),
                        uiid = chart_id.replace(/-/g, '_'),
                        script = document.createElement("script")
                        data_arr = [[i18n("ext:alliance"), 'TS']];
                      for (var i = 0; i < datas.length; i++) {
                        labels[i] = (typeof labels[i] !== 'undefined') ? labels[i] : '';
                        data_arr.push([htmlEntityDecode(labels[i]), parseInt(datas[i], 10)]);
                      };
                      script.setAttribute("type", "application/javascript");
                      script.textContent = 
                        ' setTimeout(function(){' +
                        '   var data_' + uiid + ' = google.visualization.arrayToDataTable(' + JSON.stringify(data_arr) + ');' +
                        '   var options_' + uiid + ' = {' +
                        '     title: \'' + params['title'] + '\',' +
                        '     backgroundColor: \'#' + params['bgcolor'] + '\',' +
                        '     legend: {textStyle:  {color: \'#412913\', fontSize: 11}, alignment: \'center\'},' +
                        '     titleTextStyle:  {color: \'#412913\', fontSize: 11},' +
                        '     chartArea: {left:10, top: \'auto\', width: \'90%\', height: \'85%\'},' +
                        '     color: \'#384E17\',' +
                        '     pieSliceBorderColor : \'#A4773A\',' +
                        '     pieSliceTextStyle : {color : \'white\', fontSize : 11},' +
                        '     tooltip: {textStyle: {color : \'#412913\', fontSize : 11}}' +
                        '   };' +
                        '   var div_' + uiid + ' = document.getElementById(\'' + chart_id + '\'),' +
                        '     chart_' + uiid + ' = new google.visualization.PieChart(div_' + uiid + ');' +
                        '   chart_' + uiid + '.draw(data_' + uiid + ', options_' + uiid + ');' +
                        ' }, 100);';
                      
                      document.body.appendChild(script); // run the script
                      document.body.removeChild(script); // clean up
                      return '<div id="' + chart_id + '" class="chart-bbocde-div" style="height:' + size[1] + 'px; width:' + size[0] + 'px; cursor:  default;" ></div>';
                    } else {
                      params['data'] = "t:" + params['data'];
                      params['type']     = (type.hasOwnProperty(params['type'])) ? type[params['type']] : params['type'];
                      params['title']    = encodeURI(params['title'].replace(/ /g, '+').replace(/--/g, '|'));
                      params['labels']   = encodeURI(params['labels'].replace(/ /g, '+').replace(/,/g, '|'));
                      params['bgcolor']  = "bg,s," + params['bgcolor'];

                      var query = {'chd' : params['data'],
                                   'chco': params['colors'],
                                   'chs' : params['size'],
                                   'chf' : params['bgcolor'],
                                   'chtt': params['title'],
                                   'chl' : params['labels'],
                                   'cht' : params['type'],
                                   'chts': '412913,11',
                                   'chxt': 'x',
                                   'chxs': '0,412913,11',
                                   'chco': '384E17',
                                   'chds': '0,' + max_val
                      };

                      var url = serializeQuery(query).replace(/%7C/g, '|') + ( (params.hasOwnProperty('advanced')) ? '&' + params['advanced'] : '' );
                      return '<img title="' + title + '" src="http://' + (Math.floor(Math.random() * 9) + 1) + '.chart.apis.google.com/chart?' + url +'" alt="' + title + '" height="' + size[1] + '" width="' + size[0] + '" class="chart-bbocde-image" style="cursor: default;"/>';
                    }
                  }
                ); 
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
                /* chat only */
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
          outputMsgIntercept : function (eY, fa, fb) {
            var t1 = /!alsius\.[a-zA-Z0-9\-]*\.[a-zA-Z]*[\.]?.*/,
            t2 = /!LoU\.[a-zA-Z]*/i,
            t3 = new RegExp('\\[<span dir="ltr"><span id="CHAT_SENDER_'+EXTbotname+'" style="cursor:pointer;">'+EXTbotname+'<\\/span><\\/span>\\]<\\/span>: <span dir="ltr">\\[<font color="#[a-z0-9]*"><span style="text-decoration:underline;cursor:pointer;" onClick="webfrontend.gui.Util.openAllianceProfile\\(this\\);">'+EXTallied+'<\\/span><\\/font>\]\[<font color="#[a-z0-9]*"><span style="text-decoration:underline;cursor:pointer;" onClick="webfrontend.gui.Util.openPlayerProfile\\(this\\);">(.*?)<\\/span><\\/font>\\]', 'im'),
            p = '__proto__';
            if (t1.test(eY) || t2.test(eY)) {
              // hide alsius commands from chat
              return;
            }
            else if (EXTallied !== null && fa === EXTbotname && t3.test(eY)) {
              ma = eY.match(t3);
              eY = eY.replace(t3, '[<span dir="ltr"><span id="CHAT_SENDER_'+ma[1]+'" style="cursor:pointer;"><img id="CHAT_SENDER_'+ma[1]+'" src="http://eaassets-a.akamaihd.net/lougame/cdn/409444/resource/webfrontend/favicon.ico" style="vertical-align:middle"/>'+ma[1]+'</span></span>]</span>: ');
              fa = ma[1];
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
      bo1 = "tnf:regionmap city attack tp",
      bj = "tnf:regionmap city support tp",
      bp = "tnf:regionmap city trade tp",
      tp1 = "tnf:regionmap city return tp",
      tp2 = "tnf:regionmap dungeon return tp",
      tp3 = "tnf:regionmap boss return tp",
      //tnf:regionmap city alliance attacked tp
      //prepared tipps
      f = "tnf:regionmap city siege tp",
      bo2 = "tnf:regionmap city support tp",
      t = "tnf:regionmap city support other tp",
      pl = "tnf:regionmap city alliance sieged tp",
      bk = "tnf:regionmap city sieged tp",
      P = "tnf:regionmap city attacked tp",
      V = "tnf:regionmap city support own tp",
      V1 = "tnf:regionmap city trade other tp",
      v = "tnf:regionmap city return tp",
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
      Mn = ".",
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
      gr = "g",
      li = "(",
      lo = ")",
      la = " ";
      qx.Class.define("AlsiusTweak.Provider", {
        type : 'singleton',
        extend : qx.core.Object,
        construct : function (enabled) {
          this.base(arguments);
          this.requestCounter = 0;
          this.waitForResponse = [];
          this.timeoutCounter = 0;
          this.lastPoll = 0;
          this.Data = {};
          this.Key = '';
          this.Requests = [];
        },
        members : {
          requestCounter : null,
          waitForResponse : null,
          timeoutCounter : null,
          Data : null,
          lastPoll : null,
          Key : null,
          // functions
          pollData : function (o) {
            this.Key = AlsiusTweak.Command.getInstance()
              .getKey();
            if (this.Key === null || this.waitForResponse[this.requestCounter] === true) {
              return;
            }
            this.requestCounter++;
            if (this.timeoutCounter >= 3 && this.requestCounter >= 15) {
              this.timeoutCounter = 0;
            }
            var url = EXTdata.provider + EXTdata.endpoint,
            req = new qx.io.remote.Request(url, "POST", "application/json");
            req.setProhibitCaching(false);
            req.setRequestHeader("Content-Type", "application/json");
            req.setCrossDomain(true);
            req.setTimeout(6000);
            req.setParameter("key", this.Key);
            if (o !== null) {
              var payload = JSON.stringify(o);
              req.setData(payload);
            }
            //console.log('poll['+this.requestCounter+']: initial');
            req.addListener("completed", function (e) {
              this.waitForResponse[this.requestCounter] = false;
              this.timeoutCounter = 0;
              var data = e.getContent() || null;
              //console.log('poll['+this.requestCounter+']: received');
              this.lastPoll = new Date()
                .getTime();
              if (data !== null && data.reqid && data.version === EXTdata.version && typeof data.continent !== 'undefined') {
                this.Data[data.continent.id] = data.continent;
                //console.log('poll['+this.requestCounter+']: stored k' + data.continent.id);
                //console.log(data.continent);
              }
            }, this);
            req.addListener("failed", function (e) {
              this.waitForResponse[this.requestCounter] = false;
              this.requestCounter = 0;
              this.timeoutCounter++;
              //console.log('poll['+this.requestCounter+']: failed');
            }, this);
            req.addListener("timeout", function (e) {
              this.waitForResponse[this.requestCounter] = false;
              this.requestCounter = 0;
              this.timeoutCounter++;
              //console.log('poll['+this.requestCounter+']: timeout');
            }, this);
            this.waitForResponse[this.requestCounter] = true;
            req.send();
            return true;
          },
          getData : function () {
            return this.Data;
          },
          getContiData : function (c) {
            return (typeof this.Data[c] !== 'undefined') ? this.Data[c] : null;
          }
        }
      });
      var units = {
        "1" : {
          "en" : "Cityguard",
          "de" : "Stadtwächter"
        },
        "2" : {
          "en" : "Ballista",
          "de" : "Balliste"
        },
        "3" : {
          "en" : "Ranger",
          "de" : "Jäger"
        },
        "4" : {
          "en" : "Guardian",
          "de" : "Pikenier"
        },
        "5" : {
          "en" : "Templar",
          "de" : "Templer"
        },
        "6" : {
          "en" : "Berserker",
          "de" : "Berserker"
        },
        "7" : {
          "en" : "Mage",
          "de" : "Magier"
        },
        "8" : {
          "en" : "Scout",
          "de" : "Kundschafter"
        },
        "9" : {
          "en" : "Crossbowman",
          "de" : "Armbrustschütze"
        },
        "10" : {
          "en" : "Paladin",
          "de" : "Paladin"
        },
        "11" : {
          "en" : "Knight",
          "de" : "Ritter"
        },
        "12" : {
          "en" : "Warlock",
          "de" : "Hexenmeister"
        },
        "13" : {
          "en" : "Ram",
          "de" : "Rammbock"
        },
        "14" : {
          "en" : "Catapult",
          "de" : "Katapult"
        },
        "15" : {
          "en" : "Fregate",
          "de" : "Fregatte"
        },
        "16" : {
          "en" : "Slope",
          "de" : "Schaluppe"
        },
        "17" : {
          "en" : "War Galleon",
          "de" : "Kriegsgaleone"
        },
        "19" : {
          "en" : "Baron",
          "de" : "Baron"
        },
        "77" : {
          "en" : "Dragon",
          "de" : "Drache"
        }
      },
      uts = {
        "1" : 1,
        "2" : 10,
        "3" : 1,
        "4" : 1,
        "5" : 1,
        "6" : 1,
        "7" : 1,
        "8" : 2,
        "9" : 2,
        "10" : 2,
        "11" : 2,
        "12" : 2,
        "13" : 10,
        "14" : 10,
        "15" : 100,
        "16" : 100,
        "17" : 400,
        "19" : 1,
        "77" : 10000,
      },
      tytowe = {
        "1" : 0, //undeath
        "2" : 3, //ship wreck
        "3" : 4, //hill
        "4" : 1, //mountain
        "5" : 2, //forest
        "6" : 2, //boss forest/dragon
        "7" : 4, //boss hill/moloch
        "8" : 1, //boss mountain/hydra
        "12" : 3 //boss sea/octopus
      },
      bkill = {
        "6" : { //  34, 200, 1360, 2640,  6640, 10000, 13600, 20000, 30000, 40000
          "t" : [null, 50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000],
          "1" : 0.67,
          "2" : 1,
          "4" : 1,
          "m" : 1
        },
        "7" : { //  24, 143,  972, 1886, 4743,  7143,  9715, 14286, 21429, 28572
          "t" : [null, 36, 215, 1429, 2858, 7143, 10715, 14286, 21429, 32143, 42858],
          "1" : 1,
          "2" : 1,
          "4" : 0.67,
          "m" : 1
        },
        "11" : { //  19, 112,  756, 1467, 3689, 5556,  7556, 11112, 16667, 22223
          "t" : [null, 28, 167, 1112, 2223, 5556, 8334, 11112, 16667, 25000, 33334],
          "1" : 1,
          "2" : 0.67,
          "4" : 1,
          "m" : 2
        },
        "15" : {
          "t" : [null, 1, 4, 23, 44, 111, 167, 227, 334, 500, 667],
          "3" : 1,
          "m" : 100
        },
        "16" : {
          "t" : [null, 2, 9, 57, 110, 277, 417, 567, 834, 1250, 1667],
          "3" : 1,
          "m" : 100
        },
        "17" : {
          "t" : [null, 1, 1, 6, 11, 28, 42, 57, 84, 125, 167],
          "3" : 1,
          "m" : 400
        }
      },
      //25, 125, 450, 1100, 4500, 10000, 20000, 30000, 45000, 65000
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
        type : 'singleton',
        extend : qx.core.Object,
        construct : function (enabled) {
          this.base(arguments);
        },
        members : {
          // functions
          init : function () {
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
          getBossTooltip : function (bT, bU, bV, bW, bX, bY) {
            return AlsiusTweak.Tooltip._getBossTooltip(bT, bU, bV, bW, bX, bY);
          },
          getDungeonTooltip : function (cf, cg, ch, ci, cj, ck, cl, cm) {
            return AlsiusTweak.Tooltip._getDungeonTooltip(cf, cg, ch, ci, cj, ck, cl, cm);
          },
          getLawlessCityTooltip : function (ca, cb, cs, ct, cu, cv, cw) {
            var cc = webfrontend.data.Server.getInstance()
              .getContinentFromCoords(cu & 0xFFFF, cu >> 16),
            tp = AlsiusTweak.Provider.getInstance(),
            cd = tp.getContiData(cc);
            if (cd === null && AlsiusTweak.Main.getInstance().isBotOnline()) {
              tp.pollData([{
                    "Service" : "getData",
                    "Args" : {
                      "continent" : cc
                    }
                  }
                ]);
            }
            return AlsiusTweak.Tooltip._getLawlessCityTooltip(ca, cb, cs, ct, cu, cv, cw, cd);
          },
          getFreeTooltip : function (cI, cJ, cK) {
            var cC = webfrontend.data.Server.getInstance()
              .getContinentFromCoords(cI & 0xFFFF, cI >> 16),
            tp = AlsiusTweak.Provider.getInstance(),
            cD = tp.getContiData(cC);
            if (cD === null && AlsiusTweak.Main.getInstance().isBotOnline()) {
              tp.pollData([{
                    "Service" : "getData",
                    "Args" : {
                      "continent" : cC
                    }
                  }
                ]);
            }
            return AlsiusTweak.Tooltip._getFreeTooltip(cI, cJ, cK, cD);
          },
          getCityTooltip : function (bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ) {
            var bc = webfrontend.data.Server.getInstance()
              .getContinentFromCoords(bD & 0xFFFF, bD >> 16),
            tp = AlsiusTweak.Provider.getInstance(),
            bD2 = tp.getContiData(bc);
            if (bD2 === null && AlsiusTweak.Main.getInstance().isBotOnline()) {
              tp.pollData([{
                    "Service" : "getData",
                    "Args" : {
                      "continent" : bc
                    }
                  }
                ]);
            }
            return AlsiusTweak.Tooltip._getCityTooltip(bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ, bD2);
          }
        },
        statics : {
          _getBossTooltip : function (bT, bU, bV, bW, bX, bY) {
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
          _getDungeonTooltip : function (cf, cg, ch, ci, cj, ck, cl, cm) {
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
          _getCityTooltip : function (bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ, bD2) {
            var bS = new qx.util.StringBuilder(),
            bM = qx.core.Init.getApplication(),
            tip = webfrontend.gui.WorldMapHelper._getCityTooltip(bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ);
            bS.add(bl3);
            // remove ore prepare tipps
            var _pl = bM.tr(pl).split(Mn);
            var _V = bM.tr(V).split(Mn);
            var _V1 = bM.tr(V1).split(Mn);
            var _t = bM.tr(t).split(Mn);
            var _v = bM.tr(v).split(Mn);
            var _f = bM.tr(f).split(Mn);
            bS.add(tip.replace(new RegExp(bM.tr(o2), "m"), h)
              .replace(new RegExp(bM.tr(P2), "m"), h)
              .replace(new RegExp(bM.tr(bd2), "m"), h)
              .replace(new RegExp(bM.tr(b2), "m"), h)
              .replace(new RegExp(bM.tr(tp1), "m"), h)
              .replace(new RegExp(Mn + _pl[1], "m"), h)
              .replace(new RegExp(Mn + _V[1], "m"), h)
              .replace(new RegExp(Mn + _V1[1], "m"), h)
              .replace(new RegExp(Mn + _t[1], "m"), h)
              .replace(new RegExp(Mn + _v[1], "m"), h)
              .replace(new RegExp(Mn + _f[1], "m"), h)
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
          _getFreeTooltip : function (cI, cJ, cK, cD) {
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
                  cD.info[pos] = {
                    'txt' : i18n("ext:settlement_area")
                  };
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
          _getLawlessCityTooltip : function (ca, cb, cs, ct, cu, cv, cw, cd) {
            var cy = new qx.util.StringBuilder(),
            bM = qx.core.Init.getApplication(),
            tip = webfrontend.gui.WorldMapHelper._getLawlessCityTooltip(ca, cb, cs, ct, cu, cv, cw);
            cy.add(bl3);
            // remove ore prepare tipps
            var _pl = bM.tr(pl).split(Mn);
            var _V = bM.tr(V).split(Mn);
            var _V1 = bM.tr(V1).split(Mn);
            var _t = bM.tr(t).split(Mn);
            var _v = bM.tr(v).split(Mn);
            var _f = bM.tr(f).split(Mn);
            cy.add(tip.replace(new RegExp(Mn + _pl[1], "m"), h)
              .replace(new RegExp(Mn + _V[1], "m"), h)
              .replace(new RegExp(Mn + _V1[1], "m"), h)
              .replace(new RegExp(Mn + _t[1], "m"), h)
              .replace(new RegExp(Mn + _v[1], "m"), h)
              .replace(new RegExp(Mn + _f[1], "m"), h)
              .replace(new RegExp(n + n, gr), h)
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
          _buildExtraCityTooltip : function (id, own) {
            var bS = new qx.util.StringBuilder(),
              tp = AlsiusTweak.Provider.getInstance(),
              ts = webfrontend.data.Server.getInstance(),
              tu = webfrontend.gui.Util,
              bD = tu.formatCoordinates(id & 0xFFFF, id >> 16);
              bc = ts.getContinentFromCoords(id & 0xFFFF, id >> 16);
              bD2 = tp.getContiData(bc);
              bS.add(bl3);
              bS.add(l, k),
              pre = bS.get();
            if (bD2 !== null) {
              AlsiusTweak.Tooltip._buildProcessHeadline(bS);
              if (own) {
                AlsiusTweak.Tooltip._buildPriorTip(bS, bD2, bD);
                AlsiusTweak.Tooltip._buildInfoTip(bS, bD2, bD);
                AlsiusTweak.Tooltip._buildUnitsTip(bS, bD2, bD);
                AlsiusTweak.Tooltip._buildProcessDataTip(bS, bD2);
              } else {
                AlsiusTweak.Tooltip._buildCoordsTip(bS, bc, bD);
                AlsiusTweak.Tooltip._buildInfoTip(bS, bD2, bD);
              }
              if (pre === bS.get()) {
                AlsiusTweak.Tooltip._buildEmptyDataTip(bS);
              }
            } else {
              if (AlsiusTweak.Main.getInstance().isBotOnline()) {
                tp.pollData([{
                      "Service" : "getData",
                      "Args" : {
                        "continent" : bc
                      }
                    }
                  ]);
              }
              AlsiusTweak.Tooltip._buildNoDataOrAccess(bS);
            }
            bS.add(l, j);
            return bS.get();
          },
          _buildNoDataOrAccess : function (br) {
            br.add(bl3 + 'Wolfpack Tools:' + m + nb + nb + nb + nb + nb + nb + nb + nb + nb + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_data_or_credentials')) + l);
          },
          _buildProcessHeadline : function (br) {
            br.add(bl2 + 'Wolfpack Tools: v' + EXTversion + l2 + kl + hl + l);
          },
          _buildProcessDataTip : function (br, bs) {
            if (typeof bs === 'undefined' || (isNaN(parseFloat(bs.id)) && isFinite(bs.id))) {
              br.add(kl + webfrontend.gui.Util.convertBBCode(i18n('ext:process_data')) + l);
            }
          },
          _buildEmptyDataTip : function (br) {
            br.add(k + i18n('ext:info') + p);
            if (!AlsiusTweak.Main.getInstance().isBotOnline()) {
              br.add(m + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_info')) + l);
            } else {
              br.add(kl + webfrontend.gui.Util.convertBBCode(i18n('ext:process_data')) + l);
            }
          },
          _buildSettlerTip : function (br, bs, bk, bf) {
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
          _buildPriorTip : function (br, bs, bk) {
            if (typeof bs !== 'undefined' && bs.prior !== null && bs.prior[bk] && bs.prior[bk].name) {
              br.add(k + i18n('ext:prior') + p);
              br.add(m + nb + bs.prior[bk].name);
              if (bs.prior[bk].alliance_name) {
                br.add(sq + bs.prior[bk].alliance_name + qs);
              }
              br.add(l);
            }
          },
          _buildInfoTip : function (br, bs, bk) {
            if (typeof bs !== 'undefined' && bs.info !== null) {
              if (bs.info[bk] && bs.info[bk].txt !== null) {
                br.add(k3 + i18n('ext:info') + p);
                br.add(m + nb + webfrontend.gui.Util.convertBBCode(bs.info[bk].txt.replace(new RegExp(nl, gr), n + nb)) + l);
              } else {
                br.add(k + i18n('ext:info') + p);
                br.add(m + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_info')) + l);
              }
            }
          },
          _buildCoordsTip : function (br, bc, bk) {
            var bM = qx.core.Init.getApplication();
            br.add(k3 + bM.tr("tnf:coordinates:"));
            br.add(m + nb + i18n('ext:continent_abbr') + bc + la + li + bk + lo + l);
          },
          _buildUnitsTip : function (br, bs, bk) {
            if (typeof bs !== 'undefined' && bs.units !== null) {
              if (bs.units[bk]) {
                var locale = qx.locale.Manager.getInstance()
                  .getLocale().split('_')[0];
                bs.units[bk].forEach(function (u) {
                  br.add(k + units[u.type][locale] + p);
                  br.add(m + nb + webfrontend.gui.Util.formatNumbers(u.ts * uts[u.type]) + nb + ts + l);
                });
              }
            }
          },
          //pads right
          _rpad : function (string, padString, length) {
            while (string.length < length) {
              string = string + padString;
            }
            return string;
          },
          _roundup : function (number) {
            var one = "1",
            fqp = Math.round(String(number)
                .length / 2),
            tep = parseInt(this._rpad(one, "0", fqp), 10);
            return Math.round(number / tep) * tep;
          }
        }
      });
      qx.Class.define("AlsiusTweak.Chat", {
        type : "singleton",
        extend : qx.core.Object,
        construct : function (enabled) {
          this.base(arguments);
        },
        members : {
          // functions
          init : function () {
            this.chat = webfrontend.data.Chat.getInstance();
            this.chat.addListener('newMessage', this.onNewMessage, this);
          },
          onNewMessage : function (e) {
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
                      var retval = (uuid !== 'lou') ? uuid : command;
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
                } else if (dataParts !== null && dataParts.length === 4) {
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
          addChatMessage : function (message, prefix, color) {
            var _color = color || 'Info',
            _prefix = (prefix) ? 'Wolfpack Tools: (' + AlsiusTweakVersion + ') ' : '',
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
        type : "singleton",
        extend : qx.core.Object,
        construct : function () {
          this.base(arguments);
          this.stack = {};
        },
        members : {
          stack : null,
          // functions
          store : function (command) {
            var uuid = this.serial();
            this.stack[uuid] = command;
            return uuid;
          },
          execute : function (uuid, e) {
            if (this.stack.hasOwnProperty(uuid)) {
              this.stack[uuid].invoke(e, uuid);
              delete this.stack[uuid];
            }
          },
          cancel : function (uuid) {
            if (this.stack.hasOwnProperty(uuid)) {
              delete this.stack[uuid];
            }
          },
          serial : function () {
            var sn = function () {
              return Math.floor(
                Math.random() * 0x10000 /* 65536 */
              ).toString(16);
            };
            return (sn() + sn() + "-" +
              sn() + "-" +
              sn() + "-" +
              sn() + "-" +
              sn() + sn() + sn()).toString();
          }
        }
      });
      qx.Class.define("AlsiusTweak.Command", {
        type : "singleton",
        extend : qx.core.Object,
        construct : function (enabled) {
          this.base(arguments);
        },
        members : {
          commandKey : null,
          enabled : true,
          stack : null,
          // bot & internal functions
          setEnable : function (enabled) {
            if (this.enabled === enabled) {
              return;
            }
            this.enabled = Boolean(Number(enabled));
            var main = AlsiusTweak.Main.getInstance();
            if (!this.enabled) {
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
          setKey : function (key) {
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
            } else {
              this.commandKey = null;
              main.botState = 0;
              main.unRegisterTick();
              main.setPanelState(false);
              retval = false;
            }
            return retval;
          },
          Login : function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
            .execute(key, result);
          },
          getKey : function () {
            return this.commandKey;
          },
          Note : function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
            .execute(key, result);
          },
          Claim : function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
            .execute(key, result);
          },
          Unclaim : function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
            .execute(key, result);
          },
          Settle : function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
            .execute(key, result);
          },
          Unsettle : function (data, key) {
            //json?
            var result = JSON.parse(data);
            AlsiusTweak.Stack.getInstance()
            .execute(key, result);
          },
          // public functions
          error : function (data, sender) {
            AlsiusTweak.Chat.getInstance()
            .addChatMessage(i18n('ext:error_on_command') + ': ' + data.charAt(0)
              .toUpperCase() + data.slice(1) + '@' + sender, true);
            return false;
          },
          ok : function (data, sender) {
            AlsiusTweak.Chat.getInstance()
            .addChatMessage(i18n('ext:ok_message') + ': ' + data.charAt(0)
              .toUpperCase() + data.slice(1) + '@' + sender, true);
            return false;
          },
          like : function (data, sender) {
            AlsiusTweak.Chat.getInstance()
            .addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:like_message'), false, 'social');
            return (webfrontend.data.FriendList.getInstance().isFriendName(sender) || (webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
          },
          poke : function (data, sender) {
            AlsiusTweak.Chat.getInstance()
            .addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:poke_message'), false, 'social');
            return (webfrontend.data.FriendList.getInstance().isFriendName(sender) || (webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
          },
          vote : function (data, sender) {
            AlsiusTweak.Chat.getInstance()
            .addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:vote_message'), false, 'social');
            return (webfrontend.data.FriendList.getInstance().isFriendName(sender) || (webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
          },
          love : function (data, sender) {
            AlsiusTweak.Chat.getInstance()
            .addChatMessage(i18n('ext:love_message'), false, 'social');
            return (webfrontend.data.FriendList.getInstance().isFriendName(sender) || (webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
          },
          slap : function (data, sender) {
            AlsiusTweak.Chat.getInstance()
            .addChatMessage(i18n('ext:slap_message'), false, 'social');
            return (webfrontend.data.FriendList.getInstance().isFriendName(sender) || (webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
          }
        }
      });
      qx.Class.define("AlsiusTweak.ui.LeftPanel", {
        extend : qx.ui.container.Composite,
        construct : function (label) {
          this.base(arguments);
          this.stateIcon = new qx.ui.basic.Image('webfrontend/ui/icons/icon_alliance_grey_17.png')
            .set({
              toolTipText : i18n('ext:offline'),
              width : 17,
              height : 17,
              scale : true
            });
          this.state = false;
          this.buildPanelUI(label);
        },
        members : {
          content : null,
          state : null,
          stateIcon : null,
          // functions
          buildPanelUI : function (labelText) {
            this.setLayout(new qx.ui.layout.Canvas());
            this.set({
              marginTop : 3,
              marginBottom : 3
            });
            var bg = new qx.ui.basic.Image('webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_scaler.png')
              .set({
                width : 338,
                scale : true,
                allowGrowY : true,
                height : 75
              });
            this.add(bg, {
              left : 0,
              top : 26
            });
            bg = new qx.ui.basic.Image('webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png');
            this.add(bg, {
              left : 0,
              top : 78
            });
            bg = new qx.ui.basic.Image("webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_wide.png");
            this.add(bg, {
              left : 0,
              top : 5
            });
            this.add(this.stateIcon, {
              left : 310,
              top : 12
            });
            var label = new qx.ui.basic.Label(labelText);
            label.setFont('font_headline_serif_small');
            label.setWidth(290);
            label.setAppearance('sidewindow-subheadline');
            label.setTextAlign('left');
            this.add(label, {
              left : 12,
              top : 9
            });
            this.content = new qx.ui.container.Composite();
            this.content.setLayout(new qx.ui.layout.VBox(5));
            this.content.set({
              width : 322,
              marginBottom : 8
            });
            this.add(this.content, {
              top : 38,
              left : 8
            });
          },
          getContent : function () {
            return this.content;
          },
          addContent : function (widget, args) {
            this.content.add(widget, args);
          },
          setState : function (state) {
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
        extend : qx.ui.window.Window,
        events : {
          dataChanged : "qx.event.type.Event"
        },
        statics : {
          getRenderedText : function (sourceText) {
            return webfrontend.gui.Util.convertBBCode(webfrontend.gui.Util.generateBBCode(sourceText));
          },
          create : function (sourceText, isSaved) {
            var note = new AlsiusTweak.ui.Notepad(sourceText, Boolean(isSaved));
            note.center();
            note.open();
            return note;
          }
        },
        construct : function (sourceText, saved) {
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
        members : {
          state : null,
          sourceText : null,
          updateText : null,
          displayContainer : null,
          displayRendered : null,
          displayEdit : null,
          renderedText : null,
          rememberCheck : null,
          toggleEditButton : null,
          buildUI : function () {
            var app = qx.core.Init.getApplication();
            this.set({
              width : 300,
              minWidth : 100,
              maxWidth : 1000,
              height : 300,
              minHeight : 100,
              maxHeight : 800,
              allowMaximize : false,
              allowMinimize : false,
              showMaximize : false,
              showMinimize : false,
              showStatusbar : false,
              showClose : false,
              resizeSensitivity : 7,
              contentPadding : 5,
              useMoveFrame : true
            });
            this.setLayout(new qx.ui.layout.VBox(2));
            this.moveTo(406, 64);
            webfrontend.gui.Util.formatWinClose(this);

            // create elements
            this.displayContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
            this.displayRendered = new qx.ui.container.Scroll();
            var renderedTextContainer = new qx.ui.container.Composite(new qx.ui.layout.Grow());
            this.renderedText = new qx.ui.basic.Label("").set({
                rich : true,
                selectable : true
              });
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
            this.add(this.displayContainer, {
              flex : 1
            });
            this.add(buttonRow);
            buttonRow.add(this.rememberCheck);
            buttonRow.add(buttonSpacer, {
              flex : 1
            });
            buttonRow.add(this.toggleEditButton);
          },
          getSaved : function () {
            return this.rememberCheck.getValue();
          },
          setSaved : function (value) {
            this.rememberCheck.setValue(value);
          },
          getSourceText : function () {
            return this.displayEdit.getValue();
          },
          setState : function (state) {
            if (this.state === state) {
              return;
            }
            this.displayContainer.removeAll();
            this.state = state;
            switch (this.state) {
            case 'displayRendered':
              this.displayContainer.add(this.displayRendered, {
                flex : 1
              });
              this.toggleEditButton.setLabel(i18n("ext:edit"));
              this.rememberCheck.setVisibility("excluded");
              break;
            case 'displayEdit':
              this.displayContainer.add(this.displayEdit, {
                flex : 1
              });
              this.toggleEditButton.setLabel(i18n("ext:done"));
              this.rememberCheck.setVisibility("visible");
              break;
            }
          },
          setSourceText : function (sourceText) {
            if (!sourceText) {
              this.sourceText = "";
              this.updateText = "";
            } else {
              this.sourceText = sourceText;
              this.displayEdit.setValue(this.sourceText);
              this.updateRenderedText();
            }
          },
          updateRenderedText : function () {
            this.updateText = this.displayEdit.getValue();
            this.renderedText.setValue(AlsiusTweak.ui.Notepad.getRenderedText(this.updateText));
          },
          toggleEdit : function () {
            if (this.state === 'displayRendered') {
              this.setState('displayEdit');
            } else {
              this.setState('displayRendered');
              this.updateData(true);
            }
          },
          updateData : function (saveText) {
            if (this.getSaved() && this.updateText !== this.getSourceText() && saveText) {
              this.updateRenderedText();
              //console.log('note: update');
              this.fireNonBubblingEvent("dataChanged");
            } else {
              if (this.updateText !== this.getSourceText()) {
                this.setSourceText(this.updateText);
              }
              //console.log('note: no update');
            }
          }
        }
      });
      qx.Class.define("AlsiusTweak.ui.ExtraTools", {
        extend : AlsiusTweak.ui.LeftPanel,
        construct : function (title) {
          this.base(arguments, title);
          this.buildUI();
          qx.util.TimerManager.getInstance()
          .start(function () {
            this.checkButtons();
          }, null, this, null, 1000 * 5);
        },
        statics : {
          getOrderList : function (filterFunc) {
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
          cancelAll : function (callback, self) {
            var orderList = this.getOrderList(function (order) {
                return AlsiusTweak.ui.ExtraTools.canOrderBeCancelled(order) || (order.type === 8 && order.recurringType !== 0);
              });
            AlsiusTweak.ui.ExtraTools.cancelOrders(orderList, callback, self);
          },
          cancelAllRaids : function (callback, self) {
            var orderList = this.getOrderList(function (order) {
                return order.type === 8 && (order.recurringType !== 0 || AlsiusTweak.ui.ExtraTools.canOrderBeCancelled(order));
              });
            AlsiusTweak.ui.ExtraTools.cancelOrders(orderList, callback, self);
          },
          loadBosIntel : function (callback, self) {
            if (typeof window.bos === 'undefined') {
              return false;
            }
          },
          canOrderBeCancelled : function (order) {
            var serverTime = webfrontend.data.ServerTime.getInstance();
            return (order.state !== 2) && (order.start > serverTime.getServerStep() - 600);
          },
          getOrder : function (city, orderId) {
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
          cancelUnitOrder : function (orderId, callback, self) {
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
              cityid : activeCity.getId(),
              id : orderId,
              isDelayed : order.state === 0
            };
            var commandManager = webfrontend.net.CommandManager.getInstance();
            commandManager.sendCommand(command, request, this, function (unknown, ok) {
              callback.call(self, ok ? null : new Error("Error executing " + command + " command"));
            });
          },
          cancelRaidOrder : function (orderId, callback, self) {
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
              cityid : activeCity.getId(),
              id : orderId,
              isDelayed : order.state === 0,
              recurringType : 0
            };
            var commandManager = webfrontend.net.CommandManager.getInstance();
            commandManager.sendCommand(command, request, this, function (unknown, ok) {
              callback.call(self, ok ? null : new Error("Error executing " + command + " command"));
            });
          },
          cancelOrder : function (orderId, callback, self) {
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
          cancelOrders : function (orderIdList, callback, self) {
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
        members : {
          fillQueueButton : null,
          payQueueButton : null,
          infoButton : null,
          cancelAllButton : null,
          cancelRaidsButton : null,
          scheduleButton : null,
          loadIntelButton : null,
          installBosButton : null,
          // functions
          buildUI : function () {
            // first row
            // Queue buttons (Thank you MousePak!)
            var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)),
            bmImage = new qx.ui.basic.Image('webfrontend/ui/icons/ministers/icon_build_minister_btn.png')
              .set({
                paddingTop : 3,
                height : 17,
                width : 27,
                scale : true
              });
            bmImage.setToolTipText(i18n('ext:if_bm_available'));
            row.add(bmImage);
            // fillQueueButton
            this.fillQueueButton = new qx.ui.form.Button(i18n('ext:fill_build_queue'))
              .set({
                width : 96,
                appearance : "button-text-small",
                toolTipText : i18n('ext:fill_build_queue')
              });
            this.fillQueueButton.addListener("execute", this.fillBuildingQueue, this);
            row.add(this.fillQueueButton, {
              top : 0,
              left : 32
            });
            this.fillQueueButton.setEnabled(false);
            // payQueueButton
            this.payQueueButton = new qx.ui.form.Button(i18n('ext:convert_all_builds'))
              .set({
                width : 104,
                appearance : "button-text-small",
                toolTipText : i18n('ext:convert_all_builds')
              });
            this.payQueueButton.addListener("execute", this.payBuildingQueue, this);
            row.add(this.payQueueButton);
            this.payQueueButton.setEnabled(false);
            // Spacer
            row.add(new qx.ui.core.Widget()
              .set({
                height : 0
              }), {
              flex : 1
            });
            // infoButton
            var infoButton = new qx.ui.form.Button("?")
              .set({
                width : 25,
                appearance : "button-text-small",
                toolTipText : i18n('ext:licence_info')
              });
            infoButton.addListener("execute", this.showHelp, this);
            row.add(infoButton);
            this.addContent(row, {
              top : 3,
              left : 0
            });
            // second row
            // Cancel order buttons (Thank you ventrix!)
            row = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
            var wmImage = new qx.ui.basic.Image('webfrontend/ui/icons/ministers/icon_war_minister_btn.png')
              .set({
                paddingTop : 3,
                paddingRight : 6,
                height : 17,
                width : 27,
                scale : true
              });
            wmImage.setToolTipText(i18n('ext:if_wm_available'));
            row.add(wmImage);
            // cancelAllButton
            this.cancelAllButton = new qx.ui.form.Button(i18n('ext:cancel_all_orders'))
              .set({
                width : 96,
                appearance : "button-text-small",
                toolTipText : i18n('ext:cancel_all_orders')
              });
            this.cancelAllButton.addListener("execute", this.cancelAllOrders, this);
            row.add(this.cancelAllButton, {
              top : 0,
              left : 32
            });
            this.cancelAllButton.setEnabled(false);
            // cancelRaidsButton
            this.cancelRaidsButton = new qx.ui.form.Button(i18n('ext:cancel_raid_orders'))
              .set({
                width : 104,
                appearance : "button-text-small",
                toolTipText : i18n('ext:cancel_raid_orders')
              });
            this.cancelRaidsButton.addListener("execute", this.cancelRaidOrders, this);
            row.add(this.cancelRaidsButton);
            this.cancelRaidsButton.setEnabled(false);
            // Spacer
            row.add(new qx.ui.core.Widget()
              .set({
                height : 0
              }), {
              flex : 1
            });
            // scheduleButton
            this.scheduleButton = new qx.ui.form.Button('\u267a')
              .set({
                width : 25,
                appearance : "button-text-small",
                toolTipText : i18n('ext:schedule_raid_orders')
              });
            this.scheduleButton.addListener("execute", this.scheduleRaidOrders, this);
            row.add(this.scheduleButton);
            this.scheduleButton.setEnabled(false);
            this.addContent(row, {
              top : 30,
              left : 0
            });
            // third row
            row = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
            var bosImage = new qx.ui.basic.Image("data:;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAARCAYAAAAsT9czAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAVlJREFUSEvdVKFOw1AUfQIxMwRuaSYICaIaEmzFEswEaj+wTyDBg0PVzJFMkSBRSyZIEMwiCAIxRRB8Ql05p5zb3Lx0natok5O+d9/pufe+e29DWZahK3TmiAn12FlAcg1Ywzb2tcT+Evhx3HesJxFnDNurOI/UAObGwTrMdZjhPQCutV850r1sPCOHeJDNi61guwEOgBHwstNZVcQQTiRSaH+u/RdFXACHLstEXArcOU7SltlQkfGjKmKXaR6PCM7e5HAmrmX7CfuVD07n9TX62t2COBQhl2CbMwuM18tamdYW69PGmkn8GIRf4BvgVVkN25xNo0ahxlJOP3Y6k8OFiGyadE/NCgal7+qm0p7NguX/X4qPdWPVxnguAAoQVnjjMEt2mu/GzIlRgJ3L2pPHoJ+9s3jO6IRzljbMGWfL+OScRZwn2DhbG/F4lUe1s65+wj3/N3Z5jX84GscB59wFIgAAAABJRU5ErkJggg==")
              .set({
                paddingTop : 3,
                paddingRight : 6,
                height : 17,
                width : 27,
                scale : true
              });
            bosImage.setToolTipText(i18n('ext:if_bos_available'));
            row.add(bosImage);
            // loadIntelButton
            this.loadIntelButton = new qx.ui.form.Button(i18n('ext:load_intel'))
              .set({
                width : 96,
                appearance : "button-text-small",
                toolTipText : i18n('ext:load_intel')
              });
            this.loadIntelButton.addListener("execute", this.loadIntel, this);
            row.add(this.loadIntelButton, {
              top : 0,
              left : 32
            });
            this.loadIntelButton.setEnabled(false);
            // Spacer
            row.add(new qx.ui.core.Widget()
              .set({
                height : 0
              }), {
              flex : 1
            });
            // installBosButton
            var installBosButton = new qx.ui.form.Button("\u26a1")
              .set({
                width : 25,
                appearance : "button-text-small",
                toolTipText : i18n('ext:install_bos')
              });
            installBosButton.addListener("execute", this.goInstallBos, this);
            row.add(installBosButton);
            this.addContent(row, {
              top : 57,
              left : 0
            });
          },
          goInstallBos : function () {
            webfrontend.gui.Util.openLink('http://userscripts.org/scripts/show/84343', i18n('ext:bos_link_text'));
          },
          loadIntel : function () {
            this.loadIntelButton.setEnabled(false);
            this.self(arguments)
            .loadBosIntel(function (err) {
              this.loadIntelButton.setEnabled(true);
              if (err) {
                debug(err);
              }
            }, this);
          },
          scheduleRaidOrders : function () {
            var dialog = AlsiusTweak.ui.ReturnByWindow.getInstance();
            dialog.center();
            dialog.show();
          },
          cancelAllOrders : function () {
            this.cancelAllButton.setEnabled(false);
            this.self(arguments)
            .cancelAll(function (err) {
              this.cancelAllButton.setEnabled(true);
              if (err) {
                debug(err);
              }
            }, this);
          },
          cancelRaidOrders : function () {
            this.cancelRaidsButton.setEnabled(false);
            this.self(arguments)
            .cancelAllRaids(function (err) {
              this.cancelRaidsButton.setEnabled(true);
              if (err) {
                debug(err);
              }
            }, this);
          },
          fillBuildingQueue : function () {
            var activeCity = webfrontend.data.City.getInstance();
            webfrontend.net.CommandManager.getInstance()
            .sendCommand("BuildingQueueFill", {
              cityid : activeCity.getId()
            }, this, function () {});
          },
          payBuildingQueue : function () {
            var activeCity = webfrontend.data.City.getInstance();
            webfrontend.net.CommandManager.getInstance()
            .sendCommand("BuildingQueuePayAll", {
              cityid : activeCity.getId()
            }, this, function () {});
          },
          showHelp : function () {
            var dialog = AlsiusTweak.ui.AboutWindow.getInstance();
            dialog.center();
            dialog.show();
          },
          checkButtons : function () {
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
        extend : qx.ui.container.Composite,
        construct : function (caption) {
          this.base(arguments);
          this.buildUI(caption);
        },
        properties : {
          value : {
            check : "Date",
            init : new Date(0),
            apply : "_applyValue"
          }
        },
        events : {
          changeValue : "qx.event.type.Data"
        },
        members : {
          _dateSelect : null,
          _hourText : null,
          _minuteText : null,
          _secondText : null,
          _applyingValue : false,
          _updatingValue : false,
          // functions
          buildUI : function (caption) {
            var app = qx.core.Init.getApplication();
            this.setLayout(new qx.ui.layout.HBox(5));
            if (caption !== null) {
              var captionLabel = new qx.ui.basic.Label(caption);
              captionLabel.set({
                allowGrowX : false,
                font : "bold",
                paddingTop : 3
              });
              captionLabel.setTextAlign('left');
              this.add(captionLabel);
              this.add(new qx.ui.core.Widget()
                .set({
                  height : 0
                }), {
                flex : 1
              });
            }
            this._hourText = new qx.ui.form.TextField("0");
            this._hourText.set({
              width : 26,
              maxLength : 2
            });
            this._hourText.addListener("changeValue", this._onValidateHour, this._hourText);
            app.setElementModalInput(this._hourText);
            this.add(this._hourText);
            this._minuteText = new qx.ui.form.TextField("0");
            this._minuteText.set({
              width : 26,
              maxLength : 2
            });
            this._minuteText.addListener("changeValue", this._onValidateMinute, this._minuteText);
            app.setElementModalInput(this._minuteText);
            this.add(this._minuteText);
            this._secondText = new qx.ui.form.TextField("0");
            this._secondText.set({
              width : 26,
              maxLength : 2
            });
            this._secondText.addListener("changeValue", this._onValidateMinute, this._secondText);
            app.setElementModalInput(this._secondText);
            this.add(this._secondText);
            this._dateSelect = new qx.ui.form.SelectBox();
            this._dateSelect.set({
              width : 90
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
          fireChangeValue : function () {
            this.fireDataEvent("changeValue", this.getValue());
          },
          _applyValue : function (value) {
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
            }
            finally {
              this._applyingValue = false;
            }
            this.fireChangeValue();
          },
          _updateValue : function () {
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
          _onValidateHour : function (e) {
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
          _onValidateMinute : function (e) {
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
        type : "singleton",
        extend : qx.ui.window.Window,
        construct : function () {
          this.base(arguments, i18n('ext:schedule_raid_orders'));
          this.buildUI();
        },
        members : {
          _returnTime : null,
          // functions
          buildUI : function () {
            var app = qx.core.Init.getApplication();
            this.setLayout(new qx.ui.layout.VBox(2));
            this.set({
              allowMaximize : false,
              allowMinimize : false,
              showMaximize : false,
              showMinimize : false,
              showStatusbar : false,
              showClose : false,
              contentPadding : 5,
              useMoveFrame : true,
              resizable : false
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
                appearance : "button-text-small",
                toolTipText : i18n('ext:apply_tooltip')
              });
            applyButton.addListener("execute", this.returnRaidsBy, this);
            firstRow.add(applyButton);
            firstRow.add(new qx.ui.core.Widget()
              .set({
                height : 0
              }), {
              flex : 1
            });
            var closeButton = new qx.ui.form.Button(i18n("ext:close"))
              .set({
                appearance : "button-text-small"
              });
            closeButton.addListener("execute", this.hide, this);
            firstRow.add(closeButton);
          },
          returnRaidsBy : function () {
            var uc = this._returnTime.getValue(),
            st = webfrontend.data.ServerTime.getInstance(),
            pauseType = 1,
            orders = webfrontend.data.City.getInstance()
              .unitOrders,
            i = null,
            returnBy = st.getServerStep() + Math.round((uc.getTime() - st.getStepTime(st.getServerStep()).getTime()) / 1000) * st.getStepsPerSecond(),
            currRecurrType = (returnBy === 4602056 || returnBy < 1) ? 1 : 2;
            for (i in orders) {
              if (orders.hasOwnProperty(i)) {
                if (orders[i].type === 8) {
                  webfrontend.net.CommandManager.getInstance()
                  .sendCommand("UnitOrderSetRecurringOptions", {
                    cityid : webfrontend.data.City.getInstance()
                    .getId(),
                    id : orders[i].id,
                    isDelayed : orders[i].isDelayed,
                    recurringType : currRecurrType,
                    recurringEndStep : returnBy,
                    RaidPauseType : pauseType
                  }, this, function (e) {});
                }
              }
            }
            this.hide();
          }
        }
      });
      qx.Class.define("AlsiusTweak.ui.AboutWindow", {
        type : "singleton",
        extend : qx.ui.window.Window,
        construct : function () {
          this.base(arguments, 'Wolfpack Tools v' + EXTversion);
          this.buildUI();
          // Refresh dev info every time
          this.addListener("appear", this.loadDeveloperInfo, this);
        },
        members : {
          _developerInfoText : null,
          _player : null,
          // functions
          getPlayerData : function () {
            var player = webfrontend.data.Player.getInstance(),
            server = webfrontend.data.Server.getInstance(),
            _player = {
              id : player.getId(),
              name : player.getName(),
              version : EXTversion
            };
            return _player;
          },
          buildUI : function () {
            var app = qx.core.Init.getApplication();
            this.setLayout(new qx.ui.layout.VBox(10));
            this.set({
              allowMaximize : false,
              allowMinimize : false,
              showMaximize : false,
              showMinimize : false,
              showStatusbar : false,
              showClose : false,
              contentPadding : 5,
              useMoveFrame : true,
              resizable : true
            });
            this.setWidth(400);
            webfrontend.gui.Util.formatWinClose(this);
            // Licensing
            var licenseLabel = new qx.ui.basic.Label("License")
              .set({
                font : "bold"
              });
            this.add(licenseLabel);
            var license = "Wolfpack Tools - GreaseMonkey script for Lord of Ultima™";
            license += "\nCopyright © 2014 (official fork of AlsiusTools)" + EXTauthors;
            license += "\n\n";
            license += GPL;
            var licenseText = new qx.ui.form.TextArea();
            licenseText.set({
              readOnly : true,
              wrap : true,
              autoSize : true,
              tabIndex : 303,
              minHeight : 280
            });
            licenseText.setValue(license);
            this.add(licenseText);
            // Developer Info
            var devInfoLabel = new qx.ui.basic.Label("Developer Info")
              .set({
                font : "bold"
              });
            this.add(devInfoLabel);
            this._player = this.getPlayerData();
            this._developerInfoText = new qx.ui.form.TextArea();
            this._developerInfoText.set({
              readOnly : true,
              autoSize : true,
              tabIndex : 304,
              height : 50
            });
            app.setElementModalInput(this._developerInfoText);
            this.add(this._developerInfoText);
            // Close button
            var closeButton = new qx.ui.form.Button("Close");
            closeButton.addListener("execute", this.hide, this);
            this.add(closeButton);
          },
          loadDeveloperInfo : function () {
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
        type : "singleton",
        extend : qx.core.Object,
        construct : function () {
          this.base(arguments);
        },
        members : {
          contextObject : null,
          worldCoords : null,
          init : function () {
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
                .GH()
                .HZC(g);

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
            webfrontend.gui.Util.getDistance = function (a, b, c, d) { //getDistanceByCoord
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
          onMouseDown : function (eJ) {
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
          getContextObject : function () {
            return this.contextObject;
          },
          initContextObject : function () {
            this.contextObject = {};
            this.contextObject.dirty = false;
            this.contextObject.nodata = true;
          },
          updateContextObject : function () {
            this.initContextObject();
            var fc = ClientLib.Vis.VisMain.GetInstance();

            if (fc.get_Mode() !== ClientLib.Vis.Mode.City) {
              if (fc.get_Mode() === ClientLib.Vis.Mode.Region) {
                fc.get_Region()
                .ShowSelectorMarkerRegion(-1,  - 1);
              } else {
                fc.get_World()
                .ShowSelectorMarkerWorld(-1,  - 1);
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
                      this.contextObject.get_State = function () {
                        return this.State;
                      };
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
                      this.contextObject.State = _od.State;
                      this.contextObject.get_State = function () {
                        return this.State;
                      };
                      this.contextObject.get_Active = function () {
                        return this.State;
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
                      this.contextObject.get_Active = function () {
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
          checkType : function (types) {
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
          getMinUnitTs : function () {
            var iz = 0,
            ix = 0,
            iA = webfrontend.data.Player.getInstance(),
            iC = iA.getNumCities(),
            iy = webfrontend.res.Main.getInstance().combatAttackCity.c,
            iu = webfrontend.data.City.getInstance(),
            iv = Math.max(iu.getUnitLimit(), iu.getUnitCount()),
            iB = webfrontend.res.Main.getInstance().combatAttackCity.u,
            i;
            for (ix = 0; i < iy.length; ++i) {
              if (iy[i].c > iC) {
                break;
              }
              iz = iy[i].m;
            }
            for (i = 0; i < iB.length; ++i) {
              if (iB[i].c > iv) {
                break;
              }
              ix = iB[i].m;
            }
            return Math.max(iz, ix);
          },
          getTimespanString : function (dC, dD) {
            if (dD === null) {
              dD = false;
            }
            dC = Math.floor(dC);
            var s = dC % 60;
            dC = (dC - s) / 60;
            var m = dC % 60;
            dC = (dC - m) / 60;
            var h = dC;
            var dF = new qx.util.StringBuilder(30);
            if (h > 0 || dD) {
              dF.add(qx.lang.String.pad(h.toString(), 2, '0'), ':');
              if (m < 10) {
                dF.add('0');
              }
            }
            dF.add(m.toString(), ':');
            if (s < 10) {
              dF.add('0');
            }
            dF.add(s.toString());
            return dF.get();
          },
          calculateSettle : function (id) {
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
            if (cI.l === -2 && webfrontend.gui.Util.getContinentFromId(uc.getId()) === webfrontend.gui.Util.getContinentFromId(id)) {
              cI.l = webfrontend.gui.Util.getDistanceUsingIds(uc.getId(), id);
            }

            if (cI.l !== -2) {
              //land
              if (cI.l !== -1) {
                cG = Math.max(0, cI.l * bcb[0]);
                ete_l = AlsiusTweak.worldData.getInstance().getTimespanString(st.getTimeSpan(parseInt(cG / (1 + (cartTech + cartShrine) / 100), 10)), true);
                eta_l = webfrontend.Util.getDateTimeString(st.getStepTime(parseInt(ss + cG / (1 + (cartTech + cartShrine) / 100), 10)));
              }
            }
            if (cI.w !== -2) {
              //sea
              if (cI.w !== -1) {
                var cF = bcb[1] / (1 + (shipTech + shipShrine) / 100);
                cG = Math.max(0, cI.w * cF + sd.getTradeShipPreparationTime());
                ete_w = AlsiusTweak.worldData.getInstance().getTimespanString(st.getTimeSpan(cG, true));
                eta_w = webfrontend.Util.getDateTimeString(st.getStepTime(ss + cG));
              }
            }
            return {
              1 : {
                ete : ete_l,
                eta : eta_l
              },
              2 : {
                ete : ete_w,
                eta : eta_w
              }
            };
          }
        }
      });

      /*
       * @Contribute  Nessus River Guardian Tools - https://userscripts.org/scripts/show/129990
       * Spezial thanks to Brian Hixon for this idea, https://userscripts.org/users/443813
       */
      qx.Class.define("AlsiusTweak.ui.contextMenu", {
        type : "singleton",
        extend : qx.core.Object,
        construct : function () {
          this.base(arguments);
        },
        members : {
          checkedIcon : null,
          waitImage : null,
          contextMenu : null,
          subCopyMenu : null,
          subInfoMenu : null,
          subToolMenu : null,
          subSettleMenu : null,
          selectCityBtn : null,
          multiCopyMenu : null,
          multiMailMenu : null,
          multiInfoMenu : null,
          multiToolMenu : null,
          multiSettleMenu : null,
          viewReportsBtn : null,
          plunderCityBtn : null,
          scoutCityBtn : null,
          sendResCityBtn : null,
          sendArmyBtn : null,
          settleLandCityBtn : null,
          settleWaterCityBtn : null,
          unsettleCityBtn : null,
          claimCityBtn : null,
          unclaimCityBtn : null,
          copyCoordBtn : null,
          copyPlayerBtn : null,
          copyAllianceBtn : null,
          infoPlayerBtn : null,
          infoAllianceBtn : null,
          toolEnableEmoticons : null,
          // functions
          func : function (obj) {},
          init : function () {
            // icons
            this.checkedIcon = "data:image/gif;base64,R0lGODlhCwALAPcAAAAAABOPFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAALAAsAAAgmAP8JHEiwoMGDCA0GCIBwIUOFC/9FHOhQYEWJEy06zEjxIkSDAQEAOw==";
            this.waitImage = "data:image/gif;base64,R0lGODlhEAAQAPMAAP///9/Ord/Ore7m1uzj0fPt4vXx6Pj07vr38/Hp3Pv59uvhzgAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAEKxDISau9OE/Bu//cQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv/XJEMxIFg4VieV0qaqCC+rOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo+UCAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+cghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/nKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEJhDISau9OE/Bu/+cthBDEmZjeWKpKYikC6svGq9XC+6e5v/AICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+ctRBDUhgHElZjeaYr1ZqoKogkDd9s/to4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA=";
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
                          t : unitString,
                          c : uc.units[i].count
                        });
                      }
                    }
                  }
                  webfrontend.net.CommandManager.getInstance()
                  .sendCommand("OrderUnits", {
                    cityid : uc.getId(),
                    units : unitsToSend,
                    targetPlayer : ct.get_PlayerName(),
                    targetCity : ct.get_Pos(),
                    order : 2,
                    transport : 1,
                    iUnitOrderOptions : 0,
                    timeReferenceType : 1,
                    referenceTimeUTCMillis : 0,
                    raidTimeReferenceType : 0,
                    raidReferenceTimeUTCMillis : 0,
                    createCity : ""
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
                  "id" : ct.get_Id()
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
                if (typeof uc.units !== 'undefined' && uc.units !== null && typeof uc.units[8] !== 'undefined' && uc.units[8] !== null && uc.units[8].count >= mt / 2) {
                  unitsToSend.push({
                    t : '8',
                    c : mt / 2
                  });
                  webfrontend.net.CommandManager.getInstance()
                  .sendCommand("OrderUnits", {
                    cityid : uc.getId(),
                    units : unitsToSend,
                    targetPlayer : ct.get_PlayerName(),
                    targetCity : ct.get_Pos(),
                    order : 1,
                    transport : 1,
                    iUnitOrderOptions : 0,
                    timeReferenceType : 1,
                    referenceTimeUTCMillis : 0,
                    raidTimeReferenceType : 0,
                    raidReferenceTimeUTCMillis : 0,
                    createCity : ""
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
                        pos : ct.get_Pos(),
                        id : ct.get_Id(),
                        nt : cn.getSourceText(),
                        invoke : function (result) {
                          if (result.status && !result.error) {
                            AlsiusTweak.Chat.getInstance()
                            .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:note_ok') + result.message), false, 'LoUWin');
                            var pl = webfrontend.data.Player
                              .getInstance(),
                            cc = webfrontend.data.Server.getInstance()
                              .getContinentFromCoords(this.id & 0xFFFF, this.id >> 16),
                            cd = AlsiusTweak.Provider.getInstance()
                              .getContiData(cc);
                            if (cd === null) {
                              cd = {
                                info : []
                              };
                            } else if (typeof cd.info === 'undefined' && cd.info !== null) {
                              cd.info = [];
                            }
                            cd.info[this.pos] = {
                              txt : webfrontend.gui.Util.generateBBCode(this.nt),
                              by : pl.getName(),
                              time : 0
                            };
                          } else if (result.status) {
                            AlsiusTweak.Chat.getInstance()
                            .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:note_nok') + result.message), false, 'Sytem');
                          } else {
                            AlsiusTweak.Chat.getInstance()
                            .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:note_nok') + result.message), true);
                          }
                        }
                      }),
                    note = escape(cn.getSourceText());
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
                  pos : ct.get_Pos(),
                  id : ct.get_Id(),
                  invoke : function (result) {
                    if (result.status && !result.error) {
                      AlsiusTweak.Chat.getInstance()
                      .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:claim_ok') + result.message), false, 'LoUWin');
                      var pl = webfrontend.data.Player
                        .getInstance(),
                      cc = webfrontend.data.Server.getInstance()
                        .getContinentFromCoords(this.id & 0xFFFF, this.id >> 16),
                      cd = AlsiusTweak.Provider.getInstance()
                        .getContiData(cc);
                      if (cd === null) {
                        cd = {
                          claimer : [],
                          settler : []
                        };
                      }
                      cd.claimer[this.pos] = {
                        uid : pl.getId(),
                        name : pl.getName(),
                        time : '00:00'
                      };
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
                  pos : ct.get_Pos(),
                  id : ct.get_Id(),
                  invoke : function (result) {
                    if (result.status && !result.error) {
                      AlsiusTweak.Chat.getInstance()
                      .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:unclaim_ok') + result.message), false, 'LoUWin');
                      var cc = webfrontend.data.Server.getInstance()
                        .getContinentFromCoords(this.id & 0xFFFF, this.id >> 16),
                      cd = AlsiusTweak.Provider.getInstance()
                        .getContiData(cc);
                      if (cd !== null) {
                        delete cd.claimer[this.pos];
                      }
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
              if (AlsiusTweak.Main.getInstance().isBotOnline()) {
                var ct = AlsiusTweak.worldData.getInstance()
                  .getContextObject(),
                key = AlsiusTweak.Stack.getInstance()
                  .store({
                    pos : ct.get_Pos(),
                    id : ct.get_Id(),
                    invoke : function (result, uuid) {
                      if (result.status && !result.error) {
                        var curcityId = webfrontend.data.City.getInstance().getId(),
                        settle = {
                          cityid : curcityId,
                          units : [{
                              "t" : "19",
                              "c" : 1
                            }
                          ],
                          uuid : uuid,
                          targetPlayer : "",
                          targetCity : this.pos,
                          order : 9,
                          transport : 1,
                          createCity : (ct.get_UIType() === EMPTY_TYPE) ? 'Wolfpack Dorf' : 'LL Wolfpack',
                          timeReferenceType : 1,
                          referenceTimeUTCMillis : 0,
                          raidTimeReferenceType : 0,
                          raidReferenceTimeUTCMillis : 0,
                          iUnitOrderOptions : 0
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
                          cd = {
                            claimer : [],
                            settler : []
                          };
                        }
                        cd.settler[this.pos] = {
                          uid : pl.getId(),
                          name : pl.getName(),
                          time : '00:00',
                          ete : es[1].ete
                        };
                        delete cd.claimer[this.pos];
                      } else if (result.status) {
                        AlsiusTweak.Chat.getInstance()
                        .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_nok') + result.message), false, 'System');
                      } else {
                        AlsiusTweak.Chat.getInstance()
                        .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_nok') + result.message), true);
                      }
                    },
                    _onSendDone : function (ok, errorCode, context) {
                      try {
                        if (!ok || errorCode.r0 !== 0 || errorCode.r1 !== 0) {
                          var messages = [];
                          if (errorCode.r0 & 4) {
                            messages.push(i18n('ext:baron_needed'));
                          }
                          if (errorCode.r0 & 64) {
                            messages.push(i18n('ext:freeslot_needed'));
                          }
                          if (errorCode.r0 & 32768) {
                            messages.push(i18n('ext:resources_needed'));
                          }
                          if (errorCode.r0 & 65536) {
                            messages.push(i18n('ext:is_castle'));
                          }
                          if (errorCode.r0 & 131072) {
                            messages.push(i18n('ext:traiders_needed'));
                          }
                          if (messages.length === 0) {
                            messages.push(i18n('ext:unknown'));
                          }
                          AlsiusTweak.Chat.getInstance()
                          .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:error_on_command') + ': ' + i18n('ext:settle_by_land') + ' ' + context.targetCity + ' (' + messages.join(', ') + ')'), true);
                          AlsiusTweak.Main.getInstance()
                          .chat.addMsg('/whisper ' + EXTbotname + ' !alsius.lou.Error ' + context.uuid);
                        };
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
                  cityid : curcityId,
                  units : [{
                      "t" : "19",
                      "c" : 1
                    }
                  ],
                  targetPlayer : "",
                  targetCity : ct.get_Pos(),
                  order : 9,
                  transport : 1,
                  createCity : (ct.get_UIType() === EMPTY_TYPE) ? i18n("ext:settlement") : 'Lawless',
                  timeReferenceType : 1,
                  referenceTimeUTCMillis : 0,
                  raidTimeReferenceType : 0,
                  raidReferenceTimeUTCMillis : 0,
                  iUnitOrderOptions : 0
                },
                es = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id()),
                lawless = (ct.get_UIType() === LAWLESS_TYPE) ? ' LL' : '';
                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", settle, this, function (ok, errorCode, context) {
                  try {
                    if (!ok || errorCode.r0 !== 0 || errorCode.r1 !== 0) {
                      var messages = [];
                      if (errorCode.r0 & 4) {
                        messages.push(i18n('ext:baron_needed'));
                      }
                      if (errorCode.r0 & 64) {
                        messages.push(i18n('ext:freeslot_needed'));
                      }
                      if (errorCode.r0 & 32768) {
                        messages.push(i18n('ext:resources_needed'));
                      }
                      if (errorCode.r0 & 65536) {
                        messages.push(i18n('ext:is_castle'));
                      }
                      if (errorCode.r0 & 131072) {
                        messages.push(i18n('ext:traiders_needed'));
                      }
                      if (messages.length === 0) {
                        messages.push(i18n('ext:unknown'));
                      }
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
              if (AlsiusTweak.Main.getInstance().isBotOnline()) {
                var ct = AlsiusTweak.worldData.getInstance()
                  .getContextObject(),
                key = AlsiusTweak.Stack.getInstance()
                  .store({
                    pos : ct.get_Pos(),
                    id : ct.get_Id(),
                    invoke : function (result, uuid) {
                      if (result.status && !result.error) {
                        var curcityId = webfrontend.data.City.getInstance().getId(),
                        settle = {
                          cityid : curcityId,
                          units : [{
                              "t" : "19",
                              "c" : 1
                            }
                          ],
                          uuid : uuid,
                          targetPlayer : "",
                          targetCity : this.pos,
                          order : 9,
                          transport : 2,
                          createCity : (ct.get_UIType() === EMPTY_TYPE) ? 'Wolfpack Dorf' : 'LL Wolfpack',
                          timeReferenceType : 1,
                          referenceTimeUTCMillis : 0,
                          raidTimeReferenceType : 0,
                          raidReferenceTimeUTCMillis : 0,
                          iUnitOrderOptions : 0
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
                          cd = {
                            claimer : [],
                            settler : []
                          };
                        }
                        cd.settler[this.pos] = {
                          uid : pl.getId(),
                          name : pl.getName(),
                          time : '00:00',
                          ete : es[2].ete
                        };
                        delete cd.claimer[this.pos];
                      } else if (result.status) {
                        AlsiusTweak.Chat.getInstance()
                        .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_nok') + result.message), false, 'System');
                      } else {
                        AlsiusTweak.Chat.getInstance()
                        .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:settle_nok') + result.message), true);
                      }
                    },
                    _onSendDone : function (ok, errorCode, context) {
                      try {
                        if (!ok || errorCode.r0 !== 0 || errorCode.r1 !== 0) {
                          var messages = [];
                          if (errorCode.r0 & 4) {
                            messages.push(i18n('ext:baron_needed'));
                          }
                          if (errorCode.r0 & 64) {
                            messages.push(i18n('ext:freeslot_needed'));
                          }
                          if (errorCode.r0 & 32768) {
                            messages.push(i18n('ext:resources_needed'));
                          }
                          if (errorCode.r0 & 65536) {
                            messages.push(i18n('ext:is_castle'));
                          }
                          if (errorCode.r0 & 131072) {
                            messages.push(i18n('ext:traiders_needed'));
                          }
                          if (messages.length === 0) {
                            messages.push(i18n('ext:unknown'));
                          }
                          AlsiusTweak.Chat.getInstance()
                          .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:error_on_command') + ': ' + i18n('ext:settle_by_water') + ' ' + context.targetCity + ' (' + messages.join(', ') + ')'), true);
                          AlsiusTweak.Main.getInstance()
                          .chat.addMsg('/whisper ' + EXTbotname + ' !alsius.lou.Error ' + context.uuid);
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
                  cityid : curcityId,
                  units : [{
                      "t" : "19",
                      "c" : 1
                    }
                  ],
                  targetPlayer : "",
                  targetCity : ct.get_Pos(),
                  order : 9,
                  transport : 2,
                  createCity : (ct.get_UIType() === EMPTY_TYPE) ? i18n("ext:settlement") : 'Lawless',
                  timeReferenceType : 1,
                  referenceTimeUTCMillis : 0,
                  raidTimeReferenceType : 0,
                  raidReferenceTimeUTCMillis : 0,
                  iUnitOrderOptions : 0
                },
                es = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id()),
                lawless = (ct.get_UIType() === LAWLESS_TYPE) ? ' LL' : '';
                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", settle, this, function (ok, errorCode, context) {
                  try {
                    if (!ok || errorCode.r0 !== 0 || errorCode.r1 !== 0) {
                      var messages = [];
                      if (errorCode.r0 & 4) {
                        messages.push(i18n('ext:baron_needed'));
                      }
                      if (errorCode.r0 & 64) {
                        messages.push(i18n('ext:freeslot_needed'));
                      }
                      if (errorCode.r0 & 32768) {
                        messages.push(i18n('ext:resources_needed'));
                      }
                      if (errorCode.r0 & 65536) {
                        messages.push(i18n('ext:is_castle'));
                      }
                      if (errorCode.r0 & 131072) {
                        messages.push(i18n('ext:traiders_needed'));
                      }
                      if (messages.length === 0) {
                        messages.push(i18n('ext:unknown'));
                      }
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
            /* unsettle city or free_slot */
            this.unsettleCityBtn.addListener("execute", function (e) {
              var ct = AlsiusTweak.worldData.getInstance()
                .getContextObject(),
              key = AlsiusTweak.Stack.getInstance()
                .store({
                  pos : ct.get_Pos(),
                  id : ct.get_Id(),
                  invoke : function (result) {
                    if (result.status && !result.error) {
                      AlsiusTweak.Chat.getInstance()
                      .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:unsettle_ok') + result.message), false, 'LoUWin');
                      var cc = webfrontend.data.Server.getInstance()
                        .getContinentFromCoords(this.id & 0xFFFF, this.id >> 16),
                      cd = AlsiusTweak.Provider.getInstance()
                        .getContiData(cc);
                      if (cd !== null) {
                        delete cd.settler[this.pos];
                      }
                    } else if (result.status) {
                      AlsiusTweak.Chat.getInstance()
                      .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:unsettle_nok') + result.message), false, 'System');
                    } else {
                      AlsiusTweak.Chat.getInstance()
                      .addChatMessage(webfrontend.gui.Util.convertBBCode(i18n('ext:unsettle_nok') + result.message), true);
                    }
                  }
                }),
              lawless = (ct.get_UIType() === LAWLESS_TYPE) ? ' LL' : '';
              AlsiusTweak.Main.getInstance().chat.addMsg('/whisper ' + EXTbotname + ' !alsius.' + key + '.Unsettle ' + ct.get_Pos() + lawless);
            }, this);
          },
          _onTroopsSent : function (ok, errorCode) {
            try {
              if (!ok || errorCode.r0 !== 0 || errorCode.r1 !== 0) {
                AlsiusTweak.Chat.getInstance()
                .addChatMessage(i18n('ext:error_on_command') + ': ' + i18n('ext:send_army'), true);
              }
            } catch (e) {
              debug(i18n('ext:error_message') + ': ' + e);
            }
          },
          updateContextMenu : function () {
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
              et = pl.getDistanceByCoord(uc.getId(), ct.get_Id() & 0xFFFF, ct.get_Id() >> 16),
              mt = AlsiusTweak.worldData.getInstance().getMinUnitTs(),
              tooltip;
              switch (ct.get_UIType()) {
              case BOSS_TYPE:
              case DUNGEON_TYPE:
                this.selectCityBtn.setVisibility("visible");
                this.selectCityBtn.setEnabled(false);
                this.selectCityBtn.setLabel(webfrontend.res.Main.getInstance().dungeons[ct.get_Type()].dn + ' (' + ct.get_Level() + ')');
                this.sendArmyBtn.setVisibility("visible");/*console.log(ct);console.log(ct.get_UIType);*/
                if (typeof ct.get_Active !== 'undefined' && ct.get_Active()) {
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
                    if (typeof uc.units[8] !== 'undefined' && uc.units[8] !== null && uc.units[8].count >= mt / 2) {
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
                if (AlsiusTweak.Main.getInstance().isBotOnline()) {
                  this.editNotesCityBtn.setVisibility("visible");
                  if (cd !== null && AlsiusTweak.Main.getInstance().isBotOnline() && (cd.rules.grand || cd.rules.warlord || cd.rules.officer || cd.rules.notes)) {
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
                    if (typeof uc.units[8] !== 'undefined' && uc.units[8] !== null && uc.units[8].count >= mt / 2) {
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
                if (AlsiusTweak.Main.getInstance().isBotOnline()) {
                  this.editNotesCityBtn.setVisibility("visible");
                  if (cd !== null && AlsiusTweak.Main.getInstance().isBotOnline() && (cd.rules.grand || cd.rules.warlord || cd.rules.officer || cd.rules.notes)) {
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
                      if (typeof uc.units[8] !== 'undefined' && uc.units[8] !== null && uc.units[8].count >= mt / 2) {
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
                  if (AlsiusTweak.Main.getInstance().isBotOnline()) {
                    this.editNotesCityBtn.setVisibility("visible");
                    if (cd !== null && AlsiusTweak.Main.getInstance().isBotOnline() && (cd.rules.grand || cd.rules.warlord || cd.rules.officer || cd.rules.notes)) {
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
                if (AlsiusTweak.Main.getInstance().isBotOnline()) {
                  this.multiSettleMenu.setEnabled(true);
                  // is claimed by self and not settled by anyone?
                  if (cd !== null && typeof cd.claimer !== 'undefined' && cd.claimer[ct.get_Pos()] && parseInt(cd.claimer[ct.get_Pos()].uid, 10) === pl.getId()) {
                    this.unclaimCityBtn.setEnabled(true);
                    this.unclaimCityBtn.setIcon(this.checkedIcon);
                    this.claimCityBtn.setEnabled(false);
                    this.claimCityBtn.resetIcon();
                    // is claimed or settled by anyone?
                  } else if (cd !== null && ((typeof cd.settler !== 'undefined' && cd.settler[ct.get_Pos()]) || (typeof cd.claimer !== 'undefined' && cd.claimer[ct.get_Pos()]))) {
                    this.unclaimCityBtn.setEnabled(false);
                    this.unclaimCityBtn.resetIcon();
                    this.claimCityBtn.setEnabled(false);
                    this.claimCityBtn.resetIcon();
                  } else {
                    this.unclaimCityBtn.setEnabled(false);
                    this.unclaimCityBtn.resetIcon();
                    this.claimCityBtn.setEnabled(true);
                    this.claimCityBtn.setIcon(this.checkedIcon);
                  }
                  // unsettle
                  // is settled by self?
                  if (cd !== null && typeof cd.settler !== 'undefined' && cd.settler[ct.get_Pos()] && parseInt(cd.settler[ct.get_Pos()].uid, 10) === pl.getId()) {
                    this.unsettleCityBtn.setVisibility("visible");
                    this.unsettleCityBtn.setEnabled(true);
                    this.unsettleCityBtn.setIcon(this.checkedIcon);
                  } else {
                    this.unsettleCityBtn.setEnabled(false);
                    this.unsettleCityBtn.resetIcon();
                    // settle
                    // have barons, have traiders, have ressources and is not a castle?
                    var tr = uc.getTraders();
                    this.unsettleCityBtn.setVisibility("excluded");
                    var haveBaron = (typeof uc.units !== 'undefined' && uc.units !== null && typeof uc.units[19] !== 'undefined' && uc.units[19] !== null && uc.units[19].count >= 1) ? true : false;
                    var haveRess = webfrontend.gui.Util.checkResourcesObject(jf.getNewCityResources());
                    if (haveBaron && haveRess && tr !== null && !(ct.get_UIType() !== EMPTY_TYPE && ct.get_StrongHold())) {
                      // have carts and target on same continent?
                      var timeCheck = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id());
                      if (timeCheck[1].ete !== -1 && tr[1] !== null && tr[1].count >= 250 && (jf.getContinentFromCoords(uc.getId() & 0xFFFF, uc.getId() >> 16) === cc) && !(uc.getStrongHold() && uc.getSieged())) {
                        this.settleLandCityBtn.setVisibility("visible");
                        this.unsettleCityBtn.setVisibility("visible");
                        if (timeCheck[1].ete !== -2) {
                          this.settleLandCityBtn.setEnabled(true);
                          this.settleLandCityBtn.setIcon(this.checkedIcon);
                          this.settleLandCityBtn.setBlockToolTip(false);
                          tooltip = new qx.ui.tooltip.ToolTip(timeCheck[1].eta, null);
                          this.settleLandCityBtn.setToolTip(tooltip);
                        } else {
                          this.settleLandCityBtn.setEnabled(false);
                          this.settleLandCityBtn.setIcon(this.waitImage);
                          this.settleLandCityBtn.setBlockToolTip(false);
                          tooltip = new qx.ui.tooltip.ToolTip('...', null);
                          this.settleLandCityBtn.setToolTip(tooltip);
                        }
                      } else {
                        this.settleLandCityBtn.setVisibility("excluded");
                        this.settleLandCityBtn.setBlockToolTip(true);
                      }
                      // have ships and is water?
                      if (timeCheck[2].ete !== -1 && tr[2] !== null && tr[2].count >= 25 && (ct.get_UIType() === EMPTY_TYPE || ct.get_OnWater()) && !(uc.getStrongHold() && uc.getSieged()) && uc.getOnWater()) {
                        this.settleWaterCityBtn.setVisibility("visible");
                        this.unsettleCityBtn.setVisibility("visible");
                        if (timeCheck[2].ete !== -2) {
                          this.settleWaterCityBtn.setEnabled(true);
                          this.settleWaterCityBtn.setIcon(this.checkedIcon);
                          this.settleWaterCityBtn.setBlockToolTip(false);
                          tooltip = new qx.ui.tooltip.ToolTip(timeCheck[2].eta, null);
                          this.settleWaterCityBtn.setToolTip(tooltip);
                        } else {
                          this.settleWaterCityBtn.setEnabled(false);
                          this.settleWaterCityBtn.setIcon(this.waitImage);
                          this.settleWaterCityBtn.setBlockToolTip(false);
                          tooltip = new qx.ui.tooltip.ToolTip('...', null);
                          this.settleWaterCityBtn.setToolTip(tooltip);
                          qx.util.TimerManager.getInstance()
                          .start(function () {
                            var ct = AlsiusTweak.worldData.getInstance().getContextObject(),
                            timeCheck = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id());
                            if (timeCheck[2].ete !== -2) {
                              this.settleWaterCityBtn.setEnabled(true);
                              this.settleWaterCityBtn.setIcon(this.checkedIcon);
                              this.settleWaterCityBtn.setBlockToolTip(false);
                              var tooltip = new qx.ui.tooltip.ToolTip(timeCheck[2].eta, null);
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
                    var timeCheck = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id());
                    if (timeCheck[1].ete !== -1 && tr[1] !== null && tr[1].count >= 250 && (jf.getContinentFromCoords(uc.getId() & 0xFFFF, uc.getId() >> 16) === cc) && !(uc.getStrongHold() && uc.getSieged())) {
                      this.settleLandCityBtn.setVisibility("visible");
                      if (timeCheck[1].ete !== -2) {
                        this.settleLandCityBtn.setEnabled(true);
                        this.settleLandCityBtn.setIcon(this.checkedIcon);
                        this.settleLandCityBtn.setBlockToolTip(false);
                        tooltip = new qx.ui.tooltip.ToolTip(timeCheck[1].eta, null);
                        this.settleLandCityBtn.setToolTip(tooltip);
                      } else {
                        this.settleLandCityBtn.setEnabled(false);
                        this.settleLandCityBtn.setIcon(this.waitImage);
                        this.settleLandCityBtn.setBlockToolTip(false);
                        tooltip = new qx.ui.tooltip.ToolTip('...', null);
                        this.settleLandCityBtn.setToolTip(tooltip);
                      }
                    } else {
                      this.settleLandCityBtn.setVisibility("excluded");
                      this.settleLandCityBtn.setBlockToolTip(true);
                    }
                    // have ships and is water?
                    if (timeCheck[2].ete !== -1 && tr[2] !== null && tr[2].count >= 25 && (ct.get_UIType() === EMPTY_TYPE || ct.get_OnWater()) && !(uc.getStrongHold() && uc.getSieged()) && uc.getOnWater()) {
                      this.settleWaterCityBtn.setVisibility("visible");
                      if (timeCheck[2].ete !== -2) {
                        this.settleWaterCityBtn.setEnabled(true);
                        this.settleWaterCityBtn.setIcon(this.checkedIcon);
                        this.settleWaterCityBtn.setBlockToolTip(false);
                        tooltip = new qx.ui.tooltip.ToolTip(timeCheck[2].eta, null);
                        this.settleWaterCityBtn.setToolTip(tooltip);
                      } else {
                        this.settleWaterCityBtn.setEnabled(false);
                        this.settleWaterCityBtn.setIcon(this.waitImage);
                        this.settleWaterCityBtn.setBlockToolTip(false);
                        tooltip = new qx.ui.tooltip.ToolTip('...', null);
                        this.settleWaterCityBtn.setToolTip(tooltip);
                        qx.util.TimerManager.getInstance()
                        .start(function () {
                          var ct = AlsiusTweak.worldData.getInstance().getContextObject(),
                          timeCheck = AlsiusTweak.worldData.getInstance().calculateSettle(ct.get_Id());
                          if (timeCheck[2].ete !== -2) {
                            this.settleWaterCityBtn.setEnabled(true);
                            this.settleWaterCityBtn.setIcon(this.checkedIcon);
                            this.settleWaterCityBtn.setBlockToolTip(false);
                            var tooltip = new qx.ui.tooltip.ToolTip(timeCheck[2].eta, null);
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
      console.log('WpkTweak: ' + e);
    }
  }
  /* inject this script into the website */
  function injectMain() {
    debug('Injecting WpkTweak');
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
    injectMain();
  }
}
  ());
