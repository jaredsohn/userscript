<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang='en-US' xml:lang='en-US' xmlns='http://www.w3.org/1999/xhtml'>
<head>
<meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
<title>Source for &quot;KOC Power Bot&quot; &amp;ndash; Userscripts.org</title>
<link href='/images/script_icon.png' rel='shortcut icon' type='image/x-icon' />
<link href="http://static.userscripts.org/stylesheets/compiled/screen.css?1294452437" media="screen, projection" rel="stylesheet" type="text/css" />
<link href="http://static.userscripts.org/stylesheets/compiled/print.css?1294452436" media="print" rel="stylesheet" type="text/css" />
<script src="http://static.userscripts.org/javascripts/all.js?1294452389" type="text/javascript"></script>
<link href="http://static.userscripts.org/stylesheets/sh_style.css?1294452389" media="screen" rel="stylesheet" type="text/css" />
<script src="http://static.userscripts.org/javascripts/sh_main.min.js?1294452389" type="text/javascript"></script>
<script src="http://static.userscripts.org/javascripts/sh_javascript.min.js?1294452389" type="text/javascript"></script>

<!--[if IE]>
<link href="http://static.userscripts.org/stylesheets/compiled/ie.css?1294452436" media="screen, projection" rel="stylesheet" type="text/css" />
<![endif]-->
</head>
<body class='scripts wide' id='scripts-review'>
<div id='root'>
<div id='header'>
<div class='container'>
<div id='site-logo'><a href="/" title="Userscripts.org"><img alt="Userscripts.org" src="http://static.userscripts.org/images/powerups.png?1294452389" /></a></div>
</div>
<div id='navbox'>
<div id='nav'>
<form action='/search' id='script_search'>
<input name='cref' type='hidden' value='http://userscripts.org/cse.xml' />
<input name='cof' type='hidden' value='FORID:9' />
<input name='q' size='31' type='text' />
<input id='search-go' src='/images/search.gif' type='image' />
</form>
<!-- %form#script_search{:action=>'/scripts/search', :method=>'get'} -->
<!-- %label#script_q_label{:for=>"script_q"} Search all scripts -->
<!-- = text_field_tag(:q, params[:q], :id => 'script_q') -->
<ul id='login'>
<li><a href="/signup" rel="nofollow">Signup</a></li>
<li class='border'><a href="/login?redirect=%2Fscripts%2Freview%2F95542" rel="nofollow">Login</a></li>
</ul>
<ul id='mainmenu'>
<li><a href="/scripts">Scripts</a></li>
<li><a href="/tags">Tags</a></li>
<li><a href="/forums">Forums</a></li>
<li><a href="/users">People</a></li>
<li><a href="/articles">Blog</a></li>
<li><a href="/books">Books</a></li>
</ul>

</div>
</div>
</div>
<div class='container'>

<div id='content'>
<p class='notice info'>
<span>Learn <a href="/about/installing">how to use Greasemonkey</a> with <a href="http://www.spreadfirefox.com/?q=affiliates&amp;id=208179&amp;t=1">Firefox</a>.</span>
</p>
<div id='heading'>
<a href="/users/245617" id="avatar" rel="nofollow" title="DonDavici"><img alt="" class="photo" height="64" src="http://www.gravatar.com/avatar.php?gravatar_id=55f1f9b0b74ea07a72ea46d047523ef6&amp;r=PG&amp;s=64&amp;default=identicon" width="64" /></a>
<div id='details'>
<h1 class='title'><a href="/scripts/show/95542">KOC Power Bot</a></h1>
<span class='author'>By <a href="/users/245617" gravatar="http://www.gravatar.com/avatar.php?gravatar_id=55f1f9b0b74ea07a72ea46d047523ef6&amp;r=PG&amp;s=80&amp;default=identicon" rel="nofollow" user_id="245617">DonDavici</a></span>
&mdash;
<span class='date'>
Last update
Feb  1, 2011
</span>
&mdash;
Installed
10,391 times.

</div>
</div>
<ul id='script-nav'>

<li class='menu'><a href="/scripts/show/95542">About</a></li>
<li class='menu current'>Source Code</li>
<li class='menu'><a href="/scripts/reviews/95542">Reviews <span>9</span></a></li>
<li class='menu'><a href="/scripts/discuss/95542">Discussions <span>88</span></a></li>
<li class='menu'><a href="/scripts/fans/95542">Fans <span>51</span></a></li>
<li class='menu'><a href="/scripts/issues/95542" rel="nofollow">Issues</a></li>
<li><a href="http://www.addtoany.com/share_save?linkname=KOC+Power+Bot&amp;linkurl=http%3A%2F%2Fuserscripts.org%2Fscripts%2Fshow%2F95542" class="a2a_dd" rel="nofollow">Share</a></li>
</ul>

<p class='notice'>
There are
<a href="/scripts/versions/95542">1 previous version</a>
of this script.
</p>
<p class='notice'>the source is over 100KB, syntax highlighting in the browser is too slow</p>
<pre class='sh_javascript' id='source'>// ==UserScript==
// @name           KOC Power Bot
// @namespace      mat
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @include        http://apps.facebook.com/kingdomsofcamelot/*
// @description    Automated features for Kingdoms of Camelot
// ==/UserScript==


var Version = '20110131a';

// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var ENABLE_TEST_TAB = false;
var ENABLE_ATTACK_TAB = false;
var ENABLE_SAMPLE_TAB = false;
var SEND_ALERT_AS_WHISPER = false;
var DISABLE_BULKADD_LIST = false;
var ENABLE_GM_AJAX_TRACE = false;

// end test switches

var MAP_DELAY = 1200;

var URL_CASTLE_BUT = 'http://i.imgur.com/MPlZr.png';
var URL_CASTLE_BUT_SEL = 'http://i.imgur.com/XWR4B.png';
//var CHAT_BG_IMAGE = 'http://i.imgur.com/VjNst.jpg';   // 600
var CHAT_BG_IMAGE = 'http://i.imgur.com/0ws3E.jpg';   // 720

/***********************
TODO (Jetson): enhance winManager (setlayer, focusme, remember coords on reopen, etc)
TODO (Jetson): Add city search
**********************/

