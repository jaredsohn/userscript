// ==UserScript==
// @name           Boite Outils
// @version        1.42
// @namespace      Boite Outils
// @description    Boite a outils, la boite qui sait tout faire ou presque. Par BeWorld
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @resource       PROTOTYPEJS https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js
// @resource 	   URL_CASTLE_BUT 		http://i.imgur.com/MPlZr.png
// @resource 	   URL_CASTLE_BUT_SEL 		http://i.imgur.com/XWR4B.png
// @resource 	   URL_PROVINCE_MAP 		http://i.imgur.com/VE48b.png
// @require 	   http://sizzlemctwizzle.com/updater.php?id=100060
// ==/UserScript==

var Version = '1.42';
var nomonglet = "Bo&icirc;te &agrave; outils";
var DEBUG_BUTTON = false;
var DEBUG_TRACE = false;
var DEBUG_TRACE_DRAG = false;

var MAP_DELAY = 1200;
var ENABLE_TEST_TAB = true;   // Onglet supplémentaire pour Faire de fausse attaque sur soi meme :)

var miseajour = "Traduction, adaptation et ajout par BeWorld - Base repris de PowerTools, merci a l'auteur";
var URL_CASTLE_BUT = GM_getResourceURL('URL_CASTLE_BUT');
var URL_CASTLE_BUT_SEL = GM_getResourceURL('URL_CASTLE_BUT_SEL');
var URL_PROVINCE_MAP = GM_getResourceURL('URL_PROVINCE_MAP');
var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};  


/*** AMELIORATIONS DIVERS SUR LE JEU ***/
// These first 2 functions just throw out the two huge ads at the top of the page - GotBud
function my_func()
{
    try
    {
       
	   var promo = document.getElementById('crossPromoBarContainer');
		promo.style.marginTop = '0px';
		promo.style.backgroundColor = 'black';
		promo.style.color = 'red';
		promo.style.display = 'hidden';
		promo.style.position = 'absolute';
	    promo.style.left = '0px';
		promo.style.top = '9000px';
    }
    catch (zError)
    {
       // alert (zError); //-- Use console.log() in place of alert(), if running Firebug.

    }
}

window.addEventListener ("load", my_func, false);

function my_func2()
{
    try
    {
       
	   var progressBar = document.getElementById('progressBar');
		progressBar.style.marginTop = '0px';
		progressBar.style.backgroundColor = 'black';
		progressBar.style.color = 'red';
		progressBar.style.display = 'hidden';
		progressBar.style.position = 'absolute';
	    progressBar.style.left = '0px';
		progressBar.style.top = '9000px';
    }
    catch (zError)
    {
      //  alert (zError); //-- Use console.log() in place of alert(), if running Firebug.

    }
}

window.addEventListener ("load", my_func2, false);

 var classString;
   classString =   '.attaquer {';
   classString +=      'margin-top:3px;background: url(http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg) no-repeat;';
   classString +=      "}";
   classString +=   '.reconnaissance {';
   classString +=      'margin-top:3px;background: url(http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg) no-repeat;';
   classString +=      "}";
   classString +=   '.retour {';
   classString +=      'margin-top:3px;background: url(http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg) no-repeat;';
   classString +=      "}";
   classString +=   '.transporter {';
   classString +=      'margin-top:3px;background: url(http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg) no-repeat;';
   classString +=      "}"; 
   classString +=    '.modalCurtain {';
   classString +=    'top:53px !important;';
   classString +=    "}";
   classString +=    '.modalBox {';
   classString +=    'top:53px !important;';
   classString +=    "} ";
   classString +=    ".noalliance { display:none !important; } ";
 var Style = document.createElement ('STYLE');
 Style.setAttribute ('type', 'text/css');
 Style.innerHTML = classString;
 document.body.appendChild (Style);

// tabulation Alliance en bas : selectionner par defaut
setTimeout(function() {
 unsafeWindow.directory_changetab(2);
 unsafeWindow.getDirectoryTabAllianceMembers();
 unsafeWindow.track_chrome_btn('Directory_Alliance');
 //return false;

}, 5000);

/**** FIN DES AMELIORATIONS *****/

try {
  eval (GM_getResourceText('PROTOTYPEJS'));
}catch (dontcare){
}

var Options = {
  includeMarching:true,
  EnableFormation:true,
  encRemaining : true,
  maxIdlePop   : false,
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  filPuissance  : 0,
  filPuissanceMax  : 1000000,
  wildType     : 1,
  citySrchFilter :0,
  unownedOnly  : true,
  fixWarnZero  : true,
  fixPageNav   : true,
  mistedOnly   : false,
  hostileOnly  : false,  
  fixTower     : true,
  fixMapDistance: true,
  fixMsgCount  : true,
  enhanceARpts : true,
  allowAlterAR : true,
  enhanceMsging : true,
  ptWinIsOpen  : false,
  ptWin2IsOpen  : false,
  ptWinDrag    : false,
  ptWinPos     : {},
  ptWin2Pos     : {},
  enableFoodWarn : true,
  enableFoodWarnTchat : false,
  foodWarnHours : 24,
  gmtClock : true,
  chatEnhance : true,
  fixKnightSelect : true,
  attackCityPicker : true,
  mapCoordsTop : true,
  dispBattleRounds : true,
  reportDeleteButton : true,
  alertConfig  : {
  	aChat:true, 
	aPrefix:'**** Je suis attaque !!! **', 
	scouting:true, 
	wilds:true, 
	minTroops:1, 
	spamLimit:10, 
	embassy:true, 
	mytroops:true, 
	food:true, 
	defense:true, 
	hq:'',
	sendEmail:false,
	emailAddress:'',
	token:'',
	sendasWhisper:false,
	sendtoAlly:true,
	}
};

//unsafeWindow.pt_Options=Options;

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON; 

var Cities = {};
var Seed = unsafeWindow.seed;
var my = {};
var myBO = {};
var currentName = 'Overview';
var currentName2 = 'Overview1';
var mainPop, mainPop2;
var Tabs = [
  ['Overview', 'R&eacute;sum&eacute;'],
  ['Marches', 'Marches'],
  ['TranspAuto', 'Outils'],
  ['Train' , 'Former'], 
  ['Knights' , 'Chevaliers'],
  ['Search', 'Chercher'],
  ['AllianceList' , 'Joueurs'],
  ['Wilds' , 'TS'],
  ['Info' , 'Info'],
  ['Options' , 'Opts'],
];

if (ENABLE_TEST_TAB) {
var Tabs2 = [
  ['Overview', 'Ressources'],
  ['Overview1', 'Arm&eacute;e'],
  ['Crests', 'Armoiries'],
  ['map', 'Carte'],
  ['Test', 'Test'] 
];
}else {
var Tabs2 = [
  ['Overview', 'Ressources'],
  ['Overview1', 'Arm&eacute;e'],
  ['Crests', 'Armoiries'],
  ['map', 'Carte'],
];
}

//   ['Objets', 'Objets'],

var ptStartupTimer = null;
ptStartupErrorTimer = null;

// example: http://www150.kingdomsofcamelot.com
function GetServerId() {
  var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
  if(m)
    return m[1];
  return '';
}

// example: http://www150.kingdomsofcamelot.com
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

function ptErrorReload (){
  //logit ('*** ptError');
  window.clearTimeout (ptStartupTimer);//Try not to pile up several resends.
  window.clearTimeout (ptStartupErrorTimer);
  //history.go(0);//Sometimes geting resend dialog with this alone. Adding reload code from Attack helper.
	var serverId=GetServerId();
	if (serverId == null){
		history.go(0);
		return;
	}
	var go = 'http://apps.facebook.com/kingdomsofcamelot/?s='+serverId;
	var t = '<FORM target="_top" action="'+ go +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=s value="'+ serverId +'"</form>';
	var e = document.createElement ('div');
	e.innerHTML = t;
	document.body.appendChild (e);
	setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
}

//Code from attack helper.
ReloadWindow:function (){
	var serverId=GetServerId();
	if (serverId == null){
		//history.go(0);
		return;
	}
	var go = 'http://apps.facebook.com/kingdomsofcamelot/?s='+serverId;
	var t = '<FORM target="_top" action="'+ go +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=s value="'+ serverId +'"</form>';
	var e = document.createElement ('div');
	e.innerHTML = t;
	document.body.appendChild (e);
	setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
}

function ptStartup (){

  if(ptStartupTimer != null ) {
    ptStartupErrorTimer = window.setTimeout (ptErrorReload, 45000);
  }
  window.clearTimeout (ptStartupTimer);
  if (document.getElementById('ptOfficial') != null)  // button already present! (shouldn't happen)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    ptStartupTimer = window.setTimeout (ptStartup, 2000);
    return;
  }  else {
    if(ptStartupErrorTimer != null) {
      window.clearTimeout (ptStartupErrorTimer);
    }
  }
  
  
  
  
  readOptions();

  Seed = unsafeWindow.seed;
GM_addStyle ('.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .hostile td { background:crimson; }.friendly td{background:lightblue; }.ally td{background:royalblue; }\
    .Hostile td { background:crimson; }.Friendly td{background:lightblue; }.Ally td{background:royalblue; }\
    .neutral td { background:lightgreen; }.unaligned td { background:gold; }\
    .Neutral td { background:lightgreen; }.Unaligned td { background:gold; }\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    div.ptDiv {background-color:#f0f0f0;}\
    table.ptTab tr td {border:none; background:none; white-space:nowrap;}\
    table.ptTabPad tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none;}\
    table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptTabOverview tr td {border:1px none none solid none; white-space:nowrap; padding: 1px 2px;  font-size:11px;}\
    table.ptTabOverview7 tr td {border:1px none none solid none; white-space:nowrap; padding: 1px 2px;  font-size:11px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .ptOddrow {background-color:#eee}\
    .ptstat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .ptStatLight {color:#ddd}\
    .ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {border-size:3px; border-color:#000;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    .ptChatWhisper {}\
    .ptChatAlliance {}\
    .ptChatGlobal {background-color: #fdd}\
    .ptChatIcon {border: 2px inset red}\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    span.boldDarkRed {color:#600; font-weight:bold}\
    a.ptButton20 {color:#ffff80}\
    .matTab {}\
    .matTabSel {font-size: 13px; color: #000; border: 1px; border-style: solid solid none solid; margin:4px; padding-left:5px; padding-right:5px; background: #eed; font-weight:bold}\
    .matTabNotSel {font-size: 13px; color: #fff; border: 1px; border-style: solid solid none solid; border-color: #000; margin:4px; padding-left:5px; padding-right:5px; background: #1e66bd; font-weight:bold}\
    tr.CPopupTop td { background-color:#dde; border:none; height: 21px;  padding:0px; }\
    .id2_CPopupTop td { background-color:#ffffff;}\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px;}\
    .CPopup .id2_CPopMain { background-color:#8ff; }\
    .CPopup  { border:3px ridge #666 }\
    .idp2_CPopup { opacity:0.9; }');
  // check for prototype.js ...      
  try {
    var a = Object.clone ({}); 
  } catch (e){
    var pop = new CPopup ('h6f', 150,200,470,150, false, function (){delete pop});
    pop.getTopDiv().innerHTML = '<CENTER>ERREUR DE CHARGEMENT !</center>';
    pop.getMainDiv ().innerHTML = '<DIV style="font-size:18px; font-weight:bold;"><CENTER><p>The dependency "prototype.js" was not found.<br>Reinstaller <a  href="https://addons.mozilla.org/fr/firefox/addon/greasemonkey/versions/" target=_blank>GreaseMonkey version 0.80</a></div>';
    pop.setZindex(111115);
    pop.show(true);
  }
    
  window.name = 'PT';
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
//logit ( 'Options.ptWinPos: '+ inspect (Options.ptWinPos, 5, 1)); 
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y+c.height;
    saveOptions ();
  }
  if (Options.ptWin2Pos==null || Options.ptWin2Pos.x==null|| Options.ptWin2Pos.x=='' || isNaN(Options.ptWin2Pos.x)){
      var c = getClientCoords (document.getElementById('main_engagement_tabs'));
      Options.ptWin2Pos.x = c.x+4;
      Options.ptWin2Pos.y = c.y+c.height;
      saveOptions ();
  }
  mainPop = new CPopup ('idp', Options.ptWinPos.x, Options.ptWinPos.y, 749,700, Options.ptWinDrag, 
      function (){
        my[currentName].hide();
        Options.ptWinIsOpen=false; 
        saveOptions()
      });
  
  var mainDiv = mainPop.getMainDiv();
  mainPop.getTopDiv().innerHTML = '<TABLE cellspacing=0 width=100%><TR class=CPopupTop valign=bottom><TD><SPAN id=idTabs></span></td><TD align=right>'+ Version +'&nbsp;</td></tr></table>';
  
  
  
  mainPop2 = new CPopup ('idp2', Options.ptWin2Pos.x, Options.ptWin2Pos.y, 749,350, true, 
        function (){
          myBO[currentName2].hide();
          Options.ptWin2IsOpen=false; 
          saveOptions();
      });
  
  
  var mainDiv2 = mainPop2.getMainDiv();
  mainPop2.getTopDiv().innerHTML = '<TABLE cellspacing=0 width=100%><TR class=CPopupTop valign=bottom><TD><SPAN id=idTabs2></span></td><TD align=right>'+ Version +'&nbsp;</td></tr></table>';
 
  var eTabs2 = document.getElementById('idTabs2');
 for (k=0; k<Tabs2.length; k++){
     var a=document.createElement('a');
     a.className='matTabNotSel';
     a.id = 'ab'+ Tabs2[k][0];
     a.innerHTML='<span id="spp'+ Tabs2[k][0] +'" class="matTab">'+ Tabs2[k][1] +'</span>';
     eTabs2.appendChild(a);
     a.addEventListener('click', clickedTab2, false);
     myBO[Tabs2[k][0]].init();
     cont = myBO[Tabs2[k][0]].getContent();
     cont.style.display = 'none';
     mainDiv2.appendChild(cont);
 }


  var eTabs = document.getElementById('idTabs');
  for (k=0; k<Tabs.length; k++){
    var a=document.createElement('a');
    a.className='matTabNotSel';
    a.id = 'aa'+ Tabs[k][0];
    a.innerHTML='<span id="sp'+ Tabs[k][0] +'" class="matTab">'+ Tabs[k][1] +'</span>';
    eTabs.appendChild(a);
    a.addEventListener('click', clickedTab, false);
    my[Tabs[k][0]].init();
    cont = my[Tabs[k][0]].getContent();
    cont.style.display = 'none';
    mainDiv.appendChild(cont);
  }

  setTabStyle (document.getElementById ('aaOverview'), true);
  my.Overview.getContent().style.display = 'block';
  
  setTabStyle (document.getElementById ('abOverview1'), true);
  myBO.Overview1.getContent().style.display = 'block';
  
   
  AllianceReports.init ();

  messageNav.init();
  TowerAlerts.init();

  MessageCounts.init ();
  
  FoodAlerts.init();
  
 ChatStuff.init ();
     AttackDialog.init(); 
    
    
    battleReports.init ();
    CoordBox.init ();
 
  
  GMTclock.init ();
  
  MapDistanceFix.init ();
  WarnZeroAttack.init ();
  PageNavigator.init ();
  
  
  exportToKOCattackBO.init();
  
 if (Options.ptWin2IsOpen){
  mainPop2.show (true);
  myBO[currentName2].show();
 }
  if (Options.ptWinIsOpen){
    mainPop.show (true);
    my[currentName].show();
  }
  window.addEventListener('unload', onUnload, false);

  if (Options.fixTower)
    TowerAlerts.enableFixTarget(true);
    
    TowerAlerts.enableFixFalseReports(true);
    
  TowerAlerts.setPostToChatOptions(Options.alertConfig);
   
   AddMainTabLink2("Statistiques", eventHideShow2, mouseMainTab2);
   
   AddMainTabLink(nomonglet, eventHideShow, mouseMainTab);

   
  }


function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  Options.ptWin2Pos = mainPop2.getLocation();
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
};


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
      msg = msg.replace (/(Attaquants.*?<span.*?)<\/div>/im, '$1<BR>Rounds: '+ rslt.rnds +'</div>');
    }
    return msg;
  },
  hook : function (msg, rslt){
    if (rslt.rnds && Options.dispBattleRounds){
      msg = msg.replace (/(Attaquants <span.*?)<\/div>/im, '$1<BR>Rounds: '+ rslt.rnds +'</div>');
    }
    return msg;
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
    e.focus();
  },

        
  chatDivContentHook : function (msg){
    var t = ChatStuff; 
    var class = '';
    var m = /div class='info'>.*<\/div>/im.exec(msg);
    if (m == null)
      return msg;
    if (m[0].indexOf('chuchote') >= 0)
      class = 'ptChatWhisper';
    else if (m[0].indexOf('to the alliance')>= 0 || m[0].indexOf("alliance:") >= 0)
      class = 'ptChatAlliance'; 
    else  
      class = 'ptChatGlobal'; 
    msg = msg.replace ("class='content'", "class='content "+ class +"'");
       
    if(document.getElementById("mod_comm_list1"))
    { 
      document.getElementById("mod_comm_list1").style.backgroundColor = '#99AADF';
    }
    
    if (msg.indexOf('claimAllianceChat')<0){
      msg = msg.replace (/([0-9]{1,3})\s*(,|-)\s*([0-9]{1,3})/img, '<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">($1$2$3)</a>');
    }
      
    var m = /(Lord|Lady) (.*?)</im.exec(msg);
    if (m != null)
      msg = msg.replace (/<img (.*?>)/img, '<A onclick=\"ptChatIconClicked(\''+ m[2] +'\')\"><img class=\"ptChatIcon\" $1</a>');
    return msg;
  },
}


var anticd = {
  isInited : false,
  KOCversion : '?',
  
  init: function (){
    if (this.isInited)
      return this.KOCversion;
      if (unsafeWindow.cm)  unsafeWindow.cm.cheatDetector.detect = eval ('function (){}');
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


function displayReport (rptid, side){
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.rid = rptid;
  params.side = side;
  
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchReport.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
      //logit (inspect (rslt, 5, 1));      
      if (notify)
        notify (rslt.errorMsg);
    },
    onFailure: function () {
      if (notify)
        notify ('AJAX ERROR');
    },
  });
} 

var knightRoles = [
  ['Contremaitre', 'politics', 'Pol'],
  ['Mar&eacute;chal', 'combat', 'Com'],
  ['Alchimiste', 'intelligence', 'Int'],
  ['R&eacute;gisseur', 'resourcefulness', 'Res'],
];



/*************** TRANSPORT **********/
my.TranspAuto = {
 cont : null,
 displayTimer : null,
 state : null,
 curTabBut : null,
 curTabName : null,
 sourceCity : {},
 destinationCity : {},
 rows : [],

 init : function (){
   var t = my.TranspAuto;
   t.cont = document.createElement('div');
   t.state = null;
   return t.cont;
 },
  getContent : function (){
    var t = my.TranspAuto;
    return t.cont;
  },
  hide : function (){
    var t = my.TranspAuto;
    t.state = null;
    clearTimeout (t.displayTimer);
  },
  
  show : function (){  
     var t = my.TranspAuto;
       
     t.cont.innerHTML = '<TABLE class=ptTab align=center><TR><TD><INPUT class=pbSubtab ID=ptTRPSubA type=submit value=TRANPORTER></td>\
           <TD><INPUT class=pbSubtab ID=ptTRPSubM type=submit value=REASSIGNER></td>\
           <TD><INPUT class=pbSubtab ID=ptTRPSubD type=submit value=ATTAQUER></td>\
           <TD><INPUT class=pbSubtab ID=ptTRPSubB type=submit value="RAPPORTS ALLIANCE"></td><TD><INPUT style="display:none;" class=pbSubtab ID=ptTRPSubC type=submit value="MES RAPPORTS"></td></tr></table><HR class=ptThin>\
       <DIV id=ptTRPOutput style="margin-top:10px; background-color:white; height:300px"></div>';
       
      t.transportDiv = document.getElementById('ptTRPOutput'); 
      
     document.getElementById('ptTRPSubA').addEventListener('click', e_butSubtab, false);
     document.getElementById('ptTRPSubM').addEventListener('click', e_butSubtab, false);
     document.getElementById('ptTRPSubB').addEventListener('click', e_butSubtab, false);
     document.getElementById('ptTRPSubC').addEventListener('click', e_butSubtab, false);
     document.getElementById('ptTRPSubD').addEventListener('click', e_butSubtab, false);
     
     changeSubtab (document.getElementById('ptTRPSubA'));  // permet de lancer par defaut le tranport
       
        
      function e_butSubtab (evt){
     
           changeSubtab (evt.target);   
       }
    
       function changeSubtab (but){
          t.transportDiv.innerHTML="";
           if (but == t.curTabBut)
             return;
           if (t.curTabBut){
             t.curTabBut.className='pbSubtab'; 
             t.curTabBut.disabled=false;
           }
           t.curTabBut = but;
           but.className='pbSubtab pbSubtabSel'; 
           but.disabled=true;
           t.curTabName = but.id.substr(8);
           t.show2();
       }  
     
   },
   show2 : function (){
       var t = my.TranspAuto;
       t.state = null;
       clearTimeout (t.displayTimer);
       if (t.curTabName == 'M')
         t.showREASSIGN();
       if (t.curTabName == 'D')
         t.showATTAQUE();
       if (t.curTabName == 'B')
         t.showRAPPORT(1);
       if (t.curTabName =='C')
         t.showMESRAPPORT();
       else
         t.showTRP();
  },
  
  /************MODULE REASSIGNAITON *************/
  showATTAQUE : function() {
      var t = my.TranspAuto;
      var rownum = 0;
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
            m.push ('</td>');
            if (noTotal){
              m.push ('<TD');
              m.push (style);
              m.push ('>&nbsp;</td>');
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
      
      
      if (t.state == null) {  
        m = "<DIV class=ptstat>ATTAQUER rapidement</div>";
        m +="<div id='statpourREA'></div>";
        m += "<TABLE width=400 class=ptTab border=0 align=center><TR><TD colspan=3><DIV id=divSTRtop></div></td></tr>\
          <tr align=center valign=top><td colspan=1 width=33%><b><u>Source</b></u><br><span id=srcRptspeedcity></span></td>\
          <td colspan=1 width=33%><b>&nbsp;</u></b></td>\
          <td colspan=1 width=33%><b><u>Destination</b></u><br><span id=desRptspeedcity></span></tr>\
          <tr align=center valign=top><td><div id=REAstatsource></div></td>\
          <td><table cellspacing=0 cellpadding=0 width=80%>";
           for (r=1; r<13; r++){
  	     m += '<tr><td align=right><img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg></td><td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAnbunit'+r+'" type=text size=7 value="0"></td></tr>';
     	}
          m += "</table></td><td>X:<input type=text id=BOAttackX size=3>&nbsp;Y:<input type=text id=BOAttackY size=3><br><input type=button id=REAaction value='Valider'></td></tr><td colspan=3><div id=ptREAStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>";
          
          
        t.transportDiv.innerHTML = m; 
        t.statpourREA = document.getElementById ('statpourREA');
        t.statutREA = document.getElementById ('ptREAStatus');
        t.AttackX = document.getElementById ('BOAttackX');
        t.AttackY = document.getElementById ('BOAttackY');
        t.actionREA = document.getElementById ('REAaction');
        t.actionREA.addEventListener ('click', t.clickATTAQUEDo, false);
        var dcp0 = new CdispCityPicker ('ptspeed0', document.getElementById('srcRptspeedcity'), false, t.clickREACitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
        t.state = 1;
      }
      /* PARTIE DES CHIFFRES DES TROUPES */
      rows[0]=[];
      m = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
               m += '<TD width=81><B>'+ Cities.cities[i].name.substring(0,10) +'</b></td>';
      }
      for (r=1; r<13; r++){
              rows[r] = [];
              for(i=0; i<Cities.numCities; i++) {
                cityID = 'city'+ Cities.cities[i].id;
                rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
              }
      }
      for (r=1; r<13; r++){
       m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg>', rows[r]);
      }
      m += "</table>";
      t.statpourREA.innerHTML = m;
          
      t.displayTimer = setTimeout (t.showREASSIGN, 10000);
      //t.transportDiv.innerHTML = 'Reassigner des troupes - bientot disponible !';
    },
   clickATTAQUEDo: function() {
     var t = my.TranspAuto;
     t.statutREA.innerHTML = '';
     // on force la ville source !
     var cityA=null;
     cityA=ById('citysel_'+ (t.sourceCity.idx + 1));
     nHtml.Click(cityA);
     var totalunit=0;
     // faire les test d'unité !
     for (r=1; r<13; r++){
         if (parseInt(ById("REAnbunit"+r).value) > parseInt(ById("REAdestunit"+r).value)) {
           ById("REAnbunit"+r).style.backgroundColor="red";
           return false;
         
         }
         totalunit=totalunit+parseInt(ById("REAnbunit"+r).value);
         ById("REAnbunit"+r).style.backgroundColor="";
     }
     
     var errMsg = "";
     if (isNaN (t.AttackX.value) ||t.AttackX.value<0 || t.AttackX.value>749)
           errMsg = "X doit &ecirc;tre entre 0 et 749<BR>"; 
     if (isNaN (t.AttackY.value) || t.AttackY.value<0 || t.AttackY.value>749)
      errMsg += "Y doit &ecirc;tre entre 0 et 749<br>";
     
     
     if (errMsg != "") {
           t.statutREA.innerHTML = '<FONT COLOR=#550000>"+ errMsg +"</font>';
          return;
     }
     
     
     
     
     if (totalunit==0) {
        t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible  d\'attaquer avec 0 unit&eacute;e... pfff !.</font>';
          return;
     }
     var niveauPointRall=parseInt(getCityBuilding (t.sourceCity.id, 12).maxLevel); // 12=Point de ralliement
    
     if (niveauPointRall==11) {
      var maxtroupe=150000;
     } else {
      var maxtroupe=niveauPointRall*10000;
     }
     if (totalunit>maxtroupe) {
      t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible d\'attaquer avec plus de '+maxtroupe+' unit&eacute;es a la fois.</font>';
      return;
     }
     
     t.actionREA.disabled=true;
     var x=t.AttackX.value;
     var y=t.AttackY.value;
     unsafeWindow.Modal.hideModalAll();
      
     unsafeWindow.modal_attack(4,x,y);
     
     window.setTimeout(function() {
    
     for (r=1; r<13; r++){
       if (ById("REAnbunit"+r).value>0) {
        var unit = ById('modal_attack_unit_ipt'+r);
        unit.value = ById("REAnbunit"+r).value;
        var evt = document.createEvent("KeyboardEvent");
        if(evt.initKeyboardEvent) {
  			evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
  	  } else {
  			evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
  	  }
        unit.dispatchEvent(evt);   
       }
     }
     
     ById("modal_attack_knight").selectedIndex=1;
     
     unsafeWindow.modal_attack_do();
     
     window.setTimeout(function() {
    	   	      t.actionREA.disabled=false;
    	   	      t.statutREA.innerHTML = "<center>Attaque envoy&eacute;e</center>";

      },1000);
     
     }, 500); // Fin settime modal
      
      
      
   },
 
  
  
  
  
  /************MODULE REASSIGNAITON *************/
  showREASSIGN : function() {
    var t = my.TranspAuto;
    var rownum = 0;
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
          m.push ('</td>');
          if (noTotal){
            m.push ('<TD');
            m.push (style);
            m.push ('>&nbsp;</td>');
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
    
    
    if (t.state == null) {  
      m = "<DIV class=ptstat>R&eacute;assigner des troupes d'une ville a une autre</div>";
      m +="<div id='statpourREA'></div>";
      m += "<TABLE width=400 class=ptTab border=0 align=center><TR><TD colspan=3><DIV id=divSTRtop></div></td></tr>\
        <tr align=center valign=top><td colspan=1 width=33%><b><u>Source</b></u><br><span id=srcRptspeedcity></span></td>\
        <td colspan=1 width=33%><b><u>R&eacute;assigner</u></b><br><input type=button id=REAaction value='Valider'></td>\
        <td colspan=1 width=33%><b><u>Destination</b></u><br><span id=desRptspeedcity></span></tr>\
        <tr align=center valign=top><td><div id=REAstatsource></div></td>\
        <td><table cellspacing=0 cellpadding=0 width=80%>";
         for (r=1; r<13; r++){
	     m += '<tr><td align=right><img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg></td><td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAnbunit'+r+'" type=text size=7 value="0"></td></tr>';
   	}
        m += "</table></td><td><div id=REAstatdest></div></td></tr><td colspan=3><div id=ptREAStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>";
        
        
      t.transportDiv.innerHTML = m; 
      t.statpourREA = document.getElementById ('statpourREA');
      t.statutREA = document.getElementById ('ptREAStatus');
      t.actionREA = document.getElementById ('REAaction');
      t.actionREA.addEventListener ('click', t.clickReassigneDo, false);
      var dcp1 = new CdispCityPicker ('ptspeed1', document.getElementById('desRptspeedcity'), false, t.clickREACityDestinationSelect, 1);
      var dcp0 = new CdispCityPicker ('ptspeed0', document.getElementById('srcRptspeedcity'), false, t.clickREACitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
      t.state = 1;
    }
    /* PARTIE DES CHIFFRES DES TROUPES */
    rows[0]=[];
    m = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
    for(i=0; i<Cities.numCities; i++) {
             m += '<TD width=81><B>'+ Cities.cities[i].name.substring(0,10) +'</b></td>';
    }
    for (r=1; r<13; r++){
            rows[r] = [];
            for(i=0; i<Cities.numCities; i++) {
              cityID = 'city'+ Cities.cities[i].id;
              rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
            }
    }
    for (r=1; r<13; r++){
     m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg>', rows[r]);
    }
    m += "</table>";
    t.statpourREA.innerHTML = m;
        
    t.displayTimer = setTimeout (t.showREASSIGN, 10000);
    //t.transportDiv.innerHTML = 'Reassigner des troupes - bientot disponible !';
  },
 clickReassigneDo: function() {
   var t = my.TranspAuto;
   t.statutREA.innerHTML = '';
   // on force la ville source !
   var cityA=null;
   cityA=ById('citysel_'+ (t.sourceCity.idx + 1));
   nHtml.Click(cityA);
   var totalunit=0;
   // faire les test d'unité !
   for (r=1; r<13; r++){
       if (parseInt(ById("REAnbunit"+r).value) > parseInt(ById("REAdestunit"+r).value)) {
         ById("REAnbunit"+r).style.backgroundColor="red";
         return false;
       
       }
       totalunit=totalunit+parseInt(ById("REAnbunit"+r).value);
       ById("REAnbunit"+r).style.backgroundColor="";
   }
   
   if (t.sourceCity.id==t.destinationCity.id) {
         t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible sur les memes villes !.</font>';
        return;
   }
   if (totalunit==0) {
      t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible de reassigner avec 0 unit&eacute;e... pfff !.</font>';
        return;
   }
   var niveauPointRall=parseInt(getCityBuilding (t.sourceCity.id, 12).maxLevel); // 12=Point de ralliement
  
   if (niveauPointRall==11) {
    var maxtroupe=150000;
   } else {
    var maxtroupe=niveauPointRall*10000;
   }
   if (totalunit>maxtroupe) {
    t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible de reassigner plus de '+maxtroupe+' unit&eacute;es a la fois.</font>';
    return;
   }
   
   t.actionREA.disabled=true;
   var x=t.destinationCity.x;
   var y=t.destinationCity.y;
   unsafeWindow.Modal.hideModalAll();
    
   unsafeWindow.modal_attack(5,x,y);
   
   window.setTimeout(function() {
  
   for (r=1; r<13; r++){
     if (ById("REAnbunit"+r).value>0) {
      var unit = ById('modal_attack_unit_ipt'+r);
      unit.value = ById("REAnbunit"+r).value;
      var evt = document.createEvent("KeyboardEvent");
      if(evt.initKeyboardEvent) {
			evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  } else {
			evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  }
      unit.dispatchEvent(evt);   
     }
   }
   
   ById("modal_attack_knight").selectedIndex=0;
   
   unsafeWindow.modal_attack_do();
      window.setTimeout(function() {
  	   	      t.actionREA.disabled=false;
  	   	      t.statutREA.innerHTML +="Fini !";
  	   	      //t.showREASSIGN(); // on force le rafraichissement
  	   	      //on efface le nbunit
		      //for (r=1; r<13; r++){
		      //     ById("REAnbunit"+r).value="0";
		      //}
		      //window.setTimeout(function() { t.show2(); }, 2000);
	},1000);
   
   }, 500); // Fin settime modal
    
    
    
 },
 
 clickREACitySourceSelect : function (city){
   var t = my.TranspAuto;
   t.sourceCity = city; 
   // on remplit les stat du DIV source
   //on efface le nbunit
   for (r=1; r<13; r++){
     ById("REAnbunit"+r).value="0";
   }
   var m="";
   m="<table cellspacing=0 cellpadding=0 width=80%>";
   var cityID = 'city'+ t.sourceCity.id;
   for (r=1; r<13; r++){   
     m += '<tr><td align=right><img title="'+unsafeWindow.unitcost['unt'+r][0]+'" height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg></td>\
           <td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAdestunit'+r+'" type=text size=7 readonly value="'+parseInt(Seed.units[cityID]['unt'+r])+'">&nbsp;\
           <input type=button value=">" id="REApdestunit'+r+'"  style="border:1px solid black;height:16px;font-size:11px;"></td></tr>';
   }
   m += "</table>";

   ById("REAstatsource").innerHTML = m;
   
   for (r=1; r<13; r++){
     ById("REApdestunit"+r).addEventListener ('click', function() {
     
       
       var nomcha=this.id.replace("REApdest","REAdest");
       var nomcha2=this.id.replace("REApdestunit","REAnbunit");
     
       ById(nomcha2).value=0; // on met à 0
       
       var niveauPointRall=parseInt(getCityBuilding (t.sourceCity.id, 12).maxLevel); // 12=Point de ralliement
       if (niveauPointRall==11) {
          var maxtroupe=150000;
       } else {
          var maxtroupe=parseInt(niveauPointRall*10000);
       }
       var nbunitto=0;
       for (r=1; r<13; r++) {
         nbunitto+=parseInt(ById("REAnbunit"+r).value);
       }
       //console.log("Max Troupe : " + maxtroupe + " - Nbunuit : " +nbunitto);
       var libre = parseInt(maxtroupe - nbunitto);
       //console.log("libre : " + libre);
       //  on click et on met le max de troupe dispo suivant le point de ralliement
       if (ById(nomcha).value>=libre) {
         ById(nomcha2).value = libre;
       }  else {
         ById(nomcha2).value= ById(nomcha).value;
       }
 
       
       
      }, false);
   }
   
   setTimeout (function (){ 
     var cityA=null;
     cityA=ById('citysel_'+ (city.idx + 1));
     nHtml.Click(cityA);
     }, 0);
   },
 clickREACityDestinationSelect : function (city){
    var t = my.TranspAuto;
    t.destinationCity = city;
    // on remplit les stat du DIV destination
    var m="";
    m="<table cellspacing=0 cellpadding=0 width=80%>";
    for (r=1; r<13; r++){
         cityID = 'city'+ t.destinationCity.id;
         m += '<tr><td align=right><img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg></td><td align=left><input style="border:1px solid black;height:16px;font-size:11px;" type=text size=7 readonly value="'+parseInt(Seed.units[cityID]['unt'+r])+'"></td></tr>';
    }
    m += "</table>";
    ById("REAstatdest").innerHTML = m;
    //t.destinationCityx.value=t.destinationCity.x;
    //t.destinationCityy.value=t.destinationCity.y;
    //t.TTbutTransport.disabled=false;
  },  
   
   
    /************MODULE RAPPORT ALLIANCE *************/  
  showMESRAPPORT : function(pageNum) {
     var t = my.TranspAuto;

     // t.transportDiv.innerHTML = "Recherche en cours...";
     unsafeWindow.Modal.hideModalAll();
       
     t.transportDiv.innerHTML = '<div class="modal_msg_body_hd"><div id="modal_msg_tabs"><a id="modal_msg_tabs_report" onclick="Messages.listReports();return false;"></a></div><div id="modal_msg_listwrap" class="modal_msg_listwrap clearfix">\
     <div style="min-height: 460px;" id="modal_msg_list" class="modal_msg_list">\
     <div class="modal_msg_reports"></div></div>\
     <div id="modal_msg_links"></div>\
     <div id="modal_msg_list_actions"></div>\
     <div style="float: none;" id="modal_msg_list_pagination"></div>\
     <div style="display:none;" id="modal_msg_write"></div>\
     <div style="display:none;" id="modal_msg_view"></div>\
     </div></div>';
 
  
     setTimeout(function() {
       unsafeWindow.modal_messages();
       
       unsafeWindow.track_chrome_btn("messages_btn");
       setTimeout(function() {
        unsafeWindow.Messages.listReports();
        
        
         unsafeWindow.Modal.hideModalAll();
       },500);
      
       
       },100);
     
     
   },
  /************MODULE RAPPORT ALLIANCE *************/  
  showRAPPORT : function(pageNum) {
     var t = my.TranspAuto;

     t.transportDiv.innerHTML = "Recherche en cours...";

     var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
         if (pageNum)  params.pageNo = pageNum;
         params.group = "a";
         new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
           method: "post",
           parameters: params,
           onSuccess: function (rslt) {
           
           
             //displayReports (rslt.arReports, rslt.arPlayerNames, rslt.arAllianceNames, rslt.arCityNames, rslt.totalPages);
		var ar=rslt.arReports;
		var msg = new Array();
		var playerNames=rslt.arPlayerNames;
		var cityNames=rslt.arCityNames;
		var totalPages=rslt.totalPages;
             	var allianceNames=rslt.arAllianceNames;
                var myAllianceId = getMyAlliance()[0];
                if (matTypeof(ar) != 'array') {
      		 msg.push ("<STYLE>.msgviewtable tbody .myCol div {margin-left:5px; overflow:hidden; white-space:nowrap; color:#000}\
            .msgviewtable tbody .myHostile div {font-weight:600; color:#600}\
            .msgviewtable tbody .myGray div {color:#666}\
            .msgviewtable tbody .myRein div {color:#050}\
            .msgviewtable tbody .myWarn div {font-weight:600; color:#442200}\
            </style>");
               msg.push("<div id='allianceContent' class='allianceboxwrap'><div class='modal_msg_reports'><a href='javascript:void(0);' id=clickclick onclick='allianceReports();'><img src='http://cdn1.iconfinder.com/data/icons/momenticons-gloss-basic/momenticons-gloss-basic/16/arrow-refresh.png'> Actualiser</a>")
               if (Options.allowAlterAR)
	                 msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
	               else
	                 msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
    
               
               msg.push("<table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
         	  msg.push("<thead><tr><td width=105>Date</td><td width=40>Type</td><td width=150>Attaquant</td><td>Cible</td><td>Voir</td><td colspan=2>Dist. ville</tr></thead><tbody>");
     		var rptkeys = unsafeWindow.Object.keys(ar);
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
		
		          msg.push ('<tr valign=top');
		          if (i%2 == 0)
		            msg.push(" class=stripe");
		          msg.push("><TD class="+ colClass +"><div>");
		          msg.push(unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime));
		          msg.push("</div></td><TD class="+ colClass  +"><div>");
		          rpt.marchType = parseInt(rpt.marchType);
		          if (rpt.marchType == 1)
		            msg.push (unsafeWindow.g_js_strings.commonstr.transport);
		          else if (rpt.marchType == 3)
		            msg.push (unsafeWindow.g_js_strings.commonstr.scout);
		          else
		            msg.push (unsafeWindow.g_js_strings.commonstr.attack);
		
		          // attacker ...
		          msg.push ("</div></td><TD class="+ colClass +"><div>");
		          if (parseInt(rpt.side1PlayerId) != 0)
		            msg.push('<a onclick=getInfoForAnUser("'+parseInt(rpt.side1PlayerId)+'");>'+escape(playerNames["p" + rpt.side1PlayerId])+"</a>");
		          else
		          msg.push ('?Unknown?');
		          msg.push ('&nbsp;<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ rpt.side1XCoord +','+ rpt.side1YCoord +')</a><bR>');
		          if (rpt.side1AllianceId != myAllianceId){
		            msg.push (allianceNames['a'+rpt.side1AllianceId]);
		            msg.push (' (');
		            msg.push (getDiplomacy(rpt.side1AllianceId));
		            msg.push (')');
		          } else {
		            msg.push ('<BR>');
		          }
		          msg.push ('</div></td>');
		
		          // cible ...
		          msg.push ("<TD class="+ colClass  +"><DIV>");
		          var type = parseInt(rpt.side0TileType);
		
		          if (type < 50){                              // pour la TS
		            msg.push(unsafeWindow.g_mapObject.types[type].toString().capitalize());
		            msg.push(" Lvl " + rpt.side0TileLevel)
		            if (parseInt(rpt.side0PlayerId) != 0) {   // IF OWNED, show owner ...
		              msg.push (' [');
		  			  msg.push ('<a onclick=getInfoForAnUser("'+parseInt(rpt.side0PlayerId)+'");>' + escape(playerNames["p" + rpt.side0PlayerId])+'</a>');
		            
		              msg.push ('] ');
		            }
		          } else {
		            if (parseInt(rpt.side0PlayerId) == 0) {   //  barb
		              msg.push(unsafeWindow.g_js_strings.commonstr.barbariancamp);
		              msg.push(" Lvl " + rpt.side0TileLevel)
		            } else {        // city
		              msg.push ('<a onclick=getInfoForAnUser("'+ rpt.side0PlayerId+'");>' + escape(playerNames["p" + rpt.side0PlayerId])+'</a>');
		              
		              msg.push (' - ');
		              msg.push (cityNames['c'+ rpt.side0CityId]);
		            }
		          }
		          
		          msg.push ('&nbsp;<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ rpt.side0XCoord +','+ rpt.side0YCoord +')</a>');
		
		           if (rpt.side0AllianceId!=0 && rpt.side0AllianceId!=myAllianceId){
		            msg.push ('<BR>');
		            msg.push (allianceNames['a'+rpt.side0AllianceId]);
		            msg.push (' (');
		            msg.push (targetDiplomacy);
		            msg.push (')');
		          }
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
		          msg.push(");return false;'><img border=0 src='http://cdn1.iconfinder.com/data/icons/woothemesiconset/16/search_button.png'></a></div></td></tr>");
        	  }
                 msg.push("</tbody></table></div>");
		}
		msg.push("</div><div id='modal_report_list_pagination'></div></div>");
      		t.transportDiv.innerHTML = msg.join("");
    
                if (pageNum) {
	           unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports", pageNum)
	         } else {
	           unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports", 1)
      		}
   		t.transportDiv.innerHTML += "<br><hr><br>NOTE : Ceci est une version de BETA-test.... (pas stable)<br>Si vous rencontrez des pb, merci de revenir sur un autre onglet de Boite a Outils.";
     
           },
           onFailure: function (rslt) {
           },
    }, false);
       
  },
  
  
  
  /************MODULE TRANSPORT *************/
  showTRP : function (){
   var rownum = 0;
   var t = my.TranspAuto;
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
      m.push ('</td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('>&nbsp;</td>');
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
    dt = new Date ();
    dt.setTime (Seed.player.datejoinUnixTime * 1000);
    if (t.state == null) {  
      m = "<DIV class=ptstat>Transporter des marchandises d'une ville a une autre</div>";
      m +="<div id='statpourTr'></div>";
      m += "<TABLE width=100% class=ptTab border=0><TR><TD colspan=2><DIV id=divSTRtop></div></td></tr>\
       <tr align=center><td colspan=2><HR></td></tr>\
       <tr align=center valign=top><td colspan=1 width=50%><b><u>Source</b></u><br><span id=srcptspeedcity></span></td>\
       <td colspan=1 width=50%  rowspan=2><b><u>Destination</b></u><br><span id=desptspeedcity></span><br>\
       Ou des coordonn&eacute;es <br>X: <input type=text size=4 id=typetrpx value=0>&nbsp;Y: <input type=text size=4 id=typetrpy value=0><br><a href='javascript:void();' id='chargelistelieux'>Membres</a> : <select id='listeFavori'></select><br><br><INPUT id='ptttButTransport' type=submit value='Transporter' style='font-weight:bold'>\
       </td></tr>\
       <tr align=center><td colspan=1>Unit&eacute : <select id=typetrp><option selected value='1'>Unite de ravitaillement</option><option selected value='9'>Wagon</option><option value='7'>Cavalerie</option><option value='8'>Cavalerie lourde</option></select>\
       <br>Quantit&eacute; : <input type=text size=6 value='100' id='Choixnbwagon'><input type=button id='trswagmax' value='Max'\><br><i>(la quantit&eacute de ressource est le maximun des unit&eacute;s choisies)</i>\
       <br><b>Type de ressource :</b><br><input type=radio id='ChoixRess0' name='ChoixRess' value='gold'> Or\
       <input type=radio id='ChoixRess1' name='ChoixRess' value='rec1'> Nourriture\
       <input type=radio id='ChoixRess2' name='ChoixRess' value='rec2'> Bois\
       <input type=radio id='ChoixRess3' name='ChoixRess' value='rec3'> Pierre\
       <input type=radio id='ChoixRess4' name='ChoixRess' value='rec4'> Minerais\
       </td></tr>\
       <tr><td colspan=2>Estimation des ressources transport&eacute;es : <span id=BOEstimationR></td></tr>\
       </table>\
       <TABLE align=center width=425 class=ptTab><TR><TD><div id=ptTranportStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>";
    t.transportDiv.innerHTML = m; 
    t.destinationCityx = document.getElementById ('typetrpx');
    t.destinationCityy = document.getElementById ('typetrpy');
    t.listeFavoris = document.getElementById ('listeFavori');
    t.estimationRes = document.getElementById ('BOEstimationR');
    t.chargelistelieux = document.getElementById ('chargelistelieux');
    t.chargelistelieux.addEventListener ('click', t.chercherFavoris, false);
    t.listeFavoris.addEventListener ('change', t.SelectFavoris, false);   
    var dcp1 = new CdispCityPicker ('ptspeed1', document.getElementById('desptspeedcity'), false, t.clickCityDestinationSelect, 1);
    t.TTbutTransport = document.getElementById ('ptttButTransport');
    t.TTbutTransport.addEventListener ('click', t.clickTransportDo, false);
    t.divTranportStatus = document.getElementById ('ptTranportStatus');
    t.statpourTr = document.getElementById ('statpourTr');
    t.typetrp = document.getElementById ('typetrp');
    t.typetrp.addEventListener ('click', t.estimerRes, false); 
    
    t.trswagmax = document.getElementById ('trswagmax');
    t.trswagmax.addEventListener ('click', t.clickUniteMax, false);
    
    t.Choixnbwagon  = document.getElementById ('Choixnbwagon');
    t.Choixnbwagon.addEventListener ('keyup', t.verifierWagons, false);
   
   
     var dcp0 = new CdispCityPicker ('ptspeed0', document.getElementById('srcptspeedcity'), false, t.clickCitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
       

   
   t.state = 1;
    
    }
    
       rows[0]=[];
    
      m = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
         m += '<TD width=81><B>'+ Cities.cities[i].name.substring(0,10) +'</b></td>';
      }
  
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
      
      m += _row ('<img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png>', rows[0]);
      m += _row ('<img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png>', rows[1]);
      m += _row ('<img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png>', rows[2]);
      m += _row ('<img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png>', rows[3]);
      m += _row ('<img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png>', rows[4]);
      
      m += '<TR><TD><BR></td></tr>';
      for (r=1; r<13; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
        }
      }
      m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt1'][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_30.jpg>', rows[1]);
      m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt7'][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_30.jpg>', rows[7]);
      m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt8'][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_30.jpg>', rows[8]);
      m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt9'][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_30.jpg>', rows[9]);
      m += "</table>";
     t.statpourTr.innerHTML = m;
    
    t.displayTimer = setTimeout (t.showTRP, 10000);
  },
  
  SelectFavoris:function() {
   var t = my.TranspAuto;
   if (t.listeFavoris.value!='') {
    var valeur=t.listeFavoris.value;
    var x=valeur.substr(0, valeur.lastIndexOf(','));
    var y=valeur.substr(valeur.lastIndexOf(',')+1, valeur.length);
    //alert(x +' ' + y);
    t.destinationCityx.value = x;
    t.destinationCityy.value = y;
   }
  },
  
  chercherFavoris: function() {
   var t = my.TranspAuto;
   var myA = getMyAlliance ();
   if (myA[0]!=0) {
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.perPage = 100;
      params.allianceId = myA[0];
          new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
	        method: "post",
	        parameters: params,
	        onSuccess: function (rslt) {
	          // on vide la liste
	          //t.listeFavoris.innerHTML=null;
	          if (rslt.ok){
	           var z=0;
	           var m="";
	           for (var i=0; i<rslt.results.length; i++){
     		      p = rslt.results[i];
		      if (p.userId != 0){
		       //alert('ok 2 '+i);
		       for (var c=0; c<p.cities.length; c++){
		         if (Seed.player.name!=p.displayName) {
		          m += "<option value='" + p.cities[c].xCoord + ","+ p.cities[c].yCoord+"'>" + p.displayName + " - Ville " + (c+1) + " - " + p.cities[c].xCoord + "," + p.cities[c].yCoord+"</option>";
		         }
		       }  //fin for cities  	       
		      }   //fin if user 
      	            } //fin for resultat
      	            t.listeFavoris.innerHTML="<option value=''>Selectionner...</option>"+m;
	          }// fin
	        },
	        onFailure: function (rslt) {
	          t.listeFavoris.innerHTML="<option>Erreur</option>";
	        },
    	});
          
       }
       else {
          // Si pas d'alliance !
          t.listeFavoris.innerHTML="<option>Pas d'alliance !</option>";
    	}
      
  },
  /******* transport ****/
  verifierWagons: function() {
   var t = my.TranspAuto;
   var maxw=parseInt(rows[t.typetrp.value][t.sourceCity.idx]);
   var saisw=parseInt(t.Choixnbwagon.value);
   if (saisw > maxw) {
      t.Choixnbwagon.value=maxw;
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>La quantit&eacute; ne peut exc&eacute;der '+maxw+' !.</font>';
   }
   t.estimerRes();
  },
  estimerRes: function() {
   var t = my.TranspAuto;
   var esti = parseInt(unsafeWindow.unitstats['unt'+t.typetrp.value][5] * t.Choixnbwagon.value * (1 + (0.10 * Seed.tech.tch10)));
   t.estimationRes.innerHTML = "<b>" + addCommas(esti) + "</b>"; 
  }, 
  
  clickUniteMax: function() {
    var t = my.TranspAuto;
    var maxw=parseInt(rows[t.typetrp.value][t.sourceCity.idx]);
    
    
    var niveauPointRall=parseInt(getCityBuilding (t.sourceCity.id, 12).maxLevel); // 12=Point de ralliement
    if (niveauPointRall==11) {
       var maxtroupe=150000;
    } else {
       var maxtroupe=niveauPointRall*10000;
    }
    if (maxw>maxtroupe) maxw=maxtroupe;
    
    t.Choixnbwagon.value=maxw;
    t.estimerRes();
  },
  clickTransportDo: function() {   // fonction pour faire le transport
   var t = my.TranspAuto;
   var SourceId = t.sourceCity.id;
   var DestinationId = t.destinationCity.id;
   var cityA=null;
   cityA=ById('citysel_'+ (t.sourceCity.idx + 1));
   nHtml.Click(cityA);
   
   
   if (!$("ChoixRess0").checked && !$("ChoixRess1").checked && !$("ChoixRess2").checked && !$("ChoixRess3").checked && !$("ChoixRess4").checked) {
       t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Merci de cocher un type de ressource !</font>';
      return;
   }
   
   
   if (t.sourceCity.x==t.destinationCityx.value && t.sourceCity.y==t.destinationCityy.value) {
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Impossible sur les memes villes !.</font>';
     return;
   }
   if (parseInt(t.Choixnbwagon.value)=="0") {
   t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Impossible de transporter avec 0 unit&eacute;e... pfff !.</font>';
     return;
   }
   var x=t.destinationCityx.value;
   var y=t.destinationCityy.value;
   if (x == 0 || y == 0) {
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Impossible de transporter sur la destination 0,0 !.</font>';
     return;
   }
   t.TTbutTransport.disabled=true;
   t.divTranportStatus.innerHTML = "Transfert de ta ville "+(t.sourceCity.idx+1)+" vers coordonn&eacute;es ("+x+","+y+") "; 
   
   unsafeWindow.Modal.hideModalAll();

    setTimeout (function (){ // TIMEOUT 0

     document.getElementById('mapXCoor').value = x;
     document.getElementById('mapYCoor').value = y;
     unsafeWindow.reCenterMapWithCoor();
     unsafeWindow.changeview_map(document.getElementById('mod_views_map'));
	 unsafeWindow.modal_attack(1,x,y);
	 
	 // Test sur la case à cocher en haut
	 // permetra d'utiliser les dada
	
	window.setTimeout(function() {  // TIMEOUT 0
	 var caseacohce = ById('modal_attack_supplyfilter_checkbox');
 	 nHtml.Click(caseacohce);
  	 window.setTimeout(function() { // TIMEOUT 1
   	  var nbwagon = ById('modal_attack_unit_ipt'+t.typetrp.value);
	  nbwagon.value = t.Choixnbwagon.value;
	  var evt = document.createEvent("KeyboardEvent");
	  if(evt.initKeyboardEvent) {
			evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  } else {
			evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  }
	  nbwagon.dispatchEvent(evt);
 
    	  
    	  //return false;
	  var ic=0;
	  var ic_ty="gold";
	  var ic_text="d'or";
	  if ($("ChoixRess1").checked) { ic_ty="rec1";ic=1;ic_text="de nourriture"; }
	  if ($("ChoixRess2").checked) { ic_ty="rec2";ic=2;ic_text="de bois"; }
	  if ($("ChoixRess3").checked) { ic_ty="rec3";ic=3;ic_text="de pierre"; }
	  if ($("ChoixRess4").checked) { ic_ty="rec4";ic=4;ic_text="de minerais"; }
	  
	
	  
	  unsafeWindow.modal_attack_update_rec_max(ic);
	  
	  var resource=ById('modal_attack_'+ic_ty);
	  
	  var evt = document.createEvent("KeyboardEvent");
	  if(evt.initKeyboardEvent) {
		evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  } else {
		evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  }
	  resource.dispatchEvent(evt);
	  nombrederesss = resource.value;
	  t.divTranportStatus.innerHTML += "de "+nombrederesss+" "+ic_text+""; 
      	  // nouvelle méthode pour le transport
      	  
      	  
	  //return false;
	  
	  
	  ById("modal_attack_knight").selectedIndex=0;
	  
	  window.setTimeout(function() { // TIMEOUT 2
	   //t.divTranportStatus.innerHTML += "<br><b>Arriv&eacute sur "+ x +" "+y +" </b><br><input type=button value='Poster sur le tchat alliance' id='posttrptch'>"; 
	   var caseacohce = ById('deleteAttack');
	   if (caseacohce!=null) {
	    t.divTranportStatus.innerHTML = "<font color=red><b>Impossible, KOC Attack a m&eacute;moris&eacute; une attaque ou un tranport !<br>Merci de l'annuler manuellement.</b></font>";
	    t.TTbutTransport.disabled=false;
	    return false;
	   } else {
	            unsafeWindow.modal_attack_do();
	   	    window.setTimeout(function() {
	   	      t.TTbutTransport.disabled=false;
	   	      t.divTranportStatus.innerHTML +="<br>Effectu&eacute; !";
	   	      //window.setTimeout(function() { t.show2(); },4000); // on force le rafraichissement au bout de 4sec, c'est chiant ! je l'ai viré
		     },800);
	   }
	  }, 1000); // TIMEOUT 2
	 }, 100); // TIMEOUT 1
    },100);
       },100);
    
  },
   clickCitySourceSelect : function (city){
    var t = my.TranspAuto;
    t.sourceCity = city;
    t.TTbutTransport.disabled=false;
     // en cas de changement de ville, faire le test et mettre quantite max
   var maxw=parseInt(rows[t.typetrp.value][t.sourceCity.idx]);
   var saisw=parseInt(t.Choixnbwagon.value);
   if (saisw > maxw)  t.Choixnbwagon.value=maxw;
   setTimeout (function (){ 
     //t.divTranportStatus.innerHTML = "Source :" + city.id + "-" + +" - " +city.selectBut+" <br>";
     var cityA=null;
     cityA=ById('citysel_'+ (city.idx + 1));
     nHtml.Click(cityA);
     
     }, 0);
     t.estimerRes();
   },
   clickCityDestinationSelect : function (city){
    var t = my.TranspAuto;
    t.destinationCity = city;
    t.destinationCityx.value=t.destinationCity.x;
    t.destinationCityy.value=t.destinationCity.y;
    t.TTbutTransport.disabled=false;
   }    
    
}
/*************** WILDS TAB *********************/

var wildNames = {
   0: 'Marais',
  10: 'Prairie',
  11: 'Lac',
  20: 'Bois',
  30: 'Collines',
  40: 'Montagne',
  50: 'Plaine',
};

var mercNames = {
  0: 'Aucun',
  1: 'Novices',
  2: 'Intermediaire',
  3: 'V&eacute;t&eacute;rans',
};

my.Wilds = {
  tabOrder : 35,
  cont : null,
  state : null,
  upGoldTimer : null,
  wildList : [],
  buildList : {},
  
  init : function (){
    var t = my.Wilds;
    t.cont = document.createElement('div');
    unsafeWindow.ptButMaxTraps = t.e_butMaxTraps;
    unsafeWindow.ptInpWildTraps = t.e_inpTraps;
    unsafeWindow.ptButWildSet = t.e_butWildSet;
    unsafeWindow.ptButWildShow = t.show;
    return t.cont;
  },

  getContent : function (){
    var t = my.Wilds;
    return t.cont;
  },

  hide : function (){
    var t = my.Wilds;
    clearTimeout (t.upGoldTimer);
  },
  
  show : function (){
    var t = my.Wilds;
    clearTimeout (t.upGoldTimer);
    if (t.state == null){
      t.cont.innerHTML = '<DIV id=wildContent style="maxheight:665px; height:665px; overflow-y:auto">';
      t.state = 1;
    }
    
    m = '<CENTER>'+ strButton20('RESET', 'id=ptwref') +'</center><TABLE cellspacing=0 cellpadding=0 class=ptTabPad align=center>';
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      t.wildList[c] = [];       
      m += '<TR><TD colspan=20><DIV class=ptstat>'+ city.name +' &nbsp; ('+ city.x +','+ city.y +')</div></td></tr>';
      var row = 0;  
      var sortem = [];

// TEST (no wilds for city #3)
//Seed.wilderness['city'+Cities.cities[3].id] = [];      
      
      var cWilds = Seed.wilderness['city'+city.id];
      if (matTypeof(cWilds) != 'array') {
        m += '<TR style="background-color:white; font-weight:bold;" align=right><TD align=left>Type TS</td><TD></td><TD align=left>Coords</td><TD>Pi&egrave;ges</td><TD align=left>Mercenaires</td>\
         <TD width=15></td><TD colspan=3 class=entry>'+ htmlTitleLine(' CONFIGURATION DES DEFENSES ') +'</td></tr>';
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
          m += '<TR align=right'+ (row++%2?'':' class=ptOddrow') +'><TD align=left><a onclick="citysel_click(document.getElementById(\'citysel_'+ (c+1)+'\'));setTimeout (function (){modal_wilderness_abandon('+wild.tileId+','+ wild.tileLevel +','+wild.tileType+','+ wild.xCoord +','+ wild.yCoord +');setTimeout(function(){ ptButWildShow(this); },4000);},500);return false;"><img src="http://cdn1.iconfinder.com/data/icons/musthave/16/Remove.png" border=0 title="Abandonner la TS"></a>&nbsp;'+ wildNames[wild.tileType] +'</td>\
            <TD>'+ wild.tileLevel +'</td><TD align=center>\
             <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ wild.xCoord +','+ wild.yCoord +')</a></td>\
            <TD align=right><B>'+ wildDef.fort60Count +'</b></td><TD align=center><B>'+ mercNames[wildDef.mercLevel] +'</b></td>\
            <TD></td><TD align=left class=ptentry><B>Ajout Pi&egrave;ges :</b> <INPUT onchange="ptInpWildTraps(this)" id=ptwt_'+ c +'_'+ i 
              + (maxBuild==0?' DISABLED ':'')+' style="margin:0px; padding:0px" type=text size=3 maxlength=4></td>'
          if (wildDef.fort60Count < maxTraps)
            m += '<TD class=ptentry style="padding:0px">'+ strButton14('Max', 'id=ptwx_'+ c +'_'+ i +' onclick="ptButMaxTraps(this)"') +'</td>';
          else
            m += '<TD class=ptentry></td>';
          m += '<TD class=ptentry> &nbsp; &nbsp; <B>Mercs:</b> ' + htmlSelector(mercNames, wildDef.mercLevel, 'id=ptwm_'+ c +'_'+ i) +' &nbsp; &nbsp; </td></tr>';
        }
        m += '<TR><TD colspan=6></td><TD class=ptentry align=center colspan=3><TABLE><TR><TD width=40% align=left>Co&ucirc;t Or : <SPAN id=ptwgc_'+ c +'>0</span></td>\
            <TD width=10%>'+ strButton20("METTRE A JOUR", 'onclick="ptButWildSet('+ c +')"') +'<TD width=40% align=right>Or dispo : <SPAN id=ptwgt_'+ c +'>0</span></td></td></tr></table></td></tr>';
      } else {
        m+= '<TR><TD colspan=9> &nbsp; </td></tr>';
      }         
    }
    document.getElementById('wildContent').innerHTML = m + '</table></div>';
    document.getElementById('ptwref').addEventListener ('click', t.show, false);
    t.updateGold ();
  },
    
  e_butWildSet : function (c){
    var t = my.Wilds;
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
    popDiv.innerHTML = '<TABLE class=ptTab width=100% height=100%><TR><TD>\
          <DIV class=ptstat>Configuration des d&eacute;fences des terres sauvages (TS)</div>\
          <DIV id=ptWildBuildDiv class=ptDiv style="padding:10px; height:225px; max-height:225px; overflow-y:auto"></div>\
          </td></tr><TR><TD align=center>'+ strButton20('ANNULER', 'id=ptWildCancel') +'</td></tr></table>';
    document.getElementById('ptWildCancel').addEventListener('click', t.e_buildCancel, false);
    t.processQue(null);  
  },
  
  e_buildCancel : function (){
    var t = my.Wilds;
    t.setCurtain(false);
    t.setPopup(false);
    t.show();
  },
  
  processQue : function (errMsg){
    var t = my.Wilds;
    var what = t.buildList.list.shift();
    var div = document.getElementById('ptWildBuildDiv');
    if (what==null || errMsg){
      if (errMsg)
        div.innerHTML += '<BR><SPAN style="white-space:normal;" class=boldRed>ERREUR : '+ errMsg +'</span>';
      else
        div.innerHTML += 'Effectu&eacute;e.<BR>';
      document.getElementById('ptWildCancel').firstChild.innerHTML = 'FERMER'; 
      return;
    }
    if (div.innerHTML != '')
      div.innerHTML += 'Effectu&eacute;e.<BR>';
    var wild = Seed.wilderness['city'+ t.buildList.cityId]['t'+what[1]];
    if (what[0] == 'T'){
      div.innerHTML += 'Construction de '+ what[2] +' pi&egrave;ges sur '+ Cities.byID[t.buildList.cityId].name +'\' sur Terres au '+ wild.xCoord +','+ wild.yCoord +' ... ';
      t.postBuyTraps (t.buildList.cityId, what[1], what[2], t.processQue);
    } else {
      div.innerHTML += 'Configure Mercenaires -'+ mercNames[what[2]] +'- sur '+ Cities.byID[t.buildList.cityId].name +'\' sur Terres au '+ wild.xCoord +','+ wild.yCoord +' ... ';
      t.postHireMercs (t.buildList.cityId, what[1], what[2], what[3], t.processQue);
    }
  },
  
  setPopup : function (onoff){
    var t = my.Wilds;
    if (onoff){
      var div = document.createElement('div');
      div.id = 'ptWildPop';
      div.style.backgroundColor = '#fff';
      div.style.zindex = mainPop.getZindex()+2;
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
    var t = my.Wilds;
    if (onoff){
      var off = getAbsoluteOffsets (t.cont);
      var curtain = document.createElement('div');
      curtain.id = 'ptWildCurtain';
      curtain.style.zindex = mainPop.getZindex()+1;
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
    var t = my.Wilds;
    var c = e.id.substr(5,1);
    var w = e.id.substr(7);
    var inp = document.getElementById('ptwt_'+ c +'_'+ w);
    inp.value = t.wildList[c][w][1];
    t.e_inpTraps (inp);
  },
  
  e_inpTraps : function (e){
    var t = my.Wilds;
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
    var t = my.Wilds;
    for (var c=0; c<Cities.numCities; c++){
      var e = document.getElementById('ptwgt_'+ c +'');
      if (e)
        e.innerHTML = addCommasInt(Seed.citystats['city'+Cities.cities[c].id].gold[0]);
    }
    t.upGoldTimer = setTimeout (t.updateGold, 5000);
  },
  
  postBuyTraps : function (cid, tid, quant, notify){
    var params = Object.clone(unsafeWindow.g_ajaxparams);
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
 
   
/*************** KNIGHTS TAB *********************/
my.Knights = {
  cont : null,
  state : null,
  displayTimer : null,

  init : function (){
    var t = my.Knights;
    t.cont = document.createElement('div');
    unsafeWindow.ptAssignSkill = t.clickedAssignPoints;
    return t.cont;
  },

  getContent : function (){
    var t = my.Knights;
    return t.cont;
  },

  hide : function (){
    var t = my.Knights;
    clearTimeout (t.displayTimer);
  },

  show : function (){
    var t = my.Knights;
    clearTimeout (t.displayTimer);
 
    if (t.state == null){
      t.cont.innerHTML = '<STYLE>table.ptTabPad tr.ptwpad {background-color:#ffffff; padding-left:5px}</style>\
            <DIV id=ptknightdiv style="max-height:660px; height:660px; overflow-y:auto">';
      t.state = 1;
    }
    
    function _dispKnight (roleId, knight, numcid){
      var rid = roleId;
      if (roleId==null)
        rid = 1;
      var sty='';  
      if (row++ % 2)
        sty = 'class=ptOddrow ';        
      m = '<TR '+ sty +'valign=top align=right><TD><B>'+ (roleId==null ? '':knightRoles[rid][0]) +'</b></td><TD align=left>';
      if (knight == null) {
        m += '--------</td><TD colspan=5></td><TD class=ptentry colspan=5></td><TD colspan=2></td></tr>';
      } else {
        var level = parseInt(Math.sqrt(parseInt(knight.experience) / 75)) + 1;
        var unpoints = level - parseInt(knight.skillPointsApplied);
        var salary = (parseInt(knight.skillPointsApplied) + 1) * 20;
        totSalary += salary;
        var ass = '';
        if (knight.knightStatus == 10){
          ass = '<TD class=ptentry align=left colspan=4>Marchant</td>';
        } else {  
          if (unpoints > 0){
            unpoints = '<SPAN class="boldRed">'+ unpoints +'</span>';
            for (var i=0; i<4; i++){
            var sty = 'padding-left:1px;';
            if (i == rid)   // bold it
              sty += 'font-weight:bold;color:#116654';
            ass += '<TD class=ptentry align=left style="'+ sty +'" ><A style="'+ sty +'" onclick="ptAssignSkill(this,' + cid +','+ knight.knightId +','+ i +')">['+ knightRoles[i][2] +'] &nbsp;</a></td>'; 
           }
          } 
          else
            ass = '<TD class=ptentry colspan=4></td>';
        }  
        var skills = [];
        for (var i=0; i<4; i++){
          if (i == rid)
            skills[i] = '<B>'+ knight[knightRoles[i][1]] +'</b>'; 
          else
            skills[i] = knight[knightRoles[i][1]]; 
        }          
        m += '<a title="Assigner un role" onclick="citysel_click(document.getElementById(\'citysel_'+ (numcid+1)+'\'));setTimeout (function (){ assign_role_modal('+ knight.knightId +');return false;}, 500);">' + knight.knightName + '</a></td><TD><a title="Augmenter EXP" onclick="citysel_click(document.getElementById(\'citysel_'+ (numcid+1)+'\'));setTimeout (function (){  xpBoost_modal('+ knight.knightId +');return false; }, 500);" href="javascript:void(0)">'+ level +'</a></td><TD>'+ skills[0] +'</td><TD>'+ skills[1] +'</td><TD>'+ skills[2] +'</td><TD>' + skills[3]
          +'</td><TD class=ptentry>'+ unpoints +'</td>'+ ass +'<td><a onclick="citysel_click(document.getElementById(\'citysel_'+ (numcid+1)+'\'));setTimeout (function (){ loyalBoost_modal('+ knight.knightId +');return false;}, 500);">'+knight.loyalty+'</a></td><TD>'+ addCommas(salary) +'</td></tr>';
      }
      return m;
    }          
    
    var totSalary = 0;
    var m = '<TABLE cellspacing=0 align=center class=ptTabPad><TBODY>';
    for (var c=0; c<Cities.numCities; c++) {
      var cid = Cities.cities[c].id;
      m += '<TR><TD colspan=14><DIV class=ptstat>'+ Cities.cities[c].name +'</div></td></tr>\
          <TR class=ptwpad style="font-weight:bold" align=right><TD width=70>Role</td><TD width=155 align=center>Nom</td><TD width=22>Niv</td><TD width=25>Pol</td><TD width=25>Com</td>\
          <TD width=25>Int</td><TD width=25>Res</td><TD width=75 align=center colspan=5>--- non attribu&eacute; ---</td><td witdh=25>Loy</td><TD width=40 align=right> Salaire </td></tr>';
      totSalary = 0;
      var did = {}; 
      var row = 0;
      for (var i=0; i<knightRoles.length; i++){
        var leader = Seed.leaders['city'+cid][knightRoles[i][1]+'KnightId'];
        if (leader == 0)
          m += _dispKnight (i, null, c);
        else {
          m += _dispKnight (i, Seed.knights['city'+cid]['knt'+leader], c);
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
        m += _dispKnight (null, list[i], c);
       m += '<TR align=right><TD colspan=11><B>Salaire Total :</b></td><TD>'+ addCommas(totSalary) +'</td></tr>';        
    }
    document.getElementById('ptknightdiv').innerHTML = m +'</tbody></table></div>';
     t.displayTimer = setTimeout (t.show, 10000);
  },


  clickedAssignPoints : function (e, cid, kid, rid){
    var t = my.Knights;
    clearTimeout (t.displayTimer);
      
    var knight = Seed.knights['city'+cid]['knt'+kid];
    if (knight.knightStatus == 10){
      var row = e.parentNode.parentNode;
      row.childNodes[7].innerHTML = 'Marchant';
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
    div.innerHTML = 'Assignation de '+ unassigned +' comp&eacute;tence(s) '+ knightRoles[rid][1] +' ... ';
    t.postSkillPoints (cid, kid, sk[0], sk[1], sk[2], sk[3], function (r){t.postDone(r, div)});  
  },
  
  postDone : function (rslt, div){
    var t = my.Knights;
    clearTimeout (t.displayTimer);
    if (rslt.ok){
      div.innerHTML += '<B>Effectu&eacute;e.</b>';
      t.displayTimer = setTimeout (t.show, 5000);
    } else {
      div.innerHTML += '<BR><SPAN class=boldRed>ERREUR : '+ rslt.errorMsg +'</span>';
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
    var but = makeButton20('Transferer');
    div.appendChild (but);
    but.addEventListener ('click', messageNav.eventForward, false);
    div = document.getElementById('modal_msg_write_to').parentNode;
    div.innerHTML = '<TABLE><TR><TD class=xtab><b>A :</b> <INPUT type=text id=modal_msg_write_to></td>\
    <TD class=xtab><SPAN id=ptfwdbut></span></td></tr>\
    <tr><td></td><td></td></tr></table>\
    <table><tr><TD colspan=2><SPAN id=pt2fwdbut></span></td></tr></table>';
    var button = makeButton20('Tous les Leaders');
    document.getElementById('ptfwdbut').appendChild (button);
    button.addEventListener ('click', function (){document.getElementById("modal_msg_write_to").value = "<officiers>"}, false);
    document.getElementById('pt2fwdbut').innerHTML="Cc : <INPUT type=text id=message_cc> (Mettre un ; pour ajouter un second destinataire)"; 
    // Ajout liste déroulante avec nom des Vice-chanceliers
    
  
  },

  eventForward : function (){
    document.getElementById('modal_msg_write_subj').value = "TR: " + document.getElementById('modal_msg_view_subj').innerHTML.toString().stripTags();
    document.getElementById('modal_msg_write_to').value = '';
    var from = document.getElementById('modal_msg_view_from').children[0].innerHTML;
    var body = document.getElementById('modal_msg_view_body').innerHTML.replace(/\n/g, '').replace(/<br>/gi, '\n').stripTags().replace (/back$/i, '');
    document.getElementById('modal_msg_write_txt').value = '[Message original de '+ from +']\n'+ body;
    unsafeWindow.modal_messages_compose();
  },

  msgSendHook : function (){
      if (!Options.enhanceMsging)
      return;
    var to = document.getElementById("modal_msg_write_to").value.trim();

      var chaine = document.getElementById("message_cc").value;
      var tableau = chaine.split(";")
      if (tableau.length==0) tableau[0]=chaine;
      for (var i = 0; i < tableau.length; i++) {
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.emailTo = tableau[i] ;
        params.subject = "CC: "+document.getElementById("modal_msg_write_subj").value;
        params.message = document.getElementById("modal_msg_write_txt").value;
        params.requestType	 = 'COMPOSED_MAIL';
        new Ajax.Request(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
         method: "post",
         parameters: params,
         onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
              if (rslt.ok) {
              document.getElementById('message_cc').value = "";
                //unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.msgsent + ' a '  + tableau[i]);
              }
         },         
       });
      }  
    if (to.toLowerCase() != '<officiers>' || getMyAlliance()[0]==0) {  
      return false;
    }  
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.toIds = getMyAlliance()[0];
    params.subject = document.getElementById("modal_msg_write_subj").value +'';
    params.message = document.getElementById("modal_msg_write_txt").value;
    params.type = 'alliance';
    new Ajax.Request(unsafeWindow.g_ajaxpath + "ajax/sendMessage.php" + unsafeWindow.g_ajaxsuffix, {
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
        displayReports (rslt.arReports, rslt.arPlayerNames, rslt.arAllianceNames, rslt.arCityNames, rslt.totalPages);
      },
      onFailure: function (rslt) {
      },
    }, false);

    function displayReports (ar, playerNames, allianceNames, cityNames, totalPages){
      var msg = new Array();
      var myAllianceId = getMyAlliance()[0];
      msg.push ("<STYLE>.msgviewtable tbody .myCol div {margin-left:5px; overflow:hidden; white-space:nowrap; color:#000}\
            .msgviewtable tbody .myHostile div {font-weight:600; color:#600}\
            .msgviewtable tbody .myGray div {color:#666}\
            .msgviewtable tbody .myRein div {color:#050}\
            .msgviewtable tbody .myWarn div {font-weight:600; color:#442200}\
            </style>");
      msg.push("<div class='modal_msg_reports'><a href='javascript:void(0);' id=clickclick onclick='allianceReports();'><img src='http://cdn1.iconfinder.com/data/icons/momenticons-gloss-basic/momenticons-gloss-basic/16/arrow-refresh.png'> Actualiser</a>");
      var rptkeys = unsafeWindow.Object.keys(ar);
      //alert(rptkeys.length);
      
      if (matTypeof(ar) != 'array') {
        if (Options.allowAlterAR)
          msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        else
          msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        msg.push("<thead><tr><td width=105>Date</td><td width=40>Type</td><td width=150>Attaquant</td><td>Cible</td><td>Voir</td><td colspan=2>Dist. ville</tr></thead><tbody>");
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

          msg.push ('<tr valign=top');
          if (i%2 == 0)
            msg.push(" class=stripe");
          msg.push("><TD class="+ colClass +"><div>");
          msg.push(unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime));
          msg.push ('<BR>Rpt #');
          msg.push (rpt.reportId); 
          msg.push("</div></td><TD class="+ colClass  +"><div>");
          //rpt.marchType = parseInt(rpt.marchType);
          if (rpt.marchType == 1)
            msg.push (unsafeWindow.g_js_strings.commonstr.transport);
          else if (rpt.marchType == 3)
            msg.push (unsafeWindow.g_js_strings.commonstr.scout);
          else if (rpt.marchType == 2)
            msg.push ('Renf');
          else
            msg.push (unsafeWindow.g_js_strings.commonstr.attack);

          // attacker ...
          msg.push ("</div></td><TD class="+ colClass +"><div>");
          if (parseInt(rpt.side1PlayerId) != 0)
            msg.push('<a onclick=getInfoForAnUser("'+parseInt(rpt.side1PlayerId)+'");>'+escape(playerNames["p" + rpt.side1PlayerId])+"</a>");
          else
          msg.push ('?Unknown?');
          msg.push ('&nbsp;<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ rpt.side1XCoord +','+ rpt.side1YCoord +')</a><bR>');
          if (rpt.side1AllianceId != myAllianceId){
            msg.push (allianceNames['a'+rpt.side1AllianceId]);
            msg.push (' (');
            msg.push (getDiplomacy(rpt.side1AllianceId));
            msg.push (')');
          } else {
            msg.push ('<BR>');
          }
          msg.push ('</div></td>');

          // cible ...
          msg.push ("<TD class="+ colClass  +"><DIV>");
          var type = parseInt(rpt.side0TileType);

          if (type < 50){                              // pour la TS
            msg.push(unsafeWindow.g_mapObject.types[type].toString().capitalize());
            msg.push(" Lvl " + rpt.side0TileLevel)
            if (parseInt(rpt.side0PlayerId) != 0) {   // IF OWNED, show owner ...
              msg.push (' [');
  			  msg.push ('<a @onclick=getInfoForAnUser("'+parseInt(rpt.side0PlayerId)+'");>' + escape(playerNames["p" + rpt.side0PlayerId])+'</a>');
            
              msg.push ('] ');
            }
          } else {
            if (parseInt(rpt.side0PlayerId) == 0) {   //  barb
              msg.push(unsafeWindow.g_js_strings.commonstr.barbariancamp);
              msg.push(" Lvl " + rpt.side0TileLevel)
            } else {        // city
              msg.push ('<a onclick=getInfoForAnUser("'+ rpt.side0PlayerId+'");>' + escape(playerNames["p" + rpt.side0PlayerId])+'</a>');
              
              msg.push (' - ');
              msg.push (cityNames['c'+ rpt.side0CityId]);
            }
          }
          
          msg.push ('&nbsp;<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ rpt.side0XCoord +','+ rpt.side0YCoord +')</a>');

           if (rpt.side0AllianceId!=0 && rpt.side0AllianceId!=myAllianceId){
            msg.push ('<BR>');
            msg.push (allianceNames['a'+rpt.side0AllianceId]);
            msg.push (' (');
            msg.push (targetDiplomacy);
            msg.push (')');
          }

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
          msg.push(");return false;'><img border=0 src='http://cdn1.iconfinder.com/data/icons/woothemesiconset/16/search_button.png'></a></div></td></tr>");
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
    if (Options.enableFoodWarnTchat)  {
      for(i=0; i < Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var foodleft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600;
        var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row[i] = rp[1] - usage;
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
          var msg = '';
          if (timeLeft<0){
           }
          else if (timeLeft<(Options.foodWarnHours*3600)) {
                msg += 'Ma ville  ' + Cities.cities[i].name.substring(0,10) + '  ' +
                       Cities.cities[i].x +','+ Cities.cities[i].y + ' ';
                msg += ' possede un niveau bas en nourriture. Restant en stock : '+addCommasWhole(foodleft).replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ')+' ('+timestrShort(timeLeft)+') Production : '+addCommas(usage).replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ')+'/h';
                sendChat ("/a " + msg);
          }
      }  
    f.minuteTimer = setTimeout (f.e_eachMinute, 600000);
   }
  },  
}


/************************ Tower Alerts ************************/
var TowerAlerts = {
  viewImpendingFunc : null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  towerMarches : {},    // track all marches that have been posted to alliance chat
  
  init : function (){
    var t = TowerAlerts; 
    var s = GM_getValue ('towerMarches_'+getServerId());
    if (s != null)
      t.towerMarches = JSON2.parse (s);

    t.viewImpendingFunc = new CalterUwFunc ('attack_viewimpending_view', [[/Modal.showModal\((.*)\)/im, 'Modal.showModal\($1\); ptViewImpending_hook(a);']]);
    unsafeWindow.ptViewImpending_hook = t.viewImpending_hook;
    t.viewImpendingFunc.setEnable (true);
    
    t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
    unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;
  },
    // fix 'target', add button  
   viewImpending_hook : function (atkinc){    
      var t = TowerAlerts;  
      var div = document.getElementById('modal_attackimpending_view');
      var isFalse = false;
      if (t.fixTargetEnabled){ 
        var city = Cities.byID[atkinc.toCityId];
        var target = '';
        if (!city || (atkinc.marchType!=3 && atkinc.marchType!=4)){  
          target = '<B>FALSE REPORT!</b>';
          isFalse = true;
        } else if (city.tileId == atkinc.toTileId){
          target = city.name + ' ('+ city.x + ','+ city.y +')';
        } else {
          wilds = Seed.wilderness['city'+atkinc.toCityId];
          m = '';
          for (k in wilds){
            if (wilds[k].tileId == atkinc.toTileId){
              m = 'at '+ wilds[k].xCoord + ','+ wilds[k].yCoord;
              break;
            }
          }
          target = city.name + ', <B>TS '+ m +'</b>';
        }
        div.childNodes[0].innerHTML = '<B>Cible : </b>'+ target;
      }
      /*if (!isFalse){
        var d = document.createElement ('div');
        d.innerHTML = '<BR><TABLE><TR><TD><a id=towerPostToChat class=button20><span>Poster sur le tchat alliance</span></a></td></tr></table>';
        div.appendChild (d);
        document.getElementById('towerPostToChat').addEventListener('click', function (){t.e_buttonPostToChat(atkinc)}, false);
      }*/
  },
   // fix false reports  
    generateIncoming_hook : function (){    
      return false;
    },
    
    enableFixFalseReports : function (tf){
      var t = TowerAlerts;  
      t.generateIncomingFunc.setEnable (tf);
    },
    enableFixTarget : function (tf){
      var t = TowerAlerts;  
      t.fixTargetEnabled = tf;
    },
    
    isFixTargetAvailable : function (){
      var t = TowerAlerts;  
      return t.viewImpendingFunc.isAvailable();
    },
    isFixFalseReportsAvailable : function (){
      var t = TowerAlerts;  
      return t.generateIncomingFunc.isAvailable();
  },
  
  postToChatOptions : {aChat:false},
  secondTimer : null,
  
 e_buttonPostToChat : function (march){
    var t = TowerAlerts;
    t.postToChat (march, true);
    unsafeWindow.Modal.hideModal();
  },
  
  setPostToChatOptions : function (obj){
    var t = TowerAlerts;
    t.postToChatOptions = obj;
    clearTimeout(t.secondTimer);  
    if (obj.aChat)
		t.e_eachSecond();
	//DD two lines deleted
  },
    
  addTowerMarch : function (m){
    var t = TowerAlerts;
    var now = unixTime();
    for (k in t.towerMarches){
      if (t.towerMarches[k].arrival < now)
        delete t.towerMarches[k];
    }
    t.towerMarches['m'+m.mid] = {added:now, arrival:parseIntNan(m.arrivalTime) };
    GM_setValue ('towerMarches_'+getServerId(), JSON2.stringify(t.towerMarches) );
  },
  
  getTowerMarch : function (mid){ // ID only (no 'm')
    var t = TowerAlerts;
    return t.towerMarches['m'+mid];
  },

  e_eachSecond : function (){   // check for incoming marches
    var t = TowerAlerts;
	var now = unixTime();
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (var k in Seed.queue_atkinc){
        var m = Seed.queue_atkinc[k]; 
        if ((m.marchType==3 || m.marchType==4) && parseIntNan(m.arrivalTime)>now && t.getTowerMarch(m.mid)==null){
          t.addTowerMarch (m);
          t.postToChat (m, false);
        }
      }
    }
    t.secondTimer = setTimeout (t.e_eachSecond, 2000);
  },
  

	postToChat: function(m, force){
		var t = TowerAlerts;
		//var postOptions = Options.alertConfig;
		var postOptions = t.postToChatOptions;
		var troopsnames = ['Rav', 'Mil', 'Ecl', 'Piq', 'Pal', 'Arc', 'Cav', 'Lou', 'Wagon', 'Bali', 'Bel', 'Cat'];
		var tot = [];

		for (i = 0; i < 13; i++) 
			tot[i] = 0;

		if (DEBUG_TRACE) {
			logit("checkTower(): INCOMING at " + unixTime() + ": \n" + inspect(m, 8, 1));
		}	
		if (m.marchType == null) {// bogus march (returning scouts)
			if (DEBUG_TRACE) {
			logit("checkTower(): m.marchType == null");
			}	
			return;
		}	

		
		if (m.marchType == 3) {
			if (!postOptions.scouting && !force) 
				return;
			atkType = 'ECLAIREUR';
			if (DEBUG_TRACE) {
			logit("checkTower(): scout");
			}	
		}
		else {
			if (m.marchType == 4) {
				atkType = 'ATTAQUE';
				if (DEBUG_TRACE) {
				logit("checkTower(): attack");
				}
			}
			else {
				if (DEBUG_TRACE) {
				logit("checkTower(): unkown march typ");
				}
				return;
			}
		}
		
		if (DEBUG_TRACE) {
			logit("checkTower(): after typ");
		}	
		var target, atkType, who;
		var city = Cities.byID[m.toCityId];
		if (city.tileId == m.toTileId) 
			target = 'VILLE ' + city.name + ' ' + city.x + ',' + city.y+' ';
		else {
			if (!postOptions.wilds && !force) 
				return;
			target = 'TS';
			for (k in Seed.wilderness['city' + m.toCityId]) {
				if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
					target += ' ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord+' ';
					break;
				}
			}
		}
		
		
		var attackermight = '';
		var allianceId = '';
		
		if (Seed.players['u' + m.pid]) {
			who = Seed.players['u' + m.pid].n;
			attackermight = parseInt(Seed.players['u' + m.pid].m);
            allianceId = Seed.players['u' + m.pid].a;
		} else {
			if (m.players && m.players['u' + m.pid]) {
				who = m.players['u' + m.pid].n;
				attackermight = parseInt(m.players['u' + m.pid].m);
                allianceId = m.players['u' + m.pid].a;
			} else {
				who = 'Inconnu';
			}
		}
		
		if (m.fromXCoord) 
			who += ' sur ' + m.fromXCoord + ',' + m.fromYCoord;
			
		var diplomacy = getDiplomacy(allianceId);

		
		var arrivingDatetime = new Date();
		arrivingDatetime.setTime(m.arrivalTime * 1000);
		
		if (DEBUG_TRACE) {
			logit("checkTower(): Before Messagecreate");
		}
		/** ** message ** */
		var msg = '';
		var subject = '';
		msg = '';
		if (!force) 
		  msg = postOptions.aPrefix + ' ';
		
		//msg += 'My HQ: ' + postOptions.hq + '. ';
		msg += 'Type : ' + atkType + '. ';
		msg += 'Cible : ' + target + '. ';
		msg += 'Attaquant : ' + who + ' (' + addCommas(attackermight).replace(',',' ').replace(',',' ') + ', ' + diplomacy + ').';
		
		msg +=' ** ARRIVEE ** : ';
		var totTroops = 0;
		for (k in m.unts) {
			var uid = parseInt(k.substr(1));
			msg += m.unts[k] + ' ' + unsafeWindow.unitcost['unt' + uid][0] + ', ';
			totTroops += m.unts[k];
		}
		
		if ((totTroops < postOptions.minTroops) && !force) 
			return;
		
		msg = msg.slice(0, -2);
		msg += ' (arrive dans ' + unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) + ' -> ' + arrivingDatetime +').' ;
		
		/** ** Embassy** **/
		if (city.tileId == m.toTileId) {
			var emb = getCityBuilding(m.toCityId, 8);
			if (emb.count > 0) {
				var availSlots = emb.maxLevel;
				for (k in Seed.queue_atkinc) {
					if (Seed.queue_atkinc[k].marchType == 2 && Cities.byID[Seed.queue_atkinc[k].fromCityId] == null) {
						--availSlots;
					}
				}
				msg += ' Mon ambassade (' + availSlots + '/' + emb.maxLevel + ')';
				
				if (DEBUG_TRACE) {
					logit("checkTower(): Mesage Part1:"+msg);
				}
				var msgpart1 = msg;
				msg ='';
				if (DEBUG_TRACE) {
					logit("checkTower(): in Embassy: "+postOptions.embassy);
				   }
				if (postOptions.embassy) {
					var rownum = 0;
					enc = {};
					numSlots = 0;

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
								s = [];
								s[0] = parseInt(march.knightCombat);
								for (i = 1; i < 13; i++) {
									if (Options.encRemaining) 
										s[i] = parseInt(march['unit' + i + 'Return']);
									else 
										s[i] = parseInt(march['unit' + i + 'Count']);
								}
								enc[city][from].push(s);
							}
						}
					}
					
										
					dest = m.toCityId;
					var embassyOccupied = false;
				
					if (enc[dest]) {
						embassyOccupied = true;
						msg += ' ** EMBASSADE **: ';
						if (DEBUG_TRACE) {
																logit("checkTower(): msg: "+msg);
				   		}
						for (p in enc[dest]) {
							try {
								if (Seed.players['u' +p]) {
									player = Seed.players['u' + p].n;
								} else {
									if (m.players && m.players['u' + p]) {
										player = m.players['u' + p].n;
									} else {
										player = 'Unknown';
									}
								}

							} 
							catch (err) {
								player = '???';
							}
							for (j = 0; j < enc[dest][p].length; j++) {
								knight = '';
								if (enc[dest][p][j][0] > 0) 
									knight = ' (' + enc[dest][p][j][0] + ')';
								var slot = j + 1;
								msg += '[slot' + slot + ': ' + player + knight + '->';
								for (i = 1; i < 13; i++) {
									num = enc[dest][p][j][i];
									if (num > 0) 
										msg += '' + addCommas(num).replace(',',' ').replace(',',' ') + ' ' + troopsnames[i - 1] + ', ';
									tot[i] += num;
								}
								msg += ']';
							}//for (j=0; j<enc[dest][p].length; j++)
						}//for (p in enc[dest])
					}//if (enc[dest])
					
				}// if (postOptions.embassy)
			}//if (emb.count > 0)
		}// if ( city.tileId == m.toTileId )
		/** ****Embassy End *** */
		
		if (DEBUG_TRACE) {
			logit("checkTower(): Mesage Part2:" + msg);
		}
		var msgpart2 = msg;
		msg ='';
		
		/** ** My Troops ** */
		if (postOptions.mytroops) {
		msg += ' ** TROUPES ** : ';
		cityID = 'city' + m.toCityId;
		
		for (r = 1; r < 13; r++) {
			num = parseInt(Seed.units[cityID]['unt' + r]);
			tot[r] += num;
			if (num > 0) 
				msg += '' + addCommas(num).replace(',',' ').replace(',',' ') + ' ' + troopsnames[r - 1] + ', ';
		}
		msg += '.';
		}
		if (DEBUG_TRACE) {
			logit("checkTower(): Mesage Part3:"+msg);
		}
		var msgpart3 = msg;
		msg ='';  
		/** ** My Troops:End ** */
		
		/** ** Total Troops ** */
		if (embassyOccupied) {
			msg += ' ** TOTAL ** : ';
			for (r = 1; r < 13; r++) {
				num = parseInt(tot[r]);
				if (num > 0) 
					msg += '' + addCommas(num).replace(',',' ').replace(',',' ') + ' ' + troopsnames[r - 1] + ', ';
			}
			msg += '.';
		}
		var msgpart4 = msg;
		if (DEBUG_TRACE) {
			logit("checkTower(): Mesage Part4:"+msg);
		}
		msg='';
		/** ** Total Troops:End ** */
		
		// Food usage
		if (postOptions.food) {
			var rp = getResourceProduction (m.toCityId);
      		var usage = parseInt(Seed.resources["city" + m.toCityId]['rec1'][3]);
      		var foodIncome = rp[1] - usage;

			var food = parseInt(Seed.resources['city'+ m.toCityId]['rec'+1][0] / 3600);
			var timeLeft = parseInt(Seed.resources["city" + m.toCityId]['rec1'][0]) / 3600 / (0-foodIncome) * 3600;
			var timeLeftShort  = timestrShort(timeLeft);
			
			msg += ' ** NOURRITURE **:';
			msg += ' '+addCommas(food).replace(',',' ').replace(',',' ').replace(',',' ') + ' (' +addCommas(foodIncome).replace(',',' ').replace(',',' ').replace(',',' ')+') -> Temps Restant : '+timeLeftShort+'. ';
		}
		var msgpart5 =msg;
		if (DEBUG_TRACE) {
			logit("checkTower(): Mesage Part5:"+msg);
		}
		msg ='';
		// My Defense
		if (Options.alertConfig.defense) {
			msg += ' ** DEFENSE **:';
			var fortifications = [];
			var fortificationsVal = [];
			
		fortifications['53'] = 'Arbalet';
          	fortifications['55'] = 'Trebuchet';
          	fortifications['60'] = 'Piege';
          	fortifications['61'] = 'Chausse';
          	fortifications['62'] = 'Palissa';
          	
          	for (id in fortifications) {
          			if (IsNumeric(id)) {
      					var fortiName = fortifications[id];
     					var fortiVal = parseInt(Seed.fortifications['city' + m.toCityId]['fort'+id]);
     					msg += fortiVal +' '+fortiName+', ';  
          			} 
   			}
   		}
		var msgpart6 =msg;
		msg ='';
		
		//Spares
		var msgpart7 =msg;
		msg ='';
		var msgpart8 =msg;
		msg ='';
		
		//build message together;
		msg = msgpart1 + msgpart2 + msgpart3 + msgpart4 + msgpart5 + msgpart6 + msgpart7 + msgpart8;
		if (DEBUG_TRACE) {
			logit("checkTower(): full Mesage:"+msg);
		}
		
				
		if (postOptions.sendasWhisper) {
			if (DEBUG_TRACE) {
			logit("checkTower(): postOptions.sendasWhisper:"+"/" + Seed.player.name + ' ' + msg);
			}
			sendChat("/" + Seed.player.name + ' ' + msg); // Whisper to myself
		}
		
		if (postOptions.sendtoAlly) {
			sendChat("/a " + msg); // Alliance chat
		}
		
		//EMAIL		
		if (postOptions.sendEmail) {
			var subject = target + ' est en train ' + atkType + ' par ' + who + ' dans '+ arrivingDatetime;
			var token = postOptions.token;
			var email = postOptions.emailAddress;
			var error = false;
			
			/*if (token=="") { 
				error = true;
				if (DEBUG_TRACE) logit("TowerAlert: error: no token ");
			}*/
			if (email=="") { 
				error = true;
				if (DEBUG_TRACE) logit("TowerAlert: error: no email ");
			}
			if (subject=="") { 
				error = true;
				if (DEBUG_TRACE) logit("TowerAlert: error: no subject ");
			}
			if (msgpart1=="") { 
				error = true;
				if (DEBUG_TRACE) logit("TowerAlert: error: no msgpart1 ");
			}
			
			if (!error) {
				sendEmail(Seed.player.name, token, email, subject, msgpart1, msgpart2, msgpart3, msgpart4, msgpart5, msgpart6, msgpart7, msgpart8);
				if (DEBUG_TRACE) logit("TowerAlert: Email was sent ");
				var msgnotify = "Email envoye";
				sendChat("/" + Seed.player.name + ' ' + msgnotify); // Whisper to myself
			}
			
	    }
		
	}, // postToChat
} //TowerAlerts




/**
* SendEmail
*/
function sendEmail (username, token, email, subject, msgpart1, msgpart2, msgpart3, msgpart4, msgpart5, msgpart6, msgpart7, msgpart8){  
    if (DEBUG_TRACE) logit ("sendEmail(): entry ");

	var params = 'user:'+username;		
	var query = "?user="+username+"&token="+token+"&email="+email+"&subject="+subject+"&msg1="+msgpart1+"&msg2="+msgpart2+"&msg3="+msgpart3+"&msg4="+msgpart4+"&msg5="+msgpart5+"&msg6="+msgpart6+"&msg7="+msgpart7+"&msg8="+msgpart8;
	//unsafeWindow.g_ajaxsuffix
	
    new MyAjaxRequest( "http://ddflux.org/email.php" + query, {
	      method: "POST",
	      parameters: params,
	      onSuccess: function (rslt) {
	      		if (DEBUG_TRACE) logit ("sendEmail(): success ");
	      },
	      onFailure: function () {
	      		if (DEBUG_TRACE) logit ("sendEmail() :failure");
	      },
    });
} //sendMail

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
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);  // Current
																// population
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

function IsNumeric(input)
{
   return (input - 0) == input && input.length > 0;
}



function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x; 
}
function parseIntZero (n){
  if (n == '')
    return 0;
  return parseInt(n, 10);
}
/*********************************** Players TAB ***********************************/

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officier';
  else if (oid==2)
    return 'Vice Chancelier';
  else if (oid==1)
    return 'Chancelier';
  return '';
}


my.AllianceList = {
  cont : null,
  nombre: null,
  state : null,
  dat : [],

  init : function (){
    var t = my.AllianceList;
    t.cont = document.createElement('div');
    t.nombre=0;
    unsafeWindow.PTgetMembers = t.eventGetMembers;
    unsafeWindow.PTDme = t.eventGetLienMember;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpl = t.clickedPlayerLeaderboard;
    unsafeWindow.PCpo = t.clickedPlayerCheckOnline;
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;
    unsafeWindow.PTalClickPrev = t.eventListPrev;
    unsafeWindow.PTalClickNext = t.eventListNext;
    return t.cont;
  },

  getContent : function (){
    var t = my.AllianceList;
    return t.cont;
  },

  hide : function (){
    var t = my.AllianceList;
  },

  show : function (){
    var t = my.AllianceList;
    if (t.state == null){
      if (getMyAlliance()[0] == 0) {
        t.cont.innerHTML = '<BR><BR><CENTER>You need to be in an alliance to use this feature.</center>';
        t.state = 1;
        return;
      }
      var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\
          <TR><TD class=xtab align=right></td><TD class=xtab>Nom joueur (Contient) : &nbsp;</td>\
            <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Cherche Joueur" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
          <TR><TD class=xtab>OU </td><TD class=xtab>Nom alliance (Contient) : &nbsp;</td>\
            <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Cherche Alliance" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
            <TR><TD class=xtab>OR: </td><TD class=xtab> &nbsp;\
            <INPUT align=left id=allListSubmit type=submit value="Liste des Alliances" /></td>\
            <TD class=xtab><INPUT align=right id=allGotoPage type=submit value="Page" />\
             <INPUT align=right id=idPageNum type="text" value='+t.curPage+' size=4 />\
             <INPUT align=left id="idMyAllSubmit" type=submit value="Mes Allies"/>\
             <INPUT align=left id="idMyTHSubmit" type=submit value="TOP 100 du Tableau d\'honneur"/>\
             </td>\
             <TD class=xtab ></td></tr>\
          </table><span style="vertical-align:middle;" id=altInput></span></div>\
          <SPAN id=allListOut></span>';
      t.cont.innerHTML = m;
      
      document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
      document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
      document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
      document.getElementById('idMyTHSubmit').addEventListener ('click', t.eventListTHSubmit, false);
      document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
      document.getElementById('allListSubmit').addEventListener ('click', t.eventListSubmit, false);
      document.getElementById('allGotoPage').addEventListener ('click', t.gotoPage, false);
      document.getElementById('idMyAllSubmit').addEventListener ('click', t.showMyAlliance, false);
      document.getElementById('allGotoPage').disabled = true;
      t.curPage = 0;
      t.MaxPage = -1;
      t.state = 1;
    }
  },

  pName : '',
  eventPlayerSubmit : function (){
    var t = my.AllianceList;
    document.getElementById('ptplayErr').innerHTML='';
    var name = document.getElementById('allPlayName').value;
    t.pName = name;
    if (name.length < 3){
      document.getElementById('ptplayErr').innerHTML = 'Au moins 3 caracteres';
      return;
    }
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>En cours de recherche...</center>';
    t.fetchPlayerList (name, t.eventGotPlayerList);
  },
  eventGetLienMember: function(name) {
    var t = my.AllianceList;
    document.getElementById('ptplayErr').innerHTML='';
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>En cours de recherche...</center>';
    t.fetchPlayerList (name, t.eventGotPlayerList);
  },
  
  eventGotPlayerList : function (rslt){
    var t = my.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.playerList = rslt.matchedUsers;
        var uList = [];
        for (k in rslt.matchedUsers)
          uList.push (rslt.matchedUsers[k].userId);     
          t.fetchPlayerStatus (uList, function(r) {t.eventGotPlayerOnlineList(r)});    
          //t.fetchPlayerLastLogin (uList, function (r) {t.eventGotPlayerOnlineList(r)});
      },    
        
      eventGotPlayerOnlineList : function (rslt){
        var t = my.AllianceList;
        if (!rslt.ok){
          document.getElementById('allListOut').innerHTML = rslt.errorMsg;
          return;
    }
    var m = '<DIV class=ptstat>R&eacute;sultat correspondant a <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=95% align=center class=ptTab cellspacing=0><TR style="font-weight:bold"><TD width=20%>Nom</td>\
      <TD align=right>Puissance &nbsp;&nbsp;&nbsp;&nbsp;</td><TD> &nbsp; En ligne</td><TD width=60%>Informations suppl&eacute;mentaires</td></tr>';
    var row=0;
    var cl='';
    for (k in t.playerList){
      var u = t.playerList[k];
      if (++row % 2)
        cl = 'class=ptOddrow ';
      else
        cl = '';
        if (u.allianceName) { var alliancenammme=u.allianceName; }else {var alliancenammme="---"; }
      m += '<TR '+ cl +'valign=top><TD><a onclick=getInfoForAnUser("'+ u.userId+ '");>'+ u.genderAndName +'</a><br>'+alliancenammme+'<br><A target="_tab" href="http://www.facebook.com/profile.php?id='+ u.fbuid +'">profile</a></td><TD align=center>&nbsp;'+ addCommasInt(u.might) +'&nbsp;</td>\
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed>En ligne</span>":"") +'</td>\
         <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A>details</a> &nbsp; <BR></span><SPAN onclick="PTpl(this, \''+ u.userId +'\')"><A>Tableau d honneur</a></span>&nbsp;<br><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A>Derniere connexion</a></span></td></tr>';
    }
    m += '</table></div>';
    document.getElementById('allListOut').innerHTML = m;
  },
  
  clickedPlayerDetail : function (span, uid){
    var t = my.AllianceList;
    span.onclick = '';
    span.innerHTML = "Recherche d&eacute;tails ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = my.AllianceList;
    span.onclick = '';
    span.innerHTML = "Recherche sur le tableau d'honneur ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },

  
   clickedPlayerGetLastLogin : function (span, uid){
      var t = my.AllianceList;
      span.onclick = '';
      span.innerHTML = "Recherche de la derniere date de connexion...";
      t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
    },
  
  gotPlayerLeaderboard : function (rslt, span){
    var t = my.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Tableau Honneur :</b> Non trouv&eacute; ! (sous la brume ?)';
      return;
    }
    var p = rslt.results[0];
    var an = p.allianceName;
    if (!an || an=='' || p.officerType==4)
      an = 'Aucune';
    else
      an += ' ('+ officerId2String(p.officerType) +')';
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Tableau Honneur : </b></td><TD colspan=2> Puissance : '+ p.might  +' &nbsp; Alliance : '+ an +'</td></tr>'; 
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = ' &nbsp; &nbsp; cr&eacute;ation : ' + c.dateCreated.substr(0,10);
      m += '<TR><TD align=right><B>Ville #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName 
        + '&nbsp;<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ c.xCoord +',' +c.yCoord+ ')</a>'
        + '</td><TD width=75%> &nbsp; niveau : '
        + c.tileLevel +' &nbsp; &nbsp; statut: '+ cityStatusString (c.cityStatus) + created +'</td></tr>';
    }  
    span.innerHTML = m + '</table>';
  },


  gotPlayerLastLogin : function (rslt, span){
    var t = my.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }

    var p = rslt.playerInfo;
    var lastLogin = rslt.playerInfo.lastLogin;
    
    if (lastLogin) {
      m = '<span style="color:blue">Derniere connexion : '+lastLogin+'</span>';
    } else {
       m = '<span style="color:red">Aucune date trouvee : '+lastLogin+'</span>';
    }  
    span.innerHTML = m + '';
  }, 
  gotPlayerDetail : function (rslt, span){
    var t = my.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var u = rslt.userInfo[0];
    var a = 'Aucune';
    if (u.allianceName)
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>D&eacute;tails :</b> &nbsp; </td><TD>Alliance : '+ a +' &nbsp; Villes : '
          + u.cities +' &nbsp; Population : '+ u.population +'</td></tr><TR><TD></td><TD>Provinces : ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  aName : '',
  eventSubmit : function (){
    var t = my.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = '3 caracteres minimum';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },
  eventListSubmit : function (){
    var t = my.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
    if (myA[0]!=0  ) {
       t.curPage=1;
       t.fetchOtherAllianceInfo ( 1, t.eventGotOtherAlliancePage);
       document.getElementById('allGotoPage').disabled = false;
    }
    else {
       document.getElementById('allListOut').innerHTML = 'Vous devez faire partie d une alliance !';
    }
  },
  eventListTHSubmit : function (){
      var t = my.AllianceList;
      document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
      t.fetchUserLeaderboard (1, t.eventGetUserLeaderboard);
  },
  eventGotAllianceList : function (rslt){
    var t = my.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>R&eacute;sultat correspondant a <B>"'+ t.aName +'"</b></div>\
    <TABLE><TR style="font-weight:bold"><TD class=xtab>Nom Alliance</td><TD class=xtab>Rang</td><TD class=xtab>Membres</td>\
        <TD align=right class=xtab>Puissance</td><TD class=xtab>Diplomatie</td><TD class=xtab></td></tr>';
    for (k in rslt.alliancesMatched){
      var all = rslt.alliancesMatched[k];
      var dip = '';
      if (all.relation && all.relation==1)
        dip = 'Friendly';
      else if (all.relation && all.relation==2)
        dip = 'Hostile';
      m += '<TR><TD class=xtab>'+ all.allianceName +'</td><TD align=right class=xtab>'+ all.ranking +'</td><TD align=right class=xtab>'+ all.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(all.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ all.allianceId +')">Voir les membres</a></td></tr>';
    }
    document.getElementById('allListOut').innerHTML = m;
  },
  
   
 showMyAlliance : function (){
    var t = my.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
    if (myA[0]!=0  ) {
       t.eventGetMembers(myA[0]);
    }
    else {
       document.getElementById('allListOut').innerHTML = 'Vous devez faire partie d une alliance !';
    }
  },
 curPage : 0,
  MaxPage : 0,

  eventListNext : function (amt){
    var t = my.AllianceList;
    if( parseInt(amt) >= 9999 )
       t.curPage = t.MaxPage;
    else {
	    t.curPage = parseInt(t.curPage) + parseInt(amt);
	    if ( t.curPage > t.MaxPage) {
	      t.curPage = t.MaxPage;
	    }
    }
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  eventListPrev : function (amt){
    var t = my.AllianceList;
    if(amt <= -1)
       t.curPage = 1;
    else {
	    t.curPage-=amt;
	    if ( t.curPage < 1 ) {
	      t.curPage = 1;
	    }
    }
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  gotoPage : function (){
    var t = my.AllianceList;
    var val = document.getElementById('idPageNum').value;
    if (t.MaxPage < 0 ) {
      document.getElementById('allListOut').innerHTML = 'List Alliances first.';
      return;
    }
    if (t.MaxPage < 0 || val > t.MaxPage || val < 1) {
      document.getElementById('allListOut').innerHTML = 'Page number out of range';
      return;
    }
    t.curPage = val;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },
  
  eventGetUserLeaderboard: function(rslt) {
   var t = my.AllianceList;
      if (!rslt.ok){
        document.getElementById('allListOut').innerHTML = rslt.errorMsg;
        return;
    }
    var m = '<div style="overflow:auto; height:556px;width:600px;"><TABLE width="600"><thead><TR style="font-weight:bold"> \
          <th class=xtab>Rang</th><th class=xtab>Nom</th><th>Avatar</th><th class=xtab>Puissance</th>\
          <th class=xtab>Alliance</th><th class=xtab>Villes</th><th class=xtab></th></tr></thead><tbody>';
    document.getElementById('allListOut').innerHTML = m;
    for (var i=0; i<rslt.results.length; i++) {
     var resultat = rslt.results[i];
    
     m += '<TR class=xtab><TD class=xtab align=center><b>' + resultat.rank +'</b></td>\
                <td class=xtab><a onclick=PTDme("' + resultat.displayName +'");><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/avatars/25/' + resultat.playerSex + '' + resultat.avatarId + '.jpg"></a></td>\
     		<TD class=xtab>' + resultat.displayName +'</td>\
     		<td class=xtab>' + resultat.might + '</td>\
     		<td class=xtab><a onclick="PTgetMembers('+ resultat.allianceId +')">' + resultat.allianceName + '</a></td>\
     		<td class=xtab>' + resultat.numCities + '</td>\
     		</tr>';
     m += '</div>';
     document.getElementById('allListOut').innerHTML = m;
    }
  },
  fetchUserLeaderboard: function(pagNum, notify) {
        var t = my.AllianceList;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.page = pagNum;
        params.perPage = 100;
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
  
  
  eventGotOtherAlliancePage : function (rslt){
    var t = my.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }

    document.getElementById('idPageNum').value = t.curPage;

    t.MaxPage=rslt.noOfPages;

    var m = '<div style="overflow:auto; height:556px;width:564px;"><TABLE width="560"><thead><TR style="font-weight:bold"> \
        <th class=xtab>Nom Alliance</th><th class=xtab>Rang</th><th class=xtab>Membres</th>\
        <th align=right class=xtab>Puissance</th><th class=xtab>Diplomacie</th><th class=xtab></th></tr></thead><tbody>';
    document.getElementById('allListOut').innerHTML = m;

    for (var i=0; i<rslt.otherAlliances.length; i++) {
      var alliance = rslt.otherAlliances[i];
      var dip = '';
      dip = getDiplomacy2(alliance.allianceId);

      m += '<TR class="'+ dip + '"><TD class=xtab>' + alliance.name +'</td><TD align=right class=xtab>'+ alliance.ranking +'</td><TD align=right class=xtab>'+ alliance.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(alliance.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ alliance.allianceId +')">Voir les Membres</a></td></tr>';
    }
    m += '</tbody></TABLE><div style="font-weight:bold; height:20px;width:560px;text-align:center;"><span><center><a onclick="PTalClickPrev(-1)"> [Debut] </a><a onclick="PTalClickPrev(10)"> [-10] </a><a onclick="PTalClickPrev(5)"> [-5] </a><a onclick="PTalClickPrev(1)"> [Prec] </a> \
          <a onclick="PTalClickNext(1)"> [Suivant] </a><a onclick="PTalClickNext(5)"> [+5] </a><a onclick="PTalClickNext(10)"> [+10] </a><a onclick="PTalClickNext(9999)"> [Fin] </a> </span></div>';
    m += '</div>';
    document.getElementById('allListOut').innerHTML = m;
 },

  showCurrentPage : function (){
    var t = my.AllianceList;
    var myA = getMyAlliance ();

    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> Recherche en cours...</center>';
    if (myA[0]!=0  ) {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }
    else {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }

  },

  eventGotMemberList : function (rslt){
    var t = my.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var numInvalid = 0;
    var numPlayers = 0;
    t.dat = [];
    for (var i=0; i<rslt.results.length; i++){
      p = rslt.results[i];
      if (p.userId == 0){
        ++numInvalid;
      } else {
        ++numPlayers;
        for (var c=0; c<p.cities.length; c++){
           t.dat.push ([p.displayName, parseInt(p.might), p.officerType, parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
               parseInt(p.cities[c].xCoord), parseInt(p.cities[c].yCoord), p.cities[c].cityName, 0, c, p.userId, p.avatarId, p.playerSex, p.rank]);
        }
      }
    }
    t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
    t.displayMembers (rslt.allianceName, numPlayers);
  },


  // sort and display
  reDisp : function (){
    var t = my.AllianceList;
    function sortFunc (a, b){
      var t = my.AllianceList;
      if (typeof(a[t.sortColNum]) == 'number'){
        if (t.sortDir > 0)
          return a[t.sortColNum] - b[t.sortColNum];
        else
          return b[t.sortColNum] - a[t.sortColNum];
      } else {
        if (t.sortDir > 0)
          return a[t.sortColNum].localeCompare(b[t.sortColNum]);
        else
          return b[t.sortColNum].localeCompare(a[t.sortColNum]);
      }
    }
    t.dat.sort (sortFunc);
    var m = '';
    var tbody = document.getElementById('allBody');
    tbody.innerHTML ='';
    tbody.style.maxHeight = '';
    var nb=0;
    var csvXL="";
    for (var i=0; i<t.dat.length; i++){ //
    	if (i % 2 == 0) {
        		 tabclass = 'xxtab';
        	} else {
        		tabclass = 'xxtab_even';
    	}
        if ((document.getElementById("OnlyOneCity").checked && t.dat[i][9]==0) || !document.getElementById("OnlyOneCity").checked )  {
	          m += '<TR style="max-height:30px"><TD class=xxtab><a onclick=PTDme("' +  t.dat[i][0] +'");><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/avatars/25/'+t.dat[i][12]+''+t.dat[i][11]+'.jpg" align=absmiddle></a>&nbsp;<a onclick=getInfoForAnUser("'+ t.dat[i][10] +'");>'+ t.dat[i][0] +'</a></td><TD align=right class='+ tabclass +'>'+ addCommasInt(t.dat[i][1]) +'</td><td align=center class='+ tabclass +'>'+t.dat[i][13]+'</td><TD align=center class='+ tabclass +'>'+ t.dat[i][3] +'</td>\
	                <TD class='+ tabclass +'>'+ officerId2String(t.dat[i][2]) +'</td><TD class='+ tabclass +'>'+ t.dat[i][7] +'</td><TD align=right class='+ tabclass +'>'+ t.dat[i][4] +'</td>\
	                <TD align=center class='+ tabclass +'><DIV>\
	                <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ t.dat[i][5] +','+ t.dat[i][6] +')</a>\
	                </div></td><TD align=right class=xxtab style="padding-right:20px;">'+ t.dat[i][8].toFixed(2) +'</td>';
	                if (t.dat[i][9]!=0)  {
	                 m += '<td class='+ tabclass +'><SPAN onclick="PCpo(this, \''+t.dat[i][10] +'\')"><A>-';
	                }else  {
	                 m += '<td class='+ tabclass +'><SPAN onclick="PCpo(this, \''+t.dat[i][10] +'\')" id="enligne'+nb+'"><A>-';
	                 nb++;
	                }
       		  m += '</a></span></td><td class='+ tabclass +'><SPAN onclick="PCplo(this, \''+ t.dat[i][10] +'\');"><A>?</a></span><td></tr>';
	    }
	csvXL += t.dat[i][0]+';'+t.dat[i][1]+';'+t.dat[i][5]+';'+t.dat[i][6]+';'+t.dat[i][4]+';'+t.dat[i][8]+';'+t.dat[i][7]+'\n';
    }
    t.nombre = nb;
    m += '<tr><td colspan=11><textarea cols="55" rows="12" onclick="this.focus();this.select();" id="cutAndPaste" name="csv">Joueur;Puissance;X;Y;Niveau;Distance;Ville\n'+csvXL+'</textarea><br><b>Export XLS (pour toi public:</b><bR>Copiez le contenu de la zone, coller ensuite le contenu dans blocnote et enregistrer le fichier en .cvs</tr>';
    tbody.innerHTML = m;
    document.getElementById("cutAndPaste").innerHTML=tous;
    if (parseInt(tbody.clientHeight) > 475){
      tbody.style.height = '475px';
      tbody.style.maxHeight = '475px';
    }
  },

  alClickAllStatut : function()  {
   var t = my.AllianceList;
  // alert(t.nombre);
   for (var i=0; i<t.nombre; i++){ 
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = t.dat[i][10];
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      asynchronous: false,
      parameters: params,
      onSuccess: function (rslt) {
       if (rslt.ok){  
	   var p = rslt.data;
	   if (p[t.dat[i][10]]) {
	     document.getElementById("enligne"+ i).innerHTML='<span style="color:green"><b>En ligne</b></span>';
	   } else {
	     document.getElementById("enligne"+ i).innerHTML='<span style="color:red"><b>Hors ligne</b></span>';
	   }  
       	}
       }
      });
   
   }
   
  },
  setDistances : function (x, y){
    var t = my.AllianceList;
    for (var i=0; i<t.dat.length; i++)
      t.dat[i][8] = distance (x, y, t.dat[i][5], t.dat[i][6]);
  },

  sortColNum : 1,
  sortDir : 0,

  displayMembers : function (allName, numPlayers){
    var t = my.AllianceList;
    function alClickSort (e){
      var t = my.AllianceList;
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
      <DIV class=ptstat><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab> &nbsp; '+ allName +'</td>\
        <TD class=xtab width=80% align=center>Distance depuis <SPAN id=distFrom>'+ Cities.cities[0].name +' ('+ Cities.cities[0].x +','+ Cities.cities[0].y +')</span></td><TD class=xtab align=right>'+ numPlayers +' joueurs trouv&eacute;s &nbsp; </td></tr></table></div>\
      <table width=100% border=0 cellpadding=0><tr><td>OPTIONS : <input type=checkbox id=OnlyOneCity> Voir que la premi&egrave;re ville</td><td>&nbsp;</tr></table>';
     m += '<div style="top:210px;left:0px;width:100%; position:absolute;max-height:475px;height:470px;overflow:auto;">\
      <TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD>\
      <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Joueur</div></a></td>\
        <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Puissance</a></div></td>\
        <TD id=clickCol13 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Clas.</a></div></td>\
        <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Villes</a></div></td>\
        <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Titre</a></div></td>\
        <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>Nom ville</a></div></td>\
        <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Niv</a></div></td>\
        <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coords</a></div></td>\
        <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance</a></div></td>\
        <TD class=clickable><A id="ClickAllStatut"><DIV>Statut</div></a></td>\
        <TD class=clickable><A><DIV>Connexion</div></a></td></tr></thead>\
      <tbody id=allBody ></tbody></table></div>\
      <DIV style="top:670px; left:0px; position:absolute; width:100%;  background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">\
        <TABLE width=100%><TR><TD class=xtab>Les donn&eacute;es proviennent du tableau d honneur ! (24h de d&eacutecalage)</td>\
        </tr></table></div>';        
    document.getElementById('allListOut').innerHTML = m;
    document.getElementById('OnlyOneCity').addEventListener ('click', t.reDisp, false);
    document.getElementById('ClickAllStatut').addEventListener ('click', t.alClickAllStatut, false);
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Montrer la distance depuis : &nbsp; X: <INPUT size=2 type=text id="plyrX" /> Y: <INPUT size=2 type=text id="plyrY" /> &nbsp; Ou, choisissez une ville : <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';
    new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
 
    t.reDisp();
 },
  
  clickedPlayerCheckOnline : function (span, uid){
        var t = my.AllianceList;
        span.onclick = '';
        span.innerHTML = "Recherche si la personne est en ligne...";
        t.fetchPlayerStatus (uid, function (r) {t.gotPlayerStatus(r, span, uid)});
   },
   gotPlayerStatus : function (rslt, span,uid){
       var t = my.AllianceList;
       if (!rslt.ok){
         span.innerHTML = rslt.errorMsg;
         return;
       }
   
       var p = rslt.data;
       if (p[uid] == true) {
         m = '<span style="color:green"><b>En ligne</b></span>';
       } else {
          m = '<span style="color:red"><b>Hors ligne</b></span>';
       }  
       span.innerHTML = m + '';
  },
  fetchPlayerStatus : function (uid, notify){
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.checkArr = uid;
      new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
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
   
    
  eventCoords : function (city, x, y){
    var t = my.AllianceList;
    var m = '';
    if (city != null)
      m = city.name +' ('+ city.x +','+ city.y +')';
    else
      m = x +','+ y;
    document.getElementById('distFrom').innerHTML = m;
    t.setDistances(x,y);
    t.reDisp();
  },

  
  eventGetMembers : function (aid){
    var t = my.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
    t.fetchAllianceMemberList (aid, null, t.eventGotMemberList);
  },

  fetchAllianceMemberList : function (allianceId, allianceName, notify) {
    var t = my.AllianceList;
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
        notify (rslt);
      },
    });
  },

 
  fetchLeaderboard : function (uid, notify) {
    var t = my.AllianceList;
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

  fetchAllianceList : function (allianceName, myAid, notify) {   // at least 3 chars :)
    var t = my.AllianceList;
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
        notify (rslt);
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
      onSuccess: function (rslt) {
        notify (rslt);
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
      onSuccess: function (rslt) {
        notify (rslt);
      },
    });
  },

  fetchPlayerList : function (name, notify){  // at least 3 chars!!     UNTESTED
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.searchName = name;
    params.subType = "ALLIANCE_INVITE";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/searchPlayers.php" + unsafeWindow.g_ajaxsuffix, {
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

  
    fetchPlayerLastLogin : function (uid, notify){
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.pid = uid;
      new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
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
  
};


/*********************************** Info tab ***********************************/

my.Info = {
  cont : null,
  state : null,

  init : function (){
    var t = my.Info;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.Info;
    return t.cont;
  },

  hide : function (){
    var t = my.Info;
  },

  show : function (){
    fortmight = {
      u53: "4",
      u55: "7",
      u60: "1",
      u61: "2",
      u62: "3",
    };
    var t = my.Info;
    rownum = 0;
    if (t.state == null){
      m = '<STYLE>.xtabH {background:#ffffe8; border:none; padding-right: 5px; padding-left: 5px; margin-left:10px; }\
              .xtabHL { background:#ffffe8; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left:5px; margin-left:10px; }\
              .xtabL { background:none; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left: 5px; margin-left:10px; }\
              .xtabLine { padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none }</style>\
          <DIV style="height:650px; max-height:650px; overflow-y:auto; overflow-x:auto"><DIV class=ptstat>INFORMATION UNITEES</div><TABLE align=center cellpadding=1 cellspacing=0>\
          <TR align=center><TD class=xtab></td><TD class=xtabHL colspan=5><B>COUT POUR CONSTRUIRE</b></td><TD class=xtabHL colspan=7><B>STATS</b></td><TD class=xtabHL><B>Entr</b></td></tr>\
          <TR valign=bottom align=right><TD class=xtab></td><TD class=xtabHL>Nour</td><TD class=xtabH>Bois</td><TD class=xtabH>Pierre</td>\
          <TD class=xtabH>Mine</td><TD class=xtabH>Pop</td><TD class=xtabHL>Puis</td><TD class=xtabH>Vie</td><TD class=xtabH>Att</td><TD class=xtabH>Def</td><TD class=xtabH>Vit</td><TD class=xtabH>Rang</td><TD class=xtabH>Charge</td>\
          <TD class=xtabHL>Nour</td></tr>\
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
      m += '<TR '+ rsty +'align=right><TD class=xtab align=left><B>'+ cost[0].substr(0,16) +'</b></td><TD class=xtabL>'+ cost[1] +'</td><TD class=xtab>'+ cost[2] +'</td>\
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
      m += '<BR><DIV class=ptstat>CALCULATEUR DE DISTANCE</div><DIV class=ptentry><TABLE align=center cellpadding=1 cellspacing=0>\
        <TR><TD class=xtab align=right><B>First Location: </b></td><TD  class=xtab> X: <INPUT id=calcX type=text\> Y: <INPUT id=calcY type=text\> Or, choose city: <SPAN id=ptloc1></span></td></tr>\
        <TR><TD class=xtab><B>Second Location: </b></td><TD class=xtab> X: <INPUT id=calcX2 type=text\> Y: <INPUT id=calcY2 type=text\> Or, choose city: <SPAN id=ptloc2></span></td></tr></table>\
        <CENTER><DIV style="width:60%; font-size:14px; border: 1px solid; background-color:white; margin:20px 3px 3px 0px; padding:4px" id=ptdistout></div></div>\
        <BR><BR><DIV class=ptstat>CARTE DES PROVINCES</div><DIV id=ptProvMap><IMG width=680 height=654 SRC="'+ URL_PROVINCE_MAP +'"></div></center></div>';
      t.cont.innerHTML = m;
      new CdispCityPicker ('ptloc1', document.getElementById('ptloc1'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX'), document.getElementById('calcY'));
      new CdispCityPicker ('ptloc2', document.getElementById('ptloc2'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX2'), document.getElementById('calcY2'));
      t.eventLocChanged(Cities.cities[0], Cities.cities[0].x, Cities.cities[0].y);      

      var eMap = document.getElementById('ptProvMap');
      for (var c=0; c<Cities.numCities; c++)      
        t.makeCityImg (c, eMap);
      t.state = 1;
    }
  },

// var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};  
  makeCityImg : function (cityNum, eMap){
//logit ('makeCityImg: '+ cityNum);    
    var t = my.Info;
    var city = Cities.cities[cityNum];
//    var off = getAbsoluteOffsets (eMap);
    var x = parseInt((provMapCoords.mapWidth * city.x) / 750);
    var y = parseInt((provMapCoords.mapHeight * city.y) / 750);
    var ce = document.createElement ('span');
    ce.style.background = 'black';
    ce.style.opacity = '1.0';
    ce.style.position='relative';
    ce.style.display='block';
    ce.style.width='14px';
    ce.style.height='16px';
    ce.style.border='1px solid #fff';
    ce.style.color = 'white';
    ce.style.textAlign = 'center';
//    ce.style.top = (off.top+y+provMapCoords.topMargin-eMap.offsetHeight) +'px';      
    ce.style.top = (y+provMapCoords.topMargin-provMapCoords.imgHeight-(cityNum*16)-8) +'px';      
    ce.style.left = (x+provMapCoords.leftMargin-7) +'px';
    eMap.appendChild(ce);
    ce.innerHTML = (cityNum+1) +'';
  },
  
  eventLocChanged : function (city, x, y){
    var x1 = parseInt(document.getElementById('calcX').value);
    var x2 = parseInt(document.getElementById('calcX2').value);
    if (isNaN(x2))
      return;
    var y1 = parseInt(document.getElementById('calcY').value);
    var y2 = parseInt(document.getElementById('calcY2').value);
    var m = 'The distance from '+ x1 +','+ y1 +' to '+ x2 +','+ y2 +' is: &nbsp;<B>'+ distance (x1, y1, x2, y2).toFixed(2) +'</b>';
    document.getElementById('ptdistout').innerHTML = m;
  },
}


/*********************************** Options Tab ***********************************/

var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];  
  this.funcNew = null;
  try {
    var funcText = unsafeWindow[funcName].toString();
    var rt = funcText.replace ('function '+ funcName, 'function');
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
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
      	var scr=document.createElement('script');
      	scr.innerHTML = funcName +' = '+ t.funcNew;
      	document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 0);
      	t.isEnabled = true;
      } else {
        unsafeWindow[t.funcName] = t.funcOld;
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



function TESTalterUwFunction (f, r){
  funcText = unsafeWindow.MapObject.prototype.populateSlots.toString();
  if (funcText.indexOf(f) < 0)
    return false;
  rt = funcText.replace ('function populateSlots', 'function');
  rt = rt.replace(f, r);
  js = 'MapObject.prototype.populateSlots' +' = '+ rt;
	var scr=document.createElement('script');
	scr.innerHTML=js;
	document.body.appendChild(scr);
	return true;
}


my.Options = {
  cont : null,
  state : null,
  fixAvailable : {},

  init : function (){
    var t = my.Options;
    t.cont = document.createElement('div');
    return t.cont;
  },


  getContent : function (){
    var t = my.Options;
    return t.cont;
  },

  hide : function (){
    var t = my.Options;
  },


  togOpt : function (checkboxId, optionName, callEnable, callIsAvailable){
    var t = my.Options;
    var checkbox = document.getElementById(checkboxId);
    
    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', new eventToggle(checkboxId, optionName, callEnable).handler, false);
    function eventToggle (checkboxId, optionName, callOnChange){
      this.handler = handler;
      var optName = optionName;
      var callback = callOnChange;
      function handler(event){
        Options[optionName] = this.checked;
        saveOptions();
        if (callback != null)
          callback (this.checked);
      }
    }
  },


  show : function (){
    var t = my.Options;
      try {      
        m = '<DIV style="height:660px; max-height:660px; overflow-y:auto"><TABLE class=ptTab>\
          <TR><TD colspan=2><B>Configuration Boite a outils :</b></td></tr>\
          <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Activer le d&eacute;placement de la fen&ecirc;tre</td></tr>\
          <TR><TD><INPUT id=ptEnableFoodWarn type=checkbox /></td><TD>Montrer \'Autonomie\' en rouge si la production de nourriture est en n&eacute;gatif et inf&eacute;rieure &agrave; \
              <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> heures</td></tr>\
          <TR><TD><INPUT id=ptEnableFoodWarnTchat type=checkbox /></td><TD>Activer le post automatique sur tchat alliance en cas d\'autonomie en rouge</td></tr>\
          <TR><TD colspan=2><P><B>KofC fonctionnalit&eacute;s suppl&eacute;mentaires :</b></td></tr>\
          <TR><TD><INPUT id=togMsgCountFix type=checkbox /></td><TD>S&eacute;parer le nombre de nouveaux messages (boites r&eacute;ceptions et rapports)</td></tr>\
          <TR><TD><INPUT id=togAllRpts type=checkbox /></td><TD>Am&eacute;liorer les rapports de l\'alliance.</td></tr>\
          <TR><TD><INPUT id=togEnhanceMsging type=checkbox /></td><TD>Am&eacute;liorer la gestion des messages (boutons "transf&eacute;rer" et "officiers")</td></tr>\
          <TR><TD><INPUT id=togPageNav type=checkbox /></td><TD>Rajouter une barre de navigation dans les messages et rapports</td></tr>\
          <TR><TD><INPUT id=togWarnZero type=checkbox /></td><TD>Interdire le d&eacute;placement sur 0,0.</td></tr>\
          <TR><TD><INPUT id=togGmtClock type=checkbox /></td><TD>Activer l\'horloge GMT a cot&eacute; de "Epoque de Camelot"</td></tr>\
          <TR><TD><INPUT id=togChatStuff type=checkbox /></td><TD>Activer les am&eacute;liorations du TChat  (coords cliquable, couleurs diverses, cliquer sur avatar pour chuchotter) <SPAN class=boldRed>&nbsp;(NOUVEAU)</span></td></tr>\
        <TR><TD><INPUT id=togAttackPicker type=checkbox /></td><TD>Activer la s&eacute;lection rapide des villes dans la boite d\'attaque (renforcer, reassigner et transport) <SPAN class=boldRed>&nbsp;(NOUVELLE option)</span></td></tr>\
        <TR><TD><INPUT id=togBatRounds type=checkbox /></td><TD>Montrer le nombre de tours dans les rapports de bataille <SPAN class=boldRed>&nbsp;(NOUVEAU)</span></td></tr>\
        <TR><TD><INPUT id=togAtkDelete type=checkbox /></td><TD>Activer le bouton Supprimer sur mes rapports de troupes <SPAN class=boldRed>&nbsp;(NOUVEAU)</span></td></tr>\
         <TR><TD colspan=2><BR><B>KofC Corrections de bugs:</b></td></tr>\
         <TR><TD><INPUT id=togKnightSelect type=checkbox /></td><TD>D&eacute;sactiver automatiquement la s&eacute;lection d\'un chevalier (Eclairer, transport ou reassigner) <SPAN class=boldRed>(NEW)</span></td></tr>\
          <TR><TD><INPUT id=togCoordBox type=checkbox /></td><TD>Garder la fen&ecirc;tre des favoris toujours devant de l\'activit&eacute des troupes <SPAN class=boldRed>(NEW)</span></td></tr>\
         <TR style="display:none"><TD><INPUT id=togTowerFix type=checkbox /></td><TD>Corriger le rapport de la Tour de Guet pour voir la cible exacte (ville, TS).</td></tr>\
          <TR style="display:none"><TD><INPUT id=togMapDistFix type=checkbox /></td><TD>Corriger la carte pour montrer la distance suivant la bonne ville s&eacute;lectionn&eacute;e..</td></tr>';
           // CitySelect
	     var citySelect = '   <SELECT id=pcalertHQ name=pcalertHQ>';
	     for (var c=0; c<Cities.numCities; c++) {
	 	 	 aCity = Cities.cities[c].name + ' ('+Cities.cities[c].x + ','+ Cities.cities[c].y+')';
	          citySelect += '<option value=\''+ aCity +'\' '+ (Options.alertConfig.hq==aCity?'SELECTED ':'') +'>'+aCity+'</option>';
	     }
	citySelect += '</select>';
          m +='<TR><TD colspan=2><BR><B>Configuration de TowerAlert :</b></td></tr>\
	  <TR><TD><INPUT id=pcalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Poster Automatique les attaques entrantes sur le tchat alliance.</td></tr>\
	  <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>';
	 m +='<TR><TD align=right>Message Prefix : &nbsp; </td><TD><INPUT id=pcalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
		<TR><TD align=right>Alerter sur &eacute;claireur : &nbsp; </td><TD><INPUT id=pcalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
		<TR><TD align=right>Alerter sur TS: &nbsp; </td><TD><INPUT id=pcalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
		<TR><TD align=right>Minimum de troupes : &nbsp; </td><TD><INPUT id=pcalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> &nbsp; &nbsp; <span id=pcalerterr></span></td></tr>\
		<TR><TD align=right>Montrer troupes dans ambassade : &nbsp; </td><TD><INPUT id=pcalertEmbassy type=checkbox '+ (Options.alertConfig.embassy?'CHECKED ':'') +'/></td></tr>\
		<TR><TD align=right>Montrer mes troupes : &nbsp; </td><TD><INPUT id=pcalertMytroops type=checkbox '+ (Options.alertConfig.mytroops?'CHECKED ':'') +'/></td></tr>\
		<TR><TD align=right>Montrer ma consommation de nourriture : &nbsp; </td><TD><INPUT id=pcalertFood type=checkbox '+ (Options.alertConfig.food?'CHECKED ':'') +' /></td></tr>\
		<TR><TD align=right>Montrer mes d&eacute;fenses : &nbsp; </td><TD><INPUT id=pcalertDefense type=checkbox '+ (Options.alertConfig.defense?'CHECKED ':'') +' /></td></tr>\
		<TR style="display:none"><TD align=right>Ma ville si&egrave;ge : &nbsp; </td><TD>'+ citySelect +'&nbsp; &nbsp;</td></tr>\
		<TR><TD align=right>Poster une alerte sur le tchat alliance : &nbsp; </td><TD><INPUT id=pcalertSendToAlly type=checkbox '+ (Options.alertConfig.sendtoAlly?'CHECKED ':'') +' /></td></tr>\
		<TR><TD align=right>Poster une alerte en chuchottement &agrave; moi m&ecirc;me : &nbsp; </td><TD><INPUT id=pcalertSendAsWhisper type=checkbox '+ (Options.alertConfig.sendasWhisper?'CHECKED ':'') +' /></td></tr>\
		<TR><TD align=right>Envoyer un email : &nbsp; </td><TD><INPUT id=pcalertSendEmail type=checkbox '+ (Options.alertConfig.sendEmail?'CHECKED ':'') +' /></td></tr>\
		<TR><TD align=right>Mon adresse email : &nbsp; </td><TD><INPUT id=pcalertEmailAddress type=text size=36 value="'+ Options.alertConfig.emailAddress +'" \> &nbsp; &nbsp;</td></tr>\
		<TR style="display:none"><TD align=right>My token : &nbsp; </td><TD><INPUT id=pcalertToken type=text size=36 value="'+ Options.alertConfig.token +'" \> &nbsp; &nbsp;</td></tr>';
		
          m +='</table></table><BR><BR><HR>'+ miseajour+'</div>';
        t.cont.innerHTML = m;
  
        t.togOpt ('ptEnableFoodWarn', 'enableFoodWarn');
        t.togOpt ('ptEnableFoodWarnTchat', 'enableFoodWarnTchat', FoodAlerts.init);
        t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
        t.togOpt ('togTowerFix', 'fixTower', TowerAlerts.enableFixTarget, TowerAlerts.isFixTargetAvailable);
        t.togOpt ('togMsgCountFix', 'fixMsgCount', MessageCounts.enable, MessageCounts.isAvailable);
        t.togOpt ('togMapDistFix', 'fixMapDistance', MapDistanceFix.enable, MapDistanceFix.isAvailable);
        t.togOpt ('togWarnZero', 'fixWarnZero', WarnZeroAttack.enable, WarnZeroAttack.isAvailable);
        t.togOpt ('togPageNav', 'fixPageNav', PageNavigator.enable, PageNavigator.isAvailable);    
        t.togOpt ('togGmtClock', 'gmtClock', GMTclock.setEnable);
        t.togOpt ('togChatStuff', 'chatEnhance', ChatStuff.setEnable, ChatStuff.isAvailable);
	t.togOpt ('togKnightSelect', 'fixKnightSelect', AttackDialog.setEnable, AttackDialog.isKnightSelectAvailable);
	t.togOpt ('togAttackPicker', 'attackCityPicker', AttackDialog.setEnable, AttackDialog.isCityPickerAvailable);
	t.togOpt ('togEnhanceMsging', 'enhanceMsging', messageNav.setEnable, messageNav.isAvailable);
	t.togOpt ('togCoordBox', 'mapCoordsTop', CoordBox.setEnable, CoordBox.isAvailable);
	t.togOpt ('togBatRounds', 'dispBattleRounds', null, battleReports.isRoundsAvailable);
	t.togOpt ('togAtkDelete', 'reportDeleteButton', null, battleReports.isDeleteAvailable);
 
        document.getElementById('pcalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertScout').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertWild').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertTroops').addEventListener ('change', t.e_alertOptChanged, false);      
	document.getElementById('pcalertEmbassy').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertMytroops').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertFood').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertDefense').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertHQ').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertSendEmail').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertEmailAddress').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertToken').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertSendAsWhisper').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertSendToAlly').addEventListener ('change', t.e_alertOptChanged, false);

        document.getElementById('optFoodHours').addEventListener ('change', function () {
            var x = document.getElementById('optFoodHours').value; 
            if (isNaN(x) || x<0.01 || x>99999){
              document.getElementById('optFoodHours').value = Options.foodWarnHours;
              return;
            }
            Options.foodWarnHours = x; 
            saveOptions();
          }, false);
  
        var checkbox = document.getElementById('togEnhanceMsging');
         if (Options.enhanceMsging)
           checkbox.checked = true;
         checkbox.addEventListener ('change', function (){messageNav.enable(document.getElementById('togEnhanceMsging').checked)}, false);
  
        var checkbox = document.getElementById('togAllRpts');
         if (Options.enhanceARpts)
           checkbox.checked = true;
         checkbox.addEventListener ('change', function() {Options.enhanceARpts=document.getElementById('togAllRpts').checked; saveOptions(); AllianceReports.enable(Options.enhanceARpts);}, false);
        
       
        
      } catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
 
   },
   
   hide : function (){
    },
  
 
    togOpt : function (checkboxId, optionName, callOnChange){
      var t = my.Options;
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
      var t = my.Options;
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
      GlobalOptions.pcWatchdog = document.getElementById('pcWatchEnable').checked;
      GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
    },
    
    e_wideChanged : function (){
      GlobalOptions.pcWideScreen = document.getElementById('pcWideOpt').checked;
      GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
    },
    
    e_alertOptChanged : function (){
      	Options.alertConfig.aChat = document.getElementById('pcalertEnable').checked;
      	Options.alertConfig.aPrefix=document.getElementById('pcalertPrefix').value;      
      	Options.alertConfig.scouting=document.getElementById('pcalertScout').checked;      
      	Options.alertConfig.wilds=document.getElementById('pcalertWild').checked;
 	Options.alertConfig.embassy=document.getElementById('pcalertEmbassy').checked;
  	Options.alertConfig.mytroops=document.getElementById('pcalertMytroops').checked;
  	Options.alertConfig.food=document.getElementById('pcalertFood').checked;
  	Options.alertConfig.defense=document.getElementById('pcalertDefense').checked;
    	Options.alertConfig.hq=document.getElementById('pcalertHQ').options[document.getElementById('pcalertHQ').selectedIndex].value;
  	Options.alertConfig.sendEmail=document.getElementById('pcalertSendEmail').checked;
  	Options.alertConfig.emailAddress=document.getElementById('pcalertEmailAddress').value;
  	Options.alertConfig.token=document.getElementById('pcalertToken').value;
  	Options.alertConfig.sendasWhisper=document.getElementById('pcalertSendAsWhisper').checked;
  	Options.alertConfig.sendtoAlly=document.getElementById('pcalertSendToAlly').checked;
 	     
      var mt = parseInt(document.getElementById('pcalertTroops').value);
      if (mt<1 || mt>120000){
        document.getElementById('pcalertTroops').value = Options.alertConfig.minTroops;
        document.getElementById('pcalerterr').innerHTML = '<font color=#600000><B>INVALID</b></font>';
        setTimeout (function (){document.getElementById('pcalerterr').innerHTML =''}, 2000);
        return;
      } 
      Options.alertConfig.minTroops = mt;
         
      saveOptions();
     // TowerAlerts.setPostToChatOptions (Options.alertConfig);
  },
  
}


/********************************* Search Tab *************************************/


my.Search = {
  cont:null,
  state : null,

  init : function (){
    var t = my.Search;
    this.cont = document.createElement('div');
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpd2 = t.clickedPlayerLeaderboard;
    unsafeWindow.PCpo2 = t.clickedPlayerCheckOnline;
    unsafeWindow.PCplo2 = t.clickedPlayerGetLastLogin;
    return this.cont;
  },

  getContent : function (){
    var t = my.Search;
    return t.cont;
  },

  hide : function (){
  },
 
  clickedPlayerDetail : function (span, uid){
    var t = my.AllianceList;
    span.onclick = '';
    span.innerHTML = "Recherche d&eacute;dails ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = my.AllianceList;
    span.onclick = '';
    span.innerHTML = "Recherche dans le tableau d'honneur ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },
  
  gotPlayerLeaderboard : function (rslt, span){
    var t = my.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = "<B>Tableau d'honneur :</b> Pas trouv&eacute; ! (sous la brume ?)";
      return;
    }
    var p = rslt.results[0];
    var an = p.allianceName;
    if (!an || an=='' || p.officerType==4)
      an = 'Aucun';
    else
      an += ' ('+ officerId2String(p.officerType) +')';
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Tableau Honneur : </b></td><TD colspan=2> Puissance : '+ p.might  +' &nbsp; Alliance : '+ an +'</td></tr>'; 
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      m += '<TR><TD align=right><B>Ville #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName 
      +' <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ c.xCoord +',' +c.yCoord+ ')</a></td><TD width=75%> &nbsp; Niveau : '

        + c.tileLevel +' &nbsp; &nbsp; status: '+ cityStatusString (c.cityStatus) +' &nbsp; &nbsp; cr&eacute;de : ' + c.dateCreated.substr(0,10) +'</td></tr>';
    }  
    span.innerHTML = m + '</table>';
  },

  gotPlayerDetail : function (rslt, span){
    var t = my.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var u = rslt.userInfo[0];
    var a = 'Aucun';
    if (u.allianceName)
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>D&eacute;dtails:</b> &nbsp; </td><TD>Alliance : '+ a +' &nbsp; Villes : '
          + u.cities +' &nbsp; Population : '+ u.population +'</td></tr><TR><TD></td><TD>Provinces : ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  aName : '',
  eventSubmit : function (){
    var t = my.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = 'Entrez au moins 3 caract&egrave;res';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },
  show : function (cont){
    var t = my.Search;
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
				13:{'name':"-------",'x':375,'y':375},
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
    if (t.state == null){
      this.cont.innerHTML = '\
        <DIV class=ptentry><table><tr valign=bottom><TD class=xtab width=100 align=right>Type : </td><TD>\
        <SELECT id="srcType">\
          <OPTION value=0>Camps Barbares</option>\
          <OPTION value=1>Terres Sauvages</option>\
	      <OPTION value=2>Villes</option>\
        </select></td></tr>\
        </table>\
        <DIV id="srcOpts" style="height:80px"></div></div>\
        <DIV id="srcResults" style="height:400px; max-height:400px;"></div>';
      var psearch = document.getElementById ("pasrcType");
      m = '<TABLE><TR valign=middle><TD class=xtab width=100 align=right>Centre : &nbsp; X: </td><TD class=xtab>\
        <INPUT id="srchX" type=text\> &nbsp; Y: <INPUT id="srchY" type=text\>';
      m += '&nbsp;<span><select id="BOprovinceXY"><option>--provinces--</option>';
      for (var i in Provinces) {
	    m += '<option value="'+i+'">'+Provinces[i].name+'</option>';
      }
      m += '</select></span> &nbsp; <SPAN id=spInXY></span>';
	  m += '</td></tr><TR><TD class=xtab align=right>Distance : </td><TD class=xtab>entre <INPUT id=srcaDist size=4 value=0 /> et <INPUT id=srcDist size=4 value=10 /></td></tr>';
      m += '<TR><TD class=xtab></td><TD class=xtab><INPUT id=srcStart type=submit value="Lancer la recherche"/></td></tr>';
      m += '</table>';
      document.getElementById ('srcOpts').innerHTML = m;
      new CdispCityPicker ('srchdcp', document.getElementById ('spInXY'), true).bindToXYboxes(document.getElementById ('srchX'), document.getElementById ('srchY'));
      document.getElementById ('BOprovinceXY').addEventListener ('change', function() {
	  if (this.value >= 1) {
	      document.getElementById ('srchX').value = Provinces[this.value].x;
		document.getElementById ('srchY').value = Provinces[this.value].y;
		  document.getElementById ('srcDist').value = "75";
	  }
	  }, false); 
      document.getElementById ('srcStart').addEventListener ('click', t.clickedSearch, false);
      t.state = 1;
    }
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
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  },

  clickedSearch : function (){
    var t = my.Search;

    if (t.searchRunning){
      t.stopSearch ('RECHERCHE ANNULEE !');
      return;
    }
    t.opt.searchType = document.getElementById ('srcType').value;
    t.opt.startX = parseInt(document.getElementById ('srchX').value);
    t.opt.startY = parseInt(document.getElementById ('srchY').value);
    t.opt.maxDistance = parseInt(document.getElementById ('srcDist').value);
    t.opt.maxDistanceA = parseInt(document.getElementById ('srcaDist').value);
    errMsg = '';

    if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>749)
      errMsg = "X doit &ecirc;tre entre 0 et 749<BR>";
    if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>749)
      errMsg += "Y doit &ecirc;tre entre 0 et 749<BR>";
    if (isNaN (t.opt.maxDistanceA) ||t.opt.maxDistanceA<0)
     errMsg += "La distance mini doit &ecirc;tre sup&eacute;rieur &agrave; 0<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1)
      errMsg += "La distance maxi doit &ecirc;tre sup&eacute;rieur &agrave; 1<BR>";
    if (t.opt.maxDistance<=t.opt.maxDistanceA)
      errMsg += "La distance max doit &ecirc;tre sup&eacute;rieur &agrave; la distance mini<BR>";
    if(t.opt.maxDistanceA > 375)
       errMsg += "La distance max ne peut d&eacute;passer 375 ! au risque de p&ecirc;ter votre navigateur<BR>";
    if (errMsg != ''){
      document.getElementById('srcResults').innerHTML = '<FONT COLOR=#660000>ERREUR :</font><BR><BR>'+ errMsg;
      return;
    }

    t.searchRunning = true;
  document.getElementById ('srcStart').value = 'Stopper la recherche';
    m = '<DIV class=ptstat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=statSearched></div></td>\
        <TD class=xtab align=center><SPAN id=statStatus></span></td>\
        <TD class=xtab align=right width=125><DIV id=statFound></div></td></tr></table></div>\
      <TABLE width=100%><TR valign=top><TD><DIV id=divOutTab style="height:470px; max-height:470px; overflow-y:auto; width:420px;"></div></td>\
      <TD id="tddivOutOpts" width=100% height=100% style="background:#e0e0f0; height:100%; padding:5px"><DIV id=divOutOpts></div></td></tr><tr><td colspan=2><div id=BOdivKOCAttackExport style="position:absolute;background-color:white;height:470px; max-height:470px; overflow-y:auto; width:600px;display:none"></div></td><input type=checkbox id=ShowHideOpts>Voir/Cacher les options (permets d\'avoir le plein &eacute;cran)</tr></table>';
    document.getElementById('srcResults').innerHTML = m;
     //
     document.getElementById('ShowHideOpts').addEventListener ('click', function (){
		  if (document.getElementById("ShowHideOpts").checked) {
		  document.getElementById("tddivOutOpts").style.display="none";
		  document.getElementById("divOutTab").style.width="710px";
		  } else {
		  document.getElementById("tddivOutOpts").style.display="block";
		  document.getElementById("divOutTab").style.width="420px";
		  }
	  }, false);
     
    if (t.opt.searchType == 0)
      typeName = 'Camps Barbares';
    else if (t.opt.searchType == 1)
      typeName = 'Terres Sauvages';
	else 
	  typeName = 'Villes';

    m = '<CENTER><B>Recherche de '+ typeName +'<BR>\
        Centre : '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; Distance : '+ t.opt.maxDistanceA +' &agrave; '+ t.opt.maxDistance +'<BR></center>\
        <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>OPTIONS :</b><BR></td></tr>';
    if (t.opt.searchType == 1 || t.opt.searchType == 0) {
     m += '<TR><TD class=xtab align=right>Niveau Min. :</td><TD class=xtab> <INPUT id=filMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD class=xtab align=right>Niveau Max. :</td><TD class=xtab> <INPUT id=filMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
	}
    if (t.opt.searchType == 1){
      m += '<TR><TD class=xtab align=right>Type TS :</td><TD class=xtab align=right>\
            Woodlands<INPUT id=woodWild type=CHECKBOX'+ (Options.woodWild?' CHECKED':'') +'></td></tr>';
      m += '<TR><TD class=xtab align=right>Prairie/Lac<INPUT  id=foodWild type=CHECKBOX '+ (Options.foodWild?' CHECKED':'') +'></td>\
	       <TD class=xtab align=right>Montagne<INPUT id=mtnWild type=CHECKBOX '+ (Options.mtnWild?' CHECKED':'') +'></td></tr>';
      m += '<TR><TD class=xtab align=right>Plaine<INPUT id=plnWild type=CHECKBOX '+ (Options.plnWild?' CHECKED':'') +'></td>\
           <TD class=xtab align=right>Collines<INPUT id=hillWild type=CHECKBOX'+ (Options.hillWild?' CHECKED':'') +'></td></tr>';
      m += '<TR><TD class=xtab align=right>Libre Seulement :</td><TD class=xtab><INPUT id=filUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    } 
    if (t.opt.searchType == 1 || t.opt.searchType == 0) {
        m+= '<TR><TD class=xtab align=right>Trier Par :</td><TD class=xtab><SELECT id=filSortBy>\
          <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Niveau</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>';
          if (t.opt.searchType == 1) {
                m+= '<OPTION value="play" '+ (Options.srcSortBy=='play'?'SELECTED':'')  +'>Joueur</option>';
          m+= '<OPTION value="alli" '+ (Options.srcSortBy=='alli'?'SELECTED':'')  +'>Alliance</option>';
            }    
		  m+= '</select></td></tr>\
			<TR><TD class=xtab align=right>Coords :</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
			</table></div><BR><SPAN id=srchSizeWarn></span><DIV id=BOpbSrcExp></div>';
    } else {
			
		m+= '<TR><TD class=xtab align=right >Voir :</td><TD class=xtab align=left ><SELECT style="width: 135px" id=idSrchFilter>\
             <OPTION value=0>Toutes les villes</option>\
             <OPTION value=1>Hostile Seulement</option>\
	     <OPTION value=2>Sous la brume Seulement</option>\
	     <OPTION value=3>Allie Seulement</option>\
	     <OPTION value=4>Amis Seulement</option>\
	     <OPTION value=5>Neutre Seulement</option>\
	     <OPTION value=6>Sans alliance Seulement </option>\
             </select></td></tr>';
	
		m+= '<TR><TD class=xtab align=right>Trier Par :</td><TD class=xtab><SELECT id=filSortBy>\
          <OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Puissance</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
                  <OPTION value="play" '+ (Options.srcSortBy=='play'?'SELECTED':'')  +'>Joueur</option>\
        <OPTION value="alli" '+ (Options.srcSortBy=='alli'?'SELECTED':'')  +'>Alliance</option>\
        </select></td></tr>\
        <tr><TD class=xtab align=right>Puissance mini :</td><TD class=xtab><select id=filPuissance>\
         <option value="0" '+ (Options.filPuissance=='0'?'SELECTED':'')  +'>0</option>\
         <option value="500" '+ (Options.filPuissance=='500'?'SELECTED':'')  +'>500</option>\
         <option value="2500" '+ (Options.filPuissance=='2500'?'SELECTED':'')  +'>2 500</option>\
         <option value="10000" '+ (Options.filPuissance=='10000'?'SELECTED':'')  +'>10 000</option>\
         <option value="50000" '+ (Options.filPuissance=='50000'?'SELECTED':'')  +'>50 000</option>\
         <option value="100000" '+ (Options.filPuissance=='100000'?'SELECTED':'')  +'>100 000</option>\
         <option value="500000" '+ (Options.filPuissance=='100000'?'SELECTED':'')  +'>500 000</option>\
         </select></td></tr>\
         <tr><TD class=xtab align=right>Puissance max :</td><TD class=xtab><select id=filPuissanceMax>\
         <option value="500" '+ (Options.filPuissanceMax=='500'?'SELECTED':'')  +'>500</option>\
         <option value="2500" '+ (Options.filPuissanceMax=='2500'?'SELECTED':'')  +'>2 500</option>\
         <option value="10000" '+ (Options.filPuissanceMax=='10000'?'SELECTED':'')  +'>10 000</option>\
         <option value="50000" '+ (Options.filPuissanceMax=='50000'?'SELECTED':'')  +'>50 000</option>\
         <option value="100000" '+ (Options.filPuissanceMax=='100000'?'SELECTED':'')  +'>100 000</option>\
         <option value="500000" '+ (Options.filPuissanceMax=='100000'?'SELECTED':'')  +'>500 000</option>\
         <option value="1000000" '+ (Options.filPuissanceMax=='1000000'?'SELECTED':'')  +'>1 000 000</option>\
         <option value="100000000" '+ (Options.filPuissanceMax=='100000000'?'SELECTED':'')  +'>100 millions</option>\
         </select></td></tr>\
        <TR><TD class=xtab align=right>Coords :</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
         </table></div><BR><SPAN id=srchSizeWarn></span>';	
	}
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
    document.getElementById('foodWild').addEventListener ('change', function(){
        Options.foodWild = document.getElementById('foodWild').checked;
        saveOptions();
        t.dispMapTable ();
        }, false);
    document.getElementById('hillWild').addEventListener ('change', function(){
        Options.hillWild = document.getElementById('hillWild').checked;
        saveOptions();
        t.dispMapTable();
        }, false);
    document.getElementById('mtnWild').addEventListener ('change', function(){
        Options.mtnWild = document.getElementById('mtnWild').checked;
        saveOptions();
        t.dispMapTable();
        }, false);
    document.getElementById('plnWild').addEventListener ('change', function(){
        Options.plnWild = document.getElementById('plnWild').checked;
        saveOptions();
        t.dispMapTable();
        }, false);
    document.getElementById('woodWild').addEventListener ('change', function(){
        Options.woodWild = document.getElementById('woodWild').checked;
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

	document.getElementById('idSrchFilter').addEventListener ('change', function (){
        Options.citySrchFilter = (document.getElementById('idSrchFilter').value);
        saveOptions();
        t.dispMapTable ();
        }, false);

	document.getElementById('idSrchFilter').value = Options.citySrchFilter;
	
       
        document.getElementById('filPuissance').addEventListener ('change', function (){
        Options.filPuissance = parseInt(document.getElementById('filPuissance').value);
        saveOptions();
        t.dispMapTable ();
        }, false);
        document.getElementById('filPuissanceMax').addEventListener ('change', function (){
        Options.filPuissanceMax = parseInt(document.getElementById('filPuissanceMax').value);
        saveOptions();
        t.dispMapTable ();
        }, false);
	
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
    document.getElementById ('statStatus').innerHTML = 'Recherche sur '+ xxx +','+ yyy;
if (DEBUG_TRACE) logit (" 0 clickedSearch()... setTimeout ..:" + xxx +' , '+ yyy +' , '+ t.mapCallback.name);
    setTimeout (function(){Map.request (xxx, yyy, 15, t.mapCallback)}, MAP_DELAY);
  },

  dispMapTable : function (){
    var tileNames = ['Camps barbares', 'Prairie', 'Lac', 'Bois', 'Collines', 'Montagne', 'Plaine', 'Ville' ];
    var t = my.Search;
    var coordsOnly = document.getElementById('coordsOnly').checked;
if (DEBUG_TRACE) DebugTimer.start();
    function mySort(a, b){
      if (Options.srcSortBy == 'level'){
        if ((x = a[4] - b[4]) != 0)
          return x;
      }
	  if (Options.srcSortBy == 'might'){
        if ((x = b[10] - a[10]) != 0)
          return x;
      }
      if (Options.srcSortBy == 'alli'){
          
          if (a[11] < b[11]) return -1;
	      else if (a[11] == b[11]) return 0;
	       else return 1;
          
      }
        if (Options.srcSortBy == 'play'){
         
          if (a[9] < b[9]) return -1;
	      else if (a[9] == b[9]) return 0;
	       else return 1;
          
      }
      return a[2] - b[2];
    }

    dat = [];
    for (i=0; i<t.mapDat.length; i++){
      lvl = parseInt (t.mapDat[i][4]);
      type = t.mapDat[i][3];
      puissance = t.mapDat[i][10];
	  if (t.opt.searchType == 2 && type == 7 ) {
	  
	  switch(parseInt (Options.citySrchFilter)) {
                case 0:
                 if (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax) {
                  dat.push(t.mapDat[i]);
                 }
                 break;
                case 1:
                   if ((t.mapDat[i][12] == 'Hostile') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                case 2:
                   if ((t.mapDat[i][5]===true) && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                case 3:
                   if ((t.mapDat[i][12] == 'Ally') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                case 4:
                   if ((t.mapDat[i][12] == 'Friendly') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                case 5:
                   if ((t.mapDat[i][12] == 'Neutral') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                 case 6:
                   if ((t.mapDat[i][12] == 'unaligned') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
             }

		
	  } else {
       if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
        if (t.opt.searchType==0
            || (Options.woodWild==1 && type == 3)
            || (Options.hillWild==1 && type ==4)
            || (Options.mtnWild==1 && type==5)
            || (Options.plnWild==1 && type == 6)
            || (Options.foodWild==1 && (type==1 || type==2)))
          if (!Options.unownedOnly || t.mapDat[i][5]===false)
            dat.push (t.mapDat[i]);
        }
       }
    }
    document.getElementById('statFound').innerHTML = 'Trouv&eacute : '+ dat.length;
    if (dat.length == 0){
      m = '<BR><CENTER>Non trouv&eacute;</center>';
    } else {
      dat.sort(mySort);
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: SORT');
      if (coordsOnly)
        m = '<TABLE align=center id=srcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Location</td></tr>';
      else {
        if (t.opt.searchType == 0) {
			m = '<TABLE id=srcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Lieu</td><TD style="padding-left: 10px">Dist</td><TD style="padding-left: 10px;">Niv</td><TD style="padding-left: 10px;">Type</td></tr>';
		}
		if (t.opt.searchType == 1) {
			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Lieu</td><TD style="padding-left: 10px">Dist</td><TD style="padding-left: 10px;">Niv</td><TD style="padding-left: 10px;">Type</td><TD style="padding-left: 10px;">Joueur</td><td style="padding-left: 10px;">Puissance</td><td style="padding-left: 10px;">Alliance</td><td>Statut</td><td>Connexion</td></tr>';
		}
		if (t.opt.searchType == 2) {
			 m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Loc</td><TD >Dist</td><TD>Ville</td><TD>Proprio</td><TD>Puis.</td><td>Alliance </td><TD width=80% style="font-size:9px;">Plus info</td></tr>';
		}
	
	  }
	  var numRows = dat.length;
      if (numRows > 500 && t.searchRunning){
        numRows = 500;
        document.getElementById('srchSizeWarn').innerHTML = '<FONT COLOR=#600000>NOTE : Le tableau montre seulement 500 des '+ dat.length +' resultats jusqu\'a ce que la recherche soit termin&eacute;e.</font>';
      }
      for (i=0; i<numRows; i++){
        m += '<TR valign="top"';
		if (dat[i][12]) m += 'class="'+dat[i][12]+'"';
		
		if (coordsOnly) {
		   m += ' ><TD valign="top"><DIV>'+ dat[i][0] +','+ dat[i][1] +'</div></td></tr>';
        } else {
           m += ' ><TD valign="top"><DIV>\
	             <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ dat[i][0] +','+ dat[i][1] +')</a></div></td>';
   		  if (t.opt.searchType == 2) { 
			m += '<TD align="left"  valign="top"><DIV title="Eclaireur !" onclick="PTscout('+ dat[i][0] +','+ dat[i][1] +');return false;">'+ dat[i][2].toFixed(2) +'</a></td><TD align=left>'+ dat[i][8] +'</td><TD valign="top">'+dat[i][9]+'</td><TD valign="top">'+dat[i][10]+'</td><td>'+dat[i][11]+'</td><td>';
			if (dat[i][5]) {
			 m += '<DIV onclick="PTscout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A style="font-size:9px;" >Eclairer</a></div>';
			} else {
			 m += '<DIV onclick="PTpd(this, '+ dat[i][7] +')"><A style="font-size:9px;" >Details</a></div> <DIV style="" onclick="PTpd2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Tableau Honneur</a></div>\
			 		<DIV style="" onclick="PCpo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Statut</a></div>\
					<DIV style="" onclick="PCplo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Derniere Connexion</a></div>';
             m+= '</td></tr>';
            }
		  } else { 
           m += '<TD align=right  valign="top">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ tileNames[dat[i][3]];
             +'</td>';
           if (t.opt.searchType == 1) {
            if (dat[i][5]) {
             m += '<td>'+dat[i][9]+'<td>'+dat[i][10]+'</td><td>'+dat[i][11]+'</td>';
             
             if (dat[i][7] && dat[i][7]!=0) {
             m+='<td><DIV style="" onclick="PCpo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Statut</a></div></td><td><DIV style="" onclick="PCplo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Derniere Connexion</a></div></td>';
             } else {
             m+='<td>&nbsp;</td><td>&nbsp;</td>';
             }
             
            
            } else  {
             m +='<td colspan=5 style="text-align=center"><i><b>libre...</b></i>';
            }
		   }else{
            m+="<td></td>";
           }
            m +='</tr>';
		  }
		}
       }
      m += '</table>';
    }
    document.getElementById('divOutTab').innerHTML = m;
    dat = null;
  },

  mapDat : [],

  stopSearch : function (msg){
    var t = my.Search;
    document.getElementById ('statStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';
    document.getElementById ('srcStart').value = 'Lancer la recherche';
    document.getElementById('srchSizeWarn').innerHTML = '';
    if (t.opt.searchType==0 && document.getElementById('KOCAttackToggle')!=null){    
      document.getElementById('BOpbSrcExp').innerHTML = '<CENTER>'+ strButton20('Exporter le r&eacute;sultat', 'id=BOpbSrcDoExp') +'</center>'; 
      document.getElementById ('BOpbSrcDoExp').addEventListener ('click', t.exportKOCattack, false);
    }
    t.searchRunning = false;
  },
  
  
  clickedPlayerCheckOnline : function (span, uid){
          var t = my.AllianceList;
      	var s = my.Search;
          span.onclick = '';
          span.innerHTML = "recherche en cours...";
          t.fetchPlayerStatus (uid, function (r) {s.gotPlayerStatus(r, span, uid)});
        },
      
 clickedPlayerGetLastLogin : function (span, uid){
          var t = my.AllianceList;
      	var s = my.Search;
          span.onclick = '';
          span.innerHTML = "recherche en cours ...";
          t.fetchPlayerLastLogin (uid, function (r) {s.gotPlayerLastLogin(r, span)});
  },
  gotPlayerStatus : function (rslt, span,uid){
      var t = Tabs.AllianceList;
      if (!rslt.ok){
        span.innerHTML = rslt.errorMsg;
        return;
      }
  
      var p = rslt.data;
      if (p[uid] == true) {
        m = '<span style="color:green"><b>En Ligne!</b></span>';
      } else {
         m = '<span style="color:red"><b>Pas en ligne</b></span>';
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
        m = '<span style="color:black">'+lastLogin+'</span>';
      } else {
         m = '<span style="color:red">? '+lastLogin+'</span>';
      }  
      span.innerHTML = m + '';
  },
  
  exportKOCattack : function (){
     var t = my.Search;
     var bulkAdds = {};
     for (i=1; i<11; i++)
       bulkAdds['lvl'+ i] = [];
     for (i=0; i<t.mapDat.length; i++){
       var lvl = parseInt (t.mapDat[i][4]);
       if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel && t.mapDat[i][3]==0)
         bulkAdds['lvl'+ lvl].push({x:t.mapDat[i][0], y:t.mapDat[i][1]});
     }
     
     exportToKOCattackBO.doExport (bulkAdds, t.selectedCity);
  },
  
  mapCallback : function (left, top, width, rslt){
    function insertRow (x, y, msg){
      row = document.getElementById('srcOutTab').insertRow(-1);
      row.insertCell(0).innerHTML = x +','+ y;
      row.insertCell(1).innerHTML = distance (t.opt.startX, t.opt.startY, x, y);
      row.insertCell(2).innerHTML = msg;
    }
if (DEBUG_TRACE) logit (" 3 mapCallback()");
    var t = my.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('ERREUR : '+ rslt.errorMsg);
      return;
    }

    map = rslt.data;
    var userInfo = rslt.userInfo;
    var alliance = rslt.allianceNames;

    for (k in map){
      if (t.opt.searchType==0 && map[k].tileType==51 && !map[k].tileCityId ) {  // if barb
        type = 0;
      } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) {
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11)
          type = 2;
        else
          type = (map[k].tileType/10) + 1;
      } else if (t.opt.searchType==2 && map[k].tileCityId >= 0 && map[k].tileType > 50 && map[k].cityName) {
		  type = 7;
      } else {
        continue;
      }
      dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      if (dist <= t.opt.maxDistance && dist >= t.opt.maxDistanceA){
		  if (t.opt.searchType==2) {
			var isMisted = map[k].tileUserId == 0 || false;		
			var uu = 'u'+map[k].tileUserId;
			var aU = 'inconnu';
			var aD = 'inconnu';
			var mightU = 0;
			var nameU = 'inconnu';
			if (isMisted) {
				nameU = 'Brume';
				mightU = 0; 
			} else {
				if (userInfo[uu] ) { // Corrects a problem with hung search.
					nameU = "<a onclick=getInfoForAnUser('"+ map[k].tileUserId +"');>"+ userInfo[uu].n +"</a>";
					mightU = userInfo[uu].m; 
					aD = getDiplomacy2(userInfo[uu].a);
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
			var uu = 'u'+map[k].tileUserId;
			var aU = 'inconnu';
			var aD = 'inconnu';
			var nameU = 'inconnu';
			var mightU = 0;
			if (map[k].misted) {
				nameU = 'Sous la Brume';
			}else {
			 if (userInfo[uu] ) {
			   var nameU = "<a onclick=getInfoForAnUser('"+ map[k].tileUserId +"');>"+ userInfo[uu].n +"</a>";
			   mightU = userInfo[uu].m; 
			   aD = getDiplomacy2(userInfo[uu].a);
					if ( alliance && alliance['a'+userInfo[uu].a] ) {
						aU = alliance['a'+userInfo[uu].a];
					}
			 }else {
			   var nameU = 'inconnu';
			 }
			}	
			t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, map[k].tileCityId, map[k].tileUserId, map[k].cityName, nameU, mightU, aU, aD]);       
		}
			++t.tilesFound;
       }   
    }
    t.tilesSearched += (15*15);
    document.getElementById('statSearched').innerHTML = 'Trouv&eacute; : '+ t.tilesSearched;
    t.dispMapTable();

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        t.stopSearch ('Fini !');
        return;
      }
    }

    var x = t.normalizeCoord(t.curX);
    var y = t.normalizeCoord(t.curY);
    document.getElementById ('statStatus').innerHTML = 'Recherche sur '+ x +','+ y;
    //if (DEBUG_TRACE) logit (" 0 mapCallback()... setTimeout ..:" + x +' , '+ y +' , '+ t.mapCallback.toString().substr (0,50));
    setTimeout (function(){Map.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
  },
};


/*******************   KOC Map interface ****************/
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
***/
  generateBlockList : function(left, top, width) {
    var width5 = parseInt(width / 5);
    var bl = [];

    for (x=0; x<width5; x++){
      xx = left + (x*5);
      if (xx > 745)
        xx -= 750;
      for (y=0; y<width5; y++){
        yy = top + (y*5);
        if (yy > 745)
          yy -= 750;
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
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
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


/******** Export to KOC Attack **********/  

var exportToKOCattackBO = {
  troops : {},  
  
  init : function (){
      var t = exportToKOCattackBO;
      for (var b=1; b<11; b++){
        t.troops['b'+ b] = [];
        for (var trp=0; trp<12; trp++){
          t.troops['b'+ b][trp] = 0;
        }
      }
     
      var s = GM_getValue ('atkTroops_'+ getServerId(), null);
      if (s != '' && s!=null){
        var trp = JSON2.parse(s);
        // alert('4');
        for (var b=1; b<11; b++){
          if (trp['b'+ b] && trp['b'+ b].length == 12)
            t.troops['b'+ b] = trp['b'+ b];
        }
      }
      window.addEventListener('unload', t.onUnload, false);
  },
  
  onUnload : function (){
    var t = exportToKOCattackBO;
    GM_setValue ('atkTroops_'+ getServerId(),  JSON2.stringify(t.troops));
  },
  
  doExport : function (coordList, city){
    var t = exportToKOCattackBO;
    var popExp = null;
    var cList = coordList;
    var curLevel = 0;
    var city = city;
    var troopDef = [
      ['Ravil', 1],
      ['Wagon', 9],
      ['Archers', 6],
      ['Cavalerie', 7],
      ['Lourds', 8],
      ['Baliste', 10],
    ];
    var divKOCAttackExport=document.getElementById('BOdivKOCAttackExport');
    divKOCAttackExport.style.display='block';
    divKOCAttackExport.style.border='1px solid #000';
     divKOCAttackExport.style.top='100px';
      divKOCAttackExport.style.left='50px';
     var m = '<DIV id=BOdragExport class=ptstat><table width="100%" cellspacing="0" border=0><tr><td class=ptstat>Exporter les barbares directement dans KOC Attack</td><td id="idp_ExportX" onmouseover="this.style.cursor=\'pointer\'" style="color: rgb(255, 255, 255); background: none repeat scroll 0% 0% rgb(85, 85, 85); padding-left: 5px; padding-right: 5px; cursor: pointer;" valign="middle" align="right">X</td></tr></table></div><BR><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPadNW>\
      <TR style="font-weight:bold; background-color:white"><TD>Type cible</td><TD style="padding:1px" align=center>#<BR>cibles</td><TD width=17></td>';
    for (var i=0; i<troopDef.length; i++)
      m += '<TD>'+ troopDef[i][0] +'</td>';
    m += '</tr>';
    for (var b=1; b<11; b++){
      m += '<TR><TD>Barb niv '+ b +'</td><TD align=right>'+ coordList['lvl'+b].length  +'&nbsp; &nbsp;</td><TD></td>'; 
      for (var td=0; td<troopDef.length; td++)
        m += '<TD><INPUT id=ptET_'+ b +'_'+ troopDef[td][1] +' type=text size=4 value="'+ t.troops['b'+ b][troopDef[td][1]-1] +'"></td>';
      m += '<TD width=90%><SPAN class=boldRed id=ptETerr_'+ b +'></span></tr>';
    } 
    m += '</table>';
    var isKOCattack = !(document.getElementById('KOCAttackToggle') == null);
    
    //TODO: 'RESET VALUES' button ?
    if (isKOCattack){
      m += '<BR><CENTER>'+ strButton20('Ajouter les coordonn&eacute;es dans KOC Attack', 'id=pbSrcDoBA') +'</center>';
    } else {
      m += 'KOC Attack n\'est pas lanc&eacute, impossible d\'exporter';
    } 
    m += '<CENTER><DIV style="width:70%" id=pbSrcExpResult></DIV></center>'; 
    divKOCAttackExport.innerHTML =  m;
    new CWinDrag (document.getElementById('BOdragExport'), divKOCAttackExport, true);
     document.getElementById('idp_ExportX').addEventListener ('click', function() { 
      document.getElementById('BOdivKOCAttackExport').style.display="none";
      document.getElementById('BOdivKOCAttackExport').innerHTML =  "";
     }, false);
    for (var b=1; b<11; b++)
      for (var td=0; td<troopDef.length; td++)
        document.getElementById('ptET_'+ b +'_'+ troopDef[td][1]).addEventListener ('change', validate, false);
    
    //divKOCAttackExport.innerHTML = '<CENTER><B>Exportation Boite a Outils</b></center>';
    if (isKOCattack)    
      document.getElementById ('pbSrcDoBA').addEventListener ('click', doBulkAdd, false);
    //popExp.show(true);
         
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
      if (isNaN(x) || x<0 || x>100000){
        e.target.style.backgroundColor = 'red';
        document.getElementById('ptETerr_'+ b).innerHTML = 'Entr&eacute;e invalide';
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
        document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
      if (tot>100000)
        document.getElementById('ptETerr_'+ b).innerHTML = 'Trop de troupes';
    }
      
    function doBulkAdd (){
      for (var b=1; b<11; b++){
        if (document.getElementById('ptETerr_'+ b).innerHTML != '')
          return;
        var tot = 0;
        for (var td=0; td<troopDef.length; td++)
          tot += t.troops['b'+b][troopDef[td][1]-1];
        if (tot<1 && cList['lvl'+ b].length>0){
          document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
          return; 
        } else if (tot>100000) {
          document.getElementById('ptETerr_'+ b).innerHTML = 'Trop de troupes';
          return; 
        }
      }    
      document.getElementById('pbSrcExpResult').innerHTML = '';
      setTimeout(function() { doNextLevel (); }, 100);
    }
    
    function endBulkAdd (msg){
      unsafeWindow.Modal.hideModalAll(); 
      curLevel = 0;
      document.getElementById('pbSrcExpResult').innerHTML += msg;
    }
    
    function doNextLevel (){
      while ( curLevel<10 && cList['lvl'+ ++curLevel].length==0)
        ;
      if (curLevel>=10){
        unsafeWindow.Modal.hideModalAll(); 
	curLevel = 0;
        document.getElementById('pbSrcExpResult').innerHTML += "Fini !";
        //setTimeout(function() { divKOCAttackExport.innerHTML=""; }, 1000);
        return;
      }
      setTimeout(function() {
       unsafeWindow.Modal.hideModalAll(); 
       unsafeWindow.modal_attack(4,0,0);
       new CwaitForElement ('BulkAddAttackDiv', 5000, e_attackDialog );
      }, 500);
    }
        
    function e_attackDialog (tf){
      if (!tf){
        endBulkAdd ('<SPAN class=boldRed>ERREUR: impossible d\'ouvrir la page attaque</span>');
        return;  
      } 
      var div = searchDOM (document.getElementById('BulkAddAttackDiv'), 'node.tagName=="DIV" && node.style.display=="none"', 10);
      if (div==null){
        endBulkAdd ('<SPAN class=boldRed>ERREUR: Unexpected attack dialog format (1).</span>');
        return;  
      }
      var ta = searchDOM (div, 'node.tagName=="TEXTAREA"', 10);
      var but = searchDOM (div, 'node.tagName=="A"', 10);
      if (ta==null || but==null){
        endBulkAdd ('<SPAN class=boldRed>ERREUR: Unexpected attack dialog format (2).</span>');
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
      
        var m = '';
        var list = cList['lvl'+ (curLevel)];
        for (i=0; i<list.length; i++)
          m += list[i].x +','+ list[i].y +'\n';
        ta.value = m;
      clickWinBO(unsafeWindow, but, 'click');
      unsafeWindow.Modal.hideModal();
      //alert('ici');
      //document.getElementById('pbSrcExpResult').innerHTML += 'Ajout de '+ list.length +' coordonnees sur '+ city.name +'<BR>';
      //alert('la');
      setTimeout (doNextLevel, 1000);
    }    
  },
}

function clickWinBO(win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
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

/*************************************** Train Tab ***********************************************/

my.Train = {
  cont : null,
  timer : null,
  state : null,
  stats : {},
  selectedCity : {},
  sourceCity : {},
  destinationCity : {},

  init : function (){
    var t = my.Train;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.Train;
    return t.cont;
  },

  hide : function (){
    var t = my.Train;
    clearTimeout (t.timer);
  },
  
  show : function (){
    var t = my.Train;
    clearTimeout (t.timer);
    if (t.state == null){
      s = "<DIV id=trainTopSelect >\
        <DIV class=ptstat>Former des troupes et construire des d&eacute;fenses sur les remparts</div><DIV style='height:10px'></div><DIV class=ptentry>\
        <DIV style='text-align:center; margin-bottom:10px;'>Ville : &nbsp; <span id=ptspeedcity></span></div>\
        <TABLE class=ptTab width=100%><TR valign=top><TD width=50%>\
        <TABLE align=center><TR><TD align=right>Type de troupe : </td><TD colspan=2>\
        <SELECT id=ptttType>";
         for (r=1; r<13; r++){
         s+= "<option value='"+r+"'>"+unsafeWindow.unitcost['unt'+r][0]+"</option>";
        } 
       s+= " </select> <br> (max <span id=ptttSpMax></span>)</td></tr>\
        <TR><TD align=right>par slot de </td><TD><INPUT id='ptttInpPS' size=5 type='text' value='0'\></td>\
          <TD><INPUT id='ptttButMaxPS' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxPS>0</span>)</td></tr>\
        <TR><TD align=right>sur</td><TD><INPUT id='ptttInpSlots' size=2 type='text' value='1'\> slots</td>\
          <TD width=75%><INPUT id='ptttButMaxSlots' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxSlots>1</span>)</td></tr>\
        <TR><TD align=right valign=top>Utiliser la force de travail : </td><TD colspan=2><INPUT type=CHECKBOX id=chkPop"+ (Options.maxIdlePop?' CHECKED ':'') +"></td></tr>\
        <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='ptttButDo' type=submit value='Former'\></td></tr>\
        </table></td><TD width=20></td><TD style='border-left:solid 2px;' width=50% align=center>\
        <TABLE align=center><TR><TD align=right>Type de d&eacute;fenses : </td><TD colspan=2>\
        <SELECT id=pttdType>\
          <option value='53'>Arbal&egrave;tes mont&eacute;es</option>\
          <option value='55'>Tr&eacute;buchet D&eacute;fensif</option>\
          <option value='60'>Pi&egrave;ge</option>\
          <option value='61'>Chausse-trape</option>\
          <option value='62'>Palissade &agrave; Pointes</option>\
        </select> <br> (<span id=pttdSpMax></span>)</td></tr>\
        <TR><TD align=right># par slot de </td><TD><INPUT id='pttdInpPS' size=5 type='text' value='0'\></td>\
          <TD><INPUT id='pttdButMaxPS' type=submit value='max'\> (max <span id=pttdSpMaxPS>0</span>)</td></tr>\
        <TR><TD align=right># sur </td><TD><INPUT id='pttdInpSlots' size=2 type='text' value='1'\> slots</td>\
          <TD width=75%><INPUT id='pttdButMaxSlots' type=submit value='max'\> (max <span id=pttdSpMaxSlots>1</span>)</td></tr>\
        <TR align=center><TD colspan=3><SPAN id=pttdSpace></span></td></tr>\
        <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='pttdButDo' type=submit value='Construire'\></td></tr></table>\
        </td></tr></table></div></div>\
        <TABLE align=center width=425 class=ptTab><TR><TD><div id=ptTrainStatus style='overflow-y:auto; max-height:70px; height: 70px;'></div></td></tr></table>\
        <div style='height: 315px; background: #e8ffe8; max-height:315px; overflow-y:auto'>\
        <TABLE width=100% class=ptTab><TR><TD colspan=3><DIV id=divSTtop></div></td></tr>\
        <TR><TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>File d\'attente de troupes &nbsp; (<SPAN id=statTTtot></span>)</b><BR><HR></div><DIV id=divSTleft style='overflow-y: auto; height:210px; max-height:210px'></div></td>\
          <TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>File d\'attente de d&eacute;fenses &nbsp; (<SPAN id=statDTtot></span>)</b><BR><HR></div><DIV id=divSTright style='overflow-y: auto; height:210px; max-height:210px'></div></td></tr>\
        </div></div>";
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
      t.state = 1;
    }

    t.displayCityStats();
    t.changeTroopSelect();
    t.changeDefSelect();
    t.timer = setTimeout (t.show, 2000);
  },


/*******  TROOPS  ******/  
  
  updateTopTroops : function (){
    var t = my.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TTspMax.innerHTML = t.stats.MaxTrain;
    t.TTspMaxSlots.innerHTML = t.stats.barracks - t.stats.queued;
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTspMaxPS.innerHTML = 0;
    else
      t.TTspMaxPS.innerHTML = parseInt(t.stats.MaxTrain / slots);
  },
      
  
  clickTroopMaxPS : function (){
    var t = my.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTinpPerSlot.value = 0;
    else
      t.TTinpPerSlot.value = parseInt(t.stats.MaxTrain / slots);
  },

  clickTroopMaxSlots : function (){
    var t = my.Train;
    t.TTinpSlots.value = t.stats.barracks - t.stats.queued;
  },
  
  clickCitySelect : function (city){
    var t = my.Train;
    t.selectedCity = city;
    t.lastQueString = null;   
    t.lastDQueString = null;   
    t.displayCityStats ();
    t.changeTroopSelect();
    t.changeDefSelect();
  },
  
  clickCheckIdlePop : function (){
    var t = my.Train;
    if (document.getElementById ('chkPop').checked)
      Options.maxIdlePop = true;
    else
      Options.maxIdlePop = false;
    saveOptions ();
    t.displayCityStats ();
    t.changeTroopSelect ();
  },
  limitingFactor : null,
  changeTroopSelect : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TTselType.value;
    t.lastTroopSelect = id;
    t.limitingFactor = null;
    var uc = unsafeWindow.unitcost['unt'+id];
    var max = 9999999999;
    if ( (t.stats.food / uc[1]) < max){
      max = t.stats.food / uc[1];
      t.limitingFactor = 'food';
    }
    if ( (t.stats.wood / uc[2]) < max){
      max = t.stats.wood / uc[2];
      t.limitingFactor = 'wood';
    }
    if ( (t.stats.stone / uc[3]) < max){
      max = t.stats.stone / uc[3];
      t.limitingFactor = 'stone';
    }
    if ( (t.stats.ore / uc[4]) < max){
      max = t.stats.ore / uc[4];
      t.limitingFactor = 'ore';
    }
    if ( (t.stats.idlePop / uc[6]) < max){
      max = t.stats.idlePop / uc[6];
      t.limitingFactor = 'pop';
    }    t.stats.MaxTrain = parseInt (max);
    if (t.stats.MaxTrain < 0)
      t.stats.MaxTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxTrain = 0;
          t.limitingFactor = null;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxTrain = 0;
          t.limitingFactor = null;
          break;
        }
      }
    }
    /*if (t.limitingFactor){
      document.getElementById('ptttr_'+ t.limitingFactor).className = 'boldRed';
    }  */
    t.updateTopTroops();
  },

  clickTroopDo : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TTselType.value;
    var perSlot = parseInt(t.TTinpPerSlot.value, 10);
    var numSlots = parseInt(t.TTinpSlots.value, 10);
    
    t.displayCityStats ();
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Nombre de troupes par slot incorrect (doit etre > 0)</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Impossible de former autant de troupes ! (le max est de '+ t.stats.MaxTrain +')</font>';
      return;
    }
    if (numSlots<1 || numSlots>t.stats.barracks - t.stats.queued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Nombre incorrect de slots.</font>';
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
    var t = my.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TDspMax.innerHTML = 'max:'+ t.stats.MaxDefTrain +'&nbsp; actuel:'+ t.stats.defOwned;   
    t.TDspMaxSlots.innerHTML = t.stats.wallLevel-t.stats.Dqueued;
    if (slots<1)
      t.TDspMaxPS.innerHTML = 0;
    else
      t.TDspMaxPS.innerHTML = parseInt(t.stats.MaxDefTrain / slots);

    t.TDspSpace.innerHTML = 'Niveau du rempart : <B>'+ t.stats.wallLevel +'</b><BR>D&eacute;fense des Remparts : '+ (t.stats.wallSpaceUsed+t.stats.wallSpaceQueued)  +'/<B>'+ t.stats.wallSpace +'</b><BR>\
        D&eacute;fense des Champs : '+ (t.stats.fieldSpaceUsed+t.stats.fieldSpaceQueued) +'/<B>'+ t.stats.fieldSpace +'</b>';
  },

  changeDefSelect : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TDselType.value;
    t.lastDefSelect = id;
    t.stats.defOwned = parseInt(Seed.fortifications['city' + cityId]['fort'+id]);    
    var uc = unsafeWindow.fortcost['frt'+id];
    var max = 9999999999;
    if ( (t.stats.food / uc[1]) < max)
      max = t.stats.food / uc[1];
    if ( (t.stats.wood / uc[2]) < max)
      max = t.stats.wood / uc[2];
    if ( (t.stats.stone / uc[3]) < max)
      max = t.stats.stone / uc[3];
    if ( (t.stats.ore / uc[4]) < max)
      max = t.stats.ore / uc[4];
    if ( (t.stats.idlePop / uc[6]) < max)
      max = t.stats.idlePop / uc[6];
    t.stats.MaxDefTrain = parseInt (max);
    if (t.stats.MaxDefTrain < 0)
      t.stats.MaxDefTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxDefTrain = 0;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxDefTrain = 0;
          break;
        }
      }
    }

    var spaceEach = parseInt(unsafeWindow.fortstats["unt"+ id][5]);
    if (id<60)
      var spaceAvail = t.stats.wallSpace - t.stats.wallSpaceUsed - t.stats.wallSpaceQueued;
    else
      var spaceAvail = t.stats.fieldSpace - t.stats.fieldSpaceUsed - t.stats.fieldSpaceQueued;
    if ( t.stats.MaxDefTrain * spaceEach > spaceAvail)
      t.stats.MaxDefTrain = parseInt(spaceAvail / spaceEach);
    
    t.updateTopDef();
  },
  
  clickDefMaxPS : function (){
    var t = my.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (slots<1)
      t.TDinpPerSlot.value = 0;
    else
      t.TDinpPerSlot.value = parseInt(t.stats.MaxDefTrain / slots);
  },

  clickDefMaxSlots : function (){
    var t = my.Train;
    t.TDinpSlots.value = t.stats.wallLevel-t.stats.Dqueued;
  },
    
  clickDefDo : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TDselType.value;
    var perSlot = parseInt(t.TDinpPerSlot.value, 10);
    var numSlots = parseInt(t.TDinpSlots.value, 10);
    
    t.displayCityStats ();
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Le nombre d\'unit&eacute; par slot doit &ecirc;tre au dessus de 0.</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxDefTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Impossible de former, trop d\'unit&eacute; (le max est de '+ t.stats.MaxDefTrain +')</font>';
      return;
    }
    if (numSlots<1 || numSlots > t.stats.wallLevel-t.stats.Dqueued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Nombre de slots incorrecte.</font>';
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
    var t = my.Train;
    try {
      t.displayCityStats();
      if (errMsg){
        t.dispTrainStatus ('<font color=#550000><B>ERREUR : '+ errMsg +'</b></font><BR>');
        t.setBusy(false);
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.dispTrainStatus ('<B>File d\'attente d&eacute;fenses termin&eacute;e.</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Construction '+ cmd[2] +' '+  fortNamesShort[cmd[1]] +'<BR>');
          doDefTrain ( cityId, cmd[1], cmd[2], 
          function(errMsg){
            setTimeout(function (){my.Train.doDefQueue(cityId, que, errMsg);}, (Math.random()*3500)+1500);
          } );
      }
    } catch (err) {
      //logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>PROGRAMME ERREUR : '+ err.message +'</font><BR>');
      t.setBusy(false);
    }
  },
  

  setBusy : function (tf){
    var t = my.Train;
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
    var t = my.Train;
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
    
    // Consommation en ressource suivant le nombre d'unité choissi 
    // type de troupes : t.TDselType
    cost = unsafeWindow.unitcost['unt'+t.TTselType.value];
    nbunit=t.TTinpPerSlot.value*t.TTinpSlots.value;
    consoFood = cost[1] * nbunit;
    styleFood="";stylePop="";styleWood="";styleOre="";styleStone="";
    if (consoFood>t.stats.food) styleFood='style="color:#E30;font-weight:bold;"';
    consoOre = cost[4] * nbunit;
    if (consoOre>t.stats.ore) styleOre='style="color:#E30;font-weight:bold;"';
    consoStone = cost[3] * nbunit;
    if (consoStone>t.stats.stone) styleStone='style="color:#E30;font-weight:bold;"';
    consoWood = cost[2] * nbunit;
    if (consoWood>t.stats.wood) styleWood='style="color:#E30;font-weight:bold;"';
    consoPop = cost[6] * nbunit;
    if (consoPop>t.stats.idlePop) stylePop='style="color:#E30;font-weight:bold;"';
    var m = '<CENTER><B>'+ Cities.byID[cityId].name +' &nbsp;\
       <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ Cities.byID[cityId].x +','+ Cities.byID[cityId].y +')</a></b></center><HR>';
       
    m += '<TABLE class=ptTab width=100%><TR align=center>\
        <TD width=8%><B>Ravi:</b></td><TD width=8%><B>Mili:</b></td><TD width=8%><B>Ecla:</b></td>\
        <TD width=8%><B>Piqu:</b></td><TD width=8%><B>Pala:</b></td><TD width=8%><B>Arch:</b></td>\
        <TD width=8%><B>Cav:</b></td><TD width=8%><B>CavL:</b></td><TD width=8%><B>Wago:</b></td>\
        <TD width=8%><B>Bali:</b></td><TD width=8%><B>Beli:</b></td><TD width=8%><B>Cata:</b></td><tr>';
		
 m += '<TR align=center><TD width=8%>'+Seed.units['city'+cityId]['unt1']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt2']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt3']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt4']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt5']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt6']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt7']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt8']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt9']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt10']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt11']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt12']+'</td><tr></table>';
   
       
    m += '<TABLE class=ptTab width=100%><TR align=center>\
        <td width=15%>&nbsp;</td><TD width=14%><B>Or :</b></td><TD width=15%><B>Nourriture :</b></td><TD width=14%><B>Bois :</b></td><TD width=14%><B>Pierre :</b></td><TD width=14%><B>Minerais :</b></td><TD width=14%><B>Pop. Inactive :</b></td></tr>\
      <TR align=center><td><b>Stock Actuel</b></td><TD>'+ addCommasInt(t.stats.gold) +'</td><TD>'+ addCommasInt(t.stats.food) +'</td><TD>'+ addCommasInt(t.stats.wood) +'</td><TD>'+ addCommasInt(t.stats.stone) +'</td><TD>'+ addCommasInt(t.stats.ore) +'</td>\
         <TD>'+ addCommasInt(t.stats.idlePop) +'</td></tr>\
        <tr align=center><td width=15%>Stock Requis<br>(formation)</td><td>&nbsp;</td><td '+styleFood+'>'+addCommasInt(consoFood)+'</td><td '+styleWood+'>'+addCommasInt(consoWood)+'</td><td '+styleStone+'>'+addCommasInt(consoStone)+'</td><td '+styleOre+'>'+addCommasInt(consoOre)+'</td>\
        <TD '+stylePop+'>'+ addCommasInt(consoPop)+'</td></tr>\
        </table><BR>';
       // A FAIRE : mettre stat armée ici
        
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
      m = '<TABLE align=center class=ptTab>';
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
            param1=i; // numéro de position dans la fil d'attente
            param2=cityId; // id de la ville
            param3=q[i][0]; // Type de trouoe
            param4=q[i][1]; // Qte troupe
            param5=end; // debut
            param6=start; // fin
            param7=actual; // duree
          m += '<TR align=right><td width=35 align=center><a onclick="cancelTraining('+param1+','+param2+','+param3+','+param4+','+param5+','+param6+','+param7+');return false;" href="javascript:void(0);"><img src="http://cdn1.iconfinder.com/data/icons/musthave/16/Remove.png" border=0 title="Annuler la formation"></a></td><TD>'+ q[i][1] +' </td><TD align=left> '+ unsafeWindow.unitcost['unt'+q[i][0]][0];
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
    m = t.stats.barracks +' casernes';
    if (t.stats.queued > 0)
      m += ', '+ t.stats.queued +' slots';
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
      m = '<TABLE align=center class=ptTab>';
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
          m += '<TR align=right><TD>'+ q[i][1] +' </td><TD align=left> '+ fortNamesShort[q[i][0]];
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
    m = t.stats.Dqueued +' slots';
    if (totTime > 0)
      m += ', '+ unsafeWindow.timestr(totTime);
    document.getElementById ('statDTtot').innerHTML = m;
  },

  dispTrainStatus : function (msg){
    var t = my.Train;
    t.divTrainStatus.innerHTML = msg + t.divTrainStatus.innerHTML;
  },

  doQueue : function (cityId, que, errMsg){
    var t = my.Train;
    try {
      t.displayCityStats();
      if (errMsg){
        t.dispTrainStatus ('<font color=#550000><B>ERREUR : '+ errMsg +'</b></font><BR>');
        t.setBusy(false);
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.dispTrainStatus ('<B>File d\'attente des troupes termin&eacute;e.</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Formation '+ cmd[2] +' '+  unsafeWindow.unitcost['unt'+cmd[1]][0] +'<BR>');
        //doTrain (cityId, cmd[1], cmd[2], function(errMsg){my.Train.doQueue(cityId, que, errMsg);} );
            doTrain (cityId, cmd[1], cmd[2], 
          function(errMsg){
           setTimeout(function (){my.Train.doQueue(cityId, que, errMsg);}, (Math.random()*3500)+1500 );
          }
        );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>PROGRAME ERREUR : '+ err.message +'</font><BR>');
      t.setBusy(false);
    }
  },
}

/*************************************** OVERVIEW TAB ************************************************/

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
    GMTclock.span.innerHTML = '<div style=" height:15px; position:absolute; top:29px; left:610px; background-color:#FC6;border:#000 solid thin; padding-top: 0px;padding-right: 4px;padding-bottom: 1px; padding-left: 4px;font-weight:100; color:#000; font-size:12px; z-index:50000;">  '+ now.toLocaleFormat('%H:%M:%S') +' GMT </div>';

  },
}


/*********************************** Test TAB ***********************************/
myBO.Test = {
  tabOrder: 25,
  tabDisabled : !ENABLE_TEST_TAB,         // if true, tab will not be added or initialized
  tabLabel : 'Test',
  myDiv : null,

   init : function (){    // called once, upon script startup
    this.myDiv = document.createElement('div');
    return this.myDiv;
  },

  hide : function (){
    var t = myBO.Test;
  },
  getContent : function (){
      return myBO.Test.myDiv;
  },
  show : function (){
     var t = myBO.Test;
      var m = '<TABLE><TR><TD align=right>Eclaireur : </td><TD><INPUT type=checkbox id=pcfakeIsScout></td></tr>\
          <TR><TD align=right>TS : </td><TD><INPUT type=checkbox id=pcfakeIsWild></td></tr>\
          <TR><TD align=right>Faux Rapport : </td><TD><INPUT type=checkbox id=pcfakeFalse></td></tr>\
          <TR><TD align=right>Secondes : </td><TD><INPUT type=text size=4 value=300 id=pcfakeSeconds></td></tr>\
          <TR><TD align=right>Nb Miliciens : </td><TD><INPUT type=text size=6 value=5000 id=pcfakeMilitia></td></tr>\
          <TR><TD colspan=2 align=center><INPUT id=pctestSendMarch type=submit value="Fausse Attaque" \></td></tr></table>\
          <BR><DIV id=pctestDiv style="background-color:#ffffff; maxwidth:675; maxheight:350px; height:350px; overflow-y:auto;"></div>';
      this.myDiv.innerHTML = m;
      document.getElementById('pctestSendMarch').addEventListener ('click', t.clickFakeAttack, false);
  },

  writeDiv : function (msg){
    var t = my.Test;
    if (t.state != null)
      document.getElementById('pctestDiv').innerHTML = msg;
  },

  addDiv : function (msg){
    var t = my.Test;
    if (t.state != null)
      document.getElementById('pctestDiv').innerHTML += msg;
  },
  
  createFakeAttack : function (cityNum, isScout, isWild, isFalse, secs, numMilitia){
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
    march.unts.u3 = 1
    march.unts.u2 = numMilitia
    march.pid = 1234567
    march.score = 9
    march.mid = marchId.substr(1);
    march.players = {}
    march.players.u1234567 = {}
    march.players.u1234567.n = 'M. Test';
    march.players.u1234567.t = 60
    march.players.u1234567.m = 10000000
    march.players.u1234567.s = 'M';
    march.players.u1234567.w = 1
    march.players.u1234567.a = 1
    march.players.u1234567.i = 5
    Seed.queue_atkinc[marchId] = march;
    Seed.players.u1234567 = march.players.u1234567;
  },

  clickFakeAttack : function (){
    var t = myBO.Test;
    var isScout = document.getElementById('pcfakeIsScout').checked;
    var isWild = document.getElementById('pcfakeIsWild').checked;
    var isFalse = document.getElementById('pcfakeFalse').checked;
    var secs = parseInt(document.getElementById('pcfakeSeconds').value);
    var mil = parseInt(document.getElementById('pcfakeMilitia').value);
    t.createFakeAttack (0, isScout, isWild, isFalse, secs, mil);
  },
}

/****************************  Script Tab   ******************************/
myBO.map = {
  tabOrder : 35,                    // order to place tab in top bar
  tabLabel : 'Map',            // label to show in main window tabs
  cont : null,
  timer : null,
  forumlink :  'http://koc.dunno.com/index.sjs?f=ListServers', 
  
  // 
  
  init : function (){    // called once, upon script startup
   this.cont = document.createElement('div');
   return this.cont;
  },
  getContent : function (){
      return myBO.map.cont;
  },
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = myBO.map;
    mainPop2.div.style.width = 749 + 'px';
    mainPop2.div.style.heigth = 350 + 'px'
  },
  
  show : function (){         // called whenever this tab is shown
    var t = myBO.map;
    try {
     var numdo=unsafeWindow.domainName.substr(unsafeWindow.domainName.length-3);
     t.forumlink='http://koc.dunno.com/index.sjs?f=KocMapViewer&server_id='+numdo;
    } catch(e) {
    
    }
    cont.innerHTML = '<CENTER><iframe src="'+ t.forumlink +'" width="100%" height="550" name="board_in_a_box"> </iframe> <BR></center>';
    mainPop2.div.style.width = 1110 + 'px';
    mainPop2.div.style.heigth = 550 + 'px'
  },
}

myBO.Overview = {
 
  cont : null,
  displayTimer : null,
  checkBox:null,
  
  checkBox1:null,
  Overview : function (){
  },

  init : function (){
    this.cont = document.createElement('div');
    return this.cont;
  },

  getContent : function (){
    return myBO.Overview.cont;
  },

  hide : function (){
    clearTimeout (myBO.Overview.displayTimer);
  },

  show : function (){
    var rownum = 0;
    var totalentre = 0;  
    var t = myBO.Overview;

    clearTimeout (t.displayTimer);


    function _row (name, row, noTotal, typee){
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
      m.push ('</td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('>&nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        m.push ('<TD style="background: #ffc">');
         if (tot<0) {
          m.push ("<SPAN class=class=boldRed>"+addCommas(tot)+"</span>");
         } else {
          m.push (addCommas(tot));
         }
        //}
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

    try {
      if (Options.includeMarching)
        march = getMarchInfo ();
  
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
           
      var now = unixTime();
      str = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
         str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,10) +'</b></td>';
      }
      if (Options.includeMarching)
        str += '<TD width=81><B>Marchant</b></td>';
       
      str += "<td></td></tr>";
  
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
      str += _row ('<img title="Stock d\'or" height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png>', rows[0], false, 0);
      str += _row ('<img title="Stock de nourriture" height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png>', rows[1], false, 0);
      str += _row ('<img title="Stock de bois" height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png>', rows[2], false, 0);
      str += _row ('<img title="Stock de pierre" height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png>', rows[3], false, 0);
      str += _row ('<img title="Stock de minerais" height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png>', rows[4], false, 0);
    
    str += '<TR><TD><BR></td></tr>';
   
    row = [];
      for(i=0; i<Cities.numCities; i++) {
                  var rp = getResourceProduction (Cities.cities[i].id);
                  row[i] = rp[1];
      }
      str += _row ('<img height=18 title="Production de nourriture a l\'heure" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png>', row, false, 0);
    row = [];
            for(i=0; i<Cities.numCities; i++) {
                        var rp = getResourceProduction (Cities.cities[i].id);
                        row[i] = rp[2];
            }
            str += _row ('<img height=18 title="Production de bois a l\'heure" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png>', row, false, 0);
            
 row = [];
      for(i=0; i<Cities.numCities; i++) {
                  var rp = getResourceProduction (Cities.cities[i].id);
                  row[i] = rp[3];
      }
      str += _row ('<img height=18 title="Production de pierre a l\'heure" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png>', row, false, 0);
      
 row = [];
      for(i=0; i<Cities.numCities; i++) {
                  var rp = getResourceProduction (Cities.cities[i].id);
                  row[i] = rp[4];
      }
      str += _row ('<img height=18 title="Production de minerais a l\'heure" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png>', row, false, 0);
      


        


         str += '<TR><TD><BR></td></tr>';
      
      
      
  
            row = [];
            var totalbouffe = 0;
            for(i=0; i<Cities.numCities; i++) {
              var rp = getResourceProduction (Cities.cities[i].id);
              var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
              row[i] = rp[1] - usage;
            }
            str += _row ('Prod', row, false,  0);
            
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
      str += _row ('Aut.', row, true, 0);
      
      
      str += '<TR><TD><BR></td></tr>';
      for (r=1; r<13; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
        }
      }
      if (Options.includeMarching){
        for (var i=0; i<13; i++)
          rows[i][Cities.numCities] = march.marchUnits[i];
      }
      
          
      str += "</table>";
   
      myBO.Overview.cont.innerHTML = str;
    
    } catch (e){
      myBO.Overview.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);
  },
};


myBO.Crests = {
  cont : null,
  state : null,

  init : function (div){
    var t = myBO.Crests;
    this.cont = document.createElement('div');
    //t.cont.innerHTML = '<DIV id=crestsContent style="maxheight:365px; height:365px; overflow-y:auto">';
    return t.cont;
  },
  

  getContent : function (){
    var t = myBO.Crests;
    return t.cont;
  },

  hide : function (){
    var t = myBO.Crests;
  },

  show : function (){ 
    var t = myBO.Crests;
	
	var bor,ector,kay,bedivere,gawain,percival,galahad,lancelot,arthur,morgana,mordred;
	if (Seed.items.i1101){bor=Seed.items.i1101}else{bor=0};
	if (Seed.items.i1102){ector=Seed.items.i1102}else{ector=0};
	if (Seed.items.i1103){kay=Seed.items.i1103}else{kay=0};
	if (Seed.items.i1104){bedivere=Seed.items.i1104}else{bedivere=0};
	if (Seed.items.i1105){gawain=Seed.items.i1105}else{gawain=0};
	if (Seed.items.i1106){percival=Seed.items.i1106}else{percival=0};
	if (Seed.items.i1107){galahad=Seed.items.i1107}else{galahad=0};
	if (Seed.items.i1108){lancelot=Seed.items.i1108}else{lancelot=0};
	if (Seed.items.i1109){arthur=Seed.items.i1109}else{arthur=0};
	if (Seed.items.i1110){morgana=Seed.items.i1110}else{morgana=0};
	if (Seed.items.i1111){mordred=Seed.items.i1111}else{mordred=0};
	if (Seed.items.i1112){Stag=Seed.items.i1112}else{Stag=0};
	if (Seed.items.i1113){Pendragon=Seed.items.i1113}else{Pendragon=0};
	if (Seed.items.i1114){Lady=Seed.items.i1114}else{Lady=0};
	
	if (Cities.cities[1]){ville2="#99EE99";}else{ville2="#EE9999";}
	if (Cities.cities[2]){ville3="#99EE99";}else{ville3="#EE9999";}
	if (Cities.cities[3]){ville4="#99EE99";}else{ville4="#EE9999";}
   
   	if (Cities.cities[4]){ville5="#99EE99";}else{ville5="#EE9999";}
   	if (Cities.cities[5]){ville6="#99EE99";}else{ville6="#EE9999";}
   	if (Cities.cities[6]){ville7="#99EE99";}else{ville7="#EE9999";}
   if (t.state == null){
    
      var m = '<style>\
CAPTION.MYTABLE\
  {\
     background-color:eeffff;\
     color:black;\
     border-style:solid;\
     border-width:1px;\
     border-color:black;\
  }\
  TABLE.MYTABLE\
  { \
     font-family:arial;\
     border-collapse:collapse;\
     font-size:10pt;\
     background-color:F5F5F5;\
     width:100%;\
     border-style:solid;\
     border-color:black;\
     border-width:1px;\
  }\
\
  TH.MYTABLE\
  {\
     font-size:10pt;\
     color:black;\
     text-align:center;\
     border-style:solid;\
     border-color:black;\
     border-width:1px;\
  }\
\
\
  TR.MYTABLE\
  { \
  }\
\
  TD.MYTABLE\
  {  \
     font-size:10pt;\
     background-color:FFFFE5;\
     color:black;\
     border-style:solid;\
     border-width:1px;\
     text-align:left;\
  }\
</style>\
\
<TABLE CLASS="MYTABLE" CELLPADDING=0 CELLSPACING=0>\
    <CAPTION CLASS="MYTABLE">Les armoiries</CAPTION>\
    \
    <THEAD >\
      <TR CLASS="MYTABLE">\
        <TH CLASS="MYTABLE">Ville</TH>\
        <TH CLASS="MYTABLE">Besoins 1</TH>\
        <TH CLASS="MYTABLE">Besoins 2</TH>\
        <TH CLASS="MYTABLE">Besoins 3</TH>\
      </TR>\
    </THEAD>\
    \
    <TBODY>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">Ville 2</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">Niveau 7 ('+Seed.player.title+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">10 Amis</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">&nbsp;</TD>\
      </TR>\
   \
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';">Ville 3</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1101.jpg>&nbsp;4 Bor ('+bor+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1102.jpg>&nbsp;2 Ector ('+ector+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1103.jpg>&nbsp;1 Kay ('+kay+')</TD>\
      </TR>\
   \
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville4+';">Ville 4</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville4+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1103.jpg>&nbsp;4 Kay ('+kay+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville4+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1104.jpg>&nbsp;3 Bedivere ('+bedivere+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville4+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1105.jpg>&nbsp;1 Gawain ('+gawain+')</TD>\
      </TR>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville5+';">Ville 5</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville5+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1106.jpg>&nbsp;4 Perceval ('+percival+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville5+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1107.jpg>&nbsp;3 Galaad ('+galahad+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville5+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1108.jpg>&nbsp;2 Lancelot ('+lancelot+')</TD>\
      </TR>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville6+';">Ville 6</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville6+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1109.jpg>&nbsp;4 Roi Arthur ('+arthur+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville6+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1110.jpg>&nbsp;3 Morgane ('+morgana+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville6+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1111.jpg>&nbsp;2 Mordred ('+mordred+')</TD>\
      </TR>\
       <TR CLASS="MYTABLE">  \
              <TD CLASS="MYTABLE" style="background-color:'+ville7+';">Ville 7</TD>\
              <TD CLASS="MYTABLE" style="background-color:'+ville7+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1112.jpg>&nbsp;4 Roi Stag ('+Stag+')</TD>\
              <TD CLASS="MYTABLE" style="background-color:'+ville7+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1113.jpg>&nbsp;3 Terrestre ('+Pendragon+')</TD>\
              <TD CLASS="MYTABLE" style="background-color:'+ville7+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1114.jpg>&nbsp;2 Aquatique ('+Lady+')</TD>\
      </TR>\
    </TBODY>\
  </TABLE>\
  <TABLE CLASS="MYTABLE" CELLPADDING=0 CELLSPACING=0>\
      <CAPTION CLASS="MYTABLE">Vos armoiries en stock</CAPTION>\
      <THEAD >\
        <TR CLASS="MYTABLE">\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1101.jpg title="Bor"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1102.jpg title="Ector"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1103.jpg title="Kay"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1104.jpg title="Bedivere"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1105.jpg title="Gawain"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1106.jpg title="Perceval"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1107.jpg title="Galaad"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1108.jpg title="Lancelot"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1109.jpg title="Arthur"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1110.jpg title="Morgane"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1111.jpg title="Mordred"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1112.jpg title="Stag"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1113.jpg title="Terrestre"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1114.jpg title="Aquatique"></TH>\
      </TR>\
 </THEAD>\
  <TR CLASS="MYTABLE">\
  <TD CLASS="MYTABLE"><center><b>'+bor+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+ector+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+kay+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+bedivere+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+gawain+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+percival+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+galahad+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+lancelot+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+arthur+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+morgana+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+mordred+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+Stag+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+Pendragon+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+Lady+'</TD>\
  </TR><TR CLASS="MYTABLE"></tr>\
  </table>';
      t.cont.innerHTML = m;
      t.state = 1;
    }
  },

}



/*************************** STATISTIQUES ARMEE ***********************/
myBO.Overview1 = {
  cont : null,
  displayTimer : null,
  checkBox:null,
  checkBox1:null,
  Overview : function (){
  },

  init : function (){
    this.cont = document.createElement('div');
    return this.cont;
  },

  getContent : function (){
    return myBO.Overview1.cont;
  },

  hide : function (){
    clearTimeout (myBO.Overview1.displayTimer);
  },

  show : function (){
    var rownum = 0;
    var totalentre = 0;  
    var t = myBO.Overview1;

    clearTimeout (t.displayTimer);

    function UniteFormation(id) {
     var nbunit=0; // 
     for(i=0; i<Cities.numCities; i++) {
      //alert(i);
      var cityIdd = Cities.cities[i].id;
      var q = Seed.queue_unt['city'+cityIdd];
      var qs = q.toString();
       if (q!=null && q.length>0 ){
        for (var ii=0; ii<q.length; ii++){
         if (q[ii][0]==id) nbunit+=parseInt(q[ii][1]);
         
        }
      }
      }
      totalentre += parseInt(nbunit*UniteCout(id));
      return nbunit;
    }
    function UniteCout(id) {
      var Unitcout=unsafeWindow.unitupkeeps[id]; 
      return Unitcout;
    }
    function _row (name, row, noTotal, typee){
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
      m.push ('</td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('>&nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        m.push ('<TD style="background: #ffc">');
        //if (Options.EnableFormation && typee>0) {
        // m.push (addCommas(tot+UniteFormation(typee)));
        //}else {
         if (tot<0) {
          m.push ("<SPAN class=class=boldRed>"+addCommas(tot)+"</span>");
         } else {
          m.push (addCommas(tot));
         }
        //}
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<TD');
        m.push (style);
        m.push ('>');
        m.push (addCommas(row[i]));
        m.push ('</td>');
      }
      if (Options.EnableFormation && typee>0) {
       m.push('<td>'+addCommas(UniteFormation(typee))+'</td>');
     
      }
      if (Options.EnableFormation && name=='Form') {
         m.push("<td>&nbsp;</td><td>" + addCommas(totalentre) + "</td>");
      }
      m.push ('</tr>');
      return m.join('');
    }

    try {
      if (Options.includeMarching)
        march = getMarchInfo ();
  
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
      var now = unixTime();
      str = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
     	 cityID = 'city'+ Cities.cities[i].id;
      	 Gate = parseInt(Seed.citystats[cityID].gate);
      	 if(Gate == 0)  str += "<TD width=81 style='background-color:#77EE77'><B>"+ Cities.cities[i].name.substring(0,10) +'</b><BR></td>';
      	 if(Gate != 0)  str += "<TD width=81 style='background-color:#EE7777'><B>"+ Cities.cities[i].name.substring(0,10) +'</b><BR></td>';
      }
      if (Options.includeMarching)
        str += '<TD width=81><B>Marchant</b></td>';
      if (Options.EnableFormation)  
       str += "<TD width=81><B>Formation</b></td>"; 
       
      str += "<td></td></tr>";
  	 rows = [];
      rows[0] = [];
      for (r=1; r<13; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
        }
      }
      if (Options.includeMarching){
        for (var i=0; i<13; i++)
          rows[i][Cities.numCities] = march.marchUnits[i];
      }
      rownum = 0;
      this.totalentre = 0;
      for (r=1; r<13; r++){
       str += _row ('<img height=18 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg>', rows[r],false,  r);
      }

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
      str += _row ('Form', row, true, 0);
      
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
      str += _row ('D&eacute;f', row, true, 0);

     
      str += "</table>";
   
      myBO.Overview1.cont.innerHTML = str;
  
    } catch (e){
      myBO.Overview1.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);
  },
};



/*************************** RESUME ***********************/

my.Overview = {
 
  cont : null,
  displayTimer : null,
  checkBox:null,
  
  checkBox1:null,
  Overview : function (){
  },

  init : function (){
    this.cont = document.createElement('div');
    return this.cont;
  },

  getContent : function (){
    return my.Overview.cont;
  },

  hide : function (){
    clearTimeout (my.Overview.displayTimer);
  },

  show : function (){
    var rownum = 0;
    var totalentre = 0;  
    var t = my.Overview;

    clearTimeout (t.displayTimer);

    function clickEnableMarch (){
      var t = my.Overview;
      if (checkBox.checked)
        Options.includeMarching = true;
      else
        Options.includeMarching = false;
      t.show ();
    }
    function clickEnableFormation (){
      var t = my.Overview;
      if (checkBox1.checked)
        Options.EnableFormation = true;
      else
        Options.EnableFormation = false;
      t.show ();
    }
    function UniteFormation(id) {
     var nbunit=0; // 
     for(i=0; i<Cities.numCities; i++) {
      //alert(i);
      var cityIdd = Cities.cities[i].id;
      var q = Seed.queue_unt['city'+cityIdd];
      var qs = q.toString();
       if (q!=null && q.length>0 ){
        for (var ii=0; ii<q.length; ii++){
         if (q[ii][0]==id) nbunit+=parseInt(q[ii][1]);
         
        }
      }
      }
      totalentre += parseInt(nbunit*UniteCout(id));
      return nbunit;
    }
    function UniteCout(id) {
      var Unitcout=unsafeWindow.unitupkeeps[id]; 
      return Unitcout;
    }
    function _row (name, row, noTotal, typee){
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
      m.push ('</td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('>&nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        m.push ('<TD style="background: #ffc">');
        //if (Options.EnableFormation && typee>0) {
        // m.push (addCommas(tot+UniteFormation(typee)));
        //}else {
         if (tot<0) {
          m.push ("<SPAN class=class=boldRed>"+addCommas(tot)+"</span>");
         } else {
          m.push (addCommas(tot));
         }
        //}
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<TD');
        m.push (style);
        m.push ('>');
        m.push (addCommas(row[i]));
        m.push ('</td>');
      }
      if (Options.EnableFormation && typee>0) {
       m.push('<td>'+addCommas(UniteFormation(typee))+'</td>');
     
      }
      if (Options.EnableFormation && name=='Form') {
         m.push("<td>&nbsp;</td><td>" + addCommas(totalentre) + "</td>");
      }
      m.push ('</tr>');
      return m.join('');
    }

//DebugTimer.start(); 
    try {
      if (Options.includeMarching)
        march = getMarchInfo ();
  
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
      
      str = '<div style="height:660px;max-height:660px;overflow-y:auto"><DIV class=ptstat style="margin-top:4px; margin-bottom:5px; "><TABLE cellspacing=0 cellpadding=0 class=ptTab width=97% align=center>\
        <TR align=left><TD><SPAN class=ptStatLight>Entr&eacute;e le :</span> '+ dt.toLocaleDateString() +'</td>\
        <TD><SPAN class=ptStatLight>Puissance : </span> ' + addCommas(Seed.player.might) +'</td>\
        <TD><SPAN class=ptStatLight>Alliance : </span> ' + getMyAlliance()[1] +'</td>\
        <TD align=right><SPAN class=ptStatLight>Domain :</span> ' + unsafeWindow.domainName +'</td></tr></table></div><span id="debugtest"></span>';

          tabClass = 'ptTabOverview';  
            if (Cities.numCities > 6)
              tabClass = 'ptTabOverview7';  
                    
       str += "<TABLE class="+ tabClass +" cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
  
       for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        Gate = parseInt(Seed.citystats[cityID].gate);
         if(Gate == 0) var couleurr="#77EE77";
         if(Gate != 0) var couleurr="#EE7777";
         str += "<TD width=81 style='background-color:"+couleurr+"'><span title='"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"'><B>"+ Cities.cities[i].name.substring(0,10) +'</span></b><BR>\
         <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+Cities.cities[i].x +','+ Cities.cities[i].y+')</a></td>';
       }

      if (Options.includeMarching)
        str += '<TD width=81><B>Marchant</b></td>';
      if (Options.EnableFormation)  
       str += "<TD width=81><B>Formation</b></td>"; 
       
      str += "<td></td></tr>";
  
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
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png>', rows[0], false, 0);
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png>', rows[1], false, 0);
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png>', rows[2], false, 0);
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png>', rows[3], false, 0);
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png>', rows[4], false, 0);
      
      
      
        
            var now = unixTime();
            str += '<TR><TD style="font-size:6px"><BR></font></td></tr>';
            str +='<tr style="background: #fff" align=right><td><img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/city6/construction_animated_icon.gif title="Batiment"></td><td>&nbsp;</td>';
            for(i=0; i<Cities.numCities; i++) {
             var totTime = 0;
             if (Seed.queue_con["city" + Cities.cities[i].id].length > 0) {
              var q=Seed.queue_con["city" + Cities.cities[i].id][0];
              var totTime = 0;
              totTime = q[4] - now;
              if (totTime < 0)
                totTime = 0;
              if (totTime < 3600)
                affuichage = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
              else
                affuichage = timestr(totTime);
              str +="<td>"+ affuichage + "</td>";  
             } else {
             str +="<td>0s</td>";
             }
            }    
            str +="</tr>"; 
            //
            str +='<tr style="background: #e8e8e8" align=right><td><img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1.jpg title="Technologie"></b></td><td>&nbsp;</td>';
            for(i=0; i<Cities.numCities; i++) {
             var totTime = 0;
             if (Seed.queue_tch["city" + Cities.cities[i].id].length > 0) {
              var q=Seed.queue_tch["city" + Cities.cities[i].id][0];
              var totTime = 0;
              totTime = q[3] - now;
              if (totTime < 0)
                totTime = 0;
              if (totTime < 3600)
                affuichage = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
              else
                affuichage = timestr(totTime);
              
              str +="<td>"+ affuichage + "</td>";  
       
             } else {
             str +="<td>0s</td>";
             }
            }    
             str +="</tr>"; 
             
         str += '<TR><TD style="font-size:6px"><BR></td></tr>';
      
      
      
  
            row = [];
            var totalbouffe = 0;
            for(i=0; i<Cities.numCities; i++) {
              var rp = getResourceProduction (Cities.cities[i].id);
              var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
              row[i] = rp[1] - usage;
            }
            str += _row ('Prod', row, false,  0);
            
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
      str += _row ('Aut.', row, true, 0);
      
      
      str += '<TR><TD style="font-size:6px"><BR></td></tr>';
      for (r=1; r<13; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
        }
      }
      if (Options.includeMarching){
        for (var i=0; i<13; i++)
          rows[i][Cities.numCities] = march.marchUnits[i];
      }
      rownum = 0;
      this.totalentre = 0;
      for (r=1; r<13; r++){
       str += _row ('<img height=18 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg>', rows[r],false, r);
      }
      str += '<TR><TD style="font-size:6px"><BR></td></tr>';
 
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
      str += _row ('Form', row, true, 0);
      
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
      str += _row ('D&eacute;f', row, true, 0);
         str += '<TR><TD style="font-size:6px"><BR></td></tr>';
      
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totWilds = 0;
        dat = Seed.wilderness['city'+ Cities.cities[i].id];
        if (dat!=null && matTypeof(dat)=='object')
          for (k in dat)
            ++totWilds;
        castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
        if (castle==11) castle=12; 
        if (totWilds < castle)
        {
       
         row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';
        }else{
          
          row[i] = totWilds +'/'+ castle;
        }
      }
      str += _row ('TS', row, true, 0);
  
      row = [];
      var did = {}; 
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
        for (k in dat)
          ++totKnights;
         
        var Knidispo = 0;
        var niveauPointRall=parseInt(getCityBuilding (Cities.cities[i].id, 12).maxLevel);
        for (var z=0; z<knightRoles.length; z++){
	        var leader = Seed.leaders['city'+Cities.cities[i].id][knightRoles[z][1]+'KnightId'];
	        if (leader == 0) {
	                
	        }else{
	         did['knt'+leader] = true;
	        }
         }
         for (k in Seed.knights['city'+Cities.cities[i].id]){
	         if (!did[k])
	           Knidispo++;    
         }
         if (Knidispo<niveauPointRall) {
          row[i] = '<b>' + totKnights + '</b> - <span title="Chevalier dispo / Point de ralliement"><SPAN class=boldRed><B>'+Knidispo+'/' + niveauPointRall +'</span></span>';
         }else {
          row[i] = '<b>' + totKnights + '</b> - <span title="Chevalier dispo / Point de ralliement">'+Knidispo+'/' + niveauPointRall +'</span>';
	 }        
         
      }
      str += _row ('Chev', row, true, 0);
     
                
      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +'>Inclure les troupes et ressources marchants</td>\
      <TD class=xtab colspan=4><BR><INPUT type=CHECKBOX id=idCheck1'+ (Options.EnableFormation?' CHECKED':'') +'>Afficher les troupes en cours de formation</td></tr>';
      str += "</table>";
      if (DEBUG_BUTTON)
        str += '<BR><INPUT id=subSeed type=submit name="SEED" value="DEBUG">';
      my.Overview.cont.innerHTML = str +'</div>';
      checkBox = document.getElementById('idCheck');
      checkBox.addEventListener('click', clickEnableMarch, false);
      checkBox1 = document.getElementById('idCheck1');
      checkBox1.addEventListener('click', clickEnableFormation, false);
      if (DEBUG_BUTTON){
        subSeed = document.getElementById('subSeed');
        subSeed.addEventListener('click', function (){debugWin.doit()}, false);
      }
//DebugTimer.display ('Draw Overview');    
    } catch (e){
      my.Overview.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);
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


/*************************************** MARCHES ************************************************/

my.Marches = {
  cont:null,
  displayTimer:null,
  curTabBut : null,
  curTabName : null,
  

  
  getContent : function (){
      return this.cont;
  },
  hide : function (){
      var t = my.Marches;
      document.getElementById('ptMarchOutput').innerHTML="";
      clearTimeout (t.displayTimer);
  },
  
  init : function (){
   this.cont = document.createElement('div');
   return this.cont;
   
  },
  show : function (){  
    var t = my.Marches; 
    unsafeWindow.pr56Recall = t.butRecall;
    unsafeWindow.pr57Recall = t.butRecall2;
    unsafeWindow.pr58Recall = t.butRecallTroop;
    unsafeWindow.r8x6Home = t.butSendHome;
    
    // gère la couleur du bouton
    var atkclass='';
    if(Seed && Seed.queue_atkinc) {
      for(k in Seed.queue_atkinc){
        m = Seed.queue_atkinc[k];
        if (m.marchType == 4){
    	   atkclass = 'style="background-color:#FF9999;"';
    	 }
      }
    }
    
    t.cont.innerHTML = '<TABLE class=ptTab align=center><TR><TD><INPUT class=pbSubtab ID=ptmrchSubM type=submit value="Marches en cours"></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubA type=submit '+atkclass+' value="Attaques Entrantes"></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubR type=submit value="Renforts Recus"></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubZ type=submit value="Renforts Envoy&eacute;s"></td></tr></table><HR class=ptThin>\
      <DIV id=ptMarchOutput style="margin-top:10px; background-color:white; height:620px;max-height:620px;overflow-y:auto"></div>';
     t.marchDiv = document.getElementById('ptMarchOutput'); 
    document.getElementById('ptmrchSubA').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubR').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubM').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubZ').addEventListener('click', e_butSubtab, false);
     
       if (atkclass!='') {
       changeSubtab (document.getElementById('ptmrchSubA'));  
       }else {
       changeSubtab (document.getElementById('ptmrchSubM'));  
       }
       
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
          t.show2();
      }  
    
  },
  show2 : function (){
    var t = my.Marches;
    clearTimeout (t.displayTimer);
    if (t.curTabName == 'Z')
      t.showReinforcementsOut();
    else if (t.curTabName == 'R')
      t.showReinforcements();
    else if (t.curTabName == 'M')
      t.showMarches();
    else
      t.showAttacks();
  },
 
   /***   ATTACKS SUBTAB  ***/
    showAttacks : function (){
      var t = my.Marches;
      clearTimeout (t.displayTimer);
      var now = unixTime();
      var target, atkType, who, atkclass;
      t.marchDiv.innerHTML = "<br>Chargement...<br><i>(si vous voyez rien c'est qu'il n'y a pas d'attaque)</i>"; 
      var s = '<div class=ptstat><font color=#F77>Liste des attaques en cours</font></div>';
      s += '<STYLE> .eclkk{background:#ffff55;} .attackkk{background:#ff5555;}</style>';
      s += '<TABLE cellspacing=0 cellpadding=2 width=100%>';
      s += '<tr><td></td><td><b>Type Attaque</td><td><b>Lieu</td><td><b>Attaquant</td><td><b>Troupes</td></tr>';  
      var at=0;
      if(Seed && Seed.queue_atkinc) {
       for(k in Seed.queue_atkinc){
      	m = Seed.queue_atkinc[k];
      	if (m.marchType == 3){
	      atkType = 'Eclaireur';
	      atkclass = 'eclkk';
	    } else if (m.marchType == 4){
	      atkType = 'Attaque';
	      atkclass = 'attackkk';
	    } else {
	      atkType ="?";//return;
	      atkclass = '';
    	 }
    	 if (atkclass !='') {  // Seulement les vraies attaques !
    	 at++;
    	 s += '<tr align=left >';
    	  
    	 var arrivedans = unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime()));
    	 s += '<td class="'+atkclass+'"><a class="button20" onclick="attack_viewimpending_view('+k.substr(1)+',\'\');return false;"><span>Voir</span></a></td><td class="'+atkclass+'">' + atkType + ' dans ' + arrivedans +'</td>';
    	
    	 var city = Cities.byID[m.toCityId];
    	 if (city.tileId == m.toTileId) {
           target = 'Ville';
           coordos = '<a class="coordinateLink" onclick="cm.utils.CoordinateLinkController.onClick(event)" href="javascript:void(0)">('+ city.x + ',' + city.y +')</a>';
         } else {
           target = 'TS';
           for (k in Seed.wilderness['city'+m.toCityId]){
            if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
             coordos = '<a class="coordinateLink" onclick="cm.utils.CoordinateLinkController.onClick(event)" href="javascript:void(0)">('+Seed.wilderness['city'+m.toCityId][k].xCoord + ',' + Seed.wilderness['city'+m.toCityId][k].yCoord+')</a>';
             break;           
            }
           }
         }  
         s += '<td class="'+atkclass+'">' + target + '<br>'+coordos+'</td>';
         
         if (Seed.players['u'+m.pid]) {
	    who = Seed.players['u'+m.pid].n;
	 } else if (m.players && m.players['u'+m.pid]) {
	    who = m.players['u'+m.pid].n;
	 } else{
	    who = 'Inconnu'; 
      	 }
      	 if (m.fromXCoord) who += '<br><a class="coordinateLink" onclick="cm.utils.CoordinateLinkController.onClick(event)" href="javascript:void(0)">(' + m.fromXCoord +','+ m.fromYCoord+')</a>';
      	 s += '<td class="'+atkclass+'">' + who + '</td>';
         var troupe = "";
         for (k in m.unts){
          var uid = parseInt(k.substr (1));
          troupe += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +'<br>';
         }
         s += '<td class="'+atkclass+'">' + troupe +'</td>';
         
         s += '</tr>';
         } // fin si attaque et eclaireur seulement
      	}  // fin du for
      	if (at==0) {
      	 s+="<tr><colspan=2>Aucune attaque en cours...</tr>";
      	}
      } // fin de if
      s+='</table>';
      t.marchDiv.innerHTML = s;      
      t.displayTimer = setTimeout (t.showAttacks, 5000);
    },
    
    /***   MARCHES SUBTAB  ***/
    showMarches : function (){
      var t = my.Marches;
      var rownum = 0;
      var now = unixTime();
            var names = ['Ravi', 'Mili', 'Eclai', 'Piqu', 'Pala', 'Arch', 'Cav', 'CavL', 'Wago', 'Bali', 'Beli', 'Cata'];
            var t = my.Marches;
            clearTimeout (t.displayTimer);
                
            // TODO FIX:    Troops show as encamped even if they are here yet (check destinationUnixTime)
               
            var s = '<div class=ptstat>Liste des troupes marchants</div>';
            s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
            s += '<TABLE cellspacing=0 cellpadding=2 width=100%>';
            tot = [];
            for (i=0; i<13; i++)
              tot[i] = 0;
              
            for (var c=0; c<Cities.numCities; c++){
              var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
              if (matTypeof(que)=='array')
                continue;
      
              var a=0;
              for (k in que){
                march = que[k]; 
                if (march.marchType!=2) { /// Marche Type \\ 2= Défense / 3= Eclaireur / 4= Attaque
                a++;
                if (a==1) {
      	             //s+= '<TR><TD class=xtab><BR></td></tr>';
      	  	     s+= '<TR><TD class="city" colspan=17 align=left><B>Ville ' + (parseInt(c)+1) + ' : '+ Cities.cities[c].name +'</b></td></tr>';
      	        }
                var mid = k.substr(1);
                knight = '';
                if (parseInt(march.knightCombat)>0) knight=' ('+ march.knightCombat +')';
                
                //if (march.toPlayerId) {
                 var playerId = march.toPlayerId;
                //}else{
                 //var playerId = -1;
                //}
                var cityId = march.toCityId;
                var tileType = parseInt(march.toTileType);
                var tileLevel = march.toTileLevel;
                var who = 'Inconnu';
                if (Seed.players['u' + playerId]) {
		 who = Seed.players['u' + playerId].n;
		}
		 if (march.marchType==1) { // si transport c'est forcement sur une ville lol
		  var player = "<span>Ville Niv "+ tileLevel +"</span>";
		 }else {
		  var player = "<span title='Le jeu Bug !! Chier - F5 et cela corrige le pb....'>Ville ou Barbares Niv "+ tileLevel +"</span>";
		 }
		
		var tileNames = ['Camps barbares', 'Prairie', 'Lac', 'Bois', 'Collines', 'Montagne', 'Plaine', 'Ville'];
		var numtile= (tileType/10) + 1;
		if (tileType==10) numtile=1;
		if (tileType==11) numtile=2;
                if (tileType <= 50) { // TS
                  player = tileNames[numtile] +" Niv " + tileLevel;
                  /*if (playerId==0) {
                   player += " - Libre";
                  } else {
                   player += " - " + who;
                  }*/  // BUG DU JEU !!! pfff
                }
                if (tileType == 51 && playerId == 0) { // Barbares
                  player = "Camps Barbares Niveau " + tileLevel;
                }
                var nomville="";
                if (playerId > 0 && tileType == 51) { // ville
                 if (march.marchType==1) {
                  for(i=0; i<Cities.numCities; i++) {
                   if (cityId==Cities.cities[i].id) {
                    nomville=Cities.cities[i].name
                     break;
                   }
                  }
                  player = 'Votre ville '+ nomville;
                 } else {
                  player = 'Ville Niv ' + tileLevel;
                 }
                }
      	   	//player += "<br>playerId:"+ playerId + "<br>tileType:" + tileType + "<br>tileLevel:" +  tileLevel + "<br>cityId:" + cityId;
                var typeattack="?";
                if (march.marchType==3) typeattack='Eclaireur';
                if (march.marchType==4) typeattack='Attaquer';
                if (march.marchType==1) typeattack='Transporte';
                if (march.marchType==5) typeattack='R&eacute;assigner';
                var now = new Date();
                var statusm = march.marchStatus;
                var Marchstatut="? ";
                var arrivedans="0s";
		if (statusm==1) { 
		 Marchstatut="";
		 if (march.marchType==3) 
		  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg" align=absmiddle>';
		 if (march.marchType==4) 
		  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg" align=absmiddle>';
		 if (march.marchType==1) 
		  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg" align=absmiddle>';
                 if (march.marchType==5) 
                  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>';
		 Marchstatut+="&nbsp;Marchant"; 
		 arrivedans = unsafeWindow.timestr(parseInt(march.destinationUnixTime - unixTime()));
		}
                if (statusm==8) { 
                  Marchstatut = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg" align=absmiddle>&nbsp;Retour';
                  arrivedans = unsafeWindow.timestr(march.returnUnixTime - unixTime());
                }
                if (statusm==2) { 
                   Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;Campement';
                }
                if (statusm==5) { 
                   Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;En attente Rapport';
                }
                
                s += '<TR align=left><td align=left width=10%>';
                if (statusm==1) s +='<A class=button20 onclick="pr58Recall('+ mid+')"><SPAN>Rappeler</span></a>';
                if (statusm==2) s +='<A class=button20 onclick="attack_recall('+ mid+',1,'+Cities.cities[c].id+');return false;"><SPAN>Rappeler</span></a>';
                s +='&nbsp;</td><td align=left width=10%>'+typeattack+'</td><td align=left width=15%>' + Marchstatut +'<br>'+arrivedans+'</td>\
                <TD align=left width=25%>' + player + ' <a class="coordinateLink" onclick="cm.utils.CoordinateLinkController.onClick(event)" href="javascript:void(0)">(' + march.toXCoord +','+ march.toYCoord +')</a>&nbsp;' + knight +' </td><td colspan=12>'
                for (i=1; i<13; i++) {
                  if (parseInt (march['unit'+ i +'Count']) > 0) {
                      s += names[i-1]+" :" + parseInt (march['unit'+ i +'Count']) + "<br>";
                      tot[i] += parseInt (march['unit'+ i +'Count']);
                  }
                }
                s += '</td><td style="font-size:11px">';
		if (statusm==8) { // seulement le retour pour les barbares
		 s += 'Or : ' + parseInt (march['gold']) + '<br>Nourriture : ' + march['resource1'] + '<br>Bois : ' + march['resource2'] + '<br>Pierre : ' + march['resource3'] + '<br>Minerais : ' + march['resource4'] + '</td>';         
      		} else {
      		 s += '<a  class=button20 onclick="view_march('+ mid+');return false;";><span>D&eacute;tail</psan></a></td>';
      		}
                s += '</tr>';
                 // Bouton détail : <td><a  class=button20 onclick="view_march('+ mid+');return false;";><span>D&eacute;tail</psan></a></td>
                }// fin de MarchType
              }      
            } 
            
             s += '<TR><TD colspan=17><BR><BR></td></tr></table><TABLE cellspacing=0 cellpadding=2 width=100%><tr><td colspan=1></td>';
                  for (k=0; k<names.length; k++)
                    s += '<TD width=7% align=center><B>' + names[k] + '</b></td>';
                  s += '</tr>';
                  s += '<TR align=center><TD class="tot" align=left width=10%><B>TOTAUX</b></td>';
                  for (i=1; i<13; i++)
                    s+= '<TD class="tot">'+ tot[i] +'</td>';
            s += '<td></td></tr></table>';
            s += '<BR><BR><DIV style="font-size: 10px"></div>';
        
            t.marchDiv.innerHTML = s;
            t.displayTimer = setTimeout (t.show2, 2000);
      return;
    },
    ajaxRecall2 : function (marchId, notify){
          //var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
          var villeencours;
          for (var c=0; c<Cities.numCities; c++){
            var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
            if (matTypeof(que)=='array')
              continue;
            for (k in que){
              if (k == 'm'+marchId){
                villeencours = Cities.cities[c].id;
                break;
              }
            }    
          }   
          
          unsafeWindow.cm.recall.ask(marchId, villeencours);
          setTimeout(function() { t.show2(); }, 500);
          return false;
  
  },
    /***  REINFORCEMENTS SUBTAB  ***/
    showReinforcementsOut : function (){
      var rownum = 0;
      var names = ['Ravi', 'Mili', 'Eclai', 'Piqu', 'Pala', 'Arch', 'Cav', 'CavL', 'Wago', 'Bali', 'Beli', 'Cata'];
      var t = my.Marches;
      clearTimeout (t.displayTimer);
          
      // TODO FIX:    Troops show as encamped even if they are here yet (check destinationUnixTime)
         
      var s = '<div class=ptstat>Liste des troupes en renfort chez vos alli&eacute;s ou vos TS/villes</div>';
      s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
      s += '<TABLE cellspacing=0 cellpadding=2 width=100%>';
      tot = [];
      for (i=0; i<13; i++)
        tot[i] = 0;
        
      for (var c=0; c<Cities.numCities; c++){
        var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
        if (matTypeof(que)=='array')
          continue;

        var a=0;
        for (k in que){
          march = que[k]; 
          if (march.marchType==2) { /// Marche Type \\ 2= Défense / 3= Eclaireur / 4= Attaque
          a++;
          if (a==1) {
	             s+= '<TR><TD class=xtab><BR></td></tr>';
	  	  	          s+= '<TR><TD class="city" colspan=15 align=left><B>Ville ' + (parseInt(c)+1) + ' : '+ Cities.cities[c].name +'</b></td></tr>';
	    
          }
          var mid = k.substr(1);
          knight = '';
          if (parseInt(march.knightCombat)>0) knight=' ('+ march.knightCombat +')';
	  try {
	     player = Seed.players['u'+march.toPlayerId].n; //Seed.players['u'+k].n;
	   } catch (err){
	     player = 'Inconnu';
          }
        
          s += '<TR align=left><td align=left width=12%>';
          var statusm = march.marchStatus;
          var Marchstatut='';
          if (statusm==1) Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;Marchant';
          if (statusm==2) Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;Campement';
          if (statusm==8) Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg" align=absmiddle>&nbsp;Retour';
          if (statusm==5) Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;En attente Rapport';
          if (statusm==1){
            s +='<A class=button20 onclick="pr56Recall('+ mid+')"><SPAN>Rappeler</span></a>';
          }
          if (statusm==2) { 
             s +='<A class=button20 onclick="pr57Recall('+ mid+')"><SPAN>Rappeler</span></a>';
          } else {
            s += '&nbsp;';
          }
             
          s+='</td><td align=left width=15%>'+Marchstatut+'</td><TD align=left width=30%>' + player + ' <a class="coordinateLink" onclick="cm.utils.CoordinateLinkController.onClick(event)" href="javascript:void(0)">(' + march.toXCoord +','+ march.toYCoord +')</a>&nbsp;' + knight +' </td><td colspan=12>'
          for (i=1; i<13; i++) {
            if (parseInt (march['unit'+ i +'Count']) > 0) {
                s += " " + parseInt (march['unit'+ i +'Count']) + " "+names[i-1]+"<br>";
                tot[i] += parseInt (march['unit'+ i +'Count']);
            }
          }
          s += '</td></tr>';
          }// fin de MarchType
        }      
      } 
      
       s += '<TR><TD colspan=15><BR><BR></td></tr></table><TABLE cellspacing=0 cellpadding=2 width=100%><tr><td colspan=1></td>';
            for (k=0; k<names.length; k++)
              s += '<TD width=7% align=center><B>' + names[k] + '</b></td>';
            s += '</tr>';
            s += '<TR align=center><TD class="tot" align=left width=10%><B>TOTAUX</b></td>';
            for (i=1; i<13; i++)
              s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr></table>';
      s += '<BR><BR><DIV style="font-size: 10px">NOTE : Il est possible que les retours apparaissent pendant un certain moment... (oui ya des bugs...)</div>';
  
      t.marchDiv.innerHTML = s;
      t.displayTimer = setTimeout (t.show2, 10000);
      return;
  },
     
  showReinforcements : function (){
   var rownum = 0;
    var names = ['Ravi', 'Mili', 'Eclai', 'Piqu', 'Pala', 'Arch', 'Cav', 'CavL', 'Wago', 'Bali', 'Beli', 'Cata'];
    var t = my.Marches;
    clearTimeout (t.displayTimer);
      
    function clickShowRemaining (){
      checkBox = document.getElementById('idCheck2');
      if (checkBox.checked)
        Options.encRemaining = false;
      else
        Options.encRemaining = true;
      t.show2 ();
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
    s = '<div class=ptstat>Liste des troupes en renfort dans vos embassades.</div>';
    if (numSlots == 0){
      s += '<BR><CENTER><B>Aucunes troupes en renfort actuellement.</b></center>';
    } else {
      s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
      s += '<TABLE cellspacing=0 cellpadding=2 width=100%>';

      tot = [];
      for (i=0; i<13; i++)
        tot[i] = 0;
      for (c in Cities.cities){
        dest = Cities.cities[c].id;
        if (enc[dest]){
          s+= '<TR><TD class="city" colspan=14 align=left><B>Ville ' + (parseInt(c)+1) + ' : '+ Cities.cities[c].name +'</b></td></tr>';
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
              s += '<TR align=left><td align=left width=12%><A class=button20 onclick="r8x6Home('+ march.marchId +')"><SPAN>Renvoie</span></a></td><TD align=left width=25%>'+ player + knight +' </td><td colspan=12>'
              for (i=1; i<13; i++){
               if (march.troops[i] > 0) {
                s += ''+ march.troops[i]  +' '+ names[i-1]  +'<br>';
               }
                tot[i] += march.troops[i];
              }
              s += '</td></tr>';

            }
          }
        }
      }
      s += '<TR><TD colspan=14><BR><BR></td></tr></table><TABLE cellspacing=0 cellpadding=2 width=100%><tr><td colspan=1></td>';
      for (k=0; k<names.length; k++)
        s += '<TD width=7% align=center><B>' + names[k] + '</b></td>';
      s += '</tr>';
      s += '<TR align=center><TD class="tot" align=left width=10%><B>TOTAUX</b></td>';
      for (i=1; i<13; i++)
        s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr></table>';
    }

    s += '<BR><BR><INPUT type=CHECKBOX id=idCheck2 '+ (Options.encRemaining?'':' CHECKED ') +'> Show Original Troops';
    s += '<BR><BR><DIV style="font-size: 10px">NOTE : Vous devez rafraichir KOC pour voir les nouveaux renforts chez vous.</div>';
    t.marchDiv.innerHTML = s;
    checkBox = document.getElementById('idCheck2');
    checkBox.addEventListener('click', clickShowRemaining, false);
    t.displayTimer = setTimeout (t.show2, 10000);
  },
  
  
    butRecall : function (marchId){
        var t = my.Marches;
        logit ("CANCELLING: "+ marchId); 
        t.ajaxRecall (marchId); 
    },
    butRecall2 : function (marchId){
              var t = my.Marches;
              logit ("CANCELLING: "+ marchId); 
              t.ajaxRecall2 (marchId); 
    },
    butRecallTroop: function (marchId){
        var t = my.Marches;
        logit ("CANCELLING: "+ marchId); 
        t.ajaxRecall (marchId); 
    },
    butSendHome : function (marchId){
        var t = my.Marches;
        logit ("SEND HOME: "+ marchId); 
        t.ajaxSendHome (marchId, function(r){t.show(); }); 
   },

 
   ajaxSendHome : function (marchId, notify){ 
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
  ajaxRecall2 : function (marchId, notify){
  // rappele de troupes en défence chez allié
  
      var villeencours;
          for (var c=0; c<Cities.numCities; c++){
            var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
            if (matTypeof(que)=='array')
              continue;
            for (k in que){
              if (k == 'm'+marchId){
                villeencours = Cities.cities[c].id;
                break;
              }
            }    
        }  
  
  
           var march = Seed.queue_atkp["city" + villeencours]["m" + marchId];
           if (march == null){
             //notify ('March not found!'); 
             alert("Marche non trouve");
             return;
           }    
           var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
           params.mid = marchId;
           params.cid = villeencours; //march.toCityId;
            
           new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/undefend.php" + unsafeWindow.g_ajaxsuffix, {
               method: "post",
               parameters: params,
               onSuccess: function (rslt) {
                 if (rslt.ok){
 
                   var mymarch = unsafeWindow.seed.queue_atkp["city" + villeencours]["m" + marchId];
                   var marchtime = Math.abs(parseInt(mymarch.destinationUnixTime) - parseInt(mymarch.eventUnixTime));
                   mymarch.returnUnixTime = unixTime() + marchtime;
                   mymarch.marchStatus = 8;
     
                 } else {
                  
                  
                 }
               },
               onFailure: function () {
               
               
               },
     });
          
  },   
  ajaxRecall : function (marchId, notify){
   // rappel des troupe en cours de marches
   
   /*
        var villeencours;
             for (var c=0; c<Cities.numCities; c++){
               var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
               if (matTypeof(que)=='array')
                 continue;
               for (k in que){
                 if (k == 'm'+marchId){
                   villeencours = Cities.cities[c].id;
                   break;
                 }
               }    
           }  
     
     
              var march = Seed.queue_atkp["city" + villeencours]["m" + marchId];
              if (march == null){
                //notify ('March not found!'); 
                alert("Marche non trouve");
                return;
              }    
              var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
              params.mid = marchId;
              params.cid = villeencours; //march.toCityId;
               
              new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelMarch.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  onSuccess: function (rslt) {
                    if (rslt.ok){
    			// A valider le fonctionnement pour metrte à jour le temps restant de la mache
    			
                      var mymarch = unsafeWindow.seed.queue_atkp["city" + villeencours]["m" + marchId];
                      //var marchtime = Math.abs(parseInt(mymarch.marchUnixTime));
                      //mymarch.returnUnixTime = unixTime() - marchtime;
                      //unsafeWindow.timestr(march.returnUnixTime - unixTime());
                      mymarch.marchStatus = 8;
        
                    } else {
                     
                     
                    }
                  },
                  onFailure: function () {
                  
                  
                  },
     });
   
   
   
   */
   
   
   
   
     var villeencours;
      for (var c=0; c<Cities.numCities; c++){
        var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
        if (matTypeof(que)=='array')
          continue;
        for (k in que){
          if (k == 'm'+marchId){
            villeencours = Cities.cities[c].id;
            break;
          }
        }    
      }   
      unsafeWindow.cm.recall.ask(marchId, villeencours);
      return false;
  },
};



/*******************************************/


var PageNavigator = {
  modalMessagesFunc : null,
  ctrlPaginationOld : null,
  loadPage_paginationOld : null,
  cpPager : null,
  
  init : function (){
    var t = PageNavigator;
    t.modalMessagesFunc = new CalterUwFunc ('modal_messages', [
        [/pageNavigatorModel =.*$/im, 'var pager = new ptPagerHook(0,5); pageNavigatorModel=pager'],
        [/pageNavigatorView =.*$/im, 'pageNavigatorView=pager'],
        [/pageNavigatorController =.*$/im, 'pageNavigatorController=pager']
        ]);
    unsafeWindow.ptPagerHook = t.Cpager;
    t.ctrlPaginationOld = unsafeWindow.ctrlPagination;
    t.loadPage_paginationOld = unsafeWindow.loadPage_pagination;
    t.cpPager = new t.Cpager (0,0);
    t.cpPager.oldStyle = true;
    t.enable(Options.fixPageNav);
  },

  // called on 'back' ...
  loadPage_pagination : function (divId, currentPage, callbackFunction, totalPages) {
    var t = PageNavigator;
    var curPage = parseInt(currentPage);
//logit ('loadPage_pagination: '+  divId +','+ t.cpPager.divId +','+ currentPage +','+ callbackFunction +','+ totalPages +','+ t.cpPager.getCurrentPage()); 
    if (divId == t.cpPager.divId) // if 'old' style ...  
      unsafeWindow[callbackFunction] (t.cpPager.getCurrentPage());
    else
      unsafeWindow[callbackFunction] (currentPage);
  },
    
  ctrlPagination : function (navDivId, numPages, notify, curPage){
    var t = PageNavigator;
//logit ('ctrlPagination (divid:'+ navDivId +')');    
    if (document.getElementById(navDivId).firstChild == null)
      document.getElementById(navDivId).appendChild (t.cpPager.getHtmlElement());   
    t.cpPager.setPageCount(numPages);
    t.cpPager.divId = navDivId;
    if (!curPage)
      curPage = 1;
    t.cpPager.gotoPage(curPage);
    t.cpPager.onClick = unsafeWindow[notify];
    unsafeWindow.pageNavigatorView = t.cpPager;
  },  
  
  enable : function (tf){
    var t = PageNavigator;
    t.modalMessagesFunc.setEnable(tf);
    if (tf){
      unsafeWindow.ctrlPagination = t.ctrlPagination;
      unsafeWindow.loadPage_pagination = t.loadPage_pagination;
    } else {
      unsafeWindow.ctrlPagination = t.ctrlPaginationOld;
      unsafeWindow.loadPage_pagination = t.loadPage_paginationOld;
    }
  },
  
  isAvailable : function (){
    var t = PageNavigator;
    return t.modalMessagesFunc.isAvailable();
  },
  
  Cpager : function (a, b){
    // public function protos ...
    this.getHtmlElement = getHtmlElement;    
    this.setPageCount = setPageCount;    
    this.getPageCount = getPageCount;    
    this.getCurrentPage = getCurrentPage;    
    this.gotoPage = gotoPage;    
    this.e_but = e_but;    
    this.e_inp = e_inp; 
    //    
    var t = this;
    this.onClick = null;
    this.numPages = b;
    this.curPage = a;
    this.oldStyle = false;
    
    function getHtmlElement (){
    
      function aButton (msg, evtPage){
        return '<A class=ptPageNav onclick="pageNavigatorView.e_but(\''+ evtPage +'\')"><SPAN class=ptPageNav>'+ msg +'</span></a>';
      }
      var div = document.createElement ('div');
      div.id = 'ptPageNavBar';
  
      div.innerHTML = '<STYLE>table.ptPageNav tr td  {border:none; text-align:center; padding:0px 1px;}\
        span.ptPageNav {font-size:12px; background:inherit; line-height:135%}\
        A.ptPageNav {background-color:#44e; color:#ff4; display:block; border:1px solid #666666; height:18px; width:18px;}\
        A.ptPageNav:hover {background-color:#66f;}\
        A.ptPageNav:active {background-color:#186}\
        </style>\
        <center><TABLE class=ptPageNav><TR valign=middle>\
        <TD style="margin-right:15px">'+ aButton('<SPAN style="padding-right:0.8em; letter-spacing:-0.99em;">&#x258f;&#x258f;&#x25c4;</span>', 'F') +'</td>\
        <TD>'+ aButton('&#x25c4', '-') +'</td>\
        <TD>'+ aButton('&#x25ba', '+') +'</td>\
        <TD style="margin-right:15px">'+ aButton('<SPAN style="padding-right:1.05em; letter-spacing:-0.99em;">&#x25ba;&#x2595;&#x2595;</span>', 'L') +'</td>\
        <TD width=20></td><TD>Page <INPUT id=ptPagerPageNum onChange="pageNavigatorView.e_inp()" type=text size=1> de <span id=ptPagerNumPages>?</span></td>\
        </tr></table></center>';
    
          var mml = document.getElementById('modal_msg_list');
      if (mml != null)
        mml.style.minHeight = '320px';
      return div;
    }

    function getPageCount(){    // koc needs for 'back'
      return t.numPages;
    }    
    function getCurrentPage(){    // koc needs for 'back'
      return t.curPage;
    }    
    function setPageCount(c){
      t.numPages = c;
      document.getElementById('ptPagerNumPages').innerHTML = c;
      var mml = document.getElementById('modal_msg_list');
      if (mml != null){
        if (document.getElementById('modal_msg_tabs_report').className.indexOf('selected') >= 0)
          mml.style.minHeight = '460px';
        else
          mml.style.minHeight = '320px';
      }
    }
    function gotoPage(p){
      t.curPage = parseIntZero(p);
      document.getElementById('ptPagerPageNum').value = t.curPage;
    }
    function e_but (p){
      if (p=='F' && t.curPage!=1)
        loadPage(1);
      else if (p=='-' && t.curPage>1)
        loadPage(t.curPage-1);
      else if (p=='+' && t.curPage<t.numPages)
        loadPage(t.curPage+1);
      else if (p=='L' && t.curPage!=t.numPages)
        loadPage(t.numPages);
      function loadPage (p){
        if (t.oldStyle)
      t.gotoPage(p);
        t.onClick (p);
      }
    }
    function e_inp (p){
      var pageNum = parseIntZero(document.getElementById('ptPagerPageNum').value);
      t.onClick(pageNum);
    }
  },
}


// TODO: Handle multiple instances altering same function!!
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


var MessageCounts = {
  messagesNotifyFunc : null,
  
  init : function (){ 
    var t = MessageCounts;
    t.messagesNotifyFunc = new CalterUwFunc ('messages_notify_bug', [
        ['$("chrome_messages_notify").innerHTML = a;', 'msgCount_hook(a);'],
       ['$("chrome_messages_notify").show();', ''],
        ['$("chrome_messages_notify").hide();', '$("chrome_messages_notify").hide(); $("chrome_messages_notifyL").hide();']  ]);
    if (t.messagesNotifyFunc.isAvailable()){
      unsafeWindow.msgCount_hook = t.msgCount_hook;
      e = document.getElementById('chrome_messages_notify');
      span = document.createElement('span');
      span.className='notificationCount';
      span.style.display='none';
      span.id = 'chrome_messages_notifyL';
      span.style.left = '6px';
      e.parentNode.insertBefore (span, e);
      if (Options.fixMsgCount){
              t.enable (true);
              setTimeout (unsafeWindow.messages_notify_bug, 1000);
     }
    }
  },
  
  msgCount_hook : function (a){
    var l = document.getElementById('chrome_messages_notifyL');
    var r = document.getElementById('chrome_messages_notify');
    if (parseInt(Seed.newMailCount) > 0) {
      l.innerHTML = parseInt(Seed.newMailCount);
      l.style.display = 'block';
    } else {
      l.style.display = 'none';
    }
    var reports = parseInt(Seed.newTradeReports) + parseInt(Seed.newReportCount);
    if (reports < 1)
      r.style.display = 'none';
    else {
      r.innerHTML = reports;
      r.style.display = 'block';
    }
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
    t.modalAttackFunc.setEnable(true);
  },
   
  enable : function (tf){
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
      new CdialogCancelContinue ('IMPOSSIBLE DE PARTIR SUR LES COORDONNEES 0,0 !', null, unsafeWindow.modal_attack_check, document.getElementById('modalInner1'));      
    } else {
      unsafeWindow.modal_attack_check();
    }
  },
  
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


function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  /*var pop = new CPopup ('ptcancont', 0, 0, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptcccancel type=submit value="ANNULER" \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value="CONTINUER" \></td></tr></table>';
  document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
  document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
  pop.show(true);
  */
  alert(msg);
  return false;
}

function setTabStyle (e, selected){
  if (selected){
    e.className = 'matTabSel';
  } else {
    e.className = 'matTabNotSel';
  }
}

function clickedTab (e){
  who = e.target.id.substring(2);
  newObj = my[who];
  currentObj = my[currentName];
  if (currentName != who){
    setTabStyle (document.getElementById ('aa'+currentName), false);
    setTabStyle (document.getElementById ('aa'+who), true);
    if (currentObj){
      currentObj.hide ();
      currentObj.getContent().style.display = 'none';
    }
    currentName = who;
    cont = newObj.getContent();
    newObj.getContent().style.display = 'block';
  }
  newObj.show();
}

function clickedTab2 (e){
  who2 = e.target.id.substring(3);
   newObj2 = myBO[who2];
  currentObj2 = myBO[currentName2];
  if (currentName2 != who2){
    setTabStyle (document.getElementById ('ab'+currentName2), false);
    setTabStyle (document.getElementById ('ab'+who2), true);
    if (currentObj2){
      currentObj2.hide ();
      currentObj2.getContent().style.display = 'none';
    }
    currentName2 = who2;
    cont = newObj2.getContent();
    newObj2.getContent().style.display = 'block';
  }
  newObj2.show();
}

function mouseMainTab (me){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}
function mouseMainTab2 (me){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop2.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    my[currentName].show();
    Options.ptWinIsOpen = true;
  } else {
    my[currentName].hide();
    Options.ptWinIsOpen = false;
  }
  saveOptions();
}
function eventHideShow2 (){
  if (mainPop2.toggleHide(mainPop2)){
    myBO[currentName2].show();
    Options.ptWin2IsOpen = true;
  } else {
    myBO[currentName2].hide();
    Options.ptWin2IsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  my[currentName].hide();
  Options.ptWinIsOpen = false;
  saveOptions();
}

function addMyFunction (func){      // add function to run in our own scope
  unsafeWindow[func.name] = func;
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

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}


// onClick (city{name, id, x, y}, x, y)   city may be null!
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
    eX.maxLength=3;
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


function DialogRetry (errMsg, seconds, onRetry, onCancel){
  seconds = parseInt(seconds);
  rdiv = document.getElementById ('RetryDialog');
  if (!rdiv){
    rdiv = document.createElement('div');
    kochead = unsafeWindow.document.getElementById('kochead');
    kochead.appendChild(rdiv);
    rdiv.id = 'RetryDialog';
    rdiv.style.background = "#fee";
    rdiv.style.border = "3px ridge #666";
    rdiv.style.zIndex = '200100';
    rdiv.style.width = '500px';
    rdiv.style.height = '200px';
    rdiv.style.position = "absolute";
    rdiv.style.top = "50px";
    rdiv.style.left = "115px";
    rdiv.innerHTML = '<DIV style="background: #cccccc"><CENTER>Boite outils</div>\
      <CENTER><BR><FONT COLOR=#550000><B>Une erreur a &eacute;t&eacute; d&eacute;tect&eacute;e :</b></font><BR><BR><DIV id=retryErrMsg></div>\
      <BR><BR><B>Nouvel essai dans <SPAN id=retrySeconds></b></span> secondes ...<BR><BR><INPUT id=retryCancel type=submit value="ANNULER" \>';
    document.getElementById('retryCancel').addEventListener ('click', doCancel, false);
  }
  rdiv.style.display = 'block';
  document.getElementById('retryErrMsg').innerHTML = errMsg;
  document.getElementById('retrySeconds').innerHTML = seconds;
  rTimer = setTimeout (doRetry, seconds*1000);
  countdown ();

  function countdown (){
    document.getElementById('retrySeconds').innerHTML = seconds--;
    if (seconds > 0)
      cdTimer = setTimeout (countdown, 1000);
  }
  function doCancel(){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    rdiv.style.display = 'none';
    onCancel ();
  }
  function doRetry (){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    rdiv.style.display = 'none';
    onRetry();
  }
}

function MyAjaxRequest (url, o, noRetryX){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;

  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

if (DEBUG_TRACE) logit (" 1a myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  new Ajax.Request(url, opts);
  return;

  function myRetry(){
    ++retry;
    new Ajax.Request(url, opts);
    delay = delay * 1.25;
  }

  function myFailure(){
    var o = {};
if (DEBUG_TRACE) logit ("myAjaxRequest.myFailure(): "+ inspect(rslt, 1, 1));
    o.ok = false;
    o.errorMsg = "AJAX Communication Erreur";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (rslt.updateSeed)
      unsafeWindow.update_seed(rslt.updateSeed);
    if (rslt.ok){
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess(): "+ inspect(rslt, 1, 1));
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      wasSuccess (rslt);
      return;
    }
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess() !ok : "+ inspect(rslt, 3, 1));
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      DialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}


// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  return 'neutral';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}


function getDiplomacy2 (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'Neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'Friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'Hostile';
  if (aid == Seed.allianceDiplomacies.allianceId)
    return 'Ally';
  return 'Neutral';
};




// TODO: Check times for expired marches !?!?!
// note: unselected city has outdated info

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

var fortNamesShort = {
  53: "Arbaletes",
  55: "Trebuchet",
  60: "Pieges",
  61: "Chausse-trape",
  62: "Palissade",
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



function logit (msg){
  var serverID = GetServerId();
  var now = new Date();
  GM_log (serverID +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
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
          WinLog.write ('<A TARGET=_tab HREF="'+ scripts[i].src +'">'+ scripts[i].src +'</a>');
      }
    }
    
    if (t.popDebug == null){  
      t.popDebug = new CPopup ('db', 0, 0, 400,500, true);
      t.popDebug.getTopDiv().innerHTML = 'DEBUG';
      t.popDebug.getMainDiv().innerHTML = '<DIV><INPUT type=submit id=dbsuball value=ALL> &nbsp; <INPUT type=submit id=dbsubnone value=NONE> &nbsp; \
        <INPUT type=submit id=dbdefaults value=DEFAULTS> &nbsp; <INPUT type=submit id=dbsubdo value=SHOW>&nbsp; <INPUT type=submit id=dbsubscripts value=SCRIPTS></div>\
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


function saveOptions (){
  var serverID = GetServerId();
  GM_setValue ('BOOptions_'+serverID, JSON2.stringify(Options));
}

function readOptions (){
  var serverID = GetServerId();
  s = GM_getValue ('BOOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts)
      Options[k] = opts[k];
  }
}

function createButton (label){
  var a=document.createElement('a');
  a.className='button20';
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text);
  a.className='tab';
  a.id = 'ptOfficial';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if(tabs) {
  
   var e = tabs.parentNode;
    var eNew = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
   
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' &&  ee.id!='main_engagement_tabs'){
        eNew = ee;
        break;
      }
    }
    if (eNew == null){
      eNew = document.createElement('div');
      eNew.className='tabs_engagement';
      eNew.style.background='#ca5';
      tabs.parentNode.insertBefore (eNew, tabs);
      eNew.id = 'gmTabs';
      eNew.style.whiteSpace='nowrap';
      eNew.style.width='735px';
    }
    if (eNew.firstChild){
      eNew.insertBefore (a, eNew.firstChild);
    }else{
      eNew.appendChild(a);
     }
    
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}
function AddMainTabLink2(text, eventListener, mouseListener) {
  var b = createButton (text);
  b.className='tab';
  b.id = 'ptOfficial2';
  
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if(tabs) {
  
   var e = tabs.parentNode;
    var eNew = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
   
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' &&  ee.id!='main_engagement_tabs'){
        eNew = ee;
        break;
      }
    }
    if (eNew == null){
      eNew = document.createElement('div');
      eNew.className='tabs_engagement';
      eNew.style.background='#ca5';
      tabs.parentNode.insertBefore (eNew, tabs);
      eNew.id = 'gmTabs';
      eNew.style.whiteSpace='nowrap';
      eNew.style.width='735px';
    }
    if (eNew.firstChild){
      eNew.insertBefore (b, eNew.firstChild);
    }else{
      eNew.appendChild(b);
     }
    
    b.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      b.addEventListener('mousedown',mouseListener, true);
    return b;
  }
  return null;
}


unsafeWindow.PTscout = function (x, y){
  //hideMe ();  
  setTimeout (function (){ 
    
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    unsafeWindow.changeview_map(document.getElementById('mod_views_map'));
	unsafeWindow.modal_attack(3,x,y);
  }, 0);
};


/**********************************************************************************/

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
//  return ('<A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a>' );
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}

function strButton14 (label, tags){
  if (tags == null)
    tags = '';
  return ('<A class="button14 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a>' );
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

// Simple method, as if it were typed in thru DOM
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

// works well, but message is not echoed back to local client
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



/************  LIB classes/functions .... **************/
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
  display : function (label, noReset){
    now = new Date();
    elapsed = now.getTime() - DebugTimer.startTime;
    //logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};

function debugPos  (e){
  return 'client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
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


function htmlTitleLine (msg){
  return '<TABLE width=100% cellspacing=0><TR><TD style="padding:0px" width=50%><HR></td><TD style="padding:0px">[ '+ msg +' ]</td><TD style="padding:0px" width=50%><HR></td></tr></table>';  
}


// creates a 'popup' div
function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  // protos ...
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainDiv = getMainDiv;
  this.getZindex = getZindex;
  this.setZindex = setZindex;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'CPopup '+ prefix +'_CPopup';
  this.div.style.background = "#fff";
  this.div.style.zIndex = "111111";        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="CPopupTop"><TD id="'+ prefix +'_top" width=99%></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color: #fff; background: #555; padding-left: 5px; padding-right: 5px;">X</td></tr>\
      <TR><TD valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', new CeventXClose(this).handler, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);

  function CeventXClose (that){
    var t = that;
    this.handler=handler;
    function handler (){
      t.show(false);
      if (t.onClose != null)
        t.onClose();
    }
  }

  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }

  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }

  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }

  function setZindex(zi){
    this.div.style.zIndex = ''+zi;
  }

  function getZindex(){
    return parseInt(this.div.style.zIndex);
  }

  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }

  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }

  function show(tf){
    if (tf)
      this.div.style.display = 'block';
    else
      this.div.style.display = 'none';
  }

  function toggleHide(t){
    if (t.div.style.display == 'block') {
      t.div.style.display = 'none';
      return false;
    } else {
      t.div.style.display = 'block';
      return true;
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
if (DEBUG_TRACE_DRAG) t.dispEvent ('eventDOWN', me);
      if (t.bounds == null){
        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
if (DEBUG_TRACE_DRAG) logit ('Clickable rect: '+ inspect (t.clickableRect, 3, 1));
if (DEBUG_TRACE_DRAG) logit ('Body rect: '+ inspect (t.bodyRect, 3, 1));
if (DEBUG_TRACE_DRAG) logit ('Bound rect: '+ inspect (t.boundRect, 3, 1));
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
if (DEBUG_TRACE_DRAG) logit ("BOUNDS: "+ inspect (t.bounds, 8, 10));
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
if (DEBUG_TRACE_DRAG) t.dispEvent ('eventUP', me);
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
if (DEBUG_TRACE_DRAG) logit ('doneMoving');
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
//t.dispEvent ('eventOUT', me);
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
//t.dispEvent ('eventMOVE', me);
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

String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;' };
String.prototype.htmlEntities = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}

String.prototype.stripTags = function(){ 
  return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
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

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
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

function ById(id) {
	return document.getElementById(id);
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

function SelectAll(id)
{
 document.getElementById(id).focus();document.getElementById(id).select();
} 

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
}

};
//if (unsafeWindow.domainName == 'Clarent232' && getMyAlliance()[0]==2578) 
ptStartup ();


// ==UserScript==
// @name           Boite Outils
// @version        1.42
// @namespace      Boite Outils
// @description    Boite a outils, la boite qui sait tout faire ou presque. Par BeWorld
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @resource       PROTOTYPEJS https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js
// @resource 	   URL_CASTLE_BUT 		http://i.imgur.com/MPlZr.png
// @resource 	   URL_CASTLE_BUT_SEL 		http://i.imgur.com/XWR4B.png
// @resource 	   URL_PROVINCE_MAP 		http://i.imgur.com/VE48b.png
// @require 	   http://sizzlemctwizzle.com/updater.php?id=100060
// ==/UserScript==

var Version = '1.42';
var nomonglet = "Bo&icirc;te &agrave; outils";
var DEBUG_BUTTON = false;
var DEBUG_TRACE = false;
var DEBUG_TRACE_DRAG = false;

var MAP_DELAY = 1200;
var ENABLE_TEST_TAB = true;   // Onglet supplémentaire pour Faire de fausse attaque sur soi meme :)

var miseajour = "Traduction, adaptation et ajout par BeWorld - Base repris de PowerTools, merci a l'auteur";
var URL_CASTLE_BUT = GM_getResourceURL('URL_CASTLE_BUT');
var URL_CASTLE_BUT_SEL = GM_getResourceURL('URL_CASTLE_BUT_SEL');
var URL_PROVINCE_MAP = GM_getResourceURL('URL_PROVINCE_MAP');
var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};  


/*** AMELIORATIONS DIVERS SUR LE JEU ***/
// These first 2 functions just throw out the two huge ads at the top of the page - GotBud
function my_func()
{
    try
    {
       
	   var promo = document.getElementById('crossPromoBarContainer');
		promo.style.marginTop = '0px';
		promo.style.backgroundColor = 'black';
		promo.style.color = 'red';
		promo.style.display = 'hidden';
		promo.style.position = 'absolute';
	    promo.style.left = '0px';
		promo.style.top = '9000px';
    }
    catch (zError)
    {
       // alert (zError); //-- Use console.log() in place of alert(), if running Firebug.

    }
}

window.addEventListener ("load", my_func, false);

function my_func2()
{
    try
    {
       
	   var progressBar = document.getElementById('progressBar');
		progressBar.style.marginTop = '0px';
		progressBar.style.backgroundColor = 'black';
		progressBar.style.color = 'red';
		progressBar.style.display = 'hidden';
		progressBar.style.position = 'absolute';
	    progressBar.style.left = '0px';
		progressBar.style.top = '9000px';
    }
    catch (zError)
    {
      //  alert (zError); //-- Use console.log() in place of alert(), if running Firebug.

    }
}

window.addEventListener ("load", my_func2, false);

 var classString;
   classString =   '.attaquer {';
   classString +=      'margin-top:3px;background: url(http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg) no-repeat;';
   classString +=      "}";
   classString +=   '.reconnaissance {';
   classString +=      'margin-top:3px;background: url(http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg) no-repeat;';
   classString +=      "}";
   classString +=   '.retour {';
   classString +=      'margin-top:3px;background: url(http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg) no-repeat;';
   classString +=      "}";
   classString +=   '.transporter {';
   classString +=      'margin-top:3px;background: url(http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg) no-repeat;';
   classString +=      "}"; 
   classString +=    '.modalCurtain {';
   classString +=    'top:53px !important;';
   classString +=    "}";
   classString +=    '.modalBox {';
   classString +=    'top:53px !important;';
   classString +=    "} ";
   classString +=    ".noalliance { display:none !important; } ";
 var Style = document.createElement ('STYLE');
 Style.setAttribute ('type', 'text/css');
 Style.innerHTML = classString;
 document.body.appendChild (Style);

// tabulation Alliance en bas : selectionner par defaut
setTimeout(function() {
 unsafeWindow.directory_changetab(2);
 unsafeWindow.getDirectoryTabAllianceMembers();
 unsafeWindow.track_chrome_btn('Directory_Alliance');
 //return false;

}, 5000);

/**** FIN DES AMELIORATIONS *****/

try {
  eval (GM_getResourceText('PROTOTYPEJS'));
}catch (dontcare){
}

var Options = {
  includeMarching:true,
  EnableFormation:true,
  encRemaining : true,
  maxIdlePop   : false,
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  filPuissance  : 0,
  filPuissanceMax  : 1000000,
  wildType     : 1,
  citySrchFilter :0,
  unownedOnly  : true,
  fixWarnZero  : true,
  fixPageNav   : true,
  mistedOnly   : false,
  hostileOnly  : false,  
  fixTower     : true,
  fixMapDistance: true,
  fixMsgCount  : true,
  enhanceARpts : true,
  allowAlterAR : true,
  enhanceMsging : true,
  ptWinIsOpen  : false,
  ptWin2IsOpen  : false,
  ptWinDrag    : false,
  ptWinPos     : {},
  ptWin2Pos     : {},
  enableFoodWarn : true,
  enableFoodWarnTchat : false,
  foodWarnHours : 24,
  gmtClock : true,
  chatEnhance : true,
  fixKnightSelect : true,
  attackCityPicker : true,
  mapCoordsTop : true,
  dispBattleRounds : true,
  reportDeleteButton : true,
  alertConfig  : {
  	aChat:true, 
	aPrefix:'**** Je suis attaque !!! **', 
	scouting:true, 
	wilds:true, 
	minTroops:1, 
	spamLimit:10, 
	embassy:true, 
	mytroops:true, 
	food:true, 
	defense:true, 
	hq:'',
	sendEmail:false,
	emailAddress:'',
	token:'',
	sendasWhisper:false,
	sendtoAlly:true,
	}
};

//unsafeWindow.pt_Options=Options;

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON; 

var Cities = {};
var Seed = unsafeWindow.seed;
var my = {};
var myBO = {};
var currentName = 'Overview';
var currentName2 = 'Overview1';
var mainPop, mainPop2;
var Tabs = [
  ['Overview', 'R&eacute;sum&eacute;'],
  ['Marches', 'Marches'],
  ['TranspAuto', 'Outils'],
  ['Train' , 'Former'], 
  ['Knights' , 'Chevaliers'],
  ['Search', 'Chercher'],
  ['AllianceList' , 'Joueurs'],
  ['Wilds' , 'TS'],
  ['Info' , 'Info'],
  ['Options' , 'Opts'],
];

if (ENABLE_TEST_TAB) {
var Tabs2 = [
  ['Overview', 'Ressources'],
  ['Overview1', 'Arm&eacute;e'],
  ['Crests', 'Armoiries'],
  ['map', 'Carte'],
  ['Test', 'Test'] 
];
}else {
var Tabs2 = [
  ['Overview', 'Ressources'],
  ['Overview1', 'Arm&eacute;e'],
  ['Crests', 'Armoiries'],
  ['map', 'Carte'],
];
}

//   ['Objets', 'Objets'],

var ptStartupTimer = null;
ptStartupErrorTimer = null;

// example: http://www150.kingdomsofcamelot.com
function GetServerId() {
  var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
  if(m)
    return m[1];
  return '';
}

// example: http://www150.kingdomsofcamelot.com
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

function ptErrorReload (){
  //logit ('*** ptError');
  window.clearTimeout (ptStartupTimer);//Try not to pile up several resends.
  window.clearTimeout (ptStartupErrorTimer);
  //history.go(0);//Sometimes geting resend dialog with this alone. Adding reload code from Attack helper.
	var serverId=GetServerId();
	if (serverId == null){
		history.go(0);
		return;
	}
	var go = 'http://apps.facebook.com/kingdomsofcamelot/?s='+serverId;
	var t = '<FORM target="_top" action="'+ go +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=s value="'+ serverId +'"</form>';
	var e = document.createElement ('div');
	e.innerHTML = t;
	document.body.appendChild (e);
	setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
}

//Code from attack helper.
ReloadWindow:function (){
	var serverId=GetServerId();
	if (serverId == null){
		//history.go(0);
		return;
	}
	var go = 'http://apps.facebook.com/kingdomsofcamelot/?s='+serverId;
	var t = '<FORM target="_top" action="'+ go +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=s value="'+ serverId +'"</form>';
	var e = document.createElement ('div');
	e.innerHTML = t;
	document.body.appendChild (e);
	setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
}

function ptStartup (){

  if(ptStartupTimer != null ) {
    ptStartupErrorTimer = window.setTimeout (ptErrorReload, 45000);
  }
  window.clearTimeout (ptStartupTimer);
  if (document.getElementById('ptOfficial') != null)  // button already present! (shouldn't happen)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    ptStartupTimer = window.setTimeout (ptStartup, 2000);
    return;
  }  else {
    if(ptStartupErrorTimer != null) {
      window.clearTimeout (ptStartupErrorTimer);
    }
  }
  
  
  
  
  readOptions();

  Seed = unsafeWindow.seed;
GM_addStyle ('.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .hostile td { background:crimson; }.friendly td{background:lightblue; }.ally td{background:royalblue; }\
    .Hostile td { background:crimson; }.Friendly td{background:lightblue; }.Ally td{background:royalblue; }\
    .neutral td { background:lightgreen; }.unaligned td { background:gold; }\
    .Neutral td { background:lightgreen; }.Unaligned td { background:gold; }\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    div.ptDiv {background-color:#f0f0f0;}\
    table.ptTab tr td {border:none; background:none; white-space:nowrap;}\
    table.ptTabPad tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none;}\
    table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptTabOverview tr td {border:1px none none solid none; white-space:nowrap; padding: 1px 2px;  font-size:11px;}\
    table.ptTabOverview7 tr td {border:1px none none solid none; white-space:nowrap; padding: 1px 2px;  font-size:11px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .ptOddrow {background-color:#eee}\
    .ptstat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .ptStatLight {color:#ddd}\
    .ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {border-size:3px; border-color:#000;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    .ptChatWhisper {}\
    .ptChatAlliance {}\
    .ptChatGlobal {background-color: #fdd}\
    .ptChatIcon {border: 2px inset red}\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    span.boldDarkRed {color:#600; font-weight:bold}\
    a.ptButton20 {color:#ffff80}\
    .matTab {}\
    .matTabSel {font-size: 13px; color: #000; border: 1px; border-style: solid solid none solid; margin:4px; padding-left:5px; padding-right:5px; background: #eed; font-weight:bold}\
    .matTabNotSel {font-size: 13px; color: #fff; border: 1px; border-style: solid solid none solid; border-color: #000; margin:4px; padding-left:5px; padding-right:5px; background: #1e66bd; font-weight:bold}\
    tr.CPopupTop td { background-color:#dde; border:none; height: 21px;  padding:0px; }\
    .id2_CPopupTop td { background-color:#ffffff;}\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px;}\
    .CPopup .id2_CPopMain { background-color:#8ff; }\
    .CPopup  { border:3px ridge #666 }\
    .idp2_CPopup { opacity:0.9; }');
  // check for prototype.js ...      
  try {
    var a = Object.clone ({}); 
  } catch (e){
    var pop = new CPopup ('h6f', 150,200,470,150, false, function (){delete pop});
    pop.getTopDiv().innerHTML = '<CENTER>ERREUR DE CHARGEMENT !</center>';
    pop.getMainDiv ().innerHTML = '<DIV style="font-size:18px; font-weight:bold;"><CENTER><p>The dependency "prototype.js" was not found.<br>Reinstaller <a  href="https://addons.mozilla.org/fr/firefox/addon/greasemonkey/versions/" target=_blank>GreaseMonkey version 0.80</a></div>';
    pop.setZindex(111115);
    pop.show(true);
  }
    
  window.name = 'PT';
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
//logit ( 'Options.ptWinPos: '+ inspect (Options.ptWinPos, 5, 1)); 
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y+c.height;
    saveOptions ();
  }
  if (Options.ptWin2Pos==null || Options.ptWin2Pos.x==null|| Options.ptWin2Pos.x=='' || isNaN(Options.ptWin2Pos.x)){
      var c = getClientCoords (document.getElementById('main_engagement_tabs'));
      Options.ptWin2Pos.x = c.x+4;
      Options.ptWin2Pos.y = c.y+c.height;
      saveOptions ();
  }
  mainPop = new CPopup ('idp', Options.ptWinPos.x, Options.ptWinPos.y, 749,700, Options.ptWinDrag, 
      function (){
        my[currentName].hide();
        Options.ptWinIsOpen=false; 
        saveOptions()
      });
  
  var mainDiv = mainPop.getMainDiv();
  mainPop.getTopDiv().innerHTML = '<TABLE cellspacing=0 width=100%><TR class=CPopupTop valign=bottom><TD><SPAN id=idTabs></span></td><TD align=right>'+ Version +'&nbsp;</td></tr></table>';
  
  
  
  mainPop2 = new CPopup ('idp2', Options.ptWin2Pos.x, Options.ptWin2Pos.y, 749,350, true, 
        function (){
          myBO[currentName2].hide();
          Options.ptWin2IsOpen=false; 
          saveOptions();
      });
  
  
  var mainDiv2 = mainPop2.getMainDiv();
  mainPop2.getTopDiv().innerHTML = '<TABLE cellspacing=0 width=100%><TR class=CPopupTop valign=bottom><TD><SPAN id=idTabs2></span></td><TD align=right>'+ Version +'&nbsp;</td></tr></table>';
 
  var eTabs2 = document.getElementById('idTabs2');
 for (k=0; k<Tabs2.length; k++){
     var a=document.createElement('a');
     a.className='matTabNotSel';
     a.id = 'ab'+ Tabs2[k][0];
     a.innerHTML='<span id="spp'+ Tabs2[k][0] +'" class="matTab">'+ Tabs2[k][1] +'</span>';
     eTabs2.appendChild(a);
     a.addEventListener('click', clickedTab2, false);
     myBO[Tabs2[k][0]].init();
     cont = myBO[Tabs2[k][0]].getContent();
     cont.style.display = 'none';
     mainDiv2.appendChild(cont);
 }


  var eTabs = document.getElementById('idTabs');
  for (k=0; k<Tabs.length; k++){
    var a=document.createElement('a');
    a.className='matTabNotSel';
    a.id = 'aa'+ Tabs[k][0];
    a.innerHTML='<span id="sp'+ Tabs[k][0] +'" class="matTab">'+ Tabs[k][1] +'</span>';
    eTabs.appendChild(a);
    a.addEventListener('click', clickedTab, false);
    my[Tabs[k][0]].init();
    cont = my[Tabs[k][0]].getContent();
    cont.style.display = 'none';
    mainDiv.appendChild(cont);
  }

  setTabStyle (document.getElementById ('aaOverview'), true);
  my.Overview.getContent().style.display = 'block';
  
  setTabStyle (document.getElementById ('abOverview1'), true);
  myBO.Overview1.getContent().style.display = 'block';
  
   
  AllianceReports.init ();

  messageNav.init();
  TowerAlerts.init();

  MessageCounts.init ();
  
  FoodAlerts.init();
  
 ChatStuff.init ();
     AttackDialog.init(); 
    
    
    battleReports.init ();
    CoordBox.init ();
 
  
  GMTclock.init ();
  
  MapDistanceFix.init ();
  WarnZeroAttack.init ();
  PageNavigator.init ();
  
  
  exportToKOCattackBO.init();
  
 if (Options.ptWin2IsOpen){
  mainPop2.show (true);
  myBO[currentName2].show();
 }
  if (Options.ptWinIsOpen){
    mainPop.show (true);
    my[currentName].show();
  }
  window.addEventListener('unload', onUnload, false);

  if (Options.fixTower)
    TowerAlerts.enableFixTarget(true);
    
    TowerAlerts.enableFixFalseReports(true);
    
  TowerAlerts.setPostToChatOptions(Options.alertConfig);
   
   AddMainTabLink2("Statistiques", eventHideShow2, mouseMainTab2);
   
   AddMainTabLink(nomonglet, eventHideShow, mouseMainTab);

   
  }


function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  Options.ptWin2Pos = mainPop2.getLocation();
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
};


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
      msg = msg.replace (/(Attaquants.*?<span.*?)<\/div>/im, '$1<BR>Rounds: '+ rslt.rnds +'</div>');
    }
    return msg;
  },
  hook : function (msg, rslt){
    if (rslt.rnds && Options.dispBattleRounds){
      msg = msg.replace (/(Attaquants <span.*?)<\/div>/im, '$1<BR>Rounds: '+ rslt.rnds +'</div>');
    }
    return msg;
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
    e.focus();
  },

        
  chatDivContentHook : function (msg){
    var t = ChatStuff; 
    var class = '';
    var m = /div class='info'>.*<\/div>/im.exec(msg);
    if (m == null)
      return msg;
    if (m[0].indexOf('chuchote') >= 0)
      class = 'ptChatWhisper';
    else if (m[0].indexOf('to the alliance')>= 0 || m[0].indexOf("alliance:") >= 0)
      class = 'ptChatAlliance'; 
    else  
      class = 'ptChatGlobal'; 
    msg = msg.replace ("class='content'", "class='content "+ class +"'");
       
    if(document.getElementById("mod_comm_list1"))
    { 
      document.getElementById("mod_comm_list1").style.backgroundColor = '#99AADF';
    }
    
    if (msg.indexOf('claimAllianceChat')<0){
      msg = msg.replace (/([0-9]{1,3})\s*(,|-)\s*([0-9]{1,3})/img, '<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">($1$2$3)</a>');
    }
      
    var m = /(Lord|Lady) (.*?)</im.exec(msg);
    if (m != null)
      msg = msg.replace (/<img (.*?>)/img, '<A onclick=\"ptChatIconClicked(\''+ m[2] +'\')\"><img class=\"ptChatIcon\" $1</a>');
    return msg;
  },
}


var anticd = {
  isInited : false,
  KOCversion : '?',
  
  init: function (){
    if (this.isInited)
      return this.KOCversion;
      if (unsafeWindow.cm)  unsafeWindow.cm.cheatDetector.detect = eval ('function (){}');
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


function displayReport (rptid, side){
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.rid = rptid;
  params.side = side;
  
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchReport.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
      //logit (inspect (rslt, 5, 1));      
      if (notify)
        notify (rslt.errorMsg);
    },
    onFailure: function () {
      if (notify)
        notify ('AJAX ERROR');
    },
  });
} 

var knightRoles = [
  ['Contremaitre', 'politics', 'Pol'],
  ['Mar&eacute;chal', 'combat', 'Com'],
  ['Alchimiste', 'intelligence', 'Int'],
  ['R&eacute;gisseur', 'resourcefulness', 'Res'],
];



/*************** TRANSPORT **********/
my.TranspAuto = {
 cont : null,
 displayTimer : null,
 state : null,
 curTabBut : null,
 curTabName : null,
 sourceCity : {},
 destinationCity : {},
 rows : [],

 init : function (){
   var t = my.TranspAuto;
   t.cont = document.createElement('div');
   t.state = null;
   return t.cont;
 },
  getContent : function (){
    var t = my.TranspAuto;
    return t.cont;
  },
  hide : function (){
    var t = my.TranspAuto;
    t.state = null;
    clearTimeout (t.displayTimer);
  },
  
  show : function (){  
     var t = my.TranspAuto;
       
     t.cont.innerHTML = '<TABLE class=ptTab align=center><TR><TD><INPUT class=pbSubtab ID=ptTRPSubA type=submit value=TRANPORTER></td>\
           <TD><INPUT class=pbSubtab ID=ptTRPSubM type=submit value=REASSIGNER></td>\
           <TD><INPUT class=pbSubtab ID=ptTRPSubD type=submit value=ATTAQUER></td>\
           <TD><INPUT class=pbSubtab ID=ptTRPSubB type=submit value="RAPPORTS ALLIANCE"></td><TD><INPUT style="display:none;" class=pbSubtab ID=ptTRPSubC type=submit value="MES RAPPORTS"></td></tr></table><HR class=ptThin>\
       <DIV id=ptTRPOutput style="margin-top:10px; background-color:white; height:300px"></div>';
       
      t.transportDiv = document.getElementById('ptTRPOutput'); 
      
     document.getElementById('ptTRPSubA').addEventListener('click', e_butSubtab, false);
     document.getElementById('ptTRPSubM').addEventListener('click', e_butSubtab, false);
     document.getElementById('ptTRPSubB').addEventListener('click', e_butSubtab, false);
     document.getElementById('ptTRPSubC').addEventListener('click', e_butSubtab, false);
     document.getElementById('ptTRPSubD').addEventListener('click', e_butSubtab, false);
     
     changeSubtab (document.getElementById('ptTRPSubA'));  // permet de lancer par defaut le tranport
       
        
      function e_butSubtab (evt){
     
           changeSubtab (evt.target);   
       }
    
       function changeSubtab (but){
          t.transportDiv.innerHTML="";
           if (but == t.curTabBut)
             return;
           if (t.curTabBut){
             t.curTabBut.className='pbSubtab'; 
             t.curTabBut.disabled=false;
           }
           t.curTabBut = but;
           but.className='pbSubtab pbSubtabSel'; 
           but.disabled=true;
           t.curTabName = but.id.substr(8);
           t.show2();
       }  
     
   },
   show2 : function (){
       var t = my.TranspAuto;
       t.state = null;
       clearTimeout (t.displayTimer);
       if (t.curTabName == 'M')
         t.showREASSIGN();
       if (t.curTabName == 'D')
         t.showATTAQUE();
       if (t.curTabName == 'B')
         t.showRAPPORT(1);
       if (t.curTabName =='C')
         t.showMESRAPPORT();
       else
         t.showTRP();
  },
  
  /************MODULE REASSIGNAITON *************/
  showATTAQUE : function() {
      var t = my.TranspAuto;
      var rownum = 0;
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
            m.push ('</td>');
            if (noTotal){
              m.push ('<TD');
              m.push (style);
              m.push ('>&nbsp;</td>');
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
      
      
      if (t.state == null) {  
        m = "<DIV class=ptstat>ATTAQUER rapidement</div>";
        m +="<div id='statpourREA'></div>";
        m += "<TABLE width=400 class=ptTab border=0 align=center><TR><TD colspan=3><DIV id=divSTRtop></div></td></tr>\
          <tr align=center valign=top><td colspan=1 width=33%><b><u>Source</b></u><br><span id=srcRptspeedcity></span></td>\
          <td colspan=1 width=33%><b>&nbsp;</u></b></td>\
          <td colspan=1 width=33%><b><u>Destination</b></u><br><span id=desRptspeedcity></span></tr>\
          <tr align=center valign=top><td><div id=REAstatsource></div></td>\
          <td><table cellspacing=0 cellpadding=0 width=80%>";
           for (r=1; r<13; r++){
  	     m += '<tr><td align=right><img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg></td><td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAnbunit'+r+'" type=text size=7 value="0"></td></tr>';
     	}
          m += "</table></td><td>X:<input type=text id=BOAttackX size=3>&nbsp;Y:<input type=text id=BOAttackY size=3><br><input type=button id=REAaction value='Valider'></td></tr><td colspan=3><div id=ptREAStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>";
          
          
        t.transportDiv.innerHTML = m; 
        t.statpourREA = document.getElementById ('statpourREA');
        t.statutREA = document.getElementById ('ptREAStatus');
        t.AttackX = document.getElementById ('BOAttackX');
        t.AttackY = document.getElementById ('BOAttackY');
        t.actionREA = document.getElementById ('REAaction');
        t.actionREA.addEventListener ('click', t.clickATTAQUEDo, false);
        var dcp0 = new CdispCityPicker ('ptspeed0', document.getElementById('srcRptspeedcity'), false, t.clickREACitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
        t.state = 1;
      }
      /* PARTIE DES CHIFFRES DES TROUPES */
      rows[0]=[];
      m = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
               m += '<TD width=81><B>'+ Cities.cities[i].name.substring(0,10) +'</b></td>';
      }
      for (r=1; r<13; r++){
              rows[r] = [];
              for(i=0; i<Cities.numCities; i++) {
                cityID = 'city'+ Cities.cities[i].id;
                rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
              }
      }
      for (r=1; r<13; r++){
       m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg>', rows[r]);
      }
      m += "</table>";
      t.statpourREA.innerHTML = m;
          
      t.displayTimer = setTimeout (t.showREASSIGN, 10000);
      //t.transportDiv.innerHTML = 'Reassigner des troupes - bientot disponible !';
    },
   clickATTAQUEDo: function() {
     var t = my.TranspAuto;
     t.statutREA.innerHTML = '';
     // on force la ville source !
     var cityA=null;
     cityA=ById('citysel_'+ (t.sourceCity.idx + 1));
     nHtml.Click(cityA);
     var totalunit=0;
     // faire les test d'unité !
     for (r=1; r<13; r++){
         if (parseInt(ById("REAnbunit"+r).value) > parseInt(ById("REAdestunit"+r).value)) {
           ById("REAnbunit"+r).style.backgroundColor="red";
           return false;
         
         }
         totalunit=totalunit+parseInt(ById("REAnbunit"+r).value);
         ById("REAnbunit"+r).style.backgroundColor="";
     }
     
     var errMsg = "";
     if (isNaN (t.AttackX.value) ||t.AttackX.value<0 || t.AttackX.value>749)
           errMsg = "X doit &ecirc;tre entre 0 et 749<BR>"; 
     if (isNaN (t.AttackY.value) || t.AttackY.value<0 || t.AttackY.value>749)
      errMsg += "Y doit &ecirc;tre entre 0 et 749<br>";
     
     
     if (errMsg != "") {
           t.statutREA.innerHTML = '<FONT COLOR=#550000>"+ errMsg +"</font>';
          return;
     }
     
     
     
     
     if (totalunit==0) {
        t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible  d\'attaquer avec 0 unit&eacute;e... pfff !.</font>';
          return;
     }
     var niveauPointRall=parseInt(getCityBuilding (t.sourceCity.id, 12).maxLevel); // 12=Point de ralliement
    
     if (niveauPointRall==11) {
      var maxtroupe=150000;
     } else {
      var maxtroupe=niveauPointRall*10000;
     }
     if (totalunit>maxtroupe) {
      t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible d\'attaquer avec plus de '+maxtroupe+' unit&eacute;es a la fois.</font>';
      return;
     }
     
     t.actionREA.disabled=true;
     var x=t.AttackX.value;
     var y=t.AttackY.value;
     unsafeWindow.Modal.hideModalAll();
      
     unsafeWindow.modal_attack(4,x,y);
     
     window.setTimeout(function() {
    
     for (r=1; r<13; r++){
       if (ById("REAnbunit"+r).value>0) {
        var unit = ById('modal_attack_unit_ipt'+r);
        unit.value = ById("REAnbunit"+r).value;
        var evt = document.createEvent("KeyboardEvent");
        if(evt.initKeyboardEvent) {
  			evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
  	  } else {
  			evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
  	  }
        unit.dispatchEvent(evt);   
       }
     }
     
     ById("modal_attack_knight").selectedIndex=1;
     
     unsafeWindow.modal_attack_do();
     
     window.setTimeout(function() {
    	   	      t.actionREA.disabled=false;
    	   	      t.statutREA.innerHTML = "<center>Attaque envoy&eacute;e</center>";

      },1000);
     
     }, 500); // Fin settime modal
      
      
      
   },
 
  
  
  
  
  /************MODULE REASSIGNAITON *************/
  showREASSIGN : function() {
    var t = my.TranspAuto;
    var rownum = 0;
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
          m.push ('</td>');
          if (noTotal){
            m.push ('<TD');
            m.push (style);
            m.push ('>&nbsp;</td>');
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
    
    
    if (t.state == null) {  
      m = "<DIV class=ptstat>R&eacute;assigner des troupes d'une ville a une autre</div>";
      m +="<div id='statpourREA'></div>";
      m += "<TABLE width=400 class=ptTab border=0 align=center><TR><TD colspan=3><DIV id=divSTRtop></div></td></tr>\
        <tr align=center valign=top><td colspan=1 width=33%><b><u>Source</b></u><br><span id=srcRptspeedcity></span></td>\
        <td colspan=1 width=33%><b><u>R&eacute;assigner</u></b><br><input type=button id=REAaction value='Valider'></td>\
        <td colspan=1 width=33%><b><u>Destination</b></u><br><span id=desRptspeedcity></span></tr>\
        <tr align=center valign=top><td><div id=REAstatsource></div></td>\
        <td><table cellspacing=0 cellpadding=0 width=80%>";
         for (r=1; r<13; r++){
	     m += '<tr><td align=right><img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg></td><td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAnbunit'+r+'" type=text size=7 value="0"></td></tr>';
   	}
        m += "</table></td><td><div id=REAstatdest></div></td></tr><td colspan=3><div id=ptREAStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>";
        
        
      t.transportDiv.innerHTML = m; 
      t.statpourREA = document.getElementById ('statpourREA');
      t.statutREA = document.getElementById ('ptREAStatus');
      t.actionREA = document.getElementById ('REAaction');
      t.actionREA.addEventListener ('click', t.clickReassigneDo, false);
      var dcp1 = new CdispCityPicker ('ptspeed1', document.getElementById('desRptspeedcity'), false, t.clickREACityDestinationSelect, 1);
      var dcp0 = new CdispCityPicker ('ptspeed0', document.getElementById('srcRptspeedcity'), false, t.clickREACitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
      t.state = 1;
    }
    /* PARTIE DES CHIFFRES DES TROUPES */
    rows[0]=[];
    m = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
    for(i=0; i<Cities.numCities; i++) {
             m += '<TD width=81><B>'+ Cities.cities[i].name.substring(0,10) +'</b></td>';
    }
    for (r=1; r<13; r++){
            rows[r] = [];
            for(i=0; i<Cities.numCities; i++) {
              cityID = 'city'+ Cities.cities[i].id;
              rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
            }
    }
    for (r=1; r<13; r++){
     m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg>', rows[r]);
    }
    m += "</table>";
    t.statpourREA.innerHTML = m;
        
    t.displayTimer = setTimeout (t.showREASSIGN, 10000);
    //t.transportDiv.innerHTML = 'Reassigner des troupes - bientot disponible !';
  },
 clickReassigneDo: function() {
   var t = my.TranspAuto;
   t.statutREA.innerHTML = '';
   // on force la ville source !
   var cityA=null;
   cityA=ById('citysel_'+ (t.sourceCity.idx + 1));
   nHtml.Click(cityA);
   var totalunit=0;
   // faire les test d'unité !
   for (r=1; r<13; r++){
       if (parseInt(ById("REAnbunit"+r).value) > parseInt(ById("REAdestunit"+r).value)) {
         ById("REAnbunit"+r).style.backgroundColor="red";
         return false;
       
       }
       totalunit=totalunit+parseInt(ById("REAnbunit"+r).value);
       ById("REAnbunit"+r).style.backgroundColor="";
   }
   
   if (t.sourceCity.id==t.destinationCity.id) {
         t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible sur les memes villes !.</font>';
        return;
   }
   if (totalunit==0) {
      t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible de reassigner avec 0 unit&eacute;e... pfff !.</font>';
        return;
   }
   var niveauPointRall=parseInt(getCityBuilding (t.sourceCity.id, 12).maxLevel); // 12=Point de ralliement
  
   if (niveauPointRall==11) {
    var maxtroupe=150000;
   } else {
    var maxtroupe=niveauPointRall*10000;
   }
   if (totalunit>maxtroupe) {
    t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible de reassigner plus de '+maxtroupe+' unit&eacute;es a la fois.</font>';
    return;
   }
   
   t.actionREA.disabled=true;
   var x=t.destinationCity.x;
   var y=t.destinationCity.y;
   unsafeWindow.Modal.hideModalAll();
    
   unsafeWindow.modal_attack(5,x,y);
   
   window.setTimeout(function() {
  
   for (r=1; r<13; r++){
     if (ById("REAnbunit"+r).value>0) {
      var unit = ById('modal_attack_unit_ipt'+r);
      unit.value = ById("REAnbunit"+r).value;
      var evt = document.createEvent("KeyboardEvent");
      if(evt.initKeyboardEvent) {
			evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  } else {
			evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  }
      unit.dispatchEvent(evt);   
     }
   }
   
   ById("modal_attack_knight").selectedIndex=0;
   
   unsafeWindow.modal_attack_do();
      window.setTimeout(function() {
  	   	      t.actionREA.disabled=false;
  	   	      t.statutREA.innerHTML +="Fini !";
  	   	      //t.showREASSIGN(); // on force le rafraichissement
  	   	      //on efface le nbunit
		      //for (r=1; r<13; r++){
		      //     ById("REAnbunit"+r).value="0";
		      //}
		      //window.setTimeout(function() { t.show2(); }, 2000);
	},1000);
   
   }, 500); // Fin settime modal
    
    
    
 },
 
 clickREACitySourceSelect : function (city){
   var t = my.TranspAuto;
   t.sourceCity = city; 
   // on remplit les stat du DIV source
   //on efface le nbunit
   for (r=1; r<13; r++){
     ById("REAnbunit"+r).value="0";
   }
   var m="";
   m="<table cellspacing=0 cellpadding=0 width=80%>";
   var cityID = 'city'+ t.sourceCity.id;
   for (r=1; r<13; r++){   
     m += '<tr><td align=right><img title="'+unsafeWindow.unitcost['unt'+r][0]+'" height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg></td>\
           <td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAdestunit'+r+'" type=text size=7 readonly value="'+parseInt(Seed.units[cityID]['unt'+r])+'">&nbsp;\
           <input type=button value=">" id="REApdestunit'+r+'"  style="border:1px solid black;height:16px;font-size:11px;"></td></tr>';
   }
   m += "</table>";

   ById("REAstatsource").innerHTML = m;
   
   for (r=1; r<13; r++){
     ById("REApdestunit"+r).addEventListener ('click', function() {
     
       
       var nomcha=this.id.replace("REApdest","REAdest");
       var nomcha2=this.id.replace("REApdestunit","REAnbunit");
     
       ById(nomcha2).value=0; // on met à 0
       
       var niveauPointRall=parseInt(getCityBuilding (t.sourceCity.id, 12).maxLevel); // 12=Point de ralliement
       if (niveauPointRall==11) {
          var maxtroupe=150000;
       } else {
          var maxtroupe=parseInt(niveauPointRall*10000);
       }
       var nbunitto=0;
       for (r=1; r<13; r++) {
         nbunitto+=parseInt(ById("REAnbunit"+r).value);
       }
       //console.log("Max Troupe : " + maxtroupe + " - Nbunuit : " +nbunitto);
       var libre = parseInt(maxtroupe - nbunitto);
       //console.log("libre : " + libre);
       //  on click et on met le max de troupe dispo suivant le point de ralliement
       if (ById(nomcha).value>=libre) {
         ById(nomcha2).value = libre;
       }  else {
         ById(nomcha2).value= ById(nomcha).value;
       }
 
       
       
      }, false);
   }
   
   setTimeout (function (){ 
     var cityA=null;
     cityA=ById('citysel_'+ (city.idx + 1));
     nHtml.Click(cityA);
     }, 0);
   },
 clickREACityDestinationSelect : function (city){
    var t = my.TranspAuto;
    t.destinationCity = city;
    // on remplit les stat du DIV destination
    var m="";
    m="<table cellspacing=0 cellpadding=0 width=80%>";
    for (r=1; r<13; r++){
         cityID = 'city'+ t.destinationCity.id;
         m += '<tr><td align=right><img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg></td><td align=left><input style="border:1px solid black;height:16px;font-size:11px;" type=text size=7 readonly value="'+parseInt(Seed.units[cityID]['unt'+r])+'"></td></tr>';
    }
    m += "</table>";
    ById("REAstatdest").innerHTML = m;
    //t.destinationCityx.value=t.destinationCity.x;
    //t.destinationCityy.value=t.destinationCity.y;
    //t.TTbutTransport.disabled=false;
  },  
   
   
    /************MODULE RAPPORT ALLIANCE *************/  
  showMESRAPPORT : function(pageNum) {
     var t = my.TranspAuto;

     // t.transportDiv.innerHTML = "Recherche en cours...";
     unsafeWindow.Modal.hideModalAll();
       
     t.transportDiv.innerHTML = '<div class="modal_msg_body_hd"><div id="modal_msg_tabs"><a id="modal_msg_tabs_report" onclick="Messages.listReports();return false;"></a></div><div id="modal_msg_listwrap" class="modal_msg_listwrap clearfix">\
     <div style="min-height: 460px;" id="modal_msg_list" class="modal_msg_list">\
     <div class="modal_msg_reports"></div></div>\
     <div id="modal_msg_links"></div>\
     <div id="modal_msg_list_actions"></div>\
     <div style="float: none;" id="modal_msg_list_pagination"></div>\
     <div style="display:none;" id="modal_msg_write"></div>\
     <div style="display:none;" id="modal_msg_view"></div>\
     </div></div>';
 
  
     setTimeout(function() {
       unsafeWindow.modal_messages();
       
       unsafeWindow.track_chrome_btn("messages_btn");
       setTimeout(function() {
        unsafeWindow.Messages.listReports();
        
        
         unsafeWindow.Modal.hideModalAll();
       },500);
      
       
       },100);
     
     
   },
  /************MODULE RAPPORT ALLIANCE *************/  
  showRAPPORT : function(pageNum) {
     var t = my.TranspAuto;

     t.transportDiv.innerHTML = "Recherche en cours...";

     var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
         if (pageNum)  params.pageNo = pageNum;
         params.group = "a";
         new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
           method: "post",
           parameters: params,
           onSuccess: function (rslt) {
           
           
             //displayReports (rslt.arReports, rslt.arPlayerNames, rslt.arAllianceNames, rslt.arCityNames, rslt.totalPages);
		var ar=rslt.arReports;
		var msg = new Array();
		var playerNames=rslt.arPlayerNames;
		var cityNames=rslt.arCityNames;
		var totalPages=rslt.totalPages;
             	var allianceNames=rslt.arAllianceNames;
                var myAllianceId = getMyAlliance()[0];
                if (matTypeof(ar) != 'array') {
      		 msg.push ("<STYLE>.msgviewtable tbody .myCol div {margin-left:5px; overflow:hidden; white-space:nowrap; color:#000}\
            .msgviewtable tbody .myHostile div {font-weight:600; color:#600}\
            .msgviewtable tbody .myGray div {color:#666}\
            .msgviewtable tbody .myRein div {color:#050}\
            .msgviewtable tbody .myWarn div {font-weight:600; color:#442200}\
            </style>");
               msg.push("<div id='allianceContent' class='allianceboxwrap'><div class='modal_msg_reports'><a href='javascript:void(0);' id=clickclick onclick='allianceReports();'><img src='http://cdn1.iconfinder.com/data/icons/momenticons-gloss-basic/momenticons-gloss-basic/16/arrow-refresh.png'> Actualiser</a>")
               if (Options.allowAlterAR)
	                 msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
	               else
	                 msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
    
               
               msg.push("<table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
         	  msg.push("<thead><tr><td width=105>Date</td><td width=40>Type</td><td width=150>Attaquant</td><td>Cible</td><td>Voir</td><td colspan=2>Dist. ville</tr></thead><tbody>");
     		var rptkeys = unsafeWindow.Object.keys(ar);
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
		
		          msg.push ('<tr valign=top');
		          if (i%2 == 0)
		            msg.push(" class=stripe");
		          msg.push("><TD class="+ colClass +"><div>");
		          msg.push(unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime));
		          msg.push("</div></td><TD class="+ colClass  +"><div>");
		          rpt.marchType = parseInt(rpt.marchType);
		          if (rpt.marchType == 1)
		            msg.push (unsafeWindow.g_js_strings.commonstr.transport);
		          else if (rpt.marchType == 3)
		            msg.push (unsafeWindow.g_js_strings.commonstr.scout);
		          else
		            msg.push (unsafeWindow.g_js_strings.commonstr.attack);
		
		          // attacker ...
		          msg.push ("</div></td><TD class="+ colClass +"><div>");
		          if (parseInt(rpt.side1PlayerId) != 0)
		            msg.push('<a onclick=getInfoForAnUser("'+parseInt(rpt.side1PlayerId)+'");>'+escape(playerNames["p" + rpt.side1PlayerId])+"</a>");
		          else
		          msg.push ('?Unknown?');
		          msg.push ('&nbsp;<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ rpt.side1XCoord +','+ rpt.side1YCoord +')</a><bR>');
		          if (rpt.side1AllianceId != myAllianceId){
		            msg.push (allianceNames['a'+rpt.side1AllianceId]);
		            msg.push (' (');
		            msg.push (getDiplomacy(rpt.side1AllianceId));
		            msg.push (')');
		          } else {
		            msg.push ('<BR>');
		          }
		          msg.push ('</div></td>');
		
		          // cible ...
		          msg.push ("<TD class="+ colClass  +"><DIV>");
		          var type = parseInt(rpt.side0TileType);
		
		          if (type < 50){                              // pour la TS
		            msg.push(unsafeWindow.g_mapObject.types[type].toString().capitalize());
		            msg.push(" Lvl " + rpt.side0TileLevel)
		            if (parseInt(rpt.side0PlayerId) != 0) {   // IF OWNED, show owner ...
		              msg.push (' [');
		  			  msg.push ('<a onclick=getInfoForAnUser("'+parseInt(rpt.side0PlayerId)+'");>' + escape(playerNames["p" + rpt.side0PlayerId])+'</a>');
		            
		              msg.push ('] ');
		            }
		          } else {
		            if (parseInt(rpt.side0PlayerId) == 0) {   //  barb
		              msg.push(unsafeWindow.g_js_strings.commonstr.barbariancamp);
		              msg.push(" Lvl " + rpt.side0TileLevel)
		            } else {        // city
		              msg.push ('<a onclick=getInfoForAnUser("'+ rpt.side0PlayerId+'");>' + escape(playerNames["p" + rpt.side0PlayerId])+'</a>');
		              
		              msg.push (' - ');
		              msg.push (cityNames['c'+ rpt.side0CityId]);
		            }
		          }
		          
		          msg.push ('&nbsp;<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ rpt.side0XCoord +','+ rpt.side0YCoord +')</a>');
		
		           if (rpt.side0AllianceId!=0 && rpt.side0AllianceId!=myAllianceId){
		            msg.push ('<BR>');
		            msg.push (allianceNames['a'+rpt.side0AllianceId]);
		            msg.push (' (');
		            msg.push (targetDiplomacy);
		            msg.push (')');
		          }
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
		          msg.push(");return false;'><img border=0 src='http://cdn1.iconfinder.com/data/icons/woothemesiconset/16/search_button.png'></a></div></td></tr>");
        	  }
                 msg.push("</tbody></table></div>");
		}
		msg.push("</div><div id='modal_report_list_pagination'></div></div>");
      		t.transportDiv.innerHTML = msg.join("");
    
                if (pageNum) {
	           unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports", pageNum)
	         } else {
	           unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports", 1)
      		}
   		t.transportDiv.innerHTML += "<br><hr><br>NOTE : Ceci est une version de BETA-test.... (pas stable)<br>Si vous rencontrez des pb, merci de revenir sur un autre onglet de Boite a Outils.";
     
           },
           onFailure: function (rslt) {
           },
    }, false);
       
  },
  
  
  
  /************MODULE TRANSPORT *************/
  showTRP : function (){
   var rownum = 0;
   var t = my.TranspAuto;
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
      m.push ('</td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('>&nbsp;</td>');
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
    dt = new Date ();
    dt.setTime (Seed.player.datejoinUnixTime * 1000);
    if (t.state == null) {  
      m = "<DIV class=ptstat>Transporter des marchandises d'une ville a une autre</div>";
      m +="<div id='statpourTr'></div>";
      m += "<TABLE width=100% class=ptTab border=0><TR><TD colspan=2><DIV id=divSTRtop></div></td></tr>\
       <tr align=center><td colspan=2><HR></td></tr>\
       <tr align=center valign=top><td colspan=1 width=50%><b><u>Source</b></u><br><span id=srcptspeedcity></span></td>\
       <td colspan=1 width=50%  rowspan=2><b><u>Destination</b></u><br><span id=desptspeedcity></span><br>\
       Ou des coordonn&eacute;es <br>X: <input type=text size=4 id=typetrpx value=0>&nbsp;Y: <input type=text size=4 id=typetrpy value=0><br><a href='javascript:void();' id='chargelistelieux'>Membres</a> : <select id='listeFavori'></select><br><br><INPUT id='ptttButTransport' type=submit value='Transporter' style='font-weight:bold'>\
       </td></tr>\
       <tr align=center><td colspan=1>Unit&eacute : <select id=typetrp><option selected value='1'>Unite de ravitaillement</option><option selected value='9'>Wagon</option><option value='7'>Cavalerie</option><option value='8'>Cavalerie lourde</option></select>\
       <br>Quantit&eacute; : <input type=text size=6 value='100' id='Choixnbwagon'><input type=button id='trswagmax' value='Max'\><br><i>(la quantit&eacute de ressource est le maximun des unit&eacute;s choisies)</i>\
       <br><b>Type de ressource :</b><br><input type=radio id='ChoixRess0' name='ChoixRess' value='gold'> Or\
       <input type=radio id='ChoixRess1' name='ChoixRess' value='rec1'> Nourriture\
       <input type=radio id='ChoixRess2' name='ChoixRess' value='rec2'> Bois\
       <input type=radio id='ChoixRess3' name='ChoixRess' value='rec3'> Pierre\
       <input type=radio id='ChoixRess4' name='ChoixRess' value='rec4'> Minerais\
       </td></tr>\
       <tr><td colspan=2>Estimation des ressources transport&eacute;es : <span id=BOEstimationR></td></tr>\
       </table>\
       <TABLE align=center width=425 class=ptTab><TR><TD><div id=ptTranportStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>";
    t.transportDiv.innerHTML = m; 
    t.destinationCityx = document.getElementById ('typetrpx');
    t.destinationCityy = document.getElementById ('typetrpy');
    t.listeFavoris = document.getElementById ('listeFavori');
    t.estimationRes = document.getElementById ('BOEstimationR');
    t.chargelistelieux = document.getElementById ('chargelistelieux');
    t.chargelistelieux.addEventListener ('click', t.chercherFavoris, false);
    t.listeFavoris.addEventListener ('change', t.SelectFavoris, false);   
    var dcp1 = new CdispCityPicker ('ptspeed1', document.getElementById('desptspeedcity'), false, t.clickCityDestinationSelect, 1);
    t.TTbutTransport = document.getElementById ('ptttButTransport');
    t.TTbutTransport.addEventListener ('click', t.clickTransportDo, false);
    t.divTranportStatus = document.getElementById ('ptTranportStatus');
    t.statpourTr = document.getElementById ('statpourTr');
    t.typetrp = document.getElementById ('typetrp');
    t.typetrp.addEventListener ('click', t.estimerRes, false); 
    
    t.trswagmax = document.getElementById ('trswagmax');
    t.trswagmax.addEventListener ('click', t.clickUniteMax, false);
    
    t.Choixnbwagon  = document.getElementById ('Choixnbwagon');
    t.Choixnbwagon.addEventListener ('keyup', t.verifierWagons, false);
   
   
     var dcp0 = new CdispCityPicker ('ptspeed0', document.getElementById('srcptspeedcity'), false, t.clickCitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
       

   
   t.state = 1;
    
    }
    
       rows[0]=[];
    
      m = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
         m += '<TD width=81><B>'+ Cities.cities[i].name.substring(0,10) +'</b></td>';
      }
  
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
      
      m += _row ('<img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png>', rows[0]);
      m += _row ('<img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png>', rows[1]);
      m += _row ('<img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png>', rows[2]);
      m += _row ('<img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png>', rows[3]);
      m += _row ('<img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png>', rows[4]);
      
      m += '<TR><TD><BR></td></tr>';
      for (r=1; r<13; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
        }
      }
      m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt1'][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_30.jpg>', rows[1]);
      m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt7'][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_30.jpg>', rows[7]);
      m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt8'][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_30.jpg>', rows[8]);
      m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt9'][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_30.jpg>', rows[9]);
      m += "</table>";
     t.statpourTr.innerHTML = m;
    
    t.displayTimer = setTimeout (t.showTRP, 10000);
  },
  
  SelectFavoris:function() {
   var t = my.TranspAuto;
   if (t.listeFavoris.value!='') {
    var valeur=t.listeFavoris.value;
    var x=valeur.substr(0, valeur.lastIndexOf(','));
    var y=valeur.substr(valeur.lastIndexOf(',')+1, valeur.length);
    //alert(x +' ' + y);
    t.destinationCityx.value = x;
    t.destinationCityy.value = y;
   }
  },
  
  chercherFavoris: function() {
   var t = my.TranspAuto;
   var myA = getMyAlliance ();
   if (myA[0]!=0) {
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.perPage = 100;
      params.allianceId = myA[0];
          new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
	        method: "post",
	        parameters: params,
	        onSuccess: function (rslt) {
	          // on vide la liste
	          //t.listeFavoris.innerHTML=null;
	          if (rslt.ok){
	           var z=0;
	           var m="";
	           for (var i=0; i<rslt.results.length; i++){
     		      p = rslt.results[i];
		      if (p.userId != 0){
		       //alert('ok 2 '+i);
		       for (var c=0; c<p.cities.length; c++){
		         if (Seed.player.name!=p.displayName) {
		          m += "<option value='" + p.cities[c].xCoord + ","+ p.cities[c].yCoord+"'>" + p.displayName + " - Ville " + (c+1) + " - " + p.cities[c].xCoord + "," + p.cities[c].yCoord+"</option>";
		         }
		       }  //fin for cities  	       
		      }   //fin if user 
      	            } //fin for resultat
      	            t.listeFavoris.innerHTML="<option value=''>Selectionner...</option>"+m;
	          }// fin
	        },
	        onFailure: function (rslt) {
	          t.listeFavoris.innerHTML="<option>Erreur</option>";
	        },
    	});
          
       }
       else {
          // Si pas d'alliance !
          t.listeFavoris.innerHTML="<option>Pas d'alliance !</option>";
    	}
      
  },
  /******* transport ****/
  verifierWagons: function() {
   var t = my.TranspAuto;
   var maxw=parseInt(rows[t.typetrp.value][t.sourceCity.idx]);
   var saisw=parseInt(t.Choixnbwagon.value);
   if (saisw > maxw) {
      t.Choixnbwagon.value=maxw;
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>La quantit&eacute; ne peut exc&eacute;der '+maxw+' !.</font>';
   }
   t.estimerRes();
  },
  estimerRes: function() {
   var t = my.TranspAuto;
   var esti = parseInt(unsafeWindow.unitstats['unt'+t.typetrp.value][5] * t.Choixnbwagon.value * (1 + (0.10 * Seed.tech.tch10)));
   t.estimationRes.innerHTML = "<b>" + addCommas(esti) + "</b>"; 
  }, 
  
  clickUniteMax: function() {
    var t = my.TranspAuto;
    var maxw=parseInt(rows[t.typetrp.value][t.sourceCity.idx]);
    
    
    var niveauPointRall=parseInt(getCityBuilding (t.sourceCity.id, 12).maxLevel); // 12=Point de ralliement
    if (niveauPointRall==11) {
       var maxtroupe=150000;
    } else {
       var maxtroupe=niveauPointRall*10000;
    }
    if (maxw>maxtroupe) maxw=maxtroupe;
    
    t.Choixnbwagon.value=maxw;
    t.estimerRes();
  },
  clickTransportDo: function() {   // fonction pour faire le transport
   var t = my.TranspAuto;
   var SourceId = t.sourceCity.id;
   var DestinationId = t.destinationCity.id;
   var cityA=null;
   cityA=ById('citysel_'+ (t.sourceCity.idx + 1));
   nHtml.Click(cityA);
   
   
   if (!$("ChoixRess0").checked && !$("ChoixRess1").checked && !$("ChoixRess2").checked && !$("ChoixRess3").checked && !$("ChoixRess4").checked) {
       t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Merci de cocher un type de ressource !</font>';
      return;
   }
   
   
   if (t.sourceCity.x==t.destinationCityx.value && t.sourceCity.y==t.destinationCityy.value) {
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Impossible sur les memes villes !.</font>';
     return;
   }
   if (parseInt(t.Choixnbwagon.value)=="0") {
   t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Impossible de transporter avec 0 unit&eacute;e... pfff !.</font>';
     return;
   }
   var x=t.destinationCityx.value;
   var y=t.destinationCityy.value;
   if (x == 0 || y == 0) {
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Impossible de transporter sur la destination 0,0 !.</font>';
     return;
   }
   t.TTbutTransport.disabled=true;
   t.divTranportStatus.innerHTML = "Transfert de ta ville "+(t.sourceCity.idx+1)+" vers coordonn&eacute;es ("+x+","+y+") "; 
   
   unsafeWindow.Modal.hideModalAll();

    setTimeout (function (){ // TIMEOUT 0

     document.getElementById('mapXCoor').value = x;
     document.getElementById('mapYCoor').value = y;
     unsafeWindow.reCenterMapWithCoor();
     unsafeWindow.changeview_map(document.getElementById('mod_views_map'));
	 unsafeWindow.modal_attack(1,x,y);
	 
	 // Test sur la case à cocher en haut
	 // permetra d'utiliser les dada
	
	window.setTimeout(function() {  // TIMEOUT 0
	 var caseacohce = ById('modal_attack_supplyfilter_checkbox');
 	 nHtml.Click(caseacohce);
  	 window.setTimeout(function() { // TIMEOUT 1
   	  var nbwagon = ById('modal_attack_unit_ipt'+t.typetrp.value);
	  nbwagon.value = t.Choixnbwagon.value;
	  var evt = document.createEvent("KeyboardEvent");
	  if(evt.initKeyboardEvent) {
			evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  } else {
			evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  }
	  nbwagon.dispatchEvent(evt);
 
    	  
    	  //return false;
	  var ic=0;
	  var ic_ty="gold";
	  var ic_text="d'or";
	  if ($("ChoixRess1").checked) { ic_ty="rec1";ic=1;ic_text="de nourriture"; }
	  if ($("ChoixRess2").checked) { ic_ty="rec2";ic=2;ic_text="de bois"; }
	  if ($("ChoixRess3").checked) { ic_ty="rec3";ic=3;ic_text="de pierre"; }
	  if ($("ChoixRess4").checked) { ic_ty="rec4";ic=4;ic_text="de minerais"; }
	  
	
	  
	  unsafeWindow.modal_attack_update_rec_max(ic);
	  
	  var resource=ById('modal_attack_'+ic_ty);
	  
	  var evt = document.createEvent("KeyboardEvent");
	  if(evt.initKeyboardEvent) {
		evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  } else {
		evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
	  }
	  resource.dispatchEvent(evt);
	  nombrederesss = resource.value;
	  t.divTranportStatus.innerHTML += "de "+nombrederesss+" "+ic_text+""; 
      	  // nouvelle méthode pour le transport
      	  
      	  
	  //return false;
	  
	  
	  ById("modal_attack_knight").selectedIndex=0;
	  
	  window.setTimeout(function() { // TIMEOUT 2
	   //t.divTranportStatus.innerHTML += "<br><b>Arriv&eacute sur "+ x +" "+y +" </b><br><input type=button value='Poster sur le tchat alliance' id='posttrptch'>"; 
	   var caseacohce = ById('deleteAttack');
	   if (caseacohce!=null) {
	    t.divTranportStatus.innerHTML = "<font color=red><b>Impossible, KOC Attack a m&eacute;moris&eacute; une attaque ou un tranport !<br>Merci de l'annuler manuellement.</b></font>";
	    t.TTbutTransport.disabled=false;
	    return false;
	   } else {
	            unsafeWindow.modal_attack_do();
	   	    window.setTimeout(function() {
	   	      t.TTbutTransport.disabled=false;
	   	      t.divTranportStatus.innerHTML +="<br>Effectu&eacute; !";
	   	      //window.setTimeout(function() { t.show2(); },4000); // on force le rafraichissement au bout de 4sec, c'est chiant ! je l'ai viré
		     },800);
	   }
	  }, 1000); // TIMEOUT 2
	 }, 100); // TIMEOUT 1
    },100);
       },100);
    
  },
   clickCitySourceSelect : function (city){
    var t = my.TranspAuto;
    t.sourceCity = city;
    t.TTbutTransport.disabled=false;
     // en cas de changement de ville, faire le test et mettre quantite max
   var maxw=parseInt(rows[t.typetrp.value][t.sourceCity.idx]);
   var saisw=parseInt(t.Choixnbwagon.value);
   if (saisw > maxw)  t.Choixnbwagon.value=maxw;
   setTimeout (function (){ 
     //t.divTranportStatus.innerHTML = "Source :" + city.id + "-" + +" - " +city.selectBut+" <br>";
     var cityA=null;
     cityA=ById('citysel_'+ (city.idx + 1));
     nHtml.Click(cityA);
     
     }, 0);
     t.estimerRes();
   },
   clickCityDestinationSelect : function (city){
    var t = my.TranspAuto;
    t.destinationCity = city;
    t.destinationCityx.value=t.destinationCity.x;
    t.destinationCityy.value=t.destinationCity.y;
    t.TTbutTransport.disabled=false;
   }    
    
}
/*************** WILDS TAB *********************/

var wildNames = {
   0: 'Marais',
  10: 'Prairie',
  11: 'Lac',
  20: 'Bois',
  30: 'Collines',
  40: 'Montagne',
  50: 'Plaine',
};

var mercNames = {
  0: 'Aucun',
  1: 'Novices',
  2: 'Intermediaire',
  3: 'V&eacute;t&eacute;rans',
};

my.Wilds = {
  tabOrder : 35,
  cont : null,
  state : null,
  upGoldTimer : null,
  wildList : [],
  buildList : {},
  
  init : function (){
    var t = my.Wilds;
    t.cont = document.createElement('div');
    unsafeWindow.ptButMaxTraps = t.e_butMaxTraps;
    unsafeWindow.ptInpWildTraps = t.e_inpTraps;
    unsafeWindow.ptButWildSet = t.e_butWildSet;
    unsafeWindow.ptButWildShow = t.show;
    return t.cont;
  },

  getContent : function (){
    var t = my.Wilds;
    return t.cont;
  },

  hide : function (){
    var t = my.Wilds;
    clearTimeout (t.upGoldTimer);
  },
  
  show : function (){
    var t = my.Wilds;
    clearTimeout (t.upGoldTimer);
    if (t.state == null){
      t.cont.innerHTML = '<DIV id=wildContent style="maxheight:665px; height:665px; overflow-y:auto">';
      t.state = 1;
    }
    
    m = '<CENTER>'+ strButton20('RESET', 'id=ptwref') +'</center><TABLE cellspacing=0 cellpadding=0 class=ptTabPad align=center>';
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      t.wildList[c] = [];       
      m += '<TR><TD colspan=20><DIV class=ptstat>'+ city.name +' &nbsp; ('+ city.x +','+ city.y +')</div></td></tr>';
      var row = 0;  
      var sortem = [];

// TEST (no wilds for city #3)
//Seed.wilderness['city'+Cities.cities[3].id] = [];      
      
      var cWilds = Seed.wilderness['city'+city.id];
      if (matTypeof(cWilds) != 'array') {
        m += '<TR style="background-color:white; font-weight:bold;" align=right><TD align=left>Type TS</td><TD></td><TD align=left>Coords</td><TD>Pi&egrave;ges</td><TD align=left>Mercenaires</td>\
         <TD width=15></td><TD colspan=3 class=entry>'+ htmlTitleLine(' CONFIGURATION DES DEFENSES ') +'</td></tr>';
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
          m += '<TR align=right'+ (row++%2?'':' class=ptOddrow') +'><TD align=left><a onclick="citysel_click(document.getElementById(\'citysel_'+ (c+1)+'\'));setTimeout (function (){modal_wilderness_abandon('+wild.tileId+','+ wild.tileLevel +','+wild.tileType+','+ wild.xCoord +','+ wild.yCoord +');setTimeout(function(){ ptButWildShow(this); },4000);},500);return false;"><img src="http://cdn1.iconfinder.com/data/icons/musthave/16/Remove.png" border=0 title="Abandonner la TS"></a>&nbsp;'+ wildNames[wild.tileType] +'</td>\
            <TD>'+ wild.tileLevel +'</td><TD align=center>\
             <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ wild.xCoord +','+ wild.yCoord +')</a></td>\
            <TD align=right><B>'+ wildDef.fort60Count +'</b></td><TD align=center><B>'+ mercNames[wildDef.mercLevel] +'</b></td>\
            <TD></td><TD align=left class=ptentry><B>Ajout Pi&egrave;ges :</b> <INPUT onchange="ptInpWildTraps(this)" id=ptwt_'+ c +'_'+ i 
              + (maxBuild==0?' DISABLED ':'')+' style="margin:0px; padding:0px" type=text size=3 maxlength=4></td>'
          if (wildDef.fort60Count < maxTraps)
            m += '<TD class=ptentry style="padding:0px">'+ strButton14('Max', 'id=ptwx_'+ c +'_'+ i +' onclick="ptButMaxTraps(this)"') +'</td>';
          else
            m += '<TD class=ptentry></td>';
          m += '<TD class=ptentry> &nbsp; &nbsp; <B>Mercs:</b> ' + htmlSelector(mercNames, wildDef.mercLevel, 'id=ptwm_'+ c +'_'+ i) +' &nbsp; &nbsp; </td></tr>';
        }
        m += '<TR><TD colspan=6></td><TD class=ptentry align=center colspan=3><TABLE><TR><TD width=40% align=left>Co&ucirc;t Or : <SPAN id=ptwgc_'+ c +'>0</span></td>\
            <TD width=10%>'+ strButton20("METTRE A JOUR", 'onclick="ptButWildSet('+ c +')"') +'<TD width=40% align=right>Or dispo : <SPAN id=ptwgt_'+ c +'>0</span></td></td></tr></table></td></tr>';
      } else {
        m+= '<TR><TD colspan=9> &nbsp; </td></tr>';
      }         
    }
    document.getElementById('wildContent').innerHTML = m + '</table></div>';
    document.getElementById('ptwref').addEventListener ('click', t.show, false);
    t.updateGold ();
  },
    
  e_butWildSet : function (c){
    var t = my.Wilds;
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
    popDiv.innerHTML = '<TABLE class=ptTab width=100% height=100%><TR><TD>\
          <DIV class=ptstat>Configuration des d&eacute;fences des terres sauvages (TS)</div>\
          <DIV id=ptWildBuildDiv class=ptDiv style="padding:10px; height:225px; max-height:225px; overflow-y:auto"></div>\
          </td></tr><TR><TD align=center>'+ strButton20('ANNULER', 'id=ptWildCancel') +'</td></tr></table>';
    document.getElementById('ptWildCancel').addEventListener('click', t.e_buildCancel, false);
    t.processQue(null);  
  },
  
  e_buildCancel : function (){
    var t = my.Wilds;
    t.setCurtain(false);
    t.setPopup(false);
    t.show();
  },
  
  processQue : function (errMsg){
    var t = my.Wilds;
    var what = t.buildList.list.shift();
    var div = document.getElementById('ptWildBuildDiv');
    if (what==null || errMsg){
      if (errMsg)
        div.innerHTML += '<BR><SPAN style="white-space:normal;" class=boldRed>ERREUR : '+ errMsg +'</span>';
      else
        div.innerHTML += 'Effectu&eacute;e.<BR>';
      document.getElementById('ptWildCancel').firstChild.innerHTML = 'FERMER'; 
      return;
    }
    if (div.innerHTML != '')
      div.innerHTML += 'Effectu&eacute;e.<BR>';
    var wild = Seed.wilderness['city'+ t.buildList.cityId]['t'+what[1]];
    if (what[0] == 'T'){
      div.innerHTML += 'Construction de '+ what[2] +' pi&egrave;ges sur '+ Cities.byID[t.buildList.cityId].name +'\' sur Terres au '+ wild.xCoord +','+ wild.yCoord +' ... ';
      t.postBuyTraps (t.buildList.cityId, what[1], what[2], t.processQue);
    } else {
      div.innerHTML += 'Configure Mercenaires -'+ mercNames[what[2]] +'- sur '+ Cities.byID[t.buildList.cityId].name +'\' sur Terres au '+ wild.xCoord +','+ wild.yCoord +' ... ';
      t.postHireMercs (t.buildList.cityId, what[1], what[2], what[3], t.processQue);
    }
  },
  
  setPopup : function (onoff){
    var t = my.Wilds;
    if (onoff){
      var div = document.createElement('div');
      div.id = 'ptWildPop';
      div.style.backgroundColor = '#fff';
      div.style.zindex = mainPop.getZindex()+2;
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
    var t = my.Wilds;
    if (onoff){
      var off = getAbsoluteOffsets (t.cont);
      var curtain = document.createElement('div');
      curtain.id = 'ptWildCurtain';
      curtain.style.zindex = mainPop.getZindex()+1;
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
    var t = my.Wilds;
    var c = e.id.substr(5,1);
    var w = e.id.substr(7);
    var inp = document.getElementById('ptwt_'+ c +'_'+ w);
    inp.value = t.wildList[c][w][1];
    t.e_inpTraps (inp);
  },
  
  e_inpTraps : function (e){
    var t = my.Wilds;
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
    var t = my.Wilds;
    for (var c=0; c<Cities.numCities; c++){
      var e = document.getElementById('ptwgt_'+ c +'');
      if (e)
        e.innerHTML = addCommasInt(Seed.citystats['city'+Cities.cities[c].id].gold[0]);
    }
    t.upGoldTimer = setTimeout (t.updateGold, 5000);
  },
  
  postBuyTraps : function (cid, tid, quant, notify){
    var params = Object.clone(unsafeWindow.g_ajaxparams);
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
 
   
/*************** KNIGHTS TAB *********************/
my.Knights = {
  cont : null,
  state : null,
  displayTimer : null,

  init : function (){
    var t = my.Knights;
    t.cont = document.createElement('div');
    unsafeWindow.ptAssignSkill = t.clickedAssignPoints;
    return t.cont;
  },

  getContent : function (){
    var t = my.Knights;
    return t.cont;
  },

  hide : function (){
    var t = my.Knights;
    clearTimeout (t.displayTimer);
  },

  show : function (){
    var t = my.Knights;
    clearTimeout (t.displayTimer);
 
    if (t.state == null){
      t.cont.innerHTML = '<STYLE>table.ptTabPad tr.ptwpad {background-color:#ffffff; padding-left:5px}</style>\
            <DIV id=ptknightdiv style="max-height:660px; height:660px; overflow-y:auto">';
      t.state = 1;
    }
    
    function _dispKnight (roleId, knight, numcid){
      var rid = roleId;
      if (roleId==null)
        rid = 1;
      var sty='';  
      if (row++ % 2)
        sty = 'class=ptOddrow ';        
      m = '<TR '+ sty +'valign=top align=right><TD><B>'+ (roleId==null ? '':knightRoles[rid][0]) +'</b></td><TD align=left>';
      if (knight == null) {
        m += '--------</td><TD colspan=5></td><TD class=ptentry colspan=5></td><TD colspan=2></td></tr>';
      } else {
        var level = parseInt(Math.sqrt(parseInt(knight.experience) / 75)) + 1;
        var unpoints = level - parseInt(knight.skillPointsApplied);
        var salary = (parseInt(knight.skillPointsApplied) + 1) * 20;
        totSalary += salary;
        var ass = '';
        if (knight.knightStatus == 10){
          ass = '<TD class=ptentry align=left colspan=4>Marchant</td>';
        } else {  
          if (unpoints > 0){
            unpoints = '<SPAN class="boldRed">'+ unpoints +'</span>';
            for (var i=0; i<4; i++){
            var sty = 'padding-left:1px;';
            if (i == rid)   // bold it
              sty += 'font-weight:bold;color:#116654';
            ass += '<TD class=ptentry align=left style="'+ sty +'" ><A style="'+ sty +'" onclick="ptAssignSkill(this,' + cid +','+ knight.knightId +','+ i +')">['+ knightRoles[i][2] +'] &nbsp;</a></td>'; 
           }
          } 
          else
            ass = '<TD class=ptentry colspan=4></td>';
        }  
        var skills = [];
        for (var i=0; i<4; i++){
          if (i == rid)
            skills[i] = '<B>'+ knight[knightRoles[i][1]] +'</b>'; 
          else
            skills[i] = knight[knightRoles[i][1]]; 
        }          
        m += '<a title="Assigner un role" onclick="citysel_click(document.getElementById(\'citysel_'+ (numcid+1)+'\'));setTimeout (function (){ assign_role_modal('+ knight.knightId +');return false;}, 500);">' + knight.knightName + '</a></td><TD><a title="Augmenter EXP" onclick="citysel_click(document.getElementById(\'citysel_'+ (numcid+1)+'\'));setTimeout (function (){  xpBoost_modal('+ knight.knightId +');return false; }, 500);" href="javascript:void(0)">'+ level +'</a></td><TD>'+ skills[0] +'</td><TD>'+ skills[1] +'</td><TD>'+ skills[2] +'</td><TD>' + skills[3]
          +'</td><TD class=ptentry>'+ unpoints +'</td>'+ ass +'<td><a onclick="citysel_click(document.getElementById(\'citysel_'+ (numcid+1)+'\'));setTimeout (function (){ loyalBoost_modal('+ knight.knightId +');return false;}, 500);">'+knight.loyalty+'</a></td><TD>'+ addCommas(salary) +'</td></tr>';
      }
      return m;
    }          
    
    var totSalary = 0;
    var m = '<TABLE cellspacing=0 align=center class=ptTabPad><TBODY>';
    for (var c=0; c<Cities.numCities; c++) {
      var cid = Cities.cities[c].id;
      m += '<TR><TD colspan=14><DIV class=ptstat>'+ Cities.cities[c].name +'</div></td></tr>\
          <TR class=ptwpad style="font-weight:bold" align=right><TD width=70>Role</td><TD width=155 align=center>Nom</td><TD width=22>Niv</td><TD width=25>Pol</td><TD width=25>Com</td>\
          <TD width=25>Int</td><TD width=25>Res</td><TD width=75 align=center colspan=5>--- non attribu&eacute; ---</td><td witdh=25>Loy</td><TD width=40 align=right> Salaire </td></tr>';
      totSalary = 0;
      var did = {}; 
      var row = 0;
      for (var i=0; i<knightRoles.length; i++){
        var leader = Seed.leaders['city'+cid][knightRoles[i][1]+'KnightId'];
        if (leader == 0)
          m += _dispKnight (i, null, c);
        else {
          m += _dispKnight (i, Seed.knights['city'+cid]['knt'+leader], c);
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
        m += _dispKnight (null, list[i], c);
       m += '<TR align=right><TD colspan=11><B>Salaire Total :</b></td><TD>'+ addCommas(totSalary) +'</td></tr>';        
    }
    document.getElementById('ptknightdiv').innerHTML = m +'</tbody></table></div>';
     t.displayTimer = setTimeout (t.show, 10000);
  },


  clickedAssignPoints : function (e, cid, kid, rid){
    var t = my.Knights;
    clearTimeout (t.displayTimer);
      
    var knight = Seed.knights['city'+cid]['knt'+kid];
    if (knight.knightStatus == 10){
      var row = e.parentNode.parentNode;
      row.childNodes[7].innerHTML = 'Marchant';
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
    div.innerHTML = 'Assignation de '+ unassigned +' comp&eacute;tence(s) '+ knightRoles[rid][1] +' ... ';
    t.postSkillPoints (cid, kid, sk[0], sk[1], sk[2], sk[3], function (r){t.postDone(r, div)});  
  },
  
  postDone : function (rslt, div){
    var t = my.Knights;
    clearTimeout (t.displayTimer);
    if (rslt.ok){
      div.innerHTML += '<B>Effectu&eacute;e.</b>';
      t.displayTimer = setTimeout (t.show, 5000);
    } else {
      div.innerHTML += '<BR><SPAN class=boldRed>ERREUR : '+ rslt.errorMsg +'</span>';
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
    var but = makeButton20('Transferer');
    div.appendChild (but);
    but.addEventListener ('click', messageNav.eventForward, false);
    div = document.getElementById('modal_msg_write_to').parentNode;
    div.innerHTML = '<TABLE><TR><TD class=xtab><b>A :</b> <INPUT type=text id=modal_msg_write_to></td>\
    <TD class=xtab><SPAN id=ptfwdbut></span></td></tr>\
    <tr><td></td><td></td></tr></table>\
    <table><tr><TD colspan=2><SPAN id=pt2fwdbut></span></td></tr></table>';
    var button = makeButton20('Tous les Leaders');
    document.getElementById('ptfwdbut').appendChild (button);
    button.addEventListener ('click', function (){document.getElementById("modal_msg_write_to").value = "<officiers>"}, false);
    document.getElementById('pt2fwdbut').innerHTML="Cc : <INPUT type=text id=message_cc> (Mettre un ; pour ajouter un second destinataire)"; 
    // Ajout liste déroulante avec nom des Vice-chanceliers
    
  
  },

  eventForward : function (){
    document.getElementById('modal_msg_write_subj').value = "TR: " + document.getElementById('modal_msg_view_subj').innerHTML.toString().stripTags();
    document.getElementById('modal_msg_write_to').value = '';
    var from = document.getElementById('modal_msg_view_from').children[0].innerHTML;
    var body = document.getElementById('modal_msg_view_body').innerHTML.replace(/\n/g, '').replace(/<br>/gi, '\n').stripTags().replace (/back$/i, '');
    document.getElementById('modal_msg_write_txt').value = '[Message original de '+ from +']\n'+ body;
    unsafeWindow.modal_messages_compose();
  },

  msgSendHook : function (){
      if (!Options.enhanceMsging)
      return;
    var to = document.getElementById("modal_msg_write_to").value.trim();

      var chaine = document.getElementById("message_cc").value;
      var tableau = chaine.split(";")
      if (tableau.length==0) tableau[0]=chaine;
      for (var i = 0; i < tableau.length; i++) {
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.emailTo = tableau[i] ;
        params.subject = "CC: "+document.getElementById("modal_msg_write_subj").value;
        params.message = document.getElementById("modal_msg_write_txt").value;
        params.requestType	 = 'COMPOSED_MAIL';
        new Ajax.Request(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
         method: "post",
         parameters: params,
         onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
              if (rslt.ok) {
              document.getElementById('message_cc').value = "";
                //unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.msgsent + ' a '  + tableau[i]);
              }
         },         
       });
      }  
    if (to.toLowerCase() != '<officiers>' || getMyAlliance()[0]==0) {  
      return false;
    }  
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.toIds = getMyAlliance()[0];
    params.subject = document.getElementById("modal_msg_write_subj").value +'';
    params.message = document.getElementById("modal_msg_write_txt").value;
    params.type = 'alliance';
    new Ajax.Request(unsafeWindow.g_ajaxpath + "ajax/sendMessage.php" + unsafeWindow.g_ajaxsuffix, {
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
        displayReports (rslt.arReports, rslt.arPlayerNames, rslt.arAllianceNames, rslt.arCityNames, rslt.totalPages);
      },
      onFailure: function (rslt) {
      },
    }, false);

    function displayReports (ar, playerNames, allianceNames, cityNames, totalPages){
      var msg = new Array();
      var myAllianceId = getMyAlliance()[0];
      msg.push ("<STYLE>.msgviewtable tbody .myCol div {margin-left:5px; overflow:hidden; white-space:nowrap; color:#000}\
            .msgviewtable tbody .myHostile div {font-weight:600; color:#600}\
            .msgviewtable tbody .myGray div {color:#666}\
            .msgviewtable tbody .myRein div {color:#050}\
            .msgviewtable tbody .myWarn div {font-weight:600; color:#442200}\
            </style>");
      msg.push("<div class='modal_msg_reports'><a href='javascript:void(0);' id=clickclick onclick='allianceReports();'><img src='http://cdn1.iconfinder.com/data/icons/momenticons-gloss-basic/momenticons-gloss-basic/16/arrow-refresh.png'> Actualiser</a>");
      var rptkeys = unsafeWindow.Object.keys(ar);
      //alert(rptkeys.length);
      
      if (matTypeof(ar) != 'array') {
        if (Options.allowAlterAR)
          msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        else
          msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        msg.push("<thead><tr><td width=105>Date</td><td width=40>Type</td><td width=150>Attaquant</td><td>Cible</td><td>Voir</td><td colspan=2>Dist. ville</tr></thead><tbody>");
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

          msg.push ('<tr valign=top');
          if (i%2 == 0)
            msg.push(" class=stripe");
          msg.push("><TD class="+ colClass +"><div>");
          msg.push(unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime));
          msg.push ('<BR>Rpt #');
          msg.push (rpt.reportId); 
          msg.push("</div></td><TD class="+ colClass  +"><div>");
          //rpt.marchType = parseInt(rpt.marchType);
          if (rpt.marchType == 1)
            msg.push (unsafeWindow.g_js_strings.commonstr.transport);
          else if (rpt.marchType == 3)
            msg.push (unsafeWindow.g_js_strings.commonstr.scout);
          else if (rpt.marchType == 2)
            msg.push ('Renf');
          else
            msg.push (unsafeWindow.g_js_strings.commonstr.attack);

          // attacker ...
          msg.push ("</div></td><TD class="+ colClass +"><div>");
          if (parseInt(rpt.side1PlayerId) != 0)
            msg.push('<a onclick=getInfoForAnUser("'+parseInt(rpt.side1PlayerId)+'");>'+escape(playerNames["p" + rpt.side1PlayerId])+"</a>");
          else
          msg.push ('?Unknown?');
          msg.push ('&nbsp;<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ rpt.side1XCoord +','+ rpt.side1YCoord +')</a><bR>');
          if (rpt.side1AllianceId != myAllianceId){
            msg.push (allianceNames['a'+rpt.side1AllianceId]);
            msg.push (' (');
            msg.push (getDiplomacy(rpt.side1AllianceId));
            msg.push (')');
          } else {
            msg.push ('<BR>');
          }
          msg.push ('</div></td>');

          // cible ...
          msg.push ("<TD class="+ colClass  +"><DIV>");
          var type = parseInt(rpt.side0TileType);

          if (type < 50){                              // pour la TS
            msg.push(unsafeWindow.g_mapObject.types[type].toString().capitalize());
            msg.push(" Lvl " + rpt.side0TileLevel)
            if (parseInt(rpt.side0PlayerId) != 0) {   // IF OWNED, show owner ...
              msg.push (' [');
  			  msg.push ('<a @onclick=getInfoForAnUser("'+parseInt(rpt.side0PlayerId)+'");>' + escape(playerNames["p" + rpt.side0PlayerId])+'</a>');
            
              msg.push ('] ');
            }
          } else {
            if (parseInt(rpt.side0PlayerId) == 0) {   //  barb
              msg.push(unsafeWindow.g_js_strings.commonstr.barbariancamp);
              msg.push(" Lvl " + rpt.side0TileLevel)
            } else {        // city
              msg.push ('<a onclick=getInfoForAnUser("'+ rpt.side0PlayerId+'");>' + escape(playerNames["p" + rpt.side0PlayerId])+'</a>');
              
              msg.push (' - ');
              msg.push (cityNames['c'+ rpt.side0CityId]);
            }
          }
          
          msg.push ('&nbsp;<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ rpt.side0XCoord +','+ rpt.side0YCoord +')</a>');

           if (rpt.side0AllianceId!=0 && rpt.side0AllianceId!=myAllianceId){
            msg.push ('<BR>');
            msg.push (allianceNames['a'+rpt.side0AllianceId]);
            msg.push (' (');
            msg.push (targetDiplomacy);
            msg.push (')');
          }

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
          msg.push(");return false;'><img border=0 src='http://cdn1.iconfinder.com/data/icons/woothemesiconset/16/search_button.png'></a></div></td></tr>");
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
    if (Options.enableFoodWarnTchat)  {
      for(i=0; i < Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var foodleft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600;
        var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row[i] = rp[1] - usage;
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
          var msg = '';
          if (timeLeft<0){
           }
          else if (timeLeft<(Options.foodWarnHours*3600)) {
                msg += 'Ma ville  ' + Cities.cities[i].name.substring(0,10) + '  ' +
                       Cities.cities[i].x +','+ Cities.cities[i].y + ' ';
                msg += ' possede un niveau bas en nourriture. Restant en stock : '+addCommasWhole(foodleft).replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ')+' ('+timestrShort(timeLeft)+') Production : '+addCommas(usage).replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ')+'/h';
                sendChat ("/a " + msg);
          }
      }  
    f.minuteTimer = setTimeout (f.e_eachMinute, 600000);
   }
  },  
}


/************************ Tower Alerts ************************/
var TowerAlerts = {
  viewImpendingFunc : null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  towerMarches : {},    // track all marches that have been posted to alliance chat
  
  init : function (){
    var t = TowerAlerts; 
    var s = GM_getValue ('towerMarches_'+getServerId());
    if (s != null)
      t.towerMarches = JSON2.parse (s);

    t.viewImpendingFunc = new CalterUwFunc ('attack_viewimpending_view', [[/Modal.showModal\((.*)\)/im, 'Modal.showModal\($1\); ptViewImpending_hook(a);']]);
    unsafeWindow.ptViewImpending_hook = t.viewImpending_hook;
    t.viewImpendingFunc.setEnable (true);
    
    t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
    unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;
  },
    // fix 'target', add button  
   viewImpending_hook : function (atkinc){    
      var t = TowerAlerts;  
      var div = document.getElementById('modal_attackimpending_view');
      var isFalse = false;
      if (t.fixTargetEnabled){ 
        var city = Cities.byID[atkinc.toCityId];
        var target = '';
        if (!city || (atkinc.marchType!=3 && atkinc.marchType!=4)){  
          target = '<B>FALSE REPORT!</b>';
          isFalse = true;
        } else if (city.tileId == atkinc.toTileId){
          target = city.name + ' ('+ city.x + ','+ city.y +')';
        } else {
          wilds = Seed.wilderness['city'+atkinc.toCityId];
          m = '';
          for (k in wilds){
            if (wilds[k].tileId == atkinc.toTileId){
              m = 'at '+ wilds[k].xCoord + ','+ wilds[k].yCoord;
              break;
            }
          }
          target = city.name + ', <B>TS '+ m +'</b>';
        }
        div.childNodes[0].innerHTML = '<B>Cible : </b>'+ target;
      }
      /*if (!isFalse){
        var d = document.createElement ('div');
        d.innerHTML = '<BR><TABLE><TR><TD><a id=towerPostToChat class=button20><span>Poster sur le tchat alliance</span></a></td></tr></table>';
        div.appendChild (d);
        document.getElementById('towerPostToChat').addEventListener('click', function (){t.e_buttonPostToChat(atkinc)}, false);
      }*/
  },
   // fix false reports  
    generateIncoming_hook : function (){    
      return false;
    },
    
    enableFixFalseReports : function (tf){
      var t = TowerAlerts;  
      t.generateIncomingFunc.setEnable (tf);
    },
    enableFixTarget : function (tf){
      var t = TowerAlerts;  
      t.fixTargetEnabled = tf;
    },
    
    isFixTargetAvailable : function (){
      var t = TowerAlerts;  
      return t.viewImpendingFunc.isAvailable();
    },
    isFixFalseReportsAvailable : function (){
      var t = TowerAlerts;  
      return t.generateIncomingFunc.isAvailable();
  },
  
  postToChatOptions : {aChat:false},
  secondTimer : null,
  
 e_buttonPostToChat : function (march){
    var t = TowerAlerts;
    t.postToChat (march, true);
    unsafeWindow.Modal.hideModal();
  },
  
  setPostToChatOptions : function (obj){
    var t = TowerAlerts;
    t.postToChatOptions = obj;
    clearTimeout(t.secondTimer);  
    if (obj.aChat)
		t.e_eachSecond();
	//DD two lines deleted
  },
    
  addTowerMarch : function (m){
    var t = TowerAlerts;
    var now = unixTime();
    for (k in t.towerMarches){
      if (t.towerMarches[k].arrival < now)
        delete t.towerMarches[k];
    }
    t.towerMarches['m'+m.mid] = {added:now, arrival:parseIntNan(m.arrivalTime) };
    GM_setValue ('towerMarches_'+getServerId(), JSON2.stringify(t.towerMarches) );
  },
  
  getTowerMarch : function (mid){ // ID only (no 'm')
    var t = TowerAlerts;
    return t.towerMarches['m'+mid];
  },

  e_eachSecond : function (){   // check for incoming marches
    var t = TowerAlerts;
	var now = unixTime();
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (var k in Seed.queue_atkinc){
        var m = Seed.queue_atkinc[k]; 
        if ((m.marchType==3 || m.marchType==4) && parseIntNan(m.arrivalTime)>now && t.getTowerMarch(m.mid)==null){
          t.addTowerMarch (m);
          t.postToChat (m, false);
        }
      }
    }
    t.secondTimer = setTimeout (t.e_eachSecond, 2000);
  },
  

	postToChat: function(m, force){
		var t = TowerAlerts;
		//var postOptions = Options.alertConfig;
		var postOptions = t.postToChatOptions;
		var troopsnames = ['Rav', 'Mil', 'Ecl', 'Piq', 'Pal', 'Arc', 'Cav', 'Lou', 'Wagon', 'Bali', 'Bel', 'Cat'];
		var tot = [];

		for (i = 0; i < 13; i++) 
			tot[i] = 0;

		if (DEBUG_TRACE) {
			logit("checkTower(): INCOMING at " + unixTime() + ": \n" + inspect(m, 8, 1));
		}	
		if (m.marchType == null) {// bogus march (returning scouts)
			if (DEBUG_TRACE) {
			logit("checkTower(): m.marchType == null");
			}	
			return;
		}	

		
		if (m.marchType == 3) {
			if (!postOptions.scouting && !force) 
				return;
			atkType = 'ECLAIREUR';
			if (DEBUG_TRACE) {
			logit("checkTower(): scout");
			}	
		}
		else {
			if (m.marchType == 4) {
				atkType = 'ATTAQUE';
				if (DEBUG_TRACE) {
				logit("checkTower(): attack");
				}
			}
			else {
				if (DEBUG_TRACE) {
				logit("checkTower(): unkown march typ");
				}
				return;
			}
		}
		
		if (DEBUG_TRACE) {
			logit("checkTower(): after typ");
		}	
		var target, atkType, who;
		var city = Cities.byID[m.toCityId];
		if (city.tileId == m.toTileId) 
			target = 'VILLE ' + city.name + ' ' + city.x + ',' + city.y+' ';
		else {
			if (!postOptions.wilds && !force) 
				return;
			target = 'TS';
			for (k in Seed.wilderness['city' + m.toCityId]) {
				if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
					target += ' ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord+' ';
					break;
				}
			}
		}
		
		
		var attackermight = '';
		var allianceId = '';
		
		if (Seed.players['u' + m.pid]) {
			who = Seed.players['u' + m.pid].n;
			attackermight = parseInt(Seed.players['u' + m.pid].m);
            allianceId = Seed.players['u' + m.pid].a;
		} else {
			if (m.players && m.players['u' + m.pid]) {
				who = m.players['u' + m.pid].n;
				attackermight = parseInt(m.players['u' + m.pid].m);
                allianceId = m.players['u' + m.pid].a;
			} else {
				who = 'Inconnu';
			}
		}
		
		if (m.fromXCoord) 
			who += ' sur ' + m.fromXCoord + ',' + m.fromYCoord;
			
		var diplomacy = getDiplomacy(allianceId);

		
		var arrivingDatetime = new Date();
		arrivingDatetime.setTime(m.arrivalTime * 1000);
		
		if (DEBUG_TRACE) {
			logit("checkTower(): Before Messagecreate");
		}
		/** ** message ** */
		var msg = '';
		var subject = '';
		msg = '';
		if (!force) 
		  msg = postOptions.aPrefix + ' ';
		
		//msg += 'My HQ: ' + postOptions.hq + '. ';
		msg += 'Type : ' + atkType + '. ';
		msg += 'Cible : ' + target + '. ';
		msg += 'Attaquant : ' + who + ' (' + addCommas(attackermight).replace(',',' ').replace(',',' ') + ', ' + diplomacy + ').';
		
		msg +=' ** ARRIVEE ** : ';
		var totTroops = 0;
		for (k in m.unts) {
			var uid = parseInt(k.substr(1));
			msg += m.unts[k] + ' ' + unsafeWindow.unitcost['unt' + uid][0] + ', ';
			totTroops += m.unts[k];
		}
		
		if ((totTroops < postOptions.minTroops) && !force) 
			return;
		
		msg = msg.slice(0, -2);
		msg += ' (arrive dans ' + unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) + ' -> ' + arrivingDatetime +').' ;
		
		/** ** Embassy** **/
		if (city.tileId == m.toTileId) {
			var emb = getCityBuilding(m.toCityId, 8);
			if (emb.count > 0) {
				var availSlots = emb.maxLevel;
				for (k in Seed.queue_atkinc) {
					if (Seed.queue_atkinc[k].marchType == 2 && Cities.byID[Seed.queue_atkinc[k].fromCityId] == null) {
						--availSlots;
					}
				}
				msg += ' Mon ambassade (' + availSlots + '/' + emb.maxLevel + ')';
				
				if (DEBUG_TRACE) {
					logit("checkTower(): Mesage Part1:"+msg);
				}
				var msgpart1 = msg;
				msg ='';
				if (DEBUG_TRACE) {
					logit("checkTower(): in Embassy: "+postOptions.embassy);
				   }
				if (postOptions.embassy) {
					var rownum = 0;
					enc = {};
					numSlots = 0;

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
								s = [];
								s[0] = parseInt(march.knightCombat);
								for (i = 1; i < 13; i++) {
									if (Options.encRemaining) 
										s[i] = parseInt(march['unit' + i + 'Return']);
									else 
										s[i] = parseInt(march['unit' + i + 'Count']);
								}
								enc[city][from].push(s);
							}
						}
					}
					
										
					dest = m.toCityId;
					var embassyOccupied = false;
				
					if (enc[dest]) {
						embassyOccupied = true;
						msg += ' ** EMBASSADE **: ';
						if (DEBUG_TRACE) {
																logit("checkTower(): msg: "+msg);
				   		}
						for (p in enc[dest]) {
							try {
								if (Seed.players['u' +p]) {
									player = Seed.players['u' + p].n;
								} else {
									if (m.players && m.players['u' + p]) {
										player = m.players['u' + p].n;
									} else {
										player = 'Unknown';
									}
								}

							} 
							catch (err) {
								player = '???';
							}
							for (j = 0; j < enc[dest][p].length; j++) {
								knight = '';
								if (enc[dest][p][j][0] > 0) 
									knight = ' (' + enc[dest][p][j][0] + ')';
								var slot = j + 1;
								msg += '[slot' + slot + ': ' + player + knight + '->';
								for (i = 1; i < 13; i++) {
									num = enc[dest][p][j][i];
									if (num > 0) 
										msg += '' + addCommas(num).replace(',',' ').replace(',',' ') + ' ' + troopsnames[i - 1] + ', ';
									tot[i] += num;
								}
								msg += ']';
							}//for (j=0; j<enc[dest][p].length; j++)
						}//for (p in enc[dest])
					}//if (enc[dest])
					
				}// if (postOptions.embassy)
			}//if (emb.count > 0)
		}// if ( city.tileId == m.toTileId )
		/** ****Embassy End *** */
		
		if (DEBUG_TRACE) {
			logit("checkTower(): Mesage Part2:" + msg);
		}
		var msgpart2 = msg;
		msg ='';
		
		/** ** My Troops ** */
		if (postOptions.mytroops) {
		msg += ' ** TROUPES ** : ';
		cityID = 'city' + m.toCityId;
		
		for (r = 1; r < 13; r++) {
			num = parseInt(Seed.units[cityID]['unt' + r]);
			tot[r] += num;
			if (num > 0) 
				msg += '' + addCommas(num).replace(',',' ').replace(',',' ') + ' ' + troopsnames[r - 1] + ', ';
		}
		msg += '.';
		}
		if (DEBUG_TRACE) {
			logit("checkTower(): Mesage Part3:"+msg);
		}
		var msgpart3 = msg;
		msg ='';  
		/** ** My Troops:End ** */
		
		/** ** Total Troops ** */
		if (embassyOccupied) {
			msg += ' ** TOTAL ** : ';
			for (r = 1; r < 13; r++) {
				num = parseInt(tot[r]);
				if (num > 0) 
					msg += '' + addCommas(num).replace(',',' ').replace(',',' ') + ' ' + troopsnames[r - 1] + ', ';
			}
			msg += '.';
		}
		var msgpart4 = msg;
		if (DEBUG_TRACE) {
			logit("checkTower(): Mesage Part4:"+msg);
		}
		msg='';
		/** ** Total Troops:End ** */
		
		// Food usage
		if (postOptions.food) {
			var rp = getResourceProduction (m.toCityId);
      		var usage = parseInt(Seed.resources["city" + m.toCityId]['rec1'][3]);
      		var foodIncome = rp[1] - usage;

			var food = parseInt(Seed.resources['city'+ m.toCityId]['rec'+1][0] / 3600);
			var timeLeft = parseInt(Seed.resources["city" + m.toCityId]['rec1'][0]) / 3600 / (0-foodIncome) * 3600;
			var timeLeftShort  = timestrShort(timeLeft);
			
			msg += ' ** NOURRITURE **:';
			msg += ' '+addCommas(food).replace(',',' ').replace(',',' ').replace(',',' ') + ' (' +addCommas(foodIncome).replace(',',' ').replace(',',' ').replace(',',' ')+') -> Temps Restant : '+timeLeftShort+'. ';
		}
		var msgpart5 =msg;
		if (DEBUG_TRACE) {
			logit("checkTower(): Mesage Part5:"+msg);
		}
		msg ='';
		// My Defense
		if (Options.alertConfig.defense) {
			msg += ' ** DEFENSE **:';
			var fortifications = [];
			var fortificationsVal = [];
			
		fortifications['53'] = 'Arbalet';
          	fortifications['55'] = 'Trebuchet';
          	fortifications['60'] = 'Piege';
          	fortifications['61'] = 'Chausse';
          	fortifications['62'] = 'Palissa';
          	
          	for (id in fortifications) {
          			if (IsNumeric(id)) {
      					var fortiName = fortifications[id];
     					var fortiVal = parseInt(Seed.fortifications['city' + m.toCityId]['fort'+id]);
     					msg += fortiVal +' '+fortiName+', ';  
          			} 
   			}
   		}
		var msgpart6 =msg;
		msg ='';
		
		//Spares
		var msgpart7 =msg;
		msg ='';
		var msgpart8 =msg;
		msg ='';
		
		//build message together;
		msg = msgpart1 + msgpart2 + msgpart3 + msgpart4 + msgpart5 + msgpart6 + msgpart7 + msgpart8;
		if (DEBUG_TRACE) {
			logit("checkTower(): full Mesage:"+msg);
		}
		
				
		if (postOptions.sendasWhisper) {
			if (DEBUG_TRACE) {
			logit("checkTower(): postOptions.sendasWhisper:"+"/" + Seed.player.name + ' ' + msg);
			}
			sendChat("/" + Seed.player.name + ' ' + msg); // Whisper to myself
		}
		
		if (postOptions.sendtoAlly) {
			sendChat("/a " + msg); // Alliance chat
		}
		
		//EMAIL		
		if (postOptions.sendEmail) {
			var subject = target + ' est en train ' + atkType + ' par ' + who + ' dans '+ arrivingDatetime;
			var token = postOptions.token;
			var email = postOptions.emailAddress;
			var error = false;
			
			/*if (token=="") { 
				error = true;
				if (DEBUG_TRACE) logit("TowerAlert: error: no token ");
			}*/
			if (email=="") { 
				error = true;
				if (DEBUG_TRACE) logit("TowerAlert: error: no email ");
			}
			if (subject=="") { 
				error = true;
				if (DEBUG_TRACE) logit("TowerAlert: error: no subject ");
			}
			if (msgpart1=="") { 
				error = true;
				if (DEBUG_TRACE) logit("TowerAlert: error: no msgpart1 ");
			}
			
			if (!error) {
				sendEmail(Seed.player.name, token, email, subject, msgpart1, msgpart2, msgpart3, msgpart4, msgpart5, msgpart6, msgpart7, msgpart8);
				if (DEBUG_TRACE) logit("TowerAlert: Email was sent ");
				var msgnotify = "Email envoye";
				sendChat("/" + Seed.player.name + ' ' + msgnotify); // Whisper to myself
			}
			
	    }
		
	}, // postToChat
} //TowerAlerts




/**
* SendEmail
*/
function sendEmail (username, token, email, subject, msgpart1, msgpart2, msgpart3, msgpart4, msgpart5, msgpart6, msgpart7, msgpart8){  
    if (DEBUG_TRACE) logit ("sendEmail(): entry ");

	var params = 'user:'+username;		
	var query = "?user="+username+"&token="+token+"&email="+email+"&subject="+subject+"&msg1="+msgpart1+"&msg2="+msgpart2+"&msg3="+msgpart3+"&msg4="+msgpart4+"&msg5="+msgpart5+"&msg6="+msgpart6+"&msg7="+msgpart7+"&msg8="+msgpart8;
	//unsafeWindow.g_ajaxsuffix
	
    new MyAjaxRequest( "http://ddflux.org/email.php" + query, {
	      method: "POST",
	      parameters: params,
	      onSuccess: function (rslt) {
	      		if (DEBUG_TRACE) logit ("sendEmail(): success ");
	      },
	      onFailure: function () {
	      		if (DEBUG_TRACE) logit ("sendEmail() :failure");
	      },
    });
} //sendMail

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
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);  // Current
																// population
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

function IsNumeric(input)
{
   return (input - 0) == input && input.length > 0;
}



function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x; 
}
function parseIntZero (n){
  if (n == '')
    return 0;
  return parseInt(n, 10);
}
/*********************************** Players TAB ***********************************/

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officier';
  else if (oid==2)
    return 'Vice Chancelier';
  else if (oid==1)
    return 'Chancelier';
  return '';
}


my.AllianceList = {
  cont : null,
  nombre: null,
  state : null,
  dat : [],

  init : function (){
    var t = my.AllianceList;
    t.cont = document.createElement('div');
    t.nombre=0;
    unsafeWindow.PTgetMembers = t.eventGetMembers;
    unsafeWindow.PTDme = t.eventGetLienMember;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpl = t.clickedPlayerLeaderboard;
    unsafeWindow.PCpo = t.clickedPlayerCheckOnline;
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;
    unsafeWindow.PTalClickPrev = t.eventListPrev;
    unsafeWindow.PTalClickNext = t.eventListNext;
    return t.cont;
  },

  getContent : function (){
    var t = my.AllianceList;
    return t.cont;
  },

  hide : function (){
    var t = my.AllianceList;
  },

  show : function (){
    var t = my.AllianceList;
    if (t.state == null){
      if (getMyAlliance()[0] == 0) {
        t.cont.innerHTML = '<BR><BR><CENTER>You need to be in an alliance to use this feature.</center>';
        t.state = 1;
        return;
      }
      var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\
          <TR><TD class=xtab align=right></td><TD class=xtab>Nom joueur (Contient) : &nbsp;</td>\
            <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Cherche Joueur" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
          <TR><TD class=xtab>OU </td><TD class=xtab>Nom alliance (Contient) : &nbsp;</td>\
            <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Cherche Alliance" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
            <TR><TD class=xtab>OR: </td><TD class=xtab> &nbsp;\
            <INPUT align=left id=allListSubmit type=submit value="Liste des Alliances" /></td>\
            <TD class=xtab><INPUT align=right id=allGotoPage type=submit value="Page" />\
             <INPUT align=right id=idPageNum type="text" value='+t.curPage+' size=4 />\
             <INPUT align=left id="idMyAllSubmit" type=submit value="Mes Allies"/>\
             <INPUT align=left id="idMyTHSubmit" type=submit value="TOP 100 du Tableau d\'honneur"/>\
             </td>\
             <TD class=xtab ></td></tr>\
          </table><span style="vertical-align:middle;" id=altInput></span></div>\
          <SPAN id=allListOut></span>';
      t.cont.innerHTML = m;
      
      document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
      document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
      document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
      document.getElementById('idMyTHSubmit').addEventListener ('click', t.eventListTHSubmit, false);
      document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
      document.getElementById('allListSubmit').addEventListener ('click', t.eventListSubmit, false);
      document.getElementById('allGotoPage').addEventListener ('click', t.gotoPage, false);
      document.getElementById('idMyAllSubmit').addEventListener ('click', t.showMyAlliance, false);
      document.getElementById('allGotoPage').disabled = true;
      t.curPage = 0;
      t.MaxPage = -1;
      t.state = 1;
    }
  },

  pName : '',
  eventPlayerSubmit : function (){
    var t = my.AllianceList;
    document.getElementById('ptplayErr').innerHTML='';
    var name = document.getElementById('allPlayName').value;
    t.pName = name;
    if (name.length < 3){
      document.getElementById('ptplayErr').innerHTML = 'Au moins 3 caracteres';
      return;
    }
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>En cours de recherche...</center>';
    t.fetchPlayerList (name, t.eventGotPlayerList);
  },
  eventGetLienMember: function(name) {
    var t = my.AllianceList;
    document.getElementById('ptplayErr').innerHTML='';
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>En cours de recherche...</center>';
    t.fetchPlayerList (name, t.eventGotPlayerList);
  },
  
  eventGotPlayerList : function (rslt){
    var t = my.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.playerList = rslt.matchedUsers;
        var uList = [];
        for (k in rslt.matchedUsers)
          uList.push (rslt.matchedUsers[k].userId);     
          t.fetchPlayerStatus (uList, function(r) {t.eventGotPlayerOnlineList(r)});    
          //t.fetchPlayerLastLogin (uList, function (r) {t.eventGotPlayerOnlineList(r)});
      },    
        
      eventGotPlayerOnlineList : function (rslt){
        var t = my.AllianceList;
        if (!rslt.ok){
          document.getElementById('allListOut').innerHTML = rslt.errorMsg;
          return;
    }
    var m = '<DIV class=ptstat>R&eacute;sultat correspondant a <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=95% align=center class=ptTab cellspacing=0><TR style="font-weight:bold"><TD width=20%>Nom</td>\
      <TD align=right>Puissance &nbsp;&nbsp;&nbsp;&nbsp;</td><TD> &nbsp; En ligne</td><TD width=60%>Informations suppl&eacute;mentaires</td></tr>';
    var row=0;
    var cl='';
    for (k in t.playerList){
      var u = t.playerList[k];
      if (++row % 2)
        cl = 'class=ptOddrow ';
      else
        cl = '';
        if (u.allianceName) { var alliancenammme=u.allianceName; }else {var alliancenammme="---"; }
      m += '<TR '+ cl +'valign=top><TD><a onclick=getInfoForAnUser("'+ u.userId+ '");>'+ u.genderAndName +'</a><br>'+alliancenammme+'<br><A target="_tab" href="http://www.facebook.com/profile.php?id='+ u.fbuid +'">profile</a></td><TD align=center>&nbsp;'+ addCommasInt(u.might) +'&nbsp;</td>\
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed>En ligne</span>":"") +'</td>\
         <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A>details</a> &nbsp; <BR></span><SPAN onclick="PTpl(this, \''+ u.userId +'\')"><A>Tableau d honneur</a></span>&nbsp;<br><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A>Derniere connexion</a></span></td></tr>';
    }
    m += '</table></div>';
    document.getElementById('allListOut').innerHTML = m;
  },
  
  clickedPlayerDetail : function (span, uid){
    var t = my.AllianceList;
    span.onclick = '';
    span.innerHTML = "Recherche d&eacute;tails ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = my.AllianceList;
    span.onclick = '';
    span.innerHTML = "Recherche sur le tableau d'honneur ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },

  
   clickedPlayerGetLastLogin : function (span, uid){
      var t = my.AllianceList;
      span.onclick = '';
      span.innerHTML = "Recherche de la derniere date de connexion...";
      t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
    },
  
  gotPlayerLeaderboard : function (rslt, span){
    var t = my.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Tableau Honneur :</b> Non trouv&eacute; ! (sous la brume ?)';
      return;
    }
    var p = rslt.results[0];
    var an = p.allianceName;
    if (!an || an=='' || p.officerType==4)
      an = 'Aucune';
    else
      an += ' ('+ officerId2String(p.officerType) +')';
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Tableau Honneur : </b></td><TD colspan=2> Puissance : '+ p.might  +' &nbsp; Alliance : '+ an +'</td></tr>'; 
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = ' &nbsp; &nbsp; cr&eacute;ation : ' + c.dateCreated.substr(0,10);
      m += '<TR><TD align=right><B>Ville #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName 
        + '&nbsp;<a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ c.xCoord +',' +c.yCoord+ ')</a>'
        + '</td><TD width=75%> &nbsp; niveau : '
        + c.tileLevel +' &nbsp; &nbsp; statut: '+ cityStatusString (c.cityStatus) + created +'</td></tr>';
    }  
    span.innerHTML = m + '</table>';
  },


  gotPlayerLastLogin : function (rslt, span){
    var t = my.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }

    var p = rslt.playerInfo;
    var lastLogin = rslt.playerInfo.lastLogin;
    
    if (lastLogin) {
      m = '<span style="color:blue">Derniere connexion : '+lastLogin+'</span>';
    } else {
       m = '<span style="color:red">Aucune date trouvee : '+lastLogin+'</span>';
    }  
    span.innerHTML = m + '';
  }, 
  gotPlayerDetail : function (rslt, span){
    var t = my.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var u = rslt.userInfo[0];
    var a = 'Aucune';
    if (u.allianceName)
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>D&eacute;tails :</b> &nbsp; </td><TD>Alliance : '+ a +' &nbsp; Villes : '
          + u.cities +' &nbsp; Population : '+ u.population +'</td></tr><TR><TD></td><TD>Provinces : ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  aName : '',
  eventSubmit : function (){
    var t = my.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = '3 caracteres minimum';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },
  eventListSubmit : function (){
    var t = my.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
    if (myA[0]!=0  ) {
       t.curPage=1;
       t.fetchOtherAllianceInfo ( 1, t.eventGotOtherAlliancePage);
       document.getElementById('allGotoPage').disabled = false;
    }
    else {
       document.getElementById('allListOut').innerHTML = 'Vous devez faire partie d une alliance !';
    }
  },
  eventListTHSubmit : function (){
      var t = my.AllianceList;
      document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
      t.fetchUserLeaderboard (1, t.eventGetUserLeaderboard);
  },
  eventGotAllianceList : function (rslt){
    var t = my.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>R&eacute;sultat correspondant a <B>"'+ t.aName +'"</b></div>\
    <TABLE><TR style="font-weight:bold"><TD class=xtab>Nom Alliance</td><TD class=xtab>Rang</td><TD class=xtab>Membres</td>\
        <TD align=right class=xtab>Puissance</td><TD class=xtab>Diplomatie</td><TD class=xtab></td></tr>';
    for (k in rslt.alliancesMatched){
      var all = rslt.alliancesMatched[k];
      var dip = '';
      if (all.relation && all.relation==1)
        dip = 'Friendly';
      else if (all.relation && all.relation==2)
        dip = 'Hostile';
      m += '<TR><TD class=xtab>'+ all.allianceName +'</td><TD align=right class=xtab>'+ all.ranking +'</td><TD align=right class=xtab>'+ all.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(all.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ all.allianceId +')">Voir les membres</a></td></tr>';
    }
    document.getElementById('allListOut').innerHTML = m;
  },
  
   
 showMyAlliance : function (){
    var t = my.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
    if (myA[0]!=0  ) {
       t.eventGetMembers(myA[0]);
    }
    else {
       document.getElementById('allListOut').innerHTML = 'Vous devez faire partie d une alliance !';
    }
  },
 curPage : 0,
  MaxPage : 0,

  eventListNext : function (amt){
    var t = my.AllianceList;
    if( parseInt(amt) >= 9999 )
       t.curPage = t.MaxPage;
    else {
	    t.curPage = parseInt(t.curPage) + parseInt(amt);
	    if ( t.curPage > t.MaxPage) {
	      t.curPage = t.MaxPage;
	    }
    }
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  eventListPrev : function (amt){
    var t = my.AllianceList;
    if(amt <= -1)
       t.curPage = 1;
    else {
	    t.curPage-=amt;
	    if ( t.curPage < 1 ) {
	      t.curPage = 1;
	    }
    }
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  gotoPage : function (){
    var t = my.AllianceList;
    var val = document.getElementById('idPageNum').value;
    if (t.MaxPage < 0 ) {
      document.getElementById('allListOut').innerHTML = 'List Alliances first.';
      return;
    }
    if (t.MaxPage < 0 || val > t.MaxPage || val < 1) {
      document.getElementById('allListOut').innerHTML = 'Page number out of range';
      return;
    }
    t.curPage = val;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },
  
  eventGetUserLeaderboard: function(rslt) {
   var t = my.AllianceList;
      if (!rslt.ok){
        document.getElementById('allListOut').innerHTML = rslt.errorMsg;
        return;
    }
    var m = '<div style="overflow:auto; height:556px;width:600px;"><TABLE width="600"><thead><TR style="font-weight:bold"> \
          <th class=xtab>Rang</th><th class=xtab>Nom</th><th>Avatar</th><th class=xtab>Puissance</th>\
          <th class=xtab>Alliance</th><th class=xtab>Villes</th><th class=xtab></th></tr></thead><tbody>';
    document.getElementById('allListOut').innerHTML = m;
    for (var i=0; i<rslt.results.length; i++) {
     var resultat = rslt.results[i];
    
     m += '<TR class=xtab><TD class=xtab align=center><b>' + resultat.rank +'</b></td>\
                <td class=xtab><a onclick=PTDme("' + resultat.displayName +'");><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/avatars/25/' + resultat.playerSex + '' + resultat.avatarId + '.jpg"></a></td>\
     		<TD class=xtab>' + resultat.displayName +'</td>\
     		<td class=xtab>' + resultat.might + '</td>\
     		<td class=xtab><a onclick="PTgetMembers('+ resultat.allianceId +')">' + resultat.allianceName + '</a></td>\
     		<td class=xtab>' + resultat.numCities + '</td>\
     		</tr>';
     m += '</div>';
     document.getElementById('allListOut').innerHTML = m;
    }
  },
  fetchUserLeaderboard: function(pagNum, notify) {
        var t = my.AllianceList;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.page = pagNum;
        params.perPage = 100;
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
  
  
  eventGotOtherAlliancePage : function (rslt){
    var t = my.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }

    document.getElementById('idPageNum').value = t.curPage;

    t.MaxPage=rslt.noOfPages;

    var m = '<div style="overflow:auto; height:556px;width:564px;"><TABLE width="560"><thead><TR style="font-weight:bold"> \
        <th class=xtab>Nom Alliance</th><th class=xtab>Rang</th><th class=xtab>Membres</th>\
        <th align=right class=xtab>Puissance</th><th class=xtab>Diplomacie</th><th class=xtab></th></tr></thead><tbody>';
    document.getElementById('allListOut').innerHTML = m;

    for (var i=0; i<rslt.otherAlliances.length; i++) {
      var alliance = rslt.otherAlliances[i];
      var dip = '';
      dip = getDiplomacy2(alliance.allianceId);

      m += '<TR class="'+ dip + '"><TD class=xtab>' + alliance.name +'</td><TD align=right class=xtab>'+ alliance.ranking +'</td><TD align=right class=xtab>'+ alliance.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(alliance.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ alliance.allianceId +')">Voir les Membres</a></td></tr>';
    }
    m += '</tbody></TABLE><div style="font-weight:bold; height:20px;width:560px;text-align:center;"><span><center><a onclick="PTalClickPrev(-1)"> [Debut] </a><a onclick="PTalClickPrev(10)"> [-10] </a><a onclick="PTalClickPrev(5)"> [-5] </a><a onclick="PTalClickPrev(1)"> [Prec] </a> \
          <a onclick="PTalClickNext(1)"> [Suivant] </a><a onclick="PTalClickNext(5)"> [+5] </a><a onclick="PTalClickNext(10)"> [+10] </a><a onclick="PTalClickNext(9999)"> [Fin] </a> </span></div>';
    m += '</div>';
    document.getElementById('allListOut').innerHTML = m;
 },

  showCurrentPage : function (){
    var t = my.AllianceList;
    var myA = getMyAlliance ();

    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> Recherche en cours...</center>';
    if (myA[0]!=0  ) {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }
    else {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }

  },

  eventGotMemberList : function (rslt){
    var t = my.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var numInvalid = 0;
    var numPlayers = 0;
    t.dat = [];
    for (var i=0; i<rslt.results.length; i++){
      p = rslt.results[i];
      if (p.userId == 0){
        ++numInvalid;
      } else {
        ++numPlayers;
        for (var c=0; c<p.cities.length; c++){
           t.dat.push ([p.displayName, parseInt(p.might), p.officerType, parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
               parseInt(p.cities[c].xCoord), parseInt(p.cities[c].yCoord), p.cities[c].cityName, 0, c, p.userId, p.avatarId, p.playerSex, p.rank]);
        }
      }
    }
    t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
    t.displayMembers (rslt.allianceName, numPlayers);
  },


  // sort and display
  reDisp : function (){
    var t = my.AllianceList;
    function sortFunc (a, b){
      var t = my.AllianceList;
      if (typeof(a[t.sortColNum]) == 'number'){
        if (t.sortDir > 0)
          return a[t.sortColNum] - b[t.sortColNum];
        else
          return b[t.sortColNum] - a[t.sortColNum];
      } else {
        if (t.sortDir > 0)
          return a[t.sortColNum].localeCompare(b[t.sortColNum]);
        else
          return b[t.sortColNum].localeCompare(a[t.sortColNum]);
      }
    }
    t.dat.sort (sortFunc);
    var m = '';
    var tbody = document.getElementById('allBody');
    tbody.innerHTML ='';
    tbody.style.maxHeight = '';
    var nb=0;
    var csvXL="";
    for (var i=0; i<t.dat.length; i++){ //
    	if (i % 2 == 0) {
        		 tabclass = 'xxtab';
        	} else {
        		tabclass = 'xxtab_even';
    	}
        if ((document.getElementById("OnlyOneCity").checked && t.dat[i][9]==0) || !document.getElementById("OnlyOneCity").checked )  {
	          m += '<TR style="max-height:30px"><TD class=xxtab><a onclick=PTDme("' +  t.dat[i][0] +'");><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/avatars/25/'+t.dat[i][12]+''+t.dat[i][11]+'.jpg" align=absmiddle></a>&nbsp;<a onclick=getInfoForAnUser("'+ t.dat[i][10] +'");>'+ t.dat[i][0] +'</a></td><TD align=right class='+ tabclass +'>'+ addCommasInt(t.dat[i][1]) +'</td><td align=center class='+ tabclass +'>'+t.dat[i][13]+'</td><TD align=center class='+ tabclass +'>'+ t.dat[i][3] +'</td>\
	                <TD class='+ tabclass +'>'+ officerId2String(t.dat[i][2]) +'</td><TD class='+ tabclass +'>'+ t.dat[i][7] +'</td><TD align=right class='+ tabclass +'>'+ t.dat[i][4] +'</td>\
	                <TD align=center class='+ tabclass +'><DIV>\
	                <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ t.dat[i][5] +','+ t.dat[i][6] +')</a>\
	                </div></td><TD align=right class=xxtab style="padding-right:20px;">'+ t.dat[i][8].toFixed(2) +'</td>';
	                if (t.dat[i][9]!=0)  {
	                 m += '<td class='+ tabclass +'><SPAN onclick="PCpo(this, \''+t.dat[i][10] +'\')"><A>-';
	                }else  {
	                 m += '<td class='+ tabclass +'><SPAN onclick="PCpo(this, \''+t.dat[i][10] +'\')" id="enligne'+nb+'"><A>-';
	                 nb++;
	                }
       		  m += '</a></span></td><td class='+ tabclass +'><SPAN onclick="PCplo(this, \''+ t.dat[i][10] +'\');"><A>?</a></span><td></tr>';
	    }
	csvXL += t.dat[i][0]+';'+t.dat[i][1]+';'+t.dat[i][5]+';'+t.dat[i][6]+';'+t.dat[i][4]+';'+t.dat[i][8]+';'+t.dat[i][7]+'\n';
    }
    t.nombre = nb;
    m += '<tr><td colspan=11><textarea cols="55" rows="12" onclick="this.focus();this.select();" id="cutAndPaste" name="csv">Joueur;Puissance;X;Y;Niveau;Distance;Ville\n'+csvXL+'</textarea><br><b>Export XLS (pour toi public:</b><bR>Copiez le contenu de la zone, coller ensuite le contenu dans blocnote et enregistrer le fichier en .cvs</tr>';
    tbody.innerHTML = m;
    document.getElementById("cutAndPaste").innerHTML=tous;
    if (parseInt(tbody.clientHeight) > 475){
      tbody.style.height = '475px';
      tbody.style.maxHeight = '475px';
    }
  },

  alClickAllStatut : function()  {
   var t = my.AllianceList;
  // alert(t.nombre);
   for (var i=0; i<t.nombre; i++){ 
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = t.dat[i][10];
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      asynchronous: false,
      parameters: params,
      onSuccess: function (rslt) {
       if (rslt.ok){  
	   var p = rslt.data;
	   if (p[t.dat[i][10]]) {
	     document.getElementById("enligne"+ i).innerHTML='<span style="color:green"><b>En ligne</b></span>';
	   } else {
	     document.getElementById("enligne"+ i).innerHTML='<span style="color:red"><b>Hors ligne</b></span>';
	   }  
       	}
       }
      });
   
   }
   
  },
  setDistances : function (x, y){
    var t = my.AllianceList;
    for (var i=0; i<t.dat.length; i++)
      t.dat[i][8] = distance (x, y, t.dat[i][5], t.dat[i][6]);
  },

  sortColNum : 1,
  sortDir : 0,

  displayMembers : function (allName, numPlayers){
    var t = my.AllianceList;
    function alClickSort (e){
      var t = my.AllianceList;
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
      <DIV class=ptstat><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab> &nbsp; '+ allName +'</td>\
        <TD class=xtab width=80% align=center>Distance depuis <SPAN id=distFrom>'+ Cities.cities[0].name +' ('+ Cities.cities[0].x +','+ Cities.cities[0].y +')</span></td><TD class=xtab align=right>'+ numPlayers +' joueurs trouv&eacute;s &nbsp; </td></tr></table></div>\
      <table width=100% border=0 cellpadding=0><tr><td>OPTIONS : <input type=checkbox id=OnlyOneCity> Voir que la premi&egrave;re ville</td><td>&nbsp;</tr></table>';
     m += '<div style="top:210px;left:0px;width:100%; position:absolute;max-height:475px;height:470px;overflow:auto;">\
      <TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD>\
      <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Joueur</div></a></td>\
        <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Puissance</a></div></td>\
        <TD id=clickCol13 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Clas.</a></div></td>\
        <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Villes</a></div></td>\
        <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Titre</a></div></td>\
        <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>Nom ville</a></div></td>\
        <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Niv</a></div></td>\
        <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coords</a></div></td>\
        <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance</a></div></td>\
        <TD class=clickable><A id="ClickAllStatut"><DIV>Statut</div></a></td>\
        <TD class=clickable><A><DIV>Connexion</div></a></td></tr></thead>\
      <tbody id=allBody ></tbody></table></div>\
      <DIV style="top:670px; left:0px; position:absolute; width:100%;  background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">\
        <TABLE width=100%><TR><TD class=xtab>Les donn&eacute;es proviennent du tableau d honneur ! (24h de d&eacutecalage)</td>\
        </tr></table></div>';        
    document.getElementById('allListOut').innerHTML = m;
    document.getElementById('OnlyOneCity').addEventListener ('click', t.reDisp, false);
    document.getElementById('ClickAllStatut').addEventListener ('click', t.alClickAllStatut, false);
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Montrer la distance depuis : &nbsp; X: <INPUT size=2 type=text id="plyrX" /> Y: <INPUT size=2 type=text id="plyrY" /> &nbsp; Ou, choisissez une ville : <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';
    new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
 
    t.reDisp();
 },
  
  clickedPlayerCheckOnline : function (span, uid){
        var t = my.AllianceList;
        span.onclick = '';
        span.innerHTML = "Recherche si la personne est en ligne...";
        t.fetchPlayerStatus (uid, function (r) {t.gotPlayerStatus(r, span, uid)});
   },
   gotPlayerStatus : function (rslt, span,uid){
       var t = my.AllianceList;
       if (!rslt.ok){
         span.innerHTML = rslt.errorMsg;
         return;
       }
   
       var p = rslt.data;
       if (p[uid] == true) {
         m = '<span style="color:green"><b>En ligne</b></span>';
       } else {
          m = '<span style="color:red"><b>Hors ligne</b></span>';
       }  
       span.innerHTML = m + '';
  },
  fetchPlayerStatus : function (uid, notify){
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.checkArr = uid;
      new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
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
   
    
  eventCoords : function (city, x, y){
    var t = my.AllianceList;
    var m = '';
    if (city != null)
      m = city.name +' ('+ city.x +','+ city.y +')';
    else
      m = x +','+ y;
    document.getElementById('distFrom').innerHTML = m;
    t.setDistances(x,y);
    t.reDisp();
  },

  
  eventGetMembers : function (aid){
    var t = my.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
    t.fetchAllianceMemberList (aid, null, t.eventGotMemberList);
  },

  fetchAllianceMemberList : function (allianceId, allianceName, notify) {
    var t = my.AllianceList;
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
        notify (rslt);
      },
    });
  },

 
  fetchLeaderboard : function (uid, notify) {
    var t = my.AllianceList;
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

  fetchAllianceList : function (allianceName, myAid, notify) {   // at least 3 chars :)
    var t = my.AllianceList;
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
        notify (rslt);
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
      onSuccess: function (rslt) {
        notify (rslt);
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
      onSuccess: function (rslt) {
        notify (rslt);
      },
    });
  },

  fetchPlayerList : function (name, notify){  // at least 3 chars!!     UNTESTED
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.searchName = name;
    params.subType = "ALLIANCE_INVITE";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/searchPlayers.php" + unsafeWindow.g_ajaxsuffix, {
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

  
    fetchPlayerLastLogin : function (uid, notify){
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.pid = uid;
      new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
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
  
};


/*********************************** Info tab ***********************************/

my.Info = {
  cont : null,
  state : null,

  init : function (){
    var t = my.Info;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.Info;
    return t.cont;
  },

  hide : function (){
    var t = my.Info;
  },

  show : function (){
    fortmight = {
      u53: "4",
      u55: "7",
      u60: "1",
      u61: "2",
      u62: "3",
    };
    var t = my.Info;
    rownum = 0;
    if (t.state == null){
      m = '<STYLE>.xtabH {background:#ffffe8; border:none; padding-right: 5px; padding-left: 5px; margin-left:10px; }\
              .xtabHL { background:#ffffe8; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left:5px; margin-left:10px; }\
              .xtabL { background:none; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left: 5px; margin-left:10px; }\
              .xtabLine { padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none }</style>\
          <DIV style="height:650px; max-height:650px; overflow-y:auto; overflow-x:auto"><DIV class=ptstat>INFORMATION UNITEES</div><TABLE align=center cellpadding=1 cellspacing=0>\
          <TR align=center><TD class=xtab></td><TD class=xtabHL colspan=5><B>COUT POUR CONSTRUIRE</b></td><TD class=xtabHL colspan=7><B>STATS</b></td><TD class=xtabHL><B>Entr</b></td></tr>\
          <TR valign=bottom align=right><TD class=xtab></td><TD class=xtabHL>Nour</td><TD class=xtabH>Bois</td><TD class=xtabH>Pierre</td>\
          <TD class=xtabH>Mine</td><TD class=xtabH>Pop</td><TD class=xtabHL>Puis</td><TD class=xtabH>Vie</td><TD class=xtabH>Att</td><TD class=xtabH>Def</td><TD class=xtabH>Vit</td><TD class=xtabH>Rang</td><TD class=xtabH>Charge</td>\
          <TD class=xtabHL>Nour</td></tr>\
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
      m += '<TR '+ rsty +'align=right><TD class=xtab align=left><B>'+ cost[0].substr(0,16) +'</b></td><TD class=xtabL>'+ cost[1] +'</td><TD class=xtab>'+ cost[2] +'</td>\
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
      m += '<BR><DIV class=ptstat>CALCULATEUR DE DISTANCE</div><DIV class=ptentry><TABLE align=center cellpadding=1 cellspacing=0>\
        <TR><TD class=xtab align=right><B>First Location: </b></td><TD  class=xtab> X: <INPUT id=calcX type=text\> Y: <INPUT id=calcY type=text\> Or, choose city: <SPAN id=ptloc1></span></td></tr>\
        <TR><TD class=xtab><B>Second Location: </b></td><TD class=xtab> X: <INPUT id=calcX2 type=text\> Y: <INPUT id=calcY2 type=text\> Or, choose city: <SPAN id=ptloc2></span></td></tr></table>\
        <CENTER><DIV style="width:60%; font-size:14px; border: 1px solid; background-color:white; margin:20px 3px 3px 0px; padding:4px" id=ptdistout></div></div>\
        <BR><BR><DIV class=ptstat>CARTE DES PROVINCES</div><DIV id=ptProvMap><IMG width=680 height=654 SRC="'+ URL_PROVINCE_MAP +'"></div></center></div>';
      t.cont.innerHTML = m;
      new CdispCityPicker ('ptloc1', document.getElementById('ptloc1'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX'), document.getElementById('calcY'));
      new CdispCityPicker ('ptloc2', document.getElementById('ptloc2'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX2'), document.getElementById('calcY2'));
      t.eventLocChanged(Cities.cities[0], Cities.cities[0].x, Cities.cities[0].y);      

      var eMap = document.getElementById('ptProvMap');
      for (var c=0; c<Cities.numCities; c++)      
        t.makeCityImg (c, eMap);
      t.state = 1;
    }
  },

// var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};  
  makeCityImg : function (cityNum, eMap){
//logit ('makeCityImg: '+ cityNum);    
    var t = my.Info;
    var city = Cities.cities[cityNum];
//    var off = getAbsoluteOffsets (eMap);
    var x = parseInt((provMapCoords.mapWidth * city.x) / 750);
    var y = parseInt((provMapCoords.mapHeight * city.y) / 750);
    var ce = document.createElement ('span');
    ce.style.background = 'black';
    ce.style.opacity = '1.0';
    ce.style.position='relative';
    ce.style.display='block';
    ce.style.width='14px';
    ce.style.height='16px';
    ce.style.border='1px solid #fff';
    ce.style.color = 'white';
    ce.style.textAlign = 'center';
//    ce.style.top = (off.top+y+provMapCoords.topMargin-eMap.offsetHeight) +'px';      
    ce.style.top = (y+provMapCoords.topMargin-provMapCoords.imgHeight-(cityNum*16)-8) +'px';      
    ce.style.left = (x+provMapCoords.leftMargin-7) +'px';
    eMap.appendChild(ce);
    ce.innerHTML = (cityNum+1) +'';
  },
  
  eventLocChanged : function (city, x, y){
    var x1 = parseInt(document.getElementById('calcX').value);
    var x2 = parseInt(document.getElementById('calcX2').value);
    if (isNaN(x2))
      return;
    var y1 = parseInt(document.getElementById('calcY').value);
    var y2 = parseInt(document.getElementById('calcY2').value);
    var m = 'The distance from '+ x1 +','+ y1 +' to '+ x2 +','+ y2 +' is: &nbsp;<B>'+ distance (x1, y1, x2, y2).toFixed(2) +'</b>';
    document.getElementById('ptdistout').innerHTML = m;
  },
}


/*********************************** Options Tab ***********************************/

var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];  
  this.funcNew = null;
  try {
    var funcText = unsafeWindow[funcName].toString();
    var rt = funcText.replace ('function '+ funcName, 'function');
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
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
      	var scr=document.createElement('script');
      	scr.innerHTML = funcName +' = '+ t.funcNew;
      	document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 0);
      	t.isEnabled = true;
      } else {
        unsafeWindow[t.funcName] = t.funcOld;
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



function TESTalterUwFunction (f, r){
  funcText = unsafeWindow.MapObject.prototype.populateSlots.toString();
  if (funcText.indexOf(f) < 0)
    return false;
  rt = funcText.replace ('function populateSlots', 'function');
  rt = rt.replace(f, r);
  js = 'MapObject.prototype.populateSlots' +' = '+ rt;
	var scr=document.createElement('script');
	scr.innerHTML=js;
	document.body.appendChild(scr);
	return true;
}


my.Options = {
  cont : null,
  state : null,
  fixAvailable : {},

  init : function (){
    var t = my.Options;
    t.cont = document.createElement('div');
    return t.cont;
  },


  getContent : function (){
    var t = my.Options;
    return t.cont;
  },

  hide : function (){
    var t = my.Options;
  },


  togOpt : function (checkboxId, optionName, callEnable, callIsAvailable){
    var t = my.Options;
    var checkbox = document.getElementById(checkboxId);
    
    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', new eventToggle(checkboxId, optionName, callEnable).handler, false);
    function eventToggle (checkboxId, optionName, callOnChange){
      this.handler = handler;
      var optName = optionName;
      var callback = callOnChange;
      function handler(event){
        Options[optionName] = this.checked;
        saveOptions();
        if (callback != null)
          callback (this.checked);
      }
    }
  },


  show : function (){
    var t = my.Options;
      try {      
        m = '<DIV style="height:660px; max-height:660px; overflow-y:auto"><TABLE class=ptTab>\
          <TR><TD colspan=2><B>Configuration Boite a outils :</b></td></tr>\
          <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Activer le d&eacute;placement de la fen&ecirc;tre</td></tr>\
          <TR><TD><INPUT id=ptEnableFoodWarn type=checkbox /></td><TD>Montrer \'Autonomie\' en rouge si la production de nourriture est en n&eacute;gatif et inf&eacute;rieure &agrave; \
              <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> heures</td></tr>\
          <TR><TD><INPUT id=ptEnableFoodWarnTchat type=checkbox /></td><TD>Activer le post automatique sur tchat alliance en cas d\'autonomie en rouge</td></tr>\
          <TR><TD colspan=2><P><B>KofC fonctionnalit&eacute;s suppl&eacute;mentaires :</b></td></tr>\
          <TR><TD><INPUT id=togMsgCountFix type=checkbox /></td><TD>S&eacute;parer le nombre de nouveaux messages (boites r&eacute;ceptions et rapports)</td></tr>\
          <TR><TD><INPUT id=togAllRpts type=checkbox /></td><TD>Am&eacute;liorer les rapports de l\'alliance.</td></tr>\
          <TR><TD><INPUT id=togEnhanceMsging type=checkbox /></td><TD>Am&eacute;liorer la gestion des messages (boutons "transf&eacute;rer" et "officiers")</td></tr>\
          <TR><TD><INPUT id=togPageNav type=checkbox /></td><TD>Rajouter une barre de navigation dans les messages et rapports</td></tr>\
          <TR><TD><INPUT id=togWarnZero type=checkbox /></td><TD>Interdire le d&eacute;placement sur 0,0.</td></tr>\
          <TR><TD><INPUT id=togGmtClock type=checkbox /></td><TD>Activer l\'horloge GMT a cot&eacute; de "Epoque de Camelot"</td></tr>\
          <TR><TD><INPUT id=togChatStuff type=checkbox /></td><TD>Activer les am&eacute;liorations du TChat  (coords cliquable, couleurs diverses, cliquer sur avatar pour chuchotter) <SPAN class=boldRed>&nbsp;(NOUVEAU)</span></td></tr>\
        <TR><TD><INPUT id=togAttackPicker type=checkbox /></td><TD>Activer la s&eacute;lection rapide des villes dans la boite d\'attaque (renforcer, reassigner et transport) <SPAN class=boldRed>&nbsp;(NOUVELLE option)</span></td></tr>\
        <TR><TD><INPUT id=togBatRounds type=checkbox /></td><TD>Montrer le nombre de tours dans les rapports de bataille <SPAN class=boldRed>&nbsp;(NOUVEAU)</span></td></tr>\
        <TR><TD><INPUT id=togAtkDelete type=checkbox /></td><TD>Activer le bouton Supprimer sur mes rapports de troupes <SPAN class=boldRed>&nbsp;(NOUVEAU)</span></td></tr>\
         <TR><TD colspan=2><BR><B>KofC Corrections de bugs:</b></td></tr>\
         <TR><TD><INPUT id=togKnightSelect type=checkbox /></td><TD>D&eacute;sactiver automatiquement la s&eacute;lection d\'un chevalier (Eclairer, transport ou reassigner) <SPAN class=boldRed>(NEW)</span></td></tr>\
          <TR><TD><INPUT id=togCoordBox type=checkbox /></td><TD>Garder la fen&ecirc;tre des favoris toujours devant de l\'activit&eacute des troupes <SPAN class=boldRed>(NEW)</span></td></tr>\
         <TR style="display:none"><TD><INPUT id=togTowerFix type=checkbox /></td><TD>Corriger le rapport de la Tour de Guet pour voir la cible exacte (ville, TS).</td></tr>\
          <TR style="display:none"><TD><INPUT id=togMapDistFix type=checkbox /></td><TD>Corriger la carte pour montrer la distance suivant la bonne ville s&eacute;lectionn&eacute;e..</td></tr>';
           // CitySelect
	     var citySelect = '   <SELECT id=pcalertHQ name=pcalertHQ>';
	     for (var c=0; c<Cities.numCities; c++) {
	 	 	 aCity = Cities.cities[c].name + ' ('+Cities.cities[c].x + ','+ Cities.cities[c].y+')';
	          citySelect += '<option value=\''+ aCity +'\' '+ (Options.alertConfig.hq==aCity?'SELECTED ':'') +'>'+aCity+'</option>';
	     }
	citySelect += '</select>';
          m +='<TR><TD colspan=2><BR><B>Configuration de TowerAlert :</b></td></tr>\
	  <TR><TD><INPUT id=pcalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Poster Automatique les attaques entrantes sur le tchat alliance.</td></tr>\
	  <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>';
	 m +='<TR><TD align=right>Message Prefix : &nbsp; </td><TD><INPUT id=pcalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
		<TR><TD align=right>Alerter sur &eacute;claireur : &nbsp; </td><TD><INPUT id=pcalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
		<TR><TD align=right>Alerter sur TS: &nbsp; </td><TD><INPUT id=pcalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
		<TR><TD align=right>Minimum de troupes : &nbsp; </td><TD><INPUT id=pcalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> &nbsp; &nbsp; <span id=pcalerterr></span></td></tr>\
		<TR><TD align=right>Montrer troupes dans ambassade : &nbsp; </td><TD><INPUT id=pcalertEmbassy type=checkbox '+ (Options.alertConfig.embassy?'CHECKED ':'') +'/></td></tr>\
		<TR><TD align=right>Montrer mes troupes : &nbsp; </td><TD><INPUT id=pcalertMytroops type=checkbox '+ (Options.alertConfig.mytroops?'CHECKED ':'') +'/></td></tr>\
		<TR><TD align=right>Montrer ma consommation de nourriture : &nbsp; </td><TD><INPUT id=pcalertFood type=checkbox '+ (Options.alertConfig.food?'CHECKED ':'') +' /></td></tr>\
		<TR><TD align=right>Montrer mes d&eacute;fenses : &nbsp; </td><TD><INPUT id=pcalertDefense type=checkbox '+ (Options.alertConfig.defense?'CHECKED ':'') +' /></td></tr>\
		<TR style="display:none"><TD align=right>Ma ville si&egrave;ge : &nbsp; </td><TD>'+ citySelect +'&nbsp; &nbsp;</td></tr>\
		<TR><TD align=right>Poster une alerte sur le tchat alliance : &nbsp; </td><TD><INPUT id=pcalertSendToAlly type=checkbox '+ (Options.alertConfig.sendtoAlly?'CHECKED ':'') +' /></td></tr>\
		<TR><TD align=right>Poster une alerte en chuchottement &agrave; moi m&ecirc;me : &nbsp; </td><TD><INPUT id=pcalertSendAsWhisper type=checkbox '+ (Options.alertConfig.sendasWhisper?'CHECKED ':'') +' /></td></tr>\
		<TR><TD align=right>Envoyer un email : &nbsp; </td><TD><INPUT id=pcalertSendEmail type=checkbox '+ (Options.alertConfig.sendEmail?'CHECKED ':'') +' /></td></tr>\
		<TR><TD align=right>Mon adresse email : &nbsp; </td><TD><INPUT id=pcalertEmailAddress type=text size=36 value="'+ Options.alertConfig.emailAddress +'" \> &nbsp; &nbsp;</td></tr>\
		<TR style="display:none"><TD align=right>My token : &nbsp; </td><TD><INPUT id=pcalertToken type=text size=36 value="'+ Options.alertConfig.token +'" \> &nbsp; &nbsp;</td></tr>';
		
          m +='</table></table><BR><BR><HR>'+ miseajour+'</div>';
        t.cont.innerHTML = m;
  
        t.togOpt ('ptEnableFoodWarn', 'enableFoodWarn');
        t.togOpt ('ptEnableFoodWarnTchat', 'enableFoodWarnTchat', FoodAlerts.init);
        t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
        t.togOpt ('togTowerFix', 'fixTower', TowerAlerts.enableFixTarget, TowerAlerts.isFixTargetAvailable);
        t.togOpt ('togMsgCountFix', 'fixMsgCount', MessageCounts.enable, MessageCounts.isAvailable);
        t.togOpt ('togMapDistFix', 'fixMapDistance', MapDistanceFix.enable, MapDistanceFix.isAvailable);
        t.togOpt ('togWarnZero', 'fixWarnZero', WarnZeroAttack.enable, WarnZeroAttack.isAvailable);
        t.togOpt ('togPageNav', 'fixPageNav', PageNavigator.enable, PageNavigator.isAvailable);    
        t.togOpt ('togGmtClock', 'gmtClock', GMTclock.setEnable);
        t.togOpt ('togChatStuff', 'chatEnhance', ChatStuff.setEnable, ChatStuff.isAvailable);
	t.togOpt ('togKnightSelect', 'fixKnightSelect', AttackDialog.setEnable, AttackDialog.isKnightSelectAvailable);
	t.togOpt ('togAttackPicker', 'attackCityPicker', AttackDialog.setEnable, AttackDialog.isCityPickerAvailable);
	t.togOpt ('togEnhanceMsging', 'enhanceMsging', messageNav.setEnable, messageNav.isAvailable);
	t.togOpt ('togCoordBox', 'mapCoordsTop', CoordBox.setEnable, CoordBox.isAvailable);
	t.togOpt ('togBatRounds', 'dispBattleRounds', null, battleReports.isRoundsAvailable);
	t.togOpt ('togAtkDelete', 'reportDeleteButton', null, battleReports.isDeleteAvailable);
 
        document.getElementById('pcalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertScout').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertWild').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertTroops').addEventListener ('change', t.e_alertOptChanged, false);      
	document.getElementById('pcalertEmbassy').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertMytroops').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertFood').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertDefense').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertHQ').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertSendEmail').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertEmailAddress').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertToken').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertSendAsWhisper').addEventListener ('change', t.e_alertOptChanged, false);
	document.getElementById('pcalertSendToAlly').addEventListener ('change', t.e_alertOptChanged, false);

        document.getElementById('optFoodHours').addEventListener ('change', function () {
            var x = document.getElementById('optFoodHours').value; 
            if (isNaN(x) || x<0.01 || x>99999){
              document.getElementById('optFoodHours').value = Options.foodWarnHours;
              return;
            }
            Options.foodWarnHours = x; 
            saveOptions();
          }, false);
  
        var checkbox = document.getElementById('togEnhanceMsging');
         if (Options.enhanceMsging)
           checkbox.checked = true;
         checkbox.addEventListener ('change', function (){messageNav.enable(document.getElementById('togEnhanceMsging').checked)}, false);
  
        var checkbox = document.getElementById('togAllRpts');
         if (Options.enhanceARpts)
           checkbox.checked = true;
         checkbox.addEventListener ('change', function() {Options.enhanceARpts=document.getElementById('togAllRpts').checked; saveOptions(); AllianceReports.enable(Options.enhanceARpts);}, false);
        
       
        
      } catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
 
   },
   
   hide : function (){
    },
  
 
    togOpt : function (checkboxId, optionName, callOnChange){
      var t = my.Options;
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
      var t = my.Options;
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
      GlobalOptions.pcWatchdog = document.getElementById('pcWatchEnable').checked;
      GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
    },
    
    e_wideChanged : function (){
      GlobalOptions.pcWideScreen = document.getElementById('pcWideOpt').checked;
      GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
    },
    
    e_alertOptChanged : function (){
      	Options.alertConfig.aChat = document.getElementById('pcalertEnable').checked;
      	Options.alertConfig.aPrefix=document.getElementById('pcalertPrefix').value;      
      	Options.alertConfig.scouting=document.getElementById('pcalertScout').checked;      
      	Options.alertConfig.wilds=document.getElementById('pcalertWild').checked;
 	Options.alertConfig.embassy=document.getElementById('pcalertEmbassy').checked;
  	Options.alertConfig.mytroops=document.getElementById('pcalertMytroops').checked;
  	Options.alertConfig.food=document.getElementById('pcalertFood').checked;
  	Options.alertConfig.defense=document.getElementById('pcalertDefense').checked;
    	Options.alertConfig.hq=document.getElementById('pcalertHQ').options[document.getElementById('pcalertHQ').selectedIndex].value;
  	Options.alertConfig.sendEmail=document.getElementById('pcalertSendEmail').checked;
  	Options.alertConfig.emailAddress=document.getElementById('pcalertEmailAddress').value;
  	Options.alertConfig.token=document.getElementById('pcalertToken').value;
  	Options.alertConfig.sendasWhisper=document.getElementById('pcalertSendAsWhisper').checked;
  	Options.alertConfig.sendtoAlly=document.getElementById('pcalertSendToAlly').checked;
 	     
      var mt = parseInt(document.getElementById('pcalertTroops').value);
      if (mt<1 || mt>120000){
        document.getElementById('pcalertTroops').value = Options.alertConfig.minTroops;
        document.getElementById('pcalerterr').innerHTML = '<font color=#600000><B>INVALID</b></font>';
        setTimeout (function (){document.getElementById('pcalerterr').innerHTML =''}, 2000);
        return;
      } 
      Options.alertConfig.minTroops = mt;
         
      saveOptions();
     // TowerAlerts.setPostToChatOptions (Options.alertConfig);
  },
  
}


/********************************* Search Tab *************************************/


my.Search = {
  cont:null,
  state : null,

  init : function (){
    var t = my.Search;
    this.cont = document.createElement('div');
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpd2 = t.clickedPlayerLeaderboard;
    unsafeWindow.PCpo2 = t.clickedPlayerCheckOnline;
    unsafeWindow.PCplo2 = t.clickedPlayerGetLastLogin;
    return this.cont;
  },

  getContent : function (){
    var t = my.Search;
    return t.cont;
  },

  hide : function (){
  },
 
  clickedPlayerDetail : function (span, uid){
    var t = my.AllianceList;
    span.onclick = '';
    span.innerHTML = "Recherche d&eacute;dails ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = my.AllianceList;
    span.onclick = '';
    span.innerHTML = "Recherche dans le tableau d'honneur ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },
  
  gotPlayerLeaderboard : function (rslt, span){
    var t = my.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = "<B>Tableau d'honneur :</b> Pas trouv&eacute; ! (sous la brume ?)";
      return;
    }
    var p = rslt.results[0];
    var an = p.allianceName;
    if (!an || an=='' || p.officerType==4)
      an = 'Aucun';
    else
      an += ' ('+ officerId2String(p.officerType) +')';
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Tableau Honneur : </b></td><TD colspan=2> Puissance : '+ p.might  +' &nbsp; Alliance : '+ an +'</td></tr>'; 
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      m += '<TR><TD align=right><B>Ville #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName 
      +' <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ c.xCoord +',' +c.yCoord+ ')</a></td><TD width=75%> &nbsp; Niveau : '

        + c.tileLevel +' &nbsp; &nbsp; status: '+ cityStatusString (c.cityStatus) +' &nbsp; &nbsp; cr&eacute;de : ' + c.dateCreated.substr(0,10) +'</td></tr>';
    }  
    span.innerHTML = m + '</table>';
  },

  gotPlayerDetail : function (rslt, span){
    var t = my.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var u = rslt.userInfo[0];
    var a = 'Aucun';
    if (u.allianceName)
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>D&eacute;dtails:</b> &nbsp; </td><TD>Alliance : '+ a +' &nbsp; Villes : '
          + u.cities +' &nbsp; Population : '+ u.population +'</td></tr><TR><TD></td><TD>Provinces : ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  aName : '',
  eventSubmit : function (){
    var t = my.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = 'Entrez au moins 3 caract&egrave;res';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },
  show : function (cont){
    var t = my.Search;
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
				13:{'name':"-------",'x':375,'y':375},
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
    if (t.state == null){
      this.cont.innerHTML = '\
        <DIV class=ptentry><table><tr valign=bottom><TD class=xtab width=100 align=right>Type : </td><TD>\
        <SELECT id="srcType">\
          <OPTION value=0>Camps Barbares</option>\
          <OPTION value=1>Terres Sauvages</option>\
	      <OPTION value=2>Villes</option>\
        </select></td></tr>\
        </table>\
        <DIV id="srcOpts" style="height:80px"></div></div>\
        <DIV id="srcResults" style="height:400px; max-height:400px;"></div>';
      var psearch = document.getElementById ("pasrcType");
      m = '<TABLE><TR valign=middle><TD class=xtab width=100 align=right>Centre : &nbsp; X: </td><TD class=xtab>\
        <INPUT id="srchX" type=text\> &nbsp; Y: <INPUT id="srchY" type=text\>';
      m += '&nbsp;<span><select id="BOprovinceXY"><option>--provinces--</option>';
      for (var i in Provinces) {
	    m += '<option value="'+i+'">'+Provinces[i].name+'</option>';
      }
      m += '</select></span> &nbsp; <SPAN id=spInXY></span>';
	  m += '</td></tr><TR><TD class=xtab align=right>Distance : </td><TD class=xtab>entre <INPUT id=srcaDist size=4 value=0 /> et <INPUT id=srcDist size=4 value=10 /></td></tr>';
      m += '<TR><TD class=xtab></td><TD class=xtab><INPUT id=srcStart type=submit value="Lancer la recherche"/></td></tr>';
      m += '</table>';
      document.getElementById ('srcOpts').innerHTML = m;
      new CdispCityPicker ('srchdcp', document.getElementById ('spInXY'), true).bindToXYboxes(document.getElementById ('srchX'), document.getElementById ('srchY'));
      document.getElementById ('BOprovinceXY').addEventListener ('change', function() {
	  if (this.value >= 1) {
	      document.getElementById ('srchX').value = Provinces[this.value].x;
		document.getElementById ('srchY').value = Provinces[this.value].y;
		  document.getElementById ('srcDist').value = "75";
	  }
	  }, false); 
      document.getElementById ('srcStart').addEventListener ('click', t.clickedSearch, false);
      t.state = 1;
    }
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
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  },

  clickedSearch : function (){
    var t = my.Search;

    if (t.searchRunning){
      t.stopSearch ('RECHERCHE ANNULEE !');
      return;
    }
    t.opt.searchType = document.getElementById ('srcType').value;
    t.opt.startX = parseInt(document.getElementById ('srchX').value);
    t.opt.startY = parseInt(document.getElementById ('srchY').value);
    t.opt.maxDistance = parseInt(document.getElementById ('srcDist').value);
    t.opt.maxDistanceA = parseInt(document.getElementById ('srcaDist').value);
    errMsg = '';

    if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>749)
      errMsg = "X doit &ecirc;tre entre 0 et 749<BR>";
    if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>749)
      errMsg += "Y doit &ecirc;tre entre 0 et 749<BR>";
    if (isNaN (t.opt.maxDistanceA) ||t.opt.maxDistanceA<0)
     errMsg += "La distance mini doit &ecirc;tre sup&eacute;rieur &agrave; 0<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1)
      errMsg += "La distance maxi doit &ecirc;tre sup&eacute;rieur &agrave; 1<BR>";
    if (t.opt.maxDistance<=t.opt.maxDistanceA)
      errMsg += "La distance max doit &ecirc;tre sup&eacute;rieur &agrave; la distance mini<BR>";
    if(t.opt.maxDistanceA > 375)
       errMsg += "La distance max ne peut d&eacute;passer 375 ! au risque de p&ecirc;ter votre navigateur<BR>";
    if (errMsg != ''){
      document.getElementById('srcResults').innerHTML = '<FONT COLOR=#660000>ERREUR :</font><BR><BR>'+ errMsg;
      return;
    }

    t.searchRunning = true;
  document.getElementById ('srcStart').value = 'Stopper la recherche';
    m = '<DIV class=ptstat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=statSearched></div></td>\
        <TD class=xtab align=center><SPAN id=statStatus></span></td>\
        <TD class=xtab align=right width=125><DIV id=statFound></div></td></tr></table></div>\
      <TABLE width=100%><TR valign=top><TD><DIV id=divOutTab style="height:470px; max-height:470px; overflow-y:auto; width:420px;"></div></td>\
      <TD id="tddivOutOpts" width=100% height=100% style="background:#e0e0f0; height:100%; padding:5px"><DIV id=divOutOpts></div></td></tr><tr><td colspan=2><div id=BOdivKOCAttackExport style="position:absolute;background-color:white;height:470px; max-height:470px; overflow-y:auto; width:600px;display:none"></div></td><input type=checkbox id=ShowHideOpts>Voir/Cacher les options (permets d\'avoir le plein &eacute;cran)</tr></table>';
    document.getElementById('srcResults').innerHTML = m;
     //
     document.getElementById('ShowHideOpts').addEventListener ('click', function (){
		  if (document.getElementById("ShowHideOpts").checked) {
		  document.getElementById("tddivOutOpts").style.display="none";
		  document.getElementById("divOutTab").style.width="710px";
		  } else {
		  document.getElementById("tddivOutOpts").style.display="block";
		  document.getElementById("divOutTab").style.width="420px";
		  }
	  }, false);
     
    if (t.opt.searchType == 0)
      typeName = 'Camps Barbares';
    else if (t.opt.searchType == 1)
      typeName = 'Terres Sauvages';
	else 
	  typeName = 'Villes';

    m = '<CENTER><B>Recherche de '+ typeName +'<BR>\
        Centre : '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; Distance : '+ t.opt.maxDistanceA +' &agrave; '+ t.opt.maxDistance +'<BR></center>\
        <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>OPTIONS :</b><BR></td></tr>';
    if (t.opt.searchType == 1 || t.opt.searchType == 0) {
     m += '<TR><TD class=xtab align=right>Niveau Min. :</td><TD class=xtab> <INPUT id=filMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD class=xtab align=right>Niveau Max. :</td><TD class=xtab> <INPUT id=filMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
	}
    if (t.opt.searchType == 1){
      m += '<TR><TD class=xtab align=right>Type TS :</td><TD class=xtab align=right>\
            Woodlands<INPUT id=woodWild type=CHECKBOX'+ (Options.woodWild?' CHECKED':'') +'></td></tr>';
      m += '<TR><TD class=xtab align=right>Prairie/Lac<INPUT  id=foodWild type=CHECKBOX '+ (Options.foodWild?' CHECKED':'') +'></td>\
	       <TD class=xtab align=right>Montagne<INPUT id=mtnWild type=CHECKBOX '+ (Options.mtnWild?' CHECKED':'') +'></td></tr>';
      m += '<TR><TD class=xtab align=right>Plaine<INPUT id=plnWild type=CHECKBOX '+ (Options.plnWild?' CHECKED':'') +'></td>\
           <TD class=xtab align=right>Collines<INPUT id=hillWild type=CHECKBOX'+ (Options.hillWild?' CHECKED':'') +'></td></tr>';
      m += '<TR><TD class=xtab align=right>Libre Seulement :</td><TD class=xtab><INPUT id=filUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    } 
    if (t.opt.searchType == 1 || t.opt.searchType == 0) {
        m+= '<TR><TD class=xtab align=right>Trier Par :</td><TD class=xtab><SELECT id=filSortBy>\
          <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Niveau</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>';
          if (t.opt.searchType == 1) {
                m+= '<OPTION value="play" '+ (Options.srcSortBy=='play'?'SELECTED':'')  +'>Joueur</option>';
          m+= '<OPTION value="alli" '+ (Options.srcSortBy=='alli'?'SELECTED':'')  +'>Alliance</option>';
            }    
		  m+= '</select></td></tr>\
			<TR><TD class=xtab align=right>Coords :</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
			</table></div><BR><SPAN id=srchSizeWarn></span><DIV id=BOpbSrcExp></div>';
    } else {
			
		m+= '<TR><TD class=xtab align=right >Voir :</td><TD class=xtab align=left ><SELECT style="width: 135px" id=idSrchFilter>\
             <OPTION value=0>Toutes les villes</option>\
             <OPTION value=1>Hostile Seulement</option>\
	     <OPTION value=2>Sous la brume Seulement</option>\
	     <OPTION value=3>Allie Seulement</option>\
	     <OPTION value=4>Amis Seulement</option>\
	     <OPTION value=5>Neutre Seulement</option>\
	     <OPTION value=6>Sans alliance Seulement </option>\
             </select></td></tr>';
	
		m+= '<TR><TD class=xtab align=right>Trier Par :</td><TD class=xtab><SELECT id=filSortBy>\
          <OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Puissance</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
                  <OPTION value="play" '+ (Options.srcSortBy=='play'?'SELECTED':'')  +'>Joueur</option>\
        <OPTION value="alli" '+ (Options.srcSortBy=='alli'?'SELECTED':'')  +'>Alliance</option>\
        </select></td></tr>\
        <tr><TD class=xtab align=right>Puissance mini :</td><TD class=xtab><select id=filPuissance>\
         <option value="0" '+ (Options.filPuissance=='0'?'SELECTED':'')  +'>0</option>\
         <option value="500" '+ (Options.filPuissance=='500'?'SELECTED':'')  +'>500</option>\
         <option value="2500" '+ (Options.filPuissance=='2500'?'SELECTED':'')  +'>2 500</option>\
         <option value="10000" '+ (Options.filPuissance=='10000'?'SELECTED':'')  +'>10 000</option>\
         <option value="50000" '+ (Options.filPuissance=='50000'?'SELECTED':'')  +'>50 000</option>\
         <option value="100000" '+ (Options.filPuissance=='100000'?'SELECTED':'')  +'>100 000</option>\
         <option value="500000" '+ (Options.filPuissance=='100000'?'SELECTED':'')  +'>500 000</option>\
         </select></td></tr>\
         <tr><TD class=xtab align=right>Puissance max :</td><TD class=xtab><select id=filPuissanceMax>\
         <option value="500" '+ (Options.filPuissanceMax=='500'?'SELECTED':'')  +'>500</option>\
         <option value="2500" '+ (Options.filPuissanceMax=='2500'?'SELECTED':'')  +'>2 500</option>\
         <option value="10000" '+ (Options.filPuissanceMax=='10000'?'SELECTED':'')  +'>10 000</option>\
         <option value="50000" '+ (Options.filPuissanceMax=='50000'?'SELECTED':'')  +'>50 000</option>\
         <option value="100000" '+ (Options.filPuissanceMax=='100000'?'SELECTED':'')  +'>100 000</option>\
         <option value="500000" '+ (Options.filPuissanceMax=='100000'?'SELECTED':'')  +'>500 000</option>\
         <option value="1000000" '+ (Options.filPuissanceMax=='1000000'?'SELECTED':'')  +'>1 000 000</option>\
         <option value="100000000" '+ (Options.filPuissanceMax=='100000000'?'SELECTED':'')  +'>100 millions</option>\
         </select></td></tr>\
        <TR><TD class=xtab align=right>Coords :</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
         </table></div><BR><SPAN id=srchSizeWarn></span>';	
	}
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
    document.getElementById('foodWild').addEventListener ('change', function(){
        Options.foodWild = document.getElementById('foodWild').checked;
        saveOptions();
        t.dispMapTable ();
        }, false);
    document.getElementById('hillWild').addEventListener ('change', function(){
        Options.hillWild = document.getElementById('hillWild').checked;
        saveOptions();
        t.dispMapTable();
        }, false);
    document.getElementById('mtnWild').addEventListener ('change', function(){
        Options.mtnWild = document.getElementById('mtnWild').checked;
        saveOptions();
        t.dispMapTable();
        }, false);
    document.getElementById('plnWild').addEventListener ('change', function(){
        Options.plnWild = document.getElementById('plnWild').checked;
        saveOptions();
        t.dispMapTable();
        }, false);
    document.getElementById('woodWild').addEventListener ('change', function(){
        Options.woodWild = document.getElementById('woodWild').checked;
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

	document.getElementById('idSrchFilter').addEventListener ('change', function (){
        Options.citySrchFilter = (document.getElementById('idSrchFilter').value);
        saveOptions();
        t.dispMapTable ();
        }, false);

	document.getElementById('idSrchFilter').value = Options.citySrchFilter;
	
       
        document.getElementById('filPuissance').addEventListener ('change', function (){
        Options.filPuissance = parseInt(document.getElementById('filPuissance').value);
        saveOptions();
        t.dispMapTable ();
        }, false);
        document.getElementById('filPuissanceMax').addEventListener ('change', function (){
        Options.filPuissanceMax = parseInt(document.getElementById('filPuissanceMax').value);
        saveOptions();
        t.dispMapTable ();
        }, false);
	
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
    document.getElementById ('statStatus').innerHTML = 'Recherche sur '+ xxx +','+ yyy;
if (DEBUG_TRACE) logit (" 0 clickedSearch()... setTimeout ..:" + xxx +' , '+ yyy +' , '+ t.mapCallback.name);
    setTimeout (function(){Map.request (xxx, yyy, 15, t.mapCallback)}, MAP_DELAY);
  },

  dispMapTable : function (){
    var tileNames = ['Camps barbares', 'Prairie', 'Lac', 'Bois', 'Collines', 'Montagne', 'Plaine', 'Ville' ];
    var t = my.Search;
    var coordsOnly = document.getElementById('coordsOnly').checked;
if (DEBUG_TRACE) DebugTimer.start();
    function mySort(a, b){
      if (Options.srcSortBy == 'level'){
        if ((x = a[4] - b[4]) != 0)
          return x;
      }
	  if (Options.srcSortBy == 'might'){
        if ((x = b[10] - a[10]) != 0)
          return x;
      }
      if (Options.srcSortBy == 'alli'){
          
          if (a[11] < b[11]) return -1;
	      else if (a[11] == b[11]) return 0;
	       else return 1;
          
      }
        if (Options.srcSortBy == 'play'){
         
          if (a[9] < b[9]) return -1;
	      else if (a[9] == b[9]) return 0;
	       else return 1;
          
      }
      return a[2] - b[2];
    }

    dat = [];
    for (i=0; i<t.mapDat.length; i++){
      lvl = parseInt (t.mapDat[i][4]);
      type = t.mapDat[i][3];
      puissance = t.mapDat[i][10];
	  if (t.opt.searchType == 2 && type == 7 ) {
	  
	  switch(parseInt (Options.citySrchFilter)) {
                case 0:
                 if (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax) {
                  dat.push(t.mapDat[i]);
                 }
                 break;
                case 1:
                   if ((t.mapDat[i][12] == 'Hostile') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                case 2:
                   if ((t.mapDat[i][5]===true) && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                case 3:
                   if ((t.mapDat[i][12] == 'Ally') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                case 4:
                   if ((t.mapDat[i][12] == 'Friendly') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                case 5:
                   if ((t.mapDat[i][12] == 'Neutral') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                 case 6:
                   if ((t.mapDat[i][12] == 'unaligned') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
             }

		
	  } else {
       if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
        if (t.opt.searchType==0
            || (Options.woodWild==1 && type == 3)
            || (Options.hillWild==1 && type ==4)
            || (Options.mtnWild==1 && type==5)
            || (Options.plnWild==1 && type == 6)
            || (Options.foodWild==1 && (type==1 || type==2)))
          if (!Options.unownedOnly || t.mapDat[i][5]===false)
            dat.push (t.mapDat[i]);
        }
       }
    }
    document.getElementById('statFound').innerHTML = 'Trouv&eacute : '+ dat.length;
    if (dat.length == 0){
      m = '<BR><CENTER>Non trouv&eacute;</center>';
    } else {
      dat.sort(mySort);
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: SORT');
      if (coordsOnly)
        m = '<TABLE align=center id=srcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Location</td></tr>';
      else {
        if (t.opt.searchType == 0) {
			m = '<TABLE id=srcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Lieu</td><TD style="padding-left: 10px">Dist</td><TD style="padding-left: 10px;">Niv</td><TD style="padding-left: 10px;">Type</td></tr>';
		}
		if (t.opt.searchType == 1) {
			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Lieu</td><TD style="padding-left: 10px">Dist</td><TD style="padding-left: 10px;">Niv</td><TD style="padding-left: 10px;">Type</td><TD style="padding-left: 10px;">Joueur</td><td style="padding-left: 10px;">Puissance</td><td style="padding-left: 10px;">Alliance</td><td>Statut</td><td>Connexion</td></tr>';
		}
		if (t.opt.searchType == 2) {
			 m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Loc</td><TD >Dist</td><TD>Ville</td><TD>Proprio</td><TD>Puis.</td><td>Alliance </td><TD width=80% style="font-size:9px;">Plus info</td></tr>';
		}
	
	  }
	  var numRows = dat.length;
      if (numRows > 500 && t.searchRunning){
        numRows = 500;
        document.getElementById('srchSizeWarn').innerHTML = '<FONT COLOR=#600000>NOTE : Le tableau montre seulement 500 des '+ dat.length +' resultats jusqu\'a ce que la recherche soit termin&eacute;e.</font>';
      }
      for (i=0; i<numRows; i++){
        m += '<TR valign="top"';
		if (dat[i][12]) m += 'class="'+dat[i][12]+'"';
		
		if (coordsOnly) {
		   m += ' ><TD valign="top"><DIV>'+ dat[i][0] +','+ dat[i][1] +'</div></td></tr>';
        } else {
           m += ' ><TD valign="top"><DIV>\
	             <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ dat[i][0] +','+ dat[i][1] +')</a></div></td>';
   		  if (t.opt.searchType == 2) { 
			m += '<TD align="left"  valign="top"><DIV title="Eclaireur !" onclick="PTscout('+ dat[i][0] +','+ dat[i][1] +');return false;">'+ dat[i][2].toFixed(2) +'</a></td><TD align=left>'+ dat[i][8] +'</td><TD valign="top">'+dat[i][9]+'</td><TD valign="top">'+dat[i][10]+'</td><td>'+dat[i][11]+'</td><td>';
			if (dat[i][5]) {
			 m += '<DIV onclick="PTscout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A style="font-size:9px;" >Eclairer</a></div>';
			} else {
			 m += '<DIV onclick="PTpd(this, '+ dat[i][7] +')"><A style="font-size:9px;" >Details</a></div> <DIV style="" onclick="PTpd2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Tableau Honneur</a></div>\
			 		<DIV style="" onclick="PCpo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Statut</a></div>\
					<DIV style="" onclick="PCplo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Derniere Connexion</a></div>';
             m+= '</td></tr>';
            }
		  } else { 
           m += '<TD align=right  valign="top">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ tileNames[dat[i][3]];
             +'</td>';
           if (t.opt.searchType == 1) {
            if (dat[i][5]) {
             m += '<td>'+dat[i][9]+'<td>'+dat[i][10]+'</td><td>'+dat[i][11]+'</td>';
             
             if (dat[i][7] && dat[i][7]!=0) {
             m+='<td><DIV style="" onclick="PCpo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Statut</a></div></td><td><DIV style="" onclick="PCplo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Derniere Connexion</a></div></td>';
             } else {
             m+='<td>&nbsp;</td><td>&nbsp;</td>';
             }
             
            
            } else  {
             m +='<td colspan=5 style="text-align=center"><i><b>libre...</b></i>';
            }
		   }else{
            m+="<td></td>";
           }
            m +='</tr>';
		  }
		}
       }
      m += '</table>';
    }
    document.getElementById('divOutTab').innerHTML = m;
    dat = null;
  },

  mapDat : [],

  stopSearch : function (msg){
    var t = my.Search;
    document.getElementById ('statStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';
    document.getElementById ('srcStart').value = 'Lancer la recherche';
    document.getElementById('srchSizeWarn').innerHTML = '';
    if (t.opt.searchType==0 && document.getElementById('KOCAttackToggle')!=null){    
      document.getElementById('BOpbSrcExp').innerHTML = '<CENTER>'+ strButton20('Exporter le r&eacute;sultat', 'id=BOpbSrcDoExp') +'</center>'; 
      document.getElementById ('BOpbSrcDoExp').addEventListener ('click', t.exportKOCattack, false);
    }
    t.searchRunning = false;
  },
  
  
  clickedPlayerCheckOnline : function (span, uid){
          var t = my.AllianceList;
      	var s = my.Search;
          span.onclick = '';
          span.innerHTML = "recherche en cours...";
          t.fetchPlayerStatus (uid, function (r) {s.gotPlayerStatus(r, span, uid)});
        },
      
 clickedPlayerGetLastLogin : function (span, uid){
          var t = my.AllianceList;
      	var s = my.Search;
          span.onclick = '';
          span.innerHTML = "recherche en cours ...";
          t.fetchPlayerLastLogin (uid, function (r) {s.gotPlayerLastLogin(r, span)});
  },
  gotPlayerStatus : function (rslt, span,uid){
      var t = Tabs.AllianceList;
      if (!rslt.ok){
        span.innerHTML = rslt.errorMsg;
        return;
      }
  
      var p = rslt.data;
      if (p[uid] == true) {
        m = '<span style="color:green"><b>En Ligne!</b></span>';
      } else {
         m = '<span style="color:red"><b>Pas en ligne</b></span>';
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
        m = '<span style="color:black">'+lastLogin+'</span>';
      } else {
         m = '<span style="color:red">? '+lastLogin+'</span>';
      }  
      span.innerHTML = m + '';
  },
  
  exportKOCattack : function (){
     var t = my.Search;
     var bulkAdds = {};
     for (i=1; i<11; i++)
       bulkAdds['lvl'+ i] = [];
     for (i=0; i<t.mapDat.length; i++){
       var lvl = parseInt (t.mapDat[i][4]);
       if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel && t.mapDat[i][3]==0)
         bulkAdds['lvl'+ lvl].push({x:t.mapDat[i][0], y:t.mapDat[i][1]});
     }
     
     exportToKOCattackBO.doExport (bulkAdds, t.selectedCity);
  },
  
  mapCallback : function (left, top, width, rslt){
    function insertRow (x, y, msg){
      row = document.getElementById('srcOutTab').insertRow(-1);
      row.insertCell(0).innerHTML = x +','+ y;
      row.insertCell(1).innerHTML = distance (t.opt.startX, t.opt.startY, x, y);
      row.insertCell(2).innerHTML = msg;
    }
if (DEBUG_TRACE) logit (" 3 mapCallback()");
    var t = my.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('ERREUR : '+ rslt.errorMsg);
      return;
    }

    map = rslt.data;
    var userInfo = rslt.userInfo;
    var alliance = rslt.allianceNames;

    for (k in map){
      if (t.opt.searchType==0 && map[k].tileType==51 && !map[k].tileCityId ) {  // if barb
        type = 0;
      } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) {
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11)
          type = 2;
        else
          type = (map[k].tileType/10) + 1;
      } else if (t.opt.searchType==2 && map[k].tileCityId >= 0 && map[k].tileType > 50 && map[k].cityName) {
		  type = 7;
      } else {
        continue;
      }
      dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      if (dist <= t.opt.maxDistance && dist >= t.opt.maxDistanceA){
		  if (t.opt.searchType==2) {
			var isMisted = map[k].tileUserId == 0 || false;		
			var uu = 'u'+map[k].tileUserId;
			var aU = 'inconnu';
			var aD = 'inconnu';
			var mightU = 0;
			var nameU = 'inconnu';
			if (isMisted) {
				nameU = 'Brume';
				mightU = 0; 
			} else {
				if (userInfo[uu] ) { // Corrects a problem with hung search.
					nameU = "<a onclick=getInfoForAnUser('"+ map[k].tileUserId +"');>"+ userInfo[uu].n +"</a>";
					mightU = userInfo[uu].m; 
					aD = getDiplomacy2(userInfo[uu].a);
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
			var uu = 'u'+map[k].tileUserId;
			var aU = 'inconnu';
			var aD = 'inconnu';
			var nameU = 'inconnu';
			var mightU = 0;
			if (map[k].misted) {
				nameU = 'Sous la Brume';
			}else {
			 if (userInfo[uu] ) {
			   var nameU = "<a onclick=getInfoForAnUser('"+ map[k].tileUserId +"');>"+ userInfo[uu].n +"</a>";
			   mightU = userInfo[uu].m; 
			   aD = getDiplomacy2(userInfo[uu].a);
					if ( alliance && alliance['a'+userInfo[uu].a] ) {
						aU = alliance['a'+userInfo[uu].a];
					}
			 }else {
			   var nameU = 'inconnu';
			 }
			}	
			t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, map[k].tileCityId, map[k].tileUserId, map[k].cityName, nameU, mightU, aU, aD]);       
		}
			++t.tilesFound;
       }   
    }
    t.tilesSearched += (15*15);
    document.getElementById('statSearched').innerHTML = 'Trouv&eacute; : '+ t.tilesSearched;
    t.dispMapTable();

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        t.stopSearch ('Fini !');
        return;
      }
    }

    var x = t.normalizeCoord(t.curX);
    var y = t.normalizeCoord(t.curY);
    document.getElementById ('statStatus').innerHTML = 'Recherche sur '+ x +','+ y;
    //if (DEBUG_TRACE) logit (" 0 mapCallback()... setTimeout ..:" + x +' , '+ y +' , '+ t.mapCallback.toString().substr (0,50));
    setTimeout (function(){Map.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
  },
};


/*******************   KOC Map interface ****************/
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
***/
  generateBlockList : function(left, top, width) {
    var width5 = parseInt(width / 5);
    var bl = [];

    for (x=0; x<width5; x++){
      xx = left + (x*5);
      if (xx > 745)
        xx -= 750;
      for (y=0; y<width5; y++){
        yy = top + (y*5);
        if (yy > 745)
          yy -= 750;
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
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
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


/******** Export to KOC Attack **********/  

var exportToKOCattackBO = {
  troops : {},  
  
  init : function (){
      var t = exportToKOCattackBO;
      for (var b=1; b<11; b++){
        t.troops['b'+ b] = [];
        for (var trp=0; trp<12; trp++){
          t.troops['b'+ b][trp] = 0;
        }
      }
     
      var s = GM_getValue ('atkTroops_'+ getServerId(), null);
      if (s != '' && s!=null){
        var trp = JSON2.parse(s);
        // alert('4');
        for (var b=1; b<11; b++){
          if (trp['b'+ b] && trp['b'+ b].length == 12)
            t.troops['b'+ b] = trp['b'+ b];
        }
      }
      window.addEventListener('unload', t.onUnload, false);
  },
  
  onUnload : function (){
    var t = exportToKOCattackBO;
    GM_setValue ('atkTroops_'+ getServerId(),  JSON2.stringify(t.troops));
  },
  
  doExport : function (coordList, city){
    var t = exportToKOCattackBO;
    var popExp = null;
    var cList = coordList;
    var curLevel = 0;
    var city = city;
    var troopDef = [
      ['Ravil', 1],
      ['Wagon', 9],
      ['Archers', 6],
      ['Cavalerie', 7],
      ['Lourds', 8],
      ['Baliste', 10],
    ];
    var divKOCAttackExport=document.getElementById('BOdivKOCAttackExport');
    divKOCAttackExport.style.display='block';
    divKOCAttackExport.style.border='1px solid #000';
     divKOCAttackExport.style.top='100px';
      divKOCAttackExport.style.left='50px';
     var m = '<DIV id=BOdragExport class=ptstat><table width="100%" cellspacing="0" border=0><tr><td class=ptstat>Exporter les barbares directement dans KOC Attack</td><td id="idp_ExportX" onmouseover="this.style.cursor=\'pointer\'" style="color: rgb(255, 255, 255); background: none repeat scroll 0% 0% rgb(85, 85, 85); padding-left: 5px; padding-right: 5px; cursor: pointer;" valign="middle" align="right">X</td></tr></table></div><BR><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPadNW>\
      <TR style="font-weight:bold; background-color:white"><TD>Type cible</td><TD style="padding:1px" align=center>#<BR>cibles</td><TD width=17></td>';
    for (var i=0; i<troopDef.length; i++)
      m += '<TD>'+ troopDef[i][0] +'</td>';
    m += '</tr>';
    for (var b=1; b<11; b++){
      m += '<TR><TD>Barb niv '+ b +'</td><TD align=right>'+ coordList['lvl'+b].length  +'&nbsp; &nbsp;</td><TD></td>'; 
      for (var td=0; td<troopDef.length; td++)
        m += '<TD><INPUT id=ptET_'+ b +'_'+ troopDef[td][1] +' type=text size=4 value="'+ t.troops['b'+ b][troopDef[td][1]-1] +'"></td>';
      m += '<TD width=90%><SPAN class=boldRed id=ptETerr_'+ b +'></span></tr>';
    } 
    m += '</table>';
    var isKOCattack = !(document.getElementById('KOCAttackToggle') == null);
    
    //TODO: 'RESET VALUES' button ?
    if (isKOCattack){
      m += '<BR><CENTER>'+ strButton20('Ajouter les coordonn&eacute;es dans KOC Attack', 'id=pbSrcDoBA') +'</center>';
    } else {
      m += 'KOC Attack n\'est pas lanc&eacute, impossible d\'exporter';
    } 
    m += '<CENTER><DIV style="width:70%" id=pbSrcExpResult></DIV></center>'; 
    divKOCAttackExport.innerHTML =  m;
    new CWinDrag (document.getElementById('BOdragExport'), divKOCAttackExport, true);
     document.getElementById('idp_ExportX').addEventListener ('click', function() { 
      document.getElementById('BOdivKOCAttackExport').style.display="none";
      document.getElementById('BOdivKOCAttackExport').innerHTML =  "";
     }, false);
    for (var b=1; b<11; b++)
      for (var td=0; td<troopDef.length; td++)
        document.getElementById('ptET_'+ b +'_'+ troopDef[td][1]).addEventListener ('change', validate, false);
    
    //divKOCAttackExport.innerHTML = '<CENTER><B>Exportation Boite a Outils</b></center>';
    if (isKOCattack)    
      document.getElementById ('pbSrcDoBA').addEventListener ('click', doBulkAdd, false);
    //popExp.show(true);
         
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
      if (isNaN(x) || x<0 || x>100000){
        e.target.style.backgroundColor = 'red';
        document.getElementById('ptETerr_'+ b).innerHTML = 'Entr&eacute;e invalide';
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
        document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
      if (tot>100000)
        document.getElementById('ptETerr_'+ b).innerHTML = 'Trop de troupes';
    }
      
    function doBulkAdd (){
      for (var b=1; b<11; b++){
        if (document.getElementById('ptETerr_'+ b).innerHTML != '')
          return;
        var tot = 0;
        for (var td=0; td<troopDef.length; td++)
          tot += t.troops['b'+b][troopDef[td][1]-1];
        if (tot<1 && cList['lvl'+ b].length>0){
          document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
          return; 
        } else if (tot>100000) {
          document.getElementById('ptETerr_'+ b).innerHTML = 'Trop de troupes';
          return; 
        }
      }    
      document.getElementById('pbSrcExpResult').innerHTML = '';
      setTimeout(function() { doNextLevel (); }, 100);
    }
    
    function endBulkAdd (msg){
      unsafeWindow.Modal.hideModalAll(); 
      curLevel = 0;
      document.getElementById('pbSrcExpResult').innerHTML += msg;
    }
    
    function doNextLevel (){
      while ( curLevel<10 && cList['lvl'+ ++curLevel].length==0)
        ;
      if (curLevel>=10){
        unsafeWindow.Modal.hideModalAll(); 
	curLevel = 0;
        document.getElementById('pbSrcExpResult').innerHTML += "Fini !";
        //setTimeout(function() { divKOCAttackExport.innerHTML=""; }, 1000);
        return;
      }
      setTimeout(function() {
       unsafeWindow.Modal.hideModalAll(); 
       unsafeWindow.modal_attack(4,0,0);
       new CwaitForElement ('BulkAddAttackDiv', 5000, e_attackDialog );
      }, 500);
    }
        
    function e_attackDialog (tf){
      if (!tf){
        endBulkAdd ('<SPAN class=boldRed>ERREUR: impossible d\'ouvrir la page attaque</span>');
        return;  
      } 
      var div = searchDOM (document.getElementById('BulkAddAttackDiv'), 'node.tagName=="DIV" && node.style.display=="none"', 10);
      if (div==null){
        endBulkAdd ('<SPAN class=boldRed>ERREUR: Unexpected attack dialog format (1).</span>');
        return;  
      }
      var ta = searchDOM (div, 'node.tagName=="TEXTAREA"', 10);
      var but = searchDOM (div, 'node.tagName=="A"', 10);
      if (ta==null || but==null){
        endBulkAdd ('<SPAN class=boldRed>ERREUR: Unexpected attack dialog format (2).</span>');
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
      
        var m = '';
        var list = cList['lvl'+ (curLevel)];
        for (i=0; i<list.length; i++)
          m += list[i].x +','+ list[i].y +'\n';
        ta.value = m;
      clickWinBO(unsafeWindow, but, 'click');
      unsafeWindow.Modal.hideModal();
      //alert('ici');
      //document.getElementById('pbSrcExpResult').innerHTML += 'Ajout de '+ list.length +' coordonnees sur '+ city.name +'<BR>';
      //alert('la');
      setTimeout (doNextLevel, 1000);
    }    
  },
}

function clickWinBO(win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
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

/*************************************** Train Tab ***********************************************/

my.Train = {
  cont : null,
  timer : null,
  state : null,
  stats : {},
  selectedCity : {},
  sourceCity : {},
  destinationCity : {},

  init : function (){
    var t = my.Train;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.Train;
    return t.cont;
  },

  hide : function (){
    var t = my.Train;
    clearTimeout (t.timer);
  },
  
  show : function (){
    var t = my.Train;
    clearTimeout (t.timer);
    if (t.state == null){
      s = "<DIV id=trainTopSelect >\
        <DIV class=ptstat>Former des troupes et construire des d&eacute;fenses sur les remparts</div><DIV style='height:10px'></div><DIV class=ptentry>\
        <DIV style='text-align:center; margin-bottom:10px;'>Ville : &nbsp; <span id=ptspeedcity></span></div>\
        <TABLE class=ptTab width=100%><TR valign=top><TD width=50%>\
        <TABLE align=center><TR><TD align=right>Type de troupe : </td><TD colspan=2>\
        <SELECT id=ptttType>";
         for (r=1; r<13; r++){
         s+= "<option value='"+r+"'>"+unsafeWindow.unitcost['unt'+r][0]+"</option>";
        } 
       s+= " </select> <br> (max <span id=ptttSpMax></span>)</td></tr>\
        <TR><TD align=right>par slot de </td><TD><INPUT id='ptttInpPS' size=5 type='text' value='0'\></td>\
          <TD><INPUT id='ptttButMaxPS' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxPS>0</span>)</td></tr>\
        <TR><TD align=right>sur</td><TD><INPUT id='ptttInpSlots' size=2 type='text' value='1'\> slots</td>\
          <TD width=75%><INPUT id='ptttButMaxSlots' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxSlots>1</span>)</td></tr>\
        <TR><TD align=right valign=top>Utiliser la force de travail : </td><TD colspan=2><INPUT type=CHECKBOX id=chkPop"+ (Options.maxIdlePop?' CHECKED ':'') +"></td></tr>\
        <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='ptttButDo' type=submit value='Former'\></td></tr>\
        </table></td><TD width=20></td><TD style='border-left:solid 2px;' width=50% align=center>\
        <TABLE align=center><TR><TD align=right>Type de d&eacute;fenses : </td><TD colspan=2>\
        <SELECT id=pttdType>\
          <option value='53'>Arbal&egrave;tes mont&eacute;es</option>\
          <option value='55'>Tr&eacute;buchet D&eacute;fensif</option>\
          <option value='60'>Pi&egrave;ge</option>\
          <option value='61'>Chausse-trape</option>\
          <option value='62'>Palissade &agrave; Pointes</option>\
        </select> <br> (<span id=pttdSpMax></span>)</td></tr>\
        <TR><TD align=right># par slot de </td><TD><INPUT id='pttdInpPS' size=5 type='text' value='0'\></td>\
          <TD><INPUT id='pttdButMaxPS' type=submit value='max'\> (max <span id=pttdSpMaxPS>0</span>)</td></tr>\
        <TR><TD align=right># sur </td><TD><INPUT id='pttdInpSlots' size=2 type='text' value='1'\> slots</td>\
          <TD width=75%><INPUT id='pttdButMaxSlots' type=submit value='max'\> (max <span id=pttdSpMaxSlots>1</span>)</td></tr>\
        <TR align=center><TD colspan=3><SPAN id=pttdSpace></span></td></tr>\
        <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='pttdButDo' type=submit value='Construire'\></td></tr></table>\
        </td></tr></table></div></div>\
        <TABLE align=center width=425 class=ptTab><TR><TD><div id=ptTrainStatus style='overflow-y:auto; max-height:70px; height: 70px;'></div></td></tr></table>\
        <div style='height: 315px; background: #e8ffe8; max-height:315px; overflow-y:auto'>\
        <TABLE width=100% class=ptTab><TR><TD colspan=3><DIV id=divSTtop></div></td></tr>\
        <TR><TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>File d\'attente de troupes &nbsp; (<SPAN id=statTTtot></span>)</b><BR><HR></div><DIV id=divSTleft style='overflow-y: auto; height:210px; max-height:210px'></div></td>\
          <TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>File d\'attente de d&eacute;fenses &nbsp; (<SPAN id=statDTtot></span>)</b><BR><HR></div><DIV id=divSTright style='overflow-y: auto; height:210px; max-height:210px'></div></td></tr>\
        </div></div>";
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
      t.state = 1;
    }

    t.displayCityStats();
    t.changeTroopSelect();
    t.changeDefSelect();
    t.timer = setTimeout (t.show, 2000);
  },


/*******  TROOPS  ******/  
  
  updateTopTroops : function (){
    var t = my.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TTspMax.innerHTML = t.stats.MaxTrain;
    t.TTspMaxSlots.innerHTML = t.stats.barracks - t.stats.queued;
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTspMaxPS.innerHTML = 0;
    else
      t.TTspMaxPS.innerHTML = parseInt(t.stats.MaxTrain / slots);
  },
      
  
  clickTroopMaxPS : function (){
    var t = my.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTinpPerSlot.value = 0;
    else
      t.TTinpPerSlot.value = parseInt(t.stats.MaxTrain / slots);
  },

  clickTroopMaxSlots : function (){
    var t = my.Train;
    t.TTinpSlots.value = t.stats.barracks - t.stats.queued;
  },
  
  clickCitySelect : function (city){
    var t = my.Train;
    t.selectedCity = city;
    t.lastQueString = null;   
    t.lastDQueString = null;   
    t.displayCityStats ();
    t.changeTroopSelect();
    t.changeDefSelect();
  },
  
  clickCheckIdlePop : function (){
    var t = my.Train;
    if (document.getElementById ('chkPop').checked)
      Options.maxIdlePop = true;
    else
      Options.maxIdlePop = false;
    saveOptions ();
    t.displayCityStats ();
    t.changeTroopSelect ();
  },
  limitingFactor : null,
  changeTroopSelect : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TTselType.value;
    t.lastTroopSelect = id;
    t.limitingFactor = null;
    var uc = unsafeWindow.unitcost['unt'+id];
    var max = 9999999999;
    if ( (t.stats.food / uc[1]) < max){
      max = t.stats.food / uc[1];
      t.limitingFactor = 'food';
    }
    if ( (t.stats.wood / uc[2]) < max){
      max = t.stats.wood / uc[2];
      t.limitingFactor = 'wood';
    }
    if ( (t.stats.stone / uc[3]) < max){
      max = t.stats.stone / uc[3];
      t.limitingFactor = 'stone';
    }
    if ( (t.stats.ore / uc[4]) < max){
      max = t.stats.ore / uc[4];
      t.limitingFactor = 'ore';
    }
    if ( (t.stats.idlePop / uc[6]) < max){
      max = t.stats.idlePop / uc[6];
      t.limitingFactor = 'pop';
    }    t.stats.MaxTrain = parseInt (max);
    if (t.stats.MaxTrain < 0)
      t.stats.MaxTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxTrain = 0;
          t.limitingFactor = null;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxTrain = 0;
          t.limitingFactor = null;
          break;
        }
      }
    }
    /*if (t.limitingFactor){
      document.getElementById('ptttr_'+ t.limitingFactor).className = 'boldRed';
    }  */
    t.updateTopTroops();
  },

  clickTroopDo : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TTselType.value;
    var perSlot = parseInt(t.TTinpPerSlot.value, 10);
    var numSlots = parseInt(t.TTinpSlots.value, 10);
    
    t.displayCityStats ();
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Nombre de troupes par slot incorrect (doit etre > 0)</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Impossible de former autant de troupes ! (le max est de '+ t.stats.MaxTrain +')</font>';
      return;
    }
    if (numSlots<1 || numSlots>t.stats.barracks - t.stats.queued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Nombre incorrect de slots.</font>';
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
    var t = my.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TDspMax.innerHTML = 'max:'+ t.stats.MaxDefTrain +'&nbsp; actuel:'+ t.stats.defOwned;   
    t.TDspMaxSlots.innerHTML = t.stats.wallLevel-t.stats.Dqueued;
    if (slots<1)
      t.TDspMaxPS.innerHTML = 0;
    else
      t.TDspMaxPS.innerHTML = parseInt(t.stats.MaxDefTrain / slots);

    t.TDspSpace.innerHTML = 'Niveau du rempart : <B>'+ t.stats.wallLevel +'</b><BR>D&eacute;fense des Remparts : '+ (t.stats.wallSpaceUsed+t.stats.wallSpaceQueued)  +'/<B>'+ t.stats.wallSpace +'</b><BR>\
        D&eacute;fense des Champs : '+ (t.stats.fieldSpaceUsed+t.stats.fieldSpaceQueued) +'/<B>'+ t.stats.fieldSpace +'</b>';
  },

  changeDefSelect : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TDselType.value;
    t.lastDefSelect = id;
    t.stats.defOwned = parseInt(Seed.fortifications['city' + cityId]['fort'+id]);    
    var uc = unsafeWindow.fortcost['frt'+id];
    var max = 9999999999;
    if ( (t.stats.food / uc[1]) < max)
      max = t.stats.food / uc[1];
    if ( (t.stats.wood / uc[2]) < max)
      max = t.stats.wood / uc[2];
    if ( (t.stats.stone / uc[3]) < max)
      max = t.stats.stone / uc[3];
    if ( (t.stats.ore / uc[4]) < max)
      max = t.stats.ore / uc[4];
    if ( (t.stats.idlePop / uc[6]) < max)
      max = t.stats.idlePop / uc[6];
    t.stats.MaxDefTrain = parseInt (max);
    if (t.stats.MaxDefTrain < 0)
      t.stats.MaxDefTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxDefTrain = 0;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxDefTrain = 0;
          break;
        }
      }
    }

    var spaceEach = parseInt(unsafeWindow.fortstats["unt"+ id][5]);
    if (id<60)
      var spaceAvail = t.stats.wallSpace - t.stats.wallSpaceUsed - t.stats.wallSpaceQueued;
    else
      var spaceAvail = t.stats.fieldSpace - t.stats.fieldSpaceUsed - t.stats.fieldSpaceQueued;
    if ( t.stats.MaxDefTrain * spaceEach > spaceAvail)
      t.stats.MaxDefTrain = parseInt(spaceAvail / spaceEach);
    
    t.updateTopDef();
  },
  
  clickDefMaxPS : function (){
    var t = my.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (slots<1)
      t.TDinpPerSlot.value = 0;
    else
      t.TDinpPerSlot.value = parseInt(t.stats.MaxDefTrain / slots);
  },

  clickDefMaxSlots : function (){
    var t = my.Train;
    t.TDinpSlots.value = t.stats.wallLevel-t.stats.Dqueued;
  },
    
  clickDefDo : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TDselType.value;
    var perSlot = parseInt(t.TDinpPerSlot.value, 10);
    var numSlots = parseInt(t.TDinpSlots.value, 10);
    
    t.displayCityStats ();
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Le nombre d\'unit&eacute; par slot doit &ecirc;tre au dessus de 0.</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxDefTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Impossible de former, trop d\'unit&eacute; (le max est de '+ t.stats.MaxDefTrain +')</font>';
      return;
    }
    if (numSlots<1 || numSlots > t.stats.wallLevel-t.stats.Dqueued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Nombre de slots incorrecte.</font>';
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
    var t = my.Train;
    try {
      t.displayCityStats();
      if (errMsg){
        t.dispTrainStatus ('<font color=#550000><B>ERREUR : '+ errMsg +'</b></font><BR>');
        t.setBusy(false);
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.dispTrainStatus ('<B>File d\'attente d&eacute;fenses termin&eacute;e.</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Construction '+ cmd[2] +' '+  fortNamesShort[cmd[1]] +'<BR>');
          doDefTrain ( cityId, cmd[1], cmd[2], 
          function(errMsg){
            setTimeout(function (){my.Train.doDefQueue(cityId, que, errMsg);}, (Math.random()*3500)+1500);
          } );
      }
    } catch (err) {
      //logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>PROGRAMME ERREUR : '+ err.message +'</font><BR>');
      t.setBusy(false);
    }
  },
  

  setBusy : function (tf){
    var t = my.Train;
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
    var t = my.Train;
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
    
    // Consommation en ressource suivant le nombre d'unité choissi 
    // type de troupes : t.TDselType
    cost = unsafeWindow.unitcost['unt'+t.TTselType.value];
    nbunit=t.TTinpPerSlot.value*t.TTinpSlots.value;
    consoFood = cost[1] * nbunit;
    styleFood="";stylePop="";styleWood="";styleOre="";styleStone="";
    if (consoFood>t.stats.food) styleFood='style="color:#E30;font-weight:bold;"';
    consoOre = cost[4] * nbunit;
    if (consoOre>t.stats.ore) styleOre='style="color:#E30;font-weight:bold;"';
    consoStone = cost[3] * nbunit;
    if (consoStone>t.stats.stone) styleStone='style="color:#E30;font-weight:bold;"';
    consoWood = cost[2] * nbunit;
    if (consoWood>t.stats.wood) styleWood='style="color:#E30;font-weight:bold;"';
    consoPop = cost[6] * nbunit;
    if (consoPop>t.stats.idlePop) stylePop='style="color:#E30;font-weight:bold;"';
    var m = '<CENTER><B>'+ Cities.byID[cityId].name +' &nbsp;\
       <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ Cities.byID[cityId].x +','+ Cities.byID[cityId].y +')</a></b></center><HR>';
       
    m += '<TABLE class=ptTab width=100%><TR align=center>\
        <TD width=8%><B>Ravi:</b></td><TD width=8%><B>Mili:</b></td><TD width=8%><B>Ecla:</b></td>\
        <TD width=8%><B>Piqu:</b></td><TD width=8%><B>Pala:</b></td><TD width=8%><B>Arch:</b></td>\
        <TD width=8%><B>Cav:</b></td><TD width=8%><B>CavL:</b></td><TD width=8%><B>Wago:</b></td>\
        <TD width=8%><B>Bali:</b></td><TD width=8%><B>Beli:</b></td><TD width=8%><B>Cata:</b></td><tr>';
		
 m += '<TR align=center><TD width=8%>'+Seed.units['city'+cityId]['unt1']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt2']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt3']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt4']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt5']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt6']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt7']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt8']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt9']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt10']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt11']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt12']+'</td><tr></table>';
   
       
    m += '<TABLE class=ptTab width=100%><TR align=center>\
        <td width=15%>&nbsp;</td><TD width=14%><B>Or :</b></td><TD width=15%><B>Nourriture :</b></td><TD width=14%><B>Bois :</b></td><TD width=14%><B>Pierre :</b></td><TD width=14%><B>Minerais :</b></td><TD width=14%><B>Pop. Inactive :</b></td></tr>\
      <TR align=center><td><b>Stock Actuel</b></td><TD>'+ addCommasInt(t.stats.gold) +'</td><TD>'+ addCommasInt(t.stats.food) +'</td><TD>'+ addCommasInt(t.stats.wood) +'</td><TD>'+ addCommasInt(t.stats.stone) +'</td><TD>'+ addCommasInt(t.stats.ore) +'</td>\
         <TD>'+ addCommasInt(t.stats.idlePop) +'</td></tr>\
        <tr align=center><td width=15%>Stock Requis<br>(formation)</td><td>&nbsp;</td><td '+styleFood+'>'+addCommasInt(consoFood)+'</td><td '+styleWood+'>'+addCommasInt(consoWood)+'</td><td '+styleStone+'>'+addCommasInt(consoStone)+'</td><td '+styleOre+'>'+addCommasInt(consoOre)+'</td>\
        <TD '+stylePop+'>'+ addCommasInt(consoPop)+'</td></tr>\
        </table><BR>';
       // A FAIRE : mettre stat armée ici
        
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
      m = '<TABLE align=center class=ptTab>';
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
            param1=i; // numéro de position dans la fil d'attente
            param2=cityId; // id de la ville
            param3=q[i][0]; // Type de trouoe
            param4=q[i][1]; // Qte troupe
            param5=end; // debut
            param6=start; // fin
            param7=actual; // duree
          m += '<TR align=right><td width=35 align=center><a onclick="cancelTraining('+param1+','+param2+','+param3+','+param4+','+param5+','+param6+','+param7+');return false;" href="javascript:void(0);"><img src="http://cdn1.iconfinder.com/data/icons/musthave/16/Remove.png" border=0 title="Annuler la formation"></a></td><TD>'+ q[i][1] +' </td><TD align=left> '+ unsafeWindow.unitcost['unt'+q[i][0]][0];
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
    m = t.stats.barracks +' casernes';
    if (t.stats.queued > 0)
      m += ', '+ t.stats.queued +' slots';
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
      m = '<TABLE align=center class=ptTab>';
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
          m += '<TR align=right><TD>'+ q[i][1] +' </td><TD align=left> '+ fortNamesShort[q[i][0]];
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
    m = t.stats.Dqueued +' slots';
    if (totTime > 0)
      m += ', '+ unsafeWindow.timestr(totTime);
    document.getElementById ('statDTtot').innerHTML = m;
  },

  dispTrainStatus : function (msg){
    var t = my.Train;
    t.divTrainStatus.innerHTML = msg + t.divTrainStatus.innerHTML;
  },

  doQueue : function (cityId, que, errMsg){
    var t = my.Train;
    try {
      t.displayCityStats();
      if (errMsg){
        t.dispTrainStatus ('<font color=#550000><B>ERREUR : '+ errMsg +'</b></font><BR>');
        t.setBusy(false);
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.dispTrainStatus ('<B>File d\'attente des troupes termin&eacute;e.</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Formation '+ cmd[2] +' '+  unsafeWindow.unitcost['unt'+cmd[1]][0] +'<BR>');
        //doTrain (cityId, cmd[1], cmd[2], function(errMsg){my.Train.doQueue(cityId, que, errMsg);} );
            doTrain (cityId, cmd[1], cmd[2], 
          function(errMsg){
           setTimeout(function (){my.Train.doQueue(cityId, que, errMsg);}, (Math.random()*3500)+1500 );
          }
        );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>PROGRAME ERREUR : '+ err.message +'</font><BR>');
      t.setBusy(false);
    }
  },
}

/*************************************** OVERVIEW TAB ************************************************/

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
    GMTclock.span.innerHTML = '<div style=" height:15px; position:absolute; top:29px; left:610px; background-color:#FC6;border:#000 solid thin; padding-top: 0px;padding-right: 4px;padding-bottom: 1px; padding-left: 4px;font-weight:100; color:#000; font-size:12px; z-index:50000;">  '+ now.toLocaleFormat('%H:%M:%S') +' GMT </div>';

  },
}


/*********************************** Test TAB ***********************************/
myBO.Test = {
  tabOrder: 25,
  tabDisabled : !ENABLE_TEST_TAB,         // if true, tab will not be added or initialized
  tabLabel : 'Test',
  myDiv : null,

   init : function (){    // called once, upon script startup
    this.myDiv = document.createElement('div');
    return this.myDiv;
  },

  hide : function (){
    var t = myBO.Test;
  },
  getContent : function (){
      return myBO.Test.myDiv;
  },
  show : function (){
     var t = myBO.Test;
      var m = '<TABLE><TR><TD align=right>Eclaireur : </td><TD><INPUT type=checkbox id=pcfakeIsScout></td></tr>\
          <TR><TD align=right>TS : </td><TD><INPUT type=checkbox id=pcfakeIsWild></td></tr>\
          <TR><TD align=right>Faux Rapport : </td><TD><INPUT type=checkbox id=pcfakeFalse></td></tr>\
          <TR><TD align=right>Secondes : </td><TD><INPUT type=text size=4 value=300 id=pcfakeSeconds></td></tr>\
          <TR><TD align=right>Nb Miliciens : </td><TD><INPUT type=text size=6 value=5000 id=pcfakeMilitia></td></tr>\
          <TR><TD colspan=2 align=center><INPUT id=pctestSendMarch type=submit value="Fausse Attaque" \></td></tr></table>\
          <BR><DIV id=pctestDiv style="background-color:#ffffff; maxwidth:675; maxheight:350px; height:350px; overflow-y:auto;"></div>';
      this.myDiv.innerHTML = m;
      document.getElementById('pctestSendMarch').addEventListener ('click', t.clickFakeAttack, false);
  },

  writeDiv : function (msg){
    var t = my.Test;
    if (t.state != null)
      document.getElementById('pctestDiv').innerHTML = msg;
  },

  addDiv : function (msg){
    var t = my.Test;
    if (t.state != null)
      document.getElementById('pctestDiv').innerHTML += msg;
  },
  
  createFakeAttack : function (cityNum, isScout, isWild, isFalse, secs, numMilitia){
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
    march.unts.u3 = 1
    march.unts.u2 = numMilitia
    march.pid = 1234567
    march.score = 9
    march.mid = marchId.substr(1);
    march.players = {}
    march.players.u1234567 = {}
    march.players.u1234567.n = 'M. Test';
    march.players.u1234567.t = 60
    march.players.u1234567.m = 10000000
    march.players.u1234567.s = 'M';
    march.players.u1234567.w = 1
    march.players.u1234567.a = 1
    march.players.u1234567.i = 5
    Seed.queue_atkinc[marchId] = march;
    Seed.players.u1234567 = march.players.u1234567;
  },

  clickFakeAttack : function (){
    var t = myBO.Test;
    var isScout = document.getElementById('pcfakeIsScout').checked;
    var isWild = document.getElementById('pcfakeIsWild').checked;
    var isFalse = document.getElementById('pcfakeFalse').checked;
    var secs = parseInt(document.getElementById('pcfakeSeconds').value);
    var mil = parseInt(document.getElementById('pcfakeMilitia').value);
    t.createFakeAttack (0, isScout, isWild, isFalse, secs, mil);
  },
}

/****************************  Script Tab   ******************************/
myBO.map = {
  tabOrder : 35,                    // order to place tab in top bar
  tabLabel : 'Map',            // label to show in main window tabs
  cont : null,
  timer : null,
  forumlink :  'http://koc.dunno.com/index.sjs?f=ListServers', 
  
  // 
  
  init : function (){    // called once, upon script startup
   this.cont = document.createElement('div');
   return this.cont;
  },
  getContent : function (){
      return myBO.map.cont;
  },
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = myBO.map;
    mainPop2.div.style.width = 749 + 'px';
    mainPop2.div.style.heigth = 350 + 'px'
  },
  
  show : function (){         // called whenever this tab is shown
    var t = myBO.map;
    try {
     var numdo=unsafeWindow.domainName.substr(unsafeWindow.domainName.length-3);
     t.forumlink='http://koc.dunno.com/index.sjs?f=KocMapViewer&server_id='+numdo;
    } catch(e) {
    
    }
    cont.innerHTML = '<CENTER><iframe src="'+ t.forumlink +'" width="100%" height="550" name="board_in_a_box"> </iframe> <BR></center>';
    mainPop2.div.style.width = 1110 + 'px';
    mainPop2.div.style.heigth = 550 + 'px'
  },
}

myBO.Overview = {
 
  cont : null,
  displayTimer : null,
  checkBox:null,
  
  checkBox1:null,
  Overview : function (){
  },

  init : function (){
    this.cont = document.createElement('div');
    return this.cont;
  },

  getContent : function (){
    return myBO.Overview.cont;
  },

  hide : function (){
    clearTimeout (myBO.Overview.displayTimer);
  },

  show : function (){
    var rownum = 0;
    var totalentre = 0;  
    var t = myBO.Overview;

    clearTimeout (t.displayTimer);


    function _row (name, row, noTotal, typee){
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
      m.push ('</td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('>&nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        m.push ('<TD style="background: #ffc">');
         if (tot<0) {
          m.push ("<SPAN class=class=boldRed>"+addCommas(tot)+"</span>");
         } else {
          m.push (addCommas(tot));
         }
        //}
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

    try {
      if (Options.includeMarching)
        march = getMarchInfo ();
  
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
           
      var now = unixTime();
      str = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
         str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,10) +'</b></td>';
      }
      if (Options.includeMarching)
        str += '<TD width=81><B>Marchant</b></td>';
       
      str += "<td></td></tr>";
  
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
      str += _row ('<img title="Stock d\'or" height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png>', rows[0], false, 0);
      str += _row ('<img title="Stock de nourriture" height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png>', rows[1], false, 0);
      str += _row ('<img title="Stock de bois" height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png>', rows[2], false, 0);
      str += _row ('<img title="Stock de pierre" height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png>', rows[3], false, 0);
      str += _row ('<img title="Stock de minerais" height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png>', rows[4], false, 0);
    
    str += '<TR><TD><BR></td></tr>';
   
    row = [];
      for(i=0; i<Cities.numCities; i++) {
                  var rp = getResourceProduction (Cities.cities[i].id);
                  row[i] = rp[1];
      }
      str += _row ('<img height=18 title="Production de nourriture a l\'heure" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png>', row, false, 0);
    row = [];
            for(i=0; i<Cities.numCities; i++) {
                        var rp = getResourceProduction (Cities.cities[i].id);
                        row[i] = rp[2];
            }
            str += _row ('<img height=18 title="Production de bois a l\'heure" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png>', row, false, 0);
            
 row = [];
      for(i=0; i<Cities.numCities; i++) {
                  var rp = getResourceProduction (Cities.cities[i].id);
                  row[i] = rp[3];
      }
      str += _row ('<img height=18 title="Production de pierre a l\'heure" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png>', row, false, 0);
      
 row = [];
      for(i=0; i<Cities.numCities; i++) {
                  var rp = getResourceProduction (Cities.cities[i].id);
                  row[i] = rp[4];
      }
      str += _row ('<img height=18 title="Production de minerais a l\'heure" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png>', row, false, 0);
      


        


         str += '<TR><TD><BR></td></tr>';
      
      
      
  
            row = [];
            var totalbouffe = 0;
            for(i=0; i<Cities.numCities; i++) {
              var rp = getResourceProduction (Cities.cities[i].id);
              var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
              row[i] = rp[1] - usage;
            }
            str += _row ('Prod', row, false,  0);
            
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
      str += _row ('Aut.', row, true, 0);
      
      
      str += '<TR><TD><BR></td></tr>';
      for (r=1; r<13; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
        }
      }
      if (Options.includeMarching){
        for (var i=0; i<13; i++)
          rows[i][Cities.numCities] = march.marchUnits[i];
      }
      
          
      str += "</table>";
   
      myBO.Overview.cont.innerHTML = str;
    
    } catch (e){
      myBO.Overview.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);
  },
};


myBO.Crests = {
  cont : null,
  state : null,

  init : function (div){
    var t = myBO.Crests;
    this.cont = document.createElement('div');
    //t.cont.innerHTML = '<DIV id=crestsContent style="maxheight:365px; height:365px; overflow-y:auto">';
    return t.cont;
  },
  

  getContent : function (){
    var t = myBO.Crests;
    return t.cont;
  },

  hide : function (){
    var t = myBO.Crests;
  },

  show : function (){ 
    var t = myBO.Crests;
	
	var bor,ector,kay,bedivere,gawain,percival,galahad,lancelot,arthur,morgana,mordred;
	if (Seed.items.i1101){bor=Seed.items.i1101}else{bor=0};
	if (Seed.items.i1102){ector=Seed.items.i1102}else{ector=0};
	if (Seed.items.i1103){kay=Seed.items.i1103}else{kay=0};
	if (Seed.items.i1104){bedivere=Seed.items.i1104}else{bedivere=0};
	if (Seed.items.i1105){gawain=Seed.items.i1105}else{gawain=0};
	if (Seed.items.i1106){percival=Seed.items.i1106}else{percival=0};
	if (Seed.items.i1107){galahad=Seed.items.i1107}else{galahad=0};
	if (Seed.items.i1108){lancelot=Seed.items.i1108}else{lancelot=0};
	if (Seed.items.i1109){arthur=Seed.items.i1109}else{arthur=0};
	if (Seed.items.i1110){morgana=Seed.items.i1110}else{morgana=0};
	if (Seed.items.i1111){mordred=Seed.items.i1111}else{mordred=0};
	if (Seed.items.i1112){Stag=Seed.items.i1112}else{Stag=0};
	if (Seed.items.i1113){Pendragon=Seed.items.i1113}else{Pendragon=0};
	if (Seed.items.i1114){Lady=Seed.items.i1114}else{Lady=0};
	
	if (Cities.cities[1]){ville2="#99EE99";}else{ville2="#EE9999";}
	if (Cities.cities[2]){ville3="#99EE99";}else{ville3="#EE9999";}
	if (Cities.cities[3]){ville4="#99EE99";}else{ville4="#EE9999";}
   
   	if (Cities.cities[4]){ville5="#99EE99";}else{ville5="#EE9999";}
   	if (Cities.cities[5]){ville6="#99EE99";}else{ville6="#EE9999";}
   	if (Cities.cities[6]){ville7="#99EE99";}else{ville7="#EE9999";}
   if (t.state == null){
    
      var m = '<style>\
CAPTION.MYTABLE\
  {\
     background-color:eeffff;\
     color:black;\
     border-style:solid;\
     border-width:1px;\
     border-color:black;\
  }\
  TABLE.MYTABLE\
  { \
     font-family:arial;\
     border-collapse:collapse;\
     font-size:10pt;\
     background-color:F5F5F5;\
     width:100%;\
     border-style:solid;\
     border-color:black;\
     border-width:1px;\
  }\
\
  TH.MYTABLE\
  {\
     font-size:10pt;\
     color:black;\
     text-align:center;\
     border-style:solid;\
     border-color:black;\
     border-width:1px;\
  }\
\
\
  TR.MYTABLE\
  { \
  }\
\
  TD.MYTABLE\
  {  \
     font-size:10pt;\
     background-color:FFFFE5;\
     color:black;\
     border-style:solid;\
     border-width:1px;\
     text-align:left;\
  }\
</style>\
\
<TABLE CLASS="MYTABLE" CELLPADDING=0 CELLSPACING=0>\
    <CAPTION CLASS="MYTABLE">Les armoiries</CAPTION>\
    \
    <THEAD >\
      <TR CLASS="MYTABLE">\
        <TH CLASS="MYTABLE">Ville</TH>\
        <TH CLASS="MYTABLE">Besoins 1</TH>\
        <TH CLASS="MYTABLE">Besoins 2</TH>\
        <TH CLASS="MYTABLE">Besoins 3</TH>\
      </TR>\
    </THEAD>\
    \
    <TBODY>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">Ville 2</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">Niveau 7 ('+Seed.player.title+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">10 Amis</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">&nbsp;</TD>\
      </TR>\
   \
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';">Ville 3</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1101.jpg>&nbsp;4 Bor ('+bor+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1102.jpg>&nbsp;2 Ector ('+ector+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1103.jpg>&nbsp;1 Kay ('+kay+')</TD>\
      </TR>\
   \
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville4+';">Ville 4</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville4+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1103.jpg>&nbsp;4 Kay ('+kay+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville4+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1104.jpg>&nbsp;3 Bedivere ('+bedivere+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville4+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1105.jpg>&nbsp;1 Gawain ('+gawain+')</TD>\
      </TR>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville5+';">Ville 5</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville5+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1106.jpg>&nbsp;4 Perceval ('+percival+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville5+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1107.jpg>&nbsp;3 Galaad ('+galahad+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville5+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1108.jpg>&nbsp;2 Lancelot ('+lancelot+')</TD>\
      </TR>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville6+';">Ville 6</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville6+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1109.jpg>&nbsp;4 Roi Arthur ('+arthur+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville6+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1110.jpg>&nbsp;3 Morgane ('+morgana+')</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville6+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1111.jpg>&nbsp;2 Mordred ('+mordred+')</TD>\
      </TR>\
       <TR CLASS="MYTABLE">  \
              <TD CLASS="MYTABLE" style="background-color:'+ville7+';">Ville 7</TD>\
              <TD CLASS="MYTABLE" style="background-color:'+ville7+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1112.jpg>&nbsp;4 Roi Stag ('+Stag+')</TD>\
              <TD CLASS="MYTABLE" style="background-color:'+ville7+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1113.jpg>&nbsp;3 Terrestre ('+Pendragon+')</TD>\
              <TD CLASS="MYTABLE" style="background-color:'+ville7+';"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1114.jpg>&nbsp;2 Aquatique ('+Lady+')</TD>\
      </TR>\
    </TBODY>\
  </TABLE>\
  <TABLE CLASS="MYTABLE" CELLPADDING=0 CELLSPACING=0>\
      <CAPTION CLASS="MYTABLE">Vos armoiries en stock</CAPTION>\
      <THEAD >\
        <TR CLASS="MYTABLE">\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1101.jpg title="Bor"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1102.jpg title="Ector"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1103.jpg title="Kay"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1104.jpg title="Bedivere"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1105.jpg title="Gawain"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1106.jpg title="Perceval"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1107.jpg title="Galaad"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1108.jpg title="Lancelot"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1109.jpg title="Arthur"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1110.jpg title="Morgane"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1111.jpg title="Mordred"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1112.jpg title="Stag"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1113.jpg title="Terrestre"></TH>\
          <TH CLASS="MYTABLE"><img width=25 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1114.jpg title="Aquatique"></TH>\
      </TR>\
 </THEAD>\
  <TR CLASS="MYTABLE">\
  <TD CLASS="MYTABLE"><center><b>'+bor+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+ector+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+kay+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+bedivere+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+gawain+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+percival+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+galahad+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+lancelot+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+arthur+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+morgana+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+mordred+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+Stag+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+Pendragon+'</TD>\
  <TD CLASS="MYTABLE"><center><b>'+Lady+'</TD>\
  </TR><TR CLASS="MYTABLE"></tr>\
  </table>';
      t.cont.innerHTML = m;
      t.state = 1;
    }
  },

}



/*************************** STATISTIQUES ARMEE ***********************/
myBO.Overview1 = {
  cont : null,
  displayTimer : null,
  checkBox:null,
  checkBox1:null,
  Overview : function (){
  },

  init : function (){
    this.cont = document.createElement('div');
    return this.cont;
  },

  getContent : function (){
    return myBO.Overview1.cont;
  },

  hide : function (){
    clearTimeout (myBO.Overview1.displayTimer);
  },

  show : function (){
    var rownum = 0;
    var totalentre = 0;  
    var t = myBO.Overview1;

    clearTimeout (t.displayTimer);

    function UniteFormation(id) {
     var nbunit=0; // 
     for(i=0; i<Cities.numCities; i++) {
      //alert(i);
      var cityIdd = Cities.cities[i].id;
      var q = Seed.queue_unt['city'+cityIdd];
      var qs = q.toString();
       if (q!=null && q.length>0 ){
        for (var ii=0; ii<q.length; ii++){
         if (q[ii][0]==id) nbunit+=parseInt(q[ii][1]);
         
        }
      }
      }
      totalentre += parseInt(nbunit*UniteCout(id));
      return nbunit;
    }
    function UniteCout(id) {
      var Unitcout=unsafeWindow.unitupkeeps[id]; 
      return Unitcout;
    }
    function _row (name, row, noTotal, typee){
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
      m.push ('</td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('>&nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        m.push ('<TD style="background: #ffc">');
        //if (Options.EnableFormation && typee>0) {
        // m.push (addCommas(tot+UniteFormation(typee)));
        //}else {
         if (tot<0) {
          m.push ("<SPAN class=class=boldRed>"+addCommas(tot)+"</span>");
         } else {
          m.push (addCommas(tot));
         }
        //}
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<TD');
        m.push (style);
        m.push ('>');
        m.push (addCommas(row[i]));
        m.push ('</td>');
      }
      if (Options.EnableFormation && typee>0) {
       m.push('<td>'+addCommas(UniteFormation(typee))+'</td>');
     
      }
      if (Options.EnableFormation && name=='Form') {
         m.push("<td>&nbsp;</td><td>" + addCommas(totalentre) + "</td>");
      }
      m.push ('</tr>');
      return m.join('');
    }

    try {
      if (Options.includeMarching)
        march = getMarchInfo ();
  
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
      var now = unixTime();
      str = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
     	 cityID = 'city'+ Cities.cities[i].id;
      	 Gate = parseInt(Seed.citystats[cityID].gate);
      	 if(Gate == 0)  str += "<TD width=81 style='background-color:#77EE77'><B>"+ Cities.cities[i].name.substring(0,10) +'</b><BR></td>';
      	 if(Gate != 0)  str += "<TD width=81 style='background-color:#EE7777'><B>"+ Cities.cities[i].name.substring(0,10) +'</b><BR></td>';
      }
      if (Options.includeMarching)
        str += '<TD width=81><B>Marchant</b></td>';
      if (Options.EnableFormation)  
       str += "<TD width=81><B>Formation</b></td>"; 
       
      str += "<td></td></tr>";
  	 rows = [];
      rows[0] = [];
      for (r=1; r<13; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
        }
      }
      if (Options.includeMarching){
        for (var i=0; i<13; i++)
          rows[i][Cities.numCities] = march.marchUnits[i];
      }
      rownum = 0;
      this.totalentre = 0;
      for (r=1; r<13; r++){
       str += _row ('<img height=18 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg>', rows[r],false,  r);
      }

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
      str += _row ('Form', row, true, 0);
      
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
      str += _row ('D&eacute;f', row, true, 0);

     
      str += "</table>";
   
      myBO.Overview1.cont.innerHTML = str;
  
    } catch (e){
      myBO.Overview1.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);
  },
};



/*************************** RESUME ***********************/

my.Overview = {
 
  cont : null,
  displayTimer : null,
  checkBox:null,
  
  checkBox1:null,
  Overview : function (){
  },

  init : function (){
    this.cont = document.createElement('div');
    return this.cont;
  },

  getContent : function (){
    return my.Overview.cont;
  },

  hide : function (){
    clearTimeout (my.Overview.displayTimer);
  },

  show : function (){
    var rownum = 0;
    var totalentre = 0;  
    var t = my.Overview;

    clearTimeout (t.displayTimer);

    function clickEnableMarch (){
      var t = my.Overview;
      if (checkBox.checked)
        Options.includeMarching = true;
      else
        Options.includeMarching = false;
      t.show ();
    }
    function clickEnableFormation (){
      var t = my.Overview;
      if (checkBox1.checked)
        Options.EnableFormation = true;
      else
        Options.EnableFormation = false;
      t.show ();
    }
    function UniteFormation(id) {
     var nbunit=0; // 
     for(i=0; i<Cities.numCities; i++) {
      //alert(i);
      var cityIdd = Cities.cities[i].id;
      var q = Seed.queue_unt['city'+cityIdd];
      var qs = q.toString();
       if (q!=null && q.length>0 ){
        for (var ii=0; ii<q.length; ii++){
         if (q[ii][0]==id) nbunit+=parseInt(q[ii][1]);
         
        }
      }
      }
      totalentre += parseInt(nbunit*UniteCout(id));
      return nbunit;
    }
    function UniteCout(id) {
      var Unitcout=unsafeWindow.unitupkeeps[id]; 
      return Unitcout;
    }
    function _row (name, row, noTotal, typee){
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
      m.push ('</td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('>&nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        m.push ('<TD style="background: #ffc">');
        //if (Options.EnableFormation && typee>0) {
        // m.push (addCommas(tot+UniteFormation(typee)));
        //}else {
         if (tot<0) {
          m.push ("<SPAN class=class=boldRed>"+addCommas(tot)+"</span>");
         } else {
          m.push (addCommas(tot));
         }
        //}
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<TD');
        m.push (style);
        m.push ('>');
        m.push (addCommas(row[i]));
        m.push ('</td>');
      }
      if (Options.EnableFormation && typee>0) {
       m.push('<td>'+addCommas(UniteFormation(typee))+'</td>');
     
      }
      if (Options.EnableFormation && name=='Form') {
         m.push("<td>&nbsp;</td><td>" + addCommas(totalentre) + "</td>");
      }
      m.push ('</tr>');
      return m.join('');
    }

//DebugTimer.start(); 
    try {
      if (Options.includeMarching)
        march = getMarchInfo ();
  
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
      
      str = '<div style="height:660px;max-height:660px;overflow-y:auto"><DIV class=ptstat style="margin-top:4px; margin-bottom:5px; "><TABLE cellspacing=0 cellpadding=0 class=ptTab width=97% align=center>\
        <TR align=left><TD><SPAN class=ptStatLight>Entr&eacute;e le :</span> '+ dt.toLocaleDateString() +'</td>\
        <TD><SPAN class=ptStatLight>Puissance : </span> ' + addCommas(Seed.player.might) +'</td>\
        <TD><SPAN class=ptStatLight>Alliance : </span> ' + getMyAlliance()[1] +'</td>\
        <TD align=right><SPAN class=ptStatLight>Domain :</span> ' + unsafeWindow.domainName +'</td></tr></table></div><span id="debugtest"></span>';

          tabClass = 'ptTabOverview';  
            if (Cities.numCities > 6)
              tabClass = 'ptTabOverview7';  
                    
       str += "<TABLE class="+ tabClass +" cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
  
       for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        Gate = parseInt(Seed.citystats[cityID].gate);
         if(Gate == 0) var couleurr="#77EE77";
         if(Gate != 0) var couleurr="#EE7777";
         str += "<TD width=81 style='background-color:"+couleurr+"'><span title='"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"'><B>"+ Cities.cities[i].name.substring(0,10) +'</span></b><BR>\
         <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+Cities.cities[i].x +','+ Cities.cities[i].y+')</a></td>';
       }

      if (Options.includeMarching)
        str += '<TD width=81><B>Marchant</b></td>';
      if (Options.EnableFormation)  
       str += "<TD width=81><B>Formation</b></td>"; 
       
      str += "<td></td></tr>";
  
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
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png>', rows[0], false, 0);
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png>', rows[1], false, 0);
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png>', rows[2], false, 0);
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png>', rows[3], false, 0);
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png>', rows[4], false, 0);
      
      
      
        
            var now = unixTime();
            str += '<TR><TD style="font-size:6px"><BR></font></td></tr>';
            str +='<tr style="background: #fff" align=right><td><img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/city6/construction_animated_icon.gif title="Batiment"></td><td>&nbsp;</td>';
            for(i=0; i<Cities.numCities; i++) {
             var totTime = 0;
             if (Seed.queue_con["city" + Cities.cities[i].id].length > 0) {
              var q=Seed.queue_con["city" + Cities.cities[i].id][0];
              var totTime = 0;
              totTime = q[4] - now;
              if (totTime < 0)
                totTime = 0;
              if (totTime < 3600)
                affuichage = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
              else
                affuichage = timestr(totTime);
              str +="<td>"+ affuichage + "</td>";  
             } else {
             str +="<td>0s</td>";
             }
            }    
            str +="</tr>"; 
            //
            str +='<tr style="background: #e8e8e8" align=right><td><img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/1.jpg title="Technologie"></b></td><td>&nbsp;</td>';
            for(i=0; i<Cities.numCities; i++) {
             var totTime = 0;
             if (Seed.queue_tch["city" + Cities.cities[i].id].length > 0) {
              var q=Seed.queue_tch["city" + Cities.cities[i].id][0];
              var totTime = 0;
              totTime = q[3] - now;
              if (totTime < 0)
                totTime = 0;
              if (totTime < 3600)
                affuichage = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
              else
                affuichage = timestr(totTime);
              
              str +="<td>"+ affuichage + "</td>";  
       
             } else {
             str +="<td>0s</td>";
             }
            }    
             str +="</tr>"; 
             
         str += '<TR><TD style="font-size:6px"><BR></td></tr>';
      
      
      
  
            row = [];
            var totalbouffe = 0;
            for(i=0; i<Cities.numCities; i++) {
              var rp = getResourceProduction (Cities.cities[i].id);
              var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
              row[i] = rp[1] - usage;
            }
            str += _row ('Prod', row, false,  0);
            
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
      str += _row ('Aut.', row, true, 0);
      
      
      str += '<TR><TD style="font-size:6px"><BR></td></tr>';
      for (r=1; r<13; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
        }
      }
      if (Options.includeMarching){
        for (var i=0; i<13; i++)
          rows[i][Cities.numCities] = march.marchUnits[i];
      }
      rownum = 0;
      this.totalentre = 0;
      for (r=1; r<13; r++){
       str += _row ('<img height=18 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+r+'_30.jpg>', rows[r],false, r);
      }
      str += '<TR><TD style="font-size:6px"><BR></td></tr>';
 
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
      str += _row ('Form', row, true, 0);
      
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
      str += _row ('D&eacute;f', row, true, 0);
         str += '<TR><TD style="font-size:6px"><BR></td></tr>';
      
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totWilds = 0;
        dat = Seed.wilderness['city'+ Cities.cities[i].id];
        if (dat!=null && matTypeof(dat)=='object')
          for (k in dat)
            ++totWilds;
        castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
        if (castle==11) castle=12; 
        if (totWilds < castle)
        {
       
         row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';
        }else{
          
          row[i] = totWilds +'/'+ castle;
        }
      }
      str += _row ('TS', row, true, 0);
  
      row = [];
      var did = {}; 
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
        for (k in dat)
          ++totKnights;
         
        var Knidispo = 0;
        var niveauPointRall=parseInt(getCityBuilding (Cities.cities[i].id, 12).maxLevel);
        for (var z=0; z<knightRoles.length; z++){
	        var leader = Seed.leaders['city'+Cities.cities[i].id][knightRoles[z][1]+'KnightId'];
	        if (leader == 0) {
	                
	        }else{
	         did['knt'+leader] = true;
	        }
         }
         for (k in Seed.knights['city'+Cities.cities[i].id]){
	         if (!did[k])
	           Knidispo++;    
         }
         if (Knidispo<niveauPointRall) {
          row[i] = '<b>' + totKnights + '</b> - <span title="Chevalier dispo / Point de ralliement"><SPAN class=boldRed><B>'+Knidispo+'/' + niveauPointRall +'</span></span>';
         }else {
          row[i] = '<b>' + totKnights + '</b> - <span title="Chevalier dispo / Point de ralliement">'+Knidispo+'/' + niveauPointRall +'</span>';
	 }        
         
      }
      str += _row ('Chev', row, true, 0);
     
                
      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +'>Inclure les troupes et ressources marchants</td>\
      <TD class=xtab colspan=4><BR><INPUT type=CHECKBOX id=idCheck1'+ (Options.EnableFormation?' CHECKED':'') +'>Afficher les troupes en cours de formation</td></tr>';
      str += "</table>";
      if (DEBUG_BUTTON)
        str += '<BR><INPUT id=subSeed type=submit name="SEED" value="DEBUG">';
      my.Overview.cont.innerHTML = str +'</div>';
      checkBox = document.getElementById('idCheck');
      checkBox.addEventListener('click', clickEnableMarch, false);
      checkBox1 = document.getElementById('idCheck1');
      checkBox1.addEventListener('click', clickEnableFormation, false);
      if (DEBUG_BUTTON){
        subSeed = document.getElementById('subSeed');
        subSeed.addEventListener('click', function (){debugWin.doit()}, false);
      }
//DebugTimer.display ('Draw Overview');    
    } catch (e){
      my.Overview.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);
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


/*************************************** MARCHES ************************************************/

my.Marches = {
  cont:null,
  displayTimer:null,
  curTabBut : null,
  curTabName : null,
  

  
  getContent : function (){
      return this.cont;
  },
  hide : function (){
      var t = my.Marches;
      document.getElementById('ptMarchOutput').innerHTML="";
      clearTimeout (t.displayTimer);
  },
  
  init : function (){
   this.cont = document.createElement('div');
   return this.cont;
   
  },
  show : function (){  
    var t = my.Marches; 
    unsafeWindow.pr56Recall = t.butRecall;
    unsafeWindow.pr57Recall = t.butRecall2;
    unsafeWindow.pr58Recall = t.butRecallTroop;
    unsafeWindow.r8x6Home = t.butSendHome;
    
    // gère la couleur du bouton
    var atkclass='';
    if(Seed && Seed.queue_atkinc) {
      for(k in Seed.queue_atkinc){
        m = Seed.queue_atkinc[k];
        if (m.marchType == 4){
    	   atkclass = 'style="background-color:#FF9999;"';
    	 }
      }
    }
    
    t.cont.innerHTML = '<TABLE class=ptTab align=center><TR><TD><INPUT class=pbSubtab ID=ptmrchSubM type=submit value="Marches en cours"></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubA type=submit '+atkclass+' value="Attaques Entrantes"></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubR type=submit value="Renforts Recus"></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubZ type=submit value="Renforts Envoy&eacute;s"></td></tr></table><HR class=ptThin>\
      <DIV id=ptMarchOutput style="margin-top:10px; background-color:white; height:620px;max-height:620px;overflow-y:auto"></div>';
     t.marchDiv = document.getElementById('ptMarchOutput'); 
    document.getElementById('ptmrchSubA').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubR').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubM').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubZ').addEventListener('click', e_butSubtab, false);
     
       if (atkclass!='') {
       changeSubtab (document.getElementById('ptmrchSubA'));  
       }else {
       changeSubtab (document.getElementById('ptmrchSubM'));  
       }
       
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
          t.show2();
      }  
    
  },
  show2 : function (){
    var t = my.Marches;
    clearTimeout (t.displayTimer);
    if (t.curTabName == 'Z')
      t.showReinforcementsOut();
    else if (t.curTabName == 'R')
      t.showReinforcements();
    else if (t.curTabName == 'M')
      t.showMarches();
    else
      t.showAttacks();
  },
 
   /***   ATTACKS SUBTAB  ***/
    showAttacks : function (){
      var t = my.Marches;
      clearTimeout (t.displayTimer);
      var now = unixTime();
      var target, atkType, who, atkclass;
      t.marchDiv.innerHTML = "<br>Chargement...<br><i>(si vous voyez rien c'est qu'il n'y a pas d'attaque)</i>"; 
      var s = '<div class=ptstat><font color=#F77>Liste des attaques en cours</font></div>';
      s += '<STYLE> .eclkk{background:#ffff55;} .attackkk{background:#ff5555;}</style>';
      s += '<TABLE cellspacing=0 cellpadding=2 width=100%>';
      s += '<tr><td></td><td><b>Type Attaque</td><td><b>Lieu</td><td><b>Attaquant</td><td><b>Troupes</td></tr>';  
      var at=0;
      if(Seed && Seed.queue_atkinc) {
       for(k in Seed.queue_atkinc){
      	m = Seed.queue_atkinc[k];
      	if (m.marchType == 3){
	      atkType = 'Eclaireur';
	      atkclass = 'eclkk';
	    } else if (m.marchType == 4){
	      atkType = 'Attaque';
	      atkclass = 'attackkk';
	    } else {
	      atkType ="?";//return;
	      atkclass = '';
    	 }
    	 if (atkclass !='') {  // Seulement les vraies attaques !
    	 at++;
    	 s += '<tr align=left >';
    	  
    	 var arrivedans = unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime()));
    	 s += '<td class="'+atkclass+'"><a class="button20" onclick="attack_viewimpending_view('+k.substr(1)+',\'\');return false;"><span>Voir</span></a></td><td class="'+atkclass+'">' + atkType + ' dans ' + arrivedans +'</td>';
    	
    	 var city = Cities.byID[m.toCityId];
    	 if (city.tileId == m.toTileId) {
           target = 'Ville';
           coordos = '<a class="coordinateLink" onclick="cm.utils.CoordinateLinkController.onClick(event)" href="javascript:void(0)">('+ city.x + ',' + city.y +')</a>';
         } else {
           target = 'TS';
           for (k in Seed.wilderness['city'+m.toCityId]){
            if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
             coordos = '<a class="coordinateLink" onclick="cm.utils.CoordinateLinkController.onClick(event)" href="javascript:void(0)">('+Seed.wilderness['city'+m.toCityId][k].xCoord + ',' + Seed.wilderness['city'+m.toCityId][k].yCoord+')</a>';
             break;           
            }
           }
         }  
         s += '<td class="'+atkclass+'">' + target + '<br>'+coordos+'</td>';
         
         if (Seed.players['u'+m.pid]) {
	    who = Seed.players['u'+m.pid].n;
	 } else if (m.players && m.players['u'+m.pid]) {
	    who = m.players['u'+m.pid].n;
	 } else{
	    who = 'Inconnu'; 
      	 }
      	 if (m.fromXCoord) who += '<br><a class="coordinateLink" onclick="cm.utils.CoordinateLinkController.onClick(event)" href="javascript:void(0)">(' + m.fromXCoord +','+ m.fromYCoord+')</a>';
      	 s += '<td class="'+atkclass+'">' + who + '</td>';
         var troupe = "";
         for (k in m.unts){
          var uid = parseInt(k.substr (1));
          troupe += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +'<br>';
         }
         s += '<td class="'+atkclass+'">' + troupe +'</td>';
         
         s += '</tr>';
         } // fin si attaque et eclaireur seulement
      	}  // fin du for
      	if (at==0) {
      	 s+="<tr><colspan=2>Aucune attaque en cours...</tr>";
      	}
      } // fin de if
      s+='</table>';
      t.marchDiv.innerHTML = s;      
      t.displayTimer = setTimeout (t.showAttacks, 5000);
    },
    
    /***   MARCHES SUBTAB  ***/
    showMarches : function (){
      var t = my.Marches;
      var rownum = 0;
      var now = unixTime();
            var names = ['Ravi', 'Mili', 'Eclai', 'Piqu', 'Pala', 'Arch', 'Cav', 'CavL', 'Wago', 'Bali', 'Beli', 'Cata'];
            var t = my.Marches;
            clearTimeout (t.displayTimer);
                
            // TODO FIX:    Troops show as encamped even if they are here yet (check destinationUnixTime)
               
            var s = '<div class=ptstat>Liste des troupes marchants</div>';
            s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
            s += '<TABLE cellspacing=0 cellpadding=2 width=100%>';
            tot = [];
            for (i=0; i<13; i++)
              tot[i] = 0;
              
            for (var c=0; c<Cities.numCities; c++){
              var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
              if (matTypeof(que)=='array')
                continue;
      
              var a=0;
              for (k in que){
                march = que[k]; 
                if (march.marchType!=2) { /// Marche Type \\ 2= Défense / 3= Eclaireur / 4= Attaque
                a++;
                if (a==1) {
      	             //s+= '<TR><TD class=xtab><BR></td></tr>';
      	  	     s+= '<TR><TD class="city" colspan=17 align=left><B>Ville ' + (parseInt(c)+1) + ' : '+ Cities.cities[c].name +'</b></td></tr>';
      	        }
                var mid = k.substr(1);
                knight = '';
                if (parseInt(march.knightCombat)>0) knight=' ('+ march.knightCombat +')';
                
                //if (march.toPlayerId) {
                 var playerId = march.toPlayerId;
                //}else{
                 //var playerId = -1;
                //}
                var cityId = march.toCityId;
                var tileType = parseInt(march.toTileType);
                var tileLevel = march.toTileLevel;
                var who = 'Inconnu';
                if (Seed.players['u' + playerId]) {
		 who = Seed.players['u' + playerId].n;
		}
		 if (march.marchType==1) { // si transport c'est forcement sur une ville lol
		  var player = "<span>Ville Niv "+ tileLevel +"</span>";
		 }else {
		  var player = "<span title='Le jeu Bug !! Chier - F5 et cela corrige le pb....'>Ville ou Barbares Niv "+ tileLevel +"</span>";
		 }
		
		var tileNames = ['Camps barbares', 'Prairie', 'Lac', 'Bois', 'Collines', 'Montagne', 'Plaine', 'Ville'];
		var numtile= (tileType/10) + 1;
		if (tileType==10) numtile=1;
		if (tileType==11) numtile=2;
                if (tileType <= 50) { // TS
                  player = tileNames[numtile] +" Niv " + tileLevel;
                  /*if (playerId==0) {
                   player += " - Libre";
                  } else {
                   player += " - " + who;
                  }*/  // BUG DU JEU !!! pfff
                }
                if (tileType == 51 && playerId == 0) { // Barbares
                  player = "Camps Barbares Niveau " + tileLevel;
                }
                var nomville="";
                if (playerId > 0 && tileType == 51) { // ville
                 if (march.marchType==1) {
                  for(i=0; i<Cities.numCities; i++) {
                   if (cityId==Cities.cities[i].id) {
                    nomville=Cities.cities[i].name
                     break;
                   }
                  }
                  player = 'Votre ville '+ nomville;
                 } else {
                  player = 'Ville Niv ' + tileLevel;
                 }
                }
      	   	//player += "<br>playerId:"+ playerId + "<br>tileType:" + tileType + "<br>tileLevel:" +  tileLevel + "<br>cityId:" + cityId;
                var typeattack="?";
                if (march.marchType==3) typeattack='Eclaireur';
                if (march.marchType==4) typeattack='Attaquer';
                if (march.marchType==1) typeattack='Transporte';
                if (march.marchType==5) typeattack='R&eacute;assigner';
                var now = new Date();
                var statusm = march.marchStatus;
                var Marchstatut="? ";
                var arrivedans="0s";
		if (statusm==1) { 
		 Marchstatut="";
		 if (march.marchType==3) 
		  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg" align=absmiddle>';
		 if (march.marchType==4) 
		  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg" align=absmiddle>';
		 if (march.marchType==1) 
		  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg" align=absmiddle>';
                 if (march.marchType==5) 
                  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>';
		 Marchstatut+="&nbsp;Marchant"; 
		 arrivedans = unsafeWindow.timestr(parseInt(march.destinationUnixTime - unixTime()));
		}
                if (statusm==8) { 
                  Marchstatut = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg" align=absmiddle>&nbsp;Retour';
                  arrivedans = unsafeWindow.timestr(march.returnUnixTime - unixTime());
                }
                if (statusm==2) { 
                   Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;Campement';
                }
                if (statusm==5) { 
                   Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;En attente Rapport';
                }
                
                s += '<TR align=left><td align=left width=10%>';
                if (statusm==1) s +='<A class=button20 onclick="pr58Recall('+ mid+')"><SPAN>Rappeler</span></a>';
                if (statusm==2) s +='<A class=button20 onclick="attack_recall('+ mid+',1,'+Cities.cities[c].id+');return false;"><SPAN>Rappeler</span></a>';
                s +='&nbsp;</td><td align=left width=10%>'+typeattack+'</td><td align=left width=15%>' + Marchstatut +'<br>'+arrivedans+'</td>\
                <TD align=left width=25%>' + player + ' <a class="coordinateLink" onclick="cm.utils.CoordinateLinkController.onClick(event)" href="javascript:void(0)">(' + march.toXCoord +','+ march.toYCoord +')</a>&nbsp;' + knight +' </td><td colspan=12>'
                for (i=1; i<13; i++) {
                  if (parseInt (march['unit'+ i +'Count']) > 0) {
                      s += names[i-1]+" :" + parseInt (march['unit'+ i +'Count']) + "<br>";
                      tot[i] += parseInt (march['unit'+ i +'Count']);
                  }
                }
                s += '</td><td style="font-size:11px">';
		if (statusm==8) { // seulement le retour pour les barbares
		 s += 'Or : ' + parseInt (march['gold']) + '<br>Nourriture : ' + march['resource1'] + '<br>Bois : ' + march['resource2'] + '<br>Pierre : ' + march['resource3'] + '<br>Minerais : ' + march['resource4'] + '</td>';         
      		} else {
      		 s += '<a  class=button20 onclick="view_march('+ mid+');return false;";><span>D&eacute;tail</psan></a></td>';
      		}
                s += '</tr>';
                 // Bouton détail : <td><a  class=button20 onclick="view_march('+ mid+');return false;";><span>D&eacute;tail</psan></a></td>
                }// fin de MarchType
              }      
            } 
            
             s += '<TR><TD colspan=17><BR><BR></td></tr></table><TABLE cellspacing=0 cellpadding=2 width=100%><tr><td colspan=1></td>';
                  for (k=0; k<names.length; k++)
                    s += '<TD width=7% align=center><B>' + names[k] + '</b></td>';
                  s += '</tr>';
                  s += '<TR align=center><TD class="tot" align=left width=10%><B>TOTAUX</b></td>';
                  for (i=1; i<13; i++)
                    s+= '<TD class="tot">'+ tot[i] +'</td>';
            s += '<td></td></tr></table>';
            s += '<BR><BR><DIV style="font-size: 10px"></div>';
        
            t.marchDiv.innerHTML = s;
            t.displayTimer = setTimeout (t.show2, 2000);
      return;
    },
    ajaxRecall2 : function (marchId, notify){
          //var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
          var villeencours;
          for (var c=0; c<Cities.numCities; c++){
            var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
            if (matTypeof(que)=='array')
              continue;
            for (k in que){
              if (k == 'm'+marchId){
                villeencours = Cities.cities[c].id;
                break;
              }
            }    
          }   
          
          unsafeWindow.cm.recall.ask(marchId, villeencours);
          setTimeout(function() { t.show2(); }, 500);
          return false;
  
  },
    /***  REINFORCEMENTS SUBTAB  ***/
    showReinforcementsOut : function (){
      var rownum = 0;
      var names = ['Ravi', 'Mili', 'Eclai', 'Piqu', 'Pala', 'Arch', 'Cav', 'CavL', 'Wago', 'Bali', 'Beli', 'Cata'];
      var t = my.Marches;
      clearTimeout (t.displayTimer);
          
      // TODO FIX:    Troops show as encamped even if they are here yet (check destinationUnixTime)
         
      var s = '<div class=ptstat>Liste des troupes en renfort chez vos alli&eacute;s ou vos TS/villes</div>';
      s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
      s += '<TABLE cellspacing=0 cellpadding=2 width=100%>';
      tot = [];
      for (i=0; i<13; i++)
        tot[i] = 0;
        
      for (var c=0; c<Cities.numCities; c++){
        var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
        if (matTypeof(que)=='array')
          continue;

        var a=0;
        for (k in que){
          march = que[k]; 
          if (march.marchType==2) { /// Marche Type \\ 2= Défense / 3= Eclaireur / 4= Attaque
          a++;
          if (a==1) {
	             s+= '<TR><TD class=xtab><BR></td></tr>';
	  	  	          s+= '<TR><TD class="city" colspan=15 align=left><B>Ville ' + (parseInt(c)+1) + ' : '+ Cities.cities[c].name +'</b></td></tr>';
	    
          }
          var mid = k.substr(1);
          knight = '';
          if (parseInt(march.knightCombat)>0) knight=' ('+ march.knightCombat +')';
	  try {
	     player = Seed.players['u'+march.toPlayerId].n; //Seed.players['u'+k].n;
	   } catch (err){
	     player = 'Inconnu';
          }
        
          s += '<TR align=left><td align=left width=12%>';
          var statusm = march.marchStatus;
          var Marchstatut='';
          if (statusm==1) Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;Marchant';
          if (statusm==2) Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;Campement';
          if (statusm==8) Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg" align=absmiddle>&nbsp;Retour';
          if (statusm==5) Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;En attente Rapport';
          if (statusm==1){
            s +='<A class=button20 onclick="pr56Recall('+ mid+')"><SPAN>Rappeler</span></a>';
          }
          if (statusm==2) { 
             s +='<A class=button20 onclick="pr57Recall('+ mid+')"><SPAN>Rappeler</span></a>';
          } else {
            s += '&nbsp;';
          }
             
          s+='</td><td align=left width=15%>'+Marchstatut+'</td><TD align=left width=30%>' + player + ' <a class="coordinateLink" onclick="cm.utils.CoordinateLinkController.onClick(event)" href="javascript:void(0)">(' + march.toXCoord +','+ march.toYCoord +')</a>&nbsp;' + knight +' </td><td colspan=12>'
          for (i=1; i<13; i++) {
            if (parseInt (march['unit'+ i +'Count']) > 0) {
                s += " " + parseInt (march['unit'+ i +'Count']) + " "+names[i-1]+"<br>";
                tot[i] += parseInt (march['unit'+ i +'Count']);
            }
          }
          s += '</td></tr>';
          }// fin de MarchType
        }      
      } 
      
       s += '<TR><TD colspan=15><BR><BR></td></tr></table><TABLE cellspacing=0 cellpadding=2 width=100%><tr><td colspan=1></td>';
            for (k=0; k<names.length; k++)
              s += '<TD width=7% align=center><B>' + names[k] + '</b></td>';
            s += '</tr>';
            s += '<TR align=center><TD class="tot" align=left width=10%><B>TOTAUX</b></td>';
            for (i=1; i<13; i++)
              s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr></table>';
      s += '<BR><BR><DIV style="font-size: 10px">NOTE : Il est possible que les retours apparaissent pendant un certain moment... (oui ya des bugs...)</div>';
  
      t.marchDiv.innerHTML = s;
      t.displayTimer = setTimeout (t.show2, 10000);
      return;
  },
     
  showReinforcements : function (){
   var rownum = 0;
    var names = ['Ravi', 'Mili', 'Eclai', 'Piqu', 'Pala', 'Arch', 'Cav', 'CavL', 'Wago', 'Bali', 'Beli', 'Cata'];
    var t = my.Marches;
    clearTimeout (t.displayTimer);
      
    function clickShowRemaining (){
      checkBox = document.getElementById('idCheck2');
      if (checkBox.checked)
        Options.encRemaining = false;
      else
        Options.encRemaining = true;
      t.show2 ();
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
    s = '<div class=ptstat>Liste des troupes en renfort dans vos embassades.</div>';
    if (numSlots == 0){
      s += '<BR><CENTER><B>Aucunes troupes en renfort actuellement.</b></center>';
    } else {
      s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
      s += '<TABLE cellspacing=0 cellpadding=2 width=100%>';

      tot = [];
      for (i=0; i<13; i++)
        tot[i] = 0;
      for (c in Cities.cities){
        dest = Cities.cities[c].id;
        if (enc[dest]){
          s+= '<TR><TD class="city" colspan=14 align=left><B>Ville ' + (parseInt(c)+1) + ' : '+ Cities.cities[c].name +'</b></td></tr>';
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
              s += '<TR align=left><td align=left width=12%><A class=button20 onclick="r8x6Home('+ march.marchId +')"><SPAN>Renvoie</span></a></td><TD align=left width=25%>'+ player + knight +' </td><td colspan=12>'
              for (i=1; i<13; i++){
               if (march.troops[i] > 0) {
                s += ''+ march.troops[i]  +' '+ names[i-1]  +'<br>';
               }
                tot[i] += march.troops[i];
              }
              s += '</td></tr>';

            }
          }
        }
      }
      s += '<TR><TD colspan=14><BR><BR></td></tr></table><TABLE cellspacing=0 cellpadding=2 width=100%><tr><td colspan=1></td>';
      for (k=0; k<names.length; k++)
        s += '<TD width=7% align=center><B>' + names[k] + '</b></td>';
      s += '</tr>';
      s += '<TR align=center><TD class="tot" align=left width=10%><B>TOTAUX</b></td>';
      for (i=1; i<13; i++)
        s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr></table>';
    }

    s += '<BR><BR><INPUT type=CHECKBOX id=idCheck2 '+ (Options.encRemaining?'':' CHECKED ') +'> Show Original Troops';
    s += '<BR><BR><DIV style="font-size: 10px">NOTE : Vous devez rafraichir KOC pour voir les nouveaux renforts chez vous.</div>';
    t.marchDiv.innerHTML = s;
    checkBox = document.getElementById('idCheck2');
    checkBox.addEventListener('click', clickShowRemaining, false);
    t.displayTimer = setTimeout (t.show2, 10000);
  },
  
  
    butRecall : function (marchId){
        var t = my.Marches;
        logit ("CANCELLING: "+ marchId); 
        t.ajaxRecall (marchId); 
    },
    butRecall2 : function (marchId){
              var t = my.Marches;
              logit ("CANCELLING: "+ marchId); 
              t.ajaxRecall2 (marchId); 
    },
    butRecallTroop: function (marchId){
        var t = my.Marches;
        logit ("CANCELLING: "+ marchId); 
        t.ajaxRecall (marchId); 
    },
    butSendHome : function (marchId){
        var t = my.Marches;
        logit ("SEND HOME: "+ marchId); 
        t.ajaxSendHome (marchId, function(r){t.show(); }); 
   },

 
   ajaxSendHome : function (marchId, notify){ 
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
  ajaxRecall2 : function (marchId, notify){
  // rappele de troupes en défence chez allié
  
      var villeencours;
          for (var c=0; c<Cities.numCities; c++){
            var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
            if (matTypeof(que)=='array')
              continue;
            for (k in que){
              if (k == 'm'+marchId){
                villeencours = Cities.cities[c].id;
                break;
              }
            }    
        }  
  
  
           var march = Seed.queue_atkp["city" + villeencours]["m" + marchId];
           if (march == null){
             //notify ('March not found!'); 
             alert("Marche non trouve");
             return;
           }    
           var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
           params.mid = marchId;
           params.cid = villeencours; //march.toCityId;
            
           new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/undefend.php" + unsafeWindow.g_ajaxsuffix, {
               method: "post",
               parameters: params,
               onSuccess: function (rslt) {
                 if (rslt.ok){
 
                   var mymarch = unsafeWindow.seed.queue_atkp["city" + villeencours]["m" + marchId];
                   var marchtime = Math.abs(parseInt(mymarch.destinationUnixTime) - parseInt(mymarch.eventUnixTime));
                   mymarch.returnUnixTime = unixTime() + marchtime;
                   mymarch.marchStatus = 8;
     
                 } else {
                  
                  
                 }
               },
               onFailure: function () {
               
               
               },
     });
          
  },   
  ajaxRecall : function (marchId, notify){
   // rappel des troupe en cours de marches
   
   /*
        var villeencours;
             for (var c=0; c<Cities.numCities; c++){
               var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
               if (matTypeof(que)=='array')
                 continue;
               for (k in que){
                 if (k == 'm'+marchId){
                   villeencours = Cities.cities[c].id;
                   break;
                 }
               }    
           }  
     
     
              var march = Seed.queue_atkp["city" + villeencours]["m" + marchId];
              if (march == null){
                //notify ('March not found!'); 
                alert("Marche non trouve");
                return;
              }    
              var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
              params.mid = marchId;
              params.cid = villeencours; //march.toCityId;
               
              new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelMarch.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  onSuccess: function (rslt) {
                    if (rslt.ok){
    			// A valider le fonctionnement pour metrte à jour le temps restant de la mache
    			
                      var mymarch = unsafeWindow.seed.queue_atkp["city" + villeencours]["m" + marchId];
                      //var marchtime = Math.abs(parseInt(mymarch.marchUnixTime));
                      //mymarch.returnUnixTime = unixTime() - marchtime;
                      //unsafeWindow.timestr(march.returnUnixTime - unixTime());
                      mymarch.marchStatus = 8;
        
                    } else {
                     
                     
                    }
                  },
                  onFailure: function () {
                  
                  
                  },
     });
   
   
   
   */
   
   
   
   
     var villeencours;
      for (var c=0; c<Cities.numCities; c++){
        var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
        if (matTypeof(que)=='array')
          continue;
        for (k in que){
          if (k == 'm'+marchId){
            villeencours = Cities.cities[c].id;
            break;
          }
        }    
      }   
      unsafeWindow.cm.recall.ask(marchId, villeencours);
      return false;
  },
};



/*******************************************/


var PageNavigator = {
  modalMessagesFunc : null,
  ctrlPaginationOld : null,
  loadPage_paginationOld : null,
  cpPager : null,
  
  init : function (){
    var t = PageNavigator;
    t.modalMessagesFunc = new CalterUwFunc ('modal_messages', [
        [/pageNavigatorModel =.*$/im, 'var pager = new ptPagerHook(0,5); pageNavigatorModel=pager'],
        [/pageNavigatorView =.*$/im, 'pageNavigatorView=pager'],
        [/pageNavigatorController =.*$/im, 'pageNavigatorController=pager']
        ]);
    unsafeWindow.ptPagerHook = t.Cpager;
    t.ctrlPaginationOld = unsafeWindow.ctrlPagination;
    t.loadPage_paginationOld = unsafeWindow.loadPage_pagination;
    t.cpPager = new t.Cpager (0,0);
    t.cpPager.oldStyle = true;
    t.enable(Options.fixPageNav);
  },

  // called on 'back' ...
  loadPage_pagination : function (divId, currentPage, callbackFunction, totalPages) {
    var t = PageNavigator;
    var curPage = parseInt(currentPage);
//logit ('loadPage_pagination: '+  divId +','+ t.cpPager.divId +','+ currentPage +','+ callbackFunction +','+ totalPages +','+ t.cpPager.getCurrentPage()); 
    if (divId == t.cpPager.divId) // if 'old' style ...  
      unsafeWindow[callbackFunction] (t.cpPager.getCurrentPage());
    else
      unsafeWindow[callbackFunction] (currentPage);
  },
    
  ctrlPagination : function (navDivId, numPages, notify, curPage){
    var t = PageNavigator;
//logit ('ctrlPagination (divid:'+ navDivId +')');    
    if (document.getElementById(navDivId).firstChild == null)
      document.getElementById(navDivId).appendChild (t.cpPager.getHtmlElement());   
    t.cpPager.setPageCount(numPages);
    t.cpPager.divId = navDivId;
    if (!curPage)
      curPage = 1;
    t.cpPager.gotoPage(curPage);
    t.cpPager.onClick = unsafeWindow[notify];
    unsafeWindow.pageNavigatorView = t.cpPager;
  },  
  
  enable : function (tf){
    var t = PageNavigator;
    t.modalMessagesFunc.setEnable(tf);
    if (tf){
      unsafeWindow.ctrlPagination = t.ctrlPagination;
      unsafeWindow.loadPage_pagination = t.loadPage_pagination;
    } else {
      unsafeWindow.ctrlPagination = t.ctrlPaginationOld;
      unsafeWindow.loadPage_pagination = t.loadPage_paginationOld;
    }
  },
  
  isAvailable : function (){
    var t = PageNavigator;
    return t.modalMessagesFunc.isAvailable();
  },
  
  Cpager : function (a, b){
    // public function protos ...
    this.getHtmlElement = getHtmlElement;    
    this.setPageCount = setPageCount;    
    this.getPageCount = getPageCount;    
    this.getCurrentPage = getCurrentPage;    
    this.gotoPage = gotoPage;    
    this.e_but = e_but;    
    this.e_inp = e_inp; 
    //    
    var t = this;
    this.onClick = null;
    this.numPages = b;
    this.curPage = a;
    this.oldStyle = false;
    
    function getHtmlElement (){
    
      function aButton (msg, evtPage){
        return '<A class=ptPageNav onclick="pageNavigatorView.e_but(\''+ evtPage +'\')"><SPAN class=ptPageNav>'+ msg +'</span></a>';
      }
      var div = document.createElement ('div');
      div.id = 'ptPageNavBar';
  
      div.innerHTML = '<STYLE>table.ptPageNav tr td  {border:none; text-align:center; padding:0px 1px;}\
        span.ptPageNav {font-size:12px; background:inherit; line-height:135%}\
        A.ptPageNav {background-color:#44e; color:#ff4; display:block; border:1px solid #666666; height:18px; width:18px;}\
        A.ptPageNav:hover {background-color:#66f;}\
        A.ptPageNav:active {background-color:#186}\
        </style>\
        <center><TABLE class=ptPageNav><TR valign=middle>\
        <TD style="margin-right:15px">'+ aButton('<SPAN style="padding-right:0.8em; letter-spacing:-0.99em;">&#x258f;&#x258f;&#x25c4;</span>', 'F') +'</td>\
        <TD>'+ aButton('&#x25c4', '-') +'</td>\
        <TD>'+ aButton('&#x25ba', '+') +'</td>\
        <TD style="margin-right:15px">'+ aButton('<SPAN style="padding-right:1.05em; letter-spacing:-0.99em;">&#x25ba;&#x2595;&#x2595;</span>', 'L') +'</td>\
        <TD width=20></td><TD>Page <INPUT id=ptPagerPageNum onChange="pageNavigatorView.e_inp()" type=text size=1> de <span id=ptPagerNumPages>?</span></td>\
        </tr></table></center>';
    
          var mml = document.getElementById('modal_msg_list');
      if (mml != null)
        mml.style.minHeight = '320px';
      return div;
    }

    function getPageCount(){    // koc needs for 'back'
      return t.numPages;
    }    
    function getCurrentPage(){    // koc needs for 'back'
      return t.curPage;
    }    
    function setPageCount(c){
      t.numPages = c;
      document.getElementById('ptPagerNumPages').innerHTML = c;
      var mml = document.getElementById('modal_msg_list');
      if (mml != null){
        if (document.getElementById('modal_msg_tabs_report').className.indexOf('selected') >= 0)
          mml.style.minHeight = '460px';
        else
          mml.style.minHeight = '320px';
      }
    }
    function gotoPage(p){
      t.curPage = parseIntZero(p);
      document.getElementById('ptPagerPageNum').value = t.curPage;
    }
    function e_but (p){
      if (p=='F' && t.curPage!=1)
        loadPage(1);
      else if (p=='-' && t.curPage>1)
        loadPage(t.curPage-1);
      else if (p=='+' && t.curPage<t.numPages)
        loadPage(t.curPage+1);
      else if (p=='L' && t.curPage!=t.numPages)
        loadPage(t.numPages);
      function loadPage (p){
        if (t.oldStyle)
      t.gotoPage(p);
        t.onClick (p);
      }
    }
    function e_inp (p){
      var pageNum = parseIntZero(document.getElementById('ptPagerPageNum').value);
      t.onClick(pageNum);
    }
  },
}


// TODO: Handle multiple instances altering same function!!
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


var MessageCounts = {
  messagesNotifyFunc : null,
  
  init : function (){ 
    var t = MessageCounts;
    t.messagesNotifyFunc = new CalterUwFunc ('messages_notify_bug', [
        ['$("chrome_messages_notify").innerHTML = a;', 'msgCount_hook(a);'],
       ['$("chrome_messages_notify").show();', ''],
        ['$("chrome_messages_notify").hide();', '$("chrome_messages_notify").hide(); $("chrome_messages_notifyL").hide();']  ]);
    if (t.messagesNotifyFunc.isAvailable()){
      unsafeWindow.msgCount_hook = t.msgCount_hook;
      e = document.getElementById('chrome_messages_notify');
      span = document.createElement('span');
      span.className='notificationCount';
      span.style.display='none';
      span.id = 'chrome_messages_notifyL';
      span.style.left = '6px';
      e.parentNode.insertBefore (span, e);
      if (Options.fixMsgCount){
              t.enable (true);
              setTimeout (unsafeWindow.messages_notify_bug, 1000);
     }
    }
  },
  
  msgCount_hook : function (a){
    var l = document.getElementById('chrome_messages_notifyL');
    var r = document.getElementById('chrome_messages_notify');
    if (parseInt(Seed.newMailCount) > 0) {
      l.innerHTML = parseInt(Seed.newMailCount);
      l.style.display = 'block';
    } else {
      l.style.display = 'none';
    }
    var reports = parseInt(Seed.newTradeReports) + parseInt(Seed.newReportCount);
    if (reports < 1)
      r.style.display = 'none';
    else {
      r.innerHTML = reports;
      r.style.display = 'block';
    }
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
    t.modalAttackFunc.setEnable(true);
  },
   
  enable : function (tf){
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
      new CdialogCancelContinue ('IMPOSSIBLE DE PARTIR SUR LES COORDONNEES 0,0 !', null, unsafeWindow.modal_attack_check, document.getElementById('modalInner1'));      
    } else {
      unsafeWindow.modal_attack_check();
    }
  },
  
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


function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  /*var pop = new CPopup ('ptcancont', 0, 0, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptcccancel type=submit value="ANNULER" \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value="CONTINUER" \></td></tr></table>';
  document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
  document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
  pop.show(true);
  */
  alert(msg);
  return false;
}

function setTabStyle (e, selected){
  if (selected){
    e.className = 'matTabSel';
  } else {
    e.className = 'matTabNotSel';
  }
}

function clickedTab (e){
  who = e.target.id.substring(2);
  newObj = my[who];
  currentObj = my[currentName];
  if (currentName != who){
    setTabStyle (document.getElementById ('aa'+currentName), false);
    setTabStyle (document.getElementById ('aa'+who), true);
    if (currentObj){
      currentObj.hide ();
      currentObj.getContent().style.display = 'none';
    }
    currentName = who;
    cont = newObj.getContent();
    newObj.getContent().style.display = 'block';
  }
  newObj.show();
}

function clickedTab2 (e){
  who2 = e.target.id.substring(3);
   newObj2 = myBO[who2];
  currentObj2 = myBO[currentName2];
  if (currentName2 != who2){
    setTabStyle (document.getElementById ('ab'+currentName2), false);
    setTabStyle (document.getElementById ('ab'+who2), true);
    if (currentObj2){
      currentObj2.hide ();
      currentObj2.getContent().style.display = 'none';
    }
    currentName2 = who2;
    cont = newObj2.getContent();
    newObj2.getContent().style.display = 'block';
  }
  newObj2.show();
}

function mouseMainTab (me){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}
function mouseMainTab2 (me){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop2.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    my[currentName].show();
    Options.ptWinIsOpen = true;
  } else {
    my[currentName].hide();
    Options.ptWinIsOpen = false;
  }
  saveOptions();
}
function eventHideShow2 (){
  if (mainPop2.toggleHide(mainPop2)){
    myBO[currentName2].show();
    Options.ptWin2IsOpen = true;
  } else {
    myBO[currentName2].hide();
    Options.ptWin2IsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  my[currentName].hide();
  Options.ptWinIsOpen = false;
  saveOptions();
}

function addMyFunction (func){      // add function to run in our own scope
  unsafeWindow[func.name] = func;
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

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}


// onClick (city{name, id, x, y}, x, y)   city may be null!
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
    eX.maxLength=3;
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


function DialogRetry (errMsg, seconds, onRetry, onCancel){
  seconds = parseInt(seconds);
  rdiv = document.getElementById ('RetryDialog');
  if (!rdiv){
    rdiv = document.createElement('div');
    kochead = unsafeWindow.document.getElementById('kochead');
    kochead.appendChild(rdiv);
    rdiv.id = 'RetryDialog';
    rdiv.style.background = "#fee";
    rdiv.style.border = "3px ridge #666";
    rdiv.style.zIndex = '200100';
    rdiv.style.width = '500px';
    rdiv.style.height = '200px';
    rdiv.style.position = "absolute";
    rdiv.style.top = "50px";
    rdiv.style.left = "115px";
    rdiv.innerHTML = '<DIV style="background: #cccccc"><CENTER>Boite outils</div>\
      <CENTER><BR><FONT COLOR=#550000><B>Une erreur a &eacute;t&eacute; d&eacute;tect&eacute;e :</b></font><BR><BR><DIV id=retryErrMsg></div>\
      <BR><BR><B>Nouvel essai dans <SPAN id=retrySeconds></b></span> secondes ...<BR><BR><INPUT id=retryCancel type=submit value="ANNULER" \>';
    document.getElementById('retryCancel').addEventListener ('click', doCancel, false);
  }
  rdiv.style.display = 'block';
  document.getElementById('retryErrMsg').innerHTML = errMsg;
  document.getElementById('retrySeconds').innerHTML = seconds;
  rTimer = setTimeout (doRetry, seconds*1000);
  countdown ();

  function countdown (){
    document.getElementById('retrySeconds').innerHTML = seconds--;
    if (seconds > 0)
      cdTimer = setTimeout (countdown, 1000);
  }
  function doCancel(){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    rdiv.style.display = 'none';
    onCancel ();
  }
  function doRetry (){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    rdiv.style.display = 'none';
    onRetry();
  }
}

function MyAjaxRequest (url, o, noRetryX){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;

  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

if (DEBUG_TRACE) logit (" 1a myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  new Ajax.Request(url, opts);
  return;

  function myRetry(){
    ++retry;
    new Ajax.Request(url, opts);
    delay = delay * 1.25;
  }

  function myFailure(){
    var o = {};
if (DEBUG_TRACE) logit ("myAjaxRequest.myFailure(): "+ inspect(rslt, 1, 1));
    o.ok = false;
    o.errorMsg = "AJAX Communication Erreur";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (rslt.updateSeed)
      unsafeWindow.update_seed(rslt.updateSeed);
    if (rslt.ok){
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess(): "+ inspect(rslt, 1, 1));
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      wasSuccess (rslt);
      return;
    }
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess() !ok : "+ inspect(rslt, 3, 1));
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      DialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}


// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  return 'neutral';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}


function getDiplomacy2 (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'Neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'Friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'Hostile';
  if (aid == Seed.allianceDiplomacies.allianceId)
    return 'Ally';
  return 'Neutral';
};




// TODO: Check times for expired marches !?!?!
// note: unselected city has outdated info

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

var fortNamesShort = {
  53: "Arbaletes",
  55: "Trebuchet",
  60: "Pieges",
  61: "Chausse-trape",
  62: "Palissade",
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



function logit (msg){
  var serverID = GetServerId();
  var now = new Date();
  GM_log (serverID +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
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
          WinLog.write ('<A TARGET=_tab HREF="'+ scripts[i].src +'">'+ scripts[i].src +'</a>');
      }
    }
    
    if (t.popDebug == null){  
      t.popDebug = new CPopup ('db', 0, 0, 400,500, true);
      t.popDebug.getTopDiv().innerHTML = 'DEBUG';
      t.popDebug.getMainDiv().innerHTML = '<DIV><INPUT type=submit id=dbsuball value=ALL> &nbsp; <INPUT type=submit id=dbsubnone value=NONE> &nbsp; \
        <INPUT type=submit id=dbdefaults value=DEFAULTS> &nbsp; <INPUT type=submit id=dbsubdo value=SHOW>&nbsp; <INPUT type=submit id=dbsubscripts value=SCRIPTS></div>\
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


function saveOptions (){
  var serverID = GetServerId();
  GM_setValue ('BOOptions_'+serverID, JSON2.stringify(Options));
}

function readOptions (){
  var serverID = GetServerId();
  s = GM_getValue ('BOOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts)
      Options[k] = opts[k];
  }
}

function createButton (label){
  var a=document.createElement('a');
  a.className='button20';
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text);
  a.className='tab';
  a.id = 'ptOfficial';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if(tabs) {
  
   var e = tabs.parentNode;
    var eNew = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
   
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' &&  ee.id!='main_engagement_tabs'){
        eNew = ee;
        break;
      }
    }
    if (eNew == null){
      eNew = document.createElement('div');
      eNew.className='tabs_engagement';
      eNew.style.background='#ca5';
      tabs.parentNode.insertBefore (eNew, tabs);
      eNew.id = 'gmTabs';
      eNew.style.whiteSpace='nowrap';
      eNew.style.width='735px';
    }
    if (eNew.firstChild){
      eNew.insertBefore (a, eNew.firstChild);
    }else{
      eNew.appendChild(a);
     }
    
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}
function AddMainTabLink2(text, eventListener, mouseListener) {
  var b = createButton (text);
  b.className='tab';
  b.id = 'ptOfficial2';
  
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if(tabs) {
  
   var e = tabs.parentNode;
    var eNew = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
   
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' &&  ee.id!='main_engagement_tabs'){
        eNew = ee;
        break;
      }
    }
    if (eNew == null){
      eNew = document.createElement('div');
      eNew.className='tabs_engagement';
      eNew.style.background='#ca5';
      tabs.parentNode.insertBefore (eNew, tabs);
      eNew.id = 'gmTabs';
      eNew.style.whiteSpace='nowrap';
      eNew.style.width='735px';
    }
    if (eNew.firstChild){
      eNew.insertBefore (b, eNew.firstChild);
    }else{
      eNew.appendChild(b);
     }
    
    b.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      b.addEventListener('mousedown',mouseListener, true);
    return b;
  }
  return null;
}


unsafeWindow.PTscout = function (x, y){
  //hideMe ();  
  setTimeout (function (){ 
    
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    unsafeWindow.changeview_map(document.getElementById('mod_views_map'));
	unsafeWindow.modal_attack(3,x,y);
  }, 0);
};


/**********************************************************************************/

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
//  return ('<A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a>' );
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}

function strButton14 (label, tags){
  if (tags == null)
    tags = '';
  return ('<A class="button14 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a>' );
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

// Simple method, as if it were typed in thru DOM
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

// works well, but message is not echoed back to local client
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



/************  LIB classes/functions .... **************/
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
  display : function (label, noReset){
    now = new Date();
    elapsed = now.getTime() - DebugTimer.startTime;
    //logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};

function debugPos  (e){
  return 'client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
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


function htmlTitleLine (msg){
  return '<TABLE width=100% cellspacing=0><TR><TD style="padding:0px" width=50%><HR></td><TD style="padding:0px">[ '+ msg +' ]</td><TD style="padding:0px" width=50%><HR></td></tr></table>';  
}


// creates a 'popup' div
function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  // protos ...
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainDiv = getMainDiv;
  this.getZindex = getZindex;
  this.setZindex = setZindex;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'CPopup '+ prefix +'_CPopup';
  this.div.style.background = "#fff";
  this.div.style.zIndex = "111111";        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="CPopupTop"><TD id="'+ prefix +'_top" width=99%></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color: #fff; background: #555; padding-left: 5px; padding-right: 5px;">X</td></tr>\
      <TR><TD valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', new CeventXClose(this).handler, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);

  function CeventXClose (that){
    var t = that;
    this.handler=handler;
    function handler (){
      t.show(false);
      if (t.onClose != null)
        t.onClose();
    }
  }

  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }

  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }

  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }

  function setZindex(zi){
    this.div.style.zIndex = ''+zi;
  }

  function getZindex(){
    return parseInt(this.div.style.zIndex);
  }

  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }

  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }

  function show(tf){
    if (tf)
      this.div.style.display = 'block';
    else
      this.div.style.display = 'none';
  }

  function toggleHide(t){
    if (t.div.style.display == 'block') {
      t.div.style.display = 'none';
      return false;
    } else {
      t.div.style.display = 'block';
      return true;
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
if (DEBUG_TRACE_DRAG) t.dispEvent ('eventDOWN', me);
      if (t.bounds == null){
        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
if (DEBUG_TRACE_DRAG) logit ('Clickable rect: '+ inspect (t.clickableRect, 3, 1));
if (DEBUG_TRACE_DRAG) logit ('Body rect: '+ inspect (t.bodyRect, 3, 1));
if (DEBUG_TRACE_DRAG) logit ('Bound rect: '+ inspect (t.boundRect, 3, 1));
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
if (DEBUG_TRACE_DRAG) logit ("BOUNDS: "+ inspect (t.bounds, 8, 10));
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
if (DEBUG_TRACE_DRAG) t.dispEvent ('eventUP', me);
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
if (DEBUG_TRACE_DRAG) logit ('doneMoving');
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
//t.dispEvent ('eventOUT', me);
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
//t.dispEvent ('eventMOVE', me);
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

String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;' };
String.prototype.htmlEntities = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}

String.prototype.stripTags = function(){ 
  return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
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

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
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

function ById(id) {
	return document.getElementById(id);
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

function SelectAll(id)
{
 document.getElementById(id).focus();document.getElementById(id).select();
} 

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
}

};
//if (unsafeWindow.domainName == 'Clarent232' && getMyAlliance()[0]==2578) 
ptStartup ();


