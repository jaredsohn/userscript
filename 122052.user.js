// ==UserScript==
// @name           Evo
// @namespace      Evo
// @version        eVo v.6
// @description    Global Warfare Oyunu Yardimci Araçlar Programi
// @include        *.globalwarfaregame.com/*main_src.php*
// @include        *.globalwarfaregame.com/*main_src.php*
// @include        *apps.facebook.com/globalwarfaregame/*
// @include        *apps.facebook.com/globalwarfaregame/*
// @email	   evrenser@hotmail.com
// @license	   GNU GPL
// @icon           http://i51.tinypic.com/2evdmd0.jpg
// ==/UserScript==


var Version = 'eVo v.6';

var attack_unit_Truck         = "modal_attack_unit_ipt_1";   // "SupplyTruck"
var attack_unit_Infantry      = "modal_attack_unit_ipt_5";   // "AttackInfantry"
var attack_unit_Sniper        = "modal_attack_unit_ipt_6";   // "AttackSniper"
var attack_unit_Antitank      = "modal_attack_unit_ipt_4";   // "AttackAntitank"
var attack_unit_SpecialForces = "modal_attack_unit_ipt_18";  // "AttackSforces"
var attack_unit_MobileSAM     = "modal_attack_unit_ipt_7";   // "AttackMobileSAM"
var attack_unit_Tank          = "modal_attack_unit_ipt_8";   // "AttackTank"
var attack_unit_Predator      = "modal_attack_unit_ipt_17";  // "AttackPredator"
var attack_unit_SupplyChopper = "modal_attack_unit_ipt_9";   // "SupplyChopper"
var attack_unit_Gunship       = "modal_attack_unit_ipt_11";  // "AttackChopper"
var attack_unit_Fighter       = "modal_attack_unit_ipt_10";  // "AttackFighter"
var attack_unit_Bomber        = "modal_attack_unit_ipt_12";  // "AttackBomber"
var attack_unit_CargoJet      = "modal_attack_unit_ipt_19";  // "SupplyJet"
var attack_unit_Hellfire      = "modal_attack_unit_ipt_16";  // "AttackHellfire"
var attack_unit_Stealth       = "modal_attack_unit_ipt_13";  // "AttackStealth"
var attack_unit_Nuke          = "modal_attack_unit_ipt_15";  // "AttackNuke"


function WarnAttackEnabled(state) {
    if (state == false) {
        actionLog('WarnAttackEnabled: reset', false);
        document.getElementById('pttcPodTools').removeAttribute("style");
    }
    else {
        actionLog('WarnAttackEnabled: enable', false);
        document.getElementById('pttcPodTools').style.color="red";
    }
    return;
    //<iframe scrolling="no" height="600px" frameborder="0" src="javascript:&quot;&quot;" name="iframe_canvas" id="iframe_canvas" class="canvas_iframe_util noresize" style="width: 100%; height: 1646px; overflow-y: hidden;">
    //  <html class="yui3-js-enabled"><head>
    //    <body style="background:red;" id="mainbody">

    // iframe id="iframe_canvas" style.height=2600px
    // body id="mainbody" style.background=red
}

function CollectDailyReward() {
    var list=document.getElementById('a');
    var button=list.getElementsByClassName('button55w');
    for(var i=0; i<button.length; i++) {
        button[i].click();
    }
}

function SetOverviewError(inerror) {
    if (inerror == null || inerror == false) {
        actionLog('SetOverviewError: reset', false);
        document.getElementById('pttcOverview').removeAttribute("style");
    }
    else {
        actionLog('SetOverviewError: ON', false);
        document.getElementById('pttcOverview').style.color="red";
    }
}

function RemoveMainScreenButton(ButtonClass) {
    // btn-petro-lab  btn-daily-reward  btn-greenhouse  btn-warhead-factory  btn-gift  btn-fortuna  btn-chest
    // Repeat to ensure we get all the hidden ("display:false") elements
    actionLog("RemoveMainScreenButton: Trying Button = " + ButtonClass,false);
    for (var x=1; x<5; x++) {
        var Buttons = document.getElementsByClassName(ButtonClass);
        for (var i=0; i<Buttons.length; i++) {
            if(Buttons[i]) {
                actionLog("Removing button(" + x + ") " + ButtonClass + " (" + i + ") ",false);
                try { Buttons[i].parentNode.removeChild(Buttons[i]); } catch(err) { }
            }
        }
    }
    // This may be thwarted by <script type="text/json" id="gw-notification-icons"> ?
}

function CleanupButtons(ButtonClass) {
    // this removed the specified on-screen button, plus the undesirable "nag" buttons
    var Items = [ ButtonClass, "btn-gift", "btn-chest", "btn-quest", "btn-quest character-1", "btn-quest character-2", "btn-quest character-3", "btn-quest character-4", "btn-quest character-5", "btn-quest character-6", "btn-quest character-7", "btn-neighbor" ];
    for (var i=0; i<Items.length; i++) {
        if(Items[i]) {
            RemoveMainScreenButton(Items[i]);
        }
    }
}

function RemoveBadElements() {
    // remove undesirable screen elements
    try {
        var BadBox=document.getElementById("gw-promo-main");    // banner ad
        if (BadBox) BadBox.parentNode.removeChild(BadBox);
        // music is gone! lawl
        // var BadBox=document.getElementById("sm2movie");         // Flash music
        // if (BadBox) BadBox.parentNode.removeChild(BadBox);
    }
    catch(err) { }
}

function UpdateMainTabLink() {

    
    actionLog ('Color state is '+ state +'.', true);
 
    switch (state) {
        case "autobuild" : { color='#22AA22'; break; } // green
        case "buildmode" : { color='#AA0000'; break; } // red-ish
        case "both"      : { color='#DDDD00'; break; } // red-green (yello?)
        case "neither"   : { color='#1e66bd'   ; break; } // tan default
        case "error"     : { color='#DD2222'; break; } // red
        default          : { color='#1e66bd'   ; break; } // tan default
    }

    var tabs=document.getElementById('kochead');
    if(!tabs) {
        tabs=document.getElementById('gor_menu_bar');
        if (tabs)
            tabs=tabs.parentNode;
    }

    if(tabs) {
        var gmTabs = null;
        var e = tabs.parentNode;
        for (var i=0; i<e.childNodes.length; i++){
            var ee = e.childNodes[i];
            if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
                gmTabs = ee;
                break;
            }
        }
        if (gmTabs != null) {
            gmTabs.style.background=color;
        }
    }
    
}

var DEBUG_TRACE = false;
var DEBUG_BUTTON = true;
var ENABLE_INFO = true;
var ENABLE_CHAT = true;
var SEND_ALERT_AS_WHISPER = false;
var MAP_DELAY = 1200;

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

var GlobalOptions = {
  pbWideScreen : true,
  pbWideScreenStyle : 'normal',
};
var DEFAULT_ALERT_SOUND_URL = 'http://dc93.4shared.com/img/48576375/1cb40c86/dlink__2Fdownload_2F9p0Aoyid_3Ftsid_3D20110508-194828-34f9fd7e/preview.mp3';
var SWF_PLAYER_URL = 'http://koc.god-like.info/alarmplayer.swf';

var Options = {
	ptWinIsOpen	:	true,
	ptWinDrag	:	true,
	ptWinPos	:	{},
	ptTrackOpen	:	true,
	infWinIsOpen	:	true,
	infWinDrag	:	true,
	infWinPos	:	{x:0,y:0},
	infTrackOpen	:	true,
	includeCity	:	true,
	includeMarching	:	false,
	includeTraining	:	false,
	includeTrainingTotal	:	false,
	overviewAllowOverflow	:	false,
	overviewFontSize	:	11,
	pbgoldenable	:	true,
	pbGoldLimit	:	99,
	pboilenable : 	true,
	pbfoodenable :	true,
	pbWHenable :	true,
	pbMCenable :	true,
	pbahelpenable :	true,
	pbEveryEnable: false,
    pbEveryMins  : 15,
    pbFoodAlert  : true,
	pbWideMap :	true,
	pbChatOnRight  :	true,
	pbrmmotdEnable  :	true,
	celltext     : {atext:false, provider:0, num1:"000", num2:"000", num3:"0000"},
	alertSound   : {enabled:false, soundUrl:DEFAULT_ALERT_SOUND_URL, repeat:true, playLength:300, repeatDelay:2, volume:100, alarmActive:false, expireTime:0},
	pbFoodAlert  : false,
    alertConfig  : {aChat:true, aPrefix:'******* SALDIRI ALIYORUM..!! *******', scouting:false, wilds:false, defend:true, minTroops:1, spamLimit:10, lastAttack:0, barbautoswitch:false,},
	transportinterval : 60,
    minwagons    : 100,
    lasttransport: 0,
    reassigninterval: 60,
};



if (document.URL.search(/apps.facebook.com\/globalwarfaregame/i) >= 0){
  facebookInstance ();
  return;
}
if (document.URL.search(/globalwarfaregame.com/i) >= 0){
  GWwideScreen ();
}
readGlobalOptions();
function GWwideScreen(){
	var iFrame = parent.document.getElementsByTagName('IFRAME');
	//iFrame[0].style.minWidth = '1220px';
	var style = document.createElement('style')
	style.innerHTML = 'body {margin:0; width:100% height:100%; !important;}';
	iFrame[0].parentNode.appendChild(style);
	iFrame[0].style.width = '100%';
	while ( (iFrame=iFrame.parentNode) != null)
		iFrame.style.width = '100%';
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
	document.getElementById('globalContainer').style.left = '0px';
    try{    
      document.getElementById('rightCol').parentNode.removeChild(document.getElementById('rightCol'));
      document.getElementById('leftColContainer').parentNode.removeChild(document.getElementById('leftColContainer'));
      document.getElementById('pagelet_canvas_footer_content').parentNode.removeChild(document.getElementById('pagelet_canvas_footer_content'));
	  document.getElementById('globalContainer').parentNode.style.overflowX = "hidden"
	  
	  
    } catch (e){
      // toolkit may have removed them already!
    }
    var e = document.getElementById('mainContainer');
	if(e){
		if (GlobalOptions.pbWideScreenStyle=="normal") e.parentNode.style.minWidth = '100%';
		if (GlobalOptions.pbWideScreenStyle=="wide") {
		e.parentNode.style.width = '1520px';
		//e.parentNode.style.overflow-x:hidden
		}
		if (GlobalOptions.pbWideScreenStyle=="ultra") e.parentNode.style.width = '1900px';
		for(i=0; i<e.childNodes.length; i++){
			if(e.childNodes[i].id == 'contentCol'){
				e.childNodes[i].style.margin = '0px';
				e.childNodes[i].style.paddingTop = '0px';
				break;
			}
		}
	}
	var e = document.getElementById('pageHead');
	if(e){
		e.style.width = '100%';
		e.style.margin = '0 0%';
	}
	var e = document.getElementById('bottomContent');
	if(e){
		e.style.padding = "0px 0px 0px 0px";
	}
    
  }
  if (GlobalOptions.pbWideScreen)
    setWide();
}



