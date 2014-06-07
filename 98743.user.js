// ==UserScript==
// @name           Power Tools - POC 3 With Food Alert
// @namespace      Hung
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @include	   http://corpr8.co.uk/newalert/html
// @description    Enhancements and bug fixes for Kingdoms of Camelot
// @require        http://sizzlemctwizzle.com/updater.php?id=89356
// ==/UserScript==

var Version = '20110309a';
var Title = 'KOC Power Tools';
var DEBUG_BUTTON = true;
var DEBUG_TRACE = false;
var DEBUG_TRACE_DRAG = false;
var MAP_DELAY = 1500;
var DISABLE_POST_KNIGHT_SKILLS = false;
var DISABLE_POST_DEFENSES = false;
var ENABLE_TEST_TAB = true;
var SEND_ALERT_AS_WHISPER = false;

var ENABLE_SEARCH_TAB = true;
var ENABLE_ALERT_TO_CHAT = true;

var URL_CASTLE_BUT = 'http://i.imgur.com/MPlZr.png';
var URL_CASTLE_BUT_SEL = 'http://i.imgur.com/XWR4B.png';
var URL_PROVINCE_MAP = 'http://i.imgur.com/VE48b.png';
var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};  


/***************
20110204a
   
Added random delay in training to look more human.
Anti-cheat detection

  TODO: reported: "I noticed earlier that if you have negative population and the box for going into negative population is not checked, the wall defenses max trainable displays as NaN."
  TODO: delete button when viewing report/mail
  TODO: fix missing 'forward' and 'all officers' buttons (conflict with alterUwFunction?)
***************/


/******************
// TODO: ptGotoMap ... (WinManager.hideAll())
// TODO: Power button OUTSIDE of KOC's DOM (under ad frame?)
// TODO: Food surplus trend (% change over 30 minutes, etc.)
// TODO: Force KOC to update training queues, marches, etc for non-current city ?  (fix 'waiting for reports', lingering tower alerts, etc)
***/

    
var Options = {
  includeMarching:true,
  encRemaining : true,
  maxIdlePop   : false,
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  wildType     : 1,
  cityType     : 1,
  MightSrc     : 1,
  unownedOnly  : true,
  fixTower     : true,
  fixTower2    : true,
  fixMapDistance: true,
  fixMsgCount  : true,
  fixWarnZero  : true,
  fixPageNav   : true,
  enhanceARpts : true,
  allowAlterAR : true,
  enhanceMsging : true,
  ptWinIsOpen  : false,
  ptWinDrag    : false,
  ptWinPos     : {},
  enableFoodWarn : true,
  foodWarnHours : 4,
  lastVersion : null,
  gmtClock : true,
  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, minTroops:10000, spamLimit:10 },
};


var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON; 


var Cities = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var currentName = 'Overview';
var mainPop;
var CPopUpTopClass = 'ptPopTop';
var KOCversion = null;
var ptStartupTimer = null;


