// ==UserScript==
// @name   LoUBBCode extend
// @description Adds extra functionality to Lord of Ultima chat
// @namespace   LoUBBCode 
// @include     http://prodgame*.lordofultima.com/*/index.aspx*
// @version     2.1
// @grant       none
// ==/UserScript==
(function () {
  /*
   * Changelog
   * 11/13/2013
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
   * 1.6   - add youtube video and colors
   * 1.6.1 - fix missing regex
   * 1.6.2 - remove sizzlemctwizzle.com while its broken
   * 1.7   - add competitors
   * 1.8   - add social check and non ally protection
   * 1.9   - fixing after lou update
   * 2.0   - change hosting
   * 2.1   - change hosting
   */
  var LoUBBCode, main = function () {
      var LoUBBCodeVersion = '2.1';

      function debug(msg) {
        msg = (msg instanceof Error && msg.stack) ? msg.stack : String(msg);
        if (window.console && typeof console.log === "function") {
          console.log('LoUBBCode: ' + msg);
        }
      }
      
      function checkDependencies() {
        var dependencies = [
          webfrontend.config.Config.getInstance().getChat(),
          qx.core.Init.getApplication().chat,
					webfrontend.data.FriendList],
          i = dependencies.length,
          checkPoint = 1;
        // check (in)dependencies
        while (i--) {
          if (!dependencies[i]) {
            checkPoint = 0;
          }
        }
        var competitors = [
          'AlsiusTweak'
          ];
        i = competitors.length;
        // check (in)competitors
        while (i--) {
          if ((typeof window[competitors[i]] !== 'undefined')) {
            checkPoint = -2;
          }
        }
        return checkPoint;
      }
      /*
       * @language
       * i18 language support
       */
      var DefaultLang = "de",
        LocalizedStrings = {
          "en": {
            "ext:error_on_command": "Failed to run command",
            "ext:error_message": "Error",
            "ext:ok_message": "Successfully ",
            "ext:like_message": " like you :x",
            "ext:poke_message": " poke you <:-P",
            "ext:vote_message": " vote you :-bd",
            "ext:love_message": "Someone love you @};-",
            "ext:slap_message": "Someone slap you :-q"
          },
          "de": {
            "ext:error_on_command": "Fehler beim ausführen von",
            "ext:error_message": "Fehler",
            "ext:ok_message": "Erfolgreich ",
            "ext:like_message": " mag Dich :x",
            "ext:poke_message": " stubst Dich an <:-P",
            "ext:vote_message": " votet Dich :-bd",
            "ext:love_message": "Jemand mag Dich @};-",
            "ext:slap_message": "Jemand slapt Dich :-q"
          }
        };

      function i18n(messageId) {
        var locale = qx.locale.Manager.getInstance().getLocale().split('_')[0],
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
								webfrontend.data.FriendList.prototype.isFriendName = this.isFriendName;
                LoUBBCode.Chat.getInstance().addChatMessage('initialized! \\m/', true);
              },
              inception: function () {
                LoUBBCode.Inception.getInstance().init();
              },
              hijackMessage: function () {
                LoUBBCode.Chat.getInstance().init();
              },
              emotifyIcons: function () {
                var smilies = {
                  ">:)" : ["19.gif", "devil", ">:-)", "&gt;:-)", "&gt;:)"],
                  ":)"  : ["1.gif", "happy", ":-)", "*g", "*g*", "*G", "*G*"],
                  ":("  : ["2.gif", "sad", ":-(", ":/"],
                  ";)"  : ["3.gif", "winking", ";-)"],
                  ":D"  : ["4.gif", "big grin", "xD", ":-D", "*gg*", "gg", "GG", "*GG*"],
                  ";;)" : ["5.gif", "batting eyelashes"],
                  ">:D<": ["6.gif", "big hug", "&gt;:D&lt;", ":DD", "xDD"],
                  ":-/" : ["7.gif", "confused", ":/"],
                  ":x"  : ["8.gif", "love struck", ":X"],
                  ":\">": ["9.gif", "blushing", ":\"&gt;"],
                  ":P"  : ["10.gif", "tongue", ":p", ":-p", ":-P"],
                  ":-*" : ["11.gif", "kiss", ":*"],
                  "=((" : ["12.gif", "broken heart"],
                  ":-O" : ["13.gif", "surprise", ":O", "*huh*"],
                  "X("  : ["14.gif", "angry"],
                  ":>"  : ["15.gif", "smug", ":&gt;"],
                  "B-)" : ["16.gif", "cool"],
                  ":-S" : ["17.gif", "worried"],
                  "#:-S": ["18.gif", "whew!", "#:-s"],
                  ":((" : ["20.gif", "crying", ":-((", ":'(", ":'-("],
                  ":))" : ["21.gif", "laughing", ":-))"],
                  ":|"  : ["22.gif", "straight face", ":-|"],
                  "/:)" : ["23.gif", "raised eyebrow", "/:-)"],
                  "=))" : ["24.gif", "rolling on the floor"],
                  "O:-)": ["25.gif", "angel", "O:)"],
                  ":-B" : ["26.gif", "nerd"],
                  "=;"  : ["27.gif", "talk to the hand"],
                  "I-)" : ["28.gif", "sleepy"],
                  "8-|" : ["29.gif", "rolling eyes"],
                  "L-)" : ["30.gif", "loser"],
                  ":-&" : ["31.gif", "sick"],
                  ":-$" : ["32.gif", "don't tell anyone"],
                  "[-(" : ["33.gif", "not talking"],
                  ":O)" : ["34.gif", "clown"],
                  "8-}" : ["35.gif", "silly"],
                  "<:-P": ["36.gif", "party", "<:-p", "&lt;:-P", "&lt;:-p"],
                  "(:|" : ["37.gif", "yawn"],
                  "=P~" : ["38.gif", "drooling"],
                  ":-?" : ["39.gif", "thinking"],
                  "#-o" : ["40.gif", "d'oh", "#-O"],
                  "=D>" : ["41.gif", "applause", "=D&gt;"],
                  ":-SS": ["42.gif", "nailbiting", ":-ss"],
                  "@-)" : ["43.gif", "hypnotized"],
                  ":^o" : ["44.gif", "liar"],
                  ":-w" : ["45.gif", "waiting", ":-W"],
                  ":-<" : ["46.gif", "sigh", ":-&lt;"],
                  ">:P" : ["47.gif", "phbbbbt", ">:p", "&gt;:P", "&gt;:p"],
                  "<):)": ["48.gif", "cowboy", "&lt;):)"],
                  ":@)" : ["49.gif", "pig"],
                  "3:-O": ["50.gif", "cow", "3:-o"],
                  ":(|)": ["51.gif", "monkey"],
                  "~:>" : ["52.gif", "chicken", "~:&gt;"],
                  "@};-": ["53.gif", "rose"],
                  "%%-" : ["54.gif", "good luck"],
                  "**==": ["55.gif", "flag"],
                  "(~~)": ["56.gif", "pumpkin"],
                  "~O)" : ["57.gif", "coffee"],
                  "*-:)": ["58.gif", "idea"],
                  "8-X" : ["59.gif", "skull"],
                  "=:)" : ["60.gif", "bug"],
                  ">-)" : ["61.gif", "alien", "&gt;-)"],
                  ":-L" : ["62.gif", "frustrated", ":L"],
                  "[-O<": ["63.gif", "praying", "[-O&lt;"],
                  "$-)" : ["64.gif", "money eyes"],
                  ":-\"": ["65.gif", "whistling"],
                  "b-(" : ["66.gif", "feeling beat up"],
                  ":)>-": ["67.gif", "peace sign", ":)&gt;-"],
                  "[-X" : ["68.gif", "shame on you"],
                  "\\:D/": ["69.gif", "dancing"],
                  ">:/" : ["70.gif", "bring it on", "&gt;:/"],
                  ";))" : ["71.gif", "hee hee"],
                  "o->" : ["72.gif", "hiro", "o-&gt;"],
                  "o=>" : ["73.gif", "billy", "o=&gt;"],
                  "o-+" : ["74.gif", "april"],
                  "(%)" : ["75.gif", "yin yang"],
                  ":-@" : ["76.gif", "chatterbox"],
                  "^:)^": ["77.gif", "not worthy"],
                  ":-j" : ["78.gif", "oh go on"],
                  "(*)" : ["79.gif", "star"],
                  ":)]" : ["100.gif", "on the phone"],
                  ":-c" : ["101.gif", "call me"],
                  "~X(" : ["102.gif", "at wits' end"],
                  ":-h" : ["103.gif", "wave"],
                  ":-t" : ["104.gif", "time out"],
                  "8->" : ["105.gif", "daydreaming", "8-&gt;"],
                  ":-??": ["106.gif", "I don't know"],
                  "%-(" : ["107.gif", "not listening"],
                  ":o3" : ["108.gif", "puppy dog eyes"],
                  "X_X" : ["109.gif", "I don't want to see", "x_x"],
                  ":!!" : ["110.gif", "hurry up!"],
                  "\\m/": ["111.gif", "rock on!"],
                  ":-q" : ["112.gif", "thumbs down"],
                  ":-bd": ["113.gif", "thumbs up"],
                  "^#(^": ["114.gif", "it wasn't me"],
                  ":bz" : ["115.gif", "bee"],
                  ":ar!": ["pirate.gif", "pirate"],
                  "[..]": ["transformer.gif", "transformer"]
                };
                emotify.emoticons('http://loubbcode.pixub.com/shared/emoticons/Yahoo.AdiumEmoticonset/', smilies);
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
              //important colors = downtimeAnnouncement,LoUWin,System,Info,social
              addChatMessage: function (message, prefix, color) {
                var _color = color || 'Info',
                  _prefix = (prefix) ? 'LoUBBCode: (' + LoUBBCodeVersion + ') ' : '',
                  eV = webfrontend.config.Config.getInstance().getChat(),
                  eN = '<font size="' + eV.getFontSize() + '" color="' + eV.getChannelColor(_color) + '" style="word-wrap: break-word;">' + _prefix + emotify(message) + '</font>',
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
                LoUBBCode.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:like_message'), false, 'social');
                return (webfrontend.data.FriendList.getInstance().isFriendName(sender)||(webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
              },
              poke: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:poke_message'), false, 'social');
                return (webfrontend.data.FriendList.getInstance().isFriendName(sender)||(webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
              },
              vote: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:vote_message'), false, 'social');
                return (webfrontend.data.FriendList.getInstance().isFriendName(sender)||(webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
              },
              love: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage(i18n('ext:love_message'), false, 'social');
                return (webfrontend.data.FriendList.getInstance().isFriendName(sender)||(webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
              },
              slap: function (data, sender) {
                LoUBBCode.Chat.getInstance().addChatMessage(i18n('ext:slap_message'), false, 'social');
                return (webfrontend.data.FriendList.getInstance().isFriendName(sender)||(webfrontend.data.Alliance.getInstance().getId() > 0 && webfrontend.data.Alliance.getInstance().hasMemberName(sender))) ? true : false;
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
            if (checkDependencies() === 1) {
              if (!startup.initialized) {
                startup.initialized = true;
                createTweak();
                LoUBBCode.main.getInstance().initialize();
              }
            } else if (checkDependencies() === -2) {
              debug('competitor found, shutdown script');
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