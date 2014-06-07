{\rtf1\ansi\ansicpg1252\deff0\deflang3081{\fonttbl{\f0\fnil\fcharset0 Courier New;}{\f1\fnil\fcharset0 Calibri;}}
{\colortbl ;\red0\green0\blue255;}
{\*\generator Msftedit 5.41.21.2509;}\viewkind4\uc1\pard\f0\fs22 // ==UserScript==\par
// @name           Powertools the family\par
// @namespace      noobs\par
// @include        {\field{\*\fldinst{HYPERLINK "http://*.kingdomsofcamelot.com/*main_src.php*"}}{\fldrslt{\ul\cf1 http://*.kingdomsofcamelot.com/*main_src.php*}}}\f0\fs22\par
// @description    All Credits to George Jetson and all the rest. Thank You, Thank You Thank You!!!! All I did was change the colour of Global Chat...its not so vulgar(sorry) Remember this aint my work, I just changed one lil'peice of it, okay!\par
// @resource \tab    URL_CASTLE_BUT \tab\tab\tab{\field{\*\fldinst{HYPERLINK "http://i.imgur.com/MPlZr.png"}}{\fldrslt{\ul\cf1 http://i.imgur.com/MPlZr.png}}}\f0\fs22\par
// @resource \tab    URL_CASTLE_BUT_SEL \tab\tab{\field{\*\fldinst{HYPERLINK "http://i.imgur.com/XWR4B.png"}}{\fldrslt{\ul\cf1 http://i.imgur.com/XWR4B.png}}}\f0\fs22\par
// @resource \tab    URL_PROVINCE_MAP \tab\tab{\field{\*\fldinst{HYPERLINK "http://i.imgur.com/VE48b.png"}}{\fldrslt{\ul\cf1 http://i.imgur.com/VE48b.png}}}\f0\fs22\par
// ==/UserScript==\par
\par
var Version = '1.2';20110321\par
var Title = 'KOC Power Tools';\par
var DEBUG_BUTTON = true;\par
var DEBUG_TRACE = false;\par
var DEBUG_TRACE_DRAG = false;\par
var DEBUG_TRACE_AJAX = false;\par
var MAP_DELAY = 1500;\par
var DISABLE_POST_KNIGHT_SKILLS = false;\par
var DISABLE_POST_DEFENSES = false;\par
var ENABLE_TEST_TAB = true;\par
var SEND_ALERT_AS_WHISPER = false;\par
\par
var ENABLE_SEARCH_TAB = true;\par
var ENABLE_ALERT_TO_CHAT = true;\par
\par
var URL_CASTLE_BUT = GM_getResourceURL('URL_CASTLE_BUT');\par
var URL_CASTLE_BUT_SEL = GM_getResourceURL('URL_CASTLE_BUT_SEL');\par
var URL_PROVINCE_MAP = GM_getResourceURL('URL_PROVINCE_MAP');\par
var provMapCoords = \{imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39\};  \par
\par
if(document.getElementById("mod_comm_list2"))\par
\{ document.getElementById("mod_comm_list2").style.backgroundColor = '#99ccff';\}\par
if(document.getElementById("mod_comm_list1"))\par
\{ document.getElementById("mod_comm_list1").style.backgroundColor = '#EB4C4C';\}\par
\par
    \par
var Options = \{\par
  includeMarching:true,\par
  encRemaining : true,\par
  maxIdlePop   : false,\par
  srcSortBy    : 'level',\par
  srcMinLevel  : 1,\par
  srcMaxLevel  : 7,\par
  wildType     : 1,\par
  cityType     : 1,\par
  MightSrc     : 1,\par
  unownedOnly  : true,\par
  fixTower     : true,\par
  fixTower2    : true,\par
  fixMapDistance: true,\par
  fixMsgCount  : true,\par
  fixWarnZero  : true,\par
  fixPageNav   : true,\par
  enhanceARpts : true,\par
  allowAlterAR : true,\par
  enhanceMsging : true,\par
  ptWinIsOpen  : false,\par
  ptWinDrag    : false,\par
  ptWinPos     : \{\},\par
  enableFoodWarn : true,\par
  foodWarnHours : 4,\par
  lastVersion : null,\par
  hideOnGoto : true,\par
  currentTab : false,\par
  gmtClock : true,\par
  chatEnhance : true,\par
  fixKnightSelect : true,\par
  attackCityPicker : true,\par
  mapCoordsTop : true,\par
  dispBattleRounds : true,\par
  reportDeleteButton : true,\par
  alertConfig  : \{aChat:false, aPrefix:'** I\\'m being attacked! **', scouting:false, wilds:false, minTroops:1, spamLimit:10 \},\par
\};\par
\par
\par
var JSON;if(!JSON)\{JSON=\{\};\}(function()\{"use strict";function f(n)\{return n<10?'0'+n:n;\}if(typeof Date.prototype.toJSON!=='function')\{Date.prototype.toJSON=function(key)\{return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;\};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key)\{return this.valueOf();\};\}var cx=/[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g,escapable=/[\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g,gap,indent,meta=\{'\\b':'\\\\b','\\t':'\\\\t','\\n':'\\\\n','\\f':'\\\\f','\\r':'\\\\r','"':'\\\\"','\\\\':'\\\\\\\\'\},rep;function quote(string)\{escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a)\{var c=meta[a];return typeof c==='string'?c:'\\\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);\})+'"':'"'+string+'"';\}function str(key,holder)\{var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function')\{value=value.toJSON(key);\}if(typeof rep==='function')\{value=rep.call(holder,key,value);\}switch(typeof value)\{case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value)\{return'null';\}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]')\{length=value.length;for(i=0;i<length;i+=1)\{partial[i]=str(i,value)||'null';\}v=partial.length===0?'[]':gap?'[\\n'+gap+partial.join(',\\n'+gap)+'\\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;\}if(rep&&typeof rep==='object')\{length=rep.length;for(i=0;i<length;i+=1)\{k=rep[i];if(typeof k==='string')\{v=str(k,value);if(v)\{partial.push(quote(k)+(gap?': ':':')+v);\}\}\}\}else\{for(k in value)\{if(Object.hasOwnProperty.call(value,k))\{v=str(k,value);if(v)\{partial.push(quote(k)+(gap?': ':':')+v);\}\}\}\}v=partial.length===0?'\{\}':gap?'\{\\n'+gap+partial.join(',\\n'+gap)+'\\n'+mind+'\}':'\{'+partial.join(',')+'\}';gap=mind;return v;\}\}if(typeof JSON.stringify!=='function')\{JSON.stringify=function(value,replacer,space)\{var i;gap='';indent='';if(typeof space==='number')\{for(i=0;i<space;i+=1)\{indent+=' ';\}\}else if(typeof space==='string')\{indent=space;\}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number'))\{throw new Error('JSON.stringify');\}return str('',\{'':value\});\};\}if(typeof JSON.parse!=='function')\{JSON.parse=function(text,reviver)\{var j;function walk(holder,key)\{var k,v,value=holder[key];if(value&&typeof value==='object')\{for(k in value)\{if(Object.hasOwnProperty.call(value,k))\{v=walk(value,k);if(v!==undefined)\{value[k]=v;\}else\{delete value[k];\}\}\}\}return reviver.call(holder,key,value);\}text=String(text);cx.lastIndex=0;if(cx.test(text))\{text=text.replace(cx,function(a)\{return'\\\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);\});\}if(/^[\\],:\{\}\\s]*$/.test(text.replace(/\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]\{4\})/g,'@').replace(/"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?/g,']').replace(/(?:^|:|,)(?:\\s*\\[)+/g,'')))\{j=eval('('+text+')');return typeof reviver==='function'?walk(\{'':j\},''):j;\}throw new SyntaxError('JSON.parse');\};\}\}());\par
var JSON2 = JSON; \par
\par
\par
var Cities = \{\};\par
var Seed = unsafeWindow.seed;\par
var Tabs = \{\};\par
var currentName = 'Overview';\par
var mainPop;\par
var CPopUpTopClass = 'ptPopTop';\par
var KOCversion = null;\par
var ptStartupTimer = null;\par
\par
\par
function ptStartup ()\{\par
  clearTimeout (ptStartupTimer);\par
  if (unsafeWindow.ptLoaded)\par
    return;\par
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));\par
  if (metc.width==null || metc.width==0)\{\par
    ptStartupTimer = setTimeout (ptStartup, 1000);\par
    return;\par
  \}\par
  unsafeWindow.ptLoaded = Version;\par
  KOCversion = anticd.getKOCversion();\par
  logit ("KofC client version: "+ KOCversion);\par
  \par
  readOptions();\par
\par
//logit ('g_timeoff: '+ unsafeWindow.g_timeoff);\par
  Seed = unsafeWindow.seed;\par
  var styles = '.xtab \{padding-right: 5px; border:none; background:none; white-space:nowrap;\}\\\par
    .pthostile td \{ background:#FF4040; \}.ptfriendly td\{background:lightblue; \}.ptally td\{background:royalblue; \}\\\par
    .ptneutral td \{ background:#C8C8C8; \}.ptunaligned td \{ background:gold; \}\\\par
    .xtabBR \{padding-right: 5px; border:none; background:none;\}\\\par
    div.ptDiv \{background-color:#f0f0f0;\}\\\par
    table.ptTab tr td \{border:none; background:none; white-space:nowrap;\}\\\par
    table.ptTabPad tr td \{border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 4px;\}\\\par
    table.ptTabBR tr td \{border:none; background:none;\}\\\par
    table.ptTabLined tr td \{border:1px none none solid none;\}\\\par
    table.ptTabOverview tr td \{border:1px none none solid none; white-space:nowrap; padding: 1px 2px;  font-size:12px;\}\\\par
    table.ptTabOverview7 tr td \{border:1px none none solid none; white-space:nowrap; padding: 1px 2px;  font-size:11px;\}\\\par
    table.ptTabPad tr td.ptentry \{background-color:#ffeecc; padding-left: 8px;\}\\\par
    table.ptNoPad tr td \{border:none; background:none; white-space:nowrap; padding:0px\}\\\par
    .ptOddrow \{background-color:#eee\}\\\par
    .ptstat \{border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357\}\\\par
    .ptStatLight \{color:#ddd\}\\\par
    .ptentry \{padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;\}\\\par
    .ptErrText \{font-weight:bold; color:#600000\}\\\par
    .castleBut \{outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;\}\\\par
    .castleBut:hover \{border-size:3px; border-color:#000;\}\\\par
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner \{ border: none; \}\\\par
    .ptChatWhisper \{\}\\\par
    .ptChatAlliance \{background-color: #99ccff\}\\\par
    .ptChatGlobal \{background-color: #32CC99\}\\\par
    .ptChatIcon \{border: 3px inset red\}\\\par
    span.whiteOnRed \{padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold\}\\\par
    span.boldRed \{color:#800; font-weight:bold\}\\\par
    .castleButNon \{background-image:url("'+ URL_CASTLE_BUT +'")\}\\\par
    .castleButSel \{background-image:url("'+ URL_CASTLE_BUT_SEL +'")\}\\\par
    a.ptButton20 \{color:#ffff80\}\\\par
    hr.ptThin \{padding:0px; margin:0px\}\\\par
    input.pbSubtab \{cursor:pointer; width:10em; margin-right:15px;\}\\\par
    input.pbSubtabSel \{background-color:#444; color:white; font-weight:bold; cursor:none !important\}\\\par
    table.ptMainTab \{empty-cells:show; margin-top:5px \}\\\par
    table.ptMainTab tr td a \{color:inherit \}\\\par
    table.ptMainTab tr td   \{height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; \}\\\par
    table.ptMainTab tr td.spacer \{padding: 0px 4px;\}\\\par
    table.ptMainTab tr td.sel    \{font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed;\}\\\par
    table.ptMainTab tr td.notSel \{font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#1e66bd; color:white; border-color:black;\}\\\par
    tr.ptPopTop td \{ background-color:#dde; border:none; height: 21px;  padding:0px; \}\\\par
    tr.ptretry_ptPopTop td \{ background-color:#a00; color:#fff; border:none; height: 21px; padding:0px; \}\\\par
    .CPopup .CPopMain \{ background-color:#f8f8f8; padding:6px;\}\\\par
    .CPopup  \{border:3px ridge #666\} )';\par
      \par
  logit ("* KOCpowerTools v"+ Version +" Loaded");\par
  setCities();\par
\par
// TODO: Make sure WinPos is visible on-screen ?\par
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x))\{\par
//logit ( 'Options.ptWinPos: '+ inspect (Options.ptWinPos, 5, 1)); \par
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));\par
    Options.ptWinPos.x = c.x+4;\par
    Options.ptWinPos.y = c.y+c.height;\par
    saveOptions ();\par
  \}\par
  mainPop = new CPopup ('ptmain', Options.ptWinPos.x, Options.ptWinPos.y, 804,704, Options.ptWinDrag, \par
      function ()\{\par
        tabManager.hideTab();\par
        Options.ptWinIsOpen=false; \par
        saveOptions();\par
      \});\par
  \par
  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';\par
  TowerAlerts.init();\par
  MessageCounts.init ();\par
  MapDistanceFix.init ();\par
  WarnZeroAttack.init ();\par
  AllianceReports.init ();\par
  messageNav.init();\par
  PageNavigator.init ();\par
  ChatStuff.init ();\par
  AttackDialog.init();\par
  battleReports.init ();\par
  CoordBox.init ();\par
  tabManager.init (mainPop.getMainDiv());\par
  GMTclock.init ();\par
  AudioAlert.init();\par
  FoodAlerts.init();\par
  if (Options.ptWinIsOpen)\{\par
    mainPop.show (true);\par
    tabManager.showTab();\par
  \}\par
  window.addEventListener('unload', onUnload, false);\par
  \par
  if (Options.fixTower)\par
    TowerAlerts.enableFixTarget(true);\par
  if (Options.fixTower2)\par
    TowerAlerts.enableFixFalseReports(true);\par
\par
  TowerAlerts.setPostToChatOptions(Options.alertConfig);\par
  \par
  AddMainTabLink('Family', eventHideShow, mouseMainTab);\par
\}\par
\par
\par
function onUnload ()\{\par
  Options.ptWinPos = mainPop.getLocation();\par
  saveOptions();\par
\}\par
\par
\par
var knightRoles = [\par
  ['Foreman', 'politics', 'Pol'],\par
  ['Marshall', 'combat', 'Com'],\par
  ['Alchemystic', 'intelligence', 'Int'],\par
  ['Steward', 'resourcefulness', 'Res'],\par
];\par
\par
var CoordBox = \{\par
  init : function ()\{\par
    var t = CoordBox;\par
    t.boxDiv = searchDOM (document.getElementById('maparea_map'), 'node.className=="mod_coord"', 3, false);\par
    t.setEnable (Options.mapCoordsTop);\par
  \},\par
  setEnable : function (tf)\{\par
    var t = CoordBox;\par
    if (t.boxDiv == null)\par
      return;\par
    if (tf)\par
      t.boxDiv.style.zIndex = '100000';\par
    else\par
      t.boxDiv.style.zIndex = '10011';\par
  \}, \par
  isAvailable : function ()\{\par
    var t = CoordBox;\par
    return !(t.boxDiv==null);\par
  \}, \par
\}\par
\par
\par
var battleReports = \{\par
  init : function ()\{\par
    var t = battleReports; \par
    t.getReportDisplayFunc = new CalterUwFunc ('getReportDisplay', [['return s.join("")', 'var themsg=s.join(""); themsg=getReportDisplay_hook(themsg, arguments[1]); return themsg']]);\par
    unsafeWindow.getReportDisplay_hook = t.hook;\par
    t.getReportDisplayFunc.setEnable (true);\par
    t.renderBattleReportFunc = new CalterUwFunc ('MarchReport.prototype.renderBattleReport', [['return k.join("")', 'var themsg=k.join(""); themsg=renderBattleReport_hook(themsg, this.rslt); return themsg']]);\par
    unsafeWindow.renderBattleReport_hook = t.hook2;\par
    t.renderBattleReportFunc.setEnable (true);\par
    t.renderButtonsFunc = new CalterUwFunc ('MarchReport.prototype.generateBackButton', [[/return \\"(.*)\\"/i, 'var msg="$1"; return battleReports_hook3(msg, this.rptid);']]);\par
    unsafeWindow.battleReports_hook3 = t.generateBackButtonHook;\par
    t.renderButtonsFunc.setEnable (true);\par
    unsafeWindow.deleteAreport = t.e_deleteReport;\par
//setTimeout (function()\{logit('MarchReport.prototype.generateBackButton:\\n'+ unsafeWindow.MarchReport.prototype.generateBackButton.toString(), 3, 1)\}, 100);\par
  \},\par
\par
  isRoundsAvailable : function ()\{\par
    var t = battleReports; \par
    return t.getReportDisplayFunc.isAvailable();\par
  \},\par
  isDeleteAvailable : function ()\{\par
    var t = battleReports; \par
    return t.renderButtonsFunc.isAvailable();\par
  \},\par
  \par
    \par
  generateBackButtonHook : function (msg, rptid)\{\par
    if (!Options.reportDeleteButton)\par
      return msg;\par
    var delBut = msg.replace ('onclick=\\'', 'onclick=\\'deleteAreport('+ rptid +',false); ');\par
    delBut = delBut.replace (/<span>(.*)<\\/span>/, '<span>'+ unsafeWindow.g_js_strings.commonstr.deletetx +'</span>');\par
//logit ('DELBUT: '+ delBut);    \par
    return msg + delBut;\par
  \},  \par
\par
  e_deleteReport : function (rptid)\{\par
    var t = battleReports; \par
    t.ajaxDeleteMyReport (rptid);\par
  \},\par
    \par
  ajaxDeleteMyReport : function (rptid, isUnread, side, isCityReport, notify)\{\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.s0rids = rptid;\par
    params.s1rids = '';\par
    params.cityrids = '';\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        if (rslt.ok && isUnread)\{\par
          unsafeWindow.seed.newReportCount = parseInt(seed.newReportCount) - 1;\par
          unsafeWindow.messages_notify_bug()\par
        \}    \par
        if (notify)\par
          notify (rslt.errorMsg);\par
      \},\par
      onFailure: function () \{\par
        if (notify)\par
          notify ('AJAX ERROR');\par
      \},\par
    \});\par
  \},\par
  \par
  hook2 : function (msg, rslt)\{\par
    if (rslt.rnds && Options.dispBattleRounds)\{\par
      msg = msg.replace (/(Attackers.*?<span.*?)<\\/div>/im, '$1<BR>Rounds: '+ rslt.rnds +'</div>');\par
    \}\par
    return msg;\par
  \},\par
  hook : function (msg, rslt)\{\par
    if (rslt.rnds && Options.dispBattleRounds)\{\par
      msg = msg.replace (/(Attackers <span.*?)<\\/div>/im, '$1<BR>Rounds: '+ rslt.rnds +'</div>');\par
    \}\par
    return msg;\par
  \},\par
\}\par
\par
var anticd = \{\par
  isInited : false,\par
  KOCversion : '?',\par
  \par
  init: function ()\{\par
    if (this.isInited)\par
      return this.KOCversion;\par
    unsafeWindow.cm.cheatDetector.detect = eval ('function ()\{\}');\par
    var scripts = document.getElementsByTagName('script');\par
    for (var i=0; i<scripts.length; i++)\{\par
      if (scripts[i].src.indexOf('camelotmain') >=0)\{\par
        break; \par
      \}\par
    \}\par
    if (i<scripts.length)\{\par
      var m = scripts[i].src.match (/camelotmain-(.*).js/);  \par
      if (m)\par
        this.KOCversion = m[1];\par
    \}\par
    this.isInited = true;\par
    // more coming soon :) \par
  \},\par
  \par
  getKOCversion : function ()\{\par
    return this.KOCversion;\par
  \},\par
\}\par
anticd.init ();\par
\par
/***\par
<img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/avatars/25/m16.jpg'/>\par
<div class='content'>\par
  <div class='info'> \par
    <a  class='nm' onclick='Chat.viewProfile(this,9640194,false);return false;'>Lord Sasuke_of_leaf</a>\par
    <span class='time'>17:17</span>\par
  </div>\par
  <div class='clearfix'>\par
    <div class='tx'>\par
      if ur really bored try it\par
    </div>\par
  </div>\par
</div>\par
\par
\par
<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/avatars/25/f9.jpg">\par
<div class="content">\par
  <div class="info">\par
    <a class="nm" onclick="Chat.viewProfile(this,3813948,false);return false;">Lady Aerwyn</a>\par
    <b style="color: rgb(165, 102, 49); font-size: 9px;"> says to the alliance:</b> \par
    <span class="time">17:32</span>\par
  </div>\par
  <div class="clearfix">\par
    <div class="tx">\par
      ok, heading out to dinner with family... be back laters\par
    </div>\par
  </div>\par
</div>\par
\par
\par
WHISPER (chatDivContentHook) .....\par
\par
<img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/avatars/25/m1.jpg'/>\par
<div class='content'>\par
  <div class='info'>\par
    <a  class='nm' onclick='Chat.viewProfile(this,2282354,false);return false;'>Lord Jetson</a>\par
    <b style='color:#A56631;font-size:9px;'> whispers to you:</b> \par
    <span class='time'>17:46</span>\par
  </div>\par
  <div class='clearfix'>\par
    <div class='tx'>\par
      test\par
    </div>\par
  </div>\par
</div>\par
\par
\par
<div class="chatwrap clearfix direct">\par
  <img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/avatars/25/m1.jpg">\par
  <div class="content">\par
    <div class="info">\par
      <span class="nm">Lord Jetson</span>\par
      <b style="color: rgb(165, 102, 49); font-size: 9px;"> whispers to <a onclick="Chat.viewProfile(this,2282354); return false;" class="nm">jetson</a>:</b> \par
      <span class="time">20:47</span>\par
    </div>\par
    <div class="clearfix">\par
      <div class="tx">\par
        test\par
      </div>\par
    </div>\par
  </div>\par
</div>\par
****/\par
  \par
var ChatStuff = \{\par
  chatDivContentFunc : null,\par
  getChatFunc : null,\par
  \par
  init : function ()\{\par
    var t = ChatStuff; \par
    t.chatDivContentFunc = new CalterUwFunc ('Chat.chatDivContent', [['return e.join("");', 'var msg = e.join("");\\n msg=chatDivContent_hook(msg);\\n return msg;']]);\par
    unsafeWindow.chatDivContent_hook = t.chatDivContentHook;\par
    unsafeWindow.ptChatIconClicked = t.e_iconClicked;\par
    t.setEnable (Options.chatEnhance);\par
  \},\par
  \par
  isAvailable : function ()\{\par
    var t = ChatStuff; \par
    t.chatDivContentFunc.isAvailable ();\par
  \},\par
  \par
  setEnable : function (tf)\{\par
    var t = ChatStuff; \par
    t.chatDivContentFunc.setEnable (tf);\par
  \},\par
  \par
  e_iconClicked : function (name)\{\par
    var e = document.getElementById('mod_comm_input');\par
    e.value = '@'+ name +' ';\par
  \},\par
\par
  \par
// "Report No: 5867445"  --->  see unsafeWindow.modal_alliance_report_view()\par
      \par
  chatDivContentHook : function (msg)\{\par
    var t = ChatStuff; \par
    var class = '';\par
    var m = /div class='info'>.*<\\/div>/im.exec(msg);\par
    if (m == null)\par
      return msg;\par
    if (m[0].indexOf('whispers') >= 0)\par
      class = 'ptChatWhisper';\par
    else if (m[0].indexOf('to the alliance') >= 0)\par
      class = 'ptChatAlliance'; \par
    else  \par
      class = 'ptChatGlobal'; \par
    msg = msg.replace ("class='content'", "class='content "+ class +"'");\par
    \par
    \par
    if (msg.indexOf('claimAllianceChat')<0)\{\par
      msg = msg.replace (/([0-9]\{1,3\})\\s*(,|-)\\s*([0-9]\{1,3\})/img, '<A onclick=\\"ptGotoMap($1,$3)\\">$1$2$3</a>');\par
    \}\par
      \par
    var m = /(Lord|Lady) (.*?)</im.exec(msg);\par
    if (m != null)\par
      msg = msg.replace (/<img (.*?>)/img, '<A onclick=\\"ptChatIconClicked(\\''+ m[2] +'\\')\\"><img class=\\"ptChatIcon\\" $1</a>');\par
    return msg;\par
  \},\par
\}\par
\par
// useless :( ......\par
/***/\par
\par
/***\par
RSLT:\par
  (string) s0Kid = 57526\par
  (string) s1Kid = 35216\par
  (string) s1KLv = 1\par
  (number) s0KCombatLv = 0\par
  (string) s1KCombatLv = Higher\par
  (object) fght = [object Object]\par
    (object) s1 = [object Object]\par
      (array) u2 = 89000,89000\par
        (string) 0 = 89000\par
        (number) 1 = 89000\par
\par
      (array) u9 = 1000,1000\par
        (string) 0 = 1000\par
        (number) 1 = 1000\par
\par
\par
  (number) rnds = 3\par
  (number) winner = 1\par
  (number) wall = 100\par
  (number) s0atkBoost = 0\par
  (number) s0defBoost = 0\par
  (number) s1atkBoost = 0\par
  (number) s1defBoost = 0.2\par
  (boolean) conquered = false\par
  (array) loot = 111139,763000,643000,78000,138000\par
    (number) 0 = 111139\par
    (number) 1 = 763000\par
    (number) 2 = 643000\par
    (number) 3 = 78000\par
    (number) 4 = 138000\par
\par
  (string) errorMsg = Something has gone wrong! Please try again, or refresh if this message reappear\par
***/\par
/***/\par
function displayReport (rptid, side)\{\par
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
  params.rid = rptid;\par
  params.side = side;\par
  \par
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchReport.php" + unsafeWindow.g_ajaxsuffix, \{\par
    method: "post",\par
    parameters: params,\par
    onSuccess: function (rslt) \{\par
logit (inspect (rslt, 5, 1));      \par
      if (notify)\par
        notify (rslt.errorMsg);\par
    \},\par
    onFailure: function () \{\par
      if (notify)\par
        notify ('AJAX ERROR');\par
    \},\par
  \});\par
\} \par
/***/\par
\par
\par
/****************************  Wikia Tab   ******************************/\par
Tabs.wikia = \{\par
  tabOrder : 35,                    // order to place tab in top bar\par
  myDiv : null,\par
  timer : null,\par
  forumlink :  '{\field{\*\fldinst{HYPERLINK "http://koc.wikia.com/wiki/Kingdoms_of_Camelot_Wiki"}}{\fldrslt{\ul\cf1 http://koc.wikia.com/wiki/Kingdoms_of_Camelot_Wiki}}}\f0\fs22 ',  \par
  \par
  init : function (div)\{    // called once, upon script startup\par
    var t = Tabs.wikia;\par
    t.myDiv = div;\par
    div.innerHTML = '<CENTER><iframe src="'+ t.forumlink +'" width="100%" height="550" name="board_in_a_box" <p>Ihr Browser kann leider keine eingebetteten Frames anzeigen: Sie k&ouml;nnen die eingebettete Seite &uuml;ber den folgenden Verweis aufrufen: <a href="'+ t.forumlink +'">Knights of Phoenix Forum</a></p> </iframe> <BR></center>';\par
  \},\par
  \par
  hide : function ()\{         // called whenever the main window is hidden, or another tab is selected\par
    var t = Tabs.wikia;\par
    mainPop.div.style.width = 750 + 'px';\par
  \},\par
  \par
  show : function ()\{         // called whenever this tab is shown\par
    var t = Tabs.wikia;\par
    mainPop.div.style.width = 1000 + 'px';\par
  \},\par
\}\par
\par
\par
\par
\par
/*************** WILDS TAB *********************/\par
\par
var wildNames = \{\par
   0: 'Bog',\par
  10: 'Grassland',\par
  11: 'Lake',\par
  20: 'Woods',\par
  30: 'Hills',\par
  40: 'Mountain',\par
  50: 'Plain',\par
\};\par
\par
var mercNames = \{\par
  0: 'None',\par
  1: 'Novice',\par
  2: 'Intermediate',\par
  3: 'Veteran',\par
\};\par
\par
Tabs.Wilds = \{\par
  tabOrder : 35,\par
\par
  cont : null,\par
//  state : null,\par
  upGoldTimer : null,\par
  wildList : [],\par
  buildList : \{\},\par
  \par
  init : function (div)\{\par
    var t = Tabs.Wilds;\par
    t.cont = div;\par
    unsafeWindow.ptButMaxTraps = t.e_butMaxTraps;\par
    unsafeWindow.ptInpWildTraps = t.e_inpTraps;\par
    unsafeWindow.ptButWildSet = t.e_butWildSet;\par
    t.cont.innerHTML = '<DIV id=wildContent style="maxheight:665px; height:665px; overflow-y:auto">';\par
//    t.show ();\par
  \},\par
\par
  hide : function ()\{\par
    var t = Tabs.Wilds;\par
    clearTimeout (t.upGoldTimer);\par
  \},\par
  \par
  show : function ()\{\par
    var t = Tabs.Wilds;\par
    clearTimeout (t.upGoldTimer);\par
    \par
    m = '<CENTER>'+ strButton20('RESET', 'id=ptwref') +'</center><TABLE cellspacing=0 cellpadding=0 class=ptTabPad align=center>';\par
    for (var c=0; c<Cities.numCities; c++)\{\par
      var city = Cities.cities[c];\par
      var cWilds = Seed.wilderness['city'+city.id];\par
      t.wildList[c] = []; \par
      var castle = parseInt(Seed.buildings['city'+ city.id].pos0[1]);\par
      var totw = 0;\par
      if (matTypeof(cWilds)=='object')\{\par
        for (var k in cWilds)\par
          ++totw;\par
      \}       \par
      m += '<TR><TD colspan=20><DIV class=ptstat><TABLE class=ptNoPad width=100%><TR><TD width=100></td><TD width=90% align=center>'+ city.name \par
        +' &nbsp; ('+ city.x +','+ city.y +')</td><TD width=100 align=right>Wilds: '+ totw +' of '+ castle +' &nbsp; </TD></tr></table></div></td></tr>';\par
      var row = 0;  \par
      var sortem = [];\par
\par
      if (matTypeof(cWilds) != 'array') \{\par
        m += '<TR style="background-color:white; font-weight:bold;" align=right><TD align=left>Wild Type</td><TD></td><TD align=left>Coords</td><TD>Traps</td><TD align=left>Mercenaries</td>\\\par
         <TD width=15></td><TD colspan=3 class=entry>'+ htmlTitleLine(' CHANGE DEFENSES ') +'</td></tr>';\par
        for (var k in Seed.wilderness['city'+city.id])\par
          sortem.push (Seed.wilderness['city'+city.id][k]);\par
        sortem.sort (function (a,b)\{\par
          var x; if ((x = b.tileLevel-a.tileLevel)!=0) \par
            return x; \par
          return a.tileType-b.tileType;\par
        \});\par
        for (i=0; i<sortem.length; i++)\{\par
          var wild = sortem[i]; \par
          var wildDef = Seed.wildDef['t'+wild.tileId];\par
          if (wildDef==undefined || !wildDef)\par
            wildDef = \{fort60Count:0, mercLevel:0\};\par
          var maxTraps = parseInt(wild.tileLevel)*100;\par
          var maxBuild = maxTraps - parseInt(wildDef.fort60Count);\par
          t.wildList[c][i] = [wild.tileId, maxBuild];          \par
          m += '<TR align=right'+ (row++%2?'':' class=ptOddrow') +'><TD align=left>'+ wildNames[wild.tileType] +'</td>\\\par
            <TD>'+ wild.tileLevel +'</td><TD align=center><A onclick="ptGotoMap('+ wild.xCoord +','+ wild.yCoord +')">'+ wild.xCoord +','+ wild.yCoord +'</a></td>\\\par
            <TD align=right><B>'+ wildDef.fort60Count +'</b></td><TD align=center><B>'+ mercNames[wildDef.mercLevel] +'</b></td>\\\par
            <TD></td><TD align=left class=ptentry><B>Build Traps:</b> <INPUT onchange="ptInpWildTraps(this)" id=ptwt_'+ c +'_'+ i \par
              + (maxBuild==0?' DISABLED ':'')+' style="margin:0px; padding:0px" type=text size=3 maxlength=4></td>'\par
          if (wildDef.fort60Count < maxTraps)\par
            m += '<TD class=ptentry style="padding:0px">'+ strButton14('Max', 'id=ptwx_'+ c +'_'+ i +' onclick="ptButMaxTraps(this)"') +'</td>';\par
          else\par
            m += '<TD class=ptentry></td>';\par
          m += '<TD class=ptentry> &nbsp; &nbsp; <B>Mercs:</b> ' + htmlSelector(mercNames, wildDef.mercLevel, 'id=ptwm_'+ c +'_'+ i) +' &nbsp; &nbsp; </td></tr>';\par
        \}\par
        m += '<TR><TD colspan=6></td><TD class=ptentry align=center colspan=3><TABLE><TR><TD width=40% align=left>Cost: <SPAN id=ptwgc_'+ c +'>0</span></td>\\\par
            <TD width=10%>'+ strButton20("SET DEFENSES", 'onclick="ptButWildSet('+ c +')"') +'<TD width=40% align=right>Gold: <SPAN id=ptwgt_'+ c +'>0</span></td></td></tr></table></td></tr>';\par
      \} else \{\par
        m+= '<TR><TD colspan=9> &nbsp; </td></tr>';\par
      \}         \par
    \}\par
    document.getElementById('wildContent').innerHTML = m + '</table></div>';\par
    document.getElementById('ptwref').addEventListener ('click', t.show, false);\par
    t.updateGold ();\par
  \},\par
    \par
  e_butWildSet : function (c)\{\par
    var t = Tabs.Wilds;\par
    var totTraps = 0;  \par
    var cid = Cities.cities[c].id;\par
    t.buildList = \{cityId:cid, list:[]\};\par
          \par
    for (var w=0; w<t.wildList[c].length; w++)\{\par
      var wild = Seed.wilderness['city'+cid]['t'+t.wildList[c][w][0]]; \par
      var wildDef = Seed.wildDef['t'+t.wildList[c][w][0]];\par
// TODO: Seed.wildDef is null if just aquired \par
if (wildDef==undefined || !wildDef)\par
  wildDef = \{fort60Count:0, mercLevel:0\};\par
    \par
      var numTraps = parseInt(document.getElementById('ptwt_'+ c +'_'+ w).value, 10);\par
      if (isNaN(numTraps))\par
        numTraps = 0;\par
      totTraps += numTraps;\par
      if (numTraps > 0)\par
        t.buildList.list.push (['T', wild.tileId, numTraps]);\par
      var mercId =document.getElementById('ptwm_'+ c +'_'+ w).value; \par
      if (wildDef.mercLevel != mercId)\par
        t.buildList.list.push (['M', wild.tileId, mercId, wildDef.mercLevel]);\par
    \}\par
\par
    var totCost = totTraps * 200; \par
    if (totCost > parseInt(Seed.citystats['city'+cid].gold[0]))\{\par
      document.getElementById('ptwgc_'+ c).innerHTML = '<SPAN class=boldRed>'+ addCommasInt(totCost) +'</span>';\par
      return; \par
    \}\par
    if (t.buildList.list.length == 0)\par
      return;\par
    t.setCurtain (true);\par
    var popDiv = t.setPopup (true);\par
    popDiv.innerHTML = '<TABLE class=ptTab width=100% height=100%><TR><TD>\\\par
          <DIV class=ptstat>Setting Wilderness Defenses</div>\\\par
          <DIV id=ptWildBuildDiv class=ptDiv style="padding:10px; height:225px; max-height:225px; overflow-y:auto"></div>\\\par
          </td></tr><TR><TD align=center>'+ strButton20('CANCEL', 'id=ptWildCancel') +'</td></tr></table>';\par
    document.getElementById('ptWildCancel').addEventListener('click', t.e_buildCancel, false);\par
    t.processQue(null);  \par
  \},\par
  \par
  e_buildCancel : function ()\{\par
    var t = Tabs.Wilds;\par
    t.setCurtain(false);\par
    t.setPopup(false);\par
    t.show();\par
  \},\par
  \par
  processQue : function (errMsg)\{\par
    var t = Tabs.Wilds;\par
    var what = t.buildList.list.shift();\par
    var div = document.getElementById('ptWildBuildDiv');\par
    if (what==null || errMsg)\{\par
      if (errMsg)\par
        div.innerHTML += '<BR><SPAN style="white-space:normal;" class=boldRed>ERROR: '+ errMsg +'</span>';\par
      else\par
        div.innerHTML += 'Done.<BR>';\par
      document.getElementById('ptWildCancel').firstChild.innerHTML = 'CLOSE'; \par
      return;\par
    \}\par
    if (div.innerHTML != '')\par
      div.innerHTML += 'Done.<BR>';\par
    var wild = Seed.wilderness['city'+ t.buildList.cityId]['t'+what[1]];\par
    if (what[0] == 'T')\{\par
      div.innerHTML += 'Building '+ what[2] +' traps for '+ Cities.byID[t.buildList.cityId].name +'\\'s wilderness at '+ wild.xCoord +','+ wild.yCoord +' ... ';\par
      t.postBuyTraps (t.buildList.cityId, what[1], what[2], t.processQue);\par
    \} else \{\par
      div.innerHTML += 'Setting Mercenaries to '+ mercNames[what[2]] +' for '+ Cities.byID[t.buildList.cityId].name +'\\'s wilderness at '+ wild.xCoord +','+ wild.yCoord +' ... ';\par
      t.postHireMercs (t.buildList.cityId, what[1], what[2], what[3], t.processQue);\par
    \}\par
  \},\par
  \par
  setPopup : function (onoff)\{\par
    var t = Tabs.Wilds;\par
    if (onoff)\{\par
      var div = document.createElement('div');\par
      div.id = 'ptWildPop';\par
      div.style.backgroundColor = '#fff';\par
      div.style.zindex = mainPop.div.zIndex+2;\par
      div.style.opacity = '1';\par
      div.style.border = '3px outset red';\par
      div.style.width = '550px';\par
      div.style.height = '300px';\par
      div.style.display = 'block';\par
      div.style.position = 'absolute';\par
      div.style.top = '100px';\par
      div.style.left = '100px';\par
      t.cont.appendChild (div);\par
      return div;\par
    \} else \{\par
      t.cont.removeChild (document.getElementById('ptWildPop'));\par
    \}\par
  \},\par
\par
  setCurtain : function (onoff)\{\par
    var t = Tabs.Wilds;\par
    if (onoff)\{\par
      var off = getAbsoluteOffsets (t.cont);\par
      var curtain = document.createElement('div');\par
      curtain.id = 'ptWildCurtain';\par
      curtain.style.zindex = mainPop.div.zIndex+1;\par
      curtain.style.backgroundColor = "#000000";\par
      curtain.style.opacity = '0.5';\par
      curtain.style.width = t.cont.clientWidth +'px';\par
      curtain.style.height = t.cont.clientHeight +'px';\par
      curtain.style.display = 'block';\par
      curtain.style.position = 'absolute';\par
      curtain.style.top = off.top + 'px';\par
      curtain.style.left = off.left + 'px';\par
      t.cont.appendChild (curtain);\par
    \} else \{\par
      t.cont.removeChild (document.getElementById('ptWildCurtain'));\par
    \}\par
  \},\par
  \par
  e_butMaxTraps : function (e)\{\par
    var t = Tabs.Wilds;\par
    var c = e.id.substr(5,1);\par
    var w = e.id.substr(7);\par
    var inp = document.getElementById('ptwt_'+ c +'_'+ w);\par
    inp.value = t.wildList[c][w][1];\par
    t.e_inpTraps (inp);\par
  \},\par
  \par
  e_inpTraps : function (e)\{\par
    var t = Tabs.Wilds;\par
    var c = e.id.substr(5,1);\par
    var w = e.id.substr (7);\par
    var tot = 0;\par
    for (var i=0; i<t.wildList[c].length; i++) \{\par
      var val = parseInt(document.getElementById('ptwt_'+ c +'_'+ i).value, 10);\par
      if (isNaN(val))\par
        val = 0;\par
      tot += val;\par
    \}  \par
    document.getElementById('ptwgc_'+ c).innerHTML = addCommasInt(tot * 200);\par
    if (isNaN(e.value) || e.value<0 || e.value>t.wildList[c][w][1])\{\par
      e.value = '';\par
      e.style.backgroundColor = '#ffaaaa'; \par
    \} else\par
      e.style.backgroundColor = null; \par
  \},\par
\par
  updateGold : function ()\{\par
    var t = Tabs.Wilds;\par
    for (var c=0; c<Cities.numCities; c++)\{\par
      var e = document.getElementById('ptwgt_'+ c +'');\par
      if (e)\par
        e.innerHTML = addCommasInt(Seed.citystats['city'+Cities.cities[c].id].gold[0]);\par
    \}\par
    t.upGoldTimer = setTimeout (t.updateGold, 2000);\par
  \},\par
  \par
  postBuyTraps : function (cid, tid, quant, notify)\{\par
    if (DISABLE_POST_DEFENSES)\{\par
      setTimeout (function ()\{notify(null)\}, 1500);\par
      return;\par
    \}\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.cid = cid;\par
    params.tid = tid;\par
    params.quant = quant;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/buyWildTraps.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        if (rslt.ok)\{\par
          if (!Seed.wildDef["t"+ tid])\par
            Seed.wildDef["t"+ tid] = \{tileId:tid, fort60Count:0, mercLevel:0\};\par
          Seed.wildDef["t"+ tid].fort60Count = parseInt(Seed.wildDef["t"+ tid].fort60Count) + parseInt(quant);\par
        \}  \par
        if (notify)\par
          notify (rslt.errorMsg);\par
      \},\par
      onFailure: function () \{\par
        if (notify)\par
          notify ('AJAX ERROR');\par
      \},\par
    \});\par
  \},\par
\par
  postHireMercs : function (cid, tid, newLevel, oldLevel, notify)\{\par
    if (DISABLE_POST_DEFENSES)\{\par
      setTimeout (function ()\{notify('OK, so it\\'s not really an error, it\\'s just George playing around to see how the error message looks. It\\'s a long one, how does it fit? Is it OK? Are you sure? JANE! Get me off of this thing!')\}, 1500);\par
      return;\par
    \}\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.cid = cid;\par
    params.tid = tid;\par
    params.lv = newLevel;\par
    params.olv = oldLevel;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/hireWildMerc.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        if (rslt.ok)\{\par
          if (!Seed.wildDef["t"+ tid])\par
            Seed.wildDef["t"+ tid] = \{tileId:tid, fort60Count:0, mercLevel:0\};\par
          Seed.wildDef["t"+ tid].mercLevel = newLevel;\par
        \}\par
        if (notify)\par
          notify (rslt.errorMsg);\par
      \},\par
      onFailure: function () \{\par
        if (notify)\par
          notify ('AJAX ERROR');\par
      \},\par
    \});\par
  \},\par
          \par
\}    \par
 \par
   \par
/*************** KNIGHTS TAB *********************/\par
Tabs.Knights = \{\par
  tabOrder : 30,\par
  cont : null,\par
  displayTimer : null,\par
\par
  init : function (div)\{\par
    var t = Tabs.Knights;\par
    t.cont = div;\par
    unsafeWindow.ptAssignSkill = t.clickedAssignPoints;\par
    t.cont.innerHTML = '<STYLE>table.ptTabPad tr.ptwpad \{background-color:#ffffff; padding-left:15px\}</style>\\\par
       <DIV id=ptknightdiv style="max-height:660px; height:660px; overflow-y:auto">';\par
  \},\par
\par
  hide : function ()\{\par
    var t = Tabs.Knights;\par
    clearTimeout (t.displayTimer);\par
  \},\par
\par
  show : function ()\{\par
    var t = Tabs.Knights;\par
    clearTimeout (t.displayTimer);\par
    \par
    function _dispKnight (roleId, knight)\{\par
      var rid = roleId;\par
      if (roleId==null)\par
        rid = 1;\par
      var sty='';  \par
      if (row++ % 2)\par
        sty = 'class=ptOddrow ';        \par
      m = '<TR '+ sty +'valign=top align=right><TD><B>'+ (roleId==null ? '':knightRoles[rid][0]) +'</b></td><TD align=left>';\par
      if (knight == null) \{\par
        m += '--------</td><TD colspan=4></td><TD class=ptentry colspan=5></td><TD colspan=2></td></tr>';\par
      \} else \{\par
        var level = parseInt(Math.sqrt(parseInt(knight.experience) / 75)) + 1;\par
        var unpoints = level - parseInt(knight.skillPointsApplied);\par
        var salary = (parseInt(knight.skillPointsApplied) + 1) * 20;\par
        totSalary += salary;\par
        var ass = '';\par
        if (knight.knightStatus == 10)\{\par
          ass = '<TD class=ptentry align=left colspan=4>Marching</td>';\par
        \} else \{  \par
          if (unpoints > 0)\{\par
            unpoints = '<SPAN class="boldRed">'+ unpoints +'</span>';\par
          for (var i=0; i<4; i++)\{\par
            var sty = 'padding-left:1px;';\par
            if (i == rid)   // bold it\par
              sty += 'font-weight:bold;color:#116654';\par
            ass += '<TD class=ptentry align=left style="'+ sty +'" ><A style="'+ sty +'" onclick="ptAssignSkill(this,' + cid +','+ knight.knightId +','+ i +')">['+ knightRoles[i][2] +'] &nbsp;</a></td>'; \par
          \}\par
          \} \par
          else\par
            ass = '<TD class=ptentry colspan=4></td>';\par
        \}  \par
        var skills = [];\par
        for (var i=0; i<4; i++)\{\par
          if (i == rid)\par
            skills[i] = '<B>'+ knight[knightRoles[i][1]] +'</b>'; \par
          else\par
            skills[i] = knight[knightRoles[i][1]]; \par
        \}          \par
        m += knight.knightName + '</td><TD>'+ skills[0] +'</td><TD>'+ skills[1] +'</td><TD>'+ skills[2] +'</td><TD>' + skills[3]\par
          +'</td><TD class=ptentry>'+ unpoints +'</td>'+ ass +'<TD>'+ addCommas(salary) \par
          +'</td><TD>'+ level +'</td></tr>';\par
      \}\par
      return m;\par
    \}          \par
    \par
    var totSalary = 0;\par
    var m = '<TABLE cellspacing=0 align=center class=ptTabPad><TBODY>';\par
    for (var c=0; c<Cities.numCities; c++) \{\par
      var cid = Cities.cities[c].id;\par
      m += '<TR><TD colspan=13><DIV class=ptstat>'+ Cities.cities[c].name +'</div></td></tr>\\\par
          <TR class=ptwpad style="font-weight:bold" align=right><TD width=70>Role</td><TD width=160 align=center>Name</td><TD width=26>Pol</td><TD width=26>Com</td>\\\par
          <TD width=26>Int</td><TD width=26>Res</td><TD width=90 align=center colspan=5>--- Unassigned ---</td><TD width=40 align=right> Salary </td><TD width=35>Level</td></tr>';\par
      totSalary = 0;\par
      var did = \{\}; \par
      var row = 0;\par
      for (var i=0; i<knightRoles.length; i++)\{\par
        var leader = Seed.leaders['city'+cid][knightRoles[i][1]+'KnightId'];\par
        if (leader == 0)\par
          m += _dispKnight (i, null);\par
        else \{\par
          m += _dispKnight (i, Seed.knights['city'+cid]['knt'+leader]);\par
          did['knt'+leader] = true;\par
        \}\par
      \}\par
      var list = [];\par
      for (k in Seed.knights['city'+cid])\{\par
        if (!did[k])\par
          list.push (Seed.knights['city'+cid][k]);\par
      \}\par
      list.sort (function (a,b)\{return parseInt(b.combat)-parseInt(a.combat)\});\par
      for (i=0; i<list.length; i++)\par
        m += _dispKnight (null, list[i]);\par
      m += '<TR align=right><TD colspan=11><B>Total Salary:</b></td><TD>'+ addCommas(totSalary) +'</td></tr>';        \par
    \}\par
    document.getElementById('ptknightdiv').innerHTML = m +'</tbody></table></div>';\par
    t.displayTimer = setTimeout (t.show, 10000);\par
  \},\par
\par
\par
  clickedAssignPoints : function (e, cid, kid, rid)\{\par
    var t = Tabs.Knights;\par
    clearTimeout (t.displayTimer);\par
      \par
    var knight = Seed.knights['city'+cid]['knt'+kid];\par
    if (knight.knightStatus == 10)\{\par
      var row = e.parentNode.parentNode;\par
      row.childNodes[7].innerHTML = 'Marching';\par
      return; \par
    \}\par
    sk = [];\par
    var unassigned = parseInt(Math.sqrt(parseInt(knight.experience)/75)) + 1  - parseInt(knight.skillPointsApplied);        \par
    for (var i=0; i<4; i++)\{\par
      sk[i] = parseInt(knight[knightRoles[i][1]]);\par
      if (i == rid)\par
        sk[i] += unassigned;\par
    \}\par
    var row = e.parentNode.parentNode;\par
    for (i=row.cells.length-1; i>=1; i--)\par
      row.deleteCell (i);\par
    var newCell=row.insertCell(-1);\par
    newCell.colSpan = 12;\par
    newCell.align= 'left';\par
    newCell.style.padding='1px 5px 1px 10px';\par
    var div = document.createElement ('div');\par
    div.style.backgroundColor = '#ffffff';\par
    div.style.textAlign = 'center';\par
    div.style.border = '1px solid';\par
    div.style.width = '98%';\par
    div.style.whiteSpace = 'normal';\par
    newCell.appendChild (div);\par
    div.innerHTML = 'Assigning '+ unassigned +' skill points to '+ knightRoles[rid][1] +' ... ';\par
    t.postSkillPoints (cid, kid, sk[0], sk[1], sk[2], sk[3], function (r)\{t.postDone(r, div)\});  \par
  \},\par
  \par
  postDone : function (rslt, div)\{\par
    var t = Tabs.Knights;\par
    clearTimeout (t.displayTimer);\par
    if (rslt.ok)\{\par
      div.innerHTML += '<B>Done.</b>';\par
      t.displayTimer = setTimeout (t.show, 5000);\par
    \} else \{\par
      div.innerHTML += '<BR><SPAN class=boldRed>ERROR: '+ rslt.errorMsg +'</span>';\par
      t.displayTimer = setTimeout (t.show, 10000);\par
    \}\par
  \},\par
  \par
  postSkillPoints : function (cid, kid, pol, com, int, res, notify)\{  \par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.cid = cid;\par
    params.kid = kid;\par
    params.p = pol;\par
    params.c = com;\par
    params.i = int;\par
    params.r = res;\par
    if (DISABLE_POST_KNIGHT_SKILLS)\{   \par
      setTimeout (function ()\{notify(\{ok:true\})\}, 1500);    \par
//      setTimeout (  function ()\{notify(\{ok:false, errorMsg:"FAKE ERROR message, a long one, to test how it will fit and overflow! Perhaps you'll need to retry?"\})\}  , 2000);    \par
      return;  \par
    \}\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/skillupKnight.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        if (rslt.ok) \{\par
          var knight = Seed.knights["city" + cid]["knt" + kid];\par
          var up = pol + com + int + res - knight.politics - knight.combat - knight.intelligence - knight.resourcefulness;\par
          knight.politics = pol;\par
          knight.combat = com;\par
          knight.intelligence = int;\par
          knight.resourcefulness = res;\par
          knight.skillPointsApplied = (parseInt(knight.skillPointsApplied) + up).toString();\par
        \} \par
        if (notify)\par
          notify (rslt);\par
      \},\par
      onFailure: function () \{\par
        if (notify)\par
          notify (rslt);\par
      \},\par
    \});\par
  \},\par
\};\par
\par
\par
/**************/\par
\par
var messageNav = \{\par
  mmFunc : null,\par
  mmsFunc : null,\par
  \par
  init : function ()\{\par
    t = messageNav;\par
    t.mmFunc = new CalterUwFunc ('modal_messages', [[/\}\\s*$/, 'setTimeout(messageNav_hook,0); \}']]);\par
    t.mmsFunc = new CalterUwFunc ('modal_messages_send', [[/\{\\s*var params/i, '\{\\nif (modal_messages_send_hook()) return;\\nvar params']]);\par
    unsafeWindow.messageNav_hook = messageNav.hook;\par
    unsafeWindow.modal_messages_send_hook = messageNav.msgSendHook;\par
    t.mmFunc.setEnable (true);\par
    t.mmsFunc.setEnable (true);\par
  \},\par
\par
  setEnable : function (tf)\{\par
  \},\par
\par
  isAvailable : function ()\{\par
    t = messageNav;\par
    return t.mmFunc.isAvailable();\par
  \},\par
  \par
      \par
  hook : function ()\{\par
    if (!Options.enhanceMsging)\par
      return;\par
    var div = document.getElementById('modal_msg_view_actions');\par
    var but = makeButton20('Forward');\par
    div.appendChild (but);\par
    but.addEventListener ('click', messageNav.eventForward, false);\par
    div = document.getElementById('modal_msg_write_to').parentNode;\par
    div.innerHTML = '<TABLE><TR><TD class=xtab><b>To:</b> <INPUT type=text id=modal_msg_write_to></td><TD class=xtab><SPAN id=ptfwdbut></span></td></tr></table>';\par
    var button = makeButton20('All Officers');\par
    document.getElementById('ptfwdbut').appendChild (button);\par
    button.addEventListener ('click', function ()\{document.getElementById("modal_msg_write_to").value = "<officers>"\}, false);\par
  \},\par
\par
  eventForward : function ()\{\par
    document.getElementById('modal_msg_write_subj').value = "fwd: " + document.getElementById('modal_msg_view_subj').innerHTML.toString().stripTags();\par
    document.getElementById('modal_msg_write_to').value = '';\par
    var from = document.getElementById('modal_msg_view_from').children[0].innerHTML;\par
    var body = document.getElementById('modal_msg_view_body').innerHTML.replace(/\\n/g, '').replace(/<br>/gi, '\\n').stripTags().replace (/back$/i, '');\par
    document.getElementById('modal_msg_write_txt').value = '[Original message from '+ from +' follows:]\\n'+ body;\par
    unsafeWindow.modal_messages_compose();\par
  \},\par
\par
  msgSendHook : function ()\{\par
    if (!Options.enhanceMsging)\par
      return;\par
    var to = document.getElementById("modal_msg_write_to").value.trim();\par
    if (to.toLowerCase() != '<officers>' || getMyAlliance()[0]==0)\par
      return false;\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.toIds = getMyAlliance()[0];\par
    params.subject = document.getElementById("modal_msg_write_subj").value +' [Sent to all officers]';\par
    params.message = document.getElementById("modal_msg_write_txt").value;\par
    params.type = 'alliance';\par
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendMessage.php" + unsafeWindow.g_ajaxsuffix, \{\par
        method: "post",\par
        parameters: params,\par
        onSuccess: function (message) \{\par
            var rslt = eval("(" + message.responseText + ")");\par
            if (rslt.ok) \{\par
                unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.msgsent);\par
                document.getElementById('modal_msg_write_to').value = "";\par
                document.getElementById('modal_msg_write_subj').value = "";\par
                document.getElementById('modal_msg_write_txt').value = ""\par
            \} else \{\par
                unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.enterexistingname)\par
            \}\par
        \},\par
        onFailure: function () \{\par
          unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.oopscompose)\par
        \},\par
    \});\par
    return true;\par
  \},\par
