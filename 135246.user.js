// ==UserScript==
// @name   LoUBBCode extend | 76s Edit
// @description  Adds extra functionality to Lord of Ultima chat
// @namespace   LoUBBCode 
// @include   http://prodgame*.lordofultima.com/*/index.aspx*
// @version   1.5.0
// @require   http://sizzlemctwizzle.com/updater.php?id=134067&days=1
// ==/UserScript==
(function () {
  /*
   * Changelog
   * 07/16/2012
   * 1.0   - initial
   * 1.1   - fix dependency
   * 1.2   - fix sample onNewMessage injection
   * 1.3   - add [pre] - Text in a pre element is displayed in a fixed-width 
   * 1.3.1 - fix [pre] to match any character including newlines 
   * 1.4   - add social gadjets 
   * 1.4.1 - add version to greeting
   * 1.4.2 - fix hide Error message
   * 1.4.3 - fix wrong chat notify for empty string with emoticon   
   * 1.4.4 - minor fix, add some shortcuts and fix the devil ;)   
   * 1.5   - clear up code with JSLint
   */
  var main = function () {
      var LoUBBCodeVersion = '1.5.0';

      function checkDependencies() {
        var dependencies = [
          webfrontend.config.Config.getInstance().getChat(),
          qx.core.Init.getApplication().chat],
          i = dependencies.length,
          checkPoint = true;
        // check (in)dependencies
        while (i--) {
          if (!dependencies[i]) {
            checkPoint = false;
          }
        }
        return checkPoint;
      }
      /*
       * @language
       * i18 language support
       */
      var DefaultLang = "DE",
        LocalizedStrings = {
          "en": {
            "ext:error_on_command": "Failed to run command",
            "ext:error_message": "Error",
            "ext:ok_message": "Successfully ",
            "ext:like_message": " like you :x",
          "ext:poke_message" : " poke you <:-P",
          "ext:vote_message" : " vote you :-bd",
          "ext:love_message" : "Someone love you @};-",
          "ext:slap_message" : "Someone slap you D*",
          "ext:kiss_message" : "Someone kissed you :-**-:",
          "ext:frki_message" : "Someone gave you a big wet kiss as45dr34eth67jxcv678yu34879"
        },
        "de" : {
          "ext:error_on_command" : "Fehler beim ausführen von",
          "ext:error_message" : "Fehler",
          "ext:ok_message" : "Erfolgreich ",
          "ext:like_message" : " mag Dich :x",
          "ext:poke_message" : " stubst Dich an <:-P",
          "ext:vote_message" : " votet Dich :-bd",
          "ext:love_message" : "Jemand mag Dich @};-",
          "ext:slap_message" : "Jemand slapt Dich :-q",
          "ext:kiss_message" : "Someone kissed you :-**-:",
          "ext:frki_message" : "Someone gave you a big wet kiss as45dr34eth67jxcv678yu34879"
          }
        };

      function i18n(messageId) {
        var locale = qx.locale.Manager.getInstance().getLocale(),
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
            title = (title + ', ' + smiley).replace(/"/g, '&quot;').replace(/</g, '&lt;');
            return '<img src="' + img + '" title="' + title + '" alt="" class="smiley" style="vertical-align: -20%;"/>';
          };
          return txt.replace(EMOTICON_RE, function (a, b, text) {
            var i = 0,
              smiley = text,
              e = emoticons[text];
            // If smiley matches on manual regexp, reverse-lookup the smiley.
            if (!e) {
              while (i < lookup.length && !lookup[i].regexp.test(text)) {
                i = i + 1;
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
              alts = emoticons[e].slice(2).concat(e);
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
          qx.Class.define("LoUBBCode.main", {
            // let's create a new instance for EXT additional tweaks.
            type: "singleton",
            extend: qx.core.Object,
            members: {
              initialize: function () {
                this.inception();
                this.hijackMessage();
                this.emotifyIcons();
                LoUBBCode.Chat.getInstance().addChatMessage(' 76s Edit initialized! x:)', true);
              },
              inception: function () {
                LoUBBCode.Inception.getInstance().init();
              },
              hijackMessage: function () {
                LoUBBCode.Chat.getInstance().init();
              },
              emotifyIcons: function () {
                var smilies = {
                  "jwimps76" : ["jwimps.gif", "JWIMPS"],
                  ">:)" : ["19.gif", "Devil", ">:-)", "&gt;:-)", "&gt;:)"],
                  ":||" : ["aloof-and-bored.gif", "bored", ":-||"],
                  "*bandit*" : ["bandit.gif", "bandit"],
                  ":)*" : ["cheek-kiss.gif",          "kiss on cheeks",         ":-)*"  ],
                  ">=)" :   [ "devil.gif",          "Devil",         ">=-)", "&gt;=-)", "&gt;=)"  ],
                  ":-**-:" :   [ "kiss.gif",          "kiss each other",         ":**:"  ],
                  "D|":   ["headbang.gif",          "headbang",         "D-|"  ],
                  "(_|_)": [ "mooning.gif",          "A55"  ],
                  "[]*": [ "photographer.gif",          "click"  ],
                  "*swear*" :   [ "swear.gif",          "swear"  ],
                  ":oo:": [ "vogliosa.gif",          "making love",         ":-oo-:", "xoxo"  ],
                  ":0": [ "yikes.gif",          "Yikes!",         ":-0"  ],
                  "*alien*" :   [ "alien.gif",          "Alien"  ],
                  "*C*":   ["celebrate.gif",          "Celebrate!"  ],
                  "*CG*":   ["cheergirl.gif",          "Cheergirl"  ],
                  ":^^:":   ["cheers.gif",          "Cheers!"  ],
                  "O.o":   ["confused.gif",          "Confused!"  ],
                  "==x(": [ "dont-make-me-angry.gif",          "Dont mess with me!"  ],
                  ":#)": [ "drunk.gif",          "Drunk"  ],
                  "\\^/" :   [ "dual-armed.gif",          "Dual Armed"  ],
                  "\\^/=" :   [ "dual-guns.gif",          "Shooting"  ],
                  ":(#)": [ "eating.gif",          "Eating"  ],
                  "x:)": [ "evil-smile.gif",          "Evil Smile"  ],
                  "*fail*" :   [ "fail.gif",          "Fail"  ],
                  "*GP*": [ "good-post.gif",          "Good Post!"  ],
                  ":]": [ "gymnastic.gif",          "Gymnastic"  ],
                  "*heart*" :   [ "heart.gif",          "Heart"  ],
                  ":(0)": [ "hungry.gif",          "Hungry"  ],
                  "*sorry*" :   [ "im-sorry.gif",          "Sorry!"  ],
                  "*KO*": [ "lost.gif",          "Knocked Out!"  ],
                  "*NG*": [ "not-good.gif",          "Not Good"  ],
                  "*please*" :   [ "please.gif",          "Please"  ],
                  "P-)":   ["popular.gif",          "Popular"  ],
                  "*RBR*": [ "run-baby-run.gif",          "Run baby, Run!"  ],
                  ":(X)": [ "shut-up.gif",          "Shut Up!"  ],
                  "D*": [ "slap.gif",          "Slap!"  ],
                  "()S()" :   [ "spydey-necklace.gif",          "Everyone knows it!"],
                  ":--:": [ "sword-fighting.gif",          "Fighting"  ],
                  "*TC*": [ "thread-closed.gif",          "Thread Closed"  ],
                  "m|": [ "thumbs-up.gif",          "Like!"  ],
                  "*zerks*" :   [ "zerks.gif",          "Zerks"  ],
                  "*TV*": [ "tv.gif",          "Watching TV"  ],
                  "*W*": [ "wanted.gif",          "Wanted"  ],
                  ":0": [ "yikes.gif",          "Yikes!",         ":-0"  ],
                  ":)": [ "1.gif", "happy",   ":-)", "*g", "*g*", "*G", "*G*"    ],
                  ":(":    [ "2.gif", "sad",                  ":-(", ":/"           ],
                  ";)":    [ "3.gif", "winking",              ";-)"                 ],
                  ":D":    [ "4.gif", "big grin", "xD", ":-D", "*gg*", "gg", "GG", "*GG*"],
                  ";;)":   [ "5.gif", "batting eyelashes"                           ],
                  ">:D<":  [ "6.gif", "big hug", "&gt;:D&lt;", ":DD", "xDD"         ],
                  ":-/":   [ "7.gif", "confused",             ":/"                  ],
                  ":x":    [ "8.gif", "love struck",          ":X"                  ],
                  ":\">":  [ "9.gif", "blushing",             ":\"&gt;"             ],
                  ":P":    [ "10.gif", "tongue",               ":p", ":-p", ":-P"    ],
                  ":-*":   [ "11.gif", "kiss",                 ":*"                  ],
                  "=((":   [ "12.gif", "broken heart"                                ],
                  ":-O":   [ "13.gif", "surprise",             ":O", "*huh*"         ],
                  "X(":    [ "14.gif", "angry"                                       ],
                  ":>":    [ "15.gif", "smug",                 ":&gt;"               ],
                  "B-)":   [ "16.gif", "cool"                                        ],
                  ":-S":   [ "17.gif", "worried"                                     ],
                  "#:-S":  [ "18.gif", "whew!",                "#:-s"                ],
                  ":((":   [ "20.gif", "crying",               ":-((", ":'(", ":'-(" ],
                  ":))":   [ "21.gif", "laughing",             ":-))"                ],
                  ":|":    [ "22.gif", "straight face",        ":-|"                 ],
                  "/:)":   [ "23.gif", "raised eyebrow",       "/:-)"                ],
                  "=))":   [ "24.gif", "rolling on the floor"                        ],
                  "O:-)":  [ "25.gif", "angel",                "O:)"                 ],
                  ":-B":   [ "26.gif", "nerd"                                        ],
                  "=;":    [ "27.gif", "talk to the hand"                            ],
                  "I-)":   [ "28.gif", "sleepy"                                      ],
                  "8-|":   [ "29.gif", "rolling eyes"                                ],
                  "L-)":   [ "30.gif", "loser"                                       ],
                  ":-&":   [ "31.gif", "sick"                                        ],
                  ":-$":   [ "32.gif", "don't tell anyone"                           ],
                  "[-(":   [ "33.gif", "not talking"                                 ],
                  ":O)":   [ "34.gif", "clown"                                       ],
                  "8-}":   [ "35.gif", "silly"                                       ],
                  "<:-P":  [ "36.gif", "party", "<:-p", "&lt;:-P", "&lt;:-p"         ],
                  "(:|":   [ "37.gif", "yawn"                                        ],
                  "=P~":   [ "38.gif", "drooling"                                    ],
                  ":-?":   [ "39.gif", "thinking"                                    ],
                  "#-o":   [ "40.gif", "d'oh",                 "#-O"                 ],
                  "=D>":   [ "41.gif", "applause",             "=D&gt;"              ],
                  ":-SS":  [ "42.gif", "nailbiting",           ":-ss"                ],
                  "@-)":   [ "43.gif", "hypnotized"                                  ],
                  ":^o":   [ "44.gif", "liar"                                        ],
                  ":-w":   [ "45.gif", "waiting",              ":-W"                 ],
                  ":-<":   [ "46.gif", "sigh",                 ":-&lt;"              ],
                  ">:P":   [ "47.gif", "phbbbbt", ">:p", "&gt;:P", "&gt;:p"          ],
                  "<):)":  [ "48.gif", "cowboy", "&lt;):)"                           ],
                  ":@)":   [ "49.gif", "pig"                                         ],
                  "3:-O":  [ "50.gif", "cow",                  "3:-o"                ],
                  ":(|)":  [ "51.gif", "monkey"                                      ],
                  "~:>":   [ "52.gif", "chicken",              "~:&gt;"              ],
                  "@};-":  [ "53.gif", "rose"                                        ],
                  "%%-":   [ "54.gif", "good luck"                                   ],
                  "(~~)":  [ "56.gif", "pumpkin"                                     ],
                  "~O)":   [ "57.gif", "coffee"                                      ],
                  "*-:)":  [ "58.gif", "idea"                                        ],
                  "8-X":   [ "59.gif", "skull"                                       ],
                  "=:)":   [ "60.gif", "bug"                                         ],
                  ">-)":   [ "61.gif", "alien",                "&gt;-)"              ],
                  ":-L":   [ "62.gif", "frustrated",           ":L"                  ],
                  "[-O<":  [ "63.gif", "praying",              "[-O&lt;"             ],
                  "$-)":   [ "64.gif", "money eyes"                                  ],
                  ":-\"":  [ "65.gif", "whistling"                                   ],
                  "b-(":   [ "66.gif", "feeling beat up"                             ],
                  ":)>-":  [ "67.gif", "peace sign",           ":)&gt;-"             ],
                  "[-X":   [ "68.gif", "shame on you"                                ],
                  "\\:D/": [ "69.gif", "dancing"                                     ],
                  ">:/":   [ "70.gif", "bring it on",          "&gt;:/"              ],
                  ";))":   [ "71.gif", "hee hee"                                     ],
                  "o->":   [ "72.gif", "hiro",                 "o-&gt;"              ],
                  "o=>":   [ "73.gif", "billy",                "o=&gt;"              ],
                  "o-+":   [ "74.gif", "april"                                       ],
                  "(%)":   [ "75.gif", "yin yang"                                    ],
                  ":-@":   [ "76.gif", "chatterbox"                                  ],
                  "^:)^":  [ "77.gif", "not worthy"                                  ],
                  ":-j":   [ "78.gif", "oh go on"                                    ],
                  "(*)":   [ "79.gif", "star"                                        ],
                  ":)]":   [ "100.gif", "on the phone"                                ],
                  ":-c":   [ "101.gif", "call me"                                     ],
                  "~X(":   [ "102.gif", "at wits' end"                                ],
                  ":-h":   [ "103.gif", "wave"                                        ],
                  ":-t":   [ "104.gif", "time out"                                    ],
                  "8->":   [ "105.gif", "daydreaming",          "8-&gt;"              ],
                  ":-??":  [ "106.gif", "I don't know"                                ],
                  "%-(":   [ "107.gif", "not listening"                               ],
                  ":o3":   [ "108.gif", "puppy dog eyes"                              ],
                  "X_X":   [ "109.gif", "I don't want to see",  "x_x"                 ],
                  ":!!":   [ "110.gif", "hurry up!"                                   ],
                  "\\m/":  [ "111.gif", "rock on!"                                    ],
                  ":-q":   [ "112.gif", "thumbs down"                                 ],
                  ":-bd":  [ "113.gif", "thumbs up"                                   ],
                  "^#(^":  [ "114.gif", "it wasn't me"                                ],
                  "as45dr34eth67jxcv678yu34879": ["frki.gif", "Big Wet Kiss"],
                  ":bz":   [ "115.gif", "bee"                                         ],
                  ":ar!":  [ "pirate.gif", "pirate"                                      ],
                  "[..]":  [ "transformer.gif",                                  ]
                };
                emotify.emoticons('http://lou-emotes.comeze.com/emoticons/', smilies);
              }
            }
          });
          qx.Class.define("LoUBBCode.Inception", {
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
                var ar, ig;
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
                ar = emotify(pq);
                // fix wrong chat notify for empty string with emoticon
                ig = /^<img src="[^"]*" title="[^"]*" alt="" class="smiley" style="[^"]*"\/>$/gi;
                if (!pr && ig.test(ar)) {
                  ar = "&thinsp;" + ar;
                }
                return webfrontend.gui.Util._convertBBCode(ar, pr, ps);
              },
              outputMsgIntercept: function (eY, fa, fb) {
                var t = /!LoU\.[a-zA-Z]*/i,
                  p = '__proto__';
                if (t.test(eY)) {
                  // hide custom output from chat
                  return;
                }
                this[p]._outputMsg.call(this, eY, fa, fb);
              }
            }
          });
          qx.Class.define("LoUBBCode.Chat", {
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
              chat: null,
              onNewMessage: function (e) {
                var eu = e.getData(),
                  commands, data, command, t = /^!LoU\.[a-zA-Z]*/i,
                  p = /^!LoU\.([a-zA-Z]{2,})\s*(.*)$/i,
                  commandParts, pq;
                if (eu.c === 'privatein') {
                  commands = LoUBBCode.Command.getInstance();
                  pq = eu.m;
                  if (t.test(pq)) {
                    commandParts = pq.match(p);
                    if (commandParts.length >= 2) {
                      command = commandParts[1].toLowerCase();
                      if (typeof commands[command] !== null) {
                        try {
                          // call command
                          data = qx.lang.String.trim(commandParts[2]) || ""; // trimming input
                          if (commands[command](data.toLowerCase(), eu.s)) {
                            this.chat.addMsg('/whisper ' + eu.s + ' !LoU.Ok ' + command);
                          }
                        } catch (err) {
                          this.addChatMessage(i18n('ext:error_on_command') + ': ' + command, true);
                        }
                      } else {
                        this.chat.addMsg('/whisper ' + eu.s + ' !LoU.Error ' + command);
                      }
                    }
                  }
                }
              },
              addChatMessage: function (message, prefix) {
                prefix = (prefix) ? 'LoUBBCode: (' + LoUBBCodeVersion + ') ' : '';
                var eV = webfrontend.config.Config.getInstance().getChat(),
                  eN = '<font size="' + eV.getFontSize() + '" color="' + eV.getChannelColor('Info') + '" style="word-wrap: break-word;">' + prefix + emotify(message) + '</font>',
                  eO, eU;
                if (eV.getTimeStamp()) {
                  eO = webfrontend.data.ServerTime.getInstance();
                  eU = eO.getServerStep();
                  if (eU) {
                    eN = '<font color="' + eV.getTimeStampColor() + '">' + webfrontend.Util.getDateTimeString(eO.getStepTime(eU), false, true) + ' ' + eN;
                  }
                }
                qx.core.Init.getApplication().chat._outputMsg(eN, 'SYSTEM', 7);
              }
            }
          });
          qx.Class.define("LoUBBCode.Command", {
            type: "singleton",
            extend: qx.core.Object,
            construct: function (enabled) {
              this.base(arguments);
            },
            members: {
              enabled: true,
              error: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage(i18n('ext:error_on_command') + ': ' + data.charAt(0).toUpperCase() + data.slice(1) + '@' + sender, true);
                return false;
              },
              ok: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage(i18n('ext:ok_message') + ': ' + data.charAt(0).toUpperCase() + data.slice(1) + '@' + sender, true);
                return false;
              },
              like: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:like_message'));
                return true;
              },
              poke: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:poke_message'));
                return true;
              },
              vote: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:vote_message'));
                return true;
              },
              love: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage(i18n('ext:love_message'));
                return true;
              },
              kiss: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage(i18n('ext:kiss_message'));
                return true;
              },
              frki: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage(i18n('ext:frki_message'));
                return true;
              },
              slap: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage(i18n('ext:slap_message'));
                return true;
              }
            }
          });
          /* GPL header - I put this here out of way, even that its used in the code above or not */
          // var GPL = "This program is free software: you can redistribute it and/or modify" + " it under the terms of the GNU General Public License as published by" + " the Free Software Foundation, either version 3 of the License, or" + " (at your option) any later version." + "\n\n" + "This program is distributed in the hope that it will be useful," + " but WITHOUT ANY WARRANTY; without even the implied warranty of" + " MERCHANTABILITY or FITNESS FOR A EXTRTICULAR PURPOSE.  See the" + " GNU General Public License for more details." + "\n\n" + "You should have received a copy of the GNU General Public License" + " along with this program. If not, see http://www.gnu.org/licenses/.";
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
                LoUBBCode.main.getInstance().initialize();
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
      console.log('LoUBBCode: ' + e);
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