// ==UserScript==
// @name           Attack Script
// @namespace      mat
// @include        http://*.castle.wonderhill.com/*
// @include        http://apps.facebook.com/dragonsofatlantis/*
// @match          http://*.castle.wonderhill.com/*
// @match          http://apps.facebook.com/dragonsofatlantis/*
// @description    Tools for Dragons of Atlantis modfified by plac
// ==/UserScript==

var Version = '1.3 beta';
var Title = kDOAPowerTools;
var WebSite = 'Max Haxx';
var VERSION_CHECK_HOURS = 4;
var DEBUG_TRACE_AJAX = 2;
var DEBUG_MARCHES = false;
var MAP_DELAY = 1250;
var MIN_DELAY = 15;
var EMULATE_NET_ERROR = 0;  // percentage
var ENABLE_DEBUG_TAB = false;
var ENABLE_WINLOG = false;
var ALERT_ON_BAD_DATA = false;

var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

var Tabs = {};
var currentName = kInfo;
var mainPop;
var CPopUpTopClass = 'pbPopTop';
var gAttScrollPos = 0;
var gMapScrollPos = 0;
var C = {};
C.attrs = {};

// Translation strings
const kInfo = 'Info';
const kAttack = 'Attack';
const kAttack1 = 'Attack ';
const kAttack2 = 'Attacks: ';
const kAttackNow = '"Attack Now"';
const kSkipAttack = '"Skip Attack"';
const kFatalSWF = '"<B>Error initializing:</b><BR><BR>Unable to find SWF element"';
const kStartupErr = '"Unable to start:<BR>"';
const kInitErr = '"<B>Error initializing:</b><BR><BR>"';
const kWaveTitle = 'Attack One Target in Waves';
const kAttackStatsTitle = 'Auto-attack Stats';
const kClearStats = '"Clear Stats"';
const kTroopsLost = 'Troops lost! (';
const kAutoOn = 'Auto ON';
const kAutoOff = 'Auto OFF';
const kNoTargetTroops = 'No targets/troops available';
const kErrSendAttack = 'ERROR! (sendAttack is busy, no response from server?)';
const kAttackingLevel = 'Attacking level ';
const kCampAt = ' camp at ';
const kAttackSent = 'Attack sent to level ';
const kAttackErr = 'Attack Error: ';
const kNoTroopsDefined = 'No Troops Defined';
const kNotEnough = 'Not enough ';
const kMusterPointFull = 'Muster Point Full';
const kNoGenerals = 'No Generals Available';
const kAutoAttack = 'Auto-attack ';
const kAutoAttackConfig = 'Auto-attack Configuration';
const kRandomDelay = 'Random delay between attacks:';
const kTo = ' to ';
const kSeconds = ' seconds ';
const kSameTargetDelay = 'Same target delay: ';
const kTwentyMinutes = ' 20 minutes';
const kLogAttacks = 'Log attacks: ';
const kDeleteMarchReports = 'Delete March Reports: ';
const kStopOnLoss = 'Stop if any troops lost: ';
const kMaxMarches = 'Maximum simultaneous marches: ';
const kRescanMap = '" Rescan Map "';
const kInvalidDelay = 'Invalid delay(s)';
const kFirstValue = 'First value must be between ';
const kSecondValue = ' and 3600<BR>Second value must be at least 5 above the first value.';
const kLastAttack = 'Last Attack';
const kSendingAttack = 'Sending Attack';
const kOK = 'OK';
const kErrScanningMap = '<B>Bummer, there was an error while scanning the map.</b>';
const kMaps = 'Maps';
const kLake = 'Lake';
const kMapping = 'Mapping';
const kMapTypes = '" Map Types "';
const kTargets = '" Targets "';
const kConfig = '"Config"';
const kStats = '"Stats"';
const kMapCategories = 'Map Categories';
const kAnthropusCamp = 'Anthropus Camp';
const kCity = 'City';
const kOutpost = 'Outpost';
const kSavanna = 'Savanna';
const kSwamp = 'Swamp';
const kHill = 'Hill';
const kPlain = 'Plain';
const kMountain = 'Mountain';
const kForest = 'Forest';
const kSearch = '" Search "';
const kTransferMap = '" Transfer to Attack "';
const kScanningMap = 'Scanning map within 35 miles<BR>This should take about a minute';
const kList = ' List';
const kDistance = 'Dist';
const kCoords = 'Coords';
const kLvl = 'Lvl';
const kCityName = 'City Name';
const kLord = 'Lord';
const kPower = 'Power';
const kAlliance = 'Alliance';
const kLevels = ' Levels';
const kBuild = 'Build';
const kGarrison = 'Garrison';
const kHome = 'Home';
const kFortress = 'Fortress';
const kSentinel = 'Sentinel';
const kMusterPoint = 'MusterPoint';
const kOfficerQuarter = 'OfficerQuarter';
const kStorageVault = 'StorageVault';
const kDragonKeep = 'DragonKeep';
const kWall = 'Wall';
const kMine = 'Mine';
const kFarm = 'Farm';
const kLumberMill = 'LumberMill';
const kQuarry = 'Quarry';
const kTrainingCamp = 'TrainingCamp';
const kSilo = 'Silo';
const kAutoBuildOn = 'Auto Build ON';
const kAutoBuildOff = 'Auto Build OFF';
const kCityNumber = 'City #';
const kLevel = 'level ';
const kLevel1 = ' Level';
const kNothingToDo = 'Nothing to do, disabling auto-build.';
const kBuildingLevel = 'Building level ';
const kAt = ' at ';
const kBuildErr = 'BUILD ERROR: ';
const kTooManyBuildErrs = 'Too many errors, disabling auto-build';
const kOpts = 'Opts';
const kOptions = 'Options';
const kEnableDrag = 'Enable window drag (move window by dragging <BR>top bar with mouse)';
const kFeatures = 'Features: ';
const kAutoCollectAt = 'Auto-collect resources from outpost(s) every: ';
const kDOAPowerTools = 'Attack Script';
const kCancel = '"CANCEL"';
const kContinue = '"CONTINUE"';
const kAutoRetry = 'Automatic retry in ';
const kSeconds1 =  'seconds ...';
const kCancelRetry = '"CANCEL Retry"';
const kNewVersionAvailable = 'New Version Available!';
const kAnnounceVersion = 'There is a new version<BR><BR>Version: ';
const kRemindLater = '"Remind me later"';
const kNoReminder = '"Don\'t remind me again"';
const kWave = 'Wave';
const kSpy = 'Spy';
const kLBM = 'LBM';
const kBatDrg = 'BatDrg';
const kSSDrg = 'SSDrg';
const kFireM = 'FireM';
const kFang = 'Fang';
const kATrans = 'ATrans';
const kTargetCoords = 'Target Coords: ';
const kDistance1 = 'Distance: ';
const kWaveTroops = 'Troops for Wave Attack: ';
const kDeleteBattleReports = ' Delete battle reports:';
const kDelayBetweenAttacks = 'Delay Between attacks: ';
const kResetStats = '"Reset Stats"';
const kGot = ': Got ';
const kRunTime = 'Run Time: ';
const kAttackOn = 'Attacks ON';
const kAttackOff = 'Attacks OFF';
const kError = 'Error: ';
const kStatsStarted = 'Stats started at: ';
const kResources = 'Resources: ';
const kStatsBy = 'Stats by ';
const kEnable = 'Enable: ';
const kDistanceWarning = 'Distance must be between 1 and ';
const kTroopWarning = 'Invalid # of troops';
const kMaxDist = 'Max Dist: ';
const kRefresh = '"refresh"';




/******************
George's Current: 
*) auto ant: update stats only when report rx'ed (i/o on tick)
*) better startup (looking for SWF element)
*) auto-build: add musterpoint, gen quarters, etc.

Wham's Current:
*) auto-collect every 4 hours
*) show the user that this is a modified script (add mod by Wham to displayed strings)
*) changed the 1 hour timer re-hitting Ant Camps to 20 minutes
*) fix a bug that caused NaN/hr in the Ant Camp stats panel (division by zero)
*) added call to showStats() after clearStats()
*) fixed a bug that caused the per hour resource rate to not display correctly
*) changed checkVersion to download this script (not George's original)
*) added Maps tab - searches and displays ant camps, cities, outposts, grasslands, swamps, lakes, hills, plains, mountains, and forests within 35 miles
*) allow mapped objects to be attacked, changed the Ant tab name to Attack to reflect new functinality
*) user interface changes: buttons (hover, active, cursor), remember last sub-tab displayed, make sub-tabs behave and look like tabs
*) find defending/hiding status to include on the info tab
        
TODO: 
  build: refetch seed (once only) if 'queue full' error
  wave: option to log attacks
  wave: option for max waves to send out
  wave: multiple targets
  wave: multiple wave defs
  config: button (confirm dialog) to reset all data to defaults
  Missing reports (due to missing march in 'seed')?
  watchdog on ajax - # of requests per 10 seconds, # of same errors in a row, etc
******************/
  
// Changes: 
// campAttack -> objAttack because we allow all map objects to be attacked
// deleteCampAttacks -> deleteObjAttacks
// camp -> mapObject
// campMarches -> objMarches
//
// This is part of a sweeping change to remove the camp terminology and replace it with mapped objects (e.g. mountains, plains, cities, etc.)
var OptionsDefaults = {
  ptWinIsOpen  : true,
  ptWinDrag    : true,
  ptWinPos     : {},
  objAttack   : {enabled:false, repeatTime:1201, delayMin:30, delayMax:60, levelEnable:[], levelDist:[null,10,10,10,10,10,10,10,10,10,10], deleteObjAttacks:false, stopAttackOnLoss:false, logAttacks:true, maxMarches:10},
  currentTab  : false,
  attackTab : 0,
  mapTab : 0,
  autoCollect : {enabled:false, lastTime:0, delay:8*3600},
  autoBuild   : {enabled:false, buildingEnable:[] },
  messages    : {lastRead:0, missing:0},
  waves       : null,
  objStats   : null,
  objMarches : {},
  version     : {lastChecked:0, checkVersion:Version, lastVersion:Version},
  maps        : {enabled:false, repeatTime:1201, delayMin:30, delayMax:60, levelEnable:[], levelDist:[null,10,10,10,10,10,10,10,10,10,10], deleteObjAttacks:false, stopAttackOnLoss:false, logAttacks:true, maxMarches:10},
  mapChoice   : '',
  mapMarches  : {},
  autoColInt  : 8,
//  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, minTroops:10000, spamLimit:10 },
};

var Styles = '\
  div {margin:0 ! important}\
  div.pbTitle {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#436}\
  div.pbSubtitle {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#444}\
  div.pbInput {border:2px ridge yellow; background-color:#ffffee; padding:3px}\
  div.pbStatBox {border:2px ridge black; background-color:#efefe0; padding:2px}\
  div.short {height:7px;}\
  div#qTip {padding: 3px; border: 1px solid #777; border-right-width: 2px; border-bottom-width: 2px; display: none; background: #999; color: #fff; font: bold 9px Verdana, Arial, sans-serif; text-align: left; position: absolute; z-index: 1000}\
  table.pbTabPad tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px}\
  table.pbTab tr td {border:none; background:none; white-space:nowrap; padding: 0px 4px;}\
  table tr td.pbTabLeft {font-weight:bold; text-align:right; padding-right: 5px}\
  table.pbTabLined tr td {border-bottom:1px solid #ccc; background:none; white-space:nowrap; padding: 1px 4px 1px 4px;}\
  table tr.pbTabHdr1 td {background-color:#dde; font-weight:bold}\
  table tr.pbTabHdr2 td {font-weight:bold}\
  tr.pbMarchOther td {color:#888888}\
  tr.pbMarchMine td {color:#000000}\
  tr.pbPopTop td { background-color:#dde; border:none; height: 21px;  padding:0px; }\
  tr.pbretry_ptPopTop td { background-color:#a00; color:#fff; border:none; height: 21px; padding:0px; }\
  tr.pbOwned {background-color: #e80000; color:white}\
  table.pbMainTab {empty-cells:show; margin-top:5px; }\
  table.pbMainTab tr td a {color:inherit }\
  table.pbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 2px solid; border-style: none none solid none; }\
  table.pbMainTab tr td.spacer {padding: 0px 3px; border:none; }\
  table.pbMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed; cursor:hand; cursor:pointer; padding: 2px;}\
  table.pbMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#0044a0; color:white; border-color:black; cursor:hand; cursor:pointer; padding: 2px;}\
  .CPopup .CPopMain { background-color:#f8f8f8; padding:6px;}\
  .CPopup  {border:3px ridge #666}\
  input.butAttackOff {width:110px; background-color:#e80000; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.butAttackOff:hover {width:110px; background-color:#f80000; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.butAttackOn {width:110px; background-color:#009C1F; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.butAttackOn:hover {width:110px; background-color:#2FAC2F; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.small {margin:0; padding-top:0; padding-bottom:0; padding-left:1px; padding-right:1px; font-size:10px}\
  input.short {width:30px}\
  input.greenButton {width:120px; background-color:#009C1F; color:white; font-weight:bold; cursor:hand; cursor:pointer;}\
  input.greenButton:active {width:120px; background-color:black; color:white; font-weight:bold; cursor:hand; cursor:pointer; }\
  input.greenButton:hover {width:120px; background-color:#2FAC2F; color:white; font-weight:bold; cursor:hand; cursor:pointer; }\
  .button {cursor:hand; cursor:pointer; border: 1px solid #006; background: #0044a0; color: white; padding: 2px; font-weight:bold; font-size:13px; border-style: solid solid none solid;}\
//  .button:hover {background: #eed; font-weight:bold; font-size:13px; color: black; border-style: solid solid none solid; }\
//  .button:active {background: black; font-weight:bold; font-size:13px; color: white; border-style: none none none none;}\
  span.boldRed {color:#550000; font-weight:bold}\
  hr.thin {margin:0px; padding:0px}\
  #hd ul.tabs li.tab a.toolbutOn {background-color:#900 ! important; color:white ! important}\
  #hd ul.tabs li.tab a.toolbutOff {background-color:#ffc ! important; color:black ! important}\
  ';

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON; 

if (document.URL.search(/apps.facebook.com\/dragonsofatlantis/i) >= 0){
  facebookInstance ();
  return;
}

function debel (e, msg){
  if (!e)
    logit (msg + ': null')
  else
    logit (msg + ': '+ e.tagName + ' , '+ e.className);
}

//***  Run only in "apps.facebook.com" instance ... ***
function facebookInstance (){
  function setWide (){
logit ('facebookInstance:setWide');  
    var e = document.getElementById('iframe_canvas');
    if (!e){
      setTimeout (setWide, 1000);
      return;
    }  
    e.style.width = '100%';
    e.style.height = '1050px';
    while ( (e=e.parentNode) != null)
      if (e.tagName=='DIV')
        e.style.width = '100%';
    document.getElementById('rightCol').style.display='none';
  }
  setWide();
}


function getC (swf){
  var parms = swf.innerHTML;
  var re = /\<\s*param\s*(.*?)\>/gi;
  var attrs={};
  while ((m = re.exec(parms)) != null){
    var nv = parseNvQuoted(m[1]);
    if (nv.name && nv.name=='flashvars'){
      m = entityDecode(nv.value).split('&');
      for (var i=0; i<m.length; i++){
        var mm = m[i].split('=');
        attrs[mm[0].trim()] = mm[1].trim();
      }
      break;
    }
  }
  // will have to enhance this if they change the names ...
  C.attrs.apiServer = attrs.api_server;
  C.attrs.sessionId = attrs.session_id;
}

var dtStartupTimer = null;
var doatLoaded = false;
var startupCount = 0;

// Main entry
function dtStartup (){
  clearTimeout (dtStartupTimer);
  if (doatLoaded)
    return;
logit ('dtStartup'); 

  if (++startupCount > 10){
    dialogFatal (kFatalSWF);
    return;
  }
  try {  
    var swf = null;
    var obs = document.getElementsByTagName ('object');
    if (obs.length < 1){
      dtStartupTimer = setTimeout (dtStartup, 1000);
      return;
    }
    for (var i=0; i<obs.length; i++){
      if (obs[i].type && obs[i].type=='application/x-shockwave-flash'){
        swf = obs[i];
        getC (swf);
        if (C.attrs.apiServer)
          break;
      }
    }
    if (!C.attrs.apiServer){
      dtStartupTimer = setTimeout (dtStartup, 1000);
      return;
    }  
  } catch (e){
    dtStartupTimer = setTimeout (dtStartup, 1000);
    return;
  }

  doatLoaded = true;
  try {
    WinLog.enabled = ENABLE_WINLOG;
    logit (inspect (C, 6, 1));
    Data.init({options:OptionsDefaults, log:[], targets:{radius:0, center:{x:0, y:0}, mapObjects:[], camps:[], cities:[], outposts:[], grasslands:[], swamps:[], lakes:[], hills:[], plains:[], mountains:[], forests:[]}});
    Data.options.autoCollect.delay = 4*3600;
    checkVersion ();
    var swfCont = swf;
    while ((swfCont = swfCont.parentNode) != null && swfCont.style){
      swfCont.style.margin = '';   
      swfCont.style.width = '100%';   
      swfCont.style.background = 'none';
    }
    try {
      document.getElementById('hd').style.width = '760px';   
      document.getElementById('content').style.margin = '';   
    } catch (e) {}
    //C.attrs.sessionId = 'xd234';  //test session id failure
    Seed.init(function(rslt){
      if (rslt.ok){
        gotSeed (rslt);
      } 
      else {
        dialogFatal (kStartupErr+ rslt.errmsg);
        return;
      }
    });
    
    logit ("* Attack Script v"+ Version +" Loaded");
    
  // TODO: Make sure WinPos is visible on-screen ?
    if (Data.options.ptWinPos==null || Data.options.ptWinPos.x==null|| Data.options.ptWinPos.x=='' || isNaN(Data.options.ptWinPos.x)){
      Data.options.ptWinPos.x = 760;
      Data.options.ptWinPos.y = 93;
    }
    mainPop = new CPopup ('dtmain', Data.options.ptWinPos.x, Data.options.ptWinPos.y, 400,800, Data.options.ptWinDrag, 
        function (){
          tabManager.hideTab();
          WinTracker.show (false);
        });
        
    function gotSeed (rslt){    // TODO: check result, retry or disable tools?
      mainPop.getMainDiv().innerHTML = '<STYLE>'+ Styles +'</style>';
      tabManager.init (mainPop.getMainDiv());
      if (Data.options.ptWinIsOpen){
        mainPop.show (true);
        tabManager.showTab();
      }
      AddMainTabLink('Max Haxx', eventHideShow, mouseMainTab);
      actionLog ("* DOA Power Tools mod by plac v"+ Version +" Loaded");
      AutoCollect.init ();
      TestSomething.init ();
      Messages.init ();
      WinTracker.init();
      window.addEventListener('unload', onUnload, false);
      window.addEventListener ('unload', Data.onUnload, false);
    }
  } catch (e){
    dialogFatal (kInitErr + e);
    logit (inspect (e, 8, 1));
  }  
  
}


var WinTracker = {
  timer : null,
  but : null,
  init : function (){
    var t = WinTracker;
    if (!Data.options.ptWinIsOpen)
      t.timer = setInterval (t.blink, 1500);
  },
  show : function (tf){
    var t = WinTracker;
    if (Data.options.ptWinIsOpen == tf)
      return;
    Data.options.ptWinIsOpen = tf;
    mainPop.show (tf);
    if (tf){
      if (t.but)
        t.but.className = 'toolbutOff';
      clearInterval(t.timer);
    } 
    else {
      t.timer = setInterval (t.blink, 1500);
    }
  },
  setBlinkElement : function (e){
    WinTracker.but = e;
  },
  blink : function (){
    var t = WinTracker;
    if (t.but.className == 'toolbutOff')
      t.but.className = 'toolbutOn';
    else
      t.but.className = 'toolbutOff';
  },
}

function onUnload (){
  Data.options.ptWinPos = mainPop.getLocation();
  logit ('=============  onUnload: save win pos');
}

// Translation
function dialogFatal (msg){
  pop = new CPopup ('dtfatal', 200,300, 400,300, true); 
  pop.getMainDiv ().innerHTML = '<STYLE>'+ Styles +'</style><BR>'+ msg ;
  pop.getTopDiv ().innerHTML = '<B><CENTER>Uh ohs</center></b>' ;
  pop.show(true);
}

var RequestQueue = {
  que : {},
  add : function (id, func, maxWaitMillis){
    var t = RequestQueue;
    var now = serverTime();
    var maxWait = maxWaitMillis/1000;
    if (isNaN(maxWaitMillis))
      maxWait = 1;
    if (t.que[id]){
      if (now+maxWaitMillis >= t.que[id][2])
        return;      
      clearTimeout(t.que[id][1]);  
    } 
    var timer = setTimeout (function(){myFunc(id)}, maxWait*1000);
    t.que[id] = [func, timer, now+maxWait];
    //dispQ ('RequestQueue.add id='+ id);  
    function myFunc(id){
      var t = RequestQueue;
      var func = t.que[id][0];
      delete t.que[id];
    //dispQ ('RequestQueue.doit id='+ id);  
      func();
    }
    
    // Translation
    function dispQ (msg){
    var now = serverTime();
      var m = msg + ' (now='+ now +'):\n';
      for (var p in RequestQueue.que)
        m += p +' : '+ RequestQueue.que[p][1] +' : '+ RequestQueue.que[p][2] +' ('+ (RequestQueue.que[p][2]-now) +')\n';
      WinLog.write (m);
    }   
  }, 

  isPending : function (id){
    var t = RequestQueue;
    return t.que[id]?true:false;
  },
}