\}\par
\par
\par
var AttackDialog = \{\par
  init : function ()\{\par
    var t = AttackDialog;\par
    t.modal_attackFunc = new CalterUwFunc ('modal_attack', [[/\}\\s*$/, 'attackDialog_hook(); \}']]);\par
    unsafeWindow.attackDialog_hook = t.modalAttackHook;\par
    t.modal_attackFunc.setEnable (true);\par
  \},\par
  \par
  setEnable : function ()\{\par
  \},\par
\par
  isKnightSelectAvailable : function ()\{\par
    var t = AttackDialog;\par
    return t.modal_attackFunc.isAvailable();\par
  \},\par
  isAttackCityPickerAvailable : function ()\{\par
    var t = AttackDialog;\par
    return t.modal_attackFunc.isAvailable();\par
  \},\par
    \par
  modalAttackHook : function ()\{\par
    var t = AttackDialog;\par
    if (Options.fixKnightSelect || Options.attackCityPicker)\{\par
      for (var i=1; i<6; i++)\par
        document.getElementById('modal_attack_tab_'+ i).addEventListener('click', t.e_changeMarchType, false);\par
    \}\par
    if (Options.attackCityPicker)\{\par
      setTimeout (t.initCityPicker, 0);\par
    \}      \par
  \},\par
  \par
  initCityPicker : function ()\{\par
    var t = AttackDialog;\par
    var div = document.getElementById('modal_attack_target_numflag'); // as of KofC version 96;\par
    var mySpan;\par
    if (div) \{\par
      div.parentNode.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';\par
    \} else \{\par
      var span = document.getElementById('modal_attack_target_coords');   // KofC version 116+;\par
      span.parentNode.parentNode.firstChild.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';\par
    \}\par
    new CdispCityPicker ('ptatp', document.getElementById('modal_attack_citybuts'), false, t.e_CityButton);\par
    var cityIdx = Cities.byID[unsafeWindow.currentcityid].idx;\par
    thisCityBut = document.getElementById('ptatp_'+ cityIdx);\par
    thisCityBut.style.opacity = '0.5';\par
    thisCityBut.disabled = true;\par
    if (document.getElementById('modal_attack_tab_4').className=='selected' || document.getElementById('modal_attack_tab_3').className=='selected')   // don't do for attack or scout\par
      document.getElementById('modal_attack_citybuts').style.display = 'none';\par
  \},\par
  \par
  e_CityButton : function (city)\{\par
    document.getElementById('modal_attack_target_coords_x').value = city.x;\par
    document.getElementById('modal_attack_target_coords_y').value = city.y;\par
    unsafeWindow.modal_attack_update_time();\par
  \},\par
      \par
  e_changeMarchType : function (evt)\{\par
    var t = AttackDialog;\par
    var marchType = parseInt(evt.target.id.substr(17));  \par
    if (Options.attackCityPicker)\{\par
      if (marchType==3 || marchType==4)\par
        document.getElementById('modal_attack_citybuts').style.display = 'none';\par
      else\par
        document.getElementById('modal_attack_citybuts').style.display = 'inline';\par
    \}\par
    if (Options.fixKnightSelect)\{\par
      var knightVal = 0;\par
      var selector = document.getElementById('modal_attack_knight'); \par
      if (selector.length>1 && (marchType==4 || marchType==2))   // if 'attack' or 'reinforce'\par
        knightVal = 1;\par
      selector.selectedIndex = knightVal;\par
    \}\par
  \},  \par
\}\par
\par
\par
var AllianceReports = \{\par
  checkPeriod : 300,\par
  allianceNames : [],\par
  saveArfunc : unsafeWindow.allianceReports,\par
\par
  init : function ()\{\par
    t = AllianceReports;\par
    t.enable (Options.enhanceARpts);\par
    t.marvFunc = new CalterUwFunc ('modal_alliance_report_view', [['getReportDisplay', 'getReportDisplay_hook2']]);\par
    unsafeWindow.getReportDisplay_hook2 = t.getReportDisplayHook;\par
    t.marvFunc.setEnable (true);\par
  \},\par
   \par
  getReportDisplayHook : function (a, b)\{\par
    var x = '';\par
    try \{\par
      x = unsafeWindow.getReportDisplay(a,b);  \par
    \} catch (e)\{\par
      x = 'Error formatting report: '+ e;\par
    \}\par
    return x;\par
  \},\par
  \par
  enable : function (tf)\{\par
    t = AllianceReports;\par
    if (tf)\par
      unsafeWindow.allianceReports = t.myAllianceReports;\par
    else\par
      unsafeWindow.allianceReports = t.saveArfunc;\par
  \},\par
  myAllianceReports : function (pageNum)\{\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    if (pageNum)\par
      params.pageNo = pageNum;\par
    params.group = "a";\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
//logit (inspect (rslt, 1, 1));        \par
        displayReports (rslt.arReports, rslt.arPlayerNames, rslt.arAllianceNames, rslt.arCityNames, rslt.totalPages);\par
      \},\par
      onFailure: function (rslt) \{\par
      \},\par
    \}, false);\par
\par
    function displayReports (ar, playerNames, allianceNames, cityNames, totalPages)\{\par
      var msg = new Array();\par
      var myAllianceId = getMyAlliance()[0];\par
      msg.push ("<STYLE>.msgviewtable tbody .myCol div \{margin-left:5px; overflow:hidden; white-space:nowrap; color:#000\}\\\par
            .msgviewtable tbody .myHostile div \{font-weight:600; color:#600\}\\\par
            .msgviewtable tbody .myGray div \{color:#666\}\\\par
            .msgviewtable tbody .myRein div \{color:#050\}\\\par
            .msgviewtable tbody .myWarn div \{font-weight:600; color:#442200\}\\\par
            </style>");\par
      msg.push("<div class='modal_msg_reports'>");\par
      var rptkeys = unsafeWindow.Object.keys(ar);\par
      if (matTypeof(ar) != 'array') \{\par
//logit ('displayReports: '+ Options.allowAlterAR);        \par
        if (Options.allowAlterAR)\par
          msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");\par
        else\par
          msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");\par
        msg.push("<thead><tr><td width=105>Date</td><td width=40>Type</td><td width=150>Attacker</td><td>Target</td><td>View</td></tr></thead><tbody>");\par
        for (var i = 0; i < rptkeys.length; i++) \{\par
          var rpt = ar[rptkeys[i]];\par
          var colClass = '"myCol"';\par
          rpt.marchType = parseInt(rpt.marchType);\par
          rpt.side0AllianceId = parseInt(rpt.side0AllianceId);\par
          var targetDiplomacy = getDiplomacy (rpt.side0AllianceId);\par
          if (rpt.marchType == 2)\{\par
            colClass = '"myCol myRein"';\par
          \} else if (rpt.side1AllianceId != myAllianceId)\{\par
            colClass = '"myCol myHostile"';\par
          \} else \{\par
            if (parseInt(rpt.side0TileType) < 50)\{          // if wild\par
              if (parseInt(rpt.side0PlayerId) == 0)\par
                colClass = '"myCol myGray"';\par
              else\par
                colClass = '"myCol myWarn"';\par
            \} else if (parseInt(rpt.side0PlayerId) == 0) \{   // barb\par
              colClass = '"myCol myGray"';\par
            \} else \{\par
              if (targetDiplomacy == 'friendly')\par
                colClass = '"myCol myWarn"';\par
            \}\par
          \}\par
//logit (inspect (ar, 3, 1));\par
          msg.push ('<tr valign=top');\par
          if (i%2 == 0)\par
            msg.push(" class=stripe");\par
          msg.push("><TD class="+ colClass +"><div>");\par
          msg.push(unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime));\par
          msg.push ('<BR>Rpt #');\par
          msg.push (rpt.reportId);          \par
          msg.push("</div></td><TD class="+ colClass  +"><div>");\par
          if (rpt.marchType == 1)\par
            msg.push (unsafeWindow.g_js_strings.commonstr.transport);\par
          else if (rpt.marchType == 3)\par
            msg.push (unsafeWindow.g_js_strings.commonstr.scout);\par
          else if (rpt.marchType == 2)\par
            msg.push ('Reinf');\par
          else\par
            msg.push (unsafeWindow.g_js_strings.commonstr.attack);\par
\par
          // attacker ...\par
          msg.push ("</div></td><TD class="+ colClass +"><div>");\par
          if (parseInt(rpt.side1PlayerId) != 0)\par
            msg.push(escape(playerNames["p" + rpt.side1PlayerId]))\par
          else\par
            msg.push ('?Unknown?');\par
            msg.push (' ');\par
            msg.push (coordLink(rpt.side1XCoord, rpt.side1YCoord));\par
            msg.push ('<BR>');\par
          \par
          if (rpt.side1AllianceId != myAllianceId)\{\par
            msg.push (allianceNames['a'+rpt.side1AllianceId]);\par
            msg.push (' (');\par
            msg.push (getDiplomacy(rpt.side1AllianceId));\par
            msg.push (')');\par
          \} else \{\par
            msg.push ('<BR>');\par
          \}\par
          msg.push ('</div></td>');\par
\par
          // target ...\par
          msg.push ("<TD class="+ colClass  +"><DIV>");\par
          var type = parseInt(rpt.side0TileType);\par
\par
          if (type < 50)\{                              // wild\par
            msg.push(unsafeWindow.g_mapObject.types[type].toString().capitalize());\par
            msg.push(" Lvl " + rpt.side0TileLevel)\par
            if (parseInt(rpt.side0PlayerId) != 0) \{   // IF OWNED, show owner ...\par
              msg.push (' [');\par
              msg.push (escape(playerNames["p" + rpt.side0PlayerId]));\par
              msg.push ('] ');\par
            \}\par
          \} else \{\par
            if (parseInt(rpt.side0PlayerId) == 0) \{   //  barb\par
              msg.push(unsafeWindow.g_js_strings.commonstr.barbariancamp);\par
              msg.push(" Lvl " + rpt.side0TileLevel)\par
            \} else \{        // city\par
              msg.push (escape(playerNames["p" + rpt.side0PlayerId]));\par
              msg.push (' - ');\par
              msg.push (cityNames['c'+ rpt.side0CityId]);\par
            \}\par
          \}\par
          msg.push (' ');\par
          msg.push (coordLink(rpt.side0XCoord, rpt.side0YCoord));\par
          if (rpt.side0AllianceId!=0 && rpt.side0AllianceId!=myAllianceId)\{\par
            msg.push ('<BR>');\par
            msg.push (allianceNames['a'+rpt.side0AllianceId]);\par
            msg.push (' (');\par
            msg.push (targetDiplomacy);\par
            msg.push (')');\par
          \}\par
\par
          \par
/***\par
        \par
MY reports, reins works ...\par
<div><a href="#" onclick="jQuery('#modal_msg_body').trigger('viewReinforcedReport', ['6076798','67674','Elroy','IV','13412958','Duke_Swan','6329','Erisvil',662,477]);return false;">View Report</a></div>\par
\par
    \par
OK: <a onclick=" $(&quot;modal_alliance_reports_tabledivNKA&quot;).id=&quot;modal_alliance_reports_tablediv&quot;; modal_alliance_report_view(&quot;6044155&quot;,0,51,9,2282354,&quot;Jetson&quot;,&quot;M&quot;,&quot;Joe7z6bq&quot;,&quot;M&quot;,4,668,437,1299747584,0,643,407);return false;">View</a></div>           \par
ERROR (Reinf): <a onclick=" $(&quot;modal_alliance_reports_tabledivNKA&quot;).id=&quot;modal_alliance_reports_tablediv&quot;; modal_alliance_report_view(&quot;6043602&quot;,1,51,9,13487684,&quot;Fred8135i&quot;,&quot;M&quot;,&quot;Jetson&quot;,&quot;M&quot;,2,188,696,1299746211,0,23,518);return false;">View</a>\par
modal_alliance_report_view("6043602",1,51,9,13487684,"Fred8135i","M","Jetson","M",2,188,696,1299746211,0,23,518);return false;'>View</a>                        \par
modal_alliance_report_view(&quot;6043602&quot;,1,51,9,13487684,&quot;Fred8135i&quot;,&quot;M&quot;,&quot;Jetson&quot;,&quot;M&quot;,2,188,696,1299746211,0,23,518);return false;">View Report</a></div>            \par
modal_alliance_report_view("6043602",1,51,9,13487684,"Fred8135i","M","Jetson","M",2,188,696,1299746211,0,23,518);return false;">View Report</a></div>            \par
***/          \par
          \par
\par
          // 'view report' link ...\par
          if (Options.allowAlterAR)\par
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' modal_alliance_report_view(\\"");   // ONCLICK ???\par
          else\par
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' $(\\"modal_alliance_reports_tabledivNKA\\").id=\\"modal_alliance_reports_tablediv\\"; modal_alliance_report_view(\\"");   // ONCLICK ???\par
          msg.push(rpt.reportId);\par
          msg.push('",');\par
          if (parseInt(rpt.side1AllianceId) == parseInt(Seed.allianceDiplomacies.allianceId))\par
            msg.push(1);\par
          else\par
            msg.push(0);\par
          msg.push(",");\par
          msg.push(rpt.side0TileType);\par
          msg.push(",");\par
          msg.push(rpt.side0TileLevel);\par
          msg.push(",");\par
          msg.push(rpt.side0PlayerId);\par
          msg.push(',"');\par
          if (parseInt(rpt.side0PlayerId) != 0)\par
            msg.push(escape(playerNames["p" + rpt.side0PlayerId]));\par
          else\par
            msg.push(unsafeWindow.g_js_strings.commonstr.enemy);\par
          msg.push('","');\par
          if (parseInt(rpt.side0PlayerId) != 0)\par
            msg.push(escape(playerNames["g" + rpt.side0PlayerId]));\par
          else\par
            msg.push(0)\par
          msg.push('","');\par
          if (parseInt(rpt.side1PlayerId) > 0)\par
            msg.push(escape(playerNames["p" + rpt.side1PlayerId]));\par
          msg.push('","');\par
          if (parseInt(rpt.side1PlayerId) != 0)\par
            msg.push(escape(playerNames["g" + rpt.side1PlayerId]));\par
          msg.push('",');\par
          msg.push(rpt.marchType);\par
          msg.push(",");\par
          msg.push(rpt.side0XCoord);\par
          msg.push(",");\par
          msg.push(rpt.side0YCoord);\par
          msg.push(",");\par
          msg.push(rpt.reportUnixTime);\par
          msg.push(",");\par
          if (parseInt(rpt.reportStatus) == 2)\par
            msg.push(1);\par
          else\par
            msg.push(0);\par
          if (rpt.side1XCoord) \{\par
            msg.push(",");\par
            msg.push(rpt.side1XCoord);\par
            msg.push(",");\par
            msg.push(rpt.side1YCoord)\par
          \} else \{\par
            msg.push(",,");\par
          \}\par
          msg.push(");return false;'>View</a></div></td></tr>");\par
        \}\par
        msg.push("</tbody></table></div>");\par
      \}\par
      msg.push("</div><div id='modal_report_list_pagination'></div>");\par
      document.getElementById('allianceContent').innerHTML = msg.join("");\par
      if (pageNum) \{\par
        unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports", pageNum)\par
      \} else \{\par
        unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports")\par
      \}\par
    \}\par
  \},\par
\par
\}   // end AllianceReports singleton\par
\par
/************************ Food Alerts *************************/\par
var FoodAlerts = \{\par
\par
  init : function ()\{\par
   var f = FoodAlerts;\par
   f.e_eachMinute();\par
  \},\par
\par
  minuteTimer : null,\par
\par
  e_eachMinute : function ()\{   \par
    var f = FoodAlerts;\par
    var now = unixTime();\par
    row = [];\par
\par
    for(i=0; i < Cities.numCities; i++) \{\par
      var rp = getResourceProduction (Cities.cities[i].id);\par
      var foodleft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600;\par
      var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);\par
      row[i] = rp[1] - usage;\par
      var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;\par
      if (timeLeft<0)\{\par
      \}\par
      else if (timeLeft<(Options.foodWarnHours*3600)) \{\par
        var msg = '';\par
        msg += 'My city ' + Cities.cities[i].name.substring(0,10);\par
        msg += ' (' + Cities.cities[i].x +','+ Cities.cities[i].y + ')';\par
        msg += ' is low on food. Remaining: '+addCommasWhole(foodleft);\par
        msg += ' (' + timestrShort(timeLeft) + ') Upkeep: ' + addCommas(usage);\par
        sendChat ("/a " + msg);\par
      \}\par
    \}  \par
  f.minuteTimer = setTimeout (f.e_eachMinute, 600000);\par
  \},  \par
\}\par
\par
/************************ Tower Alerts ************************/\par
var TowerAlerts = \{\par
  viewImpendingFunc : null,\par
  generateIncomingFunc : null,\par
  fixTargetEnabled : false,\par
  towerMarches : \{\},    // track all marches that have been posted to alliance chat\par
  \par
  init : function ()\{\par
    var t = TowerAlerts; \par
    var s = GM_getValue ('towerMarches_'+GetServerId());\par
    if (s != null)\par
      t.towerMarches = JSON2.parse (s);\par
 \par
    t.viewImpendingFunc = new CalterUwFunc ('attack_viewimpending_view', [[/Modal.showModal\\((.*)\\)/im, 'Modal.showModal\\($1\\); ptViewImpending_hook(a);']]);\par
    unsafeWindow.ptViewImpending_hook = t.viewImpending_hook;\par
    t.viewImpendingFunc.setEnable (true);\par
\par
    t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*\} else \{\\s*e = true;\\s*\}/im, '\} else \{ e = ptGenerateIncoming_hook(); \}']]);\par
    unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;\par
  \},\par
    \par
  // fix 'target', add button  \par
  viewImpending_hook : function (atkinc)\{    \par
    var t = TowerAlerts;  \par
    var div = document.getElementById('modal_attackimpending_view');\par
    var isFalse = false;\par
    if (t.fixTargetEnabled)\{ \par
      var city = Cities.byID[atkinc.toCityId];\par
      var target = '';\par
      if (!city || (atkinc.marchType!=3 && atkinc.marchType!=4))\{  \par
        target = '<B>FALSE REPORT!</b>';\par
        isFalse = true;\par
      \} else if (city.tileId == atkinc.toTileId)\{\par
        target = city.name + ' ('+ city.x + ','+ city.y +')';\par
      \} else \{\par
        wilds = Seed.wilderness['city'+atkinc.toCityId];\par
        m = '';\par
        for (k in wilds)\{\par
          if (wilds[k].tileId == atkinc.toTileId)\{\par
            m = 'at '+ wilds[k].xCoord + ','+ wilds[k].yCoord;\par
            break;\par
          \}\par
        \}\par
        target = city.name + ', <B>WILD '+ m +'</b>';\par
      \}\par
      div.childNodes[0].innerHTML = '<B>Target: </b>'+ target;\par
    \}\par
    if (!isFalse)\{\par
      var d = document.createElement ('div');\par
      d.innerHTML = '<BR><TABLE><TR><TD><a id=towerPostToChat class=button20><span>Post to Alliance Chat</span></a></td></tr></table>';\par
      div.appendChild (d);\par
      document.getElementById('towerPostToChat').addEventListener('click', function ()\{t.e_buttonPostToChat(atkinc)\}, false);\par
    \}\par
  \},\par
\par
  // fix false reports  \par
  generateIncoming_hook : function ()\{    \par
    return false;\par
  \},\par
  \par
  enableFixFalseReports : function (tf)\{\par
    var t = TowerAlerts;  \par
    t.generateIncomingFunc.setEnable (tf);\par
  \},\par
  enableFixTarget : function (tf)\{\par
    var t = TowerAlerts;  \par
    t.fixTargetEnabled = tf;\par
  \},\par
  \par
  isFixTargetAvailable : function ()\{\par
    var t = TowerAlerts;  \par
    return t.viewImpendingFunc.isAvailable();\par
  \},\par
  isFixFalseReportsAvailable : function ()\{\par
    var t = TowerAlerts;  \par
    return t.generateIncomingFunc.isAvailable();\par
  \},\par
  \par
  \par
  postToChatOptions : \{aChat:false\},\par
  secondTimer : null,\par
\par
  setPostToChatOptions : function (obj)\{\par
    var t = TowerAlerts;\par
    t.postToChatOptions = obj;\par
    clearTimeout(t.secondTimer);\par
\tab if (obj.aChat && ENABLE_ALERT_TO_CHAT)\par
      t.e_eachSecond();\par
  \},\par
  \par
  addTowerMarch : function (m)\{\par
    var t = TowerAlerts;\par
    var now = unixTime();\par
    for (k in t.towerMarches)\{\par
      if (t.towerMarches[k].arrival < now)\par
        delete t.towerMarches[k];\par
    \}\par
    t.towerMarches['m'+m.mid] = \{added:now, arrival:parseIntNan(m.arrivalTime) \};\par
    GM_setValue ('towerMarches_'+GetServerId(), JSON2.stringify(t.towerMarches) );\par
  \},\par
  getTowerMarch : function (mid)\{ // ID only (no 'm')\par
    var t = TowerAlerts;\par
    return t.towerMarches['m'+mid];\par
  \},\par
  \par
  e_eachSecond : function ()\{   // check for incoming marches\par
    var t = TowerAlerts;\par
    var now = unixTime();\par
    if (matTypeof(Seed.queue_atkinc) != 'array')\{\par
      for (var k in Seed.queue_atkinc)\{\par
        var m = Seed.queue_atkinc[k];  \par
        if ((m.marchType==3 || m.marchType==4) && parseIntNan(m.arrivalTime)>now && t.getTowerMarch(m.mid)==null)\{\par
          t.addTowerMarch (m);\par
          t.postToChat (m, false);\par
        \}\par
      \}\par
    \}\par
    t.secondTimer = setTimeout (t.e_eachSecond, 2000);\par
  \},\par
  \par
  e_buttonPostToChat : function (march)\{\par
    var t = TowerAlerts;\par
    t.postToChat (march, true);\par
    unsafeWindow.Modal.hideModal();\par
  \},\par
  \par
  postToChat : function (m, force)\{\par
    var t = TowerAlerts;\par
    \par
    if (DEBUG_TRACE) logit ("checkTower(): INCOMING at "+ unixTime()  +": \\n"+ inspect (m, 8, 1));\par
    if (m.marchType == null)      // bogus march (returning scouts)\par
      return;\par
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv ("Incoming!<BR><PRE style='margin:0px;'>" + inspect (m, 8, 1) +'</pre>');\par
    if (m.marchType == 3)\{\par
      if (!t.postToChatOptions.scouting && !force)\par
        return;\par
      atkType = 'scouted';\par
    \} else if (m.marchType == 4)\{\par
      atkType = 'attacked';\par
    \} else \{\par
      return;\par
    \}\par
    var target, atkType, who, attackermight, allianceId, alliance;\par
    var city = Cities.byID[m.toCityId];\par
    if ( city.tileId == m.toTileId )\par
      target = 'city at '+ city.x +','+ city.y;\par
    else \{\par
      if (!t.postToChatOptions.wilds && !force)\par
        return;\par
      target = 'wilderness';\par
      for (k in Seed.wilderness['city'+m.toCityId])\{\par
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId)\{\par
          target += ' at '+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;\par
          break;\par
        \}\par
      \}\par
    \}\par
    if (Seed.players['u' + m.pid]) \{\par
\tab\tab\tab who = Seed.players['u' + m.pid].n;\par
\tab\tab\tab attackermight = parseInt(Seed.players['u' + m.pid].m);\par
            allianceId = Seed.players['u' + m.pid].a;\par
\tab\tab\} else \{\par
\tab\tab\tab if (m.players && m.players['u' + m.pid]) \{\par
\tab\tab\tab\tab who = m.players['u' + m.pid].n;\par
\tab\tab\tab\tab attackermight = parseInt(m.players['u' + m.pid].m);\par
                allianceId = m.players['u' + m.pid].a;\par
\tab\tab\tab\} else \{\par
\tab\tab\tab\tab who = 'Unknown';\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\par
  \par
\tab if(t.postToChatOptions.includemight)\par
\tab   who += '-'+ addCommas(attackermight);\par
    if (m.fromXCoord)\par
      who += ' at '+ m.fromXCoord +','+ m.fromYCoord ;\par
\tab if (t.postToChatOptions.includealliance)\{\par
\tab    var diplomacy = getDiplomacy(allianceId);\par
\tab    alliance = ' ('+diplomacy+') ';\par
\tab   \}\par
\tab  else\par
\tab\tab alliance = '';\par
\tab\tab\par
\tab\tab\par
    var msg = '';\par
    if (!force)\par
      msg = t.postToChatOptions.aPrefix +' ';\par
    msg += 'My '+ target +' is being '+ atkType  +' by '+ who +' ' +alliance+'. Incoming Troops (arriving in '+\par
        unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';\par
    var totTroops = 0;\par
    for (k in m.unts)\{\par
      var uid = parseInt(k.substr (1));\par
      msg += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';\par
      totTroops += m.unts[k];\par
    \}\par
    if ((totTroops < t.postToChatOptions.minTroops) && !force)\par
      return;\par
    msg = msg.slice (0, -2);\par
    msg += '.';\par
    if ( city.tileId == m.toTileId )\{\par
      var emb = getCityBuilding(m.toCityId, 8);\par
      if (emb.count > 0)\{\par
        var availSlots = emb.maxLevel;\par
        for (k in Seed.queue_atkinc)\{\par
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null)\{ \par
            --availSlots;\par
          \}\par
        \}\par
        msg += ' My embassy has '+ availSlots +' of '+ emb.maxLevel +' slots available.';\par
      \}\par
    \}\par
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv (msg);\par
    if (SEND_ALERT_AS_WHISPER)\par
      sendChat ("/"+ Seed.player.name +' '+ msg);    // Whisper to myself\par
    else\par
      sendChat ("/a "+  msg);                        // Alliance chat\par
\tab if(t.postToChatOptions.sound)\par
\tab\tab AudioAlert.sound(true);\par
  \},\par
  \par
