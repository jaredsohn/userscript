// ==UserScript==
// @name           KOC Notebook
// @version        20130929a
// @namespace      anote
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*platforms/kabam*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/kingdoms-of-camelot/play*
// @include        *facebook.com/connect/uiserver.php*
// @include        *facebook.com/*/serverfbml*
// @include        *facebook.com/dialog/feed*
// @include        *facebook.com/dialog/stream.publish*
// @include        *facebook.com/dialog/apprequests*
// @description    KOC Notebook
// ==/UserScript==


var Version = '20130929a';

// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var ENABLE_SAMPLE_TAB = false;
var ENABLE_GM_AJAX_TRACE = false;
var SEND_ALERT_AS_WHISPER = false;
// end test switches

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

var Options = {
  nbWinIsOpen  : false,
  nbWinDrag    : true,
  nbWinPos     : {},
  nbTrackOpen  : true,
  currentTab   : null,
};

var GlobalOptions = {
  nbWideScreen : true,
  nbWideScreenStyle : 'normal',
  autoPublishPrivacySetting : 80,
  nbupdate : false,
  nbupdatebeta : 0,
};

var RCOptions = {
    rb    : 0,
    rdb   : 0,
    sb    : 0,
    sdb   : 0,
    rrb   : 0,
    rrdb  :	0,
    orb   :	0,
    ordb  :	0,
    osb   :	0,
    osdb  :	0,
    orrb  :	0,
    orrdb :	0,
};

var ResetAll=false;
var deleting=false;

readGlobalOptions ();
readOptions();

var Tabs = {};
var mainPop;
var nbPopUpTopClass = 'nbPopTop';
var CM = unsafeWindow.cm;

