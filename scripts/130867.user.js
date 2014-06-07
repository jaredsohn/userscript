// ==UserScript==
// @name           FTB
// @namespace      FTB
// @version        1032012
// @include        *.globalwarfaregame.com/*main_src.php*
// @include        *globalwarfaregame.com/*fb.php*
// @include        *apps.facebook.com/globalwarfaregame/*
// @include        *globalwarfaregame*
// @include        https://plus.google.com/games/216622099218*
// @icon           http://i21.photobucket.com/albums/b276/bbwlvr/nuke.jpg
// ==/UserScript==

var Version = '1032012';
var ENABLE_OVERVIEW = true;
var ENABLE_TOWER = true;
var ENABLE_TRANSPORT = true;
var ENABLE_ARTIFACTS = true;
var ENABLE_SEARCH = true;
var ENABLE_PLAYER = true;
var ENABLE_BUILD = true;
var ENABLE_TRAIN = true;
var ENABLE_OPTIONS = true;
var ENABLE_HELP = false;
var ENABLE_FAKE_TAB = true;
var ENABLE_DEBUG = false;
var DEBUG_TRACE = false;



var DEFAULT_ALERT_SOUND_URL = 'http://mehter.info/marslar/011_Ceddin_Deden.mp3';
var SWF_PLAYER_URL = 'http://beworld.perso.sfr.fr/bao/miniplayer.swf';
var CHAT_BG_IMAGE = 'http://freeiphonewallpaperbackgrounds.info/wp-content/uploads/2011/01/howling-wolf-iphone-backgrounds.jpg';


var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;



if (is_chrome) {
	window.unsafeWindow || (
		unsafeWindow = (function() {
			var el = document.createElement('p');
			el.setAttribute('onclick', 'return window;');
			return el.onclick();
		}())
	);
	if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported") > -1)) {
    GM_getValue = function(key,def) {
        return localStorage[key] || def;
    };
    GM_setValue = function(key,value) {
        return localStorage[key] = value;
    };
    GM_deleteValue = function(key) {
        return delete localStorage[key];
    };
	}
}



var Options = {
	ptWinIsOpen	:	true,
	ptWinDrag	:	true,
	ptWinPos	:	{},
	ptTrackOpen	:	true,
	//ptsoundoff : true,
	ptWinWidth : 650,
	overviewFontSize	:	11,
	pbgoldenable	:	false,
	pblastgoldcollect : [0,0,0,0,0,0,0,0],
	pbGoldLimit	:	100,
	pboilenable : true,
	pblastoilcollect : 0,
	pbfoodenable : true,
	pblastfoodcollect : 0,	
	pbnukeenable : true,	
	pblastnukecollect : 0,		
	pblauncherenable : true,	
	pblastlaunchercollect : 0,
	pbradarenable : true,
	pblastradarcollect : 0,
	pbdailyenable : true,
	pblastdailycollect : 0,
	pbgiftenable : true,
	pblastgiftcollect : 0,
	pbahelpenable : true,
	pbahelphide : true,
	pbrmmotdEnable : true,
	pbiconsEnable : true,
	pbitemsuse : true,
	pbartcity : "",
	pbarttype : "w",
	pbartklist : "",
	pbartx : 0,
	pbarty : 0,
	pbartinterval : 6,
	pbartenergysave : 0,
	pbarthidemodal : true,
	pbartdeletereport : true,
	pbartu1 : 0,
	pbartu2 : 0,
	pbartu3 : 0,
	pbartu4 : 0,
	pbartu5 : 0,
	pbartu6 : 0,
	pbartu7 : 0,
	pbartu8 : 0,
	pbartu9 : 0,
	pbartu10 : 0,
	pbartu11 : 0,
	pbartu12 : 0,
	pbartu13 : 0,
	pbartu14 : 0,
	pbartu15 : 0,
	pbartu16 : 0,
	pbartu17 : 0,
	pbartu18 : 0,	
	pbartu19 : 0,		
	pbartu20 : 0,
	pbartu21 : 0,
	pbartu22 : 0,
	pbartu23 : 0,
	pbartu24 : 0,	
	
	pbsearchtype : 'u',
	pbsearchx : 0,
	pbsearchy : 0,
	pbsearchradius : 20,
	pbsearchsector : 's1',
	pbsearchblockmax : 100,
	pbsearchterrormin : '7',
	pbsearchterrormax : '10',
	pbsearchterrorclick : true,
	pbsearchwildmin : '7',
	pbsearchwildmax : '10',
	pbsearchwildgrass : true,
	pbsearchwildriver : true,	
	pbsearchwildoil : false,	
	pbsearchwildstone : false,
	pbsearchwildsteel : false,
	pbsearchwildplain : false,
	pbsearchwildwaste : false,
	pbsearchwildsr : false,
	pbsearchwildfree : true,
	pbsearchwildoccupied : true,
	pbsearchwildnoalli : false,	
	pbsearchwildplayer : '',
	pbsearchwildalliance : '',
	pbsearchwildhostile : true,	
	pbsearchwildfriendly : true,	
	pbsearchwildneutral : true,
	pbsearchwildfryou : true,
	pbsearchwildfrthem : true,
	pbsearchwildselfalli : true,
	pbsearchwilddiplnoa : true,	
	pbsearchwildclick : true,	
	pbsearchcityplayer : '',
	pbsearchcityalliance : '',	
	pbsearchcityminmight : '',
	pbsearchcitymaxmight : '',
	pbsearchcityhostile : true,	
	pbsearchcityfriendly : true,	
	pbsearchcityneutral : true,
	pbsearchcityfryou : true,
	pbsearchcityfrthem : true,
	pbsearchcityselfalli : true,
	pbsearchcitydiplnoa : true,
	pbsearchcitynormal: true,
	pbsearchcitybeginner: true,
	pbsearchcitypeace: true,	
	pbsearchcityclick : true,
	
	pbtrain : {},
	
	alertSound : {
		enabled: true, 
		soundUrl: DEFAULT_ALERT_SOUND_URL, 
		repeat: true, 
		playLength: 300, 
		repeatDelay: 2, 
		volume: 100, 
		alarmActive: true, 
		expireTime: 0,
	},
	alertConfig : {
		aChat: true, 
		aPrefix: "******* UNDER ATTACK..!! *******",
		scouting: true, 
		wilds: true, 
		defend: true, 
		minTroops: 1, 
		lastAttack: 0, 
		hireGeneral: true,
		useBoostAttack: false,
		useBoostHealth: false,
	},
	encRemaining: false,	
	
	pbFoodAlert: true,
	
	pbChatOnRight: true,

	pbEveryEnable: false,
    pbEveryMins : 15,
	
	transportinterval: 45,
	minwagons: 10,
	lasttransport: 0,
	deletetransports: true,
};
//saveOptions();

var Logs = {
	globallog : [],
	artlog : [],
	searchlog : [],
	buildlog : [],
	trainlog : [],
	translog : [],
}
//saveLogs();

//var r = GM_getValue('pbReloadNow'); if (r == null) GM_setValue('pbReloadNow','0'); 

    
var ResetAll=false;
var deleting=false;

var ChatOptions = {
  latestChats               : [],
  AllowUsersRemoteControl   : [],
  BlacklistUsersRemoteControl: [],
  password                  : '',
  Chatpassenable            : false,
};


var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

function RemoveBadElements() {
    // remove undesirable screen elements
    try {
        var BadBox=document.getElementById("trialpay_dealspot");    // banner ad
        if (BadBox) BadBox.parentNode.removeChild(BadBox);             
 
          
    }
    catch(err) {actionLog(err,true) }
}
   
    
if (document.URL.search(/plus.google.com\/games\/216622099218/i) >= 0){
  googlePlusInstance ();
  return;
}



function GWwideScreen(){

	var r = GM_getValue('pbReloadNow');
	if (r != '0') {
		var div = document.getElementsByTagName('div');	
		if (div) {	
			for(var i = 0; i < div.length; i++) {
				var a = div[i].className;
				if (a == 'kb-gw-gift-items') {
					GM_setValue('pbReloadHit', 'OK');
					reloadGW(r);
				}
			}		
		}
	}
	var frames = document.getElementsByTagName('IFRAME');
	if (frames) {
		for(var i = 0; i < frames.length; i++) {
			var frame = frames[i];
			frame.style.width = '100%';
		}
	}
	var style = document.createElement('style');
	style.innerHTML = 'body {margin:0; width:100%;}';
	var head = document.getElementsByTagName('head');
	head[0].appendChild(style);
}


function facebookInstance (){
	function setWide (){
		var iFrame = document.getElementById('iframe_canvas');
		if (!iFrame){
			setTimeout (setWide, 500);
			return;
		}
		iFrame.style.width = '100%';
		
		while ( (iFrame=iFrame.parentNode) != null) {
			if (iFrame.tagName=='DIV') {
				iFrame.style.width = '100%';
				iFrame.style.border = '0';
				iFrame.style.padding = '0';
				iFrame.style.margin = '0';
			}
		}
		
		var gC = document.getElementById('globalContainer');
		gC.style.left = '0px';
   
		try{    
			document.getElementById('rightCol').style.display = 'none';
			document.getElementById('leftColContainer').style.display = 'none';
			document.getElementById('pagelet_canvas_footer_content').style.display = 'none';
			document.getElementById('globalContainer').parentNode.style.overflowX = "hidden";
    } catch (e){}

		var e = document.getElementById('mainContainer');
		if(e) {
			e.parentNode.style.width = '100%';	
			for(i=0; i<e.childNodes.length; i++){
				if(e.childNodes[i].id == 'contentCol'){
					e.childNodes[i].style.margin = '0px';
					break;
				}
			}
		}
		
		var e = document.getElementById('pageHead');
		if(e){
			e.style.width = '100%';
			e.style.margin = '0 10px';
		}
		var e = document.getElementById('bottomContent');
		if(e){
			e.style.padding = "0";
		}
	};

	setWide();
}



function googlePlusInstance (){
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
var mainPop;
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
	
//document.getElementById('gw-promo-main').style.display = "none";


Seed = unsafeWindow.seed;
  var styles = '.ptTabs {color:black; font-size:12px; font-family: arial,verdana;}\
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
    table.ptTabOverview tr td {border-left:1px solid #ccc; white-space:nowrap; padding: 1px 2px;}\
    table.ptTabOverview {border:1px solid #ccc; border-collapse: collapse}\
		table.ptTabOverview tr.odd {background-color:#e8e8e8;}\
		table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .ptDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
		.ptOddrow {background-color:#eee}\
		table.ptStat{border:1px solid #357; border-collapse: collapse}\
		table.ptStat tr td {padding: 2px 2px;}\
    .ptStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .ptStatLight {color:#ddd}\
		table td.nobr {white-space:nowrap;}\
		.ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    input.ptDefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
    input.ptDefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
    input.ptButton20 {height:27px; width:80px}\
    table.ptMainTab {empty-cells:show; border-collapse: separate; border-spacing:2px}\
		table.ptMainTab tr td {padding: 4px 5px 3px 5px; text-align: center;}\
    table.ptMainTab tr td a {color:inherit }\
    table.ptMainTab tr td {font-family:arial,verdana,sans-serif; empty-cells:show; white-space:nowrap; border: 1px solid blue;}\
    table.ptMainTab tr td.sel    {font-weight:bold; font-size:12px; background-color:#eed; color:black}\
    table.ptMainTab tr td.notSel {font-weight:bold; font-size:12px; background-color:#1e66bd; color:white; border-color:black;}\
    tr.ptPopTop td { background-color:#0AF; border:none; height: 21px;  padding:0px; }\
    tr.ptretry_ptPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.ptMainPopTop td { background-color:#0AF; border:none; height: 42px;  padding:0px; }\
    tr.ptretry_ptMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px; overflow:auto;}\
    .CPopup  {border:2px ridge #666}\
    span.ptTextFriendly {color: #080}\
    span.ptTextHostile {color: #800}\
		td.ptkoords:hover {background-color: silver; cursor:pointer;}\
		td.ptkoordslist:hover {background-color: maroon; color: white;cursor:pointer;}\
		table.ptTrain td {padding: 1px 2px 1px 2px;}\
		.ptButCancel {background-color:#a00; font-weight:bold; color:#fff}\
		div#font11 {font: normal 10px arial}\
    div.indent25 {padding-left:25px}';

  window.name = 'PT';
  readOptions();
  readChatOptions();
   
  readLogs();
  setCities();

  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y;
    saveOptions ();
  }
		
  mainPop = new CPopup ('pt', Options.ptWinPos.x, Options.ptWinPos.y, Options.ptWinWidth,800, Options.ptWinDrag,
    function (){
      tabManager.hideTab();
      Options.ptWinIsOpen=false;
      saveOptions()
    });
  mainPop.autoHeight (true);  

  mainPop.getMainDiv().innerHTML = '<style type="text/css">'+ styles +'</style>';
  
  AddMainTabLink('FTB SuperSuperMagic', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
    
  if (Options.ptWinIsOpen && Options.ptTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('beforeunload', onUnload, false);

	ChatPane.init();
	Tabs.Options.onoffMotd();
	Tabs.Options.onoffIcons();
	Tabs.Options.sound();
	AutoEvents.init();	
	FoodAlerts.init();
	Gifts.init();
	ItemsUse.init();
//	ChatOnRight.init();
    ChatPane.init();
    ChatStuff.init();
	RefreshEvery.init();
	RemoveBadElements();
	
	setInterval (Buildcheck, 5000);
	if (GM_getValue('pbReloadHit') == 'OK') {
		GM_setValue('pbReloadHit', '');
		Logbuch.eintrag(Logs.globallog,'Gifts for page reload successfully prevented');
	}
	GM_setValue('pbReloadNow','0');
	var gwversion = unsafeWindow.Constant.Version.VERSION_NUMBER;
	gwversion = gwversion.split('_').join('.');
	Logbuch.eintrag(Logs.globallog,'Anti-Sorrow :) FTBSuperSuperMagic:  (' + Version +')');
}

function Buildcheck() {
	var now = unixTime();
	for (var city in Seed.queue_con) {
		var q = Seed.queue_con[city][0];
		var cid = city.substr(4);
		if (q != null) {
			if (parseInt(q[4]) < now) {
				var typ = q[0];
				var level = q[1];
				var id = q[2];
				var pos = q[7];
				var baupos = Seed.buildings[city]['pos'+pos];
				if (baupos[3] == id && baupos[0] == typ && parseInt(level) > parseInt(baupos[1])) {
					baupos[1] = level;
					Seed.queue_con[city] = [];
					if (cid == unsafeWindow.currentcityid) 
						unsafeWindow.update_bdg();
				} 
			}
		}
	}
}


/*********************************** Overview ****************************/

Tabs.Overview = {
  tabOrder : 1,
  tabLabel: 'Overview',
  cont : null,
  displayTimer : null,
  tabDisabled : !ENABLE_OVERVIEW,

  Overview : function (){
  },

  init : function (div){
    this.cont = div;
  },

  hide : function (){
    clearTimeout (Tabs.Overview.displayTimer);
  },
  
  show : function (){
    var rownum = 0;
    var t = Tabs.Overview;

    var disposable=[0,400,800,2000,3000,6000,12500,25000,50000,105000,210000,420000];
    var stable    =[0,500,1000,2000,4000,8000,16000,32000,64000,140000,280000,560000,210000];
    clearTimeout (t.displayTimer);
		
		
		t.updatemarches();
		
    function _row (name, row, noTotal){
      if (rownum++ % 2) {
        style = '';
        style2 = ' style="background-color:#AFF;text-align:right;"';
				style3 = ' style="text-align:right;"';
			} else {
        style = ' style="background-color:#e8e8e8;"';
        style2 = ' style="background-color:#1BF;text-align:right;"';
        style3 = ' style="background-color:#e8e8e8;text-align:right;"';				
			}
      var tot = 0;
      var m = [];
      m.push ('<tr style="background-color:#fff;"');
      m.push (style);
      m.push ('><td');
      m.push (style);
      m.push ('><b>');
      m.push (name);
      m.push (' &nbsp; </td>');
      if (noTotal){
        m.push ('<td');
        m.push (style2);
        m.push ('>&nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        m.push ('<td'+style2+'>'); 
				if (tot < 0) {
					m.push ('<span class="boldRed">' + addCommas(tot) + '</span>');
				} else {
					m.push (addCommas(tot));
				}
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<td');
        m.push (style3);
        m.push ('>');   
				if (row[i] < 0) {
					m.push ('<span class="boldRed">' + addCommas(row[i]) + '</span>');
				} else {
					m.push (addCommas(row[i]));
				}
        m.push ('</td>');
      }
      m.push ('</tr>');
      return m.join('');
    }

		function _rowbl () {
			return '<tr><td colspan="'+(Cities.numCities+2)+'">&nbsp;</td></tr>';
    }

		try {
		  var now = unixTime();
      str = '<div class="ptstat" style="margin-top:5px; margin-bottom:5px;">\
				<table cellspacing="0" cellpadding="0" class="ptTab ptStat" width="100%">\
				<tr>\
					<td colspan="8" style="text-align:center;"><b>Anti-Sorrow :) FTBSuperSuperMagic: ' + Version + '</b></td></tr><tr>\
					<td><span class="ptStatLight">POWER:</span> ' + addCommas(Seed.player.might) +'</td>\
					<td style="text-align:center;"><span class="ptStatLight">Level:</span> ' + Seed.player.title +'</td>\
					<td style="text-align:right;"><span class="ptStatLight">Alliance:</span> ' + getMyAlliance()[1] +'</td>\
					<td style="text-align:right;"><span class="ptStatLight">Area:</span> ' + unsafeWindow.domainName +'</td>\
				</tr>\
				</table></div>';
      
      str += '<div id="overMainDiv" style="font-size:'+ Options.overviewFontSize +'px">\
				<table class="ptTabOverview" cellpadding="0" cellspacing="0">\
				<tr valign="top" align="right">\
					<td width="65"></td>\
					<td width="88" style="background: #AFF; text-align:right;"><b>TOTALS</b></td>';
      for(i=0; i<Cities.numCities; i++) {
        str += '<td width="81" style="text-align:right;"><b>'+ Cities.cities[i].name.substring(0,11) +'</b><br>'+ Cities.cities[i].x +','+ Cities.cities[i].y +'<br>'+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +'</td>';
      }
      str += '</tr>';
	  
			str += '<tr valign="top"><td></td><td style="background-color: #AFF"></td>';
			for(i=0; i<Cities.numCities; i++){
				cityID = 'city'+Cities.cities[i].id;
				Gate = parseInt(Seed.citystats[cityID].gate);
			if(Gate == 0)
				str += '<td style="text-align:right;">City</td>';
			else
				str += '<td style="text-align:right;"><span class="boldRed"><blink>DEFENDING</blink></span></td>';
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

      str += _row ('GOLD:', rows[0]);
      str += _row ('FOOD:', rows[1]);
      str += _row ('OIL:', rows[2]);
      str += _row ('STONE:', rows[3]);
      str += _row ('STEEL:', rows[4]);
      str += _row ('TITANIUM:', rows[5]);
      str += _row ('GRAPHENE:', rows[6]);
      //str += _row ('URANIUM:', rows[7]);
      //str += _row ('DIAMONS:', rows[8]);
      str += _rowbl();
	  
			for (r=1; r<25; r++){
				rows[r] = [];
				for(i=0; i<Cities.numCities; i++) {
					cityID = 'city'+ Cities.cities[i].id;
					if (Seed.units[cityID]['unt'+r]) {
						rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
					} else {
						rows[r][i] = 0;
					}
				}
			}

       rownum = 0;
	  str += _row ('Supply Truck:', rows[1]);
      str += _row ('Infantry:', rows[5]);
      str += _row ('Sniper:', rows[6]);
      str += _row ('Anti-Tank:', rows[4]);
	  str += _row ('Special Forces:', rows[18]);


      str += _row ('Mobile SAM:', rows[7]);	  
      str += _row ('Tank:', rows[8]);
      str += _row ('Predator Drone:', rows[17]);
      str += _row ('Supply Chopper:', rows[9]);
      str += _row ('Gunship:', rows[11]);  

      str += _row ('Fighter', rows[10]);
      str += _row ('Bombers:', rows[12]);
	  str += _row ('Cargos:', rows[19]);
      str += _row ('HellFires:', rows[16]);
      str += _row ('Stealth Bomber:', rows[13]);
	  str += _row ('Elite Mobile SAM:', rows[21]);
	  str += _row ('Elite Gunship:', rows[24]);
	  str += _row ('Nukes:', rows[15]);
	  str += _row ('ION:', rows[20]);			
      str += _rowbl();
			
			
			
       // for (r=52; r<=57; r++){
        // rows[r] = [];			
        // for(i=0; i<Cities.numCities; i++) {
          // cityID = 'city'+ Cities.cities[i].id;
					// if (Seed.fortifications[cityID]['fort'+r]) {
						// rows[r][i] = parseInt(Seed.fortifications[cityID]['fort'+r]);
					// } else {
						// rows[r][i] = 0;
					// }
        // }
      // }
	 
	 
	 	  //    Fortification
    
      for (r=1; r<8; r++){
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          x=r+51
          rows[r][i] = parseInt(Seed.fortifications[cityID]['fort'+x]);
          
           var perimeter = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos1[1]);
           
          if (r==2) {
            var temp=parseInt(Seed.fortifications[cityID]['fort'+x]) + rows[1][i];
            if (Options.showSpace){
              rows[8][i] = disposable[perimeter] - temp;                
            }
            else {
              if (temp < disposable[perimeter])
                rows[8][i] = '<SPAN class=boldBlue><B>'+ temp +'('+ perimeter +')' +'</b></span>'; 
              else
                rows[8][i] = '<SPAN class=boldBlue><B>'+ temp +'('+ perimeter +')' +'</b></span>';
            }
          }
          
          if (r==4) {
          var temp=parseInt(Seed.fortifications[cityID]['fort'+x]) + rows[3][i];
          if (Options.showSpace){
            rows[9][i] = stable[perimeter] - temp;                
          }
          else {


            if (temp < stable[perimeter])
              rows[9][i] = '<SPAN class=boldBlue><B>'+ temp + '('+ perimeter +')' + '</b></span>'; 
            else
              rows[9][i] = '<SPAN class=boldBlue><B>'+ temp + '('+ perimeter +')' + '</b></span>';
            }
          }
             
          if (r==6) {
          var temp=parseInt(Seed.fortifications[cityID]['fort'+x]) + rows[5][i];
              
          if (Options.showSpace){
            rows[10][i] = stable[perimeter] - temp;                
          }
          else {
            if (temp < stable[perimeter])
              rows[10][i] = '<SPAN class=boldBlue><B>'+ temp + '('+ perimeter +')' + '</b></span>'; 
            else
              rows[10][i] = '<SPAN class=boldBlue><B>'+ temp + '('+ perimeter +')' + '</b></span>';
            }
          }
        }

     
	 }
 	  rownum = 0;
	  // str += _row ('Mines:', rows[53]);
      // str += _row ('Stringers:', rows[52]);
      // str += _row ('Artillery:', rows[54]);
      // str += _row ('Anti Air:', rows[55]);
      // str += _row ('Rail Guns:', rows[56]);
      // str += _row ('Laser Turrets:', rows[57]);			
      // str += _rowbl();

	

            str += _row ('Mines:', rows[2],true);
            str += _row ('Stingers:', rows[1],true);
	        str += _row ('Level 9:', rows[8],true,true);
            str += _row ('Artillery:', rows[3],true);
            str += _row ('AA Guns:', rows[4],true);
            str += _row ('Level 10:', rows[9],true,true);  
            str += _row ('Railguns:', rows[5],true);
            str += _row ('Turrets:', rows[6],true);
            str += _row ('Level 11:', rows[10],true,true);
            str += '<TR><TD colspan=12><BR></td></tr>';
	  
      row = [];
      row2 = [];
      row3 = [];
      row4 = []; 
      row5 = []; 
      row6 = []; 		
			
      for(i=0; i<Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
				
				var ration = 1;
				if (Seed.bonus.bC1150.bT1151 > now) ration = 2;
				usage = parseInt(usage / ration);
        row3[i] = usage;
        row2[i] = rp[1];
				row[i] = rp[1] - usage;
				
				row4[i] = rp[2]; 
				row5[i] = rp[3]; 
				row6[i] = rp[4];					
      }
			rownum = 0;
      str += _row ('Production:', row2);        
	  str += _row ('Maintenance:', row3);
      str += _row ('Food Expenses:', row);
      
      for(i=0; i<Cities.numCities; i++) {
        if (row[i] >= 0)
          row[i] = '&infin;';
        else {
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-row[i]) * 3600;
          if (timeLeft > 86313600) 
            row[i] = '> ----';
          else {
            row[i] = timestrShort(timeLeft);
          }
        }
      }    
      str += _row ('Food Production:', row, true);
      str += _row ('Oil Production:', row4);			
      str += _row ('Stone Production:', row5);	
      str += _row ('Steel Production:', row6);				
      str += _rowbl();
      
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totWilds = 0;
        dat = Seed.wilderness['city'+ Cities.cities[i].id];
        if (dat!=null && matTypeof(dat)=='object')
          for (k in dat)
            ++totWilds;
        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
				if (castle == 11) castle = 13;
        if (totWilds < castle)
          row[i] = '<span class="boldRed">'+ totWilds +'/'+ castle +'</span>';
        else
          row[i] = totWilds +'/'+ castle;
      }
			rownum = 0;
      str += _row ('Wilds:', row, true);
  

      row = [];
	  row1 =[];
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
		row1[i] = t.freeEnergy(Cities.cities[i].id);
		
        for (k in dat) {
          ++totKnights;
		  	}
				GLevel = 0;
				var bau = Seed.buildings['city'+ Cities.cities[i].id];
				for (var g in bau) {
					b = bau[g];
					if (parseInt(b[0]) == 7) { 
						GLevel = parseInt(b[1]);
					}						
				}
				GMax = GLevel*2;
				if (totKnights < GMax) {
					row[i] = '<span class="boldRed">'+ totKnights + "/" + GMax + '</span>';
				} else {
					row[i] = totKnights + "/" + GMax;				
				}
      }
      str += _row ('Generals:', row, true);
	  str += _row ('Marches Remaining:', row1, true);
      str += _rowbl();
			
			
			
      var now = unixTime();
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.queue_con['city'+ Cities.cities[i].id][0]; 
        if (q!=null) {
          totTime = parseInt(q[4]) - now;
					if (totTime < 0) totTime = 0;
					row[i] = timestr(totTime);
        } else {
					row[i] = timestr(0);
				}   
      }
			rownum = 0;
			str += _row ('Construction:', row, true);
     
			
			
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.queue_tch['city'+ Cities.cities[i].id][0]; 			
        if (q!=null) {
          totTime = parseInt(q[3]) - now;
					if (totTime < 0) totTime = 0;
					row[i] = timestr(totTime);
        } else {
					row[i] = ' ';
				}   
      }
			str += _row ('Research:', row, true);

			

      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.training_queue['c'+Cities.cities[i].id]; 
        for (qs in q) {
					qe = q[qs];
					if (parseInt(qe.status) != 0 && parseInt(qe.eta) > now) {
						if (parseInt(qe.ticker) < now) {
							totTime += parseInt(qe.eta)-now;
						} else {
							totTime += parseInt(qe.eta)-parseInt(qe.ticker);
						}
					}
				}
				row[i] = timestr(totTime);
      }
      str += _row ('Training:', row, true);
      
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.fortify_queue['c'+Cities.cities[i].id]; 
        for (qs in q) {
					qe = q[qs];
					if (parseInt(qe.status) != 0 && parseInt(qe.eta) > now) {
						if (parseInt(qe.ticker) < now) {
							totTime += parseInt(qe.eta)-now;
						} else {
							totTime += parseInt(qe.eta)-parseInt(qe.ticker);
						}
					}
				}
			  row[i] = timestr(totTime);
      }    
      str += _row ('Defense:', row, true);	
			//  
			
			str += '<tr></table>';
			str += '<br><div style="text-align:center;">Font Size: ' + 
						htmlSelector ({9:9, 10:10, 11:11, 12:12}, Options.overviewFontSize, 'id="ptoverfont"') +
						'&nbsp;&nbsp;'+
						'Resize the menu: ' + 
						htmlSelector ({650:650, 700:700, 750:750, 800:800, 850:850}, Options.ptWinWidth, 'id="ptWinWidth"')+
						'</div></div>';    
				
			Tabs.Overview.cont.innerHTML = str;
      document.getElementById('ptoverfont').addEventListener('change', e_fontSize, false);
	  document.getElementById('ptWinWidth').addEventListener('change', e_winwidth, false);
    } catch (e){
			Tabs.Overview.cont.innerHTML = '<pre>'+ e.name +' : '+ e.message +' : Sira:'+e.lineNumber+'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);

    
    function e_fontSize(evt){
      document.getElementById('overMainDiv').style.fontSize = evt.target.value +'px'; 
      Options.overviewFontSize = evt.target.value;
			saveOptions();
    }
	function e_winwidth(evt){
      mainPop.div.style.width = evt.target.value +'px'; 
      Options.ptWinWidth = evt.target.value;
			saveOptions();
    }

  },
	
	freeEnergy : function(cid) {
		//var cid = "city" + Options.pbartcity.substr(1);
		var l1 = Seed.leaders['city'+cid].resourcefulnessKnightId;
		var l2 = Seed.leaders['city'+cid].politicsKnightId;		
		var l3 = Seed.leaders['city'+cid].combatKnightId;		
		var l4 = Seed.leaders['city'+cid].intelligenceKnightId;				
		var energy = 0;
		var generals = Seed.knights['city'+cid];
		var lagernd = [];
		for (var m in Seed.outgoing_marches['c'+cid]) {
			var march = Seed.outgoing_marches['c'+cid][m];
			if (march.marchType == 2 && march.marchStatus == 2 && march.knightId != 0) {
				lagernd.push(march.knightId);
			}
		}
		for (var g in generals) {
			if (generals[g].knightId == l1 || generals[g].knightId == l2 || generals[g].knightId == l3 || generals[g].knightId == l4) continue;
			if (lagernd.length > 0) {
				if (lagernd.exists(g.substr(3))) continue;
			}
			energy += parseInt(generals[g].knightEnergy);
		}
		return energy;
	},
	
	
	
	updatemarches: function() {
		var now = unixTime();
		for(var i=0; i<Cities.numCities; i++) {
			var cityId = Cities.cities[i].id;
			var marches = Seed.outgoing_marches['c'+cityId];
			for (var m in marches) {
				var march = marches[m];
				if (march.marchStatus != 0 && (march.marchType == 1 || march.marchType == 4) && march.returnUnixTime < now) {
					march.marchStatus = 0;
					if (march.knightId != 0 && Seed.knights['city'+cityId]['knt'+march.knightId]) {
						Seed.knights['city'+cityId]['knt'+march.knightId].knightStatus = 1;
					}
					if (march.marchType == 1) { 
						var post = "Count";
					} else { 
						var post = "Return";					
					}
					for (var r = 1; r < 25; r++){
						Seed.units['city'+cityId]['unt'+r] += parseInt(march['unit'+r+post]);
					}
				}
				if (march.marchStatus == 0) {
					if (march.knightId != 0 && Seed.knights['city'+cityId]['knt'+march.knightId]) {
						Seed.knights['city'+cityId]['knt'+march.knightId].knightStatus = 1;
						march.knightId = 0;					
					}
				}	
				
			}
    }
	},

}


/*********************************** Tower Tab****************************/
Tabs.tower = {
	tabOrder: 3,
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
	tabDisabled : !ENABLE_TOWER,
	uu: {
		u1: 'Supply Truck:',
        u2: 'uncertain:',
        u3: 'uncertain:',
        u4: 'Tank:',
        u5: 'Infantry:',
        u6: 'Sniper:',
        u7: 'SAM:',
        u8: 'Tank:',
        u9: 'Supply Chopper:',
        u10: 'Fighter:',
        u11: 'Gunship:',
        u12: 'Bomber:',
        u13: 'Stealth Bomber:',
        u14: 'uncertain:',
        u15: 'Nuclear Weapons:',
        u16: 'Anti-Tank:',
        u17: 'Predator Drone:',
        u18: 'Special Forces:',
        u19: 'Cargo Plane:',
        u20: 'Ion Cannon:',
        u21: 'Elite SAM:',
        u22: 'uncertain:',
        u23: 'uncertain:',
        u24: 'Elite Gunship:'	
	},

  init: function(div){
		var t = Tabs.tower;
    t.myDiv = div;
    var now = unixTime();
		var out = [];
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');	
		out.push('<b>TOWER MENU</b>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		out.push('<table class="pbTab" width="100%">');
		out.push('<tr>');
	  for (var i=0; i<Cities.cities.length; i++) {
			out.push('<td style="text-align:center"><span id="pbtacity_'+ i +'"><b>' + Cities.cities[i].name + '</b></span></td>');
    }
		out.push('</tr>');
		out.push('<tr>');
	  for (var cityId in Cities.byID) {
			out.push('<td style="text-align:center"><input type="submit" id="pbtabut_'+ cityId +'" value=""></td>');
		}
		out.push('</tr>');
		out.push('<tr>');
	  for (var cityId in Cities.byID) {
			out.push('<td style="text-align:center"><input id="pbattackqueue_' + cityId + '" type="submit" value="DETAILS"></td>');
		}
		out.push('</tr>');	
		out.push('<tr>');
	  for (var cityId in Cities.byID) {
			out.push('<td style="text-align:center" id="camo'+cityId+'"></td>');			
		}
		out.push('</tr>');	
		
		out.push('</table>');
		out.push('<br>');
		out.push("<b>VERSION:</b>FTBSuperSuperMagic");
		
		out.push('<br><hr>');
		
		out.push('<div id="pbitems"></div>');
		
		out.push('<hr><br>');	
		out.push('<div style="text-align:center;">');
		out.push('<input id="pbSoundStop" type="submit" value="Alarm Silence">');
		out.push('</div>');
		out.push('<div id="pbSwfPlayer"></div>');
		out.push('<br>');		

		out.push('<div class="pbStat">&nbsp;<b>Settings</b></div><br>');
		out.push('<table class="pbTab">');
		out.push('<tr>');		
		out.push('<td>');		
		out.push('<input id="pbalertEnable" type="checkbox" ' + (Options.alertConfig.aChat?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('<td>Automatically Sends Report of Attack to Alliance Chat..<br>&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td>&nbsp;</td>');
		out.push('<td>');
		
		out.push('<table>');	
		out.push('<tr>');			
		out.push('<td>Message Content:</td>');
		out.push('<td>');
		out.push('<input id="pbalertPrefix" type="text" size="40" value="'+ Options.alertConfig.aPrefix +'">');
		out.push('</td>');
		out.push('</tr>');
		/*
		out.push('<tr>');			
		out.push('<td>Scout Alert:</td>');
		out.push('<td>');
		out.push('<input id="pbalertScout" type="checkbox" '+ (Options.alertConfig.scouting?'checked="checked" ':'') +'>');
		out.push('&nbsp;&nbsp;(funktioniert noch nicht!)</td>');
		out.push('</tr>');
		*/
		out.push('<tr>');			
		out.push('<td>Land Attack Alert:</td>');
		out.push('<td>');
		out.push('<input id="pbalertWild" type="checkbox" '+ (Options.alertConfig.wilds?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');			
		out.push('<td>Status of Defense:&nbsp;&nbsp;</td>');
		out.push('<td>');
		out.push('<input id="pbalertDefend" type="checkbox" '+ (Options.alertConfig.defend?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');			
		out.push('<td>Minimum Number of Troops:</td>');
		out.push('<td>');
		out.push('<input id="pbalertTroops" type="text" size="5" value="'+ Options.alertConfig.minTroops +'">');
		out.push('&nbsp;&nbsp;<span id="pbalerterr"></span>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr><td><br></td></tr>');
		out.push('<tr>');
		out.push('<td>');
		out.push('<input id="pbSoundEnable" type="checkbox" '+ (Options.alertSound.enabled?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('<td>Set the given below link as alarm sound.<br>&nbsp;</td>');
		out.push('</tr>');
		
		out.push('<tr>');
		out.push('<td>&nbsp;</td>');
		out.push('<td>');
		out.push('<div id="pbLoadingSwf">FlashPlayer MUST upload SWF Player for Work..</div>');
		out.push('<div style="display:none" id="pbSoundOpts">');

		out.push('<table>');	
		out.push('<tr>');			
		out.push('<td>Audio File:&nbsp;</td>');
		out.push('<td>');
		out.push('<input id="pbsoundFile" type="text" size="31" value="'+ Options.alertSound.soundUrl +'">&nbsp;');
		out.push('<input id="pbSoundLoad" type="submit" value="Upload">&nbsp;');
		out.push('<input id="pbSoundDefault" type="submit" value="Varsayilan">&nbsp;<span id="pbLoadStat">Loading ..</span><br>&nbsp;');
		out.push('</td>');
		out.push('</tr>');		

		out.push('<tr>');			
		out.push('<td><span style="position:relative; top:-6px;">Volume Adjustment:</span>&nbsp;</td>');
		out.push('<td>');
		out.push('<table><tr>');
		out.push('<td style="vertical-align: middle;"><span style="display:inline;" id="pbVolSlider"></span></td>');
		out.push('<td style="vertical-align: middle;">&nbsp;&nbsp;&nbsp;<span id="pbVolOut">0</span>&nbsp;&nbsp;&nbsp;');
		out.push('</td>');
		out.push('</tr></table>');		
		out.push('</td>');
		out.push('</tr>');	

		out.push('<tr>');			
		out.push('<td>&nbsp;</td>');
		out.push('<td>&nbsp;<br>');		
		out.push('<input id="pbSoundRepeat" type="checkbox" '+ (Options.alertSound.repeat?'checked="checked"':'') +'>');
		out.push('&nbsp;Repetition Time<input style="text-align:center;" id="pbSoundEvery" type="text" size="2" value="'+ Options.alertSound.repeatDelay +'"> Minute');		
		out.push('<br>');
		out.push('S\u00fcresince: <input style="text-align:center;" id="pbSoundLength" type="text" size="3" value="'+ Options.alertSound.playLength +'"> Second');
		out.push('<br><br>');		
		out.push('<input type="submit" value="LISTEN" id="pbPlayNow">');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('</div><br>&nbsp;');
		out.push('</td>');
		out.push('</tr>');

		out.push('<tr>');
		out.push('<td>');
		out.push('<input id="pbTowerGeneral" type="checkbox" '+ ( Options.alertConfig.hireGeneral?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('<td>Auto-Appoint a chief of staff (chooses highest general free with at least two energy points)</td>');
		out.push('</tr>');
		
		out.push('<tr>');
		out.push('<td>');
		out.push('<input id="pbTowerAttackBoost" type="checkbox" '+ ( Options.alertConfig.useBoostAttack?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('<td>Auto-Use an attack amplifier (extra ammo or additional weapons). The articles are used only when necessary and available.!!</td>');
		out.push('</tr>');

		out.push('<tr>');
		out.push('<td>');
		out.push('<input id="pbTowerHealthBoost" type="checkbox" '+ ( Options.alertConfig.useBoostHealth?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('<td>Auto-Use health amplifier (kevlar vest or armor). The articles are used only when necessary and available.!!</td>');
		out.push('</tr>');
		
		out.push('</table>');
		out.push('<br>');
		
		m = out.join('');
  	t.myDiv.innerHTML = m;

    //t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:36, width:340}, t.e_swfLoaded, 'debug=y');
    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:0, width:0}, t.e_swfLoaded, 'debug=n');
    t.mss.swfDebug = function (m){ actionLog ('SWF: '+ m)};
    t.mss.swfPlayComplete = t.e_soundFinished;
    t.mss.swfLoadComplete = t.e_soundFileLoaded;
    unsafeWindow.matSimpleSound01 = t.mss;   //

    t.volSlider = new SliderBar (document.getElementById('pbVolSlider'), 200, 21, 0);
    t.volSlider.setChangeListener(t.e_volChanged);
    document.getElementById('pbTowerGeneral').addEventListener ('change', function (e){Options.alertConfig.hireGeneral = e.target.checked}, false);
    document.getElementById('pbTowerAttackBoost').addEventListener ('change', function (e){Options.alertConfig.useBoostAttack = e.target.checked}, false);
    document.getElementById('pbTowerHealthBoost').addEventListener ('change', function (e){Options.alertConfig.useBoostHealth = e.target.checked}, false);

    document.getElementById('pbPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
    document.getElementById('pbSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
    document.getElementById('pbSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked}, false);
    document.getElementById('pbSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value}, false);
    document.getElementById('pbSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value}, false);
    document.getElementById('pbSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked}, false);
    document.getElementById('pbSoundStop').disabled = true;
    document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
    //document.getElementById('pbalertScout').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertDefend').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
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
    setInterval (t.eachSecond, 1000);
		t.items();
    setInterval (t.items, 10000);		
  },      

  show : function (){
  },
  
  hide : function (){
  },

	items : function() {
		var out = document.getElementById('pbitems');
		var now = unixTime();
		var m = '<b>DETAILS</b><br><br>';
		m += '<table><tr>';
		m += '<td><b>ATTACK (+20%):</b>&nbsp;&nbsp;&nbsp;</td>';
		if (parseInt(Seed.bonus.bC2600.bT2601) > now) {
			var time = parseInt(Seed.bonus.bC2600.bT2601)	- now;
			m += '<td>'+timestr(time)+'&nbsp;&nbsp;&nbsp;</td>';
		} else {
			m += '<td>-----&nbsp;&nbsp;&nbsp;</td>';		
		}
		m += '<td>Extra ammo for 24 hours, 7 Days Extra Weapons</td>';	
		m += '</tr>';
		m += '<tr>';
		m += '<td><b>DEFENSE (+20%):</b>&nbsp;&nbsp;&nbsp;</td>';
		if (parseInt(Seed.bonus.bC2700.bT2701) > now) {
			var time = parseInt(Seed.bonus.bC2700.bT2701)	- now;
			m += '<td>'+timestr(time)+'&nbsp;&nbsp;&nbsp;</td>';
		} else {
			m += '<td>-----&nbsp;&nbsp;&nbsp;</td>';		
		}
		m += '<td>Kevlar vest for 24 hours, 7 Day Body Armor</td>';	
		m += '</tr>';	
		m += '<tr>';
		m += '<td><b>Peace Treaty:</b>&nbsp;&nbsp;&nbsp;</td>';
		if (Seed.player.warStatus == 3 && parseInt(Seed.player.truceExpireUnixTime) > now) {
			var time = parseInt(Seed.player.truceExpireUnixTime)	- now;
			m += '<td>'+timestr(time)+'&nbsp;&nbsp;&nbsp;</td>';
		} else {
			m += '<td>-----&nbsp;&nbsp;&nbsp;</td>';		
		}
		m += '<td>Peace Treaty of 12 hour, 7 day Peace Treaty</td>';	
		m += '</tr>';	
		m += '<tr>';
		m += '<td><b>Ration: (-50%):</b>&nbsp;&nbsp;&nbsp;</td>';
		if (parseInt(Seed.bonus.bC1150.bT1151) > now) {
			var time = parseInt(Seed.bonus.bC1150.bT1151)	- now;
			m += '<td>'+timestr(time)+'&nbsp;&nbsp;&nbsp;</td>';
		} else {
			m += '<td>-----&nbsp;&nbsp;&nbsp;</td>';		
		}
		m += '<td>Ration for 8 hours, 24 hour ration, 3 day ration</td>';
		m += '</tr>';			
		m += '</table>';		
		out.innerHTML = m;
		

		for (var cityId in Cities.byID) {
			var c = document.getElementById('camo'+cityId);
			//
			if (parseInt(Seed.antiscouting['city'+cityId]) > now) {
				var time = parseInt(Seed.antiscouting['city'+cityId])	- now;			
				c.innerHTML = '&nbsp;<br>Camouflage  ('+timestr(time)+')';			
			} else {
				c.innerHTML = '&nbsp;<br>No Camouflage ';		
			}
			//
			if (Seed.leaders['city'+cityId].combatKnightId != 0) {		
				c.innerHTML += '<br>General (Lvl.: '+Seed.knights['city'+cityId]['knt'+Seed.leaders['city'+cityId].combatKnightId].knightLevel+')';			
			} else {
				c.innerHTML += '<br>No Generals!';		
			}			
		}
		
	},
	
  loadUrl : function (url){
    var t = Tabs.tower;
    t.mss.load (1, url, true);
    document.getElementById('pbLoadStat').innerHTML = 'Loading ...';
  },
 
  e_swfLoaded : function (){
    var t = Tabs.tower;
    document.getElementById('pbLoadingSwf').style.display = 'none';
    document.getElementById('pbSoundOpts').style.display = 'inline';
    t.volSlider.setValue (Options.alertSound.volume/100);
    t.loadUrl (Options.alertSound.soundUrl);
    setTimeout (function (){t.mss.setVolume (1, Options.alertSound.volume);}, 500);
    if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime()) {
      t.soundTheAlert();
		}
  },
  
  e_alertOptChanged : function (){
    var t = Tabs.tower;
    Options.alertConfig.aChat = document.getElementById('pbalertEnable').checked;
    Options.alertConfig.aPrefix=document.getElementById('pbalertPrefix').value;      
    Options.alertConfig.scouting=document.getElementById('pbalertScout').checked;      
    Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
    Options.alertConfig.defend=document.getElementById('pbalertDefend').checked;
    var mt = parseInt(document.getElementById('pbalertTroops').value);
    if (mt<1 || mt>100000){
      document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;
      document.getElementById('pbalerterr').innerHTML = '<b style="color:#600000;">ungultig</b>';
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
    if (Seed.citystats["city" + cityId].gate != 0) {
      mode = 0;
		}
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
      but.value = 'Defense=ON';  
    } else {
      but.className = 'pbDefButOff';
      but.value = 'Defense=OFF';  
    }  
  },
    
  eachSecond : function (){
		var t = Tabs.tower;
		for (var cityId in Cities.byID){
			if (Seed.citystats["city" + cityId].gate != t.defMode[cityId]){ //
        t.defMode[cityId] = Seed.citystats["city"+ cityId].gate;
        t.displayDefMode (cityId);
      }
    }
  	var now = unixTime();
		var incomming = false;
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (var k in Seed.queue_atkinc){ // 
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
    if (Options.alertSound.alarmActive && (now > Options.alertSound.expireTime)) {
			t.stopSoundAlerts();
		}

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
			document.getElementById('pbattackqueue_' + cId).value = 'DETAILS' + t['attackCount_' + cId];
    }
  },   
  
  e_soundFinished : function (chan){
    var t = Tabs.tower;
    if (chan != 1) return;
    if (!Options.alertSound.alarmActive){
      document.getElementById('pbSoundStop').disabled = true;
    }
  },

  e_soundFileLoaded : function (chan, isError){
    if (chan != 1) return;
    if (isError)  
      document.getElementById('pbLoadStat').innerHTML = 'ERROR.!!';
    else
      document.getElementById('pbLoadStat').innerHTML = 'Completed  ..';
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
		
		var city = m.toCityId;
		if (Options.alertConfig.hireGeneral && 
				Seed.leaders['city'+city].combatKnightId == 0) {
			t.hireGeneral(city);
		}
		var now = unixTime();
		if (Options.alertConfig.useBoostAttack &&
				parseInt(Seed.bonus.bC2600.bT2601) < now) {		
			t.attackBoost(city);
		}
		if (Options.alertConfig.useBoostHealth &&
				parseInt(Seed.bonus.bC2700.bT2701) < now) {		
			t.attackHealth(city);
		}
    t.postToChat (m);
  },

	attackHealth : function(city) {
		i24h = Seed.items.i271;
		i7d = Seed.items.i272;  
		if (i24h == 0 && i7d == 0) {
			Logbuch.eintrag(Logs.globallog,'Boost your defenses <b>Kevlar Vest</b> OR <b>Body Armor</b>.');
			return;
		}
		if (i24h > 0) {
			var item = 271;
		} else {
			var item = 272;
		}
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = city;			
		params.iid = item;	
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "boostCombat.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					var expire = parseInt(rslt.expire, 10);
					if (Seed.playerEffects.length === 0) Seed.playerEffects = {};
					if (item === 261 || item === 262) Seed.bonus.bC2600.bT2601 = expire;
					else if (item === 271 || item === 272) Seed.bonus.bC2700.bT2701 = expire;
					Seed.items['i'+item]--;
					unsafeWindow.update_boosts();
					if (item == 271) {
						var iname = "Kevlar Vest";
					} else {
						var iname = "Body Armour";
					}
					Logbuch.eintrag(Logs.globallog,'Extra Defense Item <b>'+iname+'</b> used ..');		
				} else {
					var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
					Logbuch.eintrag(Logs.globallog,'Use Extra Defense Item FAILED.!<br><span class="boldRed">'+error+'</span>');			
				}
			},
			onFailure: function () {}
		});			
	},
	
	attackBoost : function(city) {
		i24h = Seed.items.i261;
		i7d = Seed.items.i262;  
		if (i24h == 0 && i7d == 0) {
			Logbuch.eintrag(Logs.globallog,'Strengthening attack <b>Extra ammunition</b> more <b>Extra weapons</b>.');
			return;
		}
		if (i24h > 0) {
			var item = 261;
		} else {
			var item = 262;
		}
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = city;			
		params.iid = item;	
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "boostCombat.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					var expire = parseInt(rslt.expire, 10);
					if (Seed.playerEffects.length === 0) Seed.playerEffects = {};
					if (item === 261 || item === 262) Seed.bonus.bC2600.bT2601 = expire;
					else if (item === 271 || item === 272) Seed.bonus.bC2700.bT2701 = expire;
					Seed.items['i'+item]--;
					unsafeWindow.update_boosts();
					if (item == 261) {
						var iname = "Extra Ammo";
					} else {
						var iname = "Extra Weapons";
					}
					Logbuch.eintrag(Logs.globallog,'Extra Attack Item <b>'+iname+'</b> Is Used ..');		
				} else {
					var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
					Logbuch.eintrag(Logs.globallog,'Use Extra Attack Item FAILED.!<br><span class="boldRed">'+error+'</span>');			
				}
			},
			onFailure: function () {}
		});			
	},
	
	hireGeneral : function(city) {
		var l1 = Seed.leaders['city'+city].resourcefulnessKnightId;
		var l2 = Seed.leaders['city'+city].politicsKnightId;		
		var l3 = Seed.leaders['city'+city].combatKnightId;		
		var l4 = Seed.leaders['city'+city].intelligenceKnightId;				
		var generals = Seed.knights['city'+city];
		var kid = 0;
		var experience = 0;
		for (var g in generals) {

			if (generals[g].knightId == l1 || generals[g].knightId == l2 || generals[g].knightId == l3 || generals[g].knightId == l4) continue;

			if (generals[g].knightEnergy < 2) continue;

			if (generals[g].knightStatus == 1 && parseInt(generals[g].experience) > experience) {
				kid = generals[g].knightId;
				experience = parseInt(generals[g].experience);
			}
		}	
		if (kid == 0) {

			Logbuch.eintrag(Logs.globallog,'NO IDLE GENERAL. '+Cities.byID[city].name+' No Chief of Staff..');			
		} else {

			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			params.cid = city;			
			params.kid = kid;	
			params.pos = 13; //		
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "assignknight.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					if (rslt.ok) {
						var general = Seed.knights["city" + city];
						general["knt" + kid].knightEnergy--;
						Seed.leaders["city" + city].combatKnightId = kid.toString();
						Seed.leaders["city" + city].leaderCombat = general["knt" + kid].knightLevel;
						Logbuch.eintrag(Logs.globallog,'General '+general["knt" + kid].knightName+' wurde in '+Cities.byID[city].name+' Fallible Chief of Staff....!');			
					} else {
						var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
						Logbuch.eintrag(Logs.globallog,'Appointment of General Error Has Occurred.. '+Cities.byID[city].name+'.<br><span class="boldRed">'+error+'</span>');			
					}
				},
				onFailure: function () {}
			});	
		}
	},
	
  sendalert : function (m){
    var t = Tabs.tower;
    var now = unixTime();
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
			onFailure: function () {}
		})
  },
  
  onUnload : function (){
  },

  postToChat : function (m){
    var t = Tabs.tower;
    var target, atkType, who;		
    if (m.marchType == 4){
      atkType = 'Sehirime:';
    } else {
			return;
    }
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId ) {
      target = 'City Coordinate: ('+ city.x +','+ city.y + ')';
	  } else {
      if (!Options.alertConfig.wilds)
        return;
      target = 'Wild Coordinate:';
	    for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' den ('+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord + ')';
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      who = Seed.players['u'+m.pid].n;
    else if (m.players && m.players['u'+m.pid])
      who = m.players['u'+m.pid].n;
    else
      who = 'Attacker';
  
    if (m.fromXCoord) {
      who += ' den ('+ m.fromXCoord +','+ m.fromYCoord + ')';
		}
		var alli = m.players['u'+m.pid].a;
		if (Seed.allianceNames['a'+alli]) 
				var allianceName = Seed.allianceNames['a'+alli]+', ';
			else 
				var allianceName = '';
		who += ' ('+allianceName + getDiplomacy(alli)+')';
	
    var msg = Options.alertConfig.aPrefix +' ';
		msg += 'My  '+ target +' is attacking '+ atkType  +' Me Attack Type: Attack The Person Who: '+ who +' Soldiers To Reach My City:  '+ unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +' Number of Troops: ';
    var totTroops = 0;
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
			msg += addCommas(m.unts[k]) + ' ' + t.uu[k] + ', ';
			totTroops += m.unts[k];
	  }
    if (totTroops < Options.alertConfig.minTroops)
      return;
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 17); //
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
        msg += ' My Embassy Level with space and position: '+ availSlots +' - '+ emb.maxLevel +' \'dur.';
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            msg+= ' My Soldiers are hiding';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            msg+= ' My soldiers are defending';
        }
      }
    }
		try {
			t.sendalert(m);
		} catch (e) {}
    if (!Options.alertConfig.aChat) return;
    sendChat ("/a "+  msg);  //  
	},
  
	handleTowerData: function(m){
		var t = Tabs.tower;
		var now = unixTime();
		var target, atkType, who, attackermight, allianceId, allianceName, diplomacy;
		var city = Cities.byID[m.toCityId];
        

		if (m.marchType == 4) {
			atkType = 'Attack';
      t['attackCount_' + m.toCityId]++;
    } else {
			return;
    }

    if (city.tileId == m.toTileId)
			target = 'This is my CITY ' + city.x + ',' + city.y;
    else {
			target = ' ';
			for (k in Seed.wilderness['city' + m.toCityId]) {
				if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
					target += ' den ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord;
					break;
				}
			}
		}
		//CITYNAME
		var cityName = Cities.byID[m.toCityId].name;
        
		//TROOPS
		var units = [];
		for (i = 1; i < 25; i++) {
			units[i] = 0;
		}
		for (k in m.unts) {
			var uid = parseInt(k.substr(1));
			units[uid] = m.unts[k];
		}
    //ATTACKERS INFORMATION
		if (Seed.players['u' + m.pid]) {
			who = Seed.players['u' + m.pid].n;
			attackermight = Seed.players['u' + m.pid].m;
			allianceId = ['a' + Seed.players['u' + m.pid].a ];
			if (Seed.allianceNames[allianceId]) 
				allianceName = Seed.allianceNames[allianceId];
			else 
				allianceName = 'None';
			diplomacy = getDiplomacy(allianceId);
		} else if (m.players && m.players['u' + m.pid]) {
			who = m.players['u' + m.pid].n;
			attackermight = parseInt(m.players['u' + m.pid].m);
			allianceId = 'a' + m.players['u' + m.pid].a;
			if (Seed.allianceNames[allianceId]) 
				allianceName = Seed.allianceNames[allianceId];
			else 
				allianceName = 'None';
			diplomacy = getDiplomacy(allianceId);
		} else {
			who = 'n.A.';
			attackermight = 'n.A.';
			allianceId = 'n.A.';
			allianceName = 'n.A.';
			diplomacy = 'n.A.';
		}
		//SOURCE
    if (m.fromXCoord) {
			var source = m.fromXCoord + ',' + m.fromYCoord;
		} else {
			var source = 'None';
    }    
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
	
	showTowerIncoming: function (cityId) {
		var t = Tabs.tower;
		var popTowerIncoming = null;
		var cityName = Tabs.build.getCityNameById(cityId);
		if (t.popTowerIncoming == null) {
			t.popTowerIncoming = new CPopup('pbtower_' + cityId, 0, 0, 1200, 500, true, function () {
				clearTimeout(t.timer);
			});
		}
		t.popTowerIncoming.show(false);
		var m = '<div id="pbCityTowerContent" style="max-height:460px; height:460px; overflow-y:auto">';
		t.popTowerIncoming.getMainDiv().innerHTML = m + '</div>';
		t.popTowerIncoming.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Attack Details Showing your city: ' + cityName + '</b>';
		t.addCityData2Pop(cityId);
		t.popTowerIncoming.show(true);
		clearTimeout(t.timer);
		t.timer = setTimeout(function () {t.showTowerIncoming(cityId)}, 5000);
	},
	
	addCityData2Pop: function (cityId) {
		var t = Tabs.tower;
		var rownum = 0;
		var names = ['Supply Truck','Anti-Tank','Infantry','Sniper','SAM','Tank','Supply Chopper','Fighter','Gunship','Bomber','Stealth Bomber','Nuclear Weapons','HellFire','Predator','Special OP','Cargo','Ion','Elite SAM','Elite Gunship'];
		enc = {};
		numSlots = 0;
		var row = document.getElementById('pbCityTowerContent').innerHTML = "";
		if (matTypeof(Seed.queue_atkinc) != 'array') {
			for (k in Seed.queue_atkinc) {
				var march = Seed.queue_atkinc[k];
				if (march.marchType == 2) {
					numSlots++;
					city = march.toCityId;
					from = march.fromPlayerId;
					if (!enc[city]) enc[city] = {};
					if (!enc[city][from]) enc[city][from] = [];
					k = [];
					k[0] = parseInt(march.knightCombat);
					for (i = 1; i < 25; i++) {
						if (Options.encRemaining) 
							k[i] = parseInt(march['unit' + i + 'Return']);
						else 
							k[i] = parseInt(march['unit' + i + 'Count']);
					}
					k[100] = parseInt(march.marchStatus);
					var now = unixTime();
					k[101] = parseInt(march.destinationUnixTime) - now;
					enc[city][from].push(k);
				}
			}
		}
		var s1 = '';
		var s2 = '';
		var s3 = '';
		var tot = [];
		var atk = [];
		for (i = 0; i < 25; i++) {
			tot[i] = 0;
			atk[i] = 0;
		}

		s1 += '<style> .oben{background:white; padding: 2px;} .tot{background:#f0e0f8; padding: 2px;} .city1{background:#ffffaa; padding: 2px;} .attack{background:#FF9999; padding: 2px;} .own{background:#66FF66; padding: 2px;}</style>';
		s1 += '<table width="100%"><tr><td class="oben">&nbsp;</td>';

		for (k = 0; k < names.length; k++)
		s1 += '<td style="text-align:right;" class="oben" width="5%"><b>' + names[k] + '</b></td>';
		s1 += '</tr>';
		dest = cityId;
		if (enc[dest]) {
			for (p in enc[dest]) {
				try {
					player = Seed.players['u' + p].n;
				} catch (err) {
					player = '???';
				}
				for (m = 0; m < enc[dest][p].length; m++) {
					knight = '';
					if (enc[dest][p][m][0] > 0)
						knight = ' (Gen.: ' + enc[dest][p][m][0] + ')';
					stat = 'x';
					if (enc[dest][p][m][100] == 1) {
						stat = ' (' + timestr(enc[dest][p][m][101]) + ')';
						if (enc[dest][p][m][101] < 0) 
							stat = ' (Defender)';
						else 
							stat = ' (' + timestr(enc[dest][p][m][101]) + ')';
					}
					if (enc[dest][p][m][100] == 2) {
						stat = ' (Defender)';
					}
					s1 += '<tr><td class="city1">';
					//s1 += '<input id="sendhome_' + m + '" type="submit" value="Geri YOLLA" title="Send Back Units">&nbsp;';
					s1 += '<b>' + player + '</b>' + stat + knight;
					s1 += '</td>'
					var ii = 0;
					for (i = 1; i < 25; i++) {
						if (i == 2 || i == 3 || i == 14 || i == 22 || i == 23) continue;
						num = enc[dest][p][m][i];
						s1 += '<td style="text-align:right;" class="city1">' + addCommas(num) + '</td>';
						tot[i] += num;
					}
					s1 += '</tr>';

				}
			}
		} else {
			s1 += '<tr><td class="city1"><b>Reinforcement Associations:</b></td>'
			for (i = 1; i < 25; i++) {
				if (i == 2 || i == 3 || i == 14 || i == 22 || i == 23) continue;
				s1 += '<td style="text-align:right;" class="city1">0</td>';
			}
			s1 += '</tr>';
		}
		s1 += '<tr><td colspan="25"><br></tr>';
		s1 += '<tr><td class="own"><B>Your own Military Associations:</b></td>';
		//OWNTROOPS
		var ownTroops = "";
		for (r = 1; r < 25; r++) {
			if (r == 2 || r == 3 || r == 14 || r == 22 || r == 23) continue;
			cityString = 'city' + cityId;
			num = parseInt(Seed.units[cityString]['unt' + r]);
			s1 += '<td style="text-align:right;" class="own">' + addCommas(num) + '</td>';
			tot[r] += num;
		}

		s3 += '<td class="city"></td><tr><td colspan="18"><br></td></tr><tr><td class="tot"><b>Content from the INTRUSION:</b></td>';

		if (t.towerMarches.length > 0) {
			for (k in t.towerMarches) {
				if (typeof t.towerMarches[k].atkType != 'undefined') {
					if (t.towerMarches[k].cityId == cityId) {
						s3 += '<table>';
						s3 += '<tr><td colspan="2">&nbsp;</td></tr>';
						s3 += '<tr>';
						s3 += '<td><b>Sira:&nbsp;&nbsp;</b></td>';
						s3 += '<td>' + t.towerMarches[k].target + '</td>';
						s3 += '</tr>'
						
						s3 += '<tr>';						
						s3 += '<td><b>General:&nbsp;&nbsp;</b></td>';
						s3 += '<td>' + t.towerMarches[k].who + '</td>';						
						s3 += '</tr>'
						
						s3 += '<tr>';							
						s3 += '<td><b>From Here:&nbsp;&nbsp;</b></td>'
						s3 += '<td>' + t.towerMarches[k].source + '</td>';	
						s3 += '</tr>'

						s3 += '<tr>';							
						s3 += '<td><b>Walking:&nbsp;&nbsp;</b></td>'
						s3 += '<td>' + addCommas(t.towerMarches[k].attackermight) + '</td>';						
						s3 += '</tr>'
						
						s3 += '<tr>';
						s3 += '<td><b>Alliance:&nbsp;&nbsp;</b></td>'
						s3 += '<td>' + t.towerMarches[k].allianceName + '</td>';
						s3 += '</tr>'
						
						s3 += '<tr>';
						s3 += '<td><b>Diplomacy:&nbsp;&nbsp;</b></td>';
						s3 += '<td>' + t.towerMarches[k].diplomacy + '</td>';						
						s3 += '</tr>'
						
						s3 += '<tr>';						
						s3 += '<td><b>Incoming:&nbsp;&nbsp;</b></td>'
						s3 += '<td>' + t.towerMarches[k].rtime + '</td>';						
						s3 += '</tr>'
						s3 += '</table>';
						
						s3 += '<table cellspacing="0" width="100%"><tr><td style="text-align:left;">&nbsp;</td>';
						for (n = 0; n < names.length; n++)
						s3 += '<td style="text-align:right;" width="5%"><b>' + names[n] + '</b></td>';
						s3 += '</tr><tr><td class="attack" style="text-align:left;"><b>Birimler:</b></td>';
						var m = Seed.queue_atkinc;
						for (u = 1; u < 25; u++) {
							if (u == 2 || u == 3 || u == 14 || u == 22 || u == 23) continue;
							num = t.towerMarches[k].units[u];
							s3 += '<td class="attack" style="text-align:right;">' + addCommas(parseInt(num)) + '</td>';
							atk[u] += parseInt(num);
						}
						s3 += '</tr></table>';
					}

				}

			}
		}
		s2 += '<tr><td colspan="18"><br></td></tr><tr><td class="attack"><b>Attacker:</b></td>';
		for (a = 1; a < 25; a++) {
			if (a == 2 || a == 3 || a == 14 || a == 22 || a == 23) continue;
			s2 += '<td class="attack" style="text-align:right;">' + addCommas(atk[a]) + '</td>';
		}
		var html = s1 + s2 + s3;
		document.getElementById('pbCityTowerContent').innerHTML = html;


		
	},
	

	sendReinforcmentHome: function (mid, cid, fromUid, fromCid, upkeep) { 

   	var params = Object.clone(g_ajaxparams);
   	params.mid = mid;
   	params.cid = cid;
   	params.fromUid = fromUid;
   	params.fromCid = fromCid;
   	new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
   		method: "post",
   		parameters: params,
   		onSuccess: function (transport) {
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
   			} else {
   				Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
   			}
   		},
   		onFailure: function () {}
   	})
	},	

}

/**************************** Transport Tab  *******************************/
Tabs.transport = {
  tabOrder: 2,
  tabLabel: 'Transport',
	tabDisabled : !ENABLE_TRANSPORT,
  myDiv: null,
  timer: null,
  traderState: [],
  lTR: [],
  tradeRoutes: [],
  checkdotradetimeout: null,
  count:0,
  check:false,
	uu: {
		'u1'  : 'Supply Truck:',
		'u9'  : 'Supply Chopper:',
		'u19' : 'Cargo Plane:',								
	},
	reportTimer: null,
	
	init: function(div){
		var t = Tabs.transport;
		t.myDiv = div;
		t.traderState = {running: false,};
		t.readTraderState();
	  t.readTradeRoutes();
		var out = [];	

		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>TRANSPORT MENU</b>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');

		out.push('<table width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');

		if (t.traderState.running == false) {
			out.push('<input id="pbTraderState" type="submit" value="Transport = OFF">');
		} else {	
			out.push('<input id="pbTraderState" type="submit" value="Transport = ON">');	
			t.report();
		}
		out.push('&nbsp;&nbsp;&nbsp;<input id="pbShowRoutes" type="submit" value="Show Routes">');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');		

		out.push('<br>');
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>Auto Transport Options</b>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');

		out.push('<table width="100%">');
		out.push('<tr>');		
		out.push('<td>');		
		out.push('Time interval between transports:');
		out.push('<input id="pbtransportinterval" style="text-align:center;" type="text" size="2" value="'+Options.transportinterval+'"> Minutes:');
		out.push('</td>');
		out.push('</tr>');	
		out.push('<tr>');		
		out.push('<td>');		
		out.push('Dont send transport out if less than ');
		out.push('<input id="pbminwagons" style="text-align:center;" type="text" size="2" value="'+Options.minwagons+'"> transports are needed. (Needless transports are skipped this way)   ');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td>');		
		out.push('<input id="ptdeletereports" type="checkbox"'+(Options.deletetransports?' checked="checked"':'')+'>&nbsp;');
		out.push('Click in the box to DELETE the Transport Reports');
		out.push('</td>');
		out.push('</tr>');		
		
		out.push('</table>');			
		out.push('<br>');
		
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>Auto Transport</b>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');
		out.push('<br>');		
		out.push('<br>');

		out.push('<table id="pbaddtraderoute">');
		out.push('<tr>');	
		out.push('<td>From City:&nbsp;</td>');			
		out.push('<td><span id="ptrescity"></span></td>');
		out.push('</tr>');
		out.push('<tr>');			
		out.push('<td>To City:&nbsp;</td>');	
		out.push('<td><span id="ptcityTo"></span></td>');
		out.push('</tr>');		
		out.push('<tr>');	
		out.push('<td>OR, Coordinates:&nbsp;</td>');	
		out.push('<td>');
		out.push('<input id="ptcityX" style="text-align:center;" type="text" size="3">&nbsp;/&nbsp;');
		out.push('<input id="ptcityY" style="text-align:center;" type="text" size="3">')		
		out.push('</td>');
		out.push('</tr>');			
		out.push('</table>');
		out.push('<br>');
	
		out.push('<table id="pbaddtraderoute">');	
		out.push('<tr>');	
		out.push('<td>Transport Type:&nbsp;</td>');
		out.push('<td>');
		out.push('<select id="TransportTroop">');
		for (y in t.uu) {
			var troop = t.uu[y];
			out.push('<option value="'+findoptvalue(y)+'">');
			out.push(troop);
			out.push('</option>');
		}
		out.push('</select>');
		out.push('</td>');		
		out.push('<td>&nbsp;&nbsp;With:&nbsp;');
		out.push('<span id="TroopAmount"></span>');
		out.push('&nbsp;/&nbsp;Capacity:&nbsp;');
		out.push('<span id="CarryAmount"></span>');
		out.push('</td>');		
		out.push('</tr>');
		
		out.push('<tr>');		
		out.push('<td>Count:&nbsp;</td>');
		out.push('<td>');
		out.push('<input id="TroopsToSend" style="text-align:center;" type="text" size="6" maxlength="9" value="0">');
		out.push('&nbsp;&nbsp;');
		out.push('<input id="MaxTroops" type="submit" value="MAX">');
		out.push('</td>');	
		out.push('<td>');
		out.push('&nbsp;&nbsp;<input id="FillInMax" type="submit" value="DELETE">&nbsp;');
		out.push('<span id="Calc"></span>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');		

		
		out.push('<table id="pbaddtraderoute" width="100%">');
		out.push('<tr>');			
		out.push('<td><b>Material&nbsp;</b></td>');
		out.push('<td style="text-align:right;"><b>From Here:</b></td>');
		out.push('<td style="text-align:right;"><b>To Here</b></td>');
		out.push('<td style="text-align:center;">&nbsp;<b>ACTIVE</b>&nbsp;</td>');
		out.push('<td><b>KEEP</b></td>');
		out.push('<td><b>Amount to be moved</b></td>');
		out.push('<td>&nbsp;</td>');
		out.push('</tr>');
		//
		
     	out.push('<tr>');			
		out.push('<TD width=5%><img height=35px width=35px src=' + FOOD_IMAGE +');</td>');
		out.push('<td id="TransRec1" style="text-align:right;"></td>');
		out.push('<td id="HaveRec1" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipFood" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountFood" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountFood" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxFood" type="submit" value="MAX"></td>');
		out.push('</tr>');
		//
		out.push('<tr>');			
		out.push('<TD width=5%><img height=35px width=35px src=' + OIL_IMAGE +')</td>');
		out.push('<td id="TransRec2" style="text-align:right;"></td>');
		out.push('<td id="HaveRec2" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipOil" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountOil" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountOil" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxOil" type="submit" value="MAX"></td>');
		out.push('</tr>');	
		//
		out.push('<tr>');			
		out.push('<TD width=5%><img height=35px width=35px src=' + STONE_IMAGE +')</td>');
		out.push('<td id="TransRec3" style="text-align:right;"></td>');
		out.push('<td id="HaveRec3" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipStone" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountStone" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountStone" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxStone" type="submit" value="MAX"></td>');
		out.push('</tr>');	
		//
		out.push('<tr>');			
		out.push('<TD width=5%><img height=35px width=35px src=' + STEEL_IMAGE +')</td>');
		out.push('<td id="TransRec4" style="text-align:right;"></td>');
		out.push('<td id="HaveRec4" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipSteel" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountSteel" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountSteel" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxSteel" type="submit" value="MAX"></td>');
		out.push('</tr>');	
		//
		out.push('<tr>');			
		out.push('<TD width=5%><img height=35px width=35px src=' + GRAPH_IMAGE +')</td>');
		out.push('<td id="TransRec5" style="text-align:right;"></td>');
		out.push('<td id="HaveRec5" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipTita" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountTita" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountTita" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxTita" type="submit" value="MAX"></td>');
		out.push('</tr>');	
		//	
		out.push('<tr>');			
		out.push('<TD width=5%><img height=35px width=35px src=' + TITA_IMAGE +')</td>');
		out.push('<td id="TransRec6" style="text-align:right;"></td>');
		out.push('<td id="HaveRec6" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipGraph" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountGraph" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountGraph" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxGraph" type="submit" value="MAX"></td>');
		out.push('</tr>');	
		//
		out.push('<tr>');			
		out.push('<TD width=5%><img height=35px width=35px src=' + GOLD_IMAGE +'></td>');
		out.push('<td id="TransGold" style="text-align:right;"></td>');
		out.push('<td id="HaveGold" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipGold" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountGold" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountGold" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxGold" type="submit" value="MAX"></td>');
		out.push('</tr>');	
		out.push('</table>');
		out.push('<br>');
		//
		out.push('<div id="pbTraderDivDRoute" style="text-align:center;">');
		out.push('<input id="pbSaveRoute" type="submit" value="ADD Route">&nbsp;&nbsp;');	
		out.push('<input id="pbManualSend" type="submit" value="Manual Transport">');
		out.push('</div>');
		out.push('<br>');
		out.push('<div id="errorSpace"></div>');
		//
		out.push('<hr>');
		out.push('<table width="100%">');
		out.push('<tr>');
		out.push('<td><b>Department of Transport Activity Monitoring</b><br><br></td>');
		out.push('<td style="text-align: right;">');
		out.push('<input id="ptButClearTransLog" type="submit" name="ClearBLog" value="CLEAR">');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td colspan="2">');
		out.push('<div id="pbtranslog" style="height: 150px; overflow: auto;"></div>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');

    t.myDiv.innerHTML = out.join('');
    
		try {	
			t.e_tradeRoutes();
		} catch (e) { }	
		
		document.getElementById('TransportTroop').value = 'unt19';
      
		t.tcp = new CdispCityPicker ('pttrader', document.getElementById('ptrescity'), true, t.updateResources, 0);
		t.tcpto = new CdispCityPicker ('pttraderTo', document.getElementById('ptcityTo'), true, t.clickCitySelect).bindToXYboxes(document.getElementById ('ptcityX'), document.getElementById ('ptcityY'));

		document.getElementById('ptdeletereports').addEventListener('click', function(){
			if (document.getElementById('ptdeletereports').checked == true) {
				document.getElementById('ptdeletereports').checked = true;
				Options.deletetransports = true;
			} else {
				document.getElementById('ptdeletereports').checked = false;
				Options.deletetransports = false;
			}
			saveOptions();
		},false);

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
			document.getElementById('pbtradeamountFood').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);
		
		document.getElementById('MaxOil').addEventListener('click', function(){
			t.Oil = 0;
			document.getElementById('pbtradeamountOil').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);
		
		document.getElementById('MaxStone').addEventListener('click', function(){
			t.Stone = 0;
			document.getElementById('pbtradeamountStone').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);
		
		document.getElementById('MaxSteel').addEventListener('click', function(){
			t.Steel = 0;
			document.getElementById('pbtradeamountSteel').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);

		document.getElementById('MaxGraph').addEventListener('click', function(){
			t.Graph = 0;
			document.getElementById('pbtradeamountGraph').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);

		document.getElementById('MaxTita').addEventListener('click', function(){
			t.Tita = 0;
			document.getElementById('pbtradeamountTita').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);
		
		document.getElementById('MaxGold').addEventListener('click', function(){
			t.Gold = 0;
			document.getElementById('pbtradeamountGold').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);
      
		document.getElementById('pbtransportinterval').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtransportinterval').value)){ 
				document.getElementById('pbtransportinterval').value = 60;
			}
			Options.transportinterval = document.getElementById('pbtransportinterval').value;
			saveOptions();
		}, false);
      
		document.getElementById('pbtargetamountFood').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountFood').value)) 
				document.getElementById('pbtargetamountFood').value = 0;
		}, false);
		
		document.getElementById('pbtargetamountOil').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountOil').value)) 
				document.getElementById('pbtargetamountOil').value = 0;
		}, false);
		
		document.getElementById('pbtargetamountStone').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountStone').value)) 
				document.getElementById('pbtargetamountStone').value = 0;
		}, false);
		
		document.getElementById('pbtargetamountSteel').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountSteel').value)) 
				document.getElementById('pbtargetamountSteel').value = 0;
		}, false);

		document.getElementById('pbtargetamountGraph').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountGraph').value)) 
				document.getElementById('pbtargetamountGraph').value = 0;
		}, false);

		document.getElementById('pbtargetamountTita').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountTita').value)) 
				document.getElementById('pbtargetamountTita').value = 0;
		}, false);
		
		document.getElementById('pbtargetamountGold').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountGold').value)) 
				document.getElementById('pbtargetamountGold').value = 0;
		}, false);

		
		document.getElementById('pbtradeamountFood').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountFood').value)) 
				document.getElementById('pbtradeamountFood').value = 0;
		}, false);
		
		document.getElementById('pbtradeamountOil').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountOil').value)) 
				document.getElementById('pbtradeamountOil').value = 0;
		}, false);
			
		document.getElementById('pbtradeamountStone').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountStone').value)) 
				document.getElementById('pbtradeamountStone').value= 0;
		}, false);
		
		document.getElementById('pbtradeamountSteel').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountSteel').value)) 
				document.getElementById('pbtradeamountSteel').value = 0;
		}, false);

		document.getElementById('pbtradeamountGraph').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountGraph').value)) 
				document.getElementById('pbtradeamountGraph').value = 0;
		}, false);
		
		document.getElementById('pbtradeamountTita').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountTita').value)) 
				document.getElementById('pbtradeamountTita').value = 0;
		}, false);
		
		document.getElementById('pbtradeamountGold').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountGold').value)) 
				document.getElementById('pbtradeamountGold').value = 0;
		}, false);
			
			
		document.getElementById('pbminwagons').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbminwagons').value)) 
				document.getElementById('pbminwagons').value = 100;
			Options.minwagons = parseInt(document.getElementById('pbminwagons').value);
			saveOptions();
		}, false)
      
		document.getElementById('pbshipFood').addEventListener('click', function(){
			if (document.getElementById('pbshipFood').checked == false) {
				document.getElementById('pbtargetamountFood').disabled = true;
			} else {
				document.getElementById('pbtargetamountFood').disabled = false;
			}
		},false);
		
		document.getElementById('pbshipOil').addEventListener('click', function(){
			if (document.getElementById('pbshipOil').checked == false) {
				document.getElementById('pbtargetamountOil').disabled = true;
			} else {
				document.getElementById('pbtargetamountOil').disabled = false;
			}
		},false);
		
		document.getElementById('pbshipStone').addEventListener('click', function(){
			if (document.getElementById('pbshipStone').checked == false) {
				document.getElementById('pbtargetamountStone').disabled = true;
			} else {
				document.getElementById('pbtargetamountStone').disabled = false;
			}
		},false);
		
		document.getElementById('pbshipSteel').addEventListener('click', function(){
			if (document.getElementById('pbshipSteel').checked == false) {
				document.getElementById('pbtargetamountSteel').disabled = true;
			} else {
				document.getElementById('pbtargetamountSteel').disabled = false;
			}
		},false);

		document.getElementById('pbshipGraph').addEventListener('click', function(){
			if (document.getElementById('pbshipGraph').checked == false) {
				document.getElementById('pbtargetamountGraph').disabled = true;
			} else {
				document.getElementById('pbtargetamountGraph').disabled = false;
			}
		},false);
		
		document.getElementById('pbshipTita').addEventListener('click', function(){
			if (document.getElementById('pbshipTita').checked == false) {
				document.getElementById('pbtargetamountTita').disabled = true;
			} else {
				document.getElementById('pbtargetamountTita').disabled = false;
			}
		},false);
		
		document.getElementById('pbshipGold').addEventListener('click', function(){
			if (document.getElementById('pbshipGold').checked==false) {
				document.getElementById('pbtargetamountGold').disabled = true;
			} else {
				document.getElementById('pbtargetamountGold').disabled = false;
			}
		},false);

		document.getElementById('ptButClearTransLog').addEventListener('click', function(){
			Logs.translog = [];
			saveLogs();
			t.logbuch(); 
		},false);
		
		if (!Logs.translog) {
			Logs.translog = [];
			saveLogs();		
		}
		
		t.logbuch();
	},

	logbuch: function() {
    var t = Tabs.transport;
		var log = Logbuch.ausgabe(Logs.translog);
		document.getElementById('pbtranslog').innerHTML = log;
	},
	
	updateResources : function (){
		var t = Tabs.transport;
		var ToCity = null;
		for (var i=1;i<=6;i++) {
			document.getElementById('TransRec'+i).innerHTML = addCommas(parseInt(Seed.resources["city" + t.tcp.city.id]['rec'+i][0]/3600));
		}
		document.getElementById('TransGold').innerHTML = addCommas(parseInt(Seed.citystats["city" + t.tcp.city.id]['gold'][0]));
		for (ii in Seed.cities) {
			if (Seed.cities[ii][2] == document.getElementById ('ptcityX').value && 
					Seed.cities[ii][3] == document.getElementById ('ptcityY').value) {
				ToCity = Seed.cities[ii][0];
			}
		}
		for (var i=1;i<=6;i++) {
			if (ToCity != null) {
				document.getElementById('HaveRec'+i).innerHTML = addCommas(parseInt(Seed.resources["city" + ToCity]['rec'+i][0]/3600));
			} else {
				document.getElementById('HaveRec'+i).innerHTML = "----";
			}
		}
		if (ToCity != null) {
			document.getElementById('HaveGold').innerHTML = addCommas(parseInt(Seed.citystats["city" + ToCity]['gold'][0]));
		} else {
			document.getElementById('HaveGold').innerHTML =  "----"; 
		}
	},
    
	updateTroops : function (city){
		var t = Tabs.transport;
		var fontcolor = 'black';
		t.Food = parseInt(document.getElementById('pbtradeamountFood').value);
		t.Oil = parseInt(document.getElementById('pbtradeamountOil').value);
		t.Stone = parseInt(document.getElementById('pbtradeamountStone').value);
		t.Steel = parseInt(document.getElementById('pbtradeamountSteel').value);
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
		t.TroopsNeeded = (t.Food + t.Oil + t.Stone + t.Steel + t.Graph + t.Tita + t.Gold) / LoadUnit;
		t.TroopsNeeded = t.TroopsNeeded.toFixed(0);	
		if (t.TroopsNeeded < ((t.Food + t.Oil + t.Stone + t.Steel + t.Graph + t.Tita + t.Gold) / LoadUnit)) {
			t.TroopsNeeded++;	
    }    
		if ( t.TroopsNeeded > t.Troops) {
			fontcolor = 'red';
		}
		if (t.Troops > 0) {
			document.getElementById('TroopAmount').innerHTML = '<span style="color:'+fontcolor+'">' + addCommas(t.Troops) + '</span>';
    } else {
			document.getElementById('TroopAmount').innerHTML = 0;
		}
		if (GlobalMaxLoad > 0) {
			document.getElementById('CarryAmount').innerHTML = addCommas(GlobalMaxLoad);
		} else {
			document.getElementById('CarryAmount').innerHTML = 0;
    }	
		document.getElementById('Calc').innerHTML = 'Resource Amount: ' +  addCommas(t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita) + ' / ' + addCommas(t.MaxLoad) + '&nbsp;(Units needed: ' + addCommas(t.TroopsNeeded) + ')';
	},    
    
	getRallypoint: function(cityId){
		var t = Tabs.transport;
		for (var o in Seed.buildings[cityId]) {
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
		if (t.traderState.running == true) {
			var now = new Date().getTime()/1000.0;
			now = now.toFixed(0);
			var last = Options.lasttransport;
			if (now > (parseInt(last) + (Options.transportinterval*60))) {		
				t.checkdoTrades();
			}
    }
	  setTimeout(function(){ t.e_tradeRoutes(); }, Options.transportinterval*1000);	  
	},
    	
	delTradeRoutes: function() {
		var t = Tabs.transport;	
		t.tradeRoutes= [];
	},
	
	checkcoords : function (obj){
		var t = Tabs.transport;
		if (obj.id == 'pbok') {
			t.check = true;
			t.addTradeRoute();
		}
		return;			
	},
	
	addTradeRoute: function () {
		var valid = true;
		var t = Tabs.transport;
		var city = t.tcp.city.id;
		if (document.getElementById('ptcityX').value == 0 && 
				document.getElementById('ptcityY').value == 0 && 
				!t.check) {
			document.getElementById('errorSpace').innerHTML = '<span class="boldRed">0,0 Ready, Are you Sure?</span>';
			setTimeout(function(){ (document.getElementById('errorSpace').innerHTML = ''); }, 5000);
			return;
		}
		var ship_Food = document.getElementById('pbshipFood').checked;
		var ship_Oil = document.getElementById('pbshipOil').checked;
		var ship_Stone = document.getElementById('pbshipStone').checked;
		var ship_Steel = document.getElementById('pbshipSteel').checked;
		var ship_Graph = document.getElementById('pbshipGraph').checked;
		var ship_Tita = document.getElementById('pbshipTita').checked;
		var ship_Gold = document.getElementById('pbshipGold').checked;
		var target_Food = document.getElementById('pbtargetamountFood').value;
		var target_Oil = document.getElementById('pbtargetamountOil').value;
		var target_Stone = document.getElementById('pbtargetamountStone').value;
		var target_Steel = document.getElementById('pbtargetamountSteel').value;
		var target_Graph = document.getElementById('pbtargetamountGraph').value;
		var target_Tita = document.getElementById('pbtargetamountTita').value;		
		var target_Gold = document.getElementById('pbtargetamountGold').value;
		var trade_Food = document.getElementById('pbtradeamountFood').value;
		var trade_Oil = document.getElementById('pbtradeamountOil').value;
		var trade_Stone = document.getElementById('pbtradeamountStone').value;
		var trade_Steel = document.getElementById('pbtradeamountSteel').value;
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
				city:			city,
				ship_Food:		ship_Food,
				target_Food:	target_Food,
				trade_Food:		trade_Food,
				ship_Oil:		ship_Oil,
				target_Oil:		target_Oil,
				trade_Oil:		trade_Oil,
				ship_Stone:		ship_Stone,
				target_Stone:	target_Stone,
				trade_Stone:	trade_Stone,
				ship_Steel:		ship_Steel,
				target_Steel:	target_Steel,
				trade_Steel:	trade_Steel,
				ship_Graph:		ship_Graph,
				target_Graph:	target_Graph,
				trade_Graph:	trade_Graph,
				ship_Tita:		ship_Tita,
				target_Tita:	target_Tita,
				trade_Tita:		trade_Tita,
				ship_Gold:		ship_Gold,
				target_Gold:	target_Gold,
				trade_Gold:		trade_Gold,
				target_x:		target_x,
				target_y:		target_y,
				TroopType:		TroopType,
				route_state:	"true"
			});
		}
		document.getElementById('pbTraderDivDRoute').style.background = 'maroon';
		setTimeout(function(){ (document.getElementById('pbTraderDivDRoute').style.background =''); }, 1000);
	},
	
	showTradeRoutes: function () {
		var t = Tabs.transport;
		var popTradeRoutes = null;
		t.popTradeRoutes = new CPopup('pbShowTrade', 0, 0, 550, 500, true, function() {clearTimeout (1000);});
		var m = '<div style="max-height:460px; height:460px; overflow-y:auto">';
		m += '<table width="100%"><tr><td id="pbRoutesQueue"></td></tr></table></div>';      
		t.popTradeRoutes.getMainDiv().innerHTML = m;
		t.popTradeRoutes.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Registered Route:</b>';
		t.paintTradeRoutes();
		t.popTradeRoutes.show(true)	;
	},
	
	paintTradeRoutes: function(){
		var t = Tabs.transport;
		var r = t.tradeRoutes;
		var cityname;
		var citynameTo = null;
		var m = '<br><table id="paintRoutes" width="99%">'; 
		for (var i=0;i<(r.length);i++) {
			citynameTo = null;
			for (var y=0; y< Seed.cities.length;y++) {
				if (parseInt(Seed.cities[y][0]) == r[i].city) {
					var cityname = Seed.cities[y][1];
				}
				if (parseInt(Seed.cities[y][2]) == r[i].target_x && 
						parseInt(Seed.cities[y][3]) == r[i].target_y) {
					var citynameTo = Seed.cities[y][1];
				}
			}    
			var queueId = i;
			if (citynameTo == null) {
				var TO = r[i].target_x +','+ r[i].target_y;
			} else {
				var TO = citynameTo;
			}
			if (r[i].route_state) {
				var status = '<span style="color:green;">Active</span>';
			} else {
				var status = '<span style="color:red;">Passive</span>';
			}
			if (r[i].TroopType == undefined) {
				var unit = 'unt9';
			} else {
				var unit = r[i].TroopType;
			}
			var unit = 'u' + unit.substring(3)
			m += '<tr><td style="width:20px; border-top:1px solid silver;padding-top:10px;">'+(i+1)+'</td>';
			m += '<td style="border-top:1px solid silver;padding-top:10px;"><input type="submit" onclick="traceEdit('+queueId+')" value="CLEAR">&nbsp;&nbsp;';
			m += '<input type="submit" onclick="traceDelete('+queueId+')" value="DELETE">&nbsp;&nbsp;';
			m += status+'</td>';
			m += '<td style="border-top:1px solid silver;padding-top:10px;">&nbsp;</td>';	
			m += '</tr>';
			
			m += '<tr>';
			m += '<td>&nbsp;</td>';
			m += '<td>';
			
			m += '<br><table>';
			m += '<tr><td style="padding-bottom:5px;"><b>MATERIAL&nbsp;</b></td><td style="text-align:right;padding-bottom:5px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>KEEP</b></td><td style="text-align:right;padding-bottom:5px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Amount to be moved</b></td></tr>';
			if (r[i].ship_Food) 
				m += '<tr><td>FOOD:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Food) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Food)+'</td></tr>';
			if (r[i].ship_Oil) 
				m += '<tr><td>OIL:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Oil) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Oil)+'</td></tr>';
			if (r[i].ship_Stone) 
				m += '<tr><td>STONE:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Stone) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Stone)+'</td><tr>';
			if (r[i].ship_Steel) 
				m += '<tr><td>STEEL:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Steel) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Steel)+'</td></tr>';
			if (r[i].ship_Tita) 
				m += '<tr><td>TITANIUM:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Tita) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Tita)+'</td></tr>';
			if (r[i].ship_Graph) 
				m += '<tr><td>GRAPHENE:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Graph) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Graph)+'</td></tr>';
			if (r[i].ship_Gold) 
				m += '<tr><td>GOLD:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Gold) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Gold)+'</td></tr>';
			m += '</table><br>';			
			
			m += '</td>';
			m += '<td style="padding-left:50px;">';
			
			m += '<br><table>';
			m += '<tr><td><b>From Here:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>'+ cityname +'</td></tr>';
			m += '<tr><td><b>To Here:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>'+ TO +'</td></tr>';
			m += '<tr><td><b>Unit:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>'+t.uu[unit]+'</td></tr>';
			m += '</table><br>';	
			
			m += '</td>';			
			m += '</tr>';		
			
		}
		m +='</table>';
		document.getElementById('pbRoutesQueue').innerHTML = m; 
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
		for (var y=0; y< Seed.cities.length;y++) {
			if (parseInt(Seed.cities[y][0]) == r[queueId].city) {
				var cityname = Seed.cities[y][1];
			}
			if (parseInt(Seed.cities[y][2]) == r[queueId].target_x && 
					parseInt(Seed.cities[y][3]) == r[queueId].target_y) {
				var citynameTo = Seed.cities[y][1];
			}
		}
		if (citynameTo == null) {
			var TO = r[queueId].target_x +','+ r[queueId].target_y;
		} else {
			var TO = citynameTo; 
		}
		
		var n = '<div><b>Editing Options::</b></div><br><table id="editRoutes">';
		
		n += '<tr><td><b>From Here:</b>&nbsp;</td>';
		n += '<td>'+ cityname +'</td></tr>';
		
		n += '<tr><td><b>To Here:</b>&nbsp;</td>';
		n += '<td>'+ TO +'</td></tr>';
		
		n += '<tr><td><b>ACTIVE:</b>&nbsp;&nbsp;&nbsp;</td>';
		n += '<td><input id="TradeStatus" type="checkbox"></td></tr>';
		
		n += '<tr><td><b>Volume Contents:</b>&nbsp;&nbsp;&nbsp;</td>';
		n += '<td><select id="pbbTransportTroop">';
		for (y in t.uu) {
			var troop = t.uu[y];
			n += '<option value="'+findoptvalue(y)+'">';
			n += troop;
			n += '</option>';
		}
		n += '</select></td></tr>';
		n += '</table><br><br>';
		
		n += '<table id="editRoutes">';

		n += '<tr><td style="padding-bottom:5px;"><b>MATERIAL</b>&nbsp;&nbsp;</td>';
		n += '<td style="text-align:center;padding-bottom:5px;">&nbsp;&nbsp;<b>ACTIVE</b>&nbsp;&nbsp;</td>';
		n += '<td style="padding-bottom:5px;"><b>Tasinmasi Yapilmasin</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
		n += '<td style="padding-bottom:5px;"><b>Tasinacak MIKTAR</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>';

		n += '<tr><td>Food:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipfood" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountfood" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountfood" type="text" size="9" maxlength="15" value="0"></td></tr>';
		
		n += '<tr><td>Oil:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipOil" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountOil" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountOil" type="text" size="9" maxlength="15" value="0"></td></tr>';
         
		n += '<tr><td>Stone:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipstone" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountstone" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountstone" type="text" size="9" maxlength="15" value="0"></td></tr>';
         
		n += '<tr><td>Steel:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipSteel" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountSteel" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountSteel" type="text" size="9" maxlength="15" value="0"></td></tr>';
		 
		n += '<tr><td>TITANIUM:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshiptita" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamounttita" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamounttita" type="text" size="9" maxlength="15" value="0"></td></tr>';

		n += '<tr><td>Grahpene:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipgraph" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountgraph" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountgraph" type="text" size="9" maxlength="15" value="0"></td></tr>';

		n += '<tr><td>Gold:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipgold" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountgold" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountgold" type="text" size="9" maxlength="15" value="0"></td></tr>'
       
		n += '</table><BR>';
		n += '<table id="editRoutes"><tr><td>';
		n += '<input id="Cancel" type="submit" value="Cancel">&nbsp;&nbsp;&nbsp;';
		n += '<input id="Save" type="submit" value="Save"></td></tr>';
		n += '</table>';
       
		document.getElementById('pbRoutesQueue').innerHTML = n;
		document.getElementById('TradeStatus').checked = r[queueId].route_state;
		if (r[queueId].TroopType == undefined) {
			var unit = 'unt19';
		} else {
			var unit = r[queueId].TroopType;
		}
		document.getElementById('pbbTransportTroop').value = unit;
		
		document.getElementById('pbbshipfood').checked = r[queueId].ship_Food;
		document.getElementById('pbbshipOil').checked = r[queueId].ship_Oil;
		document.getElementById('pbbshipstone').checked = r[queueId].ship_Stone;
		document.getElementById('pbbshipSteel').checked = r[queueId].ship_Steel;
		document.getElementById('pbbshipgraph').checked = r[queueId].ship_Graph;
		document.getElementById('pbbshiptita').checked = r[queueId].ship_Tita;
		document.getElementById('pbbshipgold').checked = r[queueId].ship_Gold;
		
		document.getElementById('pbbtargetamountfood').value = r[queueId].target_Food;
		document.getElementById('pbbtargetamountOil').value = r[queueId].target_Oil;
		document.getElementById('pbbtargetamountstone').value = r[queueId].target_Stone;
		document.getElementById('pbbtargetamountSteel').value = r[queueId].target_Steel;
		document.getElementById('pbbtargetamountgraph').value = r[queueId].target_Graph;
		document.getElementById('pbbtargetamounttita').value = r[queueId].target_Tita;
		document.getElementById('pbbtargetamountgold').value = r[queueId].target_Gold;
		
		document.getElementById('pbbtradeamountfood').value = r[queueId].trade_Food;
		document.getElementById('pbbtradeamountOil').value = r[queueId].trade_Oil;
		document.getElementById('pbbtradeamountstone').value = r[queueId].trade_Stone;
		document.getElementById('pbbtradeamountSteel').value = r[queueId].trade_Steel;
		document.getElementById('pbbtradeamountgraph').value = r[queueId].trade_Graph;
		document.getElementById('pbbtradeamounttita').value = r[queueId].trade_Tita;	   
		document.getElementById('pbbtradeamountgold').value = r[queueId].trade_Gold;
		
		document.getElementById('Cancel').addEventListener('click', function(){t.showTradeRoutes();}, false);
		
		document.getElementById('Save').addEventListener('click', function(){
			r[queueId].route_state = document.getElementById('TradeStatus').checked;
			r[queueId].TroopType = document.getElementById('pbbTransportTroop').value;
			
			r[queueId].ship_Food = document.getElementById('pbbshipfood').checked;
			r[queueId].ship_Oil = document.getElementById('pbbshipOil').checked;
			r[queueId].ship_Stone = document.getElementById('pbbshipstone').checked;
			r[queueId].ship_Steel = document.getElementById('pbbshipSteel').checked;
			r[queueId].ship_Graph = document.getElementById('pbbshipgraph').checked;  
			r[queueId].ship_Tita = document.getElementById('pbbshiptita').checked;  
			r[queueId].ship_Gold = document.getElementById('pbbshipgold').checked;
			
			r[queueId].target_Food = document.getElementById('pbbtargetamountfood').value;
			r[queueId].target_Oil = document.getElementById('pbbtargetamountOil').value;
			r[queueId].target_Stone = document.getElementById('pbbtargetamountstone').value;
			r[queueId].target_Steel = document.getElementById('pbbtargetamountSteel').value;
			r[queueId].target_Graph = document.getElementById('pbbtargetamountgraph').value;
			r[queueId].target_Tita = document.getElementById('pbbtargetamounttita').value;
			r[queueId].target_Gold = document.getElementById('pbbtargetamountgold').value;
			
			r[queueId].trade_Food = document.getElementById('pbbtradeamountfood').value;
			r[queueId].trade_Oil = document.getElementById('pbbtradeamountOil').value;
			r[queueId].trade_Stone = document.getElementById('pbbtradeamountstone').value;
			r[queueId].trade_Steel = document.getElementById('pbbtradeamountSteel').value;
			r[queueId].trade_Graph = document.getElementById('pbbtradeamountgraph').value;
			r[queueId].trade_Tita = document.getElementById('pbbtradeamounttita').value;
			r[queueId].trade_Gold = document.getElementById('pbbtradeamountgold').value;
			
			t.showTradeRoutes();
		}, false);
	},
	   
	saveTradeRoutes: function() {
		var t = Tabs.transport;
		var serverID = getServerId();
		GM_setValue('tradeRoutes_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(t.tradeRoutes));
	},
		
	readTradeRoutes: function() {
		var t = Tabs.transport;
		var serverID = getServerId();
		s = GM_getValue('tradeRoutes_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
		if (s != null) {
			route = JSON2.parse(s);
			for (k in route)
				t.tradeRoutes[k] = route[k];
		}
	},
	
	saveTraderState: function() {
		var t = Tabs.transport;
		var serverID = getServerId();
		GM_setValue('traderState_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(t.traderState));
	},
	
	readTraderState: function(){
		var t = Tabs.transport;
		var serverID = getServerId();
		s = GM_getValue('traderState_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
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
			obj.value = "Transport = Off";
			clearTimeout(t.checkdotradetimeout);
			t.count = 0;
		} else {
			t.traderState.running = true;
			obj.value = "Transport = On";
			t.e_tradeRoutes();
			t.report();
		}
	},
	
	checkdoTrades: function() {
		var t = Tabs.transport;
		if (t.tradeRoutes.length == 0)
			return;
		t.doTrades(t.count);
		t.count++;
		if (t.count < t.tradeRoutes.length) {
			t.checkdotradetimeout = setTimeout(function() { t.checkdoTrades(); }, 5000);
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
		if (t.tradeRoutes.length == 0) 
			return;
		if (!t.tradeRoutes[count]["route_state"]) 
			return;
		
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.gold = 0;
		params.r1 = 0;
		params.r2 = 0;
		params.r3 = 0;
		params.r4 = 0;
		params.r5 = 0;
		params.r6 = 0;
		params.kid = 0;
		
		var carry_amount = 0;
		var wagons_needed = 0;
		var citymax = 0;
		var city = t.tradeRoutes[count]["city"];
		var cityID = 'city' + city;
		
		if (!Cities.byID[city]) 
			return;
			
		var xcoord = t.tradeRoutes[count]["target_x"];
		var ycoord = t.tradeRoutes[count]["target_y"];
		
		var trade_Food = t.tradeRoutes[count]["trade_Food"];
		var trade_Oil = t.tradeRoutes[count]["trade_Oil"];
		var trade_Stone = t.tradeRoutes[count]["trade_Stone"];
		var trade_Steel = t.tradeRoutes[count]["trade_Steel"];
		var trade_Graph = t.tradeRoutes[count]["trade_Graph"];
		var trade_Tita = t.tradeRoutes[count]["trade_Tita"];
		var trade_Gold = t.tradeRoutes[count]["trade_Gold"];
			
		var target_Food = t.tradeRoutes[count]["target_Food"];
		var target_Oil = t.tradeRoutes[count]["target_Oil"];
		var target_Stone = t.tradeRoutes[count]["target_Stone"];
		var target_Steel = t.tradeRoutes[count]["target_Steel"];
		var target_Graph = t.tradeRoutes[count]["target_Graph"];
		var target_Tita = t.tradeRoutes[count]["target_Tita"];
		var target_Gold = t.tradeRoutes[count]["target_Gold"];
			
		var ship_Food = t.tradeRoutes[count]["ship_Food"];
		var ship_Oil = t.tradeRoutes[count]["ship_Oil"];
		var ship_Stone = t.tradeRoutes[count]["ship_Stone"];
		var ship_Steel = t.tradeRoutes[count]["ship_Steel"];
		var ship_Graph = t.tradeRoutes[count]["ship_Graph"];
		var ship_Tita = t.tradeRoutes[count]["ship_Tita"];
		var ship_Gold = t.tradeRoutes[count]["ship_Gold"];
			
		var citymax_Food = parseInt(Seed.resources[cityID]['rec1'][0] / 3600);
		var citymax_Oil = parseInt(Seed.resources[cityID]['rec2'][0] / 3600);
		var citymax_Stone = parseInt(Seed.resources[cityID]['rec3'][0] / 3600);
		var citymax_Steel = parseInt(Seed.resources[cityID]['rec4'][0] / 3600);
		var citymax_Tita = parseInt(Seed.resources[cityID]['rec5'][0] / 3600);
		var citymax_Graph = parseInt(Seed.resources[cityID]['rec6'][0] / 3600);
		var citymax_Gold = parseInt(Seed.citystats[cityID]['gold']);
		
		var carry_Food = (citymax_Food - target_Food);
		var carry_Oil = (citymax_Oil - target_Oil);
		var carry_Stone = (citymax_Stone - target_Stone);
		var carry_Steel = (citymax_Steel - target_Steel);
		var carry_Graph = (citymax_Graph - target_Graph);
		var carry_Tita = (citymax_Tita - target_Tita);
		var carry_Gold = 0;

		if (carry_Food < 0 || ship_Food==false) 
			carry_Food = 0;
		if (carry_Oil < 0 || ship_Oil==false) 
			carry_Oil = 0;
		if (carry_Stone < 0 || ship_Stone==false) 
			carry_Stone = 0;
		if (carry_Steel < 0 || ship_Steel==false) 
			carry_Steel = 0;
		if (carry_Graph < 0 || ship_Graph==false) 
			carry_Graph = 0;
		if (carry_Tita < 0 || ship_Tita==false) 
			carry_Tita = 0;
			
		if (trade_Food > 0 && (carry_Food > trade_Food)) 
			carry_Food = parseInt(trade_Food);
		if (trade_Oil > 0 && (carry_Oil > trade_Oil)) 
			carry_Oil = parseInt(trade_Oil);
		if (trade_Stone > 0 && (carry_Stone > trade_Stone)) 
			carry_Stone = parseInt(trade_Stone);
		if (trade_Steel > 0 && (carry_Steel > trade_Steel)) 
			carry_Steel = parseInt(trade_Steel);
		if (trade_Graph > 0 && (carry_Graph > trade_Graph)) 
			carry_Graph = parseInt(trade_Graph);
		if (trade_Tita > 0 && (carry_Tita > trade_Tita)) 
			carry_Tita = parseInt(trade_Tita);

		if (t.tradeRoutes[count]['TroopType'] == undefined) {
			var wagons = parseInt(Seed.units[cityID]['unt'+ 19]); 
		} else {
			var wagons = parseInt(Seed.units[cityID][t.tradeRoutes[count]['TroopType']]);
		}
		
		var rallypointlevel = t.getRallypoint(cityID);	
		if (parseInt(wagons) > parseInt(rallypointlevel*10000)) { 
			wagons = (rallypointlevel*10000); 
		}
    	
		if (t.tradeRoutes[count]['TroopType'] == undefined) {
			var unit = 'unt19';
		} else {
			var unit = t.tradeRoutes[count]['TroopType'];
		}
			
		var Troops = parseInt(Seed.units[cityID][unit]);
	  if (parseInt(Troops)>parseInt(wagons)) {
			Troops = wagons;
		}
		
		var featherweight = parseInt(Seed.tech.tch10);
		var Load = parseInt(unsafeWindow.unitstats[unit]['5'])
		var maxloadperwagon = (featherweight * ((Load/100)*10)) + Load;
		var maxload = (maxloadperwagon * Troops);
		if (wagons <= 0) 
			return;
	  
		for (var s = 0; s < Seed.cities.length; s++) {
			if (parseInt(Seed.cities[s][0]) == city) {
				var cityname = Seed.cities[s][1];
			}
		}                     
		
		var shift_Food = (maxload / 6);
		var shift_Oil = (maxload / 6);
		var shift_Stone = (maxload / 6);
		var shift_Steel = (maxload / 6);
		var shift_Graph = (maxload / 6);
		var shift_Tita = (maxload / 6);		  
		if ((maxload - carry_Food - carry_Oil - carry_Stone - carry_Steel - carry_Graph - carry_Tita) < 0) {
			var shift_num = 0;
			var shift_spare = 0;
			

			if (carry_Food < shift_Food) {
				shift_spare += (shift_Food - carry_Food);
				shift_Food = carry_Food;
			}
			if (carry_Oil < shift_Oil) {
				shift_spare += (shift_Oil - carry_Oil);
				shift_Oil = carry_Oil;	
			}
			if (carry_Stone < shift_Stone) {
				shift_spare += (shift_Stone - carry_Stone);
				shift_Stone = carry_Stone;
			}
			if (carry_Steel < shift_Steel) {
				shift_spare += (shift_Steel - carry_Steel);
				shift_Steel = carry_Steel;
			}			
			if (carry_Graph < shift_Graph) {
				shift_spare += (shift_Graph - carry_Graph);
				shift_Graph = carry_Graph;
			}
			if (carry_Tita < shift_Tita) {
				shift_spare += (shift_Tita - carry_Tita);
				shift_Tita = carry_Tita;
			}
			
			while (shift_spare > 1) {
				if (carry_Food < (shift_Food + shift_spare)) {
					shift_spare = shift_spare - carry_Food;;
					shift_Food = carry_Food;
				} else {
					shift_Food = (shift_Food + shift_spare);
					shift_spare = shift_spare - shift_spare;
				}
				if (carry_Oil < (shift_Oil + shift_spare)) {
					shift_spare = shift_spare - carry_Oil;;
					shift_Oil = carry_Oil;
				} else {
					shift_Oil = shift_Oil + shift_spare;
					shift_spare = shift_spare - shift_spare;
				} 
				if (carry_Stone < (shift_Stone + shift_spare)) {
					shift_spare = shift_spare - carry_Stone;
					shift_Stone = carry_Stone;
				} else {
					shift_Stone = shift_Stone + shift_spare;
					shift_spare = shift_spare - shift_spare;
				}
				if (carry_Steel < (shift_Steel + shift_spare)) {
					shift_spare = shift_spare - carry_Steel;
					shift_Steel = carry_Steel;
				} else {
					shift_Steel = shift_Steel + shift_spare;
					shift_spare = shift_spare - shift_spare;
				}
				if (carry_Graph < (shift_Graph + shift_spare)) {
					shift_spare = shift_spare - carry_Graph;
					shift_Graph = carry_Graph;
				} else {
					shift_Graph = shift_Graph + shift_spare;
					shift_spare = shift_spare - shift_spare;
				}
				if (carry_Tita < (shift_Tita + shift_spare)) {
					shift_spare = shift_spare - carry_Tita;
					shift_Tita = carry_Tita;
				} else {
					shift_Tita = shift_Tita + shift_spare;
					shift_spare = shift_spare- shift_spare;
				}
			}

			carry_Food = shift_Food;
			carry_Oil = shift_Oil;
			carry_Stone = shift_Stone;
			carry_Steel = shift_Steel;
			carry_Graph = shift_Graph;
			carry_Tita = shift_Tita;
		}
		
		if (maxload > (carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita) && ship_Gold == true) {
			if ((maxload - (carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita)) > (citymax_Gold - target_Gold)) {
				carry_Gold = (citymax_Gold - target_Gold);
				if (carry_Gold < 0 ) {
					carry_Gold = 0;
				}
			} else {
				carry_Gold = (maxload - (carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita));
			}		  
			if (trade_Gold > 0 && (carry_Gold > trade_Gold)) {
				carry_Gold = parseInt(trade_Gold);
			}
		}
		
		wagons_needed = ((carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita + carry_Gold) / maxloadperwagon);
		wagons_needed = wagons_needed.toFixed(0);	
		if (wagons_needed < ((carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita + carry_Gold) / maxloadperwagon)) {
			wagons_needed++;
		}
		if (wagons_needed < Options.minwagons) { 
			Logbuch.eintrag(Logs.translog,'Skipped Transport');
			t.logbuch();
			return; 
		}
		

    var e = unsafeWindow.Object.values(Seed.outgoing_marches["c"+city]).detect(function(a){return a.marchId&&parseInt(a.marchStatus,10)===unsafeWindow.Constant.MarchStatus.INACTIVE});   

		params.cid = city;
		params.mid = e.marchId;
		params.type = "1";
		params.kid = "0";
		params.xcoord = xcoord;
		params.ycoord = ycoord;
		params.r1 = carry_Food;
		params.r2 = carry_Oil;
		params.r3 = carry_Stone;
		params.r4 = carry_Steel;
		params.r5 = carry_Tita;
		params.r6 = carry_Graph;
		params.gold = carry_Gold;

		switch (unit){
			case 'unt1': params.u1 = wagons_needed;break;
			case 'unt9': params.u9 = wagons_needed;break;
			case 'unt19': params.u19 = wagons_needed;break;
		}
		var startnow = unixTime();
		
		if ((carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita + carry_Gold) > 0) {   
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "march.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					if (rslt.ok) {
						
						var city2 = '';
						for (var s = 0; s < Seed.cities.length; s++) {
							if (parseInt(Seed.cities[s][2]) == xcoord && 
									parseInt(Seed.cities[s][3]) == ycoord) {
								city2 = Seed.cities[s][1];
							}
						}    
						if (city2 != '') {
							var m = 'Carrying from City <b>' + cityname + "</b>\' to <b>"+ city2 +"</b>\'e<br>" + addCommas(wagons_needed) + ' '+ t.uu['u'+unit.substr(3)]+' Per unit '+addCommas(params.r1+params.r2+params.r3+params.r4+params.r5+params.r6+params.gold) + ' Source Transport finished';
						} else {
							var m = 'Carrying from City <b>' + cityname + "</b>\' to <b>" + xcoord + ',' + ycoord + "</b>\'e<br>" + addCommas(wagons_needed) + ' '+ t.uu['u'+unit.substr(3)]+' Per Unit '+addCommas(params.r1+params.r2+params.r3+params.r4+params.r5+params.r6+params.gold) + ' Source Transport finished!';
						}
						Logbuch.eintrag(Logs.translog,m);
						t.logbuch();
						

						for (var r = 1; r < 25; r++){
							if (params['u' + r]) {
								Seed.units['city' + params.cid]['unt' + r] -= params['u' + r];
							}
						}

						var now = unixTime();
						var q = {
							destinationUnixTime: now * 2 - startnow + rslt.oneway,
							marchUnixTime: now,
							returnUnixTime: rslt.returnEta,
							toXCoord: params.xcoord,
							toYCoord: params.ycoord,
							marchType: 1,
							knightId: 0,
							marchStatus: 1,
							marchId: params.mid,
						};

						q.gold = params.gold;
						for (var r = 1; r < 7; r++) {
							q["resource" + r] = params['r'+r];			
						}

						for (var u = 1; r < 25; r++) {
							if (params['u' + r]) {
								q["unit" + u + "Count"] = params['u' + r];
							} else {
								q["unit" + u + "Count"] = 0;
							}
							q["unit" + u + "Return"] = 0;		
						}

						if (rslt.tileId) {
							q.toTileId = rslt.tileId;
							q.toTileType = rslt.tileType;
							q.toTileLevel = rslt.tileLevel;
						}
						Seed.outgoing_marches["c" + params.cid]["m" + params.mid] = q;
		
          } else {
						var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
            Logbuch.eintrag(Logs.translog,'Transport Processes not be your city: '+ cityname + '<br><span class="boldRed">' +errorcode+'</span>');
						t.logbuch();
					}
				},
				onFailure: function () {}
			});
		}
	},
	
	ManualTransport: function() {
		var t = Tabs.transport;
		if (document.getElementById ('ptcityX').value == "" || 
				document.getElementById ('ptcityY').value == "") return;
		if (t.TroopsNeeded > t.Troops) return;
		var city = t.tcp.city.id;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		var unitType = document.getElementById('TransportTroop').value;
		var LoadUnit = (parseInt(Seed.tech.tch10) * ((parseInt(unsafeWindow.unitstats[unitType]['5'])/100)*10)) + parseInt(unsafeWindow.unitstats[unitType]['5']);
		var MaxLoad =  parseInt(Seed.units['city' + city][unitType]) * LoadUnit;
		document.getElementById ('errorSpace').innerHTML = '';

		if (document.getElementById ('TroopsToSend').value == 0) {
			document.getElementById ('errorSpace').innerHTML = '<span style="color:red;">Troops selected Transport</span>';
			setTimeout(function(){ (document.getElementById('errorSpace').innerHTML = ''); }, 5000);
			return;
		}
		
		var e = unsafeWindow.Object.values(Seed.outgoing_marches["c"+city]).detect(function(a){return a.marchId&&parseInt(a.marchStatus,10)===unsafeWindow.Constant.MarchStatus.INACTIVE})       	
		params.cid = city;
		params.mid = e.marchId;
		params.kid = 0;
		params.type = "1";	
		params.xcoord = parseInt(document.getElementById ('ptcityX').value);
		params.ycoord = parseInt(document.getElementById ('ptcityY').value);
		params.r1 = parseInt(document.getElementById ('pbtradeamountFood').value);
		params.r2 = parseInt(document.getElementById ('pbtradeamountOil').value);
		params.r3 = parseInt(document.getElementById ('pbtradeamountStone').value);
		params.r4 = parseInt(document.getElementById ('pbtradeamountSteel').value);
		params.r5 = parseInt(document.getElementById ('pbtradeamountTita').value);
		params.r6 = parseInt(document.getElementById ('pbtradeamountGraph').value);
		params.gold = parseInt(document.getElementById ('pbtradeamountGold').value);
		
		var wagons_needed = parseInt(document.getElementById ('TroopsToSend').value);
		switch (unitType) {
			case 'unt1': params.u1 = wagons_needed;break;
			case 'unt9': params.u9 = wagons_needed;break;
			case 'unt19': params.u19 = wagons_needed;break;
	  }
		var startnow = unixTime();
		if ((params.r1 + params.r2 + params.r3 + params.r4 + params.r5 + params.r6 + params.gold) > 0) {
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "march.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					if (rslt.ok) { 

						for (var s = 0; s < Seed.cities.length; s++) {
							if (parseInt(Seed.cities[s][0]) == params.cid) {
								var cityname = Seed.cities[s][1];
							}
						} 

						var city2 = '';
						for (var s = 0; s < Seed.cities.length; s++) {
							if (parseInt(Seed.cities[s][2]) == params.xcoord && 
									parseInt(Seed.cities[s][3]) == params.ycoord) {
								city2 = Seed.cities[s][1];
							}
						}    
						if (city2 != '') {
							var m = 'Manual Transport from: <b>' + cityname + "</b> to <b>"+ city2 +"</b><br>" + addCommas(wagons_needed) + ' '+ t.uu['u'+unitType.substr(3)]+'  '+addCommas(params.r1+params.r2+params.r3+params.r4+params.r5+params.r6+params.gold) + ' was the amount transported';
						} else {
							var m = 'Manual Transport from: <b>' + cityname + "</b> to <b>" + params.xcoord + ',' + params.ycoord + "</b><br>" + addCommas(wagons_needed) + ' '+ t.uu['u'+unitType.substr(3)]+'  '+addCommas(params.r1+params.r2+params.r3+params.r4+params.r5+params.r6+params.gold) + ' was the amount transported';
						}						
						
						Logbuch.eintrag(Logs.translog,m);
						t.logbuch();
						

						for (var r = 1; r < 25; r++){
							if (params['u' + r]) {
								Seed.units['city' + params.cid]['unt' + r] -= params['u' + r];
							}
						}

						var now = unixTime();
						var q = {
							destinationUnixTime: now * 2 - startnow + rslt.oneway,
							marchUnixTime: now,
							returnUnixTime: rslt.returnEta,
							toXCoord: params.xcoord,
							toYCoord: params.ycoord,
							marchType: 1,
							knightId: 0,
							marchStatus: 1,
							marchId: params.mid,
						};

						q.gold = params.gold;
						for (var r = 1; r < 7; r++) {
							q["resource" + r] = params['r'+r];			
						}

						for (var u = 1; r < 25; r++) {
							if (params['u' + r]) {
								q["unit" + u + "Count"] = params['u' + r];
							} else {
								q["unit" + u + "Count"] = 0;
							}
							q["unit" + u + "Return"] = 0;		
						}

						if (rslt.tileId) {
							q.toTileId = rslt.tileId;
							q.toTileType = rslt.tileType;
							q.toTileLevel = rslt.tileLevel;
						}
						Seed.outgoing_marches["c" + params.cid]["m" + params.mid] = q;
						
						document.getElementById ('pbtradeamountFood').value = 0;
						document.getElementById ('pbtradeamountOil').value = 0;
						document.getElementById ('pbtradeamountStone').value = 0;
						document.getElementById ('pbtradeamountSteel').value = 0;
						document.getElementById ('pbtradeamountGold').value = 0;
						document.getElementById ('pbtradeamountGraph').value = 0;
						document.getElementById ('pbtradeamountTita').value = 0;
						document.getElementById ('TroopsToSend').value = 0;
					} else {
						var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
						var m = '<span style="color:red;">ERROR: ' + errorcode+'</span>';
						Logbuch.eintrag(Logs.translog,m);
						t.logbuch();
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
	
	report : function() {
		var t = Tabs.transport;
		clearTimeout (t.reportTimer);
		if (Options.deletetransports && t.traderState.running) {
			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			params.pageNo = 1;
			params.showAll = 0;
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "listMarchReport.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					t.reportlist(rslt);
				},
				onFailure: function (rslt) {
					t.reportlist(rslt);
				}
			});
		}
		t.reportTimer = setTimeout (t.report, 600000);
	},	

	reportlist : function(rslt) {
		var t = Tabs.transport;
		if (rslt.ok) {
			var rid = [];
			for(var r in rslt.arReports) {
				var report = rslt.arReports[r];
				if (report.marchType == '1' && 
						report.side1PlayerId == unsafeWindow.g_ajaxsuffix.substr(3) &&
						report.side0PlayerId == unsafeWindow.g_ajaxsuffix.substr(3)) {
					rid.push(report.marchReportId);
				}
			}
			if (rid.length > 0) {

				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.s0rids = '';
				params.eventids = '';
				params.s1rids = rid.join(',');
				var count = rid.length;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) {
						t.deletereports(rslt,count);
					},
					onFailure: function (rslt) {
						t.deletereports(rslt,count);
					}
				});
			}

		} 
	},

	deletereports : function (rslt,count) {
		var t = Tabs.transport;
		if (rslt.ok) {
			Seed.newReportCount = parseInt(Seed.newReportCount) - count;
			if (count == 1) {
				Logbuch.eintrag(Logs.translog,count + ' Transport Report has been DELETED');
			} else {
				Logbuch.eintrag(Logs.translog,count + ' Transport Report has been DELETED');
			}
			t.logbuch();
		}
	},
		
}

/*********************************** Attack Tab ****************************/
Tabs.Artefacts = {
  tabOrder : 6,
	tabLabel: 'Attack',
  cont : null,
  tabDisabled : !ENABLE_ARTIFACTS,
	displayTimer : null,
	attackTimer : null,
	artifactTimer : null,
	modalTimer : null,
	reportTimer : null,
	startUnixTime : 0,
	koordlist : [],
	koordlistpointer : 0,
	attack: true,
	started : false,
	setstarted : false,
	startvalue : "Attack OFF",
	artset : "Artifacts OFF",
	id : {},
	read : true,
	wildtypes : {
		'0' : 'Wasteland',
		'10' : 'River',
		'11' : 'Lake', 
		'12' : 'Peak',
		'20' : 'Oil',
		'30' : 'Land',
		'40' : 'Mountain',
		'50' : 'Barrens',
		'51' : 'Terrorist Camp',
		'52' : 'Wreckage', 
		'53' : 'Camo City',
		'201' : 'Titanium',
		'202' : 'Graphene',
		'203' : 'Uranium',
		'204' : 'Diamons',
	},
	stopreload : false,
	popart : null,
	popaarttimer : null,
	setonly : 0,
	
  init : function (div){
    var t = Tabs.Artefacts;
    t.cont = div;
		var c = {};
		var c1 = "";
		for(i=0; i<Cities.numCities; i++) {
			c['c'+Cities.cities[i].id] = Cities.cities[i].name;
			if (i==0) c1 = 'c'+Cities.cities[i].id;
     }
		if (!Options.pbartcity || Options.pbartcity == "") {
			Options.pbartcity = c1;
			saveOptions();
		}		
		var out = [];	

		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>ATTACK MENU</b>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');

		out.push('<table class="ptTab" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');
		out.push('<input id="ptartstart" type="submit" name="ArtButton" value="' + t.startvalue + '"> ');	
		out.push('<input id="ptartset" type="submit" name="ArtSet" value="' + t.artset + '">');
		out.push('<input id="ptartsetview" type="submit" name="ArtSetView" value="Inventory Function">');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');

		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td><b>City:</b></td>');
		out.push('<td>'+htmlSelector(c, Options.pbartcity, 'id="ptartcity"')+'&nbsp;&nbsp;');
		out.push('<span id="ptenergy"></span></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Attack Type:&nbsp;</b></td>');
		out.push('<td>'+htmlSelector({'w':'Single Attack','f':'Continuous Attack'}, Options.pbarttype, 'id="ptarttype"') +'&nbsp;&nbsp;');
		out.push('<span id="pttypehint"></span></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>OR, Coordinate (xxx,yyy):</b></td>');
		out.push('<td><input id="ptartx" type="text" size="2" maxlength="3" style="text-align: center;">');
		out.push(' / ');
		out.push('<input id="ptarty" type="text" size="2" maxlength="3" style="text-align: center;">&nbsp;&nbsp;');
		out.push('<span id="ptdist"></span>');
		out.push('<span id="ptfieldinfo"></span></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td style="vertical-align: top;"><b style="position: relative; top: 5px;">ADD Coordinates:&nbsp;</b>');
		out.push('<br><br>xxx,yyy<br>xxx,yyy<br>xxx,yyy<br>vs...</td>');
		out.push('<td><textarea id="ptartklist" rows="5" cols="20"></textarea>');
		out.push('<br><input id="ptartkcheck" type="submit" name="KoordCheck" value="Save Coordinates:">&nbsp;');
		out.push('<span id="ptcheckinfo">Selected Coordinates</span></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Interval:</b></td>');
		out.push('<td><input id="ptartinterval" type="text" size="2" maxlength="3" style="text-align: center;">:: Enter Attack Time Interval in the box.!! / (Must remain at least 6 seconds ..)</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Reserve:</b></td>');
		out.push('<td><input id="ptartenergysave" type="text" size="2" maxlength="3" style="text-align: center;">:: Conserve energy points of the Generals (Total)</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Note:</b></td>');
		out.push('<td><input id="ptarthidemodal" type="checkbox"> Note the window at the found artifact set will close automatically.</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Report:</b></td>');
		out.push('<td><input id="ptartdeletereport" type="checkbox"> Delete battle reports (only terrorists and wilds).</td>');
		out.push('</tr>');

		out.push('</table>');
		out.push('<br>');

		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td colspan="8"><b><u>MILITARY UNITS:</u></b><br>&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Supply Truck:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu1" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Infantry:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu5" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');	
		out.push('<td><b>Sniper:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu6" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td><b>Anti-Tank:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu4" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Special OP:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu18" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Mobile SAM:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu7" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td><b>Tank:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu8" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');		
		out.push('<td><b>Hellfire:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu16" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Predator:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu17" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Supply Chopper:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu9" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Gunship:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu11" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Fighter:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu10" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Bomber:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu12" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Stealth Bomber:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu13" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Cargo:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu19" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Elite Mobile SAM.:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu21" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Elite Gunship:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu24" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td>&nbsp;</td>');
		out.push('<td>&nbsp;</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		out.push('<hr>');
		out.push('<table width="100%">');
		out.push('<tr>');
		out.push('<td><b>RESEARCH AND ATTACK OPERATIONS MONITORING MENU:</b><br><br></td>');
		out.push('<td style="text-align: right;">');
		out.push('<input id="ptButClearALog" type="submit" name="ClearELog" value="CLEAR">');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td colspan="2">');
		out.push('<div id="ptartlog" style="height: 120px; overflow: auto;">');
		out.push('</div>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		

		t.cont.innerHTML = out.join('');
		

		t.id.ptartcity = document.getElementById('ptartcity');
		t.id.ptarttype = document.getElementById('ptarttype');
		t.id.ptartklist = document.getElementById('ptartklist');
		t.id.ptartx = document.getElementById('ptartx');
		t.id.ptarty = document.getElementById('ptarty');
		t.id.ptartinterval = document.getElementById('ptartinterval');
		t.id.ptartenergysave = document.getElementById('ptartenergysave');		
		t.id.ptarthidemodal = document.getElementById('ptarthidemodal');
		t.id.ptartdeletereport = document.getElementById('ptartdeletereport');
		
		t.id.ptartu1 = document.getElementById('ptartu1');		
		//t.id.ptartu2 = document.getElementById('ptartu2');		
		//t.id.ptartu3 = document.getElementById('ptartu3');		
		t.id.ptartu4 = document.getElementById('ptartu4');		
		t.id.ptartu5 = document.getElementById('ptartu5');		
		t.id.ptartu6 = document.getElementById('ptartu6');		
		t.id.ptartu7 = document.getElementById('ptartu7');		
		t.id.ptartu8 = document.getElementById('ptartu8');		
		t.id.ptartu9 = document.getElementById('ptartu9');		
		t.id.ptartu10 = document.getElementById('ptartu10');		
		t.id.ptartu11 = document.getElementById('ptartu11');		
		t.id.ptartu12 = document.getElementById('ptartu12');		
		t.id.ptartu13 = document.getElementById('ptartu13');		
		//t.id.ptartu14 = document.getElementById('ptartu14');		
		//t.id.ptartu15 = document.getElementById('ptartu15'); 		
		t.id.ptartu16 = document.getElementById('ptartu16');		
		t.id.ptartu17 = document.getElementById('ptartu17');		
		t.id.ptartu18 = document.getElementById('ptartu18');		
		t.id.ptartu19 = document.getElementById('ptartu19');
		//t.id.ptartu20 = document.getElementById('ptartu20');		
		t.id.ptartu21 = document.getElementById('ptartu21');		
		//t.id.ptartu22 = document.getElementById('ptartu22');		
		//t.id.ptartu23 = document.getElementById('ptartu23');		
		t.id.ptartu24 = document.getElementById('ptartu24');		

		t.id.ptButClearALog = document.getElementById('ptButClearALog');		
		t.id.ptartstart = document.getElementById('ptartstart');	
		t.id.ptartset = document.getElementById('ptartset');	
		t.id.ptartkcheck = document.getElementById('ptartkcheck');	
		t.id.ptenergy = document.getElementById('ptenergy');	
		t.id.ptdist = document.getElementById('ptdist');	
		t.id.pttypehint = document.getElementById('pttypehint');	
		t.id.ptartlog = document.getElementById('ptartlog');			
		t.id.ptcheckinfo = document.getElementById('ptcheckinfo');	
		t.id.ptfieldinfo = document.getElementById('ptfieldinfo');
		t.id.ptartsetview = document.getElementById('ptartsetview');
		t.finfo();

		t.id.ptartcity.addEventListener('change', function (evt) {
			Options.pbartcity = evt.target.value;
			saveOptions();
			t.show();
		}, false);

		t.id.ptarttype.addEventListener('change', function (evt) {
			Options.pbarttype = evt.target.value;
			saveOptions();
			t.show();
		}, false);

		t.changeOpt (t.id.ptartklist, 'pbartklist');
		t.changeOpt (t.id.ptartx, 'pbartx');
		t.changeOpt (t.id.ptarty, 'pbarty');
		t.changeOpt (t.id.ptartinterval, 'pbartinterval');
		t.changeOpt (t.id.ptartenergysave, 'pbartenergysave');	
		t.togOpt (t.id.ptarthidemodal, 'pbarthidemodal');
		t.togOpt (t.id.ptartdeletereport, 'pbartdeletereport');		
		t.changeOpt (t.id.ptartu1, 'pbartu1');			
		//t.changeOpt (t.id.ptartu2, 'pbartu2');	
		//t.changeOpt (t.id.ptartu3, 'pbartu3');	
		t.changeOpt (t.id.ptartu4, 'pbartu4');	
		t.changeOpt (t.id.ptartu5, 'pbartu5');	
		t.changeOpt (t.id.ptartu6, 'pbartu6');	
		t.changeOpt (t.id.ptartu7, 'pbartu7');	
		t.changeOpt (t.id.ptartu8, 'pbartu8');	
		t.changeOpt (t.id.ptartu9, 'pbartu9');	
		t.changeOpt (t.id.ptartu10, 'pbartu10');	
		t.changeOpt (t.id.ptartu11, 'pbartu11');	
		t.changeOpt (t.id.ptartu12, 'pbartu12');	
		t.changeOpt (t.id.ptartu13, 'pbartu13');	
		//t.changeOpt (t.id.ptartu14, 'pbartu14');	
		//t.changeOpt (t.id.ptartu15, 'pbartu15');	
		t.changeOpt (t.id.ptartu16, 'pbartu16');	
		t.changeOpt (t.id.ptartu17, 'pbartu17');	
		t.changeOpt (t.id.ptartu18, 'pbartu18');	
		t.changeOpt (t.id.ptartu19, 'pbartu19');	
		//t.changeOpt (t.id.ptartu20, 'pbartu20');			
		t.changeOpt (t.id.ptartu21, 'pbartu21');	
		//t.changeOpt (t.id.ptartu22, 'pbartu22');	
		//t.changeOpt (t.id.ptartu23, 'pbartu23');	
		t.changeOpt (t.id.ptartu24, 'pbartu24');
		
		t.id.ptButClearALog.addEventListener('click', t.ClearALog, false);	
		t.id.ptartstart.addEventListener('click', t.AttackOnOff, false);
		t.id.ptartset.addEventListener('click', function() {
			Tabs.Artefacts.setonly = 0;
			t.setcollectinit();
		}, false);	
		t.id.ptartkcheck.addEventListener('click', t.klistcheck, false);				
		t.id.ptartsetview.addEventListener('click', t.popartview, false);			
		t.show();

	},
	
  show : function (){
    var t = Tabs.Artefacts;
    
		t.id.ptartstart.value = t.startvalue;	
		t.id.ptartset.value = t.artset;
		
		if (!t.started && !t.setstarted) {
			t.id.ptartcity.disabled = false;
			t.id.ptartx.disabled = false;		
			t.id.ptarty.disabled = false;			
			t.id.ptarttype.disabled = false;	
			t.id.ptartklist.disabled = false;	
			t.id.ptartkcheck.disabled = false;						
			t.id.ptartinterval.disabled = false;		
			t.id.ptartenergysave.disabled = false;
			t.id.ptarthidemodal.disabled = false;
			t.id.ptartdeletereport.disabled = false;
			t.id.ptartu1.disabled = false;				
			//t.id.ptartu2.disabled = false;	
			//t.id.ptartu3.disabled = false;	
			t.id.ptartu4.disabled = false;	
			t.id.ptartu5.disabled = false;	
			t.id.ptartu6.disabled = false;	
			t.id.ptartu7.disabled = false;	
			t.id.ptartu8.disabled = false;	
			t.id.ptartu9.disabled = false;	
			t.id.ptartu10.disabled = false;	
			t.id.ptartu11.disabled = false;	
			t.id.ptartu12.disabled = false;
			t.id.ptartu13.disabled = false;	
			//t.id.ptartu14.disabled = false;	
			//t.id.ptartu15.disabled = false;	
			t.id.ptartu16.disabled = false;	
			t.id.ptartu17.disabled = false;	
			t.id.ptartu18.disabled = false;	
			t.id.ptartu19.disabled = false;	
			//t.id.ptartu20.disabled = false;	
			t.id.ptartu21.disabled = false;	
			//t.id.ptartu22.disabled = false;	
			//t.id.ptartu23.disabled = false;	
			t.id.ptartu24.disabled = false;				
		}

		Options.pbartu2 = "0";
		Options.pbartu3 = "0";
		Options.pbartu14 = "0";
		Options.pbartu15 = "0";
		Options.pbartu20 = "0";
		Options.pbartu22 = "0";
		Options.pbartu23 = "0";
	
		t.id.ptenergy.innerHTML = t.freeEnergy() + " Actual Number of Attacks";
			
		var index = 0;
		for(var i=0; i<Cities.numCities; i++) {
			if (Cities.cities[i].id == Options.pbartcity.substr(1)) {
				index = i;
			}
    }
		var x1 = parseInt(Seed.cities[index][2]);
		var y1 = parseInt(Seed.cities[index][3]);			
		var x2 = parseInt(Options.pbartx);
		var y2 = parseInt(Options.pbarty);			
		var dist = (Math.round(Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))*100)/100).toString();
		t.id.ptdist.innerHTML = 'Distance: ' + dist + ' from ' + Seed.cities[index][1];
			
		if (Options.pbarttype == "w") {
			t.id.pttypehint.innerHTML = 'Sends Wave Attack on Target'; 
			t.id.ptartx.disabled = false;		
			t.id.ptarty.disabled = false;	
			t.id.ptartklist.disabled = true;	
			t.id.ptartkcheck.disabled = true;					
		} else {
			t.id.pttypehint.innerHTML = 'Attack Target List'; 
			t.id.ptartx.disabled = true;		
			t.id.ptarty.disabled = true;	
			t.id.ptartklist.disabled = false;	
			t.id.ptartkcheck.disabled = false;		
		}
		
		t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
		
		if (t.started || t.setstarted) {
			t.id.ptartcity.disabled = true;
			t.id.ptartx.disabled = true;		
			t.id.ptarty.disabled = true;			
			t.id.ptarttype.disabled = true;	
			t.id.ptartklist.disabled = true;	
			t.id.ptartkcheck.disabled = true;						
			t.id.ptartinterval.disabled = true;		
			t.id.ptartenergysave.disabled = true;
			t.id.ptarthidemodal.disabled = true;
			t.id.ptartdeletereport.disabled = true;
			t.id.ptartu1.disabled = true;				
			//t.id.ptartu2.disabled = true;	
			//t.id.ptartu3.disabled = true;	
			t.id.ptartu4.disabled = true;	
			t.id.ptartu5.disabled = true;	
			t.id.ptartu6.disabled = true;	
			t.id.ptartu7.disabled = true;	
			t.id.ptartu8.disabled = true;	
			t.id.ptartu9.disabled = true;	
			t.id.ptartu10.disabled = true;	
			t.id.ptartu11.disabled = true;	
			t.id.ptartu12.disabled = true;
			t.id.ptartu13.disabled = true;	
			//t.id.ptartu14.disabled = true;	
			//t.id.ptartu15.disabled = true;	
			t.id.ptartu16.disabled = true;	
			t.id.ptartu17.disabled = true;	
			t.id.ptartu18.disabled = true;	
			t.id.ptartu19.disabled = true;	
			//t.id.ptartu20.disabled = true;
			t.id.ptartu21.disabled = true;
			//t.id.ptartu22.disabled = true;
			//t.id.ptartu23.disabled = true;
			t.id.ptartu24.disabled = true;				
		} 
  },

	popartview: function() {
		var t = Tabs.Artefacts;	
    if (t.popart == null){  
      t.popart = new CPopup('popartview', 50, 50, 940,1000, true);
      t.popart.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Content of the Inventory Overview</b>';

			t.popartlive();
		}
		t.popart.show (true);
	},

	popartlive: function() {
		var t = Tabs.Artefacts;

		if (t.popart == null){  

			t.poparttimer = null;			
		} else {

			var content = [];
			content.push('<table width="100%" style="border:1px solid silver; border-collapse: collapse;"><tr>');
			content.push('<td style="background-color: #e0e0e0; border:1px solid silver; padding: 2px;text-align:center;"><b>&nbsp;</b></td>');
			content.push('<td style="background-color: #e0e0e0; border:1px solid silver; padding: 2px;"><b>ITEMS</b></td>');
			content.push('<td style="background-color: #e0e0e0; border:1px solid silver; padding: 2px;text-align:center;"><b>AMOUNT</b></td>');
			content.push('<td style="background-color: #e0e0e0; border:1px solid silver; padding: 2px;"><b>REQUIREMENTS</b></td>');
			content.push('</tr>');			
			var aset = unsafeWindow.artifactData.artifactSets;
			var asetnames = unsafeWindow.arStrings.artifactPieceName;
			var astrings = unsafeWindow.arStrings;
			var sets = [];
			for (var snumber in aset) {	
				sets.push(snumber);
			}
			sets.sort();
			sets.reverse();
			for (var i = 0; i<sets.length; i++) {
				content.push('<tr>');					
				var snumber = sets[i];	
				var set = aset[snumber];
				var setname = astrings.artifactSetName['a'+snumber];
				
				var max = 100000;
				for (var a = 0; a < set.length; a++) {
					var item = set[a];
					if (!Seed.items['i'+item]) {
						var count = 0;
					} else {
						var count = Seed.items['i'+item];
					}
					if (parseInt(count) < max) max = count;
				}
				var req = 1;

				if (parseInt(snumber) == 20360) {
					max = parseInt(max/5); 
					req = 5;
				}

				if (parseInt(snumber) == 20380) {
					max = parseInt(max/10); 
					req = 10;					
				}

				if (parseInt(snumber) == 20395) {
					max = parseInt(max/3);
					req = 3;					
				}
				var id = 'pbarts_'+snumber;
				if (max > 0) {
					if (t.started || t.setstarted) {	
						content.push('<td style="border:1px solid silver; padding: 2px;"><input id="'+id+'" type="submit" value="ADD" style="padding:0 1px;margin:0;font-size:10px;" disabled="disabled"></td>');						
					} else {
						content.push('<td style="border:1px solid silver; padding: 2px;"><input id="'+id+'" type="submit" value="ADD" title="Complete set" style="padding:0 1px;margin:0;font-size:10px;"></td>');	
					}
					content.push('<td style="border:1px solid silver; padding: 2px;"><span class="boldRed">'+setname+'</span></td>');	
					content.push('<td style="border:1px solid silver; padding: 2px;text-align:center;"><span class="boldRed">'+max+'</span></td>');
				} else {
					content.push('<td style="border:1px solid silver; padding: 2px;"><input id="'+id+'" type="submit" value="ADD" style="padding:0 1px;margin:0;font-size:10px;" disabled="disabled"></td>');			
					content.push('<td style="border:1px solid silver; padding: 2px;">'+setname+'</td>');	
					content.push('<td style="border:1px solid silver; padding: 2px;text-align:center;">'+max+'</td>');				
				}
				content.push('<td style="border:1px solid silver; padding: 2px;">');
				var text = '';
				for (var a = 0; a < set.length; a++) {
					var item = set[a];
					if (!Seed.items['i'+item]) {
						var count = 0;
					} else {
						var count = Seed.items['i'+item];
					}
					if (count >= req) {
						text += asetnames['a'+item] + ' (<span class="boldRed">' + count + '/' + req + '</span>), ';
					} else {
						text += asetnames['a'+item] + ' (' + count + '/' + req + '), ';					
					}
				}
				content.push(text.slice (0, -2));
				content.push('</td>');
				content.push('</tr>');		
			}
			content.push('</table>');
			content.push('<br>Table is updated every two seconds. Click <span class="boldRed">   ADD   </span> to add item to inventory.');			
			t.popart.getMainDiv().innerHTML = content.join('');

			for (var i = 0; i<sets.length; i++) {
				document.getElementById('pbarts_'+sets[i]).addEventListener('click', function() {
					Tabs.Artefacts.setonly = this.id.split('_')[1];
					t.setcollectinit();
				}, false);	
			}

			t.poparttimer = setTimeout (t.popartlive, 2000);				
		}
	},

	klistcheck : function() {
		var t = Tabs.Artefacts;
		var counter = 0;
		t.koordlist = [];
		var u_koords = Options.pbartklist.split("\n");
		for (var i = 0; i < u_koords.length; i++) {
			var xy = u_koords[i].split(',');
			var x = parseInt(xy[0],10);
			var y = parseInt(xy[1],10);
			if (isNaN(x) || isNaN(y)) continue;
			if (x < 1 || x > 800) continue;
			if (y < 1 || y > 800) continue;			
			t.koordlist.push(x+","+y);
			counter++;
		};
		Options.pbartklist = t.koordlist.join("\n");
		saveOptions();
		t.id.ptcheckinfo.innerHTML = counter + ' Coordinate in number of added...!!';
		t.id.ptartklist.value = Options.pbartklist;
		if (counter > 0) {
			return true;
		} else {
			return false;
		}
	},
	
	modal : function() {
		var t = Tabs.Artefacts;
		clearTimeout (t.modalTimer);
		if (t.started || t.setstarted) {
			if (Options.pbarthidemodal) unsafeWindow.Modal.hideModalAll();
			t.modalTimer = setTimeout (t.modal, 2500);		
		}
	},
	
	setcollectinit : function() {
		var t = Tabs.Artefacts;
		if (t.started) {
			Logbuch.eintrag(Logs.artlog,'Stopped auto attack.....!!');
			t.show();
			return;
		}
		if (t.setstarted) {
			t.setstarted = false;
			t.artset = "SET Completion=OFF";	
			clearTimeout (t.artifactTimer);	
			clearTimeout (t.modalTimer);
			if (t.stopreload) {
				t.stopreload = false; 
				Options.pbEveryEnable = true;
				RefreshEvery.setEnable(true);
				Logbuch.eintrag(Logs.artlog,'Update Started..');
				t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
			}						
		} else {
			t.setstarted = true;
			t.artset = "SET Completion=ON";
			if (Options.pbEveryEnable) {
				t.stopreload = true; 
				Options.pbEveryEnable = false;
				RefreshEvery.setEnable(false);
				Logbuch.eintrag(Logs.artlog,'Update Stopped.!!');
				t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
			}
			t.setcollect();
			t.modal();
		}
		t.show();
	},
	
	setcollect : function() {
		var t = Tabs.Artefacts;
		clearTimeout (t.artifactTimer);
		var aset = unsafeWindow.artifactData.artifactSets;
		var astrings = unsafeWindow.arStrings;
        var sets = [];
		if (t.setonly == 0) {
			for (var snumber in aset) {	
				sets.push(snumber);
			}
		} else {
			sets.push(t.setonly);
		}
		sets.sort();
		sets.reverse();
		for (var i = 0; i<sets.length; i++) {
			var snumber = sets[i];	

			if (t.setonly == 0) {
				if (snumber == 20410 && Seed.items.i1203 && parseInt(Seed.items.i1203) >= 1) continue;
				if (snumber == 20430 && Seed.items.i1204 && parseInt(Seed.items.i1204) >= 1) continue;
				if (snumber == 20440 && Seed.items.i1205 && parseInt(Seed.items.i1205) >= 1) continue;
				if (snumber == 20450 && Seed.items.i1206 && parseInt(Seed.items.i1206) >= 1) continue;	
			}
			var set = aset[snumber];
			var setname = astrings.artifactSetName['a'+snumber];
			var max = 100000;
			for (var a = 0; a < set.length; a++) {
				var item = set[a];
				if (!Seed.items['i'+item]) {
					var count = 0;
				} else {
					var count = Seed.items['i'+item];
				}
				if (parseInt(count) < max) max = count;
			}
			if (parseInt(snumber) == 20360) {
				max = parseInt(max/5); 	
			}
			
			if (parseInt(snumber) == 20380) {
				max = parseInt(max/10); 	
			}
						
			if (parseInt(snumber) == 20395) {
				max = parseInt(max/3); 	
			}
			
			if (max > 0) {
				
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.setid = snumber;
							
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "completeArtifactSet.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) {
						t.artsetrslt(rslt, snumber);
					},
					onFailure: function (rslt) {
						t.artsetrslt(rslt, snumber);
					}
				});
					
				t.artifactTimer = setTimeout (t.setcollect, 10000);	
				return;					
			}
		}
		Logbuch.eintrag(Logs.artlog,'NO SET R & D Center to be completed...');
		if (t.stopreload) {
			t.stopreload = false; 
			Options.pbEveryEnable = true;
			RefreshEvery.setEnable(true);
			Logbuch.eintrag(Logs.artlog,'Updated..!');
			t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
		}	
		t.setstarted = false;
		t.artset = "SET Completion ON/OFF";		
		t.show();
		return;	
	},

	artsetrslt : function(rslt, snumber) {
		var t = Tabs.Artefacts;
		var aset = unsafeWindow.artifactData.artifactSets;
		var axp = unsafeWindow.artifactData.artifactSetsMightRewards;
		var astrings = unsafeWindow.arStrings;
		var setname = astrings.artifactSetName['a'+snumber];	
		var xp = axp[snumber];
		if (rslt.ok) {	
			var set = aset[snumber];
			var dec = 1;
			if (parseInt(snumber) == 20360) dec = 5; 
			if (parseInt(snumber) == 20380) dec = 10; 			
			for (var a = 0; a < set.length; a++) {
				if (Seed.items['i'+a] && Seed.items['i'+a] > 0) {
					Seed.items['i'+a] -= dec;
				}				
			}

			var m = 'The: <b>' + setname + '</b> Completed Set..! <b>'+xp+' XP</b>. Wait 10 Seconds..';
			Logbuch.eintrag(Logs.artlog,m);	
			t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);			
		} else {
			//  
			var m = '"Failed to complete the set: '+setname+'<br>'; 
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			m += '<span class="boldRed">'+errorcode+'</span>';
			Logbuch.eintrag(Logs.artlog,m);
			t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
		}
	},

	freeEnergy : function() {
		var cid = "city" + Options.pbartcity.substr(1);
		var l1 = Seed.leaders[cid].resourcefulnessKnightId;
		var l2 = Seed.leaders[cid].politicsKnightId;		
		var l3 = Seed.leaders[cid].combatKnightId;		
		var l4 = Seed.leaders[cid].intelligenceKnightId;				
		var energy = 0;
		var generals = Seed.knights[cid];
		var lagernd = [];
		for (var m in Seed.outgoing_marches[Options.pbartcity]) {
			var march = Seed.outgoing_marches[Options.pbartcity][m];
			if (march.marchType == 2 && march.marchStatus == 2 && march.knightId != 0) {
				lagernd.push(march.knightId);
			}
		}
		for (var g in generals) {
			if (generals[g].knightId == l1 || generals[g].knightId == l2 || generals[g].knightId == l3 || generals[g].knightId == l4) continue;
			if (lagernd.length > 0) {
				if (lagernd.exists(g.substr(3))) continue;
			}
			energy += parseInt(generals[g].knightEnergy);
		}
		return energy;
	},
	
	ClearALog : function () {
		var t = Tabs.Artefacts;
		Logs.artlog = [];
		saveLogs();
		clearTimeout (t.displayTimer);
		t.show();
	},
	
	AttackOnOff : function () {
		var t = Tabs.Artefacts;
		if (t.setstarted) {
			Logbuch.eintrag(Logs.artlog,'Upon completion retry the SET.!');
			t.show();	
			return;			
		}
		if (t.started) {
			t.started = false;
			t.startvalue = "Start Attack";
			clearTimeout (t.attackTimer);
			clearTimeout (t.modalTimer);
			clearTimeout (t.reportTimer);	
			if (t.stopreload) {
				t.stopreload = false; 
				Options.pbEveryEnable = true;
				RefreshEvery.setEnable(true);
				Logbuch.eintrag(Logs.artlog,'Update In Progress ..');
				t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
			}			
		} else {
			var ok = true;
			var emsg = "";
			Options.pbartx = parseInt(Options.pbartx);
			Options.pbarty = parseInt(Options.pbarty);
			if (Options.pbarttype == "w") {
				if (Options.pbartx < 1 || Options.pbartx > 800) {
					emsg+= '"XXX coordinate must be between 1 and 800<br>';
					ok = false;
				}
				if (Options.pbarty < 1 || Options.pbarty > 800) {
					emsg+= 'YYY coordinate must be between 1 and 800<br>';
					ok = false;
				}
			} else {
				if (!t.klistcheck()) {
					emsg+= 'Being Registered Coord. At the same coord. Input current.<br>';
					ok = false;				
				}
			}
			
			Options.pbartinterval = parseInt(Options.pbartinterval);
			if (Options.pbartinterval < 3) {
				emsg+= 'The minimum time between attacks should be 6 seconds<br>';
				ok = false;				
			}

			Options.pbartenergysave = parseInt(Options.pbartenergysave);
		
			var troops = false;
			for (var r = 1; r < 25; r++){
				Options['pbartu' + r] = parseInt(Options['pbartu' + r]);
				if (Options['pbartu' + r] > 0) {
					troops = true;				
				}
			}
			if (!troops) {
				emsg+= 'You must be logged Military Unit.<br>';
				ok = false;				
			}
			
			var troops = true;
			var c = "city" + Options.pbartcity.substr(1);	
			for (var r = 1; r < 25; r++){
				if (Seed.units[c]['unt' + r] < Options['pbartu' + r]) {
					troops = false;
					ok = false;				
				}
			}
			if (!troops) emsg+= 'You do not have enough troops.<br>';

			if (ok) {
				t.started = true;
				t.startvalue = "STOP Attack";			
				t.koordlistpointer = 0;
				
				if (Options.pbEveryEnable) {
					t.stopreload = true; 
					Options.pbEveryEnable = false;
					RefreshEvery.setEnable(false);
					Logbuch.eintrag(Logs.artlog,'Update STOPPED!!');
					t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
				}
				t.attackStart();
				t.modal();
				t.startUnixTime = unixTime();
				t.reportTimer = setTimeout (t.report, 5000);
			} else {
				Logbuch.eintrag(Logs.artlog,emsg);
				t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
			}
		}
		t.show();
	},

	attackStart : function () {
		var t = Tabs.Artefacts;
    clearTimeout (t.attackTimer);
		
		t.updatemarches();
		
		if (t.started) {
			if (t.attack) {
				var cid = Options.pbartcity.substr(1);
				var c = "city" + cid;		
				var now = unixTime();
				var mid = 0;
				var mlist = Seed.outgoing_marches[Options.pbartcity];
				for (var m in mlist) {
					if (parseInt(mlist[m].marchStatus) == 0) {
						mid = mlist[m].marchId;
						break;
					}
				}
				if (mid == 0) {
					Logbuch.eintrag(Logs.artlog,'Please try again later ..');
					t.attackTimer = setTimeout (t.attackStart, 5000);	
					t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
					return;
				}
				
				if (t.freeEnergy() > Options.pbartenergysave) {
					var l1 = Seed.leaders[c].resourcefulnessKnightId;
					var l2 = Seed.leaders[c].politicsKnightId;		
					var l3 = Seed.leaders[c].combatKnightId;		
					var l4 = Seed.leaders[c].intelligenceKnightId;				
					var generals = Seed.knights[c];
					var kid = 0;
					var maxenergy = 0;
					var experience = 0;
					var wait = 0;
					var lagernd = [];
					for (var m in Seed.outgoing_marches[Options.pbartcity]) {
						var march = Seed.outgoing_marches[Options.pbartcity][m];
						if (march.marchType == 2 && march.marchStatus == 2 && march.knightId != 0) {
							lagernd.push(march.knightId);
						}
					}
					for (var g in generals) {
						if (generals[g].knightId == l1 || generals[g].knightId == l2 || generals[g].knightId == l3 || generals[g].knightId == l4) continue;
						if (lagernd.length > 0) {
							if (lagernd.exists(g.substr(3))) continue;
						}
						if (generals[g].knightStatus == 1 && generals[g].knightEnergy > maxenergy) {
							maxenergy = generals[g].knightEnergy;
							kid = generals[g].knightId;
							experience = generals[g].experience;
						}
						if (generals[g].knightStatus == 1 && 
								maxenergy == generals[g].knightEnergy && 
								parseInt(generals[g].experience) < parseInt(experience)) {
							kid = generals[g].knightId;
							experience = generals[g].experience;
						}
						if (generals[g].knightStatus != 1 && generals[g].knightEnergy > 0) {
							wait = 1;
						}
					}
					if (kid == 0) {
						if (wait == 0) {
							Logbuch.eintrag(Logs.artlog,'General not available with Energy!');
							t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
							var ret = true;
							var ml = Seed.outgoing_marches[Options.pbartcity];
							for (var m in ml) {
								if (parseInt(ml[m].marchStatus) != 0) {
									ret = false;
								}
							}
							if (ret) {
								Logbuch.eintrag(Logs.artlog,'Successful attacks occurred on all targets in memory!');
								t.started = false;
								t.startvalue = "START Attack";
								if (t.stopreload) {
									t.stopreload = false; 
									Options.pbEveryEnable = true;
									RefreshEvery.setEnable(true);
									Logbuch.eintrag(Logs.artlog,'Update In Progress...');
									t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
								}		
								t.show();
								return;			
							} else {
								t.attackTimer = setTimeout (t.attackStart, 5000);	
								return;				
							}
						} else {
							Logbuch.eintrag(Logs.artlog,'Finished. No Generals or Energy. Refresh your page ..');
							t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
							t.attackTimer = setTimeout (t.attackStart, 5000);	
							return;
						}
					}
				} else {

					Logbuch.eintrag(Logs.artlog,'No Generals with Energy.!!');
					t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);

					var ret = true;
					var ml = Seed.outgoing_marches[Options.pbartcity];
					for (var m in ml) {
						if (parseInt(ml[m].marchStatus) == 2 && parseInt(ml[m].marchType) == 2) continue;
						if (parseInt(ml[m].marchStatus) != 0) {
							ret = false;
						}
					}
					if (ret) {
						Logbuch.eintrag(Logs.artlog,'Successful attacks occurred on all targets in memory.!');
						t.started = false;
						t.startvalue = "START ATTACK";
						if (t.stopreload) {
							t.stopreload = false; 
							Options.pbEveryEnable = true;
							RefreshEvery.setEnable(true);
							Logbuch.eintrag(Logs.artlog,'Update In Progress...');
							t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
						}		
						t.show();
						return;			
					} else {
						t.attackTimer = setTimeout (t.attackStart, 5000);	
						return;				
					}
				}
				
				for (var r = 1; r < 25; r++){
					if (Seed.units[c]['unt' + r] && Seed.units[c]['unt' + r] < Options['pbartu' + r]) {
						Logbuch.eintrag(Logs.artlog,'Insufficient military troops. Please wait .. ');
						t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
						t.attackTimer = setTimeout (t.attackStart, 5000);	
						return;
					}
				}

				if (Options.pbarttype == "f" && t.koordlistpointer >= t.koordlist.length) {
					Logbuch.eintrag(Logs.artlog,'The coordinates are added to memory PROCESSING..! Please wait ..');
					t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
					var ret = true;
					var ml = Seed.outgoing_marches[Options.pbartcity];
					for (var m in ml) {
						if (ml[m].marchStatus != 0) {
							ret = false;
						}
					}
					if (ret) {
						Logbuch.eintrag(Logs.artlog,'Successful attacks occurred on all targets in memory.!!');
						t.started = false;
						t.startvalue = "START Attack";
						t.show();
						return;			
					} else {
						t.attackTimer = setTimeout (t.attackStart, 5000);	
						return;				
					}
				}
				
				if (Options.pbarttype == "w") {
					var x = Options.pbartx;
					var y = Options.pbarty;
				} else {
					var koord = t.koordlist[t.koordlistpointer].split(',');
					var x = parseInt(koord[0],10);
					var y = parseInt(koord[1],10);
				}
				
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = cid; 
				params.type = 4; 
				params.kid = kid; 
				params.mid = mid; 
				params.xcoord = x; 
				params.ycoord = y; 
				for (var r = 1; r < 25; r++){
					if (parseInt(Options['pbartu' + r]) > 0) {
						params['u' + r] = Options['pbartu' + r]; 
					}
				}
				
				params.gold = 0;
				for (var r = 1; r < 7; r++) {
					params['r' + r] = 0;
				}
				t.attack = false;
				var now = unixTime();
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "march.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function(rslt) {t.marchout(rslt, params, now);},
					onFailure: function(rslt) {},
				});
			}
			var next =  (parseInt(1000*Options.pbartinterval) + parseInt(1000*Math.random() * ( Options.pbartinterval * 1.5 - Options.pbartinterval )));
			t.attackTimer = setTimeout (t.attackStart,next);	
		}
	},

	marchout : function (rslt, params, startnow) {
	  var t = Tabs.Artefacts;
		if (rslt.ok) {	
			var k = Seed.knights['city'+params.cid]['knt'+params.kid];
			k.knightStatus = 10;
			k.knightEnergy -= 1;
					
			for (var r = 1; r < 25; r++){
				if (params['u' + r]) {
					Seed.units['city' + params.cid]['unt' + r] -= params['u' + r];
				}
			}

			var now = unixTime();
			var q = {
				destinationUnixTime: now * 2 - startnow + rslt.oneway,
				marchUnixTime: now,
				returnUnixTime: rslt.returnEta,
				toXCoord: params.xcoord,
				toYCoord: params.ycoord,
				marchType: 4,
				knightId: params.kid,
				marchStatus: 1,
				gold: 0,
				marchId: params.mid,
			};
			for (var r = 0; r < 9; r++) {
				q["resource" + r] = 0;			
			}
			for (var u = 1; r < 25; r++) {
				if (params['u' + r]) {
					q["unit" + u + "Count"] = params['u' + r];
				} else {
					q["unit" + u + "Count"] = 0;
				}
				q["unit" + u + "Return"] = 0;		
			}			
			if (rslt.tileId) {
				q.toTileId = rslt.tileId;
				q.toTileType = rslt.tileType;
				q.toTileLevel = rslt.tileLevel;
			}
			Seed.outgoing_marches["c" + params.cid]["m" + params.mid] = q;
		
			if (Options.pbarttype == "f") {
				t.koordlistpointer++;
			}
			
			var m = 'Coordinate attacked: '+params.xcoord+","+params.ycoord+' Submitted!. General: '+Seed.knights['city'+params.cid]['knt'+params.kid].knightName;
			Logbuch.eintrag(Logs.artlog,m);			
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m = 'Initiative failed attack:'+params.xcoord+","+params.ycoord+'. General: '+Seed.knights['city'+params.cid]['knt'+params.kid].knightName+'<br><span class="boldRed">'+errorcode+'</span>';
			Logbuch.eintrag(Logs.artlog,m);
		}
		t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);
		t.attack = true;
		t.id.ptenergy.innerHTML = t.freeEnergy() + " Actual Number of Attacks";
	},

	updatemarches: function() {
		var now = unixTime();
		for(var i=0; i<Cities.numCities; i++) {
			var cityId = Cities.cities[i].id;
			var marches = Seed.outgoing_marches['c'+cityId];
			for (var m in marches) {
				var march = marches[m];
				if (march.marchStatus != 0 && (march.marchType == 1 || march.marchType == 4) && march.returnUnixTime < now) {
					march.marchStatus = 0;
					if (march.knightId != 0 && Seed.knights['city'+cityId]['knt'+march.knightId]) {
						Seed.knights['city'+cityId]['knt'+march.knightId].knightStatus = 1;
					}
					if (march.marchType == 1) { 
						var post = "Count";
					} else { 
						var post = "Return";					
					}
					for (var r = 1; r < 25; r++){
						Seed.units['city'+cityId]['unt'+r] += parseInt(march['unit'+r+post]);
					}
				}
				if (march.marchStatus == 0) {
					if (march.knightId != 0 && Seed.knights['city'+cityId]['knt'+march.knightId]) {
						Seed.knights['city'+cityId]['knt'+march.knightId].knightStatus = 1;
						march.knightId = 0;					
					}
				}	
				
			}
    }
	},
	
  hide : function (){
    clearTimeout (Tabs.Artefacts.displayTimer);
  },	
	
	togOpt : function (checkboxId, optionName){
    var t = Tabs.Artefacts;
    var checkbox = checkboxId;
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
    }
  },
  
  changeOpt : function (valueId, optionName){
    var t = Tabs.Artefacts;
    var e = valueId;
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
			if (optionName == "pbartx" || optionName == "pbarty") {
				t.finfo();
				t.show();
			}
    }
  },
	
	finfo : function() {
	  var t = Tabs.Artefacts;
		var fieldinfo = t.id.ptfieldinfo;
		if (Options.pbartx < 1 || Options.pbartx > 800 || 
				Options.pbarty < 1 || Options.pbarty > 800) {
			fieldinfo.style.display = 'block';
			fieldinfo.style.width = '540px';
			fieldinfo.style.whiteSpace = 'normal';
			fieldinfo.style.padding = '6px';
			fieldinfo.style.backgroundColor = '#dddddd';					
			fieldinfo.innerHTML = '<b>Coordinates: ('+Options.pbartx+','+Options.pbarty+'):</b> The coordinates are invalid..';			
			return;
		} else {
			fieldinfo.style.display = 'block';
			fieldinfo.style.width = '540px';
			fieldinfo.style.whiteSpace = 'normal';
			fieldinfo.style.padding = '6px';	
			fieldinfo.style.backgroundColor = '#dddddd';				
			fieldinfo.innerHTML = '<b>Coordinates ('+Options.pbartx+','+Options.pbarty+'):</b> Waiting for the server..';			
		}
		if (!t.read) return;
		var x = parseInt((parseInt(Options.pbartx)-1)/5)*5;
		var y = parseInt((parseInt(Options.pbarty)-1)/5)*5;
		var block = 'bl_'+x+'_bt_'+y;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.blocks = block;
		t.read = false;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) { t.mapresult(rslt); },
			onFailure: function (rslt) {}
		});		
	},

	mapresult : function(rslt) {
		var t = Tabs.Artefacts;
		if (rslt.ok) {
			var info = '<table><tr><td><b>Coordinate: ('+Options.pbartx+','+Options.pbarty+'):</b>&nbsp;&nbsp;</td><td>';
			for (var e in rslt.data) {
				var element = rslt.data[e];
				if (element.xCoord != Options.pbartx || element.yCoord != Options.pbarty) continue;
				if (element.tileType == '51') {
					if (element.tileUserId == '0') {
						info += 'Terrorist Camp Position: '+element.tileLevel+'</td>';
					} else {
						info += 'City Position: '+element.tileLevel+'</td>';
						info += '</tr><tr><td><b>Name:</b></td><td>'+element.cityName+'</td>';
						info += '</tr><tr><td><b>General:</b></td><td>'+rslt.userInfo['u'+element.tileUserId].n;
						info += ' (Walking: '+addCommas(rslt.userInfo['u'+element.tileUserId].m)+', Level: '+rslt.userInfo['u'+element.tileUserId].t+')</td>';
						if (element.tileAllianceId == '0') {
							info += '</tr><tr><td><b>Alliance:</b></td><td>NO!</td>';
						} else {
							info += '</tr><tr><td><b>Alliance:</b></td><td>'+rslt.allianceNames['a'+element.tileAllianceId];
							info += ' (Walking: '+addCommas(rslt.allianceMights['a'+element.tileAllianceId])+')</td>';
						}
					}
				}	else {
					info += t.wildtypes[element.tileType]+' Level '+element.tileLevel+'</td>';
					if (element.tileType != '0') {
						if (element.tileUserId == '0') {
							info += '</tr><tr><td><b>State:</b></td><td>Free</td>';	
						} else {
							info += '</tr><tr><td><b>State:</b></td><td>Owned</td>';
							info += '</tr><tr><td><b>General:</b></td><td>'+rslt.userInfo['u'+element.tileUserId].n;
							info += ' (Walking: '+addCommas(rslt.userInfo['u'+element.tileUserId].m)+', Level: '+rslt.userInfo['u'+element.tileUserId].t+')</td>';
							if (element.tileAllianceId == '0') {
								info += '</tr><tr><td><b>Alliance:</b></td><td>NO';
							} else {
								info += '</tr><tr><td><b>Alliance:</b></td><td>'+rslt.allianceNames['a'+element.tileAllianceId];
								info += ' (Walking: '+addCommas(rslt.allianceMights['a'+element.tileAllianceId])+')</td>';
							}
						}
					}
				}				
			}
			info += '</tr></table>';
			t.id.ptfieldinfo.innerHTML = info;				

		} else {
			t.id.ptfieldinfo.innerHTML = '<b>Coordinate ('+Options.pbartx+','+Options.pbarty+'):</b> Data found on the server.!';				
		}
		t.read = true;
	},
	
	report : function() {
		var t = Tabs.Artefacts;
		clearTimeout (t.reportTimer);
		if (t.started || t.setstarted) {
			if (Options.pbartdeletereport) {
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.pageNo = 1;
				params.showAll = 0;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "listMarchReport.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) { t.reportlist(rslt); },
					onFailure: function (rslt) {}
				});
			}
			t.reportTimer = setTimeout (t.report, 15000);		
		}
	},	

	reportlist : function(rslt) {
		var t = Tabs.Artefacts;
		if (rslt.ok) {
			var rid = [];
			for(var r in rslt.arReports) {
				var report = rslt.arReports[r];
				if (report.marchType == '4' && report.side1PlayerId == unsafeWindow.g_ajaxsuffix.substr(3)) {
				//if (parseInt(report.reportUnixTime) > t.startUnixTime && report.marchType == '4' && report.side1PlayerId == unsafeWindow.g_ajaxsuffix.substr(3)) {
					if (report.side0TileType == '51' && report.side0CityId == '0' && report.side0PlayerId == '0') {
						rid.push(report.marchReportId);
					}
					if (report.side0TileType == '10' || report.side0TileType == '12' ||
							report.side0TileType == '20' || report.side0TileType == '30' ||
							report.side0TileType == '40' || report.side0TileType == '50') {
						rid.push(report.marchReportId);							
					}
				
				}
			}
			if (rid.length > 0) {
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.s0rids = '';
				params.eventids = '';
				params.s1rids = rid.join(',');
				var count = rid.length;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) { t.deletereports(rslt,count); },
					onFailure: function (rslt) {}
				});
			}

		} 
	},

	deletereports : function (rslt,count) {
		var t = Tabs.Artefacts;	
		if (rslt.ok) {
			Seed.newReportCount = parseInt(Seed.newReportCount) - count;
			if (count == 1) {
				Logbuch.eintrag(Logs.artlog,count + ' Deleted War Report.');
			} else {
				Logbuch.eintrag(Logs.artlog,count + ' Deleted Combat Reports.');
			}
			t.id.ptartlog.innerHTML = Logbuch.ausgabe(Logs.artlog);	
		}
	},
	
}


/*********************************** Search Tab***********************************/
Tabs.Search = {
  tabOrder : 7,
	tabLabel: 'Search',
  cont : null,
  tabDisabled : !ENABLE_SEARCH,
	id : {},
	sectors : {
		s1 : 'Alpha',
		s2 : 'Bravo',
		s3 : 'Charlie',
		s4 : 'Delta',
		s5 : 'Echo',
		s6 : 'Foxtrot',
		s7 : 'Golf',
		s8 : 'Hotel',
		s9 : 'India',
		s10 : 'Juliet',
		s11 : 'Kilo',
		s12 : 'Lima',
		s13 : 'Mike',
		s14 : 'November',
		s15 : 'Oscar',
		s16 : 'Papa',	
	},
	sectorkoords : {
		s1 : { x : 0, y : 0, },
		s2 : { x : 200, y : 0, },
		s3 : { x : 400, y : 0, },
		s4 : { x : 600, y : 0, },
		s5 : { x : 0, y : 200, },
		s6 : { x : 200, y : 200, },
		s7 : { x : 400, y : 200, },
		s8 : { x : 600, y : 200, },		
		s9 : { x : 0, y : 400, },
		s10 : { x : 200, y : 400, },
		s11 : { x : 400, y : 400, },
		s12 : { x : 600, y : 400, },		
		s13 : { x : 0, y : 600, },
		s14 : { x : 200, y : 600, },
		s15 : { x : 400, y : 600, },
		s16 : { x : 600, y : 600, },				
	},
	blocklist : [],
	blockmax : 100,
	blockpointer : 0,
	blockread : false,
	mapread : false,
	blockreadtimer : null,
	map : {
		data : {},
		userInfo : {},
		allianceNames: {},
		allianceMights: {},
	},
	counter : {
		terror : 0,
		wasteland : 0,
		grassland : 0,
		riverlake : 0,
		oil : 0,
		hills : 0,
		mountain : 0,
		plain : 0,
		sr : 0,
		city : 0,
		user : 0,
		alliance : 0,
		fields : 0,
		timer : 0,
	},
	popterror : null,
	popwild : null,
	popcity : null,
	popganda : null,
	wildtypes : {
		'0' : 'Barrens',
		'10' : 'Meadow',
		'11' : 'xxxx', 
		'12' : 'River',
		'20' : 'Oil',
		'30' : 'Peak',
		'40' : 'Mountain',
		'50' : 'Wasteland',
		'51' : 'Terrorit Camp',
		'52' : 'xxx', 
		'53' : 'xxxxx', 
		'201' : 'Titanium',
		'202' : 'Graphene',
		'203' : 'Uranium',
		'204' : 'Diamond',
	},
	diplomacyNames : {
		'0' : 'Neutral',
		'1' : 'Friendly',
		'2' : 'Hostile',		
		'3' : 'Friendly To Them',
		'4' : 'Friendly to You',
		'5' : 'Own Allaince',		
	},
	warstatus : {
		'1' : 'Normal',
		'2' : 'Artifacts',
		'3' : 'Peace Treaty',		
	},
	
  init : function (div){
    var t = Tabs.Search;
		Logs.searchlog =[];
		t.cont = div;
		var out = [];
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');	
		out.push('<b>Search Menu</b>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		out.push('<table class="ptTab" width="100%">');
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Search Method:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');
		out.push(htmlSelector ({'u':'Normal','s':'Sector','g':'Total Map'}, Options.pbsearchtype, 'id="ptsearchtype"'));
		out.push('&nbsp;<span id="ptsearchhint"></span>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Center:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push('<input id="ptsearchx" type="text" size="2" maxlength="3" style="text-align: center;">');		
		out.push(' / ');
		out.push('<input id="ptsearchy" type="text" size="2" maxlength="3" style="text-align: center;">');
		out.push('&nbsp;Cities:');
		for(var i=0; i<Cities.numCities; i++) {
			out.push('&nbsp;<input id="ptcity'+i+'" type="submit" name="c'+i+'" value="'+(i+1)+'" title="'+Cities.cities[i].name+'" style="padding-left:2px;padding-right:2px;">');
		}
		out.push('&nbsp;&nbsp;<b><span id="ptsearchcityhint"></span></b></td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Search Distance:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push('<input id="ptsearchradius" type="text" size="2" maxlength="3" style="text-align: center;">&nbsp;');		
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Province:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push(htmlSelector (t.sectors, Options.pbsearchsector, 'id="ptsearchsector"'));		
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');
        out.push('<td>');		
		out.push('<b>Sector Search:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push(htmlSelector ({9:9, 20:20, 50:50, 100:100, 150:150}, Options.pbsearchblockmax, 'id="ptsearchblockmax"'));		
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td colspan="2" style="white-space:normal;">');
		out.push('<br>Sector Search Advanced Search Options allows you to search .. <br> Use the smallest value for the most detailed<br>');
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');
		out.push('<td colspan="2">');
		out.push('<input id="ptsearchbutton" type="submit" name="search" value="START Search"><br><br>');
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td colspan="2">');
		out.push('<div id="ptsearchlog" style="height:70px; overflow:auto;"></div>');
		out.push('</td>');
		out.push('</tr>');			
		out.push('</table>');		
		out.push('<hr>');			
		out.push('<div id="ptsearchstat"></div>');				
		out.push('<hr>');	
		out.push('<div style="text-align:center;">');
		out.push('<input id="ptsearchterror" type="submit" name="terror" value="SHOW Terrorist Camps">&nbsp;&nbsp;&nbsp;');
		out.push('<input id="ptsearchwild" type="submit" name="wild" value="SHOW Wilds">&nbsp;&nbsp;&nbsp;');
		out.push('<input id="ptsearchcity" type="submit" name="city" value="SHOW Cities">');
		//out.push('<input id="ptsearchuanda" type="submit" name="Alliance" value="SHOW Alliance">');
		out.push('</div>');
		t.cont.innerHTML = out.join('');		
		t.id.ptsearchtype = document.getElementById('ptsearchtype');
		t.id.ptsearchx = document.getElementById('ptsearchx');
		t.id.ptsearchy = document.getElementById('ptsearchy');
		t.id.ptsearchhint = document.getElementById('ptsearchhint');
		for(i=0; i<Cities.numCities; i++) {
			var ptc = 'ptcity'+i;
			t.id[ptc] = document.getElementById(ptc);
		}
		t.id.ptsearchradius = document.getElementById('ptsearchradius');
		t.id.ptsearchsector = document.getElementById('ptsearchsector');
		t.id.ptsearchblockmax = document.getElementById('ptsearchblockmax');
		t.id.ptsearchbutton = document.getElementById('ptsearchbutton');
		t.id.ptsearchlog = document.getElementById('ptsearchlog');
		t.id.ptsearchstat = document.getElementById('ptsearchstat');
		t.id.ptsearchterror = document.getElementById('ptsearchterror');
		t.id.ptsearchwild = document.getElementById('ptsearchwild');
		t.id.ptsearchcity = document.getElementById('ptsearchcity');
		t.id.ptsearchcityhint = document.getElementById('ptsearchcityhint');

		/*
		var local = true;
		var serverID = getServerId();
		//counter
		s = GM_getValue ('Counter_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
		if (s != null){
			opts = JSON2.parse (s);
			for (k in opts){
				if (matTypeof(opts[k]) == 'object')
					for (kk in opts[k])
						t.counter[k][kk] = opts[k][kk];
				else
					t.counter[k] = opts[k];
			}
		} else {
			local = false;
		}		
		//map
		s = GM_getValue ('Map_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
		if (s != null){
			opts = JSON2.parse (s);
			for (k in opts){
				if (matTypeof(opts[k]) == 'object') {
					t.map[k] = {};
					for (kk in opts[k]) {
						if (matTypeof(opts[k][kk]) == 'object') {
							t.map[k][kk] = {};						
							for (kkk in opts[k][kk]) {
								t.map[k][kk][kkk] = opts[k][kk][kkk];
							}
						} else t.map[k][kk] = opts[k][kk];
					}
				} else t.map[k] = opts[k];
			}
		} else {
			local = false;
		}
		if (local) {
			Logbuch.eintrag(Logs.searchlog,'.....');		
			t.logbuch();				
		}
		*/
		t.shortstat();
		t.show();
	},

  hide : function (){
  },

  show : function (){
    var t = Tabs.Search;	
		t.changeOpt(t.id.ptsearchtype, 'pbsearchtype');
		t.changeOpt(t.id.ptsearchx, 'pbsearchx');		
		t.changeOpt(t.id.ptsearchy, 'pbsearchy');
		t.changeOpt(t.id.ptsearchradius, 'pbsearchradius');		
		t.changeOpt(t.id.ptsearchsector, 'pbsearchsector');
        t.changeOpt(t.id.ptsearchblockmax, 'pbsearchblockmax');		
		

		if (Options.pbsearchtype == "u") {
			t.id.ptsearchhint.innerHTML = '';
			t.id.ptsearchhint.style.display = 'block';
			t.id.ptsearchhint.style.width = '500px';
			t.id.ptsearchhint.style.whiteSpace = 'normal';
			t.id.ptsearchhint.style.padding = '6px';
			t.id.ptsearchx.disabled = false;
			t.id.ptsearchy.disabled = false;
			for(i=0; i<Cities.numCities; i++) {
				var ptc = 'ptcity'+i;
				t.id[ptc].disabled = false;
			}
			t.id.ptsearchradius.disabled = false;
			t.id.ptsearchsector.disabled = true;
			t.id.ptsearchblockmax.disabled = false;
		} 
		if (Options.pbsearchtype == "s") {
			t.id.ptsearchhint.innerHTML = '';
			t.id.ptsearchhint.style.display = 'block';
			t.id.ptsearchhint.style.width = '500px';
			t.id.ptsearchhint.style.whiteSpace = 'normal';
			t.id.ptsearchhint.style.padding = '6px';
			t.id.ptsearchx.disabled = true;
			t.id.ptsearchy.disabled = true;
			for(i=0; i<Cities.numCities; i++) {
				var ptc = 'ptcity'+i;
				t.id[ptc].disabled = true;
			}
			t.id.ptsearchradius.disabled = true;
			t.id.ptsearchsector.disabled = false;
			t.id.ptsearchblockmax.disabled = false;
		} 
		if (Options.pbsearchtype == "g") {
			t.id.ptsearchhint.innerHTML = 'A Fast Internet connection is needed to perform the selected search criteria.<br><br><span class="boldRed">CAUTION: Your Search may lead to freezing and overload, Kabam doe snot like there server hit like this</span><br><br>You may need to refresh your page';
			t.id.ptsearchhint.style.display = 'block';
			t.id.ptsearchhint.style.width = '500px';
			t.id.ptsearchhint.style.whiteSpace = 'normal';
			t.id.ptsearchhint.style.padding = '6px';
			t.id.ptsearchx.disabled = true;
			t.id.ptsearchy.disabled = true;
			for(i=0; i<Cities.numCities; i++) {
				var ptc = 'ptcity'+i;
				t.id[ptc].disabled = true;
			}
			t.id.ptsearchradius.disabled = true;
			t.id.ptsearchsector.disabled = true;
			t.id.ptsearchblockmax.disabled = false;
		} 
		

		for(i=0; i<Cities.numCities; i++) {
			var ptc = 'ptcity'+i;
			t.id[ptc].addEventListener ('click', t.city, false);
		}
		
		//
		t.id.ptsearchbutton.addEventListener ('click', t.startsearch, false);
		
		//
		t.id.ptsearchterror.addEventListener ('click', t.terrorview, false);
		t.id.ptsearchwild.addEventListener ('click', t.wildview, false);
		t.id.ptsearchcity.addEventListener ('click', t.cityview, false);
	},

	wildview: function() {

		function togOpt(checkboxId, optionName){
			var t = Tabs.Search;
			var checkbox = checkboxId;
			if (Options[optionName])
				checkbox.checked = true;
			checkbox.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.checked;
				saveOptions();
				t.tableview('wild',t.id.wildlist,t.id.wildcomment);
			}
		}
		
		function changeOpt(valueId, optionName){
			var t = Tabs.Search;
			var e = valueId;
			e.value = Options[optionName];
			e.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.value.trim();
				this.value = this.value.trim();
				if (optionName == "pbsearchwildmin" && parseInt(Options.pbsearchwildmin) > parseInt(Options.pbsearchwildmax)) {
					Options.pbsearchwildmax = Options.pbsearchwildmin;
					t.id.ptsearchwildmax.value = Options.pbsearchwildmax;
				}
				if (optionName == "pbsearchwildmax" && parseInt(Options.pbsearchwildmax) < parseInt(Options.pbsearchwildmin)) {
					Options.pbsearchwildmin = Options.pbsearchwildmax;
					t.id.ptsearchwildmin.value = Options.pbsearchwildmin;
				}
				saveOptions();
				t.tableview('wild',t.id.wildlist,t.id.wildcomment);
			}
		}
		
		function wildchange() { }
		
	  var t = Tabs.Search;	

    if (t.popwild == null){  
      t.popwild = new CPopup('wild', 50, 50, 1000,600, true);
      t.popwild.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">DETAILED STRATEGIC RESOURCE LANDS DISPLAY and MENU</b>';
			var content = [];
			content.push('<table><tr><td style="vertical-align:top; padding-right:10px;">');
			content.push('<table><tr><td colspan="2" style="padding-bottom:3px;"><b>Level:</b></td></tr><tr><td>Min.&nbsp;</td><td style="padding-bottom:3px;">');
			content.push(htmlSelector ({'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}, Options.pbsearchwildmin, 'id="ptsearchwildmin"'));
			content.push('</td></tr><tr><td>Maks.&nbsp;</td><td>');
			content.push(htmlSelector ({'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}, Options.pbsearchwildmax, 'id="ptsearchwildmax"'));
			content.push('</td></tr></table></td>');
			
			content.push('<td style="vertical-align:top; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table><tr><td colspan="4" style="padding-bottom:3px;"><b>&nbsp;Wild Type:</b></td></tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildgrass"></td><td>Grassland&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildriver"></td><td>River&nbsp;&nbsp;</td>');
			content.push('</tr>');			
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildoil"></td><td>Oil&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildstone"></td><td>Stone&nbsp;&nbsp;</td>');
			content.push('</tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildsteel"></td><td>Steel&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildplain"></td><td>Plain&nbsp;&nbsp;</td>');
			content.push('</tr>');	
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildsr"></td><td>Titanium and Graphene&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildwaste"></td><td>Wasteland</td>');
			content.push('<tr>');			
			content.push('</table></td>');

			content.push('<td style="vertical-align:top; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table><tr><td colspan="2" style="padding-bottom:3px;"><b>&nbsp;Status:</b></td></tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildfree"></td><td>Free</td>');
			content.push('</tr>');			
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildoccupied"></td><td>Owned</td>');
			content.push('</tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildnoalli"></td><td>Alliances</td>');
			content.push('</tr>');			
			content.push('</table></td>');

			content.push('<td style="vertical-align:middle; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>Alliance:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchwildalliance" style="width:120px;"></td>');
			content.push('</tr>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>General:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchwildplayer" style="width:120px;"></td>');
			content.push('</tr>');	
			content.push('<tr>');
			content.push('<td>&nbsp;</td>');
			content.push('<td><input type="submit" id="ptsearchwildchange" value="CLEAR"></td>');
			content.push('</tr>');	
			content.push('</table></td>');

			content.push('<td style="vertical-align:top; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table><tr><td colspan="6" style="padding-bottom:3px;"><b>&nbsp;Status of Alliance Diplomacy:</b></td></tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildhostile"></td><td>Hostile&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildfriendly"></td><td>Friendly&nbsp;&nbsp;</td>');			
			content.push('</tr>');			
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildneutral"></td><td>Neutral&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildfryou"></td><td>Friendly to You&nbsp;&nbsp;</td>');
			content.push('</tr>');
			content.push('<tr>');			
			content.push('<td><input type="checkbox" id="ptsearchwildselfalli"></td><td>Own Alliance&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildfrthem"></td><td>Friendly to Them</td>');
			content.push('</tr>');	
			content.push('<tr>');	
			content.push('<td><input type="checkbox" id="ptsearchwilddiplnoa"></td><td>Without Alliance&nbsp;&nbsp;</td>');
			content.push('<td>&nbsp;</td><td>&nbsp;</td>');
			content.push('</tr>');			
			content.push('</table></td>');
			
			content.push('<td style="vertical-align:middle; padding-left:10px; border-left:1px dotted black;"><input type="checkbox" id="ptsearchwildclick">&nbsp;Attack Menu Coordinates Reports</td>');			

			content.push('</tr></table>');
			content.push('<hr>');
			content.push('<div id="wildlist" style="max-height:435px; height:435px; overflow-y:auto;"></div>');
			content.push('<hr>');
			content.push('<div id="wildcomment"></div>');

      t.popwild.getMainDiv().innerHTML = content.join('');
			t.id.ptsearchwildmin = document.getElementById('ptsearchwildmin');      
			t.id.ptsearchwildmax = document.getElementById('ptsearchwildmax');  

			t.id.ptsearchwildgrass = document.getElementById('ptsearchwildgrass');      
			t.id.ptsearchwildriver = document.getElementById('ptsearchwildriver');
			t.id.ptsearchwildsr = document.getElementById('ptsearchwildsr');      
			t.id.ptsearchwildoil = document.getElementById('ptsearchwildoil');  			
			t.id.ptsearchwildstone = document.getElementById('ptsearchwildstone');      
			t.id.ptsearchwildsteel = document.getElementById('ptsearchwildsteel');
			t.id.ptsearchwildplain = document.getElementById('ptsearchwildplain');      
			t.id.ptsearchwildwaste = document.getElementById('ptsearchwildwaste'); 			

			t.id.ptsearchwildfree = document.getElementById('ptsearchwildfree');
			t.id.ptsearchwildoccupied = document.getElementById('ptsearchwildoccupied');      
			t.id.ptsearchwildnoalli = document.getElementById('ptsearchwildnoalli'); 			

			t.id.ptsearchwildalliance = document.getElementById('ptsearchwildalliance');
			t.id.ptsearchwildplayer = document.getElementById('ptsearchwildplayer');      
			t.id.ptsearchwildchange = document.getElementById('ptsearchwildchange'); 			
			
			t.id.wildlist = document.getElementById('wildlist');
			t.id.wildcomment = document.getElementById('wildcomment');

			t.id.ptsearchwildhostile = document.getElementById('ptsearchwildhostile');      
			t.id.ptsearchwildfriendly = document.getElementById('ptsearchwildfriendly'); 			
			t.id.ptsearchwildneutral = document.getElementById('ptsearchwildneutral');
			t.id.ptsearchwildfryou = document.getElementById('ptsearchwildfryou');      
			t.id.ptsearchwildfrthem = document.getElementById('ptsearchwildfrthem'); 
			t.id.ptsearchwildselfalli = document.getElementById('ptsearchwildselfalli');      
			t.id.ptsearchwilddiplnoa = document.getElementById('ptsearchwilddiplnoa'); 

			t.id.ptsearchwildclick = document.getElementById('ptsearchwildclick'); 
			
			changeOpt(t.id.ptsearchwildmin, 'pbsearchwildmin');
			changeOpt(t.id.ptsearchwildmax, 'pbsearchwildmax');
			
			togOpt(t.id.ptsearchwildgrass, 'pbsearchwildgrass');
			togOpt(t.id.ptsearchwildriver, 'pbsearchwildriver');
			togOpt(t.id.ptsearchwildsr, 'pbsearchwildsr');
			togOpt(t.id.ptsearchwildoil, 'pbsearchwildoil');
			togOpt(t.id.ptsearchwildstone, 'pbsearchwildstone');
			togOpt(t.id.ptsearchwildsteel, 'pbsearchwildsteel');
			togOpt(t.id.ptsearchwildplain, 'pbsearchwildplain');
			togOpt(t.id.ptsearchwildwaste, 'pbsearchwildwaste');

			togOpt(t.id.ptsearchwildfree, 'pbsearchwildfree');
			togOpt(t.id.ptsearchwildoccupied, 'pbsearchwildoccupied');
			togOpt(t.id.ptsearchwildnoalli, 'pbsearchwildnoalli');

			changeOpt(t.id.ptsearchwildalliance, 'pbsearchwildalliance');
			changeOpt(t.id.ptsearchwildplayer, 'pbsearchwildplayer');

			togOpt(t.id.ptsearchwildhostile, 'pbsearchwildhostile');
			togOpt(t.id.ptsearchwildfriendly, 'pbsearchwildfriendly');
			togOpt(t.id.ptsearchwildneutral, 'pbsearchwildneutral');
			togOpt(t.id.ptsearchwildfryou, 'pbsearchwildfryou');
			togOpt(t.id.ptsearchwildfrthem, 'pbsearchwildfrthem');
			togOpt(t.id.ptsearchwildselfalli, 'pbsearchwildselfalli');
			togOpt(t.id.ptsearchwilddiplnoa, 'pbsearchwilddiplnoa');
			
			togOpt(t.id.ptsearchwildclick, 'pbsearchwildclick');	
			
			t.id.ptsearchwildchange.addEventListener ('click', wildchange, false);			

		}
		t.popwild.show (true);
		t.tableview('wild',t.id.wildlist,t.id.wildcomment);
	},
	
	cityview: function() {

		function togOpt(checkboxId, optionName){
			var t = Tabs.Search;
			var checkbox = checkboxId;
			if (Options[optionName])
				checkbox.checked = true;
			checkbox.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.checked;
				saveOptions();
				t.tableview('city',t.id.citylist,t.id.citycomment);
			}
		}
		
		function changeOpt(valueId, optionName){
			var t = Tabs.Search;
			var e = valueId;
			e.value = Options[optionName];
			e.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.value.trim();
				this.value = this.value.trim();
				saveOptions();
				t.tableview('city',t.id.citylist,t.id.citycomment);
			}
		}
		
		function citychange() { }
		
	  var t = Tabs.Search;	

    if (t.popcity == null){  
      t.popcity = new CPopup('city', 50, 50, 1200,600, true);
      t.popcity.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">MENU DISPLAY MORE CITIES</b>';
			var content = [];
			content.push('<table><tr>');

			content.push('<td style="vertical-align:middle; padding-right:10px;"><table>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>Alliance:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchcityalliance" style="width:120px;"></td>');
			content.push('</tr>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>General:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchcityplayer" style="width:120px;"></td>');
			content.push('</tr>');	
			content.push('<tr>');
			content.push('<td>&nbsp;</td>');
			content.push('<td><input type="submit" id="ptsearchcitychange1" value="CLEAR"></td>');
			content.push('</tr>');	
			content.push('</table></td>');

			content.push('<td style="vertical-align:middle; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>Min.POWER:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchcityminmight" style="width:120px;"></td>');
			content.push('</tr>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>Max.POWER:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchcitymaxmight" style="width:120px;"></td>');
			content.push('</tr>');	
			content.push('<tr>');
			content.push('<td>&nbsp;</td>');
			content.push('<td><input type="submit" id="ptsearchcitychange2" value="CLEAR"></td>');
			content.push('</tr>');	
			content.push('</table></td>');
			
			content.push('<td style="vertical-align:top; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table><tr><td colspan="6" style="padding-bottom:3px;"><b>&nbsp;Status of Alliance Diplomacy:</b></td></tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchcityhostile"></td><td>Hostile&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchcityfriendly"></td><td>Friendly&nbsp;&nbsp;</td>');			
			content.push('</tr>');			
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchcityneutral"></td><td>Neutral&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchcityfryou"></td><td>Friendly to You&nbsp;&nbsp;</td>');
			content.push('</tr>');
			content.push('<tr>');			
			content.push('<td><input type="checkbox" id="ptsearchcityselfalli"></td><td>Own Alliance&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchcityfrthem"></td><td>Friendly to Them</td>');
			content.push('</tr>');	
			content.push('<tr>');	
			content.push('<td><input type="checkbox" id="ptsearchcitydiplnoa"></td><td>Without Alliance&nbsp;&nbsp;</td>');
			content.push('<td>&nbsp;</td><td>&nbsp;</td>');
			content.push('</tr>');			
			content.push('</table></td>');

			content.push('<td style="vertical-align:top; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table><tr><td colspan="2" style="padding-bottom:3px;"><b>&nbsp;Situation:</b></td></tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchcitynormal"></td><td>Normal&nbsp;&nbsp;</td>');
			content.push('</tr>');			
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchcitybeginner"></td><td>Artifacts&nbsp;&nbsp;</td>');
			content.push('</tr>');
			content.push('<tr>');			
			content.push('<td><input type="checkbox" id="ptsearchcitypeace"></td><td>Peace Treaty&nbsp;&nbsp;</td>');
			content.push('</tr>');	
			content.push('</table></td>');

			content.push('<td style="vertical-align:middle; padding-left:10px; border-left:1px dotted black;"><input type="checkbox" id="ptsearchcityclick">&nbsp;Attack Menu Coordinates Reports</td>');

			content.push('</tr></table>');
			content.push('<hr>');
			content.push('<div id="citylist" style="max-height:435px; height:435px; overflow-y:auto;"></div>');
			content.push('<hr>');
			content.push('<div id="citycomment"></div>');

      t.popcity.getMainDiv().innerHTML = content.join('');

			t.id.ptsearchcityalliance = document.getElementById('ptsearchcityalliance');
			t.id.ptsearchcityplayer = document.getElementById('ptsearchcityplayer');      
			t.id.ptsearchcitychange1 = document.getElementById('ptsearchcitychange1'); 

			t.id.ptsearchcityminmight = document.getElementById('ptsearchcityminmight');
			t.id.ptsearchcitymaxmight = document.getElementById('ptsearchcitymaxmight');      
			t.id.ptsearchcitychange2 = document.getElementById('ptsearchcitychange2'); 			
			
			t.id.citylist = document.getElementById('citylist');
			t.id.citycomment = document.getElementById('citycomment');

			t.id.ptsearchcityhostile = document.getElementById('ptsearchcityhostile');      
			t.id.ptsearchcityfriendly = document.getElementById('ptsearchcityfriendly'); 			
			t.id.ptsearchcityneutral = document.getElementById('ptsearchcityneutral');
			t.id.ptsearchcityfryou = document.getElementById('ptsearchcityfryou');      
			t.id.ptsearchcityfrthem = document.getElementById('ptsearchcityfrthem'); 
			t.id.ptsearchcityselfalli = document.getElementById('ptsearchcityselfalli');      
			t.id.ptsearchcitydiplnoa = document.getElementById('ptsearchcitydiplnoa'); 

			t.id.ptsearchcitynormal = document.getElementById('ptsearchcitynormal'); 
			t.id.ptsearchcitybeginner = document.getElementById('ptsearchcitybeginner');      
			t.id.ptsearchcitypeace = document.getElementById('ptsearchcitypeace'); 

			t.id.ptsearchcityclick = document.getElementById('ptsearchcityclick'); 
			
			changeOpt(t.id.ptsearchcityalliance, 'pbsearchcityalliance');
			changeOpt(t.id.ptsearchcityplayer, 'pbsearchcityplayer');
			changeOpt(t.id.ptsearchcityminmight, 'pbsearchcityminmight');
			changeOpt(t.id.ptsearchcitymaxmight, 'pbsearchcitymaxmight');			
			
			togOpt(t.id.ptsearchcityhostile, 'pbsearchcityhostile');
			togOpt(t.id.ptsearchcityfriendly, 'pbsearchcityfriendly');
			togOpt(t.id.ptsearchcityneutral, 'pbsearchcityneutral');
			togOpt(t.id.ptsearchcityfryou, 'pbsearchcityfryou');
			togOpt(t.id.ptsearchcityfrthem, 'pbsearchcityfrthem');
			togOpt(t.id.ptsearchcityselfalli, 'pbsearchcityselfalli');
			togOpt(t.id.ptsearchcitydiplnoa, 'pbsearchcitydiplnoa');
			
			togOpt(t.id.ptsearchcitynormal, 'pbsearchcitynormal');
			togOpt(t.id.ptsearchcitybeginner, 'pbsearchcitybeginner');
			togOpt(t.id.ptsearchcitypeace, 'pbsearchcitypeace');
			
			togOpt(t.id.ptsearchcityclick, 'pbsearchcityclick');			
			
			t.id.ptsearchcitychange1.addEventListener ('click', citychange, false);			
			t.id.ptsearchcitychange2.addEventListener ('click', citychange, false);	
			
		}
		t.popcity.show (true);
		t.tableview('city',t.id.citylist,t.id.citycomment);
	},

	terrorview: function() {
		
		function togOpt(checkboxId, optionName){
			var t = Tabs.Search;
			var checkbox = checkboxId;
			if (Options[optionName])
				checkbox.checked = true;
			checkbox.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.checked;
				saveOptions();
				t.tableview('terror',t.id.terrorlist,t.id.terrorcomment);
			}
		}

		function changeOpt(valueId, optionName){
			var t = Tabs.Search;
			var e = valueId;
			e.value = Options[optionName];
			e.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.value;
				if (optionName == "pbsearchterrormin" && parseInt(Options.pbsearchterrormin) > parseInt(Options.pbsearchterrormax)) {
					Options.pbsearchterrormax = Options.pbsearchterrormin;
					t.id.ptsearchterrormax.value = Options.pbsearchterrormax;
				}
				if (optionName == "pbsearchterrormax" && parseInt(Options.pbsearchterrormax) < parseInt(Options.pbsearchterrormin)) {
					Options.pbsearchterrormin = Options.pbsearchterrormax;
					t.id.ptsearchterrormin.value = Options.pbsearchterrormin;
				}
				saveOptions();
				t.tableview('terror',t.id.terrorlist, t.id.terrorcomment);
			}
		}
		
	  var t = Tabs.Search;	

    if (t.popterror == null){  
      t.popterror = new CPopup('terror', 50, 50, 450,600, true);
      t.popterror.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Terrorist Camps Views and TRANSFER Menu:</b>';
			var content = [];
			content.push('<table><tr><td style="vertical-align:middle;">');
			content.push('Level: ');
			content.push(htmlSelector ({'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}, Options.pbsearchterrormin, 'id="ptsearchterrormin"'));
			content.push(' / ');
			content.push(htmlSelector ({'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}, Options.pbsearchterrormax, 'id="ptsearchterrormax"'));
			content.push('</td>');
			content.push('<td>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="ptsearchterrorclick">&nbsp;Attack Menu Coordinates Reports</td>');			
			content.push('</tr></table>');
			content.push('<hr>');
			content.push('<div id="terrorlist" style="max-height:480px; height:480px; overflow-y:auto;"></div>');
			content.push('<hr>');
			content.push('<div id="terrorcomment"></div>');
      t.popterror.getMainDiv().innerHTML = content.join('');
			t.id.ptsearchterrormin = document.getElementById('ptsearchterrormin');      
			t.id.ptsearchterrormax = document.getElementById('ptsearchterrormax');  
			t.id.terrorlist = document.getElementById('terrorlist');
			t.id.terrorcomment = document.getElementById('terrorcomment');	
			t.id.ptsearchterrorclick = document.getElementById('ptsearchterrorclick');				
			changeOpt(t.id.ptsearchterrormin, 'pbsearchterrormin');
			changeOpt(t.id.ptsearchterrormax, 'pbsearchterrormax');
			togOpt(t.id.ptsearchterrorclick, 'pbsearchterrorclick');	
		}
		t.popterror.show (true);
		t.tableview('terror',t.id.terrorlist, t.id.terrorcomment);
	},

	tableview: function(type,outid,commentid) {

	  var t = Tabs.Search;		
		outid.innerHTML = 'Processing Continues ......';
		commentid.innerHTML = 'Please wait...';		

		if (type == 'terror') {

			var tabelle = [];
			tabelle.push('<table id="pbterrortable" width="100%" class="zebra ptTabOverview" cellpadding="0" cellspacing="0">');
			tabelle.push('<thead>');				
			tabelle.push('<tr style="background-color:#1BF;">');
			tabelle.push('<td style="text-align:left;" class="no_sort"><b>Level</b></td>');
			tabelle.push('<td style="text-align:center;"><b>Level</b></td>');	
			if (Options.pbsearchterrorclick) {
				tabelle.push('<td class="ptkoordslist no_sort" id="searchkoordslistT" title="Transfers all results to Attack Tab" style="text-align:center;"><b>Coordinate Reports</b></td>');
			} else {
				tabelle.push('<td class="no_sort" style="text-align:center;"><b>Coordinate Report</b></td>');
			}
			if (Options.pbsearchtype == "u") {
				tabelle.push('<td style="text-align:center;"><b>Order</b></td>');
			}
			tabelle.push('</tr>');
			tabelle.push('</thead>');
			tabelle.push('<tbody>');			
			var anzahl = 0;
			// 
			for (var e in t.map.data) {
				var d = t.map.data[e];
				//
				if (d.type != '51') continue;
				if (d.userid != '0') continue;
				if (parseInt(d.level) < parseInt(Options.pbsearchterrormin) || parseInt(d.level) > parseInt(Options.pbsearchterrormax)) continue;
				var dist = t.distance(parseInt(d.x),parseInt(d.y));
				if (Options.pbsearchtype == "u" && dist > parseInt(Options.pbsearchradius)) continue;
				
				// 
				if (anzahl++ % 2) {
					style = 'odd';
				} else {
					style = '';
				}
				if (anzahl > 3000) continue;
				tabelle.push('<tr class="'+style+'">');
				tabelle.push('<td style="text-align:left;"><b>Terrorist Camp</b></td>');	
				tabelle.push('<td style="text-align:center;">'+parseInt(d.level)+'</td>');	
				if (Options.pbsearchterrorclick) {
					tabelle.push('<td class="ptkoords" title="When you click coordinates it will pass to the the Attack Tab" style="text-align:center;" id="search'+anzahl+'T">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				} else {
					tabelle.push('<td style="text-align:center;">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				}				
				if (Options.pbsearchtype == "u") {					
					tabelle.push('<td my_key="'+dist+'" style="text-align:center;">'+formatZahl(dist,2,true)+'</td>');					
				}
				tabelle.push('</tr>');	
				
			}
			tabelle.push('</tbody>');						
			tabelle.push('</table>');
			if (anzahl == 0) {
				outid.innerHTML = 'No results available...';
				commentid.innerHTML = 'Check your selection and try again..';				
				return;
			}
			outid.innerHTML = tabelle.join('');
			if (anzahl <= 3000) {
				commentid.innerHTML = 'Quantity: '+addCommas(anzahl)+' Found.';
			} else {
				commentid.innerHTML = '<span class="boldRed">Only showing 3000 Results, More are avilable, filter your selection. '+addCommas(anzahl)+'</span>';
			
			}
			if (Options.pbsearchterrorclick) {
				for(var el = 1; el <= anzahl; el++) {
					var element = document.getElementById('search'+el+'T');
					element.addEventListener ('click', function() {
						var koords = this.innerHTML.split(',');
						var x = parseInt(koords[0],10);
						var y = parseInt(koords[1],10);
						Options.pbartx = x;
						Options.pbarty = y;	
						document.getElementById('ptartx').value = x;
						document.getElementById('ptarty').value = y;
						saveOptions();
						Tabs.Artefacts.finfo();							
						alert("Desired Coordinate Attack: "+x+","+y+" Only this Coordinate will transfer to attack tab");
					}, false);		
				}
				
				var klist = document.getElementById('searchkoordslistT');
				klist.addEventListener ('click', function() {
					var tb = document.getElementById('pbterrortable').tBodies[0];
					var tr = tb.rows;
					var trl = tb.rows.length;
					var koords = [];
					for (var i = 0; i < trl; i++) {
						koords.push(tr[i].cells[2].innerHTML);
					}
					Options.pbartklist = koords.join("\n");
					Tabs.Artefacts.klistcheck();
					alert(addCommas(trl) + " By clicking here transfer the results to the Attack Tab");
				}, false);	
			}
			var tsort = new SortTable(document.getElementById('pbterrortable'));
		}


		if (type == 'wild') {

			var diplomacy = t.diplomacy();

			var tabelle = [];
			tabelle.push('<table id="pbwildtable" width="100%" class="zebra ptTabOverview" cellpadding="0" cellspacing="0">');
			tabelle.push('<thead>');				
			tabelle.push('<tr style="background-color:#1BF;">');
			tabelle.push('<td style="text-align:left;"><b>Level</b></td>');
			tabelle.push('<td style="text-align:center;"><b>Level</b></td>');	
			if (Options.pbsearchwildclick) {			
				tabelle.push('<td class="ptkoordslist no_sort" id="searchkoordslistW" title="Click here to transfer the results to the Attack Tab" style="text-align:center;"><b>Coordinate Reports</b></td>');
			} else {
				tabelle.push('<td class="no_sort" style="text-align:center;"><b>Coordinate Attack</b></td>');
			}
			if (Options.pbsearchtype == "u") {
				tabelle.push('<td style="text-align:center;"><b>Order</b></td>');
			}
			tabelle.push('<td class="sort_string" style="text-align:left;" ignore_case="ignore_case"><b>General</b></td>');	
			tabelle.push('<td style="text-align:right;"><b>POWER</b></td>');	
			tabelle.push('<td class="sort_string" style="text-align:left;" ignore_case="ignore_case"><b>Alliance</b></td>');
			tabelle.push('<td style="text-align:right;"><b>Alliance POWER</b></td>');
			if (diplomacy) {
				tabelle.push('<td style="text-align:left;"><b>Diplomacy</b></td>');				
			}
			tabelle.push('<td style="text-align:left;"><b>Province</b></td>');	
			tabelle.push('</tr>');
			tabelle.push('</thead>');
			tabelle.push('<tbody>');			
			var anzahl = 0;


			var general = '';
			if (Options.pbsearchwildplayer != "") {
				var sname = Options.pbsearchwildplayer.toLowerCase();
				for (var u in t.map.userInfo) {
					var name = t.map.userInfo[u].name.toLowerCase();
					if (name == sname) {
						general = u.substr(1);
						break;
					}
				}
			}

			var alliance = '';
			if (Options.pbsearchwildalliance != "") {
				var sname = Options.pbsearchwildalliance.toLowerCase();
				for (var a in t.map.allianceNames) {
					var name = t.map.allianceNames[a].toLowerCase();
					if (name == sname) {
						alliance = a.substr(1);
						break;
					}
				}
			}


			for (var e in t.map.data) {
				var d = t.map.data[e];

				if (Options.pbsearchwildplayer != "" && d.userid != general) continue;
				if (Options.pbsearchwildalliance != "" && d.allianceid != alliance) continue;
				if (d.type == '51') continue;
				if (!Options.pbsearchwildwaste && d.type == '0') continue;
				if (!Options.pbsearchwildgrass && d.type == '10') continue;
				if (!Options.pbsearchwildriver && d.type == '12') continue;
				if (!Options.pbsearchwildoil && d.type == '20') continue;
				if (!Options.pbsearchwildstone && d.type == '30') continue;
				if (!Options.pbsearchwildsteel && d.type == '40') continue;
				if (!Options.pbsearchwildplain && d.type == '50') continue;
				if (!Options.pbsearchwildsr && 
						(d.type == '201' || d.type == '202' || 
						 d.type == '203' || d.type == '204')) continue;
				if (parseInt(d.level) < parseInt(Options.pbsearchwildmin) || parseInt(d.level) > parseInt(Options.pbsearchwildmax)) continue;
				if (!Options.pbsearchwildfree && d.userid == "0") continue;
				if (!Options.pbsearchwildoccupied && d.userid != "0") continue;
				if (d.allianceid != "0") {
					if (Options.pbsearchwildnoalli) continue
					var dipl = t.map.allianceDiplomacy['a'+d.allianceid];
					if (!Options.pbsearchwildneutral && dipl == 0) continue;					
					if (!Options.pbsearchwildfriendly && dipl == 1) continue;
					if (!Options.pbsearchwildhostile && dipl == 2) continue;
					if (!Options.pbsearchwildfrthem && dipl == 3) continue;	
					if (!Options.pbsearchwildfryou && dipl == 4) continue;
					if (!Options.pbsearchwildselfalli && dipl == 5) continue;					
				} else {
					if (!Options.pbsearchwilddiplnoa) continue; 
				}
				var dist = t.distance(parseInt(d.x),parseInt(d.y));
				if (Options.pbsearchtype == "u" && dist > parseInt(Options.pbsearchradius)) continue;

				if (anzahl++ % 2) {
					style = 'odd';
				} else {
					style = '';
				}
				if (anzahl > 3000) continue;
				tabelle.push('<tr class="'+style+'">');
				tabelle.push('<td style="text-align:left;"><b>'+t.wildtypes[d.type]+'</b></td>');	
				tabelle.push('<td style="text-align:center;">'+parseInt(d.level)+'</td>');	
				if (Options.pbsearchwildclick) {
					tabelle.push('<td class="ptkoords" title="Click here to transfer results to the Attack Tab" style="text-align:center;" id="search'+anzahl+'W">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				} else {
					tabelle.push('<td style="text-align:center;">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				}
				if (Options.pbsearchtype == "u") {					
					tabelle.push('<td  my_key="'+dist+'" style="text-align:center;">'+formatZahl(dist,2,true)+'</td>');					
				}
				if (d.userid != "0") {
					var u = t.map.userInfo['u'+d.userid];
					tabelle.push('<td style="text-align:left;">'+u.name+'</td>');
					tabelle.push('<td my_key="'+u.might+'" style="text-align:right;">'+addCommas(u.might)+'</td>');											
				} else {
					tabelle.push('<td style="text-align:left;">---</td>');
					tabelle.push('<td my_key="-1" style="text-align:right;">---</td>');
				}
				if (d.allianceid != "0") {
					var a = t.map.allianceNames['a'+d.allianceid];
					var m = t.map.allianceMights['a'+d.allianceid];
					tabelle.push('<td style="text-align:left;">'+a+'</td>');
					tabelle.push('<td my_key="'+m+'" style="text-align:right;">'+addCommas(m)+'</td>');
					if (diplomacy) {					
						tabelle.push('<td style="text-align:left;">'+t.diplomacyNames[dipl]+'</td>');
					}
				} else {
					tabelle.push('<td style="text-align:left;">---</td>');
					tabelle.push('<td my_key="-1" style="text-align:right;">---</td>');
					if (diplomacy) {					
						tabelle.push('<td style="text-align:left;">---</td>');
					}
				}	
				tabelle.push('<td style="text-align:left;">'+t.sectors['s'+d.sectorid]+'</td>');
				tabelle.push('</tr>');	
			}

			tabelle.push('</tbody>');						
			tabelle.push('</table>');
			if (anzahl == 0) {
				outid.innerHTML = 'No results available.';
				commentid.innerHTML = 'Check your selections and try again.';	
				return;
			}
			outid.innerHTML = tabelle.join('');
			if (anzahl <= 3000) {
				commentid.innerHTML = 'Wilds: '+addCommas(anzahl)+' Found ...';
			} else {
				commentid.innerHTML = '<span class="boldRed">Only showing 3000 Results, More are avilable, filter your selection. '+addCommas(anzahl)+' </span>';
			}
			if (Options.pbsearchwildclick) {
				for(var el = 1; el <= anzahl; el++) {
					var element = document.getElementById('search'+el+'W');
					element.addEventListener ('click', function() {
						var koords = this.innerHTML.split(',');
						var x = parseInt(koords[0],10);
						var y = parseInt(koords[1],10);
						Options.pbartx = x;
						Options.pbarty = y;	
						document.getElementById('ptartx').value = x;
						document.getElementById('ptarty').value = y;
						saveOptions();
						Tabs.Artefacts.finfo();							
						alert("Saldiri Yapilmak Istenen Coordinate: "+x+","+y+" And this is the only coordinate that will be transferred to the Attack Tab.");
					}, false);		
				}
				
				var klist = document.getElementById('searchkoordslistW');
				klist.addEventListener ('click', function() {
					var tb = document.getElementById('pbwildtable').tBodies[0];
					var tr = tb.rows;
					var trl = tb.rows.length;
					var koords = [];
					for (var i = 0; i < trl; i++) {
						koords.push(tr[i].cells[2].innerHTML);
					}
					Options.pbartklist = koords.join("\n");
					Tabs.Artefacts.klistcheck();
					alert(addCommas(trl) + " By clicking here Transfers the coordinates to the attack Tab");
				}, false);	
			}
			var tsort = new SortTable(document.getElementById('pbwildtable'));
		}


		if (type == 'city') {

			var diplomacy = t.diplomacy();

			var tabelle = [];
			tabelle.push('<table id="pbcitytable" width="100%" class="zebra ptTabOverview" cellpadding="0" cellspacing="0">');
			tabelle.push('<thead>');				
			tabelle.push('<tr style="background-color:#1BF;">');
			tabelle.push('<td style="text-align:left;"><b>Content</b></td>');
			tabelle.push('<td style="text-align:center;"><b>Level</b></td>');	
			tabelle.push('<td style="text-align:left;"><b>Name</b></td>');
			if (Options.pbsearchcityclick) {
				tabelle.push('<td class="ptkoordslist no_sort" id="searchkoordslistC" title="By clicking here automatically exit in the attack, or transfers all results." style="text-align:center;"><b>Coordinate AKTAR</b></td>');
			} else {
				tabelle.push('<td class="no_sort" istyle="text-align:center;"><b>Coordinate Attack</b></td>');
			}
			if (Options.pbsearchtype == "u") {
				tabelle.push('<td style="text-align:center;"><b>Order</b></td>');
			}
			tabelle.push('<td class="sort_string" style="text-align:left;" ignore_case="ignore_case"><b>General</b></td>');	
			tabelle.push('<td style="text-align:right;"><b>POWER</b></td>');
			tabelle.push('<td style="text-align:center;"><b>Gnr.Level</b></td>');			
			tabelle.push('<td class="sort_string" style="text-align:left;" ignore_case="ignore_case"><b>Alliance</b></td>');
			tabelle.push('<td style="text-align:right;"><b>Allaince POWER</b></td>');
			if (diplomacy) {
				tabelle.push('<td style="text-align:left;"><b>Diplomacy</b></td>');				
			}
			tabelle.push('<td style="text-align:left;"><b>Sitution</b></td>');				
			tabelle.push('<td style="text-align:left;"><b>Province</b></td>');	
			tabelle.push('</tr>');
			tabelle.push('</thead>');
			tabelle.push('<tbody>');			
			var anzahl = 0;

			var general = '';
			if (Options.pbsearchcityplayer != "") {
				var sname = Options.pbsearchcityplayer.toLowerCase();
				for (var u in t.map.userInfo) {
					var name = t.map.userInfo[u].name.toLowerCase();
					if (name == sname) {
						general = u.substr(1);
						break;
					}
				}
			}

			var alliance = '';
			if (Options.pbsearchcityalliance != "") {
				var sname = Options.pbsearchcityalliance.toLowerCase();
				for (var a in t.map.allianceNames) {
					var name = t.map.allianceNames[a].toLowerCase();
					if (name == sname) {
						alliance = a.substr(1);
						break;
					}
				}
			}


			for (var e in t.map.data) {
				var d = t.map.data[e];

				if (Options.pbsearchcityplayer != "" && d.userid != general) continue;
				if (Options.pbsearchcityalliance != "" && d.allianceid != alliance) continue;
				if (d.type != '51') continue;
				if (d.userid == '0') continue;
				var u = t.map.userInfo['u'+d.userid];
				if (Options.pbsearchcityminmight != "" && parseInt(u.might) < parseInt(Options.pbsearchcityminmight)) continue;
				if (Options.pbsearchcitymaxmight != "" && parseInt(u.might) > parseInt(Options.pbsearchcitymaxmight)) continue;
				if (!Options.pbsearchcitynormal && u.warstatus == "1") continue;
				if (!Options.pbsearchcitybeginner && u.warstatus == "2") continue;
				if (!Options.pbsearchcitypeace && u.warstatus == "3") continue;				
				if (d.allianceid != "0") {
					var dipl = t.map.allianceDiplomacy['a'+d.allianceid];
					if (!Options.pbsearchcityneutral && dipl == 0) continue;					
					if (!Options.pbsearchcityfriendly && dipl == 1) continue;
					if (!Options.pbsearchcityhostile && dipl == 2) continue;
					if (!Options.pbsearchcityfrthem && dipl == 3) continue;	
					if (!Options.pbsearchcityfryou && dipl == 4) continue;
					if (!Options.pbsearchcityselfalli && dipl == 5) continue;					
				} else {
					if (!Options.pbsearchcitydiplnoa) continue; 
				}
				var dist = t.distance(parseInt(d.x),parseInt(d.y));
				if (Options.pbsearchtype == "u" && dist > parseInt(Options.pbsearchradius)) continue;

				if (anzahl++ % 2) {
					style = 'odd';
				} else {
					style = '';
				}
				if (anzahl > 3000) continue;
				tabelle.push('<tr class="'+style+'">');
				tabelle.push('<td style="text-align:left;"><b>City</b></td>');	
				tabelle.push('<td style="text-align:center;">'+parseInt(d.level)+'</td>');
				tabelle.push('<td style="text-align:left;">'+d.cityname+'</td>');	
				if (Options.pbsearchcityclick) {
					tabelle.push('<td class="ptkoords" title="By clicking here automatically transfer the Coords to the Attack Tab" style="text-align:center;" id="search'+anzahl+'C">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				} else {
					tabelle.push('<td style="text-align:center;">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				}				
				if (Options.pbsearchtype == "u") {					
					tabelle.push('<td my_key="'+dist+'" style="text-align:center;">'+formatZahl(dist,2,true)+'</td>');					
				}
				tabelle.push('<td style="text-align:left;">'+u.name+'</td>');
				tabelle.push('<td my_key="'+u.might+'" style="text-align:right;">'+addCommas(u.might)+'</td>');	
				tabelle.push('<td style="text-align:center;">'+u.level+'</td>');
				
				if (d.allianceid != "0") {
					var a = t.map.allianceNames['a'+d.allianceid];
					var m = t.map.allianceMights['a'+d.allianceid];
					tabelle.push('<td style="text-align:left;">'+a+'</td>');
					tabelle.push('<td my_key="'+m+'" style="text-align:right;">'+addCommas(m)+'</td>');
					if (diplomacy) {					
						tabelle.push('<td style="text-align:left;">'+t.diplomacyNames[dipl]+'</td>');
					}
				} else {
					tabelle.push('<td style="text-align:left;">---</td>');
					tabelle.push('<td my_key="-1" style="text-align:right;">---</td>');
					if (diplomacy) {					
						tabelle.push('<td style="text-align:left;">---</td>');
					}
				}	
				tabelle.push('<td style="text-align:left;">'+t.warstatus[u.warstatus]+'</td>');
				tabelle.push('<td style="text-align:left;">'+t.sectors['s'+d.sectorid]+'</td>');
				tabelle.push('</tr>');	
			}
			tabelle.push('</tbody>');						
			tabelle.push('</table>');
			if (anzahl == 0) {
				outid.innerHTML = 'No results available...';
				commentid.innerHTML = 'Check your selections and try again.';	
				return;
			}
			outid.innerHTML = tabelle.join('');
			if (anzahl <= 3000) {
				commentid.innerHTML = 'Wilds '+addCommas(anzahl)+' Found ...';
			} else {
				commentid.innerHTML = '<span class="boldRed">Only showing 3000 Results, More are avilable, filter your selection. '+addCommas(anzahl)+' </span>';
			}
			if (Options.pbsearchcityclick) {
				for(var el = 1; el <= anzahl; el++) {
					var element = document.getElementById('search'+el+'C');
					element.addEventListener ('click', function() {
						var koords = this.innerHTML.split(',');
						var x = parseInt(koords[0],10);
						var y = parseInt(koords[1],10);
						Options.pbartx = x;
						Options.pbarty = y;	
						document.getElementById('ptartx').value = x;
						document.getElementById('ptarty').value = y;
						saveOptions();
						Tabs.Artefacts.finfo();							
						alert("Desired Coordinate Attack: "+x+","+y+" And this is only attack will be transferred to the Coordinate.");
					}, false);		
				}
				
				var klist = document.getElementById('searchkoordslistC');
				klist.addEventListener ('click', function() {
					var tb = document.getElementById('pbcitytable').tBodies[0];
					var tr = tb.rows;
					var trl = tb.rows.length;
					var koords = [];
					for (var i = 0; i < trl; i++) {
						koords.push(tr[i].cells[3].innerHTML);
					}
					Options.pbartklist = koords.join("\n");
					Tabs.Artefacts.klistcheck();
					alert(addCommas(trl) + " By clicking here automatically exist in the attack, or transfers all results.");
				}, false);	
			}
			var tsort = new SortTable(document.getElementById('pbcitytable'));
		}
		
	},
	
	diplomacy: function() {
		// 0 Tarafsiz
		// 1 Dost
		// 2 Dusman
		// 3 Onlara Karsi Dost
		// 4 Size Karso Dost
		// 5 Alliancesiz
    var t = Tabs.Search;
		
		var ad = Seed.allianceDiplomacies;
		t.map.allianceDiplomacy = {};
		try {
			var eigene = ad.allianceId;
		} catch (e) {
			return false;
		} 	
		for (var a in t.map.allianceNames) {
			var found = false;
			t.map.allianceDiplomacy[a] = 0;
			for (var alli in ad.friendly) {
				if (a == alli) {
					t.map.allianceDiplomacy[a] = 1;
					found = true;
				}
			}
			if (!found) {
				for (var alli in ad.hostile) {
					if (a == alli) {
						t.map.allianceDiplomacy[a] = 2;
						found = true;
					}
				}			
			}
			if (!found) {
				for (var alli in ad.friendlyToThem) {
					if (a == alli) {
						t.map.allianceDiplomacy[a] = 3;
						found = true;
					}
				}			
			}
			if (!found) {
				for (var alli in ad.friendlyToYou) {
					if (a == alli) {
						t.map.allianceDiplomacy[a] = 4;
						found = true;
					}
				}			
			}
			if (!found && a == 'a'+eigene) {
				t.map.allianceDiplomacy[a] = 5;		
			}
		}
		return true;
	},
	
	startsearch: function () {
    var t = Tabs.Search;
		var error = '';


		if (Options.pbsearchtype == "u") {
			Options.pbsearchx = parseInt(Options.pbsearchx);
			Options.pbsearchy = parseInt(Options.pbsearchy);
			Options.pbsearchradius = parseInt(Options.pbsearchradius);	
			if (Options.pbsearchx < 1 || Options.pbsearchx > 800) {
				error += 'You must enter a number between 1 to 800 X Box<br>';
			}
			if (Options.pbsearchy < 1 || Options.pbsearchy > 800) {
				error += 'You must enter a number between 1 to 800 Y Box<br>';
			}
			if (Options.pbsearchradius < 20 || Options.pbsearchradius > 100) {
				error += 'Input Range Wrong DONE!! Maximum 100 Distance to Search<br>';
			}
		}

		if (error.length > 0) {
			Logbuch.eintrag(Logs.searchlog,error);		
			t.logbuch();
			return;
		}
		

		if (t.mapread) {

			t.mapread = false;
			t.id.ptsearchtype.disabled = false;
			t.id.ptsearchbutton.value = 'START Search';
			t.show();
			return;
		} else {

			t.mapread = true;			
			t.id.ptsearchtype.disabled = true;
			t.id.ptsearchx.disabled = true;
			t.id.ptsearchy.disabled = true;
			for(i=0; i<Cities.numCities; i++) {
				var ptc = 'ptcity'+i;
				t.id[ptc].disabled = true;
			}
			t.id.ptsearchradius.disabled = true;
			t.id.ptsearchsector.disabled = true;
			t.id.ptsearchblockmax.disabled = true;
			t.id.ptsearchbutton.value = 'STOP Search';

			Logs.searchlog = [];
			saveLogs();

			t.map.data = {};
			t.map.userInfo = {};
			t.map.allianceNames = {};
			t.map.allianceMights = {};
			t.counter.terror = 0;
			t.counter.wasteland = 0;
			t.counter.grassland = 0;
			t.counter.riverlake = 0;
			t.counter.oil = 0;
			t.counter.hills = 0;
			t.counter.mountain = 0;
			t.counter.plain = 0;
			t.counter.sr = 0;
			t.counter.city = 0;
			t.counter.user = 0;
			t.counter.alliance = 0;
			t.counter.fields = 0;
			t.counter.timer = 0;			
			t.shortstat();
		}		
		

		if (Options.pbsearchtype == "u") {
			var x = parseInt(Options.pbsearchx)-1;
			var y = parseInt(Options.pbsearchy)-1;
			var r = parseInt(Options.pbsearchradius);
			var xstart = parseInt((x - r)/5)*5;
			var xend = parseInt((x + r)/5)*5;
			if (xstart < 0) xstart = 0;
			if (xend > 795) xend = 795;
			var ystart = parseInt((y - r)/5)*5;
			var yend = parseInt((y + r)/5)*5;
			if (ystart < 0) ystart = 0;
			if (yend > 795) yend = 795;	
			t.buildblocks(xstart, ystart, xend, yend);
		}

		if (Options.pbsearchtype == "s") {
			var xstart = t.sectorkoords[Options.pbsearchsector].x;
			var ystart = t.sectorkoords[Options.pbsearchsector].y;
			var xend = xstart + 195;
			var yend = ystart + 195;
			t.buildblocks(xstart, ystart, xend, yend);
		}
		
		if (Options.pbsearchtype == "g") {		
			var xstart = 0;
			var ystart = 0;
			var xend = 795;
			var yend = 795;
			t.buildblocks(xstart, ystart, xend, yend);			
		}


		t.blockpointer = 0;
		t.blockread = true;
		t.readmap();
	},

	readmap : function () {
    var t = Tabs.Search;	
		clearTimeout (t.blockreadtimer);
		if (t.mapread && t.blockread && t.blockpointer < t.blocklist.length) {
			
			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			params.blocks = t.blocklist[t.blockpointer];
			t.blockread = false;
			Logbuch.eintrag(Logs.searchlog,'Request  '+(t.blockpointer+1)+' / '+t.blocklist.length+' Request');		
			t.logbuch();			
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					t.mapresult(rslt);
				},
				onFailure: function (rslt) {
					t.mapresult(rslt);
				}
			});
		}
		if (t.blockpointer >= t.blocklist.length) {
			Logbuch.eintrag(Logs.searchlog,'Operation completed successfull');		
			t.logbuch();			
			t.mapread = false;
			t.id.ptsearchtype.disabled = false;
			t.id.ptsearchbutton.value = 'Stop Search';


			/*
			var Jetzt = new Date();
			t.counter.timer = Jetzt.toLocaleString();
			var serverID = getServerId();
			setTimeout (function (){
				GM_setValue ('Counter_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(t.counter));
			}, 0);
			setTimeout (function (){
				GM_setValue ('Map_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(t.map));
			}, 0);
			Logbuch.eintrag(Logs.searchlog,'........');		
			t.logbuch();					
			*/
			t.show();
			return;
		}

		t.blockreadtimer = setTimeout (t.readmap, 250);
	},

	mapresult : function (rslt){
    var t = Tabs.Search;
		if (rslt.ok) {

			//rslt.data, rslt.userInfo, rslt.allianceNames, rslt.allianceMights
			/*
				t.map.data = {};
				t.map.userInfo = {};
				t.map.allianceNames = {};
				t.map.allianceMights = {};	
			*/

			
			for (var e in rslt.data) {
				var element = rslt.data[e];
				if (Options.pbsearchtype == 'u' && t.distance(parseInt(element.xCoord), parseInt(element.yCoord)) > parseInt(Options.pbsearchradius)) continue; 
				if (!t.map.data[e]) {
					t.map.data[e] = {};
					t.counter.fields++;
				}
				var d = t.map.data[e];
				d.x = element.xCoord;
				d.y = element.yCoord;	
				d.type = element.tileType;
				d.level = element.tileLevel;
				d.userid = element.tileUserId;
				d.allianceid = element.tileAllianceId;	
				d.sectorid = element.tileProvinceId;
				d.cityname = element.cityName;	
				
				if (d.type == '51') {
					if (d.userid == '0') {
						t.counter.terror++;
					} else {
						t.counter.city++;
					}
				}
				if (d.type == '201' || d.type == '202' || d.type == '203' || d.type == '204') {
					t.counter.sr++;
				}	
				if (d.type == '0') {
					t.counter.wasteland++;
				}
				if (d.type == '10') {
					t.counter.grassland++;
				}
				if (d.type == '12') {
					t.counter.riverlake++;
				}
				if (d.type == '20') {
					t.counter.oil++;
				}
				if (d.type == '30') {
					t.counter.hills++;
				}
				if (d.type == '40') {
					t.counter.mountain++;
				}
				if (d.type == '50') {
					t.counter.plain++;
				}
			}
			
			for (var e in rslt.userInfo) {
				var element = rslt.userInfo[e];
				if (!t.map.userInfo[e]) {
					t.map.userInfo[e] = {};
					t.counter.user++;
				}
				var u = t.map.userInfo[e];
				u.name = element.n;
				u.level = element.t;					
				u.might = element.m;		
				u.warstatus = element.w;					
				u.allianceId = element.a;
			}

			
			for (var e in rslt.allianceNames) {
				var element = rslt.allianceNames[e];
				if (!t.map.allianceNames[e]) {
					t.map.allianceNames[e] = element;
					t.counter.alliance++;
				}
			}

			
			for (var e in rslt.allianceMights) {
				var element = rslt.allianceMights[e];
				if (!t.map.allianceMights[e]) {
					t.map.allianceMights[e] = element;
				}
			}
			
			Logbuch.eintrag(Logs.searchlog,'processing  '+(t.blockpointer+1)+' / '+t.blocklist.length+' successful  ...');		
			t.logbuch();			
			t.blockpointer++;
			t.shortstat();
		} else {
			Logbuch.eintrag(Logs.searchlog,'There were problems during operation '+(t.blockpointer+1)+'/'+t.blocklist.length);		
			t.logbuch();			
		}
		t.blockread = true;		
	},

	shortstat: function() {
	  var t = Tabs.Search;	
		var s = [];
		s.push('<table width="100%"><tr><td colspan="10"><b>Overview:</b></td></tr>');
		s.push('<tr><td colspan="10">&nbsp;</td></tr>');
		s.push('<tr>');
		s.push('<td>Terorist Camp:&nbsp;&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.terror)+'</td>');
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>City:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.city)+'</td>');		
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Grassland:&nbsp;&nbsp;&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.grassland)+'</td>');
		s.push('</tr>');
		s.push('<tr>');
		s.push('<td>River:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.riverlake)+'</td>');		
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Oil:&nbsp;&nbsp;&nbsp;&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.oil)+'</td>');
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Hills:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.hills)+'</td>');		
		s.push('</tr>');
		s.push('<tr>');
		s.push('<td>Mountian:&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.mountain)+'</td>');
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Plain:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.plain)+'</td>');		
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Wasteland:&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.wasteland)+'</td>');
		s.push('</tr>');
		s.push('<tr>');
		s.push('<td>Titanium/Graphene:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.sr)+'</td>');		
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Generals:&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.user)+'</td>');
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Alliances:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.alliance)+'</td>');		
		s.push('</tr>');
		s.push('<tr>');	
		s.push('<td colspan="10">&nbsp;</td>');			
		s.push('</tr>');
		s.push('<tr>');	
		s.push('<td colspan="10">Corresponding Section: '+addCommas(t.counter.fields)+' ('+parseInt(t.counter.fields/640000*1000)/10+'%) Total of 640,000 boxes of Map Loaded</td>');			
		s.push('</tr>');
		if (t.counter.timer != 0) {
			s.push('<tr>');	
			s.push('<td colspan="10">&nbsp;</td>');			
			s.push('</tr>');			
			s.push('<tr>');	
			s.push('<td colspan="10">Database: '+t.counter.timer+'</td>');			
			s.push('</tr>');
		}
		s.push('</table');
		t.id.ptsearchstat.innerHTML = s.join('');
	},
	
	buildblocks: function(xstart, ystart, xend, yend) {
	  var t = Tabs.Search;
		var b = [];
		var counter = 1;
		t.blocklist = [];
		for (var xcoord = xstart; xcoord <= xend; xcoord +=5) {
			for (var ycoord = ystart; ycoord <= yend; ycoord +=5) {
				b.push('bl_'+xcoord+'_bt_'+ycoord);
				counter++;
				if (counter > Options.pbsearchblockmax) {
					t.blocklist.push(b.join(','));
					b = [];
					counter = 1;
				}
			}
		}
		if (b.length > 0) {
			t.blocklist.push(b.join(','));			
		}		
	},
	
	logbuch: function() {
    var t = Tabs.Search;
		var log = Logbuch.ausgabe(Logs.searchlog);
		t.id.ptsearchlog.innerHTML = log;
	},
	
	distance: function(x,y) {	
		var xcenter = parseInt(Options.pbsearchx);
		var ycenter = parseInt(Options.pbsearchy);
		var xdist = xcenter - x;
		var ydist = ycenter - y;
		var dist = parseInt(Math.sqrt(xdist * xdist + ydist * ydist)*100)/100;
		return dist;
	},
	
	city: function () {
    var t = Tabs.Search;			
		var cid = parseInt(this.value)-1;
		var x = Cities.cities[cid].x;
		var y = Cities.cities[cid].y;	
		Options.pbsearchx = x;
		Options.pbsearchy = y;
		t.id.ptsearchcityhint.innerHTML = Cities.cities[cid].name;
		saveOptions();
		t.show();
	},
	
	togOpt : function (checkboxId, optionName){
    var t = Tabs.Search;
    var checkbox = checkboxId;
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
    }
  },
  
  changeOpt : function (valueId, optionName){
    var t = Tabs.Search;
    var e = valueId;
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
			t.show();			
    }
  },

}

/**************************** Build Tab  ******************************/
Tabs.build = {
  tabOrder: 4,
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
  tabDisabled : !ENABLE_BUILD,
	errorcounter : 0,

	init: function(div){
		var t = Tabs.build;
		t.myDiv = div;
		t.koc_buildslot = unsafeWindow.Building.buildSlot;
		t.koc_buildmenu = unsafeWindow.Building.buildMenu;
		t.currentBuildMode = "build";
		t.buildStates = {
			running: false,
			help: false,
		};
		t.readBuildStates();
	
		for (var i = 0; i < Cities.cities.length; i++) {
			t["bQ_" + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + unsafeWindow.g_ajaxsuffix.substr(3)+"_"+ Cities.cities[i].id, '[]'));
			if (typeof t["bQ_" + Cities.cities[i].id] == 'undefined' || (t["bQ_" + Cities.cities[i].id]) == "") {
				t["bQ_" + Cities.cities[i].id] = [];
			}
		}
	
		var m = '<DIV id=pbBuildDivF class=ptStat>AUTO BUILD SETUP</div><TABLE id=pbbuildfunctions width=100% height=0% class=ptTab><TR>';
		if (t.buildStates.running == false) {
			m += '<TD><INPUT id=pbBuildRunning type=submit value="Building=OFF"></td>';
		} else {
			m += '<TD><INPUT id=pbBuildRunning type=submit value="Building=ON"></td>';
		}
		m += '<TD><INPUT id=pbBuildMode type=submit value="Construction-Queue=ON/OFF"></td>';
		m += '<TD>Build Method: <SELECT id="pbBuildType">\
					<OPTION value="build">Up On Level</option>\
					<OPTION value="max">MAX Level</option>\
					<OPTION value="destruct">Demolition</option>\
					</select></td>';
		m += '<TD><INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>Request Help?</td>';
		m += '</tr></table></div>';
		
		m += '<div id="pbBuildDivQ" class="ptStat">OVERVIEW OF THE CONSTRUCTION</div><table id="pbbuildqueues" width="100%" class="ptentry"><tr>';
		m += '<td>&nbsp</td>';
		for (var i = 0; i < Cities.cities.length; i++) {
			m += '<td style="text-align:center;"><b>' + Cities.cities[i].name + '</b></td>';
		}
		m += '</tr><tr>';
		m += '<td>&nbsp</td>';		
		for (var i = 0; i < Cities.cities.length; i++) {
			m += '<TD style="text-align:center;"><input id="pbbuild_' + Cities.cities[i].id + '" type="submit" value="SHOW"></td>';
		}
		m += '</tr><tr>';
		m += '<td>&nbsp</td>';		
		for (var i = 0; i < Cities.cities.length; i++) {
			m += '<td>&nbsp;</td>';
		}
		m += '</tr><tr>';
		m += '<td><b>Place:</b>&nbsp;</td>';			
		for (var i = 0; i < Cities.cities.length; i++) {
			m += '<td style="text-align:center;" id="pbbuildcount_' + Cities.cities[i].id + '">' + t["bQ_" + Cities.cities[i].id].length + '</td>';
		}
		m += '</tr><tr>';
		m += '<td><b>Total Time:</b>&nbsp;</td>';			
		for (var i = 0; i < Cities.cities.length; i++) {
			t['totalTime_' + Cities.cities[i].id] = 0;
			cbQ = t["bQ_" + Cities.cities[i].id];
			if (typeof cbQ != 'undefined') {
				for (var j = 0; j < cbQ.length; j++) {
					t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].id]) + parseInt(cbQ[j].buildingTime);
				}
				timestring = timestr(t['totalTime_' + Cities.cities[i].id]);
			}
			m += '<td style="text-align:center;" id="pbbuildtotal_' + Cities.cities[i].id + '">' + timestring + '</td>';
		}
		m += '</tr></table><span class="boldRed" id="pbbuildError"></span>';
		m += '<hr><table width="100%">\
					<tr><td><b>Department of Construction Monitoring Menu</b><br><br></td>\
					<td style="text-align: right;"><input id="ptButClearBLog" type="submit" name="ClearBLog" value="CLEAR"></td></tr>\
					<tr><td colspan="2"><div id="pbbuildlog" style="height: 250px; overflow: auto;"></div></td></tr></table>';

		t.myDiv.innerHTML = m;
    t.logbuch();  
		
		for (var i = 0; i < Cities.cities.length; i++) {
			var cityId = Cities.cities[i].id;
			var btnName = 'pbbuild_' + cityId;
			addQueueEventListener(cityId, btnName);
			t.showBuildQueue(cityId, false);
		}

		t.e_autoBuild(); //start checking if we can build someting
		document.getElementById('ptButClearBLog').addEventListener('click', function(){
			Logs.buildlog = [];
			saveLogs();
			t.logbuch(); 		
		}, false);
		
		document.getElementById('pbBuildType').addEventListener('change', function(){
			t.setBuildMode(this.value);
		}, false);
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
				var qcon = Seed.queue_con["city" + cityId];
				if (matTypeof(qcon)=='array' && qcon.length>0) {
					if (parseInt(qcon[0][4]) > now)
						isBusy = true;
					else
						qcon.shift();
				}              
				if (isBusy) {

				} else {
					if (t["bQ_" + cityId].length > 0) {
						var bQi = t["bQ_" + cityId][0];
						t.doOne(bQi);;
					}
				}       	
			}
		}
		setTimeout(t.e_autoBuild, 10000);
	}, 
	
	doOne : function (bQi) {
		var t = Tabs.build;
		var currentcityid = parseInt(bQi.cityId);
		var cityName = t.getCityNameById(currentcityid);
		var time = parseInt(bQi.buildingTime);
		var mult = parseInt(bQi.buildingMult);
		var attempt = parseInt(bQi.buildingAttempt);
		var mode = bQi.buildingMode;
		var citpos = parseInt(bQi.buildingPos);

		if (Seed.buildings['city' + currentcityid]["pos" + citpos] != undefined && 
				Seed.buildings['city' + currentcityid]["pos" + citpos][0] != undefined) {	
			var l_bdgid = parseInt(bQi.buildingType);
			var bdgid = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][0]);
			var l_curlvl = parseInt(bQi.buildingLevel);
			var curlvl = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][1]);
			var l_bid = parseInt(bQi.buildingId);
			var bid = parseInt(Seed.buildings["city" + currentcityid]["pos" + citpos][3]);
			if (curlvl > 8 && mode == 'build') {
				t.cancelQueueElement(0, currentcityid, time, false);

				return;
			};
			if (isNaN(curlvl)) {
				t.cancelQueueElement(0, currentcityid, time, false);

				return;
			}
			if (l_bdgid != bdgid) {
				t.cancelQueueElement(0, currentcityid, time, false);

				return;
			}
			if (l_bid != bid) {
				t.cancelQueueElement(0, currentcityid, time, false);

				return;
			}
			if (l_curlvl < curlvl) {
				t.cancelQueueElement(0, currentcityid, time, false);

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
							Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
							if (params.cid == unsafeWindow.currentcityid)
								unsafeWindow.update_bdg();
							t.cancelQueueElement(0, currentcityid, time, false);
							msg = 'A Builing has been destroyed in:<b>'+Cities.byID[currentcityid].name+'</b> The building was: (<b>'+unsafeWindow.arStrings.buildingName['b'+bdgid]+'</b>)';
							Logbuch.eintrag(Logs.buildlog,msg);
							t.logbuch();
							saveLogs();							
						} else {
							var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
							t.requeueQueueElement(bQi);
							msg = 'Demolition fail!! <b>'+Cities.byID[currentcityid].name+'</b> (<b>'+unsafeWindow.arStrings.buildingName['b'+bdgid]+'</b>)<br><span class="boldRed">'+errmsg+'</span>';
							Logbuch.eintrag(Logs.buildlog,msg);
							t.logbuch();
							saveLogs();	

							t.errorcounter++;	
							if (!Tabs.Artefacts.started && 
									!Tabs.Artefacts.setstarted && 
									t.errorcounter >= 5) {
								msg = '<span class="boldRed">More then 5 Errors have occured during demolition, please refresh.</span>';
								Logbuch.eintrag(Logs.buildlog,msg);
								t.logbuch();
								saveLogs();	
								reloadGW();									
							}							
						}
					},
					onFailure: function(){
						document.getElementById('pbbuildError').innerHTML = "Demolition in action Please try again later.";
					}
				})
			}
			
			if (mode == 'build') {
				var invalid = false;
				var chk = unsafeWindow.checkreq("b", bdgid, curlvl);
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
						//logit("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!");
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
								t.cancelQueueElement(0, currentcityid, time, false);
								msg = 'In <b>'+Cities.byID[currentcityid].name+'</b> the following building was built: (<b>'+unsafeWindow.arStrings.buildingName['b'+bdgid]+'</b> Level <b>'+params.lv+'</b>)';
								Logbuch.eintrag(Logs.buildlog,msg);
								t.logbuch();
								saveLogs();
								if (document.getElementById('pbHelpRequest').checked == true) {
									try {
										t.bot_gethelp(params.bid, currentcityid);
									} catch (e) {
										msg = '<span class="boldRed">Unable to POST help request!</span>';
										Logbuch.eintrag(Logs.buildlog,msg);
										Logbuch.eintrag(Logs.buildlog,e.name +' : '+ e.message +' : Sira:'+e.lineNumber);
										t.logbuch();
										saveLogs();
									}
								}								
							} else {
								var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
								t.requeueQueueElement(bQi);
								msg = 'Construction FAILED in <b>'+Cities.byID[currentcityid].name+'</b> (<b>'+unsafeWindow.arStrings.buildingName['b'+bdgid]+'</b> Level <b>'+params.lv+'</b>)<br><span class="boldRed">'+errmsg+'</span>';
								Logbuch.eintrag(Logs.buildlog,msg);
								t.logbuch();
								saveLogs();									

								t.errorcounter++;	
								if (!Tabs.Artefacts.started && 
										!Tabs.Artefacts.setstarted && 
										t.errorcounter >= 5) {
									msg = '<span class="boldRed">More than 5 error has occurred during Auto-Building Process.REFRESH PAGE</span>';
									Logbuch.eintrag(Logs.buildlog,msg);
									t.logbuch();
									saveLogs();	
									reloadGW();									
								}
								
							}
						},
						onFailure: function(){
							document.getElementById('pbbuildError').innerHTML = "Construction in action Please try again later. Connection Error Has Occurred.";
						}
					});
				} else {
					t.requeueQueueElement(bQi);
				}
			}
		} else {
			t.cancelQueueElement(0, currentcityid, time, false);
		
		}
	},

	logbuch: function() {
    var t = Tabs.build;
		var log = Logbuch.ausgabe(Logs.buildlog);
		document.getElementById('pbbuildlog').innerHTML = log;
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
		t.cancelQueueElement(0, cityId, buildingTime, false);
	},
	
	show: function() {
		var t = Tabs.build;
	},
	
	bot_buildslot: function(c, a) {
		var t = Tabs.build;
		var cityId = t.getCurrentCityId();
		var buildingPos   = c;
		var buildingType  = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][0]);
		var buildingLevel = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
		var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
		var loaded_bQ = t["bQ_" + cityId];
		var buildingAttempts = 0;
		if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
			var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
		} else {
			var current_construction_pos = "";
		}

		if (loaded_bQ.length == 0 && current_construction_pos != "" ) {
			if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
		} else {
			if (current_construction_pos != "" && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
			for (var i = 0; i < loaded_bQ.length; i++) {
				var loadedCity = loaded_bQ[i].cityId;
				var loadedSlot = loaded_bQ[i].buildingPos;
				if (loadedSlot == buildingPos && loadedCity == cityId) {
					buildingLevel += 1;
				}
				if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) {
					t.modalmessage('Already have added during demolition');
					return;
				}
			}
		}	

		if (t.currentBuildMode == "build") {
			if (buildingLevel >= 9) {
				t.modalmessage('Level 10, and 11 buildings can only be built manually');
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
		if (!Seed.allianceDiplomacies.allianceId) return;
	  var a = qlist = Seed.queue_con["city" + currentcityid];
	  var e = 0;
	  var d = 0;
	  for (var c = 0; c < a.length; c++) {
			if (parseInt(a[c][2]) == parseInt(f)) {
				e = parseInt(a[c][0]);
				d = parseInt(a[c][1]);
				break;
			}
	  }
		b = [
			["REPLACE_LeVeLbUiLdInG", d],
			["REPLACE_BuIlDiNgNaMe", unsafeWindow.arStrings.buildingName['b'+ e]],
			["REPLACE_LeVeLiD", d],
			["REPLACE_AsSeTiD", f]
		];
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.level = d;
		params.id = f;
		params.name = unsafeWindow.arStrings.buildingName['b'+ e];
		params.type = "building";
		params.cid = currentcityid;	
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "sendAllianceHelpBuildMessage.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					var a = rslt.newChat;
					unsafeWindow.Chat.addToChat(a[0], a[1].comment, !0);
				} else {
					var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
					Logbuch.eintrag(Logs.buildlog,'Your help request has failed<br><span class="boldRed">'+errmsg+'</span>');
					t.logbuch();
					saveLogs();									
				}
			},
			onFailure: function () {}
		});
		unsafeWindow.common_postToProfile("95", b, null, "95_helpbuild");
	},
	
	addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
		var t = Tabs.build;
		var lbQ = t["bQ_" + cityId];
		lbQ.push({
			cityId: 					cityId,
			buildingPos:			buildingPos,
			buildingType: 		buildingType,
			buildingId: 			buildingId,
			buildingTime: 		buildingTime,
			buildingLevel: 		buildingLevel,
			buildingAttempts: buildingAttempts,
			buildingMult: 		buildingMult,
			buildingMode: 		buildingMode,
		});
		t.modifyTotalTime(cityId, 'increase', buildingTime);
	},
	
	modalmessage: function(message){
		var t = Tabs.build;
		unsafeWindow.Modal.showAlert(message);
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
	},
	
	onUnload: function(){
		var t = Tabs.build;
		for (var i = 0; i < Cities.cities.length; i++) {
			GM_setValue('bQ_' + getServerId() + '_' + unsafeWindow.g_ajaxsuffix.substr(3)+"_"+ Cities.cities[i].id, JSON2.stringify((t["bQ_" + Cities.cities[i].id])));
		}
		t.saveBuildStates();
	},
	
	_addTab: function(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode) {
		var t = Tabs.build;
		var row = document.getElementById('pbCityQueueContent').insertRow(0);
		row.vAlign = 'top';
		row.insertCell(0).innerHTML = queueId;
		if (buildingMode == "destruct") {
			row.insertCell(1).innerHTML = 'Demolition';
		} else {
			row.insertCell(1).innerHTML = 'Building';
		}
		row.insertCell(2).innerHTML = unsafeWindow.arStrings.buildingName['b'+buildingType];
		row.insertCell(3).innerHTML = timestr(buildingTime);
		if (buildingMode == "destruct") {
			row.insertCell(4).innerHTML = 0;
		} else {
			row.insertCell(4).innerHTML = buildingLevel + 1;
		}
		row.insertCell(5).innerHTML = buildingAttempts;
		row.insertCell(6).innerHTML = '<input type=button id="queuecancel_' + queueId + '" value="CANCELLED">';
		document.getElementById('queuecancel_' + queueId).addEventListener('click', function(){
			t.cancelQueueElement(queueId, cityId, buildingTime, true);
		}, false);
	},
	
	cancelQueueElement: function(queueId, cityId, buildingTime, showQueue){
		var t = Tabs.build;
		var queueId = parseInt(queueId);
		t["bQ_" + cityId].splice(queueId, 1);
		t.modifyTotalTime(cityId, 'decrease', buildingTime);
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
			t.popBuildQueue = new CPopup('pbbuild_' + cityId, 0, 0, 450, 500, true, function() {clearTimeout (t.timer);});
		}
		var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE width="100%" id="pbCityQueueContent">';       
		t.popBuildQueue.getMainDiv().innerHTML = m+ '</table></div>';
		t.popBuildQueue.getTopDiv().innerHTML = '<TD width="200px">&nbsp;<B>Construction Sequence: ' + cityName + '</b></td><TD>&nbsp;<INPUT id=pbOptimizeByTime type=submit value="Sort by Time"></td>';
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
	
	getCurrentCityId: function(){
		if (!unsafeWindow.currentcityid)
			return null;
		return unsafeWindow.currentcityid;
	},
	
	saveBuildStates: function(){
		var t = Tabs.build;
		var serverID = getServerId();
		GM_setValue('buildStates_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(t.buildStates));
	},
	
	readBuildStates: function(){
		var t = Tabs.build;
		var serverID = getServerId();
		s = GM_getValue('buildStates_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
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
			obj.value = "AUTO-Building=OFF";
		} else {
			t.buildStates.running = true;
			t.saveBuildStates();
			obj.value = "AUTO-Building=ON";
		}
	},
	
	toggleStateMode: function(obj){
		var t = Tabs.build;
		if (obj.value == 'Construction-Queue=OFF') {
			unsafeWindow.Building.buildSlot = t.bot_buildslot;
			unsafeWindow.Building.buildMenu = t.bot_buildslot;
			obj.value = "Construction-Queue=ON";
		} else {
			unsafeWindow.Building.buildSlot = t.koc_buildslot;
			unsafeWindow.Building.buildMenu = t.koc_buildmenu;
			obj.value = "Construction-Queue=OFF";
		}
	},
	
	getCityNameById: function (cityId) {
		return Cities.byID[cityId].name;  	
	},
}			

/****************************  Player Tab  ******************************/
Tabs.Player = {
  tabOrder : 8,
  tabLabel : 'Player',
  cont : null,
  TabDisabled : !ENABLE_PLAYER,
  dat : [],



fetchTEST : function (pageNum, notify){    
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
    var t = Tabs.Player;
    t.cont = div;
	var out = [];
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');	
		out.push('<b>Player Search</b>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		out.push('<table class="ptTab" width="100%">');
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Aranilan:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');
		out.push(htmlSelector ({'u':'Search Radius','s':'Search Sector','g':'Entire Map'}, Options.pbsearchtype, 'id="ptsearchtype"'));
		out.push('&nbsp;<span id="ptsearchhint"></span>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Arama Centeri:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push('<input id="ptsearchx" type="text" size="2" maxlength="3" style="text-align: center;">');		
		out.push(' / ');
		out.push('<input id="ptsearchy" type="text" size="2" maxlength="3" style="text-align: center;">');		
		out.push('&nbsp;Cities:');
		for(var i=0; i<Cities.numCities; i++) {
			out.push('&nbsp;<input id="ptcity'+i+'" type="submit" name="c'+i+'" value="'+(i+1)+'" title="'+Cities.cities[i].name+'" style="padding-left:2px;padding-right:2px;">');
		}
		out.push('&nbsp;&nbsp;<b><span id="ptsearchcityhint"></span></b></td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Arama Mesafesi:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push('<input id="ptsearchradius" type="text" size="2" maxlength="3" style="text-align: center;">&nbsp;(20 - 100)');		
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Province:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push(htmlSelector (t.sectors, Options.pbsearchsector, 'id="ptsearchsector"'));		
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td colspan="2">');
		out.push('<br><input id="ptsearchbutton" type="submit" name="search" value="Search"><br><br>');
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td colspan="2">');
		out.push('<div id="ptsearchlog" style="height:70px; overflow:auto;"></div>');
		out.push('</td>');
		out.push('</tr>');			
		out.push('</table>');		
		out.push('<hr>');			
		out.push('<div id="ptsearchstat"></div>');				
		out.push('<hr>');	
		out.push('<div style="text-align:center;">');
		out.push('<input id="ptsearchterror" type="submit" name="terror" value="Terorist Kamplarini SHOW">&nbsp;&nbsp;&nbsp;');
		out.push('<input id="ptsearchwild" type="submit" name="wild" value="Arazileri SHOW">&nbsp;&nbsp;&nbsp;');
		out.push('<input id="ptsearchcity" type="submit" name="city" value="Citiesi SHOW">');
		// out.push('<input id="ptsearchuanda" type="submit" name="uanda" value="General & Alliance">');
		out.push('</div>');
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
    var t = Tabs.Player;
    if (t.state == null){
      if (getMyAlliance()[0] == 0) {
        t.cont.innerHTML = '<BR><BR><CENTER>You must be a member of the Alliance in order to use this feature ..</center>';
        t.state = 1;
        return;
      }
      var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\
          <TR><TD class=xtab align=right></td><TD class=xtab>General Name&nbsp;</td>\
            <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Search" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
          <TR><TD class=xtab></td><TD class=xtab> Alliance Name: &nbsp;</td>\
            <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Search" /></td>\
           <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
           <TR><TD class=xtab></td><TD class=xtab> &nbsp;\</td>\
           <TD class=xtab><INPUT align=right id=idMyAllSubmit type=submit value="'+ getMyAlliance()[1] +'"/>\
           </tr>\
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
    var t = Tabs.Player;
    document.getElementById('ptplayErr').innerHTML='';
    var name = document.getElementById('allPlayName').value;
    t.pName = name;
    if (name.length < 3){
      document.getElementById('ptplayErr').innerHTML = 'To search entries should be made at least 3 characters';
      return;
    }
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching For......</center>';
    t.fetchPlayerList (name, t.eventGotPlayerList);
  },
  
  eventGotPlayerList : function (rslt){
    var t = Tabs.Player;
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
    var t = Tabs.Player;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>Showing General: <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=100% align=center class=ptTab cellspacing=5>\
	  <TR style="font-weight:bold">\
	  <TD width=25%>Player Name</td><TD align=right width=15%>Power</td><TD width=15%> &nbsp; Online</td><TD width=75%>Overview</td></tr>';
	  
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
	  <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A style="color:#1D0AF2">Details</a> &nbsp; <BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A style="color:#1D0AF2">Last login:</a></span></td></tr>';
    }
    m += '</table></div>';
    document.getElementById('allListOut').innerHTML = m;
  },
  clickedPlayerDetail : function (span, uid){
    var t = Tabs.Player;
    span.onclick = '';
    span.innerHTML = "Loading...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },
  clickedPlayerLocator : function (span, uid){
    var t = Tabs.Player;
    t.fetchPlayerInfo2 (uid, function (r) {t.gotPlayerInfo2(r, span)});
  },  
  clickedPlayerGetLastLogin : function (span, uid){
     var t = Tabs.Player;
     span.onclick = '';
     span.innerHTML = "Loading...";
     t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
   },
  gotPlayerInfo2 : function (rslt, span) {
  var t = Tabs.Player;
      if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Lider Panosu:</b> Bulunamadi (Siste??)';
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
      var t = my.Player;
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
    var t = Tabs.Player;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var u = rslt.userInfo[0];
    var a = 'None';
    if (u.allianceName)
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD>Alliance: '+ a +' &nbsp; Cities: '
          + u.cities +' &nbsp; Nufusu: '+ u.population +'</td></tr><TR><TD>Province: ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  eventMyAllianceSubmit : function (){
    var t = Tabs.Player;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching  ...</center>';
    t.fetchAllianceMemberList (getMyAlliance()[0], null, t.eventGotMemberList);
  },  
    
  aName : '',
  eventSubmit : function (){
    var t = Tabs.Player;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = 'Must be at least 3 Characters.!!';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching  ...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },

  showMyAlliance : function (){
    var t = Tabs.Player;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> ...</center>';
    if (myA[0]!=0  ) {
       t.eventGetMembers(myA[0]);
    }
    else {
       document.getElementById('allListOut').innerHTML = 'To use this feature must be members of the Alliance';
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
    var t = Tabs.Player;
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
    var t = Tabs.Player;
    function combineResults (rsltA, rsltM, notify){
      if (!rsltA.ok){
        if (rsltA.msg.indexOf("To use this feature must be members of the Alliance")!=0 || !rsltM.ok){
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

  fetchOtherAllianceInfo : function (pageNum, notify){    
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

  fetchPlayerList : function (name, notify){  
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
        var t = my.Player;
        span.onclick = '';
        span.innerHTML = "Araniyor ...";
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
        var t = Tabs.Player;
        if (!rslt.ok){
          span.innerHTML = rslt.errorMsg;
          return;
        }
    
        var p = rslt.playerInfo;
        var lastLogin = rslt.playerInfo.lastLogin;
    
        if (lastLogin) {
          m = '<span style="color:black">Last Login: '+lastLogin+'</span>';
        } else {
           m = '<span style="color:red">Last Login: '+lastLogin+'</span>';
        }
        span.innerHTML = m + '';
      },
	    displayPlayer : function (allName,rslt){
    var t = Tabs.Player;
    function alClickSort (e){
      var t = Tabs.Player;
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
            .clickableSel{background-color:#AFF;}\
            .xxtab{background-color:none; padding-left:5px; padding-right:5px;} </style>\
            <DIV class=ptstat ><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab>Alliance: '+ allName +'</td>\
            <TD class=xtab width=80% align=center>Last login: <SPAN id=lastlogin>'+  rslt.playerInfo.lastLogin+'</span></td><TD class=xtab align=right></td></tr></table></div>\
            <div style="max-height:470px; height:470px; overflow-y:auto;"><TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD style="overflow-y:hidden;">\
            <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Oyuncu</div></a></td>\
            <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Power</a></div></td>\
            <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Cities</a></div></td>\
            <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Order</a></div></td>\
            <TD id=clickCol9 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>CEVRIMICI</a></div></td>\
            <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>City Ismi</a></div></td>\
            <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Level</a></div></td>\
            <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coordinate</a></div></td>\
            <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Mesafe</a></div></td>\
            <TD id=clickCol10 onclick="PTalClickSort(this)" class=clickable><A><DIV>Mesafe Hsp.</a></div></td>\
		    <TD class=clickable><A><DIV>Last Login</a></div></td></tr></thead>\
            <TBODY id=allBody style="background-color:#ffffff;"></tbody></table></div>\
            <DIV  width:100%; style="top:670px; left:0px; position:absolute; background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">';
    document.getElementById('allListOut').innerHTML = m;  //style="top:670px; left:0px; position:absolute;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Distance Calculation:: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> &nbsp; OR, City Selection:: <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';
    t.reDisp();
 //   new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
  //  document.getElementById('idFindETASelect').disabled = false;
  },
  
  reDisp : function (){
    var t = Tabs.Player;
    function sortFunc (a, b){
      var t = Tabs.Player;
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
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed><blink>Online</blink></span>":"") +'</td>\
          <div style="width:100%;filter:Glow(color=#F20A15, strength=12)">\
		  <TD align=center><A style="color:#1D0AF2" target="_tab" href="http://www.facebook.com/profile.php?id='+ u.Fbuid +'">Facebook Profile</a></div></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A style="color:#1D0AF2">Detail</a> &nbsp; <BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A style="color:#1D0AF2">Last Login</a></span></td></tr>';
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

/*********************************** Training Tab ***********************************/
Tabs.Train = {
  tabOrder : 5,
	tabLabel: 'Train',
  cont : null,
  tabDisabled : !ENABLE_TRAIN,
	id : {},
	uu: {
		'u1'  : 'Supply Truck',
		'u5'  : 'Infantry',	
		'u6'  : 'K.Sniper',		
		'u4'  : 'Anti-Tank',
		'u18' : 'Special Forces',
		'u7'  : 'Mobile SAM',
		'u8'  : 'Tank',
		'u17' : 'Predator Drone',
		'u9'  : 'Supply Chopper',
		'u11' : 'Gunship',		
		'u10' : 'Fighter',
		'u12' : 'Bomber',
		'u19' : 'Cargo Plane',	
		'u16' : 'Hellfire',		
		'u13' : 'Stealth Bomber',
		'u15' : 'Nuke',
		'u20' : 'ION',
		'u21' : 'Elite Mobile SAM',
		'u24' : 'Elite Gunship',
		'f53' : 'Mine',
		'f52' : 'Stringer',
		'f54' : 'Artillery',
		'f55' : 'AA Guns',
		'f56' : 'Railguns',
		'f57' : 'Laser Turrets',			
	},
	trData : unsafeWindow.trainingData,
	foData : unsafeWindow.fortifyingData,
	gr : {},
	trainqueue : [],
	
  init : function (div) {
    var t = Tabs.Train;
		t.cont = div;
		var out = [];
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');	
		out.push('<b>Military Unit and Defense Training Menu</b>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		out.push('<b>INFORMATION:</b> GREEN = These units can be built, RED = you do not meet the necessary requirements (building, research, etc.), Blue = You have the reached the maximum levels of defense.');		
		out.push('<br><br>');	
		out.push('<table class="ptTrain" style="border:1px solid silver; border-collapse:collapse;">');
		out.push('<tr>');
		out.push('<td style="border-right:1px solid silver;border-left:1px solid silver;">&nbsp;</td>');
	  for (var i=0; i<Cities.cities.length; i++) {
			out.push('<td style="text-align:center;border-right:1px solid silver;">&nbsp;<br><b>' + Cities.cities[i].name + '</b></td>');
    }
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td style="border-right:1px solid silver;border-left:1px solid silver;">&nbsp;</td>');
	  for (var i=0; i<Cities.cities.length; i++) {
			out.push('<td style="text-align:center;border-right:1px solid silver;">');
			if (!Options.pbtrain['c'+i]) Options.pbtrain['c'+i] = 0;
			if (Options.pbtrain['c'+i] == 0) {
				out.push('&nbsp;<input type="submit" id="pttc'+i+'" value=" OFF ">&nbsp;');
			} else {
				out.push('&nbsp;<input type="submit" id="pttc'+i+'" value=" ON ">&nbsp;');			
			}
			out.push('<br>&nbsp;</td>');
    }
		out.push('</tr>');		
		

		for (var unit in t.uu) {
			var u = t.uu[unit];
			if (unit == 'f53') {
				out.push('<tr><td  style="border-right:1px solid silver;border-left:1px solid silver;" colspan="'+(Cities.cities.length+1)+'">&nbsp;</td></tr>');
			}
			out.push('<tr>');	
			out.push('<td style="border-right:1px solid silver;border-left:1px solid silver;"><b>'+u+':</b>&nbsp;&nbsp;</td>');
			for (var i=0; i<Cities.cities.length; i++) {
				out.push('<td style="text-align:center;border-right:1px solid silver;">');
				out.push('&nbsp;<input type="text" id="pttc'+(i)+(unit)+'" value="" style="width:50px; text-align:center;">&nbsp;');
				out.push('</td>');				
			}
			out.push('</tr>');			
		}
		out.push('</table>');	
		out.push('<hr>');

		out.push('<table width="100%">');
		out.push('<tr>');
		out.push('<td><b>Department of Defense Monitoring:</b><br><br></td>');
		out.push('<td style="text-align: right;">');
		out.push('<input id="ptButClearTRLog" type="submit" name="ClearTRLog" value="CLEAR">');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td colspan="2">');
		out.push('<div id="pttrainlog" style="height: 120px; overflow: auto;">');
		out.push('</div>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');		
		t.cont.innerHTML = out.join('');		

	  for (var i=0; i<Cities.cities.length; i++) {
			t.id['pttc'+i] = document.getElementById('pttc'+i);
			t.id['pttc'+i].addEventListener('click', function(){
				var city = this.id.substr(-1);
				if (Options.pbtrain['c'+city] == 0) {
					Options.pbtrain['c'+city] = 1;
					this.value = " ON ";
					Logbuch.eintrag(Logs.trainlog, 'Auto Training ON City: <b>'+Cities.cities[city].name+'</b> ACTIVE');
					t.id.pttrainlog.innerHTML = Logbuch.ausgabe(Logs.trainlog);							
				} else {
					Options.pbtrain['c'+city] = 0;
					this.value = " OFF ";	
					Logbuch.eintrag(Logs.trainlog, 'Auto Training OFF City: <b>'+Cities.cities[city].name+'</b> PASSIVE');
					t.id.pttrainlog.innerHTML = Logbuch.ausgabe(Logs.trainlog);							
				}
				saveOptions();
			},false);
		}
		for (var unit in t.uu) {
			var u = t.uu[unit];		
			for (var i=0; i<Cities.cities.length; i++) {		
				t.id['pttc'+(i)+(unit)] = document.getElementById('pttc'+(i)+(unit));
				t.changeOpt(t.id['pttc'+(i)+(unit)], 'c'+(i)+(unit));
			}
		}
		t.id.pttrainlog = document.getElementById('pttrainlog');	
		t.id.pttrainlog.innerHTML = Logbuch.ausgabe(Logs.trainlog);		
		t.id.ptButClearTRLog = document.getElementById('ptButClearTRLog');
		t.id.ptButClearTRLog.addEventListener('click', t.ClearTRLog, false);	
		
		t.greenred();
		setInterval(t.training, 10000);
		setInterval(t.gotrain, 3000);		
	},

  hide : function (){
  },

  show : function (){
	},

  changeOpt : function (valueId, optionName){
    var t = Tabs.Train;
    var e = valueId;
		if (!Options.pbtrain[optionName]) Options.pbtrain[optionName] = 0;
    e.value = parseInt(Options.pbtrain[optionName]);
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
			this.value = parseIntNan(this.value);
      Options.pbtrain[optionName] = this.value;
      saveOptions();			
    }
  },
	
	ClearTRLog : function () {
		var t = Tabs.Train;
		Logs.trainlog = [];
		t.id.pttrainlog.innerHTML = Logbuch.ausgabe(Logs.trainlog);		
		saveLogs();
	},

	greenred : function() {
	  var t = Tabs.Train;	

	  var plevel = parseInt(Seed.player.title);
		var countcities = Cities.cities.length;
		for (var i = 0; i < Cities.cities.length; i++) {
			var cid = Cities.cities[i].id;
			var building = {};
			for (var unit in t.uu) {
				var ok = true;	
				if (unit.substr(0,1) == "u") {

					var bs = t.trData[unit].r[0].r1;
					for (var b in bs) {
						var reqLevel = parseInt(bs[b][1]);
						if (!building[b]) {
							var aktLevel = getCityBuilding(cid, b.substr(1));
							building[b] = parseInt(aktLevel.maxLevel);
						}
						if (reqLevel > building[b]) ok = false;
					}

					var ts = t.trData[unit].r.r2;					
					for (var te in ts) {	
						var reqLevel = parseInt(ts[te][1]);
						if (reqLevel > parseInt(Seed.tech['tch'+te.substr(1)])) ok = false;
					}

					if (t.trData[unit].r[0].r11.p2) {
						var pl = t.trData[unit].r[0].r11.p2[1];
						if (pl > plevel) ok = false;
					}

					if (t.trData[unit].r[0].r11.p3) {
						var st = t.trData[unit].r[0].r11.p3[1];	
						if (st > countcities) ok = false;
					}
					
					
					if (t.trData[unit].r[0].r8.i1401) {
						var st = t.trData[unit].r[0].r8.i1401[1];	
						if (!Seed.items.i1401 || st > Seed.items.i1401) ok = false;
					}
					

					if (t.trData[unit].r[0].r8.i1402) {
						var st = t.trData[unit].r[0].r8.i1402[1];	
						if (!Seed.items.i1402 || st > Seed.items.i1402) ok = false;
					}					
					

					if (t.trData[unit].r[0].r8.i1403) {
						var st = t.trData[unit].r[0].r8.i1403[1];	
						if (!Seed.items.i1403 || st > Seed.items.i1403) ok = false;
					}
					
				} else {

					var bs = t.foData[unit].r[0].r1;
					for (var b in bs) {
						var reqLevel = parseInt(bs[b][1]);
						if (!building[b]) {
							var aktLevel = getCityBuilding(cid, b.substr(1));
							building[b] = parseInt(aktLevel.maxLevel);
						}
						if (reqLevel > building[b]) ok = false;
					}
					
					var ts = t.foData[unit].r[0].r2;					
					for (var te in ts) {	
						var reqLevel = parseInt(ts[te][1]);
						if (reqLevel > parseInt(Seed.tech['tch'+te.substr(1)])) ok = false;
					}
					
					if (t.foData[unit].r[0].r11.p2) {
						var pl = t.foData[unit].r[0].r11.p2[1];
						if (pl > plevel) ok = false;
					}
					
					if (t.foData[unit].r[0].r11.p3) {
						var st = t.foData[unit].r[0].r11.p3[1];	
						if (st > countcities) ok = false;
					}					
				}

				if (ok === true) {
					t.gr['c'+(i)+(unit)] = true; 
					t.id['pttc'+(i)+(unit)].style.backgroundColor = '#ccffcc';
					t.id['pttc'+(i)+(unit)].style.border = '1px solid silver';					
				} else {
					t.gr['c'+(i)+(unit)] = false;
					t.id['pttc'+(i)+(unit)].style.backgroundColor = '#ffcccc';	
					t.id['pttc'+(i)+(unit)].style.border = '1px solid silver';							
				}
			}
			//    ?
			var slevel = building['b19'];
			var maxwall = unsafeWindow.Constant.Building.DEFENSE.WALL[slevel];
			var maxfield = unsafeWindow.Constant.Building.DEFENSE.FIELD[slevel];
			var maxcity = unsafeWindow.Constant.Building.DEFENSE.CITY[slevel];
			var curwall = parseInt(Seed.fortifications['city'+cid].fort53) + parseInt(Seed.fortifications['city'+cid].fort52);
			var curfield = parseInt(Seed.fortifications['city'+cid].fort54) + parseInt(Seed.fortifications['city'+cid].fort55);
			var curcity = parseInt(Seed.fortifications['city'+cid].fort56) + parseInt(Seed.fortifications['city'+cid].fort57);

			if (maxwall <= curwall) {
				if (t.gr['c'+(i)+'f52'] === true) {
					t.gr['c'+(i)+'f52'] = false;
					t.id['pttc'+(i)+'f52'].style.backgroundColor = '#ccccff';			
				}
				if (t.gr['c'+(i)+'f53'] === true) {				
					t.gr['c'+(i)+'f53'] = false;
					t.id['pttc'+(i)+'f53'].style.backgroundColor = '#ccccff';	
				}
			}
			if (maxfield <= curfield) {
				if (t.gr['c'+(i)+'f54'] === true) {
					t.gr['c'+(i)+'f54'] = false;
					t.id['pttc'+(i)+'f54'].style.backgroundColor = '#ccccff';	
				}
				if (t.gr['c'+(i)+'f55'] === true) {
					t.gr['c'+(i)+'f55'] = false;
					t.id['pttc'+(i)+'f55'].style.backgroundColor = '#ccccff';
				}
			}	
			if (maxcity <= curcity) {
				if (t.gr['c'+(i)+'f56'] === true) {
					t.gr['c'+(i)+'f56'] = false;
					t.id['pttc'+(i)+'f56'].style.backgroundColor = '#ccccff';	
				}
				if (t.gr['c'+(i)+'f57'] === true) {					
					t.gr['c'+(i)+'f57'] = false;
					t.id['pttc'+(i)+'f57'].style.backgroundColor = '#ccccff';
				}
			}						
		}
	},
	
	training : function() {
    var t = Tabs.Train;
		t.greenred();
		var now = unixTime();

		for (var i = 0; i < Cities.cities.length; i++) {

			if (Options.pbtrain['c'+i] == 0) continue;
			

			var walkingU = false;
      var q = Seed.training_queue['c'+Cities.cities[i].id]; 
      for (qs in q) {
				qe = q[qs];
				if (parseInt(qe.status) != 0 && parseInt(qe.eta) > now) {
					walkingU = true;
					break;
				}
			}	

			var walkingF = false;
      var q = Seed.fortify_queue['c'+Cities.cities[i].id]; 
      for (qs in q) {
				qe = q[qs];
				if (parseInt(qe.status) != 0 && parseInt(qe.eta) > now) {
					walkingF = true;
					break;
				}
			}
			
			
			for (var unit in t.uu) {
				if (t.gr['c'+(i)+(unit)] === false) continue;
				var anzahl = Options.pbtrain['c'+(i)+(unit)];
				if (anzahl == 0) continue;
				
				if (unit.substr(0,1) == "u") {
					if (walkingU === false) {
						t.trainqueue.push({
							'cid' : Cities.cities[i].id,
							'type' : unit,
							'quant' : anzahl,
							'start' : now,
						});
					}
				} else {
					if (walkingF === false) {
						t.trainqueue.push({
							'cid' : Cities.cities[i].id,
							'type' : unit,
							'quant' : anzahl,
							'start' : now,
						});					
					}				
				}
			}
		}
	},

	gotrain : function() {
    var t = Tabs.Train;
		var now = unixTime();
		if (t.trainqueue.length > 0) {
			
			var train = t.trainqueue.shift();
			
			if ((train.now + 60) < now) return;
			
			var UorF = train.type.substr(0,1);
			


			if (UorF == 'u') {
				var cost = t.trData[train.type].c;	
				var food = parseInt(Seed.resources['city'+ train.cid]['rec1'][0] / 3600);
				if (food < (cost[1] * train.quant + 1000000)) return;
				var oil = parseInt(Seed.resources['city'+ train.cid]['rec2'][0] / 3600);
				if (oil < (cost[2] * train.quant + 1000000)) return;	
				var stone = parseInt(Seed.resources['city'+ train.cid]['rec3'][0] / 3600);
				if (stone < (cost[3] * train.quant + 1000000)) return;	
				var steel = parseInt(Seed.resources['city'+ train.cid]['rec4'][0] / 3600);
				if (steel < (cost[4] * train.quant + 1000000)) return;
				var titan = parseInt(Seed.resources['city'+ train.cid]['rec5'][0] / 3600);
				if (titan < (cost[5] * train.quant)) return;	
				var graphen = parseInt(Seed.resources['city'+ train.cid]['rec6'][0] / 3600);
				if (graphen < (cost[6] * train.quant)) return;	
				var uran = parseInt(Seed.resources['city'+ train.cid]['rec7'][0] / 3600);
				if (uran < (cost[7] * train.quant)) return;	
				var diamonds = parseInt(Seed.resources['city'+ train.cid]['rec8'][0] / 3600);
				if (diamonds < (cost[8] * train.quant)) return;
				var population = parseInt(Seed.citystats["city" + train.cid]["pop"][0]);
				var worker = parseInt(Seed.citystats["city" + train.cid]["pop"][3]);		
				if ((population - worker) < (cost[9] * train.quant)) return;
			} else {
				var cost = t.foData[train.type].c;				
				var food = parseInt(Seed.resources['city'+ train.cid]['rec1'][0] / 3600);
				if (food < (cost[1] * train.quant + 1000000)) return;
				var oil = parseInt(Seed.resources['city'+ train.cid]['rec2'][0] / 3600);
				if (oil < (cost[2] * train.quant + 1000000)) return;	
				var stone = parseInt(Seed.resources['city'+ train.cid]['rec3'][0] / 3600);
				if (stone < (cost[3] * train.quant + 1000000)) return;	
				var steel = parseInt(Seed.resources['city'+ train.cid]['rec4'][0] / 3600);
				if (steel < (cost[4] * train.quant + 1000000)) return;
				var titan = parseInt(Seed.resources['city'+ train.cid]['rec5'][0] / 3600);
				if (titan < (cost[5] * train.quant)) return;	
				var graphen = parseInt(Seed.resources['city'+ train.cid]['rec6'][0] / 3600);
				if (graphen < (cost[6] * train.quant)) return;	
				var uran = parseInt(Seed.resources['city'+ train.cid]['rec7'][0] / 3600);
				if (uran < (cost[7] * train.quant)) return;	
				var diamonds = parseInt(Seed.resources['city'+ train.cid]['rec8'][0] / 3600);
				if (diamonds < (cost[8] * train.quant)) return;			
			}

			if (UorF == 'u') {
				var tid = 0;
				var q = Seed.training_queue['c'+train.cid]; 
				for (var qs in q) {
					var qe = q[qs];
					if (parseInt(qe.status) == 0 && parseInt(qe.eta) <= now) {
						tid = qe.id;
						break;
					}
				}	
				if (tid == 0) return;
				train.tid = tid;
			} else {
				var fid = 0;
				var q = Seed.fortify_queue['c'+train.cid]; 
				for (var qs in q) {
					var qe = q[qs];
					if (parseInt(qe.status) == 0 && parseInt(qe.eta) <= now) {
						fid = qe.id;
						break;
					}
				}	
				if (fid == 0) return;	
				train.fid = fid;				
			}

		
			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			params.cid = train.cid;
			params.type = train.type.substr(1);
			params.quant = train.quant;
			params.items = 0;
			if (UorF == 'u') { 
				params.tid = train.tid;
				var ajaxfile = 'train.php';
			} else {
				params.fid = train.fid;			
				var ajaxfile = 'fortify.php';			
			}
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + ajaxfile + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					if (rslt.ok) { 
						
						if (UorF == 'u') { 
							var q = Seed.training_queue['c'+params.cid]['t'+params.tid];
							q.eta = parseInt(rslt.initTS, 10) + parseInt(rslt.timeNeeded, 10);
							q.needed = rslt.ticksNeeded;
							q.progress = 0;
							q.quant = params.quant;
							q.status = rslt.status;
							q.ticker = rslt.initTS;
							q.type = params.type;

							Logbuch.eintrag(Logs.trainlog, 'Trained Unit <b>'+Cities.byID[params.cid].name+'</b> Begin (<b>'+addCommas(params.quant)+' '+t.uu['u'+params.type]+', '+timestr(parseInt(rslt.timeNeeded, 10))+'</b>)');
						} else {
							var q = Seed.fortify_queue['c'+params.cid]['f'+params.fid];
							q.eta = parseInt(rslt.initTS, 10) + parseInt(rslt.timeNeeded, 10);
							q.needed = rslt.ticksNeeded;
							q.progress = 0;
							q.quant = params.quant;
							q.status = rslt.status;
							q.ticker = rslt.initTS;
							q.type = params.type;	

							Logbuch.eintrag(Logs.trainlog, 'Produced Defense Unit <b>'+Cities.byID[params.cid].name+'</b> Begin (<b>'+addCommas(params.quant)+' '+t.uu['f'+params.type]+', '+timestr(parseInt(rslt.timeNeeded, 10))+'</b>)');
						}
						t.id.pttrainlog.innerHTML = Logbuch.ausgabe(Logs.trainlog);							
					} else {
						var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
						var e = '<span class="boldRed">'+errorcode+'</span>';

						if (UorF == 'u') { 
							Logbuch.eintrag(Logs.trainlog, 'Training Error: <b>'+Cities.byID[params.cid].name+'</b> (<b>'+addCommas(params.quant)+' '+t.uu['f'+params.type]+'</b>)<br>'+e);
						} else {
							Logbuch.eintrag(Logs.trainlog, 'Produced Defense Unit Error: <b>'+Cities.byID[params.cid].name+'</b> (<b>'+addCommas(params.quant)+' '+t.uu['f'+params.type]+'</b>)<br>'+e);
						}
						t.id.pttrainlog.innerHTML = Logbuch.ausgabe(Logs.trainlog);								
					}
				},
				onFailure: function () {}
			});
	
		}
	},
}

/*********************************** Options Tab ***********************************/
Tabs.Options = {
  tabOrder : 10,
	tabLabel: 'Options',
  cont : null,
	displayTimer : null,
  tabDisabled : !ENABLE_OPTIONS,
	
  init : function (div){
	  var t = Tabs.Options;
    t.cont = div;
    var m = '<table class="ptTab ptStat" width="100%"><tr><td style="text-align:center;"><b>SETTINGS</b></td></tr></table><br><table class="ptTab"><tr><table class="ptTab ptStat" width="100%"><tr><td style="text-align:center;"></td><td></td></tr></table><br><table class="ptTab"></tr><tr><td><input id="ptAllowWinMove" type="checkbox" /></td><td>Moveable Windows</td></tr><tr><td><input id="ptahelpenable" type="checkbox" /></td><td>Automatically click help links</td></tr><tr><td><input id="ptahelphide" type="checkbox" /></td><td>Hides and Helps Automated Help Requests Posted To Alliance ..</td></tr><tr><td><input id="ptrmmotdEnable" type="checkbox" /></td><td>Hide MOTD</td></tr><tr><td><input id="pticonsEnable" type="checkbox" /></td><td>Hides events and other icons on the left side ..</td></tr>        <tr><td><input id="ptgoldenable" type="checkbox" /></td><td>Auto Gold Collect.. <input id="ptgoldLimit" type="text" size="2" maxlength="3" style="text-align: center;" > % </td></tr><tr><td><input id="ptoilenable" type="checkbox" /></td><td>Auto Oil Collect..</td></tr><tr><td><input id="ptfoodenable" type="checkbox" /></td><td>Auto Food Collect</td></tr><tr><td><input id="ptnukeenable" type="checkbox" /></td><td>Auto WarHead Collect</td></tr><tr><td><input id="ptlauncherenable" type="checkbox" /></td><td>Auto Launch Vehicle Collect</td></tr><tr><td><input id="ptradarenable" type="checkbox" /></td><td>Auto Targeting Radar Crate Collect</td></tr><tr><td><input id="ptdailyenable" type="checkbox" /></td><td>Auto Collect Daily Bonus.</td></tr><tr><td><input id="ptgiftenable" type="checkbox" /></td><td>Auto Accept Gifts..</td></tr><tr><td><input id="ptfoodtoggle" type="checkbox" /></td><td>Food Alert..! (every 10 Minutes)</td></tr><tr><td><input id="pbChatREnable" type="checkbox" /></td><td>WideScreen </td></tr><tr><td><input id="pbEveryEnable" type="checkbox" /></td><td>Page Refresh Do NOT USE ON Google+</td><td>Page Refresh: <input id="pbeverymins" type="text" size="2" maxlength="3" style="text-align:center;"> minutes..</td></tr><tr><table class="ptTab ptStat" width="100%"><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td><a target=_blank href="http://www.userscripts.org/scripts/source/127452.user.js"><b><u>Anti-Sorrows FTB SUPERMAGIC CLICK HERE FOR SCRIPT UPDATES</b></a></u></td></tr></table><br><table class="ptTab"></tr><td colspan="2">&nbsp;</td></tr><tr><td colspan="2" style="text-align:right;"><input id="ptButDebug" type="submit" name="SEED" value="DEBUG"></td></tr></table><hr><table width="100%"><tr><td><b>FTB SUPERMAGIC Monitoring Menu</b><br><br></td><td style="text-align: right;"><input id="ptButClearGLog" type="submit" name="ClearELog" value="CLEAR"></td></tr><tr><td colspan="2"><div id="ptoptlog" style="height: 250px; overflow: auto;"></div></td></tr></table>';
		t.cont.innerHTML = m;
		
		t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
		t.togOpt ('ptahelpenable', 'pbahelpenable');
		t.togOpt ('ptahelphide', 'pbahelphide');			
		t.togOpt ('ptrmmotdEnable', 'pbrmmotdEnable', t.onoffMotd);
		t.togOpt ('pticonsEnable', 'pbiconsEnable', t.onoffIcons);
		//t.togOpt ('ptsoundoff', 'ptsoundoff', t.sound);		
		t.togOpt ('ptgoldenable', 'pbgoldenable');
		t.changeOpt ('ptgoldLimit', 'pbGoldLimit');
		t.togOpt ('ptoilenable', 'pboilenable');
		t.togOpt ('ptfoodenable', 'pbfoodenable');
		t.togOpt ('ptnukeenable', 'pbnukeenable');		
		t.togOpt ('ptlauncherenable', 'pblauncherenable');			
		t.togOpt ('ptradarenable', 'pbradarenable');		
		t.togOpt ('ptdailyenable', 'pbdailyenable');		
		t.togOpt ('ptgiftenable', 'pbgiftenable');		
		//t.togOpt ('ptitemuse', 'pbitemuse');				
        t.togOpt ('ptfoodtoggle', 'pbFoodAlert');
        t.togOpt ('pbChatREnable', 'pbChatOnRight');
        t.changeOpt ('pbeverymins', 'pbEveryMins' , RefreshEvery.setTimer);
        t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
		document.getElementById('ptButClearGLog').addEventListener('click', function (){t.ClearGLog()}, false);
		document.getElementById('ptButDebug').addEventListener('click', function (){debugWin.doit()}, false);	
		
		t.show();
	},

  hide : function (){
  },

  show : function (){
    var t = Tabs.Options;
 		clearTimeout (t.displayTimer);
		

		document.getElementById('ptoptlog').innerHTML = Logbuch.ausgabe(Logs.globallog);
		
		t.displayTimer = setTimeout(t.show, 10000);
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

	sound : function() {
		// if(Options.ptsoundoff) {
			// try {
				// unsafeWindow.bgMusic.setVolume(0);
				// var soundbutton = document.getElementById('btn-sound-toggle');
				// soundbutton.setAttribute('class', 'off');
			// } catch (e) {}
		// } else {
			// try {		
				// unsafeWindow.bgMusic.setVolume(100);
				// var soundbutton = document.getElementById('btn-sound-toggle');
				// soundbutton.setAttribute('class', '');				
			// } catch (e) {}				
		// }	
	},
	
	onoffMotd : function() {
		if(Options.pbrmmotdEnable) {
			document.getElementById('motd-widget').style.display = "none";
		} else {
			document.getElementById('motd-widget').style.display = "block";
		}
	},

	onoffIcons : function() {
		if(Options.pbiconsEnable) {
			document.getElementById('gw-notification').style.display = "none";
		} else {
			document.getElementById('gw-notification').style.display = "block";
		}
	},

	ClearGLog : function () {
		Logs.globallog = [];
		saveLogs();
		clearTimeout (Tabs.Options.displayTimer);
		Tabs.Options.show();
	},

}

/*********************************Generals tab*****************************************/
Tabs.Generals = {
  tabLabel : 'Generals',
  tabOrder : 11,
  cont : null,
  displayTimer : null,

  Generals : function (){
  },

  init : function (div){
    this.cont = div;
  },

  hide : function (){
    clearTimeout (Tabs.Generals.displayTimer);
  },
  
  show : function (){
    var rownum = 0;
    var t = Tabs.Generals;

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
//        <TD><SPAN class=ptStatLight>Power:</span> ' + addCommas(Seed.player.might) +'</td>\
//        <TD><SPAN class=ptStatLight>Alliance:</span> ' + getMyAlliance()[1] +'</td>\
//        <TD align=right><SPAN class=ptStatLight>Domain:</span> ' + unsafeWindow.domainName +'</td></tr></table></div>';
             
      str += "<DIV id=overMainDiv style='font-size:"+ Options.overviewFontSize +"px'><TABLE class=ptTabOverview cellpadding=0 cellspacing=0></td>";
      str += "<TD width=100><B>City names:"
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=100><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>' +"</td>";
      }
      str += "</tr><TD width=81>Gold:<BR>Tax:<BR>Revenue:<BR>Wages:<BR><BR><B>Resource(1%):<BR>Army(0.5%):<BR>Research(0.5%):<BR>Build(0.5%):</B>";
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
//        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
//		    if(castle == 11) castle = 12;
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
      Tabs.Generals.cont.innerHTML = str;
//DebugTimer.display ('Draw Generals');    
    } catch (e){
      Tabs.Generals.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);
	  },
};



/***********************************Info Tab*********************************************/

Tabs.Info = {
  tabLabel : 'Build Calcs',
  tabOrder : 12,
  cont : null,
  
  init : function (div){
    var t = Tabs.Info;
	t.cont = div;
    t.ThisMany = 1;
    t.TrainTimeRef = Options.pbTrainTimeRef;
    t.show(t.cont);
  },
  
  show : function (div){
    var t = Tabs.Info;

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
    <TD class=xtabby> L1 </td>\
    <TD class=xtabby> L2 </td>\
    <TD class=xtabby> L3 </td>\
    <TD class=xtabby> L4 </td>\
    <TD class=xtabby> L5 </td>\
    <TD class=xtabby> L6 </td>\
    <TD class=xtabby> L7 </td>\
    <TD class=xtabby> L8 </td>\
    <TD class=xtabby> L9 </td>\
    <TD class=xtabby> L10 </td>\
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


    m += '<DIV style="text-align:left;">';  
    m += '<span id="PeaceTimeDiv" style="text-align:right;"></span>';

    t.cont.innerHTML = m +'</div>';   
    t.MakePeaceTime();
    
    // redraw the screen with new values for time/number of troops
    function ChangeNumber(){
        var t = Tabs.Info;
        t.ThisMany = document.getElementById('pdTroopCount').value;
        t.TrainTimeRef = document.getElementById('pdTruckBuildTime').value;
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



/*******************   Chat tab ****************/
Tabs.Chat = {
  tabOrder : 13,                 
  tabLabel : 'Chat',            
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.Chat;
    t.myDiv = div;
    unsafeWindow.pbviewtroops = t.viewtroops;
    t.myDiv.innerHTML = '<DIV class=pbStat>Chat Answer/Reply Info</div><TABLE><TR>\
						<TD><input type=checkbox id=pbchatqaenable /></td><TD>Enable chat functions </td></tr>\
						<TR><TD><input type=checkbox id=pbchatpassenable /></td><TD>Enable password: <input type=text id=pbchatpass value="'+ ChatOptions.password +'"/></td>\
						<TD width=10px>&nbsp;</td><TD><input type=checkbox id=pbautoblacklist />Auto blacklist players if 1st attempt fails</td></tr>\
						<TR><TD></td><TD valign=top>Allowed Players: <br><textarea cols=30 rows=1 id=allowUserBox></textarea></td>\
						<TD width=10px>&nbsp;</td><TD> Blacklisted Players <br><textarea cols=30 rows=1 id=blacklistUserBox ></textarea></td></tr>\
						<TR><TD colspan=3>Type "/[Player] units?" to get a unit count <br> Type "/[Player] attacks? to get impending attacks <br> Player name is cAsE-SeNsItIvE </td></tr></table>';
	t.togtext('allowUserBox', 'AllowUsersRemoteControl');
	t.togtext('blacklistUserBox', 'BlacklistUsersRemoteControl');
	t.togOpt('pbchatqaenable', 'Chatenable', ChatStuff.init);
	t.togOpt('pbchatpassenable', 'Chatpassenable');
	t.togOpt('pbautoblacklist', 'Chatautoblacklist');
	document.getElementById('pbchatpass').addEventListener('change', function(e){
		ChatOptions.password = e.target.value;
		GM_log(e.target.value);
		saveChatOptions();
	}, false);
  },
  
  togtext : function(boxId, optionName){
    var t = Tabs.Chat;
	var e = document.getElementById(boxId);
	var text = '';
	for(i=0; i<ChatOptions[optionName].length; i++)
		text += ChatOptions[optionName][i]+'\n';
	e.value = text;
	e.addEventListener('change', new eventToggle(boxId, optionName).handler, false);
	function eventToggle (boxId, optionName){
      this.handler = handler;
      var optName = optionName;
      function handler(event){
	    ChatOptions[optionName] = [];
		var values = this.value.split('\n');
        for(var i=0; i<values.length; i++)
			ChatOptions[optionName][i] = values[i];
        saveChatOptions();
      }
    }
  },
  
  togOpt : function (checkboxId, optionName, callEnable, callIsAvailable){
    var t = Tabs.Chat;
    var checkbox = document.getElementById(checkboxId);
    
    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (ChatOptions[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', new eventToggle(checkboxId, optionName, callEnable).handler, false);
    function eventToggle (checkboxId, optionName, callOnChange){
      this.handler = handler;
      var optName = optionName;
      var callback = callOnChange;
      function handler(event){
        ChatOptions[optionName] = this.checked;
        saveOptions();
        if (callback != null)
          callback (this.checked);
      }
    }
  },
  
  viewtroops : function (u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12){
	var t = Tabs.Chat;
  	t.popReport = new pbPopup('pbShowTroops', 0, 0, 500, 300, true);
  	t.popReport.centerMe (mainPop.getMainDiv());  
  	var m = '<DIV style="max-height:275px; height:275px; overflow-y:scroll">'; 
  	
  	m+='<TABLE class=ptTab>\
		<TR><TD><b>Impending Attack</b></td></tr></table>';
	m+='<TABLE class=ptTab><TR><TD align="center">Troops</td><TD align="center">Amount</td></tr>';
	
	if(u1) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_1_30.png></td><TD align="center">'+parseInt(u1)+'</td></tr>';
	if(u2) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_2_30.png></td><TD align="center">'+parseInt(u2)+'</td></tr>';
	if(u3) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_3_30.png></td><TD align="center">'+parseInt(u3)+'</td></tr>';
	if(u4) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_4_30.png></td><TD align="center">'+parseInt(u4)+'</td></tr>';
	if(u5) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_5_30.png></td><TD align="center">'+parseInt(u5)+'</td></tr>';
	if(u6) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_6_30.png></td><TD align="center">'+parseInt(u6)+'</td></tr>';
	if(u7) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_7_30.png></td><TD align="center">'+parseInt(u7)+'</td></tr>';
	if(u8) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_8_30.png></td><TD align="center">'+parseInt(u8)+'</td></tr>';
	if(u9) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_9_30.png></td><TD align="center">'+parseInt(u9)+'</td></tr>';
	if(u10) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_10_30.png></td><TD align="center">'+parseInt(u10)+'</td></tr>';
	if(u11) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_11_30.png></td><TD align="center">'+parseInt(u11)+'</td></tr>';
	if(u12) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_12_30.png></td><TD align="center">'+parseInt(u12)+'</td></tr>';
	
  	m+='<TR><TD></TD></TR><TR><TD></TD></TR></table>';
	
	m+='</div>';
  	t.popReport.getMainDiv().innerHTML = m;
  	t.popReport.getTopDiv().innerHTML = '<TD><CENTER><B>Incoming</b></center></td>';
  	t.popReport.show(true)	;
  },
  
  hide : function (){

  },
  
  show : function (){

  },

}

var ChatStuff = {
timeout : null,
processqueue : [],
latestChats : [],

  init:function() {
	var t=ChatStuff;
	var comm=document.getElementById('mod_comm_list2');
	if(comm && ChatOptions.Chatenable) {
		if(t.timeout == null) {
			t.GetLatestChat();
			t.timeout = window.setTimeout(function() {
				t.IterateChat(t.ChatAdded);
			},200);
		} else {
			logit("Maybe too many chat messages, chat already processing.");
		}
	}
	window.setTimeout(function() {
		t.init();
	},5000);
  },

  GetLatestChatStr:function(chatObj) { 
	return chatObj.name+'#'+chatObj.time+'#'+chatObj.text.split(/[\.\?]/)[0]; 
  },

  GetLatestChat:function() {
	var t = ChatStuff;
	t.latestChats = ChatOptions.latestChats;
	if(t.latestChats.length>25) {
		t.latestChats.splice(0,1);
	}
  },

  GetChatTimeNum:function(time) {
	var tarr=time.split(':');
	if(!time) return undefined;
	var timeNum=(tarr[0]*60)+tarr[1];
	return timeNum;
  },

  GetChatObj:function(htmlObj) {
	var t=ChatStuff;
	var nm=searchDOM(htmlObj,'node.className=="nm"',8);
	var time=searchDOM(htmlObj,'node.className=="time"',8);
	var tx=searchDOM(htmlObj,'node.className=="tx"',8);
	if(!nm || !time || !tx) { return undefined; }
	var nameArr=nm.innerHTML.split(' ');
	var fromMe = nameArr[1]==Seed.player.name?true:false;
	return { 
		'obj':htmlObj,
		'textObj':tx,
		'name':nm.innerHTML,
		'time':time.innerHTML,
		'text':tx.innerHTML,
		'shortName':nameArr[1],
		'timeNum':t.GetChatTimeNum(time.innerHTML),
		'fromMe':fromMe?1:0,
	};
  },

  IterateChat:function(func) {
	var t=ChatStuff;
	var comm = document.getElementById('mod_comm_list2');
	var directs = searchDOM(comm,'node.className=="chatwrap clearfix direct"',4,true);
	var chats=[];
	for(var d=directs.length-1; d>=0; d--) {
		var direct=directs[d];
		var chatObj=t.GetChatObj(direct);
		if(chatObj) {
			chats.push([direct,chatObj]);
		}
	}
	t.checkProcessed(chats, func);
  },

  checkProcessed : function(chats, func){
	var t=ChatStuff;
	for(var c=0; c<chats.length; c++) {
		var found = false;
		var chatObj=chats[c][1];
		for(var i=0; i<t.latestChats.length; i++){
			if(t.latestChats[i] == t.GetLatestChatStr(chatObj))
				found = true;
		}
		if(!found){
		chatObj.notProcessed=true;
		ChatOptions.latestChats.push(t.GetLatestChatStr(chatObj));
		}
		func(chatObj);
	}
	saveChatOptions();
	t.timeout = null;
  },

  GetCitiesHash:function(arr) {
	var h={};
	for(var a=0; a<arr.length; a++) {
		var city=arr[a];
		var newA=[]
		Array.prototype.push.apply(newA, city);

		h[city[0]]=newA;
	}
	return h;
  },

  SendChat:function(name,mess) {
	var inp=document.getElementById('mod_comm_input');
	inp.value="@"+name+' '+mess;
	logit('Send chat:'+mess);
	unsafeWindow.Chat.sendChat();
  },

  ChatFuncs:{
	'units':{
		'question':function(chatObj,info) {
			if(!chatObj.notProcessed) { return; }
			var t=ChatStuff;
			
			t.SendChat(chatObj.shortName,"units."+JSON2.stringify({
				'cities':t.GetCitiesHash(Seed.cities),
				'units':Seed.units,
			}));
		},
		'answer':function(chatObj,info) {
			var t=ChatStuff;
			// {"city24479":{"tick":1297589617,"rec1":"[756220044, 2592000000, 7100, 3033]","rec2":"[539696566, 1836000000, 5000, 0]","rec3":"[191319892, 1548000000, 4200, 0]","rec4":"[4512787, 1512000000, 4100, 0]"}}
			var infoObj=JSON2.parse(info);
			var res=infoObj.units;
			var cities=infoObj.cities;
			
			chatObj.textObj.innerHTML='';
			var table=document.createElement('table');
			//table.className='direct';
			function AddCell(tr) {
				var td=tr.insertCell(-1);
				//td.className='direct';
				td.style.backgroundColor='#ffde75';
				td.style.textAlign='right';
				return td;
			}
			for(var city in res) {
				var resObj=res[city];
				
				var tr=table.insertRow(-1);
				//var cityTd=tr.insertCell(-1);
				var cityTd=AddCell(tr);
				cityTd.colspan='4';
				cityTd.style.fontWeight='bold';
				var cityM=/([0-9]+)$/.exec(city);
				var cityObj=cities[cityM[1]];
				if(!cityObj) {
					logit('Cannot find city:'+cityM[1]);
					continue; 
				}
				
				cityTd.innerHTML=cityObj[1];
				//for(var r=1; r<=4; r++ ) {
				for(var unt in resObj) {
					//var rarr=JSON2.parse(resObj['rec'+r].replace(' ',''));
					var units=parseInt(resObj[unt]);
					
					if(units<=0) continue;
					var tr=table.insertRow(-1);
					AddCell(tr).innerHTML=unsafeWindow.unitcost[unt][0];
					AddCell(tr).innerHTML=addCommas(units);
				}
			}
			chatObj.textObj.appendChild(table);
		},
	},
	'attacks':{
		'question':function(chatObj,info) {
			if(!chatObj.notProcessed) { return; }
			var t=ChatStuff;
			
			t.SendChat(chatObj.shortName,"attacks."+JSON2.stringify({
				'cities':t.GetCitiesHash(Seed.cities),
				'marches':Seed.queue_atkinc,
				'players':Seed.players,
				'alliance':Seed.allianceNames,
			}));
		},
		'answer':function(chatObj,info) {
			var t=ChatStuff;
			var infoObj=JSON2.parse(info);
			var res=infoObj.marches;
			var cities=infoObj.cities;
			var names=infoObj.players;
			var alliance=infoObj.alliance;
			
			chatObj.textObj.innerHTML='';
			var div = document.createElement('div');
			var table=document.createElement('table');
			div.style.overflow = 'auto';
			function AddCell(tr) {
				var td=tr.insertCell(-1);
				td.style.backgroundColor='#ffde75';
				td.style.textAlign='right';
				return td;
			}
			var cityTr = {};
			for(var city in cities) {				
				cityTr[city]=table.insertRow(-1);
				cityTd=AddCell(cityTr[city]);
				cityTd.colspan='4';
				cityTd.style.fontWeight='bold';
				cityTd.innerHTML=cities[city][1].substring(0,10)+' '+coordLink(cities[city][2],cities[city][3]);
			}
			for(var marches in res){
				var marchObj = res[marches];
				if(!marchObj.toCityId) continue;
				if(marchObj.marchType == 3 || marchObj.marchType ==4){
					var tr=table.insertRow(cityTr[marchObj.toCityId].rowIndex+1);//Specify which city to insert
					var timeLeft = parseInt(marchObj.arrivalTime-unixTime());
					if(timeLeft < 0) continue;
					
					AddCell(tr).innerHTML = timestr(timeLeft);
					AddCell(tr).innerHTML = coordLink(marchObj.fromXCoord,marchObj.fromYCoord);
					AddCell(tr).innerHTML = names['u'+marchObj.pid]?names['u'+marchObj.pid].n.substring(0,10):(marchObj.players['u'+marchObj.pid]?marchObj.players['u'+marchObj.pid].n.substring(0,10):'Undefined');
					AddCell(tr).innerHTML = (alliance['a'+marchObj.fromAllianceId]?alliance['a'+marchObj.fromAllianceId].substring(0,10):'Undefined')+' ('+getDiplomacy(marchObj.fromAllianceId)+')';
					var troops = [];
					for(var t = 1; t<13; t++){
						troops.push(parseInt(marchObj.unts['u'+t]));
					}
					AddCell(tr).innerHTML = '<a onclick=pbviewtroops('+ troops.join(',') +')>View troops</a>';
				}
			}
			div.appendChild(table);
			chatObj.textObj.appendChild(div);
		},
	}
  },

  allowUsersHash:null,
  ChatAdded:function(chatObj) {
	var t=ChatStuff;
	if(chatObj) {
		t.noAllow = ChatOptions.BlacklistUsersRemoteControl;
		t.allowUsersHash = ChatOptions.AllowUsersRemoteControl;
		if(t.allowUsersHash.length==0) { return; }
		if(t.noAllow.length!=0) {
			for(var u=0; u<t.noAllow.length; u++)
				if(t.noAllow[u] == chatObj.shortName){
					return;
				}
		}

		var cArr=/^([^\?\.]+)([\.\?])(.*)$/.exec(chatObj.text);
		if(!cArr) {
			return;
		}
		var cmd=cArr[1];
		
		var question=false;
		if(chatObj.fromMe) {
			chatObj.obj.style.borderBottom='1px solid #0f0';
		}
		if(chatObj.notProcessed) {
			chatObj.obj.style.borderLeft='1px solid #ff0';
		}
		
		var cmdInfo=t.ChatFuncs[cmd];

		if(cArr[2]=='?') {
			question=true;
			if(ChatOptions.Chatpassenable){
				var password=cArr[3];
			}
		} else {
			var info=cArr[3];
		}
		
		if(cmdInfo && !question) {
			// hide unreadable requests that are json
			var shortCmd=(cmd+cArr[2]);

			if(chatObj.textObj.innerHTML!=shortCmd && info.substr(0,1)=='{') {
				chatObj.textObj.innerHTML=shortCmd;
			}
		}
		
		// if(chatObj.fromMe) {
			// return;
		// }
		var done=0;

		if(cmdInfo) {
			window.setTimeout(function() {
				if(question && chatObj.notProcessed) {
					var permission = false;
					for(var u=0; u<t.allowUsersHash.length; u++)
						if(t.allowUsersHash[u] == chatObj.shortName){
							permission = true;
							break;
						}
					if(ChatOptions.Chatpassenable && password!=ChatOptions.password){
						permission = false;
						//GM_log(password+' '+ChatOptions.password);
					}
					if(permission){
						cmdInfo['question'].call(t,chatObj,info);
					} else {
						chatObj.obj.appendChild(document.createTextNode("Player does not have permission: "+chatObj.shortName));
						t.SendChat(chatObj.shortName,"Player does not have permission");
						if(ChatOptions.Chatautoblacklist){
							ChatOptions.BlacklistUsersRemoteControl.push(chatObj.shortName);
							document.getElementById('blacklistUserBox').value += chatObj.shortName+'\n';
						}
					}
				} else {
					cmdInfo['answer'].call(t,chatObj,info);
				}
			},0);				
		}
	} else {
		logit('Chat object failed');
	}
	return true;
  },
}



/************************ Oil,Gold,Nukes....************************/
var AutoEvents = {
  timer : null,
	colCityName : null,   
	colCityNumber : 0,
	
  init : function (){
    var t = AutoEvents;
		clearTimeout (t.timer);
    t.tick();
	},
	
	tick : function (){
		var t = AutoEvents;
		clearTimeout (t.timer);
		var now = unixTime();
		for (var c=0; c<Cities.numCities; c++){
			var city = Cities.cities[c];


			if (t.kasino(city.id) && Options.pbgoldenable && Options.pblastgoldcollect[c] < now-300) {
				var happy = Seed.citystats['city'+ city.id].pop[2];
				var ready = Seed.coliseumEvents['city'+ city.id]["1"].finish - now;
				if (happy >= Options.pbGoldLimit && ready <= 0) {
					t.colCityName = city.name;
					t.ajaxCollectGold (city, t.e_ajaxDoneGold);
					break;
				}
			}
			

			if (Options.pboilenable && Options.pblastoilcollect < now-300) {
				var finish = Seed.petroleumLabEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectOil (city, t.e_ajaxDoneOil);
						break;
					}
				}
			}
		

			if (Options.pbfoodenable && Options.pblastfoodcollect < now-300) {
				var finish = Seed.greenhouseEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectFood (city, t.e_ajaxDoneFood);
						break;
					}
				}
			}
			

			if (Options.pbnukeenable && Options.pblastnukecollect < now-300) {
				var finish = Seed.warheadFactoryEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectNuke (city, t.e_ajaxDoneNuke);
						break;
					}
				}
			}


			if (Options.pblauncherenable && Options.pblastlaunchercollect < now-300) {
				var finish = Seed.missionControlEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectLauncher (city, t.e_ajaxDoneLauncher);
						break;
					}
				}
			}
			
			if (Options.pbradarenable && Options.pblastradarcollect < now-300) {
				var finish = Seed.radarStationEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectRadar (city, t.e_ajaxDoneRadar);
						break;
					}
				}
			}
			if (Options.pbdailyenable && Options.pblastdailycollect < now-300 && 
					Seed.dailyResourceRewardStatus === true && c == 0) {
				t.colCityName = city.name;
				t.ajaxCollectDaily(city, t.e_ajaxDoneDaily);
				break;
			}
			
		}
		t.timer = setTimeout (t.tick, 10000);    
	},

	e_ajaxDoneGold : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	addCommas(rslt.gained.gold) + ' Gold Quantity Collected ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'ERROR - Collecting Gold '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastgoldcollect[t.colCityNumber] = unixTime();
		Logbuch.eintrag(Logs.globallog,m);
	},
  
	ajaxCollectGold : function (city, notify){
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = city.id;
		params.eventid = 1;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "coliseumEvent.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (notify) notify (rslt);
			},
			onFailure: function (rslt) {
				if (notify) notify (rslt);
			}
		});
	},

  e_ajaxDoneOil : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	addCommas(rslt.gained.resource2) + ' Oil Quantity Collected ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'ERROR - Collecting Oil: '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastoilcollect = unixTime();
		Logbuch.eintrag(Logs.globallog,m);
  },
  
  ajaxCollectOil : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
		params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "petroleumLabEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },	

  e_ajaxDoneFood : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	addCommas(rslt.gained.resource1) + ' Food Quantity Collected' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'ERROR - Collecting Food: '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastfoodcollect = unixTime();
		Logbuch.eintrag(Logs.globallog,m);
  },
  
  ajaxCollectFood : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
		params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "greenhouseEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },	

 e_ajaxDoneNuke : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	'Collected nuclear warhead. ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'ERROR - Collecting a nuclear warhead. '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastnukecollect = unixTime();
		Logbuch.eintrag(Logs.globallog,m);
  },
  
  ajaxCollectNuke : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
		params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "warheadFactoryEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },	

 e_ajaxDoneLauncher : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	'Launch Vehicle Collected ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'ERROR - Launch Vehicle could not be collected. '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastlaunchercollect = unixTime();
		Logbuch.eintrag(Logs.globallog,m);
  },
  
  ajaxCollectLauncher : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
		params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "missionControlEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },	

 e_ajaxDoneRadar : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	'Targeting Radar Crate Collected ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'ERROR - Radar Targeting could not be collected. '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastradarcollect = unixTime();
		Logbuch.eintrag(Logs.globallog,m);
  },
  
  ajaxCollectRadar : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "radarStationEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },

	e_ajaxDoneDaily : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	'Collected Daily Bonus ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'ERROR - Collecting Daily Bonus '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Seed.dailyResourceRewardStatus = false;
		Options.pblastdailycollect = unixTime();
		Logbuch.eintrag(Logs.globallog,m);
  },
  
  ajaxCollectDaily : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "claimDailyReward.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },

	kasino : function(cid) {
		var Kasino = false;
		var bau = Seed.buildings['city'+ cid];
		for (var g in bau) {
			b = bau[g];
			if (parseInt(b[0]) == 6) {
				Kasino = true;
			}						
		}
		return Kasino;
	},

}


/************************* Logs ************************************/

var Logbuch = {
	max : 100,
	
	eintrag : function (log, msg){
		var d = new Date();
		var t = d.toLocaleTimeString();
		var l = '<tr><td class="nobr">' + t + ' &nbsp;-&nbsp;</td><td>' + msg + '</td></tr>';
		log.push(l);
		while (log.length > Logbuch.max) {
			log.shift();
		}
		saveLogs();
	},
	
	ausgabe : function(log){
		var a = '';
		if (log.length > 0 ) {
			var l = log.slice();
				l.reverse();
				a += '<table>' + l.join('') + '</table>';
		} else {
				a += '<table><tr><td> </td></tr></table>';
		}	
		return a;
	},
}


/************************ Chat On Right *************************/

var ChatOnRight = {
  
  init : function () {
    t = ChatOnRight;
    if (Options.pbChatOnRight){
      var chat = document.getElementById('kocmain_bottom').childNodes[5];
			var chat2 = document.getElementById('kocmain').childNodes[16];

			if (!chat || chat.className != 'mod_comm')
				setTimeout (function (){t.init()}, 1000);

	  chat.style.top = '-548px';
      chat.style.left = '760px';
      chat.style.height = '700px';
      chat.style.width = '350px';
      chat.style.background = 'url("'+ CHAT_BG_IMAGE +'")';		
			
	  chat2.style.top = '55px';
      chat2.style.left = '760px';
      chat2.style.height = '550px';	
      chat2.style.width = '315px';

	 document.getElementById('mod_comm_list1').style.height = '3000px';
      document.getElementById('mod_comm_list2').style.height = '3000px';  
  
	  document.getElementById('mod_comm_list2').style.color = 'Blue';
      document.getElementById('mod_comm_list1').style.color = 'red';
      document.getElementById('mod_comm_list2').style.font = 'yellow';
      document.getElementById('mod_comm_list1').style.font = 'green';
	}
  },
}


/************************ Alerts *************************/
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
			var foodleft = parseInt(parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600);
			var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
			row[i] = rp[1] - usage;
			var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
			var msg = '';
			if (usage < 0) {
				if (Options.pbFoodAlert && timeLeft < (4*3600)) {
					msg += 'My City: ' + Cities.cities[i].name + ' (' +
						Cities.cities[i].x +','+ Cities.cities[i].y + ')';
					msg += ' is ugenently in need of Food, I have '+addCommas(foodleft)+' left, the time remaining is'+timestrShort(timeLeft)+
						' M hourly upkeep is: '+addCommas(usage)+'.';
					sendChat("/a " + msg); //  
					Logbuch.eintrag(Logs.globallog,msg);
				}
			}
		}
		f.minuteTimer = setTimeout (f.e_eachMinute, 600000);
  },
}
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}


/************************ Gifts *************************/
var Gifts = {
	user_gifts : [],
	gTimer : null,
	
	init : function (){
		var f = Gifts;
		setInterval (f.checkGifts, 600000);
	},

	checkGifts : function (){  
		if (!Options.pbgiftenable) return;
		var f = Gifts;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getRequests.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
				if (rslt.ok) {
					//Logbuch.eintrag(Logs.globallog, 'Envantere bakiliyor..');
					f.user_gifts = [];
					if (rslt.gifts.length > 0) {
						for (var g = 0; g < rslt.gifts.length; g++) {
							var gift = rslt.gifts[g];
							f.user_gifts.push(gift);
						}
						clearInterval(f.gTimer);
						f.gTimer = setInterval(f.claimGifts, 7000);
					} else {
						//Logbuch.eintrag(Logs.globallog, '.............');					
					}
				} else {
					var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
					Logbuch.eintrag(Logs.globallog, 'ERROR: There was a problem retrieving a Gift<br><span class="boldRed">'+error+'</span>');
				}
      },
      onFailure: function (rslt) {
				Logbuch.eintrag(Logs.globallog, 'ERROR: There was a problem retrieving a Gift');
      }
    });
  },
	
	claimGifts : function() {
		var f = Gifts;
		if (f.user_gifts.length == 0) {
			clearInterval(f.gTimer);
			return;
		}
		var gift = f.user_gifts.shift();
		if (!gift.giftInviteId) return;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.accepted = 1;
		params.giid = gift.giftInviteId;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "acceptGift.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
				if (rslt.ok) {
					Logbuch.eintrag(Logs.globallog, 'Gift: <b>' + unsafeWindow.arStrings.itemName['i' + gift.itemId] + '</b> Sender: ' + gift.firstname + ' ' + gift.lastname + ' \'collected gift');
				} else {
					var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
					Logbuch.eintrag(Logs.globallog, 'Gift: <b>' + unsafeWindow.arStrings.itemName['i' + gift.itemId] + '</b> Sender: ' + gift.firstname + ' ' + gift.lastname + ' \'unable to accept gift <br><span class="boldRed">'+error+'</span>');
				}
      },
      onFailure: function (rslt) {
				Logbuch.eintrag(Logs.globallog, 'ERROR - Problem encountered while Accepting Gift');
      }
    });		
	},
}


/************************Items *************************/

var ItemsUse = {

	iTimer : null,
	itemlist : [101,103,
							111,113,
							121,123,
							131,133,
							141,143,
							1001,1002,1003,1004,1005,
							1011,1012,1013,1014,1015,
							1021,1022,1023,1024,1025,
							1031,1032,1033,1034,1035,
							1041,1042,1043,1044,1045],
	
	init : function (){
		var f = ItemsUse;
		setInterval(f.checkItems, 60000);
	},

	checkItems : function (){  
		if (!Options.pbitemuse) return;
		var f = ItemsUse;
		var rbid = unsafeWindow.Constant.ResorceBoostIds;
		var item = 0;
		for (i = 0; i < f.itemlist.length; i++) {
			var item = f.itemlist[i];
			if (Seed.items['i'+item] && Seed.items['i'+item] > 0) break;
		}
		if (item > 0) {
			if (item < 1000) {

				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = Cities.cities[0].id;
				params.iid = item;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "boostProduction.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) {
						if (rslt.ok) {
							Logbuch.eintrag(Logs.globallog, 'Extra Attack Boost: <b>'+unsafeWindow.arStrings.itemName['i' + item]+'</b> Items Are Used ');
							var e = parseInt(rslt.expire, 10);
							if (Seed.playerEffects.length === 0) Seed.playerEffects = {};
							if (rbid.GOLD.include(item)) Seed.bonus.bC1000.bT1001 = e;
							if (rbid.FOOD.include(item)) Seed.bonus.bC1100.bT1101 = e;
							if (rbid.LUMBER.include(item)) Seed.bonus.bC1200.bT1201 = e;
							if (rbid.STONE.include(item)) Seed.bonus.bC1300.bT1301 = e;
							if (rbid.IRON.include(item)) Seed.bonus.bC1400.bT1401 = e;
							unsafeWindow.MyItems.subtractItem(item);
							unsafeWindow.update_boosts();
						} else {
							var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
							Logbuch.eintrag(Logs.globallog, 'Extra Attack Boost <b>'+unsafeWindow.arStrings.itemName['i' + item]+'</b>ERROR - If an item could not be used<br><span class="boldRed">'+error+'</span>');
						}
					},
					onFailure: function (rslt) {
						Logbuch.eintrag(Logs.globallog, 'ERROR: If an item could not be used');
					}
				});					
			} else {

				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = Cities.cities[0].id;
				params.iid = item;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "resourceCrate.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) {
						if (rslt.ok) {
							Logbuch.eintrag(Logs.globallog, 'Gift of raw materials: <b>'+unsafeWindow.arStrings.itemName['i' + item]+'</b> Used');
							unsafeWindow.Resource.addToSeed(rslt.rtype, rslt.amt); 
							unsafeWindow.MyItems.subtractItem(item); 
						} else {
							var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
							Logbuch.eintrag(Logs.globallog, 'Gift of raw materials: <b>'+unsafeWindow.arStrings.itemName['i' + item]+'</b> ERROR - Could not be used.<br><span class="boldRed">'+error+'</span>');
						}
					},
					onFailure: function (rslt) {
						Logbuch.eintrag(Logs.globallog, 'ERROR - Item Could not be used.');
					}
				});			
			}
		}
  },
}


/*******************Chat Help Links*****************/

var ChatPane = {
  init : function(){
    var t = ChatPane;
		setInterval(t.HandleChatPane, 2500);
  },
	
  HandleChatPane : function() {
		var t = ChatPane;
		if(Options.pbahelpenable) {
			var AllianceChatBox = document.getElementById('mod_comm_list2');

			var alist = AllianceChatBox.getElementsByTagName('a');
			for (var i = 0; i < alist.length ; i++) {
				var element = alist[i];
				var classes = element.getAttribute('class');
				if (classes != 'helpBuild' && classes != 'helpResearch') continue;
				var alreadyClicked = element.getAttribute("clicked");
				if(!alreadyClicked){
					element.setAttribute('clicked', 'true');
					var myregexp = /(Building.helpBuild\(.*\);)/;
					var match = myregexp.exec(element.getAttribute("onclick"));
					if (match != null) {
						var onclickCode = match[0];
						t.ajaxhelpBuild(element,onclickCode);
						return;
					}
					var myregexp = /(Research.helpResearch\(.*\);)/;
					var match = myregexp.exec(element.getAttribute("onclick"));
					if (match != null) {
						var onclickCode = match[0];
						t.ajaxhelpResearch(element,onclickCode);
						return;
					}
				}
			}
		}

		if(Options.pbahelphide) {
			var ChatBox1 = document.getElementById('mod_comm_list1');			
			var ChatBox2 = document.getElementById('mod_comm_list2');			
			var alist1 = ChatBox1.getElementsByTagName('a');
			var alist2 = ChatBox2.getElementsByTagName('a');
			for (var i = 0; i < alist1.length ; i++) {
				var element = alist1[i];
				var classes = element.getAttribute('class');
				if (classes != 'helpBuild' && classes != 'helpResearch') continue;
				element.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode.parentNode);			
			}
			for (var i = 0; i < alist2.length ; i++) {
				var element = alist2[i];
				var classes = element.getAttribute('class');
				if (classes != 'helpBuild' && classes != 'helpResearch') continue;
				element.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode.parentNode);			
			}			
		}
	},
	
  ajaxhelpBuild : function (e, clickcode){
		var p = clickcode.split(",");

		if (parseInt(p[1]) == unsafeWindow.g_ajaxsuffix.substr(3)) return;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = parseInt(p[4]);
		params.id = parseInt(p[2]);
		params.level = parseInt(p[3]);
		params.inviterId = parseInt(p[1]);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "helpAllianceFriendBuild.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
				e.innerHTML = rslt.msg;
      },
      onFailure: function (rslt) {
				e.innerHTML = rslt.msg;
      }
    });
  },	

  ajaxhelpResearch : function (e, clickcode){
		var p = clickcode.split(",");

		if (parseInt(p[1]) == unsafeWindow.g_ajaxsuffix.substr(3)) return;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = parseInt(p[4]);
		params.id = parseInt(p[2]);
		params.level = parseInt(p[3]);
		params.inviterId = parseInt(p[1]);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "helpAllianceFriendResearch.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
				e.innerHTML = rslt.msg;
      },
      onFailure: function (rslt) {
				e.innerHTML = rslt.msg;
      }
    });
  },	
}

/************************ Refresh,Diplomacy,Sound player, Resource Production ************************/
var RefreshEvery  = {
  timer : null,
  PaintTimer : null,
  NextRefresh : 0,
  box : null,
  target : null,
  
  init : function (){
		var t = RefreshEvery;
		t.creatediv();
		if (Options.pbEveryMins < 1) Options.pbEveryMins = 1;
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
      t.NextRefresh = unixTime() + (Options.pbEveryMins*60); 
      t.timer = setTimeout (t.Paint, 1000);
    } else {
			t.timer = null;
			t.NextRefresh = 0;
			t.box.innerHTML = '<br><b style="color:white;">&nbsp;&nbsp;'+ getMyAlliance()[1] +'</b>';
		}
  },
  
  doit : function (){
    Logbuch.eintrag(Logs.globallog, 'Refreshed: ('+ Options.pbEveryMins +' if in range)');
    reloadGW();
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
		if ( Left < 60) 
			text += '<br>&nbsp;&nbsp;<span style="color:white;">Refresh: </span><b style="color:red;">'+ timestr(Left) +'</b>';
		else 
			text += '<br>&nbsp;&nbsp;<span style="color:white;">Refresh: </span><b style="color: white;">'+ timestr(Left) +'</b>';
			
		t.box.innerHTML = text;
    t.timer = setTimeout (t.Paint, 1000);
  },
}
function reloadGW (server){
	
	if (server) { 
		var serverId = server; 
	} else {
		var serverId = getServerId();
	}
	GM_setValue('pbReloadNow',serverId);
  if (serverId == '??') {
		window.location.reload(true);
	}
}

function findoptvalue (y) {
	var unit2 = y.substring(1)
	var unit3 = 'unt' + unit2
  return unit3;
}

function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'Neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'Friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'Hostile';
  if (aid == Seed.allianceDiplomacies.allianceId)
    return 'Own Allaince';
  return 'Neutral';
};

function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i<200; i++){
    if (b['pos'+i] && b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
    }
  }
	// returns {count, maxlevel}
  return ret;
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
    div.innerHTML = '<object width="0" height="0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"><param name="movie" value="'+playerUrl+'"><param name="quality" value="high"></object>';
    this.player = div.getElementsByTagName('object')[0];
  } else {
    div.innerHTML = '<embed width="0" height="0" src="'+playerUrl+'"  bgcolor="#eeeeee" allowfullscreen=false FlashVars="'+ flashVars +'" quality="high" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" ></embed>';
    this.player = div.getElementsByTagName('embed')[0].wrappedJSObject;
  }
  if (container)
    container.appendChild (div);
  else
    document.body.appendChild (div);
/*  for (k in attrs)
    this.player.setAttribute(k, attrs[k]);
*/       
  this.setVolume = function (chanNum, vol){
    if (!self.isLoaded)
      return;
    self.player.jsSetVolume (chanNum, vol);
    volume = vol;
  }
  
  this.load = function (chanNum, url, bStream, bAutoplay, bUsePolicyFile){
    self.player.jsLoad (chanNum, url, bStream, bAutoplay, bUsePolicyFile);
  }
  
  this.play = function (chanNum, position){
    self.player.jsPlay (chanNum, position);
  }
    
  this.stop = function (chanNum){
    self.player.jsStop (chanNum);
  }
    
  this.getStatus = function (chanNum){
    return self.player.jsGetStatus (chanNum);
  }
  
  this.debugFunc = function (msg){
  }
      
  this.swfDebug = function (msg){
    self.debugFunc('SWF: '+ msg);
  }
  this.swfLoaded = function (){
    self.isLoaded = true;
    self.debugFunc ('playerIsReady');
    if (self.onSwfLoaded)
      self.onSwfLoaded();
  }
  this.swfPlayComplete = function (chanNum){
  }
  this.swfLoadComplete = function (chanNum, isError){
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
  this.slider.style.left = margin +'px';
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

  this.setValue = function (val){
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
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px';
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
    while (e.offsetParent){
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

function getResourceProduction (cityId){
  var ret = [0,0,0,0,0,0,0,0,0];
  var now = unixTime();
  
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
    }
  }
  var workerFactor = 1;
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);
  var w = parseInt(Seed.citystats["city" + cityId]["pop"][3]);
  if (w > c)
    workerFactor = c / w;
  

	var ELevel = 0;
	var TLevel = 0;
	var bau = Seed.buildings['city'+ cityId];
	for (var g in bau) {
		var b = bau[g];
		if (parseInt(b[0]) == 22) {
			ELevel = parseInt(b[1]);
		}						
		if (parseInt(b[0]) == 23) {
			TLevel = parseInt(b[1]);
		}					
	}	
	if (ELevel == 10) ELevel = 12;
	if (TLevel == 10) TLevel = 12;	
	
  for (var i=1; i<5; i++){
    var usage = Seed.resources["city" + cityId]["rec" + i];
    var items = 0;
    if (parseInt(Seed.bonus["bC1" + i + "00"]["bT1" + i + "01"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
		
		var spezial = 0;
		if (ELevel > 0 && i == 2) spezial = ELevel;
		if (TLevel > 0 && i == 1) spezial = TLevel;		
				
		grundverbrauch = usage[2];
			
		ret[i] = parseInt((grundverbrauch * (1 + tech/10 + knight/100 + items + spezial/10 + wilds[i]/20) * workerFactor));
		
	}
  return ret;  
}

/************ DEBUG WIN *************/
var debugWin = {
  popDebug : null,
  dbDefaultNot : '',
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
        t.dbSelect[k] = false;
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
  s = GM_getValue ('Options_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
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


function readLogs (){
  var serverID = getServerId();
  s = GM_getValue ('Logs_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          Logs[k][kk] = opts[k][kk];
      else
        Logs[k] = opts[k];
    }
  }
}

function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){
		GM_setValue ('Options_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(Options));
	}, 0);
}

function saveChatOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('ChatOptions_'+serverID, JSON2.stringify(ChatOptions));}, 0);
}


function saveLogs (){
  var serverID = getServerId();
  setTimeout (function (){
		GM_setValue ('Logs_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(Logs));
	}, 0);
}

function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  saveOptions();
  SaveLogs();
	Tabs.transport.saveTradeRoutes();
	Tabs.transport.saveTraderState();
	Tabs.build.onUnload();
}

/************  LIB classes/functions .... **************/

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

function formatZahl(zahl, k, fix) {
	if(!k) k = 0;
	var neu = '';
	var dec_point = ',';
	var thousands_sep = '.';

	var f = Math.pow(10, k);
	zahl = '' + parseInt(zahl * f + (.5 * (zahl > 0 ? 1 : -1)) ) / f ;

	var idx = zahl.indexOf('.');

	if (fix) {
		zahl += (idx == -1 ? '.' : '' ) + f.toString().substring(1);
  }
	var sign = zahl < 0;
	if (sign) zahl = zahl.substring(1);
	idx = zahl.indexOf('.');

  if  (idx == -1) {
		idx = zahl.length;
	} else {
		neu = dec_point + zahl.substr(idx + 1, k);
	}
  while (idx > 0) {
		if (idx - 3 > 0) {
			neu = thousands_sep + zahl.substring( idx - 3, idx) + neu;
		} else {
			neu = zahl.substring(0, idx) + neu;
		}
		idx -= 3;

	}
	return (sign ? '-' : '') + neu;
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
  wins : {},
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
  this.BASE_ZINDEX = 200000;
    

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


  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'CPopup ptTabs '+ prefix +'_CPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX 
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

	var m = [];
	m.push('<table cellspacing="0" width="100%" height="100%">');
  m.push('<tr id="'+ prefix +'_bar" class="'+ topClass +'">');
	m.push('<td valign="bottom">');
	m.push('<span id="'+ prefix +'_top"></span>');
	m.push('</td>');
	m.push('<td id='+ prefix +'_X valign="top" onmouseover="this.style.cursor=\'pointer\'" style="width:13px; text-align:center; color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td>');
	m.push('</tr>');
	m.push('<tr>');
	m.push('<td height="100%" valign="top" class="'+ prefix +'_CPopMain" colspan="2">');
	m.push('<div class="CPopMain '+ prefix +'_CPopMain" id="'+ prefix +'_main"></div>');
	m.push('</td>');
	m.push('</tr>');
	m.push('</table>');
  document.body.appendChild(this.div);
  this.div.innerHTML = m.join('');
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

  function setBoundRect (b){
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
        if (newTop < t.bounds.top){
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
          str += inspect(obj[property], maxLevels, level+1, doFunctions);
    }
    catch(err) {

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
Array.prototype.exists = function(o) {
	for(var i = 0; i < this.length; i++)
		if(this[i] === o)
			return true;
	return false;
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
String.prototype.trim = function (ws) {
    if(!this.length) return "";
    var tmp = this.stripNL().ltrim().rtrim();
    if(ws) return tmp.replace(/ +/g, ' ');
    else return tmp;
}
String.prototype.rtrim = function () {
    if(!this.length) return "";
    return this.replace(/\s+$/g, '');
}

String.prototype.ltrim = function () {
    if(!this.length) return "";
    return this.replace(/^\s+/g, '');
}
String.prototype.stripNL = function () {
    if(!this.length) return "";
    return this.replace(/[\n\r]/g, '');
}
String.prototype.stripTags =  function(){
	var tmp = this.replace(/(<.*['"])([^'"]*)(['"]>)/g, function(x, p1, p2, p3) { return  p1 + p3;});
	return tmp.replace(/<\/?[^>]+>/gi, '');
}

function mouseMainTab (me){
  if (me.button == 2){
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

function createButton (label){
  var a=document.createElement('a');
  a.className='tab buttontab';
  a.innerHTML='<span class="left"></span><span class="right"></span>';
  a.innerHTML+='<span class="mid">'+ label +'</span>';
  a.style.width='126px';
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
      gmTabs.style.background='#00000';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
	  gmTabs.style.height='11px';
      gmTabs.style.width='0px';
      gmTabs.style.padding='0px 0 4px 0px';
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

/******************************************************************************************/
/*  Ajax Functions                                                                        */
/******************************************************************************************/
function AjaxRequest (url, opts, timeout){
	var headers = {
		'X-Requested-With': 'XMLHttpRequest',
		'X-Prototype-Version': unsafeWindow.Prototype.Version,
		'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
		'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	};
	if (!timeout) var timeout = 30000;
	var toTimer = null;
	var ajax = null;
	ajax = new XMLHttpRequest();
  
	ajax.onreadystatechange = function(){
		if (ajax.readyState == 4) {
			clearTimeout(toTimer);		
			if (ajax.status >= 200 && ajax.status < 305) 
				if (opts.onSuccess) opts.onSuccess(ajax);				
			else
				if (opts.onFailure) opts.onFailure(ajax);
		} else {
			if (opts.onChange) opts.onChange (ajax);
		}
	}  
    
	ajax.open('POST', url, true);

	for (var k in headers) {
		ajax.setRequestHeader (k, headers[k]);
	}
  
	if (matTypeof(opts.requestHeaders)=='object') {
		for (var k in opts.requestHeaders) {
			ajax.setRequestHeader (k, opts.requestHeaders[k]);
		}
	}    

	var a = [];
	for (var k in opts.parameters) {
		if (matTypeof(opts.parameters[k]) == 'object') {
			for (var h in opts.parameters[k]) {
				a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
			}
		}	else {
			a.push (k +'='+ opts.parameters[k]);
		}
	}
	var toTimer = setTimeout(onTimeout, timeout);
	ajax.send(a.join ('&'));
	
	function onTimeout() {
		ajax = null;
		Logbuch.eintrag(Logs.globallog,'AJAX ERRORS: <span class="boldRed"> Server Error, not enough resources</span>');
		if (opts.onFailure) opts.onFailure(ajax);		
	}
}

function MyAjaxRequest (url, o, noRetryX){
	var opts = unsafeWindow.Object.clone(o);
	var wasSuccess = o.onSuccess;
	var wasFailure = o.onFailure;
	var retry = 0;
	var maxRetry = 3;
	var delay = 4;
	var noRetry = noRetry===true?true:false;
	opts.onSuccess = mySuccess;
	opts.onFailure = myFailure;

	new AjaxRequest(url, opts);
	return;

	function myRetry(){
		++retry;
		if (retry >= maxRetry) {
			Logbuch.eintrag(Logs.globallog,'AJAX ERRORS: <span class="boldRed">To Many repetitions.</span>');
		} else {
			new AjaxRequest(url, opts);
			delay = delay * 1.25;
		}
	}
	
	function myFailure(){
		var o = {};
		o.ok = false;
		o.errorMsg = "AJAX ERRORS";
		wasFailure (o);
	}
	
	function mySuccess (msg){
		var rslt = eval("(" + msg.responseText + ")");
		var x;
		if (window.EmulateAjaxError) {
			rslt.ok = false;  
			rslt.error_code = 8;
		}
		if (rslt.ok) {
			try {
				if (rslt.updateSeed) unsafeWindow.update_seed(rslt.updateSeed);
			} catch (e) {}
			wasSuccess(rslt);				
			return;
		}

    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if (!noRetry && 
				(rslt.error_code == 0 || 
				 rslt.error_code == 1 || 
				 rslt.error_code == 3 || 
				 rslt.error_code == 8)) {
			Logbuch.eintrag(Logs.globallog,'AJAX ERROR: Automatic request will be repeated.<br><span class="boldRed">'+rslt.errorMsg+'</span>');	 
			setTimeout(myRetry, parseInt(delay*1000));
    } else {
      wasSuccess (rslt);
    }
  }
}

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
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
  tabList : {},
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
    var m = '<table cellspacing="1" class="ptMainTab"><tr>';
    for (var i=0; i<sorter.length; i++) {
      m += '<td style="text-align:center;" class="notSel" id="pttc'+ sorter[i][1].name +'"><a><span>'+ sorter[i][1].label +'</span></a></td>';
      //if (i==7) m+='</tr><tr>';
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
        div.innerHTML = "Initialize: "+ '<pre>'+ e.name +' : '+ e.message +' : Row:'+e.lineNumber+'</pre>';
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
    nStr = nStr.replace(rgx, '$1' + '.' + '$2');
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
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
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
  m.push ('<select');
  if (tags){
    m.push (' ');
    m.push (tags);
  }
	m.push ('>');
  for (k in valNameObj){
    m.push ('<option ');
    if (k == curVal)
      m.push ('selected="selected" ');
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
    m += '<option value="'+ k +'"'+ (k==curVal?' selected="selected"':'')  +'>'+ a[k] +'</option>';
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
    m.push ('D ');
    m.push (parseInt(time%24));
    m.push ('H ');
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
    return  t + 'S.';
  if (t > 86400){
    m.push (parseInt(t/86400));
    m.push ('D');
    t %= 86400;
  }  
  if (t>3600 || time>3600){
    m.push (parseInt(t/3600));
    m.push ('H ');
    t %= 3600;
  }  
  m.push (parseInt(t/60));
  m.push ('M.');
  if (full || time<=3600 ){
    m.push (' ');
    m.push (t%60);
    m.push ('S.');  
  }
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

var WINLOG_MAX_ENTRIES = 1000;
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
      t.win.getTopDiv().innerHTML = 'Info';
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


function SortTable(theTable) {
	var up = String.fromCharCode(9660);
	var down = String.fromCharCode(9650);
	var pointer_color = '#000';
	var pointer_color_act = 'red';	
	var zebra = /\bzebra\b/i.test(theTable.className);
	var tableBody = theTable.tBodies[0];
	var header = theTable.tHead;
	var clicker = [];
	var desc = 1;
	

	var th = header.rows[0].cells;
	
	for(var i = 0; i < th.length; i++) {

		if(th[i].className && /\bno_sort\b/i.test(th[i].className)) continue;
		
		var ignoreCase = th[i].getAttribute('ignore_case');
		var forceString = th[i].className;


		var pointer = document.createElement('span');
		pointer.style.fontFamily = 'Arial';
		pointer.style.fontSize = '70%';
		pointer.style.color = pointer_color;
		pointer.innerHTML = ' '+down;
		var span1 = th[i].appendChild(pointer);
		span1.style.cursor = 'pointer';
		span1.setAttribute('sortsp',i);
		span1.setAttribute('sortsd','1');
		span1.setAttribute('ignoreCase',ignoreCase);
		span1.setAttribute('forceString',forceString);		
		span1.addEventListener('click', oclick, false);		
		var pointer = document.createElement('span');
		pointer.style.fontFamily = 'Arial';
		pointer.style.fontSize = '70%';
		pointer.style.color = pointer_color;
		pointer.innerHTML = ' '+up;	
		var span2 = th[i].appendChild(pointer);		
		span2.style.cursor = 'pointer';
		span2.setAttribute('sortsp',i);
		span2.setAttribute('sortsd','-1');
		span2.setAttribute('ignoreCase',ignoreCase);
		span2.setAttribute('forceString',forceString);			
		span2.addEventListener('click', oclick, false);
		clicker.push(span1);
		clicker.push(span2);	
	}


	function oclick() {
		var ignoreCase = (this.getAttribute('ignore_case') == 'ignore_case');
		var forceString = !!(this.getAttribute && /\bsort_string\b/i.test(this.getAttribute));
		var spalte = this.getAttribute('sortsp');
		var direction = this.getAttribute('sortsd');
		var ok = sort(spalte, direction, ignoreCase, forceString);
		if (ok) {
			for (var i = 0; i < clicker.length ; i++) {
				clicker[i].style.color = pointer_color;
			}
			this.style.color = pointer_color_act;
		}
	};
	 	 
	function getValue(el, ignoreCase, forceString) {
		if (el.getAttribute('my_key')) return parseFloat(el.getAttribute('my_key'));
		var val = el.innerHTML.stripTags().trim();
		if(forceString) return ignoreCase ? val.toLowerCase() : val;
		return val == parseFloat(val) ? parseFloat(val) : val
	}


	function sort(spalte, desc, ignoreCase, forceString) { 

		try {
			var rows = [];
			var tr = tableBody.rows;
			var tr_length = tableBody.rows.length;

			for(var i = 0; i < tr_length; i++) {
				rows.push(
				{
					elem: tr[i], 
					value: getValue(tr[i].cells[spalte], ignoreCase, forceString) 
				});
			}

			rows.sort( function (a, b) {
				return  a.value.localeCompare ?  desc * a.value.localeCompare(b.value) :
				a.value == b.value ? 0 :
				a.value > b.value ? desc : -desc;
			});


			var tCopy = tableBody.cloneNode(false);
			for(var i = 0; i < tr_length; i++) {
				if(zebra) {
					rows[i].elem.className = rows[i].elem.className.replace(/( ?odd)/, "");
					if(i % 2) rows[i].elem.className += ' odd' ;
				}
				tCopy.appendChild(rows[i].elem);
			}
			tableBody.parentNode.replaceChild(tCopy, tableBody);
			tableBody = tCopy;
			return true;
		} catch (e) { alert('General: EvrenSerdar :-))'); }
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


var FOOD_IMAGE = '"data:image/gif;base64,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"';
var OIL_IMAGE = '"data:image/gif;base64,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"';
var STONE_IMAGE = '"data:image/gif;base64,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"';
var STEEL_IMAGE = '"data:image/gif;base64,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"';
var GRAPH_IMAGE = '"data:image/gif;base64,R0lGODlhMAAuAHAAACH5BAEAAPwALAAAAAAwAC4AhwAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAAAj/APcJHLivx6dSBxMiXKiwIcOHnz4NIUiRIJGK+gZmJLhRYMeOFC9WJOhDH7RMdTC5ofPGzSc3b16+8QTzZSaWmFK+0Unz0xt9+kSOnKjPDZEzPnyI6YHGB1OmSdH08CG1KVUfSLFedeMGWsGRF58RwXHjwI0YN86iNYsWbVq3b+OyTYsDzbN9bii60ZfMxw0DMQAAMCCYMAAYgwEcUHFAsYEAKh4bYBw5AOEYDW74KFV04Jloff82hgG58QoAgQMEhtHYAOvIix8PPs0YQOTMn/AWVAbtRgPUglursAzAMuzDBwIbODB5dPHLgwOwZnDjmbIeNz6hOUtYOoDTo703/z7A2sBywIoRx15huLaBFQ1wfOrRI5OYG4ojP1ehODoMwMvBQAQUSYgmGXvGjcffajhgQpYbYpBXHGXQkfafZeRN8AQUBDbAWnmHWSZeYQHc4EZamJzVX3ekEcacdAAeMASHHJZHHnMStrjgYTGceEMmKtoGmWSM/RfDeUdyqMeGPRgg2ms4htgdaj6eOOJj/71o3o0TJDFEEhwOocQQOJ4nYWvsMRbDdjekKJh36qHmWnIGNPBlD5lN4FsDSSSBJwwe4vhaf7ZVGQN7wcm5nJhe9jBmAw2Y9x9gDfTg5QRiDtGkY7Y11mNabqSGGKKsDbEhh0k0wMCR5cXA3HJ2cv94KnOUNXYYm24guiKGNDJZZpkAUkojFE+ASBh7a4I6qm3N/fcljU0eSWFt5TEwYx4cAigdcQD4iAZxsrXmag9MnrdcdC4CiBmYQ/yFpWCMrXAGqJNNSFiLi5Jp3mpDnoaYuTekGuC5thrg1w1nBDBYZZKVp+nArQnWX2zM3aDEqkTWG9i8N6DxXnESZ/kfERnYGCJwhzl2JJ8NMNeiiIJhd0MPhUWG4JYGDKFvnIZ9fO9yAXt4Hn/MriBzGIuBLJmcMvYAbL/BMXYenwaiqzAAac1cs2D4kgdCtO+Z91xiWFIqsIWN6QfXX6fBHOABDCiRxATmBUgcaYrCPSN25yX/dnXW+BHGn3qRzUhjWTi752KpskIxW9j6ydwDYsSBewCYxELR5GtiB0becgxknu2rEhdnQ9b3Fqfef0pAgS0U+v6673k39ApFZS0imnUPR4LL3mPWEih3D9TNbiMMmPaZxJgAki3Y6TOb5156OGZmwARj6llnZgwcwIMGXh6QWaSCbkvpX9i9utirH5rXfc6w9zDjExM4mip5kZZ3ofTmQU/8kUcyD3twZAM6RSpWw/KTk+oUI/2N5wA2wNPMVPUkQd1oOQUsYNw2tKE91alVOBNUnW5gAwZgR1Ux6F55yKdBCIovgkpKAgMCBSgGAlBdM5zgDYbQABuMz4cFhMFf/wJVwB5CSgkb4iGgfIjDC67Mhz043RDqZ0QPGXGBN6AOdYzoQwoecIlwSyEEjegb+bWsT/WbgA+z+MPxtZF7vsliHOuUwr/IsYf1y0ASYFCQKCghAz2gom/WyMXx4UmCW7wjIeOYpx58QA89GEgP9PBH+kyAB3q6ZKUy2QMJ4AmTgbxBJkVJShNSx5N61BxFehAFKAAykLBMYyxnmUZQXlKWsswAEfIQyYrcYA+wqx99XvlKTFlSU8O0pDJhGchn9XIkDeAQyXQ5BBAkAXwgUIIGlJBNDXRTm3/8I8mGkIEpOkqVIxnIDZaUOQ628wnwfMKS4ulOd9ruBumkSAPoAB0FPUCBDvJUwpL4SUliEfSf8kSoP+fgOiXgsyIBAQA7"';
var TITA_IMAGE = '"data:image/gif;base64,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"';
var GOLD_IMAGE = '"data:image/gif;base64,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"';


setTimeout(ptStartup, 5000);