var JSON;if(!JSON){JSON={};}(function(){&quot;use strict&quot;;function f(n){return n&lt;10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\&quot;\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','&quot;':'\\&quot;','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'&quot;'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'&quot;':'&quot;'+string+'&quot;';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&amp;&amp;typeof value==='object'&amp;&amp;typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i&lt;length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&amp;&amp;typeof rep==='object'){length=rep.length;for(i=0;i&lt;length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i&lt;space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&amp;&amp;typeof replacer!=='function'&amp;&amp;(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&amp;&amp;typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:[&quot;\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/&quot;[^&quot;\\\n\r]*&quot;|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON; 

//logit (&quot;+++ STARTUP: &quot;+ document.URL);

GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));

if (document.URL.search(/apps.facebook.com\/kingdomsofcamelot/i) &gt;= 0){
  facebookInstance ();
  return;
}


/***  Run only in &quot;apps.facebook.com&quot; instance ... ***/
function facebookInstance (){
  function setWide (){
    var iFrame = null;
    
    var e = document.getElementById('app_content_130402594779').firstChild.firstChild;
    for (var c=0; c&lt;e.childNodes.length; c++){
      if (e.childNodes[c].tagName=='SPAN' &amp;&amp; e.childNodes[c].firstChild.className == 'canvas_iframe_util'){
        iFrame = e.childNodes[c].firstChild; 
        break;
      }
    }
    if (!iFrame){
      var iframes = document.getElementsByTagName('iframe');
      for (var i=0; i&lt;iframes.length; i++){
        if (iframes[i].className=='canvas_iframe_util'){
          iFrame = iframes[i];
          break; 
        }
      }
    }
    if (!iFrame){
      setTimeout (setWide, 1000);
      return;
    }
    try{    
      document.getElementById('sidebar_ads').parentNode.removeChild(document.getElementById('sidebar_ads'));
      document.getElementById('canvas_nav_content').parentNode.removeChild(document.getElementById('canvas_nav_content'));
    } catch (e){
      // toolkit may have removed them already!
    }
    var e = document.getElementById('content').firstChild;
    e.style.width = '100%';
    e.firstChild.style.width = '100%';
    iFrame.style.width = '100%';
  }
    
  facebookWatchdog();
  if (GlobalOptions.pbWideScreen)
    setWide();
}



var Options = {
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  wildType     : 1,
  unownedOnly  : true,
  pbWinIsOpen  : false,
  pbWinDrag    : true,
  pbWinPos     : {},
  pbTrackOpen  : true,
  pbKillFairie : false,
  pbGoldHappy  : 95,
  pbGoldEnable : false,
  pbEveryEnable: false,
  pbEveryMins  : 30,
  pbChatOnRight: false,
  pbWideMap    : false,
  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, minTroops:10000, spamLimit:10 },
  giftDomains  : {valid:false, list:{}},
  giftDelete   : 'e',
};
unsafeWindow.pt_Options=Options;

var GlobalOptions = {
  pbWatchdog   : false,
  pbWideScreen : true,
};

var Cities = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var mainPop;
var pbStartupTimer = null;
var CPopUpTopClass = 'pbPopTop';


pbStartup ();

function pbStartup (){
  window.clearTimeout (pbStartupTimer);
  if (document.getElementById('pbOfficial') != null)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    pbStartupTimer = window.setTimeout (pbStartup, 1000);
    return;
  }

  Seed = unsafeWindow.seed;
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    table.pbTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    table.pbTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.pbTabBR tr td {border:none; background:none;}\
    table.pbTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.pbTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .ptstat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .ptStatLight {color:#ddd}\
    .ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {border-size:3px; border-color:#000;}\
    button::-moz-focus-inner, input[type=&quot;submit&quot;]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleButNon {background-image:url(&quot;'+ URL_CASTLE_BUT +'&quot;)}\
    .castleButSel {background-image:url(&quot;'+ URL_CASTLE_BUT_SEL +'&quot;)}\
    a.ptButton20 {color:#ffff80}\
    table.pbMainTab {empty-cells:show; margin-top:5px }\
    table.pbMainTab tr td a {color:inherit }\
    table.pbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.pbMainTab tr td.spacer {padding: 0px 4px;}\
    table.pbMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed;}\
    table.pbMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#00a044; color:white; border-color:black;}\
    tr.pbPopTop td { background-color:#ded; border:none; height: 21px;  padding:0px; }\
    tr.pbretry_pbPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px;}\
    .CPopup  {border:3px ridge #666}\
    div.indent25 {padding-left:25px}';
    
    
  window.name = 'PT';
  logit (&quot;* KOC Power Bot v&quot;+ Version +&quot; Loaded&quot;);
  readOptions();
  readGlobalOptions ();
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.pbWinPos==null || Options.pbWinPos.x==null|| Options.pbWinPos.x=='' || isNaN(Options.pbWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    Options.pbWinPos.y = c.y+c.height;
    saveOptions ();
  }
  mainPop = new CPopup ('pb', Options.pbWinPos.x, Options.pbWinPos.y, 600,600, Options.pbWinDrag, 
      function (){
        tabManager.hideTab();
        Options.pbWinIsOpen=false; 
        saveOptions()
      });
  mainPop.autoHeight (true);  

  mainPop.getMainDiv().innerHTML = '&lt;STYLE&gt;'+ styles +'&lt;/style&gt;';
  tabManager.init (mainPop.getMainDiv());
  actionLog (&quot;KOC Power Bot v&quot;+ Version +&quot; Loaded&quot;);
  
  FairieKiller.init (Options.pbKillFairie);
  RefreshEvery.init ();
  CollectGold.init();
  if (Options.pbWinIsOpen &amp;&amp; Options.pbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  TowerAlerts.init();
  TowerAlerts.setPostToChatOptions(Options.alertConfig);
  exportToKOCattack.init();
  AddMainTabLink('BOT', eventHideShow, mouseMainTab);
  kocWatchdog ();
  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  WideScreen.useWideMap (Options.pbWideMap);
}

/****************************  Tower Implementation  ******************************
 TODO: a lot ;-)

 */
Tabs.tower = {
    tabOrder: 1,
    tabLabel: 'Tower',
    myDiv: null,
    timer: null,
	alertState: [],

    init: function(div){
//	logit(div);
		var t = Tabs.tower;
        t.myDiv = div;
		t.alertState = {
            running: false,
        };
        t.readAlertState();

        var m = '&lt;DIV id=pbTowrtDivF class=ptstat&gt;TOWER FUNCTIONS&lt;/div&gt;&lt;TABLE id=pbtowerfunctions width=100% height=0% class=pbTab&gt;&lt;TR&gt;';
        if (t.alertState.running == false) {
            m += '&lt;TD&gt;&lt;INPUT id=pbAlertState type=submit value=&quot;Audio Alert = OFF&quot;&gt;&lt;/td&gt;';
       }
        else {
            m += '&lt;TD&gt;&lt;INPUT id=pbAlertState type=submit value=&quot;Audio Alert = ON&quot;&gt;&lt;/td&gt;';
        }
        m += '&lt;/tr&gt;&lt;/table&gt;&lt;/div&gt;';
        m += '&lt;DIV id=pbAlertDivD class=ptstat&gt;SANCTUARY&lt;/div&gt;&lt;TABLE id=pbalertdetails width=100% height=0% class=ptentry&gt;&lt;TR&gt;';
		for (var i = 0; i &lt; Cities.cities.length; i++) {
           m += '&lt;TD&gt;&lt;center&gt;' + Cities.cities[i].name + '&lt;/center&gt;&lt;/td&gt;';
        }
        m += '&lt;/tr&gt;&lt;TR&gt;';
		for (var i = 0; i &lt; Cities.cities.length; i++) {
		    if (parseInt(Seed.citystats[&quot;city&quot; + Cities.cities[i].id].gate) == 0) {
				 m += '&lt;TD&gt;&lt;INPUT id=pbsanctuary_' + Cities.cities[i].id + ' type=submit value=&quot;Defend = OFF&quot; style=&quot;border:1px solid black; background-color:#0a0;&quot;&gt;&lt;/td&gt;';
			}
			if (parseInt(Seed.citystats[&quot;city&quot; + Cities.cities[i].id].gate) == 1) {
				 m += '&lt;TD&gt;&lt;INPUT id=pbsanctuary_' + Cities.cities[i].id + ' type=submit value=&quot;Defend = ON&quot; style=&quot;border:1px solid black; background-color:red;&quot;&gt;&lt;/td&gt;';
			}
        }
        m += '&lt;/tr&gt;&lt;TR&gt;';
        m += '&lt;/tr&gt;&lt;/table&gt;&lt;/div&gt;';
       
    	t.myDiv.innerHTML = m;
		
		for (var i = 0; i &lt; Cities.cities.length; i++) {
            var cityId = Cities.cities[i].id;
            var btnName = 'pbsanctuary_' + cityId;
			if (parseInt(Seed.citystats[&quot;city&quot; + Cities.cities[i].id].gate) == 0) {
				addQueueEventListener(cityId, btnName, 1);
			}
			if (parseInt(Seed.citystats[&quot;city&quot; + Cities.cities[i].id].gate) == 1) {
			    addQueueEventListener(cityId, btnName, 0);
			}
        }
		
		document.getElementById('pbAlertState').addEventListener('click', function(){
            t.toggleAlertState(this);
        }, false);
       
	    window.addEventListener('unload', t.onUnload, false);
		
		t.e_checkTower();
		
		function addQueueEventListener(cityId, name, state){
            document.getElementById(name).addEventListener('click', function(){
                t.toggleDefendMode(cityId, state);
            }, false);
        }
	},
	e_checkTower: function(){
        var t = Tabs.tower;
        var now = unixTime();
		if (matTypeof(Seed.queue_atkinc) != 'array'){
			for (var k in Seed.queue_atkinc){
				var m = Seed.queue_atkinc[k];
				if ((m.marchType==3 || m.marchType==4) &amp;&amp; parseIntNan(m.arrivalTime)&gt;now){
					if (t.alertState.running == true) {
						var soundSrc = &quot;http://www.falli.org/app/download/3780510256/fliegeralarmsire.mp3?t=1263916531&quot;;
						//&quot;http://www.falli.org/app/download/3780503956/feuerwehr4.mp3?t=1263918581&quot;;
						t.playSound(soundSrc);
					}
				}
			}
		}
        t.secondTimer = setTimeout(t.e_checkTower, 10000);
    },
	toggleDefendMode: function (cityId, state) {
		var t = Tabs.tower;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cityId;
		params.state = state;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + &quot;ajax/gate.php&quot; + unsafeWindow.g_ajaxsuffix, {
			method: &quot;post&quot;,
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					Seed.citystats[&quot;city&quot; + cityId].gate = state;
					if (rslt.updateSeed) {
						unsafeWindow.update_seed(rslt.updateSeed)
					}
					t.init(t.myDiv);
					unsafeWindow.Modal.hideModal();
				} else {
					var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
					document.getElementById('pbTowerError').innerHTML = errmsg;
					logit(errmsg);
				}
			},
			onFailure: function () {
				document.getElementById('pbTowerError').innerHTML = &quot;Connection Error! Please try later again&quot;;
			}
		})
	},
	playSound : function(soundSrc){
        var playerSrc = &quot;http://www.infowars.com/mediaplayer.swf&quot;;
        var player = document.createElement('embed');
        player.src = playerSrc;
        player.setAttribute(&quot;style&quot;, &quot;visibility:hidden;&quot;);
        player.setAttribute('id', 'timer_sound');
        player.setAttribute('flashvars', 'type=mp3&amp;autostart=true&amp;repeat=false&amp;file=' + escape(soundSrc));
        document.body.appendChild(player);
    },
	saveAlertState: function(){
		var t = Tabs.tower;
        var serverID = getServerId();
        GM_setValue('alertState_' + serverID, JSON2.stringify(t.alertState));
    },
    readAlertState: function(){
        var t = Tabs.tower;
        var serverID = getServerId();
        s = GM_getValue('alertState_' + serverID);
        if (s != null) {
            state = JSON2.parse(s);
            for (k in state) 
                t.alertState[k] = state[k];
        }
    },
    toggleAlertState: function(obj){
		var t = Tabs.tower;
        if (t.alertState.running == true) {
            t.alertState.running = false;
            t.saveAlertState();
            obj.value = &quot;Audio Alert = OFF&quot;;
        }
        else {
            t.alertState.running = true;
            t.saveAlertState();
            obj.value = &quot;Audio Alert = ON&quot;;
        }
    },
	show: function(){
		var t = Tabs.tower;
    },
	hide: function(){
        var t = Tabs.tower;
    },
    onUnload: function(){
        var t = Tabs.tower;
        
    },
}


/****************************  Build Implementation  ******************************
 TODO:
	 visu directly in the game of build queue elements
	 &lt;span class=&quot;leveltag&quot; style=&quot;left:60px;&quot;&gt;10&lt;/span&gt;
	 more todos within the code
 */
Tabs.build = {
    tabOrder: 1,
    tabLabel: 'Build',
    myDiv: null,
    timer: null,
    buildTab: null,
    koc_buildslot: null,
    currentBuildMode: null,
    buildStates: [],
	loaded_bQ: [],
	lbQ: [],

    init: function(div){
        var t = Tabs.build;
        t.myDiv = div;
        t.koc_buildslot = unsafeWindow.buildslot; //save original koc function
        t.currentBuildMode = &quot;build&quot;;
		t.buildStates = {
            running: false,
			help: false,
        };
        t.readBuildStates();
        
        for (var i = 0; i &lt; Cities.cities.length; i++) {
            t[&quot;bQ_&quot; + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, '[]'));
			if (typeof t[&quot;bQ_&quot; + Cities.cities[i].id] == 'undefined' || (t[&quot;bQ_&quot; + Cities.cities[i].id]) == &quot;&quot;) {
				t[&quot;bQ_&quot; + Cities.cities[i].id] = [];
			}
        }
        
        var m = '&lt;DIV id=pbBuildDivF class=ptstat&gt;BUILD FUNCTIONS&lt;/div&gt;&lt;TABLE id=pbbuildfunctions width=100% height=0% class=pbTab&gt;&lt;TR&gt;';
        if (t.buildStates.running == false) {
            m += '&lt;TD&gt;&lt;INPUT id=pbBuildRunning type=submit value=&quot;Auto Build = OFF&quot;&gt;&lt;/td&gt;';
        }
        else {
            m += '&lt;TD&gt;&lt;INPUT id=pbBuildRunning type=submit value=&quot;Auto Build = ON&quot;&gt;&lt;/td&gt;';
        }
		m += '&lt;TD&gt;&lt;INPUT id=pbBuildMode type=submit value=&quot;Build Mode = OFF&quot;&gt;&lt;/td&gt;';
		m += '&lt;TD&gt;Build Type: &lt;SELECT id=&quot;pbBuildType&quot;&gt;\
				&lt;OPTION value=build&gt;level up&lt;/option&gt;\
				&lt;OPTION value=max&gt;level max&lt;/option&gt;\
				&lt;OPTION value=destruct&gt;destruct&lt;/option&gt;\
				&lt;/select&gt;&lt;/td&gt;';
		m += '&lt;TD&gt;&lt;INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\&gt;&lt;/td&gt;&lt;TD&gt;Ask for help?&lt;/td&gt;';
		m += '&lt;/tr&gt;&lt;/table&gt;&lt;/div&gt;';
        m += '&lt;DIV id=pbBuildDivQ class=ptstat&gt;BUILD QUEUES&lt;/div&gt;&lt;TABLE id=pbbuildqueues width=100% height=0% class=ptentry&gt;&lt;TR&gt;';
        for (var i = 0; i &lt; Cities.cities.length; i++) {
            m += '&lt;TD colspan=2&gt;&lt;INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value=&quot;' + Cities.cities[i].name + '&quot;&gt;&lt;/td&gt;';
        }
        m += '&lt;/tr&gt;&lt;TR&gt;';
        for (var i = 0; i &lt; Cities.cities.length; i++) {
            m += '&lt;TD&gt;Qc:&lt;/td&gt;&lt;TD id=pbbuildcount_' + Cities.cities[i].id + '&gt;' + t[&quot;bQ_&quot; + Cities.cities[i].id].length + '&lt;/td&gt;';
        }
        m += '&lt;/tr&gt;&lt;TR&gt;';
        for (var i = 0; i &lt; Cities.cities.length; i++) {
            t['totalTime_' + Cities.cities[i].id] = 0;
            cbQ = t[&quot;bQ_&quot; + Cities.cities[i].id];
            if (typeof cbQ != 'undefined') {
                for (var j = 0; j &lt; cbQ.length; j++) {
                    t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].id]) + parseInt(cbQ[j].buildingTime);
                }
                timestring = timestr(t['totalTime_' + Cities.cities[i].id]);
            }
            m += '&lt;TD&gt;Tt:&lt;/td&gt;&lt;TD id=pbbuildtotal_' + Cities.cities[i].id + '&gt;' + timestring + '&lt;/td&gt;';
        }
        m += '&lt;/tr&gt;&lt;/table&gt;&lt;SPAN class=boldRed id=pbbuildError&gt;&lt;/span&gt;';
        t.myDiv.innerHTML = m;
        
        for (var i = 0; i &lt; Cities.cities.length; i++) {
            var cityId = Cities.cities[i].id;
            var btnName = 'pbbuild_' + cityId;
            addQueueEventListener(cityId, btnName);
        }

        t.e_autoBuild(); //start checking if we can build someting
        
		document.getElementById('pbBuildType').addEventListener('change', function(){t.setBuildMode(this.value);}, false);
		document.getElementById('pbBuildRunning').addEventListener('click', function(){
            t.toggleStateRunning(this);
        }, false);
		document.getElementById('pbBuildMode').addEventListener('click', function(){
            t.toggleStateMode(this);
        }, false);
		document.getElementById('pbHelpRequest').addEventListener ('change', function (){
        t.buildStates.help = (document.getElementById('pbHelpRequest').checked);
        t.saveBuildStates();
        }, false);
   	    
		window.addEventListener('unload', t.onUnload, false);
        
        function addQueueEventListener(cityId, name){
            document.getElementById(name).addEventListener('click', function(){
                t.showBuildQueue(cityId);
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
          for (var i = 0; i &lt; Cities.cities.length; i++) {
              var cityId = Cities.cities[i].id;
              var isBusy = false;
              var qcon = Seed.queue_con[&quot;city&quot; + cityId];
              if (matTypeof(qcon)=='array' &amp;&amp; qcon.length&gt;0) {
                if (parseInt(qcon[0][4]) &gt; now)
                  isBusy = true;
                else
                  qcon.shift();   // remove expired build from queue        
              }              
//logit ('City #'+ (i+1) + ' : busy='+ isBusy);               
              if (isBusy) {
                  //TODO add info of remaining build time and queue infos
              } else {
                 if (t[&quot;bQ_&quot; + cityId].length &gt; 0) { // something to do?
                 	 var bQi = t[&quot;bQ_&quot; + cityId][0];   //take first queue item to build
                 	 t.doOne (bQi);
					 setTimeout(t.e_autoBuild, 10000); //should be at least 10
					 return; // we need to make sure that there is enough time for each ajax request to not overwrite the vaule that are needed by the next run
                 }
              }       	
            }
          }
		setTimeout(t.e_autoBuild, 10000); //should be at least 10
    },   
    doOne : function (bQi){ 
		var t = Tabs.build;
		var currentcityid = bQi.cityId;
		var cityName = t.getCityNameById(currentcityid);
		var citpos = parseInt(bQi.buildingPos);
		var bid = parseInt(bQi.buildingId);
		//var curlvl = parseInt(bQi.buildingLevel); NOT USED ANYMORE NEVER USE IT AGAIN :-)
		var bdgid = parseInt(bQi.buildingType);
		var time = parseInt(bQi.buildingTime);
		var mult = parseInt(bQi.buildingMult);
		var attempt = parseInt(bQi.buildingAttempt);
		var mode = bQi.buildingMode;
		var curlvl = parseInt(Seed.buildings['city' + currentcityid][&quot;pos&quot; + citpos][1]);
		if (curlvl &gt; 8) { 
			t.cancelQueueElement(0, currentcityid, time, false);
			actionLog(&quot;Queue item deleted: Building Level equals 9 or higher!!!&quot;);
			return;
		};
		if (isNaN(curlvl)) {
			actionLog(&quot;Found no correct value for current building!!!!&quot;);
			return;
		}	
		if (mode == 'destruct') {
			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			params.cid = currentcityid;
			params.bid = &quot;&quot;;
			params.pos = citpos;
			params.lv = curlvl - 1;
			if (curlvl &gt;= 1) {
				params.bid = bid;
			}
			params.type = bdgid;
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + &quot;ajax/destruct.php&quot; + unsafeWindow.g_ajaxsuffix, {
				method: &quot;post&quot;,
				parameters: params,
				onSuccess: function(rslt){
					if (rslt.ok) {
						actionLog(&quot;Destructing &quot; + unsafeWindow.buildingcost['bdg' + bdgid][0] + &quot; at &quot; + cityName);
						Seed.queue_con[&quot;city&quot; + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
						unsafeWindow.Modal.hideModalAll(); 
						unsafeWindow.update_bdg();
						unsafeWindow.queue_changetab_building();
						if (document.getElementById('pbHelpRequest').checked == true) {
							unsafeWindow.build_gethelp(params.bid, currentcityid);
						}
						if (rslt.updateSeed) {
							unsafeWindow.update_seed(rslt.updateSeed);
						}
						t.cancelQueueElement(0, currentcityid, time, false);
					} else {
						var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
						t.requeueQueueElement(bQi);
						document.getElementById('pbbuildError').innerHTML = errmsg;
						logit(errmsg);
					}
				},
				onFailure: function(){
					document.getElementById('pbbuildError').innerHTML = &quot;Connection Error while destructing! Please try later again&quot;;
				}
			})
		}
		if (mode == 'build') {
			var invalid = false;
			var chk = unsafeWindow.checkreq(&quot;bdg&quot;, bdgid, curlvl); //check if all requirements are met
			for (var c = 0; c &lt; chk[3].length; c++) {
				if (chk[3][c] == 0) {
					invalid = true;
				}
			}
			if (invalid == false) {							
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = currentcityid;
				params.bid = &quot;&quot;;
				params.pos = citpos;
				params.lv = curlvl + 1;
				if (params.lv &gt; 9){ //make sure that no level 10+ is built
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog(&quot;Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!&quot;);
					return;
				}
				if (params.lv &gt; 1) {
					params.bid = bid;
				}
				params.type = bdgid;

				new MyAjaxRequest(unsafeWindow.g_ajaxpath + &quot;ajax/construct.php&quot; + unsafeWindow.g_ajaxsuffix, {
					method: &quot;post&quot;,
					parameters: params,
					onSuccess: function(rslt){
						if (rslt.ok) {
							actionLog(&quot;Building &quot; + unsafeWindow.buildingcost['bdg' + bdgid][0] + &quot; Level &quot; + params.lv + &quot; at &quot; + cityName);								
							Seed.resources[&quot;city&quot; + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost[&quot;bdg&quot; + bdgid][1]) * mult * 3600;
							Seed.resources[&quot;city&quot; + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost[&quot;bdg&quot; + bdgid][2]) * mult * 3600;
							Seed.resources[&quot;city&quot; + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost[&quot;bdg&quot; + bdgid][3]) * mult * 3600;
							Seed.resources[&quot;city&quot; + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost[&quot;bdg&quot; + bdgid][4]) * mult * 3600;
							Seed.citystats[&quot;city&quot; + currentcityid].gold[0] -= parseInt(unsafeWindow.buildingcost[&quot;bdg&quot; + bdgid][5]) * mult;
							Seed.queue_con[&quot;city&quot; + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(),  unsafeWindow.unixtime() + time, 0, time, citpos]);
							unsafeWindow.update_bdg();                  
							unsafeWindow.queue_changetab_building();  
							if (document.getElementById('pbHelpRequest').checked == true) {
								unsafeWindow.build_gethelp(params.bid, currentcityid);
							}
							if (rslt.updateSeed) {     
								unsafeWindow.update_seed(rslt.updateSeed)
							}
							t.cancelQueueElement(0, currentcityid, time, false);
						} else {
							var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
							if (rslt.error_code == 103) { // building has already the target level =&gt; just  delete
								t.cancelQueueElement(0, currentcityid, time, false);
								actionLog(&quot;Queue item deleted: Building at this Level already exists or build process already started!&quot;);
							} else {
								t.requeueQueueElement(bQi);
								document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name +': '+ errmsg + &quot; Item was requeued. Check for retry count.&quot;;
							}
							logit(errmsg);
						}
				},
					onFailure: function(){
						document.getElementById('pbbuildError').innerHTML = &quot;Connection Error while building! Please try later again&quot;;
					}
				});
			} else {
				t.requeueQueueElement(bQi); // requeue item if check is invalid
			}
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
        var buildingPos   = c.id.split(&quot;_&quot;)[1];
        var buildingType  = parseInt(Seed.buildings['city' + cityId][&quot;pos&quot; + buildingPos][0]);
        var buildingLevel = parseInt(Seed.buildings['city' + cityId][&quot;pos&quot; + buildingPos][1]);
		var buildingId    = parseInt(Seed.buildings['city' + cityId][&quot;pos&quot; + buildingPos][3]);
  		var buildingAttempts = 0;
		var loaded_bQ = t[&quot;bQ_&quot; + cityId];
		if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
			var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
		} else {
			var current_construction_pos = &quot;&quot;;
		}
		if (loaded_bQ.length == 0 &amp;&amp; current_construction_pos != &quot;&quot; ) { //check anyway if there is currently build in progess for this specific building
			if (current_construction_pos != 'NaN' &amp;&amp; current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
		} else {
			if (current_construction_pos != &quot;&quot; &amp;&amp; current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
			for (var i = 0; i &lt; loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
				var loadedCity = loaded_bQ[i].cityId;
				var loadedSlot = loaded_bQ[i].buildingPos;
				if (loadedSlot == buildingPos &amp;&amp; loadedCity == cityId) {
					buildingLevel += 1;
				}
				if (loaded_bQ[i].buildingMode == 'destruct' &amp;&amp; loadedSlot == buildingPos &amp;&amp; loadedCity == cityId) { // check if destrcution is already in queue
					t.modalmessage('Destruction already in Queue!');
					return;
				}
			}
		}
        if (t.currentBuildMode == &quot;build&quot;) {
		    if (buildingLevel &gt;= 9) {
                t.modalmessage('Due to building requirements (DI), buildings above level 9\nshould be manualy built.');
                return;
            }
            var buildingMode = &quot;build&quot;;
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
        if (t.currentBuildMode == &quot;max&quot;) {
            var buildingMode = &quot;build&quot;;
			for (var bL = buildingLevel; bL &lt;9; bL++) {
				var queueId = loaded_bQ.length;
				var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
				var buildingMult = result[0];
				var buildingTime = result[1];
				queueId = queueId ;
				t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
				t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
			}
        }
        if (t.currentBuildMode == &quot;destruct&quot;) {
            var buildingMode = &quot;destruct&quot;;
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
				
		var knights = Seed.knights[&quot;city&quot; + cityId];
		if (knights) {
			var polKniId = parseInt(Seed.leaders['city' + cityId].politicsKnightId);
			if (polKniId) {
				var polValue = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politics);
				var polBoost = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politicsBoostExpireUnixtime);
				if ((polBoost - now) &gt; 0) {
					polValue = parseInt(polValue * 1.25);
				}
			} else {
				polValue = 0;
			}
		} else {
			polValue = 0;
		}
        
        var buildingTime = unsafeWindow.buildingcost[&quot;bdg&quot; + buildingType][7] * buildingMult;
        if (parseInt(buildingType) &lt; 6 &amp;&amp; parseInt(buildingType) &gt; 0 &amp;&amp; buildingMult == 1) {
            buildingTime = 15;
        }
		if (buildingMode == 'build') {
			buildingTime = parseInt(buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16)));
        } 
		if (buildingMode == 'destruct') {
			buildingTime = buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16));
			if (buildingTime % 1 &gt; 0) {
				buildingTime = parseInt(buildingTime);
			}
		}
		
		var result = new Array(buildingMult, buildingTime);
		return result;
	},
	addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
	var t = Tabs.build;
		var lbQ = t[&quot;bQ_&quot; + cityId];
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
        var content = &quot;autoclose after 10sec...&lt;br&gt;&lt;br&gt;&quot;
        content += message;
        unsafeWindow.Modal.showAlert(content);
        window.setTimeout('unsafeWindow.Modal.hideModal();', timeout);
    },
	modifyTotalTime: function (cityId, type, buildingTime) {
	    var t = Tabs.build;
		var element = document.getElementById('pbbuildcount_' + cityId);
		var currentCount = parseInt(element.innerHTML);
		if (type == &quot;increase&quot;) {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] + buildingTime;
			var currentCount = currentCount + 1;
		}
		if (type == &quot;decrease&quot;) {
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
        for (var i = 0; i &lt; Cities.cities.length; i++) {
            //t[&quot;bQ_&quot; + Cities.cities[i].id] = []; //clean up if needed
            GM_setValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, JSON2.stringify((t[&quot;bQ_&quot; + Cities.cities[i].id])));
        }
        t.saveBuildStates();
    },
    _addTab: function(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode){
		var t = Tabs.build;
        var row = document.getElementById('pbCityQueueContent').insertRow(0);
        row.vAlign = 'top';
        row.insertCell(0).innerHTML = queueId;
        if (buildingMode == &quot;destruct&quot;) {
            row.insertCell(1).innerHTML = '&lt;img src=&quot;http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_att.png&quot;&gt;';
        }
        else {
            row.insertCell(1).innerHTML = '&lt;img src=&quot;http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_prod.png&quot;&gt;';
        }
        row.insertCell(2).innerHTML = unsafeWindow.buildingcost['bdg' + buildingType][0];
        row.insertCell(3).innerHTML = timestr(buildingTime);
		if (buildingMode == &quot;destruct&quot;) {
			row.insertCell(4).innerHTML = 0;
        } else {
			row.insertCell(4).innerHTML = buildingLevel + 1; // =&gt; target Level
		}
		row.insertCell(5).innerHTML = buildingAttempts;
        row.insertCell(6).innerHTML = '&lt;a class=&quot;button20&quot; id=&quot;queuecancel_' + queueId + '&quot;&gt;&lt;span&gt;Cancel&lt;/span&gt;&lt;/a&gt;';
        document.getElementById('queuecancel_' + queueId).addEventListener('click', function(){
            t.cancelQueueElement(queueId, cityId, buildingTime, true);
        }, false);
    },
    cancelQueueElement: function(queueId, cityId, buildingTime, showQueue){
        var t = Tabs.build;
        var queueId = parseInt(queueId);
        t[&quot;bQ_&quot; + cityId].splice(queueId, 1);
        t.modifyTotalTime(cityId, 'decrease', buildingTime); //adjust total Time	
        
        if (showQueue == true) {
            t.showBuildQueue(cityId);
        }
    },
    showBuildQueue: function(cityId){
	    var t = Tabs.build;
        var popBuildQueue = null;
        var cityName = t.getCityNameById(cityId);
        if (t.popBuildQueue == null) {
            t.popBuildQueue = new CPopup('pbbuild_' + cityId, 0, 0, 350, 500, true);
        }
        var m = '&lt;DIV style=&quot;max-height:460px; height:460px; overflow-y:auto&quot;&gt;&lt;TABLE align=center cellpadding=0 cellspacing=0 width=100% class=&quot;pbTabPad&quot; id=&quot;pbCityQueueContent&quot;&gt;';       
        t.popBuildQueue.getMainDiv().innerHTML = '&lt;/table&gt;&lt;/div&gt;' + m;
        t.popBuildQueue.getTopDiv().innerHTML = '&lt;TD width=&quot;200px&quot;&gt;&lt;B&gt;Build Queue of ' + cityName + '&lt;/b&gt;&lt;/td&gt;&lt;TD&gt;&lt;INPUT id=pbOptimizeByTime type=submit value=&quot;Optimize by Time&quot;&gt;&lt;/td&gt;';
        t.paintBuildQueue(cityId);
        t.popBuildQueue.show(true);
		document.getElementById('pbOptimizeByTime').addEventListener('click', function(){t.clearBuildQueue();t.paintBuildQueue(cityId, true);}, false);
	},
    paintBuildQueue: function(cityId, optimize){
        var t = Tabs.build;
        var lbQ = t[&quot;bQ_&quot; + cityId];
		if (optimize == true) {
			lbQ.sort(function(a,b){return a.buildingTime - b.buildingTime});
		}
		for (var i = 0; i &lt; lbQ.length; i++) {
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
            t.saveBuildStates();
            obj.value = &quot;Auto Build = OFF&quot;;
        }
        else {
            t.buildStates.running = true;
            t.saveBuildStates();
            obj.value = &quot;Auto Build = ON&quot;;
        }
    },
    toggleStateMode: function(obj){
		var t = Tabs.build;
        if (obj.value == 'Build Mode = OFF') {
			unsafeWindow.buildslot = t.bot_buildslot; // overwrite original koc function
            obj.value = &quot;Build Mode = ON&quot;;
        }
        else {
			unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
			obj.value = &quot;Build Mode = OFF&quot;;
        }
    },
	getCityNameById: function (cityId) {
    return Cities.byID[cityId].name;  	
	},
}


