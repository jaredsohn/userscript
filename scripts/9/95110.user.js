// ==UserScript==
// @name           KOC Power Tools
// @namespace      mat
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @resource       PROTOTYPEJS http://cdn1.kingdomsofcamelot.com/fb/e2/src/js/prototype-28.js
// XXinclude        http://apps.facebook.com/kingdomsofcamelot/*

// ==/UserScript==

var DEBUG_BUTTON = true;
var DEBUG_TRACE = false;
var Version = '20101109a';
var ENABLE_4x = true;
var MAP_DELAY = 1000;

var Options = {
  includeMarching:true,
  encRemaining : true,
  maxIdlePop   : false,
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  wildType     : 1,
  unownedOnly  : true,
  fixTower     : true,
  fixTower2    : true,
  fixMapDistance: true,
  fixMsgCount  : true,
};
unsafeWindow.pt_Options=Options;  

// TODO: continue testing 4x
// TODO: Dismiss button for retry popup ?
// TODO: Force KOC to update training queues, marches, etc for non-current city ?

/***/
// TODO: test this
//Make iFrame wider
//$('#content div').width($(window).width());
//$('#content div div').width($(window).width());
//$('#app_content_130402594779 div div div iframe').width($(window).width());
//Remove left and right edge
/***/



if(!this.JSON2){JSON2={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON2.stringify!=='function'){JSON2.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON2.parse!=='function'){JSON2.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}})();



// example: http://www150.kingdomsofcamelot.com
function GetServerId() {
  var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
  if(m)
    return m[1];
  return '';
}