// Automatic updating
function checkVersion (){
  //if (IsChrome) return;
  var now = new Date().getTime()/1000;
  if (Data.options.version.lastCheck > now-(VERSION_CHECK_HOURS*3600))
    return;
  logit ('CHECKING VERSION.....');   
  var timer = setTimeout (checkVersion, VERSION_CHECK_HOURS*3600*1000);
  GM_xmlhttpRequest({
    method: 'GET',
    url: WebSite,
    onload : function(r){
      var m = r.responseText.match (/var \s*Version\s*=\s*\'(.*)\'/m);
      if (m && m[1]!=Data.options.version.checkVersion){
        clearTimeout (timer);
        pop = new CPopup ('dtver', Data.options.ptWinPos.x, Data.options.ptWinPos.y, 300,200, Data.options.ptWinDrag, remindLater); 
        // Translation
        pop.getTopDiv ().innerHTML = '<CENTER><B>'+ kNewVersionAvailable +'</b></center>';
        pop.getMainDiv ().innerHTML = '<STYLE>'+ Styles +'</style><BR><CENTER>'+ kAnnounceVersion + m[1] 
            +'<BR><BR>at: <A HREF="http://'+ WebSite +'">'+ WebSite +'</a><BR><BR><INPUT id=doaVerRML type=submit value='+ kRemindLater +'\> &nbsp; &nbsp;<INPUT id=doaVerDR type=submit value='+ kNoReminder +'\></center>';
        pop.setLayer(20);
        pop.show(true);
        document.getElementById('doaVerRML').addEventListener('click', remindLater, false);
        document.getElementById('doaVerDR').addEventListener('click', function(){dontRemind(m[1])}, false);
      }
    },
  });
  function remindLater (){
    pop.show(false);
    Data.options.version.lastCheck = now;
    setTimeout (checkVersion, VERSION_CHECK_ITER*1000);
  }
  function dontRemind (v){
    Data.options.version.checkVersion = v;
    pop.show(false);
    Data.options.version.lastCheck = now;
    setTimeout (checkVersion, VERSION_CHECK_ITER*1000);
  }
}

// TODO: reduce n/w traffic - cache up requests
var Messages = {
  readList : [],
  fetchTimer : null,
  lastQueued : 0,
  battleReportListeners : [],
  checkBusy : false,
  
  init : function (){
    Messages.checkMessages(500);
    window.addEventListener ('unload', Messages.onUnload, false);
  },
  
  marchAtTarget : function (){
    var t = Messages;
    t.checkMessages();
  },

  deleteQueue : [],
  deleteMessage : function (msgId){
    var t = Messages;
    if (t.deleteQueue.length == 0)
      t.deleteTimer = setTimeout (doit, 60000);
    t.deleteQueue.push (msgId);
    function doit (){
      var t = Messages;
      //logit ('DELETE MESSAGES:\n'+ inspect (t.deleteQueue, 5, 1));      
      Ajax.messageDelete (t.deleteQueue, function (rslt){
        var t = Messages;
        t.deleteQueue = [];
      });
    }
  },

  onUnload : function (){
    var t = Messages;
    if (t.deleteQueue.length>0)
      Ajax.messageDelete (t.deleteQueue);
 },
  
  // check for battle reports
  checkMessages : function (maxWaitMillis){
    var t = Messages;
    if (t.battleReportListeners.length==0)
      return;
    if (maxWaitMillis == null)
      maxWaitMillis = 30000;
    RequestQueue.add ('checkMessages', doit, maxWaitMillis);      
      
    function doit (){
      Ajax.messageList ('all', function (rslt){
        var t = Messages;
        if (rslt==null)
          return;
        //logit ('messageList:\n' + inspect (rslt, 7, 1));        
        for (var i=rslt.length-1; i>=0; i--){
          if (rslt[i].report_type=="BattleReport" && !rslt[i].read_at){
            if (t.readList.indexOf(rslt[i].id) < 0)
              t.readList.push (rslt[i].id);
          }
        }
        clearTimeout (t.fetchTimer);
        if (t.readList.length > 0)
          t.fetchTimer = setTimeout (t.fetchNext, 2000);
      });
    }
  },  
 
  fetchNext : function (){
    var t = Messages;
    var id = t.readList[0];
    if (!id){
      logit ('t.readList BAD MESSAGE ID:\n'+ inspect (t.readList, 8, 1));
      return;
    }    
    clearTimeout (t.fetchTimer);
    Ajax.messageDetail (id, function (rslt){
      var t = Messages;
      t.readList.shift();
      t.gotBattleReport (rslt);
      if (t.readList.length > 0)
        t.fetchTimer = setTimeout (t.fetchNext, 2500);
    });
  },
  
  gotBattleReport : function (rpt){
    var t = Messages;
if (DEBUG_MARCHES) WinLog.write ('Read Message: '+ rpt.report.location.terrain +' , '+ rpt.report.location.x +','+  rpt.report.location.y +' General: '+ rpt.report.attacker.general.id );    
    for (var i=0; i<t.battleReportListeners.length; i++)
      t.battleReportListeners[i](rpt);
  },
  addBattleReportListener : function (notify){
    var t = Messages;
    t.battleReportListeners.push (notify);
  },
  removeBattleReportListener : function (notify){
    var t = Messages;
    var i = t.battleReportListeners.indexOf (notify);
    if (i>=0)
      t.battleReportListeners.splice (i, 1);
  },
}

Date.prototype.myString = function (){
  return this.toDateString() +' '+ this.toTimeString().substr (0,8);
}

var Seed = {
  s : {},           // seed data  from server 
  cityIdx : {},     // 'indicies'
  cityTs : {},      // timestamps of last update
  jobs : {},        // by city
  marches : {},
  numMarches : 0,
  generals : {},
  numGenerals : 0,
  serverTimeOffset : 0,
    
  init : function (callback){
    var t = Seed;
    t.fetchSeed(callback);
    setInterval (t.tick, 1000);
  },
  
  tick : function (){     // called once per second - to check for job completion
    var t = Seed;
    var now = serverTime () - 1;
    // delete expired marches ...
    for (var pm in t.marches){
      var march = t.marches[pm];
      if ((march.run_at < now-30) || (march.status=='returning' && march.run_at < now-2)){
        delete (t.marches[pm]);
        --Seed.numMarches;
      }
    }
    // check for job completion
    for (var pcity in t.jobs){
      for (var pjob in t.jobs[pcity]){
        var job = t.jobs[pcity][pjob];
        if (job.run_at < (now - 300)){
          if (!job.done){
            //WinLog.write ('****** TIMER Seed.tick: RETAINING \'UNDONE\' JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
            //logit ('****** TIMER Seed.tick: RETAINING \'UNDONE\' JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
          } 
          else
          delete (t.jobs[pcity][pjob]);
        } 
        else if (!job.done && job.run_at<now){
          //WinLog.write ('TIMER Seed.tick: fetchCity JOB  (now='+ serverTime() +'):\n'+ inspect (job, 4, 1)); 
          job.done = true;
          delete (t.jobs[pcity][pjob]);
          var march = Seed.marches[job.march_id];
          // if (!march), march just finished (returned)          
          if (march && job.queue=='march' && march.status=='marching'){  // march just reached target
            if (DEBUG_MARCHES) WinLog.write ('MARCH at TARGET!');
            Messages.marchAtTarget(march);
          }
          t.fetchCity (pcity);
          return;
        }
      }
    }
  },

  fetchSeed : function (notify) {
    var t = Seed;
    var now = new Date().getTime() / 1000;
    new MyAjaxRequest ('player.json', {}, function (rslt){
      if (rslt.ok){
        if (rslt.dat.timestamp)
          t.serverTimeOffset = rslt.dat.timestamp - now;
        t.s = rslt.dat; 
        try {
          for (var i=0; i<rslt.dat.cities.length; i++){
            t.updateCity (i);
          }
        } catch (e) {
          rslt.ok = false;
          rslt.errmsg = e.toString();
        }
      }
      if (notify)
        notify (rslt);
    });
  },

  // if fetchcity is pending, will notify when complete, else notifies right away...
  updateNotifyQueue : [],
  notifyOnUpdate : function (notify){
    var t = Seed;
    if (!RequestQueue.isPending('fetchCity')){
      notify();
      return;
    }
    t.updateNotifyQueue.push (notify);
  },
  
  // TODO: fix march destination when city (shows as bog)
  updateCity : function (cityIdx){
    var t = Seed;
    var scity = t.s.cities[cityIdx];
    if (!Seed.cityIdx[scity.id])
      Seed.cityIdx[scity.id] = cityIdx;
    Seed.cityTs[scity.id] = serverTime();  
    if (cityIdx == 0){
      // generals
      for (var i=0; i<scity.generals.length; i++)
        Seed.generals[scity.generals[i].id] = scity.generals[i];
      Seed.numGenerals = scity.generals.length;
      // marches
      for (var i=0; i<scity.marches.length; i++)
        t.checkAddMarch (scity.marches[i]);    
    }
    // jobs
    for (var i=0; i<scity.jobs.length; i++)
      t.checkAddJob (scity.jobs[i]);
      //logit ('Seed.updateCity: '+ inspect (city, 5, 1));
    for (var i=0; i<t.updateNotifyQueue.length; i++)
      t.updateNotifyQueue[i]();
    t.updateNotifyQueue = []; 
  },
  
  checkAddMarch : function (march){
    if (march.general_id)
      Seed.generals[march.general_id].busy = true;
    if (Seed.marches[march.id]){
      if (march.status=='retreating')
        Seed.marches[march.id].status='returning';
      return;
    }
    var m = cloneProps(march);  
    if (m.march_type == 'AttackMarch')
      m.march_type = 'Attack';
    else if (m.march_type == 'TransportMarch')
      m.march_type = 'Transport';
    if (m.status == 'retreating')
      m.status = 'returning';
    m.target = m.terrain_type;
    if (m.target == 'Bog')
      m.target = 'City '+ m.destination_name;
    else if (m.target == 'AnthropusCamp')
      m.target = 'AntCamp';
    Seed.marches[m.id] = m;
    ++Seed.numMarches;
 },
  
  checkAddJob : function (job){
    var cityId = job.city_id;
    if (!job.run_at){
        WinLog.write ('checkAddJob job.run_at is null:\n'+ inspect (job, 5, 1));
        if (ALERT_ON_BAD_DATA) alert ('checkAddJob job.run_at is null');
    }    
    if (!Seed.jobs[cityId])
      Seed.jobs[cityId] = {};
    if (job.queue == 'march'){
      if (!Seed.marches[job.march_id]){
        WinLog.write ('checkAddJob MISSING MARCH:\n'+ inspect (job, 5, 1) +'\n'+ inspect(Seed.marches, 5, 1));
        if (ALERT_ON_BAD_DATA) alert ('checkAddJob MISSING MARCH');
        if (job.run_at < serverTime())
          return;               // ?????? delete from Seed.jobs  ????
      } 
      else {  
        Seed.marches[job.march_id].run_at = job.run_at;
        Seed.marches[job.march_id].duration = job.duration;
      }
    }    
    if (Seed.jobs[cityId][job.id])
      return;
    job.run_at += 2;      
    Seed.jobs[cityId][job.id] = cloneProps(job);
  },
  
  jsonAddJob : function (job){  // called from various jsons (buildUpgrade) when new job rx'd 
    var t = Seed;
    t.checkAddJob (job);
  },

  jsonGotCity : function (dat){  // call from various jsons when seed data rx'd
    var t = Seed;
    var cityIdx = Seed.cityIdx[dat.city.id];
    //logit ('Seed.updateCity: '+ cityIdx +' ('+ dat.city.id +')'); 
    t.s.cities[cityIdx] = dat.city;
    try {
      t.updateCity (cityIdx);
    } catch (e){
      WinLog.write ('***********'+ e);
    }
  },

  checkIncomingData : function (rslt){
    // check seed for missing building ...      
    for (var ij=0; ij<rslt.dat.city.jobs.length; ij++){
      var job = rslt.dat.city.jobs[ij];
      if (job.queue == 'building'){
        var building = null;
        for (var im=0; im<rslt.dat.city.buildings.length; im++){
          if (rslt.dat.city.buildings[im].id == job.city_building_id){
            building = rslt.dat.city.buildings[im];
            break;
          }
        }
        if (!building){
          WinLog.writeText ('*********************** MISSING BUILDING! ('+ job.city_building_id +') now='+ serverTime() +'\n' + inspect (job, 7, 1) +'\n'+ inspect (rslt, 12, 1));
        if (ALERT_ON_BAD_DATA) alert ('Danger Will Robinson! (missing building)');   
        }
      }
    }
    
    if (!rslt.dat.city.marches)
      return;
    // check seed for missing march ...  
    for (var ij=0; ij<rslt.dat.city.jobs.length; ij++){
      var job = rslt.dat.city.jobs[ij];
      if (job.march_id){
        if (Seed.findMarch(job.march_id, rslt.dat.city.marches) == null){
          WinLog.writeText ('*********************** MISSING MARCH, Job ID:'+ job.march_id +' (now='+ serverTime() +')\n'+ inspect (job, 7, 1) +'\n'
                  + inspect (rslt, 12, 1));
        if (ALERT_ON_BAD_DATA) alert ('Danger Will Robinson! (missing march)');   
        }
      }
    }   
    // check seed for missing march job ...  
    for (var im=0; im<rslt.dat.city.marches.length; im++){
      var march = rslt.dat.city.marches[im];
      var job = null;
      for (var ij=0; ij<rslt.dat.city.jobs.length; ij++){
        if (rslt.dat.city.jobs[ij].march_id == march.id){
          job = rslt.dat.city.jobs[ij];
          break;
        }
      }
      if (job==null){
        WinLog.writeText ('*********************** MISSING JOB FOR MARCH!  marchId:'+ march.id +'\n'+ inspect (rslt, 11, 1));
        if (ALERT_ON_BAD_DATA) alert ('MISSING JOB FOR MARCH!');   
      }
    }
  },
  
  findMarch : function (mid, marches){
    for (var im=0; im<marches.length; im++){
      if (marches[im].id == mid)
        return marches[im];
    }
    return null;
  },
 
  fetchCity : function (cityId, maxTime){  // do on job completion
    if (maxTime==null)
      maxTime = 5000;
    RequestQueue.add ('fetchCity', doit, maxTime);    
    function doit (){    
      new MyAjaxRequest ('cities/'+ cityId +'.json', {}, function (rslt){
        var t = Seed;
        if (rslt.ok){
          t.checkIncomingData(rslt);
          if (rslt.dat.timestamp)
            t.serverTimeOffset = rslt.dat.timestamp - (new Date().getTime() / 1000);
          t.jsonGotCity (rslt.dat);
        }
      });
    }
  },
}


function generalList (cityIdx){
  var ret = {};
  var gens = Seed.s.cities[cityIdx].generals;
  for (var i=0; i<gens.length; i++)
    ret[gens[i].id] = gens[i].name +' ('+ gens[i].rank +')';
  return ret;
}


//******************************** Waves Tab *****************************
Tabs.Waves = {
  tabOrder : 2,
  tabLabel : kWave,
  tabDisabled : false,
  cont : null,
  troopList : [kSpy, kLBM, kBatDrg, kSSDrg, kFireM, kFang, kATrans],
  enabled : false,
  attackTimer : null,
  marchTimer: null,
  attackErrors : 0,
  
  init : function (div){
    var t = Tabs.Waves;
    t.cont = div;

    if (Data.options.waves == null){
      Data.options.waves = {enabled:false, timeLimit:240, iterationMin:15, iterationMax:22, stopOnLoss:true, deleteReports:false, curTarget:0, targets:[], tsStarted:serverTime(), runTime:0};
      for (var i=0; i<5; i++)
        Data.options.waves.targets[i] = {enabled:false, lastAttack:0, troopsWave1:{}, troopsWave2:{}, targetX:0, targetY:0, terrainType:null, terrainLevel:0, stats:{numAttacks:0, spoils:{}}};
    }
    if (!Data.options.waves.iterationMin)
      Data.options.waves.iterationMin = 15;
    var gensel = htmlSelector (generalList(0), '', 'id=pbrptGenSel');
    var m = '<DIV class=pbTitle>'+kWaveTitle+'</div>\
       <DIV id=pbwaveStatus class=pbStatBox style="margin-bottom:5px !important">\
       <CENTER><INPUT type=submit value="OnOff" id=pbwaveEnable></input></center>\
       <DIV id=pbwaveMarches style="height:165px; max-height:165px; overflow-y:auto;"></div>\
      <DIV id=pbwaveFeedback style="height: 17px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px; text-align:center; font-weight:bold"></div></div>\
      <DIV class=pbInput>\
      <DIV style="height:48px;"><B>'+ kTargetCoords +'</b> &nbsp; X:<INPUT id=pbwaveX size=1 maxlength=3 type=text value="'+ Data.options.waves.targets[0].targetX +'" /> Y:<INPUT id=pbwaveY size=2 maxlength=3 value="'+ Data.options.waves.targets[0].targetY +'" type=text/> &nbsp <B>'+ kDistance1 +'</b> <SPAN id=pbwaveDist></span><BR>\
        <DIV class=pbStatBox style="margin:0px 10px !important"><CENTER><SPAN id=pbwaveTile></span></center></div></div>\
      <TABLE class=pbTab id=pbwaveTroops><TR align=center class=pbTabHdr1><TD colspan=8>'+ kWaveTroops +'</td></tr></table>\
      <BR><TABLE class=pbTabPad><TR><TD class=pbTableft>'+ kDeleteBattleReports +'</td><TD><INPUT id=pbwaveDBR type=checkbox '+ (Data.options.waves.deleteReports?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=pbTableft>'+ kStopOnLoss +'</td><TD><INPUT id=pbwaveSTL type=checkbox '+ (Data.options.waves.stopOnLoss?'CHECKED ':'') +'/></td></tr>\
      <TR><TD class=pbTableft>'+ kDelayBetweenAttacks +'</td><TD><INPUT id=pbwaveDelay type=text size=1 maxlength=4 value="'+ Data.options.waves.iterationMin +'" \> to <SPAN id=pbwaveDelMax>'+ Data.options.waves.iterationMax +'</span>'+ kSeconds +'</td></tr></table></div>\
      <DIV class=pbStatBox style="margin-top:10px !important">\
        <CENTER><INPUT class=greenButton id=pbwaveResStat type=submit value='+ kResetStats +' /></center>\
      <DIV id=pbwaveStats  style="height:200px; max-height:200px; overflow-y:auto"></div>\
      <HR class=thin><DIV id=pbwaveCurSpoil> &nbsp; </div></div>';
    t.cont.innerHTML = m;
    document.getElementById('pbwaveEnable').addEventListener ('click', function(){t.setWaveEnable(!Data.options.waves.enabled)}, false);
    document.getElementById('pbwaveX').addEventListener ('change', t.eventCoords, false);
    document.getElementById('pbwaveY').addEventListener ('change', t.eventCoords, false);
    document.getElementById('pbwaveResStat').addEventListener ('click', t.resetStats, false);
    document.getElementById('pbwaveDBR').addEventListener ('click', function(e){Data.options.waves.deleteReports=e.target.checked}, false);
    document.getElementById('pbwaveSTL').addEventListener ('click', function(e){Data.options.waves.stopOnLoss=e.target.checked}, false);
    document.getElementById('pbwaveDelay').addEventListener ('change', delayChanged, false);
//    troopTable (document.getElementById('pbwaveTroops'), 1, 'FW', t.eventTroops);
    troopTable (document.getElementById('pbwaveTroops'), 1, 'AW', t.eventTroops);
    window.addEventListener('unload', t.onUnload, false);
    t.setWaveEnable (false);
    t.marchTick();
    t.eventCoords();
    t.dispStats();
    Messages.addBattleReportListener(t.gotBattleReport);
 
    function troopTable (tab, rownum, prefix, listener){
      var row1 = tab.insertRow(rownum);
      row1.align='center';
      var row2 = tab.insertRow(rownum+1);
      row2.align='center';
      var val;
      for (var i=0; i<t.troopList.length; i++){
        row1.insertCell(i).innerHTML = t.troopList[i];
        var inp = document.createElement ('INPUT');
        inp.type = 'text';
        inp.size = '1';
        inp.maxlength='5';
        if (prefix=='AW')
          val = Data.options.waves.targets[0].troopsWave2[Names.troops.byAbbr[t.troopList[i]][1]];
        if (!val)
          val = 0;
        inp.value = val;
        inp.addEventListener ('change', listener, false);
        inp.name = prefix +'_'+ i;
        row2.insertCell(i).appendChild (inp);
      }
      return tab;
    }
    
    function delayChanged (e){
      var min = parseIntZero(e.target.value);
      var max = parseInt(min * 1.5);
      if (min<15 || min>3600){
        // error dialog, etc ...
        e.target.style.backgroundColor = 'red';
        return;
      }
      document.getElementById('pbwaveDelMax').innerHTML = max;
        e.target.style.backgroundColor = '';
      Data.options.waves.iterationMin = min;
      Data.options.waves.iterationMax = max;
    }
  },

  curRunStart : 0,
  gotBattleReport : function (rpt){
    var t = Tabs.Waves;
    if (rpt.report.location.x==Data.options.waves.targets[0].targetX && rpt.report.location.y==Data.options.waves.targets[0].targetY){
      ++Data.options.waves.numAttacks;
      for (var i=0; i<rpt.report.spoils.items.length; i++){
        if (!Data.options.waves.targets[0].stats.spoils[rpt.report.spoils.items[i]])
          Data.options.waves.targets[0].stats.spoils[rpt.report.spoils.items[i]] = 1;
        else
          ++Data.options.waves.targets[0].stats.spoils[rpt.report.spoils.items[i]];
        document.getElementById('pbwaveCurSpoil').innerHTML = new Date().toTimeString().substring (0,8) + kGot + Names.itemAbbr(rpt.report.spoils.items[i]);
      }
      t.dispStats();
      
      if (Data.options.waves.stopOnLoss){
        for (var p in rpt.report.attacker.units){
          if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1]){
            var ts = new Date(rpt.report_notification.created_at * 1000).myString();
            t.setWaveEnable (false);
            t.dispFeedback (kTroopsLost + ts +')');
            actionLog ('Wave Troops Lost! ('+ ts +')');
            return;
          }
        }
      }
      if (Data.options.waves.deleteReports)
        Messages.deleteMessage(rpt.report_notification.id);
    }
  },
  
  resetStats : function (){
    var t = Tabs.Waves;
    var now = serverTime();
    t.curRunStart = now;
    Data.options.waves.numAttacks = 0;
    Data.options.waves.runTime = 0;
    for (var i=0; i<5; i++)
      Data.options.waves.targets[i].stats = {numAttacks:0, spoils:{}};
    t.dispStats();
  },
  
  dispStats : function (){
    var t = Tabs.Waves;
    var runTime = Data.options.waves.runTime;
    if (Data.options.waves.enabled)
      runTime += (serverTime()-t.curRunStart);
    var msg = '<TABLE class=pbTabPad width=100%><TR><TD class=pbTabLeft>'+ kRunTime +'</td><TD width=90%>'+ timestr(runTime, true) +'</td></tr>\
        <TR><TD class=pbTabLeft>'+ kAttack2 +'</td><TD>'+ Data.options.waves.numAttacks +'</td></tr>\
        <TR><TD colspan=2><HR class=thin></td></tr>';
    for (var p in  Data.options.waves.targets[0].stats.spoils){
      var num = Data.options.waves.targets[0].stats.spoils[p];
      var perHour = num / (runTime/3600);
      var item = Names.itemAbbr(p);
      msg += '<TR><TD class=pbTabLeft>'+ item +':</td><TD>'+ num +' ('+ perHour.toFixed(2) +' per hour)</td></tr>';
    }
    document.getElementById('pbwaveStats').innerHTML = msg + '</table>';
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById('pbwaveFeedback').innerHTML = msg;
  },
  
  eventTroops : function (e){
    var t = Tabs.Waves;
    var args = e.target.name.split ('_');
    if (args[0] == 'AW'){
      var tr = Data.options.waves.targets[0].troopsWave2;
      var tt = Names.troops.byAbbr[t.troopList[args[1]]][1];
      tr[tt] = e.target.value;
    }
  },

  setWaveEnable : function (onOff){
    var t = Tabs.Waves;
    var but = document.getElementById('pbwaveEnable');
    clearTimeout (t.attackTimer);
    Data.options.waves.enabled = onOff;
    if (onOff){
      but.value = kAttackOn;
      but.className = 'butAttackOn';
      t.waveAttackTick();
      t.curRunStart = serverTime();
    } 
    else {
      but.value = kAttackOff;
      but.className = 'butAttackOff';
      if (t.curRunStart != 0)
        Data.options.waves.runTime += (serverTime()-t.curRunStart);
    }
  },
  
  onUnload : function (){
    var t = Tabs.Waves;
    if (Data.options.waves.enabled && t.curRunStart!=0)
      Data.options.waves.runTime += (serverTime()-t.curRunStart);
  },
  
  
  waveAttackTick : function (){
    var t = Tabs.Waves;
    clearTimeout (t.attackTimer);
    //logit ('waveAttackTick');
    if (Ajax.marchBusy>0){
        logit ('waveAttackTick: marchBusy *********************************************************************');
        t.attackTimer = setTimeout (t.waveAttackTick, 1000);
        return;
    }    
    if (!Data.options.waves.enabled)
        return;
      
    var target = Data.options.waves.targets[0];
    var now = serverTime();
    var cityIdx = 0;
    var targMsg =  target.targetX +','+ target.targetY +' Lvl '+ target.terrainLevel +' '+ target.terrainType;
    var gen = null;
    if (getMusterPointSlots (cityIdx) <= 0){
      t.dispFeedback (kMusterPointFull);
      t.attackTimer = setTimeout (t.waveAttackTick, 5000);
      return;
    }
    //logit (inspect (Seed.generals, 8, 1));    
    if ((gen = getAvailableGeneral ()) == null){
      t.dispFeedback (kNoGenerals);
      t.attackTimer = setTimeout (t.waveAttackTick, 5000);
      return;
    }
    //logit ('WAVE General: '+ inspect (gen, 6, 1));    
    var msg;
    if ((msg = t.checkTroops (cityIdx, target.troopsWave2)) != null){
      t.dispFeedback (msg);
      t.attackTimer = setTimeout (t.waveAttackTick, 5000);
      return;
    }
    
    // ok, send wave attack ...
    t.dispFeedback ('Wave sent to: '+ targMsg);
    new Ajax.march (Seed.s.cities[cityIdx].id, target.targetX, target.targetY, gen.id, target.troopsWave2, 'wave', function (rslt){
        var t = Tabs.Waves;
        if (rslt.ok && rslt.dat.result.success){
          t.attackErrors = 0;
          target.lastAttack = serverTime();
          actionLog ('Wave attack sent to '+ targMsg);
          var delay = Data.options.waves.iterationMin + parseInt((Math.random()*(Data.options.waves.iterationMax-Data.options.waves.iterationMin)));
          t.attackTimer = setTimeout (t.waveAttackTick, delay*1000);
        } 
        else {
          t.dispFeedback (kError + rslt.errmsg);
          actionLog ('Attack Error: '+ rslt.errmsg);
          if (t.attackErrors++ > 3){
            t.setWaveEnable (false);
            if (notify)
              notify (false);
          } 
          else {
            t.attackTimer = setTimeout (t.waveAttackTick, 10000);
          }
        }
    });
  },

  // returns null if ok, else error message
  checkTroops : function (cityIdx, troops){
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.s.cities[cityIdx].units[p] < troops[p]){
          return (kNotEnough + p);
        }
      }
    }
    if (totTroops <= 0){
      return (kNoTroopsDefined);
    }
    return null;
  },
  
   marchTick : function (){
    var t = Tabs.Waves;
    clearTimeout (t.marchTimer);
    document.getElementById('pbwaveMarches').innerHTML = marchTable('wave');
    t.marchTimer = setTimeout (t.marchTick, 2000);
  },

  // Calls scanMapCirc
  eventCoords : function (e){
    var ex = document.getElementById('pbwaveX');
    var ey = document.getElementById('pbwaveY');
    var x = parseIntZero (ex.value);
    var y = parseIntZero (ey.value);
    ex.value = x;
    ey.value = y;
    Data.options.waves.targets[0].targetX = x;
    Data.options.waves.targets[0].targetY = y;
    document.getElementById('pbwaveDist').innerHTML = distance(Seed.s.cities[0].x, Seed.s.cities[0].y, x, y);
    document.getElementById('pbwaveTile').innerHTML = '&nbsp;';
    if (x<0 || x>749){
      ex.style.backgroundColor = 'red';
      return;
    }
    if (y<0 || y>749){
      ey.style.backgroundColor = 'red';
      return;
    }
    ey.style.backgroundColor = '';
    ex.style.backgroundColor = '';
    Map.scanMapCirc (x, y, 1, callback, true);
    function callback (rslt){
      var tile = null;
      for (var i=0; i<rslt.tiles.length; i++){
        if (rslt.tiles[i].x==x && rslt.tiles[i].y==y){
          tile = rslt.tiles[i];
          break;
        }
      }
      if (!tile)
        return;
      Data.options.waves.targets[0].terrainType = Map.names[tile.type];
      Data.options.waves.targets[0].terrainLevel = tile.lvl;
      document.getElementById('pbwaveTile').innerHTML = '<B>'+ Map.names[tile.type] +' level '+ tile.lvl +'</b>';
    }
  },
 
 
  show : function () {
    var t = Tabs.Waves;
    t.marchTick();
  },
  hide : function (){
    var t = Tabs.Waves;
    clearTimeout (t.marchTimer);
  },
}



