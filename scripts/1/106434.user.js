// ==UserScript==
// @name           Power - Italy
// @version        Extra Lux
// @namespace      Asriels
// @description    Kingdom of Camelot
// @homepage       http://asriels.blogspot.com

// @include        *apps.facebook.com/kingdomsofcamelot*
// @include        *kingdomsofcamelot.com/*main_src.php*
// @include        *kingdomsofcamelot.com/*newgame_src.php*
// @include        *facebook.com/connect/uiserver.php*
// @include        *kingdomsofcamelot.com/*standAlone.php*
// @include        http://www.kabam.com/games/kingdoms-of-camelot/*       
// @require        

// @resource       URL_CASTLE_BUT         http://imageshack.us/photo/my-images/847/castello1.png/
// @resource       URL_CASTLE_BUT_SEL     http://imageshack.us/photo/my-images/121/castello2.png/
// @resource       URL_PROVINCE_MAP       http://imageshack.us/photo/my-images/714/mappak.png/
// ==/UserScript==

var Version = 'MADE IN ITALY';
// JSON
var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;
// EINSTELLUNG
var Options = {
  widescreen   : false,
  includeWachturm : true,
  includeRessis : true,
  includeNahrung : true,
  includeNahrungUnten : false,
  includeTruppen : true,
  includeInfos : true,
  includeCity  : true,
  includeMarching:true,
  includeTraining:false,
  encRemaining : true,
  maxIdlePop   : false,
  fixTower     : true,
  fixTower2    : true,
  fixMapDistance: true,
  fixMsgCount  : true,
  fixWarnZero  : true,
  enhanceARpts : true,
  allowAlterAR : true,
  enhanceMsging : true,
  enableFoodWarn : true,
  foodWarnHours : 24,
  enableFoodChatWarn : false,
  foodChatWarnHours : 4,
  lastVersion : null,
  hideOnGoto : true,
  chatTop : '-605px',
  chatLeft : '760px',
  chatHoehe :  '720px',
chatHoeheL : '580px',
widewidth : '1220px',
  currentTab : false,
  gmtClock : true,
  chatEnhance : true,
  fixKnightSelect : true,
  attackCityPicker : true,
  mapCoordsTop : true,
  dispBattleRounds : true,
  reportDeleteButton : true,
  srcSortBy    : 'level',
  srcdisttype  : 'quadrant',
  srcAll       : true,
  srcMinLevel  : 4,
  srcMaxLevel  : 7,
  wildType     : 1,
  srcScoutAmt  : 1,
  minmight     : 1,
  MightSrc     : 500000,
  unownedOnly  : true,
  mistedOnly   : false,
  hostileOnly  : false,
  friendlyOnly : false,
  alliedOnly   : false,
  unalliedOnly : false,
  neutralOnly  : false,
  pbWinIsOpen  : false,
  pbWinDrag    : true,
  pbWinPos     : {},
  pbTrackOpen  : true,
  pbKillFairie : true,
  pbGoldHappy  : 100,
  pbGoldEnable : true,
  pbEveryEnable: false,
  pbEveryMins  : 30,
  pbChatOnRight: true,
  pbWideMap    : false,
  alertConfig  : {aChat:false, aPrefix:'!!! ATTENZIONE ATTACCO !!!', scouting:false, wilds:false,  defend:false, minTroops:1, spamLimit:10, lastAttack:0, barbautoswitch:false, raidautoswitch: {}, },
  alertSound   : {enabled:false, soundUrl:DEFAULT_ALERT_SOUND_URL, repeat:true, playLength:20, repeatDelay:0.5, volume:100, alarmActive:false, expireTime:0},
  includeMight       : false,
  includeAlliance    : false,
  includeCityName    : false,
  defendMessage      : ' *** Le mie truppe sono in difesa *** ',
  hideMessage        : ' *** Le mie truppe sono nel santuario ***',
  celltext     : {atext:false, provider:0, num1:"000", num2:"000", num3:"0000"},
  spamconfig   : {aspam:false, spamvert:'Ciao Globale', spammins:'10', atime:2},
  spamconfiga  : {aspama:false, spamverta:'', spamminsa:'60', atimea:2},
  giftDomains  : {valid:false, list:{}},
  giftDelete   : 'e',
  currentTab   : null,
  transportinterval : 60,
  minwagons    : 100,
  maxwagons          : 200000,
  wagontype          : 9,
  foodunits          : 'Quantità',
  goldunits          : 'Quantità',
  lasttransport: 0,
  reassigninterval: 60,
  lastreassign : 0,
  HelpRequest  : false,
  DeleteRequest: false,
  MapShowExtra : false,
  enableBarbSummary  : true,
  lastBarbHit        : 0,
  barbHitsKeep       : 1000,
  enableTowerAlert : false,
  enableTowerAlertEN : false,
  enableFoodChatAlert : false,
  enableFoodChatAlertEN : false,
};
// GLOBALE EINSTELLUNG
var GlobalOptions = {
  pbWatchdog   : true,
  pbWideScreen : true,
  pbWideScreenStyle : 'normal',
autoPublishGamePopups : false,
autoPublishPrivacySetting : 80,
};
// ANGRIFF EINSTELLUNG
var AttackOptions = {
  LastReport        : 0,
  MsgEnabled            : false,
  MsgInterval          : 1,
  Method          : "distance",
  SendInterval      : 30,
  MarchInt        : 1,
  MaxDistance           : 40,
  RallyClip        : 0,
  Running           : false,
  BarbsFailedKnight    : 0,
  BarbsFailedRP     : 0,
  BarbsFailedTraffic     : 0,
  BarbsFailedVaria    : 0,
  BarbsTried        : 0,
  DeleteMsg             : true,
  DeleteMsgs0      : false,
  DeleteMsgW			: false,
  Foodstatus      : {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  MsgLevel          : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true},
  BarbsDone         : {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  BarbNumber        : {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  Levels          : {1:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},2:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},3:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},4:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},5:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},6:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},7:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false}},
  Troops          : {1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},3:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},4:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},5:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},6:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},7:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},8:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},9:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},10:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0}},
  MinDistance      : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0},
  Distance              : {1:750,2:750,3:750,4:750,5:750,6:750,7:750,8:750,9:750,10:750}  
};
// WAPPEN EINSTELLUNG
var CrestOptions = {
  Running   : false,
  CrestCity : 0,
  RoundOne  : true,
  RoundTwo  : true,
  lastRoundTwo : 0,
  X:0,
  Y:0,
  R1MM:0,
  R1Ball:0,
  R1Cat:0,
  R2MM:0,
  R2Pike:0,
  R2Sword:0,
  R2Arch:0,
  R2Ball:0,
  R2Ram:0,
  R2Cat:0,
};
// TRAINING EINSTELLUNG
var TrainOptions = {
Running   : 		false,
Troops: 			{1:0,2:0,3:0,4:0,5:0,6:0,7:0},
Threshold: 		{1:500,2:500,3:500,4:500,5:500,6:500,7:500},
Max: 		{1:0,2:0,3:0,4:0,5:0,6:0,7:0},
Workers: 		{1:0,2:0,3:0,4:0,5:0,6:0,7:0},
Keep:				{1:{Food:0,Wood:0,Stone:0,Ore:0},2:{Food:0,Wood:0,Stone:0,Ore:0},3:{Food:0,Wood:0,Stone:0,Ore:0},4:{Food:0,Wood:0,Stone:0,Ore:0},5:{Food:0,Wood:0,Stone:0,Ore:0},6:{Food:0,Wood:0,Stone:0,Ore:0},7:{Food:0,Wood:0,Stone:0,Ore:0}},
Enabled:			{1:false,2:false,3:false,4:false,5:false,6:false,7:false},
SelectMax:			{1:false,2:false,3:false,4:false,5:false,6:false,7:false},
Resource:		{1:true,2:true,3:true,4:true,5:true,6:true,7:true},
UseIdlePop:		{1:true,2:true,3:true,4:true,5:true,6:true,7:true},
};
readGlobalOptions ();
var nHtml={
     FindByXPath:function(obj,xpath,nodetype) {
     if(!nodetype){
       nodetype = XPathResult.FIRST_ORDERED_NODE_TYPE;
     }

     try {
       var q=document.evaluate(xpath,obj,null,nodetype,null);
     } catch(e) {
      GM_log('bad xpath:'+xpath);
    }
    if(nodetype == XPathResult.FIRST_ORDERED_NODE_TYPE){
       if(q && q.singleNodeValue) { return q.singleNodeValue; }

     }else{
      if(q){
        return q;
      }
     }
     return null;
    },
     ClickWin:function(win,obj,evtName) {
     var evt = win.document.createEvent("MouseEvents");
    evt.initMouseEvent(evtName, true, true, win,
      0, 0, 0, 0, 0, false, false, false, false, 0, null);
    return !obj.dispatchEvent(evt);
     },
    Click:function(obj) {
     return this.ClickWin(window,obj,'click');
     },
     ClickTimeout:function(obj,millisec) {
    window.setTimeout(function() {
      return nHtml.ClickWin(window,obj,'click');
    },millisec+Math.floor(Math.random()*500));
    },
  SetSelect:function(obj,v) {
    for(var o=0; o<obj.options.length; o++) {
      if(v==obj.options[o].value) { obj.options[o].selected=true; return true; }
    }
    return false;
     },
   }
if (document.URL.search(/apps.facebook.com\/kingdomsofcamelot/i) >= 0){
    facebookInstance ();
     //return;
   }
   if (document.URL.search(/kingdomsofcamelot.com/i) >= 0){
    kocWideScreen ();
   }
if (document.URL.search(/facebook.com\/connect\/uiserver.php/i) >= 0){
     HandlePublishPopup ();
     //return;
   }
function kocWideScreen(){
function setWide (){
     var kocFrame = parent.document.getElementsByName('kofc_main_canvas');
    if (!kocFrame){
      setTimeout (setWide, 1000);
      return;
     }
    for(i=0; i<kocFrame.length; i++){
      if(kocFrame[i].tagName == 'IFRAME'){
         kocFrame[i].style.width = '100%';
        var style = document.createElement('style')
        style.innerHTML = 'body {margin:0; width:100%; !important;}';
        kocFrame[i].parentNode.appendChild(style);
         break;
       }
     }
    }
    kocWatchdog ();
    if (GlobalOptions.pbWideScreen)
      setWide();
   }
/***  Run only in "apps.facebook.com" instance ... ***/

function facebookInstance (){
    function setWide (){
    var iFrame = document.getElementById('iframe_canvas');
     if (!iFrame){
      setTimeout (setWide, 1000);
      return;
     }
    iFrame.style.width = '100%';
    while ( (iFrame=iFrame.parentNode) != null)
      if (iFrame.tagName=='DIV')
       iFrame.style.width = '100%';
       try{
        document.getElementById('rightCol').parentNode.removeChild(document.getElementById('rightCol'));
         document.getElementById('leftColContainer').parentNode.removeChild(document.getElementById('leftColContainer'));
       } catch (e){
         // toolkit may have removed them already!
      }
       var e = document.getElementById('mainContainer');
    if(e){
       if (GlobalOptions.pbWideScreenStyle=="normal") e.parentNode.style.minWidth = '100%';
       if (GlobalOptions.pbWideScreenStyle=="wide") e.parentNode.style.width = '1520px';
       if (GlobalOptions.pbWideScreenStyle=="ultra") e.parentNode.style.width = '1900px';
       for(i=0; i<e.childNodes.length; i++){
         if(e.childNodes[i].id == 'contentCol'){
          e.childNodes[i].style.margin = '0px';
           e.childNodes[i].style.paddingTop = '5px';
           break;
        }
       }
    }
     var e = document.getElementById('pageHead');
    if(e){
      e.style.width = '80%';
      e.style.margin = '0 10%';
    }
    var e = document.getElementById('bottomContent');
    if(e){
      e.style.padding = "0px 0px 12px 0px";
    }
    }
    facebookWatchdog();
    if (GlobalOptions.pbWideScreen)
       setWide();
  }

 
 function HandlePublishPopup() {
    if(GlobalOptions.autoPublishGamePopups){
      // Check the app id (we only want to handle the popup for kingdoms of camelot)
      var FBInputForm = document.getElementById('uiserver_form');
       if(FBInputForm){
         var channel_input = nHtml.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
         if(channel_input){
           var current_channel_url = channel_input.value;
           if (current_channel_url.match(/http:\/\/.{0,100}kingdomsofcamelot\.com\/.*?\/cross_iframe\.htm/i)) {
          var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'publish')]");
            var privacy_setting = nHtml.FindByXPath(FBInputForm,".//input[@type='hidden' and contains(@name, 'privacy_data') and contains(@name, 'value')]");
          if(publish_button && privacy_setting){
               //80: Everyone
               //50: Friends of Friends
               //40: Friends Only
               //10: Only Me
              privacy_setting.value = GlobalOptions.autoPublishPrivacySetting;
              nHtml.Click(publish_button);
          }
          }
      }
      }
      setTimeout(HandlePublishPopup, 1000);
    }
  }
// TAB ANORDNUNG
var toStats = 1;
var toHeiligtum = 2;
var toBau = 3;
var toAusbildung = 4;
var toTransport = 5;
var toTruppen = 6;
var toVerstaerken = 7;

var toSuchen = 8;
var toSpieler = 9;
var toRitter = 10;
var toWildnisse = 11;
var toAngriff = 12;
var toFarmen = 13;
var toMarsch = 14;

var toWappen = 15;
var toGeschenke = 16;
var toMitteilung = 17;
var toAllianz = 18;
var toSpam = 19;
var toInfo = 20;
var toGebaeude = 21;

var toKaserne = 22;
var toFake = 23;
var toEinstellung = 24;
var toTs3 = 25;
var toIM = 26;
var toLog = 27;


var toSample = 28;
var toAttack = 29;


// TEST TABS
var ENABLE_TEST_TAB = true;
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var DEBUG_BUTTON = false;
var DEBUG_TRACE_DRAG = false;
var DEBUG_TRACE_AJAX = false;
var DISABLE_BULKADD_LIST = false;
var DISABLE_POST_KNIGHT_SKILLS = false;
var DISABLE_POST_DEFENSES = false;
var ENABLE_ATTACK_TAB = false;
var ENABLE_SAMPLE_TAB = false;
var ENABLE_GM_AJAX_TRACE = false;
var ENABLE_ALERT_TO_CHAT = false;
var ENABLE_TRADER_TAB = true;
var ENABLE_WILDS_TAB = true;
var ENABLE_KNIGHTS_TAB = true;
var ENABLE_INFO_TAB = true;
var ENABLE_WIKIA_TAB = true;
var SEND_ALERT_AS_WHISPER = true;
var TEST_WIDE = false;

// VARS
var Cities = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var currentName = 'Città';
var mainPop;
var pbStartupTimer = null;
var CPopUpTopClass = 'pbPopTop';
var KOCversion = null;
var firefoxVersion = getFirefoxVersion();
var barbHit = [];
var TrainCity = 0;
// KARTE
var URL_CASTLE_BUT = GM_getResourceURL('URL_CASTLE_BUT');
var URL_CASTLE_BUT_SEL = GM_getResourceURL('URL_CASTLE_BUT_SEL');
var URL_PROVINCE_MAP = GM_getResourceURL('URL_PROVINCE_MAP');
var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};

var MAP_DELAY = 1000;

// SOUND ALARM
var DEFAULT_ALERT_SOUND_URL = 'http://localhostr.com/file/LNCnkP3/1980.mp3';
var SWF_PLAYER_URL = 'http://localhostr.com/file/8jSMkHO/6916.mp3';
// IMG
var URL_CASTLE_BUT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAMAAAGkBsQ5AAABa1BMVEX%2F%2F8X%2F98X%2F973%2F97X%2F77X%2F7633773%2F76X377X3763%2F5q3%2F5qX%2F5pz35q335qX%2F3pz%2F3pT33pz%2F1pT%2F1oz%2F1oT31pT31oz%2FzoT%2Fznv3zoT%2FxXv%2FxXP%2FxWv3xXv3xXP%2FvWv%2FvWP3vWv3vWP%2FtWP%2FtVr%2FtVLmvWv3tWP3tVr3tVL%2FrVL%2FrUrmtWP3rVL3rUrvrVL%2FpUrvrUr%2FpULmrVrmrVL3pUr3pULmpUL3nDrepULWpVLWpUrmnDrFpUK1pVrOnDqcnFKcnEqMnEp7lHN7lGtzlGNrlGtjjEpajFpShFJSe2NChEJKe1o6hDohjDFCc1oZjDEhhDEQjDEAlDEpezoZhDEhezoQhDEAjDEpczoZezoIhDEhc0IhczoAhDEZczoIezEhazoAezEhY0IAczEAcykIazEhWkIAazEAaykIYzEhUkIAYzEAWjEAUjEAUikASjEASikAQjEAQikAOjEAOikAMTEAMSkAKSlOGAcLAAAACXBIWXMAAAsSAAALEgHS3X78AAABVklEQVQYGQXBPW4TYRiF0ee%2B3x2DRSxRIFJTGIkVUFDQIbEDlkE5%2B8kWWEKKIBSB5AohXBGUSAaCIdgz3x%2FnaARztjS3RSPodPkmfuzReLbOh1fm72a4h3kxyWgE8NXPz8%2F%2FhC%2FzRXLM3cmeqvGDl7Mfa9ztT9pvp3%2FDOpjOr7Yft9PXjPHxE%2Bl6p4SJqSq5RsL4EAtZaUAjAABoBADAt%2Fty8ovVnhQ%2Bfx%2BbDTfXQ9Bz5H7IdWGV9k588NJWrQiXjMkdly6Fo9beRap29F4QJBxTE%2Bo9bF7XuUpJsp8BAGjcATSgADOQWRsfLu8WT0%2B33wcePknfJj%2B6j3Hb17m5HQsr1%2Fm4aGBEbtp8uXPWzcSBlhYYXKunObLoOyU1jFH02oVRZNFJQ2CCko26MIrC3MAEpRdcSVkYFYzBuaAuQFFAgzFBK0GVZhYoaUYYVm8b0IAGNDr8B8ZXpEbZNGQ6AAAAAElFTkSuQmCC";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXAgMAAAHuttyYAAAACVBMVEX%2F%2F%2F8AOjEAKSnbo5E5AAAACXBIWXMAAAsSAAALEgHS3X78AAAAW0lEQVQI12NYwdAAhCsYOICwQQGEpiYwrGpgCHRgcIChUAeGqaERDBMZJRgmMCDwqlUrgHgBQ2hoAIMjiwAYOzBgxyA1ILVTQ4GggWEKK4MIK4JiYGAgiYKYAgBFlyWR9CCfyAAAAABJRU5ErkJggg%3D%3D";
var CHAT_BG_IMAGE = "data:image/gif;base64,R0lGODlhagHQAvcAAP%2F%2F5v%2F%2F1v%2F33v%2F31vf35v%2F3zvf33v%2F3xff31vf3zv%2Fv3u%2F33v%2Fv1v%2Fvzvfv1vfvzvfvxffvvffmzu%2Fmvebmvffere%2Feve%2Fete%2Fere%2Fepebevebeteberd7evd7ete%2FWpebWtd7Wtd7Wrd7WpdbWrd7Ord7OpdbOrdbOpdbFpc7FtdbFnM7FnMXFrc7FlM69rc69nM69lM69jMW9nMW9lMW9jL29nL29lM61jMW1nMW1lMW1jL21nMW1hL21lL21jMWtlLW1lL2tnL2tlL2thL2te7WthL2le72lc7WlhL2la7Wle7Wlc7Wla62le62lc7Wce7Wcc62chLWca6WcjK2cc6WchK2ca62cY6Wcc6Wca6WUhK2Ua6WUa6WUY5yUY5yMa5yMY5yMWpSMa5SMY5SMWoyMY5SEa5SEY4SEe4yEY4yEWoyEUpx7Uox7Wox7UoR7WoR7UoRzUntzY4RzSntzUntzSnNzSntrSmtrY3NrSmtjOhlrzmNaSjpjhBljxRljvRljtRlarRlapRlSnBlSlBlKjBlKhBlKexlCexlCcxlCa0o6CCE6Uhk6Yxk6WkopAEIpADopABAxQjEpEDEpCCEpMRkpMTohADEhACkhCDEZACkZACEZCCEZACEQABkQABkIABAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAagHQAgAI%2FgB1NGgAB02XJUaWKFziZEmShRAVOplIcSIUKA4fLsG4EUqVj1kqNpQosmJEJ1VGSvx4saXLlwxLTvxYReFHmSgnkqRJkabPn0CrvGypE2fFlEZLCl3I8SJEKCirZJmKNGlJIxRJjoza0CREq0eVBq0KNqdIpFo7ehQ61OVYLTSnZoGbUUoSJ0yeNJlR4EGdOGsCC37jRvAaN4gDI37DuDHjOI3dOHYcR46cyZgzI94cmfMby6BBZ34Tp7Tp0ocZFx79GPNp03LsjLZcGjRk1ZJZE278%2Bvbj3qZVH0482rQdO8DjbEZ8OnHwNaU9q9ZNOvnpzryTvzEcuLRr4MWt%2Fgev%2FpoOHdPm0zOWszkOm%2Fc3HjxY42QGChQmRNw%2FQaL%2FiRP7%2FYeCCAT%2BR6B%2B9yUYoIAKmuCgCSVEWMKDD5aAH4UOXkghCvz15yEJCoYoIgoT3gehCSRieKKEEkIogoQj3pcChx7%2Bx99%2FH%2F7H4o4RoohCCjNyaOOCAIb4YX8xJriCggDqGGGRIloo4oYaVgjjiBnGmGWSCdqIoopbhljhg1yWaeYKQJZwwoEjjHBDAgmoYcQGfRVg550DFJCnnQP0ead88tkJ56AJCEoonAUMpOiddiraAKOQRsrooZQOmqiji17qqKaLYurpp54WUGilk3IKaqiMNuAnpIiuKiqi%2F68W2uhAktYKKa13nqorpolemmukj9p6a6278kqqsH8%2B8CcEyhZwwAGMPgCBnQI1sIYRIDQAQbGbcmqqow%2BAGm64npKL6bjncituA%2BiiO1C77MYL77i5BtuXueqCqum37ALq77%2F%2B5vvuv%2F0GPLDBBhfbLr6KAkxwwacCKnC6706M67f1OhtBBBAcwOwADjgwA7tygJGEDjrkoPLKKvuwsg8w5wCzD0MMMXMOKKO8MhApsywzD0AHLfTQQc88NMxBDwHE0kwD4fPLM0dtdNRAU0200DPXXDPNWnettNc8s8yz1DPPYHYOVZNt9NE%2B6KB0z27rvDLKRa9dddBo86C21f5D5%2B3D1XjnMMPKgO8NeN12H6643joA0TXPTXstueQ%2FDPFDD5gXofkPlQuRgwQSwOGGGmecAcbpqIOxhRVWSCEF663DLrsVW9Re%2B%2By45667FVTsrvvrwPsu%2FPC2F7867Lfvfjztt9vOfPLD0%2F588dFXb73yy%2Bee%2FfXcd8%2B98eCHD%2F4ZcMxRRx1zwHHGEkQwQQcj8O%2FRRx8vMOBAHX2Iov%2F%2B%2FPfv%2F%2F8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygAxmhhyUUgQ3wy%2BALDKCAOeRPgiAMoQhHSMISmvCEKEzh%2Fxixhh6IIYOMaIEBDOBBFdrwhjjMoQ53yEMJsrAK7%2F6DXwsIQIAa9vCISEyiEpfIRAMyogtV2AP8XkBEIzbxiljMoha3%2BMA9ZGENU1RABz%2FIxTKa8YxoZCIZjBDGMYLijXCMoxznSMc62vGOeMyjHvfIxz768Y%2BADKQgB0nIQhrykG%2FcQxQZ8QIxehCRkIykJCdJyUpa8pKYzCQoGMGFNjByho%2FUpChHScpSmvKUqBRkF7gQQ0f2IZWwjKUsZ0nLWuIxCzuIIQdDacte%2BvKXwAwmIHGpSzcK85jITKYyY0nMFrhymdCMpjSnWchmPpOa2MymNrNpTWNu85vgDGcvs9CDVnpTnOhMpzozmQUimNODnYinPOdJz3ra8574zP%2BnPvfJz376858ADahAB0rQghr0oAhNqDzJ%2Bc4%2BKPShEI2oRCdK0Ypa9KIYjWc34ZnRjnr0oyANqUhHStCNOpSkKE2pSlfK0pbmk6HOHKNLZ0rTmtr0piUtZyNlitOe%2BvSnQE0pQ3fK0aAa9ahITWpBh%2BpKpTr1qVCFKlN5GtWqWvWqM4UpKE%2BK1a569asZbacuachVsJr1rGgtqTtlSFZNuPWtcI2rXOdK17ra9a54zate98rXvvr1r4ANrGAHS9jCGvatYmWrBw%2FL2MY69rGQjaxkJ0vZyro1C0Uo5mIty9nOevazoA2taAOLWc32YbSoTa1qV8va1t61CkdoqGv%2BZ0vb2tr2toGFrWxxy9ve%2Bva3qdUtUU8L3OIa97jIHaxwXZnc5jr3uc9d7hihS93qWre20t3sdbfL3e5aVrcx9SAlxkve8pr3vOhNr3rXy972uve98I2vfOdL3%2Fra9774za9%2B90veKhQBEuHVA38HTOACG%2FjACE6wghfM4PFC4QgAdqSAG0zhClv4whjOsIbt%2B%2BAIj3HDIA6xiEdM4hKztwpIgIQKXNmISbj4xTCOsYxnTOMa2%2FjGOM6xjnfM4x77%2BMdADrKQh0zkIhf5EpagxBVSTNQ88OHJUI6ylKdM5Spb%2BcpYzrKWt8zlLnv5y2AOs5jHTOYym%2FnMUH5Cilv%2BsIAF5CEPf4iznOdM5zrb%2Bc54zrOe98znPvv5z4AOtKAHTehCG%2FrQiE60nO0CCRsgwM1%2BAISkJ03pSlv60pjOtKY3zelOe%2FrToA61qEdN6lKb%2BtSoTrWqJ22FJEBiBgPoYKRXTeta2%2FrWuM61rnfN614DwgpLgAQMBCDrQBj72MhOtrKXzexmO%2FvZ0I62tKdN7Wpb%2B9rYzra2t83tbnv72A2BxE7T4AdBmPvc6E63utfN7na7%2B93wjre8503vetv73vjOt773ze9%2B%2B%2FvcRoiCh8n974Ib%2FOAIT7jCF87whjvc3EaA8LjzMIiKW%2FziGM%2B4xjfO8Y57%2FOMgD7nIR07%2F8pKb%2FOQoT7nKV87ylls8CRIXYxryQIia2%2FzmOM%2B5znfO8577%2FOdAD7rQh070ohv96EhPutKXzvSm2zzi4pY5zZ1O9apb%2FepYz7rWt871rhPCCEyWeiHGTvaym%2F3saE%2B72tfO9ra7%2Fe1wj7vc5073utv97njPu973TnawR10BMzeE4AdP%2BMIb%2FvCIT7ziF8%2F4xjv%2B8ZCPvOQnT%2FnKW%2F7ymM%2B85gcP9Q12MA%2BbD73oR0%2F60pv%2B9KhPveoFnxAAgzIPh4i97GdP%2B9rb%2Fva4z73ud8%2F73vv%2B98APvvCHT%2FziG%2F%2F4yE%2B%2B7I3ABNfTMA%2BIiL70p0%2F96lv%2F%2BtjPvva3z%2F3u%2Fnv%2F%2B%2BAPv%2FjHT%2F7ym%2F%2F86E%2B%2F9Jn%2F9znkIRHwj7%2F850%2F%2F%2Btv%2F%2FvjPv%2F73z%2F%2F%2B%2B%2F%2F%2FABiAAjiABFiABniACBh%2FftdICOB%2BivCAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCIjiCJFiCJniCEAhzABYy7rcILviCMBiDMjiDNFiDNniDOJiDOriDPNiDPviDQBiEQjiERFiERviCKtgCDtCAeXCETviEUBiFUjiFVFiFVniFLpgEUKBibeZ%2BjvCFYBiGYjiGZFiGZniGaJiGariGbNiGbviGcBiHcjiHdFiHdniHYPgDUBAJKvB6j%2FCHgBiIgjiIhFiIhniIiJiI%2F4q4iIzYiI74iJAYiZI4iZRYiZZ4iYAoBcHGAyEDB1SgAgAQiqI4iqRYiqZ4iqiYiqq4iqzYiq74irAYi7I4i7RYi7Z4i7iIix1gA1kQASk2AwLQAHjQBSeQi8Z4jMiYjMq4jMzYjM74jKi4i13wASmWAwMgjGggAtC4jdzYjd74jeAYjrlIAjfgBRmgBJDgA9qCB2WgjeL4jvAYj%2FI4j%2FTIiiJQA1iQAVMACT8gLXZABu5YjwI5kARZkAZJixsQA1dQAQLnAwnwAHZQBiNwkBRZkRZ5kfOYkAspcDdQABAQkROJkSI5kiRZkre4ATRwBR8gcDXgkSBpkjAZkzI5k%2F%2F3yAUfsI80wAASgAfZOJM%2B%2BZNAWZAj0ANecJOvNgA72ZNBuZRM2ZTcOJRFuY868AAMwJMo4JRYmZVaeYscIAMqmWJTWZVkcJVbWZZmeZameAEKuZKQMJXCOJZoGZdyqZVqqZINuS14AJdzuZd86ZMXgAM2KXA7gJdlQJZ9eZiIiZEbsAM2mWKD%2BZaGmZiSOZkCuZhXgAGOuS3%2FGJmU2ZmeCY4b4JUVkJkNsJmfeZqouY0XIJoC9wN98Y8BmZqyOZu5CAIxEJjp%2BJpKSZu82ZuxaJt2mZsPgAdrEJu%2BeZzIaYq2iZs%2B0BfEaZzJGZ3IqZFs2ZzDWZzSmZ3JqZEY0JD%2Fzomd2hmevAmc3RkJ1mkHagCd4rmenUmeU2Ce8mEHu8me9EmZ7mme7FIHYxAC9dmfk8kBMeAF5amOfrGf%2Fnmgh9mVRRkF%2BFmg%2FImgECqXobmgkfAD%2BUkGDxqhGlqWCrqSFXqhGbqhIuqUAEqhBKqfITqiKgqUtimgDHqiBrqiMvqTLZoBL5qfMTqjOgqTCUmhNCAfepCjOzqkIjmhHvqjDxCkKUqkTHqQG1ADPgqkQtqkVEqQTxqlSTqlVbqlGQmlRxoueKClXDqm4nil1BgJPyqMYkqmbNqNZsoEaAqma9qmdOqMZsqgaaqkdbqn3Gik7%2BkD8lEHGMqnhGqnNaCS%2F3AKqH7RjoXaqMr4pJeZqIHKqI5aqbm4mpEKn4uqnpbaqa%2BIqQM6qZzqqaSqiqD6oqJaqqrqihdwqB6qqHVAqas6q6jYqpkKq7JKq7o6ipCKmXGapAC5q8IqipD6AXCKpHoQrMMqrMV6rECqrMuqq72KBL%2Bal6MarZ36pFXgq0iKB19wrdhaqdNard8arrRqmRjgrMJYrua6qugKpyOzruDaroTKATuAqJFQLYLqAfSqqnV5k%2Fk6ELHKr%2F1KqnWZrgHbAPtasAarkAirr2RAsAxrqdwJpxArsRPrqKGZqRebsZYKqhYrsBHrsZW6mlpgrAm7sCTbqKtZlCFbmuy6sv%2BEOgEKmQEvawcxK7N7SrOXSa3Vogc5q7N0agEOC5bycQfQKrRDW7Rt%2BazzqrRMSrQ927TASgJQW6dS66tTWbVXS6c8251Um6xP27U6%2BrUNKaVWS7ZkSp4phqxzqrZDSp4Cl6ZhuqRwy6Ry%2B6t6erdbmrdua7d8u6PciafSsreB26SDG6cQYLiHS6TcSa0zIKWA27gr%2Brjm6ZxqMLmUO6IJ2ZiXO5yZu7mOe5u%2Bap14ELqiK7gxoAUIa7qom7ozapusm6jscrqaC7sQ2qKtW7uvi7sq2qMoS6C267syCry0C7q3S7z9abyaKqjJq7z0Camj2ZYgCr2ce6ijGbB%2BMaj%2F1ruh4yoQftG73Yug38su6Pm846ud5QuR4pu%2B%2FWmrZwq%2BddC%2B7kuftqq11Vu%2FB2oBh4qZ1Mu%2B6Ku%2F0xkDWOC%2F4Hu%2BAuyfPWrA5ku%2FCay%2BAUqN%2F4vADxy9AcrAAFzBFlzAYLmODqzB26mQ0ysQEDC8ICyeGjnC67gGAXzCqZmQHBy23OvC2QnD3PqsLUzDn2nDbRsujKvDAxzDefq2QCybC9zDDfDDRdybwEutQ5zDSyyZTay3MxzFTHzBPQysUGzFh5nCEAarVczFsjkB9zi1YLzFYjyXE8AB%2FUutZ5zGvLmxpRuoYQzHp3mwbkzHaGzHaInHzVvHfNyZfvzGgYya%2F3Kcx9u7x4W8lZYbuUmKBsW4yJ%2FJtvkqpSUgyZNctNVKxJg8l8CZAZAruZ3cnjUbylmqyKPMlJ%2FsxOFiB5ycyme5ynFammCAyrDMogQMyrPsyrZ8yz5pm%2FnIysJYy76MmBqZAU0QCY6sxMUcl5%2BczMsMyM0cy7mczG47ttPclC36AdYspdiczUsJAl4KzU4Lzp4cwaycpd9szjQawd08zL3MziIpuyi7tc4rz2gpzldgs9p7z%2Fhslvp8pCIbz%2F9ckeIcmGiavwWtlQHtxAq90FhJyfJrBgQN0QWZuDSQnxRt0VkJAl5ZnjTQF3Ww0RztlPpcno7MyyVt0hHMoCn9yv8rTZK669LxCdMxPc%2BkS9MQadM3fZHLidI1XdE9HY%2FbbMrMPNQmOcXLzNNI7aTorMyi3NQzCcM2qrdMLdVWGsHOOpxXjdUCuc3kPJzE7NUwCdZQLdZCTdbdaNaRC89qbZJmTbdj%2FdYjuc3vKddpTdfPaNezXLd6XdcBqo%2Bfi6J%2FjdPm%2BKci3dWFHY4g4AKHPdiKvdjfuAErkI%2BI7aCSbZGUbdmf%2B495ndnISNn7fNevKc2gTY%2BiLdjN%2BZGmfdrymNqJWtqf7dq4uAEscKv%2B%2BMG0DY8aoMnn2dq7LY4akJKlm9izHdy0ONw9C9nHjdyyqAH9G9uJ7Nz1CN24Pd3UPY%2F%2Fyl3cmJ3d8tjby92cDSAHY6AB3i2PX%2BvGieLX5w2PNLut6p3Ekd3eufjecyzfzU3fqmjfeYzf%2Bi2O%2FA2f%2Fv3f4Njb8C3gR03gzjjc2xrbA67g3bjdDs7eEM6Nyo2yIY3dFb6Ntm2OxyrSwL3hx6gBLCCg8GrcIr6NJG7iaAri%2BZ3iALDiCJvh%2FgzjzagBMODhv1rjNr6MOK7jNB7iPV6LP87PND7fQ66KRe7EiY2xST7iKWnkKP7kyajcUr7TL57iF%2F7hrJ3lIq4BOoCvId3lVF7lYQ6wGa7SZQ7lKkna3b3muWjl76kDTQ7nxsjgGDDnIrvOdo6KFZuwsNnntU0D%2F6yLqhCZq4I%2Bi4m7tYGe6LXYqwyaA%2BYr5I7u5%2FeKsCMDkSNb6Yp%2B6ccqsk7O6ax6qPwMsXwu6gBgAV7pofK76aj%2BqQ4rcK0e6q9uqrFOvQrr6rXOinLMoLO%2B6664sVWNpCoL7KuolgiNpDh76qJOtDa51XcQtMZ%2BijyL4a0s7dNeiuldyVqc7aqYtT7LLneA5IkO7pEg6afs7alo7pK%2BuJQO7H%2Fe7smatupuitQZsu5O7%2FVOiouuLfO%2B7%2FYe69r77wDP7wIv6Q0w7vpe8ACQtyRM8Awfig5fuO%2B%2B6xPv7l6%2B4f2O8RFPrJpMwp7d8aFouSCv296et6ttByws8g2%2Flv%2Fqjbwsn7ium%2FEVLvOYS%2FMQ3rkDevMxf5uvqps4r%2BBG%2BqKyHfMyIKAvz%2BMMH5oczNws35ULmWKE3PHTmo7%2BiAZBT%2BBPGsxWX8Imn%2B1bD8q5%2BZFYH%2FP4qMvnWfYiP67WqfQFb7m%2FnfX%2F%2FbhdL59yr98JybpSLx88eff0fcRW%2F8h%2B396Ar6h6oPZUj8WBf%2FiDf94pvPeC3%2FNRv%2FiIH%2FE6n8WM3%2FNcANJ9kflrT7pSbycJru6Xn5sFMPreXviJgvpg%2F9TWmayN792de6YZ7vkdj8eQMOZ9L%2FkYAGFjHvIdv8arHvrbuwEiL%2FxmHNRP75W6TOzkLugc4AL7jMhqTvXSP8f%2BWB7z18%2Fk2f%2F5y92tz9%2FncF%2B4lb%2F0mvyji4sGl%2Bz92M%2F60265f8v7Rh3%2Bdg7%2Fchr72Q2ctN%2FKcx3x%2Bg8QTCL5eNDADpgQABQuZNjQ4UOIESVOpFjR4kWMGTVu5NjR40eQIUNuiHEFg0AaDx7gGZNQ5EuYMWXOpFnT5k2cEEmaRBJphko9LXMOJVrU6FGkSUXuPOnzAQQ9alwqpVrV6lWsWSmCiKHlg0CCD4JO1VrW7Fm0aTly9fI1UsqVZMiqpVvX7l2qIGi0FTijgFi5eAUPJlw4pN62Pf0CnmvY8WPIhdl%2B6AnXjtDImTVvPssVS4YpA1VebszZ9GnUNtmCFv3%2BgHRq2LFlg0ScAWXBOphn7%2Bbd2yGIHV5sv8Wt2%2Fdx5KmBf65cvHRy6NEly2BOvEHu59K1b08LgjqG5g%2BwcydfHq33z02Iizdu3v17pOhZ%2F2SfHf59%2FDHlh6Y%2FPv9%2FAGGSTz368EAoQAQTXCuGz%2FhTyUD7FJRwQgBWc3Cl9ijUcMLJLmQpwg1DvK9Dp8TKUEQU8SNJuAvHSvHF%2F0j6TIn1giIBRhzhm4xGuGzM8cfydizRRSCLlM7CEj80csnkJiPwwROZlFK5GNpSz7Iop9RyMxLDem1LME9DMiz%2FwjQzszH%2FKvNMNg1Ls74245SsStbIzFJOPM0CYYUGW1szT0D%2Fz9qAzzoTgDNQRM3SYIUrWLvB0D8TlZSqRRsNzQdI75x005yYAms0TTkVlSamesIUAjvQAHFUVl%2FSoCTwInkU1cBatdWmV0361LVQb%2FV1Iw1oaDS8L381NqRgG72N11WPdVaiYLUYzsten7XWoWinBbXZa7sFIFtTcTvQW3KhFTaDygq4btxy222IAliXLdZdeieId7156W3XXl1by1ffcoVtilpuAb412YG3NdjdZIfDsuCFWW2YCUkIjrjcbCl%2B%2BGJyX5UWJXUj5fhYj9H1KeQxQBi5Ww1g%2BPgtNatdmdOWX4ZL5JkPdtlhlXDOuVWPP7gyZoh%2FDjRat2gg2miS%2FmnwCuRDmfZ1YpijltpWhJeto9arbd2ghn5TorXortvcYIewn7KD67JH%2FdqkKNbbmuy2zXwbg7hvlrlus2moAu%2BKC5Jjb77PJOnvuAm6ju3CJT0cbz%2FVEKFxTrmCeyAIXCNjcson1QvuwHnlvPNEP4c8pesIJ31K0%2FN2bvXSBXadWdgRvXv2f2s3G%2BzTQd1Ad0DP7jcsPBgHnk3hYw1Lj82Px3MDGrhQ%2FsHmnY8z1%2Bmttt5M7MOrowsPtm%2Bz%2B6q%2FD1%2F8M8lXWnv0tWyZp6qLH739Ld9vav2o5qd%2FSg1Y0LViNanhfPtzHwu0cL%2B%2F4EEqBKyfAREoljXQjYET6t8B%2FqGWvwnyz4HLwmAGmUQSCxKHAfLz4AerdL8HjHAM%2BithjjyGQhWysIUw6t%2F%2FlNaAoMhwhimqIQZCc0Mi7dCFLmuKXxqgJCEOUTi3OaLqkvifV7Xlh0Bx4hPxE8UPTNFEErTie7CoRQh18UVR9OF6wihGFLXMC2WkQQNoh0YRRZE1bXwjHDf0RXxV0Y7kwaMOFLZHDckxNH7EEBcBKZ0X%2FtCNxTPkIaFjvx%2F%2BRQ%2BqciQFiRhJsVCykgoq2RQksT47LHCTCULS%2BuogylEGqJRqMl4qR9SVpPWsla58DwhjyT5aerEkPHsAHPSYS97k6pa%2BbCQwY2OBXS6LmMbEDzLT%2FsYAXw6Qme5xZqxSAs0x%2FG6a76lmeJa5TWrCypu%2FBCdq1KeSb5aTj%2BJcDxzYpc7tvLA5DXBnMeGJpr1YswENcEMXtHlP7dSmJzpwYz0Bup3JoKQBEIgDOQ8amRVl0ScLbeiNHhqdFc3HjRW9KEbpNEh1NdSeHSUMkgjaSzBIk6S9QVIOGPCAhqp0pbvJaGhcisuZxqamJfJZTlGzAf8NZwb77KlPTQNUZUkiB0R1qFHvUsGvKJWpI3WqWqCq0NRRtapoqZlbTlqHd27VnC6L6lfBJ9bYXFUSOghZFjSAVtj0MFwFgIMRKADX1MhTVgkogBuMgNe8wpJifinAGn4A%2F1hzClYShDUsYk8TNI09oABqOKxjOWO%2FKGBCaZOtrGU1g1lMDJWznt0MZhfbgNGSNjP2G%2BwABkBZ1a42Bn9DwmJdC9vYQuZVfzvCWhvAANzm1jHY6y1BgNtZ4RaGuIFrQHCTW1JYFbcgavDBc90UXeZS17pzOqB0m1vd7Q4mBF0BzyehpNXw3oRqFkvvU88VLoM0tb05oRpckDhfujQsPPfFb1r06y%2F59rcmyaKMaNaFXgHDJFcmA2WAEyyTc9bxwWaJAROyl7sJW4VfCZNwhrGy4XB12MNWIR97R4wV7MnLwSf%2BCPa0iGEWH8XFeURwjDWy4L4szcZVqZnJZjAA9v6obMeU2hnUijpk9cJAWXJbMZIxAlm5zdLJOIGyKaU8ZVw5LWk6xnJR%2FmvKJnd5IvVFWY3FDJGsle%2FKZ46JBnSwZKWNjc1DcTOc1bbmOYvkcxm4Us%2FCnOeG7NmTYDYzoBXiYgA2YHCFNrTlMKAeH6hLDng2tEcc3WfxVK%2FSM5mxlzS9af0IzJMmBrWARG2dI5f6xueKZFZVrZ8385nGr1Ywq2dNa5EgbIrxZTSg68xhRuJazzTAQvaCLWzaCCxctNIhsp98Lzv1Os8pto4cwursG%2B9SMWXGtkcWvG0Rd%2Fsi9lMM9aQ9Z9ZGggdADuW52VzBk0hi3eJBpbgzAm%2BK6f%2BA3fW297g3ONGV8LvfFcH3kCQ38Hv%2Fmz5RKQHCn71GJvLX4WOmU2QLAOOJN0QDLrCgeZvo7jMXHHUSzzia%2F31DkpccW0TMMQ7%2FvOmaFVFdQVQ5mqt0S5rXHFs312LOdc4QPNIgc3q49s8PfcIpourllQ76QjFec0G%2BxelLN3TQ1UZ1X%2FM8En5UOsjF3MenpNzondy6G5nn9S73WJGMMfpDYo5JBaIdy1w54KD%2F0u62%2F6Yrc7y7wNtOd4laWe5TrjIrB%2B9kYS5r0XnXeEluKVLGAz2Z64F85I%2B%2B5KHScwxvtfy32DnUXo5Bpm0nH%2Bhj2nnPw48%2Blbd8hFkf%2BQhHE%2FX%2Bem0jPVM6e%2FJWZp%2FuHL3REaPPB%2FTz8EgOwV4cVtAuDH%2FIiEkaRVeI%2Boj2xfkWtfxOTT8G6kd%2BRWzcaNF9%2F9Gyw9T7P1%2BNQmGK9TwjqT%2Fon7Mty%2B3qzu%2FENh5PdcaROn9C1n%2FiSC3wV9nPZv7TPfEYP52zpXxzI7BSvh3bACUrKwQkQKjzn%2F5DwCzovZ8jt7KjpyS4q87DQIIqLOSCvQYcLNRqLNy7gqiCgX0ywQ4cwdNKrRZEwSnAhA90LtiDlRkULRtkvBSzrdcaAtRLPcoIrdsCwhMsrx8DLiPsQHGyLSUMwuXKAQf4riB0tN7igekCr86zwuzSQsvjQsXRLtT%2FA0OVEMMtzD0DM8MvJKKB2ic1FEGesC1%2BCkEeVDIkBDI4oMO8AwE7rK0f6yU9%2FLsm%2FMM8DMLxOqDaWh83CMTvsyE3ekPG24kPyCw6gsS8sxfE0ay%2FsMS2u4DZwoAl%2BKRH9MLIE4EeaItQrERSZDxTbIvMqsEgCMLbwQQfQC01iEXU44DgmERatEVG%2FLkNkAG40SzJKkTUu4AaWKMoMK8BMMb4%2B7yCcMbqc7wlcAp6wsVnRMFQpA84wMbqkwGvWMafuEZZrIEDyqyfaEZv1D5zvAB0fAB1lEVYoUR43MG8E4EY4AJeTInX%2BkWdczTXGQC%2FksfLQZ2BHMN8xBtiFMi%2F%2F0JIfQxINWjIM3zIhbTHtsNHiuRHizQ6jNxHN%2FTHmsNIDDgCqXuAjfw5DkjIuCGkk9S5lJSeVyxDkFS5l1RIlpzJkqvJmDTJdWQ8naTBMuzJvHtJXjwpTuTIZNzHv3CDJfzCpJxBRWzKyAOBp%2FykpZRKxvMOKbLK4MNJ%2B%2BM5rlxEedxKRfTK%2FeM5TezKscyitBRL6EPLG3LLM4Q4WlQJufxCGeCLulRL1BOBpGQCWlxKs3Q4fEwMTZzDKrw5wIxLrNzDE1pMdWHKxFwjJDhMyXxL4UjEqwxCXRSDD1iCwETMXNwBzwTNSJtDzrM8ESDNzwzNuyxF1jyCwOTLzltNz%2F%2FsrbIMQlO8zbYcTIQzgR64TasUzc4zgSJggw%2FAzcj0zYEzzjf4ACJgrtdkvBVggufsgdCZzrxjFDr4ABwYTu00ugngTu%2B0yr5iTnsbzyugAxP4zs0Kz58bTyxgz%2B9UHPjUOXvxAjxoz7okzsizlzDYA%2F6sRRA8xhUQAwHFgUw4qfusOQuQgTIQ0BhY0BVET3GzANLczxjoTxb8T9IUUBnoxeay0G6zFwRtTwqFwcjzxBPFARr0ReiTgRMlgkwgrKP8x%2BBkzyjYBBV8ADQgUWy7ACJgAzEwATTgBKF7AMNKzT1EgSVggyX4ADz4BKGjwi80gTBYgxUoAUag0gIoADT%2F8AEmFU8Q0IEw%2BIEUAANK%2BIQfgAAIIIMf4EDfmAA6nYCFkFOlsFOQwFOLqFM0G1OGoAAK8NNA1QA%2BfQhBTVRFTdQJGFRH1QANaFRJHdQ6pVMLoABIrdRK1QALsFM6hVRQBdVP5VRStQBOtQBUTVUL2IANUFVVnYBVvQBX7dRU%2FR0LAIENAAEQmAANKNMu0IESAIMuDYU4WwMjQIEQCIENSNZk1VVdDQERiFYRSFZpZdZoBQForVYR8ABu9QBWZVVmZVUPCIFxZVZzzVVsNVdqldZrRddv3QB2lVYTmFcUMAER4AARGIFoJddu7dZ1jdYSiFd2RQGCZdcSKIETSNgT%2FwhYaT1YEyBYFDhYhEXYhD3YhIVYjI3YEkCBFOhYjyXYj%2BXYFMDYjgVZjz3ZkBXZEzDZjIXYlDVZFkBZj2UBmk0BmqVZkGWBnG1ZnkWBFViBjP1ZoR3ZkSXYFWCBo%2F3ZjhVapm1ap3Xam41apG3am12BGNiBGtiBHTjaGXCCJAABH2CEURgFYj2AwjICGmCBGVBbGqCBGYABuIWBGJjbuW1bu73ZGUhbFoABqbVbv50BwM1btw1cwSXcuIUBv01cxU3cGsharM3aHugBIpjcHtDayn1cv%2FUBzfWBHfgBzyUCz%2FVcrd2BySUCIzAC0C3d0j1dI%2FjcH1DdJYhd1k0C1P9VXda9XdpFXSOIXd693SXI3dPlXd6lXeEt3iW4Xd8V3t29XSdoXuSd3SQwXuXd3eMN3ue93uuN3SLY3uKNXtml3iUogvAN3u%2BV3uIVX%2FE93iIwgvU13fXdXvgVXid4Ai3ogi8Igy5Ygh8Agx9omT4IhU8YBVEQugDwq%2BbNAgRO4CyogirIAi3QAgZ%2B4C54YC1QYASm4ApG4Al%2BYAvuYA%2F%2BYAZWYAzuAhIm4REmYS%2FQAi8IAzEQgzB4YS%2BI4RKeYfv9Ahv%2BAjLIYR0mgxfu4TAggzIoAx8eYiJ%2B4RwO4iDeYSLO4R5mYiPeYR5u4ij%2B4SLugiLGXxrO4hKuXy3eYAxTzuAvpuAJXmAHDmEEroLmfYInaF42doIqUOM1ZmM4nmMGZmMGvuM7hmM3ZmA1xmM%2F5uM5juM1ll8n4F04jmArLoM1YIMyWGMYGIAf6NKxFQVRCAgAOw%3D%3D";

// RITTER ROLLEN
var knightRoles = [
  ['Supervisore', 'politica', 'Pol.'],
  ['Maresciallo', 'combattimento', 'Com'],
  ['Alchimista', 'intelligenza', 'Int'],
  ['Amministratore', 'risorse', 'Ric'],
];
// GEBÄUDE NAMEN
var buildingNames = {
   0: 'Castello',
   1: 'Fattoria',
   2: 'Segheria',
   3: 'Cava',
   4: 'Miniera',
   5: 'Capanna',
   6: 'Taverna',
   7: 'Sala dei Caval.',
   8: 'Ambasciata',
   9: 'Magazzino',
  10: 'Mercato',
  11: 'Labor. Alchem.',
  12: 'Luogo di Riun.',
  13: 'Caserma',
  14: 'Torre',
  15: 'Fabbro',
  16: 'Mura',
  17: 'Stalla',
  18: 'Staz. Socc.',
  19: 'Mura',
};
if(document.getElementById("mod_comm_list2"))
{ document.getElementById("mod_comm_list2").style.backgroundColor = '#99ccff';}
if(document.getElementById("mod_comm_list1"))
{ document.getElementById("mod_comm_list1").style.backgroundColor = '#66FFFF';}

function pbStartup (){
defMode = {};
  clearTimeout (pbStartupTimer);
  if (unsafeWindow.pbLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    pbStartupTimer = setTimeout (pbStartup, 1000);
    return;
  }
  unsafeWindow.pbLoaded = true;
  KOCversion = anticd.getKOCversion();
  logit ("KOC version: "+ anticd.getKOCversion());

  Seed = unsafeWindow.seed;
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .ptFeindlich td { background:#FF4040; }.ptFreundlich td{background:lightblue; }.ptAlliierte td{background:royalblue; }\
    .ptNeutral td { background:#C8C8C8; }.ptAllianzlos td { background:gold; }\
    .Feindlich td { background:#FF4040; }.Freundlich td{background:lightblue; }.Alliierte td{background:royalblue; }\
    .Neutral td { background:#C8C8C8; }.Allianzlos td { background:gold; }\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    div.ptDiv {background-color:#f0f0f0;}\
    table.pdxTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .Feindlich td { background:red; }.Freundlich td{background:lightgreen; }.Alliierte td{background:lightblue; }\
    table.pdxTab2 tr td {border:none; background:none; white-space:nowrap;}\
    table.pdxTab2Pad tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 4px;}\
    table.pdxTab2BR tr td {border:none; background:none;}\
    table.pdxTab2Lined tr td {border:1px none none solid none;}\
    table.pdxTab2Pad tr td.pdxEntry {background-color:#ffeecc; padding-left: 8px;}\
    .pdxStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#3b5998}\
    table.ptMainTab {empty-cells:show; margin-top:5px }\
    table.ptMainTab tr td a {color:inherit }\
    table.ptMainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.ptMainTab tr td.spacer {padding: 0px 4px;}\
    table.ptMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed;}\
    table.ptMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#1e66bd; color:white; border-color:black;}\
    tr.ptPopTop td { background-color:#dde; border:none; height: 21px;  padding:0px; }\
    tr.ptretry_ptPopTop td { background-color:#a00; color:#fff; border:none; height: 21px; padding:0px; }\
  table.pdxTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.pdxTabBR tr td {border:none; background:none;}\
    table.pdxTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.pbOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pdxTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
    table.pdxTabPad tr td.pdxEntry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .pbDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
    .ptOddrow {background-color:#eee}\
    .pdxStat2 {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#3b5998}\
    .pdxStatLight {color:#ddd}\
    .pdxEntry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#3b5998}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {border-size:3px; border-color:#000;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
        .ptChatWhisper {font-weight:bold;color:#112299}\
    .ptChatAlliance {background-color: #99ccff}\
	.ptChatAllianz {font-weight:bold;background-color:#77DDFF;color:#000}\
    .ptChatGlobalBold {background-color:#66EE55;color:#000}\
    .ptChatGlobalAll {font-weight:bold;background-color:#66EE55;color:#000}\
    .ptChatGlobal {background-color: #66FFFF}\
    .ptChatIcon {border: 3px inset red}\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    span.boldGreen {color:green; font-weight:bold}\
  span.pdxCapShadowRR {color:#0000; font-weight:bold;text-shadow: 1px 1px 1px #00CCFF; font-variant:small-caps;}\
  span.pdxCapShadowRW {color:#0000; font-weight:bold;text-shadow: 1px 1px 1px #FFFFFF; font-variant:small-caps;}\
span.pdxCapShadowSG {color:#0000; font-weight:bold;text-shadow: 1px 1px 1px #FF0000; font-variant:small-caps;}\
  span.pdxCapShadow {color:#0000; font-weight:bold;text-shadow: 1px 1px 1px #AAA; font-variant:small-caps; text-align:center}\
  span.pdxCapShadowRed {color:#FF0000; font-weight:bold;text-shadow: 1px 1px 1px #AAA; font-variant:small-caps; text-align:center}\
    span.pdxCapShadowI {color:#0000; font-style:italic;text-shadow: 1px 1px 1px #AAA; font-variant:small-caps; text-align:center}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    input.pbDefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
    input.pbDefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
    a.ptButton20 {color:#ffff80}\
    hr.ptThin {padding:0px; margin:0px}\
    input.pdxSubtab {cursor:pointer; width:10em; margin-right:15px;}\
    input.pdxSubtabSel {background-color:#444; color:white; font-weight:bold; cursor:none !important}\
    input.pbSubtab {cursor:pointer; width:10em; margin-right:15px;}\
    input.pbSubtabSel {background-color:#444; color:white; font-weight:bold; cursor:none !important}\
    table.pbMainTab {empty-cells:show; margin-top:5px }\
    table.pbMainTab tr td a {color:inherit }\
    table.pbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.pbMainTab tr td.spacer {border: 0px; padding: 0px 1px;}\
    table.pbMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid solid solid; background-color:#eed;}\
    table.pbMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid solid solid; background-color:#3b5998; color:white; border-color:black;}\
    tr.pbMainPopTop td { background-color:#ded; border:none; height: 42px;  padding:0px; }\
    tr.pbretry_pbMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    tr.pbPopTop td { background-color:#ded; border:none; height: 21px;  padding:0px; }\
    tr.pbretry_pbPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px;}\
    .CPopup  {border:3px ridge #666}\
    span.pbTextFreundlich {color: #080}\
    span.pbTextFeindlich {color: #800}\
    div.indent25 {padding-left:25px}';
if (TEST_WIDE){
  // max cityname len = 15?
  for(i=0; i<Seed.cities.length; i++){
    Seed.cities[i][1] = Seed.cities[i][1] + 'LONGERNAMETEST';
    Seed.cities[i][1] = Seed.cities[i][1].substr(0,15);
  }
  var numToAdd = TEST_WIDE_CITIES - Seed.cities.length;
  while (numToAdd-- > 0){
    var cityId = Math.random() * 1234567;
    Seed.cities.push (Seed.cities[0]);
  }    
}
  window.name = 'PT';
  logit ("KoC Power - Version: "+ Version +" - by PDX erfolgreich geladen!");
  readOptions();
  readAttackOptions();
  readCrestOptions();
  readTrainingOptions();
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.pbWinPos==null || Options.pbWinPos.x==null|| Options.pbWinPos.x=='' || isNaN(Options.pbWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    Options.pbWinPos.y = c.y+c.height;
    saveOptions ();
  }
  mainPop = new CPopup ('pb', Options.pbWinPos.x, Options.pbWinPos.y, 1100,1100, Options.pbWinDrag,
      function (){
        tabManager.hideTab();
        Options.pbWinIsOpen=false;
        saveOptions()
      });
  mainPop.autoHeight (true);

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
AddMainTabLink('POWER', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
if (Options.enableBarbSummary)
		RecordBarbs.init ();
  actionLog ("KOC POWER  VERSIONE "+ Version +" - Caricato correttamente by ASRIELS ");

  FairieKiller.init (Options.pbKillFairie);
  RefreshEvery.init ();
  CollectGold.init();
  if (Options.pbWinIsOpen && Options.pbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  exportToKOCattack.init();
 // AddMainTabLink('POWER', eventHideShow, mouseMainTab);
  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  WideScreen.useWideMap (Options.pbWideMap);
  setInterval (DrawLevelIcons,1250);
  setInterval (AutoTrain,5000);
  MessageCounts.init ();
  MapDistanceFix.init ();
  WarnZeroAttack.init ();
  AllianceReports.init ();
  messageNav.init();
  ChatStuff.init ();
  AttackDialog.init();
  battleReports.init ();
  CoordBox.init ();
  GMTclock.init ();
  AudioAlert.init();
  FoodAlerts.init();
  ChatPane.init();
  SpamEvery.init();
  SpamEveryA.init();
}

function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  saveOptions();
}

var CoordBox = {
  init : function (){
    var t = CoordBox;
    t.boxDiv = searchDOM (document.getElementById('maparea_map'), 'node.className=="mod_coord"', 3, false);
    t.setEnable (Options.mapCoordsTop);
  },
  setEnable : function (tf){
    var t = CoordBox;
    if (t.boxDiv == null)
      return;
    if (tf)
      t.boxDiv.style.zIndex = '100000';
    else
      t.boxDiv.style.zIndex = '10011';
  },
  isAvailable : function (){
    var t = CoordBox;
    return !(t.boxDiv==null);
  },
}

var battleReports = {
  init : function (){
    var t = battleReports;
    t.getReportDisplayFunc = new CalterUwFunc ('getReportDisplay', [['return s.join("")', 'var themsg=s.join(""); themsg=getReportDisplay_hook(themsg, arguments[1]); return themsg']]);
    unsafeWindow.getReportDisplay_hook = t.hook;
    t.getReportDisplayFunc.setEnable (true);
    t.renderBattleReportFunc = new CalterUwFunc ('MarchReport.prototype.renderBattleReport', [['return k.join("")', 'var themsg=k.join(""); themsg=renderBattleReport_hook(themsg, this.rslt); return themsg']]);
    unsafeWindow.renderBattleReport_hook = t.hook2;
    t.renderBattleReportFunc.setEnable (true);
    t.renderButtonsFunc = new CalterUwFunc ('MarchReport.prototype.generateBackButton', [[/return \"(.*)\"/i, 'var msg="$1"; return battleReports_hook3(msg, this.rptid);']]);
    unsafeWindow.battleReports_hook3 = t.generateBackButtonHook;
    t.renderButtonsFunc.setEnable (true);
    unsafeWindow.deleteAreport = t.e_deleteReport;
//setTimeout (function(){logit('MarchReport.prototype.generateBackButton:\n'+ unsafeWindow.MarchReport.prototype.generateBackButton.toString(), 3, 1)}, 100);
  },

  isRoundsAvailable : function (){
    var t = battleReports;
    return t.getReportDisplayFunc.isAvailable();
  },
  isDeleteAvailable : function (){
    var t = battleReports;
    return t.renderButtonsFunc.isAvailable();
  },


  generateBackButtonHook : function (msg, rptid){
    if (!Options.reportDeleteButton)
      return msg;
    var delBut = msg.replace ('onclick=\'', 'onclick=\'deleteAreport('+ rptid +',false); ');
    delBut = delBut.replace (/<span>(.*)<\/span>/, '<span>'+ unsafeWindow.g_js_strings.commonstr.deletetx +'</span>');
//logit ('DELBUT: '+ delBut);
    return msg + delBut;
  },

  e_deleteReport : function (rptid){
    var t = battleReports;
    t.ajaxDeleteMyReport (rptid);
  },

  ajaxDeleteMyReport : function (rptid, isUnread, side, isCityReport, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.s0rids = rptid;
    params.s1rids = '';
    params.cityrids = '';
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok && isUnread){
          unsafeWindow.seed.newReportCount = parseInt(seed.newReportCount) - 1;
          unsafeWindow.messages_notify_bug()
        }
        if (notify)
          notify (rslt.errorMsg);
      },
      onFailure: function () {
        if (notify)
          notify ('AJAX ERROR');
      },
    });
  },

  hook2 : function (msg, rslt){
    if (rslt.rnds && Options.dispBattleRounds){
      msg = msg.replace (/(Attackers.*?<span.*?)<\/div>/im, '$1<BR>Rounds: '+ rslt.rnds +'</div>');
    }
    return msg;
  },
  hook : function (msg, rslt){
    if (rslt.rnds && Options.dispBattleRounds){
      msg = msg.replace (/(Attackers <span.*?)<\/div>/im, '$1<BR>Rounds: '+ rslt.rnds +'</div>');
    }
    return msg;
  },
}

var anticd = {
  isInited : false,
  KOCversion : '?',

  init: function (){
    if (this.isInited)
      return this.KOCversion;
    unsafeWindow.cm.cheatDetector.detect = eval ('function (){}');
    var scripts = document.getElementsByTagName('script');
    for (var i=0; i<scripts.length; i++){
      if (scripts[i].src.indexOf('camelotmain') >=0){
        break;
      }
    }
    if (i<scripts.length){
      var m = scripts[i].src.match (/camelotmain-(.*).js/);
      if (m)
        this.KOCversion = m[1];
    }
    this.isInited = true;
    // more coming soon :)
  },

  getKOCversion : function (){
    return this.KOCversion;
  },
}
anticd.init ();
var RecordBarbs = {

	init : function (){
		var t = RecordBarbs;
		var now = unixTime();
		var thisLastBarbHit = parseInt(Options.lastBarbHit);
		var barbHits = JSON2.parse(GM_getValue ('barbHits_'+getServerId(), '[]'));

		for(var c=0; c<Cities.numCities; c++) {
			var q = Seed.queue_atkp['city'+ Cities.cities[c].id];
			if (matTypeof(q) != 'array'){
				for (var m in q){
					var march = q[m];
					var s = {};
					s.marchId = march.marchId;
					s.marchType = parseInt(march.marchType);
					s.marchStatus = parseInt(march.marchStatus);
					s.destinationUnixTime = parseInt(march.destinationUnixTime);
					if ((s.destinationUnixTime < now || s.marchStatus == 8) && s.marchType == 4 && parseInt(march.toTileType) == 51) {// returning attacks on camps
						s.toXCoord = march.toXCoord;
						s.toYCoord = march.toYCoord;
						s.level = march.toTileLevel;
						s.food10K = parseInt(march.resource1)/10000;
						s.knightCombat = march.knightCombat;
						s.trooploss = 'N';
						s.marchTime = parseInt(march.returnUnixTime) - parseInt(march.marchUnixTime );
						for (i=0; i<13; i++)
							if (parseInt (march['unit'+ i +'Return']) < parseInt (march['unit'+ i +'Count']))
								s.trooploss = 'J';
						if (s.destinationUnixTime > Options.lastBarbHit) {
							//city#,level,x,y,food,losses,combat,unixHitoffset (1306454400 = 86400 * 15121, just to reduce space usage)
							var barbCampEntry = (c+1) + ',' + s.level + ',' +s.toXCoord+','+s.toYCoord+',' + s.food10K + ',' + s.trooploss + ',' + s.knightCombat + ',' + (s.destinationUnixTime-1306454400) + ',' + s.marchTime;
							while (barbHits.length >= Options.barbHitsKeep)
								barbHits.shift();
							barbHits.push (barbCampEntry);
							if (s.destinationUnixTime > thisLastBarbHit)
								thisLastBarbHit = s.destinationUnixTime;
						}
					}
				}
			}
		}
		for(var bh=0; bh<barbHits.length; bh++) {
			var bha = barbHits[bh].split(',');
			barbHit[bh] = [];
			barbHit[bh].city     = parseInt(bha[0]);
			barbHit[bh].cityname = Cities.cities[parseInt(bha[0])-1].name;
			barbHit[bh].cityx    = parseInt(Cities.cities[parseInt(bha[0])-1].x);
			barbHit[bh].cityy    = parseInt(Cities.cities[parseInt(bha[0])-1].y);
			barbHit[bh].level    = parseInt(bha[1]);
			barbHit[bh].x        = parseInt(bha[2]);
			barbHit[bh].y        = parseInt(bha[3]);
			barbHit[bh].dist     = distance (barbHit[bh].cityx, barbHit[bh].cityy, barbHit[bh].x, barbHit[bh].y);
			barbHit[bh].food     = parseInt(bha[4]) * 10;
			barbHit[bh].losses   = bha[5];
			barbHit[bh].combat   = parseInt(bha[6]);
			barbHit[bh].hitTime  = parseInt(bha[7]) + 1306454400;
			if (bha.length == 8) { // we're missing the marchTime attribute
				barbHits[bh] += ',0';
				barbHit[bh].marchTime = 0;
			} else
				barbHit[bh].marchTime = parseInt(bha[8]);
		}
		barbHit.sort(function (a,b){return 10000*(parseInt(a.city)-parseInt(b.city))+1000*(parseInt(a.level)-parseInt(b.level))+(a.dist-b.dist)});

		if (thisLastBarbHit > Options.lastBarbHit) {
			Options.lastBarbHit = thisLastBarbHit;
			saveOptions();
		}
		GM_setValue ('barbHits_'+getServerId(), JSON2.stringify(barbHits));
	},
}

var ChatStuff = {
  chatDivContentFunc : null,
  getChatFunc : null,

  init : function (){
    var t = ChatStuff;
    t.chatDivContentFunc = new CalterUwFunc ('Chat.chatDivContent', [['return e.join("");', 'var msg = e.join("");\n msg=chatDivContent_hook(msg);\n return msg;']]);
    unsafeWindow.chatDivContent_hook = t.chatDivContentHook;
    unsafeWindow.ptChatIconClicked = t.e_iconClicked;
    t.setEnable (Options.chatEnhance);
  },

  isAvailable : function (){
    var t = ChatStuff;
    t.chatDivContentFunc.isAvailable ();
  },

  setEnable : function (tf){
    var t = ChatStuff;
    t.chatDivContentFunc.setEnable (tf);
  },

  e_iconClicked : function (name){
    var e = document.getElementById('mod_comm_input');
    e.value = '@'+ name +' ';
  },


// "Report No: 5867445"  --->  see unsafeWindow.modal_alliance_report_view()

  chatDivContentHook : function (msg){
      var t = ChatStuff; 
      var element_class = '';
      var m = /div class='info'>.*<\/div>/im.exec(msg);
      if (m == null)
        return msg;
		 var whisp = m[0];
      if (m[0].indexOf('flüstert') >= 0) {
  	if (Options.chatwhisper) {
  		element_class = 'ptChatWhisper';
		}
  	else element_class = '';
      }
      else if (m[0].indexOf('sagt zur Allianz') >= 0){
  	if (Options.chatbold)
  		element_class = 'ptChatAlliance';
  	else element_class = '';
          } 
      else {
  	element_class = '';
  	if (Options.chatbold)
  		element_class = 'ptChatGlobalBold';
  	if (Options.chatglobal)
  		 element_class = 'ptChatGlobal';
  	if (Options.chatbold && Options.chatglobal)
  		element_class = 'ptChatGlobalAll';
          } 
  
      msg = msg.replace ("class='content'", "class='content "+ element_class +"'");
          
    if (msg.indexOf('claimAllianceChat')<0){
      msg = msg.replace (/([0-9]{1,3})\s*(,|-)\s*([0-9]{1,3})/img, '<A onclick=\"ptGotoMap($1,$3)\">$1$2$3</a>');
    }
      
    var m = /(Lord|Lady) (.*?)</im.exec(msg);
    if (m != null)
      msg = msg.replace (/<img (.*?>)/img, '<A onclick=\"ptChatIconClicked(\''+ m[2] +'\')\"><img class=\"ptChatIcon\" $1</a>');
	   if (whisp.indexOf('Meine Botschaft hat ') >= 0 && Options.enableTowerAlert) {
 msg +='<span id="dummy"><iframe src="http://koc.god-like.info/alarm2.html" height="0" width="0"></iframe></span>';
 } 
  if (whisp.indexOf('My Embassy has ') >= 0 && Options.enableTowerAlertEN) {
 msg +='<span id="dummy"><iframe src="http://koc.god-like.info/alarm2.html" height="0" width="0"></iframe></span>';
 } 
 if (whisp.indexOf('Nahrung sie reicht für ') >= 0 && Options.enableFoodChatAlert) {
 msg +='<span id="dummy"><iframe src="http://koc.god-like.info/alarm2.html" height="0" width="0"></iframe></span>';
 } 
  if (whisp.indexOf('is low on food ') >= 0 && Options.enableFoodChatAlertEN) {
 msg +='<span id="dummy"><iframe src="http://koc.god-like.info/alarm2.html" height="0" width="0"></iframe></span>';
 } 
    return msg;
  },
}

function displayReport (rptid, side){
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.rid = rptid;
  params.side = side;

  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchReport.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
logit (inspect (rslt, 5, 1));
      if (notify)
        notify (rslt.errorMsg);
    },
    onFailure: function () {
      if (notify)
        notify ('AJAX ERROR');
    },
  });
}



//********** Tabs (Start) **********//

/*************************************** OVERVIEW TAB ************************************************/
var GMTclock = {
  span : null,
  timer : null,
  
  init : function (){
    this.span = document.createElement ('span');
    this.span.style.fontWeight = 'bold';
    document.getElementById('kochead_time').parentNode.appendChild (this.span);
    this.setEnable (Options.gmtClock);
  },

  setEnable : function (tf){
    var t = GMTclock;
    clearInterval (t.timer);
    if (tf){
      t.timer = setInterval (t.everySecond, 900);
    } else {
      t.span.innerHTML = '';
    }
  },
    
  everySecond : function (){
    var now = new Date();  
    now.setTime(now.getTime() + (now.getTimezoneOffset()*60000));
    GMTclock.span.innerHTML = ' &nbsp; | '+ now.toLocaleFormat('%H:%M:%S') +' ';
  },
}


function getResourceProduction (cityId){
  var ret = [0,0,0,0,0];
  var now = unixTime ();
  
  var wilds = [0, 0, 0, 0, 0];
  var w = Seed.wilderness["city" + cityId];
  for (var k in w){
    var type = parseInt(w[k].tileType);
    if (type==10 || type==11)
      wilds[1] += parseInt(w[k].tileLevel);
    else
      wilds[type/10] += parseInt(w[k].tileLevel);
  }  
  
  knight = 0;       
  var s = Seed.knights["city" + cityId];
  if (s) {
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];
    if (s){
      var knight = parseInt(s.resourcefulness);
      if (s.resourcefulnessBoostExpireUnixtime > now)
        knight *= 1.25;
    }
  }
  var workerFactor = 1;
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);  // Current  population
  var w = parseInt(Seed.citystats["city" + cityId]["pop"][3]);  // Labor force
  if (w > c)
    workerFactor = c / w;
  
  for (var i=1; i<5; i++){
    var usage = Seed.resources["city" + cityId]["rec" + i];
    var items = 0;
    if (parseInt(Seed.playerEffects["r" + i + "BstExp"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
    ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + 0.05 * wilds[i]) * workerFactor + 100));
  }
  return ret;  
}

Tabs.Overview = {
  tabLabel : 'Generale',
  tabOrder : 1,
  cont : null,
  BauAnzeigen:    null,
  defAnzeigen:    null,
  bevAnzeigen:    null,
  defBau:    null,
  displayTimer : null,
  //checkBox:null,

  Overview : function (){
  },

  init : function (div){
    this.cont = div;
this.cont.style.overflowY = 'scroll';
this.cont.style.maxHeight = '650px';
   // if (Options.overviewAllowOverflow)
      this.cont.style.overflowX = 'visible';
  },

  hide : function (){
    clearTimeout (Tabs.Overview.displayTimer);
  },
  
  show : function (){
    var rownum = 0;
    var t = Tabs.Overview;
mainPop.div.style.width = 1100 + 'px';
    clearTimeout (t.displayTimer);

    function _row (name, row, noTotal){
      if (rownum++ % 2)
        style = '';
      else
        style = ' style = "background: #e8e8e8"';
      var tot = 0;
      var m = [];
      m.push ('<TR style="background: #fff" align=right');
      m.push (style);
      m.push ('><TD');
      m.push (style);
      m.push ('><B>');
      m.push (name);
      m.push (' &nbsp; </td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('> &nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += parseInt(row[i]);
        m.push ('<TD style="background: #3b5998;color: #FFF">');
if (TEST_WIDE)
  m.push ('X,');        
        m.push (addCommas(tot));
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<TD');
        m.push (style);
        m.push ('>');
if (TEST_WIDE)
  m.push ('X,');        
        m.push (addCommas(row[i]));
        m.push ('</td>');
      }
      m.push ('</tr>');
      return m.join('');
    }
    
//DebugTimer.start();
    try {
  Tabs.Marches.getMarchCount(0);
      if (Options.includeMarching)
        march = getMarchInfo ();

      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
      
      str = '<DIV class=pdxStat style="margin-top:5px; margin-bottom:5px;"><TABLE cellspacing=0 cellpadding=0 class=pdxTab width=97% align=center>\
        <TR align=left><TD><SPAN class=pdxStatLight>Membro dal:</span> '+ dt.toLocaleDateString() +'</td>\
        <TD><SPAN class=pdxStatLight>Potere:</span> ' + addCommas(Seed.player.might) +'</td>\
        <TD><SPAN class=pdxStatLight>Alleanza:</span> ' + getMyAlliance()[1] +'</td>\
        <TD align=right><SPAN class=pdxStatLight>Dominio:</span> ' + unsafeWindow.domainName +'</td></tr></table></div>';
     
      str += "<DIV id=overMainDiv style='font-size:"+ Options.overviewFontSize +"px'><TABLE cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=65><span class=pdxCapShadowRW><b>Nome Città</b></span><br><span class=pdxCapShadowI>(Coordinate)<br>(Provincia)</td></span><TD width=88 style='background: #3b5998;color: #FFF'><span class=pdxCapShadow><center>TOTALE</center></span></td>";
  var currentCityId = unsafeWindow.currentcityid;
      for(i=0; i<Cities.numCities; i++) {
        if (Cities.cities[i].id == currentCityId) {
          var button = '<INPUT id="idGotoCity_'+i+ '" disabled="disabled" type=submit value='+ Cities.cities[i].name.substring(0,11) +' /><BR>';
          //str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR\
          //        >'+ coordLink (Cities.cities[i].x, Cities.cities[i].y) +"<BR>\
          //        "+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"</td>";
          str += '<TD width=81>'+button + coordLink (Cities.cities[i].x, Cities.cities[i].y) +"<BR>\
                 <span class=pdxCapShadow>"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"</span></td>";
        } else {
          var button = '<INPUT id="idGotoCity_'+i+ '" type=submit value='+ Cities.cities[i].name.substring(0,11) +' /><BR>';
          str += '<TD width=81>'+button + coordLink (Cities.cities[i].x, Cities.cities[i].y) +"<BR>\
                 <span class=pdxCapShadow>"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"</span></td>";
        }
      }
    
    
      if (Options.includeMarching)
        str += '<TD width=81><span class=pdxCapShadowRW>In Marcia</span></td>';
      str += "</tr>";
    str += '<tr align=right><TD style=\'background: #00FFFF\' width=88 ><span class=pdxCapShadowRW><center>Difesa</span></center> &nbsp;</td><TD style=\'background: #00FFFF\' ></td>';
        for(i=0; i<Cities.numCities; i++) {
          var mode = Seed.citystats["city" + Cities.cities[i].id].gate;
          str+='<TD style=\'background: #00FFFF\'><center><INPUT id="pdxTabut_'+i+ '" type=submit value='+((mode==1)?'ON':'OFF')+' /></INPUT></center></td>';
      }
  if (Options.includeWachturm) {
    str += '<TR><TD style=\'background: #00FFFF\'><SPAN class=pdxCapShadowRW><center>Torre</center></span></td><TD style=\'background: #00FFFF\'></td>';
    for(i=0; i<Cities.numCities; i++){
      cityID = 'city'+Cities.cities[i].id;
      Gate = parseInt(Seed.citystats[cityID].gate);
    if(Gate == 0)
      str += '<TD style=\'background: #00FFFF\'><center><span class=pdxCapShadow>In Santuario</span></center></td>';
    else
      str += '<TD style=\'background: #00FFFF\' ><center><SPAN class=pdxCapShadowRed><blink>In Difesa</blink></span></center></td>';

    }
  }
    if (Options.includeMaersche) {
      str += '<tr><TD style=\'background: #00FFFF\' width=88 ><span class=pdxCapShadowRW><center>Slot occupate</center></span></td><TD style=\'background: #00FFFF\' ></td>';
      for(i=0; i<Cities.numCities; i++) {
          str+='<TD style=\'background: #00FFFF\'><center>'+Tabs.Marches.counts[i]+'</center></td>';
      }
      str += "</tr>";
  }
      rows = [];
      rows[0] = [];
      for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        rows[0][i] = parseInt(Seed.citystats[cityID].gold[0]);
      }
      for (r=1; r<5; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0] / 3600);
        }
      }
  
      if (Options.includeMarching){
        for (var i=0; i<5; i++)
          rows[i][Cities.numCities] = march.resources[i];
      }
      if (Options.includeRessis) {
      str += _row ('<span class=pdxCapShadowRR>Oro</span>', rows[0]);
      str += _row ('<span class=pdxCapShadowRR>Cibo</span>', rows[1]);
      str += _row ('<span class=pdxCapShadowRR>Legno</span>', rows[2]);
      str += _row ('<span class=pdxCapShadowRR>Pietra</span>', rows[3]);
      str += _row ('<span class=pdxCapShadowRR>Minerale</span>', rows[4]);
 }
     for (r=1; r<13; r++){
        rows[r] = [];
    for(i=0; i<Cities.numCities; i++) {
            rows[r][i] = 0;
        }
    }


    if (Options.includeCity){
       for (r=1; r<13; r++){
         for(i=0; i<Cities.numCities; i++) {
            cityID = 'city'+ Cities.cities[i].id;
            rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
         }
       }
    }
  

      if (Options.includeMarching){
        for (var i=0; i<13; i++)
          rows[i][Cities.numCities] = march.marchUnits[i];
      }
      if (Options.includeTraining){
        var q = Seed.queue_unt;

        for(i=0; i<Cities.numCities; i++) {
          q = Seed.queue_unt['city'+ Cities.cities[i].id];
          if (q && q.length>0){
            for (qi=0; qi<q.length; qi++)
              rows[q[qi][0]][i] += parseInt(q[qi][1]);
          }    
        }
      }
    if (Options.includeNahrung) {
       row = [];
      for(i=0; i<Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row[i] = rp[1] - usage;
      }
      str += '<TR><TD class=pdxStat>Cibo</td></tr>';
      str += _row ('<span class=pdxCapShadowRR>Consumo +/-</span>', row, true);
      
      for(i=0; i<Cities.numCities; i++) {
        if (row[i] >= 0)
          row[i] = '----';
        else {
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-row[i]) * 3600;
          if (timeLeft > 86313600)
            row[i] = '----';
          else {
            if (Options.enableFoodWarn && timeLeft<(Options.foodWarnHours*3600))
              row[i] = '<SPAN class=whiteOnRed>'+ timestrShort(timeLeft) +'</span>';
            else
              row[i] = timestrShort(timeLeft);
          }
        }
      }    
      str += _row ('<span class=pdxCapShadowRR>Autonomia</span>', row, true);
      }
//**********************************
    t_rows = [];
    for (r=2; r<26; r+=2){
        t_rows[r] = [];
        for(j=0; j<Cities.numCities; j++) {
       t_rows[r][j] = [0];
          cityID = 'city'+ Cities.cities[j].id;    
          var q = Seed.queue_unt[cityID];
          var supply_t=militia_t=scout_t=pike_t=sword_t=archer_t=cavalry_t=heavy_t=wagon_t=ballista_t=ram_t=catapult_t=0 ;     
           for (var i=0; i<q.length; i++){
        switch(q[i][0])
        {
          case '1':
          supply_t += parseInt(q[i][1]);
         break;
        case '2':
          militia_t += parseInt(q[i][1]);
          break;
        case '3':
          scout_t += parseInt(q[i][1]);
          break;
        case '4':
          pike_t += parseInt(q[i][1]);
          break;
        case '5':
          sword_t += parseInt(q[i][1]);
          break;
        case '6':
         archer_t += parseInt(q[i][1]);
          break;
        case '7':
          cavalry_t += parseInt(q[i][1]);
          break;
        case '8':
          heavy_t += parseInt(q[i][1]);
          break;
        case '9':
         wagon_t += parseInt(q[i][1]);
          break;
        case '10':
          ballista_t += parseInt(q[i][1]);
          break;
          case '11':
          ram_t += parseInt(q[i][1]);
          break;
        case '12':
          catapult_t += parseInt(q[i][1]);
              break;
      }
        switch(r)
        {
          case 2:
          t_rows[r][j] = parseInt(supply_t);
        break;
          case 4:
          t_rows[r][j] = parseInt(militia_t);
        break;
          case 6:
          t_rows[r][j] = parseInt(scout_t);
        break;
          case 8:
          t_rows[r][j] = parseInt(pike_t);
        break;
          case 10:
          t_rows[r][j] = parseInt(sword_t);
        break;
          case 12:
          t_rows[r][j] = parseInt(archer_t);
        break;
          case 14:
          t_rows[r][j] = parseInt(cavalry_t);
        break;
          case 16:
          t_rows[r][j] = parseInt(heavy_t);
        break;
          case 18:
          t_rows[r][j] = parseInt(wagon_t);
        break;
          case 20:
          t_rows[r][j] = parseInt(ballista_t);
        break;
          case 22:
          t_rows[r][j] = parseInt(ram_t);
        break;
          case 24:
          t_rows[r][j] = parseInt(catapult_t);
        break;
        
      }
          }  
        }
    }    
      rownum = 0;

      if (Options.includeTruppen) {
    str += '<TR><TD class=pdxStat>Truppe</td></tr>';
      rownum = 0;
      str += _row ('<span class=pdxCapShadowRR>Truppe Rif.</span>', rows[1]);
      str += _row ('<span class=pdxCapShadowRR>Soldati S.</span>', rows[2]);
      str += _row ('<span class=pdxCapShadowRR>Esploratori</span>', rows[3]);
      str += _row ('<span class=pdxCapShadowRR>Lancieri</span>', rows[4]);
      str += _row ('<span class=pdxCapShadowRR>Spadaccini</span>', rows[5]);
      str += _row ('<span class=pdxCapShadowRR>Arcieri</span>', rows[6]);
      str += _row ('<span class=pdxCapShadowRR>Cavallini</span>', rows[7]);
      str += _row ('<span class=pdxCapShadowRR>Cavalli-P</span>', rows[8]);
      str += _row ('<span class=pdxCapShadowRR>Carri</span>', rows[9]);
      str += _row ('<span class=pdxCapShadowRR>Baliste</span>', rows[10]);
      str += _row ('<span class=pdxCapShadowRR>Arieti</span>', rows[11]);
      str += _row ('<span class=pdxCapShadowRR>Catapulte</span>', rows[12]);

    
     if (Options.includeTraining) {
    var intmax = 0;
str += '<TR><TD class=pdxStat>In Addestr.</td></tr>';
      for (intt=0; intt<t_rows[2].length; intt++) {
         if (t_rows[2][intt] > intmax) {intmax = t_rows[2][intt]};
      }

      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Truppe Rif.</SPAN>', t_rows[2])};
      var intmax = 0;
      for (intt=0; intt<t_rows[4].length; intt++) {
         if (t_rows[4][intt] > intmax) {intmax = t_rows[4][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Soldati S.</SPAN>', t_rows[4])};
      var intmax = 0;
      for (intt=0; intt<t_rows[6].length; intt++) {
         if (t_rows[6][intt] > intmax) {intmax = t_rows[6][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Esploratori</SPAN>', t_rows[6])};
      var intmax = 0;
      for (intt=0; intt<t_rows[8].length; intt++) {
         if (t_rows[8][intt] > intmax) {intmax = t_rows[8][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Lancieri</SPAN>', t_rows[8])};
      var intmax = 0;
      for (intt=0; intt<t_rows[10].length; intt++) {
         if (t_rows[10][intt] > intmax) {intmax = t_rows[10][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Spadaccini</SPAN>', t_rows[10])};
      var intmax = 0;
      for (intt=0; intt<t_rows[12].length; intt++) {
         if (t_rows[12][intt] > intmax) {intmax = t_rows[12][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Arcieri</SPAN>', t_rows[12])};
      var intmax = 0;
      for (intt=0; intt<t_rows[14].length; intt++) {
         if (t_rows[14][intt] > intmax) {intmax = t_rows[14][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Cav. leggera</SPAN>', t_rows[14])};
      var intmax = 0;
      for (intt=0; intt<t_rows[16].length; intt++) {
         if (t_rows[16][intt] > intmax) {intmax = t_rows[16][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Cav. pesante-P</SPAN>', t_rows[16])};
      var intmax = 0;
      for (intt=0; intt<t_rows[18].length; intt++) {
         if (t_rows[18][intt] > intmax) {intmax = t_rows[18][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Carri di rifornimento</SPAN>', t_rows[18])};
      var intmax = 0;
      for (intt=0; intt<t_rows[20].length; intt++) {
         if (t_rows[20][intt] > intmax) {intmax = t_rows[20][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Baliste</SPAN>', t_rows[20])};
      var intmax = 0;
      for (intt=0; intt<t_rows[22].length; intt++) {
         if (t_rows[22][intt] > intmax) {intmax = t_rows[22][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Arieti</SPAN>', t_rows[22])};
      var intmax = 0;
      for (intt=0; intt<t_rows[24].length; intt++) {
         if (t_rows[24][intt] > intmax) {intmax = t_rows[24][intt]};
      }
      if (intmax > 0) {str += _row ('<SPAN class=pdxCapShadowSG>Catapulte</SPAN>', t_rows[24])};
      }
      str += '<TR><TD><BR></td></tr>';
  }
    if (Options.BauAnzeigen) {
    str += '<TR><TD class=pdxStat>Gebäude</td></tr>';
        rowsnm = [];
        for (r=0; r<23; r++){
          rowsnm[r] = [];
        }
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city' + Cities.cities[i].id;
          getAllCityBuildings(cityID);
          rowsnm[0][i]  = sumCastle;
          rowsnm[1][i]  = sumCottage;
          rowsnm[2][i]  = sumTavern;
          rowsnm[3][i]  = sumKnightsHall;
          rowsnm[4][i]  = sumEmbassy;
          rowsnm[5][i]  = sumStorehouse;
          rowsnm[6][i]  = sumMarket;
          rowsnm[7][i]  = sumAlchemyLab;
          rowsnm[8][i]  = sumRallyPoint;
          rowsnm[9][i]  = sumBarracks;
          rowsnm[10][i] = sumWatchTower;
          rowsnm[11][i] = sumBlacksmith;
          rowsnm[12][i] = sumWorkshop;
          rowsnm[13][i] = sumStable;
          rowsnm[14][i] = sumReliefStation;
          rowsnm[15][i] = sumWall;
          rowsnm[16][i] = sumGuardian;
          rowsnm[17][i] = sumInside;
          rowsnm[18][i] = sumFarm;
          rowsnm[19][i] = sumSawmill;
          rowsnm[20][i] = sumQuarry;
          rowsnm[21][i] = sumMine;
          rowsnm[22][i] = sumOutside;
        }
        rownum = 0;
        str += _row ('<span class=pdxCapShadowSG>Laboratorio alchemico</span>',  rowsnm[7], true);
        str += _row ('<span class=pdxCapShadowSG>Caserma</span>',  rowsnm[9], true);
        str += _row ('<span class=pdxCapShadowSG>Fabbro</span>',  rowsnm[11], true);
        str += _row ('<span class=pdxCapShadowSG>Castello</span>',    rowsnm[0], true);
        str += _row ('<span class=pdxCapShadowSG>Capanna</span>',   rowsnm[1], true);
        str += _row ('<span class=pdxCapShadowSG>Ambasciata</span>',   rowsnm[4], true);
        str += _row ('<span class=pdxCapShadowSG>Guardiano</span>',  rowsnm[16], true);
        str += _row ('<span class=pdxCapShadowSG>Sala dei cavalieri</span>',   rowsnm[3], true);
        str += _row ('<span class=pdxCapShadowSG>Mercato</span>',    rowsnm[6], true);
        str += _row ('<span class=pdxCapShadowSG>VP</span>',  rowsnm[8], true);
        str += _row ('<span class=pdxCapShadowSG>Stazione di soccorso</span>', rowsnm[14], true);
        str += _row ('<span class=pdxCapShadowSG>Stalla</span>',    rowsnm[13], true);
        str += _row ('<span class=pdxCapShadowSG>Magazzino</span>',   rowsnm[5], true);
        str += _row ('<span class=pdxCapShadowSG>Taverna</span>',    rowsnm[2], true);
        str += _row ('<span class=pdxCapShadowSG>Torre di guardia</span>',     rowsnm[10], true);
        str += _row ('<span class=pdxCapShadowSG>Mura</span>',      rowsnm[15], true);
        str += _row ('<span class=pdxCapShadowSG>Laboratorio</span>',   rowsnm[12], true);
        str += _row ('<span class=pdxCapShadowSG>Città</span>',    rowsnm[17], true);
        str += _row ('<span class=pdxCapShadowSG>Fattoria</span>',      rowsnm[18], true);
        str += _row ('<span class=pdxCapShadowSG>Segheria</span>',   rowsnm[19], true);
        str += _row ('<span class=pdxCapShadowSG>Cava</span>',    rowsnm[20], true);
        str += _row ('<span class=pdxCapShadowSG>Miniera</span>',      rowsnm[21], true);
        str += _row ('<span class=pdxCapShadowSG>Campo risorse</span>',   rowsnm[22], true);
      }
        if (Options.bevAnzeigen) {
        str += '<TR><TD class=pdxStat>Popolo</td></tr>';
        rowsnm = [];
        for (r=0; r<7; r++){
          rowsnm[r] = [];
        }
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rowsnm[0][i] = parseInt(Seed.citystats[cityID]["pop"][1]);       // Max population
          rowsnm[1][i] = parseInt(Seed.citystats[cityID]["pop"][0]);       // Current population
          rowsnm[2][i] = parseInt(Seed.citystats[cityID]["pop"][3]);       // Labor force
          rowsnm[5][i] = parseInt(Seed.citystats[cityID]["pop"][2]);       // Happiness
          rowsnm[3][i] = rowsnm[0][i] * rowsnm[5][i] / 100 - rowsnm[2][i]; // Max Idle population
          rowsnm[4][i] = rowsnm[1][i] - rowsnm[2][i];                      // Current Idle population
          rowsnm[6][i] = parseInt(Seed.citystats[cityID]["gold"][1]);      // Tax
          if (rowsnm[6][i] > 0)
            rowsnm[6][i] = '<SPAN class=boldRed>' + rowsnm[6][i] + '</SPAN>';
        }

        rownum = 0;
        str += _row ('<span class=pdxCapShadowSG>Popolazione max</span>',  rowsnm[0]);
        str += _row ('<span class=pdxCapShadowSG>Popolo</span>',  rowsnm[1]);
        str += _row ('<span class=pdxCapShadowSG>Forza lavoro</span>',  rowsnm[2]);
        str += _row ('<span class=pdxCapShadowSG>Max popolazione inattiva</span>', rowsnm[3]);
        str += _row ('<span class=pdxCapShadowSG>Popolazione inattiva</span>', rowsnm[4]);
        str += _row ('<span class=pdxCapShadowSG>% Felicità</span>',  rowsnm[5], true);
        str += _row ('<span class=pdxCapShadowSG>Steuern</span>', rowsnm[6], true);
      }
  if (Options.defAnzeigen) {
        str += '<TR><TD class=pdxStat>Dif. Mura</td></tr>';
        rowsnm = [];
        for (r=0; r<5; r++){
          rowsnm[r] = [];
        }
        for(i=0; i<Cities.numCities; i++) {
          var wall = {};
          getWallInfo (Cities.cities[i].id, wall);
          rowsnm[0][i] = parseInt(wall.Crossbows);
          rowsnm[1][i] = parseInt(wall.Trebuchet);
          rowsnm[2][i] = parseInt(wall.Caltrops);
          if (isNaN(parseInt(wall.SpikedBarrier))) // KoC bug if wall lvl 0
            rowsnm[3][i] = 0;
          else
          rowsnm[3][i] = parseInt(wall.SpikedBarrier);
          rowsnm[4][i] = parseInt(wall.Trap);
        }
        if (Options.defBau){
          var q = Seed.queue_unt;
          for(i=0; i<Cities.numCities; i++) {
            var q = Seed.queue_fort['city'+Cities.cities[i].id];
            if (q && q.length>0){
              for (qi=0; qi<q.length; qi++) {
                if (q[qi][0]==53)
                  rowsnm[0][i] += parseInt(q[qi][1]);
                if (q[qi][0]==55)
                  rowsnm[1][i] += parseInt(q[qi][1]);
                if (q[qi][0]==60)
                  rowsnm[4][i] += parseInt(q[qi][1]);
                if (q[qi][0]==61)
                  rowsnm[2][i] += parseInt(q[qi][1]);
                if (q[qi][0]==62)
                  rowsnm[3][i] += parseInt(q[qi][1]);
              }
            }
          }
        }

        rownum = 0;
        str += _row ('<span class=pdxCapShadowRR>Balestre</span>',  rowsnm[0]);
        str += _row ('<span class=pdxCapShadowRR>Trabucchi</span>',  rowsnm[1]);
        str += _row ('<span class=pdxCapShadowRR>Triboli</span>',  rowsnm[2]);
        str += _row ('<span class=pdxCapShadowRR>Spuntoni</span>', rowsnm[3]);
        str += _row ('<span class=pdxCapShadowRR>Trappole</span>',  rowsnm[4]);
      }
    if (Options.includeNahrungUnten) {
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row[i] = rp[1] - usage;
      }
       
      str += '<TR><TD class=pdxStat>Cibo</td></tr>';
      str += _row ('<span class=pdxCapShadowRR>Consumo +/-</span>', row, true);
      
      for(i=0; i<Cities.numCities; i++) {
        if (row[i] >= 0)
          row[i] = '----';
        else {
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-row[i]) * 3600;
          if (timeLeft > 86313600)

            row[i] = '----';
          else {
            if (Options.enableFoodWarn && timeLeft<(Options.foodWarnHours*3600))
              row[i] = '<SPAN class=whiteOnRed>'+ timestrShort(timeLeft) +'</span>';
            else
              row[i] = timestrShort(timeLeft);
          }
        }
      }    
      str += _row ('<span class=pdxCapShadowRR>Autonomia</span>', row, true);
      }
    if (Options.includeInfos) {
      str += '<TR><TD class=pdxStat>Info</td></tr>';
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totWilds = 0;
        dat = Seed.wilderness['city'+ Cities.cities[i].id];
        if (dat!=null && matTypeof(dat)=='object')
          for (k in dat)
            ++totWilds;
        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
    if(castle == 11) castle = 12;
        if (totWilds < castle)
          row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';
        else
          row[i] = totWilds +'/'+ castle;
      }
      str += _row ('<span class=pdxCapShadowRR>Terre</span>', row, true);
  
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
        for (k in dat)
          ++totKnights;
        row[i] = totKnights;
      }
      str += _row ('<span class=pdxCapShadowRR>Cavalieri</span>', row, true);
  
      var now = unixTime();
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.queue_unt['city'+Cities.cities[i].id];
        if (q!=null && q.length>0)
          totTime = q[q.length-1][3] - now;
        if (totTime < 0)
          totTime = 0;
        if (totTime < 3600)
          row[i] = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
        else
          row[i] = timestr(totTime);
      }
      str += _row ('<span class=pdxCapShadowSG>Addest.Trup.</span>', row, true);
      
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var wall = {};
        getWallInfo (Cities.cities[i].id, wall);
        var totTime = 0;
        var q = Seed.queue_fort['city'+Cities.cities[i].id];
        if (q!=null && q.length>0)
          totTime = q[q.length-1][3] - now;
        if (totTime < 0)
          totTime = 0;
        if (totTime<1 && (wall.wallSpaceUsed < wall.wallSpace-4 || wall.fieldSpaceUsed < wall.fieldSpace-4))
          row[i] = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
        else
          row[i] = timestr(totTime);
      }    
      str += _row ('<span class=pdxCapShadowSG>Costruz.Dif.</span>', row, true);
  }

       str += '<table width="800" border="0" cellspacing="0" cellpadding="0"><tr><td colspan="10">&nbsp;</td></tr><tr>\
    <td colspan="10"><b><u>Visualizza Impostazioni</u></b></td></tr><tr>\
    <td width="20"><INPUT type=CHECKBOX id=ptIncWachturm'+ (Options.includeWachturm?' CHECKED':'') +'></td>\
    <td width="72">Torre</td><td width="20"><INPUT type=CHECKBOX id=ptIncMaersche'+ (Options.includeMaersche?' CHECKED':'') +'></td>\
    <td width="219">Slot Occupate</td><td width="20"><INPUT type=CHECKBOX id=ptIncInfos'+ (Options.includeInfos?' CHECKED':'') +'></td>\
    <td width="55">Info</td><td width="20"><INPUT type=CHECKBOX id=ptbevAnzeigen'+ (Options.bevAnzeigen?' CHECKED':'') +'></td>\
    <td width="84">Popolazione</td><td colspan="2">Consumo Cibo: In Alto<INPUT type=CHECKBOX id=ptIncNahrung'+ (Options.includeNahrung?' CHECKED':'') +'>  In Basso \
    <INPUT type=CHECKBOX id=ptIncNahrungUnten'+ (Options.includeNahrungUnten?' CHECKED':'') +'></td>\
  </tr> <tr><td height="20"><INPUT type=CHECKBOX id=ptIncTruppen'+ (Options.includeTruppen?' CHECKED':'') +'></td><td>Truppe</td>\
    <td><INPUT type=CHECKBOX id=ptoverOriginal'+ (Options.includeCity?' CHECKED':'') +'></td>\
    <td>Truppe in città </td><td><INPUT type=CHECKBOX id=ptoverIncTraining'+ (Options.includeTraining?' CHECKED':'') +'></td>\
    <td colspan="3">Truppe in Addestr.</td><td colspan="2">Dimensione carattere: '+ htmlSelector ({9:9, 10:10, 11:11, 12:12, 14:14}, Options.overviewFontSize, 'id=ptoverfont') +'</td>\
  </tr><tr> <td height="20"><INPUT type=CHECKBOX id=ptIncRessis'+ (Options.includeRessis?' CHECKED':'') +'></td>\
    <td>Risorse</td><td><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +'></td>\
    <td>Truppe/Risorse - In Marcia </td><td><INPUT type=CHECKBOX id=ptBauAnzeigen'+ (Options.BauAnzeigen?' CHECKED':'') +'></td>\
    <td>Costruzioni</td><td><INPUT type=CHECKBOX id=ptdefAnzeigen'+ (Options.defAnzeigen?' CHECKED':'') +'></td>\
    <td>Mura</td><td width="20"><INPUT type=CHECKBOX id=ptdefBau'+ (Options.defBau?' CHECKED':'') +'></td><td width="166">Difese in Costruz.</td>\
  </tr></table>';
  str += "</table></div>";
//<INPUT type=CHECKBOX id=ptOverOver'+ (Options.overviewAllowOverflow?' CHECKED':'') +'>
      Tabs.Overview.cont.innerHTML = str;
    document.getElementById('ptIncRessis').addEventListener('click', e_clickEnableRessis, false);
    document.getElementById('ptIncNahrungUnten').addEventListener('click', e_clickEnableNahrungUnten, false);
    document.getElementById('ptIncNahrung').addEventListener('click', e_clickEnableNahrung, false);
      document.getElementById('ptoverOriginal').addEventListener('click', e_clickEnableTroops, false);
     document.getElementById('ptIncWachturm').addEventListener('click', e_clickEnableWachturm, false);
          document.getElementById('ptIncMaersche').addEventListener('click', e_clickEnableMaersche, false);
      document.getElementById('idCheck').addEventListener('click', e_clickEnableMarch, false);
    document.getElementById('ptIncTruppen').addEventListener('click', e_clickEnableTruppen, false);
    document.getElementById('ptBauAnzeigen').addEventListener('click', e_clickEnableBauAnzeigen, false);
    document.getElementById('ptbevAnzeigen').addEventListener('click', e_clickEnablebevAnzeigen, false);
    document.getElementById('ptdefAnzeigen').addEventListener('click', e_clickEnabledefAnzeigen, false);
    document.getElementById('ptdefBau').addEventListener('click', e_clickEnabledefBau, false);
      document.getElementById('ptoverIncTraining').addEventListener('click', e_clickEnableTraining, false);
      //document.getElementById('ptOverOver').addEventListener('click', e_allowWidthOverflow, false);
      document.getElementById('ptoverfont').addEventListener('change', e_fontSize, false);
    document.getElementById('ptIncInfos').addEventListener('click', e_clickEnableInfos, false);
     for(i=0; i<Cities.numCities; i++) {
         var button = document.getElementById('idGotoCity_'+i);
         if (button) {
            button.addEventListener('click', function() { t.clickCity(this); }, false);
        }
      }
      for(i=0; i<Cities.numCities; i++) {
         var button = document.getElementById('idToggleDef_'+i);
         if (button) {
            button.addEventListener('click', function() { t.toggleDefence(this); }, false);
        }
      }
//DebugTimer.display ('Draw Overview');    
    } catch (e){
      Tabs.Overview.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);

    function e_clickEnableTroops (){
      var t = Tabs.Overview;
      Options.includeCity = document.getElementById('ptoverOriginal').checked;
      t.show ();
    }
  function e_clickEnableWachturm (){
      var t = Tabs.Overview;
      Options.includeWachturm = document.getElementById('ptIncWachturm').checked;
      t.show ();
    }
    function e_clickEnableMaersche (){
      var t = Tabs.Overview;
      Options.includeMaersche = document.getElementById('ptIncMaersche').checked;
      t.show ();
    }
  function e_clickEnableRessis (){
      var t = Tabs.Overview;
      Options.includeRessis = document.getElementById('ptIncRessis').checked;
      t.show ();
    }
  function e_clickEnableNahrung (){
      var t = Tabs.Overview;
      Options.includeNahrung = document.getElementById('ptIncNahrung').checked;
      t.show ();
    }
   function e_clickEnableTruppen (){
      var t = Tabs.Overview;
      Options.includeTruppen = document.getElementById('ptIncTruppen').checked;
      t.show ();
    }
 function e_clickEnableBauAnzeigen (){
      var t = Tabs.Overview;
      Options.BauAnzeigen = document.getElementById('ptBauAnzeigen').checked;
      t.show ();
    }
   function e_clickEnablebevAnzeigen (){
      var t = Tabs.Overview;
      Options.bevAnzeigen = document.getElementById('ptbevAnzeigen').checked;
      t.show ();
    }
   function e_clickEnabledefAnzeigen (){
      var t = Tabs.Overview;
      Options.defAnzeigen = document.getElementById('ptdefAnzeigen').checked;
      t.show ();
    }
   function e_clickEnabledefBau (){
      var t = Tabs.Overview;
      Options.defBau = document.getElementById('ptdefBau').checked;
      t.show ();
    }
      function e_clickEnableNahrungUnten (){
      var t = Tabs.Overview;
      Options.includeNahrungUnten = document.getElementById('ptIncNahrungUnten').checked;
      t.show ();
    }
    function e_clickEnableMarch (){
      var t = Tabs.Overview;
      Options.includeMarching = document.getElementById('idCheck').checked;
      t.show ();
    }
    function e_clickEnableTraining (){
      var t = Tabs.Overview;
      Options.includeTraining = document.getElementById('ptoverIncTraining').checked;
      t.show ();
    }
  function e_clickEnableInfos (){
      var t = Tabs.Overview;
      Options.includeInfos = document.getElementById('ptIncInfos').checked;
      t.show ();
    }
    function e_fontSize(evt){
      document.getElementById('overMainDiv').style.fontSize = evt.target.value +'px';
      Options.overviewFontSize = evt.target.value;
    }
/*
    function e_allowWidthOverflow (evt){
      var tf = document.getElementById('ptOverOver').checked;
      Options.overviewAllowOverflow = tf;
      if (tf)
        t.cont.style.overflowX = 'visible';
      else
        t.cont.style.overflowX = 'auto';
    }
*/
  },
  //The next two functions are from "KOC Attack Helper".
ClickWin:function(win,obj,evtName) {
  var evt = win.document.createEvent("MouseEvents");
  evt.initMouseEvent(evtName, true, true, win,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  return !obj.dispatchEvent(evt);
},
Click:function(obj) {
      var t = Tabs.Overview;
  return t.ClickWin(window,obj,'click');
},
clickCity : function (e) {
     var t = Tabs.Overview;
     if ( e ) {
       var m = e.id.split('_');
       var cityNum = parseInt(m[1])+1;
       var cityButton = document.getElementById('citysel_'+cityNum);
       if (cityButton) {
          t.Click(cityButton);
       }
     }
  },
  toggleDefence : function (e) {
     var t = Tabs.Overview;
     if ( e ) {
       var m = e.id.split('_');
       var cityId = Cities.cities[m[1]].id;
       var state = Seed.citystats["city" + cityId].gate;
       //flip state
       //logit ("Def state: "+state);
       if ( state == 1 )
          state = 0;
       else
          state = 1;
       //call to change state
       t.ajaxSetDefMode (cityId, state);
     }
  },
//Modified from power bot - to toggle the defensive stance.
  ajaxSetDefMode : function (cityId, state){
     var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
     params.cid = cityId;
     params.state = parseInt(state);
     new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
           if (rslt.ok) {
              Seed.citystats["city" + cityId].gate = state;
              //logit ("New state: "+state);
           }
        },
        onFailure: function () {
        }
     })
  },
};
function getWallInfo (cityId, objOut){
  objOut.wallSpaceUsed = 0;
  objOut.fieldSpaceUsed = 0;
  objOut.wallLevel = 0;
  objOut.wallSpace = 0;
  objOut.fieldSpace = 0;
  objOut.Crossbows = 0;
  objOut.Trebuchet = 0;
  objOut.Caltrops = 0;
  objOut.Spikes = 0;
  objOut.Trap = 0;
  var b = Seed.buildings["city" + cityId];
  if (b.pos1==null)
    return;
  objOut.wallLevel = parseInt(b.pos1[1]);
  var spots = 0;
  for (var i=1; i<(objOut.wallLevel+1); i++)
    spots += (i * 500);
  objOut.wallSpace = spots;
  objOut.fieldSpace = spots;

  var fort = Seed.fortifications["city" + cityId];
  for (k in fort){
    var id = parseInt(k.substr(4));
    if (id == 53)
      objOut.Crossbows = parseInt(fort[k]);
    else if (id == 55)
      objOut.Trebuchet = parseInt(fort[k]);
    else if (id == 61)
      objOut.Caltrops = parseInt(fort[k]);
    else if (id == 62)
      objOut.SpikedBarrier = parseInt(fort[k]);
    else if (id == 60)
      objOut.Trap = parseInt(fort[k]);
    if (id<60)
      objOut.wallSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
    else
      objOut.fieldSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
  }
}
/*
function getWallInfo (cityId, objOut){
  objOut.wallSpaceUsed = 0;
  objOut.fieldSpaceUsed = 0;
  objOut.wallLevel = 0;  
  objOut.wallSpace = 0;     
  objOut.fieldSpace = 0;  
  var b = Seed.buildings["city" + cityId];
  if (b.pos1==null)
    return;  
  objOut.wallLevel = parseInt(b.pos1[1]);
  var spots = 0;
  for (var i=1; i<(objOut.wallLevel+1); i++)
    spots += (i * 500);
  objOut.wallSpace = spots;     
  objOut.fieldSpace = spots;  
     
  var fort = Seed.fortifications["city" + cityId];
  for (k in fort){
    var id = parseInt(k.substr(4));
    if (id<60)
      objOut.wallSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
    else
      objOut.fieldSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
  }
}    
*/
/****************************  Build Tab  ******************************/
Tabs.build = {
  tabLabel: 'Costruz.',
  tabOrder: toBau,
  myDiv: null,
  timer: null,
  buildTab: null,
  koc_buildslot: null,
  currentBuildMode: null,
  buildStates: [],
  loaded_bQ: [],
  lbQ: [],

  init: function(div){
    var t = Tabs.build;
    var minQlvl = [];
    t.myDiv = div;
    t.koc_buildslot = unsafeWindow.buildslot; //save original koc function
    t.currentBuildMode = "build";
    t.buildStates = {
      running: false,
      help: false,
    };
    t.readBuildStates();

    for (var i = 0; i < Cities.cities.length; i++) {
      var cityId = Cities.cities[i].id;
      var cityID = 'city' + cityId;
      minQlvl[i] = [];
      t["bQ_" + cityId] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + cityId, '[]'));
      if (typeof t["bQ_" + cityId] == 'undefined' || (t["bQ_" + cityId]) == "") {
        t["bQ_" + cityId] = [];
      }
/*    else {
        for (var j=0; j < t["bQ_" + cityId].length; j++) {
          var qRec = t["bQ_" + cityId][j]
          if (qRec.buildingMode == 'build') {
            //GM_log(t.getCityNameById(qRec.cityId) + ' ' + qRec.buildingPos + ' ' + qRec.buildingType + ' ' + qRec.buildingLevel + ' ' + timestr(qRec.buildingTime));
            if (minQlvl[i][qRec.buildingPos] != undefined) {
              if (minQlvl[i][qRec.buildingPos] > qRec.buildingLevel)
                minQlvl[i][qRec.buildingPos] = qRec.buildingLevel;
            } else
              minQlvl[i][qRec.buildingPos] = qRec.buildingLevel;
          }
        }
      }
      //GM_log(t.getCityNameById(cityId));
      //GM_log(inspect(minQlvl[i], 10, 1, false));
      var qcon = Seed.queue_con["city" + Cities.cities[i].id], btimestr = '0s';
      if (qcon.length>0) {
        cTgtLvl = qcon[0][1];
        cPos = qcon[0][7];
      } else {
        cTgtLvl = 100;
        cPos = 1000;
      }
      for (var j in Seed.buildings[cityID]){
        var bLvl = parseInt(Seed.buildings[cityID][j][1]);
        var bPos = parseInt(Seed.buildings[cityID][j][2]);
        if (minQlvl[i][bPos] != undefined) { // we have something in the queue for this position
          var qLvl = minQlvl[i][bPos];
          if (bLvl < qLvl || (bPos == cPos && cTgtLvl < qLvl)) { // we have a gap
            //GM_log ('Position='+j+', Current level='+bLvl+', Min queue level='+minQlvl[i][bPos]);
      var buildingMode = "build";
      var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
      var buildingMult = result[0];
      var buildingTime = result[1];
      var queueId = t["bQ_" + cityId].length;
      //t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
      //t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);

            //if (bPos == cPos
          }
        }
      } */
    }

    var m = '<DIV id=pbBuildDivF class=pdxStat>IMPOSTAZIONI AUTO COSTRUZIONE</div><TABLE id=pbbuildfunctions width=100% height=0% class=pdxTab><TR>';
    if (t.buildStates.running == false) {
      m += '<TD><INPUT id=pbBuildRunning type=submit value="Costruz. = NO"></td>';
    } else {
      m += '<TD><INPUT id=pbBuildRunning type=submit value="Costruz. = SI"></td>';
    }
    m += '<TD><INPUT id=pbBuildMode type=submit value="Coda costruz. = NO"></td>';
    m += '<TD>Modalità: <SELECT id="pbBuildType">\
      <OPTION value=build>aumenta 1 livello</option>\
      <OPTION value=max>porta a livello 9</option>\
      <OPTION value=destruct>distruggi</option>\
      </select></td>';
    m += '<TD><INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>Chiedere aiuto ?</td>';
    m += '</tr></table></div>';
    m += '<DIV id=pbBuildDivQ class=pdxStat>STATO DELL\' AUTO COSTRUZIONE</div>';
    m += '<TABLE id=pbbuildqueues width=100% height=0% class=ptentry><TR>';
    for (var i = 0; i < Cities.cities.length; i++) {
      m += '<TD colspan=2 width=100 class=ptentry2><CENTER><B>' + Cities.cities[i].name + '</b></center></td>';
    }
    m += '</tr><TR>';
    for (var i = 0; i < Cities.cities.length; i++) {
      m += '<TD colspan=2 class=ptentry2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value="Mostra"></center></td>';
    }
    m += '</tr><TR>';
    for (var i = 0; i < Cities.cities.length; i++) {
      m += '<TD align=right class=ptentry2 width=2%>E.R.</td>';
      m += '<TD align=left  class=ptentry2 width=9% id=pbbuildcount_' + Cities.cities[i].id + '>' + t["bQ_" + Cities.cities[i].id].length + '</td>';
    }
    m += '</tr><TR>';
    for (var i = 0; i < Cities.cities.length; i++) {
      t['totalTime_' + Cities.cities[i].id] = 0;
      cbQ = t["bQ_" + Cities.cities[i].id];
      if (typeof cbQ != 'undefined') {
        for (var j = 0; j < cbQ.length; j++) {
          t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].id]) + parseInt(cbQ[j].buildingTime);
        }
        timestring = timestr(t['totalTime_' + Cities.cities[i].id]);
      }
      m += '<TD align=right class=ptentry2 width=2%>T.T.R.:</td>';
      m += '<TD align=left  class=ptentry2 width=9% id=pbbuildtotal_' + Cities.cities[i].id + '>' + timestring + '</td>';
    }
    m += '</tr><TR>';
    var now = unixTime();
    for (var i = 0; i < Cities.cities.length; i++) {
      var qcon = Seed.queue_con["city" + Cities.cities[i].id], btimestr = '0s';
      if (qcon.length>0) {
        btimestr = timestr(parseInt(qcon[0][4])-now);
      }
      m += '<TD align=right class=ptentry2 width=2%>T.R.:</td>';
      m += '<TD align=left  class=ptentry2 width=9% id=pbbuildtime_' + Cities.cities[i].id + '>' + btimestr + '</td>';
    }
    m += '</tr></table><SPAN class=boldRed id=pbbuildError></span>';
    t.myDiv.innerHTML = m;

    for (var i = 0; i < Cities.cities.length; i++) {
      var cityId = Cities.cities[i].id;
      var btnName = 'pbbuild_' + cityId;
      addQueueEventListener(cityId, btnName);
      t.showBuildQueue(cityId, false);
      for (var j=0; j < t["bQ_" + cityId].length; j++) {
        var qRec = t["bQ_" + cityId][j]
        if (qRec.buildingMode == 'build') {
          //GM_log(t.getCityNameById(qRec.cityId) + ' ' + qRec.buildingPos + ' ' + qRec.buildingType + ' ' + qRec.buildingLevel + ' ' + timestr(qRec.buildingTime));
          if (minQlvl[i][qRec.buildingPos] != undefined) {
            if (minQlvl[i][qRec.buildingPos] > parseInt(qRec.buildingLevel))
              minQlvl[i][qRec.buildingPos] = parseInt(qRec.buildingLevel);
          } else
            minQlvl[i][qRec.buildingPos] = parseInt(qRec.buildingLevel);
        }
      }
      //GM_log(t.getCityNameById(cityId));
      //GM_log(inspect(minQlvl[i], 10, 1, false));
      var qcon = Seed.queue_con["city" + Cities.cities[i].id], btimestr = '0s';
      if (qcon.length>0) {
        cTgtLvl = qcon[0][1];
        cPos = qcon[0][7];
      } else {
        cTgtLvl = 100;
        cPos = 1000;
      }
      //GM_log('cPos='+cPos+'cTgtLvl='+cTgtLvl);
      for (var j in Seed.buildings[cityID]){
        var bType = parseInt(Seed.buildings[cityID][j][0]);
        var bLvl = parseInt(Seed.buildings[cityID][j][1]);
        var bPos = parseInt(Seed.buildings[cityID][j][2]);
        var bId = parseInt(Seed.buildings[cityID][j][3]);
        if (minQlvl[i][bPos] != undefined) { // we have something in the queue for this position
          var qLvl = minQlvl[i][bPos];
          //GM_log(bType+' '+bLvl+' '+bPos+' '+bId);
          //GM_log('Position='+bPos+', Current level='+bLvl+', Min queue level='+minQlvl[i][bPos]);
          if (bLvl < qLvl || (bPos == cPos && cTgtLvl < qLvl)) { // we have a gap
            var minAddLvl = bLvl; // i.e. upgrading from the current level
            var maxAddLvl = qLvl - 1; //    to just below the lowest existing level in the queue
            if (bPos == cPos && cTgtLvl < qLvl) // then we upgrade from the next level
              minAddLvl++;
            //GM_log('minAddLvl='+minAddLvl+', maxAddLvl='+maxAddLvl);
            for (var newQLvl=minAddLvl; newQLvl<=maxAddLvl; newQLvl++) {
              var buildingPos = bPos;
              var buildingType = bType;
              var buildingId = bId;
              var buildingLevel = newQLvl;
              var buildingMode = "build";
              var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
              var buildingMult = result[0];
              var buildingTime = result[1];
              var buildingAttempts = 0;
              var queueId = t["bQ_" + cityId].length;
              //GM_log(queueId+' '+cityId+' '+buildingPos+' '+buildingType+' '+buildingId+' '+buildingTime+' '+buildingLevel+' '+buildingAttempts+' '+buildingMult+' '+buildingMode);
              //t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
              //t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
            }
          }
        }
      }
    }

    t.e_autoBuild(); //start checking if we can build someting

    document.getElementById('pbBuildType').addEventListener('change', function(){t.setBuildMode(this.value);}, false);
    document.getElementById('pbBuildRunning').addEventListener('click', function(){
      t.toggleStateRunning(this);
    }, false);
    document.getElementById('pbBuildMode').addEventListener('click', function(){
      t.toggleStateMode(this);
    }, false);
    document.getElementById('pbHelpRequest').addEventListener ('change', function (){
      t.buildStates.help = (document.getElementById('pbHelpRequest').checked);
      t.saveBuildStates();
    }, false);

    window.addEventListener('unload', t.onUnload, false);

    function addQueueEventListener(cityId, name){
      document.getElementById(name).addEventListener('click', function(){
        t.showBuildQueue(cityId, true);
      }, false);
    }
  },

  setBuildMode: function (type) {
    var t = Tabs.build;
    t.currentBuildMode = type;
  },

  e_autoBuild: function(){
    var t = Tabs.build;
    document.getElementById('pbbuildError').innerHTML = '';
    if (t.buildStates.running == true) {
      var now = unixTime();
      for (var i = 0; i < Cities.cities.length; i++) {
        var cityId = Cities.cities[i].id;
        var isBusy = false;
        var qcon = Seed.queue_con["city" + cityId], btimestr = '0s';
        if (matTypeof(qcon)=='array' && qcon.length>0) {
          var buildtimeremainsec=parseInt(qcon[0][4])-now
          if (buildtimeremainsec > 0) {
            isBusy = true;
            btimestr = timestr(buildtimeremainsec);
          } else
            qcon.shift();   // remove expired build from queue
        }
        document.getElementById('pbbuildtime_' + cityId).innerHTML = btimestr;
        if (isBusy) {
          //TODO add info of remaining build time and queue infos
        } else {
          if (t["bQ_" + cityId].length > 0) { // something to do?
            var bQi = t["bQ_" + cityId][0];   //take first queue item to build
            t.doOne(bQi);;
          }
        }
      }
    }
    setTimeout(t.e_autoBuild, 10000); //should be at least 10
  },

  doOne: function (bQi){
    var t = Tabs.build;
    var currentcityid = parseInt(bQi.cityId);
    var cityName = t.getCityNameById(currentcityid);
    var time = parseInt(bQi.buildingTime);
    var mult = parseInt(bQi.buildingMult);
    var attempt = parseInt(bQi.buildingAttempt);

    var mode = bQi.buildingMode;

    var citpos = parseInt(bQi.buildingPos);

    if (Seed.buildings['city' + currentcityid]["pos" + citpos] != undefined && Seed.buildings['city' + currentcityid]["pos" + citpos][0] != undefined) {
      var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
      var bdgid = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][0]);

      var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
      var curlvl = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][1]);

      var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
      var bid = parseInt(Seed.buildings["city" + currentcityid]["pos" + citpos][3]);

      if (curlvl > 8 && mode == 'build') {
        t.cancelQueueElement(0, currentcityid, time, false);
        actionLog("Costruzione eliminata dalla coda: il livello è 9 o superiore");
        return;
      };
      if (isNaN(curlvl)) {
        t.cancelQueueElement(0, currentcityid, time, false);
        actionLog("Errore auto costruzione");
        return;
      }
      if (l_bdgid != bdgid) {
        t.cancelQueueElement(0, currentcityid, time, false);
        actionLog("Errore: livello non corrispondente");
        return;
      }
      if (l_bid != bid) {
        t.cancelQueueElement(0, currentcityid, time, false);
        actionLog("Errore: requisiti non soddisfatti");
        return;
      }
      if (l_curlvl < curlvl) {
          t.cancelQueueElement(0, currentcityid, time, false);
          actionLog("Edificio eliminato dalla coda: livello 9 o superiore");
          return;
      }
      if (l_curlvl > curlvl && mode == 'build') {
          t.requeueQueueElement(bQi);
          return;
      }

      if (mode == 'destruct') {
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.cid = currentcityid;
        params.bid = "";
        params.pos = citpos;
        params.lv = curlvl - 1;
        if (curlvl >= 1) {
          params.bid = bid;
        }
        params.type = bdgid;
        new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/destruct.php" + unsafeWindow.g_ajaxsuffix, {
          method: "post",
          parameters: params,
          onSuccess: function(rslt){
            if (rslt.ok) {
              actionLog("Distruggi " + unsafeWindow.buildingcost['bdg' + bdgid][0] + "a " + cityName);
              Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
              if (params.cid == unsafeWindow.currentcityid)
                unsafeWindow.update_bdg();
              if (document.getElementById('pbHelpRequest').checked == true)
                t.bot_gethelp(params.bid, currentcityid);
              t.cancelQueueElement(0, currentcityid, time, false);
            } else {
              var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
              t.requeueQueueElement(bQi);
              document.getElementById('pbbuildError').innerHTML = errmsg;
              logit(errmsg);
            }
          },
          onFailure: function(){
            document.getElementById('pbbuildError').innerHTML = "Errore durante la demolizione, riprovare più tardi";
          }
        })
      }
      if (mode == 'build') {
        var invalid = false;
        var chk = unsafeWindow.checkreq("bdg", bdgid, curlvl); //check if all requirements are met
        for (var c = 0; c < chk[3].length; c++) {
          if (chk[3][c] == 0) {
            invalid = true;
          }
        }
        if (invalid == false) {
          var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
          params.cid = currentcityid;
          params.bid = "";
          params.pos = citpos;
          params.lv = curlvl + 1;
          if (params.lv > 9){ //make sure that no level 10+ is built
            t.cancelQueueElement(0, currentcityid, time, false);
            actionLog("A causa dei requisiti, costruire gli edifici oltre il liv 9 manualmente");
            return;
          }
          if (params.lv > 1) {
            params.bid = bid;
          }
          params.type = bdgid;

          new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/construct.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function(rslt){
              if (rslt.ok) {
                actionLog("Auto Bau: " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " - Level " + params.lv + " - Heiligtum " + cityName);
                Seed.resources["city" + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][1]) * mult * 3600;
                Seed.resources["city" + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][2]) * mult * 3600;
                Seed.resources["city" + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][3]) * mult * 3600;
                Seed.resources["city" + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][4]) * mult * 3600;
                Seed.citystats["city" + currentcityid].gold[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][5]) * mult;
                Seed.queue_con["city" + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(),  unsafeWindow.unixtime() + time, 0, time, citpos]);
                if (params.cid == unsafeWindow.currentcityid)
                  unsafeWindow.update_bdg();
                if (document.getElementById('pbHelpRequest').checked == true)
                  t.bot_gethelp(params.bid, currentcityid);
                t.cancelQueueElement(0, currentcityid, time, false);
              } else {
                var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
                if (rslt.error_code == 103) { // building has already the target level => just  delete
                  t.cancelQueueElement(0, currentcityid, time, false);
                  actionLog("Costruzione annullata: la costruzione è già al livello desiderato o c\' è un\' altra costruzione in corso");
                } else {
                  t.requeueQueueElement(bQi);
                  document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name +': '+ errmsg + " La costruzione è stata nuovamente aggiunta";
                }
                logit(errmsg);
              }
            },
            onFailure: function(){
              document.getElementById('pbbuildError').innerHTML = "Errore di connessione, riprovare più tardi";
            }
          });
        } else {
          t.requeueQueueElement(bQi); // requeue item if check is invalid
        }
      }
    } else {
      t.cancelQueueElement(0, currentcityid, time, false);
      actionLog("Edificio non trovato");
    }
  },

  requeueQueueElement: function (bQi) {
    var t = Tabs.build;
    var cityId = bQi.cityId;
    var buildingPos = parseInt(bQi.buildingPos);
    var buildingId = parseInt(bQi.buildingId);
    var buildingLevel = parseInt(bQi.buildingLevel);
    var buildingType = parseInt(bQi.buildingType);
    var buildingTime = parseInt(bQi.buildingTime);
    var buildingMult = parseInt(bQi.buildingMult);
    var buildingAttempts = parseInt(bQi.buildingAttempts);
    var buildingMode = bQi.buildingMode;

    t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts + 1, buildingMult, buildingMode); // requeue item
    t.cancelQueueElement(0, cityId, buildingTime, false); // delete Queue Item
  },
    show : function (cont){
    var t = Tabs.build;
     mainPop.div.style.width = 750 + 'px';
     if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },
    bot_buildslot: function(c, a){
        var t = Tabs.build;
    var cityId = t.getCurrentCityId();
        var buildingPos   = c.id.split("_")[1];
        var buildingType  = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][0]);
        var buildingLevel = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
    var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
    if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Typ: " + buildingType + " Level: " + buildingLevel + " ID: " + buildingId);
      var buildingAttempts = 0;
    var loaded_bQ = t["bQ_" + cityId];
    if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
      var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
    } else {
      var current_construction_pos = "";
    }
    if (loaded_bQ.length == 0 && current_construction_pos != "" ) { //check anyway if there is currently build in progess for this specific building
      if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
        buildingLevel += 1;
      }
    } else {
      if (current_construction_pos != "" && current_construction_pos == buildingId) {
        buildingLevel += 1;
      }
      for (var i = 0; i < loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
        var loadedCity = loaded_bQ[i].cityId;
        var loadedSlot = loaded_bQ[i].buildingPos;
        if (loadedSlot == buildingPos && loadedCity == cityId) {
          buildingLevel += 1;
        }
        if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { // check if destrcution is already in queue
          t.modalmessage('Demolizione già in coda!');
          return;
        }
      }
    }
    if (t.currentBuildMode == "build") {
      if (buildingLevel >= 9) {
        t.modalmessage('Du hast versucht über lvl 9 zu baun \nDie solltest du schon selbst bauen waren ja nicht grad billig die Göttlichen ;)');
        return;
      }
      var buildingMode = "build";
      var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
      var buildingMult = result[0];
      var buildingTime = result[1];
      var queueId = loaded_bQ.length;
      t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
      t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
    }
    if (t.currentBuildMode == "max") {
      var buildingMode = "build";
      for (var bL = buildingLevel; bL <9; bL++) {
        var queueId = loaded_bQ.length;
        var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
        var buildingMult = result[0];
        var buildingTime = result[1];
        queueId = queueId ;
        t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
        t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
      }
    }
    if (t.currentBuildMode == "destruct") {
      var buildingMode = "destruct";
      var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
      var buildingMult = result[0];
      var buildingTime = result[1];
      var queueId = loaded_bQ.length;
      t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
      t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
    }
  },

  calculateQueueValues: function (cityId, buildingLevel, buildingType, buildingMode) {
    var t = Tabs.build;
    var now = unixTime();
    if (buildingMode == 'build') {
      var buildingMult = Math.pow(2, buildingLevel);
    }
    if (buildingMode == 'destruct') {
      var buildingMult = Math.pow(2, buildingLevel - 2);
    }

    var knights = Seed.knights["city" + cityId];
    if (knights) {
      var polKniId = parseInt(Seed.leaders['city' + cityId].politicsKnightId);
      if (polKniId) {
        var polValue = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politics);
        var polBoost = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politicsBoostExpireUnixtime);
        if ((polBoost - now) > 0) {
          polValue = parseInt(polValue * 1.25);
        }
      } else {
        polValue = 0;
      }
    } else {
      polValue = 0;
    }

    var buildingTime = unsafeWindow.buildingcost["bdg" + buildingType][7] * buildingMult;
    if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
      buildingTime = 15;
    }
    if (buildingMode == 'build') {
      buildingTime = parseInt(buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16)));
    }
    if (buildingMode == 'destruct') {
      buildingTime = buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16));
      if (buildingTime % 1 > 0) {
        buildingTime = parseInt(buildingTime);
      }
    }

    var result = new Array(buildingMult, buildingTime);
    return result;
  },

  bot_gethelp: function (f, currentcityid) {
    var a = qlist = Seed.queue_con["city" + currentcityid];
    var e = 0;
    var d = 0;
    for (var c = 0; c < a.length; c++) {
      if (parseInt(a[c][2]) == parseInt(f)) {
        e = parseInt(a[c][0]);
        d = parseInt(a[c][1]);
        break
      }
    }
    var b = new Array();
    b.push(["REPLACE_LeVeLbUiLdInG", d]);
    b.push(["REPLACE_BuIlDiNgNaMe", unsafeWindow.buildingcost["bdg" + e][0]]);
    b.push(["REPLACE_LeVeLiD", d]);
    b.push(["REPLACE_AsSeTiD", f]);
    var g = function(h, i) {
      unsafeWindow.continuation_95(h, i);
      if (!h) {
        var j = d > 1 ? unsafeWindow.cm.SpeedUpType.upgrade: unsafeWindow.cm.SpeedUpType.build;
        unsafeWindow.cm.ClientSideCookieManager.setCookie(j, false)
      }
    };
    unsafeWindow.common_postToProfile("95", unsafeWindow.Object.cloneFeed(unsafeWindow.template_data_95), unsafeWindow.Object.cloneFeed(unsafeWindow.actionlink_data_95), g, b)
  },

  addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
    var t = Tabs.build;
    var lbQ = t["bQ_" + cityId];
    lbQ.push({
      cityId:            cityId,
      buildingPos:      buildingPos,
      buildingType:      buildingType,
      buildingId:        buildingId,
      buildingTime:      buildingTime,
      buildingLevel:    buildingLevel,
      buildingAttempts:  buildingAttempts,
      buildingMult:      buildingMult,
      buildingMode:      buildingMode
    });
    t.modifyTotalTime(cityId, 'increase', buildingTime); //adjust total Time
  },

  modalmessage: function(message){
    var t = Tabs.build;
    var timeout = 10000;
    var content = "Chiusura automatica dopo 10 secondi...<br><br>"
    content += message;
    unsafeWindow.Modal.showAlert(content);
    window.setTimeout('unsafeWindow.Modal.hideModal();', timeout);
  },

  modifyTotalTime: function (cityId, type, buildingTime) {
    var t = Tabs.build;
    var element = document.getElementById('pbbuildcount_' + cityId);
    var currentCount = parseInt(element.innerHTML);
    if (type == "increase") {
      t['totalTime_' + cityId] = t['totalTime_' + cityId] + buildingTime;
      var currentCount = currentCount + 1;
    }
    if (type == "decrease") {
      t['totalTime_' + cityId] = t['totalTime_' + cityId] - buildingTime;
      var currentCount = currentCount - 1;
    }
    element.innerHTML = currentCount;
    document.getElementById('pbbuildtotal_' + cityId).innerHTML = timestr(t['totalTime_' + cityId]);
  },

 hide : function (){
    var t = Tabs.build;
     mainPop.div.style.width = 750 + 'px';
     if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },

  onUnload: function(){
    var t = Tabs.build;
    for (var i = 0; i < Cities.cities.length; i++) {
      //t["bQ_" + Cities.cities[i].id] = []; //clean up if needed
      GM_setValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, JSON2.stringify((t["bQ_" + Cities.cities[i].id])));
    }
    t.saveBuildStates();
  },

  _addTab: function(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode){
    var t = Tabs.build;
    var row = document.getElementById('pbCityQueueContent').insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML = queueId;
    if (buildingMode == "destruct") {
      row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_att.png">';
    } else {
      row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_prod.png">';
    }
    row.insertCell(2).innerHTML = unsafeWindow.buildingcost['bdg' + buildingType][0];
    row.insertCell(3).innerHTML = timestr(buildingTime);
    if (buildingMode == "destruct") {
      row.insertCell(4).innerHTML = 0;
    } else {
      row.insertCell(4).innerHTML = buildingLevel + 1; // => target Level
    }
    row.insertCell(5).innerHTML = buildingAttempts;
    row.insertCell(6).innerHTML = '<a class="button20" id="queuecancel_' + queueId + '"><span>Cancella</span></a>';
    document.getElementById('queuecancel_' + queueId).addEventListener('click', function(){
      t.cancelQueueElement(queueId, cityId, buildingTime, true);
    }, false);
  },

  cancelQueueElement: function(queueId, cityId, buildingTime, showQueue){
    var t = Tabs.build;
    var queueId = parseInt(queueId);
    t["bQ_" + cityId].splice(queueId, 1);
    t.modifyTotalTime(cityId, 'decrease', buildingTime); //adjust total Time

    if (showQueue == true) {
      t.showBuildQueue(cityId, false);
    }
  },

  showBuildQueue: function(cityId, focus){
    var t = Tabs.build;
    clearTimeout (t.timer);
    var popBuildQueue = null;
    var cityName = t.getCityNameById(cityId);
    if (t.popBuildQueue == null) {
      t.popBuildQueue = new CPopup('pbbuild_' + cityId, 0, 0, 370, 600, true, function() {clearTimeout (t.timer);});
    }
    var m = '<DIV style="max-height:560px; height:560px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pdxTabPad" id="pbCityQueueContent">';
    t.popBuildQueue.getMainDiv().innerHTML = '</table></div>' + m;
    t.popBuildQueue.getTopDiv().innerHTML = '<TD width="220px"><B>Coda di costruzione per ' + cityName + '</b></td><TD><INPUT id=pbOptimizeByTime type=submit value="Riordina in base al tempo"></td>';
    t.paintBuildQueue(cityId);
    if (focus)
      t.popBuildQueue.show(true);
    document.getElementById('pbOptimizeByTime').addEventListener('click', function(){t.clearBuildQueue();t.paintBuildQueue(cityId, true);}, false);
    t.timer = setTimeout (function() {t.showBuildQueue(cityId, false)}, 5000);
  },

  paintBuildQueue: function(cityId, optimize){
    var t = Tabs.build;
    var lbQ = t["bQ_" + cityId];
    if (optimize == true) {
      lbQ.sort(function(a,b){return a.buildingTime - b.buildingTime});
    }
    t["bQ_" + cityId] = lbQ;
    for (var i = 0; i < lbQ.length; i++) {
      var queueId = i;
      t._addTab(queueId, lbQ[i].cityId, lbQ[i].buildingType, lbQ[i].buildingTime, lbQ[i].buildingLevel, lbQ[i].buildingAttempts, lbQ[i].buildingMode);
    }
  },

  clearBuildQueue: function() {
    var t = Tabs.build;
    var table = document.getElementById('pbCityQueueContent');
    var rows = table.rows;
    while(rows.length)
      table.deleteRow(rows.length-1);
  },

  getCurrentCityId: function(){ // TODO maybe move as global function to the core application
    if (!unsafeWindow.currentcityid)
      return null;
    return unsafeWindow.currentcityid;
  },

  saveBuildStates: function(){
    var t = Tabs.build;
    var serverID = getServerId();
    GM_setValue('buildStates_' + serverID, JSON2.stringify(t.buildStates));
  },

  readBuildStates: function(){
    var t = Tabs.build;
    var serverID = getServerId();
    s = GM_getValue('buildStates_' + serverID);
    if (s != null) {
      states = JSON2.parse(s);
      for (k in states)
        t.buildStates[k] = states[k];
    }
  },

  toggleStateRunning: function(obj){
    var t = Tabs.build;
    if (t.buildStates.running == true) {
      t.buildStates.running = false;
      t.saveBuildStates();
      obj.value = "Costruz. = NO";
    } else {
      t.buildStates.running = true;
      t.saveBuildStates();
      obj.value = "Costruz. = SI";
    }
  },


  toggleStateMode: function(obj){
    var t = Tabs.build;
    if (obj.value == 'Inserisci coda = NO') {
      unsafeWindow.buildslot = t.bot_buildslot; // overwrite original koc function
      obj.value = "Inserisci coda = SI";
    } else {
      unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
      obj.value = "Inserisci coda = NO";
    }
  },

  getCityNameById: function (cityId) {
    return Cities.byID[cityId].name;
  },
}
// END BAU


/****************************  Teamspeak Tab   ******************************/
Tabs.Ts3 = {                   
  tabLabel : 'Ts3',
  tabOrder : toTs3,             
  cont : null,
  timer : null,

  tslink :  'http://www.tsviewer.com/ts_viewer_connect.php?ID=962666',  
  
  init : function (div){    
    var t = Tabs.Ts3;
    t.myDiv = div;
    div.innerHTML = '<CENTER><iframe allowtransparency="true" src="'+ t.tslink +'" width="100%" height="550" name="board_in_a_box" <p>Il tuo browser non supporta i frame, è possibile richiamare la pagina nascosta attraverso questo link: <a href="'+ t.tslink +'"> Teamspeak server </ a> </ p> </ iframe> <BR> </ center> ';
  },
  
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.Ts3;
    mainPop.div.style.width = 750 + 'px';
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.Ts3;
    mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
  },
}

/****************************  IMO Tab   ******************************/
Tabs.IM = {
  tabOrder : toIM,                    // order to place tab in top bar
  tabLabel : 'IM',            // label to show in main window tabs
  myDiv : null,
  timer : null,
  messengerlink :  'https://imo.im',  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.IM;
    t.myDiv = div;
    div.innerHTML = "";
  },
  
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.IM;
    mainPop.div.style.width = 750 + 'px';
     t.myDiv.innerHTML ="";
      
  },
  show : function (){         // called whenever this tab is shown
    var t = Tabs.IM;
    mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
    
      t.myDiv.innerHTML = '<CENTER><iframe src="'+ t.messengerlink +'" width="100%" height="550" name="board_in_a_box" <p>Ihr Browser kann leider keine eingebetteten Frames anzeigen: Sie k&ouml;nnen die eingebettete Seite &uuml;ber den folgenden Verweis aufrufen: <a href="'+ t.messengerlink +'">Truppen Spostamenti</a></p> </iframe> <BR></center>';
  },
}


/*************************************** Train Tab ***********************************************/

Tabs.Train = {
  tabLabel : 'Addestra',
  tabOrder : toAusbildung,
  cont : null,
  timer : null,
  stats : {},
  selectedCity : {},

  init : function (div){
    var t = Tabs.Train;
    t.cont = div;
 unsafeWindow.cancelTrain = t.butcancelTrain;
unsafeWindow.cancelFort = t.butcancelFort;
    s = "<DIV id=trainTopSelect>\
      <DIV class=pdxStat id=trainheader>Addestra le truppe e costruisci le difese della città</div><DIV style='height:10px'></div><DIV class=pdxEntry>\
      <DIV style='text-align:center; margin-bottom:10px;'>Città: &nbsp; <span id=ptspeedcity></span></div>\
      <TABLE class=pdxTab2 width=100%><TR valign=top><TD width=50%>\
      <TABLE align=center><TR><TD align=right>Tipo di truppa </td><TD colspan=2>\
      <SELECT id=ptttType>\
        <option value='1'>Truppe rifornimento</option>\
        <option value='2'>Soldati semplici</option>\
        <option value='3'>Esploratori</option>\
        <option value='4'>Lancieri</option>\
        <option value='5'>Spadaccini</option>\
        <option value='6'>Arcieri</option>\
        <option value='7'>Cav. leggera</option>\
        <option value='8'>Cav. pesante</option>\
        <option value='9'>Carri di rifornimento</option>\
        <option value='10'>Baliste</option>\
        <option value='11'>Arieti</option>\
        <option value='12'>Catapulte</option>\
      </select> &nbsp; max. <span id=ptttSpMax></span></td></tr>\
      <TR><TD align=right>unità per Slot: </td><TD><INPUT id='ptttInpPS' size=5 type='text' value='0'\></td>\
        <TD><INPUT id='ptttButMaxPS' type=submit value='max'\> &nbsp; max. <span id=ptttSpMaxPS>0</span></td></tr>\
      <TR><TD align=right>numero Slots: </td><TD><INPUT id='ptttInpSlots' size=2 type='text' value='1'\></td>\
        <TD width=75%><INPUT id='ptttButMaxSlots' type=submit value='max'\> &nbsp; max. <span id=ptttSpMaxSlots>1</span></td></tr>\
      <TR><TD align=right>Limitato: </td><td colspan=2><font color=#FF0000><B> <span id=ptttLimiter></span> </b></font></TD></TR>\
      <TR><TD align=right valign=top>Metti i lavoratori in pausa </td><TD colspan=2><INPUT type=CHECKBOX id=chkPop"+ (Options.maxIdlePop?' CHECKED ':'') +"> \
        <SPAN style='white-space:normal;'>Ti permette di addestrare piu' truppe ma la popolazione potrebbe andare in negativo. <FONT COLOR=#600000><B>(La produzione di risorse si ferma quando la popolazione è in negativo)</b></font></span></td></tr>\
      <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='ptttButDo' type=submit value='Addestra'\></td></tr>\
      </table></td><TD width=20></td><TD style='border-left:solid 2px;' width=50% align=center>\
      <TABLE align=center><TR><TD align=right>Tipo difesa </td><TD colspan=2>\
      <SELECT id=pttdType>\
        <option value='53'>Balestre</option>\
        <option value='55'>Trabucchi</option>\
        <option value='60'>Trappole</option>\
        <option value='61'>Triboli</option>\
        <option value='62'>Spuntoni</option>\
      </select> &nbsp; <span id=pttdSpMax></span></td></tr>\
      <TR><TD align=right>Unità per Slot: </td><TD><INPUT id='pttdInpPS' size=5 type='text' value='0'\></td>\
        <TD><INPUT id='pttdButMaxPS' type=submit value='max'\> &nbsp; max. <span id=pttdSpMaxPS>0</span></td></tr>\
      <TR><TD align=right>Numero Slots: </td><TD><INPUT id='pttdInpSlots' size=2 type='text' value='1'\></td>\
        <TD width=75%><INPUT id='pttdButMaxSlots' type=submit value='max'\> &nbsp; max. <span id=pttdSpMaxSlots>1</span></td></tr>\
      <TR align=center><td align=right>Limitato da: </td><TD colspan=2 align=left><font color=#FF0000><B> <span id=pttdLimiter></span> </b></font></td></tr>\
      <TR align=center><TD colspan=3><SPAN id=pttdSpace></span></td></tr>\
      <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='pttdButDo' type=submit value='Costruisci difese'\></td></tr></table>\
      </td></tr></table></div></div>\
      <TABLE align=center width=425 class=pdxTab2><TR><TD><div id=ptTrainStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>\
      <div style='height: 325px; background: #e8ffe8'>\
      <TABLE width=100% class=pdxTab2><TR><TD colspan=3><DIV id=divSTtop></div></td></tr>\
      <TR><TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>Coda addestramento truppe &nbsp; (<SPAN id=statTTtot></span>)</b><BR><HR></div><DIV id=divSTleft style='overflow-y: auto; height:210px; max-height:210px'></div></td>\
        <TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>Coda addestramento difese sulla mura &nbsp; (<SPAN id=statDTtot></span>)</b><BR><HR></div><DIV id=divSTright style='overflow-y: auto; height:210px; max-height:210px'></div></td></tr>\
      </div>";
    t.cont.innerHTML = s;

    var dcp = new CdispCityPicker ('ptspeed', document.getElementById('ptspeedcity'), true, t.clickCitySelect, 0);
    t.TTspMax = document.getElementById ('ptttSpMax');
    t.TTspMaxPS = document.getElementById ('ptttSpMaxPS');
    t.TTspMaxSlots = document.getElementById ('ptttSpMaxSlots');
    t.TTbutMaxSlots = document.getElementById ('ptttButMaxSlots');
    t.TTbutMaxPerSlot = document.getElementById ('ptttButMaxPS');
    t.TTinpPerSlot = document.getElementById ('ptttInpPS');
    t.TTinpSlots = document.getElementById ('ptttInpSlots');
    t.TTselType = document.getElementById ('ptttType');
    t.TTbutDo = document.getElementById ('ptttButDo');
    t.TTlimiter = document.getElementById ('ptttLimiter');
    t.TDspMax = document.getElementById ('pttdSpMax');
    t.TDspMaxPS = document.getElementById ('pttdSpMaxPS');
    t.TDspMaxSlots = document.getElementById ('pttdSpMaxSlots');
    t.TDbutMaxSlots = document.getElementById ('pttdButMaxSlots');
    t.TDbutMaxPerSlot = document.getElementById ('pttdButMaxPS');
    t.TDinpPerSlot = document.getElementById ('pttdInpPS');
    t.TDinpSlots = document.getElementById ('pttdInpSlots');
    t.TDselType = document.getElementById ('pttdType');
    t.TDbutDo = document.getElementById ('pttdButDo');
    t.TDspSpace = document.getElementById ('pttdSpace');
    t.TDlimiter = document.getElementById ('pttdLimiter');
    t.divTrainStatus = document.getElementById ('ptTrainStatus');
          
    t.TTinpSlots.addEventListener ('change', t.updateTopTroops, false);
    t.TTbutMaxPerSlot.addEventListener ('click', t.clickTroopMaxPS, false);
    t.TTbutMaxSlots.addEventListener ('click', t.clickTroopMaxSlots, false);

    t.TTselType.addEventListener ('change', t.changeTroopSelect, false);
    t.TTbutDo.addEventListener ('click', t.clickTroopDo, false);
    t.TDinpSlots.addEventListener ('change', t.updateTopDef, false);
    t.TDselType.addEventListener ('change', t.changeDefSelect, false);
    t.TDbutMaxPerSlot.addEventListener ('click', t.clickDefMaxPS, false);
    t.TDbutMaxSlots.addEventListener ('click', t.clickDefMaxSlots, false);
    t.TDbutDo.addEventListener ('click', t.clickDefDo, false);
    
    document.getElementById ('chkPop').addEventListener ('change', t.clickCheckIdlePop, false);
    t.changeTroopSelect();
    t.changeDefSelect();
  },


  hide : function (){
    var t = Tabs.Train;
      mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
    clearTimeout (t.timer);
  },
  
  show : function (){
    var t = Tabs.Train;
    mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
    clearTimeout (t.timer);

    t.displayCityStats();
    t.changeTroopSelect();
    t.changeDefSelect();
    t.timer = setTimeout (t.show, 2000);
  },

/*******  TROOPS  ******/  

  
  updateTopTroops : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TTspMax.innerHTML = t.stats.MaxTrain;
    t.TTlimiter.innerHTML = t.stats.Limiter;
    t.TTspMaxSlots.innerHTML = t.stats.barracks - t.stats.queued;
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTspMaxPS.innerHTML = 0;
    else
      t.TTspMaxPS.innerHTML = parseInt(t.stats.MaxTrain / slots);
  },
      
  
  clickTroopMaxPS : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTinpPerSlot.value = 0;
    else
      t.TTinpPerSlot.value = parseInt(t.stats.MaxTrain / slots);
  },

  clickTroopMaxSlots : function (){
    var t = Tabs.Train;
    t.TTinpSlots.value = t.stats.barracks - t.stats.queued;
  },
  
  clickCitySelect : function (city){
    var t = Tabs.Train;
    t.selectedCity = city;
    t.lastQueString = null;   
    t.lastDQueString = null;   
    t.displayCityStats ();
    t.changeTroopSelect();
    t.changeDefSelect();
  },
  
  clickCheckIdlePop : function (){
    var t = Tabs.Train;
    if (document.getElementById ('chkPop').checked)
      Options.maxIdlePop = true;
    else
      Options.maxIdlePop = false;
    saveOptions ();
    t.displayCityStats ();
    t.changeTroopSelect ();
  },
  
  changeTroopSelect : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TTselType.value;
    t.lastTroopSelect = id;
    var uc = unsafeWindow.unitcost['unt'+id];
    var max = 9999999999;
    var limiter = 'Indefinito';
    if ( (t.stats.food / uc[1]) < max) {
      max = t.stats.food / uc[1];
      limiter = 'Cibo';
    }
    if ( (t.stats.wood / uc[2]) < max) {
      max = t.stats.wood / uc[2];
      limiter = 'Legno';
    }
    if ( (t.stats.stone / uc[3]) < max) {
      max = t.stats.stone / uc[3];
      limiter = 'Pietra';
    }
    if ( (t.stats.ore / uc[4]) < max) {
      max = t.stats.ore / uc[4];
      limiter = 'Minerale';
    }
    if ( (t.stats.idlePop / uc[6]) < max) {
      max = t.stats.idlePop / uc[6];
      limiter = 'Popolazione';
    }
    t.stats.MaxTrain = parseInt (max);
    t.stats.Limiter = limiter;
    if (t.stats.MaxTrain < 0)
      t.stats.MaxTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxTrain = 0;
          t.stats.Limiter = 'Livello costruzione insufficente';
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxTrain = 0;
          t.stats.Limiter = 'Livello delle ricerche insufficente';
          break;
        }
      }
    }
    t.updateTopTroops();
  },
  
  clickTroopDo : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TTselType.value;
    var perSlot = parseInt(t.TTinpPerSlot.value, 10);
    var numSlots = parseInt(t.TTinpSlots.value, 10);
    
    t.displayCityStats ();
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Errore<blink>!!!</blink></font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Non puoi addestrare questo numero di truppe,il massimo è <blink>'+ t.stats.MaxTrain +' </blink></font>';
      return;
    }
    if (numSlots<1 || numSlots>t.stats.barracks - t.stats.queued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000><blink>Numero slot errato</blink></font>';
      return;
    }
    t.setBusy(true);
    var que = [];
    for (var i=0; i<numSlots; i++)
      que.push (['T', unitId, parseInt (perSlot)]);
    t.divTrainStatus.innerHTML = '';
    t.doQueue (cityId, que);
  },

  
/*******  DEF  ******/  
  
  updateTopDef : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TDspMax.innerHTML = 'max. '+ t.stats.MaxDefTrain +'&nbsp; <BR>Ne possiedi: '+ t.stats.defOwned;   
    t.TDlimiter.innerHTML = t.stats.DefLimiter;
    t.TDspMaxSlots.innerHTML = t.stats.wallLevel-t.stats.Dqueued;
    if (slots<1)
      t.TDspMaxPS.innerHTML = 0;
    else
      t.TDspMaxPS.innerHTML = parseInt(t.stats.MaxDefTrain / slots);

    t.TDspSpace.innerHTML = 'Livello delle mura: <B>'+ t.stats.wallLevel +'</b><BR>Spazio sulle mura: '+ (t.stats.wallSpaceUsed+t.stats.wallSpaceQueued)  +'/<B>'+ t.stats.wallSpace +'</b><BR>\
        Spazi nel campo: '+ (t.stats.fieldSpaceUsed+t.stats.fieldSpaceQueued) +'/<B>'+ t.stats.fieldSpace +'</b>';
  },

  changeDefSelect : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TDselType.value;
    t.lastDefSelect = id;
    t.stats.defOwned = parseInt(Seed.fortifications['city' + cityId]['fort'+id]);    
    var uc = unsafeWindow.fortcost['frt'+id];
    var max = 9999999999;
    var limiter = '<blink>Indefinito</blink>';
    if ( (t.stats.food / uc[1]) < max) {
      max = t.stats.food / uc[1];
      limiter = '<blink>Cibo</blink>';
    }
    if ( (t.stats.wood / uc[2]) < max) {
      max = t.stats.wood / uc[2];
      limiter = '<blink>Legno</blink>';
    }
    if ( (t.stats.stone / uc[3]) < max) {
      max = t.stats.stone / uc[3];
      limiter = '<blink>Pietra/blink>';
    }
    if ( (t.stats.ore / uc[4]) < max) {
      max = t.stats.ore / uc[4];
      limiter = '<blink>Minerali</blink>';
    }
    if ( (t.stats.idlePop / uc[6]) < max) {
      max = t.stats.idlePop / uc[6];
      limiter = '<blink>Popolazione</blink>';
    }
    t.stats.MaxDefTrain = parseInt (max);
    if (t.stats.MaxDefTrain < 0)
      t.stats.MaxDefTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxDefTrain = 0;
          t.stats.DefLimiter = '<blink></blink>';
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxDefTrain = 0;
          t.stats.DefLimiter = '<blink>Numero slot </blink>';
          break;
        }
      }
    }

    var spaceEach = parseInt(unsafeWindow.fortstats["unt"+ id][5]);
    if (id<60)
      var spaceAvail = t.stats.wallSpace - t.stats.wallSpaceUsed - t.stats.wallSpaceQueued;
    else
      var spaceAvail = t.stats.fieldSpace - t.stats.fieldSpaceUsed - t.stats.fieldSpaceQueued;
    if ( t.stats.MaxDefTrain * spaceEach > spaceAvail) {
      t.stats.MaxDefTrain = parseInt(spaceAvail / spaceEach);
      if (id<60)
        t.stats.DefLimiter = 'Spazi sulle mura';
      else
        t.stats.DefLimiter = 'Spazi del campo';
    }
    t.updateTopDef();
  },
  
  clickDefMaxPS : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (slots<1)
      t.TDinpPerSlot.value = 0;
    else
      t.TDinpPerSlot.value = parseInt(t.stats.MaxDefTrain / slots);
  },

  clickDefMaxSlots : function (){
    var t = Tabs.Train;
    t.TDinpSlots.value = t.stats.wallLevel-t.stats.Dqueued;
  },
    
  clickDefDo : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TDselType.value;
    var perSlot = parseInt(t.TDinpPerSlot.value, 10);
    var numSlots = parseInt(t.TDinpSlots.value, 10);
    
    t.displayCityStats ();
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Errore, non puoi addestrare</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxDefTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Non puoi addestrare questo numero di truppe,il massimo è <blink>'+ t.stats.MaxDefTrain +'</blink></font>';
      return;
    }
    if (numSlots<1 || numSlots > t.stats.wallLevel-t.stats.Dqueued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Numero slot errato</font>';
      return;
    }
    t.setBusy(true);
    var que = [];
    for (var i=0; i<numSlots; i++)
      que.push (['T', unitId, parseInt (perSlot)]);
    t.divTrainStatus.innerHTML = '';
    t.doDefQueue (cityId, que);
  },

  doDefQueue : function (cityId, que, errMsg){
    var t = Tabs.Train;
    try {
      t.displayCityStats();
      if (errMsg){
        t.dispTrainStatus ('<font color=#550000><B>ERROR: '+ errMsg +'</b></font><BR>');
        t.setBusy(false);
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.dispTrainStatus ('<B>Le truppe sono in fase di addestramento</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus (''+ cmd[2] +' '+  fortNamesShort[cmd[1]] +' da costruire!<BR>');
        doDefTrain ( cityId, cmd[1], cmd[2],
          function(errMsg){
            setTimeout(function (){Tabs.Train.doDefQueue(cityId, que, errMsg);}, (Math.random()*3500)+1500);
          } );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>PROGRAMM FEHLER: '+ err.message +'</font><BR>');
      t.setBusy(false);
    }
  },
  

  setBusy : function (tf){
    var t = Tabs.Train;
    t.TDbutDo.disabled = tf;
    t.TTbutDo.disabled = tf;
  },

  // fix KofC bugs ....
  // if first start time > now, make it now
  // if any end time != next start time, fix it
  fixQueTimes : function (q){
    var now = unixTime();
    if (q[0][2] > now)
      q[0][2] = now;
    for (var i=0; i<q.length; i++){
      if (q[i+1]!=null && q[i+1][2]!=q[i][3])
        q[i][3] = q[i+1][2];
    }        
  },
  
  displayCityStats : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    t.stats.food = parseInt (Seed.resources['city'+cityId].rec1[0]/3600);
    t.stats.wood = parseInt (Seed.resources['city'+cityId].rec2[0]/3600);
    t.stats.stone = parseInt (Seed.resources['city'+cityId].rec3[0]/3600);
    t.stats.ore = parseInt (Seed.resources['city'+cityId].rec4[0]/3600);
    t.stats.gold = Seed.citystats['city'+cityId].gold[0];
    if (Options.maxIdlePop)
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]);
    else
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]) - parseInt(Seed.citystats['city'+cityId].pop[3]);
    t.stats.barracks = getCityBuilding (cityId, 13).count;
    var m = '<CENTER><B>'+ Cities.byID[cityId].name +' &nbsp; ('+ Cities.byID[cityId].x +','+ Cities.byID[cityId].y +')</b></center><HR>';
  
m += '<TABLE class=pdxTab2 width=100%><TR align=center>\
        <TD width=8%><B><u>Truppe di rifornimento</u></b></td><TD width=8%><B><u>Soldati semplici</u></b></td><TD width=8%><B><u>Esploratori</u></b></td>\
        <TD width=8%><B><u>Lancieri</u></b></td><TD width=8%><B><u>Spadaccini</u></b></td><TD width=8%><B><u>Arcieri</u></b></td>\
        <TD width=8%><B><u>Cav. leggera</u></b></td><TD width=8%><B><u>Cav. pesante</u></b></td><TD width=8%><B><u>Carri di rifornimento</u></b></td>\
        <TD width=8%><B><u>Baliste</u></b></td><TD width=8%><B><u>Arieti</u></b></td><TD width=8%><B><u>Catapulte</u></b></td><tr>';
    
 m += '<TR align=center><TD width=8%>'+Seed.units['city'+cityId]['unt1']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt2']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt3']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt4']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt5']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt6']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt7']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt8']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt9']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt10']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt11']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt12']+'</td><tr></table>';
  
    m += '<TABLE class=pdxTab2 width=100%><TR align=center>\
        <TD width=18%><B>Cibo</b></td><TD width=16%><B>Legno</b></td><TD width=16%><B>Pietre</b></td>\
        <TD width=16%><B>Minerale</b></td><TD width=16%><B>Oro</b></td><TD width=16%><B>Popolazione</b></td></tr>\
      <TR align=center><TD>'+ addCommasInt(t.stats.food) +'</td><TD>'+ addCommasInt(t.stats.wood) +'</td><TD>'+ addCommasInt(t.stats.stone) +'</td>\
        <TD>'+ addCommasInt(t.stats.ore) +'</td><TD>'+ addCommasInt(t.stats.gold) +'</td>\
        <TD>'+ addCommasInt(t.stats.idlePop) +'</td></tr></table><BR>';
    document.getElementById ('divSTtop').innerHTML = m;
    
// troop queue ....
    var totTime = 0;
    var q = Seed.queue_unt['city'+cityId];
    var qs = q.toString();
    var now = unixTime();
    if (q!=null && q.length>0)
      totTime = q[q.length-1][3] - now;
    if ( qs == t.lastQueString){
      if (q!=null && q.length>0){
        var cur = q[0][3] - now;
        if (cur < 1)
          q.shift();
        document.getElementById ('ptttfq').innerHTML = timestr(cur, true);
      }
    } else {
      t.lastQueString = qs;
      t.stats.queued = 0;
      m = '<TABLE align=center class=pdxTab2>';
      if (q!=null && q.length>0 ){
        t.fixQueTimes (q);
        t.stats.queued = q.length;
        first = true;
        for (var i=0; i<q.length; i++){
          start = q[i][2];
          end = q[i][3];
          if (first)
            actual = end - now;
          else
            actual = end - lastEnd;
          if (actual < 0)
            actual = 0;
          q[i][6] = cityId;
 m += '<TR align=right><TD width="5px"><A><DIV onclick="cancelTrain('+ q[i][0]+','+q[i][1]+','+q[i][2]+','+q[i][3]+','+q[i][5]+','+q[i][6]+','+i +')">X</div></a></td>';
 m += '<TD>'+ q[i][1] +' </td><TD align=left> '+ unsafeWindow.unitcost['unt'+q[i][0]][0];
          if (first)
            m += '</td><TD> &nbsp; '+  timestr(end-start, true) +'</td><TD> (<SPAN id=ptttfq>'+ timestr(actual, true) +'</span>)';
          else
            m += '</td><TD> &nbsp; '+  timestr(actual, true) +'</td></tr>';
          lastEnd = end;
          first = false;
        }
      }
      m += '</table>';
      document.getElementById ('divSTleft').innerHTML = m;
    }
    m = t.stats.barracks +' Caserme ';
    if (t.stats.queued > 0)
      m += ', '+ t.stats.queued +' Slots';
    if (totTime > 0)
      m += ', '+ unsafeWindow.timestr(totTime);
    document.getElementById ('statTTtot').innerHTML = m;
    
// defense queue ....
    getWallInfo (cityId, t.stats);    
    var totTime = 0;
    var q = Seed.queue_fort['city'+cityId];
    var qs = q.toString();
    if (q!=null && q.length>0)
      totTime = q[q.length-1][3] - now;
    if ( qs == t.lastDQueString){
      if (q!=null && q.length>0){
        var cur = q[0][3] - now;
        if (cur < 1)
          q.shift();
        document.getElementById ('pttdfq').innerHTML = timestr(cur, true);
      }
    } else {
      t.lastDQueString = qs;
      t.stats.Dqueued = 0;
      t.stats.wallSpaceQueued = 0;
      t.stats.fieldSpaceQueued = 0;
      m = '<TABLE align=center class=pdxTab2>';
      if (q!=null && q.length > 0 ){
        t.fixQueTimes (q);
        t.stats.Dqueued = q.length;
        first = true;
        for (i=0; i<q.length; i++){
          if (q[i][0] < 60)          
            t.stats.wallSpaceQueued += parseInt(unsafeWindow.fortstats["unt"+ q[i][0]][5]) * parseInt(q[i][1]);
          else          
            t.stats.fieldSpaceQueued += parseInt(unsafeWindow.fortstats["unt"+ q[i][0]][5]) * parseInt(q[i][1]);
          start = q[i][2];
          end = q[i][3];
          if (first)
            actual = end - now;
          else
            actual = end - lastEnd;
          if (actual < 0)
            actual = 0;
          q[i][7]=cityId;
 m += '<TR align=right><TD width="5px"><A><DIV onclick="cancelFort('+ q[i][0]+','+q[i][1]+','+q[i][2]+','+q[i][3]+','+q[i][5]+','+q[i][6]+','+q[i][7] +','+ i +')">X</div></a></td>'
 m += '<TD>'+ q[i][1] +' </td><TD align=left> '+ fortNamesShort[q[i][0]];
          if (first)
            m += '</td><TD> &nbsp; '+  timestr(end-start, true) +'</td><TD> (<SPAN id=pttdfq>'+ timestr(actual, true) +'</span>)';
          else
            m += '</td><TD> &nbsp; '+  timestr(actual, true) +'</td></tr>';
          lastEnd = end;
          first = false;
        }
      }
      m += '</table>';
      document.getElementById ('divSTright').innerHTML = m;
    }
    m = t.stats.Dqueued +' Slots';
    if (totTime > 0)
      m += ', '+ unsafeWindow.timestr(totTime);
    document.getElementById ('statDTtot').innerHTML = m;
  },

  dispTrainStatus : function (msg){
    var t = Tabs.Train;
    t.divTrainStatus.innerHTML = msg + t.divTrainStatus.innerHTML;
  },

butcancelTrain : function (typetrn, numtrptrn, trnTmp, trnETA, trnNeeded, cityId, trainingId){
 var t = Tabs.Train;
 var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

 params.pf =0;
 params.requestType = "CANCEL_TRAINING";
 params.cityId = cityId;
 params.typetrn = typetrn;
 params.numtrptrn = numtrptrn;
 params.trnETA = trnETA;
 params.trnTmp = trnTmp;
 params.trnNeeded = trnNeeded;

 new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelTraining.php" + unsafeWindow.g_ajaxsuffix, {
 method: "post",
 parameters: params,
 onSuccess: function (message) {
 var rslt=eval("("+message.responseText+")");
 if (rslt.ok) {
 var k=0;
 for(var j=0;j<Seed.queue_unt["city"+cityId].length;j++){
 if(j>trainingId){
 Seed.queue_unt["city"+cityId][j][2]=parseInt(rslt.dateTraining[k]["start"]);
 Seed.queue_unt["city"+cityId][j][3]=parseInt(rslt.dateTraining[k]["end"]);
 k++;
 }
 }

 Seed.queue_unt["city"+cityId].splice(trainingId,1);
 for(var i=1;i<5;i++){
 var totalReturn=parseInt(unsafeWindow.unitcost["unt"+typetrn][i])*parseInt(numtrptrn)*3600/2;
 Seed.resources["city"+cityId]["rec"+i][0]=parseInt(Seed.resources["city"+cityId]["rec"+i][0])+totalReturn;
 }
 }
 },
 onFailure: function () {
 },
 });
 },


 butcancelFort : function (typefrt, numtrpfrt, frtTmp, frtETA, frtNeeded, frtid, cityId, queueId){
 var t = Tabs.Train;
 var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

 params.pf =0;
 params.requestType = "CANCEL_FORTIFICATIONS";
 params.cityId = cityId;
 params.typefrt = typefrt;
 params.numtrpfrt = numtrpfrt;
 params.frtETA = frtETA;
 params.frtTmp = frtTmp;
 params.frtNeeded = frtNeeded;
 params.frtid = frtid;

 new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelFortifications.php" + unsafeWindow.g_ajaxsuffix, {
 method: "post",
 parameters: params,
 onSuccess: function (message) {
 var rslt=eval("("+message.responseText+")");
 if (rslt.ok) {
 var k=0;
 for(var j=0;j<Seed.queue_fort["city"+cityId].length;j++){
 if(j>queueId){
 Seed.queue_fort["city"+cityId][j][2]=parseInt(rslt.dateFortifications[k]["start"]);
 Seed.queue_fort["city"+cityId][j][3]=parseInt(rslt.dateFortifications[k]["end"]);
 k++;
 }
 }
 unsafeWindow.update_seed(rslt.updateSeed);
 Seed.queue_fort["city"+cityId].splice(queueId,1);
 for(var i=1;i<5;i++){
 Seed.resources["city"+cityId]["rec"+i][0]=parseInt(Seed.resources["city"+cityId]["rec"+i][0])+totalReturn;
 }
 }
 },
 onFailure: function () {
 },
 });
 },
  doQueue : function (cityId, que, errMsg){
    var t = Tabs.Train;
    try {
      t.displayCityStats();
      if (errMsg){
        t.dispTrainStatus ('<font color=#550000><B>ERROR: '+ errMsg +'</b></font><BR>');
        t.setBusy(false);
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.dispTrainStatus ('<B>Inserimento coda addestramento completato</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus (''+ cmd[2] +' '+  unsafeWindow.unitcost['unt'+cmd[1]][0] +' sono stati messi in coda!<BR>');
        doTrain (cityId, cmd[1], cmd[2],
          function(errMsg){
           setTimeout(function (){Tabs.Train.doQueue(cityId, que, errMsg);}, (Math.random()*3500)+1500 );
          }
        );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>PROGRAM ERROR: '+ err.message +'</font><BR>');
      t.setBusy(false);
    }
  },
}

/********************************* Search Tab *************************************/

/***
TODO: Better search algorithm (circular OR square, always start at center, working outwards)
    Should be separate class (producer/consumer) so auto attack can use it too
**/

Tabs.Search = {
  tabLabel : 'Cerca',
  tabOrder : toSuchen,
  myDiv : null,
  MapAjax : new CMapAjax(),
  MAX_SHOW_WHILE_RUNNING : 250,
  popFirst : true,
  SearchList : [],
  
  init : function (div){
  var t = Tabs.Search;
  var Provinces = {1:{'name':"Tinagel",'x':75,'y':75},
    2:{'name':"Cornwall",'x':225,'y':75},
    3:{'name':"Astolat",'x':375,'y':75},
    4:{'name':"Lyonesse",'x':525,'y':75},
    5:{'name':"Corbnic",'x':625,'y':75},
    6:{'name':"Paimpont",'x':75,'y':225},
    7:{'name':"Cameliard",'x':225,'y':225},
    8:{'name':"Sarras",'x':375,'y':225},
    9:{'name':"Canoel",'x':525,'y':225},
    10:{'name':"Avalon",'x':625,'y':225},
    11:{'name':"Carmathen",'x':75,'y':375},
    12:{'name':"Shallot",'x':225,'y':375},
//        13:{'name':"-------",'x':375,'y':375},
    14:{'name':"Cadbury",'x':525,'y':375},
    15:{'name':"Glaston Bury",'x':625,'y':375},
    16:{'name':"Camlan",'x':75,'y':525},
    17:{'name':"Orkney",'x':225,'y':525},
    18:{'name':"Dore",'x':375,'y':525},
    19:{'name':"Logres",'x':525,'y':525},
    20:{'name':"Caerleon",'x':625,'y':525},
    21:{'name':"Parmenie",'x':75,'y':675},
    22:{'name':"Bodmin Moor",'x':225,'y':675},
    23:{'name':"Cellwig",'x':375,'y':675},
    24:{'name':"Listeneise",'x':525,'y':675},
    25:{'name':"Albion",'x':625,'y':675}};
  t.selectedCity = Cities.cities[0];
  t.myDiv = div;

  m = '<DIV class=pdxEntry><TABLE width=100% class=pdxTab><TR><TD class=pbDetLeft>Cerca: </td><TD width=99%>';
  m += htmlSelector ({0:"Campi barbari", 1:"Terre selvagge", 2:"Città"}, null, 'id=pasrcType');
    m += '&nbsp; &nbsp; &nbsp; <span class=pbDetLeft>Modalità di ricerca: &nbsp;';
  m += htmlSelector({quadrant:"Quadrata", umkreis:"Circolare"}, Options.srcdisttype, 'id=pbsrcdist');
  m += '</span></td></tr><TR><TD class=pbDetLeft>A: </td><TD class=xtab>X=<INPUT id=pasrchX type=text\> &nbsp;Y=<INPUT id=pasrchY type=text\>\
         &nbsp; Raggio: <INPUT id=pasrcDist size=3 value=10 /> &nbsp; <SPAN id=paspInXY></span></tr>\
    <TR><TD class=pbDetLeft>Cerca nella provincia di:</td><TD><select id="provinceXY"><option>--Seleziona--</option>';
  for (var i in Provinces)
  m += '<option value="'+i+'">'+Provinces[i].name+'</option>';
  m += '</select></td></tr>';
  m += '<TR><TD colspan=2 align=center><INPUT id=pasrcStart type=submit value="Inizia la ricerca"/></td></tr>';
  m += '</table></div>\
    <DIV id="pasrcResults" style="height:400px; max-height:400px;"></div>';
  
  t.myDiv.innerHTML = m;
  var psearch = document.getElementById ("pasrcType");
  new CdispCityPicker ('pasrchdcp', document.getElementById ('paspInXY'), true, t.citySelNotify).bindToXYboxes(document.getElementById ('pasrchX'), document.getElementById ('pasrchY'));
  document.getElementById ('provinceXY').addEventListener ('click', function() {
    if (this.value >= 1) {
      document.getElementById ('pasrchX').value = Provinces[this.value].x;
      document.getElementById ('pasrchY').value = Provinces[this.value].y;
      document.getElementById ('pasrcDist').value = '75';
    }
    }, false);
    document.getElementById('pbsrcdist').addEventListener ('change', function (){
        Options.srcdisttype = document.getElementById('pbsrcdist').value;
         saveOptions();
         }, false);
  document.getElementById ('pasrcStart').addEventListener ('click', t.clickedSearch, false);
  document.getElementById ('pasrchX').addEventListener ('keydown', t.e_coordChange, false);
  document.getElementById ('pasrchY').addEventListener ('keydown', t.e_coordChange, false);
  document.getElementById ('pasrcDist').addEventListener ('keydown', t.e_coordChange, false);
  document.getElementById ('pasrchY').addEventListener ('change', t.e_coordChange, false);
  document.getElementById ('pasrchY').addEventListener ('change', t.e_coordChange, false);
  unsafeWindow.pbSearchLookup = t.clickedLookup;  
  unsafeWindow.pbSearchScout = t.clickedScout;
  unsafeWindow.pbExportToRaid = t.ExportToRaid;
  },

  e_coordChange : function(){
  document.getElementById ('provinceXY').selectedIndex = 0;
  },
  
  hide : function (){
    var t = Tabs.Search;
     mainPop.div.style.width = 750 + 'px';
     if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
  },

  show : function (cont){
    var t = Tabs.Search;
     mainPop.div.style.width = 750 + 'px';
     if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
  },

  citySelNotify : function (city){
  var t = Tabs.Search;
  t.selectedCity = city;
  t.JumpCity(city.name);
  },
   JumpCity:function(city) {
    var t = Tabs.Search;
	for (i=0;i<Seed.cities.length;i++) {
		if (Seed.cities[i][1]==city) var cityNum=i;
	}
	cityNum++;
	var obj = document.getElementById('citysel_'+cityNum);
  	return t.ClickWin(window,obj,'click');
  },
  
  ClickWin:function(win,obj,evtName) {
  	var evt = win.document.createEvent("MouseEvents");
  	evt.initMouseEvent(evtName, true, true, win,
  		0, 0, 0, 0, 0, false, false, false, false, 0, null);
  	return !obj.dispatchEvent(evt);
  },
  
  helpPop : function (){
       var helpText = 'Truppe per i raid<BR>';
       helpText += '<A target="_tab" href="http://koc.god-like.org/?p=170">Incursioni ai campi barbari</a>';
       helpText += '<TABLE><TR><TD>Lvl</td><TD>Truppe</td></tr>';
       helpText += '<TR><TD>1</td><TD>500 Truppe di rifornimento + 500 archi</td></tr>';
       helpText += '<TR><TD>2</td><TD>500 Truppe di rifornimento + 2500 archi</td></tr>';
       helpText += '<TR><TD>3</td><TD>500 Truppe di rifornimento + 5000 archi</td></tr>';
       helpText += '<TR><TD>4</td><TD>500 Truppe di rifornimento + 7500 archi</td></tr>';
       helpText += '<TR><TD>5</td><TD>15000 archi</td></tr>';
       helpText += '<TR><TD>5</td><TD>12000 archi se il piumaggio è al 10 e peso piuma al 9 </td></tr>';
       helpText += '<TR><TD>6</td><TD>25000 archi se il piumaggio è al 9</td></tr>';
       helpText += '<TR><TD>6</td><TD>22000 archi se il piumaggio è al 10</td></tr>';
       helpText += '<TR><TD>7</td><TD>45000 archi se il piumaggio è al 10</td></tr>';
       helpText += '<TR><TD>7</td><TD>44000 archi se il piumaggio è al 10 e il cavaliere ha più di 69 punti</td></tr>';
       helpText += '<TR><TD>7</td><TD>41000 archi se il piumaggio è al 10 e il cavaliere ha più di 94 punti</td></tr>';
       helpText += '<TR><TD>8</td><TD>28000 baliste se il piumaggio è a 10 e il cavaliere ha più di 98</td></tr>';
       helpText += '<TR><TD>9</td><TD>56000 baliste se il piumaggio è al 10 e il cavaliere ha più di 98</td></tr>';
       helpText += '<TR><TD>10</td><TD>125000 catapulte (muoiono 500 catapulte)</td></tr></tr></table>';
  
       var pop = new CPopup ('giftHelp', 0, 0, 425, 395, true);
       pop.centerMe (mainPop.getMainDiv());  
       pop.getMainDiv().innerHTML = helpText;
       pop.getTopDiv().innerHTML = '<CENTER><B>KoC Power Italy Extra Lux - Aiuto per i raid automatici</b></center>';
       pop.show (true);
     },
     
  opt : {},
  selectedCity : null,
  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,

  clickedSearch : function (){
  var t = Tabs.Search;

  if (t.searchRunning){
    t.stopSearch ('FERMA RICERCA');
    return;
  }
  t.opt.searchType = document.getElementById ('pasrcType').value;
  t.opt.startX = parseInt(document.getElementById ('pasrchX').value);
  t.opt.startY = parseInt(document.getElementById ('pasrchY').value);
  t.opt.maxDistance = parseInt(document.getElementById ('pasrcDist').value);
    t.opt.searchShape = Options.srcdisttype;
  errMsg = '';

  if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>749)
    errMsg = "<blink>X deve essere tra 0 e 749</blink><BR>";
  if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>749)
    errMsg += "<blink>Y deve essere tra 0 e 749</blink><BR>";
  if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1 || t.opt.maxDistance>750)
    errMsg += "<blink>Il raggio (distanza) deve essere tra 1 e 749</blink><BR>";
  if (errMsg != ''){
    document.getElementById('pasrcResults').innerHTML = '<FONT COLOR=#660000>ERRORE:</font><BR><BR>'+ errMsg;
    return;
  }

  t.searchRunning = true;
  document.getElementById ('pasrcStart').value = 'Ferma la ricerca';
  m = '<DIV class=pdxStat2><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=pastatSearched></div></td>\
    <TD class=xtab align=center><SPAN style="white-space:normal" id=pastatStatus></span></td>\
    <TD class=xtab align=right width=125><DIV id=pastatFound></div></td></tr></table></div>\
      <TABLE width=100%><TR valign=top>\
      <TD width=99% style="max-width:50px"><DIV id=padivOutTab style="height:380px; max-height:380px; overflow-y:auto;"></div></td>\
      <TD align=center valign=middle><A id=pbAhideShow style="text-decoration:none; cursor:pointer;"><DIV style="width:1em; border:1px solid red; padding:10px 2px; background-color:#fee">E<BR>I<BR>N<BR>S<BR>E<BR>L<BR>L<BR>U<BR>N<BR>G <BR><BR><SPAN id=spanHideShow> N A S C O N D I</span></div></a></td>\
      <TD width=100% height=100% style="background:#e0e0f0; height:100%; padding:5px"><DIV id=padivOutOpts></div></td>\
      </table>';
    
  document.getElementById('pasrcResults').innerHTML = m;
  if (t.opt.searchType == 0)
    var typeName = 'Campo barbaro';
  else if (t.opt.searchType == 1)
    var typeName = 'Terra selvaggia';
  else
    var typeName = 'Città';
  if (t.opt.searchShape == 'Quadrata')
    var distName = 'Distanza';
  else
    var distName = 'Raggio';
  m = '<CENTER><B>Cercate coordinate di: '+ typeName +'<BR>\
    Centro: '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; '+ distName +': '+ t.opt.maxDistance +'<BR></center>\
    <DIV class=pdxEntry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>O P Z I O N I</b><BR></td></tr>';
    
  if (t.opt.searchType == 1 || t.opt.searchType == 0) {
    m += '<TR><TD class=xtab align=right>Livello minimo:</td><TD class=xtab> <INPUT id=pafilMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
    <TR><TD class=xtab align=right>Livello massimo:</td><TD class=xtab> <INPUT id=pafilMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
  }
  if (t.opt.searchType == 1){
    m += '<TR><TD class=xtab align=right>Tipo terra selvaggia:</td><TD class=xtab><SELECT id=pafilWildType>';
    m += htmlOptions ( {1:'Raduna/Lago', 3:'Foreste', 4:'Colline', 5:'Montagne', 6:'Pianure', 0:'Tutte'}, Options.wildType );
    m += '</select></td></tr><TR><TD class=xtab align=right>Solo libere: </td><TD class=xtab><INPUT id=pafilUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
  }
   if (t.opt.searchType == 1 || t.opt.searchType == 0) {
    m+= '<TR><TD class=xtab align=right>Ordina per:</td><TD class=xtab><SELECT id=pafilSortBy>\
      <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Livello</option>\
      <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distanza</option>\
    </select></td></tr>\
    <TR><TD class=xtab align=right>Mostra solo coordinate:</td><TD class=xtab><INPUT type=checkbox id=pacoordsOnly \></td></tr>\
    </table></div><BR><SPAN id=pasrchSizeWarn></span><DIV id=pbSrcExp></div>';
  } else {
m+= '</select></td></tr><TR><TD class=xtab align=right>Sotto nebbia:</td><TD class=xtab><INPUT name=pbfil id=pafilMisted type=CHECKBOX '+ (Options.mistedOnly?' CHECKED':'') +'\><td></tr>';
m+= '<TR><TD class=xtab align=right>Ostile:</td><TD class=xtab><INPUT name=pbfil id=pafilHostile type=CHECKBOX '+ (Options.hostileOnly?' CHECKED':'') +'\><td></tr>';
m+= '<TR><TD class=xtab align=right>Amichevole:</td><TD class=xtab><INPUT name=pbfil id=pafilFriendly type=CHECKBOX '+ (Options.friendlyOnly?' CHECKED':'') +'\><td></tr>';
m+= '<TR><TD class=xtab align=right>Alleato:</td><TD class=xtab><INPUT name=pbfil id=pafilAllied type=CHECKBOX '+ (Options.alliedOnly?' CHECKED':'') +'\><td></tr>';
m+= '<TR><TD class=xtab align=right>Neutrale:</td><TD class=xtab><INPUT name=pbfil id=pafilNeutral type=CHECKBOX '+ (Options.neutralOnly?' CHECKED':'') +'\><td></tr>';
m+= '<TR><TD class=xtab align=right>Senza alleanza:</td><TD class=xtab><INPUT name=pbfil id=pafilunAllied type=CHECKBOX '+ (Options.unalliedOnly?' CHECKED':'') +'\><td></tr>';
m+= '<TR><TD class=xtab align=right>Tutte le alleanze:</td><TD class=xtab><INPUT name=pbfil id=pafilAll type=CHECKBOX '+ (Options.srcAll?' CHECKED':'') +'\><td></tr>';
  m+= '<TR><TD class=xtab align=right>Ordina per:</td><TD class=xtab><SELECT id=pafilSortBy>\
      <OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Potere</option>\
       <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distanza</option>\
    </select></td></tr>\
  <TR><TD class=xtab align=right>Potere minimo:</td><TD class=xtab><INPUT type=text id=paminmight size=6 value='+ Options.minmight +'>\
    <TR><TD class=xtab align=right>Mostra solo coordinate:</td><TD class=xtab><INPUT type=checkbox id=pacoordsOnly \></td></tr>\
    </table></div><BR><SPAN id=pasrchSizeWarn></span><DIV id=pbSrcExp></div>';
  
  }
  document.getElementById('padivOutOpts').innerHTML = m;
   if (t.opt.searchType == 1 || t.opt.searchType == 0) {
  document.getElementById('pafilMinLvl').addEventListener ('change', function (){
    Options.srcMinLevel = document.getElementById('pafilMinLvl').value;
    saveOptions();
    t.dispMapTable ();
    }, false);
  document.getElementById('pafilMaxLvl').addEventListener ('change', function (){
    Options.srcMaxLevel = document.getElementById('pafilMaxLvl').value;
    saveOptions();
    t.dispMapTable ();
    }, false);
  }
  document.getElementById('pafilSortBy').addEventListener ('change', function (){
    Options.srcSortBy = document.getElementById('pafilSortBy').value;
    saveOptions();
    t.dispMapTable ();
    }, false);
  document.getElementById('pacoordsOnly').addEventListener ('change', function (){ t.dispMapTable (); }, false);
  if (t.opt.searchType == 1){
    document.getElementById('pafilWildType').addEventListener ('change', function (){
    Options.wildType = document.getElementById('pafilWildType').value;
    saveOptions();
    t.dispMapTable ();
    }, false);
    document.getElementById('pafilUnowned').addEventListener ('change', function (){
    Options.unownedOnly = (document.getElementById('pafilUnowned').checked);
    saveOptions();
    t.dispMapTable ();
    }, false);
  }
  if (t.opt.searchType == 2){
  document.getElementById('pafilMisted').addEventListener ('change', function (){
    Options.mistedOnly = (document.getElementById('pafilMisted').checked);
    if(!Options.mistedOnly){
         document.getElementById('pafilAll').checked = false;
        Options.srcAll = Options.mistedOnly;
       }
    saveOptions();
    t.dispMapTable ();
    }, false);
  document.getElementById('pafilHostile').addEventListener ('change', function (){
    Options.hostileOnly = (document.getElementById('pafilHostile').checked);
    if(!Options.hostileOnly){
        document.getElementById('pafilAll').checked = false;
        Options.srcAll = Options.hostileOnly;
       }
           saveOptions();
            t.dispMapTable ();
          }, false);
       document.getElementById('pafilFriendly').addEventListener ('change', function (){
           Options.friendlyOnly = (document.getElementById('pafilFriendly').checked);
       if(!Options.friendlyOnly){
         document.getElementById('pafilAll').checked = false;
        Options.srcAll = Options.friendlyOnly;
      }
          saveOptions();
           t.dispMapTable ();
          }, false);
       document.getElementById('pafilAllied').addEventListener ('change', function (){
           Options.alliedOnly = (document.getElementById('pafilAllied').checked);
       if(!Options.alliedOnly){
         document.getElementById('pafilAll').checked = false;
         Options.srcAll = Options.alliedOnly;
       }
           saveOptions();
           t.dispMapTable ();
          }, false);
       document.getElementById('pafilNeutral').addEventListener ('change', function (){
           Options.neutralOnly = (document.getElementById('pafilNeutral').checked);
       if(!Options.neutralOnly){
         document.getElementById('pafilAll').checked = false;
         Options.srcAll = Options.neutralOnly;
      }
           saveOptions();
           t.dispMapTable ();
            }, false);
      document.getElementById('pafilunAllied').addEventListener ('change', function (){
           Options.unalliedOnly = (document.getElementById('pafilunAllied').checked);
       if(!Options.unalliedOnly){
         document.getElementById('pafilAll').checked = false;
         Options.srcAll = Options.unalliedOnly;
      }
           saveOptions();
          t.dispMapTable ();
          }, false);
       document.getElementById('pafilAll').addEventListener ('change', function (){
           Options.srcAll = (document.getElementById('pafilAll').checked);
       for(i in document.getElementsByName('pbfil'))
        document.getElementsByName('pbfil')[i].checked = Options.srcAll;
     Options.mistedOnly=Options.hostileOnly=Options.friendlyOnly=Options.alliedOnly=Options.neutralOnly=Options.unalliedOnly=Options.srcAll;
    saveOptions();
    t.dispMapTable ();
    }, false);
  document.getElementById('paminmight').addEventListener ('change', function (){
     Options.minmight = parseIntNan(document.getElementById('paminmight').value);
     saveOptions();
      t.dispMapTable ();
    }, false);
  
  }
  
  document.getElementById('pbAhideShow').addEventListener ('click', t.hideShowClicked, false);
  
  t.mapDat = [];
  t.firstX =  t.opt.startX - t.opt.maxDistance;
  t.lastX = t.opt.startX + t.opt.maxDistance;
  t.firstY =  t.opt.startY - t.opt.maxDistance;
  t.lastY = t.opt.startY + t.opt.maxDistance;
  t.tilesSearched = 0;
  t.tilesFound = 0;
  t.curX = t.firstX;
  t.curY = t.firstY;
  var xxx = t.MapAjax.normalize(t.curX);
  var yyy = t.MapAjax.normalize(t.curY);
  document.getElementById ('pastatStatus').innerHTML = 'Sto cercando a... '+ xxx +','+ yyy;
   setTimeout (function(){t.MapAjax.request (xxx, yyy, 15, t.eventgetplayeronline)}, MAP_DELAY);
  },

  hideShowClicked : function (){
  var div = document.getElementById('padivOutOpts');
  if (div.style.display == 'none'){
    div.style.display = 'block';
    document.getElementById('spanHideShow').innerHTML = 'N A S C O N D I';
  } else {
    div.style.display = 'none';
    document.getElementById('spanHideShow').innerHTML = 'M O S T R A';
  }
  },
  
  dispMapTable : function (){
  var tileNames = ['Campo barbaro', 'Radura', 'Lago', 'Foreste', 'Collina', 'Montagna', 'Pianura' ];
  var t = Tabs.Search;
  var coordsOnly = document.getElementById('pacoordsOnly').checked;
  if (DEBUG_SEARCH) DebugTimer.start();
   function mySort(a, b){
    if (Options.srcSortBy == 'level'){
    if ((x = a[4] - b[4]) != 0)
      return x;
    }
  if (Options.srcSortBy == 'might'){
    if ((x = b[10] - a[10]) != 0)
      return x;
    }
    return a[2] - b[2];
  }
  
  dat = [];
  for (i=0; i<t.mapDat.length; i++){
    lvl = parseInt (t.mapDat[i][4]);
    type = t.mapDat[i][3];
    if (t.opt.searchType==2 && type==7 ) {
if(t.mapDat[i][10] >= Options.minmight || t.mapDat[i][5])
      if((Options.hostileOnly && t.mapDat[i][12] == 'h') ||
          (Options.mistedOnly && t.mapDat[i][5]===true) ||
          (Options.friendlyOnly && t.mapDat[i][12] == 'f') ||
          (Options.alliedOnly && t.mapDat[i][12] == 'a') ||
          (Options.neutralOnly && t.mapDat[i][12] == 'n') ||
       (Options.unalliedOnly && t.mapDat[i][12] == 'u') ||
         (Options.srcAll))
        dat.push(t.mapDat[i]);
    } else {
     if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
    if (t.opt.searchType==0 || Options.wildType==0
    ||  (Options.wildType==1 && (type==1 || type==2))
    ||  (Options.wildType == type)){
      if (!Options.unownedOnly || t.mapDat[i][5]===false)
      dat.push (t.mapDat[i]);
    }
     }
  }
  }
  if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: FILTER');

  document.getElementById('pastatFound').innerHTML = 'Trovate: '+ dat.length;
  if (dat.length == 0){
    m = '<BR><CENTER>nessuna coordinata trovata... :/</center>';
  } else {
    dat.sort(mySort);
    if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: SORT');
    if (coordsOnly)
    m = '<TABLE align=center id=pasrcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Coordinate</td></tr>';
    else {
    if (t.opt.searchType == 2) {
     m = '<TABLE id=pasrcOutTab class=pbSrchResults cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Coordinate</td><TD align=right>Distanza</td><TD>Giocatore</td><TD align=right>Potere</td><TD>Allenza</td><TD>In linea</td><TD></td></tr>';
  } else {
   m = '<TABLE id=pasrcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Coordinate</td><TD style="padding-left: 10px">Distanza</td><TD style="padding-left: 10px;">Livello</td><TD width=100px> &nbsp; Tipo</td><TD></td><TD>Esporta nei raid</td></tr>';
  }
  }
    var numRows = dat.length;
    if (numRows > t.MAX_SHOW_WHILE_RUNNING && t.searchRunning){
    numRows = t.MAX_SHOW_WHILE_RUNNING;
    document.getElementById('pasrchSizeWarn').innerHTML = '<FONT COLOR=#600000><u>ATTENZIONE</u> La tabella mostra solo  '+ t.MAX_SHOW_WHILE_RUNNING +' su '+ dat.length +'  risultati della ricerca!</font>';
    }
    for (i=0; i<numRows; i++){
    m += '<TR><TD><DIV onclick="ptGotoMap('+ dat[i][0] +','+ dat[i][1] +')"><A>'+ dat[i][0] +','+ dat[i][1] +'</a></div></td>';
    if (coordsOnly) {
      m += '</tr>';
    } else {
    if (t.opt.searchType == 2) { // city search
            m += '<TD align="right" >'+ dat[i][2].toFixed(2) +'</td>';
            if (dat[i][5])
              m += '<TD colspan=4>* NEBBIE* &nbsp; &nbsp; <SPAN onclick="pbSearchScout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A>Esplora</a></span></td></tr>';
            else{
              var allStyle = '';
              if (dat[i][12]=='f')
                allStyle = 'class=pbTextFriendly';
              else if (dat[i][12]=='h')
                allStyle = 'class=pbTextHostile';
              m += '<TD>'+ dat[i][9]+'</td><TD align=right>'+ dat[i][10] +'</td><TD><SPAN '+ allStyle +'>'+ dat[i][11]+'</span></td><TD>'+(dat[i][13]?'<SPAN class=boldDarkRed>ONLINE</span>':'')+'</td><TD><A onclick="pbSearchLookup('+ dat[i][7] +')">Visualizza</a></td></tr>';
            }
			} else {
          m += '<TD align=right  valign="top">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ tileNames[dat[i][3]]
             +'</td><TD  valign="top">'+ (dat[i][5]?(dat[i][6]!=0?' <A onclick="pbSearchLookup('+dat[i][6]+')">BESETZ</a>':'<A onclick="pbSearchScout('+ dat[i][0] +','+ dat[i][1] +');return false;">NEBEL</a>'):'') +'</td>';
          if (t.opt.searchType == 0) m+= '<TD align=center  valign="top"><A onclick="pbExportToRaid('+ dat[i][0]+','+dat[i][1] +')">Esporta nei raid</a></td>';
          m+='</tr>';
			}
		}
			
       }
      m += '</table>';
  }
  document.getElementById('padivOutTab').innerHTML = m;
  dat = null;
  if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: DRAW');
  },

  mapDat : [],

  stopSearch : function (msg){
  var t = Tabs.Search;
  document.getElementById ('pastatStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';
  document.getElementById ('pasrcStart').value = 'Inizia ricerca';
  document.getElementById ('pasrchSizeWarn').innerHTML = '';
  if (t.opt.searchType==0 && document.getElementById('KOCAttackToggle')!=null){    
    document.getElementById ('pbSrcExp').innerHTML = '<CENTER>'+ strButton20('Esporta risultati', 'id=pbSrcDoExp') +'</center>';
    document.getElementById ('pbSrcDoExp').addEventListener ('click', t.exportKOCattack, false);
  }
  if (t.opt.searchType==2){
       document.getElementById ('pbSrcExp').innerHTML = '<CENTER>'+ strButton20('Esplora ora', 'id=pbSrcDoScout') +'</center>';
         document.getElementById ('pbSrcDoScout').addEventListener ('click', t.generateScoutList, false);
     }
  t.searchRunning = false;
  t.dispMapTable();
  },

  exportKOCattack : function (){
  var t = Tabs.Search;
  var bulkAdds = {};
  for (i=1; i<11; i++)
    bulkAdds['lvl'+ i] = [];
  for (i=0; i<t.mapDat.length; i++){
    var lvl = parseInt (t.mapDat[i][4]);
    if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel && t.mapDat[i][3]==0)
    bulkAdds['lvl'+ lvl].push({x:t.mapDat[i][0], y:t.mapDat[i][1]});
  }
  exportToKOCattack.doExport (bulkAdds, t.selectedCity);
  },
    generateScoutList : function (){
    var t = Tabs.Search;
    var bulkScout = [];
    for (i=0; i<t.mapDat.length; i++){
      if (t.mapDat[i][5] && t.mapDat[i][3] == 7)
        bulkScout.push({x:t.mapDat[i][0], y:t.mapDat[i][1], dist:t.mapDat[i][2]});
    }
  if(t.selectedCity == null)
  t.selectedCity = Cities.cities[0];
    t.ShowScoutList (bulkScout, t.selectedCity);
  },
  ShowScoutList : function (coordlist, city){
  var t = Tabs.Search;
  var popScout = null;
  t.scoutcity = city;
  if(popScout==null){
    popScout = new CPopup ('pbsrcscout', 0,0, 350,500, true, function (){popScout.destroy(); popScout=null;});
      popScout.centerMe (mainPop.getMainDiv());  
    }
var m = '<DIV class=pdxStat2>Esplora le città trovate!</div>';
    m += '<DIV>Numero di esploratori da mandare: <input id=pbsrcScoutAmt value="'+Options.srcScoutAmt+'" /></div><BR>';
    m += '<DIV><b>Città:</b>: <span id=pbsrcScoutcitypick> </span></div><BR>';
    m += '<DIV class=pdxStat2>Manda esplorazione da <span id=pbsrcScoutcity>'+city.name+'</span> <BR> Obiettivi totali: '+coordlist.length+'</div>';
    m += '<DIV style="max-height:220px; overflow-y:auto;"><TABLE align=center cellpadding=0 cellspacing=0 class=pdxTabPadNW><TR style="font-weight:bold; "><TD width=15><input type=checkbox id=pbsrcScout_All /></td><TD>Coord scelte</td></tr>';
    for(i=0; i<coordlist.length; i++){
      m += '<TR style="background-color:white"><TD><input type=checkbox name=pbsrcScoutCheck id="pbsrcScoutCheck_'+coordlist[i].x+'_'+coordlist[i].y+'" value="'+coordlist[i].x+'_'+coordlist[i].y+'" /></td><TD>'+coordLink(coordlist[i].x,coordlist[i].y)+'</td></tr>';
    }
      m += '</table></div>';
    m += '<BR><CENTER>'+ strButton20('Esplora ora!', 'id=pbSrcStartScout') +'</center>';
    m += '<CENTER><DIV style="width:70%; max-height:75px; overflow-y:auto;" id=pbSrcScoutResult></DIV></center>';
  popScout.getMainDiv().innerHTML = m;
  new CdispCityPicker ('pbScoutPick', document.getElementById('pbsrcScoutcitypick'), false, function(c,x,y){t.ShowScoutList(coordlist, c);});
  popScout.getTopDiv().innerHTML = '<CENTER><B>KoC Power Italy Extra Lux</b></center>';
  popScout.show(true);
  
  document.getElementById('pbsrcScoutAmt').addEventListener('change', function(){
    Options.srcScoutAmt = parseInt(document.getElementById('pbsrcScoutAmt').value);
    saveOptions();
  }, false);
  document.getElementById('pbsrcScout_All').addEventListener('change', function(){
    for(k in document.getElementsByName('pbsrcScoutCheck'))
      document.getElementsByName('pbsrcScoutCheck')[k].checked = document.getElementById('pbsrcScout_All').checked;
  }, false);
document.getElementById('pbSrcStartScout').addEventListener('click', t.clickedStartScout, false);
  },
   scouting : false,
    scoutcity : null,
  doScout : function(list, city){
  var t = Tabs.Search;
  document.getElementById('pbSrcScoutResult').innerHTML = '';
  if(list.length < 1){
    document.getElementById('pbSrcScoutResult').innerHTML = '<SPAN class=boldRed>ERRORE: Coordinate non selezionate</span>';
    t.clickedStartScout();
    return;
  }
  if(parseInt(Seed.units['city'+city.id]['unt'+3]) < Options.srcScoutAmt){
    document.getElementById('pbSrcScoutResult').innerHTML = '<SPAN class=boldRed>ERRORE: Non ci sono esploratori</span>';
    t.clickedStartScout();
    return;
  }
  t.doScoutCount(list, city, list.length, 0);
  
  },
  doScoutCount : function(list, city, total, count){
  var t = Tabs.Search;
  if(!t.scouting){
      document.getElementById('pbSrcScoutResult').innerHTML += '<SPAN class=boldRed>Annulla esplorazione</span><BR>';
      document.getElementById('pbSrcStartScout').className = 'button20 ptButton20';
     document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>Esplora</span>';
      return;
    }
    if(total <= (count)){
    document.getElementById('pbSrcScoutResult').innerHTML += 'Fatto!<BR>';
  t.clickedStartScout();
    return;
  }
 //var rallypointlevel = getRallyPointLevel('city'+city.id);
  var rallypointlevel = t.getRallypoint(city.id);
  var slots = 0;
  if(Seed.queue_atkp['city'+city.id].length != 'undefined')
    slots = Seed.queue_atkp['city'+city.id].length;
  if(slots >= rallypointlevel){
    setTimeout(function(){t.doScoutCount(list, city, total, count)}, 5000);
document.getElementById('pbSrcScoutResult').innerHTML += 'In attesa di uno spazio nel punto di riunione';
    return;
  }
  var coords = list[count].split("_");
  if(coords[0] == 'undefined' || coords[1] == 'undefined'){
    document.getElementById('pbSrcScoutResult').innerHTML += '<SPAN class=boldRed>ERRORE:Coordinate errate</span>';
    t.clickedStartScout();
    return;
  }
  document.getElementById('pbSrcScoutResult').innerHTML += 'Invia esploratori a: '+coords[0]+','+coords[1]+' - ';
  document.getElementById('pbsrcScoutCheck_'+coords[0]+'_'+coords[1]).checked = false;
  t.sendScout(coords[0], coords[1], city, count, function(c){t.doScoutCount(list, city, total, c)});
  },
  sendScout : function(x, y, city, count, notify){
  var t = Tabs.Search;
  count = parseInt(count);
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
  params.kid = 0;
  params.type = 3;
  params.xcoord = x;
  params.ycoord = y;
  params.u3 = Options.srcScoutAmt;
new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
     method: "post",
     parameters: params,
     loading: true,
     onSuccess: function (rslt) {
     rslt = eval("(" + rslt.responseText + ")");
     if (rslt.ok) {
       var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
       var ut = unixTime();
       var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
       var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
       for(i = 0; i <= unitsarr.length; i++){
        if(params["u"+i]){
        unitsarr[i] = params["u"+i];
        }
       }
       var currentcityid = params.cid;
       unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
       if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
       document.getElementById('pbSrcScoutResult').innerHTML += ' Gesendet!<BR>';
       if (notify)
        setTimeout(function(){ notify(count+1); }, 1000);
     } else {
       document.getElementById('pbSrcScoutResult').innerHTML += 'Errore, ripetere<BR>';
       if (notify)
        setTimeout(function(){ notify(count); }, 1000);
      }
    },
    onFailure: function () {}
      });
  },
  getRallypoint: function(cityId){
      var t = Tabs.Search;
    cityId = 'city'+cityId;
      for (o in Seed.buildings[cityId]){
    var buildingType = parseInt(Seed.buildings[cityId][o][0]);
    var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
    if (buildingType == 12){
      return parseInt(buildingLevel);
      break;
    }
     }
    return 0;
    },
  clickedStartScout : function(){
  var t = Tabs.Search;
    if(t.scouting == false){
      t.scouting = true;
      var ScoutList = [];
      for(k=0; k<document.getElementsByName('pbsrcScoutCheck').length; k++){
        if(document.getElementsByName('pbsrcScoutCheck')[k].checked){
          ScoutList.push(document.getElementsByName('pbsrcScoutCheck')[k].value);
        }
      }
      t.doScout(ScoutList, t.scoutcity);
      document.getElementById('pbSrcStartScout').className = 'button20 pbButCancel';
      document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>Ferma</span>';
    } else {
      t.scouting = false;
      document.getElementById('pbSrcStartScout').className = 'button20 ptButton20';
      document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>Esplora</span>';
    }
  },
/** mapdata.userInfo:
(object) u4127810 = [object Object]
  (string) n = George2gh02    (name)
  (string) t = 1              (title code)
  (string) m = 55             (might)
  (string) s = M              (sex)
  (string) w = 2              (mode: 1=normal, 2=begprotect, 3=truce, 4=vacation )
  (string) a = 0              (alliance)
  (string) i = 1              (avatar code)
*****/
  mapCallback : function (uList){
  var t = Tabs.Search;
  var rslt = t.SearchList;
  map = rslt.data;
  var Dip = Seed.allianceDiplomacies;  
  var userInfo = rslt.userInfo;
  var alliance = rslt.allianceNames;
  
  for (k in map){
    if (t.opt.searchType==0 && map[k].tileType==51 && !map[k].tileCityId ) {  // if barb
    type = 0;
    } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) { // if wild
    if (map[k].tileType == 10)
      type = 1;
    else if (map[k].tileType == 11)
      type = 2;
    else
      type = (map[k].tileType/10) + 1;
    } else if (t.opt.searchType==2 && map[k].tileCityId>=0 && map[k].tileType>50 && map[k].cityName) {
    type = 7;
    } else
    continue;
    
    var dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
    if ((t.opt.searchShape=='umkreis' && dist <= t.opt.maxDistance)
    ||  (t.opt.searchShape=='quadrant' && map[k].xCoord>=t.firstX && map[k].xCoord<=t.lastX && map[k].yCoord>=t.firstY && map[k].yCoord<=t.lastY)){
    if (t.opt.searchType==2) {    // if city search
      var isMisted = map[k].tileUserId == 0 || false;    
      var uu = 'u'+map[k].tileUserId;
      var aD = '';
      var nameU = '';
      var mightU = '';
      var aU = '';
      if (!isMisted && userInfo[uu]) {
      nameU = userInfo[uu].n;   // can error, must check if (userInfo[uu])
      mightU = userInfo[uu].m;
      if (alliance['a'+userInfo[uu].a])
        aU = alliance['a'+userInfo[uu].a];
      else
        aU = '----';
      aD = '';
      if (Dip.friendly && Dip.friendly['a'+userInfo[uu].a]) aD = 'f';
      if (Dip.hostile && Dip.hostile['a'+userInfo[uu].a]) aD = 'h';
      if (Dip.allianceId && Dip.allianceId==userInfo[uu].a) aD = 'a';
      if (getDiplomacy(userInfo[uu].a) == 'neutral') aD = 'n';
      if (!userInfo[uu].a || userInfo[uu].a==0) aD = 'u';
      }
// TODO: save memory, remove city name ?         
       t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName, nameU, mightU, aU, aD, uList.data[map[k].tileUserId]?1:0]);
    } else {
      isOwned = map[k].tileUserId>0 || map[k].misted;
       t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, (map[k].tileUserId>0? map[k].tileUserId : 0), uList.data[map[k].tileUserId]?1:0]);
    }
    ++t.tilesFound;
    }
  }
  
  t.tilesSearched += (15*15);
  document.getElementById('pastatSearched').innerHTML = 'Cercate: '+ t.tilesSearched;
  t.dispMapTable();

  t.curX += 15;
  if (t.curX > t.lastX){
    t.curX = t.firstX;
    t.curY += 15;
    if (t.curY > t.lastY){
    t.stopSearch ('Fatto!');
    return;
    }
  }
  var x = t.MapAjax.normalize(t.curX);
  var y = t.MapAjax.normalize(t.curY);
  document.getElementById ('pastatStatus').innerHTML = 'Sto cercando a... '+ x +','+ y;
  setTimeout (function(){t.MapAjax.request (x, y, 15, t.eventgetplayeronline)}, MAP_DELAY);
  },
  eventgetplayeronline : function (left, top, width, rslt){
    var t = Tabs.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
     t.stopSearch ('ERROR: '+ rslt.errorMsg);
    return;
    }
    map = rslt.data;
    t.SearchList = rslt;
    var uList = [];
    for(k in map){
      if(map[k].tileUserId != null)
        uList.push(map[k].tileUserId);
    }
    t.fetchPlayerStatus (uList, function(r){ t.mapCallback(r)});
    },
  clickedScout : function (x, y){
  unsafeWindow.modal_attack (3, x, y);
  CwaitForElement ('modal_attack', 5000, function (){document.getElementById('modalBox1').style.zIndex='112000'});
  },
  
  clickedLookup : function (pid){
  var t = Tabs.Search;

  var pop = new CPopup ('pbsrclookup', 0,0, 500,750, true);
  if (t.popFirst){
    pop.centerMe (mainPop.getMainDiv());  
    t.popFirst = false;
  }
  pop.getTopDiv().innerHTML = '<CENTER><B>Profilo giocatore</b></center>';
  pop.getMainDiv().innerHTML = '<DIV class=pdxStat2>Informazioni dalla classifica</div><SPAN id=pblupLB>Ricerca dati in classifica...</span>\
    <BR><DIV class=pdxStat2>Altre informazioni</div><SPAN id=pblupAI>Ricerca informazioni sull\'alleanza</span>';
  pop.show (true);
  t.fetchLeaderboard (pid, function (r){t.gotPlayerLeaderboard(r, document.getElementById('pblupLB'))});
  t.fetchPlayerInfo (pid, function (r){t.gotPlayerInfo(r, document.getElementById('pblupAI'))});
  //t.fetchPlayerLastLogin (pid, function (r){t.gotPlayerLastLogin(r, document.getElementById('pblupLL'))});
  },
  ExportToRaid : function (X,Y){
    var t = Tabs.Search;
    var pop = new CPopup ('pbExportRaid', 0,0, 800,300, true);
    if (t.popFirst){
      pop.centerMe (mainPop.getMainDiv());  
      t.popFirst = false;
    }
    pop.getTopDiv().innerHTML = '<CENTER><B>Esporta ai raid barbarici</b></center>';
    
	  var m = '<TABLE id=pbRaidAdd width=100% height=0% class=pdxTab><TR align="center">';
	  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
	  m += '<TD>Truppe di rifornimento</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
	  m += '<TD>Soldati semplici</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
	  m += '<TD>Esploratori</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
	  m += '<TD>Lanceieri</td></tr>'
	  m += '<TR><TD><INPUT id=Unit1 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit2 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit3 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit4 type=text size=6 maxlength=6 value="0"></td></tr>';
	  
	  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
	  m += '<TD>Spadaccini</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
	  m += '<TD>Arcieri</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
	  m += '<TD>Cav. leggera</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
	  m += '<TD>Cav. pesante</td></tr>'
	  m += '<TR><TD><INPUT id=Unit5 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit6 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit7 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit8 type=text size=6 maxlength=6 value="0"></td></tr>';
	  
	  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
	  m += '<TD>Carri di rifornimento</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
	  m += '<TD>Baliste</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
	  m += '<TD>Arieti</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
	  m += '<TD>Catapulte</td></tr>'
	  m += '<TR><TD><INPUT id=Unit9 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit10 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit11 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit12 type=text size=6 maxlength=6 value="0"></td></tr></table>';
	  
	  m += '<BR><CENTER>' +strButton20('AIUTO', 'id=pbHelp')+'<SELECT id=RaidKnights type=list></select></center>';
	  //m+= '<BR><CENTER>'+ strButton20('AIUTO', 'id=pbHelp') +'</center>';
	  m+= '<BR><CENTER>'+ strButton20('Salva e attacca', 'id=pbRaidSave') +'</center>';
          
    pop.getMainDiv().innerHTML = m;
    
    t.getKnights();
    
    document.getElementById ('pbHelp').addEventListener ('click', t.helpPop, false);
    document.getElementById ('pbRaidSave').addEventListener ('click', function(){
	
var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	  		
    	params.pf = 0;
        params.ctrl = 'BotManager';
    	params.action = 'saveMarch';
    	params.settings = {};
    	params.settings.cityId = t.selectedCity['id'];
    	params.queue = {0:{botMarches:{botMarchStatus:1,botState:1},cityMarches:{}}};    	
    	params.queue[0].cityMarches.knightId = parseInt(document.getElementById ('RaidKnights').value);
    	params.queue[0].cityMarches.toXCoord = X;
    	params.queue[0].cityMarches.toYCoord = Y;
    	params.queue[0].cityMarches.unit0Count = 0; //document.getElementById ('Unit0').value;
    	params.queue[0].cityMarches.unit1Count = parseInt(document.getElementById ('Unit1').value);
    	params.queue[0].cityMarches.unit2Count = parseInt(document.getElementById ('Unit2').value);
    	params.queue[0].cityMarches.unit3Count = parseInt(document.getElementById ('Unit3').value);
    	params.queue[0].cityMarches.unit4Count = parseInt(document.getElementById ('Unit4').value);
    	params.queue[0].cityMarches.unit5Count = parseInt(document.getElementById ('Unit5').value);
    	params.queue[0].cityMarches.unit6Count = parseInt(document.getElementById ('Unit6').value);
    	params.queue[0].cityMarches.unit7Count = parseInt(document.getElementById ('Unit7').value);
    	params.queue[0].cityMarches.unit8Count = parseInt(document.getElementById ('Unit8').value);
    	params.queue[0].cityMarches.unit9Count = parseInt(document.getElementById ('Unit9').value);
    	params.queue[0].cityMarches.unit10Count = parseInt(document.getElementById ('Unit10').value);
    	params.queue[0].cityMarches.unit11Count = parseInt(document.getElementById ('Unit11').value);
    	params.queue[0].cityMarches.unit12Count = parseInt(document.getElementById ('Unit12').value);
    	
    	 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
			  		method: "post",
			         parameters: params,
					 loading: true,
					 onSuccess: function(transport){
						var rslt = eval("(" + transport.responseText + ")");
	                      if (rslt.ok) {
	                      		pop.show (false);
								unsafeWindow.cityinfo_army();
	                          setTimeout(unsafeWindow.update_seed_ajax, 250);
						 } else ('Error :' + rslt.msg);
						 
					 },
			 });
    	}, false);
    
    pop.show (true);
  },
  
  
  getKnights : function(){
         var t = Tabs.Search;
         var knt = new Array();
         cityId = t.selectedCity['id'];
         for (k in Seed.knights['city' + cityId]){
         		if (Seed.knights['city' + cityId][k]["knightStatus"] == 1 && Seed.leaders['city' + cityId]["resourcefulnessKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["politicsKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["combatKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["intelligenceKnightId"] != Seed.knights['city' + cityId][k]["knightId"]){
         			knt.push ({
         				Name:   Seed.knights['city' + cityId][k]["knightName"],
         				Combat:	parseInt(Seed.knights['city' + cityId][k]["combat"]),
         				ID:		Seed.knights['city' + cityId][k]["knightId"],
         			});
         		}
         }
         knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
         document.getElementById('RaidKnights').options.length=0;
  		var o = document.createElement("option");
  		o.text = '-- Scegli cavaliere --';
  		o.value = 0;
  		document.getElementById("RaidKnights").options.add(o);
         for (k in knt){
      			if (knt[k]["Name"] !=undefined){
  	    			var o = document.createElement("option");
  	    			o.text = (knt[k]["Name"] + ' (' + knt[k]["Combat"] +')')
  	    			o.value = knt[k]["ID"];
  	    			document.getElementById("RaidKnights").options.add(o);
      			}
      	}
      },
  
  gotPlayerLeaderboard : function (rslt, span){
  var t = Tabs.Search;
  if (!rslt.ok){
    span.innerHTML = rslt.errorMsg;
    return;
  }
  if (rslt.totalResults == 0){
    span.innerHTML = '<B>Classifica:</b> Non trovato...sotto nebbia?<BR><BR>';
    return;
  }
  var p = rslt.results[0];
  var x;
  var name = '';
  if (p.playerSex == 'M')
    name = 'Lord ';
  else if (p.playerSex == 'F')
    name = 'Lady ';   
  name += p.displayName;      
  if ((x = officerId2String(p.officerType)) != '')  
    name += ' ('+ x + ')';  
  var aName = p.allianceName;
  if (!aName || aName=='')
    aName = 'none';
       
  var m = '<CENTER><SPAN class=boldRed><u>ATTENZIONE</u>: La classifica è aggiornata ogni 24, alcuni dati potrebbero non essere disponibili</span></center><TABLE class=pdxTabSome>';
  m += '<TR><TD class=pbDetLeft>Giocatore:</td><TD>'+ name +'</td></tr>\
    <TR><TD class=pbDetLeft>Potere:</td><TD>'+ p.might +' (Posizione #'+ p.rank +')</td></tr>\
    <TR><TD class=pbDetLeft>Alleanza:</td><TD>'+ aName +' ('+ getDiplomacy(p.allianceId) +')</td></tr>\
    <TR valign=top><TD class=pbDetLeft>Città:</td><TD><TABLE class=pdxTabSome><TR style="font-weight:bold"><TD>Nome Città</td><TD>Coordinate</td><TD>Livello castello</td><TD>Stato</td><TD>Fondata </td></tr>';
    
  for (var i=0; i<p.cities.length; i++){
    var c = p.cities[i];
    var created = '';
    if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
    created = c.dateCreated.substr(0,10);
    m += '<TR><TD>'+ c.cityName +'</td><TD>'+ coordLink(c.xCoord, c.yCoord) +'</td><TD align=center>'+ c.tileLevel +'</td>\
      <TD>'+ cityStatusString (c.cityStatus) +'</td><TD>'+ created +'</td></tr>';
  }    
  m += '</table></td></tr></table>';
  span.innerHTML = m;
  },


  gotPlayerInfo : function (rslt, span){
  var t = Tabs.Search;
  if (!rslt.ok){
    span.innerHTML = rslt.errorMsg;
    return;
  }
  var m = '<TABLE class=pdxTabSome>';
  var p = rslt.userInfo[0];
  var pids = p.provinceIds.split (',');
  var prov = [];
  for (var i=0; i<pids.length; i++)
    prov.push(unsafeWindow.provincenames['p'+pids[i]]);
  m += '<TR><TD class=pbDetLeft>Giocatore:</td><TD>'+ p.genderAndName +'</td></tr>\
    <TR><TD class=pbDetLeft>Potere:</td><TD>'+ p.might +'</td></tr>\
    <TR><TD class=pbDetLeft>Profilo su fb:</td><TD><A target="_tab" href="http://www.facebook.com/profile.php?id='+ p.fbuid +'">Visualizza qui!</a></td></tr>\
    <TR><TD class=pbDetLeft>Alleanza:</td><TD>'+ p.allianceName +' ('+ getDiplomacy(p.allianceId) +')</td></tr>\
    <TR valign=top><TD class=pbDetLeft>Provinzen:</td><TD style="white-space:normal">'+ prov.join(', ') +'</td></tr>';
  span.innerHTML = m + '</table>';
  },
  fetchPlayerInfo : function (uid, notify){
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.uid = uid;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
    notify (rslt);
    },
    onSuccess: function (rslt) {
    notify (rslt);
    },
  });
  },
  fetchLeaderboard : function (uid, notify) {
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.userId = uid;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
    notify (rslt);
    },
    onFailure: function (rslt) {
    notify (rslt);
    },
  });
  },
  /*
 gotPlayerLastLogin : function (rslt, span){
  var t = Tabs.Search;
  if (!rslt.ok){
    span.innerHTML = rslt.errorMsg;
    return;
  }

  var p = rslt.playerInfo;
  var lastLogin = rslt.playerInfo.lastLogin;
  
  if (lastLogin) {
    m = '<span style="color:black">Ultimo accesso effettuato: '+lastLogin+'</span>';
  } else {
     m = '<span style="color:red">Nessun accesso trovato: '+lastLogin+'</span>';
  }  
  span.innerHTML = m + '';
  },
   fetchPlayerLastLogin : function (uid, notify){
var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
params.pid = uid;
new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
method: "post",
parameters: params,
onSuccess: function (rslt) {
notify (rslt);
},
onFailure: function (rslt) {
notify ({errorMsg:'AJAX error'});
},
});
},  
*/
fetchPlayerStatus : function (uidArray, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = uidArray.join(',');
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
      notify (rslt);
      },
      onFailure: function (rslt) {
      notify ({errorMsg:'AJAX error'});
      },
    });
    },
};   

// end Search tab




/******** Export to KOC Attack **********/  

var exportToKOCattack = {
  troops : {},  
  
  init : function (){
  var t = exportToKOCattack;
  for (var b=1; b<11; b++){
    t.troops['b'+ b] = [];
    for (var trp=0; trp<12; trp++){
    t.troops['b'+ b][trp] = 0;
    }
  }
  var s = GM_getValue ('atkTroops_'+ getServerId(), null);
  if (s != null){
    var trp = JSON2.parse(s);
    for (var b=1; b<11; b++){
    if (trp['b'+ b] && trp['b'+ b].length == 12)
      t.troops['b'+ b] = trp['b'+ b];
    }
  }
  window.addEventListener('unload', t.onUnload, false);
  },
  
  onUnload : function (){
  var t = exportToKOCattack;
  GM_setValue ('atkTroops_'+ getServerId(),  JSON2.stringify(t.troops));
  },
  
  doExport : function (coordList, city){
  var t = exportToKOCattack;
  var popExp = null;
  var cList = coordList;
  var curLevel = 0;
  var city = city;
  var troopDef = [
    ['Vers.', 1],
    ['Wagen', 9],
    ['Bogen', 6],
    ['Kav', 7],
    ['Skav', 8],
    ['Ballis', 10],
  ];
  
  if (popExp == null){
    popExp = new CPopup ('pbsrcexp', 0,0, 625,750, true, function (){popExp.destroy(); popExp=null;});
    popExp.centerMe (mainPop.getMainDiv());  
  }
  var m = '<DIV class=pdxStat2>Exportiere datan nach KoC Attack</div><BR><TABLE align=center cellpadding=0 cellspacing=0 class=pdxTabPadNW>\
    <TR style="font-weight:bold; background-color:white"><TD>Ziel Typ</td><TD style="padding:1px" align=center>#<BR>Ziele</td><TD width=15></td>';
  for (var i=0; i<troopDef.length; i++)
    m += '<TD>'+ troopDef[i][0] +'</td>';
  m += '</tr>';
  for (var b=1; b<11; b++){
    m += '<TR><TD>Barbaren Level '+ b +'</td><TD align=right>'+ coordList['lvl'+b].length  +'&nbsp; &nbsp;</td><TD></td>';
    for (var td=0; td<troopDef.length; td++)
    m += '<TD><INPUT id=ptET_'+ b +'_'+ troopDef[td][1] +' type=text size=3 value="'+ t.troops['b'+ b][troopDef[td][1]-1] +'"></td>';
    m += '<TD width=90%><SPAN class=boldRed id=ptETerr_'+ b +'></span></tr>';
  }
  m += '</table>';
  var isKOCattack = !(document.getElementById('KOCAttackToggle') == null);
  
  //TODO: 'RESET VALUES' button ?
  
  if (isKOCattack){
    m += '<BR><CENTER>'+ strButton20('Koordinaten zu KoC Attack Hinzugfügen', 'id=pbSrcDoBA') +'</center>';
  } else {
    m += 'KoC Attack ist nicht Aktiv!';
  }
  m += '<CENTER><DIV style="width:70%" id=pbSrcExpResult></DIV></center>';
  popExp.getMainDiv().innerHTML =  m;
  for (var b=1; b<11; b++)
    for (var td=0; td<troopDef.length; td++)
    document.getElementById('ptET_'+ b +'_'+ troopDef[td][1]).addEventListener ('change', validate, false);
  
  popExp.getTopDiv().innerHTML = '<CENTER><B>KoC Power - Deutsch: Export</b></center>';
  if (isKOCattack)    
    document.getElementById ('pbSrcDoBA').addEventListener ('click', doBulkAdd, false);
  popExp.show(true);
     
  if (city != null){
    for (var i=0; i<Cities.numCities; i++)
    if (city.id == Cities.cities[i].id)
      break;
    if (i < Cities.numCities){
    setTimeout (function(){unsafeWindow.citysel_click(document.getElementById('citysel_'+ (i+1)));}, 0);
//logit ("SWITCH CITY: "+ (i+1));          
    }
  }
// TODO: WAIT FOR City select ?
  
  
  function validate (e){
    var x = e.target.id.substr(5).split('_');
    var b = x[0];
    var trp = x[1];
    document.getElementById('ptETerr_'+ b).innerHTML = '';
    var x = parseIntZero (e.target.value);
     if (isNaN(x) || x<0 || x>150000){
    e.target.style.backgroundColor = 'red';
    document.getElementById('ptETerr_'+ b).innerHTML = 'Fehlerhafter Eintrag';
    return;
    } else {
    e.target.style.backgroundColor = '';
    e.target.value = x;
    t.troops['b'+ b][trp-1] = x;
    }
    var tot = 0;
    for (var td=0; td<troopDef.length; td++)
    tot += parseIntZero(document.getElementById('ptET_'+ b +'_'+ [troopDef[td][1]]).value);
    if (tot<1 && cList['lvl'+ b].length>0 )
    document.getElementById('ptETerr_'+ b).innerHTML = 'Keine Truppen definiert!';
    if (tot>150000)
    document.getElementById('ptETerr_'+ b).innerHTML = 'zu viele Truppen...';
  }
    
  function doBulkAdd (){
    for (var b=1; b<11; b++){
    if (document.getElementById('ptETerr_'+ b).innerHTML != '')
      return;
    var tot = 0;
    for (var td=0; td<troopDef.length; td++)
      tot += t.troops['b'+b][troopDef[td][1]-1];
    if (tot<1 && cList['lvl'+ b].length>0){
      document.getElementById('ptETerr_'+ b).innerHTML = 'Keine Truppen definiert!';
      return;
    } else if (tot>150000) {
      document.getElementById('ptETerr_'+ b).innerHTML = 'zu viele Truppen...';
      return;
    }
    }    
    document.getElementById('pbSrcExpResult').innerHTML = '';
    doNextLevel ();
  }
  
  function endBulkAdd (msg){
    unsafeWindow.Modal.hideModalAll();
    curLevel = 0;
    showMe ();
    popExp.show(true);
    document.getElementById('pbSrcExpResult').innerHTML += msg;
  }
  
  function doNextLevel (){
    while ( curLevel<10 && cList['lvl'+ ++curLevel].length==0)
    ;
    if (curLevel>=10){
    endBulkAdd ('Fatto!<BR>');
    return;
    }
 e_attackDialog(false);
  }
    
  function e_attackDialog (tf){
    if (!tf){
hideMe();
 popExp.show (false);
 unsafeWindow.Modal.hideModalAll();
 unsafeWindow.modal_attack(4,0,0);
   new CwaitForElement ('BulkAddAttackDiv', 1000, e_attackDialog );
    }
    var div = searchDOM (document.getElementById('BulkAddAttackDiv'), 'node.tagName=="DIV" && node.style.display=="none"', 10);
    if (div==null){
    endBulkAdd ('<SPAN class=boldRed>FEHLER: Fehlerhaftes Angriff Dialog Format (1).</span>');
    return;  
    }
    var ta = searchDOM (div, 'node.tagName=="TEXTAREA"', 10);
    var but = searchDOM (div, 'node.tagName=="A"', 10);
    if (ta==null || but==null){
    endBulkAdd ('<SPAN class=boldRed>FEHLER: Fehlerhaftes Angriff Dialog Format (2).</span>');
    return;  
    }
    for (var trp=1; trp<13; trp++){
    var inp = document.getElementById('modal_attack_unit_ipt' +trp);
    inp.value = t.troops['b'+curLevel][trp-1];
    if (t.troops['b'+curLevel][trp-1] > 0)
      inp.style.backgroundColor = 'yellow';
    else
      inp.style.backgroundColor = 'white';
    }
    div.style.display = 'block';
    document.getElementById('KOCAttackBulkAddForce').checked = true;
    if (DISABLE_BULKADD_LIST)
    ta.value = '';
    else {
    var m = '';
    var list = cList['lvl'+ (curLevel)];
    for (i=0; i<list.length; i++)
      m += list[i].x +','+ list[i].y +'\n';
    ta.value = m;
    }
    clickWin (unsafeWindow, but, 'click');   
    unsafeWindow.Modal.hideModal();
    document.getElementById('pbSrcExpResult').innerHTML += ' '+ list.length +' Koordinaten für '+ city.name +' Hinzugefügt!<BR>';
    setTimeout (doNextLevel, 500);
  }    
  },
}


  function searchDOM (node, condition, maxLevel, doMult){
  var found = [];
  eval ('var compFunc = function (node) { return ('+ condition +') }');
  doOne(node, 1);
  if(!doMult){
    if (found.length==0)
    return null;
    return found[0];
  }
  return found;
  function doOne (node, curLevel){
    try {
    if (compFunc(node))
      found.push(node);
    } catch (e){
    }      
    if (!doMult && found.length>0)
    return;
    if (++curLevel<maxLevel && node.childNodes!=undefined)
    for (var c=0; c<node.childNodes.length; c++)
      doOne (node.childNodes[c], curLevel);
  }
  }


/*********************************** Players TAB ***********************************/

Tabs.AllianceList = {
  tabLabel : 'Giocatori',
  tabOrder : toSpieler,
  cont : null,
  dat : [],

  

/***
ajax/viewCourt.php:
  (boolean) ok = true
  (array) courtItems =

  (string) dailyActionFlag = 0
  (object) playerInfo = [object Object]
    (string) datejoinUnixTime = 1294440708
    (string) truceExpireUnixTime = 0
    (string) userId = 4394121
    (string) displayName = Vakasade
    (string) email =
    (string) fbuid = 100000977751880
    (string) playerSex = F
    (string) usertype = 1
    (string) status = 1
    (string) dateJoined = 2011-01-07 14:51:48
    (string) lastLogin = 2011-03-13 13:11:34
    (string) eventTimestamp = 0000-00-00 00:00:00
    (string) eventStatus = 1
    (string) warStatus = 1
    (string) allianceId = 85
    (number) might = 1192710
    (string) title = 57
    (string) truceExpireTimestamp = 0000-00-00 00:00:00
    (string) fogExpireTimestamp = 0000-00-00 00:00:00
    (string) cnt_newmsg = 0
    (string) cnt_friendreq = 0
    (string) cnt_logins = 3910
    (string) cnt_passreset = 0
    (string) cnt_connections = 0
    (string) avatarId = 11
    (undefined) photo_host: null = null
    (undefined) photo_dir: null = null
    (undefined) photo_subdir: null = null
    (undefined) photo_name: null = null
    (string) allianceName = The Flying Circus

  (number) cityCount = 2
  (undefined) errorMsg: null = null
***/
fetchPlayerCourt : function (uid, notify){
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.pid = uid;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
logit ("ajax/viewCourt.php\n"+ inspect (rslt, 3, 1));      
      notify (rslt);
    },
    onFailure: function (rslt) {
      notify (rslt);
    },
  });
},


fetchTEST : function (pageNum, notify){    // as in alliance list, sorted by rank, 10 per page
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.pageNo = 1;
  params.numPerPage = 100;
  params.perPage = 100;
  params.results = 100;
  params.numResults = 100;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
logit ("ajax/allianceGetMembersInfo.php:\n"+ inspect (rslt, 5, 1));      
      notify (rslt);
    },
    onFailure: function (rslt) {
      notify ({errorMsg:'AJAX error'});
    },
  });
},

  
   init : function (div){
    var t = Tabs.AllianceList;
    t.cont = div;
    unsafeWindow.PTgetMembers = t.eventGetMembers;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpl = t.clickedPlayerLeaderboard;
    unsafeWindow.PTpl2 = t.clickedPlayerLeaderboard2;
    unsafeWindow.PTalClickPrev = t.eventListPrev;
    unsafeWindow.PTalClickNext = t.eventListNext;
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;
    Lastlogin=0;
    t.show();
  },
 
 /*
  init : function (div){
    var t = Tabs.AllianceList;
    t.cont = div;
//t.fetchTEST();    
    unsafeWindow.PTgetMembers = t.eventGetMembers;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpl = t.clickedPlayerLeaderboard;
    if (getMyAlliance()[0] == 0) {
      t.cont.innerHTML = '<BR><BR><CENTER>You need to be in an alliance to use this feature.</center>';
      t.state = 1;
      return;
    }
    var m = '<div ><DIV class=pdxEntry><TABLE width=100% cellpadding=0>\
        <TR><TD class=xtab align=right></td><TD class=xtab>Enter all or part of a player name: &nbsp;</td>\
          <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Find Player" /></td>\
          <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
        <TR><TD class=xtab>OR: </td><TD class=xtab> Enter all or part of an alliance name: &nbsp;</td>\
          <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Find Alliance" /> &nbsp; <INPUT id=myAllSubmit type=submit value="'+ getMyAlliance()[1] +'" /></td>\
          <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
        </table><span style="vertical-align:middle;" id=altInput></span></div>\
        <div style="overflow-y:auto;"; id=allListOut ></div></div>';
    t.cont.innerHTML = m;
    document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
    document.getElementById('myAllSubmit').addEventListener ('click', t.eventMyAllianceSubmit, false);
    document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
    document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
    document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
  },
*/
  hide : function (){
  },

  show : function (){
    var t = Tabs.AllianceList;
    if (t.state == null){
      if (getMyAlliance()[0] == 0) {
        t.cont.innerHTML = '<BR><BR><CENTER><blink><b>Devi essere in un\'alleanza per usare questa funzione</b></blink></center>';
        t.state = 1;
        return;
      }
      var m = '<DIV class=pdxEntry><TABLE width=100% cellpadding=0>\
          <TR><TD width="0%" align=right class=xtab></td><TD width="7%" class=xtab>Nome giocatore: &nbsp;</td><TD width=11% class=xtab>&nbsp;</td>\
            <TD width=20% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Cerca giocatore" /></td>\
            <TD width="62%" class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
          <TR><TD class=xtab> </td><TD class=xtab>Nome alleanza: &nbsp;</td><TD class=xtab>&nbsp;</td>\
            <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Cerca alleanza" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr><TR><TD class=xtab></td>\
             <TD class=xtab><INPUT align=left id=allListSubmit type=submit value="Tutte le allenze" /></td>\
             <TD class=xtab><INPUT align=left id=idMyAllSubmit type=submit value="'+ getMyAlliance()[1] +'"/></td>\
             <TD class=xtab>&nbsp;</td>\
             <TD class=xtab ><span><b><center>Arrivo</center></b></span></td></tr>\
           <TR><TD height="43" class=xtab> </td><TD colspan="3" class=xtab><SPAN class=boldRed><u>IMPORTANTE</u></span>: I dati provengono dalla classifica e vengono aggiornati ogni 24 ore<br>\
<u><b>Informazione</b></u>:Clicca sulla prima riga di ogni colonna per ordinare<br>\
<b>ETA</b>: <i>Tempo stimato all\'arrivo</i></td>\
             <TD class=xtab ><div><center><select id="idFindETASelect">\
        <option value="0,250" >-- Scegli tipo di truppa --</option>\
        <option value="0,180" >Truppe di rifornimento:</option>\
        <option value="0,200" >Soldati semplici</option>\
        <option value="0,3000" >Esploratori</option>\
        <option value="0,300" >Lancieri</option>\
        <option value="0,275" >Spadaccini</option>\
        <option value="0,250" >Ariceri</option>\
        <option value="1,1000" >Cav. leggera</option>\
        <option value="1,750" >Cav. pesante</option>\
        <option value="1,150" >Carri di rifornimento</option>\
        <option value="1,100" >Baliste</option>\
        <option value="1,120" >Arieti</option>\
        <option value="1,80" >Catapulte</option>\
        </select></center></div>\
        </td></tr></table><span style="vertical-align:middle;" id=altInput></span></div><SPAN id=allListOut></span>';
      t.cont.innerHTML = m;
      document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
      document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
      document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
      document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
      document.getElementById('allListSubmit').addEventListener ('click', t.eventListSubmit, false);
      //document.getElementById('allGotoPage').addEventListener ('click', t.gotoPage, false);
      document.getElementById('idMyAllSubmit').addEventListener ('click', t.showMyAlliance, false);
      document.getElementById('idFindETASelect').addEventListener ('click', t.handleEtaSelect, false);
      //document.getElementById('allGotoPage').disabled = true;
      document.getElementById('idFindETASelect').disabled = true;
      t.ModelCity=Cities.cities[0];
      t.curPage = 0;
      t.MaxPage = -1;
      t.state = 1;
    }
  },

  pName : '',
  eventPlayerSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptplayErr').innerHTML='';
    var name = document.getElementById('allPlayName').value;
    t.pName = name;
    if (name.length < 3){
      document.getElementById('ptplayErr').innerHTML = '<blink>Inserisci almeno tre caratteri!</blink>';
      return;
    }
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER><b>Sto cercando...</b></center>';
    t.fetchPlayerList (name, t.eventGotPlayerList);
  },
  
  eventGotPlayerList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.playerList = rslt.matchedUsers;
    var uList = [];
    for (k in rslt.matchedUsers)
      uList.push (rslt.matchedUsers[k].userId);     
    t.fetchPlayerStatus (uList, function(r){t.eventGotPlayerOnlineList(r)});    
  },    
    
  eventGotPlayerOnlineList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=pdxStat>Trovati: <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=100% align=center class=pdxTab2 cellspacing=0><TR style="font-weight:bold"><TD>Nome</td>\
      <TD align=right>Potere</td><TD> &nbsp; Online</td><TD> &nbsp;Facebook&nbsp; </td><TD width=75%>Mostra </td></tr>';
    var row=0;
    var cl='';
    for (k in t.playerList){
      var u = t.playerList[k];
      if (++row % 2)
        cl = 'class=ptOddrow ';
      else
        cl = '';
      m += '<TR '+ cl +'valign=top><TD>'+ u.genderAndName +'</td><TD align=right>'+ addCommasInt(u.might) +'</td>\
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkGreen><blink>ONLINE</blink></span>":"") +'</td>\
          <TD align=center><A target="_tab" href="http://www.facebook.com/profile.php?id='+ u.fbuid +'">Profile</a></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A>Dettagli</a> &nbsp; <BR></span><SPAN onclick="PTpl2(this,'+ u.userId+','+rslt.data[u.userId]+')"><A>Classifica</a><BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A>Ultimo accesso</a></span></td></tr>';
    }
    m += '</table></div>';
    document.getElementById('allListOut').innerHTML = m;
  },
  
    
  clickedPlayerDetail : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "Sto cercando dettagli...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "Sto cercando nella classifica...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },

  clickedPlayerLeaderboard2 : function (span, uid,status){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "Sto cercando nella classifica...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard2(r, span,uid,status)});
  },
  
  clickedPlayerGetLastLogin : function (span, uid){
     var t = Tabs.AllianceList;
     span.onclick = '';
     span.innerHTML = "Sto cercando ultimo accesso...";
     t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
   },

  gotPlayerLeaderboard2 : function (rslt,span,uid,status){
   // alert(uid+'/'+status);
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Calssifica:</b> nessun risultato, forse sotto nebbia';
      return;
    }
    var myA = getMyAlliance ();
    t.dat = [];
    //logit ("gotPlayerLeaderboard2 -1 "+JSON2.stringify(rslt));
    var p = rslt.results[0];
        if ( myA[0] == p.allianceId)
           t.friendEta = true;
        else
           t.friendEta = false;
        for (var c=0; c<p.cities.length; c++){
          t.dat.push ([p.displayName, parseInt(p.might), p.officerType, parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
               parseInt(p.cities[c].xCoord), parseInt(p.cities[c].yCoord), p.cities[c].cityName, 0, status,0,p.userId]);
        }
        t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
        t.ModelCity=Cities.cities[0];
        t.setEta();
        t.fetchPlayerLastLogin (uid, function (r) {t.displayPlayer(p.allianceName,r)});
        //t.fetchPlayerLastLogin();
        //t.displayPlayer (p.allianceId);
  },
  
  
  gotPlayerLeaderboard : function (rslt, span){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Classifica:</b> nessun risultato, forse sotto nevvia';
      return;
    }
    var p = rslt.results[0];
    var an = p.allianceName;
    if (!an || an=='' || p.officerType==4)
      an = 'none';
    else
      an += ' ('+ officerId2String(p.officerType) +')';
    pStr = JSON2.stringify(p);
    logit (pStr);
    m = '<TABLE cellspacing=0 class=pdxTab2><TR><TD><B>Classifica: </b></td><TD colspan=2> Potere: '+ p.might  +' &nbsp; Alleanza: '+ an +'</td></tr>';
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = ' &nbsp; Fondata: ' + c.dateCreated.substr(0,10);
      m += '<TR><TD align=right><B>Città #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName
      +' (<a onclick="ptGotoMap ('+ c.xCoord +',' +c.yCoord+ ')">'+ c.xCoord +','+ c.yCoord +'</a>)</td><TD width=75%> &nbsp; Livello: '
        + c.tileLevel +' &nbsp; Stato: '+ cityStatusString (c.cityStatus) + created +'</td></tr>';
    }  
    span.innerHTML = m + '</table>';
  },
    
  gotPlayerDetail : function (rslt, span){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var u = rslt.userInfo[0];
    var a = 'None';
    if (u.allianceName)
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
    var m = '<TABLE cellspacing=0 class=pdxTab2><TR><TD><B>Dettagli:</b> &nbsp; </td><TD><b>Alleanza</b> '+ a +' &nbsp; <b>Città</b> '
          + u.cities +' &nbsp; <b>Popolazione totale</b> '+ u.population +'</td></tr><TR><TD></td><TD><b>Provincia</b> ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  eventMyAllianceSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching2 ...</center>';
    t.fetchAllianceMemberList (getMyAlliance()[0], null, t.eventGotMemberList);
  },  
    
  aName : '',
  eventSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = '<blink>Attenzione! inserire almeno 3 caratteri</blink>';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER><b>Sto cercando di trovare l\' alleanza</b></center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },

  eventListSubmit : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER><b>Sto cercando la lista  alleanze</b></center>';
    if (myA[0]!=0  ) {
       t.curPage=1;
       t.fetchOtherAllianceInfo ( 1, t.eventGotOtherAlliancePage);
       //document.getElementById('allGotoPage').disabled = false;
    }
    else {
       document.getElementById('allListOut').innerHTML = '<blink><b>Devi essere in un\'alleanza per usare questa funzione!</b></blink>';
    }
  },

  eventGotAllianceList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=pdxStat>Showing alliances matching <B>"'+ t.aName +'"</b></div>\
    <TABLE><TR style="font-weight:bold"><TD class=xtab>Alleanza</td><TD class=xtab>Carica</td><TD class=xtab>Nome giocatore</td>\
        <TD align=right class=xtab>Potere</td><TD class=xtab>Diplomazia</td><TD class=xtab></td></tr>';
    for (k in rslt.alliancesMatched){
      var all = rslt.alliancesMatched[k];
      var dip = '';
      if (all.relation && all.relation==1)
        dip = 'Friendly';
      else if (all.relation && all.relation==2)
        dip = 'Hostile';
      m += '<TR><TD class=xtab>'+ all.allianceName +'</td><TD align=right class=xtab>'+ all.ranking +'</td><TD align=right class=xtab>'+ all.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(all.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ all.allianceId +')">Mostra giocatore</a></td></tr>';
    }
    document.getElementById('allListOut').innerHTML = m;
  },


  showMyAlliance : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>5 ...</center>';
    if (myA[0]!=0  ) {
       t.eventGetMembers(myA[0]);
    }
    else {
       document.getElementById('allListOut').innerHTML = '<blink><b>Devi essere in un\'alleanza per usare questa funzione!!</b></blink>';
    }
  },

  curPage : 0,
  MaxPage : 0,

  eventListNext : function (amt){
    var t = Tabs.AllianceList;
    if( parseInt(amt) >= 9999 )
       t.curPage = t.MaxPage;
    else {
      t.curPage = parseInt(t.curPage) + parseInt(amt);
      if ( t.curPage > t.MaxPage) {
        t.curPage = t.MaxPage;
      }
    }
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER><b>Avanti...</b></center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  eventListPrev : function (amt){
    var t = Tabs.AllianceList;
    if(amt <= -1)
       t.curPage = 1;
    else {
      t.curPage-=amt;
      if ( t.curPage < 1 ) {
        t.curPage = 1;
      }
    }
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER><b>Indietro...</b></center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  gotoPage : function (){
    var t = Tabs.AllianceList;
    //var val = document.getElementById('idPageNum').value;
    if (t.MaxPage < 0 ) {
      document.getElementById('allListOut').innerHTML = 'Prima alleanza della lista';
      return;
    }
    if (t.MaxPage < 0 || val > t.MaxPage || val < 1) {
      document.getElementById('allListOut').innerHTML = '<blink><b>La pagina non esiste</b></blink>';
      return;
    }
    //t.curPage = val;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> 9...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  eventGotOtherAlliancePage : function (rslt){
    var t = Tabs.AllianceList;

    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }

    //  document.getElementById('idPageNum').value = t.curPage;

    t.MaxPage=rslt.noOfPages;
    //document.getElementById('idMaxPageNum').innerHTML = 'of ' + t.MaxPage;

    var m = '<div style="overflow:auto; height:556px;width:564px;"><TABLE><thead><TR style="font-weight:bold"> \
        <th class=xtab>Alleanza</th><th class=xtab>Posizione</th><th class=xtab>Membri</th>\
        <th align=right class=xtab>Potere</th><th class=xtab>Diplomazia</th><th class=xtab></th></tr></thead><tbody>';
    document.getElementById('allListOut').innerHTML = m;

    for (var i=0; i<rslt.otherAlliances.length; i++) {
      var alliance = rslt.otherAlliances[i];
      var dip = '';
      dip = getDiplomacy(alliance.allianceId);

      m += '<TR class="'+ dip + '"><TD class=xtab>' + alliance.name +'</td><TD align=right class=xtab>'+ alliance.ranking +'</td><TD align=right class=xtab>'+ alliance.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(alliance.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ alliance.allianceId +')">Mostra</a></td></tr>';
    }
    m += '</tbody></TABLE><div style="font-weight:bold"; height:20px;width:560px; ><span> <a onclick="PTalClickPrev(-1)"> [Inizio] </a><a onclick="PTalClickPrev(10)"> [-10] </a><a onclick="PTalClickPrev(5)"> [-5] </a><a onclick="PTalClickPrev(1)"> [indietro] </a> \
          <a onclick="PTalClickNext(1)"> [avanti] </a><a onclick="PTalClickNext(5)"> [+5] </a><a onclick="PTalClickNext(10)"> [+10] </a><a onclick="PTalClickNext(9999)"> [Fine] </a> </span></div>';
    m += '</div>';
    document.getElementById('allListOut').innerHTML = m;
 },

  showCurrentPage : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();

    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> 10...</center>';
    if (myA[0]!=0  ) {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }
    else {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }

  },

  eventGotMemberList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.memberListRslt = rslt;
    var uList = [];
    for (k in rslt.results)
      uList.push (rslt.results[k].userId);     
    t.fetchPlayerStatus (uList, function(r){t.eventGotMemberOnlineList(r)});    
  },    
    
  eventGotMemberOnlineList : function (rslt){
    var t = Tabs.AllianceList;
    var numInvalid = 0;
    var numPlayers = 0;
    var myA = getMyAlliance ();
    t.dat = [];
    for (var i=0; i<t.memberListRslt.results.length; i++){
      p = t.memberListRslt.results[i];
      if (p.userId == 0){
        ++numInvalid;
      } else {
        ++numPlayers;
        if ( myA[0] == p.allianceId)
           t.friendEta = true;
        else
           t.friendEta = false;
        for (var c=0; c<p.cities.length; c++){
          t.dat.push ([p.displayName, parseInt(p.might), p.officerType, parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
               parseInt(p.cities[c].xCoord), parseInt(p.cities[c].yCoord), p.cities[c].cityName, 0, rslt.data[p.userId]?1:0,'NA',p.userId]);
        }
      }
    }
    t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
    t.ModelCity=Cities.cities[0];
    t.setEta();
    t.displayMembers (t.memberListRslt.allianceName, numPlayers);
  },

  // sort and display
  reDisp : function (){
    var t = Tabs.AllianceList;
    function sortFunc (a, b){
      var t = Tabs.AllianceList;
      if (typeof(a[t.sortColNum]) == 'number'){
        if (t.sortDir > 0)
          return a[t.sortColNum] - b[t.sortColNum];
        else
          return b[t.sortColNum] - a[t.sortColNum];
      } else if (typeof(a[t.sortColNum]) == 'boolean'){
// TODO !!        
return 0;        
      } else {
        if (t.sortDir > 0)
          return a[t.sortColNum].localeCompare(b[t.sortColNum]);
        else
          return b[t.sortColNum].localeCompare(a[t.sortColNum]);
      }
    }
    t.dat.sort (sortFunc);
    var m = '';
    for (var i=0; i<t.dat.length; i++){
    m += '<TR style="max-height:30px"><TD class=xxtab>'+ t.dat[i][0] +'</td><TD align=right class=xxtab>'+ addCommasInt(t.dat[i][1])
         +'</td><TD align=center class=xxtab>'+ t.dat[i][3] +'</td><TD class=xxtab>'+ t.dat[i][7] +'</td><TD class=xxtab>'+ officerId2String(t.dat[i][2]) +'</td><TD align=center class=xxtab><DIV onclick="ptGotoMap('+ t.dat[i][5] +','+ t.dat[i][6] +')"><A>'+ t.dat[i][5] +','+ t.dat[i][6] +'</a></div></td><TD class=xxtab>'+ (t.dat[i][9]?'<SPAN class=boldDarkGreen><blink>ONLINE</blink></span>':'') +'</td><td class=xxtab><SPAN onclick="PCplo(this, \''+ t.dat[i][11] +'\')"><A>Data ultimo accesso</a></span></td>\
            <TD align=right class=xxtab style="padding-right:20px;">'+ t.dat[i][8].toFixed(2) +'</td>\
      <TD  nowrap class=xxtab>'+ (t.dat[i][10]?'<SPAN>'+ (t.dat[i][10]>0?timestr(t.dat[i][10],1):'NA') +'</span>':'<SPAN>NA</span>') +'\
         <TD align=right class=xxtab>'+ t.dat[i][4] + ' </td></tr>';
    }
    var tbody = document.getElementById('allBody');
    tbody.style.maxHeight = '';
    tbody.innerHTML = m;


    if (parseInt(tbody.clientHeight) > 470){
      tbody.style.height = '470px';
      tbody.style.maxHeight = '470px';
    }
//new CtableToText('tabAllMembers').toText();
  },


  setDistances : function (x, y){
    var t = Tabs.AllianceList;
    for (var i=0; i<t.dat.length; i++)
      t.dat[i][8] = distance (x, y, t.dat[i][5], t.dat[i][6]);
  },

  friendEta:false,

  setEta : function (){
    var t = Tabs.AllianceList;
    for (var i=0; i<t.dat.length; i++) {
      if (t.dat[i][8]) {
        var eta = t.estETA(parseFloat(t.dat[i][8]));
        if (t.friendEta)
           t.dat[i][10] = eta.friendETA;
        else
           t.dat[i][10] = eta.ETA;
      }
    }
  },



  handleEtaSelect : function (){
    var t = Tabs.AllianceList;
    t.setEta();
    t.reDisp();
  },

  sortColNum : 8,
  sortDir : 1,

  displayMembers : function (allName, numPlayers){
    var t = Tabs.AllianceList;
    function alClickSort (e){
      var t = Tabs.AllianceList;
      var newColNum = e.id.substr(8);
      document.getElementById('clickCol'+t.sortColNum).className = 'clickable';
      e.className='clickable clickableSel';
      if (newColNum == t.sortColNum)
        t.sortDir *= -1;
      else
        t.sortColNum = newColNum;
      t.reDisp();
    }
    unsafeWindow.PTalClickSort = alClickSort;
    var m = '<STYLE>.clickable{background-color:#ddd; border:2px outset; border-color:#555; padding-left:5px; padding-right:5px}\
            .clickableSel{background-color:#ffffcc;}\
            .xxtab{background-color:none; padding-left:5px; padding-right:5px;} </style>\
      <DIV class=pdxStat ><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab>Alleanza: '+ allName +'</td>\
        <TD class=xtab width=80% align=center>Distanza da <SPAN id=distFrom>'+ Cities.cities[0].name +' ('+ Cities.cities[0].x +','+ Cities.cities[0].y +')</span></td><TD class=xtab align=right>Trovati: '+ numPlayers +' </td></tr></table></div>\
      <div style="max-height:470px; height:470px; overflow-y:auto;"><TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD style="overflow-y:hidden;">\
      <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Giocatore</div></a></td>\
        <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Potere</a></div></td>\
        <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Numero città</a></div></td>\
    <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>Nome città</a></div></td>\
        <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Carica</a></div></td>\
        <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coordinate</a></div></td>\
    <TD id=clickCol9 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Online</a></div></td>\
    <TD class=clickable><A><DIV>Ultimo accesso</a></div></td>\
        <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distanza</a></div></td>\
        <TD id=clickCol10 onclick="PTalClickSort(this)" class=clickable><A><DIV>Eta</a></div></td>\
     <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Livello</a></div></td>\
        </tr></thead>\
      <TBODY id=allBody style="background-color:#ffffff;"></tbody></table></div>';
      
    document.getElementById('allListOut').innerHTML = m; //style="top:670px; left:0px; position:absolute;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Distanza da: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';

    t.reDisp();
    new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
    document.getElementById('idFindETASelect').disabled = false;
  },
  
  displayPlayer : function (allName,rslt){
    var t = Tabs.AllianceList;
    function alClickSort (e){
      var t = Tabs.AllianceList;
      var newColNum = e.id.substr(8);
      document.getElementById('clickCol'+t.sortColNum).className = 'clickable';
      e.className='clickable clickableSel';
      if (newColNum == t.sortColNum)
        t.sortDir *= -1;
      else
        t.sortColNum = newColNum;
      t.reDisp();
    }
    unsafeWindow.PTalClickSort = alClickSort;
    var m = '<STYLE>.clickable{background-color:#ddd; border:2px outset; border-color:#555; padding-left:5px; padding-right:5px}\
            .clickableSel{background-color:#ffffcc;}\
            .xxtab{background-color:none; padding-left:5px; padding-right:5px;} </style>\
            <DIV class=pdxStat ><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab>Alleanza: '+ allName +'</td>\
              <TD class=xtab width=80% align=center>Ultimo accesso: <SPAN id=lastlogin>'+  rslt.playerInfo.lastLogin+'</span></td><TD class=xtab align=right></td></tr></table></div>\
      <div style="max-height:470px; height:470px; overflow-y:auto;"><TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD style="overflow-y:hidden;">\
      <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Nome giocatore</div></a></td>\
        <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Potere</a></div></td>\
        <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Numero città</a></div></td>\
         <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>Nome città</a></div></td>\
        <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Carica</a></div></td>\
        <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coordinate</a></div></td>\
    <TD id=clickCol9 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Online</a></div></td>\
    <TD class=clickable><A><DIV>Ultimo accesso</a></div></td>\
        <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distanza</a></div></td>\
        <TD id=clickCol10 onclick="PTalClickSort(this)" class=clickable><A><DIV>Eta</a></div></td>\
    <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Livello</a></div></td>\
    </tr></thead>\
      <TBODY id=allBody style="background-color:#ffffff;"></tbody></table></div>\
      <DIV  width:100%; style="top:670px; left:0px; position:absolute; background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">';
    document.getElementById('allListOut').innerHTML = m;  //style="top:670px; left:0px; position:absolute;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Distanza da: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';

    t.reDisp();
    new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
    document.getElementById('idFindETASelect').disabled = false;
  },
  
  eventCoords : function (city, x, y){
    var t = Tabs.AllianceList;
    var m = '';
    if (city != null)
      m = city.name +' ('+ city.x +','+ city.y +')';
    else
      m = x +','+ y;
    var distFrom = document.getElementById('distFrom');
    if (distFrom)
        distFrom.innerHTML = m;
    t.ModelCity=city;
    t.setDistances(x,y);
    t.setEta();
    t.reDisp();
  },

  eventGetMembers : function (aid){
    var t = Tabs.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER><b>Sto cercando dati sull\' alleanza</b></center>';
    t.fetchAllianceMemberList (aid, null, t.eventGotMemberList);
  },

  fetchAllianceMemberList : function (allianceId, allianceName, notify) {
    var t = Tabs.AllianceList;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.perPage = 100;
    if (allianceName)
      params.allianceName = allianceName;
    if (allianceId && allianceId != 0)
      params.allianceId = allianceId;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchLeaderboard : function (uid, notify) {
    var t = Tabs.AllianceList;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.userId = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchAllianceList : function (allianceName, myAid, notify) {   // at least 3 chars :)
    var t = Tabs.AllianceList;
    function combineResults (rsltA, rsltM, notify){
      if (!rsltA.ok){
        if (rsltA.msg.indexOf("No alliance found under")!=0 || !rsltM.ok){
          notify (rsltA);
          return;
        }
        rsltA.ok = true;
        rsltA.count = 0;
        rsltA.alliancesMatched = {};
      }
      if (rsltM.ok){
        rsltA.alliancesMatched['a'+rsltM.allianceInfo.allianceId] = {allianceId: rsltM.allianceInfo.allianceId, allianceName: rsltM.allianceInfo.allianceName,
              membersCount: rsltM.allianceInfo.members, relation: null, might: rsltM.allianceInfo.might, ranking: rsltM.allianceInfo.ranking};
        ++rsltA.count;
      }
      notify (rsltA);
    }
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.allianceName = allianceName;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetSearchResults.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (myAid!=null && myAid>0)
          t.fetchMyAllianceInfo  (function (r){ combineResults (rslt, r, notify)});
        else
          notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchOtherAllianceInfo : function (pageNum, notify){    // as in alliance list, sorted by rank, 10 per page
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.pageNo = pageNum;
    params.cityId = unsafeWindow.currentcityid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetOtherInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchMyAllianceInfo : function (notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchPlayerList : function (name, notify){  // at least 3 chars!!
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.searchName = name;
    params.subType = "ALLIANCE_INVITE";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/searchPlayers.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchPlayerInfo : function (uid, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.uid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
/***
ajax/getOnline.php:
  (string) ok = true
  (object) data = [object Object]
    (boolean) 4394121 = false
  (undefined) errorMsg: null = null
***/
  fetchPlayerStatus : function (uidArray, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = uidArray.join(',');
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
  fetchPlayerLastLogin : function (uid, notify){
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.pid = uid;
      new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          notify (rslt);
        },
        onFailure: function (rslt) {
          notify ({errorMsg:'AJAX error'});
        },
      });
    },
    
    gotPlayerLastLogin : function (rslt, span){
        var t = Tabs.AllianceList;
        if (!rslt.ok){
          span.innerHTML = rslt.errorMsg;
          return;
        }
    
        var p = rslt.playerInfo;
        var lastLogin = rslt.playerInfo.lastLogin;
    
        if (lastLogin) {
          m = '<span style="color:black"><b>Ultim oaccesso</b><font color=#600000> '+lastLogin+'</font></span>';
        } else {
           m = '<span style="color:red">Non sono disponibili dati sull\' ultimo accesso '+lastLogin+'</span>';
        }
        span.innerHTML = m + '';
      },

  ModelCity : {},

  estETA : function(dist) { // Need Relief Station Levels to estimate transport, reinf, or reassign times.
    var t = Tabs.AllianceList;
    var ret={ETA:0,etaStr:'NA',friendETA:0,friendEtaStr:'NA'};    
    var cityID;
    if (dist <= 0) return ret;
    var EtaType = document.getElementById('idFindETASelect');
    var baseSpeedSel = EtaType.options[EtaType.selectedIndex].value;
    var m = baseSpeedSel.split(',');
    var horse = 0;
    var baseSpeed = 0;
    if(m) {
      horse = parseInt(m[0]);
      baseSpeed = parseInt(m[1]);
    }
    if (baseSpeed == 0) return ret;
    var mmLvl = parseInt(Seed.tech.tch11);//Magical Mapping
    var Speed = 0;
    if (horse){
   //HorsesSiegeSpeed = Base * (1 + MM/10) * (1 + AH/20)
      var hsLvl = parseInt(Seed.tech.tch12);//Alloy Horse Shoes
      Speed = baseSpeed * (1 + mmLvl/10.0) * (1 + hsLvl/20.0);
    }
    else {
    //FootSpeed = Base * (1 + MM/10)
      Speed = baseSpeed * (1 + mmLvl/10.0);
    }
    //Grid Speed (tiles/second) = Speed (100ths/min) / 6000
    var gSpeed = 0;
    var estSec;
    if (Speed>0) {
      gSpeed = Speed/6000.0;//0.48333 mm=10, hs=9
      estSec = (parseFloat(dist)/gSpeed).toFixed(0);
    }
    ret.ETA = (parseInt((estSec+''))+30);
    ret.etaStr = timestr (ret.ETA,1);
    //ret.etaStr = ret.ETA + ', ' + timestr (ret.ETA,1);
    //RS - Cities Relief Station Level
    //Friendly Speed = Speed * (1 + RS/2)
    if (t.ModelCity) {
      cityID = t.ModelCity.id;
      var building = getCityBuilding (cityID, 18);
      if (building) {
        fSpeed = Speed * (1 + parseInt(building.maxLevel)/2);
        gSpeed = fSpeed/6000;
        estSec = (dist/gSpeed).toFixed(0);
        ret.friendETA = parseInt((estSec+''))+30;
        ret.friendEtaStr = timestr ((ret.friendETA+''),1);
      }
   }
    return ret;
  },
};
/*********************************** Gifts TAB ***********************************/
function explodeUrlArgs (url){
  var i = url.indexOf ('?');
  var a = url.substr(i+1).split ('&');
  var args = {};
  for (i=0; i<a.length; i++){
    var s = a[i].split ('=');
    args[s[0]] = s[1];
  }
  return args;
}

// returns: page text or null on comm error
function GM_AjaxPost (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxPost ('+ label +'): ' + url +'\n'+ inspect (args, 5, 1));
  GM_xmlhttpRequest({
    method: "post",
    url: url,
    data: implodeUrlArgs(args),
    headers: { "Content-Type": "application/x-www-form-urlencoded", 'X-Requested-With': 'XMLHttpRequest', 'X-Prototype-Version': '1.6.1',
               'Accept': 'text/javascript, text/html, application/xml, text/xml, */*' },
    onload: function (rslt) {
      if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ( 'GM_AjaxPost.onLoad ('+ label +'):\n '  + inspect (rslt, 6, 1));  
      notify (rslt.responseText);
    },
    onerror: function () {
      notify (null);
    },
  });
}

// returns: page text or null on comm error
function GM_AjaxGet (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxGet ('+ label +'): ' + url);
  GM_xmlhttpRequest({
    method: "get",
    url: addUrlArgs(url, args),
    onload: function (rslt) {
      if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ( 'GM_AjaxGet.onLoad ('+ label +')  len='+ rslt.responseText.length +':\n '  + inspect (rslt, 6, 1));  
      notify (rslt.responseText);
    },
    onerror: function () {
      notify (null);
    },
  });
}         
  
Tabs.Gifts = {
  tabLabel : 'Regali',
  tabOrder : toGeschenke,
  gifts : null,
  myDiv : null,
  doList : [], // list of gifts to accept
  doServer : 0,
  accepting : false,
    
  init : function (div){
    var t = Tabs.Gifts;
    t.myDiv = div;    
    div.innerHTML = '<TABLE cellpadding=0 cellspacing=0 class=pdxTab width=100%><TR><TD width=200></td><TD align=center><INPUT id="pasubGifts" type=submit value="Geschenke Suchen" \></td><TD width=200 align=right><INPUT id=paGiftHelp type=submit value=AIUTO></td></tr></table><HR>\
        <DIV id=giftDiv style="width:100%; min-height:300px; height:100%">';
    document.getElementById('pasubGifts').addEventListener ('click', t.e_clickedGifts, false);
    document.getElementById('paGiftHelp').addEventListener ('click', t.helpPop, false);
    if (!Options.giftDomains.valid)
      Options.giftDomains.list[getServerId()] = unsafeWindow.domainName;
  },
  
  show : function (){
        var t = Tabs.Gifts;
        mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 900 + 'px';
  },
  hide : function (){
        var t = Tabs.Gifts;
        mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 900 + 'px';
  },
  
   helpPop : function (){
  var helpText = '<BR>Klicke  auf <FONT COLOR=#550000> \'Geschenke Suchen\' </font>um die \
    Geschenke auf Facebook zu Suchen.<BR><BR>\
    Um alle zu Makieren Setze einen Hacken neben im Kasten Links neben  <FONT COLOR=#550000>\'Alle\'</font> <BR> \
    Setze den Server <FONT COLOR=#550000> \(das Gebiet auf dem du Spielst\)</font><BR><FONT COLOR=#550000>\'Löschen\'</font> -\
    <FONT COLOR=#550000>\'Immer\'</font> Löscht immer automatisch <BR>Jetzt nur noch <FONT COLOR=#550000>\'Geschenke Annehmen\'</font> Klicken und Fertig! <BR><u>ATTENZIONE:</u> Habe gedult der Bot rut jetzt <u>4</u> Webseiten auf!\
    <BR><BR>\
    <FONT COLOR=#550000><u>WICHTIG</u></font>:<UL><LI>Du kannst bis zu <FONT COLOR=#550000>100</font> Facebook Geschenke bekommen <B>alle</b> spiele zusammen!\
    Es werden nur die KoC Geschenke aufgelistet! \'Geschenke Suchen\' noch mal klicken um sicher zu gehn!!<p>\
    <LI>Wenn du Auto Löschen nicht eingestellt hast dann kann es evtl. sein das du das Geschenk noch mal annehmen kannst\
    einfach \'Geschenke Suchen\' Klicken um zu sehen ob noch Geschenke vorhanden sind!</ul>';
  var pop = new CPopup ('giftHelp', 0, 0, 500, 400, true);
  pop.centerMe (mainPop.getMainDiv());  
  pop.getMainDiv().innerHTML = helpText;
  pop.getTopDiv().innerHTML = '<CENTER><B>KoC Power Bot - Deutsch</b>: Geschenke Annehmen</center>';
  pop.show (true);
  },
  
      
  e_clickedGifts : function  (){     // (also cancel accepting)
    var t = Tabs.Gifts;
    if (t.accepting){
      document.getElementById('pasubGifts').value = 'Geschenke Suchen';
      document.getElementById('giftDiv').innerHTML+= '<BR><SPAN class=boldRed>Abgebrochen!</span>';
      t.accepting = false;
      return;
    }
    document.getElementById('giftDiv').innerHTML = 'Durchsuche die Facebook Geschenke Seite...';
    
    t.fetchGiftsPage (gotGiftsPage);
    function gotGiftsPage(rslt){
      if (rslt.errMsg){
        document.getElementById('giftDiv').innerHTML += rslt.errMsg;
        return;
      }
      t.gifts = rslt;
      if (!Options.giftDomains.valid && t.gifts.length>0){
        t.ajaxGetGiftData (t.gifts[0], listGifts, function (){});    // try to get domain list ... don't delete gift!
        return;
      }
      listGifts();
    }
    
    function listGifts (){
//logit ("LIST GIFTS");
//logit (inspect (t.gifts, 8, 1));     
      var m = '<DIV class=pdxStat><CENTER>KoC Geschenke - Gefunden: '+ t.gifts.length +' </center></div>';
      if (t.gifts.length<1){
        document.getElementById('giftDiv').innerHTML = m + '<BR><BR><CENTER>Keine Geschenke gefunden... :/</center>';
        return;
      }
      m += '<TABLE class=pdxTab align=center><TR><TD align=right>Server: </td><TD>'
        + htmlSelector (Options.giftDomains.list, getServerId(), 'id=pbGiftServers') +'</td></tr>\
          <TR><TD align=right>Löschen:</td><TD>'
        + htmlSelector ({y:'Immer', e:'Nur wenn Fehler', n:'Nie'}, Options.giftDelete, 'id=pbGiftDel')
        + '</td></tr><TR><TD></td><TD width=250><INPUT type=submit id=pbGiftDo value="Geschenk Annehmen">\
        &nbsp; <SPAN id=pbGiftNone class=boldRed></span></td></tr></table><HR><TABLE class=pdxTab><TR valign=top><TD>\
        <INPUT id=pbGiftButAll type=submit value="Alle" style="width:100%; margin-bottom:5px"><BR><INPUT id=pbGiftButNone type=submit value="Keine"></td>\
        <TD width=10></td><TD><TABLE align=center cellpadding=0 cellspacing=0 class=pdxTabLined>\
        <TBODY id=pbGiftTbody>\
        <TR style="font-weight:bold"><TD>Geschenk</td><TD>Datum</td><TD>von (server)</td><TD width=20></td></tr>';
      t.gifts.sort (function (a,b){  // sort by gift name, date
          var x = a.gift.localeCompare (b.gift);
          if (x != 0)
            return x;
          return a.args.da.localeCompare(b.args.da);
          });
      for (var i=0; i<t.gifts.length; i++){
        var giftName = t.gifts[i].gift;
        if (t.gifts[i].args.si == 9)
          giftName += ' (Daily)';
        var date = t.gifts[i].args.da.substr(0,4) +'-'+ t.gifts[i].args.da.substr(4,2) +'-'+ t.gifts[i].args.da.substr(6,2);
        m += '<TR><TD><INPUT type=checkbox id=pbgchk_'+ i +'> &nbsp;'+ giftName +'</td><TD>'+ date +'</td>\
              <TD>'+ t.gifts[i].giver +' ('+ t.gifts[i].args.exs +')</td></tr>';
      }
      document.getElementById('giftDiv').innerHTML = m + '</tbody></table></td></tr></table>';
      document.getElementById('pbGiftDo').addEventListener ('click', t.getErDone, false);
      document.getElementById('pbGiftButAll').addEventListener ('click', t.e_butAll, false);
      document.getElementById('pbGiftButNone').addEventListener ('click', t.e_butNone, false);
      var tbody = document.getElementById('pbGiftTbody');
      tbodyScroller (tbody, getRemainingHeight (tbody, mainPop.div));
    }
  },

  e_butAll : function (){
    var t = Tabs.Gifts;
    for (var i=0; i<t.gifts.length; i++)
      document.getElementById('pbgchk_'+i).checked = true;
  },
  
  e_butNone : function (){
    var t = Tabs.Gifts;
    for (var i=0; i<t.gifts.length; i++)
      document.getElementById('pbgchk_'+i).checked = false;
  },
  
  getErDone : function (){
    var t = Tabs.Gifts;
    t.doList = [];
    document.getElementById('pbGiftNone').innerHTML = '';
    Options.giftDelete = document.getElementById('pbGiftDel').value;
    for (var i=0; i<t.gifts.length; i++){
      if (document.getElementById('pbgchk_'+i).checked)
        t.doList.push (t.gifts[i]);
    }
    if (t.doList.length==0){
      document.getElementById('pbGiftNone').innerHTML = 'Keine Geschenke Ausgewählt!';
      return;
    }
    t.doServer = document.getElementById('pbGiftServers').value;
    t.accepting = true;
    document.getElementById('pasubGifts').value = 'Annehmen Abbrechen';
    document.getElementById('giftDiv').innerHTML = '<DIV id=acpDiv style="height:400px; max-height:400px; overflow-y:auto"><B>Es werden '+ t.doList.length +' Geschenk(e) Angenommen!</b><BR></div>';    
    t.acceptNext ();
  },

    
  allDone : function (msg){
    var t = Tabs.Gifts;
    document.getElementById('acpDiv').innerHTML += '<BR><BR>' + msg;
    document.getElementById('pasubGifts').value = 'Geschenke Suchen';
    t.accepting = false;
  },
  
    
  acceptNext : function (){
    var t = Tabs.Gifts;
    var gift = t.doList.shift();
    if (gift == null){
      t.allDone ('Alle Geschenke erfolgreich Hinzugefügt/Gelöscht!');
      return;
    }
    var acpDiv = document.getElementById('acpDiv');
    var curDiv = document.createElement ('div');
    acpDiv.appendChild (curDiv);
    curDiv.innerHTML = '<B>'+ gift.gift +'</b> von '+ gift.giver +' am '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2) +': ';    
    var statSpan = document.createElement ('span');
    curDiv.appendChild (statSpan);
    statSpan.innerHTML = 'Suche Daten... ';
    t.ajaxGetGiftData (gift, gotGiftData, progress);
    
    function progress (m){
      if (t.accepting)
        statSpan.innerHTML += ' '+m;
    }
        
    function gotGiftData (rslt){
//logit ("getErDone.gotGiftData ... \n"+ inspect (gift, 8, 1));
      if (!t.accepting)
        return;
      if (rslt.ok){
        statSpan.innerHTML += ' &nbsp; Annehmen .';
        t.ajaxAcceptGift (gift, t.doServer, doneAccepting);
        return;
      }
        
      if (rslt.feedback)
        msg = '<B>'+ rslt.feedback + '</b>';
      else
        msg = '<SPAN class=boldRed>ERROR: '+ rslt.ajaxErr +'</span>';
      if (rslt.del && Options.giftDelete!='n'){
        t.deleteGift (gift);  
        msg += ' Geschenk Gelöscht!';
      }
      curDiv.removeChild (statSpan);
      curDiv = document.createElement ('div');
      curDiv.className = 'indent25';
      acpDiv.appendChild (curDiv);
      curDiv.innerHTML = msg;
      t.acceptNext ();  
    }
    
    function doneAccepting (rslt){
      if (!t.accepting)
        return;
      var msg = 'OK.';
      if (rslt.ok)
        actionLog ('Geschenk Angenommen:  '+ gift.gift +' von '+ gift.giver +' am '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2)     );
      else
        msg = '<SPAN class=boldRed>'+ rslt.msg +'</span>';
      statSpan.innerHTML = msg;
      if (Options.giftDelete=='y'){
        statSpan.innerHTML += ' &nbsp; Gelöscht!';
        t.deleteGift (gift);      
      }
      t.acceptNext ();  
    }
  },

    

  ajaxAcceptGift : function (gift, serverId, notify){
    var url;
    var pargs = {};
        
    if (gift.dat.ver == 1){
      url = gift.dat.url;
      pargs.giftId = gift.dat.giftId;
      pargs.hasExistingServer = 1;
      pargs.serverid = serverId;
      pargs.go = 'Next';
      GM_AjaxPost (url, pargs, ver1GotPost, 'Annehmen');
    } else {
      var i = gift.dat.url.indexOf('src/');
      url = gift.dat.url.substr(0,i) +'src/ajax/claimgift.php?wcfbuid='+ gift.dat.wcfbuid;        
      pargs = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      pargs.fb_sig_ext_perms = unescape(pargs.fb_sig_ext_perms);
      pargs.ver = '2';
      pargs.selectedS = serverId;
      pargs.giftinviteid = gift.dat.giftId;
      GM_AjaxPost (url, pargs, ver2GotPost, 'Annehmen');
     }
     
//  parse multiple reply formats .....         
    function ver1GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:"AJAX Error"});
        return;
      }
      var m = /<div class=\'nm\'>(.*?)<\/div/im.exec(rslt);
      if (m)
        notify ({ok:false, msg: 'Erhalten: '+ m[1]});
      else
        notify ({ok:true, msg:'OK'});
    }
    function ver2GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:"AJAX Error"});
        return;
      }
      rslt = eval ('('+ rslt +')');
      if (rslt.ok)
        rslt.msg = 'OK';
      notify (rslt);
    }
  },

      
  deleteGift : function (gift){
    var pargs = {};
//logit ("DELETING GIFT!");    
    for (var i=0; i<gift.inputs.length; i++){
//      if (gift.inputs[i].name != 'actions[reject]')
        pargs[gift.inputs[i].name] = gift.inputs[i].value;
    }
    GM_AjaxPost ('http://www.facebook.com/ajax/reqs.php?__a=1', pargs, gotAjaxPost, 'Verbergen');
    function gotAjaxPost (p){
    }
  },

    
// get 3 pages ... facebook convert page, facebook claim page and first KofC page (for gift ID) ...
// adds: dat.url, dat.giftId and dat.ver to gift object (if available)
// notify: {ok:true/false,  feedback:,  ajaxErr:  }    
  ajaxGetGiftData : function (gift, notify, progress, DELETE){
    var t = Tabs.Gifts;
    gift.dat = {};
    GM_AjaxGet (gift.submit, null, got1, 'Seite 1');        
        
    function got1 (page){
// sample URL: http://apps.facebook.com/kingdomsofcamelot/?page=claimdailygift&gid=361&sid=4411654&s=88&in=4411654&si=9      
// sample result: .... window.location.replace("http:\/\/apps.facebook.com\/kingdomsofcamelot\/?page=claimgift&gid=1045&sid=1432568&s=250&in=1432568&si=5"); ...
      if (page == null)
        notify ({ajaxErr:'COMM Fehler - Seite 1'});
      progress ('1');
      var m = page.match (/form action=\\"(.*?)\\"/im);
      if (m == null)
        notify ({ajaxErr:'PARSE Fehler - Seite 1'});
    var url = m[1].htmlSpecialCharsDecode();
      url = unescape(url);
        url = url.replace ('\\/', '/', 'g');
    url = url.replace (/\\u00253A/g, ':');
    url = url.replace (/\\u00257C/g, '|');
    var signed_request = /signed_request\\" value=\\"(.*?)\\"/im.exec (page);
    var opts = [];
    opts.signed_request = signed_request[1];
      GM_AjaxPost (url, opts, got2, 'Seite 2');        
    }
  
  function got2 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Fehler - Seite 2'});
      progress ('2');
      var m = /top.location.href = \"(.*?)\"/im.exec (page);
      if (m == null)
        notify ({ajaxErr:'PARSE Fehler - Seite 2'});
    var url = m[1].htmlSpecialCharsDecode();
      GM_AjaxGet (url, '', got3, 'Seite 3');        
    }
    
// sample URL: http://www88.kingdomsofcamelot.com/fb/e2/src/claimDailyGift_src.php?sid=4411654&gid=361&standalone=0&res=1&iframe=1&wcfbuid=1400526627&fbml_sessionkey=2.wdwjP4blBLkO2wXAFqDglg__.3600.1293681600-1400526627&lang=en&in=4411654&si=9&ts=1293677199.881&page=claimdailygift&gid=361&sid=4411654&s=88&in=4411654&si=9&appBar=&kabamuid=114014&tpuid=alYJXw-Us9z9qjRn3DHChEtsFvo&fb_sig_in_iframe=1&fb_sig_base_domain=kingdomsofcamelot.com&fb_sig_locale=en_GB&fb_sig_in_new_facebook=1&fb_sig_time=1293677199.924&fb_sig_added=1&fb_sig_profile_update_time=1267240352&fb_sig_expires=1293681600&fb_sig_user=1400526627&fb_sig_session_key=2.wdwjP4blBLkO2wXAFqDglg__.3600.1293681600-1400526627&fb_sig_ss=7wEsU_e0FLqhrGxE1LAZDg__&fb_sig_cookie_sig=514b59deb303becb5c5c654c9d457732&fb_sig_ext_perms=email%2Cuser_birthday%2Cuser_religion_politics%2Cuser_relationships%2Cuser_relationship_details%2Cuser_hometown%2Cuser_location%2Cuser_likes%2Cuser_activities%2Cuser_interests%2Cuser_education_history%2Cuser_work_history%2Cuser_online_presence%2Cuser_website%2Cuser_groups%2Cuser_events%2Cuser_photos%2Cuser_videos%2Cuser_photo_video_tags%2Cuser_notes%2Cuser_about_me%2Cuser_status%2Cfriends_birthday%2Cfriends_religion_politics%2Cfriends_relationships%2Cfriends_relationship_details%2Cfriends_hometown%2Cfriends_location%2Cfriends_likes%2Cfriends_activities%2Cfriends_interests%2Cfriends_education_history%2Cfriends_work_history%2Cfriends_online_presence%2Cfriends_website%2Cfriends_groups%2Cfriends_events%2Cfriends_photos%2Cfriends_videos%2Cfriends_photo_video_tags%2Cfriends_notes%2Cfriends_about_me%2Cfriends_status&fb_sig_country=us&fb_sig_api_key=0ab5e11ff842ddbdbf51ed7938650b3f&fb_sig_app_id=130402594779&fb_sig=fca33813d9e1c9d411f0ddd04cf5d014
    function got3 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Fehler - Seite 3'});
      progress ('3');
    var m = page.match (/form action=\\"(.*?)\\"/im);
      if (m == null)
        notify ({ajaxErr:'PARSE Fehler - Seite 3'});
      var url = m[1].htmlSpecialCharsDecode();
    url = unescape(url);
    url = url.replace ('\\/', '/', 'g');
    var signed_request = /signed_request\\" value=\\"(.*?)\\"/im.exec (page);
    var opts = [];
    opts.signed_request = signed_request[1];
      GM_AjaxPost (url, opts, got4, 'Seite 4');        
    }
  
  function got4 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Fehler - Seite 4'});
      progress ('4');
    
    var m = page.match (/src='(.*?)'/im);
      if (m == null)
        notify ({ajaxErr:'PARSE Fehler - Seite 4'});
      var url = m[1].htmlSpecialCharsDecode();
      url = url.replace (/lang=.*?&/, 'lang=de&');  
    url = url.replace ('\\/', '/', 'g');  
    url = url.replace ('&amp;', '&', 'g');
    url = url.replace ('" + (new Date()).getTime() + "', (new Date()).getTime());
      gift.dat.url = url;
      GM_AjaxGet (url, opts, got5, 'Page 5');        
    }
    
    function got5 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Fehler - Seite 5'});
      progress ('5');
      var m = /<div class=\'giftreturned\'>(.*?)<\/div/im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true});
        return;
      }
      var m = /(Wir konnten dein Geschenk nicht finden.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true});
        return;
      }
      var m = /(Unable to get the list of your friends.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1]});
        return;
      }
      var m = /(Facebook sagt, dass ihr keine Freunde seid.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true});
        return;
      }
            
      var regexp = /<option value='(.*?)'.*?>(.*?)</img ;
      var m;
      while ( (m = regexp.exec (page)) != null){
        if (m[1] != 'noserver')
          Options.giftDomains.list[m[1]] = m[2];  
      }
      Options.giftDomains.valid = true;
      if (page.indexOf('ver:2') >= 0){
        m = /giftinviteid:(.*?),/im.exec(page);
        if (m == null)
          notify ({ajaxErr:'PARSE Fehler (ver:2, Geschenk invite ID nicht gefunden!) - Seite 5'});
        gift.dat.giftId = m[1];
        gift.dat.ver = 2;
/** for KofC change 20110119
        m = /wcfbuid=([0-9]*)/im.exec(page);
        if (m == null){
          notify ({ajaxErr:'PARSE Error (ver:2, wcfbuid not found) - page 5'});
          return;
        }
        gift.dat.wcfbuid = m[1];
**/        
      } else {
        m = /name='giftId' value='(.*?)'/im.exec(page);
        if (m == null){
          notify ({ajaxErr:'PARSE Fehler (ver:1, GeschenkID nicht gefunden!) - Seite 5'});
          return;
        }
        gift.dat.giftId = m[1];
        gift.dat.ver = 1;
      }
      notify ({ok:true});
    }
  },

  
  // notify with gifts[] or: {errMsg:xxx}
  fetchGiftsPage : function (notify){
    GM_AjaxGet ('http://www.facebook.com/games?ap=1', '', parseGiftsPage, 'FB Geschenke Seite');
    
    // ...profile.php?id=100000710937192">Anestis Mallos</
    // Here is a GIFTNAME you can use
    // OR:  ... would like to give you a gift of GIFTNAME in Kingdoms of Camelot
    // OR:  ... would like to give you a GIFTNAME in Kingdoms of Camelot
    // <input value=\"Accept\" type=\"submit\" name=\"actions[http:\/\/apps.facebook.com\/kingdomsofcamelot\/convert.php?pl=1&in=4411654&ty=1&si=9&wccc=fcf-inv-9&ln=11&da=20101229&ex=gid%3A361%7Csid%3A4411654%7Cs%3A88]\" \/><\/label>
    function parseGiftsPage  (p){
      if (p == null)
        notify ({errMsg:'Ajax Comm Error'});
      p = p.replace ('\\u003c', '<', 'g');    
      var t = Tabs.Gifts;
      var gifts = [];
      try {    
        var m = p.split ('<form');  
        for (var i=0; i<m.length; i++){
          if ( m[i].indexOf('kingdomsofcamelot')<0)
            continue;
      var mm = m[i].match( /facebook.com\\\/.*\">(.*?)<\\\/a><\\\/span>.*?(?:machen: (.*?). Beeil)/im );
      if (mm==null)
            mm = m[i].match( /facebook.com\\\/.*\">(.*?)<\\\/span><\\\/span><\\\/a>.*?(?:machen: (.*?). Beeil)/im );
          if (mm==null)
            continue;
          var giver = mm[1];
          if (mm[2])
            var gift = mm[2].trim();
          else
            var gift = mm[3].trim();
            
          // get all inputs ...  (name, value, type)          
          var inps = [];
          var args = {};  
          var inpsub = null;            
          var ins = m[i].match (/<input.*?>/igm);
          for (var ii=0; ii<ins.length; ii++){
            var it = {};
            mm = /value=\\\"(.*?)\\\"/im.exec(ins[ii]);  
            it.value = mm[1];
            mm = /name=\\\"(.*?)\\\"/im.exec(ins[ii]);  
            it.name = mm[1];
            mm = /type=\\\"(.*?)\\\"/im.exec(ins[ii]);  
            it.type = mm[1];
            if (it.type=='submit' && it.name!='actions[reject]'){
              it.name = eval ('"'+ it.name +'"');          
              mm = /actions\[(.*?)\]/im.exec(it.name);
              inpsub = mm[1].replace('\\/', '/', 'g');
              inpsub = inpsub.replace('&amp;', '&', 'g');
              var a = inpsub.split ('&');
              for (var iii=0; iii<a.length; iii++){
                var aa = a[iii].split ('=');
                if (aa[0]=='da' || aa[0]=='si'){
                  args[aa[0]] = unescape(aa[1]);
                } else if (aa[0] == 'ex') {
                  var s = unescape(aa[1]).split ('|');
                  for (var iiii=0; iiii<s.length; iiii++){
                    var ss = s[iiii].split(':');
                    if (ss[0] == 's')
                      args.exs = ss[1];
                  }
                }
              }
            } else {
              inps.push (it);
            }
          }
          if (args.da)
            gifts.push ({giver:giver, gift:gift, args:args, submit:inpsub, inputs:inps});
        }
        notify (gifts);
      } catch (e) {
        notify ({errMsg:"Fehler beim parsing der Facebook Geschenke Seite"+ e});
      }
    }
  },
}

/*************** RITTER TAB *********************/
Tabs.Ritter = {
  tabLabel : 'Cavalieri',
  tabOrder : toRitter,
  cont : null,
  displayTimer : null,

  init : function (div){
    var t = Tabs.Ritter;
    t.cont = div;
    unsafeWindow.ptAssignSkill = t.clickedAssignPoints;
    t.cont.innerHTML = '<STYLE>table.pdxTab2Pad tr.ptwpad {background-color:#ffffff; padding-left:15px}</style>\
       <DIV id=ptknightdiv style="max-height:660px; height:660px; overflow-y:auto">';
  },

  hide : function (){
    var t = Tabs.Ritter;
    clearTimeout (t.displayTimer);
     mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
  },

  show : function (){
    var t = Tabs.Ritter;
    clearTimeout (t.displayTimer);
       mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
    function _dispKnight (roleId, knight){
      var rid = roleId;
      if (roleId==null)
        rid = 1;
      var sty='';  
      if (row++ % 2)
        sty = 'class=ptOddrow ';        
      m = '<TR '+ sty +'valign=top align=right><TD><B>'+ (roleId==null ? '':knightRoles[rid][0]) +'</b></td><TD align=left>';
      if (knight == null) {
        m += 'Niemand Eingestellt</td><TD colspan=4></td><TD class=pdxEntry colspan=5></td><TD colspan=2></td></tr>';
      } else {
        var level = parseInt(Math.sqrt(parseInt(knight.experience) / 75)) + 1;
        var unpoints = level - parseInt(knight.skillPointsApplied);
        var salary = (parseInt(knight.skillPointsApplied) + 1) * 20;
        totSalary += salary;
        var ass = '';
        if (knight.knightStatus == 10){
          ass = '<TD class=pdxEntry align=left colspan=4>Maschieren</td>';
        } else {  
          if (unpoints > 0){
            unpoints = '<SPAN class="boldRed">'+ unpoints +'</span>';
          for (var i=0; i<4; i++){
            var sty = 'padding-left:1px;';
            if (i == rid)   // bold it
              sty += 'font-weight:bold;color:#116654';
            ass += '<TD class=pdxEntry align=left style="'+ sty +'" ><A style="'+ sty +'" onclick="ptAssignSkill(this,' + cid +','+ knight.knightId +','+ i +')">['+ knightRoles[i][2] +'] &nbsp;</a></td>';
          }
          }
          else
            ass = '<TD class=pdxEntry colspan=4></td>';
        }  
        var skills = [];
        for (var i=0; i<4; i++){
          if (i == rid)
            skills[i] = '<B>'+ knight[knightRoles[i][1]] +'</b>';
          else
            skills[i] = knight[knightRoles[i][1]];
        }          
        m += knight.knightName + '</td><TD>'+ skills[0] +'</td><TD>'+ skills[1] +'</td><TD>'+ skills[2] +'</td><TD>' + skills[3]
          +'</td><TD class=pdxEntry>'+ unpoints +'</td>'+ ass +'<TD>'+ addCommas(salary)
          +'</td><TD>'+ level +'</td></tr>';
      }
      return m;
    }          
    
    var totSalary = 0;
    var m = '<TABLE cellspacing=0 align=center class=pdxTab2Pad><TBODY>';
    for (var c=0; c<Cities.numCities; c++) {
      var cid = Cities.cities[c].id;
      m += '<TR><TD colspan=13><DIV class=pdxStat>'+ Cities.cities[c].name +'</div></td></tr>\
          <TR class=ptwpad style="font-weight:bold" align=right><TD width=70>Rolle</td><TD width=160 align=center>Name</td><TD width=26>Politik</td><TD width=26>Schlacht</td>\
          <TD width=26>Int.</td><TD width=26>Ressis</td><TD width=90 align=center colspan=5>-= Ritter Punkte =-</td><TD width=40 align=right> Kosten </td><TD width=35>Level</td></tr>';
      totSalary = 0;
      var did = {};
      var row = 0;
      for (var i=0; i<knightRoles.length; i++){
        var leader = Seed.leaders['city'+cid][knightRoles[i][1]+'KnightId'];
        if (leader == 0)
          m += _dispKnight (i, null);
        else {
          m += _dispKnight (i, Seed.knights['city'+cid]['knt'+leader]);
          did['knt'+leader] = true;
        }
      }
      var list = [];
      for (k in Seed.knights['city'+cid]){
        if (!did[k])
          list.push (Seed.knights['city'+cid][k]);
      }
      list.sort (function (a,b){return parseInt(b.combat)-parseInt(a.combat)});
      for (i=0; i<list.length; i++)
        m += _dispKnight (null, list[i]);
      m += '<TR align=right><TD colspan=11><B>Gesamt Kosten:</b></td><TD>'+ addCommas(totSalary) +'</td></tr>';        
    }
    document.getElementById('ptknightdiv').innerHTML = m +'</tbody></table></div>';
    t.displayTimer = setTimeout (t.show, 10000);
  },


  clickedAssignPoints : function (e, cid, kid, rid){
    var t = Tabs.Ritter;
    clearTimeout (t.displayTimer);
      
    var knight = Seed.knights['city'+cid]['knt'+kid];
    if (knight.knightStatus == 10){

      var row = e.parentNode.parentNode;
      row.childNodes[7].innerHTML = 'Maschieren';
      return;
    }
    sk = [];
    var unassigned = parseInt(Math.sqrt(parseInt(knight.experience)/75)) + 1  - parseInt(knight.skillPointsApplied);        
    for (var i=0; i<4; i++){
      sk[i] = parseInt(knight[knightRoles[i][1]]);
      if (i == rid)
        sk[i] += unassigned;
    }
    var row = e.parentNode.parentNode;
    for (i=row.cells.length-1; i>=1; i--)
      row.deleteCell (i);
    var newCell=row.insertCell(-1);
    newCell.colSpan = 12;
    newCell.align= 'left';
    newCell.style.padding='1px 5px 1px 10px';
    var div = document.createElement ('div');
    div.style.backgroundColor = '#ffffff';
    div.style.textAlign = 'center';
    div.style.border = '1px solid';
    div.style.width = '98%';
    div.style.whiteSpace = 'normal';
    newCell.appendChild (div);
    div.innerHTML = ' '+ unassigned +' skill punkte(e) auf '+ knightRoles[rid][1] +' verteilt... ';
    t.postSkillPoints (cid, kid, sk[0], sk[1], sk[2], sk[3], function (r){t.postDone(r, div)});  
  },
  
  postDone : function (rslt, div){
    var t = Tabs.Ritter;
    clearTimeout (t.displayTimer);
    if (rslt.ok){
      div.innerHTML += '<B>Fatto.</b>';
      t.displayTimer = setTimeout (t.show, 5000);
    } else {
      div.innerHTML += '<BR><SPAN class=boldRed>ERROR: '+ rslt.errorMsg +'</span>';
      t.displayTimer = setTimeout (t.show, 10000);
    }
  },
  
  postSkillPoints : function (cid, kid, pol, com, int, res, notify){  
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = cid;
    params.kid = kid;
    params.p = pol;
    params.c = com;
    params.i = int;
    params.r = res;
    if (DISABLE_POST_KNIGHT_SKILLS){   
      setTimeout (function (){notify({ok:true})}, 1500);    
//      setTimeout (  function (){notify({ok:false, errorMsg:"FAKE ERROR message, a long one, to test how it will fit and overflow! Perhaps you'll need to retry?"})}  , 2000);    

      return;  
    }
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/skillupKnight.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok) {
          var knight = Seed.knights["city" + cid]["knt" + kid];
          var up = pol + com + int + res - knight.politics - knight.combat - knight.intelligence - knight.resourcefulness;
          knight.politics = pol;
          knight.combat = com;
          knight.intelligence = int;
          knight.resourcefulness = res;
          knight.skillPointsApplied = (parseInt(knight.skillPointsApplied) + up).toString();
        }
        if (notify)
          notify (rslt);
      },
      onFailure: function () {
        if (notify)
          notify (rslt);
      },
    });
  },
};
/**************/

var messageNav = {
  mmFunc : null,
  mmsFunc : null,
  
  init : function (){
    t = messageNav;
    t.mmFunc = new CalterUwFunc ('modal_messages', [[/}\s*$/, 'setTimeout(messageNav_hook,0); }']]);
    t.mmsFunc = new CalterUwFunc ('modal_messages_send', [[/{\s*var params/i, '{\nif (modal_messages_send_hook()) return;\nvar params']]);
    unsafeWindow.messageNav_hook = messageNav.hook;
    unsafeWindow.modal_messages_send_hook = messageNav.msgSendHook;
    t.mmFunc.setEnable (true);
    t.mmsFunc.setEnable (true);
  },

  setEnable : function (tf){
  },

  isAvailable : function (){
    t = messageNav;
    return t.mmFunc.isAvailable();
  },
  
  hook : function (){
    if (!Options.enhanceMsging)
      return;
    var div = document.getElementById('modal_msg_view_actions');
    var but = makeButton20('Weiterleiten');
    div.appendChild (but);
    but.addEventListener ('click', messageNav.eventForward, false);
    div = document.getElementById('modal_msg_write_to').parentNode;
    div.innerHTML = '<TABLE><TR><TD class=xtab><b>An:</b> <INPUT type=text id=modal_msg_write_to></td><TD class=xtab><SPAN id=ptfwdbut></span></td></tr></table>';
    var button = makeButton20('Alle Offiziere');
    document.getElementById('ptfwdbut').appendChild (button);
    button.addEventListener ('click', function (){document.getElementById("modal_msg_write_to").value = "<officers>"}, false);
  },

  eventForward : function (){
    document.getElementById('modal_msg_write_subj').value = "WEITERLEITUNG: " + document.getElementById('modal_msg_view_subj').innerHTML.toString().stripTags();
    document.getElementById('modal_msg_write_to').value = '';
    var from = document.getElementById('modal_msg_view_from').children[0].innerHTML;
    var body = document.getElementById('modal_msg_view_body').innerHTML.replace(/\n/g, '').replace(/<br>/gi, '\n').stripTags().replace (/back$/i, '');
    document.getElementById('modal_msg_write_txt').value = '[Original Nachricht von '+ from +' :]\n'+ body;
    unsafeWindow.modal_messages_compose();
  },

  msgSendHook : function (){
    if (!Options.enhanceMsging)
      return;
    var to = document.getElementById("modal_msg_write_to").value.trim();
    if (to.toLowerCase() != '<officers>' || getMyAlliance()[0]==0)
      return false;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.toIds = getMyAlliance()[0];
    params.subject = document.getElementById("modal_msg_write_subj").value +' [Leader Mail]';
    params.message = document.getElementById("modal_msg_write_txt").value;
    params.type = 'alliance';
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendMessage.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
            if (rslt.ok) {
                unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.msgsent);
                document.getElementById('modal_msg_write_to').value = "";
                document.getElementById('modal_msg_write_subj').value = "";
                document.getElementById('modal_msg_write_txt').value = ""
            } else {
                unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.enterexistingname)
            }
        },
        onFailure: function () {
          unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.oopscompose)
        },
    });
    return true;
  },
}


var AttackDialog = {
  init : function (){
    var t = AttackDialog;
    t.modal_attackFunc = new CalterUwFunc ('modal_attack', [[/}\s*$/, 'attackDialog_hook(); }']]);
    unsafeWindow.attackDialog_hook = t.modalAttackHook;
    t.modal_attackFunc.setEnable (true);
  },
  
  setEnable : function (){
  },

  isKnightSelectAvailable : function (){
    var t = AttackDialog;
    return t.modal_attackFunc.isAvailable();
  },
  isAttackCityPickerAvailable : function (){
    var t = AttackDialog;
    return t.modal_attackFunc.isAvailable();
  },
    
  modalAttackHook : function (){
    var t = AttackDialog;
    if (Options.fixKnightSelect || Options.attackCityPicker){
      for (var i=1; i<6; i++)
        document.getElementById('modal_attack_tab_'+ i).addEventListener('click', t.e_changeMarchType, false);
    }
    if (Options.attackCityPicker){
      setTimeout (t.initCityPicker, 0);
    }      
  },
  
  initCityPicker : function (){
    var t = AttackDialog;
    var div = document.getElementById('modal_attack_target_numflag'); // as of KofC version 96;
    var mySpan;
    if (div) {
      div.parentNode.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
    } else {
      var span = document.getElementById('modal_attack_target_coords');   // KofC version 116+;
      span.parentNode.parentNode.firstChild.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
    }
    new CdispCityPicker ('ptatp', document.getElementById('modal_attack_citybuts'), false, t.e_CityButton);
    var cityIdx = Cities.byID[unsafeWindow.currentcityid].idx;
    thisCityBut = document.getElementById('ptatp_'+ cityIdx);
    thisCityBut.style.opacity = '0.5';
    thisCityBut.disabled = true;
    if (document.getElementById('modal_attack_tab_4').className=='selected' || document.getElementById('modal_attack_tab_3').className=='selected')   // don't do for attack or scout
      document.getElementById('modal_attack_citybuts').style.display = 'none';
  },
  
  e_CityButton : function (city){
    document.getElementById('modal_attack_target_coords_x').value = city.x;
    document.getElementById('modal_attack_target_coords_y').value = city.y;
    unsafeWindow.modal_attack_update_time();
  },
      
  e_changeMarchType : function (evt){
    var t = AttackDialog;
    var marchType = parseInt(evt.target.id.substr(17));  
    if (Options.attackCityPicker){
      if (marchType==3 || marchType==4)
        document.getElementById('modal_attack_citybuts').style.display = 'none';
      else
        document.getElementById('modal_attack_citybuts').style.display = 'inline';
    }
    if (Options.fixKnightSelect){
      var knightVal = 0;
      var selector = document.getElementById('modal_attack_knight');
      if (selector.length>1 && (marchType==4 || marchType==2))   // if 'attack' or 'reinforce'
        knightVal = 1;
      selector.selectedIndex = knightVal;
    }
  },  
}


var AllianceReports = {
  checkPeriod : 300,
  allianceNames : [],
  saveArfunc : unsafeWindow.allianceReports,

  init : function (){
    t = AllianceReports;
    t.enable (Options.enhanceARpts);
    t.marvFunc = new CalterUwFunc ('modal_alliance_report_view', [['getReportDisplay', 'getReportDisplay_hook2']]);
    unsafeWindow.getReportDisplay_hook2 = t.getReportDisplayHook;
    t.marvFunc.setEnable (true);
  },
   
  getReportDisplayHook : function (a, b){
    var x = '';
    try {
      x = unsafeWindow.getReportDisplay(a,b);  
    } catch (e){
      x = 'Error formatting report: '+ e;
    }
    return x;
  },
  
  enable : function (tf){
    t = AllianceReports;
    if (tf)
      unsafeWindow.allianceReports = t.myAllianceReports;
    else
      unsafeWindow.allianceReports = t.saveArfunc;
  },
  
  myAllianceReports : function (pageNum){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    if (pageNum)
      params.pageNo = pageNum;
    params.group = "a";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
//logit (inspect (rslt, 1, 1));        
        displayReports (rslt.arReports, rslt.arPlayerNames, rslt.arAllianceNames, rslt.arCityNames, rslt.totalPages);
      },
      onFailure: function (rslt) {
      },
    }, false);

    function displayReports (ar, playerNames, allianceNames, cityNames, totalPages){
      var msg = new Array();
      var myAllianceId = getMyAlliance()[0];
      msg.push ("<STYLE>.msgviewtable tbody .myCol div {margin-left:5px; overflow:hidden; white-space:nowrap; color:#000}\
            .msgviewtable tbody .myFeindlich div {font-weight:600; color:#600}\
            .msgviewtable tbody .myGray div {color:#666}\
            .msgviewtable tbody .myRein div {color:#050}\
            .msgviewtable tbody .myWarn div {font-weight:600; color:#442200}\
            </style>");
      msg.push("<div class='modal_msg_reports'>");
      var rptkeys = unsafeWindow.Object.keys(ar);
      if (matTypeof(ar) != 'array') {
//logit ('displayReports: '+ Options.allowAlterAR);        
        if (Options.allowAlterAR)
          msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        else
          msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        msg.push("<thead><tr><td width=105>Datum</td><td width=40>Typ</td><td width=150>Angreifer</td><td>Ziel</td><td>Anzeigen</td></tr></thead><tbody>");
        for (var i = 0; i < rptkeys.length; i++) {
          var rpt = ar[rptkeys[i]];
          var colClass = '"myCol"';
          rpt.marchType = parseInt(rpt.marchType);
          rpt.side0AllianceId = parseInt(rpt.side0AllianceId);
          var targetDiplomacy = getDiplomacy (rpt.side0AllianceId);
          if (rpt.marchType == 2){
            colClass = '"myCol myRein"';
          } else if (rpt.side1AllianceId != myAllianceId){
            colClass = '"myCol myFeindlich"';
          } else {
            if (parseInt(rpt.side0TileType) < 50){          // if wild
              if (parseInt(rpt.side0PlayerId) == 0)
                colClass = '"myCol myGray"';
              else
                colClass = '"myCol myWarn"';
            } else if (parseInt(rpt.side0PlayerId) == 0) {   // barb
              colClass = '"myCol myGray"';
            } else {
              if (targetDiplomacy == 'friendly')
                colClass = '"myCol myWarn"';
            }
          }
//logit (inspect (ar, 3, 1));
          msg.push ('<tr valign=top');
          if (i%2 == 0)
            msg.push(" class=stripe");
          msg.push("><TD class="+ colClass +"><div>");
          msg.push(formatUnixTime(rpt.reportUnixTime));
          msg.push(unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime));
          msg.push ('<BR>Rpt #');
          msg.push (rpt.reportId);          
          msg.push("</div></td><TD class="+ colClass  +"><div>");
          if (rpt.marchType == 1)
            msg.push (unsafeWindow.g_js_strings.commonstr.transport);
          else if (rpt.marchType == 3)
            msg.push (unsafeWindow.g_js_strings.commonstr.scout);
          else if (rpt.marchType == 2)
            msg.push ('Verst.');
          else
            msg.push (unsafeWindow.g_js_strings.commonstr.attack);

          // attacker ...
          msg.push ("</div></td><TD class="+ colClass +"><div>");
          if (parseInt(rpt.side1PlayerId) != 0)
            msg.push(escape(playerNames["p" + rpt.side1PlayerId]))
          else
            msg.push ('?Unknown?');
            msg.push (' ');
            msg.push (coordLink(rpt.side1XCoord, rpt.side1YCoord));
            msg.push ('<BR>');
          
          if (rpt.side1AllianceId != myAllianceId){
            msg.push (allianceNames['a'+rpt.side1AllianceId]);
            msg.push (' (');
            msg.push (getDiplomacy(rpt.side1AllianceId));
            msg.push (')');
          } else {
            msg.push ('<BR>');
          }
          msg.push ('</div></td>');

          // target ...
          msg.push ("<TD class="+ colClass  +"><DIV>");
          var type = parseInt(rpt.side0TileType);

          if (type < 50){                              // wild
            msg.push(unsafeWindow.g_mapObject.types[type].toString().capitalize());
            msg.push(" Lvl " + rpt.side0TileLevel)
            if (parseInt(rpt.side0PlayerId) != 0) {   // IF OWNED, show owner ...
              msg.push (' [');
              msg.push (escape(playerNames["p" + rpt.side0PlayerId]));
              msg.push ('] ');
            }
          } else {
            if (parseInt(rpt.side0PlayerId) == 0) {   //  barb
              msg.push(unsafeWindow.g_js_strings.commonstr.barbariancamp);
              msg.push(" Lvl " + rpt.side0TileLevel)
            } else {        // city
              msg.push (escape(playerNames["p" + rpt.side0PlayerId]));
              msg.push (' - ');
              msg.push (cityNames['c'+ rpt.side0CityId]);
            }
          }
          msg.push (' ');
          msg.push (coordLink(rpt.side0XCoord, rpt.side0YCoord));
          if (rpt.side0AllianceId!=0 && rpt.side0AllianceId!=myAllianceId){
            msg.push ('<BR>');
            msg.push (allianceNames['a'+rpt.side0AllianceId]);
            msg.push (' (');
            msg.push (targetDiplomacy);
            msg.push (')');
          }

          
/***
        
MY reports, reins works ...
<div><a href="#" onclick="jQuery('#modal_msg_body').trigger('viewReinforcedReport', ['6076798','67674','Elroy','IV','13412958','Duke_Swan','6329','Erisvil',662,477]);return false;">View Report</a></div>

    
OK: <a onclick=" $(&quot;modal_alliance_reports_tabledivNKA&quot;).id=&quot;modal_alliance_reports_tablediv&quot;; modal_alliance_report_view(&quot;6044155&quot;,0,51,9,2282354,&quot;Jetson&quot;,&quot;M&quot;,&quot;Joe7z6bq&quot;,&quot;M&quot;,4,668,437,1299747584,0,643,407);return false;">View</a></div>           
ERROR (Reinf): <a onclick=" $(&quot;modal_alliance_reports_tabledivNKA&quot;).id=&quot;modal_alliance_reports_tablediv&quot;; modal_alliance_report_view(&quot;6043602&quot;,1,51,9,13487684,&quot;Fred8135i&quot;,&quot;M&quot;,&quot;Jetson&quot;,&quot;M&quot;,2,188,696,1299746211,0,23,518);return false;">View</a>
modal_alliance_report_view("6043602",1,51,9,13487684,"Fred8135i","M","Jetson","M",2,188,696,1299746211,0,23,518);return false;'>View</a>                        
modal_alliance_report_view(&quot;6043602&quot;,1,51,9,13487684,&quot;Fred8135i&quot;,&quot;M&quot;,&quot;Jetson&quot;,&quot;M&quot;,2,188,696,1299746211,0,23,518);return false;">View Report</a></div>            
modal_alliance_report_view("6043602",1,51,9,13487684,"Fred8135i","M","Jetson","M",2,188,696,1299746211,0,23,518);return false;">View Report</a></div>            
***/          
          
          
          // 'view report' link ...
          if (Options.allowAlterAR)
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' modal_alliance_report_view(\"");   // ONCLICK ???
          else
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' $(\"modal_alliance_reports_tabledivNKA\").id=\"modal_alliance_reports_tablediv\"; modal_alliance_report_view(\"");   // ONCLICK ???
          msg.push(rpt.reportId);
          msg.push('",');
          if (parseInt(rpt.side1AllianceId) == parseInt(Seed.allianceDiplomacies.allianceId))
            msg.push(1);
          else
            msg.push(0);
          msg.push(",");
          msg.push(rpt.side0TileType);
          msg.push(",");
          msg.push(rpt.side0TileLevel);
          msg.push(",");
          msg.push(rpt.side0PlayerId);
          msg.push(',"');
          if (parseInt(rpt.side0PlayerId) != 0)
            msg.push(escape(playerNames["p" + rpt.side0PlayerId]));
          else
            msg.push(unsafeWindow.g_js_strings.commonstr.enemy);
          msg.push('","');
          if (parseInt(rpt.side0PlayerId) != 0)
            msg.push(escape(playerNames["g" + rpt.side0PlayerId]));
          else
            msg.push(0)
          msg.push('","');
          if (parseInt(rpt.side1PlayerId) > 0)
            msg.push(escape(playerNames["p" + rpt.side1PlayerId]));
          msg.push('","');
          if (parseInt(rpt.side1PlayerId) != 0)
            msg.push(escape(playerNames["g" + rpt.side1PlayerId]));
          msg.push('",');
          msg.push(rpt.marchType);
          msg.push(",");
          msg.push(rpt.side0XCoord);
          msg.push(",");
          msg.push(rpt.side0YCoord);
          msg.push(",");
          msg.push(rpt.reportUnixTime);
          msg.push(",");
          if (parseInt(rpt.reportStatus) == 2)
            msg.push(1);
          else
            msg.push(0);
          if (rpt.side1XCoord) {
            msg.push(",");
            msg.push(rpt.side1XCoord);
            msg.push(",");
            msg.push(rpt.side1YCoord)
          } else {
            msg.push(",,");
          }
          msg.push(");return false;'>Öffnen</a></div></td></tr>");
        }
        msg.push("</tbody></table></div>");
      }
      msg.push("</div><div id='modal_report_list_pagination'></div>");
      document.getElementById('allianceContent').innerHTML = msg.join("");
      if (pageNum) {
        unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports", pageNum)
      } else {
        unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports")
      }
    }
  },

}   // end AllianceReports singleton
/*************** WILDS TAB *********************/

var wildNames = {
   0: 'Moor',
  10: 'Radura',
  11: 'Lago',
  20: 'Foreste',
  30: 'Collina',
  40: 'Montagna',
  50: 'Pianura',
};

var mercNames = {
  0: 'Niemand',
  1: 'Novizen',
  2: 'Fortgeschrittener Anfänger',
  3: 'Veteranen',
};

Tabs.Wilds = {
  tabLabel : 'Terre',
  tabOrder : toWildnisse,

  cont : null,
//  state : null,
  upGoldTimer : null,
  wildList : [],
  buildList : {},
  
  init : function (div){
    var t = Tabs.Wilds;
    t.cont = div;
    unsafeWindow.ptButMaxTraps = t.e_butMaxTraps;
    unsafeWindow.ptInpWildTraps = t.e_inpTraps;
    unsafeWindow.ptButWildSet = t.e_butWildSet;
    t.cont.innerHTML = '<DIV id=wildContent style="maxheight:665px; height:665px; overflow-y:auto">';
//    t.show ();
  },

  hide : function (){
    var t = Tabs.Wilds;
    clearTimeout (t.upGoldTimer);
     mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
  },
  
  show : function (){
    var t = Tabs.Wilds;
    clearTimeout (t.upGoldTimer);
       mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
    m = '<CENTER>'+ strButton20('Zurücksetzten', 'id=ptwref') +'</center><TABLE cellspacing=0 cellpadding=0 class=pdxTab2Pad align=center>';
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var cWilds = Seed.wilderness['city'+city.id];
      t.wildList[c] = [];
      var castle = parseInt(Seed.buildings['city'+ city.id].pos0[1]);
    if(castle == 11) castle = 12;
      var totw = 0;
      if (matTypeof(cWilds)=='object'){
        for (var k in cWilds)
          ++totw;
      }       
      m += '<TR><TD colspan=20><DIV class=pdxStat><TABLE class=ptNoPad width=100%><TR><TD width=100></td><TD width=100% align=center>'+ city.name
        +' &nbsp; ('+ city.x +','+ city.y +')</td><TD width=100 align=right>Wildnisse: '+ totw +' von '+ castle +' &nbsp; </TD></tr></table></div></td></tr>';
      var row = 0;  
      var sortem = [];

      if (matTypeof(cWilds) != 'array') {
        m += '<TR style="background-color:white; font-weight:bold;" align=right><TD align=left>Wildniss</td><TD></td><TD align=left>Coordinate</td><TD>Fallen</td><TD align=left>Söldner</td>\
         <TD width=15></td><TD colspan=3 class=entry>'+ htmlTitleLine(' VERTEIDIGUNG ') +'</td></tr>';
        for (var k in Seed.wilderness['city'+city.id])
          sortem.push (Seed.wilderness['city'+city.id][k]);
        sortem.sort (function (a,b){
          var x; if ((x = b.tileLevel-a.tileLevel)!=0)
            return x;
          return a.tileType-b.tileType;
        });
        for (i=0; i<sortem.length; i++){
          var wild = sortem[i];
          var wildDef = Seed.wildDef['t'+wild.tileId];
          if (wildDef==undefined || !wildDef)
            wildDef = {fort60Count:0, mercLevel:0};
          var maxTraps = parseInt(wild.tileLevel)*100;
          var maxBuild = maxTraps - parseInt(wildDef.fort60Count);
          t.wildList[c][i] = [wild.tileId, maxBuild];          
          m += '<TR align=right'+ (row++%2?'':' class=ptOddrow') +'><TD align=left>'+ wildNames[wild.tileType] +'</td>\
            <TD>'+ wild.tileLevel +'</td><TD align=center><A onclick="ptGotoMap('+ wild.xCoord +','+ wild.yCoord +')">'+ wild.xCoord +','+ wild.yCoord +'</a></td>\
            <TD align=right><B>'+ wildDef.fort60Count +'</b></td><TD align=center><B>'+ mercNames[wildDef.mercLevel] +'</b></td>\
            <TD></td><TD align=left class=pdxEntry><B>Fallen:</b> <INPUT onchange="ptInpWildTraps(this)" id=ptwt_'+ c +'_'+ i
              + (maxBuild==0?' DISABLED ':'')+' style="margin:0px; padding:0px" type=text size=3 maxlength=4></td>'
          if (wildDef.fort60Count < maxTraps)
            m += '<TD class=pdxEntry style="padding:0px">'+ strButton14('Max', 'id=ptwx_'+ c +'_'+ i +' onclick="ptButMaxTraps(this)"') +'</td>';
          else
            m += '<TD class=pdxEntry></td>';
          m += '<TD class=pdxEntry> &nbsp; &nbsp; <B>Söldner:</b> ' + htmlSelector(mercNames, wildDef.mercLevel, 'id=ptwm_'+ c +'_'+ i) +' &nbsp; &nbsp; </td></tr>';
        }
        m += '<TR><TD colspan=6></td><TD class=pdxEntry align=center colspan=3><TABLE><TR><TD width=40% align=left>Kosten: <SPAN id=ptwgc_'+ c +'>0</span></td>\
            <TD width=10%>'+ strButton20("Verteidigung Einstellen", 'onclick="ptButWildSet('+ c +')"') +'<TD width=40% align=right>Gold: <SPAN id=ptwgt_'+ c +'>0</span></td></td></tr></table></td></tr>';
      } else {
        m+= '<TR><TD colspan=9> &nbsp; </td></tr>';
      }         
    }
    document.getElementById('wildContent').innerHTML = m + '</table></div>';
    document.getElementById('ptwref').addEventListener ('click', t.show, false);
    t.updateGold ();
  },
    
  e_butWildSet : function (c){
    var t = Tabs.Wilds;
    var totTraps = 0;  
    var cid = Cities.cities[c].id;
    t.buildList = {cityId:cid, list:[]};
          
    for (var w=0; w<t.wildList[c].length; w++){
      var wild = Seed.wilderness['city'+cid]['t'+t.wildList[c][w][0]];
      var wildDef = Seed.wildDef['t'+t.wildList[c][w][0]];
// TODO: Seed.wildDef is null if just aquired
if (wildDef==undefined || !wildDef)
  wildDef = {fort60Count:0, mercLevel:0};
    
      var numTraps = parseInt(document.getElementById('ptwt_'+ c +'_'+ w).value, 10);
      if (isNaN(numTraps))
        numTraps = 0;
      totTraps += numTraps;
      if (numTraps > 0)
        t.buildList.list.push (['T', wild.tileId, numTraps]);
      var mercId =document.getElementById('ptwm_'+ c +'_'+ w).value;
      if (wildDef.mercLevel != mercId)
        t.buildList.list.push (['M', wild.tileId, mercId, wildDef.mercLevel]);
    }

    var totCost = totTraps * 200;
    if (totCost > parseInt(Seed.citystats['city'+cid].gold[0])){
      document.getElementById('ptwgc_'+ c).innerHTML = '<SPAN class=boldRed>'+ addCommasInt(totCost) +'</span>';
      return;
    }
    if (t.buildList.list.length == 0)
      return;
    t.setCurtain (true);
    var popDiv = t.setPopup (true);
    popDiv.innerHTML = '<TABLE class=pdxTab2 width=100% height=100%><TR><TD>\
          <DIV class=pdxStat>Setzte Wildniss Verteidigung...</div>\
          <DIV id=ptWildBuildDiv class=ptDiv style="padding:10px; height:225px; max-height:225px; overflow-y:auto"></div>\
          </td></tr><TR><TD align=center>'+ strButton20('Abbrechen', 'id=ptWildCancel') +'</td></tr></table>';
    document.getElementById('ptWildCancel').addEventListener('click', t.e_buildCancel, false);
    t.processQue(null);  
  },
  
  e_buildCancel : function (){
    var t = Tabs.Wilds;
    t.setCurtain(false);
    t.setPopup(false);
    t.show();
  },
  
  processQue : function (errMsg){
    var t = Tabs.Wilds;
    var what = t.buildList.list.shift();
    var div = document.getElementById('ptWildBuildDiv');
    if (what==null || errMsg){
      if (errMsg)
        div.innerHTML += '<BR><SPAN style="white-space:normal;" class=boldRed>ERROR: '+ errMsg +'</span>';
      else
        div.innerHTML += '- Fatto!<BR>';
      document.getElementById('ptWildCancel').firstChild.innerHTML = 'Schließen';
      return;
    }
    if (div.innerHTML != '')
      div.innerHTML += '- Fatto!<BR>';
    var wild = Seed.wilderness['city'+ t.buildList.cityId]['t'+what[1]];
    if (what[0] == 'T'){
      div.innerHTML += 'Baue '+ what[2] +' fallen für '+ Cities.byID[t.buildList.cityId].name +'\'s Wildniss auf '+ wild.xCoord +','+ wild.yCoord +' ... ';
      t.postBuyTraps (t.buildList.cityId, what[1], what[2], t.processQue);
    } else {
      div.innerHTML += 'Beauftrage '+ mercNames[what[2]] +' für '+ Cities.byID[t.buildList.cityId].name +'\'s Wildniss verteidigung auf '+ wild.xCoord +','+ wild.yCoord +' ';
      t.postHireMercs (t.buildList.cityId, what[1], what[2], what[3], t.processQue);
    }
  },
  
  setPopup : function (onoff){
    var t = Tabs.Wilds;
    if (onoff){
      var div = document.createElement('div');
      div.id = 'ptWildPop';
      div.style.backgroundColor = '#fff';
      div.style.zindex = mainPop.div.zIndex+2;
      div.style.opacity = '1';
      div.style.border = '3px outset red';
      div.style.width = '550px';
      div.style.height = '300px';
      div.style.display = 'block';


      div.style.position = 'absolute';
      div.style.top = '100px';
      div.style.left = '100px';
      t.cont.appendChild (div);
      return div;
    } else {
      t.cont.removeChild (document.getElementById('ptWildPop'));
    }
  },

  setCurtain : function (onoff){
    var t = Tabs.Wilds;
    if (onoff){
      var off = getAbsoluteOffsets (t.cont);
      var curtain = document.createElement('div');
      curtain.id = 'ptWildCurtain';
      curtain.style.zindex = mainPop.div.zIndex+1;
      curtain.style.backgroundColor = "#000000";
      curtain.style.opacity = '0.5';
      curtain.style.width = t.cont.clientWidth +'px';
      curtain.style.height = t.cont.clientHeight +'px';
      curtain.style.display = 'block';
      curtain.style.position = 'absolute';
      curtain.style.top = off.top + 'px';
      curtain.style.left = off.left + 'px';
      t.cont.appendChild (curtain);
    } else {
      t.cont.removeChild (document.getElementById('ptWildCurtain'));
    }
  },
  
  e_butMaxTraps : function (e){
    var t = Tabs.Wilds;
    var c = e.id.substr(5,1);
    var w = e.id.substr(7);
    var inp = document.getElementById('ptwt_'+ c +'_'+ w);
    inp.value = t.wildList[c][w][1];
    t.e_inpTraps (inp);
  },
  
  e_inpTraps : function (e){
    var t = Tabs.Wilds;
    var c = e.id.substr(5,1);
    var w = e.id.substr (7);
    var tot = 0;
    for (var i=0; i<t.wildList[c].length; i++) {
      var val = parseInt(document.getElementById('ptwt_'+ c +'_'+ i).value, 10);
      if (isNaN(val))
        val = 0;
      tot += val;
    }  
    document.getElementById('ptwgc_'+ c).innerHTML = addCommasInt(tot * 200);
    if (isNaN(e.value) || e.value<0 || e.value>t.wildList[c][w][1]){
      e.value = '';
      e.style.backgroundColor = '#ffaaaa';
    } else
      e.style.backgroundColor = null;
  },

  updateGold : function (){
    var t = Tabs.Wilds;
    for (var c=0; c<Cities.numCities; c++){
      var e = document.getElementById('ptwgt_'+ c +'');
      if (e)
        e.innerHTML = addCommasInt(Seed.citystats['city'+Cities.cities[c].id].gold[0]);
    }
    t.upGoldTimer = setTimeout (t.updateGold, 2000);
  },
  
  postBuyTraps : function (cid, tid, quant, notify){
    if (DISABLE_POST_DEFENSES){
      setTimeout (function (){notify(null)}, 1500);
      return;
    }
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = cid;
    params.tid = tid;
    params.quant = quant;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/buyWildTraps.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok){
          if (!Seed.wildDef["t"+ tid])
            Seed.wildDef["t"+ tid] = {tileId:tid, fort60Count:0, mercLevel:0};
          Seed.wildDef["t"+ tid].fort60Count = parseInt(Seed.wildDef["t"+ tid].fort60Count) + parseInt(quant);
        }  
        if (notify)
          notify (rslt.errorMsg);
      },
      onFailure: function () {
        if (notify)
          notify ('AJAX ERROR');
      },
    });
  },

  postHireMercs : function (cid, tid, newLevel, oldLevel, notify){
    if (DISABLE_POST_DEFENSES){
      setTimeout (function (){notify('OK, so it\'s not really an error, it\'s just George playing around to see how the error message looks. It\'s a long one, how does it fit? Is it OK? Are you sure? JANE! Get me off of this thing!')}, 1500);
      return;
    }
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = cid;
    params.tid = tid;
    params.lv = newLevel;
    params.olv = oldLevel;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/hireWildMerc.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok){
          if (!Seed.wildDef["t"+ tid])
            Seed.wildDef["t"+ tid] = {tileId:tid, fort60Count:0, mercLevel:0};
          Seed.wildDef["t"+ tid].mercLevel = newLevel;
        }
        if (notify)
          notify (rslt.errorMsg);
      },
      onFailure: function () {
        if (notify)
          notify ('AJAX ERROR');
      },
    });
  },
          
}
// EINSTELLUNG TAB
Tabs.Options = {
  tabLabel : 'Opzioni',
  tabOrder: toEinstellung,
  myDiv : null,
  fixAvailable : {},
  displayTimer:null,
  curTabBut : null,
  curTabName : null,

  init : function (div){
    var t = Tabs.Options;


    t.myDiv = div;
    t.myDiv.innerHTML = '<div class=pdxStat>OPZIONI POWER</div><TABLE class=pdxTab2 align=center><TR><TD><INPUT class=pdxSubtab ID=ptmrchSubO type=submit value=Power></td>\
          <TD><INPUT class=pdxSubtab ID=ptmrchSubT type=submit value=Bot></td>\
          <TD><INPUT class=pdxSubtab ID=ptmrchSubC type=submit value=Tools></td>\
<TD><INPUT class=pdxSubtab ID=ptmrchSubS type=submit value=Style></td></tr></table><HR class=ptThin>\
      <DIV id=ptOptionsOutput style="margin-top:10px; height:600px"></div>';
    t.optionsDiv = document.getElementById('ptOptionsOutput');
    document.getElementById('ptmrchSubO').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubC').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubT').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubS').addEventListener('click', e_butSubtab, false);
    changeSubtab (document.getElementById('ptmrchSubO'));

    function e_butSubtab (evt){
      changeSubtab (evt.target);
    }

    function changeSubtab (but){
      if (but == t.curTabBut)
        return;
      if (t.curTabBut){
        t.curTabBut.className='pdxSubtab';
        t.curTabBut.disabled=false;
      }
      t.curTabBut = but;
      but.className='pdxSubtab pdxSubtabSel';
      but.disabled=true;
      t.curTabName = but.id.substr(9);
      t.show ();
    }
  },

  hide : function (){
    var t = Tabs.Options;
    clearTimeout (t.displayTimer);
      mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
  },

  show : function (){
    var t = Tabs.Options;
    clearTimeout (t.displayTimer);
      mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
    if (t.curTabName == 'C')
      t.showColors();
    else if (t.curTabName == 'T')
      t.showTabs();
    else if (t.curTabName == 'S')
      t.showStyle();
    else
      t.showOptions();

  },

  /***   Options SUBTAB  ***/
   showOptions : function (){
    var t = Tabs.Options;

    try {
      m = '<DIV style="height:500px; max-height:500px;"><TABLE width=100% class=pbOptions cellspacing=0 cellpadding=0>\
        <TR><TD colspan=2><div class=pdxStat>IMPOSTAZIONI POWER</div></td></tr>\
        <TR><TD><INPUT id=pballowWinMove type=checkbox /></td><TD>Abilitare spostamento finestra (clicca sulla barra in alto e trascinala)</td></tr>\
        <TR><TD><INPUT id=pbTrackWinOpen type=checkbox /></td><TD>Ricorda la finestra aperta dopo ogni refresh.</td></tr>\
        <TR><TD><INPUT id=pbHideOnGoto type=checkbox /></td><TD>Chiudi automaticamente la finestra quando si clicca sulle coordinate.</td></tr>\
    <TD><INPUT id=pdxwidescreenEnable type=checkbox '+ (Options.widescreen?'CHECKED ':'') +'/></td><TD>Adatta automaticamente le dimensioni della finestra.</td></tr>\
<TR><TD><INPUT id=ptEnableBarbSummary type=checkbox /></TD><TD><INPUT id=optBarbHitsKeep type=text size=3 value="'+ Options.barbHitsKeep +'"> Barbaren Lager Treffer Daten für den <b>Märsche</b> SubTab <b>Lager Stats</b> Speichern!&nbsp;&nbsp;<INPUT id="optResetBarbSummary" type=submit value="Barbaren Stats Zurücksetzten"\></td></tr>\
        </table><BR><BR><HR><u>Nota</u>: se una casella non è cliccabile Kabam ancora una volta ha fatto dei cambiamenti!<HR>\
<table width="624" border="0" cellspacing="0" cellpadding="0"><tr>\
    <td colspan="2"><a href="http://userscripts.org/scripts/show/104137" target="_blank">KoC Power - Deutsch</a> -   Version: <SPAN class=boldRed> '+ Version +' </span> by <a href="http://userscripts.org/users/297645/scripts" target="_blank">PDX</a></span></td>\
    <td><b></b></td>\
  </tr><tr></td>\
    <td width="291">powered by<br><a href="http://koc.god-like.org" title="Hier geht es zum KoC Scripts Blog!" target="_blank">KoC Scripts<br>\
      Der erste Deutsche KoC Scripts Blog!</a></td>\
    <td width="249"><span style=\"font-size:10px; color:#555; line-height:18px; \"><a href="http://userscripts.org/scripts/reviews/104137" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Power - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98414" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Power Bot - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98323" title="Jetzt eine Bewertung abgeben!" target="_blank">Power Tools - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98788" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Allianz - Extras</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98234" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Attack - Deutsch</a></span></td></tr></table>\
</div>';
      t.optionsDiv.innerHTML = m;
t.togOpt ('ptEnableBarbSummary', 'enableBarbSummary');
      t.togOpt ('pballowWinMove', 'pbWinDrag', mainPop.setEnableDrag);
      t.togOpt ('pbTrackWinOpen', 'pbTrackOpen');
    t.togOpt ('pdxwidescreenEnable', 'widescreen');
      t.togOpt ('pbHideOnGoto', 'hideOnGoto');

	document.getElementById('optBarbHitsKeep').addEventListener ('change', function () {
				Options.barbHitsKeep = document.getElementById('optBarbHitsKeep').value;
				saveOptions();
			}, false);

			document.getElementById('optResetBarbSummary').addEventListener ('click', function () {
				barbHit = [];
				barbHits = [];
				GM_setValue ('barbHits_'+getServerId(), JSON2.stringify(barbHits));
			}, false);
    } catch (e) {
      div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }
  },


  togOpt : function (checkboxId, optionName, callOnChange, callEnable,callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);

    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },

  changeOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
      if (callOnChange)
        callOnChange (this.value);
    }
  },

  e_watchChanged : function (){
    GlobalOptions.pbWatchdog = document.getElementById('pbWatchEnable').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
  },

 /***   Style SUBTAB  ***/
   showStyle : function (){
    var t = Tabs.Options;

    try {
      m = '<DIV style="height:500px; max-height:500px;"><TABLE width=100% class=pbOptions cellspacing=0 cellpadding=0>\
        <TR><TD colspan=2><div class=pdxStat>IMPOSTAZIONI STYLE</div></td></tr>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>Sposta la chat sul lato destro<font color=#FF0000> (Richiesto Wide Screen)</font></td></tr>\
    <TD></td><TD>Posizione Chat: Destra <INPUT id=pbchattop type=text size=3 maxlength=6 \> Sinistra <INPUT id=pbchatleft type=text size=3 maxlength=6 \> Altezza Bordo: <INPUT id=pbchathoehe type=text size=3 maxlength=6 \>  Altezza Chat: <INPUT id=pbchathoehel type=text size=3 maxlength=6 \></td></tr>\
<TR><TD colspan=2><span style=\"font-size:10px; color:#555; line-height:18px; \"><font color=#600000><B><u>Importante</u></b></font>: <b>Altezza Bordo</b> dovra sempre essere maggiore di 200px <b>Da quella della Chat</b>!</span></td></tr>\
    <TR><TD><INPUT id=pbWMapEnable type=checkbox /></td><TD>WideMap <font color=#FF0000>(Richiesto Wide Screen, e la vista della mappa sarà ingrandita!)</font></td></tr>\
<TD></td><TD>Posizione Mappa: Larghezza <INPUT id=pbwidewidth type=text size=3 maxlength=6 \></td></tr>\
          <TR><TD><INPUT id=MapExtra type=checkbox /></td><TD>Mostra il nome del giocatore e il potere sulla Mappa!</td></tr>\
        </table><BR><BR><HR><u>ATTENZIONE</u>: Wenn eine Box nicht klickbar ist hat KoC mal wieder eine änderung vorgenommen!<HR>\
<table width="624" border="0" cellspacing="0" cellpadding="0"><tr>\
    <td colspan="2"><a href="http://userscripts.org/scripts/show/104137" target="_blank">KoC Power - Deutsch</a> -   Version: <SPAN class=boldRed> '+ Version +' </span> by <a href="http://userscripts.org/users/297645/scripts" target="_blank">PDX</a></span></td>\
    <td><b>Bewertungen</b></td>\
  </tr><tr><td width="84"><span class="boldRed"><img src="" alt="" width="80" height="78"></span></td>\
    <td width="291">powered by<br><a href="http://koc.god-like.org" title="Hier geht es zum KoC Scripts Blog!" target="_blank">KoC Scripts<br>\
      Der erste Deutsche KoC Scripts Blog!</a></td>\
    <td width="249"><span style=\"font-size:10px; color:#555; line-height:18px; \"><a href="http://userscripts.org/scripts/reviews/104137" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Power - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98414" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Power Bot - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98323" title="Jetzt eine Bewertung abgeben!" target="_blank">Power Tools - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98788" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Allianz - Extras</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98234" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Attack - Deutsch</a></span></td></tr></table>\
</div>';
      t.optionsDiv.innerHTML = m;
	t.changeOpt ('pbchattop', 'chatTop');
	t.changeOpt ('pbchatleft', 'chatLeft');
	t.changeOpt ('pbchathoehe', 'chatHoehe');
	t.changeOpt ('pbchathoehel', 'chatHoeheL');
t.changeOpt ('pbwidewidth', 'widewidth');
t.togOpt ('MapExtra', 'MapShowExtra');
      t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
      t.togOpt ('pbWMapEnable', 'pbWideMap', WideScreen.useWideMap);
    } catch (e) {
      div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }
  },


  togOpt : function (checkboxId, optionName, callOnChange, callEnable,callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);

    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },

  changeOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
      if (callOnChange)
        callOnChange (this.value);
    }
  },

  e_watchChanged : function (){
    GlobalOptions.pbWatchdog = document.getElementById('pbWatchEnable').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
  },


  /***   Tabs SUBTAB  ***/
  showTabs : function (){
     var t = Tabs.Options;

    try {
      m = '<DIV style="height:600px; "><TABLE width=100% class=pbOptions cellspacing=0 cellpadding=0>\
        <TR><TD colspan=2><DIV class=pdxStat>IMPOSTAZIONI BOT</div></tr>\
        <TR><TD><INPUT id=ptEnableFoodChatWarn type=checkbox /></td><TD>Pubblica messaggio in chat alleanza quando si ha cibo per meno di\
          <INPUT id=optfoodChatWarnHours type=text size=3 value="'+ Options.foodChatWarnHours +'"> Ore <font color=#FF0000>(Il controllo viene eseguito ogni ora!)</td></tr>\
        <TR><TD><INPUT id=togWhisperOn type=checkbox /></td><TD>Flüster Sound Alarm einschalten! </td></tr>\
        <TR><TD><INPUT id=pbFairie type=checkbox /></td><TD>Disabilita Pop-up Fiera!</td></tr>\
        <TR><TD><INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/></td><TD>Abilità Wide Screen '+ htmlSelector({normal:'Normal', wide:'Widescreen', ultra:'Ultra'},GlobalOptions.pbWideScreenStyle,'id=selectScreenMode') +' <font color=#FF0000>A tutti i domini. (Refresh)</font></td></tr>\
        <TR><TD><INPUT id=pbWatchEnable type=checkbox '+ (GlobalOptions.pbWatchdog?'CHECKED ':'') +'/></td><TD>Ricaricare Koc se per circa 1 minuto non è attivo! <font color=#FF0000>(Esteso a tutte le aree)</font></td></tr>\
        <TR><TD><INPUT id=pbEveryEnable type=checkbox /></td><TD>KoC alle <INPUT id=pbeverymins type=text size=2 maxlength=3 \> Min. Neu Laden!<font color=#FF0000>(nur wenn die automatischen Angriffe deaktiviert sind!)</td></tr>\
        <TR><TD><INPUT id=pbGoldEnable type=checkbox /></td><TD>Gold eintreiben bei <INPUT id=pbgoldLimit type=text size=2 maxlength=3 \>% Glück</td></tr>\
<TR><TD><INPUT id=HelReq type=checkbox /></td><TD>Automatisch bei Bau und Forschungshilfen helfen.</td></tr>\
<TR><TD><INPUT id=PubReq type=checkbox '+ (GlobalOptions.autoPublishGamePopups?'CHECKED ':'') +'/></td><TD>Ppubblicare automaticamente l\'aiuto<font color=#FF0000>(Inserisci la richiesta sulla bacheca del gioco)</font></td>\
<TR><TD></td><TD>Wer darf die Anfrage sehen? '+ htmlSelector({80:'Alle', 50:'Freunde von Freunden', 40:'Nur Freunde', 10:'Nur ich'},GlobalOptions.autoPublishPrivacySetting,'id=selectprivacymode') +'</td></tr>\
           <TR><TD><INPUT id=DelReq type=checkbox /></td><TD>Bau und Forschungshilfen im Chat nicht anzeigen!</td></tr>\
        </table><BR><BR><HR><u>ATTENZIONE</u>: Wenn eine Box nicht klickbar ist hat KoC mal wieder eine änderung vorgenommen!<HR>\
<table width="624" border="0" cellspacing="0" cellpadding="0"><tr>\
    <td colspan="2"><a href="http://userscripts.org/scripts/show/104137" target="_blank">KoC Power - Deutsch</a> -   Version: <SPAN class=boldRed> '+ Version +' </span> by <a href="http://userscripts.org/users/297645/scripts" target="_blank">PDX</a></span></td>\
    <td><b>Bewertungen</b></td>\
  </tr><tr><td width="84"><span class="boldRed"><img src="" alt="" width="80" height="78"></span></td>\
    <td width="291">powered by<br><a href="http://koc.god-like.org" title="Hier geht es zum KoC Scripts Blog!" target="_blank">KoC Scripts<br>\
      Der erste Deutsche KoC Scripts Blog!</a></td>\
    <td width="249"><span style=\"font-size:10px; color:#555; line-height:18px; \"><a href="http://userscripts.org/scripts/reviews/104137" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Power - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98414" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Power Bot - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98323" title="Jetzt eine Bewertung abgeben!" target="_blank">Power Tools - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98788" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Allianz - Extras</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98234" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Attack - Deutsch</a></span></td></tr></table>\
</div>';
      t.optionsDiv.innerHTML = m;
    
      document.getElementById('optfoodChatWarnHours').addEventListener ('change', function () {
          var fcw = document.getElementById('optfoodChatWarnHours').value;
          if (isNaN(fcw) || fcw<0.01 || fcw>99999){
            document.getElementById('optfoodChatWarnHours').value = Options.foodChatWarnHours;
            return;
          }
          Options.foodChatWarnHours = fcw;
          saveOptions();
        }, false);
    document.getElementById('selectScreenMode').addEventListener ('change', function(){
        GlobalOptions.pbWideScreenStyle = document.getElementById('selectScreenMode').value;
         GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);
    document.getElementById('selectprivacymode').addEventListener ('change', function(){
            GlobalOptions.autoPublishPrivacySetting = document.getElementById('selectprivacymode').value;
        GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);
    document.getElementById('PubReq').addEventListener ('change', function(){
             GlobalOptions.autoPublishGamePopups = document.getElementById('PubReq').checked;
        GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false)
      document.getElementById('pbWatchEnable').addEventListener ('change', t.e_watchChanged, false);
      document.getElementById('pbWideOpt').addEventListener ('change', t.e_wideChanged, false);
      t.togOpt ('pbFairie', 'pbKillFairie', FairieKiller.setEnable);
      t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
      t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
      t.changeOpt ('pbeverymins', 'pbEveryMins');
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('ptEnableFoodChatWarn', 'enableFoodChatWarn');         //25mar
      t.togOpt ('togWhisperOn', 'WhisperOn');
      t.togOpt ('HelReq', 'HelpRequest');
      t.togOpt ('DelReq', 'DeleteRequest');
      
nHtml.SetSelect(ById('htmlSelector'),this.options.autoPublishPrivacySetting);
    } catch (e) {
     // div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }
  },


  togOpt : function (checkboxId, optionName, callOnChange, callEnable,callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);

    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },

  changeOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
      if (callOnChange)
        callOnChange (this.value);
    }
  },

  e_wideChanged : function (){
    GlobalOptions.pbWideScreen = document.getElementById('pbWideOpt').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
  },
  /***   Colors SUBTAB  ***/
  showColors : function (){
    var t = Tabs.Options;
      try {
      m = '<DIV style="height:750px;" overflow-y:auto><TABLE width=100% class=pbOptions cellspacing=0 cellpadding=0>\
        <TR><TD colspan=2><div class=pdxStat>IMPOSTAZIONI TOOLS</div></td></tr>\
        <TR><TD><INPUT id=ptEnableFoodWarn type=checkbox /></td><TD>\'Reicht für\' in Rot Anzeigen wenn es noch für \
            <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> Stunden ausreicht! <SPAN class=boldRed>(Stats Tab)</span></td></tr>\
      <TR><TD colspan=2><span style=\"font-size:10px; color:#555; line-height:18px; \"><font color=#600000><B><u>Wichtig</u></b></font>: max. 8 Stunden eintragen! sonst spamst du den Allianz Chat!</span></td></tr>\
<TR><TD></td><TD><b>Sound Alarm bei Allianz Angriffen!</b></td></tr>\
  <TR><TD></td><TD><font color=#333333>Deutsche Meldung <INPUT id=ptEnableTowerAlert type=checkbox /> - Englishe Meldung <INPUT id=ptEnableTowerAlertEN type=checkbox /></font></td></tr>\
  <TR><TD></td><TD><b>Sound Alarm wenn ein Allianz Mitglied zuwenig Nahrung hat!</b></td></tr>\
  <TR><TD></td><TD><font color=#333333>Deutsche Meldung <INPUT id=ptEnableFoodChatAlert type=checkbox /> - Englishe Meldung <INPUT id=ptEnableFoodChatAlertEN type=checkbox /></font></td></tr>\
<TR><TD colspan=2><BR><B><u>Kingdom of Camelot - Einstellung</u></b></td></tr>\
    <TR><TD><INPUT id=togGmtClock type=checkbox /></td><TD>GMT Uhrzeit neben der Camelot Zeit</td></tr>\
    <TR><TD><INPUT id=togAllRpts type=checkbox /></td><TD>Erweiterte Allianz Berichte.</td></tr>\
        <TR><TD><INPUT id=togAllowAlter type=checkbox /></td><TD>Erlaube anderen Scripten das Format der Allianz Berichte zu wechseln.</td></tr>\
        <TR><TD><INPUT id=togEnhanceMsging type=checkbox /></td><TD>Erweiterte Nachrichten. <SPAN class=boldRed>("Weiterleiten" und "Alle Offiziere" Buttons)</span></td></tr>\
        <TR><TD><INPUT id=togWarnZero type=checkbox /></td><TD>Warnen falls du nach 0,0 Maschieren möchtest.</td></tr>\
        <TR><TD><INPUT id=togChatStuff type=checkbox /></td><TD>Chat Erweitern <SPAN class=boldRed>(Koordianten Klickbar, Avatar klicken zum flüstern)</span></td></tr>\
        <TR><TD><INPUT id=togAttackPicker type=checkbox /></td><TD>Heiligtum Auswähler auf der Truppen Bewegungs Seite Anzeigen. <SPAN class=boldRed>(Verstärkung, Transport etc...)</span></td></tr>\
        <TR><TD><INPUT id=togBatRounds type=checkbox /></td><TD>Die Runden Anzahl in den Berichten einblenden</td></tr>\
        <TR><TD><INPUT id=togAtkDelete type=checkbox /></td><TD>Berichte Lösch Button einblenden <SPAN class=boldRed>(Um die Berichten zu Löschen)</span></td></tr>\
        <TR><TD><INPUT id=togKnightSelect type=checkbox /></td><TD><u>Keinen</u> Ritter auswählen wenn der Marsch typ: <SPAN class=boldRed>Spähen, Transport</span> oder <SPAN class=boldRed>Verstärken</span> ist!</td></tr>\
        <TR><TD><INPUT id=togCoordBox type=checkbox /></td><TD>Koordinaten Box  <SPAN class=boldRed>über</span> der Truppenbewegung Anzeigen!</td></tr>\
        <TR><TD><INPUT id=togMsgCountFix type=checkbox /></td><TD>Zeige die Anzahl der Berichte und Nachrichten getrennt an.</td></tr>\
        </table><HR><u>ATTENZIONE</u>: Wenn eine Box nicht klickbar ist hat KoC mal wieder eine änderung vorgenommen!<HR>\
<table width="624" border="0" cellspacing="0" cellpadding="0"><tr>\
    <td colspan="2"><a href="http://userscripts.org/scripts/show/104137" target="_blank">KoC Power - Deutsch</a> -   Version: <SPAN class=boldRed> '+ Version +' </span> by <a href="http://userscripts.org/users/297645/scripts" target="_blank">PDX</a></span></td>\
    <td><b>Bewertungen</b></td>\
  </tr><tr><td width="84"><span class="boldRed"><img src="" alt="" width="80" height="78"></span></td>\
    <td width="291">powered by<br><a href="http://koc.god-like.org" title="Hier geht es zum KoC Scripts Blog!" target="_blank">KoC Scripts<br>\
      Der erste Deutsche KoC Scripts Blog!</a></td>\
    <td width="249"><span style=\"font-size:10px; color:#555; line-height:18px; \"><a href="http://userscripts.org/scripts/reviews/104137" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Power - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98414" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Power Bot - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98323" title="Jetzt eine Bewertung abgeben!" target="_blank">Power Tools - Deutsch</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98788" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Allianz - Extras</a><br>\
      <a href="http://userscripts.org/scripts/reviews/98234" title="Jetzt eine Bewertung abgeben!" target="_blank">KoC Attack - Deutsch</a></span></td></tr></table>\
</div>';
      t.optionsDiv.innerHTML = m;

      document.getElementById('optFoodHours').addEventListener ('change', function () {
          var x = document.getElementById('optFoodHours').value;
          if (isNaN(x) || x<0.01 || x>99999){
            document.getElementById('optFoodHours').value = Options.foodWarnHours;
            return;
          }
          Options.foodWarnHours = x;
          saveOptions();
        }, false);

      var checkbox = document.getElementById('togAllRpts');
       if (Options.enhanceARpts)
         checkbox.checked = true;
       checkbox.addEventListener ('change', function() {
       Options.enhanceARpts=document.getElementById('togAllRpts').checked; saveOptions(); AllianceReports.enable(Options.enhanceARpts);}, false);



      t.togOpt ('ptEnableFoodWarn', 'enableFoodWarn');
      t.togOpt ('ptEnableTowerAlert', 'enableTowerAlert');
      t.togOpt ('ptEnableTowerAlertEN', 'enableTowerAlertEN');
      t.togOpt ('ptEnableFoodChatAlert', 'enableFoodChatAlert');
      t.togOpt ('ptEnableFoodChatAlertEN', 'enableFoodChatAlertEN');
      t.togOpt ('togGmtClock', 'gmtClock', GMTclock.setEnable);
      t.togOpt ('togAllowAlter', 'allowAlterAR');
      t.togOpt ('togEnhanceMsging', 'enhanceMsging', messageNav.setEnable, messageNav.isAvailable);
      t.togOpt ('togWarnZero', 'fixWarnZero', WarnZeroAttack.setEnable, WarnZeroAttack.isAvailable);
      t.togOpt ('togChatStuff', 'chatEnhance', ChatStuff.setEnable, ChatStuff.isAvailable);
      t.togOpt ('togAttackPicker', 'attackCityPicker', AttackDialog.setEnable, AttackDialog.isCityPickerAvailable);
      t.togOpt ('togBatRounds', 'dispBattleRounds', null, battleReports.isRoundsAvailable);
      t.togOpt ('togKnightSelect', 'fixKnightSelect', AttackDialog.setEnable, AttackDialog.isKnightSelectAvailable);
      t.togOpt ('togCoordBox', 'mapCoordsTop', CoordBox.setEnable, CoordBox.isAvailable);
      t.togOpt ('togAtkDelete', 'reportDeleteButton', null, battleReports.isDeleteAvailable);
      t.togOpt ('togMsgCountFix', 'fixMsgCount', MessageCounts.enable, MessageCounts.isAvailable);

    } catch (e) {
      div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }
  },


  togOpt : function (checkboxId, optionName, callOnChange, callEnable,callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);

    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;

      saveOptions();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },
  changeOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
      if (callOnChange)
        callOnChange (this.value);
    }
  },

};

/********************************* Reports Tab *************************************/

Tabs.Rpt = {
	tabOrder:		100,
	tabLabel:		'Messaggi & Report',
	cont:				null,
	state:			null,
	minPages:		parseInt(Options.arPageFrom),
	maxPages:		parseInt(Options.arPageTo),
	data:				[],
	report:			[],
	totalPages:	parseInt(Options.arPageTo),
	what:				'',
	whatNot:		'',
	content:		'',

	init: function (div){
		var t = Tabs.Rpt;
		t.cont=div;
		unsafeWindow.getmsg = t.getMailBody;
		unsafeWindow.getReport = t.getReportBody;

		var tc = '<DIV class=ptstat>CERCA POSTA IN USCITA, IN ENTRATA, DEI GIOCATORI E I REPORT DELLE ALLEANZE</DIV><DIV width=150% height=100% class=ptentry><TABLE><TR align=center valign=center>';
		tc += '<TD class=xtab align=right>Tipo:&nbsp;<SELECT id="idRptType">';
		tc += '<OPTION value="alliance" ' + (Options.rptType=='alliance'?'SELECTED':'') + '>Report Alleanza</OPTION>';
		tc += '<OPTION value="player" ' + (Options.rptType=='player'?'SELECTED':'') + '>Report Giocatore</OPTION>';
		tc += '<OPTION value="inbox" ' + (Options.rptType=='inbox'?'SELECTED':'') + '>Posta in Arrivo</OPTION>';
		tc += '<OPTION value="outbox" ' + (Options.rptType=='outbox'?'SELECTED':'') + '>Posta in Uscita</OPTION></SELECT>';
		tc += '<BR />Pagine: da&nbsp;<INPUT id="idRptPageFrom" size=1 value="' + Options.arPageFrom + '"> a <INPUT id="idRptPageTo" size=1 value="' + Options.arPageTo + '"></TD>';
		tc += '<TD class=xtab align=right>Attaccante:&nbsp;<SELECT id="idRptAttacker">'; // Options.arPageFrom - Options.arPageTo
		tc += '<OPTION value="Them" ' + (Options.arAttacker=='Them'?'SELECTED':'') + '>Nemico</OPTION>';
		tc += '<OPTION value="Us" ' + (Options.arAttacker=='Us'?'SELECTED':'') + '>Noi</OPTION>';
		tc += '<OPTION value="Both" ' + (Options.arAttacker=='Both'?'SELECTED':'') + '>Entrambi</OPTION></SELECT>';
		tc += '<BR />Bersaglio:&nbsp;<SELECT id="idRptTarget">';
		tc += '<OPTION value="Them" ' + (Options.arTarget=='Them'?'SELECTED':'') + '>Nemico</OPTION>';
		tc += '<OPTION value="Us" ' + (Options.arTarget=='Us'?'SELECTED':'') + '>Noi</OPTION>';
		tc += '<OPTION value="Both" ' + (Options.arTarget=='Both'?'SELECTED':'') + '>Entrambi</OPTION></SELECT></TD>';
		tc += '<TD class=xtab align=right>Oggetto:&nbsp;<INPUT id=idRptWhat type=text size=11 maxlength=50 value=""><BR />';
		tc += 'Ma non:&nbsp;<INPUT id=idRptWhatNot type=text size=11 maxlength=50 value=""></TD>';
		tc += '<TD class=xtab align=left><INPUT id=idRptAttack type=checkbox '+(Options.arAttack?'CHECKED':'')+' />&nbsp;Attacchi<BR />';
		tc += '<INPUT id=idRptScout type=checkbox '+(Options.arScout?'CHECKED':'')+' />&nbsp;Esplorazioni</TD>';
		tc += '<TD class=xtab align=left><INPUT id=idRptReinforce type=checkbox '+(Options.arReinforce?'CHECKED':'')+' />&nbsp;Rinforzi<BR />';
		tc += '<INPUT id=idRptTransport type=checkbox '+(Options.arTransport?'CHECKED':'')+' />&nbsp;Transporti</TD>';
		tc += '<TD class=xtab align=left><INPUT id=idRptSearch type=submit value="INIZIA" /></TD></TR></TABLE></DIV>';
		tc += '<DIV class=ptstat><TABLE width=100% cellspacing=0><TR><TD class=xtab align=left width=125><DIV id=idRptSearched></DIV></TD></TD>';
		tc += '<TD class=xtab><TD class=xtab align=center><SPAN style="white-space:normal" id=idRptStatus>&nbsp;</span></TD></TD>';
		tc += '<TD class=xtab><TD class=xtab align=right width=125><DIV id=idRptFound></DIV></TD></TR></TABLE></DIV>';
		tc += '<DIV id="idRptResultsDiv" style="height:556px; max-height:556px; overflow-x:auto; overflow-y:auto; white-space:nowrap;"></DIV>';
		t.cont.innerHTML = tc;
		document.getElementById('idRptType').addEventListener ('change', t.handleRptType, false);
		document.getElementById('idRptPageFrom').addEventListener ('change', t.handleRptPages, false);
		document.getElementById('idRptPageTo').addEventListener ('change', t.handleRptPages, false);
		document.getElementById('idRptAttacker').addEventListener ('change', t.handleRptAttacker, false);
		document.getElementById('idRptTarget').addEventListener ('change', t.handleRptTarget, false);
		document.getElementById('idRptWhat').addEventListener ('keyup', t.handleRptWhat, false);
		document.getElementById('idRptWhatNot').addEventListener ('keyup', t.handleRptWhatNot, false);
		document.getElementById('idRptSearch').addEventListener ('click', t.handleRptSearch, false);
		t.togOpt ('idRptAttack', 'arAttack');
		t.togOpt ('idRptScout', 'arScout');
		t.togOpt ('idRptReinforce', 'arReinforce');
		t.togOpt ('idRptTransport', 'arTransport');

		return this.cont;
	},

	togOpt: function (checkboxId, optionName){
		var t = Tabs.Rpt;
		var checkbox = document.getElementById(checkboxId);
		checkbox.addEventListener ('change', eventHandler, false);
		function eventHandler (){
			Options[optionName] = this.checked;
			saveOptions();
			if (t.data.length > 0)
				if (Options.rptType == 'alliance' || Options.rptType == 'player')
					t.DisplayRpt();
				else
					t.DisplayMail();
		}
	},

	handleRptType: function(){
		var t = Tabs.Rpt;
		Options.rptType = document.getElementById("idRptType").value;
		saveOptions();
		document.getElementById("idRptSearched").innerHTML = '';
		document.getElementById("idRptStatus").innerHTML = '&nbsp;';
		document.getElementById("idRptFound").innerHTML = '';
		document.getElementById("idRptResultsDiv").innerHTML = '';
	},

	handleRptPages: function(){
		var t = Tabs.Rpt;
		t.minPages=parseInt(document.getElementById("idRptPageFrom").value);
		t.maxPages=parseInt(document.getElementById("idRptPageTo").value);
		if (t.maxPages < t.minPages) {
			t.maxPages = t.minPages;
			document.getElementById("idRptPageTo").value = t.maxPages;
		}
		Options.arPageFrom = t.minPages;
		Options.arPageTo = t.maxPages;
		saveOptions();
		t.totalPages=t.maxPages;
	},

	handleRptAttacker: function(){
		var t = Tabs.Rpt;
		Options.arAttacker = document.getElementById("idRptAttacker").value;
		saveOptions();
		if ((Options.rptType == 'alliance' || Options.rptType == 'player') && t.data.length > 0)
			t.DisplayRpt();
	},

	handleRptTarget: function(){
		var t = Tabs.Rpt;
		Options.arTarget = document.getElementById("idRptTarget").value;
		saveOptions();
		if ((Options.rptType == 'alliance' || Options.rptType == 'player') && t.data.length > 0)
			t.DisplayRpt();
	},

	handleRptWhat: function(){
		var t = Tabs.Rpt;
		t.what = document.getElementById("idRptWhat").value;
		if (t.data.length > 0)
			if (Options.rptType == 'alliance' || Options.rptType == 'player')
				t.DisplayRpt();
			else
				t.DisplayMail();
	},

	handleRptWhatNot: function(){
		var t = Tabs.Rpt;
		t.whatNot = document.getElementById("idRptWhatNot").value;
		if (t.data.length > 0)
			if (Options.rptType == 'alliance' || Options.rptType == 'player')
				t.DisplayRpt();
			else
				t.DisplayMail();
	},

	handleRptSearch: function(){
		var t = Tabs.Rpt;
		if (t.searchRunning){
			t.searchRunning = false;
			t.stopSearch ('RICERCA CANCELLATA!');
			return;
		}
		t.handleRptPages();
		document.getElementById ('idRptSearch').value = 'FERMA';
		document.getElementById('idRptStatus').innerHTML = 'Cerco nella pagina ' + t.minPages + ' di ' + t.maxPages;
		t.searchRunning = true;
		t.data=[];
		t.report = [];
		if (Options.rptType == 'alliance' || Options.rptType == 'player')
			t.getRpt(t.minPages);
		else
			t.getMail(t.minPages);
	},

	stopSearch: function (msg){
		var t = Tabs.Rpt;
		if (t.searchRunning || msg == 'RICERCA CANCELLATA!')
			document.getElementById ('idRptStatus').innerHTML = '<FONT color=#ffaaaa>' + msg + '</FONT>';
		document.getElementById ('idRptSearch').value = 'INIZIA';
		t.searchRunning = false;
		if (Options.rptType == 'alliance' || Options.rptType == 'player')
			t.DisplayRpt();
		else
			t.DisplayMail();
	},

	getMail: function (pageNum){
		var t = Tabs.Rpt;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.pf=0;
		params.requestType="GET_MESSAGE_HEADERS_FOR_USER_INBOX";
		params.boxType = document.getElementById('idRptType').value;
		params.pageNo = pageNum;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				t.getMailCallback(rslt, pageNum);
			},
			onFailure: function () {
			},
		}, false);
	},

	getMailCallback: function(rslt, page) {
		var t = Tabs.Rpt;
		if (rslt) {
			if (!rslt.ok) {
				document.getElementById("idRptStatus").innerHTML = '<FONT color=#ffaaaa>' + rslt.errorMsg + '</FONT>';
				return;
			}
			t.totalPages=parseInt(rslt.noOfPages);
			if (t.totalPages < t.maxPages)
				t.maxPages = t.totalPages;
			if (rslt.message && page) {
				var ml = rslt.message;
				if (rslt.messageCount > 0) {
					var rptkeys = unsafeWindow.Object.keys(ml);
					for (var i = 0; i < rptkeys.length; i++) {
						var rpt = ml[rptkeys[i]];
						rpt.page = page;
						t.data.push(rpt);
					}
				}
			}
			if (parseInt(page)+1 <= t.maxPages && t.searchRunning) {
				document.getElementById("idRptStatus").innerHTML = 'Cerco nella pagina ' + (parseInt(page)+1) + ' di ' + t.maxPages;
				t.getMail(parseInt(page)+1);
				if (t.data.length > 0)
					t.DisplayMail();
			} else if (page)
				t.stopSearch ('FINITO!');
		}
	},

	getRpt: function (pageNum){
		var t = Tabs.Rpt;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.pageNo = pageNum;
		if (Options.rptType == 'alliance')
			params.group = "a";
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt){
				t.getRptCallback (rslt, pageNum);
			},
			onFailure: function (rslt){
				t.getRptCallback (rslt, pageNum);
			},
		}, false);
	},

	getRptCallback: function(rslt, page){
		var t = Tabs.Rpt;
		if (rslt) {
			if (!rslt.ok) {
				document.getElementById("idRptStatus").innerHTML = '<FONT color=#ffaaaa>' + rslt.errorMsg + '</FONT>';
				return;
			}
			t.totalPages=parseInt(rslt.totalPages);
			if (t.totalPages < t.maxPages)
				t.maxPages = t.totalPages;
			if (rslt.arReports && page) {
				var ar = rslt.arReports;
				if (ar.length == 0)
					t.stopSearch('Pagine vuote! Da pagina ' + page + ' in poi - Anomalia Kabam');
				var rptkeys = unsafeWindow.Object.keys(ar);
				for (var i = 0; i < rptkeys.length; i++) {
					var rpt = ar[rptkeys[i]];
					var reportId = parseInt(rpt.reportId);
					t.report[reportId] = [];

					// Attacker
					t.report[reportId].side1Name = rslt.arPlayerNames['p'+rpt.side1PlayerId];
					t.report[reportId].side1AllianceId = parseInt(rpt.side1AllianceId);
					if (rpt.side1AllianceId > 0)
						t.report[reportId].side1AllianceName = rslt.arAllianceNames['a'+rpt.side1AllianceId];
					else
						t.report[reportId].side1AllianceName = 'non alleato/a';
					if (rpt.side1CityId > 0)
						t.report[reportId].side1CityName = rslt.arCityNames['c'+rpt.side1CityId];
					else
						t.report[reportId].side1CityName = 'none';
					t.report[reportId].side1XCoord = rpt.side1XCoord;
					t.report[reportId].side1YCoord = rpt.side1YCoord;
					// Target
					if (parseInt(rpt.side0PlayerId) == 0) { // Kabam
						t.report[reportId].side0Name = 'Enemy';
						t.report[reportId].side0AllianceName = '';
						t.report[reportId].side0CityName = '';
					} else { // Player
						t.report[reportId].side0Name = rslt.arPlayerNames['p'+rpt.side0PlayerId];
						if (rpt.side0AllianceId > 0)
							t.report[reportId].side0AllianceName = rslt.arAllianceNames['a'+rpt.side0AllianceId];
						else
							t.report[reportId].side0AllianceName = 'non alleato/a';
						if (rpt.side0CityId > 0)
							t.report[reportId].side0CityName = rslt.arCityNames['c'+rpt.side0CityId];
						else
							t.report[reportId].side0CityName = 'none';
					}
					t.report[reportId].side0AllianceId = parseInt(rpt.side0AllianceId);
					t.report[reportId].side0XCoord = rpt.side0XCoord;
					t.report[reportId].side0YCoord = rpt.side0YCoord;
					if (parseInt(rpt.side0TileType) == 10)
						t.report[reportId].side0TileTypeText='Grass';
					else if (parseInt(rpt.side0TileType) == 11)
						t.report[reportId].side0TileTypeText='Lake';
					else if (parseInt(rpt.side0TileType) == 20)
						t.report[reportId].side0TileTypeText='Woods';
					else if (parseInt(rpt.side0TileType) == 30)
						t.report[reportId].side0TileTypeText='Hills';
					else if (parseInt(rpt.side0TileType) == 40)
						t.report[reportId].side0TileTypeText='Mount';
					else if (parseInt(rpt.side0TileType) == 50)
						t.report[reportId].side0TileTypeText='Plain';
					else if (parseInt(rpt.side0CityId) ==0)
						t.report[reportId].side0TileTypeText='Barb';
					else
						t.report[reportId].side0TileTypeText='City';
					t.report[reportId].side0TileTypeLevel = t.report[reportId].side0TileTypeText + ' ' + rpt.side0TileLevel;
					t.report[reportId].side0TileType = rpt.side0TileType;
					t.report[reportId].side0TileLevel = rpt.side0TileLevel;
					// Miscellaneous
					t.report[reportId].page = page;
					t.report[reportId].reportUnixTime = rpt.reportUnixTime;
					if (rpt.side0AllianceId == parseInt(getMyAlliance()[0]))
						t.report[reportId].sideId = 0;
					else if (rpt.side1AllianceId == parseInt(getMyAlliance()[0])) {
						t.report[reportId].sideId = 1;
					} else { // if we're here then this is a player report from when they were in another alliance
						if (rpt.side0PlayerId == getMyUserId())
							t.report[reportId].sideId = 0;
						else if (rpt.side1PlayerId == getMyUserId())
							t.report[reportId].sideId = 1;
						else // shouldn't get here but we'll catch it if the report body is requested
							t.report[reportId].sideId = -1;
					}
					if (rpt.marchType == 0)
						t.report[reportId].marchName = 'Desertion';
					else if (rpt.marchType == 1)
						t.report[reportId].marchName = 'Transport';
					else if (rpt.marchType == 2)
						t.report[reportId].marchName = 'Reinforce';
					else if (rpt.marchType == 3) {
						if (t.report[reportId].sideId == 0)
							t.report[reportId].marchName = 'Anti-Esplorazione';
						else
							t.report[reportId].marchName = 'Esplorazione';
					} else if (rpt.marchType == 4) {
						if (t.report[reportId].sideId == 0)
							t.report[reportId].marchName = 'Difesa';
						else
							t.report[reportId].marchName = 'Attacco';
					} else
						t.report[reportId].marchName = '?';
					t.data.push ({
						reportId: reportId,
					});
				}
			}
			if (parseInt(page)+1 <= t.maxPages && t.searchRunning) {
				document.getElementById("idRptStatus").innerHTML = 'Cerco nella pagina ' + (parseInt(page)+1) + ' di ' + t.maxPages;
				t.getRpt(parseInt(page)+1);
				if (t.data.length > 0)
					t.DisplayRpt();
			} else if (page)
				t.stopSearch ('FATTO!');
		}
	},

	DisplayMail: function (){
		var t = Tabs.Rpt;
		var results = document.getElementById("idRptResultsDiv");
		if(!t.data.length) {
			results.innerHTML = '<center>TROVATO NIENTE</center>';
			return;
		}
		reportsSearched = t.data.length;
		reportsFound = 0;
		t.content = '';
		for (var i=0; i<reportsSearched;i++) {
			var rpt = t.data[i];
			if ((t.what == '' || (rpt.subject.search(t.what, "i") != -1) || (rpt.displayName.search(t.what, "i") != -1))
				&& (t.whatNot == '' || ((rpt.subject.search(t.whatNot, "i") == -1) && (rpt.displayName.search(t.whatNot, "i") == -1)))) {
				reportsFound++;
				if (reportsFound == 1)
					t.content += '<center><table><thead><th>P</th><th>Data</th><th>Da</th><th>Oggetto</th></thead><tbody>';
				t.content += '<tr><td align=right>'+rpt.page+'</td><td>'+rpt.dateSent+'</td><td>'+rpt.displayName+'</td>';
				t.content += '<td><A><SPAN onclick="getmsg('+ rpt.messageId +')">' + rpt.subject + '</SPAN></a></td></tr>';
			}
		}
		if (reportsFound > 1)
			t.content += '</tbody></table></center>';
		if (reportsFound == 0 && reportsSearched > 0)
			t.content = '<center>TROVATO NIENTE</center>';
		results.innerHTML = t.content;
		document.getElementById("idRptSearched").innerHTML = '&nbsp;Cercati: ' + reportsSearched;
		document.getElementById("idRptFound").innerHTML = 'Trovati: ' + reportsFound;
	},

	getMailBody: function(ID,dataI){
		var t = Tabs.Rpt;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.messageId=ID;
		params.requestType="GET_MESSAGE_FOR_ID";

		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok)
					t.displayMailBody(rslt.messageBody);
			},
			onFailure: function () {},
		}, false);
	},

	displayMailBody: function (messageBody) {
		var t = Tabs.Rpt;
		var popMsg = null;
		t.popMsg = new CPopup('pbMailBody', 0, 0, 670, 600, true, function() {clearTimeout (1000);});
		t.popMsg.centerMe (mainPop.getMainDiv());
		var m = '<DIV style="max-height:565px; height:565px; overflow-y:scroll">';
		m+= messageBody + '</div>';
		t.popMsg.getMainDiv().innerHTML = m;
		t.popMsg.getTopDiv().innerHTML = '<DIV align=center><B>Messaggio</B></DIV>';
		t.popMsg.show(true);
	},

	DisplayRpt: function (){
		var t = Tabs.Rpt;
		var results = document.getElementById("idRptResultsDiv");
		if(!t.data.length) {
			results.innerHTML = '<center>TROVATO NIENTE</center>';
			return;
		}
		var myAllianceId = parseInt(getMyAlliance()[0]);
		reportsSearched = t.data.length;
		reportsFound = 0;
		t.content = '';
		for (var i=0; i<reportsSearched;i++) {
			var reportId = t.data[i].reportId;
			var rpt = t.report[reportId];
			if ((rpt.side0Name=='undefined') && (rpt.marchName != 'Desertion'))
				continue;
			if ((((myAllianceId == parseInt(rpt.side1AllianceId) && Options.arAttacker != 'Them')
				|| (myAllianceId != parseInt(rpt.side1AllianceId) && Options.arAttacker != 'Us')
				|| Options.arAttacker == 'Both')
				&& ((myAllianceId == parseInt(rpt.side0AllianceId) && Options.arTarget != 'Them')
				|| (myAllianceId != parseInt(rpt.side0AllianceId) && Options.arTarget != 'Us')
				|| Options.arTarget == 'Both')
				&& ((Options.arAttack && (rpt.marchName == 'Attacco' || rpt.marchName == 'Difesa'))
				|| (Options.arScout && (rpt.marchName == 'Esplorazione' || rpt.marchName == 'Anti-Esplorazione'))
				|| (Options.arReinforce && rpt.marchName == 'Reinforce')
				|| (Options.arTransport && rpt.marchName == 'Transport')))
				|| (rpt.marchName == 'Desertion')) {
				if (((t.what == ''
					|| (rpt.side1Name.search(t.what, "i") != -1)
					|| (rpt.side1AllianceName.search(t.what, "i") != -1)
					|| (rpt.side0Name.search(t.what, "i") != -1)
					|| (rpt.side0AllianceName.search(t.what, "i") != -1)
					|| (rpt.side0TileTypeText.search(t.what, "i") != -1))
					&& (t.whatNot == ''
					|| ((rpt.side1Name.search(t.whatNot, "i") == -1)
					&& (rpt.side1AllianceName.search(t.whatNot, "i") == -1)
					&& (rpt.side0Name.search(t.whatNot, "i") == -1)
					&& (rpt.side0AllianceName.search(t.whatNot, "i") == -1)
					&& (rpt.side0TileTypeText.search(t.whatNot, "i") == -1))))
					|| (rpt.marchName == 'Desertion')) {
					reportsFound++;
					if (reportsFound == 1) {
						if (Options.enableReportNumber)
							t.content += '<center><table><thead><th>P</th><th>Data</th><th>Report</th><th>Attaccante</th><th>Da</th>';
						else
							t.content += '<center><table><thead><th>P</th><th>Date</th><th>Attaccante</th><th>Da</th>';
						if (Options.arAttacker != 'Us')
							t.content += '<th>Alleanza</th>';
						t.content += '<th>Azione</th><th>Bersaglio</th><th>Tipo</th><th>A</th>';
						if (Options.arTarget != 'Us')
							t.content += '<th>Alleanza</th>';
						t.content += '<th>Dist</th><th>Piu\' Vicino</th></thead><tbody>';
					}
					var closestDist=999999;
					var closestLoc=null;
					var closestNum=1;
					for (var c=0; c<Cities.numCities; c++){
						var city = Cities.cities[c];
						city.x +','+ city.y
						var dist=distance(city.x,city.y,rpt.side0XCoord,rpt.side0YCoord);
						if(dist<closestDist) {
							closestDist=dist;
							closestLoc=city.x +','+ city.y;
							closestNum=c+1;
						}
					}
					t.content += '<tr><td align=right>'+rpt.page+'</td><td>'+formatUnixTime(rpt.reportUnixTime,'24hour')+'</td>';
					if (Options.enableReportNumber)
						t.content += '<td>' + reportId + '</td>';
					if (rpt.marchName == 'Desertion') {
						t.content += '<td></td><td></td>';
						if (Options.arAttacker != 'Us')
							t.content += '<td></td>';
						t.content += '<td>'+rpt.marchName+'</td><td></td><td></td><td></td>';
						if (Options.arAttacker != 'Us')
							t.content += '<td></td>';
						t.content += '<td></td><td></td>';
						} else {
						t.content += '<td>'+rpt.side1Name+'</td><td align=center><A onclick="ptGotoMap('+ rpt.side1XCoord +','+ rpt.side1YCoord +')">'+ rpt.side1XCoord +','+ rpt.side1YCoord +'</a></td>';
						if (Options.arAttacker != 'Us')
							t.content += '<td>'+rpt.side1AllianceName+'</td>';
						t.content += '<td><A><SPAN onclick="getReport('+ reportId+')">'+rpt.marchName+'</span></a></td>';
						t.content += '<td>'+rpt.side0Name+'</td><td>'+rpt.side0TileTypeLevel+'</td>';
						t.content += '<td align=center><A onclick="ptGotoMap('+ rpt.side0XCoord +','+ rpt.side0YCoord +')">'+ rpt.side0XCoord +','+ rpt.side0YCoord +'</a></td>';
						if (Options.arTarget != 'Us')
							t.content += '<td>'+rpt.side0AllianceName+'</td>';
						t.content += '<td align=right>'+Math.floor(closestDist)+'</td><td align=center><A onclick=\"ptGotoCity(' + closestNum + ')\">' + closestLoc + '</a></td></tr>';
					}
				}
			}
		}
		if (reportsFound > 1)
			t.content += '</tbody></table></center>';
		if (reportsFound == 0 && reportsSearched > 0)
			t.content = '<center>TROVATO NIENTE</center>';
		results.innerHTML = t.content;
		document.getElementById("idRptSearched").innerHTML = '&nbsp;Cercati: ' + reportsSearched;
		document.getElementById("idRptFound").innerHTML = 'Trovati: ' + reportsFound;
	},

	getReportBody: function(reportId){
		var t = Tabs.Rpt;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		//params.pf=0;
		params.rid=reportId;
		params.side=t.report[reportId].sideId;
		if (params.side > -1) {
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchReport.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					t.displayReportBody(rslt,reportId);
				},
				onFailure: function (rslt) {},
			}, false);
		} else {
			unsafeWindow.alert ('Could not determine which side of the report to view - please send details to the developer');
		}
	},

	displayReportBody: function (rslt, reportId) {
		var t = Tabs.Rpt;
		var popReport = null;
		var rpt = t.report[reportId];
		var m = '';
		var unitImg = [];
		for (var i=1;i<13;i++)
			unitImg[i] = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+i+'_30.png></TD><TD>' + unsafeWindow.unitcost['unt'+i][0];
		unitImg[53] = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_53_30.png></TD><TD>Balestre';
		unitImg[55] = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_55_30.png></TD><TD>Trabucchi';
		unitImg[60] = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_60_30.png></TD><TD>Trappole';
		unitImg[61] = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_61_30.png></TD><TD>Triboli';
		unitImg[62] = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_62_30.png></TD><TD>Barriera Spuntoni';
		goldImg = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png></TD><TD>Oro';
		foodImg = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png></TD><TD>Cibo';
		woodImg = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png></TD><TD>Legno';
		stoneImg = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png></TD><TD>Pietra';
		oreImg = '<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png></TD><TD>Minerali';

		
		function buildHeader () {
			var h='<TABLE class=ptTab width=100%>';
			h+='<TR valign=top><TD align=left width=10%><B>';
			if (rpt.marchName == 'Anti-Esplorazione' || rpt.marchName == 'Esplorazione')
				h+=rpt.marchName+'ing at';
			else if (rpt.marchName == 'Attacco' || rpt.marchName == 'Difesa')
				h+='Battaglia a ';
			else if (rpt.marchName == 'Reinforce' || rpt.marchName == 'Transport')
				h+=rpt.marchName+' from<BR />'+rpt.marchName+' to</B>';

			if (rpt.side0TileTypeText == 'Barb')
				h+=' Barbarian Camp Level ' + rpt.side0TileLevel;
			else if (rpt.side0TileTypeText != 'City')
				h+=' '+rpt.side0TileTypeText+' Level '+ rpt.side0TileLevel+' ';
			h+='</B></TD>';

			if (rpt.marchName == 'Reinforce' || rpt.marchName == 'Transport') {
				h+='<TD align=left width=1%>';
				if (Seed.player.name != rpt.side1Name)
					h+=rpt.side1Name;
				if (Seed.player.name != rpt.side0Name)
					h+='<BR />'+rpt.side0Name;
				h+='</TD>';
			}
			h+='<TD align=left width=5%>';

			if (rpt.marchName == 'Reinforce' || rpt.marchName == 'Transport')
				h+='(<A onclick="ptGotoMap('+ rpt.side1XCoord +','+ rpt.side1YCoord +')">'+ rpt.side1XCoord +','+ rpt.side1YCoord +'</a>)<BR />';
			h+='(<A onclick="ptGotoMap('+ rpt.side0XCoord +','+ rpt.side0YCoord +')">'+ rpt.side0XCoord +','+ rpt.side0YCoord +'</a>)</TD>';

			if (rpt.side0TileTypeText != 'City' && rpt.side0TileTypeText != 'Barb' && rpt.marchName == 'Attacco') {
				if (rslt['conquered']==1)
					h+='<TD><FONT color="#CC0000"><B>Conquered</B></font></td>';
				else if (rslt['conquered']==0)
					h+='<TD><FONT color="#66CC33"><B>Secured</B></font></td>';
			} else if (rpt.marchName == 'Reinforce' || rpt.marchName == 'Transport') {
				h+='<TD align=left width=5%>'+rpt.side1CityName+'<BR />';
				if (rpt.side0CityName != '')
					h+=rpt.side0CityName+'</TD>';
				else
					h+=rpt.side0TileTypeText+' Level '+ rpt.side0TileLevel+'</TD>';
			}

			h+='<TD align=right>' + formatUnixTime(rpt.reportUnixTime,'24hour') + '<BR />Resoconto #: ' + reportId + '</TD></TR></TABLE>';
			return h;
		}

		function handleunts () { // Troops sent to Reinforce or troops found on a Scout
			var hunts = '', th = '', tc = '', tf = '';
			if (rslt['unts'] != undefined) {
				if (rpt.marchName == 'Reinforce')
					th='<TABLE class=ptTab><TR><TH colspan=3 align=left>Troops Reinforced</TH></TR>';
				else if (rslt['unts']['u1'] != undefined || rslt['unts']['u2'] != undefined || rslt['unts']['u3'] != undefined || rslt['unts']['u4'] != undefined || rslt['unts']['u5'] != undefined || rslt['unts']['u6'] != undefined || rslt['unts']['u7'] != undefined || rslt['unts']['u8'] != undefined || rslt['unts']['u9'] != undefined || rslt['unts']['u10'] != undefined || rslt['unts']['u11'] != undefined || rslt['unts']['u12'] != undefined)
					th='<TABLE class=ptTab><TR><TH colspan=3 align=left>Truppe Trovate</TH></TR>';
				for (var i=1;i<13;i++)
					if (rslt['unts']['u'+i] != undefined)
						tc+='<TR><TD>' + unitImg[i] + '</TD><TD align=right>'+addCommas(rslt['unts']['u'+i])+'</TD></TR>';
				tf='</TABLE>';
			}
			if (tc != '')
				hunts = th + tc + tf;
			return hunts;
		}

		function handlersc () { // Resources brought with reinforcements or found on a Scout
			var hrsc = '', th = '', tc = '', tf = '';
			if (rslt['rsc'] != undefined) {
				if (rslt['rsc']['r1'] > 0 || rslt['rsc']['r2'] > 0 || rslt['rsc']['r3'] > 0 || rslt['rsc']['r4'] > 0) {
					if (rpt.marchName == 'Reinforce')
						th='<TABLE class=ptTab><TR><TH colspan=3 align=left>Risorse Perse</TH></TR>';
					else {
						th='<TABLE class=ptTab><TR><TH colspan=3 align=left>Risorse Trovate</TH></TR>';
						if (rslt['gld'] > 0)
							tc+='<TR><TD>'+goldImg+'</TD><TD align=right>'+addCommasInt(rslt['gld'])+'</TD></TR>';
					}
					if (rslt['rsc']['r1'] > 0)
						tc+='<TR><TD>'+foodImg+'</TD><TD align=right>'+addCommasInt(rslt['rsc']['r1'])+'</TD></TR>';
					if (rslt['rsc']['r2'] > 0)
						tc+='<TR><TD>'+woodImg+'</TD><TD align=right>'+addCommasInt(rslt['rsc']['r2'])+'</TD></TR>';
					if (rslt['rsc']['r3'] > 0)
						tc+='<TR><TD>'+stoneImg+'</TD><TD align=right>'+addCommasInt(rslt['rsc']['r3'])+'</TD></TR>';
					if (rslt['rsc']['r4'] > 0)
						tc+='<TR><TD>'+oreImg+'</TD><TD align=right>'+addCommasInt(rslt['rsc']['r4'])+'</TD></TR>';
					tf='</TABLE>';
				}
			}
			if (tc != '')
				hrsc = th + tc + tf;
			return hrsc;
		}

		function handlefrt () { // Fortifications found on a Scout
			var hfrt = '', th = '', tc = '', tf = '';
			if (rslt['frt'] != 'undefined') {
				if (rslt['frt']['f53'] != undefined || rslt['frt']['f55'] != undefined || rslt['frt']['f60'] != undefined || rslt['frt']['f61'] != undefined || rslt['frt']['f62'] != undefined) {
					th='<TABLE class=ptTab><TR><TH colspan=3 align=left>Difese Trovate</TH></TR>';
					if (rslt['frt']['f53'] != undefined)
						tc+='<TR><TD>' + unitImg[53] + '</TD><TD align=right>'+addCommas(rslt['frt']['f53'])+'</TD></TR>';
					if (rslt['frt']['f55'] != undefined)
						tc+='<TR><TD>' + unitImg[55] + '</TD><TD align=right>'+addCommas(rslt['frt']['f55'])+'</TD></TR>';
					if (rslt['frt']['f60'] != undefined)
						tc+='<TR><TD>' + unitImg[60] + '</TD><TD align=right>'+addCommas(rslt['frt']['f60'])+'</TD></TR>';
					if (rslt['frt']['f61'] != undefined)
						tc+='<TR><TD>' + unitImg[61] + '</TD><TD align=right>'+addCommas(rslt['frt']['f61'])+'</TD></TR>';
					if (rslt['frt']['f62'] != undefined)
						tc+='<TR><TD>' + unitImg[62] + '</TD><TD align=right>'+addCommas(rslt['frt']['f62'])+'</TD></TR>';
					tf='</TABLE>';
				}
			}
			if (tc != '')
				hfrt = th + tc + tf;
			return hfrt;
		}

		function handleblds (bType) {
			var blds = rslt['blds']['b'+bType]; b = '<TR><TD>'; arField = [], firstbld = true;
			if (bType == 1)
				b+='Farm';
			else if (bType == 2)
				b+='Sawmill';
			else if (bType == 3)
				b+='Quarry';
			else if (bType == 4)
				b+='Mine';
			b+='</TD><TD>';
			for (var i=1; i<12; i++)
				arField[i]=0;
			for (var i=0; i < blds.length; i++)
				arField[blds[i]]++
			for (var i=11; i>0; i--) {
				if (arField[i] > 0) {
					if (firstbld)
						firstbld = false;
					else
						b+=', ';
					if (arField[i] > 1)
						b+=arField[i] + ' x ';
					b+=' ' + i;
				}
			}
			b+='</TD></TR>';
			return b;
		}

		if (rpt.marchName == 'Reinforce') {
			t.popReport = new CPopup('pbShowRein', 0, 0, 525, 340, true, function() {clearTimeout (1000);});
			m+= '<DIV style="height:285px">';
		} else if (rpt.marchName == 'Transport') {
			t.popReport = new CPopup('pbShowTrans', 0, 0, 525, 240, true, function() {clearTimeout (1000);});
			m+= '<DIV style="height:185px">';
		} else if (rpt.marchName == 'Esplorazione' && rslt['winner']==1 && rpt.sideId==1){
			t.popReport = new CPopup('pbShowOther', 0, 0, 550, 740, true, function() {clearTimeout (1000);});
			m+= '<DIV style="max-height:705px; height:705px; overflow-y:scroll">';
		} else {
			t.popReport = new CPopup('pbShowOther', 0, 0, 550, 680, true, function() {clearTimeout (1000);});
			m+= '<DIV style="max-height:645px; height:645px; overflow-y:scroll">';
		}
		t.popReport.centerMe (mainPop.getMainDiv());

		m+=buildHeader();

		if (rpt.marchName == 'Transport') { // Transport
			m+='<TABLE class=ptTab>'; // Only transports have these in rslt, so handle them here
			if (parseInt(rslt['gold']) > 0)
				m+='<TR><TD>'+goldImg+'</TD><TD align=right>'+addCommas(rslt['gold'])+'</TD></TR>';
			if (parseInt(rslt['resource1']) > 0)
				m+='<TR><TD>'+foodImg+'</TD><TD align=right>'+addCommas(rslt['resource1'])+'</TD></TR>';
			if (parseInt(rslt['resource2']) > 0)
				m+='<TR><TD>'+woodImg+'</TD><TD align=right>'+addCommas(rslt['resource2'])+'</TD></TR>';
			if (parseInt(rslt['resource3']) > 0)
				m+='<TR><TD>'+stoneImg+'</TD><TD align=right>'+addCommas(rslt['resource3'])+'</TD></TR>';
			if (parseInt(rslt['resource4']) > 0)
				m+='<TR><TD>'+oreImg+'</TD><TD align=right>'+addCommas(rslt['resource4'])+'</TD></TR>';
			m+='</TABLE>';
		}

		m+='<TABLE class=ptTab>';
		if ((rslt['winner']==1 && rpt.sideId==0) || (rslt['winner']==0 && rpt.sideId==1)) {
			if (rpt.marchName == 'Esplorazione')
				m+='<TR><TD><FONT color="#CC0000"><B>Esplorazione Fallita!</B></font></TD></TR>';
			else
				m+='<TR><TD><FONT color="#CC0000"><B>Sei stato sconfitto!</B></font></TD></TR>';
		}
		if (rslt['winner']==0 && rpt.sideId==0)
			m+='<TR><TD><FONT color="#66CC33"><B>La tua difesa ha avuto successo!</B></font></TD></TR>';
		if (rslt['winner']==1 && rpt.sideId==1) {
			if (rpt.marchName == 'Esplorazione')
				m+='<TR><TD><FONT color="#66CC33"><B>Report Esplorazione</B></font></TD></TR>';
			else
				m+='<TR><TD><FONT color="#66CC33"><B>Tu sei vincitore!</B></font></TD></TR>';
		}

		if (rslt['wall'] != undefined) {
			if (rslt['wall'] == 100)
				m+='<TR><TD>Gli attaccanti hanno fatto breccia sulle mura!</TD></TR>';
			else
				m+='<TR><TD>Gli attaccanti non hanno fatto breccia sulle mura. Le mura sono '+rslt['wall']+'% danneggiate</TD></TR>';
		}
		m+= '</TABLE><BR />';

		if (rslt['loot'] != undefined) {
			m+='<TABLE class=ptTab>';
			if (rslt['loot'][0] > 0)
				m+='<TR><TD>'+goldImg+'</TD><TD align=right>'+addCommas(rslt['loot'][0])+'</TD></TR>';
			if (rslt['loot'][1] > 0)
				m+='<TR><TD>'+foodImg+'</TD><TD align=right>'+addCommas(rslt['loot'][1])+'</TD></TR>';
			if (rslt['loot'][2] > 0)
				m+='<TR><TD>'+woodImg+'</TD><TD align=right>'+addCommas(rslt['loot'][2])+'</TD></TR>';
			if (rslt['loot'][3] > 0)
				m+='<TR><TD>'+stoneImg+'</TD><TD align=right>'+addCommas(rslt['loot'][3])+'</TD></TR>';
			if (rslt['loot'][4] > 0)
				m+='<TR><TD>'+oreImg+'</TD><TD align=right>'+addCommas(rslt['loot'][4])+'</TD></TR>';
			if (rslt['loot'][5] != undefined) {
				for (var crest=1101; crest < 1116; crest++) {
					if (rslt['loot'][5][crest] == 1)
						m+='<TR><TD><img width=30 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/' + crest + '.png></TD><TD colspan=2>' + crestname[crest] + '</TD></TR>';
				}
			}
			m+='</TABLE><BR />';
		}

		if (rpt.marchName == 'Reinforce') {
			m+=handleunts();
			m+=handlersc();
		}

		if (rpt.marchName == 'Esplorazione' && rslt['winner']==1) {
			m+='<TABLE class=ptTab width=100%><TR><TD width=50% align=left valign=top>';
			m+=handleunts();
			m+=handlefrt();
			m+=handlersc();
			m+='</TD><TD width=50% align=left valign=top>';
			m+='<TABLE class=ptTab width=100%>';
			if (rslt['lstlgn'] != undefined) {
				if (!rslt['lstlgn'])
					m+='<TR><TD>Ultimo Accesso: No registrato</TD></TR>';
				else
					m+='<TR><TD>Ultimo Accesso: ' + formatUnixTime(rslt['lstlgn']) + '</TD></TR>';
			}
			m+='<TR><TD>Combattimento Maresciallo: ';
			if (rslt['knt'] != undefined)
				m+=rslt['knt']['cbt'];
			else
				m+='None';
			m+='</TD></TR>';
			if (rslt['pop'] != undefined)
				m+='<TR><TD>Popolazione: ' + addCommas(rslt['pop']) + '</TD></TR>';
			if (rslt['hap'] != undefined)
				m+='<TR><TD>Felicita\': ' + addCommas(rslt['hap']) + '</TD></TR></TABLE>';
			if (rslt['blds']['b1'] != undefined || rslt['blds']['b2'] != undefined || rslt['blds']['b3'] != undefined || rslt['blds']['b4'] != undefined) {
				m+='<TABLE class=ptTab><TR><TH colspan=2 align=left>Terre</TH></TR>';
				for (var i=1; i<5; i++)
					if (rslt['blds']['b'+i] != undefined)
						m+=handleblds(i);
				m+='</TABLE>';
			}
			if (rslt['tch'] != undefined) {
				m+='<TABLE class=ptTab><TR><TH colspan=2 align=left>Ricerche</TH></TR>';
				for (var tl=1; tl < 17; tl++)
					if (tl != 7)
						m+='</TD></TR><TR><TD>'+researchLevels[tl].Name+'</TD><TD align=right>' + rslt['tch']['t'+tl] + '</TD></TR>';
				m+='</TABLE>';
			}
			m+='</TD></TR></TABLE>';
		}

		if (rslt['fght'] != undefined){ // not Reinforce or Transport, so we have a table with 2 columns: 1 for Attackers, 1 for Defenders
			m+='<TABLE class=ptTab width=100%><TR><TD width=50% align=left valign=top>';
			m+='<TABLE class=ptTab width=100%>';
			m+='<TR><TD colspan=4><B>Attaccante</B> ('+rpt.side1Name+')';
			if (rslt['winner']==1)
				m+='<FONT color="#CC0000"><B> Vincitore</B></FONT>';
			m+='</TD></TR>';
			if (rpt.marchName == 'Attacco' || rpt.marchName == 'Difesa')
				m+='<TR><TD colspan=4>Abilita\' Combattimento del Cavaliere: ' + rslt['s1KCombatLv'] + '</TD></TR>';
			m+='<TR><TD colspan=4>Attacco Rinforzato: ' + 100*rslt['s1atkBoost'] + '%</TD></TR>';
			m+='<TR><TD colspan=4>Difesa Rinforzato: ' + 100*rslt['s1defBoost'] + '%</TD></TR>';
			m+='<TR><TD colspan=4>(<A onclick="ptGotoMap('+ rpt.side1XCoord +','+ rpt.side1YCoord +')">'+ rpt.side1XCoord +','+ rpt.side1YCoord +'</a>) ' + rpt.side1CityName + '</TD></TR>';
			if (rslt['fght']["s1"] != undefined) {
				m+='<TR><TH></TH><TH align=left>Truppe</TH><TH align=right>Combattuto</TH><TH align=right>Sopravvissuto</TH></TR>';
				for (var i=1;i<13;i++) {
					if (rslt['fght']["s1"]['u'+i] != undefined) {
						if (rslt['fght']["s1"]['u'+i][0] > rslt['fght']["s1"]['u'+i][1]) {
							m+='<TR><TD>' + unitImg[i] + '</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s1"]['u'+i][0])+'</td>';
							m+='<TD align=right><FONT color="#CC0000">'+addCommas(rslt['fght']["s1"]['u'+i][1])+'</FONT></td></tr>';
						} else {
							m+='<TR><TD>' + unitImg[i] + '</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s1"]['u'+i][0])+'</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s1"]['u'+i][1])+'</td></tr>';
						}
					}
				}
			}
			m+='</TABLE></TD><TD width=50% align=right valign=top>';
			m+='<TABLE class=ptTab width=100%>';
			m+='<TR><TD colspan=4><B>Difensore</B> ('+rpt.side0Name+')';
			if (rslt['winner']==0)
				m+='<FONT color="#CC0000"><B> Vincitore</B></FONT>';
			m+='</TD></TR>';
			if (rpt.marchName == 'Attacco' || rpt.marchName == 'Difesa')
				m+='<TR><TD colspan=4>Abilita\' Combattimento del Cavaliere: ' + rslt['s0KCombatLv'] + '</TD></TR>';
			if (rslt['s0atkBoost'] != undefined)
				m+='<TR><TD colspan=4>Attacco Rinforzato: ' + 100*rslt['s0atkBoost'] + '%</TD></TR>';
			else
				m+='<TR><TD colspan=4>&nbsp;</TD></TR>';
			if (rslt['s0defBoost'] != undefined)
				m+='<TR><TD colspan=4>Difesa Rinforzato: ' + 100*rslt['s0defBoost'] + '%</TD></TR>';
			else
				m+='<TR><TD colspan=4>&nbsp;</TD></TR>';
			m+='<TR><TD colspan=4>Rounds: ' + rslt['rnds'] + '</TD></TR>';
			if (rslt['fght']["s0"] != undefined) {
				m+='<TR><TH></TH><TH align=left>Truppe</TH><TH align=right>Combattuto</TH><TH align=right>Sopravvissuto</TH></TR>';
				for (var i=1;i<13;i++) {
					if (rslt['fght']["s0"]['u'+i] != undefined) {
						if (rslt['fght']["s0"]['u'+i][0] > rslt['fght']["s0"]['u'+i][1]) {
							m+='<TR><TD>' + unitImg[i] + '</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s0"]['u'+i][0])+'</td>';
							m+='<TD align=right><FONT color="#CC0000">'+addCommas(rslt['fght']["s0"]['u'+i][1])+'</FONT></td></tr>';
						} else {
							m+='<TR><TD>' + unitImg[i] + '</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s0"]['u'+i][0])+'</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s0"]['u'+i][1])+'</td></tr>';
						}
					}
				}
				for (var i=53;i<=55;i++) {
					if (rslt['fght']["s0"]['f'+i] != undefined) {
						if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) {
							m+='<TR><TD>' + unitImg[i] + '</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s0"]['f'+i][0])+'</td>';
							m+='<TD align=right><FONT color="#CC0000">'+addCommas(rslt['fght']["s0"]['f'+i][1])+'</font></td></tr>';
						} else {
							m+='<TR><TD>' + unitImg[i] + '</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s0"]['f'+i][0])+'</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s0"]['f'+i][1])+'</td></tr>';
						}
					}
				}
				for (var i=60;i<=63;i++) {
					if (rslt['fght']["s0"]['f'+i] != undefined) {
						if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) {
							m+='<TR><TD>' + unitImg[i] + '</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s0"]['f'+i][0])+'</td>';
							m+='<TD align=right><FONT color="#CC0000">'+addCommas(rslt['fght']["s0"]['f'+i][1])+'</font></td></tr>';
						} else {
							m+='<TR><TD>' + unitImg[i] + '</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s0"]['f'+i][0])+'</td>';
							m+='<TD align=right>'+addCommas(rslt['fght']["s0"]['f'+i][1])+'</td></tr>';
						}
					}
				}
			} else
				m+='<TR><TD>Nessuna Truppa in Difesa</TD></TR>';
			m+='</TABLE></TD></TR></TABLE>';
		}

		m+='</DIV>';
		t.popReport.getMainDiv().innerHTML = m;
		t.popReport.getTopDiv().innerHTML = '<DIV align=center><B>'+rpt.marchName+' Report</B></DIV>';
		t.popReport.show(true);
	},

	show: function (){
	},

	hide: function (){
	},
};

/**************/

var messageNav = {
	old_modal_messages: unsafeWindow.modal_messages,
	old_modal_messages_send: unsafeWindow.modal_messages_send,

	init: function (){
		alterUwFunction ('modal_messages', [[/}\s*$/, 'setTimeout(messageNav_hook,0); }']]);
		alterUwFunction ('modal_messages_send', [[/{\s*var params/i, '{\nif (modal_messages_send_hook()) return;\nvar params']]);
		unsafeWindow.messageNav_hook = messageNav.hook;
		unsafeWindow.modal_messages_send_hook = messageNav.msgSendHook;
	},

	enable: function (tf){
		t = messageNav;
		Options.enhanceMsging = tf;
		saveOptions();
		unsafeWindow.modal_messages = t.old_modal_messages;
		unsafeWindow.modal_messages_send = t.old_modal_messages_send;
		if (tf){
			alterUwFunction ('modal_messages', [[/}\s*$/, 'setTimeout(messageNav_hook,0); }']]);
			alterUwFunction ('modal_messages_send', [[/{\s*var params/i, '{\nif (modal_messages_send_hook()) return;\nvar params']]);
		}
	},

	hook: function (){
		var div = document.getElementById('modal_msg_view_actions');
		var but = makeButton20('Inoltra');
		div.appendChild (but);
		but.addEventListener ('click', messageNav.eventForward, false);
		div = document.getElementById('modal_msg_write_to').parentNode;
		div.innerHTML = '<TABLE><TR><TD class=xtab><b>A:</b> <INPUT type=text id=modal_msg_write_to></td><TD class=xtab><SPAN id=ptfwdbut></span></td></tr></table>';
		var button = makeButton20('Tutti gli Ufficali');
		document.getElementById('ptfwdbut').appendChild (button);
		button.addEventListener ('click', function (){document.getElementById("modal_msg_write_to").value = "<ufficiali>"}, false);
	},

	eventForward: function (){
		document.getElementById('modal_msg_write_subj').value = "INOLTRA: " + document.getElementById('modal_msg_view_subj').innerHTML.toString().stripTags();
		document.getElementById('modal_msg_write_to').value = '';
		var from = document.getElementById('modal_msg_view_from').children[0].innerHTML;
		var body = document.getElementById('modal_msg_view_body').innerHTML.replace(/\n/g, '').replace(/<br>/gi, '\n').stripTags().replace (/back$/i, '');
		document.getElementById('modal_msg_write_txt').value = '[Messaggio originale inviato a me da '+ from +' inoltrato a te:]\n'+ body;
		unsafeWindow.modal_messages_compose();
	},

	msgSendHook: function (){
		var to = document.getElementById("modal_msg_write_to").value.trim();
		if (to.toLowerCase() != '<ufficiali>' || getMyAlliance()[0]==0)
			return false;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.toIds = getMyAlliance()[0];
		params.subject = document.getElementById("modal_msg_write_subj").value +' [Inviato agli Ufficiali]';
		params.message = document.getElementById("modal_msg_write_txt").value;
		params.type = 'alliance';
		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendMessage.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (message) {
				var rslt = eval("(" + message.responseText + ")");
				if (rslt.ok) {
					unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.msgsent);
					document.getElementById('modal_msg_write_to').value = "";
					document.getElementById('modal_msg_write_subj').value = "";
					document.getElementById('modal_msg_write_txt').value = ""
				} else {
					unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.enterexistingname)
				}
			},
			onFailure: function () {
				unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.oopscompose)
			},
		});
		return true;
	},
}

var AttackDialog = {
	init: function (){
		var t = AttackDialog;
		t.modal_attackFunc = new CalterUwFunc ('modal_attack', [[/}\s*$/, 'attackDialog_hook(); }']]);
		unsafeWindow.attackDialog_hook = t.modalAttackHook;
		t.modal_attackFunc.setEnable (true);
	},

	setEnable: function (){
	},

	isKnightSelectAvailable: function (){
		var t = AttackDialog;
		return t.modal_attackFunc.isAvailable();
	},

	isAttackCityPickerAvailable: function (){
		var t = AttackDialog;
		return t.modal_attackFunc.isAvailable();
	},

	modalAttackHook: function (){
		var t = AttackDialog;
		if (Options.attackCityPicker){
			for (var i=1; i<6; i++)
				document.getElementById('modal_attack_tab_'+ i).addEventListener('click', t.e_changeMarchType, false);
			setTimeout (t.initCityPicker, 0);
		}
	},

	initCityPicker: function (){
		var t = AttackDialog;
		var div = document.getElementById('modal_attack_target_numflag');
		var mySpan;
		if (div)
			div.parentNode.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
		else {
			var span = document.getElementById('modal_attack_target_coords');
			span.parentNode.parentNode.firstChild.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
		}
		new CdispCityPicker ('ptatp', document.getElementById('modal_attack_citybuts'), false, t.e_CityButton);
		var cityIdx = Cities.byID[unsafeWindow.currentcityid].idx;
		thisCityBut = document.getElementById('ptatp_'+ cityIdx);
		thisCityBut.style.opacity = '0.5';
		thisCityBut.disabled = true;
		if (document.getElementById('modal_attack_tab_4').className=='selected' || document.getElementById('modal_attack_tab_3').className=='selected') // don't do for attack or scout
			document.getElementById('modal_attack_citybuts').style.display = 'none';
	},

	e_CityButton: function (city){
		document.getElementById('modal_attack_target_coords_x').value = city.x;
		document.getElementById('modal_attack_target_coords_y').value = city.y;
		unsafeWindow.modal_attack_update_time();
	},

	e_changeMarchType: function (evt){
		var t = AttackDialog;
		var marchType = parseInt(evt.target.id.substr(17));
		if (Options.attackCityPicker){
			if (marchType==3 || marchType==4)
				document.getElementById('modal_attack_citybuts').style.display = 'none';
			else
				document.getElementById('modal_attack_citybuts').style.display = 'inline';
		}
	},
}

var AllianceReports = {
	checkPeriod:		300,
	allianceNames:	[],
	saveArfunc:			unsafeWindow.allianceReports,

	init: function (){
		t = AllianceReports;
		t.enable (Options.enhanceARpts);
		t.marvFunc = new CalterUwFunc ('modal_alliance_report_view', [['getReportDisplay', 'getReportDisplay_hook2']]);
		unsafeWindow.getReportDisplay_hook2 = t.getReportDisplayHook;
		t.marvFunc.setEnable (true);
	},

	getReportDisplayHook: function (a, b){
		var x = '';
		try {
			x = unsafeWindow.getReportDisplay(a,b);
		} catch (e){
			x = '&nbsp;&nbsp;&nbsp;&nbsp;Error formatting report: '+ e;
		}
		return x;
	},

	enable: function (tf){
		t = AllianceReports;
		if (tf)
			unsafeWindow.allianceReports = t.myAllianceReports;
		else
			unsafeWindow.allianceReports = t.saveArfunc;
	},

	myAllianceReports: function (pageNum){
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		if (pageNum)
			params.pageNo = pageNum;
		params.group = "a";
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				displayReports (rslt.arReports, rslt.arPlayerNames, rslt.arAllianceNames, rslt.arCityNames, rslt.totalPages);
			},
			onFailure: function (rslt) {
			},
		}, false);

		function tidyPlayerName (playerName){ // replaces single quote characters with the HTML code for a single quote without messing up the table
			return playerName.replace(/'/g,"&#39;");
		}

		function displayReports (ar, playerNames, allianceNames, cityNames, totalPages){
			var msg = new Array();
			var myAllianceId = getMyAlliance()[0];
			msg.push ("<STYLE>.msgviewtable tbody .myCol div {margin-left:5px; overflow:hidden; white-space:nowrap; color:#000}\
						.msgviewtable tbody .myHostile div {font-weight:600; color:#600}\
						.msgviewtable tbody .myGray div {color:#666}\
						.msgviewtable tbody .myRein div {color:#050}\
						.msgviewtable tbody .myWarn div {font-weight:600; color:#442200}\
						</style>");
			msg.push("<div class='modal_msg_reports'>");
			var rptkeys = unsafeWindow.Object.keys(ar);
			if (matTypeof(ar) != 'array') {
				if (Options.allowAlterAR) {
					msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
					msg.push("<thead><tr><td width=105>Data</td><td width=40>Type</td><td width=150>Attacker</td><td>Target</td><td>View</td><td>Dist</td><td>Nearest</td></tr></thead><tbody>");
				} else {
					msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
					msg.push("<thead><tr><td width=105>Date</td><td width=40>Type</td><td width=150>Attacker</td><td>Target</td><td>View</td></tr></thead><tbody>");
				}
				for (var i = 0; i < rptkeys.length; i++) {
					var rpt = ar[rptkeys[i]];
					var colClass = '"myCol"';
					rpt.marchType = parseInt(rpt.marchType);
					rpt.side0AllianceId = parseInt(rpt.side0AllianceId);
					var targetDiplomacy = getDiplomacy (rpt.side0AllianceId);
					if (rpt.marchType == 2){
						colClass = '"myCol myRein"';
					} else if (rpt.side1AllianceId != myAllianceId){
						colClass = '"myCol myHostile"';
					} else {
						if (parseInt(rpt.side0TileType) < 50){ // if wild
							if (parseInt(rpt.side0PlayerId) == 0)
								colClass = '"myCol myGray"';
							else
								colClass = '"myCol myWarn"';
						} else if (parseInt(rpt.side0PlayerId) == 0) { // barb
							colClass = '"myCol myGray"';
						} else {
							if (targetDiplomacy == 'friendly')
								colClass = '"myCol myWarn"';
						}
					}

					// Date ...
					msg.push ('<tr valign=top');
					if (i%2 == 0)
						msg.push(" class=stripe");
					msg.push("><TD class="+ colClass +"><div>");
					msg.push(formatUnixTime(rpt.reportUnixTime));
					if (Options.enableReportNumber)
						msg.push ('<BR>Rpt ' + rpt.reportId);

					// Type
					msg.push("</div></td><TD class="+ colClass +"><div>");
					rpt.marchType = parseInt(rpt.marchType);
					if (rpt.marchType == 1)
						msg.push (unsafeWindow.g_js_strings.commonstr.transport);
					else if (rpt.marchType == 3)
						msg.push (unsafeWindow.g_js_strings.commonstr.scout);
					else if (rpt.marchType == 2)
						msg.push ('Reinf');
					else
						msg.push (unsafeWindow.g_js_strings.commonstr.attack);

					// Attacker ...
					msg.push ("</div></td><TD class="+ colClass +"><div>");
					if (parseInt(rpt.side1PlayerId) != 0) {
						msg.push(tidyPlayerName(playerNames["p" + rpt.side1PlayerId]))
						if (Options.atkCityName == 'same')
							msg.push (' - ' + cityNames['c'+ rpt.side1CityId]);
						else if (Options.atkCityName == 'new')
							msg.push ('<BR />' + cityNames['c'+ rpt.side1CityId]);
					} else
						msg.push ('?Unknown?');
					msg.push (' ');
					msg.push (coordLink(rpt.side1XCoord, rpt.side1YCoord));

					if (rpt.side1AllianceId != myAllianceId && Options.atkAlliance){
						msg.push ('<BR />');
						msg.push (allianceNames['a'+rpt.side1AllianceId]);
						msg.push (' (');
						msg.push (getDiplomacy(rpt.side1AllianceId));
						msg.push (')');
					} else {
						msg.push ('<BR />');
					}
					msg.push ('</div></td>');

					// Target ...
					msg.push ("<TD class="+ colClass +"><DIV>");
					var type = parseInt(rpt.side0TileType);

					if (type < 50){ // wild
						msg.push(unsafeWindow.g_mapObject.types[type].toString().capitalize());
						msg.push(" Lvl " + rpt.side0TileLevel)
						if (parseInt(rpt.side0PlayerId) != 0) { // IF OWNED, show owner ...
							msg.push (' [');
							msg.push (tidyPlayerName(playerNames["p" + rpt.side0PlayerId]));
							msg.push ('] ');
						}
					} else {
						if (parseInt(rpt.side0PlayerId) == 0) { // barb
							msg.push(unsafeWindow.g_js_strings.commonstr.barbariancamp);
							msg.push(" Lvl " + rpt.side0TileLevel)
						} else { // city
							msg.push (tidyPlayerName(playerNames["p" + rpt.side0PlayerId]));
							if (Options.tgtCityName == 'same')
								msg.push (' - ' + cityNames['c'+ rpt.side0CityId]);
							else if (Options.tgtCityName == 'new')
								msg.push ('<BR />' + cityNames['c'+ rpt.side0CityId]);
						}
					}
					msg.push (' ');
					msg.push (coordLink(rpt.side0XCoord, rpt.side0YCoord));

					if (rpt.side0AllianceId!=0 && rpt.side0AllianceId!=myAllianceId && Options.tgtAlliance){
						msg.push ('<BR />');
						msg.push (allianceNames['a'+rpt.side0AllianceId]);
						msg.push (' (');
						msg.push (targetDiplomacy);
						msg.push (')');
					}

					// 'view report' link ...
					if (Options.allowAlterAR)
						msg.push("</div></td><TD class="+ colClass +"><div><a onclick=' modal_alliance_report_view(\""); // ONCLICK ???
					else
						msg.push("</div></td><TD class="+ colClass +"><div><a onclick=' $(\"modal_alliance_reports_tabledivNKA\").id=\"modal_alliance_reports_tablediv\"; modal_alliance_report_view(\""); // ONCLICK ???
					msg.push(rpt.reportId);
					msg.push('",');
					if (parseInt(rpt.side1AllianceId) == parseInt(Seed.allianceDiplomacies.allianceId))
						msg.push(1);
					else
						msg.push(0);
					msg.push(",");
					msg.push(rpt.side0TileType);
					msg.push(",");
					msg.push(rpt.side0TileLevel);
					msg.push(",");
					msg.push(rpt.side0PlayerId);
					msg.push(',"');
					if (parseInt(rpt.side0PlayerId) != 0)
						msg.push(tidyPlayerName(playerNames["p" + rpt.side0PlayerId]));
					else
						msg.push(unsafeWindow.g_js_strings.commonstr.enemy);
					msg.push('","');
					if (parseInt(rpt.side0PlayerId) != 0)
						msg.push(tidyPlayerName(playerNames["g" + rpt.side0PlayerId]));
					else
						msg.push(0)
					msg.push('","');
					if (parseInt(rpt.side1PlayerId) > 0)
						msg.push(tidyPlayerName(playerNames["p" + rpt.side1PlayerId]));
					msg.push('","');
					if (parseInt(rpt.side1PlayerId) != 0)
						msg.push(tidyPlayerName(playerNames["g" + rpt.side1PlayerId]));
					msg.push('",');
					msg.push(rpt.marchType);
					msg.push(",");
					msg.push(rpt.side0XCoord);
					msg.push(",");
					msg.push(rpt.side0YCoord);
					msg.push(",");
					msg.push(rpt.reportUnixTime);
					msg.push(",");
					if (parseInt(rpt.reportStatus) == 2)
						msg.push(1);
					else
						msg.push(0);
					if (rpt.side1XCoord) {
						msg.push(",");
						msg.push(rpt.side1XCoord);
						msg.push(",");
						msg.push(rpt.side1YCoord)
					} else {
						msg.push(",,");
					}
					msg.push(");return false;'>View</a></div></td></tr>");
				}
				msg.push("</tbody></table></div>");
			}
			msg.push("</div><div id='modal_report_list_pagination'></div>");
			document.getElementById('allianceContent').innerHTML = msg.join("");
			if (pageNum) {
				unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports", pageNum)
			} else {
				unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports")
			}
		}
	},

} // end AllianceReports singleton

/*********************************** Alliance TAB ***********************************/
Tabs.Alliance = {
  tabLabel : 'Alleanze',
  tabOrder : toAllianz,
  myDiv : null,
  alliancemembers:[],
  number:0,
  totalmembers:0,
  error:false,
  
  init : function (div){    
    var t = Tabs.Alliance;      
    t.myDiv = div;
     t.myDiv.style.overflowY = 'scroll';
     div.style.maxHeight = '500px';
     t.totalmembers=0;
     t.alliancemembers=[];  
     
     unsafeWindow.getdetails = t.getMemberDetails;
    
    var m =  '<DIV class=pdxStat>ALLIANZ - FUNKTIONEN UND ÜBERSICHT</div><span style=\"font-size:10px; color:#555; line-height:18px; \"><font color=#600000><B><u>Info</u></b></font>: <b>DIP</b> = Days in Position | <i>Tage in Position</i></span><TABLE align=center cellpadding=1 cellspacing=0></table>';
    
    m +='<TABLE class=pdxTab><TD width=200px><INPUT id=aldiplo type=submit value="Diplomatie Anzeigen"></td><TD>Ordina per: <select id="searchAlli"><option value="name">Nome</options>';
    m += '<option value="might">Potere</option>';
    m += '<option value="login">Ultimo accesso</option>';
    m += '<option value="cities">Città</option>';
    m += '<option value="position">Posizione nell\'alleanza</option>';
    m += '<option value="dip">Posiozione mantenuta da giorni...</option></select></td>';
    m += '<TD><INPUT id=alList type=submit value="Visualizza membri"></td>';
    m += '<TD id=progress></td>';
    //m += '<TR><TD width=200px>DIPLOMAZIA ALLEANZA</td><TD></td></tr></table>';
    
    m+='<TABLE align=center cellpadding=1 cellspacing=0></table>';
    m += '<TABLE id=alOverviewTab class=alTab><TR align="center"></tr></table>';
    
    
    t.myDiv.innerHTML = m;
    
    document.getElementById('alList').addEventListener('click', function(){
      if (!t.searching){
        t.totalmembers=0;
        t.alliancemembers=[];  
        document.getElementById('alOverviewTab').innerHTML ="";
        document.getElementById('progress').innerHTML ="";
        document.getElementById('progress').innerHTML = "Attendi...";
        document.getElementById('alList').disabled = true;
        t.error=false;
        t.fetchAllianceMemberPage();
    }
    }, false);
    
    document.getElementById('searchAlli').addEventListener('click', function(){
        if (t.alliancemembers!="") {
          document.getElementById('alOverviewTab').innerHTML ="";
          t.paintMembers();
        }
    }, false);
    document.getElementById('aldiplo').addEventListener('click', function(){t.paintDiplomacy();}, false);  
    
  window.addEventListener('unload', t.onUnload, false);
  },
  
  
  paintMembers: function(){
  var t = Tabs.Alliance;
          if (document.getElementById('searchAlli').value == "name") {
          var sortmembers = t.alliancemembers.sort(function(a, b){
                 var sortA=a.Name.toLowerCase(), sortB=b.Name.toLowerCase()
                 if (sortA < sortB)
                  return -1
                 if (sortA > sortB)
                  return 1
                 return 0
                });
        }     
        if (document.getElementById('searchAlli').value == "might") {
            var sortmembers = t.alliancemembers.sort(function(a, b){
                   var sortA=parseInt(a.Might),sortB=parseInt(b.Might)
                   if (sortA > sortB)
                    return -1
                   if (sortA < sortB)
                    return 1
                   return 0
                  });
        }     
        if (document.getElementById('searchAlli').value == "login") {
            var sortmembers = t.alliancemembers.sort(function(a, b){
                   var sortA=a.LastLogin,sortB=b.LastLogin
                   if (sortA < sortB)
                    return -1
                   if (sortA > sortB)
                    return 1
                   return 0
                  });
        }     
        if (document.getElementById('searchAlli').value == "cities") {
            var sortmembers = t.alliancemembers.sort(function(a, b){
                   var sortA=a.Cities,sortB=b.Cities
                   if (sortA < sortB)
                    return -1
                   if (sortA > sortB)
                    return 1
                   return 0
                  });
        }     
        if (document.getElementById('searchAlli').value == "dip") {
            var sortmembers = t.alliancemembers.sort(function(a, b){
                   var sortA=a.dip,sortB=b.dip
                   if (sortA < sortB)
                    return -1
                   if (sortA > sortB)
                    return 1
                   return 0
                  });
        }     
        if (document.getElementById('searchAlli').value == "position") {
            var sortmembers = t.alliancemembers.sort(function(a, b){
                   var sortA=a.Position,sortB=b.Position
                   if (sortA < sortB)
                    return -1
                   if (sortA > sortB)
                    return 1
                   return 0
                  });
        }      
        for (var y = (sortmembers.length-1); y >=0; y--) {
                            t._addTab(sortmembers[y].Name,sortmembers[y].Might,sortmembers[y].LastLogin,sortmembers[y].Position,sortmembers[y].dip,sortmembers[y].uid,sortmembers[y].fbuid,sortmembers[y].Cities);
                            t.myDiv.style.overflowY = 'scroll';
        }
       t._addTabHeader();
   },
  
    _addTab: function(Name,Might,LastLogin,Position,dip,uid,fbuid,Cities){
             var t = Tabs.Alliance;
             var row = document.getElementById('alOverviewTab').insertRow(0);
             row.vAlign = 'top';
             row.insertCell(0).innerHTML ='<A target="_tab" href="http://www.facebook.com/profile.php?id='+ fbuid +'">profile</a>';
             row.insertCell(1).innerHTML = Name;
             var cell2 = row.insertCell(2);
            cell2.width = "60" ;
            cell2.align = "right" ;
            cell2.vAlign = "top";
            cell2.innerHTML = addCommas(Might);
            row.insertCell(3).innerHTML = Cities;
            row.insertCell(4).innerHTML = officerId2String (Position);
            row.insertCell(5).innerHTML = dip;
            row.insertCell(6).innerHTML = LastLogin;
          },
          
    _addTabHeader: function() {
    var t = Tabs.Alliance;
        var row = document.getElementById('alOverviewTab').insertRow(0);
        row.vAlign = 'top';
         row.insertCell(0).innerHTML = "<b>Facebook</b>";
        row.insertCell(1).innerHTML = "<b>Name</b>";
        row.insertCell(2).innerHTML = "<b>Macht</b>";
        row.insertCell(3).innerHTML = "<b>Städte</b>";
        row.insertCell(4).innerHTML = "<b>Position</b>";
        row.insertCell(5).innerHTML = "<b>DIP</b>";
        row.insertCell(6).innerHTML = "<b>Letzter Login</b>";
      },   
    
    
    paintDiplomacy : function () {
      document.getElementById('alOverviewTab').innerHTML ="";
      document.getElementById('progress').innerHTML ="";
      var m= '<TR><TD colspan=4 style=\'background: #33CC66;\' align=center><B>Amichevole: </b></td></tr>';
      if (Seed.allianceDiplomacies['friendly'] == null) m+='<TR><TD>Keine Alliierten Allianzen gefunden...</td>';
      else m += '<TABLE class=xtab><TR><TD>Allianz Name</td><TD>Spieler</td></tr>';
      for (k in Seed.allianceDiplomacies['friendly']){
        m+='<TR><TD>'+Seed.allianceDiplomacies['friendly'][k]['allianceName']+'</td>';
        m+='<TD align=center>'+Seed.allianceDiplomacies['friendly'][k]['membersCount']+'</td>';
      }
      m+='<TR></tr></table>';
      m+= '<TR><TD colspan=4 style=\'background: #CC0033;\' align=center><B>Ostile: </b></td></tr>';
      if (Seed.allianceDiplomacies['hostile'] == null) m+='<TR><TD>Keine Feindlichen Allianzen gefunden...</td>';
      else m += '<TABLE class=xtab><TR><TD>Allianz Name</td><TD>Spieler</td></tr>';
      for (k in Seed.allianceDiplomacies["hostile"]){
        m+='<TR><TD>'+Seed.allianceDiplomacies["hostile"][k]['allianceName']+'</td>';
        m+='<TD align=center>'+Seed.allianceDiplomacies["hostile"][k]['membersCount']+'</td>';
      }
      m+='<TR></tr></table>';
      m+= '<TR><TD colspan=4 style=\'background: #FF6633;\' align=center><B>Pending: </b></td></tr>';
      if (Seed.allianceDiplomacies['friendlyToYou'] == null) m+='<TR><TD>keine pendelnden Alianzen...</td>';
      else m += '<TABLE class=xtab><TR><TD>Allianz Name</td><TD>Spieler</td></tr>';
      for (k in Seed.allianceDiplomacies["friendlyToYou"]){
        m+='<TR><TD>'+Seed.allianceDiplomacies["friendlyToYou"][k]['allianceName']+'</td>';
        m+='<TD align=center>'+Seed.allianceDiplomacies["friendlyToYou"][k]['membersCount']+'</td>';
      }
      m+='<TR></tr></table>';
      document.getElementById('alOverviewTab').innerHTML = m;
    },
    
        
    fetchAllianceMemberPage : function () {
    var t = Tabs.Alliance;
    document.getElementById('alList').disabled = true;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.pf = 0;
    
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (transport) {
          var rslt = eval("(" + transport.responseText + ")");
          t.totalmembers = (rslt["allianceInfo"]["members"]);
          for (var i=1;i<=10;i++) {
                 params.pageNo = i;
                 params.pf = 0;
                 new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + unsafeWindow.g_ajaxsuffix, {
                   method: "post",
                   parameters: params,
                   onSuccess: function (transport) {
                    var info = eval("(" + transport.responseText + ")");
                    if (info.ok) {  
                       for (var k in info["memberInfo"]){
                         if ( info["memberInfo"][k]["might"] != undefined && !t.error){  
                           t.alliancemembers.push ({
                               Name: info["memberInfo"][k]["name"],
                               Might: info["memberInfo"][k]["might"],
                               Cities: info["memberInfo"][k]["cities"],
                               Position : info["memberInfo"][k]["positionType"],
                               dip : info["memberInfo"][k]["daysInPosition"],
                               LastLogin : info["memberInfo"][k]["lastLogin"],
                               uid : info["memberInfo"][k]["userId"],
                               fbuid : info["memberInfo"][k]["fbuid"],  
                           });
                          }
                           document.getElementById('alOverviewTab').innerHTML ="";
                           t.paintMembers();
                       }
                       if (!t.error) document.getElementById('progress').innerHTML   = '(' + (t.alliancemembers.length) +' von '+ t.totalmembers +')';
                       if ( t.alliancemembers.length >= t.totalmembers) document.getElementById('alList').disabled = false;
                    } else  if (info.error) {
                      document.getElementById('alList').disabled = false;
                      document.getElementById('progress').innerHTML = "FEHLER!";
                      t.error=true;
                     }
                   },
                   onFailure: function (rslt) {;
                     notify ({errorMsg:'AJAX error'});
                   },
                   
           });
          }
      },
      onFailure: function (rslt) {;
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
  hide : function (){         
    mainPop.div.style.width = 750 + 'px';
  },

  show : function (){         
      var t = Tabs.Alliance;
        mainPop.div.style.width = 750 + 'px';
  },
};
/********************************* Koordinaten Hide/Show */
function pdxkoordlink (x, y){
  var m = [];
  m.push ('(<a onclick="pdxGotoMapHide (');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('); return false">');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('</a>)');  
  return m.join('');
}
unsafeWindow.pdxGotoMapHide = function (x, y){
  try {
    unsafeWindow.Modal.hideModal();
  } catch (e){ }
  try {
    Modal.hideModal();
  } catch (e){ }
  unsafeWindow.pdxGotoMap (x, y);  
}



unsafeWindow.pdxGotoMap = function (x, y){
  if (Options.pdxhideOnGoto)
    hideMe ();
  setTimeout (function (){
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    var a = document.getElementById("mod_views").getElementsByTagName("a");
    for (var b = 0; b < a.length; b++) {
        a[b].className = ""
    }
    document.getElementById('mod_views_map').className = "sel";
    document.getElementById("maparea_city").style.display = 'none';
    document.getElementById("maparea_fields").style.display = 'none';
    document.getElementById("maparea_map").style.display = 'block';
    unsafeWindow.tutorialClear()
  }, 0);
};
/*********************************  Cresting Tab ***********************************/
 Tabs.Crest = {
  tabLabel : 'Elmi',
  tabOrder : toWappen,
  myDiv : null,
  rallypointlevel:null,
  knt:{},
     
  init : function (div){
    var t = Tabs.Crest;
    setInterval(t.FirstRound,5000);
    t.myDiv = div;
    var selbut=0;
  var m = '<DIV id=pbTowrtDivF class=pdxStat>WAPPEN SUCHE</div><TABLE id=pbcrestfunctions width=100% height=0% class=pdxTab><TR align="center">';
     if (CrestOptions.Running == false) {
         m += '<TD><INPUT id=Cresttoggle type=submit value="Wappen Suchen = NO"></td>';
     } else {
         m += '<TD><INPUT id=Cresttoggle type=submit value="Wappen Suchen = SI"></td>';
     }
    m += '<TD><INPUT id=CrestHelp type=submit value="AIUTO"></td></table>';
    
    m += '<DIV id=pbOpt class=pdxStat>WAPPEN SUCHE - EINSTELLUNG</div><TABLE id=pbcrestopt   width=100% height=0% class=pdxTab><TR align="center"></table>';
    m += '<DIV style="margin-bottom:10px;"><b>Heiligtum</b>: <span id=crestcity></span></div>';
    
    m += '<TABLE class=pdxTab><TR><TD><b>Wildniss Coordinate</b> X:<INPUT id=pbcrestx type=text size=3 maxlength=3 value="'+CrestOptions.X+'"</td>';
    m += '<TD>Y:<INPUT id=pbcresty type=text size=3 maxlength=3 value="'+CrestOptions.Y+'"</td></tr></table>';
	m += '<TABLE class=pdxTab><TR><TD>Welle <b>1</b>: </td><TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_30.png></td><TD><INPUT id=R1MM type=text size=5 maxlength=5 value="'+CrestOptions.R1MM+'" (Wenn keine Truppen mehr in der Stadt sind wird es aufhören die erste Welle zu schicken)</td>';
    m += '</td><TD></td><TD><TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_30.png></td><TD><INPUT id=R1Ball type=text size=5 maxlength=5 value="'+CrestOptions.R1Ball+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_30.png></td><TD><INPUT id=R1Cat type=text size=5 maxlength=5 value="'+CrestOptions.R1Cat+'"</td></tr>';
   
    m += '<TR><TD>Welle <b>2</b>: </td><TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_30.png></td><TD><INPUT id=R2MM type=text size=5 maxlength=5 value="'+CrestOptions.R2MM+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.png></td><TD><INPUT id=R2Pike type=text size=5 maxlength=5 value="'+CrestOptions.R2Pike+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_30.png></td><TD><INPUT id=R2Sword type=text size=5 maxlength=5 value="'+CrestOptions.R2Sword+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_30.png></td><TD><INPUT id=R2Arch type=text size=5 maxlength=5 value="'+CrestOptions.R2Arch+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_30.png></td><TD><INPUT id=R2Ball type=text size=5 maxlength=5 value="'+CrestOptions.R2Ball+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_30.png></td><TD><INPUT id=R2Ram type=text size=5 maxlength=5 value="'+CrestOptions.R2Ram+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_30.png></td><TD><INPUT id=R2Cat type=text size=5 maxlength=5 value="'+CrestOptions.R2Cat+'"</td></tr></table>';
    
    t.myDiv.innerHTML = m;
    
        for (var i=0;i<Seed.cities.length;i++){
    if (CrestOptions.CrestCity == Seed.cities[i][0]){
      selbut=i;
      break;

       }
     }
    
    t.tcp = new CdispCityPicker ('crestcityselect', document.getElementById('crestcity'), true, t.clickCitySelect, selbut);
    
     if (CrestOptions.CrestCity == 0) {
CrestOptions.CrestCity = t.tcp.city.id
saveCrestOptions();
}
    
   document.getElementById('crestcity').addEventListener('click', function(){CrestOptions.CrestCity = t.tcp.city.id;saveCrestOptions();} , false);
    document.getElementById('Cresttoggle').addEventListener('click', function(){t.toggleCrestState(this)} , false);
    document.getElementById('CrestHelp').addEventListener('click', function(){t.helpPop();} , false);
 document.getElementById('pbcrestx').addEventListener('change', function(){CrestOptions.X = document.getElementById('pbcrestx').value; saveCrestOptions();} , false);
       document.getElementById('pbcresty').addEventListener('change', function(){CrestOptions.Y = document.getElementById('pbcresty').value; saveCrestOptions()} , false);
      document.getElementById('R1MM').addEventListener('change', function(){CrestOptions.R1MM = document.getElementById('R1MM').value; saveCrestOptions()} , false);
    document.getElementById('R1Ball').addEventListener('change', function(){CrestOptions.R1Ball = document.getElementById('R1Ball').value; saveCrestOptions()} , false);
      document.getElementById('R1Cat').addEventListener('change', function(){CrestOptions.R1Cat = document.getElementById('R1Cat').value; saveCrestOptions()} , false);
    document.getElementById('R2MM').addEventListener('change', function(){CrestOptions.R2MM = document.getElementById('R2MM').value; saveCrestOptions()} , false);
      document.getElementById('R2Pike').addEventListener('change', function(){CrestOptions.R2Pike = document.getElementById('R2Pike').value; saveCrestOptions()} , false);
      document.getElementById('R2Sword').addEventListener('change', function(){CrestOptions.R2Sword = document.getElementById('R2Sword').value; saveCrestOptions()} , false);
      document.getElementById('R2Arch').addEventListener('change', function(){CrestOptions.R2Arch = document.getElementById('R2Arch').value; saveCrestOptions()} , false);
       document.getElementById('R2Ball').addEventListener('change', function(){CrestOptions.R2Ball = document.getElementById('R2Ball').value; saveCrestOptions()} , false);
       document.getElementById('R2Ram').addEventListener('change', function(){CrestOptions.R2Ram = document.getElementById('R2Ram').value; saveCrestOptions()} , false);
      document.getElementById('R2Cat').addEventListener('change', function(){CrestOptions.R2Cat = document.getElementById('R2Cat').value; saveCrestOptions()} , false);
  },
  
  helpPop : function (){
    var helpText = '<BR>Der Wappen Tab ist dafür gedacht um ein und die selbe Wildniss immer wieder anzugreifen!<BR>';
    helpText += 'Der Tab wird eine Wildniss in 2 Wellen Angreifen, Aufgeben und wieder von vorne anfangen<BR>';
    helpText += 'Du muss unbedingt eine freie wildniss im Heiligtum besitzten!<BR>';
    helpText += 'Einfach die Truppen und Koordinaten eingeben und auf <b>Wappen Suche = SI</b> klicken!<BR><BR>';
    helpText += '<b>Links auf KoC Scripts</b><BR>';
    helpText += '<A target="_tab" http://koc.god-like.org/?cat=211">Bereich Wildnisse</a><BR>';
    helpText += '<A target="_tab" http://koc.god-like.org/?cat=122">Bereich Wappen</a>';
    helpText += '<TABLE width=100%><TR><TD>Level</td><TD>Welle 1</td><TD>Welle 2</td><TD>Verluste</td><TD>Min. Befliedern</td></tr>';
    helpText += '<TR><TD>1</td><TD>n/a</td><TD>160 Soldati semplici</td><TD>12 Soldati semplici</td><TD>0</td></tr>';
    helpText += '<TR><TD>1</td><TD>n/a</td><TD>80 Bogen</td><TD>Keine</td><TD>1+</td></tr>';
    helpText += '<TR><TD>2</td><TD>5 Soldati semplici</td><TD>130 Bogen</td><TD>1. Welle</td><TD>2+</td></tr>';
    helpText += '<TR><TD>3</td><TD>10 Soldati semplici</td><TD>520 Bogen</td><TD>1. Welle</td><TD>3+</td></tr>';
    helpText += '<TR><TD>4</td><TD>20 Soldati semplici</td><TD>1600 Bogen</td><TD>1. Welle</td><TD>4+</td></tr>';
    helpText += '<TR><TD>5</td><TD>50 Soldati semplici</td><TD>2200 Bogen</td><TD>1. Welle</td><TD>6+</td></tr>';
    helpText += '<TR><TD>6</td><TD>100 Soldati semplici</td><TD>3000 Bogen</td><TD>1. Welle</td><TD>7+</td></tr>';
    helpText += '<TR><TD>7</td><TD>150 Soldati semplici</td><TD>6000 Bogen</td><TD>1. Welle</td><TD>8+</td></tr>';
    helpText += '<TR><TD>8</td><TD>299 Soldati semplici + 1Ballis</td><TD>9000 Bogen + 900 Ballis</td><TD>1. Welle + 1 Bogen</td><TD>9+</td></tr>';
    helpText += '<TR><TD>9</td><TD>599 Soldati semplici + 1Ballis</td><TD>13000 Bogen + 900 Ballis</td><TD>1. Welle + 2 Bogen</td><TD>10</td></tr>';
    helpText += '<TR><TD>10</td><TD>1199 Soldati semplici + 1Kat</td><TD>35000 Bogen + 2500 Kat</td><TD>1. Welle + 6 Bogen + 50 Kat</td><TD>10</td></tr></table>';
    
    var pop = new CPopup ('giftHelp', 0, 0, 550, 500, true);
    pop.centerMe (mainPop.getMainDiv());  
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot - Deutsch: Wappen Suchen</b></center>';
    pop.show (true);
  },
  
  toggleCrestState: function(obj){
    var t = Tabs.Crest;
        if (CrestOptions.Running == true) {
            CrestOptions.Running = false;
            obj.value = "Wappen Suchen = NO";
            saveCrestOptions();
        }
        else {
            CrestOptions.Running = true;
            obj.value = "Wappen Suchen = SI";
            saveCrestOptions();
        }
    },
    
    
    getAtkKnight : function(cityID){
     var t = Tabs.Crest;
     t.knt = new Array();
     for (k in Seed.knights[cityID]){
         if (Seed.knights[cityID][k]["knightStatus"] == 1 && Seed.leaders[cityID]["resourcefulnessKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["politicsKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["combatKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["intelligenceKnightId"] != Seed.knights[cityID][k]["knightId"]){
           t.knt.push ({
             Name:   Seed.knights[cityID][k]["knightName"],

             Combat:  parseInt(Seed.knights[cityID][k]["combat"]),
             ID:    Seed.knights[cityID][k]["knightId"],
           });
         }
     }
     t.knt = t.knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
  },
  
  getRallypointLevel: function(cityId){
    var t = Tabs.Crest;
    for (var o in Seed.buildings[cityId]){
    var buildingType = parseInt(Seed.buildings[cityId][o][0]);
    var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
    if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);
     }
  },
  
  
  FirstRound: function(){
      var t = Tabs.Crest;
      var buzy = false;
      if (!CrestOptions.Running) return;
      cityID = 'city' + CrestOptions.CrestCity;
      
      var abandon=0;
      
      for (var k in Seed.wilderness[cityID] ){
           if (Seed.wilderness[cityID][k]['xCoord']==CrestOptions.X && Seed.wilderness[cityID][k]['yCoord']==CrestOptions.Y) {
             t.abandonWilderness(Seed.wilderness[cityID][k]['tileId'],Seed.wilderness[cityID][k]['xCoord'],Seed.wilderness[cityID][k]['yCoord'],CrestOptions.CrestCity);
           }
      }
      
      for (var k in Seed.queue_atkp[cityID]){
        if (Seed.queue_atkp[cityID][k]['toXCoord']==CrestOptions.X && Seed.queue_atkp[cityID][k]['toYCoord']==CrestOptions.Y)  buzy=true;
      }
      if (!buzy)  {
        CrestOptions.RoundOne=true;
        CrestOptions.RoundTwo=true;
        saveCrestOptions();
      }
      if(!CrestOptions.RoundOne) return;
     
      
      t.getAtkKnight(cityID);
//t.rallypointlevel = getRallyPointLevel(cityID);
      slots=0;
       for (z in Seed.queue_atkp[cityID]){
             slots++;
       }
       if  (Seed.queue_atkp[cityID].toSource() == "[]") slots=0;
//t.rallypointlevel=getRallyPointLevel(cityID);
       t.getRallypointLevel(cityID);       
       if ((t.rallypointlevel) <= slots)return;
       
       if  (t.knt.toSource() == "[]") {return;}  
       var kid = t.knt[0].ID;
       
       var now = new Date().getTime()/1000.0;
       now = now.toFixed(0)
        if (CrestOptions.R1MM > parseInt(Seed.units[cityID]['unt2']) || CrestOptions.R1Ball > parseInt(Seed.units[cityID]['unt10']) || CrestOptions.R1Cat > parseInt(Seed.units[cityID]['unt12'])){return;}
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.cid=CrestOptions.CrestCity;
      params.type=4;
      params.kid=kid;
      params.xcoord = CrestOptions.X;
      params.ycoord = CrestOptions.Y;
      if (now < (parseInt(CrestOptions.lastRoundTwo) + 300)) {
params.u2= (CrestOptions.R1MM / 10);
params.u2 = params.u2.toFixed(0);
if (params.u2 < (CrestOptions.R1MM / 10)) params.u2++;
}
      else params.u2= CrestOptions.R1MM;
      params.u10=CrestOptions.R1Ball;
      params.u12=CrestOptions.R1Cat;
  
      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
               method: "post",
               parameters: params,
               loading: true,
               onSuccess: function (transport) {
               var rslt = eval("(" + transport.responseText + ")");
               if (rslt.ok) {
               var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
               var ut = unsafeWindow.unixtime();
               var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
               var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
               for(i = 0; i <= unitsarr.length; i++){
                 if(params["u"+i]){
                 unitsarr[i] = params["u"+i];
                 }
               }
               var currentcityid = params.cid;
               unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
               unsafeWindow.update_seed(rslt.updateSeed)
               if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
               CrestOptions.RoundOne = false;
               saveCrestOptions();
               setTimeout (function(){t.SecondRound();}, 10000);
               } else {
                   //setTimeout (function(){t.FirstRound();}, 5000);
               //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))

               }
               },
               onFailure: function () {}
       });
       
     },
     
        
    SecondRound: function(){
      var t = Tabs.Crest;
      if (!CrestOptions.Running || !CrestOptions.RoundTwo) return;
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      cityID = 'city' + CrestOptions.CrestCity;
      t.getAtkKnight(cityID);
      slots=0;
       for (z in Seed.queue_atkp[cityID]){
             slots++;
       }
       if  (Seed.queue_atkp[cityID].toSource() == "[]") slots=0;
    //t.rallypointlevel=getRallyPointLevel(cityID);
       t.getRallypointLevel(cityID);
       if ((t.rallypointlevel) <= slots)return;
          
       if  (t.knt.toSource() == "[]") {return;}  
       var kid = t.knt[0].ID;

    params.cid=CrestOptions.CrestCity;
      params.type=4;
      params.kid=kid;
      params.xcoord = CrestOptions.X;
      params.ycoord = CrestOptions.Y;
      params.u2=CrestOptions.R2MM;
params.u4=CrestOptions.R2Pike;
params.u5=CrestOptions.R2Sword;
      params.u6=CrestOptions.R2Arch;
      params.u10=CrestOptions.R2Ball;
params.u11=CrestOptions.R2Ram;
      params.u12=CrestOptions.R2Cat;
      
      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
               method: "post",
               parameters: params,
               loading: true,
               onSuccess: function (transport) {
               var rslt = eval("(" + transport.responseText + ")");
               if (rslt.ok) {
               var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
               var ut = unsafeWindow.unixtime();
               var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
               var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
               for(i = 0; i <= unitsarr.length; i++){
                 if(params["u"+i]){
                 unitsarr[i] = params["u"+i];
                 }
               }
               var currentcityid = params.cid;
               unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
               unsafeWindow.update_seed(rslt.updateSeed);
               if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
               CrestOptions.RoundTwo = false;
               var now = new Date().getTime()/1000.0;
               now = now.toFixed(0);
               CrestOptions.lastRoundTwo = now;
               saveCrestOptions();
               } else {
               setTimeout (function(){t.SecondRound();}, 5000);
               //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
               }
               },
               onFailure: function () {}
       });
       },
       
       
    abandonWilderness: function(tid,x,y,cid){
      var t = Tabs.Crest;
      if (!CrestOptions.Running) return;
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      var cityID = cid;
    var tileid = tid;
      params.tid=tid;
      params.cid=cid;
      params.x=x;
      params.y=y;
            
      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/abandonWilderness.php" + unsafeWindow.g_ajaxsuffix, {
               method: "post",
               parameters: params,
               loading: true,
               onSuccess: function (transport) {
               var rslt=eval("("+transport.responseText+")");
               
               
          if (rslt.ok) {
             // Modal.hideModal();
             logit('abandon OK');
             CrestOptions.RoundOne = true;
             CrestOptions.RoundTwo = true;
             saveCrestOptions();
              if (rslt.returningMarches) {
                  var cities = Object.keys(rslt.returningMarches);
                  for (var i = 0; i < cities.length; i++) {
                      for (var j = 0; j < rslt.returningMarches[cities[i]].length; j++) {
                          var cid = cities[i].split("c")[1];
                          var mid = rslt.returningMarches[cities[i]][j];
                          var march = Seed.queue_atkp["city" + cid]["m" + mid];
                          if (march) {
                              var marchtime = Math.abs(parseInt(march.destinationUnixTime) - parseInt(march.marchUnixTime));
                              var ut = unsafeWindow.unixtime();
                              Seed.queue_atkp["city" + cid]["m" + mid].destinationUnixTime = ut;
                              Seed.queue_atkp["city" + cid]["m" + mid].marchUnixTime = ut - marchtime;
                              Seed.queue_atkp["city" + cid]["m" + mid].returnUnixTime = ut + marchtime;
                              Seed.queue_atkp["city" + cid]["m" + mid].marchStatus = 8
                          }
                      }
                  }
              }
              if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
              
              if (Object.keys(Seed.wilderness["city" + cityID]).length == 1) {
                  Seed.wilderness["city" + cityID] = []
                   } else{
                     delete Seed.wilderness["city"+cityID]["t"+tileid];
                   }
               } else {
               setTimeout (function(){t.abandonWilderness(tid,x,y,cid);}, 5000);
               //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
               }
               },
               onFailure: function () {}
       });


    },
    
  hide : function (){
    var t = Tabs.Crest;
  },

  show : function (){
  },
 };


/*********************************  Raid Tab ***********************************/
/************** Bot active
(object) queue_atkp = [object Object]
    (object) city73930 = [object Object]
      (object) m6093 = [object Object]
        (number) marchType = 9
        (number) marchStatus = 1
        (string) playerId = 1550996
        (string) cityId = 73930
        (string) botSettingsId = 1479
        (string) botMarchStatus = 1
        (string) botState = 1
        (string) modalState = 0
        (string) restPeriod = 3472
        (string) fromPlayerId = 1550996
        (string) fromCityId = 73930
        (string) fromAllianceId = 2199
        (string) fromXCoord = 159
        (string) fromYCoord = 638
        (undefined) toPlayerId: null = null
        (undefined) toCityId: null = null
        (undefined) toAllianceId: null = null
********/
/************* Bot returning
(object) queue_atkp = [object Object]
    (object) city73930 = [object Object]
      (object) m6093 = [object Object]
        (number) marchType = 9
        (number) marchStatus = 8
        (string) playerId = 1550996
        (string) cityId = 73930
        (string) botSettingsId = 1479
        (string) botMarchStatus = 1
        (string) botState = 1
        (string) modalState = 0
        (string) restPeriod = 3472
        (string) fromPlayerId = 1550996
        (string) fromCityId = 73930
        (string) fromAllianceId = 2199
        (string) fromXCoord = 159
        (string) fromYCoord = 638
        (undefined) toPlayerId: null = null
        (undefined) toCityId: null = null
        (undefined) toAllianceId: null = null
*****/
/******** Bot resting
(object) queue_atkp = [object Object]
    (object) city73930 = [object Object]
      (object) m6093 = [object Object]
        (string) marchType = 9
        (string) marchStatus = 4
        (string) playerId = 1550996
        (string) cityId = 73930
        (string) botSettingsId = 1479
        (string) botMarchStatus = 7
        (string) botState = 1
        (string) modalState = 0
        (string) restPeriod = 3472
        (string) fromPlayerId = 1550996
        (string) fromCityId = 73930
        (string) fromAllianceId = 2199
        (string) fromXCoord = 159
        (string) fromYCoord = 638
        (undefined) toPlayerId: null = null
        (undefined) toCityId: null = null
        (string) toTileId = 451239
        (undefined) toAllianceId: null = null
**********/
/************* March type cheat sheet
cm.BOT_STATUS = {
    BOT_MARCH_UNDEFINED: 0,
    BOT_MARCH_MARCHING: 1,
    BOT_MARCH_RETURNING: 2,
    BOT_MARCH_STOPPED: 3,
    BOT_MARCH_INSUFFICIENT_TROOPS: 4,
    BOT_MARCH_MAX_RAIDS_EXCEEDED: 5,
    BOT_MARCH_TIMED_OUT: 6,
    BOT_MARCH_RESTING: 7
};
cm.MARCH_STATUS = {
    MARCH_STATUS_INACTIVE: 0,
    MARCH_STATUS_OUTBOUND: 1,
    MARCH_STATUS_DEFENDING: 2,
    MARCH_STATUS_STOPPED: 3,
    MARCH_STATUS_RESTING: 4,
    MARCH_STATUS_UNKNOWN: 5,
    MARCH_STATUS_SITUATIONCHANGED: 7,
    MARCH_STATUS_RETURNING: 8,
    MARCH_STATUS_ABORTING: 9
};
cm.MARCH_TYPES = {
    MARCH_TYPE_NONE: 0,
    MARCH_TYPE_TRANSPORT: 1,
    MARCH_TYPE_REINFORCE: 2,
    MARCH_TYPE_SCOUT: 3,
    MARCH_TYPE_ATTACK: 4,
    MARCH_TYPE_REASSIGN: 5,
    MARCH_TYPE_BARBARIAN: 6,
    MARCH_TYPE_MERCENARY: 7,
    MARCH_TYPE_BARBARIAN_REINFORCE: 8,
    MARCH_TYPE_BOT_BARBARIAN: 9
};
************/

 Tabs.Raid = {
  tabDisabled : false,
  tabLabel : 'Raid',
  tabOrder : toFarmen,
  myDiv : null,
  rallypointlevel:null,
  knt:{},
  Troops:{},
  city:0,
  raidtimer:null,
  rslt:{},
  save:{},
  stopping:false,
  resuming:false,
  deleting:false,
  stopprogress:0,
  stopcount:0,
  activecount:0,
  count:0,
  
        
  init : function (div){
    var t = Tabs.Raid;
    t.myDiv = div;
	t.raidtimer = setTimeout(t.checkRaids, 10*1000);
	
	AddSubTabLink('Ferma Raid', t.StopAllRaids, 'pbraidtab');
	AddSubTabLink('Cancella i raid', t.ResumeAllRaids, 'pbraidtabRes');
	AddSubTabLink('Riprendi Raid', t.DeleteAllRaids, 'pbraidtabDel');
	
	setInterval(t.lookup, 2500);
	
	var m = '<DIV class=pdxStat>IMPOSTAZIONI RAID</div><TABLE width=100% height=0% class=pdxTab><TR align="center">';
	    m += '<TD><INPUT id=pbRaidStart type=submit value="Auto reset = '+ (Options.RaidRunning?'SI':'NO') +'" ></td>';
	    m += '</tr></table></div>';
	    m += '<DIV class=pdxStat>RAID ATTIVI</div><TABLE width=100% height=0% class=pdxTab><TR align="center">';
	    m += '<TD><DIV style="margin-bottom:10px;"><span id=ptRaidCity></span></div></td></tr>';
	    m +='<TR><TD><DIV style="margin-bottom:10px;"><span id=ptRaidTimer></span></div><br><span style=\"font-size:10px; color:#555; line-height:18px; \"><font color=#600000><B><u>ATTENZIONE</u></b></font>: Per modificare o cancellare il raid, deve essere prima fermato</span></td></tr></table>';
	    m += '<DIV id=PaintRaids></div>';
	    m += '<DIV class=pdxStat>RAID SALVATI</div><TABLE width=100% height=0% class=pdxTab><TR align="center">';
	    m += '<DIV id=SavedRaids></div>';
	t.myDiv.innerHTML = m;
	
	t.from = new CdispCityPicker ('ptRaidpicker', document.getElementById('ptRaidCity'), true, t.clickCitySelect, 0);
	document.getElementById('pbRaidStart').addEventListener('click', t.toggleRaidState, false);
	
	t.save = JSON2.parse(GM_getValue ('SavedRaids_'+getServerId(), '[]'));
	
	setInterval (t.paint,1000);
  },
	
  lookup : function (){
      	var t = Tabs.Raid;
      	t.activecount=0;
      	t.stopcount=0;
      	for (c=0; c< Seed.cities.length;c++) {

	 cityID = 'city' + Seed.cities[c][0];
 				for (b in Seed.queue_atkp[cityID]){
 					destinationUnixTime = Seed.queue_atkp[cityID][b]['destinationUnixTime'];
 					MarchStatus = Seed.queue_atkp[cityID][b]['marchStatus'];
					MarchType = Seed.queue_atkp[cityID][b]['marchType'];
					botMarchStatus = Seed.queue_atkp[cityID][b]['botMarchStatus'];
					if (MarchType == 9 &&  MarchStatus == 3) t.stopcount++;
					else if (MarchType == 9) t.activecount++;
				}
	   		}
		   	if (t.resuming == false && t.stopping == false && t.deleting == false && t.activecount != 0)
 				document.getElementById('pbraidtab').innerHTML = '<span style="color: #ff6">Ferma Raid ('+ t.activecount + ')</span>'
		   	else if (t.resuming == false && t.stopping == false && t.deleting == false)
				document.getElementById('pbraidtab').innerHTML = '<span style="color: #CCC">Ferma Raid ('+ t.activecount + ')</span>'
 	   		if (t.resuming == false && t.resuming == false && t.deleting == false && t.stopcount !=0)
				document.getElementById('pbraidtabRes').innerHTML = '<span style="color: #ff6">Cancella Raid ('+ t.stopcount + ')</span>'
	   		else if (t.resuming == false && t.stopping == false && t.deleting == false)
			document.getElementById('pbraidtabRes').innerHTML = '<span style="color: #CCC">Cancella i raid ('+ t.stopcount + ')</span>'
   		if (t.resuming == false && t.stopping == false && t.deleting == false && t.stopcount !=0)
				document.getElementById('pbraidtabDel').innerHTML = '<span style="color: #ff6">Riprendi Raid ('+ t.stopcount + ')</span>'
	   		else if (t.resuming == false && t.stopping == false && t.deleting == false)
				document.getElementById('pbraidtabDel').innerHTML = '<span style="color: #CCC">Riprendi Raid ('+ t.stopcount + ')</span>'
  },
   
   	
  paint : function ()	{
  	var t = Tabs.Raid;
  	var botMarchStat = {0:'Inaktiv',
  						1:'Schlachtzug',
  						2:'Rückmarsch',
  						3:'Angehalten',
  						4:'Reset',
  						5:'Unbekannt',
  						7:'Situation geändert',
  						8:'Rückmarsch',
  						9:'Abbruch'};
  	var botStat = {0:'Undefined',
  						1:'Maschieren',
  						2:'Rückmarsch',
  						3:'Angehalten',
  						4:'Ungenügend Truppen',
  						5:'Max. Raids überschritten',
  						7:'Zeit überschritten',
  						8:'Reset'};
  	var o = '<FONT size=2px><B>Raid Timer: '+ timestr( 86400 - ( unixTime() - t.rslt.settings.lastUpdated )) +'</b></font>';
  	document.getElementById('ptRaidTimer').innerHTML = o;
  	
  	var z ='<TABLE class=pbTab><TR><TD width=60px align=center><A onclick="pbStopAll('+t.cityId+')">Ferma</a></td><TD width=70px><b>Tempo</b></td><TD width=85px><b>Coordinate</b></td><TD width=50px><b>Livello</b></td><TD width=50px></td><TD width=50px><A onclick="pbDeleteAll()">Riprendi</a></td></TR>';
  	if (t.rslt['queue'] != ""){
  		for (y in t.rslt['queue']) {
  			if (t.rslt['queue'][y]['botMarches'] != undefined) {
  				for (k in Seed.queue_atkp['city' + t.cityId]){
  					if (Seed.queue_atkp['city' + t.cityId][k]['marchId'] == t.rslt['queue'][y]['botMarches']['marchId']) {
  						botMarchStatus = Seed.queue_atkp['city' + t.cityId][k]['botMarchStatus'];
  						MarchStatus = Seed.queue_atkp['city' + t.cityId][k]['marchStatus'];
  						restPeriod = (Seed.queue_atkp['city' + t.cityId][k]['restPeriod']/60); 
  						destinationUnixTime = Seed.queue_atkp['city' + t.cityId][k]['destinationUnixTime'];
  						returnUnixTime = Seed.queue_atkp['city' + t.cityId][k]['returnUnixTime']
  						now = unixTime();
  						//z+='<TR><TD>('+ botMarchStatus +'/'+ MarchStatus +')</td>';
						z+='<TR>';
  						//if (destinationUnixTime > now && botMarchStatus !=3) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg></td>';
						if (MarchStatus ==1) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg></td>';
						//if ((destinationUnixTime - now) <= 0 && botMarchStatus !=3 && returnUnixTime > now) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg></td>';
						if (MarchStatus ==8 && (destinationUnixTime - now) <= 0 && botMarchStatus !=3 && returnUnixTime > now) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg></td>';	
					if (MarchStatus == 3) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_stopped_desat.png></td>';
					//if (returnUnixTime < now  && botMarchStatus !=3) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_resting.png></td>';
					if (MarchStatus == 4 || (returnUnixTime < now  && botMarchStatus !=3)) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_resting.png></td>';
  						if (destinationUnixTime >= now) z+='<TD>'+ timestr(Seed.queue_atkp['city' + t.cityId][k]['destinationUnixTime'] - unixTime())+'</td>';
  						if (destinationUnixTime <= now) {
  							if ((destinationUnixTime - now) <= 0 && returnUnixTime > now) z+='<TD>'+ timestr(returnUnixTime - now)+'</td>';
  							if (returnUnixTime <= now) z+='<TD>'+ timestr(now - returnUnixTime)+'</td>';
  						}
  					}
  				}
  				z+='<TD>('+ t.rslt['queue'][y]['botMarches']['toXCoord'] +','+ t.rslt['queue'][y]['botMarches']['toYCoord']+')</td>';
  				z+='<TD align=center>'+ t.rslt['queue'][y]['botMarches']['toTileLevel'] +'</td>';
  				if (botMarchStatus == 3) z+='<TD><A onclick="pbEditRaid('+ y +')">Modifica</a></td>';
	  				else z+='<TD><FONT COLOR= "CCCCCC">Modifica</font></td>';
  				if (botMarchStatus == 3) z+='<TD align=center><A onclick="pbDeleteRaid('+ t.rslt['queue'][y]['botMarches']['marchId']+')">Riprendi</a></td>';
  				else z+='<TD align=center><FONT COLOR= "CCCCCC">Riprendi</font></td>';
  				//z +='<TD width=25px></td><TD>Stato: '+ botMarchStat[botMarchStatus]+'</td>';
  				z +='<TD width=25px></td><TD>Tempo rimasto: '+ timestr(restPeriod) +'</td>';
  				z+='</tr>';
  			}
  		}
  	}
  	z+='</table>';
  	if (t.rslt['queue'] == "") z ='<TABLE class=pdxTab><TR><TD>Nessun raid salvato</td></TR>';
  	document.getElementById('PaintRaids').innerHTML = z;
  	
  	var check = true;
  		if (t.save != ""){
  			var a ='<TABLE class=pdxTab><TR><TD width=60px></td><TD width=70px></td><TD width=85px><b>Coordinate</b></td><TD width=50px><b>Livello</b></td><TD width=50px></td><TD width=50px></td></tr>';
  			for (y in t.save){
  				if (t.save[y] != undefined && t.cityId == t.save[y]['cityId']){
  					a +='<TR><TD align=center><A onclick="pbDeleteSavedRaid('+ t.save[y]['marchId'] +')">X</a></td>';
  					a +='<TD></td><TD><FONT COLOR= "CC0000">('+t.save[y]['toXCoord']+','+t.save[y]['toYCoord']+')</font></td>';
  					a +='<TD align=center>'+t.save[y]['toTileLevel']+'</td>';
  					a +='<TD><A onclick="pbEditSavedRaid('+ y +')">Bearbeiten</a></td>';
  					a +='<TD align=center><A onclick="pbAddRaid('+ t.save[y]['marchId']+')">Aggiungi</a></td></tr>';
  					check = false;
  				}	
  			}
  			m+='</table>';
  		}
  		
  	if (check) a ='<TABLE class=pdxTab><TR><TD>Nessun raid salvato</td></TR>';
  	
  	document.getElementById('SavedRaids').innerHTML = a;  	
  	
  	unsafeWindow.pbDeleteRaid = t.DeleteRaid;
  	unsafeWindow.pbEditRaid = t.EditRaid;
  	unsafeWindow.pbAddRaid = t.AddRaid;
  	unsafeWindow.pbDeleteSavedRaid = t.DeleteSavedRaid;
  	unsafeWindow.pbEditSavedRaid = t.EditSavedRaid;
  	unsafeWindow.pbStopAll = t.StopCityRaids;
  	unsafeWindow.pbDeleteAll = t.DeleteCityRaids;
  },
  
  DeleteSavedRaid : function (Id){
    	  var t = Tabs.Raid;
    	  for (yy=0;yy<t.save.length;yy++){
    	  	if (t.save[yy]['marchId'] == Id){
    	  		  t.save.splice (yy,1);
    	  	}	
    	  }
    	  var serverID = getServerId();
    	  setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
    	  t.paint();
    },
  
  EditSavedRaid : function (y){
      var t = Tabs.Raid;
	  var pop = new CPopup ('pbEditRaid', 0,0, 750,350, true);
	  if (t.popFirst){
	    pop.centerMe (mainPop.getMainDiv());  
	    t.popFirst = false;
	  }
	  pop.getTopDiv().innerHTML = '<CENTER><B>KoC Power - Deutsch: Raids </b></center>';
	  cityId =  t.save[y]['cityId'];
	  
		  var m = '<BR><TABLE id=pbRaidAdd height=0% class=pdxTab><TR align="center">';
		  m+='<TR></tr><TR><TD width=25px>X= <INPUT id=toXCoord type=text size=3 maxlength=3 value='+t.save[y]['toXCoord']+'></td>';
		  m+='<TD width=10px></td><TD widht=25px>Y= <INPUT id=toYCoord type=text size=3 maxlength=3 value='+ t.save[y]['toYCoord'] +'></td>';
		  m+='<TD width=25px></td><TD>Runden Trip: '+ timestr((t.save[y]['returnUnixTime'] - t.save[y]['destinationUnixTime'])*2)+ '</td></tr></table>';

		  m += '<BR><TABLE id=pbRaidAdd width=100% height=0% class=pdxTab><TR align="center">';
		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt1']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt2']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt3']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt4']) +'</td></tr>'
		  m += '<TR><TD><INPUT id=Unit1 type=text size=6 maxlength=6 value="'+ t.save[y]['unit1Count']+'"></td>';
		  m += '<TD><INPUT id=Unit2 type=text size=6 maxlength=6 value="'+ t.save[y]['unit2Count']+'"></td>';
		  m += '<TD><INPUT id=Unit3 type=text size=6 maxlength=6 value="'+ t.save[y]['unit3Count']+'"></td>';
		  m += '<TD><INPUT id=Unit4 type=text size=6 maxlength=6 value="'+ t.save[y]['unit4Count']+'"></td></tr>';
		  
		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt5']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt6']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt7']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt8']) +'</td></tr>'
		  m += '<TR><TD><INPUT id=Unit5 type=text size=6 maxlength=6 value="'+ t.save[y]['unit5Count']+'"></td>';
		  m += '<TD><INPUT id=Unit6 type=text size=6 maxlength=6 value="'+ t.save[y]['unit6Count']+'"></td>';
		  m += '<TD><INPUT id=Unit7 type=text size=6 maxlength=6 value="'+ t.save[y]['unit7Count']+'"></td>';
		  m += '<TD><INPUT id=Unit8 type=text size=6 maxlength=6 value="'+ t.save[y]['unit8Count']+'"></td></tr>';
		  
		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt9']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt10']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt11']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt12']) +'</td></tr>'
		  m += '<TR><TD><INPUT id=Unit9 type=text size=6 maxlength=6 value="'+ t.save[y]['unit9Count']+'"></td>';
		  m += '<TD><INPUT id=Unit10 type=text size=6 maxlength=6 value="'+ t.save[y]['unit10Count']+'"></td>';
		  m += '<TD><INPUT id=Unit11 type=text size=6 maxlength=6 value="'+ t.save[y]['unit11Count']+'"></td>';
		  m += '<TD><INPUT id=Unit12 type=text size=6 maxlength=6 value="'+ t.save[y]['unit12Count']+'"></td></tr></table>';
		  
		  m += '<BR><CENTER><SELECT id=AddKnights type=list></select></center>';
		  m+= '<BR><CENTER>'+ strButton20('Speichern', 'id=pbSaveRaid') +'</center>';
	        
	  pop.getMainDiv().innerHTML = m;
	  
	  t.getKnights(cityId);
	  
	  document.getElementById ('AddKnights').value =  t.save[y]['knightId'];
	  document.getElementById ('pbSaveRaid').addEventListener ('click', function(){
	  			t.save[y]['knightId'] = parseInt(document.getElementById ('AddKnights').value);
	  			t.save[y]['toXCoord'] = parseInt(document.getElementById ('toXCoord').value);
	  			t.save[y]['toYCoord'] = parseInt(document.getElementById ('toYCoord').value);
	  			t.save[y]['unit1Count'] = parseInt(document.getElementById ('Unit1').value);
	  			t.save[y]['unit2Count'] = parseInt(document.getElementById ('Unit2').value);
	  			t.save[y]['unit3Count'] = parseInt(document.getElementById ('Unit3').value);
	  			t.save[y]['unit4Count'] = parseInt(document.getElementById ('Unit4').value);
	  			t.save[y]['unit5Count'] = parseInt(document.getElementById ('Unit5').value);
	  			t.save[y]['unit6Count'] = parseInt(document.getElementById ('Unit6').value);
	  			t.save[y]['unit7Count'] = parseInt(document.getElementById ('Unit7').value);
	  			t.save[y]['unit8Count'] = parseInt(document.getElementById ('Unit8').value);
	  			t.save[y]['unit9Count'] = parseInt(document.getElementById ('Unit9').value);
	  			t.save[y]['unit10Count'] = parseInt(document.getElementById ('Unit10').value);
	  			t.save[y]['unit11Count'] = parseInt(document.getElementById ('Unit11').value);
	  			t.save[y]['unit12Count'] = parseInt(document.getElementById ('Unit12').value);
	  			var serverID = getServerId();
	  			setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
	  			pop.show (false);
	  }, false);
	  
	  pop.show (true);  	
    },
      
  EditRaid : function (y){
  	  var t = Tabs.Raid;
  	  var pop = new CPopup ('pbEditRaid', 0,0, 750,350, true);
  	  if (t.popFirst){
  	    pop.centerMe (mainPop.getMainDiv());  
  	    t.popFirst = false;
  	  }
  	  pop.getTopDiv().innerHTML = '<CENTER><B>Power Italy Extra Lux - Raid</b></center>';
  	  cityId = t.rslt['queue'][y]['botMarches']['cityId'];
  	  
  		  var m = '<BR><TABLE id=pbRaidAdd height=0% class=pdxTab><TR align="center">';
  		  m+='<TR></tr><TR><TD width=25px>X= <INPUT id=toXCoord type=text size=3 maxlength=3 value='+t.rslt['queue'][y]['botMarches']['toXCoord']+'></td>';
  		  m+='<TD width=10px></td><TD widht=25px>Y= <INPUT id=toYCoord type=text size=3 maxlength=3 value='+ t.rslt['queue'][y]['botMarches']['toYCoord'] +'></td>';
  		  m+='<TD width=25px></td><TD>Tempo di ronda: '+ timestr((t.rslt['queue'][y]['botMarches']['returnUnixTime'] - t.rslt['queue'][y]['botMarches']['destinationUnixTime'])*2)+ '</td></tr></table>';

  		  m += '<BR><TABLE id=pbRaidAdd width=100% height=0% class=pdxTab><TR align="center">';
  		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt1']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt2']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt3']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt4']) +'</td></tr>'
  		  m += '<TR><TD><INPUT id=Unit1 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit1Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit2 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit2Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit3 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit3Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit4 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit4Count']+'"></td></tr>';
  		  
  		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt5']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt6']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt7']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt8']) +'</td></tr>'
  		  m += '<TR><TD><INPUT id=Unit5 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit5Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit6 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit6Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit7 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit7Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit8 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit8Count']+'"></td></tr>';
  		  
  		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt9']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt10']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt11']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt12']) +'</td></tr>'
  		  m += '<TR><TD><INPUT id=Unit9 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit9Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit10 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit10Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit11 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit11Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit12 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit12Count']+'"></td></tr></table>';
  		  
  		  m += '<BR><CENTER><SELECT id=AddKnights type=list></select></center>';
  		  m+= '<BR><CENTER>'+ strButton20('Salva modifica', 'id=pbRaidSave') +'</center>';
  	        
  	  pop.getMainDiv().innerHTML = m;
  	  
  	  t.getKnights(cityId);
  	  
  	  document.getElementById ('AddKnights').value =  t.rslt['queue'][y]['botMarches']['knightId'];
  	  document.getElementById ('pbRaidSave').addEventListener ('click', function(){
  	  	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  	  			  		
  	  	params.pf = 0;
  	      params.ctrl = 'BotManager';
  	  	params.action = 'editMarch';
  	  	params.settings = {};
  	  	params.settings.cityId = t.rslt['queue'][y]['botMarches']['fromCityId'];
  	  	params.queue = {0:{botMarches:{botMarchStatus:1,botState:1},cityMarches:{}}};    	
  	  	params.queue[0].cityMarches.knightId = parseInt(document.getElementById ('AddKnights').value);
  	  	params.queue[0].cityMarches.toXCoord =  parseInt(document.getElementById ('toXCoord').value);
  	  	params.queue[0].cityMarches.toYCoord =  parseInt(document.getElementById ('toYCoord').value);
  	  	params.queue[0].cityMarches.unit0Count = 0; //document.getElementById ('Unit0').value;
  	  	params.queue[0].cityMarches.unit1Count =  parseInt(document.getElementById ('Unit1').value);
  	  	params.queue[0].cityMarches.unit2Count = parseInt(document.getElementById ('Unit2').value);
  	  	params.queue[0].cityMarches.unit3Count = parseInt(document.getElementById ('Unit3').value);
  	  	params.queue[0].cityMarches.unit4Count = parseInt(document.getElementById ('Unit4').value);
  	  	params.queue[0].cityMarches.unit5Count = parseInt(document.getElementById ('Unit5').value);
  	  	params.queue[0].cityMarches.unit6Count = parseInt(document.getElementById ('Unit6').value);
  	  	params.queue[0].cityMarches.unit7Count = parseInt(document.getElementById ('Unit7').value);
  	  	params.queue[0].cityMarches.unit8Count = parseInt(document.getElementById ('Unit8').value);
  	  	params.queue[0].cityMarches.unit9Count = parseInt(document.getElementById ('Unit9').value);
  	  	params.queue[0].cityMarches.unit10Count = parseInt(document.getElementById ('Unit10').value);
  	  	params.queue[0].cityMarches.unit11Count = parseInt(document.getElementById ('Unit11').value);
  	  	params.queue[0].cityMarches.unit12Count = parseInt(document.getElementById ('Unit12').value);
  	  	params.queue[0].cityMarches.marchId =  t.rslt['queue'][y]['botMarches']['marchId'];
  	  	
  	  	 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  				  		method: "post",
  				         parameters: params,
  						 loading: true,
  						 onSuccess: function(transport){
  							var rslt = eval("(" + transport.responseText + ")");
  		                      if (rslt.ok) {
  		                      		pop.show (false);
  									unsafeWindow.cityinfo_army();
  		                          setTimeout(unsafeWindow.update_seed_ajax, 250);
  		                          setTimeout(t.GetRaids, (750),Seed.cities[i][0]);
  								}
  						 },
  				 });
  	  	}, false);
  	  
  	  pop.show (true);  	
  },
  
  DeleteRaid : function (Id){
  	var t = Tabs.Raid;
  	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  	
  	for (y in t.rslt['queue']) {
  		if (t.rslt['queue'][y]['botMarches'] != undefined) {
	  		if (t.rslt['queue'][y]['botMarches']['marchId'] == Id) {
	  				marchId = t.rslt['queue'][y]['botMarches']['marchId'];
	  				cityId = t.rslt['queue'][y]['botMarches']['cityId'];
	  				knightId = t.rslt['queue'][y]['botMarches']['knightId'];
	  				toTileLevel = t.rslt['queue'][y]['botMarches']['toTileLevel'];
	  				returnUnixTime = t.rslt['queue'][y]['botMarches']['returnUnixTime'];
	  				destinationUnixTime = t.rslt['queue'][y]['botMarches']['destinationUnixTime'];
	  				toXCoord = t.rslt['queue'][y]['botMarches']['toXCoord'];
	  				toYCoord = t.rslt['queue'][y]['botMarches']['toYCoord'];
	  				var units = {};
	  				for (i=1;i<13;i++) units[i] = t.rslt['queue'][y]['botMarches']['unit'+i+'Count'];
	  		}
	  	}
  	}	
  	
  	params.pf = 0;
  	params.ctrl = 'BotManager';
  	params.action = 'deleteMarch';
  	params.marchId = marchId;
  	params.settings = {};
  	params.settings.cityId = cityId;
  	
    new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  	         method: "post",
  	         parameters: params,
  			 loading: true,
  			 onSuccess: function(transport){
  				var rslt = eval("(" + transport.responseText + ")");
  	              	if (rslt.ok) {
  	              	  var serverID = getServerId();
  	              	  t.save = GM_getValue ('SavedRaids_'+serverID);
  	              	  if (t.save != undefined) t.save = JSON2.parse (t.save);
  	              	  if (t.save == undefined) t.save =new Array();

  	              	  t.save.push ({
  	              	  	marchId:		marchId,
  	              	  	cityId:   		cityId,
  	              	  	knightId:		knightId,
  	              	  	toTileLevel:	toTileLevel,
  	              	  	returnUnixTime:	destinationUnixTime,
  	              	  	returnUnixTime:	returnUnixTime,
  	              	  	toXCoord:		toXCoord,
  	              	  	toYCoord:		toYCoord,
  	              	  	unit1Count: 	units[1],
  	              	  	unit2Count: 	units[2],
  	              	  	unit3Count: 	units[3],
  	              	  	unit4Count: 	units[4],
  	              	  	unit5Count: 	units[5],
  	              	  	unit6Count: 	units[6],
  	              	  	unit7Count: 	units[7],
  	              	  	unit8Count: 	units[8],
  	              	  	unit9Count: 	units[9],
  	              	  	unit10Count: 	units[10],
  	              	  	unit11Count: 	units[11],
  	              	  	unit12Count: 	units[12],
  	              	  });
					  var troops = Seed.units["city" + cityId];
	    	              	  for (var u = 1; u <= 12; ++u) {
	    	              	      var troop_number = parseInt(rslt["unit" + u + "Return"]);
	    	              	      if (isNaN(troop_number)) {
	    	              	          troop_number = parseInt(Seed.units["city" + cityId]["unt" + u]);
	    	              	      } else troop_number = parseInt(rslt["unit" + u + "Return"]) + parseInt(Seed.units["city" + cityId]["unt" + u]);
	    	              	      troops["unt" + u] = troop_number;
	    	              	  }
  	              	  setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
                      unsafeWindow.cityinfo_army();	  
  	                  setTimeout(unsafeWindow.update_seed_ajax, 250);
  	                 
  					}
  			 },
  	 });
},
  
  StopCityRaids : function (cityId){
    	var t = Tabs.Raid;
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

    	
    	params.pf = 0;
    	params.ctrl = 'BotManager';
    	params.action = 'stopAll';
    	params.settings = {};

  	    params.settings.cityId = cityId;
  	    		
    	 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
    		  		method: "post",
    		         parameters: params,
    				 loading: true,
    				 onSuccess: function(transport){
    					var rslt = eval("(" + transport.responseText + ")");
    	                  if (rslt.ok) {
  								
    					  }
    				 },
    		 });   
    setTimeout(t.GetRaids, (750), cityId); 	
    },
  
  StopAllRaids : function (){
      	var t = Tabs.Raid;
      	if (t.stopping == true || t.resuming == true || t.deleting == true) return;
      	if (t.activecount == 0) return;
	    t.stopping = true; 	
	      	for (i=0;i<Seed.cities.length;i++){
		      	setTimeout(t.DoAllStop, (i*1500),i);
		     }
   },
   
   ResumeAllRaids : function (){
       	var t = Tabs.Raid;
       	if (t.stopping == true || t.resuming == true || t.deleting == true) return;
       	if (t.stopcount == 0) return;
       	t.resuming = true;
   			for (i=0;i<Seed.cities.length;i++){
   			    setTimeout(t.DoAllResume, (i*1500),i);
   			}
    },
   
   
   DeleteAllRaids : function (){
       	var t = Tabs.Raid;
       	if (t.stopping == true || t.resuming == true || t.deleting == true) return;
       	if (t.stopcount == 0) return;
       	t.deleting = true;
       	count=0;
       	t.count = t.stopcount;
				for (d=0; d< Seed.cities.length;d++) {
						cityID = 'city' + Seed.cities[d][0];    
							for (e in Seed.queue_atkp[cityID]){
								destinationUnixTime = Seed.queue_atkp[cityID][e]['destinationUnixTime']; 
								MarchStatus = Seed.queue_atkp[cityID][e]['marchStatus'];
								MarchType = Seed.queue_atkp[cityID][e]['marchType'];
								if (MarchType == 9 && (botMarchStatus == 3 || MarchStatus == 3)) {
									count++;
									setTimeout(t.DoAllDelete, (count*1250), (Seed.queue_atkp[cityID][e]['marchId']),d,count);
								}
							}
				}
    }, 
    
  
  DoAllStop: function(i) {
    var t = Tabs.Raid;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  	params.pf = 0;
  	params.ctrl = 'BotManager';
  	params.action = 'stopAll';
  	params.settings = {};
  	params.settings.cityId = Seed.cities[i][0];
  	    		
  		 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  			  		method: "post",
  			         parameters: params,
  					 loading: true,
  					 onSuccess: function(transport){
  						var rslt = eval("(" + transport.responseText + ")");
  		                  if (rslt.ok) {
  		                  		t.stopprogress = t.stopprogress + (100/Seed.cities.length);
  		                  		actionLog('Raids Stoppen: '+ Seed.cities[i][1]);
  		                  		updateraidbutton('Raids Stoppen: '+ t.stopprogress.toFixed(0) + '%', 'pbraidtab');
  		                  		if (t.stopprogress.toFixed(0) == 100) {
  		                  			 t.stopprogress = 0;
  		                  			 setTimeout(function(){updateraidbutton('Raids Stoppen ('+ t.activecount + ')', 'pbraidtab');t.stopping = false;}, (5000));
  		                  		}		
  						  }
  						  else {
  						  		if (rslt.msg == "The system is busy, please try again later") setTimeout (t.DoAllStop, (2000),i);
  						  		else {
  					 	  			t.stopprogress = t.stopprogress + (100/Seed.cities.length);
  					 	  			actionLog('Raids Stoppen: '+ Seed.cities[i][1] + ' - ' + rslt.msg);
  					 	  			updateraidbutton('Raids Stoppen: '+ t.stopprogress.toFixed(0) + '%', 'pbraidtab')
  					 	  			if (t.stopprogress.toFixed(0) == 100) {
  					 	  				 t.stopprogress = 0;
  					 	  				 setTimeout(function(){updateraidbutton('Raids Stoppen ('+ t.activecount + ')', 'pbraidtab');t.stopping = false;}, (5000));
  					 	  			}
  					 	  		}
  					 	  }
  					 },
    });  
  },

  DoAllResume: function(i) {
    var t = Tabs.Raid;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  	params.pf = 0;
  	params.ctrl = 'BotManager';
  	params.action = 'resumeAll';
  	params.settings = {};
    params.settings.cityId = Seed.cities[i][0];
  	    		
  		 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  			  		method: "post",
  			         parameters: params,
  					 loading: true,
  					 onSuccess: function(transport){
  						var rslt = eval("(" + transport.responseText + ")");
  		                  if (rslt.ok) {
  		                  		t.stopprogress = t.stopprogress + (100/Seed.cities.length);
  		                  		actionLog('Raid Angriff: '+ Seed.cities[i][1]);
  		                  		updateraidbutton('Raid Angriff: '+ t.stopprogress.toFixed(0) + '%', 'pbraidtabRes');
  		                  		if (t.stopprogress.toFixed(0) == 100) {
  		                  			 t.stopprogress = 0;
  		                  			 setTimeout(function(){updateraidbutton('Raid Angriff ('+ t.stopcount + ')', 'pbraidtabRes');t.resuming = false;}, (5000));
  		                  		}		
  						  }
  						  else {
  						  		if (rslt.msg == "The system is busy, please try again later") setTimeout (t.DoAllResume, (2000),i);
  						  		else {
  					 	  			t.stopprogress = t.stopprogress + (100/Seed.cities.length);
  					 	  			actionLog('Raids Stoppen: '+ Seed.cities[i][1]  + ' - ' + rslt.msg);
  					 	  			updateraidbutton('Raid Angriff: '+ t.stopprogress.toFixed(0) + '%', 'pbraidtabRes')
  					 	  			if (t.stopprogress.toFixed(0) == 100) {
  					 	  				 t.stopprogress = 0;
  					 	  				 setTimeout(function(){updateraidbutton('Raid Angriff ('+ t.stopcount + ')', 'pbraidtabRes');t.resuming = false;}, (5000));
  					 	  			}	
  					 	  		}
  					 	  }
  					 },
    });  
  },
  
  DoAllDelete : function (Id,city,count){
    	var t = Tabs.Raid;
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	
    	cityID = 'city'+ Seed.cities[city][0];
    	
    	for (f in Seed.queue_atkp[cityID]){
    		if (Seed.queue_atkp[cityID][f]['marchId'] == Id) {
    				marchId = Seed.queue_atkp[cityID][f]['marchId'];
    				cityId = Seed.queue_atkp[cityID][f]['cityId'];
    				knightId = Seed.queue_atkp[cityID][f]['knightId'];
    				toTileLevel = Seed.queue_atkp[cityID][f]['toTileLevel'];
    				returnUnixTime = Seed.queue_atkp[cityID][f]['returnUnixTime'];
    				destinationUnixTime = Seed.queue_atkp[cityID][f]['destinationUnixTime'];
    				toXCoord = Seed.queue_atkp[cityID][f]['toXCoord'];
    				toYCoord = Seed.queue_atkp[cityID][f]['toYCoord'];
    				var units = {};
    				for (i=1;i<13;i++) units[i] = Seed.queue_atkp[cityID][f]['unit'+i+'Count'];
    		}
    	}
    	
    	params.pf = 0;
    	params.ctrl = 'BotManager';
    	params.action = 'deleteMarch';
    	params.marchId = marchId;
    	params.settings = {};
    	params.settings.cityId = cityId;
    	
      new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
    	         method: "post",
    	         parameters: params,
    			 loading: true,
    			 onSuccess: function(transport){
    				var rslt = eval("(" + transport.responseText + ")");
    	              if (rslt != "") {
    	              	  var serverID = getServerId();
    	              	  t.save = GM_getValue ('SavedRaids_'+serverID);
    	              	  if (t.save != undefined) t.save = JSON2.parse (t.save);
    	              	  if (t.save == undefined) t.save =new Array();
  
    	              	  t.save.push ({
    	              	  	marchId:		marchId,
    	              	  	cityId:   		cityId,
    	              	  	knightId:		knightId,
    	              	  	toTileLevel:	toTileLevel,
    	              	  	returnUnixTime:	destinationUnixTime,
    	              	  	returnUnixTime:	returnUnixTime,
    	              	  	toXCoord:		toXCoord,
    	              	  	toYCoord:		toYCoord,
    	              	  	unit1Count: 	units[1],
    	              	  	unit2Count: 	units[2],
    	              	  	unit3Count: 	units[3],
    	              	  	unit4Count: 	units[4],
    	              	  	unit5Count: 	units[5],
    	              	  	unit6Count: 	units[6],
    	              	  	unit7Count: 	units[7],
    	              	  	unit8Count: 	units[8],
    	              	  	unit9Count: 	units[9],
    	              	  	unit10Count: 	units[10],
    	              	  	unit11Count: 	units[11],
    	              	  	unit12Count: 	units[12],
    	              	  });
						  var troops = Seed.units["city" + cityId];
	                      for (var u = 1; u <= 12; ++u) {
                          var troop_number = parseInt(rslt["unit" + u + "Return"]);
	                          if (isNaN(troop_number)) {
                              troop_number = parseInt(Seed.units["city" + cityId]["unt" + u]);
 	                          } else troop_number = parseInt(rslt["unit" + u + "Return"]) + parseInt(Seed.units["city" + cityId]["unt" + u]);

 	                          troops["unt" + u] = troop_number;

 	                      }
	                      for (u in Seed.queue_atkp['city' + cityId]){
 	                      	if (Seed.queue_atkp['city' + cityId][u]['marchId'] == marchId){
 								Seed.queue_atkp['city' + cityId][u] = "";
 	                      		unsafeWindow.seed.queue_atkp['city' + cityId] = Seed.queue_atkp['city' + cityId];
 	                      	}
 	                      }
 	                      for (u in Seed.knights['city' + cityId]){
 	                      	if (Seed.knights['city' + cityId][u]['knightId'] == knightId){
	                      		Seed.knights['city' + cityId][u]["knightStatus"] = 1;
	                      		unsafeWindow.seed.knights['city' + cityId] = Seed.knights['city' + cityId];
 	                      	}
 	                      }
    	              	  setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
                          unsafeWindow.cityinfo_army();	  
    	                  setTimeout(unsafeWindow.update_seed_ajax, 250);
    	                  t.GetRaids(cityId);
    					}
    			 },
    	 });
  		  	 t.stopprogress = count * (100/t.count);
  		  	 actionLog('Raids Löschen: '+ Seed.cities[city][1]);
  		  	 updateraidbutton('Raids Löschen: '+ t.stopprogress.toFixed(0) + '%', 'pbraidtabDel');
  		  	 if (t.stopprogress.toFixed(0) == 100) {
  		  	 	 t.stopprogress = 0;
				 t.GetRaids(cityId);
  		  	 	 setTimeout(function(){updateraidbutton('Raids Löschen ('+ t.stopcount + ')', 'pbraidtabDel');t.deleting  = false;}, (5000));
  	}	
    	 
},
  
      
  DeleteCityRaids : function (){
      	var t = Tabs.Raid;
      	alert('Dieser Button wird noch hinzugefügt...');
      	/*var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  
      	
      	params.pf = 0;
      	params.ctrl = 'BotManager';
      	params.action = 'stopAll';
      	params.settings = {};
  
    	    params.settings.cityId = t.cityId;
    	    		
      	 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
      		  		method: "post",
      		         parameters: params,
      				 loading: true,
      				 onSuccess: function(transport){
      					var rslt = eval("(" + transport.responseText + ")");
      	                  if (rslt.ok) {
    								
      					  }
      				 },
      		 }); */   	
      },
        
    	
  AddRaid : function (Id){
    	var t = Tabs.Raid;
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	update = {};
    	
    	params.pf = 0;
    	params.ctrl = 'BotManager';
    	params.action = 'saveMarch';
    	params.settings = {};
    	params.queue = {0:{botMarches:{botMarchStatus:1,botState:1},cityMarches:{}}};
    	
    	for (y in t.save){
    		if (t.save[y]['marchId'] == Id){
	    		params.settings.cityId = t.save[y]['cityId'];
	    		params.queue[0].cityMarches.knightId = t.save[y]['knightId']; //parseInt(document.getElementById('AddKnights').value);
	    		params.queue[0].cityMarches.toXCoord = t.save[y]['toXCoord'];
	    		params.queue[0].cityMarches.toYCoord = t.save[y]['toYCoord'];
	    		params.queue[0].cityMarches.unit0Count = 0; //document.getElementById ('Unit0').value;
	    		params.queue[0].cityMarches.unit1Count = t.save[y]['unit1Count'];
	    		params.queue[0].cityMarches.unit2Count = t.save[y]['unit2Count'];
	    		params.queue[0].cityMarches.unit3Count = t.save[y]['unit3Count'];
	    		params.queue[0].cityMarches.unit4Count = t.save[y]['unit4Count'];
	    		params.queue[0].cityMarches.unit5Count = t.save[y]['unit5Count'];
	    		params.queue[0].cityMarches.unit6Count = t.save[y]['unit6Count'];
	    		params.queue[0].cityMarches.unit7Count = t.save[y]['unit7Count'];
	    		params.queue[0].cityMarches.unit8Count = t.save[y]['unit8Count'];
	    		params.queue[0].cityMarches.unit9Count = t.save[y]['unit9Count'];
	    		params.queue[0].cityMarches.unit10Count = t.save[y]['unit10Count'];
	    		params.queue[0].cityMarches.unit11Count = t.save[y]['unit12Count'];
	    		params.queue[0].cityMarches.unit12Count = t.save[y]['unit12Count'];
    		}
    	}	
    	 
    	 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
    		  		method: "post",
    		         parameters: params,
    				 loading: true,
    				 onSuccess: function(transport){
    					var rslt = eval("(" + transport.responseText + ")");
    	                  if (rslt.ok) {
								t.GetRaids(params.settings.cityId);
      					        unsafeWindow.cityinfo_army();
      	                  		setTimeout(unsafeWindow.update_seed_ajax, 250);
      	                  		for (yy=0;yy<t.save.length;yy++){
      	                  			if (t.save[yy]['marchId'] == Id){
      	                  				  t.save.splice (yy,1);
      	                  			}	
      	                  		}
      	                  		var serverID = getServerId();
      	                  		setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
      	                  		t.paint();
    					 } else {
    					 	 /* var pop = new CPopup ('pbEditRaid', 0,0, 750,250, true);
				 		  	  if (t.popFirst){
				 		  	    pop.centerMe (mainPop.getMainDiv());  
				 		  	    t.popFirst = false;
				 		  	  }
				 		  	  pop.getTopDiv().innerHTML = '<CENTER><B>ERROR</b></center>';
				 		  	  var m= '<TABLE id=pbRaidAdd width=100% height=0% class=pdxTab><TR align="center">';
				 			  m +=  '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/merlin_img.jpg"></td>';
				 			  m+='<TD style="align;left; max-width:200px; text-wrap:normal;word-wrap:break-word"><B>'+ rslt.msg+'</b></td>';
				 		  	  m+='<TD><CENTER>'+ strButton20('OK', 'id=pbOK') +'</center></td></tr>';
				 		  	  pop.getMainDiv().innerHTML = m;
				 			  document.getElementById('pbOK').addEventListener ('click', function(){pop.show (false)},false);
				 		  	  pop.show (true);*/
				 		  	  alert('Error: '+ rslt.msg);  	
    					 }
    				 },
    		 });    	
    },
    
        
  getKnights : function(cityId){
         var t = Tabs.Raid;
         var knt = new Array();
         var status ="";
         for (k in Seed.knights['city' + cityId]){
         		if ( Seed.leaders['city' + cityId]["resourcefulnessKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["politicsKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["combatKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["intelligenceKnightId"] != Seed.knights['city' + cityId][k]["knightId"]){
         		   if (Seed.knights['city' + cityId][k]["knightStatus"] == 1 ) status = "Free";
         		   else status = "Marching";
         			knt.push ({
         				Name:   Seed.knights['city' + cityId][k]["knightName"],
         				Combat:	parseInt(Seed.knights['city' + cityId][k]["combat"]),
         				ID:		Seed.knights['city' + cityId][k]["knightId"],
         				Status: status,
         			});
         		}
         }
         knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
         document.getElementById('AddKnights').options.length=0;
  		var o = document.createElement("option");
  		o.text = '--Scegli un cavaliere--';
  		o.value = 0;
  		document.getElementById("AddKnights").options.add(o);
         for (k in knt){
      			if (knt[k]["Name"] !=undefined){
  	    			var o = document.createElement("option");
  	    			o.text = (knt[k]["Name"] + ' (' + knt[k]["Combat"] +') (' + knt[k]["Status"] +')');
  	    			o.value = knt[k]["ID"];
  	    			document.getElementById("AddKnights").options.add(o);
      			}
      	}
      },
  
    
  clickCitySelect : function (city){
  	var t = Tabs.Raid;
  	t.cityId = city['id'];
  	t.GetRaids(t.cityId);
  },
  
  checkRaids : function (){
	var t = Tabs.Raid;
	if(!Options.RaidRunning) return;
	
	for (g=0;g<Seed.cities.length;g++){
				if(t.checkRaidresting('city'+Seed.cities[g][0]) && !Options.alertConfig.raidautoswitch[Seed.cities[g][0]]){
				t.resumeRaids(Seed.cities[g][0]);
		}
	}
	
t.raidtimer = setTimeout(t.checkRaids, 10*1000);
  },
  
  checkRaidresting : function (city){
	for(i in Seed.queue_atkp[city]){
		//Check if march is a barb raid if not disregard
		if(Seed.queue_atkp[city][i].marchType == 9)
			//Sometimes it only updates the marchstatus and not the botmarchstatus
			if(Seed.queue_atkp[city][i].botMarchStatus == 7 ||
				Seed.queue_atkp[city][i].marchStatus == 4 ||
				(unixTime() > Seed.queue_atkp[city][i].returnUnixTime && Seed.queue_atkp[city][i].marchStatus == 8) ||
				(Seed.queue_atkp[city][i].marchStatus == 3 && Seed.queue_atkp[city][i].botMarchStatus != 4)) 
				return true;
	}
	return false;
  },

  
  GetRaids : function(cityId){
  		var t = Tabs.Raid;
  		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  		  		
  		params.pf = 0;
  		params.ctrl = 'BotManager';
  		params.action = 'getMarches';
  		params.settings = {};
  		params.settings.cityId = cityId;
  		
  		
   		new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  		         method: "post",
  		         parameters: params,
  				 loading: true,
  				 onSuccess: function(transport){
  					var rslt = eval("(" + transport.responseText + ")");
                        if (rslt.ok) {
                        	t.rslt = rslt;
  							t.paint();
  							unsafeWindow.cityinfo_army();
  							setTimeout(unsafeWindow.update_seed_ajax, 250);
  							if ((86400 - (unixTime() - rslt.settings.lastUpdated )) < 43200) t.resetRaids(cityId);
  						}
  				 },
  		 });
  },
  
  
  resetRaids : function(cityId){
  		var t = Tabs.Raid;
  		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  		  		
  		params.pf = 0;
  		params.ctrl = 'BotManager';
  		params.action = 'resetRaidTimer';
		params.settings = {};
  		params.settings.cityId = cityId;
  		
  		
   		new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  		         method: "post",
  		         parameters: params,
				 loading: true,
				 onSuccess: function(transport){
					var rslt = eval("(" + transport.responseText + ")");
                        if (rslt.ok) {
							unsafeWindow.cityinfo_army();
                            setTimeout(unsafeWindow.update_seed_ajax, 250);
                            logit('reset' +cityId);
						}
				 },
  		 });
  },
  resumeRaids : function(cityId){
	  		var t = Tabs.Raid;
	  		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

 	  		params.pf = 0;
	  		params.ctrl = 'BotManager';
	  		params.action = 'resumeAll';
			params.settings = {};
 	  		params.settings.cityId = cityId;

 	   		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
 	  		         method: "post", 
 	  		         parameters: params,
 					 loading: true,
 					 onSuccess: function(transport){
 						var rslt = eval("(" + transport.responseText + ")"); 
 	                        if (rslt.ok) {
 								unsafeWindow.cityinfo_army();
	                            setTimeout(unsafeWindow.update_seed_ajax, 250);
                            logit('resume ' +cityId);
							}
					 },

 	  		 });

 	  },
   sendreport: function(){
	  var t = Tabs.Raid;
	  var total = 0;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.emailTo = Seed.player['name'];
    params.subject = "Raid Übersicht";
    var message = 'Raid Stats:' + '%0A';
    message += '%0A'+'%0A' + 'Nahrungs Gewinn (nach 1 Stunde Schlachten)' +'%0A';
    for (q=1;q<=Seed.cities.length;q++){
    	var cityID = 'city' + Seed.cities[q-1][0];
    	var gain = parseInt(Seed.resources[cityID]['rec1'][0] / 3600) - AttackOptions.Foodstatus[q];
    	message+= Seed.cities[q-1][1] + ': Anfang: ' + addCommas(AttackOptions.Foodstatus[q]) + ' - Danach :' + addCommas(parseInt(Seed.resources[cityID]['rec1'][0] / 3600)) + ' - Gewinn: ';
    	message += addCommas(gain)  + '%0A';
		total += gain;
    }
	message += '%0A Nahrungs Gewinn Insgesammt: '+addCommas(total)+'%0A';
    params.message = message;
    params.requestType = "COMPOSED_MAIL";
    new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
            if (rslt.ok) {
            } else {
            }
        },
        onFailure: function () {
        },
    });
  
  },
  
  toggleRaidState : function (){
  	var t = Tabs.Raid;
  	if(Options.RaidRunning){
  		Options.RaidRunning = false;
  		t.raidtimer = null;
  		document.getElementById('pbRaidStart').value = 'Auto Reset = NO';
  	} else {
  		Options.RaidRunning = true;
  		t.raidtimer = setTimeout(t.checkRaids, 5000);
  		document.getElementById('pbRaidStart').value = 'Auto Reset = SI';
  	}
	saveOptions();
  },
  
    
  hide : function (){
        var t = Tabs.Raid;
        mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 900 + 'px';
  },

  show : function (){
        var t = Tabs.Raid;
        mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 900 + 'px';
  },
 }; 
/*************************************** MARCHES TAB ************************************************/

Tabs.Marches = {
  tabLabel : 'Marce',
tabOrder : toMarsch,
  cont:null,
  displayTimer:null,
  curTabBut : null,
  curTabName : null,
  widescreen:true,
    
  init : function (div){
    var t = Tabs.Marches;
    unsafeWindow.pr56Recall = t.butRecall;
    unsafeWindow.r8x6Home = t.butSendHome;
    unsafeWindow.cancelMarch = t.butcancelmarch;
    
    t.cont = div;
    t.cont.innerHTML = '<TABLE class=pdxTab align=center><div class=pdxStat>MÄRSCHE, ANGRIFFE, VERSTÄRKUNG UND BARBAREN LAGER STATS</div><TR><TD><INPUT class=pbSubtab ID=ptmrchSubA type=submit value=Angriffe></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubM type=submit value=Märsche></td>\
<TD><INPUT class=pbSubtab ID=ptmrchSubB type=submit value="Lager Stats"></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubR type=submit value=Botschaft></td></tr></table><HR class=ptThin>\
      <DIV id=ptMarchOutput style="margin-top:10px; background-color:white; height:680px; overflow:scroll;"></div>';
            
    t.marchDiv = document.getElementById('ptMarchOutput');
    document.getElementById('ptmrchSubA').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubR').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubB').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubM').addEventListener('click', e_butSubtab, false);
    changeSubtab (document.getElementById('ptmrchSub'+Options.curMarchTab));
    
    function e_butSubtab (evt){
      changeSubtab (evt.target);   
    }

    function changeSubtab (but){
      if (but == t.curTabBut)
        return;
      if (t.curTabBut){
        t.curTabBut.className='pbSubtab';
        t.curTabBut.disabled=false;
      }
      t.curTabBut = but;
      but.className='pbSubtab pbSubtabSel';
      but.disabled=true;
      t.curTabName = but.id.substr(9);
      Options.curMarchTab = t.curTabName;
      t.show ();
    }    
  },

  hide : function (){
    var t = Tabs.Marches;
    clearTimeout (t.displayTimer);
  },
  
  show : function (){
    var t = Tabs.Marches;
    clearTimeout (t.displayTimer);
    if (t.curTabName == 'R')
      t.showReinforcements();
    else if (t.curTabName == 'M')
      t.showMarches();
    else if (t.curTabName == 'B')
      t.showBarbSummary();
    else
      t.showIncoming();
  },
  
  /***   Incoming SUBTAB  ***/
      showIncoming : function (){
        var t = Tabs.Marches;
    var count = 0;
        t.marchDiv.innerHTML = null;  

        var z = '<TABLE id=pdincoming cellSpacing=10 width=100% height=0% class=pdxTab><div class=pdxStat>ANGRIFFE AUF DIE HEILIGTÜMER</div>';

        for (k in Seed.queue_atkinc) {
          if(Seed.queue_atkinc.length !=0){
        var now = unixTime();
        count+=1;
        var icon, status, FROM, cityname, FROMmight, marchdir, marchtime;
        var marchType = parseInt(Seed.queue_atkinc[k]["marchType"]);
        var marchStatus = parseInt(Seed.queue_atkinc[k]["marchStatus"]);
        
        for (var i=0; i<Seed.cities.length;i++) {
          if (Seed.cities[i][0] == Seed.queue_atkinc[k]["toCityId"]) cityname = Seed.cities[i][1];
        }   
      
        if (Seed.queue_atkinc[k]["destinationUnixTime"] < now || marchStatus == 8)
          marchdir = "returning";
        else
          marchdir = "going";  
        
        var destinationUnixTime = Seed.queue_atkinc[k]["arrivalTime"] - now;
        if(destinationUnixTime > 0)
          marchtime = timestr(destinationUnixTime, true)
        else
          marchtime = 'Arrived';
        
        if (marchType != 3 && marchType !=4){
          var player = Seed.players['u'+Seed.queue_atkinc[k]["fromPlayerId"]]
          FROM = player.n;
          FROMmight = player.m;
        }
        else {
          for (players in Seed.players){
            if (marchType == 3 || marchType == 4){
              if (('u'+Seed.queue_atkinc[k]["pid"]) == players){
                FROM = Seed.players[players]["n"];
                FROMmight = Seed.players[players]["m"];
              }
            }
          }
        }
        
        if (marchType == 2 && marchStatus == 2) marchType = 102;
        
        switch (marchType) {
          case 1: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg";status="Transport";break;
          case 2: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg";status="Verstäkung";break;
          case 3: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg";status="Spähen";break;
          case 4: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg";status="Angriff";break;
          case 9: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg";status="Angriff";break;
          case 5: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg";status="Neu zurodnen";break;
          case 100: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg";status="Rückmarsch";break;
          case 102: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg";status="Lagernd";break;
        }
        
        if(status == 'Encamped')
          z += '<TD width="10px"><A onclick="r8x6Home('+ Seed.queue_atkinc[k].marchId +')"><img src='+ icon +'></a></td>';
        else
          z += '<TD width="10px"><img src='+ icon +'></td>';
        z += '<TD width="40px">'+ status +'</td>';
        z += '<TD>' + cityname + '</td>';
        z += '<TD>'+ marchtime +'</td>';
        z +='<TD>von: ' + FROM + '</td>';
        z +='<TD>Macht: ' + addCommas(FROMmight) + '</td>';
        if (Seed.queue_atkinc[k]["knt"] != undefined) z +='<TD>Ritter: '+ Seed.queue_atkinc[k]["knt"]["cbt"]+'</td>';
        
        if (Seed.queue_atkinc[k]["gold"] > 0) z += '<TD>Gold:'+ addCommas(Seed.queue_atkinc[k]["gold"]) +'</td>';
        if (Seed.queue_atkinc[k]["resource1"] > 0) z += '<TD>Nahrung: '+ addCommas(Seed.queue_atkinc[k]["resource1"]) +'</td>';
        if (Seed.queue_atkinc[k]["resource2"] > 0) z += '<TD>Holz: '+ addCommas(Seed.queue_atkinc[k]["resource2"]) +'</td>';
        if (Seed.queue_atkinc[k]["resource3"] > 0) z += '<TD>Stein: '+ addCommas(Seed.queue_atkinc[k]["resource3"]) +'</td>';
        if (Seed.queue_atkinc[k]["resource4"] > 0) z += '<TD>Erz: '+ addCommas(Seed.queue_atkinc[k]["resource4"]) +'</td>';
                
        for(i=1; i<13; i++){
          if(Seed.queue_atkinc[k]["unit"+i+"Count"] > 0 && marchdir == "going") z += '<TD>'+ unsafeWindow.unitcost['unt'+i][0] +': '+ addCommas(Seed.queue_atkinc[k]["unit"+i+"Count"]) +'</td>';
          if(Seed.queue_atkinc[k]["unit"+i+"Return"] > 0 && marchdir == "returning") z += '<TD>'+ unsafeWindow.unitcost['unt'+i][0] +': '+ addCommas(Seed.queue_atkinc[k]["unit"+i+"Return"]) +'</td>';
        }
            
        if (marchType == 3)
          if (Seed.queue_atkinc[k]["unts"]["u3"] > 0) z += '<TD>Scouts: '+ addCommas(Seed.queue_atkinc[k]["unts"]["u3"]) +'</td>';
        if (marchType == 4){
          for(ui=1; i<13; i++){
            if (Seed.queue_atkinc[k]["unts"]["u"+ui] > 0) z += '<TD>'+ unsafeWindow.unitcost['unt'+ui][0] +': '+ addCommas(Seed.queue_atkinc[k]["unts"]["u"+ui]) +'</td>';
          }
        }
        
        z += '</tr>';
          }
    }
     z += '</table>';
     t.marchDiv.innerHTML = z;
         if (count==0)
     t.marchDiv.innerHTML = '<TABLE id=pdincoming cellSpacing=10 width=100% height=0% class=pdxTab><div class=pdxStat>ANGRIFFE AUF DIE HEILIGTÜMER</div><BR><center><b>Du wirst zur Zeit nicht Angegriffen! :)</b></center>';
     t.displayTimer = setTimeout (t.showIncoming, 500);  
   },   
      
 	/***  BARB SUMMARY SUBTAB  ***/
	showBarbSummary : function (){
		var t = Tabs.Marches;

		var campsFound = 0;
		var minLevel = 11;
		var maxLevel = 0;
		var minTime = 1369526400;
		var maxTime = 0;
		var troopsLost = 'N';
		var bhcl = [];
		var bhc = [];
		var bhl = [];
		for (var c=0; c <= Cities.numCities; c++) {
			bhcl[c] = [];
			bhc[c] = [];
			bhc[c].count = 0;
			bhc[c].totaldist = 0;
			bhc[c].maxdist = 0;
			bhc[c].totalfood = 0;
			bhc[c].totaltime = 0;
			bhc[c].losses = 'N';
			bhc[c].totalscore = 0;
			for (var l=1; l < 11; l++){
				bhcl[c][l] = [];
				bhcl[c][l].count = 0;
				bhcl[c][l].totaldist = 0;
				bhcl[c][l].maxdist = 0;
				bhcl[c][l].totalfood = 0;
				bhcl[c][l].totaltime = 0;
				bhcl[c][l].losses = 'N';
				bhcl[c][l].totalscore = 0;
			}
		}
		for (var l=1; l < 11; l++){
			bhl[l] = [];
			bhl[l].count = 0;
			bhl[l].totaldist = 0;
			bhl[l].maxdist = 0;
			bhl[l].totalfood = 0;
			bhl[l].totaltime = 0;
			bhl[l].losses = 'N';
			bhl[l].totalscore = 0;
		}
		for (var c=1; c<= Cities.numCities; c++) {
			bhc[c].cityname = '<A onclick=\"ptGotoCity(' + c + ')\">' + Cities.cities[c-1].name + '</A>';
			for (var l=1; l < 11; l++)
				bhcl[c][l].cityname = '<A onclick=\"ptGotoCity(' + c + ')\">' + Cities.cities[c-1].name + '</A>';
		}
		var m5 = '<BR /><TABLE cellspacing=0 width=100%><TR align=center>';
		m5 += '<TH width=20%>Stadt</TH>';
		m5 += '<TH width=6%>Level</TH>';
		m5 += '<TH width=6% align=rightEntf.&nbsp;</TH>';
		m5 += '<TH width=8%>Zeit</TH>';
		m5 += '<TH width=9%>Koords</TH>';
		m5 += '<TH width=6% align=right>Nahrung</TH>';
		m5 += '<TH width=6%>Ritter</TH>';
		m5 += '<TH width=6%>Verluste</TH>';
		m5 += '<TH width=6%>Punkte</TH>';
		m5 += '<TH width=16%>Datum</TH>';
		m5 += '<TH width=11%></TH></TR>';
		for (bh=0; bh<barbHit.length; bh++) {
			campsFound++;
			var city      = barbHit[bh].city;
			var cityname  = '<A onclick=\"ptGotoCity(' + city + ')\">' + barbHit[bh].cityname + '</A>';
			var level     = barbHit[bh].level;
			var hitTime   = barbHit[bh].hitTime;
			var dist      = barbHit[bh].dist;
			var xy        = '<A onclick="ptGotoMap(' + barbHit[bh].x + ',' + barbHit[bh].y +')">'+ barbHit[bh].x + ',' + barbHit[bh].y + '</A>';
			var food      = barbHit[bh].food;
			var combat    = barbHit[bh].combat;
			var losses    = barbHit[bh].losses;
			var marchTime = barbHit[bh].marchTime;
			var score     = 0;
			bhcl[city][level].count++;
			bhcl[city][level].totaldist += dist;
			bhcl[city][level].totalfood += food;
			bhcl[city][level].totaltime += marchTime;
			if (dist > bhcl[city][level].maxdist)
				bhcl[city][level].maxdist = dist;
			bhc[city].count++;
			bhc[city].totaldist += dist;
			bhc[city].totalfood += food;
			bhc[city].totaltime += marchTime;
			if (dist > bhc[city].maxdist)
				bhc[city].maxdist = dist;
			bhl[level].count++;
			bhl[level].totaldist += dist;
			bhl[level].totalfood += food;
			bhl[level].totaltime += marchTime;
			if (dist > bhl[level].maxdist)
				bhl[level].maxdist = dist;
			if (level < minLevel)
				minLevel = level;
			if (level > maxLevel)
				maxLevel = level;
			if (hitTime < minTime)
				minTime = hitTime;
			if (hitTime > maxTime)
				maxTime = hitTime;
			if (losses == 'J') {
				troopsLost = 'J';
				bhcl[city][level].losses = 'J';
				bhc[city].losses = 'J';
				bhl[level].losses = 'J';
			} else { // only give a score if no troops were lost
				if (marchTime > 0) {
					score = 1000 * food / marchTime;
					bhcl[city][level].totalscore += score;
					bhc[city].totalscore += score;
					bhl[level].totalscore += score;
				}
			}
			m5 += '<TR align=center><TD>' + cityname + '</TD>';
			m5 += '<TD>' + level + '</TD>';
			m5 += '<TD align=right>' + show2DPs(dist) + '&nbsp;</TD>';
			m5 += '<TD align=right>' + timestrcolon(marchTime) + '&nbsp;</TD>';
			m5 += '<TD>' + xy + '</TD>';
			m5 += '<TD align=right>' + thouormil(food) + '&nbsp;&nbsp;&nbsp;&nbsp;</TD>';
			m5 += '<TD>' + combat + '</TD>';
			m5 += '<TD>' + losses + '</TD>';
			m5 += '<TD align=right>' + addCommas(parseInt(score)) + '&nbsp;&nbsp;&nbsp;</TD>';
			m5 += '<TD align=right>' + formatUnixTime(hitTime) + '</TD>';
			m5 += '<TD></TD></TR>';
		}
		m5 += '</TABLE>';

		var m3 = '<BR /><TABLE cellspacing=0 width=100%><TR align=center><TR>';
		m3 += '<TH width=20% valign=bottom>Stadt</TH>';
		m3 += '<TH width=6% valign=bottom>Level</TH>';
		m3 += '<TH width=5% valign=bottom>Treffer</TH>';
		m3 += '<TH width=7%>Gesamt<BR/>Nahrung</TH>';
		m3 += '<TH width=6%>Durchschnitt<BR/>Nahrung</TH>';
		m3 += '<TH width=6%>Gesamt<BR/>Entf.</TH>';
		m3 += '<TH width=6%>Durchschnitt<BR/>Entf.</TH>';
		m3 += '<TH width=6%>Max.<BR/>Entf.</TH>';
		m3 += '<TH width=8%>Gesamt<BR/>Zeit</TH>';
		m3 += '<TH width=6%><BR/>Verluste</TH>';
		m3 += '<TH width=7%>Gesamt<BR/>Punkte</TH>';
		m3 += '<TH width=6%>Durchscnitt<BR/>Punkte</TH>';
		m3 += '<TH width=11%></TH></TR>'
		for (var c=1; c<= Cities.numCities; c++) {
			for (var l=1; l < 11; l++) {
				if (bhcl[c][l].count > 0) {
					m3 += '<TR align=center><TD>' + bhcl[c][l].cityname + '</TD>';
					m3 += '<TD>' + l + '</TD>';
					m3 += '<TD align=right>' + bhcl[c][l].count + '&nbsp;&nbsp;</TD>';
					m3 += '<TD align=right>' + addCommas(bhcl[c][l].totalfood) + '&nbsp;&nbsp;</TD>';
					m3 += '<TD align=right>' + addCommas(parseInt(bhcl[c][l].totalfood/bhcl[c][l].count)) + '&nbsp;&nbsp;&nbsp;</TD>';
					m3 += '<TD align=right>' + addCommas(parseInt(bhcl[c][l].totaldist)) + '&nbsp;&nbsp;</TD>';
					m3 += '<TD align=right>' + show2DPs(parseInt((bhcl[c][l].totaldist/bhcl[c][l].count)*100)/100) + '&nbsp;&nbsp;</TD>';
					m3 += '<TD align=right>' + show2DPs(parseInt(bhcl[c][l].maxdist*100)/100) + '&nbsp;&nbsp;</TD>';
					m3 += '<TD align=right>' + timestrcolon(bhcl[c][l].totaltime) + '&nbsp;</TD>';
					m3 += '<TD>' + bhcl[c][l].losses + '</TD>';
					m3 += '<TD align=right>' + addCommas(parseInt(bhcl[c][l].totalscore)) + '&nbsp;&nbsp;&nbsp;</TD>';
					m3 += '<TD align=right>' + addCommas(parseInt(bhcl[c][l].totalscore/bhcl[c][l].count)) + '&nbsp;&nbsp;&nbsp;</TD>';
					m3 += '<TD></TD></TR>';
				}
			}
		}
		m3 += '</TABLE>';

		var m1 = '<BR /><TABLE cellspacing=0 width=100%><TR align=center><TR>';
		m1 += '<TH width=20% valign=bottom>Stadt</TH>';
		m1 += '<TH width=6%></TH>';
		m1 += '<TH width=5% valign=bottom>Treffer</TH>';
		m1 += '<TH width=7%>Gesamt<BR/>Nahrung</TH>';
		m1 += '<TH width=6%>Durchschnitt<BR/>Nahrung</TH>';
		m1 += '<TH width=6%>Gesamt<BR/>Entf.</TH>';
		m1 += '<TH width=6%>Durchschnitt<BR/>Entf.</TH>';
		m1 += '<TH width=6%>Max.<BR/>Entf.</TH>';
		m1 += '<TH width=8%>Gesamt<BR/>Zeit</TH>';
		m1 += '<TH width=6%><BR/>Verluste</TH>';
		m1 += '<TH width=7%>Gesamt<BR/>Punkte</TH>';
		m1 += '<TH width=6%>Durchschnitt<BR/>Punkte</TH>';
		m1 += '<TH width=11%></TH></TR>'
		for (var c=1; c<= Cities.numCities; c++) {
			if (bhc[c].count > 0) {
				m1 += '<TR align=center><TD>' + bhc[c].cityname + '</TD><TD></TD>';
				m1 += '<TD align=right>' + bhc[c].count + '&nbsp;&nbsp;</TD>';
				m1 += '<TD align=right>' + addCommas(bhc[c].totalfood) + '&nbsp;&nbsp;</TD>';
				m1 += '<TD align=right>' + addCommas(parseInt(bhc[c].totalfood/bhc[c].count)) + '&nbsp;&nbsp;&nbsp;</TD>';
				m1 += '<TD align=right>' + addCommas(parseInt(bhc[c].totaldist)) + '&nbsp;&nbsp;</TD>';
				m1 += '<TD align=right>' + show2DPs(parseInt((bhc[c].totaldist/bhc[c].count)*100)/100) + '&nbsp;&nbsp;</TD>';
				m1 += '<TD align=right>' + show2DPs(parseInt(bhc[c].maxdist*100)/100) + '&nbsp;&nbsp;</TD>';
				m1 += '<TD align=right>' + timestrcolon(bhc[c].totaltime) + '&nbsp;</TD>';
				m1 += '<TD>' + bhc[c].losses + '</TD>';
				m1 += '<TD align=right>' + addCommas(parseInt(bhc[c].totalscore)) + '&nbsp;&nbsp;&nbsp;</TD>';
				m1 += '<TD align=right>' + addCommas(parseInt(bhc[c].totalscore/bhc[c].count)) + '&nbsp;&nbsp;&nbsp;</TD>';
				m1 += '<TD></TD></TR>';
			}
		}
		m1 += '</TABLE>';

		var m2 = '<BR /><TABLE cellspacing=0 width=100%><TR align=center><TR>';
		m2 += '<TH width=20%>&nbsp;</TH>';
		m2 += '<TH width=6% valign=bottom>Level</TH>';
		m2 += '<TH width=5% valign=bottom>Treffer</TH>';
		m2 += '<TH width=7%>Gesamt<BR/>Nahrung</TH>';
		m2 += '<TH width=6%>Durchschnitt<BR/>Nahrung</TH>';
		m2 += '<TH width=6%>Gesamt<BR/>Entf.</TH>';
		m2 += '<TH width=6%>Durchschnitt<BR/>Entf.</TH>';
		m2 += '<TH width=6%>Max.<BR/>Entf.</TH>';
		m2 += '<TH width=8%>Gesamt<BR/>Zeit</TH>';
		m2 += '<TH width=6%>Durchschnitt<BR/>Verluste</TH>';
		m2 += '<TH width=7%>Gesamt<BR/>Punkte</TH>';
		m2 += '<TH width=6%>Durchschnitt<BR/>Punkte</TH>';
		m2 += '<TH width=11%></TH></TR>'
			for (var l=1; l < 11; l++) {
				if (bhl[l].count > 0) {
					m2 += '<TR align=center><TD></TD><TD>' + l + '</TD>';
					m2 += '<TD align=right>' + bhl[l].count + '&nbsp;&nbsp;</TD>';
					m2 += '<TD align=right>' + addCommas(bhl[l].totalfood) + '&nbsp;&nbsp;</TD>';
					m2 += '<TD align=right>' + addCommas(parseInt(bhl[l].totalfood/bhl[l].count)) + '&nbsp;&nbsp;&nbsp;</TD>';
					m2 += '<TD align=right>' + addCommas(parseInt(bhl[l].totaldist)) + '&nbsp;&nbsp;</TD>';
					m2 += '<TD align=right>' + show2DPs(parseInt((bhl[l].totaldist/bhl[l].count)*100)/100) + '&nbsp;&nbsp;</TD>';
					m2 += '<TD align=right>' + show2DPs(parseInt(bhl[l].maxdist*100)/100) + '&nbsp;&nbsp;</TD>';
					m2 += '<TD align=right>' + timestrcolon(bhl[l].totaltime) + '&nbsp;</TD>';
					m2 += '<TD>' + bhl[l].losses + '</TD>';
					m2 += '<TD align=right>' + addCommas(parseInt(bhl[l].totalscore)) + '&nbsp;&nbsp;&nbsp;</TD>';
					m2 += '<TD align=right>' + addCommas(parseInt(bhl[l].totalscore/bhl[l].count)) + '&nbsp;&nbsp;&nbsp;</TD>';
					m2 += '<TD></TD></TR>';
				}
			}
		m2 += '</TABLE>';

		var m4 = '<BR /><TABLE cellspacing=0 width=100%><TR align=center><TR>';
		m4 += '<TH width=20% valign=bottom>Stadt</TH>';
		m4 += '<TH width=6% valign=bottom>Level</TH>';
		m4 += '<TH width=5% valign=bottom>Treffer</TH>';
		m4 += '<TH width=7%>Gesamt<BR/>Nahrung</TH>';
		m4 += '<TH width=6%>Durchschnitt<BR/>Nahrung</TH>';
		m4 += '<TH width=6%>Gesamt<BR/>Entf.</TH>';
		m4 += '<TH width=6%>Durchschnitt<BR/>Entf.</TH>';
		m4 += '<TH width=6%>Max<BR/>Entf.</TH>';
		m4 += '<TH width=8%>Gesamt<BR/>Zeit</TH>';
		m4 += '<TH width=6%><BR/>Verluste</TH>';
		m4 += '<TH width=7%>Gesamt<BR/>Punkte</TH>';
		m4 += '<TH width=6%>Durchschnitt<BR/>Punkte</TH>';
		m4 += '<TH width=11%></TH></TR>'
		for (var l=1; l < 11; l++) {
			for (var c=1; c<= Cities.numCities; c++) {
				if (bhcl[c][l].count > 0) {
					m4 += '<TR align=center><TD>' + bhcl[c][l].cityname + '</TD>';
					m4 += '<TD>' + l + '</TD>';
					m4 += '<TD align=right>' + bhcl[c][l].count + '&nbsp;&nbsp;</TD>';
					m4 += '<TD align=right>' + addCommas(bhcl[c][l].totalfood) + '&nbsp;&nbsp;</TD>';
					m4 += '<TD align=right>' + addCommas(parseInt(bhcl[c][l].totalfood/bhcl[c][l].count)) + '&nbsp;&nbsp;&nbsp;</TD>';
					m4 += '<TD align=right>' + addCommas(parseInt(bhcl[c][l].totaldist)) + '&nbsp;&nbsp;</TD>';
					m4 += '<TD align=right>' + show2DPs(parseInt((bhcl[c][l].totaldist/bhcl[c][l].count)*100)/100) + '&nbsp;&nbsp;</TD>';
					m4 += '<TD align=right>' + show2DPs(parseInt(bhcl[c][l].maxdist*100)/100) + '&nbsp;&nbsp;</TD>';
					m4 += '<TD align=right>' + timestrcolon(bhcl[c][l].totaltime) + '&nbsp;</TD>';
					m4 += '<TD>' + bhcl[c][l].losses + '</TD>';
					m4 += '<TD align=right>' + addCommas(parseInt(bhcl[c][l].totalscore)) + '&nbsp;&nbsp;&nbsp;</TD>';
					m4 += '<TD align=right>' + addCommas(parseInt(bhcl[c][l].totalscore/bhcl[c][l].count)) + '&nbsp;&nbsp;&nbsp;</TD>';
					m4 += '<TD></TD></TR>';
				}
			}
		}
		m4 += '</TABLE>';

		var mheader = '<DIV class=pdxStat>BARBAREN LAGER STATS</div>Campo barbaro: ' + addCommas(campsFound);
		if (campsFound > 0) {
			minTime = formatUnixTime(minTime);
			maxTime = formatUnixTime(maxTime);
			if (minTime.substr(0,6) == maxTime.substr(0,6))
				maxTime = maxTime.substr(8,8);
			mheader += ' - Level: ' + minLevel + ' - ' + maxLevel + '; vom ' + minTime + ' bis ' + maxTime;
			if (troopsLost == 'N')
				mheader += ' <SPAN class=boldGreen>und du hast keine Truppen verloren :)</span>';
			else
				mheader += ' <SPAN class=boldRed>leider hast du hast Truppen verloren :/</span>';
			mheader += '<BR />';
		}

		var m6 = '<b><u>ATTENZIONE</u></b>: Die Daten für die Barbaren Lager bekommst du nach einem Refresh und auch nur für die Lager wo die Angriffe bis zum Refresh zurück gekommen sind!<BR />';
		m6 += '<BR />';

		if (barbHit.length == 0)
			t.marchDiv.innerHTML = m6;
		else
			t.marchDiv.innerHTML = mheader + m1 + m2 + m3 + m4 + m5 + m6;

/*
		function fetchbarbreports (pageNo, callback){
			var t = Tabs.Marches;
			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			if (pageNo > 1)
				params.pageNo = pageNo;
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					callback(rslt);
				},
				onFailure: function () {
				},
			});
		}

		function checkbarbreports (rslt){
			var t = Tabs.Marches;
			if(!rslt.ok)
				return;
			if(rslt.arReports.length < 1)
				return;
			var reports = rslt.arReports;
			var totalPages = rslt.totalPages;
			for(var k in reports){
				if (reports[k].side0TileType == 51 && reports[k].side0PlayerId == 0) {
					var report = reports[k];
					var reportId = parseInt(report.reportId);
					t.barbreport[reportId] = [];
					t.barbreport[reportId].reportId = reportId;
					t.barbreport[reportId].reportUnixTime = parseInt(report.reportUnixTime);
					t.barbreport[reportId].barbX = parseInt(report.side0XCoord);
					t.barbreport[reportId].barbY = parseInt(report.side0YCoord);
					t.barbreport[reportId].level = parseInt(report.side0TileLevel);
				}
			}
			var m = '<TABLE cellspacing=0 width=100%><TR align=center><TD><B>Report ID</b></td><TD><B>Datum</b></td><td><b>Coordinate</b></td><td><b>Level</b></td></tr>';
			for (var br in t.barbreport) {
				m += '<TR align=center><TD>' + t.barbreport[br].reportId + '</TD><TD>' + formatUnixTime(t.barbreport[br].reportUnixTime) + '</TD><TD>' + t.barbreport[br].barbX + ',';
				m += t.barbreport[br].barbY + '</TD><TD>' + t.barbreport[br].level + '</TD></TR>';
			}
			m += '</TABLE><BR /><BR />NOTE: This is still very much work-in-progress :-)';
			t.marchDiv.innerHTML = m;
		}

		fetchbarbreports(0, checkbarbreports);
*/
	},       
  /***   MARCHES SUBTAB  ***/
    showMarches : function (){
      var t = Tabs.Marches;
      t.marchDiv.innerHTML =null;  
      var updatemarch = Seed.queue_atkp;
     
     var  m = '<TABLE id=pdmarches cellSpacing=10 width=200px height=0% class=pdxTab>';
     m += '<div class=pdxStat>TRUPPENBEWEGUNG</div>';
     if (t.widescreen) m += '<TR><TD><INPUT id=Wide type=checkbox checked=true>Widescreen</td>';
     else  m += '<TR><TD><INPUT id=Wide type=checkbox unchecked=true>Widescreen</td>';
     m += '<TD colspan=4><INPUT id=TEST type=submit value="Seed Abrufen"></td></tr>';
     m+='</table><TABLE id=pdmarches cellSpacing=10 width=100% height=0% class=pdxTab>';
     for (var c=0; c< Seed.cities.length;c++) {
         cityname = Seed.cities[c][1];
         cityID = 'city' + Seed.cities[c][0];    
        number=0;  
        
        if (Seed.queue_atkp[cityID].length !=0) m+= '<TR><TD colspan=5 align=center><B><DIV class=pdxStat>' + cityname +' </div></b></td></tr>';
          for (k in Seed.queue_atkp[cityID]){
          if (Seed.queue_atkp[cityID].length !=0) {
              var marchID = new String(k);
              marchID = marchID.substr(1);
              var marchType = parseInt(Seed.queue_atkp[cityID][k]["marchType"]);
              var marchStatus = parseInt(Seed.queue_atkp[cityID][k]["marchStatus"]);
              var now = unixTime();

              cityTo = null;
              number++;
          var icon, status, type, cityTo, knight, marchtime;
              
              for (var i=0; i<Seed.cities.length;i++) {
                  if (Seed.cities[i][2] == Seed.queue_atkp[cityID][k]["toXCoord"] && Seed.cities[i][3] == Seed.queue_atkp[cityID][k]["toYCoord"]) cityTo = Seed.cities[i][1];
              }
              
              //for (var i=0; i<Seed.cities.length;i++) {
          //  if (Seed.cities[i][2] == Seed.queue_atkp[cityID][k]["toCityId"]) cityTo = Seed.cities[i][1];
              //}
              
              var destinationUnixTime = Seed.queue_atkp[cityID][k]["destinationUnixTime"] - now;
              var returnUnixTime = Seed.queue_atkp[cityID][k]["returnUnixTime"] - now;
              var encampedUnixTime = now - Seed.queue_atkp[cityID][k]["destinationUnixTime"];
          var restingUnixTime = now - Seed.queue_atkp[cityID][k]["returnUnixTime"];
          
              if (Seed.queue_atkp[cityID][k]["destinationUnixTime"] > now)
            marchtime = timestr(destinationUnixTime, true);
              else
            marchtime = timestr(returnUnixTime, true);
              
              if (Seed.queue_atkp[cityID][k]["destinationUnixTime"] < now && marchType == 2)
            marchtime = timestr(encampedUnixTime, true);
          if (Seed.queue_atkp[cityID][k]["returnUnixTime"] < now && marchType == 9)
            marchtime = timestr(restingUnixTime, true);
            
              if (Seed.queue_atkp[cityID][k]["destinationUnixTime"] < now || marchStatus == 8)
            type = "returning";
              else
            type = "going";
             
          if(Seed.queue_atkp[cityID][k]["destinationUnixTime"] < now){
            if (marchStatus == 8)
              marchtime = timestr(returnUnixTime, true);
            if (type =="returning" && marchType == 2 && marchStatus != 2)
              marchtime = timestr(returnUnixTime, true);
            if (type =="returning" && marchType == 4 && marchStatus == 2)
              marchtime = timestr(returnUnixTime, true);
            if (marchStatus == 2 && marchType !=2)
              marchtime = timestr(returnUnixTime, true);
          }
              if (parseInt(Seed.queue_atkp[cityID][k]["marchType"]) == 4 && marchStatus == 2)
            marchtime = timestr(destinationUnixTime, true);;
              
          
          if (type =="returning" && marchType != 2)
            marchType = 8;
              if (type =="returning" && marchType == 2 && marchStatus == 2)
            marchType = 102;
              if (type =="returning" && marchType == 2 && marchStatus != 2)
            marchType = 8;
              if (marchStatus == 3)
              marchType = 103;
          if (marchStatus == 4)
              marchType = 104;
          
          
              if (parseInt(Seed.queue_atkp[cityID][k]["marchType"]) == 4 && marchStatus == 2) {
              marchType = 102;
              marchtime = timestr(encampedUnixTime, true)
              }
  
              switch (marchType) {
                case 1: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg";status="Transport";break;
                case 2: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg";status="Verstärken";break;
                case 3: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg";status="Spähen";break;
                case 4: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg";status="Angriff";break;
                case 5: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg";status="Neu zuordnen";break;
                case 8: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg";status="Rückmarsch";break;
                case 9: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg";status="Farmen";break;
                case 102: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg";status="Lagernd";break;
            case 103: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_stopped_desat.png";status="Angehalten";break;
            case 104: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_resting.png";status="Warte";break;
              }
                            
              if (Seed.queue_atkp[cityID][k]["knightId"] !=0){
                for (i in Seed.knights[cityID]) {
                    if (i == ("knt" + Seed.queue_atkp[cityID][k]["knightId"]) ) knight = Seed.knights[cityID][i]["combat"];
                }
              } else knight = null;
              
              m += '<TR><TD>'+ number +'</td>';
             if (status=="Encamped" && !t.isMyself(Seed.queue_atkp[cityID][k].fromPlayerId))
            m += '<TD><A onclick="r8x6Home('+ marchID +')"><img src='+ icon +'></a></td>';
             else if(status=='Lagernd' && t.isMyself(Seed.queue_atkp[cityID][k].fromPlayerId))
            m += '<TD><A onclick="pr56Recall('+ marchID +')"><img src='+ icon +'></a></td>';
          else if(status=='Rückmarsch' || status=="Angehalten" || status=="Warte")
            m += '<TD><img src='+ icon +'></td>';
          else
            m += '<TD><A onclick="cancelMarch('+ marchID +')"><img src='+ icon +'></a></td>';
              m += '<TD width="40px">'+ status +'</td>';
              m += '<TD>'+ marchtime +'</td>';
              
              if (cityTo == null)
            m += '<TD style="padding-right:10px;">'+ coordLink(Seed.queue_atkp[cityID][k]["toXCoord"],Seed.queue_atkp[cityID][k]["toYCoord"]) + '</td>';
              else
            m += '<TD style="padding-right:10px;">'+ cityTo +'</td>';
              
              if (knight != null)  m += '<TD>R:'+ knight +'</td>';
              
              if (Seed.queue_atkp[cityID][k]["toTileType"] == 11) m+='<TD>Lago Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
              else if (Seed.queue_atkp[cityID][k]["toTileType"] == 20) m+='<TD>Radura Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
              else if (Seed.queue_atkp[cityID][k]["toTileType"] == 30) m+='<TD>Collina Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
              else if (Seed.queue_atkp[cityID][k]["toTileType"] == 40) m+='<TD>Montagna Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
              else if (Seed.queue_atkp[cityID][k]["toTileType"] == 50) m+='<TD>Pianura Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
            else if (Seed.queue_atkp[cityID][k]["toCityId"] ==0) m +='<TD>Campo barbari Lvl: '+Seed.queue_atkp[cityID][k]["toTileLevel"]+'</td>';
      
              if (Seed.queue_atkp[cityID][k]["gold"] > 0) m += '<TD>Oro:'+ Seed.queue_atkp[cityID][k]["gold"] +'</td>';
              if (Seed.queue_atkp[cityID][k]["resource1"] > 0) m += '<TD>Cibo: '+ addCommas(Seed.queue_atkp[cityID][k]["resource1"]) +'</td>';
              if (Seed.queue_atkp[cityID][k]["resource2"] > 0) m += '<TD>Legno: '+ addCommas(Seed.queue_atkp[cityID][k]["resource2"]) +'</td>';
              if (Seed.queue_atkp[cityID][k]["resource3"] > 0) m += '<TD>Pietra: '+ addCommas(Seed.queue_atkp[cityID][k]["resource3"]) +'</td>';
              if (Seed.queue_atkp[cityID][k]["resource4"] > 0) m += '<TD>Minerale: '+ addCommas(Seed.queue_atkp[cityID][k]["resource4"]) +'</td>';
              
              for(i=1; i<13; i++){
            if(Seed.queue_atkp[cityID][k]["unit"+i+"Count"] > 0 && type == "going") m += '<TD>'+ unsafeWindow.unitcost['unt'+i][0] +': '+ addCommas(Seed.queue_atkp[cityID][k]["unit"+i+"Count"]) +'</td>';
            if(Seed.queue_atkp[cityID][k]["unit"+i+"Return"] > 0 && type == "returning") m += '<TD>'+ unsafeWindow.unitcost['unt'+i][0] +': '+ addCommas(Seed.queue_atkp[cityID][k]["unit"+i+"Return"]) +'</td>';
          }
          m += '</tr>';
        }
          }
    }
    m += '</table>';
    t.marchDiv.innerHTML = m;
    
    if (t.widescreen==false) document.getElementById('ptMarchOutput').style.maxWidth = '740px';
    else document.getElementById('ptMarchOutput').style.maxWidth = '1100px';
    
    document.getElementById('Wide').addEventListener('click', function(){
      t.widescreen=document.getElementById('Wide').checked;  
    }, false);
    
    
    document.getElementById('TEST').addEventListener('click', function(){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        new AjaxRequest(unsafeWindow.g_ajaxpath + "/fb/e2/src/main_src.php?g=&y=0&n=nan001&l=nl_NL&messagebox=&standalone=0&res=1&iframe=1&lang=en&ts=1304248288.7067&s=250&appBar=" + unsafeWindow.g_ajaxsuffix, {
            method: "POST",
            parameters: params,
            onSuccess: function (rslt) {
                //rslt = eval("(" + message + ")");
                var mainSrcHTMLCode = rslt.responseText;
              //var mainSrcHTMLCode; // get and set this by pulling in the main_src.php file via AJAX
              var myregexp = /var seed=\{.*?\};/;
              var match = myregexp.exec(mainSrcHTMLCode);
              
              if (match != null) {
              result = match[0];
              result = result.substr(4);
              var seed = eval(result);
              WinLog.write ("seed @ "+ unixTime()  +" ("+ now +")\n\n"+ inspect (seed, 8, 1));
              unsafeWindow.document.seed = result;
              unsafeWindow.update_seed(result);
              }
            },
            onFailure: function () {
              if (notify != null)
                notify(rslt.errorMsg);
            },
        });
  
    }, false);
           
    t.displayTimer = setTimeout (t.showMarches, 500);  
    },
  
  isMyself: function(userID){
    if(!Seed.players["u"+userID])
      return false;
    if(Seed.players["u"+userID].n == Seed.player.name)
      return true;
    else
      return false;
    return false;
  },
    
    butcancelmarch: function(marchID){
       var t = Tabs.Marches;
          var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
          params.mid = marchID;
           for (var c=0; c<Cities.numCities; c++){
            var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
            if (matTypeof(que)=='array')
              continue;
            for (k in que){
              if (k == 'm'+marchID){
                params.cid = Cities.cities[c].id;
                break;
              }
            }    
          }    
          
          new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelMarch.php" + unsafeWindow.g_ajaxsuffix, {
              method: "post",
              parameters: params,
              onSuccess: function (rslt) {
              var march = unsafeWindow.seed.queue_atkp["city" + params.cid]["m" + params.mid];
              march.marchStatus = 8;
               var marchtime = parseInt(march.returnUnixTime) - parseInt(march.destinationUnixTime);
               var ut = unixTime();
               if (unsafeWindow.seed.playerEffects.returnExpire > unixtime())
                 marchtime *= 0.5
                march.returnUnixTime = ut + marchtime;
                march.destinationUnixTime = ut;
                march.marchUnixTime = ut - marchtime;
                if (notify != null)
                  notify(rslt.errorMsg);
              },
              onFailure: function () {
                if (notify != null)
                  notify(rslt.errorMsg);
              },
          });
          
       },    
       
           
      
  /***  REINFORCEMENTS SUBTAB  ***/
  showReinforcements : function (){
    var rownum = 0;
    var names = ['Truppe di rifornimento', 'Soldati semplici', 'Esploratori', 'Lancieri', 'Spadaccini', 'Arcieri', 'Cav. leggera', 'Cav. pesante', 'Carri di rifornimento', 'Baliste', 'Arieti', 'Catapulte'];
    var t = Tabs.Marches;
    clearTimeout (t.displayTimer);
    
// TODO FIX:    Troops show as encamped even if they are here yet (check destinationUnixTime)

/***    
var s = 'OUTGOING:<BR>';
for (var c=0; c<Cities.numCities; c++){
  var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
  if (matTypeof(que)=='array')
    continue;

s += 'City: '+  Cities.cities[c].name + ': <BR>';

  for (k in que){
    march = que[k];
    var mid = k.substr(1);
    s += mid +' DEST: '+ march.toXCoord +','+ march.toYCoord + '  <INPUT type=submit value="Recall" onclick="pr56Recall('+ mid +')"><BR>'
  }      
}
t.cont.innerHTML = s;
t.displayTimer = setTimeout (t.show, 10000);
return;
***/
    
    function clickShowRemaining (){
      checkBox = document.getElementById('idCheck2');
      if (checkBox.checked)
        Options.encRemaining = false;
      else
        Options.encRemaining = true;
      t.show ();
    }
        
    enc = {};
    numSlots = 0;
    
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (k in Seed.queue_atkinc){
        march = Seed.queue_atkinc[k];

        if (march.marchType == 2){
          ++numSlots;
          city = march.toCityId;
          from = march.fromPlayerId;
          if (!enc[city])
            enc[city] = {};
          if (!enc[city][from])
            enc[city][from] = [];
          s = {};
          s.knight = parseInt (march.knightCombat);
          s.marchId = k.substr(1);
          s.troops = [];
          for (i=1; i<13; i++){
            if (Options.encRemaining)
              s.troops[i] = parseInt (march['unit'+ i +'Return']);
            else
              s.troops[i] = parseInt (march['unit'+ i +'Count']);
          }
          enc[city][from].push (s);
        }
      }
    }
//logit ("enc: "+ inspect (enc, 6, 1));    
    s = '<div class=pdxStat>TRUPPEN IN DER BOTSCHAFT</div><BR>';
    if (numSlots == 0){
      s += '<BR><CENTER><B>Dir wurde keine Verstärkung geschickt... :/</b></center>';
    } else {
      s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
      s += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%><B>Giocatore (ritter)</b></td>';

      for (k=0; k<names.length; k++)
        s += '<TD width=7%><B>' + names[k] + '</b></td>';
      s += '</tr>';

      tot = [];
      for (i=0; i<13; i++)
        tot[i] = 0;
      for (c in Cities.cities){
        dest = Cities.cities[c].id;
        if (enc[dest]){
          s+= '<TR><TD class=xtab><BR></td></tr>';
          s+= '<TR><TD class="city" colspan=13 align=center><div class=pdxStat><B>'+ Cities.cities[c].name +'</b></div></td></tr>';
          for (p in enc[dest]){
            try {
              player = Seed.players['u'+p].n;
            } catch (err){
              player = '???';
            }
            for (m=0; m<enc[dest][p].length; m++){
              var march = enc[dest][p][m];
              knight = '';
              if (march.knight > 0)
                knight = ' ('+ march.knight +')';
// TODO: Only allow 'send home' if troops are here now  (marchStatus = ?)              
              s += '<TR align=right><TD align=left>'+ player + knight +' <A><SPAN onclick="r8x6Home('+ march.marchId +')">X</span></a></td>'
              for (i=1; i<13; i++){
                s += '<TD>'+ march.troops[i]  +'</td>';
                tot[i] += march.troops[i];
              }
              s += '</tr>';

            }
          }
        }
      }
      s += '<TR><TD colspan=13><BR><BR></td></tr><TR align=right><TD class="tot" align=left><B>Totale:</b></td>';
      for (i=1; i<13; i++)
        s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr></table>';
    }

    s += '<BR><BR><INPUT type=CHECKBOX id=idCheck2 '+ (Options.encRemaining?'':' CHECKED ') +'> Mostra truppe originali';
    s += '<BR><BR><DIV style="font-size: 10px"><u><b>ATTENZIONE</b></u>: Per mostrare le truppe eseguire una ricarica della pagina</div>';
    t.marchDiv.innerHTML = s;
    checkBox = document.getElementById('idCheck2');
    checkBox.addEventListener('click', clickShowRemaining, false);
    t.displayTimer = setTimeout (t.show, 10000);
  },

  
  butRecall : function (marchId){
    var t = Tabs.Marches;
    logit ("CANCELLING: "+ marchId);
    t.ajaxRecall (marchId);
  },

  butSendHome : function (marchId){
    var t = Tabs.Marches;
    //alert("Sent Home march#"+marchId);
    logit ("SEND HOME: "+ marchId);
    t.ajaxSendHome (marchId, function(r){t.show(); logit("AJAX RESULT: "+ r)});
  },


  /***  
  // not working, returns 'invalid parameters' :(  
  ajaxCancelMarch : function (marchId, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
logit ('ajaxCancelMarch: '+ marchId);    
    for (var c=0; c<Cities.numCities; c++){
      var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
      if (matTypeof(que)=='array')
        continue;
      for (k in que){
        if (k == 'm'+marchId){
          params.cid = Cities.cities[c].id;
          params.cityId = Cities.cities[c].id;
          break;
        }
      }    
    }    
    params.marchId = marchId;
    params.mid = 'm'+ marchId;
    params.requestType = "CANCEL_MARCH";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelMarch.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          if (notify != null)
            notify(rslt.errorMsg);
        },
        onFailure: function () {
          if (notify != null)
            notify(rslt.errorMsg);
        },
    });
  },
***/  
 

  repairList:[],
  fixLateMarch : function (march) {
  //1. return knight
       logit ("TBD fixLateMarch kid: "+march.knightId);
  //2. return troops
       //logit ("TBD fixLateMarch troops: "+returningTroops(march));
  //3. delete march
  //4. remove waiting reports
  },
  getScoutingReport : function (march) {
     var t = Tabs.Marches;
     var result='undefined';
     if (t.scoutingReports.length > 0) {
        for (var i=0; i<t.scoutingReports.length; i++){
            var rptHead = t.scoutingReports[i].rptHead;
            var report = t.scoutingReports[i].report;
            if (rptHead.side0XCoord==march.toXCoord &&
                rptHead.side0YCoord==march.toYCoord &&
                (Math.abs(parseInt(rptHead.reportUnixTime)-parseInt(march.destinationUnixTime)) < 30) &&
                march.marchType == rptHead.marchType)  {// match report, march
               return report;
            }
        }
     }
     return result;
  },
  counts:[],
  getMarchCount : function (cityNum) {
    var t = Tabs.Marches;
    for(var i=0; i<Cities.numCities; i++) {   
      cityId = 'city'+ Cities.cities[i].id;
      t.counts[i] = 0;
      for (var k in Seed.queue_atkp[cityId]){   
        march = Seed.queue_atkp[cityId][k];
        if (typeof (march) == 'object'){
          t.counts[i]++;
        }
      }
    }
    return t.counts[cityNum];
  },
  showTroops : function (data) {
     new CPopupDisplayData ('ptDisplayTroops',500,'Troops','troops',data);

  },
  showLoot : function (data) {
     //logit ( "showLoot: "+data);
     new CPopupDisplayData ('ptDisplayLoot',250,'Loot','loot',data);

  },



  ajaxSendHome : function (marchId, notify){
logit ('ajaxSendHome: '+ marchId);    
    var march = Seed.queue_atkinc['m'+ marchId];
    if (march == null){
      notify ('March not found!');
      return;
    }    
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.mid = marchId;
    params.cid = march.toCityId;
    params.fromUid = march.fromPlayerId;
    params.fromCid = march.fromCityId;
   
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/kickoutReinforcements.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          if (rslt.ok){
            var upkeep = 0;
            for (var i=1; i<13; i++)
              upkeep += parseInt(march["unit" + i + "Return"]) * parseInt(unsafeWindow.unitupkeeps[i])
            unsafeWindow.seed.resources["city"+ march.toCityId].rec1[3] -= upkeep;
            if (parseInt(march.fromPlayerId) == parseInt(unsafeWindow.tvuid)) {
//logit ('FROM ME!');
              var mymarch = unsafeWindow.seed.queue_atkp["city" + march.fromCityId]["m" + marchId];
              var marchtime = Math.abs(parseInt(mymarch.destinationUnixTime) - parseInt(mymarch.eventUnixTime));
              mymarch.returnUnixTime = unixTime() + marchtime;
              mymarch.marchStatus = 8;
            }
            delete unsafeWindow.seed.queue_atkinc["m" + marchId];
            if (notify != null)
              notify(null);
          } else {
            if (notify != null)
              notify(rslt.errorMsg);
          }
        },
        onFailure: function () {
          if (notify != null)
            notify(rslt.errorMsg);
        },
    });
  },

/*****

      for (var b = 1; b < 13; b++) {
        g += parseInt(e["unit" + b + "Return"]) * parseInt(unitupkeeps[b])
      }

function kickout_allies(mid, cid, fromUid, fromCid, upkeep) {
  var params = Object.clone(g_ajaxparams);
  params.mid = mid;
  params.cid = cid;
  params.fromUid = fromUid;
  params.fromCid = fromCid;
  new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function(transport) {
      var rslt = eval("(" + transport.responseText + ")");
      if (rslt.ok) {
        Modal.showAlert(g_js_strings.kickout_allies.troopshome);
        seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;
        Modal.hideModalAll();
        if (parseInt(fromUid) == parseInt(tvuid)) {
          var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];
          var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));
          curmarch.returnUnixTime = unixtime() + marchtime;
          curmarch.marchStatus = 8
        }
        delete seed.queue_atkinc["m" + mid]
      } else {
        Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
      }
    },
    onFailure: function() {}
  })
};
***/




 
  ajaxRecall : function (marchId, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    for (var c=0; c<Cities.numCities; c++){
      var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
      if (matTypeof(que)=='array')
        continue;
      for (k in que){
        if (k == 'm'+marchId){
          params.cid = Cities.cities[c].id;
          break;
        }
      }    
    }    
    params.mid = marchId;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/undefend.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          var march = unsafeWindow.seed.queue_atkp["city" + params.cid]["m" + params.mid];
          march.marchStatus = 8;
          var marchtime = parseInt(march.returnUnixTime) - parseInt(march.destinationUnixTime);
          var ut = unixTime();
          if (unsafeWindow.seed.playerEffects.returnExpire > unixTime())
            marchtime *= 0.5
          march.returnUnixTime = ut + marchtime;
          march.destinationUnixTime = ut;
          march.marchUnixTime = ut - marchtime;
          if (notify != null)
            notify(rslt.errorMsg);
        },
        onFailure: function () {
          if (notify != null)
            notify(rslt.errorMsg);
        },
    });
  },
  
};
/****************************  Tower Tab  ******************************/
Tabs.tower = {
  tabLabel: 'Torre',
  tabOrder: toHeiligtum,
  myDiv: null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  secondTimer : null,
  soundPlaying : false,
  defMode : {},  
  soundRepeatTimer : null,
  soundStopTimer : null,
  towerMarches: [],
Providers : {
 0: { 'country': "--Paese--", 'provider': "--Operatore--" },
 1: { 'country': "AUSTRALIA", 'provider': "T-Mobile" },
 2: { 'country': "AUSTRALIA", 'provider': "Optus Zoo" },
 3: { 'country': "AUSTRIA", 'provider': "T-Mobile" },
 4: { 'country': "BULGARIA", 'provider': "Mtel" },
 5: { 'country': "BULGARIA", 'provider': "Globul" },
 6: { 'country': "CANADA", 'provider': "Aliant" },
 7: { 'country': "CANADA", 'provider': "Bell Mobility" },
 8: { 'country': "CANADA", 'provider': "Fido" },
 9: { 'country': "CANADA", 'provider': "MTS Mobility" },
 10: { 'country': "CANADA", 'provider': "Rogers Wireless" },
 11: { 'country': "CANADA", 'provider': "Sasktel Mobility" },
 12: { 'country': "CANADA", 'provider': "Telus" },
 13: { 'country': "CANADA", 'provider': "Virgin Mobile" },
 14: { 'country': "CANADA", 'provider': "Presidents Choice" },
 15: { 'country': "GERMANY", 'provider': "T-Mobile" },
 16: { 'country': "GERMANY", 'provider': "Vodafone" },
 17: { 'country': "GERMANY", 'provider': "O2" },
 18: { 'country': "GERMANY", 'provider': "E-Plus" },
 19: { 'country': "ICELAND", 'provider': "OgVodafone" },
 20: { 'country': "ICELAND", 'provider': "Siminn" },
 21: { 'country': "INDIA", 'provider': "Andhra Pradesh AirTel" },
 22: { 'country': "INDIA", 'provider': "Andhra Pradesh Idea Cellular" },
 23: { 'country': "INDIA", 'provider': "Chennal Skycell Airtel" },
 24: { 'country': "INDIA", 'provider': "Chennel RPG Cellular" },
 25: { 'country': "INDIA", 'provider': "Delhi Airtel" },
 26: { 'country': "INDIA", 'provider': "Delhi Hutch" },
 27: { 'country': "INDIA", 'provider': "Gujarat Idea Cellular" },
 28: { 'country': "INDIA", 'provider': "Gujaret Airtel" },
 29: { 'country': "INDIA", 'provider': "Gujaret Celforce" },
 30: { 'country': "INDIA", 'provider': "Goa Airtel" },
 31: { 'country': "INDIA", 'provider': "Goa BPL Mobile" },
 32: { 'country': "INDIA", 'provider': "Goa Idea Cellular" },
 33: { 'country': "INDIA", 'provider': "Haryana Airtel" },
 34: { 'country': "INDIA", 'provider': "Haryana Escotel" },
 35: { 'country': "INDIA", 'provider': "Himachal Pradesh Airtel" },
 36: { 'country': "INDIA", 'provider': "Karnataka Airtel" },
 37: { 'country': "INDIA", 'provider': "Kerala Airtel" },
 38: { 'country': "INDIA", 'provider': "Kerala Escotel" },
 39: { 'country': "INDIA", 'provider': "Kerala BPL Mobile" },
 40: { 'country': "INDIA", 'provider': "Kolkata Airtel" },
 41: { 'country': "INDIA", 'provider': "Madhya Pradesh Airtel" },
 42: { 'country': "INDIA", 'provider': "Maharashtra Airtel" },
 43: { 'country': "INDIA", 'provider': "Maharashtra BPL Mobile" },
 44: { 'country': "INDIA", 'provider': "Maharashtra Idea Cellular" },
 45: { 'country': "INDIA", 'provider': "Mumbai Airtel" },
 46: { 'country': "INDIA", 'provider': "Mumbai BPL Mobile" },
 47: { 'country': "INDIA", 'provider': "Punjab Airtel" },
 48: { 'country': "INDIA", 'provider': "Pondicherry BPL Mobile" },
 49: { 'country': "INDIA", 'provider': "Tamil Nadu Airtel" },
 50: { 'country': "INDIA", 'provider': "Tamil Nadu BPL Mobile" },
 51: { 'country': "INDIA", 'provider': "Tamil Nadu Aircel" },
 52: { 'country': "INDIA", 'provider': "Uttar Pradesh West Escotel" },
 53: { 'country': "IRELAND", 'provider': "Meteor" },
 54: { 'country': "IRELAND", 'provider': "Meteor MMS" },
 55: { 'country': "ITALY", 'provider': "TIM" },
 56: { 'country': "ITALY", 'provider': "Vodafone" },
 57: { 'country': "JAPAN", 'provider': "AU by KDDI" },
 58: { 'country': "JAPAN", 'provider': "NTT DoCoMo" },
 59: { 'country': "JAPAN", 'provider': "Vodafone Chuugoku/Western" },
 60: { 'country': "JAPAN", 'provider': "Vodafone Hokkaido" },
 61: { 'country': "JAPAN", 'provider': "Vodafone Hokuriko/Central North" },
 62: { 'country': "JAPAN", 'provider': "Vodafone Kansai/West, including Osaka" },
 63: { 'country': "JAPAN", 'provider': "Vodafone Kanto/Koushin/East including Tokyo" },
 64: { 'country': "JAPAN", 'provider': "Vodafone Kyuushu/Okinawa" },
 65: { 'country': "JAPAN", 'provider': "Vodafone Shikoku" },
 66: { 'country': "JAPAN", 'provider': "Vodafone Touhoku/Niigata/North" },
 67: { 'country': "JAPAN", 'provider': "Vodafone Toukai/Central" },
 68: { 'country': "JAPAN", 'provider': "Willcom" },
 69: { 'country': "JAPAN", 'provider': "Willcom di" },
 70: { 'country': "JAPAN", 'provider': "Willcom dj" },
 71: { 'country': "JAPAN", 'provider': "Willcom dk" },
 72: { 'country': "NETHERLANDS", 'provider': "T-Mobile" },
 73: { 'country': "NETHERLANDS", 'provider': "Orange" },
 74: { 'country': "SINGAPORE", 'provider': "M1" },
 75: { 'country': "SOUTH AFRICA", 'provider': "Vodacom" },
 76: { 'country': "SPAIN", 'provider': "Telefonica Movistar" },
 77: { 'country': "SPAIN", 'provider': "Vodafone" },
 78: { 'country': "SWEDEN", 'provider': "Tele2" },
 79: { 'country': "UNITED STATES", 'provider': "Teleflip" },
 80: { 'country': "UNITED STATES", 'provider': "Alltel" },
 81: { 'country': "UNITED STATES", 'provider': "Ameritech" },
 82: { 'country': "UNITED STATES", 'provider': "ATT Wireless" },
 83: { 'country': "UNITED STATES", 'provider': "Bellsouth" },
 84: { 'country': "UNITED STATES", 'provider': "Boost" },
 85: { 'country': "UNITED STATES", 'provider': "CellularOne" },
 86: { 'country': "UNITED STATES", 'provider': "CellularOne MMS" },
 87: { 'country': "UNITED STATES", 'provider': "Cingular" },
 88: { 'country': "UNITED STATES", 'provider': "Edge Wireless" },
 89: { 'country': "UNITED STATES", 'provider': "Sprint PCS" },
 90: { 'country': "UNITED STATES", 'provider': "T-Mobile" },
 91: { 'country': "UNITED STATES", 'provider': "Metro PCS" },
 92: { 'country': "UNITED STATES", 'provider': "Nextel" },
 93: { 'country': "UNITED STATES", 'provider': "O2" },
 94: { 'country': "UNITED STATES", 'provider': "Orange" },
 95: { 'country': "UNITED STATES", 'provider': "Qwest" },
 96: { 'country': "UNITED STATES", 'provider': "Rogers Wireless" },
 97: { 'country': "UNITED STATES", 'provider': "Telus Mobility" },
 98: { 'country': "UNITED STATES", 'provider': "US Cellular" },
 99: { 'country': "UNITED STATES", 'provider': "Verizon" },
 100: { 'country': "UNITED STATES", 'provider': "Virgin Mobile" },
 101: { 'country': "UNITED KINGDOM", 'provider': "O2 1" },
 102: { 'country': "UNITED KINGDOM", 'provider': "O2 2" },
 103: { 'country': "UNITED KINGDOM", 'provider': "Orange" },
 104: { 'country': "UNITED KINGDOM", 'provider': "T-Mobile" },
 105: { 'country': "UNITED KINGDOM", 'provider': "Virgin Mobile" },
 106: { 'country': "UNITED KINGDOM", 'provider': "Vodafone" },
 107: { 'country': "BELGIUM", 'provider': "mobistar" },
 108: { 'country': "GERMANY", 'provider': "1und1" },
 109: { 'country': "UNITED STATES", 'provider': "MyCricket" },
110: { 'country': "Philippines", 'provider': "Smart" }
 },
  init: function(div){
  var t = Tabs.tower;
  t.myDiv = div;
  
  if (GM_getValue ('towerMarches_'+getServerId()) != null)
    GM_deleteValue ('towerMarches_'+getServerId());   // remove deprecated data if it exists
  //t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
  //unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;
   
  var m = '<DIV class=pdxStat>TORRE DI GUARDIA</div><TABLE class=pdxTab><TR align=center>';

  for (var i=0; i<Cities.cities.length; i++)
    m += '<TD width=95><SPAN id=pbtacity_'+ i +'>' + Cities.cities[i].name + '</span></td>';
  m += '</tr><TR align=center>';
  for (var cityId in Cities.byID)
  m += '<TD><INPUT type=submit id=pdxTabut_'+ cityId +' value=""></td>';
  m += '</tr><TR align=center>';
  for (var cityId in Cities.byID)
   m += '<TD><CENTER><INPUT id=pbattackqueue_' + cityId + ' type=submit value="A 0 | S 0"></center></td>';
  m += '</tr></table><BR><DIV><CENTER><INPUT id=pbSoundStop type=submit value="Ferma sirena"></center></div><DIV id=pbSwfPlayer></div>';
  m += '<BR><DIV class=pdxStat>CONFIGURAZIONE</div><TABLE class=pdxTab>\
   <tr><td width="20" align=left><INPUT id=pbcellenable type=checkbox '+ (Options.celltext.atext?'CHECKED ':'') +'/></td>\
    <td align=left>Invia sms di attacco in arrivo al numero:  <INPUT id=pbnum1 type=text size=4 maxlength=4 value="'+ Options.celltext.num1 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum2 type=text size=3 maxlength=3 value="'+ Options.celltext.num2 +'" '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum3 type=text size=5 maxlength=5 value="'+ Options.celltext.num3 +'" '+(Options.celltext.provider==0?'DISABLED':'')+'\></td>\
   <td width="48" align=left><INPUT id=paMailHelp type=submit value=AIUTO></td></tr><tr><td></td>\
 <TD colspan="2" align=left>Paese: <select id="pbfrmcountry">';
 for (var i in t.Providers) {
 var ret=m.indexOf(t.Providers[i].country);
 if (ret==-1) {
 if (t.Providers[i].country==t.Providers[Options.celltext.provider].country) {
 m += '<option value="'+t.Providers[i].country+'" selected="selected">'+t.Providers[i].country+'</option>'; // Load Previous Provider Selection
 }
 else {
 m += '<option value="'+t.Providers[i].country+'">'+t.Providers[i].country+'</option>';
 }
 }
 }
 m += '</select>\
 <select id="pbfrmprovider" '+(Options.celltext.provider==0?'DISABLED':'')+'><option value=0 >--Anbieter--</option>';
 for (var i in t.Providers) {
 if(t.Providers[i].country == t.Providers[Options.celltext.provider].country)
 if(Options.celltext.provider == i)
 m += '<option value="'+i+'" selected="selected">'+t.Providers[i].provider+'</option>'; // Load Previous Provider Selection
 else
 m += '<option value="'+i+'">'+t.Providers[i].provider+'</option>';
 }
 m += '</select></td></tr>\
    <TR><TD>&nbsp;</td><TD colspan="2">&nbsp;</td></tr>\
    <TR><TD><INPUT id=pbalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD colspan="2">Pubblica allarme in chat alleanza!</td></tr>\
    <TR><TD></td><TD colspan="2"><TABLE cellpadding=0 cellspacing=0>\
    <TR><TD align=right>Messaggio: &nbsp; </td><TD><INPUT id=pbalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
    <TR><TD align=right>Allarme esplorazione: &nbsp; </td><TD><INPUT id=pbalertSpäher type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
    <TR><TD align=right>Allarme attacco a una mia terra: &nbsp; </td><TD><INPUT id=pbalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
    <TR><TD align=right>Mostra lo stato delle mie difese: &nbsp; </td><TD><INPUT id=pbalertDefend type=checkbox '+ (Options.alertConfig.defend?'CHECKED ':'') +'/></td></tr>\
      <TR><TD align=right>Se le truppe sono in difesa:&nbsp;</td><TD><INPUT id=pbalertDefendMSG type=text size=92 maxlength=160 value="'+ Options.defendMessage +'" \></td></tr>\
      <TR><TD align=right>Se le truppe sono nel santuario:&nbsp;</td><TD><INPUT id=pbalertHide type=text size=92 maxlength=160 value="'+ Options.hideMessage +'" \></td></tr>\
    <TR><TD align=right>Mostra nome città&nbsp;&nbsp; </td><TD><span id=pbalerterr><INPUT id=pbincludeCityName type=checkbox '+ (Options.includeCityName?'CHECKED ':'') +'/>\
    </span></td></tr><TR><TD align=right>Mostra diplomazia con l\'alleanza</td>\
       <TD><INPUT id=pbincludeAlliance type=checkbox '+ (Options.includeAlliance?'CHECKED ':'') +'/></td></tr><TR>\
       <TD align=right>Potere &nbsp;Aggressore:</td><TD><INPUT id=pbincludeMight type=checkbox '+ (Options.includeMight?'CHECKED ':'') +'/></td>\
        </tr><TR><TD align=right>Numero minimo di truppe:</td><TD><INPUT id=pbalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \></td></tr>\
		    </tr><TR><TD align=right>Ferma attacchi ai barbari durante l\'attacco:</td><TD><INPUT id=pbalertbarb type=checkbox '+ (Options.alertConfig.barb?'CHECKED':'') +'/></td></tr>\
			    </tr><TR><TD align=right>Riprendi attacchi ai barbari dopo l\'attacco :</td><TD><INPUT id=pbalertbarbres type=checkbox '+ (Options.alertConfig.barbresume?'CHECKED':'') +'/></td></tr>\
				    </tr><TR><TD align=right>Ferma le incursioni automatiche:</td><TD><INPUT id=pbalertraid type=checkbox '+ (Options.alertConfig.raid?'CHECKED':'') +'/></td></tr>\
      </table></td></tr>\
    <TR><TD><BR></td></tr>\
    <TR><TD><INPUT id=pbSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD colspan="2">Suona l\' allarme in caso di attacco o esplorazione (<a href="http://koc.god-like.org/?p=149" target="_blank">Link Liste</a>)</td></tr>\
    <TR><TD></td><td colspan="2">\
        <DIV id=pbLoadingSwf>Downloade SWF player...</div><DIV style="display:none" id=pbSoundOpts><TABLE cellpadding=0 cellspacing=0>\
    <TR><TD align=right>MP³ Link: &nbsp; </td><TD><INPUT id=pbsoundFile type=text size=55 maxlength=160 value="'+ Options.alertSound.soundUrl +'" \>\
       &nbsp; </td><TD><INPUT id=pbSoundLoad type=submit value=Download><INPUT id=pbSoundDefault type=submit value=Zurücksetzen></td></tr>\
    <TR><TD align=right>Lautstärke: &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pdxTab><TR valign=middle><TD><SPAN id=pbVolSlider></span></td><TD width=15></td><TD align=right id=pbVolOut>0</td></td></table></td><TD align=center><SPAN id=pbLoadStat>xx</span></td></tr>\
    <TR><TD align=right><INPUT id=pbSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD> Alle <INPUT id=pbSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> Minuten wiederholen!</td></tr>\
    <TR><TD></td><TD>und <INPUT id=pbSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> Sekunden Abspielen!</td></tr>\
    <TR><TD></td><TD><INPUT type=submit value="Abspielen" id=pbPlayNow></td></tr></table></div><td width="10"></td></tr>\
    </table><BR>';
  t.myDiv.innerHTML = m;

//    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:36, width:340}, t.e_swfLoaded, 'debug=y');
  t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:0, width:0}, t.e_swfLoaded, 'debug=n');
  t.mss.swfDebug = function (m){ logit ('SWF: '+ m)};
  t.mss.swfPlayComplete = t.e_soundFinished;
  t.mss.swfLoadComplete = t.e_soundFileLoaded;
  unsafeWindow.matSimpleSound01 = t.mss;   // let swf find it

  t.volSlider = new SliderBar (document.getElementById('pbVolSlider'), 200, 21, 0);
  t.volSlider.setChangeListener(t.e_volChanged);
   document.getElementById('paMailHelp').addEventListener ('click', t.mailHelpPop, false);
  document.getElementById('pbPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
  document.getElementById('pbSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
  document.getElementById('pbSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked}, false);
  document.getElementById('pbSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value}, false);
  document.getElementById('pbSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value}, false);
  document.getElementById('pbSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked}, false);
document.getElementById('pbcellenable').addEventListener ('change', function (e){Options.celltext.atext = e.target.checked;}, false);

  document.getElementById('pbSoundStop').disabled = true;
  document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbincludeMight').addEventListener    ('change', t.e_alertOptChanged, false);
    document.getElementById('pbincludeAlliance').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbincludeCityName').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertSpäher').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertDefend').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertDefendMSG').addEventListener ('change', t.e_alertOptChanged, false);

    document.getElementById('pbalertHide').addEventListener       ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbfrmcountry').addEventListener ('change', t.setCountry, false);
   document.getElementById('pbfrmprovider').addEventListener ('change', t.setProvider, false);
    document.getElementById('pbnum1').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbnum2').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbnum3').addEventListener ('change', t.phonenum, false);
	document.getElementById('pbalertbarb').addEventListener ('change', t.e_alertOptChanged, false);
	    document.getElementById('pbalertbarbres').addEventListener ('change', t.e_alertOptChanged, false);
	    document.getElementById('pbalertraid').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbsoundFile').addEventListener ('change', function (){
    Options.alertSound.soundUrl = document.getElementById('pbsoundFile').value;
    t.loadUrl (Options.alertSound.soundUrl);
    }, false);
  document.getElementById('pbSoundDefault').addEventListener ('click', function (){
    document.getElementById('pbsoundFile').value = DEFAULT_ALERT_SOUND_URL;
    Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL;
    t.loadUrl (DEFAULT_ALERT_SOUND_URL);
    }, false);

  for (var cityId in Cities.byID){
    var but = document.getElementById ('pdxTabut_'+ cityId);
    addListener (but, cityId);
    t.defMode[cityId] =  parseInt(Seed.citystats["city" + cityId].gate);
    t.displayDefMode (cityId);
  var btnNameT = 'pbattackqueue_' + cityId;
    addTowerEventListener(cityId, btnNameT);
  }
  function addListener (but, i){
    but.addEventListener ('click', function (){t.butToggleDefMode(i)}, false);
  }
  function addTowerEventListener(cityId, name){
    document.getElementById(name).addEventListener('click', function(){
      t.showTowerIncoming(cityId);
    }, false);
  }  
  setInterval (t.eachSecond, 2000);
  },      

  show : function (){
  var t = Tabs.tower;
   mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },
  
  hide : function (){
  var t = Tabs.tower;
   mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },
 mailHelpPop : function (){
  var helpmailText = '<BR>1. Mettete la spunta su Invia sms di attacco...<BR> \
    2. Scegliete il vostro gestore<BR>\
    3. Inserite il prefisso<BR> \
    4. Inserite il resto del numero<BR> 5. Fatto!<BR>\
    <BR>\
    <b><FONT COLOR=#600000>IMPORTANTE</font></b>:<UL><LI>Il telefono deve essere abilitato a ricevere e-mail \
    <BR>Diese Einstellung bekommt ihr meist bei eurem Anbieter und müsst sie dann Runterladen!\
    <BR><LI>Die Maximale anzahl an zeichen für diese SMS-2-Mail beträgt bei den meisten anbietern 160 Zeichen daher kann es sein das längere mails nicht versendet werden!\
    <BR><LI>Wenn ihr keine direkte verbindung zum Internet habt reicht es auch wenn ihr Apps wie Outlook etc. auf dem Handy habt!\
    <BR><LI>Wenn ihr kein zugang zum internet auf dem Handy habt könnt ihr diese Funktion <b>NICHT</b> nutzen!\
    <LI>Ich empfehle euch eine Internet Flat für euer Handy zu buchen damit auf keinen Fall kosten auf euch für diese SMS-2-Mail zukommen!</ul><BR>Weitere Informationen findet ihr <a href="http://koc.god-like.org/?p=544" target="_new">hier</a>';
  var pop = new CPopup ('giftHelp', 0, 0, 500, 400, true);
  pop.centerMe (mainPop.getMainDiv());  
  pop.getMainDiv().innerHTML = helpmailText;
  pop.getTopDiv().innerHTML = '<CENTER><B>KoC Power Bot - Deutsch</b>: SMS-2-Mail</center>';
  pop.show (true);
  },
  loadUrl : function (url){
  var t = Tabs.tower;
  t.mss.load (1, url, true);
  document.getElementById('pbLoadStat').innerHTML = 'Loading';
  },
  phonenum : function() {
 Options.celltext.num1 = document.getElementById('pbnum1').value;
 Options.celltext.num2 = document.getElementById('pbnum2').value;
 Options.celltext.num3 = document.getElementById('pbnum3').value;
 saveOptions();
 },

 setCountry : function(){
 var t = Tabs.tower;
 var myselect=document.getElementById("pbfrmprovider");
// GM_log(document.getElementById("pbfrmprovider").value);
// GM_log(document.getElementById("pbfrmcountry").value);
 myselect.innerHTML = '<option value=0 >--Anbieter--</option>';
 myselect.disabled = true;
 for (var i in t.Providers) {
 if (t.Providers[i].country == document.getElementById("pbfrmcountry").value){
 var addoption = document.createElement('option');
 addoption.value = i;
 addoption.text = t.Providers[i].provider;
 myselect.add(addoption, null) //add new option to end of "Providers"
 }
 }
 myselect.disabled = false;
 },

 setProvider : function(){
 var ddProvider = document.getElementById("pbfrmprovider").wrappedJSObject;
 Options.celltext.provider=ddProvider.options[ddProvider.selectedIndex].value;
 if(ddProvider.selectedIndex > 0){
 document.getElementById("pbnum1").disabled = false;
 document.getElementById("pbnum2").disabled = false;
 document.getElementById("pbnum3").disabled = false;
 } else {
 document.getElementById("pbnum1").disabled = true;
 document.getElementById("pbnum2").disabled = true;
 document.getElementById("pbnum3").disabled = true;
 }
 //alert(Options.celltext.provider);
 },     
  e_swfLoaded : function (){
  var t = Tabs.tower;
  document.getElementById('pbLoadingSwf').style.display = 'none';
  document.getElementById('pbSoundOpts').style.display = 'inline';
  t.volSlider.setValue (Options.alertSound.volume/100);
  t.loadUrl (Options.alertSound.soundUrl);
  setTimeout (function (){t.mss.setVolume (1, Options.alertSound.volume);}, 500);
  if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime())   
    t.soundTheAlert();
  },
  
  e_alertOptChanged : function (){
  var t = Tabs.tower;
  Options.alertConfig.aChat = document.getElementById('pbalertEnable').checked;
  Options.alertConfig.aPrefix=document.getElementById('pbalertPrefix').value;
  Options.defendMessage=document.getElementById('pbalertDefendMSG').value;
  Options.includeMight=document.getElementById('pbincludeMight').checked;
  Options.includeAlliance=document.getElementById('pbincludeAlliance').checked;
  Options.includeCityName=document.getElementById('pbincludeCityName').checked;
  Options.hideMessage=document.getElementById('pbalertHide').value;
  Options.alertConfig.scouting=document.getElementById('pbalertSpäher').checked;      
  Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
  Options.alertConfig.defend=document.getElementById('pbalertDefend').checked;
  Options.alertConfig.barb=document.getElementById('pbalertbarb').checked;
  Options.alertConfig.barbresume=document.getElementById('pbalertbarbres').checked;
  Options.alertConfig.raid=document.getElementById('pbalertraid').checked;
  
  var mt = parseInt(document.getElementById('pbalertTroops').value);
  if (mt<1 || mt>120000){
    document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;
    document.getElementById('pbalerterr').innerHTML = '<font color=#600000><B>INVALID</b></font>';
    setTimeout (function (){document.getElementById('pbalerterr').innerHTML =''}, 2000);
    return;
  }
  Options.alertConfig.minTroops = mt;
saveOptions();
  },
  
  e_volChanged : function (val){
  var t = Tabs.tower;
  document.getElementById('pbVolOut').innerHTML = parseInt(val*100);
  Options.alertSound.volume = parseInt(val*100);
  t.mss.setVolume (1, Options.alertSound.volume);
  },
  
  butToggleDefMode : function (cityId){
  var t = Tabs.tower;
  var mode = 1;
  if (Seed.citystats["city" + cityId].gate != 0)
    mode = 0;
  t.ajaxSetDefMode (cityId, mode, function (newMode){
    t.defMode[cityId] = newMode;
    t.displayDefMode (cityId);
    });
  },
    
  displayDefMode : function (cityId){
  var t = Tabs.tower;
  var but = document.getElementById('pdxTabut_'+ cityId);
  if (t.defMode[cityId]){
    but.className = 'pbDefButOn';
    but.value = 'Def = SI';  
  } else {
    but.className = 'pbDefButOff';
    but.value = 'Def = NO';  
  }  
  },
  
  eachSecond : function (){
  var t = Tabs.tower;
  for (var cityId in Cities.byID){
    if (Seed.citystats["city" + cityId].gate != t.defMode[cityId]){     // user changed def mode
    t.defMode[cityId] = Seed.citystats["city"+ cityId].gate;
    t.displayDefMode (cityId);
    }
	 Options.alertConfig.raidautoswitch[cityId] = false;
  }
  var now = unixTime();
var incomming = false;
  if (matTypeof(Seed.queue_atkinc) != 'array'){
    for (var k in Seed.queue_atkinc){   // check each incoming march
    var m = Seed.queue_atkinc[k];
    if ((m.marchType==3 || m.marchType==4) && parseIntNan(m.arrivalTime)>now){
      if (m.departureTime > Options.alertConfig.lastAttack){
      Options.alertConfig.lastAttack = m.departureTime;  
      t.newIncoming (m);
      }          
 incomming = true;
  if (Options.alertConfig.raid){
				Options.alertConfig.raidautoswitch[m.toCityId] = true;
			  }
}
    }
  }
/*if (Options.alertConfig.barbresume && Options.alertConfig.barbautoswitch && !incomming){
       obj = document.getElementById('AttSearch');
       if (!AttackOptions.Running) {
      AttackOptions.Running = true;
         obj.value = "Bot Angriff = SI";
         updatebotbutton('Bot Angriff = SI', 'pbbarbtab');
      saveAttackOptions();
      Tabs.Barb.getnextCity();
        Options.alertConfig.barbautoswitch = false;
      saveOptions();
      }
    }
	*/
//logit ("NOW="+ now + ' alarmActive='+ Options.alertSound.alarmActive + ' expireTime='+ Options.alertSound.expireTime);
  if (Options.alertSound.alarmActive && (now > Options.alertSound.expireTime))
    t.stopSoundAlerts();

    t.towerMarches = [];
    for (var i = 0; i < Cities.cities.length; i++) {
      var cId = Cities.cities[i].id;
      t['attackCount_' + cId] = 0;
      t['scoutCount_' + cId] = 0;
    }
    if (matTypeof(Seed.queue_atkinc) != 'array') {
      for (var k in Seed.queue_atkinc) {
        var m = Seed.queue_atkinc[k];
        if ((m.marchType == 3 || m.marchType == 4) && parseIntNan(m.arrivalTime) > now) {
          t.handleTowerData(m);

        }
      }
    }
    for (var i = 0; i < Cities.cities.length; i++) {
      var cId = Cities.cities[i].id;
      document.getElementById('pbattackqueue_' + cId).value = 'A ' + t['attackCount_' + cId] + ' | S ' + t['scoutCount_' + cId];
    }

  
  },   
  
  e_soundFinished : function (chan){ // called by SWF when sound finishes playing
  var t = Tabs.tower;
  if (chan != 1)
    return;
  if (!Options.alertSound.alarmActive){
    document.getElementById('pbSoundStop').disabled = true;
  }
  },

  e_soundFileLoaded : function (chan, isError){ // called by SWF when sound file finishes loading
  if (chan != 1)
    return;
  if (isError)  
    document.getElementById('pbLoadStat').innerHTML = 'Fehler!';
  else
    document.getElementById('pbLoadStat').innerHTML = 'Fatto!';
  },  
  
  playSound : function (doRepeats){
  var t = Tabs.tower;
  document.getElementById('pbSoundStop').disabled = false;
  clearTimeout (t.soundStopTimer);
  clearTimeout (t.soundRepeatTimer);
  t.mss.play (1, 0);
  t.soundStopTimer = setTimeout (function(){t.mss.stop(1); t.e_soundFinished(1)}, Options.alertSound.playLength*1000);
  if (doRepeats && Options.alertSound.repeat)
    t.soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Options.alertSound.repeatDelay*60000);
  else
    Options.alertSound.alarmActive = false;
  },
    
  soundTheAlert : function (){
  var t = Tabs.tower;
  Options.alertSound.alarmActive = true;
  t.playSound(true);
  },
   
  stopSoundAlerts : function (){
  var t = Tabs.tower;
  t.mss.stop (1);
  clearTimeout (t.soundStopTimer);
  clearTimeout (t.soundRepeatTimer);
  document.getElementById('pbSoundStop').disabled = true;
  Options.alertSound.alarmActive = false;
  Options.alertSound.expireTime = 0;
  },

newIncoming : function (m){
  var t = Tabs.tower;
   t.postToChat (m);
},
sendalert : function (m){
var t = Tabs.tower;
  var now = unixTime();
  if (Options.celltext.atext)
   t.postToCell (m);
  if (Options.alertSound.enabled){
    t.soundTheAlert(m);
    if (m.arrivalTime > Options.alertSound.expireTime)
    Options.alertSound.expireTime = m.arrivalTime;
  }
/*if (Options.alertConfig.barb){
obj = document.getElementById('AttSearch');
if (AttackOptions.Running == true) {
Options.alertConfig.barbautoswitch = true;
saveOptions();
AttackOptions.Running = false;
obj.value = "Angriff = NO";
updatebotbutton('Angriff - NO', 'pbbarbtab');
saveAttackOptions();
Tabs.Barb.nextattack = null;
}
}*/
if (Options.alertConfig.raid){
 			Tabs.Raid.StopCityRaids(m.toCityId);
 			Options.alertConfig.raidautoswitch[m.toCityId] = true;
		}
  },

  ajaxSetDefMode : function (cityId, state, notify){
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.cid = cityId;
  params.state = state;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
    if (rslt.ok) {
      Seed.citystats["city" + cityId].gate = state;
      notify (state);
    }
    },
    onFailure: function () {
    }
  })
  },
  
  onUnload : function (){
  },
  postToCell : function (m){
 var t = Tabs.tower;
 var data = {};
 if (m.marchType == null) // bogus march (returning scouts)
 return;
 if (m.marchType == 3){
 if (!Options.alertConfig.scouting)
 return;
 data.atkType = 'SPAEHEN';
 } else if (m.marchType == 4){
 data.atkType = 'ANGRIFF';
 } else {
 return;
 }
 var city = Cities.byID[m.toCityId];
 if ( city.tileId == m.toTileId )
 data.target = 'HEILIGTUM ('+ city.x +','+ city.y+')';
 else {
 if (!Options.alertConfig.wilds)
 return;
 data.target = 'WILDNISS';
 for (k in Seed.wilderness['city'+m.toCityId]){
 if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
 data.target += Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
 break;
 }
 }
 }
 if (Seed.players['u'+m.pid])
 data.who = Seed.players['u'+m.pid].n;
 else if (m.players && m.players['u'+m.pid])
 data.who = m.players['u'+m.pid].n;
 else
 data.who = 'Unbekannt';

 if (m.fromXCoord)
 data.who += m.fromXCoord +','+ m.fromYCoord;
 data.arrival = unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime()));
 var totTroops = 0;
 data.totTroops = ' '
 for (k in m.unts){
 var uid = parseInt(k.substr (1));
 data.totTroops += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
 totTroops += m.unts[k];
 }
 if (totTroops < Options.alertConfig.minTroops)
 return;

 if ( city.tileId == m.toTileId ){
 var emb = getCityBuilding(m.toCityId, 8);
 if (emb.count > 0){
 var availSlots = emb.maxLevel;
 for (k in Seed.queue_atkinc){
 if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
 --availSlots;
 }
 }
 data.embassy = 'AMBASCIATA '+ availSlots +'von'+ emb.maxLevel;
 if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
 {
 data.stat = 'TRUPPE NASCOSTE';
 }
 if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
 {
 data.stat = 'TRUPPE A DIFESA';
 }
 }
 }
 data.provider = Options.celltext.provider;
 data.num1 = Options.celltext.num1;
 data.num2 = Options.celltext.num2;
 data.num3 = Options.celltext.num3;
 data.serverId = getServerId();
 data.player = Seed.player['name'];
 data.city = city.name;

 GM_xmlhttpRequest({
 method: 'POST',
 url: 'http://hs151.digitalweb.net/index.php',
 headers: {
 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
 },
 data: implodeUrlArgs(data),

 })
},
  postToChat : function (m){
  var t = Tabs.tower;
  if (DEBUG_TRACE) logit ("checkTower(): INCOMING at "+ unixTime()  +": \n"+ inspect (m, 8, 1));
  if (m.marchType == null)      // bogus march (returning scouts)
    return;
  if (ENABLE_TEST_TAB) Tabs.F.addDiv ("ACHTUNG!<BR><PRE style='margin:0px;'>" + inspect (m, 8, 1) +'</pre>');
  if (m.marchType == 3){
    if (!Options.alertConfig.scouting)
    return;
    atkType = 'Esplorazione';
  } else if (m.marchType == 4){
    atkType = 'Attacco';
  } else {
    return;
  }
  var target, HideDefendFlag, atkType, who, attackerMight, allianceId;
    var city = Cities.byID[m.toCityId];
    HideDefendFlag = '';
    if ( city.tileId == m.toTileId ) {
      target = ' alla città ';
      if (Options.includeCityName)
        target += ' ' + city.name +',';
      target += ' al '+ city.x +','+ city.y;
      if (defMode[m.toCityId] == 0)
        HideDefendFlag = ' = '+Options.hideMessage+'!';
      if (defMode[m.toCityId] == 1)
        HideDefendFlag = ' = '+Options.defendMessage+'!';
    }
    else {
    if (!Options.alertConfig.wilds)
    return;
    target = 'Terra selvaggia';
    for (k in Seed.wilderness['city'+m.toCityId]){
    if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
      target += ' bei '+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
      break;
    }
    }
  }
  if (Seed.players['u'+m.pid])
    who = Seed.players['u'+m.pid].n;
  else if (m.players && m.players['u'+m.pid])
    who = m.players['u'+m.pid].n;
  else
    who = 'Unknown';
    if (Seed.players['u' + m.pid]) {
      who = Seed.players['u' + m.pid].n;
      attackerMight = parseInt(Seed.players['u' + m.pid].m);
      allianceId = parseInt(Seed.players['u' + m.pid].a);
    } else if (m.players && m.players['u' + m.pid]) {
        who = m.players['u' + m.pid].n;
        attackerMight = parseInt(m.players['u' + m.pid].m);
        allianceId = parseInt(m.players['u' + m.pid].a);
    } else
        who = 'Unknown';
  var might = '';
    var alliance = '';
    if (who != 'Unknown') {
      if(Options.includeMight)
        might = ' Potere ' + addCommas(attackerMight);
      if (Options.includeAlliance)
        alliance = ' ('+getDiplomacy(allianceId)+')'; // Seed.allianceNames[allianceId] no longer returns alliance name
    }
  if (m.fromXCoord)
      who += ' bei '+ m.fromXCoord +','+ m.fromYCoord;
    var msg = Options.alertConfig.aPrefix + ' ';
    msg += atkType + ' in arrivo' + target + ' da parte di '+ who + alliance + might + ' ' + HideDefendFlag + ' (Arrivo tra '+
        unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') = ';
    var totTroops = 0;
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      msg += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
      totTroops += m.unts[k];
    }
    if (totTroops < Options.alertConfig.minTroops)
      return;
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
    msg += ' = La mia ambasciata ha '+ availSlots +' su '+ emb.maxLevel +' posti liberi ';
     if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
    {
      msg+= ' = '+Options.hideMessage+'! ';
    }
    if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
    {
      msg+= ' = '+Options.defendMessage+'! ';
    }
    }
  }
  t.sendalert(m);
    if (!Options.alertConfig.aChat) return;
  if (ENABLE_TEST_TAB) Tabs.F.addDiv (msg);
  if (SEND_ALERT_AS_WHISPER)
    sendChat ("/"+ Seed.player.name +' '+ msg);    // Whisper to myself
  else
    sendChat ("/a "+  msg);                        // Alliance chat
  },
    handleTowerData: function(m){
    var t = Tabs.tower;
    var now = unixTime();
    var target, atkType, who, attackermight, allianceId, allianceName, diplomacy;
    var city = Cities.byID[m.toCityId];
    
    if (DEBUG_TRACE)
      logit("checkTower(): INCOMING at " + unixTime() + ": \n" + inspect(m, 8, 1));
    
    //ATKTYPE
    if (m.marchType == 3) {
      atkType = 'Esplorazione';
      t['scoutCount_' + m.toCityId]++;
    }
    else
      if (m.marchType == 4) {
        atkType = 'Attacco';
        t['attackCount_' + m.toCityId]++;
      }
      else {
        return;
      }
    //TARGET
    if (city.tileId == m.toTileId)
      target = 'In arrivo su ' + city.x + ',' + city.y;
    else {
      target = 'Terra selvaggia';
      for (k in Seed.wilderness['city' + m.toCityId]) {
        if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
          target += ' bei ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord;
          break;
        }
      }
    }
    //CITYNAME
    var cityName = Cities.byID[m.toCityId].name;
    
    //TROOPS
    var units = [];
    for (i = 0; i < 13; i++)
      units[i] = 0;
    for (k in m.unts) {
      var uid = parseInt(k.substr(1));
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Truppe di rifornimento')
        units[1] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Soldato semplice')
        units[2] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Esploratore')
        units[3] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Lanciere')
        units[4] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Spadaccino')
        units[5] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Arciere')
        units[6] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Cav. leggera')
        units[7] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Cav. pesante')
        units[8] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Carri di rifornimento')
        units[9] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Balista')
        units[10] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Ariete')
        units[11] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == 'Catapulta')
        units[12] = m.unts[k];
    }
    //ATTACKERS INFORMATION
    if (Seed.players['u' + m.pid]) {
      who = Seed.players['u' + m.pid].n;
      attackermight = Seed.players['u' + m.pid].m;
      allianceId = Seed.players['u' + m.pid].a;
      allianceName = Seed.allianceNames[allianceId];
      diplomacy = getDiplomacy(allianceId);
    }
    else
      if (m.players && m.players['u' + m.pid]) {
        who = m.players['u' + m.pid].n;
        attackermight = parseInt(m.players['u' + m.pid].m);
        allianceId = 'a' + m.players['u' + m.pid].a;
        allianceName = Seed.allianceNames[allianceId];
        diplomacy = getDiplomacy(allianceId);
      }
      else {
        who = 'n.A.';
        attackermight = 'n.A.';
        allianceId = 'n.A.';
        allianceName = 'n.A.';
        diplomacy = 'n.A.';
      }
  //SOURCE
    if (m.fromXCoord)
      var source = m.fromXCoord + ',' + m.fromYCoord;
    else
      var source = 'n.A.';
    
    var arrivingDatetime = new Date();
    arrivingDatetime.setTime(m.arrivalTime * 1000);
    var count = t.towerMarches.length + 1;
    t.towerMarches[count] = {
      added: now,
      cityId: m.toCityId,
      target: target,
      arrival: parseIntNan(m.arrivalTime),
      atkType: atkType,
      who: who,
      attackermight: attackermight,
      allianceName: allianceName,
      diplomacy: diplomacy,
      rtime: unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())),
      arrivingDatetime: arrivingDatetime,
    source:source,
      units: units,
    };
  },
  showTowerIncoming: function(cityId){
    var t = Tabs.tower;
    var popTowerIncoming = null;
    var cityName = Tabs.build.getCityNameById(cityId);
    
    if (t.popTowerIncoming == null) {
      t.popTowerIncoming = new CPopup('pbtower_' + cityId, 0, 0, 750, 750, true, function() {clearTimeout (t.timer);});
    }
    t.popTowerIncoming.show(false);
    var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pdxTabPad" id="pbCityTowerContent">';
    t.popTowerIncoming.getMainDiv().innerHTML = '</table></div>' + m;
    t.popTowerIncoming.getTopDiv().innerHTML = '<TD width="200px"><B>Resoconto Truppe su ' + cityName + '</b></td></td>';
    t.addCityData2Pop(cityId);
    t.popTowerIncoming.show(true);
  clearTimeout (t.timer);
  t.timer = setTimeout (function() {t.showTowerIncoming(cityId)}, 5000);        
  },
  addCityData2Pop: function(cityId){
    var t = Tabs.tower;
    var rownum = 0;
    var names = ['Truppe rifornimento', 'Soldati semplici', 'Esploratori', 'Lancieri', 'Spadaccini', 'Arcieri', 'Cav. leggera', 'Cav. pesante', 'Carri di rifornimento', 'Balista', 'Ariete', 'Catapulta'];
    enc = {};
    numSlots = 0;
    var row = document.getElementById('pbCityTowerContent').innerHTML = "";
    if (matTypeof(Seed.queue_atkinc) != 'array') {
      for (k in Seed.queue_atkinc) {
        march = Seed.queue_atkinc[k];
        if (march.marchType == 2) {
          ++numSlots;
          city = march.toCityId;
          from = march.fromPlayerId;
      if (!enc[city])
            enc[city] = {};
          if (!enc[city][from])
            enc[city][from] = [];
          k = [];
          k[0] = parseInt(march.knightCombat);
          for (i = 1; i < 13; i++) {
            if (Options.encRemaining)
              k[i] = parseInt(march['unit' + i + 'Return']);
            else
              k[i] = parseInt(march['unit' + i + 'Count']);
          }
      k[14] = parseInt(march.marchStatus);
      var now = unixTime();
      k[15] = parseInt(march.destinationUnixTime) - now;
          enc[city][from].push(k);
        }
      }
    }
    var s1 = '';
  var s2 = '';
  var s3 = '';
  var tot = [];
    var atk = [];
    for (i = 0; i < 13; i++) {
      tot[i] = 0;
      atk[i] = 0;
    }

      s1 += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;} .attack{background:#FF9999;} .own{background:#66FF66;}</style>';
      s1 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=center width=16%></td>';
      
      for (k = 0; k < names.length; k++)
        s1 += '<TD width=7%><B>' + names[k] + '</b></td>';
      s1 += '</tr>';
      dest = cityId;
      if (enc[dest]) {
        for (p in enc[dest]) {
          try {
            player = Seed.players['u' + p].n;
          }
          catch (err) {
            player = '???';
          }
          for (m = 0; m < enc[dest][p].length; m++) {
            /*knight = '';
            if (enc[dest][p][m][0] > 0)
              knight = ' (' + enc[dest][p][m][0] + ')';
      */
      status = '';
            if (enc[dest][p][m][14] == 1) {
        status = ' (' + timestr(enc[dest][p][m][15]) + ')';  
        if (enc[dest][p][m][15] < 0)
        status = ' (enc)';  
        else
         status = ' (' + timestr(enc[dest][p][m][15]) + ')';  
      }
      if (enc[dest][p][m][14] == 2) {
        status = ' (enc)';  
      }
  s1 += '<TR align=right><TD align=left class="city">' + player + status +'</td>'
          for (i = 1; i < 13; i++) {
            num = enc[dest][p][m][i];
            s1 += '<TD class="city">' + thouormil(num) + '</td>';
            tot[i] += num;
/*
            s1 += '<TR align=right><TD align=left class="city">' + player + status +'</td>'
            for (i = 1; i < 13; i++) {
              num = enc[dest][p][m][i];
              s1 += '<TD class="city">' + num + '</td>';
              tot[i] += num;
*/
            }
            //s1 += '<TD><INPUT id=sendhome_' + numSlots + ' type=submit value="Home" style="border:1px solid black; background-color:red;"></td></tr>';
          }
        }
      } else {
        s1 += '<TR align=right><TD align=left class="city"><B>Rinforzi:</b></td>'
        for (i = 1; i < 13; i++) {
          s1 += '<TD class="city">0</td>';
        }
        
      }
    s1 += '<TR align=right><TD colspan=14><BR></tr>';
      s1 += '<TR align=right><TD class="own" align=left><B>Truppe:</b></td>';
      //OWNTROOPS
      var ownTroops = "";
      for (r = 1; r < 13; r++) {
        cityString = 'city' + cityId;
        num = parseInt(Seed.units[cityString]['unt' + r]);
        //s1 += '<TD class="own">' + num + '</td>';
  s1 += '<TD class="own">' + thouormil(num) + '</td>';
        tot[r] += num;
      }
      s1 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>Truppe che difendono:</b></td>';
      for (i = 1; i < 13; i++)
s1 += '<TD class="tot">' + thouormil(tot[i]) + '</td>';
        //s1 += '<TD class="tot">' + tot[i] + '</td>';      
    s3 += '</tr></table>';
    
    s3 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>Attacchi in arrivo: </b></td>';
    
    var names = ['Truppe di rifornimento', 'Soldati semplici', 'Esploratori', 'Lancieri', 'Spadaccini', 'Archi', 'Cav. leggera', 'Cav. pesante', 'Carri di rifornimento', 'Baliste', 'Arieti', 'Catapulte'];
    if (t.towerMarches.length > 0) {
      for (k in t.towerMarches) {
        if (typeof t.towerMarches[k].atkType != 'undefined') {
          if (t.towerMarches[k].cityId == cityId) {
            s3 += '<TABLE cellspacing=0 width=100%><TR>';
            
            if (t.towerMarches[k].atkType == 'Attacco') {
              s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.jpg?6545"></b></td>';
            }
            else
              if (t.towerMarches[k].atkType == 'Esplorazione') {
                s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_30.jpg?6545"></b></td>';
              }
            s3 += '<TD width=15%  ><B>Coordinate</b></td>';
            s3 += '<TD width=15%  ><B>Nome</b></td>';
      s3 += '<TD width=10%><B>Provenienza: </b></td><TD width=10%>' + t.towerMarches[k].source + '</td>';
            s3 += '<TD width=10%><B>Potere: </b></td><TD width=10%>' + t.towerMarches[k].attackermight + '</td>';
            s3 += '<TD width=10%><B>Alleanza: </b></td><TD width=10%>' + t.towerMarches[k].allianceName + '</td>';
            s3 += '<TD width=10%><B>Diplomazia: </b></td><TD width=10%>' + t.towerMarches[k].diplomacy + '</td></tr>';
            s3 += '<TR><TD width=10%  >' + t.towerMarches[k].target + '</td>';
            s3 += '<TD  >' + t.towerMarches[k].who + '</td>';
            s3 += '<TD><B>Tempo rimasto: </b></td><TD width=10%>' + t.towerMarches[k].rtime + '</td>';
            s3 += '<TD><B>Arrivo previsto per: </b></td><TD  colspan=5 width=10%>' + t.towerMarches[k].arrivingDatetime + '</td></tr>';
            s3 += '</tr></table>';
            s3 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%></td>';
            for (n = 0; n < names.length; n++)
              s3 += '<TD width=7%><B>' + names[n] + '</b></td>';
            s3 += '</tr><TR align=right><TD class="attack" align=left><B>Unità:</td>';
            for (u = 1; u < 13; u++) {
              num = t.towerMarches[k].units[u];
s3 += '<TD class="attack">' + thouormil(num) + '</td>';
              //s3 += '<TD class="attack">' + num + '</td>';
              atk[u] += parseInt(num);
            }
      s3 += '</tr></table>';
          }
        }
        
      }
    }
  s2 += '<TR><TD colspan=14><BR></td></tr><TR align=right><TD class="attack" align=left><B>Truppe nemiche in arrivo:</b></td>';
    for (a = 1; a < 13; a++)
s2 += '<TD class="attack" width=7%>' + thouormil(atk[a]) + '</td>';
      //s2 += '<TD class="attack" width=7%>' + atk[a] + '</td>';
  var html = s1 + s2 + s3;
    document.getElementById('pbCityTowerContent').innerHTML = html;

  },
  sendReinforcmentHome: function(){ //FUNCTION NOT IN USE YET BUT SOON :-)
    //mid, cid, fromUid, fromCid, upkeep
    var params = Object.clone(g_ajaxparams);
    params.mid = mid;
    params.cid = cid;
    params.fromUid = fromUid;
    params.fromCid = fromCid;
    new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function(transport){
        var rslt = eval("(" + transport.responseText + ")");
        if (rslt.ok) {
          Modal.showAlert(g_js_strings.kickout_allies.troopshome);
          seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;
          if (parseInt(fromUid) == parseInt(tvuid)) {
            var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];
            var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));
            curmarch.returnUnixTime = unixTime() + marchtime;
            curmarch.marchStatus = 8
          }
          delete seed.queue_atkinc["m" + mid]
        }
        else {
          Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
        }
      },
      onFailure: function(){
      }
    })
  },
}
/****************************  Transport Tab  *******************************/

function getResourceProduction (cityId){
  var ret = [0,0,0,0,0];
  var now = unixTime ();

  var wilds = [0, 0, 0, 0, 0];
  var w = Seed.wilderness["city" + cityId];
  for (var k in w){
    var type = parseInt(w[k].tileType);
    if (type==10 || type==11)
      wilds[1] += parseInt(w[k].tileLevel);
    else
      wilds[type/10] += parseInt(w[k].tileLevel);
  }

  knight = 0;
  var s = Seed.knights["city" + cityId];
  if (s) {
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];
    if (s){
      var knight = parseInt(s.resourcefulness);
      if (s.resourcefulnessBoostExpireUnixtime > now)
        knight *= 1.25;
    }
  }
  var workerFactor = 1;
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);  // Current  population
  var w = parseInt(Seed.citystats["city" + cityId]["pop"][3]);  // Labor force
  if (w > c)
    workerFactor = c / w;

  ret[0] = parseInt(c * parseInt(Seed.citystats["city" + cityId]["gold"][1]) / 100) - 10 * parseInt(Seed.citystats["city" + cityId]["gold"][2]);

  for (var i=1; i<5; i++){
    var usage = Seed.resources["city" + cityId]["rec" + i];
    var items = 0;
    if (parseInt(Seed.playerEffects["r" + i + "BstExp"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
    ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + 0.05 * wilds[i]) * workerFactor + 100));
  }
  return ret;
}

var shortTroops = {1:'Truppe di rifornimento',
                   2:'Soldati semplici',
                   3:'Esploratori',
                   4:'Lancieri',
                   5:'Spadaccini',
                   6:'Arcieri',
                   7:'Cav. leggera',
                   8:'Cav. pesante',
                   9:'Carri di rifornimento',
                  10:'Baliste',
                  11:'Arieti',
                  12:'Catapulte'};

Tabs.transport = {
  tabRow: 2,
  tabOrder: toTransport,
  tabLabel: 'Auto trasporto',
  myDiv: null,
  timer: null,
  traderState: [],
  lTR: [],
  tradeRoutes: [],
  checkdotradetimeout: null,
  count:0,
  check:false,

  init: function(div){
    var t = Tabs.transport;
    t.myDiv = div;
    t.traderState = {
      running: false,
    };
    t.readTraderState();
    t.readTradeRoutes();
    t.e_tradeRoutes();

    var m = '<DIV id=pbTowrtDivF class=pdxStat>TRASPORTO AUTOMATICO - IMPOSTAZIONI</div><TABLE id=pbtraderfunctions width=100% height=0% class=pdxTab><TR align="center">';
    if (t.traderState.running == false)
      m += '<TD><INPUT id=pbTraderState type=submit value="Auto trasporto = NO"></td>';
    else
      m += '<TD><INPUT id=pbTraderState type=submit value="Auto trasporto = SI"></td>';
    m += '<TD><INPUT id=pbShowRoutes type=submit value="Mostra rotte"></td>';
    m += '</tr></table></div>';
    m += '<DIV id=pbTraderDivDRoute class=pdxStat>TRASPORTO AUTOMATICO - ROTTE</div>';

    m += '<TABLE id=pbaddtraderoute width=95% height=0% class=pdxTab><TR align="left">';
    m += '<TD width=70px><b>Città</b>: </td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptrescity></span></div></td></tr>';

    m += '<TR align="left">';
    m += '<TD width=70px><b>Città principale</b>:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptcityTo></span></div></td>';
    m += '<TD><u>oppure</u> <b>alle seguenti coordinate</b>:</td>';
    m += '<TD>X:<INPUT id=ptcityX type=text size=3\></td>';
    m += '<TD>Y:<INPUT id=ptcityY type=text size=3\></td></tr>';

    m += '<TR align="left">';
    m += '<TD colspan=5>Tempo intermedio tra un trasporto e l\'altro: <INPUT id=pbtransportinterval type=text size=1 value="'+Options.transportinterval+'"\> minuti (in base all\'ammontare delle risorse)</td></tr>';
    m += '<TR><TD colspan=5>Inviare il trasporto solo se ci sono più di<INPUT id=pbminwagons type=text size=4 value="'+Options.minwagons+'"\> di risorse con \
          <INPUT id=pbmaxwagons type=text size=4 value="'+Options.maxwagons+'"\> <SELECT id=pbTroopType>';
    for(var tt=1; tt<13; tt++) {
      var cost = unsafeWindow.unitcost['unt'+tt];
      if (tt==Options.wagontype)
        m += '<option selected value="'+tt+'">'+cost[0]+'</option>';
      else
        m += '<option value="'+tt+'">'+cost[0]+'</option>';
    }
    m += '<TR><TD colspan=5><span style=\"font-size:10px; color:#555; line-height:18px; \"><b><u><font color=#600000>ATTENZIONE</font></b></u>:  Se la "<b>quantità</b>" è  <u>0</u> vengono trasportate tutte le risorse</span></td></tr></table>';
    m += '<TABLE id=pbaddtraderoute width=55% height=0% class=pdxTab><TR align="center">';

    m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td>';
    m += '<TD><INPUT id=pbshipFood type=checkbox checked=true\></td>';
    m += '<TD>Tieni: <INPUT id=pbtargetamountFood type=text size=11 maxlength=11 value="0"\></td>';
    m += '<TD><SELECT id=pbFoodUnits><option ';
    if (Options.foodunits == 'Quantità')
      m += 'selected value="Quantità">Quantità da spostare</option><option';
    else
      m += 'value="Quantità">Quantità da spostare</option><option selected';
    m += ' value="Hours">Tempo</option></select></td>';
    m += '<TD>Quantità da spostare: <INPUT id=pbtradeamountFood type=text size=11 maxlength=11 value="0"\></td></tr>';
    m += '<TR align="center">';
    m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td>';
    m += '<TD><INPUT id=pbshipWood type=checkbox checked=true\></td>';
    m += '<TD>Tieni: <INPUT id=pbtargetamountWood type=text size=11 maxlength=11 value="0"\></td>';
    m += '<TD></td>';
    m += '<TD>Quantità da spostare: <INPUT id=pbtradeamountWood type=text size=11 maxlength=11 value="0"\></td></tr>';
    m += '<TR align="center">';
    m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td>';
    m += '<TD><INPUT id=pbshipStone type=checkbox checked=true\></td>';
    m += '<TD>Tieni:: <INPUT id=pbtargetamountStone type=text size=11 maxlength=11 value="0"\></td>';
    m += '<TD></td>';
    m += '<TD>Quantità da spostare: <INPUT id=pbtradeamountStone type=text size=11 maxlength=11 value="0"\></td></tr>';
    m += '<TR align="center">';
    m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td>';
    m += '<TD><INPUT id=pbshipOre type=checkbox checked=true\></td>';
    m += '<TD>Tieni:: <INPUT id=pbtargetamountOre type=text size=11 maxlength=11 value="0"\></td>';
    m += '<TD></td>';
    m += '<TD>Quantità da spostare: <INPUT id=pbtradeamountOre type=text size=11 maxlength=11 value="0"\></td></tr>';
    m += '<TR align="center">';
    m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png"></td>';
    m += '<TD><INPUT id=pbshipGold type=checkbox checked=true\></td>';
    m += '<TD>Tieni:: <INPUT id=pbtargetamountGold type=text size=11 maxlength =11 value="0"\></td>';
    m += '<TD><SELECT id=pbGoldUnits><option ';
    if (Options.goldunits == 'Quantità')
      m += 'selected value="Quantità">Quantità da spostare</option><option';
    else
      m += 'value="Quantità">Quantità</option><option selected';
    m += ' value="Hours">Tempo</option></select></td>';
    m += '<TD>Quantità da spostare: <INPUT id=pbtradeamountGold type=text size=11 maxlength=11 value="0"\></td></tr>'
    m += '</table>';
m += '<BR><TD colspan=4><span style=\"font-size:10px; color:#555; line-height:18px; \"><b><u>N.B. :</b></u>:  100 milioni = <b>100000000</b> - 10 milioni = <b>10000000</b> - 1 milione = <b>1000000</b></span></td></tr></table>';
    m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRoute type=submit value="Aggiungi rotta"></div>';

    t.myDiv.innerHTML = m;

    t.tcp = new CdispCityPicker ('pttrader', document.getElementById('ptrescity'), true, t.clickCitySelect, 0);
    t.tcpto = new CdispCityPicker ('pttraderTo', document.getElementById('ptcityTo'), true, t.clickCitySelect).bindToXYboxes(document.getElementById ('ptcityX'), document.getElementById ('ptcityY'));

    document.getElementById('pbTraderState').addEventListener('click', function(){
      t.toggleTraderState(this);
    }, false);
    document.getElementById('pbSaveRoute').addEventListener('click', function(){
      t.addTradeRoute();
    }, false);
    document.getElementById('pbShowRoutes').addEventListener('click', function(){
      t.showTradeRoutes();
    }, false);

    document.getElementById('pbtransportinterval').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtransportinterval').value))
        document.getElementById('pbtransportinterval').value=60 ;
      Options.transportinterval = document.getElementById('pbtransportinterval').value;
      saveOptions();
    }, false);

    document.getElementById('pbtargetamountFood').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetamountFood').value))
        document.getElementById('pbtargetamountFood').value=0 ;
    }, false);
    document.getElementById('pbtargetamountWood').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetamountWood').value))
        document.getElementById('pbtargetamountWood').value=0 ;
    }, false);
    document.getElementById('pbtargetamountStone').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetamountStone').value))
        document.getElementById('pbtargetamountStone').value=0 ;
    }, false);
    document.getElementById('pbtargetamountOre').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetamountOre').value))
        document.getElementById('pbtargetamountOre').value=0 ;
    }, false);
    document.getElementById('pbtargetamountGold').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetamountGold').value))
        document.getElementById('pbtargetamountGold').value=0 ;
    }, false);
    document.getElementById('pbFoodUnits').addEventListener('click', function(){
      Options.foodunits = document.getElementById('pbFoodUnits').value;
      saveOptions();
    }, false)
    document.getElementById('pbGoldUnits').addEventListener('click', function(){
      Options.goldunits = document.getElementById('pbGoldUnits').value;
      saveOptions();
    }, false)
    document.getElementById('pbtradeamountFood').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtradeamountFood').value))
        document.getElementById('pbtradeamountFood').value=0 ;
    }, false);
    document.getElementById('pbtradeamountWood').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtradeamountWood').value))
        document.getElementById('pbtradeamountWood').value=0 ;
    }, false);
    document.getElementById('pbtradeamountStone').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtradeamountStone').value))
        document.getElementById('pbtradeamountStone').value=0 ;
    }, false);
    document.getElementById('pbtradeamountOre').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtradeamountOre').value))
        document.getElementById('pbtradeamountOre').value=0 ;
    }, false);
    document.getElementById('pbtradeamountGold').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtradeamountGold').value))
        document.getElementById('pbtradeamountGold').value=0 ;
    }, false);
    document.getElementById('pbminwagons').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbminwagons').value))
        document.getElementById('pbminwagons').value=100;
      Options.minwagons = parseInt(document.getElementById('pbminwagons').value);
      if (Options.minwagons > Options.maxwagons) {
        Options.maxwagons = Options.minwagons;
        document.getElementById('pbmaxwagons').value=Options.minwagons;
      }
      saveOptions();
    }, false)
    document.getElementById('pbmaxwagons').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbmaxwagons').value))
        document.getElementById('pbmaxwagons').value=1000;
      Options.maxwagons = parseInt(document.getElementById('pbmaxwagons').value);
      if (Options.minwagons > Options.maxwagons) {
        Options.minwagons = Options.maxwagons;
        document.getElementById('pbminwagons').value=Options.maxwagons;
      }
      saveOptions();
    }, false)
    document.getElementById('pbTroopType').addEventListener('click', function(){
      Options.wagontype = parseInt(document.getElementById('pbTroopType').value);
      saveOptions();
    }, false)

    document.getElementById('pbshipFood').addEventListener('click', function(){
      if (document.getElementById('pbshipFood').checked==false) {
        document.getElementById('pbtargetamountFood').disabled = true;
        document.getElementById('pbtradeamountFood').disabled = true;
      }
      else {
        document.getElementById('pbtargetamountFood').disabled = false;
        document.getElementById('pbtradeamountFood').disabled = false;
      }
    },false);
    document.getElementById('pbshipWood').addEventListener('click', function(){
      if (document.getElementById('pbshipWood').checked==false) {
        document.getElementById('pbtargetamountWood').disabled = true;
        document.getElementById('pbtradeamountWood').disabled = true;
      }
      else {
        document.getElementById('pbtargetamountWood').disabled = false;
        document.getElementById('pbtradeamountWood').disabled = false;
      }
    },false);
    document.getElementById('pbshipStone').addEventListener('click', function(){
      if (document.getElementById('pbshipStone').checked==false) {
        document.getElementById('pbtargetamountStone').disabled = true;
        document.getElementById('pbtradeamountStone').disabled = true;
      }
      else {
        document.getElementById('pbtargetamountStone').disabled = false;
        document.getElementById('pbtradeamountStone').disabled = false;
      }
    },false);
    document.getElementById('pbshipOre').addEventListener('click', function(){
      if (document.getElementById('pbshipOre').checked==false) {
        document.getElementById('pbtargetamountOre').disabled = true;
        document.getElementById('pbtradeamountOre').disabled = true;
      }
      else {
        document.getElementById('pbtargetamountOre').disabled = false;
        document.getElementById('pbtradeamountOre').disabled = false;
      }
    },false);
    document.getElementById('pbshipGold').addEventListener('click', function(){
      if (document.getElementById('pbshipGold').checked==false) {
        document.getElementById('pbtargetamountGold').disabled = true;
        document.getElementById('pbtradeamountGold').disabled = true;
      }
      else {
        document.getElementById('pbtargetamountGold').disabled = false;
        document.getElementById('pbtradeamountGold').disabled = false;
      }
    },false);
    window.addEventListener('unload', t.onUnload, false);
  },

  e_tradeRoutes: function(){
    var t = Tabs.transport;
    var now = new Date();
    if (t.traderState.running == true) {
      var now = new Date().getTime()/1000.0;
      now = now.toFixed(0);
      var last = Options.lasttransport;
      if (now > (parseInt(last) + (Options.transportinterval*60)))
        t.checkdoTrades();
    }
    setTimeout(function(){ t.e_tradeRoutes();}, Options.transportinterval*1000);
  },

  delTradeRoutes: function() {
    var t = Tabs.transport;
    t.tradeRoutes= [];
  },

  checkcoords: function (obj){
    var t = Tabs.transport;
    if(obj.id == 'pbok'){
      t.check = true;
      t.addTradeRoute();
    }
    return;
  },

  addTradeRoute: function () {
    var valid = true;
    var t = Tabs.transport;
    var city = t.tcp.city.id;
    if (document.getElementById('ptcityX').value==0 && document.getElementById('ptcityY').value ==0 && !t.check) {
      new CdialogConfirm ('<SPAN class=boldRed>Stai mandando la marcia a 0,0 ! </span>', t.checkcoords, unsafeWindow.modal_attack_check, mainPop.getMainDiv);
      return;
    }
    var ship_Food = document.getElementById('pbshipFood').checked;
    var ship_Wood = document.getElementById('pbshipWood').checked;
    var ship_Stone = document.getElementById('pbshipStone').checked;
    var ship_Ore = document.getElementById('pbshipOre').checked;
    var ship_Gold = document.getElementById('pbshipGold').checked;
    var target_Food = document.getElementById('pbtargetamountFood').value;
    var target_Wood = document.getElementById('pbtargetamountWood').value;
    var target_Stone = document.getElementById('pbtargetamountStone').value;
    var target_Ore = document.getElementById('pbtargetamountOre').value;
    var target_Gold = document.getElementById('pbtargetamountGold').value;
    var food_Units = Options.foodunits;
    var gold_Units = Options.goldunits;
    var trade_Food = document.getElementById('pbtradeamountFood').value;
    var trade_Wood = document.getElementById('pbtradeamountWood').value;
    var trade_Stone = document.getElementById('pbtradeamountStone').value;
    var trade_Ore = document.getElementById('pbtradeamountOre').value;
    var trade_Gold = document.getElementById('pbtradeamountGold').value;
    var target_x = document.getElementById('ptcityX').value;
    var target_y = document.getElementById('ptcityY').value;
    var troop_type = document.getElementById('pbTroopType').value;
    var troop_min = Options.minwagons;
    var troop_max = Options.maxwagons;

    if (valid == true) {
      var lTR = t.tradeRoutes;
      lTR.push({
        city:         city,
        ship_Food:    ship_Food,
        target_Food:  target_Food,
        food_Units:   food_Units,
        gold_Units:   gold_Units,
        trade_Food:   trade_Food,
        ship_Wood:    ship_Wood,
        target_Wood:  target_Wood,
        trade_Wood:   trade_Wood,
        ship_Stone:   ship_Stone,
        target_Stone: target_Stone,
        trade_Stone:  trade_Stone,
        ship_Ore:     ship_Ore,
        target_Ore:   target_Ore,
        trade_Ore:    trade_Ore,
        ship_Gold:    ship_Gold,
        target_Gold:  target_Gold,
        trade_Gold:   trade_Gold,
        target_x:     target_x,
        target_y:     target_y,
        troop_type:   troop_type,
        troop_min:    troop_min,
        troop_max:    troop_max
      });
    }
    document.getElementById('pbTraderDivDRoute').style.background ='#99FF99';
    setTimeout(function(){ (document.getElementById('pbTraderDivDRoute').style.background =''); }, 1000);
  },

  showTradeRoutes: function () {
    var t = Tabs.transport;
    var popTradeRoutes = null;
    t.popTradeRoutes = new CPopup('pbShowTrade', 0, 0, 750, 500, true, function() {clearTimeout (1000);});
    var m = '<DIV style="max-height:460px; height:460px; overflow-x:auto; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowTradeRoutes" id="pbRoutesQueue">';
    t.popTradeRoutes.getMainDiv().innerHTML = '</table></div>' + m;
    t.popTradeRoutes.getTopDiv().innerHTML = '<TD><B>Rotte di trasporto automatico:</B></td>';
    t.paintTradeRoutes();
    t._addTabHeader();
    t.popTradeRoutes.show(true);
  },


  paintTradeRoutes: function(){
    var t = Tabs.transport;
    var r = t.tradeRoutes;
    var cityname, targetcityname;
    for (var i = (r.length-1); i>=0; i--) {
      targetcityname = '';
      for (var y=0; y< Seed.cities.length;y++) {
        if ( parseInt(Seed.cities[y][0]) == r[i].city)
          var cityname = Seed.cities[y][1];
        if (parseInt(Seed.cities[y][2]) == r[i].target_x && parseInt(Seed.cities[y][3]) == r[i].target_y)
          var targetcityname = Seed.cities[y][1];
      }
      var queueId = i;
      if (targetcityname == '')
        targetcityname = r[i].target_x + ',' + r[i].target_y;
      t._addTab(queueId, cityname, targetcityname, r[i].ship_Food, r[i].target_Food, r[i].food_Units, r[i].trade_Food, r[i].ship_Wood, r[i].target_Wood, r[i].trade_Wood, r[i].ship_Stone, r[i].target_Stone, r[i].trade_Stone, r[i].ship_Ore, r[i].target_Ore, r[i].trade_Ore, r[i].ship_Gold, r[i].target_Gold, r[i].gold_Units, r[i].trade_Gold, r[i].troop_type, r[i].troop_min, r[i].troop_max);
    }
  },

  _addTab: function(queueId, cityname, targetcityname, ship_Food, target_Food, food_Units, trade_Food, ship_Wood, target_Wood, trade_Wood, ship_Stone, target_Stone, trade_Stone, ship_Ore, target_Ore, trade_Ore, ship_Gold, target_Gold, gold_Units, trade_Gold, troop_Type, troop_Min, troop_Max){
    var t = Tabs.transport;
    var row = document.getElementById('pbRoutesQueue').insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML  = queueId;
    row.insertCell(1).innerHTML  = cityname;
    row.insertCell(2).innerHTML  = targetcityname;
    row.insertCell(3).innerHTML  = thouormil(troop_Min) + ' - ' + thouormil(troop_Max) + ' ' + shortTroops[troop_Type];
    if (ship_Food) {
      if (food_Units == 'Quantità')
        row.insertCell(4).innerHTML  = thouormil(target_Food);
      else
        row.insertCell(4).innerHTML  = target_Food + 'h';
      row.insertCell(5).innerHTML  = thouormil(trade_Food);
    } else
    {
      row.insertCell(4).innerHTML  = '';
      row.insertCell(5).innerHTML  = '';
    }
    if (ship_Wood) {
      row.insertCell(6).innerHTML  = thouormil(target_Wood);
      row.insertCell(7).innerHTML  = thouormil(trade_Wood);
    } else {
      row.insertCell(6).innerHTML  = '';
      row.insertCell(7).innerHTML  = '';
    }
    if (ship_Stone) {
      row.insertCell(8).innerHTML = thouormil(target_Stone);
      row.insertCell(9).innerHTML = thouormil(trade_Stone);
    } else {
      row.insertCell(8).innerHTML = '';
      row.insertCell(9).innerHTML = '';
    }
    if (ship_Ore) {
      row.insertCell(10).innerHTML = thouormil(target_Ore);
      row.insertCell(11).innerHTML = thouormil(trade_Ore);
    } else {
      row.insertCell(10).innerHTML = '';
      row.insertCell(11).innerHTML = '';
    }
    if (ship_Gold) {
      if (gold_Units == 'Quantità')
        row.insertCell(12).innerHTML  = thouormil(target_Gold);
      else
        row.insertCell(12).innerHTML  = target_Gold + 'h';
      row.insertCell(13).innerHTML = thouormil(trade_Gold);
    } else {
      row.insertCell(12).innerHTML = '';
      row.insertCell(13).innerHTML = '';
    }
    row.insertCell(14).innerHTML = '<a class="button20" id="tradecancel_' + queueId + '"><span>Cancella</span></a>';
    document.getElementById('tradecancel_' + queueId).addEventListener('click', function(){
      t.cancelQueueElement(queueId);
    }, false);
  },

  _addTabHeader: function() {
    var t = Tabs.transport;
    var row = document.getElementById('pbRoutesQueue').insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML  = "<B><BR />Numero</B>";
    row.insertCell(1).innerHTML  = "<B><BR />Da</B>";
    row.insertCell(2).innerHTML  = "<B><BR />A</B>";
    row.insertCell(3).innerHTML  = "<B><BR />Con</B>";
    row.insertCell(4).innerHTML  = "<B>Cibo<BR />Tieni</B>";
    row.insertCell(5).innerHTML  = "<B><BR />Manda</B>";
    row.insertCell(6).innerHTML  = "<B>Legno<BR />Tieni</B>";
    row.insertCell(7).innerHTML  = "<B><BR />Manda</B>";
    row.insertCell(8).innerHTML = "<B>Pietra<BR />Tieni</B>";
    row.insertCell(9).innerHTML = "<B><BR />Manda</B>";
    row.insertCell(10).innerHTML = "<B>Minerale<BR />Tieni</B>";
    row.insertCell(11).innerHTML = "<B><BR />Manda</B>";
    row.insertCell(12).innerHTML = "<B>Oro<BR />Tieni</B>";
    row.insertCell(13).innerHTML = "<B><BR />Manda</B>";
  },

  cancelQueueElement: function(queueId){
    var t = Tabs.transport;
    var queueId = parseInt(queueId);
    t.tradeRoutes.splice(queueId, 1);
    t.showTradeRoutes();
  },

  saveTradeRoutes: function(){
    var t = Tabs.transport;
    var serverID = getServerId();
    GM_setValue('tradeRoutes_' + serverID, JSON2.stringify(t.tradeRoutes));
  },

  readTradeRoutes: function(){
    var t = Tabs.transport;
    var serverID = getServerId();
    s = GM_getValue('tradeRoutes_' + serverID);
    if (s != null) {
      route = JSON2.parse(s);
      for (k in route) {
        t.tradeRoutes[k] = route[k];
        if (t.tradeRoutes[k]["troop_type"] == undefined)
          t.tradeRoutes[k]["troop_type"] = 9;
        if (t.tradeRoutes[k]["troop_min"] == undefined)
          t.tradeRoutes[k]["troop_min"] = Options.minwagons;
        if (t.tradeRoutes[k]["troop_max"] == undefined)
          t.tradeRoutes[k]["troop_max"] = Options.maxwagons;
        if (t.tradeRoutes[k]["food_Units"] == undefined)
          t.tradeRoutes[k]["food_Units"] = 'Quantità';
        if (t.tradeRoutes[k]["gold_Units"] == undefined)
          t.tradeRoutes[k]["gold_Units"] = 'Quantità';
      }
    }
  },

  saveTraderState: function(){
    var t = Tabs.transport;
    var serverID = getServerId();
    GM_setValue('traderState_' + serverID, JSON2.stringify(t.traderState));
  },

  readTraderState: function(){
    var t = Tabs.transport;
    var serverID = getServerId();
    s = GM_getValue('traderState_' + serverID);
    if (s != null) {
      state = JSON2.parse(s);
      for (k in state)
        t.traderState[k] = state[k];
    }
  },

  toggleTraderState: function(obj){
    var t = Tabs.transport;
    if (t.traderState.running == true) {
      t.traderState.running = false;
      obj.value = "Transport = NO";
      clearTimeout(t.checkdotradetimeout);
      t.count = 0;
    }
    else {
      t.traderState.running = true;
      obj.value = "Trasporto = SI";
      t.e_tradeRoutes();
    }
  },

  checkdoTrades: function(){
    var t = Tabs.transport;
    if(t.tradeRoutes.length==0)
      return;
    t.doTrades(t.count);
    t.count++;
    if(t.count < t.tradeRoutes.length) {
      t.checkdotradetimeout = setTimeout(function() { t.checkdoTrades();}, 5000);
    } else {
      var now = new Date().getTime()/1000.0;
      now = now.toFixed(0);
      Options.lasttransport = now;
      saveOptions();
      t.count = 0;
    }
  },

  doTrades: function(count){
    var t = Tabs.transport;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.gold =0;
    params.r1 =0;
    params.r2 =0;
    params.r3 =0;
    params.r4 =0 ;
    params.kid = 0;

    var carry_amount= 0;
    var wagons_needed=0;
    var citymax = 0;
    var city = parseInt(t.tradeRoutes[count]["city"]);
    var cityID = 'city' + city;

    var cityname = '';
    for (var c=0; c<Seed.cities.length; c++) {
      if (parseInt(Seed.cities[c][0]) == city)
        cityname = Seed.cities[c][1];
    }
    if (cityname == '') {
      actionLog('La città di ' + city + ', non è stata trovata alle coordinate inserite- cancellare la rotta e rifarla');
      return
    }

    var xcoord = t.tradeRoutes[count]["target_x"];
    var ycoord = t.tradeRoutes[count]["target_y"];
    var troop_Type = t.tradeRoutes[count]["troop_type"];
    var troop_Min = t.tradeRoutes[count]["troop_min"];
    var troop_Max = t.tradeRoutes[count]["troop_max"];

    var trade_Food  = t.tradeRoutes[count]["trade_Food"];
    var trade_Wood  = t.tradeRoutes[count]["trade_Wood"];
    var trade_Stone = t.tradeRoutes[count]["trade_Stone"];
    var trade_Ore   = t.tradeRoutes[count]["trade_Ore"];
    var trade_Gold  = t.tradeRoutes[count]["trade_Gold"];
    var food_Units  = t.tradeRoutes[count]["food_Units"];
    var gold_Units  = t.tradeRoutes[count]["gold_Units"];
    var target_Food  = t.tradeRoutes[count]["target_Food"];
    var target_Wood  = t.tradeRoutes[count]["target_Wood"];
    var target_Stone = t.tradeRoutes[count]["target_Stone"];
    var target_Ore   = t.tradeRoutes[count]["target_Ore"];
    var target_Gold  = t.tradeRoutes[count]["target_Gold"];
    var ship_Food  = t.tradeRoutes[count]["ship_Food"];
    var ship_Wood  = t.tradeRoutes[count]["ship_Wood"];
    var ship_Stone = t.tradeRoutes[count]["ship_Stone"];
    var ship_Ore   = t.tradeRoutes[count]["ship_Ore"];
    var ship_Gold  = t.tradeRoutes[count]["ship_Gold"];
    var citymax_Food  = parseInt(Seed.resources[cityID]['rec1'][0] / 3600);
    var citymax_Wood  = parseInt(Seed.resources[cityID]['rec2'][0] / 3600);
    var citymax_Stone = parseInt(Seed.resources[cityID]['rec3'][0] / 3600);
    var citymax_Ore   = parseInt(Seed.resources[cityID]['rec4'][0] / 3600);
    var citymax_Gold  = parseInt(Seed.citystats[cityID]['gold']);
    if (food_Units == 'Hours' || gold_Units == 'Hours')
      var rp = getResourceProduction (city);
    if (food_Units == 'Hours') {
      var foodusage = parseInt(Seed.resources[cityID]['rec1'][3]);
      target_Food = (foodusage - rp[1]) * target_Food; // convert hours into amount
    }
    if (gold_Units == 'Hours')
      target_Gold = (0 - rp[0]) * target_Gold; // convert hours into amount
    var carry_Food  = (citymax_Food - target_Food);
    var carry_Wood  = (citymax_Wood - target_Wood);
    var carry_Stone = (citymax_Stone - target_Stone);
    var carry_Ore   = (citymax_Ore - target_Ore);
    var carry_Gold  = 0;
    if (carry_Food < 0 || ship_Food==false) carry_Food = 0;
    if (carry_Wood < 0 || ship_Wood==false) carry_Wood = 0;
    if (carry_Stone < 0 || ship_Stone==false) carry_Stone = 0;
    if (carry_Ore < 0 || ship_Ore==false) carry_Ore = 0;
    if (trade_Food > 0 && (carry_Food > trade_Food)) carry_Food = parseInt(trade_Food);
    if (trade_Wood > 0 && (carry_Wood > trade_Wood)) carry_Wood = parseInt(trade_Wood);
    if (trade_Stone > 0 && (carry_Stone > trade_Stone)) carry_Stone = parseInt(trade_Stone);
    if (trade_Ore > 0 && (carry_Ore > trade_Ore)) carry_Ore = parseInt(trade_Ore);
    var wagons = parseInt(Seed.units[cityID]['unt'+troop_Type]);
    var rallypointlevel = getRallyPointLevel(cityID, true);
    if (wagons > (rallypointlevel*10000))
      wagons = (rallypointlevel*10000);
    if (wagons > troop_Max)
      wagons = troop_Max;

    var featherweight = parseInt(Seed.tech.tch10);
    var stats = unsafeWindow.unitstats['unt'+troop_Type];
    var loadpertroop = stats[5]
    var maxloadpertroop = ((featherweight * loadpertroop / 10) + loadpertroop);
    var maxload = (maxloadpertroop * wagons);

    if(wagons <= 0)
      return;

    var shift_Food  = (maxload / 4);
    var shift_Wood  = (maxload / 4);
    var shift_Stone = (maxload / 4);
    var shift_Ore   = (maxload / 4);

    if ((maxload - carry_Food - carry_Wood - carry_Stone - carry_Ore) < 0){
      var shift_num=0;
      var shift_spare=0;

      // Check: Lago if load/4 is to big for some resources...
      if (carry_Food < shift_Food) {
        shift_spare += (shift_Food - carry_Food);
        shift_Food = carry_Food;
      }
      if (carry_Wood < shift_Wood) {
        shift_spare += (shift_Wood - carry_Wood);
        shift_Wood = carry_Wood;
      }
      if (carry_Stone < shift_Stone) {
        shift_spare += (shift_Stone - carry_Stone);
        shift_Stone = carry_Stone;
      }
      if (carry_Ore < shift_Ore) {
        shift_spare += (shift_Ore - carry_Ore);
        shift_Ore = carry_Ore;
      }

      while (shift_spare >1) {
        if (carry_Food < (shift_Food + shift_spare)){
          shift_spare = shift_spare - carry_Food;;
          shift_Food = carry_Food;
        } else {
          shift_Food = (shift_Food + shift_spare);
          shift_spare = shift_spare- shift_spare;
        }
        if (carry_Wood < (shift_Wood + shift_spare)){
          shift_spare = shift_spare - carry_Wood;;
          shift_Wood = carry_Wood;
        } else {
          shift_Wood = shift_Wood + shift_spare;
          shift_spare = shift_spare- shift_spare;
        }
        if (carry_Stone < (shift_Stone + shift_spare)){
          shift_spare = shift_spare - carry_Stone;
          shift_Stone = carry_Stone;
        } else {
          shift_Stone = shift_Stone + shift_spare;
          shift_spare = shift_spare- shift_spare;
        }
        if (carry_Ore < (shift_Ore + shift_spare)){
          shift_spare = shift_spare - carry_Ore;
          shift_Ore = carry_Ore;
        } else {
          shift_Ore = shift_Ore + shift_spare;
          shift_spare = shift_spare- shift_spare;
        }
      }

      carry_Food  = shift_Food;
      carry_Wood  = shift_Wood;
      carry_Stone = shift_Stone;
      carry_Ore   = shift_Ore;
    }

    if (maxload > (carry_Food + carry_Wood + carry_Stone + carry_Ore) && ship_Gold==true) {
      if ((maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore)) > (citymax_Gold - target_Gold)){
        carry_Gold = (citymax_Gold - target_Gold);
        if (carry_Gold < 0 ) carry_Gold = 0;
      }
      else
        carry_Gold = (maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore));
      if (trade_Gold > 0 && (carry_Gold > trade_Gold))
        carry_Gold = trade_Gold;
    }

    wagons_needed = ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) / maxloadpertroop);
    wagons_needed = wagons_needed.toFixed(0);
    if (wagons_needed < ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) / maxloadpertroop))
      wagons_needed++;
    if (wagons_needed < troop_Min)
      return;

    params.cid= city;
    params.type = "1";
    params.xcoord = xcoord;
    params.ycoord = ycoord;
    params.r1 = carry_Food;
    params.r2 = carry_Wood;
    params.r3 = carry_Stone;
    params.r4 = carry_Ore;
    params.gold = carry_Gold;
    params["u"+troop_Type] = wagons_needed;

    if ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) > 0) {
      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        loading: true,
        onSuccess: function (transport) {
          var rslt = eval("(" + transport.responseText + ")");
          if (rslt.ok) {
            actionLog('Traposto automatico: Parito da : ' + cityname + "  a: " + xcoord + ',' + ycoord + " -> " + shortTroops[troop_Type] + ": " + addCommas(wagons_needed));
            var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
            var ut = unsafeWindow.unixtime();
            var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
            for(i = 0; i <= unitsarr.length; i++){
              if(params["u"+i])
                unitsarr[i] = params["u"+i];
            }
            var resources=new Array();
            resources[0] = params.gold;
            for(i=1; i<=4; i++)
              resources[i] = params["r"+i];
            var currentcityid = city;
            unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
            unsafeWindow.update_seed(rslt.updateSeed)
            if(rslt.updateSeed)
              unsafeWindow.update_seed(rslt.updateSeed);
          } else {
            if (rslt.error_code == 213)
              actionLog('Il trasporto a ' + cityname + ' è fallito -> Manca il cavaliere!');
            else if (rslt.error_code == 8)
              actionLog('Il trasporto a ' + cityname + ' è fallito-> Toppo traffico');
            else if (rslt.error_code == 210)
              actionLog('Il trasporto a ' + cityname + ' è fallito -> Spazio insufficente nel punto di riunione - ' + rslt.feedback);
            else
              actionLog('Il trasporto a ' + cityname + ' è fallito -> ' + rslt.error_code + ' -  ' + rslt.msg + ' -  ' + rslt.feedback);
          }
        },
        onFailure: function () {}
      });
    }
  },

  show: function(){
    var t = Tabs.transport;
     mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },

  hide: function(){
        var t = Tabs.transport;
     mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },

  onUnload: function(){
    var t = Tabs.transport;
    t.saveTradeRoutes();
    t.saveTraderState();
  },
}
/****************************  Reassign Implementation  *******************************/
var truppe = {1:'Truppe di rifornimento:',
    2:'Soldati semplici',
    3:'Esploratori',
    4:'Lancieri',
    5:'Spadaccini',
    6:'Arcieri',
    7:'Cav. leggera',
    8:'Cav. pesante',
    9:'Carri di rifornimento',
    10:'Baliste',
    11:'Arieti',
    12:'Catapulte'};  
Tabs.Reassign = {
  tabLabel: 'Riassegna',
  tabOrder: toTruppen,
  myDiv: null,
  timer: null,
  reassignState: [],
  lRE: [],
  reassignRoutes: [],
  rallypointlevel:null,
  count:0,
check:false,
  init: function(div){
  var t = Tabs.Reassign;
    t.myDiv = div;
  t.reassignState = {
      running: false,
    };
    t.readReassignState();
  t.readReassignRoutes();
  t.e_reassignRoutes();

    var m = '<DIV id=pbReMainDivF class=pdxStat2>RIASSEGNA AUTOMATICO</div><TABLE id=pbtraderfunctions width=100% height=0% class=pdxTab><TR align="center">';
    if (t.reassignState.running == false) {
      m += '<TD><INPUT id=pbReassignState type=submit value="Auto riassegna = NO"></td>';
    } else {
      m += '<TD><INPUT id=pbReassignState type=submit value="Auto riassegna = SI"></td>';
    }
    m += '<TD><INPUT id=pbReassShowRoutes type=submit value="Mostra rotte"></td>';
    m += '</tr></table></div>';
    m += '<DIV id=pbReassignDivD class=pdxStat2>AGGIUNGI ROTTA</div>';

    m += '<TABLE id=pbaddreasignroute width=95% height=0% class=pdxTab><TR align="left">';
    m += '<TD width=20px><b>Città</b>:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptassigncity></span></div></td></tr>';

    m += '<TR align="left">';
    m += '<TD width=20px><b>Città principale</b>:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptassigncityTo></span></div></td>';
  
    m += '<TR align="left">';
    m += '<TD colspan=4>Riassegna truppe ogni  <INPUT id=pbreassigninterval type=text size=2 value="'+Options.reassigninterval+'"\> minuti</td></tr></table>';
      m += '<BR><TD colspan=4><span style=\"font-size:10px; color:#555; line-height:18px; \"><b><u><font color=#600000>ATTENZIONE</font></b></u>: <b><u>alle</b></u> checkboxen müssen bei dem adden von Routen <b>aktiv</b> sein! Trage bei den Truppen die du <u>verschieben</u> möchtest eine <font color=#3b5998><b>0</b></font> ein!</span></td></tr></table>';
    m += '<TABLE id=pbaddreasignroute width=100% height=0% class=pdxTab><TR align="center">';
    
    m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
    m += '<TD>Truppe di rifornimento</td>'
    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
    m += '<TD>Soldati semplici</td>'
    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
    m += '<TD>Esploratori</td>'
    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
    m += '<TD>Lancieri</td></tr>'
    m += '<TR><TD><INPUT id=pbVersorgungstruppe type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetVersorgungstruppe disabled=true type=text size=6 maxlength=6 value="0"\></td>';
    m += '<TD><INPUT id=pbMilizsoldat type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetMilizsoldat disabled=true type=text size=6 maxlength=6 value="0"\></td>';
    m += '<TD><INPUT id=pbSpäher type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetSpäher disabled=true type=text size=6 maxlength=6 value="0"\></td>';
    m += '<TD><INPUT id=pbLanzenträger type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetLanzenträger disabled=true type=text size=6 maxlength=6 value="0"\></td></tr>';
    
    m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
    m += '<TD>Spadaccini</td>'
    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
    m += '<TD>Arcieri</td>'
    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
    m += '<TD>Cav. leggera</td>'
    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
    m += '<TD>Cav. pesante</td></tr>'
    m += '<TR><TD><INPUT id=pbSchwertkämpfer type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetSchwertkämpfer disabled=true type=text size=6 maxlength=6 value="0"\></td>';
    m += '<TD><INPUT id=pbBogenschützen type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetBogenschützen disabled=true type=text size=6 maxlength=6 value="0"\></td>';
    m += '<TD><INPUT id=pbKavallerie type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetKavallerie disabled=true type=text size=6 maxlength=6 value="0"\></td>';
    m += '<TD><INPUT id=pbSchwereKavallerie type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetSchwereKavallerie disabled=true type=text size=6 maxlength=6 value="0"\></td></tr>';
    
    m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
    m += '<TD>Carri di rifornimento</td>'
    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
    m += '<TD>Baliste</td>'
    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
    m += '<TD>Arieti</td>'
    m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
    m += '<TD>Catapulte</td></tr>'
    m += '<TR><TD><INPUT id=pbVersorgungswagen type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetVersorgungswagen disabled=true type=text size=6 maxlength=6 value="0"\></td>';
    m += '<TD><INPUT id=pbBallisten type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetBallisten disabled=true type=text size=6 maxlength=6 value="0"\></td>';
    m += '<TD><INPUT id=pbRammbock type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetRammbock disabled=true type=text size=6 maxlength=6 value="0"\></td>';
    m += '<TD><INPUT id=pbSteinschleuder type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtargetSteinschleuder disabled=true type=text size=6 maxlength=6 value="0"\></td></tr></table>';
    
    m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRouteReassign type=submit value="Aggiungi rotta"></div>';
    
    t.myDiv.innerHTML = m;
    
    t.tcp = new CdispCityPicker ('ptreassign', document.getElementById('ptassigncity'), true, t.clickCitySelect, 0);
  for(var k in troops){
    document.getElementById('pbtarget'+troops[k]).value = parseInt(Seed.units['city' + t.tcp.city.id]['unt'+k]);
  }
    t.tcpto = new CdispCityPicker ('ptreassignTo', document.getElementById('ptassigncityTo'), true, t.clickCitySelect).bindToXYboxes(document.getElementById ('ptcityX'), document.getElementById ('ptcityY'));

    document.getElementById('ptassigncity').addEventListener('click', function(){
    for(var k in troops){
    document.getElementById('pbtarget'+troops[k]).value = parseInt(Seed.units['city' + t.tcp.city.id]['unt'+k]);
    }
    }, false);
    
    document.getElementById('pbReassignState').addEventListener('click', function(){
    t.toggleReassignState(this);
    }, false);
    document.getElementById('pbSaveRouteReassign').addEventListener('click', function(){
    t.addReassignRoute();
    }, false);
    document.getElementById('pbReassShowRoutes').addEventListener('click', function(){
    t.showReassignRoutes();
    }, false);
    
    document.getElementById('pbreassigninterval').addEventListener('keyup', function(){
  if (isNaN(document.getElementById('pbreassigninterval').value)){ document.getElementById('pbreassigninterval').value=0 ;}
  Options.reassigninterval = document.getElementById('pbreassigninterval').value;
  saveOptions();
    }, false);
    
    document.getElementById('pbtargetVersorgungstruppe').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetVersorgungstruppe').value)) document.getElementById('pbtargetVersorgungstruppe').value=0 ;
    }, false);
    document.getElementById('pbtargetMilizsoldat').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetMilizsoldat').value)) document.getElementById('pbtargetMilizsoldat').value=0 ;
    }, false);
    document.getElementById('pbtargetSpäher').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetSpäher').value)) document.getElementById('pbtargetSpäher').value=0 ;
    }, false);
    document.getElementById('pbtargetLanzenträger').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetLanzenträger').value)) document.getElementById('pbtargetLanzenträger').value=0 ;
    }, false);
    document.getElementById('pbtargetSchwertkämpfer').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetSchwertkämpfer').value)) document.getElementById('pbtargetSchwertkämpfer').value=0 ;
    }, false);
    document.getElementById('pbtargetBogenschützen').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetBogenschützen').value)) document.getElementById('pbtargetBogenschützen').value=0 ;
    }, false);
    document.getElementById('pbtargetKavallerie').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetKavallerie').value)) document.getElementById('pbtargetKavallerie').value=0 ;
    }, false);
    document.getElementById('pbtargetSchwereKavallerie').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetSchwereKavallerie').value)) document.getElementById('pbtargetSchwereKavallerie').value=0 ;
    }, false);
    document.getElementById('pbtargetVersorgungswagen').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetVersorgungswagen').value)) document.getElementById('pbtargetVersorgungswagen').value=0 ;
    }, false);
    document.getElementById('pbtargetBallisten').addEventListener('keyup', function(){
      if (isNaN(document.getElementById('pbtargetBallisten').value)) document.getElementById('pbtargetBallisten').value=0 ;
    }, false);
   document.getElementById('pbtargetRammbock').addEventListener('keyup', function(){
     if (isNaN(document.getElementById('pbtargetRammbock').value)) document.getElementById('pbtargetRammbock').value=0 ;
   }, false);
   document.getElementById('pbtargetSteinschleuder').addEventListener('keyup', function(){
     if (isNaN(document.getElementById('pbtargetSteinschleuder').value)) document.getElementById('pbtargetSteinschleuder').value=0 ;
   }, false);
   
    
    document.getElementById('pbVersorgungstruppe').addEventListener('click', function(){
      if (document.getElementById('pbVersorgungstruppe').checked==false) {
        document.getElementById('pbtargetVersorgungstruppe').disabled = true;
      }
      else {
      document.getElementById('pbtargetVersorgungstruppe').disabled = false;
      }
    },false);
    document.getElementById('pbMilizsoldat').addEventListener('click', function(){
      if (document.getElementById('pbMilizsoldat').checked==false) {
        document.getElementById('pbtargetMilizsoldat').disabled = true;
      }
      else {
      document.getElementById('pbtargetMilizsoldat').disabled = false;
      }
    },false);
    document.getElementById('pbSpäher').addEventListener('click', function(){
      if (document.getElementById('pbSpäher').checked==false) {
        document.getElementById('pbtargetSpäher').disabled = true;
      }
      else {
      document.getElementById('pbtargetSpäher').disabled = false;
      }
    },false);
    document.getElementById('pbLanzenträger').addEventListener('click', function(){
      if (document.getElementById('pbLanzenträger').checked==false) {
        document.getElementById('pbtargetLanzenträger').disabled = true;
      }
      else {
      document.getElementById('pbtargetLanzenträger').disabled = false;
      }
    },false);
    document.getElementById('pbSchwertkämpfer').addEventListener('click', function(){
      if (document.getElementById('pbSchwertkämpfer').checked==false) {
        document.getElementById('pbtargetSchwertkämpfer').disabled = true;
      }
      else {
      document.getElementById('pbtargetSchwertkämpfer').disabled = false;
      }
    },false);
    document.getElementById('pbBogenschützen').addEventListener('click', function(){
      if (document.getElementById('pbBogenschützen').checked==false) {
        document.getElementById('pbtargetBogenschützen').disabled = true;
      }
      else {
      document.getElementById('pbtargetBogenschützen').disabled = false;

      }
    },false);
    document.getElementById('pbKavallerie').addEventListener('click', function(){
      if (document.getElementById('pbKavallerie').checked==false) {

        document.getElementById('pbtargetCavalry').disabled = true;
      }
      else {
      document.getElementById('pbtargetKavallerie').disabled = false;
      }
    },false);
    document.getElementById('pbSchwereKavallerie').addEventListener('click', function(){
      if (document.getElementById('pbSchwereKavallerie').checked==false) {
        document.getElementById('pbtargetSchwereKavallerie').disabled = true;
      }
      else {
      document.getElementById('pbtargetSchwereKavallerie').disabled = false;
      }
    },false);
    document.getElementById('pbVersorgungswagen').addEventListener('click', function(){
      if (document.getElementById('pbVersorgungswagen').checked==false) {
        document.getElementById('pbtargetVersorgungswagen').disabled = true;
      }
      else {
      document.getElementById('pbtargetVersorgungswagen').disabled = false;
      }
    },false);
    document.getElementById('pbBallisten').addEventListener('click', function(){
      if (document.getElementById('pbBallisten').checked==false) {
        document.getElementById('pbtargetBallisten').disabled = true;
      }
      else {
      document.getElementById('pbtargetBallisten').disabled = false;
      }
    },false);
    document.getElementById('pbRammbock').addEventListener('click', function(){
      if (document.getElementById('pbRammbock').checked==false) {
        document.getElementById('pbtargetRammbock').disabled = true;
      }
      else {
      document.getElementById('pbtargetRammbock').disabled = false;
      }
    },false);
    document.getElementById('pbSteinschleuder').addEventListener('click', function(){
      if (document.getElementById('pbSteinschleuder').checked==false) {
        document.getElementById('pbtargetSteinschleuder').disabled = true;
      }
      else {
      document.getElementById('pbtargetSteinschleuder').disabled = false;
      }
    },false);
    
    
    window.addEventListener('unload', t.onUnload, false);
  },
  
  getRallypoint: function(cityId){
    var t = Tabs.Reassign;
for (var o in Seed.buildings[cityId]){
  var buildingType = parseInt(Seed.buildings[cityId][o][0]);
  var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
  if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);
}
 },
      

 e_reassignRoutes: function(){
    var t = Tabs.Reassign;
    var now = new Date();
    if (t.reassignState.running == true)    {
    var now = new Date().getTime()/1000.0;
    now = now.toFixed(0);
    var last = Options.lastreassign;
       if ( now > (parseInt(last) + (Options.reassigninterval*60))){
      t.checkdoReassign();
      }
    }
    setTimeout(function(){ t.e_reassignRoutes();}, Options.reassigninterval*1000);
    
  },
      
  delReassignRoutes: function() {
    
  var t = Tabs.Reassign;
    
  t.reassignRoutes= [];
  
  },
  addReassignRoute: function () {
  var t = Tabs.Reassign;
  var city = t.tcp.city.id;
  
  if (document.getElementById('ptcityX').value==0 && document.getElementById('ptcityY').value ==0)
  {
    new CdialogCancelContinue ('<SPAN class=boldRed>Stai per mandare allo 0,0!!</span>', null, unsafeWindow.modal_attack_check, document.getElementById('pbReMainDivF'));
    return;
  }
  
  var SendVersorgungstruppe = document.getElementById('pbVersorgungstruppe').checked;
  var SendMilizsoldat = document.getElementById('pbMilizsoldat').checked;
  var SendSpäher = document.getElementById('pbSpäher').checked;
  var SendLanzenträger = document.getElementById('pbLanzenträger').checked;
  var SendSchwertkämpfer = document.getElementById('pbSchwertkämpfer').checked;
  var SendBogenschützen = document.getElementById('pbBogenschützen').checked;
  var SendKavallerie = document.getElementById('pbKavallerie').checked;
  var SendSchwereKavallerie = document.getElementById('pbSchwereKavallerie').checked;
  var SendVersorgungswagen = document.getElementById('pbVersorgungswagen').checked;
  var SendBallisten = document.getElementById('pbBallisten').checked;
  var SendRammbock = document.getElementById('pbRammbock').checked;
  var SendSteinschleuder = document.getElementById('pbSteinschleuder').checked;
  var Versorgungstruppe = document.getElementById('pbtargetVersorgungstruppe').value;
  var Milizsoldat = document.getElementById('pbtargetMilizsoldat').value;
  var Späher = document.getElementById('pbtargetSpäher').value;
  var Lanzenträger = document.getElementById('pbtargetLanzenträger').value;
  var Schwertkämpfer = document.getElementById('pbtargetSchwertkämpfer').value;
  var Bogenschützen = document.getElementById('pbtargetBogenschützen').value;
  var Kavallerie = document.getElementById('pbtargetKavallerie').value;
  var SchwereKavallerie = document.getElementById('pbtargetSchwereKavallerie').value;
  var Versorgungswagen = document.getElementById('pbtargetVersorgungswagen').value;
  var Ballisten = document.getElementById('pbtargetBallisten').value;
  var Rammbock = document.getElementById('pbtargetRammbock').value;
  var Steinschleuder = document.getElementById('pbtargetSteinschleuder').value;
  var target_x = document.getElementById('ptcityX').value;
  var target_y = document.getElementById('ptcityY').value;
    
  var lRE = t.reassignRoutes;
    lRE.push({
    city:        city,
    target_x:      target_x,
    target_y:      target_y,
    SendVersorgungstruppe:  SendVersorgungstruppe,
    Versorgungstruppe:    Versorgungstruppe,
    SendMilizsoldat:    SendMilizsoldat,
    Milizsoldat:      Milizsoldat,
    SendSpäher:      SendSpäher,
    Späher:        Späher,
    SendLanzenträger:     SendLanzenträger,
    Lanzenträger:       Lanzenträger,
    SendSchwertkämpfer:    SendSchwertkämpfer,
    Schwertkämpfer:      Schwertkämpfer,
    SendBogenschützen:    SendBogenschützen,
    Bogenschützen:      Bogenschützen,
    SendKavallerie:     SendKavallerie,
    Kavallerie:       Kavallerie,
    SendSchwereKavallerie:  SendSchwereKavallerie,
    SchwereKavallerie:    SchwereKavallerie,
    SendVersorgungswagen:  SendVersorgungswagen,
    Versorgungswagen:    Versorgungswagen,
    SendBallisten:     SendBallisten,
    Ballisten:       Ballisten,
    SendRammbock:  SendRammbock,
    Rammbock:    Rammbock,
    SendSteinschleuder:    SendSteinschleuder,
    Steinschleuder:      Steinschleuder,
    });
  document.getElementById('pbReassignDivD').style.background ='#99FF99';
  setTimeout(function(){ (document.getElementById('pbReassignDivD').style.background =''); }, 1000);
  },
  showReassignRoutes: function () {
  var t = Tabs.Reassign;
  var popReassignRoutes = null;
  t.popReassignRoutes = new CPopup('pbShowTrade', 0, 0, 1100, 500, true, function() {clearTimeout (1000);});
  var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowReassignRoutes" id="pbRoutesQueue">';       
  t.popReassignRoutes.getMainDiv().innerHTML = '</table></div>' + m;
  t.popReassignRoutes.getTopDiv().innerHTML = '<TD><B>Rotte delle truppe da riassegnare:</b></td>';
  t.paintReassignRoutes();
  t._addTabHeader();
  t.popReassignRoutes.show(true)  ;
  },
  paintReassignRoutes: function(){
      var t = Tabs.Reassign;
      var r = t.reassignRoutes;
      var cityname;
    for (var i = (r.length-1); i>=0; i--) {
    for (var y=0; y< Seed.cities.length;y++) {
      if ( parseInt(Seed.cities[y][0]) == r[i].city) var cityname = Seed.cities[y][1];
    }    
    var queueId = i;
    t._addTab(queueId,cityname, r[i].target_x, r[i].target_y, r[i].SendVersorgungstruppe,r[i].Versorgungstruppe, r[i].SendMilizsoldat, r[i].Milizsoldat, r[i].SendSpäher, r[i].Späher, r[i].SendLanzenträger, r[i].Lanzenträger, r[i].SendSchwertkämpfer, r[i].Schwertkämpfer, r[i].SendBogenschützen, r[i].Bogenschützen, r[i].SendKavallerie, r[i].Kavallerie, r[i].SendSchwereKavallerie, r[i].SchwereKavallerie, r[i].SendVersorgungswagen, r[i].Versorgungswagen, r[i].SendBallisten, r[i].Ballisten, r[i].SendRammbock, r[i].Rammbock, r[i].SendSteinschleuder, r[i].Steinschleuder);
      }
    },
  
   _addTab: function(queueId,cityname,target_x,target_y,SendVersorgungstruppe,Versorgungstruppe,SendMilizsoldat,Milizsoldat,SendSpäher,Späher,SendLanzenträger,Lanzenträger,SendSchwertkämpfer,Schwertkämpfer,SendBogenschützen,Bogenschützen,SendKavallerie,Kavallerie,SendSchwereKavallerie,SchwereKavallerie,SendVersorgungswagen,Versorgungswagen,SendBallisten,Ballisten,SendRammbock,Rammbock,SendSteinschleuder,Steinschleuder){
   var t = Tabs.Reassign;
     var row = document.getElementById('pbRoutesQueue').insertRow(0);
     row.vAlign = 'top';
     row.insertCell(0).innerHTML = queueId;
     row.insertCell(1).innerHTML = cityname;
     row.insertCell(2).innerHTML = target_x + ',' + target_y;
     row.insertCell(3).innerHTML = SendVersorgungstruppe;
     row.insertCell(4).innerHTML = addCommas(Versorgungstruppe);
     row.insertCell(5).innerHTML = SendMilizsoldat;
     row.insertCell(6).innerHTML = addCommas(Milizsoldat);
    row.insertCell(7).innerHTML = SendSpäher;
    row.insertCell(8).innerHTML = addCommas(Späher);
    row.insertCell(9).innerHTML = SendLanzenträger;
    row.insertCell(10).innerHTML = addCommas(Lanzenträger);
    row.insertCell(11).innerHTML = SendSchwertkämpfer;
    row.insertCell(12).innerHTML = addCommas(Schwertkämpfer);
    row.insertCell(13).innerHTML = SendBogenschützen;
    row.insertCell(14).innerHTML = addCommas(Bogenschützen);
    row.insertCell(15).innerHTML = SendKavallerie;
    row.insertCell(16).innerHTML = addCommas(Kavallerie);
    row.insertCell(17).innerHTML = SendSchwereKavallerie;
    row.insertCell(18).innerHTML = addCommas(SchwereKavallerie);
    row.insertCell(19).innerHTML = SendVersorgungswagen;
    row.insertCell(20).innerHTML = addCommas(Versorgungswagen);
    row.insertCell(21).innerHTML = SendBallisten;
    row.insertCell(22).innerHTML = addCommas(Ballisten);
    row.insertCell(23).innerHTML = SendRammbock;
    row.insertCell(24).innerHTML = addCommas(Rammbock);
    row.insertCell(25).innerHTML = SendSteinschleuder;
    row.insertCell(26).innerHTML = addCommas(Steinschleuder);
     row.insertCell(27).innerHTML = '<a class="button20" id="tradecancel_' + queueId + '"><span>Cancella</span></a>';
     document.getElementById('tradecancel_' + queueId).addEventListener('click', function(){
      t.cancelQueueElement(queueId);
     }, false);
   },
   
   _addTabHeader: function() {
   var t = Tabs.Reassign;
     var row = document.getElementById('pbRoutesQueue').insertRow(0);
     row.vAlign = 'top';
     row.insertCell(0).innerHTML = "Numero";
     row.insertCell(1).innerHTML = "Da";
     row.insertCell(2).innerHTML = "A";
     row.insertCell(3).innerHTML = "Truppe di rifornimento";
     row.insertCell(4).innerHTML = "";
     row.insertCell(5).innerHTML = "Soldati semplici";
     row.insertCell(6).innerHTML = "";
    row.insertCell(7).innerHTML = "Esploratori";
     row.insertCell(8).innerHTML = "";
     row.insertCell(9).innerHTML = "Lancieri";
     row.insertCell(10).innerHTML = "";
     row.insertCell(11).innerHTML = "Spade";
     row.insertCell(12).innerHTML = "";
     row.insertCell(13).innerHTML = "Arcieri";
     row.insertCell(14).innerHTML = "";
     row.insertCell(15).innerHTML = "Cav. leggera";
     row.insertCell(16).innerHTML = "";
     row.insertCell(17).innerHTML = "Cav. Pesanti";
     row.insertCell(18).innerHTML = "";
     row.insertCell(19).innerHTML = "Carri di rifornimento";
     row.insertCell(20).innerHTML = "";
     row.insertCell(21).innerHTML = "Baliste";
     row.insertCell(22).innerHTML = "";
     row.insertCell(23).innerHTML = "Arieti";
     row.insertCell(24).innerHTML = "";
     row.insertCell(25).innerHTML = "Catapulte";
     row.insertCell(26).innerHTML = "";
     row.insertCell(27).innerHTML = "Cancella";
   },   
   
   cancelQueueElement: function(queueId){
     var t = Tabs.Reassign;
     var queueId = parseInt(queueId);
     t.reassignRoutes.splice(queueId, 1);
     t.showReassignRoutes();
   },
   
  saveReassignRoutes: function(){
  var t = Tabs.Reassign;
    var serverID = getServerId();
    GM_setValue('reassignRoutes_' + serverID, JSON2.stringify(t.reassignRoutes));
  },
  readReassignRoutes: function(){
    var t = Tabs.Reassign;
    var serverID = getServerId();
    s = GM_getValue('reassignRoutes_' + serverID);
    if (s != null) {
      route = JSON2.parse(s);
      for (k in route)
        t.reassignRoutes[k] = route[k];
    }
  },
  saveReassignState: function(){
  var t = Tabs.Reassign;
    var serverID = getServerId();
    GM_setValue('reassignState_' + serverID, JSON2.stringify(t.reassignState));
  },
  readReassignState: function(){
    var t = Tabs.Reassign;
    var serverID = getServerId();
    s = GM_getValue('reassignState_' + serverID);
    if (s != null) {
      state = JSON2.parse(s);
      for (k in state)
        t.reassignState[k] = state[k];
    }
  },
  toggleReassignState: function(obj){
  var t = Tabs.Reassign;
    if (t.reassignState.running == true) {
      t.reassignState.running = false;
      obj.value = "Auto riassegna = NO";
   t.checkdoreassigntimeout = null;
    t.count = 0;
    }
    else {
      t.reassignState.running = true;
      obj.value = "Auto riassegna = SI";
    t.e_reassignRoutes();
    }
  },
  
  checkdoReassign: function(){
  var t = Tabs.Reassign;
  t.doReassign(t.count);
  t.count++;
  if(t.count < t.reassignRoutes.length && t.reassignState.running){
    t.checkdoreassigntimeout = setTimeout(function() { t.checkdoReassign();}, 5000);
  } else {
    var now = new Date().getTime()/1000.0;
    now = now.toFixed(0);
    Options.lastreassign = now;
    saveOptions();  
    t.count = 0;
  }
  },
  
  doReassign: function(count){
    var t = Tabs.Reassign;
     var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
     if(t.reassignRoutes.length==0) return;
     var send=[];
     var citytotal=0;
     var totalsend=0;
  params.u1 = 0;
  params.u2 = 0;
  params.u3 = 0;
  params.u4 = 0;
  params.u5 = 0;
  params.u6 = 0;
  params.u7 = 0;
  params.u8 = 0;
  params.u9 = 0;
  params.u10 = 0;
  params.u11 = 0;
  params.u12 = 0;  
    
    var city = t.reassignRoutes[count]["city"];
    var xcoord = t.reassignRoutes[count]["target_x"];
    var ycoord = t.reassignRoutes[count]["target_y"];
    
    var cityID = 'city' + city;
    var marching = getMarchInfo2(cityID);
    t.getRallypoint(cityID);
  if(t.rallypointlevel == 11) t.rallypointlevel = 15;
    var maxsend = (t.rallypointlevel * 10000);
    totalsend=0;
    
    var troopsselect=["Truppe di rifornimento:","Soldati semplici","Esploratori","Lancieri","Spadaccini","Arcieri","Cav. leggera","Cav. pesante","Carri di rifornimento","Baliste","Arieti","Catapulte"];
      for (k=0; k<troopsselect.length; k++) {
      var citytroops = Seed.units[cityID]['unt'+(parseInt(k)+1)];
      var marchtroops = marching.marchUnits[parseInt(k)+1];
      citytotal = parseInt(citytroops) + parseInt(marchtroops);
      //alert(citytotal + ' > ' + t.reassignRoutes[count][troopsselect[k]] + ' - ' + totalsend + ' <= ' + maxsend + ' - ' + t.reassignRoutes[count]['Send'+troopsselect[k]]);
      //if(k== 5) GM_log(citytotal +'  ' + t.reassignRoutes[count][troopsselect[k]]);
      if(t.reassignRoutes[count]['Send'+troopsselect[k]]==false) {continue; }
      if(citytotal > t.reassignRoutes[count][troopsselect[k]]){
        var sendtroops = parseInt(citytotal) - parseInt(t.reassignRoutes[count][troopsselect[k]]);
        if (parseInt(sendtroops) > parseInt(citytroops)) sendtroops = citytroops;
        if (parseInt(sendtroops) < 0) sendtroops = 0;
        send[(parseInt(k)+1)] = sendtroops;
        totalsend += send[(parseInt(k)+1)];
        //alert(parseInt(k)+1 + ' - ' + citytotal+ ' : ' + troopsselect[k] + ' / ' + t.reassignRoutes[0][troopsselect[k]]);          
        
      }
      if(totalsend > maxsend){
        totalsend -= send[(parseInt(k)+1)];
        send[(parseInt(k)+1)] = parseInt(maxsend-totalsend);
        totalsend += send[(parseInt(k)+1)];
        break;
      }
   
     }
    
    for (var t=0; t< Seed.cities.length;t++) {
    if ( parseInt(Seed.cities[t][0]) == city) var cityname = Seed.cities[t][1];
    }
    
    params.cid= city;
  params.type = "5";
  params.kid=0;
  params.xcoord = xcoord;
  params.ycoord = ycoord;
  params.u1 = send[1];
  params.u2 = send[2];
  params.u3 = send[3];
  params.u4 = send[4];
  params.u5 = send[5];
  params.u6 = send[6];
  params.u7 = send[7];
  params.u8 = send[8];
  params.u9 = send[9];
  params.u10 = send[10];
  params.u11 = send[11];
  params.u12 = send[12];  
  
     if (totalsend >0) {
      
      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
          method: "post",
          parameters: params,
          loading: true,
          onSuccess: function (transport) {
          var rslt = eval("(" + transport.responseText + ")");
          if (rslt.ok) {
          actionLog('Riassegna in automatico da ' + cityname + "  a: " + xcoord + ',' + ycoord + "    ->  Truppe " + totalsend);
          var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
          var ut = unsafeWindow.unixtime();
          var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
              for(i = 0; i <= unitsarr.length; i++){
                if(params["u"+i]){
                  unitsarr[i] = params["u"+i];
                }
              }
          var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
          var currentcityid = city;
          unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
          if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
          } else {
          actionLog('Neu zuordnen: ' + cityname);
          actionLog('NZ Meldung: - ' + rslt.error_code + ' -  ' + rslt.msg + ' -  ' + rslt.feedback);
          //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
          }
          },
          onFailure: function () {}
      });
    }      
  },
  
  show: function(){
  var t = Tabs.Reassign;
   mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },
  hide: function(){
    var t = Tabs.Reassign;
     mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },
  onUnload: function(){
    var t = Tabs.Reassign;
    t.saveReassignRoutes();
  t.saveReassignState();
    
  },
}

/************************  Reinforce Tab ************************/
Tabs.Reinforce = {
  tabLabel: 'Rinforza',
  tabOrder: toVerstaerken,
  myDiv: null,
  cityID: null,
  rallypointlevel:null,
  maxsend:0,
  dist:0,
  ETAstr:null,
  ETAType:null,
  checkETA:null,

    init: function(div){
var t = Tabs.Reinforce;
        t.myDiv = div;


      var m = '<DIV id=pbReinfMain class=pdxStat2>RINFORZA</div><TABLE id=pireinforce width=100% height=0% class=pdxTab><TR align="center">';
    m += '<TABLE id=pbReinf width=95% height=0% class=pdxTab><TR align="left"><tr>';
        m += '<td width="70"><b>Città</b>:</td><td width="263"><DIV style="margin-bottom:10px;"><span id=ptRfcityFrom></span></div></td>';
    m += '<td width="14">&nbsp;</td><td><center><b>Cavaliere</b></center></td>';
    m += '<td><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/building_icons/build_knightshall.png" width="32" height="32"></td>';
    m += '<td colspan="2"><SELECT id=piKnight type=list></SELECT></td></tr><tr>';
    m += '<td><b>Città principale</b>:</td><td><DIV style="margin-bottom:10px;"><span id=ptRfcityTo></span></div></td><td>&nbsp;</td>';
    m += '<td colspan="2"><center><u>oppure</u> <b>manda a queste coordinate:</b></center></td>';
    m += '<td width="96">X: <INPUT id=pfToX type=text size=3\></td>';
    m += '<td width="272">Y: <INPUT id=pfToY type=text size=3\></td></tr><tr>';
    m += '<td height="30">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
    m += '<td width="121"><center><b>Manda cibo</b></center></td><td width="32"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td>';
    m += '<td colspan="2"><INPUT id=pisendfood type=text size=11 maxlength=11 value="0"\> <INPUT id=MaxFood type=submit value="Max"></td>';
    m += '</tr></table>';

    m += '<TR id=pbReinfETA class=pdxTab ><TR  align="left"><TABLE id=pbReinfETA width=95% height=0% class=pdxTab>';
    m += '<TR align="left"><TD><DIV id=pbdistance><b>Distanza</b>: Selezionare le truppe per sapere la distanza</div></td>';
    m += '<TR align="left"><TD ><DIV id=pbETA><b>ETA</b>: Selezionare le truppe per sapere il tempo di arrivo</div></td></table>';

    m += '<TABLE id=pbReinfETA2 width=95% height=0% class=pdxTab><TR align="center">';

    m += '<TD><INPUT id=piDoreinforce type=submit value="RINFORZA!"></td></table>';
    m += '<TR  align="center"><span style=\"font-size:10px; color:#555; line-height:18px; \"><font color=#600000><B><u>ATTENZIONE</u></b></font>: ETA = <i>tempo stimato all\' arrivo</i></span><BR>';

        m += '<TABLE id=pbaddreinfroute width=100% height=0% class=pdxTab><TR align="center">';
        m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
        m += '<TD>Truppe di rifornimento:</td>'
        m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
        m += '<TD>Soldati semplici</td>'
        m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
        m += '<TD>Esploratori</td>'
        m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
        m += '<TD>Lancieri</td></tr>'
        m += '<TR><TD><INPUT id=pitargetSupplyTroops type=text size=6 maxlength=6 value="0"\><INPUT id=MaxSupplyTroops type=submit value="Max"></td>';
        m += '<TD><INPUT id=pitargetMilitiaman type=text size=6 maxlength=6 value="0"\><INPUT id=MaxMilitiaman type=submit value="Max"></td>';
        m += '<TD><INPUT id=pitargetScout type=text size=6 maxlength=6 value="0"\><INPUT id=MaxScout type=submit value="Max"></td>';
        m += '<TD><INPUT id=pitargetPikeman type=text size=6 maxlength=6 value="0"\><INPUT id=MaxPikeman type=submit value="Max"></td></tr>';
         
        m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
        m += '<TD>Spadaccini</td>'
        m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
        m += '<TD>Arcieri</td>'
        m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
        m += '<TD>Cav. leggera</td>'
        m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
        m += '<TD>Cav. pesante</td></tr>'
        m += '<TR><TD><INPUT id=pitargetSwordsman type=text size=6 maxlength=6 value="0"\><INPUT id=MaxSwordsman type=submit value="Max"></td>';
        m += '<TD><INPUT id=pitargetArcher type=text size=6 maxlength=6 value="0"\><INPUT id=MaxArcher type=submit value="Max"></td>';
        m += '<TD><INPUT id=pitargetCavalry type=text size=6 maxlength=6 value="0"\><INPUT id=MaxCavalry type=submit value="Max"></td>';
        m += '<TD><INPUT id=pitargetHeavyCavalry type=text size=6 maxlength=6 value="0"\><INPUT id=MaxHeavyCavalry type=submit value="Max"></td></tr>';
        
        m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
        m += '<TD>Carri di rifornimento</td>'

        m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
        m += '<TD>Baliste</td>'
        m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
        m += '<TD>Arieti</td>'
        m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
        m += '<TD>Catapulte</td></tr>'
        m += '<TR><TD><INPUT id=pitargetSupplyWagon type=text size=6 maxlength=6 value="0"\><INPUT id=MaxSupplyWagon type=submit value="Max"></td>';
        m += '<TD><INPUT id=pitargetBallista type=text size=6 maxlength=6 value="0"\><INPUT id=MaxBallista type=submit value="Max"></td>';
        m += '<TD><INPUT id=pitargetBatteringRam type=text size=6 maxlength=6 value="0"\><INPUT id=MaxBatteringRam type=submit value="Max"></td>';
    m += '<TD><INPUT id=pitargetCatapult type=text size=6 maxlength=6 value="0"\><INPUT id=MaxCatapult type=submit value="Max"></td></tr></table>';
      
    t.myDiv.innerHTML = m;
      
      
      t.from = new CdispCityPicker ('prfrom', document.getElementById('ptRfcityFrom'), true, t.clickCitySelect, 0);
      t.to = new CdispCityPicker ('ptto', document.getElementById('ptRfcityTo'), true, t.clickCitySelect,0);
      
    t.getKnights();
  
      document.getElementById('pfToX').value = t.to.city.x;
      document.getElementById('pfToY').value = t.to.city.y;
      
document.getElementById('ptRfcityTo').addEventListener('click', function(){
  document.getElementById('pfToX').value = t.to.city.x;
     document.getElementById('pfToY').value = t.to.city.y;
  }, false);
          
     document.getElementById('ptRfcityFrom').addEventListener('click', function(){
     t.getKnights();
        t.clearbox();
        t.dist = distance (t.from.city.x, t.from.city.y, document.getElementById('pfToX').value, document.getElementById('pfToY').value);
    document.getElementById('pbdistance').innerHTML = ('<b>Distanza</b>: '+t.dist);
    t.SetETAType();
    t.ETA(t.dist);
    document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      document.getElementById('ptRfcityTo').addEventListener('click', function(){
       t.dist = distance (t.from.city.x, t.from.city.y, document.getElementById('pfToX').value, document.getElementById('pfToY').value);
          document.getElementById('pbdistance').innerHTML = ('<b>Distanza</b>: '+t.dist);
          t.ETA(t.dist);
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      
      document.getElementById('pfToX').addEventListener('keyup', function(){
       t.dist = distance (t.from.city.x, t.from.city.y, document.getElementById('pfToX').value, document.getElementById('pfToY').value);
       document.getElementById('pbdistance').innerHTML = ('<b>Distanza</b>: '+t.dist);
       t.ETA(t.dist);
       document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      document.getElementById('pfToY').addEventListener('keyup', function(){
       t.dist = distance (t.from.city.x, t.from.city.y, document.getElementById('pfToX').value, document.getElementById('pfToY').value);
       document.getElementById('pbdistance').innerHTML = ('<b>Distanza</b>: '+t.dist);
       t.ETA(t.dist);
       document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      document.getElementById('piDoreinforce').addEventListener('click', function(){
      t.doReinforce();
      }, false);
      
     document.getElementById('MaxFood').addEventListener('click', function(){
     var maxfood =0;
     var featherweight = parseInt(Seed.tech.tch10);
     maxfood += ( (200 + (200/10*featherweight)) * parseInt(document.getElementById('pitargetSupplyTroops').value));
     maxfood += ( (20 + (20/10*featherweight)) *parseInt(document.getElementById('pitargetMilitiaman').value));
     maxfood += ( (5 + (5/10*featherweight)) *parseInt(document.getElementById('pitargetScout').value));
     maxfood += ((40 + (40/10*featherweight))*parseInt(document.getElementById('pitargetPikeman').value));
     maxfood += ( (30 + (30/10*featherweight))*parseInt(document.getElementById('pitargetSwordsman').value));
     maxfood += ((25 + (25/10*featherweight))*parseInt(document.getElementById('pitargetArcher').value));
     maxfood += ((100 + (100/10*featherweight))*parseInt(document.getElementById('pitargetCavalry').value));
     maxfood += (80*parseInt(document.getElementById('pitargetHeavyCavalry').value));
     maxfood += ((5000 + (5000/10*featherweight))*parseInt(document.getElementById('pitargetSupplyWagon').value));
     maxfood += ((35 + (35/10*featherweight))*parseInt(document.getElementById('pitargetBallista').value));
     maxfood += ((45 + (45/10*featherweight))*parseInt(document.getElementById('pitargetBatteringRam').value));
     maxfood += ((75 + (75/10*featherweight))*parseInt(document.getElementById('pitargetCatapult').value));
     document.getElementById('pisendfood').value = maxfood;
     }, false);
         
      document.getElementById('MaxSupplyTroops').addEventListener('click', function(){
      t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetSupplyTroops').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+1]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+1]);
      document.getElementById('pitargetSupplyTroops').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      document.getElementById('MaxMilitiaman').addEventListener('click', function(){
      t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetMilitiaman').value == 0) t.maxsend = t.maxsend - othertroops;
          
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+2]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+2]);
      document.getElementById('pitargetMilitiaman').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      document.getElementById('MaxScout').addEventListener('click', function(){
      t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetScout').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+3]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+3]);
      document.getElementById('pitargetScout').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
 
    document.getElementById('MaxPikeman').addEventListener('click', function(){
    t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetPikeman').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+4]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+4]);
      document.getElementById('pitargetPikeman').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
    }, false);
    
    document.getElementById('MaxSwordsman').addEventListener('click', function(){
    t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetSwordsman').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+5]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+5]);
      document.getElementById('pitargetSwordsman').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
    }, false);
    
    document.getElementById('MaxArcher').addEventListener('click', function(){
    t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetArcher').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+6]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+6]);
      document.getElementById('pitargetArcher').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
    }, false);
    
    document.getElementById('MaxCavalry').addEventListener('click', function(){
    t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetCavalry').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+7]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+7]);
      document.getElementById('pitargetCavalry').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
    }, false);
    
    document.getElementById('MaxHeavyCavalry').addEventListener('click', function(){
    t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetHeavyCavalry').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+8]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+8]);
      document.getElementById('pitargetHeavyCavalry').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
    }, false);
    
    document.getElementById('MaxSupplyWagon').addEventListener('click', function(){
    t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetSupplyWagon').value == 0) t.maxsend = t.maxsend - othertroops;
           if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+9]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+9]);
      document.getElementById('pitargetSupplyWagon').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
    }, false);
    
    document.getElementById('MaxBallista').addEventListener('click', function(){
    t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetBallista').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+10]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+10]);
      document.getElementById('pitargetBallista').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
    }, false);
    
    document.getElementById('MaxBatteringRam').addEventListener('click', function(){
    t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetBatteringRam').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+11]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+11]);
      document.getElementById('pitargetBatteringRam').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
    }, false);
    
    document.getElementById('MaxCatapult').addEventListener('click', function(){
    t.maxsend = (t.rallypointlevel * 10000);
      var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetCatapult').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+12]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+12]);
      document.getElementById('pitargetCatapult').value = t.maxsend;
      t.SetETAType();
      t.ETA(t.dist);
      document.getElementById('pbETA').innerHTML = (t.ETAstr);
    }, false);
    
      document.getElementById('pitargetSupplyTroops').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetSupplyTroops').value)) document.getElementById('pitargetSupplyTroops').value=0 ;
          t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetMilitiaman').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetMilitiaman').value)) document.getElementById('pitargetMilitiaman').value=0 ;
          t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetScout').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetScout').value)) document.getElementById('pitargetScout').value=0 ;
          t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetPikeman').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetPikeman').value)) document.getElementById('pitargetPikeman').value=0 ;
          t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetSwordsman').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetSwordsman').value)) document.getElementById('pitargetSwordsman').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetArcher').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetArcher').value)) document.getElementById('pitargetArcher').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetCavalry').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetCavalry').value)) document.getElementById('pitargetCavalry').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetHeavyCavalry').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetHeavyCavalry').value)) document.getElementById('pitargetHeavyCavalry').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetSupplyWagon').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetSupplyWagon').value)) document.getElementById('pitargetSupplyWagon').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetBallista').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetBallista').value)) document.getElementById('pitargetBallista').value=0 ;
         t.SetETAType();

          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
     document.getElementById('pitargetBatteringRam').addEventListener('keyup', function(){
         if (isNaN(document.getElementById('pitargetBatteringRam').value)) document.getElementById('pitargetBatteringRam').value=0 ;
        t.SetETAType();
         document.getElementById('pbETA').innerHTML = (t.ETAstr);
     }, false);
     document.getElementById('pitargetCatapult').addEventListener('keyup', function(){
         if (isNaN(document.getElementById('pitargetCatapult').value)) document.getElementById('pitargetCatapult').value=0 ;
        t.SetETAType();
         document.getElementById('pbETA').innerHTML = (t.ETAstr);
     }, false);

        
      window.addEventListener('unload', t.onUnload, false);
    },
    
    getKnights : function(){
       var t = Tabs.Reinforce;
       var knt = new Array();
       //t.rallypointlevel = getRallyPointLevel('city' +t.from.city.id, true);
       t.getRallypoint('city' +t.from.city.id);
       for (k in Seed.knights['city' + t.from.city.id]){
       if (Seed.knights['city' + t.from.city.id][k]["knightStatus"] == 1 && Seed.leaders['city' + t.from.city.id]["resourcefulnessKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["politicsKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["combatKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["intelligenceKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"]){
       knt.push ({
       Name:   Seed.knights['city' + t.from.city.id][k]["knightName"],
       Combat: Seed.knights['city' + t.from.city.id][k]["combat"],
       ID: Seed.knights['city' + t.from.city.id][k]["knightId"],
       });
       }
       }
       knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
       document.getElementById('piKnight').options.length=0;
var o = document.createElement("option");
o.text = '-- Scegli un cavaliere libero --';
o.value = 0;
document.getElementById("piKnight").options.add(o);
       for (k in knt){
    if (knt[k]["Name"] !=undefined){
    var o = document.createElement("option");
    o.text = (knt[k]["Name"] + ' (' + knt[k]["Combat"] +')')
    o.value = knt[k]["ID"];
    document.getElementById("piKnight").options.add(o);
    }
    }
    },
    
    
    SetETAType :function(){
    var t = Tabs.Reinforce;
    if (document.getElementById('pitargetSupplyTroops').value == 0 ) t.checkETA=null;
    if (document.getElementById('pitargetMilitiaman').value == 0 ) t.checkETA=null;
    if (document.getElementById('pitargetScout').value == 0 ) t.checkETA=null;
    if (document.getElementById('pitargetPikeman').value == 0 ) t.checkETA=null;
    if (document.getElementById('pitargetSwordsman').value == 0 ) t.checkETA=null;
    if (document.getElementById('pitargetArcher').value == 0 ) t.checkETA=null;
    if (document.getElementById('pitargetCavalry').value == 0 ) t.checkETA=null;
    if (document.getElementById('pitargetHeavyCavalry').value == 0 ) t.checkETA=null;
    if (document.getElementById('pitargetSupplyWagon').value == 0 )t.checkETA=null;
    if (document.getElementById('pitargetBallista').value == 0 ) t.checkETA=null;
    if (document.getElementById('pitargetBatteringRam').value == 0 ) t.checkETA=null;
    if (document.getElementById('pitargetCatapult').value == 0 ) t.checkETA=null;
    if (t.checkETA==null) t.ETAType=null;
    t.ETA(t.dist);
    if (document.getElementById('pitargetSupplyTroops').value >0 ) {t.ETAType="0,180";t.ETA(t.dist);}
    if (document.getElementById('pitargetMilitiaman').value >0 ) {t.ETAType="0,200";t.ETA(t.dist);}
    if (document.getElementById('pitargetScout').value >0 ) {t.ETAType="0,3000";t.ETA(t.dist);}
    if (document.getElementById('pitargetPikeman').value >0 ) {t.ETAType="0,300";t.ETA(t.dist);}
    if (document.getElementById('pitargetSwordsman').value >0 ) {t.ETAType="0,275";t.ETA(t.dist);}
    if (document.getElementById('pitargetArcher').value >0 ) {t.ETAType="0,250";t.ETA(t.dist);}
    if (document.getElementById('pitargetCavalry').value >0 ) {t.ETAType="1,1000";t.ETA(t.dist);}
    if (document.getElementById('pitargetHeavyCavalry').value >0 ) {t.ETAType="1,750";t.ETA(t.dist);}
    if (document.getElementById('pitargetSupplyWagon').value >0 ) {t.ETAType="1,150";t.ETA(t.dist);}
    if (document.getElementById('pitargetBallista').value >0 ) {t.ETAType="1,100";t.ETA(t.dist);}
    if (document.getElementById('pitargetBatteringRam').value >0 ) {t.ETAType="1,120";t.ETA(t.dist);}
    if (document.getElementById('pitargetCatapult').value >0 ) {t.ETAType="1,80";t.ETA(t.dist);}
    },
    
    
    getRallypoint: function(cityId){
      var t = Tabs.Reinforce;
      for (var k in Seed.buildings[cityId]){
           var buildingType  = parseInt(Seed.buildings[cityId][k][0]);
           var buildingLevel = parseInt(Seed.buildings[cityId][k][1]);
         var buildingName = unsafeWindow.buildingcost['bdg' + buildingType][0];
         if (buildingName == "Rally Point" || buildingName == "Punto di riunione") t.rallypointlevel=buildingLevel;
      }
     if(t.rallypointlevel == 11) t.rallypointlevel = 15;
     t.maxsend = (t.rallypointlevel * 10000);   
 },
 
 clearbox: function(){
      var t = Tabs.Reinforce;
      document.getElementById('pitargetSupplyTroops').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+1]) == 0) document.getElementById('pitargetSupplyTroops').disabled = true;
      else document.getElementById('pitargetSupplyTroops').disabled = false;  
      document.getElementById('pitargetMilitiaman').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+2]) == 0) document.getElementById('pitargetMilitiaman').disabled = true;
      else document.getElementById('pitargetMilitiaman').disabled = false;     
      document.getElementById('pitargetScout').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+3]) == 0) document.getElementById('pitargetScout').disabled = true;
      else document.getElementById('pitargetScout').disabled = false;
      document.getElementById('pitargetPikeman').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+4]) == 0) document.getElementById('pitargetPikeman').disabled = true;
      else document.getElementById('pitargetPikeman').disabled = false;
      document.getElementById('pitargetSwordsman').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+5]) == 0) document.getElementById('pitargetSwordsman').disabled = true;
      else document.getElementById('pitargetSwordsman').disabled = false;
      document.getElementById('pitargetArcher').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+6]) == 0) document.getElementById('pitargetArcher').disabled = true;
      else document.getElementById('pitargetArcher').disabled = false;
      document.getElementById('pitargetCavalry').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+7]) == 0) document.getElementById('pitargetCavalry').disabled = true;
      else document.getElementById('pitargetCavalry').disabled = false;
      document.getElementById('pitargetHeavyCavalry').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+8]) == 0) document.getElementById('pitargetHeavyCavalry').disabled = true;
      else document.getElementById('pitargetHeavyCavalry').disabled = false;
      document.getElementById('pitargetSupplyWagon').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+9]) == 0) document.getElementById('pitargetSupplyWagon').disabled = true;
      else document.getElementById('pitargetSupplyWagon').disabled = false;
      document.getElementById('pitargetBallista').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+10]) == 0) document.getElementById('pitargetBallista').disabled = true;
      else document.getElementById('pitargetBallista').disabled = false;
      document.getElementById('pitargetBatteringRam').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+11]) == 0) document.getElementById('pitargetBatteringRam').disabled = true;
      else document.getElementById('pitargetBatteringRam').disabled = false;
      document.getElementById('pitargetCatapult').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+12]) == 0) document.getElementById('pitargetCatapult').disabled = true;
      else document.getElementById('pitargetCatapult').disabled = false;
          
 },
 
  ETA : function(dist) { // Need Relief Station Levels to estimate transport, reinf, or reassign times.
   var t = Tabs.Reinforce;
   t.cityID = t.from.city.id;
   if (dist == 0) {t.ETAstr = "<b>ETA</b>: La distanza è 0!";return;}
   if (t.ETAType == null) {t.ETAstr = "<b>ETA</b>: Nessuna truppa selezionata!";return;}
   var baseSpeedSel = t.ETAType;
   var m = baseSpeedSel.split(',');
   var horse = parseInt(m[0]);
   var baseSpeed = parseInt(m[1]);
   if (baseSpeed == 0) {t.ETAstr = "<b>ETA</b>: Indefinito!";return;}
   var mmLvl = parseInt(Seed.tech.tch11);//Magical Mapping
   var Speed = 0;
   if (horse){
   //HorsesSiegeSpeed = Base * (1 + MM/10) * (1 + AH/20)
     var hsLvl = parseInt(Seed.tech.tch12);//Alloy Horse Shoes
     Speed = baseSpeed * (1 + mmLvl/10) * (1 + hsLvl/20);
   }
   else {
   //FootSpeed = Base * (1 + MM/10)
     Speed = baseSpeed * (1 + mmLvl/10);
   }
   //Grid Speed (tiles/second) = Speed (100ths/min) / 6000
   var gSpeed = 0;
   var estSec = 0;
   if (Speed>0) {
     gSpeed = Speed/6000;
     estSec = (dist/gSpeed).toFixed(0);
   }
   //RS - Cities Relief Station Level
   //Friendly Speed = Speed * (1 + RS/2)
    var building = getCityBuilding (t.cityID, 18);
    fSpeed = Speed * (1 + parseInt(building.maxLevel)/2);
       gSpeed = fSpeed/6000;
       estSec = (dist/gSpeed).toFixed(0);
       if (t.checkETA == null || t.checkETA < (parseInt((estSec+''))+30)){
       t.ETAstr = '<b>ETA</b>: ' + timestr ((parseInt((estSec+''))+30));
       t.checkETA = (parseInt((estSec+''))+30);
       }
 },
 
  
    doReinforce: function(){
    var t = Tabs.Reinforce;
   var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
   params.r1 = 0;
params.u1 = 0;
params.u2 = 0;
params.u3 = 0;
params.u4 = 0;
params.u5 = 0;
params.u6 = 0;
params.u7 = 0;
params.u8 = 0;
params.u9 = 0;
params.u10 = 0;
params.u11 = 0;
params.u12 = 0;
    
  params.cid= t.from.city.id;
params.type = "2";
params.kid= document.getElementById("piKnight").value;
params.xcoord = document.getElementById('pfToX').value;
params.ycoord = document.getElementById('pfToY').value;
params.u1 = document.getElementById('pitargetSupplyTroops').value;
params.u2 = document.getElementById('pitargetMilitiaman').value;
params.u3 = document.getElementById('pitargetScout').value;
params.u4 = document.getElementById('pitargetPikeman').value;
params.u5 = document.getElementById('pitargetSwordsman').value;
params.u6 = document.getElementById('pitargetArcher').value;
params.u7 = document.getElementById('pitargetCavalry').value;
params.u8 = document.getElementById('pitargetHeavyCavalry').value;
params.u9 = document.getElementById('pitargetSupplyWagon').value;
params.u10 = document.getElementById('pitargetBallista').value;
params.u11 = document.getElementById('pitargetBatteringRam').value;
params.u12 = document.getElementById('pitargetCatapult').value;
params.food = document.getElementById('pisendfood').value;

      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  loading: true,
                  onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                  var ut = unsafeWindow.unixtime();
                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                  for(i = 0; i <= unitsarr.length; i++){
                  if(params["u"+i]){
                  unitsarr[i] = params["u"+i];
                  }
                  }
                  var resources=new Array();
                  resources[0] = params.gold;
                  for(i=1; i<=4; i++){
                  resources[i] = params["r"+i];
                  }
                  var currentcityid = params.cid;
                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                  t.getKnights();
                  t.clearbox();
          document.getElementById('pbReinfMain').style.background ='#99FF99';
           setTimeout(function(){ (document.getElementById('pbReinfMain').style.background =''); }, 1000);
                  } else {
            document.getElementById('pbReinfMain').style.background ='#FF0000';
                setTimeout(function(){ (document.getElementById('pbReinfMain').style.background =''); }, 1000);
                  //actionLog('FAIL :' + cityname + ' - ' + rslt.error_code + ' -  ' + rslt.msg + ' -  ' + rslt.feedback);
                  //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                  }
                  },
                  onFailure: function () {}
          });
           
},


  show: function(){
    var t = Tabs.Reinforce;
     mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
    },
  hide: function(){
        var t = Tabs.Reinforce;
     mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
    },
    onUnload: function(){
    },
}
/********************************* BUILDS TAB *************************************/
Tabs.Builds = {
  tabOrder : toGebaeude,
  tabLabel : 'Città',
  showReq : false,
  	
  init : function (div){
    var t = Tabs.Builds;
    t.cont=div;
	var wall=0;
	var blacksmith=0;
	var fletching=0;
	var geometry = 0;
	var metalalloys = 0;
	var logging = 0;
	var poisonededge = 0;
	
	var buildings = {0:'Schloss',
				  1:'Bauernhof',
				  2:'Sägewerk',
				  3:'Steinbruch',
				  4:'Bergwerk',
				  5:'Hütte',
				  6:'Wirthaus',
				  7:'Rittersaal ',
				  8:'Botschaft',
				  9:'Lagerhaus',
				  10:'Markt',
				  11:'Alchemie-Labor',
				  12:'Versammlungspunkt',
				  13:'Kasernen',
				  14:'Wachturm',
				  15:'Blacksmith',
				  16:'Werkstatt',
				  17:'Stall',
				  18:'Hilfe Station',
				  19:'Mauer'};
	var Research = {1:'Dünger',
				  2:'Holzverarbeitung',
				  3:'Steinhauerei',
				  4:'Bergbau',
				  5:'Geometrie',
				  6:'Adleraugen',
				  8:'Vergiftete Klinge',
				  9:'Metall-Legierungen',
				  10:'Federgewicht-Pulver',
				  11:'Magisches Kartenlesen',
				  12:'Metall-Hufeisen',
				  13:'Befiedern',
				  14:'Schrumpf-Puder',
				  15:'Heiltrank',
				  16:"Stärke des Riesen"};
	var WallSpace = {1:1000,
				  2:3000,
				  3:6000,
				  4:10000,
				  5:15000,
				  6:21000,
				  7:28000,
				  8:36000,
				  9:45000,
				  10:55000,
				  11:66000};
				      
    fletching = Seed.tech['tch13'];
    geometry = Seed.tech['tch5'];
    metalalloys = Seed.tech['tch9'];
    logging = Seed.tech['tch2'];
    poisonededge = Seed.tech['tch8'];
    	
    var m = '<DIV class=pdxStat>HEILIGTUM STATS</div>';
    m += "<DIV id=BuildsDiv style='font-size:12px'><TABLE class=ptBuilds border=1px cellpadding=5 cellspacing=0><TR valign=top align=right>";
    m += "<TD align=left width=85><INPUT id=showReq type=checkbox " + (t.showReq?'CHECKED ':'') +">Bedingungen</td>";
    for(i=0; i<Cities.numCities; i++) {
      m += "<TD width=79><B>"+ Cities.cities[i].name.substring(0,11) +"</b><BR>"+ coordLink(Cities.cities[i].x, Cities.cities[i].y) +"<BR></td>";
    }
    
    m+='<TR valign=top align=right><TD>Balestre</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1]; 
    	}
    	max = WallSpace[wall]/2/2 - parseInt(Seed.fortifications[city]["fort53"]) - parseInt(Seed.fortifications[city]["fort55"]);
    	m+= '<TD>' + Seed.fortifications[city]["fort53"];
    	if (wall >=6 && blacksmith >=6 && fletching >=5 && max > 0) m+= '<br>Plätze: ' + max +'</td>';
    	else if (t.showReq){
   			if (wall < 6) m+= '<br><FONT COLOR= "CC0000">Mauer: ' + wall + '(6)</font>';
   			if (blacksmith < 6) m+= '<br><FONT COLOR= "CC0000">Schmied.: ' + blacksmith + '(6)</font>';
   			if (fletching < 5) m+= '<br><FONT COLOR= "CC0000">Befl.: ' + fletching + '(5)</font>';
   			m+='</td>';
   		} 		
    }
    m+='</tr><TR valign=top align=right><TD>Trabucchi</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1]; 
    	}
    	max = WallSpace[wall]/2/4 - parseInt(Seed.fortifications[city]["fort53"]) - parseInt(Seed.fortifications[city]["fort55"]);
    	m+=  '<TD>' +Seed.fortifications[city]["fort55"];
    	if (wall >=8 && blacksmith >=8 && fletching >=7 && geometry>=7 && max > 0) m+= '<br>Plätze: ' + max+'</td>';
    	else if (t.showReq){
    			if (wall < 8) m+= '<br><FONT COLOR= "CC0000">Mauer: ' + wall + '(8)</font>';
    			if (blacksmith < 8) m+= '<br><FONT COLOR= "CC0000">Schmied.: ' + blacksmith + '(8)</font>';
    			if (fletching < 7) m+= '<br><FONT COLOR= "CC0000">Befl.: ' + fletching + '(7)</font>';
    			if (geometry < 7) m+= '<br><FONT COLOR= "CC0000">Geomet.: ' + geometry + '(7)</font>';
    			m+='</td>';
    	} 	
    }
    m+='<TR valign=top align=right><TD>Mauer def</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    	}
    	build = (parseInt(Seed.fortifications[city]["fort53"])*2)+ (parseInt(Seed.fortifications[city]["fort55"])*4);
    	max = WallSpace[wall]/2;
    	if (build < max) m+='<TD><FONT COLOR= "CC0000">';
    	else m+='<TD><FONT COLOR= "669900">';
    	m+= build+'</font>';
    	m+= '/' + max +'</td>';
    }
    
    m+='</tr><TR valign=top align=right><TD>Falle</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1]; 
    	}
    	max = WallSpace[wall]/2/4 - (parseInt(Seed.fortifications[city]["fort60"])*4) - (parseInt(Seed.fortifications[city]["fort61"])*1) - (parseInt(Seed.fortifications[city]["fort62"])*3);
    	m+=  '<TD>'+Seed.fortifications[city]["fort60"];
    	if (wall >=4 && blacksmith >=4 && poisonededge>=4 && max>0) m+= '<br>Plätze: ' + max+'</td>';
    	else if (t.showReq){
    			if (wall < 4) m+= '<br><FONT COLOR= "CC0000">Mauer: ' + wall + '(4)</font>';
    			if (blacksmith < 4) m+= '<br><FONT COLOR= "CC0000">Schmied.: ' + blacksmith + '(4)</font>';
    			if (poisonededge < 4) m+= '<br><FONT COLOR= "CC0000">Vergift.: ' + poisonededge + '(4)</font>';
    			m+='</td>';
    	} 	
    }
    m+='</tr><TR valign=top align=right><TD>Krähenfüße</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1]; 
    	}
    	max = WallSpace[wall]/2/1 - (parseInt(Seed.fortifications[city]["fort60"])*4) - (parseInt(Seed.fortifications[city]["fort61"])*1) - (parseInt(Seed.fortifications[city]["fort62"])*3);
    	m+= '<TD>'+Seed.fortifications[city]["fort61"];
    	if (wall >=1 && metalalloys >=1 && max>0) m+= '<br>Plätze: ' + max+'</td>';
    	else if (t.showReq){
    			if (wall < 1) m+= '<br><FONT COLOR= "CC0000">Mauer: ' + wall + '(1)</font>';
    			if (metalalloys < 1) m+= '<br><FONT COLOR= "CC0000">Metal.: ' + metalalloys + '(1)</font>';
    			m+='</td>';
    	} 	
    }
    m+='</tr><TR valign=top align=right><TD>Eiserne Erdspieße</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1]; 
    	}
    	max = (WallSpace[wall]/2/3).toFixed(0) - (parseInt(Seed.fortifications[city]["fort60"])*4) - (parseInt(Seed.fortifications[city]["fort61"])*1) - (parseInt(Seed.fortifications[city]["fort62"])*3);
    	m+=  '<TD>'+Seed.fortifications[city]["fort62"];
    	if (wall >=2 && blacksmith>=2 && logging>=2 && max>0) m+= '<br>Plätze: ' + max+'</td>';
    	else if (t.showReq){
    			if (wall < 2) m+= '<br><FONT COLOR= "CC0000">Mauer: ' + wall + '(2)</font>';
    			if (blacksmith < 2) m+= '<br><FONT COLOR= "CC0000">Schmied.: ' + blacksmith + '(2)</font>';
    			if (logging < 2) m+= '<br><FONT COLOR= "CC0000">Holzver.: ' + logging + '(2)</font>';
    			m+='</td>';
    	} 	
    }
    
    
    m+='<TR valign=top align=right><TD>Feldabwehr</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    	}
    	build = (parseInt(Seed.fortifications[city]["fort60"])*4)+ (parseInt(Seed.fortifications[city]["fort61"])*1) + (parseInt(Seed.fortifications[city]["fort62"])*3);
    	max = WallSpace[wall]/2;
    	if (build < max) m+='<TD><FONT COLOR= "CC0000">';
    	else m+='<TD><FONT COLOR= "669900">';
    	m+= build+'</font>';
    	m+= '/' + max +'</td>';
    }
    
    
    m+='</tr></table><BR><TABLE class=ptBuilds border=1px cellpadding=5 cellspacing=0>';
    for(i=0; i<Cities.numCities; i++) {
    }
    
    for (b=0;b<20;b++){
    	m+='<TR valign=top align=right><TD width=85>'+buildings[b]+'</td>';
	    for (c=0;c<Seed.cities.length;c++){
	    	m+='<TD style="width:79px; max-width:79px; word-wrap: break-word;">';
	    		city= 'city'+Seed.cities[c][0];
	    		var count =0;
	    		for (y in Seed.buildings[city]) {
	    			if (Seed.buildings[city][y][0] == b) {
	    				count++;
	    				if (count > 1) m+=",";
	    				if (Seed.buildings[city][y][1] >= 9) m+='<FONT COLOR= "669900">';
	    				m+=Seed.buildings[city][y][1];
	    				if (Seed.buildings[city][y][1] >= 9) m+='</font>';
	    				
	    			}
	    		}
	    		if (count == 0) {
	    			m+='<FONT COLOR= "CC0000">0</font>';
	    		}
	    	m+='</td>';		
	    }
	    m+='</td></tr>';
	} 
	m+='</tr></table><BR><TABLE class=ptBuilds  border=1px cellpadding=5 cellspacing=0>';
	for(i=0; i<Cities.numCities; i++) {
	}
	m+='<TR valign=top align=right><TD width=85>Wächter</td>';
	for(i=0; i<Seed.cities.length; i++) {
	 	for(g=0;g<Seed.guardian.length;g++) {
	 		if (Seed.guardian[g]['cityId'] == Seed.cities[i][0] && Seed.guardian[g]['level']!=0) {
	 			m += '<TD width=79>';
	 			if (Seed.guardian[g]['level'] >=9) m+='<FONT COLOR= "669900">'; 
	 			m+=Seed.guardian[g]['level']+"("+Seed.guardian[g]['type']+")</td>";
	 			if (Seed.guardian[g]['level'] >=9) m+='</font>'; 
	 		}
	 		else {if (Seed.guardian[g]['cityId'] == Seed.cities[i][0] && Seed.guardian[g]['level']==0) m += '<TD width=79><FONT COLOR= "CC0000">0</font></td>'};
		}
	}
	
    m+='</tr></table><BR></table><BR><TABLE class=ptBuilds  border=1px cellpadding=5 cellspacing=0><TR valign=top align=right>';
    for (i in Research) {
    	select = 'tch'+i;
    	m+='<TR><TD style="width:150px;">'+Research[i]+'</td><TD>';
    	if (Seed.tech[select] >=9) m+='<FONT COLOR= "669900">';
    	if (Seed.tech[select] ==0) m+='<FONT COLOR= "CC0000">';
    	m+=Seed.tech[select]+'</td></tr>';
    	if (Seed.tech[select] >=9 || Seed.tech[select] ==0) m+='</font>';
    }	
    m+='</table></div>';
    
    t.cont.style.maxHeight = '750px';
    t.cont.style.overflowY = 'scroll';
    t.cont.innerHTML = m;
    
    document.getElementById('showReq').addEventListener ('change', function (){
    	t.showReq = document.getElementById('showReq').checked;
    	t.init(div);
    },false);	
        
  },

 
  show : function (){
  var t = Tabs.Builds;
   mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },

  hide : function (){
  var t = Tabs.Builds;
   mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },
};

/****************************  Spam Tab  ******************************/
Tabs.Spam = {
 tabLabel : 'Spam',
 tabOrder : toSpam,
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
  var t = Tabs.Spam;
  t.myDiv = div;



  
var m = '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="pdxStat2" width="700"> Global Chat</td></tr></table>';
m += '<td width="100%" colspan="2"><INPUT id=pbSpamEnable type=checkbox '+ (Options.spamconfig.aspam?' CHECKED':'') +'/> Im Global Chat alle</td>';
m += '<TD><INPUT id=pbSpamMin type=text size=2 maxlength=3 value="'+ Options.spamconfig.spammins +'" \> Minuten posten!</td><br>';
m += '</tr><tr><td colspan="2">Nachricht: &nbsp; </td>\
    <TD><center><INPUT id=pbSpamAd type=text size=140 maxlength=800 value="'+ Options.spamconfig.spamvert +'" \></center></td></tr></table>\
<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="pdxStat2" width="700"> Allianz Chat</td></tr></table>\
<td width="100%" colspan="2"><INPUT id=pbSpamEinschaltenA type=checkbox '+ (Options.spamconfiga.aspama?' CHECKED':'') +'/> Im Allianz Chat alle</td>\
<TD><INPUT id=pbSpamMinutenA type=text size=2 maxlength=3 value="'+ Options.spamconfiga.spamminsa +'" \> Minuten posten!</td><br>\
</tr><tr><td colspan="2">Nachricht: &nbsp; </td>\
    <TD><center><INPUT id=pbSpamNachrichtA type=text size=140 maxlength=800 value="'+ Options.spamconfiga.spamverta +'" \></center></td></tr></table>';
  t.myDiv.innerHTML = m;

  document.getElementById('pbSpamEnable').addEventListener ('change', t.e_spamOptChanged, false);
  document.getElementById('pbSpamAd').addEventListener ('change', t.e_spamOptChanged, false);
  document.getElementById('pbSpamMin').addEventListener ('change', t.e_spamOptChanged, false);
  document.getElementById('pbSpamEinschaltenA').addEventListener ('change', t.e_spamOptChanged, false);
  document.getElementById('pbSpamNachrichtA').addEventListener ('change', t.e_spamOptChanged, false);
  document.getElementById('pbSpamMinutenA').addEventListener ('change', t.e_spamOptChanged, false);
},
  
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
  var t = Tabs.Spam;
   mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },
  
  show : function (){         // called whenever this tab is shown
  var t = Tabs.Spam;
   mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = 930 + 'px';
  },
  e_spamOptChanged : function (){
  var t = Tabs.Spam;
  Options.spamconfig.aspam = document.getElementById('pbSpamEnable').checked;
  Options.spamconfig.spamvert = document.getElementById('pbSpamAd').value;
  Options.spamconfig.spammins = document.getElementById('pbSpamMin').value;
  Options.spamconfiga.aspama = document.getElementById('pbSpamEinschaltenA').checked;
  Options.spamconfiga.spamverta = document.getElementById('pbSpamNachrichtA').value;
  Options.spamconfiga.spamminsa = document.getElementById('pbSpamMinutenA').value;
  },

};  

var SpamEvery  = {
  timer : null,
  init : function (){

  if (Options.spamconfig.spammins < 1)
    Options.spamconfig.spammins = 1;
  SpamEvery.setEnable (Options.spamconfig.aspam);
  },
  setEnable : function (tf){
  var t = SpamEvery;
  clearTimeout (t.timer);
  if (tf)
    t.timer = setTimeout (t.count, '60000');
  },
  count : function (){
   var t = SpamEvery;
   if (Options.spamconfig.atime > Options.spamconfig.spammins) {
  Options.spamconfig.atime = 2;
  t.doit ();
   } else {
  Options.spamconfig.atime = (Options.spamconfig.atime + 1);
  SpamEvery.init ();
   }
  },
  doit : function (){
  actionLog ('Auto Global Spam: ('+ Options.spamconfig.spammins +' Minute(n) vorbei!) Nachricht gesendet!');
  sendChat ("/g INFO: "+  Options.spamconfig.spamvert);
  SpamEvery.init ();
  }
}
var SpamEveryA  = {
  timer : null,

  init : function (){

  if (Options.spamconfiga.spamminsa < 1)
    Options.spamconfiga.spamminsa = 1;
  SpamEveryA.setEnableA (Options.spamconfiga.aspama);

  },
  setEnableA : function (tf){
  var t = SpamEveryA;
  clearTimeout (t.timer);
  if (tf)
    t.timer = setTimeout (t.count, '60000');
  },
  count : function (){
   var t = SpamEveryA;
   if (Options.spamconfiga.atimea > Options.spamconfiga.spamminsa) {
  Options.spamconfiga.atimea = 2;
  t.doit ();
   } else {
  Options.spamconfiga.atimea = (Options.spamconfiga.atimea + 1);
  SpamEveryA.init ();
   }
  },
  doit : function (){
  actionLog ('Auto Allianz Spam: ('+ Options.spamconfiga.spamminsa +' Minute(n) vorbei!) Nachricht gesendet!');
  sendChat ("/a INFO: "+  Options.spamconfiga.spamverta);
  SpamEveryA.init ();
  }
}    
/*********************************** Info tab ***********************************/

Tabs.Info = {
  tabOrder : toInfo,
  cont : null,

  init : function (div){
    var t = Tabs.Info;
    t.cont = div;
    fortmight = {
      u53: "4",
      u55: "7",
      u60: "1",
      u61: "2",
      u62: "3",
    };
    var t = Tabs.Info;
    rownum = 0;
    m = '<STYLE>.xtabH {background:#ffffe8; border:none; padding-right: 5px; padding-left: 5px; margin-left:10px; }\
            .xtabHL { background:#ffffe8; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left:5px; margin-left:10px; }\
            .xtabL { background:none; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left: 5px; margin-left:10px; }\
            .xtabLine { padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none }</style>\
        <DIV style="height:650px; max-height:650px; overflow-y:auto; overflow-x:hidden"><DIV class=pdxStat>INFORMAZIONI TRUPPE</div><TABLE align=center cellpadding=1 cellspacing=0>\
        <TR align=center><TD class=xtab></td><TD class=xtabHL colspan=5><B>\QUANTITA\' RISORSE </b></td><TD class=xtabHL colspan=7><B>STATISTICHE</b></td><TD class=xtabHL><B>CIBO</b></td></tr>\
        <TR valign=bottom align=right><TD class=xtab></td><TD class=xtabHL>Cibo</td><TD class=xtabH>Legno</td><TD class=xtabH>Pietra</td>\
        <TD class=xtabH>Mine.</td><TD class=xtabH>Popol.</td><TD class=xtabHL>Potere</td><TD class=xtabH>Vita.</td><TD class=xtabH>Attak.</td><TD class=xtabH>Def.</td><TD class=xtabH>Veloc.</td><TD class=xtabH>Dist.</td><TD class=xtabH>Trasp.</td>\
        <TD class=xtabHL>Manut.</td></tr>\
        <TR style="height:1px;"><TD style="padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none" colspan=14></td></tr>';
    for (ui=1; ui<13; ui++){
      if (++rownum % 2)
        rsty = '';
      else
        rsty = ' style="background: #e8e8e8" ';
      cost = unsafeWindow.unitcost['unt'+ui];     //  NAME, Food, Wood, Stone, Ore, ?, IdlePop, Time
      stats = unsafeWindow.unitstats['unt'+ui];   //  Life, Attack, Defense, Speed, Range, Load
      food = unsafeWindow.unitupkeeps[ui];
      might = unsafeWindow.unitmight['u'+ui];
      m += '<TR '+ rsty +'align=right><TD class=xtab align=left><B>'+ cost[0] +'</b></td><TD class=xtabL>'+ cost[1] +'</td><TD class=xtab>'+ cost[2] +'</td>\
          <TD class=xtab>'+ cost[3] +'</td><TD class=xtab>'+ cost[4] +'</td><TD class=xtab>'+ cost[6] +'</td><TD class=xtabL>'+ might +'</td>\
          <TD class=xtab>'+ stats[0] +'</td><TD class=xtab>'+ stats[1] +'</td><TD class=xtab>'+ stats[2] +'</td><TD class=xtab>'+ stats[3] +'</td>\
          <TD class=xtab>'+ stats[4] +'</td><TD class=xtab>'+ stats[5] +'</td><TD class=xtabL>'+ food +'</td></tr>';

    }
    m += '<TR class=xtabLine><TD colspan=14 class=xtabLine></td></tr>';
    for (k in unsafeWindow.fortcost){
      if (++rownum % 2)
        rsty = '';
      else
        rsty = ' style="background: #e8e8e8" ';
      cost = unsafeWindow.fortcost[k];     //  NAME, Food, Wood, Stone, Ore, ?, IdlePop, Time
      fi = k.substring(3);
      stats = unsafeWindow.fortstats['unt'+fi];   //  Life, Attack, Defense, Speed, Range, Load
      food = 0;
      might = fortmight['u'+fi];
      name = cost[0].replace ('Defensive','');
      name = name.replace ('Wall-Mounted','');
      m += '<TR '+ rsty +'align=right><TD align=left class=xtab><B>'+ name +'</b></td><TD class=xtabL>'+ cost[1] +'</td><TD class=xtab>'+ cost[2] +'</td>\
          <TD class=xtab>'+ cost[3] +'</td><TD class=xtab>'+ cost[4] +'</td><TD class=xtab>'+ cost[6] +'</td><TD class=xtabL>'+ might +'</td>\
          <TD class=xtab>'+ stats[0] +'</td><TD class=xtab>'+ stats[1] +'</td><TD class=xtab>'+ stats[2] +'</td><TD class=xtab>'+ stats[3] +'</td>\
          <TD class=xtab>'+ stats[4] +'</td><TD class=xtab>'+ stats[5] +'</td><TD class=xtabL>'+ food +'</td></tr>';
    }
    m += '<TR class=xtabLine><TD colspan=14 class=xtabLine></td></tr>';
    m += '</table>';
  // TRAINING INFO
  function _displayrow (name, row){
      if (rownum++ % 2)
        style = '';
      else
        style = ' style = "background: #e8e8e8"';
      m += '<TR' + style + '>';
      m += '<TD align=right><B>' + name + '</B></td>';
      for (i=0; i<row.length; i++)
        if (row[i]==0)
          m += '<td align=right><SPAN class=boldRed>0</SPAN></td>';
        else
          m += '<td align=right>'+addCommas(parseInt(row[i]))+'</td>';
      m += '</tr>';
    }
    m += '<DIV class=pdxStat>TEMPI DI ADDESTRAMENTO PER CITTA\'</div><BR /><TABLE align=center cellpadding=1 cellspacing=0>\
          <TABLE align=center cellpadding=1 cellspacing=0><TR align=right><TD></td>';
    infoRows = [];
    for (r=0; r<18; r++){
      infoRows[r] = [];
    }
    for(i=0; i<Cities.numCities; i++) {
      cityID = 'city'+ Cities.cities[i].id;
      m += "<TD align=center valign=bottom width=60px><B>";
      m += Cities.cities[i].name.replace(/ /g, "<BR>");
      m += "</B></TD>";
      getTroopTrainEstimates(cityID);
      infoRows[0][i] = numBarracks;
      infoRows[1][i] = totLevelsBarracks;
      infoRows[2][i] = marshallCombatScore;
      infoRows[3][i] = geometryLevel;
      infoRows[4][i] = stableLevel;
      infoRows[5][i] = workshopLevel;
      infoRows[6][i] = rateSupplyTroop;
      infoRows[7][i] = rateMilitiaman;
      infoRows[8][i] = rateScout;
      infoRows[9][i] = ratePikeman;
      infoRows[10][i] = rateSwordsman;
      infoRows[11][i] = rateArcher;
      infoRows[12][i] = rateCavalry;
      infoRows[13][i] = rateHeavyCavalry;
      infoRows[14][i] = rateSupplyWagon;
      infoRows[15][i] = rateBallista;
      infoRows[16][i] = rateBatteringRam;
      infoRows[17][i] = rateCatapult;
    }
    m += "</tr>";
    rownum=0;
    _displayrow ("Caserme",   infoRows[0]);
    _displayrow ("Livello Totale Caserme", infoRows[1]);
    _displayrow ("Potere Maresciallo", infoRows[2]);
    _displayrow ("Livello Geometria",       infoRows[3]);
    _displayrow ("Livello Stalla",         infoRows[4]);
    _displayrow ("Livello Laboratoriol",       infoRows[5]);
    m += "<TR><TD nowrap align=center colspan="+(Cities.numCities+1)+"><B>Quantità Truppe Addestrabili in 1\h per  ogni Città</B></TD>";
    _displayrow ("Truppe Di rifornimento.",  infoRows[6]);
    _displayrow ("Soldati semplici",    infoRows[7]);
    _displayrow ("Esploratori",         infoRows[8]);
    _displayrow ("Lancieri",       infoRows[9]);
    _displayrow ("Spadaccini",     infoRows[10]);
    _displayrow ("Arcieri",        infoRows[11]);
    _displayrow ("Cav. leggera",       infoRows[12]);
    _displayrow ("Cav. pesante", infoRows[13]);
    _displayrow ("Carri di rifornimento",  infoRows[14]);
    _displayrow ("Baliste",      infoRows[15]);
    _displayrow ("Arieti", infoRows[16]);
    _displayrow ("Catapulte",      infoRows[17]);
    m += "</TABLE>";
// TRAINING INFO END

// WAPPEN INFO
  var crestname = { 1101:'Bor',
          1102:'Ector',
          1103:'Kay',
          1104:'Bedivere',
          1105:'Gawain',
          1106:'Percival',
          1107:'Galahad',
          1108:'Lancillotto',
          1109:'Artù',
          1110:'Morgana',
          1111:'Mordred',
          1112:'Re Cervo',
          1113:'Pendragon',
          1114:'Dama del Lago'};
  var crest = {};
  for (k in crestname){
    if(Seed.items['i'+k])
      crest[k] = Seed.items['i'+k];
    else
      crest[k] = 0;
  }
var crestreq = { 3:{1101:4, 1102:2, 1103:1},
                 4:{1103:4, 1104:3, 1105:1},
                 5:{1106:4, 1107:3, 1108:2},
                 6:{1109:4, 1110:3, 1111:2},
                 7:{1112:4, 1113:3, 1114:2}
               };
 
 m += '<DIV class=pdxStat>INFORMAZIONE ELMI</div><TABLE align=center cellpadding=1 cellspacing=0>\
      <TR CLASS="xtabH">\
        <TD class=xtab></TH>\
        <TD class=xtabHL><b>Richiesti (Disponi)</b></TD>\
        <TD class=xtabHL><b>Richiesto (Disponi)</b></TD>\
        <TD class=xtabHL><b>Richiesto (Disponi)</b></TD>\
      </TR>\
    <TR style="height:1px;"><TD style="padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none" colspan=14></td></tr>';
    rownum = 0;
    for(k in crestreq){
    if (++rownum % 2)
        rsty = '';
      else
        rsty = ' style="background: #e8e8e8" ';
    m += '<TR '+rsty+'>  \
      <TD class=xtab><B>'+k+' Città</B></TD>';
    for(u in crestreq[k])
      m+='<TD class=xtabL>'+crestreq[k][u]+' '+crestname[u]+ ' ('+crest[u]+') </TD>';
    m += '</TR>';
    }
 m += '</TABLE>';
  //End crest info
    
   m += '</table>';
     m += '<DIV class=pdxStat>ENTFERNUNGS RECHNER</div><DIV class=pdxEntry><TABLE align=center cellpadding=1 cellspacing=0>\
      <TR><TD class=xtab align=right><B>Centro: </b></td><TD  class=xtab> X: <INPUT id=calcX type=text\> Y: <INPUT id=calcY type=text\> <SPAN id=ptloc1></span></td></tr>\
      <TR><TD class=xtab><B>Ziel: </b></td><TD class=xtab> X: <INPUT id=calcX2 type=text\> Y: <INPUT id=calcY2 type=text\> <SPAN id=ptloc2></span></td></tr></table>\
      <CENTER><DIV style="width:60%; font-size:14px; border: 1px solid; background-color:white; margin:20px 3px 3px 0px; padding:4px" id=ptdistout></div>\
  <div><br><b>Marschzeit für</b><br><select id="idETASelect">\
        <option value="0,250" > -- Auswählen -- </option>\
        <option value="0,180" > Truppe di rifornimento: </option>\
        <option value="0,200" > Soldati semplici </option>\
        <option value="0,3000" > Esploratori </option>\
        <option value="0,300" > Lancieri </option>\
        <option value="0,275" > Spadaccini </option>\
        <option value="0,250" > Arcieri</option>\
        <option value="1,1000" > Cav. leggera </option>\
        <option value="1,750" > Cav. pesante </option>\
        <option value="1,150" > Carri di rifornimento </option>\
        <option value="1,100" > Baliste </option>\
        <option value="1,120" > Arieti </option>\
        <option value="1,80" > Catapulte </option>\
</select><BR><BR><SPAN class=boldRed>(Startpunkt, Ziel und Truppen Auswählen!)</span></div>\
<DIV style="width:60%; font-size:14px; border: 1px solid; background-color:white; margin:20px 3px 3px 0px; padding:4px" id=ptETAout></div>\
ETA = <i>estimated time of arrival</i> | voraussichtliche Ankunftszeit</center></div>';
    m += '<DIV class=pdxStat>PROVINZ KARTE</div><DIV id=ptProvMap style="height:'+ provMapCoords.imgHeight +'px; width:'+ provMapCoords.imgWidth +'px; background-repeat:no-repeat; background-image:url(\''+ URL_PROVINCE_MAP +'\')"></div>';

    m += '<DIV class=pdxStat>ULTERIORI INFORMAZIONI</div>Kingdom of Camelot <HR><a href="http://userscripts.org/scripts/show/99704" target="_blank">Power Italy - By ASRIELS</a> <BR><a href="" target="_blank"></a> <BR><SPAN class=boldRed></span><BR> ';
    if (DEBUG_BUTTON)
      m += '<BR><INPUT id=ptButDebug type=submit name="SEED" value="DEBUG">';
    
    t.cont.innerHTML = m +'</div>';
   if (DEBUG_BUTTON)
      document.getElementById('ptButDebug').addEventListener('click', function (){debugWin.doit()}, false);
   for (var c=0; c<Cities.numCities; c++)      
      t.makeCityImg (c, document.getElementById('ptProvMap'));
  new CdispCityPicker ('ptloc1', document.getElementById('ptloc1'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX'), document.getElementById('calcY'));   new CdispCityPicker ('ptloc2', document.getElementById('ptloc2'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX2'), document.getElementById('calcY2'));
  t.eventLocChanged(Cities.cities[0], Cities.cities[0].x, Cities.cities[0].y);
    t.eventFromLocChanged(Cities.cities[0], Cities.cities[0].x, Cities.cities[0].y);
    document.getElementById('idETASelect').addEventListener ( 'change', t.eventLocChanged, false);
  },

  hide : function (){
  },

  show : function (){
  },

// var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};  
  makeCityImg : function (cityNum, eMap){
    var t = Tabs.Info;
    var city = Cities.cities[cityNum];
//    var off = getAbsoluteOffsets (eMap);
    var x = parseInt((provMapCoords.mapWidth * city.x) / 750);
    var y = parseInt((provMapCoords.mapHeight * city.y) / 750);
    var ce = document.createElement ('div');
    ce.style.background = 'black';
    ce.style.opacity = '1.0';
    ce.style.position='relative';
    ce.style.display='block';
    ce.style.width='14px';
    ce.style.height='16px';
    ce.style.border='1px solid #fff';
    ce.style.color = 'white';
    ce.style.textAlign = 'center';
    ce.style.top = (y+provMapCoords.topMargin-(cityNum*16)-8) +'px';      
    ce.style.left = (x+provMapCoords.leftMargin-7) +'px';
    eMap.appendChild(ce);
    ce.innerHTML = (cityNum+1) +'';
  },
   plotCityImg : function (cityNum, eMap, x, y){
//logit ('makeCityImg: '+ cityNum);    
    var t = Tabs.Info;
    var xplot = parseInt((provMapCoords.mapWidth * x) / 750);
    var yplot = parseInt((provMapCoords.mapHeight * y) / 750);
  if(document.getElementById('plotmap_'+cityNum) == null){
    var ce = document.createElement ('div');
    ce.style.background = 'white';
    ce.id = 'plotmap_'+cityNum;
    ce.style.opacity = '1.0';
    ce.style.position='relative';
    ce.style.display='block';
    ce.style.width='14px';
    ce.style.height='16px';
    ce.style.border='1px solid #fff';
    ce.style.color = 'black';
    ce.style.textAlign = 'center';
  } else {
    ce = document.getElementById('plotmap_'+cityNum);
  }
    ce.style.top = (yplot+provMapCoords.topMargin-((Cities.numCities+cityNum)*16)-8) +'px';      
    ce.style.left = (xplot+provMapCoords.leftMargin-7) +'px';
    eMap.appendChild(ce);
    ce.innerHTML = (cityNum+1) +'';
  },
  eventLocChanged : function (city, x, y){
    var t = Tabs.Info;
    var x1 = parseInt(document.getElementById('calcX').value);
    var x2 = parseInt(document.getElementById('calcX2').value);
    if (isNaN(x2))
      return;
    var y1 = parseInt(document.getElementById('calcY').value);
    var y2 = parseInt(document.getElementById('calcY2').value);
    var m = 'Distanza da '+ x1 +','+ y1 +' nach '+ x2 +','+ y2 +' ist: &nbsp;<B>'+ distance (x1, y1, x2, y2).toFixed(2) +'</b>';
    document.getElementById('ptdistout').innerHTML = m;
  t.plotCityImg(0, document.getElementById('ptProvMap'), x1, y1);
  t.plotCityImg(1, document.getElementById('ptProvMap'), x2, y2);
    var dist = distance (x1, y1, x2, y2);
    m = t.estETA(dist);
    if (m != null)
       document.getElementById('ptETAout').innerHTML = m;
    else logit("no M");
  },

  eventFromLocChanged : function (city, x, y){
    var t = Tabs.Info;
    t.ModelCity = city;
    var x1 = parseInt(document.getElementById('calcX').value);
    var x2 = parseInt(document.getElementById('calcX2').value);
    if (isNaN(x2))
      return;
    var y1 = parseInt(document.getElementById('calcY').value);
    var y2 = parseInt(document.getElementById('calcY2').value);
    var m = 'Distanza da '+ x1 +','+ y1 +' nach '+ x2 +','+ y2 +' ist: &nbsp;<B>'+ distance (x1, y1, x2, y2).toFixed(2) +'</b>';
    document.getElementById('ptdistout').innerHTML = m;
    var dist = distance (x1, y1, x2, y2);
    m = t.estETA(dist);
    if (m != null)
       document.getElementById('ptETAout').innerHTML = m;
    else logit("no M");
  },

  estETA : function(dist) { // Need Relief Station Levels to estimate transport, reinf, or reassign times.
    var t = Tabs.Info;
    var cityID;
    if (dist == 0) return "Keine Marschzeit gefunden!";
    var EtaType = document.getElementById('idETASelect');
    var baseSpeedSel = EtaType.options[EtaType.selectedIndex].value;
    var m = baseSpeedSel.split(',');
    var horse = parseInt(m[0]);
    var baseSpeed = parseInt(m[1]);
    if (baseSpeed == 0) return "ETA: unbekannt";
    var mmLvl = parseInt(Seed.tech.tch11);//Magical Mapping
    var Speed = 0;
    if (horse){
    //HorsesSiegeSpeed = Base * (1 + MM/10) * (1 + AH/20)
      var hsLvl = parseInt(Seed.tech.tch12);//Alloy Horse Shoes
      Speed = baseSpeed * (1 + mmLvl/10) * (1 + hsLvl/20);
    }
    else {
    //FootSpeed = Base * (1 + MM/10)
      Speed = baseSpeed * (1 + mmLvl/10);
    }
    //Grid Speed (tiles/second) = Speed (100ths/min) / 6000
    var gSpeed = 0;
    var estSec = 0;
    if (Speed>0) {
      gSpeed = Speed/6000;
      estSec = (dist/gSpeed).toFixed(0);
    }
    var ETAstr = 'Angriff:  <B>' + timestr ((parseInt((estSec+''))+30)+'',1) +'</b>';
    //RS - Cities Relief Station Level
    //Friendly Speed = Speed * (1 + RS/2)
    if (t.ModelCity) {
      cityID = t.ModelCity.id;
      //logit ('ETAest - cityID: ' + cityID);
      var building = getCityBuilding (cityID, 18);
      if (building) {
        //logit ('ETAest - building: ' + building.count + ' : ' + building.maxLevel);
        fSpeed = Speed * (1 + parseInt(building.maxLevel)/2);
        gSpeed = fSpeed/6000;
        estSec = (dist/gSpeed).toFixed(0);
        var friendTimestr = '| Verbündet: <B>' + timestr ((parseInt((estSec+''))+30)) +'</b>';
        ETAstr = ETAstr + ' ' + friendTimestr;
      }
    }
    return ETAstr;
  },
}
/********** Map Tab (Start) **********/
function CMapAjax (){
  this.normalize = normalize;
  this.request = request;

  function request (left, top, width, notify){
    var left = parseInt(left / 5) * 5;
    var top = parseInt(top / 5) * 5;
    var width = parseInt((width+4) / 5) * 5;

    var blockString = generateBlockList(left, top, width);
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.blocks = blockString;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify(left, top, width, rslt);
      },
      onFailure: function (rslt) {
        notify(left, top, width, rslt);
      }
    });
    function generateBlockList (left, top, width) {
      var width5 = parseInt(width / 5);
      var bl = [];
      for (x=0; x<width5; x++){
        var xx = left + (x*5);
        if (xx > 745)
          xx -= 750;
        for (y=0; y<width5; y++){
          var yy = top + (y*5);
          if (yy > 745)
            yy -= 750;
          bl.push ('bl_'+ xx +'_bt_'+ yy);
        }
      }
      return bl.join(",");
    }
  }

  function normalize  (x){
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  }
}
/********** Map  Tab (End) **********/


/*********************************** Fake TAB ***********************************/

Tabs.F = {
   tabLabel : 'Test',
  tabOrder : toFake,
  tabDisabled : !ENABLE_TEST_TAB,
  cont : null,

  init : function (div){
    var t = Tabs.F;
    t.cont = div;
  var citySelect = '  <SELECT id=fakeCity>';
      for (var c=0; c<Cities.numCities; c++) {
        aCity = Cities.cities[c].name + ' ('+Cities.cities[c].x + ','+ Cities.cities[c].y+')';
           citySelect += '<option value=\''+c+'\'>'+aCity+'</option>';
      }
      citySelect += '</select>';
    var m = '<div class=pdxStat>TEST PER L\' ALLERT</div><DIV id=testDiv style="background-color:#fffff0; maxwidth:675; max-height:630px; height:630px; overflow-y:auto;"> <TABLE><TR><TD align=right>Esplorazione: </td><TD><INPUT type=checkbox id=fakeIsScout></td></tr>\
        <TR><TD align=right>Terra: </td><TD><INPUT type=checkbox id=fakeIsWild></td></tr>\
        <TR><TD align=right>Falso resoconto: </td><TD><INPUT type=checkbox disabled id=fakeFalse></td></tr>\
        <TR><TD align=right>Secondi: </td><TD><INPUT type=text size=4 value=300 id=fakeSeconds></td></tr>\
        <TR><TD align=right>Truppe di rifornimento: </td><TD><INPUT type=text size=6 value=0 id=fakeSupply></td></tr>\
    <TR><TD align=right>Soldati semplici: </td><TD><INPUT type=text size=6 value=5000 id=fakeMilitia></td></tr>\
    <TR><TD align=right>Esploratori: </td><TD><INPUT type=text size=6 value=0 id=fakeScout></td></tr>\
      <TR><TD align=right>Lancieri: </td><TD><INPUT type=text size=6 value=0 id=fakePike></td></tr>\
      <TR><TD align=right>Spadaccini: </td><TD><INPUT type=text size=6 value=0 id=fakeSword></td></tr>\
      <TR><TD align=right>Arcieri: </td><TD><INPUT type=text size=6 value=0 id=fakeArcher></td></tr>\
      <TR><TD align=right>Cav. leggera: </td><TD><INPUT type=text size=6 value=0 id=fakeCav></td></tr>\
      <TR><TD align=right>Cav. pesante: </td><TD><INPUT type=text size=6 value=0 id=fakeHeavy></td></tr>\
      <TR><TD align=right>Carri di rifornimento: </td><TD><INPUT type=text size=6 value=0 id=fakeWagon></td></tr>\
      <TR><TD align=right>Baliste: </td><TD><INPUT type=text size=6 value=0 id=fakeBallista></td></tr>\
      <TR><TD align=right>Arieti: </td><TD><INPUT type=text size=6 value=0 id=fakeRam></td></tr>\
      <TR><TD align=right>Catapulte: </td><TD><INPUT type=text size=6 value=0 id=fakeCat></td></tr>\
      <TR><TD align=right>Nome falso: </td><TD><INPUT type=text size=13 value=TEST id=fakeName></td></tr>\
      <TR><TD align=right>Destinazione: </td><TD>'+citySelect+'</td></tr>\
        <TR><TD colspan=2 align=center><INPUT id=testSendMarch type=submit value="Attacco falso" \></td></tr></table>\
        <INPUT id=ptReloadKOC type=submit value="Riaggiorna KoC" \>\
        <BR></div>';
    t.cont.innerHTML = m;
    document.getElementById('testSendMarch').addEventListener ('click', t.clickFakeAttack, false);
    document.getElementById('ptReloadKOC').addEventListener ('click', t.reloadKOC, false);
    function xyNotify(city, x, y){
      var m = '[ Notiz: '+ (city?city.name:'null') +', x='+ x +', y='+ y +' ]';
      document.getElementById('testNotify').innerHTML = m;
    }
  },

  hide : function (){
        var t = Tabs.F;
        mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 900 + 'px';
  },

  show : function (){
        var t = Tabs.F;
        mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 900 + 'px';
  },
  
  reloadKOC : function (){
    window.location.href = '';
    setTimeout (function (){window.location.href = window.location.href +'&rload=3';}, 0);
    var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+getServerId();
    var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ getServerId() +'"</form>';
    var e = document.createElement ('div');
    e.innerHTML = t;
    document.body.appendChild (e);
    setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
  },
  
  writeDiv : function (msg){
    var t = Tabs.F
    if (t.state != null)
      document.getElementById('testDiv').innerHTML = msg;
  },

  addDiv : function (msg){
    var t = Tabs.F;
    if (t.state != null)
      document.getElementById('testDiv').innerHTML += msg;
  },

  createFakeAttack : function (cityNum, isScout, isWild, isFalse, secs, numMilitia, numSupply, numPike,numSword,numArcher,numCav,numHeavy,numWagon,numBallista,numRam,numCat,numScout, name){
    var marchId = 'm'+ (88888 + Math.floor(Math.random()*11111));
    var march = {};
    if (matTypeof(Seed.queue_atkinc)=='array')
      Seed.queue_atkinc = {};
    if (isFalse)
      march.marchType = 0;
    else if (isScout)
      march.marchType = 3;
    else
      march.marchType = 4;

    march.toCityId = Cities.cities[cityNum].id;
    if (isWild) {
      keys = unsafeWindow.Object.keys(Seed.wilderness['city'+Cities.cities[cityNum].id]);
      march.toTileId = Seed.wilderness['city'+Cities.cities[cityNum].id][keys[0]].tileId;
    } else {
      march.toTileId = Cities.cities[cityNum].tileId;
    }
    secs = parseInt(secs);
    march.arrivalTime = unixTime() + secs;
    march.departureTime = unixTime() - 10;
     march.unts = {}
  if(numScout != 0)
    march.unts.u3 = numScout
  if(numMilitia != 0)
    march.unts.u2 = numMilitia
  if(numSupply != 0)
  march.unts.u1 = numSupply
  if(numPike != 0)
  march.unts.u4 = numPike
  if(numSword != 0)
  march.unts.u5 = numSword
  if(numArcher != 0)
  march.unts.u6 = numArcher
  if(numCav != 0)
  march.unts.u7 = numCav
  if(numHeavy != 0)
  march.unts.u8 = numHeavy
  if(numWagon != 0)
  march.unts.u9 = numWagon
  if(numBallista != 0)
  march.unts.u10 = numBallista
  if(numRam != 0)
  march.unts.u11 = numRam
  if(numCat != 0)
  march.unts.u12 = numCat
    march.pid = 1234567
    march.score = 9
    march.mid = marchId.substr(1);
    march.players = {}
    march.players.u1234567 = {}
    march.players.u1234567.n = name;
    march.players.u1234567.t = 60
    march.players.u1234567.m = 5441192
    march.players.u1234567.s = 'M';
    march.players.u1234567.w = 1
    march.players.u1234567.a = 1
    march.players.u1234567.i = 5
    Seed.queue_atkinc[marchId] = march;
    Seed.players.u1234567 = march.players.u1234567;
  },

  clickFakeAttack : function (){
    var t = Tabs.F;
    var isScout = document.getElementById('fakeIsScout').checked;
    var isWild = document.getElementById('fakeIsWild').checked;
    var isFalse = document.getElementById('fakeFalse').checked;
    var secs = parseInt(document.getElementById('fakeSeconds').value);
    var mil = parseInt(document.getElementById('fakeMilitia').value);
  var numSupply = parseInt(document.getElementById('fakeSupply').value);
  var numPike = parseInt(document.getElementById('fakePike').value);
  var numSword = parseInt(document.getElementById('fakeSword').value);
  var numArcher = parseInt(document.getElementById('fakeArcher').value);
  var numCav = parseInt(document.getElementById('fakeCav').value);
  var numHeavy = parseInt(document.getElementById('fakeHeavy').value);
  var numWagon = parseInt(document.getElementById('fakeWagon').value);
  var numBallista = parseInt(document.getElementById('fakeBallista').value);
  var numRam = parseInt(document.getElementById('fakeRam').value);
  var numCat = parseInt(document.getElementById('fakeCat').value);
  var numScout = parseInt(document.getElementById('fakeScout').value);
  var name = document.getElementById('fakeName').value;
  var city = document.getElementById('fakeCity').value;
    t.createFakeAttack (city, isScout, isWild, isFalse, secs, mil, numSupply, numPike,numSword,numArcher,numCav,numHeavy,numWagon,numBallista,numRam,numCat,numScout,name);

  },
}

/********** Sample Tab (Start) **********/
Tabs.sample = {
  tabOrder : toSample,                    // order to place tab in top bar
  tabDisabled : !ENABLE_SAMPLE_TAB, // if true, tab will not be added or initialized
  tabLabel : 'Click Me',            // label to show in main window tabs
  myDiv : null,

  init : function (div){    // called once, upon script startup
    var t = Tabs.sample;
    t.myDiv = div;
    var cityName = Cities.cities[0].name;
    div.innerHTML = '<CENTER><BR>This is a sample tab implementation<BR><BR>Showing food for '+ cityName +' : <SPAN id=pbSampleFood>0</span>\
        <BR><BR>(Food is updated every 5 seconds)</center>';
  },

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.sample;
    clearTimeout (t.timer);
  },

  show : function (){         // called whenever this tab is shown
    var t = Tabs.sample;
    var food = parseInt(Seed.resources['city'+ Cities.cities[0].id]['rec'+1][0] / 3600);
    document.getElementById('pbSampleFood').innerHTML = addCommas (food);
    clearTimeout (t.timer);
    t.timer = setTimeout (t.show, 5000);
  },
}
/********** Sample  Tab (End) **********/

/********** Attack Tab (Start) **********/
function setMaxHeightScrollable (e){
  e.style.height = '100%';
  e.style.height = e.clientHeight + 'px';
  e.style.maxHeight = e.clientHeight + 'px';
  e.style.overflowY = 'auto';
}
Tabs.Attack = {
  tabDisabled : !ENABLE_ATTACK_TAB,
  tabOrder: toAttack,
  myDiv : null,
  data : {},
  MapAjax : new CMapAjax(),

  init : function (div){
    var t = Tabs.Attack;
    t.myDiv = div;
    t.myDiv.innerHTML = '<TABLE width=100% height=100% class=pdxTab><TR><TD><INPUT id=pbBarbShow type=submit value="Show All Targets" \> <BR>\
       City: <SPAN id=pbAtkCSS></span> &nbsp; &nbsp; &nbsp; Radius: <INPUT id=pbBarbDist size=3 type=text> &nbsp; &nbsp; <INPUT id=pbBarbScan type=submit value=Scan \></td></tr><TR><TD height=100%>\
       <DIV id=pbAtkDiv style="background-color:white"></div></td></tr></table>';
    t.loadTargets ();
    // TODO: Check current cities, invalidate data if city moved
    document.getElementById('pbBarbScan').addEventListener ('click', t.e_clickedScan, false);
    document.getElementById('pbBarbShow').addEventListener ('click', t.e_clickedShow, false);
    new CdispCityPicker ('pbAtkCS', document.getElementById('pbAtkCSS'), false, function (c){t.scanCity=c}, 0);
  },


  hide : function (){
        var t = Tabs.Attack;
    mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
  },

  state : 0,
  show : function (){
    var t = Tabs.Attack;
    mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
    if (t.state == 0){
      setMaxHeightScrollable (document.getElementById('pbAtkDiv'));
      t.state = 1;
    }
  },

  clearDiv : function (){
    document.getElementById('pbAtkDiv').innerHTML = '';
  },
  writeDiv : function (m){
    document.getElementById('pbAtkDiv').innerHTML += m;
  },

  loadTargets : function (){
    var t = Tabs.Attack;
DebugTimer.start();
    var totTargets = 0;
    for (var c=0; c<Cities.numCities; c++){
      var s = GM_getValue ('atk_'+ getServerId() +'_'+ Cities.cities[c].id, null);
      if (s == null)
        t.data['city'+ Cities.cities[c].id] = {cityX:Cities.cities[c].x, cityY:Cities.cities[c].y, radius:0, numTargets:0, targets:{}};
      else
        t.data['city'+ Cities.cities[c].id] = JSON2.parse (s);
      totTargets += t.data['city'+ Cities.cities[c].id].numTargets;
    }
DebugTimer.display ('Time to GM_getValue() '+ totTargets +' targets for all cities');
  },

  e_clickedScan : function (){
    var t = Tabs.Attack;
    t.clearDiv();
    var dist = parseInt(document.getElementById('pbBarbDist').value);
    if (isNaN(dist) || dist<1 || dist>35){
      t.writeDiv ("<SPAN class=boldRed>Nuh-uh, try again</span><BR>");
      return;
    }
    t.writeDiv ('Scanning map for city: '+ t.scanCity.name +'<BR>');
    t.scanBarbs (t.scanCity.id, dist);
  },

  popShow : null,

  e_clickedShow : function (){    // show all current attack data
    var t = Tabs.Attack;
    if (t.popShow == null){
      t.popShow = new CPopup ('pbbs', 0,0, 500,500, true, function (){t.popShow.destroy(); t.popShow=null;});
      t.popShow.centerMe (mainPop.getMainDiv());
    }
    var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 class=pdxTabPad>';
    for (var c=0; c<Cities.numCities; c++){
      var dat = t.data['city'+ Cities.cities[c].id];
      m += '<TR><TD colspan=3><DIV class=pdxStat2>'+ Cities.cities[c].name +' &nbsp; (radius:'+ dat.radius +' &nbsp;targets:'+ dat.numTargets  +')</div></td></tr>';
      // sort by distance ...
      var atks = [];
      for (k in dat.targets)
        atks.push (dat.targets[k]);
      atks.sort (function(a,b){return a.dist-b.dist});
      for (i=0; i<atks.length; i++)
        m += '<TR><TD>Barb Camp '+ atks[i].lvl +'</td><TD>'+ atks[i].x +','+ atks[i].y +'</td><TD> &nbsp; Dist='+ atks[i].dist.toFixed(2) +'</td></tr>';
    }
    t.popShow.getMainDiv().innerHTML = '</table></div>'+ m;
    t.popShow.getTopDiv().innerHTML = '<CENTER><B>Showing all targets in memory</b></center>';
    t.popShow.show(true);
  },

  configWriteTargets : function (cityID){
    var t = Tabs.Attack;
    var serverID = getServerId();
    DebugTimer.start();
    GM_setValue ('atk_'+ serverID +'_'+ cityID,  JSON2.stringify(t.data['city'+ cityID]));
    t.writeDiv ('** Time to GM_setValue() '+ t.data['city'+ cityID].numTargets +' targets for city: '+ (DebugTimer.getMillis()/1000) +' seconds<BR>');
  },

  oScan : {},
  scanBarbs : function (cityID, distance){   // max distance:35
    var t = Tabs.Attack;
    var city = Cities.byID[cityID];
// TODO: remember state - in case of refresh
    var x = t.MapAjax.normalize(city.x-distance);
    var y = t.MapAjax.normalize(city.y-distance);
    t.oScan = { city:city, centerX:city.x, centerY:city.y, maxDist:distance,
        minX:x, maxX:city.x+distance, minY:y, maxY:city.y+distance, curX:x, curY:y, data:[] };
    setTimeout (function(){t.MapAjax.request (t.oScan.curX, t.oScan.curY, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ t.oScan.curX +','+ t.oScan.curY +'<BR>');
  },

  e_scanDone : function (errMsg){
    var t = Tabs.Attack;
    t.data['city'+ t.oScan.city.id] = {cityX:t.oScan.city.x, cityY:t.oScan.city.y, radius:t.oScan.maxDist, numTargets:0, targets:{}};
    var dat = t.data['city'+ t.oScan.city.id];
    t.writeDiv ('Done scanning<BR>');
    for (var i=0; i<t.oScan.data.length; i++){
      var map = t.oScan.data[i];
      dat.targets[map[0] +'_'+ map[1]] = {type:'b', x:map[0], y:map[1], dist:map[2], lvl:map[3]};
      ++dat.numTargets;
    }
    t.configWriteTargets (t.oScan.city.id);
  },

  e_mapCallback : function (left, top, width, rslt){
    var t = Tabs.Attack;
    if (!rslt.ok){
      setTimeout (function(){t.e_scanDone (rslt.errorMsg)}, 0);
      t.writeDIV ('<BR>ERROR: '+ rslt.errorMsg +'<BR>');
      return;
    }
    var map = rslt.data;
    for (k in map){
      var lvl = parseInt(map[k].tileLevel);
      if (map[k].tileType==51 && !map[k].tileCityId && lvl<8) {  // if barb
        var dist = distance (t.oScan.centerX, t.oScan.centerY, map[k].xCoord, map[k].yCoord);
        if (dist <= t.oScan.maxDist){
          t.oScan.data.push ([parseInt(map[k].xCoord), parseInt(map[k].yCoord), dist, lvl]);
        }
      }
    }
    t.oScan.curX += 15;
    if (t.oScan.curX > t.oScan.maxX){
      t.oScan.curX = t.oScan.minX;
      t.oScan.curY += 15;
      if (t.oScan.curY > t.oScan.maxY){
        setTimeout (function(){t.e_scanDone (null)}, 0);
        return;
      }
    }
    var x = t.oScan.curX;
    var y = t.oScan.curY;
    setTimeout (function(){t.MapAjax.request (x,y, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ x +','+ y +'<BR>');
  },
}
/********** Attack  Tab (End) **********/

/********** Log Tab (Start) **********/
Tabs.ActionLog = {
  tabOrder: toLog,
  tabDisabled : !ENABLE_INFO_TAB,         // if true, tab will not be added or initialized
  tabLabel : 'Log',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,

  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pdxStat2>ACTION LOG</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=pdxTabLined><TR><TD></td><TD width=100%></td></table></div>';
    t.logTab = document.getElementById('pbactionlog');
    t.state = 1;
    var a = JSON2.parse(GM_getValue ('log_'+getServerId(), '[]'));
    if (matTypeof(a) == 'array'){
      t.last50 = a;
      for (var i=0; i<t.last50.length; i++)
        t._addTab (t.last50[i].msg, t.last50[i].ts);
    }
    window.addEventListener('unload', t.onUnload, false);
  },

  hide : function (){
     var t = Tabs.ActionLog;
    mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
  },

  show : function (){
     var t = Tabs.ActionLog;
    mainPop.div.style.width = 750 + 'px';
    if (Options.widescreen==true)mainPop.div.style.width = 1100 + 'px';
  },

  onUnload : function (){
    var t = Tabs.ActionLog;
    GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last50));
  },

  _addTab : function (msg, ts){
    var t = Tabs.ActionLog;
    if (t.state != 1)
      return;
    if (t.logTab.rows.length >= t.maxEntries)
      t.logTab.deleteRow(t.maxEntries-1);
    var row = t.logTab.insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML = ts;
    row.insertCell(1).innerHTML = msg;
  },

  log : function (msg){
    var t = Tabs.ActionLog;
    var ts = new Date().toTimeString().substring (0,8);
    t._addTab (msg, ts);
    while (t.last50.length >= 50)
      t.last50.shift();
    t.last50.push ({msg:msg, ts:ts});
  },
}
function actionLog (msg){
  if (!Tabs.ActionLog.tabDisabled)
    Tabs.ActionLog.log (msg);
}
/********** Log Tab (End) **********/

/********** Tabs (End) **********/



var messageNav = {
  mmFunc : null,
  mmsFunc : null,

  init : function (){
    t = messageNav;
    t.mmFunc = new CalterUwFunc ('modal_messages', [[/}\s*$/, 'setTimeout(messageNav_hook,0); }']]);

    t.mmsFunc = new CalterUwFunc ('modal_messages_send', [[/{\s*var params/i, '{\nif (modal_messages_send_hook()) return;\nvar params']]);
    unsafeWindow.messageNav_hook = messageNav.hook;
    unsafeWindow.modal_messages_send_hook = messageNav.msgSendHook;
    t.mmFunc.setEnable (true);
    t.mmsFunc.setEnable (true);
  },

  setEnable : function (tf){
  },

  isAvailable : function (){
    t = messageNav;
    return t.mmFunc.isAvailable();
  },


  hook : function (){
    if (!Options.enhanceMsging)
      return;
    var div = document.getElementById('modal_msg_view_actions');
    var but = makeButton20('Weiterleiten');
    div.appendChild (but);
  but.addEventListener ('click', messageNav.eventForward, false);
    div = document.getElementById('modal_msg_write_to').parentNode;
    div.innerHTML = '<TABLE><TR><TD class=xtab><b>An:</b> <INPUT type=text id=modal_msg_write_to></td><TD class=xtab><SPAN id=ptfwdbut></span></td></tr></table>';
    var button = makeButton20('Alle Offiziere');
    document.getElementById('ptfwdbut').appendChild (button);
    button.addEventListener ('click', function (){document.getElementById("modal_msg_write_to").value = "<offiziere>"}, false);
  },

  eventForward : function (){
    document.getElementById('modal_msg_write_subj').value = "Spezione: " + document.getElementById('modal_msg_view_subj').innerHTML.toString().stripTags();
    document.getElementById('modal_msg_write_to').value = '';
    var from = document.getElementById('modal_msg_view_from').children[0].innerHTML;
    var body = document.getElementById('modal_msg_view_body').innerHTML.replace(/\n/g, '').replace(/<br>/gi, '\n').stripTags().replace (/back$/i, '');
    document.getElementById('modal_msg_write_txt').value = '[Messaggio originale da '+ from +']\n'+ body;
    unsafeWindow.modal_messages_compose();
  },

  msgSendHook : function (){
    if (!Options.enhanceMsging)
      return;
    var to = document.getElementById("modal_msg_write_to").value.trim();
    if (to.toLowerCase() != '<offiziere>' || getMyAlliance()[0]==0)
      return false;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.toIds = getMyAlliance()[0];
    params.subject = document.getElementById("modal_msg_write_subj").value +' [LEADERMAIL]';
    params.message = document.getElementById("modal_msg_write_txt").value;
    params.type = 'alliance';
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendMessage.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
            if (rslt.ok) {
                unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.msgsent);
                document.getElementById('modal_msg_write_to').value = "";
                document.getElementById('modal_msg_write_subj').value = "";
                document.getElementById('modal_msg_write_txt').value = ""
            } else {
                unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.enterexistingname)
            }
        },
        onFailure: function () {
          unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.oopscompose)
        },
    });
    return true;
  },
}

var AttackDialog = {
  init : function (){
    var t = AttackDialog;
    t.modal_attackFunc = new CalterUwFunc ('modal_attack', [[/}\s*$/, 'attackDialog_hook(); }']]);
    unsafeWindow.attackDialog_hook = t.modalAttackHook;
    t.modal_attackFunc.setEnable (true);
  },

  setEnable : function (){
  },

  isKnightSelectAvailable : function (){
    var t = AttackDialog;
    return t.modal_attackFunc.isAvailable();
  },
  isAttackCityPickerAvailable : function (){
    var t = AttackDialog;
    return t.modal_attackFunc.isAvailable();
  },

  modalAttackHook : function (){
    var t = AttackDialog;
    if (Options.fixKnightSelect || Options.attackCityPicker){
      for (var i=1; i<6; i++)
        document.getElementById('modal_attack_tab_'+ i).addEventListener('click', t.e_changeMarchType, false);
    }
    if (Options.attackCityPicker){
      setTimeout (t.initCityPicker, 0);
    }
  },

  initCityPicker : function (){
    var t = AttackDialog;
    var div = document.getElementById('modal_attack_target_numflag'); // as of KofC version 96;
    var mySpan;
    if (div) {
      div.parentNode.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
    } else {
      var span = document.getElementById('modal_attack_target_coords');   // KofC version 116+;
      span.parentNode.parentNode.firstChild.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
    }
    new CdispCityPicker ('ptatp', document.getElementById('modal_attack_citybuts'), false, t.e_CityButton);
    var cityIdx = Cities.byID[unsafeWindow.currentcityid].idx;
    thisCityBut = document.getElementById('ptatp_'+ cityIdx);
    thisCityBut.style.opacity = '0.5';
    thisCityBut.disabled = true;
    if (document.getElementById('modal_attack_tab_4').className=='selected' || document.getElementById('modal_attack_tab_3').className=='selected')   // don't do for attack or scout
      document.getElementById('modal_attack_citybuts').style.display = 'none';
  },

  e_CityButton : function (city){
    document.getElementById('modal_attack_target_coords_x').value = city.x;
    document.getElementById('modal_attack_target_coords_y').value = city.y;
    unsafeWindow.modal_attack_update_time();
  },

  e_changeMarchType : function (evt){
    var t = AttackDialog;
    var marchType = parseInt(evt.target.id.substr(17));
    if (Options.attackCityPicker){
      if (marchType==3 || marchType==4)
        document.getElementById('modal_attack_citybuts').style.display = 'none';
      else
        document.getElementById('modal_attack_citybuts').style.display = 'inline';
    }
    if (Options.fixKnightSelect){
      var knightVal = 0;
      var selector = document.getElementById('modal_attack_knight');
      if (selector.length>1 && (marchType==4 || marchType==2))   // if 'attack' or 'reinforce'
        knightVal = 1;
      selector.selectedIndex = knightVal;
    }
  },
}
/*
var AllianceReports = {
  checkPeriod : 300,
  allianceNames : [],
  saveArfunc : unsafeWindow.allianceReports,

  init : function (){
    t = AllianceReports;
    t.enable (Options.enhanceARpts);
    t.marvFunc = new CalterUwFunc ('modal_alliance_report_view', [['getReportDisplay', 'getReportDisplay_hook2']]);
    unsafeWindow.getReportDisplay_hook2 = t.getReportDisplayHook;
    t.marvFunc.setEnable (true);
  },

  getReportDisplayHook : function (a, b){
    var x = '';
    try {
      x = unsafeWindow.getReportDisplay(a,b);
    } catch (e){
      x = 'Error formatting report: '+ e;
    }
    return x;
  },

  enable : function (tf){
    t = AllianceReports;
    if (tf)
      unsafeWindow.allianceReports = t.myAllianceReports;
    else
      unsafeWindow.allianceReports = t.saveArfunc;
  },
  myAllianceReports : function (pageNum){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    if (pageNum)
      params.pageNo = pageNum;
    params.group = "a";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
//logit (inspect (rslt, 1, 1));
        displayReports (rslt.arReports, rslt.arPlayerNames, rslt.arAllianceNames, rslt.arCityNames, rslt.totalPages);
      },
      onFailure: function (rslt) {
      },
    }, false);

    function displayReports (ar, playerNames, allianceNames, cityNames, totalPages){
      var msg = new Array();
      var myAllianceId = getMyAlliance()[0];
      msg.push ("<STYLE>.msgviewtable tbody .myCol div {margin-left:5px; overflow:hidden; white-space:nowrap; color:#000}\
            .msgviewtable tbody .myFeindlich div {font-weight:600; color:#600}\
            .msgviewtable tbody .myGray div {color:#666}\
            .msgviewtable tbody .myRein div {color:#050}\
            .msgviewtable tbody .myWarn div {font-weight:600; color:#442200}\
            </style>");
      msg.push("<div class='modal_msg_reports'>");
      var rptkeys = unsafeWindow.Object.keys(ar);
      if (matTypeof(ar) != 'array') {
//logit ('displayReports: '+ Options.allowAlterAR);        
        if (Options.allowAlterAR)
          msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        else
          msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        msg.push("<thead><tr><td width=105>Datum</td><td width=40>Typ</td><td width=150>Angreifer</td><td>Ziel</td><td>Anzeigen</td></tr></thead><tbody>");
        for (var i = 0; i < rptkeys.length; i++) {
          var rpt = ar[rptkeys[i]];
          var colClass = '"myCol"';
          rpt.marchType = parseInt(rpt.marchType);
          rpt.side0AllianceId = parseInt(rpt.side0AllianceId);
          var targetDiplomacy = getDiplomacy (rpt.side0AllianceId);
          if (rpt.marchType == 2){
            colClass = '"myCol myRein"';
          } else if (rpt.side1AllianceId != myAllianceId){
            colClass = '"myCol myFeindlich"';
          } else {
            if (parseInt(rpt.side0TileType) < 50){          // if wild
              if (parseInt(rpt.side0PlayerId) == 0)
                colClass = '"myCol myGray"';
              else
                colClass = '"myCol myWarn"';
            } else if (parseInt(rpt.side0PlayerId) == 0) {   // barb
              colClass = '"myCol myGray"';
            } else {
              if (targetDiplomacy == 'friendly')
                colClass = '"myCol myWarn"';
            }
          }
//logit (inspect (ar, 3, 1));
          msg.push ('<tr valign=top');
          if (i%2 == 0)
            msg.push(" class=stripe");
          msg.push("><TD class="+ colClass +"><div>");
          msg.push(unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime));
          msg.push ('<BR>Rpt #');
          msg.push (rpt.reportId);          
          msg.push("</div></td><TD class="+ colClass  +"><div>");
          if (rpt.marchType == 1)
            msg.push (unsafeWindow.g_js_strings.commonstr.transport);
          else if (rpt.marchType == 3)
            msg.push (unsafeWindow.g_js_strings.commonstr.scout);
          else if (rpt.marchType == 2)
            msg.push ('Reinf');
          else
            msg.push (unsafeWindow.g_js_strings.commonstr.attack);

          // attacker ...
          msg.push ("</div></td><TD class="+ colClass +"><div>");
          if (parseInt(rpt.side1PlayerId) != 0)
            msg.push(escape(playerNames["p" + rpt.side1PlayerId]))
          else
            msg.push ('?Unknown?');
            msg.push (' ');
            msg.push (coordLink(rpt.side1XCoord, rpt.side1YCoord));
            msg.push ('<BR>');
          
          if (rpt.side1AllianceId != myAllianceId){
            msg.push (allianceNames['a'+rpt.side1AllianceId]);
            msg.push (' (');
            msg.push (getDiplomacy(rpt.side1AllianceId));
            msg.push (')');
          } else {
            msg.push ('<BR>');
          }
          msg.push ('</div></td>');

          // target ...
          msg.push ("<TD class="+ colClass  +"><DIV>");
          var type = parseInt(rpt.side0TileType);

          if (type < 50){                              // wild
            msg.push(unsafeWindow.g_mapObject.types[type].toString().capitalize());
            msg.push(" Lvl " + rpt.side0TileLevel)
            if (parseInt(rpt.side0PlayerId) != 0) {   // IF OWNED, show owner ...
              msg.push (' [');
              msg.push (escape(playerNames["p" + rpt.side0PlayerId]));
              msg.push ('] ');
            }
          } else {
            if (parseInt(rpt.side0PlayerId) == 0) {   //  barb
              msg.push(unsafeWindow.g_js_strings.commonstr.barbariancamp);
              msg.push(" Lvl " + rpt.side0TileLevel)
            } else {        // city
              msg.push (escape(playerNames["p" + rpt.side0PlayerId]));
              msg.push (' - ');
              msg.push (cityNames['c'+ rpt.side0CityId]);
            }
          }
          msg.push (' ');
          msg.push (coordLink(rpt.side0XCoord, rpt.side0YCoord));
          if (rpt.side0AllianceId!=0 && rpt.side0AllianceId!=myAllianceId){
            msg.push ('<BR>');
            msg.push (allianceNames['a'+rpt.side0AllianceId]);
            msg.push (' (');
            msg.push (targetDiplomacy);
            msg.push (')');
          }


/***

MY reports, reins works ...
<div><a href="#" onclick="jQuery('#modal_msg_body').trigger('viewReinforcedReport', ['6076798','67674','Elroy','IV','13412958','Duke_Swan','6329','Erisvil',662,477]);return false;">View Report</a></div>


OK: <a onclick=" $(&quot;modal_alliance_reports_tabledivNKA&quot;).id=&quot;modal_alliance_reports_tablediv&quot;; modal_alliance_report_view(&quot;6044155&quot;,0,51,9,2282354,&quot;Jetson&quot;,&quot;M&quot;,&quot;Joe7z6bq&quot;,&quot;M&quot;,4,668,437,1299747584,0,643,407);return false;">View</a></div>
ERROR (Reinf): <a onclick=" $(&quot;modal_alliance_reports_tabledivNKA&quot;).id=&quot;modal_alliance_reports_tablediv&quot;; modal_alliance_report_view(&quot;6043602&quot;,1,51,9,13487684,&quot;Fred8135i&quot;,&quot;M&quot;,&quot;Jetson&quot;,&quot;M&quot;,2,188,696,1299746211,0,23,518);return false;">View</a>
modal_alliance_report_view("6043602",1,51,9,13487684,"Fred8135i","M","Jetson","M",2,188,696,1299746211,0,23,518);return false;'>View</a>
modal_alliance_report_view(&quot;6043602&quot;,1,51,9,13487684,&quot;Fred8135i&quot;,&quot;M&quot;,&quot;Jetson&quot;,&quot;M&quot;,2,188,696,1299746211,0,23,518);return false;">View Report</a></div>
modal_alliance_report_view("6043602",1,51,9,13487684,"Fred8135i","M","Jetson","M",2,188,696,1299746211,0,23,518);return false;">View Report</a></div>
***/

/*
          // 'view report' link ...
          if (Options.allowAlterAR)
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' modal_alliance_report_view(\"");   // ONCLICK ???
          else
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' $(\"modal_alliance_reports_tabledivNKA\").id=\"modal_alliance_reports_tablediv\"; modal_alliance_report_view(\"");   // ONCLICK ???
          msg.push(rpt.reportId);
          msg.push('",');
          if (parseInt(rpt.side1AllianceId) == parseInt(Seed.allianceDiplomacies.allianceId))
            msg.push(1);
          else
            msg.push(0);
          msg.push(",");
          msg.push(rpt.side0TileType);
          msg.push(",");
          msg.push(rpt.side0TileLevel);
          msg.push(",");
          msg.push(rpt.side0PlayerId);
          msg.push(',"');
          if (parseInt(rpt.side0PlayerId) != 0)
            msg.push(escape(playerNames["p" + rpt.side0PlayerId]));
          else
            msg.push(unsafeWindow.g_js_strings.commonstr.enemy);
          msg.push('","');
          if (parseInt(rpt.side0PlayerId) != 0)
            msg.push(escape(playerNames["g" + rpt.side0PlayerId]));
          else
            msg.push(0)
          msg.push('","');
          if (parseInt(rpt.side1PlayerId) > 0)
            msg.push(escape(playerNames["p" + rpt.side1PlayerId]));
          msg.push('","');
          if (parseInt(rpt.side1PlayerId) != 0)
            msg.push(escape(playerNames["g" + rpt.side1PlayerId]));
          msg.push('",');
          msg.push(rpt.marchType);
          msg.push(",");
          msg.push(rpt.side0XCoord);
          msg.push(",");
          msg.push(rpt.side0YCoord);
          msg.push(",");
          msg.push(rpt.reportUnixTime);
          msg.push(",");
          if (parseInt(rpt.reportStatus) == 2)
            msg.push(1);
          else
            msg.push(0);
          if (rpt.side1XCoord) {
            msg.push(",");
            msg.push(rpt.side1XCoord);
            msg.push(",");
            msg.push(rpt.side1YCoord)
          } else {
            msg.push(",,");
          }
          msg.push(");return false;'>Öffnen</a></div></td></tr>");
        }
        msg.push("</tbody></table></div>");
      }
      msg.push("</div><div id='modal_report_list_pagination'></div>");
      document.getElementById('allianceContent').innerHTML = msg.join("");
      if (pageNum) {
        unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports", pageNum)
      } else {
        unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports")
      }
    }
  },

}   // end AllianceReports singleton

/************************ Food Alerts *************************/
var FoodAlerts = {

  init : function (){
   var f = FoodAlerts;
   f.e_eachMinute();
  },

  minuteTimer : null,

  e_eachMinute : function (){
    var f = FoodAlerts;
    var now = unixTime();
      row = [];

      for(i=0; i < Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var foodleft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600;
        var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
    var totalusage = (rp[1] - usage);
        row[i] = rp[1] - usage;
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
          var msg = '';
        //  if (timeLeft<(Options.foodWarnHours*3600)) {
    if (timeLeft > 0 && (timeLeft<(Options.foodChatWarnHours*3600))) {
                msg += 'Mein Heiligtum ' + Cities.cities[i].name.substring(0,10) + ' (' +
                       Cities.cities[i].x +','+ Cities.cities[i].y + ') hat';
                msg += ' zu wenig Nahrung sie reicht noch für '+addCommasWhole(foodleft)+' ('+timestrShort(timeLeft)+') - Verbrauch: '+addCommas(usage);
                if (Options.enableFoodChatWarn==true) sendChat ("/a " + msg);
          }
      }
  f.minuteTimer = setTimeout (f.e_eachMinute, 60000);
  },
}
/************************  AutoTrain Tab ************************/
Tabs.AutoTrain = {
  tabOrder: toKaserne,
  tabLabel: 'Automatico',
  myDiv: null,
  
  
      init: function(div){
		var t = Tabs.AutoTrain;
        t.myDiv = div;
		t.myDiv.style.overflowY = 'scroll';
		
		var troops = {1:'Truppe di rifornimento:',
					  2:'Soldati semplici',
					  3:'Esploratori',
					  4:'Lancieri',
					  5:'Spadaccini',
					  6:'Arcieri',
					  7:'Cav. leggera',
					  8:'Cav. pesante',
					  9:'Carri di rifornimento',
					  10:'Baliste',
					  11:'Arieti',
					  12:'Catapulte'};  
					  
 
   
	  var m = '<DIV id=pbAT class=pdxStat>ADDESTRAMENTO AUTOMATICO</div><TABLE id=pbAT width=100% height=0% class=pdxTab><TR>';
      if (TrainOptions.Running == false) {
          m += '<TD align=left><INPUT id=pbAutoTrainState type=submit value="Auto addestramento = NO"></td>';
      }else {
  m += '<TD align=center><INPUT id=pbAutoTrainState   type=submit value="Auto addestramento = SI"></td>';
  }
  m += '<TD align=center><INPUT id=pbShowTrainHelp type=submit value="AIUTO"></td>';
      m += '</tr></table></div>';
      
      
      
      
      m += '<DIV id=pbAT class=pdxStat>AUTO ADDESTRAMENTO-IMPOSTAZIONI</div><TABLE id=pbAT width=100% height=0% class=pdxTab><TR align="center">';
       m += '<TABLE id=pbTrain width=100% height=0% class=pdxTab><TR align="left">';
      
      
      for (i=0;i<Seed.cities.length;i++){
      	  city = i+1;
 m += '<TABLE id=pbTrain width=100% height=0% class=pdxTab><TR align="left">';
  m+='<TR><TD width=30px><INPUT type=checkbox id="SelectCity'+city+'"></td><TD width = 100px><B>'+ Seed.cities[i][1] +'</b></td>';
  m += '<TD width=150px><SELECT id="TroopsCity'+city+'"><option value="Select">-- Seleziona --</options>';
	      for (y in troops) m+='<option value="'+y+'">'+troops[y]+'</option>';
	      m+='</select></td>';
m +='<TD width=100px>Min.: <INPUT id=treshold'+city+' type=text size=4 maxlength=4 value="'+ TrainOptions.Threshold[city]+'"\></td>';
		      m +='<TD width=130px><INPUT type=checkbox id="SelectMax'+city+'"> Max.: <INPUT id=max'+city+' type=text size=5 maxlength=5 value="'+ TrainOptions.Max[city]+'"\></td>';
		      m +='<TD>Usa lavoratori: ';
	        m+='<SELECT id="workers'+city+'"><option value="0">0%</options>';
 	        m+='<option value="25">25%</options>';
	        m+='<option value="50">50%</options>';
	        m+='<option value="75">75%</options>';
	        m+='<option value="100">100%</options>';
	        m+='</td></tr></table>';
		       m += '<TABLE id=pbTrain width=80% height=0% class=pdxTab><TR align="left">';
 	        m += '<TD width=40px></td><TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td>';
		      m += '<TD><INPUT id="KeepFood'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Food']+'"\></td>';
	      m += '<TD width=20px><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td>';
	      m += '<TD><INPUT id="KeepWood'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Wood']+'"\></td>';
	      m += '<TD width=20px><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td>';
	     m += '<TD><INPUT id="KeepStone'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Stone']+'"\></td>';
	      m += '<TD width=20px><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td>';
	      m += '<TD><INPUT id="KeepOre'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Ore']+'"\></td>';
				
	      m += '<TD><SELECT id="Resource'+city+'"><option value="true">Tieni:</options>';
	      m+='<option value="false">Usa:</option>';
	      m+='</select></td></tr>';     
	  }
	  m+='</table>';
      
      t.myDiv.innerHTML = m;
      
      for (i=0;i<Seed.cities.length;i++){
           city = i+1;
           document.getElementById('TroopsCity'+city).value = TrainOptions.Troops[city];
           document.getElementById('SelectCity'+city).checked = TrainOptions.Enabled[city];
		   document.getElementById('Resource'+city).value = TrainOptions.Resource[city];
		   document.getElementById('SelectMax'+city).checked = TrainOptions.SelectMax[city];
	       if (!TrainOptions.SelectMax[city]) document.getElementById('max'+city).disabled=true;
      }
       document.getElementById('pbShowTrainHelp').addEventListener('click', function(){
       	t.helpPop(this);
       }, false);
       document.getElementById('pbAutoTrainState').addEventListener('click', function(){
      	t.toggleAutoTrainState(this);
      }, false);
       
      if (Seed.cities.length >= 1){
	  document.getElementById('treshold1').addEventListener('change', function(){
 	      	   	   if (isNaN(document.getElementById('treshold1').value)) document.getElementById('treshold1').value=0 ;
 	      	       TrainOptions.Threshold['1'] = document.getElementById('treshold1').value;
 	      	       saveTrainOptions();
	      	    }, false);
 document.getElementById('SelectMax1').addEventListener('change', function(){
 	 			          TrainOptions.SelectMax['1'] = document.getElementById('SelectMax1').checked;
 	 			          if (!TrainOptions.SelectMax['1']) document.getElementById('max1').disabled=true;
	 			          else document.getElementById('max1').disabled=false;
	 			          saveTrainOptions();
 	 			    }, false);
 	 			    document.getElementById('max1').addEventListener('change', function(){
 	      	       TrainOptions.Max['1'] = document.getElementById('max1').value;
	      	       saveTrainOptions();
	      	    }, false);
 	      	    document.getElementById('workers1').addEventListener('change', function(){
 	      	       TrainOptions.Workers['1'] = document.getElementById('workers1').value;
 	      	       saveTrainOptions();
	      	    }, false);
	 			    document.getElementById('Resource1').addEventListener('change', function(){
 	 			    TrainOptions.Resource['1'] = document.getElementById('Resource1').checked;
 	 			    saveTrainOptions();
 			 }, false);
           document.getElementById('SelectCity1').addEventListener('change', function(){
               TrainOptions.Enabled['1'] = document.getElementById('SelectCity1').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity1').addEventListener('change', function(){
      	       TrainOptions.Troops['1'] = document.getElementById('TroopsCity1').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood1').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood1').value)) document.getElementById('KeepFood1').value=0 ;
      	       
               TrainOptions.Keep['1']['Food'] = parseInt(document.getElementById('KeepFood1').value);
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood1').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood1').value)) document.getElementById('KeepWood1').value=0 ;
               TrainOptions.Keep['1']['Wood'] = document.getElementById('KeepWood1').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone1').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone1').value)) document.getElementById('KeepStone1').value=0 ;
               TrainOptions.Keep['1']['Stone'] = document.getElementById('KeepStone1').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre1').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre1').value)) document.getElementById('KeepOre1').value=0 ;
               TrainOptions.Keep['1']['Ore'] = document.getElementById('KeepOre1').value;
               saveTrainOptions();
      	  }, false);
     }
     if (Seed.cities.length >= 2){
	 document.getElementById('treshold2').addEventListener('change', function(){
	     	    	if (isNaN(document.getElementById('treshold2').value)) document.getElementById('treshold2').value=0 ;
	     	         TrainOptions.Threshold['2'] = document.getElementById('treshold2').value;
 	     	         saveTrainOptions();
 	     	      }, false);
document.getElementById('SelectMax2').addEventListener('change', function(){
	 			          TrainOptions.SelectMax['2'] = document.getElementById('SelectMax2').checked;
	 			          if (!TrainOptions.SelectMax['2']) document.getElementById('max2').disabled=true;
	 			          else document.getElementById('max2').disabled=false;
	 			          saveTrainOptions();
	 			    }, false);
	 			    document.getElementById('max2').addEventListener('change', function(){
	      	       TrainOptions.Max['2'] = document.getElementById('max2').value;
 	      	       saveTrainOptions();
 	      	    }, false);
 	     	      document.getElementById('workers2').addEventListener('change', function(){
 	      	       TrainOptions.Workers['2'] = document.getElementById('workers2').value;
	      	       saveTrainOptions();
 	      	    }, false);
 	     	    	document.getElementById('Resource2').addEventListener('change', function(){
 	     	    	    TrainOptions.Resource['2'] = document.getElementById('Resource2').checked;
	     	    	    saveTrainOptions();
	     	    	 }, false);
           document.getElementById('SelectCity2').addEventListener('change', function(){
               TrainOptions.Enabled['2'] = document.getElementById('SelectCity2').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity2').addEventListener('change', function(){
      	       TrainOptions.Troops['2'] = document.getElementById('TroopsCity2').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood2').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood2').value)) document.getElementById('KeepFood2').value=0 ;
               TrainOptions.Keep['2']['Food'] = document.getElementById('KeepFood2').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood2').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood2').value)) document.getElementById('KeepWood2').value=0 ;
               TrainOptions.Keep['2']['Wood'] = document.getElementById('KeepWood2').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone2').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone2').value)) document.getElementById('KeepStone2').value=0 ;
               TrainOptions.Keep['2']['Stone'] = document.getElementById('KeepStone2').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre2').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre2').value)) document.getElementById('KeepOre2').value=0 ;
               TrainOptions.Keep['2']['Ore'] = document.getElementById('KeepOre2').value;
               saveTrainOptions();
      	  }, false);
     }
     if (Seed.cities.length >= 3){
	 document.getElementById('treshold3').addEventListener('change', function(){
	     			 if (isNaN(document.getElementById('treshold3').value)) document.getElementById('treshold3').value=0 ;
	     		     TrainOptions.Threshold['3'] = document.getElementById('treshold3').value;
 	     		     saveTrainOptions();
 	     		  }, false);
document.getElementById('SelectMax3').addEventListener('change', function(){
	 			          TrainOptions.SelectMax['3'] = document.getElementById('SelectMax3').checked;
 			          if (!TrainOptions.SelectMax['3']) document.getElementById('max3').disabled=true;
	 			          else document.getElementById('max3').disabled=false;
	 			          saveTrainOptions();
 			    }, false);
	 			    document.getElementById('max3').addEventListener('change', function(){
	      	       TrainOptions.Max['3'] = document.getElementById('max3').value;
	      	       saveTrainOptions();
	      	    }, false);
	     		  document.getElementById('workers3').addEventListener('change', function(){
	      	       TrainOptions.Workers['3'] = document.getElementById('workers3').value;
	      	       saveTrainOptions();
	      	    }, false);
 	     			document.getElementById('Resource3').addEventListener('change', function(){
 	     			    TrainOptions.Resource['3'] = document.getElementById('Resource3').checked;
	     			    saveTrainOptions();
 	     			 }, false);
           document.getElementById('SelectCity3').addEventListener('change', function(){
               TrainOptions.Enabled['3'] = document.getElementById('SelectCity3').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity3').addEventListener('change', function(){
      	       TrainOptions.Troops['3'] = document.getElementById('TroopsCity3').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood3').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood3').value)) document.getElementById('KeepFood3').value=0 ;
               TrainOptions.Keep['3']['Food'] = document.getElementById('KeepFood3').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood3').addEventListener('keyup', function(){

      	       if (isNaN(document.getElementById('KeepWood3').value)) document.getElementById('KeepWood3').value=0 ;
               TrainOptions.Keep['3']['Wood'] = document.getElementById('KeepWood3').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone3').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone3').value)) document.getElementById('KeepStone3').value=0 ;
               TrainOptions.Keep['3']['Stone'] = document.getElementById('KeepStone3').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre3').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre3').value)) document.getElementById('KeepOre3').value=0 ;
               TrainOptions.Keep['3']['Ore'] = document.getElementById('KeepOre3').value;
               saveTrainOptions();
      	  }, false);
     }  
     if (Seed.cities.length >= 4){
	 document.getElementById('treshold4').addEventListener('change', function(){
	     		     if (isNaN(document.getElementById('treshold4').value)) document.getElementById('treshold4').value=0 ;
	     		     TrainOptions.Threshold['4'] = document.getElementById('treshold4').value;
 	     		     saveTrainOptions();
 	     		  }, false);
document.getElementById('SelectMax4').addEventListener('change', function(){
 	 			          TrainOptions.SelectMax['4'] = document.getElementById('SelectMax4').checked;
	 			          if (!TrainOptions.SelectMax['4']) document.getElementById('max4').disabled=true;
 	 			          else document.getElementById('max4').disabled=false;
	 			          saveTrainOptions();
	 			    }, false);
 	 			    document.getElementById('max4').addEventListener('change', function(){
 	      	       TrainOptions.Max['4'] = document.getElementById('max4').value;
	      	       saveTrainOptions();
	      	    }, false);
 	     		  document.getElementById('workers4').addEventListener('change', function(){
	      	       TrainOptions.Workers['4'] = document.getElementById('workers4').value;
 	      	       saveTrainOptions();
	      	    }, false);
 	     			document.getElementById('Resource4').addEventListener('change', function(){
	     			    TrainOptions.Resource['4'] = document.getElementById('Resource4').checked;
	     			    saveTrainOptions();
	     			 }, false);
           document.getElementById('SelectCity4').addEventListener('change', function(){
               TrainOptions.Enabled['4'] = document.getElementById('SelectCity4').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity4').addEventListener('change', function(){
      	       TrainOptions.Troops['4'] = document.getElementById('TroopsCity4').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood4').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood4').value)) document.getElementById('KeepFood4').value=0 ;
               TrainOptions.Keep['4']['Food'] = document.getElementById('KeepFood4').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood4').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood4').value)) document.getElementById('KeepWood4').value=0 ;
               TrainOptions.Keep['4']['Wood'] = document.getElementById('KeepWood4').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone4').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone4').value)) document.getElementById('KeepStone4').value=0 ;
               TrainOptions.Keep['4']['Stone'] = document.getElementById('KeepStone4').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre4').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre4').value)) document.getElementById('KeepOre4').value=0 ;
               TrainOptions.Keep['4']['Ore'] = document.getElementById('KeepOre4').value;
               saveTrainOptions();
      	  }, false);
     }
     if (Seed.cities.length >= 5){
	 document.getElementById('treshold5').addEventListener('change', function(){
	     		     if (isNaN(document.getElementById('treshold5').value)) document.getElementById('treshold5').value=0 ;
	     		     TrainOptions.Threshold['5'] = document.getElementById('treshold5').value;
 	     		     saveTrainOptions();
	     		  }, false);
document.getElementById('SelectMax5').addEventListener('change', function(){
	 			          TrainOptions.SelectMax['5'] = document.getElementById('SelectMax5').checked;
	 			          if (!TrainOptions.SelectMax['5']) document.getElementById('max5').disabled=true;
	 			          else document.getElementById('max5').disabled=false;
	 			          saveTrainOptions();
	 			    }, false);
 	 			    document.getElementById('max5').addEventListener('change', function(){
 	      	       TrainOptions.Max['5'] = document.getElementById('max5').value;
	      	       saveTrainOptions();
	      	    }, false);
	     		  document.getElementById('workers5').addEventListener('change', function(){
	      	       TrainOptions.Workers['5'] = document.getElementById('workers5').value;
	      	       saveTrainOptions();
	      	    }, false);
	     			document.getElementById('Resource5').addEventListener('change', function(){
	     			    TrainOptions.Resource['5'] = document.getElementById('Resource5').checked;
	     			    saveTrainOptions();
	     			 }, false);
           document.getElementById('SelectCity5').addEventListener('change', function(){
               TrainOptions.Enabled['5'] = document.getElementById('SelectCity5').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity5').addEventListener('change', function(){
      	       TrainOptions.Troops['5'] = document.getElementById('TroopsCity5').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood5').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood5').value)) document.getElementById('KeepFood5').value=0 ;
               TrainOptions.Keep['5']['Food'] = document.getElementById('KeepFood5').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood5').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood5').value)) document.getElementById('KeepWood5').value=0 ;
               TrainOptions.Keep['5']['Wood'] = document.getElementById('KeepWood5').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone5').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone5').value)) document.getElementById('KeepStone5').value=0 ;
               TrainOptions.Keep['5']['Stone'] = document.getElementById('KeepStone5').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre5').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre5').value)) document.getElementById('KeepOre5').value=0 ;
               TrainOptions.Keep['5']['Ore'] = document.getElementById('KeepOre5').value;
               saveTrainOptions();
      	  }, false);
     }
     if (Seed.cities.length >= 6){
	 document.getElementById('treshold6').addEventListener('change', function(){
	     		     if (isNaN(document.getElementById('treshold6').value)) document.getElementById('treshold6').value=0 ;
 	     		     TrainOptions.Threshold['6'] = document.getElementById('treshold6').value;
 	     		     saveTrainOptions();
	     		  }, false);
document.getElementById('SelectMax6').addEventListener('change', function(){
 	 			          TrainOptions.SelectMax['6'] = document.getElementById('SelectMax6').checked;
 	 			          if (!TrainOptions.SelectMax['6']) document.getElementById('max6').disabled=true;
 	 			          else document.getElementById('max6').disabled=false;
	 			          saveTrainOptions();
	 			    }, false);
	 			    document.getElementById('max6').addEventListener('change', function(){
	      	       TrainOptions.Max['6'] = document.getElementById('max6').value;
 	      	       saveTrainOptions();
 	      	    }, false);
 	     		  document.getElementById('workers6').addEventListener('change', function(){
 	      	       TrainOptions.Workers['6'] = document.getElementById('workers6').value;
	      	       saveTrainOptions();
	      	    }, false);
 	     			document.getElementById('Resource6').addEventListener('change', function(){
	     			    TrainOptions.Resource['6'] = document.getElementById('Resource6').checked;
 	     			    saveTrainOptions();
	     			 }, false);
           document.getElementById('SelectCity6').addEventListener('change', function(){
               TrainOptions.Enabled['6'] = document.getElementById('SelectCity6').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity6').addEventListener('change', function(){
      	       TrainOptions.Troops['6'] = document.getElementById('TroopsCity6').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood6').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood6').value)) document.getElementById('KeepFood6').value=0 ;
               TrainOptions.Keep['6']['Food'] = document.getElementById('KeepFood6').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood6').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood6').value)) document.getElementById('KeepWood6').value=0 ;
               TrainOptions.Keep['6']['Wood'] = document.getElementById('KeepWood6').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone6').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone6').value)) document.getElementById('KeepStone6').value=0 ;
               TrainOptions.Keep['6']['Stone'] = document.getElementById('KeepStone6').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre6').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre6').value)) document.getElementById('KeepOre6').value=0 ;
               TrainOptions.Keep['6']['Ore'] = document.getElementById('KeepOre6').value;
               saveTrainOptions();
      	  }, false);
     }
     if (Seed.cities.length >= 7){
	 document.getElementById('treshold7').addEventListener('change', function(){
 	     		     if (isNaN(document.getElementById('treshold7').value)) document.getElementById('treshold7').value=0 ;
 	     		     TrainOptions.Threshold['7'] = document.getElementById('treshold7').value;
 	     		     saveTrainOptions();
 	     		  }, false);
document.getElementById('SelectMax7').addEventListener('change', function(){
 	 			          TrainOptions.SelectMax['7'] = document.getElementById('SelectMax7').checked;
	 			          if (!TrainOptions.SelectMax['7']) document.getElementById('max7').disabled=true;
	 			          else document.getElementById('max7').disabled=false;
	 			          saveTrainOptions();
	 			    }, false);
	 			    document.getElementById('max7').addEventListener('change', function(){
	      	       TrainOptions.Max['7'] = document.getElementById('max7').value;
	      	       saveTrainOptions();
 	      	    }, false);
 	     		  document.getElementById('workers7').addEventListener('change', function(){
	      	       TrainOptions.Workers['7'] = document.getElementById('workers7').value;
 	      	       saveTrainOptions();
	      	    }, false);
	     			document.getElementById('Resource7').addEventListener('change', function(){
 	     			    TrainOptions.Resource['7'] = document.getElementById('Resource7').checked;
	     			    saveTrainOptions();
 	     			 }, false);
           document.getElementById('SelectCity7').addEventListener('change', function(){
               TrainOptions.Enabled['7'] = document.getElementById('SelectCity7').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity7').addEventListener('change', function(){
      	       TrainOptions.Troops['7'] = document.getElementById('TroopsCity7').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood7').addEventListener('change', function(){
      	       if (isNaN(document.getElementById('KeepFood7').value)) document.getElementById('KeepFood7').value=0 ;
               TrainOptions.Keep['7']['Food'] = document.getElementById('KeepFood7').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood7').addEventListener('change', function(){
      	       if (isNaN(document.getElementById('KeepWood7').value)) document.getElementById('KeepWood7').value=0 ;
               TrainOptions.Keep['7']['Wood'] = document.getElementById('KeepWood7').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone7').addEventListener('change', function(){
      	       if (isNaN(document.getElementById('KeepStone7').value)) document.getElementById('KeepStone7').value=0 ;
               TrainOptions.Keep['7']['Stone'] = document.getElementById('KeepStone7').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre7').addEventListener('change', function(){
      	       if (isNaN(document.getElementById('KeepOre7').value)) document.getElementById('KeepOre7').value=0 ;
               TrainOptions.Keep['7']['Ore'] = document.getElementById('KeepOre7').value;
               saveTrainOptions();
      	  }, false);
     } 
  },
   helpPop : function (){
    var helpText = '<BR><DL><dt><b>1- Auto addestramento</b><dd><LI>Fare click sulle spunte per avviare gli auto addestramenti!</dd>\
    	<dd><LI>Scegliere le truppe dal menu a tendina</dd>\
        <dd><LI>Mettere il minimo di soldati per slot!</dd>\
        <dt><b>2. Risorse</b></dt>\
          <dd><LI>Tieni: mantiene le risorse selezionate</dd>\
          <dd><LI>Benutze: usa solo le risorse selezionate!</dd>\
        <dt><b>3.Accendere</b> </dt>\
          <dd><LI>Clicca Auto addestramento = SI</dd></ul>';
    var pop = new CPopup ('giftHelp', 0, 0, 550, 250, true);
    pop.centerMe (mainPop.getMainDiv());  
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Koc Power Italy Extra Lux</b>:  Auto addestramento</center>';
    pop.show (true);
  },
  toggleAutoTrainState: function(obj){
		var t = Tabs.AutoTrain;
        if (TrainOptions.Running == true) {
            TrainOptions.Running = false;
            obj.value = "Auto addestramento = NO";
        }
        else {
            TrainOptions.Running = true;
            obj.value = "Auto addestramento = SI";
        }
        saveTrainOptions();
    },
    
	show: function(){
		var t = Tabs.AutoTrain;
    },
	hide: function(){
        var t = Tabs.AutoTrain;
    },
    onUnload: function(){
    },
}

/************************ Gold Collector ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},

  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].id] = 0;
    if (Options.pbGoldEnable)
      t.setEnable (true);
  },

  setEnable : function (tf){
    var t = CollectGold;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,
  tick : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var happy = Seed.citystats['city'+ city.id].pop[2];
      var since = unixTime() - t.lastCollect['c'+city.id];
      if (happy>=Options.pbGoldHappy && since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.colHappy = happy;
        t.ajaxCollectGold (city, t.e_ajaxDone);
        break;
      }
    }
    t.timer = setTimeout (t.tick, 15000);
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
    if (rslt.ok)
      actionLog ('Raccolti '+ rslt.goldGained +' di Oro in  '+ t.colCityName +' (Felicità: '+ t.colHappy +')');
    else
      actionLog ('Error collecting gold for '+ t.colCityName +': <SPAN class=boldRed>'+ rslt.errorMsg +'</span>');
  },

  ajaxCollectGold : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/levyGold.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify)
          notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify)
          notify (rslt);
      }
    });
  },
}

/************************ Refresh Every X minutes ************************/
var RefreshEvery  = {
  timer : null,
  init : function (){
    if (Options.pbEveryMins < 1)
      Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
  },
  doit : function (){
    actionLog ('Refreshing ('+ Options.pbEveryMins +' minutes expired)');
    reloadKOC();
  }
}

/************************ Fairie Killer ************************/
var FairieKiller  = {
  saveFunc : null,
  init : function (tf){
    if (firefoxVersion.substring(0,4) == '4.0b')  // bug in firefox 4.0b10 causes syntax error with: "var func = eval ('function (){}');"
      return;
    FairieKiller.saveFunc = unsafeWindow.Modal.showModalUEP;
    FairieKiller.setEnable (tf);
  },
  setEnable : function (tf){
    if (tf)
      unsafeWindow.Modal.showModalUEP = eval ('function (a,b,c) {actionLog ("Disabilita Pop-up:  Pop-up Fiera disattivato!");}');
    else
      unsafeWindow.Modal.showModalUEP = FairieKiller.saveFunc;
  },
}

/********** facebook watchdog: runs only in 'http://apps.facebook.com/kingdomsofcamelot/*' instance!  ******/
function facebookWatchdog (){
  var INTERVAL = 50000; // wait 50 seconds minute before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);

// TODO: actionLog ?
  function watchdog (){
    try {
//      if (document.getElementById('app_content_130402594779').firstChild.firstChild.childNodes[1].firstChild.tagName!='IFRAME'){
      if (document.getElementById('app_content_130402594779') == null){
        logit ("KOC NOT FOUND!");
        KOCnotFound(5*60);
      }
    } catch (e){
      logit ("KOC NOT FOUND!");
      KOCnotFound(4*60);
    }
  }
}

function kocWatchdog (){
  var INTERVAL = 10000; // wait 30 seconds before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  function watchdog (){
logit ("KOC WATCHDOG: "+ document.getElementById('mod_maparea'));
    if (document.getElementById('mod_maparea')==null){
      logit ("KOC not loaded");
      KOCnotFound(20);
    }
  }
}

function KOCnotFound(secs){
  var div;
  var countdownTimer = null;
  var endSecs = (new Date().getTime()/1000) + secs;

  div = document.createElement('div');
  div.innerHTML = '<DIV style="font-size:18px; background-color:#a00; color:#fff"><CENTER><BR> Power has detected that KOC is not loaded<BR>\
      Refreshing in <SPAN id=pbwdsecs></span><BR><INPUT id=pbwdcan type=submit value="Cancel Refresh"><BR><BR></div>';
  document.body.insertBefore (div, document.body.firstChild);
  document.getElementById('pbwdcan').addEventListener('click', cancel, false);
  countdown();

  function countdown (){
    var secsLeft = endSecs - (new Date().getTime()/1000);
    document.getElementById('pbwdsecs').innerHTML = timestr(secsLeft);
    if (secsLeft < 0)
      reloadKOC();
    countdownTimer = setTimeout (countdown, 1000);
  }
  function cancel (){
    clearTimeout (countdownTimer);
    document.body.removeChild (div);
  }
}

var WideScreen = {
  chatIsRight : false,
  useWideMap : false,
  rail : null,

  init : function (){
    t = WideScreen;
    if (GlobalOptions.pbWideScreen){
      t.rail = searchDOM (document.getElementById('mod_maparea'), 'node.className=="maparea_rrail"', 10);
      GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important}');
      try {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'));
        document.getElementById('crossPromoBarContainer').parentNode.removeChild(document.getElementById('crossPromoBarContainer'));
      } catch (e) {
      }
    }
  },

  setChatOnRight : function (tf){
    t = WideScreen;
    if (tf == t.chatIsRight || !GlobalOptions.pbWideScreen)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1000);
	  chat.style.top = Options.chatTop;
	  chat.style.left = Options.chatLeft;
      chat.style.height = Options.chatHoehe;
      chat.style.background = 'url("'+ CHAT_BG_IMAGE +'")';
      document.getElementById('mod_comm_list1').style.height = Options.chatHoeheL;
      document.getElementById('mod_comm_list2').style.height = Options.chatHoeheL;
    } else {
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      chat.style.top = '0px';
      chat.style.left = '0px';
      chat.style.height = '';
      chat.style.background = '';
      document.getElementById('mod_comm_list1').style.height = '287px';
      document.getElementById('mod_comm_list2').style.height = '287px';
    }
    t.chatIsRight = tf;
  },

  useWideMap : function (tf) {
    t = WideScreen;
    if (tf == t.useWideMap || !GlobalOptions.pbWideScreen)
      return;
    if (tf){
      t.rail.style.display = 'none';
      document.getElementById('mapwindow').style.height = "436px";
      document.getElementById('mapwindow').style.width = Options.widewidth;
      document.getElementById('mapwindow').style.zIndex = "50";
    } else {
      t.rail.style.display = 'block';
      document.getElementById('mapwindow').style.height = "439px";
      document.getElementById('mapwindow').style.width = "760px";
      document.getElementById('mapwindow').style.zIndex = "";
    }
  },
}

var anticd = {
  isInited : false,
  KOCversion : '?',

  init: function (){
    if (this.isInited)
      return this.KOCversion;
    unsafeWindow.cm.cheatDetector.detect = eval ('function (){}');
    var scripts = document.getElementsByTagName('script');
    for (var i=0; i<scripts.length; i++){
      if (scripts[i].src.indexOf('camelotmain') >=0){
        break;
      }
    }
    if (i<scripts.length){
      var m = scripts[i].src.match (/camelotmain-(.*).js/);
      if (m)
        this.KOCversion = m[1];
    }
    this.isInited = true;
    // more coming soon :)
  },

  getKOCversion : function (){
    return this.KOCversion;
  },
}

try {
  anticd.init ();
} catch (e){
  logit ("ANTICD error: "+ e);
}

var tabManager = {
  tabList : {},           // {name, obj, div}
  currentTab : null,
  
  init : function (mainDiv){
    var t = tabManager;
    var sorter = [];
    for (k in Tabs){
      if (!Tabs[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs[k].tabOrder != null)
          sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        t.tabList[k].div = document.createElement('div');
      }
    }

    sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<TABLE cellspacing=3 class=pbMainTab><TR>';
    for (var i=0; i<sorter.length; i++){
     m += '<TD align=center class=notSel id=pbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
// m += '<TD class=spacer></td><TD align=center class=notSel id=pbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      if (i==6) m+='</tr><TR>';
    if (i==13) m+='</tr><TR>';
  if (i==20)  m+='</tr><TR>';
    }
    //m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    m+='</tr></table>';
    mainPop.getMainTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab =t.tabList[k] ;
      document.getElementById('pbtc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div;
      div.style.display = 'none';
      div.style.height = '100%';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "INIT ERROR: "+ e;
      }
    }
    
    if (t.currentTab == null)
      t.currentTab = sorter[0][1];    
    t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), true);
    t.currentTab.div.style.display = 'block';
  },
  
  hideTab : function (){
    var t = tabManager;
    t.currentTab.obj.hide();
  },
  
  showTab : function (){
    var t = tabManager;
    t.currentTab.obj.show();
  },
    
  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager;
    newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pbtc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}

function onUnload (){
  Options.pbWinPos = mainPop.getLocation();
  saveOptions();
}

function mouseMainTab (me){   // right-click on main button resets window location
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    tabManager.showTab();
    Options.pbWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.pbWinIsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.pbWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.pbWinIsOpen = true;
  saveOptions();
}

function addMyFunction (func){      // add function to run in our own scope
  unsafeWindow[func.name] = func;
}

function addUwFunction (func){      // add function to run in unsafeWindow's scope
  var scr = document.createElement('script');
  scr.innerHTML = func.toString();
  document.body.appendChild(scr);
}

function addUwFunction (func){      // add function to run in unsafeWindow's scope
  scr = document.createElement('script');
  scr.innerHTML = func.toString();
  document.body.appendChild(scr);
}

function alterUwFunction (funcName, frArray){
  try {
    funcText = unsafeWindow[funcName].toString();
    rt = funcText.replace ('function '+funcName, 'function');
    for (i=0; i<frArray.length; i++){
      x = rt.replace(frArray[i][0], frArray[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    js = funcName +' = '+ rt;
    var scr=document.createElement('script');
    scr.innerHTML=js;
    document.body.appendChild(scr);
    return true;
  } catch (err) {
    return false;
  }
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Ufficiale';
  else if (oid==2)
    return 'Vice cancelliere';
  else if (oid==1)
    return 'Cancelliere';
  return '';
}

var fortNamesShort = {
  53: "Balestre",
  55: "Trabucchi",
  60: "Trappole",
  61: "Triboli",
  62: "Spuntoni",
}

function AjaxRequest (url, opts){
  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  var ajax = null;

if (DEBUG_TRACE_AJAX) logit ("AJAX: "+ url +"\n" + inspect (opts, 3, 1));

  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");

  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();

  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (method == 'GET'){
    addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
    } else {
      if (opts.onChange) opts.onChange (ajax);
    }
  }

  ajax.open(method, url, true);   // always async!

  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);

  if (method == 'POST'){
    var a = [];
    for (k in opts.parameters)
      a.push (k +'='+ opts.parameters[k] );
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}

function MyAjaxRequest (url, o, noRetry){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

if (DEBUG_TRACE) logit (" 1a myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }

  function myFailure(){
    var o = {};
if (DEBUG_TRACE) logit ("myAjaxRequest.myFailure(): "+ inspect(rslt, 1, 1));
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (rslt.ok){
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess(): "+ inspect(rslt, 1, 1));
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess() !ok : "+ inspect(rslt, 3, 1));
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}

function getDiplomacy (aid) {
if(aid < 1 || aid == null)
return 'Allianzlos';
  if (Seed.allianceDiplomacies == null)
    return 'Neutrale';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'Amichevole';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'Ostile';
  return 'Neutrale';
};

function getDiplomacy2 (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'Neutrale';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'Amichevole';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'Ostile';
  if (aid == Seed.allianceDiplomacies.allianceId)
    return 'Alliierte';
  return 'Neutrale';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'Keine'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i<33; i++){
    if (b['pos'+i] && b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
    }
  }
  return ret;
}
// GEBÄUDE INFO
function highlightLowBuilding (noBuildings, buildingLevel, buildingPrefix){
  var ret = '';
  if (buildingLevel<9)
    ret += '<SPAN class=boldRed>';
  if (noBuildings>1)
    ret += noBuildings + ' x ';
  if (buildingPrefix)
    ret += buildingPrefix;
  ret += 'lvl ' + buildingLevel;
  if (buildingLevel<9)
    ret += '</SPAN>';
  return ret;
}

function getAllCityBuildings (cityID){
  var b = Seed.buildings[cityID];
  var castleLevel = parseInt(b['pos0'][1]);
  var noFields = 10 + 3 * castleLevel;
  if (castleLevel==11)
    noFields = 40;
  sumCastle = highlightLowBuilding(1,castleLevel);
  sumCottage = '';
  sumTavern = '';
  sumKnightsHall = '';
  sumEmbassy = '';
  sumStorehouse = '';
  sumMarket = '';
  sumAlchemyLab = '';
  sumRallyPoint = '';
  sumBarracks = '';
  sumWatchTower = '';
  sumBlacksmith = '';
  sumWorkshop = '';
  sumStable = '';
  sumReliefStation = '';
  sumWall = '';
  sumGuardian = '';
  sumInside = 0;
  sumFarm = '';
  sumSawmill = '';
  sumQuarry = '';
  sumMine = '';
  sumOutside = 0;
  arrCottage = [];
  arrBarracks = [];
  arrFarm = [];
  arrSawmill = [];
  arrQuarry = [];
  arrMine = [];
  for (var i=1; i<12; i++){
    arrCottage[i]=0;
    arrBarracks[i]=0;
    arrFarm[i]=0;
    arrSawmill[i]=0;
    arrQuarry[i]=0;
    arrMine[i]=0;
  }

  for (var i=1; i<33; i++){
    if (b['pos'+i]) {
      bname = b['pos'+i][0];
      blvl  = b['pos'+i][1];
      if (bname==5)  arrCottage[blvl]++;
      if (bname==6)  sumTavern        = highlightLowBuilding(1,blvl);
      if (bname==7)  sumKnightsHall   = highlightLowBuilding(1,blvl);
      if (bname==8)  sumEmbassy       = highlightLowBuilding(1,blvl);
      if (bname==9)  sumStorehouse    = highlightLowBuilding(1,blvl);
      if (bname==10) sumMarket        = highlightLowBuilding(1,blvl);
      if (bname==11) sumAlchemyLab    = highlightLowBuilding(1,blvl);
      if (bname==12) sumRallyPoint    = highlightLowBuilding(1,blvl);
      if (bname==13) arrBarracks[blvl]++;
      if (bname==14) sumWatchTower    = highlightLowBuilding(1,blvl);
      if (bname==15) sumBlacksmith    = highlightLowBuilding(1,blvl);
      if (bname==16) sumWorkshop      = highlightLowBuilding(1,blvl);
      if (bname==17) sumStable        = highlightLowBuilding(1,blvl);
      if (bname==18) sumReliefStation = highlightLowBuilding(1,blvl);
      if (bname==19) sumWall          = highlightLowBuilding(1,blvl);
    }
    else
      sumInside += 1;
  }
  for (var i=100; i<100+noFields; i++){
    if (b['pos'+i]) {
      bname = b['pos'+i][0];
      blvl  = b['pos'+i][1];
      if (bname==1) arrFarm[blvl]++;
      if (bname==2) arrSawmill[blvl]++;
      if (bname==3) arrQuarry[blvl]++;
      if (bname==4) arrMine[blvl]++;
    }
    else
      sumOutside += 1;
  }
  for (var i=1; i<12; i++){
    if(arrCottage[i]>0)  sumCottage+=highlightLowBuilding(arrCottage[i],i)+'<BR>';
    if(arrBarracks[i]>0) sumBarracks+=highlightLowBuilding(arrBarracks[i],i)+'<BR>';
    if(arrFarm[i]>0)     sumFarm+=highlightLowBuilding(arrFarm[i],i)+'<BR>';
    if(arrSawmill[i]>0)  sumSawmill+=highlightLowBuilding(arrSawmill[i],i)+'<BR>';
    if(arrQuarry[i]>0)   sumQuarry+=highlightLowBuilding(arrQuarry[i],i)+'<BR>';
    if(arrMine[i]>0)     sumMine+=highlightLowBuilding(arrMine[i],i)+'<BR>';
  }
  if (sumCottage.length>0)  sumCottage=sumCottage.substring (0,sumCottage.length-4);
  if (sumBarracks.length>0) sumBarracks=sumBarracks.substring (0,sumBarracks.length-4);
  if (sumFarm.length>0)     sumFarm=sumFarm.substring (0,sumFarm.length-4);
  if (sumSawmill.length>0)  sumSawmill=sumSawmill.substring (0,sumSawmill.length-4);
  if (sumQuarry.length>0)   sumQuarry=sumQuarry.substring (0,sumQuarry.length-4);
  if (sumMine.length>0)     sumMine=sumMine.substring (0,sumMine.length-4);
  if (b['pos500']) {
    blvl  = b['pos500'][1];
    bname = unsafeWindow.buildingcost['bdg' + b['pos500'][0]][0];
    bname = bname.substr(0,bname.length-8);
    sumGuardian = highlightLowBuilding(1,blvl,bname);
  }
  else
    sumInside += 1;
  if (sumInside==0)
    sumInside='<b>Ausgebaut</b>';
  else
    sumInside='<SPAN class=boldRed>Libere: '+sumInside+'</SPAN>';
  if (sumOutside==0)
    sumOutside='<b>Ausgebaut</b>';
  else
    sumOutside='<SPAN class=boldRed>Libere: '+sumOutside+'</SPAN>';
}
// GEBÄUDE INFO ENDE
// AUSBILDUNGSZEITEN
function getTroopTrainEstimates (cityID){

  var b = Seed.buildings[cityID];
  numBarracks = 0;
  maxBarracks = 0;
  totLevelsBarracks = 0;
  blacksmithLevel = 0;
  stableLevel = 0;
  workshopLevel = 0;
  for (var j=1; j<33; j++){
    if (b['pos'+j]) {
      var bname = parseInt(b['pos'+j][0]);
      var blvl = parseInt(b['pos'+j][1]);
      if (bname==13) {
        numBarracks++;
        totLevelsBarracks += parseInt(blvl);
        if (blvl>maxBarracks) maxBarracks=blvl;
      }
      if (bname==15)
        blacksmithLevel = blvl;
      if (bname==17)
        stableLevel = blvl;
      if (bname==16)
        workshopLevel = blvl;
    }
  }

  var now = unixTime();
  marshallCombatScore = 0;
  var s = Seed.knights[cityID];
  if (s) {
    s = s["knt" + Seed.leaders[cityID].combatKnightId];
    if (s){
      marshallCombatScore = s.combat;
      if (s.combatBoostExpireUnixtime > now)
        marshallCombatScore *= 1.25;
    }
  }

  geometryLevel            = parseInt(Seed.tech["tch5"]);
  eagleEyesLevel           = parseInt(Seed.tech["tch6"]);
  poisonedEdgeLevel        = parseInt(Seed.tech["tch8"]);
  metalAlloysLevel         = parseInt(Seed.tech["tch9"]);
  featherweightPowderLevel = parseInt(Seed.tech["tch10"]);
  alloyHorseshoesLevel     = parseInt(Seed.tech["tch12"]);
  fletchingLevel           = parseInt(Seed.tech["tch13"]);

  var bm = numBarracks + 0.1 * (totLevelsBarracks - numBarracks);
  var mf = marshallCombatScore / 200;
  var gf = geometryLevel/10;
  var sf = stableLevel/10;
  var wf = workshopLevel/10;
  var isf = bm * (1 + mf + gf);
  var csf = bm * (1 + mf + gf + sf);
  var ssf = bm * (1 + mf + gf + sf + wf);

  if (maxBarracks > 0) {
    rateSupplyTroop = 3600 * isf /   50;
    rateMilitiaman  = 3600 * isf /   25;
  } else {
    rateSupplyTroop = 0;
    rateMilitiaman  = 0;
  }
  if (maxBarracks > 1 && eagleEyesLevel > 0)
    rateScout = 3600 * isf /  100;
  else
    rateScout = 0;
  if (maxBarracks > 1 && poisonedEdgeLevel > 0)
    ratePikeman = 3600 * isf /  150;
  else
    ratePikeman = 0;
  if (maxBarracks > 2 && blacksmithLevel > 0 && metalAlloysLevel > 0)
    rateSwordsman = 3600 * isf /  225;
  else
    rateSwordsman = 0;
  if (maxBarracks > 3 && fletchingLevel > 0)
    rateArcher = 3600 * isf /  350;
  else
    rateArcher = 0;
  if (maxBarracks > 4 && stableLevel > 0 && alloyHorseshoesLevel > 0)
    rateCavalry = 3600 * csf /  500;
  else
    rateCavalry = 0;
  if (maxBarracks > 6 && blacksmithLevel > 4 && stableLevel > 4 && alloyHorseshoesLevel > 4)
    rateHeavyCavalry = 3600 * csf / 1500;
  else
    rateHeavyCavalry = 0;
  if (maxBarracks > 5 && stableLevel > 0 && workshopLevel > 2 && featherweightPowderLevel > 0)
    rateSupplyWagon  = 3600 * ssf / 1000;
  else
    rateSupplyWagon = 0;
  if (maxBarracks > 7 && stableLevel > 1 && workshopLevel > 4 && geometryLevel > 4 && fletchingLevel > 5)
    rateBallista = 3600 * ssf / 3000;
  else
    rateBallista = 0;
  if (maxBarracks > 8 && blacksmithLevel > 4 && stableLevel > 2 && workshopLevel > 6 && metalAlloysLevel > 7 && geometryLevel > 6)
    rateBatteringRam = 3600 * ssf / 4500;
  else
    rateBatteringRam = 0;
  if (maxBarracks > 9 && stableLevel > 1 && workshopLevel > 8 && geometryLevel > 9 && fletchingLevel > 9)
    rateCatapult = 3600 * ssf / 6000;
  else
    rateCatapult = 0;

}

function formatUnixTime (unixTimeString,format){
	var rtn = unsafeWindow.formatDateByUnixTime (unixTimeString);
/*if (format=='24hour') {
		if (rtn.substr(14,2)=='AM')
			rtn = rtn.substr(0,13);
		else
			rtn = rtn.substr(8,2)+' '+rtn.substr(0,8)+(parseInt(rtn.substr(8,2))+12)+rtn.substr(10,3);
	} */
	return rtn;
}
function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "castleBut castleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "castleBut castleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true ); // event type,bubbling,cancelable
        that.coordBoxX.dispatchEvent(evt);
        that.coordBoxY.dispatchEvent(evt);
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.x, that.city.y);
    }
  }

  function selectBut (idx){
    document.getElementById(this.id+'_'+idx).click();
  }

  function bindToXYboxes (eX, eY){
    function CboxHandler (t){
      var that = t;
      this.eventChange = eventChange;
      if (that.city){
        eX.value = that.city.x;
        eY.value = that.city.y;
      }
      function eventChange (){
      var xValue=that.coordBoxX.value.trim();
      var xI=/^\s*([0-9]+)[\s,]+([0-9]+)/.exec(xValue);
      if(xI) {
        that.coordBoxX.value=xI[1]
        that.coordBoxY.value=xI[2]
      }
        var x = parseInt(that.coordBoxX.value, 10);
        var y = parseInt(that.coordBoxY.value, 10);
        if (isNaN(x) || x<0 || x>750){
          that.coordBoxX.style.backgroundColor = '#ff8888';
          return;
        }
        if (isNaN(y) || y<0 || y>750){
          that.coordBoxY.style.backgroundColor = '#ff8888';
          return;
        }
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
        if (that.notify != null)
          that.notify (null, x, y);
      }
      return false;
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.size=2;
    eX.maxLength=10;
    eY.size=2;
    eY.maxLength=3;
    eX.style.width='2em';
    eY.style.width='2em';
    eX.addEventListener('change', bh.eventChange, false);
    eY.addEventListener('change', bh.eventChange, false);
  }

  this.selectBut = selectBut;
  this.bindToXYboxes = bindToXYboxes;
  this.coordBoxX = null;
  this.coordBoxY = null;
  this.id = id;
  this.dispName = dispName;
  this.prefixLen = id.length+1;
  this.notify = notify;
  this.selected = null;
  this.city = null;
  var m = '';
  for (var i=0; i<Cities.cities.length; i++)
    m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};

function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  var pop = new CPopup ('ptcancont', 0, 0, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>Power Italy Extra Lux</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=pdxTab2 align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptcccancel type=submit value="ANNULLA" \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value="CONTINUA" \></td></tr></table>';
  document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
  document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
  pop.show(true);
}

function setCities(){
  Cities.numCities = Seed.cities.length;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){
    city = {};
    city.idx = i;
    city.id = parseInt(Seed.cities[i][0]);
    city.name = Seed.cities[i][1];
    city.x = parseInt(Seed.cities[i][2]);
    city.y = parseInt(Seed.cities[i][3]);
    city.tileId = parseInt(Seed.cities[i][5]);
    city.provId = parseInt(Seed.cities[i][4]);
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}

function dialogRetry (errMsg, seconds, onRetry, onCancel){
  seconds = parseInt(seconds);
  var pop = new CPopup ('pbretry', 0, 0, 400,200, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>KoC Power Italy Extra Lux</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>è stato rilevato un errore:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Riaggiornamento fra <SPAN id=paretrySeconds></b></span> secondi!!<BR><BR><INPUT id=paretryCancel type=submit value="Annulla autoaggiornamento" \>';
  document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
  pop.show(true);

  document.getElementById('paretryErrMsg').innerHTML = errMsg;
  document.getElementById('paretrySeconds').innerHTML = seconds;
  var rTimer = setTimeout (doRetry, seconds*1000);
  countdown ();

  function countdown (){
    document.getElementById('paretrySeconds').innerHTML = seconds--;
    if (seconds > 0)
      cdTimer = setTimeout (countdown, 1000);
  }
  function doCancel(){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.destroy();
    onCancel ();
  }
  function doRetry (){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.show(false);
    onRetry();
  }
}

function implodeUrlArgs (obj){
  var a = [];
  for (var k in obj)
    a.push (k +'='+ encodeURI(obj[k]) );
  return a.join ('&');
}

function addUrlArgs (url, args){
  if (!args)
    return url;
  if (url.indexOf('?') < 0)
    url += '?';
  else if (url.substr(url.length-1) != '&')
    url += '&';
  if (matTypeof(args == 'object'))
    return url + implodeUrlArgs (args);
  return url + args;
}

function AjaxRequest (url, opts){
  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  var ajax = null;

if (DEBUG_TRACE_AJAX) logit ("AJAX: "+ url +"\n" + inspect (opts, 3, 1));

  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");

  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();

  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (method == 'GET'){
    addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
    } else {
      if (opts.onChange) opts.onChange (ajax);
    }
  }

  ajax.open(method, url, true);   // always async!

  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);

  if (method == 'POST'){
    var a = [];
    for (k in opts.parameters)
      a.push (k +'='+ opts.parameters[k] );
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}

function MyAjaxRequest (url, o, noRetry){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

if (DEBUG_TRACE) logit (" 1a myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }

  function myFailure(){
    var o = {};
if (DEBUG_TRACE) logit ("myAjaxRequest.myFailure(): "+ inspect(rslt, 1, 1));
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (rslt.ok){
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess(): "+ inspect(rslt, 1, 1));
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess() !ok : "+ inspect(rslt, 3, 1));
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    //if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      //rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}

function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'Neutrale';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'Amichevole';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'Ostile';
  return 'Neutrale';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'Keine'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

function distance (d, f, c, e) {
  var a = 750;
  var g = a / 2;
  var b = Math.abs(c - d);
  if (b > g)
    b = a - b;
  var h = Math.abs(e - f);
  if (h > g)
    h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};

function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i<33; i++){
    if (b['pos'+i] && b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
    }
  }
  return ret;
}

var myServerId = null;

function getServerId() {
  if (myServerId == null){
    var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
    if (m)
      myServerId = m[1];
    else
      myServerId = '??';
  }
  return myServerId;
    return m[1];
  return '';
}

function logit (msg){

  var now = new Date();
  GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

var debugWin = {
  popDebug : null,
  dbDefaultNot : 'tech,tutorial,items,quests,wilderness,wildDef,buildings,knights,allianceDiplomacies,appFriends,players',
  dbSelect : {},

  doit : function (){
    var t = debugWin;

    function syncBoxes (){
      var div = document.getElementById('dbpoplist');
      for (var i=0; i<div.childNodes.length; i++){
        if (div.childNodes[i].type && div.childNodes[i].type=='checkbox'){
          var name=div.childNodes[i].name.substr(6);
          div.childNodes[i].checked = t.dbSelect[name];
        }
      }
    }
    function clickedAll (){
      for (var k in t.dbSelect)
        t.dbSelect[k] = true;
      syncBoxes();
    }
    function clickedNone (){
      for (var k in t.dbSelect)
        t.dbSelect[k] = false;
      syncBoxes();
    }
    function clickedDefaults (){
      for (k in t.dbSelect)
        t.dbSelect[k] = true;
      var not = t.dbDefaultNot.split(',');
      for (var i=0; i<not.length; i++)
        t.dbSelect[not[i]] = false;
      syncBoxes();
    }
    function clickedShow (){
      var now = new Date();
      var myseed = unsafeWindow.Object.clone (Seed);
      var div = document.getElementById('dbpoplist');
      for (var i=0; i<div.childNodes.length; i++){
        if (div.childNodes[i].type && div.childNodes[i].type=='checkbox'){
          var name=div.childNodes[i].name.substr(6);
          if (!div.childNodes[i].checked)
            delete myseed[name];
        }
      }
      WinLog.write ("seed @ "+ unixTime()  +" ("+ now +")\n\n"+ inspect (myseed, 8, 1));
      myseed=null;
    }

    function clickedShowScripts (){
      var scripts = document.getElementsByTagName('script');
      for (var i=0; i<scripts.length; i++){
        if (scripts[i].src!=null && scripts[i].src!='')
          WinLog.write ('<A TARGET=_tab HREF="'+ scripts[i].src +'">'+ scripts[i].src +'</a>');
      }
    }

    if (t.popDebug == null){
      t.popDebug = new CPopup ('db', 0, 0, 400,500, true);
      t.popDebug.getTopDiv().innerHTML = 'DEBUG';
      t.popDebug.getMainDiv().innerHTML = '<DIV><INPUT type=submit id=dbsuball value=ALL> &nbsp; <INPUT type=submit id=dbsubnone value=NONE> &nbsp; \
        <INPUT type=submit id=dbdefaults value=DEFAULTS> &nbsp; <INPUT type=submit id=dbsubdo value=SHOW> &nbsp; <INPUT type=submit id=dbsubscripts value=SCRIPTS></div>\
        <DIV id=dbpoplist style="max-height:400px; height:400px; overflow-y:auto"></div>';
      var div = document.getElementById('dbpoplist');
      for (var k in Seed)
        t.dbSelect[k] = true;
      var not = t.dbDefaultNot.split(',');
      for (var i=0; i<not.length; i++)
        t.dbSelect[not[i]] = false;
      var m = [];
      for (k in t.dbSelect){
        m.push ('<INPUT type=checkbox ');
        m.push ('name="dbpop_');
        m.push (k);
        m.push ('"> &nbsp; ');
        m.push (k);
        m.push ('<BR>');
      }
      div.innerHTML = m.join ('');
      document.getElementById('dbsuball').addEventListener('click', clickedAll, false);
      document.getElementById('dbsubnone').addEventListener('click', clickedNone, false);
      document.getElementById('dbdefaults').addEventListener('click', clickedDefaults, false);
      document.getElementById('dbsubdo').addEventListener('click', clickedShow, false);
      document.getElementById('dbsubscripts').addEventListener('click', clickedShowScripts, false);
      syncBoxes();
    }
    t.popDebug.show (true);
  },
}
function saveTrainOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('TrainOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(TrainOptions));}, 0);
}
function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('Options_'+serverID, JSON2.stringify(Options));}, 0);
}
function saveAttackOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('AttackOptions_'+serverID, JSON2.stringify(AttackOptions));}, 0);
}
function saveCrestOptions (){
  var serverID = getServerId();
 setTimeout (function (){GM_setValue ('CrestOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(CrestOptions));}, 0);
}
function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('Options_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          Options[k][kk] = opts[k][kk];
      else
        Options[k] = opts[k];
    }
  }
}

function readAttackOptions (){
  var serverID = getServerId();
  s = GM_getValue ('AttackOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          AttackOptions[k][kk] = opts[k][kk];
      else
        AttackOptions[k] = opts[k];
    }
  }
}
function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}
function readCrestOptions (){
  var serverID = getServerId();
  var serverID = getServerId();
   s = GM_getValue ('CrestOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          CrestOptions[k][kk] = opts[k][kk];
      else
        CrestOptions[k] = opts[k];
    }
  }
}

function readTrainingOptions (){
  var serverID = getServerId();
  s = GM_getValue ('TrainOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          TrainOptions[k][kk] = opts[k][kk];
      else
        TrainOptions[k] = opts[k];
    }
  }
}

var myServers = {   // incomplete, untested
  serverlist : null,

  get : function (notify){
    if (myServers.serverlist){
      notify (myServers.serverlist);
      return;
    }
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/myServers.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function(rslt) {
logit (inspect (rslt, 3, 1));
        if (notify)
          notify (myServers.serverlist);
      },
      onFailure: function(rslt) {
      }
    });
  },
};

function createButton (label){
  var a=document.createElement('a');
  a.className='button20';
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text);
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
//if (ee.tagName=='DIV') logit ("CHILD: "+  ee.tagName +' : '+ ee.className+' : '+ ee.id);
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      //gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}
function AddSubTabLink(text, eventListener, id) {
  var a = createButton (text,'botbutton');
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      //gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (id != null)
      a.id = id;
    return a;
  }
  return null;
}
function coordLink (x, y){
  var m = [];
  m.push ('(<a onclick="ptGotoMapHide (');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('); return false">');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('</a>)');
  return m.join('');
}

unsafeWindow.ptGotoMapHide = function (x, y){
  try {
    unsafeWindow.Modal.hideModal();
  } catch (e){ }
  try {
    Modal.hideModal();
  } catch (e){ }
  unsafeWindow.ptGotoMap (x, y);
}

unsafeWindow.ptGotoMap = function (x, y){
  if (Options.hideOnGoto)
    hideMe ();
  setTimeout (function (){
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    var a = document.getElementById("mod_views").getElementsByTagName("a");
    for (var b = 0; b < a.length; b++) {
        a[b].className = ""
    }
    document.getElementById('mod_views_map').className = "sel";
    document.getElementById("maparea_city").style.display = 'none';
    document.getElementById("maparea_fields").style.display = 'none';
    document.getElementById("maparea_map").style.display = 'block';
    unsafeWindow.tutorialClear()
  }, 0);
};

unsafeWindow.PTscout = function (x, y){
  setTimeout (function (){
    if (Options.hideOnGoto)
    hideMe ();
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    unsafeWindow.changeview_map(document.getElementById('mod_views_map'));
  unsafeWindow.modal_attack(3,x,y);
  }, 0);
};
/************** ChatPane **********/
var ChatPane = {
    init : function(){
      var t = ChatPane;
     setInterval(t.HandleChatPane, 2500);
    },
 HandleChatPane : function() {
     var DisplayName = GetDisplayName();
     var AllianceChatBox=document.getElementById('mod_comm_list2');
  if(AllianceChatBox){
      var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
       if(chatPosts){
         for (var i = 0; i < chatPosts.snapshotLength; i++) {
          thisPost = chatPosts.snapshotItem(i);
        if(Options.HelpRequest){
            var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
             if(postAuthor.snapshotItem(0)){
              var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
            if(postAuthorName != DisplayName){
                 var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
                if(helpAllianceLinks){
                   for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
                    thisLink = helpAllianceLinks.snapshotItem(j);
                     var alreadyClicked = thisLink.getAttribute("clicked");
                    if(!alreadyClicked){
                    thisLink.setAttribute('clicked', 'true');
                    var myregexp = /(claimAllianceChatHelp\(.*\);)/;
                      var match = myregexp.exec(thisLink.getAttribute("onclick"));
                      if (match != null) {
                        onclickCode = match[0];
                      if(true){
                        DoUnsafeWindow(onclickCode);
                        }
                      }
                    }
                   }
                }
              }
            }
          }
          // Hide alliance requests in chat
          if(Options.DeleteRequest){
            var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            if(helpAllianceLinks){
               for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
                 thisLink = helpAllianceLinks.snapshotItem(j);
                thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
              }
             }
          // Hide alliance reports in chat

             var myregexp1 = /Du bist Hilfe Nr. # [1-5] von 5 bei/i;
            var myregexp2 = /\'s braucht keine Hilfe\./i;
            var myregexp3 = /\'s wurde schon beendet\./i;
             var myregexp4 = /\'s hat schon die maximal mögliche Hilfe erhalten\./i;

            if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4)) {
              thisPost.parentNode.removeChild(thisPost);
            }
          }
        }
       }
    }
    },

}

/**********************************************************************************/

var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcOld = null;
  this.funcNew = null;
  try {
    var x = funcName.split('.');
    var f = unsafeWindow;
    for (var i=0; i<x.length; i++)
      f = f[x[i]];
    this.funcOld = f;
    var rt = f.toString().replace ('function '+ funcName, 'function');
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)  // if not found
        return;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
  }

  function setEnable (tf){
    if (t.funcNew == null)
      return;
    if (t.isEnabled != tf){
      if (tf){
        var scr = document.createElement('script');    // <== need to remove on disable!!!
        scr.innerHTML = funcName +' = '+ t.funcNew;
        document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 500);
        t.isEnabled = true;
      } else {
      var x = funcName.split('.');
      var f = unsafeWindow;
      for (var i=0; i<x.length-1; i++)
        f = f[x[i]];
      f[x[x.length-1]] = this.funcOld;
        t.isEnabled = false;
      }
    }
  }
  function isAvailable (){
    if (t.funcNew == null)
      return false;
    return true;
  }
};

function makeButton20 (label){
  var a = document.createElement('a');
  a.className = "button20 ptButton20";
  var s = document.createElement('span');
  s.innerHTML = label;
  a.appendChild (s);
  return a;
}

function strButton20 (label, tags){
  if (tags == null)
    tags = '';
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}

function strButton14 (label, tags){
  if (tags == null)
    tags = '';
  return ('<A class="button14 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a>' );
}

function reloadKOC (){
  var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+getServerId();
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ getServerId() +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}

function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }
  for (var k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');
}

function cityStatusString (cs){
  if (cs==4)
    return 'Vacation';
  if (cs==3)
    return 'Truce';
  if (cs==2)
    return 'Beg Protection';
  return 'Normal';
}

function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

Chat = {
  params : null,

  sendWhisper : function (msg, who, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 3;
    this.params.name = who;
    this._sendit (msg, notify);
  },

  sendGlobal : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 1;
    this._sendit (msg, notify);
  },

  sendAlliance : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 2;
    this._sendit (msg, notify);
  },

  _sendit : function (msg, notify){
    function strip(s) {
       return s.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    this.params.comment = strip (msg);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendChat.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: this.params,
      onSuccess: function(transport) {
        if (notify)
          notify ();
      },
      onFailure: function(transport) {
        if (notify)
          notify ();
      }
    });
  },
}

function doDefTrain (cityId, unitId, num, notify){
  var time = unsafeWindow.modal_walls_traintime(unitId, num);
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.cid = cityId;
  params.type = unitId;
  params.quant = num;
  params.items = 0;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fortify.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok) {
          unsafeWindow.seed.queue_fort["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, rslt.fortifyId]);
          if (notify != null)
            setTimeout (function (){notify(null);}, 500);
        } else {
          if (notify != null)
            setTimeout (function (){notify(rslt.errorMsg);}, 500);
        }
      },
      onFailure: function () {
        if (notify != null)
          notify(rslt.errorMsg);
      },
  });
}

function doTrain (cityId, unitId, num, notify){
  var time = unsafeWindow.modal_barracks_traintime(unitId, num);
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.cid = cityId;
  params.type = unitId;
  params.quant = num;
  params.items = 0;

  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function(rslt) {
      if (rslt.ok) {
        for (var i = 1; i < 5; i++) {
          unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(num)
        }
        unsafeWindow.seed.citystats["city" + cityId].gold[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].gold[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][5]) * parseInt(num);
        unsafeWindow.seed.citystats["city" + cityId].pop[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].pop[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][6]) * parseInt(num);
        unsafeWindow.seed.queue_unt["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]);
        if (notify != null)
          setTimeout (function (){notify(null);}, 500);
      } else {
        if (notify != null){
          setTimeout (function (){notify(rslt.errorMsg);}, 500);
        }
      }
    },
    onFailure: function(o) {
      if (notify != null)
        notify(rslt.errorMsg);
    }
  });
}

function getAbsoluteOffsets (e){
  ret = {left:0, top:0};
  while (e.offsetParent){
    if (e.style.position == 'absolute')
      break;
    ret.left += e.offsetLeft;
    ret.top += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

DebugTimer = {
  startTime : 0,
  start : function (){
    now = new Date();
    DebugTimer.startTime = now.getTime();
  },
  getMillis : function (){
    now = new Date();
    return now.getTime() - DebugTimer.startTime;
  },
  display : function (label, noReset){
    now = new Date();
    elapsed = now.getTime() - DebugTimer.startTime;
    logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};

function debugPos  (e){
  return '['+ e.tagName +'] client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
}

function CwaitForElement (id, timeout, notify){
  this.check = check;
  this.end = new Date().getTime() + timeout;
  var t = this;
  this.check();
  function check(){
    if (document.getElementById (id))
      notify (true);
    else if (new Date().getTime() > t.end)
      notify (false);
    else
      setTimeout (t.check, 250);
  }
}

function clickWin (win,obj,evtName) {
  var evt = win.document.createEvent("MouseEvents");
  evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  return !obj.dispatchEvent(evt);
}

function debugElement  (e){
  var x = unsafeWindow.Object.clone (e.wrappedJSObject);
  x.innerHTML = '';
  x.innerText = '';
  x.textContent = '';
  return inspect (x, 1, 1);
}

function searchDOM (node, condition, maxLevel, doMult){
  var found = [];
  eval ('var compFunc = function (node) { return ('+ condition +') }');
  doOne(node, 1);
  if(!doMult){
    if (found.length==0)
      return null;
    return found[0];
  }
  return found;
  function doOne (node, curLevel){
    try {
      if (compFunc(node))
        found.push(node);
    } catch (e){
    }
    if (!doMult && found.length>0)
      return;
    if (++curLevel<maxLevel && node.childNodes!=undefined)
      for (var c=0; c<node.childNodes.length; c++)
        doOne (node.childNodes[c], curLevel);
  }
}

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetLeft;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

function DOMtree (e, levels){
  var m = [];
  level (e, levels, 0);

  function level (e, levels, cur){
    try {
      for (var i=0; i<cur; i++)
        m.push('  ');
      if (!e.tagName)
        m.push ('?');
      else
        m.push (e.tagName);
      if (e.id){
        m.push (' id=');
        m.push (e.id);
      }
      if (e.name){
        m.push (' name=');
        m.push (e.name);
      }
      if (e.className){
        m.push (' class=');
        m.push (e.className);
      }
      if (e.style && e.style.display && e.style.display.indexOf('none')>0)
        m.push (' hidden');
       m.push ('\n');
      if (cur < levels){
        for (var c=0; c<e.childNodes.length; c++){
          level (e.childNodes[c], levels, cur+1);
        }
      }
    } catch (e) {
      m.push ('UNAVAILBLE!\n');
    }
  }
  return m.join('');
}

function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x;
}

function parseIntZero (n){
  n = n.trim();
  if (n == '')
    return 0;
  return parseInt(n, 10);
}

function getFirefoxVersion (){
  var ver='', i;
  var ua = navigator.userAgent;
  if (ua==null || (i = ua.indexOf('Firefox/'))<0)
    return;
  return ua.substr(i+8);
}
function htmlTitleLine (msg){
  return '<TABLE width=100% cellspacing=0><TR><TD style="padding:0px" width=50%><HR></td><TD style="padding:0px">[ '+ msg +' ]</td><TD style="padding:0px" width=50%><HR></td></tr></table>';
}

var WinManager = {
  wins : {},    // prefix : CPopup obj
  didHide : [],


  get : function (prefix){
    var t = WinManager;
    return t.wins[prefix];
  },

  add : function (prefix, pop){
    var t = WinManager;
    t.wins[prefix] = pop;
    if (unsafeWindow.cpopupWins == null)
      unsafeWindow.cpopupWins = {};
    unsafeWindow.cpopupWins[prefix] = pop;
  },

  hideAll : function (){
    var t = WinManager;
    t.didHide = [];
    for (k in t.wins){
      if (t.wins[k].isShown()){
        t.didHide.push (t.wins[k]);
        t.wins[k].show (false);
      }
    }
  },
  restoreAll : function (){
    var t = WinManager;
    for (var i=0; i<t.didHide.length; i++)
      t.didHide[i].show (true);
  },

  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
    delete unsafeWindow.cpopupWins[prefix];
  }
}

function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 111111;

  // protos ...
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainTopDiv = getMainTopDiv;
  this.getMainDiv = getMainDiv;
  this.getLayer = getLayer;
  this.setLayer = setLayer;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.focusMe = focusMe;
  this.isShown = isShown;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;
  this.autoHeight = autoHeight;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;

  var t = this;
  this.div.className = 'CPopup '+ prefix +'_CPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'hidden';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';

  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;

  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td></tr>\
      <TR><TD height=100% valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);

  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);

  function e_divClicked (){
    t.focusMe();
  }
  function e_XClose (){
    t.show(false);
    if (t.onClose != null)
      t.onClose();
  }
  function autoHeight (onoff){
    if (onoff)
      t.div.style.height = '';
    else
      t.div.style.height = t.div.style.maxHeight;
  }
  function focusMe (){
    t.setLayer(5);
    for (k in unsafeWindow.cpopupWins){
      if (k != t.prefix)
        unsafeWindow.cpopupWins[k].unfocusMe();
    }
  }
  function unfocusMe (){
    t.setLayer(-5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }
  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }
  function destroy (){
    document.body.removeChild(t.div);
    WinManager.delete (t.prefix);
  }
  function centerMe (parent){
    if (parent == null){
      var coords = getClientCoords(document.body);
    } else
      var coords = getClientCoords(parent);
    var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
    var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
    if (x<0)
      x = 0;
    if (y<0)
      y = 0;
    t.div.style.left = x +'px';
    t.div.style.top = y +'px';
  }
  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }
  function getMainTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }
  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }
  function isShown (){
    return t.div.style.display == 'block';
  }
  function show(tf){
    if (tf){
      t.div.style.display = 'block';
      t.focusMe ();
    } else {
      t.div.style.display = 'none';
    }
    return tf;
  }
  function toggleHide(t){
    if (t.div.style.display == 'block') {
      return t.show (false);
    } else {
      return t.show (true);
    }
  }
}

function CWinDrag (clickableElement, movingDiv, enabled) {
  var t=this;
  this.setEnable = setEnable;
  this.setBoundRect = setBoundRect;
  this.debug = debug;
  this.dispEvent = dispEvent;
  this.lastX = null;
  this.lastY = null;
  this.enabled = true;
  this.moving = false;
  this.theDiv = movingDiv;
  this.body = document.body;
  this.ce = clickableElement;
  this.moveHandler = new CeventMove(this).handler;
  this.outHandler = new CeventOut(this).handler;
  this.upHandler = new CeventUp(this).handler;
  this.downHandler = new CeventDown(this).handler;
  this.clickableRect = null;
  this.boundRect = null;
  this.bounds = null;
  this.enabled = false;
  if (enabled == null)
    enabled = true;
  this.setEnable (enabled);

  function setBoundRect (b){    // this rect (client coords) will not go outside of current body
    this.boundRect = boundRect;
    this.bounds = null;
  }

  function setEnable (enable){
    if (enable == t.enabled)
      return;
    if (enable){
      clickableElement.addEventListener('mousedown',  t.downHandler, false);
      t.body.addEventListener('mouseup', t.upHandler, false);
    } else {
      clickableElement.removeEventListener('mousedown', t.downHandler, false);
      t.body.removeEventListener('mouseup', t.upHandler, false);
    }
    t.enabled = enable;
  }

  function CeventDown (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.bounds == null){

        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
      }
      if (me.button==0 && t.enabled){
        t.body.addEventListener('mousemove', t.moveHandler, true);
        t.body.addEventListener('mouseout', t.outHandler, true);
        t.lastX = me.clientX;
        t.lastY = me.clientY;
        t.moving = true;
      }
    }
  }

  function CeventUp  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0){
        t.moveHandler (me);
      }
    }
  }

  function CeventMove (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.enabled && !t.wentOut){
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
        if (newTop < t.bounds.top){     // if out-of-bounds...
          newTop = t.bounds.top;
          _doneMoving(t);
        } else if (newLeft < t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } else if (newLeft > t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } else if (newTop > t.bounds.bot){
          newTop = t.bounds.bot;
          _doneMoving(t);
        }
        t.theDiv.style.top = newTop + 'px';
        t.theDiv.style.left = newLeft + 'px';
        t.lastX = me.clientX;
        t.lastY = me.clientY;
      }
    }
  }

  function debug  (msg, e){
    logit ("*************** "+ msg +" ****************");
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
  }

  function dispEvent (msg, me){
    logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
  }
}

function inspect(obj, maxLevels, level, doFunctions){
  var str = '', type, msg;
  if(level == null)  level = 0;
  if(maxLevels == null) maxLevels = 1;
  if(maxLevels < 1)
      return 'Inspect Error: Levels number must be > 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i<level; i++)
    indent += '  ';
  for(property in obj) {
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
    }
    catch(err) {
      // Is there some properties in obj we can't access? Print it red.
      if(typeof(err) == 'string') msg = err;
      else if(err.message)        msg = err.message;
      else if(err.description)    msg = err.description;
      else                        msg = 'Unknown';
      str += '(Error) ' + property + ': ' + msg +"\n";
    }
  }
  str += "\n";
  return str;
}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) {
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}
String.prototype.StripQuotes = function() {
return this.replace(/"/g,'');
}
String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039' };

String.prototype.htmlSpecialChars = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}

String.prototype.htmlSpecialCharsDecode = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret = ret.split(this.entityTrans[k]).join(k);
  return ret;
}

String.prototype.stripTags = function(){
  return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

function matTypeof (v){
  if (v == undefined)
    return 'undefined';
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
//    else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object Array]')
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}
function updateraidbutton(text, id)
{
var but=document.getElementById(id);
but.innerHTML = '<span style="color: #ff6">'+text+'</span>';
 //but.innerHTML='<span style="color: #ff6">'+ text +'</span>';
}
function tbodyScroller (tbody, maxHeight){
  tbody.style.maxHeight = '';
  tbody.style.height = '';
  tbody.style.overflowX = 'hidden';
  if (parseInt(tbody.clientHeight) > maxHeight){
    tbody.style.height = maxHeight + 'px';
    tbody.style.maxHeight = maxHeight + 'px';
    tbody.style.overflowY = 'auto';
  }
}

function getRemainingHeight (e, myDiv){
  var ec = getClientCoords(e);
  var cc = getClientCoords(myDiv);
  return myDiv.clientHeight - (ec.y - cc.y);
}

function addCommasInt(n){
  nStr = parseInt(n) + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) {
    nStr = nStr.replace(rgx, '$1' + ',' + '$2');
  }
  return nStr;
}

function addCommas(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
function thouormil(value){
  if (value==0)
    return 0;
  else if ((value%1000000)==0)
    return addCommas(value/1000000)+'m';
  else if ((value%1000)==0)
    return addCommas(value/1000)+'k';
  else
    return addCommas(value);
}
function addCommasWhole(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}

function htmlSelector (valNameArray, curVal, tags){
  m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }
  for (k in valNameArray){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameArray[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');

}
function getRallyPointLevel(cityID, returnLogicalLevel) {
  var RallypointLevel = 0;
  for (var o in Seed.buildings[cityID]){
    if (parseInt(Seed.buildings[cityID][o][0]) == 12){
      RallypointLevel=parseInt(Seed.buildings[cityID][o][1]);
      break;
    }
  }
  if (returnLogicalLevel && RallypointLevel == 11)
    RallypointLevel = 15;
  return RallypointLevel;
}
function unixTime (){
  return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}

function htmlOptions (a, curVal){
  m = '';
  for (k in a)
    m += '<OPTION value="'+ k +'"'+ (k==curVal?' SELECTED':'')  +'>'+ a[k] +'</option>';
  return m;
}

function getFunctionName (func){
  var name=/\W*function\s+([\w\$]+)\(/.exec(func);
  if (!name)
    return '';
  return name[1];
}

function findAllBetween (txt, find1, find2){
  var m = [];
  var last = 0;
  while ( (i1=txt.indexOf(find1, last))>=0 && (i2=txt.indexOf (find2, i1))>=0 ) {
    m.push (txt.substring(i1+find1.length, i2));
    last = i2 + find2.length;
  }
  return m;
}

function strUpTo (s, find){
  var i = s.indexOf(find);
  if (i > 0)
    return s.substr(0, i);
  return s;
}

function timestrShort(time) {
  time = parseInt (time);
  if (time > 86400){
    var m = [];
    time /= 3600;
    m.push (parseInt(time/24));
    m.push ('d ');
    m.push (parseInt(time%24));
    m.push ('h ');
    return m.join ('');
  } else
    return timestr (time);
}

function timestr(time, full) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  t + 's';
  if (t > 86400){
    m.push (parseInt(t/86400));
    m.push ('d ');
    t %= 86400;
  }
  if (t>3600 || time>3600){
    m.push (parseInt(t/3600));
    m.push ('h ');
    t %= 3600;
  }
  m.push (parseInt(t/60));
  m.push ('m');
  if (full || time<=3600 ){
    m.push (' ');
    m.push (t%60);
    m.push ('s');
  }
  return m.join ('');
}

function timestrcolon(time) {
	seconds = parseInt (time);
	var t, u;
	var secs86400 = seconds % 86400;
	var numhours = Math.floor(secs86400 / 3600);
	t = '00' + numhours;
	t = t.substr(t.length-2,2) + ':';
	var numminutes = Math.floor((secs86400 % 3600) / 60);
	u = '00' + numminutes;
	t += u.substr(u.length-2,2) + ':';
	var numseconds = (secs86400 % 3600) % 60;
	u = '00' + numseconds;
	t += u.substr(u.length-2,2);
	return t;
}
var WINLOG_MAX_ENTRIES = 1000;     // TODO

var WinLog = {
  state : null,
  win: null,
  eOut : null,
  lastE : null,
  enabled : true,
  reverse : true,
  busy : false,
isOpening : false,

  open : function (){
    var t = WinLog;

    function eventButClear(){
      var t = WinLog;
      t.lastE = null;
      t.eOut.innerHTML ='';
    }
    function eventButReverse(){
      var t = WinLog;
      if (t.busy)
        return;
      t.busy = true;
      if (t.reverse){
        t.win.document.getElementById('wlRev').value= 'Top';
        t.reverse = false;
      } else{
        t.win.document.getElementById('wlRev').value= 'Bottom';
        t.reverse = true;
      }
      var n = t.eOut.childNodes.length;
      if (n < 2)
        return;
      for (i=n-2; i>=0; i--){
        t.eOut.appendChild (t.eOut.childNodes[i]);
      }
      t.busy = false;
    }

    if (!t.win || t.win.closed){
t.isOpening = true;
// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window? huh?
      t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
t.isOpening = false;
t.state = null;
    }

    if (t.state == null){
      t.win.document.body.innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; height:100%; max-height:100%"></div></body>';
      t.win.document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      t.win.document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  t.win.document.getElementById('wlOut');
      t.lastE = null;
      t.state = 1;
    }
  },

  writeText : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.write (msg.htmlSpecialChars());
  },

  write : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.open();
    var te = document.createElement('pre');
    var now = new Date();
    var m = [];
    var millis = now.getMilliseconds();
    m.push (now.toTimeString().substring (0,8));
    m.push ('.');
    if (millis<100)
      m.push('0');
    if (millis<10)
      m.push('0');
    m.push(millis);
    m.push (': ');
    m.push (msg);
    te.innerHTML = m.join('');
    if (t.reverse){
      if (t.lastE == null){
        t.eOut.appendChild(te);
        t.lastE = te;
      } else {
        t.eOut.insertBefore(te, t.lastE);
      }
      var hr = document.createElement('hr');
      t.eOut.insertBefore(hr, te);
      t.lastE = hr;
    } else {
      t.eOut.appendChild(te);
      t.eOut.appendChild(document.createElement('hr'));
    }
  },

};

function getMarchInfo (){
  var ret = {};

  ret.marchUnits = [];
  ret.returnUnits = [];
  ret.resources = [];
  for (i=0; i<13; i++){
    ret.marchUnits[i] = 0;
    ret.returnUnits[i] = 0;
  }
  for (i=0; i<5; i++){
    ret.resources[i] = 0;
  }

  var now = unixTime();

  for(i=0; i<Cities.numCities; i++) {   // each city
    cityID = 'city'+ Cities.cities[i].id;
    for (k in Seed.queue_atkp[cityID]){   // each march
      march = Seed.queue_atkp[cityID][k];
      if (typeof (march) == 'object'){
        for (ii=0; ii<13; ii++){
          ret.marchUnits[ii] += parseInt (march['unit'+ ii +'Count']);
          ret.returnUnits[ii] += parseInt (march['unit'+ ii +'Return']);
        }
        for (ii=1; ii<5; ii++){
          ret.resources[ii] += parseInt (march['resource'+ ii]);
        }
          ret.resources[0] += parseInt (march['gold']);
      }
// TODO: fixup completed marches
// TODO: Assume transport is complete ?
    }
  }
  return ret;
}

//
function getMarchInfo2 (cityID){
  var ret = {};

 ret.marchUnits = [];
 ret.returnUnits = [];
 ret.resources = [];
  for (i=0; i<13; i++){
    ret.marchUnits[i] = 0;
    ret.returnUnits[i] = 0;
  }
  for (i=0; i<5; i++){
   ret.resources[i] = 0;
  }

for (k in Seed.queue_atkp[cityID]){   // each march
      march = Seed.queue_atkp[cityID][k];
if(march.marchType != 5){
 if (typeof (march) == 'object'){
for (ii=0; ii<13; ii++){
ret.marchUnits[ii] += parseInt (march['unit'+ ii +'Count']);
ret.returnUnits[ii] += parseInt (march['unit'+ ii +'Return']);
}
for (ii=1; ii<5; ii++){
 ret.resources[ii] += parseInt (march['resource'+ ii]);
}
 ret.resources[0] += parseInt (march['gold']);
}
}
}
  return ret;
}

var MessageCounts = {
  messagesNotifyFunc : null,

  init : function (){
  var t = MessageCounts;
  //MOD ALTER UWF
    t.messagesNotifyFunc = new CalterUwFunc ('messages_notify_bug', [
    ['$("chrome_messages_notify").innerHTML = a;', 'msgCount_hook(a);'],
    ['$("chrome_messages_notify").removeClassName("noCount");', ''],
    ['$("chrome_messages_notify").addClassName("noCount");','msgCount_hook(a);']
  ]);
  if (t.messagesNotifyFunc.isAvailable()){
    unsafeWindow.msgCount_hook = t.msgCount_hook;
    e = document.getElementById('chrome_messages_notify');
    span = document.createElement('span');
    span.id = 'chrome_messages_notify_Msg';
    e.parentNode.insertBefore (span, e);
    span.style.visibility = 'hidden';
      if (Options.fixMsgCount){
        t.enable (true);
        setTimeout (unsafeWindow.messages_notify_bug, 1000);
      }
    }
  },

  msgCount_hook : function (a) {
    var l = document.getElementById('chrome_messages_notify_Msg');
    var r = document.getElementById('chrome_messages_notify');
    var newMessages = parseInt(Seed.newMailCount);
    var newReports = parseInt(Seed.newTradeReports) + parseInt(Seed.newReportCount);
    //logit('Messages: '+ newMessages + ',' + ' Reports: '+ newReports);
    l.innerHTML = newMessages;
    r.innerHTML = newReports;
    l.className = 'notificationCount';
    r.className = 'notificationCount';
    l.style.margin = '10px 0 0 10px';
    r.style.margin = '-23px 0 0 40px';
    l.style.visibility = (newMessages > 0) ? 'visible' : 'hidden' ;
    r.style.visibility = (newReports > 0) ? 'visible' : 'hidden' ;
  },

  enable : function (tf){
    var t = MessageCounts;
    t.messagesNotifyFunc.setEnable (tf);
    if (!tf)
      document.getElementById('chrome_messages_notifyL').style.display = 'none';
    setTimeout (unsafeWindow.messages_notify_bug, 0);
  },

  isAvailable : function (){
    var t = MessageCounts;
    return t.messagesNotifyFunc.isAvailable();
  },
}

var WarnZeroAttack = {
  modalAttackFunc : null,

  init : function (){
    var t = WarnZeroAttack;
    t.modalAttackFunc = new CalterUwFunc ('modal_attack', [['modal_attack_check()', 'modalAttack_hook()']]);
    unsafeWindow.modalAttack_hook = t.hook;
    t.modalAttackFunc.setEnable(Options.fixWarnZero);
  },

  setEnable : function (tf){
    var t = WarnZeroAttack;
    t.modalAttackFunc.setEnable (tf);
  },

  isAvailable : function (){
    var t = WarnZeroAttack;
    return t.modalAttackFunc.isAvailable();
  },

  hook : function (){
    var t = WarnZeroAttack;
    if (parseIntZero(document.getElementById('modal_attack_target_coords_x').value) == 0
    && parseIntZero(document.getElementById('modal_attack_target_coords_y').value) == 0){
      new CdialogCancelContinue ('<SPAN class=boldRed>You are about to march to location 0,0!</span>', null, unsafeWindow.modal_attack_check, document.getElementById('modalInner1'));
    } else {
      unsafeWindow.modal_attack_check();
    }
  },

}
function show2DPs(num) {
	if (num == parseInt(num))
		return num + '.00';
	else if (10*num == parseInt(10*num))
		return num + '0';
	else
		return num;
};
var MapDistanceFix = {
  popSlotsFunc : null,
  init : function (){
    var t = MapDistanceFix;
    t.popSlotsFunc = new CalterUwFunc ('MapObject.prototype.populateSlots', [['this.distance', 'fixMapDistance_hook']]);
    if (t.popSlotsFunc.isAvailable()){
      unsafeWindow.fixMapDistance_hook = t.fixMapDistance_hook;
      if (Options.fixMapDistance)
        t.enable (true);

    }
  },
  fixMapDistance_hook : function (cityX, cityY, tileX, tileY){
    var city = Cities.byID[unsafeWindow.currentcityid];
    return distance (city.x, city.y, tileX, tileY);
  },
  enable : function (tf){
    var t = MapDistanceFix;
    t.popSlotsFunc.setEnable (tf);
  },
  isAvailable : function (){
    var t = MapDistanceFix;
    return t.popSlotsFunc.isAvailable();
  },
}

function encode_utf8( s ){
  return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s ){
  return decodeURIComponent( escape( s ) );
}

function hexDump (dat){
  var i = 0;
  var s = [];
  while (i < dat.length) {
    asc = [];
    s.push (hex4(i));
    s.push (': ');
    for (var ii=0; ii<16; ii++) {
      c = dat.charCodeAt(i+ii);
      s.push (hex2(c));
      s.push (' ');
      if (c>31 && c<128)
        asc.push (dat.charAt(i+ii));
      else
        asc.push ('.');
    }
    s.push ('  ');
    s.push (asc.join(''))
    s.push ('\n');
    i += 16;
  }
  return s.join ('');
  function hex4(d){
    return hexDig(d>>12) + hexDig(d>>8) + hexDig(d>>4) + hexDig(d&15);
  }
  function hex2(d){
    return hexDig(d>>4) + hexDig(d&15);
  }
  function hexDig (d){
    hexdigs = '0123456789ABCDEF';
    return hexdigs.charAt(d&15);
  }
}

// value is 0 to 1.0
function SliderBar (container, width, height, value, classPrefix, margin){
  var self = this;
  this.listener = null;
  if (value==null)
    value = 0;
  if (!margin)
    margin = parseInt(width*.05);
  this.value = value;
  if (width<20) width=20;
  if (height<5) height=5;
  if (classPrefix == null){
    classPrefix = 'slider';
    var noClass = true;
  }
  var sliderHeight = parseInt(height/2);
  var sliderTop = parseInt(height/4);
  this.sliderWidth = width - (margin*2);

  this.div = document.createElement ('div');
  this.div.style.height = height +'px';
  this.div.style.width = width +'px';
  this.div.className = classPrefix +'myDiv';
  if (noClass)
    this.div.style.backgroundColor='#ddd';

  this.slider = document.createElement ('div');
  this.slider.setAttribute ('style', 'position:relative;');
  this.slider.style.height = sliderHeight + 'px'
  this.slider.style.top = sliderTop + 'px';
  this.slider.style.width = this.sliderWidth +'px';
  this.slider.style.left = margin +'px';   /////
  this.slider.className = classPrefix +'Bar';
  this.slider.draggable = true;
  if (noClass)
    this.slider.style.backgroundColor='#fff';

  this.sliderL = document.createElement ('div');
  this.sliderL.setAttribute ('style', 'width:100px; height:100%; position:relative; ');
  this.sliderL.className = classPrefix +'Part';
  this.sliderL.draggable = true;
  if (noClass)
    this.sliderL.style.backgroundColor='#0c0';

  this.knob = document.createElement ('div');
  this.knob.setAttribute ('style', 'width:3px; position:relative; left:0px; background-color:#222');
  this.knob.style.height = height +'px';
  this.knob.style.top = (0-sliderTop) +'px';
  this.knob.className = classPrefix +'Knob';
  this.knob.draggable = true;
  this.slider.appendChild(this.sliderL);
  this.sliderL.appendChild (this.knob);
  this.div.appendChild (this.slider);
  container.appendChild (this.div);
  this.div.addEventListener('mousedown',  mouseDown, false);

  this.getValue = function (){
    return self.value;
  }

  this.setValue = function (val){   // todo: range check
    var relX = (val * self.sliderWidth);
    self.sliderL.style.width = relX + 'px';
    self.knob.style.left =  relX + 'px';
    self.value = val;
    if (self.listener)
      self.listener(self.value);
  }

  this.setChangeListener = function (listener){
    self.listener = listener;
  }

  function moveKnob (me){
    var relX = me.clientX - self.divLeft;
    if (relX < 0)
      relX = 0;
    if (relX > self.sliderWidth)
      relX = self.sliderWidth;
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px';   // - half knob width !?!?
    self.sliderL.style.width = relX + 'px';
    self.value =  relX / self.sliderWidth;
    if (self.listener)
      self.listener(self.value);
  }
  function doneMoving (){
    self.div.removeEventListener('mousemove', mouseMove, true);
    document.removeEventListener('mouseup', mouseUp, true);
  }
  function mouseUp (me){
    moveKnob (me);
    doneMoving();
  }

  function mouseDown(me){
    var e = self.slider;
    self.divLeft = 0;
    while (e.offsetParent){   // determine actual clientX
      self.divLeft += e.offsetLeft;
      e = e.offsetParent;
    }
    moveKnob (me);
    document.addEventListener('mouseup',  mouseUp, true);
    self.div.addEventListener('mousemove',  mouseMove, true);
  }
  function mouseMove(me){
    moveKnob (me);
  }
}

function CmatSimpleSound (playerUrl, container, attrs, onLoad, flashVars) {
  var self = this;
  this.player = null;
  this.volume = 100;
  this.isLoaded = false;
  this.onSwfLoaded = null;

  var div = document.createElement ('div');
  this.onSwfLoaded = onLoad;
  if (navigator.appName.toLowerCase().indexOf('microsoft')+1) {
    div.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"><param name="movie" value="'+playerUrl+'"><param name="quality" value="high"></object>';
    this.player = div.getElementsByTagName('object')[0];
  } else {
    div.innerHTML = '<embed src="'+playerUrl+'"  bgcolor="#eeeeee" allowfullscreen=false FlashVars="'+ flashVars +'" quality="high" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" ></embed>';
    this.player = div.getElementsByTagName('embed')[0].wrappedJSObject;
  }
  if (container)
    container.appendChild (div);
  else
    document.body.appendChild (div);
  for (k in attrs)
    this.player.setAttribute(k, attrs[k]);

  this.setVolume = function (chanNum, vol){
    if (!self.isLoaded)
      return;
    self.player.jsSetVolume (chanNum, vol);
    volume = vol;
  }

  this.load = function (chanNum, url, bStream, bAutoplay, bUsePolicyFile){   // loop ?
    self.player.jsLoad (chanNum, url, bStream, bAutoplay, bUsePolicyFile);
  }

  this.play = function (chanNum, position){
    self.player.jsPlay (chanNum, position);
  }

  this.stop = function (chanNum){
    self.player.jsStop (chanNum);
  }

  this.getStatus = function (chanNum){           // returns null if sound channel is 'empty'
    return self.player.jsGetStatus (chanNum);
  }

  this.debugFunc = function (msg){  // overload to use
  }

  this.swfDebug = function (msg){    // called by plugin
    self.debugFunc('SWF: '+ msg);
  }
  this.swfLoaded = function (){    // called by plugin when ready to go!
    self.isLoaded = true;
    self.debugFunc ('playerIsReady');
    if (self.onSwfLoaded)
      self.onSwfLoaded();
  }
  this.swfPlayComplete = function (chanNum){    // called by plugin when a sound finishes playing (overload to be notified)
  }
  this.swfLoadComplete = function (chanNum, isError){    // called by plugin when a sound finishes loading  (overload to be notified)
  }
}    
    
function DoUnsafeWindow(func, execute_by_embed) {
  if(this.isChrome || execute_by_embed) {
    var scr=document.createElement('script');
    scr.innerHTML=func;
    document.body.appendChild(scr);
  } else {
    try {  
      eval("unsafeWindow."+func);
    } catch (error) {
    logit("Bei DoUnsafeWindow hat JavaScript ein fehler gefunden! Meldung: "+error.description);
    }
  }
}  


function GetDisplayName(){
  var DisplayName = document.getElementById('topnavDisplayName');
  if(DisplayName){
    DisplayName = DisplayName.innerHTML;
  }else{
    DisplayName = null;
  }
  return DisplayName
}

function DrawLevelIcons() {
  var maptileRe = /modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/;
  var mapwindow=document.getElementById('mapwindow');
  if(!mapwindow) return;
  var levelIcons=document.getElementById('LevelIcons');
  if(levelIcons) return;

  var ss=document.evaluate(".//a[contains(@class,'slot')]",mapwindow,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
  var lvRe=/_([0-9]+)/;
  var idDone=false;
  for(var s=0; s<ss.snapshotLength; s++) {
    var a=ss.snapshotItem(s);
    var onclick=a.getAttribute('onclick');
    //alert(onclick);
    var owner='';
    if(onclick) {
      var onclickM=maptileRe.exec(onclick);
      if(onclickM && onclickM[6]!='"null"') {
        var might=onclickM[7].StripQuotes();
        var alliance=onclickM[9].StripQuotes();

        
        owner=" "+onclickM[6].StripQuotes();
      }
    }
    var m=lvRe.exec(a.className);
    if(!m) continue;
    var sp=a.getElementsByTagName('span');
    if(sp.length==0) continue;

    if(!idDone) { a.id='levelIcons'; idDone=true; }
    sp[0].style.color='#cc0';
    
    if (alliance == 'null' && onclickM[12]=='"city"') sp[0].style.color='#33CCFF';
    if (onclickM[12]!='"city"' &&  onclickM[6]!='"null"') sp[0].style.color='#FF9900';
    if (onclickM[12]!='"city"' &&  onclickM[5]=='"null"' && onclickM[6]=='"null"' && onclickM[7]=='"null"' && onclickM[8]=='"null"' && onclickM[9]=='"null"' && onclickM[10]=='"null"') sp[0].style.color='#CC0033';
    if (Options.MapShowExtra) {
      if (onclickM && onclickM[6]!='"null"' ) sp[0].innerHTML='&nbsp;'+m[1]+owner+'<br />Macht: '+addCommas(might);
      else sp[0].innerHTML='&nbsp;'+m[1]+addCommas(owner);
    }
    else {  
      if (onclickM && onclickM[6]!='"null"' ) sp[0].innerHTML='&nbsp;'+m[1];
      else sp[0].innerHTML='&nbsp;'+m[1]+addCommas(owner);
    }
    
  }

}


function AutoTrain(){
if (!TrainOptions.Running) return;
if (TrainCity > (Seed.cities.length-1)) TrainCity = 0;
if (!TrainOptions.Enabled[(TrainCity+1)]) {
TrainCity++;
return;
}
var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
var troops = {1:'Truppe di rifornimento:',
 	                    2:'Soldati semplici',
 	                    3:'Esploratori',
 	                    4:'Lancieri',
 	                    5:'Spadaccini',
 	                    6:'Arcieri',
 	                    7:'Cav. leggera',
 	                    8:'Cav. pesante',
 	                    9:'Carri di rifornimento',
 	                    10:'Baliste',
 	                    11:'Arieti',
	                    12:'Catapulte'};
cityId = Seed.cities[TrainCity][0];
var unitId = TrainOptions['Troops'][(TrainCity+1)];
if (unitId == 0) {
logit (TrainCity+': No trooptype selected');
TrainCity++;
return;
}
var cost = unsafeWindow.unitcost['unt'+ unitId];
var baracks = 0;
var slots = false;
if (TrainOptions.Workers[(TrainCity+1)] != 0) {
idle=parseInt(Seed.citystats['city'+Seed.cities[TrainCity][0]].pop[0]);
idle = parseInt( (idle/100)* TrainOptions.Workers[(TrainCity+1)] );
}
else
idle = parseInt(Seed.citystats['city'+Seed.cities[TrainCity][0]].pop[0]) - parseInt(Seed.citystats['city'+Seed.cities[TrainCity][0]].pop[3]);
if (idle < 0) idle = 0;
for (i=1;i<=12;i++){
if (unitId == i) idle = (idle / cost[6]).toFixed(0);
idle = idle-1;
}
if (TrainOptions.SelectMax[(TrainCity+1)] && TrainOptions.Max[(TrainCity+1)] <idle) idle = TrainOptions.Max[(TrainCity+1)];
if (TrainOptions.Resource[(TrainCity+1)]){
 		     Food = parseInt(Seed.resources["city" + cityId]['rec1'][0]/3600);
 		     Wood = parseInt(Seed.resources["city" + cityId]['rec2'][0]/3600);
 		     Stone = parseInt(Seed.resources["city" + cityId]['rec3'][0]/3600);
 		     Ore = parseInt(Seed.resources["city" + cityId]['rec4'][0]/3600);
		     if (Food <= parseInt(TrainOptions['Keep'][(TrainCity+1)]['Food'])) {TrainCity++;return;}
		     if (Wood <= parseInt(TrainOptions['Keep'][(TrainCity+1)]['Wood']))  {TrainCity++;return;}
 		     if (Stone <= parseInt(TrainOptions['Keep'][(TrainCity+1)]['Stone']))  {TrainCity++;return;}
		     if (Ore <= parseInt(TrainOptions['Keep'][(TrainCity+1)]['Ore'])) {TrainCity++;return;}
 	     } else{
 	         if ((parseInt(Seed.resources["city" + cityId]['rec1'][0]/3600)) > TrainOptions['Keep'][(TrainCity+1)]['[Food']) Food = TrainOptions['Keep'][(TrainCity+1)]['Food'];
 	         if ((parseInt(Seed.resources["city" + cityId]['rec2'][0]/3600)) > TrainOptions['Keep'][(TrainCity+1)]['[Wood']) Wood = TrainOptions['Keep'][(TrainCity+1)]['Wood'];
 	         if ((parseInt(Seed.resources["city" + cityId]['rec3'][0]/3600)) > TrainOptions['Keep'][(TrainCity+1)]['[Stone']) Stone = TrainOptions['Keep'][(TrainCity+1)]['Stone'];
	         if ((parseInt(Seed.resources["city" + cityId]['rec4'][0]/3600)) > TrainOptions['Keep'][(TrainCity+1)]['[Ore']) Ore = TrainOptions['Keep'][(TrainCity+1)]['Ore'];
 	     }
for (y in Seed.buildings['city'+cityId]) {
if (Seed.buildings['city'+cityId][y][0] == 13) baracks++;
}
if (Seed.queue_unt['city'+cityId].length < baracks) slots =true;
for (z=1;z<=4;z++){
if (cost[z] == 0) cost[z] = 1;
}
if ((Food/cost[1]) < idle) idle = (Food/cost[1]).toFixed(0);
 		 if ((Wood/cost[2]) < idle) idle = (Wood/cost[2]).toFixed(0);
 		 if ((Stone/cost[3]) < idle) idle = (Stone/cost[3]).toFixed(0);
 		 if ((Ore/cost[4]) < idle) idle = (Ore/cost[4]).toFixed(0);
idle = idle-1;
var time = unsafeWindow.modal_barracks_traintime(unitId, idle);
if (slots && idle >= TrainOptions.Threshold[(TrainCity+1)]) {
params.cid = cityId;
params.type = unitId;
params.quant = idle;
params.items = 0;
new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, {
method: "post",
parameters: params,
onSuccess: function(transport) {
var rslt=eval("("+transport.responseText+")")
if (rslt.ok) {
for (var i = 1; i < 5; i++) {
unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(idle);
}
unsafeWindow.seed.citystats["city" + cityId].gold[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].gold[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][5]) * parseInt(idle);
unsafeWindow.seed.citystats["city" + cityId].pop[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].pop[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][6]) * parseInt(idle);
unsafeWindow.seed.queue_unt["city" + cityId].push([unitId, idle, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]);
actionLog(Seed.cities[TrainCity][1]  + ': Ausbildung ' + idle + ':  ' + troops[unitId] );
 } else {actionLog(Seed.cities[TrainCity][1] + ': Ausbildung Fehlgeschlagen ' + idle + ':  ' +  troops[unitId] + ' - '+ rslt.msg);}
},
onFailure: function() {}
});
}
TrainCity++;
}
//
pbStartup ();



var AudioAlert = {
  alert : true,
  init : function(){
    var t = AudioAlert;
  //t.whisperalert();
  t.creatediv();
  },
  
  creatediv : function(){
  var diva = document.getElementsByTagName('div');
  for (var i = 0; i < diva.length - 1; i++)
    if (diva[i].className == 'mod_comm_forum')
      e = diva[i];
  alertDiv = document.createElement("span");
  alertDiv.setAttribute("id", "alertDiv");
  e.appendChild(alertDiv);
  },
  
  sound : function(tf){
   var t = AudioAlert;
  
  var divs = document.getElementById('alertDiv');  

  if(tf){
  divs.innerHTML = '<iframe src="http://koc.god-like.info/fluester.html" height="20" width="100"></iframe>';
  t.alert = true;
  } else {
    divs.innerHTML = "<b style='color: rgb(165, 102, 49); font-size: 9px;'>Audio Alert Played</b>";
  t.alert = false;
  }
  
  if(t.alert)
  setTimeout(function(){t.sound(false)},10000);
  },
  
  scanalliancechat : function(){
  
  },
  
  whisperalert : function(){
  var divs = document.getElementsByTagName('div');
  for (var i = 0; i < divs.length - 1; i++) {
    if (divs[i].className == 'comm_tabs seltab2') {
    bS = document.getElementsByTagName('b')
      for (var j = 0; j < bS.length - 1; j++)
        if (bS[j].innerHTML == ' flüstert:')
          AudioAlert.sound(true);
    }
  }
  },
  
}

GM_setValue("lastMsgTime", "0000");//hold the previous msg alert time.
//alert('got here');

function check_html(){
    var divCollection = document.getElementsByTagName('div');
    var div_collection_adjusted = divCollection.length - 1;
    for (var i = 0; i < div_collection_adjusted; i++) {
        if ((divCollection[i].getAttribute("class") == "tx" && divCollection[i].innerHTML == "****")) {
            var new_msg_index = i;
            i = divCollection.length - 1;
            
            var tx_div_collection = divCollection[new_msg_index].parentNode.parentNode.getElementsByTagName('span');
            //var tx_div_collection_adjusted = tx_div_collection.length -1;
            
            for (var j = 0; j < tx_div_collection.length; j++) {
                if (tx_div_collection[j].getAttribute("class") == "time") {
                    //alert("got here");
                    if (tx_div_collection[j].innerHTML != GM_getValue("lastMsgTime")) {
                        GM_setValue("lastMsgTime", tx_div_collection[j].innerHTML);
                        //alert("got here");
                        iframe = document.createElement("iframe");
                        iframe.setAttribute("src", "http://koc.god-like.info/fluester.html");
                        iframe.setAttribute("width", "100");
                        iframe.setAttribute("height", "20");
                        //void(document.body.appendChild(iframe));
                        //alert("got here");    
                        void (divCollection[new_msg_index].parentNode.appendChild(iframe));
                        divCollection[new_msg_index].className = 'edited';
                    }
                }
                
            }
        }
    }
}

function scan_allianceChat(){
    try {
     if (Options.WhisperOn==false){
}
else
        //this should isolate the stuff in alliance chat. seltab2 = alliance.
        var foundMsg = false;
        
        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length - 1; i++) {
            if (divs[i].className == 'comm_tabs seltab2') {
                //Ok we have now detected that chat is set to alliance.
                
                bS = document.getElementsByTagName('b')
                for (var j = 0; j < bS.length - 1; j++) {
                    if (bS[j].innerHTML == ' flüstert dir zu:') {
                        //ok we have now found a whisper to you.
                        if (foundMsg == false) {
                            foundMsg = true;
                            
                            //now find the message time.
                            //var msgSpan = bS[j].parentNode.getElementsByTagName('span')[0].innerHTML;

                            //if (GM_getValue("lastMsgTime") != msgSpan) {
              //  alert('got here');
                            //  GM_setValue("lastMsgTime", msgSpan);
              //  alert('have set message value');
                                bS[j].innerHTML = ' flüstert dir zu:';
                                alertDiv = document.createElement("div");
                                alertDiv.innerHTML = '<iframe src="http://koc.god-like.info/fluester.html" height="20" width="100"></iframe>';
                                alertDiv.setAttribute("class", "alertDiv");
                                
                                void (bS[j].appendChild(alertDiv));
                                
                                window.setTimeout(function(){
                                    var divs = document.getElementsByTagName('div');
                                    for (var i = 0; i < divs.length - 1; i++) {
                                        if (divs[i].className == 'alertDiv') {
                                            divs[i].innerHTML = "Flüster Alarm Abgespielt!";
                                        }
                                    }
                                }, 10000);
                                
                                
                            //}
                        }
                    }
                }
            }
        }
    }
    catch (err) {
        alert(err);
    }
}


function AjaxRequest2 (url, opts){
    var headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Prototype-Version': '1.6.1',
        'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };
    var ajax = null;   
    if (window.XMLHttpRequest)
      ajax=new XMLHttpRequest();
    else
      ajax=new ActiveXObject("Microsoft.XMLHTTP");   
    if (opts.method==null || opts.method=='')
      method = 'GET';
    else
      method = opts.method.toUpperCase();    
    if (method == 'POST'){
        headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    } else if (method == 'GET'){
        addUrlArgs (url, opts.parameters);
    }    
    ajax.onreadystatechange = function(){
        // ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
        if (ajax.readyState==4) {
            if (ajax.status >= 200 && ajax.status < 305)
            if (opts.onSuccess) opts.onSuccess(ajax);
            else
                if (opts.onFailure) opts.onFailure(ajax);
            } else {
                if (opts.onChange) opts.onChange (ajax);
            }
    }    
    ajax.open(method, url, true); // always async!
    for (var k in headers)
      ajax.setRequestHeader (k, headers[k]);
     if (matTypeof(opts.requestHeaders)=='object')
          for (var k in opts.requestHeaders)
            ajax.setRequestHeader (k, opts.requestHeaders[k]);
    if (method == 'POST'){
        var a = [];
        for (k in opts.parameters){
              if(matTypeof(opts.parameters[k]) == 'object'){
                  for(var h in opts.parameters[k]){
                      if(matTypeof(opts.parameters[k][h]) == 'object'){
                          for(var i in opts.parameters[k][h]){
                              if(matTypeof(opts.parameters[k][h][i]) == 'object'){
                              for(var j in opts.parameters[k][h][i]){
                                  a.push (k+'['+h+']['+i+']['+j+'] ='+ opts.parameters[k][h][i][j] );
                              }
                              } else
                              	a.push (k+'['+h+']['+i+']'+' ='+ opts.parameters[k][h][i]);
                          }
                      } else
                      a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
                  }
              } else
              a.push (k +'='+ opts.parameters[k] );
        }
        ajax.send (a.join ('&'));
    } else {
        ajax.send();
    }
}


window.setInterval(function(){
    scan_allianceChat();
    //check_html()
}, 5000);