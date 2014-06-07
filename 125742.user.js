// ==UserScript==
// @name           WEAPON V20120102
// @namespace      WEAPON
// @version        WEAPON V20120102
// @description    GW TOOLS
// @include        *.globalwarfaregame.com/*main_src.php*
// @include        *.globalwarfaregame.com/*main_src.php*
// @include        *apps.facebook.com/globalwarfaregame/*
// @include        *apps.facebook.com/globalwarfaregame/*
// ==/UserScript==


var Version = '20120102';

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
var DEFAULT_ALERT_SOUND_URL = 'http://koc.god-like.info/alarm.mp3';
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
     alertConfig  : {aChat:true, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, defend:true, minTroops:1, spamLimit:10, lastAttack:0, barbautoswitch:false,},
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
  
  AddMainTabLink('B.I.A.', eventHideShow, mouseMainTab);
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
/********************************* search tab *************************************/
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
  tabLabel: 'Search',
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
      <DIV class=ptentry><table><tr><td><TABLE><TR valign=bottom><TD class=xtab width=100 align=right>Search For: </td><TD>\
      <SELECT id="srcType">\
        <OPTION value=0>T Camp</option>\
        <OPTION value=1>Wilderness</option>\
		<OPTION value=2>Cities</option>\
      </select></td></tr>\
      </table>\
      <DIV id="srcOpts" style="height:100px"></div></td><td style="visibility:hidden"><DIV id=divOutOpts style="background:#e0e0f0; padding:10px ;visibility:hidden"></div></td></tr></table></div>\
      <DIV id="srcResults" style="height:470px; max-height:470px;"></div>';
    var psearch = document.getElementById ("srcType");
    m = '<TABLE><TR valign=middle><TD class=xtab width=100 align=right>Center: &nbsp; X: </td><TD class=xtab>\
      <INPUT id=srchX type=text\> &nbsp; Y: <INPUT id=srchY type=text\> &nbsp;';
	 m += '<span><select id="ptprovinceXY"><option>--Province--</option>';
		 for (var i in Provinces) {
			 m += '<option value="'+i+'">'+Provinces[i].name+'</option>';
		 }
	m += '</select></span>';

	m += '</td></tr><TR><TD class=xtab align=right>Max Distance: </td><TD class=xtab><INPUT id=srcDist size=4 value=10 /> &nbsp; <SPAN id=spInXY></span></td></tr>';
    m += '<TR><TD class=xtab></td><TD class=xtab><INPUT id=srcStart type=submit value="Start Search"/></td></tr>';
    m += '</table>';
    document.getElementById ('srcOpts').innerHTML = m;
    new CdispCityPicker ('srchdcp', document.getElementById('spInXY'), true, null, 0).bindToXYboxes(document.getElementById ('srchX'), document.getElementById ('srchY'));
     document.getElementById ('ptprovinceXY').addEventListener('change', function() {
	   if (this.value >= 1) {
		   document.getElementById ('srchX').value = Provinces[this.value].x;
		  document.getElementById ('srchY').value = Provinces[this.value].y;
		   document.getElementById ('srcDist').value = 800;
	   }
	   }, false); 
	document.getElementById ('srcStart').addEventListener ('click', t.clickedSearch, false);
  },