var Seed = unsafeWindow.seed;
var Tabs = {};
var Tabs2 = {};
var mainPop;
var infoPop;
var Cities = {};
var ptStartupTimer = null;
var CPopUpTopClass = 'ptPopTop';
var uW = unsafeWindow;
function ptStartup (){
  clearTimeout (ptStartupTimer);
  if (unsafeWindow.ptLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    ptStartupTimer = setTimeout (ptStartup, 1000);
    return;
  }
  unsafeWindow.ptLoaded = true;
  actionLog ("EvrenSerdar" + Version);
  
  Seed = unsafeWindow.seed;
  var styles = '.ptTabs {color:black; font-size:12px}\
    table.pbTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .pbStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#06084c}\
	.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    table.ptTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .hostile td { background:red; }.friendly td{background:lightgreen; }.ally td{background:lightblue; }\
	table.ptTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.ptOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.ptTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
	table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none;}\
    table.ptTabOverview tr td {border-left:1px solid #ccc; white-space:nowrap; padding: 1px;}\
    table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
	input.pbDefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
    input.pbDefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
    .ptDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
	.ptOddrow {background-color:#eee}\
    .ptStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#06084c}\
    .ptStatLight {color:#ddd}\
	.ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
	a.ptButton20 {color:#ffff80}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    input.ptDefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
    input.ptDefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
    input.ptButton20 {height:27px; width:80px}\
    table.ptMainTab {empty-cells:show; margin-top:5px }\
    table.ptMainTab tr td a {color:inherit }\
    table.ptMainTab tr td   {font-family:georgia,arial,sans-serif; height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.ptMainTab tr td.spacer {padding: 0px 3px;}\
    table.ptMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed; color:black}\
    table.ptMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#1e66bd; color:white; border-color:black;}\
    tr.ptPopTop td { background-color:#5f8aee; border:none; height: 21px;  padding:0px; }\
    tr.ptretry_ptPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.ptMainPopTop td { background-color:#5f8aee; border:none; height: 42px;  padding:0px; }\
    tr.ptretry_ptMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
	table.infMainTab {empty-cells:show; margin-top:5px }\
    table.infMainTab tr td a {color:inherit }\
    table.infMainTab tr td   {font-family:georgia,arial,sans-serif; height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.infMainTab tr td.spacer {padding: 0px 3px;}\
    table.infMainTab tr td.sel    {font-weight:bold; font-size:11px; border: 1px solid; border-style: solid solid none solid; background-color:#eed; color:black}\
    table.infMainTab tr td.notSel {font-weight:bold; font-size:11px; border: 1px solid; border-style: solid solid none solid; background-color:#1e66bd; color:white; border-color:black;}\
    tr.infPopTop td { background-color:#ded; border:none; height: 21px;  padding:0px; }\
    tr.infretry_ptPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.infMainPopTop td { background-color:#5f8aee; border:none; height: 42px;  padding:0px; }\
    tr.infretry_ptMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px; overflow:auto;}\
    .CPopup  {border:3px ridge #666}\
    span.ptTextFriendly {color: #080}\
    span.ptTextHostile {color: #800}\
	.ptButCancel {background-color:#a00; font-weight:bold; color:#fff}\
	a.ptButton20 {color:#ffff80}\
	a.ptButton21 input[type="submit"]::-moz-focus-inner { border: none; }\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    a.loc1 { color:#0000FF; font-size:10px}\
    a.loc2 { color:#0000FF; font-size:9px}\
	td.search1 { font-size:10px }\
	a.ptButton21 {\
       color: #eee;\
       display: block;\
       float: left;\
       font: normal 12px arial, sans-serif;\
       height: 24px;\
       margin-right: 6px;\
       padding-right: 18px;\
       text-decoration: none;\
    }\
   a.ptButton21 span {\
       display: block;\
       line-height: 14px;\
       padding: 5px 0 5px 18px;\
   } \
   a.ptButton21:active {\
       background-position: bottom right;\
       color: #000;\
      outline: none;\
}\
   a.ptButton21:active span {\
       background-position: bottom left;\
       padding: 6px 0 4px 18px;\
   } \
   div#font11 {font: normal 10px arial}\
   div.indent25 {padding-left:25px}\
   a.buttontab2>span.mid{margin:0 20px 0 7px;height:25px;padding-left:7px;margin-right:7px;background:transparent url(http://kabam1-a.akamaihd.net/globalwarfaregame/img/gw/modals/button_chrome_header_rpt_nrml.png?v1_38_87);}\
   ';
   
  /* .tab span{background:url(../img/tab_unselected.png) no-repeat;display:block;height:28px;padding-left:7px;margin-right:7px;}*/
 /*
  .buttontab2{position:relative;display:block;font-size:9px;font-weight:bold;height:25px;text-align:center;text-transform:uppercase;line-height:20px;color:#fff;}\
   .buttontab2>span{display:block;}\
   .buttontab2>span.left{float:left;width:7px;height:25px;background:transparent url(../img/gw/modals/button_chrome_header_l_nrml.png?v1_38_87) no-repeat 0 0;}\
   .buttontab2>span.right{float:right;width:9px;height:25px;background:transparent url(../img/gw/modals/button_chrome_header_r_nrml.png?v1_38_87) no-repeat right 0;}\
    .buttontab2:hover>span.left{background:transparent url(../img/gw/modals/button_chrome_header_l_hover.png?v1_38_87) no-repeat 0 0;}\
   .buttontab2:hover>span.right{background:transparent url(../img/gw/modals/button_chrome_header_r_hover.png?v1_38_87) no-repeat right 0;}\
   .buttontab2:hover>span.mid{background:transparent url(../img/gw/modals/button_chrome_header_rpt_hover.png?v1_38_87) repeat-x center 0;}\
   .buttontab2:active>span.left{background:transparent url(../img/gw/modals/button_chrome_header_l_click.png?v1_38_87) no-repeat 0 0;}\
   .buttontab2:active>span.right{background:transparent url(../img/gw/modals/button_chrome_header_r_click.png?v1_38_87) no-repeat right 0;}\
   .buttontab2:active>span.mid{background:transparent url(../img/gw/modals/button_chrome_header_rpt_click.png?v1_38_87) repeat-x center 0;}\
 */ 

  window.name = 'PT';
  readOptions();
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y;
    saveOptions ();
  }
  if (Options.infWinPos==null || Options.infWinPos.x==null|| Options.infWinPos.x=='' || isNaN(Options.infWinPos.x)){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    Options.infWinPos.x = c.x+4;
    Options.infWinPos.y = c.y;
    saveOptions ();
  }
    // Reset window xPos if the widescreen option is disabled
  if(!GlobalOptions.pbWideScreen && Options.ptWinPos.x > 700){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    Options.ptWinPos.x = c.x+4;
    saveOptions ();
  }
  mainPop = new CPopup ('pt', Options.ptWinPos.x, Options.ptWinPos.y, 750,800, Options.ptWinDrag,
      function (){
        tabManager.hideTab();
        Options.ptWinIsOpen=false;
        saveOptions()
      });
 infoPop = new CPopup ('inf', Options.infWinPos.x, Options.infWinPos.y, 540,800, Options.infWinDrag,
      function (){
        tabManager2.hideTab();
        Options.infWinIsOpen=false;
        saveOptions()
      });
  mainPop.autoHeight (true);  
  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  infoPop.autoHeight (true);  
  infoPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  
  AddMainTabLink('BASLAT', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  tabManager2.init (infoPop.getMainDiv());
  CollectGold.init();
  CollectOil.init();
  CollectWH.init();
  CollectMC.init();
  CollectFood.init();
  ChatPane.init();
  RMMotd.init();
  RefreshEvery.init ();
  FoodAlerts.init();
  NewButton();

  if (Options.ptWinIsOpen && Options.ptTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  if (Options.ptWinIsOpen && Options.ptTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
   if (Options.infWinIsOpen && Options.infTrackOpen){
    infoPop.show (true);
    tabManager2.showTab();
  }
  if (Options.infWinIsOpen && Options.infTrackOpen){
    infoPop.show (true);
    tabManager2.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  WideScreen.init();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  WideScreen.useWideMap (Options.pbWideMap);
}
/********************************* Arama Sekmesi Fonksiyonu *************************************/
function distance (d, f, c, e) {
  var a = 800;
  var g = a / 2;
  var b = Math.abs(c - d);
  if (b > g)
    b = a - b;
  var h = Math.abs(e - f);
  if (h > g)
    h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};

Tabs.Search = {
  tabOrder : 77,
  tabLabel: 'ARAMA',
  //tabDisabled : !ENABLE_SEARCH_TAB,
  //MapAjax : new CMapAjax(),
  cont:null,

  init : function (div){
    var t = Tabs.Search;
	var Provinces = {1:{'name':"Alpha",'x':100,'y':100},
				2:{'name':"Beta",'x':300,'y':100},
				3:{'name':"Charlie",'x':500,'y':100},
				4:{'name':"Delta",'x':700,'y':100},
				

				5:{'name':"Echo",'x':100,'y':300},
				6:{'name':"Foxtrot",'x':300,'y':300},
				7:{'name':"Golf",'x':500,'y':300},
				8:{'name':"Hotel",'x':700,'y':300},
				

				9:{'name':"India",'x':100,'y':500},
				10:{'name':"Juliet",'x':300,'y':500},
				11:{'name':"Kilo",'x':500,'y':500},
				12:{'name':"Lima",'x':700,'y':500},
				

				13:{'name':"Mike",'x':100,'y':700},
				14:{'name':"November",'x':300,'y':700},
				15:{'name':"Oscar",'x':500,'y':700},
				16:{'name':"Papa",'x':700,'y':700}};
				
				
				
				
	unsafeWindow.PTgotoMap2 = t.gotoMap;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpd2 = t.clickedPlayerLeaderboard;
	unsafeWindow.PCpo2 = t.clickedPlayerCheckOnline;
    unsafeWindow.PCplo2 = t.clickedPlayerGetLastLogin;
    t.cont = div;
    t.cont.innerHTML = '\
      <DIV class=ptentry><table><tr><td><TABLE><TR valign=bottom><TD class=xtab width=100 align=right>Aranilan: </td><TD>\
      <SELECT id="srcType">\
        <OPTION value=0>Trst.Kampi</option>\
        <OPTION value=1>Bozkir</option>\
		<OPTION value=2>Sehir</option>\
      </select></td></tr>\
      </table>\
      <DIV id="srcOpts" style="height:100px"></div></td><td style="visibility:hidden"><DIV id=divOutOpts style="background:#e0e0f0; padding:10px ;visibility:hidden"></div></td></tr></table></div>\
      <DIV id="srcResults" style="height:470px; max-height:470px;"></div>';
    var psearch = document.getElementById ("srcType");
    m = '<TABLE><TR valign=middle><TD class=xtab width=100 align=right>Merkez: &nbsp; X: </td><TD class=xtab>\
      <INPUT id=srchX type=text\> &nbsp; Y: <INPUT id=srchY type=text\> &nbsp;';
	 m += '<span><select id="ptprovinceXY"><option>--Vilayet--</option>';
		 for (var i in Provinces) {
			 m += '<option value="'+i+'">'+Provinces[i].name+'</option>';
		 }
	m += '</select></span>';

	m += '</td></tr><TR><TD class=xtab align=right>Maks.Mesafe: </td><TD class=xtab><INPUT id=srcDist size=4 value=10 /> &nbsp; <SPAN id=spInXY></span></td></tr>';
    m += '<TR><TD class=xtab></td><TD class=xtab><INPUT id=srcStart type=submit value="Aramaya BASLA"/></td></tr>';
    m += '</table>';
    document.getElementById ('srcOpts').innerHTML = m;
    new CdispCityPicker ('srchdcp', document.getElementById('spInXY'), true, null, 0).bindToXYboxes(document.getElementById ('srchX'), document.getElementById ('srchY'));
     document.getElementById ('ptprovinceXY').addEventListener('change', function() {
	   if (this.value >= 1) {
		   document.getElementById ('srchX').value = Provinces[this.value].x;
		  document.getElementById ('srchY').value = Provinces[this.value].y;
		   document.getElementById ('srcDist').value = 75;
	   }
	   }, false); 
	document.getElementById ('srcStart').addEventListener ('click', t.clickedSearch, false);
  },

//Edit add city search
clickedPlayerDetail : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "Detaylara Ulasiliyor ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "Detaylara Ulasiliyor ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },
  clickedPlayerCheckOnline : function (span, uid){
	var s = Tabs.Search;
    span.onclick = '';
    span.innerHTML = "Detaylara Ulasiliyor ...";
    s.fetchPlayerStatus (uid, function (r) {s.gotPlayerStatus(r, span, uid)});
  },
  
  fetchPlayerStatus : function (uidArray, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = uidArray;
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

  clickedPlayerGetLastLogin : function (span, uid){
    var t = Tabs.AllianceList;
	var s = Tabs.Search;
    span.onclick = '';
    span.innerHTML = "Detaylara Ulasiliyor ...";
    t.fetchPlayerLastLogin (uid, function (r) {s.gotPlayerLastLogin(r, span)});
  },
  
  gotPlayerLeaderboard : function (rslt, span){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Siralama:</b> Not found! (misted?)';
      return;
    }
    var p = rslt.results[0];
    var an = p.allianceName;
    if (!an || an=='' || p.officerType==4)
      an = 'none';
    else
      an += ' ('+ officerId2String(p.officerType) +')';
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Siralama: </b></td><TD colspan=2> Güç: '+ p.might  +' &nbsp; Ittifak: '+ an +'</td></tr>'; 
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      m += '<TR><TD align=right><B>Sehir #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName +' '+coordLink (c.xCoord, c.yCoord)+'</td><TD width=75%> &nbsp; Seviye: '
        + c.tileLevel +' &nbsp; &nbsp; Durumu: '+ cityStatusString (c.cityStatus) +' &nbsp; &nbsp; Olusumu: ' + c.dateCreated.substr(0,10) +'</td></tr>';
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
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Details:</b> &nbsp; </td><TD>Ittifak: '+ a +' &nbsp; Sehirleri: '
          + u.cities +' &nbsp; Population: '+ u.population +'</td></tr><TR><TD></td><TD>Vilayet: ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },
  
  gotPlayerStatus : function (rslt, span,uid){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }

    var p = rslt.data;
    if (p[uid] == true) {
      m = '<span style="color:green"><b>Çevrimiçi!!</b></span>';
    } else {
       m = '<span style="color:red"><b>Çevrimiçi Degil</b></span>';
    }  
    span.innerHTML = m + '';
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
      m = '<span style="color:black">Son Giris Tarihi: '+lastLogin+'</span>';
    } else {
       m = '<span style="color:red">Son Giris Tarihi Bulunamadi: '+lastLogin+'</span>';
    }  
    span.innerHTML = m + '';
  },
//End edit city search

  hide : function (){
  },

  show : function (cont){
  },

  opt : {},

  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,

  normalizeCoord : function (x){
    if ( x >= 800)
      x -= 800;
    else if (x < 0)
      x += 800;
    return parseInt (x/5) * 5;
  },

  clickedSearch : function (){
    var t = Tabs.Search;

    if (t.searchRunning){
      t.stopSearch ('Aramayi DURDUR!');
      return;
    }
    t.opt.searchType = document.getElementById ('srcType').value;
    t.opt.startX = parseInt(document.getElementById ('srchX').value);
    t.opt.startY = parseInt(document.getElementById ('srchY').value);
    t.opt.maxDistance = parseInt(document.getElementById ('srcDist').value);
    errMsg = '';

    if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>799)
      errMsg = "X Kutusuna 799 ile 0 arasinda bir rakam girmelisiniz..!<BR>";
    if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>799)
      errMsg += "Y Kutusuna 799 ile 0 arasinda bir rakam girmelisiniz..!<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1 || t.opt.maxDistance>799)
      errMsg += "Maksimum Uzakligi 799 ile 1 arasinda girmelisiniz..!<BR>";
    if (errMsg != ''){
      document.getElementById('srcResults').innerHTML = '<FONT COLOR=#660000>HATA:</font><BR><BR>'+ errMsg;
      return;
    }

    t.searchRunning = true;
    document.getElementById ('srcStart').value = 'Aramayi DURDUR';
    m = '<DIV class=ptstat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=statSearched></div></td>\
        <TD class=xtab align=center><SPAN id=statStatus></span></td>\
        <TD class=xtab align=right width=125><DIV id=statFound></div></td></tr></table></div>\
      <TABLE width=100%><TR><TD><DIV id=divOutTab style="width:100%; height:470px; max-height:470px; overflow-y:auto;"></div></td></tr></table>';
    document.getElementById('srcResults').innerHTML = m;
    if (t.opt.searchType == 0)
      typeName = 'Terörist Kampi';
    else if (t.opt.searchType == 1)
      typeName = 'Bozkir';
	else 
	  typeName = 'Sehir';

    m = '<CENTER><B>Aranilan '+ typeName +'<BR>\
        Merkez: '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; Mesafe: '+ t.opt.maxDistance +'<BR></center>\
        <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>SEÇENEKLER:</b><BR></td></tr>';
	if (t.opt.searchType == 1 || t.opt.searchType == 0) {
      m += '<TR><TD class=xtab align=right>Min.Seviyeden:</td><TD class=xtab> <INPUT id=filMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD class=xtab align=right>Max.Seviyeye Kadar:</td><TD class=xtab> <INPUT id=filMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
	}
    if (t.opt.searchType == 1){
      m += '<TR><TD class=xtab align=right>Bozkir Içerigi:</td><TD class=xtab><SELECT id=filWildType>';
      m += htmlOptions ( {1:'Çayir/Göl', 3:'Petrol Kuyusu', 4:'Tepe', 5:'Dag', 6:'Ova', 0:'Tümü', 20:'Özel'}, Options.wildType );
      m += '</select></td></tr><TR><TD class=xtab align=right>Sahipsizler:</td>\
			<TD class=xtab><INPUT id=filUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    }
	if (t.opt.searchType == 1 || t.opt.searchType == 0) {
	  m += '<TR><TD class=xtab align=right>Sirala:</td><TD class=xtab><SELECT id=filSortBy>\
				<OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Seviye</option>\
				<OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Mesafe</option>';
		if(t.opt.searchType == 1){ m+= '<OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Güç</option>';}
      m += '</select></td></tr>\
            <TR><TD class=xtab align=right>Sadece Koordinatlar:</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
            </table></div><BR><SPAN id=srchSizeWarn></span>';
	} else {
	 m += '<TR><TD class=xtab align=right>Sehir Içerigi:</td><TD class=xtab><SELECT id=filCities>';
     m += htmlOptions ( {1:'Tümü', 2:'Ittifak', 3:'Dost', 4:'Düsman', 5:'Tarafsiz', 6:'Ittifaksiz', 7:'Sisli'}, Options.cityType );
     m += '</select></td></tr>';		
	 m += '<TR><TD class=xtab align=right>Sirala:</td><TD class=xtab><SELECT id=filSortBy>\
			<OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Güç</option>\
			<OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Mesafe</option>\
           </select></td></tr>\
		   <TR><TD class=xtab align=right>Min.Güçlüden Basla:</td><TD class=xtab><INPUT type=text id=minMight value='+Options.MightSrc+' size=3 \></td></tr>\
           <TR><TD class=xtab align=right>Sadece Koordinatlar:</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
           </table></div><BR><SPAN id=srchSizeWarn></span>';
	}

	document.getElementById ('divOutOpts').style.visibility = 'visible';
    document.getElementById('divOutOpts').innerHTML = m;
	if (t.opt.searchType == 1 || t.opt.searchType == 0) {
		document.getElementById('filMinLvl').addEventListener ('change', function (){
		  Options.srcMinLevel = document.getElementById('filMinLvl').value;
		  saveOptions();
		  t.dispMapTable ();
		  }, false);
		document.getElementById('filMaxLvl').addEventListener ('change', function (){
		  Options.srcMaxLevel = document.getElementById('filMaxLvl').value;
		  saveOptions();
		  t.dispMapTable ();
		  }, false);
	}
    document.getElementById('filSortBy').addEventListener ('change', function (){
      Options.srcSortBy = document.getElementById('filSortBy').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('coordsOnly').addEventListener ('change', function (){ t.dispMapTable (); }, false);
    if (t.opt.searchType == 1){
      document.getElementById('filWildType').addEventListener ('change', function (){
        Options.wildType = document.getElementById('filWildType').value;
        saveOptions();
        t.dispMapTable ();
        }, false);
      document.getElementById('filUnowned').addEventListener ('change', function (){
        Options.unownedOnly = (document.getElementById('filUnowned').checked);
        saveOptions();
        t.dispMapTable ();
        }, false);
    }
	if (t.opt.searchType == 2){
		document.getElementById('filCities').addEventListener ('change', function (){
		Options.cityType = document.getElementById('filCities').value
		saveOptions();
        t.dispMapTable ();
		},false);
		document.getElementById('minMight').addEventListener ('change', function (){
		Options.MightSrc = document.getElementById('minMight').value
		saveOptions();
        t.dispMapTable ();
		},false);
	}

    t.mapDat = [];
    t.firstX =  t.opt.startX - t.opt.maxDistance;
    t.lastX = t.opt.startX + t.opt.maxDistance;
    t.firstY =  t.opt.startY - t.opt.maxDistance;
    t.lastY = t.opt.startY + t.opt.maxDistance;
    t.tilesSearched = 0;
    t.tilesFound = 0;
    t.curX = t.firstX;
    t.curY = t.firstY;
    var xxx = t.normalizeCoord(t.curX);
    var yyy = t.normalizeCoord(t.curY);
    document.getElementById ('statStatus').innerHTML = 'Aranilan .. '+ xxx +','+ yyy;
if (DEBUG_TRACE) actionLog (" 0 clickedSearch()... setTimeout ..:" + xxx +' , '+ yyy +' , '+ t.mapCallback.name);
    setTimeout (function(){Map.request (xxx, yyy, 15, t.mapCallback)}, MAP_DELAY);
  },

  dispMapTable : function (){
    var tileNames = ['T.Kampi', 'Çayir', 'Göl', 'Petrol Kuyusu', 'Tepe', 'Dag', 'Ova', 'Sehit' ];
    var t = Tabs.Search;
    var coordsOnly = document.getElementById('coordsOnly').checked;
if (DEBUG_TRACE) DebugTimer.start();
    function mySort(a, b){
      if (Options.srcSortBy == 'level'){
        if ((x = a[4] - b[4]) != 0)
          return x;
      }
	  if (Options.srcSortBy == 'might'){
		if(b[10] == null) b[10] = 0;
		if(a[10] == null) a[10] = 0;
        if ((x = b[10] - a[10]) != 0)
          return x;
      }
      return a[2] - b[2];
    }

    dat = [];
    for (i=0; i<t.mapDat.length; i++){
      lvl = parseInt (t.mapDat[i][4]);
      type = t.mapDat[i][3];
	  if (t.opt.searchType == 2 && type == 7 ) {
			if (!(Options.cityType == 2) || t.mapDat[i][12] == 'ally')
			if (!(Options.cityType == 3) || t.mapDat[i][12] == 'friendly') 
			if (!(Options.cityType == 4) || t.mapDat[i][12] == 'hostile')
			if (!(Options.cityType == 5) || t.mapDat[i][12] == 'neutral') 
			if (!(Options.cityType == 6) || t.mapDat[i][12] == 'unaligned') 
			if (!(Options.cityType == 7) || t.mapDat[i][5]===true)
			if ((t.mapDat[i][10] > parseInt(Options.MightSrc)) || t.mapDat[i][5]===true)
		dat.push(t.mapDat[i]);
	  } else {
		  if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
			if (t.opt.searchType==0 || Options.wildType==0
			||  (Options.wildType==1 && (type==1 || type==2))
			||  (Options.wildType == type))
			  if (!Options.unownedOnly || t.mapDat[i][5]===false)
				dat.push (t.mapDat[i]);
		}
	  }
    }
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: FILTER');

    document.getElementById('statFound').innerHTML = 'Bulundu: '+ dat.length;
    if (dat.length == 0){
      m = '<BR><CENTER>Araniyor ..</center>';
    } else {
      dat.sort(mySort);
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: SORT');
      if (coordsOnly)
        m = '<TABLE align=center id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD width="10%">Lokasyon</td></tr>';
      else {
        if (t.opt.searchType == 2) {
			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD width="10%"><b>Lokasyon</b></td><TD  width="5%"><b>Mesafe</b></td><TD width="15%"><b>Sehir</b></td><TD width="15%"><b>Oyuncu</b></td><TD width="12%"><b>Güç</b></td><td width="15%"><b>Ittifak</b></td><TD width="28%" style="font-size:9px;"><b>Fazla Bilgi</b></td><TD style="padding-left: 10px;"></td></tr>';
		} else { 
			if(Options.unownedOnly || t.opt.searchType == 0){
			  m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD width="20%"><b>Lokasyon</b></td><TD width="10%"><b>Mesafe</b></td><TD width="10%"><b>Sevy.</b></td><TD width=60%><b>Içerik</b></td></tr>';
			} else {
			  m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD align="center" width="10%">Lokasyon</td><TD width="5%">Mesafe</td><TD align="center" width="5%">Sevy.</td><TD align="center" width="10%">Içerik</td><TD align="center" width="15%">Sahip</td><TD width="12%">Güç</td><TD align="center" width="15%">Ittifak</td><TD width=28% align="center" style="font-size:9px;">Fazla Bilgi</td></tr>';
			}
		}
	  }
      var numRows = dat.length;
      if (numRows > 500 && t.searchRunning){
        numRows = 500;
        document.getElementById('srchSizeWarn').innerHTML = '<FONT COLOR=#600000>DIKKAT: Bu menüde En fazla 500\'den '+ dat.length +' \'a kadar sonuçlar görüntülenebilinir..!</font>';
      }
      for (i=0; i<numRows; i++){
	    m += '<TR valign="top"';
		 if (dat[i][12]) m += 'class="pt'+dat[i][12]+'"';
        m += ' ><TD><DIV  onclick="ptGotoMapHide('+ dat[i][0] +','+ dat[i][1] +')"><A class=loc1>'+ dat[i][0] +','+ dat[i][1] +'</a></div></td>';
        if (coordsOnly)
          m += '</tr>';
        else
			if (t.opt.searchType == 2) { 
				 m += '<TD align="left"  valign="top" class=search1 >'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=left class=search1 >'+ dat[i][8] +'</td><TD valign="top" class=search1 >'+dat[i][9]+'</td><TD valign="top" class=search1 >'+dat[i][10]+'</td><td class=search1 >'+dat[i][11]+'</td><td class=search1 >';
				 if (dat[i][5]) {
					m += '<DIV onclick="PTscout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A style="font-size:9px;" >Haberci</a></div>';
				} else 
					m += '<DIV onclick="PTpd(this, '+ dat[i][7] +')"><A class=loc2>Detaylar</a></div>\
					<DIV style="" onclick="PTpd2(this, '+ dat[i][7] +')"><A class=loc2>Liderler</a></div>\
					<DIV style="" onclick="PCpo2(this, '+ dat[i][7] +')"><A class=loc2>Çevrimiçi Durumu</a></div>\
					<DIV style="" onclick="PCplo2(this, '+ dat[i][7] +')"><A class=loc2>Son Giris Tarihi</a></div>';
			    m+= '</td><TD  valign="top">'+ (dat[i][5]?' Siste':'') +'</td></tr>';
			} else {
			  if(!dat[i][5] || t.opt.searchType == 0){
				m += '<TD valign="top" class=search1 >'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD valign="top" class=search1 >'+ dat[i][4] +'</td><TD valign="top" class=search1 >'+ tileNames[dat[i][3]]+'</td><TD colspan=4 class=search1 >'+ (dat[i][5]?' Sahipli':'') +'</td></tr>';
			  } else {
			    m += '<TD align="right" valign="top" class=search1>'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD valign="top" class=search1 >'+ dat[i][4] +'</td><TD valign="top" class=search1 >'+ tileNames[dat[i][3]]+'</td><TD valign="top" class=search1 >'+ dat[i][9] +'</td><TD valign="top" class=search1 >'+dat[i][10]+'</td><TD valign="top" class=search1 >'+dat[i][11]+'</td><td class=search1 >';
				  if (dat[i][6]) {
					m += '<DIV onclick="PTscout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A style="font-size:9px;" >Haberci</a></div>';
				  } else {
					m += '<DIV onclick="PTpd(this, '+ dat[i][8] +')"><A class=loc2 >Detaylar</a></div>\
					<DIV style="" onclick="PTpd2(this, '+ dat[i][8] +')"><A class=loc2>Liderler</a></div>\
					<DIV style="" onclick="PCpo2(this, '+ dat[i][8] +')"><A class=loc2>Çevrimiçi Durumu</a></div>\
					<DIV style="" onclick="PCplo2(this, '+ dat[i][8] +')"><A class=loc2>Son Giris Tarihi</a></div>';
				  }
				m += '</td></tr>';
			  }
			}
       }
      m += '</table>';
    }
    document.getElementById('divOutTab').innerHTML = m;
    dat = null;
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: DRAW');
  },

  mapDat : [],

  gotoMap : function (e){
    coords = e.children[0].innerHTML.split(',');
    hideMe ();
    document.getElementById('mapXCoor').value = coords[0];
    document.getElementById('mapYCoor').value = coords[1];
    unsafeWindow.reCenterMapWithCoor();
    unsafeWindow.changeview_map(document.getElementById('mod_views_map'));
  },
  
  stopSearch : function (msg){
    var t = Tabs.Search;
    document.getElementById ('statStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';
    document.getElementById ('srcStart').value = 'Aramaya BASLA';
    document.getElementById('srchSizeWarn').innerHTML = '';
    t.searchRunning = false;
  },


/** mapdata.userInfo:
(object) player = [object Object]
    (string) name = Crack
    (string) sex = M
    (string) prefix = General
    (string) avatarId = 12
    (number) might = 4852753
    (number) title = 43
    (string) datejoinUnixTime = 1318710345
    (string) truceExpireUnixTime = 1321817715
    (string) warStatus = 1
    (string) entryTag = untagged
    (string) sixwavesig = 1c90b2be08295b4e8f577d17321bb52e
    (null) fname: null = null
    (null) lname: null = null
    (number) beginnerProtectionExpireUnixTime = 0
    (string) cntLogins = 1782
*****/

  mapCallback : function (left, top, width, rslt){
    function insertRow (x, y, msg){
      row = document.getElementById('srcOutTab').insertRow(-1);
      row.insertCell(0).innerHTML = x +','+ y;
      row.insertCell(1).innerHTML = distance (t.opt.startX, t.opt.startY, x, y);
      row.insertCell(2).innerHTML = msg;
    }
if (DEBUG_TRACE) actionLog (" 3 mapCallback()");
    var t = Tabs.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('HATA: '+ rslt.errorMsg);
      return;
    }

    map = rslt.data;
	var userInfo = rslt.userInfo;
    var alliance = rslt.allianceNames;
	
    for (k in map){
      if (t.opt.searchType==0 && map[k].tileType==51 && map[k].tileCityId==0 ) {  // if barb
        type = 0;
      } else if (t.opt.searchType==1 && ((map[k].tileType>=10 && map[k].tileType<=50) || map[k].tileType>200) ) {
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11 || map[k].tileType == 12)
          type = 2;
		else if (map[k].tileType > 200)
		  type = 20;
        else
          type = (map[k].tileType/10) + 1;
      } else if (t.opt.searchType==2 && map[k].tileCityId >= 0 && map[k].tileType > 50 && map[k].cityName)
		  type = 7;
		else
        continue;
      dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      if (dist <= t.opt.maxDistance){
	    if (t.opt.searchType==2) {
			var isMisted = map[k].tileUserId == 0 || false;		
			var uu = 'u'+map[k].tileUserId;
			var aU = 'unknown';
			var aD = 'unknown';
			var mightU = 0;
			var nameU = 'unknown';
			if (isMisted) {
				nameU = 'In mist';
				mightU = ''; 
			} else {
				if (userInfo[uu] ) { // Corrects a problem with hung search.
					nameU = userInfo[uu].n;
					mightU = userInfo[uu].m; 
					aD = getDiplomacy(userInfo[uu].a);
					if ( alliance && alliance['a'+userInfo[uu].a] ) {
						aU = alliance['a'+userInfo[uu].a];
					}
					else {
						aU = '----';
						aD = 'unaligned';
					}
				}
			}
		  t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName,nameU,mightU,aU,aD ]);
		} else {
			isOwned = map[k].tileUserId>0 || map[k].misted;
			if(!isOwned){
				t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned]);
			} else {
				var isMisted = map[k].tileUserId == 0 || false;
				var uu = 'u'+map[k].tileUserId;
				var aU = 'unknown';
				var aD = 'unknown';
				var mightU = 0;
				var nameU = 'unknown';
				if (isMisted) {
					nameU = 'In mist';
					mightU = ''; 
				} else {
					if (userInfo[uu] ) { // Corrects a problem with hung search.
						nameU = userInfo[uu].n;
						mightU = userInfo[uu].m; 
						aD = getDiplomacy(userInfo[uu].a);
						if ( alliance && alliance['a'+userInfo[uu].a] ) {
							aU = alliance['a'+userInfo[uu].a];
						}
						else {
							aU = '----';
							aD = 'unaligned';
						}
					}
				}
				t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, isMisted, map[k].tileCityId, map[k].tileUserId, nameU, mightU, aU, aD]);
			}
		}
        ++t.tilesFound;
      }
    }
    t.tilesSearched += (15*15);
    document.getElementById('statSearched').innerHTML = 'Aranilan: '+ t.tilesSearched;
    t.dispMapTable();

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        t.stopSearch ('Islem Basariyla TAMAMLANDI.!!');
        return;
      }
    }

    var x = t.normalizeCoord(t.curX);
    var y = t.normalizeCoord(t.curY);
    document.getElementById ('statStatus').innerHTML = 'Araniyor .. '+ x +','+ y;
if (DEBUG_TRACE) actionLog (" 0 mapCallback()... setTimeout ..:" + x +' , '+ y +' , '+ t.mapCallback.toString().substr (0,50));
    setTimeout (function(){Map.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
  },
};

/*******************   Arayüzü ****************/
Map = {
/***
 0: bog
10: grassland
11: lake
20: woods
30: hills
40: mountain
50: plain
51: city / barb
53: misted city
201: SR
***/
  generateBlockList : function(left, top, width) {
    var width5 = parseInt(width / 5);
    var bl = [];

    for (x=0; x<width5; x++){
      xx = left + (x*5);
      if (xx > 795)
        xx -= 800;
      for (y=0; y<width5; y++){
        yy = top + (y*5);
        if (yy > 795)
          yy -= 800;
        bl.push ('bl_'+ xx +'_bt_'+ yy);
      }
    }
    return bl.join(",");
  },

  callback : null,
  request : function (left, top, width, cb) {
if (DEBUG_TRACE) logit (" 1 Map.request(): "+ left +' , '+ top +' , '+ width);
    left = parseInt(left / 5) * 5;
    top = parseInt(top / 5) * 5;
    width = parseInt((width+4) / 5) * 5;
    var blockString = this.generateBlockList(left, top, width);
    Map.callback = cb;
    if (unsafeWindow.SANDBOX)
      return RequestMAPTEST(left, top, width, callback);
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.blocks = blockString;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
if (DEBUG_TRACE) logit (" 2 Map.request  Map = "+ inspect (Map, 2, 1, 2));
        Map.callback(left, top, width, rslt);
      },
      onFailure: function (rslt) {
        Map.callback(left, top, width, rslt);
      }
    });
  },
};

 /****************************  Nakliye Sekmesi Fonksiyonu  *******************************/
Tabs.transport = {
  tabOrder: 33,
  tabLabel: 'NAKLIYE',
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
		t.traderState = {running: false,};
		t.readTraderState();
	    t.readTradeRoutes();
	    t.e_tradeRoutes();

      var m = '<DIV id=pbTowrtDivF class=pbStat>OTOMATIK NAKLIYE FONKSIYONU</div><TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center">';
      if (t.traderState.running == false) {
          m += '<TD><INPUT id=pbTraderState type=submit value="Nakliye = KAPALI"></td>';
      } else {
          m += '<TD><INPUT id=pbTraderState type=submit value="Nakliye = AÇIK"></td>';
      }
      m += '<TD><INPUT id=pbShowRoutes type=submit value="Kayitlari GÖSTER"></td>';
      m += '</tr></table></div>';
      m += '<DIV id=pbTraderDivDRoute class=pbStat>NAKLIYE SEÇENEKLERI</div>';
      m += '<TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center"><TR align="left">';
	    m += '<TD colspan=4>Nakliye Kontrolü Zaman Araligi: <INPUT id=pbtransportinterval type=text size=2 value="'+Options.transportinterval+'"\> Dakikada Bir Bakilir..</td></tr></table>';
      m += '<TD colspan=4><INPUT id=pbminwagons type=text size=2 value="'+Options.minwagons+'"\> En az Yandaki Kutuya Girilecek Miktarda Nakliyeye Izin Verir ..</td></tr></table>';
      m += '<DIV style="margin-top:10px;margin-bottom:5px;">EvrenSerdar v3</div></table>';
    
      
      m += '<DIV id=pbTraderDivDRoute class=pbStat>NAKLIYE</div>';
      m += '<TABLE id=pbaddtraderoute width=95% height=0% class=pbTab><TR align="left">';
      m += '<TR align="left"><TD>Buradan:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptrescity></span></div></td></tr>';

      m += '<TR align="left">';
      m += '<TD>Buraya:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptcityTo></span></div></td>';
      m += '<TD>Yada,Koordinat</td>';
      m += '<TD>X:<INPUT id=ptcityX type=text size=3\></td>';
      m += '<TD>Y:<INPUT id=ptcityY type=text size=3\></td></tr>';
      m += '<TABLE id=pbaddtraderoute height=0% class=pbTab><TR align="left">';
      m += '<TD width=75px>Birim:</td><TD width=150px><SELECT id="TransportTroop">';
      for (y in unsafeWindow.arStrings.unitName) if(y == "u2"){continue} else if(y == "u14") {continue} else { m+='<option value="'+findoptvalue(y)+'">'+unsafeWindow.arStrings.unitName[y]+'</option>' };
      m+='</select></td><TD width=75px>Seçilen Birim:&nbsp;</td><TD id=TroopAmount align=left width=75px></td>';
      m+='<TD width=75px>Tasinan Miktar:&nbsp;</td><TD id=CarryAmount align=left width=75px></td>';
      m += '<TR><TD >Tasiyacak Birim: </td><TD><INPUT id=TroopsToSend type=text size=6 maxlength=6 value="0">&nbsp;&nbsp;<INPUT id=MaxTroops type=submit value="Maks."></td>';
      m += '<TD width=50px><INPUT id=FillInMax type=submit value="<----"></td>';
      m +='<TD id=Calc colspan=3></td></tr>';
      m += '<TABLE id=pbaddtraderoute height=0% class=pbTab><TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + FOOD_IMAGE +');</td>';
      m += '<TD id=TransRec1 align=right width=110px></td>';
      m += '<TD id=HaveRec1 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipFood type=checkbox unchecked=true\></td>';
      m += '<TD width=180px  align=left>Tasinmayacak: <INPUT id=pbtargetamountFood type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Tasinan: <INPUT id=pbtradeamountFood type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxFood type=submit value="Maks."></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + OIL_IMAGE +')</td>';
      m += '<TD id=TransRec2 align=right width=110px></td>';
      m += '<TD id=HaveRec2 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipWood type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Tasinmayacak: <INPUT id=pbtargetamountWood type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Tasinan: <INPUT id=pbtradeamountWood type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxWood type=submit value="Maks."></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + STONE_IMAGE +')</td>';
      m += '<TD id=TransRec3 align=right width=110px></td>';
      m += '<TD id=HaveRec3 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipStone type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Tasinmayacak: <INPUT id=pbtargetamountStone type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Tasinan: <INPUT id=pbtradeamountStone type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxStone type=submit value="Maks."></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + STEEL_IMAGE +')</td>';
      m += '<TD id=TransRec4 align=right width=110px></td>';
      m += '<TD id=HaveRec4 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipOre type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Tasinmayacak: <INPUT id=pbtargetamountOre type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Tasinan: <INPUT id=pbtradeamountOre type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxOre type=submit value="Maks."></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + GRAPH_IMAGE +')</td>';
      m += '<TD id=TransRec5 align=right width=110px></td>';
      m += '<TD id=HaveRec5 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipGraph type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Tasinmayacak: <INPUT id=pbtargetamountGraph type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Tasinan: <INPUT id=pbtradeamountGraph type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxGraph type=submit value="Maks."></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + TITA_IMAGE +')</td>';
      m += '<TD id=TransRec6 align=right width=110px></td>';
      m += '<TD id=HaveRec6 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipTita type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Tasinmayacak: <INPUT id=pbtargetamountTita type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Tasinan: <INPUT id=pbtradeamountTita type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxTita type=submit value="Maks."></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + GOLD_IMAGE +'></td>';
      m += '<TD id=TransGold align=right width=110px></td>';
      m += '<TD id=HaveGold align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipGold type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Tasinmayacak: <INPUT id=pbtargetamountGold type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Tasinan: <INPUT id=pbtradeamountGold type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxGold type=submit value="Maks."></td></tr>';

      m += '</table>';

      m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRoute type=submit value="KAYIT EKLE"><INPUT id=pbManualSend type=submit value="Elle NAKLIYE ET"></div>';
      m += '<DIV id=errorSpace></div>'
      
      t.myDiv.innerHTML = m;
      
      document.getElementById('TransportTroop').value = 'unt19';
      
      t.tcp = new CdispCityPicker ('pttrader', document.getElementById('ptrescity'), true, t.updateResources, 0);
      t.tcpto = new CdispCityPicker ('pttraderTo', document.getElementById('ptcityTo'), true, t.clickCitySelect).bindToXYboxes(document.getElementById ('ptcityX'), document.getElementById ('ptcityY'));
      
      
      document.getElementById('TransportTroop').addEventListener('change', function(){t.updateTroops();}, false);
      document.getElementById('pbTraderState').addEventListener('click', function(){t.toggleTraderState(this);}, false);
      document.getElementById('pbSaveRoute').addEventListener('click', function(){t.addTradeRoute();}, false);
      document.getElementById('pbManualSend').addEventListener('click', function(){t.ManualTransport();}, false);
      document.getElementById('pbShowRoutes').addEventListener('click', function(){t.showTradeRoutes();}, false);
      document.getElementById('FillInMax').addEventListener('click', function(){document.getElementById('TroopsToSend').value = t.TroopsNeeded;}, false);
      
      document.getElementById('MaxTroops').addEventListener('click', function(){
			var rallypointlevel = t.getRallypoint('city' + t.tcp.city.id);
			var max = t.Troops;
			if (t.Troops > (rallypointlevel*10000) ) max = (rallypointlevel*10000);
			document.getElementById('TroopsToSend').value = max;
	  }, false);
      document.getElementById('MaxFood').addEventListener('click', function(){
      		t.Food = 0;
      		document.getElementById('pbtradeamountFood').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Graph + t.Tita + t.Gold);
      }, false);
      document.getElementById('MaxWood').addEventListener('click', function(){
      		t.Wood = 0;
      		document.getElementById('pbtradeamountWood').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Graph + t.Tita + t.Gold);
      }, false);
      document.getElementById('MaxStone').addEventListener('click', function(){
      		t.Stone = 0;
      		document.getElementById('pbtradeamountStone').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Graph + t.Tita +  t.Gold);
      }, false);
      document.getElementById('MaxOre').addEventListener('click', function(){
      		t.Ore = 0;
      		document.getElementById('pbtradeamountOre').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Graph + t.Tita + t.Gold);
      }, false);
      document.getElementById('MaxGraph').addEventListener('click', function(){
      		t.Graph = 0;
      		document.getElementById('pbtradeamountGraph').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Graph + t.Tita + t.Gold);
      }, false);
      document.getElementById('MaxTita').addEventListener('click', function(){
      		t.Tita = 0;
      		document.getElementById('pbtradeamountTita').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Graph + t.Tita + t.Gold);
      }, false);
      document.getElementById('MaxGold').addEventListener('click', function(){
      		t.Gold = 0;
      		document.getElementById('pbtradeamountGold').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Graph + t.Tita + t.Gold);
      }, false);
      
      document.getElementById('pbtransportinterval').addEventListener('keyup', function(){
		if (isNaN(document.getElementById('pbtransportinterval').value)){ document.getElementById('pbtransportinterval').value=60 ;}
		Options.transportinterval = document.getElementById('pbtransportinterval').value;
		saveOptions();
      }, false);
      
      document.getElementById('pbtargetamountFood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountFood').value)) document.getElementById('pbtargetamountFood').value=0 ;
      }, false);
      document.getElementById('pbtargetamountWood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountWood').value)) document.getElementById('pbtargetamountWood').value=0 ;
      }, false);
      document.getElementById('pbtargetamountStone').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountStone').value)) document.getElementById('pbtargetamountStone').value=0 ;
      }, false);
      document.getElementById('pbtargetamountOre').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountOre').value)) document.getElementById('pbtargetamountOre').value=0 ;
      }, false);
 document.getElementById('pbtargetamountGraph').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountGraph').value)) document.getElementById('pbtargetamountGraph').value=0 ;
      }, false);
document.getElementById('pbtargetamountTita').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountTita').value)) document.getElementById('pbtargetamountTita').value=0 ;
      }, false);
      document.getElementById('pbtargetamountGold').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountGold').value)) document.getElementById('pbtargetamountGold').value=0 ;
      }, false);
      document.getElementById('pbtradeamountFood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountFood').value)) document.getElementById('pbtradeamountFood').value=0 ;
      }, false);
      document.getElementById('pbtradeamountWood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountWood').value)) document.getElementById('pbtradeamountWood').value=0 ;
      }, false);
      document.getElementById('pbtradeamountStone').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountStone').value)) document.getElementById('pbtradeamountStone').value=0 ;
      }, false);
      document.getElementById('pbtradeamountOre').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountOre').value)) document.getElementById('pbtradeamountOre').value=0 ;
      }, false);
document.getElementById('pbtargetamountGraph').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountGraph').value)) document.getElementById('pbtargetamountGraph').value=0 ;
      }, false);
