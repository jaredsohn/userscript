// ==UserScript==
// @name           Diaspora Translate
// @namespace      http://userscripts.org/users/dmorley
// @description    Google Ajax Api Auto Translate for Diaspora
// @include        https://diasp.org*
// @include        https://joindiaspora.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=91276
// ==/UserScript==
// version         3.4
// original -auther          Unfindable.net http://www.unfindable.net///
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Modified for diasp.org by David Morley on Diaspora* I am davidmorley@diasp.org
// If you want your pod listed just ask me!

//hack for chrome to save values
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
//check for apikey and use it or use mine
if (GM_getValue("apikey")) {
  var apikey = GM_getValue("apikey");
  } else {
  var apikey = 'AIzaSyBjPc7bTxAupeVpGUKcl5iSj1bzUw59jAg';
}
//added check on anything with src=http and change to https, add report to bottom of aspects pane
var src = document.evaluate("//*[starts-with(@src,'http://')]", 
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var main, newElement;
main = document.getElementById('home_user_badge');
  for (var i = 0; i < src.snapshotLength; i++) 
  {
    // We are going to replace all http src attributes to the https ones this may break things if you have a non ssl friend and you want that.
    var elm = src.snapshotItem(i);
	if (GM_getValue("imgssl") == "0") {
    var secure = elm.src.replace("http://","https://");
	} else {
	var secure = elm.src.replace("http://","http://");
	}
    elm.style.border = '2px dotted #FF6600';
    elm.src = secure;
  }
  //give users option to show and not show images
  if (main) {
  newElement = document.createElement('div');
  newElement.setAttribute('id', 'sslimg');
  newElement.style.backgroundColor = '#f5f5f5';
  newElement.style.borderTop = '1px solid #ddd';
  newElement.style.borderBottom = '1px solid #ddd';
  newElement.style.borderLeft = '1px solid #ddd';
  newElement.style.marginBottom = '10px';
  newElement.style.padding = '2px 0 2px 2px';
  if (GM_getValue("imgssl") == "0") {
  newElement.innerHTML = '<input style="font-size:10px" type=submit id="bob">&nbsp;<a>Non-SSL images are highlighted and forced to SSL (some will not show up)</a><br>Allow Non-SSL Images: <input id="greasemonkeyButton2" style="display:inline" type="checkbox" value="togglesslimg">';
  } else {
  newElement.innerHTML = '<a>Non-SSL images are highlighted and shown</a><br>Block Non-SSL Images: <input id="greasemonkeyButton2" style="display:inline" type="checkbox" value="togglesslimg">';
  }
  if (!GM_getValue("apikey")) {
  newElement.innerHTML+= '<div id="apikeydiv"><br><br>Google API has a low limit and you will get limit issues, you should get your own <a target="_new" href="https://code.google.com/apis/console/">Google Translate</a> api key and add it here<br><input style="font-size:10px;width:175px" type=text name=apikey id="apikey"><input style="font-size:10px" type=submit id="apikeybutton" value="Save"></div>';
  } else
  {
  newElement.innerHTML+= '<div id="delete" style="opacity:0.5;font-size:9px;"><a title="'+GM_getValue("apikey")+'">Delete Google Translate Api key</a></div>';
  }
  main.parentNode.insertBefore(newElement, main.nextSibling);
  }
  //find transatable content
var targetXpath='//div[@class="content"]//span[@class="ltr"] |' + '//div[@class="content"]//p';
var languages={af:"AFRIKAANS", sq:"ALBANIAN", am:"AMHARIC", ar:"ARABIC", hy:"ARMENIAN", az:"AZERBAIJANI", eu:"BASQUE", be:"BELARUSIAN", bn:"BENGALI", bh:"BIHARI", bg:"BULGARIAN", my:"BURMESE", br:"BRETON", ca:"CATALAN", chr:"CHEROKEE", zh:"CHINESE", 'zh-CN':"CHINESE_SIMPLIFIED", 'zh-TW':"CHINESE_TRADITIONAL", co:"CORSICAN", hr:"CROATIAN", cs:"CZECH", da:"DANISH", dv:"DHIVEHI", nl:"DUTCH", en:"ENGLISH", eo:"ESPERANTO", et:"ESTONIAN", fo:"FAROESE", tl:"TAGALOG", fi:"FINNISH", fr:"FRENCH", fy:"FRISIAN", gl:"GALICIAN", ka:"GEORGIAN", de:"GERMAN", el:"GREEK", gu:"GUJARATI", ht:"HAITIAN_CREOLE", iw:"HEBREW", hi:"HINDI", hu:"HUNGARIAN", is:"ICELANDIC", id:"INDONESIAN", iu:"INUKTITUT", ga:"IRISH", it:"ITALIAN", ja:"JAPANESE", jw:"JAVANESE", kn:"KANNADA", kk:"KAZAKH", km:"KHMER", ko:"KOREAN", ku:"KURDISH", ky:"KYRGYZ", lo:"LAOTHIAN", la:"LATIN", lv:"LATVIAN", lt:"LITHUANIAN", lb:"LUXEMBOURGISH", mk:"MACEDONIAN", ms:"MALAY", ml:"MALAYALAM", mt:"MALTESE", mi:"MAORI", mr:"MARATHI", mn:"MONGOLIAN", ne:"NEPALI", no:"NORWEGIAN", oc:"OCCITAN", or:"ORIYA", ps:"PASHTO", fa:"PERSIAN", pl:"POLISH", pt:"PORTUGUESE", 'pt-PT':"PORTUGUESE_PORTUGAL", pa:"PUNJABI", qu:"QUECHUA", ro:"ROMANIAN", ru:"RUSSIAN", sa:"SANSKRIT", gd:"SCOTS_GAELIC", sr:"SERBIAN", sd:"SINDHI", si:"SINHALESE", sk:"SLOVAK", sl:"SLOVENIAN", es:"SPANISH", su:"SUNDANESE", sw:"SWAHILI", sv:"SWEDISH", syr:"SYRIAC", tg:"TAJIK", ta:"TAMIL", tt:"TATAR", te:"TELUGU", th:"THAI", bo:"TIBETAN", to:"TONGA", tr:"TURKISH", uk:"UKRAINIAN", ur:"URDU", uz:"UZBEK", ug:"UIGHUR", vi:"VIETNAMESE", cy:"WELSH", yi:"YIDDISH", yo:"YORUBA", '':"UNKNOWN"};
var entries;
var acceptLanguage;
var translate=function() {
  entries=document.evaluate(targetXpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  if (entries.snapshotLength!=0) {
    translateEntry(0);
  }
};
//make the translate call
function translateEntry(i) {
  if (entries.snapshotLength<=i) return;
  var item=entries.snapshotItem(i);
  if (item.className.indexOf("translated")!=-1) {
    translateEntry(i+1);
    return;
  }
  //let the dom know its done this one already
  item.className+=" translated";
  var text=item.innerHTML.replace(/<[^>]+>(.*)<\/[^>]+>/g, "").replace(/#/g, "").replace(/@/g, "");
  var count = text.replace(/^\s*|\s*$/g,'');
//save on api calls and not bother with <7 posts
if (count.length>7) {
  if (navigator.appName == 'Netscape')
  var language = navigator.language;
else
var language = navigator.browserLanguage;
acceptLanguage=language.split("-")[0];
 var request={
   method:"GET",
	 url:"https://www.googleapis.com/language/translate/v2?key="+apikey
     +"&target="+acceptLanguage+"&q="+encodeURI(text),
   onload:function(response) {
     if (response) {
	   var jsObject = JSON.parse(response.responseText);
       if (jsObject.error) {
         item.innerHTML="<span style='color:red; font-size:small;'>"
           +jsObject.error.message+"</span><br /><br />"+item.innerHTML;
		   //for firebug debuggin
		   //unsafeWindow.console.log(jsObject.error);
        }
//unsafeWindow.console.log(jsObject.data.translations[0].detectedSourceLanguage);
//unsafeWindow.console.log(jsObject.data.translations[0].translatedText);
	       if (jsObject.data.translations) {
        var sourceLang=jsObject.data.translations[0].detectedSourceLanguage;
         if (sourceLang!=acceptLanguage) {
           item.innerHTML="<div><span style='font-size:10px;color:#ccc;opacity:0.6;'><i>Translated from "+languages[sourceLang]+" to "
		   +languages[acceptLanguage]+":</i></span><br>"+jsObject.data.translations[0].translatedText+"</div><div style='opacity:0.4;'>"
            +item.innerHTML+"</div>";
         }
      }
      }
      translateEntry(i+1);
    }
  };
//chrome does not allow this call before version 13
  GM_xmlhttpRequest(request);
}
}
//add buttton to top of page to make it go on click
var main, newElement;
main = document.getElementById('user_menu');
if (main) {
    newElement = document.createElement('li');
    newElement.innerHTML = '<a id="greasemonkeyButton">translate</a>';
	main.insertBefore(newElement, main.childNodes[4]);
	//main.appendChild(newElement);
}
//hook button
var button = document.getElementById("greasemonkeyButton");
button.addEventListener('click',doMonkey,true); 
//do on button click
function doMonkey(){
//delay to api so it does not block
  setInterval(translate, 2000);
    if (main) {
	newElement.innerHTML = '<a id="greasemonkeyButtonworking">translating</a>';
	 var button = document.getElementById("greasemonkeyButtonworking");
	 //prevent double click, double api calls
     button.addEventListener('click',doMonkeybusy,true); 
	}
}
function doMonkeybusy(){
  alert ("Already working on this page!")
}
//option to show images or not checkbox hook
var button = document.getElementById("greasemonkeyButton2");
button.addEventListener('click',toggleimagessl,true);
//option to show images or not
function toggleimagessl(){
if (GM_getValue("imgssl") == "1") {
  GM_setValue("imgssl", "0");
}
else { 
  GM_setValue("imgssl", "1");
}
//let user know you got their click
  sslimg = document.getElementById('sslimg');
  sslimg.innerHTML = 'Setting updated, will be in effect next load';
}
//save api key for google translate
var buttony = document.getElementById("apikeybutton");
if (buttony) {
buttony.addEventListener('click',apikeysave,true);
}
function apikeysave(){
var newapikey = document.getElementById("apikey").value;
  GM_setValue("apikey", newapikey);
//let user know you got their click
  apinote = document.getElementById('apikeydiv');
  apinote.innerHTML = 'Key Saved as '+newapikey;
}
//remove key hook
var buttond = document.getElementById("delete");
if (buttond) {
buttond.addEventListener('click',keydelete,true);
}
//remove api key
function keydelete(){
  GM_deleteValue("apikey");
  //let user know it worked
  apinoted = document.getElementById('delete');
  apinoted.innerHTML = 'Key Removed';
}


