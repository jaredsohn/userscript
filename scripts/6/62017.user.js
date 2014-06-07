// ==UserScript==
// @name          You keyboard junky
// @namespace     http://d.hatena.ne.jp/mooz/
// @description   Control youtube using keyboard.
// @include       http://www.youtube.tld/watch*
// ==/UserScript==

(function () {
     if (!unsafeWindow.yt)
         return;

     var defaultKeyMap = {
         "M-p" : "play_or_pause",
         "M-q" : "stop",
         "M-m" : "toggle_mute",
         "9"   : "volume,-10",
         "0"   : "volume,10",
         ","   : "seek,-10",
         "."   : "seek,10",
         "["   : "seek,-30",
         "]"   : "seek,30",
         "<"   : "seek,-60",
         ">"   : "seek,60",
         "M-h" : "help"
     };

     var keyMap;

     var keyMapStr = GM_getValue("keymap");
     if (typeof keyMapStr != "undefined")
         keyMap = eval(keyMapStr);
     else
         keyMap = defaultKeyMap;

     var commands = {
         // commandname : [command body, description getter]
         "play_or_pause" : [function () { playOrPause(); } ,
                            function () "Play / Pause video"],
         "stop"          : [function () { stop(); },
                            function () "Stop playing video"],
         "volume"        : [function (arg) { volume(arg); },
                            function (arg) format("Volume %s by %s percent",
                                                  (arg > 0 ? "up" : "down"), Math.abs(arg))],
         "toggle_mute"   : [function () { toggleMute(); },
                            function () "Toggle mute"],
         "seek"          : [function (arg) { seek(arg); },
                            function (arg) format("Seek %s by %s seconds",
                                                  (arg > 0 ? "forward" : "backward"), Math.abs(arg))],
         "help"          : [function () { toggleHelp(); },
                            function () "Display / Hide this help"]
     };

     const KE = document.createEvent("KeyboardEvent");

     const VIDEO_NOT_STARTED = -1;
     const VIDEO_STOPPED     = 0;
     const VIDEO_PLAYING     = 1;
     const VIDEO_PAUSED      = 2;
     const VIDEO_BUFFERING   = 3;
     const VIDEO_QUEUED      = 5;

     const PLAYER_ID = "movie_player";

     function getPlayer() {
         var player = document.getElementById(PLAYER_ID);

         if (!player)
         {
             var container = document.getElementById("watch-player-div");
             var embeds    = container.getElementsByTagName("embed");

             if (embeds && embeds[0])
             {
                 player = embeds[0];
                 player.setAttribute("id", PLAYER_ID);
             }
         }

         return player.wrappedJSObject ? player.wrappedJSObject : player;
     }

     // Actions {{ =============================================================== //

     function toggleMute() {
         var player = getPlayer();

         if (player.isMuted())
             player.unMute();
         else
             player.mute();
     }

     function volume(aDelta) {
         var player = getPlayer();

         var current = player.getVolume();
         var to = aDelta > 0 ?
             Math.max(current + aDelta, 100) : Math.min(current + aDelta, 0);

         player.setVolume(current + aDelta);
     }

     function seek(aDelta) {
         var player = getPlayer();

         var current = player.getCurrentTime();
         var to = current + aDelta;

         player.seekTo(to, true);
     }

     function playOrPause() {
         var player = getPlayer();

         switch (player.getPlayerState())
         {
         case VIDEO_NOT_STARTED:
         case VIDEO_STOPPED:
         case VIDEO_PAUSED:
             player.playVideo();
             break;
         case VIDEO_PLAYING:
             player.pauseVideo();
             break;
         default:
             break;
         }
     }

     function stop() {
         var player = getPlayer();

         player.stopVideo();
         player.clearVideo();
     }

     // }} ======================================================================= //

     // HTML {{ ================================================================== //

     const HELP_CONTAINER_ID   = "youkj-help-container";
     const HELP_INSTRUCTION_ID = "youkj-help-instruction";
     const HELP_ECHOAREA_ID    = "youkj-help-echoarea";
     const HELP_KEYBINDINGS_ID = "youkj-help-keybindings";

     const HELP_KEY_CLASS      = "youkj-help-keys";

     var instruction = {
         key        : "M-p means Alt + p and C-p means Ctrl + p",
         customize  : "Click key name to customize keybindings",
         pressKey   : '<span style="color:#a875ff;font-weight:bold;">Press key</span>'
     };

     function genElem(elemName, textValue, id) {
         var elem = document.createElement(elemName);

         if (textValue)
             elem.appendChild(document.createTextNode(textValue));

         if (id)
             elem.setAttribute("id", id);

         return elem;
     }

     function createStyle (selector, style) {
         var css = [];

         css.push(selector + " {");

         css.push((function (styles) {
                       var array = [];

                       for (var prop in styles)
                       {
                           array.push(prop + ":" + styles[prop]);
                       }

                       return array.join(";");
                   })(style));

         css.push("}");

         return css.join("\n");
     }

     function echo(msg) {
         var echoArea = document.getElementById(HELP_ECHOAREA_ID);
         if (echoArea)
             echoArea.innerHTML = msg;
     }

     function showHelp() {
         var help = document.getElementById(HELP_CONTAINER_ID);

         if (help)
         {
             help.style.display = "block";
             return;
         }

         // create new one
         var container = genElem("div", null, HELP_CONTAINER_ID);
         container.appendChild(genElem("h2", "Key bindings"));

         container.appendChild(genElem("p", instruction.key, HELP_INSTRUCTION_ID));
         container.appendChild(genElem("p", instruction.customize, HELP_ECHOAREA_ID));

         container.appendChild(genElem("hr"));

         // Key binding list {{ ====================================================== //

         var keybindings = container.appendChild(genElem("dl"), null, HELP_KEYBINDINGS_ID);

         function createInput(type, initial) {
             var input = document.createElement("input");
             input.setAttribute("type", type);
             input.setAttribute("class", HELP_KEY_CLASS);

             if (initial)
                 input.setAttribute("value", initial);

             return input;
         }

         for (var key in keyMap)
         {
             var dt = genElem("dt");

             var keyinput = createInput("text", key);
             keyinput.addEventListener("focus", onFocus, false);
             keyinput.addEventListener("blur", onBlur, false);

             dt.appendChild(keyinput);
             keybindings.appendChild(dt);

             // 
             keybindings.appendChild(genElem("dd", getDescription(keyMap[key])));
         }

         container.appendChild(keybindings);

         // }} ======================================================================= //

         // Button {{ ================================================================ //

         var form   = genElem("form");

         function createButton(label, id, callback) {
             var button = genElem("input");
             button.setAttribute("type", "button");
             button.setAttribute("value", label);
             button.addEventListener("click", callback, false);

             return button;
         }

         form.appendChild(createButton("Default",
                                       "youkj-help-default-button",
                                       function () {
                                           var oldHelp = document.getElementById(HELP_CONTAINER_ID);
                                           document.body.removeChild(oldHelp);

                                           keyMap = defaultKeyMap;
                                           GM_setValue("keymap", keyMap.toSource());
                                           
                                           showHelp();
                                       }));

         form.appendChild(createButton("Close",
                                       "youkj-help-close-button",
                                       function () {
                                           hideHelp();
                                       }));

         container.appendChild(form);

         // }} ======================================================================= //

         // CSS {{ =================================================================== //

         var css = "";

         var baseSelector = "div#" + HELP_CONTAINER_ID + " ";

         // base style
         css += createStyle(baseSelector,
                            {
                                "z-index"            : "500",
                                "font-size"          : "14px",
                                "text-align"         : "center",
                                "font-family"        : '"Trebuchet MS", Arial, Helvetica, sans-serif',
                                "padding"            : "10px",
                                "margin"             : "3px",
                                "color"              : "#f1eeff",
                                "background-color"   : "#111111",
                                "position"           : "fixed",
                                "-moz-border-radius" : "8px",
                                "top"                : "0.5em",
                                "right"              : "0.5em",
                                "-moz-opacity"       : "0.9",
                                "opacity"            : "0.9"
                            });

         css += createStyle(baseSelector + "hr",
                            {
                                "height"           : "1px",
                                "background-color" : "#efe6ff",
                                "border"           : "none"
                            });

         css += createStyle(baseSelector + "dl",
                            {
                                "text-align" : "left"
                            });

         css += createStyle(baseSelector + "dt",
                            {
                                "color"       : "#9f83ff",
                                "text-align"  : "left",
                                "float"       : "left",
                                "width"       : "8em",
                                "padding"     : "5px 0 5px 10px",
                                "clear"       : "both",
                                "font-weight" : "bold"
                            });

         css += createStyle(baseSelector + "dd",
                            {
                                "color"       : "#d9d9d9",
                                "width"       : "300px",
                                "margin-left" : "3em",
                                "padding"     : "5px 5px 5px 10px"
                            });

         css += createStyle(baseSelector + 'input[type="text"]',
                            {
                                "color"       : "inherit",
                                "float"       : "inherit",
                                "width"       : "inherit",
                                "padding"     : "0",
                                "margin"      : "0",
                                "clear"       : "inherit",
                                "font-weight" : "inherit",
                                "border"      : "none",
                                "background"  : "inherit",
                                "font"        : "inherit",
                                "font-size"   : "inherit"
                            });

         css += createStyle(baseSelector + 'input[type="button"]',
                            {
                                "margin" : "2px 10px"
                            });

         GM_addStyle(css);

         // }} ======================================================================= //

         document.body.appendChild(container);
     }

     function hideHelp() {
         var help = document.getElementById(HELP_CONTAINER_ID);

         help.style.display = "none";
     }

     function toggleHelp() {
         var help = document.getElementById(HELP_CONTAINER_ID);

         if (!help || help.style.display == "none")
             showHelp();
         else
             hideHelp();
     }

     function onFocus(aEvent) {
         var elem = aEvent.target;
         elem.__originalColor__ = elem.style.color;
         elem.style.color = "#ff5162";
         echo(instruction.pressKey);
     }

     function onBlur(aEvent) {
         var elem = aEvent.target;
         elem.style.color = elem.style.__originalColor__ || "inherit";
         echo(instruction.customize);
     }

     // }} ======================================================================= //

     // Keypress processing {{ =================================================== //

     function isControlKey(aEvent) {
         return aEvent.ctrlKey || aEvent.commandKey;
     }

     function isMetaKey(aEvent) {
         return aEvent.altKey || aEvent.metaKey;
     }

     function isDisplayableKey(aEvent) {
         return aEvent.charCode >= 0x20 && aEvent.charCode <= 0x7e;
     }

     function isNumKey(aEvent) {
         return (aEvent.charCode >= 0x30 &&
                 aEvent.charCode <= 0x39);
     }

     function keyEventToString(aEvent) {
        var key;

        if (isDisplayableKey(aEvent))
        {
            // ASCII displayable characters (0x20 : SPC)
            key = String.fromCharCode(aEvent.charCode);
            if (aEvent.charCode == 0x20)
            {
                key = "SPC";
            }
        }
        else if (aEvent.keyCode >= KE.DOM_VK_F1 &&
                 aEvent.keyCode <= KE.DOM_VK_F24)
        {
            // function keys
            key = "<f"
                + (aEvent.keyCode - KE.DOM_VK_F1 + 1)
                + ">";
        }
        else
        {
            // special charactors
            switch (aEvent.keyCode)
            {
            case KE.DOM_VK_ESCAPE:
                key = "ESC";
                break;
            case KE.DOM_VK_RETURN:
            case KE.DOM_VK_ENTER:
                key = "RET";
                break;
            case KE.DOM_VK_RIGHT:
                key = "<right>";
                break;
            case KE.DOM_VK_LEFT:
                key = "<left>";
                break;
            case KE.DOM_VK_UP:
                key = "<up>";
                break;
            case KE.DOM_VK_DOWN:
                key = "<down>";
                break;
            case KE.DOM_VK_PAGE_UP:
                key = "<prior>";
                break;
            case KE.DOM_VK_PAGE_DOWN:
                key = "<next>";
                break;
            case KE.DOM_VK_END:
                key = "<end>";
                break;
            case KE.DOM_VK_HOME:
                key = "<home>";
                break;
            case KE.DOM_VK_TAB:
                key = "<tab>";
                break;
            case KE.DOM_VK_BACK_SPACE:
                key = "<backspace>";
                break;
            case KE.DOM_VK_PRINTSCREEN:
                key = "<print>";
                break;
            case KE.DOM_VK_INSERT:
                key = "<insert>";
                break;
            case KE.DOM_VK_PAUSE:
                key = "<pause>";
                break;
            case KE.DOM_VK_DELETE:
                key = "<delete>";
            }
        }

        if (!key)
            return null;

        // append modifier
        if (isMetaKey(aEvent))
            key = "M-" + key;
        if (isControlKey(aEvent))
            key = "C-" + key;
        if (aEvent.shiftKey && (!isDisplayableKey(aEvent) || aEvent.charCode == 0x20))
            key = "S-" + key;

        return key;
     }

     // }} ======================================================================= //

     function list(obj) {
         for (var i in obj)
         {
             GM_log(i + " = " + obj[i]);
         }
     }

     function format(aFormat) {
        for (var i = 1; i < arguments.length; ++i)
        {
            aFormat = aFormat.replace("%s", arguments[i]);
        }

        return aFormat;
     }

     function parseCommand(aCommand) {
         [command, arg] = aCommand.split(",");
         if (arg)
             arg = parseInt(arg);

         return [command, arg];
     }

     function getDescription(aCommand) {
         [command, arg] = parseCommand(aCommand);

         if (!commands[command])
             return "Illigal command";

         return commands[command][1](arg);
     }

     function inTextArea(aEvent) {
         var localName = aEvent.target.localName.toLowerCase();
         return (localName == 'input' || localName == 'textarea');
     }

     function handleKeyPress(aEvent) {
         // ignore
         if (inTextArea(aEvent))
         {
             var elem = aEvent.target;
             var cls = elem.getAttribute("class");

             // check if in customizing area
             if (cls && cls == HELP_KEY_CLASS)
             {
                 aEvent.preventDefault();

                 var newKey = keyEventToString(aEvent);
                 if (newKey)
                 {
                     if (newKey in keyMap)
                     {
                         // avoid duplication
                         echo('<span style="color:#ff173b;font-weight:bold;">' + newKey + ' is already in the keymap</span>');

                         return;
                     }
                     
                     // hmmm ...
                     var oldKey     = elem.value;
                     var savedValue = keyMap[oldKey];
                     delete keyMap[oldKey];

                     keyMap[newKey] = savedValue;
                     elem.value = newKey;
                     // update
                     GM_setValue("keymap", keyMap.toSource());

                     elem.blur();
                 }
             }

             return;
         }

         var key = keyEventToString(aEvent);

         if (!key)
             return;

         if (key in keyMap)
         {
             aEvent.stopPropagation();

             // execute command {{ ======================================================= //

             [command, arg] = parseCommand(keyMap[key]);

             if (commands[command] && typeof commands[command][0] == "function")
                 commands[command][0](arg);

             // }} ======================================================================= //
         }
     }

     GM_registerMenuCommand("You keyboard junky - Customize keybindings", showHelp);

     document.addEventListener("keypress", handleKeyPress, true);
 }());
