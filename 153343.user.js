// ==UserScript==
// @name           KOC ValeurT
// @version       03122012
// @namespace      ValeurT
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*platforms/kabam*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/kingdoms-of-camelot/play*
// @include        *facebook.com/connect/uiserver.php*
// @include        *facebook.com/*/serverfbml*
// @include        *facebook.com/dialog/feed*
// @include        *facebook.com/dialog/stream.publish*
// @include        *facebook.com/dialog/apprequests*
// @description    KOC ValeurT (Notebook)
// ==/UserScript==


var Version = '03122012';

// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var ENABLE_SAMPLE_TAB = false;
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
  language : 'fr',
};

var GlobalOptions = {
  nbWatchdog   : false,
  nbWideScreen : true,
  nbWideScreenStyle : 'normal',
  autoPublishPrivacySetting : 80,
  nbupdate : false,
  nbupdatebeta : 0,
  nbNoMoreKabam : false,
  escapeurl : null,
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
  readRCOptions();

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
    .nbPopup  {border:5px ridge #666; opacity:2; -moz-border-radius:25px; -moz-box-shadow: 1px 1px 5px #000000; }\
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
  AddMainTabLink('Valeur', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  actionLog ("KOC Valeur Throne v"+ Version +" Charger");

  if (Options.nbWinIsOpen && Options.nbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  setInterval (DrawLevelIcons,1250);
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
    div.innerHTML = '<CENTER><BR>This is a sample tab implementation<BR><BR>Affichage de l\'Alliment dans la ville '+ cityName +' : <SPAN id=nbSampleFood>0</span>\
        <BR><BR>(L\'Allimentation est mise a jour toute les 5 secondes)</center>';
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
    tabLabel : 'ValeurThrone',            // label to show in main window tabs
    myDiv : null,
    timer : null,

    init : function (div){    // called once, upon script startup
        var t = Tabs.ThroneCaps;
        t.myDiv = div;
        div.innerHTML = '<TABLE border=1>\
                    <TR><TD align=Left><b>Attribute</b></td>        <TD><b>Cap Valeur (+buff/-debuff)</b></td></tr>\
                    <TR><TD align=Left>Attaque</td>                  <TD>+800&#37;/-25&#37;</td></tr>\
                    <TR><TD align=Left>Défense</td>                 <TD>+4000&#37;/-25&#37;</td></tr>\
                    <TR><TD align=Left>Vie</td>                    <TD>+200&#37;/-50&#37;</td></tr>\
                    <TR><TD align=Left>Vitesse-Combat</td>            <TD>+300&#37;/-50&#37;</td></tr> \
                    <TR><TD align=Left>Range/Portée</td>                   <TD>+150&#37;/-25&#37;</td></tr>\
                    <TR><TD align=Left>Charge</td>                    <TD>+500&#37;/-0&#37;</td></tr>\
                    <TR><TD align=Left>Géometrie</td>                <TD>+1&#37;/-0.1&#37;</td></tr>\
                    <TR><TD align=Left>Taille-Marche</td>              <TD>+150&#37;</td></tr>\
                    <TR><TD align=Left>Vitesse-Marche</td>             <TD>+500&#37;/-10&#37;</td></tr>\
                    <TR><TD align=Left>Vitesse-Entrainement</td>       <TD>4000&#37;</td></tr>\
                    <TR><TD align=Left>Vitesse-Construction</td>      <TD>600&#37;</td></tr>\
                    <TR><TD align=Left>Vitesse-Recherche</td>          <TD>400&#37;</td></tr>\
                    <TR><TD align=Left>Vitesse-Elaboration</td>          <TD>200&#37;</td></tr>\
                    <TR><TD align=Left>Succes-Elaboration</td>        <TD>25&#37;</td></tr>\
                    <TR><TD align=Left>Reduction-Defici</td>  <TD>33&#37;</td></tr>\
                    <TR><TD align=Left>Resource Production</td>     <TD>2000&#37;</td></tr>\
                    <TR><TD align=Left>Resource Cap</td>            <TD>200&#37;</td></tr>\
                    <TR><TD align=Left>Protection-Entrepot</td>   <TD>1000&#37;</td></tr>\
                    <TR><TD align=Left>Bonheur</td>                  <TD>50&#37;</td></tr>\
                    <TR><TD align=Left>Chutte-Item</td>               <TD>20&#37;</td></tr></table><br><br>';
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
    tabLabel : 'Range',            // label to show in main window tabs
    myDiv : null,
    timer : null,

    init : function (div){    // called once, upon script startup
        var t = Tabs.RangeCalc;
        t.myDiv = div;
        div.innerHTML = 'Entrez que des chiffres exact (Ranged sont les archet donc (Portée d\Unitées à distance) entrez aussi votre portée sur bannière.<br><br>\
                    <table><tr><td></td><td>Mon Range</td><td>Range Enemi(e)</td></tr>\
                    <tr><td>Range Buff:   </td><td><input id=myrangebuff type=text value=0></td>   <td><input id=opprangebuff type=text value=0> Tous.</td></tr>\
                    <tr><td>Range Débuff: </td><td><input id=myrangedebuff type=text value=0></td> <td><input id=opprangedebuff type=text value=0> Tous.</td></tr>\
                    <tr><td>Siege Buff:   </td><td><input id=mysiegebuff type=text value=0></td>   <td><input id=oppsiegebuff type=text value=0> catapulte baliste.</td></tr>\
                    <tr><td>Siege Débuff: </td><td><input id=mysiegedebuff type=text value=0></td> <td><input id=oppsiegedebuff type=text value=0> catapulte baliste.</td></tr>\
                    <tr><td>Ranged Buff:  </td><td><input id=myrangedbuff type=text value=0></td>  <td><input id=opprangedbuff type=text value=0> archet.</td></tr>\
                    <tr><td>Ranged Débuff:</td><td><input id=myrangeddebuff type=text value=0></td><td><input id=opprangeddebuff type=text value=0> archet.</td></tr></table>\
                    <br><br>\
                    Un Nombre négatif signifie que vous étes sous sa portée,(il a le decu)<br>\
                    Difference de portée de Siège<input id=siegewinner type=text value=0> catapulte baliste.<br>\
                    Difference de portée à distance<input id=rangedwinner type=text value=0> Archet.<br><br>';

        t.loadRCOptions();

        document.getElementById('myrangebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
            RCOptions.rb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('myrangedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
            RCOptions.rdb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('mysiegebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
            RCOptions.sb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('mysiegedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
            RCOptions.sdb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('myrangedbuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
            RCOptions.rrb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('myrangeddebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
            RCOptions.rrdb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('opprangebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
            RCOptions.orb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('opprangedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
            RCOptions.ordb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('oppsiegebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
            RCOptions.osb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('oppsiegedebuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
            RCOptions.osdb = e.target.value;
            saveRCOptions();
            t.calculate();
        }, false);
        document.getElementById('opprangedbuff').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!');
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
    tabLabel : 'CalculUnitée',            // label to show in main window tabs
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

    
    init : function (div){    // called once, upon script startup
        var t = Tabs.UnitCalc;
        t.myDiv = div;
        div.innerHTML = '<center><b>Statistiques-Unitées</b></center><br>\
            <table border=1><tr><td><b>Unitée</b></td><td><b>Vie</b></td><td><b>Attaq</b></td><td><b>Def</b></td><td><b>Vitess</b></td><td><b>Range</b></td></tr>\
                            <tr><td>Milicien      </td><td id=ucTrp0Life></td><td id=ucTrp0Atk></td><td id=ucTrp0Def></td><td id=ucTrp0Spd></td><td id=ucTrp0Rng></td></tr>\
                            <tr><td>Eclaireur   </td><td id=ucTrp1Life></td><td id=ucTrp1Atk></td><td id=ucTrp1Def></td><td id=ucTrp1Spd></td><td id=ucTrp1Rng></td></tr>\
                            <tr><td>Piquier    </td><td id=ucTrp2Life></td><td id=ucTrp2Atk></td><td id=ucTrp2Def></td><td id=ucTrp2Spd></td><td id=ucTrp2Rng></td></tr>\
                            <tr><td>Paladin   </td><td id=ucTrp3Life></td><td id=ucTrp3Atk></td><td id=ucTrp3Def></td><td id=ucTrp3Spd></td><td id=ucTrp3Rng></td></tr>\
                            <tr><td>Archer  </td><td id=ucTrp4Life></td><td id=ucTrp4Atk></td><td id=ucTrp4Def></td><td id=ucTrp4Spd></td><td id=ucTrp4Rng></td></tr>\
                            <tr><td>Cavalier    </td><td id=ucTrp5Life></td><td id=ucTrp5Atk></td><td id=ucTrp5Def></td><td id=ucTrp5Spd></td><td id=ucTrp5Rng></td></tr>\
                            <tr><td>Lourd      </td><td id=ucTrp6Life></td><td id=ucTrp6Atk></td><td id=ucTrp6Def></td><td id=ucTrp6Spd></td><td id=ucTrp6Rng></td></tr>\
                            <tr><td>Baliste   </td><td id=ucTrp7Life></td><td id=ucTrp7Atk></td><td id=ucTrp7Def></td><td id=ucTrp7Spd></td><td id=ucTrp7Rng></td></tr>\
                            <tr><td>Belier     </td><td id=ucTrp8Life></td><td id=ucTrp8Atk></td><td id=ucTrp8Def></td><td id=ucTrp8Spd></td><td id=ucTrp8Rng></td></tr>\
                            <tr><td>Catapulte     </td><td id=ucTrp9Life></td><td id=ucTrp9Atk></td><td id=ucTrp9Def></td><td id=ucTrp9Spd></td><td id=ucTrp9Rng></td></tr>\
                            <tr><td>Epines-S   </td><td id=ucTrp10Life></td><td id=ucTrp10Atk></td><td id=ucTrp10Def></td><td id=ucTrp10Spd></td><td id=ucTrp10Rng></td></tr>\
                            <tr><td>Executeur   </td><td id=ucTrp11Life></td><td id=ucTrp11Atk></td><td id=ucTrp11Def></td><td id=ucTrp11Spd></td><td id=ucTrp11Rng></td></tr>\
                            </table><hr>\
                            <center><b>Configuration</b></center><br>\
                            <b>Points-Combat-Chevalier</b><input id=ucKnightLevel type=text value=50 size=4>Augmente l\'attaque ainsi que sur la defence<br><br>\
            <table border=1><tr><td><b>Recherche</b></td><td><b>Niveaux</b></td><td></td><td><b>Statistique</b></td><td><b>Vie</b></td><td><b>Atk</b></td><td><b>Def</b></td><td><b>Vitess</b></td><td><b>Range</b></td></tr>\
                            <tr><td>Potions-Guerrison (Durée de Vie)  </td><td><input id=ucResHP type=text value=12 size=4></td><td></td><td>Throne Buff</td>            <td><input id=ucLifeMod    type=text value=0 size=4></td><td><input id=ucAtkMod    type=text value=0 size=4></td><td><input id=ucDefMod    type=text value=0 size=4></td><td><input id=ucSpdMod    type=text value=0 size=4></td><td><input id=ucRngMod    type=text value=0 size=4></td></tr>\
                            <tr><td>Fleches-Empoisonées (Attaque)     </td><td><input id=ucResPE type=text value=12 size=4></td><td></td><td>Throne Infanterie Buff</td>   <td><input id=ucLifeModInf type=text value=0 size=4></td><td><input id=ucAtkModInf type=text value=0 size=4></td><td><input id=ucDefModInf type=text value=0 size=4></td><td><input id=ucSpdModInf type=text value=0 size=4></td><td><input id=ucRngModInf type=text value=0 size=4></td></tr>\
                            <tr><td>Alliage-Metal (defense)      </td><td><input id=ucResMA type=text value=12 size=4></td><td></td><td>Throne Ranged Buff</td>     <td><input id=ucLifeModRng type=text value=0 size=4></td><td><input id=ucAtkModRng type=text value=0 size=4></td><td><input id=ucDefModRng type=text value=0 size=4></td><td><input id=ucSpdModRng type=text value=0 size=4></td><td><input id=ucRngModRng type=text value=0 size=4></td></tr>\
                            <tr><td>Alliage-Fer-A-Cheval (Vitesse)  </td><td><input id=ucResAH type=text value=12 size=4></td><td></td><td>Throne Siege Buff</td>      <td><input id=ucLifeModSig type=text value=0 size=4></td><td><input id=ucAtkModSig type=text value=0 size=4></td><td><input id=ucDefModSig type=text value=0 size=4></td><td><input id=ucSpdModSig type=text value=0 size=4></td><td><input id=ucRngModSig type=text value=0 size=4></td></tr>\
                            <tr><td>Empenage (range) </td><td><input id=ucResFL type=text value=12 size=4></td><td></td><td>Throne Cavalerie Buff</td>     <td><input id=ucLifeModHor type=text value=0 size=4></td><td><input id=ucAtkModHor type=text value=0 size=4></td><td><input id=ucDefModHor type=text value=0 size=4></td><td><input id=ucSpdModHor type=text value=0 size=4></td><td><input id=ucRngModHor type=text value=0 size=4></td></tr></table><br>\
                            TRONE Bonus Articles appliquées<br><br>\
            <table border=1><tr><td><b>Gardiens</b></td><td><b>Bois</b></td><td><b>Minerai</b></td><td><b>Nourriture</b></td><td><b>Pierre</b></td></tr>\
                            <tr><td>Niveaux</td>                  <td><input id=ucWood       type=text value=9 size=4></td>    <td><input id=ucOre   type=text value=9 size=4></td><td><input id=ucFood   type=text value=9 size=4></td><td><input id=ucStone    type=text value=9 size=4></td></tr>\
                            <tr><td>Active</td>                 <td><input id=ucWoodAct type=radio name=ucGuard checked></td><td><input id=ucOreAct type=radio name=ucGuard></td><td><input id=ucFoodAct type=radio name=ucGuard></td><td><input id=ucStoneAct type=radio name=ucGuard></td></tr>\
                            <tr><td>Si Bonus</td><td><input id=ucGuardSet type=checkbox unchecked></td><td></td><td></td><td></td></tr>\
                            <tr><td>Troupes en Defense avec(Gardien Bois)</td><td><input id=ucDefending type=checkbox unchecked></td><td></td><td></td><td></td></tr>\
                            <tr><td>Item Booster</td><td>+20atk<input id=ucItemAtk20 type=checkbox unchecked></td><td>+50atk<input id=ucItemAtk50 type=checkbox unchecked></td><td>+20def<input id=ucItemDef20 type=checkbox unchecked></td><td>+50def<input id=ucItemDef50 type=checkbox unchecked></td></tr></table><br>';
        // Event listener Knight Level
        document.getElementById('ucKnightLevel').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1) alert('Entre un chiffre correct!!');
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
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucLifeModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucAtkMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucAtkModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucDefMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucDefModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucSpdMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucSpdModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ucRngMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ucRngModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0) alert('Entre un chiffre correct!!');
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

        //Trp10 - blood
        //verified on 11/30 that bloods don't use infantry buff for atk/def. other stats unknown
        document.getElementById('ucTrp10Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp10.Life + t.Trp10.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),0)/100)));
        document.getElementById('ucTrp10Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp10.Atk  + t.Trp10.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),0)/100)));
        document.getElementById('ucTrp10Def').innerHTML  = t.round2decimals(                   (t.Trp10.Def  + t.Trp10.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),0)/100)));
        document.getElementById('ucTrp10Spd').innerHTML  = t.round2decimals(                   (t.Trp10.Spd  + t.Trp10.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),0)/100)));
        document.getElementById('ucTrp10Rng').innerHTML  = t.round2decimals(                   (t.Trp10.Rng  + t.Trp10.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),0)/100)));

        //Trp11 - exec
        //verified on 11/30 that exec don't use infantry buff for atk/def. other stats unknown
        document.getElementById('ucTrp11Life').innerHTML = t.round2decimals( (1 + guardLife) * (t.Trp11.Life + t.Trp11.Life * (resLife                    + t.maxBuff('life',parseFloat(document.getElementById('ucLifeMod').value),0)/100)));
        document.getElementById('ucTrp11Atk').innerHTML  = t.round2decimals( (1 + guardAtk)  * (t.Trp11.Atk  + t.Trp11.Atk  * (resAtk  + knight + itemAtk + t.maxBuff('atk', parseFloat(document.getElementById('ucAtkMod' ).value),0)/100)));
        document.getElementById('ucTrp11Def').innerHTML  = t.round2decimals(                   (t.Trp11.Def  + t.Trp11.Def  * (resDef  + knight + itemDef + t.maxBuff('def', parseFloat(document.getElementById('ucDefMod' ).value),0)/100)));
        document.getElementById('ucTrp11Spd').innerHTML  = t.round2decimals(                   (t.Trp11.Spd  + t.Trp11.Spd  * (                             t.maxBuff('spd', parseFloat(document.getElementById('ucSpdMod' ).value),0)/100)));
        document.getElementById('ucTrp11Rng').innerHTML  = t.round2decimals(                   (t.Trp11.Rng  + t.Trp11.Rng  * (                             t.maxBuff('rng', parseFloat(document.getElementById('ucRngMod' ).value),0)/100)));

        
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
        <TR><TD></td><TD><INPUT id=nbupdatenow type=submit value="Mise a jour"></td></tr>\
        </table><BR><BR></div>';
      div.innerHTML = m;

      document.getElementById('nbupdatenow').addEventListener ('click', function(){
            AutoUpdater_153343.call(true,true);
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




/*********************************** Log Tab ***********************************/
Tabs.ActionLog = {
  tabOrder: 900,
  tabLabel : 'Journal',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,

  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=nbStat>JOURNAL DES ACTIONS - VERSION: '+ Version+'</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
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
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>Erreur Occurence:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Reesayez Automatiquement dans <SPAN id=paretrySeconds></b></span> secondes ...<BR><BR><INPUT id=paretryCancel type=submit value="ANNULE et Reesayez" \>';
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

        div.innerHTML = '<div style="text-align:center"><div>'+confirm_msg+'</div><br/><div>Press OK pour continuer.</div><br><button id="modal_js_confirm_ok_button">OK</button> <button id="modal_js_confirm_cancel_button">Supprime</button></div>';
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

var AutoUpdater_153343 = {
    id: 153343,
    days: 1,
    name: "KOC Valeur Throne",
    version: Version,
    beta: GlobalOptions.nbupdatebeta,
    betaUrl : 'http://koc-power-pdx.googlecode.com/svn/beta/kocpower-multi-pdx.user.js',
    time: new Date().getTime(),
    call: function(response, secure) {
        GM_xmlhttpRequest({
            method: 'GET',
        url: this.beta ? this.betaUrl : 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+this.id+'.meta.js',
        onload: function(xpr) {AutoUpdater_153343.compare(xpr, response);},
            onerror: function(xpr) {if (secure) AutoUpdater_153343.call(response, false);}
        });
    },
    enable: function() {
        GM_registerMenuCommand("Enable "+this.name+" updates", function() {
            GM_setValue('updated_153343', new Date().getTime()+'');
            AutoUpdater_153343.call(true, true)
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
            if ( (xpr.responseText.match("Cette page n\'existe plus")) || (this.xname[1] != this.name) ) {
                //GM_setValue('updated_153343', 'off');
            }
            return false;
        }
        var updated = this.compareVersion(this.xversion, this.version);

        if ( updated ) {

            display_confirm('Nouvelle version de '+this.xname+' est disponible.Souhaitez vous installer la derniere version?',
                // Ok
                function(){
                    try {
                        location.href = AutoUpdater_153343.beta ? AutoUpdater_153343.betaUrl :  'http://userscripts.org/scripts/source/153343.user.js';
                    } catch(e) {}
                },
                // Cancel
                function(){
                    if ( AutoUpdater_153343.xversion ) {
                        if(confirm('Voulez vous désactiver l\auto mise à jour pour ce script?')) {
                            //GM_setValue('updated_153343', 'off');
                            GlobalOptions.nbupdate = false;
                            GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
                            AutoUpdater_153343.enable();
                            alert('La mise à jour automatique de ce script peut etre réactivez dans l\'onglet Options.');
                        }
                    }
                }
            );

        } else if (response){
            alert('Aucune mise à jour du script '+this.name);
        }
    },
    check: function(tf) {
        if (!tf){
            this.enable();
        } else {
            GM_registerMenuCommand("Vérifiez "+this.name+" les mise a jour", function() {
                GM_setValue('updated_153343', new Date().getTime()+'');
                AutoUpdater_153343.call(true, true)
            });
            if (+this.time > (+GM_getValue('updated_153343', 0) + 1000*60*60*24*this.days)) {
                GM_setValue('updated_153343', this.time+'');
                this.call(false, true);
            }
        }
    }
};
if (typeof(GM_xmlhttpRequest) !== 'undefined' && typeof(GM_updatingEnabled) === 'undefined') { // has an updater?
    try {
        AutoUpdater_153343.check(GlobalOptions.nbupdate);
    } catch(e) {
        AutoUpdater_153343.check(GlobalOptions.nbupdate);
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