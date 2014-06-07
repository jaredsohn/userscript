// ==UserScript==
// @name        Google Search Language Selector
// @namespace   http://satomacoto.blogspot.com/
// @include     http://www.google.*/search?*
// @description Set additional option buttons for googling pages in a language. 
// ==/UserScript==

(function() {
//====================================================
// Select languages from follwing list. 
//====================================================    
    var keys = [ "any language", "English" ];
//====================================================

    var lang = {
        "any language" : "",
        "Afrikaans" : "lang_af",
        "Arabic" : "lang_ar",
        "Armenian" : "lang_hy",
        "Belarusian" : "lang_be",
        "Bulgarian" : "lang_bg",
        "Catalan" : "lang_ca",
        "Chinese (Simplified)" : "lang_zh-CN",
        "Chinese (Traditional)" : "lang_zh-TW",
        "Croatian" : "lang_hr",
        "Czech" : "lang_cs",
        "Danish" : "lang_da",
        "Dutch" : "lang_nl",
        "English" : "lang_en",
        "Esperanto" : "lang_eo",
        "Estonian" : "lang_et",
        "Filipino" : "lang_tl",
        "Finnish" : "lang_fi",
        "French" : "lang_fr",
        "German" : "lang_de",
        "Greek" : "lang_el",
        "Hebrew" : "lang_iw",
        "Hungarian" : "lang_hu",
        "Icelandic" : "lang_is",
        "Indonesian" : "lang_id",
        "Italian" : "lang_it",
        "Japanese" : "lang_ja",
        "Korean" : "lang_ko",
        "Latvian" : "lang_lv",
        "Lithuanian" : "lang_lt",
        "Norwegian" : "lang_no",
        "Persian" : "lang_fa",
        "Polish" : "lang_pl",
        "Portuguese" : "lang_pt",
        "Romanian" : "lang_ro",
        "Russian" : "lang_ru",
        "Serbian" : "lang_sr",
        "Slovak" : "lang_sk",
        "Slovenian" : "lang_sl",
        "Spanish" : "lang_es",
        "Swahili" : "lang_sw",
        "Swedish" : "lang_sv",
        "Thai" : "lang_th",
        "Turkish" : "lang_tr",
        "Ukrainian" : "lang_uk",
        "Vietnamese" : "lang_vi"
    };

//====================================================

    var now = '';
    var str = location.search.substring(1);
    if (str) {
        var par = str.split('&');
        for (var i=0; i<par.length; i++) {
            var val = par[i].split('=');
            if (val[0] == 'lr') {
                now = val[1];
                break;
            }
        }
    }

    var div = document.createElement('div');
    
    var len = keys.length;
    for (var i=0; i<len; i++) {
        var obj = document.createElement('span');
        if (now == lang[keys[i]]) {
            obj.innerHTML = '<input id="il_' + keys[i] + '" type="radio" name="lr" value="' + lang[keys[i]] + '" checked><label for="il_' + keys[i] + '"> ' + keys[i] + ' </label>';
        }
        else {
            obj.innerHTML = '<input id="il_' + keys[i] + '" type="radio" name="lr" value="' + lang[keys[i]] + '"><label for="il_' + keys[i] + '"> ' + keys[i] + ' </label>';
        }
        div.appendChild(obj);
    }

    var d = document;
    var sff = d.getElementById('sff');
    sff.appendChild(div);
    
})();