document.getElementById('pbtargetamountTita').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountTita').value)) document.getElementById('pbtargetamountTita').value=0 ;
      }, false);
      document.getElementById('pbtradeamountGold').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountGold').value)) document.getElementById('pbtradeamountGold').value=0 ;
      }, false);
     document.getElementById('pbminwagons').addEventListener('keyup', function(){
         if (isNaN(document.getElementById('pbminwagons').value)) document.getElementById('pbminwagons').value=100 ;
         Options.minwagons = parseInt(document.getElementById('pbminwagons').value);
         saveOptions();
     }, false)
      
      document.getElementById('pbshipFood').addEventListener('click', function(){
          if (document.getElementById('pbshipFood').checked==false) {
              document.getElementById('pbtargetamountFood').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountFood').disabled = false;
          }
      },false);
      document.getElementById('pbshipWood').addEventListener('click', function(){
          if (document.getElementById('pbshipWood').checked==false) {
              document.getElementById('pbtargetamountWood').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountWood').disabled = false;
          }
      },false);
      document.getElementById('pbshipStone').addEventListener('click', function(){
          if (document.getElementById('pbshipStone').checked==false) {
              document.getElementById('pbtargetamountStone').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountStone').disabled = false;
          }
      },false);
      document.getElementById('pbshipOre').addEventListener('click', function(){
          if (document.getElementById('pbshipOre').checked==false) {
              document.getElementById('pbtargetamountOre').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountOre').disabled = false;
          }
      },false);

      document.getElementById('pbshipGraph').addEventListener('click', function(){
          if (document.getElementById('pbshipGraph').checked==false) {
              document.getElementById('pbtargetamountGraph').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountGraph').disabled = false;
          }
      },false);
      document.getElementById('pbshipTita').addEventListener('click', function(){
          if (document.getElementById('pbshipTita').checked==false) {
              document.getElementById('pbtargetamountTita').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountTita').disabled = false;
          }
      },false);
      document.getElementById('pbshipGold').addEventListener('click', function(){
          if (document.getElementById('pbshipGold').checked==false) {
              document.getElementById('pbtargetamountGold').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountGold').disabled = false;
          }
      },false);
      window.addEventListener('unload', t.onUnload, false);
    },
        
    updateResources : function (){
    	var t = Tabs.transport;
    	var ToCity = null;
    	for (var i=1;i<=6;i++) document.getElementById('TransRec'+i).innerHTML = addCommas ( parseInt(Seed.resources["city" + t.tcp.city.id]['rec'+i][0]/3600) );
    	document.getElementById('TransGold').innerHTML = addCommas ( parseInt(Seed.citystats["city" + t.tcp.city.id]['gold'][0]) );
    	for (ii in Seed.cities)
        if (Seed.cities[ii][2] == document.getElementById ('ptcityX').value && Seed.cities[ii][3] == document.getElementById ('ptcityY').value)
          ToCity = Seed.cities[ii][0];
      for (var i=1;i<=6;i++)
          if (ToCity != null)
               document.getElementById('HaveRec'+i).innerHTML = addCommas ( parseInt(Seed.resources["city" + ToCity]['rec'+i][0]/3600) );
    	    else document.getElementById('HaveRec'+i).innerHTML = "----";
      if (ToCity != null) document.getElementById('HaveGold').innerHTML = addCommas ( parseInt(Seed.citystats["city" + ToCity]['gold'][0]) );
      else  document.getElementById('HaveGold').innerHTML =  "----";   
    },
    
    updateTroops : function (city){
    	var t = Tabs.transport;
    	var fontcolor = 'black';
    	t.Food = parseInt(document.getElementById('pbtradeamountFood').value);
      	t.Wood = parseInt(document.getElementById('pbtradeamountWood').value);
      	t.Stone = parseInt(document.getElementById('pbtradeamountStone').value);
      	t.Ore = parseInt(document.getElementById('pbtradeamountOre').value);
      	t.Graph = parseInt(document.getElementById('pbtradeamountGraph').value);
		t.Tita = parseInt(document.getElementById('pbtradeamountTita').value);
      	t.Gold = parseInt(document.getElementById('pbtradeamountGold').value);
    	var unit = document.getElementById('TransportTroop').value;
    	t.Troops = parseInt(Seed.units['city' + t.tcp.city.id][unit]);
    	var featherweight = parseInt(Seed.tech.tch10);
    	var Load = parseInt(unsafeWindow.unitstats[unit]['5'])
    	var LoadUnit = (featherweight * ((Load/100)*10)) + Load;
    	var GlobalMaxLoad = t.Troops * LoadUnit;
    	t.MaxLoad = parseInt(document.getElementById('TroopsToSend').value) * LoadUnit;
     	t.TroopsNeeded = (t.Food + t.Wood + t.Stone + t.Ore + t.Graph + t.Tita + t.Gold) / LoadUnit;
     	t.TroopsNeeded = t.TroopsNeeded.toFixed(0);	
		if (t.TroopsNeeded < ((t.Food + t.Wood + t.Stone + t.Ore + t.Graph + t.tita + t.Gold) / LoadUnit)) t.TroopsNeeded++;	
        
        if ( t.TroopsNeeded > t.Troops) fontcolor = 'red';
    	if (t.Troops > 0 ) document.getElementById('TroopAmount').innerHTML = '<FONT color='+fontcolor+'>' + addCommas(t.Troops) + '</font>';
    	else document.getElementById('TroopAmount').innerHTML = 0;
    	if (GlobalMaxLoad > 0) document.getElementById('CarryAmount').innerHTML = addCommas(GlobalMaxLoad);
    	else  document.getElementById('CarryAmount').innerHTML = 0;
    	
    	document.getElementById('Calc').innerHTML = 'Malzeme: ' +  addCommas(t.Food + t.Wood + t.Stone + t.Ore + t.Graph + t.Tita + t.Gold) + ' / ' + addCommas(t.MaxLoad) + '&nbsp;&nbsp;(Birim Gereksinimi: <FONT color='+fontcolor+'>' + addCommas(t.TroopsNeeded) + '</font> )' ;
    	
    },    
    
    getRallypoint: function(cityId){
      var t = Tabs.transport;
      for (var o in Seed.buildings[cityId]){
		var buildingType = parseInt(Seed.buildings[cityId][o][0]);
		var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
		if (buildingType == 12){
			return parseInt(buildingLevel);
			break;
		}
	   }
	  return 0;
    },
      	  

 e_tradeRoutes: function(){
      var t = Tabs.transport;
      var now = new Date();
      if (t.traderState.running == true)    {

	  var now = new Date().getTime()/1000.0;
      	now = now.toFixed(0);
      	var last = Options.lasttransport;

		if ( now > (parseInt(last) + (Options.transportinterval*60))){
				  t.checkdoTrades();

      		}
      }
	  setTimeout(function(){ t.e_tradeRoutes();}, Options.transportinterval*1000);
	  
    },
    	
	delTradeRoutes: function() {
		var t = Tabs.transport;	
		t.tradeRoutes= [];
	},
	
	checkcoords : function (obj){
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
		if (document.getElementById('ptcityX').value==0 && document.getElementById('ptcityY').value ==0 && !t.check)
		{
			new CdialogConfirm ('<SPAN class=boldRed>DIKKAT 0-0 Koordinatina Nakliye Yapmaya Çalisiyorsunuz..!!</span>', t.checkcoords, unsafeWindow.modal_attack_check, mainPop.getMainDiv); 
			return;
		}
		var ship_Food = document.getElementById('pbshipFood').checked;
		var ship_Wood = document.getElementById('pbshipWood').checked;
		var ship_Stone = document.getElementById('pbshipStone').checked;
		var ship_Ore = document.getElementById('pbshipOre').checked;
		var ship_Graph = document.getElementById('pbshipGraph').checked;
		var ship_Tita = document.getElementById('pbshipTita').checked;
		var ship_Gold = document.getElementById('pbshipGold').checked;
		var target_Food = document.getElementById('pbtargetamountFood').value;
		var target_Wood = document.getElementById('pbtargetamountWood').value;
		var target_Stone = document.getElementById('pbtargetamountStone').value;
		var target_Ore = document.getElementById('pbtargetamountOre').value;
		var target_Graph = document.getElementById('pbtargetamountGraph').value;
		var target_Tita = document.getElementById('pbtargetamountTita').value;		
		var target_Gold = document.getElementById('pbtargetamountGold').value;
		var trade_Food = document.getElementById('pbtradeamountFood').value;
		var trade_Wood = document.getElementById('pbtradeamountWood').value;
		var trade_Stone = document.getElementById('pbtradeamountStone').value;
		var trade_Ore = document.getElementById('pbtradeamountOre').value;
		var trade_Graph = document.getElementById('pbtradeamountGraph').value;
		var trade_Tita = document.getElementById('pbtradeamountTita').value;
		var trade_Gold = document.getElementById('pbtradeamountGold').value;
		var target_x = document.getElementById('ptcityX').value;
		var target_y = document.getElementById('ptcityY').value;
		var TroopType = document.getElementById('TransportTroop').value;
		var route_state = true;
				
		if (valid == true) {
			var lTR = t.tradeRoutes;
			lTR.push({
				city:				city,
				ship_Food:			ship_Food,
				target_Food:		target_Food,
				trade_Food: 		trade_Food,
				ship_Wood:			ship_Wood,
				target_Wood:		target_Wood,
				trade_Wood: 		trade_Wood,
				ship_Stone:			ship_Stone,
				target_Stone:		target_Stone,
				trade_Stone: 		trade_Stone,
				ship_Ore:			ship_Ore,
				target_Ore:		target_Ore,
				trade_Ore:	 	trade_Ore,
				ship_Graph:			ship_Graph,
				target_Graph:		target_Graph,
				trade_Graph:	 	trade_Graph,
				ship_Tita:			ship_Tita,
				target_Tita:		target_Tita,
				trade_Tita:	    	trade_Tita,
				ship_Gold:			ship_Gold,
				target_Gold:		target_Gold,
				trade_Gold: 		trade_Gold,
				target_x: 			target_x,
				target_y: 			target_y,
				TroopType:          TroopType,
				route_state: 		"true"
			});
		}
		document.getElementById('pbTraderDivDRoute').style.background ='#99FF99';
		setTimeout(function(){ (document.getElementById('pbTraderDivDRoute').style.background =''); }, 1000);
	},
	showTradeRoutes: function () {
		var t = Tabs.transport;
		var popTradeRoutes = null;
		t.popTradeRoutes = new CPopup('pbShowTrade', 0, 0, 750, 500, true, function() {clearTimeout (1000);});
		var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTab" id="pbRoutesQueue">';       
		t.popTradeRoutes.getMainDiv().innerHTML = '</table></div>' + m;
		t.popTradeRoutes.getTopDiv().innerHTML = '<TD><B>Nakliye KAYITLARI:</td>';
		t.paintTradeRoutes();
		t.popTradeRoutes.show(true)	;
	},
	paintTradeRoutes: function(){
	        var t = Tabs.transport;
	        var r = t.tradeRoutes;
	        var cityname;
	        var citynameTo = null;
	        var m= '<TABLE id=paintRoutes class=pbTab>'; 
			for (var i=0;i<(r.length);i++) {
			  citynameTo = null;
				for (var y=0; y< Seed.cities.length;y++) {
					if ( parseInt(Seed.cities[y][0]) == r[i].city) var cityname = Seed.cities[y][1];
					if ( parseInt(Seed.cities[y][2]) == r[i].target_x && parseInt(Seed.cities[y][3]) == r[i].target_y) var citynameTo = Seed.cities[y][1];
				}    
				var queueId = i;
				if (citynameTo == null) var TO = r[i].target_x +','+ r[i].target_y;
				else TO = citynameTo;
				if (r[i].route_state) var status = '<FONT color=green>AKTIF</font>';
				else var status = '<FONT color=red>PASIF</font>';
				if (r[i].TroopType == undefined) var unit = 'unt9';
        else var unit2 = r[i].TroopType;
		    var unit = 'u' + unit2.substring(3)
				m += '<TR><TD TD width=12px>&nbsp;&nbsp;</td></tr>';
        m +='<TR><TD width=20px>'+(i+1)+'</td><TD width=175px>Buradan:&nbsp;&nbsp;'+ cityname +'</TD><TD width=175px>Buradan:&nbsp;&nbsp;'+ TO +'</td><TD width=175px>'+status+'</td>';
        m +='<TD width=60px><A class="ptButton21" onclick="traceEdit('+queueId+')">Düzenle</a></td><TD width=60px><A class="ptButton21" onclick="traceDelete('+queueId+')">SIL</a></td></tr>';
        m += '<TR><TD></td><TD>Birim:&nbsp;&nbsp'+unsafeWindow.arStrings.unitName[unit]+'</td></tr>';
        if (r[i].ship_Food) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + FOOD_IMAGE +'></td><TD>Hedef: '+ addCommas(r[i].target_Food) +'</td><TD>Malzeme: '+ addCommas(r[i].trade_Food)+'</td>';
		if (r[i].ship_Wood) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + OIL_IMAGE +'></td><TD>Hedef: '+ addCommas(r[i].target_Wood) +'</td><TD>Malzeme: '+ addCommas(r[i].trade_Wood)+'</td>';
		if (r[i].ship_Stone) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + STONE_IMAGE +'></td><TD>Hedef: '+ addCommas(r[i].target_Stone) +'</td><TD>Trade: '+ addCommas(r[i].trade_Stone)+'</td>';
		if (r[i].ship_Ore) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + STEEL_IMAGE +'></td><TD>Hedef: '+ addCommas(r[i].target_Ore) +'</td><TD>Malzeme: '+ addCommas(r[i].trade_Ore)+'</td>';
		if (r[i].ship_Graph) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + GRAPH_IMAGE +'></td><TD>Hedef: '+ addCommas(r[i].target_Graph) +'</td><TD>Trade: '+ addCommas(r[i].trade_Graph)+'</td>';
		if (r[i].ship_Tita) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + TITA_IMAGE +'></td><TD>Hedef: '+ addCommas(r[i].target_Tita) +'</td><TD>Malzeme: '+ addCommas(r[i].trade_Tita)+'</td>';
		if (r[i].ship_Gold) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + GOLD_IMAGE +'></td><TD>Hedef: '+ addCommas(r[i].target_Gold) +'</td><TD>Malzeme: '+ addCommas(r[i].trade_Gold)+'</td>';
       }
	     m +='</table>';
	     document.getElementById('pbRoutesQueue').innerHTML= m; 
       unsafeWindow.traceEdit = t.editQueueElement;
       unsafeWindow.traceDelete = t.cancelQueueElement;
	    },
	  
	 cancelQueueElement: function(queueId){
	     var t = Tabs.transport;
	     var queueId = parseInt(queueId);
	     t.tradeRoutes.splice(queueId, 1);
	     t.showTradeRoutes();
	 },
	 
	 editQueueElement: function(queueId){
	     var t = Tabs.transport;
	     var r = t.tradeRoutes;
       var queueId = parseInt(queueId);
	     var cityname;
	     var citynameTo = null;
	     var Types = ['Yiyecek','Petrol','Tas','Çelik','Grafen','Titanyum','Altin'];
	     for (var y=0; y< Seed.cities.length;y++) {
					if ( parseInt(Seed.cities[y][0]) == r[queueId].city) var cityname = Seed.cities[y][1];
					if ( parseInt(Seed.cities[y][2]) == r[queueId].target_x && parseInt(Seed.cities[y][3]) == r[queueId].target_y) var citynameTo = Seed.cities[y][1];
			 }
       if (citynameTo == null) var TO = r[queueId].target_x +','+ r[queueId].target_y;
			 else TO = citynameTo; 
       var n = '<TABLE id=editRoutes class=pbTab>';
	     n +='<TD>Buradan:&nbsp;'+ cityname +'</td><TD>Buraya:&nbsp;'+ TO +'</td>';
	     n +='<TD><INPUT id=TradeStatus type=checkbox>&nbsp;Enable Route</td>';
	     n += '<TD width=150px>Birim Içerigi:<SELECT id="pbbTransportTroop">';
for (y in unsafeWindow.arStrings.unitName) if(y == "u2"){continue} else if(y == "u14") {continue} else { n+='<option value="'+findoptvalue(y)+'">'+unsafeWindow.arStrings.unitName[y]+'</option>' };
       n+='</select></td></table><BR><TABLE  id=editRoutes class=pbTab>';
         n += '<TR><TD width=50px align=center><img src=' + FOOD_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipfood type=checkbox></td>';
         n += '<TD width=125px>Tasinamaz: <INPUT id=pbbtargetamountfood type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Tasinan: <INPUT id=pbbtradeamountfood type=text size=11 maxlength=11 value="0"\></td></tr>';
         n += '<TR><TD width=50px align=center><img src=' + OIL_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipwood type=checkbox></td>';
         n += '<TD width=125px>Tasinamaz: <INPUT id=pbbtargetamountwood type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Tasinan: <INPUT id=pbbtradeamountwood type=text size=11 maxlength=11 value="0"\></td></tr>';
         n += '<TR><TD width=50px align=center><img src=' + STONE_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipstone type=checkbox></td>';
         n += '<TD width=125px>Tasinamaz: <INPUT id=pbbtargetamountstone type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Tasinan: <INPUT id=pbbtradeamountstone type=text size=11 maxlength=11 value="0"\></td></tr>';
         n += '<TR><TD width=50px align=center><img src=' + STEEL_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipore type=checkbox></td>';
         n += '<TD width=125px>Tasinamaz: <INPUT id=pbbtargetamountore type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Tasinan: <INPUT id=pbbtradeamountore type=text size=11 maxlength=11 value="0"\></td></tr>';
		 n += '<TR><TD width=50px align=center><img src=' + GRAPH_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipgraph type=checkbox></td>';
         n += '<TD width=125px>Tasinamaz: <INPUT id=pbbtargetamountgraph type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Tasinan: <INPUT id=pbbtradeamountgraph type=text size=11 maxlength=11 value="0"\></td></tr>';
         n += '<TR><TD width=50px align=center><img src=' + TITA_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshiptita type=checkbox></td>';
         n += '<TD width=125px>Tasinamaz: <INPUT id=pbbtargetamounttita type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Tasinan: <INPUT id=pbbtradeamounttita type=text size=11 maxlength=11 value="0"\></td></tr>';
         n += '<TR><TD width=50px align=center><img src=' + GOLD_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipgold type=checkbox></td>';
         n += '<TD width=125px>Tasinamaz: <INPUT id=pbbtargetamountgold type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Tasinan: <INPUT id=pbbtradeamountgold type=text size=11 maxlength=11 value="0"\></td></tr>'
       n+='</table><BR><TABLE id=editRoutes class=pbTab><TR><TD><a class="ptButton21" id="Cancel"><span>IPTAL</span></a></td>';
       n+='<TD><a class="ptButton21" id="Save"><span>KAYDET</span></a></td></tr>';
       n +='</table>';
       
       document.getElementById('pbRoutesQueue').innerHTML= n;
       document.getElementById('TradeStatus').checked = r[queueId].route_state;
       if (r[queueId].TroopType == undefined) var unit = 'unt9';
       else var unit = r[queueId].TroopType;
       document.getElementById('pbbTransportTroop').value = unit;
       document.getElementById('pbbshipfood').checked = r[queueId].ship_Food;
       document.getElementById('pbbshipwood').checked = r[queueId].ship_Wood;
       document.getElementById('pbbshipstone').checked = r[queueId].ship_Stone;
       document.getElementById('pbbshipore').checked = r[queueId].ship_Ore;
       document.getElementById('pbbshipgraph').checked = r[queueId].ship_Graph;
	   document.getElementById('pbbshiptita').checked = r[queueId].ship_Tita;
       document.getElementById('pbbshipgold').checked = r[queueId].ship_Gold;
       document.getElementById('pbbtargetamountfood').value = r[queueId].target_Food;
       document.getElementById('pbbtargetamountwood').value = r[queueId].target_Wood;
       document.getElementById('pbbtargetamountstone').value = r[queueId].target_Stone;
       document.getElementById('pbbtargetamountore').value = r[queueId].target_Ore;
       document.getElementById('pbbtargetamountgraph').value = r[queueId].target_Graph;
	   document.getElementById('pbbtargetamounttita').value = r[queueId].target_Tita;
       document.getElementById('pbbtargetamountgold').value = r[queueId].target_Gold;
       document.getElementById('pbbtradeamountfood').value = r[queueId].trade_Food;
       document.getElementById('pbbtradeamountwood').value = r[queueId].trade_Wood;
       document.getElementById('pbbtradeamountstone').value = r[queueId].trade_Stone;
       document.getElementById('pbbtradeamountore').value = r[queueId].trade_Ore;
       document.getElementById('pbbtradeamountgraph').value = r[queueId].trade_Graph;
       document.getElementById('pbbtradeamounttita').value = r[queueId].trade_Tita;	   
       document.getElementById('pbbtradeamountgold').value = r[queueId].trade_Gold;
       document.getElementById('Cancel').addEventListener('click', function(){t.showTradeRoutes();}, false);
       document.getElementById('Save').addEventListener('click', function(){
            r[queueId].route_state = document.getElementById('TradeStatus').checked;
            r[queueId].TroopType = document.getElementById('pbbTransportTroop').value;
            r[queueId].ship_Food = document.getElementById('pbbshipfood').checked;
            r[queueId].ship_Wood = document.getElementById('pbbshipwood').checked;
            r[queueId].ship_Stone = document.getElementById('pbbshipstone').checked;
            r[queueId].ship_Ore = document.getElementById('pbbshipore').checked;
            r[queueId].ship_Graph = document.getElementById('pbbshipgraph').checked;  
            r[queueId].ship_Tita = document.getElementById('pbbshiptita').checked;  
			r[queueId].ship_Gold = document.getElementById('pbbshipgold').checked;
            r[queueId].target_Food = document.getElementById('pbbtargetamountfood').value;
            r[queueId].target_Wood = document.getElementById('pbbtargetamountwood').value;
            r[queueId].target_Stone = document.getElementById('pbbtargetamountstone').value;
            r[queueId].target_Ore = document.getElementById('pbbtargetamountore').value;
            r[queueId].target_Graph = document.getElementById('pbbtargetamountgraph').value;
            r[queueId].target_Tita = document.getElementById('pbbtargetamounttita').value;
            r[queueId].target_Gold = document.getElementById('pbbtargetamountgold').value;
            r[queueId].trade_Food = document.getElementById('pbbtradeamountfood').value;
            r[queueId].trade_Wood = document.getElementById('pbbtradeamountwood').value;
            r[queueId].trade_Stone = document.getElementById('pbbtradeamountstone').value;
            r[queueId].trade_Ore = document.getElementById('pbbtradeamountore').value;
            r[queueId].trade_Graph = document.getElementById('pbbtradeamountgraph').value;
            r[queueId].trade_Tita = document.getElementById('pbbtradeamounttita').value;
            r[queueId].trade_Gold = document.getElementById('pbbtradeamountgold').value;
            t.showTradeRoutes();
        }, false);
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
            for (k in route)
                t.tradeRoutes[k] = route[k];
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
            obj.value = "Nakliye = KAPALI";
			clearTimeout(t.checkdotradetimeout);
			t.count = 0;
        }
        else {
            t.traderState.running = true;
            obj.value = "Nakliye = AÇIK";
			t.e_tradeRoutes();
        }
    },
	
	checkdoTrades: function(){
	var t = Tabs.transport;
	if(t.tradeRoutes.length==0) return;
	t.doTrades(t.count);
	t.count++;
	if(t.count < t.tradeRoutes.length){
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
   	if(t.tradeRoutes.length==0) return;
   	if(!t.tradeRoutes[count]["route_state"]) return;
   	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.gold =0;
		params.r1 =0;
		params.r2 =0;
		params.r3 =0;
		params.r4 =0;
		params.r5 =0;
		params.r6 =0;
		params.kid = 0;
		
		var carry_amount= 0;
		var wagons_needed=0;
		var citymax = 0;
		var city = t.tradeRoutes[count]["city"];
		var cityID = 'city' + city;
		
		if(!Cities.byID[city]) return;
   	 	var xcoord = t.tradeRoutes[count]["target_x"];
    	var ycoord = t.tradeRoutes[count]["target_y"];
    	var trade_Food = t.tradeRoutes[count]["trade_Food"];
    	var trade_Wood = t.tradeRoutes[count]["trade_Wood"];
    	var trade_Stone = t.tradeRoutes[count]["trade_Stone"];
    	var trade_Ore = t.tradeRoutes[count]["trade_Ore"];
    	var trade_Graph = t.tradeRoutes[count]["trade_Graph"];
		var trade_Tita = t.tradeRoutes[count]["trade_Tita"];
    	var trade_Gold = t.tradeRoutes[count]["trade_Gold"];
    	var target_Food = t.tradeRoutes[count]["target_Food"];
    	var target_Wood = t.tradeRoutes[count]["target_Wood"];
    	var target_Stone = t.tradeRoutes[count]["target_Stone"];
    	var target_Ore = t.tradeRoutes[count]["target_Ore"];
    	var target_Graph = t.tradeRoutes[count]["target_Graph"];
		var target_Tita = t.tradeRoutes[count]["target_Tita"];
    	var target_Gold = t.tradeRoutes[count]["target_Gold"];
    	var ship_Food = t.tradeRoutes[count]["ship_Food"];
    	var ship_Wood = t.tradeRoutes[count]["ship_Wood"];
    	var ship_Stone = t.tradeRoutes[count]["ship_Stone"];
    	var ship_Ore = t.tradeRoutes[count]["ship_Ore"];
    	var ship_Graph = t.tradeRoutes[count]["ship_Graph"];
		var ship_Tita = t.tradeRoutes[count]["ship_Tita"];
    	var ship_Gold = t.tradeRoutes[count]["ship_Gold"];
    	var citymax_Food = parseInt(Seed.resources[cityID]['rec1'][1] / 3600);
    	var citymax_Wood = parseInt(Seed.resources[cityID]['rec2'][1] / 3600);
    	var citymax_Stone = parseInt(Seed.resources[cityID]['rec3'][1] / 3600);
    	var citymax_Ore = parseInt(Seed.resources[cityID]['rec4'][1] / 3600);
    	var citymax_Graph = parseInt(Seed.resources[cityID]['rec5'][1] / 3600);
    	var citymax_Tita = parseInt(Seed.resources[cityID]['rec6'][1] / 3600);
		var citymax_Gold = parseInt(Seed.citystats[cityID]['gold']);
		var current_Food = parseInt(Seed.resources[cityID]['rec1'][0] / 3600);
    	var current_Wood = parseInt(Seed.resources[cityID]['rec2'][0] / 3600);
    	var current_Stone = parseInt(Seed.resources[cityID]['rec3'][0] / 3600);
    	var current_Ore = parseInt(Seed.resources[cityID]['rec4'][0] / 3600);
    	var current_Graph = parseInt(Seed.resources[cityID]['rec5'][0] / 3600);
    	var current_Tita = parseInt(Seed.resources[cityID]['rec6'][0] / 3600);
		var current_Gold = parseInt(Seed.citystats[cityID]['gold']);
		if (trade_Food > current_Food) trade_Food = current_Food;
		if (trade_Wood > current_Wood) trade_Food = current_Wood;
		if (trade_Stone > current_Stone) trade_Food = current_Stone;
		if (trade_Ore > current_Ore) trade_Ore = current_Ore;
		if (trade_Graph > current_Graph) trade_Graph = current_Food;
		if (trade_Tita > current_Tita) trade_Tita = current_Tita;
		if (trade_Gold > current_Gold) trade_Gold = current_Gold;
    	var carry_Food = (citymax_Food - target_Food);
    	var carry_Wood = (citymax_Wood - target_Wood);
    	var carry_Stone = (citymax_Stone - target_Stone);
    	var carry_Ore = (citymax_Ore - target_Ore);
		var carry_Graph = (citymax_Graph - target_Graph);
		var carry_Tita = (citymax_Tita - target_Tita);
    	var carry_Gold = 0;
    	if (carry_Food < 0 || ship_Food==false) carry_Food = 0;
    	if (carry_Wood < 0 || ship_Wood==false) carry_Wood = 0;
    	if (carry_Stone < 0 || ship_Stone==false) carry_Stone = 0;
    	if (carry_Ore < 0 || ship_Ore==false) carry_Ore = 0;
    	if (carry_Graph < 0 || ship_Graph==false) carry_Graph = 0;
    	if (carry_Tita < 0 || ship_Tita==false) carry_Tita = 0;		
    	if (trade_Food > 0 && (carry_Food > trade_Food)) carry_Food = parseInt(trade_Food);
    	if (trade_Wood > 0 && (carry_Wood > trade_Wood)) carry_Wood = parseInt(trade_Wood);
    	if (trade_Stone > 0 && (carry_Stone > trade_Stone)) carry_Stone = parseInt(trade_Stone);
    	if (trade_Ore > 0 && (carry_Ore > trade_Ore)) carry_Ore = parseInt(trade_Ore);
    	if (trade_Graph > 0 && (carry_Graph > trade_Graph)) carry_Graph = parseInt(trade_Graph);
    	if (trade_Tita > 0 && (carry_Tita > trade_Tita)) carry_Tita = parseInt(trade_Tita);

      if (t.tradeRoutes[count]['TroopType'] == undefined) var wagons = parseInt(Seed.units[cityID]['unt'+ 9]); 
      else var wagons =  parseInt(Seed.units[cityID][t.tradeRoutes[count]['TroopType']]);
      var rallypointlevel = t.getRallypoint(cityID);	
    	if (parseInt(wagons) > parseInt(rallypointlevel*10000)){ wagons = (rallypointlevel*10000); }
    	
      if (t.tradeRoutes[count]['TroopType'] == undefined) var unit = 'unt9';
      else var unit = t.tradeRoutes[count]['TroopType'];
      var Troops = parseInt(Seed.units[cityID][unit]);
	  if(parseInt(Troops)>parseInt(wagons)) Troops = wagons;
      var featherweight = parseInt(Seed.tech.tch10);
    	var Load = parseInt(unsafeWindow.unitstats[unit]['5'])
	  var maxloadperwagon = (featherweight * ((Load/100)*10)) + Load;
		  var maxload = (maxloadperwagon * Troops);
		  if(wagons <= 0) {return; }
	   	for (var t=0; t< Seed.cities.length;t++) {
			   if ( parseInt(Seed.cities[t][0]) == city) var cityname = Seed.cities[t][1];
		  }                     
		
		  var shift_Food = (maxload / 6);
		  var shift_Wood = (maxload / 6);
		  var shift_Stone = (maxload / 6);
		  var shift_Ore = (maxload / 6);
		  var shift_Graph = (maxload / 6);
		  var shift_Tita = (maxload / 6);		  
		  if ((maxload - carry_Food - carry_Wood - carry_Stone - carry_Ore - carry_Graph - carry_Tita) < 0){
			 var shift_num=0;
			 var shift_spare=0;
			
			// Check: See if load/4 is to big for some resources...
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
			if (carry_Graph < shift_Graph) {
				shift_spare += (shift_Graph - carry_Graph);
				shift_Graph = carry_Graph;
			}
			if (carry_Tita < shift_Tita) {
				shift_spare += (shift_Tita - carry_Tita);
				shift_Tita = carry_Tita;
			}
			
		  while (shift_spare >1) {
				 if (carry_Food < (shift_Food + shift_spare)){
				    shift_spare = shift_spare - carry_Food;;
				    shift_Food = carry_Food;
				 }
				 else{
				  shift_Food = (shift_Food + shift_spare);
				  shift_spare = shift_spare- shift_spare;
				}
				 if (carry_Wood < (shift_Wood + shift_spare)){
				    shift_spare = shift_spare - carry_Wood;;
				    shift_Wood = carry_Wood;
				 }
				 else{
				  shift_Wood = shift_Wood + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
        		if (carry_Stone < (shift_Stone + shift_spare)){
				    shift_spare = shift_spare - carry_Stone;
				    shift_Stone = carry_Stone;
				 }
				 else{
				  shift_Stone = shift_Stone + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
				 if (carry_Ore < (shift_Ore + shift_spare)){
				    shift_spare = shift_spare - carry_Ore;
				    shift_Ore = carry_Ore;
				 }
				 else{
				  shift_Ore = shift_Ore + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
				 if (carry_Graph < (shift_Graph + shift_spare)){
				    shift_spare = shift_spare - carry_Graph;
				    shift_Graph = carry_Graph;
				 }
				 else{
				  shift_Graph = shift_Graph + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
				if (carry_Tita < (shift_Tita + shift_spare)){
				    shift_spare = shift_spare - carry_Tita;
				    shift_Tita = carry_Tita;
				 }
				 else{
				  shift_Tita = shift_Tita + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
			}

		carry_Food = shift_Food;
		carry_Wood = shift_Wood;
		carry_Stone = shift_Stone;
		carry_Ore = shift_Ore;
		carry_Graph = shift_Graph;
		carry_Tita = shift_Tita;
		}
		
		if (maxload > (carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Graph + carry_Tita) && ship_Gold==true) {
		    if ((maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Graph + carry_Tita)) > (citymax_Gold - target_Gold)){
		    	  carry_Gold = (citymax_Gold - target_Gold);
		    	  if (carry_Gold < 0 ) carry_Gold = 0;
		   	}
		    else carry_Gold = (maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Graph + carry_Tita));
		    if (trade_Gold > 0 && (carry_Gold > trade_Gold)) carry_Gold = parseInt(trade_Gold);
		}
		
		wagons_needed = ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Graph + carry_Tita + carry_Gold) / maxloadperwagon);
		wagons_needed = wagons_needed.toFixed(0);	
	    if (wagons_needed < ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Graph + carry_Tita + carry_Gold) / maxloadperwagon)) wagons_needed++;	
		if ( wagons_needed < Options.minwagons ) { actionLog('Small transport skipped'); return; }
        var e=unsafeWindow.Object.values(Seed.outgoing_marches["c"+city]).detect(function(a){return a.marchId&&parseInt(a.marchStatus,10)===unsafeWindow.Constant.MarchStatus.INACTIVE})   
		params.cid= city;
		params.mid=e.marchId
		params.type = "1";
		params.kid = "0"
		params.xcoord = xcoord;
		params.ycoord = ycoord;
		params.r1 = carry_Food;
		params.r2 = carry_Wood;
		params.r3 = carry_Stone;
		params.r4 = carry_Ore;
		params.r5 = carry_Graph
		params.r6 = carry_Tita
		params.gold = carry_Gold;

		switch (unit){
      case 'unt1': params.u1 = wagons_needed;break;
      case 'unt4': params.u4 = wagons_needed;break;
      case 'unt5': params.u5 = wagons_needed;break;
      case 'unt6': params.u6 = wagons_needed;break;
      case 'unt7': params.u7 = wagons_needed;break;
      case 'unt8': params.u8 = wagons_needed;break;
      case 'unt9': params.u9 = wagons_needed;break;
      case 'unt10': params.u10 = wagons_needed;break;
      case 'unt11': params.u11 = wagons_needed;break;
      case 'unt12': params.u12 = wagons_needed;break;
      case 'unt13': params.u13 = wagons_needed;break;
      case 'unt15': params.u15 = wagons_needed;break;
      case 'unt16': params.u16 = wagons_needed;break;
	  case 'unt17': params.u17 = wagons_needed;break;
	  case 'unt18': params.u18 = wagons_needed;break;
	  case 'unt19': params.u19 = wagons_needed;break;
	  }

   		if ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Graph + carry_Tita + carry_Gold) > 0) {   
         new AjaxRequest(unsafeWindow.g_ajaxpath + "march.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  loading: true,
                  onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
                  actionLog('Tasinan Malzeme Buradan: ' + cityname + "   Buraya: " + xcoord + ',' + ycoord + "    \'Adetindeki Birimlerle: " + wagons_needed);
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
                  var currentcityid = city;
                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                  unsafeWindow.update_seed(rslt.updateSeed)
                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                  } else {
                 actionLog('Tasimada HATA: ' + cityname + ' -> ' + rslt.msg);
                  }
                  },
                  onFailure: function () { alert('failed')}
          });
        }
	},
	ManualTransport: function(){
    var t = Tabs.transport;
   	if (document.getElementById ('ptcityX').value == "" || document.getElementById ('ptcityY').value == "") return;
    if ( t.TroopsNeeded > t.Troops) return;
    var f=unsafeWindow.Object.values(Seed.outgoing_marches["c"+t.tcp.city.id]).detect(function(a){return a.marchId&&parseInt(a.marchStatus,10)===unsafeWindow.Constant.MarchStatus.INACTIVE})    
   	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    var unitType = document.getElementById('TransportTroop').value;
    var LoadUnit = (parseInt(Seed.tech.tch10) * ((parseInt(unsafeWindow.unitstats[unitType]['5'])/100)*10)) + parseInt(unsafeWindow.unitstats[unitType]['5']);
    var MaxLoad =  parseInt(Seed.units['city' + t.tcp.city.id][unitType]) * LoadUnit;
    document.getElementById ('errorSpace').innerHTML = '';
    params.cid=t.tcp.city.id;
	params.mid=f.marchId;
	params.kid = "0";
	params.type = "1";
	params.xcoord = parseInt(document.getElementById ('ptcityX').value);
	params.ycoord = parseInt(document.getElementById ('ptcityY').value);
	params.r1 = parseInt(document.getElementById ('pbtradeamountFood').value);
	params.r2 = parseInt(document.getElementById ('pbtradeamountWood').value);
	params.r3 = parseInt(document.getElementById ('pbtradeamountStone').value);
	params.r4 = parseInt(document.getElementById ('pbtradeamountOre').value);
	params.r5 = parseInt(document.getElementById ('pbtradeamountGraph').value);
	params.r6 = parseInt(document.getElementById ('pbtradeamountTita').value);
	params.gold = parseInt(document.getElementById ('pbtradeamountGold').value);
		
    switch (unitType){
      case 'unt1': params.u1 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt4': params.u4 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt5': params.u5 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt6': params.u6 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt7': params.u7 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt8': params.u8 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt9': params.u9 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt10': params.u10 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt11': params.u11 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt12': params.u12 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt13': params.u13 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt15': params.u15 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt16': params.u16 = parseInt(document.getElementById ('TroopsToSend').value);break;
	  case 'unt17': params.u17 = parseInt(document.getElementById ('TroopsToSend').value);break;
      case 'unt18': params.u18 = parseInt(document.getElementById ('TroopsToSend').value);break;
	  case 'unt19': params.u19 = parseInt(document.getElementById ('TroopsToSend').value);break;
	  }

    if ((params.r1 + params.r2 + params.r3 + params.r4 + params.r5 + params.r6 + params.gold) > 0) {
                 
         new AjaxRequest(unsafeWindow.g_ajaxpath + "march.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  loading: true,
                  onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {                  
		                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
		                  var ut = unixTime();
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
		                  var currentcityid = t.tcp.city.id;
                 unsafeWindow.updateOutgoingMarches(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
		                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
		                  document.getElementById ('errorSpace').innerHTML = 'Gönderilen: ' + addCommas(params.r1+params.r2+params.r3+params.r4+params.gold) + ' Malzeme ' + addCommas(parseInt(document.getElementById ('TroopsToSend').value)) + ' ' + unsafeWindow.unitcost[unitType][0];
		                  document.getElementById ('pbtradeamountFood').value = 0;
		                  document.getElementById ('pbtradeamountWood').value = 0;
		                  document.getElementById ('pbtradeamountStone').value = 0;
		                  document.getElementById ('pbtradeamountOre').value = 0;
		                  document.getElementById ('pbtradeamountGold').value = 0;
		                  document.getElementById ('pbtradeamountGraph').value = 0;
		                  document.getElementById ('pbtradeamountTita').value = 0;
		                  document.getElementById ('TroopsToSend').value = 0;
                  } else {
                  actionLog('MANUAL TRANSPORT FAIL:  -> ' + rslt.msg);
                  }
                  },
                  onFailure: function () {}
          });
        }
	},
	
	show: function(){
		var t = Tabs.transport;
		clearTimeout (t.timer);
		t.updateTroops();
		t.updateResources();  
		t.timer = setTimeout (t.show, 1000); 
    },
	hide: function(){
        var t = Tabs.transport;
        clearTimeout (t.timer);
    },
    onUnload: function(){
        var t = Tabs.transport;
        t.saveTradeRoutes();
		t.saveTraderState();
        
    },
}
/****************************  Alarm Sekmesi Fonksiyonu  ******************************/
	var uu1 = 'Ikmal Kamyonu';
	var uu4 = 'Orbital Iyon Topu';
	var uu5 = 'Piyade';
	var uu6 = 'Keskin Nisanci';
	var uu7 = 'Mobil SAM';
	var uu8 = 'Tank';
	var uu9 = 'Ikmal Helikopteri';
	var uu10 = 'Avci Uçagi';
	var uu11 = 'Savas Helikopteri';
	var uu12 = 'Bombardiman Uçagi';
	var uu13 = 'Görünemez Bombardiman Uçagi';
	var uu15 = 'Taktikal Nuke';
	var uu16 = 'Cehennem Atesi Tanki';
	var uu17 = 'Tanksavar Piyade';
	var uu18 = 'Özel Kuvvetler';
	var uu19 = 'Kargo Nakliyesi';
        var uu20 = 'Insansiz Uçak';
