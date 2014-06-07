// ==UserScript==
// @name           True_NioI
// @namespace      Temp True
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @include        http://apps.facebook.com/kingdomsofcamelot/*
// xxresource       PROTOTYPEJS http://cdn1.kingdomsofcamelot.com/fb/e2/src/js/prototype-28.js
// @resource       PROTOTYPEJS https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js
// @description    Temporizzatore
// @require        http://sizzlemctwizzle.com/updater.php?id=96386


// ==/UserScript==


var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON; 


var Cities = {};6
var Seed = unsafeWindow.seed;unit valor 1
var Tabs = {};
var currentName = 'Overview';
var mainPop;
var CPopUpTopClass = 'ptPopTop';
var KOCversion = null;
var ptStartupTimer = null; 0.6 to 1

var Cities = {};6
var Seed = unsafeWindow.seed;unit valor 1
var Tabs = {};
var currentName = 'Overview';
var mainPop;
var CPopUpTopClass = 'ptPopTop';
var KOCversion = null;
var ptStartupTimer = null; 0.6 to 1

var Cities = {};6
var Seed = unsafeWindow.seed;unit valor 1
var Tabs = {};
var currentName = 'Overview';
var mainPop;
var CPopUpTopClass = 'ptPopTop';
var KOCversion = null;
var ptStartupTimer = null; 0.6 to 1

var Cities = {};6
var Seed = unsafeWindow.seed;unit valor 1
var Tabs = {};
var currentName = 'Overview';
var mainPop;
var CPopUpTopClass = 'ptPopTop';
var KOCversion = null;
var ptStartupTimer = null; 0.6 to 1

var Cities = {};6
var Seed = unsafeWindow.seed;unit valor 1
var Tabs = {};
var currentName = 'Overview';
var mainPop;
var CPopUpTopClass = 'ptPopTop';
var KOCversion = null;
var ptStartupTimer = null; 0.6 to 1

var Cities = {};6
var Seed = unsafeWindow.seed;unit valor 1
var Tabs = {};
var currentName = 'Overview';
var mainPop;
var CPopUpTopClass = 'ptPopTop';
var KOCversion = null;
var ptStartupTimer = null; 0.6 to 1


function ptStartup (){
  clearTimeout (ptStartupTimer);rewrite
  if (unsafeWindow.ptLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    ptStartupTimer = setTimeout (ptStartup, 1000);return valid cost
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
  TowerAlerts.init();
  MessageCounts.init ();
  MapDistanceFix.init ();
  WarnZeroAttack.init ();
  AllianceReports.init ();
  PageNavigator.init ();
  tabManager.init (mainPop.getMainDiv());
  attackTargetPicker.init();
  
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
  
  AddMainTabLink('Falcon Tools', eventHideShow, mouseMainTab);
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
    var div = document.getElementById('modal_attack_target_numflag');
    div.parentNode.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
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
          else
            msg.push (unsafeWindow.g_js_strings.commonstr.attack);

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
            m = 'at '+ wilds[k].xCoord + ','+ barbarian[k].yCoord;
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
	if (t.postToChatOptions.includealliance && m.players['u' + m.pid].a!='')
	  var alliance = 'of '+m.players['u' + m.pid].a+'('+diplomacy+')';
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
		    <TD class=xtab><INPUT align=left id=idMyAllSubmit type=submit value="My own ally"/>\
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
		  <TR><TD align=right>Fake name to use: </td><TD><INPUT type=text size=13 value=oftheNOOBS id=fakeName></td></tr>\
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
            <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> hours</td></tr>\
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
          <TR><TD align=right>Minimum # of troops: &nbsp; </td><TD><INPUT id=alertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> &nbsp; &nbsp; <span id=alerterr></span></td></tr>\
          </table></td></tr>';
		  }
      m += '<TR><TD><INPUT id=togAllRpts type=checkbox /></td><TD>Enable enhanced Alliance Reports.</td></tr>\
        <TR><TD><INPUT id=togAllowAlter type=checkbox /></td><TD>Allow other scripts to change format of Alliance Reports.</td></tr>\
        <TR><TD><INPUT id=togEnhanceMsging type=checkbox /></td><TD>Enable enhanced messaging ("forward" and "all officers" buttons).</td></tr>\
        <TR><TD><INPUT id=togPageNav type=checkbox /></td><TD>Enhanced page navigation for messages and reports. <SPAN class=boldRed>&nbsp;(Enhanced)</span></td></tr>\
        <TR><TD><INPUT id=togWarnZero type=checkbox /></td><TD>Warn if attempting to march to location 0,0. <SPAN class=boldRed>&nbsp;(Enhanced)</span></td></tr>\
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
      </select></td></tr>\
      </table>\
      <DIV id="srcOpts" style="height:100px"></div></td><td style="visibility:hidden"><DIV id=divOutOpts style="background:#e0e0f0; padding:10px ;visibility:hidden"></div></td></tr></table></div>\
      <DIV id="srcResults" style="height:470px; max-height:470px;"></div>';
    var psearch = document.getElementById ("srcType");
    m = '<TABLE><TR valign=middle><TD class=xtab width=100 align=right>Center: &nbsp; X: </td><TD class=xtab>\
      <INPUT id=srchX type=text\> &nbsp; Y: <INPUT id=srchY type=text\> &nbsp; <SPAN id=spInXY></span>\
      </td></tr><TR><TD class=xtab align=right>Max. Distance: </td><TD class=xtab><INPUT id=srcDist size=4 value=10 /></td></tr>';
    m += '<TR><TD class=xtab></td><TD class=xtab><INPUT id=srcStart type=submit value="Start Search"/></td></tr>';
    m += '</table>';
    document.getElementById ('srcOpts').innerHTML = m;
    new CdispCityPicker ('srchdcp', document.getElementById ('spInXY'), true, null, 0).bindToXYboxes(document.getElementById ('srchX'), document.getElementById ('srchY'));
    document.getElementById ('srcStart').addEventListener ('click', t.clickedSearch, false);
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
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1 || t.opt.maxDistance>100)
      errMsg += "Max Distance must be between 1 and 100<BR>";
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
        if (t.opt.searchType == 2) {
			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Location</td><TD >Dist</td><TD>City</td><TD>Owner</td><TD>Might</td><td>Alliance               </td><TD width=80% style="font-size:9px;">More info</td><TD style="padding-left: 10px;"></td></tr>';
		} else { 
			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2><TR style="font-weight: bold"><TD>Location</td><TD style="padding-left: 10px">Distance</td><TD style="padding-left: 10px;">Lvl</td><TD width=80%> &nbsp; Type</td><TD style=""></td></tr>';
		}
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
          m += '<TD align=right>'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ tileNames[dat[i][3]]
            +'</td><TD>'+ (dat[i][5]?' OWNED':'') +'</td></tr>';
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
	    if (t.opt.searchType==2) {
			var isMisted = map[k].tileUserId == 0 || false;		
			var uu = 'u'+map[k].tileUserId;
			var aU = 'unknown';
			var aD = 'unknown';
			var mightU = 0;
			var nameU = 'unknown';
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
						aU = '----';
						aD = 'unaligned';
					}
				}
			}
			if (mightU > 0 || isMisted) {
		t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName,nameU,mightU,aU,aD ]);
			}
			
		} else {
        isOwned = map[k].tileUserId>0 || map[k].misted;
        t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned]);
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
        style = ' style = "background: #e8e8e8"';
      var tot = 0;
      var m = [];
      m.push ('<TR style="background: #fff" align=right');
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
      
      str += "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,10) +'</b><BR>'+coordLink(Cities.cities[i].x,Cities.cities[i].y )+'</td>';
      }
      if (Options.includeMarching)
        str += '<TD width=81><B>Marching</b></td>';
      str += "</tr>";
	  
	  str += '<TR valign=top align=right><TD></td><TD style=\'background: #ffc\'></td>';
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

/*************************************** ENCAMPED ************************************************/