function ptStartup (){
  clearTimeout (ptStartupTimer);
  if (unsafeWindow.ptLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    ptStartupTimer = setTimeout (ptStartup, 1000);
    return;
  }
  unsafeWindow.ptLoaded = Version;
  logit ("KofC client version: "+ anticd.getKOCversion());
  
  readOptions();

//logit ('g_timeoff: '+ unsafeWindow.g_timeoff);
  Seed = unsafeWindow.seed;
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .hostile td { background:#FF4040; }.friendly td{background:lightblue; }.ally td{background:royalblue; }\
    .neutral td { background:#C8C8C8; }.unaligned td { background:gold; }\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    div.ptDiv {background-color:#f0f0f0;}\
    table.ptTab tr td {border:none; background:none; white-space:nowrap;}\
    table.ptTabPad tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 4px;}\
    table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none;}\
    table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .ptOddrow {background-color:#eee}\
    .ptstat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .ptStatLight {color:#ddd}\
    .ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {border-size:3px; border-color:#000;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    a.ptButton20 {color:#ffff80}\
    hr.ptThin {padding:0px; margin:0px}\
    input.pbSubtab {cursor:pointer; width:10em; margin-right:15px;}\
    input.pbSubtabSel {background-color:#444; color:white; font-weight:bold; cursor:none !important}\
    table.ptMainTab {empty-cells:show; margin-top:5px }\
    table.ptMainTab tr td a {color:inherit }\
    table.ptMainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.ptMainTab tr td.spacer {padding: 0px 4px;}\
    table.ptMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed;}\
    table.ptMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#1e66bd; color:white; border-color:black;}\
    tr.ptPopTop td { background-color:#dde; border:none; height: 21px;  padding:0px; }\
    tr.ptretry_ptPopTop td { background-color:#a00; color:#fff; border:none; height: 21px; padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px;}\
    .CPopup  {border:3px ridge #666} )';
      
  logit ("* KOCpowerTools v"+ Version +" Loaded");
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
//logit ( 'Options.ptWinPos: '+ inspect (Options.ptWinPos, 5, 1)); 
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y+c.height;
    saveOptions ();
  }
  mainPop = new CPopup ('ptmain', Options.ptWinPos.x, Options.ptWinPos.y, 749,700, Options.ptWinDrag, 
      function (){
        tabManager.hideTab();
        Options.ptWinIsOpen=false; 
        saveOptions();
      });
  
  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  //new bit by cm
  FoodAlerts.init();
  //end of new bit
  TowerAlerts.init();
  MessageCounts.init ();
  MapDistanceFix.init ();
  WarnZeroAttack.init ();
  AllianceReports.init ();
  messageNav.init();
  PageNavigator.init ();
  tabManager.init (mainPop.getMainDiv());
  attackTargetPicker.init();
  AudioAlert.init();
  GMTclock.init ();
  
  if (Options.ptWinIsOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  
  if (Options.fixTower)
    TowerAlerts.enableFixTarget(true);
  if (Options.fixTower2)
    TowerAlerts.enableFixFalseReports(true);

  TowerAlerts.setPostToChatOptions(Options.alertConfig);
  
  AddMainTabLink('TNA', eventHideShow, mouseMainTab);
}


function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  saveOptions();
}


var knightRoles = [
  ['Foreman', 'politics', 'Pol'],
  ['Marshall', 'combat', 'Com'],
  ['Alchemystic', 'intelligence', 'Int'],
  ['Steward', 'resourcefulness', 'Res'],
];

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








































































































































/*************** CRESTS TAB *********************/
Tabs.Crests = {
  cont : null,
  state : null,

  init : function (div){
    var t = Tabs.Crests;
    t.cont = div;
	t.cont.innerHTML = '<DIV id=crestsContent style="maxheight:665px; height:665px; overflow-y:auto">';
    return t.cont;
  },
  

  getContent : function (){
    var t = Tabs.Crests;
    return t.cont;
  },

  hide : function (){
    var t = Tabs.Crests;
  },

  show : function (){ 
    var t = Tabs.Crests;
	
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
     text-align:center;\
  }\
</style>\
\
<TABLE CLASS="MYTABLE" CELLPADDING=0 CELLSPACING=0>\
    <CAPTION CLASS="MYTABLE">City Requirements</CAPTION>\
    \
    <THEAD >\
      <TR CLASS="MYTABLE">\
        <TH CLASS="MYTABLE">City</TH>\
        <TH CLASS="MYTABLE">Requirement 1</TH>\
        <TH CLASS="MYTABLE">Requirement 2</TH>\
        <TH CLASS="MYTABLE">Requirement 3</TH>\
      </TR>\
    </THEAD>\
    \
    <TBODY>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE">City 2</TD>\
        <TD CLASS="MYTABLE">Level 7 ('+Seed.player.title+')</TD>\
        <TD CLASS="MYTABLE">10 Friends ('+Seed.appFriends.length+')</TD>\
        <TD CLASS="MYTABLE">&nbsp;</TD>\
      </TR>\
   \
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE">City 3</TD>\
        <TD CLASS="MYTABLE">4 Bors ('+bor+')</TD>\
        <TD CLASS="MYTABLE">2 Ectors ('+ector+')</TD>\
        <TD CLASS="MYTABLE">1 Kay ('+kay+')</TD>\
      </TR>\
   \
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE">City 4</TD>\
        <TD CLASS="MYTABLE">4 Kays ('+kay+')</TD>\
        <TD CLASS="MYTABLE">3 Bediveres ('+bedivere+')</TD>\
        <TD CLASS="MYTABLE">1 Gawain ('+gawain+')</TD>\
      </TR>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE">City 5</TD>\
        <TD CLASS="MYTABLE">4 Percivals ('+percival+')</TD>\
        <TD CLASS="MYTABLE">3 Galahads ('+galahad+')</TD>\
        <TD CLASS="MYTABLE">2 Lancelots ('+lancelot+')</TD>\
      </TR>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE">City 6</TD>\
        <TD CLASS="MYTABLE">4 Aurthers ('+arthur+')</TD>\
        <TD CLASS="MYTABLE">3 Morganas ('+morgana+')</TD>\
        <TD CLASS="MYTABLE">2 Mordreds ('+mordred+')</TD>\
      </TR>\
    </TBODY>\
  </TABLE>\
\
          <BR><DIV id=crestsDiv style="background-color:#fffff0; maxwidth:675; max-height:430px; height:430px; overflow-y:auto;"></div>';
     	GM_log(m);

	   t.cont.innerHTML = m;
      t.state = 1;
    }
  },

}



/*************** WILDS TAB *********************/

var wildNames = {
   0: 'Bog',
  10: 'Grassland',
  11: 'Lake',
  20: 'Woods',
  30: 'Hills',
  40: 'Mountain',
  50: 'Plain',
};

var mercNames = {
  0: 'None',
  1: 'Novice',
  2: 'Intermediate',
  3: 'Veteran',
};

Tabs.Wilds = {
  tabOrder : 35,

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
  },
  
  show : function (){
    var t = Tabs.Wilds;
    clearTimeout (t.upGoldTimer);
    
    m = '<CENTER>'+ strButton20('RESET', 'id=ptwref') +'</center><TABLE cellspacing=0 cellpadding=0 class=ptTabPad align=center>';
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var cWilds = Seed.wilderness['city'+city.id];
      t.wildList[c] = []; 
      var castle = parseInt(Seed.buildings['city'+ city.id].pos0[1]);
      var totw = 0;
      if (matTypeof(cWilds)=='object'){
        for (var k in cWilds)
          ++totw;
      }       
      m += '<TR><TD colspan=20><DIV class=ptstat><TABLE class=ptNoPad width=100%><TR><TD width=100></td><TD width=90% align=center>'+ city.name 
        +' &nbsp; ('+ city.x +','+ city.y +')</td><TD width=100 align=right>Wilds: '+ totw +' of '+ castle +' &nbsp; </TD></tr></table></div></td></tr>';
      var row = 0;  
      var sortem = [];

      if (matTypeof(cWilds) != 'array') {
        m += '<TR style="background-color:white; font-weight:bold;" align=right><TD align=left>Wild Type</td><TD></td><TD align=left>Coords</td><TD>Traps</td><TD align=left>Mercenaries</td>\
         <TD width=15></td><TD colspan=3 class=entry>'+ htmlTitleLine(' CHANGE DEFENSES ') +'</td></tr>';
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
          if (!wildDef)
            wildDef = {fort60Count:0, mercLevel:0};
          var maxTraps = parseInt(wild.tileLevel)*100;
          var maxBuild = maxTraps - parseInt(wildDef.fort60Count);
          t.wildList[c][i] = [wild.tileId, maxBuild];          
          m += '<TR align=right'+ (row++%2?'':' class=ptOddrow') +'><TD align=left>'+ wildNames[wild.tileType] +'</td>\
            <TD>'+ wild.tileLevel +'</td><TD align=center><A onclick="ptGotoMap('+ wild.xCoord +','+ wild.yCoord +')">'+ wild.xCoord +','+ wild.yCoord +'</a></td>\
            <TD align=right><B>'+ wildDef.fort60Count +'</b></td><TD align=center><B>'+ mercNames[wildDef.mercLevel] +'</b></td>\
            <TD></td><TD align=left class=ptentry><B>Build Traps:</b> <INPUT onchange="ptInpWildTraps(this)" id=ptwt_'+ c +'_'+ i 
              + (maxBuild==0?' DISABLED ':'')+' style="margin:0px; padding:0px" type=text size=3 maxlength=4></td>'
          if (wildDef.fort60Count < maxTraps)
            m += '<TD class=ptentry style="padding:0px">'+ strButton14('Max', 'id=ptwx_'+ c +'_'+ i +' onclick="ptButMaxTraps(this)"') +'</td>';
          else
            m += '<TD class=ptentry></td>';
          m += '<TD class=ptentry> &nbsp; &nbsp; <B>Mercs:</b> ' + htmlSelector(mercNames, wildDef.mercLevel, 'id=ptwm_'+ c +'_'+ i) +' &nbsp; &nbsp; </td></tr>';
        }
        m += '<TR><TD colspan=6></td><TD class=ptentry align=center colspan=3><TABLE><TR><TD width=40% align=left>Cost: <SPAN id=ptwgc_'+ c +'>0</span></td>\
            <TD width=10%>'+ strButton20("SET DEFENSES", 'onclick="ptButWildSet('+ c +')"') +'<TD width=40% align=right>Gold: <SPAN id=ptwgt_'+ c +'>0</span></td></td></tr></table></td></tr>';
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
          <DIV class=ptstat>Setting Wilderness Defenses</div>\
          <DIV id=ptWildBuildDiv class=ptDiv style="padding:10px; height:225px; max-height:225px; overflow-y:auto"></div>\
          </td></tr><TR><TD align=center>'+ strButton20('CANCEL', 'id=ptWildCancel') +'</td></tr></table>';
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
        div.innerHTML += 'Done.<BR>';
      document.getElementById('ptWildCancel').firstChild.innerHTML = 'CLOSE'; 
      return;
    }
    if (div.innerHTML != '')
      div.innerHTML += 'Done.<BR>';
    var wild = Seed.wilderness['city'+ t.buildList.cityId]['t'+what[1]];
    if (what[0] == 'T'){
      div.innerHTML += 'Building '+ what[2] +' traps for '+ Cities.byID[t.buildList.cityId].name +'\'s wilderness at '+ wild.xCoord +','+ wild.yCoord +' ... ';
      t.postBuyTraps (t.buildList.cityId, what[1], what[2], t.processQue);
    } else {
      div.innerHTML += 'Setting Mercenaries to '+ mercNames[what[2]] +' for '+ Cities.byID[t.buildList.cityId].name +'\'s wilderness at '+ wild.xCoord +','+ wild.yCoord +' ... ';
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
        if (rslt.ok)
          Seed.wildDef["t"+ tid].fort60Count = parseInt(Seed.wildDef["t"+ tid].fort60Count) + parseInt(quant);
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
        if (rslt.ok)
          Seed.wildDef["t"+ tid].mercLevel = newLevel;
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
Tabs.Knights = {
  tabOrder : 30,
  cont : null,
  displayTimer : null,

  init : function (div){
    var t = Tabs.Knights;
    t.cont = div;
    unsafeWindow.ptAssignSkill = t.clickedAssignPoints;
    t.cont.innerHTML = '<STYLE>table.ptTabPad tr.ptwpad {background-color:#ffffff; padding-left:15px}</style>\
       <DIV id=ptknightdiv style="max-height:660px; height:660px; overflow-y:auto">';
  },

  hide : function (){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);
  },

  show : function (){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);
    
    function _dispKnight (roleId, knight){
      var rid = roleId;
      if (roleId==null)
        rid = 1;
      var sty='';  
      if (row++ % 2)
        sty = 'class=ptOddrow ';        
      m = '<TR '+ sty +'valign=top align=right><TD><B>'+ (roleId==null ? '':knightRoles[rid][0]) +'</b></td><TD align=left>';
      if (knight == null) {
        m += '--------</td><TD colspan=4></td><TD class=ptentry colspan=5></td><TD colspan=2></td></tr>';
      } else {
        var level = parseInt(Math.sqrt(parseInt(knight.experience) / 75)) + 1;
        var unpoints = level - parseInt(knight.skillPointsApplied);
        var salary = (parseInt(knight.skillPointsApplied) + 1) * 20;
        totSalary += salary;
        var ass = '';
        if (knight.knightStatus == 10){
          ass = '<TD class=ptentry align=left colspan=4>Marching</td>';
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
        m += knight.knightName + '</td><TD>'+ skills[0] +'</td><TD>'+ skills[1] +'</td><TD>'+ skills[2] +'</td><TD>' + skills[3]
          +'</td><TD class=ptentry>'+ unpoints +'</td>'+ ass +'<TD>'+ addCommas(salary) 
          +'</td><TD>'+ level +'</td></tr>';
      }
      return m;
    }          
    
    var totSalary = 0;
    var m = '<TABLE cellspacing=0 align=center class=ptTabPad><TBODY>';
    for (var c=0; c<Cities.numCities; c++) {
      var cid = Cities.cities[c].id;
      m += '<TR><TD colspan=13><DIV class=ptstat>'+ Cities.cities[c].name +'</div></td></tr>\
          <TR class=ptwpad style="font-weight:bold" align=right><TD width=70>Role</td><TD width=160 align=center>Name</td><TD width=26>Pol</td><TD width=26>Com</td>\
          <TD width=26>Int</td><TD width=26>Res</td><TD width=90 align=center colspan=5>--- Unassigned ---</td><TD width=40 align=right> Salary </td><TD width=35>Level</td></tr>';
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
      m += '<TR align=right><TD colspan=11><B>Total Salary:</b></td><TD>'+ addCommas(totSalary) +'</td></tr>';        
    }
    document.getElementById('ptknightdiv').innerHTML = m +'</tbody></table></div>';
    t.displayTimer = setTimeout (t.show, 10000);
  },


  clickedAssignPoints : function (e, cid, kid, rid){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);
      
    var knight = Seed.knights['city'+cid]['knt'+kid];
    if (knight.knightStatus == 10){
      var row = e.parentNode.parentNode;
      row.childNodes[7].innerHTML = 'Marching';
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
    div.innerHTML = 'Assigning '+ unassigned +' skill points to '+ knightRoles[rid][1] +' ... ';
    t.postSkillPoints (cid, kid, sk[0], sk[1], sk[2], sk[3], function (r){t.postDone(r, div)});  
  },
  
  postDone : function (rslt, div){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);
    if (rslt.ok){
      div.innerHTML += '<B>Done.</b>';
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
  old_modal_messages : unsafeWindow.modal_messages,
  old_modal_messages_send : unsafeWindow.modal_messages_send,

  init : function (){
    alterUwFunction ('modal_messages', [[/}\s*$/, 'setTimeout(messageNav_hook,0); }']]);
    alterUwFunction ('modal_messages_send', [[/{\s*var params/i, '{\nif (modal_messages_send_hook()) return;\nvar params']]);
    unsafeWindow.messageNav_hook = messageNav.hook;
    unsafeWindow.modal_messages_send_hook = messageNav.msgSendHook;
  },

  enable : function (tf){
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

  hook : function (){
    var div = document.getElementById('modal_msg_view_actions');
    var but = makeButton20('Forward');
    div.appendChild (but);
    but.addEventListener ('click', messageNav.eventForward, false);
    div = document.getElementById('modal_msg_write_to').parentNode;
    div.innerHTML = '<TABLE><TR><TD class=xtab><b>To:</b> <INPUT type=text id=modal_msg_write_to></td><TD class=xtab><SPAN id=ptfwdbut></span></td></tr></table>';
    var button = makeButton20('All Officers');
    document.getElementById('ptfwdbut').appendChild (button);
    button.addEventListener ('click', function (){document.getElementById("modal_msg_write_to").value = "<officers>"}, false);
  },

  eventForward : function (){
    document.getElementById('modal_msg_write_subj').value = "fwd: " + document.getElementById('modal_msg_view_subj').innerHTML.toString().stripTags();
    document.getElementById('modal_msg_write_to').value = '';
    var from = document.getElementById('modal_msg_view_from').children[0].innerHTML;
    var body = document.getElementById('modal_msg_view_body').innerHTML.replace(/\n/g, '').replace(/<br>/gi, '\n').stripTags().replace (/back$/i, '');
    document.getElementById('modal_msg_write_txt').value = '[Original message from '+ from +' follows:]\n'+ body;
    unsafeWindow.modal_messages_compose();
  },

  msgSendHook : function (){
    var to = document.getElementById("modal_msg_write_to").value.trim();
    if (to.toLowerCase() != '<officers>' || getMyAlliance()[0]==0)
      return false;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.toIds = getMyAlliance()[0];
    params.subject = document.getElementById("modal_msg_write_subj").value +' [Sent to all officers]';
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

var attackTargetPicker = {
  init : function (){
    alterUwFunction ('modal_attack', [['attack_checkOverMarch()', 'attack_checkOverMarch(); setTimeout(attackTargetPicker_hook,0)']]);
    unsafeWindow.attackTargetPicker_hook = attackTargetPicker.hook;
  },

  hook : function (){
    //var div = document.getElementById('modal_attack_target_numflag');
    var div = document.getElementById('modal_attack_target_coords');
    div.parentNode.innerHTML += '<br /> &nbsp; <DIV id=modal_attack_citybuts style="text-align:center"></div>';
    new CdispCityPicker ('ptatp', document.getElementById('modal_attack_citybuts'), false, attackTargetPicker.evtButtonClicked);
    var cityIdx = Cities.byID[unsafeWindow.currentcityid].idx;
    thisCityBut = document.getElementById('ptatp_'+ cityIdx);
    thisCityBut.style.opacity = '0.5';
    thisCityBut.disabled = true;
  },

  evtButtonClicked : function (city){
    document.getElementById('modal_attack_target_coords_x').value = city.x;
    document.getElementById('modal_attack_target_coords_y').value = city.y;
  },
};


var AllianceReports = {
  checkPeriod : 300,
  allianceNames : [],
  saveArfunc : unsafeWindow.allianceReports,

  init : function (){
    t = AllianceReports;
    t.enable (Options.enhanceARpts);
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
            .msgviewtable tbody .myHostile div {font-weight:600; color:#600}\
            .msgviewtable tbody .myGray div {color:#666}\
            .msgviewtable tbody .myWarn div {font-weight:600; color:#442200}\
            </style>");
      msg.push("<div class='modal_msg_reports'>");
      var rptkeys = unsafeWindow.Object.keys(ar);
      if (matTypeof(ar) != 'array') {
        if (Options.allowAlterAR)
          msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        else
          msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        msg.push("<thead><tr><td width=105>Date</td><td width=40>Type</td><td width=150>Attacker</td><td>Target</td><td>View</td></tr></thead><tbody>");
        for (var i = 0; i < rptkeys.length; i++) {
          var rpt = ar[rptkeys[i]];
          var colClass = '"myCol"';
          rpt.side0AllianceId = parseInt(rpt.side0AllianceId);
          var targetDiplomacy = getDiplomacy (rpt.side0AllianceId);
          if (rpt.side1AllianceId != myAllianceId){
            colClass = '"myCol myHostile"';
          } else {
            if (parseInt(rpt.side0TileType) < 51){          // if wild
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
          else if (rpt.marchType == 4)

            msg.push (unsafeWindow.g_js_strings.commonstr.attack);
          else 
	    msg.push (unsafeWindow.g_js_strings.commonstr.reinforce);

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

          // 'view report' link ...
          if (Options.allowAlterAR)
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' modal_alliance_report_view(\"");   // ONCLICK ???
          else
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' $(\"modal_alliance_reports_tabledivNKA\").id=\"modal_alliance_reports_tablediv\"; modal_alliance_report_view(\"");   // ONCLICK ???
//          msg.push(rpt.marchReportId);
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

}   // end AllianceReports singleton


//line 1070 was tower alerts been nusdged down and new bit added by cm
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
        row[i] = rp[1] - usage;
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
          var msg = '';
          if (timeLeft<0){
           }
          else if (timeLeft<(Options.foodWarnHours*3600)) {
                msg += 'My city ' + Cities.cities[i].name.substring(0,10) + ' (' +
                       Cities.cities[i].x +','+ Cities.cities[i].y + ')';
                msg += ' is low on food. Remaining: '+addCommasWhole(foodleft)+' ('+timestrShort(timeLeft)+') Upkeep: '+addCommas(usage);
                sendChat ("/a " + msg);
          }
      }  
  f.minuteTimer = setTimeout (f.e_eachMinute, 600000);
  },  
}

//end of new bit
/************************ Tower Alerts ************************/
var TowerAlerts = {
  viewImpendingFunc : null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  towerMarches : {},    // track all marches that have been posted to alliance chat
  
  init : function (){
    var t = TowerAlerts; 
    var s = GM_getValue ('towerMarches_'+GetServerId());
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
        target = city.name + ', <B>WILD '+ m +'</b>';
      }
      div.childNodes[0].innerHTML = '<B>Target: </b>'+ target;
    }
    if (!isFalse){
      var d = document.createElement ('div');
      d.innerHTML = '<BR><TABLE><TR><TD><a id=towerPostToChat class=button20><span>Post to Alliance Chat</span></a></td></tr></table>';
      div.appendChild (d);
      document.getElementById('towerPostToChat').addEventListener('click', function (){t.e_buttonPostToChat(atkinc)}, false);
    }
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

  setPostToChatOptions : function (obj){
    var t = TowerAlerts;
    t.postToChatOptions = obj;
    clearTimeout(t.secondTimer);
	if (obj.aChat && ENABLE_ALERT_TO_CHAT)
      t.e_eachSecond();
  },

  

  addTowerMarch : function (m){
    var t = TowerAlerts;
    var now = unixTime();
    for (k in t.towerMarches){
      if (t.towerMarches[k].arrival < now)
        delete t.towerMarches[k];
    }
    t.towerMarches['m'+m.mid] = {added:now, arrival:parseIntNan(m.arrivalTime) };
    GM_setValue ('towerMarches_'+GetServerId(), JSON2.stringify(t.towerMarches) );
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

  
  e_buttonPostToChat : function (march){
    var t = TowerAlerts;
    t.postToChat (march, true);
    unsafeWindow.Modal.hideModal();
  },
  
  postToChat : function (m, force){
    var t = TowerAlerts;
    
    if (DEBUG_TRACE) logit ("checkTower(): INCOMING at "+ unixTime()  +": \n"+ inspect (m, 8, 1));
    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv ("Incoming!<BR><PRE style='margin:0px;'>" + inspect (m, 8, 1) +'</pre>');
    if (m.marchType == 3){
      if (!t.postToChatOptions.scouting && !force)
        return;
      atkType = 'scouted';
    } else if (m.marchType == 4){
      atkType = 'attacked';
    } else {
      return;
    }
    var target, atkType, who, attackermight, allianceId;
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      target = 'city at '+ city.x +','+ city.y;
    else {
      if (!t.postToChatOptions.wilds && !force)
        return;
      target = 'wilderness';
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' at '+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
          break;
        }
      }
    }
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
				who = 'Unknown';
			}
		}
	var diplomacy = getDiplomacy(allianceId);
  
	if(t.postToChatOptions.includemight)
	  who += '-'+ addCommas(attackermight);
    if (m.fromXCoord)
      who += ' at '+ m.fromXCoord +','+ m.fromYCoord ;
	if (t.postToChatOptions.includealliance)
	  var alliance = 'of '+Seed.allianceNames[allianceId]+'('+diplomacy+')';
	 else
		alliance = '';
		
		
    var msg = '';
    if (!force)
      msg = t.postToChatOptions.aPrefix +' ';
    msg += 'My '+ target +' is being '+ atkType  +' by '+ who +' ' +alliance+'. Incoming Troops (arriving in '+
        unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';
    var totTroops = 0;
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      msg += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
      totTroops += m.unts[k];
    }
    if ((totTroops < t.postToChatOptions.minTroops) && !force)
      return;
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
        msg += ' My embassy has '+ availSlots +' of '+ emb.maxLevel +' slots available.';
      }
    }
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv (msg);
    if (SEND_ALERT_AS_WHISPER)
      sendChat ("/"+ Seed.player.name +' '+ msg);    // Whisper to myself
    else
      sendChat ("/a "+  msg);                        // Alliance chat
	if(t.postToChatOptions.sound)
		AudioAlert.sound(true);
  },
  
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
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}


Tabs.AllianceList = {
  tabOrder : 25,
  tabLabel : 'Players',
  cont : null,
  dat : [],

  init : function (div){
    var t = Tabs.AllianceList;
    t.cont = div;
    unsafeWindow.PTgetMembers = t.eventGetMembers;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpl = t.clickedPlayerLeaderboard;
	unsafeWindow.PCpo = t.clickedPlayerCheckOnline;
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;
	unsafeWindow.PCalClickPrev = t.eventListPrev;
    unsafeWindow.PCalClickNext = t.eventListNext;
    if (getMyAlliance()[0] == 0) {
      t.cont.innerHTML = '<BR><BR><CENTER>You need to be in an alliance to use this feature.</center>';
      t.state = 1;
      return;
    }
    var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\
        <TR><TD class=xtab align=right></td><TD class=xtab>Enter all or part of a player name: &nbsp;</td>\
          <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Find Player" /></td>\
          <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
        <TR><TD class=xtab>OR: </td><TD class=xtab> Enter all or part of an alliance name: &nbsp;</td>\
          <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Find Alliance" /></td>\
          <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
		<TR><TD class=xtab>OR: </td><TD class=xtab align=right> List alliances: &nbsp;</td>\
		    <TD class=xtab><INPUT align=left id=idMyAllSubmit type=submit value="My Alliance"/>\
            <INPUT align=left id=allListSubmit type=submit value="List all" /></td></tr>\
        </table><span style="vertical-align:middle;" id=altInput></span></div>\
        <SPAN id=allListOut></span>';
    t.cont.innerHTML = m;
    document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
    document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
    document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
    document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
	document.getElementById('allListSubmit').addEventListener ('click', t.eventListSubmit, false);
	document.getElementById('idMyAllSubmit').addEventListener ('click', t.showMyAlliance, false);
	t.curPage = 0;
	t.MaxPage = -1;
	t.state = 1;
  },

  hide : function (){
  },

  show : function (){
  },

  pName : '',
  eventPlayerSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptplayErr').innerHTML='';
    var name = document.getElementById('allPlayName').value;
    t.pName = name;
    if (name.length < 3){
      document.getElementById('ptplayErr').innerHTML = 'Enter at least 3 characters';
      return;
    }
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    t.fetchPlayerList (name, t.eventGotPlayerList);
  },

  eventGotPlayerList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>Showing players matching <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=95% align=center class=ptTab cellspacing=0><TR style="font-weight:bold"><TD>Name</td>\
      <TD align=right>Might</td><TD> &nbsp;Facebook &nbsp; </td><TD width=75%>Lookup </td></tr>';
    var row=0;
    var cl='';
    for (k in rslt.matchedUsers){
      var u = rslt.matchedUsers[k];
      if (++row % 2)
        cl = 'class=ptOddrow ';
      else
        cl = '';
      m += '<TR '+ cl +'valign=top><TD>'+ u.genderAndName +'</td><TD align=right>'+ addCommasInt(u.might) +'</td>\
          <TD align=center><A target="_tab" href="http://www.facebook.com/profile.php?id='+ u.fbuid +'">profile</a></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A>details</a> &nbsp; <BR></span><SPAN onclick="PTpl(this, \''+ u.userId +'\')"><A>leaderboard</a></span> &nbsp; <BR></span><SPAN onclick="PCpo(this, \''+ u.userId +'\')"><A>onlinestatus</a></span>&nbsp; <BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A>last Login</a></span></td></tr>';
    }
    m += '</table></div>';
    document.getElementById('allListOut').innerHTML = m;
  },
  
  clickedPlayerDetail : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching details ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching leaderboard info ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },
  
  clickedPlayerCheckOnline : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching online status ...";
    t.fetchPlayerStatus (uid, function (r) {t.gotPlayerStatus(r, span, uid)});
  },

  clickedPlayerGetLastLogin : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching login date ...";
    t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
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
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Leaderboard: </b></td><TD colspan=2> Might: '+ p.might  +' &nbsp; Alliance: '+ an +'</td></tr>'; 
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = ' &nbsp; &nbsp; created: ' + c.dateCreated.substr(0,10);
      m += '<TR><TD align=right><B>City #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName 
      +' (<a onclick="ptGotoMap ('+ c.xCoord +',' +c.yCoord+ ')">'+ c.xCoord +','+ c.yCoord +'</a>)</td><TD width=75%> &nbsp; level: '
        + c.tileLevel +' &nbsp; &nbsp; status: '+ cityStatusString (c.cityStatus) + created +'</td></tr>';
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
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Details:</b> &nbsp; </td><TD>Alliance: '+ a +' &nbsp; Cities: '
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
      m = '<span style="color:green"><b>online!</b></span>';
    } else {
       m = '<span style="color:red"><b>may not be online</b></span>';
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
      m = '<span style="color:blue">Last login: '+lastLogin+'</span>';
    } else {
       m = '<span style="color:red">No login date found: '+lastLogin+'</span>';
    }  
    span.innerHTML = m + '';
  },
  
  aName : '',
  eventSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = 'Enter at least 3 characters';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },

  eventGotAllianceList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>Showing alliances matching <B>"'+ t.aName +'"</b></div>\
    <TABLE><TR style="font-weight:bold"><TD class=xtab>Alliance Name</td><TD class=xtab>Rank</td><TD class=xtab>Members</td>\
        <TD align=right class=xtab>Might</td><TD class=xtab>Diplomacy</td><TD class=xtab></td></tr>';
    for (k in rslt.alliancesMatched){
      var all = rslt.alliancesMatched[k];
      var dip = '';
      if (all.relation && all.relation==1)
        dip = 'Friendly';
      else if (all.relation && all.relation==2)
        dip = 'Hostile';
      m += '<TR><TD class=xtab>'+ all.allianceName +'</td><TD align=right class=xtab>'+ all.ranking +'</td><TD align=right class=xtab>'+ all.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(all.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ all.allianceId +')">View Members</a></td></tr>';
    }
    document.getElementById('allListOut').innerHTML = m;
  },


  eventGotMemberList : function (rslt){
    var t = Tabs.AllianceList;
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
               parseInt(p.cities[c].xCoord), parseInt(p.cities[c].yCoord), p.cities[c].cityName, 0, p.userId]);
        }
      }
    }
    t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
    t.displayMembers (rslt.allianceName, numPlayers);
  },

  //New Allylist
  eventListSubmit : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    if (myA[0]!=0  ) {
       t.curPage=1;
       t.fetchOtherAllianceInfo ( 1, t.eventGotOtherAlliancePage);
    }
    else {
       document.getElementById('allListOut').innerHTML = 'You must be an alliance member to use this feature.';
    }
  },


  showMyAlliance : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    if (myA[0]!=0  ) {
       t.eventGetMembers(myA[0]);
    }
    else {
       document.getElementById('allListOut').innerHTML = 'You must be an alliance member to use this feature.';
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
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
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
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  gotoPage : function (){
    var t = Tabs.AllianceList;
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
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  eventGotOtherAlliancePage : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.MaxPage=rslt.noOfPages;

    var m = '<div style="overflow:auto; height:556px;width:564px;"><TABLE><thead><TR style="font-weight:bold"> \
        <th class=xtab>Alliance Name</th><th class=xtab>Rank</th><th class=xtab>Members</th>\
        <th align=right class=xtab>Might</th><th class=xtab>Diplomacy</th><th class=xtab></th></tr></thead><tbody>';
    document.getElementById('allListOut').innerHTML = m;

    for (var i=0; i<rslt.otherAlliances.length; i++) {
      var alliance = rslt.otherAlliances[i];
      var dip = '';
      dip = getDiplomacy(alliance.allianceId);

      m += '<TR class="'+ dip + '"><TD class=xtab>' + alliance.name +'</td><TD align=right class=xtab>'+ alliance.ranking +'</td><TD align=right class=xtab>'+ alliance.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(alliance.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ alliance.allianceId +')">View Members</a></td></tr>';
    }
    m += '</tbody></TABLE><div style="font-weight:bold"; height:20px;width:560px; ><span> ';
	if  (t.curPage > 1) {
		m +=' &nbsp;<a onclick="PCalClickPrev(-1)"> [|<] </a> &nbsp;<a onclick="PCalClickPrev(1)"> [<] </a>&nbsp; &nbsp;';
	}
	if (t.curPage < t.MaxPage) {
		m += '<a onclick="PCalClickNext(1)"> [>] </a> &nbsp;<a onclick="PCalClickNext(9999)"> [>|] </a> &nbsp; &nbsp;';
	} 
	
    m += ' &nbsp; page <INPUT align=right id=idPageNum type="text" size=4 value='+ t.curPage + ' /> of '+t.MaxPage;

	m += '</span></div>';
    m += '</div>';
    document.getElementById('allListOut').innerHTML = m;
	document.getElementById('idPageNum').addEventListener ('change', t.gotoPage, false);
	//document.getElementById('idPageNum').value = t.curPage;
 },

  showCurrentPage : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();

    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    if (myA[0]!=0  ) {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }
    else {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }

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
		if (i % 2 == 0) {
    		 tabclass = 'xxtab';
    	} else {
    		tabclass = 'xxtab_even';
    	}
      m += '<TR style="max-height:30px"><TD class='+ tabclass +'>'+ t.dat[i][0] +'</td><TD align=right class='+ tabclass +'>'+ addCommasInt(t.dat[i][1]) +'</td><TD align=center class='+ tabclass +'>'+ t.dat[i][3] +'</td>\
            <TD class='+ tabclass +'>'+ officerId2String(t.dat[i][2]) +'</td><TD class='+ tabclass +'>'+ t.dat[i][7] +'</td><TD align=right class='+ tabclass +'>'+ t.dat[i][4] +'</td>\
            <TD align=center class='+ tabclass +'><DIV onclick="ptGotoMap('+ t.dat[i][5] +','+ t.dat[i][6] +')"><A>'+ t.dat[i][5] +','+ t.dat[i][6] +'</a></div></td>\
            <TD align=right class='+ tabclass +' style="padding-right:20px;">'+ t.dat[i][8].toFixed(2) +'</td>\
			<td class='+ tabclass +'><SPAN onclick="PCpo(this, \''+t.dat[i][9] +'\')"><A>onlinestatus</a></span></td>\
			<td class='+ tabclass +'><SPAN onclick="PCplo(this, \''+ t.dat[i][9] +'\')"><A>last Login</a></span><td> </tr>';
    }
    var tbody = document.getElementById('allBody');
    tbody.style.maxHeight = '';
    tbody.innerHTML = m;
    if (parseInt(tbody.clientHeight) > 475){
      tbody.style.height = '475px';
      tbody.style.maxHeight = '475px';
    }
//new CtableToText('tabAllMembers').toText();
  },


  setDistances : function (x, y){
    var t = Tabs.AllianceList;
    for (var i=0; i<t.dat.length; i++)
      t.dat[i][8] = distance (x, y, t.dat[i][5], t.dat[i][6]);
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
            .xxtab{background-color:none; padding-left:5px; padding-right:5px;}\
			.xxtab_even{background-color:#F6E3CE; padding-left:5px; padding-right:5px;} </style>\
      <DIV class=ptstat><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab> &nbsp; '+ allName +'</td>\
        <TD class=xtab width=80% align=center>Distance is from <SPAN id=distFrom>'+ Cities.cities[0].name +' ('+ Cities.cities[0].x +','+ Cities.cities[0].y +')</span></td><TD class=xtab align=right>'+ numPlayers +' players found &nbsp; </td></tr></table></div>\
      <TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD>\
      <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Player</div></a></td>\
        <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Might</a></div></td>\
        <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Cities</a></div></td>\
        <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Rank</a></div></td>\
        <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>City Name</a></div></td>\
        <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Lvl</a></div></td>\
        <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coords</a></div></td>\
        <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance</a></div></td>\
		<TD class=clickable><A><DIV>Status</a></div></td>\
		<TD class=clickable><A><DIV>Last Login</a></div></td></tr></thead>\
      <TBODY id=allBody style="background-color:#ffffff; overflow-y:auto; overflow-x:auto;"></tbody></table>\
      <DIV style="top:670px; left:0px; position:static; width:100%;  background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">\
        <TABLE width=100%><TR><TD class=xtab>Data is from the leaderboard and may be up to 24 hours old!</td>\
          <TD class=xtab align=right>Click on column headers to sort</td></tr></table></div>';
    document.getElementById('allListOut').innerHTML = m;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Show distance from: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> &nbsp; Or, choose city: <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';
    t.reDisp();
    new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
  },

  eventCoords : function (city, x, y){
    var t = Tabs.AllianceList;
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
    var t = Tabs.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
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
        notify (rslt);
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
        notify (rslt);
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



/*********************************** Test TAB ***********************************/

Tabs.Test = {
  tabOrder : 100,
  tabDisabled : !ENABLE_TEST_TAB,
  cont : null,

  init : function (div){
    var t = Tabs.Test;
    t.cont = div;
	var citySelect = '   <SELECT id=fakeCity>';
	    for (var c=0; c<Cities.numCities; c++) {
		 	 aCity = Cities.cities[c].name + ' ('+Cities.cities[c].x + ','+ Cities.cities[c].y+')';
	         citySelect += '<option value=\''+c+'\'>'+aCity+'</option>';
	    }
	    citySelect += '</select>';
    var m = '<TABLE><TR><TD align=right>Scout: </td><TD><INPUT type=checkbox id=fakeIsScout></td></tr>\
        <TR><TD align=right>Wild: </td><TD><INPUT type=checkbox id=fakeIsWild></td></tr>\
        <TR><TD align=right>False Report: </td><TD><INPUT type=checkbox disabled id=fakeFalse></td></tr>\
        <TR><TD align=right>Seconds: </td><TD><INPUT type=text size=4 value=300 id=fakeSeconds></td></tr>\
        <TR><TD align=right># of Supply: </td><TD><INPUT type=text size=6 value=0 id=fakeSupply></td></tr>\
		<TR><TD align=right># of Militia: </td><TD><INPUT type=text size=6 value=5000 id=fakeMilitia></td></tr>\
		<TR><TD align=right># of Scouts: </td><TD><INPUT type=text size=6 value=0 id=fakeScout></td></tr>\
		  <TR><TD align=right># of Pikes: </td><TD><INPUT type=text size=6 value=0 id=fakePike></td></tr>\
		  <TR><TD align=right># of Swords: </td><TD><INPUT type=text size=6 value=0 id=fakeSword></td></tr>\
		  <TR><TD align=right># of Archers: </td><TD><INPUT type=text size=6 value=0 id=fakeArcher></td></tr>\
		  <TR><TD align=right># of Calvary: </td><TD><INPUT type=text size=6 value=0 id=fakeCav></td></tr>\
		  <TR><TD align=right># of Heavy Cav: </td><TD><INPUT type=text size=6 value=0 id=fakeHeavy></td></tr>\
		  <TR><TD align=right># of Wagons: </td><TD><INPUT type=text size=6 value=0 id=fakeWagon></td></tr>\
		  <TR><TD align=right># of Ballistas: </td><TD><INPUT type=text size=6 value=0 id=fakeBallista></td></tr>\
		  <TR><TD align=right># of Battering Ram: </td><TD><INPUT type=text size=6 value=0 id=fakeRam></td></tr>\
		  <TR><TD align=right># of Catapults: </td><TD><INPUT type=text size=6 value=0 id=fakeCat></td></tr>\
		  <TR><TD align=right>Fake name to use: </td><TD><INPUT type=text size=13 value=THIS_IS_A_TEST id=fakeName></td></tr>\
		  <TR><TD align=right>Target city: </td><TD>'+citySelect+'</td></tr>\
        <TR><TD colspan=2 align=center><INPUT id=testSendMarch type=submit value="Fake Attack" \></td></tr></table>\
        <INPUT id=ptReloadKOC type=submit value="Reload KOC" \>\
        <BR><DIV id=testDiv style="background-color:#fffff0; maxwidth:675; max-height:430px; height:430px; overflow-y:auto;"></div>';
    t.cont.innerHTML = m;
    document.getElementById('testSendMarch').addEventListener ('click', t.clickFakeAttack, false);
    document.getElementById('ptReloadKOC').addEventListener ('click', t.reloadKOC, false);
    function xyNotify(city, x, y){
      var m = '[ Notified: '+ (city?city.name:'null') +', x='+ x +', y='+ y +' ]';
      document.getElementById('testNotify').innerHTML = m;
    }
  },

  hide : function (){
  },

  show : function (){
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
    var t = Tabs.Test;
    if (t.state != null)
      document.getElementById('testDiv').innerHTML = msg;
  },

  addDiv : function (msg){
    var t = Tabs.Test;
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
    var t = Tabs.Test;
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

/*********************************** Info tab ***********************************/

Tabs.Info = {
  tabOrder : 20,
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
        <DIV style="height:650px; max-height:650px; overflow-y:auto; overflow-x:hidden"><DIV class=ptstat>UNIT INFORMATION</div><TABLE align=center cellpadding=1 cellspacing=0>\
        <TR align=center><TD class=xtab></td><TD class=xtabHL colspan=5><B>COST TO BUILD</b></td><TD class=xtabHL colspan=7><B>STATS</b></td><TD class=xtabHL><B>Upkeep</b></td></tr>\
        <TR valign=bottom align=right><TD class=xtab></td><TD class=xtabHL>Food</td><TD class=xtabH>Wood</td><TD class=xtabH>Stone</td>\
        <TD class=xtabH>Ore</td><TD class=xtabH>Pop</td><TD class=xtabHL>Might</td><TD class=xtabH>Life</td><TD class=xtabH>Atk</td><TD class=xtabH>Def</td><TD class=xtabH>Speed</td><TD class=xtabH>Range</td><TD class=xtabH>Load</td>\
        <TD class=xtabHL>Food</td></tr>\
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
    m += '<BR><DIV class=ptstat>DISTANCE CALCULATOR</div><DIV class=ptentry><TABLE align=center cellpadding=1 cellspacing=0>\
      <TR><TD class=xtab align=right><B>First Location: </b></td><TD  class=xtab> X: <INPUT id=calcX type=text\> Y: <INPUT id=calcY type=text\> Or, choose city: <SPAN id=ptloc1></span></td></tr>\
      <TR><TD class=xtab><B>Second Location: </b></td><TD class=xtab> X: <INPUT id=calcX2 type=text\> Y: <INPUT id=calcY2 type=text\> Or, choose city: <SPAN id=ptloc2></span></td></tr></table>\
      <CENTER><DIV style="width:60%; font-size:14px; border: 1px solid; background-color:white; margin:20px 3px 3px 0px; padding:4px" id=ptdistout></div></div>\
      <BR><BR><DIV class=ptstat>PROVINCE MAP</div><DIV id=ptProvMap><IMG width=680 height=654 SRC="'+ URL_PROVINCE_MAP +'"></div></center></div>';
    t.cont.innerHTML = m;
    new CdispCityPicker ('ptloc1', document.getElementById('ptloc1'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX'), document.getElementById('calcY'));
    new CdispCityPicker ('ptloc2', document.getElementById('ptloc2'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX2'), document.getElementById('calcY2'));
    t.eventLocChanged(Cities.cities[0], Cities.cities[0].x, Cities.cities[0].y);      

    var eMap = document.getElementById('ptProvMap');
    for (var c=0; c<Cities.numCities; c++)      
      t.makeCityImg (c, eMap);
  },

  hide : function (){
  },

  show : function (){
  },

// var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};  
  makeCityImg : function (cityNum, eMap){
//logit ('makeCityImg: '+ cityNum);    
    var t = Tabs.Info;
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

Tabs.Options = {
  tabOrder : 40,
  cont : null,
  fixAvailable : {},

  init : function (div){
    var t = Tabs.Options;
    t.cont = div;
    
    try {      
      m = '<TABLE class=ptTab>\
        <TR><TD colspan=2><B>Config:</b></td></tr>\
        <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Enable window drag (move window by dragging top bar with mouse)</td></tr>\
        <TR><TD><INPUT id=ptEnableFoodWarn type=checkbox /></td><TD>Show \'food left\' in RED if food will run out in less than \
            <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> hours. THIS ALSO CONTROLS THE FOOD ALERT. CHECK THE BOX TO TURN ON.</td></tr>\
        <TR><TD colspan=2><P><B>KofC Features:</b></td></tr>\
        <TR><TD><INPUT id=togMsgCountFix type=checkbox /></td><TD>Show number of new messages separately from number of reports on Messages icon.</td></tr>';
		if (ENABLE_ALERT_TO_CHAT){
	 m += '<TR><TD><INPUT id=alertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Automatically post incoming attacks to alliance chat.</td></tr>\
          <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\
          <TR><TD align=right>Message Prefix: &nbsp; </td><TD><INPUT id=alertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
          <TR><TD align=right>Alert on scouting: &nbsp; </td><TD><INPUT id=alertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
          <TR><TD align=right>Alert on wild attack: &nbsp; </td><TD><INPUT id=alertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
          <TR><TD align=right>Post attacker alliance: &nbsp; </td><TD><INPUT id=alertAlliance type=checkbox '+ (Options.alertConfig.includealliance?'CHECKED ':'') +'/></td></tr>\
          <TR><TD align=right>Post attacker might: &nbsp; </td><TD><INPUT id=alertMight type=checkbox '+ (Options.alertConfig.includemight?'CHECKED ':'') +'/></td></tr>\
          <TR><TD align=right>Sound alert on impending: &nbsp; </td><TD><INPUT id=alertSound type=checkbox '+ (Options.alertConfig.sound?'CHECKED ':'') +'/></td></tr>\
          <TR><TD align=right>Minimum # of troops: &nbsp; </td><TD><INPUT id=alertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> &nbsp; &nbsp; <span id=alerterr></span></td></tr>\
          </table></td></tr>';
		  }
      m += '<TR><TD><INPUT id=togAllRpts type=checkbox /></td><TD>Enable enhanced Alliance Reports.</td></tr>\
        <TR><TD><INPUT id=togAllowAlter type=checkbox /></td><TD>Allow other scripts to change format of Alliance Reports.</td></tr>\
        <TR><TD><INPUT id=togEnhanceMsging type=checkbox /></td><TD>Enable enhanced messaging ("forward" and "all officers" buttons).</td></tr>\
        <TR><TD><INPUT id=togPageNav type=checkbox /></td><TD>Enhanced page navigation for messages and reports. <SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>\
        <TR><TD><INPUT id=togWarnZero type=checkbox /></td><TD>Warn if attempting to march to location 0,0. <SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>\
        <TR><TD><INPUT id=togGmtClock type=checkbox /></td><TD>Enable GMT clock next to "Camelot Time" <SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>\
        <TR><TD colspan=2><BR><BR><B>KofC Bug Fixes:</b></td></tr>\
        <TR><TD><INPUT id=togTowerFix type=checkbox /></td><TD>Fix tower report to show exact target (city, wild or invalid)</td></tr>\
        <TR><TD><INPUT id=togMapDistFix type=checkbox /></td><TD>Fix map to show distances from currently selected city, instead of always the first city.</td></tr>\
        <TR><TD><INPUT id=togTowerFix2 type=checkbox /></td><TD>Fix false attack alerts created from scouting missions.</td></tr>\
        </table><BR><BR><HR>Note that if a checkbox is greyed out there has probably been a change of KofC\'s code, rendering the option inoperable.';
      t.cont.innerHTML = m;
      
	  if (ENABLE_ALERT_TO_CHAT){
        document.getElementById('alertEnable').addEventListener ('change', e_alertOptChanged, false);
        document.getElementById('alertPrefix').addEventListener ('change', e_alertOptChanged, false);
        document.getElementById('alertScout').addEventListener ('change', e_alertOptChanged, false);
        document.getElementById('alertWild').addEventListener ('change', e_alertOptChanged, false);
        document.getElementById('alertTroops').addEventListener ('change', e_alertOptChanged, false);
        document.getElementById('alertAlliance').addEventListener ('change', e_alertOptChanged, false);
        document.getElementById('alertMight').addEventListener ('change', e_alertOptChanged, false);
        document.getElementById('alertSound').addEventListener ('change', e_alertOptChanged, false);
      }
      t.togOpt ('ptEnableFoodWarn', 'enableFoodWarn');
      t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
      t.togOpt ('togAllowAlter', 'allowAlterAR');
      t.togOpt ('togTowerFix', 'fixTower', TowerAlerts.enableFixTarget, TowerAlerts.isFixTargetAvailable);
      t.togOpt ('togTowerFix2', 'fixTower2', TowerAlerts.enableFixFalseReports, TowerAlerts.isFixFalseReportsAvailable);
      t.togOpt ('togMsgCountFix', 'fixMsgCount', MessageCounts.enable, MessageCounts.isAvailable);
      t.togOpt ('togMapDistFix', 'fixMapDistance', MapDistanceFix.enable, MapDistanceFix.isAvailable);
      t.togOpt ('togWarnZero', 'fixWarnZero', WarnZeroAttack.enable, WarnZeroAttack.isAvailable);
      t.togOpt ('togPageNav', 'fixPageNav', PageNavigator.enable, PageNavigator.isAvailable);
      t.togOpt ('togGmtClock', 'gmtClock', GMTclock.setEnable);
                  
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
	
	function e_alertOptChanged (){
      Options.alertConfig.aChat = document.getElementById('alertEnable').checked;
      Options.alertConfig.aPrefix=document.getElementById('alertPrefix').value;      
      Options.alertConfig.scouting=document.getElementById('alertScout').checked;      
      Options.alertConfig.wilds=document.getElementById('alertWild').checked;
      Options.alertConfig.includealliance=document.getElementById('alertAlliance').checked;
      Options.alertConfig.includemight=document.getElementById('alertMight').checked;
      Options.alertConfig.sound=document.getElementById('alertSound').checked;
      var mt = parseInt(document.getElementById('alertTroops').value);
      if (mt<1 || mt>120000){
        document.getElementById('alertTroops').value = Options.alertConfig.minTroops;
        document.getElementById('alerterr').innerHTML = '<font color=#600000><B>INVALID</b></font>';
        setTimeout (function (){document.getElementById('alerterr').innerHTML =''}, 2000);
        return;
      } 
      Options.alertConfig.minTroops = mt;
      saveOptions();
      TowerAlerts.setPostToChatOptions (Options.alertConfig);
    }
  },

  
  hide : function (){
  },

  show : function (){
  },
  
  togOpt : function (checkboxId, optionName, callEnable, callIsAvailable){
    var t = Tabs.Options;
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
}

/********************************* Search Tab *************************************/

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

Tabs.Search = {
  tabOrder : 10,
  tabDisabled : !ENABLE_SEARCH_TAB,
  cont:null,

  init : function (div){
    var t = Tabs.Search;
	unsafeWindow.PTgotoMap2 = t.gotoMap;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpd2 = t.clickedPlayerLeaderboard;
	unsafeWindow.PCpo2 = t.clickedPlayerCheckOnline;
    unsafeWindow.PCplo2 = t.clickedPlayerGetLastLogin;
    this.cont = div;
    this.cont.innerHTML = '\
      <DIV class=ptentry><table><tr><td><TABLE><TR valign=bottom><TD class=xtab width=100 align=right>Search for: </td><TD>\
      <SELECT id="srcType">\
        <OPTION value=0>Barb Camp</option>\
        <OPTION value=1>Wilderness</option>\
		<OPTION value=2>Cities</option>\
       </select></td></td> \
        <td> In Province:\
        <select id="idProvCoordSelect">\
        <option value="675,675"> Albion </option>\
        <option value="375,75"> Astolat </option>\
        <option value="675,225"> Avalon </option>\
        <option value="225,675"> Bodmin Moor </option>\
        <option value="675,525"> Caerleon </option>\
        <option value="525,375"> Cadbury </option>\
        <option value="225,225"> Cameliard </option>\
        <option value="75,525"> Camlann </option>\
        <option value="525,225"> Canoel </option>\
        <option value="75,225"> Carmathen </option>\
        <option value="375,675"> Cellwig </option>\
        <option value="675,75"> Corbenic </option>\
        <option value="225,75"> Cornwall </option>\
        <option value="375,525"> Dore </option>\
        <option value="675,375"> Glastonbury </option>\
        <option value="525,675"> Listeneise </option>\
        <option value="525,525"> Logres </option>\
        <option value="525,75"> Lyonesse </option>\
        <option value="225,525"> Orkney </option>\
        <option value="75,225"> Paimpont </option>\
        <option value="75,675"> Parmenie </option>\
        <option value="375,225"> Sarras </option>\
        <option value="225,375"> Shallot </option>\
        <option value="75,75"> Tintagel </option>\
		</select></td></tr>\
        <tr><td width=100  align=right >In Quadrant: </td><td><select id="idQuadSelect">\
        <option value="188,188"> NorthWest </option>\
        <option value="563,188"> NorthEast </option>\
        <option value="188,563"> SouthWest </option>\
        <option value="563,563"> SouthEast </option>\
        </select></td><td><SPAN id=spInXY></span></td></tr>\
        </table>\
        <DIV id="srcOpts" style="height:100px"></div></td><td><DIV id=divOutOpts style="background:#e0e0f0; padding:10px"></div></td></tr></table></div>\
        <DIV id="srcResults" style="height:470px; max-height:470px;"></div>';
      var psearch = document.getElementById ("srcType");
      m = '<TABLE><TR valign=middle><TD class=xtab width=100 align=right>Center: &nbsp; X: </td><TD class=xtab>\
        <INPUT id=srchX type=text > &nbsp; Y: <INPUT id=srchY type=text > &nbsp; <SPAN id=spInXYold></span>\
        </td></tr><TR><TD class=xtab align=right>Max. Distance: </td><TD style="width: 200px;" class=xtab><INPUT id=srcDist size=3 value=10 /></td>\
        <td></td>\
        </tr>';
      m += '<TR><TD class=xtab></td><TD class=xtab><INPUT id=srcStart type=submit value="Start Search" /></td></tr>';
      m += '</table>';
      document.getElementById ('srcOpts').innerHTML = m;
      new CdispCityPicker ('srchdcp', document.getElementById ('spInXY'), true).bindToXYboxes(document.getElementById ('srchX'), document.getElementById ('srchY'));
      document.getElementById ('srcStart').addEventListener ('click', t.clickedSearch, false);
      document.getElementById ('srcType').addEventListener ('click', t.srchTypeHandler, false);
      document.getElementById ('idProvCoordSelect').addEventListener ('click', t.provCoordsHandler, false);
      document.getElementById ('idQuadSelect').addEventListener ('click', t.quadCoordHandler, false);
      Options.citySrchFilter = 0;
      t.state = 1;
      document.getElementById ('srchX').value = Cities.cities[0].x
      document.getElementById ('srchY').value = Cities.cities[0].y
      t.srchTypeHandler();
  },

//Edit add city search










clickedPlayerDetail : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching details ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching leaderboard info ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },
  
  clickedPlayerCheckOnline : function (span, uid){
    var t = Tabs.AllianceList;
	var s = Tabs.Search;
    span.onclick = '';
    span.innerHTML = "fetching online status ...";
    t.fetchPlayerStatus (uid, function (r) {s.gotPlayerStatus(r, span, uid)});
  },

  clickedPlayerGetLastLogin : function (span, uid){
    var t = Tabs.AllianceList;
	var s = Tabs.Search;
    span.onclick = '';
    span.innerHTML = "fetching login date ...";
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
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Leaderboard: </b></td><TD colspan=2> Might: '+ p.might  +' &nbsp; Alliance: '+ an +'</td></tr>'; 
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      m += '<TR><TD align=right><B>City #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName +' '+coordLink (c.xCoord, c.yCoord)+'</td><TD width=75%> &nbsp; level: '
        + c.tileLevel +' &nbsp; &nbsp; status: '+ cityStatusString (c.cityStatus) +' &nbsp; &nbsp; created: ' + c.dateCreated.substr(0,10) +'</td></tr>';
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
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Details:</b> &nbsp; </td><TD>Alliance: '+ a +' &nbsp; Cities: '
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
      m = '<span style="color:green"><b>online!</b></span>';
    } else {
       m = '<span style="color:red"><b>may not be online</b></span>';
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
       m = '<span style="color:red">No login date found: '+lastLogin+'</span>';
    }  
    span.innerHTML = m + '';
  },

  aName : '',
  eventSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = 'Enter at least 3 characters';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },

  aName : '',
  eventSubmit : function (){
    var t = my.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = 'Enter at least 3 characters';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
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
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  },
  srchTypeHandler : function (){
    var t = Tabs.Search;
    logit("Search Type Handler ()");
    t.opt.searchType = document.getElementById ('srcType').value;
    t.opt.startX = parseInt(document.getElementById ('srchX').value);
    t.opt.startY = parseInt(document.getElementById ('srchY').value);
    t.opt.maxDistance = parseInt(document.getElementById ('srcDist').value);
    if (t.opt.searchType == 0)
      typeName = 'Barbarians';
    else if (t.opt.searchType == 1)
      typeName = 'Wildernesses';
	else 
	  typeName = 'Cities';

    var m = '<CENTER><B>Search for '+ typeName +'<BR>\
        Center: '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; Distance: '+ t.opt.maxDistance +'<BR></center>\
        <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>LIST OPTIONS:</b><BR></td></tr>';
    if (t.opt.searchType == 1 || t.opt.searchType == 0) {
     m += '<TR><TD class=xtab align=right>Min. level to show:</td><TD class=xtab> <INPUT id=filMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD class=xtab align=right>Max. level to show:</td><TD class=xtab> <INPUT id=filMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
	}
    if (t.opt.searchType == 1){
      m += '<TR><TD class=xtab align=right>Wilderness Type:</td><TD class=xtab align=right>\
            Woodlands<INPUT id=woodWild type=CHECKBOX'+ (Options.woodWild?' CHECKED':'') +'></td></tr>';
      m += '<TR><TD class=xtab align=right>Grassland/Lake<INPUT  id=foodWild type=CHECKBOX '+ (Options.foodWild?' CHECKED':'') +'></td>\
	       <TD class=xtab align=right>Mountain<INPUT id=mtnWild type=CHECKBOX '+ (Options.mtnWild?' CHECKED':'') +'></td></tr>';
      m += '<TR><TD class=xtab align=right>Plain<INPUT id=plnWild type=CHECKBOX '+ (Options.plnWild?' CHECKED':'') +'></td>\
           <TD class=xtab align=right>Hills<INPUT id=hillWild type=CHECKBOX'+ (Options.hillWild?' CHECKED':'') +'></td></tr>';
      m += '<TR><TD class=xtab align=right>Unowned Only:</td><TD class=xtab><INPUT id=filUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    } 
    if (t.opt.searchType == 1 || t.opt.searchType == 0) {
        m+= '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=filSortBy>\
          <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Level</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
			</select></td></tr>\
			<TR><TD class=xtab align=right>Show coordinates only:</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
			</table></div><BR><SPAN id=srchSizeWarn></span>';
    } else {
        m+= '<TR><TD class=xtab align=right >Show:</td><TD class=xtab align=left ><SELECT style="width: 135px" id=idSrchFilter>\
             <OPTION value=0>All Cities</option>\
             <OPTION value=1>Hostile Only</option>\
	     <OPTION value=2>In Mist Only</option>\
	     <OPTION value=3>Allied Only</option>\
	     <OPTION value=4>Friendly Only</option>\
	     <OPTION value=5>Neutral Only</option>\
	     <OPTION value=6>Unaligned Only </option>\
             </select></td></tr>';

		m+= '<TR><TD class=xtab align=right >Sort By:</td><TD class=xtab><SELECT style="width: 135px" id=filSortBy>\
          <OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Might</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
        </select></td></tr>\
        <TR><TD class=xtab align=right >Show coords only:</td><TD class=xtab align=left ><INPUT type=checkbox id=coordsOnly ></td></tr>\
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
	}

  },
  quadCoordHandler : function (){
     coordStr = document.getElementById ('idQuadSelect').value;
     var m=/^\s*([0-9]+)\s*,\s*([0-9]+)/.exec(coordStr);
     document.getElementById ('srchX').value = m[1];
     document.getElementById ('srchY').value = m[2];
     document.getElementById ('srcDist').value = "187";
     var t = Tabs.Search;
     t.srchTypeHandler();
  },
  provCoordsHandler : function (){
     coordStr = document.getElementById ('idProvCoordSelect').value;
     var m=/^\s*([0-9]+)\s*,\s*([0-9]+)/.exec(coordStr);
     document.getElementById ('srchX').value = m[1];
     document.getElementById ('srchY').value = m[2];
     document.getElementById ('srcDist').value = "75";
     var t = Tabs.Search;
     t.srchTypeHandler();
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

    if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>749)
      errMsg = "X must be between 0 and 749<BR>";
    if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>749)
      errMsg += "Y must be between 0 and 749<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1 || t.opt.maxDistance>750)
      errMsg += "Max Distance must be between 1 and 750<BR>";
    if (errMsg != ''){
      document.getElementById('srcResults').innerHTML = '<FONT COLOR=#660000>ERROR:</font><BR><BR>'+ errMsg;
      return;
    }

    t.searchRunning = true;
    document.getElementById ('srcStart').value = 'Stop Search';
    m = '<DIV class=ptstat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=statSearched></div></td>\
        <TD class=xtab align=center><SPAN id=statStatus></span></td>\
        <TD class=xtab align=right width=125><DIV id=statFound></div></td></tr></table></div>\
      <TABLE width=100%><TR><TD><DIV id=divOutTab style="width:100%; height:470px; max-height:470px; overflow-y:auto;"></div></td></tr></table>';
    document.getElementById('srcResults').innerHTML = m;
    if (t.opt.searchType == 0)
      typeName = 'Barbarians';
    else if (t.opt.searchType == 1)
      typeName = 'Wildernesses';
	else 
	  typeName = 'Cities';

    m = '<CENTER><B>Search for '+ typeName +'<BR>\
        Center: '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; Distance: '+ t.opt.maxDistance +'<BR></center>\
        <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>LIST OPTIONS:</b><BR></td></tr>';
	if (t.opt.searchType == 1 || t.opt.searchType == 0) {
      m += '<TR><TD class=xtab align=right>Min. level to show:</td><TD class=xtab> <INPUT id=filMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD class=xtab align=right>Max. level to show:</td><TD class=xtab> <INPUT id=filMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
	}
    if (t.opt.searchType == 1){
      m += '<TR><TD class=xtab align=right>Wilderness Type:</td><TD class=xtab><SELECT id=filWildType>';
      m += htmlOptions ( {1:'Glassland/Lake', 3:'Woodlands', 4:'Hills', 5:'Mountain', 6:'Plain', 0:'ALL'}, Options.wildType );
      m += '</select></td></tr><TR><TD class=xtab align=right>Unowned Only:</td>\
			<TD class=xtab><INPUT id=filUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    }
	if (t.opt.searchType == 1 || t.opt.searchType == 0) {
	  m += '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=filSortBy>\
				<OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Level</option>\
				<OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
            </select></td></tr>\
            <TR><TD class=xtab align=right>Show coordinates only:</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
            </table></div><BR><SPAN id=srchSizeWarn></span>';
	} else {
	 m += '<TR><TD class=xtab align=right>City Type:</td><TD class=xtab><SELECT id=filCities>';
     m += htmlOptions ( {1:'All', 2:'Allies', 3:'Friendly', 4:'Hostile', 5:'Neutral', 6:'Unallianced', 7:'Misted'}, Options.cityType );
     m += '</select></td></tr>';		
	 m += '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=filSortBy>\
			<OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Might</option>\
			<OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
           </select></td></tr>\
		   <TR><TD class=xtab align=right>Min might to show:</td><TD class=xtab><INPUT type=text id=minMight value='+Options.MightSrc+' size=3 \></td></tr>\
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
    document.getElementById ('statStatus').innerHTML = 'Searching at '+ xxx +','+ yyy;
if (DEBUG_TRACE) logit (" 0 clickedSearch()... setTimeout ..:" + xxx +' , '+ yyy +' , '+ t.mapCallback.name);
    setTimeout (function(){Map.request (xxx, yyy, 15, t.mapCallback)}, MAP_DELAY);
  },

  dispMapTable : function (){
    var tileNames = ['Barb Camp', 'Grassland', 'Lake', 'Woodlands', 'Hills', 'Mountain', 'Plain', 'City' ];
    var t = Tabs.Search;
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
      m = '<BR><CENTER>None found</center>';
    } else {
      dat.sort(mySort);
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: SORT');
      if (coordsOnly)
        m = '<TABLE align=center id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Location</td></tr>';
      else {
        if (t.opt.searchType == 0) // Barbs


			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Location</td><TD style="padding-left: 10px">Distance</td><TD style="padding-left: 10px;">Lvl</td><TD width=80%> &nbsp; Type</td><TD style=""></td></tr>';

		else if (t.opt.searchType == 1) // Wilds
			//m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Location</td><TD style="padding-left: 10px">Distance</td><TD style="padding-left: 10px;">Lvl</td><TD style="padding-left: 10px;> &nbsp; Type</td><TD width=80%>Owner</td><TD style=""></td></tr>';
			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Location</td><TD style="padding-left: 10px">Distance</td><TD style="padding-left: 10px;">Lvl</td><TD width=10%> &nbsp; Type</td><TD width=70%> &nbsp; Owner</td><TD style=""></td></tr>';
		else // Cities
			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Location</td><TD >Dist</td><TD>City</td><TD>Owner</td><TD>Might</td><td>Alliance               </td><TD width=80% style="font-size:9px;">More info</td><TD style="padding-left: 10px;"></td></tr>';
			
	  }
      var numRows = dat.length;
      if (numRows > 500 && t.searchRunning){
        numRows = 500;
        document.getElementById('srchSizeWarn').innerHTML = '<FONT COLOR=#600000>NOTE: Table only shows 500 of '+ dat.length +' results until search is complete.</font>';
      }
      for (i=0; i<numRows; i++){
	    m += '<TR valign="top"';
		 if (dat[i][12]) m += 'class="'+dat[i][12]+'"';
        m += ' ><TD><DIV onclick="ptGotoMapHide('+ dat[i][0] +','+ dat[i][1] +')"><A>'+ dat[i][0] +','+ dat[i][1] +'</a></div></td>';
        if (coordsOnly)
          m += '</tr>';
        else
			if (t.opt.searchType == 2) { 
				 m += '<TD align="left"  valign="top">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=left>'+ dat[i][8] +'</td><TD valign="top">'+dat[i][9]+'</td><TD valign="top">'+dat[i][10]+'</td><td>'+dat[i][11]+'</td><td>';
				 if (dat[i][5]) {
					m += '<DIV onclick="PTscout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A style="font-size:9px;" >Scout</a></div>';
				} else 
					m += '<DIV onclick="PTpd(this, '+ dat[i][7] +')"><A style="font-size:9px;" >Details</a></div>\
					<DIV style="" onclick="PTpd2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Leaderboard</a></div>\
					<DIV style="" onclick="PCpo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Onlinestatus</a></div>\
					<DIV style="" onclick="PCplo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Last Login</a></div>';
					m+= '</td><TD  valign="top">'+ (dat[i][5]?' Misted':'') +'</td></tr>';

					} else { 
				var sty = '';
				if (dat[i][8] == 'hostile')
					var sty = ' style="color:#800; font-weight:bold"';					
				m += '<TD'+ sty + ' align=right>'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD'+ sty + ' align=right>'+ dat[i][4] +'</td><TD'+ sty + '> &nbsp; '+ tileNames[dat[i][3]];
				//+'</td><TD>'+ (dat[i][5]?' OWNED':'') +'</td></tr>';
				if (dat[i][9]) { // Is Misted?
					m += '</td><TD align=left> &nbsp; </td></tr>';
				} else {
					// neutral, friendly, ally, hostile
					if (dat[i][7] != '') // Has Alliance?
						m += '</td><TD'+ sty + ' align=left> &nbsp; '+ dat[i][6] +' ('+ dat[i][7] + ') ['+ dat[i][8] + ']</td></tr>';
					else
						m += '</td><TD align=left> &nbsp; '+ dat[i][6] +'</td></tr>';
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
(object) u4127810 = [object Object]
    (string) n = George2gh02    (name)
    (string) t = 1              (title code)
    (string) m = 55             (might)
    (string) s = M              (sex)
    (string) w = 2              (mode: 1=normal, 2=begprotect, 3=truce, 4=vacation )
    (string) a = 0              (alliance)
    (string) i = 1              (avatar code)
*****/

  mapCallback : function (left, top, width, rslt){
    function insertRow (x, y, msg){
      row = document.getElementById('srcOutTab').insertRow(-1);
      row.insertCell(0).innerHTML = x +','+ y;
      row.insertCell(1).innerHTML = distance (t.opt.startX, t.opt.startY, x, y);
      row.insertCell(2).innerHTML = msg;
    }
if (DEBUG_TRACE) logit (" 3 mapCallback()");
    var t = Tabs.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('ERROR: '+ rslt.errorMsg);
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
      } else if (t.opt.searchType==2 && map[k].tileCityId >= 0 && map[k].tileType > 50 && map[k].cityName)
		  type = 7;
		else
        continue;
      dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      if (dist <= t.opt.maxDistance){

		var nameU = 'unknown';
		var uu = 'u'+map[k].tileUserId;
	    var isMisted = map[k].tileUserId == 0 || false;
		var aU = 'unknown';
		var aD = 'unknown';
		if (t.opt.searchType==2) {
			//var uu = 'u'+map[k].tileUserId;
			//var isMisted = map[k].tileUserId == 0 || false;
			//var aU = 'unknown';
			//var aD = 'unknown';
			var mightU = 0;
			//var nameU = 'unknown';
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
						nameU = 'No userInfo';
						aU = '----';
						aD = 'unaligned';
					}
				}
			}
			if (mightU > 0 || isMisted) {
		t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName,nameU,mightU,aU,aD ]);
			}
			
		} else {
			if (userInfo[uu] ) { // Corrects a problem with hung search.
				nameU = userInfo[uu].n;
				aD = getDiplomacy(userInfo[uu].a);
				if ( alliance && alliance['a'+userInfo[uu].a] ) 
					aU = alliance['a'+userInfo[uu].a];
				else
					aU = '';
			} else {
				nameU = '';
				aU = '';
				aD = '';
			}
			isOwned = map[k].tileUserId>0 || map[k].misted;
			t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, nameU, aU, aD, isMisted]);
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
        t.stopSearch ('Done!');
        return;
      }
    }

    var x = t.normalizeCoord(t.curX);
    var y = t.normalizeCoord(t.curY);
    document.getElementById ('statStatus').innerHTML = 'Searching at '+ x +','+ y;
if (DEBUG_TRACE) logit (" 0 mapCallback()... setTimeout ..:" + x +' , '+ y +' , '+ t.mapCallback.toString().substr (0,50));
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



/*************************************** Train Tab ***********************************************/

Tabs.Train = {
  tabOrder : 15,
  cont : null,
  timer : null,
  stats : {},
  selectedCity : {},

  init : function (div){
    var t = Tabs.Train;
    t.cont = div;
    s = "<DIV id=trainTopSelect>\
      <DIV class=ptstat>Train troops and build wall/field defenses</div><DIV style='height:10px'></div><DIV class=ptentry>\
      <DIV style='text-align:center; margin-bottom:10px;'>Select City: &nbsp; <span id=ptspeedcity></span></div>\
      <TABLE class=ptTab width=100%><TR valign=top><TD width=50%>\
      <TABLE align=center><TR><TD align=right>Troop Type: </td><TD colspan=2>\
      <SELECT id=ptttType>\
        <option value='1'>Supply Troop</option>\
        <option value='2'>Militiaman</option>\
        <option value='3'>Scout</option>\
        <option value='4'>Pikeman</option>\
        <option value='5'>Swordsman</option>\
        <option value='6'>Archer</option>\
        <option value='7'>Cavalry</option>\
        <option value='8'>Heavy Cavalry</option>\
        <option value='9'>Supply Wagon</option>\
        <option value='10'>Ballista</option>\
        <option value='11'>Battering Ram</option>\
        <option value='12'>Catapult</option>\
      </select> &nbsp; (max <span id=ptttSpMax></span>)</td></tr>\
      <TR><TD align=right># per slot: </td><TD><INPUT id='ptttInpPS' size=5 type='text' value='0'\></td>\
        <TD><INPUT id='ptttButMaxPS' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxPS>0</span>)</td></tr>\
      <TR><TD align=right># of slots: </td><TD><INPUT id='ptttInpSlots' size=2 type='text' value='1'\></td>\
        <TD width=75%><INPUT id='ptttButMaxSlots' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxSlots>1</span>)</td></tr>\
      <TR><TD align=right valign=top>Set Workers idle: </td><TD colspan=2><INPUT type=CHECKBOX id=chkPop"+ (Options.maxIdlePop?' CHECKED ':'') +"> \
        <SPAN style='white-space:normal;'>Allows you to train more troops. May temporarily set idle population negative.</span></td></tr>\
      <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='ptttButDo' type=submit value='Train Troops'\></td></tr>\
      </table></td><TD width=20></td><TD style='border-left:solid 2px;' width=50% align=center>\
      <TABLE align=center><TR><TD align=right>Defense Type: </td><TD colspan=2>\
      <SELECT id=pttdType>\
        <option value='53'>Crossbow</option>\
        <option value='55'>Trebuchet</option>\
        <option value='60'>Trap</option>\
        <option value='61'>Caltrop</option>\
        <option value='62'>Spiked Barrier</option>\
      </select> &nbsp; (<span id=pttdSpMax></span>)</td></tr>\
      <TR><TD align=right># per slot: </td><TD><INPUT id='pttdInpPS' size=5 type='text' value='0'\></td>\
        <TD><INPUT id='pttdButMaxPS' type=submit value='max'\> &nbsp; (max <span id=pttdSpMaxPS>0</span>)</td></tr>\
      <TR><TD align=right># of slots: </td><TD><INPUT id='pttdInpSlots' size=2 type='text' value='1'\></td>\
        <TD width=75%><INPUT id='pttdButMaxSlots' type=submit value='max'\> &nbsp; (max <span id=pttdSpMaxSlots>1</span>)</td></tr>\
      <TR align=center><TD colspan=3><SPAN id=pttdSpace></span></td></tr>\
      <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='pttdButDo' type=submit value='Build Defenses'\></td></tr></table>\
      </td></tr></table></div></div>\
      <TABLE align=center width=425 class=ptTab><TR><TD><div id=ptTrainStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>\
      <div style='height: 325px; background: #e8ffe8'>\
      <TABLE width=100% class=ptTab><TR><TD colspan=3><DIV id=divSTtop></div></td></tr>\
      <TR><TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>Troop Queue &nbsp; (<SPAN id=statTTtot></span>)</b><BR><HR></div><DIV id=divSTleft style='overflow-y: auto; height:210px; max-height:210px'></div></td>\
        <TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>Defense Queue &nbsp; (<SPAN id=statDTtot></span>)</b><BR><HR></div><DIV id=divSTright style='overflow-y: auto; height:210px; max-height:210px'></div></td></tr>\
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
  },


  hide : function (){
    var t = Tabs.Train;
    clearTimeout (t.timer);
  },
  
  show : function (){
    var t = Tabs.Train;
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
    t.stats.MaxTrain = parseInt (max);
    if (t.stats.MaxTrain < 0)
      t.stats.MaxTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxTrain = 0;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxTrain = 0;
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
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Number of troops per slot must be greater than 0.</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Can\'t train that many troops (max is '+ t.stats.MaxTrain +' total)</font>';
      return;
    }
    if (numSlots<1 || numSlots>t.stats.barracks - t.stats.queued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Invalid number of slots.</font>';
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
    t.TDspMax.innerHTML = 'max:'+ t.stats.MaxDefTrain +'&nbsp; owned:'+ t.stats.defOwned;   
    t.TDspMaxSlots.innerHTML = t.stats.wallLevel-t.stats.Dqueued;
    if (slots<1)
      t.TDspMaxPS.innerHTML = 0;
    else
      t.TDspMaxPS.innerHTML = parseInt(t.stats.MaxDefTrain / slots);

    t.TDspSpace.innerHTML = 'Wall level: <B>'+ t.stats.wallLevel +'</b><BR>Wall space: '+ (t.stats.wallSpaceUsed+t.stats.wallSpaceQueued)  +'/<B>'+ t.stats.wallSpace +'</b><BR>\
        Field space: '+ (t.stats.fieldSpaceUsed+t.stats.fieldSpaceQueued) +'/<B>'+ t.stats.fieldSpace +'</b>';
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
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Number of units per slot must be greater than 0.</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxDefTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Can\'t train that many unit (max is '+ t.stats.MaxDefTrain +' total)</font>';
      return;
    }
    if (numSlots<1 || numSlots > t.stats.wallLevel-t.stats.Dqueued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Invalid number of slots.</font>';
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
        t.dispTrainStatus ('<B>Done queueing defenses.</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Training '+ cmd[2] +' '+  fortNamesShort[cmd[1]] +'<BR>');
        doDefTrain ( cityId, cmd[1], cmd[2], 
          function(errMsg){
            setTimeout(function (){Tabs.Train.doDefQueue(cityId, que, errMsg);}, (Math.random()*3500)+1500);
          } );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>PROGRAM ERROR: '+ err.message +'</font><BR>');
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
	
m += '<TABLE class=ptTab width=100%><TR align=center>\
        <TD width=8%><B>Supply:</b></td><TD width=8%><B>Militia:</b></td><TD width=8%><B>Scout:</b></td>\
        <TD width=8%><B>Pike:</b></td><TD width=8%><B>Sword:</b></td><TD width=8%><B>Archer:</b></td>\
        <TD width=8%><B>Cav:</b></td><TD width=8%><B>Heavy Cav:</b></td><TD width=8%><B>Wagon:</b></td>\
        <TD width=8%><B>Ballista:</b></td><TD width=8%><B>Ram:</b></td><TD width=8%><B>Catapult:</b></td><tr>';
		
 m += '<TR align=center><TD width=8%>'+Seed.units['city'+cityId]['unt1']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt2']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt3']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt4']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt5']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt6']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt7']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt8']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt9']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt10']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt11']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt12']+'</td><tr></table>';
	
    m += '<TABLE class=ptTab width=100%><TR align=center>\
        <TD width=18%><B>Food:</b></td><TD width=16%><B>Wood:</b></td><TD width=16%><B>Stone:</b></td>\
        <TD width=16%><B>Ore:</b></td><TD width=16%><B>Gold:</b></td><TD width=16%><B>Idle Pop:</b></td></tr>\
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
          m += '<TR align=right><TD>'+ q[i][1] +' </td><TD align=left> '+ unsafeWindow.unitcost['unt'+q[i][0]][0];
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
    m = t.stats.barracks +' barracks';
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
    var t = Tabs.Train;
    t.divTrainStatus.innerHTML = msg + t.divTrainStatus.innerHTML;
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
        t.dispTrainStatus ('<B>Done queueing troops.</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Training '+ cmd[2] +' '+  unsafeWindow.unitcost['unt'+cmd[1]][0] +'<BR>');
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
    GMTclock.span.innerHTML = ' &nbsp; ('+ now.toLocaleFormat('%H:%M:%S') +' GMT)';
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
  tabOrder : 1,
  cont : null,
  displayTimer : null,
  checkBox:null,

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

    clearTimeout (t.displayTimer);

    function clickEnableMarch (){
      var t = Tabs.Overview;
      if (checkBox.checked)
        Options.includeMarching = true;
      else
        Options.includeMarching = false;
      t.show ();
    }

    function _row (name, row, noTotal){
      if (rownum++ % 2)
        style = '';
      else
        style = ' style = "background: #FFFACD"';
      var tot = 0;
      var m = [];
      m.push ('<TR style="background: #FFFACD" align=right');
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
        m.push ('<TD style="background: #E0EEE0">');
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
      if (Options.includeMarching)
        march = getMarchInfo ();
  
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
      
      str = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;"><TABLE cellspacing=0 cellpadding=0 class=ptTab width=97% align=center>\
        <TR align=left><TD><SPAN class=ptStatLight>Joined on:</span> '+ dt.toLocaleDateString() +'</td>\
        <TD><SPAN class=ptStatLight>Might:</span> ' + addCommas(Seed.player.might) +'</td>\
        <TD><SPAN class=ptStatLight>Alliance:</span> ' + getMyAlliance()[1] +'</td>\
        <TD align=right><SPAN class=ptStatLight>Domain:</span> ' + unsafeWindow.domainName +'</td></tr></table></div>';
      
      str += "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #E0EEE0'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,10) +'</b><BR>'+coordLink(Cities.cities[i].x,Cities.cities[i].y )+'</td>';
            Cities.cities[i].x +','+ Cities.cities[i].y  +")</td>";
      }
      if (Options.includeMarching)
        str += '<TD width=81><B>Marching</b></td>';
      str += "</tr>";
	  
	  str += '<TR valign=top align=right><TD></td><TD style=\'background: #E0EEE0\'></td>';
	  for(i=0; i<Cities.numCities; i++){
	    cityID = 'city'+Cities.cities[i].id;
	    Gate = parseInt(Seed.citystats[cityID].gate);
		if(Gate == 0)
			str += '<TD>Hiding</td>';
		else
			str += '<TD>Defending</td>';
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
      str += _row ('Gold', rows[0]);
      str += _row ('Food', rows[1]);
      str += _row ('Wood', rows[2]);
      str += _row ('Stone', rows[3]);
      str += _row ('Ore', rows[4]);
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
			    t_rows[r][j] = supply_t;
				break;
		      case 4:
			    t_rows[r][j] = militia_t;
				break;
		      case 6:
			    t_rows[r][j] = scout_t;
				break;
		      case 8:
			    t_rows[r][j] = pike_t;
				break;
		      case 10:
			    t_rows[r][j] = sword_t;
				break;
		      case 12:
			    t_rows[r][j] = archer_t;
				break;
		      case 14:
			    t_rows[r][j] = cavalry_t;
				break;
		      case 16:
			    t_rows[r][j] = heavy_t;
				break;
		      case 18:
			    t_rows[r][j] = wagon_t;
				break;
		      case 20:
			    t_rows[r][j] = ballista_t;
				break;
		      case 22:
			    t_rows[r][j] = ram_t;
				break;
		      case 24:
			    t_rows[r][j] = catapult_t;
				break;
			  
			}
      	  }  
        }
	  }	  
      rownum = 0;

      str += _row ('SupTrp', rows[1]);      
      str += _row ('Training', t_rows[2]);
      str += _row ('Militia', rows[2]);
      str += _row ('Training', t_rows[4]);
      str += _row ('Scout', rows[3]);
      str += _row ('Training', t_rows[6]);
      str += _row ('Pike', rows[4]);
      str += _row ('Training', t_rows[8]);
      str += _row ('Sword', rows[5]);
      str += _row ('Training', t_rows[10]);
      str += _row ('Archer', rows[6]);
	  str += _row ('Training', t_rows[12]);
      str += _row ('Cavalry', rows[7]);
      str += _row ('Training', t_rows[14]);
      str += _row ('Heavy', rows[8]);
      str += _row ('Training', t_rows[16]);
      str += _row ('Wagon', rows[9]);
      str += _row ('Training', t_rows[18]);
      str += _row ('Ballista', rows[10]);
      str += _row ('Training', t_rows[20]);
      str += _row ('Ram', rows[11]);
      str += _row ('Training', t_rows[22]);
      str += _row ('Catapult', rows[12]);
      str += _row ('Training', t_rows[24]);

      str += '<TR><TD><BR></td></tr>';
	     
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row[i] = rp[1] - usage;
      }
      str += _row ('Food +/-', row, true);
      
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
        if (totWilds < castle)
          row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';
        else
          row[i] = totWilds +'/'+ castle;
      }
      str += _row ('# Wilds', row, true);
  
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
        for (k in dat)
          ++totKnights;
        row[i] = totKnights;
      }
      str += _row ('# Knights', row, true);
  
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
      str += _row ('Troop Que', row, true);
      
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
      str += _row ('Wall Que', row, true);
      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><BR><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +'>Include Marching Troops/Resources</td></tr>';
      str += "</table>";
      if (DEBUG_BUTTON)
        str += '<BR><BR><INPUT id=subSeed type=submit name="SEED" value="DEBUG">';
      Tabs.Overview.cont.innerHTML = str;
      checkBox = document.getElementById('idCheck');
      checkBox.addEventListener('click', clickEnableMarch, false);
      if (DEBUG_BUTTON){
        subSeed = document.getElementById('subSeed');
        subSeed.addEventListener('click', function (){debugWin.doit()}, false);
      }
