// ==UserScript==
// @name           GW LazyTools
// @namespace      noobs
// @version        20111018x
// @description    Powertools for Global Warfare
// @include        http://*.globalwarfaregame.com/*main_src.php*
// @include        http://apps.facebook.com/globalwarfaregame/*
// @include        https://apps.facebook.com/globalwarfaregame/*
// ==/UserScript==

var Version = '20111018x';

// Test switches
var DEBUG_TRACE = false;
var DEBUG_BUTTON = true;
var ENABLE_INFO = true;
var ENABLE_CHAT = false;
// End Test switches
var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

var Options = {
	ptWinIsOpen	:	true,
	ptWinDrag	:	true,
	ptWinPos	:	{},
	ptTrackOpen	:	true,
	includeCity	:	true,
	includeMarching	:	false,
	includeTraining	:	false,
	includeTrainingTotal	:	false,
	overviewAllowOverflow	:	false,
	overviewFontSize	:	12,
	pbgoldenable	:	true,
	pbGoldLimit	:	99,
	pboilenable : 	true,
	pbfoodenable :	true,
	pbWHenable :	true,
	pbahelpenable :	true,
	pbWideMap :	true,
	pbChatOnRight  :	true,
	pbrmmotdEnable  :	true,
	
};

var GlobalOptions = {
  pbWideScreen : true,
  pbWideScreenStyle : 'normal',
};

if (document.URL.search(/apps.facebook.com\/globalwarfaregame/i) >= 0){
  facebookInstance ();
  return;
}
if (document.URL.search(/globalwarfaregame.com/i) >= 0){
  GWwideScreen ();
}
readGlobalOptions();
function GWwideScreen(){
	var iFrame = parent.document.getElementsByTagName('IFRAME');
	//iFrame[0].style.minWidth = '1220px';
	var style = document.createElement('style')
	style.innerHTML = 'body {margin:0; width:100%; !important;}';
	iFrame[0].parentNode.appendChild(style);
	iFrame[0].style.width = '99%';
	while ( (iFrame=iFrame.parentNode) != null)
		iFrame.style.width = '90%';
}

/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
 function setWide (){
	var iFrame = document.getElementById('iframe_canvas');
	if (!iFrame){
	  setTimeout (setWide, 1000);
	  return;
	}
	iFrame.style.width = '100%';

	while ( (iFrame=iFrame.parentNode) != null)
	  if (iFrame.tagName=='DIV')
		iFrame.style.width = '100%';
	document.getElementById('globalContainer').style.left = '0px';
    try{    
      document.getElementById('rightCol').parentNode.removeChild(document.getElementById('rightCol'));
      document.getElementById('leftColContainer').parentNode.removeChild(document.getElementById('leftColContainer'));
    } catch (e){
      // toolkit may have removed them already!
    }
    var e = document.getElementById('mainContainer');
	if(e){
		if (GlobalOptions.pbWideScreenStyle=="normal") e.parentNode.style.minWidth = '100%';
		if (GlobalOptions.pbWideScreenStyle=="wide") e.parentNode.style.width = '1520px';
		if (GlobalOptions.pbWideScreenStyle=="ultra") e.parentNode.style.width = '1900px';
		for(i=0; i<e.childNodes.length; i++){
			if(e.childNodes[i].id == 'contentCol'){
				e.childNodes[i].style.margin = '0px';
				e.childNodes[i].style.paddingTop = '5px';
				break;
			}
		}
	}
	var e = document.getElementById('pageHead');
	if(e){
		e.style.width = '80%';
		e.style.margin = '0 10%';
	}
	var e = document.getElementById('bottomContent');
	if(e){
		e.style.padding = "0px 0px 12px 0px";
	}
    
  }
  if (GlobalOptions.pbWideScreen)
    setWide();
}



var Seed = unsafeWindow.seed;
var Tabs = {};
var mainPop;
var Cities = {};
var Generals = {};
var Leaders = {};
var ptStartupTimer = null;
var CPopUpTopClass = 'ptPopTop';
var uW = unsafeWindow;
function ptStartup (){
  clearTimeout (ptStartupTimer);
  if (unsafeWindow.ptLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    ptStartupTimer = setTimeout (ptStartup, 1000);
    return;
  }
  unsafeWindow.ptLoaded = true;
  //logit ("KofC client version: "+ anticd.getKOCversion());
  
  Seed = unsafeWindow.seed;
  var styles = '.ptTabs {color:black; font-size:12px}\
	.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    table.ptTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .hostile td { background:red; }.friendly td{background:lightgreen; }.ally td{background:lightblue; }\
	table.ptTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.ptOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.ptSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.ptTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
	table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none;}\
    table.ptTabOverview tr td {border-left:1px solid #ccc; white-space:nowrap; padding: 1px;}\
    table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .ptDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
	.ptOddrow {background-color:#eee}\
    .ptStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .ptStatLight {color:#ddd}\
	.ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    span.boldWhite {color:#ffffff; font-weight:bold}\
    input.ptDefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
    input.ptDefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
    input.ptButton20 {height:27px; width:80px}\
    table.ptMainTab {empty-cells:show; margin-top:5px }\
    table.ptMainTab tr td a {color:inherit }\
    table.ptMainTab tr td   {font-family:georgia,arial,sans-serif; height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.ptMainTab tr td.spacer {padding: 0px 3px;}\
    table.ptMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed; color:black}\
    table.ptMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#1e66bd; color:white; border-color:black;}\
    tr.ptPopTop td { background-color:#ded; border:none; height: 21px;  padding:0px; }\
    tr.ptretry_ptPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.ptMainPopTop td { background-color:#ded; border:none; height: 42px;  padding:0px; }\
    tr.ptretry_ptMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px; overflow:auto;}\
    .CPopup  {border:3px ridge #666}\
    span.ptTextFriendly {color: #080}\
    span.ptTextHostile {color: #800}\
	.ptButCancel {background-color:#a00; font-weight:bold; color:#fff}\
    div.indent25 {padding-left:25px}';
    
  window.name = 'PT';
  logit ("* Global Warfare Power Tools v"+ Version +" Loaded", true);
  readOptions();
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y;
    saveOptions ();
  }
    // Reset window xPos if the widescreen option is disabled
  if(!GlobalOptions.pbWideScreen && Options.ptWinPos.x > 700){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    Options.ptWinPos.x = c.x+4;
    saveOptions ();
  }
  mainPop = new CPopup ('pt', Options.ptWinPos.x, Options.ptWinPos.y, 600,800, Options.ptWinDrag,
      function (){
        tabManager.hideTab();
        Options.ptWinIsOpen=false;
        saveOptions()
      });
  mainPop.autoHeight (true);  

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  
  AddMainTabLink('Main', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  CollectGold.init();
  CollectOil.init();
  CollectWH.init();
  CollectFood.init();
  ChatPane.init();
  RMMotd.init();
  
  if (Options.ptWinIsOpen && Options.ptTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  WideScreen.init();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  WideScreen.useWideMap (Options.pbWideMap);
}

/****************************  Overview Tab ******************************/
function getResourceProduction (cityId){
  var ret = [0,0,0,0,0,0,0,0,0];
  var now = unixTime ();
  
  var wilds = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var w = Seed.wilderness["city" + cityId];
  for (var k in w){
    var type = parseInt(w[k].tileType);
    if (type==10 || type==11 || type==12)
      wilds[1] += parseInt(w[k].tileLevel);
    else 
      wilds[type/10] += parseInt(w[k].tileLevel);
  }  
  
  knight = 0;       
  var s = Seed.knights["city" + cityId];
  if (s) {
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];
    if (s){
      var knight = parseInt(s.knightLevel);
      // if (s.resourcefulnessBoostExpireUnixtime > now)
        // knight *= 1.25;
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
    if (parseInt(Seed.bonus["bC1" + i + "00"]["bT1" + i + "01"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
    ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + wilds[i]/20) * workerFactor + 100));
  }
  return ret;  
}

Tabs.Overview = {
  tabOrder : 1,
  cont : null,
  displayTimer : null,

  Overview : function (){
  },

  init : function (div){
    this.cont = div;
    if (Options.overviewAllowOverflow)
      this.cont.style.overflowX = 'visible';
  },

  hide : function (){
    clearTimeout (Tabs.Overview.displayTimer);
  },
  
  show : function (){
    var rownum = 0;
    var t = Tabs.Overview;
    var linestyle ="";
    var disposable=[0,400,800,2000,3000,6000,12500,25000,50000,105000,210000];
    var stable    =[0,500,1000,2000,4000,8000,16000,32000,64000,140000,280000];
     
    clearTimeout (t.displayTimer);

     function _row (name, row, noTotal, rowTotal){
      if (rownum++ % 2)
        style = '';
      else
        style = ' style = "background: #e8e8e8"';
      if (rowTotal)
        style = ' style = "background: #87CEEB"';
     var tot = 0;
      var m = [];
      
        for (i=0; i<row.length; i++)
          tot += row[i];
      
      if (tot){
        m.push ('<TR style="background: #fff" align=right');
        m.push (style);
        m.push ('><TD');
        m.push (style);
        m.push ('><B>');
        m.push (name);
        m.push (' &nbsp; </td>');
      }
      else
      {
        rownum--
      }
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('> &nbsp;</td>');
      } else {
        if (tot){
          m.push ('<TD style="background: #87CEEB">'); // ffc   
          m.push (addCommas(tot));
          m.push ('</td>');
        }
      }
      if (tot){
        for (i=0; i<row.length; i++){
          m.push ('<TD');
          m.push (style);
          m.push ('>');     
          m.push (addCommas(row[i]));
          m.push ('</td>');
        }
        m.push ('</tr>');
      }
      return m.join('');
    }
    
//DebugTimer.start(); 
    try {
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
     // <TR align=left><TD><SPAN class=ptStatLight>Joined on:</span> '+ dt.toLocaleDateString() +'</td>
      str = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;"><TABLE cellspacing=0 cellpadding=0 class="ptTab ptStat" width=97% align=center>\
        <TD><SPAN class=ptStatLight>Power:</span> ' + addCommas(Seed.player.might) +'</td>\
        <TD><SPAN class=ptStatLight>Alliance:</span> ' + getMyAlliance()[1] +'</td>\
        <TD align=right><SPAN class=ptStatLight>Domain:</span> ' + unsafeWindow.domainName +'</td></tr></table></div>';

              
      str += "<DIV id=overMainDiv style='font-size:"+ Options.overviewFontSize +"px'><TABLE class=ptTabOverview cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #87CEEB'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>'+ Cities.cities[i].x +','+ Cities.cities[i].y +"<BR>"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"</td>";
      }
      str += "</tr>";
	  
	  str += '<TR valign=top align=right><TD></td><TD style=\'background: #87CEEB"\'></td>';
		for(i=0; i<Cities.numCities; i++){
		  cityID = 'city'+Cities.cities[i].id;
		  Gate = parseInt(Seed.citystats[cityID].gate);
		if(Gate == 0)
		  str += '<TD>Hiding</td>';
		else
		  str += '<TD><SPAN class=boldRed>Defending</span></td>';
		}
    rows = [];
    rows[0] = [];
    rows[10] = [];
    for(i=0; i<Cities.numCities; i++) {
      cityID = 'city'+ Cities.cities[i].id;
      rows[0][i] = parseInt(Seed.citystats[cityID].gold[0]);
      rows[10][i] = Seed.citystats[cityID].gold[1] + '%';
    }
    for (r=1; r<9; r++){
      rows[r] = [];
      for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0] / 3600);
      }
    }
    str += _row ('Food', rows[1]);
    str += _row ('Oil', rows[2]);
    str += _row ('Stone', rows[3]);
    str += _row ('Steel', rows[4]);
    str += _row ('Titanium', rows[5]);
    str += _row ('Graphene', rows[6]);
//      str += '<TR><TD colspan=12, height=3px><BR></td></tr>';      
    str += _row ('Tax', rows[10], true);
    str += _row ('Gold', rows[0]);
    str += _row ('Uranium', rows[7]);
    str += _row ('Diamonds', rows[8]);
    str += '<TR> <TD colspan=12 background-color: #DAE9FC><BR></td></tr>';
    var maxunit=20;
	  for (r=1; r<maxunit; r++){
        rows[r] = [];
		for(i=0; i<Cities.numCities; i++) {
            rows[r][i] = 0;
        }
	  }
	  if (Options.includeCity){          
        for (r=1; r<maxunit; r++){
          for(i=0; i<Cities.numCities; i++) {
            cityID = 'city'+ Cities.cities[i].id;
            rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
          }
        }
        rownum = 0;
	  //  for(i=0; i<20; i++)
		//  str += _row (unsafeWindow.arStrings.unitName['u'+i], rows[i]);
	      str += _row (unsafeWindow.arStrings.unitName['u1'], rows[1]);
        str += _row (unsafeWindow.arStrings.unitName['u5'], rows[5]);
        str += _row (unsafeWindow.arStrings.unitName['u6'], rows[6]);
        str += _row (unsafeWindow.arStrings.unitName['u4'], rows[4]);
        str += _row (unsafeWindow.arStrings.unitName['u18'], rows[18]);
        str += _row (unsafeWindow.arStrings.unitName['u7'], rows[7]);
        str += _row (unsafeWindow.arStrings.unitName['u8'], rows[8]);
        str += _row (unsafeWindow.arStrings.unitName['u17'], rows[17]);
        str += _row (unsafeWindow.arStrings.unitName['u9'], rows[9]);
        str += _row (unsafeWindow.arStrings.unitName['u11'], rows[11]);
        str += _row (unsafeWindow.arStrings.unitName['u10'], rows[10]);
        str += _row (unsafeWindow.arStrings.unitName['u12'], rows[12]);
        str += _row (unsafeWindow.arStrings.unitName['u19'], rows[19]);
        str += _row (unsafeWindow.arStrings.unitName['u16'], rows[16]);
        str += _row (unsafeWindow.arStrings.unitName['u13'], rows[13]);
        str += _row (unsafeWindow.arStrings.unitName['u15'], rows[15]);
        str += '<TR><TD colspan=12><BR></td></tr>';
    }
//    Fortification
	  if (Options.includeCity){
      for (r=1; r<5; r++){
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          x=r+51
          rows[r][i] = parseInt(Seed.fortifications[cityID]['fort'+x]);
          var perimeter = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos1[1]);
          if (r==2) {
            var temp=parseInt(Seed.fortifications[cityID]['fort'+x]) + rows[1][i];
            if (Options.showSpace){
              rows[5][i] = disposable[perimeter] - temp;                
            }
            else {
              if (temp < disposable[perimeter])
                rows[5][i] = temp+'('+ perimeter +')';
              else
                rows[5][i] = '<SPAN class=boldWhite><B>'+ temp +'('+ perimeter +')' +'</b></span>';
            }
          }
          if (r==4) {
          var temp=parseInt(Seed.fortifications[cityID]['fort'+x]) + rows[3][i];
          if (Options.showSpace){
            rows[6][i] = stable[perimeter] - temp;                
          }
          else {
            if (temp < stable[perimeter])
              rows[6][i] = temp+'('+ perimeter +')';
            else
              rows[6][i] = '<SPAN class=boldWhite><B>'+ temp + '('+ perimeter +')' + '</b></span>';
            }
          }
        }
      } 
	    str += _row ('Mines:', rows[2],true);
      str += _row ('Stingers:', rows[1],true);
	    str += _row ('Disposable:', rows[5],true,true);
      str += _row ('Artillery:', rows[3],true);
      str += _row ('Airguns:', rows[4],true);
      str += _row ('Stable:', rows[6],true,true);
      str += '<TR><TD colspan=12><BR></td></tr>';
    }
//    Population      
    row = [];
    row2 = [];
    row3 = [];
    for(i=0; i<Cities.numCities; i++) {
        row[i]  = parseInt(Seed.citystats["city" + Cities.cities[i].id]["pop"][0]);  // Current  population
        row2[i] = parseInt(Seed.citystats["city" + Cities.cities[i].id]["pop"][3]);  // Labor force
        row3[i] = row[i]-row2[i]                                        // idle
      }
			str += _row ('Population', row, true);
      str += _row ('Working', row2, true);      
      str += _row ('Idle +/-', row3, true,true);
      str += '<TR><TD><BR></td></tr>';
//    Food      
      row = [];
      row2 = [];
      row3 = [];
      for(i=0; i<Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row3[i] = usage;
        row2[i] = rp[1];
				row[i] = rp[1] - usage;
      }
     
			str += _row ('Upkeep', row3, true);
      str += _row ('Production', row2, true);      
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
      str += _row ('Food left', row, true,true);
      str += '<TR><TD><BR></td></tr>';
      
      
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totWilds = 0;
        dat = Seed.wilderness['city'+ Cities.cities[i].id];
        if (dat!=null && matTypeof(dat)=='object')
          for (k in dat)
            ++totWilds;
        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
		    if(castle == 11) castle = 12;
        if (totWilds < castle)
          row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';
        else
          row[i] = totWilds +'/'+ castle;
      }
      str += _row ('#Wilds', row, true);
  
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
        for (k in dat)
          ++totKnights;
        row[i] = totKnights;
      }
      str += _row ('#Generals', row, true);
  
      var now = unixTime();
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
	      var length = 0,key;
	      var finTime = 0,key;
	      for( key in Seed.training_queue['c'+ Cities.cities[i].id]) {
          var ttime = parseInt(Seed.training_queue['c'+ Cities.cities[i].id][key].eta)
		      var ttime2 = ttime - now
		      if(parseInt(finTime) >0) {
		        var ttime2 = parseInt(ttime2) - parseInt(finTime)
          }
		      if(parseInt(ttime2)<0) { finTime = parseInt(finTime) +0 } else { finTime=parseInt(finTime + Math.abs(ttime2)) }
		//alert( timestr(finTime))
        }
        row[i] = timestr(finTime) +'</b></span>';
      }
      str += _row ('TroopQ', row, true);
      
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var wall = {};
        getWallInfo (Cities.cities[i].id, wall);
        var totTime = 0;
	      var length = 0,key;
	      var finTime = 0,key;
	      for( key in Seed.fortify_queue['c'+ Cities.cities[i].id]) {
          var ttime = parseInt(Seed.fortify_queue['c'+ Cities.cities[i].id][key].eta)
		      var ttime2 = ttime - now
		      if(parseInt(finTime) >0) {
		        var ttime2 = parseInt(ttime2) - parseInt(finTime)
          }
		      if(parseInt(ttime2)<0) { finTime = parseInt(finTime) +0 } else { finTime=parseInt(finTime + Math.abs(ttime2)) }
		//alert( timestr(finTime))
        }
        row[i] = timestr(finTime);
      }    
      str += _row ('WallQue', row, true);
      str += '</TABLE>'
      str += '<TABLE><TR><TD class=xtab colspan=4 width=81><BR><INPUT type=CHECKBOX id=ptoverOriginal'+ (Options.includeCity?' CHECKED':'') +'>Show Troops</td>';
      str += '</td><TD class=xtab colspan=4 width=81><BR><INPUT type=CHECKBOX id=ptfreeSpace'+ (Options.showSpace?' CHECKED':'') +'>Show Wall Space</td>';
//      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +' DISABLED>Show Marching Troops/Resources</td></tr>';
//      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptoverIncTraining'+ (Options.includeTraining?' CHECKED':'') +' DISABLED>Show troops training in city</td></tr>';
//      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptoverIncTrainingTotal'+ (Options.includeTrainingTotal?' CHECKED':'') +' DISABLED>Show troops training totals</td></tr>';
// backup      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptOverOver'+ (Options.overviewAllowOverflow?' CHECKED':'') +'>Allow width overflow \
      str += '</td><TD class=xtab colspan=4 width=81><BR><INPUT type=CHECKBOX id=ptOverOver'+ (Options.overviewAllowOverflow?' CHECKED':'') +'>Allow width overflow \
         &nbsp; &nbsp; FONT SIZE: '+ htmlSelector ({9:9, 10:10, 11:11, 12:12}, Options.overviewFontSize, 'id=ptoverfont') +'</td></tr>';
      str += "</table></div>";
	  str+= 'GW Lazy Tools Version : ' + Version;
      Tabs.Overview.cont.innerHTML = str;
      document.getElementById('ptoverOriginal').addEventListener('click', e_clickEnableTroops, false);
      document.getElementById('ptfreeSpace').addEventListener('click', e_clickEnableWall, false);
//      document.getElementById('idCheck').addEventListener('click', e_clickEnableMarch, false);
//      document.getElementById('ptoverIncTraining').addEventListener('click', e_clickEnableTraining, false);
//      document.getElementById('ptoverIncTrainingTotal').addEventListener('click', e_clickEnableTrainingTotal, false);
      document.getElementById('ptOverOver').addEventListener('click', e_allowWidthOverflow, false);
      document.getElementById('ptoverfont').addEventListener('change', e_fontSize, false);
//DebugTimer.display ('Draw Overview');    
    } catch (e){
      Tabs.Overview.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);

    function e_clickEnableTroops (){
      var t = Tabs.Overview;
      Options.includeCity = document.getElementById('ptoverOriginal').checked;
      t.show ();
    }
    function e_clickEnableWall (){
      var t = Tabs.Overview;
      Options.showSpace = document.getElementById('ptfreeSpace').checked;
      t.show ();
    }
    function e_clickEnableMarch (){
      var t = Tabs.Overview;
      Options.includeMarching = document.getElementById('idCheck').checked;
      t.show ();
    }
    function e_clickEnableTraining (){
      var t = Tabs.Overview;
      Options.includeTraining = document.getElementById('ptoverIncTraining').checked;
      t.show ();
    }
    function e_clickEnableTrainingTotal (){
      var t = Tabs.Overview;
      Options.includeTrainingTotal = document.getElementById('ptoverIncTrainingTotal').checked;
      t.show ();
    }

    function e_fontSize(evt){
      document.getElementById('overMainDiv').style.fontSize = evt.target.value +'px'; 
      Options.overviewFontSize = evt.target.value;
    }

    function e_allowWidthOverflow (evt){
      var tf = document.getElementById('ptOverOver').checked;
      Options.overviewAllowOverflow = tf;
      if (tf)
        t.cont.style.overflowX = 'visible';
      else
        t.cont.style.overflowX = 'auto';
    }

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

