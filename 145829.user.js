// ==UserScript==
// @name           RE-KOC Toy
// @version        1.2.1d
// @namespace      Fixinto
// @description    Alliance report scanner - Kingdom of Camelot - All Lang
// @homepage       http://userscripts.org/scripts/show/139757


// @include        *kingdomsofcamelot.com/*main_src.php*
// @include        *kingdomsofcamelot.com/*fbLoginButton.php*
// @include        *kingdomsofcamelot.com/*standAlone.php*
// @include        *kingdomsofcamelot.com/*platforms/kabam*
// @include        *kingdomsofcamelot.com/*acceptToken_src.php*
// @include        *kingdomsofcamelot.com/*helpFriend_src.php*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *facebook.com/connect/uiserver.php*
// @include        *facebook.com/*/serverfbml*
// @include        *facebook.com/dialog/feed*
// @include        *facebook.com/dialog/stream.publish*
// @include        *facebook.com/dialog/apprequests*
// @include        *kabam.com/*

// ==/UserScript==


var Version = '1.2.1d';
var Versiondate = '09.15.2012'; 
var Scriptname = 'KoC Alliance Report Scanner - Gengar';
var ScriptTabName = "'+ getMyAlliance()[1] +'";
var AllianzName = 'Kingdom of Camelot';
var ScriptLink = 'http://userscripts.org/scripts/show/145829';

// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var ENABLE_TEST_TAB = false;
var ENABLE_ATTACK_TAB = true;
var ENABLE_GM_AJAX_TRACE = false;
// end test switches

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

var Options = {
  pdxRemaining : true,
  pdxWinIsOpen  : false,
  pdxWinDrag    : true,
  pdxWinPos     : {},
  pdxTrackOpen  : true,
  pdxhideOnGoto   : true,
  widescreen   : false,
  alertConfigPDX  : {
  towermsg:'!!! HELP !!!',
  aChat:true,
  scouting:true,
  wilds:true,
  minTroops:1,
  spamLimit:10,
  embassy:true,
  mytroops:true,
  food:true,
  defense:true,
  defend:true,
  hq:0,
  sendasWhisper:false,
  sendtoAlly:false  },
};

var Cities = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var currentName = 'Settings';
var CPopUpTopClass = 'pdxPopTop';
var mainPop;
var KOCversion = null;
var pdxStartupTimer = null;