//DebugTimer.display ('Draw Overview');    
    } catch (e){
      Tabs.Overview.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
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

Tabs.Marches = {
  tabOrder : 5,
  cont:null,
  displayTimer:null,

  curTabBut : null,
  curTabName : null,
	
  init : function (div){
    var t = Tabs.Marches;
    unsafeWindow.pr56Recall = t.butRecall;
    unsafeWindow.r8x6Home = t.butSendHome;
    
    
    t.cont = div;


    t.cont.innerHTML = '<TABLE class=ptTab align=center><TR><TD><INPUT class=pbSubtab ID=ptmrchSubA type=submit value=Attacks></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubM type=submit value=Marches></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubR type=submit value=Reinforcements></td></tr></table><HR class=ptThin>\
      <DIV id=ptMarchOutput style="margin-top:10px; background-color:white; height:300px"></div>';
    t.marchDiv = document.getElementById('ptMarchOutput');
    document.getElementById('ptmrchSubA').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubR').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubM').addEventListener('click', e_butSubtab, false);
    changeSubtab (document.getElementById('ptmrchSubA'));
    
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
    else
      t.showAttacks();
  },
 
  
  /***   ATTACKS SUBTAB  ***/
  showAttacks : function (){
    var t = Tabs.Marches;
    t.marchDiv.innerHTML = 'INCOMING Attacks coming soon!';;
  },
  
  
  /***   MARCHES SUBTAB  ***/
  showMarches : function (){
    var t = Tabs.Marches;
    t.marchDiv.innerHTML = 'OUTGOING marches coming soon!';
  },
  
  
  
  /***  REINFORCEMENTS SUBTAB  ***/
  showReinforcements : function (){
    var rownum = 0;
    var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
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

//logit (inspect (enc, 6, 1));    
    
    
    
    
    
    s = '<div class=ptstat>Showing troops encamped at each of your embassies.</div><BR>';
    if (numSlots == 0){
      s += '<BR><CENTER><B>No troops encamped.</b></center>';
    } else {
      s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
      s += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%><B>Player (knight)</b></td>';

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
          s+= '<TR><TD class="city" colspan=13 align=center><B>'+ Cities.cities[c].name +'</b></td></tr>';
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
      s += '<TR><TD colspan=13><BR><BR></td></tr><TR align=right><TD class="tot" align=left><B>TOTALS:</b></td>';
      for (i=1; i<13; i++)
        s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr></table>';
    }

    s += '<BR><BR><INPUT type=CHECKBOX id=idCheck2 '+ (Options.encRemaining?'':' CHECKED ') +'> Show Original Troops';
    s += '<BR><BR><DIV style="font-size: 10px">NOTE: You will need to refresh KofC to show new encampments or remaining troops after a battle.</div>';
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
logit ('FROM ME!'); 
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
        <TABLE class=ptPageNav><TR valign=middle>\
        <TD style="margin-right:15px">'+ aButton('<SPAN style="padding-right:0.8em; letter-spacing:-0.99em;">&#x258f;&#x258f;&#x25c4;</span>', 'F') +'</td>\
        <TD>'+ aButton('&#x25c4', '-') +'</td>\
        <TD>'+ aButton('&#x25ba', '+') +'</td>\
        <TD style="margin-right:15px">'+ aButton('<SPAN style="padding-right:1.05em; letter-spacing:-0.99em;">&#x25ba;&#x2595;&#x2595;</span>', 'L') +'</td>\
        <TD width=20></td><TD>Page <INPUT id=ptPagerPageNum onChange="pageNavigatorView.e_inp()" type=text size=1> OF <span id=ptPagerNumPages>?</span></td>\
        </tr></table>';
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




// TODO: Handle multiple instances altering same function!!   ****************************
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
        setTimeout ( function (){document.body.removeChild(scr);}, 0);
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
      span.className='notify';
      span.style.display='none';
      span.id = 'chrome_messages_notifyL';
      span.style.left = '6px';
      e.parentNode.insertBefore (span, e);
      if (Options.fixMsgCount)
        t.enable (true);
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
      new CdialogCancelContinue ('<SPAN class=boldRed>You are about to march to location 0,0!</span>', null, unsafeWindow.modal_attack_check, document.getElementById('modalInner1'));      
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
    var m = '<TABLE cellspacing=0 class=ptMainTab><TR>';
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
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
    }
    newTab.obj.show();
  },
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