/****************************  Build Implementation  ******************************
 TODO:
	 visu directly in the game of build queue elements
	 <span class="leveltag" style="left:60px;">10</span>
	 more todos within the code
 */
Tabs.build = {
    tabOrder: 1,
    tabLabel: 'Build',
    myDiv: null,
    timer: null,
    buildTab: null,
    koc_buildslot: null,
	koc_buildmenu: null,
    currentBuildMode: null,
    buildStates: [],
	loaded_bQ: [],
	lbQ: [],

    init: function(div){
        var t = Tabs.build;
        t.myDiv = div;
        t.koc_buildslot = unsafeWindow.Building.buildSlot; //save original koc function
        t.koc_buildmenu = unsafeWindow.Building.buildMenu; //save original koc function
        t.currentBuildMode = "build";
		t.buildStates = {
            running: false,
			help: false,
        };
        t.readBuildStates();
        
        for (var i = 0; i < Cities.cities.length; i++) {
            t["bQ_" + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, '[]'));
			if (typeof t["bQ_" + Cities.cities[i].id] == 'undefined' || (t["bQ_" + Cities.cities[i].id]) == "") {
				t["bQ_" + Cities.cities[i].id] = [];
			}
        }
        
        var m = '<DIV id=pbBuildDivF class=ptStat>BUILD FUNCTIONS</div><TABLE id=pbbuildfunctions width=100% height=0% class=ptTab><TR>';
        if (t.buildStates.running == false) {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = OFF"></td>';
        }
        else {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = ON"></td>';
        }
		m += '<TD><INPUT id=pbBuildMode type=submit value="Build Mode = OFF"></td>';
		m += '<TD>Build Type: <SELECT id="pbBuildType">\
				<OPTION value=build>level up</option>\
				<OPTION value=max>level max</option>\
				<OPTION value=destruct>destruct</option>\
				</select></td>';
		//m += '<TD><INPUT id=pbHelpRequest type=checkbox DISABLED '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>Ask for help?</td>';
		m += '</tr></table></div>';
        m += '<DIV id=pbBuildDivQ class=ptStat>BUILD QUEUES</div><TABLE id=pbbuildqueues width=100% height=0% class=ptentry><TR>';
		for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><B>' + Cities.cities[i].name + '</b></center></td>';
        }
		m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value="Show"></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD>Qc:</td><TD id=pbbuildcount_' + Cities.cities[i].id + '>' + t["bQ_" + Cities.cities[i].id].length + '</td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            t['totalTime_' + Cities.cities[i].id] = 0;
            cbQ = t["bQ_" + Cities.cities[i].id];
            if (typeof cbQ != 'undefined') {
                for (var j = 0; j < cbQ.length; j++) {
                    t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].id]) + parseInt(cbQ[j].buildingTime);
                }
                timestring = timestr(t['totalTime_' + Cities.cities[i].id]);
            }
            m += '<TD>Tt:</td><TD id=pbbuildtotal_' + Cities.cities[i].id + '>' + timestring + '</td>';
        }
        m += '</tr></table><SPAN class=boldRed id=pbbuildError></span>';
        t.myDiv.innerHTML = m;
        
        for (var i = 0; i < Cities.cities.length; i++) {
            var cityId = Cities.cities[i].id;
            var btnName = 'pbbuild_' + cityId;
            addQueueEventListener(cityId, btnName);
			t.showBuildQueue(cityId, false);
        }

        t.e_autoBuild(); //start checking if we can build someting
        
		document.getElementById('pbBuildType').addEventListener('change', function(){t.setBuildMode(this.value);}, false);
		document.getElementById('pbBuildRunning').addEventListener('click', function(){
            t.toggleStateRunning(this);
        }, false);
		document.getElementById('pbBuildMode').addEventListener('click', function(){
            t.toggleStateMode(this);
        }, false);
		// document.getElementById('pbHelpRequest').addEventListener ('change', function (){
        // t.buildStates.help = (document.getElementById('pbHelpRequest').checked);
        // t.saveBuildStates();
        // }, false);
   	    
		window.addEventListener('unload', t.onUnload, false);
        
        function addQueueEventListener(cityId, name){
            document.getElementById(name).addEventListener('click', function(){
                t.showBuildQueue(cityId, true);
            }, false);
        }
    },
	setBuildMode: function (type) {
	    var t = Tabs.build;
		t.currentBuildMode = type;
	},	
    e_autoBuild: function(){
      var t = Tabs.build;
	    document.getElementById('pbbuildError').innerHTML = '';
      if (t.buildStates.running == true) {
          var now = unixTime();
		  //logit ('Seed.queue_con: (now='+ now +')\n'+ inspect (Seed.queue_con, 3));
          for (var i = 0; i < Cities.cities.length; i++) {
              var cityId = Cities.cities[i].id;
              var isBusy = false;
              var qcon = Seed.queue_con["city" + cityId];
              if (matTypeof(qcon)=='array' && qcon.length>0) {
                if (parseInt(qcon[0][4]) > now)
                  isBusy = true;
                else
                  qcon.shift();   // remove expired build from queue        
              }              
			  //logit ('City #'+ (i+1) + ' : busy='+ isBusy);               
              if (isBusy) {
                  //TODO add info of remaining build time and queue infos
              } else {
                 if (t["bQ_" + cityId].length > 0) { // something to do?
                 	 var bQi = t["bQ_" + cityId][0];   //take first queue item to build
					 t.doOne(bQi);;
					 //setTimeout(t.e_autoBuild, 10000); //should be at least 10
					 //return; // we need to make sure that there is enough time for each ajax request to not overwrite the vaule that are needed by the next run
                 }
              }       	
            }
          }
		setTimeout(t.e_autoBuild, 10000); //should be at least 10
    },  
    doOne : function (bQi){
		var t = Tabs.build;
		var currentcityid = parseInt(bQi.cityId);
		var cityName = t.getCityNameById(currentcityid);
		var time = parseInt(bQi.buildingTime);
		var mult = parseInt(bQi.buildingMult);
		var attempt = parseInt(bQi.buildingAttempt);

		
		//mat/KOC Power Bot: 49 @ 19:41:45.274: Pos: 6 Type: 13 Level: 8 Id: 1523749
		
		var mode = bQi.buildingMode;
		//  var mode = "build"; //FOR DEBUG
		
		var citpos = parseInt(bQi.buildingPos);
		//  var citpos = 6; //FOR DEBUG
		
		if (Seed.buildings['city' + currentcityid]["pos" + citpos] != undefined && Seed.buildings['city' + currentcityid]["pos" + citpos][0] != undefined) {	
			var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
			var bdgid = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][0]);
			//  var bdgid = 13; //FOR DEBUG
			
			var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
			var curlvl = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][1]);
			//  var curlvl = 8; //FOR DEBUG

			var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
			var bid = parseInt(Seed.buildings["city" + currentcityid]["pos" + citpos][3]);
			//  var bid = 1523749; //FOR DEBUG
									
			if (curlvl > 8 && mode == 'build') {
				t.cancelQueueElement(0, currentcityid, time, false);
				logit("Queue item deleted: Building Level equals 9 or higher!!!");
				return;
			};
			if (isNaN(curlvl)) {
				t.cancelQueueElement(0, currentcityid, time, false);
				logit("Found no correct value for current building!!!!");
				return;
			}
			if (l_bdgid != bdgid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				logit("Building Type does not match!!!!");
				return;
			}
			if (l_bid != bid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				logit("Building ID does not match!!!!");
				return;
			}
			if (l_curlvl < curlvl) {
					t.cancelQueueElement(0, currentcityid, time, false);
					logit("Queue item deleted: Buildinglevel is equal or higher!!!");
					return;
			}
			if (l_curlvl > curlvl && mode == 'build') {
					t.requeueQueueElement(bQi);
					return;
			}

			if (mode == 'destruct') {
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = currentcityid;
				params.bid = "";
				params.pos = citpos;
				params.lv = curlvl - 1;
				if (curlvl >= 1) {
					params.bid = bid;
				}
				params.type = bdgid;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "destruct.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function(rslt){
						if (rslt.ok) {
							logit("Destructing " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " at " + cityName, true);
							Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
							if (params.cid == unsafeWindow.currentcityid)
								unsafeWindow.update_bdg();
							// if (document.getElementById('pbHelpRequest').checked == true)
								// t.bot_gethelp(params.bid, currentcityid);
							t.cancelQueueElement(0, currentcityid, time, false);
						} else {
							var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
							t.requeueQueueElement(bQi);
							document.getElementById('pbbuildError').innerHTML = errmsg;
							logit(errmsg, true);
						}
					},
					onFailure: function(){
						document.getElementById('pbbuildError').innerHTML = "Connection Error while destructing! Please try later again";
					}
				})
			}
			if (mode == 'build') {
				var invalid = false;
				var chk = unsafeWindow.checkreq("b", bdgid, curlvl); //check if all requirements are met
				for (var c = 0; c < chk[3].length; c++) {
					if (chk[3][c] == 0) {
						invalid = true;
					}
				}
				if (invalid == false) {							
					var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
					params.cid = currentcityid;
					//params.bid = "";
					params.pos = citpos;
					params.lv = curlvl + 1;
					if (params.lv > 9){ //make sure that no level 10+ is built
						t.cancelQueueElement(0, currentcityid, time, false);
						logit("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!");
						return;
					}
					if (params.lv > 1) {
						params.bid = bid;
					}
					params.type = bdgid;
					
					new MyAjaxRequest(unsafeWindow.g_ajaxpath + "construct.php" + unsafeWindow.g_ajaxsuffix, {
						method: "post",
						parameters: params,
						onSuccess: function(rslt){
							if (rslt.ok) {
								logit("Building " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " Level " + params.lv + " at " + cityName, true);								
								Seed.resources["city" + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][1]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][2]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][3]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][4]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec5[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][5]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec6[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][6]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec7[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][7]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec8[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][8]) * mult * 3600;
								Seed.queue_con["city" + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(),  unsafeWindow.unixtime() + time, 0, time, citpos]);						
								if (params.cid == unsafeWindow.currentcityid)
									unsafeWindow.update_bdg();
								// if (document.getElementById('pbHelpRequest').checked == true)
									// t.bot_gethelp(params.bid, currentcityid);
								t.cancelQueueElement(0, currentcityid, time, false);
							} else {
								var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
								if (rslt.error_code == 103) { // building has already the target level => just  delete
									t.cancelQueueElement(0, currentcityid, time, false);
									logit("Queue item deleted: Building at this Level already exists or build process already started!");
								} else {
									t.requeueQueueElement(bQi);
									document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name +': '+ errmsg + " Item was requeued. Check for retry count.";
								}
								logit(errmsg);
							}
					},
						onFailure: function(){
							document.getElementById('pbbuildError').innerHTML = "Connection Error while building! Please try later again";
						}
					});
				} else {
					t.requeueQueueElement(bQi); // requeue item if check is invalid
				}
			}
		} else {
			t.cancelQueueElement(0, currentcityid, time, false);
			logit("Queue item deleted: Building does not exist!!!");
		}
	},
	requeueQueueElement: function (bQi) {
	    var t = Tabs.build;
		var cityId = bQi.cityId;
		var buildingPos = parseInt(bQi.buildingPos);
		var buildingId = parseInt(bQi.buildingId);
		var buildingLevel = parseInt(bQi.buildingLevel);
		var buildingType = parseInt(bQi.buildingType);
		var buildingTime = parseInt(bQi.buildingTime);
		var buildingMult = parseInt(bQi.buildingMult);
		var buildingAttempts = parseInt(bQi.buildingAttempts);
		var buildingMode = bQi.buildingMode;
		
		t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts + 1, buildingMult, buildingMode); // requeue item
		t.cancelQueueElement(0, cityId, buildingTime, false); // delete Queue Item
	},
    show: function(){
		var t = Tabs.build;
    },
    bot_buildslot: function(c, a){
        var t = Tabs.build;
		var cityId = t.getCurrentCityId();
        var buildingPos   = c;
        var buildingType  = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][0]);
        var buildingLevel = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
		var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
		if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Type: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
  		var buildingAttempts = 0;
		var loaded_bQ = t["bQ_" + cityId];
		if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
			var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
		} else {
			var current_construction_pos = "";
		}
		if (loaded_bQ.length == 0 && current_construction_pos != "" ) { //check anyway if there is currently build in progess for this specific building
			if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
		} else {
			if (current_construction_pos != "" && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
			for (var i = 0; i < loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
				var loadedCity = loaded_bQ[i].cityId;
				var loadedSlot = loaded_bQ[i].buildingPos;
				if (loadedSlot == buildingPos && loadedCity == cityId) {
					buildingLevel += 1;
				}
				if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { // check if destrcution is already in queue
					t.modalmessage('Destruction already in Queue!');
					return;
				}
			}
		}
        if (t.currentBuildMode == "build") {
		    if (buildingLevel >= 9) {
                t.modalmessage('Due to building requirements (DI), buildings above level 9\nshould be manualy built.');
                return;
            }
            var buildingMode = "build";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
        if (t.currentBuildMode == "max") {
            var buildingMode = "build";
			for (var bL = buildingLevel; bL <9; bL++) {
				var queueId = loaded_bQ.length;
				var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
				var buildingMult = result[0];
				var buildingTime = result[1];
				queueId = queueId ;
				t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
				t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
			}
        }
        if (t.currentBuildMode == "destruct") {
            var buildingMode = "destruct";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }

    },
	
	calculateQueueValues: function (cityId, buildingLevel, buildingType, buildingMode) {
	    var t = Tabs.build;
		var now = unixTime();
		if (buildingMode == 'build') {
			var buildingMult = Math.pow(2, buildingLevel);
        } 
		if (buildingMode == 'destruct') {
			var buildingMult = Math.pow(2, buildingLevel - 2);
		}
		
        var buildingTime = unsafeWindow.constructionData["b" + buildingType].c[10] * buildingMult;
        if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
            buildingTime = 5;
        }
		
		if (buildingMode == 'build') {
			buildingTime = parseInt(buildingTime / (1 + unsafeWindow.General.politicsBonus() + unsafeWindow.Research.bonusForType(unsafeWindow.Constant.Research.CRANES)));
        } 
		if (buildingMode == 'destruct') {
			buildingTime = buildingTime / (1 + unsafeWindow.General.politicsBonus() + unsafeWindow.Research.bonusForType(unsafeWindow.Constant.Research.CRANES));
			if (buildingTime % 1 > 0) {
				buildingTime = parseInt(buildingTime);
			}
		}
		
		var result = new Array(buildingMult, buildingTime);
		return result;
	},

	bot_gethelp: function (f, currentcityid) {
	  var a = qlist = Seed.queue_con["city" + currentcityid];
	  var e = 0;
	  var d = 0;
	  for (var c = 0; c < a.length; c++) {
		if (parseInt(a[c][2]) == parseInt(f)) {
		  e = parseInt(a[c][0]);
		  d = parseInt(a[c][1]);
		  break
		}
	  }
	  var b = new Array();
	  b.push(["REPLACE_LeVeLbUiLdInG", d]);
	  b.push(["REPLACE_BuIlDiNgNaMe", unsafeWindow.buildingcost["bdg" + e][0]]);
	  b.push(["REPLACE_LeVeLiD", d]);
	  b.push(["REPLACE_AsSeTiD", f]);
	  var g = function(h, i) {
		unsafeWindow.continuation_95(h, i);
		if (!h) {
		  var j = d > 1 ? unsafeWindow.cm.SpeedUpType.upgrade : unsafeWindow.cm.SpeedUpType.build;
		  unsafeWindow.cm.ClientSideCookieManager.setCookie(j, false)
		}
	  };
	  unsafeWindow.common_postToProfile("95", unsafeWindow.Object.cloneFeed(unsafeWindow.template_data_95), unsafeWindow.Object.cloneFeed(unsafeWindow.actionlink_data_95), g, b)
	},
	addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
	var t = Tabs.build;
		var lbQ = t["bQ_" + cityId];
		lbQ.push({
            cityId: 			cityId,
            buildingPos:		buildingPos,
            buildingType: 		buildingType,
			buildingId: 		buildingId,
            buildingTime: 		buildingTime,
            buildingLevel: 		buildingLevel,
            buildingAttempts: 	buildingAttempts,
			buildingMult: 		buildingMult,
            buildingMode: 		buildingMode
        });
		t.modifyTotalTime(cityId, 'increase', buildingTime); //adjust total Time
	},
    modalmessage: function(message){
	    var t = Tabs.build;
        var timeout = 10000;
        var content = "autoclose after 10sec...<br><br>"
        content += message;
        unsafeWindow.Modal.showAlert(content);
        window.setTimeout('unsafeWindow.Modal.hideModal();', timeout);
    },
	modifyTotalTime: function (cityId, type, buildingTime) {
	    var t = Tabs.build;
		var element = document.getElementById('pbbuildcount_' + cityId);
		var currentCount = parseInt(element.innerHTML);
		if (type == "increase") {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] + buildingTime;
			var currentCount = currentCount + 1;
		}
		if (type == "decrease") {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] - buildingTime;
			var currentCount = currentCount - 1;
		}
		element.innerHTML = currentCount;
		document.getElementById('pbbuildtotal_' + cityId).innerHTML = timestr(t['totalTime_' + cityId]);
	},
    hide: function(){
        var t = Tabs.build;
		//unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
    },
    onUnload: function(){
        var t = Tabs.build;
        for (var i = 0; i < Cities.cities.length; i++) {
            //t["bQ_" + Cities.cities[i].id] = []; //clean up if needed
            GM_setValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, JSON2.stringify((t["bQ_" + Cities.cities[i].id])));
        }
        t.saveBuildStates();
    },
    _addTab: function(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode){
		var t = Tabs.build;
        var row = document.getElementById('pbCityQueueContent').insertRow(0);
        row.vAlign = 'top';
        row.insertCell(0).innerHTML = queueId;
        if (buildingMode == "destruct") {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_att.png">';
        }
        else {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_prod.png">';
        }
        row.insertCell(2).innerHTML = unsafeWindow.buildingcost['bdg' + buildingType][0];
        row.insertCell(3).innerHTML = timestr(buildingTime);
		if (buildingMode == "destruct") {
			row.insertCell(4).innerHTML = 0;
        } else {
			row.insertCell(4).innerHTML = buildingLevel + 1; // => target Level
		}
		row.insertCell(5).innerHTML = buildingAttempts;
        row.insertCell(6).innerHTML = '<input class="button30 ptButton20" type=button id="queuecancel_' + queueId + '" value=Cancel></input>';
        document.getElementById('queuecancel_' + queueId).addEventListener('click', function(){
            t.cancelQueueElement(queueId, cityId, buildingTime, true);
        }, false);
    },
    cancelQueueElement: function(queueId, cityId, buildingTime, showQueue){
        var t = Tabs.build;
        var queueId = parseInt(queueId);
        t["bQ_" + cityId].splice(queueId, 1);
        t.modifyTotalTime(cityId, 'decrease', buildingTime); //adjust total Time	
        
        if (showQueue == true) {
            t.showBuildQueue(cityId, false);
        }
    },
    showBuildQueue: function(cityId, focus){
	    var t = Tabs.build;
	    clearTimeout (t.timer);
        var popBuildQueue = null;
        var cityName = t.getCityNameById(cityId);
        if (t.popBuildQueue == null) {
            t.popBuildQueue = new CPopup('pbbuild_' + cityId, 0, 0, 350, 500, true, function() {clearTimeout (t.timer);});
        }
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityQueueContent">';       
        t.popBuildQueue.getMainDiv().innerHTML = '</table></div>' + m;
        t.popBuildQueue.getTopDiv().innerHTML = '<TD width="200px"><B>Build Queue of ' + cityName + '</b></td><TD><INPUT id=pbOptimizeByTime type=submit value="Optimize by Time"></td>';
        t.paintBuildQueue(cityId);
        if (focus)
          t.popBuildQueue.show(true);
		document.getElementById('pbOptimizeByTime').addEventListener('click', function(){t.clearBuildQueue();t.paintBuildQueue(cityId, true);}, false);
		t.timer = setTimeout (function() {t.showBuildQueue(cityId, false)}, 5000);  
	},
    paintBuildQueue: function(cityId, optimize){
        var t = Tabs.build;
        var lbQ = t["bQ_" + cityId];
		if (optimize == true) {
			lbQ.sort(function(a,b){return a.buildingTime - b.buildingTime});
		}
		t["bQ_" + cityId] = lbQ;
		for (var i = 0; i < lbQ.length; i++) {
			var queueId = i;
			t._addTab(queueId, lbQ[i].cityId, lbQ[i].buildingType, lbQ[i].buildingTime, lbQ[i].buildingLevel, lbQ[i].buildingAttempts, lbQ[i].buildingMode);
        }
    },
	clearBuildQueue: function() {
	    var t = Tabs.build;
		var table = document.getElementById('pbCityQueueContent');
		var rows = table.rows;
		while(rows.length)
			table.deleteRow(rows.length-1);
	},
    getCurrentCityId: function(){ // TODO maybe move as global function to the core application
        if (!unsafeWindow.currentcityid)
            return null;
        return unsafeWindow.currentcityid;
    },
    saveBuildStates: function(){
		var t = Tabs.build;
        var serverID = getServerId();
        GM_setValue('buildStates_' + serverID, JSON2.stringify(t.buildStates));
    },
    readBuildStates: function(){
        var t = Tabs.build;
        var serverID = getServerId();
        s = GM_getValue('buildStates_' + serverID);
        if (s != null) {
            states = JSON2.parse(s);
            for (k in states)
                t.buildStates[k] = states[k];
        }
    },
    toggleStateRunning: function(obj){
		var t = Tabs.build;
        if (t.buildStates.running == true) {
            t.buildStates.running = false;
            t.saveBuildStates();            obj.value = "Auto Build = OFF";
        }
        else {
            t.buildStates.running = true;
            t.saveBuildStates();
            obj.value = "Auto Build = ON";
        }
    },
    toggleStateMode: function(obj){
		var t = Tabs.build;
        if (obj.value == 'Build Mode = OFF') {
			unsafeWindow.Building.buildSlot = t.bot_buildslot; // overwrite original koc function
			unsafeWindow.Building.buildMenu = t.bot_buildslot; // overwrite original koc function
			// var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
			// if(guardian.length >0)
				// guardian[0].addEventListener('click', t.bot_buildguardian, false);
            obj.value = "Build Mode = ON";
        }
        else {
			unsafeWindow.Building.buildSlot = t.koc_buildslot; // restore original koc function
			unsafeWindow.Building.buildMenu = t.koc_buildmenu; // restore original koc function
			// var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
			// if(guardian.length >0)
				// guardian[0].removeEventListener('click', t.bot_buildguardian, false);
			obj.value = "Build Mode = OFF";
        }
    },
	getCityNameById: function (cityId) {
    return Cities.byID[cityId].name;  	
	},
}