Tabs.tower = {
  tabOrder: 22,
  tabLabel: 'ALARM',
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
		0: { 'country': "--Ülke--", 'provider': "--Operatör--" },
        1: { 'country': "TÜRKIYE", 'provider': "Vodafone" },
		2: { 'country': "TÜRKIYE", 'provider': "Türkcell" },
        
    },

  init: function(div){
	var t = Tabs.tower;
    t.myDiv = div;
    
    if (GM_getValue ('towerMarches_'+getServerId()) != null)
      GM_deleteValue ('towerMarches_'+getServerId());   // remove deprecated data if it exists
    // t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
    // unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;
 
    var m = '<DIV class=pbStat>ALARM SEÇENEKLERI MENÜSÜ</div><TABLE class=pbTab><TR align=center>';

	  for (var i=0; i<Cities.cities.length; i++)
      m += '<TD width=95><SPAN id=pbtacity_'+ i +'>' + Cities.cities[i].name + '</span></td>';
    m += '</tr><TR align=center>';
	  for (var cityId in Cities.byID)
		m += '<TD><INPUT type=submit id=pbtabut_'+ cityId +' value=""></td>';
	m += '</tr><TR align=center>';
	  for (var cityId in Cities.byID)
	   m += '<TD><CENTER><INPUT id=pbattackqueue_' + cityId + ' type=submit value="DETAYLAR"></center></td>';
    m += '</tr></table><BR><DIV><CENTER><INPUT id=pbSoundStop type=submit value="ALARMI SUSTUR"></center></div><DIV id=pbSwfPlayer></div>';
    m += '<BR><DIV class=pbStat>AYARLAR</div><TABLE class=pbTab>\
    <tr><td align=left><INPUT id=pbcellenable type=checkbox '+ (Options.celltext.atext?'CHECKED ':'') +'/></td>\
    <td align=left>SMS\'in Atilacagi Numara: <INPUT id=pbnum1 type=text size=4 maxlength=4 value="'+ Options.celltext.num1 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum2 type=text size=3 maxlength=3 value="'+ Options.celltext.num2 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum3 type=text size=4 maxlength=4 value="'+ Options.celltext.num3 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\> <span style="color:#800; font-weight:bold">(Standard SMS fiyati ile Ücretlendirilir)</span></td></tr><tr><td></td>\
    <TD align=left>Ülke: <select id="pbfrmcountry">';
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
    <select id="pbfrmprovider" '+(Options.celltext.provider==0?'DISABLED':'')+'><option value=0 >--Operatör--</option>';
    for (var i in t.Providers) {
 if(t.Providers[i].country == t.Providers[Options.celltext.provider].country)
		if(Options.celltext.provider == i)
			m += '<option value="'+i+'" selected="selected">'+t.Providers[i].provider+'</option>'; // Load Previous Provider Selection
		else
           m += '<option value="'+i+'">'+t.Providers[i].provider+'</option>';
    }
    m += '</select></td></tr>\
        <TR><TD><INPUT id=pbalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Otomatik Olarak Saldiri Raporunu Ittifak Sohbetine Gönderir..!</td></tr>\
        <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>Mesaj Içerigi: &nbsp; </td><TD><INPUT id=pbalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
            <TR><TD align=right>Haberci Alarmi: &nbsp; </td><TD><INPUT id=pbalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Bozkir Saldirisi Alarmi: &nbsp; </td><TD><INPUT id=pbalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Savunma Durumum: &nbsp; </td><TD><INPUT id=pbalertDefend type=checkbox '+ (Options.alertConfig.defend?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Minimum Asker Adeti: &nbsp; </td><TD><INPUT id=pbalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> &nbsp; &nbsp; <span id=pbalerterr></span></td></tr>\
            </table></td></tr>\
        <TR><TD><BR></td></tr>\
        <TR><TD><INPUT id=pbSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD>Asagiya Girilen Linkdeki Melodi ALARM Sesi Olarak Ayarlanir.!!</td></tr>\
        <TR><TD></td><TD><DIV id=pbLoadingSwf>Lütfen FlashPlayer yada SWF Player Yükleyiniz ..</div><DIV style="display:none" id=pbSoundOpts><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>Ses Dosyasi: &nbsp; </td><TD><INPUT id=pbsoundFile type=text size=55 maxlength=160 value="'+ Options.alertSound.soundUrl +'" \>\
             &nbsp; </td><TD><INPUT id=pbSoundLoad type=submit value=YÜKLE><INPUT id=pbSoundDefault type=submit value=Varsayilan></td></tr>\
            <TR><TD align=right>Ses Ayari: &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pbTab><TR valign=middle><TD><SPAN id=pbVolSlider></span></td><TD width=15></td><TD align=right id=pbVolOut>0</td></td></table></td><TD align=center><SPAN id=pbLoadStat>xx</span></td></tr>\
            <TR><TD align=right><INPUT id=pbSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD> Tekrar zamani: <INPUT id=pbSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> Dakika</td></tr>\
            <TR><TD></td><TD>Süresince:<INPUT id=pbSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> Saniye</td></tr>\
            <TR><TD></td><TD><INPUT type=submit value="DINLE" id=pbPlayNow></td></tr></table></div></td></tr>\
        </table><BR>';
  	t.myDiv.innerHTML = m;

//    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:36, width:340}, t.e_swfLoaded, 'debug=y');
    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:0, width:0}, t.e_swfLoaded, 'debug=n');
    t.mss.swfDebug = function (m){ actionLog ('SWF: '+ m)};
    t.mss.swfPlayComplete = t.e_soundFinished;
    t.mss.swfLoadComplete = t.e_soundFileLoaded;
    unsafeWindow.matSimpleSound01 = t.mss;   // let swf find it

    t.volSlider = new SliderBar (document.getElementById('pbVolSlider'), 200, 21, 0);
    t.volSlider.setChangeListener(t.e_volChanged);
    document.getElementById('pbPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
    document.getElementById('pbSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
    document.getElementById('pbSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked}, false);
    document.getElementById('pbSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value}, false);
    document.getElementById('pbSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value}, false);
    document.getElementById('pbSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked}, false);
    document.getElementById('pbcellenable').addEventListener ('change', function (e){Options.celltext.atext = e.target.checked;}, false);
    document.getElementById('pbSoundStop').disabled = true;
    document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertScout').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertDefend').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbfrmcountry').addEventListener ('change', t.setCountry, false);
    document.getElementById('pbfrmprovider').addEventListener ('change', t.setProvider, false);
    document.getElementById('pbnum1').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbnum2').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbnum3').addEventListener ('change', t.phonenum, false);
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
  	  var but = document.getElementById ('pbtabut_'+ cityId);
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
  },
  
  hide : function (){
  },
 
  loadUrl : function (url){
    var t = Tabs.tower;
    t.mss.load (1, url, true);
    document.getElementById('pbLoadStat').innerHTML = 'Yükleniyor ..';
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
	myselect.innerHTML = '<option value=0 >--Operatör--</option>';
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
    Options.alertConfig.scouting=document.getElementById('pbalertScout').checked;      
    Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
    Options.alertConfig.defend=document.getElementById('pbalertDefend').checked;
    var mt = parseInt(document.getElementById('pbalertTroops').value);
    if (mt<1 || mt>120000){
      document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;
      document.getElementById('pbalerterr').innerHTML = '<font color=#600000><B>HATA</b></font>';
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
    var but = document.getElementById('pbtabut_'+ cityId);
    if (t.defMode[cityId]){
      but.className = 'pbDefButOn';
      but.value = 'Savunma=AÇIK';  
    } else {
      but.className = 'pbDefButOff';
      but.value = 'Savunma=KAPALI';  
    }  
  },
    
  eachSecond : function (){
    var t = Tabs.tower;
	for (var cityId in Cities.byID){
      if (Seed.citystats["city" + cityId].gate != t.defMode[cityId]){     // user changed def mode
        t.defMode[cityId] = Seed.citystats["city"+ cityId].gate;
        t.displayDefMode (cityId);
      }
    }
  	var now = unixTime();
	var incomming = false;
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (var k in Seed.queue_atkinc){   // check each incoming march
        var m = Seed.queue_atkinc[k];
        if (parseIntNan(m.arrivalTime)>now){
          if (m.departureTime > Options.alertConfig.lastAttack){
            Options.alertConfig.lastAttack = m.departureTime;  
            t.newIncoming (m);
   
   }
		  incomming = true;
		  
        }
      }
    }
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
                if (parseIntNan(m.arrivalTime) > now) {
                    t.handleTowerData(m);
               }
            }
        }
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            document.getElementById('pbattackqueue_' + cId).value = 'D E T A Y' + t['attackCount_' + cId] + '' + t['scoutCount_' + cId];
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
      document.getElementById('pbLoadStat').innerHTML = 'HATA.!';
    else
      document.getElementById('pbLoadStat').innerHTML = 'Yüklendi.!';
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
  },

  ajaxSetDefMode : function (cityId, state, notify){
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cityId;
		params.state = state;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "gate.php" + unsafeWindow.g_ajaxsuffix, {
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


    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (m.marchType == 3){
      if (!Options.alertConfig.scouting)
        return;
      data.atkType = 'scout';
    } else if (m.marchType == 4){
      data.atkType = 'atk';
    } else {
      return;
    }
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      data.target = 'city ('+ city.x +','+ city.y+')';
    else {
      if (!Options.alertConfig.wilds)
        return;
      data.target = 'wild';
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
      data.who = 'Unknown';
  
    if (m.fromXCoord)
      data.who += m.fromXCoord +','+ m.fromYCoord;
     data.arrival = unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime()));
    var totTroops = 0;
    data.totTroops = ' '
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
	  if(k == 'u1') {
	  msg += m.unts[k] + uu1 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u4') {
	  msg += m.unts[k] + uu4 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u5') {
	  msg += m.unts[k] + uu5 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u6') {
	  msg += m.unts[k] + uu6 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u7') {
	  msg += m.unts[k] + uu7 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u8') {
	  msg += m.unts[k] + uu8 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u9') {
	  msg += m.unts[k] + uu9 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u10') {
	  msg += m.unts[k] + uu10 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u11') {
	  msg += m.unts[k] + uu11 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u12') {
	  msg += m.unts[k] + uu12 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u13') {
	  msg += m.unts[k] + uu13 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u15') {
	  msg += m.unts[k] + uu15 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u16') {
	  msg += m.unts[k] + uu16 + ' '
      totTroops += m.unts[k];
	  }
	  	  if(k == 'u17') {
	  msg += m.unts[k] + uu17 + ' '
      totTroops += m.unts[k];
	  }
  	  if(k == 'u18') {
	  msg += m.unts[k] + uu18 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u19') {
	  msg += m.unts[k] + uu19 + ' '
      totTroops += m.unts[k];
	  }          
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
        data.embassy = 'Benim Elçiligimde Su Anda: '+ availSlots +'of'+ emb.maxLevel;
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            data.stat = 'Askerlerim Siginaktadir ..';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            data.stat = 'Askerlerim Sehrimi SAVUNUYOR.!!';
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
    if (m.marchType == 4){
      atkType = 'SALDIRI';
    } else {
      return;
    }
    var target, atkType, who;
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId ) {
      target = 'Saldiri Alan Sehrimin Koordinati: ('+ city.x +','+ city.y + ')';
	  }
    else {
      if (!Options.alertConfig.wilds)
        return;
      target = 'Benim Bozkir\'ima';
	  alert('wild')
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' at ('+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord + ')';
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
  
    if (m.fromXCoord)
      who += ' at ('+ m.fromXCoord +','+ m.fromYCoord + ')';
	who += ' ('+getDiplomacy(m.aid)+')';
	
    var msg = Options.alertConfig.aPrefix +' ';
		msg += 'Benim '+ target +' Bana '+ atkType  +' Saldiri Yapan Kisi: '+ who +' Askerlerinin Sehrime Ulasmasina: '+ unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +'\'var.Asker Türü ve Adeti Ise: ';
    var totTroops = 0;
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
	  if(k == 'u1') {
	  msg += m.unts[k] + uu1 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u4') {
	  msg += m.unts[k] + uu4 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u5') {
	  msg += m.unts[k] + uu5 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u6') {
	  msg += m.unts[k] + uu6 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u7') {
	  msg += m.unts[k] + uu7 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u8') {
	  msg += m.unts[k] + uu8 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u9') {
	  msg += m.unts[k] + uu9 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u10') {
	  msg += m.unts[k] + uu10 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u11') {
	  msg += m.unts[k] + uu11 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u12') {
	  msg += m.unts[k] + uu12 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u13') {
	  msg += m.unts[k] + uu13 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u15') {
	  msg += m.unts[k] + uu15 + ' '
      totTroops += m.unts[k];
	  }
	  if(k == 'u16') {
	  msg += m.unts[k] + uu16 + ' '
      totTroops += m.unts[k];
	  }
	  	  if(k == 'u17') {
	  msg += m.unts[k] + uu17 + ' '
      totTroops += m.unts[k];
	  }
  	  if(k == 'u18') {
	  msg += m.unts[k] + uu18 + ' '
      totTroops += m.unts[k];
	  }
	  	  if(k == 'u19') {
	  msg += m.unts[k] + uu19 + ' '
      totTroops += m.unts[k];
	  }
	  }
    if (totTroops < Options.alertConfig.minTroops)
      return;
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 17);
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
        msg += ' Benim Elçiligimde Su Anda: '+ availSlots +' Bosluk var.ve Elçiligim Seviyesi: '+ emb.maxLevel +' \'dur..';
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            msg+= ' Benim Askerlerim Siginaktadir.!!';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            msg+= ' Benim Askerlerim Savunmadadir.!!';
        }
      }
    }
	t.sendalert(m);
    if (!Options.alertConfig.aChat) return;
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
            actionLog("checkTower(): INCOMING at " + unixTime() + ": \n" + inspect(m, 8, 1));
        
        //ATKTYPE

            if (m.marchType == 4) {
                atkType = 'attacked';
                t['attackCount_' + m.toCityId]++;
            }
            else {
                return;
            }
        //TARGET
        if (city.tileId == m.toTileId)
            target = 'City at ' + city.x + ',' + city.y;
        else {
            target = 'Wilderness';
            for (k in Seed.wilderness['city' + m.toCityId]) {
                if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
                    target += ' at ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord;
                    break;
                }
            }
        }
        //CITYNAME
        var cityName = Cities.byID[m.toCityId].name;
        
        //TROOPS
        var units = [];
        for (i = 0; i < 20; i++)
            units[i] = 0;
        for (k in m.unts) {
            var uid = parseInt(k.substr(1));
            if(k == 'u1')
      			units[1] = m.unts[k];
            if(k == 'u4')
                units[2] = m.unts[k];
            if(k == 'u5')
                units[3] = m.unts[k];
            if(k == 'u6')
                units[4] = m.unts[k];
            if(k == 'u7')
                units[5] = m.unts[k];
            if(k == 'u8')
                units[6] = m.unts[k];
            if(k == 'u9')
                units[7] = m.unts[k];
            if(k == 'u10')
                units[8] = m.unts[k];
            if(k == 'u11')
                units[9] = m.unts[k];
            if(k == 'u12')
                units[10] = m.unts[k];
            if(k == 'u13')
                units[11] = m.unts[k];
            if(k == 'u15')
                units[12] = m.unts[k];
            if(k == 'u16')
                units[13] = m.unts[k];
            if(k == 'u17')
                units[14] = m.unts[k];
            if(k == 'u18')
                units[15] = m.unts[k];
            if(k == 'u19')
                units[16] = m.unts[k];
				}
        //ATTACKERS INFORMATION
        if (Seed.players['u' + m.pid]) {
            who = Seed.players['u' + m.pid].n;
            attackermight = Seed.players['u' + m.pid].m;
            allianceId = ['a' + Seed.players['u' + m.pid].a ];
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
            t.popTowerIncoming = new CPopup('pbtower_' + cityId, 0, 0, 1200, 500, true, function() {clearTimeout (t.timer);});
        }
        t.popTowerIncoming.show(false);
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityTowerContent">';
        t.popTowerIncoming.getMainDiv().innerHTML = '</table></div>' + m;
        t.popTowerIncoming.getTopDiv().innerHTML = '<TD width="300px"><B>Saldiri Detayi Gösterilen Sehriniz: ' + cityName + '</b></td></td>';
        t.addCityData2Pop(cityId);
        t.popTowerIncoming.show(true);
		clearTimeout (t.timer);
		t.timer = setTimeout (function() {t.showTowerIncoming(cityId)}, 5000);        
    },
    addCityData2Pop: function(cityId){
        var t = Tabs.tower;
        var rownum = 0;
        var names = ['Ikml K.', 'Orb.I.Tp.', 'Pyd.', 'Nsnc', 'Mbl SAM', 'Tank', 'I.Hlkptr', 'Avc Uçg', 'S.Hlkptr', 'Bmb.Uçg', 'Grn.Bm.Uçg', 'Tak.Nuke', 'Ch.Ats Tnk', 'Tnk.Pyd.', 'Özl Kvv.', 'Krg Nkly.',];
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
                    for (i = 1; i < 20; i++) {
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
        for (i = 0; i < 16; i++) {
            tot[i] = 0;
            atk[i] = 0;
        }

            s1 += '<STYLE> .tot{background:#f0e0f8; font-size:10px} .city{background:#ffffaa; font-size:10px} .attack{background:#FF9999;} .own{background:#66FF66;font-size:10px}</style>';
            s1 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=center width=7%></td>';
            
            for (k = 0; k < names.length; k++)
                s1 += '<TD width=5%><B>' + names[k] + '</b></td>';
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
                        for (i = 1; i < 17; i++) {
                            num = enc[dest][p][m][i];
                            s1 += '<TD class="city">' + num + '</td>';
                            tot[i] += num;
                        }
                        //s1 += '<TD><INPUT id=sendhome_' + numSlots + ' type=submit value="Home" style="border:1px solid black; background-color:red;"></td></tr>';
                    }
                }
            } else {
                s1 += '<TR align=right><TD align=left class="city"><B>Takviye:</b></td>'
                for (i = 1; i < 17; i++) {
                    s1 += '<TD class="city">0</td>';
                }
                
            }
			s1 += '<TR align=right><TD colspan=17><BR></tr>';
            s1 += '<TR align=right><TD class="own" align=left><B>Kendi Birimleriniz:</b></td>';
            //OWNTROOPS
            var ownTroops = "";
            for (r = 1; r < 20; r++) {
			if( r == 2 ) { continue }
			if( r == 3 ) { continue }
			if( r == 14 ) { continue }
			if( r == 20 ) { continue }
			else {
			cityString = 'city' + cityId;
                num = parseInt(Seed.units[cityString]['unt' + r]);
                s1 += '<TD class="own">' + num + '</td>';
                tot[r] += num;
            }
			}
        
        s3 += '<TD class="city"></td><TR><TD colspan=17><BR></td></tr><TR align=right><TD class="tot" align=left><B>Incoming Attacks:</b></td>';
    
        var names = ['Ikml K.', 'Orb.I.Tp.', 'Pyd.', 'Nsnc', 'Mbl SAM', 'Tank', 'I.Hlkptr', 'Avc Uçg', 'S.Hlkptr', 'Bmb.Uçg', 'Grn.Bm.Uçg', 'Tak.Nuke', 'Ch.Ats Tnk', 'Tnk.Pyd.', 'Özl Kvv.', 'Krg Nkly.',];
        if (t.towerMarches.length > 0) {
            for (k in t.towerMarches) {
                if (typeof t.towerMarches[k].atkType != 'undefined') {
                    if (t.towerMarches[k].cityId == cityId) {
                        s3 += '<TABLE cellspacing=0 width=100%><TR>';
                        s3 += '<TD width=5%  ><B>Lokasyon</b></td>';
                        s3 += '<TD width=5%  ><B>Isim</b></td>';
						s3 += '<TD width=5%><B>Kaynak: </b></td>'
                        s3 += '<TD width=5%><B>Güç: </b></td>'
                        s3 += '<TD width=5% colspan=2><B>Ittifak: </b></td>'
                        s3 += '<TD width=5%><B>Vilayet: </b></td>'
                        s3 += '<TR><TD width=5%  >' + t.towerMarches[k].target + '</td>';
                        s3 += '<TD  >' + t.towerMarches[k].who + '</td>';
						s3 += '<TD width=5%>' + t.towerMarches[k].source + '</td>'; 
						s3 += '<TD width=5%>' + t.towerMarches[k].attackermight + '</td>';
						s3 += '<TD width=5% colspan=2>' + t.towerMarches[k].allianceName + '</td>';
						s3 += '<TD width=5%>' + t.towerMarches[k].diplomacy + '</td></tr>';
						s3 += '<TD width=5%></td>'
                        s3 += '<TD><B>Hatirlatma: </b></td>'
                        s3 += '<TD><B>Ulasmasina: </b></td></tr>';
					    s3 += '<TD width=5%></td>'
                        s3 += '<TD width=10%>' + t.towerMarches[k].rtime + '</td>';
						s3 += '<TD  colspan=7 width=10%>' + t.towerMarches[k].arrivingDatetime + '</td></tr>';
						s3 += '</tr></table>';
                        s3 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%></td>';
                        for (n = 0; n < names.length; n++)
                            s3 += '<TD width=5%><B>' + names[n] + '</b></td>';
                        s3 += '</tr><TR align=right><TD class="attack" align=left><B>Units:</td>';
						var m = Seed.queue_atkinc;
                        for (u = 1; u < 17; u++) {
                            num = t.towerMarches[k].units[u];
                            s3 += '<TD class="attack">' + num + '</td>';
                            atk[u] += parseInt(num);
                        }
					    s3 += '</tr></table>'; 
						}

 }
                
            }
        }
		s2 += '<TR><TD colspan=16><BR></td></tr><TR align=right><TD class="attack" align=left><B>Saldiran:</b></td>';
        for (a = 1; a < 17; a++)
            s2 += '<TD class="attack" width=5%>' + atk[a] + '</td>';
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
/****************************  Genel Sekmesi Fonksiyonu ******************************/
function getResourceProduction (cityId){
  var ret = [0,0,0,0,0,0,0,0,0];
  var now = unixTime ();
  
  var wilds = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var w = Seed.wilderness["city" + cityId];
  for (var k in w){
    var type = parseInt(w[k].tileType);
    if (type==10 || type==11 || type==12)
      wilds[1] += parseInt(w[k].tileLevel);
    else 
      wilds[type/10] += parseInt(w[k].tileLevel);
  }  
  
  knight = 0;       
  var s = Seed.knights["city" + cityId];
  if (s) {
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];
    if (s){
      var knight = parseInt(s.knightLevel);
      // if (s.resourcefulnessBoostExpireUnixtime > now)
        // knight *= 1.25;
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
    if (parseInt(Seed.bonus["bC1" + i + "00"]["bT1" + i + "01"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
    ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + wilds[i]/20) * workerFactor + 100));
  }
  return ret;  
}

Tabs2.Overview = {
  tabOrder : 11,
  tabLabel : 'GENEL',
  cont : null,
  displayTimer : null,

  Overview : function (){
  },

  init : function (div){
  var t= Tabs2.Overview;
    t.cont = div;
    if (Options.overviewAllowOverflow)
      t.cont.style.overflowX = 'visible';
  },

  hide : function (){
    clearTimeout (Tabs2.Overview.displayTimer);
  },
  
  show : function (){
    var rownum = 0;
    var t = Tabs2.Overview;
    var linestyle ="";
    var disposable=[0,400,800,2000,3000,6000,12500,25000,50000,105000,210000,420000];
    var stable    =[0,500,1000,2000,4000,8000,16000,32000,64000,140000,280000,560000];
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
          tot += row[i];
        m.push ('<TD style="background: #ffc">');      
        m.push (addCommas(tot));
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<TD');
        m.push (style);
        m.push ('>');     
        m.push (addCommas(row[i]));
        m.push ('</td>');
      }
      m.push ('</tr>');
      return m.join('');
    }
    
