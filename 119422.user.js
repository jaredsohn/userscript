// ==UserScript==
// @name           PaulTools
// @namespace      podcasting101
// @description    Automatic processing
// @version        20111118pod.9
// @include        http://apps.facebook.com/globalwarfaregame/*
// @include        https://apps.facebook.com/globalwarfaregame/*
// @include        http://*.globalwarfaregame.com/*main_src.php*
// @include        https://*.globalwarfaregame.com/*main_src.php*
// ==/UserScript==

var Version = '20111118pod.9';

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
        logit('WarnAttackEnabled: reset', false);
        document.getElementById('pttcPodTools').removeAttribute("style");
    }
    else {
        logit('WarnAttackEnabled: enable', false);
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

function SetBuildError(errmsg,id) {
try { logit('SetBuildError: ID=' + id,true); } catch(err) { logit('BAD reference for ID.',true); }
    document.getElementById('pbbuildError').innerHTML = errmsg;
    if (errmsg == null) {
        logit('SetBuildError: reset', true);
        document.getElementById('pbbuildqueues_'+id).style.color="black";
        document.getElementById('pttcbuild').removeAttribute("style");
    }
    else {
        logit('SetBuildError: errmsg="' + errmsg + '"', true);
        document.getElementById('pbbuildqueues_'+id).style.color="red";
        document.getElementById('pttcbuild').style.color="red";
    }
}

function SetOverviewError(inerror) {
    if (inerror == null || inerror == false) {
        logit('SetOverviewError: reset', false);
        document.getElementById('pttcOverview').removeAttribute("style");
    }
    else {
        logit('SetOverviewError: ON', false);
        document.getElementById('pttcOverview').style.color="red";
    }
}

function RemoveMainScreenButton(ButtonClass) {
    // btn-petro-lab  btn-daily-reward  btn-greenhouse  btn-warhead-factory  btn-gift  btn-fortuna  btn-chest
    // Repeat to ensure we get all the hidden ("display:false") elements
    logit("RemoveMainScreenButton: Trying Button = " + ButtonClass,false);
    for (var x=1; x<5; x++) {
        var Buttons = document.getElementsByClassName(ButtonClass);
        for (var i=0; i<Buttons.length; i++) {
            if(Buttons[i]) {
                logit("Removing button(" + x + ") " + ButtonClass + " (" + i + ") ",false);
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

    var color = null;
    var automode = null;
    var buildmode = null;
    var state = null;

    if(document.getElementById("pbBuildRunning")) {
        if (document.getElementById("pbBuildRunning").value == "Auto Build = ON") {
            automode=1;
        } else {
            automode=0;
        }
    }
    if(document.getElementById("pbBuildMode")) {
        if (document.getElementById("pbBuildMode").value == "Build Mode = ON") {
            buildmode=1;
        } else {
            buildmode=0;
        }
    }

    if(automode) {
        if(automode && buildmode) {
            state = "both";
        } else {
            state = "autobuild";
        }
    } else {
        if(buildmode) {
            state = "buildmode";
        } else {
            state = "neither";
        }
    }
    
    logit ('Color state is '+ state +'.', true);
 
    switch (state) {
        case "autobuild" : { color='#22AA22'; break; } // green
        case "buildmode" : { color='#AA0000'; break; } // red-ish
        case "both"      : { color='#DDDD00'; break; } // red-green (yello?)
        case "neither"   : { color='#ca5'   ; break; } // tan default
        case "error"     : { color='#DD2222'; break; } // red
        default          : { color='#ca5'   ; break; } // tan default
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

/* End of Pod Tools */





// Test switches
var DEBUG_TRACE = false;
var DEBUG_BUTTON = true;
var ENABLE_INFO = true;
var ENABLE_CHAT = false;
// End Test switches

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCseconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
// The above line phreaks out my editor so I add a single quote here \\'
var JSON2 = JSON;

// try { alert('LOADED!'); } catch(err) { }  //https://apps.facebook.com/globalwarfaregame/?page=choosegift&s=4
// skip past the "gift your loser friends" intro page
// erm actually no, this makes it impossible to gift...?
// if (document.URL.search(/apps.facebook.com\/globalwarfaregame\/\?page=choosegift/i) >= 0){
    // var ThisURL = document.URL.replace(/page=choosegift&/,'');
    // window.location = ThisURL;
// }
//    if (GiftRef[i].innerHTML.search(/Select a FREE gift to send to your friends/i) >=0 ) {
//      window.location.reload; }
/*
<div class="kb-gw-modal-iframe-765">
<div class="kb-gw-modal-header"></div>
<div class="kb-gw-modal-mid">
<div class="kb-gw-modal-footer">
<a class="kb-gw-modal-close" target="_top" href="https://apps.facebook.com/globalwarfaregame/?fromgift=1">
Select a FREE gift to send to your friends!
        <div class="kb-gw-gift-items">
        <!-- boost items -->
        <ul class="clearfix">
            <li>
                <a data-itype="5" data-gid="113" data-s="26" target='_top' class="kb-gw-items item_113 select-gift kb-gw-tooltip" href="https://apps.facebook.com/globalwarfaregame/?fromgift=1"><span>Quick Grow</span></a>
                </li>
            <li>

*/
if (document.URL.search(/apps.facebook.com\/globalwarfaregame/i) >= 0){

    try {
        logit("ENTER! URL=" + window.location,true);
        //alert("ENTER! URL=" + window.location);
        
        if (document.URL.search(/apps.facebook.com\/globalwarfaregame\/\?page=choosegift/i) >= 0){
            var ThisURL = document.URL.replace(/page=choosegift&/,'');
            //alert("New URL=" + ThisURL);
            window.location = ThisURL;
        }

        if (document.URL.search(/apps.facebook.com\/globalwarfaregame\/\?page=fromgift/i) >= 0){
            var ThisURL = document.URL.replace(/page=fromgift.*$/,'');
            //alert("New URL=" + ThisURL);
            window.location = ThisURL;
        }


/*



        //var GiftRef = document.getElementsByTagName("span");
        var GiftRef = document.getElementsByTagNameNS("*", "a");
        logit("Found " + GiftRef.length + " tags.",true);
        alert("Found " + GiftRef.length + " tags.");

for (x=1;x<50;x++) {
    logit("ZERO!  try #" + x,true);
    if (GiftRef.length == 0) { GiftRef = document.getElementsByTagNameNS("*", "div"); } else { break; }
}
logit("Found " + GiftRef.length + " tags THIS time in " + x + " tries.",true);
alert("Found " + GiftRef.length + " tags THIS time in " + x + " tries.");
var m="";
        for (var i=0; i<GiftRef.length; i++) {
            // The URL should be http://apps.facebook.com/globalwarfaregame/?s=nn
//logit(inspect(GiftRef[i],1,false),true);
            m+=GiftRef[i].className + " ";
            if(GiftRef[i].className == "kb-gw-gift-items") {
alert("GOT IT!");
                logit("SPAN='" + GiftRef[i].innerHTML + "'",true);
                var ThisServer = GiftRef[i].getElementsByTagName('a')[1].data-s;
                var ThisURL = document.URL.replace(/globalwarfaregame.*$/,'globalwarfaregame/?s=' + ThisServer);
                logit("ThisURL=" + ThisURL,true);
                window.location = ThisURL;
            }
        }
        alert(m);
        logit("Found " + GiftRef.length + " tags.",true);



*/


    } catch(e) {logit("ERR:" + e.name + ' : ' + e.message,true); }


    facebookInstance ();
    return;
}

if (document.URL.search(/globalwarfaregame.com/i) >= 0){
    GameWideScreen ();
}

function GameWideScreen(){
	var iFrame = parent.document.getElementsByTagName('IFRAME');
	iFrame[0].style.minWidth = '1620px';
	iFrame[0].style.width = '100%';
	while ( (iFrame=iFrame.parentNode) != null) {
    	iFrame.style.width = '100%';
        iFrame.style.height = '2601px';
    }
}

/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
logit("Entering function facebookInstance()",true);
  function setWide (){
	var iFrame = document.getElementById('iframe_canvas');
	if (!iFrame){
	  setTimeout (setWide, 1000);
	  return;
	}
	iFrame.style.width = '100%';
  	iFrame.style.height = '2609px';
    logit('IFRAME2=' + inspect(iFrame,1,1,false),true);

// if(iFrame.contentWindow.document.getElementById('iframe_canvas'))
//    iFrame.contentWindow.document.getElementById('iframe_canvas').style.height=2606;
// if(document.getElementById('iframe_canvas'))
//   document.getElementById('iframe_canvas').style.height=2607;


	while ( (iFrame=iFrame.parentNode) != null)
	  if (iFrame.tagName=='DIV')
		iFrame.style.width = '100%';
        logit('IFRAME3=' + inspect(iFrame,1,1,false),true);

//<iframe scrolling="no" height="600px" frameborder="0" src="javascript:&quot;&quot;" name="iframe_canvas" id="iframe_canvas" class="canvas_iframe_util noresize" style="width: 100%; height: 1646px; overflow-y: hidden;">
//  <html class="yui3-js-enabled"><head>
//    <body style="background:red;" id="mainbody">

// iframe id="iframe_canvas" style.height=2600px
// body id="mainbody" style.background=red


	
    // rearrange page (move all game elements down, etc.)
    var e = document.getElementById('mainContainer');
	if(e){
		document.getElementById('content').style.minWidth = '1620px';
		for(i=0; i<e.childNodes.length; i++){
			if(e.childNodes[i].id == 'contentCol'){
				e.childNodes[i].style.width = '100%';
				e.childNodes[i].style.margin = '0px';
				e.childNodes[i].style.paddingTop = '30px';
				break;
			}
		}
	}
	var e = document.getElementById('globalContainer');
	if(e){
		e.style.width = '100%';
		if(e.firstChild){
			e.firstChild.style.width = '80%';
			// e.firstChild.style.margin = '0 10%';
			e.firstChild.style.margin = '0 0';
		}
	}

    // remove the right-column formatting that clips
    var MyContent=document.getElementById('contentCol');
    if (MyContent) { MyContent.class='clearfix'; }
    
    // lengthen the page
//    var MyContent=document.getElementById('fb-root');
//alert(inspect(MyContent,2,1,false));
    //.window.document.getElementByTagName('IFRAME');
    //if (MyContent) { MyContent[0].height=2929; }


    var div = searchDOM (document.getElementById('content'), 'node.tagName=="DIV" && node.id.indexOf("rightCol")>=0', 7);
    if (div){
		div.style.display ='none';
	}
    
  }
  setWide();
}

var Options = {
	ptWinIsOpen	:	false,
	ptWinDrag	:	true,
	ptWinPos	:	{},
	ptTrackOpen	:	true,
	includeCity	:	true,
	includeMarching	:	false,
	includeTraining	:	false,
	overviewAllowOverflow	:	false,
	overviewFontSize	:	12,
	pbgoldenable	:	true,
	pboilenable     :	true,
	pbfoodenable	:	true,
	pbnukeenable	:	true,
    pbGoldLimit     :	100,
    pbTrainTimeRef  :   120,
    enableFoodWarn  :   true,
    hoursFoodWarn   :   1,
};

var Seed = unsafeWindow.seed;
var Tabs = {};
var mainPop;
var Cities = {};
var ptStartupTimer = null;
var CPopUpTopClass = 'ptPopTop';

function ptStartup (){
  clearTimeout (ptStartupTimer);
  if (unsafeWindow.ptLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    ptStartupTimer = setTimeout (ptStartup, 500);
    return;
  }
  unsafeWindow.ptLoaded = true;
  //logit ("KofC client version: "+ anticd.getKOCversion());
  
  Seed = unsafeWindow.seed;
  var styles = '.ptTabs {color:black; font-size:12px}\
	.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    table.ptTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .hostile td { background:red; }.friendly td{background:lightgreen; }.ally td{background:lightblue; }\
	table.ptTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.ptOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.ptSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.ptTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
	table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none;}\
    table.ptTabOverview tr td {border-left:1px solid #ccc; white-space:nowrap; padding: 1px;}\
    table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .ptDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
	.ptOddrow {background-color:#eee}\
    .ptStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .ptStatLight {color:#ddd}\
	.ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
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
    tr.ptPopTop td { background-color:#ded; border:none; height: 21px;  padding:0px; }\
    tr.ptretry_ptPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.ptMainPopTop td { background-color:#ded; border:none; height: 42px;  padding:0px; }\
    tr.ptretry_ptMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px; overflow:auto;}\
    .CPopup  {border:3px ridge #666}\
    span.ptTextFriendly {color: #080}\
    span.ptTextHostile {color: #800}\
	.ptButCancel {background-color:#a00; font-weight:bold; color:#fff}\
    div.indent25 {padding-left:25px}';
    
  window.name = 'PT';
  logit ("* Gl0bal W@rfare P0wer T00ls v"+ Version +" Loaded", true);
  readOptions();
  // wtf gus
Options.includeMarching = false;  saveOptions ();
  // wtf gus
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y;
    saveOptions ();
  }
  
  mainPop = new CPopup ('pt', Options.ptWinPos.x, Options.ptWinPos.y, 425,1000, Options.ptWinDrag,
      function (){
        tabManager.hideTab();
        Options.ptWinIsOpen=false;
        saveOptions()
      });
  mainPop.autoHeight (true);
  mainPop.autoWidth (true);

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';

  // delete banner ad and music
  RemoveBadElements();

  //  add the "TOOLS" button and main popup window
  AddMainTabLink('TOOLS', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());

  // configure delayed startup for collectors
  setTimeout(TimerStartup,30*1000);
  
    function TimerStartup() {
        CollectGold.init();
        CollectOil.init();
        CollectFood.init();
        CollectNuke.init();
        CleanupButtons();
    }

  if (Options.ptWinIsOpen && Options.ptTrackOpen) {
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);

  // delete unwanted screen buttons
  CleanupButtons();

if (window.top != window.self) {  //-- Don't run on frames or iframes
    return;
} else {
    // wtf?
    alert("whut");
    try { alert("DUDE!" + window.frames[0].document.getElementById("fb-root")); } catch(err) { }
    try { alert("DUDE1!" + window.frames[1].document.getElementById("fb-root")); } catch(err) { }
    try { alert("DUDE2!" + window.frames[2].document.getElementById("fb-root")); } catch(err) { }
    try { alert("DUDE3!" + window.frames[3].document.getElementById("fb-root")); } catch(err) { }
}

}



/****************************  Overview Tab ******************************/
function getResourceProduction (cityId){
    var ret = [0,0,0,0,0,0,0,0,0];
    var now = unixTime ();
  
    var wilds = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var w = Seed.wilderness["city" + cityId];
    for (var k in w) {
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
        
        var GreenHouse = 0;
        if (i==1 & Seed.buildings["city" + cityId].pos99[0] == 23) {
            GreenHouse = Seed.buildings["city" + cityId].pos99[1];
            items += GreenHouse/10;
        }
        
        var tech = Seed.tech["tch" + i];
        ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + wilds[i]/20) * workerFactor));
    }
    return ret;  
}

//  Seed.buildings["city" + cityId]["pos" + i][0] == ...
//  5=Residence
//  6=Casino
//  7=Generals Headquarters
//  8=Embassy
//  9=Supply Bunker
// 10=Black Market
// 11=University
// 12=Rally Point
// 13=Barracks
// 14=Satellite Station
// 15=Factory
// 16=Air Traffic Control
// 17=Tank Depot
// 18=Logistics Center
// 19=Wall
// 20=R&D
// 21=Distribution Center
// 22=Petro
// 23=Greenhouse
// 24=Nuke


Tabs.Overview = {
    tabOrder : 1,
    cont : null,
    displayTimer : null,

    Overview : function (){
    },

    init : function (div){
        this.cont = div;
        if (Options.overviewAllowOverflow)
            this.cont.style.overflowX = 'visible';
    },

    hide : function (){
        clearTimeout (Tabs.Overview.displayTimer);
    },
  
    show : function (){
        var rownum = 0;
        var t = Tabs.Overview;

        clearTimeout (t.displayTimer);

        function _row (name, row, noTotal) {
            var style  = ' style = "background: #e8e8e8; text-align:right;"';
            var style2 = ' style = "background: #e8e8e8; text-align:right; color:red;"';
            if (rownum++ % 2) {
                style    = ' style = "background: #ffffff; text-align:right;"';
                style2   = ' style = "background: #ffffff; text-align:right; color:red;"';
            } 
            var tot = 0;
            var m = [];
            m.push ('<TR ' + style + '><TD' + style + '><B>');
            m.push (name);
            m.push (' &nbsp; </td>');
            if (noTotal){
                m.push ('<TD' + style + '> &nbsp;</td>');
            } else {
                for (i=0; i<row.length; i++) {
                    tot += parseInt(row[i]);
                }
                if (tot<0) {
                    m.push ('<TD style="background: #ffc; text-align:right; color: red;">');
                } else {
                    m.push ('<TD style="background: #ffc; text-align:right;">');      
                }
                m.push (addCommas(tot));
                m.push ('</td>');
            }
            for (i=0; i<row.length; i++) {
                if (row[i]<0) {
                    m.push ('<TD' + style2 + '>');
                } else {
                    m.push ('<TD' + style  + '>');
                }
                if(/\.$/.test(row[i])) {
                    // make bold; addCommas will remove the trailing decimal
                    m.push ('<b>' + addCommas(row[i]) + '</b>');
                } else {
                    m.push (        addCommas(row[i])         );
                }
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
        str =  '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;">';
        str += '<TABLE cellspacing=0 cellpadding=0 class="ptTab ptStat" width=97%>';
        str += '<TD><SPAN class=ptStatLight>Power:</span> ' + addCommas(Seed.player.might) + '</td>';
        str += '<TD><SPAN class=ptStatLight>Alliance:</span> ' + getMyAlliance()[1] + '</td>';
        str += '<TD align=right><SPAN class=ptStatLight>Domain:</span> ' + unsafeWindow.domainName +'</td></tr></table></div>';

              
        str += "<DIV id=overMainDiv style='font-size:"+ Options.overviewFontSize;
        str += "px'><TABLE class=ptTabOverview cellpadding=0 cellspacing=0><TR valign=top><TD width=65></td><TD width=88 style='background: #ffc; text-align:right;'><B>TOTAL</b></td>";
        for(i=0; i<Cities.numCities; i++) {
            str += "<TD width=81 style='text-align:right;'><B>"+ Cities.cities[i].name.substring(0,11);
            str += '</b><BR>'+ Cities.cities[i].x +','+ Cities.cities[i].y +"<BR>"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"</td>";
        }
        str += "</tr>";
	  
        str += "<TR><TD></td><TD style='background: #ffc; text-align:right;'></td>";
        for(i=0; i<Cities.numCities; i++){
            cityID = 'city'+Cities.cities[i].id;
            Gate = parseInt(Seed.citystats[cityID].gate);
        if(Gate == 0)
            str += '<TD>Hiding</td>';
        else
            str += '<TD><SPAN class=boldRed>Defending</span></td>';
        }
  
        rows = [];
        rows[0] = [];
        rows[99] = [];
        for(i=0; i<Cities.numCities; i++) {
            cityID = 'city'+ Cities.cities[i].id;
            rows[0][i] = parseInt(Seed.citystats[cityID].gold[0]);
            rows[99][i] = parseInt(Seed.citystats[cityID].pop[0]) - parseInt(Seed.citystats[cityID].pop[3]);
        }

        for (r=1; r<9; r++){
            rows[r] = [];
            for(i=0; i<Cities.numCities; i++) {
                cityID = 'city'+ Cities.cities[i].id;
                rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0] / 3600);
                var ProdCap = Seed.resources[cityID]['rec'+r][2] * 100;
                if (ProdCap && rows[r][i] >= ProdCap) rows[r][i] += '.';  // trailing decimal causes bold text
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
        str += _row ('Idle Pop.', rows[99]);
        str += '<TR><TD colspan=12><BR></td></tr>';
        for (r=1; r<20; r++){
            rows[r] = [];
            for(i=0; i<Cities.numCities; i++) {
                rows[r][i] = 0;
            }
        }
        if (Options.includeCity){
            for (r=1; r<20; r++){
                for(i=0; i<Cities.numCities; i++) {
                    cityID = 'city'+ Cities.cities[i].id;
                    rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
                }
            }
        }
        if (Options.includeMarching){
        for (var i=0; i<20; i++)
            logit("SHIT!!!!!!!",true);
            rows[i][Cities.numCities] = march.marchUnits[i];
        }
        if (Options.includeTrainingTotal){
            for (var i=0; i<20; i++)
            rows[i][Cities.numCities+1] = train.trainUnts[i];
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
        // for(i=0; i<20; i++)
            // str += _row (unsafeWindow.arStrings.unitName['u'+i], rows[i]);
        str += _row ('SupTruck', rows[1]);
        str += _row ('Infantry', rows[5]);
        str += _row ('Sniper', rows[6]);
        str += _row ('AntiTank', rows[4]);
        str += _row ('Spc Forces', rows[18]);
        str += _row ('SAM', rows[7]);
        str += _row ('Tank', rows[8]);
        str += _row ('Drone', rows[17]);
        str += _row ('Helicopter', rows[9]);
        str += _row ('Gunship', rows[11]);
        str += _row ('Fighter', rows[10]);
        str += _row ('Bomber', rows[12]);
        str += _row ('Cargo', rows[19]);
        str += _row ('Hellfire', rows[16]);
        str += _row ('Stealth', rows[13]);
        str += _row ('Nukes', rows[15]);
        str += '<TR><TD colspan=12><BR></td></tr>';
      
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
     
        str += _row ('Upkeep', row3);
        str += _row ('Production', row2);      
        str += _row ('Food +/-', row);
      
        for(i=0; i<Cities.numCities; i++) {
            if (row[i] >= 0)
                row[i] = '----';
            else {
                var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-row[i]) * 3600;
                if (timeLeft > 86313600)
                    row[i] = '----';
                else {
                    if (Options.enableFoodWarn && timeLeft<(Options.hoursFoodWarn*3600)) {
                        SetOverviewError(true);
                        row[i] = '<SPAN class=whiteOnRed>'+ timestrShort(timeLeft) +'</span>';
                    } else {
                        SetOverviewError(false);
                        row[i] = timestrShort(timeLeft);
                    }
                }
            }
        }    
        str += _row ('Food left', row, true);
        str += '<TR><TD><BR></td></tr>';
      
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
        str += _row ('#Wilds', row, true);
  
        row = [];
        for(i=0; i<Cities.numCities; i++) {
            var totKnights = 0;
            var level = 0;
            var thislevel = 0;
            var dat = Seed.knights['city'+ Cities.cities[i].id];
            for (k in dat) {
                ++totKnights;
                // logit(inspect(dat, 8, 1, false),true);
                //logit('Inspecting ' + k + inspect(dat[k].string, 8, 1, false),true);
                // var thislevel = generals.Knightlevel[k];
                if (thislevel > level) level = thislevel;
            }  
            // row[i] = totKnights + '(LVL=' + level + ')';
            row[i] = totKnights;
        }
        str += _row ('#Generals', row, true);

        var now = unixTime();
        var row = [];
        for(i=0; i<Cities.numCities; i++) {
            var totTime = 0;
            var q = Seed.outgoing_marches['c'+Cities.cities[i].id]; 
            if (q!=null && q.length>0)
                totTime = q[q.length-1][3] - now;
            if (totTime < 0)
                totTime = 0;
            if (totTime < 3600)
                row[i] = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
            else
                row[i] = timestr(totTime);
        }
        str += _row ('TroopQ', row, true);
      
        var row = [];
        for(i=0; i<Cities.numCities; i++) {
            var wall = {};
            getWallInfo (Cities.cities[i].id, wall);
            var totTime = 0;
            var q = Seed.fortify_queue['city'+Cities.cities[i].id]; 
            if (q!=null && q.length>0)
                totTime = q[q.length-1][3] - now;
            if (totTime < 0)
                totTime = 0;
            if (totTime<1 && (wall.wallSpaceUsed < wall.wallSpace-4 || wall.fieldSpaceUsed < wall.fieldSpace-4))
                row[i] = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
            else
                row[i] = timestr(totTime);
        }
        str += _row ('WallQue', row, true);
        str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptoverOriginal'+ (Options.includeCity?' CHECKED':'') +'>Show Troops in City</td></tr>';
        str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +' DISABLED>Show Marching Troops/Resources</td></tr>';
        str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptoverIncTraining'+ (Options.includeTraining?' CHECKED':'') +' DISABLED>Show troops training in city</td></tr>';
        str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptoverIncTrainingTotal'+ (Options.includeTrainingTotal?' CHECKED':'') +' DISABLED>Show troops training totals</td></tr>';
        str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptOverOver'+ (Options.overviewAllowOverflow?' CHECKED':'') +'>Allow width overflow &nbsp; &nbsp; FONT SIZE: '+ htmlSelector ({9:9, 10:10, 11:11, 12:12}, Options.overviewFontSize, 'id=ptoverfont') +'</td></tr>';
        str += "</table></div>";
        str+= 'Lazy Tools Version : ' + Version;
        Tabs.Overview.cont.innerHTML = str;
        document.getElementById('ptoverOriginal').addEventListener('click', e_clickEnableTroops, false);
        document.getElementById('idCheck').addEventListener('click', e_clickEnableMarch, false);
        document.getElementById('ptoverIncTraining').addEventListener('click', e_clickEnableTraining, false);
        document.getElementById('ptoverIncTrainingTotal').addEventListener('click', e_clickEnableTrainingTotal, false);
        document.getElementById('ptOverOver').addEventListener('click', e_allowWidthOverflow, false);
        document.getElementById('ptoverfont').addEventListener('change', e_fontSize, false);
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
        function e_clickEnableTrainingTotal (){
            var t = Tabs.Overview;
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
            if (tf) {
                t.cont.style.overflowX = 'visible';
            } else {
                t.cont.style.overflowX = 'auto';
            }
        }
    },
};

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
//  (object) fortifications = [object Object]
//    (object) city40871 = [object Object]
//      (string) fort53 = 60000
//      (string) fort52 = 136000
//      (string) fort54 = 17000
//      (string) fort55 = 20000
//
//  (object) city50923 = [object Object]
//      (string) fort53 = 2000
//      (string) fort52 = 2000
//      (string) fort54 = 700
//      (string) fort55 = 600
//
//  (object) fortify_queue = [object Object]
//    (object) c40871 = [object Object]
//      (object) f791 = [object Object]
//        (string) id = 791
//        (string) type = 54
//        (string) quant = 16000
//        (string) needed = 256000
//        (string) progress = 0  <---always zero?
//        (string) ticker = 1317644637
//        (string) eta = 1317779374
//        (string) status = 2   <--- 2 or 0 (pending? or finished?)
//
//type 52=Stingers
//type 53=Mines
//type 54=Artillary Guns
//type 55=AAA Guns







/****************************  Build Implementation  ******************************
 TODO:
	 visu directly in the game of build queue elements
	 <span class="leveltag" style="left:60px;">10</span>
	 more todos within the code
 */
Tabs.build = {
    tabOrder: 1,
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
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = OFF"></td>';
        }
        else {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = ON"></td>';
        }
		m += '<TD><INPUT id=pbBuildMode type=submit value="Build Mode = OFF"></td>';
		m += '<TD>Build Type: <SELECT id="pbBuildType">';
		m += '		<OPTION value=build>level up 1</option>';
		m += '		<OPTION value=max>level max:9</option>';
		m += '		<OPTION value=destruct>destruct</option>';
		m += '</select></td>';
		//m += '<TD><INPUT id=pbHelpRequest type=checkbox DISABLED '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>Ask for help?</td>';
		m += '</tr></table></div>';
        m += '<DIV id=pbBuildDivQ class=ptStat>BUILD QUEUES</div><TABLE id=pbbuildqueues width=100% height=0% class=ptentry><TR>';
		for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2 id=pbbuildqueues_'+Cities.cities[i].id;
            m += ' style="font-weight:bold; text-align:center;">' + Cities.cities[i].name + '</td>';
        }
		m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value="Show"></center></td>';
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
        UpdateMainTabLink(); //podtools
        
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
      // document.getElementById('pbbuildError').innerHTML = '';
      if (t.buildStates.running == true) {
          var now = unixTime();
		  //logit ('Seed.queue_con: (now='+ now +')\n'+ inspect (Seed.queue_con, 3));
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
			  //logit ('City #'+ (i+1) + ' : busy='+ isBusy);               
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
				logit(cityName + ": Queue item deleted: Building Level equals 9 or higher!!!",true);
				return;
			};
			if (isNaN(curlvl)) {
				t.cancelQueueElement(0, currentcityid, time, false);
				logit(cityName + ": Found no correct value for current building!!!!",true);
				return;
			}
			if (l_bdgid != bdgid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				logit(cityName + ": Building Type does not match!!!!",true);
				return;
			}
			if (l_bid != bid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				logit(cityName + ": Building ID does not match!!!!",true);
				return;
			}
			if (l_curlvl < curlvl) {
					t.cancelQueueElement(0, currentcityid, time, false);
					logit(cityName + ": Queue item deleted: Buildinglevel is equal or higher!!!",true);
					return;
			}
			if (l_curlvl > curlvl && mode == 'build') {
					t.requeueQueueElement(bQi);
                    var bdgtype = unsafeWindow.buildingcost['bdg' + bdgid][0]
                    logit(cityName + ": Item requeued: " + bdgtype + " " + mode + " " + curlvl + "->" + l_curlvl,true);
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
							logit("Destructing " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " at " + cityName, true);
							Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
							if (params.cid == unsafeWindow.currentcityid)
								unsafeWindow.update_bdg();
							// if (document.getElementById('pbHelpRequest').checked == true)
								// t.bot_gethelp(params.bid, currentcityid);
							t.cancelQueueElement(0, currentcityid, time, false);
                            SetBuildError(null,currentcityid);
						} else {
							var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
							t.requeueQueueElement(bQi);
                            SetBuildError(errmsg,currentcityid);
							// document.getElementById('pbbuildError').innerHTML = errmsg;
							// logit(errmsg, true);
						}
					},
					onFailure: function(){
                        var errmsg='Connection Error while destructing! Please try again later.';
                        SetBuildError(errmsg,currentcityid);
						// document.getElementById('pbbuildError').innerHTML = "Connection Error while destructing! Please try later again";
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
						logit("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!");
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
								logit("Building " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " Level " + params.lv + " at " + cityName, true);								
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
                                SetBuildError(null,currentcityid);
							} else {
								var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
								if (rslt.error_code == 103) { // building has already the target level => just  delete
									t.cancelQueueElement(0, currentcityid, time, false);
									logit(errmsg + "\nQueue item deleted: Building at this Level already exists or build process already started!",true);
								} else {
									t.requeueQueueElement(bQi);
                                    errmsg = Cities.byID[currentcityid].name +': '+ errmsg + " Item was requeued. Check for retry count.";
                                    SetBuildError(errmsg,currentcityid);
									// document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name +': '+ errmsg + " Item was requeued. Check for retry count.";
								}
							}
					},
						onFailure: function(){
                            var errmsg="Connection Error while building! Please try again later.";
                            SetBuildError(errmsg,currentcityid);
							// document.getElementById('pbbuildError').innerHTML = "Connection Error while building! Please try later again";
						}
					});
				} else {
					t.requeueQueueElement(bQi); // requeue item if check is invalid
				}
			}
		} else {
			t.cancelQueueElement(0, currentcityid, time, false);
			logit("Queue item deleted: Building does not exist!!!",true);
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
		if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Type: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
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
                t.modalmessage('Due to building requirements (DI), buildings above level 9\nshould be manually built.');
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
        var timeout = 3000;
        var content = "autoclose after 3 seconds...<br><br>"
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
            obj.value = "Auto Build = OFF";
            for(i=0; i<Cities.numCities; i++)
                SetBuildError(null,Cities.cities[i].id);
        }
        else {
            t.buildStates.running = true;
            t.saveBuildStates();
            obj.value = "Auto Build = ON";
        }
	    UpdateMainTabLink(); //gus
    },
    toggleStateMode: function(obj){
		var t = Tabs.build;
        if (obj.value == 'Build Mode = OFF') {
			unsafeWindow.Building.buildSlot = t.bot_buildslot; // overwrite original koc function
			unsafeWindow.Building.buildMenu = t.bot_buildslot; // overwrite original koc function
			// var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
			// if(guardian.length >0)
				// guardian[0].addEventListener('click', t.bot_buildguardian, false);
            obj.value = "Build Mode = ON";
        }
        else {
			unsafeWindow.Building.buildSlot = t.koc_buildslot; // restore original koc function
			unsafeWindow.Building.buildMenu = t.koc_buildmenu; // restore original koc function
			// var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
			// if(guardian.length >0)
				// guardian[0].removeEventListener('click', t.bot_buildguardian, false);
			obj.value = "Build Mode = OFF";
        }
	    UpdateMainTabLink(); //gus
    },
	getCityNameById: function (cityId) {
    return Cities.byID[cityId].name;  	
	},
}

