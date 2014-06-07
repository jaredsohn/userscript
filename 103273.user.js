// ==UserScript==
// @name           LL1
// @version        0.0.1.7
// @namespace      VVV
// @description    GOR KONTROLL auf einem überblick!
// @include        http://apps.facebook.com/gloryofrome/*
// @resource 	   URL_CASTLE_BUT 		http://i.imgur.com/MPlZr.png
// @resource 	   URL_CASTLE_BUT_SEL 		http://i.imgur.com/XWR4B.png
// @include        http://*.gloryofrome.com/*main_src.php*
// @include        http://*.gloryofrome.com/*gameChrome_src.php*
// @include        http://www.gloryofrome.com/iframeCanvas.php*
// ==/UserScript==

var Version = '0.0.1.7';
var miseajour="Version "+Version +" VVV KONTROLL";

var DISABLE_BULKADD_LIST = false;
var DEBUG_TRACE = true;

var URL_CASTLE_BUT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAMAAAGkBsQ5AAABa1BMVEX%2F%2F8X%2F98X%2F973%2F97X%2F77X%2F7633773%2F76X377X3763%2F5q3%2F5qX%2F5pz35q335qX%2F3pz%2F3pT33pz%2F1pT%2F1oz%2F1oT31pT31oz%2FzoT%2Fznv3zoT%2FxXv%2FxXP%2FxWv3xXv3xXP%2FvWv%2FvWP3vWv3vWP%2FtWP%2FtVr%2FtVLmvWv3tWP3tVr3tVL%2FrVL%2FrUrmtWP3rVL3rUrvrVL%2FpUrvrUr%2FpULmrVrmrVL3pUr3pULmpUL3nDrepULWpVLWpUrmnDrFpUK1pVrOnDqcnFKcnEqMnEp7lHN7lGtzlGNrlGtjjEpajFpShFJSe2NChEJKe1o6hDohjDFCc1oZjDEhhDEQjDEAlDEpezoZhDEhezoQhDEAjDEpczoZezoIhDEhc0IhczoAhDEZczoIezEhazoAezEhY0IAczEAcykIazEhWkIAazEAaykIYzEhUkIAYzEAWjEAUjEAUikASjEASikAQjEAQikAOjEAOikAMTEAMSkAKSlOGAcLAAAACXBIWXMAAAsSAAALEgHS3X78AAABVklEQVQYGQXBPW4TYRiF0ee%2B3x2DRSxRIFJTGIkVUFDQIbEDlkE5%2B8kWWEKKIBSB5AohXBGUSAaCIdgz3x%2FnaARztjS3RSPodPkmfuzReLbOh1fm72a4h3kxyWgE8NXPz8%2F%2FhC%2FzRXLM3cmeqvGDl7Mfa9ztT9pvp3%2FDOpjOr7Yft9PXjPHxE%2Bl6p4SJqSq5RsL4EAtZaUAjAABoBADAt%2Fty8ovVnhQ%2Bfx%2BbDTfXQ9Bz5H7IdWGV9k588NJWrQiXjMkdly6Fo9beRap29F4QJBxTE%2Bo9bF7XuUpJsp8BAGjcATSgADOQWRsfLu8WT0%2B33wcePknfJj%2B6j3Hb17m5HQsr1%2Fm4aGBEbtp8uXPWzcSBlhYYXKunObLoOyU1jFH02oVRZNFJQ2CCko26MIrC3MAEpRdcSVkYFYzBuaAuQFFAgzFBK0GVZhYoaUYYVm8b0IAGNDr8B8ZXpEbZNGQ6AAAAAElFTkSuQmCC";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXAgMAAAHuttyYAAAACVBMVEX%2F%2F%2F8AOjEAKSnbo5E5AAAACXBIWXMAAAsSAAALEgHS3X78AAAAW0lEQVQI12NYwdAAhCsYOICwQQGEpiYwrGpgCHRgcIChUAeGqaERDBMZJRgmMCDwqlUrgHgBQ2hoAIMjiwAYOzBgxyA1ILVTQ4GggWEKK4MIK4JiYGAgiYKYAgBFlyWR9CCfyAAAAABJRU5ErkJggg%3D%3D";

var Options = {
  ptWinIsOpen  : false,
  ptWinDrag    : true,
  enableFoodWarnTchat: false,
  pbGoldEnable : false,
  foodWarnHours : 24,
  pbChatOnRight: false,
  pbWideMap    : false,
  pbGoldHappy  : 90,
  pbRessTime:   15,
  pbRessEnable:false,
  ptWinPos     : {},
  HelpRequest: true,
  DeleteRequest: false,
  alertConfig  : {
  	aChat:true,
  },
  towerMarches : {},
};


var GlobalOptions = {
  pbWatchdog   : true,
  pbWideScreen : true,
};


var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON; 


var my = {};
var Cities = {};
var currentName = 'Overview';
var Seed = unsafeWindow;
var currentPage ='';

var mainPop;
var Tabs = [
  ['Overview', 'Überblick'],
  ['AllianceList', 'Spieler'],
  ['build', 'Bau'],
  ['Options' , 'Einstellung'],
  ['Train4x' , 'Bilde Aus'],
  ['TranspAuto', 'Transport'],
 // ['Reassign', 'Verstärkung'],
  ['Hud', 'Berichte'],
  ['Crests', 'S.Info']
];

var ptStartupTimer = null;

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


if (document.URL.search(/apps.facebook.com\/gloryofrome/i) >= 0){
  facebookInstance ();
  return;
}

function setWide (){
    var iFrame = null;
    var e = document.body;
    
    if(e){
	for (var c=0; c<e.childNodes.length; c++){
		  if (e.childNodes[c].tagName=='DIV') {
		     if (e.childNodes[c].firstChild.tagName == 'IFRAME'){
		      iFrame = e.childNodes[c].firstChild; 
		      break;
		     }
			
		  }
		}
	}   
    iFrame.style.width = '100%';
    
}

setTimeout (setWide, 1000);

/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
  function setWide (){
    var iFrame = null;
    var e = document.getElementById('app_content_140956165916773');
  	if(e){
		e = e.firstChild.firstChild;
		for (var c=0; c<e.childNodes.length; c++){
		  if (e.childNodes[c].tagName=='SPAN' && e.childNodes[c].firstChild.className == 'canvas_iframe_util'){
			iFrame = e.childNodes[c].firstChild; 
			break;
		  }
		}
	}
    if (!iFrame){
      var iframes = document.getElementsByTagName('iframe');
      for (var i=0; i<iframes.length; i++){
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
      document.getElementById('rightCol').parentNode.removeChild(document.getElementById('rightCol'));
      document.getElementById('leftColContainer').parentNode.removeChild(document.getElementById('leftColContainer'));
      document.getElementById('sidebar_ads').parentNode.removeChild(document.getElementById('sidebar_ads'));
      document.getElementById('canvas_nav_content').parentNode.removeChild(document.getElementById('canvas_nav_content'));
    } catch (e){
      // toolkit may have removed them already!
    }

  var e = document.getElementById('mainContainer');
 	if(e){
 		document.getElementById('content').style.minWidth = '1220px';
 		for(i=0; i<e.childNodes.length; i++){
 			if(e.childNodes[i].id == 'contentCol'){
 				e.childNodes[i].style.width = '100%';
 				e.childNodes[i].style.margin = '0px';
 				e.childNodes[i].style.paddingTop = '5px';
 				e.childNodes[i].childNodes[1].style.width = '99%';
 				break;
 			}
 		}
 	}
 	var e = document.getElementById('globalContainer');
 	if(e){
 		e.style.width = '100%';
 		if(e.firstChild){
 			e.firstChild.style.width = '80%';
 			e.firstChild.style.margin = '0 10%';
 		}
 	}
 	var e = document.getElementById('bottomContent');
 	if(e){
 		e.style.padding = "0px 0px 12px 0px";
 	}
 	var e = document.getElementById('contentArea');
 	if(e){
 		e.style.width = '100%';
 		for(i=0; i<e.childNodes.length; i++){
 			if(e.childNodes[i].tagName == 'div'){
 				e.childNodes[i].style.width = '100%';
 				e.childNodes[i].firstChild.style.width = '100%';
 				break;
 			}
 		}
 	}
 	iFrame.style.width = '100%';

     var div = searchDOM (document.getElementById('content'), 'node.tagName=="DIV" && node.className=="UIStandardFrame_Content"', 7);
     if (div){
 		div.style.width ='100%';
 	}
     var div = searchDOM (document.getElementById('content'), 'node.tagName=="DIV" && node.className.indexOf("SidebarAds")>=0', 7);
     if (div){
 		div.style.display ='none';
 	}
     
    
     
     }

   setWide();
}