/********************************* Search Tab *************************************/
Tabs.Search = {
  tabOrder : 2,
  myDiv : null,
  MapAjax : new CMapAjax(),

  init : function (div){
    var t = Tabs.Search;
    t.selectedCity = Cities.cities[0];
    t.myDiv = div;
    div.innerHTML = '\
        &lt;DIV class=ptentry&gt;&lt;TABLE&gt;&lt;TR valign=bottom&gt;&lt;TD class=xtab width=100 align=right&gt;Search for: &lt;/td&gt;&lt;TD&gt;\
        &lt;SELECT id=&quot;pasrcType&quot;&gt;\
          &lt;OPTION value=0&gt;Barb Camp&lt;/option&gt;\
          &lt;OPTION value=1&gt;Wilderness&lt;/option&gt;\
        &lt;/select&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;/table&gt;\
        &lt;DIV id=&quot;pasrcOpts&quot; style=&quot;height:80px&quot;&gt;&lt;/div&gt;&lt;/div&gt;\
        &lt;DIV id=&quot;pasrcResults&quot; style=&quot;height:400px; max-height:400px;&quot;&gt;&lt;/div&gt;';
      var psearch = document.getElementById (&quot;pasrcType&quot;);
      m = '&lt;TABLE&gt;&lt;TR valign=middle&gt;&lt;TD class=xtab width=100 align=right&gt;Center: &amp;nbsp; X: &lt;/td&gt;&lt;TD class=xtab&gt;\
        &lt;INPUT id=pasrchX type=text\&gt; &amp;nbsp; Y: &lt;INPUT id=pasrchY type=text\&gt; &amp;nbsp; &lt;SPAN id=paspInXY&gt;&lt;/span&gt;\
        &lt;/td&gt;&lt;/tr&gt;&lt;TR&gt;&lt;TD class=xtab align=right&gt;Max. Distance: &lt;/td&gt;&lt;TD class=xtab&gt;&lt;INPUT id=pasrcDist size=4 value=10 /&gt;&lt;/td&gt;&lt;/tr&gt;';
      m += '&lt;TR&gt;&lt;TD class=xtab&gt;&lt;/td&gt;&lt;TD class=xtab&gt;&lt;INPUT id=pasrcStart type=submit value=&quot;Start Search&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;';
      m += '&lt;/table&gt;';
      document.getElementById ('pasrcOpts').innerHTML = m;
      new CdispCityPicker ('pasrchdcp', document.getElementById ('paspInXY'), true, t.citySelNotify).bindToXYboxes(document.getElementById ('pasrchX'), document.getElementById ('pasrchY'));
      document.getElementById ('pasrcStart').addEventListener ('click', t.clickedSearch, false);
  },

  hide : function (){
  },

  show : function (cont){
  },

  citySelNotify : function (city){
    var t = Tabs.Search;
    t.selectedCity = city;
  },
  
  opt : {},
  selectedCity : null,
  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,

  clickedSearch : function (){
    var t = Tabs.Search;

    if (t.searchRunning){
      t.stopSearch ('SEARCH CANCELLED!');
      return;
    }
    t.opt.searchType = document.getElementById ('pasrcType').value;
    t.opt.startX = parseInt(document.getElementById ('pasrchX').value);
    t.opt.startY = parseInt(document.getElementById ('pasrchY').value);
    t.opt.maxDistance = parseInt(document.getElementById ('pasrcDist').value);
    errMsg = '';

    if (isNaN (t.opt.startX) ||t.opt.startX&lt;0 || t.opt.startX&gt;749)
      errMsg = &quot;X must be between 0 and 749&lt;BR&gt;&quot;;
    if (isNaN (t.opt.startY) ||t.opt.startY&lt;0 || t.opt.startY&gt;749)
      errMsg += &quot;Y must be between 0 and 749&lt;BR&gt;&quot;;
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance&lt;1 || t.opt.maxDistance&gt;75)
      errMsg += &quot;Max Distance must be between 1 and 75&lt;BR&gt;&quot;;
    if (errMsg != ''){
      document.getElementById('pasrcResults').innerHTML = '&lt;FONT COLOR=#660000&gt;ERROR:&lt;/font&gt;&lt;BR&gt;&lt;BR&gt;'+ errMsg;
      return;
    }

    t.searchRunning = true;
    document.getElementById ('pasrcStart').value = 'Stop Search';
    m = '&lt;DIV class=ptstat&gt;&lt;TABLE width=100% cellspacing=0&gt;&lt;TR&gt;&lt;TD class=xtab width=125&gt;&lt;DIV id=pastatSearched&gt;&lt;/div&gt;&lt;/td&gt;\
        &lt;TD class=xtab align=center&gt;&lt;SPAN style=&quot;white-space:normal&quot; id=pastatStatus&gt;&lt;/span&gt;&lt;/td&gt;\
        &lt;TD class=xtab align=right width=125&gt;&lt;DIV id=pastatFound&gt;&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/div&gt;\
      &lt;TABLE width=100%&gt;&lt;TR valign=top&gt;&lt;TD&gt;&lt;DIV id=padivOutTab style=&quot;width:310px; height:380px; max-height:380px; overflow-y:auto;&quot;&gt;&lt;/div&gt;&lt;/td&gt;\
      &lt;TD width=100% height=100% style=&quot;background:#e0e0f0; height:100%; padding:5px&quot;&gt;&lt;DIV id=padivOutOpts&gt;&lt;/div&gt;&lt;/td&gt;&lt;/table&gt;';
    document.getElementById('pasrcResults').innerHTML = m;
    if (t.opt.searchType == 0)
      typeName = 'Barbarians';
    else
      typeName = 'Wildernesses';

    m = '&lt;CENTER&gt;&lt;B&gt;Search for '+ typeName +'&lt;BR&gt;\
        Center: '+ t.opt.startX +','+ t.opt.startY +'  &amp;nbsp; Distance: '+ t.opt.maxDistance +'&lt;BR&gt;&lt;/center&gt;\
        &lt;DIV class=ptentry&gt;&lt;TABLE cellspacing=0 width=100%&gt;&lt;TR align=center&gt;&lt;TD class=xtab colspan=10&gt;&lt;B&gt;LIST OPTIONS:&lt;/b&gt;&lt;BR&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD class=xtab align=right&gt;Min. level to show:&lt;/td&gt;&lt;TD class=xtab&gt; &lt;INPUT id=pafilMinLvl size=2 value='+ Options.srcMinLevel +' /&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD class=xtab align=right&gt;Max. level to show:&lt;/td&gt;&lt;TD class=xtab&gt; &lt;INPUT id=pafilMaxLvl size=2 value='+ Options.srcMaxLevel +' /&gt;&lt;/td&gt;&lt;/tr&gt;';
    if (t.opt.searchType == 1){
      m += '&lt;TR&gt;&lt;TD class=xtab align=right&gt;Wilderness Type:&lt;/td&gt;&lt;TD class=xtab&gt;&lt;SELECT id=pafilWildType&gt;';
      m += htmlOptions ( {1:'Glassland/Lake', 3:'Woodlands', 4:'Hills', 5:'Mountain', 6:'Plain', 0:'ALL'}, Options.wildType );
      m += '&lt;/select&gt;&lt;/td&gt;&lt;/tr&gt;&lt;TR&gt;&lt;TD class=xtab align=right&gt;Unowned Only:&lt;/td&gt;&lt;TD class=xtab&gt;&lt;INPUT id=pafilUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\&gt;&lt;td&gt;&lt;/tr&gt;';
    }
    m+= '&lt;TR&gt;&lt;TD class=xtab align=right&gt;Sort By:&lt;/td&gt;&lt;TD class=xtab&gt;&lt;SELECT id=pafilSortBy&gt;\
          &lt;OPTION value=&quot;level&quot; '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'&gt;Level&lt;/option&gt;\
          &lt;OPTION value=&quot;dist&quot; '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'&gt;Distance&lt;/option&gt;\
        &lt;/select&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD class=xtab align=right&gt;Show coords only:&lt;/td&gt;&lt;TD class=xtab&gt;&lt;INPUT type=checkbox id=pacoordsOnly \&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;/table&gt;&lt;/div&gt;&lt;BR&gt;&lt;SPAN id=pasrchSizeWarn&gt;&lt;/span&gt;&lt;DIV id=pbSrcExp&gt;&lt;/div&gt;';

    document.getElementById('padivOutOpts').innerHTML = m;
    document.getElementById('pafilMinLvl').addEventListener ('change', function (){
      Options.srcMinLevel = document.getElementById('pafilMinLvl').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pafilMaxLvl').addEventListener ('change', function (){
      Options.srcMaxLevel = document.getElementById('pafilMaxLvl').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pafilSortBy').addEventListener ('change', function (){
      Options.srcSortBy = document.getElementById('pafilSortBy').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pacoordsOnly').addEventListener ('change', function (){ t.dispMapTable (); }, false);
    if (t.opt.searchType == 1){
      document.getElementById('pafilWildType').addEventListener ('change', function (){
        Options.wildType = document.getElementById('pafilWildType').value;
        saveOptions();
        t.dispMapTable ();
        }, false);
      document.getElementById('pafilUnowned').addEventListener ('change', function (){
        Options.unownedOnly = (document.getElementById('pafilUnowned').checked);
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
    var xxx = t.MapAjax.normalize(t.curX);
    var yyy = t.MapAjax.normalize(t.curY);
    document.getElementById ('pastatStatus').innerHTML = 'Searching at '+ xxx +','+ yyy;
    setTimeout (function(){t.MapAjax.request (xxx, yyy, 15, t.mapCallback)}, MAP_DELAY);
  },

  dispMapTable : function (){
    var tileNames = ['Barb Camp', 'Grassland', 'Lake', 'Woodlands', 'Hills', 'Mountain', 'Plain' ];
    var t = Tabs.Search;
    var coordsOnly = document.getElementById('pacoordsOnly').checked;
if (DEBUG_TRACE) DebugTimer.start();
    function mySort(a, b){
      if (Options.srcSortBy == 'level'){
        if ((x = a[4] - b[4]) != 0)
          return x;
      }
      return a[2] - b[2];
    }
    dat = [];
    for (i=0; i&lt;t.mapDat.length; i++){
      lvl = parseInt (t.mapDat[i][4]);
      type = t.mapDat[i][3];
      if (lvl&gt;=Options.srcMinLevel &amp;&amp; lvl&lt;=Options.srcMaxLevel){
        if (t.opt.searchType==0 || Options.wildType==0
        ||  (Options.wildType==1 &amp;&amp; (type==1 || type==2))
        ||  (Options.wildType == type)){
          if (!Options.unownedOnly || t.mapDat[i][5]===false)
            dat.push (t.mapDat[i]);
        }
      }
    }
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: FILTER');

    document.getElementById('pastatFound').innerHTML = 'Found: '+ dat.length;
    if (dat.length == 0){
      m = '&lt;BR&gt;&lt;CENTER&gt;None found&lt;/center&gt;';
    } else {
      dat.sort(mySort);
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: SORT');
      if (coordsOnly)
        m = '&lt;TABLE align=center id=pasrcOutTab cellpadding=0 cellspacing=0&gt;&lt;TR style=&quot;font-weight: bold&quot;&gt;&lt;TD&gt;Location&lt;/td&gt;&lt;/tr&gt;';
      else
        m = '&lt;TABLE id=pasrcOutTab cellpadding=0 cellspacing=0&gt;&lt;TR style=&quot;font-weight: bold&quot;&gt;&lt;TD&gt;Location&lt;/td&gt;&lt;TD style=&quot;padding-left: 10px&quot;&gt;Distance&lt;/td&gt;&lt;TD style=&quot;padding-left: 10px;&quot;&gt;Lvl&lt;/td&gt;&lt;TD width=80%&gt; &amp;nbsp; Type&lt;/td&gt;&lt;TD style=&quot;padding-left: 10px;&quot;&gt;&lt;/td&gt;&lt;/tr&gt;';
      var numRows = dat.length;
      if (numRows &gt; 500 &amp;&amp; t.searchRunning){
        numRows = 500;
        document.getElementById('pasrchSizeWarn').innerHTML = '&lt;FONT COLOR=#600000&gt;NOTE: Table only shows 500 of '+ dat.length +' results until search is complete.&lt;/font&gt;';
      }
      for (i=0; i&lt;numRows; i++){
        m += '&lt;TR&gt;&lt;TD&gt;&lt;DIV onclick=&quot;pbGotoMap('+ dat[i][0] +','+ dat[i][1] +')&quot;&gt;&lt;A&gt;'+ dat[i][0] +','+ dat[i][1] +'&lt;/a&gt;&lt;/div&gt;&lt;/td&gt;';
        if (coordsOnly)
          m += '&lt;/tr&gt;';
        else
          m += '&lt;TD align=right&gt;'+ dat[i][2].toFixed(2) +' &amp;nbsp; &lt;/td&gt;&lt;TD align=right&gt;'+ dat[i][4] +'&lt;/td&gt;&lt;TD&gt; &amp;nbsp; '+ tileNames[dat[i][3]]
            +'&lt;/td&gt;&lt;TD&gt;'+ (dat[i][5]?' OWNED':'') +'&lt;/td&gt;&lt;/tr&gt;';
       }
      m += '&lt;/table&gt;';
    }
    document.getElementById('padivOutTab').innerHTML = m;
    dat = null;
if (DEBUG_TRACE) DebugTimer.display('SEACHdraw: DRAW');
  },

  mapDat : [],

  stopSearch : function (msg){
    var t = Tabs.Search;
    document.getElementById ('pastatStatus').innerHTML = '&lt;FONT color=#ffaaaa&gt;'+ msg +'&lt;/font&gt;';
    document.getElementById ('pasrcStart').value = 'Start Search';
    document.getElementById ('pasrchSizeWarn').innerHTML = '';
    if (t.opt.searchType==0 &amp;&amp; document.getElementById('KOCAttackToggle')!=null){    
      document.getElementById ('pbSrcExp').innerHTML = '&lt;CENTER&gt;'+ strButton20('Export Results', 'id=pbSrcDoExp') +'&lt;/center&gt;'; 
      document.getElementById ('pbSrcDoExp').addEventListener ('click', t.exportKOCattack, false);
    }
    t.searchRunning = false;
  },

  exportKOCattack : function (){
    var t = Tabs.Search;
    var bulkAdds = {};
    for (i=1; i&lt;11; i++)
      bulkAdds['lvl'+ i] = [];
    for (i=0; i&lt;t.mapDat.length; i++){
      var lvl = parseInt (t.mapDat[i][4]);
      if (lvl&gt;=Options.srcMinLevel &amp;&amp; lvl&lt;=Options.srcMaxLevel &amp;&amp; t.mapDat[i][3]==0)
        bulkAdds['lvl'+ lvl].push({x:t.mapDat[i][0], y:t.mapDat[i][1]});
    }
    exportToKOCattack.doExport (bulkAdds, t.selectedCity);
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
//logit (&quot; 3 mapCallback()&quot;);
    var t = Tabs.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('ERROR: '+ rslt.errorMsg);
      return;
    }

    map = rslt.data;
    for (k in map){
      if (t.opt.searchType==0 &amp;&amp; map[k].tileType==51 &amp;&amp; !map[k].tileCityId ) {  // if barb
        type = 0;
      } else if (t.opt.searchType==1 &amp;&amp; map[k].tileType&gt;=10 &amp;&amp;  map[k].tileType&lt;=50) {
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11)
          type = 2;
        else
          type = (map[k].tileType/10) + 1;
      } else
        continue;
      dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      if (dist &lt;= t.opt.maxDistance){
        isOwned = map[k].tileUserId&gt;0 || map[k].misted;
        t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned]);
        ++t.tilesFound;
      }
    }
    t.tilesSearched += (15*15);
    document.getElementById('pastatSearched').innerHTML = 'Searched: '+ t.tilesSearched;
    t.dispMapTable();

    t.curX += 15;
    if (t.curX &gt; t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY &gt; t.lastY){
        t.stopSearch ('Done!');
        return;
      }
    }

    var x = t.MapAjax.normalize(t.curX);
    var y = t.MapAjax.normalize(t.curY);
    document.getElementById ('pastatStatus').innerHTML = 'Searching at '+ x +','+ y;
    setTimeout (function(){t.MapAjax.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
  },
};   // end Search tab




/******** Export to KOC Attack **********/  

var exportToKOCattack = {
  troops : {},  
  
  init : function (){
    var t = exportToKOCattack;
    for (var b=1; b&lt;11; b++){
      t.troops['b'+ b] = [];
      for (var trp=0; trp&lt;12; trp++){
        t.troops['b'+ b][trp] = 0;
      }
    }
    var s = GM_getValue ('atkTroops_'+ getServerId(), null);
    if (s != null){
      var trp = JSON2.parse(s);
      for (var b=1; b&lt;11; b++){
        if (trp['b'+ b] &amp;&amp; trp['b'+ b].length == 12)
          t.troops['b'+ b] = trp['b'+ b];
      }
    }
    window.addEventListener('unload', t.onUnload, false);
  },
  
  onUnload : function (){
    var t = exportToKOCattack;
    GM_setValue ('atkTroops_'+ getServerId(),  JSON2.stringify(t.troops));
  },
  
  doExport : function (coordList, city){
    var t = exportToKOCattack;
    var popExp = null;
    var cList = coordList;
    var curLevel = 0;
    var city = city;
    var troopDef = [
      ['STroop', 1],
      ['Wagon', 9],
      ['Archers', 6],
      ['Cavalry', 7],
      ['Heavies', 8],
      ['Ballista', 10],
    ];
    
    if (popExp == null){
      popExp = new CPopup ('pbsrcexp', 0,0, 625,600, true, function (){popExp.destroy(); popExp=null;});
      popExp.centerMe (mainPop.getMainDiv());  
    }
    var m = '&lt;DIV class=ptstat&gt;Export data to KOC Attack&lt;/div&gt;&lt;BR&gt;&lt;TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPadNW&gt;\
      &lt;TR style=&quot;font-weight:bold; background-color:white&quot;&gt;&lt;TD&gt;Target Type&lt;/td&gt;&lt;TD style=&quot;padding:1px&quot; align=center&gt;#&lt;BR&gt;targets&lt;/td&gt;&lt;TD width=15&gt;&lt;/td&gt;';
    for (var i=0; i&lt;troopDef.length; i++)
      m += '&lt;TD&gt;'+ troopDef[i][0] +'&lt;/td&gt;';
    m += '&lt;/tr&gt;';
    for (var b=1; b&lt;11; b++){
      m += '&lt;TR&gt;&lt;TD&gt;Barb level '+ b +'&lt;/td&gt;&lt;TD align=right&gt;'+ coordList['lvl'+b].length  +'&amp;nbsp; &amp;nbsp;&lt;/td&gt;&lt;TD&gt;&lt;/td&gt;'; 
      for (var td=0; td&lt;troopDef.length; td++)
        m += '&lt;TD&gt;&lt;INPUT id=ptET_'+ b +'_'+ troopDef[td][1] +' type=text size=3 value=&quot;'+ t.troops['b'+ b][troopDef[td][1]-1] +'&quot;&gt;&lt;/td&gt;';
      m += '&lt;TD width=90%&gt;&lt;SPAN class=boldRed id=ptETerr_'+ b +'&gt;&lt;/span&gt;&lt;/tr&gt;';
    } 
    m += '&lt;/table&gt;';
    var isKOCattack = !(document.getElementById('KOCAttackToggle') == null);
    
    //TODO: 'RESET VALUES' button ?
    
    if (isKOCattack){
      m += '&lt;BR&gt;&lt;CENTER&gt;'+ strButton20('Bulk Add to KOC Attack', 'id=pbSrcDoBA') +'&lt;/center&gt;';
    } else {
      m += 'KOC Attack not running, unable to export';
    } 
    m += '&lt;CENTER&gt;&lt;DIV style=&quot;width:70%&quot; id=pbSrcExpResult&gt;&lt;/DIV&gt;&lt;/center&gt;'; 
    popExp.getMainDiv().innerHTML =  m;
    for (var b=1; b&lt;11; b++)
      for (var td=0; td&lt;troopDef.length; td++)
        document.getElementById('ptET_'+ b +'_'+ troopDef[td][1]).addEventListener ('change', validate, false);
    
    popExp.getTopDiv().innerHTML = '&lt;CENTER&gt;&lt;B&gt;Power Bot Export&lt;/b&gt;&lt;/center&gt;';
    if (isKOCattack)    
      document.getElementById ('pbSrcDoBA').addEventListener ('click', doBulkAdd, false);
    popExp.show(true);
         
    if (city != null){
      for (var i=0; i&lt;Cities.numCities; i++)
        if (city.id == Cities.cities[i].id)
          break;
      if (i &lt; Cities.numCities){
        setTimeout (function(){unsafeWindow.citysel_click(document.getElementById('citysel_'+ (i+1)));}, 0);
//logit (&quot;SWITCH CITY: &quot;+ (i+1));          
      }
    }
// TODO: WAIT FOR City select ?
    
  
    function validate (e){
      var x = e.target.id.substr(5).split('_');
      var b = x[0];
      var trp = x[1];
      document.getElementById('ptETerr_'+ b).innerHTML = '';
      var x = parseIntZero (e.target.value);
      if (isNaN(x) || x&lt;0 || x&gt;100000){
        e.target.style.backgroundColor = 'red';
        document.getElementById('ptETerr_'+ b).innerHTML = 'Invalid Entry';
        return;
      } else {
        e.target.style.backgroundColor = '';
        e.target.value = x;
        t.troops['b'+ b][trp-1] = x;
      }
      var tot = 0;
      for (var td=0; td&lt;troopDef.length; td++)
        tot += parseIntZero(document.getElementById('ptET_'+ b +'_'+ [troopDef[td][1]]).value);
      if (tot&lt;1 &amp;&amp; cList['lvl'+ b].length&gt;0 )
        document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
      if (tot&gt;100000)
        document.getElementById('ptETerr_'+ b).innerHTML = 'Too many troops';
    }
      
    function doBulkAdd (){
      for (var b=1; b&lt;11; b++){
        if (document.getElementById('ptETerr_'+ b).innerHTML != '')
          return;
        var tot = 0;
        for (var td=0; td&lt;troopDef.length; td++)
          tot += t.troops['b'+b][troopDef[td][1]-1];
        if (tot&lt;1 &amp;&amp; cList['lvl'+ b].length&gt;0){
          document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
          return; 
        } else if (tot&gt;100000) {
          document.getElementById('ptETerr_'+ b).innerHTML = 'Too many troops';
          return; 
        }
      }    
      document.getElementById('pbSrcExpResult').innerHTML = '';
      doNextLevel ();
    }
    
    function endBulkAdd (msg){
      unsafeWindow.Modal.hideModalAll(); 
      curLevel = 0;
      showMe ();
      popExp.show(true);
      document.getElementById('pbSrcExpResult').innerHTML += msg;
    }
    
    function doNextLevel (){
      while ( curLevel&lt;10 &amp;&amp; cList['lvl'+ ++curLevel].length==0)
        ;
      if (curLevel&gt;=10){
        endBulkAdd ('Done!&lt;BR&gt;'); 
        return;
      }
// WinManager.hideall();      &lt;=== TODO!  
      hideMe();
      popExp.show (false);
      unsafeWindow.Modal.hideModalAll(); 
      unsafeWindow.modal_attack(4,0,0);
      new CwaitForElement ('BulkAddAttackDiv', 5000, e_attackDialog );
    }
        
    function e_attackDialog (tf){
      if (!tf){
        endBulkAdd ('&lt;SPAN class=boldRed&gt;ERROR: Unable to open attack dialog&lt;/span&gt;');
        return;  
      } 
      var div = document.getElementById('BulkAddAttackDiv').firstChild;
      if (div==null || div.style.display!='none'){
        endBulkAdd ('&lt;SPAN class=boldRed&gt;ERROR: Unexpected attack dialog format.&lt;/span&gt;');
        return;  
      }
      // find div and textarea and button ...
      var ta = null;
      var but = null;
      for (var i=0; i&lt;div.childNodes.length; i++){
        if (div.childNodes[i].tagName=='TEXTAREA')
          ta = div.childNodes[i];
        else if (div.childNodes[i].tagName=='A')
          but = div.childNodes[i];
      }
      if (ta==null || but==null){
        endBulkAdd ('&lt;SPAN class=boldRed&gt;ERROR: Unexpected attack dialog format.&lt;/span&gt;');
        return;  
      } 
      for (var trp=1; trp&lt;13; trp++){
        if (t.troops['b'+curLevel][trp-1] &gt; 0){
          var inp = document.getElementById('modal_attack_unit_ipt' +trp);
          inp.value = t.troops['b'+curLevel][trp-1];
          inp.style.backgroundColor = 'yellow';
        }
      }
      div.style.display = 'block';
      document.getElementById('KOCAttackBulkAddForce').checked = true;
      if (DISABLE_BULKADD_LIST)
        ta.value = '';
      else {
        var m = '';
        var list = cList['lvl'+ (curLevel)];
        for (i=0; i&lt;list.length; i++)
          m += list[i].x +','+ list[i].y +'\n';
        ta.value = m;
      }
      clickWin (unsafeWindow, but, 'click');   
      unsafeWindow.Modal.hideModal();
      document.getElementById('pbSrcExpResult').innerHTML += 'Added '+ list.length +' targets for '+ city.name +'&lt;BR&gt;';
      setTimeout (doNextLevel, 10);
    }    
  },
}

  

/****************************  Sample Tab Implementation  ******************************/
Tabs.sample = {
  tabOrder : 30,                    // order to place tab in top bar
  tabDisabled : !ENABLE_SAMPLE_TAB, // if true, tab will not be added or initialized
  tabLabel : 'Click Me',            // label to show in main window tabs
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.sample;
    t.myDiv = div;
    var cityName = Cities.cities[0].name;
    div.innerHTML = '&lt;CENTER&gt;&lt;BR&gt;This is a sample tab implementation&lt;BR&gt;&lt;BR&gt;Showing food for '+ cityName +' : &lt;SPAN id=pbSampleFood&gt;0&lt;/span&gt;\
        &lt;BR&gt;&lt;BR&gt;(Food is updated every 5 seconds)&lt;/center&gt;';
  },
  
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.sample;
    clearTimeout (t.timer);
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.sample;
    var food = parseInt(Seed.resources['city'+ Cities.cities[0].id]['rec'+1][0] / 3600);
    document.getElementById('pbSampleFood').innerHTML = addCommas (food);
    clearTimeout (t.timer);
    t.timer = setTimeout (t.show, 5000);
  },
}