var Data = {
  isChrome : navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
  cookieName : 'DoaPowerTools',
  serverID : getServerId(),
  names : [],
  
  init : function (list){
    var t = Data;
    for (var p in list){
      t[p] = t.readMergeOptions (p, list[p]);
      t.names.push(p);
    }
  },

  onUnload : function (){
    var t = Data;
    logit ('===========  Data.onUnload');
    for (var i=0; i<t.names.length; i++)
      if (t.isChrome){
        localStorage.setItem(t.names[i], JSON2.stringify(t[t.names[i]]));
      }else{
        GM_setValue (t.names[i] +'_'+ t.serverID, JSON2.stringify(t[t.names[i]]));
      }
  },
  
  // TODO: recurse, don't modify defaults
  readMergeOptions : function (label, defaults){
    var t = Data;
    var s;
    if (t.isChrome)
        s = localStorage.getItem(label);
    else
      s = GM_getValue (label +'_'+ t.serverID);
    if (s == null)
      return defaults;
    if (s != null){
      opts = JSON2.parse (s);
      //logit ('readmerge: '+ inspect (opts, 5, 1));    
      if (matTypeof(defaults)=='array')
        defaults = defaults.concat(opts);
      else if (matTypeof(opts)=='object'){
        for (k in opts)
          defaults[k] = opts[k];
      }
    }
    return defaults;
  },
  
  getCookie : function (name){
    var i = document.cookie.indexOf(name+'=');
    if (i < 0)
      return null;
    var ii = document.cookie.indexOf(';', i);
    if (ii<0)
      ii = document.cookie.length;
    return unescape(document.cookie.substring(i+name.length+1, ii));
  },
}



//******************************** Attack Tab *****************************
// Pending changes: references to camp and camps changed to mapObject to make sure that other data does not overwrite the camps
Tabs.AutoAttack = {
  tabOrder : 3,
  tabLabel : kAttack,
  tabDisabled : false,
  cont : null,
  attackTimer: null,
  marchTimer: null,
  lastAttack : 0,
  attackErrors : 0,
  checkMapBusy : false,
  MAX_DISTANCE : 35,
  curRunStart : 0,
  contentType : 0, // 0 = levels, 1 = config, 2 = targets, 3 = stats, these should be enums but Javascript doesn't support that type
  
  init : function (div){
    var t = Tabs.AutoAttack;
    t.cont = div;
    
    if (!Data.options.objAttack.troops){
      Data.options.objAttack.troops = [];
      for (var x=1; x<=10; x++)
        Data.options.objAttack.troops[x] = {};
    }
    
    div.innerHTML = '<DIV class=pbTitle>' + Data.options.mapChoice + ' </div>\
      <DIV class=pbStatBox id=pbatStatus style="margin-bottom:5px !important">\
      <CENTER><INPUT type=submit value="OnOff" id=pbatEnable></input></center>\
      <DIV id=pbatMarches style="height:165px; max-height:165px; overflow:auto;"></div>\
      <DIV id=pbatFeedback style="height: 17px; border:1px solid black; background-color:#ffeeee; padding: 2px 0px; text-align:center; font-weight:bold"></div></div>\
      <TABLE width=100% bgcolor=#ffffd0 align=center><TR><TD>\
      <INPUT class=button type=submit value='+ kLevels +' id=pbatConfigL></input>\
      <INPUT class=button type=submit value='+ kConfig +' id=pbatConfigG></input>\
      <INPUT class=button type=submit value='+ kTargets +' id=pbatTargets></input>\
      <INPUT class=button type=submit value='+ kStats +' id=pbatStats></input></td></tr></table>\
      <DIV id=pbatContent style="padding-top:5px; height:480px; max-height:480px; overflow:auto; background-color:white"></div>';
     
    // Add the event listeners
    document.getElementById('pbatEnable').addEventListener ('click', function (){
      t.setAttackEnable (!Data.options.objAttack.enabled);
      }, false);
    document.getElementById('pbatConfigL').addEventListener ('click', t.tabConfigLevels, false);
    document.getElementById('pbatConfigG').addEventListener ('click', t.tabConfigGeneral, false);
    document.getElementById('pbatTargets').addEventListener ('click', t.tabTargets, false);
    document.getElementById('pbatStats').addEventListener ('click', t.tabStats, false);
    
    if (Data.options.objStats == null)
      t.clearStats();
      
    if (Data.options.objAttack.maxMarches == undefined)
      Data.options.objAttack.maxMarches = 10;
      
    Messages.addBattleReportListener(t.gotBattleReport);
    setTimeout (t.checkMarches, 60000); 
    t.tabConfigLevels();
    window.addEventListener ('unload', t.onUnload, false);
    t.setAttackEnable (Data.options.objAttack.enabled);
    
    for (var p in Data.options.objMarches){
      if (Seed.marches[Data.options.objMarches[p].id])
        Seed.marches[Data.options.objMarches[p].id].ownerId = 'camp';
    }    
  },

  firstShow : true,
  show : function () {
    var t = Tabs.AutoAttack;
    t.marchTick();
    if (t.firstShow){
      t.marchTick();
      t.contentType = Data.options.attackTab;
      setTimeout (function (){
        t.checkMapData ();
        t.firstShow = false;
      }, 0);
    }
    if (t.contentType == 2)
        document.getElementById('pbatContent').scrollTop = gAttScrollPos;

    switch (t.contentType) {
        case 0: t.tabConfigLevels(); break;
        case 1: t.tabConfigGeneral(); break;
        case 2: t.tabTargets(); break;
        case 3: t.tabStats(); break;
    }
  },
  hide : function (){
    var t = Tabs.AutoAttack;
    clearTimeout (t.marchTimer);
  },

  onUnload : function (){
    var t = Tabs.AutoAttack;
    logit ('===============  Tabs.AutoAttack.onUnload');
    if (Data.options.objAttack.enabled)
      Data.options.objStats.runTime += (serverTime()-t.curRunStart);
    Data.options.attackTab = t.contentType;
  },
  
  addMarch : function (job){
    var t = Tabs.AutoAttack;
    var march = Seed.marches[job.march_id];
    if (march == null){
      logit ('***** March missing from seed: '+ job.march_id); 
      if (DEBUG_MARCHES) WinLog.write ('***** ERRROR march missing from seed: '+ job.march_id);   
    } 
    else {
      Data.options.objMarches[job.march_id] = cloneProps(march);
      if (DEBUG_MARCHES) WinLog.write ('Tabs.AutoAttack.addMarch: ID='+ march.id +'  ('+ march.x +','+ march.y +') General:'+ march.general.id);    
    }
  },
  
  removeMarch : function (mid){   
    var t = Tabs.AutoAttack;
    delete (Data.options.objMarches[mid]);
  },
  
  marchCheckTimer : null,
  checkMarches : function (){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    clearTimeout (t.marchCheckTimer);
    for (var p in Data.options.objMarches){
      if (parseInt(Data.options.objMarches[p].run_at) < (now-40)){
        if (Data.options.objMarches[p].retry){
          ++Data.options.messages.missing;
          logit ('March report never received! (now='+ now +')\n'+ inspect (Data.options.objMarches[p], 6, 1));    
          if (DEBUG_MARCHES) WinLog.write ('March report never received! (now='+ now +')\n'+ inspect (Data.options.objMarches[p], 6, 1));    
          t.removeMarch (p);
        } 
        else {
          Data.options.objMarches[p].retry = true;
          Messages.checkMessages();
        }
      }
    }
    t.marchCheckTimer = setTimeout (t.checkMarches, 30000);
  },
  
  trackStats : function (marchId, rpt){   // called when battle report received
    var t = Tabs.AutoAttack;
    if (DEBUG_MARCHES) WinLog.write ('Tabs.AutoAttack.trackStats: '+ marchId); 
    var objLevel = rpt.report.location.level;
    
    if (objLevel<1 || objLevel>11)
      objLevel = 0;
      
    ++Data.options.objStats.numAttacks;
    ++Data.options.objStats.byLevel[objLevel].numAttacks;
    var res =  rpt.report.spoils.resources;
    
    for (var p in res){
      objAddTo (Data.options.objStats.resources, p, parseInt(res[p]));
      objAddTo (Data.options.objStats.byLevel[objLevel].resources, p, parseInt(res[p]));
    }  
    
    var items =  rpt.report.spoils.items;
    for (var i=0; i<items.length; i++){
      objAddTo (Data.options.objStats.items, items[i], 1);
      objAddTo (Data.options.objStats.byLevel[objLevel].items, items[i], 1);
    }  
    
    t.removeMarch (marchId);
    t.showStats();    
  },

  showStats : function (){
    var div = document.getElementById('pbcampSO');
    var t = Tabs.AutoAttack;
    
    if (div==null)
      return;
    var runTime = Data.options.objStats.runTime;
    if (Data.options.objAttack.enabled)
      runTime += (serverTime()-t.curRunStart);
      
    var trueRunTime = (runTime > 0) ? (runTime/3600) : 1;
      
    var m = '<TABLE class=pbTabPad> <TR><TD class=pbTabLeft>'+ kStatsStarted +'</td><TD>'+  new Date(Data.options.objStats.tsStart * 1000).myString() +'</td></tr>\
    <TR><TD class=pbTabLeft>'+ kRunTime +'</td><TD>'+ timestr(runTime, true) +'</td></tr>\
    <TR><TD class=pbTabLeft>'+ kAttack2 +'</td><TD>'+ Data.options.objStats.numAttacks +'</td></tr>\
    <TR valign=top><TD class=pbTabLeft>'+ kResources +'</td><TD><TABLE class=pbTabPad>';
    for (var p in Data.options.objStats.resources){
      var perHour = Data.options.objStats.resources[p] / trueRunTime;
      m += '<TR align=right><TD>'+ p +':</td><TD>'+ addCommasInt(Data.options.objStats.resources[p]) +'</td><TD>('+ addCommasInt(perHour) +' /hr)</td></tr>';
    }
    m += '</table></td></tr></table>';
    
    m += '<BR><DIV class=pbSubtitle>'+ kStatsBy + Data.options.mapChoice + kLevel1 +'</div><DIV style="overflow:auto"><TABLE class=pbTabPad><TR class=pbTabHdr1 align=center><TD style="background:none !important;"></td><TD align=right colspan=10>'+ titleLine(kLevels) +'</td></tr><TR align=right class=pbTabHdr1><TD style="background:none !important;"></td>';
    for (i=1; i<11; i++)
      m += '<TD width=45>'+ i +'</td>';
    m += '</tr><TR><TD colspan=11><HR class=thin></td></tr><TR align=right><TD class=pbTabLeft># Attacks:</td>';
    for (i=1; i<11; i++)
      m += '<TD>'+ Data.options.objStats.byLevel[i].numAttacks +'</td>';
    m += '</tr><TR><TD colspan=11><HR class=thin></td></tr>'; 
      
    var items =  flipStats ('items');     
    for (var p in items){
      m += '<TR align=right><TD class=pbTabLeft>'+ Names.itemAbbr(p) +':</td>';
      for (i=1; i<11; i++)
        m += '<TD>'+ items[p][i] +'</td>';
    }
    m += '</tr></table></div>';
    div.innerHTML = m;
    
    function flipStats (name){
      var o = {};
      for (var i=1; i<11; i++){
        for (var p in Data.options.objStats.byLevel[i][name]){
          if (!o[p]){
            o[p] = [];
            for (var x=1; x<11; x++)
              o[p][x] = 0;
          }
          o[p][i] += Data.options.objStats.byLevel[i][name][p];
        }
      }
      return o;
    }
  },



//*** Attack Tab - Stats Sub-tab ***
  tabStats : function (){
    var t = Tabs.AutoAttack;

    document.getElementById('pbatConfigL').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatConfigL').style.color = "white"; 
    document.getElementById('pbatConfigG').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatConfigG').style.color = "white"; 
    document.getElementById('pbatTargets').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatTargets').style.color = "white"; 

    t.contentType = 3;
    document.getElementById('pbatStats').style.backgroundColor = "#eed"; 
    document.getElementById('pbatStats').style.color = "black"; 
   
    var m = '<DIV class=pbTitle>'+kAttackStatsTitle+'</div>\
      <CENTER><INPUT class=greenButton id=pmcampRS type=submit value='+ kClearStats +' \></center>\
      <DIV class=pbStatBox id=pbcampSO></div>';
    document.getElementById('pbatContent').innerHTML = m;
    document.getElementById('pmcampRS').addEventListener('click', function(){t.clearStats(); t.showStats();}, false);
    t.showStats();  
  },

  // byLevel.resources
  clearStats : function (){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    Data.options.objStats = {tsStart:now, runTime:0, numAttacks:0, items:{}, resources:{}, byLevel:[]};
    t.curRunStart = now;
    for (var i=0; i<12; i++)
      Data.options.objStats.byLevel[i] = {numAttacks:0, items:{}, resources:{}};
    t.showStats(); 
  },
  
  // If we are already checking the map, return false
  // otherwise, if the radius to check is not 35 miles, or if the targets do not mach the seed values
  // all scanMap with a radius of 35 miles, stop checking the map, and return false
  // if none of the above, return true
  checkMapData : function (){
    var t = Tabs.AutoAttack;
    if (t.checkMapBusy)
      return false;
    if (Data.targets.radius!=35 || Data.targets.center.x!=Seed.s.cities[0].x || Data.targets.center.y!=Seed.s.cities[0].y){
      t.checkMapBusy = true;
      t.setAttackEnable (false);
      t.scanMap(35, function(){logit('****** Setting checkMapBusy to FALSE'); Tabs.AutoAttack.checkMapBusy = false});
      return false;
    }    
    return true;
 },
  
  gotBattleReport : function (rpt){
    var t = Tabs.AutoAttack;
    //logit ('Tabs.AutoAttack.gotBattleReport'); 
    
    // This is no longer useful because I allow all terrain types, including cities   
//    if (rpt.report.location.terrain != 'AnthropusCamp')
//<u></u>      return;

    // tie report to march id ...
    var mid=null;
    for (var p in Data.options.objMarches ){
      var march = Data.options.objMarches[p];
      if (march.x==rpt.report.location.x && march.y==rpt.report.location.y
      && march.general.id == rpt.report.attacker.general.id
      ){  // TODO: time and troops check here
        mid = p;
        break;
      }
    }
    if (mid)
      t.trackStats (mid, rpt);
      
    if (!Data.options.objAttack.deleteObjAttacks && !Data.options.objAttack.stopAttackOnLoss )
      return;
    //logit (inspect (rpt, 8, 1));
    if (Data.options.objAttack.stopAttackOnLoss){
      for (var p in rpt.report.attacker.units){
        if (rpt.report.attacker.units[p][0] != rpt.report.attacker.units[p][1]){
          var ts = new Date(rpt.report_notification.created_at * 1000).myString();
          t.abort (kTroopsLost + ts +')');
          return;
        }
      }
    }
    if (Data.options.objAttack.deleteObjAttacks)
      Messages.deleteMessage (rpt.report_notification.id);
  },
  
  
  setAttackEnable : function (onOff){
    var t = Tabs.AutoAttack;
    clearTimeout (t.attackTimer);
    var but = document.getElementById('pbatEnable');
    Data.options.objAttack.enabled = onOff;
    if (onOff){
      but.value = kAutoOn;
      but.className = 'butAttackOn';
      t.curRunStart = serverTime();
      t.autoCheckTargets();
    } 
    else {
      if (t.curRunStart != 0)
        Data.options.objStats.runTime += (serverTime()-t.curRunStart);
      but.value = kAutoOff;
      but.className = 'butAttackOff';
      t.dispFeedback ('');
    }
  },

  abort : function (msg){
    var t = Tabs.AutoAttack;
    t.setAttackEnable (false);
    t.dispFeedback (msg);
    actionLog (msg);
  },
  


  
  marchTick : function (){
    var t = Tabs.AutoAttack;
    clearTimeout (t.marchTimer);
    document.getElementById('pbatMarches').innerHTML = marchTable('camp');
    t.marchTimer = setTimeout (t.marchTick, 2000);
  },
  
  dispFeedback : function (msg){
    if (msg && msg!='')
      msg = new Date().toTimeString().substring (0,8) +' '+ msg;
    document.getElementById('pbatFeedback').innerHTML = msg;
  },

  // Data.options.objAttack {enabled:false, maxDist:7, repeatTime:3660, delayMin:15, delayMax:25, levelEnable:[]}
  autoCheckTargets : function (){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    var cityIdx = 0;
    clearTimeout (t.attackTimer);
    
    // back off for 1 second and retry if Ajax.march busy (general,troops,etc may about to be used)
    if (!Data.options.objAttack.enabled)
        return;
        
    if (Ajax.marchBusy > 0){
        logit ('autoCheckTargets: marchBusy *********************************************************************');
        t.attackTimer = setTimeout (t.autoCheckTargets, 1000);
        return;
    }
    
    if (!t.checkMapData())
      return;
      
    //logit ('autoCheckTargets');
    if (now-t.lastAttack < t.delayMin){
        logit ('************** autoCheckTargets Shouldn\'t happen *************');    
        t.attackTimer = setTimeout (t.autoCheckTargets, (Data.options.objAttack.delayMin-now+t.lastAttack)*1000);
        return;
    }

    var marchCount = 0;
    for (var p in Seed.marches)
      if (Seed.marches[p].ownerId == 'camp')
        ++marchCount;
        
    if (marchCount >= Data.options.objAttack.maxMarches){
      t.dispFeedback ('User-set maximum marches reached.');
      t.attackTimer = setTimeout (t.autoCheckTargets, 5000);
      return;
    }
    
    if (getMusterPointSlots (cityIdx) <= 0){
      t.dispFeedback ('Muster Point Full');
      t.attackTimer = setTimeout (t.autoCheckTargets, 5000);
      return;
    }
    
    if ((gen = getAvailableGeneral ()) == null){
      t.dispFeedback ('No Generals Available');
      t.attackTimer = setTimeout (t.autoCheckTargets, 5000);
      return;
    }
    
    // check all potential targets ...
    var mapObjects = t.getActiveObjectList();
    var target = null;
    var rptTime = now - Data.options.objAttack.repeatTime;
    for (var i=0; i<mapObjects.length; i++){
      var mapObject = mapObjects[i];
      
      if (!mapObject.attackable)
        continue;
        
      // check repeat time
      if (mapObject.last!=null && mapObject.last>rptTime)
        continue;
        
      // check troops
      if (t.checkTroops (cityIdx, mapObject.lvl) == null){
        // ok, send march ...
        t.sendAttack (cityIdx, mapObject, gen, function (rslt){
          var t = Tabs.AutoAttack;
          if (rslt){
            var delay = Data.options.objAttack.delayMin + parseInt((Math.random()*(Data.options.objAttack.delayMax-Data.options.objAttack.delayMin)));
            t.attackTimer = setTimeout (t.autoCheckTargets, delay*1000);
          }
        });
        return;
      } 
    }
    t.dispFeedback (kNoTargetTroops);
    t.attackTimer = setTimeout (t.autoCheckTargets, 10000);
  },
  
  // notifies with true for success, false if error
  sendAttack : function (cityIdx, mapObject, gen, notify){
    var t = Tabs.AutoAttack;
    var now = serverTime();
    if (t.attackBusy){
      t.dispFeedback (kErrSendAttack);
      return;
    }
    t.attackBusy = true;
    t.dispFeedback (kAttackingLevel + mapObject.lvl + kCampAt + mapObject.x +','+ mapObject.y);
    t.lastAttack = now;
    new Ajax.march (Seed.s.cities[cityIdx].id, mapObject.x, mapObject.y, gen.id, Data.options.objAttack.troops[mapObject.lvl], 'camp', function (rslt){
        t.attackBusy = false;
        if (rslt.ok && rslt.dat.result.success){
            t.addMarch (rslt.dat.result.job);        
            t.attackErrors = 0;
            mapObject.last = now;
            if (Data.options.objAttack.logAttacks)
                actionLog (kAttackSent + mapObject.lvl + kCampAt + mapObject.x +','+ mapObject.y);
            if (notify)
                notify (true);
        } 
        else {
            t.dispFeedback (kAttackErr + rslt.errmsg);
            actionLog (kAttackErr + rslt.errmsg);
            if (t.attackErrors++ > 3){
                t.setAttackEnable (false);
                if (notify)
                    notify (false);
            } 
            else {
                notify (true);
            }
        }
    });
 },
  
  // returns null if ok, else error message
  checkTroops : function (cityIdx, objLevel){
    var troops = Data.options.objAttack.troops[objLevel];
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.s.cities[cityIdx].units[p] < troops[p]){
          return (kNotEnough+ p);
        }
      }
    }
    
    if (totTroops <= 0){
      return (kNoTroopsDefined);
    }
    return null;
  },
  
  // return array of mapObjects that satisfy config (max distance, level enables)
  getActiveObjectList : function (){
    var t = Tabs.AutoAttack;
    var ret = [];
    for (var i=0; i<Data.targets.mapObjects.length; i++){
      var mapObject = Data.targets.mapObjects[i];
      if ((mapObject.dist<=Data.options.objAttack.levelDist[mapObject.lvl]) && Data.options.objAttack.levelEnable[mapObject.lvl])
        ret.push (mapObject);
    }
    return ret;
  },
  
  checkAttack : function (mapObject, notify){
    var t = Tabs.AutoAttack;
    var cityId = Seed.s.cities[0].id;
    var cityIdx = 0;
    var gen;
    // check troops
    var troops = Data.options.objAttack.troops[mapObject.lvl];
    var totTroops = 0;
    for (var p in troops){
      if (troops[p] > 0){
        totTroops += troops[p];
        if (Seed.s.cities[cityIdx].units[p] < troops[p]){
          notify (kNotEnough + p);
          return;
        }
      }
    }
    
    if (totTroops <= 0){
        notify (kNoTroopsDefined);
        return;
    }
    
    // TODO: 'too many troops for muster point level'
    if (getMusterPointSlots (cityIdx) <= 0){
      notify (kMusterPointFull);
      return;
    }
    
    if ((gen = getAvailableGeneral ()) == null){
      notify (kNoGenerals);
      return;
    }
    
    new Ajax.march (cityId, mapObject.x, mapObject.y, gen.id, troops, 'camp', function (rslt){
        //logit ('march result:\n' + inspect (rslt, 4, 1));    
        if (rslt.ok && rslt.dat.result.success){
            t.addMarch (rslt.dat.result.job);        
            mapObject.last = serverTime();
            actionLog (kAttackSent + mapObject.lvl + kCampAt + mapObject.x +','+ mapObject.y);
            notify (null);
        } 
        else {
        notify (kAttackErr + rslt.errmsg );
        }
    });
  },

  
  