\}\par
\par
function parseIntNan (n)\{\par
  x = parseInt(n, 10);\par
  if (isNaN(x))\par
    return 0;\par
  return x; \par
\}\par
function parseIntZero (n)\{\par
  if (n == '')\par
    return 0;\par
  return parseInt(n, 10);\par
\}\par
\par
/*********************************** Players TAB ***********************************/\par
\par
function officerId2String (oid)\{\par
  if (oid==null)\par
    return '';\par
  else if (oid==3)\par
    return 'Officer';\par
  else if (oid==2)\par
    return 'Vice Chance';\par
  else if (oid==1)\par
    return 'Chancellor';\par
  return '';\par
\}\par
\par
Tabs.AllianceList = \{\par
  tabOrder : 25,\par
  tabLabel : 'Players',\par
  cont : null,\par
  dat : [],\par
\par
  init : function (div)\{\par
    var t = Tabs.AllianceList;\par
    t.cont = div;\par
    unsafeWindow.PTgetMembers = t.eventGetMembers;\par
    unsafeWindow.PTpd = t.clickedPlayerDetail;\par
    unsafeWindow.PTpl = t.clickedPlayerLeaderboard;\par
\tab unsafeWindow.PCpo = t.clickedPlayerCheckOnline;\par
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;\par
\tab unsafeWindow.PCalClickPrev = t.eventListPrev;\par
    unsafeWindow.PCalClickNext = t.eventListNext;\par
    if (getMyAlliance()[0] == 0) \{\par
      t.cont.innerHTML = '<BR><BR><CENTER>You need to be in an alliance to use this feature.</center>';\par
      t.state = 1;\par
      return;\par
    \}\par
    var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\\\par
        <TR><TD class=xtab align=right></td><TD class=xtab>Enter all or part of a player name: &nbsp;</td>\\\par
          <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Find Player" /></td>\\\par
          <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\\\par
        <TR><TD class=xtab>OR: </td><TD class=xtab> Enter all or part of an alliance name: &nbsp;</td>\\\par
          <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Find Alliance" /></td>\\\par
          <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\\\par
\tab\tab <TR><TD class=xtab>OR: </td><TD class=xtab align=right> List alliances: &nbsp;</td>\\\par
\tab\tab     <TD class=xtab><INPUT align=left id=idMyAllSubmit type=submit value="My own ally"/>\\\par
            <INPUT align=left id=allListSubmit type=submit value="List all" /></td></tr>\\\par
        </table><span style="vertical-align:middle;" id=altInput></span></div>\\\par
        <SPAN id=allListOut></span>';\par
    t.cont.innerHTML = m;\par
    document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);\par
    document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);\par
    document.getElementById('allAllName').addEventListener ('focus', function ()\{document.getElementById('ptallErr').innerHTML='';\}, false);\par
    document.getElementById('allPlayName').addEventListener ('focus', function ()\{document.getElementById('ptplayErr').innerHTML='';\}, false);\par
\tab document.getElementById('allListSubmit').addEventListener ('click', t.eventListSubmit, false);\par
\tab document.getElementById('idMyAllSubmit').addEventListener ('click', t.showMyAlliance, false);\par
\tab t.curPage = 0;\par
\tab t.MaxPage = -1;\par
\tab t.state = 1;\par
  \},\par
\par
  hide : function ()\{\par
  \},\par
\par
  show : function ()\{  \par
  \},\par
\par
  pName : '',\par
  eventPlayerSubmit : function ()\{\par
    var t = Tabs.AllianceList;\par
    document.getElementById('ptplayErr').innerHTML='';\par
    var name = document.getElementById('allPlayName').value;\par
    t.pName = name;\par
    if (name.length < 3)\{\par
      document.getElementById('ptplayErr').innerHTML = 'Enter at least 3 characters';\par
      return;\par
    \}\par
    document.getElementById('altInput').innerHTML = '';\par
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';\par
    t.fetchPlayerList (name, t.eventGotPlayerList);\par
  \},\par
\par
  eventGotPlayerList : function (rslt)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
    var m = '<DIV class=ptstat>Showing players matching <B>"'+ t.pName +'"</b></div>\\\par
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\\\par
      <TABLE width=95% align=center class=ptTab cellspacing=0><TR style="font-weight:bold"><TD>Name</td>\\\par
      <td>UserID</td><TD align=right>Might</td><TD> &nbsp;Facebook &nbsp; </td><TD width=75%>Lookup </td></tr>';\par
    var row=0;\par
    var cl='';\par
    for (k in rslt.matchedUsers)\{\par
      var u = rslt.matchedUsers[k];\par
      if (++row % 2)\par
        cl = 'class=ptOddrow ';\par
      else\par
        cl = '';\par
      m += '<TR '+ cl +'valign=top><TD>'+ u.genderAndName +'</td><TD>'+u.userId+'</td><TD align=right>'+ addCommasInt(u.might) +'</td>\\\par
          <TD align=center><A target="_tab" href="http://www.facebook.com/profile.php?id='+ u.fbuid +'">profile</a></td>\\\par
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A>details</a> &nbsp; <BR></span><SPAN onclick="PTpl(this, \\''+ u.userId +'\\')"><A>leaderboard</a></span> &nbsp; <BR></span><SPAN onclick="PCpo(this, \\''+ u.userId +'\\')"><A>onlinestatus</a></span>&nbsp; <BR></span><SPAN onclick="PCplo(this, \\''+ u.userId +'\\')"><A>last Login</a></span></td></tr>';\par
    \}\par
    m += '</table></div>';\par
    document.getElementById('allListOut').innerHTML = m;\par
  \},\par
  \par
  clickedPlayerDetail : function (span, uid)\{\par
    var t = Tabs.AllianceList;\par
    span.onclick = '';\par
    span.innerHTML = "fetching details ...";\par
    t.fetchPlayerInfo (uid, function (r) \{t.gotPlayerDetail(r, span)\});\par
  \},\par
\par
  clickedPlayerLeaderboard : function (span, uid)\{\par
    var t = Tabs.AllianceList;\par
    span.onclick = '';\par
    span.innerHTML = "fetching leaderboard info ...";\par
    t.fetchLeaderboard (uid, function (r) \{t.gotPlayerLeaderboard(r, span)\});\par
  \},\par
  \par
  clickedPlayerCheckOnline : function (span, uid)\{\par
    var t = Tabs.AllianceList;\par
    span.onclick = '';\par
    span.innerHTML = "fetching online status ...";\par
    t.fetchPlayerStatus (uid, function (r) \{t.gotPlayerStatus(r, span, uid)\});\par
  \},\par
\par
  clickedPlayerGetLastLogin : function (span, uid)\{\par
    var t = Tabs.AllianceList;\par
    span.onclick = '';\par
    span.innerHTML = "fetching login date ...";\par
    t.fetchPlayerLastLogin (uid, function (r) \{t.gotPlayerLastLogin(r, span)\});\par
  \},\par
  \par
  gotPlayerLeaderboard : function (rslt, span)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      span.innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
    if (rslt.totalResults == 0)\{\par
      span.innerHTML = '<B>Leaderboard:</b> Not found! (misted?)';\par
      return;\par
    \}\par
    var p = rslt.results[0];\par
    var an = p.allianceName;\par
    if (!an || an=='' || p.officerType==4)\par
      an = 'none';\par
    else\par
      an += ' ('+ officerId2String(p.officerType) +')';\par
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Leaderboard: </b></td><TD colspan=2> Might: '+ p.might  +' &nbsp; Alliance: '+ an +'</td></tr>'; \par
    for (var i=0; i<p.cities.length; i++)\{\par
      var c = p.cities[i];\par
      var created = '';\par
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')\par
        created = ' &nbsp; &nbsp; created: ' + c.dateCreated.substr(0,10);\par
      m += '<TR><TD align=right><B>City #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName \par
      +' (<a onclick="ptGotoMap ('+ c.xCoord +',' +c.yCoord+ ')">'+ c.xCoord +','+ c.yCoord +'</a>)</td><TD width=75%> &nbsp; level: '\par
        + c.tileLevel +' &nbsp; &nbsp; status: '+ cityStatusString (c.cityStatus) + created +'</td></tr>';\par
    \}  \par
    span.innerHTML = m + '</table>';\par
  \},\par
    \par
  gotPlayerDetail : function (rslt, span)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      span.innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
    var u = rslt.userInfo[0];\par
    var a = 'None';\par
    if (u.allianceName)\par
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';\par
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Details:</b> &nbsp; </td><TD>Alliance: '+ a +' &nbsp; Cities: '\par
          + u.cities +' &nbsp; Population: '+ u.population +'</td></tr><TR><TD></td><TD>Provinces: ';\par
    var pids = u.provinceIds.split (',');\par
    var p = [];\par
    for (var i=0; i<pids.length; i++)\par
      p.push(unsafeWindow.provincenames['p'+pids[i]]);\par
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';\par
  \},\par
\par
  gotPlayerStatus : function (rslt, span,uid)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      span.innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
\par
    var p = rslt.data;\par
    if (p[uid] == true) \{\par
      m = '<span style="color:green"><b>online!</b></span>';\par
    \} else \{\par
       m = '<span style="color:red"><b>may not be online</b></span>';\par
    \}  \par
    span.innerHTML = m + '';\par
  \},\par
\par
  gotPlayerLastLogin : function (rslt, span)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      span.innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
\par
    var p = rslt.playerInfo;\par
    var lastLogin = rslt.playerInfo.lastLogin;\par
    \par
    if (lastLogin) \{\par
      m = '<span style="color:blue">Last login: '+lastLogin+'</span>';\par
    \} else \{\par
       m = '<span style="color:red">No login date found: '+lastLogin+'</span>';\par
    \}  \par
    span.innerHTML = m + '';\par
  \},\par
  \par
  aName : '',\par
  eventSubmit : function ()\{\par
    var t = Tabs.AllianceList;\par
    document.getElementById('ptallErr').innerHTML='';\par
    t.aName = document.getElementById('allAllName').value;\par
    if (t.aName.length < 3)\{\par
      document.getElementById('ptallErr').innerHTML = 'Enter at least 3 characters';\par
      return;\par
    \}\par
    var myA = getMyAlliance ();\par
    document.getElementById('altInput').innerHTML = '';\par
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';\par
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )\par
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);\par
    else\par
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);\par
  \},\par
\par
  eventGotAllianceList : function (rslt)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
    var m = '<DIV class=ptstat>Showing alliances matching <B>"'+ t.aName +'"</b></div>\\\par
    <TABLE><TR style="font-weight:bold"><TD class=xtab>Alliance Name</td><TD class=xtab>Rank</td><TD class=xtab>Members</td>\\\par
        <TD align=right class=xtab>Might</td><TD class=xtab>Diplomacy</td><TD class=xtab></td></tr>';\par
    for (k in rslt.alliancesMatched)\{\par
      var all = rslt.alliancesMatched[k];\par
      var dip = '';\par
      if (all.relation && all.relation==1)\par
        dip = 'Friendly';\par
      else if (all.relation && all.relation==2)\par
        dip = 'Hostile';\par
      m += '<TR><TD class=xtab>'+ all.allianceName +'</td><TD align=right class=xtab>'+ all.ranking +'</td><TD align=right class=xtab>'+ all.membersCount +'</td>\\\par
       <TD align=right class=xtab>'+ addCommasInt(all.might) +'</td><TD class=xtab>'+ dip +'</td>\\\par
       <TD class=xtab><a onclick="PTgetMembers('+ all.allianceId +')">View Members</a></td></tr>';\par
    \}\par
    document.getElementById('allListOut').innerHTML = m;\par
  \},\par
\par
\par
  eventGotMemberList : function (rslt)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
    var numInvalid = 0;\par
    var numPlayers = 0;\par
    t.dat = [];\par
    for (var i=0; i<rslt.results.length; i++)\{\par
      p = rslt.results[i];\par
      if (p.userId == 0)\{\par
        ++numInvalid;\par
      \} else \{\par
        ++numPlayers;\par
        for (var c=0; c<p.cities.length; c++)\{\par
          t.dat.push ([p.displayName, parseInt(p.might), p.officerType, parseInt(p.numCities), parseInt(p.cities[c].tileLevel),\par
               parseInt(p.cities[c].xCoord), parseInt(p.cities[c].yCoord), p.cities[c].cityName, 0, p.userId]);\par
        \}\par
      \}\par
    \}\par
    t.setDistances (Cities.cities[0].x, Cities.cities[0].y);\par
    t.displayMembers (rslt.allianceName, numPlayers);\par
  \},\par
\par
  //New Allylist\par
  eventListSubmit : function ()\{\par
    var t = Tabs.AllianceList;\par
    var myA = getMyAlliance ();\par
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';\par
    if (myA[0]!=0  ) \{\par
       t.curPage=1;\par
       t.fetchOtherAllianceInfo ( 1, t.eventGotOtherAlliancePage);\par
    \}\par
    else \{\par
       document.getElementById('allListOut').innerHTML = 'You must be an alliance member to use this feature.';\par
    \}\par
  \},\par
\par
\par
  showMyAlliance : function ()\{\par
    var t = Tabs.AllianceList;\par
    var myA = getMyAlliance ();\par
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';\par
    if (myA[0]!=0  ) \{\par
       t.eventGetMembers(myA[0]);\par
    \}\par
    else \{\par
       document.getElementById('allListOut').innerHTML = 'You must be an alliance member to use this feature.';\par
    \}\par
  \},\par
\par
  curPage : 0,\par
  MaxPage : 0,\par
\par
  eventListNext : function (amt)\{\par
    var t = Tabs.AllianceList;\par
    if( parseInt(amt) >= 9999 )\par
       t.curPage = t.MaxPage;\par
    else \{\par
\tab     t.curPage = parseInt(t.curPage) + parseInt(amt);\par
\tab     if ( t.curPage > t.MaxPage) \{\par
\tab       t.curPage = t.MaxPage;\par
\tab     \}\par
    \}\par
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';\par
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);\par
  \},\par
\par
  eventListPrev : function (amt)\{\par
    var t = Tabs.AllianceList;\par
    if(amt <= -1)\par
       t.curPage = 1;\par
    else \{\par
\tab     t.curPage-=amt;\par
\tab     if ( t.curPage < 1 ) \{\par
\tab       t.curPage = 1;\par
\tab     \}\par
    \}\par
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';\par
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);\par
  \},\par
\par
  gotoPage : function ()\{\par
    var t = Tabs.AllianceList;\par
    var val = document.getElementById('idPageNum').value;\par
    if (t.MaxPage < 0 ) \{\par
      document.getElementById('allListOut').innerHTML = 'List Alliances first.';\par
      return;\par
    \}\par
    if (t.MaxPage < 0 || val > t.MaxPage || val < 1) \{\par
      document.getElementById('allListOut').innerHTML = 'Page number out of range';\par
      return;\par
    \}\par
    t.curPage = val;\par
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';\par
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);\par
  \},\par
\par
  eventGotOtherAlliancePage : function (rslt)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
    t.MaxPage=rslt.noOfPages;\par
\par
    var m = '<div style="overflow:auto; height:556px;width:564px;"><TABLE><thead><TR style="font-weight:bold"> \\\par
        <th class=xtab>Alliance Name</th><th class=xtab>Rank</th><th class=xtab>Members</th>\\\par
        <th align=right class=xtab>Might</th><th class=xtab>Diplomacy</th><th class=xtab></th></tr></thead><tbody>';\par
    document.getElementById('allListOut').innerHTML = m;\par
\par
    for (var i=0; i<rslt.otherAlliances.length; i++) \{\par
      var alliance = rslt.otherAlliances[i];\par
      var dip = '';\par
      dip = getDiplomacy(alliance.allianceId);\par
\par
      m += '<TR class="pt'+ dip + '"><TD class=xtab>' + alliance.name +'</td><TD align=right class=xtab>'+ alliance.ranking +'</td><TD align=right class=xtab>'+ alliance.membersCount +'</td>\\\par
       <TD align=right class=xtab>'+ addCommasInt(alliance.might) +'</td><TD class=xtab>'+ dip +'</td>\\\par
       <TD class=xtab><a onclick="PTgetMembers('+ alliance.allianceId +')">View Members</a></td></tr>';\par
    \}\par
    m += '</tbody></TABLE><div style="font-weight:bold"; height:20px;width:560px; ><span> ';\par
\tab if  (t.curPage > 1) \{\par
\tab\tab m +=' &nbsp;<a onclick="PCalClickPrev(-1)"> [|<] </a> &nbsp;<a onclick="PCalClickPrev(1)"> [<] </a>&nbsp; &nbsp;';\par
\tab\}\par
\tab if (t.curPage < t.MaxPage) \{\par
\tab\tab m += '<a onclick="PCalClickNext(1)"> [>] </a> &nbsp;<a onclick="PCalClickNext(9999)"> [>|] </a> &nbsp; &nbsp;';\par
\tab\} \par
\tab\par
    m += ' &nbsp; page <INPUT align=right id=idPageNum type="text" size=4 value='+ t.curPage + ' /> of '+t.MaxPage;\par
\par
\tab m += '</span></div>';\par
    m += '</div>';\par
    document.getElementById('allListOut').innerHTML = m;\par
\tab document.getElementById('idPageNum').addEventListener ('change', t.gotoPage, false);\par
\tab //document.getElementById('idPageNum').value = t.curPage;\par
 \},\par
\par
  showCurrentPage : function ()\{\par
    var t = Tabs.AllianceList;\par
    var myA = getMyAlliance ();\par
\par
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';\par
    if (myA[0]!=0  ) \{\par
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);\par
    \}\par
    else \{\par
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);\par
    \}\par
\par
  \},\par
\par
  // sort and display\par
  reDisp : function ()\{\par
    var t = Tabs.AllianceList;\par
    function sortFunc (a, b)\{\par
      var t = Tabs.AllianceList;\par
      if (typeof(a[t.sortColNum]) == 'number')\{\par
        if (t.sortDir > 0)\par
          return a[t.sortColNum] - b[t.sortColNum];\par
        else\par
          return b[t.sortColNum] - a[t.sortColNum];\par
      \} else \{\par
        if (t.sortDir > 0)\par
          return a[t.sortColNum].localeCompare(b[t.sortColNum]);\par
        else\par
          return b[t.sortColNum].localeCompare(a[t.sortColNum]);\par
      \}\par
    \}\par
    t.dat.sort (sortFunc);\par
    var m = '';\par
    for (var i=0; i<t.dat.length; i++)\{\par
\tab\tab if (i % 2 == 0) \{\par
    \tab\tab  tabclass = 'xxtab';\par
    \tab\} else \{\par
    \tab\tab tabclass = 'xxtab_even';\par
    \tab\}\par
      m += '<TR style="max-height:30px"><TD class='+ tabclass +'>'+ t.dat[i][0] +'</td><TD align=right class='+ tabclass +'>'+ addCommasInt(t.dat[i][1]) +'</td><TD align=center class='+ tabclass +'>'+ t.dat[i][3] +'</td>\\\par
            <TD class='+ tabclass +'>'+ officerId2String(t.dat[i][2]) +'</td><TD class='+ tabclass +'>'+ t.dat[i][7] +'</td><TD align=right class='+ tabclass +'>'+ t.dat[i][4] +'</td>\\\par
            <TD align=center class='+ tabclass +'><DIV onclick="ptGotoMap('+ t.dat[i][5] +','+ t.dat[i][6] +')"><A>'+ t.dat[i][5] +','+ t.dat[i][6] +'</a></div></td>\\\par
            <TD align=right class='+ tabclass +' style="padding-right:20px;">'+ t.dat[i][8].toFixed(2) +'</td>\\\par
\tab\tab\tab <td class='+ tabclass +'><SPAN onclick="PCpo(this, \\''+t.dat[i][9] +'\\')"><A>onlinestatus</a></span></td>\\\par
\tab\tab\tab <td class='+ tabclass +'><SPAN onclick="PCplo(this, \\''+ t.dat[i][9] +'\\')"><A>last Login</a></span><td> </tr>';\par
    \}\par
    var tbody = document.getElementById('allBody');\par
    tbody.style.maxHeight = '';\par
    tbody.innerHTML = m;\par
    if (parseInt(tbody.clientHeight) > 475)\{\par
      tbody.style.height = '475px';\par
      tbody.style.maxHeight = '475px';\par
    \}\par
//new CtableToText('tabAllMembers').toText();\par
  \},\par
\par
\par
  setDistances : function (x, y)\{\par
    var t = Tabs.AllianceList;\par
    for (var i=0; i<t.dat.length; i++)\par
      t.dat[i][8] = distance (x, y, t.dat[i][5], t.dat[i][6]);\par
  \},\par
\par
  sortColNum : 8,\par
  sortDir : 1,\par
\par
  displayMembers : function (allName, numPlayers)\{\par
    var t = Tabs.AllianceList;\par
    function alClickSort (e)\{\par
      var t = Tabs.AllianceList;\par
      var newColNum = e.id.substr(8);\par
      document.getElementById('clickCol'+t.sortColNum).className = 'clickable';\par
      e.className='clickable clickableSel';\par
      if (newColNum == t.sortColNum)\par
        t.sortDir *= -1;\par
      else\par
        t.sortColNum = newColNum;\par
      t.reDisp();\par
    \}\par
    unsafeWindow.PTalClickSort = alClickSort;\par
    var m = '<STYLE>.clickable\{background-color:#ddd; border:2px outset; border-color:#555; padding-left:5px; padding-right:5px\}\\\par
            .clickableSel\{background-color:#ffffcc;\}\\\par
            .xxtab\{background-color:none; padding-left:5px; padding-right:5px;\}\\\par
\tab\tab\tab .xxtab_even\{background-color:#F6E3CE; padding-left:5px; padding-right:5px;\} </style>\\\par
      <DIV class=ptstat><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab> &nbsp; '+ allName +'</td>\\\par
        <TD class=xtab width=80% align=center>Distance is from <SPAN id=distFrom>'+ Cities.cities[0].name +' ('+ Cities.cities[0].x +','+ Cities.cities[0].y +')</span></td><TD class=xtab align=right>'+ numPlayers +' players found &nbsp; </td></tr></table></div>\\\par
      <TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD>\\\par
      <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Player</div></a></td>\\\par
        <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Might</a></div></td>\\\par
        <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Cities</a></div></td>\\\par
        <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Rank</a></div></td>\\\par
        <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>City Name</a></div></td>\\\par
        <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Lvl</a></div></td>\\\par
        <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coords</a></div></td>\\\par
        <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance</a></div></td>\\\par
\tab\tab <TD class=clickable><A><DIV>Status</a></div></td>\\\par
\tab\tab <TD class=clickable><A><DIV>Last Login</a></div></td></tr></thead>\\\par
      <TBODY id=allBody style="background-color:#ffffff; overflow-y:auto; overflow-x:auto;"></tbody></table>\\\par
      <DIV style="top:670px; left:0px; position:static; width:100%;  background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">\\\par
        <TABLE width=100%><TR><TD class=xtab>Data is from the leaderboard and may be up to 24 hours old!</td>\\\par
          <TD class=xtab align=right>Click on column headers to sort</td></tr></table></div>';\par
    document.getElementById('allListOut').innerHTML = m;\par
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\\\par
        <TD class=xtab>Show distance from: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> &nbsp; Or, choose city: <span id=dmcoords></span></td></tr></table>';\par
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';\par
    t.reDisp();\par
    new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));\par
  \},\par
\par
  eventCoords : function (city, x, y)\{\par
    var t = Tabs.AllianceList;\par
    var m = '';\par
    if (city != null)\par
      m = city.name +' ('+ city.x +','+ city.y +')';\par
    else\par
      m = x +','+ y;\par
    document.getElementById('distFrom').innerHTML = m;\par
    t.setDistances(x,y);\par
    t.reDisp();\par
  \},\par
\par
  eventGetMembers : function (aid)\{\par
    var t = Tabs.AllianceList;\par
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';\par
    t.fetchAllianceMemberList (aid, null, t.eventGotMemberList);\par
  \},\par
\par
  fetchAllianceMemberList : function (allianceId, allianceName, notify) \{\par
    var t = Tabs.AllianceList;\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.perPage = 100;\par
    if (allianceName)\par
      params.allianceName = allianceName;\par
    if (allianceId && allianceId != 0)\par
      params.allianceId = allianceId;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
      onFailure: function (rslt) \{\par
        notify (rslt);\par
      \},\par
    \});\par
  \},\par
\par
  fetchLeaderboard : function (uid, notify) \{\par
    var t = Tabs.AllianceList;\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.userId = uid;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
      onFailure: function (rslt) \{\par
        notify (rslt);\par
      \},\par
    \});\par
  \},\par
\par
  fetchAllianceList : function (allianceName, myAid, notify) \{   // at least 3 chars :)\par
    var t = Tabs.AllianceList;\par
    function combineResults (rsltA, rsltM, notify)\{\par
      if (!rsltA.ok)\{\par
        if (rsltA.msg.indexOf("No alliance found under")!=0 || !rsltM.ok)\{\par
          notify (rsltA);\par
          return;\par
        \}\par
        rsltA.ok = true;\par
        rsltA.count = 0;\par
        rsltA.alliancesMatched = \{\};\par
      \}\par
      if (rsltM.ok)\{\par
        rsltA.alliancesMatched['a'+rsltM.allianceInfo.allianceId] = \{allianceId: rsltM.allianceInfo.allianceId, allianceName: rsltM.allianceInfo.allianceName,\par
              membersCount: rsltM.allianceInfo.members, relation: null, might: rsltM.allianceInfo.might, ranking: rsltM.allianceInfo.ranking\};\par
        ++rsltA.count;\par
      \}\par
      notify (rsltA);\par
    \}\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.allianceName = allianceName;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetSearchResults.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        if (myAid!=null && myAid>0)\par
          t.fetchMyAllianceInfo  (function (r)\{ combineResults (rslt, r, notify)\});\par
        else\par
          notify (rslt);\par
      \},\par
      onFailure: function (rslt) \{\par
        notify (rslt);\par
      \},\par
    \});\par
  \},\par
\par
  fetchOtherAllianceInfo : function (pageNum, notify)\{    // as in alliance list, sorted by rank, 10 per page\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.pageNo = pageNum;\par
    params.cityId = unsafeWindow.currentcityid;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetOtherInfo.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
    \});\par
  \},\par
\par
  fetchMyAllianceInfo : function (notify)\{\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetInfo.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
    \});\par
  \},\par
\par
  fetchPlayerList : function (name, notify)\{  // at least 3 chars!! \par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.searchName = name;\par
    params.subType = "ALLIANCE_INVITE";\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/searchPlayers.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
    \});\par
  \},\par
\par
  fetchPlayerInfo : function (uid, notify)\{\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.uid = uid;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
    \});\par
  \},\par
  \par
  fetchPlayerStatus : function (uid, notify)\{\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.checkArr = uid;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
    \});\par
  \},\par
\par
  fetchPlayerLastLogin : function (uid, notify)\{\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.pid = uid;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
      onSuccess: function (rslt) \{\par
        notify (rslt);\par
      \},\par
    \});\par
  \},\par