/****************************  Generals Tab ******************************/

Tabs.Generals = {
  tabOrder : 1,
  cont : null,
  displayTimer : null,

  Generals : function (){
  },

  init : function (div){
    this.cont = div;
  },

  hide : function (){
    clearTimeout (Tabs.Generals.displayTimer);
  },
  
  show : function (){
    var rownum = 0;
    var t = Tabs.Generals;

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
    
    function parseNaN (n) {
      x = parseInt(n,10);
      if (isNaN(n)) 
        return 0;
      return x;
    }
    
//DebugTimer.start(); 
    try {
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
      str = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;">';
             
      str += "<DIV id=overMainDiv style='font-size:"+ Options.overviewFontSize +"px'><TABLE class=ptTabOverview cellpadding=0 cellspacing=0></td>";
      str += "<TD width=100><B>City names:"
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=100><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>' +"</td>";
      }
      str += "</tr><TD width=81>Gold:<BR>Tax:<BR>Revenue:<BR>Wages:<BR>Gold Left:<BR><BR><B>Resource(1%):<BR>Army(0.5%):<BR>Research(0.5%):<BR>Build(0.5%):</B>";
      Gold=[];
      Tax=[];
      Revenue=[];
      for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        Gold[i] = parseNaN(Seed.citystats[cityID].gold[0]);
        Tax[i] = Seed.citystats[cityID].gold[1];
        Revenue[i]  = parseInt(parseInt(Seed.citystats["city" + Cities.cities[i].id]["pop"][0]) * Tax[i] / 100 + "n");  // Current  population
      }      
      for(i=0; i<Cities.numCities; i++) {
        var officer = "";
        var timeLeft = "----"       
        officers = Seed.knights["city" + Cities.cities[i].id];
        if (officers) {
          var RESOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].resourcefulnessKnightId];
          var TRNOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].combatKnightId];
          var BLDOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].politicsKnightId];
          var RDOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].intelligenceKnightId];
          if (RESOfficer)
            var RESOfficer = parseNaN(RESOfficer.knightLevel);
          else
            var RESOfficer = 0; 
          if (TRNOfficer)
            var TRNOfficer = parseNaN(TRNOfficer.knightLevel);
          else
            var TRNOfficer = 0; 
          if (RDOfficer)
            var RDOfficer = parseNaN(RDOfficer.knightLevel);
          else
            var RDOfficer = 0; 
          if (BLDOfficer)
            var BLDOfficer = parseNaN(BLDOfficer.knightLevel);
          else
            var BLDOfficer = 0; 
          var Wage = (RESOfficer+TRNOfficer+RDOfficer+BLDOfficer)*20;
          if (Revenue[i]< Wage)
            timeLeft = timestrShort(Gold[i] / (Wage - Revenue[i]) * 3600  );
        }
        str += "<TD width=81>" + addCommas(Gold[i]) + "<BR>"+ Tax[i] + "%<BR>"+ addCommas(Revenue[i]) + "<BR>"+ addCommas(Wage) + "<BR>"+ timeLeft + "<BR><BR>"+ RESOfficer + "%<BR>" + TRNOfficer/2 +'%<BR>'+ RDOfficer/2 +'%<BR>'+ BLDOfficer/2 +"%</td>";
      }
//      str += "</TABLE>";
        str += '<TR><TD colspan=12><BR></td></tr>';  
//	    str += '<TABLE class=ptTabOverview cellpadding=0 cellspacing=0></td><TR valign=top align=right><TD></td><TD style=\'background: #ffc\'></td>';  
//    Generals      
      rows = [];
      rows[0] = [];
      var maxunit=20;
  	  for (r=1; r<maxunit; r++){
        rows[r] = [];
	 	    for(i=0; i<Cities.numCities; i++) {
            rows[r][i] = 0;
        }
	    }
//      for(i=0; i<Cities.numCities; i++) {
//        var totWilds = 0;
//        dat = Seed.wilderness['city'+ Cities.cities[i].id];
//        if (dat!=null && matTypeof(dat)=='object')
//          for (k in dat)
//            ++totWilds;
//        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
//		    if(castle == 11) castle = 12;
//        if (totWilds < castle)
//          row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';
//        else
//          row[i] = totWilds +'/'+ castle;
//      }

//      for(i=0; i<Cities.numCities; i++) {
//        for(k=0; k<Generals.Num; i++) {
//              var GName=Generals[k].name;
//              str += "<TD width=81>"+ GName +'%<BR>'+ TRNOfficer/2 +'%<BR>'+ RDOfficer/2 +'%<BR>'+ BLDOfficer/2 +"%</td>";
 //             rows[r][i] = parse(Seed.knights["city" + Cities.cities[i].id].name);
//             }
//      }
      str += '<TR><TD colspan=12><BR></td></tr>';
      
//	  http://apps.facebook.com/globalwarfaregame/?page=claimStuff&in=3036528&lp=14&kid=27485&cid=67155&ins=30
      Tabs.Generals.cont.innerHTML = str;
//DebugTimer.display ('Draw Generals');    
    } catch (e){
      Tabs.Generals.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);

  },
};

/********************************* Queue Tab *************************************/

Tabs.Queue = {
  tabOrder : 1,
  cont : null,
  displayTimer : null,

  Queue : function (){
  },

  init : function (div){
    this.cont = div;
  },

  hide : function (){
    clearTimeout (Tabs.Queue.displayTimer);
  },
  
  show : function (){
    var rownum = 0;
    var t = Tabs.Queue;

    clearTimeout (t.displayTimer);

    function _row (name, row){
      if (rownum++ % 2)
        style = '';
      else
        style = ' style = "background: #e8e8e8"';
      var tot = 0;
      var m = [];
      for (i=0; i<row.length; i++)
        tot += row[i];    
      if (tot){
        m.push ('<TR style="background: #fff" align=right');
        m.push (style);
        m.push ('><TD');
        m.push (style);
        m.push ('><B>');
        m.push (name);
        m.push (' &nbsp; </td>');
      }
      else
      {
        rownum--
      }
      
      if (tot){
        for (i=0; i<row.length; i++){
          m.push ('<TD');
          m.push (style);
          m.push ('>');     
          m.push (addCommas(row[i]));
          m.push ('</td>');
        }
        m.push ('</tr>');
      }
      return m.join('');
    }
    
    try {
      dt = new Date ();
      rows = [];
      row = [];
      rows[0] = [];
      rows[10] = [];
      var now = unixTime();
      var maxunit=20;
	    for (r=1; r<maxunit; r++){
        rows[r] = [];
		    for(i=0; i<Cities.numCities; i++) {
          rows[r][i] = 0;
        }
	    } 
      
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
      str = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;">';             
      str += "<DIV id=overMainDiv style='font-size:"+ Options.overviewFontSize +"px'><TABLE class=ptTabOverview cellpadding=0 cellspacing=0></td>";
      str += "<TD width=81><B>City names:"
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>' +"</td>";
      }

// itte

      for(i=0; i<Cities.numCities; i++) {
	      for( key in Seed.training_queue['c'+ Cities.cities[i].id]) {            
            rows[parseInt(Seed.training_queue['c'+ Cities.cities[i].id][key].type)][i] = rows[parseInt(Seed.training_queue['c'+ Cities.cities[i].id][key].type)][i] + parseInt(Seed.training_queue['c'+ Cities.cities[i].id][key].quant);
          }
      }
        rownum = 0;
	      str += _row (unsafeWindow.arStrings.unitName['u1'], rows[1]);
        str += _row (unsafeWindow.arStrings.unitName['u5'], rows[5]);
        str += _row (unsafeWindow.arStrings.unitName['u6'], rows[6]);
        str += _row (unsafeWindow.arStrings.unitName['u4'], rows[4]);
        str += _row (unsafeWindow.arStrings.unitName['u18'], rows[18]);
        str += _row (unsafeWindow.arStrings.unitName['u7'], rows[7]);
        str += _row (unsafeWindow.arStrings.unitName['u8'], rows[8]);
        str += _row (unsafeWindow.arStrings.unitName['u17'], rows[17]);
        str += _row (unsafeWindow.arStrings.unitName['u9'], rows[9]);
        str += _row (unsafeWindow.arStrings.unitName['u11'], rows[11]);
        str += _row (unsafeWindow.arStrings.unitName['u10'], rows[10]);
        str += _row (unsafeWindow.arStrings.unitName['u12'], rows[12]);
        str += _row (unsafeWindow.arStrings.unitName['u19'], rows[19]);
        str += _row (unsafeWindow.arStrings.unitName['u16'], rows[16]);
        str += _row (unsafeWindow.arStrings.unitName['u13'], rows[13]);
        str += _row (unsafeWindow.arStrings.unitName['u15'], rows[15]);

      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
	      var length = 0,key;
	      var finTime = 0,key;
	      for( key in Seed.training_queue['c'+ Cities.cities[i].id]) {
          var ttime = parseInt(Seed.training_queue['c'+ Cities.cities[i].id][key].eta)
		      var ttime2 = ttime - now
		      if(parseInt(finTime) >0) {
		        var ttime2 = parseInt(ttime2) - parseInt(finTime)
          }
		      if(parseInt(ttime2)<0) { finTime = parseInt(finTime) +0 } else { finTime=parseInt(finTime + Math.abs(ttime2)) }
        }
        row[i] =  timestr(finTime) +'</b></span>';
      }
      str += _row ('TroopQ', row);      
      str += '<TR><TD colspan=12><BR></td></tr>';
      for (r=1; r<6; r++){
		    for(i=0; i<Cities.numCities; i++) {
          rows[r][i] = 0;
        }
	    } 
      for(i=0; i<Cities.numCities; i++) {
	      for( key in Seed.fortify_queue['c'+ Cities.cities[i].id]) {
              var x = parseInt(Seed.fortify_queue['c'+ Cities.cities[i].id][key].type)- 51;
//               rows [1][i]=x;             
//              if (x>0)
              if (parseInt(Seed.fortify_queue['c'+ Cities.cities[i].id][key].status)==2 && x>0)
                rows[x][i] = rows[x][i] + parseInt(Seed.fortify_queue['c'+ Cities.cities[i].id][key].quant);
          }
      }
      
      
	    str += _row ('Mines:', rows[2]);
      str += _row ('Stingers:', rows[1]);
//	    str += _row ('Disposable:', rows[5]);
      str += _row ('Artillery:', rows[3]);
      str += _row ('Airguns:', rows[4]);
//      str += _row ('Stable:', rows[6]);
      
      for(i=0; i<Cities.numCities; i++) {
        var wall = {};
        getWallInfo (Cities.cities[i].id, wall);
        var totTime = 0;
	      var length = 0,key;
	      var finTime = 0,key;
	      for( key in Seed.fortify_queue['c'+ Cities.cities[i].id]) {
          var ttime = parseInt(Seed.fortify_queue['c'+ Cities.cities[i].id][key].eta)
		      var ttime2 = ttime - now
		      if(parseInt(finTime) >0) {
		        var ttime2 = parseInt(ttime2) - parseInt(finTime)
          }
		      if(parseInt(ttime2)<0) { finTime = parseInt(finTime) +0 } else { finTime=parseInt(finTime + Math.abs(ttime2)) }
        }
        row[i] = timestr(finTime);
      }    
      str += _row ('WallQue', row, true);
          
    Tabs.Queue.cont.innerHTML = str;
//DebugTimer.display ('Draw Queue');    
    } catch (e){
      Tabs.Queue.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);


  },
};


/********************************* Search Tab *************************************/



/************************ error Killer ************************/
var ErrorKiller  = {
  saveFunc : null,
  init : function (tf){
  if (firefoxVersion.substring(0,4) == '4.0b')  // bug in firefox 4.0b10 causes syntax error with: "var func = eval ('function (){}');"
      return;
    ErrorKiller.saveFunc = unsafeWindow.Modal.showModalUEP;
    ErrorKiller.setEnable (tf);
  },
  setEnable : function (tf){
      unsafeWindow.Modal.showModal525 = eval ('function (a,b,c) {actionLog ("Blocked error popup");}');
  },
}

/*********************************** Info tab ***********************************/
Tabs.Info = {
  tabOrder : 20,
  cont : null,
  tabDisabled : !ENABLE_INFO,

  init : function (div){
    var t = Tabs.Info;
	t.cont = div;
	var str ='<DIV>';
      if (DEBUG_BUTTON) {
        str += '<BR><INPUT id=ptButDebug type=submit name="SEED" value="DEBUG">';
/*
    try {
      for(i=0; i<Cities.numCities; i++) {
        var officer = "";
        var timeLeft = "----"       
        officers = Seed.knights["city" + Cities.cities[i].id];
        if (officers) {
          var RESOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].resourcefulnessKnightId];
          var TRNOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].combatKnightId];
          var BLDOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].politicsKnightId];
          var RDOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].intelligenceKnightId];
          if (RESOfficer)
            var RESOfficer = parseNaN(RESOfficer.knightLevel);
          else
            var RESOfficer = 0; 
          if (TRNOfficer)
            var TRNOfficer = parseNaN(TRNOfficer.knightLevel);
          else
            var TRNOfficer = 0; 
          if (RDOfficer)
            var RDOfficer = parseNaN(RDOfficer.knightLevel);
          else
            var RDOfficer = 0; 
          if (BLDOfficer)
            var BLDOfficer = parseNaN(BLDOfficer.knightLevel);
          else
            var BLDOfficer = 0; 
          var Wage = (RESOfficer+TRNOfficer+RDOfficer+BLDOfficer)*20;
          if (Revenue[i]< Wage)
            timeLeft = timestrShort(Gold[i] / (Wage - Revenue[i]) * 3600  );
        }
        str += "<TD width=81>" + addCommas(Gold[i]) + "<BR>"+ Tax[i] + "%<BR>"+ addCommas(Revenue[i]) + "<BR>"+ addCommas(Wage) + "<BR>"+ timeLeft + "<BR><BR>"+ RESOfficer + "%<BR>" + TRNOfficer/2 +'%<BR>'+ RDOfficer/2 +'%<BR>'+ BLDOfficer/2 +"%</td>";
      }
//      str += "</TABLE>";
        str += '<TR><TD colspan=12><BR></td></tr>';  
*/
        str = str +'</div>';

        t.cont.innerHTML = str;
        document.getElementById('ptButDebug').addEventListener('click', function (){debugWin.doit()}, false);

/*    
    } catch (e){
      Tabs.Queue.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }         
      
*/    
      } // if debug      
  },

  hide : function (){
  },

  show : function (){
  },

}