/*********************************** ATTACK TAB ***********************************/
function setMaxHeightScrollable (e){
  e.style.height = '100%';
  e.style.height = e.clientHeight + 'px';
  e.style.maxHeight = e.clientHeight + 'px';
  e.style.overflowY = 'auto';
}

Tabs.Attack = {
  tabDisabled : !ENABLE_ATTACK_TAB,
  tabOrder: 20,
  myDiv : null,
  data : {},  
  MapAjax : new CMapAjax(),
    
  init : function (div){
    var t = Tabs.Attack;
    t.myDiv = div;
    t.myDiv.innerHTML = '&lt;TABLE width=100% height=100% class=pbTab&gt;&lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pbBarbShow type=submit value=&quot;Show All Targets&quot; \&gt; &lt;BR&gt;\
       City: &lt;SPAN id=pbAtkCSS&gt;&lt;/span&gt; &amp;nbsp; &amp;nbsp; &amp;nbsp; Radius: &lt;INPUT id=pbBarbDist size=3 type=text&gt; &amp;nbsp; &amp;nbsp; &lt;INPUT id=pbBarbScan type=submit value=Scan \&gt;&lt;/td&gt;&lt;/tr&gt;&lt;TR&gt;&lt;TD height=100%&gt;\
       &lt;DIV id=pbAtkDiv style=&quot;background-color:white&quot;&gt;&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;';
    t.loadTargets ();
    // TODO: Check current cities, invalidate data if city moved
    document.getElementById('pbBarbScan').addEventListener ('click', t.e_clickedScan, false);
    document.getElementById('pbBarbShow').addEventListener ('click', t.e_clickedShow, false);
    new CdispCityPicker ('pbAtkCS', document.getElementById('pbAtkCSS'), false, function (c){t.scanCity=c}, 0);
  },
  
  hide : function (){
  },

  state : 0,
  show : function (){
    var t = Tabs.Attack;
    if (t.state == 0){
      setMaxHeightScrollable (document.getElementById('pbAtkDiv'));
      t.state = 1;
    }
  },

  clearDiv : function (){
    document.getElementById('pbAtkDiv').innerHTML = '';
  },
  writeDiv : function (m){
    document.getElementById('pbAtkDiv').innerHTML += m;
  },
  
  loadTargets : function (){
    var t = Tabs.Attack;
DebugTimer.start(); 
    var totTargets = 0;   
    for (var c=0; c&lt;Cities.numCities; c++){
      var s = GM_getValue ('atk_'+ getServerId() +'_'+ Cities.cities[c].id, null);
      if (s == null)
        t.data['city'+ Cities.cities[c].id] = {cityX:Cities.cities[c].x, cityY:Cities.cities[c].y, radius:0, numTargets:0, targets:{}};
      else
        t.data['city'+ Cities.cities[c].id] = JSON2.parse (s);
      totTargets += t.data['city'+ Cities.cities[c].id].numTargets;
    }
DebugTimer.display ('Time to GM_getValue() '+ totTargets +' targets for all cities');    
  },
  
  e_clickedScan : function (){
    var t = Tabs.Attack;
    t.clearDiv();
    var dist = parseInt(document.getElementById('pbBarbDist').value);
    if (isNaN(dist) || dist&lt;1 || dist&gt;35){
      t.writeDiv (&quot;&lt;SPAN class=boldRed&gt;Nuh-uh, try again&lt;/span&gt;&lt;BR&gt;&quot;);
      return; 
    }
    t.writeDiv ('Scanning map for city: '+ t.scanCity.name +'&lt;BR&gt;');
    t.scanBarbs (t.scanCity.id, dist);
  },

  popShow : null,  
  
  e_clickedShow : function (){    // show all current attack data
    var t = Tabs.Attack;
    if (t.popShow == null){
      t.popShow = new CPopup ('pbbs', 0,0, 500,500, true, function (){t.popShow.destroy(); t.popShow=null;});
      t.popShow.centerMe (mainPop.getMainDiv());  
    }
    var m = '&lt;DIV style=&quot;max-height:460px; height:460px; overflow-y:auto&quot;&gt;&lt;TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPad&gt;';
    for (var c=0; c&lt;Cities.numCities; c++){
      var dat = t.data['city'+ Cities.cities[c].id];
      m += '&lt;TR&gt;&lt;TD colspan=3&gt;&lt;DIV class=ptstat&gt;'+ Cities.cities[c].name +' &amp;nbsp; (radius:'+ dat.radius +' &amp;nbsp;targets:'+ dat.numTargets  +')&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;';
      // sort by distance ...
      var atks = [];
      for (k in dat.targets)
        atks.push (dat.targets[k]);
      atks.sort (function(a,b){return a.dist-b.dist});     
      for (i=0; i&lt;atks.length; i++)
        m += '&lt;TR&gt;&lt;TD&gt;Barb Camp '+ atks[i].lvl +'&lt;/td&gt;&lt;TD&gt;'+ atks[i].x +','+ atks[i].y +'&lt;/td&gt;&lt;TD&gt; &amp;nbsp; Dist='+ atks[i].dist.toFixed(2) +'&lt;/td&gt;&lt;/tr&gt;';
    }    
    t.popShow.getMainDiv().innerHTML = '&lt;/table&gt;&lt;/div&gt;'+ m;
    t.popShow.getTopDiv().innerHTML = '&lt;CENTER&gt;&lt;B&gt;Showing all targets in memory&lt;/b&gt;&lt;/center&gt;';
    t.popShow.show(true);    
  },

  configWriteTargets : function (cityID){
    var t = Tabs.Attack;
    var serverID = getServerId();
    DebugTimer.start();    
    GM_setValue ('atk_'+ serverID +'_'+ cityID,  JSON2.stringify(t.data['city'+ cityID]));
    t.writeDiv ('** Time to GM_setValue() '+ t.data['city'+ cityID].numTargets +' targets for city: '+ (DebugTimer.getMillis()/1000) +' seconds&lt;BR&gt;');
  },
    
  oScan : {},   
  scanBarbs : function (cityID, distance){   // max distance:35
    var t = Tabs.Attack;
    var city = Cities.byID[cityID];
// TODO: remember state - in case of refresh
    var x = t.MapAjax.normalize(city.x-distance); 
    var y = t.MapAjax.normalize(city.y-distance); 
    t.oScan = { city:city, centerX:city.x, centerY:city.y, maxDist:distance,
        minX:x, maxX:city.x+distance, minY:y, maxY:city.y+distance, curX:x, curY:y, data:[] };
    setTimeout (function(){t.MapAjax.request (t.oScan.curX, t.oScan.curY, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ t.oScan.curX +','+ t.oScan.curY +'&lt;BR&gt;');
  },

  e_scanDone : function (errMsg){
    var t = Tabs.Attack;
    t.data['city'+ t.oScan.city.id] = {cityX:t.oScan.city.x, cityY:t.oScan.city.y, radius:t.oScan.maxDist, numTargets:0, targets:{}};
    var dat = t.data['city'+ t.oScan.city.id];
    t.writeDiv ('Done scanning&lt;BR&gt;');
    for (var i=0; i&lt;t.oScan.data.length; i++){
      var map = t.oScan.data[i];
      dat.targets[map[0] +'_'+ map[1]] = {type:'b', x:map[0], y:map[1], dist:map[2], lvl:map[3]};
      ++dat.numTargets;
    }
    t.configWriteTargets (t.oScan.city.id);
  },
      
  e_mapCallback : function (left, top, width, rslt){
    var t = Tabs.Attack;
    if (!rslt.ok){
      setTimeout (function(){t.e_scanDone (rslt.errorMsg)}, 0);
      t.writeDIV ('&lt;BR&gt;ERROR: '+ rslt.errorMsg +'&lt;BR&gt;');
      return;
    }
    var map = rslt.data;
    for (k in map){
      var lvl = parseInt(map[k].tileLevel);
      if (map[k].tileType==51 &amp;&amp; !map[k].tileCityId &amp;&amp; lvl&lt;8) {  // if barb
        var dist = distance (t.oScan.centerX, t.oScan.centerY, map[k].xCoord, map[k].yCoord);
        if (dist &lt;= t.oScan.maxDist){
          t.oScan.data.push ([parseInt(map[k].xCoord), parseInt(map[k].yCoord), dist, lvl]);
        }
      } 
    }
    t.oScan.curX += 15;
    if (t.oScan.curX &gt; t.oScan.maxX){
      t.oScan.curX = t.oScan.minX;
      t.oScan.curY += 15;
      if (t.oScan.curY &gt; t.oScan.maxY){
        setTimeout (function(){t.e_scanDone (null)}, 0);
        return;
      }
    }
    var x = t.oScan.curX;
    var y = t.oScan.curY;
    setTimeout (function(){t.MapAjax.request (x,y, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ x +','+ y +'&lt;BR&gt;');
  },
}


/*********************************** Test TAB ***********************************/
Tabs.Test = {
  tabOrder: 25,
  tabDisabled : !ENABLE_TEST_TAB,         // if true, tab will not be added or initialized
  tabLabel : 'Test',
  myDiv : null,

  init : function (div){
    var t = Tabs.Test;
    t.myDiv = div;
    var m = '&lt;TABLE&gt;&lt;TR&gt;&lt;TD align=right&gt;Scout: &lt;/td&gt;&lt;TD&gt;&lt;INPUT type=checkbox id=pbfakeIsScout&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD align=right&gt;Wild: &lt;/td&gt;&lt;TD&gt;&lt;INPUT type=checkbox id=pbfakeIsWild&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD align=right&gt;False Report: &lt;/td&gt;&lt;TD&gt;&lt;INPUT type=checkbox id=pbfakeFalse&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD align=right&gt;Seconds: &lt;/td&gt;&lt;TD&gt;&lt;INPUT type=text size=4 value=300 id=pbfakeSeconds&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD align=right&gt;# of Militia: &lt;/td&gt;&lt;TD&gt;&lt;INPUT type=text size=6 value=5000 id=pbfakeMilitia&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD colspan=2 align=center&gt;&lt;INPUT id=pbtestSendMarch type=submit value=&quot;Fake Attack&quot; \&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;\
        &lt;INPUT id=pbReloadKOC type=submit value=&quot;Reload KOC&quot; \&gt;\
        &lt;BR&gt;Force ajax errors : &lt;INPUT type=checkbox id=pbajaxErr&gt;\
        &lt;BR&gt;&lt;DIV id=pbtestDiv style=&quot;background-color:#ffffff; maxwidth:675; maxheight:350px; height:350px; overflow-y:auto;&quot;&gt;&lt;/div&gt;';
    div.innerHTML = m;
    document.getElementById('pbtestSendMarch').addEventListener ('click', t.clickFakeAttack, false);
    document.getElementById('pbReloadKOC').addEventListener ('click', reloadKOC, false);
    document.getElementById('pbajaxErr').addEventListener ('click', function (){window.EmulateAjaxError=this.checked}, false);
  },

  hide : function (){
    var t = Tabs.Test;
  },

  show : function (){
  },

  writeDiv : function (msg){
    var t = Tabs.Test;
    if (t.state != null)
      document.getElementById('pbtestDiv').innerHTML = msg;
  },

  addDiv : function (msg){
    var t = Tabs.Test;
    if (t.state != null)
      document.getElementById('pbtestDiv').innerHTML += msg;
  },
  
  createFakeAttack : function (cityNum, isScout, isWild, isFalse, secs, numMilitia){
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
    march.unts.u3 = 1
    march.unts.u2 = numMilitia
    march.pid = 1234567
    march.score = 9
    march.mid = marchId.substr(1);
    march.players = {}
    march.players.u1234567 = {}
    march.players.u1234567.n = 'Fred Flintstone';
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
    var isScout = document.getElementById('pbfakeIsScout').checked;
    var isWild = document.getElementById('pbfakeIsWild').checked;
    var isFalse = document.getElementById('pbfakeFalse').checked;
    var secs = parseInt(document.getElementById('pbfakeSeconds').value);
    var mil = parseInt(document.getElementById('pbfakeMilitia').value);
    t.createFakeAttack (0, isScout, isWild, isFalse, secs, mil);
  },
}

/*********************************** Log Tab ***********************************/
Tabs.ActionLog = {
  tabOrder: 11,
  tabLabel : 'Log',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,
    
  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '&lt;DIV class=ptstat&gt;ACTION LOG&lt;/div&gt;&lt;DIV style=&quot;height:535px; max-height:535px; overflow-y:auto&quot;&gt;\
      &lt;TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=pbTabLined&gt;&lt;TR&gt;&lt;TD&gt;&lt;/td&gt;&lt;TD width=95%&gt;&lt;/td&gt;&lt;/table&gt;&lt;/div&gt;';
    t.logTab = document.getElementById('pbactionlog');  
    t.state = 1;
    var a = JSON2.parse(GM_getValue ('log_'+getServerId(), '[]'));
    if (matTypeof(a) == 'array'){
      t.last50 = a;
      for (var i=0; i&lt;t.last50.length; i++)
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
    GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last50));
  },
    
  _addTab : function (msg, ts){
    var t = Tabs.ActionLog;
    if (t.state != 1)
      return;
    if (t.logTab.rows.length &gt;= t.maxEntries)
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
    while (t.last50.length &gt;= 50)
      t.last50.shift();
    t.last50.push ({msg:msg, ts:ts});
  },
}

function actionLog (msg){
  if (!Tabs.ActionLog.tabDisabled)
    Tabs.ActionLog.log (msg);  
}
    

/*********************************** Options Tab ***********************************/
Tabs.Options = {
  tabOrder: 10,
  myDiv : null,
  fixAvailable : {},

  init : function (div){
    var t = Tabs.Options;
    t.myDiv = div;
    try {      
      m = '&lt;DIV style=&quot;height:500px; max-height:500px; overflow-y:auto&quot;&gt;&lt;TABLE width=100% class=pbTabLined cellspacing=0 cellpadding=0&gt;\
        &lt;TR&gt;&lt;TD colspan=2&gt;&lt;B&gt;Power Bot Config:&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pballowWinMove type=checkbox /&gt;&lt;/td&gt;&lt;TD&gt;Enable window drag (move window by dragging top bar with mouse)&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pbTrackWinOpen type=checkbox /&gt;&lt;/td&gt;&lt;TD&gt;Remember window open state on refresh&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD colspan=2&gt;&lt;BR&gt;&lt;B&gt;KofC Features:&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pbFairie type=checkbox /&gt;&lt;/td&gt;&lt;TD&gt;Disable all Fairie popup windows&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/&gt;&lt;/td&gt;&lt;TD&gt;Wide screen (all domains, requires refresh)&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pbWatchEnable type=checkbox '+ (GlobalOptions.pbWatchdog?'CHECKED ':'') +'/&gt;&lt;/td&gt;&lt;TD&gt;Refresh if KOC not loaded within 1 minute (all domains)&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pbEveryEnable type=checkbox /&gt;&lt;/td&gt;&lt;TD&gt;Refresh KOC every &lt;INPUT id=pbeverymins type=text size=2 maxlength=3 \&gt; minutes&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pbChatREnable type=checkbox /&gt;&lt;/td&gt;&lt;TD&gt;Put chat on right (requires wide screen)&lt;/td&gt;&lt;/tr&gt;\
		&lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pbWMapEnable type=checkbox /&gt;&lt;/td&gt;&lt;TD&gt;Use WideMap (requires wide screen)&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pbGoldEnable type=checkbox /&gt;&lt;/td&gt;&lt;TD&gt;Auto collect gold when happiness reaches &lt;INPUT id=pbgoldLimit type=text size=2 maxlength=3 \&gt;%&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD&gt;&lt;INPUT id=pbalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/&gt;&lt;/td&gt;&lt;TD&gt;Automatically post incoming attacks to alliance chat.&lt;/td&gt;&lt;/tr&gt;\
        &lt;TR&gt;&lt;TD&gt;&lt;/td&gt;&lt;TD&gt;&lt;TABLE cellpadding=0 cellspacing=0&gt;\
            &lt;TR&gt;&lt;TD align=right&gt;Message Prefix: &amp;nbsp; &lt;/td&gt;&lt;TD&gt;&lt;INPUT id=pbalertPrefix type=text size=60 maxlength=120 value=&quot;'+ Options.alertConfig.aPrefix +'&quot; \&gt;&lt;/td&gt;&lt;/tr&gt;\
            &lt;TR&gt;&lt;TD align=right&gt;Alert on scouting: &amp;nbsp; &lt;/td&gt;&lt;TD&gt;&lt;INPUT id=pbalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/&gt;&lt;/td&gt;&lt;/tr&gt;\
            &lt;TR&gt;&lt;TD align=right&gt;Alert on wild attack: &amp;nbsp; &lt;/td&gt;&lt;TD&gt;&lt;INPUT id=pbalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/&gt;&lt;/td&gt;&lt;/tr&gt;\
            &lt;TR&gt;&lt;TD align=right&gt;Minimum # of troops: &amp;nbsp; &lt;/td&gt;&lt;TD&gt;&lt;INPUT id=pbalertTroops type=text size=7 value=&quot;'+ Options.alertConfig.minTroops +'&quot; \&gt; &amp;nbsp; &amp;nbsp; &lt;span id=pbalerterr&gt;&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;\
            &lt;/table&gt;&lt;/td&gt;&lt;/tr&gt;\
        &lt;/table&gt;&lt;BR&gt;&lt;BR&gt;&lt;HR&gt;Note that if a checkbox is greyed out there has probably been a change of KofC\'s code, rendering the option inoperable.&lt;/div&gt;';
      div.innerHTML = m;

      document.getElementById('pbWatchEnable').addEventListener ('change', t.e_watchChanged, false);
      document.getElementById('pbWideOpt').addEventListener ('change', t.e_wideChanged, false);
      document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
      document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
      document.getElementById('pbalertScout').addEventListener ('change', t.e_alertOptChanged, false);
      document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
      document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
      t.togOpt ('pballowWinMove', 'pbWinDrag', mainPop.setEnableDrag);
      t.togOpt ('pbTrackWinOpen', 'pbTrackOpen');
      t.togOpt ('pbFairie', 'pbKillFairie', FairieKiller.setEnable);
      t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
      t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
      t.changeOpt ('pbeverymins', 'pbEveryMins');
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
	  t.togOpt ('pbWMapEnable', 'pbWideMap', WideScreen.useWideMap);
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);

    } catch (e) {
      div.innerHTML = '&lt;PRE&gt;'+ e.name +' : '+ e.message +'&lt;/pre&gt;';  
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
  
  e_watchChanged : function (){
    GlobalOptions.pbWatchdog = document.getElementById('pbWatchEnable').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
  e_wideChanged : function (){
    GlobalOptions.pbWideScreen = document.getElementById('pbWideOpt').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
  e_alertOptChanged : function (){
    Options.alertConfig.aChat = document.getElementById('pbalertEnable').checked;
    Options.alertConfig.aPrefix=document.getElementById('pbalertPrefix').value;      
    Options.alertConfig.scouting=document.getElementById('pbalertScout').checked;      
    Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
    var mt = parseInt(document.getElementById('pbalertTroops').value);
    if (mt&lt;1 || mt&gt;120000){
      document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;
      document.getElementById('pbalerterr').innerHTML = '&lt;font color=#600000&gt;&lt;B&gt;INVALID&lt;/b&gt;&lt;/font&gt;';
      setTimeout (function (){document.getElementById('pbalerterr').innerHTML =''}, 2000);
      return;
    } 
    Options.alertConfig.minTroops = mt;
    saveOptions();
    TowerAlerts.setPostToChatOptions (Options.alertConfig);
  },
}


/************************ Tower Alerts ************************/
var TowerAlerts = {
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  towerMarches : {},    // track all marches that have been posted to alliance chat
  
  init : function (){
    var t = TowerAlerts; 
    var s = GM_getValue ('towerMarches_'+getServerId());
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
      if (t.towerMarches[k].arrival &lt; now)
        delete t.towerMarches[k];
    }
    t.towerMarches['m'+m.mid] = {added:now, arrival:parseIntNan(m.arrivalTime) };
    GM_setValue ('towerMarches_'+getServerId(), JSON2.stringify(t.towerMarches) );
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
        if ((m.marchType==3 || m.marchType==4) &amp;&amp; parseIntNan(m.arrivalTime)&gt;now &amp;&amp; t.getTowerMarch(m.mid)==null){
          t.addTowerMarch (m);
          t.postToChat (m, false);
        }
      }
    }
    t.secondTimer = setTimeout (t.e_eachSecond, 2000);
  },
  
  postToChat : function (m, force){
    var t = TowerAlerts;
    if (DEBUG_TRACE) logit (&quot;checkTower(): INCOMING at &quot;+ unixTime()  +&quot;: \n&quot;+ inspect (m, 8, 1));
    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv (&quot;Incoming!&lt;BR&gt;&lt;PRE style='margin:0px;'&gt;&quot; + inspect (m, 8, 1) +'&lt;/pre&gt;');
    if (m.marchType == 3){
      if (!t.postToChatOptions.scouting &amp;&amp; !force)
        return;
      atkType = 'scouted';
    } else if (m.marchType == 4){
      atkType = 'attacked';
    } else {
      return;
    }
    var target, atkType, who;
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      target = 'city at '+ city.x +','+ city.y;
    else {
      if (!t.postToChatOptions.wilds &amp;&amp; !force)
        return;
      target = 'wilderness';
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' at '+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      who = Seed.players['u'+m.pid].n;
    else if (m.players &amp;&amp; m.players['u'+m.pid])
      who = m.players['u'+m.pid].n;
    else
      who = 'Unknown';
  
    if (m.fromXCoord)
      who += ' at '+ m.fromXCoord +','+ m.fromYCoord;
    var msg = '';
    if (!force)
      msg = t.postToChatOptions.aPrefix +' ';
    msg += 'My '+ target +' is being '+ atkType  +' by '+ who +'. Incoming Troops (arriving in '+
        unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';
    var totTroops = 0;
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      msg += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
      totTroops += m.unts[k];
    }
    if ((totTroops &lt; t.postToChatOptions.minTroops) &amp;&amp; !force)
      return;
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count &gt; 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 &amp;&amp; Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
        msg += ' My embassy has '+ availSlots +' of '+ emb.maxLevel +' slots available.';
      }
    }
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv (msg);
    if (SEND_ALERT_AS_WHISPER)
      sendChat (&quot;/&quot;+ Seed.player.name +' '+ msg);    // Whisper to myself
    else
      sendChat (&quot;/a &quot;+  msg);                        // Alliance chat
  },
}