function mouseMainTab (me){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
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

function hideMe (){
  if (!Options.ptWinIsOpen)
    return;
  mainPop.show (false);
  tabManager.showTab();
  Options.ptWinIsOpen = false;
  saveOptions();
}
function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.ptWinIsOpen = true;
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
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptcccancel type=submit value="CANCEL" \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value="CONTINUE" \></td></tr></table>';
  document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
  document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
  pop.show(true);
}


// TODO: make class (multiple instances needed)
function dialogRetry (errMsg, seconds, onRetry, onCancel){
  seconds = parseInt(seconds);
  var pop = new CPopup ('ptretry', 0, 0, 400,200, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL Retry" \>';
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
  53: "Crossbows",
  55: "Trebuchet",
  60: "Trap",
  61: "Caltrops",
  62: "Spiked Barrier",
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

// example: http://www150.kingdomsofcamelot.com
function GetServerId() {
  var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
  if(m)
    return m[1];
  return '';
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

    if (t.popDebug == null){  
      t.popDebug = new CPopup ('db', 0, 0, 350,500, true);
      t.popDebug.getTopDiv().innerHTML = 'DEBUG';
      t.popDebug.getMainDiv().innerHTML = '<DIV><INPUT type=submit id=dbsuball value=ALL> &nbsp; <INPUT type=submit id=dbsubnone value=NONE> &nbsp; \
        <INPUT type=submit id=dbdefaults value=DEFAULTS> &nbsp; <INPUT type=submit id=dbsubdo value=SHOW></div>\
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
      syncBoxes();
    }
    t.popDebug.show (true);
  },
}


function saveOptions (){
  var serverID = GetServerId();
  GM_setValue ('Options_'+serverID, JSON2.stringify(Options));
}

function readOptions (){
  var serverID = GetServerId();
  s = GM_getValue ('Options_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts)
      Options[k] = opts[k];
  }
}


/***
***/
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
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' &&  ee.id!='main_engagement_tabs'){
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
      gmTabs.lang = 'en_PT';
    }
    if (gmTabs.firstChild)
      gmTabs.insertBefore (a, gmTabs.firstChild);
    else
      gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
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
    hideMe ();
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
    logit (label +": "+ elapsed/1000);
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


