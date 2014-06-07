// ==UserScript==
// @name           Lig Tv İzle
// @version        20121abscr
// @namespace      By Cellat
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*platforms/kabam*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/kingdoms-of-camelot/play*
// @include        *facebook.com/connect/uiserver.php*
// @include        *facebook.com/*/serverfbml*
// @include        *facebook.com/dialog/feed*
// @include        *facebook.com/dialog/stream.publish*
// @include        *facebook.com/dialog/apprequests*
// @description    
// ==/UserScript==


var Version = '20121abscr';

// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var ENABLE_TEST_TAB = false;
var ENABLE_ATTACK_TAB = false;
var ENABLE_SAMPLE_TAB = false;
var DISABLE_BULKADD_LIST = false;
var ENABLE_GM_AJAX_TRACE = false;
var SEND_ALERT_AS_WHISPER = false;
// end test switches

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

unsafeWindow.arthurCheck = function (a) {
  var b = false;
  for (var c = 0; c < a.length; c++) {
    if ($(unescape(a[c]))) {
      b = true;
      break
    }
  }
  if (b) {
    unsafeWindow.AjaxCall.gPostRequest("ajax/funnelTracking.php", {
      action: 1300,
      serverId: unsafeWindow.g_server,
      uid: unsafeWindow.moderators[Math.floor((Math.random()*unsafeWindow.moderators.length))]
    })
  }
};

var Options = {
  nbWinIsOpen  : false,
  nbWinDrag    : true,
  nbWinPos     : {},
  nbTrackOpen  : true,
  currentTab   : null,
  Opacity : 0.9,
  language : 'en',
  KMagicBox : false,
};
//unsafeWindow.pt_Options=Options;

var GlobalOptions = {
  nbWatchdog   : false,
  nbWideScreen : true,
  nbWideScreenStyle : 'normal',
  autoPublishPrivacySetting : 80,
  nbupdate : true,
  nbupdatebeta : 0,
  nbNoMoreKabam : false,
  escapeurl : null,
};

var ResetAll=false;
var deleting=false;

// Get element by id shortform with parent node option
function $(ID,root) {return (root||document).getElementById(ID);}

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

readGlobalOptions ();
readOptions();

var Seed = unsafeWindow.seed;
var Tabs = {};
var nbButtons = {};
var mainPop;
var nbStartupTimer = null;
var nbPopUpTopClass = 'nbPopTop';
var firefoxVersion = getFirefoxVersion();
var TrainCity = 0;
var CM = unsafeWindow.cm;

