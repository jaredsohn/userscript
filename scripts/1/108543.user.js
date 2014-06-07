// ==UserScript==
// @name           gDictionary
// @namespace      google
// @include        *
// @version        0.0.2
// ==/UserScript==

//languageAfterTranslationSet shows the list of languages after translation
var languageAfterTranslationSet = {
     'AFRIKAANS': "af",
     'ALBANIAN': "sq",
     'AMHARIC': "am",
     'ARABIC': "ar",
     'ARMENIAN': "hy",
     'AZERBAIJANI': "az",
     'BASQUE': "eu",
     'BELARUSIAN': "be",
     'BENGALI': "bn",
     'BIHARI': "bh",
     'BULGARIAN': "bg",
     'BURMESE': "my",
     'CATALAN': "ca",
     'CHEROKEE': "chr",
     'CHINESE': "zh",
     'CHINESE_SIMPLIFIED': "zh-CN",
     'CHINESE_TRADITIONAL': "zh-TW",
     'CROATIAN': "hr",
     'CZECH': "cs",
     'DANISH': "da",
     'DHIVEHI': "dv",
     'DUTCH': "nl",
     'ENGLISH': "en",
     'ESPERANTO': "eo",
     'ESTONIAN': "et",
     'FILIPINO': "tl",
     'FINNISH': "fi",
     'FRENCH': "fr",
     'GALICIAN': "gl",
     'GEORGIAN': "ka",
     'GERMAN': "de",
     'GREEK': "el",
     'GUARANI': "gn",
     'GUJARATI': "gu",
     'HEBREW': "iw",
     'HINDI': "hi",
     'HUNGARIAN': "hu",
     'ICELANDIC': "is",
     'INDONESIAN': "id",
     'INUKTITUT': "iu",
     'ITALIAN': "it",
     'JAPANESE': "ja",
     'KANNADA': "kn",
     'KAZAKH': "kk",
     'KHMER': "km",
     'KOREAN': "ko",
     'KURDISH': "ku",
     'KYRGYZ': "ky",
     'LAOTHIAN': "lo",
     'LATVIAN': "lv",
     'LITHUANIAN': "lt",
     'MACEDONIAN': "mk",
     'MALAY': "ms",
     'MALAYALAM': "ml",
     'MALTESE': "mt",
     'MARATHI': "mr",
     'MONGOLIAN': "mn",
     'NEPALI': "ne",
     'NORWEGIAN': "no",
     'ORIYA': "or",
     'PASHTO': "ps",
     'PERSIAN': "fa",
     'POLISH': "pl",
     'PORTUGUESE': "pt-PT",
     'PUNJABI': "pa",
     'ROMANIAN': "ro",
     'RUSSIAN': "ru",
     'SANSKRIT': "sa",
     'SERBIAN': "sr",
     'SINDHI': "sd",
     'SINHALESE': "si",
     'SLOVAK': "sk",
     'SLOVENIAN': "sl",
     'SPANISH': "es",
     'SWAHILI': "sw",
     'SWEDISH': "sv",
     'TAJIK': "tg",
     'TAMIL': "ta",
     'TAGALOG': "tl",
     'TELUGU': "te",
     'THAI': "th",
     'TIBETAN': "bo",
     'TURKISH': "tr",
     'UKRAINIAN': "uk",
     'URDU': "ur",
     'UZBEK': "uz",
     'UIGHUR': "ug",
     'VIETNAMESE': "vi",
     'UNKNOWN': ""
 };
var sourceLanguage = languageAfterTranslationSet['ENGLISH'];
var targetLanguage = languageAfterTranslationSet['CHINESE_TRADITIONAL'];
var mydiv = document.createElement("div");
var divStyle = "opacity: 0.7;filter:alpha(opacity=70);position:absolute;display:none;z-index:1000;border-left:solid 2px #AA0000;border-top:solid 2px #AA0000;border-right:solid 2px #AA0000;border-bottom:solid 2px #AA0000;background-color:black;padding-left:5px;padding: 1pt 3pt 1pt 3pt;font-size: 10pt;color: #ffffff;"
mydiv.setAttribute("style", divStyle);
mydiv.id = "dict-pupup";
document.body.appendChild(mydiv);

var curpos = {'x' : 0, 'y' : 0};
var lines = "";
var sound = "";
var contents = "";
var flag_switch = false;
var dcount=0;

