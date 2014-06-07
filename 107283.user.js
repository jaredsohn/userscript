// ==UserScript==
// @name           Twitter Translator (Bing)
// @namespace      http://www.unfindable.net/
// @description    This script will translate tweets one by one. Destination language is determined by the web browser language settings. Internal translator is Microsoft Translate V2. So, Bing AppID is needed. You can get it at http://www.bing.com/developers/createapp.aspx . For the first time you use this script, you have to enter Bing AppID. It is saved as cookie. To reset it, delete cookie whose key is "Bing_AppID".
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version         1.4
// ==/UserScript==
//
// auther          Unfindable.net http://www.unfindable.net/
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//

var targetXpath='//p[contains(concat(" ",normalize-space(@class)," "), " js-tweet-text ")]';

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
  
  var text=encodeURIComponent(item.innerHTML);
  
  var request={
    method:"GET",
    url:"http://api.microsofttranslator.com/v2/Ajax.svc/Detect?"+
      "appId=" + bingAppID + 
      "&text=" + text,
    onload:function(response) {
      if (response) {
        sourceLang=eval(response.responseText);
        if (sourceLang!=acceptLanguage) {
          var request2={
            method:"GET",
            url:"http://api.microsofttranslator.com/v2/Ajax.svc/Translate?"+
              "appId=" + bingAppID + 
              "&text=" + text + 
              "&contentType=" + encodeURI("text/html") + 
              "&from=" + sourceLang + 
              "&to=" + acceptLanguage,
            onload:function(response2) {
              item.innerHTML=eval(response2.responseText) + "<br /><br />"+
              "<span style='font-weight:bold;'>["+languages[sourceLang]+"]</span> "+item.innerHTML;
              translateEntry(i+1);
            }
          };
          GM_xmlhttpRequest(request2);
        }
      }
    }
  };
  GM_xmlhttpRequest(request);
}

var bingAppID=document.cookie.replace(/^.*Bing_AppID=(\w+)\W?.*$/, '$1');

if (bingAppID=="" || 160 < bingAppID.length) {
  bingAppID=prompt("Please enter Bing AppID.\nYou can get it at http://www.bing.com/developers/createapp.aspx");
  if (bingAppID!=null) {
    document.cookie
            = "Bing_AppID" + '=' + bingAppID + '; '
            + 'expires=Tue, 1-Jan-2030 00:00:00 GMT; '
            + 'path=/; ';
    alert('Bing AppID is saved as cookie.');
    location.reload(true);
  }
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

if (bingAppID!=null) {
  GM_xmlhttpRequest(langRequest);
}