\};\par
\par
\par
/*********************************** Test TAB ***********************************/\par
\par
Tabs.Test = \{\par
  tabOrder : 100,\par
  tabDisabled : !ENABLE_TEST_TAB,\par
  cont : null,\par
\par
  init : function (div)\{\par
    var t = Tabs.Test;\par
    t.cont = div;\par
\tab var citySelect = '   <SELECT id=fakeCity>';\par
\tab     for (var c=0; c<Cities.numCities; c++) \{\par
\tab\tab  \tab  aCity = Cities.cities[c].name + ' ('+Cities.cities[c].x + ','+ Cities.cities[c].y+')';\par
\tab          citySelect += '<option value=\\''+c+'\\'>'+aCity+'</option>';\par
\tab     \}\par
\tab     citySelect += '</select>';\par
    var m = '<TABLE><TR><TD align=right>Scout: </td><TD><INPUT type=checkbox id=fakeIsScout></td></tr>\\\par
        <TR><TD align=right>Wild: </td><TD><INPUT type=checkbox id=fakeIsWild></td></tr>\\\par
        <TR><TD align=right>False Report: </td><TD><INPUT type=checkbox disabled id=fakeFalse></td></tr>\\\par
        <TR><TD align=right>Seconds: </td><TD><INPUT type=text size=4 value=300 id=fakeSeconds></td></tr>\\\par
        <TR><TD align=right># of Supply: </td><TD><INPUT type=text size=6 value=0 id=faketroop0></td></tr>\\\par
\tab\tab <TR><TD align=right># of Militia: </td><TD><INPUT type=text size=6 value=0 id=faketroop1></td></tr>\\\par
\tab\tab <TR><TD align=right># of Scouts: </td><TD><INPUT type=text size=6 value=0 id=faketroop2></td></tr>\\\par
\tab\tab   <TR><TD align=right># of Pikes: </td><TD><INPUT type=text size=6 value=0 id=faketroop3></td></tr>\\\par
\tab\tab   <TR><TD align=right># of Swords: </td><TD><INPUT type=text size=6 value=0 id=faketroop4></td></tr>\\\par
\tab\tab   <TR><TD align=right># of Archers: </td><TD><INPUT type=text size=6 value=0 id=faketroop5></td></tr>\\\par
\tab\tab   <TR><TD align=right># of Calvary: </td><TD><INPUT type=text size=6 value=0 id=faketroop6></td></tr>\\\par
\tab\tab   <TR><TD align=right># of Heavy Cav: </td><TD><INPUT type=text size=6 value=0 id=faketroop7></td></tr>\\\par
\tab\tab   <TR><TD align=right># of Wagons: </td><TD><INPUT type=text size=6 value=0 id=faketroop8></td></tr>\\\par
\tab\tab   <TR><TD align=right># of Ballistas: </td><TD><INPUT type=text size=6 value=0 id=faketroop9></td></tr>\\\par
\tab\tab   <TR><TD align=right># of Battering Ram: </td><TD><INPUT type=text size=6 value=0 id=faketroop10></td></tr>\\\par
\tab\tab   <TR><TD align=right># of Catapults: </td><TD><INPUT type=text size=6 value=0 id=faketroop11></td></tr>\\\par
\tab\tab   <TR><TD align=right>Fake name to use: </td><TD><INPUT type=text size=13 value=oftheNOOBS id=fakeName></td></tr>\\\par
\tab\tab   <TR><TD align=right>Target city: </td><TD>'+citySelect+'</td></tr>\\\par
        <TR><TD colspan=2 align=center><INPUT id=testSendMarch type=submit value="Fake Attack" \\></td></tr></table>\\\par
        <INPUT id=ptReloadKOC type=submit value="Reload KOC" \\>\\\par
        <BR><DIV id=testDiv style="background-color:#fffff0; maxwidth:675; max-height:430px; height:430px; overflow-y:auto;"></div>';\par
    t.cont.innerHTML = m;\par
    document.getElementById('testSendMarch').addEventListener ('click', t.clickFakeAttack, false);\par
    document.getElementById('ptReloadKOC').addEventListener ('click', t.reloadKOC, false);\par
    function xyNotify(city, x, y)\{\par
      var m = '[ Notified: '+ (city?city.name:'null') +', x='+ x +', y='+ y +' ]';\par
      document.getElementById('testNotify').innerHTML = m;\par
    \}\par
  \},\par
\par
  hide : function ()\{\par
  \},\par
\par
  show : function ()\{\par
  \},\par
  \par
  reloadKOC : function ()\{\par
    var goto = '{\field{\*\fldinst{HYPERLINK "http://apps.facebook.com/kingdomsofcamelot/?s='+getServerId"}}{\fldrslt{\ul\cf1 http://apps.facebook.com/kingdomsofcamelot/?s='+getServerId}}}\f0\fs22 ();\par
    var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxptButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ getServerId() +'"</form>';\par
    var e = document.createElement ('div');\par
    e.innerHTML = t;\par
    document.body.appendChild (e);\par
    setTimeout (function ()\{document.getElementById('xxptButReload').click();\}, 0);\par
  \},\par
  \par
  writeDiv : function (msg)\{\par
    var t = Tabs.Test;\par
    if (t.state != null)\par
    document.getElementById('testDiv').innerHTML = msg;\par
  \},\par
\par
  addDiv : function (msg)\{\par
    var t = Tabs.Test;\par
    if (t.state != null)\par
    document.getElementById('testDiv').innerHTML += msg;\par
  \},\par
\par
  createFakeAttack : function (cityNum, isScout, isWild, isFalse, secs, troops, name)\{\par
    var marchId = 'm'+ (88888 + Math.floor(Math.random()*11111));\par
    var march = \{\};\par
    if (matTypeof(Seed.queue_atkinc)=='array')\par
      Seed.queue_atkinc = \{\};\par
    if (isFalse)\par
      march.marchType = 0;\par
    else if (isScout)\par
      march.marchType = 3;\par
    else\par
      march.marchType = 4;\par
\par
    march.toCityId = Cities.cities[cityNum].id;\par
    if (isWild) \{\par
      keys = unsafeWindow.Object.keys(Seed.wilderness['city'+Cities.cities[cityNum].id]);\par
      march.toTileId = Seed.wilderness['city'+Cities.cities[cityNum].id][keys[0]].tileId;\par
    \} else \{\par
      march.toTileId = Cities.cities[cityNum].tileId;\par
    \}\par
    secs = parseInt(secs);\par
    march.arrivalTime = unixTime() + secs;\par
    march.departureTime = unixTime() - 10;\par
     march.unts = \{\}\par
\tab for(i=0; i<12; i++)\{\par
\tab   if(troops[i] > 0)\par
\tab\tab march.unts["u"+(i+1)] = addCommas(troops[i]);\par
\tab\}\par
\tab // if(numScout != 0)\par
    // march.unts.u3 = addCommas(numScout)\par
\tab // if(numMilitia != 0)\par
    // march.unts.u2 = addCommas(numMilitia)\par
\tab // if(numSupply != 0)\par
\tab // march.unts.u1 = addCommas(numSupply)\par
\tab // if(numPike != 0)\par
\tab // march.unts.u4 = addCommas(numPike)\par
\tab // if(numSword != 0)\par
\tab // march.unts.u5 = addCommas(numSword)\par
\tab // if(numArcher != 0)\par
\tab // march.unts.u6 = addCommas(numArcher)\par
\tab // if(numCav != 0)\par
\tab // march.unts.u7 = addCommas(numCav)\par
\tab // if(numHeavy != 0)\par
\tab // march.unts.u8 = addCommas(numHeavy)\par
\tab // if(numWagon != 0)\par
\tab // march.unts.u9 = addCommas(numWagon)\par
\tab // if(numBallista != 0)\par
\tab // march.unts.u10 = addCommas(numBallista)\par
\tab // if(numRam != 0)\par
\tab // march.unts.u11 = addCommas(numRam)\par
\tab // if(numCat != 0)\par
\tab // march.unts.u12 = addCommas(numCat)\par
    march.pid = 1234567;\par
    march.score = 9;\par
    march.mid = marchId.substr(1);\par
    march.players = \{\}\par
    march.players.u1234567 = \{\}\par
    march.players.u1234567.n = name;\par
    march.players.u1234567.t = 60;\par
    march.players.u1234567.m = 5441192;\par
    march.players.u1234567.s = 'M';\par
    march.players.u1234567.w = 1;\par
    march.players.u1234567.a = 1;\par
    march.players.u1234567.i = 5;\par
    Seed.queue_atkinc[marchId] = march;\par
    Seed.players.u1234567 = march.players.u1234567;\par
  \},\par
\par
  clickFakeAttack : function ()\{\par
    var t = Tabs.Test;\par
    var isScout = document.getElementById('fakeIsScout').checked;\par
    var isWild = document.getElementById('fakeIsWild').checked;\par
    var isFalse = document.getElementById('fakeFalse').checked;\par
\tab var troops = [];\par
\tab for(i=0; i<12; i++)\par
\tab\tab troops[i] = parseInt(document.getElementById('faketroop'+i).value);\par
    var secs = parseInt(document.getElementById('fakeSeconds').value);\par
    // var mil = parseInt(document.getElementById('fakeMilitia').value);\par
\tab // var numSupply = parseInt(document.getElementById('fakeSupply').value);\par
\tab // var numPike = parseInt(document.getElementById('fakePike').value);\par
\tab // var numSword = parseInt(document.getElementById('fakeSword').value);\par
\tab // var numArcher = parseInt(document.getElementById('fakeArcher').value);\par
\tab // var numCav = parseInt(document.getElementById('fakeCav').value);\par
\tab // var numHeavy = parseInt(document.getElementById('fakeHeavy').value);\par
\tab // var numWagon = parseInt(document.getElementById('fakeWagon').value);\par
\tab // var numBallista = parseInt(document.getElementById('fakeBallista').value);\par
\tab // var numRam = parseInt(document.getElementById('fakeRam').value);\par
\tab // var numCat = parseInt(document.getElementById('fakeCat').value);\par
\tab // var numScout = parseInt(document.getElementById('fakeScout').value);\par
\tab var name = document.getElementById('fakeName').value;\par
\tab var city = document.getElementById('fakeCity').value;\par
    t.createFakeAttack (city, isScout, isWild, isFalse, secs, troops ,name);\par
  \},\par
\}\par
\par
/*********************************** Info tab ***********************************/\par
\par
Tabs.Info = \{\par
  tabOrder : 20,\par
  cont : null,\par
\par
  init : function (div)\{\par
    var t = Tabs.Info;\par
    t.cont = div;\par
    fortmight = \{\par
      u53: "4",\par
      u55: "7",\par
      u60: "1",\par
      u61: "2",\par
      u62: "3",\par
    \};\par
    var t = Tabs.Info;\par
    rownum = 0;\par
    m = '<STYLE>.xtabH \{background:#ffffe8; border:none; padding-right: 5px; padding-left: 5px; margin-left:10px; \}\\\par
            .xtabHL \{ background:#ffffe8; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left:5px; margin-left:10px; \}\\\par
            .xtabL \{ background:none; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left: 5px; margin-left:10px; \}\\\par
            .xtabLine \{ padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none \}</style>\\\par
        <DIV style="height:650px; max-height:650px; overflow-y:auto; overflow-x:hidden"><DIV class=ptstat>UNIT INFORMATION</div><TABLE align=center cellpadding=1 cellspacing=0>\\\par
        <TR align=center><TD class=xtab></td><TD class=xtabHL colspan=5><B>COST TO BUILD</b></td><TD class=xtabHL colspan=7><B>STATS</b></td><TD class=xtabHL><B>Upkeep</b></td></tr>\\\par
        <TR valign=bottom align=right><TD class=xtab></td><TD class=xtabHL>Food</td><TD class=xtabH>Wood</td><TD class=xtabH>Stone</td>\\\par
        <TD class=xtabH>Ore</td><TD class=xtabH>Pop</td><TD class=xtabHL>Might</td><TD class=xtabH>Life</td><TD class=xtabH>Atk</td><TD class=xtabH>Def</td><TD class=xtabH>Speed</td><TD class=xtabH>Range</td><TD class=xtabH>Load</td>\\\par
        <TD class=xtabHL>Food</td></tr>\\\par
        <TR style="height:1px;"><TD style="padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none" colspan=14></td></tr>';\par
    for (ui=1; ui<13; ui++)\{\par
      if (++rownum % 2)\par
        rsty = '';\par
      else\par
        rsty = ' style="background: #e8e8e8" ';\par
      cost = unsafeWindow.unitcost['unt'+ui];     //  NAME, Food, Wood, Stone, Ore, ?, IdlePop, Time\par
      stats = unsafeWindow.unitstats['unt'+ui];   //  Life, Attack, Defense, Speed, Range, Load\par
      food = unsafeWindow.unitupkeeps[ui];\par
      might = unsafeWindow.unitmight['u'+ui];\par
      m += '<TR '+ rsty +'align=right><TD class=xtab align=left><B>'+ cost[0].substr(0,16) +'</b></td><TD class=xtabL>'+ cost[1] +'</td><TD class=xtab>'+ cost[2] +'</td>\\\par
          <TD class=xtab>'+ cost[3] +'</td><TD class=xtab>'+ cost[4] +'</td><TD class=xtab>'+ cost[6] +'</td><TD class=xtabL>'+ might +'</td>\\\par
          <TD class=xtab>'+ stats[0] +'</td><TD class=xtab>'+ stats[1] +'</td><TD class=xtab>'+ stats[2] +'</td><TD class=xtab>'+ stats[3] +'</td>\\\par
          <TD class=xtab>'+ stats[4] +'</td><TD class=xtab>'+ stats[5] +'</td><TD class=xtabL>'+ food +'</td></tr>';\par
\par
    \}\par
    m += '<TR class=xtabLine><TD colspan=14 class=xtabLine></td></tr>';\par
    for (k in unsafeWindow.fortcost)\{\par
      if (++rownum % 2)\par
        rsty = '';\par
      else\par
        rsty = ' style="background: #e8e8e8" ';\par
      cost = unsafeWindow.fortcost[k];     //  NAME, Food, Wood, Stone, Ore, ?, IdlePop, Time\par
      fi = k.substring(3);\par
      stats = unsafeWindow.fortstats['unt'+fi];   //  Life, Attack, Defense, Speed, Range, Load\par
      food = 0;\par
      might = fortmight['u'+fi];\par
      name = cost[0].replace ('Defensive','');\par
      name = name.replace ('Wall-Mounted','');\par
      m += '<TR '+ rsty +'align=right><TD align=left class=xtab><B>'+ name +'</b></td><TD class=xtabL>'+ cost[1] +'</td><TD class=xtab>'+ cost[2] +'</td>\\\par
          <TD class=xtab>'+ cost[3] +'</td><TD class=xtab>'+ cost[4] +'</td><TD class=xtab>'+ cost[6] +'</td><TD class=xtabL>'+ might +'</td>\\\par
          <TD class=xtab>'+ stats[0] +'</td><TD class=xtab>'+ stats[1] +'</td><TD class=xtab>'+ stats[2] +'</td><TD class=xtab>'+ stats[3] +'</td>\\\par
          <TD class=xtab>'+ stats[4] +'</td><TD class=xtab>'+ stats[5] +'</td><TD class=xtabL>'+ food +'</td></tr>';\par
    \}\par
    m += '<TR class=xtabLine><TD colspan=14 class=xtabLine></td></tr>';\par
    m += '</table>';\par
\tab //Crest info\par
\tab var crestname = \{ 1101:'Bor', \par
\tab\tab\tab\tab   1102:'Ector',\par
\tab\tab\tab\tab   1103:'Kay',\par
\tab\tab\tab\tab   1104:'Bedivere',\par
\tab\tab\tab\tab   1105:'Gawain',\par
\tab\tab\tab\tab   1106:'Percival',\par
\tab\tab\tab\tab   1107:'Galahad',\par
\tab\tab\tab\tab   1108:'Lancelot',\par
\tab\tab\tab\tab   1109:'Arthur',\par
\tab\tab\tab\tab   1110:'Morgana',\par
\tab\tab\tab\tab   1111:'Mordred',\par
\tab\tab\tab\tab   1112:'Stag',\par
\tab\tab\tab\tab   1113:'Pendragon',\par
\tab\tab\tab\tab   1114:'Lady of the lake'\};\par
\tab var crest = \{\};\par
\tab for (k in crestname)\{\par
\tab\tab if(Seed.items['i'+k])\par
\tab\tab\tab crest[k] = Seed.items['i'+k];\par
\tab\tab else\par
\tab\tab\tab crest[k] = 0;\par
\tab\}\par
var crestreq = \{ 3:\{1101:4, 1102:2, 1103:1\},\par
\tab\tab\tab\tab  4:\{1103:4, 1104:3, 1105:1\},\par
\tab\tab\tab\tab  5:\{1106:4, 1107:3, 1108:2\},\par
\tab\tab\tab\tab  6:\{1109:4, 1110:3, 1111:2\},\par
\tab\tab\tab\tab  7:\{1112:4, 1113:3, 1114:2\}\par
\tab\tab\tab\tab\};\par
 \par
 m += '<DIV class=ptstat>CREST REQUIREMENTS</div><TABLE align=center cellpadding=1 cellspacing=0>\\\par
      <TR CLASS="xtabH">\\\par
        <TD class=xtab></TH>\\\par
        <TD class=xtabHL><b>Req 1 (Owned)</b></TD>\\\par
        <TD class=xtabHL><b>Req 2 (Owned)</b></TD>\\\par
        <TD class=xtabHL><b>Req 3 (Owned)</b></TD>\\\par
      </TR>\\\par
\tab   <TR style="height:1px;"><TD style="padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none" colspan=14></td></tr>';\par
\tab   rownum = 0;\par
\tab   for(k in crestreq)\{\par
\tab   if (++rownum % 2)\par
        rsty = '';\par
      else\par
        rsty = ' style="background: #e8e8e8" ';\par
\tab\tab m += '<TR '+rsty+'>  \\\par
\tab\tab\tab <TD class=xtab><B>City '+k+'</B></TD>';\par
\tab\tab for(u in crestreq[k])\par
\tab\tab\tab m+='<TD class=xtabL>'+crestreq[k][u]+' '+crestname[u]+ ' ('+crest[u]+') </TD>';\par
\tab\tab m += '</TR>';\par
\tab   \}\par
 m += '</TABLE>';\par
\tab //End crest info\par
    m += '<BR><DIV class=ptstat>DISTANCE CALCULATOR</div><DIV class=ptentry><TABLE align=center cellpadding=1 cellspacing=0>\\\par
      <TR><TD class=xtab align=right><B>First Location: </b></td><TD  class=xtab> X: <INPUT id=calcX type=text\\> Y: <INPUT id=calcY type=text\\> Or, choose city: <SPAN id=ptloc1></span></td></tr>\\\par
      <TR><TD class=xtab><B>Second Location: </b></td><TD class=xtab> X: <INPUT id=calcX2 type=text\\> Y: <INPUT id=calcY2 type=text\\> Or, choose city: <SPAN id=ptloc2></span></td></tr></table>\\\par
      <CENTER><DIV style="width:60%; font-size:14px; border: 1px solid; background-color:white; margin:20px 3px 3px 0px; padding:4px" id=ptdistout></div></div>\\\par
      <BR><BR><DIV class=ptstat>PROVINCE MAP</div><DIV id=ptProvMap><IMG width=680 height=654 SRC="'+ URL_PROVINCE_MAP +'"></div></center>';\par
\par
    t.cont.innerHTML = m;\par
    new CdispCityPicker ('ptloc1', document.getElementById('ptloc1'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX'), document.getElementById('calcY'));\par
    new CdispCityPicker ('ptloc2', document.getElementById('ptloc2'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX2'), document.getElementById('calcY2'));\par
    t.eventLocChanged(Cities.cities[0], Cities.cities[0].x, Cities.cities[0].y);      \par
\par
    var eMap = document.getElementById('ptProvMap');\par
    for (var c=0; c<Cities.numCities; c++)      \par
      t.makeCityImg (c, eMap);\par
  \},\par
\par
  hide : function ()\{\par
  \},\par
\par
  show : function ()\{\par
  \},\par
\par
// var provMapCoords = \{imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39\};  \par
  makeCityImg : function (cityNum, eMap)\{\par
//logit ('makeCityImg: '+ cityNum);    \par
    var t = Tabs.Info;\par
    var city = Cities.cities[cityNum];\par
//    var off = getAbsoluteOffsets (eMap);\par
    var x = parseInt((provMapCoords.mapWidth * city.x) / 750);\par
    var y = parseInt((provMapCoords.mapHeight * city.y) / 750);\par
    var ce = document.createElement ('span');\par
    ce.style.background = 'black';\par
    ce.style.opacity = '1.0';\par
    ce.style.position='relative';\par
    ce.style.display='block';\par
    ce.style.width='14px';\par
    ce.style.height='16px';\par
    ce.style.border='1px solid #fff';\par
    ce.style.color = 'white';\par
    ce.style.textAlign = 'center';\par
//    ce.style.top = (off.top+y+provMapCoords.topMargin-eMap.offsetHeight) +'px';      \par
    ce.style.top = (y+provMapCoords.topMargin-provMapCoords.imgHeight-(cityNum*16)-8) +'px';      \par
    ce.style.left = (x+provMapCoords.leftMargin-7) +'px';\par
    eMap.appendChild(ce);\par
    ce.innerHTML = (cityNum+1) +'';\par
  \},\par
  \par
  eventLocChanged : function (city, x, y)\{\par
    var x1 = parseInt(document.getElementById('calcX').value);\par
    var x2 = parseInt(document.getElementById('calcX2').value);\par
    if (isNaN(x2))\par
      return;\par
    var y1 = parseInt(document.getElementById('calcY').value);\par
    var y2 = parseInt(document.getElementById('calcY2').value);\par
    var m = 'The distance from '+ x1 +','+ y1 +' to '+ x2 +','+ y2 +' is: &nbsp;<B>'+ distance (x1, y1, x2, y2).toFixed(2) +'</b>';\par
    document.getElementById('ptdistout').innerHTML = m;\par
  \},\par
\}\par
\par
\par
/*********************************** Options Tab ***********************************/\par
\par
Tabs.Options = \{\par
  tabOrder : 40,\par
  cont : null,\par
  fixAvailable : \{\},\par
\par
  init : function (div)\{\par
    var t = Tabs.Options;\par
    t.cont = div;\par
    \par
    try \{      \par
      m = '<TABLE class=ptTab>\\\par
        <TR><TD colspan=2><B>Config:</b></td></tr>\\\par
        <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Enable window drag (move window by dragging top bar with mouse)</td></tr>\\\par
        <TR><TD><INPUT id=togWhisperOn type=checkbox /></td><TD>Turn on Audio Whisper <SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>\\\par
        <TR><TD><INPUT id=ptHideOnGoto type=checkbox /></td><TD>Hide window when clicking on map coordinates. <SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>\\\par
        <TR><TD><INPUT id=ptEnableFoodWarn type=checkbox /></td><TD>Show \\'food left\\' in RED if food will run out in less than \\\par
            <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> hours; THIS OPTION IS ALSO USED FOR ALLIANCE FOOD ALERT!</td></tr>\\\par
        <TR><TD colspan=2><P><B>KofC Features:</b></td></tr>\\\par
        <TR><TD><INPUT id=togMsgCountFix type=checkbox /></td><TD>Show number of new messages separately from number of reports on Messages icon.</td></tr>';\par
\tab\tab if (ENABLE_ALERT_TO_CHAT)\{\par
\tab  m += '<TR><TD><INPUT id=alertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Automatically post incoming attacks to alliance chat.</td></tr>\\\par
          <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\\\par
          <TR><TD align=right>Message Prefix: &nbsp; </td><TD><INPUT id=alertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \\></td></tr>\\\par
          <TR><TD align=right>Alert on scouting: &nbsp; </td><TD><INPUT id=alertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\\\par
          <TR><TD align=right>Alert on wild attack: &nbsp; </td><TD><INPUT id=alertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\\\par
          <TR><TD align=right>Post attacker alliance diplomacy: &nbsp; </td><TD><INPUT id=alertAlliance type=checkbox '+ (Options.alertConfig.includealliance?'CHECKED ':'') +'/></td></tr>\\\par
          <TR><TD align=right>Post attacker might: &nbsp; </td><TD><INPUT id=alertMight type=checkbox '+ (Options.alertConfig.includemight?'CHECKED ':'') +'/></td></tr>\\\par
          <TR><TD align=right>Sound alert on impending: &nbsp; </td><TD><INPUT id=alertSound type=checkbox '+ (Options.alertConfig.sound?'CHECKED ':'') +'/></td></tr>\\\par
          <TR><TD align=right>Minimum # of troops: &nbsp; </td><TD><INPUT id=alertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \\> &nbsp; &nbsp; <span id=alerterr></span></td></tr>\\\par
          </table></td></tr>';\par
\tab\tab   \}\par
      m += '<TR><TD><INPUT id=togAllRpts type=checkbox /></td><TD>Enable enhanced Alliance Reports.</td></tr>\\\par
        <TR><TD><INPUT id=togAllowAlter type=checkbox /></td><TD>Allow other scripts to change format of Alliance Reports.</td></tr>\\\par
        <TR><TD><INPUT id=togEnhanceMsging type=checkbox /></td><TD>Enable enhanced messaging ("forward" and "all officers" buttons).</td></tr>\\\par
        <TR><TD><INPUT id=togPageNav type=checkbox /></td><TD>Enhanced page navigation for messages and reports.</td></tr>\\\par
        <TR><TD><INPUT id=togWarnZero type=checkbox /></td><TD>Warn if attempting to march to location 0,0.</td></tr>\\\par
        <TR><TD><INPUT id=togGmtClock type=checkbox /></td><TD>Enable GMT clock next to "Camelot Time" <SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>\\\par
        <TR><TD><INPUT id=togChatStuff type=checkbox /></td><TD>Enable Chat enhancements (clickable coords, pink global messages, click on icon to whisper) <SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>\\\par
        <TR><TD><INPUT id=togAttackPicker type=checkbox /></td><TD>Enable target city picker in attack dialog (reinforce, reassign and transport) <SPAN class=boldRed>&nbsp;(NEW option)</span></td></tr>\\\par
        <TR><TD><INPUT id=togBatRounds type=checkbox /></td><TD>Display # of rounds in battle reports <SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>\\\par
        <TR><TD><INPUT id=togAtkDelete type=checkbox /></td><TD>Enable delete button when displaying battle report <SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>\\\par
        <TR><TD colspan=2><BR><BR><B>KofC Bug Fixes:</b></td></tr>\\\par
        <TR><TD><INPUT id=togTowerFix type=checkbox /></td><TD>Fix tower report to show exact target (city, wild or invalid)</td></tr>\\\par
        <TR><TD><INPUT id=togMapDistFix type=checkbox /></td><TD>Fix map to show distances from currently selected city, instead of always the first city.</td></tr>\\\par
        <TR><TD><INPUT id=togTowerFix2 type=checkbox /></td><TD>Fix false attack alerts created from scouting missions.</td></tr>\\\par
        <TR><TD><INPUT id=togKnightSelect type=checkbox /></td><TD>Do not automatically select a knight when changing march type to scout, transport or reassign <SPAN class=boldRed>(NEW)</span></td></tr>\\\par
        <TR><TD><INPUT id=togCoordBox type=checkbox /></td><TD>Keep map coordinate box/bookmarks on top of troop activity <SPAN class=boldRed>(NEW)</span></td></tr>\\\par
        </table><BR><BR><HR>Note that if a checkbox is greyed out there has probably been a change of KofC\\'s code, rendering the option inoperable.';\par
      t.cont.innerHTML = m;\par
      \par
\tab   if (ENABLE_ALERT_TO_CHAT)\{\par
        document.getElementById('alertEnable').addEventListener ('change', e_alertOptChanged, false);\par
        document.getElementById('alertPrefix').addEventListener ('change', e_alertOptChanged, false);\par
        document.getElementById('alertScout').addEventListener ('change', e_alertOptChanged, false);\par
        document.getElementById('alertWild').addEventListener ('change', e_alertOptChanged, false);\par
        document.getElementById('alertTroops').addEventListener ('change', e_alertOptChanged, false);\par
        document.getElementById('alertAlliance').addEventListener ('change', e_alertOptChanged, false);\par
        document.getElementById('alertMight').addEventListener ('change', e_alertOptChanged, false);\par
        document.getElementById('alertSound').addEventListener ('change', e_alertOptChanged, false);\par
      \}\par
      t.togOpt ('ptEnableFoodWarn', 'enableFoodWarn');\par
      t.togOpt ('ptHideOnGoto', 'hideOnGoto');\par
      t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);\par
      t.togOpt ('togAllowAlter', 'allowAlterAR');\par
      t.togOpt ('togTowerFix', 'fixTower', TowerAlerts.enableFixTarget, TowerAlerts.isFixTargetAvailable);\par
      t.togOpt ('togTowerFix2', 'fixTower2', TowerAlerts.enableFixFalseReports, TowerAlerts.isFixFalseReportsAvailable);\par
      t.togOpt ('togMsgCountFix', 'fixMsgCount', MessageCounts.enable, MessageCounts.isAvailable);\par
      t.togOpt ('togMapDistFix', 'fixMapDistance', MapDistanceFix.enable, MapDistanceFix.isAvailable);\par
      t.togOpt ('togWarnZero', 'fixWarnZero', WarnZeroAttack.setEnable, WarnZeroAttack.isAvailable);\par
      t.togOpt ('togPageNav', 'fixPageNav', PageNavigator.enable, PageNavigator.isAvailable);\par
      t.togOpt ('togGmtClock', 'gmtClock', GMTclock.setEnable);\par
      t.togOpt ('togChatStuff', 'chatEnhance', ChatStuff.setEnable, ChatStuff.isAvailable);\par
      t.togOpt ('togKnightSelect', 'fixKnightSelect', AttackDialog.setEnable, AttackDialog.isKnightSelectAvailable);\par
      t.togOpt ('togAttackPicker', 'attackCityPicker', AttackDialog.setEnable, AttackDialog.isCityPickerAvailable);\par
      t.togOpt ('togEnhanceMsging', 'enhanceMsging', messageNav.setEnable, messageNav.isAvailable);\par
      t.togOpt ('togCoordBox', 'mapCoordsTop', CoordBox.setEnable, CoordBox.isAvailable);\par
      t.togOpt ('togBatRounds', 'dispBattleRounds', null, battleReports.isRoundsAvailable);\par
      t.togOpt ('togWhisperOn', 'WhisperOn');\par
      t.togOpt ('togAtkDelete', 'reportDeleteButton', null, battleReports.isDeleteAvailable);\par
                  \par
      document.getElementById('optFoodHours').addEventListener ('change', function () \{\par
          var x = document.getElementById('optFoodHours').value; \par
          if (isNaN(x) || x<0.01 || x>99999)\{\par
            document.getElementById('optFoodHours').value = Options.foodWarnHours;\par
            return;\par
          \}\par
          Options.foodWarnHours = x; \par
          saveOptions();\par
        \}, false);\par
\par
      var checkbox = document.getElementById('togAllRpts');\par
       if (Options.enhanceARpts)\par
         checkbox.checked = true;\par
       checkbox.addEventListener ('change', function() \{Options.enhanceARpts=document.getElementById('togAllRpts').checked; saveOptions(); AllianceReports.enable(Options.enhanceARpts);\}, false);\par
      \par
    \} catch (e) \{\par
      t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  \par
    \}\par
\tab\par
\tab function e_alertOptChanged ()\{\par
      Options.alertConfig.aChat = document.getElementById('alertEnable').checked;\par
      Options.alertConfig.aPrefix=document.getElementById('alertPrefix').value;      \par
      Options.alertConfig.scouting=document.getElementById('alertScout').checked;      \par
      Options.alertConfig.wilds=document.getElementById('alertWild').checked;\par
      Options.alertConfig.includealliance=document.getElementById('alertAlliance').checked;\par
      Options.alertConfig.includemight=document.getElementById('alertMight').checked;\par
      Options.alertConfig.sound=document.getElementById('alertSound').checked;\par
      Options.alertConfig.facebookchat=document.getElementById('alertFacebook').checked;\par
      var mt = parseInt(document.getElementById('alertTroops').value);\par
      if (mt<1 || mt>225000)\{\par
        document.getElementById('alertTroops').value = Options.alertConfig.minTroops;\par
        document.getElementById('alerterr').innerHTML = '<font color=#600000><B>INVALID</b></font>';\par
        setTimeout (function ()\{document.getElementById('alerterr').innerHTML =''\}, 2000);\par
        return;\par
      \} \par
      Options.alertConfig.minTroops = mt;\par
      saveOptions();\par
      TowerAlerts.setPostToChatOptions (Options.alertConfig);\par
    \}\par
  \},\par
\par
  \par
  hide : function ()\{\par
  \},\par
\par
  show : function ()\{\par
  \},\par
  \par
  togOpt : function (checkboxId, optionName, callEnable, callIsAvailable)\{\par
    var t = Tabs.Options;\par
    var checkbox = document.getElementById(checkboxId);\par
    \par
    if (callIsAvailable && callIsAvailable()==false)\{\par
      checkbox.disabled = true;\par
      return;\par
    \}\par
    if (Options[optionName])\par
      checkbox.checked = true;\par
    checkbox.addEventListener ('change', new eventToggle(checkboxId, optionName, callEnable).handler, false);\par
    function eventToggle (checkboxId, optionName, callOnChange)\{\par
      this.handler = handler;\par
      var optName = optionName;\par
      var callback = callOnChange;\par
      function handler(event)\{\par
        Options[optionName] = this.checked;\par
        saveOptions();\par
        if (callback != null)\par
          callback (this.checked);\par
      \}\par
    \}\par
  \},\par
\}\par
\par
/********************************* Search Tab *************************************/\par
\par
function distance (d, f, c, e) \{\par
  var a = 750;\par
  var g = a / 2;\par
  var b = Math.abs(c - d);\par
  if (b > g)\par
    b = a - b;\par
  var h = Math.abs(e - f);\par
  if (h > g)\par
    h = a - h;\par
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;\par
\};\par
\par
Tabs.Search = \{\par
  tabOrder : 10,\par
  tabDisabled : !ENABLE_SEARCH_TAB,\par
  //MapAjax : new CMapAjax(),\par
  cont:null,\par
\par
  init : function (div)\{\par
    var t = Tabs.Search;\par
\tab var Provinces = \{1:\{'name':"Tintagel",'x':75,'y':75\},\par
\tab\tab\tab\tab 2:\{'name':"Cornwall",'x':225,'y':75\},\par
\tab\tab\tab\tab 3:\{'name':"Astolat",'x':375,'y':75\},\par
\tab\tab\tab\tab 4:\{'name':"Lyonesse",'x':525,'y':75\},\par
\tab\tab\tab\tab 5:\{'name':"Corbenic",'x':625,'y':75\},\par
\par
\tab\tab\tab\tab 6:\{'name':"Paimpont",'x':75,'y':225\},\par
\tab\tab\tab\tab 7:\{'name':"Cameliard",'x':225,'y':225\},\par
\tab\tab\tab\tab 8:\{'name':"Sarras",'x':375,'y':225\},\par
\tab\tab\tab\tab 9:\{'name':"Canoel",'x':525,'y':225\},\par
\tab\tab\tab\tab 10:\{'name':"Avalon",'x':625,'y':225\},\par
\par
\tab\tab\tab\tab 11:\{'name':"Carmathen",'x':75,'y':375\},\par
\tab\tab\tab\tab 12:\{'name':"Shallot",'x':225,'y':375\},\par
\tab\tab\tab\tab 13:\{'name':"-------",'x':375,'y':375\},\par
\tab\tab\tab\tab 14:\{'name':"Cadbury",'x':525,'y':375\},\par
\tab\tab\tab\tab 15:\{'name':"Glastonbury",'x':625,'y':375\},\par
\par
\tab\tab\tab\tab 16:\{'name':"Camlamn",'x':75,'y':525\},\par
\tab\tab\tab\tab 17:\{'name':"Orkney",'x':225,'y':525\},\par
\tab\tab\tab\tab 18:\{'name':"Dore",'x':375,'y':525\},\par
\tab\tab\tab\tab 19:\{'name':"Logres",'x':525,'y':525\},\par
\tab\tab\tab\tab 20:\{'name':"Caerleon",'x':625,'y':525\},\par
\par
\tab\tab\tab\tab 21:\{'name':"Parmenie",'x':75,'y':675\},\par
\tab\tab\tab\tab 22:\{'name':"Bodmin Moor",'x':225,'y':675\},\par
\tab\tab\tab\tab 23:\{'name':"Cellwig",'x':375,'y':675\},\par
\tab\tab\tab\tab 24:\{'name':"Listeneise",'x':525,'y':675\},\par
\tab\tab\tab\tab 25:\{'name':"Albion",'x':625,'y':675\}\};\par
\tab unsafeWindow.PTgotoMap2 = t.gotoMap;\par
    unsafeWindow.PTpd = t.clickedPlayerDetail;\par
    unsafeWindow.PTpd2 = t.clickedPlayerLeaderboard;\par
\tab unsafeWindow.PCpo2 = t.clickedPlayerCheckOnline;\par
    unsafeWindow.PCplo2 = t.clickedPlayerGetLastLogin;\par
    t.cont = div;\par
    t.cont.innerHTML = '\\\par
      <DIV class=ptentry><table><tr><td><TABLE><TR valign=bottom><TD class=xtab width=100 align=right>Search for: </td><TD>\\\par
      <SELECT id="srcType">\\\par
        <OPTION value=0>Barb Camp</option>\\\par
        <OPTION value=1>Wilderness</option>\\\par
\tab\tab <OPTION value=2>Cities</option>\\\par
      </select></td></tr>\\\par
      </table>\\\par
      <DIV id="srcOpts" style="height:100px"></div></td><td style="visibility:hidden"><DIV id=divOutOpts style="background:#e0e0f0; padding:10px ;visibility:hidden"></div></td></tr></table></div>\\\par
      <DIV id="srcResults" style="height:470px; max-height:470px;"></div>';\par
    var psearch = document.getElementById ("srcType");\par
    m = '<TABLE><TR valign=middle><TD class=xtab width=100 align=right>Center: &nbsp; X: </td><TD class=xtab>\\\par
      <INPUT id=srchX type=text\\> &nbsp; Y: <INPUT id=srchY type=text\\> &nbsp;';\par
\tab m += '<span><select id="ptprovinceXY"><option>--provinces--</option>';\par
\tab\tab for (var i in Provinces) \{\par
\tab\tab\tab m += '<option value="'+i+'">'+Provinces[i].name+'</option>';\par
\tab\tab\}\par
\tab m += '</select></span>';\par
\par
\tab m += '</td></tr><TR><TD class=xtab align=right>Max. Distance: </td><TD class=xtab><INPUT id=srcDist size=4 value=10 /> &nbsp; <SPAN id=spInXY></span></td></tr>';\par
    m += '<TR><TD class=xtab></td><TD class=xtab><INPUT id=srcStart type=submit value="Start Search"/></td></tr>';\par
    m += '</table>';\par
    document.getElementById ('srcOpts').innerHTML = m;\par
    new CdispCityPicker ('srchdcp', document.getElementById('spInXY'), true, null, 0).bindToXYboxes(document.getElementById ('srchX'), document.getElementById ('srchY'));\par
    document.getElementById ('ptprovinceXY').addEventListener('change', function() \{\par
\tab   if (this.value >= 1) \{\par
\tab\tab   document.getElementById ('srchX').value = Provinces[this.value].x;\par
\tab\tab   document.getElementById ('srchY').value = Provinces[this.value].y;\par
\tab\tab   document.getElementById ('srcDist').value = 75;\par
\tab   \}\par
\tab   \}, false); \par
\tab document.getElementById ('srcStart').addEventListener ('click', t.clickedSearch, false);\par
  \},\par
\par
//Edit add city search\par
clickedPlayerDetail : function (span, uid)\{\par
    var t = Tabs.AllianceList;\par
    span.onclick = '';\par
    span.innerHTML = "fetching details ...";\par
    t.fetchPlayerInfo (uid, function (r) \{t.gotPlayerDetail(r, span)\});\par
  \},\par
\par
  clickedPlayerLeaderboard : function (span, uid)\{\par
    var t = Tabs.AllianceList;\par
    span.onclick = '';\par
    span.innerHTML = "fetching leaderboard info ...";\par
    t.fetchLeaderboard (uid, function (r) \{t.gotPlayerLeaderboard(r, span)\});\par
  \},\par
  \par
  clickedPlayerCheckOnline : function (span, uid)\{\par
    var t = Tabs.AllianceList;\par
\tab var s = Tabs.Search;\par
    span.onclick = '';\par
    span.innerHTML = "fetching online status ...";\par
    t.fetchPlayerStatus (uid, function (r) \{s.gotPlayerStatus(r, span, uid)\});\par
  \},\par
\par
  clickedPlayerGetLastLogin : function (span, uid)\{\par
    var t = Tabs.AllianceList;\par
\tab var s = Tabs.Search;\par
    span.onclick = '';\par
    span.innerHTML = "fetching login date ...";\par
    t.fetchPlayerLastLogin (uid, function (r) \{s.gotPlayerLastLogin(r, span)\});\par
  \},\par
  \par
  gotPlayerLeaderboard : function (rslt, span)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      span.innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
    if (rslt.totalResults == 0)\{\par
      span.innerHTML = '<B>Leaderboard:</b> Not found! (misted?)';\par
      return;\par
    \}\par
    var p = rslt.results[0];\par
    var an = p.allianceName;\par
    if (!an || an=='' || p.officerType==4)\par
      an = 'none';\par
    else\par
      an += ' ('+ officerId2String(p.officerType) +')';\par
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Leaderboard: </b></td><TD colspan=2> Might: '+ p.might  +' &nbsp; Alliance: '+ an +'</td></tr>'; \par
    for (var i=0; i<p.cities.length; i++)\{\par
      var c = p.cities[i];\par
      m += '<TR><TD align=right><B>City #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName +' '+coordLink (c.xCoord, c.yCoord)+'</td><TD width=75%> &nbsp; level: '\par
        + c.tileLevel +' &nbsp; &nbsp; status: '+ cityStatusString (c.cityStatus) +' &nbsp; &nbsp; created: ' + c.dateCreated.substr(0,10) +'</td></tr>';\par
    \}  \par
    span.innerHTML = m + '</table>';\par
  \},\par
    \par
  gotPlayerDetail : function (rslt, span)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      span.innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
    var u = rslt.userInfo[0];\par
    var a = 'None';\par
    if (u.allianceName)\par
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';\par
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Details:</b> &nbsp; </td><TD>Alliance: '+ a +' &nbsp; Cities: '\par
          + u.cities +' &nbsp; Population: '+ u.population +'</td></tr><TR><TD></td><TD>Provinces: ';\par
    var pids = u.provinceIds.split (',');\par
    var p = [];\par
    for (var i=0; i<pids.length; i++)\par
      p.push(unsafeWindow.provincenames['p'+pids[i]]);\par
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';\par
  \},\par
  \par
  gotPlayerStatus : function (rslt, span,uid)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      span.innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
\par
    var p = rslt.data;\par
    if (p[uid] == true) \{\par
      m = '<span style="color:green"><b>online!</b></span>';\par
    \} else \{\par
       m = '<span style="color:red"><b>may not be online</b></span>';\par
    \}  \par
    span.innerHTML = m + '';\par
  \},\par
\par
  gotPlayerLastLogin : function (rslt, span)\{\par
    var t = Tabs.AllianceList;\par
    if (!rslt.ok)\{\par
      span.innerHTML = rslt.errorMsg;\par
      return;\par
    \}\par
\par
    var p = rslt.playerInfo;\par
    var lastLogin = rslt.playerInfo.lastLogin;\par
    \par
    if (lastLogin) \{\par
      m = '<span style="color:black">Last login: '+lastLogin+'</span>';\par
    \} else \{\par
       m = '<span style="color:red">No login date found: '+lastLogin+'</span>';\par
    \}  \par
    span.innerHTML = m + '';\par
  \},\par
//End edit city search\par
\par
  hide : function ()\{\par
  \},\par
\par
  show : function (cont)\{\par
  \},\par
\par
  opt : \{\},\par
\par
  searchRunning : false,\par
  tilesSearched : 0,\par
  tilesFound : 0,\par
  curX : 0,\par
  curY : 0,\par
  lastX : 0,\par
  firstX : 0,\par
  firstY : 0,\par
  lastY : 0,\par
\par
  normalizeCoord : function (x)\{\par
    if ( x >= 750)\par
      x -= 750;\par
    else if (x < 0)\par
      x += 750;\par
    return parseInt (x/5) * 5;\par
  \},\par
\par
  clickedSearch : function ()\{\par
    var t = Tabs.Search;\par
\par
    if (t.searchRunning)\{\par
      t.stopSearch ('SEARCH CANCELLED!');\par
      return;\par
    \}\par
    t.opt.searchType = document.getElementById ('srcType').value;\par
    t.opt.startX = parseInt(document.getElementById ('srchX').value);\par
    t.opt.startY = parseInt(document.getElementById ('srchY').value);\par
    t.opt.maxDistance = parseInt(document.getElementById ('srcDist').value);\par
    errMsg = '';\par
\par
    if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>749)\par
      errMsg = "X must be between 0 and 749<BR>";\par
    if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>749)\par
      errMsg += "Y must be between 0 and 749<BR>";\par
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1 || t.opt.maxDistance>750)\par
      errMsg += "Max Distance must be between 1 and 750<BR>";\par
    if (errMsg != '')\{\par
      document.getElementById('srcResults').innerHTML = '<FONT COLOR=#660000>ERROR:</font><BR><BR>'+ errMsg;\par
      return;\par
    \}\par
\par
    t.searchRunning = true;\par
    document.getElementById ('srcStart').value = 'Stop Search';\par
    m = '<DIV class=ptstat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=statSearched></div></td>\\\par
        <TD class=xtab align=center><SPAN id=statStatus></span></td>\\\par
        <TD class=xtab align=right width=125><DIV id=statFound></div></td></tr></table></div>\\\par
      <TABLE width=100%><TR><TD><DIV id=divOutTab style="width:100%; height:470px; max-height:470px; overflow-y:auto;"></div></td></tr></table>';\par
    document.getElementById('srcResults').innerHTML = m;\par
    if (t.opt.searchType == 0)\par
      typeName = 'Barbarians';\par
    else if (t.opt.searchType == 1)\par
      typeName = 'Wildernesses';\par
\tab else \par
\tab   typeName = 'Cities';\par
\par
    m = '<CENTER><B>Search for '+ typeName +'<BR>\\\par
        Center: '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; Distance: '+ t.opt.maxDistance +'<BR></center>\\\par
        <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>LIST OPTIONS:</b><BR></td></tr>';\par
\tab if (t.opt.searchType == 1 || t.opt.searchType == 0) \{\par
      m += '<TR><TD class=xtab align=right>Min. level to show:</td><TD class=xtab> <INPUT id=filMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\\\par
        <TR><TD class=xtab align=right>Max. level to show:</td><TD class=xtab> <INPUT id=filMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';\par
\tab\}\par
    if (t.opt.searchType == 1)\{\par
      m += '<TR><TD class=xtab align=right>Wilderness Type:</td><TD class=xtab><SELECT id=filWildType>';\par
      m += htmlOptions ( \{1:'Glassland/Lake', 3:'Woodlands', 4:'Hills', 5:'Mountain', 6:'Plain', 0:'ALL'\}, Options.wildType );\par
      m += '</select></td></tr><TR><TD class=xtab align=right>Unowned Only:</td>\\\par
\tab\tab\tab <TD class=xtab><INPUT id=filUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\\><td></tr>';\par
    \}\par
\tab if (t.opt.searchType == 1 || t.opt.searchType == 0) \{\par
\tab   m += '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=filSortBy>\\\par
\tab\tab\tab\tab <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Level</option>\\\par
\tab\tab\tab\tab <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\\\par
            </select></td></tr>\\\par
            <TR><TD class=xtab align=right>Show coordinates only:</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \\></td></tr>\\\par
            </table></div><BR><SPAN id=srchSizeWarn></span>';\par
\tab\} else \{\par
\tab  m += '<TR><TD class=xtab align=right>City Type:</td><TD class=xtab><SELECT id=filCities>';\par
     m += htmlOptions ( \{1:'All', 2:'Allies', 3:'Friendly', 4:'Hostile', 5:'Neutral', 6:'Unallianced', 7:'Misted'\}, Options.cityType );\par
     m += '</select></td></tr>';\tab\tab\par
\tab  m += '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=filSortBy>\\\par
\tab\tab\tab <OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Might</option>\\\par
\tab\tab\tab <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\\\par
           </select></td></tr>\\\par
\tab\tab    <TR><TD class=xtab align=right>Min might to show:</td><TD class=xtab><INPUT type=text id=minMight value='+Options.MightSrc+' size=3 \\></td></tr>\\\par
           <TR><TD class=xtab align=right>Show coordinates only:</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \\></td></tr>\\\par
           </table></div><BR><SPAN id=srchSizeWarn></span>';\par
\tab\}\par
\par
\tab document.getElementById ('divOutOpts').style.visibility = 'visible';\par
    document.getElementById('divOutOpts').innerHTML = m;\par