//DebugTimer.start(); 
    try {
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
     // <TR align=left><TD><SPAN class=ptStatLight>Joined on:</span> '+ dt.toLocaleDateString() +'</td>
      str = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;"><TABLE cellspacing=0 cellpadding=0 class="ptTab ptStat" width=97% align=center>\
        <TD><SPAN class=ptStatLight>Güç:</span> ' + addCommas(Seed.player.might) +'</td>\
        <TD><SPAN class=ptStatLight>Ittifak:</span> ' + getMyAlliance()[1] +'</td>\
        <TD align=right><SPAN class=ptStatLight>Alan:</span> ' + unsafeWindow.domainName +'</td></tr></table></div>';

              
      str += "<DIV id=overMainDiv style='font-size:"+ Options.overviewFontSize +"px'><TABLE class=ptTabOverview cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOPLAM</b></td>";
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>'+ Cities.cities[i].x +','+ Cities.cities[i].y +"<BR>"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"</td>";
      }
      str += "</tr>";
	  
	  str += '<TR valign=top align=right><TD></td><TD style=\'background: #ffc\'></td>';
		for(i=0; i<Cities.numCities; i++){
		  cityID = 'city'+Cities.cities[i].id;
		  Gate = parseInt(Seed.citystats[cityID].gate);
		if(Gate == 0)
		  str += '<TD>Siginakda</td>';
		else
		  str += '<TD><SPAN class=boldRed><blink>Savunmada</b></blink></span></td>';
		}
  
      rows = [];
      rows[0] = [];
      for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        rows[0][i] = parseInt(Seed.citystats[cityID].gold[0]);
      }
      for (r=1; r<9; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0] / 3600);
        }
      }

      str += _row ('Altin', rows[0]);
      str += _row ('Gida', rows[1]);
      str += _row ('Petrol', rows[2]);
      str += _row ('Tas', rows[3]);
      str += _row ('Çelik', rows[4]);
      str += _row ('Titanyum', rows[5]);
      str += _row ('Grafen', rows[6]);
      str += _row ('Uranyum', rows[7]);
      str += _row ('Elmas', rows[8]);
      str += '<TR><TD colspan=12><BR></td></tr>';
	  for (r=1; r<21; r++){
        rows[r] = [];
		for(i=0; i<Cities.numCities; i++) {
            rows[r][i] = 0;
        }
	  }
	  if (Options.includeCity){
        for (r=1; r<21; r++){
          for(i=0; i<Cities.numCities; i++) {
            cityID = 'city'+ Cities.cities[i].id;
            rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
          }
        }
	  }
      if (Options.includeMarching){
        for (var i=0; i<20; i++)
          rows[i][Cities.numCities] = march.marchUnits[i];
      }
	  if (Options.includeTrainingTotal){
		for (var i=0; i<21; i++)
          rows[i][Cities.numCities+1] = 0;
	  }
      if (Options.includeTraining){
        var q = Seed.training_queue;
        for(i=0; i<Cities.numCities; i++) {
          q = Seed.training_queue['c'+ Cities.cities[i].id];
          if (q && q.length>0){
            for (qi=0; qi<q.length; qi++)
              rows[q[qi][0]][i] += parseInt(q[qi][1]);
          }    
        }
      }
      rownum = 0;
	  //for(i=0; i<21; i++)
	  str += _row (unsafeWindow.arStrings.unitName['u'+i], rows[i]);
	  str += _row ('Ikmal Kmyn.', rows[1]);
      str += _row ('Piyade', rows[5]);
      str += _row ('K.Nisanci', rows[6]);
      str += _row ('TankSavar P.', rows[4]);
      str += _row ('Özel Kuv.', rows[18]);
      str += _row ('Mobil SAM', rows[7]);
      str += _row ('Tank', rows[8]);
      str += _row ('Insansiz Uçak', rows[17]);
      str += _row ('Ikmal Helkpt.', rows[9]);
      str += _row ('Savas Helkpt.', rows[11]);
      str += _row ('Avci Uçagi', rows[10]);
      str += _row ('Bombardiman Uçk.', rows[12]);
      str += _row ('Kargo Uçk.', rows[19]);
      str += _row ('Cehennem Tanki', rows[16]);
      str += _row ('Görünmez Bombardiman Uç.', rows[13]);
      str += _row ('Nükleer Füze', rows[15]);
	  str += _row ('Iyon Topu', rows[20]);
      str += '<TR><TD colspan=12><BR></td></tr>';
      

	  //    Fortification
	  if (Options.includeCity){
      for (r=1; r<5; r++){
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          x=r+51
          rows[r][i] = parseInt(Seed.fortifications[cityID]['fort'+x]);
          var perimeter = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos1[1]);
          if (r==2) {
            var temp=parseInt(Seed.fortifications[cityID]['fort'+x]) + rows[1][i];
            if (Options.showSpace){
              rows[5][i] = disposable[perimeter] - temp;                
            }
            else {
              if (temp < disposable[perimeter])
                rows[5][i] = temp+'('+ perimeter +')';
              else
                rows[5][i] = '<SPAN class=boldWhite><B>'+ temp +'('+ perimeter +')' +'</b></span>';
            }
          }
          if (r==4) {
          var temp=parseInt(Seed.fortifications[cityID]['fort'+x]) + rows[3][i];
          if (Options.showSpace){
            rows[6][i] = stable[perimeter] - temp;                
          }
          else {
            if (temp < stable[perimeter])
              rows[6][i] = temp+'('+ perimeter +')';
            else
              rows[6][i] = '<SPAN class=boldWhite><B>'+ temp + '('+ perimeter +')' + '</b></span>';
            }
          }
        }
      } 
	    str += _row ('Mayin:', rows[2],true);
        str += _row ('StingerFüze:', rows[1],true);
	    str += _row ('Bosluk Var:', rows[8],true,true);
        str += _row ('TOP:', rows[3],true);
        str += _row ('Uçak Savar:', rows[4],true);
        str += _row ('Rayli TOP:', rows[5],true);
        str += _row ('Rayli LazerTOP:', rows[6],true);
        str += _row ('Yapilabilinir:', rows[9],true,true);
        str += '<TR><TD colspan=12><BR></td></tr>';
    }
           row = [];
      row2 = [];
      row3 = [];
      for(i=0; i<Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row3[i] = usage;
        row2[i] = rp[1];
				row[i] = rp[1] - usage;
      }
			str += _row ('Bakim:', row3, true);
      str += _row ('Üretim:', row2, true);      
      str += _row ('Gida Gideri:', row, true);
      
      for(i=0; i<Cities.numCities; i++) {
        if (row[i] >= 0)
          row[i] = '----';
        else {
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-row[i]) * 3600;
          if (timeLeft > 86313600)
            row[i] = '----';
          else {
            if (Options.pbFoodAlert && timeLeft<(6*3600))
              row[i] = '<SPAN class=whiteOnRed>'+ timestrShort(timeLeft) +'</span>';
            else
              row[i] = timestrShort(timeLeft);
          }
        }
      }    
      str += _row ('Gida Zamani:', row, true);
      str += '<TR><TD><BR></td></tr>';
      
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totWilds = 0;
        dat = Seed.wilderness['city'+ Cities.cities[i].id];
        if (dat!=null && matTypeof(dat)=='object')
          for (k in dat)
            ++totWilds;
        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
		if(castle == 10) castle = 11;
        if (totWilds < castle)
          row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';
        else
          row[i] = totWilds +'/'+ castle;
      }
      str += _row ('Bozkirlar', row, true);
  
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
        for (k in dat)
          ++totKnights;
        row[i] = totKnights;
      }
      str += _row ('Generaller', row, true);
      var now = unixTime();
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
      var totTime = 0;
	  var length = 0,key;
	  var finTime = 0,key;
	  for( key in Seed.training_queue['c'+ Cities.cities[i].id]) {
        var ttime = parseInt(Seed.training_queue['c'+ Cities.cities[i].id][key].eta)
		var ttime2 = ttime - now
		if(parseInt(finTime) >0) {
		var ttime2 = parseInt(ttime2) - parseInt(finTime)
        }
		if(parseInt(ttime2)<0) { finTime = parseInt(finTime) +0 } else { finTime=parseInt(finTime + Math.abs(ttime2)) }
		//alert( timestr(finTime))
}
        row[i] = timestr(finTime) +'</b></span>';
      }
      str += _row ('Asker Egt.:', row, true);
      
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var wall = {};
        getWallInfo (Cities.cities[i].id, wall);
      var totTime = 0;
	  var length = 0,key;
	  var finTime = 0,key;
	  for( key in Seed.fortify_queue['c'+ Cities.cities[i].id]) {
        var ttime = parseInt(Seed.fortify_queue['c'+ Cities.cities[i].id][key].eta)
		var ttime2 = ttime - now
		if(parseInt(finTime) >0) {
		var ttime2 = parseInt(ttime2) - parseInt(finTime)
        }
		if(parseInt(ttime2)<0) { finTime = parseInt(finTime) +0 } else { finTime=parseInt(finTime + Math.abs(ttime2)) }
		//alert( timestr(finTime))
}
          row[i] = timestr(finTime);
      }    
      str += _row ('Savunma Egt.:', row, true);
      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><BR><INPUT type=CHECKBOX id=ptoverOriginal'+ (Options.includeCity?' CHECKED':'') +'>Sehirdeki Askerleri Gösterir!!</td></tr>';
    //  str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +' DISABLED>Show Marching Troops/Resources</td></tr>';
    //  str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptoverIncTraining'+ (Options.includeTraining?' CHECKED':'') +' DISABLED>Show troops training in city</td></tr>';
    //  str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptoverIncTrainingTotal'+ (Options.includeTrainingTotal?' CHECKED':'') +' DISABLED>Show troops training totals</td></tr>';
     str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptOverOver'+ (Options.overviewAllowOverflow?' CHECKED':'') +'>Belirlenen Boyuta Ayarlar Yazilari: '+ htmlSelector ({9:9, 10:10, 11:11, 12:12,15:15}, Options.overviewFontSize, 'id=ptoverfont') +'</td></tr>';
      str += "</table></div>";
	  str+= 'Versiyonu : ' + Version;
      t.cont.innerHTML = str;
      document.getElementById('ptoverOriginal').addEventListener('click', e_clickEnableTroops, false);
    //  document.getElementById('idCheck').addEventListener('click', e_clickEnableMarch, false);
    //  document.getElementById('ptoverIncTraining').addEventListener('click', e_clickEnableTraining, false);
    //  document.getElementById('ptoverIncTrainingTotal').addEventListener('click', e_clickEnableTrainingTotal, false);
      document.getElementById('ptOverOver').addEventListener('click', e_allowWidthOverflow, false);
      document.getElementById('ptoverfont').addEventListener('change', e_fontSize, false);
//DebugTimer.display ('Draw Overview');    
    } catch (e){
      t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);

    function e_clickEnableTroops (){
      var t = Tabs2.Overview;
      Options.includeCity = document.getElementById('ptoverOriginal').checked;
      t.show ();
    }
    function e_clickEnableMarch (){
      var t = Tabs2.Overview;
      Options.includeMarching = document.getElementById('idCheck').checked;
      t.show ();
    }
    function e_clickEnableTraining (){
      var t = Tabs2.Overview;
      Options.includeTraining = document.getElementById('ptoverIncTraining').checked;
      t.show ();
    }
    function e_clickEnableTrainingTotal (){
      var t = Tabs2.Overview;
      Options.includeTrainingTotal = document.getElementById('ptoverIncTrainingTotal').checked;
      t.show ();
    }

    function e_fontSize(evt){
      document.getElementById('overMainDiv').style.fontSize = evt.target.value +'px'; 
      Options.overviewFontSize = evt.target.value;
    }

    function e_allowWidthOverflow (evt){
      var tf = document.getElementById('ptOverOver').checked;
      Options.overviewAllowOverflow = tf;
      if (tf)
        t.cont.style.overflowX = 'visible';
      else
        t.cont.style.overflowX = 'auto';
    }

  },
};

function getWallInfo (cityId, objOut){
  objOut.wallSpaceUsed = 0;
 
  objOut.wallLevel = 0;  
  objOut.wallSpace = 0;     
   
  var b = Seed.buildings["city" + cityId];
  if (b.pos1==null)
    return;  
  objOut.wallLevel = parseInt(b.pos1[1]);
  var spots = 0;
  for (var i=1; i<(objOut.wallLevel+1); i++)
    spots += (i * 500);
  objOut.wallSpace = spots;     
    
     
  var fort = Seed.fortifications["city" + cityId];
  for (k in fort){
    var id = parseInt(k.substr(4));
    if (id<60)
      objOut.wallSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
   
  }
}   
/****************************  General Sekmesi Fonksiyonu ******************************/

Tabs2.Generals = {
  tabOrder : 22,
  tabLabel : 'GENERAL',
  cont : null,
  displayTimer : null,

  Generals : function (){
  },

  init : function (div){
    this.cont = div;
  },

  hide : function (){
    clearTimeout (Tabs2.Generals.displayTimer);
  },
  
  show : function (){
    var rownum = 0;
    var t = Tabs2.Generals;

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
          tot += row[i];
        m.push ('<TD style="background: #ffc">');      
        m.push (addCommas(tot));
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<TD');
        m.push (style);
        m.push ('>');     
        m.push (addCommas(row[i]));
        m.push ('</td>');
      }
      m.push ('</tr>');
      return m.join('');
    }
    
    function parseNaN (n) {
      x = parseInt(n,10);
      if (isNaN(n)) 
        return 0;
      return x;
    }
    
//DebugTimer.start(); 
    try {
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
//      <TR align=left><TD><SPAN class=ptStatLight>Joined on:</span> '+ dt.toLocaleDateString() +'</td>
      str = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;">';
//      str = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;"><TABLE cellspacing=0 cellpadding=0 class="ptTab ptStat" width=97% align=center>\
//        <TD><SPAN class=ptStatLight>Güç:</span> ' + addCommas(Seed.player.might) +'</td>\
//        <TD><SPAN class=ptStatLight>Alliance:</span> ' + getMyAlliance()[1] +'</td>\
//        <TD align=right><SPAN class=ptStatLight>Domain:</span> ' + unsafeWindow.domainName +'</td></tr></table></div>';
             
      str += "<DIV id=overMainDiv style='font-size:"+ Options.overviewFontSize +"px'><TABLE class=ptTabOverview cellpadding=0 cellspacing=0></td>";
      str += "<TD width=100><B>Sehirleriniz:"
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=100><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>' +"</td>";
      }
      str += "</tr><TD width=81>Altin:<BR>Vergi:<BR>Gelir:<BR>Bakim:<BR><BR><B>Kaynak(1%):<BR>Ordu(0.5%):<BR>Arastirma(0.5%):<BR>Insaat(0.5%):</B>";
      Gold=[];
      Tax=[];
      Revenue=[];
      for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        Gold[i] = addCommas(Seed.citystats[cityID].gold[0]);
        Tax[i] = Seed.citystats[cityID].gold[1];
        Revenue[i]  = parseInt(parseInt(Seed.citystats["city" + Cities.cities[i].id]["pop"][0]) * Tax[i] / 100 + "n");  // Current  population

      }      
      for(i=0; i<Cities.numCities; i++) {
        var officer = "";       
        officers = Seed.knights["city" + Cities.cities[i].id];
        if (officers) {
          var RESOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].resourcefulnessKnightId];
          var TRNOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].combatKnightId];
          var BLDOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].politicsKnightId];
          var RDOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].intelligenceKnightId];
          if (RESOfficer)
            var RESOfficer = parseNaN(RESOfficer.knightLevel);
          else
            var RESOfficer = 0; 
          if (TRNOfficer)
            var TRNOfficer = parseNaN(TRNOfficer.knightLevel);
          else
            var TRNOfficer = 0; 
          if (RDOfficer)
            var RDOfficer = parseNaN(RDOfficer.knightLevel);
          else
            var RDOfficer = 0; 
          if (BLDOfficer)
            var BLDOfficer = parseNaN(BLDOfficer.knightLevel);
          else
            var BLDOfficer = 0; 
          var Wage = (RESOfficer+TRNOfficer+RDOfficer+BLDOfficer)*20;
        }
        str += "<TD width=81>" + Gold[i] + "<BR>"+ Tax[i] + "%<BR>"+ Revenue[i] + "<BR>"+ Wage + "<BR><BR>"+ RESOfficer + "%<BR>" + TRNOfficer/2 +'%<BR>'+ RDOfficer/2 +'%<BR>'+ BLDOfficer/2 +"%</td>";
      }
//      str += "</TABLE>";
        str += '<TR><TD colspan=12><BR></td></tr>';  
//	    str += '<TABLE class=ptTabOverview cellpadding=0 cellspacing=0></td><TR valign=top align=right><TD></td><TD style=\'background: #ffc\'></td>';  
//    Generals      
      rows = [];
      rows[0] = [];
      var maxunit=20;
  	  for (r=1; r<maxunit; r++){
        rows[r] = [];
	 	    for(i=0; i<Cities.numCities; i++) {
            rows[r][i] = 0;
        }
	    }
//      for(i=0; i<Cities.numCities; i++) {
//        var totWilds = 0;
//        dat = Seed.wilderness['city'+ Cities.cities[i].id];
//        if (dat!=null && matTypeof(dat)=='object')
//          for (k in dat)
//            ++totWilds;
//        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos1[1]);
//		    if(castle == 10) castle = 11;
//        if (totWilds < castle)
//          row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';
//        else
//          row[i] = totWilds +'/'+ castle;
//      }

//      for(i=0; i<Cities.numCities; i++) {
//        for(k=0; k<Generals.Num; i++) {
//              var GName=Generals[k].name;
//              str += "<TD width=81>"+ GName +'%<BR>'+ TRNOfficer/2 +'%<BR>'+ RDOfficer/2 +'%<BR>'+ BLDOfficer/2 +"%</td>";
 //             rows[r][i] = parse(Seed.knights["city" + Cities.cities[i].id].name);
//             }
//      }
      str += '<TR><TD colspan=12><BR></td></tr>';
      
//	  http://apps.facebook.com/globalwarfaregame/?page=claimStuff&in=3036528&lp=14&kid=27485&cid=67155&ins=30
      Tabs2.Generals.cont.innerHTML = str;
//DebugTimer.display ('Draw Generals');    
    } catch (e){
      Tabs2.Generals.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);
	  },
};
/****************************  Otomatik Insaat Sekmesi Fonksiyonu  ******************************
 TODO:
	 visu directly in the game of build queue elements
	 <span class="leveltag" style="left:60px;">10</span>
	 more todos within the code
 */
Tabs.build = {
    tabOrder: 99,
    tabLabel: 'OTO-INSAAT',
    myDiv: null,
    timer: null,
    buildTab: null,
    koc_buildslot: null,
	koc_buildmenu: null,
    currentBuildMode: null,
    buildStates: [],
	loaded_bQ: [],
	lbQ: [],

    init: function(div){
        var t = Tabs.build;
        t.myDiv = div;
        t.koc_buildslot = unsafeWindow.Building.buildSlot; //save original koc function
        t.koc_buildmenu = unsafeWindow.Building.buildMenu; //save original koc function
        t.currentBuildMode = "build";
		t.buildStates = {
            running: false,
			help: false,
        };
        t.readBuildStates();
        
        for (var i = 0; i < Cities.cities.length; i++) {
            t["bQ_" + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, '[]'));
			if (typeof t["bQ_" + Cities.cities[i].id] == 'undefined' || (t["bQ_" + Cities.cities[i].id]) == "") {
				t["bQ_" + Cities.cities[i].id] = [];
			}
        }
        
        var m = '<DIV id=pbBuildDivF class=ptStat>INSAAT SEÇENEKLERI MENÜSÜ</div><TABLE id=pbbuildfunctions width=100% height=0% class=ptTab><TR>';
        if (t.buildStates.running == false) {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="OTO-Insaat=KAPALI"></td>';
        }
        else {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="OTO-Insaat=AÇIK"></td>';
        }
		m += '<TD><INPUT id=pbBuildMode type=submit value="OTO-Ins.Sirasi=KAPALI"></td>';
		m += '<TD>Insaat Içerigi: <SELECT id="pbBuildType">\
				<OPTION value=build>Bir Seviye YÜKSELT</option>\
				<OPTION value=max>Maksimum Seviyeye YÜKSELT</option>\
				<OPTION value=destruct>Yikim YAP</option>\
				</select></td>';
		//m += '<TD><INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>Yardim Istensin mi??</td>';
		m += '</tr></table></div>';
        m += '<DIV id=pbBuildDivQ class=ptStat>Insaat Seçenekleri</div><TABLE id=pbbuildqueues width=100% height=0% class=ptentry><TR>';
		for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><B>' + Cities.cities[i].name + '</b></center></td>';
        }
		m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value="GÖSTER"></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD>Sira:</td><TD id=pbbuildcount_' + Cities.cities[i].id + '>' + t["bQ_" + Cities.cities[i].id].length + '</td>';
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
            m += '<TD>Süre:</td><TD id=pbbuildtotal_' + Cities.cities[i].id + '>' + timestring + '</td>';
        }
        m += '</tr></table><SPAN class=boldRed id=pbbuildError></span>';
        t.myDiv.innerHTML = m;
		UpdateMainTabLink();
        
        for (var i = 0; i < Cities.cities.length; i++) {
            var cityId = Cities.cities[i].id;
            var btnName = 'pbbuild_' + cityId;
            addQueueEventListener(cityId, btnName);
			t.showBuildQueue(cityId, false);
        }

        t.e_autoBuild(); //start checking if we can build someting
        
		document.getElementById('pbBuildType').addEventListener('change', function(){t.setBuildMode(this.value);}, false);
		document.getElementById('pbBuildRunning').addEventListener('click', function(){
            t.toggleStateRunning(this);
        }, false);
		document.getElementById('pbBuildMode').addEventListener('click', function(){
            t.toggleStateMode(this);
        }, false);
		// document.getElementById('pbHelpRequest').addEventListener ('change', function (){
        // t.buildStates.help = (document.getElementById('pbHelpRequest').checked);
        // t.saveBuildStates();
        // }, false);
   	    
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
		  //actionLog ('Seed.queue_con: (now='+ now +')\n'+ inspect (Seed.queue_con, 3));
          for (var i = 0; i < Cities.cities.length; i++) {
              var cityId = Cities.cities[i].id;
              var isBusy = false;
              var qcon = Seed.queue_con["city" + cityId];
              if (matTypeof(qcon)=='array' && qcon.length>0) {
                if (parseInt(qcon[0][4]) > now)
                  isBusy = true;
                else
                  qcon.shift();   // remove expired build from queue        
              }              
			  //actionLog ('City #'+ (i+1) + ' : busy='+ isBusy);               
              if (isBusy) {
                  //TODO add info of remaining build time and queue infos
              } else {
                 if (t["bQ_" + cityId].length > 0) { // something to do?
                 	 var bQi = t["bQ_" + cityId][0];   //take first queue item to build
					 t.doOne(bQi);;
					 //setTimeout(t.e_autoBuild, 10000); //should be at least 10
					 //return; // we need to make sure that there is enough time for each ajax request to not overwrite the vaule that are needed by the next run
                 }
              }       	
            }
          }
		setTimeout(t.e_autoBuild, 10000); //should be at least 10
    },  
    doOne : function (bQi){
		var t = Tabs.build;
		var currentcityid = parseInt(bQi.cityId);
		var cityName = t.getCityNameById(currentcityid);
		var time = parseInt(bQi.buildingTime);
		var mult = parseInt(bQi.buildingMult);
		var attempt = parseInt(bQi.buildingAttempt);

		
		//mat/KOC Power Bot: 49 @ 19:41:45.274: Pos: 6 Type: 13 Level: 8 Id: 1523749
		
		var mode = bQi.buildingMode;
		//  var mode = "build"; //FOR DEBUG
		
		var citpos = parseInt(bQi.buildingPos);
		//  var citpos = 6; //FOR DEBUG
		
		if (Seed.buildings['city' + currentcityid]["pos" + citpos] != undefined && Seed.buildings['city' + currentcityid]["pos" + citpos][0] != undefined) {	
			var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
			var bdgid = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][0]);
			//  var bdgid = 13; //FOR DEBUG
			
			var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
			var curlvl = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][1]);
			//  var curlvl = 8; //FOR DEBUG

			var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
			var bid = parseInt(Seed.buildings["city" + currentcityid]["pos" + citpos][3]);
			//  var bid = 1523749; //FOR DEBUG
									
			if (curlvl > 8 && mode == 'build') {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Seviye 10 insaatlar Manuel Olarak Yapilabilinir ancak.!!");
				return;
			};
			if (isNaN(curlvl)) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Insaat Için Gereksinimler Karsilanamadi.!!");
				return;
			}
			if (l_bdgid != bdgid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Insaat Için Gereksinimler Karsilanamadi.!!");
				return;
			}
			if (l_bid != bid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Insaat Için Gereksinimler Karsilanamadi.!!");
				return;
			}
			if (l_curlvl < curlvl) {
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog("Siradan Kaldirildi.!Zaten Ayni Seviyede Oldugundan Insa Edilemedi.!");
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
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "destruct.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function(rslt){
						if (rslt.ok) {
							actionLog("Destructing " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " at " + cityName, true);
							Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
							if (params.cid == unsafeWindow.currentcityid)
								unsafeWindow.update_bdg();
							// if (document.getElementById('pbHelpRequest').checked == true)
								// t.bot_gethelp(params.bid, currentcityid);
							t.cancelQueueElement(0, currentcityid, time, false);
						} else {
							var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
							t.requeueQueueElement(bQi);
							document.getElementById('pbbuildError').innerHTML = errmsg;
							actionLog(errmsg, true);
						}
					},
					onFailure: function(){
						document.getElementById('pbbuildError').innerHTML = "Baglanti Hatasi Meydana Geldi.! Yikim ISlemi Yapilamadi..!";
					}
				})
			}
			if (mode == 'build') {
				var invalid = false;
				var chk = unsafeWindow.checkreq("b", bdgid, curlvl); //check if all requirements are met
				for (var c = 0; c < chk[3].length; c++) {
					if (chk[3][c] == 0) {
						invalid = true;
					}
				}
				if (invalid == false) {							
					var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
					params.cid = currentcityid;
					//params.bid = "";
					params.pos = citpos;
					params.lv = curlvl + 1;
					if (params.lv > 9){ //make sure that no level 10+ is built
						t.cancelQueueElement(0, currentcityid, time, false);
						actionLog("Insaat Siradan Kaldirildi.. Seviye 10 ve Üzeri Insaatlari LÜTFEN MANUEL Yapiniz.!!");
						return;
					}
					if (params.lv > 1) {
						params.bid = bid;
					}
					params.type = bdgid;
					
					new MyAjaxRequest(unsafeWindow.g_ajaxpath + "construct.php" + unsafeWindow.g_ajaxsuffix, {
						method: "post",
						parameters: params,
						onSuccess: function(rslt){
							if (rslt.ok) {
								actionLog("Insaa Edilen: " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " Seviyesi: " + params.lv + " Sehiriniz: " + cityName, true);								
								Seed.resources["city" + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][1]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][2]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][3]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][4]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec5[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][5]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec6[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][6]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec7[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][7]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec8[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][8]) * mult * 3600;
								Seed.queue_con["city" + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(),  unsafeWindow.unixtime() + time, 0, time, citpos]);						
								if (params.cid == unsafeWindow.currentcityid)
									unsafeWindow.update_bdg();
								// if (document.getElementById('pbHelpRequest').checked == true)
									// t.bot_gethelp(params.bid, currentcityid);
								t.cancelQueueElement(0, currentcityid, time, false);
							} else {
								var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
								if (rslt.error_code == 103) { // building has already the target level => just  delete
									t.cancelQueueElement(0, currentcityid, time, false);
									actionLog("Insaat Siradan Kaldirildi.! Zaten Su anda Devam Ediyor Insaati..!");
								} else {
									t.requeueQueueElement(bQi);
									document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name +': '+ errmsg + " Kontrol ederek yeniden deneyiniz..!";
								}
								actionLog(errmsg);
							}
					},
						onFailure: function(){
							document.getElementById('pbbuildError').innerHTML = "Baglanti hatasi Olustu.! Lügtfen Daha Sonra Yeniden Deneyiniz.!";
						}
					});
				} else {
					t.requeueQueueElement(bQi); // requeue item if check is invalid
				}
			}
		} else {
			t.cancelQueueElement(0, currentcityid, time, false);
			actionLog("Insaat Siradan Kaldirildi.!Öge Bulunmuyor.!!");
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
    show: function(){
		var t = Tabs.build;
    },
    bot_buildslot: function(c, a){
        var t = Tabs.build;
		var cityId = t.getCurrentCityId();
        var buildingPos   = c;
        var buildingType  = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][0]);
        var buildingLevel = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
		var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
		if (DEBUG_TRACE) actionLog("Pos: " + buildingPos + " Içerik: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
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
					t.modalmessage('Destruction already in Queue!');
					return;
				}
			}
		}
        if (t.currentBuildMode == "build") {
		    if (buildingLevel >= 9) {
                t.modalmessage('Due to building requirements (DI), buildings above level 9\nshould be manualy built.');
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
		
        var buildingTime = unsafeWindow.constructionData["b" + buildingType].c[10] * buildingMult;
        if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
            buildingTime = 5;
        }
		
		if (buildingMode == 'build') {
			buildingTime = parseInt(buildingTime / (1 + unsafeWindow.General.politicsBonus() + unsafeWindow.Research.bonusForType(unsafeWindow.Constant.Research.CRANES)));
        } 
		if (buildingMode == 'destruct') {
			buildingTime = buildingTime / (1 + unsafeWindow.General.politicsBonus() + unsafeWindow.Research.bonusForType(unsafeWindow.Constant.Research.CRANES));
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
		  var j = d > 1 ? unsafeWindow.cm.SpeedUpType.upgrade : unsafeWindow.cm.SpeedUpType.build;
		  unsafeWindow.cm.ClientSideCookieManager.setCookie(j, false)
		}
	  };
	  unsafeWindow.common_postToProfile("95", unsafeWindow.Object.cloneFeed(unsafeWindow.template_data_95), unsafeWindow.Object.cloneFeed(unsafeWindow.actionlink_data_95), g, b)
	},
	addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
	var t = Tabs.build;
		var lbQ = t["bQ_" + cityId];
		lbQ.push({
            cityId: 			cityId,
            buildingPos:		buildingPos,
            buildingType: 		buildingType,
			buildingId: 		buildingId,
            buildingTime: 		buildingTime,
            buildingLevel: 		buildingLevel,
            buildingAttempts: 	buildingAttempts,
			buildingMult: 		buildingMult,
            buildingMode: 		buildingMode
        });
		t.modifyTotalTime(cityId, 'increase', buildingTime); //adjust total Time
	},
    modalmessage: function(message){
	    var t = Tabs.build;
        var timeout = 10000;
        var content = "autoclose after 10sec...<br><br>"
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
    hide: function(){
        var t = Tabs.build;
		//unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
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
        }
        else {
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
        row.insertCell(6).innerHTML = '<input class="button30 ptButton20" type=button id="queuecancel_' + queueId + '" value=IPTAL></input>';
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
            t.popBuildQueue = new CPopup('pbbuild_' + cityId, 0, 0, 350, 500, true, function() {clearTimeout (t.timer);});
        }
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityQueueContent">';       
        t.popBuildQueue.getMainDiv().innerHTML = '</table></div>' + m;
        t.popBuildQueue.getTopDiv().innerHTML = '<TD width="200px"><B>Kayitli Insaatlariniz: ' + cityName + '</b></td><TD><INPUT id=pbOptimizeByTime type=submit value="Zamana Göre Sirala"></td>';
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
            obj.value = "OTO-Insaat=KAPALI";
        }
        else {
            t.buildStates.running = true;
            t.saveBuildStates();
            obj.value = "OTO-Insaat=AÇIK";
        }
    },
    toggleStateMode: function(obj){
		var t = Tabs.build;
        if (obj.value == 'OTO-Ins.Sirasi=KAPALI') {
			unsafeWindow.Building.buildSlot = t.bot_buildslot; // overwrite original koc function
			unsafeWindow.Building.buildMenu = t.bot_buildslot; // overwrite original koc function
			// var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
			// if(guardian.length >0)
				// guardian[0].addEventListener('click', t.bot_buildguardian, false);
            obj.value = "OTO-Ins.Sirasi=AÇIK";
        }
        else {
			unsafeWindow.Building.buildSlot = t.koc_buildslot; // restore original koc function
			unsafeWindow.Building.buildMenu = t.koc_buildmenu; // restore original koc function
			// var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
			// if(guardian.length >0)
				// guardian[0].removeEventListener('click', t.bot_buildguardian, false);
			obj.value = "OTO-Ins.Sirasi=KAPALI";
        }
    },
	getCityNameById: function (cityId) {
    return Cities.byID[cityId].name;  	
	},
}