/*********************************** Players TAB ***********************************/
/*
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

fetchTEST : function (pageNum, notify){    // as in alliance list, sorted by rank, 10 per page
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.pageNo = 1;
  params.numPerPage = 100;
  params.perPage = 100;
  params.results = 100;
  params.numResults = 100;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
logit ("ajax/allianceGetMembersInfo.php:\n"+ inspect (rslt, 5, 1));      
      notify (rslt);
    },
    onFailure: function (rslt) {
      notify ({errorMsg:'AJAX error'});
    },
  });
},
   init : function (div){
    var t = Tabs.AllianceList;
    t.cont = div;
    unsafeWindow.PTgetMembers = t.eventGetMembers;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpl = t.clickedPlayerLocator;
    unsafeWindow.PTpl2 = t.clickedPlayerLeaderboard2;
    unsafeWindow.PTalClickPrev = t.eventListPrev;
    unsafeWindow.PTalClickNext = t.eventListNext;
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;
    Lastlogin=0;
    t.show();
  },
 

  hide : function (){
  },
  
  show : function (){
    var t = Tabs.AllianceList;
    if (t.state == null){
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
           <TR><TD class=xtab></td><TD class=xtab> &nbsp;\
            </td>\
            <TD class=xtab><INPUT align=right id=idMyAllSubmit type=submit value="'+ getMyAlliance()[1] +'"/>\
             <TD class=xtab><span align=right <b>Model ETA with: </b></span></td>\
             <TD class=xtab ><div><select id="idFindETASelect">\
        <option value="0,250" > -- Select -- </option>\
        <option value="0,180" > Supply </option>\
        <option value="0,200" > Militia </option>\
        <option value="0,3000" > Scout </option>\
        <option value="0,300" > Pikeman </option>\
        <option value="0,275" > Swordsman </option>\
        <option value="0,250" > Archer </option>\
        <option value="1,1000" > Cavalry </option>\
        <option value="1,750" > Heavy Cavalry </option>\
        <option value="1,150" > Supply Wagon </option>\
        <option value="1,100" > Balista </option>\
        <option value="1,120" > Ram </option>\
        <option value="1,80" > Catapult </option>\
        </select></div>\
        </td></tr>\
         </table><span style="vertical-align:middle;" id=altInput></span></div><SPAN id=allListOut></span>';
      t.cont.innerHTML = m;
      document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
      document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
      document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
      document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
      document.getElementById('idMyAllSubmit').addEventListener ('click', t.showMyAlliance, false);
      document.getElementById('idFindETASelect').addEventListener ('click', t.handleEtaSelect, false);
      //document.getElementById('allGotoPage').disabled = true;
      document.getElementById('idFindETASelect').disabled = true;
      t.ModelCity=Cities.cities[0];
      t.curPage = 0;
      t.MaxPage = -1;
      t.state = 1;
    }
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
    t.playerList = rslt.matchedUsers;
    var uList = [];
    for (k in rslt.matchedUsers)
      uList.push (rslt.matchedUsers[k].userId);     
    t.fetchPlayerStatus (uList, function(r){t.eventGotPlayerOnlineList(r)});    
  },    
    
  eventGotPlayerOnlineList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>Showing players matching <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=100% align=center class=ptTab cellspacing=5>\
	  <TR style="font-weight:bold">\
	  <TD width=25%>Name</td><TD align=right width=15%>Power</td><TD width=15%> &nbsp; Online</td><TD width=15%>Facebook &nbsp;</td><TD width=75%>Lookup</td></tr>';
    var row=0;
    var cl='';
    for (k in t.playerList){
      var u = t.playerList[k];
      if (++row % 2)
        cl = 'class=ptOddrow ';
      else
        cl = '';
      m += '<TR '+ cl +'valign=top>\
	      <TD><SPAN onclick="PTpl(this, '+ u.userId +')"><A style="color:#1D0AF2">'+ u.genderAndName +'</a></td><TD align=right>'+ addCommasInt(u.might) +'</td>\
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed>ONLINE</span>":"") +'</td>\
          <div style="width:100%;filter:Glow(color=#F20A15, strength=12)">\
		  <TD align=center><A style="color:#1D0AF2" target="_tab" href="http://www.facebook.com/profile.php?id='+ u.fbuid +'">profile</a></div></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A style="color:#1D0AF2">details</a> &nbsp; <BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A style="color:#1D0AF2">last Login</a></span></td></tr>';
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
  clickedPlayerLocator : function (span, uid){
    var t = Tabs.AllianceList;
    t.fetchPlayerInfo2 (uid, function (r) {t.gotPlayerInfo2(r, span)});
  },  
  clickedPlayerGetLastLogin : function (span, uid){
     var t = Tabs.AllianceList;
     span.onclick = '';
     span.innerHTML = "fetching login date ...";
     t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
   },
  gotPlayerInfo2 : function (rslt, span) {
  var t = Tabs.AllianceList;
      if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Leaderboard:</b> Not found! (misted?)';
      return;
    }
    var myA = getMyAlliance ();
    t.dat = [];
    //logit ("gotPlayerLeaderboard2 -1 "+JSON2.stringify(rslt));
    var p = rslt.data;
    for(var k in rslt.data.cities) { alert(k) }
	t.fetchMapTiles("mcdonald")
        
    //for (var c=0; c<p.cities.length; c++){
      //    t.dat.push ([p.player.generalName, parseInt(p.player.power), 'xx', parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
        //       'xx', 'xx', p.cities[c].cityName, 0, 1,0,p.userId]);
        //}
		//alert(p.cities[1].progress)
        //t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
        //t.ModelCity=Cities.cities[0];
        //t.setEta();
       // t.fetchPlayerLastLogin (uid, function (r) {t.displayPlayer(p.allianceName,r)});
        //t.fetchPlayerLastLogin();
        //t.displayPlayer (p.allianceId);
  },

  /*gotPlayerLeaderboard : function (rslt, span){
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
    pStr = JSON2.stringify(p);
    logit (pStr);
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Leaderboard: </b></td><TD colspan=2> Might: '+ p.might  +' &nbsp; Alliance: '+ an +'</td></tr>'; 
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = ' &nbsp; created: ' + c.dateCreated.substr(0,10);
      m += '<TR><TD align=right><B>City #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName 
      +' (<a onclick="ptGotoMap ('+ c.xCoord +',' +c.yCoord+ ')">'+ c.xCoord +','+ c.yCoord +'</a>)</td><TD width=75%> &nbsp; level: '
        + c.tileLevel +' &nbsp; status: '+ cityStatusString (c.cityStatus) + created +'</td></tr>';
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
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD>Alliance: '+ a +' &nbsp; Cities: '
          + u.cities +' &nbsp; Population: '+ u.population +'</td></tr><TR><TD>Provinces: ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  eventMyAllianceSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    t.fetchAllianceMemberList (getMyAlliance()[0], null, t.eventGotMemberList);
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

  showMyAlliance : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> ...</center>';
    if (myA[0]!=0  ) {
       t.eventGetMembers(myA[0]);
    }
    else {
       document.getElementById('allListOut').innerHTML = 'You must be an alliance member to use this feature.';
    }
  },
  fetchPlayerInfo2 : function (uid, notify) { 
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.pid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getPlayerProfileData.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
    	},
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
  fetchMapTiles : function (cid, notify) {
    var t = Tabs.AllianceList;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	params.action = "show_all_players"
	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
	  alert(rslt)
		},
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
	  alert(rslt)
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
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "allianceGetSearchResults.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (myAid!=null && myAid>0)
          t.fetchMyAllianceInfo  (function (r){ combineResults (rslt, r, notify)});
        else
          notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchOtherAllianceInfo : function (pageNum, notify){    // as in alliance list, sorted by rank, 10 per page
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.pageNo = pageNum;
    params.cityId = unsafeWindow.currentcityid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "allianceGetOtherInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchMyAllianceInfo : function (notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "allianceGetInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchPlayerList : function (name, notify){  // at least 3 chars!! 
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.searchName = name;
    params.subType = "ALLIANCE_INVITE";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "searchPlayers.php" + unsafeWindow.g_ajaxsuffix, {
	 method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchPlayerInfo : function (uid, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.uid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  fetchPlayerStatus : function (uidArray, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = uidArray.join(',');
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getOnline.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
  fetchPlayerLastLogin : function (uid, notify){
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.pid = uid;
      new MyAjaxRequest(unsafeWindow.g_ajaxpath + "viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          notify (rslt);
        },
        onFailure: function (rslt) {
          notify ({errorMsg:'AJAX error'});
        },
      });
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
	    displayPlayer : function (allName,rslt){
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
            .xxtab{background-color:none; padding-left:5px; padding-right:5px;} </style>\
            <DIV class=ptstat ><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab>Alliance: '+ allName +'</td>\
            <TD class=xtab width=80% align=center>Last login: <SPAN id=lastlogin>'+  rslt.playerInfo.lastLogin+'</span></td><TD class=xtab align=right></td></tr></table></div>\
            <div style="max-height:470px; height:470px; overflow-y:auto;"><TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD style="overflow-y:hidden;">\
            <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Player</div></a></td>\
            <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Might</a></div></td>\
            <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Cities</a></div></td>\
            <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Rank</a></div></td>\
            <TD id=clickCol9 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Online</a></div></td>\
            <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>City Name</a></div></td>\
            <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Lvl</a></div></td>\
            <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coords</a></div></td>\
            <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance</a></div></td>\
            <TD id=clickCol10 onclick="PTalClickSort(this)" class=clickable><A><DIV>Eta</a></div></td>\
		    <TD class=clickable><A><DIV>Last Login</a></div></td></tr></thead>\
            <TBODY id=allBody style="background-color:#ffffff;"></tbody></table></div>\
            <DIV  width:100%; style="top:670px; left:0px; position:absolute; background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">';
    document.getElementById('allListOut').innerHTML = m;  //style="top:670px; left:0px; position:absolute;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Show distance from: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> &nbsp; Or, choose city: <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';
    t.reDisp();
 //   new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
  //  document.getElementById('idFindETASelect').disabled = false;
  },
  
  reDisp : function (){
    var t = Tabs.AllianceList;
    function sortFunc (a, b){
      var t = Tabs.AllianceList;
      if (typeof(a[t.sortColNum]) == 'number'){
        if (t.sortDir > 0)
          return a[t.sortColNum] - b[t.sortColNum];
        else
          return b[t.sortColNum] - a[t.sortColNum];
      } else if (typeof(a[t.sortColNum]) == 'boolean'){
// TODO !!        
return 0;        
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
      m += '<TR style="max-height:30px"><TD class=xxtab>'+ t.dat[i][0] +'</td><TD align=right class=xxtab>'+ addCommasInt(t.dat[i][1]) 
         +'</td><TD align=center class=xxtab>'+ t.dat[i][3] +'</td><TD class=xxtab>'+ officerId2String(t.dat[i][2])                       
         +'</td><TD class=xxtab>'+ (t.dat[i][9]?'<SPAN class=boldDarkRed>ONLINE</span>':'') +'</td><TD class=xxtab>'+ t.dat[i][7] +'</td><TD align=right class=xxtab>'+ t.dat[i][4] 
         +'</td><TD align=center class=xxtab><DIV onclick="ptGotoMap('+ t.dat[i][5] +','+ t.dat[i][6] +')"><A>'+ t.dat[i][5] +','+ t.dat[i][6] +'</a></div></td>\
            <TD align=right class=xxtab style="padding-right:20px;">'+ t.dat[i][8].toFixed(2) +'</td>\
         </td><TD  nowrap class=xxtab>'+ (t.dat[i][10]?'<SPAN>'+ (t.dat[i][10]>0?timestr(t.dat[i][10],1):'NA') +'</span>':'<SPAN>NA</span>') +'<td class=xxtab><SPAN onclick="PCplo(this, \''+ t.dat[i][11] +'\')"><A>last Login</a></span><td></tr>';
    }
    var tbody = document.getElementById('allBody');
    tbody.style.maxHeight = '';
    tbody.innerHTML = m;


    if (parseInt(tbody.clientHeight) > 470){
      tbody.style.height = '470px';
      tbody.style.maxHeight = '470px';
    }
//new CtableToText('tabAllMembers').toText();
  },
};
*/
/*********************************** Options tab ***********************************/
Tabs.Options = {
  tabOrder : 40,
  cont : null,

  init : function (div){
    var t = Tabs.Options;
    t.cont = div;
    
    try {      
      m = '<TABLE class=ptTab>\
        <TR><TD colspan=2><B>Settings:</b></td></tr>\
        <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Enable window drag (move window by dragging top bar with mouse)</td></tr>\
		<TR><TD><INPUT id=ptahelpenable type=checkbox /></td><TD>Auto Help Alliance Members(Alliance Chat)</td></tr>\
        <TR><TD><INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/></td><TD>Enable widescreen style: '+ htmlSelector({normal:'Normal', wide:'Widescreen', ultra:'Ultra'},GlobalOptions.pbWideScreenStyle,'id=selectScreenMode') +' (all domains, requires refresh)</td>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>Put chat on right (requires wide screen)</td></tr>\
		<TR><TD><INPUT id=pbWMapEnable type=checkbox /></td><TD>Use WideMap (requires wide screen)</td></tr>\
		<TR><TD><INPUT id=pbrmmotdEnable type=checkbox /></td><TD>Remove MOTD (below your cities)</td></tr>\
		<TR><TD><BR> </td></tr>\
		<TR><TD colspan=2><B>Auto Collect:</b></td></tr>\
		<TR><TD><INPUT id=ptgoldenable type=checkbox /></td><TD>Auto collect gold when happiness reaches <INPUT id=ptgoldLimit type=text size=2 maxlength=3 \>%</td></tr>\
		<TR><TD><INPUT id=ptoilenable type=checkbox /></td><TD>Auto collect oil</td></tr>\
		<TR><TD><INPUT id=ptfoodenable type=checkbox /></td><TD>Auto collect Food</td></tr>\
		<TR><TD><INPUT id=ptWHenable type=checkbox /></td><TD>Auto collect WarHeads</td></tr>';
		m += '</table><BR><BR><HR>Note that if a checkbox is greyed out there has probably been a change of KofC\'s code, rendering the option inoperable.';
      div.innerHTML = m;
	  t.cont.innerHTML = m;
      
	  document.getElementById('selectScreenMode').addEventListener ('change', function(){
      		GlobalOptions.pbWideScreenStyle = document.getElementById('selectScreenMode').value;
      		GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);
	  
	  document.getElementById('pbWideOpt').addEventListener ('change', t.e_wideChanged, false);
   	  t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
	  t.togOpt ('ptgoldenable', 'pbgoldenable', CollectGold.setEnable);
	  t.togOpt ('ptoilenable', 'pboilenable', CollectOil.setEnable);
	  t.togOpt ('ptfoodenable', 'pbfoodenable', CollectFood.setEnable);
	  t.togOpt ('ptWHenable', 'pbWHenable', CollectWH.setEnable);
	  t.togOpt ('ptahelpenable', 'pbahelpenable', ChatPane.setEnable);
      t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
      t.togOpt ('pbWMapEnable', 'pbWideMap', WideScreen.useWideMap);
      t.togOpt ('pbrmmotdEnable', 'ptrmmotdEnable', RMMotd.setEnable);
	  t.changeOpt ('ptgoldLimit', 'pbGoldLimit');
    } catch (e) {
      t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
  },

  
  hide : function (){
  },

  show : function (){
  },
  
 togOpt : function (checkboxId, optionName, callOnChange){
    var t = Tabs.Options;
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
    var t = Tabs.Options;
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
	e_wideChanged : function (){
		GlobalOptions.pbWideScreen = document.getElementById('pbWideOpt').checked;
		GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
}
var RMMotd = {
  init : function() {
    var t = RMMotd;
	t.setEnable (Options.ptrmmotdEnable);
  },
  setEnable : function() {
    var t = RMMotd;
    t.Remove();
  },
  Remove : function() {
  if(Options.ptrmmotdEnable)
  document.getElementById('motd-widget').parentNode.removeChild(document.getElementById('motd-widget'))
  },
}
var WideScreen = {
  chatIsRight : false,
  useWideMap : false,
  rail : null,
  
  init : function (){
    t = WideScreen;
      t.rail = searchDOM (document.getElementById('mod_maparea'), 'node.className=="maparea_rrail"', 10);
	  GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important}');  
      try {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'));
        document.getElementById('gw-promo-main').parentNode.removeChild(document.getElementById('gw-promo-main'));
      } catch (e) {
      }
  },
        
  setChatOnRight : function (tf){
    t = WideScreen;
    if (tf == t.chatIsRight || !GlobalOptions.pbWideScreen)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom').childNodes[5];
	  var chat2 = document.getElementById('kocmain').childNodes[16];
	  
	  if (!chat || chat.className!='mod_comm')
      setTimeout (function (){t.setChatOnRight(tf)}, 1000);
	  chat.style.top = '-548px';
      chat.style.left = '760px';
      chat.style.height = '700px';
      chat.style.width = '350px';
	  chat2.style.top = '65px';
      chat2.style.left = '763px';
      chat2.style.height = '550px';	
      chat2.style.width = '316px';
      chat.style.background = 'url("'+ CHAT_BG_IMAGE +'")';
	  document.getElementById('mod_comm_list1').style.height = '3500px';
	  document.getElementById('mod_comm_list1').style.fontSize = 'smaller';
      document.getElementById('mod_comm_list2').style.height = '3500px';  
    } else {
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      chat.style.top = '0px';
      chat.style.left = '0px';
      chat.style.height = '';
      chat.style.background = '';
      document.getElementById('mod_comm_list1').style.height = '287px';
      document.getElementById('mod_comm_list2').style.height = '287px';
    }
    t.chatIsRight = tf;
  },
  
  useWideMap : function (tf) {
  	t = WideScreen;
  	if (tf == t.useWideMap || !GlobalOptions.pbWideScreen)
  		return;
  	if (tf){
      t.rail.style.display = 'none';
      document.getElementById('mapwindow').style.height = "436px";
      document.getElementById('mapwindow').style.width = "1220px";
      document.getElementById('mapwindow').style.zIndex = "50";
	  } else {
      t.rail.style.display = 'block';
      document.getElementById('mapwindow').style.height = "439px";
      document.getElementById('mapwindow').style.width = "760px";
      document.getElementById('mapwindow').style.zIndex = "";
  	}
  },
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
function DoUnsafeWindow(func, execute_by_embed) {
	//if(this.isChrome || execute_by_embed) {
	//	var scr=document.createElement('script');
	//	scr.innerHTML=func;
	//	document.body.appendChild(scr);
	//} else {
			eval("unsafeWindow."+func);
	//}
}
function dialogRetry (errMsg, seconds, onRetry, onCancel, errCode){
  seconds = parseInt(seconds);
  var pop = new CPopup ('pbretry', 0, 0, 400,200, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>GW Lazy Tools</center>';
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
/************************ error Killer ************************/
var ErrorKiller  = {
  saveFunc : null,
  init : function (tf){
  if (firefoxVersion.substring(0,4) == '4.0b')  // bug in firefox 4.0b10 causes syntax error with: "var func = eval ('function (){}');"
      return;
    ErrorKiller.saveFunc = unsafeWindow.Modal.showModalUEP;
    ErrorKiller.setEnable (tf);
  },
  setEnable : function (tf){
      unsafeWindow.Modal.showModal525 = eval ('function (a,b,c) {actionLog ("Blocked error popup");}');
  },
}
/*******************Chat Pane*****************/
var ChatPane = {
  init : function(){
    var t = ChatPane;
	setInterval(t.HandleChatPane, 2500);
  },
  setEnable : function(){
    var t = ChatPane;
	t.setEnable (Options.pbahelpenable);
  },
  HandleChatPane : function() {
	var DisplayName = GetDisplayName();
	var GlobalChatBox=document.getElementById('mod_comm_list1');
    if(Options.pbahelpenable) {
	if(GlobalChatBox){
		var chatPosts2 = document.evaluate(".//div[contains(@class,'chatwrap')]", GlobalChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if(chatPosts2) {
			for (var v = 0; v < chatPosts2.snapshotLength; v++) {
                thisPost = chatPosts2.snapshotItem(v);			
				var helpAllianceLinks3=document.evaluate("//*[contains(@onclick,'Building.helpBuild')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ); 
				if(helpAllianceLinks3){
					for (var j = 0; j < helpAllianceLinks3.snapshotLength; j++) {
						thisLink = helpAllianceLinks3.snapshotItem(j);
						thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
					}
				}
				var helpAllianceLinks4=document.evaluate(".//a[contains(@onclick,'Research.helpResearch')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(helpAllianceLinks4){
					for (var j = 0; j < helpAllianceLinks4.snapshotLength; j++) {
						thisLink = helpAllianceLinks4.snapshotItem(j);
						thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
					}	
				}
			}
		}
	}
	var helpAllianceLinks1='';
	var helpAllianceLinks2='';
	var AllianceChatBox=document.getElementById('mod_comm_list2');
	var DisplayName = GetDisplayName();
	if(AllianceChatBox){
	    var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if(chatPosts){
			for (var i = 0; i < chatPosts.snapshotLength; i++) {
				thisPost = chatPosts.snapshotItem(i);
				var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(postAuthor.snapshotItem(0)){
					var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
					if(postAuthorName != DisplayName){
						var helpAllianceLinks1=document.evaluate("//*[contains(@onclick,'Building.helpBuild')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
						var helpAllianceLinks2=document.evaluate("//*[contains(@onclick,'Research.helpResearch')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
						if(helpAllianceLinks1){
	     		     		for (var j = 0; j < helpAllianceLinks1.snapshotLength; j++) {
								thisLink = helpAllianceLinks1.snapshotItem(j);
								var alreadyClicked = thisLink.getAttribute("clicked");
								if(!alreadyClicked){
									thisLink.setAttribute('clicked', 'true');
									var myregexp = /(Building.helpBuild\(.*\);)/;
									var match = myregexp.exec(thisLink.getAttribute("onclick"));
									if (match != null) {
										onclickCode = match[0];				
										if(true){
											DoUnsafeWindow(onclickCode);
											return;
										}
									}
								}
							}
					    }	
						if(helpAllianceLinks2){
				    	    for (var j = 0; j < helpAllianceLinks2.snapshotLength; j++) {
								thisLink = helpAllianceLinks2.snapshotItem(j);
								var alreadyClicked = thisLink.getAttribute("clicked");
								if(!alreadyClicked){
									thisLink.setAttribute('clicked', 'true');
									var myregexp = /(Research.helpResearch\(.*\);)/;
									var match = myregexp.exec(thisLink.getAttribute("onclick"));
									if (match != null) {
										onclickCode = match[0];
										if(true){
											DoUnsafeWindow(onclickCode);
											return;
										}
									}
								}
							}
						}
					}
				}
				// Hide alliance requests in chat
				var helpAllianceLinks5=document.evaluate(".//a[contains(@onclick,'Building.helpBuild')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(helpAllianceLinks5){
					for (var j = 0; j < helpAllianceLinks5.snapshotLength; j++) {
						thisLink = helpAllianceLinks5.snapshotItem(j);
						thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
					}
				}
				var helpAllianceLinks6=document.evaluate(".//a[contains(@onclick,'Research.helpResearch')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(helpAllianceLinks6){
					for (var j = 0; j < helpAllianceLinks6.snapshotLength; j++) {
						thisLink = helpAllianceLinks6.snapshotItem(j);
						thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
					}	
				}

			}	
		}	
	}
	}
 },
}
/************************ War Head Collector ************************/
var CollectWH = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectWH;
    t.lastCollect['c'+ Cities.cities[3].id] = 0;
	t.setEnable (Options.pbWHenable);
  },
  
  setEnable : function (tf){
    var t = CollectWH;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectWH;
	if(!Cities.cities[3]) return;
    var city = Cities.cities[3];
    var since = unixTime() - t.lastCollect['c'+city.id];
    if (since>6*60*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.ajaxCollectWH (city, t.e_ajaxDone);
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectWH;
    if (rslt.ok)
      logit ('Collected '+ rslt.gained.resource2 +' War Heads '+ t.colCityName, true);
    else
      logit ('Error collecting War Heads for '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
  },
  
  ajaxCollectWH : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "warheadFactoryEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify)  
          notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify)  
          notify (rslt);
      }
    });
  },
}

/************************ Gold Collector ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].id] = 0;
	t.setEnable (Options.pbgoldenable);
  },
  
  setEnable : function (tf){
    var t = CollectGold;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var happy = Seed.citystats['city'+ city.id].pop[2];
      var since = unixTime() - t.lastCollect['c'+city.id];
      if (happy>=Options.pbGoldLimit && since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.colHappy = happy;
        t.ajaxCollectGold (city, t.e_ajaxDone);
        break;
      }
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
    if (rslt.ok)
      logit ('Collected '+ rslt.gained.gold +' gold for '+ t.colCityName +' (happiness was '+ t.colHappy +')', true);
    else
      logit ('Error collecting gold for '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
  },
  
  ajaxCollectGold : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "coliseumEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify)  
          notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify)  
          notify (rslt);
      }
    });
  },
}


/************************ Food Collector ************************/
var CollectFood = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectFood;
    t.lastCollect['c'+ Cities.cities[2].id] = 0;
	t.setEnable (Options.pbfoodenable);
  },
  
  setEnable : function (tf){
    var t = CollectFood;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectFood;
	if(!Cities.cities[2]) return;
    var city = Cities.cities[2];
    var since = unixTime() - t.lastCollect['c'+city.id];
    if (since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.ajaxCollectFood (city, t.e_ajaxDone);
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectFood;
    if (rslt.ok)
      logit ('Collected '+ rslt.gained.resource2 +' Food for '+ t.colCityName, true);
    else
      logit ('Error collecting Food for '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
  },
  
  ajaxCollectFood : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "greenhouseEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify)  
          notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify)  
          notify (rslt);
      }
    });
  },
}
/************************ Oil Collector ************************/
var CollectOil = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectOil;
    t.lastCollect['c'+ Cities.cities[1].id] = 0;
	t.setEnable (Options.pboilenable);
  },
  
  setEnable : function (tf){
    var t = CollectOil;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectOil;
	if(!Cities.cities[1]) return;
    var city = Cities.cities[1];
    var since = unixTime() - t.lastCollect['c'+city.id];
    if (since>24*60*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.ajaxCollectOil (city, t.e_ajaxDone);
    }
    t.timer = setTimeout (t.tick, 1*60*60*1000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectOil;
    if (rslt.ok)
      logit ('Collected '+ rslt.gained.resource2 +' oil for '+ t.colCityName, true);
    else
      logit ('Error collecting oil for '+ t.colCityName +': <SPAN class=boldRed>'+ unsafeWindow.ERROR_CODE[rslt.error_code] +'</span>', true);
  },
  
  ajaxCollectOil : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "petroleumLabEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify)  
          notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify)  
          notify (rslt);
      }
    });
  },
}

