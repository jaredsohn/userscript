// ==UserScript==
// @name           forsaken
// @namespace      test
// @version        001
// @description    test
// @include        *.globalwarfaregame.com/*main_src.php*
// @include        *.apps.facebook.com/globalwarfaregame/*
// ==/UserScript==

var Version = '001';

// Test switches
var DEBUG_TRACE = false;
var DEBUG_BUTTON = true;
var ENABLE_INFO = true;
var ENABLE_CHAT = false;
// End Test switches

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

if (document.URL.search(/apps.facebook.com\/globalwarfaregame/i) >= 0){
  facebookInstance ();
  return;
}
if (document.URL.search(/globalwarfaregame.com/i) >= 0){
  GWwideScreen ();
}

function GWwideScreen(){
	var iFrame = parent.document.getElementsByTagName('IFRAME');
	//iFrame[0].style.minWidth = '1220px';
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
	
    var e = document.getElementById('mainContainer');
	if(e){
		document.getElementById('content').style.minWidth = '1220px';
		for(i=0; i<e.childNodes.length; i++){
			if(e.childNodes[i].id == 'contentCol'){
				e.childNodes[i].style.width = '100%';
				e.childNodes[i].style.margin = '0px';
				e.childNodes[i].style.paddingTop = '50px';
				break;
			}
		}
	}
	var e = document.getElementById('globalContainer');
	if(e){
		e.style.width = '100%';
		if(e.firstChild){
			e.firstChild.style.width = '80%';
			e.firstChild.style.margin = '0 10%';
		}
	}

    var div = searchDOM (document.getElementById('content'), 'node.tagName=="DIV" && node.id.indexOf("rightCol")>=0', 7);
    if (div){
		div.style.display ='none';
	}
    
  }
  setWide();
}

var Options = {
	ptWinIsOpen	:	false,
	ptWinDrag	:	false,
	ptWinPos	:	{},
	ptTrackOpen	:	true,
	includeCity	:	true,
	includeMarching	:	false,
	includeTraining	:	false,
	includeTrainingTotal	:	false,
	overviewAllowOverflow	:	false,
	overviewFontSize	:	12,
	pbgoldenable	:	true,
	pbGoldLimit	:	99,
};

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
  logit ("* Global Warfare Power Tools v"+ Version +" Loaded", true);
  readOptions();
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y;
    saveOptions ();
  }
  
  mainPop = new CPopup ('pt', Options.ptWinPos.x, Options.ptWinPos.y, 550,800, Options.ptWinDrag,
      function (){
        tabManager.hideTab();
        Options.ptWinIsOpen=false;
        saveOptions()
      });
  mainPop.autoHeight (true);  

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  
  AddMainTabLink('TOOLS', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  CollectGold.init();
  CollectOil.init();
  CollectWH.init();
  CollectFood.init();
  ChatPane.init();
  ErrorKiller.init();
  
  if (Options.ptWinIsOpen && Options.ptTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);

}



ptStartup();
