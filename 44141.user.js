// Couchsurfing: Hello in Every Language
// Version 1.0
// 2009 March 12
// 2009 Daniel Ricciotti
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// CS username: Floyd8
// CS profile: http://www.couchsurfing.com/people/floyd8/

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script!
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CouchSurfing: Neutral References", and click Uninstall.
//
// -------------------------------------------------------------------- 

// ==UserScript==
// @name           Couchsurfing.com: Say Hello
// @namespace      http://ongiantshoulders.tumblr.com/
// @description    Adds "hello" after the languages of a CS profile, in that language
// @include        http://www.couchsurfing.com/people/*
// @include        http://www.couchsurfing.com/profile.html?id=*
// @include        http://www.couchsurfing.com/profile.html
// @include        http://www.couchsurfing.com/mapsurf.html?*
// @include        http://www.couchsurfing.com/* 
// ==/UserScript==

var textToTranslate = "Hello";
var srcLanguage = "en";

var languageAfterTranslationSet = {
  'AFRIKAANS' : 'af',
  'ALBANIAN' : 'sq',
  'AMHARIC' : 'am',
  'ARABIC' : 'ar',
  'ARMENIAN' : 'hy',
  'AZERBAIJANI' : 'az',
  'BASQUE' : 'eu',
  'BELARUSIAN' : 'be',
  'BENGALI' : 'bn',
  'BIHARI' : 'bh',
  'BULGARIAN' : 'bg',
  'BURMESE' : 'my',
  'CATALAN' : 'ca',
  'CHEROKEE' : 'chr',
  'CHINESE' : 'zh',
  'CHINESE_SIMPLIFIED' : 'zh-CN',
  'CHINESE_TRADITIONAL' : 'zh-TW',
  'CROATIAN' : 'hr',
  'CZECH' : 'cs',
  'DANISH' : 'da',
  'DHIVEHI' : 'dv',
  'DUTCH': 'nl',  
  'ENGLISH' : 'en',
  'ESPERANTO' : 'eo',
  'ESTONIAN' : 'et',
  'FILIPINO' : 'tl',
  'FINNISH' : 'fi',
  'FRENCH' : 'fr',
  'GALICIAN' : 'gl',
  'GEORGIAN' : 'ka',
  'GERMAN' : 'de',
  'GREEK' : 'el',
  'GUARANI' : 'gn',
  'GUJARATI' : 'gu',
  'HEBREW' : 'iw',
  'HINDI' : 'hi',
  'HUNGARIAN' : 'hu',
  'ICELANDIC' : 'is',
  'INDONESIAN' : 'id',
  'INUKTITUT' : 'iu',
  'ITALIAN' : 'it',
  'JAPANESE' : 'ja',
  'KANNADA' : 'kn',
  'KAZAKH' : 'kk',
  'KHMER' : 'km',
  'KOREAN' : 'ko',
  'KURDISH': 'ku',
  'KYRGYZ': 'ky',
  'LAOTHIAN': 'lo',
  'LATVIAN' : 'lv',
  'LITHUANIAN' : 'lt',
  'MACEDONIAN' : 'mk',
  'MALAY' : 'ms',
  'MALAYALAM' : 'ml',
  'MALTESE' : 'mt',
  'MARATHI' : 'mr',
  'MONGOLIAN' : 'mn',
  'NEPALI' : 'ne',
  'NORWEGIAN' : 'no',
  'ORIYA' : 'or',
  'PASHTO' : 'ps',
  'PERSIAN' : 'fa',
  'POLISH' : 'pl',
  'PORTUGUESE' : 'pt-PT',
  'PUNJABI' : 'pa',
  'ROMANIAN' : 'ro',
  'RUSSIAN' : 'ru',
  'SANSKRIT' : 'sa',
  'SERBIAN' : 'sr',
  'SINDHI' : 'sd',
  'SINHALESE' : 'si',
  'SLOVAK' : 'sk',
  'SLOVENIAN' : 'sl',
  'SPANISH' : 'es',
  'SWAHILI' : 'sw',
  'SWEDISH' : 'sv',
  'TAJIK' : 'tg',
  'TAMIL' : 'ta',
  'TAGALOG' : 'tl',
  'TELUGU' : 'te',
  'THAI' : 'th',
  'TIBETAN' : 'bo',
  'TURKISH' : 'tr',
  'UKRAINIAN' : 'uk',
  'URDU' : 'ur',
  'UZBEK' : 'uz',
  'UIGHUR' : 'ug',
  'VIETNAMESE' : 'vi',
  'UNKNOWN' : ''
};
function translateIt( text, element, srcLang, destLang) {
    GM_xmlhttpRequest ({
        method:	'GET',
        url:	'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=' + text + '&langpair=' + srcLang + '%7C' + destLang,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8.2',
            'Referer': 'http://www.dhruvasagar.net/',
        },
        onload: function(req) {
            var res = eval( '(' + req.responseText + ')' );
            if ( res.responseData.translatedText ) {
               str = " . . . . . . . . . . . . . . <i><b> " + res.responseData.translatedText + "</b></i>";
               element.innerHTML += str;
            }
        }
    });
}
function parseLanguageList(ul)
{
    var list = ul.getElementsByTagName("li");
    var re = /^([<strong>]*)([\w]*).*<sup>/;
    for(var i=0; i<list.length;i++)
    {
        Array = re.exec(list[i].innerHTML);
        var destLanguageAbbr = getAbbr(Array[2]);
        translateIt(textToTranslate, list[i], srcLanguage, destLanguageAbbr);
    }
}
function getAbbr(a)
{
    uppr = a.toUpperCase();
    abbr = languageAfterTranslationSet[uppr];
    GM_log(uppr + " "+abbr);
    return abbr;
}
var ulList = document.getElementsByTagName("ul");
for (var i=0; i<ulList.length; i++)
{
  if ( ulList[i].getAttribute("class") == "languages"){
    parseLanguageList(ulList[i]);
    break;
  }
}
GM_log("---------DONE!---------");