function meaning(terms) {
    var means = "";
    var i;
    var count = 0;
    for (i = 0; i < terms.length && count < 3; i++) {
        if (terms[i].type == "text") {
            if (terms[i].language.substr(0, 2) == targetLanguage.substr(0, 2)) {
                means += terms[i].text + " ";
                count++;
            }
        }
    }
    lines += means;
}

function pronunciation(terms) {
    var soundurl = "";
    var phonetic = "";
    var i;
    for (i = 0; i < terms.length && (phonetic == "" || soundurl == ""); i++) {
        if (terms[i].type == "phonetic" && phonetic == "") {
            if (terms[i].labels[0].text == "KK")
                phonetic = terms[i].text;
        }
        else if (terms[i].type == "sound" && soundurl == "")
            soundurl = terms[i].text;
    }
    if (soundurl != "" && phonetic != "") {
        sound += "[ " + phonetic + " ]";
        sound += "<object height=\"16\" width=\" 16\" id=\"pronunciation\" type=\"application/x-shockwave-flash\" data=\"http://www.google.com.tw/dictionary/flash/SpeakerApp16.swf\">" +
        "<param value=\"http://www.google.com.tw/dictionary/flash/SpeakerApp16.swf\" name=\"movie\"></param>" +
        "<param value=\"sound_name=" +encodeURI(soundurl) + "\" name=\"flashvars\"></param>" +
        "<a href=\"" + encodeURI(soundurl) + "\">" + "</a></object>";
    }
}

function dict_cb(data, stat, n) {
    var i, j;
    contents = "";
    lines = "";
    sound = "";
    
    if (!data.primaries[0].terms.length || !data.primaries[0].entries.length)
        return;
        
    pronunciation(data.primaries[0].terms);
    var len = data.primaries[0].entries.length;
    for (i = 0; i < len; i++) {
        if (data.primaries[0].entries[i].type == "container") {
            if (data.primaries[0].entries[i].labels.length)
                lines = data.primaries[0].entries[i].labels[0].text + ": ";

            if (data.primaries[0].entries[i].entries.length) {
                var len2 = data.primaries[0].entries[i].entries.length;
                for (j = 0; j < len2; j++) {
                    if (data.primaries[0].entries[i].entries[j].type == "meaning")
                        meaning(data.primaries[0].entries[i].entries[j].terms);
                    else if (data.primaries[0].entries[i].entries[j].type == "related" && sound == "")
                        pronunciation(data.primaries[0].entries[i].entries[j].terms);
                }
            }
        }
        else if (data.primaries[0].entries[i].type == "meaning") {
            meaning(data.primaries[0].entries[i].terms);
        }
        if (lines.length)
            contents += lines + "<br>";
        lines = "";
    }
    if (contents.length) {
        if (sound == "")
            contents = data.query + "<br>" + contents;
        else
            contents = data.query + sound + "<br>" + contents;

        mydiv.innerHTML = contents;
        mydiv.style.left = (curpos.x + window.scrollX + 10).toString() + "px";
        mydiv.style.top = (curpos.y + window.scrollY + 10).toString() + "px";
        mydiv.style.display = "inline";
    }
}
function mouseproc(e) {
    if (!flag_switch)
        return;
        
    if (e.target.id == mydiv.id)
        return;
        
    mydiv.style.display = "none";
    var seltext = window.getSelection();
    if (seltext == "")
        return;
    
    curpos.x = e.clientX;
    curpos.y = e.clientY;

    var trurl = "http://www.google.com/dictionary/json?callback=dict_cb&q="+
                seltext +
                "&sl=" + sourceLanguage +
                "&tl=" + targetLanguage +
                "&restrict=pr%2Cde&client=te";

    encodeURI(trurl);

    GM_xmlhttpRequest( {
        method : "GET",
        url : trurl.toString(),
        onload : function (result) {
            eval(result.responseText)//run callback
        }
    });
}
function keyproc(e) {
    if (e.charCode == 100)
        dcount++;
    else
        dcount=0;

    if(dcount==2){
        flag_switch=flag_switch?false:true;
        dcount=0;
    }
}
// Add keypress event handler
document.addEventListener('keypress', keyproc, false);
document.addEventListener('mouseup', mouseproc, false);