var WideScreen = {
  chatIsRight : false,
  useWideMap : false,
  rail : null,
  
  init : function (){
    t = WideScreen;
    if (GlobalOptions.pbWideScreen){
      t.rail = searchDOM (document.getElementById('mod_maparea'), 'node.className=="maparea_rrail"', 10);
      GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important}');

      try {
        document.getElementById('mainCrossBar').parentNode.removeChild(document.getElementById('mainCrossBar'));
        document.getElementById('crossPromoBarContainer').parentNode.removeChild(document.getElementById('crossPromoBarContainer'));
      } catch (e) {
      }
    }
  },    
  setChatOnRight : function (tf){
    t = WideScreen;
    if (tf == t.chatIsRight)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom');
       if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1200); 
    
    
      document.getElementById("comm_tabs").style.left = '761px';
      document.getElementById("comm_tabs").style.top = '-590px';
      document.getElementById("comm_tabs").style.backgroundColor="#60533E";
      var div = searchDOM (document.getElementById('kocmain_bottom'), 'node.tagName=="DIV" && node.className.indexOf("comm_body comm_global")>=0', 7);
      if (div){
        //alert('troue!!');
          div.style.left = '761px';
	  div.style.top = '-565px';
	  div.style.height= '700px';
          div.style.backgroundColor="#60533E";
      
      var div1 = searchDOM (div, 'node.tagName=="DIV" && node.className.indexOf("chat-wrapper")>=0', 7);
      if (div1){
         div1.style.height='700px';
      }
      }
      document.getElementById("mod_comm_list1").style.height= '650px';
      document.getElementById("mod_comm_list2").style.height= '650px';
    } else {
      document.getElementById("comm_tabs").style.left = '';
      document.getElementById("comm_tabs").style.top = '';
         document.getElementById("comm_tabs").style.backgroundColor="";
         var div = searchDOM (document.getElementById('kocmain_bottom'), 'node.tagName=="DIV" && node.className.indexOf("comm_body comm_global")>=0', 7);
         if (div){
          div.style.left = '';
   	  div.style.top = '';
          div.style.backgroundColor="";
          var div1 = searchDOM (div, 'node.tagName=="DIV" && node.className.indexOf("chat-wrapper")>=0', 7);
	   if (div1){
	     div1.style.height= '';
          }
      }
      document.getElementById("mod_comm_list1").style.height= '100%';
      document.getElementById("mod_comm_list2").style.height= '100%';
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



function ptStartup() {

  readOptions();
  
  var Seed = unsafeWindow;
  
 var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    ptStartupTimer = setTimeout (ptStartup, 1000);
    return;
  }
  
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .hostile td { background:crimson; }.friendly td{background:lightblue; }.ally td{background:royalblue; }\
    .Hostile td { background:crimson; }.Friendly td{background:lightblue; }.Ally td{background:royalblue; }\
    .neutral td { background:lightgreen; }.unaligned td { background:gold; }\
    .Neutral td { background:lightgreen; }.Unaligned td { background:gold; }\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    div.ptDiv {background-color:#f0f0f0;}\
    table.ptTab tr td {border:none; background:none; white-space:nowrap;}\
    table.ptTabPad tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none;}\
    table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptTabOverview tr td {border:1px none none solid none; white-space:nowrap; padding: 1px 2px;  font-size:12px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .ptOddrow {background-color:#eee}\
    .ptstat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .ptStatLight {color:#ddd}\
    .ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {border-size:3px; border-color:#000;}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    .ptChatWhisper {}\
    .ptChatAttack {color: #000; font-weight:bold; background-color: #FF7D7D; }\
    .ptChatAlliance {}\
    .ptChatGlobal {background-color: #fdd}\
    .ptChatIcon {border: 2px inset blue}\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    span.boldDarkRed {color:#600; font-weight:bold}\
    a.ptButton20 {color:#ffff80}\
   .matTab {}\
   .matTabNotSel { padding:0 0 0 20px;  color : #2F230E; font: bold 11px Georgia; white-space: nowrap; cursur:pointer; padding:0 0px 0 0;height: 17px; }\
   .matTabNotSel span { background: url("http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/nav/tab_unselected.png") no-repeat scroll left 0 transparent;    display: inline-block;    height: 16px;    padding: 1px 2px 0 7px;    text-decoration: none;   }\
   .matTabSel { color : #2F230E; font: bold 11px Georgia; white-space: nowrap; cursur:pointer; padding:0 0px 0 0;height: 17px;   }\
   .matTabSel span { background: url("http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/nav/tab_selected.png") no-repeat scroll left top transparent; display: inline-block;    height: 16px;    padding: 1px 2px 0 7px;    text-decoration: none;   }\
   tr.CPopupTop td { background-color:#dde; border:none; height: 15px;  padding:0px; }\
   .BOptretry_top { background-color:#a00; color:#fff; border:none; height: 21px; padding:0px; }\
   input.ptButCancel {background-color:#a00; font-weight:bold; color:#fff}\
    .id2_CPopupTop td { background-color:#ffffff;}\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:3px;}\
    .CPopup .id2_CPopMain { background-color:#8ff; }\
    .CPopup  { border:3px ridge #666 }\
    .idp2_CPopup { opacity:0.9; }';
  

  setCities();


   
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y+c.height;
    saveOptions ();
  }
 GM_addStyle (styles); 
 
  mainPop = new CPopup ('idp', Options.ptWinPos.x, Options.ptWinPos.y, 665,600, true, 
      function (){
        my[currentName].hide();
        Options.ptWinIsOpen=false; 
        saveOptions()
      });
    
   
  var mainDiv = mainPop.getMainDiv();
  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  mainPop.getTopDiv().innerHTML = '<TABLE cellspacing=0 width=100%><TR class=CPopupTop valign=bottom><TD><SPAN id=idTabs></span></td><TD align=right>'+ Version +'&nbsp;</td></tr></table>';

  var eTabs = document.getElementById('idTabs');
  for (k=0; k<Tabs.length; k++){
    var a=document.createElement('a');
    a.className='matTabNotSel';
    a.id = 'aa'+ Tabs[k][0];
    a.innerHTML='<span id="sp'+ Tabs[k][0] +'" class="matTab">'+ Tabs[k][1] +'</span>';
    eTabs.appendChild(a);
    a.addEventListener('click', clickedTab, false);
    my[Tabs[k][0]].init();
    cont = my[Tabs[k][0]].getContent();
    cont.style.display = 'none';
    mainDiv.appendChild(cont);
  }

  setTabStyle (document.getElementById ('aaOverview'), true);
  my.Overview.getContent().style.display = 'block';
  
  if (Options.ptWinIsOpen){
    mainPop.show (true);
    my[currentName].show();
  }
  window.addEventListener('unload', onUnload, false);
  AddMainTabLink("VVV", eventHideShow, mouseMainTab);
 
  CollectGold.init();
CollectRessource.init();

  FoodAlerts.init();
  
  TowerAlerts.init();
  TowerAlerts.setPostToChatOptions(Options.alertConfig);

  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  
  setInterval (HandleChatPane,2500);
}


function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  saveOptions();
}




/************************ Tower Alerts ************************/
var TowerAlerts = {
  viewImpendingFunc : null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  
  init : function (){
    var t = TowerAlerts; 
  },
  secondTimer : null,
  setPostToChatOptions : function (obj){
     var t = TowerAlerts;
     clearTimeout(t.secondTimer);
     if (Options.alertConfig.aChat)
 		t.e_eachSecond();
  },
  e_eachSecond : function (){   // check for incoming marches
     var t = TowerAlerts;
     var now = unixTime();
     //logit("on scan pour attaque !");
     unsafeWindow.player.allCities().sortBy(function(c){return c.number}).each(function(f,c){
             var d="",e="";
        if(f.underAttack()) {
        
          Cities.byID[f.id].c.incomingAttackMarches().each(function(c){
           var b=Cities.byID[f.id].c.marches.incoming[c.id];
           var arrivalTime = b.secondsToDestination()>0?b.secondsToDestination():0;
   	   logit("detecttin attaque " +t.getTowerMarch(b.id) + " " + arrivalTime);
           if ((arrivalTime>0)  && (t.getTowerMarch(b.id)==null || t.getTowerMarch(b.id)==undefined)) 
          {
            t.addTowerMarch (b.id, arrivalTime);
            t.postToChat (f, c, false);
            saveOptions (); 
          }
          });
        
        }
        });
     t.secondTimer = setTimeout (t.e_eachSecond, 5000);
   },
   addTowerMarch : function (id, arrivalTime){
       var t = TowerAlerts;
       var now = unixTime();

       for (k in Options.towerMarches){
         if ((Options.towerMarches[k].arrival+Options.towerMarches[k].added) < now) {
            //Options.towerMarches[k] = null;
            delete Options.towerMarches[k];
         }
       }
       Options.towerMarches['m' + id] = { added:now, arrival:arrivalTime };
       
  },  
  getTowerMarch : function (mid){ 
     var t = TowerAlerts;
     return Options.towerMarches['m'+mid];
  },
  postToChat: function(f, c, force){
    var t = TowerAlerts;
    if(Cities.byID[f.id].c.wilds[c.to.tileId]){
   	  var a='TS ' + unsafeWindow.Watchtower.generateCoords(c.to.cityId,c.to.tileId)
    } else{
   	  var a='Ville ' + unsafeWindow.player.cities[c.to.cityId].name + ' ('+unsafeWindow.player.cities[c.to.cityId].x +','+ unsafeWindow.player.cities[c.to.cityId].y +')';
    }
     var b=Cities.byID[f.id].c.marches.incoming[c.id];
     var attaquant=unsafeWindow.GOR.players[c.from.playerId]?unsafeWindow.GOR.players[c.from.playerId].name:"?";
     var attaou= "("+unsafeWindow.GOR.players[c.from.playerId].x+", "+unsafeWindow.GOR.players[c.from.playerId].y+")";
     var arrivalTime = b.secondsToDestination()>0?timestr(b.secondsToDestination()):message;

     var msg =' ** ARRIVEE ** : ';
     unsafeWindow.Object.keys(b.units).each(function(h){
     if(b.units[h].sent>0) {
		   	   msg += b.units[h].sent + ' ' + unsafeWindow.arStrings.unitName["u"+h] + ', ';
		         }
 		});
     		
     msg = msg.slice(0, -2);
     msg += ' (arrive dans ' + arrivalTime +').' ;
     
    var mess = "On m'attaque sur ma " + a +" par " + " " +attaquant + " " + msg;

    //logit(mess);
    sendChat("/a " + mess);
  
  }		
 }

my.Hud = {
   cont:null,
   state : null,
   popReport :null,
   getContent : function (){
     var t = my.Hud;
     return t.cont;
   },
   
   init : function (){
     var t = my.Hud;
     t.cont = document.createElement('div');
     return this.cont;
   },
   
   show : function () {
     var t = my.Hud;
       
       t.getAllianceReports();
       unsafeWindow.getReport = t.getReportBody;
       t.cont.innerHTML = '\
           <DIV class=ptstat>Suche nach den Angriffen in den Berichten des Bündnisses ( Allianz )</div>\
           <DIV class=ptentry style="height:30px"><table>\
           <tr><td class=xtab> Seite : \
           <span id=idSpanNumPages>2</span>\
           <select id="idHudSelect">\
           <option value=1> 1 </option>\
           <option selected value=2> 2 </option>\
           <option value=5> 5 </option>\
           <option value=10> 10 </option>\
           <option value=20> 20 </option>\
           <option value=30> 30 </option>\
           <option value=40> 40 </option>\
           <option value=50> 50 </option>\
           <option value=60> 60 </option>\
           <option value=70> 70 </option>\
           <option value=80> 80 </option>\
           <option value=90> 90 </option>\
           <option value=100> 100 </option>\
           <option value=99999> Alle </option>\
           </select></td>\
           <TD class=xtab><INPUT id="idHudSearch" type=submit value="Suche nach Berichte" />\
           <span id=idSpanHudErrorMsg></span><td><select style="display:none;" id="idHudTypeSearch"><option value="">Alle Berichte</option><option value="0">Eingehende Angriffe</option><option value="1">Bisherige Angriffe</option><option value="2">Verstärkungen</option></select>\
           <select id="idHudMedSearch"><option value="">Allianz</option><option value=1>Siehe Eigenne Berichte</option></select></td></tr>\
           </table></div>\
           <DIV id="hudResultsDiv" style="height:580px; max-height:580px; overflow-y:auto;"></div>';
           document.getElementById('idHudSearch').addEventListener ('click', t.handleHudSearch, false);
           document.getElementById('idHudSelect').addEventListener ('click', t.handleHudSelect, false);
           document.getElementById('idHudMedSearch').addEventListener ('click', t.DisplayReports, false);
           document.getElementById('idHudTypeSearch').addEventListener ('click', t.DisplayReports, false);
         
          setTimeout(function() {
            t.handleHudSearch();
            }, 100);
  },
    getReportBody : function(Date1,ID,TileId,SideNum, Nom1, Coord1, Nom2, Coord2){
        var t = my.Hud;
        if(SideNum=="Ent") SideNum=0;
        if(SideNum=="Sor") SideNum=1;
        if(SideNum=="Ren") SideNum=0;
        var c = {};
        c.pf=0;
        c.rid=ID;
        c.side=SideNum;
        
        if (SideNum=="Ren") SideNum = 2;
        
        unsafeWindow.AjaxCall.gPostRequest("fetchReport.php",c,
	        function(rslt){
	           t.showReportBody(Date1, rslt.data,TileId,SideNum,Nom1, Coord1, Nom2, Coord2);     
	        },
	        function (rslt) {
	               
	        }
       );
    
    },
    showReportBody: function (Date1,rslt,TileId,SideNum,Nom1,Coord1,Nom2,Coord2) {
      	var t = my.Hud;
      	if (t.popReport == null) {
      	 t.popReport = new CPopup('pbShowBarbs', 0, 0, 500, 400, true, function() {clearTimeout (1000);});
       	 t.popReport.centerMe (mainPop.getMainDiv());  
      	}
       	var m = ''; 
      	m+='<TABLE class=ptTab cellpadding=3>';
      	//alert(TileId + ' - ' + SideNum + ' - ' + rslt['winner']);
      	if (SideNum==0) {
      	 // Seulement les attaques entrantes
      	
      	if (TileId < 51 && rslt['tileLevel']!=undefined) m+='<TD><FONT size="4px">Terre Sauvage Niv '+rslt['tileLevel']+'</font></td>';
      	if (TileId < 51 && rslt['tileLevel']==undefined) m+='<TD><FONT size="4px">Auf Wildniss</font></td>';
      	if (rslt['conquered']==1) m+='<TD><FONT color="#CC0000" size="4px">Erobert</font></td></tr>';
    
      	if (rslt['winner']==1) m+='<TR><TD><FONT color="#CC0000" size="4px"><b>Verlierer</b><br></font></td></tr></table>';
      	if (rslt['winner']==0) m+='<TR><TD><FONT color="green" size="4px"><b>Gewinner</b><br></font></td></tr></table>';
    	
    	if (rslt['fght'] != undefined){
    			m+='<TABLE style="float:left;width:45%;" class=ptTab><tr><td colspan=3><b>Angreifer : '+Nom1+' <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ Coord1 +')</a></b><br>General : '+ rslt['s1KCombatLv'] +'<br>Zahl von der Rundfahrt : '+rslt['rnds']+'<br>Bonus : '+ parseInt(rslt['s1atkBoost']*100)  +' % Angriff - '+ parseInt(rslt['s1defBoost']*100) +' % Verteitigung</td></tr>\
    			    <TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Truppen</td><TD align="center">Gekämpft</td><TD align="center">Überlebt</td></tr>'; 
    			if (rslt['fght']["s1"] != undefined) {
    					for (var i=1;i<=12;i++) {
    						if (rslt['fght']["s1"]['u'+i] != undefined) {
    							if (rslt['fght']["s1"]['u'+i][0] > rslt['fght']["s1"]['u'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s1"]['u'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s1"]['u'+i][1]+'</font></td></tr>';
    							else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></div></td><TD align="center">'+rslt['fght']["s1"]['u'+i][0]+'</td><TD align="center">'+rslt['fght']["s1"]['u'+i][1]+'</td></tr>';
    						}
    					}
    			}
    			m+='</table><TABLE style="float:right;width:45%;" class=ptTab><tr><td colspan=3><b>Verteidiger : '+Nom2+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord2 +');" class="coordinateLink">('+ Coord2 +')</a></b><br>General : '+ rslt['s0KCombatLv'] +'<br><br>Bonus : '+ parseInt(rslt['s0atkBoost']*100)  +' % Angriff - '+ parseInt(rslt['s0defBoost']*100) +' % Verteidigung</td></tr>';	  			  	
    		  	if (rslt['fght']["s0"] != undefined) {
    				  	m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Truppen</td><TD align="center">Gekämpft</td><TD align="center">Überlebt</td></tr>';
    				  	for (var i=60;i<=63;i++) {
    				  		if (rslt['fght']["s0"]['f'+i] != undefined) {
    				  			if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
    				  			else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
    				  		}
    				  	}
    				  	
    				  	for (var i=1;i<=12;i++) {
    				  		if (rslt['fght']["s0"]['u'+i] != undefined) {
    				  			if (rslt['fght']["s0"]['u'+i][0] > rslt['fght']["s0"]['u'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['u'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['u'+i][1]+'</font></td></tr>';
    				  			else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['u'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['u'+i][1]+'</td></tr>';
    				  		}
    				  	}
    				  	for (var i=50;i<=55;i++) {
  					 if (rslt['fght']["s0"]['f'+i] != undefined) {
  					  if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
  					   			else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
  					  }
    				  	}
    		     } else {
  				  		  	 m+="<tr><td><br>Keine schützende Einheit</td></tr>";
  	  		 }
    		  	m+='<TR><TD></TD></TR></table>';
    	}
      	
      	if (rslt['unts']!= undefined) { // pour les renforts :) lol ca sert pas pour le moment
      	    // Renfort !
    	   m+='<TABLE style="float:right;width:45%;" class=ptTab><TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Truppen</td><TD align="center">Renforc&eacute;</td></tr>';
  
  	   for (var i=1;i<=12;i++) {
  	     		  		if (rslt['unts']['u'+i] != undefined) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['unts']['u'+i]+'</td></tr>';
      	   }
   
    	   m+="</table>"; 
    	
      	}
      	m+='<TR><TD></TD></TR><TR><TD></TD></TR></table>';
      	
      	if (rslt['loot'] != undefined) {
    		  	m+='<TABLE class=ptTab cellpadding=3><tr><td colspan=4><b><u>Ressoursen :</u></b><br>\
		        </tr><TR><TD>Silber : </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][0]))+'</td>';
    		  	m+='<TD>Nahrung : </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][1]))+'</td>';
    		  	m+='<TD>Holz : </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][2]))+'</td>';
    		  	m+='<TD>Stein : </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][3]))+'</td>';
    		  	m+='<TD>Eisen : </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][4]))+'</td></table>';
    	}	
    	
    	
    	if (rslt['rsc'] != undefined) {
    		  	m+='<TABLE class=ptTab cellpadding=3><tr><td colspan=4><b><u>Ressources :</u></b><br></tr><TR>'
    		  	if (rslt['gld']!= undefined) m+='<TD>Silber : </td><TD>'+addCommas(parseInt(rslt['gld']))+'</td>';
    		  	m+='<TD>Nahrung : </td><TD>'+addCommas(parseInt(rslt['rsc']['r1']))+'</td>';
    		  	m+='<TD>Holz : </td><TD>'+addCommas(parseInt(rslt['rsc']['r2']))+'</td>';
    		  	m+='<TD>Stein : </td><TD>'+addCommas(parseInt(rslt['rsc']['r3']))+'</td>';
    		  	m+='<TD>Eisen : </td><TD>'+addCommas(parseInt(rslt['rsc']['r4']))+'</td></table>';
    	}	
    	
    	} else if ( SideNum == "2") {
  
    	  // Renfort !
     	   m+='<TABLE style="float:left;width:45%;" class=ptTab><TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Truppen</td><TD align="center">Renforc&eacute;</td></tr>';
   
   	   for (var i=1;i<=12;i++) {
   	     		  		if (rslt['unts']['u'+i] != undefined) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['unts']['u'+i]+'</td></tr>';
       	   }
    
    	   m+="</table>"; 
    	} else {
    	 m+='<table border=0 bgcolor=white width=100% cellpadding=3><tr><td colspan=2 style="background-color:white;"><table>';
    	 // attaquantes sortantes
    	 if (TileId < 51 && rslt['tileLevel']!=undefined) m+='<TD><FONT size="3px">Terre Sauvage Niv '+rslt['tileLevel']+'</font></td>';
  	 if (TileId < 51 && rslt['tileLevel']==undefined) m+='<TD><FONT size="3px">Terre Sauvage</font></td>';
  	 if (rslt['conquered']==1) m+='<TD><FONT color="#CC0000" size="3px">Conquis</font></td></tr>';
  	   
  	     if (rslt['winner']==0) m+='<TR><TD style="background-color:white;"><FONT color="#CC0000" size="3px"><b>D&eacute;faite<br><br></font></td></TR></table>';
  	     if (rslt['winner']==1 || rslt['winner']==2) m+='<TR><TD style="background-color:white;"><FONT color="green" size="3px"><b>Victoire<br><br></font></td></tr></table>';
       
               if (rslt['fght'] != undefined){
  	  			m+='<TABLE style="float:left;width:45%;" class=ptTab><tr><td colspan=3><b>Attaquant : '+Nom1+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord1 +')" class="coordinateLink">('+ Coord1 +')</a></b>\
  	  			    <br>Chevalier : '+ rslt['s1KCombatLv'] +'<br>Nombre de tour(s) : '+rslt['rnds']+'<br>Bonus : '+ parseInt(rslt['s1atkBoost']*100)  +' % attaque - '+ parseInt(rslt['s1defBoost']*100) +' % d&eacute;fence</td></tr>\
  	  			    <TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Troupes</td><TD align="center">Battu</td><TD align="center">A surv&eacute;cu</td></tr>'; 
  	  			if (rslt['fght']["s1"] != undefined) {
  	  					for (var i=1;i<=12;i++) {
  	  						if (rslt['fght']["s1"]['u'+i] != undefined) {
  	  							if (rslt['fght']["s1"]['u'+i][0] > rslt['fght']["s1"]['u'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['fght']["s1"]['u'+i][0])+'</td><TD align="center"><FONT color="#CC0000">'+addCommas(rslt['fght']["s1"]['u'+i][1])+'</font></td></tr>';
  	  							else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['fght']["s1"]['u'+i][0])+'</td><TD align="center">'+addCommas(rslt['fght']["s1"]['u'+i][1])+'</td></tr>';
  	  						}
  	  					}
  	  					
  	  			}
  	  			m+='</table><TABLE style="float:right;width:45%;" class=ptTab><tr><td colspan=3><b>D&eacute;fenseur : '+Nom2+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord2 +');" class="coordinateLink">('+ Coord2 +')</a></b><br>Chevalier : '+ rslt['s0KCombatLv'] +'<br>';
  	  			if (rslt['lstlgn'] != undefined)
  	  			{
  	  			 m+="Derni&egrave;re connexion : " + unsafeWindow.formatDateByUnixTime(rslt['lstlgn'])+"<br>";
  	  			} else {
  	  			 m+="<br>";
  	  			}
  	  			m+='Bonus : '+ parseInt(rslt['s0atkBoost']*100)  +' % attaque - '+ parseInt(rslt['s0defBoost']*100) +' % d&eacute;fence</td></tr>';	  	
  	  		  	if (rslt['fght']["s0"] != undefined) {
  	  				  	m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Troupes</td><TD align="center">Battu</td><TD align="center">A surv&eacute;cu</td></tr>';
  	  				 	for (var i=60;i<=63;i++) {
  							if (rslt['fght']["s0"]['f'+i] != undefined) {
  							if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
  							else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
  							}
  						 }
  	  				  	for (var i=1;i<=12;i++) {
  	  				  		if (rslt['fght']["s0"]['u'+i] != undefined) {
  	  				  			if (rslt['fght']["s0"]['u'+i][0] > rslt['fght']["s0"]['u'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['fght']["s0"]['u'+i][0])+'</td><TD align="center"><FONT color="#CC0000">'+addCommas(rslt['fght']["s0"]['u'+i][1])+'</font></td></tr>';
  	  				  			else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['fght']["s0"]['u'+i][0])+'</td><TD align="center">'+addCommas(rslt['fght']["s0"]['u'+i][1])+'</td></tr>';
  	  				  		}
  	  				  	}
  	  				  	
  						for (var i=50;i<=55;i++) {
  							 if (rslt['fght']["s0"]['f'+i] != undefined) {
  							  if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
  				   			  else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
  						}
    				  	}
  	  				  	
  	  				  	
  	  				  	
  	  		  	} else if ((rslt['unts']!=undefined) || (rslt['frt']!=undefined)) {
  	  		  	    if (rslt['frt']!=undefined) {
  	  		  	       m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">D&eacute;fences</td><TD align="center">Compte</td></tr>';
  				   
  				   	for (var i=60;i<=63;i++) {
  				     	  if (rslt['frt']['f'+i] != undefined) {
  				     	     m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['frt']['f'+i])+'</td></tr>';
  				     	  }
    				  	}
  				      for (var i=50;i<=55;i++) {
  				   	 if (rslt['frt']['f'+i] != undefined) {
  				           m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['frt']['f'+i])+'</td></tr>';
  				   	 }
  				      }
  				    }
  				    if (rslt['frt']!=undefined) {
  	  			      m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Troupes</td><TD align="center">Compte</td></tr>';
  				      for (var i=1;i<=12;i++) {
  					 if (rslt['unts']['u'+i] != undefined) {
  					    m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['unts']['u'+i])+'</td></tr>';
  					  }
  	  			       }
  	  			    }
  	  			  
  	  			} else {
  	  		  	 m+="<tr><td><br>Aucune unit&eacute; d&eacutefendue</td></tr>";
  	  		  	}
  	  		  	m+='<TR><TD></TD></TR></table>';
    	        }
   	        m+="</td></tr><tr><td><br></tr>";
  	  	if (rslt['pop'] != undefined) {
  	  	
  	  	   m += '<tr><td style="background-color:white;"><b><u>Reconnaissance</u></b><br><br>';
  	  	
  	  	
  	  	   m+='<table style="float:left;width:45%;"class=ptTab><TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><td align="center">Ville<td align="center">&nbsp;</tr><TR><TD><img width=30 height=30 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/population_30.png><TD>'+addCommas(parseInt(rslt['pop']))+'</td></tr>';
  	  	   if (rslt['hap'] != undefined) {
  	  	    m+='<tr><td>Bonheur<td>'+rslt['hap'] +'</td>';
  	  	   }
  	  	   if (rslt['knt'] != undefined) {
  	  	    m+='<tr><td>Chevalier<td>'+rslt['knt']['cbt']+'</td>';
  	  	   }
  	  	   
  	  	   if (rslt['blds'] != undefined) {
  	  	     m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><td align="center">Batiment<td align="center">Niveaux</tr>';
  	  	 
  	  	    if (rslt['blds']['b1']!=undefined) {
  	  	        m+='<tr><td width=40%>Ferme ('+rslt['blds']['b1'].length+')</td><td>';
  	  	        zz="";
  	  	        for (var i=0;i<rslt['blds']['b1'].length;i++) {
  	  	         if (i%9==0 && i!=0) zz += '<br>';
  	  	         zz += rslt['blds']['b1'][i] + ", ";
  	  	        }
  	  	        m += zz.substr(0,zz.length-2);
  	  	        m +='</td><tr>';
  	  	    }
  	  	    if (rslt['blds']['b2']!=undefined) {
  		    	m+='<tr><td>Scierie ('+rslt['blds']['b2'].length+')</td><td>';
  	  	        zz="";
  	  	        for (var i=0;i<rslt['blds']['b2'].length;i++) {
  	  	         if (i%9==0 && i!=0) zz += '<br>';
  	  	         zz += rslt['blds']['b2'][i] + ", "
  	  	        }
  	  	        
  	  	        m += zz.substr(0,zz.length-2);
  	  	        m +='</td><tr>';
  	  	    }
  	  	    if (rslt['blds']['b3']!=undefined) {
  		        m+='<tr><td>Carri&egrave;re ('+rslt['blds']['b3'].length + ')</td><td>';
  	  	        zz="";
  	  	        for (var i=0;i<rslt['blds']['b3'].length;i++) {
  	  	         if (i%9==0 && i!=0) zz += '<br>';
  	  	         zz += rslt['blds']['b3'][i] + ", "
  	  	        }
  	  	        m += zz.substr(0,zz.length-2);
  	  	        m +='</td><tr>';
  	  	    }
  	  	    if (rslt['blds']['b4']!=undefined) {
  		    	m+='<tr><td>Mine ('+rslt['blds']['b4'].length + ')</td><td>';
  	  	        zz="";
  	  	        for (var i=0;i<rslt['blds']['b4'].length;i++) {
  	  	         if (i%9==0 && i!=0) zz += '<br>';
  	  	         zz += rslt['blds']['b4'][i] + ", "
  	  	        }
  	  	        m += zz.substr(0,zz.length-2);
  	  	        m +='</td><tr>';
  	  	    }
  	  	   
  	  	   }
  	  	   
  	  	   m+='</table>';
  	  	}
  	  	
  	  	
    	        if (rslt['tch'] != undefined) {
    	        
    	           m+='<table style="float:right;width:45%;" class=ptTab><TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Tech</td><TD align="center">Niveau</td></tr>';
  	  				
    	           for (var i=1;i<=16;i++) {
    	           
    	            if (rslt['tch']['t'+i]!=undefined) {
    	             m+='<tr><TD>' + unsafeWindow.techcost['tch'+i][0] + '</td><TD>'+rslt['tch']['t'+i]+'</td></tr>';
    	            }
  	  		       
    	           }
    	           
    	           
    	           
    	           m+='</table>';
  	     }
  	     var typebutin ='';
  		     	
  	     	if (rslt['loot'] != undefined) {
  	     		m+='</td><tr><td style="background-color:white;"><b><u>Ressources '+typebutin+' :</u></b><br>';
  	     	  		  	m+='<TABLE class=ptTab cellpadding=3><TR><TD>Argent : </td><TD>'+addCommas(parseInt(rslt['loot'][0]))+'</td>';
  	     	  		  	m+='<TD>Nourriture : </td><TD>'+addCommas(parseInt(rslt['loot'][1]))+'</td>';
  	     	  		  	m+='<TD>Bois : </td><TD>'+addCommas(parseInt(rslt['loot'][2]))+'</td>';
  	     	  		  	m+='<TD>Pierre : </td><TD>'+addCommas(parseInt(rslt['loot'][3]))+'</td>';
  	     	  		  	m+='<TD>Fer : </td><TD>'+addCommas(parseInt(rslt['loot'][4]))+'</td></table>';
  	  	}
  	     
  	  	if (rslt['rsc'] != undefined) {
  	    		  	m+='<TABLE class=ptTab cellpadding=3><tr><td colspan=4><b><u>Ressources :</u></b><br></tr><TR>';
  	    		  	if (rslt['gld']!= undefined) m+='<TD>Argent : </td><TD>'+addCommas(parseInt(rslt['gld']))+'</td>';
  	    		  	m+='<TD>Nourriture : </td><TD>'+addCommas(parseInt(rslt['rsc']['r1']))+'</td>';
  	    		  	m+='<TD>Bois : </td><TD>'+addCommas(parseInt(rslt['rsc']['r2']))+'</td>';
  	    		  	m+='<TD>Pierre : </td><TD>'+addCommas(parseInt(rslt['rsc']['r3']))+'</td>';
  	    		  	m+='<TD>Fer : </td><TD>'+addCommas(parseInt(rslt['rsc']['r4']))+'</td></table>';
    		}
  	   m+="</table>";
  	  	 
    	}
    	
    	
      	t.popReport.getMainDiv().innerHTML = '<DIV style="max-height:370px; height:370px; overflow-y:scroll">' + m + '</div>';
      	t.popReport.getTopDiv().innerHTML = '<TD align="center"><B>Bericht des Kampfes - '+unsafeWindow.formatDateByUnixTime(Date1)+'</td>';
      	t.popReport.show(true);
      	
      	
      	
    },
    DisplayReports : function (){
      var t = my.Hud;
      var data = t.data;
      var filtre =  document.getElementById("idHudTypeSearch").value;
      var filtre2 =  document.getElementById('idHudMedSearch').value;
      var results=document.getElementById("hudResultsDiv");
      if(!t.data.length) {
         results.innerHTML = '<center><b>Keine Berichte gefunden</b></center>';
         return;
      }
      var m = '<center><table width=100% cellspacing=0><thead><th>Seite</th><th>R.</th><th>Datum</th><th colspan=3>Angreifer</th><th>Type</th><th colspan=4>Ziel</th></thead>';
      m += '<tbody cellpadding=3>';
      for ( var i=0; i<t.data.length;i++) {
         var rpt = data[i];
         if (rpt.side0Name=='undefined') 
            continue;
            
          style='padding:2px;' ; 
          if (rpt.TypeName=="Ent") {
             style=' style="background-color:#EF9999;padding:2px;"';
          }
           if (rpt.TypeName=="Ren") {
  	   style=' style="background-color:#99EF99;padding:2px;"';
          }
  
          if (((filtre2=="" || filtre2=="1" && (rpt.side1Name==Seed.player.name|| rpt.side0Name==Seed.player.name))) && (filtre=="" || (filtre=="0" && rpt.TypeName=="Ent") || (filtre=="1" && rpt.TypeName=="Sor") || (filtre=="2" && rpt.TypeName=="Ren"))) {
          
          
          m += '<tr ><td '+style+'><SPAN onclick="ptAllianceReports('+rpt.page+')"> <a>'+rpt.page+'</a></span></td>\
           <td '+style+'>';
          if (rpt.marchType != 3) m+='<img onclick="getReport('+rpt.reportUnixTime+','+ rpt.marchReportId +','+rpt.side0TileType +',\''+rpt.TypeName+'\',\''+rpt.side1Name+'\',\''+ rpt.side1XCoord +','+ rpt.side1YCoord +'\',\''+rpt.side0Name+'\',\''+ rpt.side0XCoord +','+ rpt.side0YCoord +'\');" border=0 src="http://cdn1.iconfinder.com/data/icons/woothemesiconset/16/search_button.png">';
          m+='&nbsp;</td>\
            <td '+style+'>'+unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime)+'</td>\
              <td '+style+'>'+rpt.side1Name+'</td>\
              <td '+style+'>'+rpt.side1AllianceName.replace('unaligned','-')+'</td>\
              <td '+style+'><a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ rpt.side1XCoord +','+ rpt.side1YCoord +')" class="coordinateLink">('+ rpt.side1XCoord +','+ rpt.side1YCoord +')</a></td>';
              if (rpt.marchType == 3) 
               m +='<TD '+style+'><FONT color="FF9933">'+rpt.marchName+'</font></td>';
  	    else if (rpt.marchType == 4) 
  	     m +='<TD '+style+'><FONT color="FF0033">'+rpt.marchName+'</font></td>';
  	    else 
  	      m +='<TD '+style+'><FONT color="339933">'+rpt.marchName+'</font></td>';
              m+='<td '+style+'>'+rpt.side0Name+'</td>\
                <td '+style+'>'+rpt.side0AllianceName.replace('unaligned','-')+'</td>\
              <td '+style+'><a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ rpt.side0XCoord +','+ rpt.side0YCoord +')" class="coordinateLink">('+ rpt.side0XCoord +','+ rpt.side0YCoord +')</a></td>';
              if (rpt.side0TileType < 51 && rpt.side0TileLevel!=undefined) {
              m+='<td '+style+'>TS '+rpt.side0TileLevel+'</td>';
              } else {
              m+='<td '+style+'>Ville</td>';
              }
              
              m+='</tr>';
          }
      }
      m += '</tbody></table></center>';
      results.innerHTML = m;
  },
  
    handleHudSelect : function(rslt, page) {
      var t = my.Hud;
      t.maxPages=document.getElementById("idHudSelect").value;
      if ( t.maxPages==99999)
         t.maxPages=t.totalPages;
      document.getElementById("idSpanNumPages").innerHTML = t.maxPages+'';
    },
    handleHudSearchCB : function(rslt, page) {
      var t = my.Hud;
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
                  rpt.side0CityName = 'keiner';
                if (rpt.side1CityId > 0)
                  rpt.side1CityName = rslt.arCityNames['c'+rpt.side1CityId];
                else
                  rpt.side1CityName = 'keiner';
                if (rpt.marchType == 1)
                    rpt.marchName = 'Transport';
                else if (rpt.marchType == 3)
                    rpt.marchName = 'Spähen';
                else if (rpt.marchType == 2)
                    rpt.marchName = 'Verstärkung';
                else if (rpt.marchType == 4)
                    rpt.marchName = 'Angriff';
                else rpt.marchName = 'unknown';
                
                rpt.targetDiplomacy = getDiplomacy (rpt.side0AllianceId);
             
                	
  	      if (myAllianceId != rpt.side1AllianceId) {      
  		rpt.TypeName = "Ent";
  	      }
                if (myAllianceId == rpt.side1AllianceId) {
       		rpt.TypeName = "Sor";      
       	      }
       	      
       	         	if (rpt.marchType == 2) {
       	         	  rpt.TypeName = "Ren"; 
       	         	}
       	      
       	      t.data.push(rpt); 
                   
           }
         }
         if (parseInt(page)+1 <= t.maxPages) {
            var results=document.getElementById("hudResultsDiv");
            results.innerHTML = '<center><b>...Durch Suche Berichte : '+(parseInt(page)+1)+'...</b></center>';
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
      var t = my.Hud;
      var results=document.getElementById("hudResultsDiv");
      //logit("handleHudSearch");
      t.maxPages=document.getElementById("idHudSelect").value;
      if ( t.maxPages==99999)
         t.maxPages=t.totalPages;
      results.innerHTML = '<center><b>...durch Suche Berichte '+t.maxPages+' Seite...</b></center>';
      t.data=[];
      t.getAllianceReports(1);
    },
  
    getAllianceReports : function (pageNum){
      var t = my.Hud;
      var c= {};
      c.pageNo = pageNum;
      c.group = "a";

      unsafeWindow.AjaxCall.gPostRequest("listReports.php",c,
        function(rslt){
           t.handleHudSearchCB (rslt, pageNum);     
        },
        function (rslt) {
            t.handleHudSearchCB (rslt, pageNum);     
        }
      );
    },
  
    hide : function (){
  },
  
  }
 
 
 
 
/************************ Food Alerts *************************/
var FoodAlerts = {

  init : function (){
   var f = FoodAlerts;
   f.e_eachMinute();
  },

  minuteTimer : null,

  e_eachMinute : function (){   
    var f = FoodAlerts;
    var now = unixTime();
    row = [];  
    if (Options.enableFoodWarnTchat)  {
      for(i=0; i < Cities.numCities; i++) {
        //var rp = getResourceProduction (Cities.cities[i].id);
        var foodleft = parseInt(Cities.cities[i].c.resources[1].count);
        var usage = parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) - parseInt(Cities.cities[i].c.upkeep());
        //row[i] = rp[1] - usage;
        
    	var timeLeft = parseInt(Cities.cities[i].c.resources[1].count)  / (0-usage) * 3600;
          var msg = '';
          if (timeLeft<0){
           }
          else if (timeLeft<(Options.foodWarnHours*3600)) {
                msg += 'Ma ville ' + Cities.cities[i].c.name.substring(0,10) + ' (' +
                       Cities.cities[i].c.x +','+ Cities.cities[i].c.y + ') ';
                msg += ' a besoin de bananes. Stock actuel : '+addCommasWhole(foodleft).replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ')+' ('+timestrShort(timeLeft)+') Production : '+addCommas(usage).replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ')+'/h';
                sendChat ("/a " + msg);
                //alert(msg);
          }
      }  
    f.minuteTimer = setTimeout (f.e_eachMinute, 1800000);
   }
  },  
}

function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}



/*************** REASSIGNER **********/
my.Reassign = {
 cont : null,
 displayTimer : null,
 state : null,
 curTabBut : null,
 curTabName : null,
 sourceCity : {},
 destinationCity : {},
 rows : [],

 init : function (){
   var t = my.Reassign;
   t.cont = document.createElement('div');
   t.state = null;
   return t.cont;
 },
  getContent : function (){
    var t = my.Reassign;
    return t.cont;
  },
  hide : function (){
    var t = my.Reassign;
    t.state = null;
    clearTimeout (t.displayTimer);
  },
  
  show : function (){  
    var t = my.Reassign;
    var ModelCity = {};
    var rownum = 0;
    var rownum2 = 0;
    clearTimeout (t.displayTimer);
     
        if (t.state == null) {  
          m = "<DIV class=ptstat>R&eacute;assigner des troupes d'une ville a une autre</div>";
          m +="<div id='statpourREA'></div>";
          m += "<TABLE width='450px' class=ptTab border=0 align=left cellpadding=2>\
            <tr align=center valign=middle><td colspan=1 width=100><b><u>Source</b></u><br><span id=REAsrcRptspeedcity></span></td>\
            <td colspan=1 width='100px'><input type=button style='font-weight:bold' id=REAaction value='R&eacute;assigner'></td>\
            <td colspan=1 width='100px'><b><u>Destination</b></u><br><span id=REAdesRptspeedcity></span></td>\
            <td width=150 colspan=1>&nbsp;</td></tr>\
            <tr align=center valign=top><td width=100><div id=REAstatsource></div></td>\
            <td ><table cellspacing=0 cellpadding=0 width=99%>";
             for (r=1; r<13; r++){
              if (unsafeWindow.arStrings.unitName["u"+r]) {
             if (rownum++ % 2)
    	             style = '';
    	           else
                style = ' style = "background: #e8e8e8"';
    	     m += '<tr '+style+'><td  align=right>&nbsp;</td><td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAnbunit'+r+'" type=text size=7 value="0"></td></tr>';
       	     }
       	    }
            m += "</table></td><td><div id=REAstatdest></div></td>";
            m += "<td colspan=2><table cellspacing=0 cellpadding=0 width=80%><tr><td>&nbsp;</table>";
           /* for (r=1; r<13; r++){
             if (unsafeWindow.arStrings.unitName["u"+r]) {
                if (rownum++ % 2)
    	            style = '';
    	          else
                style = 'background: #e8e8e8;';
                
                
    		    m += '<tr style="'+style+' height:16px;font-size:11px;"><td width=50% height=20 align=center><span id="BOEstimationREAZ'+r+'">&nbsp;</span></td></tr>';
    		}
            }
            m += "</tr></table>";*/
            m += "</tr><tr><td colspan=4><div id='ptREAStatus' style='text-align:center;overflow-y:auto; max-height:30px; height: 30px;'></div></td></tr></table>";
            
            
          t.cont.innerHTML = m; 
          t.statpourREA = document.getElementById ('statpourREA');
          t.statutREA = document.getElementById ('ptREAStatus');
          t.actionREA = document.getElementById ('REAaction');
          t.actionREA.addEventListener ('click', t.clickReassigneDo, false);
          
       
          
          var dcp1 = new CdispCityPicker ('ptREA1', document.getElementById('REAdesRptspeedcity'), false, t.clickREACityDestinationSelect, 1);
          var dcp0 = new CdispCityPicker ('ptREA0', document.getElementById('REAsrcRptspeedcity'), false, t.clickREACitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
          t.state = 1;
         
         }
         var str = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=120></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
	    for(i=0; i<Cities.numCities; i++) {
	      Gate = Cities.cities[i].c.defending;
	               if(Gate == 0) var couleurr="#77EE77";
	               if(Gate != 0) var couleurr="#EE7777";
	                 str += "<TD width=81 style='background-color:"+couleurr+"' align=center><B>"+ Cities.cities[i].c.name +'</b><BR><a onclick="KB.Controllers.MapHelper.gotoCoord('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+');">('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+')</td>';
	                 
	    }
	str +="</tr>";
        str += "<tr><td><br></td></tr>";

      
	 for (r=1; r<13; r++){
	      var unitTotal=0;
	   var m="";
	   if (unsafeWindow.arStrings.unitName["u"+r]) {
	      style = " style = 'background: #e8e8e8'";
	      for(var i=0; i<Cities.numCities; i++) {
		   m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.troops[r].count()) +'</td>';
		 	                        unitTotal+=parseInt(Cities.cities[i].c.troops[r].count());
	       }
		          str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.unitName["u"+r]+"</td><td "+style+" align=right>"+addCommas(unitTotal)+" "+ m + "</tr>"; 
	
	
	    }
	 }
        t.statpourREA.innerHTML = str;       
        t.displayTimer = setTimeout (t.show, 10000);
         
         
    
 },
   clickREACitySourceSelect : function (city){
    var t = my.Reassign;
    var rownum=0;
    t.sourceCity = city; 
    // on remplit les stat du DIV source
    //on efface le nbunit
    for (r=1; r<13; r++){
      if (ById("REAnbunit"+r))  ById("REAnbunit"+r).value="0";
    }
    t.actionREA.disabled=false;
    var m="";
    m="<table cellspacing=0 cellpadding=0 width=80%>";
    for (r=1; r<13; r++){  
     if (unsafeWindow.arStrings.unitName["u"+r]) {
        if (rownum++ % 2)
    	            style = '';
    	          else
             style = 'background: #e8e8e8;';
      m += '<tr style="'+style+'"><td align=right>'+unsafeWindow.arStrings.unitName["u"+r]+'</td>\
            <td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAdestunit'+r+'" type=text size=7 readonly value="'+parseInt(Cities.cities[t.sourceCity.idx].c.troops[r].count())+'">&nbsp;\
            <input type=button value=">" id="REApdestunit'+r+'"  style="border:1px solid black;height:16px;font-size:11px;"></td></tr>';
     }
    }
    m += "</table>";
 
    ById("REAstatsource").innerHTML = m;
    
    for (r=1; r<13; r++){
      if (unsafeWindow.arStrings.unitName["u"+r]) {
      
      ById("REApdestunit"+r).addEventListener ('click', function() {
      
        
        var nomcha=this.id.replace("REApdest","REAdest");
        var nomcha2=this.id.replace("REApdestunit","REAnbunit");
      
        ById(nomcha2).value=0; // on met à 0
        for(i=0; i<Cities.numCities; i++) {
          alert(Cities.cities[i].c.buildings[12].level());
          //alert();
         }
        //var niveauPointRall=parseInt(getCityBuilding (t.sourceCity.id, 12).maxLevel); // 12=Point de ralliement
        //if (niveauPointRall==11) {
        //   var maxtroupe=150000;
        //} else {
         //  var maxtroupe=parseInt(niveauPointRall*10000);
        //}
        var maxtroupe=100000;
        var nbunitto=0;
        for (r=1; r<13; r++) {
          if (ById("REAnbunit"+r))      nbunitto+=parseInt(ById("REAnbunit"+r).value);
        }

        var libre = parseInt(maxtroupe - nbunitto);

        if (ById(nomcha).value>=libre) {
          ById(nomcha2).value = libre;
        }  else {
          ById(nomcha2).value= ById(nomcha).value;
        }
  
        
        
       }, false);
       }
    }
   // t.estimerTemps();
  },
  clickREACityDestinationSelect : function (city){
     var t = my.Reassign;
     var rownum=0;
     t.destinationCity = city;
     
     // on remplit les stat du DIV destination
     var m="";
     m="<table cellspacing=0 cellpadding=0 width=80%>";
     for (r=1; r<13; r++){
      if (unsafeWindow.arStrings.unitName["u"+r]) {
        if (rownum++ % 2)
    	            style = '';
    	          else
             style = 'background: #e8e8e8;';

          m += '<tr style="'+style+'"><td align=right>&nbsp;</td><td align=left><input style="border:1px solid black;height:16px;font-size:11px;" type=text size=7 readonly value="'+parseInt(Cities.cities[t.destinationCity.idx].c.troops[r].count())+'"></td></tr>';
      }
     }
     m += "</table>";
     ById("REAstatdest").innerHTML = m;
    // t.estimerTemps();
  },  

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



/*************** TRANSPORT **********/
my.TranspAuto = {
 cont : null,
 displayTimer : null,
 state : null,
 curTabBut : null,
 curTabName : null,
 sourceCity : {},
 destinationCity : {},
 rows : [],

 init : function (){
   var t = my.TranspAuto;
   t.cont = document.createElement('div');
   t.state = null;
     clearTimeout (t.displayTimer);
   return t.cont;
 },
  getContent : function (){
    var t = my.TranspAuto;
    return t.cont;
  },
  hide : function (){
    var t = my.TranspAuto;
    t.state = null;
    clearTimeout (t.displayTimer);
  },
  
  show : function (){  
   var t = my.TranspAuto;
   var rownum = 0;

   var ModelCity = {};
   

    if (t.state == null) {  
      m = "<DIV class=ptstat>Transportiere deine Ressis!</div>";
      m +="<div id='statpourTr'></div>";
      m += "<TABLE width=100% class=ptTab border=0>\
       <tr align=center><td colspan=2><HR></td></tr>\
       <tr align=center valign=top><td colspan=1 width=50%><b><u>Von</b></u><br><span id=srcptspeedcity></span></td>\
       <td colspan=1 width=50%  rowspan=2><b><u>Ziel</b></u><br><span id=desptspeedcity></span><br>\
       Ziel Koordienaten <br>X: <input type=text size=4 id=typetrpx value=0>&nbsp;Y: <input type=text size=4 id=typetrpy value=0><br><br><INPUT id='ptttButTransport' type=submit value='Transport' style='font-weight:bold'>\
       </td></tr>\
       <tr align=center><td colspan=1>Einheit : <select id=typetrp><option selected value='1'>"+unsafeWindow.arStrings.unitName["u1"]+"</option><option selected value='9'>"+unsafeWindow.arStrings.unitName["u9"]+"</option></select>\
       <br>Menge : <input type=text size=6 value='100' id='Choixnbwagon'><input type=button id='trswagmax' value='Max'\><br><i>(die Menge des zu Transportierenden ressource,ist der Maximun der gewählten Einheiten)</i>\
       <br><b>Type des ressource :</b><br><input type=radio id='ChoixRess0' name='ChoixRess' value='gold'> Silber\
       <input type=radio id='ChoixRess1' name='ChoixRess' value='rec1'> Nahrung\
       <input type=radio id='ChoixRess2' name='ChoixRess' value='rec2'> Holz\
       <input type=radio id='ChoixRess3' name='ChoixRess' value='rec3'> Stein\
       <input type=radio id='ChoixRess4' name='ChoixRess' value='rec4'> Eisen\
       </td></tr>\
       <tr><td colspan=2>Schätzung der beförderten Mittel : <span id=BOEstimationR></td></tr>\
       </table>\
       <TABLE align=center width=100% class=ptTab><TR><TD><div id=ptTranportStatus style='text-align:center;overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>";
    t.cont.innerHTML = m; 
    t.destinationCityx = document.getElementById ('typetrpx');
    t.destinationCityy = document.getElementById ('typetrpy');
    
    t.destinationCityx.addEventListener ('change', t.estimerRes, false);
    t.destinationCityy.addEventListener ('change', t.estimerRes, false);
    document.getElementById ('ChoixRess0').addEventListener ('click', t.estimerRes, false);
    document.getElementById ('ChoixRess1').addEventListener ('click', t.estimerRes, false);
    document.getElementById ('ChoixRess2').addEventListener ('click', t.estimerRes, false);
    document.getElementById ('ChoixRess3').addEventListener ('click', t.estimerRes, false);
    document.getElementById ('ChoixRess4').addEventListener ('click', t.estimerRes, false);
    
    t.estimationRes = document.getElementById ('BOEstimationR');
    var dcp1 = new CdispCityPicker ('ptspeed1', document.getElementById('desptspeedcity'), false, t.clickCityDestinationSelect, 1);
    t.TTbutTransport = document.getElementById ('ptttButTransport');
    t.TTbutTransport.addEventListener ('click', t.clickTransportDo, false);
    t.divTranportStatus = document.getElementById ('ptTranportStatus');
    t.statpourTr = document.getElementById ('statpourTr');
    t.typetrp = document.getElementById ('typetrp');
    t.typetrp.addEventListener ('click', t.estimerRes, false); 
    t.trswagmax = document.getElementById ('trswagmax');
    t.trswagmax.addEventListener ('click', t.clickUniteMax, false);
    t.Choixnbwagon  = document.getElementById ('Choixnbwagon');
    t.Choixnbwagon.addEventListener ('keyup', t.verifierWagons, false);
    var dcp0 = new CdispCityPicker ('ptspeed0', document.getElementById('srcptspeedcity'), false, t.clickCitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
    t.state = 1;
   }

   str = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
   for(i=0; i<Cities.numCities; i++) {
     Gate = Cities.cities[i].c.defending;
              if(Gate == 0) var couleurr="#77EE77";
              if(Gate != 0) var couleurr="#EE7777";
                str += "<TD width=81 style='background-color:"+couleurr+"' align=center><B>"+ Cities.cities[i].c.name +'</b><BR>('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+')</td>';
                
   }
   str +="</tr>";
   str += "<tr><td><br></td></tr>";
   var m="";
          var goldTotal=0;
          for(i=0; i<Cities.numCities; i++) {
                      m += "<TD width=81 style='background:#e8e8e8' align=right>"+ addCommas(Cities.cities[i].c.silver()) +'</td>';
                      goldTotal+=parseInt(Cities.cities[i].c.silver());
           }
          str += "<tr align=right><td style='background:#e8e8e8' align=right><b>Silber</td><td style='background:#e8e8e8' align=right>"+addCommas(goldTotal)+" "+ m + "</tr>" ; 
          
                   
            for (var nbr=1; nbr<=4; nbr++) {
                 if (nbr % 2)
    		        style = '';
    	     else
                        style = " style = 'background: #e8e8e8'";
                var m="";
                var resTotal=0;
                for(var i=0; i<Cities.numCities; i++) {
                            m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.resources[nbr].count) +'</td>';
                            resTotal+=parseInt(Cities.cities[i].c.resources[nbr].count);
                 }
                str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.ResourceName[nbr]+"</td><td "+style+" align=right>"+addCommas(resTotal)+" "+ m+"</tr>"; 
          
      
            
              }
             str += "<tr><td><br></td></tr>";
            // Production de nourriture + ENTRETIEN !
            var m="";
    	var prodTotal=0;
    	for(i=0; i<Cities.numCities; i++) {
    	           m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.resources[1].hourlyTotalRate())+"/"+unsafeWindow.arStrings.TimeStr.timeHr+"</td>";
    	          prodTotal+=parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate());
    	}
            str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.Production+"</td><td style='background: #e8e8e8' align=right>"+addCommas(prodTotal)+"/"+unsafeWindow.arStrings.TimeStr.timeHr+""+ m+"</tr>"; 
            var m="";
    	var entTotal=0;
     	for(i=0; i<Cities.numCities; i++) {
     	       color='black';
     	      // if ( parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) < Cities.cities[i].c.upkeep() ) color='red';
    	       m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ addCommas(Cities.cities[i].c.upkeep())+"/"+unsafeWindow.arStrings.TimeStr.timeHr+"</td>";
    	       entTotal+=parseInt(Cities.cities[i].c.upkeep());
    	}
            str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.UpKeep+"</td><td style='background: #e8e8e8' align=right>"+addCommas(entTotal)+"/"+unsafeWindow.arStrings.TimeStr.timeHr+""+ m+"</tr>"; 
    
            var m="";
    	 	var entTotal=0;
    	  	for(i=0; i<Cities.numCities; i++) {
    	  	       color='black';
    	  	       if ( parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) < parseInt(Cities.cities[i].c.upkeep()) ) {
    	  	        // entretien supérieur à la production
    	  	        difference = parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) - parseInt(Cities.cities[i].c.upkeep());
    	  	        var timeLeft = parseInt(Cities.cities[i].c.resources[1].count)  / (0-difference) * 3600;
    			if (timeLeft > 86313600)
    			       autonomi = '----';
    			else {
    			     autonomi = '<SPAN class=whiteOnRed>'+ timestrShort(timeLeft) +'</span>';
                    	}
    	  	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ autonomi +"</td>";
    	  	       } else {
    	  	       
    	  	         m += "<TD align=right width=81 style='background:#e8e8e8;color:black;'>---</td>";
    	  	       }
    	 	          
    
    	 	}
    	 str += "<tr><td style='background: #e8e8e8' align=right><b>Langt für</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m+"</tr>"; 
         var m="";
	 var unitTotal=0;
	  str += "<tr><td><br></td></tr>";
	 if (unsafeWindow.arStrings.unitName["u1"]) {
	  
	 	
	 
	            style = " style = 'background: #e8e8e8'";
	            
	 	 for(var i=0; i<Cities.numCities; i++) {
	 	                        m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.troops[1].count()) +'</td>';
	 	                        unitTotal+=parseInt(Cities.cities[i].c.troops[1].count());
	 	 }
	          str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.unitName["u1"]+"</td><td "+style+" align=right>"+addCommas(unitTotal)+" "+ m + "</tr>"; 
	         
	 }
	   var m="";
	 var unitTotal=0;
	 if (unsafeWindow.arStrings.unitName["u9"]) {
	  
	 	        style = '';
	
	            
	 	 for(var i=0; i<Cities.numCities; i++) {
	 	                        m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.troops[9].count()) +'</td>';
	 	                        unitTotal+=parseInt(Cities.cities[i].c.troops[9].count());
	 	 }
	          str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.unitName["u9"]+"</td><td "+style+" align=right>"+addCommas(unitTotal)+" "+ m + "</tr>"; 
	         
	 }
	         
        str += "<tr><td><br></td></tr>";
    t.statpourTr.innerHTML = str;
    t.displayTimer = setTimeout (t.show, 2500);
  },
  
  
  /******* transport ****/
  verifierWagons: function() {
   var t = my.TranspAuto;
   var maxw=parseInt(Cities.cities[t.sourceCity.idx].c.troops[t.typetrp.value].count());
   var saisw=parseInt(t.Choixnbwagon.value);
   if (saisw > maxw) {
      t.Choixnbwagon.value=maxw;
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>La quantit&eacute; ne peut exc&eacute;der '+maxw+' !.</font>';
   }
   t.estimerRes();
  },
  estimerRes: function() {
   var t = my.TranspAuto;
   
   
   var esti = parseInt(unsafeWindow.Unit.stats[t.typetrp.value].load * t.Choixnbwagon.value * (1 + (unsafeWindow.player.technologies[10].bonus())));
    t.estimationRes.innerHTML = "<font size=3><b>" + addCommas(esti) + "</b></font>";
   //t.estimationRes.innerHTML += "<br>Estimation temps de marche : <b>" + m.friendEtaStr + "</b>" ; 
   
   // test sur les ressources choisit !
   
   var cityID = t.sourceCity.c.id;
   var ic=0;
   var resact=0;
   var ic_ty="gold"; 
   var ic_text="d'argent";
   resact = Cities.cities[t.sourceCity.idx].c.silver();
   if (document.getElementById("ChoixRess1").checked) { ic_ty="rec1";ic=1;ic_text="de nourriture";resact = parseInt(Cities.cities[t.sourceCity.idx].c.resources[1].count); }
   if (document.getElementById("ChoixRess2").checked) { ic_ty="rec2";ic=2;ic_text="de bois";resact = parseInt(Cities.cities[t.sourceCity.idx].c.resources[2].count); }
   if (document.getElementById("ChoixRess3").checked) { ic_ty="rec3";ic=3;ic_text="de pierre";resact = parseInt(Cities.cities[t.sourceCity.idx].c.resources[3].count); }
   if (document.getElementById("ChoixRess4").checked) { ic_ty="rec4";ic=4;ic_text="de minerais";resact = parseInt(Cities.cities[t.sourceCity.idx].c.resources[4].count); }

  
   if (resact < esti) {
     var nbparunit = parseInt(unsafeWindow.Unit.stats[t.typetrp.value].load * 1 * (1 + (unsafeWindow.player.technologies[10].bonus())));
     var uniteness = Math.round(resact / nbparunit) - 1;
     //t.estimationRes.innerHTML += "<br><font color=red><b>Ressource disponible insuffisante :</b></font> Il vous faut <a id='TRPclickunit' href='#'>" + uniteness + "</a> ";
     //t.TTbutTransport.disabled = true;
    // document.getElementById ('TRPclickunit').addEventListener ('click', 
    // function() {
      t.Choixnbwagon.value = uniteness;
      t.TTbutTransport.disabled = false;
      
      t.estimerRes();
      
    // }, false);
   } else {
    //t.TTbutTransport.disabled = false;
   }
   
  }, 
  
  clickUniteMax: function() {
    var t = my.TranspAuto;
    var maxw=parseInt(Cities.cities[t.sourceCity.idx].c.troops[t.typetrp.value].count());
    
    
   /* var niveauPointRall=parseInt(getCityBuilding (t.sourceCity.id, 12).maxLevel); // 12=Point de ralliement
    if (niveauPointRall==11) {
       var maxtroupe=150000;
    } else {
       var maxtroupe=niveauPointRall*10000;
    }
    if (maxw>maxtroupe) maxw=maxtroupe;
    */
    t.Choixnbwagon.value=maxw;
    t.estimerRes();
  },
  clickTransportDo: function() {   // fonction pour faire le transport
   var t = my.TranspAuto;
   var SourceId = t.sourceCity.c.id;
   
   var DestinationId = t.destinationCity.c.id;

   nHtml.Click(document.getElementById("city_"+SourceId));
   
   if (!document.getElementById("ChoixRess0").checked && !document.getElementById("ChoixRess1").checked && !document.getElementById("ChoixRess2").checked && !document.getElementById("ChoixRess3").checked && !document.getElementById("ChoixRess4").checked) {
       t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Bitte,geben Sie zu befördernden Ressis ein !</font>';
      return;
   }
   if (t.sourceCity.c.x==t.destinationCityx.value && t.sourceCity.c.y==t.destinationCityy.value) {
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Unmöglich,kann nicht in den selben Stadt geliefert werden wo der Ausgangspunkt ist !.</font>';
     return;
   }
   if (parseInt(t.Choixnbwagon.value)=="0") {
   t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Unmöglich,zu Transportierende Mittel menge ist auf 0 !.</font>';
     return;
   }
   var x=t.destinationCityx.value;
   var y=t.destinationCityy.value;
   if (x == 0 || y == 0) {
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Vorsicht sie versuchen auf die Koordienaten 0,0 zu Transportieren !.</font>';
     return;
   }
   t.TTbutTransport.disabled=true;
   
   var c={};
   c.kid = 0;
   c.cid= t.sourceCity.c.id;
   c.type = "1";
   c.xcoord = x;
   c.ycoord = y;
   c.r1 = 0;
   c.r2 = 0; 
   c.r3 = 0; 
   c.r4 = 0; 
   c.gold = 0; 
   var cc=0;
   var esti =  parseInt(unsafeWindow.Unit.stats[t.typetrp.value].load * t.Choixnbwagon.value * (1 + (unsafeWindow.player.technologies[10].bonus())));
   if (document.getElementById("ChoixRess0").checked) { cc=0;c.gold = esti; }
   if (document.getElementById("ChoixRess1").checked) { cc=1;c.r1 = esti; }
   if (document.getElementById("ChoixRess2").checked) { cc=2;c.r2 = esti; }
   if (document.getElementById("ChoixRess3").checked) { cc=3;c.r3 = esti; }
   if (document.getElementById("ChoixRess4").checked) { cc=4;c.r4 = esti; }
   
   /*if (t.typetrp.value==1)  c.u1 = t.Choixnbwagon.value;
   if (t.typetrp.value==9)  c.u9 = t.Choixnbwagon.value;
   if (t.typetrp.value==7)  c.u7 = t.Choixnbwagon.value;
   if (t.typetrp.value==8)  c.u8 = t.Choixnbwagon.value;*/

  t.divTranportStatus.innerHTML = "<i><b>Ihr Auftrag ist in Arbeit....</b></i>";
  unsafeWindow.Modal.hideModalAll();
  unsafeWindow.March.open(1,x,y);
 
  setTimeout(function() {
  
   document.getElementById("modal_attack_unit_ipt_"+t.typetrp.value).value=t.Choixnbwagon.value;
   
   document.getElementById("modal_attack_resource_"+cc).value=esti;
   
   unsafeWindow.March.check(1);
   
   t.divTranportStatus.innerHTML ="<font color=red size='3px'><b>...<b></font>";
   t.TTbutTransport.disabled=false; 
  
  },1000);
 
 
/*  
  unsafeWindow.AjaxCall.gPostRequest("march.php",c,
      function(rslt){
         
          var t = my.TranspAuto;  
	  var rslt = transport;
          if (rslt.ok) {
          var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
	                     var ut = unsafeWindow.unixtime();
	                     var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
	                     for(i = 0; i <= unitsarr.length; i++){
	                     	if(params["u"+i]){
	                    	unitsarr[i] = params["u"+i];
	                    	}
	                     }
	                     var resources=new Array();
	                     resources[0] = params.gold;
	                     for(i=1; i<=4; i++){
	                    	resources[i] = params["r"+i];
	                     }
	                     var currentcityid =  t.sourceCity.id;
	                     unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
	                     //unsafeWindow.update_seed(rslt.updateSeed)
	                     if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
	                     //t.clickCitySourceSelect(t.sourceCity);
	                     t.divTranportStatus.innerHTML = "<font size='3px'><b>Transport effectu&eacute;.</b>";
                   t.TTbutTransport.disabled=false;
          
          } else {
		    t.divTranportStatus.innerHTML ="<font color=red size='3px'><b>Erreur, merci de recommencer !<b></font>";
		     if (rslt.msg) {
		               t.divTranportStatus.innerHTML +="<br><font color=black size='2px'>" + rslt.msg +"</font>";
         	     }
                    t.TTbutTransport.disabled=false;
          }       
          
        }, function (rslt) {
          
           var t = my.TranspAuto;
           t.divTranportStatus.innerHTML ="<font color=red size='3px'><b>Erreur, merci de recommencer !<b></font>";
           t.TTbutTransport.disabled=false; 
        }
    );
  */     
          
     
  },
  
  clickCitySourceSelect : function (city){
    var t = my.TranspAuto;
    t.sourceCity = city;
    t.TTbutTransport.disabled=false;
    // en cas de changement de ville, faire le test et mettre quantite max
    //var maxw=parseInt(rows[t.typetrp.value][t.sourceCity.idx]);
    //var saisw=parseInt(t.Choixnbwagon.value);
    //if (saisw > maxw)  t.Choixnbwagon.value=maxw;
    t.estimerRes();
   },
   clickCityDestinationSelect : function (city){
    var t = my.TranspAuto;
    t.destinationCity = city;
    t.destinationCityx.value=t.destinationCity.c.x;
    t.destinationCityy.value=t.destinationCity.c.y;
    t.TTbutTransport.disabled=false;
    t.estimerRes();
   }, 
 
}





my.Crests = {
  cont : null,
  state : null,

  init : function (div){
    var t = my.Crests;
    this.cont = document.createElement('div');
    return t.cont;
  },
  

  getContent : function (){
    var t = my.Crests;
    return t.cont;
  },

  hide : function (){
    var t = my.Crests;
  },

  show : function (){ 
    var t = my.Crests;
    
   
	var auguste,tiberus,caligula,claude,vespasien;
	if (unsafeWindow.items[1101].count>0){auguste=unsafeWindow.items[1101].count}else{auguste=0};
	if (unsafeWindow.items[1102].count>0){tiberus=unsafeWindow.items[1102].count}else{tiberus=0};
	if (unsafeWindow.items[1103].count>0){caligula=unsafeWindow.items[1103].count}else{caligula=0};
	if (unsafeWindow.items[1104].count>0){claude=unsafeWindow.items[1104].count}else{claude=0};
	if (unsafeWindow.items[1105].count>0){vespasien=unsafeWindow.items[1105].count}else{vespasien=0};

	if (Cities.cities[1]){ville2="#99EE99";}else{ville2="#EE9999";}
	if (Cities.cities[2]){ville3="#99EE99";}else{ville3="#EE9999";}
	if (Cities.cities[3]){ville4="#99EE99";}else{ville4="#EE9999";}
   
   if (t.state == null){
    
      var m = '<style>\
CAPTION.MYTABLE\
  {\
     background-color:eeffff;\
     color:black;\
     border-style:solid;\
     border-width:1px;\
     border-color:black;\
  }\
  TABLE.MYTABLE\
  { \
     font-family:arial;\
     border-collapse:collapse;\
     font-size:12pt;\
     background-color:F5F5F5;\
     width:100%;\
     border-style:solid;\
     border-color:black;\
     border-width:1px;\
  }\
\
  TH.MYTABLE\
  {\
     font-size:12pt;\
     color:black;\
     text-align:center;\
     border-style:solid;\
     border-color:black;\
     border-width:1px;\
  }\
\
\
  TR.MYTABLE\
  { \
  }\
\
  TD.MYTABLE\
  {  \
     font-size:12pt;\
     background-color:FFFFE5;\
     color:black;\
     border-style:solid;\
     border-width:1px;\
     text-align:left;\
  }\
</style>\
\
<TABLE CLASS="MYTABLE" CELLPADDING=3 CELLSPACING=0 align=center>\
    <CAPTION CLASS="MYTABLE"><center><b>Um weiter Städte zu Gründen braucht man diese Siegel!</CAPTION>\
    \
    <THEAD >\
      <TR CLASS="MYTABLE">\
        <TH CLASS="MYTABLE">Städte</TH>\
        <TH CLASS="MYTABLE">Bedarf</TH>\
      </TR>\
    </THEAD>\
    \
    <TBODY>\
      <TR CLASS="MYTABLE">\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';"><b><center>Stadt 2</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">Level 7 (Aktuelle : ' + unsafeWindow.player.level + ')\
        <br>5 Kohortes</TD>\
      </TR>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';"><b><center>Stadt 3</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ ( (auguste>=10 && tiberus>=5 && caligula>=2)?"#99EE99":ville3 ) +';">'+auguste+' / 10 '+unsafeWindow.arStrings.itemName["i1101"]+'<br>'+tiberus+' / 5 '+unsafeWindow.arStrings.itemName["i1102"]+'<br>'+caligula+' / 2 '+unsafeWindow.arStrings.itemName["i1103"]+'</TD>\
      </TR>\
            <TR CLASS="MYTABLE">  \
              <TD CLASS="MYTABLE" style="background-color:'+ville4+';"><b><center>Stadt 4</TD>\
              <TD CLASS="MYTABLE" style="background-color:'+ ( (auguste>=20 && tiberus>=15 && caligula>=9)?"#99EE99":ville4 ) +';">'+auguste+' / 20 '+unsafeWindow.arStrings.itemName["i1101"]+'\
              <br>'+tiberus+' / 15 '+unsafeWindow.arStrings.itemName["i1102"]+'\
              <br>'+caligula+' / 9 '+unsafeWindow.arStrings.itemName["i1103"]+'\
              <br>'+claude+' / 4 '+unsafeWindow.arStrings.itemName["i1104"]+'\
              <br>'+vespasien+' / 2 '+unsafeWindow.arStrings.itemName["i1105"]+'\
              </TD>\
      </TR>\
    </TBODY>\
  </TABLE>';
      t.cont.innerHTML = m;
      t.state = 1;
    }
  },

}

/************************ Gold Collector ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].c.id] = 0;
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
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var since = unixTime() - t.lastCollect['c'+city.c.id];
      if (since>60*60 && city.c.population.happiness()>71){
        t.lastCollect['c'+city.c.id] = unixTime();
        t.colCityName = city.c.name;
        t.ajaxCollectGold (city.c, t.e_ajaxDone); 
        break;
      }
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
    //logit(rslt.ok);
  },
  
  ajaxCollectGold : function (city, notify){
    var c={};
    c.cid=city.id;
    c.eventid=1;
    //logit("Collect "+city.name +" !" );
    unsafeWindow.AjaxCall.gPostRequest("coliseumEvent.php",c,
    function(rslt){
       if (notify)  
        notify (rslt);
      }, function (rslt) {
        if (notify)  
          notify (rslt);
      }
    );
  },
}

/************************ Collecte de ressources en auto ************************/
var CollectRessource = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectRessource;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].c.id] = 0;
    if (Options.pbRessEnable)
      t.setEnable (true);
  },
  
  setEnable : function (tf){
    var t = CollectRessource;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectRessource;
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var since = unixTime() - t.lastCollect['c'+city.c.id];
      //logit("CollectRessource tentative :  "+since +" ! " +  unsafeWindow.player.resourceAutoCollectExpireTime);
      if (since>15*60 && document.getElementById("btn_collect_all").style.display!='none'){ //AutoCollect
        t.lastCollect['c'+city.c.id] = unixTime();
        t.colCityName = city.c.name;
        t.ajaxCollectRessource (city.c, t.e_ajaxDone); 
        break;
      }
    }
    t.timer = setTimeout (t.tick, 30000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectRessource;
    //logit(rslt.ok);
  },
  
  ajaxCollectRessource : function (city, notify){
    var c={};
    c.cid=city.id;
    //logit("CollectRessource "+city.name +" !" );
    unsafeWindow.AjaxCall.gPostRequest("collectResource.php",c,
    function(rslt){
       if (notify)  
        notify (rslt);
      }, function (rslt) {
        if (notify)  
          notify (rslt);
      }
    );
  },
}