/************************ Gold Collector ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectGold;
    for (var c=0; c&lt;Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].id] = 0;
    if (Options.pbGoldEnable)
      t.setEnable (true);
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
    for (var c=0; c&lt;Cities.numCities; c++){
      var city = Cities.cities[c];
      var happy = Seed.citystats['city'+ city.id].pop[2];
      var since = unixTime() - t.lastCollect['c'+city.id];
      if (happy&gt;=Options.pbGoldHappy &amp;&amp; since&gt;15*60){
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
      actionLog ('Collected '+ rslt.goldGained +' gold for '+ t.colCityName +' (happiness was '+ t.colHappy +')'); 
    else 
      actionLog ('Error collecting gold for '+ t.colCityName +': &lt;SPAN class=boldRed&gt;'+ rslt.errorMsg +'&lt;/span&gt;'); 
  },
  
  ajaxCollectGold : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + &quot;ajax/levyGold.php&quot; + unsafeWindow.g_ajaxsuffix, {
      method: &quot;post&quot;,
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
    if (Options.pbEveryMins &lt; 1)
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

/************************ Fairie Killer ************************/
var FairieKiller  = {
  saveFunc : null,
  init : function (tf){
    FairieKiller.saveFunc = unsafeWindow.Modal.showModalUEP;
    FairieKiller.setEnable (tf);
  },
  setEnable : function (tf){
    if (tf)
      unsafeWindow.Modal.showModalUEP = eval ('function (a,b,c) {actionLog (&quot;Blocked Faire popup&quot;)}');
    else
      unsafeWindow.Modal.showModalUEP = FairieKiller.saveFunc;
  },
}