//*** Attack Tab - Levels Sub-Tab ***
// Data.options.objAttack {enabled:false, maxDist:7, repeatTime:3660, delayMin:15, delayMax:25, levelEnable:[], levelDist:[]}
  troopTypes : ['Porter', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'GreatDragon', 'AquaTroop', 'StoneTroop'],
  tabConfigLevels : function (){
    var t = Tabs.AutoAttack;
     
    document.getElementById('pbatConfigG').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatConfigG').style.color = "white";
    document.getElementById('pbatTargets').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatTargets').style.color = "white"; 
    document.getElementById('pbatStats').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatStats').style.color = "white"; 

    t.contentType = 0;
    document.getElementById('pbatConfigL').style.backgroundColor = "#eed"; 
    document.getElementById('pbatConfigL').style.color = "black";
    
    // New content area here
    var m = '<DIV class=pbTitle>'+ kAutoAttack + Data.options.mapChoice + kLevels +'</div>\
        <DIV style="overflow:auto">\
        <TABLE class=pbTabPad><TR class=pbTabHdr1><TD style="background:none !important;"></td><TD align=center colspan=10>'+ titleLine(kLevels) +'</td></tr>\
        <TR align=center class=pbTabHdr1><TD style="background:none !important;"></td><TD>1</td><TD>2</td><TD>3</td><TD>4</td><TD>5</td><TD>6</td><TD>7</td><TD>8</td><TD>9</td><TD>10</td></tr>\
        </div><TR align=center><TD class=pbTabLeft>'+ kEnable +'</td>';
    for (var x=1; x<=10; x++)
      m += '<TD><INPUT type=checkbox id=pbatEn_'+ x +(Data.options.objAttack.levelEnable[x]?' CHECKED':'')   +' \></td>';
    m += '</tr><TR align=center><TD class=pbTabLeft>'+ kMaxDist +'</td>';
    for (var x=1; x<=10; x++)
      m += '<TD><INPUT type=text id=pbatDist_'+ x +' maxlength=2 style="width:30px" value="'+ Data.options.objAttack.levelDist[x] +'"\></td>';
    m += '</tr><TR><TD><DIV class=short></td></tr>';
    
    for (i=0; i<t.troopTypes.length; i++){
      m += '<TR><TD class=pbTabLeft>'+ Names.troops.byName[t.troopTypes[i]][2] +':</td>';
      for (var x=1; x<=10; x++){
        var num = Data.options.objAttack.troops[x][t.troopTypes[i]];
        if (!num)
          num = 0;
        m += '<TD><INPUT type=text id=pbatTrp_'+ x +'_'+ i +' maxlength=5 size=2 value="'+ num +'"\></td>';
      }
      m += '</tr>';
    }    
    m += '</table><DIV class=short></div></div>';
    document.getElementById('pbatContent').innerHTML = m;
 
    // add event listeners ...
    for (var x=1; x<=10; x++)
      document.getElementById('pbatEn_'+ x).addEventListener('change', enableChanged, false);
    for (var x=1; x<=10; x++)
      document.getElementById('pbatDist_'+ x).addEventListener('change', distChanged, false);
    for (i=0; i<t.troopTypes.length; i++)
      for (var x=1; x<=10; x++)
        document.getElementById('pbatTrp_'+ x +'_'+ i).addEventListener('change', troopsChanged, false);
    
    function enableChanged (e){
      var args = e.target.id.split('_');
      Data.options.objAttack.levelEnable[args[1]] = e.target.checked;
    }
    
    function distChanged (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      if (isNaN(x) || x<1 || x>t.MAX_DISTANCE){
        e.target.style.backgroundColor = 'red';
        dispError (kDistanceWarning + t.MAX_DISTANCE);
      } 
      else {
        e.target.value = x;
        e.target.style.backgroundColor = '';
        Data.options.objAttack.levelDist[args[1]] = x;
      }
    }
    
    function troopsChanged (e){
      var args = e.target.id.split('_');
      var x = parseIntZero(e.target.value);
      if (isNaN(x) || x<0 || x>100000){
        e.target.style.backgroundColor = 'red';
        dispError (kTroopWarning);
      }else {
        e.target.value = x;
        Data.options.objAttack.troops[args[1]][t.troopTypes[args[2]]] = x;
        e.target.style.backgroundColor = '';
      }
    }
    
    function dispError (msg){
      var dial = new ModalDialog (t.cont, 300, 150, '', true);
      dial.getContentDiv().innerHTML = msg;
    }
  },

//*** Attacks Tab - Config Sub-Tab ***
  tabConfigGeneral : function (){
    var t = Tabs.AutoAttack;
    

    document.getElementById('pbatConfigL').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatConfigL').style.color = "white";
    document.getElementById('pbatTargets').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatTargets').style.color = "white";
    document.getElementById('pbatStats').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatStats').style.color = "white";

    t.contentType = 1;
    document.getElementById('pbatConfigG').style.backgroundColor = "#eed"; 
    document.getElementById('pbatConfigG').style.color = "black"; 
    

    var m = '<DIV class=pbTitle>'+ kAutoAttackConfig + '</div>\
      <DIV style="overflow:auto"><TABLE class=pbTabPad>\
      <TR><TD class=pbTabLeft>'+ kRandomDelay +'</td><TD>\
      <INPUT class=short id=pbaacfgRD1 maxlength=4 type=text value="'+ Data.options.objAttack.delayMin +'"/>'+ kTo +'\
      <INPUT class=short id=pbaacfgRD2 maxlength=4 type=text value="'+ Data.options.objAttack.delayMax +'"/>'+ kSeconds +'</td></tr>\
      <TR><TD class=pbTabLeft>'+ kSameTargetDelay +'</td><TD>'+ kTwentyMinutes +'</td></tr>\
      <TR><TD class=pbTabLeft>'+ kLogAttacks +'</td><TD><INPUT id=pbaacfgLA '+ (Data.options.objAttack.logAttacks?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=pbTabLeft>'+ kDeleteMarchReports +'</td><TD><INPUT id=pbaacfgDMR '+ (Data.options.objAttack.deleteObjAttacks?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=pbTabLeft>'+ kStopOnLoss +'</td><TD><INPUT id=pbaacfgSTL '+ (Data.options.objAttack.stopAttackOnLoss?'CHECKED ':'') +' type=checkbox \></td></tr>\
      <TR><TD class=pbTabLeft>'+ kMaxMarches +'</td><TD><INPUT class=short id=pbaacfgMM maxlength=2 type=text value="'+ Data.options.objAttack.maxMarches +'"\></td></tr>\
      <TR><TD class=pbTabLeft colspan="2"><INPUT class=greenButton id=pbaaRescan type="submit" value='+ kRescanMap +' \></td></tr>\
      </table>';
    document.getElementById('pbatContent').innerHTML = m;
    
    // Add event listeners
    document.getElementById('pbaacfgDMR').addEventListener('change', function (e){Data.options.objAttack.deleteObjAttacks = e.target.checked;}, false);
    document.getElementById('pbaacfgSTL').addEventListener('change', function (e){Data.options.objAttack.stopAttackOnLoss = e.target.checked;}, false);
    document.getElementById('pbaacfgLA').addEventListener('change', function (e){Data.options.objAttack.logAttacks = e.target.checked;}, false);
    document.getElementById('pbaacfgRD1').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgRD2').addEventListener('change', delayChanged, false);
    document.getElementById('pbaacfgMM').addEventListener('change', maxMarchesChanged, false);
    document.getElementById('pbaaRescan').addEventListener('click', rescanMap, false);
    
    function delayChanged (e){
      var min = parseIntNan(document.getElementById('pbaacfgRD1').value);
      var max = parseIntNan(document.getElementById('pbaacfgRD2').value);
      if (min<MIN_DELAY || min>3600 || (max-min)<5){
        var dial = new ModalDialog (t.cont, 300, 150, '', true);
        dial.getContentDiv().innerHTML = '<B>'+ kInvalidDelay +'</b><BR><BR>'+ kFirstValue + MIN_DELAY + kSecondValue;
        return;
      }
      Data.options.objAttack.delayMin = min;
      Data.options.objAttack.delayMax = max;
    }
    
    function maxMarchesChanged (e){
      var val = parseIntNan(document.getElementById('pbaacfgMM').value);
      if (val<0 || val>12){
        e.target.style.backgroundColor = 'red';
        return;
      }
      e.target.style.backgroundColor = '';
      Data.options.objAttack.maxMarches = val;
    }
    
    function rescanMap (e){
      // By setting the radius to any value other than 35 we force a map rescan
      Data.targets.radius = 30;
      t.checkMapData();
    }
  },
    

//*** Attacks Tab - Targets Sub-Tab ***
  tabTargets : function (){
    var t = Tabs.AutoAttack;

    document.getElementById('pbatConfigL').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatConfigL').style.color = "white"; 
    document.getElementById('pbatConfigG').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatConfigG').style.color = "white"; 
    document.getElementById('pbatStats').style.backgroundColor = "#0044a0"; 
    document.getElementById('pbatStats').style.color = "white"; ;

    t.contentType = 2;
    document.getElementById('pbatTargets').style.backgroundColor = "#eed"; 
    document.getElementById('pbatTargets').style.color = "black";
    

    var timer = null;
    var m = '<DIV class=pbTitle>'+ kAutoAttack + Data.options.mapChoice + kLevels +'</div><TABLE id=pbatTargTab class=pbTab><TR class=pbTabHdr2><TD>'+ kDistance +'</td><TD>'+ kCoords +'</td><TD>'+ kLevel +'</td><TD width=65>'+ kLastAttack +'</td></tr>';
//logit (inspect (Data.targets.mapObjects, 5, 1));
    
    var mapObjects = t.getActiveObjectList(); 
    var mapType = Tabs.Maps.selectedMapName.substr(0,1).toUpperCase(); 
    for (var i=0; i<mapObjects.length; i++){
        // For cities and outposts add the skip attack button to allow the choice of not hitting friendly or powerful alliance targets
        if (mapType == 'C' || mapType =='O'){
            m += '<TR><TD>'+ mapObjects[i].dist +'</td><TD align=center>'+ mapObjects[i].x +','+ mapObjects[i].y +'</td><TD align=center>'+ mapObjects[i].lvl +'</td>\
        <TD><span id=pbatList_'+ i +'> --- </span></td><TD><INPUT class=small id=pbattargAN_'+ i +' type=submit value=' + kAttackNow + '\></td><TD><INPUT class=small id=pbskipAN_'+ i +' type=submit value=' + kSkipAttack + '\></td></tr>';
        }
         else{
            m += '<TR><TD>'+ mapObjects[i].dist +'</td><TD align=center>'+ mapObjects[i].x +','+ mapObjects[i].y +'</td><TD align=center>'+ mapObjects[i].lvl +'</td>\
        <TD><span id=pbatList_'+ i +'> --- </span></td><TD><INPUT class=small id=pbattargAN_'+ i +' type=submit value=' + kAttackNow + '\></td></tr>';
        }
    }
    document.getElementById('pbatContent').innerHTML = m + '</table>';
    document.getElementById('pbatContent').scrollTop = gAttScrollPos;
    
    // Add the event listeners
    document.getElementById('pbatContent').addEventListener('scroll', onScroll, false);
    
    for (var i=0; i<mapObjects.length; i++) {
        var butAttack = document.getElementById('pbattargAN_'+ i);
        butAttack.addEventListener ('click', butAttackNow, false);
        if (mapType == 'C' || mapType == 'O') 
            document.getElementById('pbskipAN_'+ i).addEventListener ('click', butSkipAttack, false);
        setButtonStyle (butAttack, mapObjects[i].attackable);         
    }
    
    tick();
    
    function setButtonStyle (theButton, enabled) {
        if (enabled) {
            theButton.disabled = false;
            theButton.style.backgroundColor = '#009C1F';
            theButton.style.color = 'white';            
        }
        else {
            theButton.disabled = true;
            theButton.style.backgroundColor = '#e80000';
            theButton.style.color = 'white';            
        }
    }
    
    function onScroll (e){
      if (t.contentType == 2)
        gAttScrollPos = document.getElementById('pbatContent').scrollTop;
    }

    function butAttackNow (e){
      var args = e.target.id.split('_');
      var dial = new ModalDialog (t.cont, 300, 150, '', false);
      dial.getContentDiv().innerHTML = kSendingAttack;
      t.checkAttack (mapObjects[args[1]], notify);
      function notify (rslt){
        if (rslt!=null){
          dial.getContentDiv().innerHTML = '<B>'+ rslt +'</b>';
          dial.allowClose (true);
        } 
        else {
          dial.getContentDiv().innerHTML = '<B>'+ kOK +'</b>';
          setTimeout (function(){dial.destroy()}, 1000);
        }
      }
    }
    
    function butSkipAttack (e){
      var args = e.target.id.split('_');
      mapObjects[args[1]].attackable = (!mapObjects[args[1]].attackable);
      setButtonStyle (document.getElementById('pbattargAN_'+args[1]), mapObjects[args[1]].attackable);     
    }
    
    function tick (){
      var now = serverTime();
      var ts;
      clearTimeout (timer);
      if (!document.getElementById('pbatTargTab'))
        return;
      for (var i=0; i<mapObjects.length; i++){
        if (!mapObjects[i].last)
          ts = '---';
        else {
          var time = now-mapObjects[i].last;
// fix this :P
          if (time > 3600)
            ts = '<FONT COLOR=#550000><B>'+ timestr (now-mapObjects[i].last, false) +'</b></font>';
          else
            ts = timestr (now-mapObjects[i].last, false);
        }
        document.getElementById('pbatList_'+ i).innerHTML = ts;
      }
      timer = setTimeout (tick, 5000);
    }
  },

//*** Attack version of scanMap ***
// scan the map within the radius for Anthropus Camps
// the notify function sets the mapChecked flag
// calls scanMapCirc() with a callback function that gets the mapObject information
// scanMapCirc repeatedly invokes the callback until all the mapObjects have been examined (dat.done == true)
//     when dat.done, sort the mapObjects by distance
  scanMap : function (radius, notify){
  
    var t = Tabs.AutoAttack;
    Data.targets = {radius:0, center:{x:Seed.s.cities[0].x, y:Seed.s.cities[0].y}, mapObjects:[]};
    var dial = new ModalDialog (t.cont, 300, 165, '', false, null);
    dial.getContentDiv().innerHTML = kScanningMap;
    var ix=0; iy=0;
    var x = Seed.s.cities[0].x;
    var y = Seed.s.cities[0].y;
    Map.scanMapCirc (x,y, radius, callback, false);
    function callback (dat){
      if (dat==null){
        dial.getContentDiv().innerHTML = kErrScanningMap;
        dial.allowClose (true);
        if (notify)
          notify (false);
        return;
      }
      for (var i=0; i<dat.tiles.length; i++){
        var tile = dat.tiles[i];
        if (tile.type == 'A')
            Data.targets.mapObjects.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, playerName:tile.playerName, last:null, fromCity:0, attackable:true});
      }      
      if (dat.done){
        logit ('*********  Done Scanning Map ... Total targets: '+ Data.targets.mapObjects.length);      
        Data.targets.mapObjects.sort(function(a,b){return a.dist-b.dist});
        Data.targets.radius = radius;
        if (notify)
          notify(true);
        dial.destroy();
      }
    }
  },    
};