/************************ Refresh Every X minutes ************************/
var RefreshEvery  = {
  timer : null,
  init : function (){
    if (Options.pbEveryMins < 1)
      Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
  },
  doit : function (){
    actionLog ('Refreshing ('+ Options.pbEveryMins +' minutes expired)');
    reloadKOC();
  }
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
          WinLog.write ('<A style="color:black; text-decoration:underline;" TARGET=_tab HREF="'+ scripts[i].src +'">'+ scripts[i].src +'</a>');
      }
    }
    
    if (t.popDebug == null){  
      t.popDebug = new CPopup ('db', 0, 0, 400,500, true);
      t.popDebug.getTopDiv().innerHTML = 'DEBUG';
      t.popDebug.getMainDiv().innerHTML = '<DIV><INPUT type=submit id=dbsuball value=ALL> &nbsp; <INPUT type=submit id=dbsubnone value=NONE> &nbsp; \
        <INPUT type=submit id=dbdefaults value=DEFAULTS> &nbsp; <INPUT type=submit id=dbsubdo value=SHOW> &nbsp; <INPUT type=submit id=dbsubscripts value=SCRIPTS></div>\
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

function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('Options_'+serverID, JSON2.stringify(Options));}, 0);
}

function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  saveOptions();
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
function parseIntZero (n){
  n = n.trim();
  if (n == '')
    return 0;
  return parseInt(n, 10);
}