function logit (msg){
  var serverID = GetServerId();
  now = new Date();
  GM_log (serverID +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}


var Cities = {};
var Seed = unsafeWindow.seed;
setCities();

window.name = 'GMSCRIPT';
logit ("* matKOCutil v"+ Version +" Loaded");
readOptions();
AddMainTabLink('Power', 'idStuffButton', eventHideShow);


var winDebug = null;
var debugTA = null;
function debugWin(){0
  if (!winDebug || winDebug.closed){
    winDebug = createWindow ('', 'debug', 900, 700);
    winDebug.document.write ('<BR><TEXTAREA readonly id=debugTA cols=100 rows=40></textarea><BR>');
    debugTA = winDebug.document.getElementById ('debugTA');
  }
  winDebug.focus();
}

d = new Date();

mainContent = "<STYLE>\
    .mTopBar {background: #ccc; border: none; height: 21px; padding-left: 8px}\
    .matTab {}\
    .matTabSel {font-size: 13px; color: #000; border: 1px; border-style: solid solid none solid; margin:6px; padding-left:8px; padding-right:8px; background: #f6f3fc; font-weight: 'bold'}\
    .matTabNotSel {font-size: 13px; color: #fff; border: 1px; border-style: solid solid none solid; border-color: #000; margin:6px; padding-left:8px; padding-right:8px; background: #888; font-weight: 'normal'}</style>\
    <TABLE style='border: none' cellspacing=0 cellpadding=0 width=100% height=100%>\
    <TR class='mTopBar' valign=bottom>\
    <TD class='mTopBar' align=left><DIV id=idButs></div></td>\
    <TD class='mTopBar' align=right>"+ Version +"&nbsp;</td>\
    <TD valign=middle onmouseover='this.style.cursor=\"pointer\"' style='color: #fff; background: #555; padding-left: 5px; padding-right: 5px;' id=xClose width=10 align=right><B>X</td></tr>\
  <TR><TD style='border: none; padding: 10px;' id=tdContent height=100% valign=top colspan=3>\
  </td></tr></table></div>";

mainDiv = createPopup (mainContent);


function saveOptions (){
  var serverID = GetServerId();
  GM_setValue ('Options_'+serverID, JSON2.stringify(Options));
//  unsafeWindow.pt_Options=Options;
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

DebugTimer = {
  startTime : 0,
  start : function (){
    now = new Date();
    this.startTime = now.getTime();
  },
  display : function (label, noReset){
    now = new Date();
    elapsed = now.getTime() - this.startTime;
    logit (label +": "+ elapsed/10);
    if (noReset===null || !noReset)
      this.startTime = now.getTime();
  },
};



var my = {};

function dispInputXY (span){
  function clickedCityBut (e){
    city = Cities.cities[e.target.id.substring(3)];
    document.getElementById ('csx').value = city.x;
    document.getElementById ('csy').value = city.y;
  }
  span.style.verticalAlign = 'bottom';
  m = 'X: <INPUT id=csx size=3 /> &nbsp; Y: <INPUT id=csy size=3/> &nbsp; &nbsp; &nbsp; or, choose city: &nbsp;';
  for (i=0; i<Cities.cities.length; i++)
    m += '<INPUT id=csc'+ i +' type=submit name="'+ Cities.cities[i].id +'" value='+ (i+1) +' />';
  span.innerHTML = m;
  for (i=0; i<Cities.cities.length; i++)
    document.getElementById ('csc'+i).addEventListener('click', clickedCityBut, false);
}

GM_addStyle ('.xtab {padding-right: 5px; border:none; background:none;}' );


/*********************************** Info ***********************************/

my.Info = {
  cont : null,
  state : null,
    
  init : function (){
    t = my.Info;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    t = my.Info;
    return t.cont;
  },

  hide : function (){
    t = my.Info;
  },

  show : function (){
    fortmight = {
      u53: "4",
      u55: "7",
      u60: "1",
      u61: "2",
      u62: "3",
    };
    t = my.Info;
    rownum = 0;
    if (t.state == null){
      m = '<STYLE>.xtabH {background:#ffffe8; border:none; padding-right: 5px; padding-left: 5px; margin-left:10px; }\
              .xtabHL { background:#ffffe8; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left:5px; margin-left:10px; }\
              .xtabL { background:none; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left: 5px; margin-left:10px; }\
              .xtabLine { padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none }</style>\
          <BR><CENTER><B>UNIT INFORMATION</b></center><BR><TABLE cellpadding=1 cellspacing=0>\
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
      t.cont.innerHTML = m;       
      t.state = 1; 
    }
  }, 
}



/*********************************** Options ***********************************/
function getFunctionName (func){
  var name=/\W*function\s+([\w\$]+)\(/.exec(func);
  if (!name)
    return '';
  return name[1];
}

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


// ***** TODO:  Change 'bug fixes' to alter/restore code in unsafeWindow when each is enabled/disabled i/o the code looking at Options.fixXXX

my.Options = {
  cont : null,
  state : null,
  fixAvailable : {},

  init : function (){
    t = my.Options;

    function msgCount_hook (a){
      if (!pt_Options.fixMsgCount){
        $("chrome_messages_notify").innerHTML = a;
        $("chrome_messages_notify").show();
        $("chrome_messages_notifyL").hide();
        return;
      }
      if (parseInt(seed.newMailCount) > 0) {
        $("chrome_messages_notifyL").innerHTML = parseInt(seed.newMailCount);
        $("chrome_messages_notifyL").show();
      } else {
        $("chrome_messages_notifyL").hide();
      }
      reports = parseInt(seed.newTradeReports) + parseInt(seed.newReportCount);
      if (reports < 1)
        $("chrome_messages_notify").hide();
      else {
        $("chrome_messages_notify").innerHTML = reports;
        $("chrome_messages_notify").show();
      }
    }
    function setupMsgCountFix (checkboxId){
      e = document.getElementById('chrome_messages_notify');
      span = document.createElement('span');
      span.className='notify';
      span.style.display='none';
      span.id = 'chrome_messages_notifyL';
      span.style.left = '6px';
      e.parentNode.insertBefore (span, e);
      if ( ! alterUwFunction ('messages_notify_bug', [
            ['$("chrome_messages_notify").innerHTML = a;', 'msgCount_hook(a);'],
            ['$("chrome_messages_notify").show();', ''],
            ['$("chrome_messages_notify").hide();', '$("chrome_messages_notify").hide(); $("chrome_messages_notifyL").hide();']  ]))
        return false;
      addUwFunction (msgCount_hook);
//logit (unsafeWindow.messages_notify_bug.toString().substr(0,1000));
//logit (unsafeWindow.msgCount_hook.toString());
      return true;
    }

    function towerFix_hook (atkinc, e){
      var city = Cities.byID[atkinc.toCityId];
      if (!city){  // FALSE TOWER REPORT ???
        e.push ('<B>FALSE REPORT!</b>');
        return;
      }
      if (!Options.fixTower){
        e.push (city.name);
        return;
      }
      if (city.tileId == atkinc.toTileId){
        e.push(city.name + ' ('+ city.x + ','+ city.y +')');
        return;
      }
      wilds = Seed.wilderness['city'+atkinc.toCityId];
      m = '';
      for (k in wilds){
        if (wilds[k].tileId == atkinc.toTileId){
          m = ' at '+ wilds[k].xCoord + ','+ wilds[k].yCoord;
          break;
        }
      }
      e.push(city.name + ', <B>WILD'+ m +'</b>');
    }
    function setupTowerFix (){
      if ( !alterUwFunction ('attack_viewimpending_view', [['e.push(attack_cityidtoname(a.toCityId))', 'towerFix_hook(a, e)']]))
        return false;
      addMyFunction (towerFix_hook);
      return true;
    }

    function towerFix2_hook1 (){
      if (Options.fixTower2)
        return false;
      else
        return true;
    }
    function setupTowerFix2 (){
      if ( !alterUwFunction ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = towerFix2_hook1(); }']]))
        return false;
      if ( !alterUwFunction ('attack_viewimpending', [[/.*} else {/im, '} else if (!pt_Options.fixTower2) {']]))
        return false;
      addMyFunction (towerFix2_hook1);
      return true;
    }
    
    function fixMapDistance_hook(cityX, cityY, tileX, tileY){
      city = Cities.byID[unsafeWindow.currentcityid];
      if (Options.fixMapDistance)
        return distance (city.x, city.y, tileX, tileY);
      else
        return distance (cityX, cityY, tileX, tileY);
    }
    function setupDistanceFix (){
      if ( ! TESTalterUwFunction ('this.distance', 'fixMapDistance_hook'))
        return false;
      addMyFunction (fixMapDistance_hook);
      return true;
    }

    t.fixAvailable.fixTower = setupTowerFix ();
    t.fixAvailable.fixMapDistance = setupDistanceFix ();
    t.fixAvailable.fixMsgCount = setupMsgCountFix ();
    t.fixAvailable.fixTower2 = setupTowerFix2();
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    t = my.Options;
    return t.cont;
  },

  hide : function (){
    t = my.Options;
  },

  show : function (){
    /****
    function setupCheckbox (cbId, optionName, isAvailable){
      var checkbox = document.getElementById(cbId);
      if (!isAvailable){
        checkbox.disabled = true;
        return;
      }
      if (Options[optionName])
        checkbox.checked = true;
      var code = 'function (){Options.'+ optionName +'=document.getElementById("'+ cbId +'").checked; saveOptions();}';
      var func = eval (code);  // RUNS IN UNSAFEWINDOW!!! BAHHHHH!!!
      checkbox.addEventListener ('change', func, false);
    }
    ****/

    t = my.Options;
    if (t.state != 1){
      m = '<BR><TABLE>\
        <TR><TD class=xtab colspan=2><B>FEATURES:</b></td></tr>\
        <TR><TD class=xtab><INPUT id=togMsgCountFix type=checkbox /></td><TD class=xtab>Show number of new messages separately from number of reports on Messages icon.</td></tr>\
        <TR><TD class=xtab colspan=2><BR><BR><B>BUG FIXES:</b></td></tr>\
        <TR><TD class=xtab><INPUT id=togTowerFix type=checkbox /></td><TD class=xtab>Fix tower report to show exact target (city, wild or invalid)</td></tr>\
        <TR><TD class=xtab><INPUT id=togMapDistFix type=checkbox /></td><TD class=xtab>Fix map to show distances from currently selected city, instead of always the first city.</td></tr>\
        <TR><TD class=xtab><INPUT id=togTowerFix2 type=checkbox /></td><TD class=xtab>Fix false attack alerts created from scouting missions.</td></tr>\
        </table><BR><BR><HR>Note that if a checkbox is greyed out there has probably been a change of KofC\'s code, rendering the option inoperable.';
      t.cont.innerHTML = m;

      checkbox = document.getElementById('togTowerFix');
      if (!t.fixAvailable.fixTower){
        checkbox.disabled = true;
      } else {
       if (Options.fixTower)
         checkbox.checked = true;
       checkbox.addEventListener ('change', function() {Options.fixTower=document.getElementById('togTowerFix').checked; saveOptions();}, false);
      }
      checkbox = document.getElementById('togTowerFix2');
      if (!t.fixAvailable.fixTower2){
        checkbox.disabled = true;
      } else {
       if (Options.fixTower2)
         checkbox.checked = true;
       checkbox.addEventListener ('change', function() {Options.fixTower2=document.getElementById('togTowerFix2').checked; saveOptions();}, false);
      }
      checkbox = document.getElementById('togMapDistFix');
      if (!t.fixAvailable.fixMapDistance){
        checkbox.disabled = true;
      } else {
       if (Options.fixMapDistance)
         checkbox.checked = true;
       checkbox.addEventListener ('change', function() {Options.fixMapDistance=document.getElementById('togMapDistFix').checked; saveOptions();}, false);
      }
      checkbox = document.getElementById('togMsgCountFix');
      if (!t.fixAvailable.fixMsgCount){
        checkbox.disabled = true;
      } else {
       if (Options.fixMsgCount)
         checkbox.checked = true;
       checkbox.addEventListener ('change', function() {Options.fixMsgCount=document.getElementById('togMsgCountFix').checked; saveOptions(); unsafeWindow.messages_notify_bug();}, false);
      }
      t.state = 1;
    }
  },
}


/*********************************  SEARCH *************************************/
/*** exported from KOCattack
expDat = '{"attack_150_40,498":"{\"type\":0,\"comment\":\"\",\"time\":1288419704.762,\"troops\":[null,0,0,0,0,0,0,0,33333,0,0,0,0]}","Options_150":"{\"attackDelay\":15,\"attackTypeCamp\":true,\"attackOrder\":\"closest\",\"autoRemoveReports\":true,\"attackSecsSinceLastCity\":43200,\"attackSecsSinceLastCamp\":3600,\"attackSecsSinceLastWild\":3600,\"attackSecsSinceLastTransport\":60,\"randomPercent\":20,\"keepReports\":10,\"attackMaxDistance\":60,\"waitAfterCitiesDone\":15,\"autoAttackCitiesDoneMax\":3,\"changeCitySecs\":15,\"retryMarch\":true,\"noViewReports\":false,\"chromeKeepReports\":2,\"percentOfPopToTrain\":100,\"autoGoldHappiness\":99,\"okCities\":[1,true,true,true,false,false,false,false,false,1],\"impendingAttackUrl\":\"\",\"attackTypeCity\":false,\"attackTypeWild\":false,\"attackTypeTransport\":false,\"lockAttackFromCity\":false}","attack_150_38,494":"{\"type\":0,\"comment\":\"\",\"time\":1288419693.014,\"troops\":[null,0,0,0,0,0,16666,0,0,0,0,0,0]}"}';
obj = JSON2.parse (expDat);
logit ("OBJ: "+ inspect (obj, 8, 1));
return;
***/
function htmlOptions (a, curVal){
  m = '';
  for (k in a)
    m += '<OPTION value="'+ k +'"'+ (k==curVal?' SELECTED':'')  +'>'+ a[k] +'</option>';
  return m;
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

my.Search = {
  cont:null,
  state : null,

  init : function (){
    this.cont = document.createElement('div');
    return this.cont;
  },

  getContent : function (){
    return this.cont;
  },

  hide : function (){
  },

  show : function (cont){
    t = my.Search;
    if (t.state == null){
      this.cont.innerHTML = '\
        <TABLE><TR valign=bottom><TD width=100 align=right>Search for: &nbsp;</td><TD>\
        <SELECT id="srcType">\
          <OPTION value=0>Barb Camp</option>\
          <OPTION value=1>Wilderness</option>\
        </select></td></tr>\
        </table>\
        <DIV id="srcOpts" style="height:140px"></div>\
        <DIV id="srcResults" style="height:430px; max-height:430px;"></div>';
      var psearch = document.getElementById ("srcType");
      m = '<TABLE><TR valign=bottom><TD width=100 align=right>Center: &nbsp;</td><TD><SPAN id=spInXY></span>\
        </td></tr><TR><TD align=right>Max. Distance: &nbsp;</td><TD><INPUT id=srcDist size=4 value=10 /></td></tr>';
      m += '<TR><TD colspan=2 align=center><INPUT id=srcStart type=submit value="Start Search"/></td></tr>';
      m += '</table>';
      document.getElementById ('srcOpts').innerHTML = m;
      dispInputXY (document.getElementById ('spInXY'));
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
    t = my.Search;
    if (t.searchRunning){
      t.stopSearch ('<font color=#660000><B>SEARCH CANCELLED!</b></font>');
      return;
    }
    t.opt.searchType = document.getElementById ('srcType').value;
    t.opt.startX = parseInt(document.getElementById ('csx').value);
    t.opt.startY = parseInt(document.getElementById ('csy').value);
    t.opt.maxDistance = parseInt(document.getElementById ('srcDist').value);

    errMsg = '';
    if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>749)
      errMsg = "X must be between 0 and 749<BR>";
    if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>749)
      errMsg += "Y must be between 0 and 749<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1 || t.opt.maxDistance>75)
      errMsg += "Max Distance must be between 1 and 75<BR>";
    if (errMsg != ''){
      document.getElementById('srcResults').innerHTML = '<FONT COLOR=#660000>ERROR:</font><BR><BR>'+ errMsg;
      return;
    }

    t.searchRunning = true;
    document.getElementById ('srcStart').value = 'Stop Search';
    m = '<STYLE>.cTab {border: none; background: #ffc} .dTab{border: none; background: none}</style>\
      <TABLE width=100% cellspacing=0><TR height=20><TD class=cTab width=125><DIV id=statSearched></div></td>\
        <TD class=cTab align=center><DIV id=statStatus></div></td>\
        <TD class=cTab align=right width=125><DIV id=statFound></div></td></tr></table>\
      <TABLE width=100%><TR><TD><DIV id=divOutTab style="width:400px; height:410px; max-height:410px; overflow-y:auto;"></div></td>\
      <TD width=100% height=100%><DIV id=divOutOpts style="background:#e0e0f0; height:390px; padding:10px"></div></td></table>';
    document.getElementById('srcResults').innerHTML = m;
    if (t.opt.searchType == 0)
      typeName = 'Barbarians';
    else
      typeName = 'Wildernesses';
    m = '<TABLE cellspacing=0 width=100%>\
        <TR align=center><TD class=dTab colspan=10><B>Search for '+ typeName +'<BR>\
        Center: '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; Distance: '+ t.opt.maxDistance +'<HR><BR></td></tr>\
        <TR align=center><TD colspan=10>LIST OPTIONS</td></tr>\
        <TR><TD align=right>Min. level to show:</td><TD> <INPUT id=filMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD align=right>Max. level to show:</td><TD> <INPUT id=filMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
    if (t.opt.searchType == 1){
      m += '<TR><TD align=right>Wilderness Type:</td><TD><SELECT id=filWildType>';
      m += htmlOptions ( {1:'Glassland/Lake', 3:'Woodlands', 4:'Hills', 5:'Mountain', 6:'Plain'}, Options.wildType );
      m += '</select></td></tr><TR><TD align=right>Unowned Only:</td><TD><INPUT id=filUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    }
    m+= '<TR><TD align=right>Sort By:</td><TD><SELECT id=filSortBy>\
          <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Level</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
        </select></td></tr>\
        </table>';
    document.getElementById('divOutOpts').innerHTML = m;
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
    document.getElementById('filSortBy').addEventListener ('change', function (){
      Options.srcSortBy = document.getElementById('filSortBy').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
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

    t.mapDat = [];
    t.firstX =  t.opt.startX - t.opt.maxDistance;
    t.lastX = t.opt.startX + t.opt.maxDistance;
    t.firstY =  t.opt.startY - t.opt.maxDistance;
    t.lastY = t.opt.startY + t.opt.maxDistance;
    t.tilesSearched = 0;
    t.tilesFound = 0;
    t.curX = t.firstX;
    t.curY = t.firstY;

    x = t.normalizeCoord(t.curX);
    y = t.normalizeCoord(t.curY);
    document.getElementById ('statStatus').innerHTML = 'Searching at '+ x +','+ y;
    setTimeout (function(){Map.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
  },


  dispMapTable : function (){
    var tileNames = ['Barb Camp', 'Grassland', 'Lake', 'Woodlands', 'Hills', 'Mountain', 'Plain' ];
    t = my.Search;
if (DEBUG_TRACE) DebugTimer.start();
    function mySort(a, b){
      if (Options.srcSortBy == 'level'){
        if ((x = a[4] - b[4]) != 0)
          return x;
      }
      return a[2] - b[2];
    }

    dat = [];
    for (i=0; i<t.mapDat.length; i++){
      lvl = parseInt (t.mapDat[i][4]);
      type = t.mapDat[i][3];
      if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
        if (t.opt.searchType == 0
        ||  (Options.wildType==1 && (type==1 || type==2))
        ||  (Options.wildType == type)){
          if (!Options.unownedOnly || t.mapDat[i][5]===false)
            dat.push (t.mapDat[i]);
        }
      }
    }
    document.getElementById('statFound').innerHTML = 'Found: '+ dat.length;
    if (dat.length == 0){
      m = '<BR><CENTER>None found</center>';
    } else {
      dat.sort(mySort);
      m = '<TABLE style="" width=100% id=srcOutTab cellpadding=0 cellspacing=0><TR><TD width=80>Location</td><TD>Distance</td><TD>Lvl</td><TD>Type</td><TD></td></tr>';
      for (i=0; i<dat.length; i++){
        m += '<TR><TD>'+ dat[i][0] +','+ dat[i][1]
          +'</td><TD>'+ dat[i][2]
          +'</td><TD>'+ dat[i][4]
          +'</td><TD>'+ tileNames[dat[i][3]]
          +'</td><TD>'+ (dat[i][5]?' OWNED':'') +'</td></tr>';
       }
      m += '</table>';
    }
    document.getElementById('divOutTab').innerHTML = m;
    dat = null;
if (DEBUG_TRACE) DebugTimer.display('Time to draw table');
  },


  mapDat : [],

  stopSearch : function (msg){
    document.getElementById ('statStatus').innerHTML = msg;
    document.getElementById ('srcStart').value = 'Start Search';
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
//logit ("+++ mapCALLBACK");

    t = my.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('<font color=#660000>ERROR: '+ rslt.errorMsg +'</font>');
      return;
    }

    map = rslt.data;

/***** TESTING
m = '';
numTiles = 0;
for (k in map){
  m += 'X='+ map[k].xCoord +'  Y='+ map[k].yCoord +'  ID='+ map[k].tileId +"\n";
  ++numTiles
}
m += numTiles + ' tiles\n';
debugWin();
debugTA.innerHTML = m;
t.stopSearch ('<font color=#660000>DONE :P</font>');
return;
****/

    for (k in map){
//if (map[k].xCoord==21  && map[k].yCoord==480)
//  logit (inspect (map[k], 8, 1));
      if (t.opt.searchType==0 && map[k].tileType==51 && !map[k].tileCityId ) {  // if barb
        type = 0;
      } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) {
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11)
          type = 2;
        else
          type = (map[k].tileType/10) + 1;
      } else
        continue;
      dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      if (dist <= t.opt.maxDistance){
        isOwned = map[k].tileUserId>0 || map[k].misted;
        t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned]);
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

    x = t.normalizeCoord(t.curX);
    y = t.normalizeCoord(t.curY);
    document.getElementById ('statStatus').innerHTML = 'Searching at '+ x +','+ y;
    setTimeout (function(){Map.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
  },
};


/*******************   KOC Map interface ****************/

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
    rdiv.innerHTML = '<DIV style="background: #cccccc"><CENTER>KOC Power Tools</div>\
      <CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=retryErrMsg></div>\
      <BR><BR><B>Automatically retrying in <SPAN id=retrySeconds></b></span> seconds ...<BR><BR><INPUT id=retryCancel type=submit value="CANCEL Retry" \>';
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

function MyAjaxRequest (url, o){
  url = url;
  var opts = Object.clone(o);
  wasSuccess = o.onSuccess;
  opts.onSuccess = mySuccess;
  wasFailure = o.onFailure;
  opts.onFailure = myFailure;
  retry = 0;
  delay = 5;
if (DEBUG_TRACE) logit ("myAjax: "+ url);
  new Ajax.Request(url, opts);
  return;

  function myRetry(){
    ++retry;
    new Ajax.Request(url, opts);
    delay = delay * 1.25;
  }

  function myFailure(){
    o = {};
if (DEBUG_TRACE) logit ("myAjax.failure");
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
if (DEBUG_TRACE) logit ("myAjax.success: "+ inspect (rslt, 2, 1));
    if (rslt.updateSeed)
      unsafeWindow.update_seed(rslt.updateSeed);

// simulate error..
//rslt.ok = false;
//rslt.error_code = 8;

    if (rslt.ok){
      wasSuccess (rslt);
      return;
    }
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (rslt.error_code==8 ||rslt.error_code==0 ||rslt.error_code==1 ||rslt.error_code==3){
      DialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}



// blocklist sample: bl_0_bt_0,bl_0_bt_5,bl_0_bt_10,bl_5_bt_0,bl_5_bt_5,bl_5_bt_10,bl_10_bt_0,bl_10_bt_5,bl_10_bt_10

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

  request : function (left, top, width, callback) {
    left = parseInt(left / 5) * 5;
    top = parseInt(top / 5) * 5;
    width = parseInt((width+4) / 5) * 5;
    var blockString = this.generateBlockList(left, top, width);
//logit (left +','+ top + "  :"+ blockString);

    if (unsafeWindow.SANDBOX)
      return RequestMAPTEST(left, top, width, callback);

    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.blocks = blockString;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
          callback(left, top, width, rslt);
      },
      onFailure: function (rslt) {
          callback(left, top, width, rslt);
      }
    });
  },
};



/***************************************  4x ***********************************************/

my.Train4x = {
  cont : null,
  timer : null,
  state : null,
  stats : {},

  init : function (){
    t = my.Train4x;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    t = my.Train4x;
    return t.cont;
  },

  hide : function (){
    t = my.Train4x;
    clearTimeout (t.timer);
  },

  show : function (){
    t = my.Train4x;
    clearTimeout (t.timer);
    if (t.state == null){
      s = "<STYLE> .mytab {background: none; border: none}</style>\
        <DIV id=trainTopSelect style='height: 148px;'>\
        <BR><CENTER><B>This screen takes advantage of a bug in KofC that lets you train troops faster!</b></center>\
        <TABLE><TR><TD class=mytab align=right>Training Speed:</td><TD class=mytab width=20></td><TD class=mytab width=225>\
        <SELECT id=selTrainSpeed>\
          <option value='2'>2x</option>\
          <option value='3'>3x</option>\
          <option value='4' SELECTED>4x</option>\
          <option value='5'>5x</option>\
          <option value='6'>6x</option>\
          <option value='7'>7x</option>\
          <option value='8'>8x</option>\
          <option value='9'>9x</option>\
          <option value='10'>10x</option>\
        </select></td><TD class=mytab rowspan=2><INPUT type=CHECKBOX id=chkPop"+ (Options.maxIdlePop?' CHECKED ':'') +">\
        Set workers to idle. &nbsp; (Allows you to train more troops. May temporarily set idle population negative.)</td></tr>\
        <TR><TD class=mytab align=right>City:</td><TD class=mytab></td><TD class=mytab><SELECT id=selCity>";
      for (k in Cities.cities){
        if (!isNaN(k))
          s+= "<option value='"+ Cities.cities[k].id +"'>"+ Cities.cities[k].name +"</option>";
      }
      s += "</select></td>\
        </tr><TR><TD class=mytab align=right>Troop Type:</td><TD class=mytab></td><TD class=mytab>\
        <SELECT id=selTroopType>\
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
        </select></td></tr>\
        <TR><TD class=mytab align=right># to train:</td><TD class=mytab></td>\
        <TD class=mytab><INPUT id='trainNum' size=5 type='text' value='0'\>\
        &nbsp; <INPUT id='trainMax' type=submit value='max'\>\
        &nbsp; &nbsp; (max <span id=spanMaxTroops>0</span>)</td><TD class=mytab>\
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <INPUT id='trainDo' type=submit value='Train Troops'\>\
        </td></tr></table><BR></div>\
        <TABLE align=center width=425><TR><TD><div id=trainStatus style='overflow-y:auto; max-height:210px; height: 210px;'></div></td></tr></table>\
        <div id=divCityStats style='height: 290px; background: #ffb'></div>";
      t.cont.innerHTML = s;
      e = document.getElementById ('selCity');
      e.addEventListener ('change', t.clickCitySelect, false);
      t.clickCitySelect();
      e = document.getElementById ('selTroopType');
      e.addEventListener ('change', t.clickTroopSelect, false);
      e = document.getElementById ('chkPop');
      e.addEventListener ('change', t.clickCheckIdlePop, false);
      e = document.getElementById ('trainDo');
      e.addEventListener ('click', t.clickDoTrain, false);
      e = document.getElementById ('trainMax');
      e.addEventListener ('click', t.clickMax, false);
      t.state = 1;
    }
    t.displayCityStats();
    t.clickTroopSelect();
    t.timer = setTimeout (t.show, 1000);
  },

  clickCheckIdlePop : function (){
    if (document.getElementById ('chkPop').checked)
      Options.maxIdlePop = true;
    else
      Options.maxIdlePop = false;
    saveOptions ();
    t.displayCityStats ();
    t.clickTroopSelect ();
  },

  clickDoTrain : function (){
    t = my.Train4x;
    cityId = document.getElementById ('selCity').value;
    unitId = document.getElementById ('selTroopType').value;
    numUnits = document.getElementById ('trainNum').value;
    trainSpeed = parseInt(document.getElementById ('selTrainSpeed').value);
    t.displayCityStats ();
t.trainSpeed = trainSpeed;    // for debug trace
    if (t.stats.barracks < trainSpeed*2){
      document.getElementById ('trainStatus').innerHTML = "<FONT COLOR=#550000>You need at least "+ (trainSpeed*2) +" barracks in this city to train at "+ trainSpeed +"x speed.</font>";
      return;
    }
    if (isNaN(numUnits) || numUnits<200 || numUnits>t.stats.MaxTrain){
      if (t.stats.MaxTrain < 200)
        document.getElementById ('trainStatus').innerHTML = "<FONT COLOR=#550000>Can't train units right now (max = "+ t.stats.MaxTrain +")</font>";
      else
        document.getElementById ('trainStatus').innerHTML = "<FONT COLOR=#550000>Can't train "+ numUnits +" units! &nbsp; (Enter a number between 200 and "+ t.stats.MaxTrain +")</font>";
      return;
    }
    if (t.stats.queued > 0){
      document.getElementById ('trainStatus').innerHTML = "<FONT COLOR=#550000>Can't train units until training queue is empty!</font>";
      return;
    }
    document.getElementById('trainDo').disabled = true;
    perSlot = parseInt (numUnits/trainSpeed);
    que = [];
/**/
    que.push (['T', unitId, perSlot]);
    for (i=0; i<trainSpeed; i++)
      que.push (['T', 2, 1]);
    for (i=1; i<trainSpeed; i++)
      que.push (['T', unitId, perSlot]);
    for (i=trainSpeed; i>1; i--)
      que.push (['C', i]);
    document.getElementById ('trainStatus').innerHTML = '';
/**/
    t.doQueue (cityId, que);
  },

  clickTroopSelect : function (){
    t = my.Train4x;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    id = document.getElementById ('selTroopType').value;
    uc = unsafeWindow.unitcost['unt'+id];
    max = 9999999999;
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
    t.stats.MaxTrain = parseInt (max) - 25;
    if (t.stats.MaxTrain < 0)
      t.stats.MaxTrain = 0;
    document.getElementById('spanMaxTroops').innerHTML = t.stats.MaxTrain;
  },

  clickMax : function (){
    document.getElementById('trainNum').value = t.stats.MaxTrain;
  },

  clickCitySelect : function (){
    t = my.Train4x;
    document.getElementById('trainNum').value = '';
    t.displayCityStats ();
    t.clickTroopSelect();
    maxSpeed = parseInt(t.stats.barracks/2);
    if (maxSpeed > 10)
      maxSpeed = 10;
    document.getElementById('selTrainSpeed').value = maxSpeed;
  },


  displayCityStats : function (){
    t = my.Train4x;
    cityId = document.getElementById ('selCity').value;
    div = document.getElementById ('divCityStats');
    t.stats.food = parseInt (Seed.resources['city'+cityId].rec1[0]/3600);
    t.stats.wood = parseInt (Seed.resources['city'+cityId].rec2[0]/3600);
    t.stats.stone = parseInt (Seed.resources['city'+cityId].rec3[0]/3600);
    t.stats.ore = parseInt (Seed.resources['city'+cityId].rec4[0]/3600);
    t.stats.gold = Seed.citystats['city'+cityId].gold[0];
    if (Options.maxIdlePop)
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]);
    else
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]) - parseInt(Seed.citystats['city'+cityId].pop[3]);
    buildings = Seed.buildings['city'+cityId];
    t.stats.barracks = 0;
    for (i=1; i<33; i++){
      if (buildings['pos'+i] && buildings['pos'+i][0] == 13)
        t.stats.barracks++;
    }

    m = '<CENTER><B>'+ Cities.byID[cityId].name +' &nbsp; ('+ Cities.byID[cityId].x +','+ Cities.byID[cityId].y +')</b></center><HR>';
    m += '<TABLE width=100%><TR align=center>\
      <TD class=mytab width=18%><B>Food:</b></td>\
      <TD class=mytab width=16%><B>Wood:</b></td>\
      <TD class=mytab width=16%><B>Stone:</b></td>\
      <TD class=mytab width=16%><B>Ore:</b></td>\
      <TD class=mytab width=16%><B>Gold:</b></td>\
      <TD class=mytab width=16%><B>Idle Pop:</b></td></tr>\
      <TR align=center><TD class=mytab>'+ addCommasInt(t.stats.food) +'</td>\
      <TD class=mytab>'+ addCommasInt(t.stats.wood) +'</td>\
      <TD class=mytab>'+ addCommasInt(t.stats.stone) +'</td>\
      <TD class=mytab>'+ addCommasInt(t.stats.ore) +'</td>\
      <TD class=mytab>'+ addCommasInt(t.stats.gold) +'</td>\
      <TD class=mytab>'+ addCommasInt(t.stats.idlePop) +'</td>\
      </tr></table><BR>\
      <DIV style="overflow-y: auto; height:210px; max-height:210px"><table align=center><TR><TD class=mytab align=center colspan=4><B>Training Queue &nbsp; ('+ t.stats.barracks +' barracks)</b><BR><HR></td></tr>';

    q = Seed.queue_unt['city'+cityId];
    t.stats.queued = q.length;
    if (q.length > 0 ){
      now = parseInt(new Date().getTime() / 1000);
      first = true;
      for (i=0; i<q.length; i++){
        start = q[i][2];
        end = q[i][3];
        if (first){
          actual = end - now;
          first = false;
        } else {
          actual = end - lastEnd;
        }
        if (actual < 0)
          actual = 0;
        m+= '<TR valign=top><TD class=mytab>'+ q[i][1] +' '+ unsafeWindow.unitcost['unt'+q[i][0]][0]
            +'</td><TD width=30 class=mytab></td><TD class=mytab>'+  unsafeWindow.timestr(end - start)
            +'</td><TD class=mytab> &nbsp; &nbsp; (Actual: '+ unsafeWindow.timestr(actual) +')</td></tr>'
        lastEnd = end;
      }
    }
    m += '</table></div>';
    div.innerHTML = m;
  },


  dispTrainStatus : function (msg){
    div = document.getElementById ('trainStatus');
    div.innerHTML = msg + div.innerHTML;
  },

  doQueue : function (cityId, que, errMsg){
     try {
      t = my.Train4x;
      t.displayCityStats();
      if (errMsg){
        if (errMsg == "Cancellation can not be done at this time"){
          t.dispTrainStatus ('<font color=#550000><B>ERROR: '+ errMsg +'</b></font><BR>');
        } else {
          logit ("4x.doQueue ERROR: "+ errMsg);
          t.dispTrainStatus ('<font color=#550000><B>ERROR: '+ errMsg +'</b></font><BR>');
          document.getElementById('trainDo').disabled = false;
          return;
        }
      }
      cmd = que.shift();
      if (!cmd){
        t.dispTrainStatus ('<HR><B>Done queueing troops.</b> &nbsp; &nbsp; Refresh KofC a minute after the first group of troops is done training\
              , and the rest will be done! (You may have to refresh twice)<HR>');
        document.getElementById('trainDo').disabled = false;
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Training '+ cmd[2] +' '+  unsafeWindow.unitcost['unt'+cmd[1]][0] +'<BR>');
        doTrain (cityId, cmd[1], cmd[2], function(errMsg){my.Train4x.doQueue(cityId, que, errMsg);} );
      } else if (cmd[0] == 'C'){
        t.dispTrainStatus ('Cancelling Slot #'+ (cmd[1]+1) +'<BR>');
        doCancelTrain (cityId, cmd[1], function(errMsg){my.Train4x.doQueue(cityId, que, errMsg);});
      }
    } catch (err) {
logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>PROGRAM ERROR: '+ err.message +'</font><BR>');
      document.getElementById('trainDo').disabled = false;
    }
  },
}