//******************************** Maps Tab *****************************
// Wham - new section to map cities and wildernesses
// TBD: wildernesses
//      grasslands
//      swamps
//      lakes
//      hills
//      plains
//      mountains
//      forests
// TBD: cities
//      outposts
// 

Tabs.Maps = {
  tabOrder : 5,
  tabLabel : kMaps,
  tabDisabled : false,
  cont : null,
  attackTimer: null,
  marchTimer: null,
  lastAttack : 0,
  attackErrors : 0,
  checkMapBusy : false,
  MAX_DISTANCE : 35,
  curRunStart : 0,
  selectedMapName: kLake,
  contentType : 0, // 0 = map type, 1 = targets
  
  init : function (div){
    var t = Tabs.Maps;
    t.cont = div;
    t.selectedMapName = Data.options.mapChoice;
    
    div.innerHTML = '<DIV class=pbTitle>'+ kMapping +'</div>\
      <TABLE width=100% bgcolor=#ffffd0 align=center><TR><TD>\
      <INPUT class=button type=submit value='+ kMapTypes + 'id=pbmpConfigMaps></input>\
      <INPUT class=button type=submit value='+ kTargets +' id=pbmpTargetMaps></input></td></tr></table>\
      <DIV id=pbmpContent style="padding-top:5px; height:710px; max-height:710px; overflow:auto;"></div>';

    // Add event listeners to the sub-tabs
    document.getElementById('pbmpConfigMaps').addEventListener ('click', t.tabConfigMaps, false);
    document.getElementById('pbmpTargetMaps').addEventListener ('click', t.tabMapTargets, false);
      
    // Get the map type
    t.tabConfigMaps();
    window.addEventListener ('unload', t.onUnload, false); 
    
    t.contentType = Data.options.mapTab;
  },

  show : function () {
    var t = Tabs.Maps;
    if (t.contentType == 1)
        document.getElementById('pbmpContent').scrollTop = gMapScrollPos;
    switch (t.contentType) {
        case 0: t.tabConfigMaps(); break;
        case 1: t.tabMapTargets(); break;
    }
  },
  hide : function (){
    var t = Tabs.Maps;
  },

  onUnload : function (){
    var t = Tabs.Maps;
    logit ('===============  Tabs.Maps.onUnload');
    Data.options.mapTab = t.contentType;
  },


// If we are already checking the map, return false
// otherwise, if the radius to check is not 35 miles, or if the targets do not mach the seed values
// all scanMap with a radius of 35 miles, stop checking the map, and return false
// if none of the above, return true
  checkMapData : function (){
    var t = Tabs.Maps;

    if (t.checkMapBusy)
      return false;
    if (Data.targets.radius!=35 || Data.targets.center.x!=Seed.s.cities[0].x || Data.targets.center.y!=Seed.s.cities[0].y){
      t.checkMapBusy = true;
      t.scanMap(35, function(){logit('****** Setting checkMapBusy to FALSE'); Tabs.Maps.checkMapBusy = false});
      return false;
    }    
    return true;
 },

//*** Maps version of getActiveMapList() ***
// Fill the targets list with the mapped data
// Wildernesses have Distance, Coords, Level, and if they are flagged by a player they will also have
//     Lord Title, Lord Name, Power, and Alliance
// Cities have Distance, Coords, City Name, Lord Title, Lord Name, Lord Level, Power, and Alliance
// Uses the appropriate targets list {mapObjects[], camps[], cities[], outposts[], grasslands[], swamps[], lakes[], hills[], plains[], mountains[], forests[]}
// based on the radio button selction in the MAPS Sub-Tab
  getActiveMapList : function (){
    var t = Tabs.Maps;
    var ret = [];
    var len = 0;
    var mapType = null;
   
    switch (Tabs.Maps.selectedMapName.substr(0,1).toUpperCase()){
        case 'A': len = Data.targets.camps.length; mapType = Data.targets.camps; break;
        case 'C': len = Data.targets.cities.length; mapType = Data.targets.cities; break;
        case 'O': len = Data.targets.outposts.length; mapType = Data.targets.outposts; break;
        case 'G': len = Data.targets.grasslands.length; mapType = Data.targets.grasslands; break;
        case 'S': len = Data.targets.swamps.length; mapType = Data.targets.swamps; break;
        case 'L': len = Data.targets.lakes.length; mapType = Data.targets.lakes; break;
        case 'H': len = Data.targets.hills.length; mapType = Data.targets.hills; break;
        case 'P': len = Data.targets.plains.length; mapType = Data.targets.plains; break;
        case 'M': len = Data.targets.mountains.length; mapType = Data.targets.mountains; break;
        case 'F': len = Data.targets.forests.length; mapType = Data.targets.forests; break;
        default: break;
    }
    for (var i=0;i<len;i++){
        ret.push (mapType[i]);
    }
    return ret;
  },
    
  
//*** Maps Tab - Map Types Sub-Tab ***
  tabConfigMaps : function (){
    var t = Tabs.Maps;
    
    switch (t.contentType) {
        case 0:  break;
        case 1: document.getElementById('pbmpTargetMaps').style.backgroundColor = "#0044a0"; document.getElementById('pbmpTargetMaps').style.color = "black"; break;
    }

    t.contentType = 0;
    document.getElementById('pbmpConfigMaps').style.backgroundColor = "#eed"; 
    document.getElementById('pbmpConfigMaps').style.color = "black";
    
    var m = '<DIV class=pbSubtitle>'+ kMapCategories +'</div>\
        <DIV style="overflow:auto">\
        <TABLE class=pbTabPad>\
        <TR align=center class=pbTabHdr1><TD style="background:none !important;" colspan=2></td></tr>\
        </div>';
    
    // Add the radio buttons  
    m += '<TR><TD><INPUT type=radio name=pbmpMapRadio value="AntCamp" ></td><td>'+ kAnthropusCamp +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbmpMapRadio value="Grassland" ></td><td>'+ kSavanna +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbmpMapRadio value="Swamp" ></td><td>'+ kSwamp +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbmpMapRadio value="Lake"></td><td>'+ kLake +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbmpMapRadio value="Hill" ></td><td>'+ kHill +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbmpMapRadio value="Plain" ></td><td>'+ kPlain +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbmpMapRadio value="Mountain" ></td><td>'+ kMountain +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbmpMapRadio value="City" ></td><td>'+ kCity +'</td></tr>';
    m += '<TR><TD><INPUT type=radio name=pbmpMapRadio value="Outpost" ></td><td>'+ kOutpost +'</td></tr>';
    // Add the submit button - triggers an immediate map search when clicked
    m += '<TR><TD colspan="2"><INPUT class=greenButton type=submit id=pbmpMapSearch value='+ kSearch +'></td></tr>'; 
    
    // Add the Transfer to Ant button - copies the currently selected map into the Attack tab so it 
    // can be used to farm those resources quickly
    m += '<TR><TD colspan="2"><INPUT class=greenButton type=submit id=pbmpTransferMap value='+ kTransferMap +'></td></tr>'; 
    m += '</table><DIV class=short></div>';
    
    // Display the inputs
    document.getElementById('pbmpContent').innerHTML = m;

    // add event listeners
    var r = document.getElementsByName('pbmpMapRadio');
    for (i=0;i<r.length;i++) {
        r[i].addEventListener('change', enableChanged, false);
        // Select the radio button that was last selected
        r[i].checked = (r[i].value == Data.options.mapChoice);
    }
    
    document.getElementById('pbmpMapSearch').addEventListener ('click', butSearchNow, false);
    document.getElementById('pbmpTransferMap').addEventListener('click', butTransfer, false);
    
    // search the map for the selected type
    function butSearchNow (e){
        actionLog('scanMap: begin');
        var radius = 35;
        var t = Tabs.Maps;
        Data.targets = {radius:0, center:{x:Seed.s.cities[0].x, y:Seed.s.cities[0].y}, mapObjects:[], camps:[], cities:[], outposts:[], grasslands:[], swamps:[], lakes:[], hills:[], plains:[], mountains:[], forests:[]};
        var dial = new ModalDialog (t.cont, 300, 165, '', false, null);
    
        // Change this to reflect the parameter for the category of map item
        dial.getContentDiv().innerHTML = kScanningMap;
        actionLog('scanMap: notifying user');
    
        var ix=0; iy=0;
        var x = Seed.s.cities[0].x;
        var y = Seed.s.cities[0].y;
        Map.scanMapCirc (x,y, radius, callback, true);
        actionLog('scanMap: called scanMapCirc');
    
        function callback (dat){
            if (dat==null){
                actionLog('scanMap:callback: dat is null');
                dial.getContentDiv().innerHTML = kErrScanningMap;
                dial.allowClose (true);
                Tabs.Maps.checkMapBusy = true;
                return;
            }
            for (var i=0; i<dat.tiles.length; i++){
                var tile = dat.tiles[i];
                // push the map data into the appropriate array
                switch (tile.type){
                    case 'A': Data.targets.camps.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'C': Data.targets.cities.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, CityName:tile.CityName, cityLvl:tile.cityLvl, playerName:tile.playerName, playerLvl:tile.playerLvl, playerMight:tile.playerMight, playerAlliance:tile.playerAlliance, last:null, fromCity:0, attackable:(tile.playerAlliance == '---')}); break;
                    case 'O': Data.targets.outposts.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, CityName:tile.CityName, cityLvl:tile.cityLvl, playerName:tile.playerName, playerLvl:tile.playerLvl, playerMight:tile.playerMight, playerAlliance:tile.playerAlliance, last:null, fromCity:0, attackable:true}); break;
                    case 'G': Data.targets.grasslands.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'B': Data.targets.swamps.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'L': Data.targets.lakes.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'H': Data.targets.hills.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'P': Data.targets.plains.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'M': Data.targets.mountains.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    case 'F': Data.targets.forests.push ({x:tile.x, y:tile.y, dist:tile.dist, lvl:tile.lvl, last:null, fromCity:0, attackable:true}); break;
                    default: break;
                }
            }      
            if (dat.done){
                var totalTargets = 0;
                for (var pm in Data.targets)
                    totalTargets += pm.length;
                //  Data.targets.camps.length + Data.targets.cities.length + Data.targets.outposts.length +\
                //    Data.targets.grasslands.length + Data.targets.swamps.length + Data.targets.lakes.length + \
                //   Data.targets.hills.length + Data.targets.plains.length + Data.targets.mountains.length + Data.targets.forests.length;
                    
                //logit ('*********  Done Scanning Map ... Total targets: '+ totalTargets);
                actionLog('scanMap:callback: done, total targets: ' + totalTargets);
                Data.targets.camps.sort(function(a,b){return a.dist-b.dist});
                Data.targets.cities.sort(function(a,b){return a.dist-b.dist});
                Data.targets.outposts.sort(function(a,b){return a.dist-b.dist});
                Data.targets.grasslands.sort(function(a,b){return a.dist-b.dist});
                Data.targets.swamps.sort(function(a,b){return a.dist-b.dist});
                Data.targets.lakes.sort(function(a,b){return a.dist-b.dist});
                Data.targets.hills.sort(function(a,b){return a.dist-b.dist});
                Data.targets.plains.sort(function(a,b){return a.dist-b.dist});
                Data.targets.mountains.sort(function(a,b){return a.dist-b.dist});
                Data.targets.forests.sort(function(a,b){return a.dist-b.dist});

                Data.targets.radius = radius;
                Tabs.Maps.checkMapBusy = true;
                dial.destroy();
            }
            else
                actionLog('scanMap:callback: not done yet');
        }
        actionLog('scanMap: complete');
    }
    
    // Transfer the currently selected map to the Ant camp tab so it may be used to farm
    function butTransfer (e) {
        var mapObjects = Data.targets.mapObjects;
        var currentlySelectedMap = null;
        switch (Data.options.mapChoice){
            case 'AntCamp':     currentlySelectedMap = Data.targets.camps; break;
            case 'City':        currentlySelectedMap = Data.targets.cities; break;
            case 'Outpost':      currentlySelectedMap = Data.targets.outposts; break;
            case 'Grassland':   currentlySelectedMap = Data.targets.grasslands; break;
            case 'Swamp':       currentlySelectedMap = Data.targets.swamps; break;
            case 'Lake':        currentlySelectedMap = Data.targets.lakes; break;
            case 'Hill':        currentlySelectedMap = Data.targets.hills; break;
            case 'Plain':       currentlySelectedMap = Data.targets.plains; break;
            case 'Mountain':    currentlySelectedMap = Data.targets.mountains; break;
            case 'Forest':      currentlySelectedMap = Data.targets.forests; break;
            default:            break;
        }
        if (currentlySelectedMap){
            for (var i=0;i<currentlySelectedMap.length;i++){
                mapObjects[i] = currentlySelectedMap[i];
            }
        }
    }
    
    // radio buttons are weird    
    function enableChanged (e){
        Tabs.Maps.selectedMapName = e.target.value;
        Data.options.mapChoice = e.target.value;
    }
    
    function dispError (msg){
      var dial = new ModalDialog (t.cont, 300, 150, '', true);
      dial.getContentDiv().innerHTML = msg;
    }

  },


  //*** Maps Tab - Targets Sub-Tab ***
  // Display the list of mapped items, sorted by distance
  tabMapTargets : function (){
    var t = Tabs.Maps;
    
    switch (t.contentType) {
        case 0: document.getElementById('pbmpConfigMaps').style.backgroundColor = "#0044a0"; document.getElementById('pbmpConfigMaps').style.color = "black"; break;
        case 1:  break;
    }

    t.contentType = 1;
    document.getElementById('pbmpTargetMaps').style.backgroundColor = "#eed"; 
    document.getElementById('pbmpTargetMaps').style.color = "black";

    
    // The data displayed will depend on the type of map data. Wildernesses have Distance, Coords, Level, and if they are flagged
    //     they will also have Lord Title, Lord Name, Power, and Alliance
    // Cities have Distance, Coords, City Name, Lord Title, Lord Name, Lord Level, Power, and Alliance but cities
    // Owned resources have a red background color and white text
    if (t.selectedMapName == 'City' || t.selectedMapName == 'Outpost') {
        var m = '<DIV class=pbSubtitle>' + t.selectedMapName + kList + kCityName +'</div>\
        <TABLE id=pbmpTargTab class=pbTab style="overflow:auto"><TR class=pbTabHdr2><TD>'+ kDistance +'</td><TD>'+ kCoords +'</td><TD>'+ kLvl +'</td><td>'+ kCityName +'</td><td>'+ kLord +'</td><TD>'+ kLvl +'</td><TD>'+ kPower +'</td><TD>'+ kAlliance +'</td></tr>';
        //logit (inspect (Data.targets.mapObjects ));
    
        var mapObjects = t.getActiveMapList(); 

        // Hilite owned wildernesses
        var ownedWilderness = Seed.s.player_wildernesses;
        
        // alliance membership may be null
        //var playerName = Seed.s.alliance_membership.player.name; 
          var bFound = true;
        for (var i=0; i<mapObjects.length;i++){
            for (var j=0;j<ownedWilderness.length;j++){     
                 
                if (ownedWilderness[j].x == mapObjects[i].x && ownedWilderness[j].y == mapObjects[i].y) {
                    m += '<TR class=pbOwned><TD>'+ mapObjects[i].dist +'</td><TD align=center>'+ mapObjects[i].x +','+ mapObjects[i].y +'</td><TD align=right>'+ mapObjects[i].lvl +'</td><td>'+ mapObjects[i].CityName +'</td><td>'+ mapObjects[i].playerName + '</td><td align=right>' + mapObjects[i].playerLvl + '</td><td>' + mapObjects[i].playerMight + '</td><td>' + mapObjects[i].playerAlliance + '</td></tr>';
                    bFound = true;
                    break;
                }
            }
            if (bFound)
                bFound = false;
            else
                m += '<TR><TD>'+ mapObjects[i].dist +'</td><TD align=center>'+ mapObjects[i].x +','+ mapObjects[i].y +'</td><TD align=right>'+ mapObjects[i].lvl +'</td><td>'+ mapObjects[i].CityName +'</td><td>'+ mapObjects[i].playerName + '</td><td align=right>' + mapObjects[i].playerLvl + '</td><td>' + mapObjects[i].playerMight + '</td><td>' + mapObjects[i].playerAlliance + '</td></tr>';    
        }
    }
    else {
        var m = '<DIV class=pbSubtitle>' + t.selectedMapName + kList + '</div>\
        <DIV style="overflow: auto"></div>\
        <TABLE id=pbmpTargTab class=pbTab><TR class=pbTabHdr2><TD>'+ kDistance +'</td><TD>'+ kCoords +'</td><TD>'+ kLvl +'</td></tr>';
        //logit (inspect (Data.targets.mapObjects, 5, 1));
    
        var mapObjects = t.getActiveMapList(); 

        // Hilite owned wildernesses
        var ownedWilderness = Seed.s.player_wildernesses;
        var playerName = Seed.s.alliance_membership.player.name; 
        var bFound = true;  
        for (var i=0; i<mapObjects.length; i++){
        for (var j=0;j<ownedWilderness.length;j++) {
            if (ownedWilderness[j].x == mapObjects[i].x && ownedWilderness[j].y == mapObjects[i].y) {
                m += '<TR class=pbOwned><TD>'+ mapObjects[i].dist +'</td><TD align=center>'+ mapObjects[i].x +','+ mapObjects[i].y +'</td><TD align=right>'+ mapObjects[i].lvl +'</td></tr>';
                bFound = true;
                break;
            }
        }
        if (bFound)
            bFound = false;
        else
            m += '<TR><TD>'+ mapObjects[i].dist +'</td><TD align=center>'+ mapObjects[i].x +','+ mapObjects[i].y +'</td><TD align=right>'+ mapObjects[i].lvl +'</td></tr>';  
        }
    }

    m += '</table>';
    document.getElementById('pbmpContent').innerHTML = m;
    document.getElementById('pbmpContent').scrollTop = gMapScrollPos;
    document.getElementById('pbmpContent').addEventListener('scroll', onScroll, true);
    
    function onScroll (e){
      if (t.contentType == 1)
        gMapScrollPos = document.getElementById('pbmpContent').scrollTop;
    }    
  },    
};
//************************* End of Maps ***********************************



function marchTable (myId){
  var m = '<TABLE class=pbTab>';
  var now = serverTime();
  for (var p in Seed.marches){
    var march = Seed.marches[p];
    var time = march.run_at - now;
    var class='pbMarchOther';
    if (march.ownerId == myId)
      class = 'pbMarchMine';
    if (time < 0)
      time = '?';
    else if (isNaN (time))
      time = '---';
    else
      time = timestr(time, true);
    m += '<TR class='+ class +'><TD>'+ kAttack1 + march.x +','+ march.y +'</td><TD>('+ march.target +'-'+ march.terrain_level +')</td><TD>'+ march.status +'<TD>'+ time +'</td></tr>';
  }
  return m +'</table>';
}

function getAvailableGeneral (){
  for (var p in Seed.generals)
    if (!Seed.generals[p].busy)
      return Seed.generals[p];
  return null;
}
function getMusterPointSlots (cityIdx){
  var lvl = Buildings.getLevel (cityIdx, 'MusterPoint');
  if (!lvl)
    return 0;
  return lvl - Seed.numMarches;
}
function objAddTo (o, name, val){
  if (!o[name])
    o[name] = val;
  else
    o[name] += val;
}




var Buildings = {
  getList : function (cityIdx, type){
    var ret = [];
    for (var i=0; i<Seed.s.cities[cityIdx].buildings.length; i++){
      if (Seed.s.cities[cityIdx].buildings[i].type == type)
        ret.push (Seed.s.cities[cityIdx].buildings[i]);
    }
    return ret;
  },
  getLevel : function (cityIdx, type){
    var x = Buildings.getList(cityIdx, type);
    if (x.length < 1)
      return null;
    return x[0].level;
  },
  getById : function (cityIdx, bid){
    for (var i=0; i<Seed.s.cities[cityIdx].buildings.length; i++){
      if (Seed.s.cities[cityIdx].buildings[i].id == bid)
        return (Seed.s.cities[cityIdx].buildings[i]);
    }
    return null;
  },
}