/********** BUILDING !!! ****/
my.build = {
    myDiv: null,
    cont:null,
    timer: null,
    buildTab: null,
    koc_buildslot: null,
    currentBuildMode: null,
    buildStates: [],
	loaded_bQ: [],
	lbQ: [],
   init : function (){
    var t = my.build;
    t.cont = document.createElement('div');
    return t.cont;
   },
     getContent : function (){
       var t = my.build;
       return t.cont;
     },
   
     hide : function (){
       var t = my.build;
     },

   show: function(){
        var t = my.build;
        t.myDiv = t.cont;
        t.koc_buildslot = unsafeWindow.Building.buildslot; //save original koc function
        t.currentBuildMode = "build";
		t.buildStates = {
            running: false,
			help: false,
        };
        
        return false;
        
        t.readBuildStates();
        
        for (var i = 0; i < Cities.cities.length; i++) {
            t["bQ_" + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + Cities.cities[i].c.id, '[]'));
			if (typeof t["bQ_" + Cities.cities[i].c.id] == 'undefined' || (t["bQ_" + Cities.cities[i].c.id]) == "") {
				t["bQ_" + Cities.cities[i].c.id] = [];
			}
        }
  
     var m = '<DIV id=pbBuildDivF class=pbStat>BUILD FUNCTIONS</div><TABLE id=pbbuildfunctions width=100% height=0% class=pbTab><TR>';
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
    		m += '<TD><INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>Ask for help?</td>';
    		m += '</tr></table></div>';
            m += '<DIV id=pbBuildDivQ class=pbStat>BUILD QUEUES</div><TABLE id=pbbuildqueues width=100% height=0% class=ptentry><TR>';
    		for (var i = 0; i < Cities.cities.length; i++) {
                m += '<TD colspan=2><CENTER><B>' + Cities.cities[i].c.name + '</b></center></td>';
            }
    		m += '</tr><TR>';
            for (var i = 0; i < Cities.cities.length; i++) {
                m += '<TD colspan=2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].c.id + ' type=submit value="Show"></center></td>';
            }
            m += '</tr><TR>';
            for (var i = 0; i < Cities.cities.length; i++) {
                m += '<TD>Qc:</td><TD id=pbbuildcount_' + Cities.cities[i].c.id + '>' + t["bQ_" + Cities.cities[i].c.id].length + '</td>';
            }
            m += '</tr><TR>';
            for (var i = 0; i < Cities.cities.length; i++) {
                t['totalTime_' + Cities.cities[i].c.id] = 0;
                cbQ = t["bQ_" + Cities.cities[i].c.id];
                if (typeof cbQ != 'undefined') {
                    for (var j = 0; j < cbQ.length; j++) {
                        t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].c.id]) + parseInt(cbQ[j].buildingTime);
                    }
                    timestring = timestr(t['totalTime_' + Cities.cities[i].c.id]);
                }
                m += '<TD>Tt:</td><TD id=pbbuildtotal_' + Cities.cities[i].c.id + '>' + timestring + '</td>';
            }
            m += '</tr></table><SPAN class=boldRed id=pbbuildError></span>';
            t.myDiv.innerHTML = m;
            
            for (var i = 0; i < Cities.cities.length; i++) {
                var cityId = Cities.cities[i].c.id;
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
    		document.getElementById('pbHelpRequest').addEventListener ('change', function (){
            t.buildStates.help = (document.getElementById('pbHelpRequest').checked);
            t.saveBuildStates();
            }, false);
       	    
    		window.addEventListener('unload', t.onUnload, false);
            
            function addQueueEventListener(cityId, name){
                document.getElementById(name).addEventListener('click', function(){
                    t.showBuildQueue(cityId, true);
                }, false);
            }
        },
    	setBuildMode: function (type) {
    	    var t = my.build;
    		t.currentBuildMode = type;
	},