//Edit add city search
clickedPlayerDetail : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching Details ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching Leaderboard details ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },
  clickedPlayerCheckOnline : function (span, uid){
	var s = Tabs.Search;
    span.onclick = '';
    span.innerHTML = "fetching Online Status ...";
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
    span.innerHTML = "Fetching Login Date ...";
    t.fetchPlayerLastLogin (uid, function (r) {s.gotPlayerLastLogin(r, span)});
  },
  
  gotPlayerLeaderboard : function (rslt, span){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Leaderboard:</b> Not found! (misted?)';
      return;
    }
    var p = rslt.results[0];
    var an = p.allianceName;
    if (!an || an=='' || p.officerType==4)
      an = 'none';
    else
      an += ' ('+ officerId2String(p.officerType) +')';
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Leaderboard: </b></td><TD colspan=2> Power: '+ p.might  +' &nbsp; Alliance: '+ an +'</td></tr>'; 
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      m += '<TR><TD align=right><B>City #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName +' '+coordLink (c.xCoord, c.yCoord)+'</td><TD width=75%> &nbsp; Level: '
        + c.tileLevel +' &nbsp; &nbsp; Status: '+ cityStatusString (c.cityStatus) +' &nbsp; &nbsp; Created: ' + c.dateCreated.substr(0,10) +'</td></tr>';
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
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Details:</b> &nbsp; </td><TD>alliance: '+ a +' &nbsp; Cities: '
          + u.cities +' &nbsp; Population: '+ u.population +'</td></tr><TR><TD></td><TD>Provinces: ';
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
      m = '<span style="color:green"><b>ONLINE!!</b></span>';
    } else {
       m = '<span style="color:red"><b>NOT ONLINE</b></span>';
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
      m = '<span style="color:black">Last login: '+lastLogin+'</span>';
    } else {
       m = '<span style="color:red">No login Date found: '+lastLogin+'</span>';
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
      t.stopSearch ('SEARCH CANCELLED!');
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
      errMsg += "Max Distance must be between 1 and 799<BR>";
    if (errMsg != ''){
      document.getElementById('srcResults').innerHTML = '<FONT COLOR=#660000>ERROR:</font><BR><BR>'+ errMsg;
      return;
    }

    t.searchRunning = true;
    document.getElementById ('srcStart').value = 'STOP SEARCH';
    m = '<DIV class=ptstat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=statSearched></div></td>\
        <TD class=xtab align=center><SPAN id=statStatus></span></td>\
        <TD class=xtab align=right width=125><DIV id=statFound></div></td></tr></table></div>\
      <TABLE width=100%><TR><TD><DIV id=divOutTab style="width:100%; height:470px; max-height:470px; overflow-y:auto;"></div></td></tr></table>';
    document.getElementById('srcResults').innerHTML = m;
    if (t.opt.searchType == 0)
      typeName = 'Terrorist camp';
    else if (t.opt.searchType == 1)
      typeName = 'Wildernesses';
	else 
	  typeName = 'Cities';

    m = '<CENTER><B>Search For '+ typeName +'<BR>\
        Center: '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; Distance: '+ t.opt.maxDistance +'<BR></center>\
        <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>LIST OPTIONS:</b><BR></td></tr>';
	if (t.opt.searchType == 1 || t.opt.searchType == 0) {
      m += '<TR><TD class=xtab align=right>Min. Level:</td><TD class=xtab> <INPUT id=filMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD class=xtab align=right>Max. level:</td><TD class=xtab> <INPUT id=filMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
	}
    if (t.opt.searchType == 1){
      m += '<TR><TD class=xtab align=right>Type:</td><TD class=xtab><SELECT id=filWildType>';
      m += htmlOptions ( {1:'Glassland/Lake', 3:'Oil Fields', 4:'Hills', 5:'Mountain', 6:'Plain', 0:'ALL', 20:'Special'}, Options.wildType );
      m += '</select></td></tr><TR><TD class=xtab align=right>Show Unowned Only:</td>\
			<TD class=xtab><INPUT id=filUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    }
	if (t.opt.searchType == 1 || t.opt.searchType == 0) {
	  m += '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=filSortBy>\
				<OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Level</option>\
				<OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>';
		if(t.opt.searchType == 1){ m+= '<OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Power</option>';}
      m += '</select></td></tr>\
            <TR><TD class=xtab align=right>Show coordinates only:</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
            </table></div><BR><SPAN id=srchSizeWarn></span>';
	} else {
	 m += '<TR><TD class=xtab align=right>Type:</td><TD class=xtab><SELECT id=filCities>';
     m += htmlOptions ( {1:'All', 2:'Allies', 3:'Friendly', 4:'Hostile', 5:'Neutral', 6:'Unallianced'}, Options.cityType );
     m += '</select></td></tr>';		
	 m += '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=filSortBy>\
			<OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Power</option>\
			<OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
           </select></td></tr>\
		   <TR><TD class=xtab align=right>Min. Power to Show:</td><TD class=xtab><INPUT type=text id=minMight value='+Options.MightSrc+' size=3 \></td></tr>\
           <TR><TD class=xtab align=right>Show coordinates only:</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
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
    document.getElementById ('statStatus').innerHTML = 'Searching At '+ xxx +','+ yyy;
if (DEBUG_TRACE) actionLog (" 0 clickedSearch()... setTimeout ..:" + xxx +' , '+ yyy +' , '+ t.mapCallback.name);
    setTimeout (function(){Map.request (xxx, yyy, 15, t.mapCallback)}, MAP_DELAY);
  },

  dispMapTable : function (){
    var tileNames = ['T Camp', 'Grassland', 'Lake', 'Oil Field', 'Hills', 'Mountain', 'Plain', 'City' ];
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

    document.getElementById('statFound').innerHTML = 'Found: '+ dat.length;
    if (dat.length == 0){
      m = '<BR><CENTER>NONE FOUND ..</center>';
    } else {
      dat.sort(mySort);
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: SORT');
      if (coordsOnly)
        m = '<TABLE align=center id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD width="10%">Locations</td></tr>';
      else {
        if (t.opt.searchType == 2) {
			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD width="10%"><b>Location</b></td><TD  width="5%"><b>Dist</b></td><TD width="15%"><b>City</b></td><TD width="15%"><b>Owner</b></td><TD width="12%"><b>Power</b></td><td width="15%"><b>Alliance</b></td><TD width="28%" style="font-size:9px;"><b>More Info</b></td><TD style="padding-left: 10px;"></td></tr>';
		} else { 
			if(Options.unownedOnly || t.opt.searchType == 0){
			  m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD width="20%"><b>Location</b></td><TD width="10%"><b>Dist</b></td><TD width="10%"><b>LVL</b></td><TD width=60%><b>Type</b></td></tr>';
			} else {
			  m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD align="center" width="10%">Location</td><TD width="5%">Dist</td><TD align="center" width="5%">LVL</td><TD align="center" width="10%">Type</td><TD align="center" width="15%">Owner</td><TD width="12%">Power</td><TD align="center" width="15%">Alliance</td><TD width=28% align="center" style="font-size:9px;">More Info</td></tr>';
			}
		}
	  }
      var numRows = dat.length;
      if (numRows > 500 && t.searchRunning){
        numRows = 500;
        document.getElementById('srchSizeWarn').innerHTML = '<FONT COLOR=#600000>NOTE: Table only shows 500 of '+ dat.length +' results until search is complete.</font>';
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
					m += '<DIV onclick="PTscout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A style="font-size:9px;" >Scout</a></div>';
				} else 
					m += '<DIV onclick="PTpd(this, '+ dat[i][7] +')"><A class=loc2>Details</a></div>\
					<DIV style="" onclick="PTpd2(this, '+ dat[i][7] +')"><A class=loc2>Leaderboard</a></div>\
					<DIV style="" onclick="PCpo2(this, '+ dat[i][7] +')"><A class=loc2>Online Status</a></div>\
					<DIV style="" onclick="PCplo2(this, '+ dat[i][7] +')"><A class=loc2>Last Login</a></div>';
			    m+= '</td><TD  valign="top">'+ (dat[i][5]?' Siste':'') +'</td></tr>';
			} else {
			  if(!dat[i][5] || t.opt.searchType == 0){
				m += '<TD valign="top" class=search1 >'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD valign="top" class=search1 >'+ dat[i][4] +'</td><TD valign="top" class=search1 >'+ tileNames[dat[i][3]]+'</td><TD colspan=4 class=search1 >'+ (dat[i][5]?' OWNED':'') +'</td></tr>';
			  } else {
			    m += '<TD align="right" valign="top" class=search1>'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD valign="top" class=search1 >'+ dat[i][4] +'</td><TD valign="top" class=search1 >'+ tileNames[dat[i][3]]+'</td><TD valign="top" class=search1 >'+ dat[i][9] +'</td><TD valign="top" class=search1 >'+dat[i][10]+'</td><TD valign="top" class=search1 >'+dat[i][11]+'</td><td class=search1 >';
				  if (dat[i][6]) {
					m += '<DIV onclick="PTscout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A style="font-size:9px;" >Scout</a></div>';
				  } else {
					m += '<DIV onclick="PTpd(this, '+ dat[i][8] +')"><A class=loc2 >Details</a></div>\
					<DIV style="" onclick="PTpd2(this, '+ dat[i][8] +')"><A class=loc2>Leaderboard</a></div>\
					<DIV style="" onclick="PCpo2(this, '+ dat[i][8] +')"><A class=loc2>Online Status</a></div>\
					<DIV style="" onclick="PCplo2(this, '+ dat[i][8] +')"><A class=loc2>Last login</a></div>';
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
    document.getElementById ('srcStart').value = 'Start Search';
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
    document.getElementById('statSearched').innerHTML = 'Searched: '+ t.tilesSearched;
    t.dispMapTable();

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        t.stopSearch ('DONE!');
        return;
      }
    }

    var x = t.normalizeCoord(t.curX);
    var y = t.normalizeCoord(t.curY);
    document.getElementById ('statStatus').innerHTML = 'Searching At '+ x +','+ y;
if (DEBUG_TRACE) actionLog (" 0 mapCallback()... setTimeout ..:" + x +' , '+ y +' , '+ t.mapCallback.toString().substr (0,50));
    setTimeout (function(){Map.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
  },
};

/*******************   MAP INTERFACE ****************/
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

 /****************************  Transport Tab  *******************************/
Tabs.transport = {
  tabOrder: 22,
  tabLabel: 'Transport',
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

      var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED TRANSPORT FUNCTION</div><TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center">';
      if (t.traderState.running == false) {
          m += '<TD><INPUT id=pbTraderState type=submit value="Transport = OFF"></td>';
      } else {
          m += '<TD><INPUT id=pbTraderState type=submit value="Transport = ON"></td>';
      }
      m += '<TD><INPUT id=pbShowRoutes type=submit value="Show Routes"></td>';
      m += '</tr></table></div>';
      m += '<DIV id=pbTraderDivDRoute class=pbStat>TRADE ROUTE OPTIONS</div>';
      m += '<TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center"><TR align="left">';
	    m += '<TD colspan=4>Time inbetween to check transport: <INPUT id=pbtransportinterval type=text size=2 value="'+Options.transportinterval+'"\> minutes</td></tr></table>';
      m += '<TD colspan=4>Dont send transport out if less then <INPUT id=pbminwagons type=text size=2 value="'+Options.minwagons+'"\> troops are needed. (Needless transports are skipped this way)</td></tr></table>';
      m += '<DIV style="margin-top:10px;margin-bottom:5px;">If the "trade" amount is 0 then it will transport the max amount above "keep". Gold only if there is space left...</div></table>';
    
      
      m += '<DIV id=pbTraderDivDRoute class=pbStat>TRANSPORTS</div>';
      m += '<TABLE id=pbaddtraderoute width=95% height=0% class=pbTab><TR align="left">';
      m += '<TR align="left"><TD>From City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptrescity></span></div></td></tr>';

      m += '<TR align="left">';
      m += '<TD>To City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptcityTo></span></div></td>';
      m += '<TD>OR</td>';
      m += '<TD>X:<INPUT id=ptcityX type=text size=3\></td>';
      m += '<TD>Y:<INPUT id=ptcityY type=text size=3\></td></tr>';
      m += '<TABLE id=pbaddtraderoute height=0% class=pbTab><TR align="left">';
      m += '<TD width=75px>TroopType:</td><TD width=150px><SELECT id="TransportTroop">';
      for (y in unsafeWindow.arStrings.unitName) if(y == "u2"){continue} else if(y == "u14") {continue} else { m+='<option value="'+findoptvalue(y)+'">'+unsafeWindow.arStrings.unitName[y]+'</option>' };
      m+='</select></td><TD width=75px>Troops Available:&nbsp;</td><TD id=TroopAmount align=left width=75px></td>';
      m+='<TD width=75px>Global Carry Amount:&nbsp;</td><TD id=CarryAmount align=left width=75px></td>';
      m += '<TR><TD >Troops: </td><TD><INPUT id=TroopsToSend type=text size=11 maxlength=11 value="0">&nbsp;&nbsp;<INPUT id=MaxTroops type=submit value="Max"></td>';
      m += '<TD width=50px><INPUT id=FillInMax type=submit value="<----"></td>';
      m +='<TD id=Calc colspan=3></td></tr>';
      m += '<TABLE id=pbaddtraderoute height=0% class=pbTab><TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + FOOD_IMAGE +');</td>';
      m += '<TD id=TransRec1 align=right width=110px></td>';
      m += '<TD id=HaveRec1 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipFood type=checkbox unchecked=true\></td>';
      m += '<TD width=180px  align=left>Keep: <INPUT id=pbtargetamountFood type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Trade: <INPUT id=pbtradeamountFood type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxFood type=submit value="Max"></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + OIL_IMAGE +')</td>';
      m += '<TD id=TransRec2 align=right width=110px></td>';
      m += '<TD id=HaveRec2 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipWood type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Keep: <INPUT id=pbtargetamountWood type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Trade: <INPUT id=pbtradeamountWood type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxWood type=submit value="Max"></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + STONE_IMAGE +')</td>';
      m += '<TD id=TransRec3 align=right width=110px></td>';
      m += '<TD id=HaveRec3 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipStone type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Keep: <INPUT id=pbtargetamountStone type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Trade: <INPUT id=pbtradeamountStone type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxStone type=submit value="Max"></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + STEEL_IMAGE +')</td>';
      m += '<TD id=TransRec4 align=right width=110px></td>';
      m += '<TD id=HaveRec4 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipOre type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Keep: <INPUT id=pbtargetamountOre type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Trade: <INPUT id=pbtradeamountOre type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxOre type=submit value="Max"></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + TITA_IMAGE +')</td>';
      m += '<TD id=TransRec5 align=right width=110px></td>';
      m += '<TD id=HaveRec5 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipTita type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Keep: <INPUT id=pbtargetamountTita type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Trade: <INPUT id=pbtradeamountTita type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxTita type=submit value="Max"></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + GRAPH_IMAGE +')</td>';
      m += '<TD id=TransRec6 align=right width=110px></td>';
      m += '<TD id=HaveRec6 align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipGraph type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Keep: <INPUT id=pbtargetamountGraph type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Trade: <INPUT id=pbtradeamountGraph type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxGraph type=submit value="Max"></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img height=35px width=35px src=' + GOLD_IMAGE +'></td>';
      m += '<TD id=TransGold align=right width=110px></td>';
      m += '<TD id=HaveGold align=right width=110px></td>';
      m += '<TD width=55px align=right><INPUT id=pbshipGold type=checkbox unchecked=true\></td>';
      m += '<TD width=180px align=left>Keep: <INPUT id=pbtargetamountGold type=text size=11 maxlength=11 value="0" disabled=true\></td>';
      m += '<TD width=100px>Trade: <INPUT id=pbtradeamountGold type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD width=50px><INPUT id=MaxGold type=submit value="Max"></td></tr>';

      m += '</table>';

      m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRoute type=submit value="Add Route"><INPUT id=pbManualSend type=submit value="Manual Transport"></div>';
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
      		document.getElementById('pbtradeamountFood').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Graph + t.Tita);
      }, false);
      document.getElementById('MaxWood').addEventListener('click', function(){
      		t.Wood = 0;
      		document.getElementById('pbtradeamountWood').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Graph + t.Tita);
      }, false);
      document.getElementById('MaxStone').addEventListener('click', function(){
      		t.Stone = 0;
      		document.getElementById('pbtradeamountStone').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Graph + t.Tita);
      }, false);
      document.getElementById('MaxOre').addEventListener('click', function(){
      		t.Ore = 0;
      		document.getElementById('pbtradeamountOre').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Graph + t.Tita);
      }, false);
      document.getElementById('MaxGold').addEventListener('click', function(){
      		t.Gold = 0;
      		document.getElementById('pbtradeamountGold').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Graph + t.Tita);
      }, false);
      document.getElementById('MaxTita').addEventListener('click', function(){
      		t.Tita = 0;
      		document.getElementById('pbtradeamountTita').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Graph + t.Tita);
      }, false);
      document.getElementById('MaxGraph').addEventListener('click', function(){
      		t.Graph = 0;
      		document.getElementById('pbtradeamountGraph').value = t.MaxLoad - (t.Food + t.Wood + t.Stone + t.Ore + t.Gold + t.Graph + t.Tita);
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
      document.getElementById('pbtargetamountGold').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountGold').value)) document.getElementById('pbtargetamountGold').value=0 ;
      }, false);
      document.getElementById('pbtargetamountTita').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountTita').value)) document.getElementById('pbtargetamountTita').value=0 ;
      }, false);
      document.getElementById('pbtargetamountGraph').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountGraph').value)) document.getElementById('pbtargetamountGraph').value=0 ;
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
      document.getElementById('pbtradeamountGold').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountGold').value)) document.getElementById('pbtradeamountGold').value=0 ;
      }, false);
      document.getElementById('pbtradeamountTita').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountTita').value)) document.getElementById('pbtradeamountTita').value=0 ;
      }, false);
      document.getElementById('pbtradeamountGraph').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountGraph').value)) document.getElementById('pbtradeamountGraph').value=0 ;
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
      document.getElementById('pbshipGold').addEventListener('click', function(){
          if (document.getElementById('pbshipGold').checked==false) {
              document.getElementById('pbtargetamountGold').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountGold').disabled = false;
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
      document.getElementById('pbshipGraph').addEventListener('click', function(){
          if (document.getElementById('pbshipGraph').checked==false) {
              document.getElementById('pbtargetamountGraph').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountGraph').disabled = false;
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
    	
    	document.getElementById('Calc').innerHTML = 'Resources: ' +  addCommas(t.Food + t.Wood + t.Stone + t.Ore + t.Gold) + ' / ' + addCommas(t.MaxLoad) + '&nbsp;&nbsp;(Troops Needed: <FONT color='+fontcolor+'>' + addCommas(t.TroopsNeeded) + '</font> )' ;
    	
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
			new CdialogConfirm ('<SPAN class=boldRed>You are about to set a route to location 0,0!</span>', t.checkcoords, unsafeWindow.modal_attack_check, mainPop.getMainDiv); 
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
				target_Ore:			target_Ore,
				trade_Ore:	 		trade_Ore,
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
			//mod
			
			var session = "";
			try {
                session = unsafeWindow.g_ajaxparams.__kraken_session;
				
            } catch (k) {}
			actionLog("session: " + session);
			
			try {
				actionLog("tpuid: " + tpuid);
				actionLog("tvuid: " + tvuid);
				actionLog("kabamuid: " + kabamuid);
			} catch (k) {}
			var m = "";
			for(i=0; i<Cities.numCities; i++) {   // each city
				cityID = 'c'+ Cities.cities[i].id;
				for (k in Seed.outgoing_marches[cityID]){   // each march
					march = Seed.outgoing_marches[cityID][k];
					if ((typeof (march) == 'object')) {
						actionLog("City: " + Cities.cities[i].id + ", march: " + march.marchId);
						m = m + ", " + march.marchId;
					}	
				}		
			}
			//alert(m);
		var t = Tabs.transport;
		var popTradeRoutes = null;
		t.popTradeRoutes = new CPopup('pbShowTrade', 0, 0, 750, 500, true, function() {clearTimeout (1000);});
		var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTab" id="pbRoutesQueue">';       
		t.popTradeRoutes.getMainDiv().innerHTML = '</table></div>' + m;
		t.popTradeRoutes.getTopDiv().innerHTML = '<TD><B>Transport routes:</td>';
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
				if (r[i].route_state) var status = '<FONT color=green>Enabled</font>';
				else var status = '<FONT color=red>Disabled</font>';
				if (r[i].TroopType == undefined) var unit = 'unt9';
        else var unit2 = r[i].TroopType;
		    var unit = 'u' + unit2.substring(3)
				m += '<TR><TD TD width=12px>&nbsp;&nbsp;</td></tr>';
        m +='<TR><TD width=20px>'+(i+1)+'</td><TD width=175px>From:&nbsp;&nbsp;'+ cityname +'</TD><TD width=175px>To:&nbsp;&nbsp;'+ TO +'</td><TD width=175px>'+status+'</td>';
        m +='<TD width=60px><A class="ptButton21" onclick="traceEdit('+queueId+')">Edit</a></td><TD width=60px><A class="ptButton21" onclick="traceDelete('+queueId+')">Delete</a></td></tr>';
        m += '<TR><TD></td><TD>Troops:&nbsp;&nbsp'+unsafeWindow.arStrings.unitName[unit]+'</td></tr>';
        if (r[i].ship_Food) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + FOOD_IMAGE +'></td><TD>Target: '+ addCommas(r[i].target_Food) +'</td><TD>Trade: '+ addCommas(r[i].trade_Food)+'</td>';
		if (r[i].ship_Wood) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + OIL_IMAGE +'></td><TD>Target: '+ addCommas(r[i].target_Wood) +'</td><TD>Trade: '+ addCommas(r[i].trade_Wood)+'</td>';
		if (r[i].ship_Stone) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + STONE_IMAGE +'></td><TD>Target: '+ addCommas(r[i].target_Stone) +'</td><TD>Trade: '+ addCommas(r[i].trade_Stone)+'</td>';
		if (r[i].ship_Ore) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + STEEL_IMAGE +'></td><TD>Target: '+ addCommas(r[i].target_Ore) +'</td><TD>Trade: '+ addCommas(r[i].trade_Ore)+'</td>';
		if (r[i].ship_Graph) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + GRAPH_IMAGE +'></td><TD>Target: '+ addCommas(r[i].target_Graph) +'</td><TD>Trade: '+ addCommas(r[i].trade_Graph)+'</td>';
		if (r[i].ship_Tita) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + TITA_IMAGE +'></td><TD>Target: '+ addCommas(r[i].target_Tita) +'</td><TD>Trade: '+ addCommas(r[i].trade_Tita)+'</td>';
		if (r[i].ship_Gold) m += '<TR><TD></td><TD align=center><img height=35px width=35px src=' + GOLD_IMAGE +'></td><TD>Target: '+ addCommas(r[i].target_Gold) +'</td><TD>Trade: '+ addCommas(r[i].trade_Gold)+'</td>';
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
	     var Types = ['FOOD','OIL','STONE','STEEL','GRAPH','TITA','GOLD'];
	     for (var y=0; y< Seed.cities.length;y++) {
					if ( parseInt(Seed.cities[y][0]) == r[queueId].city) var cityname = Seed.cities[y][1];
					if ( parseInt(Seed.cities[y][2]) == r[queueId].target_x && parseInt(Seed.cities[y][3]) == r[queueId].target_y) var citynameTo = Seed.cities[y][1];
			 }
       if (citynameTo == null) var TO = r[queueId].target_x +','+ r[queueId].target_y;
			 else TO = citynameTo; 
       var n = '<TABLE id=editRoutes class=pbTab>';
	     n +='<TD>From:&nbsp;'+ cityname +'</td><TD>To:&nbsp;'+ TO +'</td>';
	     n +='<TD><INPUT id=TradeStatus type=checkbox>&nbsp;Enable Route</td>';
	     n += '<TD width=150px>Troop Type:<SELECT id="pbbTransportTroop">';
for (y in unsafeWindow.arStrings.unitName) if(y == "u2"){continue} else if(y == "u14") {continue} else { n+='<option value="'+findoptvalue(y)+'">'+unsafeWindow.arStrings.unitName[y]+'</option>' };
       n+='</select></td></table><BR><TABLE  id=editRoutes class=pbTab>';
         n += '<TR><TD width=50px align=center><img src=' + FOOD_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipfood type=checkbox></td>';
         n += '<TD width=125px>Keep: <INPUT id=pbbtargetamountfood type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Trade: <INPUT id=pbbtradeamountfood type=text size=11 maxlength=11 value="0"\></td></tr>';
         n += '<TR><TD width=50px align=center><img src=' + OIL_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipwood type=checkbox></td>';
         n += '<TD width=125px>Keep: <INPUT id=pbbtargetamountwood type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Trade: <INPUT id=pbbtradeamountwood type=text size=11 maxlength=11 value="0"\></td></tr>';
         n += '<TR><TD width=50px align=center><img src=' + STONE_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipstone type=checkbox></td>';
         n += '<TD width=125px>Keep: <INPUT id=pbbtargetamountstone type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Trade: <INPUT id=pbbtradeamountstone type=text size=11 maxlength=11 value="0"\></td></tr>';
         n += '<TR><TD width=50px align=center><img src=' + STEEL_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipore type=checkbox></td>';
         n += '<TD width=125px>Keep: <INPUT id=pbbtargetamountore type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Trade: <INPUT id=pbbtradeamountore type=text size=11 maxlength=11 value="0"\></td></tr>';
		 n += '<TR><TD width=50px align=center><img src=' + GRAPH_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipgraph type=checkbox></td>';
         n += '<TD width=125px>Keep: <INPUT id=pbbtargetamountgraph type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Trade: <INPUT id=pbbtradeamountgraph type=text size=11 maxlength=11 value="0"\></td></tr>';
         n += '<TR><TD width=50px align=center><img src=' + TITA_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshiptita type=checkbox></td>';
         n += '<TD width=125px>Keep: <INPUT id=pbbtargetamounttita type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Trade: <INPUT id=pbbtradeamounttita type=text size=11 maxlength=11 value="0"\></td></tr>';
         n += '<TR><TD width=50px align=center><img src=' + GOLD_IMAGE + '></td>';
         n += '<TD width=50px align=center><INPUT id=pbbshipgold type=checkbox></td>';
         n += '<TD width=125px>Keep: <INPUT id=pbbtargetamountgold type=text size=11 maxlength=11 value="0"></td>';
         n += '<TD width=125px>Trade: <INPUT id=pbbtradeamountgold type=text size=11 maxlength=11 value="0"\></td></tr>'
       n+='</table><BR><TABLE id=editRoutes class=pbTab><TR><TD><a class="ptButton21" id="Cancel"><span>Cancel</span></a></td>';
       n+='<TD><a class="ptButton21" id="Save"><span>Save</span></a></td></tr>';
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
            obj.value = "Transport = OFF";
			clearTimeout(t.checkdotradetimeout);
			t.count = 0;
        }
        else {
            t.traderState.running = true;
            obj.value = "Transport = ON";
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
    	var carry_Food = (current_Food - target_Food);
    	var carry_Wood = (current_Wood - target_Wood);
    	var carry_Stone = (current_Stone - target_Stone);
    	var carry_Ore = (current_Ore - target_Ore);
		var carry_Graph = (current_Graph - target_Graph);
		var carry_Tita = (current_Tita - target_Tita);
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
		actionLog("marchId: " + e.marchId);
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
                  actionLog('Trade   From: ' + cityname + "   To: " + xcoord + ',' + ycoord + "    ->   Wagons: " + wagons_needed);
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
                  actionLog('TRANSPORT FAIL: ' + cityname + ' -> ' + rslt.msg);
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
		                  document.getElementById ('errorSpace').innerHTML = 'Send: ' + addCommas(params.r1+params.r2+params.r3+params.r4+params.gold) + ' Resources with ' + addCommas(parseInt(document.getElementById ('TroopsToSend').value)) + ' ' + unsafeWindow.unitcost[unitType][0];
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
/****************************  Tower Tab  ******************************/
	var uu1 = 'Supply Truck';
	var uu4 = 'Ion Cannon';
	var uu5 = 'Infantry';
	var uu6 = 'Sniper';
	var uu7 = 'SAM';
	var uu8 = 'Tank';
	var uu9 = 'Helicopter';
	var uu10 = 'Fighter';
	var uu11 = 'Gunship';
	var uu12 = 'Bomber';
	var uu13 = 'Stealth Bomber';
	var uu15 = 'Nuke';
	var uu16 = 'HellFire';
	var uu17 = 'AntiTank';
	var uu18 = 'Special Forces';
	var uu19 = 'Cargo';
        var uu20 = 'Drone';
Tabs.tower = {
  tabOrder: 21,
  tabLabel: 'Tower',
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
		0: { 'country': "--Country--", 'provider': "--Provider--" },
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
        110: { 'country': "Philippines", 'provider': "Smart" },
        111: { 'country': "UNITED STATES", 'provider': "CellularSouth" },
        112: { 'country': "UNITED STATES", 'provider': "Viaero" }
    },

  init: function(div){
	var t = Tabs.tower;
    t.myDiv = div;
    
    if (GM_getValue ('towerMarches_'+getServerId()) != null)
      GM_deleteValue ('towerMarches_'+getServerId());   // remove deprecated data if it exists
    // t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
    // unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;
 
    var m = '<DIV class=pbStat>TOWER ALERTS</div><TABLE class=pbTab><TR align=center>';

	  for (var i=0; i<Cities.cities.length; i++)
      m += '<TD width=95><SPAN id=pbtacity_'+ i +'>' + Cities.cities[i].name + '</span></td>';
    m += '</tr><TR align=center>';
	  for (var cityId in Cities.byID)
		m += '<TD><INPUT type=submit id=pbtabut_'+ cityId +' value=""></td>';
	m += '</tr><TR align=center>';
	  for (var cityId in Cities.byID)
	   m += '<TD><CENTER><INPUT id=pbattackqueue_' + cityId + ' type=submit value="A 0 | S 0"></center></td>';
    m += '</tr></table><BR><DIV><CENTER><INPUT id=pbSoundStop type=submit value="Stop Sound Alert"></center></div><DIV id=pbSwfPlayer></div>';
    m += '<BR><DIV class=pbStat>CONFIGURATION</div><TABLE class=pbTab>\
    <tr><td align=left><INPUT id=pbcellenable type=checkbox '+ (Options.celltext.atext?'CHECKED ':'') +'/></td>\
    <td align=left>Text message incoming attack to: <INPUT id=pbnum1 type=text size=4 maxlength=4 value="'+ Options.celltext.num1 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum2 type=text size=3 maxlength=3 value="'+ Options.celltext.num2 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum3 type=text size=4 maxlength=4 value="'+ Options.celltext.num3 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\> <span style="color:#800; font-weight:bold">(Standard text messaging rates apply)</span></td></tr><tr><td></td>\
    <TD align=left>Country: <select id="pbfrmcountry">';
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
    <select id="pbfrmprovider" '+(Options.celltext.provider==0?'DISABLED':'')+'><option value=0 >--PROVIDER--</option>';
    for (var i in t.Providers) {
 if(t.Providers[i].country == t.Providers[Options.celltext.provider].country)
		if(Options.celltext.provider == i)
			m += '<option value="'+i+'" selected="selected">'+t.Providers[i].provider+'</option>'; // Load Previous Provider Selection
		else
           m += '<option value="'+i+'">'+t.Providers[i].provider+'</option>';
    }
    m += '</select></td></tr>\
        <TR><TD><INPUT id=pbalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Automatically post incoming attacks to alliance chat</td></tr>\
        <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\
             <TR><TD align=right>Message Prefix: &nbsp; </td><TD><INPUT id=pbalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
            <TR><TD align=right>Alert On Scouting: &nbsp; </td><TD><INPUT id=pbalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Alert On Wild Attack: &nbsp; </td><TD><INPUT id=pbalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Display defending Status: &nbsp; </td><TD><INPUT id=pbalertDefend type=checkbox '+ (Options.alertConfig.defend?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Minimum # of troops: &nbsp; </td><TD><INPUT id=pbalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> &nbsp; &nbsp; <span id=pbalerterr></span></td></tr>\
            </table></td></tr>\
        <TR><TD><BR></td></tr>\
        <TR><TD><INPUT id=pbSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD>Play sound on incoming attack/scout</td></tr>\
        <TR><TD></td><TD><DIV id=pbLoadingSwf>loading SWF Player</div><DIV style="display:none" id=pbSoundOpts><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>Sound File: &nbsp; </td><TD><INPUT id=pbsoundFile type=text size=55 maxlength=160 value="'+ Options.alertSound.soundUrl +'" \>\
             &nbsp; </td><TD><INPUT id=pbSoundLoad type=submit value=Load><INPUT id=pbSoundDefault type=submit value=Default></td></tr>\
            <TR><TD align=right>Volume: &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pbTab><TR valign=middle><TD><SPAN id=pbVolSlider></span></td><TD width=15></td><TD align=right id=pbVolOut>0</td></td></table></td><TD align=center><SPAN id=pbLoadStat>xx</span></td></tr>\
            <TR><TD align=right><INPUT id=pbSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD> Repeat every: <INPUT id=pbSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> Minutes</td></tr>\
            <TR><TD></td><TD>Play For:<INPUT id=pbSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> Seconds</td></tr>\
            <TR><TD></td><TD><INPUT type=submit value="Play Now" id=pbPlayNow></td></tr></table></div></td></tr>\
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
    document.getElementById('pbLoadStat').innerHTML = 'LOADING ..';
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
	myselect.innerHTML = '<option value=0 >--Provider--</option>';
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
    var but = document.getElementById('pbtabut_'+ cityId);
    if (t.defMode[cityId]){
      but.className = 'pbDefButOn';
      but.value = 'Def=ON';  
    } else {
      but.className = 'pbDefButOff';
      but.value = 'Def=OFF';  
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
            document.getElementById('pbattackqueue_' + cId).value = 'A 0 | S 0' + t['attackCount_' + cId] + '' + t['scoutCount_' + cId];
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
      document.getElementById('pbLoadStat').innerHTML = 'ERROR!';
    else
      document.getElementById('pbLoadStat').innerHTML = 'LOADED!';
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
        data.embassy = 'EMB: '+ availSlots +'of'+ emb.maxLevel;
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            data.stat = 'HIDING';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            data.stat = 'DEFENDING';
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
      atkType = 'Attacked';
    } else {
      return;
    }
    var target, atkType, who;
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId ) {
      target = 'City At: ('+ city.x +','+ city.y + ')';
	  }
    else {
      if (!Options.alertConfig.wilds)
        return;
      target = 'wilderness';
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
		msg += 'My '+ target +' is being '+ atkType  +' by '+ who +' Incoming Troops (arriving in '+ unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';
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
        msg += ' My embassy has '+ availSlots +' of '+ emb.maxLevel +' slots available.';
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            msg+= ' My Troops Are hiding!';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            msg+= ' My Troops are defending!';
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
        t.popTowerIncoming.getTopDiv().innerHTML = '<TD width="300px"><B>Tower Report Of: ' + cityName + '</b></td></td>';
        t.addCityData2Pop(cityId);
        t.popTowerIncoming.show(true);
		clearTimeout (t.timer);
		t.timer = setTimeout (function() {t.showTowerIncoming(cityId)}, 5000);        
    },
    addCityData2Pop: function(cityId){
        var t = Tabs.tower;
        var rownum = 0;
        var names = ['Sup', 'Ion Cannon', 'Infantry', 'sniper', 'SAM', 'Tank', 'Gunship', 'Hellfire', 'heli', 'bomber', 'stealth', 'Nuke', 'AntiTank', 'SpcForces', 'Drone', 'Cargo',];
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
                s1 += '<TR align=right><TD align=left class="city"><B>Reinforcement:</b></td>'
                for (i = 1; i < 17; i++) {
                    s1 += '<TD class="city">0</td>';
                }
                
            }
			s1 += '<TR align=right><TD colspan=17><BR></tr>';
            s1 += '<TR align=right><TD class="own" align=left><B>Own Troops:</b></td>';
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
    
        var names = ['Sup', 'Ion Cannon', 'Infantry', 'sniper', 'SAM', 'Tank', 'Gunship', 'Hellfire', 'heli', 'bomber', 'stealth', 'Nuke', 'AntiTank', 'SpcForces', 'Drone', 'Cargo',];
        if (t.towerMarches.length > 0) {
            for (k in t.towerMarches) {
                if (typeof t.towerMarches[k].atkType != 'undefined') {
                    if (t.towerMarches[k].cityId == cityId) {
                        s3 += '<TABLE cellspacing=0 width=100%><TR>';
                        s3 += '<TD width=5%  ><B>Location</b></td>';
                        s3 += '<TD width=5%  ><B>Name</b></td>';
						s3 += '<TD width=5%><B>Source: </b></td>'
                        s3 += '<TD width=5%><B>Power: </b></td>'
                        s3 += '<TD width=5% colspan=2><B>Alliance: </b></td>'
                        s3 += '<TD width=5%><B>State: </b></td>'
                        s3 += '<TR><TD width=5%  >' + t.towerMarches[k].target + '</td>';
                        s3 += '<TD  >' + t.towerMarches[k].who + '</td>';
						s3 += '<TD width=5%>' + t.towerMarches[k].source + '</td>'; 
						s3 += '<TD width=5%>' + t.towerMarches[k].attackermight + '</td>';
						s3 += '<TD width=5% colspan=2>' + t.towerMarches[k].allianceName + '</td>';
						s3 += '<TD width=5%>' + t.towerMarches[k].diplomacy + '</td></tr>';
						s3 += '<TD width=5%></td>'
                        s3 += '<TD><B>Remaining: </b></td>'
                        s3 += '<TD><B>Arrival: </b></td></tr>';
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
/****************************  OverView Tab ******************************/
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
  
  for (var i=1; i<6; i++){
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
  tabLabel : 'OverView',
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
    var Lasers    =[210000];
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
        <TD><SPAN class=ptStatLight>Power:</span> ' + addCommas(Seed.player.might) +'</td>\
        <TD><SPAN class=ptStatLight>Alliance:</span> ' + getMyAlliance()[1] +'</td>\
        <TD align=right><SPAN class=ptStatLight>Domain:</span> ' + unsafeWindow.domainName +'</td></tr></table></div>';

              
      str += "<DIV id=overMainDiv style='font-size:"+ Options.overviewFontSize +"px'><TABLE class=ptTabOverview cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>'+ Cities.cities[i].x +','+ Cities.cities[i].y +"<BR>"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"</td>";
      }
      str += "</tr>";
	  
	  str += '<TR valign=top align=right><TD></td><TD style=\'background: #ffc\'></td>';
		for(i=0; i<Cities.numCities; i++){
		  cityID = 'city'+Cities.cities[i].id;
		  Gate = parseInt(Seed.citystats[cityID].gate);
		if(Gate == 0)
		  str += '<TD>Hiding</td>';
		else
		  str += '<TD><SPAN class=boldRed><blink>Defending</b></blink></span></td>';
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

      str += _row ('Gold', rows[0]);
      str += _row ('Food', rows[1]);
      str += _row ('Oil', rows[2]);
      str += _row ('Stone', rows[3]);
      str += _row ('Steel', rows[4]);
      str += _row ('Titanium', rows[5]);
      str += _row ('Graphene', rows[6]);
      str += _row ('Uranium', rows[7]);
      str += _row ('Diamonds', rows[8]);
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
	  //str += _row (unsafeWindow.arStrings.unitName['u'+i], rows[i]);
	  str += _row ('SupTruck', rows[1]);
      str += _row ('Infantry', rows[5]);
      str += _row ('Sniper', rows[6]);
      str += _row ('AntiTank', rows[4]);
      str += _row ('Spc Forces', rows[18]);
      str += _row ('SAM', rows[7]);
      str += _row ('Tank', rows[8]);
      str += _row ('Drone', rows[17]);
      str += _row ('Helicopter', rows[9]);
      str += _row ('Gunsghip', rows[11]);
      str += _row ('Fighter', rows[10]);
      str += _row ('Bomber', rows[12]);
      str += _row ('Cargo', rows[19]);
      str += _row ('Hellfire', rows[16]);
      str += _row ('Stealth', rows[13]);
      str += _row ('Nuke', rows[15]);
	  str += _row ('Ion Cannon', rows[20]);
      str += '<TR><TD colspan=12><BR></td></tr>';
      

	 //    Fortification
	  if (Options.includeCity){
      for (r=1; r<7; r++){
        for(i=0; i<5; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          x=r+51
          rows[r][i] = parseInt(Seed.fortifications[cityID]['fort'+x]);
          var perimeter = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos1[1]);
          if (r==2) {
            var temp=parseInt(Seed.fortifications[cityID]['fort'+x]) + rows[1][i];
            if (Options.showSpace){
              rows[7][i] = disposable[perimeter] - temp;                
            }
            else {
              if (temp < disposable[perimeter])
                rows[7][i] = temp+'('+ perimeter +')';
              else
                rows[7][i] = '<SPAN class=boldWhite><B>'+ temp +'('+ perimeter +')' +'</b></span>';
            }
          }
          if (r==4) {
          var temp=parseInt(Seed.fortifications[cityID]['fort'+x]) + rows[3][i];
          if (Options.showSpace){
            rows[8][i] = stable[perimeter] - temp;                
          }
          else {
            if (temp < stable[perimeter])
              rows[8][i] = temp+'('+ perimeter +')';
            else
              rows[8][i] = '<SPAN class=boldWhite><B>'+ temp + '('+ perimeter +')' + '</b></span>';
           
            }
           }
          if (r==6) {
          var temp=parseInt(Seed.fortifications[cityID]['fort'+x]) + rows[5][i];
          if (Options.showSpace){
            rows[9][i] = Lasers[perimeter] - temp;                
          }
          else {
            if (temp < Lasers[perimeter])
              rows[9][i] = temp+'('+ perimeter +')';
            else
              rows[9][i] = '<SPAN class=boldWhite><B>'+ temp + '('+ perimeter +')' + '</b></span>';
            }
          }
        }
      } 
      str += _row ('Mines:', rows[2],true);
      str += _row ('Stingers:', rows[1],true);
      str += _row ('Disposable:', rows[7],true,true);
      str += _row ('Artillery:', rows[3],true);
      str += _row ('Airguns:', rows[4],true);
      str += _row ('Stable:', rows[8],true,true);
      str += _row ('Railguns:', rows[5],true);
      str += _row ('LaserTurret:', rows[6],true);
      str += _row ('Laser:', rows[9],true,true);
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
			str += _row ('Upkeep:', row3, true);
      str += _row ('Production:', row2, true);      
      str += _row ('Food +/-:', row, true);
      
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
      str += _row ('Food Left:', row, true);
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
      str += _row ('#Wilds', row, true);
  
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
        for (k in dat)
          ++totKnights;
        row[i] = totKnights;
      }
      str += _row ('#Generals', row, true);
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
      str += _row ('TroopQue:', row, true);
      
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
      str += _row ('WallQue:', row, true);
      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><BR><INPUT type=CHECKBOX id=ptoverOriginal'+ (Options.includeCity?' CHECKED':'') +'>Show Troops In City</td></tr>';
    //  str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +' DISABLED>Show Marching Troops/Resources</td></tr>';
    //  str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptoverIncTraining'+ (Options.includeTraining?' CHECKED':'') +' DISABLED>Show troops training in city</td></tr>';
    //  str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptoverIncTrainingTotal'+ (Options.includeTrainingTotal?' CHECKED':'') +' DISABLED>Show troops training totals</td></tr>';
     str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptOverOver'+ (Options.overviewAllowOverflow?' CHECKED':'') +'>Allow Width Overflow: '+ htmlSelector ({9:9, 10:10, 11:11, 12:12,15:15}, Options.overviewFontSize, 'id=ptoverfont') +'</td></tr>';
      str += "</table></div>";
	  str+= 'Version : ' + Version;
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
/****************************  Generals Tab ******************************/

Tabs2.Generals = {
  tabOrder : 22,
  tabLabel : 'Generals',
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
      str += "<TD width=100><B>City Names:"
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=100><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>' +"</td>";
      }
      str += "</tr><TD width=81>Gold:<BR>Tax:<BR>Revenue:<BR>Wages:<BR><BR><B>Resources(1%):<BR>Army(0.5%):<BR>Research(0.5%):<BR>Build(0.5%):</B>";
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
/****************************  Auto Build Tab  ******************************
 TODO:
	 visu directly in the game of build queue elements
	 <span class="leveltag" style="left:60px;">10</span>
	 more todos within the code
 */
Tabs.build = {
    tabOrder: 99,
    tabLabel: 'Build',
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
        
        var m = '<DIV id=pbBuildDivF class=ptStat>BUILD FUNCTIONS</div><TABLE id=pbbuildfunctions width=100% height=0% class=ptTab><TR>';
        if (t.buildStates.running == false) {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build=OFF"></td>';
        }
        else {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build=ON"></td>';
        }
		m += '<TD><INPUT id=pbBuildMode type=submit value="Build Mode=OFF"></td>';
		m += '<TD>Build Type: <SELECT id="pbBuildType">\
				<OPTION value=build>Level Up</option>\
				<OPTION value=max>Max level Upgrade</option>\
				<OPTION value=destruct>Demolish</option>\
				</select></td>';
		m += '<TD><INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>Help</td>';
		m += '</tr></table></div>';
        m += '<DIV id=pbBuildDivQ class=ptStat>BUILD QUEUES</div><TABLE id=pbbuildqueues width=100% height=0% class=ptentry><TR>';
		for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><B>' + Cities.cities[i].name + '</b></center></td>';
        }
		m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value="SHOW"></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD>Qc:</td><TD id=pbbuildcount_' + Cities.cities[i].id + '>' + t["bQ_" + Cities.cities[i].id].length + '</td>';
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
            m += '<TD>Tt:</td><TD id=pbbuildtotal_' + Cities.cities[i].id + '>' + timestring + '</td>';
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
				actionLog("Queue item deleted: Building Level equals 9 or higher!!!");
				return;
			};
			if (isNaN(curlvl)) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Found no correct value for current building!!!!");
				return;
			}
			if (l_bdgid != bdgid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Building Type does not match!!!!");
				return;
			}
			if (l_bid != bid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Building ID does not match!!!!");
				return;
			}
			if (l_curlvl < curlvl) {
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog("Queue item deleted: Buildinglevel is equal or higher!!!");
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
						document.getElementById('pbbuildError').innerHTML = "Connection Error while destructing! Please try later again";
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
						actionLog("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!");
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
								actionLog("Building: " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " Level: " + params.lv + " At: " + cityName, true);								
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
									actionLog("Queue item deleted: Building at this Level already exists or build process already started!");
								} else {
									t.requeueQueueElement(bQi);
									document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name +': '+ errmsg + " Item was requeued. Check for retry count.";
								}
								actionLog(errmsg);
							}
					},
						onFailure: function(){
							document.getElementById('pbbuildError').innerHTML = "Connection Error while building! Please try later again";
						}
					});
				} else {
					t.requeueQueueElement(bQi); // requeue item if check is invalid
				}
			}
		} else {
			t.cancelQueueElement(0, currentcityid, time, false);
			actionLog("Queue item deleted: Building does not exist!!!");
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
                t.modalmessage('Due to building requirements (GO), buildings above level 9\nshould be manualy built.');
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
        row.insertCell(6).innerHTML = '<input class="button30 ptButton20" type=button id="queuecancel_' + queueId + '" value=Cancel></input>';
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
        t.popBuildQueue.getTopDiv().innerHTML = '<TD width="200px"><B>Build Queue of ' + cityName + '</b></td><TD><INPUT id=pbOptimizeByTime type=submit value="Optimize by Time"></td>';
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
            obj.value = "Auto Build=OFF";
        }
        else {
            t.buildStates.running = true;
            t.saveBuildStates();
            obj.value = "Auto Build=ON";
        }
    },
    toggleStateMode: function(obj){
		var t = Tabs.build;
        if (obj.value == 'Build Mode=OFF') {
			unsafeWindow.Building.buildSlot = t.bot_buildslot; // overwrite original koc function
			unsafeWindow.Building.buildMenu = t.bot_buildslot; // overwrite original koc function
			// var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
			// if(guardian.length >0)
				// guardian[0].addEventListener('click', t.bot_buildguardian, false);
            obj.value = "Build Mode=ON";
        }
        else {
			unsafeWindow.Building.buildSlot = t.koc_buildslot; // restore original koc function
			unsafeWindow.Building.buildMenu = t.koc_buildmenu; // restore original koc function
			// var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
			// if(guardian.length >0)
				// guardian[0].removeEventListener('click', t.bot_buildguardian, false);
			obj.value = "Build Mode=OFF";
        }
    },
	getCityNameById: function (cityId) {
    return Cities.byID[cityId].name;  	
	},
}