/*********************************** Bilgi Sekmesi Fonksiyonu ***********************************/
Tabs2.Info = {
  tabOrder : 44,
  tabLabel :'BILGI',
  cont : null,
//  tabDisabled : !ENABLE_INFO,

  init : function (div){
    var t = Tabs2.Info;
	t.cont = div;

    fortmight = {
      u52: "1",
      u53: "1",
      u54: "1",
      u55: "1",
	  u56: "1",
      u57: "1",
    };

 var t = Tabs2.Info;
    rownum = 0;

m = '<STYLE>.xtabR {padding-right: 5px; border:none; background:none; white-space:nowrap; text-align:right;}\
		        .xtabH {background:#ffffe8; border:none; padding-right: 8px; padding-left: 8px; margin-left:10px; text-align:right;}\
            .xtabHL { background:#ffffe8; border-width: 1px; border-style: none none none solid; padding-right:8px; padding-left:5px; margin-left:10px; text-align:right;}\
            .xtabL { background:none; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left: 8px; margin-left:10px; text-align:right;}\
            .xtabLine { padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none }</style>\
        <DIV style="overflow-y:auto; overflow-x:hidden"><DIV class=ptStat>GENEL BILGILENDIRME </div><TABLE align=center cellpadding=1 cellspacing=0>\
        <TR style="text-align:center"><TD class=xtab></td><TD class=xtabHL colspan=9><B>GEREKSINIMLERI </b></td><TD class=xtabHL colspan=4><B>ÖZELLIKLERI</b></td><TD class=xtabHL colspan=4><B>Bakim</b></td></tr>\
        <TR valign=bottom align=right><TD class=xtab></td><TD class=xtabHL>Gida</td><TD class=xtabH>Petrol</td><TD class=xtabH>Tas</td><TD class=xtabH>Çelik</td>\
        <TD class=xtabH>Titanyum</td><TD class=xtabH>Grafen</td><TD class=xtabH>Elmas</td><TD class=xtabH>Uranyum</td><TD class=xtabH>Nüfus</td><TD class=xtabHL>Can</td><TD class=xtabH>Saldiri</td><TD class=xtabH>Hiz</td>\
        <TD class=xtabH>Yük</td><TD class=xtabHL>Gida</td></tr>\
        <TR style="height:1px;"><TD style="padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none" colspan=11></td></tr>';
    for (ui=1; ui<21; ui++){
    
      if (ui==2) ui++ ;// skip unknown troops type
      if (ui==3) ui++ ;// skip unknown troops type
      if (ui==14) ui++; // skip unknown troops type

      if (++rownum % 2)
        rsty = '';
      else
        rsty = ' style="text-align:right; background: #e8e8e8" ';
      cost = unsafeWindow.unitcost['unt'+ui];     //  0=NAME, 1=?, 2=Food, 3=Oil, 4=?, 5=Steel, 6=Titan, 10=IdlePop
      stats = unsafeWindow.unitstats['unt'+ui];   //  0=Life, 1=Attack, 2=?, 3=Speed, 4=?, 5=Load
      food = unsafeWindow.unitupkeeps[ui];
      troopname = unsafeWindow.arStrings.unitName['u'+ui];

      m += '<TR '+ rsty +'style="text-align:right;">';
      m += '<TD class=xtab><B>'+ troopname +'</b></td><TD class=xtabL>'+ cost[2] +'</td><TD class=xtabR>'+ cost[3] +'</td>\
            <TD class=xtabR>'+ cost[4] +'</td><TD class=xtabR>'+ cost[5]+'</td><TD class=xtabR>'+ cost[6]+'</td><TD class=xtabR>'+ cost[7]+'</td><TD class=xtabR>'+ cost[8]+'</td><TD class=xtabR>'+ cost[9] +'</td><TD class=xtabR>'+ cost[10] +'</td>\
            <TD class=xtabL>'+ stats[0] +'</td><TD class=xtabR>'+ stats[1] +'</td><TD class=xtabR>'+ stats[3] +'</td><TD class=xtabR>'+ stats[5] +'</td><TD class=xtabL>'+ food +'</td>';
      m += '</tr>';

    }
//"Mines",150,760,50,0,0,0,8,
// name, food, oil, stone, ?, ?, ?, ?, traintime?
//fortstats=[0,1000,0,0,0,1] Life,Atk,Load?,?,?,?
    m += '<TR class=xtabLine><TD colspan=11 class=xtabLine></td></tr>';
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
          <TD class=xtabR>'+ cost[3] +'</td><TD class=xtabR>'+ cost[4] +'</td><TD class=xtabR>'+ cost[5]+'</td><TD class=xtabR>'+ cost[6]+'</td><TD class=xtabR>'+ cost[6] +'</td><TD class=xtabR>'+ cost[6]+'</td><TD class=xtabR>'+ cost[6]+'</td>\
          <TD class=xtabL>'+ stats[0] +'</td><TD class=xtabR>'+ stats[1] +'</td><TD class=xtabR>'+ stats[2] +'</td><TD class=xtabR>'+ stats[3] +'</td>\
          <TD class=xtabL>'+ food +'</td></tr>';
    }
    m += '<TR class=xtabLine><TD colspan=11 class=xtabLine></td></tr>';
    m += '</table></div><BR>';
		m +='<DIV>';
    if (DEBUG_BUTTON)
      m += '<BR><INPUT id=ptButDebug type=submit name="SEED" value="DEBUG">';
    
    t.cont.innerHTML = m +'</div>';
    if (DEBUG_BUTTON)
      document.getElementById('ptButDebug').addEventListener('click', function (){debugWin.doit()}, false);
  },

  hide : function (){
  },

  show : function (){
  },
}

/*********************************** Oyuncu Sekmesi ***********************************/




Tabs.AllianceList = {
  tabOrder : 255,
  tabLabel : 'OYUNCU',
  cont : null,
  dat : [],



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
//actionLog ("ajax/allianceGetMembersInfo.php:\n"+ inspect (rslt, 5, 1));      
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
    unsafeWindow.PTpl = t.clickedPlayerLocator;
    unsafeWindow.PTalClickPrev = t.eventListPrev;
    unsafeWindow.PTpl2 = t.clickedPlayerLeaderboard;
    unsafeWindow.PTalClickNext = t.eventListNext;
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;
    Lastlogin=0;
    t.show();
  },
 

  hide : function (){
  },
  
  show : function (){
    var t = Tabs.AllianceList;
    if (t.state == null){
      if (getMyAlliance()[0] == 0) {
        t.cont.innerHTML = '<BR><BR><CENTER>Bu Özelligi Kullanabilmeniz Için Bir Ittifak Üyesi Olmalisiniz..!</center>';
        t.state = 1;
        return;
      }
      var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\
          <TR><TD class=xtab align=right></td><TD class=xtab>Oyuncu Adi: &nbsp;</td>\
            <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Oyuncu ARA" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
          <TR><TD class=xtab>Yada,: </td><TD class=xtab> Ittifak Adi: &nbsp;</td>\
            <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Ittifak ARA" /></td>\
           <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
           <TR><TD class=xtab></td><TD class=xtab> &nbsp;\</td>\
           <TD class=xtab><INPUT align=right id=idMyAllSubmit type=submit value="'+ getMyAlliance()[1] +'"/>\
           <TD class=xtab><span align=right <b>Mesafe Hesaplama: </b></span></td>\
           <TD class=xtab ><div><select id="idFindETASelect">\
        <option value="0,250" > -- Seçiniz -- </option>\
        <option value="0,180" > Ikmal Kamyonu </option>\
        <option value="0,200" > Piyade </option>\
        <option value="0,320" > Keskin Nisanci </option>\
        <option value="0,300" > Tanksavar Piyade</option>\
        <option value="0,275" > Özel Kuvvetler </option>\
        <option value="0,250" > Mobil SAM </option>\
        <option value="1,1000" > Tank </option>\
        <option value="1,750" > Insansiz Uçak </option>\
        <option value="1,150" > Ikmal Helikopteri </option>\
        <option value="1,100" > Savas Helikopteri </option>\
        <option value="1,120" > Avci Uçagi </option>\
        <option value="1,280" > Bombardiman Uçagi </option>\
        <option value="1,85" > Kargo Uçagi </option>\
        <option value="1,90" > Cehennem Tanki</option>\
        <option value="1,80" > Iyon Topu </option>\
        <option value="1,380" > Nükleer Füze </option>\
         <option value="1,680" > Iyon Topu</option>\
        </select></div>\
        </td></tr>\
         </table><span style="vertical-align:middle;" id=altInput></span></div><SPAN id=allListOut></span>';
      t.cont.innerHTML = m;
      document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
      document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
      document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
      document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
      document.getElementById('idMyAllSubmit').addEventListener ('click', t.showMyAlliance, false);
      document.getElementById('idFindETASelect').addEventListener ('click', t.handleEtaSelect, false);
     // document.getElementById('allGotoPage').disabled = true;
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
      document.getElementById('ptplayErr').innerHTML = 'En Az 3 Karakter Yazarak Arama Yapmalisiniz..!';
      return;
    }
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Araniyor ...</center>';
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
    var m = '<DIV class=ptstat>Gösterilen Oyuncu: <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=100% align=center class=ptTab cellspacing=5>\
	  <TR style="font-weight:bold">\
	  <TD width=25%>Isim</td><TD align=right width=15%>Güç</td><TD width=15%> &nbsp; Çevrimiçi</td><TD width=15%>Facebook Prfl.&nbsp;</td><TD width=75%>Bakis</td></tr>';
    var row=0;
    var cl='';
    for (k in t.playerList){
      var u = t.playerList[k];
      if (++row % 2)
        cl = 'class=ptOddrow ';
      else
       cl = '';
          m += '<TR '+ cl +'valign=top>\
	      <TD><SPAN onclick="PTpl(this, '+ u.userId +')"><A style="color:#1D0AF2">'+ u.genderAndName +'</a></td><TD align=right>'+ addCommasInt(u.might) +'</td>\
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldRed><blink><b>Çevrimiçi</b></blink></span>":"") +'</td>\
          <div style="width:100%;filter:Glow(color=#F20A15, strength=12)">\
		  <TD align=center><A style="color:#1D0AF2" target="_tab" href="http://www.facebook.com/profile.php?id='+ u.Fbuid +'">Fcbk.Profili</a></div></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A style="color:#1D0AF2">Detaylar</a> &nbsp; <BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A style="color:#1D0AF2">Son Giris Tarihi</a></span></td></tr>';
    }
    m += '</table></div>';
    document.getElementById('allListOut').innerHTML = m;
  },
  clickedPlayerDetail : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "Detaylara Ulasiliyor ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },
  clickedPlayerLocator : function (span, uid){
    var t = Tabs.AllianceList;
    t.fetchPlayerInfo2 (uid, function (r) {t.gotPlayerInfo2(r, span)});
  },  
  clickedPlayerGetLastLogin : function (span, uid){
     var t = Tabs.AllianceList;
     span.onclick = '';
     span.innerHTML = "Detaylara Ulasiliyor ...";
     t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
   },
  gotPlayerInfo2 : function (rslt, span) {
  var t = Tabs.AllianceList;
      if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Leaderboard:</b> Not found! (misted?)';
      return;
    }
    var myA = getMyAlliance ();
    t.dat = [];
    actionLog ("gotPlayerLeaderboard -1 "+JSON2.stringify(rslt));
    var p = rslt.data;
    for(var k in rslt.data.cities) { alert(k) }     
    for (var c=0; c<p.cities.length; c++){
         t.dat.push ([p.player.generalName, parseInt(p.player.power), 'xx', parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
              'xx', 'xx', p.cities[c].cityName, 0, 1,0,p.userId]);
        }
		alert(p.cities[1].progress)
        t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
        t.ModelCity=Cities.cities[0];
        t.setEta();
        t.fetchPlayerLastLogin (uid, function (r) {t.displayPlayer(p.allianceName,r)});
        t.fetchPlayerLastLogin();
        t.displayPlayer (p.allianceId);
  },