\tab if (t.opt.searchType == 1 || t.opt.searchType == 0) \{\par
\tab\tab document.getElementById('filMinLvl').addEventListener ('change', function ()\{\par
\tab\tab   Options.srcMinLevel = document.getElementById('filMinLvl').value;\par
\tab\tab   saveOptions();\par
\tab\tab   t.dispMapTable ();\par
\tab\tab   \}, false);\par
\tab\tab document.getElementById('filMaxLvl').addEventListener ('change', function ()\{\par
\tab\tab   Options.srcMaxLevel = document.getElementById('filMaxLvl').value;\par
\tab\tab   saveOptions();\par
\tab\tab   t.dispMapTable ();\par
\tab\tab   \}, false);\par
\tab\}\par
    document.getElementById('filSortBy').addEventListener ('change', function ()\{\par
      Options.srcSortBy = document.getElementById('filSortBy').value;\par
      saveOptions();\par
      t.dispMapTable ();\par
      \}, false);\par
    document.getElementById('coordsOnly').addEventListener ('change', function ()\{ t.dispMapTable (); \}, false);\par
    if (t.opt.searchType == 1)\{\par
      document.getElementById('filWildType').addEventListener ('change', function ()\{\par
        Options.wildType = document.getElementById('filWildType').value;\par
        saveOptions();\par
        t.dispMapTable ();\par
        \}, false);\par
      document.getElementById('filUnowned').addEventListener ('change', function ()\{\par
        Options.unownedOnly = (document.getElementById('filUnowned').checked);\par
        saveOptions();\par
        t.dispMapTable ();\par
        \}, false);\par
    \}\par
\tab if (t.opt.searchType == 2)\{\par
\tab\tab document.getElementById('filCities').addEventListener ('change', function ()\{\par
\tab\tab Options.cityType = document.getElementById('filCities').value\par
\tab\tab saveOptions();\par
        t.dispMapTable ();\par
\tab\tab\},false);\par
\tab\tab document.getElementById('minMight').addEventListener ('change', function ()\{\par
\tab\tab Options.MightSrc = document.getElementById('minMight').value\par
\tab\tab saveOptions();\par
        t.dispMapTable ();\par
\tab\tab\},false);\par
\tab\}\par
\par
    t.mapDat = [];\par
    t.firstX =  t.opt.startX - t.opt.maxDistance;\par
    t.lastX = t.opt.startX + t.opt.maxDistance;\par
    t.firstY =  t.opt.startY - t.opt.maxDistance;\par
    t.lastY = t.opt.startY + t.opt.maxDistance;\par
    t.tilesSearched = 0;\par
    t.tilesFound = 0;\par
    t.curX = t.firstX;\par
    t.curY = t.firstY;\par
    var xxx = t.normalizeCoord(t.curX);\par
    var yyy = t.normalizeCoord(t.curY);\par
    document.getElementById ('statStatus').innerHTML = 'Searching at '+ xxx +','+ yyy;\par
if (DEBUG_TRACE) logit (" 0 clickedSearch()... setTimeout ..:" + xxx +' , '+ yyy +' , '+ t.mapCallback.name);\par
    setTimeout (function()\{Map.request (xxx, yyy, 15, t.mapCallback)\}, MAP_DELAY);\par
  \},\par
\par
  dispMapTable : function ()\{\par
    var tileNames = ['Barb Camp', 'Grassland', 'Lake', 'Woodlands', 'Hills', 'Mountain', 'Plain', 'City' ];\par
    var t = Tabs.Search;\par
    var coordsOnly = document.getElementById('coordsOnly').checked;\par
if (DEBUG_TRACE) DebugTimer.start();\par
    function mySort(a, b)\{\par
      if (Options.srcSortBy == 'level')\{\par
        if ((x = a[4] - b[4]) != 0)\par
          return x;\par
      \}\par
\tab   if (Options.srcSortBy == 'might')\{\par
        if ((x = b[10] - a[10]) != 0)\par
          return x;\par
      \}\par
      return a[2] - b[2];\par
    \}\par
\par
    dat = [];\par
    for (i=0; i<t.mapDat.length; i++)\{\par
      lvl = parseInt (t.mapDat[i][4]);\par
      type = t.mapDat[i][3];\par
\tab   if (t.opt.searchType == 2 && type == 7 ) \{\par
\tab\tab\tab if (!(Options.cityType == 2) || t.mapDat[i][12] == 'ally')\par
\tab\tab\tab if (!(Options.cityType == 3) || t.mapDat[i][12] == 'friendly') \par
\tab\tab\tab if (!(Options.cityType == 4) || t.mapDat[i][12] == 'hostile')\par
\tab\tab\tab if (!(Options.cityType == 5) || t.mapDat[i][12] == 'neutral') \par
\tab\tab\tab if (!(Options.cityType == 6) || t.mapDat[i][12] == 'unaligned') \par
\tab\tab\tab if (!(Options.cityType == 7) || t.mapDat[i][5]===true)\par
\tab\tab\tab if ((t.mapDat[i][10] > parseInt(Options.MightSrc)) || t.mapDat[i][5]===true)\par
\tab\tab dat.push(t.mapDat[i]);\par
\tab   \} else \{\par
\tab\tab   if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel)\{\par
\tab\tab\tab if (t.opt.searchType==0 || Options.wildType==0\par
\tab\tab\tab ||  (Options.wildType==1 && (type==1 || type==2))\par
\tab\tab\tab ||  (Options.wildType == type))\par
\tab\tab\tab   if (!Options.unownedOnly || t.mapDat[i][5]===false)\par
\tab\tab\tab\tab dat.push (t.mapDat[i]);\par
\tab\tab\}\par
\tab   \}\par
    \}\par
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: FILTER');\par
\par
    document.getElementById('statFound').innerHTML = 'Found: '+ dat.length;\par
    if (dat.length == 0)\{\par
      m = '<BR><CENTER>None found</center>';\par
    \} else \{\par
      dat.sort(mySort);\par
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: SORT');\par
      if (coordsOnly)\par
        m = '<TABLE align=center id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Location</td></tr>';\par
      else \{\par
        if (t.opt.searchType == 2) \{\par
\tab\tab\tab m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Location</td><TD >Dist</td><TD>City</td><TD>Owner</td><TD>Might</td><td>Alliance               </td><TD width=80% style="font-size:9px;">More info</td><TD style="padding-left: 10px;"></td></tr>';\par
\tab\tab\} else \{ \par
\tab\tab\tab m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Location</td><TD style="padding-left: 10px">Distance</td><TD style="padding-left: 10px;">Lvl</td><TD width=80%> &nbsp; Type</td><TD style=""></td></tr>';\par
\tab\tab\}\par
\tab   \}\par
      var numRows = dat.length;\par
      if (numRows > 500 && t.searchRunning)\{\par
        numRows = 500;\par
        document.getElementById('srchSizeWarn').innerHTML = '<FONT COLOR=#600000>NOTE: Table only shows 500 of '+ dat.length +' results until search is complete.</font>';\par
      \}\par
      for (i=0; i<numRows; i++)\{\par
\tab     m += '<TR valign="top"';\par
\tab\tab  if (dat[i][12]) m += 'class="pt'+dat[i][12]+'"';\par
        m += ' ><TD><DIV onclick="ptGotoMapHide('+ dat[i][0] +','+ dat[i][1] +')"><A>'+ dat[i][0] +','+ dat[i][1] +'</a></div></td>';\par
        if (coordsOnly)\par
          m += '</tr>';\par
        else\par
\tab\tab\tab if (t.opt.searchType == 2) \{ \par
\tab\tab\tab\tab  m += '<TD align="left"  valign="top">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=left>'+ dat[i][8] +'</td><TD valign="top">'+dat[i][9]+'</td><TD valign="top">'+dat[i][10]+'</td><td>'+dat[i][11]+'</td><td>';\par
\tab\tab\tab\tab  if (dat[i][5]) \{\par
\tab\tab\tab\tab\tab m += '<DIV onclick="PTscout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A style="font-size:9px;" >Scout</a></div>';\par
\tab\tab\tab\tab\} else \par
\tab\tab\tab\tab\tab m += '<DIV onclick="PTpd(this, '+ dat[i][7] +')"><A style="font-size:9px;" >Details</a></div>\\\par
\tab\tab\tab\tab\tab <DIV style="" onclick="PTpd2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Leaderboard</a></div>\\\par
\tab\tab\tab\tab\tab <DIV style="" onclick="PCpo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Onlinestatus</a></div>\\\par
\tab\tab\tab\tab\tab <DIV style="" onclick="PCplo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Last Login</a></div>';\par
\tab\tab\tab\tab\tab m+= '</td><TD  valign="top">'+ (dat[i][5]?' Misted':'') +'</td></tr>';\par
\tab\tab\tab\} else \{ \par
          m += '<TD align=right>'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ tileNames[dat[i][3]]\par
            +'</td><TD>'+ (dat[i][5]?' OWNED':'') +'</td></tr>';\par
\tab\tab\tab\}\par
       \}\par
      m += '</table>';\par
    \}\par
    document.getElementById('divOutTab').innerHTML = m;\par
    dat = null;\par
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: DRAW');\par
  \},\par
\par
  mapDat : [],\par
\par
  gotoMap : function (e)\{\par
    coords = e.children[0].innerHTML.split(',');\par
    hideMe ();\par
    document.getElementById('mapXCoor').value = coords[0];\par
    document.getElementById('mapYCoor').value = coords[1];\par
    unsafeWindow.reCenterMapWithCoor();\par
    unsafeWindow.changeview_map(document.getElementById('mod_views_map'));\par
  \},\par
  \par
  stopSearch : function (msg)\{\par
    var t = Tabs.Search;\par
    document.getElementById ('statStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';\par
    document.getElementById ('srcStart').value = 'Start Search';\par
    document.getElementById('srchSizeWarn').innerHTML = '';\par
    t.searchRunning = false;\par
  \},\par
\par
\par
/** mapdata.userInfo:\par
(object) u4127810 = [object Object]\par
    (string) n = George2gh02    (name)\par
    (string) t = 1              (title code)\par
    (string) m = 55             (might)\par
    (string) s = M              (sex)\par
    (string) w = 2              (mode: 1=normal, 2=begprotect, 3=truce, 4=vacation )\par
    (string) a = 0              (alliance)\par
    (string) i = 1              (avatar code)\par
*****/\par
\par
  mapCallback : function (left, top, width, rslt)\{\par
    function insertRow (x, y, msg)\{\par
      row = document.getElementById('srcOutTab').insertRow(-1);\par
      row.insertCell(0).innerHTML = x +','+ y;\par
      row.insertCell(1).innerHTML = distance (t.opt.startX, t.opt.startY, x, y);\par
      row.insertCell(2).innerHTML = msg;\par
    \}\par
if (DEBUG_TRACE) logit (" 3 mapCallback()");\par
    var t = Tabs.Search;\par
    if (!t.searchRunning)\par
      return;\par
    if (!rslt.ok)\{\par
      t.stopSearch ('ERROR: '+ rslt.errorMsg);\par
      return;\par
    \}\par
\par
    map = rslt.data;\par
\tab var userInfo = rslt.userInfo;\par
    var alliance = rslt.allianceNames;\par
\tab\par
    for (k in map)\{\par
      if (t.opt.searchType==0 && map[k].tileType==51 && !map[k].tileCityId ) \{  // if barb\par
        type = 0;\par
      \} else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) \{\par
        if (map[k].tileType == 10)\par
          type = 1;\par
        else if (map[k].tileType == 11)\par
          type = 2;\par
        else\par
          type = (map[k].tileType/10) + 1;\par
      \} else if (t.opt.searchType==2 && map[k].tileCityId >= 0 && map[k].tileType > 50 && map[k].cityName)\par
\tab\tab   type = 7;\par
\tab\tab else\par
        continue;\par
      dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);\par
      if (dist <= t.opt.maxDistance)\{\par
\tab     if (t.opt.searchType==2) \{\par
\tab\tab\tab var isMisted = map[k].tileUserId == 0 || false;\tab\tab\par
\tab\tab\tab var uu = 'u'+map[k].tileUserId;\par
\tab\tab\tab var aU = 'unknown';\par
\tab\tab\tab var aD = 'unknown';\par
\tab\tab\tab var mightU = 0;\par
\tab\tab\tab var nameU = 'unknown';\par
\tab\tab\tab if (isMisted) \{\par
\tab\tab\tab\tab nameU = 'In mist';\par
\tab\tab\tab\tab mightU = ''; \par
\tab\tab\tab\} else \{\par
\tab\tab\tab\tab if (userInfo[uu] ) \{ // Corrects a problem with hung search.\par
\tab\tab\tab\tab\tab nameU = userInfo[uu].n;\par
\tab\tab\tab\tab\tab mightU = userInfo[uu].m; \par
\tab\tab\tab\tab\tab aD = getDiplomacy(userInfo[uu].a);\par
\tab\tab\tab\tab\tab if ( alliance && alliance['a'+userInfo[uu].a] ) \{\par
\tab\tab\tab\tab\tab\tab aU = alliance['a'+userInfo[uu].a];\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab else \{\par
\tab\tab\tab\tab\tab\tab aU = '----';\par
\tab\tab\tab\tab\tab\tab aD = 'unaligned';\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\tab if (mightU > 0 || isMisted) \{\par
\tab\tab t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName,nameU,mightU,aU,aD ]);\par
\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\} else \{\par
        isOwned = map[k].tileUserId>0 || map[k].misted;\par
        t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned]);\par
\tab\tab\}\par
        ++t.tilesFound;\par
      \}\par
    \}\par
    t.tilesSearched += (15*15);\par
    document.getElementById('statSearched').innerHTML = 'Searched: '+ t.tilesSearched;\par
    t.dispMapTable();\par
\par
    t.curX += 15;\par
    if (t.curX > t.lastX)\{\par
      t.curX = t.firstX;\par
      t.curY += 15;\par
      if (t.curY > t.lastY)\{\par
        t.stopSearch ('Done!');\par
        return;\par
      \}\par
    \}\par
\par
    var x = t.normalizeCoord(t.curX);\par
    var y = t.normalizeCoord(t.curY);\par
    document.getElementById ('statStatus').innerHTML = 'Searching at '+ x +','+ y;\par
if (DEBUG_TRACE) logit (" 0 mapCallback()... setTimeout ..:" + x +' , '+ y +' , '+ t.mapCallback.toString().substr (0,50));\par
    setTimeout (function()\{Map.request (x, y, 15, t.mapCallback)\}, MAP_DELAY);\par
  \},\par
\};\par
\par
\par
\par
/*******************   KOC Map interface ****************/\par
Map = \{\par
/***\par
 0: bog\par
10: grassland\par
11: lake\par
20: woods\par
30: hills\par
40: mountain\par
50: plain\par
51: city / barb\par
53: misted city\par
***/\par
  generateBlockList : function(left, top, width) \{\par
    var width5 = parseInt(width / 5);\par
    var bl = [];\par
\par
    for (x=0; x<width5; x++)\{\par
      xx = left + (x*5);\par
      if (xx > 745)\par
        xx -= 750;\par
      for (y=0; y<width5; y++)\{\par
        yy = top + (y*5);\par
        if (yy > 745)\par
          yy -= 750;\par
        bl.push ('bl_'+ xx +'_bt_'+ yy);\par
      \}\par
    \}\par
    return bl.join(",");\par
  \},\par
\par
  callback : null,\par
  request : function (left, top, width, cb) \{\par
if (DEBUG_TRACE) logit (" 1 Map.request(): "+ left +' , '+ top +' , '+ width);\par
    left = parseInt(left / 5) * 5;\par
    top = parseInt(top / 5) * 5;\par
    width = parseInt((width+4) / 5) * 5;\par
    var blockString = this.generateBlockList(left, top, width);\par
    Map.callback = cb;\par
    if (unsafeWindow.SANDBOX)\par
      return RequestMAPTEST(left, top, width, callback);\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.blocks = blockString;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
if (DEBUG_TRACE) logit (" 2 Map.request  Map = "+ inspect (Map, 2, 1, 2));\par
        Map.callback(left, top, width, rslt);\par
      \},\par
      onFailure: function (rslt) \{\par
        Map.callback(left, top, width, rslt);\par
      \}\par
    \});\par
  \},\par
\};\par
\par
\par
/*************************************** Train Tab ***********************************************/\par
\par
Tabs.Train = \{\par
  tabOrder : 15,\par
  cont : null,\par
  timer : null,\par
  stats : \{\},\par
  selectedCity : \{\},\par
  trainTimer : null,\par
  running : false,\par
  \par
  init : function (div)\{\par
    var t = Tabs.Train;\par
    t.cont = div;\par
    s = "<DIV id=trainTopSelect>\\\par
      <DIV class=ptstat>Train troops and build wall/field defenses</div><DIV style='height:10px'></div><DIV class=ptentry>\\\par
      <DIV style='text-align:center; margin-bottom:10px;'>Select City: &nbsp; <span id=ptspeedcity></span></div>\\\par
      <TABLE class=ptTab width=100%><TR valign=top><TD width=50%>\\\par
      <TABLE align=center><TR><TD align=right>Troop Type: </td><TD colspan=2>\\\par
      <SELECT id=ptttType>\\\par
        <option value='1'>Supply Troop</option>\\\par
        <option value='2'>Militiaman</option>\\\par
        <option value='3'>Scout</option>\\\par
        <option value='4'>Pikeman</option>\\\par
        <option value='5'>Swordsman</option>\\\par
        <option value='6'>Archer</option>\\\par
        <option value='7'>Cavalry</option>\\\par
        <option value='8'>Heavy Cavalry</option>\\\par
        <option value='9'>Supply Wagon</option>\\\par
        <option value='10'>Ballista</option>\\\par
        <option value='11'>Battering Ram</option>\\\par
        <option value='12'>Catapult</option>\\\par
      </select> &nbsp; (max <span id=ptttSpMax></span>)</td></tr>\\\par
      <TR><TD align=right># per slot: </td><TD><INPUT id='ptttInpPS' size=5 type='text' value='0'\\></td>\\\par
        <TD><INPUT id='ptttButMaxPS' type=submit value='max'\\> &nbsp; (max <span id=ptttSpMaxPS>0</span>)</td></tr>\\\par
      <TR><TD align=right># of slots: </td><TD><INPUT id='ptttInpSlots' size=2 type='text' value='1'\\></td>\\\par
        <TD width=75%><INPUT id='ptttButMaxSlots' type=submit value='max'\\> &nbsp; (max <span id=ptttSpMaxSlots>1</span>)</td></tr>\\\par
      <TR><TD align=right valign=top>Set Workers idle: </td><TD colspan=2><INPUT type=CHECKBOX id=chkPop"+ (Options.maxIdlePop?' CHECKED ':'') +"> \\\par
        <SPAN style='white-space:normal;'>Allows you to train more troops. May temporarily set idle population negative.</span></td></tr>\\\par
      <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='ptttButDo' type=submit value='Train Troops'\\></td></tr>\\\par
      </table></td><TD width=20></td><TD style='border-left:solid 2px;' width=50% align=center>\\\par
      <TABLE align=center><TR><TD align=right>Defense Type: </td><TD colspan=2>\\\par
      <SELECT id=pttdType>\\\par
        <option value='53'>Crossbow</option>\\\par
        <option value='55'>Trebuchet</option>\\\par
        <option value='60'>Trap</option>\\\par
        <option value='61'>Caltrop</option>\\\par
        <option value='62'>Spiked Barrier</option>\\\par
      </select> &nbsp; (<span id=pttdSpMax></span>)</td></tr>\\\par
      <TR><TD align=right># per slot: </td><TD><INPUT id='pttdInpPS' size=5 type='text' value='0'\\></td>\\\par
        <TD><INPUT id='pttdButMaxPS' type=submit value='max'\\> &nbsp; (max <span id=pttdSpMaxPS>0</span>)</td></tr>\\\par
      <TR><TD align=right># of slots: </td><TD><INPUT id='pttdInpSlots' size=2 type='text' value='1'\\></td>\\\par
        <TD width=75%><INPUT id='pttdButMaxSlots' type=submit value='max'\\> &nbsp; (max <span id=pttdSpMaxSlots>1</span>)</td></tr>\\\par
      <TR align=center><TD colspan=3><SPAN id=pttdSpace></span></td></tr>\\\par
      <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='pttdButDo' type=submit value='Build Defenses'\\></td></tr></table>\\\par
      </td></tr></table></div></div>\\\par
      <TABLE align=center width=425 class=ptTab><TR><TD><div id=ptTrainStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>\\\par
      <div style='height: 330px; background: #e8ffe8'>\\\par
      <TABLE width=100% class=ptTab><TR><TD colspan=3><DIV id=divSTtop></div></td></tr>\\\par
      <TR><TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>Troop Queue &nbsp; (<SPAN id=statTTtot></span>)</b><BR><HR></div><DIV id=divSTleft style='overflow-y: auto; height:210px; max-height:210px'></div></td>\\\par
        <TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>Defense Queue &nbsp; (<SPAN id=statDTtot></span>)</b><BR><HR></div><DIV id=divSTright style='overflow-y: auto; height:210px; max-height:210px'></div></td></tr>\\\par
      </div>";\par
    t.cont.innerHTML = s;\par
\par
    var dcp = new CdispCityPicker ('ptspeed', document.getElementById('ptspeedcity'), true, t.clickCitySelect, 0);\par
    t.TTspMax = document.getElementById ('ptttSpMax');\par
    t.TTspMaxPS = document.getElementById ('ptttSpMaxPS');\par
    t.TTspMaxSlots = document.getElementById ('ptttSpMaxSlots');\par
    t.TTbutMaxSlots = document.getElementById ('ptttButMaxSlots');\par
    t.TTbutMaxPerSlot = document.getElementById ('ptttButMaxPS');\par
    t.TTinpPerSlot = document.getElementById ('ptttInpPS');\par
    t.TTinpSlots = document.getElementById ('ptttInpSlots');\par
    t.TTselType = document.getElementById ('ptttType');\par
    t.TTbutDo = document.getElementById ('ptttButDo');\par
    t.TDspMax = document.getElementById ('pttdSpMax');\par
    t.TDspMaxPS = document.getElementById ('pttdSpMaxPS');\par
    t.TDspMaxSlots = document.getElementById ('pttdSpMaxSlots');\par
    t.TDbutMaxSlots = document.getElementById ('pttdButMaxSlots');\par
    t.TDbutMaxPerSlot = document.getElementById ('pttdButMaxPS');\par
    t.TDinpPerSlot = document.getElementById ('pttdInpPS');\par
    t.TDinpSlots = document.getElementById ('pttdInpSlots');\par
    t.TDselType = document.getElementById ('pttdType');\par
    t.TDbutDo = document.getElementById ('pttdButDo');\par
    t.TDspSpace = document.getElementById ('pttdSpace');\par
    t.divTrainStatus = document.getElementById ('ptTrainStatus');\par
          \par
    t.TTinpSlots.addEventListener ('change', t.updateTopTroops, false);\par
    t.TTbutMaxPerSlot.addEventListener ('click', t.clickTroopMaxPS, false);\par
    t.TTbutMaxSlots.addEventListener ('click', t.clickTroopMaxSlots, false);\par
    t.TTselType.addEventListener ('change', t.changeTroopSelect, false);\par
    t.TTbutDo.addEventListener ('click', t.clickTroopDo, false);\par
    t.TDinpSlots.addEventListener ('change', t.updateTopDef, false);\par
    t.TDselType.addEventListener ('change', t.changeDefSelect, false);\par
    t.TDbutMaxPerSlot.addEventListener ('click', t.clickDefMaxPS, false);\par
    t.TDbutMaxSlots.addEventListener ('click', t.clickDefMaxSlots, false);\par
    t.TDbutDo.addEventListener ('click', t.clickDefDo, false);\par
    \par
    document.getElementById ('chkPop').addEventListener ('change', t.clickCheckIdlePop, false);\par
    t.changeTroopSelect();\par
    t.changeDefSelect();\par
  \},\par
\par
\par
  hide : function ()\{\par
    var t = Tabs.Train;\par
    clearTimeout (t.timer);\par
  \},\par
  \par
  show : function ()\{\par
    var t = Tabs.Train;\par
    clearTimeout (t.timer);\par
    t.displayCityStats();\par
    t.changeTroopSelect();\par
    t.changeDefSelect();\par
    t.timer = setTimeout (t.show, 2000);\par
  \},\par
\par
/*******  TROOPS  ******/  \par
  \par
  updateTopTroops : function ()\{\par
    var t = Tabs.Train;\par
    var slots = parseInt(t.TTinpSlots.value, 10);\par
    if (isNaN(slots) || slots<0)\par
      slots = 0;\par
    t.TTspMax.innerHTML = t.stats.MaxTrain;\par
    t.TTspMaxSlots.innerHTML = t.stats.barracks - t.stats.queued;\par
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))\par
      t.TTspMaxPS.innerHTML = 0;\par
    else\par
      t.TTspMaxPS.innerHTML = parseInt(t.stats.MaxTrain / slots);\par
  \},\par
      \par
  \par
  clickTroopMaxPS : function ()\{\par
    var t = Tabs.Train;\par
    var slots = parseInt(t.TTinpSlots.value, 10);\par
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))\par
      t.TTinpPerSlot.value = 0;\par
    else\par
      t.TTinpPerSlot.value = parseInt(t.stats.MaxTrain / slots);\par
  \},\par
\par
  clickTroopMaxSlots : function ()\{\par
    var t = Tabs.Train;\par
    t.TTinpSlots.value = t.stats.barracks - t.stats.queued;\par
  \},\par
  \par
  clickCitySelect : function (city)\{\par
    var t = Tabs.Train;\par
    t.selectedCity = city;\par
    t.lastQueString = null;   \par
    t.lastDQueString = null;   \par
    t.displayCityStats ();\par
    t.changeTroopSelect();\par
    t.changeDefSelect();\par
  \},\par
  \par
  clickCheckIdlePop : function ()\{\par
    var t = Tabs.Train;\par
    if (document.getElementById ('chkPop').checked)\par
      Options.maxIdlePop = true;\par
    else\par
      Options.maxIdlePop = false;\par
    saveOptions ();\par
    t.displayCityStats ();\par
    t.changeTroopSelect ();\par
  \},\par
\par
  limitingFactor : null,\par
    \par
  changeTroopSelect : function ()\{\par
    var t = Tabs.Train;\par
    var cityId = t.selectedCity.id;\par
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?\par
    var id = t.TTselType.value;\par
    t.lastTroopSelect = id;\par
    t.limitingFactor = null;\par
    var uc = unsafeWindow.unitcost['unt'+id];\par
    var max = 9999999999;\par
    if ( (t.stats.food / uc[1]) < max)\{\par
      max = t.stats.food / uc[1];\par
      t.limitingFactor = 'food';\par
    \}\par
    if ( (t.stats.wood / uc[2]) < max)\{\par
      max = t.stats.wood / uc[2];\par
      t.limitingFactor = 'wood';\par
    \}\par
    if ( (t.stats.stone / uc[3]) < max)\{\par
      max = t.stats.stone / uc[3];\par
      t.limitingFactor = 'stone';\par
    \}\par
    if ( (t.stats.ore / uc[4]) < max)\{\par
      max = t.stats.ore / uc[4];\par
      t.limitingFactor = 'ore';\par
    \}\par
    if ( (t.stats.idlePop / uc[6]) < max)\{\par
      max = t.stats.idlePop / uc[6];\par
      t.limitingFactor = 'pop';\par
    \}\par
    t.stats.MaxTrain = parseInt (max);\par
    if (t.stats.MaxTrain < 0)\par
      t.stats.MaxTrain = 0;\par
    if (matTypeof(uc[8]) == 'object')\{\par
      for (k in uc[8])\{  // check building requirement\par
        var b = getCityBuilding (cityId, k.substr(1));\par
        if (b.maxLevel < uc[8][k][1])\{\par
          t.stats.MaxTrain = 0;\par
          t.limitingFactor = null;\par
          break;\par
        \}\par
      \}\par
    \}\par
    if (matTypeof(uc[9]) == 'object')\{\par
      for (k in uc[9])\{    // check tech requirement\par
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1])\{\par
          t.stats.MaxTrain = 0;\par
          t.limitingFactor = null;\par
          break;\par
        \}\par
      \}\par
    \}\par
if (t.limitingFactor)\{\par
  document.getElementById('ptttr_'+ t.limitingFactor).className = 'boldRed';\par
\}    \par
    t.updateTopTroops();\par
  \},\par
\par
    \par
  clickTroopDo : function ()\{\par
    var t = Tabs.Train;\par
    var cityId = t.selectedCity.id;\par
    var unitId = t.TTselType.value;\par
    var perSlot = parseInt(t.TTinpPerSlot.value, 10);\par
    var numSlots = parseInt(t.TTinpSlots.value, 10);\par
    \par
    t.displayCityStats ();\par
    if (t.running)\{\par
      t.stopTraining('<SPAN class=boldRed>Training cancelled by user</span>');\par
      return; \par
    \}    \par
    if (perSlot<1)\{\par
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Number of troops per slot must be greater than 0.</font>';\par
      return;\par
    \}\par
    if (perSlot*numSlots > t.stats.MaxTrain)\{\par
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Can\\'t train that many troops (max is '+ t.stats.MaxTrain +' total)</font>';\par
      return;\par
    \}\par
    if (numSlots<1 || numSlots>t.stats.barracks - t.stats.queued)\{\par
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Invalid number of slots.</font>';\par
      return;\par
    \}\par
    \par
    t.TDbutDo.disabled = true;\par
    t.TTbutDo.className = 'ptButCancel';\par
    t.TTbutDo.value = 'CANCEL';\par
\par
    var que = [];\par
    for (var i=0; i<numSlots; i++)\par
      que.push (['T', unitId, parseInt (perSlot)]);\par
    t.divTrainStatus.innerHTML = '';\par
    t.running = true;\par
    t.doQueue (cityId, que);\par
  \},\par
\par
  \par
/*******  DEF  ******/  \par
  \par
  updateTopDef : function ()\{\par
    var t = Tabs.Train;\par
    var slots = parseInt(t.TDinpSlots.value, 10);\par
    if (isNaN(slots) || slots<0)\par
      slots = 0;\par
    t.TDspMax.innerHTML = 'max:'+ t.stats.MaxDefTrain +'&nbsp; owned:'+ t.stats.defOwned;   \par
    t.TDspMaxSlots.innerHTML = t.stats.wallLevel-t.stats.Dqueued;\par
    if (slots<1)\par
      t.TDspMaxPS.innerHTML = 0;\par
    else\par
      t.TDspMaxPS.innerHTML = parseInt(t.stats.MaxDefTrain / slots);\par
\par
    t.TDspSpace.innerHTML = 'Wall level: <B>'+ t.stats.wallLevel +'</b><BR>Wall space: '+ (t.stats.wallSpaceUsed+t.stats.wallSpaceQueued)  +'/<B>'+ t.stats.wallSpace +'</b><BR>\\\par
        Field space: '+ (t.stats.fieldSpaceUsed+t.stats.fieldSpaceQueued) +'/<B>'+ t.stats.fieldSpace +'</b>';\par
  \},\par
\par
  changeDefSelect : function ()\{\par
    var t = Tabs.Train;\par
    var cityId = t.selectedCity.id;\par
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?\par
    var id = t.TDselType.value;\par
    t.lastDefSelect = id;\par
    t.stats.defOwned = parseInt(Seed.fortifications['city' + cityId]['fort'+id]);    \par
    var uc = unsafeWindow.fortcost['frt'+id];\par
    var max = 9999999999;\par
    if ( (t.stats.food / uc[1]) < max)\par
      max = t.stats.food / uc[1];\par
    if ( (t.stats.wood / uc[2]) < max)\par
      max = t.stats.wood / uc[2];\par
    if ( (t.stats.stone / uc[3]) < max)\par
      max = t.stats.stone / uc[3];\par
    if ( (t.stats.ore / uc[4]) < max)\par
      max = t.stats.ore / uc[4];\par
    if ( (t.stats.idlePop / uc[6]) < max)\par
      max = t.stats.idlePop / uc[6];\par
    t.stats.MaxDefTrain = parseInt (max);\par
    if (t.stats.MaxDefTrain < 0)\par
      t.stats.MaxDefTrain = 0;\par
    if (matTypeof(uc[8]) == 'object')\{\par
      for (k in uc[8])\{  // check building requirement\par
        var b = getCityBuilding (cityId, k.substr(1));\par
        if (b.maxLevel < uc[8][k][1])\{\par
          t.stats.MaxDefTrain = 0;\par
          break;\par
        \}\par
      \}\par
    \}\par
    if (matTypeof(uc[9]) == 'object')\{\par
      for (k in uc[9])\{    // check tech requirement\par
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1])\{\par
          t.stats.MaxDefTrain = 0;\par
          break;\par
        \}\par
      \}\par
    \}\par
\par
    var spaceEach = parseInt(unsafeWindow.fortstats["unt"+ id][5]);\par
    if (id<60)\par
      var spaceAvail = t.stats.wallSpace - t.stats.wallSpaceUsed - t.stats.wallSpaceQueued;\par
    else\par
      var spaceAvail = t.stats.fieldSpace - t.stats.fieldSpaceUsed - t.stats.fieldSpaceQueued;\par
    if ( t.stats.MaxDefTrain * spaceEach > spaceAvail)\par
      t.stats.MaxDefTrain = parseInt(spaceAvail / spaceEach);\par
    \par
    t.updateTopDef();\par
  \},\par
  \par
  clickDefMaxPS : function ()\{\par
    var t = Tabs.Train;\par
    var slots = parseInt(t.TDinpSlots.value, 10);\par
    if (slots<1)\par
      t.TDinpPerSlot.value = 0;\par
    else\par
      t.TDinpPerSlot.value = parseInt(t.stats.MaxDefTrain / slots);\par
  \},\par
\par
  clickDefMaxSlots : function ()\{\par
    var t = Tabs.Train;\par
    t.TDinpSlots.value = t.stats.wallLevel-t.stats.Dqueued;\par
  \},\par
    \par
  clickDefDo : function ()\{\par
    var t = Tabs.Train;\par
    var cityId = t.selectedCity.id;\par
    var unitId = t.TDselType.value;\par
    var perSlot = parseInt(t.TDinpPerSlot.value, 10);\par
    var numSlots = parseInt(t.TDinpSlots.value, 10);\par
    \par
    t.displayCityStats ();\par
    if (t.running)\{\par
      t.stopTraining('<SPAN class=boldRed>Training cancelled by user</span>');\par
      return; \par
    \}    \par
    if (perSlot<1)\{\par
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Number of units per slot must be greater than 0.</font>';\par
      return;\par
    \}\par
    if (perSlot*numSlots > t.stats.MaxDefTrain)\{\par
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Can\\'t train that many unit (max is '+ t.stats.MaxDefTrain +' total)</font>';\par
      return;\par
    \}\par
    if (numSlots<1 || numSlots > t.stats.wallLevel-t.stats.Dqueued)\{\par
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Invalid number of slots.</font>';\par
      return;\par
    \}\par
    t.TTbutDo.disabled = true;\par
    t.TDbutDo.className = 'ptButCancel';\par
    t.TDbutDo.value = 'CANCEL';\par
\par
    var que = [];\par
    for (var i=0; i<numSlots; i++)\par
      que.push (['T', unitId, parseInt (perSlot)]);\par
    t.divTrainStatus.innerHTML = '';\par
    t.running = true;\par
    t.doDefQueue (cityId, que);\par
  \},\par
\par
  doDefQueue : function (cityId, que, errMsg)\{\par
    var t = Tabs.Train;\par
    clearTimeout (t.trainTimer);\par
    try \{\par
      t.displayCityStats();\par
      if (errMsg)\{\par
        t.stopTraining ('<SPAN class=boldRed>ERROR: '+ errMsg +'</span>');\par
        return;\par
      \}\par
      var cmd = que.shift();\par
      if (!cmd)\{\par
        t.stopTraining ('<B>Done queueing defenses.</b>');\par
        return;\par
      \}\par
      if (cmd[0] == 'T')\{\par
        t.dispTrainStatus ('Training '+ cmd[2] +' '+  fortNamesShort[cmd[1]] +' at '+ Cities.byID[cityId].name +' ('+ que.length +' slots remaining)<BR>');\par
        doDefTrain ( cityId, cmd[1], cmd[2], \par
          function(errMsg)\{\par
            t.trainTimer = setTimeout(function ()\{Tabs.Train.doDefQueue(cityId, que, errMsg);\}, (Math.random()*3500)+1500);\par
          \} );\par
      \}\par
    \} catch (err) \{\par
      logit (inspect (err, 8, 1));\par
      t.stopTraining ('<SPAN class=boldRed>PROGRAM ERROR: '+ err.message +'</span>');\par
    \}\par
  \},\par
  \par
\par
  // fix KofC bugs ....\par
  // if first start time > now, make it now\par
  // if any end time != next start time, fix it\par
  fixQueTimes : function (q)\{\par
    var now = unixTime();\par
    if (q[0][2] > now)\par
      q[0][2] = now;\par
    for (var i=0; i<q.length; i++)\{\par
      if (q[i+1]!=null && q[i+1][2]!=q[i][3])\par
        q[i][3] = q[i+1][2];\par
    \}        \par
  \},\par
\par
  expireTheQueue : function (q)\{\par
    if (q==null)\par
      return;\par
    var now = unixTime();\par
    while (q.length>0 && (q[0][3] - now) < 1)\par
      q.shift();\par
  \},\par
    \par
  displayCityStats : function ()\{\par
    var t = Tabs.Train;\par
    var cityId = t.selectedCity.id;\par
    t.stats.food = parseInt (Seed.resources['city'+cityId].rec1[0]/3600);\par
    t.stats.wood = parseInt (Seed.resources['city'+cityId].rec2[0]/3600);\par
    t.stats.stone = parseInt (Seed.resources['city'+cityId].rec3[0]/3600);\par
    t.stats.ore = parseInt (Seed.resources['city'+cityId].rec4[0]/3600);\par
    t.stats.gold = Seed.citystats['city'+cityId].gold[0];\par
    if (Options.maxIdlePop)\par
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]);\par
    else\par
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]) - parseInt(Seed.citystats['city'+cityId].pop[3]);\par
    t.stats.barracks = getCityBuilding (cityId, 13).count;\par
    var m = '<CENTER><B>'+ Cities.byID[cityId].name +' &nbsp; ('+ Cities.byID[cityId].x +','+ Cities.byID[cityId].y +')</b></center><HR>';\par
//added21mar\par
\tab\par
m += '<TABLE class=ptTab width=100%><TR align=center>\\\par
        <TD width=8%><B>Supply:</b></td><TD width=8%><B>Militia:</b></td><TD width=8%><B>Scout:</b></td>\\\par
        <TD width=8%><B>Pike:</b></td><TD width=8%><B>Sword:</b></td><TD width=8%><B>Archer:</b></td>\\\par
        <TD width=8%><B>Cav:</b></td><TD width=8%><B>Heavy Cav:</b></td><TD width=8%><B>Wagon:</b></td>\\\par
        <TD width=8%><B>Ballista:</b></td><TD width=8%><B>Ram:</b></td><TD width=8%><B>Catapult:</b></td><tr>';\par
\tab\tab\par
 m += '<TR align=center><TD width=8%>'+Seed.units['city'+cityId]['unt1']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt2']+\par
 '<TD width=8%>'+Seed.units['city'+cityId]['unt3']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt4']+\par
 '<TD width=8%>'+Seed.units['city'+cityId]['unt5']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt6']+\par
 '<TD width=8%>'+Seed.units['city'+cityId]['unt7']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt8']+\par
 '<TD width=8%>'+Seed.units['city'+cityId]['unt9']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt10']+\par
 '<TD width=8%>'+Seed.units['city'+cityId]['unt11']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt12']+'</td><tr></table>';\par