var Ajax = {
  // cat: 'all, 'reports', ''
  messageList : function (cat, callback){
    if (!cat)
      cat = 'all';
    new MyAjaxRequest ('reports.json', {page:1, count:12, category:cat}, mycb, false);
    function mycb (rslt){
      if (rslt.ok && rslt.dat.result.success){
        if (callback)
          callback (rslt.dat.result.report_notifications);
      } 
      else if (callback)
        callback (null);
    }
  },
  
  messageDetail : function (id, callback){
    new MyAjaxRequest ('reports/'+ id +'.json', {}, mycb, false);
    function mycb (rslt){
      if (rslt.ok && rslt.dat.result.success){
        if (callback)
          callback (rslt.dat.result);
      } 
      else if (callback)
        callback (null);
    }
  },

  messageDelete : function (ids, callback){
    var list = ids.join('|');
    new MyAjaxRequest ('reports/bulk_delete.json', {_method:'delete', ids:list}, mycb, true);
    function mycb (rslt){
      if (rslt.ok && !rslt.dat.result.success)
        rslt.ok = false;
      if (callback)
        callback (rslt.ok);
    }
  },

// Use a json to wrap the building upgrade job
  buildingUpgrade : function (cityId, buildingId, callback){
    var t = Ajax;
    var p = {};
    p._method = 'put';
    new MyAjaxRequest ('cities/'+ cityId +'/buildings/'+ buildingId +'.json', p, mycb, true);
    function mycb (rslt){
        //logit ("BUILD RESPONSE:\n" + inspect (rslt, 10, 1));
        if (rslt.dat.result.success){
            Seed.jsonAddJob (rslt.dat.result.job);
        } 
        else {
            rslt.ok = false;
            rslt.errmsg = rslt.dat.result.errors[0];
        }
        if (callback)
            callback (rslt);
    }
 },
 
/***
Headers: 
  Referer: http://castlemania-production.s3.amazonaws.com/flash/game/current/castlemania.swf?api%5Fserver=http%3A%2F%2Frealm57%2Ec6%2Ecastle%2Ewonderhill%2Ecom%2Fapi&pub%5Fserver=pub%2Ecastle%2Ewonderhill%2Ecom&rev=924319190&primary%5Fui%5Fcachebreaker=1306544367&pub%5Fport=7000&session%5Fid=x&secondary%5Fui%5Fcachebreaker=1306544367&facebook%5Fid=1400526627&s3%5Fserver=http%3A%2F%2Fcastlemania%2Dproduction%2Es3%2Eamazonaws%2Ecom&locale=en&s3%5Fswf%5Fprefix=%2Fflash%2Fgame%2Fcurrent&sound%5Fcachebreaker=1306544367&building%5Fcachebreaker=1306544367&lazy%5Floaded%5Fswf%5Fcachebreaker=1306547039&cachebreaker=1306544367 
  Content-type: application/x-www-form-urlencoded 
  X-S3-AWS: a8de6d65d1282ce0700947a13b02a25e3b75705d 
  Content-length: 195 

march[x]=380&
_session_id=x&
march[march_type]=attack&
march[y]=4&
timestamp=1306561014&
march[units]={"BattleDragon":5555}&
march[general_id]=39140&
_method=post

**********  ACTUAL   **************************

http://realm57.c6.castle.wonderhill.com/api/cities/400085311/marches.json

====Request Headers====
Host    realm57.c6.castle.wonderhill.com
User-Agent    Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.9.2.17) Gecko/20110420 Firefox/3.6.17
Accept    text/html,application/xhtml+xml,application/xml;q=0.9;q=0.8
Accept-Language    en-us,en;q=0.5
Accept-Encoding    gzip,deflate
Accept-Charset    ISO-8859-1,utf-8;q=0.7,*;q=0.7
Keep-Alive    115
Connection    keep-alive
Cookie    __utma=54346615.351709906.1306454674.1306594599.1306600260.18; __utmz=54346615.1306600260.18.18.utmcsr=apps.facebook.com|utmccn=(referral)|utmcmd=referral|utmcct=/dragonsofatlantis/; fbs_111896392174831="access_token=111896392174831%7C2.AQCLIBbA7kKLMuHy.3600.1306605600.1-1400526627%7CdBYEObDO5XAfWdt_1EotXStmCls&base_domain=wonderhill.com&expires=1306605600&secret=AQCdR0PcwY6F3d2b&session_key=2.AQCLIBbA7kKLMuHy.3600.1306605600.1-1400526627&sig=afb7aa8d9443291b9ea6a27b7ff2ad38&uid=1400526627"; __utmc=54346615; castle=x; base_domain_90f6f4a7485b79a9d34aa0d73e237651=wonderhill.com; 90f6f4a7485b79a9d34aa0d73e237651=0dcaf98b237cf22f15062e5aa22087f0; 90f6f4a7485b79a9d34aa0d73e237651_user=1400526627; 90f6f4a7485b79a9d34aa0d73e237651_ss=98EerRToMFdI79rynviS4w__; 90f6f4a7485b79a9d34aa0d73e237651_session_key=2.9PYlq_6lBk9H_E7wnGQZyg__.3600.1304622000.1-1400526627; 90f6f4a7485b79a9d34aa0d73e237651_expires=0; __utmb=54346615.1.10.1306600260

=== POST ====
Referer: http://castlemania-production.s3.amazonaws.com/flash/game/current/castlemania.swf?api%5Fserver=http%3A%2F%2Frealm57%2Ec6%2Ecastle%2Ewonderhill%2Ecom%2Fapi&pub%5Fserver=pub%2Ecastle%2Ewonderhill%2Ecom&rev=249479844&primary%5Fui%5Fcachebreaker=1306544367&pub%5Fport=7000&session%5Fid=x&secondary%5Fui%5Fcachebreaker=1306544367&facebook%5Fid=1400526627&s3%5Fserver=http%3A%2F%2Fcastlemania%2Dproduction%2Es3%2Eamazonaws%2Ecom&locale=en&s3%5Fswf%5Fprefix=%2Fflash%2Fgame%2Fcurrent&sound%5Fcachebreaker=1306544367&building%5Fcachebreaker=1306544367&lazy%5Floaded%5Fswf%5Fcachebreaker=1306547039&cachebreaker=1306544367 
Content-type: application/x-www-form-urlencoded 
X-S3-AWS: 068e6b0f5457527c31445b690c59abd1684c0ef9 
Content-length: 195 
march%5Bmarch%5Ftype%5D=attack&%5Fsession%5Fid=x&timestamp=1306600718&march%5Bunits%5D=%7B%22BattleDragon%22%3A8888%7D&%5Fmethod=post&march%5Bgeneral%5Fid%5D=69795&march%5Bx%5D=380&march%5By%5D=4

**********************************************

var header:URLRequestHeader; 
if (this._queue.length > 0 && this._currentRequest == null) { 
  this._currentRequest = this._queue.shift(); 
  postParams = new URLVariables(); 
  var _loc_2:int = 0; 
  var _loc_3:* = this._currentRequest.params; 
  while (_loc_3 in _loc_2) { 
    key = _loc_3[_loc_2]; 
    value = this._currentRequest.params[key]; 
    if (getQualifiedClassName(value) == "Array") { 
      arr = value as Array; 
      value = arr.join(","); 
    } 
    postParams[key] = value; 
  } 
  this._request.url = this._currentRequest.url; 
  this._request.data = postParams; 
  str = "playerId" + this._request.url + this._request.data + "WaterDragon5555"; 
  sig = this.generateSHA(str); 
  this._request.method = this._currentRequest.postMethod ? (URLRequestMethod.POST) : (URLRequestMethod.GET); 
  if (this._currentRequest.postMethod) { 
    header = new URLRequestHeader("X-S3-AWS", sig); 
    this._request.requestHeaders.push(header); 
  } try { 
    this._loader.load(this._request); 
  } catch (error:Error) { 
    trace("RequestDelegate[ERROR]: Unable to load requested document."); 
  } 
} return; 
}// end function 



***/

  marchBusy : 0,
  march : function (cityId, x, y, genId, units, ownerId, callback){
    var t = Ajax;
    var p = {};
    ++t.marchBusy;
    p['march[x]'] = x;
    p['march[y]'] = y;
    p['march[march_type]'] = 'attack';
    p._method = 'post';
    p['march[general_id]'] = genId;
    p.timestamp = parseInt(serverTime());
    var u = {}
    for (var pu in units)
      if (units[pu] > 0)
        u[pu] = units[pu];
    p['march[units]'] = JSON2.stringify(u);     //ie: '{"Longbowman":500}'; 
    
    var url = 'cities/'+ cityId +'/marches.json';
    
    
    new MyAjaxRequest (url, p, mycb, true);
    function mycb (rslt){
        //logit ("MARCH RESPONSE:\n" + inspect (rslt, 10, 1));
        --t.marchBusy;
        if (rslt.ok){
            if (rslt.dat.result.success){
                //  logit ('March ID: '+ rslt.dat.result.job.march_id);  
                try {
                    Seed.jsonGotCity (rslt.dat.result);
                    Seed.marches[rslt.dat.result.job.march_id].ownerId = ownerId;          
                } 
                catch (e){
                    WinLog.write ('***********'+ e);
                }
            } 
            else {
                rslt.ok = false;
                rslt.errmsg =  (matTypeof(rslt.dat.result.errors) == 'array') ? rslt.dat.result.errors[0] : rslt.dat.result.errors;
            }
        }      
        if (callback)
            callback (rslt);
    }
  },

// This looks really cool, if it works
  marchRecall : function (cityId, marchId, callback){ // untested
    var t = Ajax;
    var p = {};
    p._method = 'delete';
    new MyAjaxRequest ('cities/'+ cityId +'/marches/'+ marchId +'.json', p, mycb, true);
    function mycb (rslt){
        //logit ("MARCH RESPONSE:\n" + inspect (rslt, 10, 1));
        if (rslt.ok){
            if (rslt.dat.result.success){
                logit (inspect (rslt, 9, 1));        
                //Seed.jsonGotCity (rslt.dat.result);
            } 
            else {
                rslt.ok = false;
                rslt.errmsg = rslt.dat.result.errors[0];
            }
        }      
        if (callback)
            callback (rslt);
    }
  },

  collectResources : function (cityId, callback){
   new MyAjaxRequest ('cities/'+ cityId +'/move_resources.json', {}, mycb, true);
    function mycb (rslt){
      if (rslt.ok){
        Seed.jsonGotCity (rslt.dat);
      }
      if (callback)
        callback (rslt.ok);
    }
  },
}

// Added the autocollection interval from the select menu
var AutoCollect = {
  init : function (){
    var t = AutoCollect;
    t.setDelay ();
    t.setEnable (Data.options.autoCollect.enabled);
  },
  setDelay : function(){
    var selectMenu = document.getElementById('pboptColInt');
    var index = selectMenu.options.selectedIndex;
    Data.options.autoCollect.delay = selectMenu[index].value * 3600;
  },
  setEnable : function (onOff){
    var t = AutoCollect;
    clearTimeout (t.timer);
    Data.options.autoCollect.enabled = onOff;
    if (onOff){
      var time = Data.options.autoCollect.delay - serverTime() + Data.options.autoCollect.lastTime;
      if (time <= 0)
        t.doit ();
      else
        t.timer = setTimeout (t.doit, time*1000);
    }
  },
  doit : function (){
    var t = AutoCollect;
    Data.options.autoCollect.lastTime = serverTime();
    for (var out=1; out<Seed.s.cities.length; out++)
      collect (out, out*30000);
    t.timer = setTimeout (t.doit, (Data.options.autoCollect.delay + (Math.random()*120))*1000);
    function collect (cityIdx, delay){
      setTimeout (function(){
        Ajax.collectResources (Seed.s.cities[cityIdx].id);
        actionLog ('Collected resources at outpost #'+ cityIdx);
      }, delay);
    }
  },
}


//******************************** Info Tab *****************************
Tabs.Info = {
  tabOrder : 1,
  tabDisabled : false,
  cont : null,
  timer : null,
  
  init : function (div){
    var t = Tabs.Info;
    t.cont = div;
    div.innerHTML = '<DIV class=pbTitle>Attack Script - v'+ Version +'<BR>'+ WebSite +'</div>\
      <TABLE width=100%><TR><TD><INPUT class=greenButton type=submit value='+ kRefresh +' id=pbinfRefresh></input></td><TD align=right><SPAN id=pbinfGmt></span></td></tr></table><DIV id=pbinfCont></div>';
    document.getElementById('pbinfRefresh').addEventListener ('click', t.refresh, false);
    t.showStuff();
  },

  show : function (){
    var t = Tabs.Info;
    t.showStuff();
  },
  hide : function (){
    var t = Tabs.Info;
    clearTimeout (t.timer);
  },

  showStuff : function (){
    var t = Tabs.Info;
    clearTimeout (t.timer);
//logit (inspect (Seed.s, 8, 1));
    
    var city = Seed.s.cities[0];
    var m = cityTitle(0);
    m += '<TABLE style="margin-top:3px" width=100%>\
      <TR bgcolor=#dde align=center><TD style="border-right: 1px solid; border-bottom: 1px solid;"><B>UNITS</b></td><TD style="border-bottom: 1px solid; padding-left:7px"><B>GENERALS</b></td></tr>\
      <TR valign=top align=center><TD width=50% style="border-right: 1px solid;">';
    // UNITS
    m += '<TABLE class=pbTabPad>';
    for (var i=0; i<Names.troops.names.length; i++){
      var name = Names.troops.names[i][1];
      if (name=='GreatDragon' || name=='WaterDragon' || name=='StoneDragon')
        continue;
      var num = city.units[name];
      if (!num)
        num = 0;
      m += '<TR><TD class=pbTabLeft>'+ name +':</td><TD>'+ num +'</td></tr>';
    }
    m += '</table></td><TD width=50% style=" padding-left:7px">';
    
    // GENERALS
    m += '<TABLE class=pbTabPad>';
    for (var ig=0; ig<city.generals.length; ig++){
    
      if (Seed.numMarches)
         for (pm in Seed.marches)
            // The general object will be null if the march is a transport
             if (Seed.marches[pm].march_type != "Transport")
                try {
                      if (city.generals[ig].name == Seed.marches[pm].general.first_name)
                          loc = Seed.marches[pm].x + ',' + Seed.marches[pm].y;
                }
                catch (e) {
                    actionLog('Err: general first_name not available' + e.name + ' ' + e.message);
                }
             
      m += '<TR><TD>'+ city.generals[ig].name +' ('+ city.generals[ig].rank +')</td><TD width=75%>'+ (city.generals[ig].busy?loc:'') +'</td></tr>';
    }
      m += '</table></td></tr></table><BR><TABLE class=pbTabPad>\
        <TR><TD class=pbTabLeft>Marches:</td><TD>'+ Seed.numMarches +'</td></tr>'
        + dispBuildingJob(0) + dispResearchJob(0) + dispTrainingJobs(0) + '</td></tr></table>';
  
    // outposts ...
    if (Seed.s.cities.length > 0){
      for (var i=1; i<Seed.s.cities.length; i++){
        m += '<DIV class=short></div>'+ cityTitle(i) + '<TABLE class=pbTabPad>'
          + dispBuildingJob(i) + dispTrainingJobs(i) + '</td></tr></table>';
      }
    }
    
    // Marches, building, research, training
    document.getElementById('pbinfCont').innerHTML = m; 
    var now = new Date();  
    now.setTime(now.getTime() + (now.getTimezoneOffset()*60000));
    document.getElementById('pbinfGmt').innerHTML = now.toTimeString().substring (0,8) +' GMT';
    t.timer = setTimeout (t.showStuff, 1000);
    
    function dispBuildingJob (cityIdx){
      var m = '<TR><TD class=pbTabLeft>Building:</td>';
      var job = getBuildingJob (cityIdx);
// TODO: very rare occurance: Error: job.building is null
      if (job) {
        // Don't show negative values - not pleasant user interface. To be truly nice, if the time is less than zero, we should reset 
        // the build timer. For now, that is done by the Build tab's notification process
        var buildTime = job.job.run_at - serverTime();
        var buildStr = (buildTime >=0) ? timestr(buildTime, true) : '0';
       m += '<TD>'+ job.building.type +' level '+ job.job.level +'</td><TD>'+ buildStr +'</td></tr>';
      }
      else
        m += '<TD colspan=2><SPAN class=boldRed>NONE</span></td></tr>';
      return m;
    }
    function dispResearchJob (cityIdx){
      var m = '<TR><TD class=pbTabLeft>Research:</td>';
      var job = getResearchJob (cityIdx);
      if (job)
        m += '<TD>'+ job.research_type +' level '+ job.level +'</td><TD>'+ timestr(job.run_at - serverTime(), true) +'</td></tr>';
      else
        m += '<TD colspan=2><SPAN class=boldRed>NONE</span></td></tr>';
      return m;
    }
    function dispTrainingJobs (cityIdx){
      var m = '';
      var last = serverTime();
      var trains = [];
      for (var i=0; i<Seed.s.cities[cityIdx].jobs.length; i++)
        if (Seed.s.cities[cityIdx].jobs[i].queue=='units' && Seed.s.cities[cityIdx].jobs[i].unit_type)
          trains.push (Seed.s.cities[cityIdx].jobs[i]);
      for (var i=0; i<trains.length; i++){
        var left='', tot='';
        if (i==0)
          left = 'Training:';
        else if (i==trains.length-1)
          tot = ' &nbsp <B>('+ timestrShort(trains[i].run_at-serverTime()) +')</b>';
        m += '<TR><TD class=pbTabLeft>'+ left +'</td><TD>'+ trains[i].quantity +' '+ trains[i].unit_type +' </td><TD> '
          + timestr(trains[i].run_at-last, true) + tot + '</td></tr>';
        last = trains[i].run_at;
      }      
      return m;
    }
    function cityTitle (cityIdx){
      var city = Seed.s.cities[cityIdx];
      return '<div class=pbSubtitle><TABLE class=pbTab><TR><TD>City #'+ (cityIdx+1) +'</td><TD width=80% align=center>'+ city.type +'</td><TD align=right>'+ city.x +','+ city.y +'</td></tr></table></div>';
    }
  },


  
  refresh : function (){
    var t = Tabs.Info;
    Seed.fetchSeed (t.showStuff());  
  },
}

/****
function getBuildingJob (cityIdx){
  for (var i=0; i<Seed.s.cities[cityIdx].jobs.length; i++){
    var job = Seed.s.cities[cityIdx].jobs[i];
    if (job.queue == 'building')
      return ({job:job, building:Buildings.getById(cityIdx, job.city_building_id)});
  }
  return null;
}
function getResearchJob (cityIdx){
  for (var i=0; i<Seed.s.cities[cityIdx].jobs.length; i++){
    var job = Seed.s.cities[cityIdx].jobs[i];
    if (job.queue == 'research')
      return (job);
  }
  return null;
}
****/
function getBuildingJob (cityIdx){
  var cid = Seed.s.cities[cityIdx].id;
  for (var p in Seed.jobs[cid]){
    var job = Seed.jobs[cid][p];
    if (job.queue == 'building')
      return ({job:job, building:Buildings.getById(cityIdx, job.city_building_id)});
  }
  return null;
}

function getResearchJob (cityIdx){
  var cid = Seed.s.cities[cityIdx].id;
  for (var p in Seed.jobs[cid]){
    var job = Seed.jobs[cid][p];
    if (job.queue == 'research')
      return (job);
  }
  return null;
}


function cloneProps (src) {
  var newObj = (src instanceof Array) ? [] : {};
  for (i in src) {
    if (matTypeof(src[i]) == 'function')
      continue;
    if (src[i] && typeof src[i] == 'object') {
      newObj[i] = cloneProps(src[i]);
    } 
    else 
      newObj[i] = src[i];
  } 
  return newObj;
};


var Names = {
  troops : {
    'names' : [
    [0, 'Porter','Porter'],
    [1, 'Conscript', 'Conscr'],
    [2, 'Spy', 'Spy'],
    [3, 'Halberdsman', 'Halbrd'],
    [4, 'Minotaur', 'Mino'],
    [5, 'Longbowman', 'LBM'],
    [6, 'SwiftStrikeDragon', 'SSDrg'],
    [7, 'BattleDragon', 'BatDrg'],
    [8, 'ArmoredTransport', 'ATrans'],
    [9, 'Giant', 'Giant'],
    [10, 'FireMirror', 'FireM'],
    [11, 'GreatDragon', 'GrtDrg'],
    [12, 'WaterDragon', 'WatDrg'],
    [13, 'StoneDragon', 'StnDrg'],
    [14, 'AquaTroop', 'Fang'],
    [15, 'StoneTroop', 'Ogre'],
    ],
  }, 
  
  items : {
    'names' : [
    [1, 'Blink', 'Blink'],
    [2, 'Hop', 'Hop'],
    [3, 'Skip', 'Skip'],
    [4, 'Jump', 'Jump'],
    [5, 'Leap', 'Leap'],
    [6, 'Bounce', 'Bounce'],
    [100, 'AquaTroopRespirator', 'Respirators'],
    [101, 'AquaTroopRespiratorStack100', 'Respirator-100'],
    [102, 'AquaTroopRespiratorStack500', 'Respirator-500'],
    [103, 'AquaTroopRespiratorStack1000', 'Respirator-1000'],
    [110, 'GreatDragonBodyArmor', 'GD Armor-1'],
    [111, 'GreatDragonHelmet', 'GD Armor-2'],
    [112, 'GreatDragonTailGuard', 'GD Armor-3'],
    [113, 'GreatDragonClawGuards', 'GD Armor-4'],
    [120, 'WaterDragonBodyArmor', 'WD Armor-1'],
    [121, 'WaterDragonHelmet', 'WD Armor-2'],
    [122, 'WaterDragonTailGuard', 'WD Armour-3'],
    [123, 'WaterDragonClawGuards', 'WD Armor-4'],
    [124, 'WaterDragonEgg', 'WaterDragonEgg'],
    [130, 'StoneDragonBodyArmor', 'SD Armor-1'],
    [131, 'StoneDragonHelmet', 'SD Armor-2'],
    [132, 'StoneDragonTailGuard', 'SD Armour-3'],
    [133, 'StoneDragonClawGuards', 'SD Armor-4'],
    [134, 'StoneDragonEgg', 'StoneDragonEgg'],
    [140, 'StoneTroopItem', 'GlowingMandrake'],
    [141, 'StoneTroopItemStack100', 'GlowingMandrake-100'],
    [142, 'StoneTroopItemStack500', 'GlowingMandrake-500'],
    [143, 'StoneTroopItemStack1000', 'GlowingMandrake-1000'],
   ],
  }, 

  itemAbbr : function (name){
    var x = Names.items.byName[name]; 
    if (x)
      return x[2];
    return name.substr (0, 14);
  },
  
  
/***  
EpeoradMetalsNanosWeek
EpeoradMetalsNanosDay
OreadStoneNanosDay
AtlagenHarvestNanosDay
NanoCollectorWeek
DryadForestNanosWeek
NanoCanisters
DryadForestNanosDay
NanoCollectorDay
DoubleTaxDayDeclaration
Gold10K
Wood25K
Wood250K
OutpostWarp
CompletionGrant
TranceMarchDrops
FortunasTicket
DragonHearts
EasterChest

RenameProclamation
CrimsonBull
ForcedMarchDrops
CeaseFireTreaty
FoundersChest
PurpleBones
MassNullifier
****/    
  
  init : function (){
    var t = Names;
    t.makeIdx (t.troops);
    t.makeIdx (t.items);
  },
  
  makeIdx : function (o){
    byId = {};
    byAbbr = {};
    byName = {};
    var n = o.names;
    for (var i=0; i<n.length; i++){
      byId[n[i][0]] = n[i];
      byAbbr[n[i][2]] = n[i];
      byName[n[i][1]] = n[i];
    }
    o.byId = byId;
    o.byAbbr = byAbbr;
    o.byName = byName;
  },
} 
Names.init ();

