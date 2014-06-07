// ==UserScript==
// @name           Google Language Code Changer
// @namespace      http://cecidozoa.org/
// @description    Add a select-box for the hl parameter on google result pages.
// @include        http://*.google.*/search?*
// ==/UserScript==

(function(myhl) {
    // language list, borrowed from http://gpsgfaq.googlepages.com/google_language_codes.html
    // You can change following list few for your main using. e.g., var list = ['en', 'ja', 'xx-hacker']
    var list = 
    ['af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bh', 'xx-bork', 'bs', 'br', 'bg', 'km', 'ca',
    'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'xx-elmer', 'en', 'eo', 'et', 'fo', 'tl', 'fi',
    'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gn', 'gu', 'xx-hacker', 'iw', 'hi', 'hu', 'is', 'id', 'ia', 'ga',
    'it', 'ja', 'jw', 'kn', 'kk', 'xx-klingon', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'ln', 'lt', 'mk',
    'ms', 'ml', 'mt', 'mr', 'mo', 'mn', 'ne', 'no', 'nn', 'oc', 'or', 'ps', 'fa', 'xx-piglatin', 'pl',
    'pt-BR', 'pt-PT', 'pa', 'qu', 'ro', 'rm', 'ru', 'gd', 'sr', 'sh', 'st', 'sn', 'sd', 'si', 'sk', 'sl',
    'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'ti', 'to', 'tr', 'tk', 'tw', 'ug', 'uk', 'ur',
    'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'];
    
    list.sort();
    var baseurl = document.location.href.replace(/lr=lang_[^&]+&?/, '').replace(/hl=([^&]+)&?/, '');
    var current = (RegExp.$1)? RegExp.$1 : myhl;
    var generateOption = function(v) {
        return '<option value="' + baseurl.replace(/&/g, '&#38;') + "&#38;hl=" + v + '"' 
             + ((v == current)? ' selected="1"' : '') + '>' + v + '</option>';
    };
    var opts = list.map(generateOption).join("\n");
    var sel = new XML('<select name="hl" onchange="location.href=this.options[this.selectedIndex].value">' + opts + '</select>');
    GM_addStyle("select[name=hl] { margin:2px 0 0 .5em; display:block; float:left; }");
    with(document.getElementById('ap').parentNode) { innerHTML = sel.toXMLString() + innerHTML };
})('en');