/*********************************** INFO TAB ***********************************/
Tabs2.Info = {
  tabOrder : 44,
  tabLabel :'INFO',
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
        <DIV style="overflow-y:auto; overflow-x:hidden"><DIV class=ptStat>UNIT INFORMATION</div><TABLE align=center cellpadding=1 cellspacing=0>\
        <TR style="text-align:center"><TD class=xtab></td><TD class=xtabHL colspan=9><B>COST TO BUILD</b></td><TD class=xtabHL colspan=4><B>Stats</b></td><TD class=xtabHL colspan=4><B>Upkeep</b></td></tr>\
        <TR valign=bottom align=right><TD class=xtab></td><TD class=xtabHL>Food</td><TD class=xtabH>Oil</td><TD class=xtabH>Stone</td><TD class=xtabH>Steel</td>\
        <TD class=xtabH>Titanium</td><TD class=xtabH>Graphene</td><TD class=xtabH>Diamonds</td><TD class=xtabH>Uranium</td><TD class=xtabH>Pop</td><TD class=xtabHL>Life</td><TD class=xtabH>Attack</td><TD class=xtabH>Speed</td>\
        <TD class=xtabH>Load</td><TD class=xtabHL>Food</td></tr>\
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

/*********************************** Player Tab ***********************************/




Tabs.AllianceList = {
  tabOrder : 255,
  tabLabel : 'Player',
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
        t.cont.innerHTML = '<BR><BR><CENTER>You must be a member of the Alliance in order to use this feature ..!</center>';
        t.state = 1;
        return;
      }
      var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\
          <TR><TD class=xtab align=right></td><TD class=xtab>Player Name: &nbsp;</td>\
            <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Search" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
          <TR><TD class=xtab></td><TD class=xtab> Alliance: &nbsp;</td>\
            <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Search" /></td>\
           <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
           <TR><TD class=xtab></td><TD class=xtab> &nbsp;\</td>\
           <TD class=xtab><INPUT align=right id=idMyAllSubmit type=submit value="'+ getMyAlliance()[1] +'"/>\
           <TD class=xtab><span align=right <b>Distance Calculation: </b></span></td>\
           <TD class=xtab ><div><select id="idFindETASelect">\
        <option value="0,250" > -- Select -- </option>\
        <option value="0,180" > Supply Truck </option>\
        <option value="0,200" > Infantry </option>\
        <option value="0,320" > Sniper </option>\
        <option value="0,300" > AntiTank </option>\
        <option value="0,275" > Spc Forces </option>\
        <option value="0,250" > SAM </option>\
        <option value="1,1000" > Tank </option>\
        <option value="1,750" > Drone </option>\
        <option value="1,150" > Helicopter </option>\
        <option value="1,100" > GunShip </option>\
        <option value="1,120" > Fighter </option>\
        <option value="1,280" > Bomber </option>\
        <option value="1,85" > Cargo </option>\
        <option value="1,90" > Hellfire</option>\
        <option value="1,80" > Stealth </option>\
        <option value="1,380" > Nuke </option>\
         <option value="1,680" > Ion Cannon </option>\
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
      document.getElementById('ptplayErr').innerHTML = 'Search by typing .. You must be at least 3 characters!';
      return;
    }
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching For....</center>';
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
	

    var m = '<DIV class=ptstat>Showing Player: <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=100% align=center class=ptTab cellspacing=5>\
	  <TR style="font-weight:bold">\
	  <TD width=25%>Player Name</td><TD align=right width=15%>Power</td><TD width=15%> &nbsp; Online</td><TD width=15%>Facebook Prfl.&nbsp;</td><TD width=75%>Overview</td></tr>';
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
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldRed><blink><b>ONLINE</b></blink></span>":"") +'</td>\
          <div style="width:100%;filter:Glow(color=#F20A15, strength=12)">\
		  <TD align=center><A style="color:#1D0AF2" target="_tab" href="http://www.facebook.com/profile.php?id='+ u.Fbuid +'">FB Profile</a></div></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A style="color:#1D0AF2">Details</a> &nbsp; <BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A style="color:#1D0AF2">Last login:</a></span></td></tr>';
    }
    m += '</table></div>';
    document.getElementById('allListOut').innerHTML = m;
  },
  clickedPlayerDetail : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "Detail is reached ..";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },
  clickedPlayerLocator : function (span, uid){
    var t = Tabs.AllianceList;
    t.fetchPlayerInfo2 (uid, function (r) {t.gotPlayerInfo2(r, span)});
  },  
  clickedPlayerGetLastLogin : function (span, uid){
     var t = Tabs.AllianceList;
     span.onclick = '';
     span.innerHTML = "detail is reached ...";
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
      span.innerHTML = "detail is reached...";
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
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD>Alliance: '+ a +' &nbsp; Cities: '
          + u.cities +' &nbsp; POP: '+ u.population +'</td></tr><TR><TD>Providence: ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  eventMyAllianceSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>SEARCHING ...</center>';
    t.fetchAllianceMemberList (getMyAlliance()[0], null, t.eventGotMemberList);
  },  
    
  aName : '',
  eventSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = 'Log In Search .. You must be at least 3 characters!';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>SEARCHING ...</center>';
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
       document.getElementById('allListOut').innerHTML = 'To use this feature you must be a member of the Alliance ..!';
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
        if (rsltA.msg.indexOf("PLEASE JOIN AN ALLIANCE")!=0 || !rsltM.ok){
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
        span.innerHTML = "SEARCHING...";
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
          m = '<span style="color:black">Last Login: '+lastLogin+'</span>';
        } else {
           m = '<span style="color:red">Last Login Found: '+lastLogin+'</span>';
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
            <DIV class=ptstat ><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab>Alliance: '+ allName +'</td>\
            <TD class=xtab width=80% align=center>Last login: <SPAN id=lastlogin>'+  rslt.playerInfo.lastLogin+'</span></td><TD class=xtab align=right></td></tr></table></div>\
            <div style="max-height:470px; height:470px; overflow-y:auto;"><TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD style="overflow-y:hidden;">\
            <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Player</div></a></td>\
            <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Power</a></div></td>\
            <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Cities</a></div></td>\
            <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Order</a></div></td>\
            <TD id=clickCol9 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Online</a></div></td>\
            <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>City Name</a></div></td>\
            <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Level</a></div></td>\
            <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coords</a></div></td>\
            <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance</a></div></td>\
            <TD id=clickCol10 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance Hsp.</a></div></td>\
		    <TD class=clickable><A><DIV>Last login</a></div></td></tr></thead>\
            <TBODY id=allBody style="background-color:#ffffff;"></tbody></table></div>\
            <DIV  width:100%; style="top:670px; left:0px; position:absolute; background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">';
    document.getElementById('allListOut').innerHTML = m;  //style="top:670px; left:0px; position:absolute;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Calculated Distance: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> &nbsp; Or, Select A City: <span id=dmcoords></span></td></tr></table>';
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
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed>ONLINE</span>":"") +'</td>\
          <div style="width:100%;filter:Glow(color=#F20A15, strength=12)">\
		  <TD align=center><A style="color:#1D0AF2" target="_tab" href="http://www.facebook.com/profile.php?id='+ u.Fbuid +'">FB Profile</a></div></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A style="color:#1D0AF2">Details</a> &nbsp; <BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A style="color:#1D0AF2">Last login</a></span></td></tr>';
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
  tabLabel : 'LOG',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,
    
  init : function (div){
    var t = Tabs2.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pbStat>Action Log - Version: '+ Version+'</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
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
/*********************************** Options Tab ***********************************/
Tabs.Options = {
  tabOrder : 55,
  tabLabel : 'Options',
  cont : null,

  init : function (div){
    var t = Tabs.Options;
    t.cont = div;
    
    try {      
      m = '<TABLE class=ptTab>\
        <TR><TD colspan=2><B>SETTINGS:</b></td></tr>\
        <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Enable window drag (move window by dragging top bar with mouse)</td></tr>\
		<TR><TD><INPUT id=ptahelpenable type=checkbox /></td><TD>Auto Help Alliance Members(Alliance Chat)</td></tr>\
        <TR><TD><INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/></td><TD>Enable widescreen: '+ htmlSelector({normal:'Normal', wide:'Widescreen', ultra:'Ultra'},GlobalOptions.pbWideScreenStyle,'id=selectScreenMode') +' </td>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>Put chat on right (requires wide screen)</td></tr>\
		<TR><TD><INPUT id=pbWMapEnable type=checkbox /></td><TD>Use WideMap (requires wide screen)</td></tr>\
		<TR><TD><INPUT id=pbrmmotdEnable type=checkbox /></td><TD>Remove MOTD (below your cities)</td></tr>\
		<TR><TD><INPUT id=pbEveryEnable type=checkbox /></td><TD>Refresh GW every: <INPUT id=pbeverymins type=text size=2 maxlength=3 \> Minutes</td></tr>\
		<TR><TD><INPUT id=pbFoodToggle type=checkbox /></td><TD>Enable Food Alert (On less then 2 Hours of food checked every hour)</td></tr>\
		<TR><TD><BR> </td></tr>\
		<TR><TD colspan=2><B>Auto Collect:</b></td></tr>\
		<TR><TD><INPUT id=ptgoldenable type=checkbox /></td><TD>Auto collect gold when happiness reaches <INPUT id=ptgoldLimit type=text size=2 maxlength=3 \>%</td></tr>\
		<TR><TD><INPUT id=ptoilenable type=checkbox /></td><TD>Auto collect oil</td></tr>\
		<TR><TD><INPUT id=ptfoodenable type=checkbox /></td><TD>Auto collect Food</td></tr>\
		<TR><TD><INPUT id=ptMCenable type=checkbox /></td><TD>Auto Collect Launch Vehicle</td></tr>\
		<TR><TD><INPUT id=ptWHenable type=checkbox /></td><TD>Auto collect Nukes</td></tr>';
		m += '</table><BR><BR><HR>Note that if a checkbox is greyed out there has probably been a change of KofC\'s code, rendering the option inoperable.';
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

/*********************************** ATTACK TAB ***********************************/
Tabs.PodTools = {
    tabOrder : 284,
	tabLabel : 'Attack',
    cont : null,
    AttackTimer : null,
    Attacking : null,

    init : function (div){
        var t = Tabs.PodTools;
        t.cont = div;

        try {
            m = '<TABLE class=ptTab>\
            <TR><TD colspan=2><B>Auto Attack Options:</b></td></tr>\
            <TR>\
                <TD><INPUT id=PodAttack     type=checkbox /></td><TD>Enable Terrorist Camps Attack</td>\
                <td style="width:5em"></td>\
                <TD><INPUT id=AttackWild type=checkbox /></td><TD>Enable Wilds Attack</td></tr>\
            <TR>\
                <TD><INPUT id=SupplyTruck   type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Supply Truck</td>\
                <td></td>\
                <TD><INPUT id=SupplyChopper type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Supply Helicopter</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackInfantry type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Infantry</td>\
                <td></td>\
                <TD><INPUT id=AttackChopper  type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Gunship</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackSniper  type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Sniper</td>\
                <td></td>\
                <TD><INPUT id=AttackFighter type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Fighter</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackAntitank type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Anti Tank</td>\
                <td></td>\
                <TD><INPUT id=AttackBomber   type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Bomber</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackSforces type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Special Forces</td>\
                <td></td>\
                <TD><INPUT id=SupplyJet     type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Cargo</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackMobileSAM type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; SAM</td>\
                <td></td>\
                <TD><INPUT id=AttackHellfire  type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Hellfire Tank</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackTank    type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Tank</td>\
                <td></td>\
                <TD><INPUT id=AttackStealth type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Stealth Bomber</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackPredator type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Drone</td>\
                <td></td>\
                <TD><INPUT id=AttackNuke     type=text size=4 maxlength=6 value=0 /></td><TD> &nbsp; Nuke</td>\
            </tr>\
            <TR><TD><BR> </td></tr>';
            m += '</table><BR><BR><HR>After entering the number of troops in the boxes above, just click on TC or Wild for the Auto Attack to Launch.!!';
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
                        actionLog("Attacking: General " + kk + " Budur " + count + " Enerjisi Maks.=" + maxenergy,true);
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
                var text = "Error: No Generals";
                actionLog(text,true);
                unsafeWindow.Modal.hideModalAll();
                unsafeWindow.Modal.showAlert(text);
                window.setTimeout('Modal.hideModal();', 3000);
                return;		
            }

            if(kk!==list.length+2) {
                var text = "Error: Attention: " + kk + " Has no energay";
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
				
				//Seed.outgoing_marches["c"+t.tcp.city.id]
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

/************************ Refresh Every ************************/
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
      actionLog ('Yenilendi: ('+ Options.pbEveryMins +' minutes expired)');
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
     if ( Left < 60) text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<small><FONT size=1px color=white>Next refresh in: </font></small><small><FONT color=red><B>'+ timestr(Left) +'</b></font></small></div>';
     else text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<small><FONT size=1px color=white>Next refresh in: <B>'+ timestr(Left) +'</b></font><small></div>';
    
	 t.box.innerHTML = text;
     t.timer = setTimeout (t.Paint, 1000);
  },
}
function reloadKOC (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  //var goto = window.location.protocol+'//apps.facebook.com/globalwarfaregame/?s='+serverId;
  var goto = 'https://plus.google.com/games/216622099218/params/%7B%22__kraken%22%3A%22fromgift%3D1%22%7D#games/216622099218/params/{%22__kraken%22%3a%22fromgift=1%22}';
  //var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=YENILENIYOR><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var t = '<FORM target="_top" action="'+ goto +'" method=get><INPUT id=xxpbButReload type=submit value=YENILENIYOR></form>';
  
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}
/************************ FOOD ALERT *************************/
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
                msg += ' is low on food. Remaining: '+addCommasWhole(foodleft)+' ('+timestrShort(timeLeft)+') uPKEEP: '+addCommas(usage);
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
      chat2.style.top = '65px';
      chat2.style.left = '763px';
      chat2.style.height = '550px';
      chat2.style.width = '316px';
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
      document.getElementById('mapwindow').style.width = "1220px";
      document.getElementById('mapwindow').style.zIndex = "50";
  	} else {
      t.rail.style.display = 'block';
      document.getElementById('mapwindow').style.height = "439px";
      document.getElementById('mapwindow').style.width = "760px";
      document.getElementById('mapwindow').style.zIndex = "";
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
  pop.getTopDiv().innerHTML = '<CENTER>BIGGYWILLS PT</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL RETRY" \>';
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
/************************ ERROR KILLER ************************/
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
/******************* CHAT PANE *****************/
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
/************************ WAR HEAD COLLECTOR ************************/
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
      actionLog ('COLLECTED:'+ rslt.gained.resource2 +' WARHEADS '+ t.colCityName, true);
    else
      actionLog ('ERROR COLLECTING WARHEADS '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
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
/************************ AUTO COLLECT LAUNCH VEHICLE ************************/
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
      actionLog ('COLLECTED '+ rslt.gained.resource2 +' LAUNCH VEHICLE '+ t.colCityName, true);
    else
      actionLog ('ERROR COLLECTING LAUNCH VEHICLE '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
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
/************************ AUTO COLLECT GOLD ************************/
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
      actionLog ('COLLECTED'+ rslt.gained.gold +' GOLD FOR '+ t.colCityName +' ( '+ t.colHappy +')', true);
    else
      actionLog ('ERROR COLLECTING GOLD FOR: '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
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


/************************ AUTO COLLECT FOOD ************************/
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
      actionLog ('COOLECTED '+ rslt.gained.resource1 +' FOOD FOR '+ t.colCityName, true);
    else
      actionLog ('ERROR COLLECTING FOOD FOR'+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
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
/************************ AUTO COLLECT OIL ************************/
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
      actionLog ('COLLECTED '+ rslt.gained.resource2 +' OIL FOR '+ t.colCityName, true);
    else
      actionLog ('ERROR COLLECTING OIL FOR '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
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

/************ DEBUG WIN *************/
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
  AddSubTabLink('INFO', eventHideShow2, 'pbinfo');
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

var CHAT_BG_IMAGE = "data:image/jpg;base64,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";
var FOOD_IMAGE = '"data:image/gif;base64,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"';
var OIL_IMAGE = '"data:image/gif;base64,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"';
var STONE_IMAGE = '"data:image/gif;base64,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"';
var STEEL_IMAGE = '"data:image/gif;base64,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"';
var GRAPH_IMAGE = '"data:image/gif;base64,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"';
var TITA_IMAGE = '"data:image/gif;base64,R0lGODlhMAAuAHAAACH5BAEAAPwALAAAAAAwAC4AhwAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAAAj/APcJHLivx6dSBxMiXKiwIcOHnz4NIUiRIJGK+gZmJLhRYMeOFC9WJOhDH7RMdTC5ofPGzSc3b16+8QTzZSaWmFK+0Unz0xt9+kSOnKjPDZEzPnyI6YHGB1OmSdH08CG1KVUfSLFedeMGWsGRF58RwXHjwI0YZ8/GaIC2bdq3aNOajYsDzbN9bii60ZfMxw0DMQAAMCCYsAEVgwevIHwAwAEVjCEvHhwARoMbPkoVHXgmWt+/AQ4/Dr0CQOnRkEkfNlDZsWLThBdf/oS3oDJoNxoYmBwaAIwAlEUrXn2A9e/DvZEb2G3g8jNlPW58QoPjOGwVwAEE/j3csYHGMb7D/yiu4nHj3ZQt4/jUo0emMDccQwYQurxg+jBch9//3cB47/LRh1x+aGVyww1uiHFAYPjBBkB5821nWHE3DKHEBIAxZ591riF4oIH5MVdYAPa5pt8BllUIRRJDFOfiaw8+pl0MbhyIyVkkCljafK0tVt53NkygxBNQQDFEAzagqF1iDDamXY0eJiaja625ZpwBN2QwZJFF9uDicqUR1lp5MaBhowzoIcYaZIg1JtlyAQyRhB5cEnnkeNb5aCIMULrRZICsCZZaeg30MAEUROZRZBI99FcicMqt0GcMY1KG2HEkMoflBDBMQMQQoHaJYnFL5hcmiX0O6iaVDzKmWAZ/Hf/AQAMHNPDEhQw8xpqYhMFW5oF+Piisk74lVl9xjWYYAwM3JGFkrP5VOZlgUKLhmpMQNkairqHdMEFx3+VqQA8r6mafmPktGcMZB7YRGGIlChailQBE5xuKgM26YqzpCUasAX7dYC299gGn65tDfDcYuAfYQEQSuoXHG7yjsXtDDwya5hqbu4aGLLe/jWfAEFB4uRxh8zlJWHQ3nCEYg4dd6xuY4+q263LgkptwYI2tqnFcF2fXa28p/1jzhpnKZmR/IfubWL0H3pAfiVX2bNmR3yXLGM7LNUuEzb3JiJ1vUfeQY69uMgYqo4aGh+9k4R2axF/hpRtor1H/tbHTKBb/2sCQSoh73s0xkAwF2N8h5tu2eaPcb4g9MNBckUMkCQNgg4XXgLNPYEwzZfcBYMOBPZjYm8dtL0cuFIF/Gd53N9ipG6mBrdYt6cLld7lvE/yV4QTOtpjhcq83QDKLDfwn5mAqMHtxcfn17Fh7/UVM7hO+f9m38UP0METm2m19oA09JF9caCJH7uJ4szo7QZLKitffAY2CG9m4pCfJAJ7gEnEgs7MaT4WOBKpCTcBQCDxgi0KGL1ndgFnlQ9KXxhOkHmTAexZM4BAeNoQDIql35ctNf+ZnmegwoAc2oJXlDiCr4iCpAZcxoPcyMIQMfKo5llmODXAYv2VdjAGFe2EK/1NomSKyMIUMQGLDFgTAZS3RLIApjhORyLIOhrABAMzNECWYmxRh8YFQTJ4Ym8MsHF5Ggd9JwoV6IIErPjCGuXnhC5kFwxS+MDfMSlIKc8ODQmVgbgVh3QUb0Mc9CjGGbrwjHR+Ym0a+sHyh6sFAehAFJXTvgL1roww1yYMDdtJboFzkB/d4wD+WjCKUhMIFE8hKVmKyPa88YBtjacEh6EGSFbmBHqJAQwUqUIPtWeUFfem9CVwSlnI65Uj20QA9KEEDNfwUCLQEAiU8s5oaUAIIiPABIoBgCBpIggaIYEMaXlAJylzmPm4ABUUR6Ql6eOcTnpCHedoTUfh8Zz7zeSADdRKEnUqgE6LoAAVnFomgzoynMxW10ILOKaCArEhAAAA7"';
var GOLD_IMAGE = '"data:image/gif;base64,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"';