/***************************************  OVERVIEW ************************************************/
/***
function update_resource() {
  var d = unixtime();
  var l = d - citylist["city" + currentcityid];
  citylist["city" + currentcityid] = d;
  var b = [0, 0, 0, 0, 0];
  if (!Object.isArray(seed.wilderness["city" + currentcityid])) {
    var o = Object.keys(seed.wilderness["city" + currentcityid]);
    for (var h = 0; h < o.length; h++) {
      var p = 0;
      switch (parseInt(seed.wilderness["city" + currentcityid][o[h]].tileType)) {
      case 10:
        p = 1;
        break;
      case 11:
        p = 1;
        break;
      case 20:
        p = 2;
        break;
      case 30:
        p = 3;
        break;
      case 40:
        p = 4;
        break
      }
      b[p] += parseInt(seed.wilderness["city" + currentcityid][o[h]].tileLevel)
    }
  }
  for (var h = 1; h < 5; h++) {
    var f = seed.resources["city" + currentcityid]["rec" + h];
    var m = 1;
    var g = parseInt(seed.citystats["city" + currentcityid]["pop"][0]);
    var a = parseInt(seed.citystats["city" + currentcityid]["pop"][3]);
    if (a > g) {
      m = g / a
    }
    var j = 0;
    var q = seed.knights["city" + currentcityid];
    if (q) {
      q = q["knt" + seed.leaders["city" + currentcityid].resourcefulnessKnightId];
      if (q) {
        j = parseInt(q.resourcefulness);
        var n = new Date;
        if (q.resourcefulnessBoostExpireUnixtime > parseInt(n.getTime() / 1000)) {
          j *= 1.25
        }
      }
    }
    var c = 0;
    if (parseInt(seed.playerEffects["r" + h + "BstExp"]) > unixtime()) {
      c = 0.25
    }
    var e = (f[2] * (1 + seed.tech["tch" + h] / 10 + j / 100 + c + 0.05 * b[h]) * m + 100) - parseInt(f[3]);
    if (f[0] < f[1]) {
      f[0] += e * l;
      if (f[0] > f[1]) {
        f[0] = f[1]
      } else {
        if (f[0] < 0) {
          f[0] = 0
        }
      }
    } else {
      if (e < 0) {
        f[0] += e * l
      }
    }
    $("stat_rec" + h + "_num").innerHTML = addCommas(parseInt(f[0] / 3600));
    $("stat_rec" + h + "_bar_num").innerHTML = addCommas(parseInt(f[0] / 3600));
    $("stat_rec" + h + "_grw").innerHTML = addCommas(parseInt(e))
  }
}
***/

my.Overview = {
  cont : null,
  displayTimer : null,
  checkBox:null,

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
    t = my.Overview;

    clearTimeout (t.displayTimer);

    if (Options.includeMarching)
      march = getMarchInfo ();

    function clickEnableMarch (){
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
        style = ' style = "background: #e8e8e8"';
      var tot = 0;
      var str = '<TR style="background: #fff" align=right'+ style +'><TD'+ style +'><B>'+ name +' &nbsp; </td>';
      if (noTotal){
        str += '<TD'+ style +'> &nbsp;</td>';
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        str += '<TD style="background: #ffc">'+ addCommas(tot) +'</td>';
      }
      for (i=0; i<row.length; i++)
        str += '<TD'+ style +'>'+ addCommas(row[i]) +'</td>';
      return str +'</tr>';
    }

    if (div.style.display == 'none')
      return;

    str = "<TABLE cellspacing=0><TR valign=top align=right><TD width=72></td><TD width=95 style='background: #ffc'><B>TOTAL</b></td>";
    for(i=0; i<Cities.numCities; i++) {
      str += "<TD width=85><B>"+ Cities.cities[i].name.substring(0,10) +'</b><BR>('+
          Cities.cities[i].x +','+ Cities.cities[i].y  +")</td>";
    }

    if (Options.includeMarching)
      str += '<TD width=85><B>Marching</b></td>';

    str += "</tr>";

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

// TODO: food +/- ??

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
    str += _row ('SupTrp', rows[1]);
    str += _row ('Militia', rows[2]);
    str += _row ('Scout', rows[3]);
    str += _row ('Pike', rows[4]);
    str += _row ('Sword', rows[5]);
    str += _row ('Archer', rows[6]);
    str += _row ('Cavalry', rows[7]);
    str += _row ('Heavy', rows[8]);
    str += _row ('Wagon', rows[9]);
    str += _row ('Ballista', rows[10]);
    str += _row ('Ram', rows[11]);
    str += _row ('Catapult', rows[12]);
    str += '<TR><TD><BR></td></tr>';

    row = [];
    for(i=0; i<Cities.numCities; i++) {
      totWilds = 0;
      dat = Seed.wilderness['city'+ Cities.cities[i].id];
      for (k in dat)
        ++totWilds;
      castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
      if (totWilds < castle)
        row[i] = '<SPAN style="color: #600"><B>'+ totWilds +'/'+ castle +'</b></span>';
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

    now = parseInt(new Date().getTime() / 1000);
    row = [];
    for(i=0; i<Cities.numCities; i++) {
      var totTrain = 0;
      cityID = 'city'+ Cities.cities[i].id;
      for (ii=0; ii<20; ii++){
        if (!Seed.queue_unt[cityID][ii])
          break;
        if (ii==0 && Seed.queue_unt[cityID][ii][2]<now){
          if (Seed.queue_unt[cityID][ii][3] < now)
            trainTime = 0;
          else
            trainTime = Seed.queue_unt[cityID][ii][3] - now;
        } else {
          trainTime = (Seed.queue_unt[cityID][ii][3] - Seed.queue_unt[cityID][ii][2]);
        }
        totTrain += trainTime;
      }
      row[i] = unsafeWindow.timestr(totTrain);
    }
    rownum = 0;
    str += _row ('Training', row, true);

    str += '<TR><TD></td><TD colspan=4><BR><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +'>Include Marching Troops/Resources</td></tr>';
    str += '<TR><TD></td><TD colspan=4>Include Queued Troops (coming soon!)</td></tr>';
    str += "</table>";
    dt = new Date ();
    dt.setTime (Seed.player.datejoinUnixTime * 1000);
    str += '<BR>You have been playing since '+ dt.toLocaleDateString() +'<BR>';
    str += 'Might: ' + addCommas(Seed.player.might) +'<BR>';
    str += 'Alliance: ' + Seed.allianceDiplomacies.allianceName +' on '+ unsafeWindow.domainName +'<BR>';

    if (DEBUG_BUTTON)
      str += '<BR><BR><INPUT id=subSeed type=submit name="SEED" value="DEBUG">';
    my.Overview.cont.innerHTML = str;
    checkBox = document.getElementById('idCheck');
    checkBox.addEventListener('click', clickEnableMarch, false);
    if (DEBUG_BUTTON){
      subSeed = document.getElementById('subSeed');
      subSeed.addEventListener('click', clickDebug, false);
    }
    t.displayTimer = setTimeout (t.show, 5000);
  },
};



/***************************************  ENCAMPED ************************************************/

my.Encamped = {
  cont:null,
  displayTimer:null,

  init : function (){
    this.cont = document.createElement('div');
    return this.cont;
  },

  getContent : function (){
    return this.cont;
  },

  hide : function (){
    clearTimeout (my.Encamped.displayTimer);
  },

  show : function (cont){
    var rownum = 0;
    var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];

    t = my.Encamped;
    clearTimeout (t.displayTimer);

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
          s = [];
          s[0] = parseInt (march.knightCombat);
          for (i=1; i<13; i++){
            if (Options.encRemaining)
              s[i] = parseInt (march['unit'+ i +'Return']);
            else
              s[i] = parseInt (march['unit'+ i +'Count']);
          }
          enc[city][from].push (s);
        }
      }
    }

//logit (inspect (enc, 8,1));
    if (numSlots == 0){
      s = '<BR><BR><CENTER><B>No troops encamped.</b></center>';
    } else {
      s = '<STYLE> .tot{background:#ecf;} .city{background:#ffffaa;}</style>';
      s += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%>Player (knight) </td>';

      for (k=0; k<names.length; k++)
        s += '<TD width=7%><B>' + names[k] + '</b></td>';
      s += '</tr>';

      tot = [];
      for (i=0; i<13; i++)
        tot[i] = 0;
      for (c in Cities.cities){
        dest = Cities.cities[c].id;
        if (enc[dest]){
          s+= '<TR><TD class="city" colspan=13 align=center>'+ Cities.cities[c].name +'</td></tr>';
          for (p in enc[dest]){
try {
            player = Seed.players['u'+p].n;
} catch (err){
  player = '???';
}
            for (m=0; m<enc[dest][p].length; m++){
              knight = '';
              if (enc[dest][p][m][0] > 0)
                knight = ' ('+ enc[dest][p][m][0] +')';
              s += '<TR align=right><TD align=left>'+ player + knight +'</td>'
              for (i=1; i<13; i++){
                num = enc[dest][p][m][i];
                s += '<TD>'+ num  +'</td>';
                tot[i] += num;
              }
              s += '</tr>';

            }
          }
          s+= '<TR><TD></td></tr>';
        }
      }
      s += '<TR><TD colspan=13><BR><BR></td></tr><TR align=right><TD class="tot" align=left><B>TOTALS:</b></td>';
      for (i=1; i<13; i++)
        s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr></table>';
    }


    s += '<BR><BR><INPUT type=CHECKBOX id=idCheck2 '+ (Options.encRemaining?'':' CHECKED ') +'> Show Original Troops';
    s += '<BR><BR><DIV style="font-size: 10px">NOTE: You will need to refresh KofC to show new encampments or remaining troops after a battle.</div>';
    t.cont.innerHTML = s;

    checkBox = document.getElementById('idCheck2');
    checkBox.addEventListener('click', clickShowRemaining, false);

    t.displayTimer = setTimeout (t.show, 10000);
//logit ('encamped: '+ inspect (enc, 8, 1));
  },
};


/*****************************************************************
*****************************************************************/


var Tabs = [
  ['Overview', 'Overview'],
  ['Encamped', 'Encamped'],
  ['Search', 'Search'],
  ['Train4x' , '4x'],
  ['Info' , 'Info'],
  ['Options' , 'Options'],
];

if (!ENABLE_4x)
  Tabs.splice (3, 1);


td = document.getElementById('tdContent');
for (k in Tabs){
  addTab (Tabs[k][1], Tabs[k][0]);
  my[Tabs[k][0]].init();
  cont = my[Tabs[k][0]].getContent();
  cont.style.display = 'none';
  td.appendChild(cont);
}

var currentName = 'Overview';
setTabStyle (document.getElementById ('aaOverview'), true);
my.Overview.getContent().style.display = 'block';


function setTabStyle (e, selected){
  if (selected){
    e.className = 'matTabSel';
  } else {
    e.className = 'matTabNotSel';
  }
}


function clickedTab (e){
  td = document.getElementById('tdContent');
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


function eventHideShow (){
  if (mainDiv.style.display == 'block'){
    mainDiv.style.display = 'none';
    my[currentName].hide();
  } else {
    mainDiv.style.display = 'block';
    my[currentName].show();
  }
}



function addMyFunction (func){      // add function to run in 'my namespace'
  unsafeWindow[func.name] = func;
}

function addUwFunction (func){      // add function to run in 'unsafeWindow namespace'
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


function addTab (label, id){
  var buts=document.getElementById('idButs');
  var a=document.createElement('a');
  a.className='matTabNotSel';
  a.id = 'aa'+id;
  a.innerHTML='<span id="sp'+ id +'" class="matTab">'+label+'</span>';
  buts.appendChild(a);
  a.addEventListener('click', clickedTab, false);
  return a;
}

function setCities(){
  Cities.numCities = Seed.cities.length;
//  Cities.curCityID = unsafeWindow.currentcityid;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){
    city = {};
    city.id = Seed.cities[i][0];
    city.name = Seed.cities[i][1];
    city.x = Seed.cities[i][2];
    city.y = Seed.cities[i][3];
    city.tileId = Seed.cities[i][5];
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}


/***
marchtype:  1: transport
            2: reinforce
            3: scout
            4: attack
            5: reassign

marchstatus 1: marching
            2: defending
            8: returning
            9: aborting

***/

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

  now = parseInt(new Date().getTime() / 1000);

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



function clickDebug(){
  debugWin();
  var myseed = unsafeWindow.Object.clone (Seed);
  delete myseed.tech;
  delete myseed.tutorial;
  delete myseed.items;
  delete myseed.quests;
  delete myseed.wilderness;
  delete myseed.wildDef;
  delete myseed.buildings;
  delete myseed.knights;
  delete myseed.allianceDiplomacies;
  delete myseed.appFriends;
  delete myseed.players;
  now = new Date();
  debugTA.innerHTML = "seed @ "+ parseInt(now.getTime() / 1000)  +" ("+ now +")\n\n"+ inspect (myseed, 8, 1);
  myseed=null;
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


function createPopup (content){
  div = document.createElement('div');
  var kochead = unsafeWindow.document.getElementById('kochead');
  kochead.appendChild(div);
  div.style.background = "#ffc";
  div.style.border = "3px ridge #666";
  div.style.zIndex = "200000";        // KOC modal is 100210 ?
  div.style.display = 'none';
  div.style.width = '720px';
  div.style.height = '700px';
  div.style.position = "relative";
  div.style.top = "0px";
  div.style.left = "15px";
  div.innerHTML = content;
  return div;
}


function createPopup2 (content, width, height, zIndex){
  div = document.createElement('div');
  var kochead = unsafeWindow.document.getElementById('kochead');
  kochead.appendChild(div);
  div.style.background = "#ffc";
  div.style.border = "3px ridge #666";
  div.style.zIndex = zIndex+'';
  div.style.display = 'none';
  div.style.width = width+'px';
  div.style.height = height+'px';
//  div.style.position = "relative";
//  div.style.top = "0px";
//  div.style.left = "15px";
  div.innerHTML = content;
  return div;
}

xClose = window.document.getElementById ('xClose');
xClose.addEventListener('click',eventHideShow, false);



/****************************************************************/

function matTypeof (v){
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
    else if (Object.prototype.toString.apply(v) === '[object Array]')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}


function AddMainTabLink(html, id, eventListener) {
  var a=document.createElement('a');
  a.className='tab';
  a.style.color='#ff6';
  a.innerHTML='<span>'+html+'</span>';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if(tabs) tabs=tabs.parentNode;
  }
  if(!tabs) {
    tabs=document.body;
  }

// TODO: Fit 'POWER' button in main div if there's room

  if(tabs) {
    var eNew = document.getElementById('GMNewTabs');
    if (eNew == null){
      eNew = document.createElement('div');
      eNew.className='tabs_engagement';
      eNew.style.background='#ca5';
      tabs.parentNode.insertBefore (eNew, tabs);
      eNew.id = 'GMNewTabs';
      eNew.style.whiteSpace='nowrap';
      eNew.style.width='100%';
    }
    eNew.appendChild(a);
    a.id=id;
    a.addEventListener('click',eventListener, false);
    return a;
  }
  window.setTimeout ( function (){AddMainTabLink (html, id, eventListener)}, 500);
  return null;
}



function createWindow (url, name, width, height) {
  w = window.open(url, name, 'width='+width+',height='+height);
  return w;
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

  for(property in obj)
  {
    try
    {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
    }
    catch(err)
    {
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


/**********************************************************************************/


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
          notify(null);
      } else {
        if (notify != null){
          notify(rslt.errorMsg);
        }
      }
    },
    onFailure: function(o) {
      if (notify != null)
        notify(rslt.errorMsg);
    }
  })
}


/***************************************************************/

function doCancelTrain (cityId, queIndex, notify){
//logit ("doCancelTrain(): "+ queIndex);
  var q = unsafeWindow.seed.queue_unt["city" + cityId][queIndex];
  typetrn = q[0];
  numtrptrn = q[1];
  trnETA= q[3];
  trnTmp= q[2];
  trnNeeded = q[5];
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.requestType = "CANCEL_TRAINING";
  params.cityId = cityId;
  params.typetrn = typetrn;
  params.numtrptrn = numtrptrn;
  params.trnETA = trnETA;
  params.trnTmp = trnTmp;
  params.trnNeeded = trnNeeded;

//logit ("doCancelTrain ("+ queIndex +"):\n"+ inspect (unsafeWindow.seed.queue_unt["city" + cityId], 2, 1));

  ajaxURL = unsafeWindow.g_ajaxpath + "ajax/cancelTraining.php" + unsafeWindow.g_ajaxsuffix;
  ajaxObj = {
    method: "post",
    parameters: params,
    onSuccess: function(rslt) {
      if (rslt.ok) {
        unsafeWindow.update_seed_ajax(true, function() {
          var k = 0;
          for (var j = 0; j < unsafeWindow.seed.queue_unt["city" + cityId].length; j++) {
            if (j > queIndex) {
              unsafeWindow.seed.queue_unt["city" + cityId][j][2] = parseInt(rslt.dateTraining[k]["start"]);
              unsafeWindow.seed.queue_unt["city" + cityId][j][3] = parseInt(rslt.dateTraining[k]["end"]);
              k++
            }
          }
          unsafeWindow.seed.queue_unt["city" + cityId].splice(queIndex, 1);
//logit ("After Splice ("+ queIndex +"):\n"+ inspect (unsafeWindow.seed.queue_unt["city" + cityId], 2, 1));
          for (var i = 1; i < 5; i++) {
            var totalReturn = parseInt(unsafeWindow.unitcost["unt" + typetrn][i]) * parseInt(numtrptrn) * 3600 / 2;
            unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) + totalReturn
          }
        })
        if (notify != null)
          setTimeout (function (){notify(null);}, 2000);
      } else {
logit ("********  COPY THIS MESSAGE!  *******\nqueueIndex: "+ queIndex +"  City: "+ cityId +"  Speed: "+  my.Train4x.trainSpeed +"\n"+ inspect (rslt, 2, 1) + inspect (unsafeWindow.seed.queue_unt["city" + cityId], 2, 1));
        if (notify != null){
          if (rslt.error_code == 131){   // Ignore error 131 ???  ("Cancellation can not be done at this time")
//            setTimeout (function (){notify(null);}, 2000);
            notify(rslt.errorMsg);
        } else
            notify(rslt.errorMsg);
        }
      }
    },
    onFailure: function(eMsg) {
      if (notify != null)
        notify(rslt.errorMsg);
    }
  };

  new MyAjaxRequest (ajaxURL, ajaxObj);
}





