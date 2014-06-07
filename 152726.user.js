// ==UserScript==
// @name 		LoUV_B tools
// @description 	Adds extra functionality to Lord of Ultima
// @namespace 		V_B
// @include 		http://prodgame15.lordofultima.com/158/index.aspx*
// @version 		0.8.8
// @require 		http://sizzlemctwizzle.com/updater.php?id=139448&days=1
// ==/UserScript==
(function () {
  /*
   * Changelog
   * 31/07/2012
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
   * 0.7.1 - twaek more info, minor fix Cityguard ts and Baron
   * 0.7.2 - fix br within tooltips
   * 0.8   - add dungeon and boss tooltip
   * 0.8.1 - fix boss tooltips
   * 0.8.2 - round up dungeon and boss ts
   * 0.8.3 - fix bonus


   * 0.8.4 - change Namespace to V_B
   * 0.8.5 - add empty data tipp
   * 0.8.6 - fix boss tooltip

   * 0.8.7 - fix boss tooltip again
   * 0.8.8 - * menu working
   */
  var main = function () {
      
      const V_BTweakVersion = '0.8.8';
      
      function debug(msg) {
        msg = (msg instanceof Error && msg.stack) ? msg.stack : String(msg);
        if (window.console && typeof console.log == "function") {
          console.log('V_BTweak: ' + msg);
        }
      }

      function checkDependencies() {

        var app = qx.core.Init.getApplication();
        var dependencies = [
          //window.bos,
          app.serverBar,
          app.chat,
          app.cityInfoView,
          webfrontend.data.City.getInstance(),
          webfrontend.config.Config.getInstance().getChat(),
          webfrontend.base.Timer.getInstance(),
          webfrontend.data.Server.getInstance()
        ];
        var i = dependencies.length;
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
      const DefaultLang = "DE";
      const LocalizedStrings = {
        "en" : {
          "ext:weak" : "Weakness",
          "ext:error_on_command" : "Failed to run command",
          "ext:you_are_logged_in" : "You are logged in",
          "ext:login_failed" : "Login failed",
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
          "ext:cancel_all_orders" : "Cancel all",
          "ext:cancel_raid_orders" : "Cancel raids",
          "ext:schedule_raid_orders" : "Schedule raids",
          "ext:return_time" : "Latest return time:",
          "ext:apply" : "Apply",
          "ext:close" : "Close",
          "ext:apply_tooltip" : "Click to apply changes",
          "ext:2 days": "2 Days",
          "ext:3 days": "3 Days",
          "ext:4 days": "4 Days",
          "ext:5 days": "5 Days",
          "ext:6 days": "6 Days",
          "ext:7 days": "7 Days",
          "ext:today": "Today",
          "ext:tomorrow": "Tomorrow"
        },
        "de" : {
          "ext:weak" : "Schwäche",
          "ext:error_on_command" : "Fehler beim ausführen von",
          "ext:you_are_logged_in" : "Du bist angemeldet",
          "ext:login_failed" : "Fehler bei der Anmeldung",
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
          "ext:cancel_all_orders" : "Befehle löschen",
          "ext:cancel_raid_orders" : "Raids abbrechen",
          "ext:schedule_raid_orders" : "Raids Zeitplan",
          "ext:return_time" : "Späteste Rückkehr:",
          "ext:apply" : "Speichern",
          "ext:close" : "Schließen",
          "ext:apply_tooltip" : "Klicke hier, um die Änderungen zu speichern",
          "ext:2 days": "2 Tage",
          "ext:3 days": "3 Tage",
          "ext:4 days": "4 Tage",
          "ext:5 days": "5 Tage",
          "ext:6 days": "6 Tage",
          "ext:7 days": "7 Tage",
          "ext:today": "Heute",
          "ext:tomorrow": "Morgen"
        }
      }
      
      function i18n(messageId) {
        
        var locale = qx.locale.Manager.getInstance().getLocale();
        if (LocalizedStrings[locale] != undefined && LocalizedStrings[locale][messageId] != undefined) {
          return LocalizedStrings[locale][messageId];
        }
        else if (LocalizedStrings[DefaultLang][messageId] != undefined) {
          return LocalizedStrings[DefaultLang][messageId];
        }
        else
          return messageId;
      }
      
      /*
       * @Contribute  http://benalman.com/projects/javascript-emotify/
       * Spezial thanks to Ben Alman, http://benalman.com/about/license/
       */
      var EMOTICON_RE,
          emoticons = {},
          lookup = [];
      var emotify = function(txt, callback) {
        callback = callback || function(img, title, smiley, text) {
          title = (title + ', ' + smiley).replace(/"/g, '&quot;').replace(/</g, '&lt;');
          return '<img src="' + img + '" title="' + title + '" alt="" class="smiley" style="vertical-align: -20%;"/>';
        };
        
        return txt.replace(EMOTICON_RE, function(a, b, text) {
          var i = 0,
            smiley = text,
            e = emoticons[text];
          
          // If smiley matches on manual regexp, reverse-lookup the smiley.
          if (!e) {
            while (i < lookup.length && !lookup[i].regexp.test(text)) { i++ };
            smiley = lookup[i].name;
            e = emoticons[smiley];
          }
          
          // If the smiley was found, return HTML, otherwise the original search string
          return e ? (b + callback( e[0], e[1], smiley, text)) : a;
        });
      };
      
      emotify.emoticons = function() {
        var args = Array.prototype.slice.call( arguments ),
          base_url = typeof args[0] === 'string' ? args.shift() : '',
          replace_all = typeof args[0] === 'boolean' ? args.shift() : false,
          smilies = args[0],
          e,
          arr = [],
          alts,
          i,
          regexp_str;
        if ( smilies ) {
          if ( replace_all ) {
            emoticons = {};
            lookup = [];
          }
          for ( e in smilies ) {
            emoticons[e] = smilies[e];
            emoticons[e][0] = base_url + emoticons[e][0];
          }
          // Generate the smiley-match regexp.
          for (e in emoticons) {
            if (emoticons[e].length > 2) {
              // Generate regexp from smiley and alternates.
              alts = emoticons[e].slice(2).concat(e);
              
              i = alts.length
              while (i--) {
                alts[i] = alts[i].replace(/(\W)/g, '\\$1');
              }
              regexp_str = alts.join('|');
              // Manual regexp, map regexp back to smiley so we can reverse-match.
              lookup.push({ name: e, regexp: new RegExp('^' + regexp_str + '$') });
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


          const EXTversion     = V_BTweakVersion;
          const EXTbotname     = "VBlade";
          const EXTgreeting    = "Viking_Blades reloadet!";

          const EXTauthors     = "BloodHeart";
          const EXTpolltrip    = 1000 * 60 * 5;
          const EXTdataversion = '1.3';
          const EXTendpoint    = 'data_1_3.php';
          const EXTprovider    = 'http://45er67tr.deliberate.de/service/ajaxEndpoint/';

          qx.Class.define("V_BTweak.Main", {
            // let's create a new instance for EXT additional tweaks.
            type: "singleton",
            extend: qx.core.Object,
            members: {
              bQh: null,
              bQc: null,
              app: null,
              tick: null,
              ministerPresent: null,
              cInfoView: null,
              continents: null,
              initialize: function () {
                this.ministerPresent = {'TradeMinister': false, 'BuildMinister': false, 'DefenseMinister': false, 'MilitaryMinister': false},
                this.tick = null,
                this.continents = [],
                this.app = qx.core.Init.getApplication();
                this.cInfoView = this.app.getCityInfoView();
                this.bQc = this.cInfoView.buildingQueue;
                this.bQh = this.bQc.header;
                this.tweakEXT();
              },
              tweakEXT: function () {
                this.inception();
                this.toolTip();
                this.chat = webfrontend.data.Chat.getInstance();
                qx.util.TimerManager.getInstance().start(function () {
                  this.checkMinisterPresent();
                }, null, this, null, 1000 * 5);
                this.panel = new V_BTweak.ui.ExtraTools("V_B Tools v" + EXTversion + ' ~ ' + EXTgreeting + ' ~ ');
                this.addPanel(this.panel);
                this.hijackMessage();
                this.emotifyIcons();
                this.logOn();
              },
              setPanelState: function(state) {
                this.panel.setState(state);
              },
              checkMinisterPresent: function() {
                var player = webfrontend.data.Player.getInstance();
                this.ministerPresent.TradeMinister = player.getMinisterTradePresent();
                this.ministerPresent.BuildMinister = player.getMinisterBuildPresent();
                this.ministerPresent.DefenseMinister = player.getMinisterDefencePresent();
                this.ministerPresent.MilitaryMinister = player.getMinisterMilitaryPresent();
                qx.util.TimerManager.getInstance().start(function () {
                  this.checkMinisterPresent();
                }, null, this, null, 1000 * 60);
              },
              inception: function () {
                V_BTweak.Inception.getInstance().init();
              },
              toolTip: function () {
                V_BTweak.Tooltip.getInstance().init();
              },
              addPanel: function (panel) {
                this.bQc.getLayoutParent().addBefore(panel, this.bQc);
              },
              logOn: function () {
                this.chat.addMsg('/whisper ' + EXTbotname + ' !v_b.lou.Login ' + EXTversion + ' ' + webfrontend.net.CommandManager.getInstance().getInstanceGuid());
              },
              hijackMessage: function () {
                V_BTweak.Chat.getInstance().init();
              },
              registerTick: function () {
                this.getContinents();
                var tp = V_BTweak.Provider.getInstance();
                //tp.pollData([{"Service": "getData", "Args": {"continent": '-1'}}]);
                this.continents.forEach(function (c) {
                  tp.pollData([{"Service": "getData", "Args": {"continent": c}}]);
                  this.tick = qx.util.TimerManager.getInstance().start(tp.pollData, EXTpolltrip, tp, [{"Service": "getData", "Args": {"continent": c}}]);
                });
              },
              unRegisterTick: function () {
                qx.util.TimerManager.getInstance().stop(this.tick);
              },
              getContinents: function () {
                this.continents = webfrontend.data.Server.getInstance().getActiveContinents();
              },
              emotifyIcons: function () {
                var smilies = {
                  ">:)":   [ "19.gif",          "devil",         ">:-)", "&gt;:-)", "&gt;:)"  ],
                  ":)":    [ "1.gif",           "happy",   ":-)", "*g", "*g*", "*G", "*G*"    ],
                  ":(":    [ "2.gif",           "sad",                  ":-(", ":/"           ],
                  ";)":    [ "3.gif",           "winking",              ";-)"                 ],
                  ":D":    [ "4.gif",           "big grin", "xD", ":-D", "*gg*", "gg", "GG", "*GG*"],
                  ";;)":   [ "5.gif",           "batting eyelashes"                           ],
                  ">:D<":  [ "6.gif",           "big hug", "&gt;:D&lt;", ":DD", "xDD"         ],
                  ":-/":   [ "7.gif",           "confused",             ":/"                  ],
                  ":x":    [ "8.gif",           "love struck",          ":X"                  ],
                  ":\">":  [ "9.gif",           "blushing",             ":\"&gt;"             ],
                  ":P":    [ "10.gif",          "tongue",               ":p", ":-p", ":-P"    ],
                  ":-*":   [ "11.gif",          "kiss",                 ":*"                  ],
                  "=((":   [ "12.gif",          "broken heart"                                ],
                  ":-O":   [ "13.gif",          "surprise",             ":O", "*huh*"         ],
                  "X(":    [ "14.gif",          "angry"                                       ],
                  ":>":    [ "15.gif",          "smug",                 ":&gt;"               ],
                  "B-)":   [ "16.gif",          "cool"                                        ],
                  ":-S":   [ "17.gif",          "worried"                                     ],
                  "#:-S":  [ "18.gif",          "whew!",                "#:-s"                ],
                  ":((":   [ "20.gif",          "crying",               ":-((", ":'(", ":'-(" ],
                  ":))":   [ "21.gif",          "laughing",             ":-))"                ],
                  ":|":    [ "22.gif",          "straight face",        ":-|"                 ],
                  "/:)":   [ "23.gif",          "raised eyebrow",       "/:-)"                ],
                  "=))":   [ "24.gif",          "rolling on the floor"                        ],
                  "O:-)":  [ "25.gif",          "angel",                "O:)"                 ],
                  ":-B":   [ "26.gif",          "nerd"                                        ],
                  "=;":    [ "27.gif",          "talk to the hand"                            ],
                  "I-)":   [ "28.gif",          "sleepy"                                      ],
                  "8-|":   [ "29.gif",          "rolling eyes"                                ],
                  "L-)":   [ "30.gif",          "loser"                                       ],
                  ":-&":   [ "31.gif",          "sick"                                        ],
                  ":-$":   [ "32.gif",          "don't tell anyone"                           ],
                  "[-(":   [ "33.gif",          "not talking"                                 ],
                  ":O)":   [ "34.gif",          "clown"                                       ],
                  "8-}":   [ "35.gif",          "silly"                                       ],
                  "<:-P":  [ "36.gif",          "party", "<:-p", "&lt;:-P", "&lt;:-p"         ],
                  "(:|":   [ "37.gif",          "yawn"                                        ],
                  "=P~":   [ "38.gif",          "drooling"                                    ],
                  ":-?":   [ "39.gif",          "thinking"                                    ],
                  "#-o":   [ "40.gif",          "d'oh",                 "#-O"                 ],
                  "=D>":   [ "41.gif",          "applause",             "=D&gt;"              ],
                  ":-SS":  [ "42.gif",          "nailbiting",           ":-ss"                ],
                  "@-)":   [ "43.gif",          "hypnotized"                                  ],
                  ":^o":   [ "44.gif",          "liar"                                        ],
                  ":-w":   [ "45.gif",          "waiting",              ":-W"                 ],
                  ":-<":   [ "46.gif",          "sigh",                 ":-&lt;"              ],
                  ">:P":   [ "47.gif",          "phbbbbt", ">:p", "&gt;:P", "&gt;:p"          ],
                  "<):)":  [ "48.gif",          "cowboy", "&lt;):)"                           ],
                  ":@)":   [ "49.gif",          "pig"                                         ],
                  "3:-O":  [ "50.gif",          "cow",                  "3:-o"                ],
                  ":(|)":  [ "51.gif",          "monkey"                                      ],
                  "~:>":   [ "52.gif",          "chicken",              "~:&gt;"              ],
                  "@};-":  [ "53.gif",          "rose"                                        ],
                  "%%-":   [ "54.gif",          "good luck"                                   ],
                  "**==":  [ "55.gif",          "flag"                                        ],
                  "(~~)":  [ "56.gif",          "pumpkin"                                     ],
                  "~O)":   [ "57.gif",          "coffee"                                      ],
                  "*-:)":  [ "58.gif",          "idea"                                        ],
                  "8-X":   [ "59.gif",          "skull"                                       ],
                  "=:)":   [ "60.gif",          "bug"                                         ],
                  ">-)":   [ "61.gif",          "alien",                "&gt;-)"              ],
                  ":-L":   [ "62.gif",          "frustrated",           ":L"                  ],
                  "[-O<":  [ "63.gif",          "praying",              "[-O&lt;"             ],
                  "$-)":   [ "64.gif",          "money eyes"                                  ],
                  ":-\"":  [ "65.gif",          "whistling"                                   ],
                  "b-(":   [ "66.gif",          "feeling beat up"                             ],
                  ":)>-":  [ "67.gif",          "peace sign",           ":)&gt;-"             ],
                  "[-X":   [ "68.gif",          "shame on you"                                ],
                  "\\:D/": [ "69.gif",          "dancing"                                     ],
                  ">:/":   [ "70.gif",          "bring it on",          "&gt;:/"              ],
                  ";))":   [ "71.gif",          "hee hee"                                     ],
                  "o->":   [ "72.gif",          "hiro",                 "o-&gt;"              ],
                  "o=>":   [ "73.gif",          "billy",                "o=&gt;"              ],
                  "o-+":   [ "74.gif",          "april"                                       ],
                  "(%)":   [ "75.gif",          "yin yang"                                    ],
                  ":-@":   [ "76.gif",          "chatterbox"                                  ],
                  "^:)^":  [ "77.gif",          "not worthy"                                  ],
                  ":-j":   [ "78.gif",          "oh go on"                                    ],
                  "(*)":   [ "79.gif",          "star"                                        ],
                  ":)]":   [ "100.gif",         "on the phone"                                ],
                  ":-c":   [ "101.gif",         "call me"                                     ],
                  "~X(":   [ "102.gif",         "at wits' end"                                ],
                  ":-h":   [ "103.gif",         "wave"                                        ],
                  ":-t":   [ "104.gif",         "time out"                                    ],
                  "8->":   [ "105.gif",         "daydreaming",          "8-&gt;"              ],
                  ":-??":  [ "106.gif",         "I don't know"                                ],
                  "%-(":   [ "107.gif",         "not listening"                               ],
                  ":o3":   [ "108.gif",         "puppy dog eyes"                              ],
                  "X_X":   [ "109.gif",         "I don't want to see",  "x_x"                 ],
                  ":!!":   [ "110.gif",         "hurry up!"                                   ],
                  "\\m/":  [ "111.gif",         "rock on!"                                    ],
                  ":-q":   [ "112.gif",         "thumbs down"                                 ],
                  ":-bd":  [ "113.gif",         "thumbs up"                                   ],
                  "^#(^":  [ "114.gif",         "it wasn't me"                                ],
                  ":bz":   [ "115.gif",         "bee"                                         ],
                  ":ar!":  [ "pirate.gif",      "pirate"                                      ],
                  "[..]":  [ "transformer.gif", "transformer"                                 ]
                };
                emotify.emoticons('http://lou-bot.de/shared/emoticons/Yahoo.AdiumEmoticonset/', smilies);
              }
            }
          });

          qx.Class.define("V_BTweak.Inception", {
            type: "singleton",
            extend: qx.core.Object,
            construct: function (enabled) {
              this.base(arguments);
            },
            members: {
              init: function () {
                qx.core.Init.getApplication().chat._outputMsg = this.outputMsgIntercept;
                webfrontend.gui.Util._convertBBCode = webfrontend.gui.Util.convertBBCode;
                webfrontend.gui.Util.convertBBCode = this.convertBBCode;
              },
              convertBBCode: function (pq, pr, ps) {
                // place for various custom BBCodes
                if (!pr) {
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
                  pq = pq.replace(/\[img\](.*?)\[\/img\]/gi, '[url]$1[/url]');
                  pq = pq.replace(/\[img=([0-9]*?)x([0-9]*?)\](.*?)\[\/img\]/gi, '[url]$3[/url]');
                  pq = pq.replace(/\[url=([^\]]*?)\](.*?)\[\/url\]/gi, '[url]$1[/url]');
                  pq = pq.replace(/\[pre\]([\s\S]*?)\[\/pre\]/gi, '$1');
                }
                ar = emotify( pq );
                // fix wrong chat notify for empty string with emoticon
                ig = /^<img src="[^"]*" title="[^"]*" alt="" class="smiley" style="[^"]*"\/>$/gi;
                if(!pr && ig.test(ar))
                  ar = "&thinsp;" + ar;
                return webfrontend.gui.Util._convertBBCode(ar, pr, ps);
              },
              outputMsgIntercept: function (eY, fa, fb) {
                var t1 = /!v_b\.lou\.[a-zA-Z]*[\.]?.*/;
                var t2 = /!LoU\.[a-zA-Z]*/i;
                if (t1.test(eY) || t2.test(eY)) {
                  // hide v_b commands from chat
                  return;
                }
                this.__proto__._outputMsg.call(this, eY, fa, fb);
              }
            }
          });
          
          var bl  = '<table cellspacing="0"><tr><td style="max-width: 150px;">',
              bl2 = '<tr><th colspan="2">',
              bl3 = '<table cellspacing="0"><tr><td colspan="2">',
              bl4 = '<tr><td colspan="2">',
              bl5 = '<table cellspacing="0">',
              w   = "tnf:lawless city with castle",
              bf  = "tnf:lawless city without castle",
              T   = "</td><td></td></tr>",
              k   = "<tr><td>",
              kl  = '<tr><td colspan="2">',
              k2  = '<tr><td style="white-space: nowrap;">',
              hl  = "<hr>",
              F   = "tnf:points:",
              m   = '</td><td style="white-space: nowrap;">',
              m1  = "</td><td>",
              l   = "</td></tr>",
              l2  = "</th></tr>",
              j   = "</table>",
              
              //removed tipps
              o2  = "tnf:you can define the coloring in the world",
              P2  = "tnf:lou on this world",
              bd2 = "tnf:lou on another world",
              b2  = "tnf:double-click the city to switch to it",
              
              g = "tnf:regionmap city settle tp",
              f = "tnf:regionmap city siege tp",
              bo = "tnf:regionmap city attack tp",
              v = "tnf:regionmap city return tp",
              bj = "tnf:regionmap city support tp",
              bp = "tnf:regionmap city trade tp",
              
              //prepared tipps
              bo = "tnf:regionmap city support tp",
              v = "tnf:regionmap city return tp",
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
              ts = "TS";
          
          qx.Class.define("V_BTweak.Provider", {
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
              pollData: function (o) {
                this.Key = V_BTweak.Command.getInstance().getKey();
                if (this.Key == null) return;
                this.requestCounter ++;
                if (this.timeoutCounter >= 3 && this.requestCounter >= 15) this.timeoutCounter = 0;
                var url = EXTprovider + EXTendpoint;
                var req = new qx.io.remote.Request(url, "POST", "application/json");
                req.setProhibitCaching(false);
                req.setRequestHeader("Content-Type", "application/json"); 
                req.setCrossDomain(true);
                req.setTimeout(5000);
                req.setParameter("key", this.Key);
                if (o != null) {
                  var payload = JSON.stringify(o);
                  req.setData(payload);
                }
                req.addListener("completed", function(e) {
                  this.waitForResponse = false;
                  this.timeoutCounter = 0;
                  var data = e.getContent() || null;
                  this.lastPoll = new Date().getTime();
                  if (data.reqid && data.version == EXTdataversion) {
                    this.Data[data.continent.id] = data.continent;
                  }
                }, this);
                req.addListener("failed", function(e) {
                  this.waitForResponse = false;
                  this.requestCounter = 0;
                  this.timeoutCounter++;
                }, this);
                req.addListener("timeout", function(e) {
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
                return this.Data[c];
              },
            },
          });
          
          const units = {
            "1": {
              "en": "Cityguard",
              "de": "Stadtwächter",
            },
            "2": {
              "en": "Ballista",
              "de": "Balliste",
            },
            "3": {
              "en": "Ranger",
              "de": "Jäger",
            },
            "4": {
              "en": "Guardian",
              "de": "Pikenier",
            },
            "5": {
              "en": "Templar",
              "de": "Templer",
            },
            "6": {
              "en": "Berserker",
              "de": "Berserker",
            },
            "7": {
              "en": "Mage",
              "de": "Magier",
            },
            "8": {
              "en": "Scout",
              "de": "Kundschafter",
            },
            "9": {
              "en": "Crossbowman",
              "de": "Armbrustschütze",
            },
            "10": {
              "en": "Paladin",
              "de": "Paladin",
            },
            "11": {
              "en": "Knight",
              "de": "Ritter",
            },
            "12": {
              "en": "Warlock",
              "de": "Hexenmeister",
            },
            "13": {
              "en": "Ram",
              "de": "Rammbock",
            },
            "14": {
              "en": "Catapult",
              "de": "Katapult",
            },
            "15": {
              "en": "Fregate",
              "de": "Fregatte",
            },
            "16": {
              "en": "Slope",
              "de": "Schaluppe",
            },
            "17": {
              "en": "War Galleon",
              "de": "Kriegsgaleone",
            },
            "19": {
              "en": "Baron",
              "de": "Baron",
            },
          };
          
          const uts = {
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
            "19": 1,
          };
          
          const tytowe = {
            "1" : 0,  //undeath
            "2" : 3,  //ship wreck
            "3" : 4,  //hill
            "4" : 1,  //mountain
            "5" : 2,  //forest
            "6" : 2,  //boss forest/dragon
            "7" : 4,  //boss hill/moloch
            "8" : 1,  //boss mountain/hydra
            "12": 3,  //boss sea/octopus
          };

          const bkill = {
            "6": {    //  34, 200, 1360, 2640,  6640, 10000, 13600, 20000, 30000, 40000

              "t": [null, 50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000],
              "1": 0.67,
              "2": 1,
              "4": 1,
              "m": 1
            },
            "7": {    //  24, 143,  972, 1886, 4743,  7143,  9715, 14286, 21429, 28572

              "t": [null, 36, 215, 1429, 2858, 7143, 10715, 14286, 21429, 32143, 42858],
              "1": 1,
              "2": 1,
              "4": 0.67,
              "m": 1
            },
            "11": {   //  19, 112,  756, 1467, 3689, 5556,  7556, 11112, 16667, 22223

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
            },
          };
          
          const dkill = [15, 100,  340, 1400,  3000,  5500, 12500, 20000, 35000, 60000];
                
          
          qx.Class.define("V_BTweak.Tooltip", {
            type: 'singleton',
            extend: qx.core.Object,
            construct: function (enabled) {
              this.base(arguments);
            },
            members: {
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
                return V_BTweak.Tooltip._getBossTooltip(bT, bU, bV, bW, bX, bY);
              },
              getDungeonTooltip: function (cf, cg, ch, ci, cj, ck, cl, cm) {
                return V_BTweak.Tooltip._getDungeonTooltip(cf, cg, ch, ci, cj, ck, cl, cm);
              },
              getLawlessCityTooltip: function (ca, cb, cs, ct, cu, cv, cw) {
                var cc = webfrontend.data.Server.getInstance().getContinentFromCoords(cu & 0xFFFF, cu >> 16);
                var cd = V_BTweak.Provider.getInstance().getContiData(cc);
                return V_BTweak.Tooltip._getLawlessCityTooltip(ca, cb, cs, ct, cu, cv, cw, cd);
              },
              getFreeTooltip: function (cI, cJ, cK) {
                var cC = webfrontend.data.Server.getInstance().getContinentFromCoords(cI & 0xFFFF, cI >> 16);
                var cD = V_BTweak.Provider.getInstance().getContiData(cC);
                return V_BTweak.Tooltip._getFreeTooltip(cI, cJ, cK, cD);
              },
              getCityTooltip: function (bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ) {
                var bc = webfrontend.data.Server.getInstance().getContinentFromCoords(bD & 0xFFFF, bD >> 16);
                var bD2 = V_BTweak.Provider.getInstance().getContiData(bc);
                return V_BTweak.Tooltip._getCityTooltip(bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ, bD2);
              },
            },
            statics: {
              _getBossTooltip: function (bT, bU, bV, bW, bX, bY) {
                var cd = new qx.util.StringBuilder();
                var tip = webfrontend.gui.WorldMapHelper._getBossTooltip(bT, bU, bV, bW, bX, bY);
                var ca = webfrontend.res.Main.getInstance();
                var cb = webfrontend.data.Tech.getInstance()
                var weak = ca.attackTypes[tytowe[bT]].dn;
                //get research & bonus
                //bersis = 6
                var research6 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 6);
                var shrine6 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 6);
                var bonus6 = 1 + ((shrine6 + research6) / 100);
                //mages = 7
                var research7 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 7);
                var shrine7 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 7);
                var bonus7 = 1 + ((shrine7 + research7) / 100);
                //knights = 11
                var research11 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 11);
                var shrine11 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 11);
                var bonus11 = 1 + ((shrine11 + research11) / 100);
                //ships
                var research15 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 15);
                var shrine15 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 15);
                var bonus15 = 1 + ((shrine15 + research15) / 100);
                var research16 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 16);
                var shrine16 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 16);
                var bonus16 = 1 + ((shrine16 + research16) / 100);
                var research17 = cb.getBonus("unitDamage", webfrontend.data.Tech.research, 17);
                var shrine17 = cb.getBonus("unitDamage", webfrontend.data.Tech.shrine, 17);
                var bonus17 = 1 + ((shrine17 + research17) / 100);
                if (tytowe[bT] != 3) {
                  //get default ts bersis
                  var default_1 = parseInt(Math.ceil(bkill["6"][tytowe[bT]] * bkill["6"]["t"][bV]) / bonus6 * bkill["6"]["m"]);
                  var name_1 = ca.units["6"].dn;
                  var research_1 = shrine6 + research6;
                  //get default ts mages
                  var default_2 = parseInt(Math.ceil(bkill["7"][tytowe[bT]] * bkill["7"]["t"][bV]) / bonus7 * bkill["7"]["m"]);
                  var name_2 = ca.units["7"].dn;
                  var research_2 = shrine7 + research7;
                  //get default ts knights
                  var default_3 = parseInt(Math.ceil(bkill["11"][tytowe[bT]] * bkill["11"]["t"][bV]) / bonus11 * bkill["11"]["m"]);
                  var name_3 = ca.units["11"].dn;
                  var research_3 = shrine11 + research11;
                } else {
                  //get default ts ships
                  var default_1 = parseInt(Math.ceil(bkill["15"][tytowe[bT]] * bkill["15"]["t"][bV]) / bonus15 * bkill["11"]["m"]);
                  var name_1 = ca.units["15"].dn;
                  var research_1 = shrine15 + research15;
                  var default_2 = parseInt(Math.ceil(bkill["16"][tytowe[bT]] * bkill["16"]["t"][bV]) / bonus16 * bkill["11"]["m"]);
                  var name_2 = ca.units["16"].dn;
                  var research_2 = shrine16 + research16;
                  var default_3 = parseInt(Math.ceil(bkill["17"][tytowe[bT]] * bkill["17"]["t"][bV]) / bonus17 * bkill["11"]["m"]);
                  var name_3 = ca.units["17"].dn;
                  var research_3 = shrine17 + research17;
                }
                //round it
                var ts_1 = webfrontend.gui.Util.formatNumbers(this._roundup(default_1));
                var ts_2 = webfrontend.gui.Util.formatNumbers(this._roundup(default_2));
                var ts_3 = webfrontend.gui.Util.formatNumbers(this._roundup(default_3));
                cd.add(bl3);
                cd.add(tip.replace(new RegExp(n+n,"g"), h).replace(new RegExp("([a-zA-Z]{1,}\\.)\\s?([a-zA-Z]{1,})","g"), "$1<br>$2"));
                cd.add(l, k);
                V_BTweak.Tooltip._buildProcessHeadline(cd);
                cd.add(k, i18n('ext:weak') + p, m1, weak, l, k, name_1 + nb + p2 + research_1 + p3 + p, m1, ts_1 + nb + ts, l, k, name_2 + nb + p2 + research_2 + p3 + p, m1, ts_2 + nb + ts, l, k, name_3 + nb + p2 + research_3 + p3 + p, m1, ts_3 + nb + ts, l);
                cd.add(l, j);
                return cd.get();
              },
              _getDungeonTooltip: function (cf, cg, ch, ci, cj, ck, cl, cm) {
                var cq = new qx.util.StringBuilder();
                var tip = webfrontend.gui.WorldMapHelper._getDungeonTooltip(cf, cg, ch, ci, cj, ck, cl, cm);
                var cn = webfrontend.res.Main.getInstance();
                var weak = cn.attackTypes[tytowe[cg]].dn;
                var progress = parseInt((cj * 0.0175 + 1.0875) * dkill[parseInt(ci) - 1]);
                var progress_ts = webfrontend.gui.Util.formatNumbers(this._roundup(progress));
                var default_ts = webfrontend.gui.Util.formatNumbers(dkill[parseInt(ci) - 1]);
                cq.add(bl3);
                cq.add(tip.replace(new RegExp(n+n,"g"), h).replace(new RegExp("([a-zA-Z]{1,}\\.)\\s?([a-zA-Z]{1,})","g"), "$1<br>$2"));
                cq.add(l, k);
                V_BTweak.Tooltip._buildProcessHeadline(cq);
                cq.add(k, i18n('ext:weak') + p, m1, weak, l, k, i18n('ext:unit_ts') + p, m1, default_ts, l, k, ts + ' + ' + i18n('ext:progress') + p, m1, progress_ts , l);
                cq.add(l, j);
                return cq.get();
              },
              _getCityTooltip: function (bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ, bD2) {
                var bS = new qx.util.StringBuilder();
                var bM = qx.core.Init.getApplication();
                var tip = webfrontend.gui.WorldMapHelper._getCityTooltip(bu, bv, bw, name, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ);
                bS.add(bl3);
                // remove ore prepare tipps
                bS.add(tip.replace(new RegExp(bM.tr(o2),"m"), h).replace(new RegExp(bM.tr(P2),"m"), h).replace(new RegExp(bM.tr(bd2),"m"), h).replace(new RegExp(bM.tr(b2),"m"), h).replace(new RegExp(n+n,"g"), h).replace(new RegExp("([a-zA-Z]{1,}\\.)\\s?([a-zA-Z]{1,})","g"), "$1<br>$2"));
                bS.add(l, k);
                var pos = webfrontend.gui.Util.formatCoordinates(bD & 0xFFFF, bD >> 16);
                if (bD2 != null) {
                  V_BTweak.Tooltip._buildProcessHeadline(bS);
                  var pre = bS.get();
                  V_BTweak.Tooltip._buildSettlerTip(bS, bD2, pos);
                  V_BTweak.Tooltip._buildPriorTip(bS, bD2, pos);
                  V_BTweak.Tooltip._buildInfoTip(bS, bD2, pos);
                  V_BTweak.Tooltip._buildUnitsTip(bS, bD2, pos);
                  V_BTweak.Tooltip._buildProcessDataTip(bS, bD2);
                  if (pre == bS.get()) V_BTweak.Tooltip._buildEmptyDataTip(bS);                  
                } else {
                  V_BTweak.Tooltip._buildNoDataOrAccess(bS);
                }
                bS.add(l, j);
                return bS.get();
              },
              _getFreeTooltip: function (cI, cJ, cK, cD) {
                var cN = new qx.util.StringBuilder();
                var tip = webfrontend.gui.WorldMapHelper._getFreeTooltip(cI, cJ, cK);
                cN.add(bl3);
                // remove ore prepare tipps
                cN.add(tip.replace(new RegExp(n+n,"g"), h).replace(new RegExp("([a-zA-Z]{1,}\\.)\\s?([a-zA-Z]{1,})","g"), "$1<br>$2"));
                cN.add(l, k);
                var pos = webfrontend.gui.Util.formatCoordinates(cI & 0xFFFF, cI >> 16);
                if (cD != null) {
                  V_BTweak.Tooltip._buildProcessHeadline(cN);
                  V_BTweak.Tooltip._buildSettlerTip(cN, cD, pos);
                  V_BTweak.Tooltip._buildProcessDataTip(cN, cD);                 
                } else {
                  V_BTweak.Tooltip._buildNoDataOrAccess(cN);
                }
                cN.add(l, j);
                return cN.get();
              },
              _getLawlessCityTooltip: function (ca, cb, cs, ct, cu, cv, cw, cd) {
                var cy = new qx.util.StringBuilder();
                var tip = webfrontend.gui.WorldMapHelper._getLawlessCityTooltip(ca, cb, cs, ct, cu, cv, cw);
                cy.add(bl3);
                // remove ore prepare tipps
                cy.add(tip.replace(new RegExp(n+n,"g"), h).replace(new RegExp("([a-zA-Z]{1,}\\.)\\s?([a-zA-Z]{1,})","g"), "$1<br>$2"));
                cy.add(l, k);
                var pos = webfrontend.gui.Util.formatCoordinates(cu & 0xFFFF, cu >> 16);
                if (cd != null) {
                  V_BTweak.Tooltip._buildProcessHeadline(cy);
                  if (!ca) V_BTweak.Tooltip._buildSettlerTip(cy, cd, pos, true);
                  V_BTweak.Tooltip._buildPriorTip(cy, cd, pos);
                  V_BTweak.Tooltip._buildInfoTip(cy, cd, pos);
                  V_BTweak.Tooltip._buildUnitsTip(cy, cd, pos);
                  V_BTweak.Tooltip._buildProcessDataTip(cy, cd);                  
                } else {
                  V_BTweak.Tooltip._buildNoDataOrAccess(cy);
                }
                cy.add(l, j);
                return cy.get();
              },
              _buildNoDataOrAccess: function(br) {
                 br.add(bl3 + 'V_B Tools:' + m + nb + nb + nb + nb + nb + nb + nb + nb + nb + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_data_or_credentials')) + l);
              },
              _buildProcessHeadline: function(br) {
                 br.add(bl2 + 'V_B Tools: v' + EXTversion + l2 + kl + hl + l);
              },
              _buildProcessDataTip: function(br, bs) {
                if (isNaN(parseFloat(bs.id)) && isFinite(bs.id)) {
                  br.add(kl + webfrontend.gui.Util.convertBBCode(i18n('ext:process_data')) + l);
                }
              },
              _buildEmptyDataTip: function(br) {
                br.add(k + i18n('ext:info') + p);
                br.add(m + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_info')) + l);
              },
              _buildSettlerTip: function(br, bs, bk, bf) {
                if (bs.settler != null) {
                  if (bs.settler[bk] || bf) br.add(k + i18n('ext:settler') + p);
                  if (bs.settler[bk]) br.add(m + nb + bs.settler[bk].name + nb + i18n('ext:settle') + nb + i18n('ext:since') + p + nb + bs.settler[bk].time + 'h' + l);
                  else if (bf) br.add(m + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_settle')) + l);
                }
              },
              _buildPriorTip: function(br, bs, bk) {
                if (bs.prior != null && bs.prior[bk] && bs.prior[bk].name) {
                  br.add(k + i18n('ext:prior') + p);
                  br.add(m + nb + bs.prior[bk].name);
                  if (bs.prior[bk].alliance_name) br.add('[' + bs.prior[bk].alliance_name + ']');
                  br.add(l);
                }
              },
              _buildInfoTip: function(br, bs, bk) {
                if (bs.info != null) {
                  if (bs.info[bk]) {
                    br.add(k + i18n('ext:info') + p);
                    br.add(m + nb + webfrontend.gui.Util.convertBBCode(bs.info[bk].txt) + l);
                  } else {
                    br.add(k + i18n('ext:info') + p);
                    br.add(m + nb + webfrontend.gui.Util.convertBBCode(i18n('ext:no_info')) + l);
                  }
                }
              },
              _buildUnitsTip: function(br, bs, bk) {
                if (bs.units != null) {
                  if (bs.units[bk]) {
                    var locale = qx.locale.Manager.getInstance().getLocale();
                    bs.units[bk].forEach(function (u) {
                      br.add(k + units[u.type][locale] + p);
                      br.add(m + nb + webfrontend.gui.Util.formatNumbers(u.ts * uts[u.type]) + nb + ts + l);
                    });
                  } else  {
                  }
                }
              },
              //pads right
              _rpad: function(string, padString, length) {
                while (string.length < length)
                    string = string + padString;
                return string;
              },
              _roundup: function(number) {
                var one = "1";
                var fqp = Math.round(String(number).length/2);
                var tep = parseInt(this._rpad(one, "0", fqp));
                return Math.round(number/tep) * tep;
              }
            }            
          });
          
          qx.Class.define("V_BTweak.Chat", {
            type: "singleton",
            extend: qx.core.Object,
            construct: function (enabled) {
              this.base(arguments);
            },
            members: {
              init: function () {
                this.chat = webfrontend.data.Chat.getInstance();
                this.chat.addListener('newMessage', this.onNewMessage, this);
              },
              onNewMessage: function (e) {
                var eu = e.getData();
                if (eu.c == 'privatein' && eu.s == EXTbotname) {
                  var commands = V_BTweak.Command.getInstance();
                  var t = /^!v_b\.lou\.[a-zA-Z]*[\.]?.*/;
                  var p = /^!v_b\.lou\.Command\.([a-zA-Z]*) (.*)$/;
                  var d = /^!v_b\.lou\.Data\.([a-zA-Z]*) (.*)$/;
                  var r = /^!v_b\.lou\.Error\.([a-zA-Z]*) (.*)$/;
                  var pq = eu.m;
                  if (t.test(pq)) {
                    if ((commandParts = pq.match(p)) && commandParts.length == 3) {
                      var command = commandParts[1];
                      if (commands[command] != null) {
                        try {
                          // call command
                          var data = qx.lang.String.trim(commandParts[2]); // trimming input
                          if (commands[command](data, eu.s)) this.chat.addMsg('/whisper ' + eu.s + ' !LoU.Ok ' + command);
                        } catch (err) {
                          this.addChatMessage(i18n('ext:error_on_command') + ': ' + command, true);
                          debug(err);
                        }
                      }
                    }
                    else if ((errorParts = pq.match(r)) && errorParts.length == 3) {
                      this.addChatMessage(i18n('ext:error_message') + ': ' + errorParts[1] + '-' + commandParts[2], true);
                    }
                    else if ((dataParts = pq.match(d)) && dataParts.length == 3) {
                      debug(dataParts[2]);
                    }
                  }
                } else if (eu.c == 'privatein') {
                  var commands = V_BTweak.Command.getInstance();
                  var t = /^!LoU\.[a-zA-Z]*/i;
                  var p = /^!LoU\.([a-zA-Z]{2,})\s*(.*)$/i;
                  var pq = eu.m;
                  if (t.test(pq)) {
                    if ((commandParts = pq.match(p)) && commandParts.length >= 2) {
                      var command = commandParts[1].toLowerCase();
                      if (commands[command] != null) {
                        try {
                          // call command
                          var data = qx.lang.String.trim(commandParts[2]) || ""; // trimming input
                          if (commands[command](data.toLowerCase(), eu.s)) this.chat.addMsg('/whisper ' + eu.s + ' !LoU.Ok ' + command);
                        } catch (err) {
                          this.addChatMessage(i18n('ext:error_on_command') + ': ' + command, true);
                        }
                      } else this.chat.addMsg('/whisper ' + eu.s + ' !LoU.Error ' + command);
                    }
                  }
                }
              },
              addChatMessage: function (message, prefix) {
                var prefix = (prefix) ? 'V_B Tools: (' + V_BTweakVersion + ') ' : '';
                var eV = webfrontend.config.Config.getInstance().getChat();
                var eN = '<font size="' + eV.getFontSize() + '" color="' + eV.getChannelColor('Info') + '" style="word-wrap: break-word;">' + prefix + emotify( message ) + '</font>';
                if (eV.getTimeStamp()) {
                  var eO = webfrontend.data.ServerTime.getInstance();
                  var eU = eO.getServerStep();
                  if (eU) {
                    eN = '<font color="' + eV.getTimeStampColor() + '">' + webfrontend.Util.getDateTimeString(eO.getStepTime(eU), false, true) + ' ' + eN;
                  }
                }
                qx.core.Init.getApplication().chat._outputMsg(eN, 'SYSTEM', 7);
              }
            }
          });

          qx.Class.define("V_BTweak.Command", {
            type: "singleton",
            extend: qx.core.Object,
            construct: function (enabled) {
              this.base(arguments);
            },
            members: {
              commandKey: null,
              enabled: true,
              setEnable: function (enabled) {
                if (this.enabled == enabled) return;
                this.enabled = enabled;
                return false;
              },
              setKey: function (key) {
                if (this.commandKey == key) return true;
                if (key != '') {
                  this.commandKey = key;
                  V_BTweak.Main.getInstance().registerTick();
                  V_BTweak.Main.getInstance().setPanelState(true);
                  V_BTweak.Chat.getInstance().addChatMessage(i18n('ext:you_are_logged_in') + '!', true);
                  return true;
                } else {
                  this.commandKey = null;
                  V_BTweak.Main.getInstance().unRegisterTick();
                  V_BTweak.Main.getInstance().setPanelState(false);
                  V_BTweak.Chat.getInstance().addChatMessage(i18n('ext:login_failed') + '!', true);
                  return false;
                }
              },
              getKey: function () {
                return this.commandKey;
              },
              error: function (data, sender) {
                V_BTweak.Chat.getInstance().addChatMessage(i18n('ext:error_on_command') + ': ' + data.charAt(0).toUpperCase() + data.slice(1) + '@' + sender, true);
                return false;
              },
              ok: function (data, sender) {
                V_BTweak.Chat.getInstance().addChatMessage(i18n('ext:ok_message') + ': ' + data.charAt(0).toUpperCase() + data.slice(1) + '@' + sender, true);
                return false;
              },
              like: function (data, sender) {
                V_BTweak.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:like_message'));
                return true;
              },
              poke: function (data, sender) {
                V_BTweak.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:poke_message'));
                return true;
              },
              vote: function (data, sender) {
                V_BTweak.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:vote_message'));
                return true;
              },
              love: function (data, sender) {
                V_BTweak.Chat.getInstance().addChatMessage(i18n('ext:love_message'));
                return true;
              },
              slap: function (data, sender) {
                V_BTweak.Chat.getInstance().addChatMessage(i18n('ext:slap_message'));
                return true;
              },
            }
          });
          
          qx.Class.define("V_BTweak.ui.LeftPanel", {
            extend: qx.ui.container.Composite,
            construct: function (label) {
              this.base(arguments);
              this.stateIcon = new qx.ui.basic.Image('webfrontend/ui/icons/icon_alliance_grey_17.png').set({
                toolTipText: i18n('ext:offline'),
                width: 17, 
                height: 17, 
                scale: true
              });
              this.buildPanelUI(label);
            },
            members: {
              content: null,
              stateIcon: null,
              buildPanelUI: function (labelText) {
                this.setLayout(new qx.ui.layout.Canvas());
                this.set({
                  marginTop: 3,
                  marginBottom: 3
                });
                var bg = new qx.ui.basic.Image('webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_scaler.png').set({
                  width: 338,
                  scale: true,
                  allowGrowY: true
                });
                this.add(bg, {
                  left: 0,
                  top: 26
                });
                bg = new qx.ui.basic.Image('webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png');
                this.add(bg, {
                  left: 0,
                  top: 51
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
                  this.stateIcon.setSource('webfrontend/ui/icons/icon_alliance_green_17.png');
                  this.stateIcon.setToolTipText(i18n('ext:you_are_logged_in'));
                } else {
                  this.stateIcon.setSource('webfrontend/ui/icons/icon_alliance_red_17.png');
                  this.stateIcon.setToolTipText(i18n('ext:login_failed'));
                }
              }
            }
          });

          qx.Class.define("V_BTweak.ui.ExtraTools", {
            extend: V_BTweak.ui.LeftPanel,
            construct: function (title) {
              this.base(arguments, title);
              this.buildUI();
              qx.util.TimerManager.getInstance().start(function () {
                this.checkButtons();
              }, null, this, null, 1000 * 5);
            },
            statics: {
              getOrderList: function (filterFunc) {
                var activeCity = webfrontend.data.City.getInstance();
                var unitOrders = activeCity.getUnitOrders();
                var idList = [];
                if (unitOrders != null) {
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
                  return V_BTweak.ui.ExtraTools.canOrderBeCancelled(order) || (order.type == 8 && order.recurringType != 0);
                });
                V_BTweak.ui.ExtraTools.cancelOrders(orderList, callback, self);
              },
              cancelAllRaids: function (callback, self) {
                var orderList = this.getOrderList(function (order) {
                  return order.type == 8 && (order.recurringType != 0 || V_BTweak.ui.ExtraTools.canOrderBeCancelled(order));
                });

                V_BTweak.ui.ExtraTools.cancelOrders(orderList, callback, self);
              },
              canOrderBeCancelled: function (order) {
                var serverTime = webfrontend.data.ServerTime.getInstance();
                return (order.state != 2) && (order.start > serverTime.getServerStep() - 600);
              },
              getOrder: function (city, orderId) {
                var unitOrders = city.getUnitOrders();
                if (unitOrders != null) {
                  for (var i = 0; i < unitOrders.length; i++) {
                    if (unitOrders[i].id == orderId) {
                      return unitOrders[i];
                    }
                  }
                }
                return null;
              },
              cancelUnitOrder: function (orderId, callback, self) {
                var activeCity = webfrontend.data.City.getInstance();
                var order = this.getOrder(activeCity, orderId);
                if (order == null) {
                  throw new Error("Order not found");
                }
                if (!this.canOrderBeCancelled(order)) {
                  throw new Error("Order cannot be cancelled");
                }
                var command = "CancelUnitOrder";
                var request = {
                  cityid: activeCity.getId(),
                  id: orderId,
                  isDelayed: order.state == 0
                };
                var commandManager = webfrontend.net.CommandManager.getInstance();
                commandManager.sendCommand(command, request, null, function (unknown, ok) {
                  callback.call(self, ok ? null : new Error("Error executing " + command + " command"));
                });
              },
              cancelRaidOrder: function (orderId, callback, self) {
                var activeCity = webfrontend.data.City.getInstance();
                var order = this.getOrder(activeCity, orderId);
                if (order == null) {
                  throw new Error("Order not found");
                }
                if (order.type != 8) {
                  throw new Error("Order is not a raid");
                }
                var command = "UnitOrderSetRecurringOptions";
                var request = {
                  cityid: activeCity.getId(),
                  id: orderId,
                  isDelayed: order.state == 0,
                  recurringType: 0
                };
                var commandManager = webfrontend.net.CommandManager.getInstance();
                commandManager.sendCommand(command, request, null, function (unknown, ok) {
                  callback.call(self, ok ? null : new Error("Error executing " + command + " command"));
                });
              },
              cancelOrder: function (orderId, callback, self) {
                var activeCity = webfrontend.data.City.getInstance();
                var order = this.getOrder(activeCity, orderId);
                if (order == null) {
                  throw new Error("Order not found");
                }
                if (this.canOrderBeCancelled(order)) {
                  this.cancelUnitOrder(orderId, callback, self);
                } else {
                  if (order.type == 8) {
                    this.cancelRaidOrder(orderId, callback, self);
                  } else {
                    throw new Error("Order cannot be cancelled");
                  }
                }
              },
              cancelOrders: function (orderIdList, callback, self) {
                var that = this;
                var listCopy = [].concat(orderIdList);
                var delay = 0;
                var cancelFunc = function (err) {
                  if (err) {
                    callback.call(self, err);
                    return;
                  }
                  var orderId = listCopy.pop();
                  if (orderId) {
                    setTimeout(function () {
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
              cancelAllButton: null,
              cancelRaidsButton: null,
              scheduleButton: null,
              buildUI: function () {
                // Queue buttons (Thank you MousePak!)
                var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                var bmImage = new qx.ui.basic.Image('webfrontend/ui/icons/ministers/icon_build_minister_btn.png').set({
                  paddingTop: 3,
                  height: 17,
                  width: 27,
                  scale:true
                });
                bmImage.setToolTipText(i18n('ext:if_bm_available'));
                row.add(bmImage);
                
                // fillQueueButton
                this.fillQueueButton = new qx.ui.form.Button(i18n('ext:fill_build_queue')).set({
                  width: 96,
                  appearance: "button-text-small",
                  toolTipText: i18n('ext:fill_build_queue')
                });
                this.fillQueueButton.addListener("execute", this.fillBuildingQueue, this);
                row.add(this.fillQueueButton, {top: 0, left: 32});
                this.fillQueueButton.setEnabled(false);
                
                // payQueueButton
                this.payQueueButton = new qx.ui.form.Button(i18n('ext:convert_all_builds')).set({
                  width: 104,
                  appearance: "button-text-small",
                  toolTipText: i18n('ext:convert_all_builds')
                });
                this.payQueueButton.addListener("execute", this.payBuildingQueue, this);
                row.add(this.payQueueButton);
                this.payQueueButton.setEnabled(false);
                
                // Spacer
                row.add(new qx.ui.core.Widget().set({
                  height: 0
                }), {
                  flex: 1
                });

                // infoButton
                var infoButton = new qx.ui.form.Button("?").set({
                  width: 25,
                  appearance: "button-text-small",
                  toolTipText: i18n('ext:licence_info')
                });
                infoButton.addListener("execute", this.showHelp, this);
                row.add(infoButton);

                this.addContent(row, {top: 3, left: 0});
                // Cancel order buttons (Thank you ventrix!)
                var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                var wmImage = new qx.ui.basic.Image('webfrontend/ui/icons/ministers/icon_war_minister_btn.png').set({
                  paddingTop: 3,
                  paddingRight: 6,
                  height: 17,
                  width: 27,
                  scale:true
                });
                
                wmImage.setToolTipText(i18n('ext:if_wm_available'));
                row.add(wmImage);
                
                // cancelAllButton
                this.cancelAllButton = new qx.ui.form.Button(i18n('ext:cancel_all_orders')).set({
                  width: 96,
                  appearance: "button-text-small",
                  toolTipText: i18n('ext:cancel_all_orders')
                });
                this.cancelAllButton.addListener("execute", this.cancelAllOrders, this);
                row.add(this.cancelAllButton, {top: 0, left: 32});
                this.cancelAllButton.setEnabled(false);
                
                // cancelRaidsButton
                this.cancelRaidsButton = new qx.ui.form.Button(i18n('ext:cancel_raid_orders')).set({
                  width: 104,
                  appearance: "button-text-small",
                  toolTipText: i18n('ext:cancel_raid_orders')
                });
                this.cancelRaidsButton.addListener("execute", this.cancelRaidOrders, this);
                row.add(this.cancelRaidsButton);
                this.cancelRaidsButton.setEnabled(false);
                
                // Spacer
                row.add(new qx.ui.core.Widget().set({
                  height: 0
                }), {
                  flex: 1
                });
                
                // scheduleButton
                this.scheduleButton = new qx.ui.form.Button('\u267a').set({
                  width: 25,
                  appearance: "button-text-small",
                  toolTipText: i18n('ext:schedule_raid_orders')
                });
                this.scheduleButton.addListener("execute", this.scheduleRaidOrders, this);
                row.add(this.scheduleButton);
                this.scheduleButton.setEnabled(false);
                this.addContent(row, {top: 30, left: 0});
              },
              scheduleRaidOrders: function () {
                var dialog = V_BTweak.ui.ReturnByWindow.getInstance();
                dialog.center();
                dialog.show();
              },
              cancelAllOrders: function () {
                this.cancelAllButton.setEnabled(false);
                this.self(arguments).cancelAll(function (err) {
                  this.cancelAllButton.setEnabled(true);
                  if (err) debug(err);
                }, this);
              },
              cancelRaidOrders: function () {
                this.cancelRaidsButton.setEnabled(false);
                this.self(arguments).cancelAllRaids(function (err) {
                  this.cancelRaidsButton.setEnabled(true);
                  if (err) debug(err);
                }, this);
              },
              fillBuildingQueue: function () {
                var activeCity = webfrontend.data.City.getInstance();
                webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueueFill", {
                  cityid: activeCity.getId()
                }, null, function () {});
              },
              payBuildingQueue: function () {
                var activeCity = webfrontend.data.City.getInstance();
                webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueuePayAll", {
                  cityid: activeCity.getId()
                }, null, function () {});
              },
              showHelp: function () {
                var dialog = V_BTweak.ui.AboutWindow.getInstance();
                dialog.center();
                dialog.show();
              },
              checkButtons: function () {
                this.fillQueueButton.setEnabled(V_BTweak.Main.getInstance().ministerPresent.BuildMinister);
                this.payQueueButton.setEnabled(V_BTweak.Main.getInstance().ministerPresent.BuildMinister);
                this.cancelAllButton.setEnabled(V_BTweak.Main.getInstance().ministerPresent.MilitaryMinister);
                this.cancelRaidsButton.setEnabled(V_BTweak.Main.getInstance().ministerPresent.MilitaryMinister);
                this.scheduleButton.setEnabled(V_BTweak.Main.getInstance().ministerPresent.MilitaryMinister);
                qx.util.TimerManager.getInstance().start(function () {
                  this.checkButtons();
                }, null, this, null, 1000 * 60);
              }
            }
          });
          
          qx.Class.define("V_BTweak.ui.TimePicker", {
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
              buildUI: function (caption) {
                var app = qx.core.Init.getApplication();
                this.setLayout(new qx.ui.layout.HBox(5));
                if (caption != null) {
                  var captionLabel = new qx.ui.basic.Label(caption);
                  captionLabel.set({
                    allowGrowX: false,
                    font: "bold",
                    paddingTop: 3
                  });
                  captionLabel.setTextAlign('left');
                  this.add(captionLabel);
                  this.add(new qx.ui.core.Widget().set({
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
                var gameNow = webfrontend.Util.getCurrentTime().getTime();
                var totalDaysNow = Math.floor(gameNow / (24 * 3600 * 1000));
                var totalDaysValue = Math.floor(value.getTime() / (24 * 3600 * 1000));
                var daysOffset = totalDaysValue - totalDaysNow;
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
                var hours = Number(this._hourText.getValue());
                var minutes = Number(this._minuteText.getValue());
                var seconds = Number(this._secondText.getValue());
                var dayValue = this._dateSelect.getSelection()[0].getModel();
                var dateOffset = Number(dayValue);
                var gameNow = webfrontend.Util.getCurrentTime().getTime();
                gameNow += dateOffset * 24 * 3600 * 1000;
                var date = new Date(gameNow);
                date.setUTCHours(hours);
                date.setUTCMinutes(minutes);
                date.setUTCSeconds(seconds);
                date.setUTCMilliseconds(0);
                try {
                  this._updatingValue = true;
                  this.setValue(date);
                } finally {
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
                    if (String(num) != e.getData()) {
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
                    if (String(num) != e.getData()) {
                      e.stopPropagation();
                      this.setValue(String(num));
                    }
                  }
                }
              }
            }
          });
      
          qx.Class.define("V_BTweak.ui.ReturnByWindow", {
            type: "singleton",
            extend: qx.ui.window.Window,
            construct: function () {
              this.base(arguments, i18n('ext:schedule_raid_orders'));
              this.buildUI();
            },
            members: {
              _returnTime: null,
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
                this._returnTime = new V_BTweak.ui.TimePicker(i18n("ext:return_time"));
                this.add(this._returnTime);
                var firstRow = new qx.ui.container.Composite();
                firstRow.setLayout(new qx.ui.layout.HBox());
                this.add(firstRow);
                var applyButton = new qx.ui.form.Button(i18n("ext:apply")).set({
                  appearance: "button-text-small",
                  toolTipText: i18n('ext:apply_tooltip')
                });
                applyButton.addListener("execute", this.returnRaidsBy, this);
                firstRow.add(applyButton);
                firstRow.add(new qx.ui.core.Widget().set({
                  height: 0
                }), {
                  flex: 1
                });
                var closeButton = new qx.ui.form.Button(i18n("ext:close")).set({
                  appearance: "button-text-small"
                });
                closeButton.addListener("execute", this.hide, this);
                firstRow.add(closeButton);
              },
              returnRaidsBy: function () {
                var returnBy = this._returnTime.getValue().getTime();
                var st = webfrontend.data.ServerTime.getInstance();
                var serverStep = st.getServerStep();
                var gameNow = webfrontend.Util.getCurrentTime().getTime();
                var delta = Math.floor((returnBy - gameNow) / 1000) + 1;
                returnBy = serverStep + delta;
                var currRecurrType = 2;
                var orders = webfrontend.data.City.getInstance().unitOrders;
                for (var i in orders) {
                  if (orders[i].type == 8) {
                    webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", {
                      cityid: webfrontend.data.City.getInstance().getId(),
                      id: orders[i].id,
                      isDelayed: orders[i].isDelayed,
                      recurringType: currRecurrType,
                      recurringEndStep: (returnBy)
                    }, null, function () {});
                  }
                }
                this.hide();
              },
            }
          });

          qx.Class.define("V_BTweak.ui.AboutWindow", {
            type: "singleton",
            extend: qx.ui.window.Window,
            construct: function () {
              this.base(arguments, 'V_B Tools v' + EXTversion);
              this.buildUI();

              // Refresh dev info every time
              this.addListener("appear", this.loadDeveloperInfo, this);
            },
            members: {
              _developerInfoText: null,
              _player: null,

              getPlayerData: function () {
                var player = webfrontend.data.Player.getInstance();
                var server = webfrontend.data.Server.getInstance();

                var _player = {
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
                var licenseLabel = new qx.ui.basic.Label("License").set({
                  font: "bold"
                });
                this.add(licenseLabel);

                var license = "V_B Tools - GreaseMonkey script for Lord of Ultima™";
                license += "\nCopyright © 2012 " + EXTauthors;
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
                var devInfoLabel = new qx.ui.basic.Label("Developer Info").set({
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
                var output = 'Session ID: ' + webfrontend.net.CommandManager.getInstance().getInstanceGuid() + '\n';
                output += 'City ID: ' + webfrontend.data.City.getInstance().getId() + '\n';
                output += 'Player ID: ' + this._player.id + '\n';
                output += 'Player Name: ' + this._player.name + '\n';
                output += 'Player ExT: ' + this._player.version + '\n';
                this._developerInfoText.setValue(output);
                this._developerInfoText.selectAllText();
              }
            }
          });

          // GPL header - I put this here out of way, even that its used in the code above
          var GPL = "This program is free software: you can redistribute it and/or modify" + " it under the terms of the GNU General Public License as published by" + " the Free Software Foundation, either version 3 of the License, or" + " (at your option) any later version." + "\n\n" + "This program is distributed in the hope that it will be useful," + " but WITHOUT ANY WARRANTY; without even the implied warranty of" + " MERCHANTABILITY or FITNESS FOR A EXTRTICULAR PURPOSE.  See the" + " GNU General Public License for more details." + "\n\n" + "You should have received a copy of the GNU General Public License" + " along with this program. If not, see http://www.gnu.org/licenses/.";
        };

      /* startup script to launch the tweak */
      var startup = function () {
          if (typeof qx == 'undefined') {
            window.setTimeout(startup, 1000);
          } else {
            if (checkDependencies()) {
              if (!startup.initialized) {
                startup.initialized = true;
                createTweak();
                V_BTweak.Main.getInstance().initialize();
              }
            } else {
              window.setTimeout(startup, 2000);
            }
          }
        };

      window.setTimeout(startup, 1000);
    };

  function debug(e) {
    if (window.console && typeof console.log == "function") {
      console.log('V_BTweak: ' + e);
    }
  }
  
  /* inject this script into the website */
  function inject() {
    debug('Injecting script');
    var script = document.createElement("script");
    txt = main.toString();
    if (window.opera != undefined) txt = txt.replace(/</g, "<");
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  if (/lordofultima\.com/i.test(document.domain)) inject();

})();