//******************************** DEBUG Tab *****************************
// No need to translate the DEBUG tab
Tabs.Debug = {
  tabOrder : 99,
  tabLabel : 'Dbg',
  tabDisabled : !ENABLE_DEBUG_TAB,
  cont : null,
  
  init : function (div){
    var t = Tabs.Debug;
    t.cont = div;
    t.mouseElement = div;
    div.innerHTML = '<TEXTAREA id=pbdbgUnTxt row=3 cols=50></textarea><INPUT type=submit value="unescape" id=pbdbgUn></input><BR><BR>\
      <INPUT type=submit value="Seed.s" id=pbdbgSeedS\> <BR>\
      <INPUT type=submit value="Seed.JOBS.CITY" id=pbdbgSeedJobCity\><BR>\
      <INPUT type=submit value="Seed.MARCHES" id=pbdbgSeedMarches\><BR>\
      <INPUT type=submit value="Seed buildings" id=pbdbgSeedBuildings\><BR><BR>\
      <INPUT type=submit value="Set all mapObject.last to null" id=pbdbgLastNull></input>\
      <INPUT type=submit value="Clear MAP data" id=pbdbgClearMap></input><BR>\
      <INPUT type=submit value="check reports" id=pbdbgReports></input><BR>\
      <INPUT type=submit value="Persistant Data" id=pbdbgData></input><BR>\
      <INPUT type=submit value="Scripts" id=pbdbgScripts></input><BR>\
      <INPUT type=submit value="click" id=pbdbgClick></input> \
      <INPUT type=submit value="move" id=pbdbgMoveM></input><BR><BR>\
      <DIV style="background-color:#eee; margin:5px"><CENTER><INPUT style="width:130px" class=butAttackOff id=pbdbgTMonoff type=submit value="Track Mouse Off"><BR><DIV id=pbdbgCoords>&nbsp;</div></center></div>\
      <BR>Missing Reports:<SPAN id=pbdbgMissRpt></span> &nbsp; <INPUT id=pbdbgResetMR type=submit value="RESET" \>\
      <BR><SPAN class=boldRed>Keep-alive is running!</span>';
    document.getElementById('pbdbgUn').addEventListener ('click', t.unescape, false);
    document.getElementById('pbdbgSeedS').addEventListener ('click', t.seedS, false);
    document.getElementById('pbdbgSeedJobCity').addEventListener ('click', t.seedJobsCity, false);
    document.getElementById('pbdbgSeedMarches').addEventListener ('click', t.seedMarches, false);
    document.getElementById('pbdbgSeedBuildings').addEventListener ('click', t.seedBuildings, false);
    document.getElementById('pbdbgClearMap').addEventListener ('click', t.clearMap, false);
    document.getElementById('pbdbgLastNull').addEventListener ('click', t.setLastNull, false);
    document.getElementById('pbdbgReports').addEventListener ('click', t.readReports, false);
    document.getElementById('pbdbgScripts').addEventListener ('click', t.dispScripts, false);
    document.getElementById('pbdbgClick').addEventListener ('click', t.clickMouse, false);
    document.getElementById('pbdbgMoveM').addEventListener ('click', t.moveMouse, false);
    document.getElementById('pbdbgTMonoff').addEventListener ('click', t.trackMouseEnable, false);
    document.getElementById('pbdbgData').addEventListener ('click', t.dispData, false);
    document.getElementById('pbdbgResetMR').addEventListener ('click', function(){Data.options.messages.missing=0; t.showMissingReports()}, false);
    t.mouseDispDiv = document.getElementById('pbdbgCoords');
    t.keepAlive ();
    t.showMissingReports ();
  },

  show : function (){
  },
  hide : function (){
  },

  seedBuildings : function (){
    var t = Tabs.Debug;
    t.dispBuildings ('Seed.s.cities[0].buildings', Seed.s.cities[0].buildings);
    t.dispBuildings ('Seed.s.cities[1].buildings', Seed.s.cities[1].buildings);
  },
  
  dispScripts : function (){
    pop = new CPopup ('debug', 0,0, 1000,800, true); 
    pop.getTopDiv ().innerHTML = '<B><CENTER>Debug - List Scripts</center></b>' ;
    var scripts = document.getElementsByTagName('script');
    var m = '<DIV style="height:560px; max-height:560px; overflow:auto">';
    for (var i=0; i<scripts.length; i++){
      var code = scripts[i].innerHTML;
      if (code == undefined)
        m += 'no code<BR>';
      else
        m += 'Source: '+ scripts[i].src +'<BR>Length: '+ code.length +'<BR>'+ code.substr(0,1000).htmlEntities() +'<BR><HR>';
    }
    pop.getMainDiv().innerHTML = '</div>'+ m;
    pop.show(true);
  },  
    
  dispBuildings : function (msg, buildings){
    var b = [];
    for (var i=0; i<buildings.length; i++)
      b.push (buildings[i]);
      b.sort (function (a,b){
      if (a.location != b.location){
        if (a.location == 'city')
          return -1;
        return 1;
      }
      return a.slot - b.slot;
    });
    var m = msg + ':\n';
    for (var i=0; i<b.length; i++)
      m += b[i].location +' slot #'+ b[i].slot +' : Level '+ b[i].level +' '+ b[i].type +'\n';
    logit (m);
  },
  
  showMissingReports : function (){
    var t = Tabs.Debug;
    document.getElementById('pbdbgMissRpt').innerHTML = Data.options.messages.missing;
    setTimeout (t.showMissingReports, 2000);
  },
  
  readReports : function (){
    Messages.checkMessages();
  },
  seedS : function (){
    logit (inspect (Seed.s, 8, 1));
  },
  seedJobsCity : function (){
    var now = parseInt(serverTime());
    for (var c in Seed.jobs)
      logit ('Seed.jobs['+ c +'] (city #'+ Seed.cityIdx[c] +') now='+ now +':\n'+ inspect (Seed.jobs[c], 8, 1));
  },
  seedMarches : function (){
    var now = parseInt(serverTime());
    var msg = '***** Seed.marches: *****  (now='+ parseInt(serverTime())+')\n';
    for (var p in Seed.marches){
      var march = Seed.marches[p];
      var status = march.status;
      if (status == 'returning')
        status = 'returning ';
      msg += 'OWNER: '+  march.ownerId +' ID: '+ march.id +' '+ status +' '+ march.x +','+ march.y +' '+ march.run_at +'('+ (march.run_at-now)  +') '+ march.duration +'\n';
    }
    logit (msg);
  },
  
  dispData : function (){
    var m = '';
    for (var i=0; i<Data.names.length; i++)
      m += '***** Data.'+ Data.names[i] +':\n'+ inspect (Data[Data.names[i]], 12, 1);
    logit (m);
  },
  clearMap : function (){
    Tabs.AutoAttack.targets.radius = 0;
    Tabs.AutoAttack.targets.mapObjects = [];
    Tabs.Maps.targets.radius = 0;
    Tabs.Maps.targets.mapObjects = [];
  },
  setLastNull : function (){
    for (var i=0; i<Tabs.AutoAttack.targets.mapObjects.length; i++)
      Tabs.AutoAttack.targets.mapObjects[i].last = null;
    for (var i=0; i<Tabs.Maps.targets.mapObjects.length; i++)
      Tabs.Maps.targets.mapObjects[i].last = null; },

keepAlive : function (){
  var t = Tabs.Debug;
  t.createMouseClick (document.getElementById('castlemania_swf_container'), 0, 0, 0, 0);
  setTimeout (t.keepAlive, 60000);
},
  
  trackMouse : false,
//  mouseElement = document.getElementById('castlemania_swf_container');
  trackMouseEnable : function (e){
    var t = Tabs.Debug;
    if (t.trackMouse){
      e.target.value = 'Track Mouse OFF'
      e.target.className = 'butAttackOff';
      t.mouseElement.removeEventListener('mousemove', t.moveHandler, true);
    } 
    else {
      e.target.value = 'Track Mouse ON'
      e.target.className = 'butAttackOn';
      t.mouseElement.addEventListener('mousemove', t.moveHandler, true);
    }
    t.trackMouse = !t.trackMouse;
  },
  moveHandler : function (me){
    var t = Tabs.Debug;
    t.mouseDispDiv.innerHTML = 'Client: '+ me.clientX +','+ me.clientY +' &nbsp; Screen: '+ me.screenX +','+ me.screenY;
  },
  
  clickMouse : function (){
    var t = Tabs.Debug;
//    t.createMouseClick (t.mouseElement, 874,280,803,183);
    t.createMouseClick (document.getElementById('pbdbgUn'), 0, 0, 0, 0);
  },
  moveMouse : function (){
    var t = Tabs.Debug;
    setTimeout (function (){
      var evObj = document.createEvent('MouseEvents');
      evObj.initMouseEvent( 'move', true, false, window, 0,   874,280,803,183,   false, false, true, false, 0, null );
      var cancelled = !t.cont.dispatchEvent(evObj);
      logit ('Mouse moved, cancelled='+ cancelled);
    }, 2000);
  },
  unescape : function (div){
    var t = Tabs.Debug;
    var e = document.getElementById('pbdbgUnTxt');
    e.value = unescape (e.value);
  },

  createMouseClick : function (e, screenX, screenY, clientX, clientY){
    var evObj = document.createEvent('MouseEvents');
    var cancellable = false;
    evObj.initMouseEvent( 'click', true, cancellable, window, 1, screenX, screenY, clientX, clientY, false, false, true, false, 0, null );
    var cancelled = !e.dispatchEvent(evObj);
    logit ('Mouse dispatched, cancelled='+ cancelled);
  },

  
}



/**************
C.attrs:   
  (string) apiServer = http://realm57.c6.castle.wonderhill.com/api
  (string) appId = 111896392174831
  (string) appPath = http://apps.facebook.com/dragonsofatlantis
  (number) clientTime = 1303048825
  (string) facebookId = 1400526627
  (string) locale = en
  (number) playerId = 400086503
  (boolean) production = true
  (boolean) publishToFacebook = true
  (number) realmId = 57
  (string) s3Server = http://castlemania-production.s3.amazonaws.com
  (string) s3SwfPrefix = /flash/game/current
  (number) serverTime = 1303048829
  (string) sessionId = c681b23d48531835624085c5ba1a7a79
  (number) userId = 2395058
  (number) viralCohortId = 9999
  (string) pubServer = pub.castle.wonderhill.com
  (number) pubPort = 7000
  (string) preloaderCachebreaker = 1302888680
  (string) primaryUICachebreaker = 1302123068
  (string) secondaryUICachebreaker = 1302123081
  (string) buildingCachebreaker = 1302043432
  (string) soundCachebreaker = 1300136852
  (string) lazyLoadedSwfCachebreaker = 1302043433
  (array) playerGeneralFacebookIds = 511766946,531413843,1408508145,1583521095,1630864998,1641056237,100000233332372,100000629563828
  (boolean) isFan = false
  (boolean) hasExtPerms = false
  (array) appFriendIds = 1400526627,511766946,513290679,517317030,587021483,594053295,607773106,628608909,685297360,769038534,829965606,1266963775,1311343917,1361197746,1383471858,1408508145,1408906378,1432144775,1630864998,1641056237,1655875848,1661333219,100000232672930,100000475977050,100000569950692,100000583783925,100000629563828
  (array) nonAppFriends = .................
  (array) generalFriends = .................
  (array) appFriends = ................
************/


function getSwfVar (name){
  var s = 'function swfGetVar (name){\
    var swf = document.getElementById("castlemania_swf");\
    swf.setAttribute("allowscriptaccess", "always");\
    swf.setAttribute("swliveconnect", "true");\
    var val = swf.GetVariable(name);\
    return val;}';
  var e = document.createElement('script');
  e.innerHTML = s;
  document.body.appendChild (e);
  return unsafeWindow.swfGetVar (name);
}

var TestSomething = {
  init : function (){
    t = TestSomething;
  }, 
}

function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x; 
}
function parseIntZero (n){
  if (!n || n=='')
    return 0;
  return parseInt(n, 10);
}



// class
function MarchTracker (){
  var marches = {};
  
  function MarchTracker (){
  }

  this.setReportDelete = function (onOff){
  }
  this.setTroopLossListener = function (listener){
  }
  
  
}


//******************************** BUILD Tab *****************************

Tabs.Build = {
  tabOrder : 4,
  tabLabel : kBuild,
  cont : null,
  buildTimer : null,
  statTimer : null,
  capitalCity : [kGarrison, kHome, kFortress, kSentinel, kMusterPoint, kOfficerQuarter, kStorageVault, kDragonKeep, kWall],
  capitalField : [kMine, kFarm, kLumberMill, kQuarry],
  outpostCity : [kTrainingCamp, kHome, kSilo, kMusterPoint, kDragonKeep, kWall],
  outpostField : [kMine, kFarm, kLumberMill, kQuarry],
  
  init : function (div){
    var t = Tabs.Build;
    t.cont = div;
    for (var i=0; i<Seed.s.cities.length; i++)
      if (!Data.options.autoBuild.buildingEnable[i])
        Data.options.autoBuild.buildingEnable[i] = {};
        
    var m = '<DIV class=pbTitle>Auto Upgrade Buildings</div>\
      <DIV class=pbStatBox><CENTER><INPUT id=pbbldOnOff type=submit\></center>\
      <DIV id=pbbldBldStat></div> <BR> <DIV id=pbbldFeedback style="font-weight:bold; border: 1px solid green; height:17px"></div>  </div>\
      <DIV id=pbbldConfig class=pbInput>';
    var el = [];
    for (var i=0; i<Seed.s.cities.length; i++){
      if (i==0){
        listC = t.capitalCity;
        listF = t.capitalField;
      } 
      else {
        listC = t.outpostCity;
        listF = t.outpostField;
      }
      // The seed object contains a wealth of information including alliance membership, number of people in the alliance, facebook ids of each member,
      // the ol's information (in alliances and alliance_membership), the s object contains all the buildings for the cities, whether or not the city is
      // on defense, the list of generals, what and where the dragon is, a list of jobs (e.g. research, building, troops training and pending training, current marches)
      // the marches alone say where the troops are, whether or not they are returning or attacking, general assigned, etc.
      var city = Seed.s.cities[i];
      m += '<DIV class=pbSubtitle>City #'+ (i+1) +' ('+ city.type +')</div><TABLE class=pbTab><TR valign=top><TD width=150><TABLE class=pbTab>';
      for (var ii=0; ii<listC.length; ii++){
        m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listC[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listC[ii]]?'CHECKED':'') +' /></td><TD>'+ listC[ii] +'</td></tr>';  
        el.push('pbbldcb_'+ i +'_'+ listC[ii]);
      }
      m += '</table></td><TD><TABLE class=pbTab>';  
      for (var ii=0; ii<listF.length; ii++){
        m += '<TR><TD><INPUT type=checkbox id="pbbldcb_'+ i +'_'+ listF[ii] +'" '+ (Data.options.autoBuild.buildingEnable[i][listF[ii]]?'CHECKED':'') +' /></td><TD>'+ listF[ii] +'</td></tr>';  
        el.push('pbbldcb_'+ i +'_'+ listF[ii]);
      }
      m += '</table></td></tr></table>';
    }    
    m += '</div>';
    div.innerHTML = m;
    
    // Add the event listeners for each city's building types
    for (var i=0; i<el.length; i++)
      document.getElementById(el[i]).addEventListener('click', checked, false);
    t.setEnable (Data.options.autoBuild.enabled);
    document.getElementById('pbbldOnOff').addEventListener ('click', function (){
      t.setEnable (!Data.options.autoBuild.enabled);
    }, false);
    
    
    function checked (evt){
      var id = evt.target.id.split ('_');
      var cityId = Seed.s.cities[id[1]].id;
      Data.options.autoBuild.buildingEnable[id[1]][id[2]] = evt.target.checked;
    }
  },
  
  hide : function (){
    var t = Tabs.Build;
    clearTimeout (t.statTimer);
  },
  show : function (){
    var t = Tabs.Build;
    t.statTick();
  },
  
  setEnable : function (onOff){
    var t = Tabs.Build;
    var but = document.getElementById('pbbldOnOff');
    clearTimeout (t.buildTimer);
    Data.options.autoBuild.enabled = onOff;
    if (onOff){
      but.value = kAutoBuildOn;
      but.className = 'butAttackOn';
      t.buildTick();
    } 
    else {
      but.value = kAutoBuildOff;
      but.className = 'butAttackOff';
    }
  },
  
  statTick : function (){
    var t = Tabs.Build;
    var m = '<TABLE class=pbTabPad>';
    clearTimeout (t.statTimer);
    for (var i=0; i<Seed.s.cities.length; i++){
      var city = Seed.s.cities[i];
      var job = getBuildJob (i);
      m += '<TR><TD>'+ kCityNumber + (i+1) +'</td><TD>';
      if (job == null)
        m += 'idle</td></tr>';
      else {
        var b = Buildings.getById(i, job.city_building_id);
        m += 'Building </td><TD>'+ kLevel + job.level +' '+ b.type  +'</td><TD>'+ timestr(job.run_at-serverTime())  +'</td></tr>';
      }
    }
    document.getElementById('pbbldBldStat').innerHTML = m +'</table>';
    t.statTimer = setTimeout (t.statTick, 5000);
  },
  
  dispFeedback : function (msg){
    document.getElementById('pbbldFeedback').innerHTML = new Date().toTimeString().substring (0,8) +' '+  msg;
  },

  errorCount : 0,
  reChecked : false,
  buildTick : function (){
    var t = Tabs.Build;
    clearTimeout (t.buildTimer);
    if (!Data.options.autoBuild.enabled)
      return;
      
    Seed.notifyOnUpdate(function(){
        var nothingToDo = true;    
        for (var ic=0; ic<Seed.s.cities.length; ic++ ){
          var city = Seed.s.cities[ic];
          if (getBuildJob (ic) == null){     // city not currently building
            // find lowest level eligible building ...
            var bl = [];
            for (var p in Data.options.autoBuild.buildingEnable[ic]){
              // Is this building type enabled for autobuild?
              if (Data.options.autoBuild.buildingEnable[ic][p])
                bl = bl.concat (Buildings.getList (ic, p));
            }
            // NOTE: will do this even if the building is not enabled for autobuild
            // bl.length will be zero in that case and building will be set to null
            // When working correctly, it will find the lowest level building of a particular type (e.g. quarry)
            // and set building to that instance and set lowest to the level of that building
            // Because this is not doing a sorted search (on the grid location of the building), it may
            // appear to randomly jump around the grid to pick the next building
            var building = null;  
            var lowest = 9; 
            for (var ib=0; ib<bl.length; ib++){
              if (bl[ib].level < lowest){
                lowest = bl[ib].level;
                building = bl[ib];
              }
            }
            // Why in the world are we checking the arbitrary level 5???
            if (building != null){
              //if (building.level>5 && !t.reChecked){ 
              if (building.level>0 && !t.reChecked){ 
                logit ('BUILD: rechecking city');
                t.reChecked = true;
                Seed.fetchCity (city.id, 1000);
                t.buildTimer = setTimeout (t.buildTick, 500);
              } 
              else {
                t.reChecked = false;
                t.doBuild (building, city);
              }
              return;
            }
          } 
          else {
            nothingToDo = false;
          }
        }
t.reChecked = false;        
        if (nothingToDo){
          t.dispFeedback (kNothingToDo);
          t.setEnable (false);
          return;
        }
        t.buildTimer = setTimeout (t.buildTick, 8000);
    }); 
  },
  
  // Wham: exit immediately if the building level is 9 - never take a completion grant automatically
  doBuild : function (building, city){
    var t = Tabs.Build;
    
    // check the building level, return if autobuild is trying to use a completion grant
    if (building.level == 9)
        return;
        
    var msg = kBuildingLevel + (building.level+1) +' '+ building.type + kAt + city.type;
    t.dispFeedback (msg);
    Ajax.buildingUpgrade (city.id, building.id, function (rslt){
      //logit ('BUILD RESULT: '+ inspect (rslt, 7, 1)); 
      t.statTick();
      if (rslt.ok){
        t.errorCount = 0;
        actionLog (msg);
        t.buildTimer = setTimeout (t.buildTick, 8000);
        return;
      } 
      else {
        Seed.fetchSeed();
        actionLog (kBuildErr+ rslt.errmsg);
        if (++t.errorCount > 3){
          t.dispFeedback (kTooManyBuildErrs);
          t.setEnable (false);
          return;
        }
        t.dispFeedback (kBuildErr + rslt.errmsg);
        t.buildTimer = setTimeout (t.buildTick, 20000);
        return;
      }
    });
  },
  
}

 function getBuildJob (cityIdx){
  var cid = Seed.s.cities[cityIdx].id;
  var jobs = Seed.jobs[cid];
  for (var p in jobs){
    if (jobs[p].queue == 'building')
      return jobs[p];
  }
  return null;
 }