/*  Prototype JavaScript framework, version 1.6.1
 *  (c) 2005-2009 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/

var Prototype = {
  Version: '1.6.1',

  Browser: (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile.*Safari/.test(ua)
    }
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,
    SelectorsAPI: !!document.querySelector,
    ElementExtensions: (function() {
      var constructor = window.Element || window.HTMLElement;
      return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (function() {
      if (typeof window.HTMLDivElement !== 'undefined')
        return true;

      var div = document.createElement('div');
      var form = document.createElement('form');
      var isSupported = false;

      if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
        isSupported = true;
      }

      div = form = null;

      return isSupported;
    })()
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },
  K: function(x) { return x }
};

if (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;


var Abstract = { };


var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};

/* Based on Alex Arnell's inheritance implementation. */

var Class = (function() {
  function subclass() {};
  function create() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0; i < properties.length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype;
    var properties = Object.keys(source);

    if (!Object.keys({ toString: true }).length) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames().first() == "$super") {
        var method = value;
        value = (function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property).wrap(method);

        value.valueOf = method.valueOf.bind(method);
        value.toString = method.toString.bind(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };
})();
(function() {

  var _toString = Object.prototype.toString;

  function extend(destination, source) {
    for (var property in source){
    	destination[property] = source[property];
    }
    return destination;
  }

  function inspect(object) {
    try {
      if (isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  }

  function toJSON(object) {
    var type = typeof object;
    switch (type) {
      case 'undefined':
      case 'function':
      case 'unknown': return;
      case 'boolean': return object.toString();
    }

    if (object === null) return 'null';
    if (object.toJSON) return object.toJSON();
    if (isElement(object)) return;

    var results = [];
    for (var property in object) {
      var value = toJSON(object[property]);
      if (!isUndefined(value))
        results.push(property.toJSON() + ': ' + value);
    }

    return '{' + results.join(', ') + '}';
  }

  function toQueryString(object) {
    return $H(object).toQueryString();
  }

  function toHTML(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  }

  function keys(object) {
    var results = [];
    for (var property in object)
      results.push(property);
    return results;
  }

  function values(object) {
    var results = [];
    for (var property in object)
      results.push(object[property]);
    return results;
  }

  function clone(object) {
    return extend({ }, object);
  }

  //Changed 5/10/2010 to accomodate feeds at Level 2
  function cloneFeed(sourceObj) {
  	var returnObject = {};
  	for (var i in sourceObj) {
  		if (Object.isArray(sourceObj[i])) {
  			returnObject[i] = new Array();
  			for (var j=0;j<sourceObj[i].length;j++) {
  				returnObject[i].push(Object.clone(sourceObj[i][j]));
  			}
  		} else if (typeof sourceObj[i]=='object') {
  			returnObject[i] = Object.clone(sourceObj[i]);
  		} else {
  			returnObject[i] = sourceObj[i];
  		}
  	}
  	return returnObject;
  }

  function isElement(object) {
    return !!(object && object.nodeType == 1);
  }

  function isArray(object) {
    return _toString.call(object) == "[object Array]";
  }


  function isHash(object) {
    return object instanceof Hash;
  }

  function isFunction(object) {
    return typeof object === "function";
  }

  function isString(object) {
    return _toString.call(object) == "[object String]";
  }

  function isNumber(object) {
    return _toString.call(object) == "[object Number]";
  }

  function isUndefined(object) {
    return typeof object === "undefined";
  }

  extend(Object, {
    extend:        extend,
    inspect:       inspect,
    toJSON:        toJSON,
    toQueryString: toQueryString,
    toHTML:        toHTML,
    keys:          keys,
    values:        values,
    clone:         clone,
    cloneFeed:     cloneFeed,
    isElement:     isElement,
    isArray:       isArray,
    isHash:        isHash,
    isFunction:    isFunction,
    isString:      isString,
    isNumber:      isNumber,
    isUndefined:   isUndefined
  });
})();
Object.extend(Function.prototype, (function() {
  var slice = Array.prototype.slice;

  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }

  function merge(array, args) {
    array = slice.call(array, 0);
    return update(array, args);
  }

  function argumentNames() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
      .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
      .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
  }

  function bind(context) {
    if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
    var __method = this, args = slice.call(arguments, 1);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(context, a);
    }
  }

  function bindAsEventListener(context) {
    var __method = this, args = slice.call(arguments, 1);
    return function(event) {
      var a = update([event || window.event], args);
      return __method.apply(context, a);
    }
  }

  function curry() {
    if (!arguments.length) return this;
    var __method = this, args = slice.call(arguments, 0);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(this, a);
    }
  }

  function delay(timeout) {
    var __method = this, args = slice.call(arguments, 1);
    timeout = timeout * 1000
    return window.setTimeout(function() {
      return __method.apply(__method, args);
    }, timeout);
  }

  function defer() {
    var args = update([0.01], arguments);
    return this.delay.apply(this, args);
  }

  function wrap(wrapper) {
    var __method = this;
    return function() {
      var a = update([__method.bind(this)], arguments);
      return wrapper.apply(this, a);
    }
  }

  function methodize() {
    if (this._methodized) return this._methodized;
    var __method = this;
    return this._methodized = function() {
      var a = update([this], arguments);
      return __method.apply(null, a);
    };
  }

  return {
    argumentNames:       argumentNames,
    bind:                bind,
    bindAsEventListener: bindAsEventListener,
    curry:               curry,
    delay:               delay,
    defer:               defer,
    wrap:                wrap,
    methodize:           methodize
  }
})());


Date.prototype.toJSON = function() {
  return '"' + this.getUTCFullYear() + '-' +
    (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
    this.getUTCDate().toPaddedString(2) + 'T' +
    this.getUTCHours().toPaddedString(2) + ':' +
    this.getUTCMinutes().toPaddedString(2) + ':' +
    this.getUTCSeconds().toPaddedString(2) + 'Z"';
};


RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};
var PeriodicalExecuter = Class.create({
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  execute: function() {
    this.callback(this);
  },

  stop: function() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
        this.currentlyExecuting = false;
      } catch(e) {
        this.currentlyExecuting = false;
        throw e;
      }
    }
  }
});
Object.extend(String, {
  interpret: function(value) {
    return value == null ? '' : String(value);
  },
  specialChar: {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '\\': '\\\\'
  }
});

Object.extend(String.prototype, (function() {

  function prepareReplacement(replacement) {
    if (Object.isFunction(replacement)) return replacement;
    var template = new Template(replacement);
    return function(match) { return template.evaluate(match) };
  }

  function gsub(pattern, replacement) {
    var result = '', source = this, match;
    replacement = prepareReplacement(replacement);

    if (Object.isString(pattern))
      pattern = RegExp.escape(pattern);

    if (!(pattern.length || pattern.source)) {
      replacement = replacement('');
      return replacement + source.split('').join(replacement) + replacement;
    }

    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  }

  function sub(pattern, replacement, count) {
    replacement = prepareReplacement(replacement);
    count = Object.isUndefined(count) ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  }

  function scan(pattern, iterator) {
    this.gsub(pattern, iterator);
    return String(this);
  }

  function truncate(length, truncation) {
    length = length || 30;
    truncation = Object.isUndefined(truncation) ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : String(this);
  }

  function strip() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  function stripTags() {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  }

  function stripScripts() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  }

  function extractScripts() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  }

  function evalScripts() {
    return this.extractScripts().map(function(script) { return eval(script) });
  }

  function escapeHTML() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function unescapeHTML() {
    return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  }


  function toQueryParams(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return { };

    return match[1].split(separator || '&').inject({ }, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var key = decodeURIComponent(pair.shift());
        var value = pair.length > 1 ? pair.join('=') : pair[0];
        if (value != undefined) value = decodeURIComponent(value);

        if (key in hash) {
          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
          hash[key].push(value);
        }
        else hash[key] = value;
      }
      return hash;
    });
  }

  function toArray() {
    return this.split('');
  }

  function succ() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  }

  function times(count) {
    return count < 1 ? '' : new Array(count + 1).join(this);
  }

  function camelize() {
    var parts = this.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = this.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
  }

  function capitalize() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  }

  function underscore() {
    return this.replace(/::/g, '/')
               .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  }

  function dasherize() {
    return this.replace(/_/g, '-');
  }

  function inspect(useDoubleQuotes) {
    var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
      if (character in String.specialChar) {
        return String.specialChar[character];
      }
      return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
    });
    if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
    return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  }

  function toJSON() {
    return this.inspect(true);
  }

  function unfilterJSON(filter) {
    return this.replace(filter || Prototype.JSONFilter, '$1');
  }

  function isJSON() {
    var str = this;
    if (str.blank()) return false;
    str = this.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
    return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
  }

  function evalJSON(sanitize) {
    var json = this.unfilterJSON();
    try {
      if (!sanitize || json.isJSON()) return eval('(' + json + ')');
    } catch (e) { }
    throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
  }

  function include(pattern) {
    return this.indexOf(pattern) > -1;
  }

  function startsWith(pattern) {
    return this.indexOf(pattern) === 0;
  }

  function endsWith(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf(pattern) === d;
  }

  function empty() {
    return this == '';
  }

  function blank() {
    return /^\s*$/.test(this);
  }

  function interpolate(object, pattern) {
    return new Template(this, pattern).evaluate(object);
  }

  return {
    gsub:           gsub,
    sub:            sub,
    scan:           scan,
    truncate:       truncate,
    strip:          String.prototype.trim ? String.prototype.trim : strip,
    stripTags:      stripTags,
    stripScripts:   stripScripts,
    extractScripts: extractScripts,
    evalScripts:    evalScripts,
    escapeHTML:     escapeHTML,
    unescapeHTML:   unescapeHTML,
    toQueryParams:  toQueryParams,
    parseQuery:     toQueryParams,
    toArray:        toArray,
    succ:           succ,
    times:          times,
    camelize:       camelize,
    capitalize:     capitalize,
    underscore:     underscore,
    dasherize:      dasherize,
    inspect:        inspect,
    toJSON:         toJSON,
    unfilterJSON:   unfilterJSON,
    isJSON:         isJSON,
    evalJSON:       evalJSON,
    include:        include,
    startsWith:     startsWith,
    endsWith:       endsWith,
    empty:          empty,
    blank:          blank,
    interpolate:    interpolate
  };
})());

var Template = Class.create({
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    if (object && Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.gsub(this.pattern, function(match) {
      if (object == null) return (match[1] + '');

      var before = match[1] || '';
      if (before == '\\') return match[2];

      var ctx = object, expr = match[3];
      var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
        ctx = ctx[comp];
        if (null == ctx || '' == match[3]) break;
        expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + String.interpret(ctx);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = { };

var Enumerable = (function() {
  function each(iterator, context) {
    var index = 0;
    try {
      this._each(function(value) {
        iterator.call(context, value, index++);
      });
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  }

  function eachSlice(number, iterator, context) {
    var index = -number, slices = [], array = this.toArray();
    if (number < 1) return array;
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.collect(iterator, context);
  }

  function all(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator.call(context, value, index);
      if (!result) throw $break;
    });
    return result;
  }

  function any(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator.call(context, value, index))
        throw $break;
    });
    return result;
  }

  function collect(iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];
    this.each(function(value, index) {
      results.push(iterator.call(context, value, index));
    });
    return results;
  }

  function detect(iterator, context) {
    var result;
    this.each(function(value, index) {
      if (iterator.call(context, value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  }

  function findAll(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (iterator.call(context, value, index))
        results.push(value);
    });
    return results;
  }

  function grep(filter, iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];

    if (Object.isString(filter))
      filter = new RegExp(RegExp.escape(filter));

    this.each(function(value, index) {
      if (filter.match(value))
        results.push(iterator.call(context, value, index));
    });
    return results;
  }

  function include(object) {
    if (Object.isFunction(this.indexOf))
      if (this.indexOf(object) != -1) return true;

    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  }

  function inGroupsOf(number, fillWith) {
    fillWith = Object.isUndefined(fillWith) ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  }

  function inject(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index);
    });
    return memo;
  }

  function invoke(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  }

  function max(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index);
      if (result == null || value >= result)
        result = value;
    });
    return result;
  }

  function min(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index);
      if (result == null || value < result)
        result = value;
    });
    return result;
  }

  function partition(iterator, context) {
    iterator = iterator || Prototype.K;
    var trues = [], falses = [];
    this.each(function(value, index) {
      (iterator.call(context, value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  }

  function pluck(property) {
    var results = [];
    this.each(function(value) {
      results.push(value[property]);
    });
    return results;
  }

  function reject(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator.call(context, value, index))
        results.push(value);
    });
    return results;
  }

  function sortBy(iterator, context) {
    return this.map(function(value, index) {
      return {
        value: value,
        criteria: iterator.call(context, value, index)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  }

  function toArray() {
    return this.map();
  }

  function zip() {
    var iterator = Prototype.K, args = $A(arguments);
    if (Object.isFunction(args.last()))
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  }

  function size() {
    return this.toArray().length;
  }

  function inspect() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }









  return {
    each:       each,
    eachSlice:  eachSlice,
    all:        all,
    every:      all,
    any:        any,
    some:       any,
    collect:    collect,
    map:        collect,
    detect:     detect,
    findAll:    findAll,
    select:     findAll,
    filter:     findAll,
    grep:       grep,
    include:    include,
    member:     include,
    inGroupsOf: inGroupsOf,
    inject:     inject,
    invoke:     invoke,
    max:        max,
    min:        min,
    partition:  partition,
    pluck:      pluck,
    reject:     reject,
    sortBy:     sortBy,
    toArray:    toArray,
    entries:    toArray,
    zip:        zip,
    size:       size,
    inspect:    inspect,
    find:       detect
  };
})();
function $A(iterable) {
  if (!iterable) return [];
  if ('toArray' in Object(iterable)) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}

function $w(string) {
  if (!Object.isString(string)) return [];
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

Array.from = $A;


(function() {
  var arrayProto = Array.prototype,
      slice = arrayProto.slice,
      _each = arrayProto.forEach; // use native browser JS 1.6 implementation if available

  function each(iterator) {
    for (var i = 0, length = this.length; i < length; i++)
      iterator(this[i]);
  }
  if (!_each) _each = each;

  function clear() {
    this.length = 0;
    return this;
  }

  function first() {
    return this[0];
  }

  function last() {
    return this[this.length - 1];
  }

  function compact() {
    return this.select(function(value) {
      return value != null;
    });
  }

  function flatten() {
    return this.inject([], function(array, value) {
      if (Object.isArray(value))
        return array.concat(value.flatten());
      array.push(value);
      return array;
    });
  }

  function without() {
    var values = slice.call(arguments, 0);
    return this.select(function(value) {
      return !values.include(value);
    });
  }

  function reverse(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  }

  function uniq(sorted) {
    return this.inject([], function(array, value, index) {
      if (0 == index || (sorted ? array.last() != value : !array.include(value)))
        array.push(value);
      return array;
    });
  }

  function intersect(array) {
    return this.uniq().findAll(function(item) {
      return array.detect(function(value) { return item === value });
    });
  }


  function clone() {
    return slice.call(this, 0);
  }

  function size() {
    return this.length;
  }

  function inspect() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }

  function toJSON() {
    var results = [];
    this.each(function(object) {
      var value = Object.toJSON(object);
      if (!Object.isUndefined(value)) results.push(value);
    });
    return '[' + results.join(', ') + ']';
  }

  function indexOf(item, i) {
    i || (i = 0);
    var length = this.length;
    if (i < 0) i = length + i;
    for (; i < length; i++)
      if (this[i] === item) return i;
    return -1;
  }

  function lastIndexOf(item, i) {
    i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;
    var n = this.slice(0, i).reverse().indexOf(item);
    return (n < 0) ? n : i - n - 1;
  }

  function concat() {
    var array = slice.call(this, 0), item;
    for (var i = 0, length = arguments.length; i < length; i++) {
      item = arguments[i];
      if (Object.isArray(item) && !('callee' in item)) {
        for (var j = 0, arrayLength = item.length; j < arrayLength; j++)
          array.push(item[j]);
      } else {
        array.push(item);
      }
    }
    return array;
  }

  Object.extend(arrayProto, Enumerable);

  if (!arrayProto._reverse)
    arrayProto._reverse = arrayProto.reverse;

  Object.extend(arrayProto, {
    _each:     _each,
    clear:     clear,
    first:     first,
    last:      last,
    compact:   compact,
    flatten:   flatten,
    without:   without,
    reverse:   reverse,
    uniq:      uniq,
    intersect: intersect,
    clone:     clone,
    toArray:   clone,
    size:      size,
    inspect:   inspect,
    toJSON:    toJSON
  });

  var CONCAT_ARGUMENTS_BUGGY = (function() {
    return [].concat(arguments)[0][0] !== 1;
  })(1,2)

  if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

  if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
  if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
})();
function $H(object) {
  return new Hash(object);
};

var Hash = Class.create(Enumerable, (function() {
  function initialize(object) {
    this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
  }

  function _each(iterator) {
    for (var key in this._object) {
      var value = this._object[key], pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator(pair);
    }
  }

  function set(key, value) {
    return this._object[key] = value;
  }

  function get(key) {
    if (this._object[key] !== Object.prototype[key])
      return this._object[key];
  }

  function unset(key) {
    var value = this._object[key];
    delete this._object[key];
    return value;
  }

  function toObject() {
    return Object.clone(this._object);
  }

  function keys() {
    return this.pluck('key');
  }

  function values() {
    return this.pluck('value');
  }

  function index(value) {
    var match = this.detect(function(pair) {
      return pair.value === value;
    });
    return match && match.key;
  }

  function merge(object) {
    return this.clone().update(object);
  }

  function update(object) {
    return new Hash(object).inject(this, function(result, pair) {
      result.set(pair.key, pair.value);
      return result;
    });
  }

  function toQueryPair(key, value) {
    if (Object.isUndefined(value)) return key;
    return key + '=' + encodeURIComponent(String.interpret(value));
  }

  function toQueryString() {
    return this.inject([], function(results, pair) {
      var key = encodeURIComponent(pair.key), values = pair.value;

      if (values && typeof values == 'object') {
        if (Object.isArray(values))
          return results.concat(values.map(toQueryPair.curry(key)));
      } else results.push(toQueryPair(key, values));
      return results;
    }).join('&');
  }

  function inspect() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }

  function toJSON() {
    return Object.toJSON(this.toObject());
  }

  function clone() {
    return new Hash(this);
  }

  return {
    initialize:             initialize,
    _each:                  _each,
    set:                    set,
    get:                    get,
    unset:                  unset,
    toObject:               toObject,
    toTemplateReplacements: toObject,
    keys:                   keys,
    values:                 values,
    index:                  index,
    merge:                  merge,
    update:                 update,
    toQueryString:          toQueryString,
    inspect:                inspect,
    toJSON:                 toJSON,
    clone:                  clone
  };
})());