clickedPlayerLeaderboard : function (span, uid){
      var t = my.AllianceList;
      span.onclick = '';
      span.innerHTML = "Detaylara Ulasiliyor ...";
      t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },
  fetchLeaderboard : function (uid, notify) {
    unsafeWindow.AjaxCall.gPostRequest("getUserLeaderboard.php",{action:"view_player_detail", player_id:uid},
    function(rslt){
        notify (rslt);
   	},function(rslt){
   	        notify (rslt);
    	});
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
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD>Ittifak: '+ a +' &nbsp; Sehirleri: '
          + u.cities +' &nbsp; Nüfus: '+ u.population +'</td></tr><TR><TD>Vilayet: ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  eventMyAllianceSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Araniyor ...</center>';
    t.fetchAllianceMemberList (getMyAlliance()[0], null, t.eventGotMemberList);
  },  
    
  aName : '',
  eventSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = 'En Az 3 Karakter Girisi Yaparak Arama Yapmalisiniz..!';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Araniyor ...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },

  showMyAlliance : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> ...</center>';
    if (myA[0]!=0  ) {
       t.eventGetMembers(myA[0]);
    }
    else {
       document.getElementById('allListOut').innerHTML = 'Bu Özelligi Kullanabilmeniz Için Bir Ittifak Üyesi Olmak Zorundasiniz..!';
    }
  },
  fetchPlayerInfo2 : function (uid, notify) { 
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.tvuid = uid;
    params.uid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getSeed.php?u=" + unsafeWindow.g_ajaxsuffix, {
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
  
  fetchMapTiles : function (cid, notify) {
    var t = Tabs.AllianceList;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	params.action = "show_all_players"
	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
	  alert(rslt)
		},
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
	  alert(rslt)
		},
    });
  },
  fetchAllianceList : function (allianceName, myAid, notify) {   // at least 3 chars :)
    var t = Tabs.AllianceList;
    function combineResults (rsltA, rsltM, notify){
      if (!rsltA.ok){
        if (rsltA.msg.indexOf("Herhangi Bir Ittifak Üyesi Degilsiniz..")!=0 || !rsltM.ok){
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
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "allianceGetSearchResults.php" + unsafeWindow.g_ajaxsuffix, {
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
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "allianceGetOtherInfo.php" + unsafeWindow.g_ajaxsuffix, {
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
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "allianceGetInfo.php" + unsafeWindow.g_ajaxsuffix, {
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
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "searchPlayers.php" + unsafeWindow.g_ajaxsuffix, {
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
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, {
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
  fetchPlayerStatus : function (uidArray, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = uidArray.join(',');
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getOnline.php" + unsafeWindow.g_ajaxsuffix, {
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
   fetchPlayerGetLastLogin : function (span, uid){
        var t = my.AllianceList;
        span.onclick = '';
        span.innerHTML = "Araniyor...";
        t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
  },
  fetchPlayerLastLogin : function (uid, notify){
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.pid = uid;
      new MyAjaxRequest(unsafeWindow.g_ajaxpath + "viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
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
          m = '<span style="color:black">Son Giris Tarihi: '+lastLogin+'</span>';
        } else {
           m = '<span style="color:red">Son Giris Tarihi Bulunamadi: '+lastLogin+'</span>';
        }
        span.innerHTML = m + '';
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
            <DIV class=ptstat ><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab>Ittifak: '+ allName +'</td>\
            <TD class=xtab width=80% align=center>Last login: <SPAN id=lastlogin>'+  rslt.playerInfo.lastLogin+'</span></td><TD class=xtab align=right></td></tr></table></div>\
            <div style="max-height:470px; height:470px; overflow-y:auto;"><TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD style="overflow-y:hidden;">\
            <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Oyuncu</div></a></td>\
            <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Güç</a></div></td>\
            <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Sehirler</a></div></td>\
            <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Siralama</a></div></td>\
            <TD id=clickCol9 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Çevrimiçi</a></div></td>\
            <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>Sehir Adi</a></div></td>\
            <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Seviye</a></div></td>\
            <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Koord.</a></div></td>\
            <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Mesafe</a></div></td>\
            <TD id=clickCol10 onclick="PTalClickSort(this)" class=clickable><A><DIV>Mesafe Hsp.</a></div></td>\
		    <TD class=clickable><A><DIV>Son Girisi</a></div></td></tr></thead>\
            <TBODY id=allBody style="background-color:#ffffff;"></tbody></table></div>\
            <DIV  width:100%; style="top:670px; left:0px; position:absolute; background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">';
    document.getElementById('allListOut').innerHTML = m;  //style="top:670px; left:0px; position:absolute;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Mesafesi Hesaplanacak Koordinat: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> &nbsp; Yada,Sehir Seçiniz: <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';
    t.reDisp();
 //   new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
  //  document.getElementById('idFindETASelect').disabled = false;
  },
  
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
     m += '<TR '+ cl +'valign=top>\
	      <TD><SPAN onclick="PTpl(this, '+ u.userId +')"><A style="color:#1D0AF2">'+ u.genderAndName +'</a></td><TD align=right>'+ addCommasInt(u.might) +'</td>\
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed>Çevrimiçi</span>":"") +'</td>\
          <div style="width:100%;filter:Glow(color=#F20A15, strength=12)">\
		  <TD align=center><A style="color:#1D0AF2" target="_tab" href="http://www.facebook.com/profile.php?id='+ u.Fbuid +'">Fcbk.Profili</a></div></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A style="color:#1D0AF2">Detaylar</a> &nbsp; <BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A style="color:#1D0AF2">Son Giris Tarihi</a></span></td></tr>';
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
};
/*********************************** Log Tab ***********************************/
Tabs2.ActionLog = {
  tabOrder: 256,
  tabLabel : 'TAKIP',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,
    
  init : function (div){
    var t = Tabs2.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pbStat>TAKIP - Versiyon: '+ Version+'</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=pbTabLined><TR><TD></td><TD width=95%></td></table></div>';
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
  },

  show : function (){
  },

  onUnload : function (){
    var t = Tabs2.ActionLog;
    GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last50));
  },
    
  _addTab : function (msg, ts){
    var t = Tabs2.ActionLog;
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
    var t = Tabs2.ActionLog;
    var ts = new Date().toTimeString().substring (0,8);
    t._addTab (msg, ts);
    while (t.last50.length >= 50)
      t.last50.shift();
    t.last50.push ({msg:msg, ts:ts});
  },
}

function actionLog (msg){
  var now = new Date();
  GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
  if (!Tabs2.ActionLog.tabDisabled)
    Tabs2.ActionLog.log (msg);  
}
/*********************************** Seçenekler Sekmesi Fonksiyonu ***********************************/
Tabs.Options = {
  tabOrder : 55,
  tabLabel : 'SEÇENEKLER',
  cont : null,

  init : function (div){
    var t = Tabs.Options;
    t.cont = div;
    
    try {      
      m = '<TABLE class=ptTab>\
        <TR><TD colspan=2><B>Aayarlar:</b></td></tr>\
        <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Isaretlendiginde Menüyü Hareket Ettirebilirsiniz..</td></tr>\
		<TR><TD><INPUT id=ptahelpenable type=checkbox /></td><TD>Ittifakda Yayinlanan Yardim Isteklerine Otomatik Yardim Eder..</td></tr>\
        <TR><TD><INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/></td><TD>Genis Ekran: '+ htmlSelector({normal:'Normal', wide:'Genis Ekran', ultra:'Çok Genis'},GlobalOptions.pbWideScreenStyle,'id=selectScreenMode') +' </td>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>Sohbet Penceresini Saga Tasir(Genis Ekran Seçiliyse Çalisir..)</td></tr>\
		<TR><TD><INPUT id=pbWMapEnable type=checkbox /></td><TD>Haritayi Genisletir. (Genis Ekran Seçiliyse Çalisir..)</td></tr>\
		<TR><TD><INPUT id=pbrmmotdEnable type=checkbox /></td><TD> MOTD Siler.. </td></tr>\
		<TR><TD><INPUT id=pbEveryEnable type=checkbox /></td><TD>Sayfa Yenileme: <INPUT id=pbeverymins type=text size=2 maxlength=3 \> Dakika</td></tr>\
		<TR><TD><INPUT id=pbFoodToggle type=checkbox /></td><TD>Yiyecek Alarmi..! (Otomatik Olarak 2 Saatte Bir Kontrol Edilir..)</td></tr>\
		<TR><TD><BR> </td></tr>\
		<TR><TD colspan=2><B>Otomatik Toplama:</b></td></tr>\
		<TR><TD><INPUT id=ptgoldenable type=checkbox /></td><TD>Otomatik Altin Toplar.. <INPUT id=ptgoldLimit type=text size=2 maxlength=3 \>%</td></tr>\
		<TR><TD><INPUT id=ptoilenable type=checkbox /></td><TD>Otomatik Petrol Toplar..</td></tr>\
		<TR><TD><INPUT id=ptfoodenable type=checkbox /></td><TD>Otomatik Yiyecek Toplar</td></tr>\
		<TR><TD><INPUT id=ptMCenable type=checkbox /></td><TD>Otomatik Monte Eder</td></tr>\
		<TR><TD><INPUT id=ptWHenable type=checkbox /></td><TD>Otomatik Savas Basligi Toplar</td></tr>';
		m += '</table><BR><BR><HR>EvrenSerdar Tarafindan Optimize Edilmistir..!';
      div.innerHTML = m;
	  t.cont.innerHTML = m;
      
	  document.getElementById('selectScreenMode').addEventListener ('change', function(){
      		GlobalOptions.pbWideScreenStyle = document.getElementById('selectScreenMode').value;
      		GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);
	  
	  document.getElementById('pbWideOpt').addEventListener ('change', t.e_wideChanged, false);
   	  t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
	  t.togOpt ('ptgoldenable', 'pbgoldenable', CollectGold.setEnable);
	  t.togOpt ('ptoilenable', 'pboilenable', CollectOil.setEnable);
	  t.togOpt ('ptfoodenable', 'pbfoodenable', CollectFood.setEnable);
	  t.togOpt ('ptWHenable', 'pbWHenable', CollectWH.setEnable);
	  t.togOpt ('ptMCenable', 'pbMCenable', CollectMC.setEnable);
	  t.togOpt ('ptahelpenable', 'pbahelpenable', ChatPane.setEnable);
      t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
      t.togOpt ('pbWMapEnable', 'pbWideMap', WideScreen.useWideMap);
      t.togOpt ('pbrmmotdEnable', 'ptrmmotdEnable', RMMotd.setEnable);

      t.togOpt ('pbFoodToggle', 'pbFoodAlert');
      t.changeOpt ('pbeverymins', 'pbEveryMins' , RefreshEvery.setTimer);
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);  
	  t.changeOpt ('ptgoldLimit', 'pbGoldLimit');
    } catch (e) {
      t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
  },

  
  hide : function (){
  },

  show : function (){
  },
  
 togOpt : function (checkboxId, optionName, callOnChange){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);
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
}

/*********************************** SALDIRI Sekmesi Fonksiyonu ***********************************/
Tabs.PodTools = {
    tabOrder : 284,
	tabLabel : 'SALDIRI',
    cont : null,
    AttackTimer : null,
    Attacking : null,

    init : function (div){
        var t = Tabs.PodTools;
        t.cont = div;

        try {
            m = '<TABLE class=ptTab>\
            <TR><TD colspan=2><B>Otomatik Saldiri Seçenekleri:</b></td></tr>\
            <TR>\
                <TD><INPUT id=PodAttack     type=checkbox /></td><TD>Saldiri AKTIF</td>\
                <td style="width:5em"></td>\
                <TD><INPUT id=AttackWild type=checkbox /></td><TD>Bozkir Saldirisi Yapilacagi Zaman Isaretlenir.!</td></tr>\
            <TR>\
                <TD><INPUT id=SupplyTruck   type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Ikmal Kamyonu</td>\
                <td></td>\
                <TD><INPUT id=SupplyChopper type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Ikmal Helikopteri</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackInfantry type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Piyade</td>\
                <td></td>\
                <TD><INPUT id=AttackChopper  type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Savas Helikopteri</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackSniper  type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Keskin Nisanci</td>\
                <td></td>\
                <TD><INPUT id=AttackFighter type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Avci Uçagi</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackAntitank type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Tanksavar Piyade</td>\
                <td></td>\
                <TD><INPUT id=AttackBomber   type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Bombardiman Uçagi</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackSforces type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Özel Kuvvetler</td>\
                <td></td>\
                <TD><INPUT id=SupplyJet     type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Kargo Nakliyesi</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackMobileSAM type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Mobil SAM</td>\
                <td></td>\
                <TD><INPUT id=AttackHellfire  type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Cehennem Atesi Tanki</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackTank    type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Tank</td>\
                <td></td>\
                <TD><INPUT id=AttackStealth type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Görünmez Bombardiman Uçagi</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackPredator type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Insansiz Uçuk</td>\
                <td></td>\
                <TD><INPUT id=AttackNuke     type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Nükleer Füze</td>\
            </tr>\
            <TR><TD><BR> </td></tr>';
            m += '</table><BR><BR><HR>Asker sayilarini yukaridaki kutulara girdikden sonra SADECE HARITADAN SALDIRI YAPILACAK YERE TIKLAYIN.!!';
            t.cont.innerHTML = m;
            document.getElementById('PodAttack').addEventListener('change', t.tick, false);
            t.tick();

        } catch (e) {
            t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
        }
    },
    
    tick : function (){
        var t = Tabs.PodTools;
        if(
        document.getElementById("PodAttack") &&
        document.getElementById("PodAttack").checked==true){
            WarnAttackEnabled(true);
            t.AttackTimer = setInterval (t.LaunchAttack, 2000);
            actionLog(t + '.tick Setting Attack Interval ' + t.AttackTimer,true);
        } else {
            WarnAttackEnabled(false);
            if(t.AttackTimer) {
                actionLog(t + '.tick: Clearing Attack Interval:' + t.AttackTimer,true);
                clearInterval (t.AttackTimer);
                t.AttackTimer=null;
            }
        }
    },

    hide : function (){
    },

    show : function (){
    },

    togOpt : function (checkboxId, optionName, callOnChange){
        var t = Tabs.PodTools;
        var checkbox = document.getElementById(checkboxId);
        if (Options[optionName])
            checkbox.checked = true;
        checkbox.addEventListener ('change', eventHandler, false);
        function eventHandler (){
            Options[optionName] = this.checked;
            saveOptions();
            if (callOnChange) { callOnChange (this.checked); }
        }
    },

    changeOpt : function (valueId, optionName, callOnChange){
        var t = Tabs.PodTools;
        var e = document.getElementById(valueId);
        e.value = Options[optionName];
        e.addEventListener ('change', eventHandler, false);
        function eventHandler (){
            Options[optionName] = this.value;
            saveOptions();
            if (callOnChange) { callOnChange (this.value); }
        }
    },

    fireEvent : function (obj,evt){
        var t = Tabs.PodTools;
        var fireOnThis = obj;
        actionLog('fireEvent: obj=' + inspect(obj,1,false) + '   evt=' + evt, false);

        if( document.createEvent ) {
            actionLog('fireEvent: fire in the hole! (createEvent)', true);
            var evObj = document.createEvent('MouseEvents');
            evObj.initEvent( evt, true, false );
            fireOnThis.dispatchEvent(evObj);
        } else if( document.createEventObject ) {
            actionLog('fireEvent: fire in the hole! (fireEvent)', true);
            fireOnThis.fireEvent('on'+evt);
        }
    },

    LaunchAttack : function () {
        var t = Tabs.PodTools;

        actionLog(t + '.LaunchAttack: t.Attacking=' + t.Attacking, true);

        // id="marchBtn" for camps
        if(
        document.getElementById("marchBtn") && 
        !document.getElementById("generalsContainer") ){
            // This is the first attack modal
            actionLog(t + '.LaunchAttack: first modal (camp)',true);
            t.Attacking=true;
            t.fireEvent(document.getElementById("marchBtn"),'click');
        }

        // id="btnAttack" for wilds
        if(
        document.getElementById("btnAttack") &&
        !document.getElementById("generalsContainer") &&
        document.getElementById("AttackWild") &&
        document.getElementById("AttackWild").checked==true ){
            actionLog(t + '.LaunchAttack: first modal (wild)',true);
            // This is the first attack modal (for wilds)
            t.Attacking=true;
            t.fireEvent(document.getElementById("btnAttack"),'click');
        }

        // Get a list of the Generals to use in the attack
        generals=document.getElementById("generalsContainer");
        
        if(generals && t.Attacking){

            actionLog(t + '.LaunchAttack: found generals',true);
            t.Attacking=false; // prevent looping
            
            // This should be(?) the total number of queued attacks; should be compared to level of Rally Point...
            if(document.getElementById("untqueue_list")) {
                attacknum = document.getElementById("untqueue_list").getElementsByClassName('untqueue_item clearfix').length;
            } else {
                attacknum = 0;
            }

            // 
            if(document.getElementById("SupplyTruck") && document.getElementById(attack_unit_Truck)) {
                document.getElementById(attack_unit_Truck).value=document.getElementById("SupplyTruck").value;
            }
            if(document.getElementById("AttackInfantry") && document.getElementById(attack_unit_Infantry)) {
                document.getElementById(attack_unit_Infantry).value=document.getElementById("AttackInfantry").value;
            }
            if(document.getElementById("AttackSniper") && document.getElementById(attack_unit_Sniper)) {
                document.getElementById(attack_unit_Sniper).value=document.getElementById("AttackSniper").value;
            }
            if(document.getElementById("AttackAntitank") && document.getElementById(attack_unit_Antitank)) {
                document.getElementById(attack_unit_Antitank).value=document.getElementById("AttackAntitank").value;
            }
            if(document.getElementById("AttackSforces") && document.getElementById(attack_unit_SpecialForces)) {
                document.getElementById(attack_unit_SpecialForces).value=document.getElementById("AttackSforces").value;
            }
            if(document.getElementById("AttackMobileSAM") && document.getElementById(attack_unit_MobileSAM)) {
                document.getElementById(attack_unit_MobileSAM).value=document.getElementById("AttackMobileSAM").value;
            }
            if(document.getElementById("AttackTank") && document.getElementById(attack_unit_Tank)) {
                document.getElementById(attack_unit_Tank).value=document.getElementById("AttackTank").value;
            }
            if(document.getElementById("AttackPredator") && document.getElementById(attack_unit_Predator)) {
                document.getElementById(attack_unit_Predator).value=document.getElementById("AttackPredator").value;
            }
            if(document.getElementById("SupplyChopper") && document.getElementById(attack_unit_SupplyChopper)) {
                document.getElementById(attack_unit_SupplyChopper).value=document.getElementById("SupplyChopper").value;
            }
            if(document.getElementById("AttackChopper") && document.getElementById(attack_unit_Gunship)) {
                document.getElementById(attack_unit_Gunship).value=document.getElementById("AttackChopper").value;
            }
            if(document.getElementById("AttackFighter") && document.getElementById(attack_unit_Fighter)) {
                document.getElementById(attack_unit_Fighter).value=document.getElementById("AttackFighter").value;
            }
            if(document.getElementById("AttackBomber") && document.getElementById(attack_unit_Bomber)) {
                document.getElementById(attack_unit_Bomber).value=document.getElementById("AttackBomber").value;
            }
            if(document.getElementById("AttackStealth") && document.getElementById(attack_unit_Stealth)) {
                document.getElementById(attack_unit_Stealth).value=document.getElementById("AttackStealth").value;
            }
            if(document.getElementById("SupplyJet") && document.getElementById(attack_unit_CargoJet)) {
                document.getElementById(attack_unit_CargoJet).value=document.getElementById("SupplyJet").value;
            }
            if(document.getElementById("AttackHellfire") && document.getElementById(attack_unit_Hellfire)) {
                document.getElementById(attack_unit_Hellfire).value=document.getElementById("AttackHellfire").value;
            }
            if(document.getElementById("AttackNuke") && document.getElementById(attack_unit_Nuke)) {
                document.getElementById(attack_unit_Nuke).value=document.getElementById("AttackNuke").value;
            }

            // Take the first General that has max energy...start at 4 and work backward
            var list = generals.getElementsByTagName('li');
            var kk=0;
            for (var maxenergy=4; maxenergy>0; maxenergy--) {
                for(kk=0;kk< list.length;kk++) {
                    // Get the energyContainer class for this general, and count the energy classes
                    var count = list[kk].getElementsByClassName('energyContainer')[0].getElementsByClassName('energy').length;
                    if(count == maxenergy){
                        actionLog("Saldiran: General " + kk + " Budur " + count + " Enerjisi Maks.=" + maxenergy,true);
                        t.fireEvent(list[kk],'click');
                        t.fireEvent(document.getElementById("march_button"),'click');
                        kk=list.length+1;
                        maxenergy=0; // break from the loop
                        accept_peace_treaty_modal();
                    }
                }
            }

            if(document.getElementsByClassName("warning prompt").length > 0) {
                // something went wrong, drat
                var warn = document.getElementsByClassName('warning prompt')[0];
                var desc = warn.getElementsByTagName("div");
                var text = desc[desc.length-1].innerHTML;
                actionLog(text,true);
                unsafeWindow.Modal.hideModalAll();
                unsafeWindow.Modal.showAlert(text);
                window.setTimeout('Modal.hideModal();', 3000);
                return;
            }

            if(list.length==0) {
                var text = "HATA: Kullanilabilinecek Generaliniz Bulunmamaktadir..!";
                actionLog(text,true);
                unsafeWindow.Modal.hideModalAll();
                unsafeWindow.Modal.showAlert(text);
                window.setTimeout('Modal.hideModal();', 3000);
                return;		
            }

            if(kk!==list.length+2) {
                var text = "HATA: Dikkat : " + kk + " \'Tane Kalan Genaralinizinde Enerjisi YOK.!";
                actionLog(text,true);
                unsafeWindow.Modal.hideModalAll();
                unsafeWindow.Modal.showAlert(text);
                window.setTimeout('Modal.hideModal();', 3000);
                return;
            }
        }

        // check again for any warning prompt and exit if found
        if(document.getElementsByClassName("warning prompt").length > 0) {
            // something went wrong, drat
            var warn = document.getElementsByClassName('warning prompt')[0];
            var desc = warn.getElementsByTagName("div");
            var text = desc[desc.length-1].innerHTML;
            actionLog(text,true);
            unsafeWindow.Modal.hideModalAll();
            unsafeWindow.Modal.showAlert(text);
            window.setTimeout('Modal.hideModal();', 3000);
            return;
        }

        function accept_peace_treaty_modal() {
            if(
            document.getElementsByClassName("important prompt")[0].innerHTML.search(/your Peace Treaty/i) > 0 &&
            document.getElementById("confirmation-button") ) {
                actionLog(t + '.LaunchAttack: found PT confirmation-button modal!',true);
                // peace treaty modal...confirm it
                    /*
                    <div class="important prompt"><div class="wrap"><div class="wrap">
                        <div class="inner">
                        <div class="x"></div>
                        <div class="desc">
                        Attacking a player will remove the effect of your Peace Treaty and enter you into a 12 hour cool down. Attacking unowned Wilds and Camps will not. Are you sure you want to attack?
                    </div></div></div></div></div>

                    <a id="confirmation-button" style="width: 160px;" class="button55w green">
                        <span class="left"></span>
                        <span class="right"></span>
                        <span class="mid">Yes</span>
                    </a>
                    */
                //
                t.fireEvent(document.getElementById("confirmation-button"),'click');
                return;
            }
        }
    },
}

/************************ Sayfa Yenileme Fonksiyonu ************************/
var RefreshEvery  = {
  timer : null,
  PaintTimer : null,
  NextRefresh : 0,
  box : null,
  target : null,
  
  init : function (){
    var t = RefreshEvery;
	t.creatediv();
	if (Options.pbEveryMins < 1)
        Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  creatediv : function(){
    var t = RefreshEvery;
	t.target = document.getElementById('comm_tabs');
	if(t.target == null){
		setTimeout(t.creatediv, 2000);
		return;
	}
	t.box = document.createElement('div');
	t.box.id = 'font11'
	t.target.appendChild(t.box);
  },
  
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf) {
      //t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
      t.NextRefresh = unixTime() + (Options.pbEveryMins*60); 
      t.timer = setTimeout (t.Paint, 1000);
    } else {
        //t.PaintTimer = null;
		t.timer = null;
		t.NextRefresh = 0;
		t.box.innerHTML = '<BR><FONT color=white><B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (' + getServerId() +')</b></font>';
	}
  },
  
  doit : function (){
      actionLog ('Yenilendi: ('+ Options.pbEveryMins +' Zaman Araligi Içinde..)');
    reloadKOC();
  },
  
  setTimer : function (){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (Options.pbEveryMins < 1) Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  Paint : function(){
     var t = RefreshEvery;
	 if(t.timer == null) return;
     now = unixTime();
     var text = '';
     var Left = parseInt(t.NextRefresh - now);
     if ( Left < 0){
		Left = 0;
		t.doit();
	 }
     if ( Left < 60) text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<small><FONT size=1px color=white>Sayfa Yenileme Süresi: </font></small><small><FONT color=red><B>'+ timestr(Left) +'</b></font></small></div>';
     else text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<small><FONT size=1px color=white>Sayfa Yenileme: <B>'+ timestr(Left) +'</b></font><small></div>';
    
	 t.box.innerHTML = text;
     t.timer = setTimeout (t.Paint, 1000);
  },
}
function reloadKOC (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var goto = window.location.protocol+'//apps.facebook.com/globalwarfaregame/?s='+serverId;
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=YENILENIYOR><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}
/************************ Yiyecek Alarmi Fonksiyonu *************************/
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
        row[i] = rp[1] - usage;
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
          var msg = '';
        if (usage < 0) {
    if (Options.pbFoodAlert && timeLeft<(6*3600)) {
                msg += 'Benim Bu Sehirim de ' + Cities.cities[i].name.substring(0,10) + ' (' +
                      Cities.cities[i].x +','+ Cities.cities[i].y + ')';
                msg += ' Yiyecegim Kritik Seviyede.. DIKKAT..!! Bana Yiyecek Gönderin ACIL..!! '+addCommasWhole(foodleft)+' ('+timestrShort(timeLeft)+') Giderim: '+addCommas(usage);
                sendChat ("/a " + msg);
          }
    }
      }
  f.minuteTimer = setTimeout (f.e_eachMinute, 1800000);
  },
}

var RMMotd = {
  init : function() {
    var t = RMMotd;
	t.setEnable (Options.ptrmmotdEnable);
  },
  setEnable : function() {
    var t = RMMotd;
    t.Remove();
  },
  Remove : function() {
  if(Options.ptrmmotdEnable)
  document.getElementById('motd-widget').parentNode.removeChild(document.getElementById('motd-widget'))
  },
}
var WideScreen = {
  chatIsRight : false,
  useWideMap : false,
  rail : null,
  
  init : function (){
    t = WideScreen;
      t.rail = searchDOM (document.getElementById('mod_maparea'), 'node.className=="maparea_rrail"', 10);
	  GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important}');  
      try {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'));
        document.getElementById('gw-promo-main').parentNode.removeChild(document.getElementById('gw-promo-main'));
      } catch (e) {
      }
  },
  setChatOnRight : function (tf){
    t = WideScreen;
    if (tf == t.chatIsRight || !GlobalOptions.pbWideScreen)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom').childNodes[5];
      var chat2 = document.getElementById('kocmain').childNodes[16];
      
	  if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1000);
      chat.style.top = '-548px';
      chat.style.left = '760px';
      chat.style.height = '700px';
      chat.style.width = '350px';
      chat.style.text = 'black';
      chat2.style.top = '65px';
      chat2.style.left = '763px';
      chat2.style.height = '550px';
      chat2.style.width = '316px';
      chat2.style.text = 'black';
      chat.style.background = 'url("'+ CHAT_BG_IMAGE +'")';
      document.getElementById('mod_comm_list1').style.height = '3500px';
      document.getElementById('mod_comm_list1').style.fontSize = 'smaller';
      document.getElementById('mod_comm_list2').style.height = '3500px'; 
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
      document.getElementById('mapwindow').style.width = "1100px";
      document.getElementById('mapwindow').style.zIndex = "0";
  	} else {
      t.rail.style.display = 'block';
      document.getElementById('mapwindow').style.height = "439px";
      document.getElementById('mapwindow').style.width = "800px";
      document.getElementById('mapwindow').style.zIndex = "50";
  	}
  },
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
function DoUnsafeWindow(func, execute_by_embed) {
	//if(this.isChrome || execute_by_embed) {
	//	var scr=document.createElement('script');
	//	scr.innerHTML=func;
	//	document.body.appendChild(scr);
	//} else {
			eval("unsafeWindow."+func);
	//}
}
function dialogRetry (errMsg, seconds, onRetry, onCancel, errCode){
  seconds = parseInt(seconds);
  var pop = new CPopup ('pbretry', 0, 0, 400,200, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>Evren Serdar YARDIM</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>Bilinmeyen Bir Hata Meydana Geldi:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Otomatik Olarak Sayfaniz Yenilenecektir .. <SPAN id=paretrySeconds></b></span> Süre Içinde ...<BR><BR><INPUT id=paretryCancel type=submit value="IPTAL" \>';
  document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
  pop.show(true);
  
  if(errCode && unsafeWindow.g_js_strings.errorcode['err_'+errCode])
	document.getElementById('paretryErrMsg').innerHTML = unsafeWindow.g_js_strings.errorcode['err_'+errCode];
  else
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
/************************ Açilir Pencere Engelle ************************/
var ErrorKiller  = {
  saveFunc : null,
  init : function (tf){
  if (firefoxVersion.substring(0,4) == '4.0b')  // bug in firefox 4.0b10 causes syntax error with: "var func = eval ('function (){}');"
      return;
    ErrorKiller.saveFunc = unsafeWindow.Modal.showModalUEP;
    ErrorKiller.setEnable (tf);
  },
  setEnable : function (tf){
      unsafeWindow.Modal.showModal525 = eval ('function (a,b,c) {actionLog ("Blocked error popup");}');
  },
}
/*******************Sohbet Penceresi*****************/
var ChatPane = {
  init : function(){
    var t = ChatPane;
	setInterval(t.HandleChatPane, 2500);
  },
  setEnable : function(){
    var t = ChatPane;
	t.setEnable (Options.pbahelpenable);
  },
  HandleChatPane : function() {
	var DisplayName = GetDisplayName();
	var GlobalChatBox=document.getElementById('mod_comm_list1');
    if(Options.pbahelpenable) {
	if(GlobalChatBox){
		var chatPosts2 = document.evaluate(".//div[contains(@class,'chatwrap')]", GlobalChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if(chatPosts2) {
			for (var v = 0; v < chatPosts2.snapshotLength; v++) {
                thisPost = chatPosts2.snapshotItem(v);			
				var helpAllianceLinks3=document.evaluate("//*[contains(@onclick,'Building.helpBuild')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ); 
				if(helpAllianceLinks3){
					for (var j = 0; j < helpAllianceLinks3.snapshotLength; j++) {
						thisLink = helpAllianceLinks3.snapshotItem(j);
						thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
					}
				}
				var helpAllianceLinks4=document.evaluate(".//a[contains(@onclick,'Research.helpResearch')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(helpAllianceLinks4){
					for (var j = 0; j < helpAllianceLinks4.snapshotLength; j++) {
						thisLink = helpAllianceLinks4.snapshotItem(j);
						thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
					}	
				}
			}
		}
	}
	var helpAllianceLinks1='';
	var helpAllianceLinks2='';
	var AllianceChatBox=document.getElementById('mod_comm_list2');
	var DisplayName = GetDisplayName();
	if(AllianceChatBox){
	    var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if(chatPosts){
			for (var i = 0; i < chatPosts.snapshotLength; i++) {
				thisPost = chatPosts.snapshotItem(i);
				var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(postAuthor.snapshotItem(0)){
					var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
					if(postAuthorName != DisplayName){
						var helpAllianceLinks1=document.evaluate("//*[contains(@onclick,'Building.helpBuild')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
						var helpAllianceLinks2=document.evaluate("//*[contains(@onclick,'Research.helpResearch')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
						if(helpAllianceLinks1){
	     		     		for (var j = 0; j < helpAllianceLinks1.snapshotLength; j++) {
								thisLink = helpAllianceLinks1.snapshotItem(j);
								var alreadyClicked = thisLink.getAttribute("clicked");
								if(!alreadyClicked){
									thisLink.setAttribute('clicked', 'true');
									var myregexp = /(Building.helpBuild\(.*\);)/;
									var match = myregexp.exec(thisLink.getAttribute("onclick"));
									if (match != null) {
										onclickCode = match[0];				
										if(true){
											DoUnsafeWindow(onclickCode);
											return;
										}
									}
								}
							}
					    }	
						if(helpAllianceLinks2){
				    	    for (var j = 0; j < helpAllianceLinks2.snapshotLength; j++) {
								thisLink = helpAllianceLinks2.snapshotItem(j);
								var alreadyClicked = thisLink.getAttribute("clicked");
								if(!alreadyClicked){
									thisLink.setAttribute('clicked', 'true');
									var myregexp = /(Research.helpResearch\(.*\);)/;
									var match = myregexp.exec(thisLink.getAttribute("onclick"));
									if (match != null) {
										onclickCode = match[0];
										if(true){
											DoUnsafeWindow(onclickCode);
											return;
										}
									}
								}
							}
						}
					}
				}
				// Hide alliance requests in chat
				var helpAllianceLinks5=document.evaluate(".//a[contains(@onclick,'Building.helpBuild')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(helpAllianceLinks5){
					for (var j = 0; j < helpAllianceLinks5.snapshotLength; j++) {
						thisLink = helpAllianceLinks5.snapshotItem(j);
						thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
					}
				}
				var helpAllianceLinks6=document.evaluate(".//a[contains(@onclick,'Research.helpResearch')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(helpAllianceLinks6){
					for (var j = 0; j < helpAllianceLinks6.snapshotLength; j++) {
						thisLink = helpAllianceLinks6.snapshotItem(j);
						thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
					}	
				}

			}	
		}	
	}
	}
 },
}
/************************ Savas Basligi Fonksiyonu ************************/
var CollectWH = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectWH;
    t.lastCollect['c'+ Cities.cities[3].id] = 0;
	t.setEnable (Options.pbWHenable);
  },
  
  setEnable : function (tf){
    var t = CollectWH;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectWH;
	if(!Cities.cities[3]) return;
    var city = Cities.cities[3];
    var since = unixTime() - t.lastCollect['c'+city.id];
    if (since>6*60*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.ajaxCollectWH (city, t.e_ajaxDone);
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectWH;
    if (rslt.ok)
      actionLog ('Yapildi!:'+ rslt.gained.resource2 +' Savas Basligi '+ t.colCityName, true);
    else
      actionLog ('HATA Savas Basligi Yapilamadi.! '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
  },
  
  ajaxCollectWH : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "warheadFactoryEvent.php" + unsafeWindow.g_ajaxsuffix, {
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
/************************ Firlatma Araci Monte Fonksiyonu ************************/
var CollectMC = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectMC;
    t.lastCollect['c'+ Cities.cities[4].id] = 0;
	t.setEnable (Options.pbMCenable);
  },
  
  setEnable : function (tf){
    var t = CollectMC;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectMC;
	if(!Cities.cities[4]) return;
    var city = Cities.cities[4];
    var since = unixTime() - t.lastCollect['c'+city.id];
    if (since>6*60*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.ajaxCollectMC (city, t.e_ajaxDone);
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectMC;
    if (rslt.ok)
      actionLog ('Monte Edilien '+ rslt.gained.resource2 +' Görev Kontrolü '+ t.colCityName, true);
    else
      actionLog ('HATA Monte Edilemedi.! '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
  },
  
  ajaxCollectMC : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "missionControlEvent.php" + unsafeWindow.g_ajaxsuffix, {
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
/************************ Altin Toplama Fonksiyonu ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].id] = 0;
	t.setEnable (Options.pbgoldenable);
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
      if (happy>=Options.pbGoldLimit && since>15*60){
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
      actionLog ('Toplandi'+ rslt.gained.gold +' Altin '+ t.colCityName +' ( '+ t.colHappy +')', true);
    else
      actionLog ('HATA Altin Toplanamadi!: '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
  },
  
  ajaxCollectGold : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "coliseumEvent.php" + unsafeWindow.g_ajaxsuffix, {
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


/************************ Yiyecek Toplama Fonksiyonu ************************/
var CollectFood = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectFood;
    t.lastCollect['c'+ Cities.cities[2].id] = 0;
	t.setEnable (Options.pbfoodenable);
  },
  
  setEnable : function (tf){
    var t = CollectFood;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectFood;
	if(!Cities.cities[2]) return;
    var city = Cities.cities[2];
    var since = unixTime() - t.lastCollect['c'+city.id];
    if (since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.ajaxCollectFood (city, t.e_ajaxDone);
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectFood;
    if (rslt.ok)
      actionLog ('Gida '+ rslt.gained.resource1 +' Toplandi! '+ t.colCityName, true);
    else
      actionLog ('HATA Gida Toplanamadi!:'+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
  },
  
  ajaxCollectFood : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "greenhouseEvent.php" + unsafeWindow.g_ajaxsuffix, {
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
/************************ Petrol Toplama Fonksiyonu ************************/
var CollectOil = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectOil;
    t.lastCollect['c'+ Cities.cities[1].id] = 0;
	t.setEnable (Options.pboilenable);
  },
  
  setEnable : function (tf){
    var t = CollectOil;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectOil;
	if(!Cities.cities[1]) return;
    var city = Cities.cities[1];
    var since = unixTime() - t.lastCollect['c'+city.id];
    if (since>24*60*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.ajaxCollectOil (city, t.e_ajaxDone);
    }
    t.timer = setTimeout (t.tick, 1*60*60*1000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectOil;
    if (rslt.ok)
      actionLog ('Çikarildi '+ rslt.gained.resource2 +' Petrol '+ t.colCityName, true);
    else
      actionLog ('HATA Petrol Çikarilamadi!: '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
  },
  
  ajaxCollectOil : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "petroleumLabEvent.php" + unsafeWindow.g_ajaxsuffix, {
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

/************ Hata Ayiklama *************/
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
          WinLog.write ('<A style="color:black; text-decoration:underline;" TARGET=_tab HREF="'+ scripts[i].src +'">'+ scripts[i].src +'</a>');
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

function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('Options_'+serverID, JSON2.stringify(Options));}, 0);
}

function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  Options.infWinPos = infoPop.getLocation();
  saveOptions();
}

/************  LIB classes/functions .... **************/
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
    actionLog (label +": "+ elapsed/1000);
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
      setTimeout (t.check, 500);
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
  this.getMainDiv = getMainDiv;
  this.getLayer = getLayer;
  this.setLayer = setLayer;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.focusMe = focusMe;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;
  this.autoHeight = autoHeight;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'CPopup ptTabs '+ prefix +'_CPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = '';
  this.div.style.maxHeight = height + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td></tr>\
      <TR><TD height=100% valign=top class="'+ prefix +'_CPopMain" colspan=2><DIV class="CPopMain '+ prefix +'_CPopMain" id="'+ prefix +'_main"></DIV></td></tr></table>';
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
  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
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
    actionLog ("*************** "+ msg +" ****************");
    actionLog ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    actionLog ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    actionLog ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
  }

  function dispEvent (msg, me){
    actionLog (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
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
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function mouseMainTab (me){   // right-click on main button resets window location
  if (me.button == 1){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    mainPop.setLocation ({x: c.width +4, y: 0});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    tabManager.showTab();
    Options.ptWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.ptWinIsOpen = false;
  }
  saveOptions();
}
function eventHideShow2 (){
	GM_log('hideshow2 '+inspect(infoPop.div));
  if (infoPop.toggleHide(infoPop)){
    tabManager2.showTab();
    Options.infWinIsOpen = true;
  } else {
    tabManager2.hideTab();
    Options.infWinIsOpen = false;
  }
  saveOptions();
}
function createButton (label,id){
  var a=document.createElement('a');
  a.className='buttontab2';
  a.id = id;
  a.innerHTML+='<span>'+ label +'</span>';
  a.style.width='78px';
  a.style.height="19px"
  a.style.margin="0 3px 0 3px"
  a.style.padding="0 7px 0 7px"
  a.style.background="transparent url(http://kabam1-a.akamaihd.net/globalwarfaregame/img/gw/modals/button_chrome_header_rpt_nrml.png?v1_38_87) repeat-x center 0"
  //   a.buttontab2>span.mid{margin:0 20px 0 7px;height:25px;padding-left:7px;margin-right:7px;
  return a;
}
function createButton2 (label){
  var a=document.createElement('a');
  a.className='tab buttontab2';
  a.innerHTML='<span class=left></span><span class=right></span>';
  a.innerHTML+='<span class=mid>'+ label +'</span>';
  a.style.width='78px';
  return a;
}
function AddMainTabLink(text, eventListener, mouseListener) {
  var tabs=document.getElementById('kochead');
  if(!tabs) {
    tabs=document.getElementById('gor_menu_bar');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if(!tabs){
	setTimeout(function(){ AddMainTabLink(text, eventListener, mouseListener);}, 200);
  }
  if (tabs) {
    var a = createButton (text,'botbutton');
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
      gmTabs.style.background='#5f8aee';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.style.padding='3px 0 4px 25px';
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
function NewButton() {
  AddSubTabLink('DURUM', eventHideShow2, 'pbinfo');
}
function AddSubTabLink(text, eventListener, id) {
  var a = createButton (text,'botbutton');
  var tabs=document.getElementById('kochead');
  if(!tabs) {
    tabs=document.getElementById('gor_menu_bar');
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
      gmTabs.style.background='#5f8aee';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
	  gmTabs.style.height='20px';
	  gmTabs.style.padding='0 0 0 25px';
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

function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "ptcastleBut ptcastleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "ptcastleBut ptcastleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
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
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.size=2;
    eX.maxLength=10;
    eY.size=2;
    eY.maxLength=3;
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
    m += '<INPUT class="ptcastleBut ptcastleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};

function implodeUrlArgs (obj){
  var a = [];
  for (var k in obj)
    a.push (k +'='+ encodeURI(obj[k]) );
  return a.join ('&');    
}

// NOTE: args can be either a string which will be appended as is to url or an object of name->values
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

// emulate protoype's Ajax.Request ...
function AjaxRequest (url, opts){
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
    for (k in opts.parameters){
	  if(matTypeof(opts.parameters[k]) == 'object')
		for(var h in opts.parameters[k])
			a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
	  else
        a.push (k +'='+ opts.parameters[k] );
	}
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}   


function MyAjaxRequest (url, o, noRetryX){
if (DEBUG_TRACE) actionLog (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }
  function myFailure(){
    var o = {};
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }
  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (window.EmulateAjaxError){
      rslt.ok = false;  
      rslt.error_code=8;
    }
    if (rslt.ok){
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
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

// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  if (aid == Seed.allianceDiplomacies.allianceId)
    return 'ally';
  return 'neutral';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

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
    cityID = 'c'+ Cities.cities[i].id;
    for (k in Seed.outgoing_marches[cityID]){   // each march
      march = Seed.outgoing_marches[cityID][k];
      if ((typeof (march) == 'object') && (march.returnUnixTime < now)){
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

function getTrainInfo (){
  var ret = {};

  ret.trainUnts = [];
  for (i=0; i<13; i++){
    ret.trainUnts[i] = 0;
  }
  
  var q = Seed.training_queue;
  for(i=0; i<Cities.numCities; i++) {   // each city
    cityID = 'c'+ Cities.cities[i].id;
	q = Seed.training_queue[cityID];
	if (q && q.length>0){
	  for (qi=0; qi<q.length; qi++)
          ret.trainUnts[q[qi][1]] += parseInt(q[qi][2]);
	  }
    }
  return ret;
}

var fortNamesShort = {
  53: "Archer Tower",
  52: "Caltrops",
  54: "Logs",
  55: "Trebuchet",
}

// returns {count, maxlevel}
function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i<99; i++){
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
    var m = '<TABLE cellspacing=3 class=ptMainTab><TR>';
    for (var i=0; i<sorter.length; i++) {
      //m += '<TD class=spacer></td><TD align=center class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      m += '<TD class=spacer></td><TD align=center class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      //if (i==8) m+='</tr><TR>';
    }
    m+='</tr></table>';  
    //m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab = t.tabList[k] ;
      document.getElementById('pttc'+ k).addEventListener('click', this.e_clickedTab, false);
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
    t.setTabStyle (document.getElementById ('pttc'+ t.currentTab.name), true);
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
      t.setTabStyle (document.getElementById ('pttc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pttc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}
var tabManager2 = {
  tabList : {},           // {name, obj, div}
  currentTab2 : null,
  
  init : function (mainDiv){
    var t = tabManager2;
    var sorter = [];
    for (k in Tabs2){
      if (!Tabs2[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs2[k];
        if (Tabs2[k].tabLabel != null)
          t.tabList[k].label = Tabs2[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs2[k].tabOrder != null)
          sorter.push([Tabs2[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        t.tabList[k].div = document.createElement('div');
      }
    }

	sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<TABLE cellspacing=3 class=infMainTab><TR>';
    for (var i=0; i<sorter.length; i++) {
      //m += '<TD class=spacer></td><TD align=center class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      m += '<TD class=spacer></td><TD align=center class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      //if (i==8) m+='</tr><TR>';
    }
    m+='</tr></table>';  
    //m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    infoPop.getTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab2)
        t.currentTab2 = t.tabList[k] ;
      document.getElementById('pttc'+ k).addEventListener('click', this.e_clickedTab, false);
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
    
    if (t.currentTab2 == null)
      t.currentTab2 = sorter[0][1];    
    t.setTabStyle (document.getElementById ('pttc'+ t.currentTab2.name), true);
    t.currentTab2.div.style.display = 'block';
  },
  
  hideTab : function (){
    var t = tabManager2;
    t.currentTab2.obj.hide();
  },
  
  showTab : function (){
    var t = tabManager2;
    t.currentTab2.obj.show();
  },
    
  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager2;
    newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab2.name != newTab.name){
      t.setTabStyle (document.getElementById ('pttc'+ t.currentTab2.name), false);
      t.setTabStyle (document.getElementById ('pttc'+ newTab.name), true);
      t.currentTab2.obj.hide ();
      t.currentTab2.div.style.display = 'none';
      t.currentTab2 = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab2 = newTab.name;      
    }
    newTab.obj.show();
  },
}
function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.ptWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.ptWinIsOpen = true;
  saveOptions();
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

function matTypeof (v){
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
function htmlSelector (valNameObj, curVal, tags){
  m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (k in valNameObj){
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

/********
 Xd Xh
 Xh Xm
 Xm Xs
 Xs
********/
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
function CdialogConfirm (msg, canNotify, contNotify, centerElement){
  var pop = new CPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>EvrenSerdar</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD colspan=2>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=pbok type=submit value="TAMAM" \> &nbsp; &nbsp; </td><TD><INPUT id=pbcancel type=submit value="IPTAL" \> &nbsp; &nbsp; </td></tr></table>';
  document.getElementById('pbok').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify(this);}, false);
  document.getElementById('pbcancel').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify(this);}, false);
  pop.show(true);
}
/**********************
 part       full
 Xd Xh Xm   Xd Xh Xm Xs
 Xh Xm      Xh Xm Xs
 Xm Xs      Xm Xs
 Xs         Xs
**********************/
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
}
/************  LIB singletons .... **************/
// TODO: fix REopening window
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
// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window
      //t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
	  t.win = new CPopup('ptwinlog', 0, 0, 500, 800, true, function(){t.win.destroy(); t.win=null; t.win.closed=true;});
	  t.win.show(true);
t.isOpening = false; 
t.state = null; 
    }
    
    if (t.state == null){
      t.win.getMainDiv().innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; overflow-x:auto; max-height:800px; width:600px"></div></body>';
      document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  document.getElementById('wlOut');
      t.lastE = null;
      t.state = 1;
    }
  },

  writeText : function (msg){
    WinLog.write (msg.htmlEntities()); 
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

ptStartup();


function MyAjaxRequest2 (url, o, noRetry){
if (DEBUG_TRACE) actionLog (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

if (DEBUG_TRACE) actionLog (" 1a myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }

  function myFailure(){
    var o = {};
if (DEBUG_TRACE) actionLog ("myAjaxRequest.myFailure(): "+ inspect(rslt, 1, 1));
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (rslt.ok){
if (DEBUG_TRACE) actionLog (" 1b myAjaxRequest.mySuccess(): "+ inspect(rslt, 1, 1));
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
if (DEBUG_TRACE) actionLog (" 1b myAjaxRequest.mySuccess() !ok : "+ inspect(rslt, 3, 1));
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
/********************************Global Options *******************************/
function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
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
function readChatOptions (){
  var serverID = getServerId();
  s = GM_getValue ('ChatOptions_'+serverID, '[]');
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          ChatOptions[k][kk] = opts[k][kk];
      else
        ChatOptions[k] = opts[k];
    }
  }
}
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
  this.div.className = classPrefix +'Cont';
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
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}


function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
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
function getMarchInfo (cityID){
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
function findoptvalue (y){
        var unit2 = y.substring(1)
		var unit3 = 'unt' + unit2
  return unit3;
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

function strButton20 (label, tags){
  if (tags == null)
    tags = '';
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}
function updatebotbutton(text, id)
{
	var but=document.getElementById(id);
	but.innerHTML = '<span style="color: #ff6">'+text+'</span>';
}

var CHAT_BG_IMAGE = 'http://img163.imageshack.us/img163/7404/serdarp.png';
var FOOD_IMAGE = 'http://i.imgur.com/NCa7F.gif';
var OIL_IMAGE = 'http://i.imgur.com/hAa2O.gif';
var STONE_IMAGE = 'http://i.imgur.com/HBcYW.gif';
var STEEL_IMAGE = 'http://i.imgur.com/wkoeb.gif';
var GRAPH_IMAGE = 'http://i.imgur.com/NGWbv.gif';
var TITA_IMAGE = 'http://i.imgur.com/lDIaU.gif';
var GOLD_IMAGE ='http://i.imgur.com/Jw6Hg.gif';


// ==UserScript==
// @name           EvrenSerdar
// @namespace      EvrenSerdar
// @version        EvrenSerdar v5
// @description    Global Warfare Oyunu Yardimci Araçlar Programi
// @include        *.globalwarfaregame.com/*main_src.php*
// @include        *.globalwarfaregame.com/*main_src.php*
// @include        *apps.facebook.com/globalwarfaregame/*
// @include        *apps.facebook.com/globalwarfaregame/*
// @email	   evrenser@hotmail.com
// @license	   GNU GPL
// @icon           http://i51.tinypic.com/2evdmd0.jpg
// ==/UserScript==


(function(){
unsafeWindow.AutoBuilder = {
    Init: function () {
        for(var i = 1; i <= this.NumCity; i++)
        {
            this.City[i] = [];
            for(var j = 0; j < 200; j++)
                this.City[i][j] = {level:10,type:0};    
            
            this.BuildBool[i] = [];
            for(var j = 0; j <= 23; j++)
                this.BuildBool[i][j] = false;
            
            this.RsrchBool[i] = [];
            for(var j = 0; j <= 16; j++)
                this.RsrchBool[i][j] = false;
            
            this.TrainBool[i] = 1;
            this.TrainNum[i] = 100;
            this.DfnceBool[i] = 52;
            this.DfnceNum[i] = 100;
        }
        
        setTimeout("AutoBuilder.CreateInterface();",10000);
        setInterval("AutoBuilder.CorrectOptions()",2000);
    },
    
    
    CorrectOptions: function () {
        arStrings = unsafeWindow.arStrings;
        Modal = unsafeWindow.Modal;
        changeview_fields = unsafeWindow.changeview_fields;
        citysel_click = unsafeWindow.citysel_click;
        Building = unsafeWindow.Building;
        Barracks = unsafeWindow.Barracks;
        Walls = unsafeWindow.Walls;
        March = unsafeWindow.March;
        Research = unsafeWindow.Research;
        Coliseum = unsafeWindow.Coliseum;
        Greenhouse = unsafeWindow.Greenhouse;
        currentcityid = unsafeWindow.currentcityid;
        seed = unsafeWindow.seed;
        
        
        var cty = this.GetCurrentCity();
        try{
            for(var j = 0; j <= 23; j++)
                document.getElementById('chk' + j).checked = this.BuildBool[cty][j];
            for(var j = 1; j <= 16; j++)
                if(j!=7)
                    document.getElementById('chkr' + j).checked = this.RsrchBool[cty][j];
            
            document.getElementById('chka' + this.TrainBool[cty]).checked = true;
            if(this.TrainNum[cty] == -1)
            {
                document.getElementById('chkMAX').checked = true;
                document.getElementById('chkaNum').disabled = true;
            }
            else
            {
                document.getElementById('chkaNum').value = this.TrainNum[cty];
                document.getElementById('chkMAX').checked = false;
                document.getElementById('chkaNum').disabled = false;
            }
            
            document.getElementById('chkd' + this.DfnceBool[cty]).checked = true;
            if(this.DfnceNum[cty] == -1)
            {
                document.getElementById('chkdMAX').checked = true;
                document.getElementById('dfnceNum').disabled = true;
            }
            else
            {
                document.getElementById('dfnceNum').value = this.DfnceNum[cty];
                document.getElementById('chkdMAX').checked = false;
                document.getElementById('dfnceNum').disabled = false;
            } 
        }catch(e){}
    },
    
    BuildTimer: [],
    RsrchTimer: [],
MarchTimer: [],
    TrainTimer: [],
    DfnceTimer: [],
    
    City: [],
    BuildBool: [],
    RsrchBool: [],
    TrainBool: [],
    TrainNum: [],
    DfnceBool: [],
    DfnceNum: [],
 SendIt: false,

     BookMarkPlace: 6,
    NumCity: 5,
    
    STRTIME: ["","INSAAT","ARASTR","EGIT","SUR","ILERLE"],
     STRTYPEPOS: [,"0px 0px",,,"-35px 0px","-70px 0px","-105px 0px","-140px 0px","-210px 0px","-175px 0px","-280px 0px","-315px 0px",
              "0px -35px","-35px -35px",,,"-245px 0px","-245px -35px","-210px -35px", "-280px -35px"],
    
    SendStuff: function(evt) {
        var evt  = (evt) ? evt : ((event) ? event : null);
        if (evt.keyCode == 96)
        {            
            if (AutoBuilder.SendIt == false)
                AutoBuilder.SendIt = true;
            else
                AutoBuilder.SendIt = false;
            console.log("Send It = " + AutoBuilder.SendIt);
        }
    },
    
    ClearFB: function() {
        try{
            document.getElementsByClassName("fb_dialog_close_icon")[0].click();
            Modal.hideModalAll();
        }catch(e){}   
    },
    CreateInterface: function () {
        if(!document.getElementById('citysel_3'))
            if(!document.getElementById('citysel_2'))
                this.NumCity = 1;
            else
                this.NumCity = 2;
        
        var hackDiv = this.MakeOptDiv();
        hackDiv.setAttribute('id', 'hack');
        hackDiv.style.height = '58px';
        hackDiv.style.width = '240px';
        hackDiv.style.left = '495px';
        hackDiv.style.fontSize = '8px';
        document.getElementById("mainbody").appendChild(hackDiv);
        this.UpdateDiv("Basliyor....Hazir",1);
        
        var optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'optDiv');
        optDiv.style.width = '168px';
        optDiv.style.borderColor='#000 #ffffff #000 #000';
        document.getElementById("mainbody").appendChild(optDiv);
        optDiv.appendChild(this.CreateButtons(1));
        optDiv.innerHTML += "<br>";
        
        for(var i = 0; i <= 23; i++)
        {
            var opt = document.createElement('input');
            opt.setAttribute('type', 'checkbox');
            opt.setAttribute('id', 'chk' + i);
            opt.setAttribute('onclick', 'AutoBuilder.BuildBool[AutoBuilder.GetCurrentCity()][' + i + '] = this.checked;');
            optDiv.appendChild(opt);
            optDiv.innerHTML += (arStrings.buildingName["b" + i] + '<br>');
        }
        optDiv.scrollTop = 0;
        for(var i = 1; i <= this.NumCity; i++)
            for(var j = 0; j <= 23; j++)
                document.getElementById('chk' + j).checked = this.BuildBool[i][j];
        
        
        optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'sciDiv');
        optDiv.style.left = '169px';
        optDiv.style.width = '165px';
        document.getElementById("mainbody").appendChild(optDiv);
        optDiv.appendChild(this.CreateButtons(2));
        optDiv.innerHTML += "<br>";
        
        for(var i = 1; i <= 16; i++)
        {
            if(i!=7)
            {
                var opt = document.createElement('input');
                opt.setAttribute('type', 'checkbox');
                opt.setAttribute('id', 'chkr' + i);
                opt.setAttribute('onclick', 'AutoBuilder.RsrchBool[AutoBuilder.GetCurrentCity()][' + i + '] = this.checked;');
                optDiv.appendChild(opt);
                optDiv.innerHTML += (arStrings.techName["t" + i] + '<br>');
            }
        }
        optDiv.scrollTop = 0;
        for(var i = 1; i <= this.NumCity; i++)
            for(var j = 1; j <= 16; j++)
                if(j!=7)
                    document.getElementById('chkr' + j).checked = this.RsrchBool[i][j];
        
        
        optDiv = this.MakeOptDiv();
optDiv.setAttribute('id', 'marchDiv');
        optDiv.setAttribute('id', 'trainDiv');
        optDiv.style.left = '331px';
        document.getElementById("mainbody").appendChild(optDiv);
        optDiv.appendChild(this.CreateButtons(3));
        optDiv.innerHTML += "<br>";
        
        var opt = document.createElement('input');
        opt.setAttribute('type', 'number');
opt.setAttribute('id', 'marchBM');
        opt.setAttribute('min', 0);
        opt.setAttribute('step', 100);
        opt.setAttribute('id', 'chkaNum');
        opt.setAttribute('value', 100);
        opt.setAttribute('onKeyUp', 'AutoBuilder.TrainNum[AutoBuilder.GetCurrentCity()] = this.value;');
        opt.style.width = '100px';
        opt.style.marginLeft = '5px';
        opt.style.backgroundColor = 'black';
        opt.style.border='1px solid #ffffff';
        opt.style.color='#eee';
        optDiv.appendChild(opt);
        opt = document.createElement('input');
        opt.setAttribute('type', 'checkbox');
        opt.setAttribute('id', 'chkMAX');
        opt.setAttribute('onclick', 'document.getElementById("chkaNum").disabled = this.checked; if(this.checked){AutoBuilder.TrainNum[AutoBuilder.GetCurrentCity()] = -1;}else{AutoBuilder.TrainNum[AutoBuilder.GetCurrentCity()] = document.getElementById("chkaNum").value;}');
        opt.style.marginLeft = '5px';
        optDiv.appendChild(opt);
        optDiv.innerHTML += 'max<br>';
        for(var i = 1; i <= 19; i++)
        {
            if(i!=2 && i!=3 && i!=14 && i!=15)
            {
                opt = document.createElement('input');
                opt.setAttribute('type', 'radio');
                opt.setAttribute('name', 'troop');
                opt.setAttribute('id', 'chka' + i);
                opt.setAttribute('onclick', 'AutoBuilder.TrainBool[AutoBuilder.GetCurrentCity()] = ' + i + ';');
                optDiv.appendChild(opt);
                optDiv.innerHTML += (arStrings.unitName["u" + i] + '<br>');
            }
        }
        optDiv.scrollTop = 0;
        document.getElementById('chka1').checked = true;
        
        optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'dfnceDiv');
        optDiv.style.top = '30px';
        optDiv.style.left = '331px';
        document.getElementById("mainbody").appendChild(optDiv);
        optDiv.appendChild(this.CreateButtons(4));
        optDiv.innerHTML += "<br>";
        
        opt = document.createElement('input');
        opt.setAttribute('type', 'number');
        opt.setAttribute('min', 0);
        opt.setAttribute('step', 100);
        opt.setAttribute('id', 'dfnceNum');
        opt.setAttribute('value', 100);
        opt.setAttribute('onKeyUp', 'AutoBuilder.DfnceNum[AutoBuilder.GetCurrentCity()] = this.value;');
        opt.style.width = '100px';
        opt.style.marginLeft = '5px';
        opt.style.backgroundColor = 'black';
        opt.style.border='1px solid #ffffff';
        opt.style.color='#eee';
        optDiv.appendChild(opt);
        opt = document.createElement('input');
        opt.setAttribute('type', 'checkbox');
        opt.setAttribute('id', 'chkdMAX');
        opt.setAttribute('onclick', 'document.getElementById("dfnceNum").disabled = this.checked; if(this.checked){AutoBuilder.DfnceNum[AutoBuilder.GetCurrentCity()] = -1;}else{AutoBuilder.DfnceNum[AutoBuilder.GetCurrentCity()] = document.getElementById("dfnceNum").value;}');
        opt.style.marginLeft = '5px';
        optDiv.appendChild(opt);
        optDiv.innerHTML += 'max<br>';
        for(var i = 52; i <= 55; i++)
        {
            opt = document.createElement('input');
            opt.setAttribute('type', 'radio');
            opt.setAttribute('name', 'dfnc');
            opt.setAttribute('id', 'chkd' + i);
            opt.setAttribute('onclick', 'AutoBuilder.DfnceBool[AutoBuilder.GetCurrentCity()] = ' + i + ';');
            optDiv.appendChild(opt);
            optDiv.innerHTML += (arStrings.fortName["f" + i] + '<br>');
        }
        optDiv.scrollTop = 0;
        document.getElementById('chkd52').checked = true;

        optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'marchDiv');
        optDiv.style.zIndex = '999999';
        optDiv.style.top = '30px';
        optDiv.style.left = '169px';
        document.getElementById("mainbody").appendChild(optDiv);
        optDiv.appendChild(this.CreateButtons(5));
        optDiv.innerHTML += "<br>";
        
        optDiv.innerHTML += "&nbsp;Sehr:";
        opt = document.createElement('input');
        opt.setAttribute('id', 'marchBM');
        opt.setAttribute('type', 'number');
        opt.setAttribute('value', 5);
        opt.style.width = '40px';
        opt.setAttribute('onKeyUp', 'AutoBuilder.BookMarkPlace = this.value;');
        optDiv.appendChild(opt);
        optDiv.innerHTML += "<br>";
        
        var n = 2
        for(var i = 1; i <= 19; i++)
        {
            if(i!=2 && i!=3 && i!=14 && i!=15)
            {
                opt = document.createElement('div');
                opt.style.height = '35px';
                opt.style.width ='35px';
                opt.style.position = 'relative';
                if(n>2)
                    opt.style.top = (Math.floor((n-2)/2)*-61) + 'px';
                if(n%2)
                    opt.style.left = '90px';
                else
                    opt.style.left = '10px';
                
                opt.style.background  = "transparent url('/img/gw/icons/icon_troops_sprite01_35.png') no-repeat " + this.STRTYPEPOS[i];
                optDiv.appendChild(opt);   
                opt = document.createElement('input');
                opt.setAttribute('id', 'troopNum'+i);
                opt.setAttribute('type', 'number');
                opt.setAttribute('min', 0);
                opt.setAttribute('step', 1000);
                opt.setAttribute('value', 0);
                opt.setAttribute('onclick', '');
                opt.style.width = '50px';
                opt.style.position = 'relative';
                if(n>2)
                    opt.style.top = (Math.floor((n-2)/2)*-61) + 'px';
                if(n%2)
                    opt.style.left = '90px';
                else
                    opt.style.left = '10px';
                
                optDiv.appendChild(opt);
                n++;
            }
        }
        try{
            Resource.DailyReward.claim();
            Resource.DailyReward.claim();
            FortunasGamble.chooseMmbCard(2);
            FortunasGamble.chooseMmbCard(2);
            Modal.hideModalAll();
            setTimeout("Modal.hideModalAll();",4000);
        }catch(e){}
    },
    CreateButtons: function (actionType) {
        var buttonDiv = document.createElement('div');
        buttonDiv.style.height = '24px';
        buttonDiv.style.width = '113px';
        buttonDiv.style.top = '2px';
        buttonDiv.style.left = '2px';
        buttonDiv.style.position = 'relative';
        buttonDiv.style.backgroundColor = '#000';
        
        var labl = document.createElement('div');
        labl.style.height = '24px';
        labl.style.width = '65px';
        labl.style.top = '-9px';
        labl.style.position = 'relative';
        labl.style.display = 'inline-block';
        labl.style.textAlign = 'center';
        labl.style.fontWeight = '900';
        labl.style.fontSize = '18px';
        labl.style.backgroundColor = '#000';
        labl.style.webkitUserSelect = "none";
        labl.style.MozUserSelect = "none";
        labl.innerHTML = this.STRTIME[actionType];
        
        var butGo = this.MakeButton();
        butGo.style.background = "transparent url('/img/gw/buttons/button_modal_base_max_24.jpg') no-repeat -48px 0";
        butGo.setAttribute('onClick', 'AutoBuilder.Stop(false,' + actionType + ');');
        
        var butSp = this.MakeButton();
        butSp.style.background = "transparent url('/img/gw/buttons/button_modal_base_max_24.jpg') no-repeat -72px 0";
        butSp.style.webkitTransform = "rotate(180deg)";
        butSp.style.MozTransform = "rotate(180deg)";
        butSp.setAttribute('onClick', 'AutoBuilder.Stop(true,' + actionType + ');');
        
        if(actionType ==1)
        {
            buttonDiv.style.width = '161px';
            
            var butOp = this.MakeButton();
            butOp.style.background = "transparent url('/img/gw/buttons/button_modal_base_max_24.jpg') no-repeat -24px 0";
            butOp.style.webkitTransform = "rotate(90deg)";
            butOp.style.MozTransform = "rotate(90deg)";
            butOp.setAttribute('onClick', 'AutoBuilder.OpenOptions();');
            buttonDiv.appendChild(butOp);
            
            var butGp = this.MakeButton();
            butGp.style.background = "transparent url('/img/gw/buttons/button_modal_base_max_24.jpg') no-repeat 0 0";
            butGp.setAttribute('onClick', 'AutoBuilder.CollectInt();');
            buttonDiv.appendChild(butGp);
        }
        else
            buttonDiv.style.left = '26px';
        buttonDiv.appendChild(labl);
        buttonDiv.appendChild(butGo);
        buttonDiv.appendChild(butSp);
        
        return buttonDiv;
    },
    MakeOptDiv: function () {
        var optDiv = document.createElement('div');
        optDiv.style.height = '28px';
        optDiv.style.width = '160px';
        optDiv.style.top = '0px';
        optDiv.style.left = '0px';
        optDiv.style.position = 'absolute';
        optDiv.style.backgroundColor = 'black';
        optDiv.style.opacity = 0.85;
        optDiv.style.color = '#ffffff';
        optDiv.style.fontFamily = 'monospace'; 
        optDiv.style.fontSize = '12px';
        optDiv.style.textTransform = 'uppercase';
        optDiv.style.zIndex = "9999";
        optDiv.style.overflow = 'hidden';
        optDiv.style.border='2px solid #000';
        optDiv.style.borderColor='#000 #000 #000 #ffffff';
        optDiv.style.webkitUserSelect = 'none';
        optDiv.style.MozUserSelect = "none";
        return optDiv;
    },
    MakeButton: function () {
        var but = document.createElement('a');
        but.style.height = '25px';
        but.style.width = '24px';
        but.style.top = '0px';
        but.style.left = '0px';
        but.style.padding = '0px';
        but.style.display = 'inline-block';
        but.style.position = 'relative';
        but.setAttribute('onMouseOver', 'this.style.backgroundPosition = this.style.backgroundPosition.split(" ")[0] + " -48px";');
        but.setAttribute('onMouseOut', 'this.style.backgroundPosition = this.style.backgroundPosition.split(" ")[0] + " 0px";');
        but.setAttribute('onMouseDown', 'this.style.backgroundPosition = this.style.backgroundPosition.split(" ")[0] + " -24px";');
        but.setAttribute('onMouseUp', 'this.style.backgroundPosition = this.style.backgroundPosition.split(" ")[0] + " -48px";');
        return but;
    },
    OpenOptions: function () {
        try{
        unsafeWindow.update_seed_ajax(true);
        unsafeWindow.Bookmark.open();
        var book = document.getElementById('bookmarksBox').style;
        book.overflowY='scroll';
        book.overflowX='hidden';
        book.height='200px';
        }catch(e){}
        if(parseInt(document.getElementById('optDiv').style.height) < 400)
        {
            document.getElementById('optDiv').style.height = '500px';
            document.getElementById('sciDiv').style.height = '350px';
            document.getElementById('trainDiv').style.height = '350px';
            document.getElementById('dfnceDiv').style.top = '339px';
            document.getElementById('dfnceDiv').style.height = '135px';
            document.getElementById('marchDiv').style.top = '339px';
            document.getElementById('marchDiv').style.height = '550px';
        }
        else
        {
            document.getElementById('optDiv').style.height = '28px';
            document.getElementById('sciDiv').style.height = '28px';
            document.getElementById('trainDiv').style.height = '28px';
            document.getElementById('dfnceDiv').style.top = '30px';
            document.getElementById('dfnceDiv').style.height = '28px';
            document.getElementById('marchDiv').style.top = '30px';
            document.getElementById('marchDiv').style.height = '28px';
        } 
    },
    UpdateDiv: function(a,cty) {
        var hackDiv = document.getElementById("hack");
        hackDiv.innerHTML = hackDiv.innerHTML + cty + ":" + a + "<br>";
        hackDiv.scrollTop = hackDiv.scrollHeight;
    },
    DisplayTime: function(a) {
        var currentTime = new Date ( );
        currentTime.setTime( currentTime.getTime() + a*1000 );
        var currentHours = currentTime.getHours ();
        var currentMinutes = currentTime.getMinutes ();
        var currentSeconds = currentTime.getSeconds ();
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
        currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
        var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
        currentHours = ( currentHours == 0 ) ? 12 : currentHours;
        var rtrn = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
        return (rtrn);
    },  
    SwitchTo: function(a) {
        citysel_click(document.getElementById('citysel_' + a)); 
        citysel_click(document.getElementById('citysel_' + a)); 
        citysel_click(document.getElementById('citysel_' + a)); 
        citysel_click(document.getElementById('citysel_' + a)); 
        citysel_click(document.getElementById('citysel_' + a)); 
        citysel_click(document.getElementById('citysel_' + a));      
         
    },
   
    GetCurrentCity: function() {
        for(var i = 1; i <= this.NumCity; i++)
            try{
                if(document.getElementById('citysel_' + i).className.search('unselected') < 0)
                    return i;
            }catch(e){}
        return 'ERROR';
    },
    Collect: function (cty) {
        this.SwitchTo(cty);
        setTimeout("Coliseum.openEvent(1);",1000);
        if(cty==3)
             setTimeout("Greenhouse.openEvent(1);",3000);
        setTimeout("Modal.hideModalAll();",4000);
        this.UpdateDiv("Altin Toplaniyor...",cty);
    },
        SendFarm: function (cty) {
        this.SwitchTo(cty);
        Modal.hideModalAll();
        setTimeout("AutoBuilder.FarmIt();",10);
        this.UpdateDiv("Gida Toplaniyor...",cty);
    },
         FarmIt: function () {
        if(!document.getElementById('march_content'))
        {
            //trans:1 reinfce:2 reass:5 atk:4
            try{March.open(1,0,0)}catch(e){};
            setTimeout("AutoBuilder.FarmIt();",500);
        }
        else
        {            
            if(seed.player.name == "BagMaster")
                document.getElementById('marchBM').value = 54;
            else
                console.log(seed.player.name);
            if(currentcityinfo[1] == "SuckaTown")
            {
                var ind;
                if(Math.random() < 0.5)
                    ind = 0;
                else
                    ind = 1;
                try{                
                    March.maxTroop(9);
                    document.getElementById('modal_attack_unit_ipt_9').value /= 2;
                }catch(e){}
                try{ 
                    March.maxTroop(19);
                    document.getElementById('modal_attack_unit_ipt_19').value /= 2;
                }catch(e){}
                March.maxResource(1);
                document.getElementById('modal_attack_resource_1').value /= 2;
                March.checkResourceInput(document.getElementById('modal_attack_resource_1'));
                document.getElementById('bookmarkDropdown')[ind+1].selected = 1;
                March.selectAttackBookmark(document.getElementById('bookmarkDropdown'));
                March.check('normal');
            }
            else
            {
                try{
                    March.maxTroop(9);
                }catch(e){}
                try{
                    March.maxTroop(19);
                }catch(e){}
                //March.maxResource(1);
                
                for(var i = 0; i <= 6; i++)
                {
                    March.maxResource(i);
                    if (i==1)
                    {
                        document.getElementById('modal_attack_resource_1').value -= 100000;
                        if(document.getElementById('modal_attack_resource_1').value < 0)
                            document.getElementById('modal_attack_resource_1').value = 0;
                    }
                    March.checkResourceInput(document.getElementById('modal_attack_resource_'+i));
                }
                document.getElementById('bookmarkDropdown')[parseInt(document.getElementById('marchBM').value)].selected = 1;
                March.selectAttackBookmark(document.getElementById('bookmarkDropdown'));
                March.check('normal');
            }       
        }
    },
    CollectInt: function () {
        for(var i = 1; i <= this.NumCity; i++)
        {
            setTimeout("AutoBuilder.Collect(" + i + ");",(i - 1)*4000);
        }
        setTimeout("AutoBuilder.CollectInt();", 8000000);
    },
    Build: function(cty) {
        Modal.hideModalAll();
        if(document.getElementById('citysel_' + cty).className.search('unselected') >= 0)
        {
                this.SwitchTo(cty);
                clearTimeout(this.BuildTimer[cty]);
                this.BuildTimer[cty] = setTimeout("AutoBuilder.Build(" + cty + ");",2000);
        }
        else
        {
            if(Building.Queue.first() != null)
            {
                setTimeout("AutoBuilder.UpdateDiv('Insaati Yapilan: ' + AutoBuilder.DisplayTime(Building.Queue.first().timeRemaining)," + cty + "); Modal.hideModalAll();",2000);
                clearTimeout(this.BuildTimer[cty]);
                this.BuildTimer[cty] = setTimeout("AutoBuilder.Build(" + cty + ")",Building.Queue.first().timeRemaining*1000+10000*Math.random());
            }
            else
            {
                var minT = 1;
                var minL = 10;
                var minS = 0;
                this.GetCity(cty);
                for(var slt = 0; slt < 200; slt++)
                {
                    var tmpT = this.City[cty][slt].type;
                    var tmpL = this.City[cty][slt].level;
                    if(tmpL < minL && this.BuildBool[cty][tmpT])
                    {
                        minL = tmpL;
                        minT = tmpT;
                        minS = slt;
                    }
                }
                if(minL >= 9)
                {
                    clearTimeout(this.BuildTimer[cty]);
                    this.UpdateDiv("building disabled.",cty);
                    return;
                }
                this.UpdateDiv(arStrings.buildingName["b" + minT] + " Seviye " + minL + " at " + minS,cty);
                Building.buildCheck(minT,minL,minS);
                this.City[cty][minS].level++
                
                clearTimeout(this.BuildTimer[cty]);
                this.BuildTimer[cty] = setTimeout("AutoBuilder.Build(" + cty + ");",2000);
            }
        }
    },
    Resrch: function(cty) {
        Modal.hideModalAll();
        if(document.getElementById('citysel_' + cty).className.search('unselected') >= 0)
        {
            this.SwitchTo(cty);
            clearTimeout(this.RsrchTimer[cty]);
            this.RsrchTimer[cty] = setTimeout("AutoBuilder.Resrch(" + cty + ");",2000);
        }
        else
        {
            if(Research.Queue.first() != null)
            {
                setTimeout("AutoBuilder.UpdateDiv('Arastirmasi Yapilan: ' + AutoBuilder.DisplayTime(Research.Queue.first().timeRemaining)," + cty + "); Modal.hideModalAll();",2000);
                clearTimeout(this.RsrchTimer[cty]);
                this.RsrchTimer[cty] = setTimeout("AutoBuilder.Resrch(" + cty + ")",Research.Queue.first().timeRemaining*1000+10000*Math.random());
            }
            else
            {
                for(var i = 1; i <= 16; i++)
                {
                    try{
                        var c = parseInt(seed.tech["tch" + i]);
                        var j = Research.checkreq(i, c + 1);
                        var n = (j[3].indexOf(0) < 0);
                        if(n && this.RsrchBool[cty][i])
                        {
                            Research.upgrade(i,c+1);
                            this.UpdateDiv(arStrings.techName["t" + i] + " Level " + (c + 1),cty);
                            setTimeout("AutoBuilder.ClearFB();",3000);
                            break;
                        }
                    }catch(e){}  
                }
                
                clearTimeout(this.RsrchTimer[cty]);
                this.RsrchTimer[cty] = setTimeout("AutoBuilder.Resrch(" + cty + ");",2000);
            }
        }
    },
    Train: function(cty) {
        Modal.hideModalAll();
        if(document.getElementById('citysel_' + cty).className.search('unselected') >= 0)
        {
            this.SwitchTo(cty);
            clearTimeout(this.TrainTimer[cty]);
            this.TrainTimer[cty] = setTimeout("AutoBuilder.Train(" + cty + ");",2000);
        }
        else
        {
            if(Barracks.Queue.activeSlots().first() != null)
            {
                setTimeout("AutoBuilder.UpdateDiv('Egitimi Yapilan: ' + AutoBuilder.DisplayTime(Barracks.Queue.timeRemaining())," + cty + "); Modal.hideModalAll();",2000);
                clearTimeout(this.TrainTimer[cty]);
                this.TrainTimer[cty] = setTimeout("AutoBuilder.Train(" + cty + ")",Barracks.Queue.timeRemaining()*1000+10000*Math.random());
            }
            else
            {
                for(var i = 1; i <= 19; i++)
                {
                    try{
                        if(this.TrainBool[cty] == i)
                        {
                            if(this.TrainNum[cty] == -1)
                                Barracks.trainUnit(i, Barracks.trainMax(i), 0);
                            else
                                Barracks.trainUnit(i, this.TrainNum[cty], 0);
                        }
                    }catch(e){}  
                }
                
                clearTimeout(this.TrainTimer[cty]);
                this.TrainTimer[cty] = setTimeout("AutoBuilder.Train(" + cty + ");",2000);
            }
        }
    },
    Dfnce: function(cty) {
        Modal.hideModalAll();
        if(document.getElementById('citysel_' + cty).className.search('unselected') >= 0)
        {
            this.SwitchTo(cty);
            clearTimeout(this.DfnceTimer[cty]);
            this.DfnceTimer[cty] = setTimeout("AutoBuilder.Dfnce(" + cty + ");",2000);
        }
        else
        {
            if(Walls.Queue.activeSlots().first() != null)
            {
                setTimeout("AutoBuilder.UpdateDiv('Savunma Durumu: ' + AutoBuilder.DisplayTime(Walls.Queue.timeRemaining())," + cty + "); Modal.hideModalAll();",2000);
                clearTimeout(this.DfnceTimer[cty]);
                this.DfnceTimer[cty] = setTimeout("AutoBuilder.Dfnce(" + cty + ")",Walls.Queue.timeRemaining()*1000+10000*Math.random());
            }
            else
            {
                for(var i = 52; i <= 55; i++)
                {
                    try{
                        if(this.DfnceBool[cty] == i)
                        {
                            if(this.DfnceNum[cty] == -1)
                                Walls.trainDefense(i, Walls.trainMax(i), 0);
                            else
                                Walls.trainDefense(i, AutoBuilder.DfnceNum[cty], 0);
                        }
                    }catch(e){}  
                }
                
                clearTimeout(this.DfnceTimer[cty]);
                this.DfnceTimer[cty] = setTimeout("AutoBuilder.Dfnce(" + cty + ");",2000);
            }
        }
    },
   March: function (cty,forceWait) {
        if(forceWait = undefined)
            forceWait = false;
        if(!document.getElementById('march_content'))
        {
            Modal.hideModalAll();
            //trans:1 reinfce:2 reass:5 atk:4
            March.open(4);
            clearTimeout(this.MarchTimer[cty]);
            this.MarchTimer[cty] = setTimeout("AutoBuilder.March(" + cty + ");",3000);
        }
        else
        {
            var m = 0;
            var allactive = true;
            $H(seed.outgoing_marches["c" + currentcityid]).each(function (o) {
                h = o[0].split("m")[1];
                var i = o[1];
                var t = parseInt(i.returnUnixTime, 10) - unixtime();
                if(t > m)
                    m = t;
                if(seed.outgoing_marches["c" + currentcityid]["m" + h].marchStatus == 0)
                    allactive = false;
            });
            if(allactive || forceWait)
            {
                setTimeout("AutoBuilder.UpdateDiv('Ilerle: ' + AutoBuilder.DisplayTime(" + m + ")," + cty + "); Modal.hideModalAll();",2000);
                clearTimeout(this.MarchTimer[cty]);
                this.MarchTimer[cty] = setTimeout("AutoBuilder.March(" + cty + ");",m*1000+10000*Math.random());
            }
            else
            {
                var selGen = false;
                for(var i = 1; i <= 19; i++)
                {
                    if(i!=2 && i!=3 && i!=14 && i!=15)
                    {
                        try{
                            document.getElementById('modal_attack_unit_ipt_' + i).value = document.getElementById('troopNum'+i).value;
                            selGen = true;
                        }catch(e){}
                    }
                }
                if(selGen == false)
                {
                    clearTimeout(this.MarchTimer[cty]);
                    this.MarchTimer[cty] = setTimeout("AutoBuilder.March(" + cty + ", true);",3000);
                }
                var listitems= document.getElementById("generalsContainer").getElementsByTagName("li");
                for (i=listitems.length; i>=0; i--)
                {
                    try{
                        if(listitems[i].getElementsByClassName('energy').length != 0)
                        {
                            listitems[i].focus();
                            listitems[i].onclick();
                            break;
                        }
                    }catch(e){}
                }
                document.getElementById('bookmarkDropdown')[this.BookMarkPlace].selected = 1;
                March.selectAttackBookmark(document.getElementById('bookmarkDropdown'));
                March.check('normal');
                this.BookMarkPlace++;
                document.getElementById('marchBM').value = this.BookMarkPlace;
                clearTimeout(this.MarchTimer[cty]);
                this.MarchTimer[cty] = setTimeout("AutoBuilder.March(" + cty + ");",5000);
            }
        }
    },
    Stop: function (go, bra) {
        var cty = this.GetCurrentCity();
        if(go)
        {
            
            switch (bra)
            {
                case 1:
                    clearTimeout(this.BuildTimer[cty]);
                    break;
                case 2:
                    clearTimeout(this.RsrchTimer[cty]);
                    break;
                case 3:
                    clearTimeout(this.TrainTimer[cty]);
                    break;
                case 4:
                    clearTimeout(this.DfnceTimer[cty]);
                    break;
                case 5:
                    clearTimeout(this.MarchTimer[cty]);
                    break;
           }
           this.UpdateDiv("Durduruldu.. " + this.STRTIME[bra] + "....",cty);
        }
        else
        {
            this.UpdateDiv("Baslatildi.. " + this.STRTIME[bra] + "....",cty);
            switch (bra)
            {
                case 1:
                    clearTimeout(this.BuildTimer[cty]);
                    this.BuildTimer[cty] =setTimeout("AutoBuilder.Build(" + cty + ");",100);
                    break;
                case 2:
                    clearTimeout(this.RsrchTimer[cty]);
                    this.RsrchTimer[cty] =setTimeout("AutoBuilder.Resrch(" + cty + ");",100);
                    break;
                case 3:                    
                    clearTimeout(this.TrainTimer[cty]);
                    this.TrainTimer[cty] = setTimeout("AutoBuilder.Train(" + cty + ");", 100);
                    if(document.getElementById('chkMAX').checked)
                        this.TrainNum[cty] = -1;
                    else
                        this.TrainNum[cty] = parseInt(document.getElementById('chkaNum').value);
                    break;
                case 4:                    
                    clearTimeout(this.DfnceTimer[cty]);
                    this.DfnceTimer[cty] = setTimeout("AutoBuilder.Dfnce(" + cty + ");", 100);
                    if(document.getElementById('chkdMAX').checked)
                        this.DfnceNum[cty] = -1;
                    else
                        this.DfnceNum[cty] = parseInt(document.getElementById('dfnceNum').value);
                    break;
                case 5:
                    clearTimeout(this.MarchTimer[cty]);
                    this.MarchTimer[cty] = setTimeout("AutoBuilder.March(" + cty + ");", 100);
                    break;
             }
        }
    }
}
setTimeout("AutoBuilder.Init();",2000);

})();