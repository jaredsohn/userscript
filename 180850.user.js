// ==UserScript==
// @name       Lingr quoted enhancement jitsu
// @namespace  http://aycabta.github.io/
// @version    0.1.6
// @description  The Benry Script
// @include    http://lingr.com/
// @include    http://lingr.com/room/*/archives*
// @copyright  2013+, Code Ass
// ==/UserScript==

(function() {
    if (location.href == "http://lingr.com/") {
        Lingr.Text.oldQuotedEnhancementDecorate = Lingr.Text.decorate;
        Lingr.Text.decorate = function(str) {
            var newStr;
            if (!str) {
                return Lingr.Text.oldQuotedEnhancementDecorate(str);
            }
            newStr = Lingr.Text.oldQuotedEnhancementDecorate(str);
            return newStr.split('\n').map(function(s) {
                return s.replace(/(^|<p>)((?:&gt;|＞).*?)($|<\/p>)/g, '$1<span class="quoted">$2</span>$3');
            }).join('</p><p>');
        };
    } else {
        var i;
        var messages = $("div.decorated p");
        for (i = 0; i < messages.length; i++) {
            var oldMessage = messages[i].innerHTML;
            messages[i].innerHTML = oldMessage.replace(/^((?:&gt;|＞).*?)$/g, '<span class="quoted">$1</span>');;
        }
    }
    var style = document.createElement('style');
    style.type = "text/css";
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
    var sheet = style.sheet;
    sheet.insertRule('.quoted { color: #00CC33; }', sheet.cssRules.length);
})();