e_autoBuild: function(){
      var t = my.build;
	    document.getElementById('pbbuildError').innerHTML = '';
      if (t.buildStates.running == true) {
          var now = unixTime();
		  //logit ('Seed.queue_con: (now='+ now +')\n'+ inspect (Seed.queue_con, 3));
          for (var i = 0; i < Cities.cities.length; i++) {
              var cityId = Cities.cities[i].c.id;
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
		var t = my.build;
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
				actionLog("Queue item deleted: Building Level equals 9 or higher!!!");
				return;
			};
			if (isNaN(curlvl)) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Found no correct value for current building!!!!");
				return;
			}
			if (l_bdgid != bdgid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Building Type does not match!!!!");
				return;
			}
			if (l_bid != bid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Building ID does not match!!!!");
				return;
			}
			if (l_curlvl < curlvl) {
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog("Queue item deleted: Buildinglevel is equal or higher!!!");
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
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/destruct.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function(rslt){
						if (rslt.ok) {
							actionLog("Destructing " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " at " + cityName);
							Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
							if (params.cid == unsafeWindow.currentcityid) 
								unsafeWindow.update_bdg();
							if (document.getElementById('pbHelpRequest').checked == true)
								t.bot_gethelp(params.bid, currentcityid);
							t.cancelQueueElement(0, currentcityid, time, false);
						} else {
							var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
							t.requeueQueueElement(bQi);
							document.getElementById('pbbuildError').innerHTML = errmsg;
							logit(errmsg);
						}
					},
					onFailure: function(){
						document.getElementById('pbbuildError').innerHTML = "Connection Error while destructing! Please try later again";
					}
				})
			}
			if (mode == 'build') {
				var invalid = false;
				var chk = unsafeWindow.checkreq("bdg", bdgid, curlvl); //check if all requirements are met
				for (var c = 0; c < chk[3].length; c++) {
					if (chk[3][c] == 0) {
						invalid = true;
					}
				}
				if (invalid == false) {							
					var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
					params.cid = currentcityid;
					params.bid = "";
					params.pos = citpos;
					params.lv = curlvl + 1;
					if (params.lv > 9){ //make sure that no level 10+ is built
						t.cancelQueueElement(0, currentcityid, time, false);
						actionLog("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!");
						return;
					}
					if (params.lv > 1) {
						params.bid = bid;
					}
					params.type = bdgid;
					
					new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/construct.php" + unsafeWindow.g_ajaxsuffix, {
						method: "post",
						parameters: params,
						onSuccess: function(rslt){
							if (rslt.ok) {
								actionLog("Building " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " Level " + params.lv + " at " + cityName);								
								Seed.resources["city" + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][1]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][2]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][3]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][4]) * mult * 3600;
								Seed.citystats["city" + currentcityid].gold[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][5]) * mult;
								Seed.queue_con["city" + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(),  unsafeWindow.unixtime() + time, 0, time, citpos]);						
								if (params.cid == unsafeWindow.currentcityid) 
									unsafeWindow.update_bdg();
								if (document.getElementById('pbHelpRequest').checked == true)
									t.bot_gethelp(params.bid, currentcityid);
								t.cancelQueueElement(0, currentcityid, time, false);
							} else {
								var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
								if (rslt.error_code == 103) { // building has already the target level => just  delete
									t.cancelQueueElement(0, currentcityid, time, false);
									actionLog("Queue item deleted: Building at this Level already exists or build process already started!");
								} else {
									t.requeueQueueElement(bQi);
									document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].c.name +': '+ errmsg + " Item was requeued. Check for retry count.";
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
			actionLog("Queue item deleted: Building does not exist!!!");
		}
	},
	requeueQueueElement: function (bQi) {
	    var t = my.build;
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
    bot_buildslot: function(c, a){
        var t = my.build;
        alert('ici');
	var cityId = t.getCurrentCityId();
        var buildingPos   = c.id.split("_")[1];
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
	    var t = my.build;
		var now = unixTime();
		if (buildingMode == 'build') {
			var buildingMult = Math.pow(2, buildingLevel);
        } 
		if (buildingMode == 'destruct') {
			var buildingMult = Math.pow(2, buildingLevel - 2);
		}
				
		var knights = Seed.knights["city" + cityId];
		if (knights) {
			var polKniId = parseInt(Seed.leaders['city' + cityId].politicsKnightId);
			if (polKniId) {
				var polValue = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politics);
				var polBoost = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politicsBoostExpireUnixtime);
				if ((polBoost - now) > 0) {
					polValue = parseInt(polValue * 1.25);
				}
			} else {
				polValue = 0;
			}
		} else {
			polValue = 0;
		}
        
        var buildingTime = unsafeWindow.buildingcost["bdg" + buildingType][7] * buildingMult;
        if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
            buildingTime = 15;
        }
		if (buildingMode == 'build') {
			buildingTime = parseInt(buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16)));
        } 
		if (buildingMode == 'destruct') {
			buildingTime = buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16));
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
	var t = my.build;
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
	    var t = my.build;
        var timeout = 10000;
        var content = "autoclose after 10sec...<br><br>"
        content += message;
        unsafeWindow.Modal.showAlert(content);
        window.setTimeout('unsafeWindow.Modal.hideModal();', timeout);
    },
	modifyTotalTime: function (cityId, type, buildingTime) {
	    var t = my.build;
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
        var t = my.build;
		//unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
    },
    onUnload: function(){
        var t = my.build;
        for (var i = 0; i < Cities.cities.length; i++) {
            //t["bQ_" + Cities.cities[i].c.id] = []; //clean up if needed
            GM_setValue('bQ_' + getServerId() + '_' + Cities.cities[i].c.id, JSON2.stringify((t["bQ_" + Cities.cities[i].c.id])));
        }
        t.saveBuildStates();
    },
    _addTab: function(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode){
		var t = my.build;
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
        row.insertCell(6).innerHTML = '<a class="button20" id="queuecancel_' + queueId + '"><span>Cancel</span></a>';
        document.getElementById('queuecancel_' + queueId).addEventListener('click', function(){
            t.cancelQueueElement(queueId, cityId, buildingTime, true);
        }, false);
    },
    cancelQueueElement: function(queueId, cityId, buildingTime, showQueue){
        var t = my.build;
        var queueId = parseInt(queueId);
        t["bQ_" + cityId].splice(queueId, 1);
        t.modifyTotalTime(cityId, 'decrease', buildingTime); //adjust total Time	
        
        if (showQueue == true) {
            t.showBuildQueue(cityId, false);
        }
    },
    showBuildQueue: function(cityId, focus){
	    var t = my.build;
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
        var t = my.build;
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
	    var t = my.build;
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
	var t = my.build;
        var serverID = getServerId();
        alert("sauvegarde");
        GM_setValue('buildStates_' + serverID, JSON2.stringify(t.buildStates));
    },
    readBuildStates: function(){
        var t = my.build;
        var serverID = getServerId();
        s = GM_getValue('buildStates_' + serverID);
        if (s != null) {
            states = JSON2.parse(s);
            for (k in states) 
                t.buildStates[k] = states[k];
        }
    },
    toggleStateRunning: function(obj){
		var t = my.build;
		alert("toggleStateRunning");
        if (t.buildStates.running == true) {
            t.buildStates.running = false;
            t.saveBuildStates();
            obj.value = "Auto Build = OFF";
        }
        else {
            t.buildStates.running = true;
            t.saveBuildStates();
            obj.value = "Auto Build = ON";
        }
    },
    toggleStateMode: function(obj){
		var t = my.build;
		alert("toggleStateMode");
        if (obj.value == 'Build Mode = OFF') {
			unsafeWindow.Building.buildslot = t.bot_buildslot; // overwrite original koc function
            obj.value = "Build Mode = ON";
        }
        else {
			unsafeWindow.Building.buildslot = t.koc_buildslot; // restore original koc function
			obj.value = "Build Mode = OFF";
        }
    },
	getCityNameById: function (cityId) {
    return Cities.byID[cityId].c.name;  	
	},
}