var WinManager = {
  wins : {},    // prefix : CPopup obj

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
  
  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
    delete unsafeWindow.cpopupWins[prefix];
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
//new bit added by cm
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
//end of new bit

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

ptStartup ();

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
	divs.innerHTML = '<iframe src="http://corpr8.co.uk/newalert.html" height="20" width="100"></iframe>';
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
				if (bS[j].innerHTML == ' whispers to you:')
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
                        iframe.setAttribute("src", "http://corpr8.co.uk/newalert.html");
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
        //this should isolate the stuff in alliance chat. seltab2 = alliance.
        var foundMsg = false;
        
        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length - 1; i++) {
            if (divs[i].className == 'comm_tabs seltab2') {
                //Ok we have now detected that chat is set to alliance.
                
                bS = document.getElementsByTagName('b')
                for (var j = 0; j < bS.length - 1; j++) {
                    if (bS[j].innerHTML == ' whispers to you:') {
                        //ok we have now found a whisper to you.
                        if (foundMsg == false) {
                            foundMsg = true;
                            
                            //now find the message time.
                            //var msgSpan = bS[j].parentNode.getElementsByTagName('span')[0].innerHTML;
                            //if (GM_getValue("lastMsgTime") != msgSpan) {
							//	alert('got here');
                            //  GM_setValue("lastMsgTime", msgSpan);
							//	alert('have set message value');
                                bS[j].innerHTML = ' whispered to you:';
                                alertDiv = document.createElement("div");
                                alertDiv.innerHTML = '<iframe src="http://corpr8.co.uk/newalert.html" height="20" width="100"></iframe>';
                                alertDiv.setAttribute("class", "alertDiv");
                                
                                void (bS[j].appendChild(alertDiv));
                                
                                window.setTimeout(function(){
                                    var divs = document.getElementsByTagName('div');
                                    for (var i = 0; i < divs.length - 1; i++) {
                                        if (divs[i].className == 'alertDiv') {
                                            divs[i].innerHTML = "Audio Alert Played";
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


window.setInterval(function(){
    scan_allianceChat();
    //check_html()
}, 5000);

if(document.getElementById("mod_comm_list1"))
  { document.getElementById("mod_comm_list1").style.backgroundColor = '#CD8888';}