Hash.from = $H;
Object.extend(Number.prototype, (function() {
  function toColorPart() {
    return this.toPaddedString(2, 16);
  }

  function succ() {
    return this + 1;
  }

  function times(iterator, context) {
    $R(0, this, true).each(iterator, context);
    return this;
  }

  function toPaddedString(length, radix) {
    var string = this.toString(radix || 10);
    return '0'.times(length - string.length) + string;
  }

  function toJSON() {
    return isFinite(this) ? this.toString() : 'null';
  }

  function abs() {
    return Math.abs(this);
  }

  function round() {
    return Math.round(this);
  }

  function ceil() {
    return Math.ceil(this);
  }

  function floor() {
    return Math.floor(this);
  }

  return {
    toColorPart:    toColorPart,
    succ:           succ,
    times:          times,
    toPaddedString: toPaddedString,
    toJSON:         toJSON,
    abs:            abs,
    round:          round,
    ceil:           ceil,
    floor:          floor
  };
})());

function $R(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var ObjectRange = Class.create(Enumerable, (function() {
  function initialize(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  }

  function _each(iterator) {
    var value = this.start;
    while (this.include(value)) {
      iterator(value);
      value = value.succ();
    }
  }

  function include(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }

  return {
    initialize: initialize,
    _each:      _each,
    include:    include
  };
})());



var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (Object.isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) { }
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate:   function() { Ajax.activeRequestCount++ },
  onComplete: function() { Ajax.activeRequestCount-- }
});
Ajax.Base = Class.create({
  initialize: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   '',
      evalJSON:     true,
      evalJS:       true
    };
    Object.extend(this.options, options || { });

    this.options.method = this.options.method.toLowerCase();

    if (Object.isString(this.options.parameters))
      this.options.parameters = this.options.parameters.toQueryParams();
    else if (Object.isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }
});
Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,

  initialize: function($super, url, options) {
    $super(options);
    this.transport = Ajax.getTransport();
    this.request(url);
  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = Object.clone(this.options.parameters);

    if (!['get', 'post'].include(this.method)) {
      params['_method'] = this.method;
      this.method = 'post';
    }

    this.parameters = params;

    if (params = Object.toQueryString(params)) {
      if (this.method == 'get')
        this.url += (this.url.include('?') ? '&' : '?') + params;
      else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent))
        params += '&_=';
    }

    try {
      var response = new Ajax.Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Ajax.Responders.dispatch('onCreate', this, response);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      this.body = this.method == 'post' ? (this.options.postBody || params) : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (Object.isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    var status = this.getStatus();
    return !status || (status >= 200 && status < 300);
  },

  getStatus: function() {
    try {
      return this.transport.status || 0;
    } catch (e) { return 0 }
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + response.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (this.options.evalJS == 'force'
          || (this.options.evalJS && this.isSameOrigin() && contentType
          && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
        this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
      Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function() {
    var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ':' + location.port : ''
    }));
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) { return null; }
  },

  evalResponse: function() {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];


Ajax.Response = Class.create({
  initialize: function(request){
    this.request = request;
    var transport  = this.transport  = request.transport,
        readyState = this.readyState = transport.readyState;

    if((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
      this.status       = this.getStatus();
      this.statusText   = this.getStatusText();
      this.responseText = String.interpret(transport.responseText);
      this.headerJSON   = this._getHeaderJSON();
    }

    if(readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML  = Object.isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  },

  status:      0,

  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function() {
    try {
      return this.transport.statusText || '';
    } catch (e) { return '' }
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getAllHeaders: function() {
    try {
      return this.getAllResponseHeaders();
    } catch (e) { return null }
  },

  getResponseHeader: function(name) {
    return this.transport.getResponseHeader(name);
  },

  getAllResponseHeaders: function() {
    return this.transport.getAllResponseHeaders();
  },

  _getHeaderJSON: function() {
    var json = this.getHeader('X-JSON');
    if (!json) return null;
    json = decodeURIComponent(escape(json));
    try {
      return json.evalJSON(this.request.options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  },

  _getResponseJSON: function() {
    var options = this.request.options;
    if (!options.evalJSON || (options.evalJSON != 'force' &&
      !(this.getHeader('Content-type') || '').include('application/json')) ||
        this.responseText.blank())
          return null;
    try {
      return this.responseText.evalJSON(options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }
});

Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    };

    options = Object.clone(options);
    var onComplete = options.onComplete;
    options.onComplete = (function(response, json) {
      this.updateContent(response.responseText);
      if (Object.isFunction(onComplete)) onComplete(response, json);
    }).bind(this);

    $super(url, options);
  },

  updateContent: function(responseText) {
    var receiver = this.container[this.success() ? 'success' : 'failure'],
        options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if (receiver = $(receiver)) {
      if (options.insertion) {
        if (Object.isString(options.insertion)) {
          var insertion = { }; insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        }
        else options.insertion(receiver, responseText);
      }
      else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = { };
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(response) {
    if (this.options.decay) {
      this.decay = (response.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});



function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (Object.isString(element))
    element = document.getElementById(element);
  return Element.extend(element);
}

if (Prototype.BrowserFeatures.XPath) {
  document._getElementsByXPath = function(expression, parentElement) {
    var results = [];
    var query = document.evaluate(expression, $(parentElement) || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
      results.push(Element.extend(query.snapshotItem(i)));
    return results;
  };
}

/*--------------------------------------------------------------------------*/

if (!window.Node) var Node = { };

if (!Node.ELEMENT_NODE) {
  Object.extend(Node, {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  });
}


(function(global) {

  var SETATTRIBUTE_IGNORES_NAME = (function(){
    var elForm = document.createElement("form");
    var elInput = document.createElement("input");
    var root = document.documentElement;
    elInput.setAttribute("name", "test");
    elForm.appendChild(elInput);
    root.appendChild(elForm);
    var isBuggy = elForm.elements
      ? (typeof elForm.elements.test == "undefined")
      : null;
    root.removeChild(elForm);
    elForm = elInput = null;
    return isBuggy;
  })();

  var element = global.Element;
  global.Element = function(tagName, attributes) {
    attributes = attributes || { };
    tagName = tagName.toLowerCase();
    var cache = Element.cache;
    if (SETATTRIBUTE_IGNORES_NAME && attributes.name) {
      tagName = '<' + tagName + ' name="' + attributes.name + '">';
      delete attributes.name;
      return Element.writeAttribute(document.createElement(tagName), attributes);
    }
    if (!cache[tagName]) cache[tagName] = Element.extend(document.createElement(tagName));
    return Element.writeAttribute(cache[tagName].cloneNode(false), attributes);
  };
  Object.extend(global.Element, element || { });
  if (element) global.Element.prototype = element.prototype;
})(this);

Element.cache = { };
Element.idCounter = 1;

Element.Methods = {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function(element) {
    element = $(element);
    Element[Element.visible(element) ? 'hide' : 'show'](element);
    return element;
  },


  hide: function(element) {
    element = $(element);
    element.style.display = 'none';
    return element;
  },

  show: function(element) {
    element = $(element);
    element.style.display = '';
    return element;
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  },

  update: (function(){

    var SELECT_ELEMENT_INNERHTML_BUGGY = (function(){
      var el = document.createElement("select"),
          isBuggy = true;
      el.innerHTML = "<option value=\"test\">test</option>";
      if (el.options && el.options[0]) {
        isBuggy = el.options[0].nodeName.toUpperCase() !== "OPTION";
      }
      el = null;
      return isBuggy;
    })();

    var TABLE_ELEMENT_INNERHTML_BUGGY = (function(){
      try {
        var el = document.createElement("table");
        if (el && el.tBodies) {
          el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
          var isBuggy = typeof el.tBodies[0] == "undefined";
          el = null;
          return isBuggy;
        }
      } catch (e) {
        return true;
      }
    })();

    var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (function () {
      var s = document.createElement("script"),
          isBuggy = false;
      try {
        s.appendChild(document.createTextNode(""));
        isBuggy = !s.firstChild ||
          s.firstChild && s.firstChild.nodeType !== 3;
      } catch (e) {
        isBuggy = true;
      }
      s = null;
      return isBuggy;
    })();

    function update(element, content) {
      element = $(element);

      if (content && content.toElement)
        content = content.toElement();

      if (Object.isElement(content))
        return element.update().insert(content);

      content = Object.toHTML(content);

      var tagName = element.tagName.toUpperCase();

      if (tagName === 'SCRIPT' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
        element.text = content;
        return element;
      }

      if (SELECT_ELEMENT_INNERHTML_BUGGY || TABLE_ELEMENT_INNERHTML_BUGGY) {
        if (tagName in Element._insertionTranslations.tags) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
          Element._getContentFromAnonymousElement(tagName, content.stripScripts())
            .each(function(node) {
              element.appendChild(node)
            });
        }
        else {
          element.innerHTML = content.stripScripts();
        }
      }
      else {
        element.innerHTML = content.stripScripts();
      }

      content.evalScripts.bind(content).defer();
      return element;
    }

    return update;
  })(),

  replace: function(element, content) {
    element = $(element);
    if (content && content.toElement) content = content.toElement();
    else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }
    element.parentNode.replaceChild(content, element);
    return element;
  },

  insert: function(element, insertions) {
    element = $(element);

    if (Object.isString(insertions) || Object.isNumber(insertions) ||
        Object.isElement(insertions) || (insertions && (insertions.toElement || insertions.toHTML)))
          insertions = {bottom:insertions};

    var content, insert, tagName, childNodes;

    for (var position in insertions) {
      content  = insertions[position];
      position = position.toLowerCase();
      insert = Element._insertionTranslations[position];

      if (content && content.toElement) content = content.toElement();
      if (Object.isElement(content)) {
        insert(element, content);
        continue;
      }

      content = Object.toHTML(content);

      tagName = ((position == 'before' || position == 'after')
        ? element.parentNode : element).tagName.toUpperCase();

      childNodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts());

      if (position == 'top' || position == 'after') childNodes.reverse();
      childNodes.each(insert.curry(element));

      content.evalScripts.bind(content).defer();
    }

    return element;
  },

  wrap: function(element, wrapper, attributes) {
    element = $(element);
    if (Object.isElement(wrapper))
      $(wrapper).writeAttribute(attributes || { });
    else if (Object.isString(wrapper)) wrapper = new Element(wrapper, attributes);
    else wrapper = new Element('div', wrapper);
    if (element.parentNode)
      element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
    return wrapper;
  },

  inspect: function(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();
    $H({'id': 'id', 'className': 'class'}).each(function(pair) {
      var property = pair.first(), attribute = pair.last();
      var value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    });
    return result + '>';
  },

  recursivelyCollect: function(element, property) {
    element = $(element);
    var elements = [];
    while (element = element[property])
      if (element.nodeType == 1)
        elements.push(Element.extend(element));
    return elements;
  },

  ancestors: function(element) {
    return Element.recursivelyCollect(element, 'parentNode');
  },

  descendants: function(element) {
    return Element.select(element, "*");
  },

  firstDescendant: function(element) {
    element = $(element).firstChild;
    while (element && element.nodeType != 1) element = element.nextSibling;
    return $(element);
  },

  immediateDescendants: function(element) {
    if (!(element = $(element).firstChild)) return [];
    while (element && element.nodeType != 1) element = element.nextSibling;
    if (element) return [element].concat($(element).nextSiblings());
    return [];
  },

  previousSiblings: function(element) {
    return Element.recursivelyCollect(element, 'previousSibling');
  },

  nextSiblings: function(element) {
    return Element.recursivelyCollect(element, 'nextSibling');
  },

  siblings: function(element) {
    element = $(element);
    return Element.previousSiblings(element).reverse()
      .concat(Element.nextSiblings(element));
  },

  match: function(element, selector) {
    if (Object.isString(selector))
      selector = new Selector(selector);
    return selector.match($(element));
  },

  up: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(element.parentNode);
    var ancestors = Element.ancestors(element);
    return Object.isNumber(expression) ? ancestors[expression] :
      Selector.findElement(ancestors, expression, index);
  },

  down: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return Element.firstDescendant(element);
    return Object.isNumber(expression) ? Element.descendants(element)[expression] :
      Element.select(element, expression)[index || 0];
  },

  previous: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(Selector.handlers.previousElementSibling(element));
    var previousSiblings = Element.previousSiblings(element);
    return Object.isNumber(expression) ? previousSiblings[expression] :
      Selector.findElement(previousSiblings, expression, index);
  },

  next: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(Selector.handlers.nextElementSibling(element));
    var nextSiblings = Element.nextSiblings(element);
    return Object.isNumber(expression) ? nextSiblings[expression] :
      Selector.findElement(nextSiblings, expression, index);
  },


  select: function(element) {
    var args = Array.prototype.slice.call(arguments, 1);
    return Selector.findChildElements(element, args);
  },

  adjacent: function(element) {
    var args = Array.prototype.slice.call(arguments, 1);
    return Selector.findChildElements(element.parentNode, args).without(element);
  },

  identify: function(element) {
    element = $(element);
    var id = Element.readAttribute(element, 'id');
    if (id) return id;
    do { id = 'anonymous_element_' + Element.idCounter++ } while ($(id));
    Element.writeAttribute(element, 'id', id);
    return id;
  },

  readAttribute: function(element, name) {
    element = $(element);
    if (Prototype.Browser.IE) {
      var t = Element._attributeTranslations.read;
      if (t.values[name]) return t.values[name](element, name);
      if (t.names[name]) name = t.names[name];
      if (name.include(':')) {
        return (!element.attributes || !element.attributes[name]) ? null :
         element.attributes[name].value;
      }
    }
    return element.getAttribute(name);
  },

  writeAttribute: function(element, name, value) {
    element = $(element);
    var attributes = { }, t = Element._attributeTranslations.write;

    if (typeof name == 'object') attributes = name;
    else attributes[name] = Object.isUndefined(value) ? true : value;

    for (var attr in attributes) {
      name = t.names[attr] || attr;
      value = attributes[attr];
      if (t.values[attr]) name = t.values[attr](element, value);
      if (value === false || value === null)
        element.removeAttribute(name);
      else if (value === true)
        element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }
    return element;
  },

  getHeight: function(element) {
    return Element.getDimensions(element).height;
  },

  getWidth: function(element) {
    return Element.getDimensions(element).width;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className ||
      new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    if (!Element.hasClassName(element, className))
      element.className += (element.className ? ' ' : '') + className;
    return element;
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    element.className = element.className.replace(
      new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').strip();
    return element;
  },

  toggleClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element[Element.hasClassName(element, className) ?
      'removeClassName' : 'addClassName'](element, className);
  },

  cleanWhitespace: function(element) {
    element = $(element);
    var node = element.firstChild;
    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  },

  empty: function(element) {
    return $(element).innerHTML.blank();
  },

  descendantOf: function(element, ancestor) {
    element = $(element), ancestor = $(ancestor);

    if (element.compareDocumentPosition)
      return (element.compareDocumentPosition(ancestor) & 8) === 8;

    if (ancestor.contains)
      return ancestor.contains(element) && ancestor !== element;

    while (element = element.parentNode)
      if (element == ancestor) return true;

    return false;
  },

  scrollTo: function(element) {
    element = $(element);
    var pos = Element.cumulativeOffset(element);
    window.scrollTo(pos[0], pos[1]);
    return element;
  },

  getStyle: function(element, style) {
    element = $(element);
    style = style == 'float' ? 'cssFloat' : style.camelize();
    var value = element.style[style];
    if (!value || value == 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }
    if (style == 'opacity') return value ? parseFloat(value) : 1.0;
    return value == 'auto' ? null : value;
  },

  getOpacity: function(element) {
    return $(element).getStyle('opacity');
  },

  setStyle: function(element, styles) {
    element = $(element);
    var elementStyle = element.style, match;
    if (Object.isString(styles)) {
      element.style.cssText += ';' + styles;
      return styles.include('opacity') ?
        element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
    }
    for (var property in styles)
      if (property == 'opacity') element.setOpacity(styles[property]);
      else
        elementStyle[(property == 'float' || property == 'cssFloat') ?
          (Object.isUndefined(elementStyle.styleFloat) ? 'cssFloat' : 'styleFloat') :
            property] = styles[property];

    return element;
  },

  setOpacity: function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;
    return element;
  },

  getDimensions: function(element) {
    element = $(element);
    var display = Element.getStyle(element, 'display');
    if (display != 'none' && display != null) // Safari bug
      return {width: element.offsetWidth, height: element.offsetHeight};

    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    var originalDisplay = els.display;
    els.visibility = 'hidden';
    if (originalPosition != 'fixed') // Switching fixed to absolute causes issues in Safari
      els.position = 'absolute';
    els.display = 'block';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = originalDisplay;
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      if (Prototype.Browser.Opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
    return element;
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
    return element;
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return element;
    element._overflow = Element.getStyle(element, 'overflow') || 'auto';
    if (element._overflow !== 'hidden')
      element.style.overflow = 'hidden';
    return element;
  },

  undoClipping: function(element) {
    element = $(element);
    if (!element._overflow) return element;
    element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;
    element._overflow = null;
    return element;
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (element.tagName.toUpperCase() == 'BODY') break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  absolutize: function(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') == 'absolute') return element;

    var offsets = Element.positionedOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.width  = width + 'px';
    element.style.height = height + 'px';
    return element;
  },

  relativize: function(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') == 'relative') return element;

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
    return element;
  },

  cumulativeScrollOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  getOffsetParent: function(element) {
    if (element.offsetParent) return $(element.offsetParent);
    if (element == document.body) return $(element);

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return $(element);

    return $(document.body);
  },

  viewportOffset: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      if (element.offsetParent == document.body &&
        Element.getStyle(element, 'position') == 'absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (!Prototype.Browser.Opera || (element.tagName && (element.tagName.toUpperCase() == 'BODY'))) {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);

    return Element._returnOffset(valueL, valueT);
  },

  clonePosition: function(element, source) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || { });

    source = $(source);
    var p = Element.viewportOffset(source);

    element = $(element);
    var delta = [0, 0];
    var parent = null;
    if (Element.getStyle(element, 'position') == 'absolute') {
      parent = Element.getOffsetParent(element);
      delta = Element.viewportOffset(parent);
    }

    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    if (options.setLeft)   element.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if (options.setTop)    element.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if (options.setWidth)  element.style.width = source.offsetWidth + 'px';
    if (options.setHeight) element.style.height = source.offsetHeight + 'px';
    return element;
  }
};