//end of added21mar\par
    m += '<TABLE class=ptTab width=100%><TR align=center>\\\par
        <TD width=18%><SPAN id=ptttr_food><B>Food:</b><BR>'+ addCommasInt(t.stats.food) +'</span></td>\\\par
        <TD width=16%><SPAN id=ptttr_wood><B>Wood:</b><BR>'+ addCommasInt(t.stats.wood) +'</span></td>\\\par
        <TD width=16%><SPAN id=ptttr_ore><B>Ore:</b><BR>'+ addCommasInt(t.stats.ore) +'</span></td>\\\par
        <TD width=16%><SPAN id=ptttr_gold><B>Gold:</b><BR>'+ addCommasInt(t.stats.gold) +'</span></td>\\\par
        <TD width=16%><SPAN id=ptttr_pop><B>Idle Pop:</b><BR>'+ addCommasInt(t.stats.idlePop) +'</span></td></tr></table><BR>';\par
    document.getElementById ('divSTtop').innerHTML = m;\par
    \par
// troop queue .... \par
    var totTime = 0;\par
    var q = Seed.queue_unt['city'+cityId];\par
    t.expireTheQueue(q);\par
    var qs = q.toString();\par
    var now = unixTime();\par
    if (q!=null && q.length>0)\par
      totTime = q[q.length-1][3] - now;\par
    if ( qs == t.lastQueString)\{\par
      if (q!=null && q.length>0)\{\par
        var cur = q[0][3] - now;\par
        document.getElementById ('ptttfq').innerHTML = timestr(cur, true);\par
      \}\par
    \} else \{\par
      t.lastQueString = qs;\par
      t.stats.queued = 0;\par
      m = '<TABLE align=center class=ptTab>';\par
      if (q!=null && q.length>0 )\{\par
        t.fixQueTimes (q);\par
        t.stats.queued = q.length;\par
        first = true;\par
        for (var i=0; i<q.length; i++)\{\par
          start = q[i][2];\par
          end = q[i][3];\par
          if (first)\par
            actual = end - now;\par
          else\par
            actual = end - lastEnd;\par
          if (actual < 0)\par
            actual = 0;\par
          m += '<TR align=right><TD>'+ q[i][1] +' </td><TD align=left> '+ unsafeWindow.unitcost['unt'+q[i][0]][0];\par
          if (first)\par
            m += '</td><TD> &nbsp; '+  timestr(end-start, true) +'</td><TD> (<SPAN id=ptttfq>'+ timestr(actual, true) +'</span>)';\par
          else\par
            m += '</td><TD> &nbsp; '+  timestr(actual, true) +'</td></tr>'; \par
          lastEnd = end;\par
          first = false;\par
        \}\par
      \}\par
      m += '</table>';\par
      document.getElementById ('divSTleft').innerHTML = m;\par
    \}\par
    m = t.stats.barracks +' barracks';\par
    if (t.stats.queued > 0)\par
      m += ', '+ t.stats.queued +' slots';\par
    if (totTime > 0)\par
      m += ', '+ unsafeWindow.timestr(totTime);\par
    document.getElementById ('statTTtot').innerHTML = m;\par
    \par
// defense queue ....\par
    getWallInfo (cityId, t.stats);    \par
    var totTime = 0;\par
    var q = Seed.queue_fort['city'+cityId];\par
    t.expireTheQueue(q);\par
    var qs = q.toString();\par
    if (q!=null && q.length>0)\par
      totTime = q[q.length-1][3] - now;\par
    if ( qs == t.lastDQueString)\{\par
      if (q!=null && q.length>0)\{\par
        var cur = q[0][3] - now;\par
        document.getElementById ('pttdfq').innerHTML = timestr(cur, true);\par
      \}\par
    \} else \{\par
      t.lastDQueString = qs;\par
      t.stats.Dqueued = 0;\par
      t.stats.wallSpaceQueued = 0;\par
      t.stats.fieldSpaceQueued = 0;\par
      m = '<TABLE align=center class=ptTab>';\par
      if (q!=null && q.length > 0 )\{\par
        t.fixQueTimes (q);\par
        t.stats.Dqueued = q.length;\par
        first = true;\par
        for (i=0; i<q.length; i++)\{\par
          if (q[i][0] < 60)          \par
            t.stats.wallSpaceQueued += parseInt(unsafeWindow.fortstats["unt"+ q[i][0]][5]) * parseInt(q[i][1]);\par
          else          \par
            t.stats.fieldSpaceQueued += parseInt(unsafeWindow.fortstats["unt"+ q[i][0]][5]) * parseInt(q[i][1]);\par
          start = q[i][2];\par
          end = q[i][3];\par
          if (first)\par
            actual = end - now;\par
          else\par
            actual = end - lastEnd;\par
          if (actual < 0)\par
            actual = 0;\par
          m += '<TR align=right><TD>'+ q[i][1] +' </td><TD align=left> '+ fortNamesShort[q[i][0]];\par
          if (first)\par
            m += '</td><TD> &nbsp; '+  timestr(end-start, true) +'</td><TD> (<SPAN id=pttdfq>'+ timestr(actual, true) +'</span>)';\par
          else\par
            m += '</td><TD> &nbsp; '+  timestr(actual, true) +'</td></tr>'; \par
          lastEnd = end;\par
          first = false;\par
        \}\par
      \}\par
      m += '</table>';\par
      document.getElementById ('divSTright').innerHTML = m;\par
    \}\par
    m = t.stats.Dqueued +' slots';\par
    if (totTime > 0)\par
      m += ', '+ unsafeWindow.timestr(totTime);\par
    document.getElementById ('statDTtot').innerHTML = m;\par
  \},\par
\par
  dispTrainStatus : function (msg)\{\par
    var t = Tabs.Train;\par
    t.divTrainStatus.innerHTML = msg + t.divTrainStatus.innerHTML;\par
  \},\par
\par
  \par
  stopTraining : function (msg)\{\par
    var t = Tabs.Train;\par
    clearTimeout (t.trainTimer);\par
    t.trainTimer = null;\par
    t.dispTrainStatus (msg +'<BR>');\par
    t.TDbutDo.disabled = false;\par
    t.TTbutDo.disabled = false;\par
    t.TTbutDo.value = 'Train Troops';\par
    t.TDbutDo.value = 'Build Defenses';\par
    t.TTbutDo.className = '';\par
    t.TDbutDo.className = '';\par
    t.running = false;\par
  \},\par
  \par
  \par
  doQueue : function (cityId, que, errMsg)\{\par
    var t = Tabs.Train;\par
    clearTimeout (t.trainTimer);\par
    try \{\par
      t.displayCityStats();\par
      if (errMsg)\{\par
        t.stopTraining ('<SPAN class=boldRed>'+ errMsg +'</span>');\par
        return;\par
      \}\par
      var cmd = que.shift();\par
      if (!cmd)\{\par
        t.stopTraining ('<B>Done queueing troops.</b>');\par
        return;\par
      \}\par
      if (cmd[0] == 'T')\{\par
        t.dispTrainStatus ('Training '+ cmd[2] +' '+  unsafeWindow.unitcost['unt'+cmd[1]][0] +' at '+ Cities.byID[cityId].name +' ('+ que.length +' slots remaining)<BR>');\par
        doTrain (cityId, cmd[1], cmd[2], \par
          function(errMsg)\{\par
            if (t.running)\par
              t.trainTimer = setTimeout(function ()\{Tabs.Train.doQueue(cityId, que, errMsg);\}, (Math.random()*2500)+1000 );\par
          \}\par
        );\par
      \}\par
    \} catch (err) \{\par
      logit (inspect (err, 8, 1));\par
      t.stopTraining  ('<SPAN class=boldRed>PROGRAM ERROR: '+ err.message +'</span>');\par
    \}\par
  \},\par
\}\par
\par
\par
/*************************************** OVERVIEW TAB ************************************************/\par
var GMTclock = \{\par
  span : null,\par
  timer : null,\par
  \par
  init : function ()\{\par
    this.span = document.createElement ('span');\par
    this.span.style.fontWeight = 'bold';\par
    document.getElementById('kochead_time').parentNode.appendChild (this.span);\par
    this.setEnable (Options.gmtClock);\par
  \},\par
\par
  setEnable : function (tf)\{\par
    var t = GMTclock;\par
    clearInterval (t.timer);\par
    if (tf)\{\par
      t.timer = setInterval (t.everySecond, 900);\par
    \} else \{\par
      t.span.innerHTML = '';\par
    \}\par
  \},\par
    \par
  everySecond : function ()\{\par
    var now = new Date();  \par
    now.setTime(now.getTime() + (now.getTimezoneOffset()*60000));\par
    GMTclock.span.innerHTML = ' &nbsp; ('+ now.toLocaleFormat('%H:%M:%S') +' GMT)';\par
  \},\par
\}\par
\par
\par
function getResourceProduction (cityId)\{\par
  var ret = [0,0,0,0,0];\par
  var now = unixTime ();\par
  \par
  var wilds = [0, 0, 0, 0, 0];\par
  var w = Seed.wilderness["city" + cityId];\par
  for (var k in w)\{\par
    var type = parseInt(w[k].tileType);\par
    if (type==10 || type==11)\par
      wilds[1] += parseInt(w[k].tileLevel);\par
    else \par
      wilds[type/10] += parseInt(w[k].tileLevel);\par
  \}  \par
  \par
  knight = 0;       \par
  var s = Seed.knights["city" + cityId];\par
  if (s) \{\par
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];\par
    if (s)\{\par
      var knight = parseInt(s.resourcefulness);\par
      if (s.resourcefulnessBoostExpireUnixtime > now)\par
        knight *= 1.25;\par
    \}\par
  \}\par
  var workerFactor = 1;\par
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);  // Current  population\par
  var w = parseInt(Seed.citystats["city" + cityId]["pop"][3]);  // Labor force\par
  if (w > c)\par
    workerFactor = c / w;\par
  \par
  for (var i=1; i<5; i++)\{\par
    var usage = Seed.resources["city" + cityId]["rec" + i];\par
    var items = 0;\par
    if (parseInt(Seed.playerEffects["r" + i + "BstExp"]) > now) \{\par
      items = 0.25;\par
    \}\par
    var tech = Seed.tech["tch" + i];\par
    ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + 0.05 * wilds[i]) * workerFactor + 100));\par
  \}\par
  return ret;  \par
\}\par
\par
Tabs.Overview = \{\par
  tabOrder : 1,\par
  cont : null,\par
  displayTimer : null,\par
  checkBox:null,\par
\par
  Overview : function ()\{\par
  \},\par
\par
  init : function (div)\{\par
    this.cont = div;\par
  \},\par
\par
\par
  hide : function ()\{\par
    clearTimeout (Tabs.Overview.displayTimer);\par
  \},\par
\par
  show : function ()\{\par
    var rownum = 0;\par
    var t = Tabs.Overview;\par
\par
    clearTimeout (t.displayTimer);\par
\par
    function clickEnableMarch ()\{\par
      var t = Tabs.Overview;\par
      if (checkBox.checked)\par
        Options.includeMarching = true;\par
      else\par
        Options.includeMarching = false;\par
      t.show ();\par
    \}\par
\par
    function _row (name, row, noTotal)\{\par
      if (rownum++ % 2)\par
        style = '';\par
      else\par
        style = ' style = "background: #99CCFF "';\par
      var tot = 0;\par
      var m = [];\par
      m.push ('<TR style="background: #99CCFF " align=right');\par
      m.push (style);\par
      m.push ('><TD');\par
      m.push (style);\par
      m.push ('><B>');\par
      m.push (name);\par
      m.push (' &nbsp; </td>');\par
      if (noTotal)\{\par
        m.push ('<TD');\par
        m.push (style);\par
        m.push ('> &nbsp;</td>');\par
      \} else \{\par
        for (i=0; i<row.length; i++)\par
          tot += parseInt(row[i]);\par
        m.push ('<TD style="background: #FA8072">');\par
        m.push (addCommas(tot));\par
        m.push ('</td>');\par
      \}\par
      for (i=0; i<row.length; i++)\{\par
        m.push ('<TD');\par
        m.push (style);\par
        m.push ('>');\par
        m.push (addCommas(row[i]));\par
        m.push ('</td>');\par
      \}\par
      m.push ('</tr>');\par
      return m.join('');\par
    \}\par
\par
//DebugTimer.start(); \par
    try \{\par
      if (Options.includeMarching)\par
        march = getMarchInfo ();\par
  \par
      dt = new Date ();\par
      dt.setTime (Seed.player.datejoinUnixTime * 1000);\par
      \par
      str = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;"><TABLE cellspacing=0 cellpadding=0 class=ptTab width=97% align=center>\\\par
        <TR align=left><TD><SPAN class=ptStatLight>Joined on:</span> '+ dt.toLocaleDateString() +'</td>\\\par
        <TD><SPAN class=ptStatLight>Might:</span> ' + addCommas(Seed.player.might) +'</td>\\\par
        <TD><SPAN class=ptStatLight>Alliance:</span> ' + getMyAlliance()[1] +'</td>\\\par
        <TD align=right><SPAN class=ptStatLight>Domain:</span> ' + unsafeWindow.domainName +'</td></tr></table></div>';\par
\par
      tabClass = 'ptTabOverview';  \par
      if (Cities.numCities > 6)\par
        tabClass = 'ptTabOverview7';  \par
              \par
      str += "<TABLE class="+ tabClass +" cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";\par
      for(i=0; i<Cities.numCities; i++) \{\par
        str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>'+ coordLink (Cities.cities[i].x, Cities.cities[i].y) +"<BR>"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"</td>";\par
      \}\par
      if (Options.includeMarching)\par
        str += '<TD width=81><B>Marching</b></td>';\par
      str += "</tr>";\par
\tab   \par
\tab   str += '<TR valign=top align=right><TD></td><TD style=\\'background: #ffc\\'></td>';\par
\tab   for(i=0; i<Cities.numCities; i++)\{\par
\tab     cityID = 'city'+Cities.cities[i].id;\par
\tab     Gate = parseInt(Seed.citystats[cityID].gate);\par
\tab\tab if(Gate == 0)\par
\tab\tab\tab str += '<TD style=\\'background: #CCFFCC\\'>Hiding</td>';\par
\tab\tab else\par
\tab\tab\tab str += '<TD style=\\'background: #CCFFCC\\' ><SPAN class=boldRed><blink>Defending</blink></span></td>';\par
\tab   \}\par
  \par
      rows = [];\par
      rows[0] = [];\par
      for(i=0; i<Cities.numCities; i++) \{\par
        cityID = 'city'+ Cities.cities[i].id;\par
        rows[0][i] = parseInt(Seed.citystats[cityID].gold[0]);\par
      \}\par
      for (r=1; r<5; r++)\{\par
        rows[r] = [];\par
        for(i=0; i<Cities.numCities; i++) \{\par
          cityID = 'city'+ Cities.cities[i].id;\par
          rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0] / 3600);\par
        \}\par
      \}\par
  \par
      if (Options.includeMarching)\{\par
        for (var i=0; i<5; i++)\par
          rows[i][Cities.numCities] = march.resources[i];\par
      \}\par
      str += _row ('Gold', rows[0]);\par
      str += _row ('Food', rows[1]);\par
      str += _row ('Wood', rows[2]);\par
      str += _row ('Stone', rows[3]);\par
      str += _row ('Ore', rows[4]);\par
      str += '<TR><TD><BR></td></tr>';\par
      for (r=1; r<13; r++)\{\par
        rows[r] = [];\par
        for(i=0; i<Cities.numCities; i++) \{\par
          cityID = 'city'+ Cities.cities[i].id;\par
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);\par
        \}\par
      \}\par
      if (Options.includeMarching)\{\par
        for (var i=0; i<13; i++)\par
          rows[i][Cities.numCities] = march.marchUnits[i];\par
      \}\par
//**********************************\par
\tab   t_rows = [];\par
\tab   for (r=2; r<26; r+=2)\{\par
        t_rows[r] = [];\par
        for(j=0; j<Cities.numCities; j++) \{\par
\tab\tab    t_rows[r][j] = [0];\par
          cityID = 'city'+ Cities.cities[j].id;    \par
      \tab   var q = Seed.queue_unt[cityID];\par
      \tab   var supply_t=militia_t=scout_t=pike_t=sword_t=archer_t=cavalry_t=heavy_t=wagon_t=ballista_t=ram_t=catapult_t=0 ;     \par
   \tab   \tab   for (var i=0; i<q.length; i++)\{\par
\tab     \tab switch(q[i][0])\par
\tab     \tab\{\par
\tab       \tab case '1':\par
 \tab  \tab\tab\tab supply_t += parseInt(q[i][1]);\par
\tab\tab  \tab\tab break;\par
\tab\tab\tab   case '2':\par
\tab\tab   \tab\tab militia_t += parseInt(q[i][1]);\par
 \tab  \tab\tab\tab break;\par
\tab\tab\tab   case '3':\par
\tab\tab   \tab\tab scout_t += parseInt(q[i][1]);\par
 \tab  \tab\tab\tab break;\par
\tab\tab\tab   case '4':\par
\tab\tab   \tab\tab pike_t += parseInt(q[i][1]);\par
\tab   \tab\tab\tab break;\par
\tab\tab\tab   case '5':\par
\tab\tab   \tab\tab sword_t += parseInt(q[i][1]);\par
\tab   \tab\tab\tab break;\par
\tab\tab\tab   case '6':\par
\tab\tab  \tab\tab archer_t += parseInt(q[i][1]);\par
 \tab  \tab\tab\tab break;\par
\tab\tab\tab   case '7':\par
\tab\tab   \tab\tab cavalry_t += parseInt(q[i][1]);\par
\tab   \tab\tab\tab break;\par
\tab\tab\tab   case '8':\par
\tab\tab   \tab\tab heavy_t += parseInt(q[i][1]);\par
\tab   \tab\tab\tab break;\par
\tab\tab\tab   case '9':\par
\tab\tab  \tab\tab wagon_t += parseInt(q[i][1]);\par
\tab   \tab\tab\tab break;\par
\tab\tab\tab   case '10':\par
 \tab\tab  \tab\tab ballista_t += parseInt(q[i][1]);\par
 \tab  \tab\tab\tab break;\par
\tab\tab   \tab   case '11':\par
\tab  \tab  \tab\tab ram_t += parseInt(q[i][1]);\par
 \tab\tab  \tab\tab break;\par
\tab\tab\tab   case '12':\par
\tab  \tab  \tab\tab catapult_t += parseInt(q[i][1]);\par
    \tab    \tab  \tab break;\par
\tab\tab\tab\}\par
\tab     \tab switch(r)\par
\tab     \tab\{\par
\tab\tab       case 2:\par
\tab\tab\tab     t_rows[r][j] = supply_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 4:\par
\tab\tab\tab     t_rows[r][j] = militia_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 6:\par
\tab\tab\tab     t_rows[r][j] = scout_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 8:\par
\tab\tab\tab     t_rows[r][j] = pike_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 10:\par
\tab\tab\tab     t_rows[r][j] = sword_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 12:\par
\tab\tab\tab     t_rows[r][j] = archer_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 14:\par
\tab\tab\tab     t_rows[r][j] = cavalry_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 16:\par
\tab\tab\tab     t_rows[r][j] = heavy_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 18:\par
\tab\tab\tab     t_rows[r][j] = wagon_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 20:\par
\tab\tab\tab     t_rows[r][j] = ballista_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 22:\par
\tab\tab\tab     t_rows[r][j] = ram_t;\par
\tab\tab\tab\tab break;\par
\tab\tab       case 24:\par
\tab\tab\tab     t_rows[r][j] = catapult_t;\par
\tab\tab\tab\tab break;\par
\tab\tab\tab   \par
\tab\tab\tab\}\par
      \tab   \}  \par
        \}\par
\tab   \}\tab   \par
      rownum = 0;\par
\par
      str += _row ('SupTrp', rows[1]);      \par
      str += _row ('Militia', rows[2]);\par
      str += _row ('Scout', rows[3]);\par
      str += _row ('Pike', rows[4]);\par
      str += _row ('Sword', rows[5]);\par
      str += _row ('Archer', rows[6]);\par
      str += _row ('Cavalry', rows[7]);\par
      str += _row ('H-Cav', rows[8]);\par
      str += _row ('Wagon', rows[9]);\par
      str += _row ('Ballista', rows[10]);\par
      str += _row ('Ram', rows[11]);\par
      str += _row ('Catapult', rows[12]);\par
      str += _row ('<i><span style="color:green">Sup Trp Tr</span></i>', t_rows[2]);\par
      str += _row ('<i><span style="color:green">MM Tr</span></i>', t_rows[4]);\par
      str += _row ('<i><span style="color:green">Scout Tr</span></i>', t_rows[6]);\par
      str += _row ('<i><span style="color:green">Pike Tr</span></i>', t_rows[8]);\par
      str += _row ('<i><span style="color:green">Sword Tr</span></i>', t_rows[10]);\par
      str += _row ('<i><span style="color:green">Archer Tr</span></i>', t_rows[12]);\par
      str += _row ('<i><span style="color:green">Cav Tr</span></i>', t_rows[14]);\par
      str += _row ('<i><span style="color:green">H.Cav Tr</span></i>', t_rows[16]);\par
      str += _row ('<i><span style="color:green">Wagon Tr</span></i>', t_rows[18]);\par
      str += _row ('<i><span style="color:green">Ball Tr</span></i>', t_rows[20]);\par
      str += _row ('<i><span style="color:green">Ram Tr</span></i>', t_rows[22]);\par
      str += _row ('<i><span style="color:green">Cat Tr</span></i>', t_rows[24]);\par
      str += '<TR><TD><BR></td></tr>';\par
      \par
      row = [];\par
      for(i=0; i<Cities.numCities; i++) \{\par
        var rp = getResourceProduction (Cities.cities[i].id);\par
        var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);\par
        row[i] = rp[1] - usage;\par
      \}\par
      str += _row ('Food +/-', row, true);\par
      \par
      for(i=0; i<Cities.numCities; i++) \{\par
        if (row[i] >= 0)\par
          row[i] = '----';\par
        else \{\par
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-row[i]) * 3600;\par
          if (timeLeft > 86313600)\par
            row[i] = '----';\par
          else \{\par
            if (Options.enableFoodWarn && timeLeft<(Options.foodWarnHours*3600))\par
              row[i] = '<SPAN class=boldRed><blink>'+ timestrShort(timeLeft) +'</blink></span>';\par
            else\par
              row[i] = timestrShort(timeLeft);\par
          \}\par
        \}\par
      \}    \par
      str += _row ('Food left', row, true);\par
      str += '<TR><TD><BR></td></tr>';\par
      \par
      row = [];\par
      for(i=0; i<Cities.numCities; i++) \{\par
        var totWilds = 0;\par
        dat = Seed.wilderness['city'+ Cities.cities[i].id];\par
        if (dat!=null && matTypeof(dat)=='object')\par
          for (k in dat)\par
            ++totWilds;\par
        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);\par
        if (totWilds < castle)\par
          row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';\par
        else\par
          row[i] = totWilds +'/'+ castle;\par
      \}\par
      str += _row ('#Wilds', row, true);\par
  \par
      row = [];\par
      for(i=0; i<Cities.numCities; i++) \{\par
        totKnights = 0;\par
        dat = Seed.knights['city'+ Cities.cities[i].id];\par
        for (k in dat)\par
          ++totKnights;\par
        row[i] = totKnights;\par
      \}\par
      str += _row ('#Knights', row, true);\par
  \par
      var now = unixTime();\par
      var row = [];\par
      for(i=0; i<Cities.numCities; i++) \{\par
        var totTime = 0;\par
        var q = Seed.queue_unt['city'+Cities.cities[i].id]; \par
        if (q!=null && q.length>0)\par
          totTime = q[q.length-1][3] - now;\par
        if (totTime < 0)\par
          totTime = 0;\par
        if (totTime < 3600)\par
          row[i] = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';\par
        else\par
          row[i] = timestr(totTime);\par
      \}\par
      str += _row ('TroopQ', row, true);\par
      \par
      var row = [];\par
      for(i=0; i<Cities.numCities; i++) \{\par
        var wall = \{\};\par
        getWallInfo (Cities.cities[i].id, wall);\par
        var totTime = 0;\par
        var q = Seed.queue_fort['city'+Cities.cities[i].id]; \par
        if (q!=null && q.length>0)\par
          totTime = q[q.length-1][3] - now;\par
        if (totTime < 0)\par
          totTime = 0;\par
        if (totTime<1 && (wall.wallSpaceUsed < wall.wallSpace-4 || wall.fieldSpaceUsed < wall.fieldSpace-4))\par
          row[i] = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';\par
        else\par
          row[i] = timestr(totTime);\par
      \}    \par
      str += _row ('WallQue', row, true);\par
      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><BR><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +'>Include Marching Troops/Resources</td></tr>';\par
      str += '<TR><TD></td><TD colspan=4>KofC client version: '+ KOCversion +'</td></tr>';\par
      str += "</table>";\par
      if (DEBUG_BUTTON)\par
        str += '<BR><INPUT id=subSeed type=submit name="SEED" value="DEBUG">';\par
      Tabs.Overview.cont.innerHTML = str;\par
      checkBox = document.getElementById('idCheck');\par
      checkBox.addEventListener('click', clickEnableMarch, false);\par
      if (DEBUG_BUTTON)\{\par
        subSeed = document.getElementById('subSeed');\par
        subSeed.addEventListener('click', function ()\{debugWin.doit()\}, false);\par
      \}\par
//DebugTimer.display ('Draw Overview');    \par
    \} catch (e)\{\par
      Tabs.Overview.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';\par
    \}   \par
    t.displayTimer = setTimeout (t.show, 5000);\par
  \},\par
\};\par
\par
\par
function getWallInfo (cityId, objOut)\{\par
  objOut.wallSpaceUsed = 0;\par
  objOut.fieldSpaceUsed = 0;\par
  objOut.wallLevel = 0;  \par
  objOut.wallSpace = 0;     \par
  objOut.fieldSpace = 0;  \par
  var b = Seed.buildings["city" + cityId];\par
  if (b.pos1==null)\par
    return;  \par
  objOut.wallLevel = parseInt(b.pos1[1]);\par
  var spots = 0;\par
  for (var i=1; i<(objOut.wallLevel+1); i++)\par
    spots += (i * 500);\par
  objOut.wallSpace = spots;     \par
  objOut.fieldSpace = spots;  \par
     \par
  var fort = Seed.fortifications["city" + cityId];\par
  for (k in fort)\{\par
    var id = parseInt(k.substr(4));\par
    if (id<60)\par
      objOut.wallSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);\par
    else\par
      objOut.fieldSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);\par
  \}\par
\}    \par
\par
/*************************************** MARCHES TAB  ************************************************/\par
\par
Tabs.Marches = \{\par
  tabOrder : 5,\par
  cont:null,\par
  displayTimer:null,\par
  curTabBut : null,\par
  curTabName : null,\par
\tab\par
  init : function (div)\{\par
    var t = Tabs.Marches;\par
    unsafeWindow.pr56Recall = t.butRecall;\par
    unsafeWindow.r8x6Home = t.butSendHome;\par
    \par
    \par
    t.cont = div;\par
    t.cont.innerHTML = '<TABLE class=ptTab align=center><TR><TD><INPUT class=pbSubtab ID=ptmrchSubA type=submit value=Attacks></td>\\\par
          <TD><INPUT class=pbSubtab ID=ptmrchSubM type=submit value=Marches></td>\\\par
          <TD><INPUT class=pbSubtab ID=ptmrchSubR type=submit value=Reinforcements></td></tr></table><HR class=ptThin>\\\par
      <DIV id=ptMarchOutput style="margin-top:10px; background-color:white; height:300px"></div>';\par
    t.marchDiv = document.getElementById('ptMarchOutput');\par
    document.getElementById('ptmrchSubA').addEventListener('click', e_butSubtab, false);\par
    document.getElementById('ptmrchSubR').addEventListener('click', e_butSubtab, false);\par
    document.getElementById('ptmrchSubM').addEventListener('click', e_butSubtab, false);\par
    changeSubtab (document.getElementById('ptmrchSubA'));\par
    \par
    function e_butSubtab (evt)\{\par
      changeSubtab (evt.target);   \par
    \}\par
\par
    function changeSubtab (but)\{\par
      if (but == t.curTabBut)\par
        return;\par
      if (t.curTabBut)\{\par
        t.curTabBut.className='pbSubtab'; \par
        t.curTabBut.disabled=false;\par
      \}\par
      t.curTabBut = but;\par
      but.className='pbSubtab pbSubtabSel'; \par
      but.disabled=true;\par
      t.curTabName = but.id.substr(9);\par
      t.show ();\par
    \}    \par
  \},\par
\par
  hide : function ()\{\par
    var t = Tabs.Marches;\par
    clearTimeout (t.displayTimer);\par
  \},\par
  \par
  show : function ()\{\par
    var t = Tabs.Marches;\par
    clearTimeout (t.displayTimer);\par
    if (t.curTabName == 'R')\par
      t.showReinforcements();\par
    else if (t.curTabName == 'M')\par
      t.showMarches();\par
    else\par
      t.showAttacks();\par
  \},\par
 \par
  \par
  /***   ATTACKS SUBTAB  ***/\par
  showAttacks : function ()\{\par
    var t = Tabs.Marches;\par
    t.marchDiv.innerHTML = 'INCOMING Attacks coming soon!';;\par
  \},\par
  \par
  \par
  /***   MARCHES SUBTAB  ***/\par
  showMarches : function ()\{\par
    var t = Tabs.Marches;\par
    t.marchDiv.innerHTML = 'OUTGOING marches coming soon!';\par
  \},\par
  \par
  \par
  \par
  /***  REINFORCEMENTS SUBTAB  ***/\par
  showReinforcements : function ()\{\par
    var rownum = 0;\par
    var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];\par
    var t = Tabs.Marches;\par
    clearTimeout (t.displayTimer);\par
\par
    \par
    \par
// TODO FIX:    Troops show as encamped even if they are here yet (check destinationUnixTime)\par
        \par
\par
\par
/***    \par
var s = 'OUTGOING:<BR>'; \par
for (var c=0; c<Cities.numCities; c++)\{\par
  var que = Seed.queue_atkp['city'+ Cities.cities[c].id];\par
  if (matTypeof(que)=='array')\par
    continue;\par
\par
s += 'City: '+  Cities.cities[c].name + ': <BR>'; \par
\par
  for (k in que)\{\par
    march = que[k];\par
    var mid = k.substr(1);\par
    s += mid +' DEST: '+ march.toXCoord +','+ march.toYCoord + '  <INPUT type=submit value="Recall" onclick="pr56Recall('+ mid +')"><BR>'\par
  \}      \par
\} \par
t.cont.innerHTML = s;\par
t.displayTimer = setTimeout (t.show, 10000);\par
return;\par
***/\par
    \par
    function clickShowRemaining ()\{\par
      checkBox = document.getElementById('idCheck2');\par
      if (checkBox.checked)\par
        Options.encRemaining = false;\par
      else\par
        Options.encRemaining = true;\par
      t.show ();\par
    \}\par
\par
        \par
    enc = \{\};\par
    numSlots = 0;\par
    \par
    \par
    if (matTypeof(Seed.queue_atkinc) != 'array')\{\par
      for (k in Seed.queue_atkinc)\{\par
        march = Seed.queue_atkinc[k];\par
        if (march.marchType == 2)\{\par
          ++numSlots;\par
          city = march.toCityId;\par
          from = march.fromPlayerId;\par
          if (!enc[city])\par
            enc[city] = \{\};\par
          if (!enc[city][from])\par
            enc[city][from] = [];\par
          s = \{\};\par
          s.knight = parseInt (march.knightCombat);\par
          s.marchId = k.substr(1);\par
          s.troops = [];\par
          for (i=1; i<13; i++)\{\par
            if (Options.encRemaining)\par
              s.troops[i] = parseInt (march['unit'+ i +'Return']);\par
            else\par
              s.troops[i] = parseInt (march['unit'+ i +'Count']);\par
          \}\par
          enc[city][from].push (s);\par
        \}\par
      \}\par
    \}\par
//logit ("enc: "+ inspect (enc, 6, 1));    \par
    \par
    \par
    \par
    \par
    \par
    s = '<div class=ptstat>Showing troops encamped at each of your embassies.</div><BR>';\par
    if (numSlots == 0)\{\par
      s += '<BR><CENTER><B>No troops encamped.</b></center>';\par
    \} else \{\par
      s += '<STYLE> .tot\{background:#f0e0f8;\} .city\{background:#ffffaa;\}</style>';\par
      s += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%><B>Player (knight)</b></td>';\par
\par
      for (k=0; k<names.length; k++)\par
        s += '<TD width=7%><B>' + names[k] + '</b></td>';\par
      s += '</tr>';\par
\par
      tot = [];\par
      for (i=0; i<13; i++)\par
        tot[i] = 0;\par
      for (c in Cities.cities)\{\par
        dest = Cities.cities[c].id;\par
        if (enc[dest])\{\par
          s+= '<TR><TD class=xtab><BR></td></tr>';\par
          s+= '<TR><TD class="city" colspan=13 align=center><B>'+ Cities.cities[c].name +'</b></td></tr>';\par
          for (p in enc[dest])\{\par
            try \{\par
              player = Seed.players['u'+p].n;\par
            \} catch (err)\{\par
              player = '???';\par
            \}\par
            for (m=0; m<enc[dest][p].length; m++)\{\par
              var march = enc[dest][p][m];\par
              knight = '';\par
              if (march.knight > 0)\par
                knight = ' ('+ march.knight +')';\par
// TODO: Only allow 'send home' if troops are here now  (marchStatus = ?)              \par
              s += '<TR align=right><TD align=left>'+ player + knight +' <A><SPAN onclick="r8x6Home('+ march.marchId +')">X</span></a></td>'\par
              for (i=1; i<13; i++)\{\par
                s += '<TD>'+ march.troops[i]  +'</td>';\par
                tot[i] += march.troops[i];\par
              \}\par
              s += '</tr>';\par
\par
            \}\par
          \}\par
        \}\par
      \}\par
      s += '<TR><TD colspan=13><BR><BR></td></tr><TR align=right><TD class="tot" align=left><B>TOTALS:</b></td>';\par
      for (i=1; i<13; i++)\par
        s+= '<TD class="tot">'+ tot[i] +'</td>';\par
      s += '</tr></table>';\par
    \}\par
\par
    s += '<BR><BR><INPUT type=CHECKBOX id=idCheck2 '+ (Options.encRemaining?'':' CHECKED ') +'> Show Original Troops';\par
    s += '<BR><BR><DIV style="font-size: 10px">NOTE: You will need to refresh KofC to show new encampments or remaining troops after a battle.</div>';\par
    t.marchDiv.innerHTML = s;\par
    checkBox = document.getElementById('idCheck2');\par
    checkBox.addEventListener('click', clickShowRemaining, false);\par
    t.displayTimer = setTimeout (t.show, 10000);\par
  \},\par
\par
  \par
  butRecall : function (marchId)\{\par
    var t = Tabs.Marches;\par
    logit ("CANCELLING: "+ marchId); \par
    t.ajaxRecall (marchId); \par
  \},\par
\par
  butSendHome : function (marchId)\{\par
    var t = Tabs.Marches;\par
    logit ("SEND HOME: "+ marchId); \par
    t.ajaxSendHome (marchId, function(r)\{t.show(); logit("AJAX RESULT: "+ r)\}); \par
  \},\par
\par
\par
  /***  \par
  // not working, returns 'invalid parameters' :(  \par
  ajaxCancelMarch : function (marchId, notify)\{\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
logit ('ajaxCancelMarch: '+ marchId);    \par
    for (var c=0; c<Cities.numCities; c++)\{\par
      var que = Seed.queue_atkp['city'+ Cities.cities[c].id];\par
      if (matTypeof(que)=='array')\par
        continue;\par
      for (k in que)\{\par
        if (k == 'm'+marchId)\{\par
          params.cid = Cities.cities[c].id;\par
          params.cityId = Cities.cities[c].id;\par
          break;\par
        \}\par
      \}    \par
    \}    \par
    params.marchId = marchId;\par
    params.mid = 'm'+ marchId;\par
    params.requestType = "CANCEL_MARCH";\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelMarch.php" + unsafeWindow.g_ajaxsuffix, \{\par
        method: "post",\par
        parameters: params,\par
        onSuccess: function (rslt) \{\par
          if (notify != null)\par
            notify(rslt.errorMsg);\par
        \},\par
        onFailure: function () \{\par
          if (notify != null)\par
            notify(rslt.errorMsg);\par
        \},\par
    \});\par
  \},\par
***/  \par
 \par
\par
\par
\par
\par
  ajaxSendHome : function (marchId, notify)\{\par
logit ('ajaxSendHome: '+ marchId);    \par
    var march = Seed.queue_atkinc['m'+ marchId];\par
    if (march == null)\{\par
      notify ('March not found!'); \par
      return;\par
    \}    \par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    params.mid = marchId;\par
    params.cid = march.toCityId;\par
    params.fromUid = march.fromPlayerId;\par
    params.fromCid = march.fromCityId;\par
   \par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/kickoutReinforcements.php" + unsafeWindow.g_ajaxsuffix, \{\par
        method: "post",\par
        parameters: params,\par
        onSuccess: function (rslt) \{\par
          if (rslt.ok)\{\par
            var upkeep = 0;\par
            for (var i=1; i<13; i++)\par
              upkeep += parseInt(march["unit" + i + "Return"]) * parseInt(unsafeWindow.unitupkeeps[i])\par
            unsafeWindow.seed.resources["city"+ march.toCityId].rec1[3] -= upkeep;\par
            if (parseInt(march.fromPlayerId) == parseInt(unsafeWindow.tvuid)) \{\par
logit ('FROM ME!'); \par
              var mymarch = unsafeWindow.seed.queue_atkp["city" + march.fromCityId]["m" + marchId];\par
              var marchtime = Math.abs(parseInt(mymarch.destinationUnixTime) - parseInt(mymarch.eventUnixTime));\par
              mymarch.returnUnixTime = unixTime() + marchtime;\par
              mymarch.marchStatus = 8;\par
            \}\par
            delete unsafeWindow.seed.queue_atkinc["m" + marchId];\par
            if (notify != null)\par
              notify(null);\par
          \} else \{\par
            if (notify != null)\par
              notify(rslt.errorMsg);\par
          \}\par
        \},\par
        onFailure: function () \{\par
          if (notify != null)\par
            notify(rslt.errorMsg);\par
        \},\par
    \});\par
  \},\par
\par
/*****\par
\par
      for (var b = 1; b < 13; b++) \{\par
        g += parseInt(e["unit" + b + "Return"]) * parseInt(unitupkeeps[b])\par
      \}\par
\par
function kickout_allies(mid, cid, fromUid, fromCid, upkeep) \{\par
  var params = Object.clone(g_ajaxparams);\par
  params.mid = mid;\par
  params.cid = cid;\par
  params.fromUid = fromUid;\par
  params.fromCid = fromCid;\par
  new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, \{\par
    method: "post",\par
    parameters: params,\par
    onSuccess: function(transport) \{\par
      var rslt = eval("(" + transport.responseText + ")");\par
      if (rslt.ok) \{\par
        Modal.showAlert(g_js_strings.kickout_allies.troopshome);\par
        seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;\par
        Modal.hideModalAll();\par
        if (parseInt(fromUid) == parseInt(tvuid)) \{\par
          var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];\par
          var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));\par
          curmarch.returnUnixTime = unixtime() + marchtime;\par
          curmarch.marchStatus = 8\par
        \}\par
        delete seed.queue_atkinc["m" + mid]\par
      \} else \{\par
        Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))\par
      \}\par
    \},\par
    onFailure: function() \{\}\par
  \})\par
\};\par
***/\par
\par
\par
\par
\par
 \par
  ajaxRecall : function (marchId, notify)\{\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    for (var c=0; c<Cities.numCities; c++)\{\par
      var que = Seed.queue_atkp['city'+ Cities.cities[c].id];\par
      if (matTypeof(que)=='array')\par
        continue;\par
      for (k in que)\{\par
        if (k == 'm'+marchId)\{\par
          params.cid = Cities.cities[c].id;\par
          break;\par
        \}\par
      \}    \par
    \}    \par
    params.mid = marchId;\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/undefend.php" + unsafeWindow.g_ajaxsuffix, \{\par
        method: "post",\par
        parameters: params,\par
        onSuccess: function (rslt) \{\par
          var march = unsafeWindow.seed.queue_atkp["city" + params.cid]["m" + params.mid];\par
          march.marchStatus = 8;\par
          var marchtime = parseInt(march.returnUnixTime) - parseInt(march.destinationUnixTime);\par
          var ut = unixTime();\par
          if (unsafeWindow.seed.playerEffects.returnExpire > unixtime())\par
            marchtime *= 0.5\par
          march.returnUnixTime = ut + marchtime;\par
          march.destinationUnixTime = ut;\par
          march.marchUnixTime = ut - marchtime;\par
          if (notify != null)\par
            notify(rslt.errorMsg);\par
        \},\par
        onFailure: function () \{\par
          if (notify != null)\par
            notify(rslt.errorMsg);\par
        \},\par
    \});\par
  \},\par
  \par
