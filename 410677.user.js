// ==UserScript==
// @name        Google Search Language Jumper+
// @author      AnyouLai
// @version     ∞
// @namespace   http*://satomacoto.blogspot.com/
// @include     http*://*.google.*/search?*
// @include     http*://*.google.*/images?*
// @include     http*://*.google.*/videosearch?*
// @include     http*://*.google.*/books?*
// @include     http*://*.google.*/scholar?*
// @description Jump to google pages (incloud http & https) in other languages w/ additional query. (e.g. search "google en": jump to search "google" in English.)  
// ==/UserScript==

(function() {
    
    var map = {
        "af" : "lang_af",
        "ar" : "lang_ar",
        "hy" : "lang_hy",
        "be" : "lang_be",
        "bg" : "lang_bg",
        "ca" : "lang_ca",
        "zh-CN" : "lang_zh-CN",
        "cn" : "lang_zh-CN",
        "zh-TW" : "lang_zh-TW",
        "tw" : "lang_zh-TW",
        "hr" : "lang_hr",
        "cs" : "lang_cs",
        "da" : "lang_da",
        "nl" : "lang_nl",
        "en" : "lang_en",
        "eo" : "lang_eo",
        "et" : "lang_et",
        "tl" : "lang_tl",
        "fi" : "lang_fi",
        "fr" : "lang_fr",
        "de" : "lang_de",
        "el" : "lang_el",
        "iw" : "lang_iw",
        "hu" : "lang_hu",
        "is" : "lang_is",
        "id" : "lang_id",
        "it" : "lang_it",
        "ja" : "lang_ja",
        "ko" : "lang_ko",
        "lv" : "lang_lv",
        "lt" : "lang_lt",
        "no" : "lang_no",
        "fa" : "lang_fa",
        "pl" : "lang_pl",
        "pt" : "lang_pt",
        "ro" : "lang_ro",
        "ru" : "lang_ru",
        "sr" : "lang_sr",
        "sk" : "lang_sk",
        "sl" : "lang_sl",
        "es" : "lang_es",
        "sw" : "lang_sw",
        "sv" : "lang_sv",
        "th" : "lang_th",
        "tr" : "lang_tr",
        "uk" : "lang_uk",
        "vi" : "lang_vi"
    };
            
    function check(url,map,lang) {
        var _regex = new RegExp("q=(.*?)\[ \\+\]" + lang + "&");
        var _url = url.replace(_regex, "q=$1 &");
        if(_url.match(/lr=/)) {
            _url = _url.replace(/lr=(.*?)&/, "lr=" + map[lang] + "&");
        }
        else {
            _url += "lr=" + map[lang];
        }
        window.location.replace(_url);
    }

    var url = window.location.href + "&";
    var q = url.match(/q=(.*?)&/)[1];
    var words = decodeURI(q).split(/[ \+]/)
    if (words.length < 2) { return; }
    var lang = words.pop();
            
    if (map[lang]) {
        check(decodeURI(url),map,lang);
    }
})();