function pdxStartup (){
  clearTimeout (pdxStartupTimer);
  
  if (unsafeWindow.pcLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
     pdxStartupTimer = setTimeout (pdxStartup, 1000);
    return;
  }
  unsafeWindow.pcLoaded = Version;
  
  readOptions();
  Seed = unsafeWindow.seed;
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    table.pdxTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    table.pdxTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.pdxTabBR tr td {border:none; background:none;}\
    table.pdxTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.pdxTabPad tr td.pdxEntry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .pdxStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .pcStatLight {color:#ddd}\
    .pdxEntry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    a.ptButton20 {color:#ffff80}\
    table.pdxMainTab {empty-cells:show; margin-top:5px }\
    table.pdxMainTab tr td a {color:inherit }\
    table.pdxMainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.pdxMainTab tr td.spacer {padding: 0px 4px;}\
    table.pdxMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed;}\
    table.pdxMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#141516; color:white; border-color:black;}\
    tr.pdxPopTop td { background-color:#600000; border:none; height: 21px;  padding:0px; }\
    tr.pcretry_pdxPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px;}\
    .CPopup  {border:3px ridge #666}\
    div.indent25 {padding-left:25px}';
    
 // logit ("* "+Scriptname +" v"+ Version +" modified by Gengar! Enjoy!");
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.pdxWinPos==null || Options.pdxWinPos.x==null|| Options.pdxWinPos.x=='' || isNaN(Options.pdxWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pdxWinPos.x = c.x+4;
    Options.pdxWinPos.y = c.y+c.height;
    saveOptions ();
  }
  mainPop = new CPopup ('pc', Options.pdxWinPos.x, Options.pdxWinPos.y, 750,600, Options.pdxWinDrag,
      function (){
        tabManager.hideTab();
        Options.pdxWinIsOpen=false;
        saveOptions()
      });
  mainPop.autoHeight (true);  

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  tabManager.init (mainPop.getMainDiv());
 // actionLog (""+Scriptname +" v"+ Version +" by Gengar loaded!");
  
 
  if (Options.pdxWinIsOpen && Options.pdxTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  TowerAlerts.init();
  TowerAlerts.setPostToChatOptions(Options.alertConfigPDX);
  AddMainTabLink(''+ getMyAlliance()[1] + '', eventHideShow, mouseMainTab);
}

/************************ Tower Alerts ************************/
var TowerAlerts = {
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  towerMarches : {},    // track all marches that have been posted to alliance chat
  defMode : {},  
  
  init : function (){
    var t = TowerAlerts;
    var s = GM_getValue ('towerMarches_'+GetServerId());
    if (s != null)
      t.towerMarches = JSON2.parse (s);

    t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
    unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;
  },
  
  postToChatOptions : {aChat:false},
  secondTimer : null,

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
  

  postToChat: function(m, force){
    var t = TowerAlerts;
    //var postOptions = Options.alertConfigPDX;
    var postOptions = t.postToChatOptions;
   var troopsnames = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
    var tot = [];

    for (i = 0; i < 13; i++)
      tot[i] = 0;

    if (DEBUG_TRACE) {
      logit("checkTower(): ATTENTION auf " + unixTime() + ": \n" + inspect(m, 8, 1));
    }  
    if (m.marchType == null) {// bogus march (returning scouts)
      if (DEBUG_TRACE) {
      logit("checkTower(): m.marchType == null");
      }  
      return;
    }  

    if (ENABLE_TEST_TAB)
      Tabs.Test.addDiv("Incoming!<BR><PRE style='margin:0px;'>" + inspect(m, 8, 1) + '</pre>');
      
    if (m.marchType == 3) {
      if (!postOptions.scouting && !force)
        return;
      atkType = 'SCOUT';
      if (DEBUG_TRACE) {
      logit("checkTower(): scout");
      }  
    }
    else {
      if (m.marchType == 4) {
        atkType = 'ATTACK';
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
      target = 'City ' + city.name + ' (' + city.x + ',' + city.y+') ';
    else {
      if (!postOptions.wilds && !force)
        return;
      target = 'Wild ';
      atkType = 'WILDATTACK';
      for (k in Seed.wilderness['city' + m.toCityId]) {
        if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
          target += '(' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord+') ';
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
        who = 'Unbekannt';
      }
    }
    
    if (m.fromXCoord)
      who += ' bei ' + m.fromXCoord + ',' + m.fromYCoord;
      
    var diplomacy = getDiplomacy(allianceId);

    
    var arrivingDatetime = new Date();
    arrivingDatetime.setTime(m.arrivalTime * 1000);
    
    if (DEBUG_TRACE) {
      logit("checkTower(): Before Messagecreate");
    }
        
    /** ** message ** */
    var msg = '';
    var subject = '';

        for (var c=0; c<Cities.numCities; c++) {
            if (Options.alertConfigPDX.hq==c)
                aCity = Cities.cities[c].name + ' ('+Cities.cities[c].x + ','+ Cities.cities[c].y+')';
        }

    if (!force) {
      if (atkType == 'SCOUT'){
            // boldtext SPÄH ALARM
        msg = '-= SPÄH ALARM =- ';
﻿      msg += Options.alertConfigPDX.towermsg;
        }
      if (atkType == 'ATTACK'){
            // boldtext ACHTUNG ATTACK
        msg = '-= ACHTUNG ATTACK =- ';
﻿  ﻿  msg += Options.alertConfigPDX.towermsg;
        }
        // ON WILD ATTACKS ... dont work :/ it show undefined
      if (atkType == 'WILDATTACK'){
        // boldtext WILD ATTACK
        msg = '-= WILD ATTACK =- ';
﻿  ﻿  msg += Options.alertConfigPDX.towermsg;
        }
    }
    msg += ' = MY HQ: ' + aCity + ' = ';
          // boldtext TRAGET
    msg += 'TRAGET: ' + target + ' = ';
          // boldtext Attacker
    msg += 'ATTACKER: ' + who + ' (' + addCommas(attackermight) + ', ' + diplomacy + ') ';
    
    msg +=' incomming ';
    var totTroops = 0;
    for (k in m.unts) {
      var uid = parseInt(k.substr(1));
      msg += m.unts[k] + ' ' + unsafeWindow.unitcost['unt' + uid][0] + ', ';
      totTroops += m.unts[k];
    }
    
    if ((totTroops < postOptions.minTroops) && !force)
      return;
    
    msg = msg.slice(0, -2);
    // boldtext  ' + unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) + ') '
    msg += ' (arriving in ' + unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) + ') ' ;
    
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
        // boldtext Botschaft
        msg += ' = My embassy ' + availSlots + ' from ' + emb.maxLevel + ' Slots are available! ';
        

        
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
                  if (Options.pdxRemaining)
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
            // boldtext  BOTSCHAFT
            msg += ' = REINFORCEMENT ';
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
                msg += '[Slot' + slot + ': ' + player + knight + ' mit ';
                for (i = 1; i < 13; i++) {
                  num = enc[dest][p][j][i];
                  if (num > 0)
                    msg += '' + addCommas(num) + ' ' + troopsnames[i - 1] + ', ';
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
      logit("checkTower(): Mesage Part2:"+msg);
    }
    var msgpart2 = msg;
    msg ='';
    
    /** ** My Troops ** */
    if (postOptions.mytroops) {
    // boldtext  DEF TRUPPEN
    msg += ' -= DEF TROOPS =- ';
    cityID = 'city' + m.toCityId;
      if (atkType == 'SCOUT') {
        num = parseInt(Seed.units[cityID]['unt' + 3]);
        tot[2] += num;
        msg += '' + addCommas(num) + ' ' + troopsnames[2] + ', ';
        msg += '  ';
      }
      else {
        for (r = 1; r < 13; r++) {
          num = parseInt(Seed.units[cityID]['unt' + r]);
          tot[r] += num;
          if (num > 0)
            msg += '' + addCommas(num) + ' ' + troopsnames[r - 1] + ', ';
        }
        msg += ' ';
      }
    }
    if (DEBUG_TRACE) {
      logit("checkTower(): Mesage Part3:"+msg);
    }
    var msgpart3 = msg;
    msg ='';  
    /** ** My Troops:End ** */
    
    /** ** Total Troops ** */
    if (embassyOccupied) {
      msg += ' TOTAL ';
      for (r = 1; r < 13; r++) {
        num = parseInt(tot[r]);
        if (num > 0)
          msg += '' + addCommas(num) + ' ' + troopsnames[r - 1] + ', ';
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
        
            msg += ' = got ';
            msg += ' '+addCommas(food)+ ' food, left '+timeLeftShort+' - usage: ' +addCommas(foodIncome)+' ! ';
        }
    var msgpart5 =msg;
    if (DEBUG_TRACE) {
      logit("checkTower(): Mesage Part5:"+msg);
    }
    msg ='';
    // My Defense
    if (Options.alertConfigPDX.defense) {
      // boldtext MAUERDEF
      msg += ' -= MAUERDEF =- ';
      var fortifications = [];
      var fortificationsVal = [];
      
      fortifications['53'] = 'Crossbow';
            fortifications['55'] = 'Trebuchet';
            fortifications['60'] = 'Trap';
            fortifications['61'] = 'Caltrop';
            fortifications['62'] = 'Spiked Barrier';
            
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
        if (atkType == 'SCOUT')
            msg = msgpart1 + msgpart2 + msgpart3;
﻿  ﻿  ﻿  else if (atkType == 'WILDATTACK')
﻿  ﻿  ﻿   msg = msgpart2 + msgpart3 + msgpart4 + msgpart5 + msgpart6 + msgpart7 + msgpart8;
        else    
             msg =  msgpart1 +msgpart2 + msgpart3 + msgpart4 + msgpart5 + msgpart6 + msgpart7 + msgpart8;
        var defMode =  Seed.citystats['city' + m.toCityId].gate;
        if (defMode == 0 && Options.alertConfigPDX.defend==true)
        {
            msg+= ' = My troops are HIDING!';
        }
        if (defMode == 1 && Options.alertConfigPDX.defend==true)
        {
            msg+= ' = My troops are DEFENDING!';
        }
    if (DEBUG_TRACE) {
      logit("checkTower(): full Mesage:"+msg);
    }
    
    if (ENABLE_TEST_TAB)
      Tabs.Test.addDiv(msg);
      
    if (postOptions.sendasWhisper) {
      if (DEBUG_TRACE) {
      logit("checkTower(): postOptions.sendasWhisper:"+"/" + Seed.player.name + ' ' + msg);
      }
      sendChat("/" + Seed.player.name + ' ' + msg); // Whisper to myself
    }
    
    if (postOptions.sendtoAlly) {
      sendChat("/a " + msg); // Alliance chat
    }
    
  }, // postToChat
} //TowerAlerts





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
    var m = '<TABLE cellspacing=0 class=pdxMainTab><TR>';
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id=pctc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    m += '<TD class=spacer width=90% align=right></td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.currentTab == null)
        t.currentTab = t.tabList[k];
      document.getElementById('pctc'+ k).addEventListener('click', this.e_clickedTab, false);
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
    
    t.setTabStyle (document.getElementById ('pctc'+ t.currentTab.name), true);
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
      t.setTabStyle (document.getElementById ('pctc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pctc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
    }
    newTab.obj.show();
  },
}


function onUnload (){
  Options.pdxWinPos = mainPop.getLocation();
  saveOptions();
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
    Options.pdxWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.pdxWinIsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.pdxWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.pdxWinIsOpen = true;
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
function dialogRetryAEPDX (errMsg, seconds, onRetry, onCancel){
  seconds = parseInt(seconds);
  var pop = new CPopup ('pcretry', 0, 0, 400,200, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>KoC Alliance - Extras</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>got a problem!</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Auto Refresh in <SPAN id=paretrySeconds></b></span> Seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="Cancel Retry" \>';
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


function MyAjaxRequest (url, o, noRetryX){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
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
    var rslt = eval("(" + msg.responseText + ")");
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
    if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetryAEPDX (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
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
  return 'Neutral';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
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
      t.popDebug.getMainDiv().innerHTML = '<DIV><INPUT type=submit id=padbsuball value=ALL> &nbsp; <INPUT type=submit id=padbsubnone value=NONE> &nbsp; \
        <INPUT type=submit id=padbdefaults value=DEFAULTS> &nbsp; <INPUT type=submit id=padbsubdo value=SHOW></div>\
        <DIV id=padbpoplist style="height:100%;  overflow-y:auto"></div>';
      var div = document.getElementById('padbpoplist');
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
      document.getElementById('padbsuball').addEventListener('click', clickedAll, false);
      document.getElementById('padbsubnone').addEventListener('click', clickedNone, false);
      document.getElementById('padbdefaults').addEventListener('click', clickedDefaults, false);
      document.getElementById('padbsubdo').addEventListener('click', clickedShow, false);
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
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      gmTabs.style.background='none';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
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

/*
unsafeWindow.pcGotoMap = function (x, y){
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
*/
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
  var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+GetServerId();
  var t = '<FORM target="_top" action="'+ goto +'" method=get><INPUT id=xxButReload type=submit value=RELOAD></form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
  return;
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



/********************************* REPORT Tab *************************************/

Tabs.Berichte = {
  tabOrder : 15,
  tabLabel : 'Reports',
  cont:null,
  state : null,

  init : function (div){
    var t = Tabs.Berichte;
    t.cont=div;

    t.getAllianceReports();

    t.cont.innerHTML = '\
 <DIV class=ptstat>ATTACKS ON THE ALLIANCE</div><DIV class=pdxEntry style="height:50px"><table width="100%"><tr>\
   <td colspan="4" class=xtab><SPAN class=boldRed><u>ATTENTION</u></span>: ONLY click one time on <b>search</b> otherwise it will search <u>more</u> than one time!</td>\
   </tr><tr><td width="97" class=xtab>Page:</td>\
    <td width="16" class=xtab><span id=idSpanNumPages>1</span></td>\
          <td width="225" class=xtab><select name="idHudSelect" id="idHudSelect">\
            <option value=3> -- select -- </option>\
            <option value=1> 1 </option>\
            <option value=3> 3 </option>\
			<option value=5> 5 </option>\
			<option value=10> 10 </option>\
			<option value=15> 15 </option>\
			<option value=20> 20 </option>\
			<option value=25> 25 </option>\
			<option value=30> 30 </option>\
			<option value=40> 40 </option>\
            <option value=50> 50 </option>\
             </option></select></td>\
          <TD width="89" class=xtab><INPUT id=idHudSearch type=submit value="Search" /></td></tr></table></div>\
<DIV id="hudResultsDiv" style="height:470px; max-height:470px; overflow:scroll;"></div>';
        document.getElementById('idHudSearch').addEventListener ('click', t.handleHudSearch, false);
        document.getElementById('idHudSelect').addEventListener ('click', t.handleHudSelect, false);

    return this.cont;
  },

  DisplayReports : function (){
    var t = Tabs.Berichte;
    var data = t.data;
    var results=document.getElementById("hudResultsDiv");
    if(!t.data.length) {
       results.innerHTML = '<center><b>Search done! no Attacks in the Alliance :)</b></center>';
       return;
    }
    var m = '<center><table><thead><th>Page #</th><th>Date</th><th>Attacker</th><th>Attacker<br>Coords</th><th>Alliance</th><th>Type</th><th>Target</th><th>Target<br>Coords</th></thead>';
    m += '<tbody>';
    for ( var i=0; i<t.data.length;i++) {
       var rpt = data[i];
       if (rpt.side0Name=='undefined')
          continue;
       m += '<tr><td>'+rpt.page+'</td>\
            <td>'+unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime)+'</td>\
            <td>'+rpt.side1Name+'</td>\
            <td>'+ pdxkoordlink(rpt.side1XCoord, rpt.side1YCoord)+'</td>\
            <td>'+rpt.side1AllianceName+'</td>\
            <td>'+rpt.marchName+'</td>\
            <td>'+rpt.side0Name+'</td>\
             <td>'+ pdxkoordlink(rpt.side0XCoord, rpt.side0YCoord)+'</td>\
            </tr>';
    }
    m += '</tbody></table></center>';
    results.innerHTML = m;
  },

  handleHudSelect : function(rslt, page) {
    var t = Tabs.Berichte;
    t.maxPages=document.getElementById("idHudSelect").value;
    if ( t.maxPages==99999)
       t.maxPages=t.totalPages;
    document.getElementById("idSpanNumPages").innerHTML = t.maxPages+'';
  },
  handleHudSearchCB : function(rslt, page) {
    var t = Tabs.Berichte;
    if (rslt) {
       if (!rslt.ok) {
          document.getElementById("idSpanHudErrorMsg").innerHTML = rslt.errorMsg;
          return;
       }
       t.totalPages=rslt.totalPages;
       if (rslt.arReports && page) {
         var ar = rslt.arReports;
         var rptkeys = unsafeWindow.Object.keys(ar);
         var myAllianceId = getMyAlliance()[0];
         for (var i = 0; i < rptkeys.length; i++) {
              var rpt = ar[rptkeys[i]];
              rpt.page = page;     
              var side0Name = rslt.arPlayerNames['p'+rpt.side0PlayerId];
              rpt.side0Name = side0Name;
              rpt.side1Name = rslt.arPlayerNames['p'+rpt.side1PlayerId];
              if (rpt.side0AllianceId > 0)
                rpt.side0AllianceName = rslt.arAllianceNames['a'+rpt.side0AllianceId];
              else
                rpt.side0AllianceName = 'unaligned';
              if (rpt.side1AllianceId > 0)
                rpt.side1AllianceName = rslt.arAllianceNames['a'+rpt.side1AllianceId];
              else
                rpt.side1AllianceName = 'unaligned';

              if (rpt.side0CityId > 0)
                rpt.side0CityName = rslt.arCityNames['c'+rpt.side0CityId];
              else
                rpt.side0CityName = 'none';
              if (rpt.side1CityId > 0)
                rpt.side1CityName = rslt.arCityNames['c'+rpt.side1CityId];
              else
                rpt.side1CityName = 'none';
              if (rpt.marchType == 1)
                  rpt.marchName = 'Transport';
              else if (rpt.marchType == 3)
                  rpt.marchName = 'Scout';
              else if (rpt.marchType == 2)
                  rpt.marchName = 'Reinforced ';
              else if (rpt.marchType == 4)
                  rpt.marchName = 'Attack';
              else rpt.marchName = 'unknown';
              if (myAllianceId != rpt.side1AllianceId)
                 t.data.push(rpt);
         }
       }
       if (parseInt(page)+1 <= t.maxPages) {
          var results=document.getElementById("hudResultsDiv");
          results.innerHTML = '<center><b>Search Page: '+(parseInt(page)+1)+'</b></center>';
          t.getAllianceReports(parseInt(page)+1);
       }
       else if (page)
           t.DisplayReports();
    }
  },

  maxPages:1,
  data:[],
  totalPages:0,

  handleHudSearch : function() {
    var t = Tabs.Berichte;
    var results=document.getElementById("hudResultsDiv");
    //logit("handleHudSearch");
    t.maxPages=document.getElementById("idHudSelect").value;
    if ( t.maxPages==99999)
       t.maxPages=t.totalPages;
    results.innerHTML = '<center><b>Searching '+t.maxPages+' Pages!</b></center>';
    t.data=[];
    t.getAllianceReports(1);
  },

  getAllianceReports : function (pageNum){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    if (pageNum)
      params.pageNo = pageNum;
    params.group = "a";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
          Tabs.Berichte.handleHudSearchCB (rslt, pageNum);     
      },
      onFailure: function (rslt) {
          Tabs.Berichte.handleHudSearchCB (rslt, pageNum);     
      },
    }, false);
  },

  show : function (){
	  if (Options.widescreen==true)mainPop.div.style.width = 770 + 'px';
  },

  hide : function (){
  },
};
/********************************* Koordinaten Hide/Show */
function pdxkoordlink (x, y){
  var m = [];
  m.push ('(<a onclick="pdxGotoMapHide (');
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
unsafeWindow.pdxGotoMapHide = function (x, y){
  try {
    unsafeWindow.Modal.hideModal();
  } catch (e){ }
  try {
    Modal.hideModal();
  } catch (e){ }
  unsafeWindow.pdxGotoMap (x, y);  
}



unsafeWindow.pdxGotoMap = function (x, y){
  if (Options.pdxhideOnGoto)
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
pdxStartup ();

/*********************************** Log Tab ***********************************
Tabs.ActionLog = {
  tabOrder: null,
  tabLabel : null,
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,
    
  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pcstat>ACTION LOG</div><DIV style="height:535px; max-height:535px  overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pcactionlog class=pdxTabLined><TR><TD></td><TD width=95%></td></table></div>';
    t.logTab = document.getElementById('pcactionlog');  
    t.state = 1;
    var a = JSON2.parse(GM_getValue ('log_'+GetServerId(), '[]'));
    if (matTypeof(a) == 'array'){
      t.last50 = a;
      for (var i=0; i<t.last50.length; i++)
        t._addTab (t.last50[i].msg, t.last50[i].ts);
    }
    window.addEventListener('unload', t.onUnload, false);
  },

  hide : function (){
	  if (Options.widescreen==true)mainPop.div.style.width = 770 + 'px';
  },

  show : function (){  
  if (Options.widescreen==true)mainPop.div.style.width = 770 + 'px';
  },

  onUnload : function (){
    var t = Tabs.ActionLog;
    GM_setValue ('log_'+GetServerId(), JSON2.stringify(t.last50));
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
}*/
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
      setTimeout (t.check, 250);
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
function parseIntZero (n){
  n = n.trim();
  if (n == '')
    return 0;
  return parseInt(n, 10);
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
  this.autoHeight = autoHeight;

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
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'hidden';
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
    t.write (t.gtlt(msg));
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
  
  gtlt : function (s){
    s = s.toString().replace ('<', '&lt;', 'g');
    return s.replace ('>', '&gt;', 'g');
  },

};