\};\par
\par
\par
/*******************************************/\par
\par
var PageNavigator = \{\par
  modalMessagesFunc : null,\par
  ctrlPaginationOld : null,\par
  loadPage_paginationOld : null,\par
  cpPager : null,\par
  \par
  init : function ()\{\par
    var t = PageNavigator;\par
    t.modalMessagesFunc = new CalterUwFunc ('modal_messages', [\par
        [/pageNavigatorModel =.*$/im, 'var pager = new ptPagerHook(0,5); pageNavigatorModel=pager'],\par
        [/pageNavigatorView =.*$/im, 'pageNavigatorView=pager'],\par
        [/pageNavigatorController =.*$/im, 'pageNavigatorController=pager']\par
        ]);\par
    unsafeWindow.ptPagerHook = t.Cpager;\par
    t.ctrlPaginationOld = unsafeWindow.ctrlPagination;\par
    t.loadPage_paginationOld = unsafeWindow.loadPage_pagination;\par
    t.cpPager = new t.Cpager (0,0);\par
    t.cpPager.oldStyle = true;\par
    t.enable(Options.fixPageNav);\par
  \},\par
\par
  // called on 'back' ...\par
  loadPage_pagination : function (divId, currentPage, callbackFunction, totalPages) \{\par
    var t = PageNavigator;\par
    var curPage = parseInt(currentPage);\par
//logit ('loadPage_pagination: '+  divId +','+ t.cpPager.divId +','+ currentPage +','+ callbackFunction +','+ totalPages +','+ t.cpPager.getCurrentPage()); \par
    if (divId == t.cpPager.divId) // if 'old' style ...  \par
      unsafeWindow[callbackFunction] (t.cpPager.getCurrentPage());\par
    else\par
      unsafeWindow[callbackFunction] (currentPage);\par
  \},\par
    \par
  ctrlPagination : function (navDivId, numPages, notify, curPage)\{\par
    var t = PageNavigator;\par
//logit ('ctrlPagination (divid:'+ navDivId +')');    \par
    if (document.getElementById(navDivId).firstChild == null)\par
      document.getElementById(navDivId).appendChild (t.cpPager.getHtmlElement());   \par
    t.cpPager.setPageCount(numPages);\par
    t.cpPager.divId = navDivId;\par
    if (!curPage)\par
      curPage = 1;\par
    t.cpPager.gotoPage(curPage);\par
    t.cpPager.onClick = unsafeWindow[notify];\par
    unsafeWindow.pageNavigatorView = t.cpPager;\par
  \},  \par
  \par
  enable : function (tf)\{\par
    var t = PageNavigator;\par
    t.modalMessagesFunc.setEnable(tf);\par
    if (tf)\{\par
      unsafeWindow.ctrlPagination = t.ctrlPagination;\par
      unsafeWindow.loadPage_pagination = t.loadPage_pagination;\par
    \} else \{\par
      unsafeWindow.ctrlPagination = t.ctrlPaginationOld;\par
      unsafeWindow.loadPage_pagination = t.loadPage_paginationOld;\par
    \}\par
  \},\par
  \par
  isAvailable : function ()\{\par
    var t = PageNavigator;\par
    return t.modalMessagesFunc.isAvailable();\par
  \},\par
  \par
  Cpager : function (a, b)\{\par
    // public function protos ...\par
    this.getHtmlElement = getHtmlElement;    \par
    this.setPageCount = setPageCount;    \par
    this.getPageCount = getPageCount;    \par
    this.getCurrentPage = getCurrentPage;    \par
    this.gotoPage = gotoPage;    \par
    this.e_but = e_but;    \par
    this.e_inp = e_inp; \par
    //    \par
    var t = this;\par
    this.onClick = null;\par
    this.numPages = b;\par
    this.curPage = a;\par
    this.oldStyle = false;\par
    \par
    function getHtmlElement ()\{\par
      function aButton (msg, evtPage)\{\par
        return '<A class=ptPageNav onclick="pageNavigatorView.e_but(\\''+ evtPage +'\\')"><SPAN class=ptPageNav>'+ msg +'</span></a>';\par
      \}\par
      var div = document.createElement ('div');\par
      div.id = 'ptPageNavBar';\par
      div.innerHTML = '<STYLE>table.ptPageNav tr td  \{border:none; text-align:center; padding:0px 1px;\}\\\par
        span.ptPageNav \{font-size:12px; background:inherit; line-height:135%\}\\\par
        A.ptPageNav \{background-color:#44e; color:#ff4; display:block; border:1px solid #666666; height:18px; width:18px;\}\\\par
        A.ptPageNav:hover \{background-color:#66f;\}\\\par
        A.ptPageNav:active \{background-color:#186\}\\\par
        </style>\\\par
        <TABLE class=ptPageNav><TR valign=middle>\\\par
        <TD style="margin-right:15px">'+ aButton('<SPAN style="padding-right:0.8em; letter-spacing:-0.99em;">&#x258f;&#x258f;&#x25c4;</span>', 'F') +'</td>\\\par
        <TD>'+ aButton('&#x25c4', '-') +'</td>\\\par
        <TD>'+ aButton('&#x25ba', '+') +'</td>\\\par
        <TD style="margin-right:15px">'+ aButton('<SPAN style="padding-right:1.05em; letter-spacing:-0.99em;">&#x25ba;&#x2595;&#x2595;</span>', 'L') +'</td>\\\par
        <TD width=20></td><TD>Page <INPUT id=ptPagerPageNum onChange="pageNavigatorView.e_inp()" type=text size=1> OF <span id=ptPagerNumPages>?</span></td>\\\par
        </tr></table>';\par
      var mml = document.getElementById('modal_msg_list');\par
      if (mml != null)\par
        mml.style.minHeight = '320px';\par
      return div;\par
    \}\par
\par
    function getPageCount()\{    // koc needs for 'back'\par
      return t.numPages;\par
    \}    \par
    function getCurrentPage()\{    // koc needs for 'back'\par
      return t.curPage;\par
    \}    \par
    function setPageCount(c)\{\par
      t.numPages = c;\par
      document.getElementById('ptPagerNumPages').innerHTML = c;\par
      var mml = document.getElementById('modal_msg_list');\par
      if (mml != null)\{\par
        if (document.getElementById('modal_msg_tabs_report').className.indexOf('selected') >= 0)\par
          mml.style.minHeight = '460px';\par
        else\par
          mml.style.minHeight = '320px';\par
      \}\par
    \}\par
    function gotoPage(p)\{\par
      t.curPage = parseIntZero(p);\par
      document.getElementById('ptPagerPageNum').value = t.curPage;\par
    \}\par
    function e_but (p)\{\par
      if (p=='F' && t.curPage!=1)\par
        loadPage(1);\par
      else if (p=='-' && t.curPage>1)\par
        loadPage(t.curPage-1);\par
      else if (p=='+' && t.curPage<t.numPages)\par
        loadPage(t.curPage+1);\par
      else if (p=='L' && t.curPage!=t.numPages)\par
        loadPage(t.numPages);\par
      function loadPage (p)\{\par
        if (t.oldStyle)\par
      t.gotoPage(p);\par
        t.onClick (p);\par
      \}\par
    \}\par
    function e_inp (p)\{\par
      var pageNum = parseIntZero(document.getElementById('ptPagerPageNum').value);\par
      t.onClick(pageNum);\par
    \}\par
  \},\par
\}\par
\par
\par
\par
\par
// TODO: Handle multiple instances altering same function!!   ****************************\par
var CalterUwFunc = function (funcName, findReplace) \{\par
  var t = this;\par
  this.isEnabled = false;\par
  this.isAvailable = isAvailable;\par
  this.setEnable = setEnable;\par
  this.funcOld = null;  \par
  this.funcNew = null;\par
  try \{\par
    var x = funcName.split('.');\par
    var f = unsafeWindow;\par
    for (var i=0; i<x.length; i++)\par
      f = f[x[i]];\par
    this.funcOld = f;\par
    var rt = f.toString().replace ('function '+ funcName, 'function');\par
    for (var i=0; i<findReplace.length; i++)\{\par
      x = rt.replace(findReplace[i][0], findReplace[i][1]);\par
      if (x == rt)  // if not found\par
        return;\par
      rt = x;\par
    \}\par
    this.funcNew = rt;\par
  \} catch (err) \{\par
  \}\par
      \par
  function setEnable (tf)\{\par
    if (t.funcNew == null)\par
      return;\par
    if (t.isEnabled != tf)\{\par
      if (tf)\{\par
      \tab var scr = document.createElement('script');    // <== need to remove on disable!!!\par
      \tab scr.innerHTML = funcName +' = '+ t.funcNew;\par
      \tab document.body.appendChild(scr);\par
        setTimeout ( function ()\{document.body.removeChild(scr);\}, 500);\par
      \tab t.isEnabled = true;\par
      \} else \{\par
      var x = funcName.split('.');\par
      var f = unsafeWindow;\par
      for (var i=0; i<x.length-1; i++)\par
        f = f[x[i]];\par
      f[x[x.length-1]] = this.funcOld;\par
        t.isEnabled = false;\par
      \}\par
    \}\par
  \}\par
  function isAvailable ()\{\par
    if (t.funcNew == null)\par
      return false;\par
    return true;\par
  \}\par
\};\par
\par
\par
var MessageCounts = \{\par
  messagesNotifyFunc : null,\par
  \par
  init : function ()\{ \par
    var t = MessageCounts;\par
    t.messagesNotifyFunc = new CalterUwFunc ('messages_notify_bug', [\par
        ['$("chrome_messages_notify").innerHTML = a;', 'msgCount_hook(a);'],\par
        ['$("chrome_messages_notify").show();', ''],\par
        ['$("chrome_messages_notify").hide();', '$("chrome_messages_notify").hide(); $("chrome_messages_notifyL").hide();']  ]);\par
    if (t.messagesNotifyFunc.isAvailable())\{\par
      unsafeWindow.msgCount_hook = t.msgCount_hook;\par
      e = document.getElementById('chrome_messages_notify');\par
      span = document.createElement('span');\par
      span.className='notify';\par
      span.style.display='none';\par
      span.id = 'chrome_messages_notifyL';\par
      span.style.left = '6px';\par
      e.parentNode.insertBefore (span, e);\par
      if (Options.fixMsgCount)\{\par
        t.enable (true);\par
        setTimeout (unsafeWindow.messages_notify_bug, 1000);\par
      \}\par
    \}\par
  \},\par
  \par
  msgCount_hook : function (a)\{\par
    var l = document.getElementById('chrome_messages_notifyL');\par
    var r = document.getElementById('chrome_messages_notify');\par
    if (parseInt(Seed.newMailCount) > 0) \{\par
      l.innerHTML = parseInt(Seed.newMailCount);\par
      l.style.display = 'block';\par
    \} else \{\par
      l.style.display = 'none';\par
    \}\par
    var reports = parseInt(Seed.newTradeReports) + parseInt(Seed.newReportCount);\par
    if (reports < 1)\par
      r.style.display = 'none';\par
    else \{\par
      r.innerHTML = reports;\par
      r.style.display = 'block';\par
    \}\par
  \},\par
\par
  enable : function (tf)\{\par
    var t = MessageCounts;\par
    t.messagesNotifyFunc.setEnable (tf);\par
    if (!tf)\par
      document.getElementById('chrome_messages_notifyL').style.display = 'none';\par
    setTimeout (unsafeWindow.messages_notify_bug, 0);\par
  \},\par
    \par
  isAvailable : function ()\{\par
    var t = MessageCounts;\par
    return t.messagesNotifyFunc.isAvailable();\par
  \},\par
\}\par
\par
\par
var WarnZeroAttack = \{\par
  modalAttackFunc : null,  \par
  \par
  init : function ()\{\par
    var t = WarnZeroAttack;\par
    t.modalAttackFunc = new CalterUwFunc ('modal_attack', [['modal_attack_check()', 'modalAttack_hook()']]);\par
    unsafeWindow.modalAttack_hook = t.hook;\par
    t.modalAttackFunc.setEnable(Options.fixWarnZero);\par
  \},\par
   \par
  setEnable : function (tf)\{\par
    var t = WarnZeroAttack;\par
    t.modalAttackFunc.setEnable (tf);\par
  \},\par
  \par
  isAvailable : function ()\{\par
    var t = WarnZeroAttack;\par
    return t.modalAttackFunc.isAvailable();\par
  \},\par
    \par
  hook : function ()\{\par
    var t = WarnZeroAttack;\par
    if (parseIntZero(document.getElementById('modal_attack_target_coords_x').value) == 0\par
    && parseIntZero(document.getElementById('modal_attack_target_coords_y').value) == 0)\{\par
      new CdialogCancelContinue ('<SPAN class=boldRed>You are about to march to location 0,0!</span>', null, unsafeWindow.modal_attack_check, document.getElementById('modalInner1'));      \par
    \} else \{\par
      unsafeWindow.modal_attack_check();\par
    \}\par
  \},\par
  \par
\}\par
\par
function distance (d, f, c, e) \{\par
  var a = 750;\par
  var g = a / 2;\par
  var b = Math.abs(c - d);\par
  if (b > g)\par
    b = a - b;\par
  var h = Math.abs(e - f);\par
  if (h > g)\par
    h = a - h;\par
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;\par
\};\par
\par
var MapDistanceFix = \{\par
  popSlotsFunc : null,\par
  init : function ()\{\par
    var t = MapDistanceFix;\par
    t.popSlotsFunc = new CalterUwFunc ('MapObject.prototype.populateSlots', [['this.distance', 'fixMapDistance_hook']]);\par
    if (t.popSlotsFunc.isAvailable())\{\par
      unsafeWindow.fixMapDistance_hook = t.fixMapDistance_hook;\par
      if (Options.fixMapDistance)\par
        t.enable (true);\par
\par
    \}\par
  \},\par
  fixMapDistance_hook : function (cityX, cityY, tileX, tileY)\{\par
    var city = Cities.byID[unsafeWindow.currentcityid];\par
    return distance (city.x, city.y, tileX, tileY);\par
  \},\par
  enable : function (tf)\{\par
    var t = MapDistanceFix;\par
    t.popSlotsFunc.setEnable (tf);\par
  \},\par
  isAvailable : function ()\{\par
    var t = MapDistanceFix;\par
    return t.popSlotsFunc.isAvailable();\par
  \},\par
\}\par
\par
\par
var tabManager = \{\par
  tabList : \{\},           // \{name, obj, div\}\par
  currentTab : null,\par
  \par
  init : function (mainDiv)\{\par
    var t = tabManager;\par
    var sorter = [];\par
    for (k in Tabs)\{\par
      if (!Tabs[k].tabDisabled)\{  \par
        t.tabList[k] = \{\};\par
        t.tabList[k].name = k;\par
        t.tabList[k].obj = Tabs[k];\par
        if (Tabs[k].tabLabel != null)\par
          t.tabList[k].label = Tabs[k].tabLabel;\par
        else\par
          t.tabList[k].label = k;\par
        if (Tabs[k].tabOrder != null)\par
          sorter.push([Tabs[k].tabOrder, t.tabList[k]]);\par
        else\par
          sorter.push([1000, t.tabList[k]]);\par
        t.tabList[k].div = document.createElement('div');\par
      \}\par
    \}\par
\par
    sorter.sort (function (a,b)\{return a[0]-b[0]\});\par
    var m = '<TABLE cellspacing=0 class=ptMainTab><TR>';\par
    for (var i=0; i<sorter.length; i++)\par
      m += '<TD class=spacer></td><TD class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';\par
    m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';\par
    mainPop.getTopDiv().innerHTML = m;\par
    \par
    t.currentTab = null;\par
    for (k in t.tabList) \{\par
      if (t.tabList[k].name == Options.currentTab)\par
        t.currentTab = t.tabList[k] ;\par
      document.getElementById('pttc'+ k).addEventListener('click', this.e_clickedTab, false);\par
      var div = t.tabList[k].div; \par
      div.style.display = 'none';\par
      div.style.height = '100%';\par
      div.style.maxWidth = '800px';\par
      div.style.overflowX = 'auto';\par
      mainDiv.appendChild(div);\par
      try \{\par
        t.tabList[k].obj.init(div);\par
      \} catch (e)\{\par
        div.innerHTML = "INIT ERROR: "+ e;\par
      \}\par
    \}\par
    if (t.currentTab == null)\par
      t.currentTab = sorter[0][1];    \par
    t.setTabStyle (document.getElementById ('pttc'+ t.currentTab.name), true);\par
    t.currentTab.div.style.display = 'block';\par
  \},\par
  \par
  hideTab : function ()\{\par
    var t = tabManager;\par
    t.currentTab.obj.hide();\par
  \},\par
  \par
  showTab : function ()\{\par
    var t = tabManager;\par
    t.currentTab.obj.show();\par
  \},\par
    \par
  setTabStyle : function (e, selected)\{\par
    if (selected)\{\par
      e.className = 'sel';\par
    \} else \{\par
      e.className = 'notSel';\par
    \}\par
  \},\par
  \par
  e_clickedTab : function (e)\{\par
    var t = tabManager;\par
    newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];\par
    if (t.currentTab.name != newTab.name)\{\par
      t.setTabStyle (document.getElementById ('pttc'+ t.currentTab.name), false);\par
      t.setTabStyle (document.getElementById ('pttc'+ newTab.name), true);\par
      t.currentTab.obj.hide ();\par
      t.currentTab.div.style.display = 'none';\par
      t.currentTab = newTab;\par
      newTab.div.style.display = 'block';\par
      Options.currentTab = newTab.name;      \par
    \}\par
    newTab.obj.show();\par
  \},\par
\}\par
\par
\par
function setTabStyle (e, selected)\{\par
  if (selected)\{\par
    e.className = 'matTabSel';\par
  \} else \{\par
    e.className = 'matTabNotSel';\par
  \}\par
\}\par
\par
function clickedTab (e)\{\par
  who = e.target.id.substring(2);\par
  newObj = my[who];\par
  currentObj = my[currentName];\par
  if (currentName != who)\{\par
    setTabStyle (document.getElementById ('aa'+currentName), false);\par
    setTabStyle (document.getElementById ('aa'+who), true);\par
    if (currentObj)\{\par
      currentObj.hide ();\par
      currentObj.getContent().style.display = 'none';\par
    \}\par
    currentName = who;\par
    cont = newObj.getContent();\par
    newObj.getContent().style.display = 'block';\par
  \}\par
  newObj.show();\par
\}\par
\par
function mouseMainTab (me)\{\par
  if (me.button == 2)\{\par
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));\par
    mainPop.setLocation (\{x: c.x+4, y: c.y+c.height\});\par
  \}\par
\}\par
\par
function eventHideShow ()\{\par
  if (mainPop.toggleHide(mainPop))\{\par
    tabManager.showTab();\par
    Options.ptWinIsOpen = true;\par
  \} else \{\par
    tabManager.hideTab();\par
    Options.ptWinIsOpen = false;\par
  \}\par
  saveOptions();\par
\}\par
\par
function hideMe ()\{\par
  if (!Options.ptWinIsOpen)\par
    return;\par
  mainPop.show (false);\par
  tabManager.showTab();\par
  Options.ptWinIsOpen = false;\par
  saveOptions();\par
\}\par
function showMe ()\{\par
  mainPop.show (true);\par
  tabManager.showTab();\par
  Options.ptWinIsOpen = true;\par
  saveOptions();\par
\}\par
\par
\par
function addMyFunction (func)\{      // add function to run in our own scope\par
  unsafeWindow[func.name] = func;\par
\}\par
\par
function addUwFunction (func)\{      // add function to run in unsafeWindow's scope\par
  scr = document.createElement('script');\par
\tab scr.innerHTML = func.toString();\par
\tab document.body.appendChild(scr);\par
\}\par
\par
function alterUwFunction (funcName, frArray)\{\par
  try \{\par
    funcText = unsafeWindow[funcName].toString();\par
    rt = funcText.replace ('function '+funcName, 'function');\par
    for (i=0; i<frArray.length; i++)\{\par
      x = rt.replace(frArray[i][0], frArray[i][1]);\par
      if (x == rt)\par
        return false;\par
      rt = x;\par
    \}\par
    js = funcName +' = '+ rt;\par
  \tab var scr=document.createElement('script');\par
  \tab scr.innerHTML=js;\par
  \tab document.body.appendChild(scr);\par
  \tab return true;\par
  \} catch (err) \{\par
    return false;\par
  \}\par
\}\par
\par
function setCities()\{\par
  Cities.numCities = Seed.cities.length;\par
  Cities.cities = [];\par
  Cities.byID = \{\};\par
  for (i=0; i<Cities.numCities; i++)\{\par
    city = \{\};\par
    city.idx = i;\par
    city.id = parseInt(Seed.cities[i][0]);\par
    city.name = Seed.cities[i][1];\par
    city.x = parseInt(Seed.cities[i][2]);\par
    city.y = parseInt(Seed.cities[i][3]);\par
    city.tileId = parseInt(Seed.cities[i][5]);\par
    city.provId = parseInt(Seed.cities[i][4]);\par
    Cities.cities[i] = city;\par
    Cities.byID[Seed.cities[i][0]] = city;\par
  \}\par
\}\par
\par
function officerId2String (oid)\{\par
  if (oid==null)\par
    return '';\par
  else if (oid==3)\par
    return 'Officer';\par
  else if (oid==2)\par
    return 'Vice Chance';\par
  else if (oid==1)\par
    return 'Chancellor';\par
  return '';\par
\}\par
\par
\par
// onClick (city\{name, id, x, y\}, x, y)   city may be null!\par
function CdispCityPicker (id, span, dispName, notify, selbut)\{\par
  function CcityButHandler (t)\{\par
    var that = t;\par
    this.clickedCityBut = clickedCityBut;\par
    function clickedCityBut (e)\{\par
      if (that.selected != null)\par
        that.selected.className = "castleBut castleButNon";\par
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];\par
      if (that.dispName)\par
        document.getElementById(that.id+'cname').innerHTML = that.city.name;\par
      e.target.className = "castleBut castleButSel";\par
      that.selected = e.target;\par
      if (that.coordBoxX)\{\par
        that.coordBoxX.value = that.city.x;\par
        that.coordBoxY.value = that.city.y;\par
        that.coordBoxX.style.backgroundColor = '#ffffff';\par
        that.coordBoxY.style.backgroundColor = '#ffffff';\par
      \}\par
      if (that.notify != null)\par
        that.notify(that.city, that.city.x, that.city.y);\par
    \}\par
  \}\par
\par
  function selectBut (idx)\{\par
    document.getElementById(this.id+'_'+idx).click();\par
  \}\par
\par
  function bindToXYboxes (eX, eY)\{\par
    function CboxHandler (t)\{\par
      var that = t;\par
      this.eventChange = eventChange;\par
      if (that.city)\{\par
        eX.value = that.city.x;\par
        eY.value = that.city.y;\par
      \}\par
      function eventChange ()\{\par
\tab\tab\tab var xValue=that.coordBoxX.value.trim();\par
\tab\tab\tab var xI=/^\\s*([0-9]+)[\\s,]+([0-9]+)/.exec(xValue); \tab\tab\par
\tab\tab\tab if(xI) \{\par
\tab\tab\tab\tab that.coordBoxX.value=xI[1]\par
\tab\tab\tab\tab that.coordBoxY.value=xI[2]\par
\tab\tab\tab\}\par
        var x = parseInt(that.coordBoxX.value, 10);\par
        var y = parseInt(that.coordBoxY.value, 10);\par
        if (isNaN(x) || x<0 || x>750)\{\par
          that.coordBoxX.style.backgroundColor = '#ff8888';\par
          return;\par
        \}\par
        if (isNaN(y) || y<0 || y>750)\{\par
          that.coordBoxY.style.backgroundColor = '#ff8888';\par
          return;\par
        \}\par
        that.coordBoxX.style.backgroundColor = '#ffffff';\par
        that.coordBoxY.style.backgroundColor = '#ffffff';\par
        if (that.notify != null)\par
          that.notify (null, x, y);\par
      \}\par
    \}\par
    this.coordBoxX = eX;\par
    this.coordBoxY = eY;\par
    var bh = new CboxHandler(this);\par
    eX.size=2;\par
    eX.maxLength=10;\par
    eY.size=2;\par
    eY.maxLength=3;\par
    eX.addEventListener('change', bh.eventChange, false);\par
    eY.addEventListener('change', bh.eventChange, false);\par
  \}\par
\par
  this.selectBut = selectBut;\par
  this.bindToXYboxes = bindToXYboxes;\par
  this.coordBoxX = null;\par
  this.coordBoxY = null;\par
  this.id = id;\par
  this.dispName = dispName;\par
  this.prefixLen = id.length+1;\par
  this.notify = notify;\par
  this.selected = null;\par
  this.city = null;\par
  var m = '';\par
  for (var i=0; i<Cities.cities.length; i++)\par
    m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \\>';\par
  if (dispName)\par
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';\par
  span.innerHTML = m;\par
  var handler = new CcityButHandler(this);\par
  for (var i=0; i<Cities.cities.length; i++)\par
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);\par
  if (selbut != null)\par
    this.selectBut(selbut);\par
\};\par
\par
\par
function CdialogCancelContinue (msg, canNotify, contNotify, centerElement)\{\par
  var pop = new CPopup ('ptcancont', 0, 0, 400,200, true, canNotify);\par
  if (centerElement)\par
    pop.centerMe(centerElement);\par
  else\par
    pop.centerMe(document.body);\par
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Tools</center>';\par
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\\\par
      <TR align=center><TD><INPUT id=ptcccancel type=submit value="CANCEL" \\> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value="CONTINUE" \\></td></tr></table>';\par
  document.getElementById('ptcccancel').addEventListener ('click', function ()\{pop.show(false); if (canNotify) canNotify();\}, false);\par
  document.getElementById('ptcccontin').addEventListener ('click', function ()\{pop.show(false); if (contNotify) contNotify();\}, false);\par
  pop.show(true);\par
\}\par
\par
\par
// TODO: make class (multiple instances needed)\par
function dialogRetry (errMsg, seconds, onRetry, onCancel)\{\par
  seconds = parseInt(seconds);\par
  var pop = new CPopup ('ptretry', 0, 0, 400,200, true);\par
  pop.centerMe(mainPop.getMainDiv());\par
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Tools</center>';\par
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\\\par
      <BR><BR><B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL Retry" \\>';\par
  document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);\par
  pop.show(true);\par
  \par
  document.getElementById('paretryErrMsg').innerHTML = errMsg;\par
  document.getElementById('paretrySeconds').innerHTML = seconds;\par
  var rTimer = setTimeout (doRetry, seconds*1000);\par
  countdown ();\par
\par
  function countdown ()\{\par
    document.getElementById('paretrySeconds').innerHTML = seconds--;\par
    if (seconds > 0)\par
      cdTimer = setTimeout (countdown, 1000);\par
  \}\par
  function doCancel()\{\par
    clearTimeout (rTimer);\par
    clearTimeout (cdTimer);\par
    pop.destroy();\par
    onCancel ();\par
  \}\par
  function doRetry ()\{\par
    clearTimeout (rTimer);\par
    clearTimeout (cdTimer);\par
    pop.show(false);\par
    onRetry();\par
  \}\par
\}\par
\par
\par
\par
function implodeUrlArgs (obj)\{\par
  var a = [];\par
  for (var k in obj)\par
    a.push (k +'='+ encodeURI(obj[k]) );\par
  return a.join ('&');    \par
\}\par
\par
// NOTE: args can be either a string which will be appended as is to url or an object of name->values\par
function addUrlArgs (url, args)\{\par
  if (!args)\par
    return url;\par
  if (url.indexOf('?') < 0)\par
    url += '?';\par
  else if (url.substr(url.length-1) != '&')\par
    url += '&';    \par
  if (matTypeof(args == 'object'))\par
    return url + implodeUrlArgs (args);    \par
  return url + args;\par
\}\par
\par
// emulate protoype's Ajax.Request ...\par
function AjaxRequest (url, opts)\{\par
  var headers = \{\par
    'X-Requested-With': 'XMLHttpRequest',\par
    'X-Prototype-Version': '1.6.1',\par
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'\par
  \};\par
  var ajax = null;\par
\par
if (DEBUG_TRACE_AJAX) logit ("AJAX: "+ url +"\\n" + inspect (opts, 3, 1));  \par
    \par
  if (window.XMLHttpRequest)\par
    ajax=new XMLHttpRequest();\par
  else\par
    ajax=new ActiveXObject("Microsoft.XMLHTTP");\par
  \par
  if (opts.method==null || opts.method=='')\par
    method = 'GET';\par
  else\par
    method = opts.method.toUpperCase();  \par
    \par
  if (method == 'POST')\{\par
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';\par
  \} else if (method == 'GET')\{\par
    addUrlArgs (url, opts.parameters);\par
  \}\par
\par
  ajax.onreadystatechange = function()\{\par
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4\par
    if (ajax.readyState==4) \{\par
      if (ajax.status >= 200 && ajax.status < 305)\par
        if (opts.onSuccess) opts.onSuccess(ajax);\par
      else\par
        if (opts.onFailure) opts.onFailure(ajax);\par
    \} else \{\par
      if (opts.onChange) opts.onChange (ajax);\par
    \}\par
  \}  \par
    \par
  ajax.open(method, url, true);   // always async!\par
\par
  for (var k in headers)\par
    ajax.setRequestHeader (k, headers[k]);\par
  if (matTypeof(opts.requestHeaders)=='object')\par
    for (var k in opts.requestHeaders)\par
      ajax.setRequestHeader (k, opts.requestHeaders[k]);\par
      \par
  if (method == 'POST')\{\par
    var a = [];\par
    for (k in opts.parameters)\par
      a.push (k +'='+ opts.parameters[k] );\par
    ajax.send (a.join ('&'));\par
  \} else               \{\par
    ajax.send();\par
  \}\par
\}   \par
\par
\par
\par
function MyAjaxRequest (url, o, noRetry)\{\par
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\\n" + inspect (o, 2, 1));\par
  var opts = unsafeWindow.Object.clone(o);\par
  var wasSuccess = o.onSuccess;\par
  var wasFailure = o.onFailure;\par
  var retry = 0;\par
  var delay = 5;\par
  var noRetry = noRetry===true?true:false;\par
  opts.onSuccess = mySuccess;\par
  opts.onFailure = myFailure;\par
\par
if (DEBUG_TRACE) logit (" 1a myAjaxRequest: "+ url +"\\n" + inspect (o, 2, 1));\par
  new AjaxRequest(url, opts);\par
  return;\par
\par
  function myRetry()\{\par
    ++retry;\par
    new AjaxRequest(url, opts);\par
    delay = delay * 1.25;\par
  \}\par
\par
  function myFailure()\{\par
    var o = \{\};\par
if (DEBUG_TRACE) logit ("myAjaxRequest.myFailure(): "+ inspect(rslt, 1, 1));\par
    o.ok = false;\par
    o.errorMsg = "AJAX Communication Failure";\par
    wasFailure (o);\par
  \}\par
\par
  function mySuccess (msg)\{\par
    var rslt = eval("(" + msg.responseText + ")");\par
    var x;\par
    if (rslt.ok)\{\par
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess(): "+ inspect(rslt, 1, 1));\par
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************\par
      if (rslt.updateSeed)\par
        unsafeWindow.update_seed(rslt.updateSeed);\par
      wasSuccess (rslt);\par
      return;\par
    \}\par
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess() !ok : "+ inspect(rslt, 3, 1));\par
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));\par
    if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)\par
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);\par
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3))\{\par
      dialogRetry (rslt.errorMsg, delay, function()\{myRetry()\}, function()\{wasSuccess (rslt)\});\par
    \} else \{\par
      wasSuccess (rslt);\par
    \}\par
  \}\par
\}\par
\par
\par
\par
\par
\par
// returns: 'neutral', 'friendly', or 'hostile'\par
function getDiplomacy (aid) \{\par
  if (Seed.allianceDiplomacies == null)\par
    return 'neutral';\par
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)\par
    return 'friendly';\par
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)\par
    return 'hostile';\par
  if (aid == Seed.allianceDiplomacies.allianceId)\par
    return 'ally';\par
  return 'neutral';\par
\};\par
\par
function getMyAlliance ()\{\par
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)\par
    return [0, 'None'];\par
  else\par
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];\par
\}\par
\par
\par
\par
// TODO: Check times for expired marches !?!?!\par
// note: unselected city has outdated info\par
\par
function getMarchInfo ()\{\par
  var ret = \{\};\par
\par
  ret.marchUnits = [];\par
  ret.returnUnits = [];\par
  ret.resources = [];\par
  for (i=0; i<13; i++)\{\par
    ret.marchUnits[i] = 0;\par
    ret.returnUnits[i] = 0;\par
  \}\par
  for (i=0; i<5; i++)\{\par
    ret.resources[i] = 0;\par
  \}\par
\par
  var now = unixTime();\par
\par
  for(i=0; i<Cities.numCities; i++) \{   // each city\par
    cityID = 'city'+ Cities.cities[i].id;\par
    for (k in Seed.queue_atkp[cityID])\{   // each march\par
      march = Seed.queue_atkp[cityID][k];\par
      if (typeof (march) == 'object')\{\par
        for (ii=0; ii<13; ii++)\{\par
          ret.marchUnits[ii] += parseInt (march['unit'+ ii +'Count']);\par
          ret.returnUnits[ii] += parseInt (march['unit'+ ii +'Return']);\par
        \}\par
        for (ii=1; ii<5; ii++)\{\par
          ret.resources[ii] += parseInt (march['resource'+ ii]);\par
        \}\par
          ret.resources[0] += parseInt (march['gold']);\par
      \}\par
// TODO: fixup completed marches\par
// TODO: Assume transport is complete ?\par
    \}\par
  \}\par
  return ret;\par
\}\par
\par
var fortNamesShort = \{\par
  53: "Crossbows",\par
  55: "Trebuchet",\par
  60: "Trap",\par
  61: "Caltrops",\par
  62: "Spiked Barrier",\par
\}\par
\par
// returns \{count, maxlevel\}\par
function getCityBuilding (cityId, buildingId)\{\par
  var b = Seed.buildings['city'+cityId];\par
  var ret = \{count:0, maxLevel:0\};\par
  for (var i=1; i<33; i++)\{\par
    if (b['pos'+i] && b['pos'+i][0] == buildingId)\{\par
      ++ret.count;\par
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)\par
        ret.maxLevel = parseInt(b['pos'+i][1]);\par
    \}\par
  \}\par
  return ret;\par
\}\par
\par
// example: {\field{\*\fldinst{HYPERLINK "http://www150.kingdomsofcamelot.com"}}{\fldrslt{\ul\cf1 http://www150.kingdomsofcamelot.com}}}\f0\fs22\par
function GetServerId() \{\par
  var m=/^[a-zA-Z]+([0-9]+)\\./.exec(document.location.hostname);\par
  if(m)\par
    return m[1];\par
  return '';\par
\}\par
\par
function logit (msg)\{\par
  var serverID = GetServerId();\par
  var now = new Date();\par
  GM_log (serverID +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);\par
\}\par
\par
\par
\par
/************ DEBUG WIN *************/\par
var debugWin = \{\par
  popDebug : null,\par
  dbDefaultNot : 'tech,tutorial,items,quests,wilderness,wildDef,buildings,knights,allianceDiplomacies,appFriends,players',\par
  dbSelect : \{\},\par
\par
  doit : function ()\{ \par
    var t = debugWin;    \par
\par
    function syncBoxes ()\{\par
      var div = document.getElementById('dbpoplist');\par
      for (var i=0; i<div.childNodes.length; i++)\{\par
        if (div.childNodes[i].type && div.childNodes[i].type=='checkbox')\{\par
          var name=div.childNodes[i].name.substr(6);\par
          div.childNodes[i].checked = t.dbSelect[name];\par
        \}\par
      \} \par
    \}\par
    function clickedAll ()\{\par
      for (var k in t.dbSelect)\par
        t.dbSelect[k] = true;\par
      syncBoxes();\par
    \}\par
    function clickedNone ()\{\par
      for (var k in t.dbSelect)\par
        t.dbSelect[k] = false;\par
      syncBoxes();\par
    \}\par
    function clickedDefaults ()\{\par
      for (k in t.dbSelect)\par
        t.dbSelect[k] = true;\par
      var not = t.dbDefaultNot.split(',');\par
      for (var i=0; i<not.length; i++)\par
        t.dbSelect[not[i]] = false;\par
      syncBoxes();\par
    \}\par
    function clickedShow ()\{\par
      var now = new Date();\par
      var myseed = unsafeWindow.Object.clone (Seed);\par
      var div = document.getElementById('dbpoplist');\par
      for (var i=0; i<div.childNodes.length; i++)\{\par
        if (div.childNodes[i].type && div.childNodes[i].type=='checkbox')\{\par
          var name=div.childNodes[i].name.substr(6);\par
          if (!div.childNodes[i].checked)\par
            delete myseed[name];\par
        \}\par
      \} \par
      WinLog.write ("seed @ "+ unixTime()  +" ("+ now +")\\n\\n"+ inspect (myseed, 8, 1));\par
      myseed=null;\par
    \}\par
    \par
    function clickedShowScripts ()\{\par
      var scripts = document.getElementsByTagName('script');\par
      for (var i=0; i<scripts.length; i++)\{\par
        if (scripts[i].src!=null && scripts[i].src!='')\par
          WinLog.write ('<A TARGET=_tab HREF="'+ scripts[i].src +'">'+ scripts[i].src +'</a>');\par
      \}\par
    \}\par
    \par
    if (t.popDebug == null)\{  \par
      t.popDebug = new CPopup ('db', 0, 0, 400,500, true);\par
      t.popDebug.getTopDiv().innerHTML = 'DEBUG';\par
      t.popDebug.getMainDiv().innerHTML = '<DIV><INPUT type=submit id=dbsuball value=ALL> &nbsp; <INPUT type=submit id=dbsubnone value=NONE> &nbsp; \\\par
        <INPUT type=submit id=dbdefaults value=DEFAULTS> &nbsp; <INPUT type=submit id=dbsubdo value=SHOW> &nbsp; <INPUT type=submit id=dbsubscripts value=SCRIPTS></div>\\\par
        <DIV id=dbpoplist style="max-height:400px; height:400px; overflow-y:auto"></div>';\par
      var div = document.getElementById('dbpoplist');\par
      for (var k in Seed)\par
        t.dbSelect[k] = true;\par
      var not = t.dbDefaultNot.split(',');\par
      for (var i=0; i<not.length; i++)\par
        t.dbSelect[not[i]] = false;\par
      var m = [];\par
      for (k in t.dbSelect)\{\par
        m.push ('<INPUT type=checkbox ');\par
        m.push ('name="dbpop_');\par
        m.push (k);\par
        m.push ('"> &nbsp; ');\par
        m.push (k);\par
        m.push ('<BR>');\par
      \}\par
      div.innerHTML = m.join ('');\par
      document.getElementById('dbsuball').addEventListener('click', clickedAll, false);\par
      document.getElementById('dbsubnone').addEventListener('click', clickedNone, false);\par
      document.getElementById('dbdefaults').addEventListener('click', clickedDefaults, false);\par
      document.getElementById('dbsubdo').addEventListener('click', clickedShow, false);\par
      document.getElementById('dbsubscripts').addEventListener('click', clickedShowScripts, false);\par
      syncBoxes();\par
    \}\par
    t.popDebug.show (true);\par
  \},\par
\}\par
\par
function saveOptions ()\{\par
  var serverID = GetServerId();\par
  GM_setValue ('Options_'+serverID, JSON2.stringify(Options));\par
\}\par
\par
function readOptions ()\{\par
  var serverID = GetServerId();\par
  s = GM_getValue ('Options_'+serverID);\par
  if (s != null)\{\par
    opts = JSON2.parse (s);\par
    for (k in opts)\par
      Options[k] = opts[k];\par
  \}\par
\}\par
\par
\par
/***\par
***/\par
var myServers = \{   // incomplete, untested\par
  serverlist : null,\par
  \par
  get : function (notify)\{\par
    if (myServers.serverlist)\{\par
      notify (myServers.serverlist);\par
      return;\par
    \}\par
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    \par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/myServers.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function(rslt) \{\par
logit (inspect (rslt, 3, 1));  \par
        if (notify)      \par
          notify (myServers.serverlist);\par
      \},\par
      onFailure: function(rslt) \{\par
      \}\par
    \});\par
  \},\par