/*********************************** Info tab ***********************************/
Tabs.Info = {
  tabOrder : 20,
  cont : null,
  //tabDisabled : !ENABLE_INFO,

  init : function (div){
    var t = Tabs.Info;
	t.cont = div;
    t.ThisMany = 1;
    t.TrainTimeRef = Options.pbTrainTimeRef;
    t.show(t.cont);
  },
  
  show : function (div){
    var t = Tabs.Info;

// #@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#

    fortmight = {
        u52: "1",
        u53: "1",
        u54: "1",
        u55: "1",
    };

    rownum = 0;
    
    var m = '\
        <STYLE type="text/css">\
            table.t1  {margin-left:auto; margin-right:auto; border-spacing:0px; width:50%; padding:1px;}\
            table.t1 td {padding:1px 1px 1px 3px; text-align:right; white-space:nowrap;}\
            td.xHeader{background:#ffffe8; text-align:center; font-weight:bold; border:none;}\
            .xtabH    {background:#ffffe8; text-align:center; font-weight:bold; border:none;}\
            .xtabHL   {background:#ffffe8; font-weight:bold; text-align:center; border-width:1px; border-style:none none none solid;}\
            .xtabby     {font-weight:bold;}\
            .xtabR    {border-width:1px; border-style: none none none solid; padding-left:5px; margin-left:10px;}\
            .xtabL    {border-width:1px; border-style: none none none solid; padding-left:5px; margin-left:10px;}\
            .xtabLine {padding:0px; border-spacing:0px; height:3px; background:black;}\
            \
            .oddrow   {background:#ffffff;}\
            .evenrow  {background:#e8e8e8;}\
            .oddrowB  {background:#c8c8f8;}\
            .evenrowB {background:#b0b0e0;}\
        </style>\
    ';
    //m='';
    // xHeader= Header for section columns     (bold, center, no border, background color)
    // xtabH  = Header for column              (bold, center, no border, background color)
    // xtabHL = Header for column, new section (bold, center, left border, background color)
    // xtab   = First Column (y-axis)          (bold, rightj, no border)
    // xtabR  = Subsequent "normal" columns    (no border)
    // xtabL  = Normal column, new section     (left border strong)
    //
    var COSTCOLS=7;
    var STATCOLS=4;
    var EachVal = "EACH";
    if(t.ThisMany>1) { EachVal=t.ThisMany; }
    m += '\
        <DIV style="overflow-y:auto; overflow-x:hidden">\
        <DIV class=ptStat>UNIT INFORMATION</div>\
        <TABLE class=t1>\
        <TR>\
            <TD class=xHeader> </td>\
            <TD class=xHeader colspan=' + COSTCOLS + '>COST TO BUILD ' + EachVal + '</td>\
            <TD class=xHeader colspan=' + STATCOLS + '>STATS</td>\
            <TD class=xHeader>UPKEEP</td>\
        </tr>\
        <TR>\
            <TD class=xHeader> </td>\
            <TD class=xtabHL>Food</td>\
            <TD class=xtabH>Oil</td>\
            <TD class=xtabH>Stone</td>\
            <TD class=xtabH>Steel</td>\
            <TD class=xtabH>SR</td>\
            <TD class=xtabH>Pop</td>\
            <TD class=xtabH>Time</td>\
            <TD class=xtabHL>Life</td>\
            <TD class=xtabH>Atk</td>\
            <TD class=xtabH>Speed</td>\
            <TD class=xtabH>Load</td>\
            <TD class=xtabHL>Food</td>\
        </tr>\
    ';
    m += '<TR class=xtabLine><TD colspan=' + (COSTCOLS+STATCOLS+2) + ' class=xtabLine></td></tr>';

    // 1=Supply Truck
    // 2=?
    // 3=?
    // 4=Anti-Tank
    // 5=Infantry
    // 6=Sniper
    // 7=Mobile SAM
    // 8=Tank
    // 9=Supply Helicopter
    // 10=Fighter
    // 11=Gunship
    // 12=Bomber
    // 13=Stealth Bomber
    // 14=?
    // 15=Nuke
    // 16=Hellfire Tank
    // 17=Predator Drone
    // 18=Special Forces
    // 19=Cargo Transport

    var WeaponList=[1,5,6,4,18,7,8,17,9,11,10,12,19,16,13,15];
    var WeaponPower=[1,4,3,4,6,6,16,24,0,16,16,24,0,160,240,20000];
    var WeaponTime=[];

    for (var i=0; i<WeaponList.length; i++) {
    
        ui=WeaponList[i];
        
        //  0=NAME, 1=?, 2=Food, 3=Oil, 4=Stone, 5=Steel, 6=Titanium, 7=graphene, 10=IdlePop, 11=relative build time
        cost  = unsafeWindow.unitcost['unt'+ui];
        
        //  0=Life, 1=Attack, 2=?, 3=Speed, 4=?, 5=Load
        stats = unsafeWindow.unitstats['unt'+ui];
        
        food  = unsafeWindow.unitupkeeps[ui];
        troopname = unsafeWindow.arStrings.unitName['u'+ui];

        // every other row is grey
        if (++rownum % 2) { rsty = 'evenrow'; } else { rsty = 'oddrow'; }
        // show aircraft in different color (blue)
        if (stats[3]>=1000)
            if (rownum % 2) { rsty = 'evenrowB'; } else { rsty = 'oddrowB'; }
        
        m += '<TR class="xtabR '+rsty+'">';
        m += '<TD class=xtabby>'+ troopname;
        m += '</td><TD class="xtabL">'+ AbbrNum(cost[2] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(cost[3] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(cost[4] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(cost[5] * t.ThisMany);
        // combine the titanium/graphene
        m += '</td><TD>'+ AbbrNum( (cost[6]+cost[7]) * t.ThisMany );
        m += '</td><TD>'+ AbbrNum(cost[10] * t.ThisMany);
        // Use Integer division for time...this is the only value that does not divide evenly
        if (t.TrainTimeRef == 1) {
            m += '</td><TD>'+ AbbrNum( Math.floor(cost[11]/60*t.ThisMany) );
        } else {
            // Display build time as days/hrs/mins, assuming t.TrainTimeRef is time to build 100 trucks
            m += '</td><TD>'+ timestrShort( Math.floor(cost[11]/60*t.ThisMany*t.TrainTimeRef/100) );
        }
        m += '</td><TD class="xtabL">'+ AbbrNum(stats[0] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(stats[1] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(stats[3] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(stats[5] * t.ThisMany);
        //m += '</td><TD class=xtabL>'+ AbbrNum(WeaponPower[i] * t.ThisMany);
        m += '</td><TD class="xtabL">'+ AbbrNum(food * t.ThisMany);
        m += '</td>';
        m += '</tr>';

    }

        // "Mines",150,760,50,0,0,0,8,  name,food,oil,stone,steel,?,?,?,traintime?
        // fortstats=[0,1000,0,0,0,1]   Life,Atk,Load?,?,?,?

    m += '<TR class=xtabLine><TD colspan=' + (COSTCOLS+STATCOLS+2) + ' class=xtabLine></td></tr>';
    for (k in unsafeWindow.fortcost){
        if (++rownum % 2) { rsty = 'evenrow'; } else { rsty = 'oddrow'; }
            
        cost  = unsafeWindow.fortcost[k];     //  NAME, Food, Wood/oil, Stone, Ore/steel, ?, IdlePop, Time
        fi    = k.substring(3);
        stats = unsafeWindow.fortstats['unt'+fi];   //  Life, Attack, Defense, Speed, Range, Load
        food  = 0;
        might = fortmight['u'+fi];
        name  = cost[0].replace ('Defensive','');
        //      name = name.replace ('Wall-Mounted','');
        m += '<TR class="xtabR '+rsty+'">';
        m += '<TD class=xtabby>'+ name;
        m += '</td><TD class=xtabL>'+ AbbrNum(cost[1] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(cost[2] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(cost[3] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(cost[4] * t.ThisMany);
        // lets pretend that cost[5] is SRs required for railguns/lasers... I cant find this value in fortcost[]
        if(parseInt(cost[4])>1000) cost[5]=40;
        m += '</td><TD>'+ AbbrNum(cost[5] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(cost[6] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(cost[7] * t.ThisMany);
        m += '</td><TD class=xtabL>'+ AbbrNum(stats[0] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(stats[1] * t.ThisMany);
        m += '</td><TD>'+ AbbrNum(stats[2]);  // speed remains the same, regardless of quantity
        m += '</td><TD>'+ AbbrNum(stats[3] * t.ThisMany);
        m += '</td><TD class=xtabL>'+ AbbrNum(food * t.ThisMany);
        m += '</td></tr>';
    }
    m += '<TR class=xtabLine><TD colspan=' + (COSTCOLS+STATCOLS+2) + ' class=xtabLine></td></tr>';

    m += '<TR><TD colspan=100%>Train Time for 100 Trucks (seconds): ';
    //m += '<INPUT id=pdTruckBuildTime type=text size=6 maxlength=10 value=' + t.TrainTimeRef + ' />';
    m += '<INPUT id=pdTruckBuildTime type=text size=6 maxlength=10 value=99 />';

    m += ' &nbsp; &nbsp; &nbsp; &nbsp; Number of Troops: ';
    //m += htmlSelector ({1:1, 10:10, 100:100, 1000:1000}, t.ThisMany, 'id=pdTroopCount');
    m += '<INPUT id=pdTroopCount type=text size=6 maxlength=10 value=' + t.ThisMany + ' />';
    m += '</td>';

    m += '<TR></table></div><BR>';

// END OF WEAPON STATS TABLE

var WILDCOLS=10;
m += '<BR>\
    <DIV style="overflow-y:auto; overflow-x:hidden">\
    <DIV class=ptStat>WILD SCOUTING DATA</div>\
    <TABLE class=t1>\
    <TR class=xtabH>\
	<TD> </td>\
    <TD class=xtabby>L1</td>\
    <TD class=xtabby>L2</td>\
    <TD class=xtabby>L3</td>\
    <TD class=xtabby>L4</td>\
    <TD class=xtabby>L5</td>\
    <TD class=xtabby>L6</td>\
    <TD class=xtabby>L7</td>\
    <TD class=xtabby>L8</td>\
    <TD class=xtabby>L9</td>\
    <TD class=xtabby>L10</td>\
	</tr>\
';
m += '<TR class=xtabLine><TD colspan=' + (WILDCOLS+1) + ' class=xtabLine></td></tr>';

var WildData = {
    type : [ "Infantry","Snipers","Antitank Infantry","Mobile SAM","Tank","Gunship","Fighter","Bomber" ],
    1 : [ 50 ],
    2 : [ 100 ],
    3 : [ 80, 40, 40 ],
    4 : [ 80, 40, 40, 35, 24 ],
    5 : [ 160, 80, 80, 70, 48 ],
    6 : [ 320, 160, 160, 140, 96 ],
    7 : [ 320, 160, 160, 140, 96, 110, 110, 60 ],
    8 : [ 640, 320, 320, 280, 192, 220, 220, 120 ],
    9 : [ 1280, 640, 340, 560, 384, 440, 440, 240 ],
    10: [ 3840, 1920, 1920, 1680, 1152, 1320, 1320, 720 ]
}

for (var i=0; i<WildData.type.length; i++) {

    // every other row is grey
    if (i % 2) { rsty = 'evenrow'; } else { rsty = 'oddrow'; }
    // show aircraft in different color (blue)
    if (i>4)
        if (i % 2) { rsty = 'evenrowB'; } else { rsty = 'oddrowB'; }

	m += '<TR class="' + rsty + '">';
    for (j in WildData) {
            var ThisData = WildData[j][i] || '-';
       		m += '<TD style="border-width:1px; border-style: none solid none none;" class="'
            if(j=="type") m += 'xtabby';
            m += '">' + addCommas(ThisData) + '</td>';
    }
   	m += '</tr>';

}
m += '<TR class=xtabLine><TD colspan=' + (WILDCOLS+1) + ' class=xtabLine></td></tr>';
m += '</table></div><BR>';

// #@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#

    logit('PLAYEREFFECTS=' + inspect(Seed.player,4,1,false),false);

    m += '<DIV style="text-align:left;">';
    if (DEBUG_BUTTON)
        m += '<BR><INPUT id=ptButDebug type=submit name="SEED" value="DEBUG">';

    m += '<span id="PeaceTimeDiv" style="text-align:right;"></span>';

    t.cont.innerHTML = m +'</div>';

    if (DEBUG_BUTTON)
        document.getElementById('ptButDebug').addEventListener('click', function (){debugWin.doit()}, false);
    logit("Tabs.Info: m=" + m,false);
    t.MakePeaceTime();
    
    // redraw the screen with new values for time/number of troops
    function ChangeNumber(){
        var t = Tabs.Info;
        t.ThisMany = document.getElementById('pdTroopCount').value;
        t.TrainTimeRef = document.getElementById('pdTruckBuildTime').value;
        logit('ThisMany=' + t.ThisMany + '     TrainTimeRef=' + t.TrainTimeRef,true);
        t.show (t.cont);
    }
    t.changeOpt ('pdTruckBuildTime', 'pbTrainTimeRef');
    document.getElementById('pdTroopCount').addEventListener('change', ChangeNumber, false);
    document.getElementById('pdTruckBuildTime').addEventListener('change', ChangeNumber, false);

  },

    MakePeaceTime : function() {
        var t = Tabs.Info;
        var s = ' PEACE TREATY ELIGIBILITY = ';
        var PeaceTime = parseInt(Seed.player.truceExpireUnixTime) - unixTime() + 43200;
        if (PeaceTime>0) {
            s += timestr(PeaceTime);
        } else {
            s += 'OK.';
        }
        document.getElementById("PeaceTimeDiv").innerHTML = s;
        t.timer = setTimeout(t.MakePeaceTime,60*1000);
    },

    hide : function (){
    },

    changeOpt : function (valueId, optionName, callOnChange) {
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


}

/*********************************** Options tab ***********************************/
Tabs.Options = {
  tabOrder : 40,
  cont : null,

  init : function (div){
    var t = Tabs.Options;
    t.cont = div;
    
    try {      
      m = '<TABLE class=ptTab>\
        <TR><TD colspan=2><B>Config:</b></td></tr>\
        <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Enable window drag (move window by dragging top bar with mouse)</td></tr>\
		<TR><TD><BR> </td></tr>\
		<TR><TD colspan=2><B>Enhancements:</b></td></tr>\
		<TR><TD><INPUT id=ptgoldenable type=checkbox /></td><TD>Auto collect gold when happiness reaches <INPUT id=ptgoldLimit type=text size=2 maxlength=3 \>%</td></tr>\
		<TR><TD><INPUT id=ptoilenable type=checkbox /></td><TD>Auto collect oil</td></tr>\
		<TR><TD><INPUT id=ptfoodenable type=checkbox /></td><TD>Auto collect food</td></tr>\
		<TR><TD><INPUT id=ptnukeenable type=checkbox /></td><TD>Auto collect nukes</td></tr>';
      t.cont.innerHTML = m;

      t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
	  t.togOpt ('ptgoldenable', 'pbgoldenable', CollectGold.setEnable);
	  t.togOpt ('ptoilenable', 'pboilenable', CollectOil.setEnable);
	  t.togOpt ('ptfoodenable', 'pbfoodenable', CollectFood.setEnable);
	  t.togOpt ('ptnukeenable', 'pbnukeenable', CollectNuke.setEnable);
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
}


/*********************************** Pod tab ***********************************/
Tabs.PodTools = {
    tabOrder : 45,
    cont : null,
    AttackTimer : null,
    Attacking : null,

    init : function (div){
        var t = Tabs.PodTools;
        t.cont = div;

        try {
            m = '<TABLE class=ptTab>\
            <TR><TD colspan=2><B>Auto Attack:</b></td></tr>\
            <TR>\
                <TD><INPUT id=PodAttack     type=checkbox /></td><TD>Enable Attack</td>\
                <td style="width:5em"></td>\
                <TD><INPUT id=AttackWild type=checkbox /></td><TD>Attack Wilds Also</td></tr>\
            <TR>\
                <TD><INPUT id=SupplyTruck   type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Supply Trucks</td>\
                <td></td>\
                <TD><INPUT id=SupplyChopper type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Supply Helicopters</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackInfantry type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Infantry</td>\
                <td></td>\
                <TD><INPUT id=AttackChopper  type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Gunships</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackSniper  type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Snipers</td>\
                <td></td>\
                <TD><INPUT id=AttackFighter type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Fighters</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackAntitank type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Antitank Infantry</td>\
                <td></td>\
                <TD><INPUT id=AttackBomber   type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Bombers</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackSforces type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Special Forces</td>\
                <td></td>\
                <TD><INPUT id=SupplyJet     type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Cargo Transports</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackMobileSAM type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Mobile SAMs</td>\
                <td></td>\
                <TD><INPUT id=AttackHellfire  type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Hellfire Tanks</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackTank    type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Tanks</td>\
                <td></td>\
                <TD><INPUT id=AttackStealth type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Stealth Bombers</td>\
            </tr>\
            <TR>\
                <TD><INPUT id=AttackPredator type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Predators</td>\
                <td></td>\
                <TD><INPUT id=AttackNuke     type=text size=2 maxlength=4 value=0 /></td><TD> &nbsp; Nukes</td>\
            </tr>\
            <TR><TD><BR> </td></tr>';
            m += '</table><BR><BR><HR>Click on any map cell to launch an attack with the above options!';
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
            logit(t + '.tick Setting Attack Interval ' + t.AttackTimer,true);
        } else {
            WarnAttackEnabled(false);
            if(t.AttackTimer) {
                logit(t + '.tick: Clearing Attack Interval:' + t.AttackTimer,true);
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
        logit('fireEvent: obj=' + inspect(obj,1,false) + '   evt=' + evt, false);

        if( document.createEvent ) {
            logit('fireEvent: fire in the hole! (createEvent)', true);
            var evObj = document.createEvent('MouseEvents');
            evObj.initEvent( evt, true, false );
            fireOnThis.dispatchEvent(evObj);
        } else if( document.createEventObject ) {
            logit('fireEvent: fire in the hole! (fireEvent)', true);
            fireOnThis.fireEvent('on'+evt);
        }
    },

    LaunchAttack : function () {
        var t = Tabs.PodTools;

        logit(t + '.LaunchAttack: t.Attacking=' + t.Attacking, true);

        // id="marchBtn" for camps
        if(
        document.getElementById("marchBtn") && 
        !document.getElementById("generalsContainer") ){
            // This is the first attack modal
            logit(t + '.LaunchAttack: first modal (camp)',true);
            t.Attacking=true;
            t.fireEvent(document.getElementById("marchBtn"),'click');
        }

        // id="btnAttack" for wilds
        if(
        document.getElementById("btnAttack") &&
        !document.getElementById("generalsContainer") &&
        document.getElementById("AttackWild") &&
        document.getElementById("AttackWild").checked==true ){
            logit(t + '.LaunchAttack: first modal (wild)',true);
            // This is the first attack modal (for wilds)
            t.Attacking=true;
            t.fireEvent(document.getElementById("btnAttack"),'click');
        }

        // Get a list of the Generals to use in the attack
        generals=document.getElementById("generalsContainer");
        
        if(generals && t.Attacking){

            logit(t + '.LaunchAttack: found generals',true);
            t.Attacking=false; // prevent looping
            
            // This should be(?) the total number of queued attacks; should be compared to level of Rally Point...
            if(document.getElementById("untqueue_list")) {
                attacknum = document.getElementById("untqueue_list").getElementsByClassName('untqueue_item clearfix').length;
            } else {
                attacknum = 0;
            }

            // Determine attacking number/type as specified on PodTools tab
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
                        logit("Attacking: General " + kk + " has " + count + " energy, max=" + maxenergy,true);
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
                logit(text,true);
                unsafeWindow.Modal.hideModalAll();
                unsafeWindow.Modal.showAlert(text);
                window.setTimeout('Modal.hideModal();', 3000);
                return;
            }

            if(list.length==0) {
                var text = "ERROR: No Generals are Available.";
                logit(text,true);
                unsafeWindow.Modal.hideModalAll();
                unsafeWindow.Modal.showAlert(text);
                window.setTimeout('Modal.hideModal();', 3000);
                return;		
            }

            if(kk!==list.length+2) {
                var text = "ERROR: Tried " + kk + " Generals but none had energy.";
                logit(text,true);
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
            logit(text,true);
            unsafeWindow.Modal.hideModalAll();
            unsafeWindow.Modal.showAlert(text);
            window.setTimeout('Modal.hideModal();', 3000);
            return;
        }

        function accept_peace_treaty_modal() {
            if(
            document.getElementsByClassName("important prompt")[0].innerHTML.search(/your Peace Treaty/i) > 0 &&
            document.getElementById("confirmation-button") ) {
                logit(t + '.LaunchAttack: found PT confirmation-button modal!',true);
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

/*********************************** Chat tab ***********************************/
Tabs.Chat = {
  tabOrder : 50,
  cont : null,
  tabDisabled : !ENABLE_CHAT,

  init : function (div){
    var t = Tabs.Chat;
	t.cont = div;
	var m ='<DIV>';
	m+='';
    
    t.cont.innerHTML = m +'</div>';
  },

  hide : function (){
  },

  show : function (){
  },

}

/************************ Gold Collector ************************/
var CollectGold = {
  name : 'CollectGold',
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
      var since = unixTime() - t.lastCollect['c'+city.id];

      logit(t.name + ".tick: CITYNUM=" + c + " CITY=" + city.name + "(" + city.id + ")" + inspect(Casino,9,1,false),false);
      var Casino = getCityBuilding(city.id, 6);
      if (Casino.count == 0) {
        logit(t.name + ".tick: NO GOLD FOR " + city.name + ", must own a Casino.",true);
        // since=0;
        continue;
      }
      var happy = Seed.citystats['city'+ city.id].pop[2];
      if (happy>=Options.pbGoldLimit && since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.colHappy = happy;
        t.ajaxCollectGold (city, t.e_ajaxDone);
        break;
      }
    }
    t.timer = setTimeout (t.tick, 15*60*1000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
    if (rslt.ok)
      logit ('Collected '+ rslt.gained.gold +' gold for '+ t.colCityName +' (happiness was '+ t.colHappy +')', true);
    else
      logit ('Error collecting gold for '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
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

/************************ Oil Collector ************************/
var CollectOil = {
    name : 'CollectOil',
    CityNum : 1,
    timer : null,
    finish : {},

    init : function (){
        var t = CollectOil;
        t.city = Cities.cities[t.CityNum];
        if(!t.city) {
            logit (t.name + '.init: no second city, cannot collect oil.', true);
            return;
        }
        t.cityID = 'city' + t.city.id;
        t.event = Seed.petroleumLabEvents;
        t.finish = t.event[t.cityID][1].finish;
        logit (t.name + '.init: finish=' + t.finish, true);
        t.setEnable (Options.pboilenable);
    },
  
    setEnable : function (tf){
        var t = CollectOil;
        clearTimeout (t.timer);
        if (tf) {
            CleanupButtons("btn-petro-lab");
            logit(t.name + '.setEnable: ENABLED for city ' + t.city.name, true);
            t.tick();
        }
    },

    tick : function (){
        var t = CollectOil;
        if(!t.city) return;
        t.finish = t.event[t.cityID][1].finish;
        var wait = 600;
        if (t.finish>=0)
            wait = t.finish - unixTime();
        
        if (wait<=0){
            t.ajaxCollectOil (t.city, t.e_ajaxDone);
        }
        else {
            logit(t.name + '.tick: waiting for ' + wait + ' seconds.', true);
            t.timer = setTimeout (t.tick, wait*1000);    
        }
    },

    e_ajaxDone : function (rslt){
        var t = CollectOil;
        var wait = 60;
        logit(t.name + "e_ajaxDone: rslt=" + inspect(rslt,9,1,true),false);    
        if (rslt.ok) {
            logit ('Collected ' + rslt.gained.resource2 + ' oil for ' + city.name, true);
            CleanupButtons("btn-petro-lab");
            if(rslt.eventEnd) wait = rslt.eventEnd - unixTime();
        } else {
            logit ('Error collecting oil for ' + t.city.name + ': ' + unsafeWindow.ERROR_CODE[rslt.error_code], true);
            if(rslt.feedback) wait = rslt.feedback - unixTime();
        }
        t.timer = setTimeout (t.tick, wait*1000);    // wait to check for next finish time
        logit(t.name + '.e_ajaxDone: waiting for ' + wait + ' seconds.', true);
    },

    ajaxCollectOil : function (thiscity, notify){
        var t = CollectOil;
        logit (t.name + '.ajaxCollectOil: ' + ' for ' + thiscity.name, false);
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.cid = thiscity.id;
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

/************************ Food Collector ************************/
var CollectFood = {
    name : 'CollectFood',
    CityNum : 2,
    timer : null,
    finish : {},
      
    init : function (){
        var t = CollectFood;
        t.city = Cities.cities[t.CityNum];
        if(!t.city) {
            logit (t.name + '.init: no third city, cannot collect food.', true);
            return;
        }
        t.cityID = 'city' + t.city.id;
        t.event = Seed.greenhouseEvents;
        t.finish = t.event[t.cityID][1].finish;
        logit (t.name + '.init: finish=' + t.finish, true);
        t.setEnable (Options.pbfoodenable);
    },
  
    setEnable : function (tf){
        var t = CollectFood;
        clearTimeout (t.timer);
        if (tf) {
            CleanupButtons("btn-greenhouse");
            logit(t.name + '.setEnable: ENABLED for city ' + t.city.name, true);
            t.tick();
        }
    },

    tick : function (){
        var t = CollectFood;
        if(!t.city) return;
        t.finish = t.event[t.cityID][1].finish;
        var wait = 600;
        if (t.finish>=0)
            wait = t.finish - unixTime();
        
        if (wait<=0) {
            t.ajaxCollectFood (t.city, t.e_ajaxDone);
        }
        else {
            logit(t.name + '.tick: waiting for ' + wait + ' seconds.', true);
            t.timer = setTimeout (t.tick, wait*1000);    
        }
    },

    e_ajaxDone : function (rslt){
        var t = CollectFood;
        var wait = 60;
        logit(t.name + "e_ajaxDone: rslt=" + inspect(rslt,9,1,true),false);    
        if (rslt.ok) {
            logit ('Collected ' + rslt.gained.resource1 + ' food for ' + t.city.name, true);
            if(rslt.eventEnd) wait = rslt.eventEnd - unixTime();
        } else {
            logit ('Error collecting food for '+ t.city.name +': '+ unsafeWindow.ERROR_CODE[rslt.error_code], true);
            if(rslt.feedback) wait = rslt.feedback - unixTime();
        }
        t.timer = setTimeout (t.tick, wait*1000);    // wait to check for next finish time
        logit(t.name + '.e_ajaxDone: waiting for ' + wait + ' seconds.', true);
        CleanupButtons("btn-greenhouse");
    },
  
    ajaxCollectFood : function (thiscity, notify){
        var t = CollectFood;
        logit (t.name + '.ajaxCollectFood: ' + ' for ' + thiscity.name, false);
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.cid = thiscity.id;
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

/************************ Nuke Collector ************************/
var CollectNuke = {
    name : 'CollectNuke',
    CityNum : 3,
    timer : null,
    finish : {},
      
    init : function (){
        var t = CollectNuke;
        t.city = Cities.cities[t.CityNum];
        if(!t.city) {
            logit (t.name + '.init: no fourth city, cannot collect nukes.', true);
            return;
        }
        t.cityID = 'city' + t.city.id;
        t.event = Seed.warheadFactoryEvents;
        t.finish = t.event[t.cityID][1].finish;
        logit (t.name + '.init: finish=' + t.finish, true);
        t.setEnable (Options.pbnukeenable);
    },
  
    setEnable : function (tf){
        var t = CollectNuke;
        clearTimeout (t.timer);
        if (tf) {
            CleanupButtons("btn-warhead-factory");
            logit(t.name + '.setEnable: ENABLED for city ' + t.city.name, true);
            t.tick();
        }
    },

    tick : function (){
        var t = CollectNuke;
        if(!t.city) return;
        t.finish = t.event[t.cityID][1].finish;
        var wait = 600;
        if (t.finish>=0)
            wait = t.finish - unixTime();
        
        if (wait<=0) {
            t.ajaxCollectNuke (t.city, t.e_ajaxDone);
        }
        else {
            logit(t.name + '.tick: waiting for ' + wait + ' seconds', true);
            t.timer = setTimeout (t.tick, wait*1000);    
        }
    },

    e_ajaxDone : function (rslt){
        var t = CollectNuke;
        var wait = 60;
        logit(t.name + "e_ajaxDone: rslt=" + inspect(rslt,9,1,true),false);    
        if (rslt.ok) {
            logit ('Collected ' + rslt.gained.items + ' warhead in ' + t.city.name, true);
            if(rslt.eventEnd) wait = rslt.eventEnd - unixTime();
        } else {
            logit ('Error collecting warhead in '+ t.city.name +': '+ unsafeWindow.ERROR_CODE[rslt.error_code], true);
            if(rslt.feedback) wait = rslt.feedback - unixTime();
        }
        t.timer = setTimeout (t.tick, wait*1000);    // wait to check for next finish time
        logit(t.name + '.e_ajaxDone: waiting for ' + wait + ' seconds.', true);
        CleanupButtons("btn-warhead-factory");
    },
  
    ajaxCollectNuke : function (thiscity, notify){
        var t = CollectNuke;
        logit (t.name + '.ajaxCollectNuke: ' + ' for ' + thiscity.name, false);
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.cid = thiscity.id;
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
  this.autoWidth = autoWidth;

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
  this.div.style.width = '';
  this.div.style.height = '';
  this.div.style.maxHeight = height + 'px';
  this.div.style.maxWidth = width + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px; text-align:right;">X</td></tr>\
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
  function onClose (){
    // Disable auto-attack when switching tabs
    try { document.getElementById("Attack").checked=false; } catch(err) { }
  }
  function autoHeight (onoff){
    if (onoff)
      t.div.style.height = '';  
    else
      t.div.style.height = t.div.style.maxHeight;
  }
  function autoWidth (onoff){
    if (onoff)
      t.div.style.width = '';  
    else
      t.div.style.width = t.div.style.maxWidth;
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
    return 'Inspect Error: value of "levels" must be > 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i<level; i++)
    indent += '  ';
  try {
    for(property in obj) { var garbage=property[obj]; }
  }  catch(err) {
    return 'ERROR: object cannot be traversed.';
  }
  str = 'Inspecting: MAX=' + maxLevels + ' LEVEL=' + level + ' FUNC=' + doFunctions + '\n';
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
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    mainPop.setLocation ({x: 10, y: 10});
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

function createButton (label){
  var a=document.createElement('a');
  a.className='tab buttontab';
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
    var a = createButton (text);
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
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
	  gmTabs.style.height='20px';
      gmTabs.style.padding='0 0 0 25px';
      // gmTabs.style.margin='15px 0 0 0';
      gmTabs.lang = 'en_PB';
	  // hard-coded literals as an absolute screen position?  I think not
	  //document.getElementById('koc_chatterbox').style.top = document.getElementById('koc_chatterbox').style.top + 100;
	  //document.getElementById('cityinfo_box').style.top = document.getElementById('cityinfo_box').style.top + 100;
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
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

function dialogRetry (errMsg, seconds, onRetry, onCancel){
  seconds = parseInt(seconds);
  var pop = new CPopup ('pbretry', 20, 40, 300,150, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>GW Power Bot</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has occurred:</b></font><BR><DIV id=paretryErrMsg></div>\
      <B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL Retry" \>';
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


//###########################################################################################################
//###########################################################################################################
//###########################################################################################################
//###########################################################################################################
function MyAjaxRequest (url, o, noRetryX){
  logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1), false);
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
      if (rslt.updateSeed) {
        logit('updateSeed: ' + inspect(rslt.updateSeed,5,1,true),false);
      } else {
        logit('WHERES MAH updateSeed: ' + inspect(rslt,5,1,true),false);
      }
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      logit("MyAjaxRequest: " + rslt.errorMsg, true);
      logit(inspect(rslt,4,1,true),true);
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

// returns {count, maxlevel}
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
      m += '<TD class=spacer></td><TD align=center class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    }
    m+='</tr></table>';  
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
        // Disable auto-attack when switching tabs
        try {
            document.getElementById("PodAttack").checked=false;
            Tabs.PodTools.tick();
        } catch(e) {logit("ERR:" + e.name + ' : ' + e.message,true); }
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
  // return x1 + x2;
  var result = x1 + x2;
  return result.replace(/\.$/,'');
}

function AbbrNum(number){
    var STR=number;
    var M=1000000;
    var B=M*1000;
    var T=B*1000;

    if (number>=T)     { STR = (number/T).toPrecision(3) + "T"; number=0; }
    if (number>=B)     { STR = (number/B).toPrecision(3) + "B"; number=0; }
    if (number>=M)     { STR = (number/M).toPrecision(3) + "M"; number=0; }
    if (number>=10000) { STR = Math.round(number/1000)   + "K"; number=0; }
    return(STR);
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

function timestrHHMM(time) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  '00:01';
  if (t>3600){
    m.push (parseInt(t/3600));
    m.push (':');
    t %= 3600;
  }  
  m.push (parseInt(t/60).toPrecision(2));
  return m.join ('');
}

function logit (msg, force){
	if(!DEBUG_TRACE && !force) return false;
	var now = new Date();
	var prefix = getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds();
	msg = prefix+" : "+msg;
	if (typeof GM_log !== 'undefined') { GM_log(msg); return true; }
	if (typeof console !== 'undefined' && console.log) { console.log(msg); return true; }
	return false;
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
	  t.win = new CPopup('ptwinlog', 0, 0, 500, 600, true, function(){t.win.destroy(); t.win=null; t.win.closed=true;});
	  t.win.show(true);
t.isOpening = false; 
t.state = null; 
    }
    
    if (t.state == null){
      t.win.getMainDiv().innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; overflow-x:auto; max-height:800px; max-width:600px"></div></body>';
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

// Changes
// Changed version number
// Added Special Forces to troops types (added Line 362)
// Fixed Food Production (Line 199, added Line 198)
// Added Food "Upkeep" and "Production" on Overview

// VERSION 3
// Autoattack distributes Generals evenly
// Fixed autoattack modalwindow close and error reporting
// Added color to the toolbar as a build-state indicator

// VERSION 4
// Overview additions:
//  - Idle Population
//  - Nukes
//  - Totals for food production
//  - Red highlighting of negative numbers
//  - right-justfied columns
// Added all weapon types to autoattack
// Added auto-collect food (city 3)
// Added auto-collect nuke (city 4)
// Updated all auto-collects to use the "finish" time
// Removed the upper banner ad
// Removed the Flash-audio
// Fixed the Chat and Population misalignment
// Fixed the upper-bound misalignment hiding the toolbar

// VERSION 5 and 6: unreleased

// VERSION 7
// Overview Additions:
//  - Bold highlighting for resources above production capacity
//  ?? - Total time before all food depleted - no...working
// Retry dialog for failed server ajax requests
// Remove gift button and beginner-crate button from main screen
// Resource collectors (food/oil/nuke) now remove main screen button
// Updated food/oil/nuke collectors for robustness
// Cities with build errors show as red on Build tab
// Remove useless buttons from map area (crate,etc.)
// No longer remove sound element...it is gone
// Apply script to either http or https to accommodate FB change
// Add PodTools checkbox to "Attack Wilds Also"
// Expanded page whitespace downward and to the right
// Removed overlapping/blocking FB column down right side
// Corrected left margin
// Adjusted height/width autoscale for popup win
// Auto-collectors now have 30-sec spinup delay
// Added Troop unit data to Info tab
// Added Wild scout data to Info tab
// Added "Peace Treaty Eligibility Time" to Info tab
// Overview resources above production capacity now in bold
// Overview resources in the negative are now red
// Extended messaging for Build errors
// Added catch to "inspect" function

// VERSION 8
// Info tab shows counts for a given number of troops (abbreviated numbers)
// Info tab recalculates based on num of troops given, and time reference given
// Overview: corrected food production value (particularly for city #3)
// Build tab turns red when build is in error
// PodTools now run faster, with less overhead (only run when "Attack" is checked)
// PodTools skip past Peacy-Treaty confirmation dialog
// PodTools "Attack" unchecked when switching to other tabs
// Cleanup more onscreen buttons
// Added functions "timestrHHMM and "AbbrNum" to better display Info tab
// Fixed bug in banner color based on build mode

// VERSION 9
// Fixed runaway attack bug
// Save value of truck-training time
// Highlight PodTools tab when attack enabled
// Highlight Overview tab when under 1hr of food remaining
// WORKING: Unknown KABAM! error reporting food production/usage
