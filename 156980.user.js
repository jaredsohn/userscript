// ==UserScript==
// @name           Tour pop
// @version        20104033
// @namespace      George Jetson (test site)
// @name           Tour pop
// @version        20104033
// @namespace      George Jetson (test site)
// @homepage 	   http://userscripts.org/scripts/source/156980
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*platforms/kabam*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/games/kingdoms-of-camelot/play*
// @include        *facebook.com/dialog/feed*

// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_registerMenuCommand

// @description    Automated features for Kingdoms of Camelot
// ==/UserScript==

//Fixed weird bug with koc game
if(window.self.location != window.top.location){
	try{
		if(window.self.location.href == window.parent.location.href){
			return; //If iframe source is same as the parent don't load script
		}
	} catch (e){
		//logit(inspect(e,2,1));
	}
}

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
  language : 'en',
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
  AddMainTabLink('Notebook', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  actionLog ("KOC Notebook v"+ Version +" Loaded");

  if (Options.nbWinIsOpen && Options.nbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  setInterval (DrawLevelIcons,1250);
}


/****************************  Population Control Tab  ******************************/
Tabs.popcontrol = {
  tabOrder : 850,
  tabDisabled : false,
  tabLabel : 'Pop Control',
  myDiv : null,
  timer : null,
  timer_del : null,
  timer_cycle : null,
	del_count : 0,
	cycle_running : false,
	busy : false,
	cycle_step : 0,

  logtable : null,
  logmaxEntries: 300,
  loglast99 : [],
  poptab_troop_dismiss : 1,
  last_ran : 'train',


  init : function (div)
  	{
		var t = Tabs.popcontrol;
		t.myDiv = div;
		var selbut=0;
		
		var m = '<DIV class=pbStat>Population Control</div>';

		m += '<table border=0 width="100%">';	
		m += '<tr align=center>';
		m += '<td align=left><input type=submit id=pophelp_button value="HELP!"></td>';
		m += '<td align=center>Pick City:<span id=popcity></span></td>';
		m += '<td align=center>Population Gain per cycle: <span id=poptab_cycle_pop></span></td>';
		m += '<td align=center> Troops to dismiss: <select id=poptab_troop_dismiss><option value=1>ST</option><option value=2>MM</option><option value=3>Scout</option><option value=4>Pike</option><option value=5>Sword</option><option value=6>Archer</option></select>';
		m += '</tr>';
		m += '</table>';
		
		m += '<DIV class=pbStat>City Requirements:</div>';
		m += '<table border="0" width="100%">';		
		m += '<tr>';
		m += '<td>Current Food: &nbsp<span id=poptab_cur_food></span></td>';
		m += '<td>Current Wood: &nbsp<span id=poptab_cur_wood></span></td>';
		m += '<td>Current Ore: &nbsp&nbsp<span id=poptab_cur_ore></span></td>';
		m += '<td>Current dismissable troops: <span id=poptab_cur_mm></span></td>';
		m += '</tr>';
		m += '<tr>';
		m += '<td>Needed Food: &nbsp<span id=poptab_needed_food></span></td>';
		m += '<td>Needed Wood: &nbsp<span id=poptab_needed_wood></span></td>';
		m += '<td>Needed Ore: &nbsp&nbsp<span id=poptab_needed_ore></span></td>';
		m += '<td>Needed dismissable troops: <span id=poptab_needed_mm></span></td>';
		m += '</tr>';
		m += '</table>';

		m += '<DIV class=pbStat>City Status:</div>';
		m += '<table border="0" width="100%">';	
		m += '<tr align=center>';
		m += '<td>Maximum Idle Population: <span id=poptab_max_idle_pop></span></td>';
		m += '<td># Slots Used: <span id=poptab_slots_used></span><br></td>';
		m += '<td># of barracks: <span id=poptab_barracks></span></td>';
		//m += '<td> </td>';
		m += '</tr>';
		m += '<tr align=center>';
		m += '<td>Current Idle Population: <span id=poptab_cur_idle_pop></span></td>';
		m += '<td># Slots Free: <span id=poptab_slots_free></span></td>';
		m += '<td># of cottages: <span id=poptab_cottages></span></td>';
		//m += '<td> </td>';
		m += '</tr>';		
		m += '</table>';

		m += '<DIV class=pbStat>Commands:</div>';
		m += '<table border="0" width="100%">';	
		m += '<tr align=center>';
		m += '<td><input type="submit" id="poptab_dismiss_mm" value="Dismiss troops" disabled></td>';
		m += '<td><input type="submit" id="poptab_queue_st" value="Queue Supply Troops" disabled></td>';
		m += '<td><input type="submit" id="poptab_del_queues" value="Delete All Queues" disabled></td>';
		m += '<td><input type="submit" id="poptab_run_cycle" value="Run cycle" disabled></td>';
		//m += '<td><input type="submit" id="poptab_test" value="Test"></td>';
		m += '</tr>';		
		m += '</table>';
	
		m += '<DIV class=pbStat>Action Log:</div>';

		m += '<DIV style="height:250px; max-height:250px; overflow-y:auto">';
		m += '<TABLE cellpadding=0 cellspacing=0 id=poptab_log class=pbTabLined>';
		m += '<TR><TD></td><TD width=95%></td>';
		m += '</table></div>';

		t.myDiv.innerHTML = m;

		t.logtable = document.getElementById('poptab_log');  
		var a = JSON2.parse(GM_getValue ('poptab_log_'+getServerId(), '[]'));
		if (matTypeof(a) == 'array')
			{
			t.loglast99 = a;
			for (var i=0; i<t.loglast99.length; i++)		t.addlogrow (t.loglast99[i].msg, t.loglast99[i].ts);
			}
		window.addEventListener('unload', t.onUnload, false);

		t.tcp = new CdispCityPicker ('popcityselect', document.getElementById('popcity'), true, null, selbut);
		
		document.getElementById('pophelp_button').addEventListener		('click', function(){	t.helpPop(this);							} , false);
		document.getElementById('popcity').addEventListener						('click', function(){	t.show_city	(t.tcp.city.id);	} , false);
		document.getElementById('poptab_dismiss_mm').addEventListener	('click', function(){	t.dismiss_mm(t.tcp.city.id);	} , false);
		document.getElementById('poptab_queue_st').addEventListener		('click', function(){	t.queue_st	(t.tcp.city.id);	} , false);
		document.getElementById('poptab_del_queues').addEventListener	('click', function(){	t.del_queues_start(t.tcp.city.id);	} , false);
		document.getElementById('poptab_run_cycle').addEventListener	('click', function(){	t.run_cycle	(t.tcp.city.id);	} , false);
		//document.getElementById('poptab_test').addEventListener	('click', function(){	t.btest	();	} , false);
 	    	document.getElementById('poptab_troop_dismiss').addEventListener('change', function(){t.poptab_troop_dismiss = document.getElementById('poptab_troop_dismiss').value;} , false);
  
  	},

	disable_btns : function ()
		{
		var t = Tabs.popcontrol;
		t.busy = true;
		document.getElementById('poptab_del_queues'	).disabled = true;
		document.getElementById('poptab_queue_st').disabled = true;
		document.getElementById('poptab_dismiss_mm').disabled = true;
		document.getElementById('poptab_run_cycle').disabled = true; 
		},

	onUnload : function ()
		{
		var t = Tabs.popcontrol;
		//if (!ResetAll) GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last50));
		GM_setValue ('poptab_log_'+getServerId(), JSON2.stringify(t.loglast99));
		},
    
	addlogrow : function (msg, ts)
		{
		var t = Tabs.popcontrol;
		if (t.logtable.rows.length >= t.maxEntries)	t.logtable.deleteRow(t.maxEntries-1);
		var row = t.logtable.insertRow(0);
		row.vAlign = 'top';
		row.insertCell(0).innerHTML = ts;
		row.insertCell(1).innerHTML = msg;
		},
  
	log : function (msg)
		{
		var t = Tabs.popcontrol;
		var ts = new Date().toTimeString().substring (0,8);
		for (postcity in Seed.cities) if (Seed.cities[postcity][0] == t.tcp.city.id) logcity = Seed.cities[postcity][1];
		msg = logcity + ": " + msg;
		t.addlogrow (msg, ts);
		while (t.loglast99.length >= 99)
		t.loglast99.shift();
		t.loglast99.push ({msg:msg, ts:ts});
		},

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.popcontrol;
    clearTimeout (t.timer);
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.popcontrol;
    clearTimeout (t.timer);
    t.timer = setTimeout (t.show, 2000);
		t.show_city(t.tcp.city.id);
  },

	helpPop : function ()
		{
		var helpText = "";
		
		helpText += '<p>** This is a work in progress... If it gets stuck, refresh. By ADABman / Lurkin **';
		helpText += 'Probably a good idea to temporarily turn off auto transport, auto reassign, and auto train, when using this.';
		
		helpText += '<p>POPULATION CONTROL tab will help you convert your excess/useless millitiamen ';
		helpText += 'into massive amounts of idle population. Massive idle population is very useful ';
		helpText += 'to have before a might tournament starts, or if you want to do a massive siege ';
		helpText += 'build with a Merlins tutelage.';
		helpText += '</p>';
		
		helpText += '<p>The CITY REQUIREMENTS area displays the amount of resouces and Militiamen ';
		helpText += 'required for a \'full cycle\' of building massive idle population. If any of these ';
		helpText += 'requirements are not met, they will be displayed in red.';
		helpText += '</p>';
		
		helpText += '<p>The CITY STATUS area displays the maximum amount of population your cottages ';
		helpText += 'provide, and the current amount of idle population in your city. This area also ';
		helpText += 'shows the number of training queue slots total and in use.';
		helpText += '</p>';
		
		helpText += '<p>The COMMANDS area displays the buttons that automate this process:';
		helpText += '</p>';

		helpText += '<UL>';
		
		helpText += 'DISMISS MM BUTTON<BR><li>' + dismissBtn_help1 + '</li>';
		helpText += '<li>' + dismissBtn_help2 + '</li><BR>';
		
		helpText += 'QUEUE SUPPLY TROOP BUTTON<BR><li>' + queueBtn_help1 + '</li>';
		helpText += '<li>' + queueBtn_help2 + '</li><BR>';
		
		helpText += 'DELETE QUEUE BUTTON<BR><li>' + deleteBtn_help1 + '</li>';
		helpText += '<li>' + deleteBtn_help2 + '</li>';
		helpText += '<li>' + deleteBtn_help3 + '</li><BR>';
		
		helpText += 'RUN CYCLE BUTTON<BR><li>' + runcycleBtn_help1 + '</li>';
		helpText += '<li>' + runcycleBtn_help2 + '</li>';
		helpText += '<li>' + runcycleBtn_help3 + '</li><BR>';
	
		helpText += '</UL><BR>';
		
		//function CPopup (prefix, x, y, width, height, enableDrag, onClose)
		var pop = new pbPopup ('popcontrol_Help', 0, 0, 740, 600, true);
		pop.centerMe (mainPop.getMainDiv());  
		pop.getMainDiv().innerHTML = helpText;
		pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help</b>:  Population Control</center>';
		pop.show (true);
		},

	show_city : function (cityId)
		{
		var t = Tabs.popcontrol;

		t.st_food = 50;
		t.st_wood = 150;
		//t.st_stone = 0;
		t.st_ore = 10;
		
		var green = '#03F003';
		var red =   '#F0303';

		t.max_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[1])).toFixed(0);
		t.cur_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[0])).toFixed(0);
		document.getElementById('poptab_max_idle_pop').innerHTML	= t.max_idle_pop;
		document.getElementById('poptab_cur_idle_pop').innerHTML	= t.cur_idle_pop;

		t.barracks = parseInt(getCityBuilding(cityId, 13).count);
		t.cottages = parseInt(getCityBuilding(cityId, 5).count);
		t.slots_used = parseInt(Seed.queue_unt['city'+cityId].length);
		t.slots_free = parseInt(t.barracks - t.slots_used);
		document.getElementById('poptab_barracks').innerHTML = t.barracks;
		document.getElementById('poptab_cottages').innerHTML = t.cottages;
		document.getElementById('poptab_slots_used').innerHTML = t.slots_used;
		document.getElementById('poptab_slots_free').innerHTML = t.slots_free;

		t.cycle_pop = (parseInt(t.barracks) * parseInt(t.max_idle_pop)) + (parseInt(t.max_idle_pop) * 2);
		document.getElementById('poptab_cycle_pop').innerHTML	= addCommas( t.cycle_pop / 2 );

		t.cur_food = parseInt(Seed.resources['city'+cityId].rec1[0]/3600);
		t.cur_wood = parseInt(Seed.resources['city'+cityId].rec2[0]/3600);
		//t.cur_stone = parseInt(Seed.resources['city'+cityId].rec3[0]/3600);
		t.cur_ore = parseInt(Seed.resources['city'+cityId].rec4[0]/3600);
		
		document.getElementById('poptab_cur_food').innerHTML = addCommas (t.cur_food);
		document.getElementById('poptab_cur_wood').innerHTML = addCommas (t.cur_wood);
		//document.getElementById('poptab_cur_stone').innerHTML = addCommas (t.cur_stone);
		document.getElementById('poptab_cur_ore').innerHTML = addCommas (t.cur_ore);
		
		t.needed_food = parseInt(t.cycle_pop) * parseInt(t.st_food);
		t.needed_wood = parseInt(t.cycle_pop) * parseInt(t.st_wood);
		//t.needed_stone = 0;//parseInt(t.cycle_pop) * parseInt(t.st_Stone);
		t.needed_ore = parseInt(t.cycle_pop) * parseInt(t.st_ore);
		
		document.getElementById('poptab_needed_food').innerHTML = addCommas (t.needed_food);
		document.getElementById('poptab_needed_wood').innerHTML = addCommas (t.needed_wood);
		//document.getElementById('poptab_needed_stone').innerHTML = addCommas (t.needed_stone);
		document.getElementById('poptab_needed_ore').innerHTML = addCommas (t.needed_ore);
		
		document.getElementById('poptab_needed_food').style.color = (t.needed_food  > t.cur_food?'red':'green');
		document.getElementById('poptab_cur_food').style.color = (t.needed_food  > t.cur_food?'red':'green');
		document.getElementById('poptab_needed_wood').style.color  = (t.needed_wood  > t.cur_wood?'red':'green');
		document.getElementById('poptab_cur_wood').style.color = (t.needed_wood  > t.cur_wood?'red':'green');
		//document.getElementById('poptab_needed_stone').style.color = (t.needed_stone > t.cur_stone?'red':'green');
		//document.getElementById('poptab_cur_stone').style.color = (t.needed_stone > t.cur_stone?'red':'green');
		document.getElementById('poptab_needed_ore').style.color = (t.needed_ore  > t.cur_ore?'red':'green');
		document.getElementById('poptab_cur_ore').style.color = (t.needed_ore  > t.cur_ore?'red':'green');

		t.needed_mm = t.cycle_pop;
		t.cur_mm = parseInt(Seed.units['city'+cityId]['unt' + t.poptab_troop_dismiss]);
		document.getElementById('poptab_needed_mm').innerHTML = addCommas(t.needed_mm);
		document.getElementById('poptab_cur_mm').innerHTML = addCommas(t.cur_mm);
		
		document.getElementById('poptab_needed_mm').style.color = (t.needed_mm  > t.cur_mm?'red':'green')
		document.getElementById('poptab_cur_mm').style.color = (t.needed_mm  > t.cur_mm?'red':'green')
		
		dismissBtn_help1 = "This button is used to quickly get your city to its maximum idle population allowed by dismissing just the right amount of militiamen.";
		dismissBtn_help2 = "This button will only light up when when your city is not at its maximum population, and then only if you have enough MM in your city to dismiss.";
		need_to_dismiss = parseInt(t.max_idle_pop - t.cur_idle_pop);
		dismissBtn = document.getElementById('poptab_dismiss_mm');
		if(parseInt(need_to_dismiss) > 0 && parseInt(need_to_dismiss) <= parseInt(t.cur_mm) && !t.busy && !t.cycle_running)
			{
			dismissBtn.disabled = false;
			dismissBtn.value = "Dismiss " + addCommas(need_to_dismiss) + " Troops";
			}
		else
			{
			dismissBtn.disabled = true;
			dismissBtn.value = "Dismiss Troops";
			}

		queueBtn_help1 = "This button is used to train all the idle population into Supply Troops.";
		queueBtn_help2 = "This button will only light up when your city is at full idle population, and then only if you have enough resources to train all those Supply Troops and at least 1 free training slot.";
		unitId = 1;	
		var res_ok = 0;
		for (var i = 1; i < 5; i++)
			{
			var res_need = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(t.cur_idle_pop);
			var res_have = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]);
			if(parseInt(res_need) > parseInt(res_have))	{	res_ok++;	}
			}
		queueBtn = document.getElementById('poptab_queue_st');
		if(parseInt(t.slots_free) > 0 && parseInt(t.cur_idle_pop) >= parseInt(t.max_idle_pop) && parseInt(res_ok)==0 && !t.busy && !t.cycle_running)
			{
			queueBtn.disabled = false;
			queueBtn.value = "Queue " + addCommas(t.cur_idle_pop) + " Supply Troops";
			}
		else
			{
			queueBtn.disabled = true;
			queueBtn.value = "Queue Supply Troops";
			}

		deleteBtn_help1 = "This button is used to quickly delete all those queued up Supply Troops, returning 1/2 the used population (and resources?).";
		deleteBtn_help2 = "This button will only light up when there is at least 1 training queue slot used.";
		//deleteBtn_help3 = "** Due to a bug, you should refresh your game before using this button! **";
		deleteBtn_help3 = "If you have any problems with this button, refresh and try again.";
		deletebtn = document.getElementById('poptab_del_queues'	);
		if(Seed.queue_unt['city'+cityId].length > 0 && !t.busy && !t.cycle_running)
			{
			deletebtn.disabled = false;
			deletebtn.value = " Delete " + Seed.queue_unt['city'+cityId].length + " Queues";
			}
		else
			{
			deletebtn.disabled = true;
			deletebtn.value = "Delete All Queues";
			}

		runcycleBtn_help1 = "This button is used to automate the entire process of repeatedly dismissing Militiamen then queueing Supply Troops, and then finally delete all of those queues.";
		runcycleBtn_help2 = "This button will only light up when your city has the required amount of resources and Militiamen";
		//runcycleBtn_help3 = "------ This button is disabled for now. -----";
		runcycleBtn_help3 = "If the queue slots wont delete, refresh and hit the 'Delete All Queues' button.";
		res_ok = 0;
		t.cycle_pop_continue = (parseInt(t.slots_free) * parseInt(t.max_idle_pop)) + (parseInt(t.max_idle_pop) * 2);
		for (var i = 1; i < 5; i++)
			{
			var res_need = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(t.cycle_pop_continue);
			var res_have = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]);
			if(parseInt(res_need) > parseInt(res_have))	{	res_ok++;	}
			}
		runcycleBtn = document.getElementById('poptab_run_cycle');
		//if(parseInt(t.cur_idle_pop) >= parseInt(t.max_idle_pop) && parseInt(res_ok)==0 && !t.busy && !t.cycle_running)
		t.needed_mm_continue = t.cycle_pop_continue;
		if(parseInt(t.needed_mm) <= parseInt(t.cur_mm) && parseInt(res_ok)==0 && !t.busy && !t.cycle_running)
			{
			runcycleBtn.disabled = false;
			}
		else
			{
			runcycleBtn.disabled = true; 
			}
		
		},

	run_cycle : function (cityId)
		{
		// Temp disable auto train for this city & auto reassign & auto transport & auto refresh
		// log all that
		
		var t = Tabs.popcontrol;
		clearTimeout (t.timer);
		clearTimeout (t.timer_cycle);
		t.disable_btns();
		if(!t.cycle_running)
			{
			t.log("Starting population build cycle. Population at start: " + t.cur_idle_pop);
			t.cycle_running = true;
			t.cycle_step = 1;
			}
		
		//t.actionlog("1");
		t.max_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[1])).toFixed(0);
		t.cur_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[0])).toFixed(0);
		//num = parseInt(t.max_idle_pop) - parseInt(t.cur_idle_pop);
		if(parseInt(t.cur_idle_pop) < parseInt(t.max_idle_pop))	// Need to Dismiss MM
			{
			if (t.cycle_running && t.last_ran == 'train') {
				t.dismiss_mm(cityId);
				t.last_ran = 'dismiss';
			} else {
				t.timer_cycle = setTimeout (function() {t.run_cycle(cityId)}, 1500);
			}
				
			
			//t.actionlog("2");
			}
		else if(parseInt(t.slots_free) > 0 && parseInt(t.cur_idle_pop) >= parseInt(t.max_idle_pop)) // Need to queue supply troops
			{
			if (t.cycle_running)	{
				t.queue_st(cityId);
				t.last_ran = 'train';
			}
			//t.actionlog("3");
			}
		else if(parseInt(t.slots_free) == 0)	// Delete all the queues
			{
			//t.actionlog("4");
			t.cycle_running = false;
			setTimeout(unsafeWindow.update_seed_ajax, 250);
			t.del_queues_start(t.tcp.city.id);
			t.timer = setTimeout (t.show, 1000);
			return;
			}
		else
			{
			t.log("Waiting...");	// Wait
			}
		//t.actionlog("5");
		setTimeout(unsafeWindow.update_seed_ajax, 250);
		t.timer_cycle = setTimeout (function() {t.run_cycle(cityId)}, 1500);
		},

	dismiss_mm : function (cityId)
		{
		var t = Tabs.popcontrol;
		t.disable_btns();
		
		unitId = t.poptab_troop_dismiss;

		t.max_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[1])).toFixed(0);
		t.cur_idle_pop = (parseInt(Seed.citystats['city'+cityId].pop[0])).toFixed(0);
		num = parseInt(t.max_idle_pop) - parseInt(t.cur_idle_pop);
		//t.log(num);
		
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cityId;
		params.type = unitId;
		params.quant = num;

		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/dismissUnits.php" + unsafeWindow.g_ajaxsuffix,
			{
			method: "post",
			parameters: params,
			onSuccess: function(rslt)
				{
				if (rslt.ok) 
					{
 					//t.log("Dismissed "+ addCommas(num) +" "+ troops[unitId]);
					t.log("Dismissed "+ addCommas(num) +" Troops");
					Seed.units['city'+cityId]['unt'+unitId] -= num;
					if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
					//setTimeout(unsafeWindow.update_seed_ajax, 250);
					t.busy = false;
					t.show_city(cityId);
					
					}
				else
					{
					//t.log("FAILED to dismiss "+ addCommas(num) +" "+ troops[unitId] + " :(");
					t.log("FAILED to dismiss "+ addCommas(num) +" Militiamen :(");
					t.busy = false;
					}
				},
			});		
		setTimeout(unsafeWindow.update_seed_ajax, 250);
		},

	queue_st : function (cityId)
		{
		var t = Tabs.popcontrol;
		t.disable_btns();

		unitId = 1;
		num = t.cur_idle_pop;
		//num = 15;
		
		var time = unsafeWindow.modal_barracks_traintime(unitId, num);
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cityId;
		params.type = unitId;
		params.quant = num;
		params.gambleId = 0;

		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix,
			{
			method: "post",
			parameters: params,
			onSuccess: function(rslt)
				{
				if (rslt.ok) 
					{
					//t.log("Trained "+ addCommas(num) +" "+ troops[unitId]);
					t.log("Trained "+ addCommas(num) +" Supply Troops");
					if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
					for (var i = 1; i < 5; i++)
						{
						var resourceLost = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(num);
						if(rslt.gamble) resourceLost = resourceLost*rslt.gamble[i];
						unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) - resourceLost;
						}
					unsafeWindow.seed.citystats["city" + cityId].gold[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].gold[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][5]) * parseInt(num);
					unsafeWindow.seed.citystats["city" + cityId].pop[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].pop[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][6]) * parseInt(num);
					//unsafeWindow.seed.queue_unt["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]);
					unsafeWindow.seed.queue_unt["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, rslt.ticksNeeded, null]);
					t.busy = false;
					t.show_city(cityId);
					}
				else
					{
					//t.log("FAILED to train "+ addCommas(num) +" "+ troops[unitId] + " :(");
					t.log("FAILED to train "+ addCommas(num) +" Supply Troops :(");
					t.busy = false;
					}
				},
			});
		setTimeout(unsafeWindow.update_seed_ajax, 250);
		},


	del_queues_start : function (cityId)
		{
		var t = Tabs.popcontrol;
		t.disable_btns();

		t.del_count = Seed.queue_unt['city'+cityId].length;
		t.log("Attempting to delete " + t.del_count + " Queue slots...");
		t.del_queues(cityId);
		},

 	del_queues : function (cityId)
		{
		var t = Tabs.popcontrol;
		clearTimeout (t.timer_del);

		var q = Seed.queue_unt['city'+cityId];
		var qs = q.toString();

		if(q.length > 0 || t.del_count > 0)
			{
			t.del_count -= 1;
			typetrn =		q[0][0];
			numtrptrn =	q[0][1];
			trnTmp =		q[0][2];
			trnETA = 		q[0][3];
			trnNeeded =	q[0][5];
			trainingId = 0;

			t.delete_queue_slot(typetrn, numtrptrn, trnTmp, trnETA, trnNeeded, cityId, trainingId)
			t.delete_queue_slot(typetrn, numtrptrn, trnTmp, parseInt(trnETA)-1, trnNeeded, cityId, trainingId)	//?!
						}
		else
			{
			t.log("No more queue slots to delete.");
			t.del_count = 0;
			t.busy = false;
			return;
			}
		setTimeout(unsafeWindow.update_seed_ajax, 250);
		t.timer_del = setTimeout (function() {t.del_queues(cityId)}, 1500);
		},

	delete_queue_slot : function (typetrn, numtrptrn, trnTmp, trnETA, trnNeeded, cityId, trainingId)
		{
		var t = Tabs.popcontrol;
		var uW = unsafeWindow;
		var params = uW.Object.clone(uW.g_ajaxparams);
		params.pf =0;
		params.requestType = "CANCEL_TRAINING";
		params.cityId = cityId;
		params.typetrn = typetrn;
		params.numtrptrn = numtrptrn;
		params.trnETA = trnETA;
		params.trnTmp = trnTmp;
		params.trnNeeded = trnNeeded;

		new AjaxRequest(uW.g_ajaxpath + "ajax/cancelTraining.php" + uW.g_ajaxsuffix,
			{
			method: "post",
			parameters: params,
			onSuccess: function (message)
				{
				var rslt=eval("("+message.responseText+")");
				if (rslt.ok)
					{
					t.log("Deleted queue of "+ addCommas(numtrptrn) +" "+ troops[typetrn]);
					if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
					var k=0;
					for(var j=0;j<Seed.queue_unt["city"+cityId].length;j++)
						{
						if(j>trainingId)
							{
							Seed.queue_unt["city"+cityId][j][2]=parseInt(rslt.dateTraining[k]["start"]);
							Seed.queue_unt["city"+cityId][j][3]=parseInt(rslt.dateTraining[k]["end"]);
							k++;
							}
						}
					Seed.queue_unt["city"+cityId].splice(trainingId,1);
					for(var i=1;i<5;i++)
						{
						var totalReturn=parseInt(uW.unitcost["unt"+typetrn][i])*parseInt(numtrptrn)*3600/2;
						Seed.resources["city"+cityId]["rec"+i][0]=parseInt(Seed.resources["city"+cityId]["rec"+i][0])+totalReturn;
						}
					}
				else
					{
					}
				},
			onFailure: function ()
				{
				},
			});
		},


}