/********** facebook watchdog: runs only in 'http://apps.facebook.com/kingdomsofcamelot/*' instance!  ******/
function facebookWatchdog (){
  var INTERVAL = 50000; // wait 50 seconds minute before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  
// TODO: actionLog ?  
  function watchdog (){
logit (&quot;--- Facebook WATCHDOG&quot;);    
    try {
//      if (document.getElementById('app_content_130402594779').firstChild.firstChild.childNodes[1].firstChild.tagName!='IFRAME'){
      if (document.getElementById('app_content_130402594779') == null){
        logit (&quot;KOC NOT FOUND!&quot;); 
        KOCnotFound(5*60);
      } 
    } catch (e){
      logit (&quot;KOC NOT FOUND!&quot;); 
      KOCnotFound(5*60);
    } 
  }
}


function kocWatchdog (){
  var INTERVAL = 30000; // wait 30 seconds before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  function watchdog (){
logit (&quot;--- KOC WATCHDOG&quot;);    
    if (document.getElementById('mod_maparea')==null){
      actionLog (&quot;KOC not loaded&quot;);
      KOCnotFound(3*60);
    }     
  }
}


function KOCnotFound(secs){
  var div;
  var countdownTimer = null;
  var endSecs = (new Date().getTime()/1000) + secs;
    
  div = document.createElement('div');
  div.innerHTML = '&lt;DIV style=&quot;font-size:18px; background-color:#a00; color:#fff&quot;&gt;&lt;CENTER&gt;&lt;BR&gt;KOC Power Bot has detected that KOC is not loaded&lt;BR&gt;\
      Refreshing in &lt;SPAN id=pbwdsecs&gt;&lt;/span&gt;&lt;BR&gt;&lt;INPUT id=pbwdcan type=submit value=&quot;Cancel Refresh&quot;&gt;&lt;BR&gt;&lt;BR&gt;&lt;/div&gt;';
  document.body.insertBefore (div, document.body.firstChild);
  document.getElementById('pbwdcan').addEventListener('click', cancel, false);
  countdown();
      
  function countdown (){
    var secsLeft = endSecs - (new Date().getTime()/1000);
    document.getElementById('pbwdsecs').innerHTML = timestr(secsLeft);
    if (secsLeft &lt; 0)
      reloadKOC();
    countdownTimer = setTimeout (countdown, 1000);
  }
  function cancel (){
    clearTimeout (countdownTimer);
    document.body.removeChild (div);
  }
}



var WideScreen = {
  chatIsRight : false,
  useWideMap : false,

  init : function (){
    if (GlobalOptions.pbWideScreen){
      GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important}');  
      try {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'));
      } catch (e) {
      }
    }
  },
        
  setChatOnRight : function (tf){
    t = WideScreen;
    if (tf == t.chatIsRight || !GlobalOptions.pbWideScreen)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1000); 
      chat.style.top = '-624px';
      chat.style.left = '760px';
      chat.style.height = '720px';
      chat.style.background = 'url(&quot;'+ CHAT_BG_IMAGE +'&quot;)';
      document.getElementById('mod_comm_list1').style.height = '580px';
      document.getElementById('mod_comm_list2').style.height = '580px';
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
		document.getElementById('mapwindow').style.height = &quot;436px&quot;;
		document.getElementById('mapwindow').style.width = &quot;1220px&quot;;
		document.getElementById('mapwindow').style.zIndex = &quot;50&quot;;
	} else {
		document.getElementById('mapwindow').style.height = &quot;439px&quot;;
		document.getElementById('mapwindow').style.width = &quot;760px&quot;;
		document.getElementById('mapwindow').style.zIndex = &quot;&quot;;
	}
  },
}



/*******************   KOC Map interface ****************/
// 0:bog, 10:grassland, 11:lake, 20:woods, 30:hills, 40:mountain, 50:plain, 51:city / barb, 53:misted city
function CMapAjax (){
  this.normalize = normalize;  
  this.request = request;

  function request (left, top, width, notify){    
    var left = parseInt(left / 5) * 5;
    var top = parseInt(top / 5) * 5;
    var width = parseInt((width+4) / 5) * 5;
    
    var blockString = generateBlockList(left, top, width);
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.blocks = blockString;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + &quot;ajax/fetchMapTiles.php&quot; + unsafeWindow.g_ajaxsuffix, {
      method: &quot;post&quot;,
      parameters: params,
      onSuccess: function (rslt) {
        notify(left, top, width, rslt);
      },
      onFailure: function (rslt) {
        notify(left, top, width, rslt);
      }
    });
    function generateBlockList (left, top, width) {
      var width5 = parseInt(width / 5);
      var bl = [];
      for (x=0; x&lt;width5; x++){
        var xx = left + (x*5);
        if (xx &gt; 745)
          xx -= 750;
        for (y=0; y&lt;width5; y++){
          var yy = top + (y*5);
          if (yy &gt; 745)
            yy -= 750;
          bl.push ('bl_'+ xx +'_bt_'+ yy);
        }
      }
      return bl.join(&quot;,&quot;);
    }
  }
 
  function normalize  (x){
    if ( x &gt;= 750)
      x -= 750;
    else if (x &lt; 0)
      x += 750;
    return parseInt (x/5) * 5;
  }
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
    var m = '&lt;TABLE cellspacing=0 class=pbMainTab&gt;&lt;TR&gt;';
    for (var i=0; i&lt;sorter.length; i++)
      m += '&lt;TD class=spacer&gt;&lt;/td&gt;&lt;TD class=notSel id=pbtc'+ sorter[i][1].name +' &gt;&lt;A&gt;&lt;SPAN&gt;'+ sorter[i][1].label +'&lt;/span&gt;&lt;/a&gt;&lt;/td&gt;';
    m += '&lt;TD class=spacer width=90% align=right&gt;'+ Version +'&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;';
    mainPop.getTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.currentTab == null)
        t.currentTab = t.tabList[k];
      document.getElementById('pbtc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div; 
      div.style.display = 'none';
      div.style.height = '100%';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = &quot;INIT ERROR: &quot;+ e;
      }
    }
    
    t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), true);
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
      t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pbtc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
    }
    newTab.obj.show();
  },
}