// Added a select box to allow the user to choose the number of hours between autocollecting
// resources (from 1 to 8)
//*********************************** Options Tab ***********************************
Tabs.Options = {
  tabOrder : 6,
  tabLabel : kOpts,
  cont : null,
  fixAvailable : {},
  autoCollectInterval : 8,

  init : function (div){
    var t = Tabs.Options;
    t.cont = div;
    try {      
      m = '<DIV class=pbTitle style="margin-bottom:10px">'+ kOptions +'</div><TABLE class=pbTab>\
        <TR valign=top><TD colspan=2><B>Config:</b></td></tr>\
        <TR valign=top><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>'+ kEnableDrag +'</td></tr>\
        <TR valign=top><TD colspan=2><B><BR>'+ kFeatures +'</b></td></tr>\
        <TR><TD><INPUT id=pboptACol type=checkbox /></td><TD>'+ kAutoCollectAt +'<SELECT id=pboptColInt size="1">\
        <option value="1">1</option>\
        <option value="2">2</option>\
        <option value="3">3</option>\
        <option value="4">4</option>\
        <option value="5">5</option>\
        <option value="6">6</option>\
        <option value="7">7</option>\
        <option value="8">8</option>\
        </select> hour(s)</td></tr>\
        </table><BR><HR>';
      t.cont.innerHTML = m;
      
      var selectMenu = document.getElementById('pboptColInt');
      selectMenu.options[Data.options.autoColInt-1].selected = true;
      selectMenu.selectedIndex = Data.options.autoColInt-1;
      
      t.togOpt ('ptAllowWinMove', Data.options.ptWinDrag, mainPop.setEnableDrag);
      t.togOpt ('pboptACol', Data.options.autoCollect.enabled, AutoCollect.setEnable);
      document.getElementById('pboptColInt').addEventListener('change', changeColInt, false);
      
      function changeColInt (e) {
        Data.options.autoColInt = e.target[e.target.selectedIndex].value;
        Data.options.autoCollect.delay = Data.options.autoColInt * 3600;       
      }
      
    } catch (e) {
      t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
  },
  
  hide : function (){
  },
  show : function (){
  },
  
  togOpt : function (checkboxId, optionVar, callEnable, callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);
    
    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (optionVar)
      checkbox.checked = true;
    checkbox.addEventListener ('change', new eventToggle(checkboxId, optionVar, callEnable).handler, false);
    function eventToggle (checkboxId, optionVar, callOnChange){
      this.handler = handler;
      var optVar = optionVar;
      var callback = callOnChange;
      function handler(event){
        optVar = this.checked;
        if (callback != null)
          callback (this.checked);
      }
    }
  },
}


/***
callback (datObj):
  minX
  minY
  maxX
  maxY
  done: true/false
  tiles [  {x, y, type, dist, lvl, detail{} } ]  type = A, W or C
***/

// tbd - these may need to be translated
var Map = {
  names : {
    A : 'AntCamp',
    C : 'City',
    O : 'Outpost',
    H : 'Hill',
    G : 'Grassland',
    L : 'Lake',
    M : 'Mountain',
    F : 'Forest',
    P : 'Plain',
    S : 'Swamp',
  },
  scanMapCirc : function (x, y, radius, callback, doDetail){
    var t = Map;
    t.centerX = x;
    t.centerY = y;                                   
    t.firstX = t.normalize (x-radius+7);
    t.firstY =  t.normalize (y-radius+7);
    t.curIX = t.curIY = 0;
    t.widthI = parseInt(((radius*2)+14)/15); 
    t.radius = radius;
    t.doDetail = doDetail;
    t.callback = callback; 
    t.circ = true;
//WinLog.writeText ('***** AJAX: '+ t.curX +' , '+ t.curY);    
    new MyAjaxRequest ('map.json', {x:t.firstX, y:t.firstY}, t.got);
  },  

  got : function (rslt){
    var t = Map;
    var x = rslt.dat.x;
    var ret = {tiles:[]}
    
    //logit ('Map.got:\n'+ inspect (rslt.dat, 1, 2, 1));    
    if (!rslt.ok){
      t.callback (null);    // error !?!
      return;
    }
    for (var i=0; i<rslt.dat.terrain.length; i++){
      for (var ii=0; ii<rslt.dat.terrain[i].length; ii++){
        var tile = rslt.dat.terrain[i][ii];
        var dist = distance (t.centerX, t.centerY, tile[2], tile[3]);
          if (dist <= t.radius){
          var playerName = Seed.s.alliance.name;
              var type = tile[0].substr(0,1).toUpperCase();
              var d = {x:tile[2], y:tile[3], dist:dist, type:type, playerName:playerName, lvl:tile[1]};
  // TODO:  detail  
          if (t.doDetail){
             if (type=='W'){
             } 
             else if (type=='C') {
             }
          }
          ret.tiles.push (d);
        }
      }
    }
    //logit ('SCAN 1:\n'+ inspect (t, 5, 4, 1));    
    if (++t.curIX >= t.widthI){
      t.curIX = 0;
      if (++t.curIY >= t.widthI){
        ret.done = true;
        t.callback (ret); 
        return;
      }
    }
    //logit ('SCAN 2:\n'+ inspect (t, 5, 1));    
    ret.done = false;
    t.callback (ret);  
    //WinLog.writeText ('***** AJAX: '+ t.curX +' , '+ t.curY);    
    setTimeout (function(){new MyAjaxRequest ('map.json', {x:t.normalize(t.firstX+(t.curIX*15)), y:t.normalize(t.firstY+(t.curIY*15))}, t.got);}, MAP_DELAY);
 },
    
  normalize : function (x){
    if (x > 750)
      x -= 750;
    if (x < 0)
      x += 750;
    return x;
  },  
}




// CLASS!
function ModalDialog (curtainDiv, width, height, styleName, allowClose, notifyClose){
  this.allowClose = function (onOff){
    if (onOff)
      document.getElementById('MD7r8h').style.display = 'block';
     else
      document.getElementById('MD7r8h').style.display = 'none';
  }
  this.destroy = function (){
    if (!this.destroyed){
      this.curtainDiv.removeChild(this.curtain);
      this.curtainDiv.removeChild(this.div);
    }
  }
  this.hide = function (){
      this.curtainDiv.style.display='none';
      this.curtainDiv.style.display='none';
  }
  this.show = function (){
      this.curtainDiv.style.display='block';
      this.curtainDiv.style.display='block';
  }
  
  this.getContentDiv = function (){
    return document.getElementById('MD7r8hc');
  }
  
  var off = getAbsoluteOffsets (curtainDiv);
  this.curtainDiv = curtainDiv;
  this.curtain = document.createElement ('div');
  this.curtain.style.top = off.top +'px';
  this.curtain.style.left = off.left + 'px';
  this.curtain.style.width = curtainDiv.clientWidth +'px';
  this.curtain.style.height = curtainDiv.clientHeight +'px';
  this.curtain.style.backgroundColor = '#000';
  this.curtain.style.opacity = '0.6';
  this.curtain.style.zIndex = parseInt(curtainDiv.style.zIndex) + 1;
  this.curtain.style.position = 'absolute';
//  curtain.style.margin = curtainDiv.style.margin;
//  curtain.style.padding = curtainDiv.style.padding;
  curtainDiv.appendChild (this.curtain);

  this.div = document.createElement('div');
  if (styleName)
    this.div.className = styleName;
  else {
    this.div.style.backgroundColor = 'white';
    this.div.style.border = '1px solid black';
  }
  this.div.style.width = width +'px';
  this.div.style.height = height +'px';
  this.div.style.position = 'absolute';
  this.div.style.zindex = parseInt(curtainDiv.style.zIndex) + 2;
  this.div.style.top = ((curtainDiv.clientHeight-height)/2 + off.top) + 'px';
  this.div.style.left = ((curtainDiv.clientWidth-width)/2 + off.left) + 'px';

  this.div.innerHTML = '<TABLE HEIGHT=100% WIDTH=100%><TR valign=middle height=80%><TD><DIV id=MD7r8hc style="text-align:center"></div></td></tr>\
    <TR valign=middle align=center><TD><INPUT id=MD7r8h type=submit value="CLOSE" style="display:none"/></td></tr></table>';
  curtainDiv.appendChild(this.div);
  this.allowClose(allowClose);
  this.notifyClose = notifyClose;
  var t = this;
  document.getElementById('MD7r8h').addEventListener('click', function (){
      t.destroyed = true;
      t.curtainDiv.removeChild(t.curtain);
      t.curtainDiv.removeChild(t.div);
      if (t.notifyClose)
        notifyClose();
  }, false);
}


function addScript (scriptText){
    var scr = document.createElement('script');   
    scr.innerHTML = scriptText;
    document.body.appendChild(scr);
//    setTimeout ( function (){document.body.removeChild(scr);}, 500);
}

// Pythagorean theorum for the hypotenuse of a right triangle
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
    var m = '<TABLE cellspacing=0 class=pbMainTab><TR>';
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    m += '<TD class=spacer width=90% align=right></td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;
    
    t.currentTab = null;
    for (k in t.tabList) {
      if (t.tabList[k].name == Data.options.currentTab)
        t.currentTab = t.tabList[k] ;
      document.getElementById('pttc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div; 
      div.style.display = 'none';
      div.style.height = '100%';
      div.style.maxWidth = '387px';
      div.style.overflowX = 'auto';
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
    } 
    else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager;
    var newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('pttc'+ newTab.name), true);
      t.setTabStyle (document.getElementById ('pttc'+ t.currentTab.name), false);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Data.options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}


function setTabStyle (e, selected){
  if (selected){
    e.className = 'matTabSel';
  } 
  else {
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

function mouseMainTab (me){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
    showMe();
  }
}

function eventHideShow (e){
  if (Data.options.ptWinIsOpen)
    hideMe();
  else 
    showMe();
}

function hideMe (){
  if (!Data.options.ptWinIsOpen)
    return;
  WinTracker.show(true);
  tabManager.hideTab();
}
function showMe (){
  if (Data.options.ptWinIsOpen)
    return;
  WinTracker.show(true);
  tabManager.showTab();
}



// onClick (city{name, id, x, y}, x, y)   city may be null!
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


function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  var pop = new CPopup ('ptcancont', 0, 0, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>'+ kDOAPowerTools +'</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptcccancel type=submit value='+ kCancel +' \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value='+ kContinue +' \></td></tr></table>';
  document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
  document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
  pop.show(true);
}


// TODO: add 'Retry Now' button
function DialogRetry (errMsg, seconds, onRetry, onCancel){
  var secs;
  var pop;
  var rTimer;
  var cdTimer;
  
    secs = parseInt(seconds);
    pop = new CPopup ('pbretry', 0, 0, 400,200, true);
    pop.centerMe(mainPop.getMainDiv());
    pop.getTopDiv().innerHTML = '<CENTER>DOA Power Tools mod by Wham</center>';
    pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
        <BR><BR><B>'+ kAutoRetry +'<SPAN id=paretrySeconds></b></span>'+ kSeconds1 +'<BR><BR><INPUT id=paretryCancel type=submit value='+ kCancelRetry +' \>';
    document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
    pop.show(true);
    document.getElementById('paretryErrMsg').innerHTML = errMsg;
    document.getElementById('paretrySeconds').innerHTML = secs;
    rTimer = setTimeout (doRetry, secs*1000);
    cdTimer = null;
    countdown ();

  function countdown (){
    document.getElementById('paretrySeconds').innerHTML = secs--;
    if (secs > 0)
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

/***
  url: just the path part (ie: map.json or //marches.json)
  params: {}
  callback is passed json obj:  {ok:boolean, errmsg:'', dat:{}}
***/
function MyAjaxRequest (url, params, callback, isPost){
  var o = {onSuccess:mySuccess, onFailure:myFailure};
  var retrySecs = 3.33;
  o.parameters = {};
  for (var p in params)
    o.parameters[p] = params[p];
  o.parameters._session_id = C.attrs.sessionId;
  if (EMULATE_NET_ERROR > 0){
    if (Math.random()*100 <= EMULATE_NET_ERROR){
//      o.parameters._session_id = 'xxx';
      setTimeout (function(){error (999, 'ERROR: Emulated')}, 1500);
      return;
    }
  }

  if (isPost)
    o.method = 'POST';
  o.timeoutSecs = 45;
  if (DEBUG_TRACE_AJAX > 0){
    WinLog.writeText ("AJAX "+ (isPost?'POST':'GET') +" : "+ C.attrs.apiServer +'/'+ url);  
    if (DEBUG_TRACE_AJAX > 1)
      WinLog.writeText ('ARGS:\n'+ inspect (o.parameters, 5, 1));
  }
  var ajax = new AjaxRequest (C.attrs.apiServer +'/'+ url, o);
  function mySuccess (r){
    if (DEBUG_TRACE_AJAX > 0){
      WinLog.writeText ("AJAX SUCCESS:");  
      if (DEBUG_TRACE_AJAX > 1)
        WinLog.writeText (inspect (r, 2, 1));
      if (DEBUG_TRACE_AJAX > 2)
        WinLog.writeText (inspect (JSON2.parse(r.responseText), 8, 1));  
    }
    if (r.status == 200)
      callback ({ok:true, dat:JSON2.parse(r.responseText)});
    else
      error (r.status, 'Server error: '+ r.statusText);
  }
  function myFailure (r){
    if (DEBUG_TRACE_AJAX > 0)
      WinLog.writeText ("**********  AJAX FAILURE: \n" + inspect (r, 8, 1));  
    error (r.status, r.statusText +' ('+ r.status +')');
  }
  function error (code, msg){
    if (!code || (code>=400 && code<500)){      // SHOULD BE 500!
      cancel();
      return;
    }
    retrySecs *= 1.5;
    new DialogRetry (msg, retrySecs, retry, cancel);
    function retry (){
      new MyAjaxRequest (url, params, callback, isPost);
    }
    function cancel(){
      callback ({ok:false, errmsg:msg});
    }
  }
}



// simliar to protoype's Ajax.Request ... 
// passes object to handlers: {status:, responseText:, statusText:, ajax:}
function AjaxRequest (url, opts){
  var timer = null;
  var method = 'GET';
  var ajax;
  var headers = {
//    'X-Requested-With': 'XMLHttpRequest',
//    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");
  if (opts.method)
    method = opts.method.toUpperCase();  
  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } 
  else if (method == 'GET'){
    url = addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      clearTimeout (timer);  
      if (ajax.status >= 200 && ajax.status < 399){
        if (opts.onSuccess) opts.onSuccess({responseText:ajax.responseText, status:ajax.status, statusText:"OK", ajax:ajax});
      }else{
        if (opts.onFailure) opts.onFailure({responseText:ajax.responseText, status:ajax.status, statusText:ajax.statusText, ajax:ajax});
      }
    } 
    else {
      if (opts.onChange) opts.onChange ({responseText:ajax.responseText, status:ajax.status, statusText:ajax.statusText, ajax:ajax});
    }
  }  
  ajax.open(method, url, true);   // always async!
  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);
  if (opts.timeoutSecs)
    timer = setTimeout (timedOut, opts.timeoutSecs*1000);
  if (method == 'POST'){
    var a = [];
    for (var k in opts.parameters)
      a.push (k +'='+ opts.parameters[k] );
    var parmStr = a.join ('&');  
    ajax.setRequestHeader ('X-S3-AWS', SHA1("playerId" + url + parmStr + "WaterDragon5555"));
    ajax.send (parmStr);
  } 
  else {
    ajax.send();
  }
  
  function timedOut(){
    ajax.abort();
    if (opts.onFailure) opts.onFailure({responseText:null, status:599, statusText:'Timed Out', ajax:ajax});
  }
}   



// example: http://www150.kingdomsofcamelot.com
var ServerId = null;
function getServerId() {
  if (ServerId)
    return ServerId;
  var m=/^realm([0-9]+)\./.exec(document.location.hostname);
  if(m){
    ServerId = m[1];
    return m[1];
  }
  return '';
}

function logit (msg){
  var serverID = getServerId();
  var now = new Date();
  if (IsChrome)
    console.log (msg);
  else
    GM_log (serverID +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

//*********************************** Log Tab ***********************************
Tabs.ActionLog = {
  tabOrder: 5,
  tabLabel : 'Log',
  myDiv : null,
  logTab : null,
  maxEntries: 500,
  saveEntries: 200,
  state : null,
    
  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pbTitle>ACTION LOG</div><DIV style="height:725px; max-height:725px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=pbTabLined><TR><TD></td><TD width=95%></td></table></div>';
    t.logTab = document.getElementById('pbactionlog');  
    t.state = 1;
    if (matTypeof(Data.log) == 'array'){
      for (var i=0; i<Data.log.length; i++)
        t._addTab (Data.log[i].msg, Data.log[i].ts);
    }
  },

  hide : function (){
  },

  show : function (){
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
    while (Data.log.length >= t.saveEntries)
      Data.log.shift();
    Data.log.push ({msg:msg, ts:ts});
  },
}

function actionLog (msg){
  if (!Tabs.ActionLog.tabDisabled)
    Tabs.ActionLog.log (msg);  
}
    

function AddMainTabLink(text, eventListener, mouseListener) {
  var ul = searchDOM (document.getElementById('hd'), 'node.tagName=="UL"', 4);
  var li = document.createElement ('li');
  var a = document.createElement ('a');
  li.className = 'tab first';
  a.innerHTML = text;
  a.href='javascript:';
  a.addEventListener ('click', eventListener, true);
  a.className = 'toolbutOff';
  li.appendChild (a);
  WinTracker.setBlinkElement (a);
  ul.insertBefore (li, ul.firstChild);
  if (mouseListener != null)
    a.addEventListener('mousedown', mouseListener, true);
  return a;
}

//**********************************************************************************

function titleLine (msg){
  return '<TABLE cellpadding=0 cellspacing=0 width=100%><TR><TD width=50%><HR></td><TD>'+ msg +'</td><TD width=50%><HR></td></tr></table>';
}

//************ LIB classes/functions **************
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
    logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};

function debugPos  (e){
  return 'client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
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

function htmlTitleLine (msg){
  return '<TABLE width=100% cellspacing=0><TR><TD style="padding:0px" width=50%><HR></td><TD style="padding:0px">[ '+ msg +' ]</td><TD style="padding:0px" width=50%><HR></td></tr></table>';  
}


var WinManager = {
  wins : {},    // prefix : CPopup obj

  get : function (prefix){
    var t = WinManager;
    return t.wins[prefix];
  },
  
  add : function (prefix, pop){
    var t = WinManager;
    t.wins[prefix] = pop;
//    if (unsafeWindow.cpopupWins == null)
//      unsafeWindow.cpopupWins = {};
//    unsafeWindow.cpopupWins[prefix] = pop;
  },
  
  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
//    delete unsafeWindow.cpopupWins[prefix];
  }    
}


// creates a 'popup' div
// prefix must be a unique (short) name for the popup window
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
  this.setModal = setModal;

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
  
  function setModal (onOff){
  }
  
  function e_divClicked (){
    t.focusMe();
  }  
  function e_XClose (){
    t.show(false);
    if (t.onClose != null)
      t.onClose();
  }

  function focusMe (){
    t.setLayer(5);
//    for (k in unsafeWindow.cpopupWins){
//      if (k != t.prefix)
//        unsafeWindow.cpopupWins[k].unfocusMe(); 
//    }
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
    } 
    else
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
    } 
    else {
      t.div.style.display = 'none';
    }
    return tf;
  }
  function toggleHide(t){
    if (t.div.style.display == 'block') {
      return t.show (false);
    } 
    else {
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
    } 
    else {
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
        } 
        else if (newLeft < t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } 
        else if (newLeft > t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } 
        else if (newTop > t.bounds.bot){
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
        } 
        else if (type != 'function') {
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

if (String.trim == undefined) {
  String.prototype.trim = function () {
      return this.replace(/^\s*/, "").replace(/\s*$/, "");
  }
}
function entityDecode (str){
  var ta=document.createElement('textarea');
  ta.innerHTML = str; 
  return ta.value;
}  
  
function parseNvQuoted(str){
  var ret = {};
  var re = /\s*(.*?)\s*=\s*('|")(.*?)\2/gi;
  while ((m = re.exec(str)) != null)
    ret[m[1]] = m[3];
  return ret;
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


function serverTime (){
  return parseInt (new Date().getTime() / 1000) + Seed.serverTimeOffset;
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
    m.push ('h');
    return m.join ('');    
  } 
  else
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
  var str = m.join('');
  if (str[str.length-1] == ' ')
    str = str.substring(0, str.length-1);
  return str;
}

//************ LIB singletons **************
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
  lineNum : 0,

  open : function (){
    var t = WinLog;

    function eventButClear(){
      var t = WinLog;
      t.lastE = null;
      t.eOut.innerHTML ='';
      t.lineNum = 0;
    }
    function eventButReverse(){
      var t = WinLog;
      if (t.busy)
        return;
      t.busy = true;
      if (t.reverse){
        t.win.document.getElementById('wlRev').value= 'Top';
        t.reverse = false;
      } 
      else{
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
    if (++t.lineNum % 2)    
      te.style.backgroundColor = '#eeeeee'; 
    else
      te.style.backgroundColor = '#ffffff'; 
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
      } 
      else {
        t.eOut.insertBefore(te, t.lastE);
      }
      var hr = document.createElement('hr');
      t.eOut.insertBefore(hr, te);
      t.lastE = hr;
    } 
    else {
      t.eOut.appendChild(te);
      t.eOut.appendChild(document.createElement('hr'));
    }
  },
};
function SHA1 (msg) {
 
    function rotate_left(n,s) {
        var t4 = ( n<<s ) | (n>>>(32-s));
        return t4;
    };
 
    function lsb_hex(val) {
        var str="";
        var i;
        var vh;
        var vl;
 
        for( i=0; i<=6; i+=2 ) {
            vh = (val>>>(i*4+4))&0x0f;
            vl = (val>>>(i*4))&0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };
 
    function cvt_hex(val) {
        var str="";
        var i;
        var v;
 
        for( i=7; i>=0; i-- ) {
            v = (val>>>(i*4))&0x0f;
            str += v.toString(16);
        }
        return str;
    };
 
 
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;
    };
 
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
 
    msg = Utf8Encode(msg);
 
    var msg_len = msg.length;
 
    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array.push( j );
    }
 
    switch( msg_len % 4 ) {
        case 0:
            i = 0x080000000;
        break;
        case 1:
            i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
        break;
 
        case 2:
            i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
        break;
 
        case 3:
            i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
        break;
    }
 
    word_array.push( i );
 
    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
 
    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );
 
 
    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
 
        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
 
        for( i= 0; i<=19; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
 
        for( i=20; i<=39; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
 
        for( i=40; i<=59; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
 
        for( i=60; i<=79; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
 
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
 
    }
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    return temp.toLowerCase();
}


dtStartup ();

/*

Notes on owned wildernesses

t.s.player_wildernesses[] contains the array of wildernesses owned by a player
var t = Seed;
var wildernesses = t.s.wildernesses;

Notes on jsons

player.json
maps.json

cities: id cancel march
reports: id queue up a report

see fetchcity(), marchrecall(), buildingupdate(), messagedetail()
*/
