// ==UserScript==
// @name           Legend of Zork Adventure Help
// @namespace      http://www.mrchucho.net
// @description    Legend of Zork Adventure Help
// @include        http://legendsofzork.com/game/*
// ==/UserScript==
(function() {
    // Could make "return_to_base" use 'b' instead
    // "Last Exploration" could be 'e', too. That way you always "explore" with 'e'...
    var keyMap = {
        '/game/explore': 'e',
        '/game/return_to_base': 'r',
        '/game/level_up': '+',
        '/game/level_down': '-',
        '/game/move_to_location': 'l',
        'javascript:go': 'v'
    };
    var rewriteButton = false;
    var is_go_url = /javascript:\s?go\(.*\)/i;
    var AdventureHelper = {
        decorateButton: function(button, key) {
          var b;
          if(/span/i.test(button.tagName)) {
              b = button;
          } else {
              b = button.getElementsByTagName('span')[0];
          }
          var buttonText = b.innerHTML;
          if(rewriteButton) {
              var regexp = new RegExp(key, 'i');
              b.innerHTML = buttonText.replace(regexp, function(c) {
                  return "<span style='text-decoration: underline; font-style: italic;'>"+c+"</span>";
              });
          } else { 
              b.innerHTML += "&nbsp;<small>("+key+")</small>";
          }
        },
        enableKeys: function(className, attributeName, extractWith, up) {
            var appliedKeys = {};
            var buttons = document.getElementsByClassName(className);
            var i;
            for(i = 0; i < buttons.length; i+= 1) {
                var button = buttons[i];
                var href = button.getAttribute(attributeName).replace(/\?.*$/,'');
                if(extractWith) {
                    href = href.match(extractWith)[1];
                }
                if(appliedKeys[href] !== true) {
                    if(keyMap[href] !== undefined) {
                        if(up) {
                            button.parentNode.accessKey = keyMap[href];
                            button.parentNode.href = href;
                        } else {
                            button.accessKey = keyMap[href];
                        }
                        appliedKeys[href] = true;
                        this.decorateButton(button, keyMap[href]);
                    } else {
                        if(is_go_url.test(href)) {
                            button.accessKey = keyMap['javascript:go'];
                            appliedKeys[href] = true;
                            this.decorateButton(button, keyMap['javascript:go']);
                        }
                    } 
                }
            }
        }
    }
    AdventureHelper.enableKeys('s-button', 'href', null, false);
    AdventureHelper.enableKeys('s-button-right', 'onClick', /(?:window.location.href=')(.*)(?:';return false;)/, true);
})();
// ChangeLog
// 2009/08/15 - Updated for "changes" to LoZ... p.s. I love you LoZ.
// 2009/05/28 - Added access key for switching locations
// 2009/05/23 - Initial Version