/*********************************** Options Tab ***********************************/

my.Options = {
  cont : null,
  state : null,
  fixAvailable : {},

  init : function (){
    var t = my.Options;
    t.cont = document.createElement('div');
    return t.cont;
  },


  getContent : function (){
    var t = my.Options;
    return t.cont;
  },

  togOpt : function (checkboxId, optionName, callEnable, callIsAvailable){
    var t = my.Options;
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


  show : function (){
    var t = my.Options;
      try {      
        m = '<DIV style="height:580px; max-height:580px; overflow-y:auto"><TABLE class=ptTab>\
          <TR><TD colspan=2><font size=4><B><u>Einstellung des GoR KONTROLL:</u></b></font><br></td></tr>\
          <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Verschieben des KONTROLL Fensters herlauben</td></tr>\
         <TR><TD><INPUT id=pbGoldEnable type=checkbox /></td><TD>Organisiert automatisch Silber einhollung bei Glück >= <INPUT id=pbgoldLimit type=text size=2 maxlength=3 \>%)</td></tr>\
         <TR><TD><INPUT id=pbRessEnable type=checkbox /></td><TD>Auto  ressources ein hollen alle  <INPUT id=pbLimitRess type=text size=2 maxlength=3 \> minuten</td></tr>\
        <TR><TD>&nbsp;</td><td>Markiere Nahrung Rot wenn angegebene Zeit unterschritten <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> Stunden</td></tr>\
        <TR><TD colspan=2><B>Chat Einstellungen  :</b></td></tr>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>Verschiebt Chat Fenster nach rechts</td></tr>\
        <TR><TD><INPUT id=ptEnableFoodWarnTchat type=checkbox /></td><TD>Ins Allianz Chat Posten wenn die Nahrung weniger als oben angegebene Stunden ausreicht</td></tr>\
        <TR><TD><INPUT id=HelpReq type=checkbox /></td><TD>Auf die Hilfsbitten automatisch klicken</td></tr>\
        <TR><TD><INPUT id=DelReq type=checkbox /></td><TD>Die Hilfsbitten automatisch beseitigen</td></tr>\
        <TR><TD colspan=2><BR><B>Einstellung Turmalarm :</b></td></tr>\
	<TR><TD><INPUT id=pcalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Postet Benachrichtigung automatisch Allianz Chat bei einem angriff</td></tr>\
        </table></table><BR><BR><HR>'+ miseajour+'</div>'
        t.cont.innerHTML = m;
 
        t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
        t.togOpt ('ptEnableFoodWarnTchat', 'enableFoodWarnTchat', FoodAlerts.init);
	t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
	t.togOpt ('pbRessEnable', 'pbRessEnable', CollectRessource.setEnable);
	t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
	t.togOpt ('HelpReq', 'HelpRequest');
	t.togOpt ('DelReq', 'DeleteRequest');
	t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
	t.changeOpt ('pbLimitRess', 'pbRessTime');
	document.getElementById('optFoodHours').addEventListener ('change', function () {
	            var x = document.getElementById('optFoodHours').value; 
	            if (isNaN(x) || x<0.01 || x>99999){
	              document.getElementById('optFoodHours').value = Options.foodWarnHours;
	              return;
	            }
	            Options.foodWarnHours = x; 
	            saveOptions();
	          }, false);
  
      } catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
 
   },
   
   hide : function (){
    },

    togOpt : function (checkboxId, optionName, callOnChange){
      var t = my.Options;
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
      var t = my.Options;
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
     e_alertOptChanged : function (){
      Options.alertConfig.aChat = document.getElementById('pcalertEnable').checked;
      saveOptions();
      TowerAlerts.setPostToChatOptions(Options.alertConfig);
  },	
}

/*************************************** Speed Tab ***********************************************/

my.Train4x = {
  cont : null,
  timer : null,
  state : null,
  stats : {},
  selectedCity : null,

  init : function (){
    var t = my.Train4x;
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.Train4x;
    return t.cont;
  },

  hide : function (){
    var t = my.Train4x;
    clearTimeout (t.timer);
  },

  show : function (){
    var t = my.Train4x;
    clearTimeout (t.timer);
    if (t.state == null){
      s = "<DIV id=trainTopSelect style='height: 148px;'>\
        <DIV class=ptstat>Mit diesen screen kannst du schneller Truppen Trenieren!</div>\
        <TABLE width=100%><TR><TD class=xtab align=right>Trening Speed:</td><TD class=xtab width=2></td><TD width=300 class=xtab>\
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
        </select></td><TD class=xtabBR rowspan=2><INPUT type=CHECKBOX id=chkPop"+ (Options.maxIdlePop?' CHECKED ':'') +">\
        Um mehr Einheiten zu Trenieren. &nbsp; (Von Feld arbeit Arbeiter abziehen und feld arbeit einstellen!)</td></tr>\
        <TR><TD class=xtab align=right>Stadt:</td><TD class=xtab></td><TD class=xtab><SPAN id=ptspeedcity></span></td>";
      s += "</select></td>\
        </tr><TR><TD class=xtab align=right>Einheit Type:</td><TD class=xtab></td><TD class=xtab>\
        <SELECT id=selTroopType>\
          <option value='1'>Packesel</option>\
          <option value='2'>Rekrut</option>\
          <option value='3'>Legionär</option>\
          <option value='4'>Centurio</option>\
          <option value='5'>Scharmützler</option>\
          <option value='6'>Kavallerie</option>\
          <option value='7'>Blitzkavallerie</option>\
          <option value='8'>Ausrüstwagen</option>\
          <option value='9'>Skorpion</option>\
          <option value='10'>Rammbock</option>\
          <option value='11'>Balliste</option>\
        </select></td></tr>\
        <TR><TD class=xtab align=right># Einheiten:</td><TD class=xtab></td>\
        <TD class=xtab><INPUT id='trainNum' size=5 type='text' value='0'\>\
        &nbsp; <INPUT id='trainMax' type=submit value='max'\>\
        &nbsp; &nbsp; (max <span id=spanMaxTroops>0</span>)</td><TD class=xtab>\
        <INPUT id='trainDo' type=submit value='Train Troops'\>\
        </td></tr></table><BR></div>\
        <TABLE align=center width=425><TR><TD><div id=trainStatus style='overflow-y:auto; max-height:210px; height: 210px;'></div></td></tr></table>\
        <div id=divCityStats style='height: 290px; background: #ffb'></div>";
      t.cont.innerHTML = s;
            
      var dcp = new CdispCityPicker ('ptspeed', document.getElementById('ptspeedcity'), true, t.clickCitySelect, 0);   
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
    t.timer = setTimeout (t.show, 1200);
  },

  
  clickCheckIdlePop : function (){
    var t = my.Train4x;
    if (document.getElementById ('chkPop').checked)
      Options.maxIdlePop = true;
    else
      Options.maxIdlePop = false;
    saveOptions ();
    t.displayCityStats ();
    t.clickTroopSelect ();
  },

  clickDoTrain : function (){
    var t = my.Train4x;
    cityId = t.selectedCity.id;
    unitId = document.getElementById ('selTroopType').value;
    numUnits = document.getElementById ('trainNum').value;
    trainSpeed = parseInt(document.getElementById ('selTrainSpeed').value);
    t.displayCityStats ();
t.trainSpeed = trainSpeed;    // for debug trace
    if (t.stats.barracks < trainSpeed*2){
      document.getElementById ('trainStatus').innerHTML = "<FONT COLOR=#550000>You need at least "+ (trainSpeed*2) +" barracks in this city to train at "+ trainSpeed +"x speed.</font>";
      return;
    }
    if (isNaN(numUnits) || numUnits<300 || numUnits>t.stats.MaxTrain){
      if (t.stats.MaxTrain < 300)
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
    var t = my.Train4x;
    // unitcost: NAME, Food, Lumber, Stone, Iron, Silver, Pop, ?
    id = document.getElementById ('selTroopType').value;
    uc = unsafeWindow.unitcost['unt'+id];
    max = 9999999999;
    if ( (t.stats.food / uc[1]) < max)
      max = t.stats.food / uc[1];
    if ( (t.stats.Lumber / uc[2]) < max)
      max = t.stats.Lumber / uc[2];
    if ( (t.stats.stone / uc[3]) < max)
      max = t.stats.stone / uc[3];
    if ( (t.stats.Iron / uc[4]) < max)
      max = t.stats.Iron / uc[4];
    if ( (t.stats.idlePop / uc[6]) < max)
      max = t.stats.idlePop / uc[6];
    t.stats.MaxTrain = parseInt (max) - 25;
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
    document.getElementById('spanMaxTroops').innerHTML = t.stats.MaxTrain;
  },

  clickMax : function (){
    var t = my.Train4x;
    document.getElementById('trainNum').value = t.stats.MaxTrain;
  },

  clickCitySelect : function (city){
    var t = my.Train4x;
    document.getElementById('trainNum').value = '';
    t.selectedCity = city;
    t.displayCityStats ();
    t.clickTroopSelect();
    maxSpeed = parseInt(t.stats.barracks/2);
    if (maxSpeed > 10)
      maxSpeed = 10;
    document.getElementById('selTrainSpeed').value = maxSpeed;
  },


  displayCityStats : function (){
    var t = my.Train4x;
    cityId = t.selectedCity.id;
    div = document.getElementById ('divCityStats');
    t.stats.food = parseInt (Seed.resources['city'+cityId].rec1[0]/3600);
    t.stats.Lumber = parseInt (Seed.resources['city'+cityId].rec2[0]/3600);
    t.stats.stone = parseInt (Seed.resources['city'+cityId].rec3[0]/3600);
    t.stats.Iron = parseInt (Seed.resources['city'+cityId].rec4[0]/3600);
    t.stats.Silber = Seed.citystats['city'+cityId].gold[0];
    if (Options.maxIdlePop)
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]);
    else
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]) - parseInt(Seed.citystats['city'+cityId].pop[3]);
    t.stats.barracks = getCityBuilding (cityId, 13).count;
    m = '<CENTER><B>'+ Cities.byID[cityId].name +' &nbsp; ('+ Cities.byID[cityId].x +','+ Cities.byID[cityId].y +')</b></center><HR>';
    m += '<TABLE width=100%><TR align=center>\
      <TD class=xtab width=18%><B>Nahrung:</b></td>\
      <TD class=xtab width=16%><B>Holz:</b></td>\
      <TD class=xtab width=16%><B>Stein:</b></td>\
      <TD class=xtab width=16%><B>Eisen:</b></td>\
      <TD class=xtab width=16%><B>Silber:</b></td>\
      <TD class=xtab width=16%><B>Idle Pop:</b></td></tr>\
      <TR align=center><TD class=xtab>'+ addCommasInt(t.stats.Nahrung) +'</td>\
      <TD class=xtab>'+ addCommasInt(t.stats.Holz) +'</td>\
      <TD class=xtab>'+ addCommasInt(t.stats.Stein) +'</td>\
      <TD class=xtab>'+ addCommasInt(t.stats.Eisen) +'</td>\
      <TD class=xtab>'+ addCommasInt(t.stats.Silber) +'</td>\
      <TD class=xtab>'+ addCommasInt(t.stats.idlePop) +'</td>\
      </tr></table><BR>\
      <DIV style="overflow-y: auto; height:210px; max-height:210px"><table align=center><TR><TD class=xtab align=center colspan=4><B>Training Queue &nbsp; ('+ t.stats.barracks +' barracks)</b><BR><HR></td></tr>';

    t.stats.queued = 0;
    q = Seed.queue_unt['city'+cityId];
    if (q!=null && q.length > 0 ){
      t.stats.queued = q.length;
      now = unixTime();
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
        m+= '<TR valign=top><TD class=xtab>'+ q[i][1] +' '+ unsafeWindow.unitcost['unt'+q[i][0]][0]
            +'</td><TD width=30 class=xtab></td><TD class=xtab>'+  unsafeWindow.timestr(end - start)
            +'</td><TD class=xtab> &nbsp; &nbsp; (Actual: '+ unsafeWindow.timestr(actual) +')</td></tr>'
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
    var t = my.Train4x;
    try {
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
        t.dispTrainStatus ('<HR><B>Done queueing troops.</b> &nbsp; &nbsp; Refresh GofR a minute after the first group of troops is done training\
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


/*************************************** RESUME TAB ************************************************/


my.Overview = {
 
  cont : null,
  displayTimer : null,
  checkBox:null,
  
  checkBox1:null,
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
    var totalentre = 0;  
    var t = my.Overview;

    clearTimeout (t.displayTimer);


       dt = new Date ();
      dt.setTime (unsafeWindow.player.datejoinUnixTime * 1000);
      
      str = '<div style="height:580px;max-height:580px;overflow-y:auto"><DIV class=ptstat style="margin-top:2px; margin-bottom:2px; "><TABLE cellspacing=0 cellpadding=0 class=ptTab width=97% align=center>\
        <TR align=left><TD>' + unsafeWindow.player.name + ' <SPAN class=ptStatLight>Übersicht :</span> '+ dt.toLocaleDateString() +'</td>\
        <TD><SPAN class=ptStatLight>Macht : </span> ' + addCommasInt(unsafeWindow.player.might()) +'</td>\
        <TD><SPAN class=ptStatLight>Allianz : </span> ' + getMyAlliance()[1] + '</td>\
        <TD align=right><SPAN class=ptStatLight>Server :</span> ' + unsafeWindow.domainName +'</td></tr></table></div><span id="debugtest"></span>';

      str += "<TABLE class='ptTabOverview' cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=100></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
       
       
       
      for(i=0; i<Cities.numCities; i++) {
      
      
      Gate = Cities.cities[i].c.defending;
         if(Gate == 0) var couleurr="#77EE77";
         if(Gate != 0) var couleurr="#EE7777";
           str += "<TD width=81 style='background-color:"+couleurr+"' align=center><B>"+ Cities.cities[i].c.name +'</b><BR>('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+')</td>';
           
      }
    str +="</tr>";
    
    
    	
               str += "<tr><td><br></td></tr>";
            
            var m="";
      var popTotal=0;
      for(i=0; i<Cities.numCities; i++) {
                 m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.cap()) +"</td>";
                 popTotal+=parseInt(Cities.cities[i].c.population.cap());
      }
      str += "<tr><td style='background: #e8e8e8' align=right><b>Bevölkerungsgrenze</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 
      
      var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
                       m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.count()) +"</td>";
                       popTotal+=parseInt(Cities.cities[i].c.population.count());
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>Gegenwärtige Bevölkerung</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 
      
      var m="";
      var popTotal=0;
      for(i=0; i<Cities.numCities; i++) {
                 m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.labor()) +"</td>";
                 popTotal+=parseInt(Cities.cities[i].c.population.labor());
      }
      str += "<tr><td style='background: #e8e8e8' align=right><b>Arbeiter</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 

      var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
                       m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.count()-Cities.cities[i].c.population.labor()) +"</td>";
                       popTotal+=parseInt(Cities.cities[i].c.population.count()-Cities.cities[i].c.population.labor());
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>Verfügbare Bevölkerung</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 

   var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
                       m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.happiness()) +"</td>";
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>Glück</td><td style='background: #e8e8e8' align=right>&nbsp; "+ m+"</tr>"; 
   var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
                       m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.taxRate()) +" %</td>";
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>Steuer Satz</td><td style='background: #e8e8e8' align=right>&nbsp; "+ m+"</tr>"; 



    
      str += "<tr><td><br></td></tr>";
      var m="";
      var popTotal=0;
      for(i=0; i<Cities.numCities; i++) {
                 m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.count()) +"</td>";
                 popTotal+=parseInt(Cities.cities[i].c.population.count());
      }
      str += "<tr><td style='background: #e8e8e8' align=right><b>Bevölkerung</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 
      
      str += "<tr><td><br></td></tr>";
      var m="";
      var goldTotal=0;
      for(i=0; i<Cities.numCities; i++) {
                  m += "<TD width=81 style='background:#e8e8e8' align=right>"+ addCommas(Cities.cities[i].c.silver()) +'</td>';
                  goldTotal+=parseInt(Cities.cities[i].c.silver());
       }
      str += "<tr align=right><td style='background:#e8e8e8' align=right><b>Silber</td><td style='background:#e8e8e8' align=right>"+addCommas(goldTotal)+" "+ m + "</tr>" ; 
      
               
        for (var nbr=1; nbr<=4; nbr++) {
             if (nbr % 2)
		        style = '';
	     else
                    style = " style = 'background: #e8e8e8'";
            var m="";
            var resTotal=0;
            for(var i=0; i<Cities.numCities; i++) {
                        m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.resources[nbr].count) +'</td>';
                        resTotal+=parseInt(Cities.cities[i].c.resources[nbr].count);
             }
            str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.ResourceName[nbr]+"</td><td "+style+" align=right>"+addCommas(resTotal)+" "+ m+"</tr>"; 
      
  
        
          }
         str += "<tr><td><br></td></tr>";
        // Production de nourriture + ENTRETIEN !
        var m="";
	var prodTotal=0;
	for(i=0; i<Cities.numCities; i++) {
	           m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.resources[1].hourlyTotalRate())+"/"+unsafeWindow.arStrings.TimeStr.timeHr+"</td>";
	          prodTotal+=parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate());
	}
        str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.Production+"</td><td style='background: #e8e8e8' align=right>"+addCommas(prodTotal)+"/"+unsafeWindow.arStrings.TimeStr.timeHr+""+ m+"</tr>"; 
        var m="";
	var entTotal=0;
 	for(i=0; i<Cities.numCities; i++) {
 	       color='black';
 	       if ( parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) < Cities.cities[i].c.upkeep() ) color='red';
	           m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ addCommas(Cities.cities[i].c.upkeep())+"/"+unsafeWindow.arStrings.TimeStr.timeHr+"</td>";
	          entTotal+=parseInt(Cities.cities[i].c.upkeep());
	}
        str += "<tr><td style='background: #e8e8e8' align=right><b>"+unsafeWindow.arStrings.Common.UpKeep+"</td><td style='background: #e8e8e8' align=right>"+addCommas(entTotal)+"/"+unsafeWindow.arStrings.TimeStr.timeHr+""+ m+"</tr>"; 

        var m="";
	 	var entTotal=0;
	  	for(i=0; i<Cities.numCities; i++) {
	  	       color='black';
	  	       if ( parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) < parseInt(Cities.cities[i].c.upkeep()) ) {
	  	        // entretien supérieur à la production
	  	        difference = parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) - parseInt(Cities.cities[i].c.upkeep());
	  	        var timeLeft = parseInt(Cities.cities[i].c.resources[1].count)  / (0-difference) * 3600;
			if (timeLeft > 86313600)
			       autonomi = '----';
			else {
			     autonomi = '<SPAN class=whiteOnRed>'+ timestrShort(timeLeft) +'</span>';
                	}
	  	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ autonomi +"</td>";
	  	       } else {
	  	       
	  	         m += "<TD align=right width=81 style='background:#e8e8e8;color:black;'>---</td>";
	  	       }
	 	          

	 	}
	 str += "<tr><td style='background: #e8e8e8' align=right><b>NAH. Reicht für</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m+"</tr>"; 

         
        str += "<tr><td><br></td></tr>";
        
        for (var nbu=1; nbu<=12;nbu++) {
        
        var m="";
	var unitTotal=0;
	if (unsafeWindow.arStrings.unitName["u"+nbu]) {
	 if (nbu % 2)
	        style = '';
	 else
           style = " style = 'background: #e8e8e8'";
           
	 for(var i=0; i<Cities.numCities; i++) {
	                        m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.troops[nbu].count()) +'</td>';
	                        unitTotal+=parseInt(Cities.cities[i].c.troops[nbu].count());
	 }
         str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.unitName["u"+nbu]+"</td><td "+style+" align=right>"+addCommas(unitTotal)+" "+ m + "</tr>"; 
        
         }
        }
        
        str += "<tr><td><br></td></tr>";
        
        var m="";
		var genTotal=0;
	 	for(i=0; i<Cities.numCities; i++) {
	 	       color='black';
	 	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ Cities.cities[i].c.generalsCount()+"</td>";
		          genTotal+=parseInt(Cities.cities[i].c.generalsCount());
		}
	str += "<tr><td style='background: #e8e8e8' align=right><b>Generäle</td><td style='background: #e8e8e8' align=right>"+genTotal+""+m+"</tr>"; 
	
	
           str += "<tr><td><br></td></tr>";
        
        var m="";
	for(i=0; i<Cities.numCities; i++) {
	  color='black';
	  if (Cities.cities[i].c.queues.building.activeSlots()[0]) {
	   m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ timestrShort(Cities.cities[i].c.queues.building.activeSlots()[0].secondsLeft())+"</td>";
	  } else {
	   m += "<TD align=right width=81 style='background:#e8e8e8;color:red;'>"+ timestrShort(0)+"</td>";
	  }
	}
	str += "<tr><td style='background: #e8e8e8' align=right><b>Bau Aufträge</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m +"</tr>"; 
	
	var m="";
	for(i=0; i<Cities.numCities; i++) {
	  color='black';
	  if (Cities.cities[i].c.queues.research.activeSlots()[0]) {
	   m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ timestrShort(Cities.cities[i].c.queues.research.activeSlots()[0].secondsLeft())+"</td>";
	  } else {
	   m += "<TD align=right width=81 style='background:#e8e8e8;color:red;'>"+ timestrShort(0)+"</td>";
	  }
	}
	str += "<tr><td style='background: #e8e8e8' align=right><b>Forschung</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m +"</tr>"; 
	

         
      my.Overview.cont.innerHTML = str +'</div>';

  
    t.displayTimer = setTimeout (t.show, 5000);
  },
};