Object.extend(Element.Methods, {
  getElementsBySelector: Element.Methods.select,

  childElements: Element.Methods.immediateDescendants
});

Element._attributeTranslations = {
  write: {
    names: {
      className: 'class',
      htmlFor:   'for'
    },
    values: { }
  }
};

if (Prototype.Browser.Opera) {
  Element.Methods.getStyle = Element.Methods.getStyle.wrap(
    function(proceed, element, style) {
      switch (style) {
        case 'left': case 'top': case 'right': case 'bottom':
          if (proceed(element, 'position') === 'static') return null;
        case 'height': case 'width':
          if (!Element.visible(element)) return null;

          var dim = parseInt(proceed(element, style), 10);

          if (dim !== element['offset' + style.capitalize()])
            return dim + 'px';

          var properties;
          if (style === 'height') {
            properties = ['border-top-width', 'padding-top',
             'padding-bottom', 'border-bottom-width'];
          }
          else {
            properties = ['border-left-width', 'padding-left',
             'padding-right', 'border-right-width'];
          }
          return properties.inject(dim, function(memo, property) {
            var val = proceed(element, property);
            return val === null ? memo : memo - parseInt(val, 10);
          }) + 'px';
        default: return proceed(element, style);
      }
    }
  );

  Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(
    function(proceed, element, attribute) {
      if (attribute === 'title') return element.title;
      return proceed(element, attribute);
    }
  );
}

else if (Prototype.Browser.IE) {
  Element.Methods.getOffsetParent = Element.Methods.getOffsetParent.wrap(
    function(proceed, element) {
      element = $(element);
      try { element.offsetParent }
      catch(e) { return $(document.body) }
      var position = element.getStyle('position');
      if (position !== 'static') return proceed(element);
      element.setStyle({ position: 'relative' });
      var value = proceed(element);
      element.setStyle({ position: position });
      return value;
    }
  );

  $w('positionedOffset viewportOffset').each(function(method) {
    Element.Methods[method] = Element.Methods[method].wrap(
      function(proceed, element) {
        element = $(element);
        try { element.offsetParent }
        catch(e) { return Element._returnOffset(0,0) }
        var position = element.getStyle('position');
        if (position !== 'static') return proceed(element);
        var offsetParent = element.getOffsetParent();
        if (offsetParent && offsetParent.getStyle('position') === 'fixed')
          offsetParent.setStyle({ zoom: 1 });
        element.setStyle({ position: 'relative' });
        var value = proceed(element);
        element.setStyle({ position: position });
        return value;
      }
    );
  });

  Element.Methods.cumulativeOffset = Element.Methods.cumulativeOffset.wrap(
    function(proceed, element) {
      try { element.offsetParent }
      catch(e) { return Element._returnOffset(0,0) }
      return proceed(element);
    }
  );

  Element.Methods.getStyle = function(element, style) {
    element = $(element);
    style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style.camelize();
    var value = element.style[style];
    if (!value && element.currentStyle) value = element.currentStyle[style];

    if (style == 'opacity') {
      if (value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/))
        if (value[1]) return parseFloat(value[1]) / 100;
      return 1.0;
    }

    if (value == 'auto') {
      if ((style == 'width' || style == 'height') && (element.getStyle('display') != 'none'))
        return element['offset' + style.capitalize()] + 'px';
      return null;
    }
    return value;
  };

  Element.Methods.setOpacity = function(element, value) {
    function stripAlpha(filter){
      return filter.replace(/alpha\([^\)]*\)/gi,'');
    }
    element = $(element);
    var currentStyle = element.currentStyle;
    if ((currentStyle && !currentStyle.hasLayout) ||
      (!currentStyle && element.style.zoom == 'normal'))
        element.style.zoom = 1;

    var filter = element.getStyle('filter'), style = element.style;
    if (value == 1 || value === '') {
      (filter = stripAlpha(filter)) ?
        style.filter = filter : style.removeAttribute('filter');
      return element;
    } else if (value < 0.00001) value = 0;
    style.filter = stripAlpha(filter) +
      'alpha(opacity=' + (value * 100) + ')';
    return element;
  };

  Element._attributeTranslations = (function(){

    var classProp = 'className';
    var forProp = 'for';

    var el = document.createElement('div');

    el.setAttribute(classProp, 'x');

    if (el.className !== 'x') {
      el.setAttribute('class', 'x');
      if (el.className === 'x') {
        classProp = 'class';
      }
    }
    el = null;

    el = document.createElement('label');
    el.setAttribute(forProp, 'x');
    if (el.htmlFor !== 'x') {
      el.setAttribute('htmlFor', 'x');
      if (el.htmlFor === 'x') {
        forProp = 'htmlFor';
      }
    }
    el = null;

    return {
      read: {
        names: {
          'class':      classProp,
          'className':  classProp,
          'for':        forProp,
          'htmlFor':    forProp
        },
        values: {
          _getAttr: function(element, attribute) {
            return element.getAttribute(attribute);
          },
          _getAttr2: function(element, attribute) {
            return element.getAttribute(attribute, 2);
          },
          _getAttrNode: function(element, attribute) {
            var node = element.getAttributeNode(attribute);
            return node ? node.value : "";
          },
          _getEv: (function(){

            var el = document.createElement('div');
            el.onclick = Prototype.emptyFunction;
            var value = el.getAttribute('onclick');
            var f;

            if (String(value).indexOf('{') > -1) {
              f = function(element, attribute) {
                attribute = element.getAttribute(attribute);
                if (!attribute) return null;
                attribute = attribute.toString();
                attribute = attribute.split('{')[1];
                attribute = attribute.split('}')[0];
                return attribute.strip();
              };
            }
            else if (value === '') {
              f = function(element, attribute) {
                attribute = element.getAttribute(attribute);
                if (!attribute) return null;
                return attribute.strip();
              };
            }
            el = null;
            return f;
          })(),
          _flag: function(element, attribute) {
            return $(element).hasAttribute(attribute) ? attribute : null;
          },
          style: function(element) {
            return element.style.cssText.toLowerCase();
          },
          title: function(element) {
            return element.title;
          }
        }
      }
    }
  })();

  Element._attributeTranslations.write = {
    names: Object.extend({
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing'
    }, Element._attributeTranslations.read.names),
    values: {
      checked: function(element, value) {
        element.checked = !!value;
      },

      style: function(element, value) {
        element.style.cssText = value ? value : '';
      }
    }
  };

  Element._attributeTranslations.has = {};

  $w('colSpan rowSpan vAlign dateTime accessKey tabIndex ' +
      'encType maxLength readOnly longDesc frameBorder').each(function(attr) {
    Element._attributeTranslations.write.names[attr.toLowerCase()] = attr;
    Element._attributeTranslations.has[attr.toLowerCase()] = attr;
  });

  (function(v) {
    Object.extend(v, {
      href:        v._getAttr2,
      src:         v._getAttr2,
      type:        v._getAttr,
      action:      v._getAttrNode,
      disabled:    v._flag,
      checked:     v._flag,
      readonly:    v._flag,
      multiple:    v._flag,
      onload:      v._getEv,
      onunload:    v._getEv,
      onclick:     v._getEv,
      ondblclick:  v._getEv,
      onmousedown: v._getEv,
      onmouseup:   v._getEv,
      onmouseover: v._getEv,
      onmousemove: v._getEv,
      onmouseout:  v._getEv,
      onfocus:     v._getEv,
      onblur:      v._getEv,
      onkeypress:  v._getEv,
      onkeydown:   v._getEv,
      onkeyup:     v._getEv,
      onsubmit:    v._getEv,
      onreset:     v._getEv,
      onselect:    v._getEv,
      onchange:    v._getEv
    });
  })(Element._attributeTranslations.read.values);

  if (Prototype.BrowserFeatures.ElementExtensions) {
    (function() {
      function _descendants(element) {
        var nodes = element.getElementsByTagName('*'), results = [];
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.tagName !== "!") // Filter out comment nodes.
            results.push(node);
        return results;
      }

      Element.Methods.down = function(element, expression, index) {
        element = $(element);
        if (arguments.length == 1) return element.firstDescendant();
        return Object.isNumber(expression) ? _descendants(element)[expression] :
          Element.select(element, expression)[index || 0];
      }
    })();
  }

}

else if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent)) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1) ? 0.999999 :
      (value === '') ? '' : (value < 0.00001) ? 0 : value;
    return element;
  };
}

else if (Prototype.Browser.WebKit) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;

    if (value == 1)
      if(element.tagName.toUpperCase() == 'IMG' && element.width) {
        element.width++; element.width--;
      } else try {
        var n = document.createTextNode(' ');
        element.appendChild(n);
        element.removeChild(n);
      } catch (e) { }

    return element;
  };

  Element.Methods.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return Element._returnOffset(valueL, valueT);
  };
}

if ('outerHTML' in document.documentElement) {
  Element.Methods.replace = function(element, content) {
    element = $(element);

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      element.parentNode.replaceChild(content, element);
      return element;
    }

    content = Object.toHTML(content);
    var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

    if (Element._insertionTranslations.tags[tagName]) {
      var nextSibling = element.next();
      var fragments = Element._getContentFromAnonymousElement(tagName, content.stripScripts());
      parent.removeChild(element);
      if (nextSibling)
        fragments.each(function(node) { parent.insertBefore(node, nextSibling) });
      else
        fragments.each(function(node) { parent.appendChild(node) });
    }
    else element.outerHTML = content.stripScripts();

    content.evalScripts.bind(content).defer();
    return element;
  };
}

Element._returnOffset = function(l, t) {
  var result = [l, t];
  result.left = l;
  result.top = t;
  return result;
};

Element._getContentFromAnonymousElement = function(tagName, html) {
  var div = new Element('div'), t = Element._insertionTranslations.tags[tagName];
  if (t) {
    div.innerHTML = t[0] + html + t[1];
    t[2].times(function() { div = div.firstChild });
  } else div.innerHTML = html;
  return $A(div.childNodes);
};

Element._insertionTranslations = {
  before: function(element, node) {
    element.parentNode.insertBefore(node, element);
  },
  top: function(element, node) {
    element.insertBefore(node, element.firstChild);
  },
  bottom: function(element, node) {
    element.appendChild(node);
  },
  after: function(element, node) {
    element.parentNode.insertBefore(node, element.nextSibling);
  },
  tags: {
    TABLE:  ['<table>',                '</table>',                   1],
    TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
    TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
    TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
    SELECT: ['<select>',               '</select>',                  1]
  }
};

(function() {
  var tags = Element._insertionTranslations.tags;
  Object.extend(tags, {
    THEAD: tags.TBODY,
    TFOOT: tags.TBODY,
    TH:    tags.TD
  });
})();

Element.Methods.Simulated = {
  hasAttribute: function(element, attribute) {
    attribute = Element._attributeTranslations.has[attribute] || attribute;
    var node = $(element).getAttributeNode(attribute);
    return !!(node && node.specified);
  }
};

Element.Methods.ByTag = { };

Object.extend(Element, Element.Methods);

(function(div) {

  if (!Prototype.BrowserFeatures.ElementExtensions && div['__proto__']) {
    window.HTMLElement = { };
    window.HTMLElement.prototype = div['__proto__'];
    Prototype.BrowserFeatures.ElementExtensions = true;
  }

  div = null;

})(document.createElement('div'))

Element.extend = (function() {

  function checkDeficiency(tagName) {
    if (typeof window.Element != 'undefined') {
      var proto = window.Element.prototype;
      if (proto) {
        var id = '_' + (Math.random()+'').slice(2);
        var el = document.createElement(tagName);
        proto[id] = 'x';
        var isBuggy = (el[id] !== 'x');
        delete proto[id];
        el = null;
        return isBuggy;
      }
    }
    return false;
  }

  function extendElementWith(element, methods) {
    for (var property in methods) {
      var value = methods[property];
      if (Object.isFunction(value) && !(property in element))
        element[property] = value.methodize();
    }
  }

  var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY = checkDeficiency('object');

  if (Prototype.BrowserFeatures.SpecificElementExtensions) {
    if (HTMLOBJECTELEMENT_PROTOTYPE_BUGGY) {
      return function(element) {
        if (element && typeof element._extendedByPrototype == 'undefined') {
          var t = element.tagName;
          if (t && (/^(?:object|applet|embed)$/i.test(t))) {
            extendElementWith(element, Element.Methods);
            extendElementWith(element, Element.Methods.Simulated);
            extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]);
          }
        }
        return element;
      }
    }
    return Prototype.K;
  }

  var Methods = { }, ByTag = Element.Methods.ByTag;

  var extend = Object.extend(function(element) {
    if (!element || typeof element._extendedByPrototype != 'undefined' ||
        element.nodeType != 1 || element == window) return element;

    var methods = Object.clone(Methods),
        tagName = element.tagName.toUpperCase();

    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

    extendElementWith(element, methods);

    element._extendedByPrototype = Prototype.emptyFunction;
    return element;

  }, {
    refresh: function() {
      if (!Prototype.BrowserFeatures.ElementExtensions) {
        Object.extend(Methods, Element.Methods);
        Object.extend(Methods, Element.Methods.Simulated);
      }
    }
  });

  extend.refresh();
  return extend;
})();

Element.hasAttribute = function(element, attribute) {
  if (element.hasAttribute) return element.hasAttribute(attribute);
  return Element.Methods.Simulated.hasAttribute(element, attribute);
};

Element.addMethods = function(methods) {
  var F = Prototype.BrowserFeatures, T = Element.Methods.ByTag;

  if (!methods) {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      "FORM":     Object.clone(Form.Methods),
      "INPUT":    Object.clone(Form.Element.Methods),
      "SELECT":   Object.clone(Form.Element.Methods),
      "TEXTAREA": Object.clone(Form.Element.Methods)
    });
  }

  if (arguments.length == 2) {
    var tagName = methods;
    methods = arguments[1];
  }

  if (!tagName) Object.extend(Element.Methods, methods || { });
  else {
    if (Object.isArray(tagName)) tagName.each(extend);
    else extend(tagName);
  }

  function extend(tagName) {
    tagName = tagName.toUpperCase();
    if (!Element.Methods.ByTag[tagName])
      Element.Methods.ByTag[tagName] = { };
    Object.extend(Element.Methods.ByTag[tagName], methods);
  }

  function copy(methods, destination, onlyIfAbsent) {
    onlyIfAbsent = onlyIfAbsent || false;
    for (var property in methods) {
      var value = methods[property];
      if (!Object.isFunction(value)) continue;
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = value.methodize();
    }
  }

  function findDOMClass(tagName) {
    var klass;
    var trans = {
      "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
      "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
      "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
      "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
      "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
      "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
      "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
      "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
      "FrameSet", "IFRAME": "IFrame"
    };
    if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName.capitalize() + 'Element';
    if (window[klass]) return window[klass];

    var element = document.createElement(tagName);
    var proto = element['__proto__'] || element.constructor.prototype;
    element = null;
    return proto;
  }

  var elementPrototype = window.HTMLElement ? HTMLElement.prototype :
   Element.prototype;

  if (F.ElementExtensions) {
    copy(Element.Methods, elementPrototype);
    copy(Element.Methods.Simulated, elementPrototype, true);
  }

  if (F.SpecificElementExtensions) {
    for (var tag in Element.Methods.ByTag) {
      var klass = findDOMClass(tag);
      if (Object.isUndefined(klass)) continue;
      copy(T[tag], klass.prototype);
    }
  }

  Object.extend(Element, Element.Methods);
  delete Element.ByTag;

  if (Element.extend.refresh) Element.extend.refresh();
  Element.cache = { };
};


document.viewport = {

  getDimensions: function() {
    return { width: this.getWidth(), height: this.getHeight() };
  },

  getScrollOffsets: function() {
    return Element._returnOffset(
      window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop);
  }
};

(function(viewport) {
  var B = Prototype.Browser, doc = document, element, property = {};

  function getRootElement() {
    if (B.WebKit && !doc.evaluate)
      return document;

    if (B.Opera && window.parseFloat(window.opera.version()) < 9.5)
      return document.body;

    return document.documentElement;
  }

  function define(D) {
    if (!element) element = getRootElement();

    property[D] = 'client' + D;

    viewport['get' + D] = function() { return element[property[D]] };
    return viewport['get' + D]();
  }

  viewport.getWidth  = define.curry('Width');

  viewport.getHeight = define.curry('Height');
})(document.viewport);


Element.Storage = {
  UID: 1
};

Element.addMethods({
  getStorage: function(element) {
    if (!(element = $(element))) return;

    var uid;
    if (element === window) {
      uid = 0;
    } else {
      if (typeof element._prototypeUID === "undefined")
        element._prototypeUID = [Element.Storage.UID++];
      uid = element._prototypeUID[0];
    }

    if (!Element.Storage[uid])
      Element.Storage[uid] = $H();

    return Element.Storage[uid];
  },

  store: function(element, key, value) {
    if (!(element = $(element))) return;

    if (arguments.length === 2) {
      Element.getStorage(element).update(key);
    } else {
      Element.getStorage(element).set(key, value);
    }

    return element;
  },

  retrieve: function(element, key, defaultValue) {
    if (!(element = $(element))) return;
    var hash = Element.getStorage(element), value = hash.get(key);

    if (Object.isUndefined(value)) {
      hash.set(key, defaultValue);
      value = defaultValue;
    }

    return value;
  },

  clone: function(element, deep) {
    if (!(element = $(element))) return;
    var clone = element.cloneNode(deep);
    clone._prototypeUID = void 0;
    if (deep) {
      var descendants = Element.select(clone, '*'),
          i = descendants.length;
      while (i--) {
        descendants[i]._prototypeUID = void 0;
      }
    }
    return Element.extend(clone);
  }
});
/* Portions of the Selector class are derived from Jack Slocum's DomQuery,
 * part of YUI-Ext version 0.40, distributed under the terms of an MIT-style
 * license.  Please see http://www.yui-ext.com/ for more information. */