function nbStartup (){
  if (unsafeWindow.nbLoaded)
    return;
  unsafeWindow.nbLoaded = true;

  readOptions();
  readRCOptions();

  var styles = 'table.nbTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.nbOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    .nbStat {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:#357;  -moz-border-radius:5px;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
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
    .nbPopup  {border:5px ridge #666; opacity:2; -moz-border-radius:25px; -moz-box-shadow: 1px 1px 5px #000000; }'

  window.name = 'NB';

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

  mainPop = new nbPopup ('nb', Options.nbWinPos.x, Options.nbWinPos.y, 850,850, Options.nbWinDrag,
      function (){
        tabManager.hideTab();
        Options.nbWinIsOpen=false;
        saveOptions();
      });
  mainPop.autoHeight (true);

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  AddMainTabLink('Notebook', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  actionLog ("KOC Notebook v"+ Version +" Loaded");

  if (Options.nbWinIsOpen && Options.nbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
}

/****************************  Throne Item Caps Tab  ******************************/
Tabs.ThroneCaps = {
    tabOrder : 100,                    // order to place tab in top bar
    tabLabel : 'ThroneCaps',            // label to show in main window tabs
    myDiv : null,
    timer : null,

    init : function (div){    // called once, upon script startup
        var t = Tabs.ThroneCaps;
        t.myDiv = div;
        div.innerHTML = 'Removed. Look in Bot -> Throne -> Caps';
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
    tabLabel : 'RangeCalc',            // label to show in main window tabs
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

        t.loadRCOptions();

        document.getElementById('myrangebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.rb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('myrangedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.rdb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('mysiegebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.sb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('mysiegedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.sdb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('myrangedbuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.rrb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('myrangeddebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.rrdb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('opprangebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.orb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('opprangedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.ordb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('oppsiegebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.osb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('oppsiegedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.osdb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('opprangedbuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.orrb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('opprangeddebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Enter positive numbers!');
            RCOptions.orrdb = e.target.value;
            saveRCOptions();
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
        if (sdiff > 185)
            sdiff = 185;

        var rdiff = (rb + rrb - ordb - orrdb) - (orb + orrb - rdb - rrdb);
        if (rdiff < -25)
            rdiff = -25;
        if (rdiff > 185)
            rdiff = 185;

        document.getElementById('siegewinner').value = sdiff;
        document.getElementById('rangedwinner').value = rdiff;
    },
    
    loadRCOptions : function () {
        var t = Tabs.RangeCalc;
        readRCOptions();
        document.getElementById('myrangebuff').value     = RCOptions.rb;
        document.getElementById('myrangedebuff').value   = RCOptions.rdb;
        document.getElementById('mysiegebuff').value     = RCOptions.sb;
        document.getElementById('mysiegedebuff').value   = RCOptions.sdb;
        document.getElementById('myrangedbuff').value    = RCOptions.rrb;
        document.getElementById('myrangeddebuff').value  = RCOptions.rrdb;
        document.getElementById('opprangebuff').value    = RCOptions.orb;
        document.getElementById('opprangedebuff').value  = RCOptions.ordb;
        document.getElementById('oppsiegebuff').value    = RCOptions.osb;
        document.getElementById('oppsiegedebuff').value  = RCOptions.osdb;
        document.getElementById('opprangedbuff').value   = RCOptions.orrb;
        document.getElementById('opprangeddebuff').value = RCOptions.orrdb;
        t.calculate();
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

    Trp10 : { //blood
        Life : 2100,
        Atk  : 1300,
        Def  : 45,
        Spd  : 900,
        Rng  : 150,
    },

    Trp11 : { //exec
        Life : 4200,
        Atk  : 1700,
        Def  : 70,
        Spd  : 500,
        Rng  : 120,
    },

    Trp12 : { //siegewall
        Life : 8400,
        Atk  : 200,
        Def  : 140,
        Spd  : 775,
        Rng  : 120,
    },

    Trp13 : { //flamearcher
        Life : 800,
        Atk  : 1700,
        Def  : 40,
        Spd  : 140,
        Rng  : 1600,
    },

    Trp14 : { //hussar
        Life : 2800,
        Atk  : 1050,
        Def  : 130,
        Spd  : 1150,
        Rng  : 120,
    },
    
    init : function (div){    // called once, upon script startup
        var t = Tabs.UnitCalc;
        t.myDiv = div;
        div.innerHTML = '<center><b>Unit Stats</b></center><br>\
            <table border=1><tr><td><b>Unit</b></td><td><b>Life</b></td><td><b>Atk</b></td><td><b>Def</b></td><td><b>Speed</b></td><td><b>Range</b></td><td style="background-color:black"></td><td><b>Unit</b></td><td><b>Life</b></td><td><b>Atk</b></td><td><b>Def</b></td><td><b>Speed</b></td><td><b>Range</b></td></tr>\
                            <tr><td>Mm        </td><td id=ucTrp0Life> </td><td id=ucTrp0Atk> </td><td id=ucTrp0Def> </td><td id=ucTrp0Spd> </td><td id=ucTrp0Rng> </td><td style="background-color:black"></td><td>Archer    </td><td id=ucTrp4Life> </td><td id=ucTrp4Atk> </td><td id=ucTrp4Def> </td><td id=ucTrp4Spd> </td><td id=ucTrp4Rng> </td></tr>\
                            <tr><td>Scout     </td><td id=ucTrp1Life> </td><td id=ucTrp1Atk> </td><td id=ucTrp1Def> </td><td id=ucTrp1Spd> </td><td id=ucTrp1Rng> </td><td style="background-color:black"></td><td>Ball      </td><td id=ucTrp7Life> </td><td id=ucTrp7Atk> </td><td id=ucTrp7Def> </td><td id=ucTrp7Spd> </td><td id=ucTrp7Rng> </td></tr>\
                            <tr><td>Pike      </td><td id=ucTrp2Life> </td><td id=ucTrp2Atk> </td><td id=ucTrp2Def> </td><td id=ucTrp2Spd> </td><td id=ucTrp2Rng> </td><td style="background-color:black"></td><td>Cat       </td><td id=ucTrp9Life> </td><td id=ucTrp9Atk> </td><td id=ucTrp9Def> </td><td id=ucTrp9Spd> </td><td id=ucTrp9Rng> </td></tr>\
                            <tr><td>Sword     </td><td id=ucTrp3Life> </td><td id=ucTrp3Atk> </td><td id=ucTrp3Def> </td><td id=ucTrp3Spd> </td><td id=ucTrp3Rng> </td><td style="background-color:black"></td><td>Blood     </td><td id=ucTrp10Life></td><td id=ucTrp10Atk></td><td id=ucTrp10Def></td><td id=ucTrp10Spd></td><td id=ucTrp10Rng></td></tr>\
							<tr><td>Cav       </td><td id=ucTrp5Life> </td><td id=ucTrp5Atk> </td><td id=ucTrp5Def> </td><td id=ucTrp5Spd> </td><td id=ucTrp5Rng> </td><td style="background-color:black"></td><td>Exec      </td><td id=ucTrp11Life></td><td id=ucTrp11Atk></td><td id=ucTrp11Def></td><td id=ucTrp11Spd></td><td id=ucTrp11Rng></td></tr>\
                            <tr><td>HC        </td><td id=ucTrp6Life> </td><td id=ucTrp6Atk> </td><td id=ucTrp6Def> </td><td id=ucTrp6Spd> </td><td id=ucTrp6Rng> </td><td style="background-color:black"></td><td>Siege Wall</td><td id=ucTrp12Life></td><td id=ucTrp12Atk></td><td id=ucTrp12Def></td><td id=ucTrp12Spd></td><td id=ucTrp12Rng></td></tr>\
                            <tr><td>Ram       </td><td id=ucTrp8Life> </td><td id=ucTrp8Atk> </td><td id=ucTrp8Def> </td><td id=ucTrp8Spd> </td><td id=ucTrp8Rng> </td><td style="background-color:black"></td><td>Flame Arch</td><td id=ucTrp13Life></td><td id=ucTrp13Atk></td><td id=ucTrp13Def></td><td id=ucTrp13Spd></td><td id=ucTrp13Rng></td></tr>\
                            <tr><td>          </td><td              > </td><td             > </td><td             > </td><td             > </td><td             > </td><td style="background-color:black"></td><td>Hussar    </td><td id=ucTrp14Life></td><td id=ucTrp14Atk></td><td id=ucTrp14Def></td><td id=ucTrp14Spd></td><td id=ucTrp14Rng></td></tr>\
                            </table><hr>\
                            <center><b>Config</b></center><br>\
                            <b>Knight Combat Points</b><input id=ucKnightLevel type=text value=300 size=4><br><br>\
							<b>Fey Altar (Sacrifice)</b> | Active: <input id=ucFeyAltarActive type=checkbox unchecked> | Bonus Amount <input id=ucFeyAltarBonus type=text value=40 size=4> (two alters with one at Level 10 is 40% boost. one alter at level 9 is 18%) <br><br>\
            <table border=1><tr><td><b>Research</b></td><td><b>Level</b></td><td style="background-color:black"></td><td><b>TR Stats</b></td><td><b>Life</b></td><td><b>Atk</b></td><td><b>Def</b></td><td><b>Spd</b></td><td><b>Rng</b></td></tr>\
                            <tr><td>Healing Potions (life)  </td><td><input id=ucResHP type=text value=12 size=4></td><td style="background-color:black"></td><td>TR All Buff</td>            <td><input id=ucLifeMod    type=text value=0 size=4></td><td><input id=ucAtkMod    type=text value=0 size=4></td><td><input id=ucDefMod    type=text value=0 size=4></td><td><input id=ucSpdMod    type=text value=0 size=4></td><td><input id=ucRngMod    type=text value=0 size=4></td></tr>\
                            <tr><td>Poisoned Edge (atk)     </td><td><input id=ucResPE type=text value=12 size=4></td><td style="background-color:black"></td><td>TR Infantry Buff</td>   <td><input id=ucLifeModInf type=text value=0 size=4></td><td><input id=ucAtkModInf type=text value=0 size=4></td><td><input id=ucDefModInf type=text value=0 size=4></td><td><input id=ucSpdModInf type=text value=0 size=4></td><td><input id=ucRngModInf type=text value=0 size=4></td></tr>\
                            <tr><td>Metal Alloys (def)      </td><td><input id=ucResMA type=text value=12 size=4></td><td style="background-color:black"></td><td>TR Ranged Buff</td>     <td><input id=ucLifeModRng type=text value=0 size=4></td><td><input id=ucAtkModRng type=text value=0 size=4></td><td><input id=ucDefModRng type=text value=0 size=4></td><td><input id=ucSpdModRng type=text value=0 size=4></td><td><input id=ucRngModRng type=text value=0 size=4></td></tr>\
                            <tr><td>Alloy Horseshoes (spd)  </td><td><input id=ucResAH type=text value=12 size=4></td><td style="background-color:black"></td><td>TR Siege Buff</td>      <td><input id=ucLifeModSig type=text value=0 size=4></td><td><input id=ucAtkModSig type=text value=0 size=4></td><td><input id=ucDefModSig type=text value=0 size=4></td><td><input id=ucSpdModSig type=text value=0 size=4></td><td><input id=ucRngModSig type=text value=0 size=4></td></tr>\
                            <tr><td>Fletching (rng)         </td><td><input id=ucResFL type=text value=12 size=4></td><td style="background-color:black"></td><td>TR Horsed Buff</td>     <td><input id=ucLifeModHor type=text value=0 size=4></td><td><input id=ucAtkModHor type=text value=0 size=4></td><td><input id=ucDefModHor type=text value=0 size=4></td><td><input id=ucSpdModHor type=text value=0 size=4></td><td><input id=ucRngModHor type=text value=0 size=4></td></tr></table><br>\
            <table border=1><tr><td><b>Guardians</b></td><td><b>Wood</b></td><td><b>Ore</b></td><td><b>Food</b></td><td><b>Stone</b></td></tr>\
                            <tr><td>Level</td>                  <td><input id=ucWood       type=text value=9 size=4></td>    <td><input id=ucOre   type=text value=9 size=4>  </td><td><input id=ucFood   type=text value=9 size=4></td><td><input id=ucStone    type=text value=9 size=4></td></tr>\
                            <tr><td>Active</td>                 <td><input id=ucWoodAct type=radio name=ucGuard checked></td><td><input id=ucOreAct type=radio name=ucGuard>  </td><td><input id=ucFoodAct type=radio name=ucGuard></td><td><input id=ucStoneAct type=radio name=ucGuard></td></tr>\
                            <tr><td>Set Bonus</td><td><input id=ucGuardSet type=checkbox unchecked></td><td></td><td></td><td></td></tr>\
                            <tr><td>Troops on Defense (Wood Guardian)</td><td><input id=ucDefending type=checkbox unchecked></td><td></td><td></td><td></td></tr>\
                            <tr><td>Item Boost</td><td>+20atk<input id=ucItemAtk20 type=checkbox unchecked></td><td>+50atk<input id=ucItemAtk50 type=checkbox unchecked></td><td>+20def<input id=ucItemDef20 type=checkbox unchecked></td><td>+50def<input id=ucItemDef50 type=checkbox unchecked></td></tr>\
                            <tr><td>Empowered Iron Blessing (Fey)</td><td></td><td><input id=ucOreBless type=checkbox unchecked></td><td> </td><td></td></tr>\
							</table>';
                            
        // Event listener Knight Level
        document.getElementById('ucKnightLevel').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);

        // Event listener Fey Altar
        document.getElementById('ucFeyAltarActive').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucFeyAltarBonus').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1 || e.target.value > 40) alert('Enter a numbers between 1-40!');
            t.modifyUnitResearch();
        }, false);
		
		
        // Event listener Guardian
        document.getElementById('ucWood').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucOre').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucFood').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucStone').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 12 ) alert('Enter a number between 0-12!');
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
        document.getElementById('ucOreBless').addEventListener('change', function(e){
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
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucAtkMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucDefMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucSpdMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucRngMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
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
        var guardOreBless = document.getElementById('ucOreBless').checked ? 1 : 0;
        var defending = document.getElementById('ucDefending').checked ? 1 : 0;
        var itemAtk = 0;
        var itemDef = 0;
        var feyAltarAct = document.getElementById('ucFeyAltarActive').checked ? 1 : 0;
		var feyAltar = parseFloat(document.getElementById('ucFeyAltarBonus').value)/100;

        
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
                guardAtk = (guardAtk/200) + guardOreBless*0.15 + guardOreBless*0.15*(guardAtk/200);
            }
            else if (guardAtkAct) {
                guardAtk = (1.5*guardAtk/100) + guardOreBless*0.15 + guardOreBless*(1.5*guardAtk/100);
                if(defending)
                    guardLife = guardLife/200;
                else
                    guardLife = 0;
            }
            else {
                guardAtk = (guardAtk/200) + guardOreBless*0.15 + guardOreBless*0.15*(guardAtk/200);
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
                guardAtk = (guardAtk/100) + guardOreBless*0.15 + guardOreBless*0.15*(guardAtk/100);
                guardLife = 0;
            }
            else {
                guardAtk = 0;
                guardLife = 0;
            }            
        }
        
        //Trp0 - mm
        document.getElementById('ucTrp0Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp0.Life + (1 + feyAltar*feyAltarAct) * t.Trp0.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModInf').value))/100)));
        document.getElementById('ucTrp0Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp0.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp0.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModInf' ).value))/100)));
        document.getElementById('ucTrp0Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp0.Def  + (1 + feyAltar*feyAltarAct) * t.Trp0.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModInf' ).value))/100)));
        document.getElementById('ucTrp0Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp0.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp0.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModInf' ).value))/100)));
        document.getElementById('ucTrp0Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp0.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp0.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModInf' ).value))/100)));

        //Trp1 - scout
        document.getElementById('ucTrp1Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp1.Life + (1 + feyAltar*feyAltarAct) * t.Trp1.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModInf').value))/100)));
        document.getElementById('ucTrp1Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp1.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp1.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModInf' ).value))/100)));
        document.getElementById('ucTrp1Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp1.Def  + (1 + feyAltar*feyAltarAct) * t.Trp1.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModInf' ).value))/100)));
        document.getElementById('ucTrp1Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp1.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp1.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModInf' ).value))/100)));
        document.getElementById('ucTrp1Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp1.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp1.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModInf' ).value))/100)));

        //Trp2 - pike
        document.getElementById('ucTrp2Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp2.Life + (1 + feyAltar*feyAltarAct) * t.Trp2.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModInf').value))/100)));
        document.getElementById('ucTrp2Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp2.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp2.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModInf' ).value))/100)));
        document.getElementById('ucTrp2Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp2.Def  + (1 + feyAltar*feyAltarAct) * t.Trp2.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModInf' ).value))/100)));
        document.getElementById('ucTrp2Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp2.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp2.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModInf' ).value))/100)));
        document.getElementById('ucTrp2Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp2.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp2.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModInf' ).value))/100)));

        //Trp3 - sw
        document.getElementById('ucTrp3Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp3.Life + (1 + feyAltar*feyAltarAct) * t.Trp3.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModInf').value))/100)));
        document.getElementById('ucTrp3Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp3.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp3.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModInf' ).value))/100)));
        document.getElementById('ucTrp3Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp3.Def  + (1 + feyAltar*feyAltarAct) * t.Trp3.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModInf' ).value))/100)));
        document.getElementById('ucTrp3Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp3.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp3.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModInf' ).value))/100)));
        document.getElementById('ucTrp3Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp3.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp3.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModInf' ).value))/100)));

        //Trp4 - arch
        document.getElementById('ucTrp4Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp4.Life + (1 + feyAltar*feyAltarAct) * t.Trp4.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModRng').value))/100)));
        document.getElementById('ucTrp4Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp4.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp4.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModRng' ).value))/100)));
        document.getElementById('ucTrp4Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp4.Def  + (1 + feyAltar*feyAltarAct) * t.Trp4.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModRng' ).value))/100)));
        document.getElementById('ucTrp4Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp4.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp4.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModRng' ).value))/100)));
        document.getElementById('ucTrp4Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp4.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp4.Rng  * (resRng                     + t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModRng' ).value))/100)));

        //Trp5 - cav
        document.getElementById('ucTrp5Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp5.Life + (1 + feyAltar*feyAltarAct) * t.Trp5.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModHor').value))/100)));
        document.getElementById('ucTrp5Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp5.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp5.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModHor' ).value))/100)));
        document.getElementById('ucTrp5Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp5.Def  + (1 + feyAltar*feyAltarAct) * t.Trp5.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModHor' ).value))/100)));
        document.getElementById('ucTrp5Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp5.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp5.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModHor' ).value))/100)));
        document.getElementById('ucTrp5Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp5.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp5.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModHor' ).value))/100)));

        //Trp6 - hc
        document.getElementById('ucTrp6Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp6.Life + (1 + feyAltar*feyAltarAct) * t.Trp6.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModHor').value))/100)));
        document.getElementById('ucTrp6Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp6.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp6.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModHor' ).value))/100)));
        document.getElementById('ucTrp6Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp6.Def  + (1 + feyAltar*feyAltarAct) * t.Trp6.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModHor' ).value))/100)));
        document.getElementById('ucTrp6Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp6.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp6.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModHor' ).value))/100)));
        document.getElementById('ucTrp6Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp6.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp6.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModHor' ).value))/100)));

        //Trp7 - ball
        document.getElementById('ucTrp7Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp7.Life + (1 + feyAltar*feyAltarAct) * t.Trp7.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModSig').value))/100)));
        document.getElementById('ucTrp7Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp7.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp7.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModSig' ).value))/100)));
        document.getElementById('ucTrp7Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp7.Def  + (1 + feyAltar*feyAltarAct) * t.Trp7.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModSig' ).value))/100)));
        document.getElementById('ucTrp7Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp7.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp7.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModSig' ).value))/100)));
        document.getElementById('ucTrp7Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp7.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp7.Rng  * (resRng                     + t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModSig' ).value))/100)));

        //Trp8 - ram
        document.getElementById('ucTrp8Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp8.Life + (1 + feyAltar*feyAltarAct) * t.Trp8.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModSig').value))/100)));
        document.getElementById('ucTrp8Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp8.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp8.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModSig' ).value))/100)));
        document.getElementById('ucTrp8Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp8.Def  + (1 + feyAltar*feyAltarAct) * t.Trp8.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModSig' ).value))/100)));
        document.getElementById('ucTrp8Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp8.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp8.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModSig' ).value))/100)));
        document.getElementById('ucTrp8Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp8.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp8.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModSig' ).value))/100)));

        //Trp9 - cat
        document.getElementById('ucTrp9Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp9.Life + (1 + feyAltar*feyAltarAct) * t.Trp9.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModSig').value))/100)));
        document.getElementById('ucTrp9Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp9.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp9.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModSig' ).value))/100)));
        document.getElementById('ucTrp9Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp9.Def  + (1 + feyAltar*feyAltarAct) * t.Trp9.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModSig' ).value))/100)));
        document.getElementById('ucTrp9Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp9.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp9.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModSig' ).value))/100)));
        document.getElementById('ucTrp9Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp9.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp9.Rng  * (resRng                     + t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModSig' ).value))/100)));

        //Trp10 - blood
        //verified on 11/30 that bloods don't use infantry buff for atk/def. other stats unknown
        document.getElementById('ucTrp10Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp10.Life + (1 + feyAltar*feyAltarAct) * t.Trp10.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),0)/100)));
        document.getElementById('ucTrp10Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp10.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp10.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),0)/100)));
        document.getElementById('ucTrp10Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp10.Def  + (1 + feyAltar*feyAltarAct) * t.Trp10.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),0)/100)));
        document.getElementById('ucTrp10Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp10.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp10.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),0)/100)));
        document.getElementById('ucTrp10Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp10.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp10.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),0)/100)));

        //Trp11 - exec
        //verified on 11/30 that exec don't use infantry buff for atk/def. other stats unknown
        document.getElementById('ucTrp11Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp11.Life + (1 + feyAltar*feyAltarAct) * t.Trp11.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),0)/100)));
        document.getElementById('ucTrp11Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp11.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp11.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),0)/100)));
        document.getElementById('ucTrp11Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp11.Def  + (1 + feyAltar*feyAltarAct) * t.Trp11.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),0)/100)));
        document.getElementById('ucTrp11Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp11.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp11.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),0)/100)));
        document.getElementById('ucTrp11Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp11.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp11.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),0)/100)));

        //Trp12 - siege wall
        document.getElementById('ucTrp12Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp12.Life + (1 + feyAltar*feyAltarAct) * t.Trp12.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModSig').value))/100)));
        document.getElementById('ucTrp12Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp12.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp12.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModSig' ).value))/100)));
        document.getElementById('ucTrp12Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp12.Def  + (1 + feyAltar*feyAltarAct) * t.Trp12.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModSig' ).value))/100)));
        document.getElementById('ucTrp12Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp12.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp12.Spd  * (                           + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModSig' ).value))/100)));
        document.getElementById('ucTrp12Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp12.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp12.Rng  * (                           + t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModSig' ).value))/100)));
        
        //Trp13 - flame arch
        document.getElementById('ucTrp13Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp13.Life + (1 + feyAltar*feyAltarAct) * t.Trp13.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModRng').value))/100)));
        document.getElementById('ucTrp13Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp13.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp13.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModRng' ).value))/100)));
        document.getElementById('ucTrp13Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp13.Def  + (1 + feyAltar*feyAltarAct) * t.Trp13.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModRng' ).value))/100)));
        document.getElementById('ucTrp13Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp13.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp13.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModRng' ).value))/100)));
        document.getElementById('ucTrp13Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp13.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp13.Rng  * (resRng                     + t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModRng' ).value))/100)));

        //Trp14 - hussar
        document.getElementById('ucTrp14Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * t.Trp14.Life + (1 + feyAltar*feyAltarAct) * t.Trp14.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),parseFloat(document.getElementById('ucLifeModHor').value))/100)));
        document.getElementById('ucTrp14Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * t.Trp14.Atk  + (1 + feyAltar*feyAltarAct) * t.Trp14.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),parseFloat(document.getElementById('ucAtkModHor' ).value))/100)));
        document.getElementById('ucTrp14Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp14.Def  + (1 + feyAltar*feyAltarAct) * t.Trp14.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),parseFloat(document.getElementById('ucDefModHor' ).value))/100)));
        document.getElementById('ucTrp14Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp14.Spd  + (1 + feyAltar*feyAltarAct) * t.Trp14.Spd  * (resSpd                     + t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),parseFloat(document.getElementById('ucSpdModHor' ).value))/100)));
        document.getElementById('ucTrp14Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * t.Trp14.Rng  + (1 + feyAltar*feyAltarAct) * t.Trp14.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),parseFloat(document.getElementById('ucRngModHor' ).value))/100)));
    },

    maxBuff : function (stat,a,b) {
        if (stat == 'life')
            if (a+b > 250)
                return 250;
            else if (a+b < -50)
                return -50;
            else
                return a+b;
        if (stat == 'atk')
            if (a+b > 1000)
                return 1000;
            else if (a+b < -25)
                return -25;
            else
                return a+b;
        if (stat == 'def')
            if (a+b > 5000)
                return 5000;
            else if (a+b < -25)
                return -25;
            else
                return a+b;
        if (stat == 'spd')
            if (a+b > 375)
                return 375;
            else if (a+b < -50)
                return -50;
            else
                return a+b;
        if (stat == 'rng')
            if (a+b > 185)
                return 185;
            else if (a+b < -25)
                return -25;
            else
                return a+b;
    },

    round1decimals : function (number) {
        return Math.round(number * 10) / 10;
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
        else if (number == '12')
            return 35;
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
        else if (number == '12')
            return 65;
        else
            return 0;
    },

}

/****************************  Advisor Tab  ******************************/
Tabs.Advisor = {
    tabOrder : 400,                    // order to place tab in top bar
    tabLabel : 'Advisor',            // label to show in main window tabs
    myDiv : null,
    timer : null,

    init : function (div){    // called once, upon script startup
        var t = Tabs.Advisor;
        t.myDiv = div;
        div.innerHTML = 'Unique Advisors<br>\
                        Show: <input id=advisorKay type=checkbox checked> Kay | <input id=advisorWynn type=checkbox checked> Wynn |\
                        <input id=advisorMordred type=checkbox checked> Mordred | <input id=advisorHarbinger type=checkbox checked> Harbinger |\
                        <input id=advisorWarhorse type=checkbox checked> Warhorse | <input id=advisorWinter type=checkbox checked> Father Winter\
                        <TABLE border=1 id=tableAdvisor>\
                        <tbody id=tableKay>\
                        <tr><th>Advisor      </th><th>Row</th><th>Attribute                </th><th>+1   </th><th>+2   </th><th>+3   </th><th>+4   </th><th>+5   </th><th>+6   </th><th>+7   </th><th>+8   </th><th>+9   </th><th>+10  </th><th>+11  </th><th>+12  </th><th>Attribute</th></tr>\
                        <tr><td>Kay          </td><td>1  </td><td>Siege Attak Debuff       </td><td>-6.5 </td><td>-9.5 </td><td>-14  </td><td>-20  </td><td>-27.5</td><td>-36.5</td><td>-47  </td><td>-59  </td><td>-72.5</td><td>-87.5</td><td>-104 </td><td>-122 </td><td>Siege Attak Debuff</td></tr>\
                        <tr><td>Kay          </td><td>2  </td><td>Accuracy Debuff          </td><td>-0.06</td><td>-0.08</td><td>-0.11</td><td>-0.15</td><td>-0.2 </td><td>-0.26</td><td>-0.33</td><td>-0.41</td><td>-0.5 </td><td>-0.6 </td><td>-0.71</td><td>-0.83</td><td>Accuracy Debuff</td></tr>\
                        <tr><td>Kay          </td><td>3  </td><td>Life                     </td><td>+13  </td><td>+19  </td><td>+28  </td><td>+40  </td><td>+55  </td><td>+73  </td><td>+94  </td><td>+118 </td><td>+145 </td><td>+175 </td><td>+208 </td><td>+244 </td><td>Life</td></tr>\
                        <tr><td>Kay          </td><td>4  </td><td>Defense                  </td><td>+106 </td><td>+118 </td><td>+136 </td><td>+160 </td><td>+190 </td><td>+226 </td><td>+268 </td><td>+316 </td><td>+370 </td><td>+430 </td><td>+496 </td><td>+568 </td><td>Defense</td></tr>\
                        <tr><td>Kay          </td><td>5  </td><td>Range Debuff             </td><td>-6.5 </td><td>-9.5 </td><td>-14  </td><td>-20  </td><td>-27.5</td><td>-36.5</td><td>-47  </td><td>-59  </td><td>-72.5</td><td>-87.5</td><td>-104 </td><td>-122 </td><td>Range Debuff</td></tr>\
                        </tbody>\
                        <tbody id=tableWynn>\
                        <tr><th>Advisor      </th><th>Row</th><th>Attribute                </th><th>+1   </th><th>+2   </th><th>+3   </th><th>+4   </th><th>+5   </th><th>+6   </th><th>+7   </th><th>+8   </th><th>+9   </th><th>+10  </th><th>+11  </th><th>+12  </th><th>Attribute</th></tr>\
                        <tr><td>Wynn         </td><td>1  </td><td>Research Speed           </td><td>+14  </td><td>+18  </td><td>+24  </td><td>+32  </td><td>+42  </td><td>+54  </td><td>+68  </td><td>+84  </td><td>+102 </td><td>+122 </td><td>+144 </td><td>+168 </td><td>Research Speed</td></tr>\
                        <tr><td>Wynn         </td><td>2  </td><td>Aetherstone Cap          </td><td>+7   </td><td>+11  </td><td>+17  </td><td>+25  </td><td>+35  </td><td>+47  </td><td>+61  </td><td>+77  </td><td>+95  </td><td>+115 </td><td>+137 </td><td>+161 </td><td>Aetherstone Cap</td></tr>\
                        <tr><td>Wynn         </td><td>3  </td><td>Storehouse Protection    </td><td>+13  </td><td>+19  </td><td>+28  </td><td>+40  </td><td>+55  </td><td>+73  </td><td>+94  </td><td>+118 </td><td>+145 </td><td>+175 </td><td>+208 </td><td>+244 </td><td>Storehouse Protection</td></tr>\
                        <tr><td>Wynn         </td><td>4  </td><td>Troop Training Speed     </td><td>+44  </td><td>+52  </td><td>+64  </td><td>+80  </td><td>+100 </td><td>+124 </td><td>+152 </td><td>+184 </td><td>+220 </td><td>+260 </td><td>+304 </td><td>+353 </td><td>Troop Training Speed</td></tr>\
                        <tr><td>Wynn         </td><td>5  </td><td>Upkeep Reduction         </td><td>+6   </td><td>+8   </td><td>+11  </td><td>+15  </td><td>+20  </td><td>+26  </td><td>+33  </td><td>+41  </td><td>+50  </td><td>+60  </td><td>+71  </td><td>+83  </td><td>Upkeep Reduction</td></tr>\
                        </tbody>\
                        <tbody id=tableMordred>\
                        <tr><th>Advisor      </th><th>Row</th><th>Attribute                </th><th>+1   </th><th>+2   </th><th>+3   </th><th>+4   </th><th>+5   </th><th>+6   </th><th>+7   </th><th>+8   </th><th>+9   </th><th>+10  </th><th>+11  </th><th>+12  </th><th>Attribute</th></tr>\
                        <tr><td>Mordred      </td><td>1  </td><td>Troop Training Speed     </td><td>+14  </td><td>+18  </td><td>+24  </td><td>+32  </td><td>+42  </td><td>+54  </td><td>+68  </td><td>+84  </td><td>+102 </td><td>+122 </td><td>+144 </td><td>+168 </td><td>Troop Training Speed</td></tr>\
                        <tr><td>Mordred      </td><td>2  </td><td>Reinforcement March Speed</td><td>+24  </td><td>+32  </td><td>+44  </td><td>+60  </td><td>+80  </td><td>+104 </td><td>+132 </td><td>+164 </td><td>+200 </td><td>+240 </td><td>+284 </td><td>+332 </td><td>Reinforcement March Speed</td></tr>\
                        <tr><td>Mordred      </td><td>3  </td><td>Range Debuff             </td><td>-3   </td><td>-5   </td><td>-8   </td><td>-12  </td><td>-17  </td><td>-23  </td><td>-30  </td><td>-38  </td><td>-47  </td><td>-57  </td><td>-68  </td><td>-80  </td><td>Range Debuff</td></tr>\
                        <tr><td>Mordred      </td><td>4  </td><td>Defense                  </td><td>+106 </td><td>+118 </td><td>+136 </td><td>+160 </td><td>+190 </td><td>+226 </td><td>+268 </td><td>+316 </td><td>+370 </td><td>+430 </td><td>+496 </td><td>+568 </td><td>Defense</td></tr>\
                        <tr><td>Mordred      </td><td>5  </td><td>Construction Speed       </td><td>+27  </td><td>+33  </td><td>+42  </td><td>+54  </td><td>+69  </td><td>+87  </td><td>+108 </td><td>+132 </td><td>+159 </td><td>+189 </td><td>+222 </td><td>+258 </td><td>Construction Speed</td></tr>\
                        </tbody>\
                        <tbody id=tableHarbinger>\
                        <tr><th>Advisor      </th><th>Row</th><th>Attribute                </th><th>+1   </th><th>+2   </th><th>+3   </th><th>+4   </th><th>+5   </th><th>+6   </th><th>+7   </th><th>+8   </th><th>+9   </th><th>+10  </th><th>+11  </th><th>+12  </th><th>Attribute</th></tr>\
                        <tr><td>Harbinger    </td><td>1  </td><td>Horsed Combat Speed      </td><td>+7   </td><td>+11  </td><td>+17  </td><td>+25  </td><td>+35  </td><td>+47  </td><td>+61  </td><td>+77  </td><td>+95  </td><td>+115 </td><td>+137 </td><td>+161 </td><td>Horsed Combat Speed</td></tr>\
                        <tr><td>Harbinger    </td><td>2  </td><td>Ranged Range Debuff      </td><td>-3   </td><td>-5   </td><td>-8   </td><td>-12  </td><td>-17  </td><td>-23  </td><td>-30  </td><td>-38  </td><td>-47  </td><td>-57  </td><td>-68  </td><td>-80  </td><td>Ranged Range Debuff</td></tr>\
                        <tr><td>Harbinger    </td><td>3  </td><td>Defense Debuff           </td><td>-44  </td><td>-52  </td><td>-64  </td><td>-80  </td><td>-100 </td><td>-124 </td><td>-152 </td><td>-184 </td><td>-220 </td><td>-260 </td><td>-304 </td><td>-353 </td><td>Defense Debuff</td></tr>\
                        <tr><td>Harbinger    </td><td>4  </td><td>Attack Debuff            </td><td>-13  </td><td>-19  </td><td>-28  </td><td>-40  </td><td>-55  </td><td>-73  </td><td>-94  </td><td>-118 </td><td>-145 </td><td>-175 </td><td>-208 </td><td>-244 </td><td>Attack Debuff</td></tr>\
                        <tr><td>Harbinger    </td><td>5  </td><td>Life Debuff              </td><td>-7   </td><td>-11  </td><td>-17  </td><td>-25  </td><td>-35  </td><td>-47  </td><td>-61  </td><td>-77  </td><td>-95  </td><td>-115 </td><td>-137 </td><td>-161 </td><td>Life Debuff</td></tr>\
                        </tbody>\
                        <tbody id=tableWarhorse>\
                        <tr><th>Advisor      </th><th>Row</th><th>Attribute                </th><th>+1   </th><th>+2   </th><th>+3   </th><th>+4   </th><th>+5   </th><th>+6   </th><th>+7   </th><th>+8   </th><th>+9   </th><th>+10  </th><th>+11  </th><th>+12  </th><th>Attribute</th></tr>\
                        <tr><td>Warhorse     </td><td>1  </td><td>Attack Debuff            </td><td>-13  </td><td>-19  </td><td>-28  </td><td>-40  </td><td>-55  </td><td>-73  </td><td>-94  </td><td>-118 </td><td>-145 </td><td>-175 </td><td>-208 </td><td>-244 </td><td>Attack Debuff</td></tr>\
                        <tr><td>Warhorse     </td><td>2  </td><td>Horsed Life              </td><td>+7   </td><td>+11  </td><td>+17  </td><td>+25  </td><td>+35  </td><td>+47  </td><td>+61  </td><td>+77  </td><td>+95  </td><td>+115 </td><td>+137 </td><td>+161 </td><td>Horsed Life</td></tr>\
                        <tr><td>Warhorse     </td><td>3  </td><td>Horsed Defense           </td><td>+23  </td><td>+29  </td><td>+38  </td><td>+50  </td><td>+65  </td><td>+83  </td><td>+104 </td><td>+128 </td><td>+155 </td><td>+185 </td><td>+218 </td><td>+254 </td><td>Horsed Defense</td></tr>\
                        <tr><td>Warhorse     </td><td>4  </td><td>Life                     </td><td>+7   </td><td>+11  </td><td>+17  </td><td>+25  </td><td>+35  </td><td>+47  </td><td>+61  </td><td>+77  </td><td>+95  </td><td>+115 </td><td>+137 </td><td>+161 </td><td>Life</td></tr>\
                        <tr><td>Warhorse     </td><td>5  </td><td>Defense                  </td><td>+44  </td><td>+52  </td><td>+64  </td><td>+80  </td><td>+100 </td><td>+124 </td><td>+152 </td><td>+184 </td><td>+220 </td><td>+260 </td><td>+304 </td><td>+353 </td><td>Defense</td></tr>\
                        </tbody>\
                        <tbody id=tableWinter>\
                        <tr><th>Advisor      </th><th>Row</th><th>Attribute                </th><th>+1   </th><th>+2   </th><th>+3   </th><th>+4   </th><th>+5   </th><th>+6   </th><th>+7   </th><th>+8   </th><th>+9   </th><th>+10  </th><th>+11  </th><th>+12  </th><th>Attribute</th></tr>\
                        <tr><td>Father Winter</td><td>1  </td><td>Life                     </td><td>+7   </td><td>+11  </td><td>+17  </td><td>+25  </td><td>+35  </td><td>+47  </td><td>+61  </td><td>+77  </td><td>+95  </td><td>+115 </td><td>+137 </td><td>+161 </td><td>Life</td></tr>\
                        <tr><td>Father Winter</td><td>2  </td><td>Range                    </td><td>+1.5 </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>Range</td></tr>\
                        <tr><td>Father Winter</td><td>3  </td><td>Defense                  </td><td>+44  </td><td>+52  </td><td>+64  </td><td>+80  </td><td>+100 </td><td>+124 </td><td>+152 </td><td>+184 </td><td>+220 </td><td>+260 </td><td>+304 </td><td>+353 </td><td>Defense</td></tr>\
                        <tr><td>Father Winter</td><td>4  </td><td>Combat Speed             </td><td>+13  </td><td>+19  </td><td>+28  </td><td>+40  </td><td>+55  </td><td>+73  </td><td>+94  </td><td>+118 </td><td>+145 </td><td>+175 </td><td>+208 </td><td>+244 </td><td>Combat Speed</td></tr>\
                        <tr><td>Father Winter</td><td>5  </td><td>March Speed              </td><td>+16.5</td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>+-   </td><td>March Speed</td></tr>\
                        </tbody>\
                        </table>';
                        
        document.getElementById('advisorKay').addEventListener('change', function(e){
            t.modifyAdvisor();
        }, false);
        document.getElementById('advisorWynn').addEventListener('change', function(e){
            t.modifyAdvisor();
        }, false);
        document.getElementById('advisorMordred').addEventListener('change', function(e){
            t.modifyAdvisor();
        }, false);
        document.getElementById('advisorHarbinger').addEventListener('change', function(e){
            t.modifyAdvisor();
        }, false);
        document.getElementById('advisorWarhorse').addEventListener('change', function(e){
            t.modifyAdvisor();
        }, false);
        document.getElementById('advisorWinter').addEventListener('change', function(e){
            t.modifyAdvisor();
        }, false);
    },

    hide : function (){         // called whenever the main window is hidden, or another tab is selected
        var t = Tabs.Advisor;
    },

    show : function (){         // called whenever this tab is shown
        var t = Tabs.Advisor;
    },
    
    modifyAdvisor : function (){
        var t = Tabs.Advisor;
        var kay = document.getElementById('advisorKay').checked ? 1 : 0;
        var wynn = document.getElementById('advisorWynn').checked ? 1 : 0;
        var mordred = document.getElementById('advisorMordred').checked ? 1 : 0;
        var harbinger = document.getElementById('advisorHarbinger').checked ? 1 : 0;
        var warhorse = document.getElementById('advisorWarhorse').checked ? 1 : 0;
        var winter = document.getElementById('advisorWinter').checked ? 1 : 0;
        
        if (kay)
            document.getElementById('tableKay').style.display = '';
        else
            document.getElementById('tableKay').style.display = 'none';

        if (wynn)
            document.getElementById('tableWynn').style.display = '';
        else
            document.getElementById('tableWynn').style.display = 'none';

        if (mordred)
            document.getElementById('tableMordred').style.display = '';
        else
            document.getElementById('tableMordred').style.display = 'none';

        if (harbinger)
            document.getElementById('tableHarbinger').style.display = '';
        else
            document.getElementById('tableHarbinger').style.display = 'none';
            
        if (warhorse)
            document.getElementById('tableWarhorse').style.display = '';
        else
            document.getElementById('tableWarhorse').style.display = 'none';
            
        if (winter)
            document.getElementById('tableWinter').style.display = '';
        else
            document.getElementById('tableWinter').style.display = 'none';
    
    },
    
}

/*********************************** Options Tab ***********************************/
Tabs.Options = {
  tabOrder: 800,
  myDiv : null,
  fixAvailable : {},

  init : function (div){
    var t = Tabs.Options;
    t.myDiv = div;
    try {      
      m = '<DIV style="height:500px; max-height:500px; overflow-y:auto"><TABLE width=100% class=nbOptions cellspacing=0 cellpadding=0>\
        <TR><TD colspan=2><B>Notebook Config:</b></td></tr>\
        <TR><TD></td><TD><INPUT id=nbupdatenow type=submit value="Update Now"></td></tr>\
        </table><BR><BR></div>';
      div.innerHTML = m;

      document.getElementById('nbupdatenow').addEventListener ('click', function(){
            AutoUpdater_152625.call(true,true);
      },false);    
    
    } catch (e) {
      div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }      
  },

  hide : function (){
  },

  show : function (){
  },

}

/*********************************** Issues Tab ***********************************/
Tabs.Issues = {
  tabOrder: 850,
    tabLabel : 'Issues',            // label to show in main window tabs
    myDiv : null,
    timer : null,

    init : function (div){    // called once, upon script startup
        var t = Tabs.Issues;
        t.myDiv = div;
        div.innerHTML = 'Known Issues<br><br>';
        div.innerHTML += '1. Bloods, Execs do not benefit from infantry tr items<br>';
        div.innerHTML += '2. Siege Walls do not benefit from alloy horseshoes research<br>';
        div.innerHTML += '3. Ore guardian bonus in ascended cities have greater attack stats<br>';
        div.innerHTML += '4. Ore guardian bonus is applied to defending troops (from kabam forums)<br>';
        div.innerHTML += '<br>';
    },

    hide : function (){         // called whenever the main window is hidden, or another tab is selected
        var t = Tabs.Issues;
    },

    show : function (){         // called whenever this tab is shown
        var t = Tabs.Issues;
    },

}

/*********************************** Log Tab ***********************************/
Tabs.ActionLog = {
  tabOrder: 900,
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

function saveRCOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('RCOptions_'+serverID, JSON2.stringify(RCOptions));}, 0);
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

function readRCOptions (){
  var serverID = getServerId();
  s = GM_getValue ('RCOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          RCOptions[k][kk] = opts[k][kk];
      else
        RCOptions[k] = opts[k];
    }
  }
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
    name: "KOC Notebook",
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

function unixTime (){
  return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
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

nbStartup ();