my.AllianceList = {
  cont : null,
  nombre: null,
  state : null,
  dat : [],

  init : function (){
    var t = my.AllianceList;
    t.cont = document.createElement('div');
    //t.nombre=0;
    //unsafeWindow.PTgetMembers = t.eventGetMembers;
    //unsafeWindow.PTDme = t.eventGetLienMember;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpl = t.clickedPlayerLeaderboard;
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;
    //unsafeWindow.PTalClickPrev = t.eventListPrev;
    //unsafeWindow.PTalClickNext = t.eventListNext;
    return t.cont;
  },
  getContent : function (){
    var t = my.AllianceList;
    return t.cont;
  },

  hide : function (){
    var t = my.AllianceList;

  },

  show : function (){
    var t = my.AllianceList;
    if (t.state == null){
    
     var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\
              <TR><TD class=xtab align=right></td><TD class=xtab>Name des Spielers : &nbsp;</td>\
                <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Suche Spieler" /></td>\
              <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
            <TR><TD class=xtab>oder</td><TD class=xtab>Name der Allianz : &nbsp;</td>\
             <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit DISABLED type=submit value="Suche Allianz" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
             </table><span style="vertical-align:middle;" id=altInput></span></div>\
          <SPAN id=allListOut></span>';
      t.cont.innerHTML = m;
    
    document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
    document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
      t.state = 1;
    }
    
  },
  eventPlayerSubmit : function (){
      var t = my.AllianceList;
      document.getElementById('ptplayErr').innerHTML='';
      var name = document.getElementById('allPlayName').value;
      t.pName = name;
      if (name.length < 3){
        document.getElementById('ptplayErr').innerHTML = 'Au moins 3 caracteres';
        return;
      }
      document.getElementById('altInput').innerHTML = '';
      document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Suche nach Ergebnisse...</center>';
      t.fetchPlayerList (name, t.eventGotPlayerList);
  },
  clickedPlayerLeaderboard : function (span, uid){
      var t = my.AllianceList;
      span.onclick = '';
      span.innerHTML = "Recherche sur le tableau d'honneur ...";
      t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },
  fetchLeaderboard : function (uid, notify) {
    unsafeWindow.AjaxCall.gPostRequest("getUserLeaderboard.php",{action:"view_player_detail", player_id:uid},
    function(rslt){
        notify (rslt);
   	},function(rslt){
   	        notify (rslt);
    	});
  },
  fetchPlayerList : function (name, notify){  
    unsafeWindow.AjaxCall.gPostRequest("searchPlayers.php",{subType:"ALLIANCE_INVITE", searchName:name},
    function(rslt){
        notify (rslt);
   	},function(rslt){
   	        notify (rslt);
    	});
  },
  gotPlayerLeaderboard : function (rslt, span){
      var t = my.AllianceList;
      if (!rslt.ok){
        span.innerHTML = rslt.errorMsg;
        return;
      }
      if (rslt.totalResults == 0){
        span.innerHTML = "<B>Lob für gute Leistungen :</b> Pas trouv&eacute; ! (sous la brume ?)";
        return;
      }
      var p = rslt.data[0];
      
      /*var an = p.allianceName;
      if (!an || an=='' || p.officerType==4)
        an = 'Aucun';
      else
        an += ' ('+ officerId2String(p.officerType) +')';
      m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Tabelle Ehre : </b></td><TD colspan=2> Macht : '+ p.might  +' &nbsp; Alliance : '+ an +'</td></tr>'; 
      for (var i=0; i<p.cities.length; i++){
        var c = p.cities[i];
        m += '<TR><TD align=right><B>Ville #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName 
        +' <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ c.xCoord +',' +c.yCoord+ ')</a></td><TD width=75%> &nbsp; Niveau : '
  
          + c.tileLevel +' &nbsp; &nbsp; status: '+ cityStatusString (c.cityStatus) +' &nbsp; &nbsp; cr&eacute;de : ' + c.dateCreated.substr(0,10) +'</td></tr>';
      }  */
      //span.innerHTML = m + '</table>';
      span.innerHTML = "<B>Tableau d'honneur :</b> Im Bau<br>Anzahl der Städte:"+p.numOfCities+"<br>Anzahl der Provinzen : "+p.numOfWilds;
  },
   eventGotPlayerList : function (rslt){
      var t = my.AllianceList;
      if (!rslt.ok){
        document.getElementById('allListOut').innerHTML = rslt.errorMsg;
        return;
      }
      t.playerList = rslt.matchedUsers;
      var uList = [];
      for (k in rslt.matchedUsers)
            uList.push (rslt.matchedUsers[k].userId);     
      t.fetchPlayerStatus (uList, function(r) {t.eventGotPlayerOnlineList(r)});    
  },  
  fetchPlayerStatus : function (uidArray, notify){
        unsafeWindow.AjaxCall.gPostRequest("getOnline.php",{checkArr:uidArray.join(',')},
	    function(rslt){
	        notify (rslt);
    	},function(rslt){
	        notify (rslt);
    	}); 
    },
   fetchPlayerInfo : function (uid, notify){
          unsafeWindow.AjaxCall.gPostRequest("getUserGeneralInfo.php",{uid:uid},
	 	    function(rslt){
	 	        notify (rslt);
	     	},function(rslt){
	 	        notify (rslt);
    	}); 
  },
   clickedPlayerDetail : function (span, uid){
        var t = my.AllianceList;
        span.onclick = '';
        span.innerHTML = "Recherche d&eacute;tails ...";
        t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },
   gotPlayerDetail : function (rslt, span){
      var t = my.AllianceList;
      if (!rslt.ok){
        span.innerHTML = rslt.errorMsg;
        return;
      }
      var u = rslt.userInfo[0];
      var a = 'Aucun';
      if (u.allianceName)
        a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
      var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>D&eacute;tails:</b> &nbsp; </td><TD>Alliance : '+ a +' &nbsp; Städte : '
            + u.cities +' &nbsp; Population : '+ u.population +'</td></tr><TR><TD></td><TD>Provinces : ';
      var pids = u.provinceIds.split (',');
      var p = [];
      for (var i=0; i<pids.length; i++)
        p.push(unsafeWindow.arStrings.provinceName['p'+pids[i]]);
      span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },
   eventGotPlayerOnlineList : function (rslt){
          var t = my.AllianceList;
          if (!rslt.ok){
            document.getElementById('allListOut').innerHTML = rslt.errorMsg;
            return;
      }
      var m = '<DIV class=ptstat>Such Ergebnise; <B>"'+ t.pName +'"</b></div>\
        <DIV style="height:575px; max-height:575px; overflow-y:auto">\
        <TABLE width=95% align=center class=ptTab cellspacing=0><TR style="font-weight:bold"><TD width=20%>Name</td>\
        <TD align=right>Macht &nbsp;&nbsp;&nbsp;&nbsp;</td><TD>&nbsp;</td><TD width=60%>Weitere Informationen</td></tr>';
      var row=0;
      var cl='';
      for (k in t.playerList){
        var u = t.playerList[k];
        if (++row % 2)
          cl = 'class=ptOddrow ';
        else
          cl = '';
          if (u.allianceName) { var alliancenammme=u.allianceName; }else {var alliancenammme="---"; }
        m += '<TR '+ cl +'valign=top><TD>'+ u.genderAndName +'<br>'+alliancenammme+'<br><A target="_tab" href="http://www.facebook.com/profile.php?id='+ u.fbuid +'">Profil</a></td><TD align=center>&nbsp;'+ addCommasInt(u.might) +'&nbsp;</td>\
            <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed>Online</span>":"") +'</td>\
           <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A>Details</a></span><br><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A>Zu letzt Online</a></span></td></tr>';
      }
      m += '</table></div>';
      document.getElementById('allListOut').innerHTML = m;
  },
  
  
  clickedPlayerGetLastLogin : function (span, uid){
        var t = my.AllianceList;
        span.onclick = '';
        span.innerHTML = "Recherche...";
        t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
  },
  fetchPlayerLastLogin : function (uid, notify){
     
       unsafeWindow.AjaxCall.gPostRequest("viewCourt.php",{pid:uid},
      	   function(rslt){
      	        notify (rslt);
           },
           function(rslt){
      	        notify (rslt);
      });
  },
  gotPlayerLastLogin : function (rslt, span){
        var t = my.AllianceList;
        if (!rslt.ok){
          span.innerHTML = rslt.errorMsg;
          return;
        }
    
        var p = rslt.playerInfo;
        var lastLogin = rslt.playerInfo.lastLogin;
        
        if (lastLogin) {
          m = '<span style="color:black">'+lastLogin+'</span>';
        } else {
           m = '<span style="color:red">?</span>';
        }  
        span.innerHTML = m + '';
  },
}