Tabs.Encamped = {
  tabOrder : 5,
  cont:null,
  displayTimer:null,

  init : function (div){
    var t = Tabs.Encamped;
    t.cont = div;
  },


  hide : function (){
    clearTimeout (Tabs.Encamped.displayTimer);
  },

  show : function (cont){
    var rownum = 0;
    var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
    var t = Tabs.Encamped;
    if (t.displayTimer != null)
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

    s = '<div class=ptstat>Showing all of the troops encamped at each of your embassies.</div><BR>';
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



// ==/UserScript==
// @include          *apps.facebook.com/kingdomsofcamelot*
// @include          *kingdomsofcamelot.com/*main_src.php*
// @include          *kingdomsofcamelot.com/*newgame_src.php*
// @include          *facebook.com/connect/uiserver.php*


// ==/UserScript==



var KOCAversion = '10.1.2';

// Override the default alert functionality of the web browser (which causes the script to pause)
// Instead of displaying alert popups, messages will be displayed in the firefox console
unsafeWindow.alert = function(message) {
	console.info("Javascript Alert: "+message);
	if(typeof(GM_log)=="function"){
		GM_log("Javascript Alert: "+message);
	}
}
alert = unsafeWindow.alert;

// String prototypes
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }
String.prototype.StripQuotes = function() {
	return this.replace(/"/g,'');
};

/*
// Array remove function (found at http://ejohn.org/blog/javascript-array-remove/)
	Examples:
	Remove the second item from the array:
		ArrayRemoveItem(array, 1);
	Remove the second-to-last item from the array:
		ArrayRemoveItem(array, -2);
	Remove the second and third items from the array:
		ArrayRemoveItem(array, 1,2);
	Remove the last and second-to-last items from the array:
		ArrayRemoveItem(array, -2,-1);
*/
ArrayRemoveItem = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};

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

if(!this.GM_log) {
	GM_log=function(m) {
		console.log(m);
	}
	GM_registerMenuCommand=function(text,f) {
	}
	
}

if(!this.unsafeWindow) {
//~~~ need helper to return values?
	unsafeWindow={};
}


function inspect(obj, maxLevels, level){
  var str = '', type, msg;

    // Start Input Validations
    // Don't touch, we start iterating at level zero
    if(level == null)  level = 0;

    // At least you want to show the first level
    if(maxLevels == null) maxLevels = 1;
    if(maxLevels < 1)     
        return '<font color="red">Error: Levels number must be > 0</font>';

    // We start with a non null object
    if(obj == null)
    return '<font color="red">Error: Object <b>NULL</b></font>';
    // End Input Validations

    // Each Iteration must be indented
    str += '<ul>';

    // Start iterations for all objects in obj
    for(property in obj)
    {
      try
      {
          // Show "property" and "type property"
          type =  typeof(obj[property]);
          str += '<li>(' + type + ') ' + property + 
                 ( (obj[property]==null)?(': <b>null</b>'):(': '+obj[property])) + '</li>';

          // We keep iterating if this property is an Object, non null
          // and we are inside the required number of levels
          if((type == 'object') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1);
      }
      catch(err)
      {
        // Is there some properties in obj we can't access? Print it red.
        if(typeof(err) == 'string') msg = err;
        else if(err.message)        msg = err.message;
        else if(err.description)    msg = err.description;
        else                        msg = 'Unknown';

        str += '<li><font color="red">(Error) ' + property + ': ' + msg +'</font></li>';
      }
    }

      // Close indent
      str += '</ul>';

    return str;
}

function MinDigits(num,digits) {
        while((""+num).length<digits) {
                num="0"+num;
        }
        return num;
};
function SecsToStr(secs) {
		secs=Math.floor(secs);
		
        return 	Math.floor(secs/60/60/24%60)+
			":"+MinDigits(Math.floor(secs/60/60%60),2)+
			":"+MinDigits(Math.floor(secs/60%60),2);
			//	":"+MinDigits(Math.floor(secs%60),2);
};


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

function ById(id) {
	return document.getElementById(id);
}

function ByName(name) {
	return document.getElementsByName(name);
}

function AddText(box1,txt) {
	var txtObj;
	box1.appendChild(txtObj=document.createTextNode(txt));
	return txtObj;
}

function AddHtml(box1,txt) {
	var txtObj;
	var sp=document.createElement('span');
	sp.innerHTML=txt;
	box1.appendChild(sp);
	return txtObj;
}

function getAttackTypeSelected (){
  if (document.getElementById('modal_attack_tab_4').className == 'selected')  // attack
    return 0;
  if (document.getElementById('modal_attack_tab_1').className == 'selected')  // transport
    return 1;
  if (document.getElementById('modal_attack_tab_3').className == 'selected')  // scout
    return 2;
  if (document.getElementById('modal_attack_tab_2').className == 'selected')  // reinforce
    return 3;
  if (document.getElementById('modal_attack_tab_5').className == 'selected')  // reassign
    return 4;
	return null;
}

var KOCAttack={
	startListenTime:null,
	prevAttack:{'x':"350",'y':'350'},
	options:null,
	iframeCommunicator:{},
	isChrome:navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
	valuesCache:{},
	seed:{},
	currentPage:null,

	DoUnsafeWindow:function(func, execute_by_embed) {
		if(this.isChrome || execute_by_embed) {
			var scr=document.createElement('script');
			scr.innerHTML=func;
			document.body.appendChild(scr);
		} else {
			try {  
				eval("unsafeWindow."+func);
			} catch (error) {
				this.Log("A javascript error has occurred when executing a function via DoUnsafeWindow. Error description: "+error.description);
			}
		}
	},

	GetSeed:function() {
		return unsafeWindow.seed;
	},

	ReloadWindow:function() {
		//this.DoUnsafeWindow('window.location.href=window.location.href.toString().replace(/&current_time=[0-9]*/i, "")+"&current_time="+Math.round(new Date().getTime() / 1000);');
		//if(this.options.useAlternateReloadMethod){
		//	setTimeout (function (){window.location.href=window.location.href.toString().replace(/&current_time=[0-9]*/i, "")+"&current_time="+Math.round(new Date().getTime() / 1000);}, 0); 
		//}else{
			//this.DoUnsafeWindow('window.location.reload(true);');
		//	this.DoUnsafeWindow('history.go(0);');
		//}
		var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
		if (m == null){
			history.go(0);
			return;
		}
		var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+m[1];
		var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=s value="'+ m[1] +'"</form>';
		var e = document.createElement ('div');
		e.innerHTML = t;
		document.body.appendChild (e);
		setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
	},

	ShowOptionsDialog:function() {
		var div=ById('KOCAttackOptions');
		if(!div) {
			div=document.createElement('div');
			div.id='KOCAttackOptions';
			div.style.zIndex=100000;
			div.style.position='absolute';
			div.style.left='8px';
			div.style.top='8px';
			div.style.backgroundColor='#fff';
			div.style.border='3px solid #888';
			div.style.padding='10px';
			div.style.maxWidth='700px';
			document.body.appendChild(div);
		}

		var okCitiesHtml="<span onmousedown='return false; '>";
		for(var c=1; c<=8; c++) {
			okCitiesHtml+=
				"<a style='font-size: 11px; padding: 2px; cursor: pointer; text-decoration: none' id='KOCAttackOkCities_"+c+"'>"+c+"</a>&nbsp;";
		}
		okCitiesHtml+='</span>';
		
		div.style.display='block';
		div.innerHTML='';
		this.options=this.GetOptions();
		div.innerHTML="<form><table>"+
			"<tr><td valign='top' align='center'><img src='img/units/unit_6_50.jpg' /></td><td valign='top'>"+
			"Attack Order: <select id='KOCAttackOrder'><option value='mostTroops'>Use most troops first</option><option value='closest'>Closest targets first</option></select><br />"+
			"Attack Type: <input type='checkbox' "+(this.options.attackTypeCamp?'checked':'')+" id='KOCAttackTypeCamp'>Camp "+
			"<input type='checkbox' "+(this.options.attackTypeWild?'checked':'')+" id='KOCAttackTypeWild'>Wilderness "+
			"<input type='checkbox' "+(this.options.attackTypeCity?'checked':'')+" id='KOCAttackTypeCity'>City "+
			"<input type='checkbox' "+(this.options.attackTypeTransport?'checked':'')+" id='KOCAttackTypeTransport'>Transport<br> "+
			"<br />"+
			"<input id='KOCAttackDelay' value='"+this.options.attackDelay+"' size='3' /> seconds inbetween sending each attack<br />"+
			"Time inbetween sending to the <u>same target</u>...<br />"+
			"<div style='margin-left: 40px'>"+
			"Attacking camp:<input id='KOCAttackHoursSinceLastCamp' value='"+(this.options.attackSecsSinceLastCamp/(60*60))+"' size='3' />hrs<br />"+
			"Attacking wilderness:<input id='KOCAttackHoursSinceLastWild' value='"+(this.options.attackSecsSinceLastWild/(60*60))+"' size='3' />hrs<br />"+
			" Attacking city:<input id='KOCAttackHoursSinceLastCity' value='"+(this.options.attackSecsSinceLastCity/(60*60))+"' size='3' />hrs<br />"+
			" Transporting:<input id='KOCAttackMinsSinceLastTransport' value='"+(this.options.attackSecsSinceLastTransport/(60))+"' size='3' />mins"+
			"</div>"+
			"<br />"+
			"<input id='KOCAttackMaxDistance' value='"+(this.options.attackMaxDistance)+"' size='3' /> max distance away from city to attack.<br />"+
			"<input id='KOCAttackLockAttackFromCity' type='checkbox' "+(this.options.lockAttackFromCity?'checked':'')+" /> Only launch attacks from city they were first launched from.<br />"+
			"<br />"+
			"<input id='KOCAttackRetryMarch' type='checkbox' "+(this.options.retryMarch?'checked':'')+" /> Retry march if it has unknown/excess traffic error (press reload after changing this option).<br />"+
			"Open up this url in a tab when we're under attack...<br /><input id='KOCAttackImpendingAttackUrl' size='60' value='"+(this.options.impendingAttackUrl)+"' /><br />"+
			
			"</td></tr>"+

			//http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545

			"<tr><td valign='top' align='center'><img src='img/chrome_message_up.png' /></td><td valign='top'>"+
			"<input id='KOCAttackRemoveReports' type='checkbox' "+(this.options.autoRemoveReports?'checked':'')+" /> Auto remove barbarian/wilderness attack reports.<br />"+
			"<input id='KOCAttackKeepReports' value='"+this.options.keepReports+"' size='3' /> attack reports to keep maximum in the attack dialog.<br />"+
			"<input id='KOCAttackNoViewReports' type='checkbox' "+(this.options.noViewReports?'checked':'')+" /> Disable viewing of reports, this will also disable collecting of reports for the attack page.<br />"+
			
			"</td></tr>"+
			"<tr><td valign='top' align='center'><img src='img/happiness.png' /></td><td valign='top'>"+
			"<input id='KOCAttackPercentOfPopToTrain' value='"+this.options.percentOfPopToTrain+"' size='3' />% of idle population available before we do auto training.<br />"+
			"<input id='KOCAttackAutoGoldHappiness' value='"+this.options.autoGoldHappiness+"' size='3' />% happiness before we click auto gold.<br />"+
			"</td></tr>"+
			
			"<tr><td valign='top' align='center'><img src='img/chome_alliance_up.png' /></td><td valign='top'>"+
			"<input id='KOCAttackDisableInviteFriends' type='checkbox' "+(this.options.disableInviteFriends?'checked':'')+" /> Disable the annoying \"Invite Friends\" popup dialog in-game.<br />"+
			"<input id='KOCAttackAutoHelpAlliance' type='checkbox' "+(this.options.autoHelpAlliance?'checked':'')+" /> Automatically help alliance members with building/researching.<br />"+
			"<input id='KOCAttackHideAllianceHelpRequests' type='checkbox' "+(this.options.hideAllianceHelpRequests?'checked':'')+" /> Hide alliance help requests/reports in chat (if above is checked, then after helping).<br />"+
			"<input id='KOCAttackAutoPublishGamePopups' type='checkbox' "+(this.options.autoPublishGamePopups?'checked':'')+" /> Automatically publish game popups (such as help requests) to facebook wall.<br />"+
			"If above is checked, what privacy setting should we use? <select id='KOCAttackAutoPublishPrivacy'><option value='80'>Everyone</option><option value='50'>Friends of Friends</option><option value='40'>Friends Only</option><option value='10'>Only Me</option></select><br />"+
			"</td></tr>"+
			
			"</td></tr>"+
			"<tr><td valign='top' align='center'><img src='img/gems.png' /></td><td valign='top'>"+
			"<input id='KOCAttackAutoLogBackIn' type='checkbox' "+(this.options.autoLogBackIn?'checked':'')+" /> Automatically log back into domain if disconnected due to maintenance or server down-time.<br />"+
			"<input id='KOCAttackEnableLogging' type='checkbox' "+(this.options.enableLogging?'checked':'')+" /> Enable diagnostic logging in the Firefox error console messages window (useful if trying to debug a problem or if you are submitting details along with a bug report).<br />"+
			"</td></tr>"+
			
			"<tr><td valign='top' align='center'><img src='img/buildings/castle_lvl10.png' /></td><td valign='top'>"+
			"<input id='KOCAttackChangeCitySecs' value='"+(this.options.changeCitySecs)+"' size='3' /> seconds inbetween changing cities.<br />"+
			"Cycle thru all the cities <input id='KOCAttackCitiesDoneMax' value='"+(this.options.autoAttackCitiesDoneMax)+"' size='3' /> times and then wait "+
			"<input id='KOCAttackCitiesDelay' value='"+this.options.waitAfterCitiesDone+"' size='3' />secs before refreshing.<br />"+
			"Cities to attack from: "+okCitiesHtml+'<br />'+

			"<tr><td valign='top' align='center'></td><td valign='top'>"+
			"<input id='KOCAttackRandom' value='"+this.options.randomPercent+"' size='3' />% random adjustment for all delays (to look more human).<br />"+
			"Import/Export: Paste or copy the settings here...<br /><textarea id='KOCAttackImport'></textarea>"+
			"<a class='button20' id='KOCAttackImportButton'><span>Import</span></a> <a class='button20' id='KOCAttackExportButton'><span>Export</span></a><br />"+
			"</td></tr>"+

			"</table>"+
			
			"<TABLE width=100%><TR><TD><a id='KOCAttackOptionsSave' class='button20'><span>Save</span></a> <a id='KOCAttackOptionsCancel' class='button20'><span>Cancel</span></a> <a id='KOCAttackOptionsReset' class='button20'><span>Reset options</span></a> <a id='KOCAttackOptionsResetAll' class='button20'><span>Reset all!</span></a> <a id='KOCAttackDeleteAllStoredAttacks' class='button20'><span>Delete all stored attacks</span></a></td><TD align=right>"+ KOCAversion +"</td></tr></form>";
		var t=this;

		var importText=ById('KOCAttackImport');
		importText.addEventListener('focus',function() {
			importText.select();
		},false);
		ById('KOCAttackImportButton').addEventListener('click',function() {
			if(importText.value=="") return;
			t.ImportAllFromJSON(importText.value);
		},false);
		ById('KOCAttackExportButton').addEventListener('click',function() {
			importText.value=t.ExportAllToJSON();
		},false);
		
		nHtml.SetSelect(ById('KOCAttackOrder'),this.options.attackOrder);
		ById('KOCAttackOptionsCancel').addEventListener('click',function() {
			div.style.display='none';
		},false);
		ById('KOCAttackOptionsReset').addEventListener('click',function() {
			t.ClearOptions();
			this.options=t.GetOptions();
			div.style.display='none';
		},false);
		ById('KOCAttackOptionsResetAll').addEventListener('click',function() {
			t.FactoryReset();
			//window.location.reload(true);
			t.ReloadWindow();
		},false);
		ById('KOCAttackDeleteAllStoredAttacks').addEventListener('click',function() {
			t.DeleteAllStoredAttacks();
			//window.location.reload(true);
			t.ReloadWindow();
		},false);
		nHtml.SetSelect(ById('KOCAttackAutoPublishPrivacy'),this.options.autoPublishPrivacySetting);

		for(var c=1; c<=8; c++) {
			var sp=ById('KOCAttackOkCities_'+c);
			var SetCity=function(target,set) {
				target.style.border=set?'2px solid #080':'';
				target.style.margin=set?'2px':'4px';
			};
			sp.addEventListener('click',function(evt) { SetCity(evt.target,evt.target.style.border==''?true:false); },false);
			//sp.onmousedown=function() { return false; }
			SetCity(sp,t.options.okCities[c]);
		}
		

		ById('KOCAttackOptionsSave').addEventListener('click',function() {
			t.options.attackTypeCamp=ById('KOCAttackTypeCamp').checked;
			t.options.attackTypeCity=ById('KOCAttackTypeCity').checked;
			t.options.attackTypeWild=ById('KOCAttackTypeWild').checked;
			t.options.attackTypeTransport=ById('KOCAttackTypeTransport').checked;
			
			t.options.attackDelay=parseInt(ById('KOCAttackDelay').value);
			t.options.waitAfterCitiesDone=parseInt(ById('KOCAttackCitiesDelay').value);
			t.options.keepReports=parseInt(ById('KOCAttackKeepReports').value);
			t.options.changeCitySecs=parseInt(ById('KOCAttackChangeCitySecs').value);
			t.options.autoGoldHappiness=parseInt(ById('KOCAttackAutoGoldHappiness').value);
			t.options.percentOfPopToTrain=parseFloat(ById('KOCAttackPercentOfPopToTrain').value);
			
			var prev_disableInviteFriends = t.options.disableInviteFriends;
			t.options.disableInviteFriends=ById('KOCAttackDisableInviteFriends').checked;
			if(prev_disableInviteFriends != t.options.disableInviteFriends){
				alert("You changed the option for disabling/enabling the \"Invite Friends\" feature.\nPlease note: You will need to refresh the entire game window for the new setting to take effect!");
			}
			
			t.options.autoHelpAlliance=ById('KOCAttackAutoHelpAlliance').checked;
			t.options.hideAllianceHelpRequests=ById('KOCAttackHideAllianceHelpRequests').checked;
			t.options.autoPublishGamePopups=ById('KOCAttackAutoPublishGamePopups').checked;
			t.options.autoPublishPrivacySetting=ById('KOCAttackAutoPublishPrivacy').value;
			
			t.options.autoLogBackIn=ById('KOCAttackAutoLogBackIn').checked;
			t.options.enableLogging=ById('KOCAttackEnableLogging').checked;

			t.options.attackSecsSinceLastCamp=parseFloat(ById('KOCAttackHoursSinceLastCamp').value)*60*60;
			t.options.attackSecsSinceLastWild=parseFloat(ById('KOCAttackHoursSinceLastWild').value)*60*60;
			t.options.attackSecsSinceLastCity=parseFloat(ById('KOCAttackHoursSinceLastCity').value)*60*60;
			t.options.attackSecsSinceLastTransport=parseFloat(ById('KOCAttackMinsSinceLastTransport').value)*60;
			t.options.randomPercent=parseFloat(ById('KOCAttackRandom').value);
			t.options.attackMaxDistance=parseFloat(ById('KOCAttackMaxDistance').value);
			t.options.autoAttackCitiesDoneMax=parseInt(ById('KOCAttackCitiesDoneMax').value);

			t.options.attackOrder=ById('KOCAttackOrder').value;
			
			t.options.lockAttackFromCity=ById('KOCAttackLockAttackFromCity').checked;
			t.options.autoRemoveReports=ById('KOCAttackRemoveReports').checked;
			t.options.retryMarch=ById('KOCAttackRetryMarch').checked;
			t.options.impendingAttackUrl=ById('KOCAttackImpendingAttackUrl').value;
			
			t.options.noViewReports=ById('KOCAttackNoViewReports').checked;
			
			for(var c=1; c<=8; c++) {
				var okcity=ById('KOCAttackOkCities_'+c);
				t.options.okCities[c]=okcity.style.border!=""?true:false;
			}

			t.SetOptions(t.options);
			div.style.display='none';
		},false);
	},

	AddOptionsLink:function() {
		var t=this;
		var a=ById('KOCAttackOptionsLink');
		if(a) return;

		a=this.AddTabLink('Options');
		if(!a) {
			window.setTimeout(function() {
				t.AddOptionsLink();
			},t.GetRandTime(250));
			return;
		}
		a.id='KOCAttackOptionsLink';
		a.addEventListener('click',function() {
			t.ShowOptionsDialog();
		},false);
	},

	AddTabLink:function(html) {
		// Resize main tab bar container
		var tab_container = ById("main_engagement_tabs");
		tab_container.style.width = "715px";
		// Create new tab
		var a=document.createElement('a');
		a.className='tab';
		a.style.color='#fff';
		a.innerHTML='<span>'+html+'</span>';
		var tabs=ById('KOCAttackTabs');
		if(!tabs) {
			var ptabs=ById('main_engagement_tabs');
			if(!ptabs) {
				ptabs=ById('topnav_msg');
				if(ptabs)ptabs=ptabs.parentNode;
			}
			if(!ptabs) {
				ptabs=document.body;
			}
			tabs=document.createElement('span');
			tabs.id='KOCAttackTabs';
			ptabs.insertBefore(tabs,ptabs.childNodes[0]);
		}
		
		if(tabs) {
			tabs.style.whiteSpace='nowrap';
			tabs.style.width='1600px';
			tabs.appendChild(a);
			return a;
		}
		return null;
	},

	ToggleAutoAttack:function() {
		var t=this;
		var a=t.GetAutoAttack();
		if(!a) {
			t.SetAutoAttack({'barbarian':true,'cities':{}});
			t.RestartAutoAttack();
		} else {
			t.ClearAutoAttackTimeout();
			t.SetAutoAttack(null);
		}
	/*
		// toggle for this city, 
		if(!a.cities) a.cities={};
		var city=t.GetCurrentCityId();
		a.cities[city]=a.cities[city]?undefined:true;
		var attackCities=0;
		for(city in a.cities) {
			attackCities++;
		}
		if(attackCities==0) {
			t.ClearAutoAttackTimeout();
			t.SetAutoAttack(null);
		}
	*/			
		t.SetAttackStatusMessage();
	},

	SetAttackStatusMessage:function() {
		//var mess=this.GetStatusMessage();
		var toggle=ById('KOCAttackToggle');

		if(!toggle) {
			var t=this;
			toggle=this.AddTabLink('Falcon Attack');
			if(!toggle) {
				window.setTimeout(function() {
					t.SetAttackStatusMessage();
				},t.GetRandTime(250));
				return;
			}
			toggle.id='KOCAttackToggle';
			toggle.addEventListener('click',function() {
				t.ToggleAutoAttack();
			},false);
		}
		var autoAttack=this.GetAutoAttack();
	//	if(autoAttack && autoAttack.cities && autoAttack.cities[t.GetCurrentCityId()]) {
		if(autoAttack) {
			toggle.innerHTML='<span>Falcon Attack - On</span>';
		} else {
			toggle.innerHTML='<span>Falcon Attack - Off</span>';
		}
	},

	SetStatusMessage:function(str) {
		var mess=this.GetStatusMessage();
		var txt=ById('KOCAttackMessage');
		if(!txt) {
			txt=document.createElement('span');
			mess.appendChild(txt);
		}
		txt.innerHTML=str;
	},
	GetStatusMessage:function() {
		var mess=ById('KOCAttackStatus');
		if(!mess) {
			var timeHead=ById('kochead_time');
			mess=document.createElement('span');
			mess.id='KOCAttackStatus';
			timeHead.parentNode.appendChild(mess);
		}
		return mess;
	},

	Log:function(str) {
		if(this.options.enableLogging){
			str=this.GetServerId()+":"+str;
			GM_log(str);
		}
	},

	currentServerId:-1,
	GetServerId:function() {
		var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
		if(m) {
			this.currentServerId = m[1];
		}
		// Attempt to pull current server id from greasemonkey cache for cross-domain calls
		if(this.currentServerId<0){
			this.currentServerId = GM_getValue("KOCAttackLastKnownServerID",-1);
		}
		return this.currentServerId;
	},

	GetValue:function(prefix,def) {
		var n=prefix+'_'+this.GetServerId();
		return this.browser_getValue(n,def);
	},

	SetValue:function(prefix,val) {
		var n=prefix+'_'+this.GetServerId();
		this.browser_setValue(n,val);
	},

	GetValuesCache:function(doneFunc) {
		if(!this.isChrome) {
			if(doneFunc) {
				doneFunc.call(this);
			}
			return;
		}
	/*	
		var t=this;
		chrome.extension.sendRequest({func:"get","n":'KOCAttack'}, 
		function(response) {
		//~~~
			this.valuesCache=JSON2.parse(unescape(response.v));
			if(doneFunc) {
				doneFunc.call(t);
			}
		});
		return def;
	*/	
		var idx=0;
		
		var cookie='kocattack';
		var doccookie=document.cookie;
		while(true) {
			var i=doccookie.indexOf(cookie+'=',idx);
			if(i<0) { this.valuesCache={}; return; }
			idx=i+cookie.length+1;
			var ch=doccookie.substring(i-1,i);
			if(i==0 || ch==';' || ch==' ' || ch=='=') {
				break;
			}
		}

		var idxEnd=doccookie.indexOf(";",idx);
		if(idxEnd<0) { idxEnd=doccookie.length; }
		var cookieVal=doccookie.substring(idx,idxEnd);
		this.valuesCache=JSON2.parse(unescape(cookieVal));
	},
	SetValuesCache:function() {
		if(!this.isChrome) return;
		document.cookie='kocattack='+escape(JSON2.stringify(this.valuesCache))+'; expires='+
			(new Date(new Date().getTime()+(60*60*24*365*5)).toGMTString() );
	},

	browser_listValues:function() {
		if(this.isChrome) {
			var ns=[];
			for(var n in this.valuesCache) {
				ns.push(n);
			}
			return ns;
		}
		return GM_listValues();
	},
	browser_getValue:function(n,def) {
		if(this.isChrome) {
			if(this.valuesCache==null) {
				this.GetValuesCache();
			}
			if(this.valuesCache[n]==undefined) {
				return def;
			}
			return this.valuesCache[n];
		}
		return GM_getValue(n,def);
	},
	browser_setValue:function(n,val) {
		if(this.isChrome) {
			this.valuesCache[n]=val;
			return;
		}
		if(val==null || val==undefined) {
			GM_deleteValue(n);
		} else {
			GM_setValue(n,val);
		}
	},


	GetMinHours:function() {
		var m=this.GetValue('MinHours',1);
		if(m=="" || m==undefined) m=1;
		return m;
	},
	SetMinHours:function(val) {
		this.SetValue('MinHours',val);
	},

	ClearOptions:function() {
		this.SetValue('Options',JSON.stringify({}));
	},
	GetOptions:function() {
		var json=this.GetValue('Options','{}');
		if(json=='') json='{}';
		var options=JSON2.parse(json);
		var defOptions={"attackDelay":08,
			"attackTypeCamp":true,
			"attackOrder":"closest",
			"autoRemoveReports":true,
			"attackSecsSinceLastCity":60*60*12,
			"attackSecsSinceLastCamp":3600,
			"attackSecsSinceLastWild":3600,
			"attackSecsSinceLastTransport":60,
			"randomPercent":10,
			"keepReports":10,
			"attackMaxDistance":75,
			"lockAttackFromCity":true,
			"waitAfterCitiesDone":20,
			"autoAttackCitiesDoneMax":2,
			"changeCitySecs":20,
			"retryMarch":true,
			"noViewReports":false,
			"chromeKeepReports":2,
			"percentOfPopToTrain":75,
			"autoGoldHappiness":99,
			"disableInviteFriends":true,
			"autoHelpAlliance":true,
			"hideAllianceHelpRequests":false,
			"autoPublishGamePopups":false,
			"autoPublishPrivacySetting":"80",
			"autoLogBackIn":true,
			"enableLogging":false,
			"okCities":[1,1,1,1,1,1,1,1,1,1],
			'impendingAttackUrl':''};
		for(var n in defOptions) {
			if(options[n]!=undefined) { continue; }
			options[n]=defOptions[n];
		}
		return options;
	},
	SetOptions:function(v) {
		this.SetValue('Options',JSON2.stringify(v));
	},
	
	ClearCrossIframeCommands:function() {
		this.SetValue('CrossIframeCommands',JSON.stringify({}));
	},
	GetCrossIframeCommands:function() {
		var json=this.GetValue('CrossIframeCommands','{}');
		if(json=='') json='{}';
		var commands=JSON2.parse(json);
		if(!commands.queue || commands.queue instanceof Array !== true){
			commands.queue = new Array();
		}
		return commands;
	},
	SetCrossIframeCommands:function(v) {
		this.SetValue('CrossIframeCommands',JSON2.stringify(v));
	},
	AddCrossIframeCommand:function(pageName, functionCall, functionParameters) {
		var command = {};
		command.pageName = pageName;
		command.functionCall = functionCall;
		var commands = this.GetCrossIframeCommands();
		commands.queue.push(command);
		this.SetCrossIframeCommands(commands);
	},

	GetAttackName:function(x,y) {
		return 'attack_'+this.GetServerId()+'_'+x+','+y;
	},
	SetAttack:function(x,y,attack) {
		this.browser_setValue(this.GetAttackName(x,y),
			JSON2.stringify(attack));
	},
	GetAttack:function(x,y) {
		var str=this.browser_getValue(this.GetAttackName(x,y),'');
		if(!str) return null;
		return JSON2.parse(str);
	},
	DeleteAttack:function(x,y) {
		var str=this.browser_getValue(this.GetAttackName(x,y),'');
		if(!str) return;
		GM_deleteValue(this.GetAttackName(x,y));
	},

	isSuicideAttackDefinedAtLocation:function(x,y) {
		var attack=this.GetAttack(x,y);
		if(!attack){ return false; }
		if(attack.suicidewave) { return true; }
		if(attack.a && attack.a.suicidewave){ return true; }
		return false;
	},

	IsFirstAttackAtLocation:function(x,y) {
		if(this.prevAttack.x && this.prevAttack.y){
			if(this.prevAttack.x==x && this.prevAttack.y==y) {
				this.Log("Previous attack matches current attack. This is not first attack!");
				return false;
			}
		}
		var attack=this.GetAttack(x,y);
		if(!attack){
			this.Log("Previous attack not defined. This is first attack!");
			return true;
		}
		if(attack.a) { attack = attack.a; }
		if(!attack.suicidewavetime || !attack.time){
			this.Log("Suicide wave time: "+attack.suicidewavetime+". Attack time: "+attack.time+". This is first attack!");
			return true;
		}
		var nowSecs=new Date().getTime()/1000;
		// If the suicide attack was launched before the attack time allowed beween the same 
		// camp/wilderness/city/transport, and the normal attack was launched *after* the suicide attack,
		// then we can safely re-launch the suicide attack by pretending that this is the "First Attack" again.
		var attackDelay=this.GetAttackDelay(attack);
		//this.Log("Attack Delay for ("+x+","+y+"): "+attackDelay);
		if( attack.suicidewavetime <= (nowSecs-(this.options.attackDelay+attackDelay)) && attack.time > attack.suicidewavetime && attack.time < nowSecs-attackDelay){
			this.Log("Suicide wave attack timer expired. This is first attack!");
			return true;
		}
		return false;
		//if(!this.prevAttack) return true;
		//return ((this.prevAttack.x==x && this.prevAttack.y==y)?false:true);
	},

	GetCommandHistory:function(history_log_name) {
		if(!history_log_name){
			var history_log_name = "default";
		}
		var json=this.GetValue('PreviousCommandHistory_'+history_log_name,'{}');
		if(json=='') json='{}';
		var json_object=JSON2.parse(json);
		if(!json_object['items']){
			json_object['items'] = Array();
		}
		return json_object;
	},

	AddToCommandHistory:function(command_string, history_log_name, log_length_limit) {
		if(!command_string){ return false; }
		if(!history_log_name){ var history_log_name = "default"; }
		// Default to a history length of 20 commands
		if(!log_length_limit){ var log_length_limit = 20; }
		// Get the previous history of commands
		var previous_commands = this.GetCommandHistory(history_log_name);
		var items = previous_commands['items'];
		// Add the new command
		items.push(command_string);
		// Limit the history length
		if(items.length>log_length_limit){
			items = items.slice(items.length-log_length_limit);
		}
		previous_commands['items'] = items;
		this.SetValue('PreviousCommandHistory_'+history_log_name,JSON2.stringify(previous_commands));
	},

	FindInCommandHistory:function(command_string, history_log_name) {
		if(!command_string){ return false; }
		if(!history_log_name){ var history_log_name = "default"; }
		// Get the previous history of commands
		var previous_commands = this.GetCommandHistory(history_log_name);
		var items = previous_commands['items'];
		for(var i=0; i<items.length; i++){
			if(items[i] == command_string){
				return true;
			}
		}
		return false;
	},

	GetGuiCoords:function() {
		var x=ById('modal_attack_target_coords_x');
		var y=ById('modal_attack_target_coords_y');
		if(!x || !y) {	
			this.Log("Cannot find gui coords");
			return null;
		}
		return [x.value,y.value];
	},

	SetAttackFromGui:function(box) {
		var xy=this.GetGuiCoords();
		if(!xy) return null;
		return this.SetAttackFromGuiXY(xy[0],xy[1],box);
	},

	AttackLastSentTime:0,	
	UpdateAttackLastSentTime:function(){
		this.AttackLastSentTime = new Date().getTime()/1000;
		this.SetValue('AttackLastSentTime',this.AttackLastSentTime);
	},
	
	SendingMultipleWaves:false,
	IsCurrentlySendingMultipleWaves:function() {
		if(this.AttackLastSentTime == 0){
			this.AttackLastSentTime = this.GetValue('AttackLastSentTime',0);
		}
		var nowSecs = new Date().getTime()/1000;
		var waveTimerDelay = this.options.attackDelay*2;
		var timeDifference = nowSecs-this.AttackLastSentTime;
		//this.Log("nowSecs: "+nowSecs+" waveTimerDelay: "+waveTimerDelay+" timeDifference: "+timeDifference+" SendingMultipleWaves: "+this.SendingMultipleWaves);
		// If the last attack was sent at a time ago that is more than twice the attack delay,
		// then we assume something failed and we reset the multiple wave tracker so everything can continue.
		if(timeDifference > waveTimerDelay && this.SendingMultipleWaves==true){
			this.SendingMultipleWaves=false;
			this.Log("Multiple wave timer \("+waveTimerDelay+"\ seconds) has expired. Last known attack was sent "+timeDifference+" seconds ago. Resetting timer and continuing...");
		}
		return this.SendingMultipleWaves;
	},
	
	SetAttackFromGuiXY:function(x,y,box,isSuicideWave) {
		if(!isSuicideWave){
			var isSuicideWave = false;
		}
		var troops=[];
		var totalTroops=0;
		for(var tr=0; tr<100; tr++) {
			var troop=ById('modal_attack_unit_ipt'+tr);
			if(!troop) continue;
			try {
				var v=parseInt(troop.value);
				troops[tr]=v;
				totalTroops+=v;
			} catch(e) {
				continue;
			}
		}
		var comment=ById('KocAttackComment');
		var marchType = getAttackTypeSelected();	
		if(marchType==null) {
			throw("Cannot find attack type");
		}

		if(totalTroops<=0) {
			this.Log("No troops, not saving attack");
			return null;
		}

		// ignore anything other than attack
		if(marchType==0) {
			var attack=this.GetAttack(x,y);
			if(!attack) attack={};
			attack.type=marchType;
			if(comment){ attack.comment=comment.value; }
			var nowSecs=new Date().getTime()/1000;
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);
			var firstAttack=this.IsFirstAttackAtLocation(x,y);
			this.Log("First attack?: "+firstAttack);
			
			this.Log("Suicide attack defined? : "+SuicideAttackDefined);
			
			if(totalTroops>0 && (((troops[1]+troops[2]+troops[10])==totalTroops && firstAttack) || isSuicideWave)) {
				if(totalTroops>0 && ((troops[1]+troops[2]+troops[10])==totalTroops && firstAttack)){
					this.Log("Suicide attack determined by troop type and by first attack");
				}else if(isSuicideWave){
					this.Log("Suicide attack determined by checkbox");
				}
				// nothing but supply troops and/or militiamen and/or ballista. This must be an anti-defense suicide wave attack
				this.Log("Suicide wave :"+troops);
				attack.suicidewave=troops;
				attack.currenttattackwavetype = "suicide";
				attack.suicidewavetime = nowSecs;
				this.SendingMultipleWaves = true;
			} else {
				this.Log("Normal wave :"+troops);
				attack.time=nowSecs;
				if(firstAttack) {
					attack.suicidewave=undefined;
				}
				attack.currenttattackwavetype = "normal";
				attack.troops=troops;
				this.SendingMultipleWaves = false;
			}
			
			//if (this.options.lockAttackFromCity) {
			attack.fromCity=this.GetCurrentCityId();
			//}

			//attack.ignore=undefined;
			this.prevAttack={'x':x,'y':y};
			this.SetAttack(x,y,attack);
			return attack;
		} else if(marchType==1) {
			// try to parse transports
			var attack=this.GetAttack(x,y);
			if(!attack) attack={};
			attack.type=marchType;
			//attack.ignore=true; // We set this to ignore for now until I can get the auto attack working
			if(comment)
				attack.comment=comment.value;
			var nowSecs=new Date().getTime()/1000;
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);

			attack.time=nowSecs;
			attack.troops=troops;

			var resources=[];
			var resourceTypes = new Array(
				'gold',
				'rec1',
				'rec2',
				'rec3',
				'rec4'
			);
			for(var res=0; res<resourceTypes.length; res++) {
				var resource=ById('modal_attack_'+resourceTypes[res]);
				if(!resource) continue;
				try {
					var v=parseInt(resource.value);
					resources[res]=v;
					totalResources+=v;
				} catch(e) {
					continue;
				}
			}
			attack.resources=resources;
			
			//if (this.options.lockAttackFromCity) {
			attack.fromCity=this.GetCurrentCityId();
			//}
			//attack.ignore=undefined;
			attack.currenttattackwavetype = "transport";
			this.prevAttack={'x':x,'y':y};
			this.SetAttack(x,y,attack);
			return attack;
		} else {
			// Reset it
			this.prevAttack={'x':"350",'y':'350'};
		}
		return null;
	},

	ToggleCurrenttAttackWaveType:function(x,y,manual_setting) {
		var original_attack = this.GetAttack(x,y);
		if(original_attack) {
			var attack = original_attack;
			if(original_attack.a){
				attack = original_attack.a;
			}
			var previousattackwavetype = 'undefined';
			if(attack){
				//this.Log("Inspecting attack: "+inspect(attack,10));
				if(attack.currenttattackwavetype){
					previousattackwavetype = attack.currenttattackwavetype;
				}
				if(manual_setting){
					attack.currenttattackwavetype = manual_setting;
				}else if(attack.suicidewave && attack.currenttattackwavetype == "bulkadded"){
					attack.currenttattackwavetype = "suicide";
				}else{
					// Toggle back and forth
					if(attack.suicidewave && attack.currenttattackwavetype == "normal"){
						attack.currenttattackwavetype = "suicide";
					}else{
						attack.currenttattackwavetype = "normal";
					}
				}
				this.Log("Toggling attack for ("+x+", "+y+") from "+previousattackwavetype+" to "+attack.currenttattackwavetype);
				if(original_attack.a){
					original_attack.a = attack;
					attack = original_attack;
				}
				this.SetAttack(x,y,attack);
				return attack.currenttattackwavetype;
			}else{
				return false;
			}
		}else{
			return false;
		}
	},

	BulkAddCoords:function(box,coordsText,force,locationType,isSuicideWave) {
		if(!locationType){
			var locationType = "Camp";
		}
		if(!isSuicideWave){
			var isSuicideWave = false;
		}
		var coordRows=coordsText.split("\n");
		var added=0;
		for(var r=0; r<coordRows.length; r++) {
			var row=coordRows[r];
			var m=/^\s*([0-9]+)\s*,\s*([0-9]+)/.exec(row);
			if(!m) {
				m=/^\s*([0-9]+)\s+([0-9]+)/.exec(row);
				if(!m) continue;
			}
			var x=m[1];
			var y=m[2];
			var attack=this.GetAttack(x,y);
			
			var currenttattackwavetype = "bulkadded";
			var SuicideAttackDefined=this.isSuicideAttackDefinedAtLocation(x,y);
			var previous_suicidewave = undefined;
			if(attack && (SuicideAttackDefined || isSuicideWave)){
				previous_suicidewave = attack.suicidewave;
			}
			
			if(attack && !force) {
				if(SuicideAttackDefined && isSuicideWave==true){
					this.Log('Suicide wave for '+x+','+y+' has already been added. Try over-writing it.');
					continue;
				}else if(attack.troops){
					this.Log('Attack wave for '+x+','+y+' has already been added. Try over-writing it.');
					continue;
				}
			}
			var attack=this.SetAttackFromGuiXY(x,y,box,isSuicideWave);
			if(attack) {
				attack.levelInfo={'type':locationType,'level':0};
				attack.fromCity=this.GetCurrentCityId();
				var nowSecs=new Date().getTime()/1000;
				var monthAgo=nowSecs-(60*60*24*31);
				attack.time=monthAgo;
				if(SuicideAttackDefined || isSuicideWave || previous_suicidewave){
					// set up suicide wave before attack time, according to "seconds in between sending each attack"
					attack.suicidewavetime = attack.time - this.options.attackDelay;
					if(previous_suicidewave && (!SuicideAttackDefined || !isSuicideWave)){
						this.Log("Previous suicide wave for this attack was over-written by new attack. Merging and restoring...");
						attack.suicidewave = previous_suicidewave;
					}
				}
				attack.ignore=undefined;
				attack.currenttattackwavetype=currenttattackwavetype;
				this.SetAttack(x,y,attack);
				this.Log(x+','+y+' attack added: '+inspect(attack));
				this.Log("current attack wave type: "+attack.currenttattackwavetype);
				added++;
			}
		}
		// Redraw attacks on map listing
		this.DrawClosestFarms();
		// done
		return added;
	},

	BulkAddAttackLink:function(box) {
		var div=ById('BulkAddAttackDiv');
		var t=this;
		if(!div) {
			div=document.createElement('div');
			div.id='BulkAddAttackDiv';
			div.style.display='inline';
		}
		div.innerHTML='';
		
		var bulkAddTable=document.createElement('table');
		bulkAddTable.style.background='transparent';
		var bulkAddDiv=document.createElement('div');
		bulkAddTable.insertRow(-1).insertCell(-1).appendChild(bulkAddDiv);
		bulkAddDiv.style.display='none';
		AddHtml(bulkAddDiv,"<hr />");
		AddHtml(bulkAddDiv,"Copy and paste coords here (ie. 343,434) one on each line...<br />Note: it will only add the target using the current number of troops on this screen.<br /><input id='KOCAttackBulkAddForce' type='checkbox' /> Overwrite existing attack if one already exists<br />");

		
		// radio boxes for defining bulk coordinate type
		AddHtml(bulkAddDiv,"<hr />");
		AddHtml(bulkAddDiv,"Type of Locations (All coordinates must match this type):<br />");
		var arrData = [["Camp", "Camps"],["Wilderness", "Wildernesses"]];
		for (var i=0; i < arrData.length; i++){
			var objRadItem = document.createElement("input");
			objRadItem.type = "radio";
			objRadItem.name = "KOCAttackBulkAddLocationType";
			objRadItem.id = "KOCAttackBulkAddLocationType_" + arrData[i][0];
			objRadItem.value = arrData[i][0];

			if(i == 0) {objRadItem.defaultChecked = true; objRadItem.checked = true; };

			var objTextNode = document.createTextNode(" " + arrData[i][1]);

			var objLabel = document.createElement("label");
			objLabel.htmlFor = objRadItem.id;
			objLabel.appendChild(objRadItem);
			objLabel.appendChild(objTextNode);

			bulkAddDiv.appendChild(objLabel);
			AddHtml(bulkAddDiv," ");
		};
		AddHtml(bulkAddDiv,"<hr />");
		
		AddHtml(bulkAddDiv,"<input id='KOCAttackBulkAddSuicideWave' type='checkbox' onClick='javascript:document.getElementById(\"KOCAttackBulkAddLocationType_Wilderness\").checked=true;' /> This is an initial suicide wave to wipe out traps on a wilderness.<br />");
		
		AddHtml(bulkAddDiv,"<hr />");
		
		var coords=document.createElement('textarea');
		coords.wrap='off';
		coords.style.whiteSpace='nowrap';
		coords.cols=10;
		coords.rows=8;
		bulkAddDiv.appendChild(coords);
		AddHtml(bulkAddDiv,"<br />");
		var bulkAdd=document.createElement('a');
		bulkAdd.className='buttonDown20';
		bulkAdd.innerHTML='<span>Bulk Add</span>';
		bulkAddDiv.appendChild(bulkAdd);
		bulkAdd.addEventListener('click',function() {
			// Determine location type
			var locationType = "Camp"; // Default value
			var locationTypeRadioBoxes = ByName('KOCAttackBulkAddLocationType');
			for(var i = 0; i < locationTypeRadioBoxes.length; i++) {
				if(locationTypeRadioBoxes[i].checked) {
					locationType = locationTypeRadioBoxes[i].value;
					break;
				}
			}
			// Determine attack wave type
			var isSuicideWave = ById('KOCAttackBulkAddSuicideWave').checked;
			// Add the coordinates
			var added=t.BulkAddCoords(box,coords.value,ById('KOCAttackBulkAddForce').checked,locationType,isSuicideWave);
			bulkAddDiv.style.display='none'; 
			bulkAddAttackLink.style.display='inline';
			window.alert('Bulk added '+added+' coords');
		},false);
		AddHtml(bulkAddDiv,"<br />");

		var bulkAddAttackLink=document.createElement('a');
		bulkAddAttackLink.className='buttonDown20';
		bulkAddAttackLink.innerHTML='<span>Bulk add coords</span>';
		bulkAddAttackLink.addEventListener('click',function() { 
			bulkAddDiv.style.display='inline'; 
			bulkAddAttackLink.style.display='none'; 
		},false);
		div.appendChild(bulkAddTable);
		div.appendChild(bulkAddAttackLink);
		return div;
	},

	HideAttackEfforts:function() {
		if (!ById('modal_attack_march_boost'))
    return;


		//items=items.parentNode.parentNode;
		var a=document.createElement('a');
		a.innerHTML='Hide/Show attack efforts';
		//a.href='javascript:;';
		a.style.cursor='pointer';
		a.addEventListener('click',function() {
		if ( ById('modal_attack_march_boost').style.display == 'none'){
		   hideshow ('block');
		} else {
		   hideshow ('none');
		}
		},false);
		return a;
		
		function hideshow (disp){
		ById('modal_attack_march_boost').style.display = disp;	
		ById('modal_attack_attack_boost').style.display = disp;	
		ById('modal_attack_defense_boost').style.display = disp;
		var div = ById('modal_attack_speed_boost');
		for (var i=0; i<i<div.childNodes.length; i++){
		  if (div.childNodes[i].className == 'section_title')
			div.childNodes[i].style.display = disp;
		  if (div.childNodes[i].className == 'section_content'){
			div = div.childNodes[i];
			for (i=0; i<div.childNodes.length; i++){
			  if (div.childNodes[i].style!=undefined && div.childNodes[i].className!='estimated')
				div.childNodes[i].style.display = disp;
			}
			break;
		  }  
		}
		}
	},

	SetResourceInput:function(num,resourceCount) {
		var resource=ById('modal_attack_'+num);
		if(!resource) return null;
		resource.value=resourceCount;
		resource.style.backgroundColor='';

		// send a shift key so that it recalculates
		var evt = document.createEvent("KeyboardEvent");
		if(evt.initKeyboardEvent) {
			evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
		} else {
			evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
		}
		resource.dispatchEvent(evt);

		if(parseInt(resourceCount)>0) {
			if(resource.value!=resourceCount) {
				this.Log('Not able to set resource count:'+num+',wanted:'+resourceCount+', count:'+resource.value);
				resource.style.backgroundColor='#f88';
				return 'notfull';
			} else {
				resource.style.backgroundColor='#ff8';
				return 'full';
			}
		}
		return 'none';
	},

	SetTroopInput:function(num,troopCount) {
		var troop=ById('modal_attack_unit_ipt'+num);
		if(!troop) return null;
		troop.value=troopCount;
		troop.style.backgroundColor='';

		// send a shift key so that it recalculates
		var evt = document.createEvent("KeyboardEvent");
		if(evt.initKeyboardEvent) {
			evt.initKeyboardEvent("keyup",true,true,null,false,false,false,false,0x10,0);
		} else {
			evt.initKeyEvent("keyup",true,true,null,false,false,false,false,0x10,0);
		}
		troop.dispatchEvent(evt);

		if(parseInt(troopCount)>0) {
			if(troop.value!=troopCount) {
				this.Log('Not able to set troop count:'+num+',wanted:'+troopCount+', count:'+troop.value);
				troop.style.backgroundColor='#f88';
				return 'notfull';
			} else {
				troop.style.backgroundColor='#ff8';
				return 'full';
			}
		}
		return 'none';
	},

	GetRandTime:function(millis) {
		var millisPerc=millis*(this.options.randomPercent/100);
		var randSecs=Math.floor((Math.random()*millisPerc*2)-millisPerc)+millis;
		return randSecs;
	},

	GetAutoGold:function() {
		return this.GetValue('AutoGold,'+this.GetCurrentCityId(),true);
	},
	SetAutoGold:function(v) {
		return this.SetValue('AutoGold,'+this.GetCurrentCityId(),v);
	},

	GetAbandonWilds:function() {
		return this.GetValue('AbandonWilds_'+this.GetCurrentCityId(),false);
	},
	SetAbandonWilds:function(v) {
		return this.SetValue('AbandonWilds_'+this.GetCurrentCityId(),v);
	},

	CheckAutoRaiseGold:function() {
		if(!this.GetAutoGold()) return;
		var happiness=parseInt(this.GetSeed().citystats["city" + this.GetCurrentCityId()].pop[2]);
		
		if(happiness>=this.options.autoGoldHappiness) {
			this.DoUnsafeWindow("modal_raise_gold();");
		}
	},

	CheckAbandonWilds:function() {
		if(!this.GetAbandonWilds()) return;
		var t=this;
		var castle=ById('slot_0');
		nHtml.Click(castle);
		this.DoUnsafeWindow("changeCastleModalTabs(2);");
		var wildsWindow=ById('castle_2');
		var rows=wildsWindow.getElementsByTagName('tr');
		if (rows.length==1) { //no wilds
			this.DoUnsafeWindow("Modal.hideModal();");
			return;
		}
		var commands = new Array();
		for (i=0;i<rows.length;i++) {
			var abandonButton=rows[i].getElementsByTagName('a')[0];
			if (abandonButton==undefined) {
				continue;
			}
			var command=abandonButton.getAttribute('onclick');
			command=command.substring(0,command.length-13);
			if(command.indexOf("wilderness_abandon")>-1){
				var tmp_obj = new Object;
				tmp_obj.command = command;
				tmp_obj.clicked = false;
				commands.push(tmp_obj);
			}
		}
		var command_timer=0;
		var milliseconds_between=4000;
		for (var i=0;i<commands.length;i++) {
			window.setTimeout(function() {
				// Determine next unclicked button
				var unclicked_commandObj = undefined;
				for (var j=0;j<commands.length;j++) {
					if(!commands[j].clicked){
						t.DoUnsafeWindow(commands[j].command);
						window.setTimeout(function() {
							var mainbody = ById("mainbody");
							if(mainbody){
								var okay_btn=nHtml.FindByXPath(mainbody,".//a[contains(@class,'okay')]");
								if(okay_btn){
									nHtml.Click(okay_btn);
								}
							}
						},500);
						commands[j].clicked = true;
						break;
					}
				}
			},t.GetRandTime(command_timer));
			command_timer+=milliseconds_between;
		}
		window.setTimeout(function() {
			t.DoUnsafeWindow("Modal.hideModal();");
		},t.GetRandTime(command_timer));
	},

	GetDisplayName:function(){
		var DisplayName = ById('topnavDisplayName');
		if(DisplayName){
			DisplayName = DisplayName.innerHTML;
		}else{
			DisplayName = null;
		}
		return DisplayName
	},

	HandleChatPane:function() {
		var t=this;
		
		// Determine our own name so we can ignore our own requests
		var DisplayName = t.GetDisplayName();
		
		// Process chat pane
		var AllianceChatBox=ById('mod_comm_list2');
		if(AllianceChatBox){
		
			var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			if(chatPosts){
				// Loop through each post
				for (var i = 0; i < chatPosts.snapshotLength; i++) {
					thisPost = chatPosts.snapshotItem(i);
					//t.Log(thisPost.innerHTML);
					
					// Automatically help out with alliance requests
					if(this.options.autoHelpAlliance){
						
						// Make sure that this isn't our own request
						var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
						if(postAuthor.snapshotItem(0)){
							var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
							if(postAuthorName != DisplayName){
								// Look for any alliance assist links in this current post item
								var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
								if(helpAllianceLinks){
									for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
										thisLink = helpAllianceLinks.snapshotItem(j);
										// Check to see if link has already been clicked
										var alreadyClicked = thisLink.getAttribute("clicked");
										if(!alreadyClicked){
											// Mark it as clicked
											thisLink.setAttribute('clicked', 'true');
											// Execute the onclick code
											var myregexp = /(claimAllianceChatHelp\(.*\);)/;
											var match = myregexp.exec(thisLink.getAttribute("onclick"));
											if (match != null) {
												onclickCode = match[0];
												//t.Log(onclickCode);
												// Check alliance help command history to make sure link hasn't already been processed
												if(!t.FindInCommandHistory(onclickCode, 'alliance_help')){
													t.DoUnsafeWindow(onclickCode);
													// Add the onclick code to the alliance help command history
													this.AddToCommandHistory(onclickCode, 'alliance_help');
												}else{
													//t.Log("already clicked");
												}
											}
										}else{
											//t.Log("already clicked");
										}
									}
								}else{
									//t.Log("no alliance links found in current post");
								}
							}else{
								//t.Log("current post is by yourself");
							}
						}else{
							//t.Log("unable to find post's author");
						}
					}
					
					// Hide alliance requests in chat
					if(this.options.hideAllianceHelpRequests){
						// Look for any alliance assist links in this current post item
						var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
						if(helpAllianceLinks){
							for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
								thisLink = helpAllianceLinks.snapshotItem(j);
								// Delete the post item from the DOM
								thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
							}
						}
					}
					
					// Hide alliance reports in chat
					if(this.options.hideAllianceHelpRequests){
						// Look for any alliance assist links in this current post item
						var myregexp1 = /You are # [1-5] of 5 to help/i;
						var myregexp2 = /\'s Kingdom does not need help\./i;
						var myregexp3 = /\'s project has already been completed\./i;
						var myregexp4 = /\'s project has received the maximum amount of help\./i;
						if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4)) {
							// Delete the post item from the DOM
							thisPost.parentNode.removeChild(thisPost);
						}
					}
					
				}
			}
		}
	},

	HandlePublishPopup:function() {
		var t=this;
		if (t.currentPage == "facebook_popup") {
			if(t.options.autoPublishGamePopups){
				// Check the app id (we only want to handle the popup for kingdoms of camelot)
				var FBInputForm = ById('uiserver_form');
				if(FBInputForm){
					var channel_input = nHtml.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
					if(channel_input){
						var current_channel_url = channel_input.value;
						if (current_channel_url.match(/http:\/\/.{0,100}kingdomsofcamelot\.com\/.{0,100}\/cross\.htm/i)) {
							var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'publish')]");
							var privacy_setting = nHtml.FindByXPath(FBInputForm,".//input[@type='hidden' and contains(@name, 'privacy_data') and contains(@name, 'value')]");
							if(publish_button && privacy_setting){
								// 80: Everyone
								// 50: Friends of Friends
								// 40: Friends Only
								// 10: Only Me
								privacy_setting.value = t.options.autoPublishPrivacySetting;
								nHtml.Click(publish_button);
							}
						}
					}		
				}
			}
		}
	},
	
	domainLoginTimer:null,
	domainLoginStartTime:null,
	domainLoginCurrentTime:null,
	domainLoginSeconds:30,
	domainLoginActionTaken:false,
	HandleDomainLogin:function() {
		var t=this;
		if (t.currentPage == "domain_selection" && t.options.autoLogBackIn && !t.domainLoginActionTaken) {
		
			if(!t.domainLoginStartTime){
				t.domainLoginStartTime = Math.round(new Date().getTime() / 1000);
			}
			t.domainLoginCurrentTime = Math.round(new Date().getTime() / 1000);
			var timeDifference = Math.round(t.domainLoginStartTime+t.domainLoginSeconds - t.domainLoginCurrentTime);
			if(timeDifference<0){ timeDifference=0; }
			
			var statusDiv=ById('KOCAttackLoginStatus');
			if(!statusDiv) {
				statusDiv=document.createElement('div');
				statusDiv.id='KOCAttackLoginStatus';
				statusDiv.style.position='relative';
				statusDiv.style.backgroundColor='#fff';
				statusDiv.style.border='3px solid #888';
				statusDiv.style.margin='30px 0px 0px 0px';
				statusDiv.style.padding='10px';
				statusDiv.style.display='none';
				var loginBox = ById("formoptions0");
				loginBox.appendChild(statusDiv);
			}
		
			// Find the top-most domain in the list (the most recent one)
			var playButtons=document.evaluate(".//a[contains(@class,'button20')]", unsafeWindow.document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			if(playButtons && playButtons.snapshotLength>0){
				//var firstPlayButton = playButtons.snapshotItem(0);
				//var domain_name = firstPlayButton.parentNode.parentNode.firstChild.innerHTML;
				//statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging into '+domain_name+' in '+timeDifference+' seconds...</center>';
				statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging back into KoC in '+timeDifference+' seconds...</center>';
				if(timeDifference==0){
					//t.Log("Loading URL: "+firstPlayButton.href);
					t.Log("Loading URL: http://apps.facebook.com/kingdomsofcamelot/");
					//statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging into '+domain_name+' now...</center>';
					statusDiv.innerHTML='<center>KoCAttack Extra: Automatically logging back into KoC now...</center>';
					var functionCall = {
						'action':'load_url',
						//'parameters':firstPlayButton.href
						'parameters':'http://apps.facebook.com/kingdomsofcamelot/'
					};
					t.AddCrossIframeCommand("domain_selection_app_page", functionCall);
					t.domainLoginActionTaken=true;
					// Reload current window if things are unsuccessful
					window.setTimeout(function() {
						t.ReloadWindow();
					},10000);
				}
			}else{
				statusDiv.innerHTML='<center>KoCAttack Extra: Automatically reloading page in '+timeDifference+' seconds...</center>';
				if(timeDifference==0){
					statusDiv.innerHTML='<center>KoCAttack Extra: Automatically reloading page now...</center>';
					t.ReloadWindow();
					t.domainLoginActionTaken=true;
				}
			}
			statusDiv.style.display='block';
			
			if(!t.domainLoginTimer && !t.domainLoginActionTaken) {
				t.domainLoginTimer=window.setTimeout(function() {
					t.domainLoginTimer=null;
					t.HandleDomainLogin();
				},1000);
			}		
		}
	},
	
	HandleCrossIframeCommands:function() {
		var t=this;
		var commands = t.GetCrossIframeCommands();
		if(!commands.queue) return false;
		var commandsUpdated = false;
		for(var i=0; i<commands.queue.length; i++) {
			var command = commands.queue[i];
			// Cross-iframe Command structure:
			// commands {
			//		command {
			//			'pageName' (string) - The page to execute the code on
			//			'functionCall' (string) - The function to call
			//		}
			// }
			if(t.currentPage == command.pageName){
				if(command.functionCall.action == "load_url"){
					setTimeout (function (){window.location.href=command.functionCall.parameters;}, 0); 
				}
				ArrayRemoveItem(commands.queue, i);
				commandsUpdated=true;
			}
		}
		if(commandsUpdated){
			this.SetCrossIframeCommands(commands);
		}
	},
		
	OnCastleBoxAppear:function(box) {
		var raiseGold=nHtml.FindByXPath(box,".//a[contains(@onclick,'raiseGold')]");
		var a=document.createElement('a');
		a.className='button25';
		var t=this;
		
		function SetAutoGoldA() {
			var str=t.GetAutoGold()?'Auto - On':'Auto - Off';
			a.innerHTML='<span>'+str+'</span>';
		}
		a.addEventListener('click',function() {
			var autoGold=t.GetAutoGold();
			t.SetAutoGold(autoGold?false:true);
			SetAutoGoldA();
		},false);
		SetAutoGoldA();
		raiseGold.parentNode.insertBefore(a,raiseGold.nextSibling);
		
		var productionHeader=nHtml.FindByXPath(box,".//div[contains(@class,'prodtableheader')]");
		productionHeader=productionHeader.parentNode;
		var b=document.createElement('a');
		b.className='button25';
		
		function SetAbandonWildsA() {
			var str=t.GetAbandonWilds()?'Abandon Wilds - On':'Abandon Wilds - Off';
			b.innerHTML='<span>'+str+'</span>';
		}
		b.addEventListener('click',function() {
			var abandonWilds=t.GetAbandonWilds();
			if(!abandonWilds){
				var abandonWildsConfirm = confirm("Are you sure you want to automatically abandon all wildernesses?\n")
				if (!abandonWildsConfirm){
					return false;
				}
			}
			t.SetAbandonWilds(abandonWilds?false:true);
			SetAbandonWildsA();
		},false);
		SetAbandonWildsA();
		//raiseGold.parentNode.insertBefore(b,raiseGold.nextSibling);
		productionHeader.parentNode.insertBefore(b,productionHeader);
	},

	ClickShareToWall:function(box) {
		var t=this;
		if(t.options.autoPublishGamePopups){
			var sharetowall_btn = nHtml.FindByXPath(box,".//a[contains(@onclick,'gethelp')]");
			nHtml.Click(sharetowall_btn);
		}
	},

	marketBoxTimeout:null,
	OnMarketBoxAppear:function(box) {
		var marketBox=ById('marketmain_bdy');
		var t=this;
		if(marketBox) {
			window.setTimeout(function() {
				t.OnMarketBoxAppear();
			},250);
			var amt=ById('marketmod_amount');
			if(amt && amt.value=="0") amt.value='999000';
			var price=ById('marketmod_price');
			if(price && price.value=="0") price.value='1';
		}
		
	},

	nextAutoAttackTimeout:null,
	onclickTimeRe:/,([0-9]+),[0-9]+,[0-9]+,[0-9]+[^,]*$/,
	waitForAttackBoxAppear:null,
	OnAttackBoxAppear:function(box) {
		var btnMarch=ById('btnMarch');
		var t=this;
		if(!btnMarch) { 
			this.Log('no march button');
			window.setTimeout(function() {
				t.OnAttackBoxAppear(box);
			},1000);
			return; 
		}

		this.StopWaitForAttackBoxAppear();
		if(ById('KocAttackComment')) {
			this.Log("We already have an attack dialog opened");
			return;
		}
		
		btnMarch.addEventListener('click',function(e) {
			window.setTimeout(function() {
				t.SetAttackFromGui(box);
				t.SetValuesCache();
				// we want to keep the scroll bar at the same position, don't redraw
				//~~~ mmm... need to wait for attack to finish before the numbers will update.
				t.DrawClosestFarms();
			},0);
		},false);
		
		var comment=document.createElement('input');
		comment.id='KocAttackComment';
		comment.size='30';

		var nowSecs=new Date().getTime()/1000;

		var div=document.createElement('div');
		AddText(div,'Comment:');
		div.appendChild(comment);
		div.appendChild(document.createElement('br'));

		var div2=document.createElement('div');
		var ignore=document.createElement('input');
		ignore.type='checkbox';
		div2.appendChild(ignore);
		AddText(div2,'Ignore in the attack list');
		var nextElement=ById('marchTypeDesc');
		//nextElement.parentNode.insertBefore(div2, nextElement.nextSibling);
		//div.appendChild(document.createElement('br'));
		div.appendChild (div2);
		
		var xy=this.GetGuiCoords();
		var attack=null;
		if(xy) {
			attack=this.GetAttack(xy[0],xy[1]);
		}
		var notFullTroops=false;
		var notFullResources=false;

		var knightSelect=ById('modal_attack_knight')
		var totalTroops=0;
		var totalResources=0;
		 var attackTypeSelected = getAttackTypeSelected ();
		if(attack) {
			ignore.checked=attack.ignore?true:false;
			if(attack.time) {
				AddHtml(div,'Last attack: '+SecsToStr(nowSecs-attack.time)+' ago<br />');
			}
			if(attack.comment){
				comment.value=attack.comment;
			}
			
			// only fill things in if we're in attack mode.
			if(attackTypeSelected==0 && attack.type==0) { // if 'attack' mode
				if(this.prevAttack) { this.Log('Previous attack:'+this.prevAttack.x+'=='+xy[0] +','+this.prevAttack.y+'=='+xy[1] ); }
				var firstAttack = this.IsFirstAttackAtLocation(xy[0], xy[1]);
				this.Log("current attack wave type: "+attack.currenttattackwavetype);
				if(attack.suicidewave && attack.currenttattackwavetype=="suicide" && firstAttack) {
					// anti traps suicide wave attack
					if(typeof(attack.suicidewave)=="object") {
						for(var i=1; i<attack.suicidewave.length; i++) {
							this.SetTroopInput(i,attack.suicidewave[i]);
							totalTroops+=attack.suicidewave[i];
						}
					} else {
						this.SetTroopInput(2,attack.suicidewave);
						totalTroops+=attack.suicidewave;
					}
				} else if(attack.troops) {
					for(var tr=0; tr<attack.troops.length; tr++) {
						var troopCount=attack.troops[tr];
						if(!troopCount) continue;
						totalTroops+=troopCount;

						if(this.SetTroopInput(tr,troopCount)=='notfull') {
							notFullTroops=true;
						}
					}
				}

				//attackTypeSelect.selectedIndex=attack.type;
				knightSelect.selectedIndex=1+Math.floor(Math.random()*(knightSelect.options.length-1));
			} else if (attackTypeSelected==1 && attack.type==1) { // else if transport
				var resourceTypes = new Array(
					'gold',
					'rec1',
					'rec2',
					'rec3',
					'rec4'
				);
				for(var tr=0; tr<attack.troops.length; tr++) {
					var troopCount=attack.troops[tr];
					if(!troopCount) continue;
					totalTroops+=troopCount;

					if(this.SetTroopInput(tr,troopCount)=='notfull') {
						notFullTroops=true;
					}
				}

				for(var res=0; res<attack.resources.length; res++) {
					var resourceCount=attack.resources[res];
					if(!resourceCount) continue;
					totalResources+=resourceCount;

					if(this.SetResourceInput(resourceTypes[res],resourceCount)=='notfull') {
						notFullResources=true;
					}
				}
				// We don't send a knight with transports
			}
			
			if(attack.messages) {
				div.appendChild(document.createElement('br'));
				for(var m=attack.messages.length-1; m>=0; m--) {
					var message=attack.messages[m];
					var ma=document.createElement('a');
					var mess=message[0];
					var timeNumM=this.onclickTimeRe.exec(message[1]);
					if(timeNumM) {
						var secs=nowSecs-parseInt(timeNumM[1]);
						mess=SecsToStr(secs)+' ago, '+mess;
						//mess=(new Date(parseFloat(timeNumM[1])*1000).toLocalString())+', '+mess;
					}
					ma.innerHTML=mess;
				
	//{"time":1273315720.514,"troops":"test","type":0,"messages":[["Attack (326,97)  - Barbarian Camp Lv. 2 (NewCity4216)","modal_messages_viewreports_view(\"529747\",1,51,2,0,\"Enemy\",\"0\",\"niknah\",\"M\",4,326,97,1273312617,1,333,110);return false;"],["Attack (326,97)  - Barbarian Camp Lv. 2 (NewCity4216)","modal_messages_viewreports_view(\"529747\",1,51,2,0,\"Enemy\",\"0\",\"niknah\",\"M\",4,326,97,1273312617,0,333,110);return false;"]]}
				
					ma.setAttribute('onclick',"var m=CreateMsgDiv(); "+ message[1]+'');
					ma.href='javascript:;';
					div.appendChild(ma);
					div.appendChild(document.createElement('br'));
				}
				div.appendChild(document.createElement('br'));
			}
			var deleteBtn=document.createElement('a');
			deleteBtn.className='button25';
			deleteBtn.innerHTML='<span>Delete Attack</span>';
			deleteBtn.addEventListener('click',function() {
				t.DeleteAttack(xy[0],xy[1]);
				t.DoUnsafeWindow('Modal.hideModalAll();');
				t.DrawClosestFarms();
			},false);
		
			div.insertBefore (deleteBtn, div.firstChild);
		} 
		
		var ChangeAttack=function() {
			var xy=t.GetGuiCoords();
			var attack=null;
			if(xy) {
				attack=t.GetAttack(xy[0],xy[1]);
			}
			if(!attack) attack={};
			if(getAttackTypeSelected()!=attack.type) {
				t.Log('We wont change an attack if the type is different. You must delete the attack to change the type');
				return;
			}
			
			attack.comment=comment.value;
			attack.ignore=ignore.checked?true:undefined;
			t.SetAttack(xy[0],xy[1],attack);
		}
		comment.addEventListener('change',function() { ChangeAttack(); },false);
		ignore.addEventListener('change',function() { ChangeAttack(); },false);
		
		var divContainer = document.createElement ('div');
		divContainer.style.padding = '0px 12px';
		divContainer.style.height = '320px';
		divContainer.style.maxHeight = '320px';
		divContainer.style.overflowY = 'auto';
		divContainer.appendChild(this.HideAttackEfforts());	
		divContainer.appendChild(div);	
		divContainer.appendChild(this.BulkAddAttackLink(box));
		document.getElementById ('modal_attack').appendChild(divContainer);
		
		this.AttachXYPaste('modal_attack_target_coords_x','modal_attack_target_coords_y');
		
		var autoAttack=this.GetAutoAttack();
		if(autoAttack && autoAttack.x==xy[0] && autoAttack.y==xy[1] && !ignore.checked) {

			autoAttack.x=autoAttack.y=-1;
			this.SetAutoAttack(autoAttack);

			if(totalTroops>0 
			&& knightSelect.options.length>1
			&& !notFullTroops
			&& !notFullResources


			&& btnMarch.style.opacity!=0.5
			) {
				this.Log('Auto attack:'+xy[0]+','+xy[1]+', from city:'+this.autoAttackCityUpto);
				var t=this;
				window.setTimeout(function() {
					t.autoAttacksThisCity++;
					nHtml.Click(btnMarch);
					//t.ResetIdStatus();
					
					window.setTimeout(function() {
							var mist=nHtml.FindByXPath(document,".//div[@class='mistwarn']");
							if(mist) {
								t.DoUnsafeWindow("Modal.hideModal();");
								t.DoUnsafeWindow("modal_attack_do();");
							}
					},t.GetRandTime(200));
				
				},t.GetRandTime(1000));

				if(!this.nextAutoAttackTimeout) {
					this.nextAutoAttackTimeout=setTimeout(function() {
						// let's attack again in a few secs.
						t.nextAutoAttackTimeout=null;
						t.NextAutoAttack();
						
					},t.GetRandTime(1000*this.options.attackDelay));
				} else {
					this.Log('Cannot continue auto attacking, about to attack or change city');
				}
				return;
			} else {
				this.Log('auto attack, not enough troops/knights: '+xy[0]+','+xy[1]+
					", knights avail:"+(knightSelect.options.length-1)+", Not enough troops/resources:"+notFullTroops+'/'+notFullResources+', needed:'+totalTroops+'/'+totalResources);
				this.DoUnsafeWindow("Modal.hideModal();");
				this.NextAutoAttackCity();
			}
		}
	},

	coordsRe:/\(([0-9]+),([0-9]+)\)/,
	maptileRe:/modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/,

	OnToolTipAppear:function(box) {
		var box1=box.childNodes[0].childNodes[0];
		var m=this.coordsRe.exec(box.innerHTML);
		if(!m || m.length==0) return;

		var x=m[1]; var y=m[2];

		var a=ById('l_'+x+'_t_'+y);
		if(a) {
			var onclick=a.getAttribute('onclick');
			if(onclick) {
				var titleM=this.maptileRe.exec(onclick);
				if(titleM && titleM[8].indexOf('null')<0) {
					AddHtml(box1,'Title: '+titleM[8].StripQuotes()+'<br />');
				}
			}
		}
		
		var attack=this.GetAttack(x,y);
		if(!attack) return;
		var troops=attack.troops;
		if(troops && troops.length>0) {
			var lastAttack=parseInt(attack.time);
			var nowSecs=new Date().getTime()/1000;
			var lastAttackStr='Last attack: '+SecsToStr(nowSecs-lastAttack)+' ago'+(attack.ignore?' <b>(ignore)</b> ':'');
			AddHtml(box1,lastAttackStr+'<br />');
			if(attack.comment) {
				AddHtml(box1,attack.comment+'<br />');
			}
		}
	},


	/*
	// don't know why but messages get duped sometimes.
	FixMessages:function(attack) {
		var fixed=0;
		var done={};
		for(var m=0; m<attack.messages.length; m++) {
			if(!done[attack.messages[m][1]]) {
				done[attack.messages[m][1]]=true;
	GM_log('ffff:'+attack.messages[m][1]+'####'+typeof(attack.messages[m][1]));
			} else {
				attack.messages.splice(m,1);
				fixed++;
			}
		}
		return fixed;
	},
	*/

	CalcXYDist:function(a,b) {
		var xdist=parseInt(a.x)-parseInt(b.x);
		xdist=Math.abs(xdist);
		if(xdist>=375) xdist=750-xdist;
		var ydist=parseInt(a.y)-parseInt(b.y);
		ydist=Math.abs(ydist);
		if(ydist>=375) ydist=750-ydist;
		return Math.sqrt((xdist*xdist)+(ydist*ydist));
	},

	//attackRe:/\s+(\S+)\s+Lv\.\s*([0-9]+)/,
	squareTypeNums:{
	'51':'Camp',
	'10':'Grassland',
	'11':'Lake',
	'20':'Forest',
	'30':'Hills',
	'40':'Mountains',
	'50':'Plain',
	'0':'Bog'
	},
	FindLevelFromMessages:function(attack) {
		if(!attack || !attack.messages) return null;
		for(var a=0; a<attack.messages.length; a++) {
			var m=this.onclickReportRe.exec(attack.messages[a][1]);
			if(!m) {
				this.Log("Unable to find location level/type information in cached reports!");
				continue;
			}
			var typeNum=m[3].replace('"','');
			var type=this.squareTypeNums[typeNum];
			if(!type) {
				this.Log("Unable to find location type information in cached reports!");
				continue;
			}
			if(typeNum=="51" && m[5]!='0') {
				type='';
			}
			//this.Log("Target Type: "+type+", Target Level: "+m[4]);
			return {'type':type,'level':m[4]};
		}
		return null;
	},

	DrawLevelIcons:function() {
		var mapwindow=ById('mapwindow');
		if(!mapwindow) return;
		var levelIcons=ById('LevelIcons');
		if(levelIcons) return;

		var ss=document.evaluate(".//a[contains(@class,'slot')]",mapwindow,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var lvRe=/_([0-9]+)/;
		var idDone=false;
		for(var s=0; s<ss.snapshotLength; s++) {
			var a=ss.snapshotItem(s);
			var onclick=a.getAttribute('onclick');
			var owner='';
			if(onclick) {
				var onclickM=this.maptileRe.exec(onclick);
				if(onclickM && onclickM[6]!='"null"' && onclickM[12]!='"city"') {
					var might=onclickM[7].StripQuotes();
					//var alliance=onclickM[9].StripQuotes();
					//+"<br />"+(alliance=="null"?"":alliance);
					owner=" "+onclickM[6].StripQuotes()+'<br />Might:'+might;
				}
			}
			var m=lvRe.exec(a.className);
			if(!m) continue;
			var sp=a.getElementsByTagName('span');
			if(sp.length==0) continue;

			if(!idDone) { a.id='levelIcons'; idDone=true; }
			sp[0].style.color='#cc0';
			//sp[0].innerHTML='<center>'+m[1]+'</center>';
			sp[0].innerHTML='&nbsp;'+m[1]+owner;
		}

	},

	AttachXYPaste:function(xId,yId,func) {
		var x=ById(xId);
		if(!x) {
			this.Log('Cannot find x coord box: '+xId);
			return;
		}
		var attached=x.getAttribute('KOCpasteAttached');
		if(attached) return;
		x.setAttribute('maxlength','20');
		
		var onchange=function() {
			var xValue=x.value.trim();
			var xI=/^\s*([0-9]+)[\s,]+([0-9]+)/.exec(xValue); 		
			if(xI) {
				var y=ById(yId);
				x.value=xI[1]
				y.value=xI[2]

				if(func!=undefined) func(xI[0],xI[1]);
			}
		}
		x.setAttribute('KOCpasteAttached',true);
		x.addEventListener('keyup',function() { onchange(); },false);
		x.addEventListener('change',function() { onchange(); },false);
	},


	GetClosestAttacks:function(x,y) {
		var attacks=[];
		var t=this;
		this.IterateAttacks(function(name,value) {
			var nameI=name.split('_');
			if(nameI.length<3) return;
			var xy=nameI[2].split(',');
			if(value=="") return;
			var attack=JSON2.parse(value);
			if(!attack) return;
			if(attack.ignore) return;
			
			var dist=t.CalcXYDist({'x':xy[0],'y':xy[1]},{'x':x,'y':y});
			if (dist==0) { return; } // Don't attack yourself
			if(dist>=t.options.attackMaxDistance) { return; }
			attacks.push({'dist':dist,'x':xy[0],'y':xy[1],'a':attack});
		});
		attacks.sort(function(a,b) {
			return a.dist-b.dist;
		});
		return attacks;
	},

	IsEnoughTroops:function(currentTroops,neededTroops) {
		for(var t=0; t<neededTroops.length; t++) {
			if(!neededTroops[t]) continue;
			if(parseInt(neededTroops[t])>parseInt(currentTroops[t])) {
				return false;
			}
		}
		return true;
	},

	IsEnoughResources:function(currentResources,neededResources) {
		for(var t=0; t<neededResources.length; t++) {
			if(!neededResources[t]) continue;
			if(parseInt(neededResources[t])>parseInt(currentResources[t])) {
				return false;
			}
		}
		return true;
	},

	currentMarchesNum:0,
	DetermineCurrentMarchesNum:function() {
		var marchesnum = 0;
		var troopactivity = ById("untqueue_list");
		if(troopactivity && troopactivity.style.display!="none" && troopactivity.style.visibility!="hidden"){
			marchesnum = troopactivity.childNodes.length;
		}
		//this.Log("Current number of marches in this city: "+marchesnum);
		this.currentMarchesNum = marchesnum;
		return marchesnum;
	},

	currentRallyPointLevel:0,
	DetermineCurrentRallyPointLevel:function() {
		var rallypointlevel = 0;
		var citymap = ById("citymap");
		if(citymap){
			var citylinks = nHtml.FindByXPath(citymap,'.//a[contains(@class, "bldg")]', XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
			for (var i = 0; i < citylinks.snapshotLength; i++){
				var building = citylinks.snapshotItem(i);
				var style = window.getComputedStyle(building, false);
				var css_bgimg = style.backgroundImage;
				//this.Log("building background image "+i+": "+css_bgimg);
				var myregexp = /rally_point_lvl/i;
				var match = myregexp.exec(css_bgimg);
				if (match != null) {
					// Determine the rally point level based on the level tag overlay
					var leveltag = nHtml.FindByXPath(building,'.//span[contains(@class, "level")]');
					if(!leveltag){ continue; }
					var levelnum = parseInt(leveltag.innerHTML);
					if(levelnum>rallypointlevel){
						rallypointlevel = levelnum;
					}
				}
			}
			if(rallypointlevel==0){
				// Couldn't find the rally point based on the background image. Odds are that the rally point exists,
				// but is currently under construction. Let's see if we can deduce the rally point's level based on this assumption.
				// Note: This will bug out if the city has literally no rally point at all, but who's really that stupid?
				for (var i = 0; i < citylinks.snapshotLength; i++){
					var building = citylinks.snapshotItem(i);
					var style = window.getComputedStyle(building, false);
					var css_bgimg = style.backgroundImage;
					//this.Log("building background image "+i+": "+css_bgimg);
					var myregexp = /construction/i;
					var match = myregexp.exec(css_bgimg);
					if (match != null) {
						// Determine the rally point level based on the level tag overlay
						var leveltag = nHtml.FindByXPath(building,'.//span[contains(@class, "level")]');
						if(!leveltag){ continue; }
						var levelnum = parseInt(leveltag.innerHTML);
						if(levelnum>rallypointlevel){
							rallypointlevel = levelnum-1;
						}
					}
				}
			}
			//this.Log("Rally point level in this city is: "+rallypointlevel);
		}
		this.currentRallyPointLevel = rallypointlevel;
		return rallypointlevel;
	},

	GetLevelInfo:function(attack) {
		if(!attack) throw('GetLevelInfo: attack is null');
		var levelI=attack.levelInfo;
		//if((!levelI || levelI.level==0) && attack.messages && attack.messages.length>0) {
		if((!levelI || levelI.level==0) && attack.messages && attack.messages.length>0) {
			levelI=this.FindLevelFromMessages(attack);
		}
		return levelI;
	},

	GetAttackDelay:function(attack) {
		if(!attack) throw('GetAttackDelay: attack is null');
		var attackDelay = 0;
		var wilderness={
			'Lake':1,
			'Mountains':1,
			'Woods':1,
			'Forest':1,
			'Plain':1,
			'Hills':1,
			'Grassland':1,
			'Wilderness':1 // Unknown wilderness type
		};
		var levelInfo=this.GetLevelInfo(attack);
		if(!levelInfo) {
			this.Log("Unable to calculate attack delay: Missing level info for coordinates ("+attack.x+","+attack.y+"). Assuming delay of 0.");
		}else{
			if(levelInfo.type=='Camp') {
				// Camp
				attackDelay = this.options.attackSecsSinceLastCamp;
			} else if(wilderness[levelInfo.type]) {
				// Wilderness
				attackDelay = this.options.attackSecsSinceLastWild;
			} else if (levelInfo.type!='Camp' && !wilderness[levelInfo.type]) {
				var tempAttack=this.GetAttack(attack.x,attack.y);
				if(tempAttack.type==0) {
					// City
					attackDelay = this.options.attackSecsSinceLastCity;
				} else if(tempAttack.type==1) {
					// Transport
					attackDelay = this.options.attackSecsSinceLastTransport;
				}else{
					this.Log("Unknown attack type for ("+attack.x+","+attack.y+"). Assuming delay of 0.");
				}
			}else{
				this.Log("Unknown attack type for ("+attack.x+","+attack.y+"). Assuming delay of 0.");
			}
		}
		return attackDelay;
	},

	FindBiggestCampAttack:function(attacks,currentTroops,currentResources) {
		var bestAttack=null;
		var bestAttackSize=0;
		var bestAttackDist=10000;
		var nowSecs=new Date().getTime()/1000;
		var currentCity = this.GetCurrentCityId();
		// Determine the current rally point level and current marches
		this.DetermineCurrentRallyPointLevel();
		this.DetermineCurrentMarchesNum();
		this.Log("Current Rally Point Level: "+this.currentRallyPointLevel+" Current Marches: "+this.currentMarchesNum);

		var wilderness={
			'Lake':1,
			'Mountains':1,
			'Woods':1,
			'Forest':1,
			'Plain':1,
			'Hills':1,
			'Grassland':1,
			'Wilderness':1 // Unknown wilderness type
		};
		for(var a=0; a<attacks.length; a++) {
			var attack=attacks[a];
			//this.Log("Inspecting attack #"+a+": "+inspect(attack,10));
			var levelInfo=this.GetLevelInfo(attack.a);
			if(!levelInfo) {
				this.Log("Not attacking: Missing level info! for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			
			if(levelInfo.type=='Camp') {
				if(this.options.attackTypeCamp!=true) {
					this.Log("Not attacking: Not attacking camps! for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			} else if(wilderness[levelInfo.type]) {
				if(this.options.attackTypeWild!=true) {
					this.Log("Not attacking: Not attacking wildernesses! for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			} else if (levelInfo.type!='Camp' && !wilderness[levelInfo.type]) {
				var tempAttack=this.GetAttack(attack.x,attack.y);
				if(tempAttack.type==0) {
					if(this.options.attackTypeCity!=true) {
						this.Log("Not attacking: Not attacking cities for coordinates ("+attack.x+","+attack.y+")");
						continue;
					}
				} else if(tempAttack.type==1) {
					if(this.options.attackTypeTransport!=true) {
						this.Log("Not attacking: Not sending transports for coordinates ("+attack.x+","+attack.y+")");
						continue;
					}
				}
			} else {
				if(levelInfo.type!='' && levelInfo.type!='Camp') {
					this.Log("Not attacking: Unknown attack type for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			}

			if(!attack.a.troops) {
				this.Log("inspect1: "+inspect(attack.a),10);
				this.Log("Not attacking: No troops defined for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			if(attack.a.ignore) {
				this.Log("Not attacking: Location ignored for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			if(attack.dist>=this.options.attackMaxDistance) {
				this.Log("Not attacking: Distance too far for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			if(this.options.lockAttackFromCity) {
				//this.Log('fromCity='+attack.a.fromCity+', currentCity='+this.GetCurrentCityId());
				if(attack.a.fromCity!=undefined) {
					if(currentCity!=attack.a.fromCity) { continue; }
				}
			}
			
			var troops_to_send = attack.a.troops;
			if(attack.a.suicidewave){
				// count up all the troops in *both* attack waves.
				// we don't want to launch suicide wave if we can't follow it up.
				var suicide_troops = attack.a.suicidewave;
				for(var t=0; t<suicide_troops.length; t++) {
					if(!suicide_troops[t]) continue;
					troops_to_send[t] = troops_to_send[t] + suicide_troops[t];
				}
			}

			//if(!this.currentMarchesNum || this.currentMarchesNum==undefined) {
			//	this.Log("Not attacking: Unable to determine current number of marches (refresh your window?) for coordinates ("+attack.x+","+attack.y+")");
			//	continue;
			//}
			
			// Make sure we have more than two available slots in attack queue if this is a suicide wave (unless there are only two slots even allowed)
			var available_marches_num = this.currentRallyPointLevel - this.currentMarchesNum;
			//this.Log("Available marches: "+available_marches_num);
			if(attack.a.suicidewave && attack.a.currenttattackwavetype != "normal"){
				//this.Log("Current attack wave type: "+attack.a.currenttattackwavetype);
				if(available_marches_num < 2 || this.currentRallyPointLevel < 2){
					// Make sure this is the first wave of the multi-wave attack and then don't send it if there aren't enough marching slots for both waves
					if(this.prevAttack.x != attack.x && this.prevAttack.y != attack.y) {
						// This is the first wave
						this.Log("Not attacking: Not enough available marching slots at rally point to launch both suicide wave and second wave for coordinates ("+attack.x+","+attack.y+")");
						break;
					}
				}
			}
			
			// Make sure we have at least one available slot in attack queue for normal attack
			if(available_marches_num<1){
				this.Log("Not attacking: Not enough marching slots at rally point to launch attack for coordinates ("+attack.x+","+attack.y+")");
				break;
			}
			
			if(!this.IsEnoughTroops(currentTroops,troops_to_send)) {
				this.Log("Not attacking: Not enough troops for coordinates ("+attack.x+","+attack.y+")");
				continue;
			}
			if (attack.a.type==1) {
				if(!this.IsEnoughResources(currentResources,attack.a.resources)) {
					this.Log("Not attacking: Not enough resources for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			}
			var lastAttack;
			if(!attack.a.time) {
				lastAttack=60*60*24*31;
			} else {
				lastAttack=nowSecs-parseInt(attack.a.time);
			}
		
			if(levelInfo.type=='') {
				if(attack.a.type==0) {
					if(lastAttack<this.options.attackSecsSinceLastCity) {
						this.Log("Not attacking: last attack ("+lastAttack+") < this.options.attackSecsSinceLastCity ("+this.options.attackSecsSinceLastCity+") for coordinates ("+attack.x+","+attack.y+")");
						continue;
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

					}
				} else {
					if(lastAttack<this.options.attackSecsSinceLastTransport){
						this.Log("Not attacking: last attack ("+lastAttack+") < this.options.attackSecsSinceLastTransport ("+this.options.attackSecsSinceLastTransport+") for coordinates ("+attack.x+","+attack.y+")");
						continue;
					}
				}
			} else if(levelInfo.type.toUpperCase()=='C') {
				if(lastAttack<this.options.attackSecsSinceLastCamp) {
					this.Log("Not attacking: last attack ("+lastAttack+") < this.options.attackSecsSinceLastCamp ("+this.options.attackSecsSinceLastCamp+") for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			} else  {
				if(lastAttack<this.options.attackSecsSinceLastWild) {
					this.Log("Not attacking: last attack ("+lastAttack+") < this.options.attackSecsSinceLastWild ("+this.options.attackSecsSinceLastWild+") for coordinates ("+attack.x+","+attack.y+")");
					continue;
				}
			}
			var armySize=0;
			for(var t=0; t<attack.a.troops.length; t++) {
				if(!attack.a.troops[t]) {
					continue;
				}
				armySize+=parseInt(attack.a.troops[t]);
			}
			if(attack.a.suicidewave) {
				var suicideArmySize=0;
				for(var t=0; t<attack.a.suicidewave.length; t++) {
					if(!attack.a.suicidewave[t]) {
						continue;
					}
					suicideArmySize+=parseInt(attack.a.suicidewave[t]);
				}
				if(suicideArmySize<=0) {
					this.Log('Invalid suicide wave army size (not enough!) for coordinates ('+attack.x+','+attack.y+')');
					continue;
				}
			}
			if(armySize<=0) {
				this.Log('Invalid suicide wave army size (not enough!)for coordinates ('+attack.x+','+attack.y+')');
				continue;
			}	
			

			var ok=0;
			if(this.options.attackOrder=='mostTroops') {
				if(bestAttackSize<armySize) {
					ok=1;
				}
			} else {
				if(this.options.attackOrder!='closest') {
					this.Log('Unknown order:'+this.options.attackOrder);
				}
				if(bestAttackDist>attack.dist) {  
					ok=1;  
					bestAttackDist=attack.dist; 
				}
			}
			if(ok) {
				bestAttack=attack;
				bestAttack.type=attack.a.type;
				bestAttackSize=armySize;
			}
		}
		return bestAttack;
	},

	IsMapperRunning:function() {
		if(ById('SendMap')) {
			//GM_log('mapper is running, do not auto attack');
			return true;
		}
		return false;
	},
	GetAutoAttack:function() {
		var aStr=this.GetValue('AutoAttack','');
		//var aStr=GM_getValue('AutoAttack_'+this.GetServerId(),'');
		if(aStr=='') {
			return null;
		}
		try {
			return JSON2.parse(aStr);
		} catch(e) {
			GM_log('failed to parse autoattack:'+aStr);
			return null;
		}
	},
	SetAutoAttack:function(s) {
		if(s==null) {
			this.SetValue('AutoAttack','');
			//GM_setValue('AutoAttack_'+this.GetServerId(),'');
			return;
		} 
		this.SetValue('AutoAttack',JSON2.stringify(s));
		//GM_setValue('AutoAttack_'+this.GetServerId(),JSON.stringify(s));
	},
	ResetAutoAttackTarget:function() {
		var autoAttack=this.GetAutoAttack();
		if(autoAttack) {
			autoAttack.x=autoAttack.y=undefined;
			this.SetAutoAttack(autoAttack);
		}
	},

	GetCurrentMapCoord:function() {
		var xcoord=ById('mapXCoor');
		var ycoord=ById('mapYCoor');
		return {'x':xcoord.value,'y':ycoord.value};
	},

	hrsInput:null,
	viewTypeOnly:"",
	expandedInfo:false,
	DrawClosestFarms:function() {
		this.SetAttackStatusMessage();
		var t=this;

		//unsafeWindow.statusupdate();
		var bookmark=ById('maparea_map');
		if(!bookmark) throw("Cannot find bookmark box");
		bookmark=nHtml.FindByXPath(bookmark.parentNode,".//div[@class='coords']");

		var div=ById('ClosestFarms');
		if(!div) {
			div=document.createElement('div');
			var titleA=document.createElement('a');
			titleA.innerHTML='Attacks ';
			titleA.title='Closest attacks, more than ? hrs since last attack';
			titleA.style.cursor='pointer';
			titleA.addEventListener('click',function() {
				div.style.display=div.style.display=='block'?'none':'block';
				setTimeout(function() {
					t.SetValue('ClosestFarmDisplay',div.style.display);
				},0);
			},false);
			
			var viewTypeOnlyInp=document.createElement('input');
			viewTypeOnlyInp.style.width='10px';
			viewTypeOnlyInp.style.fontSize="8px";
			viewTypeOnlyInp.title="Type of target. ex: P, W, M, P1";
			this.hrsInput=document.createElement('input');
			this.hrsInput.style.width='16px';
			this.hrsInput.value=this.GetMinHours();
			var hrsChanged=function() {
				var v=parseFloat(t.hrsInput.value);
				t.viewTypeOnly=viewTypeOnlyInp.value;
				if(v!=undefined && v!=NaN) {
					t.SetMinHours(t.hrsInput.value);
					t.DrawClosestFarms();
				}
			}
			this.hrsInput.addEventListener('change',function() {
				hrsChanged();
			},false);
			this.hrsInput.addEventListener('keyup',function() {
				hrsChanged();
			},false);
			viewTypeOnlyInp.addEventListener('keyup',function() {
				hrsChanged();
			},false);
			
			bookmark.appendChild(document.createElement('br'));
			bookmark.appendChild(titleA);
			AddText(bookmark,'>');
			bookmark.appendChild(this.hrsInput);
			AddText(bookmark,'hrs ');
			
			var expandA=document.createElement('a');
			expandA.innerHTML='E';
			expandA.title='Expand information';
			expandA.addEventListener('click',function() {
				t.expandedInfo=t.expandedInfo?false:true;
				t.DrawClosestFarms();
			},false);

			bookmark.appendChild(viewTypeOnlyInp);
			bookmark.appendChild(expandA);
			bookmark.appendChild(document.createElement('br'));
		}
		div.innerHTML='';
		div.id='ClosestFarms';
		div.style.overflow='scroll';
		div.style.height='200px';
		div.style.display=this.GetValue('ClosestFarmDisplay','block');

		var currentTroops=this.GetArmySize();
		var currentResources=this.GetResourcesSize();

		var mapCoord=this.GetCurrentMapCoord();
		var nowSecs=new Date().getTime()/1000;
		var attacks=this.GetClosestAttacks(mapCoord.x,mapCoord.y);
		//var bestAttack=this.FindBiggestCampAttack(attacks,currentTroops,currentResources);
		var GoClosestFarm=function(e) {
			var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
			t.DoUnsafeWindow("setBookmarkCoord("+xy[0]+","+xy[1]+");");
		};
		var AttackClosestFarm=function(e) {
			var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
			var attack=t.GetAttack(xy[0],xy[1]);
			if(!attack) throw("Cannot find:"+xy[0]+','+xy[1]);
			if(attack.type==0) {
				t.DoUnsafeWindow("modal_attack(4,"+xy[0]+","+xy[1]+");");
			} else if(attack.type==1) {
				t.DoUnsafeWindow("modal_attack(1,"+xy[0]+","+xy[1]+");");
			}
		};
		var IgnoreFarm=function(e) {
			var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
			var attack=t.GetAttack(xy[0],xy[1]);
			if(!attack) throw("Cannot find:"+xy[0]+','+xy[1]);
			attack.ignore=true;
			t.SetAttack(xy[0],xy[1],attack);
			setTimeout(function() {
				t.DrawClosestFarms();
			},0);
			
		};
		var DeleteFarm=function(e) {
			var xy=e.target.parentNode.parentNode.getAttribute('xy').split(',');
			t.DeleteAttack(xy[0],xy[1]);
			setTimeout(function() {
				t.DrawClosestFarms();
			},0);
		};
		
		var aDone=0;
		var table=document.createElement('table');
		table.className='';
		var minHrsSinceAttack=parseFloat(this.hrsInput.value);

		var viewType=this.viewTypeOnly.trim().toUpperCase();

		for(var aUpto=0; aUpto<attacks.length; aUpto++) {
			var attackI=attacks[aUpto];
			try {
				//attackI.a.levelInfo=this.FindLevelFromMessages(attackI.a);
				//this.SetAttack(attackI.x,attackI.y,attackI.a);
				
				if(!attackI.a.time) {
					lastAttack=60*60*24*31;
				} else {
					lastAttack=nowSecs-parseInt(attackI.a.time);
				}
				//if(lastAttack<(60*60*minHrsSinceAttack)) continue;

				var levelI=this.GetLevelInfo(attackI.a);
				var m=( (levelI!=null && levelI.type) ?(levelI.type.charAt(0)+levelI.level):'');
				//this.Log("Location Type: "+m);
				if(this.viewTypeOnly!="") {
					if(this.viewTypeOnly==" ") {
						if(m!="") {
							continue;
						}
					} else if(viewType.length==0 || m.substring(0,viewType.length)!=viewType) {
						continue;
					}
				}

				var dist=this.CalcXYDist({'x':attackI.x,'y':attackI.y},mapCoord);
				if(dist>=this.options.attackMaxDistance) {
					break;
				}
				
				var tr=table.insertRow(-1);
				tr.setAttribute('xy',attackI.x+','+attackI.y);
				var td=tr.insertCell(-1);
				td.style.whiteSpace='nowrap';

				var a=document.createElement('a');
				a.style.fontSize='10px';
				a.innerHTML=attackI.x+','+attackI.y;
				a.addEventListener('click',function(e) { GoClosestFarm(e); },false);
				td.appendChild(a);

				AddText(td,' ');
				//td=tr.insertCell(-1);

				var attackA=document.createElement('a');
				attackA.style.fontSize='10px';
				/* ~~~ disabled: incorrect numbers due to having to wait for attack to update.
				if(bestAttack && attackI.x==bestAttack.x && attackI.y==bestAttack.y) {
					attackA.style.color='#f88';
				}
				*/
				attackA.title=(levelI!=null?(levelI.type+' '+levelI.level):'');
				if(attackI.a.comment) {
					attackA.title+=", "+attackI.a.comment;
				}
				if(attackI.a.time && !isNaN(lastAttack)) {
					// if we only scouted or transported to someone they won't have a last attack time.
					m=m+' @'+SecsToStr(lastAttack);
				}
				attackA.innerHTML=m;
				attackA.addEventListener('click',function(e) { AttackClosestFarm(e); },false);
				td.appendChild(attackA);		

				if(t.expandedInfo) {
					var troops=attackI.a.troops;
					if(troops) {
						for(var tupto=0; tupto<troops.length; tupto++) {
							var num=troops[tupto];
							if(attackI.a.suicidewave) {
								var am=attackI.a.suicidewave[tupto];
								if(am) num+=" ("+am+")";
							}
							AddText(tr.insertCell(-1),num);
						}
					}
				}
				
				var aDelete=document.createElement('a');
				aDelete.innerHTML='X';
				aDelete.title='Delete';
				aDelete.addEventListener('click',function(e) { DeleteFarm(e); },false);
				tr.insertCell(-1).appendChild(aDelete);
			
				aDone++;
			} catch(e) {
				this.Log('Error:'+e);
			}

		}

		div.appendChild(table);
		
		//bookmark.parentNode.insertBefore(div,bookmark);
		//bookmark.parentNode.appendChild(document.createElement('br'));
		bookmark.appendChild(div);

		this.AttachXYPaste('mapXCoor','mapYCoor');
	},


	// ?,1,square type, level, player id?, 
	// target player name, target gender, player name, player gender, ?, target x, target y, report id, 0, x y
	onclickReportRe:/(["0-9]+),(["0-9]+),(["0-9]+),(["0-9]+),(["0-9]+),("[^"]+"),("[^"]+"),("[^"]+"),("[^"]+"),(["0-9]+),(["0-9]+),(["0-9]+),/,
	//modal_messages_viewreports_view("897422",0,51,9,2485358,"niknah","M","niknah","M",1,333,110,1275178036,1,286,181);

	// remove the read/unread flag
	onclickReadRe:/^(.*,)([0-9]+)(,[0-9]+,[0-9]+[^,]*)$/,
	FixOnClick:function(a) {
		var m=this.onclickReadRe.exec(a);
		if(m) {
			return m[1]+"0"+m[3];
		}
		return a;
	},



	IterateArmy:function(f) {
		if(!this.GetSeed()) return;
		var armyDiv=ById('cityinfo_3');
		var units=this.GetSeed().units["city"+unsafeWindow.currentcityid];
		//var unitKeys=Object.keys(units);
		//for(var u=0; u<unitKeys; u++) {
		var uRe=/([0-9]+)$/;
		for(var u in units) {
			var m=uRe.exec(u);
			if(!m) continue;
			f.call(this,m[1],units[u]);
		}
		/*
		var ss=document.evaluate(".//div[@class='unit']",armyDiv,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			var unit=ss.snapshotItem(s);
			var amt=unit.textContent;
			f.call(s,amt);
		}
		*/
	},

	GetArmySize:function() {
		var troops=[];
		this.IterateArmy(function(s,amt) {
			troops[s]=amt;
		});
		return troops;
	},

	GetResourcesSize:function() {  
		var resources=[];  
		resources[0]=parseInt(ById('stat_gold_bar_num').innerHTML.replace(/,/g,'')); // Gold  
		resources[1]=parseInt(ById('stat_rec1_bar_num').innerHTML.replace(/,/g,'')); // Food  
		resources[2]=parseInt(ById('stat_rec2_bar_num').innerHTML.replace(/,/g,'')); // Wood  
		resources[3]=parseInt(ById('stat_rec3_bar_num').innerHTML.replace(/,/g,'')); // Stone  
		resources[4]=parseInt(ById('stat_rec4_bar_num').innerHTML.replace(/,/g,'')); // Ore  
		return resources;  
	},

	OpenViewReports:function() {
		this.Log('Open View Reports');
		this.DoUnsafeWindow("modal_messages();");
		this.DoUnsafeWindow('track_chrome_btn("messages_btn");');
		this.DoUnsafeWindow('modal_messages_viewreports();');
	},

	//autoAttackCitiesDoneMax:3,
	autoAttackCitiesDone:0,
	autoAttackCityUpto:1,
	autoAttackModalWaiting:false,
	autoAttackTimeout:null,
	autoAttacksThisCity:0,
	ClearAutoAttackTimeout:function() {
		if(this.autoAttackTimeout!=null) {
			this.Log('reload page timer killed');
			window.clearTimeout(this.autoAttackTimeout);
			this.autoAttackTimeout=null;
		}
	},
	RestartAutoAttack:function() {
		this.autoAttacksThisCity=0;
		this.autoAttackCitiesDone=0;
		this.autoAttackCityUpto=1;
		this.autoAttackModalWaiting=false;

		this.NextAutoAttack();
	},

	StartReloadPageTimer:function(secs) {
		var t=this;
		if(!secs) secs=this.options.waitAfterCitiesDone;
		var refreshMSecs=t.GetRandTime(1000*secs);
		this.Log('refreshing in '+(refreshMSecs/1000)+' secs, all cities done:'+this.autoAttackCityUpto);
		this.ClearAutoAttackTimeout();
		this.autoAttackTimeout=window.setTimeout(function() {
			if(t.autoAttackTimeout==null) return;
			t.autoAttackTimeout=null;
			if(t.IsMapperRunning() || t.IsCurrentlySendingMultipleWaves()) {
				if(t.IsMapperRunning()){
					t.Log("Waiting for mapping to finish");
				}else{
					t.Log("Waiting for multiple wave attack to finish");
				}
				// don't reload until the mapper or multi-wave attack has finished.
				window.setTimeout(function() {
					t.StartReloadPageTimer();
				},0);
				return;
			}
			t.SetValuesCache();
			//window.location.reload(true);
			t.ReloadWindow();
		},refreshMSecs);
		this.Log('reload page timer started');
	},
	
	multipleWaveTimeout:null,
	ClearMultipleWaveTimeout:function() {
		if(this.multipleWaveTimeout!=null) {
			this.Log('city switching timer killed');
			window.clearTimeout(this.multipleWaveTimeout);
			this.multipleWaveTimeout=null;
		}
	},
	StartMultipleWaveTimer:function(secs) {
		var t=this;
		if(!secs) secs=t.options.attackDelay;
		var attackDelayMSecs=t.GetRandTime(1000*secs);
		this.Log('Waiting '+(attackDelayMSecs/1000)+' secs to retry second wave attack...');
		this.ClearMultipleWaveTimeout();
		this.multipleWaveTimeout=window.setTimeout(function() {
			if(t.multipleWaveTimeout==null) return;
			t.multipleWaveTimeout=null;
			if(t.IsCurrentlySendingMultipleWaves()) {
				t.Log("Waiting for multiple wave attack to finish...");
				// don't switch cities until the multi-wave attack has finished.
				window.setTimeout(function() {
					t.StartMultipleWaveTimer();
				},0);
				return;
			}
			t.NextAutoAttackCity();
		},attackDelayMSecs);
		this.Log('Multiple wave attack timer started');
	},

	lastOpenViewReports:0,
	CheckReports:function() {
		var t=this;
		var autoAttack=this.GetAutoAttack();
		if(!autoAttack) return;
		
		// Load the reports every minute or on initial page load
		if(!this.options.noViewReports) {
			var nowSecs=new Date().getTime()/1000;
			if((this.lastOpenViewReports+(60*1))<nowSecs) {
				this.lastOpenViewReports=nowSecs;
				this.OpenViewReports();
				this.bringUpReports=true;
				if(this.options.autoRemoveReports) {
					this.autoAttackRemoveReports=true;
				}
			}
		}
	},

	ClickChangeCity:function(cityA,tries) {
		var t=this;
		nHtml.Click(cityA);
		t.nextAutoAttackWanted=window.setTimeout(function() {
			if(t.nextAutoAttackWanted!=null) {
				if(tries>4) {
					t.Log("Skip city, too many retries");
					t.NextAutoAttackCity();
					return;
				}
				t.Log("We clicked change city but the city did not change, trying again");
				// Didn't change city
				t.ClickChangeCity(cityA,tries+1);
			}
		},10000);
	},


	NextAutoAttackCity:function() {
		var t=this;
		var autoAttack=this.GetAutoAttack();
		if(!autoAttack) return;
	
		if(this.IsCurrentlySendingMultipleWaves()){
			this.Log('Cannot change city. Waiting for multiple wave attack to finish...');
			t.ClearMultipleWaveTimeout();
			t.StartMultipleWaveTimer();
			return;
		}else{
			t.ClearMultipleWaveTimeout();
		}
	
		// change to next city
		this.autoAttacksThisCity=0;

		var cityA=null;
		while(true) {
			this.autoAttackCityUpto++;
			cityA=ById('citysel_'+this.autoAttackCityUpto);
	//~~~ problem here when under attack, the city isn't marked as selected?
			if(cityA && cityA.className && cityA.className.indexOf('city_selected')>=0) {
				this.Log('Skip city, current city:'+this.autoAttackCityUpto);
				this.autoAttackCityUpto++;
				cityA=ById('citysel_'+this.autoAttackCityUpto);
			}
			break;
		}
		if(!cityA) {
			// go back to the 1st city
			//this.Log('Start from 1st city again');
			if(this.autoAttackCityUpto<=2) {
				// only one city.
			} else {
				this.autoAttackCityUpto=1;
				cityA=ById('citysel_'+this.autoAttackCityUpto);
			}
			this.autoAttackCitiesDone++;
		}

		if(!cityA || this.autoAttackCitiesDone>=this.options.autoAttackCitiesDoneMax) {
			// ran out of cities, let's refresh in a minute
			this.StartReloadPageTimer();
			return;
		} else {
			if(this.nextAutoAttackTimeout==null) {
				var secs=t.GetRandTime(1000*t.options.changeCitySecs);
				this.Log('changing city to:'+this.autoAttackCityUpto+', in '+(secs/1000)+'secs, loop:'+this.autoAttackCitiesDone);
				this.nextAutoAttackTimeout=setTimeout(function() {
					t.nextAutoAttackTimeout=null;
					t.SetValuesCache();
					t.ClickChangeCity(cityA,0);
				},secs);
			} else {
				this.Log('cannot change city, about to attack or change city');
			}
	//		this.autoAttackCityUpto++;
		}
	},


	StopWaitForAttackBoxAppear:function() {
		if(this.waitForAttackBoxAppear!=null) {
			window.clearTimeout(this.waitForAttackBoxAppear);
			this.waitForAttackBoxAppear=null;
		}
	},

	OpenAttackDialog:function(bestAttack) {
		var t=this;
		t.StopWaitForAttackBoxAppear();
		t.waitForAttackBoxAppear=window.setTimeout(function() {
			if(t.waitForAttackBoxAppear==null) return;
			t.waitForAttackBoxAppear=null;
			t.DoUnsafeWindow('Modal.hideModalAll();');
			t.DoUnsafeWindow('Modal.hideModalAll();');
			try {
				// something in the script is triggering a bug in 
				t.DoUnsafeWindow('Modal.hideCurtain();');
				t.DoUnsafeWindow('Modal.hideWindow();');
			} catch(e) {
				// ignore
			}
			//window.location.reload(true);
			t.ResetIdStatus();
			t.Log("Attack box has not appeared, let's reload the page");
			t.ReloadWindow();
			//window.setTimeout(function() {
			//	t.OpenAttackDialog(bestAttack);
			//},0);
		},15*1000);
		
		//~~~ strange things here, sometimes the attack dialog is on screen but modalid is not updated
		if(ById('modal_attack')) {
			try {
				var countOut=10;
				while(countOut-->=0) {
					t.Log('modal attck still up'+unsafeWindow.Modal.modalid);
					var maxi=0;
					for(var i=0; i<20; i++) {
						if(ById('modalBox'+i)) {
							maxi=i;
						}
					}
					t.Log('Closing: '+maxi);
					unsafeWindow.Modal.modalid=maxi;
					if(maxi>0) {
						unsafeWindow.Modal.hideCurtain();
						unsafeWindow.Modal.hideWindow();
					} else {
						break;
					}
				}
			}catch(e) {
				t.Log("Mmm..."+e);
			}
		} else {
			//t.Log('hide all: '+unsafeWindow.Modal.modalid);
			unsafeWindow.Modal.hideModalAll();
		}
		if (bestAttack.type==0) {
			unsafeWindow.modal_attack(4,bestAttack.x,bestAttack.y);
			// Toggle attack waves between suicide and normal mode
			this.ToggleCurrenttAttackWaveType(bestAttack.x,bestAttack.y);
			// Update the last attack sent time
			this.UpdateAttackLastSentTime();
		} else if (bestAttack.type==1) {
			unsafeWindow.modal_attack(1,bestAttack.x,bestAttack.y);
		}
	},

	nextAutoAttackWanted:null,
	NextAutoAttack:function() {
		if(this.nextAutoAttackWanted!=null) {
			window.clearTimeout(this.nextAutoAttackWanted);
			this.nextAutoAttackWanted=null;
		}

		var autoAttack=this.GetAutoAttack();
		
		if(!this.options.okCities[this.autoAttackCityUpto]) {
			this.Log('Skip city set in options:'+this.autoAttackCityUpto);
			this.NextAutoAttackCity();
			return;
		}
		
		
		if(!autoAttack || (autoAttack.x!=undefined && autoAttack.x!=-1)) return;
		if(this.IsMapperRunning()) {
			this.StartReloadPageTimer();
			return;
		}
		var currentTroops=this.GetArmySize();
		var currentResources=this.GetResourcesSize();
		var mapCoord=this.GetCurrentMapCoord();
		var attacks=this.GetClosestAttacks(mapCoord.x,mapCoord.y);
		//this.Log("Current attacks in system: "+inspect(attacks,10));
		var bestAttack=this.FindBiggestCampAttack(attacks,currentTroops,currentResources);
		if(bestAttack && this.autoAttacksThisCity<10) {
			// attack closest biggest barbarian/wilderness
			autoAttack.x=bestAttack.x;
			autoAttack.y=bestAttack.y;
			this.SetAutoAttack(autoAttack);
			this.autoAttackModalWaiting=true;

			var t=this;
			// *** we need to wait until the current attack box is off first.
			var waitedCount=0;
			var startAttack=function() {
				waitedCount++;
				//t.Log('waiting'+waitedCount);
				if(waitedCount>20) {
					t.Log('Force close the attack dialog');
					t.DoUnsafeWindow('Modal.hideModalAll();');
				}
				var attackBox=document.getElementById('modal_attack');
				if(!attackBox) {
					t.OpenAttackDialog(bestAttack);
					/*
					attackBox=document.getElementById('modal_attack');
					if(attackBox) {
						//*** for some reason it doesn't trigger DOMInserted sometimes for the "modal_attack" div
						if(t.waitForAttackBoxAppear) {
							t.OnAttackBoxAppear(attackBox);
						}
					}
					*/
					return;
				}
				window.setTimeout(function() {
					startAttack();
				},1000);
			}
			startAttack();
		} else {
			autoAttack.x=autoAttack.y=-1;
			this.SetAutoAttack(autoAttack);
			// no valid attacks for this city.
			this.Log("No valid targets, need to attack more targets or wait for troops to return.");
			this.NextAutoAttackCity();
		}
	},

	/////////////////////////

	RemoveEmptyReportsDivs:function() {
		var ss=document.evaluate("./div[@id='modal_msg_reports_tablediv']",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			var div=ss.snapshotItem(s);
			if(div.innerHTML=="") {
				div.parentNode.removeChild(div);
			}
		}
	},


	IterateAllianceReports:function(f) {
		return this.IterateReports('modal_alliance_reports_tablediv',0,f);
	},
	IterateMsgReports:function(f) {
		return this.IterateReports('modal_msg_reports_tablediv',1,f);
	},

	IterateReports:function(id,colStart,f) {
		this.RemoveEmptyReportsDivs();
		var msgs=ById(id);
		if(!msgs) return;
		var trs=msgs.getElementsByTagName('tr');
		for(var tUpto=0; tUpto<trs.length; tUpto++) {
			var tr=trs[tUpto];
			var a=nHtml.FindByXPath(tr,".//a[contains(@onclick,'modal_messages_viewreports') or contains(@onclick,'modal_alliance_report_view') or contains(@onclick,'viewMarchReport')]");
			if(!a) continue;
			if(tr.cells.length<(colStart+2)) continue;
			var descCol=tr.cells[colStart+1];
			var dateCol=tr.cells[colStart+0];
			var desc=descCol.textContent;
			var m=this.coordsRe.exec(desc);
			var x=null,y=null;
			if(m) {
				x=m[1]; y=m[2];
			}
			var onclick=a.getAttribute('onclick');
			if(onclick) {
				var m=this.onclickReportRe.exec(onclick);
				if(m) { x=m[11]; y=m[12]; }
			}
			
			if(!f.call(this,a,tr,desc,x,y)) break;
		}
	},



	recordingReports:false,
	replaceReturnRe:/return[^{}]*$/,
	RecordReports:function() {
		try {
			if(this.recordingReports) return;
			this.recordingReports=true;
			this.IterateMsgReports(function(a,tr,desc,x,y) {
				if(x==null || y==null) return true;
				var onclick=a.getAttribute('onclick').trim();
				if(this.IsOnclickMyselfToMyself(onclick)) {
					return true;
				}
				var attack=this.GetAttack(x,y);
				
				var saveReportAsAttack = true;
				if(!attack) {
					// Don't record reports as attacks if the attack doesn't already exist in the system
					var saveReportAsAttack = false;
				}
				
				if(!attack) { attack={}; }
				
				if(!attack.messages) attack.messages=[];
				var onclickWithoutReturn=onclick.replace(this.replaceReturnRe,'');
				a.href='javascript:'+onclickWithoutReturn;
				onclick=this.FixOnClick(onclick);
				var addedAlready=false;
				for(var m=0; m<attack.messages.length; m++) {
					if(attack.messages[m][1]==onclick) {
						addedAlready=true;
						break;
					}
				}
				
				var changed=false;
				if(!addedAlready) {
					attack.messages.push([desc,onclick]);
					//this.Log("attack messages: "+attack.messages);
					var li=this.GetLevelInfo(attack);
					if(li) attack.levelInfo=li;
					changed=true;
				}
				if(!attack.levelInfo) {
					// to fix up old scripts where this didn't work.
					attack.levelInfo=this.GetLevelInfo(attack);
					if(attack.levelInfo) changed=true;
				}
				if(changed && saveReportAsAttack) {
					this.SetAttack(x,y,attack);
				}
				return true;
			});
		} finally {
			this.recordingReports=false;
		}
	},

	IsOnclickMyselfToMyself:function(onclick) {
		if(!onclick) return false;
		var m=this.onclickReportRe.exec(onclick);
		if(m && m[6]==m[8] && m[7]==m[9]) {
			return true;
		}
		return false;
	},
	DeleteWildBarbAttacks:function() {
		var deletes=0;
		this.IterateMsgReports(function(a,tr,desc,x,y) {
			var onclick=a.getAttribute('onclick');
			if(!onclick) return false;
			onclick=onclick.trim();
			var m=this.onclickReportRe.exec(onclick);
			if(this.IsOnclickMyselfToMyself(onclick)) {
				// message to myself
			} else if(m && m[5]!='0') {
				return true;
			}
			var inps=tr.getElementsByTagName('input');
			if(inps.length>=1) {
				inps[0].checked=true;
			}
			
			deletes++;
			return true;
		});
		if(deletes>0) {
			this.DoUnsafeWindow('modal_messages_reports_chkdel();');
		}
		return deletes;
	},

	bringUpReports:false,
	AddCheckBarbarians:function() {
		//var msgBody=ById('modal_msg_reports');
		var msgBody=ById('modal_msg_reports_tablediv');
		if(!msgBody) return;
		
		var t=this;
		var closeReports=true;
		if(this.autoAttackRemoveReports) {
			var reportsRemoved=this.DeleteWildBarbAttacks();
			if(reportsRemoved==0) {
				this.autoAttackRemoveReports=false;
			} else {
				closeReports=false;
			}
		}
		if(this.bringUpReports && closeReports) {
			window.setTimeout(function() {
				t.DoUnsafeWindow('Modal.hideModalAll();');
			},t.GetRandTime(3000));
			this.bringUpReports=false;
		}
		this.ClearMessages();
		
		var a=document.createElement('a');
		var t=this;
		a.addEventListener('click',function() {
			t.DeleteWildBarbAttacks();
		},false);
		a.className='buttonDown20';
		//a.style.paddingLeft='30px';
		a.innerHTML='<span>Delete Wild/Barb/Transp</span>';
		if(msgBody.nextSibling) {
			msgBody.nextSibling.insertBefore(a,msgBody.nextSibling.childNodes[0]);
			//msgBody.nextSibling.appendChild(a);
		} else {
			msgBody.appendChild(a);
		}
	},

	HighlightAllianceReports:function() {
		var mapCoord=this.GetCurrentMapCoord();
		var cities=this.GetSeed().cities;
		this.IterateAllianceReports(function(a,tr,desc,x,y) {
			if(x==null || y==null) return true;
			var closestDist=999999;
			var closestLoc=null;
			for(var c=0; c<cities.length; c++) {
				var city=cities[c];
				var cityLoc={'x':city[2],'y':city[3]};
				var dist=this.CalcXYDist({'x':x,'y':y},cityLoc);
				if(dist<closestDist) { closestDist=dist; closestLoc=cityLoc; }
			}
			var onclick=a.getAttribute('onclick');
			var m=this.onclickReportRe.exec(onclick);
			if(m && m[5]=='0') {
				tr.cells[1].style.color='#888';
			}
			if(closestLoc!=null) {
				var td=tr.insertCell(-1);
				td.style.textAlign='right';
				var loctd=tr.insertCell(-1);
				AddText(loctd,closestLoc.x+','+closestLoc.y);
				AddText(td,Math.floor(closestDist) );
			}
			return true;
		});
	},



	IterateAttacks:function(f) {
		if(this.isChrome) {
			return;
		}
		
		var names=this.browser_listValues();
		var attackPrefix='attack_'+this.GetServerId()+'_';
		for(var n=0; n<names.length; n++) {
			var name=names[n];
			if(name.substring(0,attackPrefix.length)!=attackPrefix) continue;
			f(name,this.browser_getValue(name));
		}
	},

	prevClearMessages:0,
	ClearMessages:function() {
		var nowSecs=new Date().getTime()/1000;
		if((this.prevClearMessages+(10*60)) > nowSecs) {
			return;
		}
		this.prevClearMessages=nowSecs;
		
		var keepReports=this.isChrome?this.options.chromeKeepReports:this.options.keepReports;
		this.Log('Clear old messages, keeping '+keepReports);
		if(keepReports<=0) { 
			// must keep at least 1 report to get level information.
			keepReports=1; 
		}
		var t=this;
		this.IterateAttacks(function(name,value) {
			var attack=JSON2.parse(value);
			if(attack.messages && attack.messages.length>keepReports) {
				attack.messages.splice(0,attack.messages.length-keepReports+1);
			}
			t.browser_setValue(name,JSON2.stringify(attack));
		});
	},


	SetupClearMessages:function() {
		var t=this;
		var cm=document.createElement('input');
		cm.type='button';
		cm.id='ClearMessages';
		cm.style.display='none';
		document.body.appendChild(cm);
		cm.addEventListener('click',function(e) {
			setTimeout(function() {
				t.ClearMessages();
			},0);
		},false);
	},

	trainTroopsOnclick:/\(([0-9]+)\)/,
	AddTrainTroopsLink:function() {
		var startObj=ById('unit_btns_start');
		if(!startObj) return;
		
		var onclick=startObj.getAttribute('onclick');
		var m=this.trainTroopsOnclick.exec(onclick);
		if(!m) {
			return;
		}
		
		var t=this;
		var type=m[1];

		var pnode=startObj.parentNode;
		var a=document.createElement('a');
		a.className='button25';
		var setTrainTroopsA=function() {
			var trainTroops=JSON2.parse(t.GetValue('TrainTroops','{}'));
			a.innerHTML='<span>'+(trainTroops[t.GetCurrentCityId()]==type?'Auto Train - On':'Auto Train - Off')+'</span>';
		}
		a.addEventListener('click',function() {
			var trainTroops=JSON2.parse(t.GetValue('TrainTroops','{}'));
			trainTroops[t.GetCurrentCityId()]=trainTroops[t.GetCurrentCityId()]==type?undefined:type;
			t.SetValue('TrainTroops',JSON2.stringify(trainTroops));
			setTrainTroopsA();
		},false);
		setTrainTroopsA();

		//pnode.appendChild(document.createElement('br'));
		AddText(pnode,' ');
		pnode.appendChild(a);
	},

	GetCurrentCityId:function() {
		if(!unsafeWindow.currentcityid) return null;
		return unsafeWindow.currentcityid;
	},

	
	// returns {count, maxlevel}
	getCityBuilding: function(cityId, buildingId){
	  var b = unsafeWindow.seed.buildings['city'+cityId];
	  var ret = {count:0, maxLevel:0};
	  for (var i=1; i<33; i++){
		if (b['pos'+i] && b['pos'+i][0] == buildingId){
		  ++ret.count;
		  if (parseInt(b['pos'+i][1]) > ret.maxLevel)
			ret.maxLevel = parseInt(b['pos'+i][1]);
		}
	  }
	  return ret;
	},

	lastTrainTroops:{},
	CheckTrainTroops:function() {
		var t=this;
		if(!this.GetSeed()) return;
		var cityid=this.GetCurrentCityId();

		var trainTroops=JSON2.parse(this.GetValue('TrainTroops','{}'));
		//var trainTroops=GM_getValue('TrainTroops_'+this.GetServerId(),0);
		if(!trainTroops || !trainTroops[cityid]) {
			return;
		}
		var trainTroopId=trainTroops[cityid];
		
	//GM_log('buildTroops'+unsafeWindow.seed.citystats["city" +cityid ]["pop"][0]+"=="+unsafeWindow.seed.citystats["city" + cityid]["pop"][1]);
		var popAvail=parseInt(unsafeWindow.seed.citystats["city" +cityid ]["pop"][0]);
		var popTotal=parseInt(unsafeWindow.seed.citystats["city" + cityid]["pop"][1]);
		var labourTotal=parseInt(unsafeWindow.seed.citystats["city" + cityid]["pop"][3]);
		var idleTotal=popTotal-labourTotal;
		var popNeeded=((t.options.percentOfPopToTrain/100)*idleTotal)+labourTotal;
		
		// Determine number of available training slots
		var availableTrainingSlots = 0;
		try{
			var barracksTotal = this.getCityBuilding(cityid, 13).count;
			var trainingSlotsUsed = unsafeWindow.seed.queue_unt['city'+cityid].length;
			if(trainingSlotsUsed!=null){
				var availableTrainingSlots = barracksTotal-trainingSlotsUsed;
			}
		}finally{
			if(availableTrainingSlots<1){ return false; }
		}

		
	//GM_log('idleTotal:'+idleTotal+', labourTotal:'+labourTotal+', popneeded:'+popNeeded);	
		if(popAvail>0 && popAvail>=popNeeded) {
			// avoid over training.
			var lastTrain=this.lastTrainTroops[cityid];
			var nowSecs=new Date().getTime()/1000;
			if(nowSecs<(lastTrain+(3*60))) { return; }
			var startButton=ById('unit_btns_start');
			
			if(!startButton) {
				// let's bring up build troops
				this.DoUnsafeWindow('modal_barracks_train('+trainTroopId+');')
				return;
			} 
			var onclick=startButton.getAttribute('onclick');
			var onclickM=/\(([0-9]+)\)/.exec(onclick);
			if(!onclickM || trainTroopId!=onclickM[1]) {
				return;
			}
			this.lastTrainTroops[cityid]=nowSecs;
			// let's build troops
			var numInp=ById('modal_barracks_num');
			var maxObj=ById('modal_barracks_max_num');
			
			if(numInp && maxObj) {
				numInp.value=Math.floor(parseInt(maxObj.textContent)*0.9);
				var t=this;
				window.setTimeout(function() {
					if(numInp.value>maxObj.textContent) {
						t.Log('Not training troops:'+numInp.value+'>'+maxObj.textContent);
						return;
					}
	//var n=unsafeWindow.modal_barracks_train_max(6);
					onclick=onclick.replace('return false;','');
					window.setTimeout(function() {
						eval('unsafeWindow.'+onclick);
					},t.GetRandTime(500));
				},t.GetRandTime(500));
			}
		}
	},

	DetermineCurrentPage:function() {
		if(unsafeWindow.location.href.match(/kingdomsofcamelot\.com\/fb\/.*?\/src\/main_src\.php/i)){
			this.currentPage = "koc_game";
		}else if (unsafeWindow.location.href.match(/apps\.facebook\.com\/kingdomsofcamelot\/.*?page=nogame/i)) {
			this.currentPage = "domain_selection_app_page";
		}else if (unsafeWindow.location.href.match(/apps\.facebook\.com\/kingdomsofcamelot/i)) {
			this.currentPage = "app_page";
		}else if (unsafeWindow.location.href.match(/facebook.com\/connect\/uiserver.php/i)) {
			this.currentPage = "facebook_popup";
		}else if(unsafeWindow.location.href.match(/kingdomsofcamelot\.com\/fb\/.*?\/src\/newgame_src\.php/i)){
			this.currentPage = "domain_selection";
		}else{
			this.currentPage = "unknown";
		}
		return this.currentPage;
	},

	OnImpendingAttack:function() {
		var t=this;
		this.Log("impending attack");
		var url=t.options.impendingAttackUrl;
		if(url!=undefined && url !="") {
			GM_openInTab(url);
		}
	},
	CheckImpendingAttack:function() {
		var r=false;
		var seed=this.GetSeed();
		if(seed && seed.queue_atkinc) {
			var q=0;
	//		if(unsafeWindow.Object.isArray(seed.queue_atkinc)) {
				
				var keys=unsafeWindow.Object.keys(seed.queue_atkinc);
				if(keys.length>0 && keys.length<16) {
	//GM_log('impppp'+keys.length);			
					r=true;
				}
	//		}
		}
	//GM_log('imp'+r);	
		/*
		var topNav=ById('topnav_msg');
		if(!topNav || topNav.innerHTML.length==0) return;
		
		var redIdx=topNav.innerHTML.indexOf(': red');
		var r=redIdx>=0?true:false;
		if(!r) {
	GM_log('tnav'+topNav.innerHTML);
		}
		*/

		var t=this;
		var impendingAttack=this.GetValue('ImpendingAttack',false);
		if(!impendingAttack && r) {
			window.setTimeout(function() {
				t.OnImpendingAttack();
			},0);
		}
		this.SetValue('ImpendingAttack',r);
		return r;
	},


	/*
	current_modal_msg_list:"",
	CheckMessageLoad:function(page) {
		var t=this;
		var msg=ById('modal_msg_list');
		if(msg && msg.innerHTML!=t.current_modal_msg_list) {
			t.current_modal_msg_list=msg.innerHTML;
			var messageLoad=ById('MessageLoad');
			if(!messageLoad) {
				messageLoad=document.createElement('div');
				messageLoad.id='MessageLoad';
				messageLoad.style.position='absolute';
				messageLoad.style.height='600px';
				messageLoad.style.overflow='scroll';
				messageLoad.style.top='10px';
				messageLoad.style.zIndex='900000';
				messageLoad.style.border='5px solid #000';
				messageLoad.style.backgroundColor='#fff';
				document.body.appendChild(messageLoad);
			}
			var m=document.createElement('div');
			m.innerHTML=msg.innerHTML;
			messageLoad.appendChild(m);
			page++;
			this.DoUnsafeWindow("modal_messages_listshow('inbox',page);");
		}
		window.setTimeout(function() {
			t.CheckMessageLoad(page);
		},200);
	},

	ReadEmails:function() {
		this.current_modal_msg_list='';
		this.CheckMessageLoad();
	},

	*/



	FactoryReset:function() {
		var names=this.browser_listValues();
		for(var n=0; n<names.length; n++) {
			this.browser_setValue(names[n],null);
		}
		this.SetOptions({});
	},
	FactoryResetCurrentServer:function() {
		var names=this.browser_listValues();
		var serverId=this.GetServerId();
		for(var n=0; n<names.length; n++) {
			var name=names[n];
			var sid=this.GetServerIdFromName(name);
			if(sid!=serverId) continue;
			this.browser_setValue(name,null);
		}
	},
	GetServerIdFromName:function(n) {
		var nArr=n.split('_');
		if(nArr.length<2) return null;
		return nArr[1];
	},
	DeleteAllStoredAttacks:function() {
		var t=this;
		this.IterateAttacks(function(name,value) {
			var nameI=name.split('_');
			if(nameI.length<3) return;
			var xy=nameI[2].split(',');
			if(value=="") return;
			var attack=JSON2.parse(value);
			if(!attack) return;
			var attackX = xy[0];
			var attackY = xy[1];
			if(attackX && attackY){
				t.DeleteAttack(attackX, attackY);
			}
			return true;
		});
		window.alert("All stored attacks for this domain have been deleted.\nClick the ok button to reload.");
	},
	ExportAllToJSON:function() {
		var names=this.browser_listValues();
		var obj={};
		var serverId=this.GetServerId();
		for(var n=0; n<names.length; n++) {
			var name=names[n];
			var sid=this.GetServerIdFromName(name);
			if(sid!=serverId) continue;
			var v=this.browser_getValue(name,null);
			if(v!=null && v!=undefined && v!="")
				obj[name]=v;
		}
		return JSON2.stringify(obj);
	},
	ImportAllFromJSON:function(json) {
		try {
			var obj=JSON2.parse(json);
			if(!obj) { return; }
			this.FactoryResetCurrentServer();
			var serverId=this.GetServerId();
			for(var name in obj) {
				var sid=this.GetServerIdFromName(name);
				if(sid!=serverId) continue;
				this.browser_setValue(name,obj[name]);
			}
		} catch(e) {
			window.alert('Import failed'+e);
		}
	},

	SetupMenu:function() {
		var t=this;
		GM_registerMenuCommand('KOCAttack - Options',function() {
			t.ShowOptionsDialog();
		});
		GM_registerMenuCommand('KOCAttack - Auto Attack',function() {
			t.ToggleAutoAttack();
		});
		GM_registerMenuCommand('KOCAttack - Factory Reset!',function() {
			t.FactoryReset();
		});
	},




	/*
	TimeoutZero:function(f,arg) {
		setTimeout(function() {
			f(arg);
		},0);
	},
	*/

	pageLoaded:false,
	prevCurrentCity:-1,
	inviteFriendsTabHidden:false,
	idStatus:{},
	ResetIdStatus:function() {
		this.idStatus={};
	},
	Listen:function() {
		var t=this;
		t.SetupMenu();
		this.GetValuesCache();
		t.ResetAutoAttackTarget();
		this.options=this.GetOptions();
		this.startListenTime=new Date();
		
		// Determine which page we're on
		t.DetermineCurrentPage();
		
		// Code strictly for page: koc_game
		if(t.currentPage == "koc_game"){
		
			window.setTimeout(function() {
				if(!t.pageLoaded && t.GetAutoAttack() && !t.IsMapperRunning()) {
					GM_log("whoops, game not loaded after 60 secs problem. reloading.");
					t.SetValuesCache();
					//window.location.reload(true);
					t.ReloadWindow();
					//window.history.go(0);
				}
			},t.GetRandTime(60*1000));

			if(t.GetAutoAttack()) {
				window.setTimeout(function() {
					// press start on the poc timer after we reload
					if(unsafeWindow.poctoggletimer && unsafeWindow.ispaused) {
						unsafeWindow.poctoggletimer();
					}
				},5000);
			}
			
			// Hide the invite friends tab on page load
			if(!t.inviteFriendsTabHidden && t.options.disableInviteFriends){
				var tabBar=ById("main_engagement_tabs");
				if(tabBar){
					var inviteFriendsTab=nHtml.FindByXPath(tabBar,".//a[contains(@onclick,'invite_friends_popup')]");
					if(inviteFriendsTab){
						inviteFriendsTab.style.display="none";
						t.inviteFriendsTabHidden = true;
					}
				}
			}
		
		} // End of code strictly for page: koc_game

		var domTickTimer=null;
		var domTickUpto=0;
		var domTick=function(e) {
			
			var funcsById={};
			
			// Handle cross-iframe commands (which are currently only being used for the domain selection page)
			if (t.currentPage == "domain_selection" || t.currentPage == "domain_selection_app_page"){
				if((domTickUpto%20)==0) {
					t.HandleCrossIframeCommands();
				}
			}

			// Code strictly for page: koc_game
			if(t.currentPage == "koc_game"){
			
				//if(e.target.className && !/(chat|city|slot)/.exec(e.target.className)) GM_log('xxx:'+e.target.className);
				//if(e.target.id && e.target.id!='tooltip' && e.target.id('_l_')<0 && e.target.id.substring(0,2)!='l_' && e.target.id.substring(0,8)!='citysel_') GM_log('id:'+e.target.id);
				var cityId=t.GetCurrentCityId();
				var cityChanged=cityId!=t.prevCurrentCity?true:false;
				if(cityChanged) {
					t.prevCurrentCity=cityId;
				}
				
				if((domTickUpto%10)==0) {
					t.HandleChatPane();
				}
				
				if((domTickUpto%20)==0) {
					t.CheckImpendingAttack();
				}
				
				if(cityChanged && cityId!=null) {
					// changed city
					setTimeout(function() {
						t.AddOptionsLink();
						t.DrawClosestFarms();
					},0);
					setTimeout(function() {
						t.DetermineCurrentRallyPointLevel();
						t.DetermineCurrentMarchesNum();
						t.CheckAutoRaiseGold();
						t.CheckAbandonWilds();
						t.CheckTrainTroops();
					},1000);
					setTimeout(function() {
						t.CheckReports();
					},3000);
					setTimeout(function() {
						t.NextAutoAttack();
					},5000);
				}
				
				funcsById={
					'castleModalTabs':function(target) {
						t.OnCastleBoxAppear(target.parentNode);
					},
					'marketmain_bdy':function(target) {
						t.OnMarketBoxAppear(target);
					},
					'modal_attack':function(target) {
						window.setTimeout(function() {
							t.OnAttackBoxAppear(target);
						},250);
					},
					'barracks_train':function(target) {
						t.AddTrainTroopsLink();
						t.CheckTrainTroops();
					},
					'modal_speedup':function(target) {
						t.ClickShareToWall(target);
					},
					'invitePopup':function(target) {
						if(t.options.disableInviteFriends){
							// Hide the invite popup if auto attack is enabled
							target.parentNode.removeChild(target);
						}
					},
				};
				
			} // End of code strictly for page: koc_game
			
			// Handle cross-domain facebook game publish requests
			funcsById.RES_ID_fb_pop_dialog_table = function(target){
				if (t.currentPage == "koc_game") {
					// Update the current server id locally for cross-domain access
					if(t.currentServerId>0 && t.currentPage == "koc_game"){
						GM_setValue("KOCAttackLastKnownServerID", t.currentServerId);
					}
				}
			}
			if(t.currentPage == "facebook_popup"){
				if((domTickUpto%20)==0) {
					t.HandlePublishPopup();
				}
			}
			
			// Log back into domain if disconnected due to server down-time
			if(t.currentPage == "domain_selection" && t.options.autoLogBackIn){
				if((domTickUpto%20)==0) {
					t.HandleDomainLogin();
				}
			}
			
			/*
			if(e.target.id && funcsById[e.target.id]) {
				funcsById[e.target.id](e.target);
			} else 
			*/
			//if(e.target.className.indexOf('modalBox')>=0) {
			var funcCalled=0;
			if(funcCalled==0) {
				for(var id in funcsById) {
					var f=funcsById[id];
					var div=ById(id);

					if(!t.idStatus[id] && div) {
						var fcall=function(func,d) {
							funcCalled++;
							setTimeout(function() {
								try {
									func(d);
								} finally {
									funcCalled--;
								}
							},0);
						}
						fcall(f,div);

						//t.TimeoutZero(f,div);
					}
					var divStatus=div?true:false;
					if(divStatus!=t.idStatus[id]) {
						//t.Log("Status changed:"+id+","+divStatus);
					}
					t.idStatus[id]=divStatus;
				}
			}
			if(!domTickTimer) {
				domTickTimer=window.setTimeout(function() {
					domTickTimer=null;
					domTick();
					domTickUpto++;
				},250);
			}
		};
		
		var withinDomInserted=false;
		if(document.body){
			document.body.addEventListener('DOMNodeInserted',function(e) {
				if(withinDomInserted) return;
				var isStatuses=(e.target.className && e.target.className=='statues')?true:false;
				if(isStatuses){
					t.pageLoaded=true;
				}
				if(e.target.id && e.target.id=='tooltip') {
					withinDomInserted=true;
					setTimeout(function() {
						try {
							t.DrawLevelIcons();
							t.OnToolTipAppear(e.target);
						} finally {
							withinDomInserted=false;
						}
					},0);
				} else if(e.target.className && e.target.className.indexOf('modal_msg_reports')>=0) {
					withinDomInserted=true;
					setTimeout(function() {
						try {
							t.RecordReports();
							t.AddCheckBarbarians();
							t.HighlightAllianceReports();
						} finally {
							withinDomInserted=false;
						}
					},0);
				}
			},false);
		}

		domTick();
	},

};


// KOCAttack.Listen();
// KOCAttack.SetupClearMessages();


function SetupQuickMarchButton(useRetryMarch) {
/*
	var retryMarch='var retryMarch=function() { alert("retrying march"); new (Ajax.Request)(g_ajaxpath + "ajax/march.php" + g_ajaxsuffix, {'+
		'method: "post",'+
        'parameters: params,'+
        'onSuccess: function (transport) {'+
            'var rslt = eval("(" + transport.responseText + ")");'+
            'if (!rslt.ok) {'+
				'if(rslt.error_code==3) {'+
					'window.setTimeout(function() { retryMarch(); },1000); '+
				'} else {'+
					'alert("March Error:"+rslt.msg);'+
				'}'+
			'}'+
		'}'+
	'}); };';
*/
	var retryMarch='var retryMarch=function() { '+
		'new (Ajax.Request)(g_ajaxpath + "ajax/march.php" + g_ajaxsuffix, {'+
		'method: "post",'+
        'parameters: params,'+
        'onSuccess: function(transport) {  marchSuccess(transport); },'+
        'onFailure: function () {  Modal.hideModalAll(); }'+
	'}); };';
	if(!useRetryMarch) {
		retryMarch='var retryMarch=function() { return; };';
	}
	
	var modalAttackReplaces=[
		// *** it says "new Ajax" in the source but firefox converts it to new (Ajax
		[['modal_attack_do','modal_attack_doOld']],
		[['onSuccess:','onSuccess: marchSuccess=']],
		[['Modal.showAlert(printLocalError(','if(rslt.error_code==3 || rslt.error_code==8) { try {window.setTimeout(function() { retryMarch(); },(3*1000)); } catch(e) { alert("retry failed:"+e); }  } else { Modal.hideModalAll(); }  Modal.showAlert(printLocalError(']]
	];
	
	
	var attack_generatequeueReplaces=[
		[['attack_generatequeue','attack_generatequeueOld']],
		[
			['class=\\"army\\">" + g_js_strings.commonstr.army + ": "','style=\\"width: 145px !important\\" class=\\"army\\">"'],
			['class=\\"army\\">" + g_js_strings.commonstr.army + ": <span>"','style=\\"width: 145px !important\\" class=\\"army\\"><span>"']
		],
		[['class=\\"name','style=\\"width: 0px !important; display: none;\\" class=\\"name']],
		//[/123/g,'100']
	];
	var attack_generatequeueReplacesU=[
		[['var u = 0;','var u = "K:"+seed.knights["city" + currentcityid]["knt" + q].combat+", "; ']],
		[['u += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+r][0]; u+=uname[0]+uname[uname.length-1]+":"+x+", "; } ']],
	];
	var attack_generatequeueReplacesR=[
		[['var r = 0;','var r = "K:"+seed.knights["city" + currentcityid]["knt" + t].combat+", "; ']],
		[['r += parseInt','var x = parseInt']],
		[['"Count"]);','"Count"]); if(x>0) { var uname=unitcost["unt"+p][0]; r+=uname[0]+uname[uname.length-1]+":"+x+", "; } ']],
	];

/*****	
	if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		modalAttackReplaces.push([['new Ajax',"var marchSuccess=null; "+retryMarch+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew Ajax"]]);
	} else {
		modalAttackReplaces.push([['new (Ajax',"var marchSuccess=null; "+retryMarch+
			(useRetryMarch?"":" Modal.hideModalAll(); ")+
			"\nnew (Ajax"]]);
	}
*****/
	modalAttackReplaces.push([['ajax.Request',   "var marchSuccess=null; "+retryMarch+
		(useRetryMarch?"":" Modal.hideModalAll(); ")+	"\najax.Request"]]);

	if(!useRetryMarch) modalAttackReplaces.push(['Modal.hideModalAll();','']);
	
	var replaceFunc=function(name,replaces) {
		var modalAttackFunc=window[name].toString();
		var nameOld=name+'Old';
		var foundFailed=false;
		for(var a=0; a<replaces.length; a++) {
			var found=false;
			var repArr=replaces[a];
			for(var ra=0; ra<repArr.length; ra++) {
				var repI=repArr[ra];
				if(typeof(repI[0])=="object") {
					found=repI[0].exec(modalAttackFunc)?true:false;
				} else {
					found=modalAttackFunc.indexOf(repI[0])>=0?true:false;
				}
				if(found) break;
			}
			if(!found) {
				var err="modalAttackReplace: cannot find: "+repI[0]+','+modalAttackFunc;
				var sp=document.createElement('span');
				sp.style.color='#ccc';
				sp.appendChild(document.createTextNode(err));
				document.body.insertBefore(sp,document.body.childNodes[0]);
				foundFailed=true;
				break;
			}
			modalAttackFunc=modalAttackFunc.replace(repI[0],repI[1]);
		}
		if(foundFailed) return;
		try {
			window[nameOld]=eval(modalAttackFunc);
//alert(window[nameOld].toString());			
		} catch(e) {
			alert(e+', bad func:'+modalAttackFunc);
		}
		
		window[name]=function() {
			// let our stuff in addListener run first.
			window.setTimeout(function() {
				eval(nameOld+'();');
			},100);
		}
	};

	
	replaceFunc('modal_attack_do',modalAttackReplaces);
	function AddArray(to,from) {
		for(var c=0; c<from.length; c++) { to.push(from[c]); }
	}
	
	var arr=[];
	AddArray(arr,attack_generatequeueReplaces);
	var funcStr=window['attack_generatequeue'].toString();
	if(funcStr.indexOf('var u = 0')>=0) {
		AddArray(arr,attack_generatequeueReplacesU);
	} else {
		AddArray(arr,attack_generatequeueReplacesR);
	}
//// FRED	replaceFunc('attack_generatequeue',arr);

/* BAD: updateSeed.php doesn't return cityUnits
    var params = Object.clone(g_ajaxparams);
    new Ajax.Request(g_ajaxpath + "ajax/updateSeed.php" + g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
alert(message.responseText);
		}
	});
*/
}

/*
function SetupClearMessages() {
	modal_messages_reports_chkdelOld=modal_messages_reports_chkdel;
	modal_messages_reports_chkdel=function(type) {
		var d=document.createElement('div');
		d.id='modal_msg_reports_tablediv';
		document.body.appendChild(d);
		modal_messages_reports_chkdelOld(type);
		if(type=='deleteAll') {
			document.getElementById('ClearMessages').click();
		}
	};
}
*/

function CreateMsgDiv() {
	var m=document.getElementById('KOCAttackMsgDiv'); 
	if(!m) { 
		var ml=document.getElementById('modal_msg_list'); 
		if(!ml) {
			ml=document.createElement('div'); 
			ml.id='modal_msg_list'; 
		}
		m=document.createElement('div'); 
		m.style.position='absolute';
		m.style.top='0px';
		m.style.left='0px';
		m.style.width='700px';
		m.style.zIndex='900000';
		m.style.border='5px solid #000';
		m.style.backgroundColor='#fff';
		//m.id='modal_attack';
		var close=document.createElement('a');
		close.addEventListener('click',function() {
			m.style.display='none';
			m.removeChild(ml);
		},false);
		close.innerHTML='Close';
		close.style.fontSize='20px';
		
		var center=document.createElement('center'); 
		center.appendChild(close);
		m.appendChild(center);
		m.appendChild(ml);
		
		if(!document.getElementById('modal_msg_list_pagination')) { 
			p=document.createElement('div'); p.id='modal_msg_list_pagination'; 
			ml.appendChild(p);
		}
		//document.body.insertBefore(m,document.body.childNodes[0]);
		if(document.body){
			document.body.appendChild(m);
		}
	}
	m.style.display='block';
	return m;
}

function AddScript(js) {
	var scr=document.createElement('script');
	scr.innerHTML=js;
	document.body.appendChild(scr);
}
function SetupScripts() {
	var options=KOCAttack.GetOptions();
	var scr=document.createElement('script');
	scr.innerHTML="CreateMsgDiv="+CreateMsgDiv+
		";\n"+
	//	SetupClearMessages+"\n; SetupClearMessages();\n"+
		";\n"+SetupQuickMarchButton+"\n; SetupQuickMarchButton("+options.retryMarch+"); \n";
	document.body.appendChild(scr);
}

var mixpanelRemoved=false;
function DisableMixpanel() {
	if(unsafeWindow.cm) {
		unsafeWindow.cm.MixPanelTracker.track=function() { };
	}
	if(unsafeWindow.MixpanelLib) {
		unsafeWindow.MixpanelLib.prototype={
			register:function() { },
			track:function(t) {
			}
		};
	}
	if(!unsafeWindow.cm || !unsafeWindow.MixpanelLib) {
		window.setTimeout(function() {
			DisableMixpanel();
		},100);
	} else {
		GM_log('Mixpanel removed');
		mixpanelRemoved=true;
	}
}

DisableMixpanel();
unsafeWindow.cm.cheatDetector={
detect:function() { }
};


var startAllTimeout=null;
function StartAll() {
	var now=new Date().getTime();
	if(startAllTimeout==null) {
		startAllTimeout=now+5000;
	}
	if(mixpanelRemoved || startAllTimeout<now) {
		if(startAllTimeout<now) {
			GM_log("Did not remove mixpanel, starting anyways");
		}
		KOCAttack.Listen();
		KOCAttack.SetupClearMessages();

		SetupScripts();
	} else {
		window.setTimeout(function() { StartAll(); },200);
	}
}

if(location.href.indexOf('apps.facebook.com/kingdomsofcamelot/')>=0) {
	window.setTimeout(function() {
		
	},10000);
} else {
	StartAll();
}
// ==UserScript==
// @name           matFarieKiller
// @namespace      matFarieKiller
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==


GM_log ('matFarieKiller (v1.5) Running');

window.setTimeout (checkStrangeMagic, 5000);

// disable faire popup ...
unsafeWindow.Modal.showModalUEP = eval ('function (a,b,c) {return;}');

function checkStrangeMagic (){
  if (!document.getElementById("kochead")){
    popup (100,100,500,275, "<BR><CENTER>matFairieKiller says ...<BR><BR>KofC NOT FOUND<BR>Refreshing in 15 seconds ...<BR><BR>");
    window.setTimeout ( function() { GM_log ("matFarieKiller REloading..."); reloadKOC(); }, 15000);
  }  
}

function reloadKOC (){
	var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
	if (m == null){
  	history.go(0);
  	return;
	}
  var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+m[1];
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=s value="'+ m[1] +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
}


function popup (left, top, width, height, content){
   var div = document.createElement('div');
   if (width)
       div.style.width = width;
   if (height) 
       div.style.height = height;
   if (left || top) {
       div.style.position = "relative";
       if (left)
           div.style.left = left;
       if (top)
           div.style.top = top;
}

ptStartup ();