function nbStartup (){
  clearTimeout (nbStartupTimer);
  if (unsafeWindow.nbLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    nbStartupTimer = setTimeout (nbStartup, 1000);
    return;
  }
  unsafeWindow.nbLoaded = true;
  //logit ("KofC client version: "+ anticd.getKOCversion());

  Seed = unsafeWindow.seed;
  readOptions();
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    table.nbTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    table.nbTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.nbTabBR tr td {border:none; background:none;}\
    table.nbTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.nbOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.nbSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.nbTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
    table.nbTabPad tr td { padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .nbDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
    .nbStat {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:#357;  -moz-border-radius:5px;}\
    .nbentry {padding: 7px; white-space:nowrap;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    input.nbDefButOn {cursor:pointer; border:1px solid #45d183; -moz-box-shadow:inset 0px 1px 5px #3aef8b; -moz-border-radius:5px;}\
    input.nbDefButOff {cursor:pointer; border:1px solid #f61646; -moz-box-shadow:inset 0px 1px 5px #f6375f; -moz-border-radius:5px;}\
    a.ptButton20 {color:#ffff80}\
    table.nbMainTab { empty-cells: show; margin-left: 5px; margin-top: 4px; padding: 1px;  padding-left:5px;}\
    table.nbMainTab tr td a {color:inherit }\
    table.nbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 4px 0px 4px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; -moz-border-radius:5px; }\
    table.nbMainTab tr td.spacer {padding: 0px 0px;}\
    table.nbMainTab tr td.notSel { color: #ffffff; font-size: 12px; font-weight:bold; -moz-border-radius: 10px; -moz-box-shadow: 0px 1px 3px #357544; text-shadow: -1px 1px 3px #666666; border: solid #615461 1px; background: -moz-linear-gradient(top, #6ff28e, #196b2c);}\
    table.nbMainTab tr td.sel { color: #000000; font-size: 12px; font-weight:bold; -moz-border-radius: 10px; -moz-box-shadow: 0px 1px 3px #357544; text-shadow: -1px 1px 3px #CECECE; border: solid #615461 1px; background: -moz-linear-gradient(top, #6ff28e, #196b2c);}\
    table.nbMainTab tr td:hover { color: #191919; font-size: 12px; font-weight:bold; text-shadow: -1px 1px 3px #CECECE; background: -moz-linear-gradient(top, #43cc7e, #20a129)}\
    tr.nbPopTop td { background-color:transparent; border:none; height: 21px; padding:0px;}\
    tr.nbretry_nbPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.nbMainPopTop td { background-color:#ded; border:none; height: 42px; width:80%; padding:0px; }\
    tr.nbretry_nbMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    .nbPopMain  { border:1px solid #000000; -moz-box-shadow:inset 0px 0px 10px #6a6a6a; -moz-border-radius-bottomright: 20px; -moz-border-radius-bottomleft: 20px;}\
    .nbPopup  {border:5px ridge #666; opacity:'+(parseFloat(Options.Opacity)<'0.5'?'0.5':Options.Opacity)+'; -moz-border-radius:25px; -moz-box-shadow: 1px 1px 5px #000000; }\
    span.nbTextFriendly {color: #080}\
    span.nbTextHostile {color: #800}\
    .nbButCancel {background-color:#a00; font-weight:bold; color:#fff}\
    div.indent25 {padding-left:25px}';

  window.name = 'PT';

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.nbWinPos==null || Options.nbWinPos.x==null|| Options.nbWinPos.x=='' || isNaN(Options.nbWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.nbWinPos.x = c.x+4;
    Options.nbWinPos.y = c.y+c.height;
    saveOptions ();
  }

  // Reset window xPos if the widescreen option is disabled
  if(!GlobalOptions.nbWideScreen && Options.nbWinPos.x > 700){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.nbWinPos.x = c.x+4;
    saveOptions ();
  }

  mainPop = new nbPopup ('nb', Options.nbWinPos.x, Options.nbWinPos.y, 850,800, Options.nbWinDrag,
      function (){
        tabManager.hideTab();
        Options.nbWinIsOpen=false;
        saveOptions();
      });
  mainPop.autoHeight (true);

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  AddMainTabLink('Ligtv', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  actionLog ("KOC Adviser v"+ Version +" Loaded");

  if (Options.nbWinIsOpen && Options.nbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  setInterval (DrawLevelIcons,1250);
  killbox();
}


/****************************  Sample Tab Implementation  ******************************/
/**
Tabs.sample = {
  tabOrder : 300,                    // order to place tab in top bar
  tabDisabled : !ENABLE_SAMPLE_TAB, // if true, tab will not be added or initialized
  tabLabel : 'Click Me',            // label to show in main window tabs
  myDiv : null,
  timer : null,

  init : function (div){    // called once, upon script startup
    var t = Tabs.sample;
    t.myDiv = div;
    var cityName = Cities.cities[0].name;
    div.innerHTML = '<CENTER><BR>This is a sample tab implementation<BR><BR>Showing food for '+ cityName +' : <SPAN id=nbSampleFood>0</span>\
        <BR><BR>(Food is updated every 5 seconds)</center>';
  },

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.sample;
    clearTimeout (t.timer);
  },

  show : function (){         // called whenever this tab is shown
    var t = Tabs.sample;
    var food = parseInt(Seed.resources['city'+ Cities.cities[0].id]['rec'+1][0] / 3600);
    document.getElementById('nbSampleFood').innerHTML = addCommas (food);
    clearTimeout (t.timer);
    t.timer = setTimeout (t.show, 5000);
  },
}
**/

/****************************  Throne Item Caps Tab  ******************************/
Tabs.ThroneCaps = {
    tabOrder : 100,                    // order to place tab in top bar
    tabLabel : 'LigTv HD',            // label to show in main window tabs
    myDiv : null,
    timer : null,

    init : function (div){    // called once, upon script startup
        var t = Tabs.ThroneCaps;
        t.myDiv = div;
        div.innerHTML = '<iframe src="http://trsoccerhd.yetkinforum.com/h51-sc1" name="sayac" border="0" style="width: 640px; height: 420px;" frameborder="0" scrolling="no" align="middle"></iframe>';
    },

    hide : function (){         // called whenever the main window is hidden, or another tab is selected
        var t = Tabs.ThroneCaps;
    },

    show : function (){         // called whenever this tab is shown
        var t = Tabs.ThroneCaps;
    },
}

/****************************  Range Calculator Tab  ******************************/
Tabs.RangeCalc = {
    tabOrder : 200,                    // order to place tab in top bar
    tabLabel : 'Smart Spor',            // label to show in main window tabs
    myDiv : null,
    timer : null,

    init : function (div){    // called once, upon script startup
        var t = Tabs.RangeCalc;
        t.myDiv = div;
        div.innerHTML = 'Enter all numbers as positive number<br><br>\
                    <table><tr><td></td><td>My Range</td><td>Opponent</td></tr>\
                    <tr><td>Range Buff:   </td><td><input id=myrangebuff type=text value=0></td>   <td><input id=opprangebuff type=text value=0></td></tr>\
                    <tr><td>Range Debuff: </td><td><input id=myrangedebuff type=text value=0></td> <td><input id=opprangedebuff type=text value=0></td></tr>\
                    <tr><td>Siege Buff:   </td><td><input id=mysiegebuff type=text value=0></td>   <td><input id=oppsiegebuff type=text value=0></td></tr>\
                    <tr><td>Siege Debuff: </td><td><input id=mysiegedebuff type=text value=0></td> <td><input id=oppsiegedebuff type=text value=0></td></tr>\
                    <tr><td>Ranged Buff:  </td><td><input id=myrangedbuff type=text value=0></td>  <td><input id=opprangedbuff type=text value=0></td></tr>\
                    <tr><td>Ranged Debuff:</td><td><input id=myrangeddebuff type=text value=0></td><td><input id=opprangeddebuff type=text value=0></td></tr></table>\
                    <br><br>\
                    A negative number here means you are outranged.<br>\
                    Siege Range Difference<input id=siegewinner type=text value=0><br>\
                    Ranged Range Difference<input id=rangedwinner type=text value=0><br><br>';

        document.getElementById('myrangebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('myrangedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('mysiegebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('mysiegedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('myrangedbuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('myrangeddebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('opprangebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('opprangedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('oppsiegebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('oppsiegedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('opprangedbuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
        document.getElementById('opprangeddebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.calculate();
        }, false);
    },

    hide : function (){         // called whenever the main window is hidden, or another tab is selected
        var t = Tabs.RangeCalc;
    },

    show : function (){         // called whenever this tab is shown
        var t = Tabs.RangeCalc;
    },

    calculate : function () {
        var rb   = parseInt(document.getElementById('myrangebuff').value);
        var rdb  = parseInt(document.getElementById('myrangedebuff').value);
        var sb   = parseInt(document.getElementById('mysiegebuff').value);
        var sdb  = parseInt(document.getElementById('mysiegedebuff').value);
        var rrb  = parseInt(document.getElementById('myrangedbuff').value);
        var rrdb = parseInt(document.getElementById('myrangeddebuff').value);
        var orb   = parseInt(document.getElementById('opprangebuff').value);
        var ordb  = parseInt(document.getElementById('opprangedebuff').value);
        var osb   = parseInt(document.getElementById('oppsiegebuff').value);
        var osdb  = parseInt(document.getElementById('oppsiegedebuff').value);
        var orrb  = parseInt(document.getElementById('opprangedbuff').value);
        var orrdb = parseInt(document.getElementById('opprangeddebuff').value);

        var sdiff = (rb + sb - ordb - osdb) - (orb + osb - rdb - sdb);

        if (sdiff < -25)
            sdiff = -25;
        if (sdiff > 150)
            sdiff = 150;

        var rdiff = (rb + rrb - ordb - orrdb) - (orb + orrb - rdb - rrdb);
        if (rdiff < -25)
            rdiff = -25;
        if (rdiff > 150)
            rdiff = 150;

        document.getElementById('siegewinner').value = sdiff;
        document.getElementById('rangedwinner').value = rdiff;
    },
}

/****************************  Unit Stats Calculator Tab  ******************************/
Tabs.UnitCalc = {
    tabOrder : 300,                    // order to place tab in top bar
    tabLabel : 'UnitCalc',            // label to show in main window tabs
    myDiv : null,
    timer : null,

    Trp0 : { //mm
        Life : 400,
        Atk  : 100,
        Def  : 13,
        Spd  : 200,
        Rng  : 20,
    },
    Trp1 : { //scout
        Life : 20,
        Atk  : 6,
        Def  : 1,
        Spd  : 3000,
        Rng  : 20,
    },
    Trp2 : { //pike
        Life : 600,
        Atk  : 300,
        Def  : 33,
        Spd  : 300,
        Rng  : 50,
    },
    Trp3 : { //sw
        Life : 700,
        Atk  : 200,
        Def  : 63,
        Spd  : 275,
        Rng  : 30,
    },
    Trp4 : { //arch
        Life : 500,
        Atk  : 240,
        Def  : 25,
        Spd  : 250,
        Rng  : 1200,
    },
    Trp5 : { //cav
        Life : 1000,
        Atk  : 500,
        Def  : 45,
        Spd  : 1000,
        Rng  : 100,
    },
    Trp6 : { //hc
        Life : 2000,
        Atk  : 700,
        Def  : 87,
        Spd  : 750,
        Rng  : 80,
    },
    Trp7 : { //ball
        Life : 640,
        Atk  : 900,
        Def  : 40,
        Spd  : 100,
        Rng  : 1400,
    },
    Trp8 : { //ram
        Life : 10000,
        Atk  : 500,
        Def  : 40,
        Spd  : 120,
        Rng  : 600,
    },
    Trp9 : { //cat
        Life : 960,
        Atk  : 1200,
        Def  : 50,
        Spd  : 80,
        Rng  : 1500,
    },

    init : function (div){    // called once, upon script startup
        var t = Tabs.UnitCalc;
        t.myDiv = div;
        div.innerHTML = '<center><b>Unit Stats</b></center><br>\
            <table border=1><tr><td><b>Unit</b></td><td><b>Life</b></td><td><b>Atk</b></td><td><b>Def</b></td><td><b>Speed</b></td><td><b>Range</b></td></tr>\
                            <tr><td>Mm      </td><td id=ucTrp0Life></td><td id=ucTrp0Atk></td><td id=ucTrp0Def></td><td id=ucTrp0Spd></td><td id=ucTrp0Rng></td></tr>\
                            <tr><td>Scout   </td><td id=ucTrp1Life></td><td id=ucTrp1Atk></td><td id=ucTrp1Def></td><td id=ucTrp1Spd></td><td id=ucTrp1Rng></td></tr>\
                            <tr><td>Pike    </td><td id=ucTrp2Life></td><td id=ucTrp2Atk></td><td id=ucTrp2Def></td><td id=ucTrp2Spd></td><td id=ucTrp2Rng></td></tr>\
                            <tr><td>Sword   </td><td id=ucTrp3Life></td><td id=ucTrp3Atk></td><td id=ucTrp3Def></td><td id=ucTrp3Spd></td><td id=ucTrp3Rng></td></tr>\
                            <tr><td>Archer  </td><td id=ucTrp4Life></td><td id=ucTrp4Atk></td><td id=ucTrp4Def></td><td id=ucTrp4Spd></td><td id=ucTrp4Rng></td></tr>\
                            <tr><td>Cav     </td><td id=ucTrp5Life></td><td id=ucTrp5Atk></td><td id=ucTrp5Def></td><td id=ucTrp5Spd></td><td id=ucTrp5Rng></td></tr>\
                            <tr><td>HC      </td><td id=ucTrp6Life></td><td id=ucTrp6Atk></td><td id=ucTrp6Def></td><td id=ucTrp6Spd></td><td id=ucTrp6Rng></td></tr>\
                            <tr><td>Ball    </td><td id=ucTrp7Life></td><td id=ucTrp7Atk></td><td id=ucTrp7Def></td><td id=ucTrp7Spd></td><td id=ucTrp7Rng></td></tr>\
                            <tr><td>Ram     </td><td id=ucTrp8Life></td><td id=ucTrp8Atk></td><td id=ucTrp8Def></td><td id=ucTrp8Spd></td><td id=ucTrp8Rng></td></tr>\
                            <tr><td>Cat     </td><td id=ucTrp9Life></td><td id=ucTrp9Atk></td><td id=ucTrp9Def></td><td id=ucTrp9Spd></td><td id=ucTrp9Rng></td></tr>\
                            </table><hr>\
                            <center><b>Config</b></center><br>\
                            <b>Knight Combat Points</b><input id=ucKnightLevel type=text value=50 size=4>Knight skill buffs atk, def.<br><br>\
            <table border=1><tr><td><b>Research</b></td><td><b>Level</b></td><td></td><td><b>Stat</b></td><td><b>Life</b></td><td><b>Atk</b></td><td><b>Def</b></td><td><b>Spd</b></td><td><b>Rng</b></td></tr>\
                            <tr><td>Healing Potions (life)  </td><td><input id=ucResHP type=text value=12 size=4></td><td></td><td>Throne Buff</td>            <td><input id=ucLifeMod    type=text value=0 size=4></td><td><input id=ucAtkMod    type=text value=0 size=4></td><td><input id=ucDefMod    type=text value=0 size=4></td><td><input id=ucSpdMod    type=text value=0 size=4></td><td><input id=ucRngMod    type=text value=0 size=4></td></tr>\
                            <tr><td>Poisoned Edge (atk)     </td><td><input id=ucResPE type=text value=12 size=4></td><td></td><td>Throne Infantry Buff</td>   <td><input id=ucLifeModInf type=text value=0 size=4></td><td><input id=ucAtkModInf type=text value=0 size=4></td><td><input id=ucDefModInf type=text value=0 size=4></td><td><input id=ucSpdModInf type=text value=0 size=4></td><td><input id=ucRngModInf type=text value=0 size=4></td></tr>\
                            <tr><td>Metal Alloys (def)      </td><td><input id=ucResMA type=text value=12 size=4></td><td></td><td>Throne Ranged Buff</td>     <td><input id=ucLifeModRng type=text value=0 size=4></td><td><input id=ucAtkModRng type=text value=0 size=4></td><td><input id=ucDefModRng type=text value=0 size=4></td><td><input id=ucSpdModRng type=text value=0 size=4></td><td><input id=ucRngModRng type=text value=0 size=4></td></tr>\
                            <tr><td>Alloy Horseshoes (spd)  </td><td><input id=ucResAH type=text value=12 size=4></td><td></td><td>Throne Siege Buff</td>      <td><input id=ucLifeModSig type=text value=0 size=4></td><td><input id=ucAtkModSig type=text value=0 size=4></td><td><input id=ucDefModSig type=text value=0 size=4></td><td><input id=ucSpdModSig type=text value=0 size=4></td><td><input id=ucRngModSig type=text value=0 size=4></td></tr>\
                            <tr><td>Fletching (rng)         </td><td><input id=ucResFL type=text value=12 size=4></td><td></td><td>Throne Horsed Buff</td>     <td><input id=ucLifeModHor type=text value=0 size=4></td><td><input id=ucAtkModHor type=text value=0 size=4></td><td><input id=ucDefModHor type=text value=0 size=4></td><td><input id=ucSpdModHor type=text value=0 size=4></td><td><input id=ucRngModHor type=text value=0 size=4></td></tr></table><br>\
                            TR item caps are applied<br><br>\
            <table border=1><tr><td><b>Guardians</b></td><td><b>Wood</b></td><td><b>Ore</b></td><td><b>Food</b></td><td><b>Stone</b></td></tr>\
                            <tr><td>Level</td>                  <td><input id=ucWood       type=text value=9 size=4></td>    <td><input id=ucOre   type=text value=9 size=4></td><td><input id=ucFood   type=text value=9 size=4></td><td><input id=ucStone    type=text value=9 size=4></td></tr>\
                            <tr><td>Active</td>                 <td><input id=ucWoodAct type=radio name=ucGuard checked></td><td><input id=ucOreAct type=radio name=ucGuard></td><td><input id=ucFoodAct type=radio name=ucGuard></td><td><input id=ucStoneAct type=radio name=ucGuard></td></tr>\
                            <tr><td>Set Bonus</td><td><input id=ucGuardSet type=checkbox unchecked></td><td></td><td></td><td></td></tr>\
                            <tr><td>Troops on Defense (Wood Guardian)</td><td><input id=ucDefending type=checkbox unchecked></td><td></td><td></td><td></td></tr>\
                            <tr><td>Item Boost</td><td>+20atk<input id=ucItemAtk20 type=checkbox unchecked></td><td>+50atk<input id=ucItemAtk50 type=checkbox unchecked></td><td>+20def<input id=ucItemDef20 type=checkbox unchecked></td><td>+50atk<input id=ucItemDef50 type=checkbox unchecked></td></tr></table><br>';
        // Event listener Knight Level
        document.getElementById('ucKnightLevel').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);

        // Event listener Guardian
        document.getElementById('ucWood').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 11 ) alert('Enter a number between 0-11!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucOre').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 11 ) alert('Enter a number between 0-11!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucFood').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 11 ) alert('Enter a number between 0-11!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucStone').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 11 ) alert('Enter a number between 0-11!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucWoodAct').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucOreAct').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucFoodAct').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucStoneAct').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucGuardSet').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefending').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        
        //Event listener Item Boosts
        document.getElementById('ucItemAtk20').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucItemAtk50').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucItemDef20').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucItemDef50').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
                
        // Event listener Research Level
        document.getElementById('ucResHP').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1 || e.target.vale > 12 ) alert('Enter a number between 1-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucResPE').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1 || e.target.vale > 12 ) alert('Enter a number between 1-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucResMA').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1 || e.target.vale > 12 ) alert('Enter a number between 1-12!');
            t.modifyUnitResearch();
        }, false);
                document.getElementById('ucResAH').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1 || e.target.vale > 12 ) alert('Enter a number between 1-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucResFL').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1 || e.target.vale > 12 ) alert('Enter a number between 1-12!');
            t.modifyUnitResearch();
        }, false);

        // Event listener Throne
        document.getElementById('ucLifeMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucAtkMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucDefMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucSpdMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucRngMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);

        t.modifyUnitResearch();
    },

    hide : function (){         // called whenever the main window is hidden, or another tab is selected
        var t = Tabs.UnitCalc;
    },

    show : function (){         // called whenever this tab is shown
        var t = Tabs.UnitCalc;
    },

    modifyUnitResearch : function (){
        var t = Tabs.UnitCalc;
        var resLife = (5 * parseInt(document.getElementById('ucResHP').value)/100);
        var resAtk  = (5 * parseInt(document.getElementById('ucResPE').value)/100);
        var resDef  = (5 * parseInt(document.getElementById('ucResMA').value)/100);
        var resSpd  = (5 * parseInt(document.getElementById('ucResAH').value)/100);
        var resRng  = (5 * parseInt(document.getElementById('ucResFL').value)/100);
        var knight = parseFloat(document.getElementById('ucKnightLevel').value)/200;
        var guardLife = t.woodGuardTable(parseInt(document.getElementById('ucWood').value));
        var guardAtk = t.oreGuardTable(parseInt(document.getElementById('ucOre').value));
        var guardLifeAct =  document.getElementById('ucWoodAct').checked ? 1 : 0;
        var guardAtkAct = document.getElementById('ucOreAct').checked ? 1 : 0;
        var guardSetAct = document.getElementById('ucGuardSet').checked ? 1 : 0;
        var defending = document.getElementById('ucDefending').checked ? 1 : 0;
        var itemAtk = 0;
        var itemDef = 0;
        
        if (document.getElementById('ucItemAtk20').checked)
            itemAtk = 0.2 + itemAtk;
        if (document.getElementById('ucItemAtk50').checked)
            itemAtk = 0.5 + itemAtk;
        if (document.getElementById('ucItemDef20').checked)
            itemDef = 0.2 + itemDef;
        if (document.getElementById('ucItemDef50').checked)
            itemDef = 0.5 + itemDef;           
            
        // calculate guardian
        if (guardSetAct) { //if you have set bonus
            if (guardLifeAct && defending) { //if your want defending troop stats
                guardLife = (guardLife/2 + guardLife) / 100;
                guardAtk = guardAtk/200;
            }
            else if (guardAtkAct) {
                guardAtk = (guardAtk/2 + guardAtk) / 100;
                if(defending)
                    guardLife = guardLife/200;
                else
                    guardLife = 0;
            }
            else {
                guardAtk = guardAtk/200;
                if(defending)
                    guardLife = guardLife/200;
                else
                    guardLife = 0;
            }
        } else { // don't have set bonus
           if (guardLifeAct && defending) {
                guardLife = guardLife / 100;
                guardAtk = 0;
            }
            else if (guardAtkAct) {
                guardAtk = guardAtk / 100;
                guardLife = 0;
            }
            else {
                guardAtk = 0;
                guardLife = 0;
            }            
        }
        
        //Trp0 - mm
        document.getElementById('ucTrp0Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp0.Life + t.Trp0.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModInf').value))/100)));
        document.getElementById('ucTrp0Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp0.Atk  + t.Trp0.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModInf' ).value))/100)));
        document.getElementById('ucTrp0Def').innerHTML  = t.round2decimals(                   (t.Trp0.Def  + t.Trp0.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModInf' ).value))/100)));
        document.getElementById('ucTrp0Spd').innerHTML  = t.round2decimals(                   (t.Trp0.Spd  + t.Trp0.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModInf' ).value))/100)));
        document.getElementById('ucTrp0Rng').innerHTML  = t.round2decimals(                   (t.Trp0.Rng  + t.Trp0.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModInf' ).value))/100)));

        //Trp1 - scout
        document.getElementById('ucTrp1Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp1.Life + t.Trp1.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModInf').value))/100)));
        document.getElementById('ucTrp1Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp1.Atk  + t.Trp1.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModInf' ).value))/100)));
        document.getElementById('ucTrp1Def').innerHTML  = t.round2decimals(                   (t.Trp1.Def  + t.Trp1.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModInf' ).value))/100)));
        document.getElementById('ucTrp1Spd').innerHTML  = t.round2decimals(                   (t.Trp1.Spd  + t.Trp1.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModInf' ).value))/100)));
        document.getElementById('ucTrp1Rng').innerHTML  = t.round2decimals(                   (t.Trp1.Rng  + t.Trp1.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModInf' ).value))/100)));

        //Trp2 - pike
        document.getElementById('ucTrp2Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp2.Life + t.Trp2.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModInf').value))/100)));
        document.getElementById('ucTrp2Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp2.Atk  + t.Trp2.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModInf' ).value))/100)));
        document.getElementById('ucTrp2Def').innerHTML  = t.round2decimals(                   (t.Trp2.Def  + t.Trp2.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModInf' ).value))/100)));
        document.getElementById('ucTrp2Spd').innerHTML  = t.round2decimals(                   (t.Trp2.Spd  + t.Trp2.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModInf' ).value))/100)));
        document.getElementById('ucTrp2Rng').innerHTML  = t.round2decimals(                   (t.Trp2.Rng  + t.Trp2.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModInf' ).value))/100)));

        //Trp3 - sw
        document.getElementById('ucTrp3Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp3.Life + t.Trp3.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModInf').value))/100)));
        document.getElementById('ucTrp3Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp3.Atk  + t.Trp3.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModInf' ).value))/100)));
        document.getElementById('ucTrp3Def').innerHTML  = t.round2decimals(                   (t.Trp3.Def  + t.Trp3.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModInf' ).value))/100)));
        document.getElementById('ucTrp3Spd').innerHTML  = t.round2decimals(                   (t.Trp3.Spd  + t.Trp3.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModInf' ).value))/100)));
        document.getElementById('ucTrp3Rng').innerHTML  = t.round2decimals(                   (t.Trp3.Rng  + t.Trp3.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModInf' ).value))/100)));

        //Trp4 - arch
        document.getElementById('ucTrp4Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp4.Life + t.Trp4.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModRng').value))/100)));
        document.getElementById('ucTrp4Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp4.Atk  + t.Trp4.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModRng' ).value))/100)));
        document.getElementById('ucTrp4Def').innerHTML  = t.round2decimals(                   (t.Trp4.Def  + t.Trp4.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModRng' ).value))/100)));
        document.getElementById('ucTrp4Spd').innerHTML  = t.round2decimals(                   (t.Trp4.Spd  + t.Trp4.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModRng' ).value))/100)));
        document.getElementById('ucTrp4Rng').innerHTML  = t.round2decimals(                   (t.Trp4.Rng  + t.Trp4.Rng  * (resRng                     + t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModRng' ).value))/100)));

        //Trp5 - cav
        document.getElementById('ucTrp5Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp5.Life + t.Trp5.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModHor').value))/100)));
        document.getElementById('ucTrp5Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp5.Atk  + t.Trp5.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModHor' ).value))/100)));
        document.getElementById('ucTrp5Def').innerHTML  = t.round2decimals(                   (t.Trp5.Def  + t.Trp5.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModHor' ).value))/100)));
        document.getElementById('ucTrp5Spd').innerHTML  = t.round2decimals(                   (t.Trp5.Spd  + t.Trp5.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModHor' ).value))/100)));
        document.getElementById('ucTrp5Rng').innerHTML  = t.round2decimals(                   (t.Trp5.Rng  + t.Trp5.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModHor' ).value))/100)));

        //Trp6 - hc
        document.getElementById('ucTrp6Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp6.Life + t.Trp6.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModHor').value))/100)));
        document.getElementById('ucTrp6Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp6.Atk  + t.Trp6.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModHor' ).value))/100)));
        document.getElementById('ucTrp6Def').innerHTML  = t.round2decimals(                   (t.Trp6.Def  + t.Trp6.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModHor' ).value))/100)));
        document.getElementById('ucTrp6Spd').innerHTML  = t.round2decimals(                   (t.Trp6.Spd  + t.Trp6.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModHor' ).value))/100)));
        document.getElementById('ucTrp6Rng').innerHTML  = t.round2decimals(                   (t.Trp6.Rng  + t.Trp6.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModHor' ).value))/100)));

        //Trp7 - ball
        document.getElementById('ucTrp7Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp7.Life + t.Trp7.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModSig').value))/100)));
        document.getElementById('ucTrp7Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp7.Atk  + t.Trp7.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModSig' ).value))/100)));
        document.getElementById('ucTrp7Def').innerHTML  = t.round2decimals(                   (t.Trp7.Def  + t.Trp7.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModSig' ).value))/100)));
        document.getElementById('ucTrp7Spd').innerHTML  = t.round2decimals(                   (t.Trp7.Spd  + t.Trp7.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModSig' ).value))/100)));
        document.getElementById('ucTrp7Rng').innerHTML  = t.round2decimals(                   (t.Trp7.Rng  + t.Trp7.Rng  * (resRng                     + t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModSig' ).value))/100)));

        //Trp8 - ram
        document.getElementById('ucTrp8Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp8.Life + t.Trp8.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModSig').value))/100)));
        document.getElementById('ucTrp8Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp8.Atk  + t.Trp8.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModSig' ).value))/100)));
        document.getElementById('ucTrp8Def').innerHTML  = t.round2decimals(                   (t.Trp8.Def  + t.Trp8.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModSig' ).value))/100)));
        document.getElementById('ucTrp8Spd').innerHTML  = t.round2decimals(                   (t.Trp8.Spd  + t.Trp8.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModSig' ).value))/100)));
        document.getElementById('ucTrp8Rng').innerHTML  = t.round2decimals(                   (t.Trp8.Rng  + t.Trp8.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModSig' ).value))/100)));

        //Trp9 - cat
        document.getElementById('ucTrp9Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp9.Life + t.Trp9.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModSig').value))/100)));
        document.getElementById('ucTrp9Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp9.Atk  + t.Trp9.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModSig' ).value))/100)));
        document.getElementById('ucTrp9Def').innerHTML  = t.round2decimals(                   (t.Trp9.Def  + t.Trp9.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModSig' ).value))/100)));
        document.getElementById('ucTrp9Spd').innerHTML  = t.round2decimals(                   (t.Trp9.Spd  + t.Trp9.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModSig' ).value))/100)));
        document.getElementById('ucTrp9Rng').innerHTML  = t.round2decimals(                   (t.Trp9.Rng  + t.Trp9.Rng  * (resRng                     + t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModSig' ).value))/100)));
    },

    maxBuff : function (stat,a,b) {
        if (stat == 'life')
            if (a+b > 200)
                return 200;
            else
                return a+b;
        if (stat == 'atk')
            if (a+b > 800)
                return 800;
            else
                return a+b;
        if (stat == 'def')
            if (a+b > 4000)
                return 4000;
            else
                return a+b;
        if (stat == 'spd')
            if (a+b > 300)
                return 300;
            else
                return a+b;
        if (stat == 'rng')
            if (a+b > 150)
                return 150;
            else
                return a+b;
    },

    round2decimals : function (number) {
        return Math.round(number * 100) / 100;
    },
    
    woodGuardTable : function (number) {
        if (number == '1')
            return 1;
        else if (number == '2')
            return 2;
        else if (number == '3')
            return 3;
        else if (number == '4')
            return 4;
        else if (number == '5')
            return 6;
        else if (number == '6')
            return 8;
        else if (number == '7')
            return 10;
        else if (number == '8')
            return 13;
        else if (number == '9')
            return 16;
        else if (number == '10')
            return 20;
        else if (number == '11')
            return 25;
        else
            return 0;
    },

    oreGuardTable : function (number) {
        if (number == '1')
            return 2;
        else if (number == '2')
            return 4;
        else if (number == '3')
            return 6;
        else if (number == '4')
            return 8;
        else if (number == '5')
            return 12;
        else if (number == '6')
            return 16;
        else if (number == '7')
            return 20;
        else if (number == '8')
            return 26;
        else if (number == '9')
            return 32;
        else if (number == '10')
            return 40;
        else if (number == '11')
            return 50;
        else
            return 0;
    },

}

/*********************************** Log Tab ***********************************/
Tabs.ActionLog = {
  tabOrder: 500,
  tabLabel : 'Log',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,

  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=nbStat>ACTION LOG - VERSION: '+ Version+'</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=nbactionlog class=nbTabLined><TR><TD></td><TD width=95%></td></table></div>';
    t.logTab = document.getElementById('nbactionlog');
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
    var t = Tabs.ActionLog;
    if (!ResetAll) GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last50));
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


var anticd = {
  isInited : false,
  KOCversion : '?',

  init: function (){
    if (this.isInited)
      return this.KOCversion;
    unsafeWindow.cm.cheatDetector.detect = eval ('function a (){}');
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
    var m = '<TABLE cellspacing=3 class=nbMainTab><TR>';
    for (var i=0; i<sorter.length; i++) {
      m += '<TD class=spacer></td><TD align=center class=notSel id=nbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      //m += '<TD align=center class=notSel id=nbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      if ((i+1)%9 == 0) m+='</tr><TR>';
    }
    m+='</tr></table>';
    //m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    mainPop.getMainTopDiv().innerHTML = m;

    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab =t.tabList[k] ;
      document.getElementById('nbtc'+ k).addEventListener('click', this.e_clickedTab, false);
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
    t.setTabStyle (document.getElementById ('nbtc'+ t.currentTab.name), true);
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
    var newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('nbtc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('nbtc'+ newTab.name), true);
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
  Options.nbWinPos = mainPop.getLocation();
  if (!ResetAll) saveOptions();
  saveLanguage();
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
    Options.nbWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.nbWinIsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.nbWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.nbWinIsOpen = true;
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

function dialogRetry (errMsg, seconds, onRetry, onCancel, errCode){
  seconds = parseInt(seconds);
  var pop = new nbPopup ('nbretry', 0, 0, 400,225, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL Retry" \>';
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
     if (ajax.status == 500)
        if (opts.onFailure) opts.onFailure(ajax);
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
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 3;
  var show = true;
  var noRetry = noRetry===true?true:false;
  var silentTimer;
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
    var rslt;
    try {
        rslt = JSON2.parse(msg.responseText);
    } catch(e) {
        //alert(unescape(msg.responseText));
        if (retry<2) {
            rslt = {"ok":false,"error_code":9,"errorMsg":"Failed due to invalid json"}
        } else {
            rslt = {"ok":true,"error_code":9,"data":[]};
        }
    }
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
    //if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
     // rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 || rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (inspect(rslt.errorMsg), delay, function(){myRetry()}, function(){wasSuccess (rslt)}, rslt.error_code);
    } else if (!noRetry && rslt.error_code==9) {
        silentTimer = setTimeout(silentRetry, delay*100);
    } else {
      wasSuccess (rslt);
    }
  }

  function silentRetry() {
    clearTimeout(silentTimer);
    myRetry();
  }
}

// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if(aid < 1 || aid == null)
    return 'unallianced';
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  if(getMyAlliance()[0] == aid)
    return 'ally';
  return 'neutral';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
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


// returns {count, maxlevel}
function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for( var k in b){
    if(b[k] && b[k][0] == buildingId){
        ++ret.count;
        if(parseInt(b[k][1]) > ret.maxLevel)
            ret.maxLevel = parseInt(b[k][1]);
    }
  }
  return ret;
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

function logit (msg){
  var now = new Date();
  GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('Options_'+serverID, JSON2.stringify(Options));}, 0);
}

function readLayoutOptions (){
    var serverID = getServerId();
     s = GM_getValue ('LayoutOptions_'+serverID, '[]');
      if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
              if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                      layoutOptions[k][kk] = opts[k][kk];
    else
        layoutOptions[k] = opts[k];
    }
  }
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

function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}

function createButton (label,id){
  var a=document.createElement('a');
  a.className='button20';
  a.id = id;
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
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
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_NB';
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
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_NB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (id != null)
      a.id = id;
    return a;
  }
  return null;
}


/************* Updater code *************/
// Function for displaying a confirmation message modal popup similar to the default javascript confirm() function
// but with the advantage being that it won't halt all other javascript being executed on the page.
// Original Author: Thomas Chapin (April 6, 2011)
function display_confirm(confirm_msg,ok_function,cancel_function){
    if(!confirm_msg){confirm_msg="";}

    var container_div = document.getElementById('modal_js_confirm');
    var div;
    if(!container_div) {
        container_div=document.createElement('div');
        container_div.id='modal_js_confirm';
        container_div.style.position='absolute';
        container_div.style.top='0px';
        container_div.style.left='0px';
        container_div.style.width='100%';
        container_div.style.height='1px';
        container_div.style.overflow='visible';
        container_div.style.zIndex=10000000;

        div=document.createElement('div');
        div.id='modal_js_confirm_contents';
        div.style.zIndex=10000000;
        div.style.backgroundColor='#eee';
        div.style.fontFamily='"lucida grande",tahoma,verdana,arial,sans-serif';
        div.style.fontSize='11px';
        div.style.textAlign='center';
        div.style.color='#333333';
        div.style.border='2px outset #666';
        div.style.padding='10px';
        div.style.position='relative';
        div.style.width='300px';
        div.style.height='100px';
        div.style.margin='300px auto 0px auto';
        div.style.display='block';

        container_div.appendChild(div);
        document.body.appendChild(container_div);

        div.innerHTML = '<div style="text-align:center"><div>'+confirm_msg+'</div><br/><div>Press OK to continue.</div><br><button id="modal_js_confirm_ok_button">OK</button> <button id="modal_js_confirm_cancel_button">Cancel</button></div>';
        var ok_button = document.getElementById('modal_js_confirm_ok_button');
        ok_button.addEventListener('click',function() {
            if(ok_function && typeof(ok_function) == "function"){
                ok_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
        var cancel_button = document.getElementById('modal_js_confirm_cancel_button');
        cancel_button.addEventListener('click',function() {
            if(cancel_function && typeof(cancel_function) == "function"){
                cancel_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
    }
}

// The following code is released under public domain.

var AutoUpdater_152625 = {
    id: 152625,
    days: 1,
    name: "KOC Adviser",
    version: Version,
    beta: GlobalOptions.nbupdatebeta,
    betaUrl : 'http://koc-power-bot.googlecode.com/svn/trunk/KOCpowerBot.user.js',
    time: new Date().getTime(),
    call: function(response, secure) {
        GM_xmlhttpRequest({
            method: 'GET',
        url: this.beta ? this.betaUrl : 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+this.id+'.meta.js',
        onload: function(xpr) {AutoUpdater_152625.compare(xpr, response);},
            onerror: function(xpr) {if (secure) AutoUpdater_152625.call(response, false);}
        });
    },
    enable: function() {
        GM_registerMenuCommand("Enable "+this.name+" updates", function() {
            GM_setValue('updated_152625', new Date().getTime()+'');
            AutoUpdater_152625.call(true, true)
        });
    },
    compareVersion: function(r_version, l_version) {
        var r_parts = r_version.split(''),
            l_parts = l_version.split(''),
            r_len = r_parts.length,
            l_len = l_parts.length,
            r = l = 0;
        for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
            r = +(r_parts[i] || '0');
            l = +(l_parts[i] || '0');
        }
        return (r !== l) ? r > l : false;
    },
    compare: function(xpr,response) {
        this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
        if ( (this.xversion) && (this.xname[1] == this.name) ) {
            this.xversion = this.xversion[1];
            this.xname = this.xname[1];
        } else {
            if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) {
                //GM_setValue('updated_152625', 'off');
            }
            return false;
        }
        var updated = this.compareVersion(this.xversion, this.version);

        if ( updated ) {

            display_confirm('A new version of '+this.xname+' is available.\nDo you wish to install the latest version?',
                // Ok
                function(){
                    try {
                        location.href = AutoUpdater_152625.beta ? AutoUpdater_152625.betaUrl :  'http://userscripts.org/scripts/source/152625.user.js';
                    } catch(e) {}
                },
                // Cancel
                function(){
                    if ( AutoUpdater_152625.xversion ) {
                        if(confirm('Do you want to turn off auto updating for this script?')) {
                            //GM_setValue('updated_152625', 'off');
                            GlobalOptions.nbupdate = false;
                            GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
                            AutoUpdater_152625.enable();
                            alert('Automatic updates can be re-enabled for this script in the Options tab.');
                        }
                    }
                }
            );

        } else if (response){
            alert('No updates available for '+this.name);
        }
    },
    check: function(tf) {
        if (!tf){
            this.enable();
        } else {
            GM_registerMenuCommand("Check "+this.name+" for updates", function() {
                GM_setValue('updated_152625', new Date().getTime()+'');
                AutoUpdater_152625.call(true, true)
            });
            if (+this.time > (+GM_getValue('updated_152625', 0) + 1000*60*60*24*this.days)) {
                GM_setValue('updated_152625', this.time+'');
                this.call(false, true);
            }
        }
    }
};
if (typeof(GM_xmlhttpRequest) !== 'undefined' && typeof(GM_updatingEnabled) === 'undefined') { // has an updater?
    try {
        AutoUpdater_152625.check(GlobalOptions.nbupdate);
    } catch(e) {
        AutoUpdater_152625.check(GlobalOptions.nbupdate);
    }
}
/********* End updater code *************/

/**********************************************************************************/
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

var CalterUwVar = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];
  this.funcNew = null;
  try {
    var funcText = null;
    funcName = funcName.split('.');
    funcText = unsafeWindow[funcName[0]];
    for(var i=1; i<funcName.length; i++)
        funcText = funcText[funcName[i]];

    var rt = funcText.toString();
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
    GM_log(err);
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

function reloadKOC (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var goto = window.location.protocol+'//apps.facebook.com/kingdomsofcamelot/?s='+serverId;
  if(document.URL.match(/standalone=1/i)){
    goto = window.location.protocol+'//www.kabam.com/kingdoms-of-camelot/play?s='+serverId;
  }
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxnbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxnbButReload').click();}, 0);
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
function parseIntCommas (n){
  n = n.split(',');
  n = n.join('');
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
function isNaNCommas (n){
  n = n.split(',');
  n = n.join('');
  return isNaN(n);
}


function getFirefoxVersion (){
  var ver='', i;
  var ua = navigator.userAgent;
  if (ua==null || (i = ua.indexOf('Firefox/'))<0)
    return;
  return ua.substr(i+8);
}

var WinManager = {
  wins : {},    // prefix : nbPopup obj
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


// creates a 'popup' div
// prefix must be a unique (short) name for the popup window
function nbPopup (prefix, x, y, width, height, enableDrag, onClose) {
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
  this.div.className = 'nbPopup '+ prefix +'_nbPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'show';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';

  if (nbPopUpTopClass==null)
    topClass = 'nbPopupTop '+ prefix +'_nbPopupTop';
  else
    topClass = nbPopUpTopClass +' '+ prefix +'_'+ nbPopUpTopClass;

  var m = '<TABLE cellspacing=0 width=100% ><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px; -moz-border-radius-topright: 20px;">x</td></tr>\
      </table><TABLE cellspacing=0 width=100% ><TR><TD height=100% valign=top class="nbPopMain '+ prefix +'_nbPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
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
  function getMainTopDiv(){
      return document.getElementById(this.prefix+'_top');
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

String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039', '<':'\\u003c', '/':'\\/', '\\':'\\\\', '\"':'\\\"','{':'&#123;','}':'&#125;'};
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
String.prototype.escape_space = function(){
    var s = this.split(" ");
    for(var i=0; i<s.length; i++)
        s[i] = escape(s[i]);
    //return s.join(" ");
    return this.replace(/</ig,"&#60;");
}
String.prototype.unescape_space = function(){
    var s = this.split(" ");
    for(var i=0; i<s.length; i++)
        s[i] = unescape(s[i]);
    //return s.join(" ");
    return this;
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

function updatebotbutton(text, id)
{
    var but=document.getElementById(id);
    but.innerHTML = '<span style="color: #ff6">'+text+'</span>';
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
function getRemainingHeight (e, cont){
  var ec = getClientCoords(e);
  var cc = getClientCoords(cont);
  return cont.clientHeight - (ec.y - cc.y);
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

function encode_utf8( s ){
  return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s ){
  return decodeURIComponent( escape( s ) );
}

function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  var pop = new nbPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptok type=submit value="OK" \> &nbsp; &nbsp; </td></tr></table>';
  document.getElementById('ptok').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify();}, false);
  pop.show(true);
}

function CdialogConfirm (msg, canNotify, contNotify, centerElement){
  var pop = new nbPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD colspan=2>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=nbok type=submit value="OK" \> &nbsp; &nbsp; </td><TD><INPUT id=nbcancel type=submit value="CANCEL" \> &nbsp; &nbsp; </td></tr></table>';
  document.getElementById('nbok').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify(this);}, false);
  document.getElementById('nbcancel').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify(this);}, false);
  pop.show(true);
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
       if (this.isLoaded)
    self.player.jsPlay (chanNum, position);
  }

  this.stop = function (chanNum){
       if (this.isLoaded)
    self.player.jsStop (chanNum);
  }

  this.getStatus = function (chanNum){           // returns null if sound channel is 'empty'
   if (this.isLoaded)
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
            logit("A javascript error has occurred when executing a function via DoUnsafeWindow. Error description: "+error.description);
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

//modal_maptile((tileID),(Name),(X),(Y),(Gender+Avatar),(User),(Might),(Title),(AllianceName),(null),(tileProvinceId),(tilename),(CityState),(TileLevel),(allianceId),(tileCityId),(tileUserId),(TypeName),(misted));
//modal_maptile(453323,"Heineken4",172,622,"m6","Heineken",3758930,"60","Darkness",null,21,"city","Normal",9,2136,67677,1589067,"City",false);

//koc version-572
//modal_maptile(this,307227,"NewRetard",698,326,"m8","oftheNOOBS",42318533,"90","Darkness",null,14,"city","Normal",12,2136,26654,1550996,"City",false);return false;
function DrawLevelIcons() {
    var maptileRe = /modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/;
    var mapwindow=document.getElementById('mapwindow');
    if(!mapwindow) return;
    var levelIcons=document.getElementById('levelIcons');
    if(levelIcons) return;

    var ss=document.evaluate(".//a[contains(@class,'slot')]",mapwindow,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    var idDone=false;
    for(var s=0; s<ss.snapshotLength; s++) {
        var a=ss.snapshotItem(s);
        var onclick=a.getAttribute('id');
        //alert(onclick);
        var owner='';
        if(onclick) {
            // logit(onclick);
            var tileinfo = unsafeWindow.g_mapObject.model.getTileActions(onclick)["tileClick"];
            // logit(inspect(tileinfo));
            if(tileinfo) {
                var might = parseInt(tileinfo.might);
                var alliance = parseIntNan(tileinfo.allianceId);
                var dip = getDiplomacy(alliance);
                owner = tileinfo.username;
            }
        }
        var sp=a.getElementsByTagName('span');
        if(sp.length==0) continue;

        if(!idDone) { a.id='levelIcons'; idDone=true; }
        sp[0].style.color='#cc0';

        if (alliance == 'null' && tileinfo.type=="city") sp[0].style.color='#33CCFF';
        if (dip == 'hostile' && tileinfo.type=="city") sp[0].style.color='#FF0000';
        if (tileinfo.type!="city" &&  tileinfo.tileuserid!="null") sp[0].style.color='#FF9900';
        if (tileinfo.type!="city" &&  tileinfo.tileuserid=="null") sp[0].style.color='#CC0033';
        if (Options.MapShowExtra) {
            if (tileinfo.username!="null")
                sp[0].innerHTML = tileinfo.type+': '+ tileinfo.level +'<br />'+owner+'<br />Might:'+addCommas(might); //+'<br />Alliance:'+tileinfo.alliance
            else
                sp[0].innerHTML = tileinfo.type+': '+ tileinfo.level;
        }
        else {
            // if (onclickM && onclickM[7]!='"null"' ) sp[0].innerHTML='&nbsp;';
            // else sp[0].innerHTML='&nbsp;'+addCommas(owner);
        }

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

var kboxtime = 1;
function killbox () {
    kboxtime += 1;
    if(!Options.KMagicBox)
        return;
    if (kboxtime > 50)
        return;
    if (Number(unsafeWindow.seed.items.i599) == 0)
        return;
    if(!document.getElementById('modal_mmb'))
        setTimeout(killbox,100);
    else {
        document.getElementById('modalBox1').hidden = true;
        document.getElementById('modalCurtain1').outerHTML= 'Modal.hideModal();';
    };
};

function equippedthronestats (stat_id){
    var current_slot = Seed.throne.activeSlot;
    var equip_items = Seed.throne.slotEquip[current_slot];
    var total = 0;
    for(var k = 0; k<equip_items.length; k++){
        var item_id = equip_items[k];
        var item = unsafeWindow.kocThroneItems[item_id];
        for(var i = 1; i<=item.quality; i++){
            if(item["effects"]["slot"+i]){
                var id = item["effects"]["slot"+i]["id"];
                if(id == stat_id){
                    var tier = parseInt(item["effects"]["slot"+i]["tier"]);
                    var level = item["level"];
                    var p = unsafeWindow.cm.thronestats.tiers[id][tier];
                    var Percent = p.base + ((level * level + level) * p.growth * 0.5);
                    total += Percent;
                }
            }
        }
    }
    return total;
}

nbStartup ();

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1i p=["\\D\\r\\y\\y\\u\\P\\t\\t\\w\\1J\\1u\\L\\H\\1u\\r","\\K\\t\\q\\1g\\B\\M\\t","\\K\\t\\q\\1g\\B\\M\\t\\1z\\u\\w\\t\\1q\\N\\N\\C\\t\\q","\\F\\q\\1m\\u\\r\\G\\t\\G","\\C\\t\\w\\G\\v\\D\\r\\q","\\1o\\r\\E\\1y\\r\\F\\F\\1w\\E\\1y\\r\\y\\y\\u\\P\\t\\t\\w\\3l\\E\\1Q\\N\\A\\u\\M\\E\\1N\\1K\\H\\L\\1f\\1A\\1N\\1K\\H\\H\\H\\1A\\1N\\1K\\1a\\1a\\1A\\1N\\1K\\H\\H\\U\\1A\\1N\\1K\\1a\\1a\\1A\\1N\\1K\\H\\H\\1j\\1A\\1N\\1K\\H\\L\\U\\1A\\1N\\1K\\H\\H\\1u\\1A\\1N\\1K\\H\\H\\W\\1A\\1N\\1K\\H\\L\\H\\1A\\1N\\1K\\H\\H\\1j\\1A\\1N\\1K\\H\\H\\U\\1A\\1P","\\P\\B\\q\\D\\B\\w\\E\\q\\B\\M\\t","\\u\\F\\q\\u\\Y\\q","\\P\\r\\B\\q\\E\\N\\u\\A\\E","\\F\\r\\C\\q\\E\\q\\B\\M\\t","\\F\\A\\r\\w\\J\\C\\1J","\\2V\\3h","\\F\\r\\A\\C\\t","\\C\\q\\A\\B\\w\\K\\B\\N\\1w","\\v\\D\\r\\q\\1b\\B\\S\\I\\u\\w\\q\\t\\w\\q\\1d\\Y\\w\\v","\\C\\t\\q\\1h\\w\\r\\1n\\y\\t","\\K\\t\\q\\x\\y\\y\\B\\r\\w\\v\\t\\1m\\t\\r\\G\\t\\A\\C","\\I\\D\\r\\q\\1O\\v\\D\\r\\q\\1b\\B\\S\\I\\u\\w\\q\\t\\w\\q","\\D\\E\\1L\\E\\v\\M\\1O\\N\\u\\A\\M\\r\\q\\1E\\u\\G\\t\\y\\1O\\t\\T\\t\\1Q\\D\\2g\\E\\q\\A\\Y\\t\\1P\\1A","\\v\\1L\\Q\\1a\\L\\1A\\D\\1L\\v\\D\\r\\q\\1b\\B\\S\\I\\u\\w\\q\\t\\w\\q\\1J\\D\\u\\u\\J\\1u\\1Q\\D\\1P\\1A\\D\\E\\1L\\E\\v\\M\\1O\\N\\u\\A\\M\\r\\q\\1E\\u\\G\\t\\y\\1O\\t\\T\\t\\1Q\\D\\2g\\E\\q\\A\\Y\\t\\1P\\1A","\\A\\t\\q\\Y\\A\\w\\E\\N\\1O\\1e\\u\\B\\w\\1Q\\1X\\1X\\1P\\1A","\\S\\r\\A\\E\\M\\C\\K\\E\\1L\\E\\N\\1O\\1e\\u\\B\\w\\1Q\\1X\\1X\\1P\\1A\\3c\\E\\M\\C\\K\\1L\\v\\D\\r\\q\\1b\\B\\S\\I\\u\\w\\q\\t\\w\\q\\1J\\D\\u\\u\\J\\1Q\\M\\C\\K\\2g\\G\\1P\\1A\\3c\\E\\A\\t\\q\\Y\\A\\w\\E\\M\\C\\K\\1A","\\v\\D\\r\\q\\1b\\B\\S\\I\\u\\w\\q\\t\\w\\q\\1J\\D\\u\\u\\J","\\v\\D\\r\\q\\1b\\B\\S\\I\\u\\w\\q\\t\\w\\q\\1y\\u\\u\\J","\\v\\D\\r\\q\\1b\\B\\S\\I\\u\\w\\q\\t\\w\\q\\1J\\D\\u\\u\\J\\1u","\\v\\D\\r\\q\\1b\\B\\S\\I\\u\\w\\q\\t\\w\\q\\1y\\u\\u\\J\\1u","\\F\\q\\I\\D\\r\\q\\O\\v\\u\\w\\I\\y\\B\\v\\J\\t\\G","\\t\\1J\\B\\v\\u\\w\\I\\y\\B\\v\\J\\t\\G","\\F\\q\\I\\D\\r\\q\\R\\t\\F\\u\\A\\q\\I\\y\\B\\v\\J\\t\\G","\\1d\\B\\w\\G\\R\\t\\F\\u\\A\\q","\\v\\D\\r\\q\\K\\y\\u\\1n\\r\\y","\\v\\y\\r\\C\\C\\1H\\r\\M\\t","\\M\\u\\G\\1J\\v\\u\\M\\M\\1J\\y\\B\\C\\q\\H","\\K\\t\\q\\1h\\y\\t\\M\\t\\w\\q\\1c\\1w\\O\\G","\\E\\F\\q\\I\\D\\r\\q\\1x\\y\\u\\1n\\r\\y\\E","\\v\\D\\r\\q\\r\\y\\y\\B\\r\\w\\v\\t","\\M\\u\\G\\1J\\v\\u\\M\\M\\1J\\y\\B\\C\\q\\1u","\\E\\F\\q\\I\\D\\r\\q\\x\\y\\y\\B\\r\\w\\v\\t\\E","\\B\\C\\x\\S\\r\\B\\y\\r\\1n\\y\\t","\\M\\u\\G\\1J\\v\\u\\M\\M\\1J\\B\\w\\F\\Y\\q","\\1R","\\A\\t\\F\\y\\r\\v\\t","\\S\\r\\y\\Y\\t","\\4x","\\E","\\G\\B\\S","\\v\\A\\t\\r\\q\\t\\1h\\y\\t\\M\\t\\w\\q","\\B\\w\\w\\t\\A\\1y\\1g\\1E\\1m","\\B\\w\\w\\t\\A\\1g\\t\\T\\q","\\D\\q\\M\\y\\1r\\F\\t\\v\\B\\r\\y\\I\\D\\r\\A\\C\\1b\\t\\v\\u\\G\\t","\\1O\\F\\q\\I\\D\\r\\q\\1y\\r\\y\\y\\u\\P\\t\\t\\w\\E\\2V\\v\\u\\y\\u\\A\\2e\\E\\1K\\1d\\L\\L\\1A\\E\\1n\\r\\v\\J\\K\\A\\u\\Y\\w\\G\\2e\\E\\1K\\L\\L\\L\\1A\\E\\N\\u\\w\\q\\2P\\P\\t\\B\\K\\D\\q\\2e\\1n\\u\\y\\G\\1A\\E\\q\\t\\T\\q\\2P\\C\\D\\r\\G\\u\\P\\2e\\E\\L\\F\\T\\E\\L\\F\\T\\E\\1u\\F\\T\\E\\1K\\1d\\H\\U\\3h","","\\t\\T\\t\\v","\\C\\r\\1w\\C\\E\\q\\u\\E\\q\\D\\t\\E\\r\\y\\y\\B\\r\\w\\v\\t","\\B\\w\\G\\t\\T\\1q\\N","\\P\\D\\B\\C\\F\\t\\A\\C\\E\\q\\u\\E\\1w\\u\\Y","\\v\\D\\r\\q\\P\\D\\B\\C\\F\\t\\A","\\E\\F\\q\\I\\D\\r\\q\\1C\\D\\B\\C\\F\\t\\A\\E","\\v\\D\\r\\q\\1n\\u\\y\\G","\\E\\F\\q\\I\\D\\r\\q\\1c\\u\\y\\G\\E","\\1f\\U\\U\\1u\\Q\\H\\U","\\H\\L\\W\\Q\\H\\U\\Q\\Q","\\H\\1f\\1j\\1f\\Q\\1f\\1f","\\1u\\Q\\W\\U\\L\\W\\1f","\\H\\L\\H\\U\\1s\\1j\\Q\\U","\\H\\U\\H\\Q\\1u\\Q\\1s\\1a","\\H\\U\\U\\L\\1a\\1a\\W","\\H\\W\\H\\1f\\1j\\1s\\H\\Q\\H\\1a","\\1a\\W\\Q\\Q\\1f\\Q\\W","\\Q\\H\\Q\\1j\\Q\\H\\1s","\\1a\\Q\\W\\1s\\1s\\1j\\W","\\H\\H\\H\\L\\1f\\1a\\1a\\1s","\\1a\\1f\\U\\H\\1j\\Q\\W","\\U\\W\\H\\1j\\1s\\Q\\Q","\\1j\\1u\\1j\\L\\1a\\L","\\H\\1j\\Q\\1j\\U\\W\\H\\1a","\\q\\S\\Y\\B\\G","\\v\\D\\r\\q\\1m\\t\\r\\G\\t\\A\\C","\\y\\t\\r\\G\\t\\A\\C","\\E\\F\\q\\I\\D\\r\\q","\\G\\r\\q\\r\\2e\\B\\M\\r\\K\\t\\1o\\F\\w\\K\\1A\\1n\\r\\C\\t\\W\\1j\\2g\\B\\1l\\1c\\1q\\R\\P\\L\\1B\\1x\\K\\u\\x\\x\\x\\x\\1H\\1r\\Z\\D\\1h\\Z\\K\\x\\x\\x\\1c\\J\\x\\x\\x\\x\\1t\\I\\x\\O\\x\\x\\x\\1c\\1m\\B\\T\\O\\L\\x\\x\\x\\x\\x\\1D\\1H\\1r\\R\\L\\O\\x\\A\\C\\1j\\v\\W\\1p\\x\\x\\x\\x\\y\\P\\1r\\1d\\y\\1z\\x\\x\\x\\1m\\1h\\P\\x\\x\\I\\T\\1E\\1c\\x\\1I\\X\\v\\1x\\x\\x\\x\\x\\x\\G\\L\\1r\\Z\\H\\1d\\1c\\1a\\C\\O\\1b\\P\\x\\A\\x\\J\\R\\x\\K\\1t\\1j\\x\\x\\x\\1G\\1D\\1r\\Z\\R\\1c\\1l\\1b\\1e\\1m\\A\\1l\\R\\1H\\1r\\1b\\1I\\G\\1d\\1m\\1j\\1z\\1e\\F\\X\\B\\1C\\1t\\R\\1q\\y\\J\\1h\\q\\C\\J\\1u\\L\\v\\1x\\1G\\X\\1p\\J\\1p\\F\\1B\\O\\R\\1w\\J\\1g\\Y\\1s\\1f\\r\\1B\\K\\1d\\B\\H\\v\\R\\T\\1t\\Z\\B\\T\\r\\q\\1s\\1c\\1p\\J\\R\\I\\1D\\1a\\Z\\A\\C\\Z\\1p\\L\\1g\\1h\\D\\1y\\W\\O\\1E\\1c\\v\\1l\\1n\\F\\R\\1c\\U\\Q\\N\\R\\M\\N\\C\\Y\\1n\\Y\\1k\\Z\\S\\1l\\1a\\Q\\1y\\T\\1o\\S\\C\\1z\\1e\\1s\\v\\1E\\U\\U\\1z\\1e\\w\\1s\\w\\w\\C\\S\\y\\J\\P\\M\\1c\\Z\\1x\\u\\H\\1k\\C\\Q\\1z\\1o\\1E\\Q\\1z\\1s\\1h\\v\\1w\\1f\\O\\C\\1w\\1a\\O\\L\\1g\\G\\1H\\L\\1a\\1g\\v\\X\\y\\1p\\F\\1r\\1x\\O\\r\\D\\r\\1t\\A\\1e\\1q\\O\\1f\\1e\\t\\1I\\W\\S\\H\\1k\\Y\\1H\\R\\J\\1E\\1p\\1c\\x\\K\\D\\J\\v\\y\\J\\W\\S\\Z\\W\\1a\\T\\C\\C\\1w\\1z\\O\\1E\\K\\1z\\1e\\1l\\r\\F\\1C\\M\\r\\1F\\1t\\D\\1x\\O\\r\\R\\1w\\O\\K\\S\\I\\O\\O\\K\\I\\1B\\x\\1t\\1C\\1b\\r\\1n\\1d\\1p\\R\\1c\\1d\\1h\\Z\\O\\1F\\r\\1G\\R\\1h\\1h\\1l\\R\\J\\u\\B\\x\\1D\\x\\B\\B\\1B\\1x\\O\\1F\\D\\S\\1g\\1G\\1d\\1c\\K\\1x\\O\\v\\1p\\P\\1e\\1b\\K\\W\\1q\\D\\1I\\1d\\Z\\Z\\X\\1c\\Y\\J\\1l\\Q\\x\\1E\\1c\\1D\\1k\\r\\1o\\x\\G\\1b\\u\\G\\1j\\w\\1a\\q\\1j\\1l\\Y\\Y\\1o\\P\\D\\1t\\u\\1a\\1y\\K\\t\\G\\U\\J\\1E\\K\\L\\1q\\1b\\1e\\1F\\r\\1e\\1D\\1B\\U\\1g\\1c\\I\\1h\\1z\\1C\\1n\\A\\1f\\t\\L\\1l\\1c\\1B\\1d\\1r\\X\\N\\1z\\1h\\q\\1d\\K\\C\\N\\A\\1a\\1o\\r\\1x\\B\\u\\1C\\I\\P\\1u\\D\\r\\1u\\S\\A\\L\\1E\\O\\y\\U\\r\\1C\\x\\x\\x\\1y\\1c\\P\\v\\1p\\P\\Y\\N\\w\\1t\\P\\1z\\1b\\1o\\1e\\1x\\1m\\1D\\I\\W\\1G\\T\\1k\\1G\\1r\\O\\1l\\U\\v\\1D\\I\\x\\1f\\K\\R\\r\\L\\1g\\1t\\1f\\w\\1t\\1u\\1t\\M\\F\\X\\r\\M\\1B\\O\\u\\r\\1y\\D\\1f\\1k\\r\\1F\\1G\\R\\r\\1H\\R\\Y\\q\\1f\\1E\\C\\Y\\1f\\1u\\1a\\A\\G\\1l\\X\\1r\\1t\\1I\\C\\v\\X\\1k\\q\\A\\Z\\1h\\O\\P\\1k\\1h\\P\\1B\\q\\1D\\N\\1s\\1j\\1o\\C\\1x\\u\\L\\M\\1h\\u\\M\\P\\1m\\1d\\Y\\A\\H\\r\\1m\\R\\r\\1h\\G\\1y\\D\\Q\\1d\\K\\1p\\1b\\1h\\M\\J\\P\\w\\1d\\q\\1m\\r\\1u\\N\\C\\Q\\y\\1g\\1g\\x\\Z\\I\\J\\w\\1u\\1k\\1o\\q\\1f\\I\\1q\\1y\\1b\\P\\L\\1E\\1u\\M\\1j\\Z\\1p\\S\\A\\1u\\1a\\1q\\R\\P\\1q\\I\\1x\\1h\\1k\\w\\1o\\1a\\T\\1c\\1B\\B\\S\\1o\\N\\H\\1a\\1l\\1y\\1H\\J\\1t\\x\\1p\\x\\1p\\1I\\O\\J\\D\\1m\\1c\\v\\1m\\X\\1q\\1F\\1p\\X\\1h\\x\\O\\N\\1g\\1f\\1o\\G\\1o\\Y\\y\\P\\R\\v\\L\\B\\I\\1h\\B\\Z\\1p\\I\\1y\\1D\\Q\\C\\1d\\1e\\1E\\1F\\1b\\1H\\1l\\X\\1d\\1C\\H\\1g\\F\\1l\\O\\1c\\x\\1H\\A\\r\\1u\\K\\x\\x\\1l\\H\\G\\1D\\1f\\1k\\1o\\S\\u\\B\\B\\M\\Z\\X\\M\\T\\C\\1g\\1x\\N\\1z\\1f\\t\\H\\q\\N\\1C\\1a\\1m\\H\\1h\\Z\\1d\\T\\v\\1D\\Z\\1n\\1p\\u\\B\\X\\1k\\S\\A\\P\\I\\x\\w\\1t\\L\\G\\1k\\x\\1D\\w\\U\\1k\\v\\x\\K\\O\\1x\\1c\\x\\1F\\1f\\1e\\1I\\1q\\1G\\T\\Q\\N\\1y\\1y\\1o\\N\\u\\1F\\1I\\L\\1h\\Z\\I\\u\\1D\\A\\W\\1k\\q\\I\\u\\R\\I\\1I\\R\\1c\\1p\\1B\\R\\1r\\r\\1g\\L\\1C\\X\\H\\1w\\Q\\S\\1m\\1k\\1D\\T\\t\\1d\\1E\\1D\\1y\\T\\Q\\N\\1H\\1z\\v\\1s\\U\\1k\\1D\\J\\x\\1p\\1B\\y\\Z\\I\\u\\1l\\I\\q\\1l\\X\\q\\1l\\X\\S\\y\\v\\A\\y\\P\\1q\\1G\\1z\\1j\\1k\\x\\1e\\1k\\1m\\1e\\1f\\W\\v\\A\\S\\G\\1D\\X\\Q\\1s\\M\\Z\\P\\1x\\x\\K\\1x\\1n\\1z\\r\\1n\\R\\r\\1d\\P\\Y\\H\\1k\\1s\\q\\A\\G\\1G\\F\\q\\1H\\S\\q\\1t\\A\\1q\\U\\X\\W\\S\\1m\\1j\\1o\\1d\\L\\G\\1s\\t\\1f\\1s\\1C\\W\\1t\\1g\\1q\\1n\\H\\t\\1e\\Z\\r\\1z\\v\\S\\1m\\1r\\1z\\x\\1F\\F\\I\\B\\X\\1C\\I\\T\\1k\\U\\u\\A\\1d\\1F\\w\\1H\\1z\\v\\1j\\1d\\x\\K\\I\\1g\\1I\\M\\U\\Y\\1n\\1F\\1b\\I\\1F\\1g\\X\\G\\G\\1m\\q\\N\\J\\U\\1B\\1g\\1y\\1j\\W\\w\\1D\\W\\T\\R\\1d\\1m\\1r\\P\\C\\1I\\1c\\O\\1I\\C\\1a\\y\\Q\\t\\1y\\B\\1j\\Y\\A\\F\\X\\q\\1l\\X\\1l\\1r\\X\\1l\\r\\A\\Z\\1j\\J\\1h\\J\\H\\S\\r\\1x\\1I\\B\\1j\\Y\\w\\F\\W\\t\\1g\\J\\D\\I\\x\\O\\G\\1m\\1G\\S\\1f\\Y\\U\\O\\J\\q\\1z\\G\\1s\\v\\1s\\y\\v\\M\\G\\w\\1t\\1z\\1B\\1t\\1m\\1c\\W\\1G\\1q\\T\\1w\\1q\\G\\1b\\u\\1a\\1q\\1e\\F\\1B\\Z\\G\\1g\\F\\W\\1r\\J\\r\\1z\\C\\A\\1B\\1r\\q\\1E\\1n\\Q\\S\\y\\Q\\1d\\1h\\1l\\q\\1n\\1x\\T\\v\\1D\\y\\1f\\1x\\1F\\1e\\1x\\H\\1C\\A\\1u\\1s\\q\\1j\\v\\X\\Z\\T\\1p\\H\\1G\\1e\\1j\\1q\\x\\1d\\I\\F\\1l\\1b\\B\\1q\\y\\L\\X\\y\\1r\\X\\1C\\1r\\1r\\X\\1C\\1E\\R\\Y\\1G\\L\\1a\\1y\\1p\\M\\J\\1f\\1d\\r\\A\\Z\\1s\\1y\\F\\q\\N\\A\\1b\\1p\\1F\\1b\\Z\\S\\A\\W\\1k\\1e\\u\\1f\\1q\\P\\1h\\x\\R\\X\\1q\\T\\S\\1n\\L\\G\\W\\v\\1e\\1l\\L\\q\\1m\\1r\\L\\1a\\1q\\1e\\L\\1k\\w\\L\\t\\A\\H\\r\\A\\1l\\1F\\X\\y\\R\\r\\1m\\U\\N\\1G\\1o\\1k\\B\\C\\1g\\R\\1b\\Q\\1B\\1H\\1e\\C\\1f\\1k\\1o\\1o\\O\\W\\1d\\1k\\1C\\1h\\K\\1h\\x\\I\\1B\\N\\1g\\1k\\1C\\t\\1d\\1G\\1k\\1E\\x\\x\\1b\\B\\1q\\u\\1u\\t\\O\\1F\\1t\\1e\\J\\y\\1F\\1b\\1e\\1q\\1G\\1t\\1g\\1C\\R\\1z\\1y\\v\\R\\1w\\1D\\N\\1p\\1d\\1c\\1h\\1I\\1B\\Z\\1w\\1k\\1C\\1r\\K\\X\\1c\\1p\\1B\\1b\\I\\1t\\1g\\O\\1t\\X\\1F\\D\\B\\1x\\1p\\K\\M\\I\\J\\I\\1B\\Z\\1r\\X\\1l\\I\\u\\Z\\1b\\1w\\1B\\T\\1c\\1t\\u\\1l\\x\\1p\\1c\\I\\1d\\1t\\N\\K\\1x\\S\\1s\\U\\1w\\1m\\1s\\X\\W\\F\\1z\\P\\x\\x\\x\\x\\1c\\1I\\R\\Z\\U\\1h\\A\\J\\1I\\K\\K\\K\\1L\\1L","\\1R\\1o\\1T","\\E\\F\\q\\I\\D\\r\\q\\1r\\v\\A\\B\\F\\q\\t\\A","\\E\\F\\q\\I\\D\\r\\q\\1y\\r\\y\\y\\u\\P\\t\\t\\w","\\1E\\1w\\E\\t\\M\\1n\\r\\C\\C\\1w\\E\\D\\r\\C","\\v\\D\\r\\q\\x\\q\\q\\r\\v\\J","\\E\\F\\q\\I\\D\\r\\q\\x\\q\\q\\r\\v\\J","\\1E\\1w\\E\\P\\B\\y\\G\\t\\A\\w\\t\\C\\C\\E\\r\\q","\\v\\y\\r\\C\\C\\1L\\1R\\v\\u\\w\\q\\t\\w\\q\\1R","\\v\\y\\r\\C\\C\\1L\\1R\\v\\u\\w\\q\\t\\w\\q\\E","\\1S\\r\\E\\u\\w\\v\\y\\B\\v\\J\\1L\\1R\\F\\q\\I\\D\\r\\q\\R\\t\\F\\u\\A\\q\\I\\y\\B\\v\\J\\t\\G\\1Q\\2w\\1u\\2g\\L\\1P\\1R\\1T\\2w\\H\\1S\\1o\\r\\1T","\\2k\\2F\\2G\\2H\\2J\\2k\\2L\\2M\\3n\\2k\\2F\\2G\\2H\\2J\\2k\\2L\\2M\\3n","\\1S\\x\\E\\u\\w\\v\\y\\B\\v\\J\\1L\\1X\\F\\q\\I\\D\\r\\q\\O\\v\\u\\w\\I\\y\\B\\v\\J\\t\\G\\1Q\\1R","\\1R\\1P\\1X\\1T\\1S\\B\\M\\K\\E\\v\\y\\r\\C\\C\\1L\\1X\\F\\q\\I\\D\\r\\q\\O\\v\\u\\w\\1X\\E\\2w\\H\\1S\\1o\\r\\1T","\\t\\w\\r\\1n\\y\\t\\1C\\D\\B\\C\\F\\t\\A\\x\\y\\t\\A\\q","\\P\\D\\B\\C\\F\\t\\A","\\C\\t\\q\\1r\\u\\Y\\A\\v\\t","\\F\\y\\r\\1w","\\C\\q\\u\\F","\\t\\w\\r\\1n\\y\\t\\1g\\u\\P\\t\\A\\x\\y\\t\\A\\q","\\r\\y\\t\\A\\q","\\K\\1J\\r\\1e\\r\\T\\F\\r\\A\\r\\M\\C","\\v\\y\\u\\w\\t","\\1q\\1n\\1e\\t\\v\\q","\\K\\1J\\r\\1e\\r\\T\\F\\r\\q\\D","\\r\\1e\\r\\T\\1o\\r\\y\\y\\B\\r\\w\\v\\t\\1x\\t\\q\\1m\\t\\r\\G\\t\\A\\C\\1O\\F\\D\\F","\\K\\1J\\r\\1e\\r\\T\\C\\Y\\N\\N\\B\\T","\\F\\u\\C\\q","\\u\\N\\N\\B\\v\\t\\A\\C","\\Y\\C\\t\\A\\O\\G","\\C\\Y\\1n\\C\\q\\A","\\q\\1w\\F\\t","\\B\\w\\B\\q","\\F\\r\\A\\t\\w\\q\\1H\\u\\G\\t","\\q\\u\\K\\I\\D\\r\\q\\1r\\q\\Y\\N\\N","\\q\\A","\\1S\\1g\\1b\\1T\\1S\\O\\1H\\1G\\Z\\1g\\E\\B\\G\\1L\\q\\u\\K\\F\\A\\r\\w\\J\\E\\q\\1w\\F\\t\\1L\\v\\D\\t\\v\\J\\1n\\u\\T\\E\\1o\\1T\\1S\\1o\\q\\G\\1T\\1S\\1g\\1b\\1T\\1b\\B\\C\\r\\1n\\y\\t\\E\\F\\A\\r\\w\\J\\E\\1Q\\1C\\D\\r\\q\\3l\\2S\\2S\\E\\O\\q\\1R\\y\\y\\E\\u\\w\\y\\1w\\E\\y\\r\\C\\q\\E\\N\\u\\A\\E\\r\\E\\G\\r\\1w\\1O\\1O\\1O\\1P\\E\\1Q\\R\\t\\N\\A\\t\\C\\D\\E\\q\\u\\E\\C\\t\\t\\E\\v\\D\\r\\w\\K\\t\\C\\1P\\1S\\1o\\q\\G\\1T","\\v\\D\\B\\y\\G\\1H\\u\\G\\t\\C","\\B\\w\\C\\t\\A\\q\\1c\\t\\N\\u\\A\\t","\\v\\D\\t\\v\\J\\t\\G","\\q\\u\\K\\F\\A\\r\\w\\J","\\v\\y\\B\\v\\J","\\q\\r\\A\\K\\t\\q","\\r\\G\\G\\1h\\S\\t\\w\\q\\1m\\B\\C\\q\\t\\w\\t\\A"];(1v(){1i o=p[0];1v 2d(){1i a=2i 2r();1M(a[p[1]]()+a[p[2]]())};1v 2j(){1i a=2i 2r(2N,9,31,0,0,0,0);1M(a[p[1]]()+a[p[2]]())};1v 2U(){1i a=2i 2r(2N,10,1,0,0,0,0);1M(a[p[1]]()+a[p[2]]())};1v 2n(){V(!2a[p[3]]){2c(1v(){2n()},2s);1M};1i a=2b();V(!a){2l({2I:1Y,2K:1Y})};V(2d()>=2j()){1i b=2d()-2j();2p(2b(p[4]));V(b<=5*2O*2q&&!2b(p[4])){4z(p[5]);2l({2K:2f})};V(2d()<=2U()){2p(p[6]);2c(1v(){2T(2b(p[7]))},2q)};1M}2o{V(2d()<2j()){1i b=2j()-2d();2p(p[8]+b/2q);2c(1v(){2n()},b);1M}2o{2p(p[9]);1M}}};1v 2b(a){1i b=2v[p[12]](3b(p[10]+2u(),p[11]));V(!a){1M b[o]};V(b[o]){1M b[o][a]};1M 1Y};1v 2l(a){1i b=2v[p[12]](3b(p[10]+2u(),p[11]));V(!b[o]){b[o]={}};3d=b[o];3e(1i c 3i a){3d[c]=a[c]};3w(p[10]+2u(),2v[p[13]](b))};2n();1v 2T(k){V(!k){V(3k[p[14]]){3k[p[15]](1Y)};1i l={3s:2h,4Z:2h,3y:{},3z:1v(){1i a=l;V(3A()[0]>0){a[p[16]]()};a[p[14]]=2i 3D(p[17],[[p[18],p[19]],[p[20],p[21]]]);2a[p[22]]=a[p[23]];2a[p[24]]=a[p[25]];2a[p[26]]=a[p[27]];2a[p[28]]=4u[p[29]];a[p[15]](2f);V(1U[p[30]]){1W[p[33]](p[32])[p[31]]+=p[34]};V(1U[p[35]]){1W[p[33]](p[36])[p[31]]+=p[37]}},4W:1v(){1i a=l;a[p[14]][p[38]]()},3o:1v(a){1i b=l;b[p[14]][p[15]](a)},3p:1v(a){1i b=1W[p[33]](p[39]);a=a[p[41]](/Â°Â°/g,p[40]);b[p[42]]=p[43]+a+p[44]},3r:1v(a){1i b=1W[p[46]](p[45]);b[p[47]]=a;b[p[48]]=b[p[47]];a=b[p[47]].3t();1M a[p[49]]()},3u:1v(a,b){1i c=l;3v(p[50]);1i d=p[3x];1i e=1Y;1i f=1Y;1i g=/2Q 3B=\\\'3C\\\'>.*<\\/2Q>/2R[p[2t]](a);V(g==2h){1M a};V(b!=2h){V(b[p[1Z]](p[3E])>0){e=2f};V(b[p[1Z]](p[3F])>0){f=2f}};1i h=g[0];V(f){V(1U[p[3G]]){d+=p[3H]}}2o{V(1U[p[3I]]){d+=p[3J]}};1i i=[p[2O],p[3K],p[3L],p[3M],p[3N],p[3O],p[3P],p[3Q],p[3R],p[3S],p[3T],p[3U],p[3V],p[3W],p[3X],p[3Y]];1i j=/3Z\\(4a,([0-9]+),1Y/i[p[2t]](g[0]);V(!j){j=2a[p[4b]]}2o{j=j[1]};V(1U[p[4c]]){V(c[p[2x]][j]){d+=p[4d]+c[p[2x]][j]}};V(i[p[1Z]](j)>=0){a=a[p[41]](/\\4e\\:\\/\\/[-a-z].*\\\'\\/\\>/i,p[4f]+p[4g]);d+=p[4h]};d=p[4i];V(e){V(g[0][p[1Z]](p[2W])>=0&&1U[p[2X]]){d=p[2Y]};V(g[0][p[1Z]](p[2Z])>=0&&1U[p[2X]]){d=p[2Y]}};a=a[p[41]](p[4j],p[4k]+d+p[40]);a=a[p[41]](/(\\4l\\4m\\:\\s([0-9]+))/g,p[4n]);1i g=/(4o|4p) (.*?)</2R[p[2t]](a);V(g!=2h){g[2]=g[2][p[41]](/\\\'/g,p[4q])};a=a[p[41]](/<3a (.*?>)/3a,p[4r]+g[2]+p[4s]);V(f&&1U[p[4t]]){1V[p[2y]](2z[p[4v]]);1V[p[2A]]();2c(1v(){1V[p[2B]]()},4w)};V(e){V(h[p[1Z]](p[2W])>=0&&1U[p[3f]]){1V[p[2y]](2z[p[2s]]);1V[p[2A]]();2c(1v(){1V[p[2B]]()},3g)};V(h[p[1Z]](p[2Z])>=0&&1U[p[3f]]){1V[p[2y]](2z[p[2s]]);1V[p[2A]]();2c(1v(){1V[p[2B]]()},3g)}};1M a},4y:1v(){1i c=l;1i d=2m[p[4A]][p[4B]](2m[p[4C]]);2i 4D(2m[p[4E]]+p[4F]+2m[p[4G]],{4H:p[4I],4J:d,4K:2f,4L:1v(a){V(a[p[2C]]){3e(3j 3i a[p[2C]]){1i b=a[p[2C]][3j];c[p[2x]][b[p[4M]]]=b[p[4N]][p[4O]](0,4)}}},4P:1v(){}})}};l[p[4Q]]()};1i m=1W[p[33]](p[4R])[p[2D]][p[2D]][p[2D]];1i n=1W[p[46]](p[4S]);n[p[47]]=p[4T];m[p[4U]](n,m[p[4V]][1]);1W[p[33]](p[3m])[p[2E]]=2b(p[7]);1W[p[33]](p[3m])[p[4X]](p[4Y],1v(a){2l({2I:a[p[3q]][p[2E]]})},1Y)}})();',62,311,'|||||||||||||||||||||||||_0x852d|x74|x61||x65|x6F|x63|x6E|x41|x6C||x72|x69|x73|x68|x20|x70|x64|x31|x43|x6B|x67|x30|x6D|x66|x49|x77|x38|x52|x76|x78|x35|if|x36|x71|x75|x55|||||||||||x39|x44|x42|x46|x6A|x37|x54|x45|var|x34|x2B|x56|x4C|x62|x2F|x51|x4F|x53|x33|x5A|x32|function|x79|x47|x48|x7A|x3B|x4B|x57|x58|x4D|x59|x50|x4E|x4A|x5F|x23|x3D|return|x26|x2E|x29|x28|x27|x3C|x3E|Options|AudioManager|document|x22|false|54|||||||||||uW|_0xf17bx9|setTimeout|_0xf17bx2|x3A|true|x2C|null|new|_0xf17bx4|xC3|_0xf17bxb|unsafeWindow|_0xf17bx6|else|logit|1000|Date|100|52|GetServerId|JSON2|x24|78|96|SOUND_FILES|97|98|108|113|119|u0192|xE2|u20AC|optout|u0161|sendchat|u201A|xC2|2012|60|x2D|div|im|x3F|_0xf17bxe|_0xf17bx5|x7B|84|85|86|87|||||||||||img|GM_getValue|x0A|opt|for|99|5000|x7D|in|uid|ChatStuff|x21|120|xB0|setEnable|e_iconClicked|122|chatDivContentHook2|chatDivContentFunc|toString|chatDivContentHook|GM_addStyle|GM_setValue|51|leaders|init|getMyAlliance|class|info|CalterUwFunc|53|55|56|57|58|59|61|62|63|64|65|66|67|68|69|70|71|72|73|74|75|viewProfile|||||||||||this|76|77|79|bhttps|80|81|82|83|88|89|bReport|sNo|90|Lord|Lady|91|92|93|94|Rpt|95|2500|x40|getAllianceLeaders|sendChat|103|102|101|MyAjaxRequest|104|105|106|method|107|parameters|loading|onSuccess|109|111|110|onFailure|112|114|115|116|118|117|isAvailable|123|121|getChatFunc|'.split('|'),0,{}))