function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "castleBut castleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.c.name;
      e.target.className = "castleBut castleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.c.x;
        that.coordBoxY.value = that.city.c.y;
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.c.x, that.city.c.y);
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
        eX.value = that.city.c.x;
        eY.value = that.city.c.y;
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
    my[currentName].show();
    Options.ptWinIsOpen = true;
  } else {
    my[currentName].hide();
    Options.ptWinIsOpen = false;
  }
  saveOptions();
}


function hideMe (){
  mainPop.show (false);
  my[currentName].hide();
  Options.ptWinIsOpen = false;
  saveOptions();
}

function logit (msg){
  var serverID = getServerId();
  var now = new Date();
  GM_log (serverID +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

function saveOptions (){
  var serverID = getServerId();
  GM_setValue ('BOOptions_'+serverID, JSON2.stringify(Options));
}

function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('BOOptions_'+serverID);
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
  a.id = 'ptOfficial';
  var tabs=document.getElementById('main_engagement_tabs');
  if(tabs) {
  
    //if (eNew.firstChild){
      tabs.insertBefore (a, tabs.firstChild);
    //}else{
      tabs.appendChild(a);
    // }
    
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}


function setCities(){
 logit(unsafeWindow.player.cities);
 if (unsafeWindow.player.cities) {
  
  
  var nbville=0;
  Cities.cities = [];
  Cities.byID = {};
  
   unsafeWindow.player.allCities().each(function(c){
   
    city = {};
    city.idx = nbville;
    //logit("ID de ville : " +c.id);
    city.id = parseInt(c.id);
    /*
    city.name = c.name;
    city.x = parseInt(c.x);
    city.y = parseInt(c.y);
    city.tileId = c.tileId;
    city.provId = c.provId;
    city.population = c.population;
    */
    city.c = c;
    Cities.cities[nbville] = city;
    Cities.byID[c.id] = city;
     nbville++;
    
   });
   

  Cities.numCities = nbville;
  
 }
}
 
function getMyAlliance(){
  if (unsafeWindow.seed.allianceDiplomacies==null || unsafeWindow.seed.allianceDiplomacies.allianceName==null)
    return [0, 'Aucune'];
  else
    return [unsafeWindow.seed.allianceDiplomacies.allianceId, unsafeWindow.seed.allianceDiplomacies.allianceName];
}
// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if (unsafeWindow.seed.allianceDiplomacies == null)
    return 'neutral';
  if (unsafeWindow.seed.allianceDiplomacies.friendly && unsafeWindow.seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (unsafeWindow.seed.allianceDiplomacies.hostile && unsafeWindow.seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  return 'neutral';
};

/************  LIB classes/functions .... **************/
function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x; 
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

// creates a 'popup' div
function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  // protos ...
  
  this.BASE_ZINDEX = 111111;
  
   if (unsafeWindow.cpopupWins == null)
        unsafeWindow.cpopupWins = {};
    unsafeWindow.cpopupWins[prefix] = this;
    
  this.stmaxh = height;
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainDiv = getMainDiv;
  this.getZindex = getZindex;
  this.setZindex = setZindex;
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
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX;        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'hidden';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
    
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="CPopupTop"><TD id="'+ prefix +'_top" width=99%></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color: #fff; background: #555; padding-left: 5px; padding-right: 5px; height:15px;">X</td></tr>\
      <TR><TD valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', new CeventXClose(this).handler, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);

  this.div.addEventListener ('mousedown', e_divClicked, false);

  function autoHeight (onoff){
     if (onoff) {
       t.div.style.height = '';  
       t.div.style.maxHeight ='';
    } else{
       t.div.style.height = t.stmaxh;
       t.div.style.maxHeight = t.stmaxh;
       }
  }
  
  function e_divClicked (){
    t.focusMe();
  }  
  function CeventXClose (that){
    var t = that;
    this.handler=handler;
    function handler (){
      t.show(false);
      if (t.onClose != null)
        t.onClose();
    }
  }
  
  function focusMe (){
   //alert((this.BASE_ZINDEX + 5));
    t.div.style.zIndex = (this.BASE_ZINDEX + 5);
    for (k in unsafeWindow.cpopupWins){
      if (k != t.prefix)
        unsafeWindow.cpopupWins[k].unfocusMe(); 
    }
  }
    function destroy (){
      document.body.removeChild(t.div);
      //WinManager.delete (t.prefix);
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
  function unfocusMe (){
    //alert((this.BASE_ZINDEX - 5));
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX - 5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }

  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }

  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = this.BASE_ZINDEX + zi;
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function setZindex(zi){
    this.div.style.zIndex = ''+zi;
  }

  function getZindex(){
    return parseInt(this.div.style.zIndex);
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
//t.dispEvent ('eventOUT', me);
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
//t.dispEvent ('eventMOVE', me);
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

String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;' };
String.prototype.htmlEntities = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
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
  if (v == undefined)
    return 'undefined';
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
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

// emulate protoype's Ajax.Request ...
function AjaxRequest (url, opts){
  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.7',
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
    if (rslt.ok){
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
    rslt.errorMsg = rslt.error_code ; //unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    //if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
    //  rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      //dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}


function cityStatusString (cs){
  if (cs==4)
    return 'Vacances';
  if (cs==3)
    return 'Truce';
  if (cs==2)
    return 'Beg Protection';
  return 'Normal';
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

function ById(id) {
	return document.getElementById(id);
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

function SelectAll(id)
{
 document.getElementById(id).focus();document.getElementById(id).select();
} 

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




function HandleChatPane() {
	var DisplayName = GetDisplayName();
	var AllianceChatBox=document.getElementById('mod_comm_list2');
	if(AllianceChatBox){
		var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if(chatPosts){
			for (var i = 0; i < chatPosts.snapshotLength; i++) {
				thisPost = chatPosts.snapshotItem(i);
				if(true){
				//if(this.options.autoHelpAlliance){
				
				var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				if(Options.HelpRequest){
				 if(postAuthor.snapshotItem(0)){
						var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
						if(postAuthorName != DisplayName){
							var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'Chat.helpAlliance')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
							if(helpAllianceLinks){
								for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
									thisLink = helpAllianceLinks.snapshotItem(j);
									var alreadyClicked = thisLink.getAttribute("clicked");
									if(!alreadyClicked){
										thisLink.setAttribute('clicked', 'true');
										var myregexp = /(Chat.helpAlliance\(.*\);)/;
										var match = myregexp.exec(thisLink.getAttribute("onclick"));
										if (match != null) {
											onclickCode = match[0];
											if(true){
												DoUnsafeWindow(onclickCode);
												AddToCommandHistory(onclickCode, 'alliance_help');
											}
										}
									}
								}
							}
						}
					}
				 }
				}
				// Hide alliance requests in chat
				if(Options.DeleteRequest){
					var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'Chat.helpAlliance')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
					if(helpAllianceLinks){
						for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
							thisLink = helpAllianceLinks.snapshotItem(j);
							thisLink.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode);
						}
					}
				}
				// Hide alliance reports in chat
				if(Options.DeleteRequest){
					var myregexp1 = /sur 5 joueurs aidant/i;
					var myregexp2 = /dans ce projet./i;
					var myregexp3 = /Impossible d\'apporter de l\'aide pour l\'instant/i;
					var myregexp4 = /5 personnes ont d/i;
					if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4)) {
						thisPost.parentNode.removeChild(thisPost);
					}
				}
			}	
		}	
	}
}	


function GetCommandHistory(history_log_name) {
	if(!history_log_name){
		var history_log_name = "default";
	}
	var json= "";
	if(json=='') json='{}';
	var json_object=JSON2.parse(json);
	if(!json_object['items']){
		json_object['items'] = Array();
	}
	return json_object;
}

function AddToCommandHistory(command_string, history_log_name, log_length_limit) {
	if(!command_string){ return false; }
	if(!history_log_name){ var history_log_name = "default"; }
	// Default to a history length of 20 commands
	if(!log_length_limit){ var log_length_limit = 20; }
	// Get the previous history of commands
	var previous_commands = GetCommandHistory(history_log_name);
	var items = previous_commands['items'];
	// Add the new command
	items.push(command_string);
	// Limit the history length
	if(items.length>log_length_limit){
		items = items.slice(items.length-log_length_limit);
	}
	previous_commands['items'] = items;
	//alert(history_log_name +' - '+JSON2.stringify(previous_commands));
	//History.push = {log_name_history_log_name,JSON2.stringify(previous_commands)};
	//alert(History.toSource());
}		

function FindInCommandHistory(command_string, history_log_name) {
	if(!command_string){ return false; }
	if(!history_log_name){ var history_log_name = "default"; }
	// Get the previous history of commands
	var previous_commands = GetCommandHistory(history_log_name);
	var items = previous_commands['items'];
	for(var i=0; i<items.length; i++){
		if(items[i] == command_string){
			return true;
		}
	}
	return false;
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
			this.Log("A javascript error has occurred when executing a function via DoUnsafeWindow. Error description: "+error.description);
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


String.prototype.StripQuotes = function() {
	return this.replace(/"/g,'');
};












setTimeout(function() { 



ptStartup (); 


}, 6000);