var Selector = Class.create({
  initialize: function(expression) {
    this.expression = expression.strip();

    if (this.shouldUseSelectorsAPI()) {
      this.mode = 'selectorsAPI';
    } else if (this.shouldUseXPath()) {
      this.mode = 'xpath';
      this.compileXPathMatcher();
    } else {
      this.mode = "normal";
      this.compileMatcher();
    }

  },

  shouldUseXPath: (function() {

    var IS_DESCENDANT_SELECTOR_BUGGY = (function(){
      var isBuggy = false;
      if (document.evaluate && window.XPathResult) {
        var el = document.createElement('div');
        el.innerHTML = '<ul><li></li></ul><div><ul><li></li></ul></div>';

        var xpath = ".//*[local-name()='ul' or local-name()='UL']" +
          "//*[local-name()='li' or local-name()='LI']";

        var result = document.evaluate(xpath, el, null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        isBuggy = (result.snapshotLength !== 2);
        el = null;
      }
      return isBuggy;
    })();

    return function() {
      if (!Prototype.BrowserFeatures.XPath) return false;

      var e = this.expression;

      if (Prototype.Browser.WebKit &&
       (e.include("-of-type") || e.include(":empty")))
        return false;

      if ((/(\[[\w-]*?:|:checked)/).test(e))
        return false;

      if (IS_DESCENDANT_SELECTOR_BUGGY) return false;

      return true;
    }

  })(),

  shouldUseSelectorsAPI: function() {
    if (!Prototype.BrowserFeatures.SelectorsAPI) return false;

    if (Selector.CASE_INSENSITIVE_CLASS_NAMES) return false;

    if (!Selector._div) Selector._div = new Element('div');

    try {
      Selector._div.querySelector(this.expression);
    } catch(e) {
      return false;
    }

    return true;
  },

  compileMatcher: function() {
    var e = this.expression, ps = Selector.patterns, h = Selector.handlers,
        c = Selector.criteria, le, p, m, len = ps.length, name;

    if (Selector._cache[e]) {
      this.matcher = Selector._cache[e];
      return;
    }

    this.matcher = ["this.matcher = function(root) {",
                    "var r = root, h = Selector.handlers, c = false, n;"];

    while (e && le != e && (/\S/).test(e)) {
      le = e;
      for (var i = 0; i<len; i++) {
        p = ps[i].re;
        name = ps[i].name;
        if (m = e.match(p)) {
          this.matcher.push(Object.isFunction(c[name]) ? c[name](m) :
            new Template(c[name]).evaluate(m));
          e = e.replace(m[0], '');
          break;
        }
      }
    }

    this.matcher.push("return h.unique(n);\n}");
    eval(this.matcher.join('\n'));
    Selector._cache[this.expression] = this.matcher;
  },

  compileXPathMatcher: function() {
    var e = this.expression, ps = Selector.patterns,
        x = Selector.xpath, le, m, len = ps.length, name;

    if (Selector._cache[e]) {
      this.xpath = Selector._cache[e]; return;
    }

    this.matcher = ['.//*'];
    while (e && le != e && (/\S/).test(e)) {
      le = e;
      for (var i = 0; i<len; i++) {
        name = ps[i].name;
        if (m = e.match(ps[i].re)) {
          this.matcher.push(Object.isFunction(x[name]) ? x[name](m) :
            new Template(x[name]).evaluate(m));
          e = e.replace(m[0], '');
          break;
        }
      }
    }

    this.xpath = this.matcher.join('');
    Selector._cache[this.expression] = this.xpath;
  },

  findElements: function(root) {
    root = root || document;
    var e = this.expression, results;

    switch (this.mode) {
      case 'selectorsAPI':
        if (root !== document) {
          var oldId = root.id, id = $(root).identify();
          id = id.replace(/([\.:])/g, "\\$1");
          e = "#" + id + " " + e;
        }

        results = $A(root.querySelectorAll(e)).map(Element.extend);
        root.id = oldId;

        return results;
      case 'xpath':
        return document._getElementsByXPath(this.xpath, root);
      default:
       return this.matcher(root);
    }
  },

  match: function(element) {
    this.tokens = [];

    var e = this.expression, ps = Selector.patterns, as = Selector.assertions;
    var le, p, m, len = ps.length, name;

    while (e && le !== e && (/\S/).test(e)) {
      le = e;
      for (var i = 0; i<len; i++) {
        p = ps[i].re;
        name = ps[i].name;
        if (m = e.match(p)) {
          if (as[name]) {
            this.tokens.push([name, Object.clone(m)]);
            e = e.replace(m[0], '');
          } else {
            return this.findElements(document).include(element);
          }
        }
      }
    }

    var match = true, name, matches;
    for (var i = 0, token; token = this.tokens[i]; i++) {
      name = token[0], matches = token[1];
      if (!Selector.assertions[name](element, matches)) {
        match = false; break;
      }
    }

    return match;
  },

  toString: function() {
    return this.expression;
  },

  inspect: function() {
    return "#<Selector:" + this.expression.inspect() + ">";
  }
});

if (Prototype.BrowserFeatures.SelectorsAPI &&
 document.compatMode === 'BackCompat') {
  Selector.CASE_INSENSITIVE_CLASS_NAMES = (function(){
    var div = document.createElement('div'),
     span = document.createElement('span');

    div.id = "prototype_test_id";
    span.className = 'Test';
    div.appendChild(span);
    var isIgnored = (div.querySelector('#prototype_test_id .test') !== null);
    div = span = null;
    return isIgnored;
  })();
}

Object.extend(Selector, {
  _cache: { },

  xpath: {
    descendant:   "//*",
    child:        "/*",
    adjacent:     "/following-sibling::*[1]",
    laterSibling: '/following-sibling::*',
    tagName:      function(m) {
      if (m[1] == '*') return '';
      return "[local-name()='" + m[1].toLowerCase() +
             "' or local-name()='" + m[1].toUpperCase() + "']";
    },
    className:    "[contains(concat(' ', @class, ' '), ' #{1} ')]",
    id:           "[@id='#{1}']",
    attrPresence: function(m) {
      m[1] = m[1].toLowerCase();
      return new Template("[@#{1}]").evaluate(m);
    },
    attr: function(m) {
      m[1] = m[1].toLowerCase();
      m[3] = m[5] || m[6];
      return new Template(Selector.xpath.operators[m[2]]).evaluate(m);
    },
    pseudo: function(m) {
      var h = Selector.xpath.pseudos[m[1]];
      if (!h) return '';
      if (Object.isFunction(h)) return h(m);
      return new Template(Selector.xpath.pseudos[m[1]]).evaluate(m);
    },
    operators: {
      '=':  "[@#{1}='#{3}']",
      '!=': "[@#{1}!='#{3}']",
      '^=': "[starts-with(@#{1}, '#{3}')]",
      '$=': "[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']",
      '*=': "[contains(@#{1}, '#{3}')]",
      '~=': "[contains(concat(' ', @#{1}, ' '), ' #{3} ')]",
      '|=': "[contains(concat('-', @#{1}, '-'), '-#{3}-')]"
    },
    pseudos: {
      'first-child': '[not(preceding-sibling::*)]',
      'last-child':  '[not(following-sibling::*)]',
      'only-child':  '[not(preceding-sibling::* or following-sibling::*)]',
      'empty':       "[count(*) = 0 and (count(text()) = 0)]",
      'checked':     "[@checked]",
      'disabled':    "[(@disabled) and (@type!='hidden')]",
      'enabled':     "[not(@disabled) and (@type!='hidden')]",
      'not': function(m) {
        var e = m[6], p = Selector.patterns,
            x = Selector.xpath, le, v, len = p.length, name;

        var exclusion = [];
        while (e && le != e && (/\S/).test(e)) {
          le = e;
          for (var i = 0; i<len; i++) {
            name = p[i].name
            if (m = e.match(p[i].re)) {
              v = Object.isFunction(x[name]) ? x[name](m) : new Template(x[name]).evaluate(m);
              exclusion.push("(" + v.substring(1, v.length - 1) + ")");
              e = e.replace(m[0], '');
              break;
            }
          }
        }
        return "[not(" + exclusion.join(" and ") + ")]";
      },
      'nth-child':      function(m) {
        return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ", m);
      },
      'nth-last-child': function(m) {
        return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ", m);
      },
      'nth-of-type':    function(m) {
        return Selector.xpath.pseudos.nth("position() ", m);
      },
      'nth-last-of-type': function(m) {
        return Selector.xpath.pseudos.nth("(last() + 1 - position()) ", m);
      },
      'first-of-type':  function(m) {
        m[6] = "1"; return Selector.xpath.pseudos['nth-of-type'](m);
      },
      'last-of-type':   function(m) {
        m[6] = "1"; return Selector.xpath.pseudos['nth-last-of-type'](m);
      },
      'only-of-type':   function(m) {
        var p = Selector.xpath.pseudos; return p['first-of-type'](m) + p['last-of-type'](m);
      },
      nth: function(fragment, m) {
        var mm, formula = m[6], predicate;
        if (formula == 'even') formula = '2n+0';
        if (formula == 'odd')  formula = '2n+1';
        if (mm = formula.match(/^(\d+)$/)) // digit only
          return '[' + fragment + "= " + mm[1] + ']';
        if (mm = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
          if (mm[1] == "-") mm[1] = -1;
          var a = mm[1] ? Number(mm[1]) : 1;
          var b = mm[2] ? Number(mm[2]) : 0;
          predicate = "[((#{fragment} - #{b}) mod #{a} = 0) and " +
          "((#{fragment} - #{b}) div #{a} >= 0)]";
          return new Template(predicate).evaluate({
            fragment: fragment, a: a, b: b });
        }
      }
    }
  },

  criteria: {
    tagName:      'n = h.tagName(n, r, "#{1}", c);      c = false;',
    className:    'n = h.className(n, r, "#{1}", c);    c = false;',
    id:           'n = h.id(n, r, "#{1}", c);           c = false;',
    attrPresence: 'n = h.attrPresence(n, r, "#{1}", c); c = false;',
    attr: function(m) {
      m[3] = (m[5] || m[6]);
      return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}", c); c = false;').evaluate(m);
    },
    pseudo: function(m) {
      if (m[6]) m[6] = m[6].replace(/"/g, '\\"');
      return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(m);
    },
    descendant:   'c = "descendant";',
    child:        'c = "child";',
    adjacent:     'c = "adjacent";',
    laterSibling: 'c = "laterSibling";'
  },

  patterns: [
    { name: 'laterSibling', re: /^\s*~\s*/ },
    { name: 'child',        re: /^\s*>\s*/ },
    { name: 'adjacent',     re: /^\s*\+\s*/ },
    { name: 'descendant',   re: /^\s/ },

    { name: 'tagName',      re: /^\s*(\*|[\w\-]+)(\b|$)?/ },
    { name: 'id',           re: /^#([\w\-\*]+)(\b|$)/ },
    { name: 'className',    re: /^\.([\w\-\*]+)(\b|$)/ },
    { name: 'pseudo',       re: /^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/ },
    { name: 'attrPresence', re: /^\[((?:[\w-]+:)?[\w-]+)\]/ },
    { name: 'attr',         re: /\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/ }
  ],

  assertions: {
    tagName: function(element, matches) {
      return matches[1].toUpperCase() == element.tagName.toUpperCase();
    },

    className: function(element, matches) {
      return Element.hasClassName(element, matches[1]);
    },

    id: function(element, matches) {
      return element.id === matches[1];
    },

    attrPresence: function(element, matches) {
      return Element.hasAttribute(element, matches[1]);
    },

    attr: function(element, matches) {
      var nodeValue = Element.readAttribute(element, matches[1]);
      return nodeValue && Selector.operators[matches[2]](nodeValue, matches[5] || matches[6]);
    }
  },

  handlers: {
    concat: function(a, b) {
      for (var i = 0, node; node = b[i]; i++)
        a.push(node);
      return a;
    },

    mark: function(nodes) {
      var _true = Prototype.emptyFunction;
      for (var i = 0, node; node = nodes[i]; i++)
        node._countedByPrototype = _true;
      return nodes;
    },

    unmark: (function(){

      var PROPERTIES_ATTRIBUTES_MAP = (function(){
        var el = document.createElement('div'),
            isBuggy = false,
            propName = '_countedByPrototype',
            value = 'x'
        el[propName] = value;
        isBuggy = (el.getAttribute(propName) === value);
        el = null;
        return isBuggy;
      })();

      return PROPERTIES_ATTRIBUTES_MAP ?
        function(nodes) {
          for (var i = 0, node; node = nodes[i]; i++)
            node.removeAttribute('_countedByPrototype');
          return nodes;
        } :
        function(nodes) {
          for (var i = 0, node; node = nodes[i]; i++)
            node._countedByPrototype = void 0;
          return nodes;
        }
    })(),

    index: function(parentNode, reverse, ofType) {
      parentNode._countedByPrototype = Prototype.emptyFunction;
      if (reverse) {
        for (var nodes = parentNode.childNodes, i = nodes.length - 1, j = 1; i >= 0; i--) {
          var node = nodes[i];
          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
        }
      } else {
        for (var i = 0, j = 1, nodes = parentNode.childNodes; node = nodes[i]; i++)
          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
      }
    },

    unique: function(nodes) {
      if (nodes.length == 0) return nodes;
      var results = [], n;
      for (var i = 0, l = nodes.length; i < l; i++)
        if (typeof (n = nodes[i])._countedByPrototype == 'undefined') {
          n._countedByPrototype = Prototype.emptyFunction;
          results.push(Element.extend(n));
        }
      return Selector.handlers.unmark(results);
    },

    descendant: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        h.concat(results, node.getElementsByTagName('*'));
      return results;
    },

    child: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        for (var j = 0, child; child = node.childNodes[j]; j++)
          if (child.nodeType == 1 && child.tagName != '!') results.push(child);
      }
      return results;
    },

    adjacent: function(nodes) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        var next = this.nextElementSibling(node);
        if (next) results.push(next);
      }
      return results;
    },

    laterSibling: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        h.concat(results, Element.nextSiblings(node));
      return results;
    },

    nextElementSibling: function(node) {
      while (node = node.nextSibling)
        if (node.nodeType == 1) return node;
      return null;
    },

    previousElementSibling: function(node) {
      while (node = node.previousSibling)
        if (node.nodeType == 1) return node;
      return null;
    },

    tagName: function(nodes, root, tagName, combinator) {
      var uTagName = tagName.toUpperCase();
      var results = [], h = Selector.handlers;
      if (nodes) {
        if (combinator) {
          if (combinator == "descendant") {
            for (var i = 0, node; node = nodes[i]; i++)
              h.concat(results, node.getElementsByTagName(tagName));
            return results;
          } else nodes = this[combinator](nodes);
          if (tagName == "*") return nodes;
        }
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.tagName.toUpperCase() === uTagName) results.push(node);
        return results;
      } else return root.getElementsByTagName(tagName);
    },

    id: function(nodes, root, id, combinator) {
      var targetNode = $(id), h = Selector.handlers;

      if (root == document) {
        if (!targetNode) return [];
        if (!nodes) return [targetNode];
      } else {
        if (!root.sourceIndex || root.sourceIndex < 1) {
          var nodes = root.getElementsByTagName('*');
          for (var j = 0, node; node = nodes[j]; j++) {
            if (node.id === id) return [node];
          }
        }
      }

      if (nodes) {
        if (combinator) {
          if (combinator == 'child') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (targetNode.parentNode == node) return [targetNode];
          } else if (combinator == 'descendant') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (Element.descendantOf(targetNode, node)) return [targetNode];
          } else if (combinator == 'adjacent') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (Selector.handlers.previousElementSibling(targetNode) == node)
                return [targetNode];
          } else nodes = h[combinator](nodes);
        }
        for (var i = 0, node; node = nodes[i]; i++)
          if (node == targetNode) return [targetNode];
        return [];
      }
      return (targetNode && Element.descendantOf(targetNode, root)) ? [targetNode] : [];
    },

    className: function(nodes, root, className, combinator) {
      if (nodes && combinator) nodes = this[combinator](nodes);
      return Selector.handlers.byClassName(nodes, root, className);
    },

    byClassName: function(nodes, root, className) {
      if (!nodes) nodes = Selector.handlers.descendant([root]);
      var needle = ' ' + className + ' ';
      for (var i = 0, results = [], node, nodeClassName; node = nodes[i]; i++) {
        nodeClassName = node.className;
        if (nodeClassName.length == 0) continue;
        if (nodeClassName == className || (' ' + nodeClassName + ' ').include(needle))
          results.push(node);
      }
      return results;
    },

    attrPresence: function(nodes, root, attr, combinator) {
      if (!nodes) nodes = root.getElementsByTagName("*");
      if (nodes && combinator) nodes = this[combinator](nodes);
      var results = [];
      for (var i = 0, node; node = nodes[i]; i++)
        if (Element.hasAttribute(node, attr)) results.push(node);
      return results;
    },

    attr: function(nodes, root, attr, value, operator, combinator) {
      if (!nodes) nodes = root.getElementsByTagName("*");
      if (nodes && combinator) nodes = this[combinator](nodes);
      var handler = Selector.operators[operator], results = [];
      for (var i = 0, node; node = nodes[i]; i++) {
        var nodeValue = Element.readAttribute(node, attr);
        if (nodeValue === null) continue;
        if (handler(nodeValue, value)) results.push(node);
      }
      return results;
    },

    pseudo: function(nodes, name, value, root, combinator) {
      if (nodes && combinator) nodes = this[combinator](nodes);
      if (!nodes) nodes = root.getElementsByTagName("*");
      return Selector.pseudos[name](nodes, value, root);
    }
  },

  pseudos: {
    'first-child': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (Selector.handlers.previousElementSibling(node)) continue;
          results.push(node);
      }
      return results;
    },
    'last-child': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (Selector.handlers.nextElementSibling(node)) continue;
          results.push(node);
      }
      return results;
    },
    'only-child': function(nodes, value, root) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!h.previousElementSibling(node) && !h.nextElementSibling(node))
          results.push(node);
      return results;
    },
    'nth-child':        function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root);
    },
    'nth-last-child':   function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, true);
    },
    'nth-of-type':      function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, false, true);
    },
    'nth-last-of-type': function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, true, true);
    },
    'first-of-type':    function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, "1", root, false, true);
    },
    'last-of-type':     function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, "1", root, true, true);
    },
    'only-of-type':     function(nodes, formula, root) {
      var p = Selector.pseudos;
      return p['last-of-type'](p['first-of-type'](nodes, formula, root), formula, root);
    },

    getIndices: function(a, b, total) {
      if (a == 0) return b > 0 ? [b] : [];
      return $R(1, total).inject([], function(memo, i) {
        if (0 == (i - b) % a && (i - b) / a >= 0) memo.push(i);
        return memo;
      });
    },

    nth: function(nodes, formula, root, reverse, ofType) {
      if (nodes.length == 0) return [];
      if (formula == 'even') formula = '2n+0';
      if (formula == 'odd')  formula = '2n+1';
      var h = Selector.handlers, results = [], indexed = [], m;
      h.mark(nodes);
      for (var i = 0, node; node = nodes[i]; i++) {
        if (!node.parentNode._countedByPrototype) {
          h.index(node.parentNode, reverse, ofType);
          indexed.push(node.parentNode);
        }
      }
      if (formula.match(/^\d+$/)) { // just a number
        formula = Number(formula);
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.nodeIndex == formula) results.push(node);
      } else if (m = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
        if (m[1] == "-") m[1] = -1;
        var a = m[1] ? Number(m[1]) : 1;
        var b = m[2] ? Number(m[2]) : 0;
        var indices = Selector.pseudos.getIndices(a, b, nodes.length);
        for (var i = 0, node, l = indices.length; node = nodes[i]; i++) {
          for (var j = 0; j < l; j++)
            if (node.nodeIndex == indices[j]) results.push(node);
        }
      }
      h.unmark(nodes);
      h.unmark(indexed);
      return results;
    },

    'empty': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (node.tagName == '!' || node.firstChild) continue;
        results.push(node);
      }
      return results;
    },

    'not': function(nodes, selector, root) {
      var h = Selector.handlers, selectorType, m;
      var exclusions = new Selector(selector).findElements(root);
      h.mark(exclusions);
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!node._countedByPrototype) results.push(node);
      h.unmark(exclusions);
      return results;
    },

    'enabled': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!node.disabled && (!node.type || node.type !== 'hidden'))
          results.push(node);
      return results;
    },

    'disabled': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (node.disabled) results.push(node);
      return results;
    },

    'checked': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (node.checked) results.push(node);
      return results;
    }
  },

  operators: {
    '=':  function(nv, v) { return nv == v; },
    '!=': function(nv, v) { return nv != v; },
    '^=': function(nv, v) { return nv == v || nv && nv.startsWith(v); },
    '$=': function(nv, v) { return nv == v || nv && nv.endsWith(v); },
    '*=': function(nv, v) { return nv == v || nv && nv.include(v); },
    '~=': function(nv, v) { return (' ' + nv + ' ').include(' ' + v + ' '); },
    '|=': function(nv, v) { return ('-' + (nv || "").toUpperCase() +
     '-').include('-' + (v || "").toUpperCase() + '-'); }
  },

  split: function(expression) {
    var expressions = [];
    expression.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/, function(m) {
      expressions.push(m[1].strip());
    });
    return expressions;
  },

  matchElements: function(elements, expression) {
    var matches = $$(expression), h = Selector.handlers;
    h.mark(matches);
    for (var i = 0, results = [], element; element = elements[i]; i++)
      if (element._countedByPrototype) results.push(element);
    h.unmark(matches);
    return results;
  },

  findElement: function(elements, expression, index) {
    if (Object.isNumber(expression)) {
      index = expression; expression = false;
    }
    return Selector.matchElements(elements, expression || '*')[index || 0];
  },

  findChildElements: function(element, expressions) {
    expressions = Selector.split(expressions.join(','));
    var results = [], h = Selector.handlers;
    for (var i = 0, l = expressions.length, selector; i < l; i++) {
      selector = new Selector(expressions[i].strip());
      h.concat(results, selector.findElements(element));
    }
    return (l > 1) ? h.unique(results) : results;
  }
});