\};\par
\par
\par
function createButton (label)\{\par
  var a=document.createElement('a');\par
  a.className='button20';\par
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';\par
  return a;\par
\}\par
\par
function AddMainTabLink(text, eventListener, mouseListener) \{\par
  var a = createButton (text);\par
  a.className='tab';\par
  var tabs=document.getElementById('main_engagement_tabs');\par
  if(!tabs) \{\par
    tabs=document.getElementById('topnav_msg');\par
    if (tabs)\par
      tabs=tabs.parentNode;\par
  \}\par
  if (tabs) \{\par
    var e = tabs.parentNode;\par
    var gmTabs = null;\par
    for (var i=0; i<e.childNodes.length; i++)\{\par
      var ee = e.childNodes[i];\par
//if (ee.tagName=='DIV') logit ("CHILD: "+  ee.tagName +' : '+ ee.className+' : '+ ee.id);      \par
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' &&  ee.id!='main_engagement_tabs')\{\par
        gmTabs = ee;\par
        break;\par
      \}\par
    \}\par
    if (gmTabs == null)\{\par
      gmTabs = document.createElement('div');\par
      gmTabs.className='tabs_engagement';\par
      gmTabs.style.background='#ca5';\par
      tabs.parentNode.insertBefore (gmTabs, tabs);\par
      gmTabs.style.whiteSpace='nowrap';\par
      gmTabs.style.width='735px';\par
      gmTabs.lang = 'en_PT';\par
    \}\par
    if (gmTabs.firstChild)\par
      gmTabs.insertBefore (a, gmTabs.firstChild);\par
    else\par
      gmTabs.appendChild(a);\par
    a.addEventListener('click',eventListener, false);\par
    if (mouseListener != null)\par
      a.addEventListener('mousedown',mouseListener, true);\par
    return a;\par
  \}\par
  return null;\par
\}\par
\par
function coordLink (x, y)\{\par
  var m = [];\par
  m.push ('(<a onclick="ptGotoMapHide (');\par
  m.push (x);\par
  m.push (',');\par
  m.push (y);\par
  m.push ('); return false">');\par
  m.push (x);\par
  m.push (',');\par
  m.push (y);\par
  m.push ('</a>)');  \par
  return m.join('');\par
\}\par
\par
\par
unsafeWindow.ptGotoMapHide = function (x, y)\{\par
  try \{\par
    unsafeWindow.Modal.hideModal();\par
  \} catch (e)\{ \}\par
  try \{\par
    Modal.hideModal();\par
  \} catch (e)\{ \}\par
  unsafeWindow.ptGotoMap (x, y);  \par
\}\par
\par
\par
\par
unsafeWindow.ptGotoMap = function (x, y)\{\par
  if (Options.hideOnGoto)\par
    hideMe ();\par
  setTimeout (function ()\{ \par
    document.getElementById('mapXCoor').value = x;\par
    document.getElementById('mapYCoor').value = y;\par
    unsafeWindow.reCenterMapWithCoor();\par
    var a = document.getElementById("mod_views").getElementsByTagName("a");\par
    for (var b = 0; b < a.length; b++) \{\par
        a[b].className = ""\par
    \}\par
    document.getElementById('mod_views_map').className = "sel";\par
    document.getElementById("maparea_city").style.display = 'none';\par
    document.getElementById("maparea_fields").style.display = 'none';\par
    document.getElementById("maparea_map").style.display = 'block';\par
    unsafeWindow.tutorialClear()\par
  \}, 0);\par
\};\par
\par
unsafeWindow.PTscout = function (x, y)\{\par
  setTimeout (function ()\{ \par
    if (Options.hideOnGoto)\par
    hideMe ();\par
    document.getElementById('mapXCoor').value = x;\par
    document.getElementById('mapYCoor').value = y;\par
    unsafeWindow.reCenterMapWithCoor();\par
    unsafeWindow.changeview_map(document.getElementById('mod_views_map'));\par
\tab unsafeWindow.modal_attack(3,x,y);\par
  \}, 0);\par
\};\par
\par
/**********************************************************************************/\par
\par
function makeButton20 (label)\{\par
  var a = document.createElement('a');\par
  a.className = "button20 ptButton20";\par
  var s = document.createElement('span');\par
  s.innerHTML = label;\par
  a.appendChild (s);\par
  return a;\par
\}\par
\par
function strButton20 (label, tags)\{\par
  if (tags == null)\par
    tags = '';\par
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );\par
\}\par
\par
function strButton14 (label, tags)\{\par
  if (tags == null)\par
    tags = '';\par
  return ('<A class="button14 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a>' );\par
\}\par
\par
function cityStatusString (cs)\{\par
  if (cs==4)\par
    return 'Vacation';\par
  if (cs==3)\par
    return 'Truce';\par
  if (cs==2)\par
    return 'Beg Protection';\par
  return 'Normal';\par
\}    \par
\par
// Simple method, as if it were typed in thru DOM\par
function sendChat (msg)\{\par
  document.getElementById ("mod_comm_input").value = msg;\par
  unsafeWindow.Chat.sendChat ();\par
\}\par
\par
// works well, but message is not echoed back to local client\par
Chat = \{\par
  params : null,\par
\par
  sendWhisper : function (msg, who, notify)\{\par
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    this.params.ctype = 3;\par
    this.params.name = who;\par
    this._sendit (msg, notify);\par
  \},\par
\par
  sendGlobal : function (msg, notify)\{\par
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    this.params.ctype = 1;\par
    this._sendit (msg, notify);\par
  \},\par
\par
  sendAlliance : function (msg, notify)\{\par
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
    this.params.ctype = 2;\par
    this._sendit (msg, notify);\par
  \},\par
\par
  _sendit : function (msg, notify)\{\par
    function strip(s) \{\par
       return s.replace(/^\\s+/, '').replace(/\\s+$/, '');\par
    \}\par
    this.params.comment = strip (msg);\par
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendChat.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: this.params,\par
      onSuccess: function(transport) \{\par
        if (notify)\par
          notify ();\par
      \},\par
      onFailure: function(transport) \{\par
        if (notify)\par
          notify ();\par
      \}\par
    \});\par
  \},\par
\}\par
\par
function doDefTrain (cityId, unitId, num, notify)\{\par
  var time = unsafeWindow.modal_walls_traintime(unitId, num);\par
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
  params.cid = cityId;\par
  params.type = unitId;\par
  params.quant = num;\par
  params.items = 0;\par
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fortify.php" + unsafeWindow.g_ajaxsuffix, \{\par
      method: "post",\par
      parameters: params,\par
      onSuccess: function (rslt) \{\par
        if (rslt.ok) \{\par
          unsafeWindow.seed.queue_fort["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, rslt.fortifyId]);\par
          if (notify != null)\par
            setTimeout (function ()\{notify(null);\}, 500);\par
        \} else \{\par
          if (notify != null)\par
            setTimeout (function ()\{notify(rslt.errorMsg);\}, 500);\par
        \}\par
      \},\par
      onFailure: function () \{\par
        if (notify != null)\par
          notify(rslt.errorMsg);\par
      \},\par
  \});\par
\}\par
\par
\par
function doTrain (cityId, unitId, num, notify)\{\par
  var time = unsafeWindow.modal_barracks_traintime(unitId, num);\par
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);\par
  params.cid = cityId;\par
  params.type = unitId;\par
  params.quant = num;\par
  params.items = 0;\par
\par
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, \{\par
    method: "post",\par
    parameters: params,\par
    onSuccess: function(rslt) \{\par
      if (rslt.ok) \{\par
        for (var i = 1; i < 5; i++) \{\par
          unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(num)\par
        \}\par
        unsafeWindow.seed.citystats["city" + cityId].gold[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].gold[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][5]) * parseInt(num);\par
        unsafeWindow.seed.citystats["city" + cityId].pop[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].pop[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][6]) * parseInt(num);\par
        unsafeWindow.seed.queue_unt["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]);\par
        if (notify != null)\par
          setTimeout (function ()\{notify(null);\}, 500);\par
      \} else \{\par
        if (notify != null)\{\par
          setTimeout (function ()\{notify(rslt.errorMsg);\}, 500);\par
        \}\par
      \}\par
    \},\par
    onFailure: function(o) \{\par
      if (notify != null)\par
        notify(rslt.errorMsg);\par
    \}\par
  \});\par
\}\par
\par
\par
\par
/************  LIB classes/functions .... **************/\par
function getAbsoluteOffsets (e)\{\par
  ret = \{left:0, top:0\};\par
  while (e.offsetParent)\{\par
    if (e.style.position == 'absolute')\par
      break;\par
    ret.left += e.offsetLeft;\par
    ret.top += e.offsetTop;\par
    e = e.offsetParent;\par
  \}      \par
  return ret;  \par
\}\par
\par
DebugTimer = \{\par
  startTime : 0,\par
  start : function ()\{\par
    now = new Date();\par
    DebugTimer.startTime = now.getTime();\par
  \},\par
  display : function (label, noReset)\{\par
    now = new Date();\par
    elapsed = now.getTime() - DebugTimer.startTime;\par
    logit (label +": "+ elapsed/1000);\par
    if (noReset===null || !noReset)\par
      DebugTimer.startTime = now.getTime();\par
  \},\par
\};\par
\par
function debugPos  (e)\{\par
  return 'client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight\par
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;\par
\}\par
\par
function debugElement  (e)\{\par
  var x = unsafeWindow.Object.clone (e.wrappedJSObject);\par
  x.innerHTML = '';\par
  x.innerText = '';\par
  x.textContent = '';\par
  return inspect (x, 1, 1);\par
\}     \par
\par
function searchDOM (node, condition, maxLevel, doMult)\{\par
  var found = [];\par
  eval ('var compFunc = function (node) \{ return ('+ condition +') \}');\par
  doOne(node, 1);\par
  if(!doMult)\{\par
    if (found.length==0)\par
      return null;\par
    return found[0];\par
  \}\par
  return found;\par
  function doOne (node, curLevel)\{\par
    try \{\par
      if (compFunc(node))\par
        found.push(node);\par
    \} catch (e)\{\par
    \}      \par
    if (!doMult && found.length>0)\par
      return; \par
    if (++curLevel<maxLevel && node.childNodes!=undefined)\par
      for (var c=0; c<node.childNodes.length; c++)\par
        doOne (node.childNodes[c], curLevel);\par
  \}\par
\}\par
\par
function getClientCoords(e)\{\par
  if (e==null)\par
    return \{x:null, y:null, width:null, height:null\};\par
  var x=0, y=0;\par
  ret = \{x:0, y:0, width:e.clientWidth, height:e.clientHeight\};\par
  while (e.offsetParent != null)\{\par
    ret.x += e.offsetLeft;\par
    ret.y += e.offsetTop;\par
    e = e.offsetParent;\par
  \}\par
  return ret;\par
\}\par
\par
\par
function htmlTitleLine (msg)\{\par
  return '<TABLE width=100% cellspacing=0><TR><TD style="padding:0px" width=50%><HR></td><TD style="padding:0px">[ '+ msg +' ]</td><TD style="padding:0px" width=50%><HR></td></tr></table>';  \par
\}\par
\par
\par
var WinManager = \{\par
  wins : \{\},    // prefix : CPopup obj\par
\par
  get : function (prefix)\{\par
    var t = WinManager;\par
    return t.wins[prefix];\par
  \},\par
  \par
  add : function (prefix, pop)\{\par
    var t = WinManager;\par
    t.wins[prefix] = pop;\par
    if (unsafeWindow.cpopupWins == null)\par
      unsafeWindow.cpopupWins = \{\};\par
    unsafeWindow.cpopupWins[prefix] = pop;\par
  \},\par
  \par
  delete : function (prefix)\{\par
    var t = WinManager;\par
    delete t.wins[prefix];\par
    delete unsafeWindow.cpopupWins[prefix];\par
  \}    \par
\}\par
\par
\par
// creates a 'popup' div\par
// prefix must be a unique (short) name for the popup window\par
function CPopup (prefix, x, y, width, height, enableDrag, onClose) \{\par
  var pop = WinManager.get(prefix);\par
  if (pop)\{\par
    pop.show (false);\par
    return pop;\par
  \}\par
  this.BASE_ZINDEX = 111111;\par
    \par
  // protos ...\par
  this.show = show;\par
  this.toggleHide = toggleHide;\par
  this.getTopDiv = getTopDiv;\par
  this.getMainDiv = getMainDiv;\par
  this.getLayer = getLayer;\par
  this.setLayer = setLayer;\par
  this.setEnableDrag = setEnableDrag;\par
  this.getLocation = getLocation;\par
  this.setLocation = setLocation;\par
  this.focusMe = focusMe;\par
  this.unfocusMe = unfocusMe;\par
  this.centerMe = centerMe;\par
  this.destroy = destroy;\par
\par
  // object vars ...\par
  this.div = document.createElement('div');\par
  this.prefix = prefix;\par
  this.onClose = onClose;\par
  \par
  var t = this;\par
  this.div.className = 'CPopup '+ prefix +'_CPopup';\par
  this.div.id = prefix +'_outer';\par
  this.div.style.background = "#fff";\par
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?\par
  this.div.style.display = 'none';\par
  this.div.style.width = width + 'px';\par
  this.div.style.height = height + 'px';\par
  this.div.style.position = "absolute";\par
  this.div.style.top = y +'px';\par
  this.div.style.left = x + 'px';\par
  \par
  if (CPopUpTopClass==null)\par
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';\par
  else\par
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;\par
    \par
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\\\par
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\\'pointer\\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td></tr>\\\par
      <TR><TD height=100% valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';\par
  document.body.appendChild(this.div);\par
  this.div.innerHTML = m;\par
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);\par
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);\par
  \par
  this.div.addEventListener ('mousedown', e_divClicked, false);\par
  WinManager.add(prefix, this);\par
  \par
  function e_divClicked ()\{\par
    t.focusMe();\par
  \}  \par
  function e_XClose ()\{\par
    t.show(false);\par
    if (t.onClose != null)\par
      t.onClose();\par
  \}\par
\par
  function focusMe ()\{\par
    t.setLayer(5);\par
    for (k in unsafeWindow.cpopupWins)\{\par
      if (k != t.prefix)\par
        unsafeWindow.cpopupWins[k].unfocusMe(); \par
    \}\par
  \}\par
  function unfocusMe ()\{\par
    t.setLayer(-5);\par
  \}\par
  function getLocation ()\{\par
    return \{x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)\};\par
  \}\par
  function setLocation (loc)\{\par
    t.div.style.left = loc.x +'px';\par
    t.div.style.top = loc.y +'px';\par
  \}\par
  function destroy ()\{\par
    document.body.removeChild(t.div);\par
    WinManager.delete (t.prefix);\par
  \}\par
  function centerMe (parent)\{\par
    if (parent == null)\{\par
      var coords = getClientCoords(document.body);\par
    \} else\par
      var coords = getClientCoords(parent);\par
    var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;\par
    var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;\par
    if (x<0)\par
      x = 0;\par
    if (y<0)\par
      y = 0;\par
    t.div.style.left = x +'px';\par
    t.div.style.top = y +'px';\par
  \}\par
  function setEnableDrag (tf)\{\par
    t.dragger.setEnable(tf);\par
  \}\par
  function setLayer(zi)\{\par
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);\par
  \}\par
  function getLayer()\{\par
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;\par
  \}\par
  function getTopDiv()\{\par
    return document.getElementById(this.prefix+'_top');\par
  \}\par
  function getMainDiv()\{\par
    return document.getElementById(this.prefix+'_main');\par
  \}\par
  function show(tf)\{\par
    if (tf)\{\par
      t.div.style.display = 'block';\par
      t.focusMe ();\par
    \} else \{\par
      t.div.style.display = 'none';\par
    \}\par
    return tf;\par
  \}\par
  function toggleHide(t)\{\par
    if (t.div.style.display == 'block') \{\par
      return t.show (false);\par
    \} else \{\par
      return t.show (true);\par
    \}\par
  \}\par
\}\par
\par
function CWinDrag (clickableElement, movingDiv, enabled) \{\par
  var t=this;\par
  this.setEnable = setEnable;\par
  this.setBoundRect = setBoundRect;\par
  this.debug = debug;\par
  this.dispEvent = dispEvent;\par
  this.lastX = null;\par
  this.lastY = null;\par
  this.enabled = true;\par
  this.moving = false;\par
  this.theDiv = movingDiv;\par
  this.body = document.body;\par
  this.ce = clickableElement;\par
  this.moveHandler = new CeventMove(this).handler;\par
  this.outHandler = new CeventOut(this).handler;\par
  this.upHandler = new CeventUp(this).handler;\par
  this.downHandler = new CeventDown(this).handler;\par
  this.clickableRect = null;\par
  this.boundRect = null;\par
  this.bounds = null;\par
  this.enabled = false;\par
  if (enabled == null)\par
    enabled = true;\par
  this.setEnable (enabled);\par
\par
  function setBoundRect (b)\{    // this rect (client coords) will not go outside of current body\par
    this.boundRect = boundRect;\par
    this.bounds = null;\par
  \}\par
\par
  function setEnable (enable)\{\par
    if (enable == t.enabled)\par
      return;\par
    if (enable)\{\par
      clickableElement.addEventListener('mousedown',  t.downHandler, false);\par
      t.body.addEventListener('mouseup', t.upHandler, false);\par
    \} else \{\par
      clickableElement.removeEventListener('mousedown', t.downHandler, false);\par
      t.body.removeEventListener('mouseup', t.upHandler, false);\par
    \}\par
    t.enabled = enable;\par
  \}\par
\par
  function CeventDown (that)\{\par
    this.handler = handler;\par
    var t = that;\par
    function handler (me)\{\par
if (DEBUG_TRACE_DRAG) t.dispEvent ('eventDOWN', me);\par
      if (t.bounds == null)\{\par
        t.clickableRect = getClientCoords(clickableElement);\par
        t.bodyRect = getClientCoords(document.body);\par
        if (t.boundRect == null)\par
          t.boundRect = t.clickableRect;\par
if (DEBUG_TRACE_DRAG) logit ('Clickable rect: '+ inspect (t.clickableRect, 3, 1));\par
if (DEBUG_TRACE_DRAG) logit ('Body rect: '+ inspect (t.bodyRect, 3, 1));\par
if (DEBUG_TRACE_DRAG) logit ('Bound rect: '+ inspect (t.boundRect, 3, 1));\par
        t.bounds = \{top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25\};\par
if (DEBUG_TRACE_DRAG) logit ("BOUNDS: "+ inspect (t.bounds, 8, 10));\par
      \}\par
      if (me.button==0 && t.enabled)\{\par
        t.body.addEventListener('mousemove', t.moveHandler, true);\par
        t.body.addEventListener('mouseout', t.outHandler, true);\par
        t.lastX = me.clientX;\par
        t.lastY = me.clientY;\par
        t.moving = true;\par
      \}\par
    \}\par
  \}\par
\par
  function CeventUp  (that)\{\par
    this.handler = handler;\par
    var t = that;\par
    function handler (me)\{\par
if (DEBUG_TRACE_DRAG) t.dispEvent ('eventUP', me);\par
      if (me.button==0 && t.moving)\par
        _doneMoving(t);\par
    \}\par
  \}\par
\par
  function _doneMoving (t)\{\par
if (DEBUG_TRACE_DRAG) logit ('doneMoving');\par
    t.body.removeEventListener('mousemove', t.moveHandler, true);\par
    t.body.removeEventListener('mouseout', t.outHandler, true);\par
    t.moving = false;\par
  \}\par
\par
  function CeventOut  (that)\{\par
    this.handler = handler;\par
    var t = that;\par
    function handler (me)\{\par
//t.dispEvent ('eventOUT', me);\par
      if (me.button==0)\{\par
        t.moveHandler (me);\par
      \}\par
    \}\par
  \}\par
\par
  function CeventMove (that)\{\par
    this.handler = handler;\par
    var t = that;\par
    function handler (me)\{\par
      if (t.enabled && !t.wentOut)\{\par
//t.dispEvent ('eventMOVE', me);\par
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;\par
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;\par
        if (newTop < t.bounds.top)\{     // if out-of-bounds...\par
          newTop = t.bounds.top;\par
          _doneMoving(t);\par
        \} else if (newLeft < t.bounds.left)\{\par
          newLeft = t.bounds.left;\par
          _doneMoving(t);\par
        \} else if (newLeft > t.bounds.right)\{\par
          newLeft = t.bounds.right;\par
          _doneMoving(t);\par
        \} else if (newTop > t.bounds.bot)\{\par
          newTop = t.bounds.bot;\par
          _doneMoving(t);\par
        \}\par
        t.theDiv.style.top = newTop + 'px';\par
        t.theDiv.style.left = newLeft + 'px';\par
        t.lastX = me.clientX;\par
        t.lastY = me.clientY;\par
      \}\par
    \}\par
  \}\par
\par
  function debug  (msg, e)\{\par
    logit ("*************** "+ msg +" ****************");\par
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);\par
    logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');\par
    logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);\par
  \}\par
\par
  function dispEvent (msg, me)\{\par
    logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);\par
  \}\par
\}\par
\par
function inspect(obj, maxLevels, level, doFunctions)\{\par
  var str = '', type, msg;\par
  if(level == null)  level = 0;\par
  if(maxLevels == null) maxLevels = 1;\par
  if(maxLevels < 1)\par
      return 'Inspect Error: Levels number must be > 0';\par
  if(obj == null)\par
    return 'ERROR: Object is NULL\\n';\par
  var indent = '';\par
  for (var i=0; i<level; i++)\par
    indent += '  ';\par
  for(property in obj) \{\par
    try \{\par
        type =  matTypeof(obj[property]);\par
        if (doFunctions==true && (type == 'function'))\{\par
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\\n";\par
        \} else if (type != 'function') \{\par
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\\n";\par
        \}\par
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))\par
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse\par
    \}\par
    catch(err) \{\par
      // Is there some properties in obj we can't access? Print it red.\par
      if(typeof(err) == 'string') msg = err;\par
      else if(err.message)        msg = err.message;\par
      else if(err.description)    msg = err.description;\par
      else                        msg = 'Unknown';\par
      str += '(Error) ' + property + ': ' + msg +"\\n";\par
    \}\par
  \}\par
  str += "\\n";\par
  return str;\par
\}\par
\par
Array.prototype.compare = function(testArr) \{\par
    if (this.length != testArr.length) return false;\par
    for (var i = 0; i < testArr.length; i++) \{\par
        if (this[i].compare) \{ \par
            if (!this[i].compare(testArr[i])) return false;\par
        \}\par
        if (this[i] !== testArr[i]) return false;\par
    \}\par
    return true;\par
\}\par
String.prototype.entityTrans = \{ '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\\"':'&quot;' \};\par
String.prototype.htmlEntities = function() \{\par
  var ret = this.toString();\par
  for (k in this.entityTrans)\par
     ret  = ret.split(k).join(this.entityTrans[k]);\par
  return ret;\par
\}\par
\par
String.prototype.stripTags = function()\{ \par
  return this.replace(/<\\w+(\\s+("[^"]*"|'[^']*'|[^>])+)?>|<\\/\\w+>/gi, '');\par
\}\par
\par
String.prototype.capitalize = function()\{ \par
  return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();\par
\}\par
\par
function objectName (o)\{\par
  var s = o.toString();\par
  return s.substr(7,s.length-8);\par
\}\par
\par
function matTypeof (v)\{\par
  if (v == undefined)\par
    return 'undefined';\par
  if (typeof (v) == 'object')\{\par
    if (!v)\par
      return 'null';\par
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')\par
      return 'array';\par
    else return 'object';\par
  \}\par
  return typeof (v);\par
\}\par
\par
function addCommasInt(n)\{\par
  nStr = parseInt(n) + '';\par
  var rgx = /(\\d+)(\\d\{3\})/;\par
  while (rgx.test(nStr)) \{\par
    nStr = nStr.replace(rgx, '$1' + ',' + '$2');\par
  \}\par
  return nStr;\par
\}\par
\par
function addCommas(nStr)\{\par
  nStr += '';\par
  x = nStr.split('.');\par
  x1 = x[0];\par
  x2 = x.length > 1 ? '.' + x[1] : '';\par
  var rgx = /(\\d+)(\\d\{3\})/;\par
  while (rgx.test(x1)) \{\par
    x1 = x1.replace(rgx, '$1' + ',' + '$2');\par
  \}\par
  return x1 + x2;\par
\}\par
\par
\par
function addCommasWhole(nStr)\{\par
  nStr += '';\par
  x = nStr.split('.');\par
  x1 = x[0];\par
  x2 = x.length > 1 ? '.' + x[1] : '';\par
  var rgx = /(\\d+)(\\d\{3\})/;\par
  while (rgx.test(x1)) \{\par
    x1 = x1.replace(rgx, '$1' + ',' + '$2');\par
  \}\par
  return x1;\par
\}\par
\par
\par
function htmlSelector (valNameArray, curVal, tags)\{\par
  m = [];\par
  m.push ('<SELECT');\par
  if (tags)\{\par
    m.push (' ');\par
    m.push (tags);\par
  \}  \par
  for (k in valNameArray)\{\par
    m.push ('><OPTION ');\par
    if (k == curVal)\par
      m.push ('SELECTED ');\par
    m.push ('value="');\par
    m.push (k);\par
    m.push ('">');\par
    m.push (valNameArray[k]);\par
    m.push ('</option>');\par
  \}\par
  m.push ('</select>');\par
  return m.join ('');\par
\par
\}\par
\par
\par
function unixTime ()\{\par
  return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;\par
\}\par
function htmlOptions (a, curVal)\{\par
  m = '';\par
  for (k in a)\par
    m += '<OPTION value="'+ k +'"'+ (k==curVal?' SELECTED':'')  +'>'+ a[k] +'</option>';\par
  return m;\par
\}\par
function getFunctionName (func)\{\par
  var name=/\\W*function\\s+([\\w\\$]+)\\(/.exec(func);\par
  if (!name)\par
    return '';\par
  return name[1];\par
\}\par
\par
function findAllBetween (txt, find1, find2)\{\par
  var m = [];\par
  var last = 0;\par
  while ( (i1=txt.indexOf(find1, last))>=0 && (i2=txt.indexOf (find2, i1))>=0 ) \{\par
    m.push (txt.substring(i1+find1.length, i2));\par
    last = i2 + find2.length;\par
  \}\par
  return m;\par
\}\par
\par
function strUpTo (s, find)\{\par
  var i = s.indexOf(find);\par
  if (i > 0)\par
    return s.substr(0, i);\par
  return s;\par
\}\par
\par
\par
/********\par
 Xd Xh\par
 Xh Xm\par
 Xm Xs\par
 Xs\par
********/\par
function timestrShort(time) \{\par
  time = parseInt (time);\par
  if (time > 86400)\{\par
    var m = [];\par
    time /= 3600;\par
    m.push (parseInt(time/24)); \par
    m.push ('d ');\par
    m.push (parseInt(time%24)); \par
    m.push ('h ');\par
    return m.join ('');    \par
  \} else\par
    return timestr (time);\par
\}\par
\par
/**********************\par
 part       full\par
 Xd Xh Xm   Xd Xh Xm Xs\par
 Xh Xm      Xh Xm Xs\par
 Xm Xs      Xm Xs\par
 Xs         Xs\par
**********************/\par
function timestr(time, full) \{\par
  time = parseInt (time);\par
  var m = [];\par
  var t = time;\par
  if (t < 61)\par
    return  t + 's';\par
  if (t > 86400)\{\par
    m.push (parseInt(t/86400)); \par
    m.push ('d ');\par
    t %= 86400;\par
  \}  \par
  if (t>3600 || time>3600)\{\par
    m.push (parseInt(t/3600)); \par
    m.push ('h ');\par
    t %= 3600;\par
  \}  \par
  m.push (parseInt(t/60)); \par
  m.push ('m');\par
  if (full || time<=3600 )\{\par
    m.push (' ');\par
    m.push (t%60);\par
    m.push ('s');  \par
  \}\par
  return m.join ('');\par
\}\par
\par
/************  LIB singletons .... **************/\par
// TODO: fix REopening window\par
var WINLOG_MAX_ENTRIES = 1000;     // TODO\par
var WinLog = \{\par
  state : null,\par
  win: null,\par
  eOut : null,\par
  lastE : null,\par
  enabled : true,\par
  reverse : true,\par
  busy : false,\par
isOpening : false,\par
\par
  open : function ()\{\par
    var t = WinLog;\par
\par
    function eventButClear()\{\par
      var t = WinLog;\par
      t.lastE = null;\par
      t.eOut.innerHTML ='';\par
    \}\par
    function eventButReverse()\{\par
      var t = WinLog;\par
      if (t.busy)\par
        return;\par
      t.busy = true;\par
      if (t.reverse)\{\par
        t.win.document.getElementById('wlRev').value= 'Top';\par
        t.reverse = false;\par
      \} else\{\par
        t.win.document.getElementById('wlRev').value= 'Bottom';\par
        t.reverse = true;\par
      \}\par
      var n = t.eOut.childNodes.length;\par
      if (n < 2)\par
        return;\par
      for (i=n-2; i>=0; i--)\{\par
        t.eOut.appendChild (t.eOut.childNodes[i]);\par
      \}\par
      t.busy = false;\par
    \}\par
    \par
    if (!t.win || t.win.closed)\{\par
t.isOpening = true;  \par
// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window\par
      t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');\par
t.isOpening = false; \par
t.state = null; \par
    \}\par
    \par
    if (t.state == null)\{\par
      t.win.document.body.innerHTML = '<STYLE>pre\{margin:0px\} hr\{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee\}</style>\\\par
        <BODY style="margin:0px; padding:0px; border:none">\\\par
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\\\par
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\\\par
        <DIV id=wlOut style="overflow-y:auto; height:100%; max-height:100%"></div></body>';\par
      t.win.document.getElementById('wlClear').addEventListener('click', eventButClear, false);\par
      t.win.document.getElementById('wlRev').addEventListener('click', eventButReverse, false);\par
      t.eOut =  t.win.document.getElementById('wlOut');\par
      t.lastE = null;\par
      t.state = 1;\par
    \}\par
  \},\par
\par
  writeText : function (msg)\{\par
    WinLog.write (msg.htmlEntities()); \par
  \},\par
  \par
  write : function (msg)\{\par
    var t = WinLog;\par
    if (!t.enabled || t.isOpening)\par
      return;\par
    t.open();\par
    var te = document.createElement('pre');\par
    var now = new Date();\par
    var m = [];\par
    var millis = now.getMilliseconds();\par
    m.push (now.toTimeString().substring (0,8));\par
    m.push ('.');\par
    if (millis<100)\par
      m.push('0');\par
    if (millis<10)\par
      m.push('0');\par
    m.push(millis);\par
    m.push (': ');\par
    m.push (msg);\par
    te.innerHTML = m.join('');\par
\par
    if (t.reverse)\{\par
      if (t.lastE == null)\{\par
        t.eOut.appendChild(te);\par
        t.lastE = te;\par
      \} else \{\par
        t.eOut.insertBefore(te, t.lastE);\par
      \}\par
      var hr = document.createElement('hr');\par
      t.eOut.insertBefore(hr, te);\par
      t.lastE = hr;\par
    \} else \{\par
      t.eOut.appendChild(te);\par
      t.eOut.appendChild(document.createElement('hr'));\par
    \}\par
  \},\par
\};\par
\par
ptStartup ();\par
\par
var AudioAlert = \{\par
  alert : true,\par
  init : function()\{\par
    var t = AudioAlert;\par
\tab //t.whisperalert();\par
\tab t.creatediv();\par
  \},\par
  \par
  creatediv : function()\{\par
  var diva = document.getElementsByTagName('div');\par
\tab for (var i = 0; i < diva.length - 1; i++)\par
\tab\tab if (diva[i].className == 'mod_comm_forum')\par
\tab\tab\tab e = diva[i];\par
\tab alertDiv = document.createElement("span");\par
\tab alertDiv.setAttribute("id", "alertDiv");\par
\tab e.appendChild(alertDiv);\par
  \},\par
  \par
  sound : function(tf)\{\par
   var t = AudioAlert;\par
\tab\par
\tab var divs = document.getElementById('alertDiv');\tab\par
\par
\tab if(tf)\{\par
\tab divs.innerHTML = '<iframe src="http://corpr8.co.uk/newalert.html" height="20" width="100"></iframe>';\par
\tab t.alert = true;\par
\tab\} else \{\par
\tab\tab divs.innerHTML = "<b style='color: rgb(165, 102, 49); font-size: 9px;'>Audio Alert Played</b>";\par
\tab t.alert = false;\par
\tab\}\par
\tab\par
\tab if(t.alert)\par
\tab setTimeout(function()\{t.sound(false)\},10000);\par
  \},\par
  \par
  scanalliancechat : function()\{\par
  \par
  \},\par
  \par
  whisperalert : function()\{\par
  var divs = document.getElementsByTagName('div');\par
\tab for (var i = 0; i < divs.length - 1; i++) \{\par
\tab\tab if (divs[i].className == 'comm_tabs seltab2') \{\par
\tab\tab bS = document.getElementsByTagName('b')\par
\tab\tab\tab for (var j = 0; j < bS.length - 1; j++) \par
\tab\tab\tab\tab if (bS[j].innerHTML == ' whispers to you:')\par
\tab\tab\tab\tab\tab AudioAlert.sound(true);\par
\tab\tab\}\par
\tab\}\par
  \},\par
  \par
\}\par
\par
GM_setValue("lastMsgTime", "0000");//hold the previous msg alert time.\par
//alert('got here');\par
\par
function check_html()\{\par
    var divCollection = document.getElementsByTagName('div');\par
    var div_collection_adjusted = divCollection.length - 1;\par
    for (var i = 0; i < div_collection_adjusted; i++) \{\par
        if ((divCollection[i].getAttribute("class") == "tx" && divCollection[i].innerHTML == "****")) \{\par
            var new_msg_index = i;\par
            i = divCollection.length - 1;\par
            \par
            var tx_div_collection = divCollection[new_msg_index].parentNode.parentNode.getElementsByTagName('span');\par
            //var tx_div_collection_adjusted = tx_div_collection.length -1;\par
            \par
            for (var j = 0; j < tx_div_collection.length; j++) \{\par
                if (tx_div_collection[j].getAttribute("class") == "time") \{\par
                    //alert("got here");\par
                    if (tx_div_collection[j].innerHTML != GM_getValue("lastMsgTime")) \{\par
                        GM_setValue("lastMsgTime", tx_div_collection[j].innerHTML);\par
                        //alert("got here");\par
                        iframe = document.createElement("iframe");\par
                        iframe.setAttribute("src", "{\field{\*\fldinst{HYPERLINK "http://corpr8.co.uk/newalert.html"}}{\fldrslt{\ul\cf1 http://corpr8.co.uk/newalert.html}}}\f0\fs22 ");\par
                        iframe.setAttribute("width", "100");\par
                        iframe.setAttribute("height", "20");\par
                        //void(document.body.appendChild(iframe));\par
                        //alert("got here");\tab\tab\par
                        void (divCollection[new_msg_index].parentNode.appendChild(iframe));\par
                        divCollection[new_msg_index].className = 'edited';\par
                    \}\par
                \}\par
                \par
            \}\par
        \}\par
    \}\par
\}\par
\par
function scan_allianceChat()\{\par
    try \{\par
\tab    if (Options.WhisperOn==false)\{ \par
\}\par
else\par
        //this should isolate the stuff in alliance chat. seltab2 = alliance.\par
        var foundMsg = false;\par
        \par
        var divs = document.getElementsByTagName('div');\par
        for (var i = 0; i < divs.length - 1; i++) \{\par
            if (divs[i].className == 'comm_tabs seltab2') \{\par
                //Ok we have now detected that chat is set to alliance.\par
                \par
                bS = document.getElementsByTagName('b')\par
                for (var j = 0; j < bS.length - 1; j++) \{\par
                    if (bS[j].innerHTML == ' whispers to you:') \{\par
                        //ok we have now found a whisper to you.\par
                        if (foundMsg == false) \{\par
                            foundMsg = true;\par
                            \par
                            //now find the message time.\par
                            //var msgSpan = bS[j].parentNode.getElementsByTagName('span')[0].innerHTML;\par
                            //if (GM_getValue("lastMsgTime") != msgSpan) \{\par
\tab\tab\tab\tab\tab\tab\tab //\tab alert('got here');\par
                            //  GM_setValue("lastMsgTime", msgSpan);\par
\tab\tab\tab\tab\tab\tab\tab //\tab alert('have set message value');\par
                                bS[j].innerHTML = ' whispered to you:';\par
                                alertDiv = document.createElement("div");\par
                                alertDiv.innerHTML = '<iframe src="http://corpr8.co.uk/newalert.html" height="20" width="100"></iframe>';\par
                                alertDiv.setAttribute("class", "alertDiv");\par
                                \par
                                void (bS[j].appendChild(alertDiv));\par
                                \par
                                window.setTimeout(function()\{\par
                                    var divs = document.getElementsByTagName('div');\par
                                    for (var i = 0; i < divs.length - 1; i++) \{\par
                                        if (divs[i].className == 'alertDiv') \{\par
                                            divs[i].innerHTML = "Audio Alert Played";\par
                                        \}\par
                                    \}\par
                                \}, 10000);\par
                                \par
                                \par
                            //\}\par
                        \}\par
                    \}\par
                \}\par
            \}\par
        \}\par
    \} \par
    catch (err) \{\par
        alert(err);\par
    \}\par
\}\par
\par
\par
window.setInterval(function()\{\par
    scan_allianceChat();\par
    //check_html()\par
\}, 5000);\par
\pard\sa200\sl276\slmult1\lang9\f1\par
}