var WinManager = {
  wins : {},    // prefix : CPopup obj
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
  this.div.className = 'CPopup ptTabs '+ prefix +'_CPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = '';
  this.div.style.maxHeight = height + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td></tr>\
      <TR><TD height=100% valign=top class="'+ prefix +'_CPopMain" colspan=2><DIV class="CPopMain '+ prefix +'_CPopMain" id="'+ prefix +'_main"></DIV></td></tr></table>';
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
String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039' };
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

function mouseMainTab (me){   // right-click on main button resets window location
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    mainPop.setLocation ({x: c.width +4, y: 0});
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

function createButton (label){
  var a=document.createElement('a');
  a.className='tab buttontab';
  a.innerHTML='<span class=left></span><span class=right></span>';
  a.innerHTML+='<span class=mid>'+ label +'</span>';
  a.style.width='78px';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var tabs=document.getElementById('kochead');
    var a = createButton ("Menu");
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
	    gmTabs.style.height='20px';
      gmTabs.style.padding='0 0 0 25px';
      gmTabs.lang = 'en_PB';
//      document.getElementById('gw-promo-main').class = '';
//	    document.getElementById('gw-promo-main').style.height = '0px';
	  //document.getElementById('cityinfo_box').style.top = '1042px';
    }
    gmTabs.appendChild(a);
//    var b = createButton (text); 
//    gmTabs.appendChild(b);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
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
      dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
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
  if (Options.hideOnGoto)
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
    if (Options.hideOnGoto)
    hideMe ();
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    unsafeWindow.changeview_map(document.getElementById('mod_views_map'));
	unsafeWindow.modal_attack(3,x,y);
  }, 0);
};

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
    cityID = 'c'+ Cities.cities[i].id;
    for (k in Seed.outgoing_marches[cityID]){   // each march
      march = Seed.outgoing_marches[cityID][k];
      if ((typeof (march) == 'object') && (march.returnUnixTime < now)){
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

function getTrainInfo (){
  var ret = {};

  ret.trainUnts = [];
  for (i=0; i<13; i++){
    ret.trainUnts[i] = 0;
  }
  
  var q = Seed.training_queue;
  for(i=0; i<Cities.numCities; i++) {   // each city
    cityID = 'c'+ Cities.cities[i].id;
	q = Seed.training_queue[cityID];
	if (q && q.length>0){
	  for (qi=0; qi<q.length; qi++)
          ret.trainUnts[q[qi][1]] += parseInt(q[qi][2]);
	  }
    }
  return ret;
}

var fortNamesShort = {
  53: "Archer Tower",
  52: "Caltrops",
  54: "Logs",
  55: "Trebuchet",
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
    
//    alert(JSON.stringify(Seed.knights["city" + Cities.cities[i].id][1][1]));

  }
}  
    //var Generals  = [];
//          for(var general in generalsobj){
//            generals.push(general);
//          }  

// set generals  
//  Generals.num = Seed.cities.length;  
//  Generals.generals = [];
//  for (i=0; i<Generals.num; i++){
//    general = {}; 
//    general.idx=i; 
//    general.id = parseInt(Seed.knights[i][0]);
//  }
//}

//function setGenerals(){
//  Generals.Generals = [];
//  Generals.byID = {};
//  for (i=0; i<Generals.numGenerals; i++){
//    general = {};
//    general.idx = i;
//    general.id = parseInt(Seed.knights[i][0]);
//    general.name = Seed.knigths[i][3];
//    Generals.Generals[i] = general;
//    Generals.byID[Seed.knights[i][0]] = general;
//  }
//}


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
    var m = '<TABLE cellspacing=3 class=ptMainTab><TR>';
    for (var i=0; i<sorter.length; i++) {
      //m += '<TD class=spacer></td><TD align=center class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      m += '<TD class=spacer></td><TD align=center class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      //if (i==8) m+='</tr><TR>';
    }
    m+='</tr></table>';  
    //m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab = t.tabList[k] ;
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
      Options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.ptWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.ptWinIsOpen = true;
  saveOptions();
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

function logit (msg, force){
	if(!DEBUG_TRACE && !force) return false;
	var now = new Date();
	var prefix = getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds();
	msg = prefix+" : "+msg;
	if (typeof GM_log !== 'undefined') { GM_log(msg); return true; }
	if (typeof console !== 'undefined' && console.log) { console.log(msg); return true; }
	return false;
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
      //t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
	  t.win = new CPopup('ptwinlog', 0, 0, 500, 800, true, function(){t.win.destroy(); t.win=null; t.win.closed=true;});
	  t.win.show(true);
t.isOpening = false; 
t.state = null; 
    }
    
    if (t.state == null){
      t.win.getMainDiv().innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; overflow-x:auto; max-height:1200px; width:600px"></div></body>';
      document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  document.getElementById('wlOut');
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

ptStartup();


function MyAjaxRequest2 (url, o, noRetry){
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
/********************************Global Options *******************************/
function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
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
function readChatOptions (){
  var serverID = getServerId();
  s = GM_getValue ('ChatOptions_'+serverID, '[]');
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          ChatOptions[k][kk] = opts[k][kk];
      else
        ChatOptions[k] = opts[k];
    }
  }
}
var CHAT_BG_IMAGE = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QNSRXhpZgAATU0AKgAAAAgABVEAAAQAAAABAAAAAFEBAAMAAAABAAEAAFECAAEAAAMAAAAASlEDAAEAAAABAAAAAFEEAAEAAAAB/AAAAAAAAAAAAAAAADMAAGYAAJkAAMwAAP8AKwAAKzMAK2YAK5kAK8wAK/8AVQAAVTMAVWYAVZkAVcwAVf8AgAAAgDMAgGYAgJkAgMwAgP8AqgAAqjMAqmYAqpkAqswAqv8A1QAA1TMA1WYA1ZkA1cwA1f8A/wAA/zMA/2YA/5kA/8wA//8zAAAzADMzAGYzAJkzAMwzAP8zKwAzKzMzK2YzK5kzK8wzK/8zVQAzVTMzVWYzVZkzVcwzVf8zgAAzgDMzgGYzgJkzgMwzgP8zqgAzqjMzqmYzqpkzqswzqv8z1QAz1TMz1WYz1Zkz1cwz1f8z/wAz/zMz/2Yz/5kz/8wz//9mAABmADNmAGZmAJlmAMxmAP9mKwBmKzNmK2ZmK5lmK8xmK/9mVQBmVTNmVWZmVZlmVcxmVf9mgABmgDNmgGZmgJlmgMxmgP9mqgBmqjNmqmZmqplmqsxmqv9m1QBm1TNm1WZm1Zlm1cxm1f9m/wBm/zNm/2Zm/5lm/8xm//+ZAACZADOZAGaZAJmZAMyZAP+ZKwCZKzOZK2aZK5mZK8yZK/+ZVQCZVTOZVWaZVZmZVcyZVf+ZgACZgDOZgGaZgJmZgMyZgP+ZqgCZqjOZqmaZqpmZqsyZqv+Z1QCZ1TOZ1WaZ1ZmZ1cyZ1f+Z/wCZ/zOZ/2aZ/5mZ/8yZ///MAADMADPMAGbMAJnMAMzMAP/MKwDMKzPMK2bMK5nMK8zMK//MVQDMVTPMVWbMVZnMVczMVf/MgADMgDPMgGbMgJnMgMzMgP/MqgDMqjPMqmbMqpnMqszMqv/M1QDM1TPM1WbM1ZnM1czM1f/M/wDM/zPM/2bM/5nM/8zM////AAD/ADP/AGb/AJn/AMz/AP//KwD/KzP/K2b/K5n/K8z/K///VQD/VTP/VWb/VZn/Vcz/Vf//gAD/gDP/gGb/gJn/gMz/gP//qgD/qjP/qmb/qpn/qsz/qv//1QD/1TP/1Wb/1Zn/1cz/1f///wD//zP//2b//5n//8z///8AAAAAAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCALYAagDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8J6KKK9g88KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArV8KeBdb8d3b2+h6NquszxAM8djaSXDoD0JCAkV+rf8AwSQ/4INz+MX0/wAbfFS2jjWQLdWGlSMNgjyCJpiQV24GcccZr0H/AIKEf8FEvhh+xdc6n4F/Zy8M+GLbxLFi31rxJBYxuAQMOkZPHHPY171HJUkniZ8vkldnys+KITryw+Eg5tddkfkH/wAM2fEX/oQfGv8A4I7r/wCIo/4Zs+Iv/Qg+Nf8AwR3X/wARX1t/w+N+OA/5me0P/bhF/hSD/gsf8cScDxHb5P8A04Rf4V0f2dlf/P8Al/4D/wAEv+0sz/58x/8AAv8AgHyV/wAM2fEX/oQfGv8A4I7r/wCIo/4Zs+Iv/Qg+Nf8AwR3X/wARX1v/AMPifjn/ANDFa/8AgHD/AIUH/gsV8cwOfEVqB6/YoeP0pf2dlf8Az+l/4D/wR/2lmf8Az5j/AOBf8A+SD+zb8RQMnwD41AH/AFA7r/4iue1rwRrXhuZ49R0jVLCSMZdbm1kiKj3DAYr7YX/gsf8AHFGBHie1yORiwiB/lXPeKP8Agp38SfG83ma1/wAIzq8nUNe6DaTsD9WQmoeXZbbStL/wH/glrMsxvrRj/wCBf8A+NKK+tB+334uJ40fwMT6f8Irp/P8A5Cpf+G+PGH/QD8D/APhMaf8A/Gq5P7Pw3/P7/wAlf+Z1/X8V/wA+f/Jl/kfJVFfWv/DfHjD/AKAfgf8A8JjT/wD41R/w3x4wP/MD8Dj/ALljT/8A41R9Qw3/AD+/8l/4JH9p4n/nz/5Mv8j5Kor62P7evjADnR/AgHr/AMIvp/H/AJCpv/DfHi3/AKBngL/wlLD/AONUf2fhv+f3/kr/AMwWZ4n/AJ8/+TL/ACPkuivrX/hvjxb20vwGx9B4VsOf/IVH/DfHjA/8wPwOP+5Y0/8A+NUfUMN/z9f/AID/AME0+v4n/nz/AOTL/I+SqK+tv+G9fGA/5g3gQ/8Acsaf/wDGqQft8+MAc/2J4GXHc+F9P4/8hUfUMN/z9f8A4D/wQ+v4n/nz/wCTL/I+SqK+uF/b+8XFgP7M8Bc/9SpYf/G6k/4b48W/9AzwF/4Slh/8ao+oYb/n6/8AwH/gh9fxP/Pn/wAmX+R8h0V9ej9vjxaTxpfgMn0/4RWw5/8AIVD/ALevjDYf+JN4E6f9Cxp//wAao+oYb/n9/wCS/wDBD6/if+fP/ky/yPkKivrb/hvXxgP+YN4EP/csaf8A/GqT/hvjxgf+YH4HH/csaf8A/Gqf9n4b/n9/5K/8w+v4n/nz/wCTL/I+SqK+tv8AhvXxh/0BvAn/AITGn/8Axqj/AIb18Yf9AbwJ/wCExp//AMapf2fhv+f3/kr/AMw+v4n/AJ8/+TL/ACPkmivrb/hvXxh/0BvAn/hMaf8A/GqP+G9fGH/QG8Cf+Exp/wD8ao+oYb/n6/8AwH/gh9fxP/Pn/wAmX+R8k0V9bf8ADevjD/oDeBP/AAmNP/8AjVH/AA3r4w/6A3gT/wAJjT//AI1R9Qw3/P1/+A/8EPr+J/58/wDky/yPkmivrb/hvXxh/wBAbwJ/4TGn/wDxqj/hvXxh/wBAbwJ/4TGn/wDxqj6hhv8An6//AAH/AIIfX8T/AM+f/Jl/kfJNFfW3/DevjD/oDeBP/CY0/wD+NUf8N6+MP+gN4E/8JjT/AP41R9Qw3/P1/wDgP/BF/aGJ/wCfP/ky/wAj5Jor61P7e3i9R82k+A1Hr/wi2nn/ANpUo/b28XkcaR4EYev/AAi+nj/2lR9Qw3/P1/8AgP8AwQWYYnrR/wDJl/kfJNFfWNz/AMFAPFtpu36R4EGyPzCD4X08EDOOhiyR7gUN+394wViBo/gFgP4l8L2OD7j9zWscppS+Go3/ANu/8El5nXW9L/yZf5HydRX1qv7fPixHHmaV4HAZcjPhKwUZ9MmPn8qh/wCHgXi0DH9l+Ai+CSp8LaepABxkfu/mPsDk9cdqbyikmk6jV/7j/wAwjmdaW1L/AMmX+R8oUV9ZTft9+MYpWU6L4EBUkYPhaxBH4GCpLT9v3xdu50PwGT/2LNl/8aqZZVRi7Sqv/wABf+YpZpWW1Jf+BL/I+SaK+6Nc+G2g/wDBQD4fyaj4d0q00f4o6BabtR0K2iSCHW4AvNzbLj5ZOrEAFcn5VAwK+J/FHhu68Ja7cafeRSxT2zlGWSNo2GDjlWAIIOQR2IIrmx+WzwyUr3i+p04DM6eJbja0lujPooorzT0gooooAKKKKACiiigAooooA/az/gq1/wAFP7v4L/DXT/gT8MZbnT47bSLWDWtejJ33eYhujjbPCsp9O9fkjr2qPqF5K8xaWRi0hJJyzHqTzyfrX0j/AMFJHeH9oRm3u5/sewHJ64s4xXzFfJ+8LhJd2M9a+zzhyp4iUFsj5HIKVOOEhOKs2VhcPn7so9/SnG4kYYMjkHqM9aYJXYgFZsH/AD6VJ5f/AEzlrwbH0HLHsR8D+HPtk/40B8H/AFLj3yeKk8vHSOUUuGPVZz+X+FFg5Y9hnnOOQWyPTrR9sm/6b/5/CnCPBH7uUU/A/wCnj8x/hU8yDliRG7mI5E5H1pvnt/zzm/M1Pgf9PH5j/CjA/wCnj8x/hRzIVmQee3/POb8zR5zHgpLg+pNTvwhI8/IHqP8ACoPOc9VmP+fpRzIfLHsKCAeBg/U/40vnMO7H2pm8/wDPKSjeR0jkFLmBRj2HrO5IGyXn3p+CeqTH/gVRxzvvXKzYz7f4VZMxxx52fqP8KfMjo5Y9iLywOkMo/E0ozn7sw9yelO8+T+7N+n+FHnOeqzH/AD9KOZByx7CAEHO5uPepFlYsBuPNR7if+Wcg96cn3x9aOZByx7ErghDyzcdM9agLAjHkyc+5qw5whIzkDt1qDz5P7s36f4UcyDlj2GeWB0hlH4mhshT8kx4/vU/z5P7s36f4UjzybD8s3T2/wo5kHLHsV9//AEwk/M0b/wDphJ+ZpRO+eVmx+H+FOMxxx52fqP8AClzByx7DN/8A0wk/M0b/APphJ+ZpfPk/uzfp/hR58n92b9P8KfMg5Y9hN/8A0wk/M0b/APphJ+ZpRO+eVmx+H+FK0z54E2Pw/wAKOZByx7Dd/wD0wk/M0b/+mEn5ml8+T+7N+n+FKszfxCYfl/hRzIOWPYbv/wCmEn5mjf8A9MJPzNP87/rv+Y/wo87/AK7/AJj/AAo5kHLHsNEpU/LFID9TQZNxyYZCfXJp3nf9d/zH+FAmOTxNjtyP8KOZByx7HpHhDxhqXwy+B0ms+H7y60bWdR1lrOW/tJniuVhjhjYRq4OVGWOceg6VnN+0t8Rsn/i4Hjo+51+7JP4mSpra2W//AGb4N5YbfEc+Mdf9RDXNHT4lOME44r2Xg6zjCdN2TXc8pTheSkr6m/H+0z8SIpVYfEHxwdhyA2tXDD9Wr0aXxFLY6Zd+OI4ol8UP4Mh1E3+X3/bX1Q2hu8bsGfyxneQSWJY5zXjX2CP+7XsGp2at8H7lOQD4Dtf/AE/murC4Ko+b2kr9tbmVarBW5FY89/4aV+Iy8f8ACwPHRx3/ALeuuf8Ax+nx/tL/ABKQ5HxA8b/+D67/APjlc9/Z8S8Yzij7AnvXLPA4iSfvHR7Shyp8p6rafFnX5vh94b8XXGqXdx4m0zXp4YtTmlaW5ZI4oJFVnYksMysD6jHfJPQft069oXx//Z88PfFNNEOjeMTrh0HXHgIW21CT7N5/2gJjIZyNx+bHzcAV55fxiD9nvTAqSH/iorzn/t0tj/7KK1viAcf8E+kG1xn4iAksc5xpmP6VeJ9p7KdKpraN/uscNHDwhWhVhpeX5nzrRRRXyB9MFFFFABRRRQAUUUUAFFFFAH2f/wAFJ8/8NBnHB/siw/8ASSOvmS4eV5WUs2AK+nf+CjiPcftG7FjZz/ZOngAHGT9kj4zXlvgn9n++8Y2j3xntbK0VgPNuZDGH9Qo2HOK/R8blOJx+NqU8NHmaZ8NlmY4fDZfCVWVrHl2HHIaTIoEs2eS1e3n9mmBHA/t7SgfT94f/AGSpD+zUhGP7b0rn3k/+Iq/9Qc0/59/iv8x/654D+f8AB/5Hh3mP/ek/KjzH/vSflXt3/DMkf/Qb0v8AN/8A4ij/AIZkj/6Del/m/wD8RS/1CzL/AJ9/ig/1zwP8/wCDPEd8jcbpOaUQSZ5eWvbl/ZmjVgf7b0vg56yf/EVKf2cVIx/bWk8+8n/xFY/8Q/zP+T8UH+ueB/n/AAZ4d9nP9+b9P8KPs5/vzfp/hXt3/DNaf9BvSvzk/wDiKP8AhmtP+g3pX5yf/EUf8Q/zP+T8UH+ueB/n/BniDwsqE75uB7f4VBvc9DLXu6/s1IWA/tvSufeT/wCIqT/hmSL/AKDWlfnJ/wDEUf8AEPs0/k/FB/rngf5/wZ4KqylgMvzUn2eT+9J+le7H9maNRn+29L456yf/ABFIv7OKlgDrWk4z6yf/ABFH/EPs17fiv8xrjPA/z/gzwr7PJ/ek/SlEMgP3pK96/wCGa4P+g5pf5v8A/EUf8M1wf9BzS/zf/wCIo/4h/mf8n4o1/wBdsB/P+DPB9svq9AWXPLPXvH/DNcH/AEHNL/N//iKD+zXARj+3NL593/8AiKP+If5n/J+KD/XbAfz/AIM8J2MerSGhYfmGA1e5/wDDMtv/ANBzTPzf/wCIpV/Zmt1YH+3NM4Oer/8AxFH/ABD/ADP+T8UH+u2A/n/Bnh7RMAeCKj2t/elr3h/2cImQj+29K5GOsn/xFQD9mSLPOt6Xj6v/APEUf8Q/zP8Ak/FB/rtgP5/wZ4cVfHDSU0rKRjL817r/AMMywDka5pmfq/8A8RSn9mxAM/23pXHvJ/8AEUf8Q+zT+T8UH+u2A/n/AAZ4MbaQj70n6Uw2bqM75eOe3+Fe9L+zjEWA/tzSufeT/wCIp8n7NkAjb/ie6WOOuZP/AIij/iH2a9vxX+Yf67YD+f8ABngG2X1egLLnlnr3Ufs3Qk8eINJJ9NsvP/jlKf2akIx/belc+8n/AMRR/wAQ/wAz/k/FB/rtgP5/wZ4WUYj70tN2SLwGkI969z/4Zkj/AOg3pf5v/wDEU5f2ao1GBrmlEjqP3nH/AI5R/wAQ/wAz/k/FB/rtgP5/wZ4Wqyd2koaJm/jlH5V7m/7M8b9db0rj3k/+IpP+GZI/+g3pf5v/APEUf8Q/zP8Ak/FB/rtgP5/wZ4W0D9nl/SgwPtGHlz+Fe6p+zPGmca3pXPvJ/wDEUL+zPGrE/wBt6Vz7yf8AxFH/ABD/ADP+T8UH+u2A/n/BnhHkSf3paeIWKgF5cj6V7t/wzWn/AEG9K/OT/wCIprfszRsc/wBt6X+cn/xFH/EP8z/k/FB/rtgP5/wZzfwy0ZPHnwevNBsbq1Os6Zqp1FrSeYQNPDJEikq7DbkFRT/+Gf8AxMfvW1kD3xqNsR/6MH8q6Nf2bQHBOu6Y23bgMXIABzj7nQ+lJ/wzTH/0GtJ/8f8A/iK9+jwzm0KcacqN7Luv8zy5cRYDmlKNTd9mc6v7PXiqa5RI7C12t1kk1K0RR+PmV02pajp2y98GDVLNtWj8JQ6T5hOy2a9TUjeG3WQ/KzbSEDD5SwJDEYqEfsyRKTjWtKweoJkIP5pSt+zLEUAGtaUu07gytIGB7fNszgdhnHtVvhvN9PZ0bfNBHiDL5aTqfgzAf9n3xOrkf2ZDwf8AoK2f/wAcqI/s/wDivJxpltj/ALClp/8AHK6SX9my2H3NZ0pf9kb8D2HyVCf2XvOBEWt6Q8rcqpeRQP8AyHVS4bzZR/ha+qFDPMA217QwviHAfBPww0bw5e3EX9tPqN3qTwQSLOLaNoUiTcV4yWToDWl8RBn/AIJ7QtukIb4iA4YYP/IMPbtXHeKvhrfeCdcuLa5UfNwWGTHKAMAqcA443D6/hXY/Ecyf8O+IN/O74hAknqT/AGYa+Mx8a0KlaNaPK1BrX5H0FGpSapOnK95I+caKKK+LPpwooooAKKKKACiiigAooooA/Sb9qP4XWni/4+SX94zNp0em6fChiAd7pxbKrKo/3gB+NV/iv43+Hf7NlvHo/i/Rrnxp4oTYb7StO8Qx6bp/hgH7tq8/lyCW6IBMiJxGoPLMrqmR8XdeudNv/GQglaL+z7SYQMrENF86LkHPBAPBHSvjTXpH1zxDKjogispJIIUUHaihzzg9WO0HceeBjGBj924zzb+wKEVgFadTVv03PxPhfI3nFfmxUvchbQ+hPiB+1Z4L1RrP/hF/AdnoEe1vtYv/ABY+ohj/AAhDGkO3Pvn8K5z/AIaPs/8AoBeG/wDway//AB+vGRoiq6sqFWXqQSd31zUn9nv7/wDfI/wr81/4iJmvc/SP9RMs7P73/mexf8NIWf8A0AvDf/g1l/8Aj1H/AA0hZ/8AQC8Nj/uKy/8Ax6vHf7Pf3/75H+FH9nMff/gI/wAKP+IiZt/MvuF/qHlvZ/e/8z2H/ho+z/6Avhf/AMGsv/x+j/ho+z/6Avhf/wAGsv8A8frx7+zP9hf++RR/Zn+wv/fIo/4iJm38y+4P9Q8t7P73/mexf8NH2f8A0BfDB/7isv8A8fo/4aQs/wDoBeG//BrL/wDHq8d/swj+BR/wEUf2e/v/AN8j/Cj/AIiJm38y+4P9Q8t7P73/AJnsQ/aRswc/2F4b4/6isv8A8ep//DS9p/0AfDX/AINZf/j9eNf2e/v/AN8j/Cj+z39/++R/hR/xETNv5l9wf6h5Z2f3v/M9lP7S1oRj+wfDXP8A1FZf/j9M/wCGkLP/AKAXhv8A8Gsv/wAerx3+z39/++R/hR/Z7+//AHyP8KP+IiZt/MvuD/UPLOz+9/5nsX/DSNp/0AvDf/g1l/8Aj1H/AA0jaf8AQC8N/wDg1l/+PV47/Z7+/wD3yP8ACj+z39/++R/hR/xETNv5l9wf6h5b2f3v/M9i/wCGkbT/AKAfhsf9xWX/AOPUD9pGzz/yBfDJ+mqzf/H68d/s5j7/APAR/hQdM4+4o/4CKP8AiImbfzL7g/1Dy3s/vf8Amey/8NIWP/QD8O/+DWX/AOPUf8NIWP8A0A/Dv/g1l/8Aj1eMf2W3q3/fI/wo/stvVv8Avkf4Uf8AERM2/mX3B/qHlvZ/e/8AM9nH7SNiD/yA/Dv/AINZf/j1Ob9pWyKn/iReGx/3FZf/AI9Xi39lt6t/3yP8KUaW2e5/4CP8KP8AiImbfzL7g/1Dyzs/vf8Amexj9pG0B/5Avhg/9xWb/wCP05v2lbRlI/sHw1z/ANRWX/4/Xjf9mEfwKP8AgIo/s9/f/vkf4Uf8REzb+ZfcH+oeWdn97/zPYB+0ZZg/8gLw5/4NZf8A49T/APhpK0H/ADA/Dg/7isv/AMerxz+z39/++R/hR/Z7+/8A3yP8KP8AiImbfzL7g/1Dy3s/vf8Amex/8NJ2x66L4dI/7Csv/wAepP8AhpCz/wCgF4b/APBrL/8AHq8d/s9/f/vkf4Uf2e/v/wB8j/Cj/iImbfzL7g/1Dyzs/vf+Z7F/w0hZ/wDQC8N/+DWX/wCPUf8ADSNoRj+wvDZA6D+1ZeP/ACNXjv8AZ7+//fI/wo/s9/f/AL5H+FH/ABETNv5l9wf6h5Z2f3v/ADPYv+GkLP8A6AXhv/way/8Ax6j/AIaQs/8AoBeG/wDway//AB6vHf7Pf3/75H+FH9nv7/8AfI/wo/4iJm38y+4P9Q8t7P73/mexf8NIWf8A0AvDf/g1l/8Aj1H/AA0hZ/8AQC8N/wDg1l/+PV47/Z7+/wD3yP8ACj+z39/++R/hR/xETNv5l9wf6h5b2f3v/M9i/wCGkLP/AKAXhv8A8Gsv/wAeo/4aQs/+gF4b/wDBrL/8erx3+z39/wDvkf4Uf2e/v/3yP8KP+IiZt/MvuD/UPLez+9/5nrEn7UVnHIy/8IzorbTjI1C5IP5SYpP+GorU/wDMraT/AOB1z/8AHa8MvL54buVN7jY5H3iOhqE6gxP3v0Br24cb45xTcjz5cH4JOyj+L/zPef8AhqSzH/Mr6P8A+B91/wDHKX/hqK1/6FbSf/A65/8AjteDDUnA++//AH0RSHUGJ+9+gNN8b4/pIn/VDBfy/i/8z3gftUWFscv4V0g/9v11/wDHK77Qv24/h6LWyhu/gtpF9NHEizXH/CT6jH5zgAM+0HC5OTjtmvktdTdf4mI9CTipbLUmRyQx5OaUeLsfWdnO1uxE+EcCl8Gvq/8AM+8/Fvh7wL8evhRH4n8K3CWllEUtNS0i7n3Xfhq7b/VqJGGZ7N/4JMbkGFcs2WPkP7TXg+bwL+w8NOuFIkj+IYZG6B1/s+Rc/wDjteTfCb4naj4C8R29/YXBSZCY2VwHjdSBlWU9Qcng161+3FqssnwPisVYrZw+ILaSKPJITNpcDHPPA4559zX1OY1qOZ5FXxNRfvacd++qPncBgq2W5vSw8XenN6eR8k0UUV+Hn64FFFFABRRRQAUUUUAFFFFAH3z8Zm83UvH+MDdZTYycfMJY8/hivk9IkTXNSdXAVb2ZSGGWGW4/MsefpX1V8cNZTRvHmtGW3guLW4aeC4hkJCSRs43DI6cDr2zXLeOv2IdR+JaReJvgzZeI/GmiTytDe2Nrbx3uu6HMcFra8t4iMqT/AKudBtcYUhTzX7H4o4WpXVJ0lflvf5n5VwFmFHDKXtnbmSt8u54Ts/3KNn+5XYeL/wBlX4p/D9bf+2/hz8SdN+2BjD53hiZSwHqN3WsE/CHxsB/yJnxB/wDCZn/+Kr8Z/s7EvaD+4/VVmuFe0196M3Z/uUbP9ytH/hUnjX/oS/iF/wCEvP8A/FUf8Kk8a/8AQl/EL/wmJ/8A4qn/AGbiv+fcvuf+Rp9fw/8AOvvX+ZnbP9yjZ/uVon4R+NgOPBfxB/HwzOB/6FTP+FTeOP8AoSvHn/hOzf40f2biv+fcvuf+RH9p4b+dfev8yjs/3KNn+5V7/hU3jj/oSvHn/hOzf40o+EvjgnnwX48/Dw7OT/Oj+zcV/wA+5fc/8g/tPC/zr71/mUNn+5Rs/wBytH/hUfjX/oS/iF/4TE//AMVR/wAKj8a/9CX8Qv8AwmJ//iqP7NxX/PuX3P8AyH/aWG/nX3r/ADM7Z/uUbP8AcrR/4VH41/6Ev4hf+ExP/wDFUf8ACo/Gv/Ql/EL/AMJif/4qj+zcV/z7f3P/ACD+0sN/OvvX+ZnbP9yjZ/uVo/8ACpPGv/Ql/EL/AMJef/4qj/hUnjX/AKEv4hf+ExP/APFU/wCy8V/I/uf+RX1/D/zr71/mZ2z/AHKNn+5Wl/wqLxsf+ZM+II/7lif/AOKo/wCFQ+Nh/wAyf4/P/csT/wDxVL+zcV/z7f3P/In+0sN/OvvX+Zm7P9ylWPLAfLzWh/wqTxqf+ZM+IQ/7lef/AOKpf+FReNl5Hg7x8SO3/CL3HP8A49T/ALLxX8j+5/5FfX8P/OvvX+ZSa2AUn5eKi2f7laX/AAqnxyeD4K+IGP8AsV5//iqQ/CTxtjjwX8Qs/wDYrz//ABVH9l4r+R/c/wDIPr+H/nX3r/Mztn+5Rs/3Kvj4R+OM8+C/iCB6/wDCLz//ABVP/wCFQ+Nf+hP8fn/uV5//AIql/ZuK/wCfcvuf+Qf2hhv5196/zM3Z/uUbP9ytH/hUfjX/AKEv4hf+ExP/APFUN8JPGwUn/hC/iDx/1LE//wAVR/ZuK/59v7n/AJE/2lhv5196/wAzO2f7lGz/AHKuf8Kq8b/9CX8Qf/CXn/8AiqP+FVeN/wDoS/iD/wCExP8A/FU/7LxX8j+5/wCRX1/D/wA6+9f5lPZ/uUbP9yrn/CqfG/8A0JfxB/8ACYn/APiqP+FVeN/+hL+IP/hMT/8AxVH9mYr+R/c/8hLMcM/tr71/mU9n+5Rs/wByrn/CqvG//Ql/EH/wmJ//AIqj/hVPjf8A6Ev4g/8AhMT/APxVH9mYr+R/c/8AIHmOGX2196/zKez/AHKNn+5Vz/hVPjf/AKEv4g/+ExP/APFUf8Kp8b/9CX8Qf/CYn/8AiqP7MxX8j+5/5C/tLDfzr71/mU9n+5Rs/wByrn/CqfG//Ql/EH/wmJ//AIqj/hVPjf8A6Ev4g/8AhMT/APxVH9mYr+R/c/8AIP7Sw386+9f5nluuTsut3g44nf8A9CNVPtDe1dtqH7PPxAur+eVfA3jMrJIzAtos6kgnPIwcfTNQ/wDDOXxB/wChG8Y/+Caf/wCJrvjhMXbSnL7mYPFYW9+dfev8zlFYlQc9aMn1NdX/AMM/fEJOP+EE8Y8cf8gaf/CnD9nj4isMjwL4ux76PP8A4USw2KSv7OX3MX1rCrea+9HJZPqantGO7r3rqof2cviLLKsY8B+Mdzd/7Fucf+gV2ujf8E9fj3qMcEsHwX+Ktzb3SLLDND4S1F45UYZVlIhIIIIII4Na0sPXjJe1i4+qsRPE4XX31ou5w/hVGuL2GNF3OWT5AMvyQMj1HH4V7p+2wXPwhXftVl122R0HJRha3AI/CuhsP2edM/ZZ8LWEPiWaVvizqWyQ6K0eE8J2bLuY3QZQwu3J/wBUcGI5VhkVx/7VUrXH7PkUj48xvENuWDffB+y3HX3r9SwlONPh3Frq4/qj89xWMeJznDOC91S3+R8yUUUV+NH6WFFFFABRRRQAUUUUAFFFFAH3T+0NaiXx/qkDugL3cyY2FjjcT0HX6Vh/ErwZ8Of2ZNG0+z+Jdt4k8QeOtUVbqfQPD+u2elDw1A3KLdTy2t0HmkBB8mNU8sHJz0rb/ao8cN8LJPE/iS2tln1KHVRaWrv92FpBITIP9pSoK9vUGviTX9fufEuqTXl3K8007tIzu252JJJLMeWPucngelfsviBmdPC1VhVrO1/kz8n4MyuWLoqrPSC0820ex+OPid8Irny/7D8FfEPThDkXDX/jmzvRk9Agj0yLGffNc0fiH4BP/MveL/8AwooP/kKvNKaUJP3nH41+aUc9r09kn8j9CWTYdbX+9npp+IXgAdfD/i7H/Yxwf/IVJ/wsb4fHp4f8X5/7GOD/AOQa8z2H++/50u33Nbf6x4j+WP8AXzL/ALKo93956YPiF4BBz/wj/i7/AMKKD/5Cp3/CyPAX/Qv+LP8AwoLb/wCQa8w2H++/50bD/ff86P8AWPEfyx/r5lf2Rhu7+89P/wCFkeAv+hf8Wf8AhQW3/wAg0D4jeAmOD4f8W88f8jBb/wDyDXmGw/33/OgIQc73496P9Y8R/LH+vmH9kYbu/vPUf+E78Af9C/4w/wDCjg/+QqP+E78Af9C/4w/8KOD/AOQq8x3t/eb86N7f3m/Oj/WPEfyx/r5h/ZGH7v7z07/hO/AH/Qv+MP8Awo4P/kKg+PPAABP/AAj/AIw/8KOD/wCQq8x3t/eb86C7EY3tz70f6x4j+WP9fMP7Iw/d/eelL8QPABIH/CP+Lv8Awo4P/kKpD488AKCf+Ef8X8f9THB/8g15cEIOd78e9PLsRje3PvS/t+v2X3P/ADJ/smj3f3npQ+IHgFjj/hH/ABdz/wBTHB/8hU7/AITnwAOnh3xaP+5jg/8AkKvMUUq4O9+DnrU32n3en/rHiP5V/XzK/sjD93956R/wnfgL/oX/ABd/4UcH/wAhUDx14ABz/wAI74t4/wCpjg/+Qq83+0+70fafd6n+363Zfd/wSf7Ko93956V/wn/gI9fD3i3/AMKOD/5CoHjvwAD/AMi/4v8A/Cjg/wDkGvNTcZH3npu//ak/On/b9fsvuf8AmH9k0e7+89OPj74fkY/4R7xf/wCFHB/8hUxvHXw+UEjw74uyP+pjg/8AkKvNC/H3pPzppdiMb2596f8ArHiP5Y/18wWU0e7+89J/4WD4B/6F/wAX/wDhRwf/ACFQfiD4BI/5F/xf/wCFHB/8hV5nsP8Aff8AOjYf77/nR/rHiP5V/XzK/sjD93956V/wnngD/oAeMP8Awo4P/kKj/hPPAH/QA8Yf+FHB/wDIVea7D/ff86Nh/vv+dT/b9bsvu/4Iv7Ko9397PSv+E88Af9ADxh/4UcH/AMhUf8J54A/6AHjD/wAKOD/5CrzXYf77/nRsP99/zo/t+t2X3f8ABG8pw/Rv72elf8J54A/6AHjD/wAKOD/5Co/4TzwB/wBADxh/4UcH/wAhV5rsP99/zo2H++/50f2/W7L7v+CCynD9W/vZ6V/wnngD/oAeMP8Awo4P/kKj/hPPAH/QA8Yf+FHB/wDIVea7D/ff86Nh/vv+dH9v1uy+7/gj/snDd397PSv+E88Af9ADxh/4UcH/AMhUf8J54A/6AHjD/wAKOD/5CrzXYf77/nRsP99/zo/t+t2X3f8ABD+ycN3f3s9JPxA8CA8eH/GmPbxHb/8AyFU1h8RPh5FdwtdeGvHc8AfMqReKLWJ2X0VjYMAfcqfpXmQ4HrRWTz7F7RaXohf2XQ8/vZ9CWHxa/Z5u76GGb4ffGi0gZ/3ky/ELTLiVU6bli/sZN7DOdu8ZAPI61m/tEfA+T4NX9jqeja1b+JvA3iaI3fh7X4WCJdwggtHNGMmKeLIWaM/NGwJAZcGvDGXdjkjByMHBzXe/AzxjMfEFh4T1ASXPhjXLyK2ubZjn7PI7ALcQ/wByZRxv5yOG3DinhMbUq1OWrN66L1Zz18DGgvbU9VHVp63S/UopczNKcFeDwWUbse/vWlphkaXcwjZvUjmqV/p62Gs3cCicrDM6DoOAxHYYq5pUWX+7P+Y/wrWHtXWcKkm7PqEoQlTUklaSvt3PQfBRllMQyoKkOCOucYH1x+la37TsWz9nO2OxVH9v23TJP/HrceprJ8DRZdPlm6DuPT6VrftOD/jHG2OJB/xUFsPm6f8AHrcV+kqLWQ4n/B+qPimrZvQjFaKX6HzTRRRX4ufpwUUUUAFFFFABRRRQAUUUUAfZn7fyn/hAfEo3NtHiWJsduUlr4zr7N/b/AP8AkQvE3/Yxw/8AoEtfGVfo3ih/yOF/gj+bPhfD1Wytr+/L9Aooor85PugooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACul+DrFPiv4ZbcTjVbZsHpxIBXNV0vwhOPin4a/7Clt/wCjRXVgv94p/wCKP5nLjf8Ad6i/uv8AI1fEUzx+LNTUO2Fu5R/4+ataTI5IO9uapeKGRfGGq5kAP2yXjaePnNWtIkj4/fL0/uGvYuli5+r/ADOCk74en/hX5I9E8DO4ZPnboK0/2nSzfs2W5LMceI7cYP8A163FZXgZ03p+9HQfwGtj9pyMf8MywMCT/wAVHbfra3X+FfpDkv7AxP8Ag/VHxn/M3o/4v0PmSiiivxU/TAooooAKKKKACiiigAooooA+zv8AgoKPK8D+J0wWx4miAcfdICz/AOAr4xr7L/b0kMnw08REng+IrdsdhlJjXxpX6N4of8jlf4I/mz4bw+f/AAmS/wAcv0Ciiivzk+5CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6T4Q/8lT8M/8AYUtv/Rorm66T4Q/8lT8M/wDYUtv/AEaK6sF/vFP/ABR/M5sZ/Aqf4X+RqeKJ9vjDVB5+3F3Lxszj5zVzSJnIGJCRjrgc/pVXxOz/APCX6piZVH2uXjA4+c1a0hdxGZYzkV60v96n6v8AM86h/u0PRfkj0HwNK+5PnPQdh/hWz+09z+zFB3/4qO1/9JbusbwKmWT95H0FbH7TnP7L8JyDjxJajj/r1u6/Rv8AmQYn/B+qPjf+ZvR/xfofMVFFFfjJ+mBRRRQAUUUUAFFFFABRRRQB9lft6/J8NvEIHQ+Ibb/0XNXxrX2V+3uP+LceIf8AsYbb/wBFzV8a1+i+J/8AyOV/gj+bPhvD9NZZJP8Anl+gUUUV+dH3IUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXSfCH/kqfhn/ALClt/6NFc3XSfCH/kqfhn/sKW3/AKNFdWC/3in/AIo/mc2M/gVP8L/I0vFEefGOqn9z/wAfkvUHP3z71d0aFMrzB0HY/wCNVvE+3/hL9U/1P/H3L1Bz98+9WdIVMj5EP06V60/96n6v8zzqH+7Q9F+SO98DlRKozBwB2P8AjW9+02gX9lyHDIf+Kkszgds2l2a57wREhmXmEdOxro/2mIl/4ZXRgACPE1kuR3H2O7Nfo3/MgxP+D9UfHf8AM4or+9+h8v0UUV+Mn6WFFFFABRRRQAUUUUAFFFFAH2Z+32uz4feIlHQeIYf0WUV8Z19nft/rjwL4mHZPEMOPxWWvjGv0bxQX/Cyv8EfzZ8TwErZfP/HL9Aooor85PtgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EP/ACVPwz/2FLb/ANGiubrpPhD/AMlT8M/9hS2/9GiurBf7xT/xR/M5sZ/Aqf4X+RqeJ1U+MNUyik/bJf8A0M1b0gYx24qr4nR/+Ev1TEZI+2S87hz85q3pEcnH7lun98V60v8Aep+r/M86h/u0PRfkjufBKr5qnYpNdP8AtMIB+ycpHH/FU2Ix/wBuV3XNeCY380fuj/32K6f9plWH7JSkxlR/wlNjzuB/5cryv0b/AJkGJ/wfqj45K+cUf8X6HyzRRRX4yfpYUUUUAFFFFABRRRQAUUUUAfZv/BQNtvg/xSvb/hIID/47LXxlX2j/AMFCIQng/wAUEZydfg/9Blr4ur9H8Uf+RxH/AK9x/NnxXAn/ACL5/wCOX6BRRRX5wfahRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdJ8If+Sp+Gf8AsKW3/o0VzddJ8If+Sp+Gf+wpbf8Ao0V1YL/eKf8Aij+ZzYz+BU/wv8jT8URofGGq5QE/bJe5/vmrWkRR8fIvT1P+NVvE7Y8Yar8jn/TJeR/vmrWjvkj93J0r1pf71P1f5nnUP92h6L8kd14JiTzV+Qfmf8a6j9pdFX9ktcKAf+Epse5/58ruuX8EPmVf3cldT+0sd37JAOMf8VTY8f8Abnej+lfo3/MgxP8Ag/VHyEP+RvS9f0Plqiiivxk/SQooooAKKKKACiiigAooooA+0/8AgoadvhLxSvYa/B/6DLXxZX2n/wAFEfl8LeK/bxHCv4bZTXxZX6P4o/8AI4j/ANe4/mz4vgT/AJF8/wDHL9Aooor84PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EP/JU/DP8A2FLb/wBGiubrpPhFx8UvDP8A2FLb/wBGiurA/wC8U/8AFH8znxavQqf4X+RreJ5MeL9U/wBd/wAfcvQjH3z7Vb0iXkf6/p6j/CqHijd/wmOq/wCu/wCPyXoRj759qt6OWJH+v6eo/wAK9af+9T9X+Z51GLWGh6L8kd54JlfzhgTfmP8ACup/aT+b9kTJVwR4p0/k982mof4VzXgYMXT/AF/Qdx/hXVftLIR+x5uLOc+KtPGD2/0TUa/Rb/8ACDiP8H6o+Ph/yN6Xr+h8qUUUV+NH6SFFFFABRRRQAUUUUAFFFFAH2n/wUT/5FfxZ/wBjLF/6BJXxZX2n/wAFE/8AkV/Fn/Yyxf8AoElfFlfo3ig75vF/9O4/mz4vgT/kXz/xy/QKKKK/OT7QKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhF/wAlS8M/9hS2/wDRorm66X4QjPxT8Nf9hS2/9GiurA/7xT/xR/MxxP8AAqP+6/yNLxPPjxfqvzuMXk3/AKGauaRcjI+eTp7VU8TEf8Jfqnyj/j8l/wDQzVzSCOPlXp6V60/96n6v8zz4K2GpryX5I7vwPfFZVG9+grrP2k5RL+xrnnd/wllhnP8A16ajXLeB41LqcDkV1f7SoA/Y0IAAx4tsP/STUa/RH/yIcR/g/VHxsFfN6Xr+h8pUUUV+Nn6QFFFFABRRRQAUUUUAFFFFAH2n/wAFFvl8N+LB2/4SWL/0CSviyvtb/go5EE8N+LCM/wDIzRf+gSV8U1+i+J3/ACNof9e4/nI+L4F/5F8/8cv0Ciiivzo+0CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6X4Qf8AJU/DX/YTtv8A0aK5quk+ERx8U/DP/YUtv/RorqwP+8U/8UfzMcT/ALvVX91/kaviZH/4S/VMRkj7ZLzvHPzmrekRycfuW6f3xVHxPGjeMNVygJ+2S9z/AHzVvSIo+PkXp6n/ABr1p/71P1f5nBF3w1N/3V+SPRfA0b70/dHoP4xXT/tK/wDJmpyMH/hLbDj0/wBE1GuV8DRJuT5B0Hc/411f7S6BP2NOP+htsP8A0k1Gv0R/8iHEf4P1R8dS/wCRvT9f0PlGiiivxs/RgooooAKKKKACiiigAooooA+2P+Cj3/IteLP+xmi/9Akr4nr7a/4KPoB4e8Yj+54mhx+KSV8S1+i+J3/I2h/17j+cj4vgT/kXz/xy/QKKKK/Oj7QKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhF/yVLwz/2FLb/0aK5uuk+EX/JUvDP/AGFLb/0aK68D/vNP/FH8zHEfwKn+F/kafiZseMNV/duf9Ml/9DNW9HfJH7uTpVbxNJjxfqn+u/4/JehGPvn2q5pEvI/1/T1H+FerP/ep+r/M8+n/ALrD0X5I7/wMclOMcCus/aYGf2MmP93xdp4/8k9RNcn4HfMi/u5DwOa6z9pds/sYyfIy/wDFX6dyf+vLUa/RH/yIcR/g/VHx9L/kb0/X9D5Pooor8bP0YKKKKACiiigAooooAKKKKAPtv/gpB/yAPGf/AGM0H/oElfElfbf/AAUg/wCQB4z/AOxmg/8ARclfElfoniY75tD/AK9x/OR8XwJ/yL5/45foFFFFfnZ9oFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV0nwi/5Kl4Z/7Clt/wCjRXN10nwi/wCSpeGf+wpbf+jRXXgf95p/4o/mY4j+BU/wv8jS8T7v+Ex1X/Xf8fk3QjH3z7Vb0csSP9f09R/hVbxMzf8ACX6p87D/AEyUf+PmrmkO+R87dK9Wf+9T9X+Z59P/AHWHovyR6B4FlcMnE3Qdx/hXW/tLuzfsYuCJMf8ACX6d97p/x5ajXJ+BncMnzt0FdZ+0uzH9jBwWJH/CX6d1/wCvLUa/RH/yIcR/g/VHx9L/AJG9P1/Q+TqKKK/Gz9GCiiigAooooAKKKKACiiigD7b/AOCkH/IA8Z/9jNB/6Lkr4kr7Z/4KPtnw54uPd/E0OfwSSviav0LxLVs1h/17j+bPi+BP+RfP/HL9Aooor89PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/JUvDP/YUtv/Rorm66T4Rf8lS8M/8AYUtv/RorrwP+80/8UfzMcR/Aqf4X+RpeJ3QeMNV/egH7ZLxsPHzmrekSR8fvl6f3DVfxNI//AAl+qfOQPtko6D++at6RLJx87dPQf4V6s/8Aep+r/M8+n/usPRfkjv8AwM6b0/ejoP4DXW/tLHP7GD85/wCKv07n/ty1GuU8DSvuT5z0HYf4V1n7S/P7GMnf/ir9O/8ASLUa/RH/AMiHEf4P1R8fS/5G9P1/Q+TqKKK/Gz9GCiiigAooooAKKKKACiiigD7Y/wCCj3/IteLP+xmi/wDQJK+J6+1f+Cjcpfw54sBx/wAjLF/6BJXxVX6L4nq2bwX/AE7j+cj4vgX/AJF8/wDHL9Aooor86PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/JUvDP8A2FLb/wBGiubrpPhF/wAlS8M/9hS2/wDRorrwP+80/wDFH8zHEfwKn+F/kaniZP8AisNU/eIP9MlP/j5q5o6ZI/eR9Kp+J41PjDVcmLP2uXrnP3zVvR4UyOYenof8a9Wf+9T9X+Z59P8A3WHovyR6F4FTLJ+8j6Cur/aYOP2MyODu8W6eSf8At01EVx/gcqJVGYOAOx/xrrf2lG3fsZduPFmn9On/AB6ajX6I/wDkQ4j/AAfqj4+l/wAjen6/ofKVFFFfjZ+jBRRRQAUUUUAFFFFABRRRQB9m/t/Ot38P/EsxBMjeJIXLdmysx/rXxlX2V+3l8vwz8Qg9f+Ehtv8A0XNXxrX6L4of8jlf4I/mz4bw+/5Fkv8AHL9Aooor86PuQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACul+EP/JU/DX/AGFLb/0aK5quk+EP/JU/DP8A2FLb/wBGiurBf7xT/wAUfzObGfwKn+F/kafie3J8YaqfLzm8l54/vmrmkWrcfuu3t/jVTxRBu8YaofI3Zu5ed+M/OataTGgIzCAcf3zXryf+1T9X+Z51Ft4aHovyR6B4Hscuv7nnA7j/ABrd/aanmi/ZZitwwEDeJbRymB1FreY59tzfnWH4GRN6fuh0H8Zra/adGP2YYOMf8VHa8f8Abrd1+i3/AOEDE/4P1R8ddrN6Nv5v0PmKiiivxk/SwooooAKKKKACiiigAooooA+yv29/+Sc+IP8AsYbb/wBFzV8a19l/t8KV+HXiEHqPENv+iSg/rXxpX6L4n/8AI5X+CP5s+I4AVstkv78v0Ciiivzo+3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6T4Q/8lT8M/wDYUtv/AEaK5uuk+EP/ACVPwz/2FLb/ANGiurBf7xT/AMUfzObGfwKn+F/kafiiIHxhqv7gt/pcvO7r85q5o6NwBGwGOnpVLxRu/wCEx1XHnf8AH3L0Ax98+9XdGic7eZ+g7D/GvWl/vU/V/medQ/3aHovyR6F4GRyyfI3QVsftO8/swQHpjxJaj/yVu6w/AxYSKP3/AAB2H+Nbv7TSMv7LkOQwH/CSWhye+bW7r9G/5kGJ/wAH6o+N/wCZvR/xfofMNFFFfjJ+mBRRRQAUUUUAFFFFABRRRQB9m/t/AjwH4kHdfEMWfbiWvjKvs7/goCceC/FK9/8AhIYD/wCOy18Y1+jeKC/4WI/4I/mz4rgNWy+a/vy/QKKKK/OT7UKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhD/yVPwz/wBhS2/9GiubrpPhD/yVPwz/ANhS2/8ARorqwX+8U/8AFH8zmxn8Cp/hf5Gt4njz4v1T/Xf8fcvQDH3z71Z0hMMP3kg/Cqnidc+MNV+dx/pkvA/3zVvRxgLznivWl/vU/V/medQ/3aHovyR3XgiJvNXBmPTsK6L9pmI/8MtRtuYgeJbJcH1+x3ZrnfBK/vgfMcV037TEZH7KCnOR/wAJRYj3/wCPK7r9G/5kGJ/wfqj47/mcUV/e/Q+XKKKK/GT9LCiiigAooooAKKKKACiiigD7O/4KDRMvhHxSSODr8H/oMtfGNfaf/BQw48HeKB3Gvwf+gy18WV+j+KP/ACOI/wDXuP5s+K4E/wCRfP8Axy/QKKKK/OD7UKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhD/yVPwz/ANhS2/8ARorm66T4Q/8AJU/DP/YUtv8A0aK6sF/vFP8AxR/M5sZ/Aqf4X+Rp+KJEHjDVcuAftkvY/wB81a0iWPj516eh/wAKr+J3f/hL9UxIQPtkvG0cfOat6RJJx++bp/cFetL/AHqfq/zPOof7tD0X5I7jwTKnmr84/I/4V1H7S7q37Ja4YE/8JTY9j/z5Xdc14JkfzR+9P/fArp/2mWY/slKDIWH/AAlNjxtA/wCXK8r9G/5kGJ/wfqj5CKvnFL1/Q+WaKKK/GT9JCiiigAooooAKKKKACiiigD7T/wCCiHHhXxVnt4hgX8dstfFlfaf/AAUT/wCRX8Wf9jLF/wCgSV8WV+j+KP8AyOI/9e4/mz4vgT/kXz/xy/QKKKK/OD7QKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhD/wAlT8M/9hS2/wDRorm66T4Q/wDJU/DP/YUtv/RorqwX+8U/8UfzObGfwKn+F/kanidlHjDVMuoP2yX/ANDNWtIdOPnTpVfxPt/4S/VP9T/x9y9Sc/fPtVvRyuR/qOnqf8K9aX+9T9X+Z51D/doei/JHb+CXTzV+da6n9pc7v2SQR0/4Smx/9Ir0f0rl/BMqCYcQ/mf8K6j9pPDfsi5DKceKbDge9pf/AOFfo3/MgxP+D9UfIQ/5G9L1/Q+WqKKK/GT9JCiiigAooooAKKKKACiiigD7T/4KJ/8AIr+LP+xli/8AQJK+LK+0/wDgop8vhnxYD1/4SWL/ANAkr4sr9F8T3fN4P/p3H82fF8C/8i+f+OX6BRRRX50faBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdJ8IuPin4Z/7Clt/wCjRXN10nwi/wCSpeGf+wpbf+jRXVgf94p/4o/mYYlXoVP8L/I0vFEmPGOq/wCp/wCPyXqTn759qt6RL0/1HT1P+FV/ExH/AAl+qfLEf9Lm6n/bNXNHYAj5YenrXrT/AN6n6v8AM8+lFLDQ9F+SO78DAGRT+45A7n/Cup/aVQ/8Mf7tqAf8JVp4yv8A16ajXM+Bp1WRRsi4A711X7SxD/sbbgR/yNmn8Dt/omo1+iN/8IOI/wAH6o+Nh/yN6Xr+h8pUUUV+Nn6SFFFFABRRRQAUUUUAFFFFAH2p/wAFGoyvhzxWSP8AmZYv/QJK+K6+2P8Ago9/yLXiz/sZov8A0CSviev0XxO/5G0P+vcfzkfF8C/8i+f+OX6BRRRX50faBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdJ8Ihn4p+Gf+wpbf+jRXN10vwg/5Kn4a/wCwnbf+jRXVgf8AeKf+KP5mOJ/3eq/7r/I0vE0SHxhqvXJvJv8A0M1b0iGPj73SqfieRF8YarlwD9sl7H++at6RLHx869PQ/wCFetP/AHqfq/zOCKthqa/ur8kd94ItFMinJ5FdZ+0lEsf7GhxnP/CW2AP/AICajXL+BpU3J846Dsf8K6r9pQ5/Y1JHT/hLbD/0k1Gv0R/8iHEf4P1R8bTV83pev6HylRRRX42fo4UUUUAFFFFABRRRQAUUUUAfbP8AwUfU/wDCOeLh3TxNDn2+SSviavtv/gpB/wAgDxn/ANjNB/6BJXxJX6L4nf8AI2h/17j+cj4vgT/kXz/xy/QKKKK/Oj7QKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpfhCcfFPw1/2FLb/ANGiuarpPhF/yVLwz/2FLb/0aK6sD/vFP/FH8zHE/wACov7r/I1fEzv/AMJfqmJCB9sl42Dj5zVvSJJOP3zdP7gql4mZR4w1XLqP9Ml/9DNW9IdOPnTpXrT/AN6n6v8AM8+Dvhqb8l+SPRPA0j70/enoP4BXUftLqV/Y1OTnPi2w5/7dNRrlfAxyyY54FdZ+0wM/sZk/3fFunj/yU1E1+iP/AJEOI/wfqj4+l/yN6fr+h8n0UUV+Nn6MFFFFABRRRQAUUUUAFFFFAH23/wAFIP8AkAeM/wDsZoP/AECSviSvtv8A4KQf8gDxn/2M0H/ouSviSv0PxLd81h/17j+bPi+BP+RfP/HL9Aooor88PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/ACVLwz/2FLb/ANGiubrpPhF/yVLwz/2FLb/0aK68D/vNP/FH8zHEfwKn+F/ka3iYr/wl+qf6n/j7l6k5++farejlcj/UdPU/4VQ8TyY8YaqP3P8Ax+TdSc/fPtVvSJen+o6ep/wr1Z/71P1f5nn0/wDdYei/JHofgdl3qN6DgdOldZ+0uyn9jKTDAn/hL9O6f9eWo1yfgWVN6cQ5wO5rrf2l5Fb9jFwBHn/hL9O+71/48tRr9Ef/ACIcR/g/VHx9L/kb0/X9D5Oooor8bP0YKKKKACiiigAooooAKKKKAPtr/gpAwPh/xiezeJoMe/7uSviWvtX/AIKKymfwv4qJwM+IoX49Ssor4qr9E8TY8ubQX/TuP5s+L4E/5F8/8cv0Ciiivzs+0CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6T4Rf8AJUvDP/YUtv8A0aK5uuk+EXPxT8M/9hS2/wDRorqwP+8U/wDFH8zDEu1Cp/hf5Gp4mf8A4rDVP3aH/TJR/wCPmrmjvgj93H0ql4nU/wDCYarhk/4/Jep/2zVvSFPHzJ09a9af+9T9X+Z59KSeGh6L8keh+BXwyfu4+grrP2l2z+xg/wAir/xV+ncj/ry1GuO8DmTzFAMWOK6r9pWWQfseMjeWVbxXpz8dc/ZNRFfojX/CDiP8H6o+Ppu2b0vX9D5Vooor8bP0cKKKKACiiigAooooAKKKKAPtP/gonx4X8Wf9jLCPw2S18WV9p/8ABRP/AJFfxZ/2MsX/AKBJXxZX6P4o/wDI4j/17j+bPi+BP+RfP/HL9Aooor84PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/ACVLwz/2FLb/ANGiubrpPhF/yVLwz/2FLb/0aK6sD/vFP/FH8zHE/wACp/hf5Gn4nty3jDVTiHm7l6gZ++at6PbNkcQdP7oqn4nJ/wCEw1X92p/0ybt/tmrekM3H7pen92vWn/vU/V/mefT/AN1h6L8keheBbZt6cQdB/CK6j9peJU/Y7ztUN/wlengkD/p01GuQ8ESMJV+QdPSuv/aRdm/Yz5UDHizT+cf9Omo1+iP/AJEOI/wfqj4yH/I3pev6HypRRRX42fpIUUUUAFFFFABRRRQAUUUUAfaf/BRP/kV/Fn/Yyxf+gSV8WV9p/wDBRjjw54rHb/hJYv8A0CSviyv0XxO/5G0P+vcfzkfF8C/8i+f+OX6BRRRX50faBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdL8IP+Sp+Gv+wnbf+jRXNV0vwg/5Kn4a/wCwnbf+jRXVgv8AeKf+KP5mOK/3ar/hZp+JWP8Awl+qcn/j8l/9DNXNIc8cnp61S8TyKPGGq/vgP9Ml48vOPnNWtIlXj9+vT/nlXrT/AN6n6v8AM4F/u9P/AAr8keh+B/vJ9BXU/tKkn9jU/wDY22H/AKSajXK+BpV3p+/HQf8ALKuq/aUOf2NDzn/irbDnGM/6JqNfoj/5EOI/wfqj46l/yN6fr+h8pUUUV+Nn6MFFFFABRRRQAUUUUAFFFFAH2x/wUeUDw34swB/yM0X/AKBJXxPX2x/wUe/5FrxZ/wBjNF/6BJXxPX6L4nf8jaH/AF7j+cj4vgX/AJF8/wDHL9Aooor86PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/JUvDP8A2FLb/wBGiubrpPhF/wAlS8M/9hS2/wDRorqwP+8U/wDFH8zHEfwKn+F/kaviV2/4S/VOT/x+S9/9s1b0iRuPmbp61U8TJJ/wl+qYMePtcvUf7Zq3o6S5HzRdPQV60/8Aep+r/M8+n/usPRfkj0HwNI25PmPQd66r9pkf8YafXxbYf+kmo1yngbIZM4zgdK6z9pf/AJMyf28X6d/6R6jX6I/+RDiP8H6o+Ppf8jen6/ofJ9FFFfjZ+jBRRRQAUUUUAFFFFABRRRQB9t/8FHwP+Ef8ZD08TQY9vkkr4kr7b/4KQf8AIA8Z/wDYzQf+gSV8SV+i+J3/ACNof9e4/nI+L4E/5F8/8cv0Ciiivzo+0CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6T4Rf8AJUvDP/YUtv8A0aK5uuk+EX/JUvDP/YUtv/RorrwP+80/8UfzMcR/Aqf4X+RqeJif+Ev1TiH/AI/JeqjP3zVzSCcjiD/vkVS8T25bxhqpxDzdy9QM/fNW9HtmyOIOn90V6s/96n6v8zz6f+6w9F+SPQ/AqSF0wYsYHYV1n7TCOP2MXLFCP+Ev07p/15ajXJeBYH3p/qeg7Cut/aXjZP2MXJ8vH/CX6d90c/8AHlqNfoj/AORDiP8AB+qPj6X/ACN6fr+h8nUUUV+Nn6MFFFFABRRRQAUUUUAFFFFAH23/AMFIP+QB4z/7GaD/ANFyV8SV9t/8FIP+QB4z/wCxmg/9FyV8SV+heJX/ACNYf9e4/mz4vgT/AJF8/wDHL9Aooor89PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/JUvDP8A2FLb/wBGiubrpPhF/wAlS8M/9hS2/wDRorrwP+80/wDFH8zHEfwKn+F/kaXiZAfGGq8D/j8l7f7Zq5pCLxwOnpVbxPGx8X6p+5J/0yXnzMZ+c1b0iJuP3DdP+eterP8A3qfq/wAzz6f+6w9F+SO/8DIu5OB0Haut/aWUD9jGTAA/4q/Tv/SLUa5XwNE29P3B6D/lrXVftL8fsYycY/4q/TuM5x/oWo1+iP8A5EOI/wAH6o+Ppf8AI3p+v6HyfRRRX42fowUUUUAFFFFABRRRQAUUUUAfbP8AwUfP/FN+LT3PiaLPv8klfE1fbH/BR7/kWvFn/YzRf+gSV8T1+ieJv/I2h/17j+cj4vgT/kXz/wAcv0Ciiivzs+0CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6T4Rf8lS8M/8AYUtv/Rorm66T4Rf8lS8M/wDYUtv/AEaK68D/ALzT/wAUfzMcR/Aqf4X+RpeJkU+MNV4H/H5L2/2zVvSI14+VenpVXxO8Y8YarkSZ+2TdD/tmrejvHkfLL09TXqz/AN6n6v8AM8+n/usPRfkj0HwNGu5PlHQdq639pcY/Yxk/7G/Tv/SLUa5LwK8e9Pll6DvXWftMH/jDMYzg+LNPPP8A16ajX6I/+RDiP8H6o+Ppf8jen6/ofKFFFFfjZ+jBRRRQAUUUUAFFFFABRRRQB9pf8FF5hJ4c8V4JI/4SaIf+OS/4Gvi2vsz9veUzfDXxETjB8RwMPUZSY9a+M6/RvFD/AJHC/wAEfzZ8RwBPmy2T/vy/QKKKK/OT7cKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhF/yVLwz/wBhS2/9GiubrpfhCcfFPw1/2FLb/wBGiurA/wC8U/8AFH8zDFStQqf4X+Rp+J5VHjDVR+94u5ehOPvmrejzpkf67p6mqfihkXxhquZAD9sl42nj5zVrSJI+P3y9P7hr15W+tT9X+Z51KV8ND0X5I73wPcr5q8z9v4jXXftJtu/Yyzkn/irNP69f+PTUa5bwM6b0/ejoP4DWx+05GP8AhmWBgSf+Kjtv1tbr/Cv0Vpf2DiP8H6o+OjPlzel5y/Q+ZKKKK/GT9JCiiigAooooAKKKKACiiigD7K/b0Oz4a+IV658Q23/ouavjWvsr9vf/AJJz4h/7GG2/9FzV8a1+i+J//I5X+CP5s+G8PlbLJJ/zy/QKKKK/Oj7kKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhD/wAlT8M/9hS2/wDRorm66T4Q/wDJU/DP/YUtv/RorqwX+8U/8UfzObGfwKn+F/kaniifb4w1Qeftxdy8bM4+c1c0iZyBiQkY64HP6VV8Ts//AAl+qYmVR9rl4wOPnNWtIXcRmWM5FetL/ep+r/M86h/u0PRfkj0HwNK+5PnPQdh/hWz+09z+zFB3/wCKjtf/AElu6xvAqZZP3kfQVsftOc/svwnIOPElqOP+vW7r9G/5kGJ/wfqj43/mb0f8X6HzFRRRX4yfpgUUUUAFFFFABRRRQAUUUUAfZf7fS7Ph74iXrjxDB+iSivjSvs39v9ceBPEy/wBzxDF+ORLXxlX6N4oL/hYX+CP5s+J4C/5F0/8AHL9Aooor85PtgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EP/JU/DP/AGFLb/0aK5uuk+EP/JU/DP8A2FLb/wBGiurBf7xT/wAUfzObGfwKn+F/kaXiiPPjHVT+5/4/JeoOfvn3q7o0KZXmDoOx/wAareJ9v/CX6p/qf+PuXqDn7596s6QqZHyIfp0r1p/71P1f5nnUP92h6L8kd74HKiVRmDgDsf8AGt79ptAv7LkOGQ/8VJZnA7ZtLs1z3giJDMvMI6djXR/tMRL/AMMrowABHiayXI7j7Hdmv0b/AJkGJ/wfqj47/mcUV/e/Q+X6KKK/GT9LCiiigAooooAKKKKACiiigD7N/wCCgTbfBvilP+pggOf+Ay18ZV9of8FB4dnhDxS2c51+Dt/sy18X1+j+KP8AyOI/9e4/mz4rgT/kXz/xy/QKKKK/OD7UKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhD/wAlT8M/9hS2/wDRorm66T4Q/wDJU/DP/YUtv/RorqwX+8U/8UfzObGfwKn+F/kanidVPjDVMopP2yX/ANDNW9IGMduKq+J0f/hL9UxGSPtkvO4c/Oat6RHJx+5bp/fFetL/AHqfq/zPOof7tD0X5I7nwSq+ap2KTXT/ALTCAfsnKRx/xVNiMf8Abld1zXgmN/NH7o/99iun/aZVh+yUpMZUf8JTY87gf+XK8r9G/wCZBif8H6o+OSvnFH/F+h8s0UUV+Mn6WFFFFABRRRQAUUUUAFFFFAH2n/wUNO3wj4pX01+D/wBBlr4sr7R/4KAuNS8H+KJID5iPr8LKemVCTNnn2B4r4ur9I8UU/wC14v8A6dx/NnxXAbTy+dv55foFFFFfm59qFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV0nwh/wCSp+Gf+wpbf+jRXN10nwi/5Kn4Z/7Clt/6NFdWC/3in/ij+ZzYtfuKn+F/kafiiND4w1XKAn7ZL3P981a0iKPj5F6ep/xqv4mVv+Ew1T925/0uU5H++ataQ+CMxydPUV60v96n6v8AM86gn9WhfsvyR3PgmJPNX5B+Z/xrqP2l0Vf2S1woB/4Smx7n/nyu65nwQrGVf3Un5iuo/aXQ/wDDI+SMY8U2GR6Zs77/AOJr9G/5kGJ/wfqj5CLSzelf+b9D5Zooor8ZP0kKKKKACiiigAooooAKKKKAPsz9s1vO+GuuMeraqhOPaC4r4zr7L/bH/wCSZ61/2FE/9EXFfGlfpfij/wAjOH+FHwXh675fP/Gwooor80PvQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/JUvDP/AGFLb/0aK5uuk+EX/JUvDP8A2FLb/wBGiuvA/wC80/8AFH8zHEfwKn+F/ka/iW4ceLtUAYgC8lH/AI+an0oMzA+Y/PPWqfid0HjDVf3oB+2S8bDx85q3pEkfH75en9w16s/96n6v8zz6f+6w9F+SPQ/ArOGT526Cuk/aZct+yO2e/irT/wBLO/Fc14GdN6fvR0H8Bro/2l2z+ySMHIPimxP1/wBEv6/Rl/yIcT/g/VHw9R/8K1H/ABo+WaKKK/GT9OCiiigAooooAKKKKACiiigD7L/bH/5Jnrf/AGFE/wDRFxXxpX2X+2P/AMkz1v8A7Cif+iLivjSv0vxR/wCRnD/Cj4Hw7/5F0/8AGwooor80PvgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/ACVLwz/2FLb/ANGiubrpPhF/yVLwz/2FLb/0aK6sD/vFP/FH8zLEfwKn+F/kanidrj/hMNU2oxX7ZLg7l/vn2q7o/nkL8+OOmBxVTxMn/FX6p/o4b/S5ed+M/OasaSpyOWX2z09q9WpK2Knfu/zPPpRbw0PRfkjv/BF1KsijfyOOgrpf2lvm/ZHDHr/wlFgfztdR/wAK5rwPCC68npXTftLDH7I+PTxRp/8A6TajX6LGSeQ4n/B+qPhq0Ws3of40fLFFFFfjZ+nBRRRQAUUUUAFFFFABRRRQB9lftjuG+GGslec6on/oi4r41r7IujZftSfB65+w30Fnc6g6T7WbcttciN1aB+AeshwxwPunpXyd448Bav8ADbxJdaTrdhc6dqFnIYpYZkKsrDHGD7EH6Eetfp/iVSdevRzCj71KcVaS2+fb5n59wHUjRpVcDVdqsZO8ev8AwTIooor8wP0EKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpfg4PM+LHhlf+opbf+jVrmq9U/Z6+Euoy6pp3jPUIZrTw1pd15qT7Tu1CaPLCGEY+Yhgu89EUlj2B9HKaFSrjKcKav7yfyT3OHM68KWGnKbtdNLzbWyMzxVpCjxZqbbMk3cp7/3zTtJUowXaRjiun1LQn1PUbi5KMhuJGkK9cbiTj9am03wwVnUbDz7V9RPKK88TJxj1f5nh08xhDDxjJ2aS/I0vBcojKcHOBXQftKzuf2UWjaMoP+En09gSc5H2O+b/ANmP6VrfC74X33i7XLDT9NsLm8vL2YQRxR4LOSccDHAHrXsH/BU79kmP9kj9hvwfaazcSSeMPE3imG8mhVgYrW3isrkbOmd26VR1x8vSvssZS+q5JXhV0co2X3o+L+v0p53h6Sl7zlt8j856KKK/FD9eCiiigAooooAKKKKACiiigDtfgn8Y774T+IgySs2mXTAXcBG5WHrj19cdR+GPqn4mftMfAb9qHwppUfxPuPFD69o0SW9rq+hj7PeTQLwIrrzbeRJdgJCsoDc/MzYGPiGivosBxNicNhXgpRjUpvpNN29LNHzuP4ZwuKxUcapSp1F1g0r+t07n0F458K/s2M9l/wAI34j+JEa7WN0NR8qQ7v4Qmy1XA9c5rnz4V+CmOPEnivP+4P8A5Hrx2iiOf01/zB0f/AZ//Jlf2FU/6C6v3x/+QPX/APhFvgt/0Mfiv/vgf/I9H/CLfBb/AKGPxX/3wP8A5HryCitP9YqX/QFR/wDAZ/8Aywf9hVP+gur98f8A5A9f/wCEW+C3/Qx+K/8Avgf/ACPR/wAIt8Fv+hj8V/8AfA/+R68goqf9YaX/AEB0fun/APJh/YVT/oLq/fH/AOQPX/8AhFvgt/0Mfiv/AL4H/wAj0f8ACLfBb/oY/Ff/AHwP/kevIKKP9YaX/QHR+6f/AMmH9hVP+gur98f/AJA9f/4Rb4Lf9DH4r/74H/yPR/wi3wW/6GPxX/3wP/kevIKKP9YaX/QHR+6f/wAmP+w6n/QVV++P/wAgev8A/CLfBb/oY/Ff/fA/+R6P+EW+C3/Qx+K/++B/8j15BRR/rDS/6A6P3T/+TF/YVT/oLq/fH/5A9gHhb4LZ58R+K8f7g/8Akenf8Ir8E/8AoZfFn/fsf/I9eO0Uf6w0v+gOj90//kw/sKp/0F1fvj/8gexf8Ir8E/8AoZfFn/fsf/I9H/CK/BP/AKGXxZ/37H/yPXjtFH+sNL/oDo/dP/5MP7Cqf9BdX74//IHsX/CK/BP/AKGXxZ/37H/yPR/wivwT/wChl8Wf9+x/8j147RR/rDS/6A6P3T/+TD+wqn/QXV++P/yB7F/wivwT/wChl8Wf9+x/8j0f8Ir8E/8AoZfFn/fsf/I9eO0Uf6w0v+gOj90//kw/sKp/0F1fvj/8gexf8Ir8E/8AoZfFn/fsf/I9H/CK/BP/AKGXxZ/37H/yPXjtFH+sNL/oDo/dP/5MP7Cqf9BdX74//IHsR8K/BTHHiTxXn/cH/wAj0z/hFvgt/wBDH4r/AO+B/wDI9eQUUf6w0v8AoDo/dP8A+TD+wqn/AEF1fvj/APIHr/8Awi3wW/6GPxX/AN8D/wCR6P8AhFvgt/0Mfiv/AL4H/wAj15BRVf6xUv8AoCo/+Az/APlgf2FU/wCgur98f/kD1/8A4Rb4Lf8AQx+K/wDvgf8AyPR/wi3wW/6GPxX/AN8D/wCR68gopLiGkv8AmCo/+Az/APkw/sKp/wBBdX74/wDyB6//AMIt8Fv+hj8V/wDfA/8Akej/AIRb4Lf9DH4r/wC+B/8AI9eQUUnxDS/6AqP/AIDP/wCTD+wqn/QXV++P/wAgev8A/CLfBb/oY/Ff/fA/+R6P+EW+C3/Qx+K/++B/8j15BRR/rDS/6A6P3T/+TD+wqn/QXV++P/yB6/8A8It8Fv8AoY/Ff/fA/wDkej/hFvgt/wBDH4r/AO+B/wDI9eQUUf6w0v8AoDo/dP8A+TD+wqn/AEF1fvj/APIHsX/CK/BMHnxL4sxt7RA8/wDfin6X4V+B51G2+2+JvGS2m8ef5ECtJt/2cwgA/nXjVFS8/pf9AdH7p/8AyYPI6j/5iqv3x/8AkD6kTwd+x/FKHbxb8aZky37lba0jJGOP3nktjn/YNbHxl/a78HfF7ULKJLu20Tw5odsLHQ9FtbS4WDSbcdFB2EvI2AZHYkuc/wAOFHyHRW2D4olhZupQw9KLflP/AOTMJ8M06koyr16k+XbmcdP/ACVH0M/xU8Ds5I1oAE8AWs+B/wCQ6ltfi34JjmQ/24q8gZNpOQOepxHnAH1r50ort/15xfNzKlTT9Jf/ACZMuFMO017SevnH/wCRP2H/AGG/20v2Q/2WPDq6vqvxHi1jxlLGWMq+GtVK2fH+rjzagFu27OO/FfJP/BXb/gpzYft6+ItK0nw9pz2vhfw5cyTWtxOrLPcsQU3MD0BHOMAjNfF1FeZmfE+Mx0XCrZJ9r/q2cmV8C5fgsYsepSnUWzk07elooKKKK+dPswooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9k=";