if (Prototype.Browser.IE) {
  Object.extend(Selector.handlers, {
    concat: function(a, b) {
      for (var i = 0, node; node = b[i]; i++)
        if (node.tagName !== "!") a.push(node);
      return a;
    }
  });
}

function $$() {
  return Selector.findChildElements(document, $A(arguments));
}

var Form = {
  reset: function(form) {
    form = $(form);
    form.reset();
    return form;
  },

  serializeElements: function(elements, options) {
    if (typeof options != 'object') options = { hash: !!options };
    else if (Object.isUndefined(options.hash)) options.hash = true;
    var key, value, submitted = false, submit = options.submit;

    var data = elements.inject({ }, function(result, element) {
      if (!element.disabled && element.name) {
        key = element.name; value = $(element).getValue();
        if (value != null && element.type != 'file' && (element.type != 'submit' || (!submitted &&
            submit !== false && (!submit || key == submit) && (submitted = true)))) {
          if (key in result) {
            if (!Object.isArray(result[key])) result[key] = [result[key]];
            result[key].push(value);
          }
          else result[key] = value;
        }
      }
      return result;
    });

    return options.hash ? data : Object.toQueryString(data);
  }
};

Form.Methods = {
  serialize: function(form, options) {
    return Form.serializeElements(Form.getElements(form), options);
  },

  getElements: function(form) {
    var elements = $(form).getElementsByTagName('*'),
        element,
        arr = [ ],
        serializers = Form.Element.Serializers;
    for (var i = 0; element = elements[i]; i++) {
      arr.push(element);
    }
    return arr.inject([], function(elements, child) {
      if (serializers[child.tagName.toLowerCase()])
        elements.push(Element.extend(child));
      return elements;
    })
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('disable');
    return form;
  },

  enable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('enable');
    return form;
  },

  findFirstElement: function(form) {
    var elements = $(form).getElements().findAll(function(element) {
      return 'hidden' != element.type && !element.disabled;
    });
    var firstByIndex = elements.findAll(function(element) {
      return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
    }).sortBy(function(element) { return element.tabIndex }).first();

    return firstByIndex ? firstByIndex : elements.find(function(element) {
      return /^(?:input|select|textarea)$/i.test(element.tagName);
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    form.findFirstElement().activate();
    return form;
  },

  request: function(form, options) {
    form = $(form), options = Object.clone(options || { });

    var params = options.parameters, action = form.readAttribute('action') || '';
    if (action.blank()) action = window.location.href;
    options.parameters = form.serialize(true);

    if (params) {
      if (Object.isString(params)) params = params.toQueryParams();
      Object.extend(options.parameters, params);
    }

    if (form.hasAttribute('method') && !options.method)
      options.method = form.method;

    return new Ajax.Request(action, options);
  }
};

/*--------------------------------------------------------------------------*/


Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
};

Form.Element.Methods = {

  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = { };
        pair[element.name] = value;
        return Object.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  setValue: function(element, value) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    Form.Element.Serializers[method](element, value);
    return element;
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    try {
      element.focus();
      if (element.select && (element.tagName.toLowerCase() != 'input' ||
          !(/^(?:button|reset|submit)$/i.test(element.type))))
        element.select();
    } catch (e) { }
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.disabled = false;
    return element;
  }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;

var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = {
  input: function(element, value) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element, value);
      default:
        return Form.Element.Serializers.textarea(element, value);
    }
  },

  inputSelector: function(element, value) {
    if (Object.isUndefined(value)) return element.checked ? element.value : null;
    else element.checked = !!value;
  },

  textarea: function(element, value) {
    if (Object.isUndefined(value)) return element.value;
    else element.value = value;
  },

  select: function(element, value) {
    if (Object.isUndefined(value))
      return this[element.type == 'select-one' ?
        'selectOne' : 'selectMany'](element);
    else {
      var opt, currentValue, single = !Object.isArray(value);
      for (var i = 0, length = element.length; i < length; i++) {
        opt = element.options[i];
        currentValue = this.optionValue(opt);
        if (single) {
          if (currentValue == value) {
            opt.selected = true;
            return;
          }
        }
        else opt.selected = value.include(currentValue);
      }
    }
  },

  selectOne: function(element) {
    var index = element.selectedIndex;
    return index >= 0 ? this.optionValue(element.options[index]) : null;
  },

  selectMany: function(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(this.optionValue(opt));
    }
    return values;
  },

  optionValue: function(opt) {
    return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;
  }
};

/*--------------------------------------------------------------------------*/


Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function($super, element, frequency, callback) {
    $super(callback, frequency);
    this.element   = $(element);
    this.lastValue = this.getValue();
  },

  execute: function() {
    var value = this.getValue();
    if (Object.isString(this.lastValue) && Object.isString(value) ?
        this.lastValue != value : String(this.lastValue) != String(value)) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback, this);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
(function() {

  var Event = {
    KEY_BACKSPACE: 8,
    KEY_TAB:       9,
    KEY_RETURN:   13,
    KEY_ESC:      27,
    KEY_LEFT:     37,
    KEY_UP:       38,
    KEY_RIGHT:    39,
    KEY_DOWN:     40,
    KEY_DELETE:   46,
    KEY_HOME:     36,
    KEY_END:      35,
    KEY_PAGEUP:   33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT:   45,

    cache: {}
  };

  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
    && 'onmouseleave' in docEl;

  var _isButton;
  if (Prototype.Browser.IE) {
    var buttonMap = { 0: 1, 1: 4, 2: 2 };
    _isButton = function(event, code) {
      return event.button === buttonMap[code];
    };
  } else if (Prototype.Browser.WebKit) {
    _isButton = function(event, code) {
      switch (code) {
        case 0: return event.which == 1 && !event.metaKey;
        case 1: return event.which == 1 && event.metaKey;
        default: return false;
      }
    };
  } else {
    _isButton = function(event, code) {
      return event.which ? (event.which === code + 1) : (event.button === code);
    };
  }

  function isLeftClick(event)   { return _isButton(event, 0) }

  function isMiddleClick(event) { return _isButton(event, 1) }

  function isRightClick(event)  { return _isButton(event, 2) }

  function element(event) {
    event = Event.extend(event);

    var node = event.target, type = event.type,
     currentTarget = event.currentTarget;

    if (currentTarget && currentTarget.tagName) {
      if (type === 'load' || type === 'error' ||
        (type === 'click' && currentTarget.tagName.toLowerCase() === 'input'
          && currentTarget.type === 'radio'))
            node = currentTarget;
    }

    if (node.nodeType == Node.TEXT_NODE)
      node = node.parentNode;

    return Element.extend(node);
  }

  function findElement(event, expression) {
    var element = Event.element(event);
    if (!expression) return element;
    var elements = [element].concat(element.ancestors());
    return Selector.findElement(elements, expression, 0);
  }

  function pointer(event) {
    return { x: pointerX(event), y: pointerY(event) };
  }

  function pointerX(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollLeft: 0 };

    return event.pageX || (event.clientX +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));
  }

  function pointerY(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollTop: 0 };

    return  event.pageY || (event.clientY +
       (docElement.scrollTop || body.scrollTop) -
       (docElement.clientTop || 0));
  }


  function stop(event) {
    Event.extend(event);
    event.preventDefault();
    event.stopPropagation();

    event.stopped = true;
  }

  Event.Methods = {
    isLeftClick: isLeftClick,
    isMiddleClick: isMiddleClick,
    isRightClick: isRightClick,

    element: element,
    findElement: findElement,

    pointer: pointer,
    pointerX: pointerX,
    pointerY: pointerY,

    stop: stop
  };


  var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
    m[name] = Event.Methods[name].methodize();
    return m;
  });

  if (Prototype.Browser.IE) {
    function _relatedTarget(event) {
      var element;
      switch (event.type) {
        case 'mouseover': element = event.fromElement; break;
        case 'mouseout':  element = event.toElement;   break;
        default: return null;
      }
      return Element.extend(element);
    }

    Object.extend(methods, {
      stopPropagation: function() { this.cancelBubble = true },
      preventDefault:  function() { this.returnValue = false },
      inspect: function() { return '[object Event]' }
    });

    Event.extend = function(event, element) {
      if (!event) return false;
      if (event._extendedByPrototype) return event;

      event._extendedByPrototype = Prototype.emptyFunction;
      var pointer = Event.pointer(event);

      Object.extend(event, {
        target: event.srcElement || element,
        relatedTarget: _relatedTarget(event),
        pageX:  pointer.x,
        pageY:  pointer.y
      });

      return Object.extend(event, methods);
    };
  } else {
    Event.prototype = window.Event.prototype || document.createEvent('HTMLEvents').__proto__;
    Object.extend(Event.prototype, methods);
    Event.extend = Prototype.K;
  }

  function _createResponder(element, eventName, handler) {
    var registry = Element.retrieve(element, 'prototype_event_registry');

    if (Object.isUndefined(registry)) {
      CACHE.push(element);
      registry = Element.retrieve(element, 'prototype_event_registry', $H());
    }

    var respondersForEvent = registry.get(eventName);
    if (Object.isUndefined(respondersForEvent)) {
      respondersForEvent = [];
      registry.set(eventName, respondersForEvent);
    }

    if (respondersForEvent.pluck('handler').include(handler)) return false;

    var responder;
    if (eventName.include(":")) {
      responder = function(event) {
        if (Object.isUndefined(event.eventName))
          return false;

        if (event.eventName !== eventName)
          return false;

        Event.extend(event, element);
        handler.call(element, event);
      };
    } else {
      if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
       (eventName === "mouseenter" || eventName === "mouseleave")) {
        if (eventName === "mouseenter" || eventName === "mouseleave") {
          responder = function(event) {
            Event.extend(event, element);

            var parent = event.relatedTarget;
            while (parent && parent !== element) {
              try { parent = parent.parentNode; }
              catch(e) { parent = element; }
            }

            if (parent === element) return;

            handler.call(element, event);
          };
        }
      } else {
        responder = function(event) {
          Event.extend(event, element);
          handler.call(element, event);
        };
      }
    }

    responder.handler = handler;
    respondersForEvent.push(responder);
    return responder;
  }

  function _destroyCache() {
    for (var i = 0, length = CACHE.length; i < length; i++) {
      Event.stopObserving(CACHE[i]);
      CACHE[i] = null;
    }
  }

  var CACHE = [];

  if (Prototype.Browser.IE)
    window.attachEvent('onunload', _destroyCache);

  if (Prototype.Browser.WebKit)
    window.addEventListener('unload', Prototype.emptyFunction, false);


  var _getDOMEventName = Prototype.K;

  if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED) {
    _getDOMEventName = function(eventName) {
      var translations = { mouseenter: "mouseover", mouseleave: "mouseout" };
      return eventName in translations ? translations[eventName] : eventName;
    };
  }

  function observe(element, eventName, handler) {
    element = $(element);

    var responder = _createResponder(element, eventName, handler);

    if (!responder) return element;

    if (eventName.include(':')) {
      if (element.addEventListener)
        element.addEventListener("dataavailable", responder, false);
      else {
        element.attachEvent("ondataavailable", responder);
        element.attachEvent("onfilterchange", responder);
      }
    } else {
      var actualEventName = _getDOMEventName(eventName);

      if (element.addEventListener)
        element.addEventListener(actualEventName, responder, false);
      else
        element.attachEvent("on" + actualEventName, responder);
    }

    return element;
  }

  function stopObserving(element, eventName, handler) {
    element = $(element);

    var registry = Element.retrieve(element, 'prototype_event_registry');

    if (Object.isUndefined(registry)) return element;

    if (eventName && !handler) {
      var responders = registry.get(eventName);

      if (Object.isUndefined(responders)) return element;

      responders.each( function(r) {
        Element.stopObserving(element, eventName, r.handler);
      });
      return element;
    } else if (!eventName) {
      registry.each( function(pair) {
        var eventName = pair.key, responders = pair.value;

        responders.each( function(r) {
          Element.stopObserving(element, eventName, r.handler);
        });
      });
      return element;
    }

    var responders = registry.get(eventName);

    if (!responders) return;

    var responder = responders.find( function(r) { return r.handler === handler; });
    if (!responder) return element;

    var actualEventName = _getDOMEventName(eventName);

    if (eventName.include(':')) {
      if (element.removeEventListener)
        element.removeEventListener("dataavailable", responder, false);
      else {
        element.detachEvent("ondataavailable", responder);
        element.detachEvent("onfilterchange",  responder);
      }
    } else {
      if (element.removeEventListener)
        element.removeEventListener(actualEventName, responder, false);
      else
        element.detachEvent('on' + actualEventName, responder);
    }

    registry.set(eventName, responders.without(responder));

    return element;
  }

  function fire(element, eventName, memo, bubble) {
    element = $(element);

    if (Object.isUndefined(bubble))
      bubble = true;

    if (element == document && document.createEvent && !element.dispatchEvent)
      element = document.documentElement;

    var event;
    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent('dataavailable', true, true);
    } else {
      event = document.createEventObject();
      event.eventType = bubble ? 'ondataavailable' : 'onfilterchange';
    }

    event.eventName = eventName;
    event.memo = memo || { };

    if (document.createEvent)
      element.dispatchEvent(event);
    else
      element.fireEvent(event.eventType, event);

    return Event.extend(event);
  }


  Object.extend(Event, Event.Methods);

  Object.extend(Event, {
    fire:          fire,
    observe:       observe,
    stopObserving: stopObserving
  });

  Element.addMethods({
    fire:          fire,

    observe:       observe,

    stopObserving: stopObserving
  });

  Object.extend(document, {
    fire:          fire.methodize(),

    observe:       observe.methodize(),

    stopObserving: stopObserving.methodize(),

    loaded:        false
  });

  if (window.Event) Object.extend(window.Event, Event);
  else window.Event = Event;
})();

(function() {
  /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */

  var timer;

  function fireContentLoadedEvent() {
    if (document.loaded) return;
    if (timer) window.clearTimeout(timer);
    document.loaded = true;
    document.fire('dom:loaded');
  }

  function checkReadyState() {
    if (document.readyState === 'complete') {
      document.stopObserving('readystatechange', checkReadyState);
      fireContentLoadedEvent();
    }
  }

  function pollDoScroll() {
    try { document.documentElement.doScroll('left'); }
    catch(e) {
      timer = pollDoScroll.defer();
      return;
    }
    fireContentLoadedEvent();
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
  } else {
    document.observe('readystatechange', checkReadyState);
    if (window == top)
      timer = pollDoScroll.defer();
  }

  Event.observe(window, 'load', fireContentLoadedEvent);
})();

Element.addMethods();

/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.Methods.childOf = Element.Methods.descendantOf;

var Insertion = {
  Before: function(element, content) {
    return Element.insert(element, {before:content});
  },

  Top: function(element, content) {
    return Element.insert(element, {top:content});
  },

  Bottom: function(element, content) {
    return Element.insert(element, {bottom:content});
  },

  After: function(element, content) {
    return Element.insert(element, {after:content});
  }
};

var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

var Position = {
  includeScrollOffsets: false,

  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = Element.cumulativeScrollOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },


  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutize: function(element) {
    Position.prepare();
    return Element.absolutize(element);
  },

  relativize: function(element) {
    Position.prepare();
    return Element.relativize(element);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  page: Element.Methods.viewportOffset,

  clone: function(source, target, options) {
    options = options || { };
    return Element.clonePosition(target, source, options);
  }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
  function iter(name) {
    return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
  }

  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
  function(element, className) {
    className = className.toString().strip();
    var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
    return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
  } : function(element, className) {
    className = className.toString().strip();
    var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
    if (!classNames && !className) return elements;

    var nodes = $(element).getElementsByTagName('*');
    className = ' ' + className + ' ';

    for (var i = 0, child, cn; child = nodes[i]; i++) {
      if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
          (classNames && classNames.all(function(name) {
            return !name.toString().blank() && cn.include(' ' + name + ' ');
          }))))
        elements.push(Element.extend(child));
    }
    return elements;
  };

  return function(className, parentElement) {
    return $(parentElement || document.body).getElementsByClassName(className);
  };
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/

Because it's your web | Donate

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