function onUnload (){
  Options.pbWinPos = mainPop.getLocation();
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
    Options.pbWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.pbWinIsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.pbWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.pbWinIsOpen = true;
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
    for (i=0; i&lt;frArray.length; i++){
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

var knightRoles = {
  Foreman : 'politics',
  Marshall : 'combat',
  Alchemystic : 'intelligence',
  Steward : 'resourcefulness',
};

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

var fortNamesShort = {
  53: &quot;Crossbows&quot;,
  55: &quot;Trebuchet&quot;,
  60: &quot;Trap&quot;,
  61: &quot;Caltrops&quot;,
  62: &quot;Spiked Barrier&quot;,
}

// onClick (city{name, id, x, y}, x, y)   city may be null!
function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = &quot;castleBut castleButNon&quot;;
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = &quot;castleBut castleButSel&quot;;
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
        if (isNaN(x) || x&lt;0 || x&gt;750){
          that.coordBoxX.style.backgroundColor = '#ff8888';
          return;
        }
        if (isNaN(y) || y&lt;0 || y&gt;750){
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
  for (var i=0; i&lt;Cities.cities.length; i++)
    m += '&lt;INPUT class=&quot;castleBut castleButNon&quot; id=&quot;'+ id +'_'+ i +'&quot; value=&quot;'+ (i+1) +'&quot; type=submit \&gt;';
  if (dispName)
    m += ' &amp;nbsp; &lt;SPAN style=&quot;display:inline-block; width:85px; font-weight:bold;&quot; id='+ id +'cname' +'&gt;&lt;/span&gt;';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i&lt;Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};

function setCities(){
  Cities.numCities = Seed.cities.length;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i&lt;Cities.numCities; i++){
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


function dialogRetry (errMsg, seconds, onRetry, onCancel){
  seconds = parseInt(seconds);
  var pop = new CPopup ('pbretry', 0, 0, 400,200, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '&lt;CENTER&gt;KOC Power Bot&lt;/center&gt;';
  pop.getMainDiv().innerHTML = '&lt;CENTER&gt;&lt;BR&gt;&lt;FONT COLOR=#550000&gt;&lt;B&gt;An error has ocurred:&lt;/b&gt;&lt;/font&gt;&lt;BR&gt;&lt;BR&gt;&lt;DIV id=paretryErrMsg&gt;&lt;/div&gt;\
      &lt;BR&gt;&lt;BR&gt;&lt;B&gt;Automatically retrying in &lt;SPAN id=paretrySeconds&gt;&lt;/b&gt;&lt;/span&gt; seconds ...&lt;BR&gt;&lt;BR&gt;&lt;INPUT id=paretryCancel type=submit value=&quot;CANCEL Retry&quot; \&gt;';
  document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
  pop.show(true);
  
  document.getElementById('paretryErrMsg').innerHTML = errMsg;
  document.getElementById('paretrySeconds').innerHTML = seconds;
  var rTimer = setTimeout (doRetry, seconds*1000);
  countdown ();

  function countdown (){
    document.getElementById('paretrySeconds').innerHTML = seconds--;
    if (seconds &gt; 0)
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
  return a.join ('&amp;');    
}

// NOTE: args can be either a string which will be appended as is to url or an object of name-&gt;values
function addUrlArgs (url, args){
  if (!args)
    return url;
  if (url.indexOf('?') &lt; 0)
    url += '?';
  else if (url.substr(url.length-1) != '&amp;')
    url += '&amp;';    
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
    ajax=new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
  
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
      if (ajax.status &gt;= 200 &amp;&amp; ajax.status &lt; 305)
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
    ajax.send (a.join ('&amp;'));
  } else               {
    ajax.send();
  }
}   


function MyAjaxRequest (url, o, noRetryX){
if (DEBUG_TRACE) logit (&quot; 0 myAjaxRequest: &quot;+ url +&quot;\n&quot; + inspect (o, 2, 1));
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
    o.errorMsg = &quot;AJAX Communication Failure&quot;;
    wasFailure (o);
  }
  function mySuccess (msg){
    var rslt = eval(&quot;(&quot; + msg.responseText + &quot;)&quot;);
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
    if ( (x = rslt.errorMsg.indexOf ('&lt;br&gt;&lt;br&gt;')) &gt; 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry &amp;&amp; (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
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
  if (Seed.allianceDiplomacies.friendly &amp;&amp; Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile &amp;&amp; Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
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
  if (b &gt; g)
    b = a - b;
  var h = Math.abs(e - f);
  if (h &gt; g)
    h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};


// returns {count, maxlevel}
function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i&lt;33; i++){
    if (b['pos'+i] &amp;&amp; b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) &gt; ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
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



/************ DEBUG WIN *************/
var debugWin = {
  popDebug : null,
  dbDefaultNot : 'tech,tutorial,items,quests,wilderness,wildDef,buildings,knights,allianceDiplomacies,appFriends,players',
  dbSelect : {},

  doit : function (){ 
    var t = debugWin;    

    function syncBoxes (){
      var div = document.getElementById('dbpoplist');
      for (var i=0; i&lt;div.childNodes.length; i++){
        if (div.childNodes[i].type &amp;&amp; div.childNodes[i].type=='checkbox'){
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
      for (var i=0; i&lt;not.length; i++)
        t.dbSelect[not[i]] = false;
      syncBoxes();
    }
    function clickedShow (){
      var now = new Date();
      var myseed = unsafeWindow.Object.clone (Seed);
      var div = document.getElementById('dbpoplist');
      for (var i=0; i&lt;div.childNodes.length; i++){
        if (div.childNodes[i].type &amp;&amp; div.childNodes[i].type=='checkbox'){
          var name=div.childNodes[i].name.substr(6);
          if (!div.childNodes[i].checked)
            delete myseed[name];
        }
      } 
      WinLog.write (&quot;seed @ &quot;+ unixTime()  +&quot; (&quot;+ now +&quot;)\n\n&quot;+ inspect (myseed, 8, 1));
      myseed=null;
    }

    if (t.popDebug == null){  
      t.popDebug = new CPopup ('db', 0, 0, 350,500, true);
      t.popDebug.getTopDiv().innerHTML = 'DEBUG';
      t.popDebug.getMainDiv().innerHTML = '&lt;DIV&gt;&lt;INPUT type=submit id=padbsuball value=ALL&gt; &amp;nbsp; &lt;INPUT type=submit id=padbsubnone value=NONE&gt; &amp;nbsp; \
        &lt;INPUT type=submit id=padbdefaults value=DEFAULTS&gt; &amp;nbsp; &lt;INPUT type=submit id=padbsubdo value=SHOW&gt;&lt;/div&gt;\
        &lt;DIV id=padbpoplist style=&quot;max-height:400px; height:400px; overflow-y:auto&quot;&gt;&lt;/div&gt;';
      var div = document.getElementById('padbpoplist');
      for (var k in Seed)
        t.dbSelect[k] = true;
      var not = t.dbDefaultNot.split(',');
      for (var i=0; i&lt;not.length; i++)
        t.dbSelect[not[i]] = false;
      var m = [];
      for (k in t.dbSelect){
        m.push ('&lt;INPUT type=checkbox ');
        m.push ('name=&quot;dbpop_');
        m.push (k);
        m.push ('&quot;&gt; &amp;nbsp; ');
        m.push (k);
        m.push ('&lt;BR&gt;');
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
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('Options_'+serverID, JSON2.stringify(Options));}, 0);
}

function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('Options_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts)
      Options[k] = opts[k];
  }
}

function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}

function createButton (label){
  var a=document.createElement('a');
  a.className='button20';
  a.innerHTML='&lt;span style=&quot;color: #ff6&quot;&gt;'+ label +'&lt;/span&gt;';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text);
  a.className='tab';
  a.id = 'pbOfficial';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
// TODO: Fit 'POW' button in main div if there's room (make room by shortening 'Invite Friends' to 'Invite' ?)
  if(tabs) {
    var eNew = document.getElementById('gmTabs');
    if (eNew == null){
      eNew = document.createElement('div');
      eNew.className='tabs_engagement';
      eNew.style.background='#ca5';
      tabs.parentNode.insertBefore (eNew, tabs);
      eNew.id = 'gmTabs';
      eNew.style.whiteSpace='nowrap';
      eNew.style.width='735px';
    }
    eNew.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}


unsafeWindow.pbGotoMap = function (x, y){
  hideMe ();
  setTimeout (function (){ 
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    var a = document.getElementById(&quot;mod_views&quot;).getElementsByTagName(&quot;a&quot;);
    for (var b = 0; b &lt; a.length; b++) {
        a[b].className = &quot;&quot;
    }
    document.getElementById('mod_views_map').className = &quot;sel&quot;;
    document.getElementById(&quot;maparea_city&quot;).style.display = 'none';
    document.getElementById(&quot;maparea_fields&quot;).style.display = 'none';
    document.getElementById(&quot;maparea_map&quot;).style.display = 'block';
    unsafeWindow.tutorialClear()
  }, 0);
};

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
    for (var i=0; i&lt;findReplace.length; i++){
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
  a.className = &quot;button20 ptButton20&quot;;
  var s = document.createElement('span');
  s.innerHTML = label;
  a.appendChild (s);
  return a;
}

function strButton20 (label, tags){
  if (tags == null)
    tags = '';
  return ('&lt;TABLE class=ptNoPad&gt;&lt;TR&gt;&lt;TD&gt;&lt;A class=&quot;button20 ptButton20&quot; '+ tags +'&gt;&lt;SPAN&gt;'+ label +'&lt;/span&gt;&lt;/a&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;' );
}

function reloadKOC (){
  var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+getServerId();
  var t = '&lt;FORM target=&quot;_top&quot; action=&quot;'+ goto +'&quot; method=get&gt;&lt;INPUT id=xxButReload type=submit value=RELOAD&gt;&lt;/form&gt;';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
  return;
}
  
function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('&lt;SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (var k in valNameObj){
    m.push ('&gt;&lt;OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value=&quot;');
    m.push (k);
    m.push ('&quot;&gt;');
    m.push (valNameObj[k]);
    m.push ('&lt;/option&gt;');
  }
  m.push ('&lt;/select&gt;');
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
  document.getElementById (&quot;mod_comm_input&quot;).value = msg;
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
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + &quot;ajax/sendChat.php&quot; + unsafeWindow.g_ajaxsuffix, {
      method: &quot;post&quot;,
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
    logit (label +&quot;: &quot;+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};


function debugPos  (e){
  return '['+ e.tagName +'] client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--&gt; '+ e.offsetParent;
}

function CwaitForElement (id, timeout, notify){
  this.check = check;
  this.end = new Date().getTime() + timeout;
  var t = this;
  this.check();
  function check(){
    if (document.getElementById (id))
      notify (true);
    else if (new Date().getTime() &gt; t.end)
      notify (false);
    else
      setTimeout (t.check, 250);
  }
}

function clickWin (win,obj,evtName) {
	var evt = win.document.createEvent(&quot;MouseEvents&quot;);
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
      for (var i=0; i&lt;cur; i++)
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
      if (e.style &amp;&amp; e.style.display &amp;&amp; e.style.display.indexOf('none')&gt;0)
        m.push (' hidden');
       m.push ('\n');
      if (cur &lt; levels){
        for (var c=0; c&lt;e.childNodes.length; c++){
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
  this.div.style.background = &quot;#fff&quot;;
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'hidden';
  this.div.style.position = &quot;absolute&quot;;
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;
    
  var m = '&lt;TABLE cellspacing=0 width=100% height=100%&gt;&lt;TR id=&quot;'+ prefix +'_bar&quot; class=&quot;'+ topClass +'&quot;&gt;&lt;TD width=99% valign=bottom&gt;&lt;SPAN id=&quot;'+ prefix +'_top&quot;&gt;&lt;/span&gt;&lt;/td&gt;\
      &lt;TD id='+ prefix +'_X align=right valign=middle onmouseover=&quot;this.style.cursor=\'pointer\'&quot; style=&quot;color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px&quot;&gt;X&lt;/td&gt;&lt;/tr&gt;\
      &lt;TR&gt;&lt;TD height=100% valign=top class=&quot;CPopMain '+ prefix +'_CPopMain&quot; colspan=2 id=&quot;'+ prefix +'_main&quot;&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;';
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
      if (me.button==0 &amp;&amp; t.enabled){
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
      if (me.button==0 &amp;&amp; t.moving)
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
      if (t.enabled &amp;&amp; !t.wentOut){
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
        if (newTop &lt; t.bounds.top){     // if out-of-bounds...
          newTop = t.bounds.top;
          _doneMoving(t);
        } else if (newLeft &lt; t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } else if (newLeft &gt; t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } else if (newTop &gt; t.bounds.bot){
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
    logit (&quot;*************** &quot;+ msg +&quot; ****************&quot;);
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
  if(maxLevels &lt; 1)
      return 'Inspect Error: Levels number must be &gt; 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i&lt;level; i++)
    indent += '  ';
  for(property in obj) {
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true &amp;&amp; (type == 'function')){
          str += indent + '(' + type + ') ' + property + &quot;[FUNCTION]\n&quot;;
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +&quot;\n&quot;;
        }
        if((type=='object' || type=='array') &amp;&amp; (obj[property] != null) &amp;&amp; (level+1 &lt; maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
    }
    catch(err) {
      // Is there some properties in obj we can't access? Print it red.
      if(typeof(err) == 'string') msg = err;
      else if(err.message)        msg = err.message;
      else if(err.description)    msg = err.description;
      else                        msg = 'Unknown';
      str += '(Error) ' + property + ': ' + msg +&quot;\n&quot;;
    }
  }
  str += &quot;\n&quot;;
  return str;
}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i &lt; testArr.length; i++) {
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
    else if (v.constructor.toString().indexOf(&quot;Array&quot;)&gt;=0 &amp;&amp; typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}


function tbodyScroller (tbody, maxHeight){  
  tbody.style.maxHeight = '';
  tbody.style.height = '';
  tbody.style.overflowX = 'hidden';
  if (parseInt(tbody.clientHeight) &gt; maxHeight){
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
  x2 = x.length &gt; 1 ? '.' + x[1] : '';
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
    m += '&lt;OPTION value=&quot;'+ k +'&quot;'+ (k==curVal?' SELECTED':'')  +'&gt;'+ a[k] +'&lt;/option&gt;';
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
  while ( (i1=txt.indexOf(find1, last))&gt;=0 &amp;&amp; (i2=txt.indexOf (find2, i1))&gt;=0 ) {
    m.push (txt.substring(i1+find1.length, i2));
    last = i2 + find2.length;
  }
  return m;
}

function strUpTo (s, find){
  var i = s.indexOf(find);
  if (i &gt; 0)
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
  if (time &gt; 86400){
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
  if (t &lt; 61)
    return  t + 's';
  if (t &gt; 86400){
    m.push (parseInt(t/86400)); 
    m.push ('d ');
    t %= 86400;
  }  
  if (t&gt;3600 || time&gt;3600){
    m.push (parseInt(t/3600)); 
    m.push ('h ');
    t %= 3600;
  }  
  m.push (parseInt(t/60)); 
  m.push ('m');
  if (full || time&lt;=3600 ){
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
      if (n &lt; 2)
        return;
      for (i=n-2; i&gt;=0; i--){
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
      t.win.document.body.innerHTML = '&lt;STYLE&gt;pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}&lt;/style&gt;\
        &lt;BODY style=&quot;margin:0px; padding:0px; border:none&quot;&gt;\
        &lt;DIV id=winlogtop style=&quot;background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid&quot;&gt;\
        &lt;INPUT id=wlClear type=submit value=&quot;Clear&quot;&gt; &amp;nbsp; &lt;INPUT id=wlRev type=submit value=&quot;Bottom&quot;&gt;&lt;/div&gt;\
        &lt;DIV id=wlOut style=&quot;overflow-y:auto; height:100%; max-height:100%&quot;&gt;&lt;/div&gt;&lt;/body&gt;';
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
    if (millis&lt;100)
      m.push('0');
    if (millis&lt;10)
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
    s = s.toString().replace ('&lt;', '&amp;lt;', 'g');
    return s.replace ('&gt;', '&amp;gt;', 'g');
  },

};

    
/*********************************** Gifts TAB ***********************************/
function explodeUrlArgs (url){
  var i = url.indexOf ('?');
  var a = url.substr(i+1).split ('&amp;'); 
  var args = {};
  for (i=0; i&lt;a.length; i++){
    var s = a[i].split ('=');
    args[s[0]] = s[1];
  }
  return args;
}


// returns: page text or null on comm error
function GM_AjaxPost (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxPost ('+ label +'): ' + url +'\n'+ inspect (args, 5, 1));
  GM_xmlhttpRequest({
    method: &quot;post&quot;,
    url: url,
    data: implodeUrlArgs(args),
    headers: { &quot;Content-Type&quot;: &quot;application/x-www-form-urlencoded&quot;, 'X-Requested-With': 'XMLHttpRequest', 'X-Prototype-Version': '1.6.1',
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
    method: &quot;get&quot;,
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
      
  
Tabs.Gifts = {
  tabOrder : 3,
  gifts : null,
  myDiv : null,
  doList : [], // list of gifts to accept 
  doServer : 0,
  accepting : false,
    
  init : function (div){
    var t = Tabs.Gifts;
WinLog.enabled = ENABLE_GM_AJAX_TRACE;    
    t.myDiv = div;    
    div.innerHTML = '&lt;TABLE cellpadding=0 cellspacing=0 class=pbTab width=100%&gt;&lt;TR&gt;&lt;TD width=200&gt;&lt;/td&gt;&lt;TD align=center&gt;&lt;INPUT id=&quot;pasubGifts&quot; type=submit value=&quot;Check for Gifts&quot; \&gt;&lt;/td&gt;&lt;TD width=200 align=right&gt;&lt;INPUT id=paGiftHelp type=submit value=HELP&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;HR&gt;\
        &lt;DIV id=giftDiv style=&quot;width:100%; min-height:300px; height:100%&quot;&gt;';
    document.getElementById('pasubGifts').addEventListener ('click', t.e_clickedGifts, false);
    document.getElementById('paGiftHelp').addEventListener ('click', t.helpPop, false);
    if (!Options.giftDomains.valid)
      Options.giftDomains.list[getServerId()] = unsafeWindow.domainName;
  },
  
  show : function (){
  },
  hide : function (){
  },
  
  helpPop : function (){
    var helpText = '&lt;BR&gt;The GIFTS tab helps you accept gifts easier than going through facebook. To use it, first hit the \'Check for Gifts\'\
        button.  This will fetch the facebook gifts page and will list all of the KofC gifts which are available.&lt;BR&gt;&lt;BR&gt;\
        From the list, check all of the gifts that you want to accept or press the \'All\' button to select all of them.  Be sure to select which \
        domain you wish to apply the gifts to. If you want the gifts to be deleted from facebook after accepting them, set the \'delete gifts\'\
        option to \'Always\'. Now, press the \'Accept Gifts\' button to accept the selected gifts.  Note that this process takes some time as there are 4 webpages\
        that are being accessed for each gift!&lt;BR&gt;&lt;BR&gt;\
        NOTES:&lt;UL&gt;&lt;LI&gt;The Facebook gifts page lists up to 100 gifts for &lt;B&gt;all&lt;/b&gt; of your game apps. This means that only some of the KofC\
        gifts which are available will be listed. After accepting gifts, be sure to \'Check for Gifts\' again to see if more show up!&lt;p&gt;\
        &lt;LI&gt;If you choose not to delete gifts after accepting them, they may be available to get again! After the process is complete, just press the\
        \'Check for Gifts\' button again to see what gifts are available.&lt;/ul&gt;';
    var pop = new CPopup ('giftHelp', 0, 0, 500, 400, true);
    pop.centerMe (mainPop.getMainDiv());  
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '&lt;CENTER&gt;&lt;B&gt;Power Bot Help&lt;/b&gt;: Accepting gifts&lt;/center&gt;';
    pop.show (true);
  },
  
      
  e_clickedGifts : function  (){     // (also cancel accepting)
    var t = Tabs.Gifts;
    if (t.accepting){
      document.getElementById('pasubGifts').value = 'Check for Gifts';
      document.getElementById('giftDiv').innerHTML+= '&lt;BR&gt;&lt;SPAN class=boldRed&gt;Cancelled.&lt;/span&gt;';
      t.accepting = false;
      return; 
    }
    document.getElementById('giftDiv').innerHTML = 'Fetching Facebook gifts page ...';
    
    t.fetchGiftsPage (gotGiftsPage);
    function gotGiftsPage(rslt){
      if (rslt.errMsg){
        document.getElementById('giftDiv').innerHTML += rslt.errMsg;
        return;
      } 
      t.gifts = rslt;
      if (!Options.giftDomains.valid &amp;&amp; t.gifts.length&gt;0){
        t.ajaxGetGiftData (t.gifts[0], listGifts, function (){});    // try to get domain list ... don't delete gift!
        return;
      }
      listGifts();
    }
    
    function listGifts (){
//logit (&quot;LIST GIFTS&quot;); 
//logit (inspect (t.gifts, 8, 1));     
      var m = '&lt;DIV class=ptstat&gt;&lt;CENTER&gt;KofC gifts &amp;nbsp; &amp;nbsp; &amp;nbsp; ('+ t.gifts.length +' found)&lt;/center&gt;&lt;/div&gt;';
      if (t.gifts.length&lt;1){
        document.getElementById('giftDiv').innerHTML = m + '&lt;BR&gt;&lt;BR&gt;&lt;CENTER&gt;No gifts found!&lt;/center&gt;';
        return;
      }
      m += '&lt;TABLE class=pbTab align=center&gt;&lt;TR&gt;&lt;TD align=right&gt;Server to apply gifts to: &lt;/td&gt;&lt;TD&gt;'
        + htmlSelector (Options.giftDomains.list, getServerId(), 'id=pbGiftServers') +'&lt;/td&gt;&lt;/tr&gt;\
          &lt;TR&gt;&lt;TD align=right&gt;Delete gifts after accepting&lt;/td&gt;&lt;TD&gt;'
        + htmlSelector ({y:'Always', e:'Only if Error', n:'Never'}, Options.giftDelete, 'id=pbGiftDel')
        + '&lt;/td&gt;&lt;/tr&gt;&lt;TR&gt;&lt;TD&gt;Select gifts you want to accept and hit: &lt;/td&gt;&lt;TD width=250&gt;&lt;INPUT type=submit id=pbGiftDo value=&quot;Accept Gifts&quot;&gt;\
        &amp;nbsp; &lt;SPAN id=pbGiftNone class=boldRed&gt;&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;HR&gt;&lt;TABLE class=pbTab&gt;&lt;TR valign=top&gt;&lt;TD&gt;\
        &lt;INPUT id=pbGiftButAll type=submit value=&quot;All&quot; style=&quot;width:100%; margin-bottom:5px&quot;&gt;&lt;BR&gt;&lt;INPUT id=pbGiftButNone type=submit value=&quot;None&quot;&gt;&lt;/td&gt;\
        &lt;TD width=10&gt;&lt;/td&gt;&lt;TD&gt;&lt;TABLE align=center cellpadding=0 cellspacing=0 class=pbTabLined&gt;\
        &lt;TBODY id=pbGiftTbody&gt;\
        &lt;TR style=&quot;font-weight:bold; background:white&quot;&gt;&lt;TD&gt;Gift&lt;/td&gt;&lt;TD&gt;Date&lt;/td&gt;&lt;TD&gt;From (server)&lt;/td&gt;&lt;TD width=20&gt;&lt;/td&gt;&lt;/tr&gt;';
      t.gifts.sort (function (a,b){  // sort by gift name, date
          var x = a.gift.localeCompare (b.gift);
          if (x != 0)
            return x;
          return a.args.da.localeCompare(b.args.da);
          });
      for (var i=0; i&lt;t.gifts.length; i++){
        var giftName = t.gifts[i].gift;
        if (t.gifts[i].args.si == 9)
          giftName += ' (Daily)';
        var date = t.gifts[i].args.da.substr(0,4) +'-'+ t.gifts[i].args.da.substr(4,2) +'-'+ t.gifts[i].args.da.substr(6,2);
        m += '&lt;TR&gt;&lt;TD&gt;&lt;INPUT type=checkbox id=pbgchk_'+ i +'&gt; &amp;nbsp;'+ giftName +'&lt;/td&gt;&lt;TD&gt;'+ date +'&lt;/td&gt;\
              &lt;TD&gt;'+ t.gifts[i].giver +' ('+ t.gifts[i].args.exs +')&lt;/td&gt;&lt;/tr&gt;';
      }
      document.getElementById('giftDiv').innerHTML = m + '&lt;/tbody&gt;&lt;/table&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;';
      document.getElementById('pbGiftDo').addEventListener ('click', t.getErDone, false);
      document.getElementById('pbGiftButAll').addEventListener ('click', t.e_butAll, false);
      document.getElementById('pbGiftButNone').addEventListener ('click', t.e_butNone, false);
      var tbody = document.getElementById('pbGiftTbody');
      tbodyScroller (tbody, getRemainingHeight (tbody, mainPop.div));
    }
  },

  e_butAll : function (){
    var t = Tabs.Gifts;
    for (var i=0; i&lt;t.gifts.length; i++)
      document.getElementById('pbgchk_'+i).checked = true;
  },
  
  e_butNone : function (){
    var t = Tabs.Gifts;
    for (var i=0; i&lt;t.gifts.length; i++)
      document.getElementById('pbgchk_'+i).checked = false;
  },
  
  getErDone : function (){ 
    var t = Tabs.Gifts;
    t.doList = [];
    document.getElementById('pbGiftNone').innerHTML = '';
    Options.giftDelete = document.getElementById('pbGiftDel').value;
    for (var i=0; i&lt;t.gifts.length; i++){
      if (document.getElementById('pbgchk_'+i).checked)
        t.doList.push (t.gifts[i]); 
    }
    if (t.doList.length==0){
      document.getElementById('pbGiftNone').innerHTML = 'None Selected!';
      return;
    }
    t.doServer = document.getElementById('pbGiftServers').value;
    t.accepting = true;
    document.getElementById('pasubGifts').value = 'Stop Accepting'; 
    document.getElementById('giftDiv').innerHTML = '&lt;DIV id=acpDiv style=&quot;height:400px; max-height:400px; overflow-y:auto&quot;&gt;&lt;B&gt;Accepting '+ t.doList.length +' gifts:&lt;/b&gt;&lt;BR&gt;&lt;/div&gt;';    
    t.acceptNext ();
  },

    
  allDone : function (msg){
    var t = Tabs.Gifts;
    document.getElementById('acpDiv').innerHTML += '&lt;BR&gt;&lt;BR&gt;' + msg;
    document.getElementById('pasubGifts').value = 'Check for Gifts';
    t.accepting = false;
  },
  
    
  acceptNext : function (){
    var t = Tabs.Gifts;
    var gift = t.doList.shift();
    if (gift == null){
      t.allDone ('Done accepting gifts.'); 
      return;
    }
    var acpDiv = document.getElementById('acpDiv');
    var curDiv = document.createElement ('div');
    acpDiv.appendChild (curDiv);
    curDiv.innerHTML = '&lt;B&gt;'+ gift.gift +'&lt;/b&gt; from '+ gift.giver +' on '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2) +': ';    
    var statSpan = document.createElement ('span');
    curDiv.appendChild (statSpan);
    statSpan.innerHTML = 'Getting data ';
    t.ajaxGetGiftData (gift, gotGiftData, progress);
    
    function progress (m){
      if (t.accepting)
        statSpan.innerHTML += ' '+m;
    }
        
    function gotGiftData (rslt){
//logit (&quot;getErDone.gotGiftData ... \n&quot;+ inspect (gift, 8, 1)); 
      if (!t.accepting)
        return;
      if (rslt.ok){
        statSpan.innerHTML += ' &amp;nbsp; Accepting .';
        t.ajaxAcceptGift (gift, t.doServer, doneAccepting);
        return;
      }
        
      if (rslt.feedback)
        msg = '&lt;B&gt;'+ rslt.feedback + '&lt;/b&gt;';
      else 
        msg = '&lt;SPAN class=boldRed&gt;ERROR: '+ rslt.ajaxErr +'&lt;/span&gt;';
      if (rslt.del &amp;&amp; Options.giftDelete!='n'){
        t.deleteGift (gift);  
        msg += ' Gift Deleted.';
      }
      curDiv.removeChild (statSpan);
      curDiv = document.createElement ('div');
      curDiv.className = 'indent25';
      acpDiv.appendChild (curDiv);
      curDiv.innerHTML = msg;
      t.acceptNext ();  
    }
    
    function doneAccepting (rslt){
      if (!t.accepting)
        return;
      var msg = 'OK.';
      if (rslt.ok)
        actionLog ('Accepted Gift:  '+ gift.gift +' from '+ gift.giver +' on '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2)     );
      else
        msg = '&lt;SPAN class=boldRed&gt;'+ rslt.msg +'&lt;/span&gt;';
      statSpan.innerHTML = msg;
      if (Options.giftDelete=='y'){
        statSpan.innerHTML += ' &amp;nbsp; Deleted.';
        t.deleteGift (gift);      
      }
      t.acceptNext ();  
    }
  },

    

  ajaxAcceptGift : function (gift, serverId, notify){
    var url;
    var pargs = {};
        
    if (gift.dat.ver == 1){
      url = gift.dat.url;
      pargs.giftId = gift.dat.giftId;
      pargs.hasExistingServer = 1;
      pargs.serverid = serverId;
      pargs.go = 'Next';
      GM_AjaxPost (url, pargs, ver1GotPost, 'Accept'); 
    } else {
      var i = gift.dat.url.indexOf('src/');
      url = gift.dat.url.substr(0,i) +'src/ajax/claimgift.php?wcfbuid='+ gift.dat.wcfbuid;        
      pargs = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      pargs.fb_sig_ext_perms = unescape(pargs.fb_sig_ext_perms);
      pargs.ver = '2';
      pargs.selectedS = serverId;
      pargs.giftinviteid = gift.dat.giftId;
      GM_AjaxPost (url, pargs, ver2GotPost, 'Accept'); 
     }
     
//  parse multiple reply formats .....         
    function ver1GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:&quot;AJAX Error&quot;}); 
        return;
      }
      var m = /&lt;div class=\'nm\'&gt;(.*?)&lt;\/div/im.exec(rslt);
      if (m)
        notify ({ok:false, msg: 'Got '+ m[1]}); 
      else
        notify ({ok:true, msg:'OK'});
    }
    function ver2GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:&quot;AJAX Error&quot;}); 
        return;
      } 
      rslt = eval ('('+ rslt +')');
      if (rslt.ok)
        rslt.msg = 'OK';
      notify (rslt);
    }
  },

      
  deleteGift : function (gift){
    var pargs = {};
//logit (&quot;DELETING GIFT!&quot;);    
    for (var i=0; i&lt;gift.inputs.length; i++){
//      if (gift.inputs[i].name != 'actions[reject]')
        pargs[gift.inputs[i].name] = gift.inputs[i].value;
    }
    GM_AjaxPost ('http://www.facebook.com/ajax/reqs.php?__a=1', pargs, gotAjaxPost, 'Delete');
    function gotAjaxPost (p){
    }
  },

    
// get 3 pages ... facebook convert page, facebook claim page and first KofC page (for gift ID) ...
// adds: dat.url, dat.giftId and dat.ver to gift object (if available)
// notify: {ok:true/false,  feedback:,  ajaxErr:  }    
  ajaxGetGiftData : function (gift, notify, progress, DELETE){
    var t = Tabs.Gifts;
    gift.dat = {};

    GM_AjaxGet (gift.submit, null, got1, 'Page 1');        
        
    function got1 (page){
// sample URL: http://apps.facebook.com/kingdomsofcamelot/?page=claimdailygift&amp;gid=361&amp;sid=4411654&amp;s=88&amp;in=4411654&amp;si=9      
// sample result: .... window.location.replace(&quot;http:\/\/apps.facebook.com\/kingdomsofcamelot\/?page=claimgift&amp;gid=1045&amp;sid=1432568&amp;s=250&amp;in=1432568&amp;si=5&quot;); ...
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 1'});
      progress ('1');
      var m = /window.location.replace\(\&quot;(.*?)\&quot;/im.exec (page);
      if (m == null)
        notify ({ajaxErr:'PARSE Error - page 1'});
      var url = m[1].replace ('\\/', '/', 'g');
      GM_AjaxGet (url, '', got2, 'Page 2');        
    }
    
// sample URL: http://www88.kingdomsofcamelot.com/fb/e2/src/claimDailyGift_src.php?sid=4411654&amp;gid=361&amp;standalone=0&amp;res=1&amp;iframe=1&amp;wcfbuid=1400526627&amp;fbml_sessionkey=2.wdwjP4blBLkO2wXAFqDglg__.3600.1293681600-1400526627&amp;lang=en&amp;in=4411654&amp;si=9&amp;ts=1293677199.881&amp;page=claimdailygift&amp;gid=361&amp;sid=4411654&amp;s=88&amp;in=4411654&amp;si=9&amp;appBar=&amp;kabamuid=114014&amp;tpuid=alYJXw-Us9z9qjRn3DHChEtsFvo&amp;fb_sig_in_iframe=1&amp;fb_sig_base_domain=kingdomsofcamelot.com&amp;fb_sig_locale=en_GB&amp;fb_sig_in_new_facebook=1&amp;fb_sig_time=1293677199.924&amp;fb_sig_added=1&amp;fb_sig_profile_update_time=1267240352&amp;fb_sig_expires=1293681600&amp;fb_sig_user=1400526627&amp;fb_sig_session_key=2.wdwjP4blBLkO2wXAFqDglg__.3600.1293681600-1400526627&amp;fb_sig_ss=7wEsU_e0FLqhrGxE1LAZDg__&amp;fb_sig_cookie_sig=514b59deb303becb5c5c654c9d457732&amp;fb_sig_ext_perms=email%2Cuser_birthday%2Cuser_religion_politics%2Cuser_relationships%2Cuser_relationship_details%2Cuser_hometown%2Cuser_location%2Cuser_likes%2Cuser_activities%2Cuser_interests%2Cuser_education_history%2Cuser_work_history%2Cuser_online_presence%2Cuser_website%2Cuser_groups%2Cuser_events%2Cuser_photos%2Cuser_videos%2Cuser_photo_video_tags%2Cuser_notes%2Cuser_about_me%2Cuser_status%2Cfriends_birthday%2Cfriends_religion_politics%2Cfriends_relationships%2Cfriends_relationship_details%2Cfriends_hometown%2Cfriends_location%2Cfriends_likes%2Cfriends_activities%2Cfriends_interests%2Cfriends_education_history%2Cfriends_work_history%2Cfriends_online_presence%2Cfriends_website%2Cfriends_groups%2Cfriends_events%2Cfriends_photos%2Cfriends_videos%2Cfriends_photo_video_tags%2Cfriends_notes%2Cfriends_about_me%2Cfriends_status&amp;fb_sig_country=us&amp;fb_sig_api_key=0ab5e11ff842ddbdbf51ed7938650b3f&amp;fb_sig_app_id=130402594779&amp;fb_sig=fca33813d9e1c9d411f0ddd04cf5d014
    function got2 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 2'});
      progress ('2');
      var m = page.match (/&lt;iframe.*?src=\&quot;(.*?)\&quot;/im);
      if (m == null)
        notify ({ajaxErr:'PARSE Error - page 2'});
      var url = m[1].replace ('&amp;amp;', '&amp;', 'g');
      gift.dat.url = url;
      GM_AjaxGet (url, '', got3, 'Page 3');        
    }
    
    function got3 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 3'});
      progress ('3');
      var m = /&lt;div class=\'giftreturned\'&gt;(.*?)&lt;\/div/im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true}); 
        return;
      }
      var m = /(We were unable to find your gift.*?)&lt;/im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true}); 
        return;
      }
      var m = /(Unable to get the list of your friends.*?)&lt;/im.exec(page);
      if (m != null){
        notify ({feedback:m[1]}); 
        return;
      }
      var m = /(Facebook says you are not friends.*?)&lt;/im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true}); 
        return;
      }
            
      var regexp = /&lt;option value='(.*?)'.*?&gt;(.*?)&lt;/img ;
      var m;
      while ( (m = regexp.exec (page)) != null){
        if (m[1] != 'noserver')
          Options.giftDomains.list[m[1]] = m[2];  
      }
      Options.giftDomains.valid = true;
      if (page.indexOf('ver:2') &gt;= 0){
        m = /giftinviteid:(.*?),/im.exec(page);
        if (m == null)
          notify ({ajaxErr:'PARSE Error (ver:2, giftinviteid not found) - page 3'});
        gift.dat.giftId = m[1];
        gift.dat.ver = 2;
/** for KofC change 20110119
        m = /wcfbuid=([0-9]*)/im.exec(page);
        if (m == null){
          notify ({ajaxErr:'PARSE Error (ver:2, wcfbuid not found) - page 3'});
          return;
        }
        gift.dat.wcfbuid = m[1];
**/        
      } else {
        m = /name='giftId' value='(.*?)'/im.exec(page);
        if (m == null){
          notify ({ajaxErr:'PARSE Error (ver:1, giftId not found) - page 3'});
          return;
        }
        gift.dat.giftId = m[1];
        gift.dat.ver = 1;
      }
      notify ({ok:true});
    }
  },

  
  // notify with gifts[] or: {errMsg:xxx}
  fetchGiftsPage : function (notify){
    GM_AjaxGet ('http://www.facebook.com/games?ap=1', '', parseGiftsPage, 'FB Gifts Page');
    
    // ...profile.php?id=100000710937192&quot;&gt;Anestis Mallos&lt;/
    // Here is a GIFTNAME you can use 
    // OR:  ... would like to give you a gift of GIFTNAME in Kingdoms of Camelot
    // OR:  ... would like to give you a GIFTNAME in Kingdoms of Camelot
    // &lt;input value=\&quot;Accept\&quot; type=\&quot;submit\&quot; name=\&quot;actions[http:\/\/apps.facebook.com\/kingdomsofcamelot\/convert.php?pl=1&amp;in=4411654&amp;ty=1&amp;si=9&amp;wccc=fcf-inv-9&amp;ln=11&amp;da=20101229&amp;ex=gid%3A361%7Csid%3A4411654%7Cs%3A88]\&quot; \/&gt;&lt;\/label&gt;
    function parseGiftsPage  (p){
      if (p == null)
        notify ({errrMsg:'Ajax Comm Error'});
      p = p.replace ('\\u003c', '&lt;', 'g');    
      var t = Tabs.Gifts;
      var gifts = [];
      try {    
        var m = p.split ('&lt;form');  
        for (var i=0; i&lt;m.length; i++){
          if ( m[i].indexOf('kingdomsofcamelot')&lt;0)
            continue;
          var mm = m[i].match( /facebook.com\\\/.*\&quot;&gt;(.*?)&lt;\\\/a&gt;&lt;\\\/strong&gt;.*?(?:give you a (?:gift of|)(.*?) in |here is a(.*?)you can use)/im );
          if (mm==null)
            continue;
          var giver = mm[1];
          if (mm[2])
            var gift = mm[2].trim();
          else
            var gift = mm[3].trim();
            
          // get all inputs ...  (name, value, type)          
          var inps = [];
          var args = {};  
          var inpsub = null;            
          var ins = m[i].match (/&lt;input.*?&gt;/igm);
          for (var ii=0; ii&lt;ins.length; ii++){
            var it = {};
            mm = /value=\\\&quot;(.*?)\\\&quot;/im.exec(ins[ii]);  
            it.value = mm[1];
            mm = /name=\\\&quot;(.*?)\\\&quot;/im.exec(ins[ii]);  
            it.name = mm[1];
            mm = /type=\\\&quot;(.*?)\\\&quot;/im.exec(ins[ii]);  
            it.type = mm[1];
            if (it.type=='submit' &amp;&amp; it.name!='actions[reject]'){
              it.name = eval ('&quot;'+ it.name +'&quot;');          
              mm = /actions\[(.*?)\]/im.exec(it.name);
              inpsub = mm[1].replace('\\/', '/', 'g');
              inpsub = inpsub.replace('&amp;amp;', '&amp;', 'g');
              var a = inpsub.split ('&amp;');
              for (var iii=0; iii&lt;a.length; iii++){
                var aa = a[iii].split ('=');
                if (aa[0]=='da' || aa[0]=='si'){
                  args[aa[0]] = unescape(aa[1]);
                } else if (aa[0] == 'ex') {
                  var s = unescape(aa[1]).split ('|');
                  for (var iiii=0; iiii&lt;s.length; iiii++){
                    var ss = s[iiii].split(':');
                    if (ss[0] == 's')
                      args.exs = ss[1];
                  }
                } 
              }
            } else {
              inps.push (it); 
            }
          }
          if (args.da)
            gifts.push ({giver:giver, gift:gift, args:args, submit:inpsub, inputs:inps});
        } 
        notify (gifts);
      } catch (e) {
        notify ({errMsg:&quot;Error parsing Facebook gift page&quot;+ e});
      }
    }
  },

}</pre>

</div>
<div class='clear'></div>
<div id='root_footer'></div>
</div>
</div>
<div id='footer'>
<div id='footer-content'>
<div class='col la'>
<p>
<strong class='disclaim'>
Because it's your web
|
<a href='/about/donating'>Donate</a>
</strong>
</p>
</div>
<div class='col ra'>
<p class='credit'>
Powered by
<a href="http://overstimulate.com">overstimulate</a>
with the help of many
<a href="/users/contributers" rel="nofollow">friends</a>
</p>
<p id='policies'>
Policy &amp; Guidelines:
<a href="/about/dmca" rel="nofollow">DMCA</a>
<a href="/about/privacy" rel="nofollow">Privacy Policy</a>
</p>
</div>
</div>
</div>
<script src="http://static.userscripts.org/javascripts/bottom.js?1294452389" type="text/javascript"></script>
<script src="http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
<script type="text/javascript"> _uacct = "UA-50927-4"; urchinTracker(); </script>
<script type="text/javascript"> _qoptions={ qacct:"p-6eWjYgYdo7Su6" }; </script>
<script type="text/javascript" src="http://edge.quantserve.com/quant.js"></script>
<noscript><img src="http://pixel.quantserve.com/pixel/p-6eWjYgYdo7Su6.gif" style="display: none;" border="0" height="1" width="1" alt="Quantcast"/></noscript>
<script type="text/javascript">
  var a2a_onclick = 1;
  var a2a_linkname = "KOC Power Bot";
  var a2a_linkurl = "http://userscripts.org/scripts/show/95542";
</script>
<script type="text/javascript" src="http://static.addtoany.com/menu/page.js"></script>


<script src='http://www.google.com/coop/cse/brand?form=cref_iframe' type='text/javascript'></script>
<!--[if IE 6]>
<script type="text/javascript">
var __noconflict = true;
var IE6UPDATE_OPTIONS = {
icons_path: "/ie6update/images/",
url: 'http://www.spreadfirefox.com/?q=affiliates&id=208179&t=1'
}
</script>
<script type="text/javascript" src="/ie6update/ie6update.js"></script>
<![endif]-->
</body>
</html>
