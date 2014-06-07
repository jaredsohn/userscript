// ==UserScript==
// @name           Twitter Translator
// @namespace      http://www.unfindable.net/
// @description    This script will translate tweets one by one. Destination language is determined by the web browser language settings. Internal translator uses Google AJAX Language API. This script will not work after November 2011, because Google Translate API will be shut off on December 1, 2011. You can use Bing version instead of this script. http://userscripts.org/scripts/show/107283
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        2.2
// ==/UserScript==
//
// auther          Unfindable.net http://www.unfindable.net/
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//

var targetXpath='//div[contains(concat(" ",normalize-space(@class)," "), " tweet-text ")]';

//http://labs.unfindable.net/google-languages.html
var languages={af:"AFRIKAANS", sq:"ALBANIAN", am:"AMHARIC", ar:"ARABIC", hy:"ARMENIAN", az:"AZERBAIJANI", eu:"BASQUE", be:"BELARUSIAN", bn:"BENGALI", bh:"BIHARI", bg:"BULGARIAN", my:"BURMESE", br:"BRETON", ca:"CATALAN", chr:"CHEROKEE", zh:"CHINESE", 'zh-CN':"CHINESE_SIMPLIFIED", 'zh-TW':"CHINESE_TRADITIONAL", co:"CORSICAN", hr:"CROATIAN", cs:"CZECH", da:"DANISH", dv:"DHIVEHI", nl:"DUTCH", en:"ENGLISH", eo:"ESPERANTO", et:"ESTONIAN", fo:"FAROESE", tl:"TAGALOG", fi:"FINNISH", fr:"FRENCH", fy:"FRISIAN", gl:"GALICIAN", ka:"GEORGIAN", de:"GERMAN", el:"GREEK", gu:"GUJARATI", ht:"HAITIAN_CREOLE", iw:"HEBREW", hi:"HINDI", hu:"HUNGARIAN", is:"ICELANDIC", id:"INDONESIAN", iu:"INUKTITUT", ga:"IRISH", it:"ITALIAN", ja:"JAPANESE", jw:"JAVANESE", kn:"KANNADA", kk:"KAZAKH", km:"KHMER", ko:"KOREAN", ku:"KURDISH", ky:"KYRGYZ", lo:"LAOTHIAN", la:"LATIN", lv:"LATVIAN", lt:"LITHUANIAN", lb:"LUXEMBOURGISH", mk:"MACEDONIAN", ms:"MALAY", ml:"MALAYALAM", mt:"MALTESE", mi:"MAORI", mr:"MARATHI", mn:"MONGOLIAN", ne:"NEPALI", no:"NORWEGIAN", oc:"OCCITAN", or:"ORIYA", ps:"PASHTO", fa:"PERSIAN", pl:"POLISH", pt:"PORTUGUESE", 'pt-PT':"PORTUGUESE_PORTUGAL", pa:"PUNJABI", qu:"QUECHUA", ro:"ROMANIAN", ru:"RUSSIAN", sa:"SANSKRIT", gd:"SCOTS_GAELIC", sr:"SERBIAN", sd:"SINDHI", si:"SINHALESE", sk:"SLOVAK", sl:"SLOVENIAN", es:"SPANISH", su:"SUNDANESE", sw:"SWAHILI", sv:"SWEDISH", syr:"SYRIAC", tg:"TAJIK", ta:"TAMIL", tt:"TATAR", te:"TELUGU", th:"THAI", bo:"TIBETAN", to:"TONGA", tr:"TURKISH", uk:"UKRAINIAN", ur:"URDU", uz:"UZBEK", ug:"UIGHUR", vi:"VIETNAMESE", cy:"WELSH", yi:"YIDDISH", yo:"YORUBA", '':"UNKNOWN"};

var entries;
var acceptLanguage;

function translate() {
  entries=document.evaluate(targetXpath,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  
  if (entries.snapshotLength!=0) {
    translateEntry(0);
  }
}

function translateEntry(i) {
  if (entries.snapshotLength<=i) return;

  var item=entries.snapshotItem(i);
  
  //If the tweet already has been translated, then translate the next tweet.
  if (item.className.indexOf("translated")!=-1) {
    translateEntry(i+1);
    return;
  }
  
  //else translate this tweet.
  item.className+=" translated";
  
  var request={
    method:"GET",
    url:"http://ajax.googleapis.com/ajax/services/language/translate?v=1.0"
      +"&langpair=%7C"+acceptLanguage+"&q="+encodeURIComponent(item.innerHTML),
    onload:function(response) {
      if (response) {
        var obj=eval("("+response.responseText+")");
        if (obj.responseData) {
          var sourceLang=obj.responseData.detectedSourceLanguage;
          if (sourceLang!=acceptLanguage) {
            item.innerHTML=obj.responseData.translatedText+"<br /><br />"
              +"<span style='font-weight:bold;'>["+languages[sourceLang]+"]</span> "+item.innerHTML;
          }
        }
        else if (obj.responseDetails) {
          //-----------------------------------
          // Error message won't be translated.
          item.innerHTML="<span style='color:red; font-size:small;'>"
            +obj.responseDetails+"</span><br /><br />"+item.innerHTML;
          //-----------------------------------
          //-----------------------------------
          /* Error message would be translated.
          if (acceptLanguage=="en") { // Error message will be translated.
            item.innerHTML="<span style='color:red; font-size:small;'>"
              +obj.responseDetails+"</span><br /><br />"+item.innerHTML;
          }
          else { 
            var request2={
              method:"GET",
              url:"http://ajax.googleapis.com/ajax/services/language/translate?v=1.0"
                +"&langpair=en%7C"+acceptLanguage+"&q="+encodeURI(obj.responseDetails),
              onload:function(response2) {
                var obj2=eval("("+response2.responseText+")");
                if (obj2.responseData) {
                  item.innerHTML="<span style='color:red; font-size:small;'>"
                    +obj2.responseData.translatedText+"</span><br /><br />"+item.innerHTML;
                }
                translateEntry(i+1);
              }
            };
            GM_xmlhttpRequest(request2);
            return;
          }
          */
          //-----------------------------------
        }
      }
      translateEntry(i+1);
    }
  };
  GM_xmlhttpRequest(request);
}

var langRequest={
  method:"GET",
  url:"http://labs.unfindable.net/headers.php",
  onload:function(headers) {
    var json=eval("("+headers.responseText+")");
    acceptLanguage=json["Accept-Language"].split(",")[0].split("-")[0];
    setInterval(translate, 5000);
  }
};
GM_xmlhttpRequest(langRequest);
