// YouTube - EZ Download
// Version 0.4.9 BETA
// 2014-04-26
// Copyright (c) 2010-2012, Byron Rogers
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "YouTube - EZ Download", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			YouTube - EZ Download
// @namespace		http://www.Daem0nX.com (Daem0nX@gmail.com)
// @description		Adds menu (bottom right) with download links for available formats.
// @version			0.4.9
// @notes			2014.04.26 - 0.4.9<br/>Fixed broken download links due to YouTube code changes.<br/>Fixed %U to use the User name (uploader) instead of the Display name.<br/>Fixed Overlay showing behind the YouTube topbar.<br/>Removed unused images and variables.<br/>Upgraded jQuery from 1.8.3 to 2.1.0.<br/>Known issue - Some download links don't work or require multiple page refreshes. This will be looked into when possible.<br/><br/>2013.03.20 - 0.4.8<br/>Added support to check if the download link is valid on click.<br/>^If the download link has expired a message to refresh will be displayed.<br/>Fixed broken download links due to YouTube code changes.<br/>Known issue in Chrome - Clicking a download link will sometimes make the video restart or freeze.<br/><br/>2012.12.21 - 0.4.7<br/>Fixed broken download links due to YouTube code changes.<br/>Refactored code that parses download links - completely rebuilds link with expected querystring variables.<br/><br/>2012.12.17 - 0.4.6<br/>Fixed username (code %U) using incorrect value if logged into YouTube.<br/><br/>2012.12.06 - 0.4.5<br/>Fixed username and title (code %U and %T) not working due to YouTube code changes.<br/>Modified script meta data.<br/>^Added @grant for GM_getValue, GM_setValue, GM_deleteValue, GM_addStyle, GM_xmlhttpRequest, GM_log.<br/>Upgraded jQuery from 1.8.2 to 1.8.3.<br/><br/>2012.09.22 - 0.4.4<br/>Added format info for 17, 36.<br/>Fixed video length 00 seconds showing as 0.<br/>Upgraded jQuery from 1.7.2 to 1.8.2.<br/><br/>2012.09.13 - 0.4.3<br/>Fixed broken download links.<br/><br/>2012.05.05 - 0.4.2<br/>Fixed HTML5 video playback in Chrome.<br/><br/>2012.05.03 - 0.4.1<br/>Added support for HTML5 videos.<br/>Fixed Chrome download breaking currently playing video.<br/>^Download links now open in a new tab.<br/>Fixed username (video title %U) not working due to YouTube code changes.<br/>Fixed menu and overlay border radius not working in Firefox 13 beta.<br/>Upgraded jQuery from 1.6.2 to 1.7.2.<br/>^Changed jQuery calls .bind() and .unbind() to .on() and .off().
// @include			http*://youtube.com/watch?*
// @include			http*://*.youtube.com/watch?*
// @include			http*://youtube.com/watch#*
// @include			http*://*.youtube.com/watch#*
// @include			http*://youtube-nocookie.com/watch?*
// @include			http*://*.youtube-nocookie.com/watch?*
// @include			http*://youtube-nocookie.com/watch#*
// @include			http*://*.youtube-nocookie.com/watch#*
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest
// @grant			GM_log
// ==/UserScript==

// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
// Update Notification System
// ========================================================
// === Edit the next four lines to suit your script. ===
var scriptName = 'YouTube - EZ Download';
var scriptId = '87659';
var scriptVersion = '0.4.9';
var scriptUpdateText = '2014.04.26 - 0.4.9<br/>Fixed broken download links due to YouTube code changes.<br/>Fixed %U to use the User name (uploader) instead of the Display name.<br/>Fixed Overlay showing behind the YouTube topbar.<br/>Removed unused images and variables.<br/>Upgraded jQuery from 1.8.3 to 2.1.0.<br/>Known issue - Some download links don\'t work or require multiple page refreshes. This will be looked into when possible.<br/><br/>2013.03.20 - 0.4.8<br/>Added support to check if the download link is valid on click.<br/>^If the download link has expired a message to refresh will be displayed.<br/>Fixed broken download links due to YouTube code changes.<br/>Known issue in Chrome - Clicking a download link will sometimes make the video restart or freeze.<br/><br/>2012.12.21 - 0.4.7<br/>Fixed broken download links due to YouTube code changes.<br/>Refactored code that parses download links - completely rebuilds link with expected querystring variables.<br/><br/>2012.12.17 - 0.4.6<br/>Fixed username (code %U) using incorrect value if logged into YouTube.<br/><br/>2012.12.06 - 0.4.5<br/>Fixed username and title (code %U and %T) not working due to YouTube code changes.<br/>Modified script meta data.<br/>^Added @grant for GM_getValue, GM_setValue, GM_deleteValue, GM_addStyle, GM_xmlhttpRequest, GM_log.<br/>Upgraded jQuery from 1.8.2 to 1.8.3.<br/><br/>2012.09.22 - 0.4.4<br/>Added format info for 17, 36.<br/>Fixed video length 00 seconds showing as 0.<br/>Upgraded jQuery from 1.7.2 to 1.8.2.<br/><br/>2012.09.13 - 0.4.3<br/>Fixed broken download links.<br/><br/>2012.05.05 - 0.4.2<br/>Fixed HTML5 video playback in Chrome.<br/><br/>2012.05.03 - 0.4.1<br/>Added support for HTML5 videos.<br/>Fixed Chrome download breaking currently playing video.<br/>^Download links now open in a new tab.<br/>Fixed username (video title %U) not working due to YouTube code changes.<br/>Fixed menu and overlay border radius not working in Firefox 13 beta.<br/>Upgraded jQuery from 1.6.2 to 1.7.2.<br/>^Changed jQuery calls .bind() and .unbind() to .on() and .off().';
// === Stop editing here. ===

var debugUpdate = false;
var debugSettings = false;
var debugGM = false;
var isWebkit = false;
var donationLink_paypal = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KYUZ6SKY7YQCC';
var donationLink_flattr = 'https://flattr.com/thing/412439/YouTube-EZ-Download';
var videolistRefresh = false;

function GMlog(text) {
	if (debugGM) {
		//GM_log(text);
		//console.log(text);
		//use unsafeWindow due to Greasemonkey / Firebug issue
		unsafeWindow.console.log(text);
		// or
		//alert(text);
	}
}

/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});

//Extend to allow :regex
//  Can't use regex in :contains
jQuery.extend( jQuery.expr[':'], { regex: function(a, i, m, r) { var r = new RegExp(m[3], 'ig'); return r.test(jQuery(a).text()); } });

//jQuery browser plugin
//http://jquery.thewikies.com/browser/
(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);

//======================
//START JSON2
//======================
if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
return{stringify:function(value,replacer,space){var i;gap='';indent='';if(space){if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}}
if(!replacer){rep=function(key,value){if(!Object.hasOwnProperty.call(this,key)){return undefined;}
return value;};}else if(typeof replacer==='function'||(typeof replacer==='object'&&typeof replacer.length==='number')){rep=replacer;}else{throw new Error('JSON.stringify');}
return str('',{'':value});},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');},quote:quote};}();}
//======================
//END JSON2
//======================

//Function to parse version numbers - maj.min.patch
//http://maymay.net/blog/2008/06/15/ridiculously-simple-javascript-version-string-to-object-parser/
function parseVersionString(str) {
    if (typeof(str) != 'string') { return false; }
    var x = str.split('.');
    // parse from string or default to 0 if can't parse
    var maj = parseInt(x[0]) || 0;
    var min = parseInt(x[1]) || 0;
    var pat = parseInt(x[2]) || 0;
    return {
        major: maj,
        minor: min,
        patch: pat
    }
}

//http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


//======================
//encode and decode functions
//http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html
//======================
function encode_utf8(s) {
	return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
	return decodeURIComponent(escape(s));
}

//=======================
//jQuery noConflict
//=======================
var $ljq = jQuery.noConflict();
if ($ljq.layout.name.indexOf("webkit") !== -1) {
	//GMlog("this is webkit!");
	isWebkit = true;
}
GMlog('isWebkit = ' + isWebkit);

//Store info in LocalStorage for Chrome
if (isWebkit) {
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
		this.GM_getValue=function (key,def) {
			return localStorage[key] || def;
		};
		this.GM_setValue=function (key,value) {
			return localStorage[key]=value;
		};
		this.GM_deleteValue=function (key) {
			return delete localStorage[key];
		};
	}
}

//gm_title for customized titles
//GM_deleteValue('gm_title');
var gm_title = GM_getValue('gm_title', '');
GMlog("gm_title = " +gm_title);
if (gm_title == '') {
	//alert("0");
	GMlog("gm_title reset to %T");
	GM_setValue('gm_title', '%T');
	gm_title = GM_getValue('gm_title', '');
}
//alert(gm_title);

//alert($ljq("#yt-feedback").css("display") + " - " + $ljq("#yt-feedback").css("visibility"));
//Check for playlist and raise or lower YouTube Download box
//alert($ljq("#quicklist").css('display')+'\n'+$ljq("#quicklist #quicklist-player-container").css('display'));
var quicklist = 0;
var ytfeedback = false;
function playlistbarstatus(clicked) {
	//check for About the new look | Send feedback menu
	if (!clicked) {
		try {
			if ($ljq("#yt-feedback").css("display") == "block") {
				ytfeedback = true;
				GMlog("yt-feedback");
			}		
		} catch(e) {}
	}

	//check for playlist
	try {
		GMlog("Check playlist");
		if (!clicked) {
			GMlog("Check !clicked");
			try {
				quicklist = $ljq("#playlist-bar").attr("data-list-id").length;
			} catch(e) {
				GMlog("quicklist length failed!");
			}
			if (quicklist > 0) {
				GMlog("quicklist > 0");
				if ($ljq("#playlist-bar-toggle-button").attr("data-tooltip-text").indexOf("Show") !== -1) {
					quicklist = "65";
				} else {
					quicklist = "165";
				}
			} else {
				GMlog("quicklist < 0");
				if (!ytfeedback) {
					//no feedback
					quicklist = "5";
				} else {
					//yes feedback
					quicklist = "40";
				}
			}
		} else {
			GMlog("Check clicked");
			//data-tooltip show/hide
			//alert($ljq("#playlist-bar-toggle-button").attr("data-tooltip"));
			if ($ljq("#playlist-bar-toggle-button").attr("data-tooltip-text").indexOf("Show") !== -1) {
				//HIDE
				$ljq("#gmmnu").css({bottom:"65px"});
				GMlog("Hide playlist");
			} else {
				//SHOW
				$ljq("#gmmnu").css({bottom:"165px"});
				GMlog("Show playlist");
			}
		}
	} catch(e) {}
}
playlistbarstatus();

//********************************
//Store images in base64 to save bandwidth!
//********************************
var icon_donate_paypal = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAwCAYAAAEurLd%2BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTQ1MzYzMUU3Q0YxMTFFMDg0RkVCRkY5NjUwNzIyREMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTQ1MzYzMUY3Q0YxMTFFMDg0RkVCRkY5NjUwNzIyREMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjhCQ0M3QjdDRTYxMUUwODRGRUJGRjk2NTA3MjJEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjhCQ0M3QzdDRTYxMUUwODRGRUJGRjk2NTA3MjJEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI%2FPsztcggAABBkSURBVHjaYvy%2FPDCQ4cvTbgZC4P8ss1v%2F%2F3z7jxf%2F%2B%2FWfBaz6z2eG%2F%2F%2F%2FoxjAyAg0BCjEyASk%2F7IwgBUyOi1nYPj5j8HaTJThzK2PDMXlrgzLb%2F5jmOvGzJCw4y%2FD%2FWR2Bsb%2Fs0xuMYTPVv375z8DMwsjA6P7QYb%2F2%2B0Y%2Fv5jYGBmhJj%2Bl5EZZCIjw9%2FvHyECv4Gu2GDA8PfnJwgf5g4mZgaAAGL8P9vsDiEPM4J8REgRy%2F%2Ffn4A%2BYmT4%2F%2B8%2Fhk%2FBbGYmBqb%2Fvz8z5Ew9BXTdNwZGth8MTE4rGEr3fWT4%2Feszg%2FWy9wz%2FfnxkYPzz5tx%2FoAqwD0Fh9w%2FqYqABDH9BbKAcC8OfT3DfIYO%2FSGyAAGL4PwcYVf%2F%2B%2FKcYAwELAzCQQe6nGDBBoxxkmGXhQYZ%2FwBA7c%2FMDw%2F%2F9wQznrr9jMFThZ3j9%2FhcDDyczUC0jg%2Bmy7wzfgd68k8HDcPHpXwZ9cSYGselfGF5l8TD8%2Bw01jAEY%2FKduvGf4v8OFgQGoUSViG8PdR18Z%2Fu92ZRCP3MvwcokNg8E6ToZn6X%2BBoczAoAA0oMH0HzDkGRiE2JkY%2Fn3%2FBEsRprf%2B%2Bk9SxeZyZg5mYFr6z%2FD3zz8ivAlKh8DowxVmf36TEmbMDAABWCl7l4SiMIw%2FR%2B9NMQ36kpYoGoMiyFzKhi4NDQ71HwT9BQ3u7Q3RJNVauQRCEA0N0dAgVGCzRkS1BPcqVN7bOff0npuomQ1mZzvnwMP78Xsexepd84b%2FdLrCl0ytlNzX%2BTYPkpbmFeU6%2BI%2BjSWGTXudiZB5agNq1%2B%2BE502PObe1kVk2PpqjyMsozHIn5JFXFGAczMggnj3Cae0C%2B8AKmCxQeiT36Lz5ZGE6bWM6WMLZnwnyz8VyukP0dGJnSV2dSGdilNiVHuFvHa4VjMdaL82sSS5whENJwmJrCQE8XgloEg0GJ5CiDQ7TGMxxpw4%2BteQaXU4SoyijcsLp5g%2Fx2HO6xAX0ui9nJCIaiQSzF%2BrGycYXEeAgB4ndngSMWFTDfHejU3vqFwEQfVaXmTmKMW7fST22qlPWoV9FancvIWg7F3Rnvrp6FrGdTLYKq5vCdpAgNKlG4vP7ZgNz9%2FjRE2f6RW6IVlrWZNYh9Cz7LbgMOqThzfhVrizNi5lMA5ssvpKkojuOf290mW1Eya8RcQesPakg5ZhFRKENq9CKISUQMLJMegnwpCKQXIeilHnqKwkE9hC8ZFCUqCdGD%2BKAMCoI0Q0RCE00377brPZ17r5tQQQUX8rzsPhx2zz2%2F8%2Ft8vkeStnZCbLTxJL4ot0yxP9Gh9nSC%2FuZqbAMYzrS6I0PC0EZGYbc2yo5h95O9sFXNcr5JpJ630yT7J4vcqj%2B0g%2BvnKqRwjL87uBIGra8yrKFR%2FircrfPic%2F1urkJ7X4b5rCBRtsDX7zlaT%2B%2BzXrxeShO0HpWWzncWM8XwWUZTs0SuDBHe6aG5bQhCW6SrV61%2BFiMtKJGnVB308z4ZQ431YmR0hnsaeTOlc%2FOIi7YaF5UPNSqSeYk8N5cHZTBwKxZ4Yrs2ceeEi9eTeToiKmcOl1mcEhL6P5Uyz3BKwleKPuAvoep8H7u3l6C9PEVT1xgEfYTLfUzOanK6XJyWJhDazPhMGuXkM%2Fx%2BD98G49R2Zy1T9H7SeT6u01EDl6oVQo%2FyeGVSOVAKn6Xtw9sE7QM5MypwLWrI%2FywcJXW9lKbnVNWgsWsUVgymk8dQCtNcOh%2Bmli0vBUrdTHxZpjMRRmgaty%2Fs4eL9j0QrtzJyL0p6PsNM2kNdUPC4IU%2FBcHNLZgnca2QVLOUUbh3Pyujkob5cxkrJ%2F6LthCqfhZmwZfppfrD%2Fl1z5h9E%2Ftki8I0WiKUj31b0YwilcyAz44sbC2mUi%2B8%2FEbqj2og8ctU%2BC7mBHC9XWSKGUTqjEqYUpliwRXlbmKN4f%2Fjv5rfue%2B4cAzJhrbBRVFMd%2Fsztb9iGVNn1tEUItWsBiUpAS1Gp9gFmjBCP9gCHEGNEoqF9UEuIHjDF%2BtBhqNCE2hrQxMRLpJxAQ5RErNoIutbWlGBJaHtp2uy3dLjsPz9zd7VIKEROMs8ndmcydyfnfe8495%2F8%2Fmt388FGMRBnu%2BQV0SqtriezwuQZSckzJh1tD0m%2FVT6qP0jSuAiUZTk%2FXExeBss2M%2BnNLWlAJ0LU7lblxGShLKbScFtSmyJFr%2B1r%2FLEizf9fXmtPe9eQ%2BULo1HVNMZnTNrxPZfBAtw9jyBOCuLbXcFtBvGtSRAZPPO5OTgJaUedlU4xdb09H1jli8c3SC56s0gkKR6qqL0LIxZWfcN3gpwd6fLzKr0M%2F88hAd3cPkR77CPr6OC%2F2jnJX5eaVBSmX%2BwuCEaF%2BTirKg4lVnhG95ZRFNJz10XDS5t8hDX8zi23MGJaKBGxb56PnTIimmFpd4VMR83XuF9vMGjfVBwqECYR6mwpIJ9LT7fuySOijMdNv6Kt54roqCJ%2FcQ%2B8vkg%2BYoW5uiUi1lr2WLX362Er%2BI4u2tPYx%2Bs5qTfXHqNn3Pl9vuo2uwWBnevcZHfBxqWpLCqSyCH45RGtSQdci8zbkX%2Few7ayBElnC%2B6XDPjL8NR6yn%2FajJ2L7njDLa0TvMyte%2FIzaS4tWGSt5uuJPTX6xk9%2FvLHZ%2FS3jUsIr4YxN0hob6Pv3kMf8jH2ifuYOCyPBbs7x5LsbQ1SUKMvlAN46%2Fl0RLxsmGBh3z5ZlgmOgdtKmdlwsfODiuXEjShsIdPDSllf%2BL0CLpcG19ZwMan5qI%2F2qZUfsWckKrkm5%2Bew0OLZqqFvfTRLyRFdPz66YP09Dv8HAr88EO%2Fxf1h%2BLheY8sRk5Zum4p8GBINc1lsz55p4XTUlpU4DN2cnjwVp8rTSY6m0EM6p3auUP03S4y91fw7%2BLycb6lj664%2B%2FhgYZ01tIYEZqF3dua%2Bf8rIAi%2BcF%2BCRqqZPUWCeAyu20opJda%2B32SszAoQaTymYvs%2BX%2BJzkQmuZhw90WU2is4z47E%2BjRziE1uXp5EXYiJRo2pZ5vXCWsRsCF1x1m%2Fwl5Z8ygqNCHYmSOUQmgzh3LZIEGn%2F2mIetiRdhptZiYjltk1BTbyBnhmTaPsr%2BwwKYpmo6vpcWGspMbV7nvnrlybA8%2Bogxd3XK5K5yHfaB%2BMm85gs%2BcuMKluFgXlz%2B2pJDbA%2FKZGD%2B%2BNpEuqcbUdkxbxMy2wXLXTHoyresmz%2FTpc7xo3kCPXqsxvCLPyte3Q9zgwHsLBYRx434QuebTzWV0IxtT%2F67MmAnZ5kMPqPWY8ZR7CrIZ%2B4%2FqZTqmmFL7%2Fv%2BCbGT5lItYgnKfbbmQuliGzkTMPaBS4%2FwtQLvWGhtVFYS%2Fe%2FfZQivbdwFbKDSlSh%2FEIkaBolBQ5KmYgEGCMeIDIqIIBuIfE4lCUDRA%2FUEEUwJBIJgAQR4iFhTBglQBK62FPgJtoVBa2n3ee5w5d3e7fUkwIanJ3rTZzd57zznzzcyZme%2BMIraMK4ZqzoZjaET7BhK%2BOmR9mkfBzfJrZvjakpCcF4HJG6wQYbC6PbFpowi7Z260uaMxaWFwulxmPy6Kv4KQFqX3HtKqN11qIPQFGGTa4UUgXw5fnaKNIvFpp9sDlXwYrB7A0oIOaaTR7IJhN%2BwhwfJ1AitsWXexLBEKlq9bsDhycmGpdB6DflOttPuZqSZ3e2Viez%2Bjd3f8mVyDWTGaC7zinjMfHtfFHTq6LHPh8mhoowLd0dcq%2BxisTPT49yy%2FZRk9WkKC1e6Gqp%2Fsm7e6BEXbyoAoi1FwevyoMFA8G328MGkQtryXh0gmM%2Fg2C8DvB%2Fq%2F6D3h040shQXktosAmUia0EPaieS8ZjWEIRRYecyFwlKP7N7gJbj9OrWajGFMNM%2FEQWYUjrczRyTnkI0rnQhLfjkwk2pVsPuiF4uOOo06mv73zYiAr%2FE2Lrh1efT52rODjfcIl8CRUrDw6VBHW0woq2zGzuJaIJ6S%2BzYfXpo%2BBGsXZkshth2uwfubLsDl1bDzSDXys2PxaKYDHxeV4fJ1F%2Bqa3JJAshIwAx02jBsRjw%2FmZCA6NgLLN5Ti2x9roZpUjM6JwwYaU2qRhFtc%2BDsOnqqTgo3KisGqBbk4WaehLwnHsj85UMXafKtc9c9XNSw5ZtTvh674sP43F%2BZkWrDujBcVt3U0OoVkz1h3%2FWxAVpyKN3MsGByjwkP3jlZ7Zf7Ehvlcugm5cWRNSQ7ohOiE3Fg%2FHkoQF78b6v7EKwQs0vb2Y9VwtXqlENGJkXhreiri4yJoIhcuVN%2BGi1dCM%2FWJsuKp7BgUn2%2BEmSxufsFADIi1o4nuf7KjAiWXmlDy5y3sPn4VlTsmYnCiDeX1TvJ6Ha0EtsfrlQTatJWncPBEnZyv4LEEfL0iB5vOavjrpsHAsVG%2F%2B4iKGAd9cQJljRp7nwQxxg7ZfHSy1oNWj8DkVAWpUSpcpNg95QRMjY6yWxoOVmnYO9XCTZzyO4%2FLDvB0CgFl13pop9BD86yO0ZBfdrbp%2BHJ%2FldFgRIA0k6WMfPloO%2FfDrkR%2BMGVUArYuz4GF1HejyYVzZI0Hfm1ACwPJz5qN99ndxg53yO678dkORPUxo7nFi%2FomD67U3cHCjRdRfLpBDj1%2FSgo2L8tGS7OGI1WGAnkItpD8nT65hwq%2FG7JrjklWsC5fwQM2DafrBa60CPxCmDPJJztUVeM51ntuHDkKgfLpOSHdmccamahgfIou22C7lseic1LaMRoqNhWb9lajgQQJEHRfLMrE9McTSFZdukwyuZaJBOY9q2hfDeatOS%2Bfi4g04bNXMzCJni0uacSC9Rfh5lWR%2Bt%2BZ8SCZhxfp%2Fe0YnGBHabMHHrLgnEU%2FkaULicbS2WlY8%2FowCeqZej5TULgFE3dI0BV5As9n0C2Poav4SALCYqy%2F5Bow64DhqrR8vJElMC0duNVK4B8hZXsM0CalCPqkraNCkWPwmp8hoCItPWROIWckXZJSPoX2tmn45ngdhwqpkkGJdrwyIQmR9F0Phhwy2VZ6njb%2BCtoMJf9K4DlJOxv312D1rsuorG0zpKKIM%2FWJBGT0txnUKQlUMMKB0nKjSZc7XFnN6xcPw8KZKRyWpEVsv6QSfopUeBZtITPTNCTTELqlXRB2G5XArG2h5zSTJNfZXfdUAodrFNDOII2be00y%2Bgk5xlcXCDy3SXoQE%2FEvptPae6IuRXvNrMje7oRhqfq4ZVamZ1Wy9xu3vfijqlW2AzI2acl2pCXZewzN3LZc2%2BDGd2dvotmpI29oXzycGomKq04039EkwMMH9cGAOBs0siBuql23qwZLCssN36K%2F7UszMXtiMjQKJGzMtO3gTIMRFRm4xEiBDIfokVlmq7npVHCiTsHVVhUPxegYESfALTWNbiMqJkYIpBNg566r0kUZLP5tSPS%2F5BysCWcT1O8%2FbJLd6CIhM1XPX2q9136Z%2F5IvqWSdbxf%2Bjc931cr0g0%2FKfvhoOMZkRdP0vZAiCoK1qskczIV0333N4BV%2F2rX1UD2uNzgxtyBe%2FrBiVn9kktVpnl5aagl0zuD9p8%2F3kYWXMYSmmTO6n%2FzvwKK5Pei1lwiNhgLdJ6XhKyTNCu0hFSLMZ93FDRUEyx1x393w%2FwtWAJugZRklUBdqIXyF4MJttpvHFtFe9aSw2KIRPgvrybrMis9d%2Fg%2BpgX0a2UfHIQAAAABJRU5ErkJggg%3D%3D';
var icon_donate_flattr = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAUCAYAAAGykfBeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEY4QkNDNzk3Q0U2MTFFMDg0RkVCRkY5NjUwNzIyREMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEY4QkNDN0E3Q0U2MTFFMDg0RkVCRkY5NjUwNzIyREMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjhCQ0M3NzdDRTYxMUUwODRGRUJGRjk2NTA3MjJEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjhCQ0M3ODdDRTYxMUUwODRGRUJGRjk2NTA3MjJEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI%2FPsFmLIcAAARaSURBVHjaYmQAgpo5Af8Z8IMLYEWT98X%2FB4HZW2vANIwPAyA%2BI0ghJz8bAyEAEECMRFjLwAAyctXRDrgVMKtRrGxdHUbQJIAAAlsnrsTPQA3A8uXjDwbOtwhPVoWshLOnb6hiyAxoA7Pb1oSjyIFARp8dw4yiQ2A5EAAIIJDLzgNpA0pd1ZKygZERFCDU8OLLex8ZmGCcHMcFDMhsGB%2BdzfFdFswG0ch6QIDp09vvDCAMAjA2KKxgfFC4gMIExn7x5SaYfebGQRQ9oLAnKsqRwb9%2F%2FxmYmBgxxL9%2F%2FMUAEEDgCAAmDQOGQQSA4X%2BBCVuqgIUtctgjA%2FS4wgaQ4wyXXjz6DZhAcfD5%2FXeGXz%2F%2FwEVTvJoxVN6%2F9xRrYkC2QJxdE6ccumdA5r179xEu9h%2BYCEBuALkF5CZwiv3%2Fj4Hhx5ffDMgJDpSwYBkOJNabvBvu4CV7W8GGw9TCLL397ByKGTDxllVhcHNgAGSekoAJXPzzu%2B9gN4DcAsvkAb9%2B%2F13PDSwaWViZaZJmcCVydPDn91%2BGr8CEz8bKHAgQQGCHAcXWD6K0H8jCzs26XkCca9C46MPLb%2BuZuIio1egJQO5hQhcE5Y4A9QKcWRxf9idUhBAqbuBFPbpAkmU9AyMjI8OU%2FQkY2RubBdjqF2yOgdU32NRiOAqULb99%2FgUXkJEyYJCW1EfR1LQ2kKF4riuKRpijkR2Pj41eDqKb9%2FfPP7A7QO5hYgDm1j%2B%2F%2FmItq2D8uuD1wOz6E6XMuXL%2BHphm%2FiiFUanC5GHsD2%2B%2BwS2HVa6g8gpZH8h8kDtA7mEiJvGBCk1QKwYZgPggcVjrh5B6dL1422%2F1S4L%2Bs7Gz0Cw3%2FQdBYHXCxMhIlHpQtcP098c%2FlDpwIAHIHSD3AAQYvETn5GVj4OBlZRgFqODH598M3yEFQSAoPa0XlOJmYONgGQ0ZLAAULqBE9P7Z1%2FVEhxCoEvry%2BRvD37%2F%2F4GKKStLg5huMjQ9gU0esXnLNIMZ8UtxAVGBx%2FpQDFu9NGOKgegRURMPYMIuRAb8AD4OQED9cHayeATkOmxgoUj5%2B%2BIISIcjNV1xmgOpEmD6YneiRjWwuun7k%2BhFnYH3%2F%2BouB9xcHAyuwhMdVACd7QAJqzrZahuvPT2D1CLJnsAUquhpcYqA6F5defGZg04fPXGIDCFQzgepnUDixgFsQX34B2%2FGI7MUnzIlVI3prBN0yUGBi67khA1AKQI91bGL4PIJNbvWxToaXP6%2FjbLaB5EOtyuH82VtrGH6z%2FIXzf377DS5iQOHx%2Fx%2BW2hAojjUbIvfckAGsh4hLT05IMwMh82AxjGwWNjFcbkBu5yKrv%2FnkLLh1hk0%2FxG3lKGakereA9YNaeyAgJydJeEyuoNfjPz%2Bw30XLhhatAbghB0oNjMQ35khtZ318%2BY2BiYef48LPL38YRgFuAAofUDgxQgeaQQ3TetAQEmi0ZsilrP8g%2FB%2BYsICQiXrmAgMIRF0A4saWlA0bAC0Ivj8IYxHPAAAAAElFTkSuQmCC';
var gb_close = 'data:image/gif;base64,R0lGODlhUQAPAKIAAIiIiP////T09Nvb2wAAAAAAAAAAAAAAACH5BAAAAAAALAAAAABRAA8AAAONCLrc/jDKSau9OOvNOxhgKA5O4HHmNghs25JNesaTnK2uCzP2bPUXHKE1FJACSIUsuUAugUulkjl9Nq8OnGBYNPZSYClPfDWFAee02Ix+aLe677r5pErZ7bxaf883tFwvcnxjfiV+e4llEEJELEdMVlU8dn1ziFR2eFk5Oj6fKp0voKRBIyOlqaqrrA8JADs%3D';
var update_grey = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABFCAYAAAAW0YV7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADTNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iIgogICBwaG90b3Nob3A6QXV0aG9yc1Bvc2l0aW9uPSIiPgogICA8ZGM6cmlnaHRzPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ii8+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6cmlnaHRzPgogICA8ZGM6Y3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkvPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+YmV0X29uZTwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Po1hJ38AABDfSURBVHja7FtpcBVVFu738rKQBEkCBBJIMLIJyCJbIWSGZRgEZIITgRhlEcYygo4MQgrHH4q4jFIloNRYKIwbClMChSIqBZZJaRWlIpBIICAQkCQYlkBCAknI0vN9PX1e3TT93usnxGWcrrrV/bpv973fWb5zzu1+Ll3Xtd/S5tZ+Y1uLAy4t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%3D%3D';
var update_green = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABFCAYAAAAW0YV7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADTNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iIgogICBwaG90b3Nob3A6QXV0aG9yc1Bvc2l0aW9uPSIiPgogICA8ZGM6cmlnaHRzPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ii8+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6cmlnaHRzPgogICA8ZGM6Y3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkvPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+YmV0X29uZTwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Po1hJ38AABdpSURBVHja7FsJeFXVtV5nulPmm5kkkEAI0YRAEAoIVLCAShUfTqjoU6RabdXSgkVr66PVV6u1avVRqiDCp8UWan32UZ+VKtjBgSlhCDKGkIRMZL6598z7dO19zh0yMImp9vXd79vf3meffc5Z/xr+tfY5CWdZFvwr/Xj4F/sNOuBDJxvj9zTU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%3D%3D';

//Led Icon Set
var icon_about = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlBJREFUeNpi%2FP%2F%2FPwMy8KvcJwikEoHYGIgNgZgJiC9A8ZxN7U5vkNUzIhvgU7angYOdpVhXXYxVXISbWVSYm4kRqOb1u29%2FX7%2F99vfijZe%2Fv%2F%2F4PWFLl0sthgFexTt7FGQEspxsVDhefv7L%2BOHbX4ZP3%2F8ygGT5OJkZ%2BIFYio%2Fl%2F6GT937cvv92xrZe9yK4Ae7522qV5YUqTU2VOS88%2Bsbw%2By%2FE0GvPn4JpLUlpMM0CdI%2B%2BHBfDxQv3v9%2B8%2B6Z350SvWkanrI1SHOysN7089LkvPv3BiBwks5OUwHTqvHso4aQvw%2Fl%2F955LX798%2FanO9Pf3n2RdDQm2C4%2B%2FMf789Zfh128EhgFkMRA%2B%2F%2FAro4ayGBtIL8uf33%2Fc%2F7Jxsnz58ocBHVg1HwLT8oJiKOK%2FQAQfF0ivL8ufX3803v5gYPr16y%2BGAfsqrMF09OQbGHIvvzAzAfUqAU35%2Ffv1%2Bx%2F%2F%2FzMyMjLgAD9%2FYbruF1AMqJcB5Iy7379%2BE2Nk48BjAKbr%2Fv%2F69Q%2Bo9wnICzv%2FvP9g%2Bl9QlA2XAdi8x%2Fjx4x%2Bg3j1MQFPmvn%2Fy7NfPn7%2F%2Fo4c2KEpBGF0c5Px3jx7%2FAuqdA05Iqo4Tm9mFhUvY5RQ5GIgAPx4%2F%2FPHrzetJt%2Ffnl8OTsqJtbx%2BrkEgmu6wCOyMTE%2Fbw%2BPeP4cfTRz9%2Bv3k1%2Ff7h4iKMzCRn2dXMxMpawCImycbCL8TCxM7OBAmwn%2F%2F%2BfHz%2F5%2FerF7%2F%2F%2Ffo56dHxsiqsuREEZMzaZYBUChAHALESVPghEG8GZecnpypR0jVAgAEAzPVNyh34CewAAAAASUVORK5CYII%3D';
var icon_misc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAu1JREFUeNp0U3tIU1Ec%2FrbpplO3taUoynIGPlIpSAh6OQlR8hHDVWSWUSkFJkH5T%2F8GhpUWZZh%2F2JsyfCxS0kzLmYKarswoLMlnbs7nnM097na692oxND%2F4uPwe33fOuef8OIQQuKMx0E9Of87SVNGMWEkP0NTQLEs2mEfd%2BznuBm92bn%2FsMOqzNu9XYmPcVgiDAti8RW%2FEdE8fRhu1mLe7ag4O69VrDLTpyXXRhddTR1vfQWbshB%2BZg%2Bu3ia1xfcSANARfxr2gOKDGp0sF2rT2LiVbZAw0iqByfXc3sc7PEwY9N4pJd2I46d4dyvJzaiR5m5NFKJuNOB0OYtDpSHVs5EtGy9UEiOSeHrzcb%2FfKwBMIQFmtkEZFY2jE0T4%2BMHOB4Y%2B%2Bubrw47mwLy6Cw%2BXi1%2Fs2eFjMabRWgSp%2F0RXdKRX5eTKOtJw4TIZbWkjNjrgnjLs7m1KSSie6ukhn4WXyNXMb%2BZiTQWjtVQ8noBaJuSAGK3z1H9B2tLn5mH46C6uQWN%2BYVxsbGSgT2TL8Q33B9yWgtSquk0BOpsdA2SlYKAF4lKMe68Bq0DdQ8GJ7ycw4GK0HBQ5s8%2FTfJi44%2BWIw8Xpgai5PIRw2M2A3sTGzg1GL2c66CmUiUAJhxnoGXpvC0rk%2BwuXd0hpGy6XPUT1rcsGxRCfFciQ%2BrdzzPH5v1Wrxq0PqsoT7D9MlSWqYFxxgNLRWw7krk8j53oKRYKUS%2Byoesdc01d%2BPhswjHbapyVpGzPMWxqfUaNKlEREQiMXoKSlGX8k1%2BsptYexLLA8JLkuprDwj2xINL4kEutLbMPd2wGpaYFcXBQbA4vKE8tYdNh7TatGSf%2B7F6YHvqn9PuTIhoTa%2BqEg13PQalqpSbKBX4%2FsHsjX7lAGLgwOwhO9CVG4eWgsuNmX36pLWDFNFTMwD6%2BREdoAvIPEG%2BLzlvJ0%2BrGkJMC5yQHF4z%2FKNxsz%2FTiODm1KpYmWcmYlTrKSH%2Fo7z%2BdnZQff%2BPwIMADnNdR%2FaWF%2F8AAAAAElFTkSuQmCC';
var icon_help = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAopJREFUeNp0k19IU1Ecx3%2Fnur9KluafkKVLA4WQUbaI6MkejLAIqgchsH8vKSbMiBUY0kNImBlaFhgUBD1ED5Eklr301F%2FdFGEiOp06mzp1c%2FfPzr13p3NuOra5fvC5v8vv%2Fr7f87uHcxAhBAbHw7AVT17%2FyqHpMqWKcpDCUVyb9DVePLwCCYESDbpf%2FWgzGXUtleUF%2BsK8rIz83Vkcoj3Lq4K6HBRUtycgi5Lc1VR%2FpDXJYGAsBN0vv3VYLbsaqo%2FvNwU2VLQuqBAWVSC0KducATspRdk68vX7tDTpDT5runTUETeoaf7YWlaSe9tuLzO7fALIKoGfM9OJk4LdWgo6Oo%2BtOBPcLq84MbXy8MaVY62ouuF9kcmonzh10pblXpCoIcCwzwu%2F204kGVS1fYFDxfu0d5vFTD4PjfIRPlrOqbJytbJij8E1J6AoVgHLqiaufz4ZhwWrsW%2BMkVkeVZQVGJhWp8hKjWow6yIRJb5aXY8H0gUTa5k9sjOZ9rROwUpFUAIOYzWt6J3jgJbPdY4n1QORDI5qS6mLLC%2BvSYQghFLF%2FU6blmvb3dunwQpQLbAxpkReKEAGE4L%2FRDTNdATjGNXOs18YVNbW7SQn35DaZG3u13LJjsJtBigUUqh2iKMuL9bm%2FTgalcnWLm8x87hWI7XOxl%2F1zWGq7eM8nxr9Qpjvinino6mNibufSNjrlcQw%2F9TRcsajncTeAR88uP%2B2U5%2Bbd92412pEHJd%2BP2IxkBZ8kryy1HvrzgXtKHP%2F6gRuOs87pKVAx8boMC%2F4FzDmxZiixIAhC2JMXPTj8JiLl%2F4sPmK9TMPQJujpn4kv0n7vjYWma5SzlNLN8izlA7vOzrt1SZfkrwADADHTjb87FtdzAAAAAElFTkSuQmCC';
var icon_config = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QkaDBM5i2PCSAAAAfBJREFUOMulkktoE2EUhb%2BZ%2BEyKTRQKgkqwzMaFtt1FrC40FGJm60JwIVSkqLUtElICFQNDQqBrQXRlQIriwomN0GJXgtI2iUkXFYJVadOXhiBERDozbmaGMR3rwrP7ueece%2B%2B5P%2FwnBOcjnVGigArI8Vgi9xdNNJ1RbI7YUlT7r%2FYDqKaZq%2Fj6tQHNbLQd6YxiNBp1I51RDPdaw6pFAcR0RolaZKur19vmZhwFePDwPvFYQgZyACKgDt4cMp4%2BmzAA9fatETbX15A6Jer1r%2Fdas4ndGRUsMYBgFW8MDBqatiXoum7oukZhfk4ovC8CyDsFK7R0sBHpu0i5UmG59gUgGY8l7v7zjE68yr80SpUS3Sd7KJYLmBNMArqrQTCSOgzUrPeVkE7XCYmjR47RbDZ5N%2FcWtzU8TvH4cJi%2BUCcdAS%2FZmU2Ot39LLn1eOtd9qoeAP8BKbfnyhfD5%2Bemp11XAABCDkVQXUHs0JjNbXmS2vEjHQR8A5t5yLv8CSZI4e7rX%2BmR2HiJQHB8OM%2FWmxJamI%2B7zs1Fv2iOaI8vZJ4850O7nTKgXYMxpAMDuXR72%2BA7x88cvsvkFgHCrSS6vUv1Y%2FSNsEWBl4zv7fQHa9np4PvMBIPxpcnTaSTRNkmvrqwtA0r5CMJK6BEw4uNvEO%2BE3N%2BLV9uq8VLwAAAAASUVORK5CYII%3D';

//Tango Icon Set
var icon_config = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QkaDBM5i2PCSAAAAfBJREFUOMulkktoE2EUhb%2BZ%2BEyKTRQKgkqwzMaFtt1FrC40FGJm60JwIVSkqLUtElICFQNDQqBrQXRlQIriwomN0GJXgtI2iUkXFYJVadOXhiBERDozbmaGMR3rwrP7ueece%2B%2B5P%2FwnBOcjnVGigArI8Vgi9xdNNJ1RbI7YUlT7r%2FYDqKaZq%2Fj6tQHNbLQd6YxiNBp1I51RDPdaw6pFAcR0RolaZKur19vmZhwFePDwPvFYQgZyACKgDt4cMp4%2BmzAA9fatETbX15A6Jer1r%2Fdas4ndGRUsMYBgFW8MDBqatiXoum7oukZhfk4ovC8CyDsFK7R0sBHpu0i5UmG59gUgGY8l7v7zjE68yr80SpUS3Sd7KJYLmBNMArqrQTCSOgzUrPeVkE7XCYmjR47RbDZ5N%2FcWtzU8TvH4cJi%2BUCcdAS%2FZmU2Ot39LLn1eOtd9qoeAP8BKbfnyhfD5%2Bemp11XAABCDkVQXUHs0JjNbXmS2vEjHQR8A5t5yLv8CSZI4e7rX%2BmR2HiJQHB8OM%2FWmxJamI%2B7zs1Fv2iOaI8vZJ4850O7nTKgXYMxpAMDuXR72%2BA7x88cvsvkFgHCrSS6vUv1Y%2FSNsEWBl4zv7fQHa9np4PvMBIPxpcnTaSTRNkmvrqwtA0r5CMJK6BEw4uNvEO%2BE3N%2BLV9uq8VLwAAAAASUVORK5CYII%3D';
var icon_update = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJhSURBVDiNhZNNaNRnEMZ%2F877%2Fj91V1lApiFjxoxQTK2ER0RaFXgWRYnoIwYVSDz148Oyp9OZRe%2BuhElgsLXiQXASvLSKILlHRVuqKVmtNiFnZ7Mf%2Fa8ZDjKzitnOe5zfMPPOImTGqmnX5EhirNWx2VI%2BMAjTrskG8a4GLrch31hr2%2FD8Bzbp8A5SBa8At8e7HsU8mZ4LyOlmav3pZC50C9gD7gVKtYecAgiHYBz6unHFRSfNuGxeW2Hzgi1C8Z%2Fn%2BncPWfdnzlarDVPJe5%2ByaaBhwzYVRNj59opT2%2B2iW4tIlKBJ2HpmOxHvCSpkHc790817n9%2FcBbmTddpi%2BXCLoPQQz%2FKHvAAh%2F%2Bx5MUZmgv%2FisAlxdE7nX%2B38oTs77qKS60saSAbr8CImqSFRFlx9hgxXyzjJBXMqcdz8167IZQG4e54SInB3buj3ctPvT2OUdrN0CzYln5gBIfj4K4pCxbWi8kcU%2F7mZLrb9yUz3tVr0QMMWSPjbo4HdNvREDxDNz%2BPGvsP4KlvQYtl7MbHUF4QcJ46nttT1hlC4STBwl2Ps1APmNWbLbF9H1W2ndvJ1q2r%2Biat%2FWGvbP8B%2BUgc7Htd0%2BSBbAlGByGjDy%2BV9Xp1Y%2F4s%2FrtwyzTbWGLbzrwl4fhlmgA59KFbWC0vxF0JzEVREvRMkKUSnupv3B58CldwEHTDW8f%2B9JZnmKiGPH%2BJZQQuHxvSepFjniQydoGTi4BnBDgBdaFKc0TT4ztXWmxYV%2Fn74YLDxrp1bkl02tolm6r8jyk8Dfbx3xfdWsywZx0sKIzez%2FwzQCcozVOJ8f1fMKwlMw2aBgNl0AAAAASUVORK5CYII%3D';
var icon_update_grey = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAACXBIWXMAAA3XAAAN1wFCKJt4AAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8%2FL5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N%2BQWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE%2BCDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9%2FNocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A%2FhXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V%2FpHDBYY1hrFGNuayJsym740u2C%2B02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT%2F%2FID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs%2BZmX8xlz7PPryjYVPiuWLskq3RV2ZsK%2FcqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta%2Bx%2F%2B5Em0mzJ%2F%2BdGj%2Ft8AyNmf2zvs9JmHt6vvmCpYtEFrcu%2BbYsc%2Fm9lSGrTq9xWbtvveWGbZtMNm%2FZarJt%2Bw6rnft3u%2B45uy9s%2F4ODOYd%2BHmk%2FJn58xUnrU%2BfOJJ%2F9dX7SRe1LR68kXv13fc5Nm1t379TfU75%2F4mHeY7En%2B59lvhB5efB1%2Flv5dxc%2BNH0y%2Ffzq64Lv4T8Ffp360%2FrP8f9%2FAA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA%2Bf8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFaSURBVHjaXJHNK0RhFMZ%2F73vn3vlaKCVSYkKpiWKSj6zsbCR2VhoLzaX8G5ZYTFmws7fRxFqajWQWSoMSiVkozUdz7533fS0GY5yzOT09ndNzfhj%2BdmYps9auCEOr3A7xKMJ6MPve0oQB3DRR8hTkQd9qRBRzeoVRpohk9yAEYDqdnZCuEyJlWzwteDVHIrxd%2BDaIvBUsRmoEBPjMO5I4Z1Xv4tfAlWd%2F4qMZB%2FIYJJ8xLgEkuF3yKKRr%2BFRwcCg3p0Aeur1gldZFrjs54WiqKEaAWxpY9FuNRHnrtNI8gYdigDEEhiUKvGAwPzHdLrFvrSRtTYJx4JoHIhR8da43sq%2FNP0QpJy0FDGG4B6LcGNOTLYEEIGUFYFAUKaKBAKfKbCvmNPZdoJAM25Kir5BSRJnj5GfDh9puzJi4On6tv%2Fk6Z2JqsrHJ8y%2BLv7AImzZY%2FMO9nEm3K18DAOHGnx6T6PIeAAAAAElFTkSuQmCC';

//PC Icon set
var icon_donate = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAopJREFUeNqMkV9IU1Ecx3%2Fn3Lt7192wabqRYFmWvViuwkl%2F6CGI6I8Q6YMRQUOJ1lsPQiDke0JQPRiZCdGgh4IgoXwJegii7A%2BB1oOls9Sp21zb3Lz3nj%2Bde53ploQ%2F%2BHLO%2BZ3f93PO%2BR3EOYcXW8sPA0Cb0BkhQ%2BidUN%2BJSOyZGK39VjG0C%2B3GqrKB6cZwfv8%2BGqjaFHB6S1%2FVdwad7urNEjAOC9NxNtr%2FXI%2B9H7kjCh2Vxw9c3tJ0SHFVVkjYIcNCNM4%2BdfXmclNzzVJridblv36xwe0rleh8ClgqDQ4HRr4j9Y6FmeT%2BMv%2FOQO25o06UyWAyOQPmVBRkzJF7VxWefv1FkxmWWl3lGyUjGgOW1YFTCgg4YE2FmqZGBUsY5b6NAYkLuC5eJ26IXSo4rQM5BGTZ40YkkQKSzAAnVIjYIyTTgCSMuUmApLPAhZlTZrUEkJhj0TsBoHI2keaLc%2FOcLRpoCbAioASoAFgQey1MNgBjyCUzVAA%2ByISy%2FrnhsSslXo9sG%2BmSmZEVo53Ln26FpMgQ%2FTppCmQYPfSV7VE05U3dMb%2BGZYQ5YXnAMowUmBFGkPmdM398nui7EI2HUG6oDx6f6gipmnLj4LWrLnE7xMXdOGd2wzhbZUYAuk5ZYjZjbD%2FbctMbaOy0AVaET3Zcqmtrv603lCkvE4MI1hc9iOcbY8Xo0ycPehO3gudP18Bscva%2FTq%2FHC%2BGB7yCvTu5obnlr3u0OWuafsV92LhY3YOhj0v6BfXs94K1Q%2F9abVHxnEfieSRcLEuORLJgmA5NwiExkC%2Fas2mIAGKQQsK1aA1XFoChYzF3%2F1MrFAJPq9vuWo6ocwF%2B7dg9MOrImoKf70WBovb%2FwR4ABAFkqXFhfHjIDAAAAAElFTkSuQmCC';

//Silk Icon set
//var icon_donate = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIISURBVDjLlZPRT1JxFMf5E%2B6fwL9Ri8lsI5cSV7swL82w0SZTB6zWXOuB0cLU8HKhuAooTNrFupcAsYWjh1sRIaDgTLGXxmubD2w%2B9Prth29tXMWH83J%2BZ5%2FvOd9zfhoAml7h%2Bmg3ReuhUxIdR37CrVanUXvgvvsOtk4kbJ%2BkEaos%2FbkSYCZv0wcri7%2FzrTS2f32AUOX%2B2nPWACvd1V4KmM7fnxQP1pE%2B2kSuJUM%2BEpFpvUOS5MJVHgQSuBCwWuU72eP3EA8TWCx523NFl%2BIv%2BzrxRgRr%2BwKeFJ1NVYA9y%2Bo3mjFskbkj9SDGpTGqm2dSJmosZfRYZXPClLxNqQJsGYt2bS%2BMbEtCF2SVmQCTukOPikaqbxPnik4l3ohC%2BilivbGKcC0Af%2FklXAVHczhuoC8FmDdpyl2YUrjyAlmfHytklATpJronwP9jAYbYIN3XHXTDuDGkJ6qeRzsz7XCNh1AjvshmRRXQnZWVmIQxOfTf5RFV%2Ffw3LyJkC%2B6d2U5PwOjbEe3Tz4%2FbQp0%2Fb92WY5VbsZtuQ3SQfpC71%2BR3%2FeAqr2ASR7I9AUSVepibUHhSFCVKQv31uXm%2B0nPwVQ5dgOfLM%2BjeXNdf6AFRnZz9NNVeKs8jtr%2BCCDHvRcmL8bSlqQtdo%2Fv%2BTBaZ%2BRrcXUaQqLMZy%2BGVf%2BOAcGPaWXCckW7OBgTdslrdPxtwvK6n%2FCCRAAAAAElFTkSuQmCC';

// WooFunction Icon Set
var icon_home = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M%2F3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8tJREFUeNpibPM0Y%2Fj%2F758jAzsLM%2BObmbb%2FAQKIESTy79dPBoa%2Ff%2F%2F%2BBwGAAGIAicxMCwNzZiYG%2FmdYt3Y1w6tXz%2F%2FfaPH%2B%2F%2F79m%2F8AAQTWw%2FD%2FPwMjExPQtL8MTP%2F%2B%2FxMo2nLif%2FKCzf%2FZJeQsmBRDUtfdmpHO8O3%2BBYZtV%2B%2BxMEkrqzL9%2BMnI8OfffwZhRVUWgABiBpnhrCrN4KQixRBqrvOqrmdil9Kr65Lzjl7cLP3qzj4GZxVph5nluX9Azvj6%2Fdf%2FL0D8%2BcuX%2F7%2F%2B%2Ff%2Ff7u%2Fwk8kqMuGAlJXz4R8%2FvjPcn1%2FA8HGSLcO76yeArvnDoJdW6s7IwMDAIi0tZcrOzi6VmZVdysTMwnDz%2BtUn%2B%2FcfWP3s2bNDAAEE8QcQgFT%2B%2BftPDEi%2FAnqJ4d%2Fv3wxMbOwMTAxQ8Pvv3wDL0KiXqvp6%2F5lFpQKjF277%2F%2F%2FPbwYWkOSfP3%2BW%2BlR3RxnaO4EVb%2BxrWff03HGIzhZ308ev37z%2B%2F%2B3bN6APfv%2F%2F%2BvPP%2F1%2B%2Ffv0%2FtnPr%2Fywr7akM3EygoPz%2F%2F9O3H%2F9fz3T8f6fb7v%2F33%2F%2F%2Bf%2Fz44T8LEyMDU35FBShuQNYw%2FPr0m%2BH%2FL2aG379%2FMXz5%2FJlh9959DEwG%2BvoMX758Agr%2BZPj4lYvh4%2Bf%2FDL9%2F%2FWBgZmZmaGxsBPuOU11dzUdQQEAhPCo6mBkYDn09Xd3s7Bz%2Fbt68uRkgQNNk7NJWFIXx7968p4k1tI2JInHQCkUqjREtLg5WcIiKdHGrrQouZilUSydbWjroEil1rqsgBvwHdCw6iENIVNrBKLEafTXP9%2FKSvHvjyROtZ7lwv3PuuZzvd%2B7mcD%2BElDjSrbZWX%2B2SsEUoJ%2BQ307QWmwJ1HngfdVOKFDltRxYsU7ktctH0MjmDuTj7%2BKSx%2Fkvv5JjSNTwKb40Hf1LJ2K%2Fl77Hj%2FeTZ26%2BxgLepGT%2FGX%2FUL82iDzQ%2F24Ld21RH0qMvB8Itw39Q7tLQ9%2B%2B%2FAvTAsC1vxFWyv%2FMSpbizCLn5g7Q2PR4I1at3I%2B7mxaDT60knMF3EYX4C8PARX3SgaOuoHpuF72kX8c2S1f5gYHpgWp8eqkvirrSeoaEjYbxzLiQGb2Jb6CQKlBBhRlrMfomTqdC9RoUNlZeymT5LpdGZTia%2BtOh75%2FX7k86bjkQ0XmJCwLwrkm4Vy1YMbnmjh8qKAC03Dwf4Bqt1uKHOfPnOatJydnWHPQx30WAnZbBalzlEY7tegzQErS2QKEkw7R7G6CqriQrgzzFOpPbBIJALOOatsMufUmTloQdJ36WQ3oJcrOaRz0tmt5tRdA7%2FS1cDBjYJbAAAAAElFTkSuQmCC';

//Dead Simple Icon Set
var icon_twitter = 'data:image/gif;base64,R0lGODlhDwAPANUAAJnO%2F9br%2F1Oj%2F8jh%2F9nw%2F0%2Bg%2F4fP%2F3PG%2F9js%2F8rl%2F8Hh%2F7La%2F%2Ff7%2F8vm%2F3nF%2F8bj%2F2W5%2F57P%2F8Xi%2F4XE%2F4TE%2F0qh%2F9zu%2F2y6%2F9rt%2F%2BDw%2F8nk%2F1%2Bv%2F8Hg%2F8Dg%2F0yk%2F%2FX6%2F8Pi%2F2i1%2F0ih%2F7fb%2F5%2FR%2F1ax%2F0ii%2F1q0%2F1Ot%2F0Kb%2F0We%2Fz2W%2F0yl%2F2fC%2F2C7%2F0%2Bp%2F2O%2B%2F124%2F2XA%2Fz%2BY%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAAZ8QIKhRSwaWwbCQcZsOpsHmNShIEmvWJdWQvtov%2BCYuEFjiM%2Fok1pDa7stEPWpRH%2B47xd6CcUHtQGAABN8fC%2BGHG2GiossjQttIY2SkiaVFG4YCAgdHpUmKqAiGXdtG6AqKakpFREJAa8jqKkCM7W2t7YCAwUrvb6%2FKwUDQQA7';

//FamFamFam Icon Set
var icon_font = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHJSURBVDjLY%2Fj%2F%2Fz8DJZiBZgY4tN9wcO6%2B0erZd2uKc%2BfNfoeWGxMcW27Msiq%2B3GWUdIZXL%2FokI14D7JqvB%2Bcsf3Rv4p6X%2F%2Ft3Pf%2Ffvf35%2F8Ilj3471V3bph9zmougC6xrr8mETbu7q3jl40%2FFKx5%2BLVzy8Ltd%2BeUZBvGnOYjygk3llfKCZY%2B%2Bu3fcWutcd21B07on%2F61yz88kKgwsCi8qJc%2B%2B9yhu2p37ppnnQ4C4oWblo%2F9WOReXEjTANOsCs1PD9VVZ8%2B9%2FN0k7m6Yfe5LLOPFMR%2BWyh%2F9dqq5eUvc6xIbXALOs8zEZc%2B9%2FC%2Bq%2BddEw%2FrSfXuRxLfP0swuqgAYEt934pOq2nxenAUbJZ0TjJt9%2BVbn80X%2Bv5huXrbLOb7LMOLfVterqjcYVj%2F%2BHtd38qey4TxqrAQaxpxntSy7PBvnVPO0MSmCZJ5%2FZWL7g%2Fv%2Bozlv%2Flex2K2EYoB9zigsYPS6lSx7%2Bj%2Bi59UYn6JgtTIGK635hdY%2FD9dnT7vxP6L%2F9X9F%2Bb4icxTYmFAMsMs6ti%2B2%2F9S9hwu3%2FAc3X32oHHOlVdtoroGS%2FR0vb9%2FAip8ILrwLrrv33rbn63zD02F5Zy22GtM8LdDMAACVPr6ZjGHxnAAAAAElFTkSuQmCC';

var menufont = "Arial";
if ($ljq.os == "win") {
	menufont = "Verdana";
}

GM_addStyle(''
+'#GB_overlay {'
+'	background: #000;'
+'	background: rgba(0, 0, 0, 0.50);'
+'  position: fixed;'
+'  margin: auto;'
+'  top: 0;'
+'  left: 0;'
+'  z-index: 1999999999;'
+'  width:  100%;'
+'  height: 100%;'
//+'  display: none;';
+'	font-size:10px;'
+'	text-decoration:none;'
+'	text-underline-style:none;'
+'	color:#000000;'
+'	display:none;'
+'}'
+'#GB_window div, #GB_window span, #GB_window applet, #GB_window object, #GB_window iframe, #GB_window h1,'
+'#GB_window h2, #GB_window h3, #GB_window h4, #GB_window h5, #GB_window h6, #GB_window p, #GB_window blockquote,'
+'#GB_window pre, #GB_window a, #GB_window abbr, #GB_window acronym, #GB_window address, #GB_window big,'
+'#GB_window cite, #GB_window code, #GB_window del, #GB_window dfn, #GB_window em, #GB_window font, #GB_window img,'
+'#GB_window ins, #GB_window kbd, #GB_window q, #GB_window s, #GB_window samp, #GB_window small, #GB_window strike,'
+'#GB_window strong, #GB_window sub, #GB_window sup, #GB_window tt, #GB_window var, #GB_window dl, #GB_window dt,'
+'#GB_window dd, #GB_window ol, #GB_window ul, #GB_window li, #GB_window fieldset, #GB_window form, #GB_window label,'
+'#GB_window legend, #GB_window table, #GB_window caption, #GB_window tbody, #GB_window tfoot, #GB_window thead,'
+'#GB_window tr, #GB_window th, #GB_window td, #GB_window fieldset, #GB_window input, #GB_window p {'
+'	margin:0; padding:0; border:0; outline:0; font-size:12px; font-weight:normal; font-style:none;'
+'	font-family:helvetica, verdana, sans-serif; text-align:left; vertical-align:baseline; text-decoration:none;'
+'	float:none; style-list-type:none; background:#FFF; background-color:#FFF; color:#000;'
+'	position:relative; overflow:visible; width:auto; height:auto;'
+'	text-decoration:none; text-underline-style:none; outline:none;'
//font-size:100%;
+'}'
+'#GB_window :focus { outline:0; }'
//+'#GB_window body { line-height:1; color:black; background:white; }'
+'#GB_window ol, #GB_window ul { list-style:none; }'
+'#GB_window table { border-collapse:separate; border-spacing:0; }'
+'#GB_window caption, #GB_window th, #GB_window td { text-align:left; font-weight:normal; }'
+'#GB_window blockquote:before, #GB_window blockquote:after, #GB_window q:before, #GB_window q:after { content: ""; }'
+'#GB_window blockquote, #GB_window q { quotes: "" ""; }'
+'#GB_window {'
+'  top: 20px;'
+'  position: fixed;'
+'  background: #FFF;'
+'  border: 5px solid #AAA;'
+'	border-radius: 8px;'
+'  -moz-border-radius: 8px;'
+'	-webkit-border-radius: 8px;'
+'  overflow: auto;'
+'  width: 550px;'
+'  min-height: 150px;'
//+'	max-height: 300px;'
+'  z-index: 1999999999;'
+'	display:none;'
//+'	top: '+((winH/2)-200)+'px;'
//+'	left: '+((winW/2)-275)+'px;'
//+'	font-size:1em;'
+'}'
+'#GB_window input {'
//+'	border:1px solid #000;'
//+'	border:auto;'
+'	background-color:#EEE;'
+'	line-height:auto;'
+'	border: 2px #ffffff inset;'
+'}'
+'#GB_window #GB_caption {'
//+'  font: 14px bold helvetica, verdana, sans-serif;'
+'	font-size: 14px;'
+'  color: #FFF;'
+'	background:#888888;'
+'  padding: 2px 0 2px 5px;'
+'	margin:0;'
+'  text-align: left;'
+'}'
+'#GB_window #GB_caption span {'
+'	line-height:16px;'
+'	font-size:14px;'
//+'	font-size:14px'
+'	background:#888888;'
+'	font-weight:bold;'
+'	color:#FFF;'
+'}'
+'#GB_window img.close {'
+'  position: absolute;'
+'  top: 2px;'
+'  right: 5px;'
+'  cursor: pointer;'
+'  cursor: hand;'
+'}'
//#GB_body 
+'#GB_window #GB_body {'
//+'  font-size: 1.0em;'
+'  padding: 5px;'
//+'  display:none;'
//+'  font: 1em normal helvetica, verdana, sans-serif;'
+'	color:#000000;'
//+'	background:#000;'
+'	text-align:left;'
+'}'
//#GB_body 
+'#GB_window a:link, #GB_window a:visited, #GB_window a:active {'
//+'#GB_window #GB_body a:link, #GB_window #GB_body a:visited, #GB_window #GB_body a:active {'
+'  color:#000;'
//+'  text-decoration:underline;'
+'}'
//#GB_body 
+'#GB_window a:hover {'
+'  color:#556992;'
//+'  text-decoration:none;'
+'}'
+'#gmmnu {'
+'  background-color: #E9E6E5;'
+'	border-radius: 8px;'
+'	-moz-border-radius: 8px;'
+'	-webkit-border-radius: 8px;'
+'  position: fixed;'
+'  margin: auto;'
//+'  bottom: 5px;'
+'	bottom: '+quicklist+'px;'
+'  right: 5px;'
+'  z-index: 1000;'
//+'  width: 150px;'
+'  width: 180px;'
+'  min-height: 20px;'
+'  padding:5px;'
+'  text-align:left;'
+'  border:2px solid #333;'
//+'  font-family:Arial;'
+'  font-family:'+menufont+';'
+'  color:#333;'
+'	font-size:10px;'
+'	text-decoration:none;'
+'	text-underline-style:none;'
+'}'
+'#gmmnu a:link, #gmmnu a:visited, #gmmnu a:hover, #gmmnu a:active {'
+'	color:#264074;'
+'	text-decoration:none;'
+'	text-underline-style:none;'
+'	font-size:10px;'
+'	border-bottom:0;'
//+'	font-size:.9em;'
+'}'
//+'#gmmnuheader {text-align:center;font-weight:bold;font-size:10pt;margin-bottom:5px;}'
+'#gmmnu_title {text-align:center;font-weight:bold;font-size:10pt;line-height:16px;}'
+'#gmmnu_err {display:none;}'
+'#gmmnu_errmsg {font-size:9pt;margin-bottom:5px;}'
+'#gmmnu_links, '
+'#gmmnu_links_3d {'
//+'	display:none;'
+'	text-decoration:none;'
+'	min-height:20px;'
+'}'
+'#gmmnu_links_3d {'
+'	display:none;'
//+'	text-decoration:none;'
//+'	min-height:20px;'
+'}'
//+'#gmmnulinksheader, #gmmnuerrheader {'
+'#gmmnu .header {'
+'	position: relative;'
+'  font-weight:bold;'
+'  font-size:8pt;'
+'  margin:0 0 2px 0;'
//+'  padding:5px 0 0 0;'
+'  border-bottom:1px solid #000000;'
//+'	margin-bottom:5px;'
//+'	margin-top:5px;'
+'	display:block;'
+'  line-height: 20px;'
+'}'
+'#gmmnu .header .format_mp4 {'
+'	position: absolute;'
+'	top: 0;'
+'	right: 32px;'
+'  line-height: 18px;'
+'  font-size:11px;'
+'	display: inline;'
+'	margin-right: 2px;'
+'  font-size:10px;'
+'  font-weight:normal;'
+'	border-bottom:2px solid #000000;'
+'}'
+'#gmmnu .header .format_flv {'
+'	position: absolute;'
+'	top: 0;'
+'	right: 10px;'
+'  line-height: 18px;'
+'  font-size:10px;'
+'	display: inline;'
+'	margin-right: 2px;'
+'  font-size:11px;'
+'  font-weight:normal;'
+'	border-bottom:2px solid #d71e25;'
+'}'
+'#gmmnu .header .format_webm {'
+'	position: absolute;'
+'	top: 0;'
+'	right: 56px;'
+'  line-height: 18px;'
+'  font-size:11px;'
+'	display: inline;'
+'	margin-right: 2px;'
+'  font-size:10px;'
+'  font-weight:normal;'
+'	border-bottom:2px solid #acd147;'
+'}'
+'#gmmnu_linksfiles, '
+'#gmmnu_linksfiles_3d {'
+'  line-height: 20px;'
+'  font-size:11px;'
+'	vertical-align:middle;'
+'}'
/*
+'#gmmnu_linksfiles .link {'
+'	border-right:2px solid #336699;'
+'}'
+'#gmmnu_linksfiles .link {'
+'	border-right:2px solid #336699;'
+'}'
+'#gmmnu_linksfiles .link {'
+'	border-right:2px solid #336699;'
+'}'
+'#gmmnu_linksfiles .link {'
+'	border-right:2px solid #336699;'
+'}'
*/
+'#gmmnu_linksfiles .link a, #gmmnu_linksfiles .link a:visited, #gmmnu_linksfiles .link a:active, '
+'#gmmnu_linksfiles_3d .link a, #gmmnu_linksfiles_3d .link a:visited, #gmmnu_linksfiles_3d .link a:active {'
+'	position: relative;'
+'  line-height: 20px;'
+'	background-repeat:no-repeat;'
+'	background-position: left center;'
+'	font-weight:900;'
+'	padding-left:2px;'
+'	overflow:hidden;'
+'	display:block;'
+'  font-size:11px;'
//+'	text-decoration:none;'
//+'	text-underline-style:none;'
+'	white-space:nowrap;'
+'	vertical-align:middle;'
//+'	margin-bottom: 2px;'
+'	outline:none;'
//+'	border-right:2px solid #336699;'
+'}'
+'#gmmnu_linksfiles .link a.format, #gmmnu_linksfiles .link a.format:visited, #gmmnu_linksfiles .link a.format:active, '
+'#gmmnu_linksfiles_3d .link a.format, #gmmnu_linksfiles_3d .link a.format:visited, #gmmnu_linksfiles_3d .link a.format:active {'
+'	color:#000;'
+'}'
+'#gmmnu_linksfiles .link a[data-format="mp4"], '
+'#gmmnu_linksfiles_3d .link a[data-format="mp4"] {'
//+'	border-right:2px solid #000000;'
+'}'
+'#gmmnu_linksfiles .link a[data-format="flv"], #gmmnu_linksfiles .link a[data-format="svq"], '
+'#gmmnu_linksfiles_3d .link a[data-format="flv"], #gmmnu_linksfiles_3d .link a[data-format="svq"] {'
//+'	border-right:2px solid #d71e25;'
+'}'
+'#gmmnu_linksfiles .link a[data-format="webm"], '
+'#gmmnu_linksfiles_3d .link a[data-format="webm"] {'
//+'	border-right:2px solid #acd147;'
+'}'
+'#gmmnu_linksfiles .link a:hover, '
+'#gmmnu_linksfiles_3d .link a:hover {'
+'	background-color:#ccc;'
+'}'
+'#gmmnu_linksfiles .link a span.format, #gmmnu_linksfiles .link a:visited span.format, #gmmnu_linksfiles .link a:active span.format, '
+'#gmmnu_linksfiles_3d .link a span.format, #gmmnu_linksfiles_3d .link a:visited span.format, #gmmnu_linksfiles_3d .link a:active span.format {'
+'	position: absolute;'
+'	top: 0;'
+'	right: 0;'
+'  line-height: 20px;'
+'  font-size:11px;'
+'	display: inline;'
+'	margin-right: 2px;'
+'  font-size:11px;'
+'  font-weight:normal;'
+'}'
+'#gmmnu_linksfiles .link a span.size, '
+'#gmmnu_linksfiles_3d .link a span.size {'
+'	position: absolute;'
+'	top: 0;'
+'	right: 0;'
+'  line-height: 20px;'
+'  font-size:11px;'
+'	display: inline;'
+'	margin-right: 2px;'
+'  font-size:11px;'
+'  font-weight:normal;'
//+'  z-index: 1010;'
//+'  background-color: #E9E6E5;'
+'}'
+'#gmmnu_linksfiles .link .side_size, '
+'#gmmnu_linksfiles_3d .link .side_size {'
+'	position: absolute;'
+'	float:left;'
+'	left:-40px;'
+'	background-color: #E9E6E5;'
+'	padding-right:3px;'
+'	border:1px solid #000;'
+''
+''
+''
+'}'
+'#GB_settings {'
+'	'
+'}'
+'#GB_window ul.tabs {'
+'	margin: 0;'
+'	padding: 0;'
+'	float: left;'
//+'	width:500px;'
+'	list-style: none;'
//+'	list-style-type: none;'
+'	height: 32px;'
+'	border-bottom: 1px solid #999;'
+'	border-left: 1px solid #999;'
+'	width: 100%;'
+'	z-index:9000;'
+'	display:inline;'
+'	width: 100%;'
+'	clear:none;'
//+'	background: #e0e0e0;'
+'}'
+'#GB_window ul.tabs li {'
+'	float: left;'
+'	margin: 0;'
+'	padding: 0;'
+'	height: 31px;'
+'	list-style: none;'
//+'	list-style-type: none;'
+'	line-height: 31px;'
+'	border: 1px solid #999;'
+'	border-left: none;'
+'	margin-bottom: -1px;'
+'	background: #e0e0e0;'
+'	overflow: hidden;'
+'	position: relative;'
+'	z-index:9001;'
//+'	display:block;'
+'	clear:none;'
+'	display:block;'
+'}'
+'#GB_window ul.tabs li a {'
+'	text-decoration: none;'
+'	color: #000;'
+'	display: block;'
//+'	display:inline;'
+'	font-size: 1.2em;'
+'	padding: 0 15px 0 30px;'
+'	border: 1px solid #fff;'
+'	outline: none;'
//+'	background: #e0e0e0;'
+'	background: #e0e0e0;'
+'	z-index:9002;'
+'	clear:none;'
//+'	background-image:url('+icon_lists+');'
//+'	background-repeat:no-repeat;'
//+'	background-position: left center;'
+'}'
+'#GB_window ul.tabs li a.about {'
+'	background-image:url('+icon_about+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'	z-index:9003;'
+'	clear:none;'
//+'	margin-top:-2px;'
+'	padding-bottom:2px;'
+'	display:block;'
+'	line-height:31px;'
+'}'
+'#GB_window ul.tabs li a.vidopt {'
+'	background-image:url('+icon_font+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'	z-index:9003;'
+'	clear:none;'
//+'	margin-top:-2px;'
+'	padding-bottom:2px;'
+'	display:block;'
+'	line-height:31px;'
+'}'
+'#GB_window ul.tabs li a.misc {'
+'	background-image:url('+icon_misc+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'	z-index:9003;'
+'	clear:none;'
//+'	margin-top:-2px;'
+'	padding-bottom:2px;'
+'	display:block;'
+'	line-height:31px;'
+'}'
+'#GB_window ul.tabs li a.help {'
+'	background-image:url('+icon_help+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'	z-index:9003;'
+'	clear:none;'
//+'	margin-top:-2px;'
+'	padding-bottom:2px;'
+'	display:block;'
+'	line-height:31px;'
+'}'
//+'#GB_window li {'
//+'	background: #e0e0e0;'
//+'}'
+'#GB_window ul.tabs li a:hover {'
+'	background-color: #ccc;'
+'}'
//+'#GB_window #GB_body a:link, #GB_window #GB_body a:visited, #GB_window #GB_body a:active {'
//+'#GB_window ul.tabs li a:link {'
//+'  color:#0000EE;'
//+'  text-decoration:underline;'
//+'	background: #e0e0e0;'
//+'}'
//+'#GB_window html ul.tabs li.active, #GB_window html ul.tabs li.active a:hover  {'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a:link, #GB_window ul.tabs li.active a:hover  {'
+'	background: #fff;'
+'	border-bottom: 1px solid #fff;'
+'}'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a.about:link, #GB_window ul.tabs li.active a.about:hover {'
+'	background-image:url('+icon_about+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li.vidopt, #GB_window ul.tabs li.active a.vidopt:link, #GB_window ul.tabs li.active a.vidopt:hover {'
+'	background-image:url('+icon_font+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a.misc:link, #GB_window ul.tabs li.active a.misc:hover {'
+'	background-image:url('+icon_misc+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a.help:link, #GB_window ul.tabs li.active a.help:hover {'
+'	background-image:url('+icon_help+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window .tab_container {'
+'	border: 1px solid #999;'
+'	border-top: none;'
//+'	border-bottom: none;'
+'	clear: both;'
+'	float: left; '
//+'	position:relative;'
+'	width: 100%;'
+'	background: #fff;'
+'	margin-bottom:5px;'
+'}'
+'#GB_window .tab_content {'
+'	padding: 20px;'
//+'	font-size: 1.2em;'
+'	position:relative;'
+'	display:block;'
+'}'
+'#GB_window .tab_content a:link, #GB_window .tab_content a:visited, #GB_window .tab_content a:hover, #GB_window .tab_content a:active {'
+'	color:#FA0000;'
+'	border-bottom:1px dashed #FF0000;'
//+'	text-decoration:#EEE solid;'
//+'	text-underline-style:dashed;'
+'}'
+'#GB_window .tab_container img {'
+'	vertical-align:middle;'
+'	text-align:center;'
+'}'
+'#GB_window .tab_content h2 {'
+'	font-weight: normal;'
+'	padding-bottom: 5px;'
+'	margin-bottom: 10px;'
+'	border-bottom: 1px dashed #ddd;'
+'	font-size: 14px;'
+'}'
+'#GB_window .tab_content h3 a {'
+'	color: #254588;'
+'}'
//+'#GB_window p {'
//+'	font-size: 12px;'
//+'}'
//+'#GB_body .tab_content img {'
//+'	float: left;'
//+'	position:relative;'
//+'	margin: 0 20px 20px 0;'
//+'	border: 1px solid #ddd;'
//+'	padding: 5px;'
//+'}'
//+'#GB_trackers {'
//+'	'
//+'}'
//+'#GB_lists {'
//+'	'
//+'}'
//+'#GB_list-tracker {'
//+'	'
//+'}'
+'#GB_initialize {'
+' display:none;'
+'}'
+'#gmmnu_menu {'
+'	margin-bottom:-2px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	font-family:Arial;'
+'  text-align:left;'
//+'  font-size:10px;'
+'	display:block;'
+'	outline:none;'
+'	padding-bottom:1px;'
+'}'
+'#gmmnu_menu .menubar .config {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	background-image:url('+icon_config+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
+'}'
+'#gmmnu_menu .menubar .update {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	background-image:url('+icon_update+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
//+'	visibility: hidden;'
//+'	display: none;'
+'}'
+'#gmmnu_menu .menubar .update_grey {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	background-image:url('+icon_update_grey+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
+'}'
+'#gmmnu_menu .menubar .donate {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	background-image:url('+icon_donate+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
+'}'
+'#gmmnu_menu .menubar .home {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	background-image:url('+icon_home+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
+'}'
//twitter icon 15x15 tweak height - donation hover makes it move 1px down
+'#gmmnu_menu .menubar .twitter {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 23px;'
+'	height: 23px;'
+'	background-image:url('+icon_twitter+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
+'}'
+'#gmmnu_menu .menubar {'
+'	display: block; height: 24px; line-height: 24px; margin-left: -3px; margin-right: -3px;'
+'}'
+'#gmmnu_menu .menubar div :hover {'
//+'	background-color: #CCC;'
+'}'
+'#gmmnu #gmmnu_donations {'
+'	position:relative;'
//+'	display: none; margin: 0 -5px -5px -5px; padding:5px 5px 5px 5px;'
+'	display:none;'
+'}'
+'#gmmnu #gmmnu_donations .icon_donate_paypal, #GB_window .icon_donate_paypal {'
+'	margin-top:5px;'
//+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 48px;'
+'	height: 48px;'
+'	background-image:url('+icon_donate_paypal+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	text-align:center;'
+'	display:block;'
+'	outline:none;'
+'	width: 75px;'
+'	text-decoration:none;'
+'}'
+'#gmmnu #gmmnu_donations .icon_donate_flattr, #GB_window .icon_donate_flattr {'
+'	margin-top:5px;'
//+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 20px;'
+'	height: 20px;'
+'	background-image:url('+icon_donate_flattr+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	text-align:center;'
+'	display:block;'
+'	outline:none;'
+'	width: 75px;'
+'	text-decoration:none;'
+'}'
+'	#gm_tab_firefox img, #gm_tab_chrome img {'
+'	background-color:#CCCCCC;'
+'	padding:1px;'
+'	border:1px solid #909090'
+'}'
+'');

var GB_DONE = false;
var GB_HEIGHT = 100;
var GB_WIDTH = 550;

function GB_show(caption, body, height, width) {
	//var winW = window.innerWidth;
	//winH = window.innerHeight;
	//var newW = (winW/2)-275;
	//style='left:"+newW+"px'
  
	GB_HEIGHT = height || 100;
	GB_WIDTH = width || 550;
	if(!GB_DONE) {
		$ljq("#GB_initialize").html("<div id='GB_overlay'></div><div id='GB_window'>\n<div id='GB_caption'>"+caption+"</div>\n"
			+ "<img class='close' src='"+gb_close+"' alt='Close window'/>\n<div id='GB_body'>\n"+body+"\n</div></div>");
		$ljq("#GB_window img").click(GB_hide);
		$ljq("#GB_overlay").click(GB_hide);
		$ljq(window).on("resize", function() {
			GB_position();
		});
	GB_DONE = true;
	}
  
	$ljq(document).on('keydown.facebox', function(e) {
	if (e.keyCode == 27) {
		GB_hide();
	}
	return true;
	});

	$ljq("#GB_initialize").show();
  
	$ljq("#GB_overlay").show();
	GB_position();

	$ljq("#GB_window").show();
}

function GB_hide() {
	$ljq("#GB_initialize").html('');
	$ljq("#GB_window,#GB_overlay,#GB_initialize").hide();
	//GM_log('unbind!');
	$ljq(window).off();
	if (videolistRefresh) {
		videolistRefresh = false;
		generate_links();
	}
}

function GB_position() {
	//GM_log('resized!');
	var de = document.documentElement;
	var w = self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	//$ljq("#GB_window").css({width:GB_WIDTH+"px",height:GB_HEIGHT+"px",
	//left: ((w - GB_WIDTH)/2)+"px" });
	$ljq("#GB_window").css({left: ((w - GB_WIDTH)/2)+"px" });
	//$ljq("#GB_frame").css("height",GB_HEIGHT - 32 +"px");
}

//Vars used throughout script
var pattern = '';
var matches = '';

//Debugging
//GM_setValue('lastCheck', 0);
//GM_setValue('lastVersion', 0);
var lastCheck = GM_getValue('lastCheck', 0);
var lastVersion = GM_getValue('lastVersion', 0);
//alert(lastCheck+" "+lastVersion);
GMlog("lastCheck: "+lastCheck+" lastVersion: "+lastVersion);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
var name = "";
var ver = "";
var notes = "";
var	running_version = '';
var	latest_version = '';
var videoLength = "";
var newtitle = "";

function updateCheck() {
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://userscripts.org/scripts/source/'+scriptId+'.meta.js',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain'},
    onload: function(res) {
    if (res.status == '200') {
	try {
    var text = res.responseText;
    //alert(text);
    GMlog(text);
    
	pattern = /(@name(\t+|\s+)?(.*)(\r|\n)?)/ig;
	matches = text.match(pattern);
	//alert(matches[0].replace(pattern, "$3"));
	name = matches[0].replace(pattern, "$3");
	
    pattern = /(@version(\t+|\s+)?(.*)(\r|\n)?)/ig;
	matches = text.match(pattern);
	//alert(matches);
	//alert(matches[0].replace(pattern, "$3"));
	ver = matches[0].replace(pattern, "$3");
	ver = $ljq.trim(ver);
	
	pattern = /(@notes(\t+|\s+)?(.*)(\r|\n)?)/ig;
	matches = text.match(pattern);
	//alert(matches[0].replace(pattern, "$3"));
	notes = matches[0].replace(pattern, "$3");
	
	running_version = parseVersionString(scriptVersion);
	latest_version = parseVersionString(ver);
	//alert(running_version.major+'.'+running_version.minor+'.'+running_version.patch+' '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
	
	var showupdatealert = false;
	//alert(running_version.major+'.'+running_version.minor+'.'+running_version.patch+' '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
	if (running_version.major < latest_version.major) {
	    // A major new update is available!
	    showupdatealert = true;
	    //alert("Major update");
	} else if (running_version.minor < latest_version.minor) {
	    // A new minor update is available.
	    if (running_version.major <= latest_version.major) {
	    	showupdatealert = true;
	    	//alert("Minor update");
	    }
	} else if (running_version.patch < latest_version.patch){
	    // A new patch update is available.
	    if (running_version.major <= latest_version.major) {
	    	if (running_version.minor <= latest_version.minor) {
	    		showupdatealert = true;
	    		//alert("Patch update");
	    	}
	    }
	}

    if (showupdatealert) {
		showupdatealert = false;
		lastVersion = parseVersionString(lastVersion.toString());
		//alert(lastVersion.major+'.'+lastVersion.minor+'.'+lastVersion.patch+' '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
		if (lastVersion.major < latest_version.major) {
		    // A major new update is available!
		    showupdatealert = true;
		    //alert("Major update");
		} else if (lastVersion.minor < latest_version.minor) {
		    // A new minor update is available.
		    if (lastVersion.major <= latest_version.major) {
		    	showupdatealert = true;
		    	//alert("Minor update");
		    }
		} else if (lastVersion.patch < latest_version.patch){
		    // A new patch update is available.
		    if (lastVersion.major <= latest_version.major) {
		    	if (lastVersion.minor <= latest_version.minor) {
		    		showupdatealert = true;
		    		//alert("Patch update");
		    	}
		    }
		}
		
		if (showupdatealert) {
			//Show update alert and info
			//alert("alertUpdate");
			//alertUpdate(scriptId, name, ver, notes);
			$ljq("#gmmnu_menu .menubar #update_icon a").removeClass('update_grey').addClass('update').attr("data-title", "Update to v"+ver);
		} else {
			//Dont check for 24 hours
			//alert("lastCheck");
			GM_setValue('lastCheck', currentTime);
		}
	} else {
		//Dont check for 24 hours
		//alert("lastCheck");
		GM_setValue('lastCheck', currentTime);
	}
	
	if (debugUpdate == true) {
		alertUpdate(scriptId, name, ver, notes);
	}
	
	} catch(e) {} //try
	} //status
    } //onload
	});
}

function alertUpdate(scriptId, name, ver, notes) {
	//alert(scriptId+"\n"+name+"\n"+ver+"\n"+notes);
	GB_DONE = false;
	//running_version = parseVersionString(scriptVersion);
	//latest_version = parseVersionString(ver);
	
	var text = '<div class="tab_content" style="padding:0;">';
	text += '<div style="margin:0 auto; text-align:center; font-size:13px;">There is an update available for &quot;'+scriptName+'&quot;</div>';
	text += '<div style="clear:both; margin-bottom:10px;"></div>';

	text += '<div style="margin:0 auto; text-align:center;"><strong style="font-size: 14px; font-weight:bold;">Upgrade to the Latest</strong></div>';
	text += '<div style="clear:both; margin-bottom:5px;"></div>';
	
	// vertical-align:middle;
	text += '<div style="width:170px; height:75px; line-height:75px; margin:0 auto;">';
	//text += '<span style="height:69px; line-height:69px; margin-top:-20px;">-></span>';
	//text += '<div style="position:relative; float:left; width:50px; height:50px; line-height:50px; background-color:#eee; border: 2px solid #aaa; -moz-border-radius: 5px; vertical-align:middle;">';
		text += '<div style="position:relative; float:left; width:65px; height:75px; line-height:75px; background-image: url(\''+update_grey+'\'); background-repeat:no-repeat; background-position: top left; vertical-align:middle; text-align:center">';
			text += '<div style="margin-top:-5px; margin-left:17px; background:none; font-size:13px;">'+running_version.major+'.'+running_version.minor+'.'+running_version.patch+'</div>';
			//text +=	'<div>'+running_version.major+'.'+running_version.minor+'.'+running_version.patch+'</div>';
			//text +=	'<div style="float:left; background:none;">'+running_version.major+'.'+running_version.minor+'.'+running_version.patch+'</div>';
		text += '</div>';
		//text += '<div style="float:left;">x</div>';
		text += '<div style="position:relative; float:right; width:65px; height:75px; line-height:75px; background-image: url(\''+update_green+'\'); background-repeat:no-repeat; background-position: top left; vertical-align:middle;">';
			text += '<div style="margin-top:-5px; margin-left:17px; background:none; font-size:13px;">'+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch+'</div>';
		text += '</div>';
	text += '</div>';
	//text += '';
	text += '<div style="clear:both;"></div>';
	
	text += '<div style="width:150px; margin:0 auto; line-height:30px; vertical-align:middle;">';
		text += '<div style="position:relative; float:left; width:50px; vertical-align:middle;">';
			text += '<div style="margin-top:-10px; margin-left:-2px; font-size: 13px;">Installed</div>';
		text += '</div>';
		text += '<div style="position:relative; float:right; width:60px; vertical-align:middle;">';
			text += '<div style="margin-top:-10px; margin-left:6px; color:#198835; font-size:13px; text-align:center;">Available</div>';
		text += '</div>';
	text += '</div>';
	//text += '<hr/><br/>';
	text += '<div style="clear:both; height:1px; background-color:#000000; margin-top:5px; margin-bottom:5px;"></div>';
	
	//-moz-border-radius: 5px;
	//text += '<div style="min-width:20px; height:20px; line-height:20px; background-color:#00FF00; border:1px solid #00FF00; -moz-border-radius: 5px;">';
	text += '<div style="margin:0 auto; text-align:center;">';
	text += '<strong style="font-size: 14px; font-weight:bold;">What would you like to do?</strong>';
	text += '</div>';
	//text += '</div>';
	//text += '<br/>';
	text += '<div style="clear:both; margin-bottom:5px;"></div>';
	text += '<div style="width:330px; margin:0 auto; vertical-align:middle;">';
	text += '<div style="position:relative; float:left; width:160px; vertical-align:middle; text-align:right; display: block; line-height: 22px;">';
		text += '<a href="http://userscripts.org/scripts/show/'+scriptId+'" title="http://userscripts.org/scripts/show/'+scriptId+'" style="font-size: 13px; color:#0000EE; border-bottom:1px dashed #AAA;">Go to Script Homepage</a>';
	text += '</div>';
	//text += '<br/>';
	text += '<div style="position:relative; float:right; width:160px; vertical-align:middle; text-align:left; display: block; line-height: 22px;">';
		text += '<a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js" style="color: #198835; border-bottom:1px dashed #AAA; font-size: 13px;">Upgrade to '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch+' now</a>';
	text += '</div>';
	//text += '<div style="clear:both;></div>';
	text += '<br/>';
	text += '<div style="position:relative; float:left; width:160px; vertical-align:middle; text-align:right; display: block; line-height: 22px;">';
		text += '<a href="#" id="gb_update_wait" style="font-size: 13px; color:#0000EE; border-bottom:1px dashed #AAA;">Remind me tomorrow</a>';
	text += '</div>';
	//text += '<br/>';
	text += '<div style="position:relative; float:right; width:160px; vertical-align:middle; text-align:left; display: block; line-height: 22px;">';
		text += '<a href="#" id="gb_update_waitnextversion" style="font-size: 13px; color:#0000EE; border-bottom:1px dashed #AAA;">Skip this version</a>';
	text += '</div>';
	text += '</div>';
	//text += '<br/>';
	text += '<div style="clear:both; margin-bottom:2px;"></div>';
	text += '<div style="clear:both; height:1px; background-color:#000000; margin-top:5px; margin-bottom:5px;"></div>';
	
	text += '<div style="margin:0 auto; text-align:center;">';
	text += '<strong style="font-size: 14px; font-weight:bold;">Donations and Reviews</strong>';
	text += '</div>';
	text += '<div style="clear:both; margin-bottom:5px;"></div>';
	text += '<div style="text-align:center; font-size: 12px; line-height:16px;">';
	text += 'Please consider Donating or writing a Review if you enjoy using this userscript.<br/>'
	text += 'Donation options can be found in the menu or the Configuration overlay.';
	text += '</div>';
	text += '<div style="clear:both; margin-bottom:2px;"></div>';
	text += '<div style="clear:both; height:1px; background-color:#000000; margin-top:5px; margin-bottom:5px;"></div>';
	
	text += '<div style="margin:0 auto; text-align:center;">';
	text += '<strong style="font-size: 14px; font-weight:bold;">Update Notes</strong>';
	text += '</div>';
	text += '<div style="clear:both; margin-bottom:5px;"></div>';
	text += '<div style="text-align:left; font-size: 12px; line-height:16px;">';
	text += notes.replace(/\\/g, '');
	text += '</div>';
	text += '</div>';
	
	//$ljq("#GB_body").html(ver+'<br/>'+scriptId+'<br/>'+name+'<br/>'+notes+'<br/>'+ver+'<br/>'+scriptId+'<br/>'+name+'<br/>'+notes+'<br/><br/><br/>'+ver+'<br/>'+scriptId+'<br/>'+name+'<br/>'+notes+'<br/>');
	//$ljq("#GB_body").html(text);

	var t = '<span style="font-weight:bold;">Update Alert!</span> - '+scriptName;
	//name
    //GB_show(t,u,600,600);
    GB_show(t,text,0,550);
    //return false;    
    //alert(latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
    
    //Initial display of content - check height
	tab_content_height();
}

/*
function vidopt_update_title(overlay) {	
	if (overlay) {
		//alert("true");
		//alert($ljq(this).val());
		//load_list($ljq(this).val());
		newtitle = $ljq("#gm_settings_vidopt_title").val();
		newtitle = newtitle.replace(/%T/g, title).replace(/%U/g, user).replace(/%Y/g, year).replace(/%M/g, month).replace(/%D/g, day).replace(/%V/g, vcode).replace(/%L/g, videoLength).replace(/%%/g, "%");
		$ljq('#gm_tab_vidopt #dltitle').html(newtitle);
	} else {
		//alert("false");
		newtitle = GM_getValue('gm_title', '');
		newtitle = newtitle.replace(/%T/g, title).replace(/%U/g, user).replace(/%Y/g, year).replace(/%M/g, month).replace(/%D/g, day).replace(/%V/g, vcode).replace(/%L/g, videoLength).replace(/%%/g, "%");
		generate_links();
	}
}
*/

function showConfiguration() {
	GB_DONE = false;
	
	var t = '<span>'+scriptName+' - Configuration...</span>';
	var text = ''
		+'<ul class="tabs">'
		+'<li><a href="#gm_tab_about" class="about">About</a></li>'
		+'<li><a href="#gm_tab_vidopt" class="vidopt">Video Title</a></li>'
		+'<li><a href="#gm_tab_help" class="help">Help</a></li>'
		+'</ul>'
		+'<div class="tab_container">'
			+'<div id="gm_tab_about" class="tab_content">'
			+'	<h2>'+scriptName+' [v'+scriptVersion+'] '
			+'	<a href="http://userscripts.org/scripts/show/'+scriptId+'">http://userscripts.org/scripts/show/'+scriptId+'</a></h2>'
			+'	<p>'
			+'	<div style="display:block; position:relative; height:30px; line-height:18px;">'
			+'		<div style="display:inline; position:relative; float:left; width:90px; text-align:center; vertical-align:bottom;">'
			+'			<center><a href="'+donationLink_flattr+'" target="_blank" class="icon_donate_flattr">'
			//+'			<img src="'+icon_donate_flattr+'">'
			+'			</a></center>'
			+'				<div style="height:10px; clear:both;"></div>'
			+'			<center><a href="'+donationLink_paypal+'" target="_blank" class="icon_donate_paypal">'
			//+'			<img src="'+icon_donate_paypal+'">'
			+'			</a></center>'
			+'		</div>'
			+'		<div style="display:inline; position:relative; float:left; margin-left:10px; text-align:left; vertical-align:top; width:380px;">'
			+'			Donations are for the time spent creating and updating this userscript and are greatly appreciated!'
			+'			<br>This script has been released as Open Source under the GPL.'
			+'		</div>'
			+'	</div>'
			+'	</p>'
			+'	<div style="height:20px; clear:both;"></div>'
			+'	<h2>This versions update text...</h2>'
			+'	<p style="line-height:18px;">'
			+'	'+scriptUpdateText
			+'	</p>'
			+'</div>'
			
			+'<div id="gm_tab_vidopt" class="tab_content">'
			+'	<h2>Video Title - Create a custom download file title.</h2>'
			+'	<div style="display:inline;">'
					+'	<div style="width:400px; float:left; display:inline;">'
						//+'	Title'
						+'	<span style="font-size:14px;">Title</span>'
						+'		<input id="gm_settings_vidopt_title" style="margin-top:-2px; width:400px; height:30px; font-size: 1.5em;" type="text" value="'+gm_title+'">'
					+'	</div>'
					+'	<div style="width:50px; float:left; margin-left:10px;">'
						+'	&nbsp;<br/>'
						+'		<input id="gm_settings_vidopt_titlesavebtn" style="width:auto; height:30px; font-size: 1.5em; color: #003333; border-bottom: #d3d3d3 1px solid; border-left: #d3d3d3 1px solid; border-top: #d3d3d3 1px solid; border-right: #d3d3d3 1px solid;" type="button" value="Save">'
					+'	</div>'
				+'	</div>'
			+'	<div style="clear:both;"></div>'
				+'	<br /><br /><h2>Current Title Example</h2>'
				+'	<div id="dltitle">'+title+'</div>'
			+'	<div style="clear:both;"></div>'
				+'	<br /><br /><h2>Legend (Case Sensitive)</h2>'
				+'	%T = Title of video'
				+'	<br />%U = User (uploader)'
				+'	<br />%V = Video ID'
				+'	<br />%Q = Quality (480p/720p) [NOTE - Example wont show quality, generated titles in links will.]'
				+'	<br />%L = Length (min:sec)'
				+'	<br />%Y = Year'
				+'	<br />%M = Month'
				+'	<br />%D = Day'
				+'	<br />%% = Litteral percent sign'
			+'</div>'
			
			+'<div id="gm_tab_help" class="tab_content">'
				+'	<h2>Help</h2>'
				+'	<p style="line-height:20px;">Head over to <a href="http://userscripts.org/scripts/discuss/'+scriptId+'">Discussions</a> '
				+'	and create a topic for help.<br>'
				+'	<a href="http://userscripts.org/topics/98613?page=1">Upgrade v0.4.0 instructions discussion</a>'
				+'	</p>'
			+'</div>'
			
		+'</div>'
		+'';
    GB_show(t,text,0,550);
    
    //vidopt_update_title(true);
    newtitle = $ljq("#gm_settings_vidopt_title").val();
	newtitle = newtitle.replace(/%T/g, title).replace(/%U/g, user).replace(/%Y/g, year).replace(/%M/g, month).replace(/%D/g, day).replace(/%V/g, vcode).replace(/%L/g, videoLength).replace(/%%/g, "%");
	$ljq('#gm_tab_vidopt #dltitle').html(newtitle);
    
    //$ljq("#gm_settings_vidopt_titleprefix, #gm_settings_vidopt_titlesuffix").keyup(function() {
    $ljq("#gm_settings_vidopt_title").keyup(function() {
    	if ($ljq("#gm_settings_vidopt_titlesavebtn").val() == "Saved!" ) {
    		$ljq("#gm_settings_vidopt_titlesavebtn").val("Save");
    	}
    	//vidopt_update_title(true);
    	newtitle = $ljq("#gm_settings_vidopt_title").val();
		newtitle = newtitle.replace(/%T/g, title).replace(/%U/g, user).replace(/%Y/g, year).replace(/%M/g, month).replace(/%D/g, day).replace(/%V/g, vcode).replace(/%L/g, videoLength).replace(/%%/g, "%");
		$ljq('#gm_tab_vidopt #dltitle').html(newtitle);
		//$ljq("#gm_settings_vidopt_title").animateHighlight("#dd0000", 1000);
		//$ljq("#gm_settings_vidopt_title").effect("highlight", {}, 3000);
		return false;
	});
	
	$ljq("#gm_settings_vidopt_titlesavebtn").on('click', function(event) {
		event.preventDefault();
		//alert("Save!");
		GMlog("titlesavebtn clicked");
		if ($ljq("#gm_settings_vidopt_title").val() == "") {
			alert("Cannot save a blank title!");
		} else {
			//GMlog("titlesavebtn\npre:"+$ljq("#gm_settings_vidopt_titleprefix").val()+"\nsuf:"+$ljq("#gm_settings_vidopt_titlesuffix").val());
			//GMlog("titlesavebtn:"+$ljq("#gm_settings_vidopt_title").val());
			GM_setValue('gm_title', $ljq("#gm_settings_vidopt_title").val());
			gm_title = GM_getValue('gm_title', '');
			GMlog("gm_title saved :"+gm_title);
			$ljq(this).val("Saved!");
			//vidopt_update_title(false);
			videolistRefresh = true;
		}
	});
    
    //=====================
    
    function show_confirm(msg) {
	var r=confirm(msg);
		if (r) {
			//alert("You pressed OK!");
			return true;
		} else {
 			//alert("You pressed Cancel!");
 			return false;
 		}
	}
	
    //Default Action
	$ljq("#GB_window .tab_content").hide(); //Hide all content
	$ljq("#GB_window ul.tabs li").removeClass("active").show(); //Deactivate all tabs
	$ljq("#GB_window ul.tabs li:first").addClass("active").show(); //Activate first tab
	$ljq("#GB_window .tab_content:first").show(); //Show first tab content
	
	//On Click Event
	$ljq("#GB_window ul.tabs li").on('click', function(event) {
		event.preventDefault();
		//alert("click");
		$ljq("#GB_window ul.tabs li").removeClass("active"); //Remove any "active" class
		$ljq(this).addClass("active"); //Add "active" class to selected tab
		$ljq("#GB_window .tab_content").hide(); //Hide all tab content
		var activeTab = $ljq(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$ljq(activeTab).show(); //Fade/Hide in the active content
		//alert($ljq("#GB_window").height()+"\n"+$ljq(window).height());
		//Switched tabs - check height
		tab_content_height();
		//alert(activeTab);
		return false;
	});
	
	//Initial display of content - check height
	tab_content_height();
}

function showUpgradeInstructions(browser) {
	GB_DONE = false;
	
	var t = '<span>'+scriptName+' - Upgrade process...</span>';
	var text = ''
		+'<ul class="tabs">'
		+'<li><a href="#gm_tab_firefox" class="about">Firefox</a></li>'
		+'<li><a href="#gm_tab_chrome" class="about">Chrome</a></li>'
		+'</ul>'
		+'<div class="tab_container">'
			+'<div id="gm_tab_firefox" class="tab_content">'
			+'	<h2>Firefox'
			+'	<a href="http://userscripts.org/topics/98613?page=1">Upgrade instructions discussion</a></h2>'
			+'	<span style="font-size:14px;">'
			+'	Step 1a) Click the Firefox ribbon menu, then click Add-ons.<br/>'
			+'	<img src="http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradefirefox1.jpg"><br/><br/>'
			+'	Step 1b) Or click the Tools menu, then click Add-ons.<br/>'
			+'	<img src="http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradefirefox2.jpg"><br/><br/>'
			+'	Step 2) Click User Scripts.<br/>'
			+'	<img src="http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradefirefox3.jpg"><br/><br/>'
			+'	Step 3) Locate the old YouTube.com - EZ Download script and remove it.<br/>'
			+'	<img src="http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradefirefox4.jpg"><br/><br/><br/>'
			+'	Step 4) Refresh the YouTube page and the new version will work! =D<br/><br/>'
			+'	This was caused by a minor name change in v0.4.0, sorry!'
			+'	</span>'
			+'</div>'
			
			+'<div id="gm_tab_chrome" class="tab_content">'
			+'	<h2>Chrome'
			+'	<a href="http://userscripts.org/topics/98613?page=1">Upgrade instructions discussion</a></h2>'
			+'	<span style="font-size:14px;">'
			+'	Step 1) Click the Wrench icon (top right) go to Tools, then click Extensions.<br/>'
			+'	<img src="http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradechrome1.jpg"><br/><br/>'
			+'	Step 2) Locate the old YouTube.com - EZ Download script and remove it.<br/>'
			+'	<img src="http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradechrome2.jpg"><br/><br/>'
			+'	Step 3) Refresh the YouTube page and the new version will work! =D<br/><br/>'
			+'	This was caused by a minor name change in v0.4.0, sorry!'
			+'	</span>'
			+'</div>'
		+'</div>'
		+'';
    GB_show(t,text,0,550);
    
    //=====================
    
    //Default Action
	$ljq("#GB_window .tab_content").hide(); //Hide all content
	$ljq("#GB_window ul.tabs li").removeClass("active").show(); //Deactivate all tabs
	//$ljq("#GB_window ul.tabs li:first").addClass("active").show(); //Activate first tab
	//$ljq("#GB_window .tab_content:first").show(); //Show first tab content
	$ljq("#GB_window ul.tabs li a[href='#gm_tab_"+browser+"']").parent().addClass("active").show(); //Activate first tab
	$ljq("#GB_window #gm_tab_"+browser+".tab_content").show(); //Show first tab content
	
	//On Click Event
	$ljq("#GB_window ul.tabs li").on('click', function(event) {
		event.preventDefault();
		//alert("click");
		$ljq("#GB_window ul.tabs li").removeClass("active"); //Remove any "active" class
		$ljq(this).addClass("active"); //Add "active" class to selected tab
		$ljq("#GB_window .tab_content").hide(); //Hide all tab content
		var activeTab = $ljq(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$ljq(activeTab).show(); //Fade/Hide in the active content
		//alert($ljq("#GB_window").height()+"\n"+$ljq(window).height());
		//Switched tabs - check height
		tab_content_height();
		//alert(activeTab);
		return false;
	});
	
	//Initial display of content - check height
	tab_content_height();
}

function tab_content_height() {
	//reset height and scroll before checking dimensions
	$ljq("#GB_window .tab_content").css({'height':'', 'overflow-y':''});
	//alert(($ljq("#GB_window").height() + 40)+"\n"+$ljq(window).height());
	//add 20px to offset top:20
	if (($ljq("#GB_window").height() + 25) > $ljq(window).height()) {
		var tab_height = $ljq(window).height() - 150;
		//alert(tab_height);
		GMlog("tab_height: "+tab_height);
		$ljq("#GB_window .tab_content").css({'height':''+tab_height+'px', 'overflow-y':'scroll'});
	//} else {
		//$ljq("#GB_window .tab_content").css({'height':'', 'overflow-y':''});
	}
}

//Vars used throughout script
var videoId = '';
var title = '';
//var urltitle = ''; //set to title below
var user = '';
var date = '';
//title = $ljq.trim($ljq("#watch-headline-title").text());
//title = $ljq.trim($ljq("#eow-title").attr("title"));
//title = $ljq.trim($ljq("#watch-headline-title").text());
//<h1 id="watch-headline-title"><span  class=" yt-uix-expander-head" dir="ltr" title="Video Title">
//urltitle = title;
//alert(title);
//user = $ljq("a#watch-userbanner img").attr("alt");
//user = $ljq("#watch-headline-user-info a#watch-userbanner").attr("title");
//user = $ljq("#watch-username").text();
//if (user == '' || user == null) {
//	user = $ljq("#watch-userbanner").attr("title");	
//	if (user == '' || user == null) {
//	}
//}
//alert($ljq("a[rel='author']:first").text());
/*
user = $ljq.trim($ljq("a[rel='author']:first").text());
if (user == '' || user == null || user == undefined) {
	//alert("user:first null");
	user = $ljq.trim($ljq("a[rel='author']:first").attr('title'));
}
if (user == '' || user == null || user == undefined) {
	//alert("user null");
	user = $ljq.trim($ljq("a[rel='author']:last").text())
}
if (user == '' || user == null || user == undefined) {
	user = '';
}
*/
try {
//user = $ljq.trim($ljq("span.yt-user-name:first").text());
//user = $ljq.trim($ljq("a.yt-user-name:first").text());
user = $ljq.trim($ljq("a.yt-user-name:first").attr('href').replace(/\/user\//gi, ''));
//check updated source
//$ljq("a.yt-user-name:first").attr('data-text', 'USERNAME-HERE');
//alert(user);
} catch(e) {}

//date = $ljq.trim($ljq("span#eow-date-short").text());
try {
	date = $ljq.trim($ljq("#eow-date").text());
	//date = date.replace(/,/ig, '').replace(/January/ig, '01').replace(/February/ig, '02').replace(/March/ig, '03').replace(/April/ig, '04').replace(/May/ig, '05').replace(/June/ig, '06').replace(/July/ig, '07').replace(/August/ig, '08').replace(/September/ig, '09').replace(/October/ig, '10').replace(/November/ig, '11').replace(/December/ig, '12');
	date = date.replace(/,+/ig, '').replace(/\s+/ig, ' ').replace(/Jan/ig, '01').replace(/Feb/ig, '02').replace(/Mar/ig, '03').replace(/Apr/ig, '04').replace(/May/ig, '05').replace(/Jun/ig, '06').replace(/Jul/ig, '07').replace(/Aug/ig, '08').replace(/Sep/ig, '09').replace(/Oct/ig, '10').replace(/Nov/ig, '11').replace(/Dec/ig, '12');
	date = date.split(" ");
	//date[month] = date[0];
	//alert(date[month]);
	//alert(date.length);
	var year = date[2];
	var month = date[0];
	var day = date[1];
	if (month.length < 2) {
		month = "0"+month;
	}
	if (day.length < 2) {
		day = "0"+day;
	}
//alert("date:"+date+"\n"+"year:"+year+"\n"+"month:"+month+"\n"+"day:"+day);
} catch(e) {}

/*
var mydate = new Date();
var year = mydate.getYear() + 1900;
//var day = mydate.getDay();
var month = mydate.getMonth();
var day = mydate.getDate()
if (day<10) { day="0"+day }
//alert(day);
*/

var curwindow = window.location.toString();
var vcode = "";
//alert(curwindow);
//pattern = /(https?:\/\/.*\?v=(.*)[^&].*).*/ig;
//pattern = /(https?:\/\/.*\?v=([a-zA-Z0-9-_]+))/ig;
//try {
//	pattern = /v=([a-zA-Z0-9-_]+)/ig;
//	matches = curwindow.match(pattern);
//	//alert(matches);
//	//alert(matches[0].replace(pattern, "$2"));
//	var vcode = matches[0].replace(pattern, "$1");
//} catch(e) {}
//siteuri = siteuri.split("/");
//alert(siteuri[0]);
//siteuri = siteuri[0];
//siteuri = siteuri.replace('www.', '');
//alert(siteuri);
pattern = "";
matches = "";

var duplicatecheck = false;
if ($ljq("#gmmnu").length > 0) {
	duplicatecheck = true;
	$ljq("#gmmnu").remove();
}
//duplicatecheck = true;
//alert(duplicatecheck);

//if (duplicatecheck == true) {
//GMlog("Append menu SKIPPED");
//} else {
GMlog("Append menu");
//Show menu as soon as possible
$ljq(document.body).append("<div id='gmmnu'></div>");
$ljq("#gmmnu").html(""
		+"\n<div id='gmmnu_title' data-title='YouTube Download'>YouTube Download</div>\n"
		+"<div id='gmmnu_menu'>\n"
		//+"<div class='header'>Menu</div>\n"
		//+"<div>1st | 2nd</div>\n"
			+"<div class='menubar'>\n"
				//+"<a href='#config' title='Config'><div class='config'></div></a>\n"
				//+"<a href='#config' class='config' title='Config'>&nbsp;</a>\n"
				+"<div id='config_icon'><a href='#config' class='config' data-title='Configuration'></a></div>\n"
				//+"<a href='#update' class='update' title='Update'></a>\n"
				+"<div id='update_icon'>"
					+"<a href='#update' class='update_grey' data-title='No Updates'></a>"
				+"</div>\n"
				/*
				//watched
				+"<div id='viewed_icon'>"
					//+"<a href='#viewed' class='viewed_grey' data-title='Viewed'></a>"
					//+"<a href='#viewed' class='viewed' data-title='Viewed'></a>"
					+"<a href='#viewed' class='viewed' data-title='Viewed'></a>"
				+"</div>\n"
				+"<div id='starred_icon'>"
					//+"<a href='#starred' class='starred_grey' data-title='Favorite'></a>"
					+"<a href='#starred' class='starred' data-title='Favorite'></a>"
				+"</div>\n"
				*/
				//+"<div id='donate_icon'><a href='"+donationLink+"' class='donate' data-title='Donate! =D' target='_blank'></a></div>\n"
				+"<div id='home_icon'><a href='http://userscripts.org/scripts/show/"+scriptId+"' class='home' data-title='Script Homepage' target='_blank'></a></div>\n"
				+"<div id='twitter_icon'><a href='http://twitter.com/Daem0nX' class='twitter' data-title='Follow Us' target='_blank'></a></div>\n"
				+"<div id='donate_icon'><a href='#donations' class='donate' data-title='Donate! =D'></a></div>\n"
			+"</div>\n"
		+"</div>\n"
		+"<div id='gmmnu_links_wrap'>\n"
		+"<div id='gmmnu_links'>\n"
			//+"<div id='gmmnulinksheader'>Files</div>\n"
			+"<div class='header'>Files"
				//+"<div class='format_mp4'>MP4</div>\n"
				//+"<div class='format_flv'>FLV</div>\n"
				//+"<div class='format_webm'>WebM</div>\n"
			+"</div>\n"
			+"<div id='gmmnu_linksfiles'>"
			+"	<div class='status'>Searching...</div>"
			+"</div>\n"
		+"</div>\n"
		+"<div id='gmmnu_links_3d'>\n"
			+"<div class='header'>3D Files</div>\n"
			+"<div id='gmmnu_linksfiles_3d'>"
			+"	<div class='status'>Searching...</div>"
			+"</div>\n"
		+"</div>\n"
		+"</div>\n"
		+"<div id='gmmnu_err'>\n"
			//+"<div id='gmmnuerrheader'>Error Alert</div>\n"
			+"<div class='header'>Error Alert</div>\n"
			//id='gmmnuheader'
			+"<div id='gmmnu_errmsg'>There was an error and the files couldn't be loaded.<br>"
			+"Please copy the URL (address) and report the problem + URL to <strong><a href='http://userscripts.org/scripts/discuss/"+scriptId+"'>Discussions</a></strong>"
			+"</div>\n"
		+"</div>\n"
		+"<div id='gmmnu_donations' style='font-size:12px;'>\n"
			+"<div class='header'>Donation Methods</div>\n"
			+"Please consider donating, its greatly appreciated!\n"
			+"<center><a href='"+donationLink_flattr+"' class='icon_donate_flattr' target='_blank'></a></center>\n"
			+"<center><a href='"+donationLink_paypal+"' class='icon_donate_paypal' target='_blank'></a></center>\n"
		+"</div>\n"
		+"");
GMlog("Append menu : Success");
//}

if (duplicatecheck == true) {
	$ljq("#gmmnu").append(""
	+"	<div style='background: url(http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradefirefox1.jpg) no-repeat -9999px -9999px'></div>\n"
	+"	<div style='background: url(http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradefirefox2.jpg) no-repeat -9999px -9999px'></div>\n"
	+"	<div style='background: url(http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradefirefox3.jpg) no-repeat -9999px -9999px'></div>\n"
	+"	<div style='background: url(http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradefirefox4.jpg) no-repeat -9999px -9999px'></div>\n"
	+"	<div style='background: url(http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradechrome1.jpg) no-repeat -9999px -9999px'></div>\n"
	+"	<div style='background: url(http://www.byronr.com/shell/greasemonkey/ytezd/v040upgradechrome2.jpg) no-repeat -9999px -9999px'></div>\n"
	+"")
	GMlog("Append preload images");
}
		
function showError() {
	//Hide SD and HD
	$ljq("#gmmnu_links, #gmmnu_links_3d").hide();
	//Show Err
	$ljq("#gmmnu_err").show();
	$ljq("#gmmnu_err").attr("data-active", "true");
}

var formats = {
	5:  { itag: 5 , quality: 5, description: "Low Quality, 240p"     		, format: "FLV" , fres: "240p", 	mres: { width:  400, height:  240 }, acodec: "MP3"   , vcodec: "SVQ"   },
	17: { itag: 17, quality: 4, description: "Low Quality, 144p"			, format: "3GP" , fres: "144p", 	mres: { width:  0, height: 0  }, acodec: "AAC"   , vcodec: "" },
	18: { itag: 18, quality: 15, description: "Low Definition, 360p"		, format: "MP4" , fres: "360p", 	mres: { width:  480, height:  360 }, acodec: "AAC"   , vcodec: "H.264" },
	22: { itag: 22, quality: 35, description: "High Definition, 720p" 		, format: "MP4" , fres: "720p", 	mres: { width: 1280, height:  720 }, acodec: "AAC"   , vcodec: "H.264" },
	34: { itag: 34, quality: 10, description: "Low Definition, 360p"  		, format: "FLV" , fres: "360p", 	mres: { width:  640, height:  360 }, acodec: "AAC"   , vcodec: "H.264" },
	35: { itag: 35, quality: 25, description: "Standard Definition, 480p"  	, format: "FLV" , fres: "480p", 	mres: { width:  854, height:  480 }, acodec: "AAC"   , vcodec: "H.264" },
	36: { itag: 36, quality: 6, description: "Low Quality, 240p"  			, format: "3GP" , fres: "240p", 	mres: { width:  0, height:  0 }, acodec: "AAC"   , vcodec: "" },
	37: { itag: 37, quality: 45, description: "Full High Definition, 1080p"	, format: "MP4" , fres: "1080p", 	mres: { width: 1920, height: 1080 }, acodec: "AAC"   , vcodec: "H.264" },
	38: { itag: 38, quality: 55, description: "Original Definition" 		, format: "MP4" , fres: "Orig", 	mres: { width: 4096, height: 3072 }, acodec: "AAC"   , vcodec: "H.264" },
	43: { itag: 43, quality: 20, description: "Low Definition, 360p"  		, format: "WebM", fres: "360p", 	mres: { width:  640, height:  360 }, acodec: "Vorbis", vcodec: "VP8"   },
	44: { itag: 44, quality: 30, description: "Standard Definition, 480p"	, format: "WebM", fres: "480p", 	mres: { width:  854, height:  480 }, acodec: "Vorbis", vcodec: "VP8"   },
	45: { itag: 45, quality: 40, description: "High Definition, 720p" 		, format: "WebM", fres: "720p", 	mres: { width: 1280, height:  720 }, acodec: "Vorbis", vcodec: "VP8"   },
	46: { itag: 46, quality: 50, description: "Full High Definition, 1080p"	, format: "WebM", fres: "1080p", 	mres: { width: 1280, height:  720 }, acodec: "Vorbis", vcodec: "VP8"   },
	82: { itag: 82, quality: 16, description: "Low Definition 3D, 360p"		, format: "MP4",  fres: "360p",		mres: { width: 640,  height:  360 }, acodec: "AAC"	 , vcodec: "H.264" },
	84: { itag: 84, quality: 41, description: "High Definition 3D, 720p"	, format: "MP4",  fres: "720p",		mres: { width: 1280, height:  720 }, acodec: "AAC"	 , vcodec: "H.264" },
	100: { itag: 100, quality: 17, description: "Low Definition 3D, 360p"	, format: "WebM", fres: "360p", 	mres: { width: 640,  height:  360 }, acodec: "Vorbis", vcodec: "VP8"   },
	102: { itag: 102, quality: 42, description: "High Definition 3D, 720p"	, format: "WebM", fres: "720p", 	mres: { width: 1280, height:  720 }, acodec: "Vorbis", vcodec: "VP8"   },
	}
var orderedformats = [];

//$ljq(document).ready(function(){
	//alert("ljq");
		
	if (duplicatecheck == true) {
		$ljq("#GB_initialize").remove();
	}
	
	//Append the greasebox to the body of the site
	$ljq(document.body).append("<div id='GB_initialize'></div>");
	
	if (debugSettings == true) {
		showConfiguration();
	}
	//showUpgradeInstructions();
	//showError();
	//showSettings();
	var zztxt = '';
	var minVar = 0;
	var secVar = 0;
	var streamMap = '';
	
	GMlog("title: "+title);
	GMlog("Get flashvars");
	
	try {
		//alert($ljq("script:contains('yt.playerConfig')").html());
		//var streamMap = $ljq("script:contains('yt.playerConfig')").html();
		streamMap = $ljq("script:contains('ytplayer.config')").html();
		//GMlog(streamMap);
		
		//parse yt.playerConfig for flashvars
		//streamMap = streamMap.match(/^.*((\r\n|\n|\r)|$)/gm);
		streamMap = streamMap.match(/ytplayer\.config.*?};/gm).toString();
		GMlog(typeof(streamMap)); //streamMap returns object without toString
		//streamMap = JSON.stringify(streamMap);
		//streamMap = streamMap.toString().match(/\{.*?\}/gm);
		//streamMap = String(streamMap).match(/url/gm);
		//streamMap = streamMap.replace(/(ytplayer.config\s?=\s?|;)/gm);
		streamMap = streamMap.replace(/(ytplayer.config\s?=\s?|;)/gm, '');
		GMlog(streamMap);
		//streamMap = JSON.parse(streamMap);
		//for (var i = 0; i < streamMap.length; i ++)	{
		//	//if (streamMap[i].indexOf("playerConfig") != -1) {
		//	if (streamMap[i].indexOf("args") != -1) {
		//		GMlog("streamMap: "+streamMap[i]);
		//		streamMap = streamMap[i];
		//		break;
		//	}
		//}
		//streamMap = streamMap.replace(/yt.playerConfig\s?=\s?(.*)\;/ig, "$1");
		//streamMap = streamMap.replace(/ytplayer.config\s?=\s?(.*)\;/ig, "$1");
		//streamMap = streamMap.replace(/.*?ytplayer\.config\s?=\s?(\{.*?\});.*?/ig, "$1");
		
		//streamMap = streamMap.replace(/.*?"url_encoded_fmt_stream_map"\s?"(.*?)",.*?/ig, "$1");
		//streamMap = streamMap.match(/"url_encoded_fmt_stream_map".*?",/gm);
		//streamMap = streamMap[0];
		//GMlog("streamMap:" + streamMap);
		streamMap = JSON.parse(streamMap);
		//GMlog(streamMap.args.video_id);
		vcode = streamMap.args.video_id;
		//GMlog(streamMap.args.url_encoded_fmt_stream_map);
		//GMlog(streamMap.args.length_seconds);
		videoLength = streamMap.args.length_seconds;
		title = streamMap.args.title;
		//zztmp = zztmp.args.url_encoded_fmt_stream_map;

		//pattern = /.*?playerConfig = (\{.*?\})/ig;
		//matches = zztmp.match(pattern, "$1");
		//GMlog(zztmp);
		//alert(zztmp);
		//alert(decodeURI(zztmp));
		
		//
		//pattern = /.*?length_seconds":\s?([0-9]+).*/ig;
		//matches = zztmp.match(pattern);
		//alert(matches[0].replace(pattern, "$1"));
		//videoLength = matches[0].replace(pattern, "$1");
		//GMlog(videoLength);
		//

		minVar = Math.floor(videoLength/60);  // The minutes
		secVar = videoLength % 60;            // The balance of seconds
		if (secVar < 10) {
			secVar = "0"+secVar;
		}
		videoLength = minVar+":"+secVar;
		//GMlog(videoLength);
		//alert(videoLength);
	
		//pattern = /.*?url_encoded_fmt_stream_map":\s?"(url=.*?)".*/ig;
		//pattern = /.*?url_encoded_fmt_stream_map":\s?"(.*?)".*/ig;
		//matches = zztmp.match(pattern);
		//title = unescape(matches[0].replace(pattern, "$2"));
		//zztmp = matches[0].replace(pattern, "$1").replace("url=", "");
		
		//GMlog(zztmp);
		//alert(zztmp);
		//ztmp = ztmp.replace(/'u0026'/ig, '&');
		//alert(ztmp);
		//alert(unescape(ztmp));
		//alert(decodeURI(ztmp));
		//alert(decodeURI(unescape(ztmp)));
		//ztmp = ztmp.replace("\\u0026", "&").replace("\\", "");
		//alert(unescape(decodeURI(ztmp)));
		
		//ztmp = ztmp.split(",");
		//for (var i = 0; i < ztmp.length; i ++)	{
			//if (i <= 0) {
				//alert(unescape(decodeURI(ztmp[i])));
			//}
		//}
		//ztmp = ztmp.split("&");
		//GMlog("split streamMap length: "+split.length);
		
		//streamMap = ztmp;
		//streamMap = zztmp;
		//streamMap = unescape(zztmp);
		//GMlog(streamMap);
		//zztmp = "";
		//alert(streamMap);
		
		var url = "";
		var itag = 0;
		var name = "";
		var zznum = 0;

		streamMap = streamMap.args.url_encoded_fmt_stream_map;
		streamMap = streamMap.split(",");
		for (var i = 0; i < streamMap.length; i ++)	{
			GMlog("streamMap.length = "+streamMap.length);
			GMlog("streamMap.length = "+i);
			//GMlog(streamMap[i]);
			//GMlog(unescape(streamMap[i]));
			//GMlog(unescape(unescape(streamMap[i])));
			//alert(unescape(streamMap[i]));
			//pattern = /(.*?)(\\|\+)/ig;
						
			//pattern = /.*?(http.*)/ig;
			//matches = streamMap[i].match(pattern);
			//title = unescape(matches[0].replace(pattern, "$2"));
			//ztmp = matches[0].replace(pattern, "$1");
			//url = matches[0].replace(pattern, "$1").replace("sig=", "signature=");
			//url = decodeURIComponent(url);
			//url = decodeURI(url);
			//url = escape(url);
			//url = streamMap[i];
			//url !== "" && 

			parseLink(streamMap[i], zznum);
			GMlog("call parseLink = "+zznum);
			zznum = zznum + 1;
			
			//url = decodeURIComponent(url);

			/*
			*
			* FIREBUG causing issue when enabled
			* Signature will not be in URL
			*
			*/			
		}
	} catch(ex) {
		showError();
		//alert(ex);
	}
	pattern = '';
	matches = '';
	streamMap = null;
	
	function parseLink(url, num){
	/*
	* Check for expected params and rebuild link
	* http entry - required (ex http://123.a-z.youtube.com/videoplayback?key=yt1)
	* itag - required (exclude duplicate)
	* sig(nature) - required
	* sver - required
	* sparams - required
	* cp - required
	* upn - required
	* ms - required
	* ipbits - required
	* gcr - required
	* ratebypass - required
	* source - required
	* mv - required
	* expire - required
	* ip - required
	* newshard - required
	* mt - required
	* fexp - required
	* type - not needed
	* quality - not needed
	* fallback_host - not needed
	*/

	var zztmp = "";
	GMlog("base url = "+url);
	//signature = url.replace("/.*?sig=([0-9a-z\.]+).*", "$1");
	//GMlog("signature = "+signature);
	//url = decodeURIComponent(url).replace(/.*?(http.*)/ig, "$1").replace(/sig=[0-9a-z\.]+/ig, "");
	//url = decodeURIComponent(url);
	url = decodeURIComponent(decode_utf8(url));
	url = url.replace("url=", "").replace("sig=", "signature=").replace("s=", "signature=");
	//.replace(/s=[\w]+\.[\w]+/g, 'signature=');
		if (url.indexOf("http") != -1) {
			GMlog("decode url = "+url);
			//explode for all query variables
			//rebuild url
			zztmp = url.split("&");
			url = "";
			for (var j = 0; j < zztmp.length; j ++)	{
				GMlog(zztmp[i]);
				if (/^(type|quality|fallback_host)/.test(zztmp[j])) {
					GMlog("skip");
				} else {
					GMlog(zztmp[j]);
					if (/^(http)/.test(zztmp[j])) {
						url = zztmp[j] + url;
					} else {
						url = url + "&" + encode_utf8(zztmp[j]);
					}
					//GMlog("added = "+zztmp[i]);
				}
				//if (zztmp.indexOf("quality") != -1 && zztmp.indexOf("type") != -1){
				//if ()
				//	GMlog(zztmp[i]);

				//}
			}
			//GMlog("end");
			//GMlog(url);
			//break;

			//url = url.replace(/.*?(http.*)/ig, "$1");
			//GMlog();
			
			pattern = /itag=([0-9]+)/ig;
			matches = url.match(pattern);
			itag = matches[0].replace(pattern, "$1");
			orderedformats[num] = {};
			orderedformats[num]["itag"] = itag;
			//orderedformats[zznum]["url"] = unescape(url.replace("url=", ""));
			//orderedformats[zznum]["url"] = unescape(url.replace("url=", ""));
			//url = url.replace("url=", "");
			url = encodeURI(url);
			//url = url.replace(/%5Cu0026/ig, "&amp;");
			url = url.replace(/%5Cu0026/ig, "&");
			url = url.replace(/%252C/ig, ",");
			url = url.replace(/\&itag=[0-9]+/ig, "");
			url = url + "&itag=" + itag;
			//&type=video/mp4;+codecs=%22avc1.64001F,+mp4a.40.2%22
			//url = url.replace(/type=video.*/ig, "--video--");
			
			GMlog("url = "+url);
			//alert(url);
			//url = decodeURIComponent(url);
			orderedformats[num]["url"] = url;
			//GMlog("url = "+unescape(url.replace("url=", "")));
			//GMlog("url = "+escape(url.replace("url=", "")));
			//GMlog("url = "+url);
			try {
				orderedformats[num]["quality"] = formats[itag].quality;
			} catch(e) {
				orderedformats[num]["quality"] = 0;
			}
			GMlog("parseLink = "+num);
		}
	}

	//if ($ljq("#watch-player.flash-player").length == 0 && $ljq("#watch-player.html5-player").length == 0) {
	//	$ljq("#gmmnu_err #gmmnu_errmsg").html("No Flash or HTML5 player detected!");
	//	showError();
	//}
	
	//GMlog("orderedformats length = "+orderedformats.length);
	//GMlog(orderedformats);
	var fmts = "";
	//var url = "";
	
	//zztxt = "";
	//for (var i = 0; i < orderedformats.length; i ++) {
	//	zztxt += ","+orderedformats[i]["itag"];
	//}
	//GMlog("presort: "+zztxt);
	
	//if (orderedformats.length > 0) {
		orderedformats.sort(function(a,b) {
			// assuming distance is always a valid integer
			//GMlog(parseInt(a.quality)+" - "+parseInt(b.quality));
			return parseInt(a.quality) - parseInt(b.quality);
		});
	//}
	//orderedformats.reverse();
	//zztxt = "";
	//for (var i = 0; i < orderedformats.length; i ++) {
		//zztxt += ","+orderedformats[i]["itag"];
		//zztxt += ","+orderedformats[i]["quality"];
	//}
	//GMlog("postsort: "+zztxt);
	for (i = 1; i < orderedformats.length; i++ ) {
		//GMlog("look: "+orderedformats[i]["itag"]);
    	if ( orderedformats[i]["itag"] === orderedformats[ i - 1 ]["itag"] ) {
    		//GMlog("splice: "+orderedformats[i]["itag"]);
	        orderedformats.splice( i--, 1 );
	    }
	}
	
	function generate_links() {	
	//alert("generate_links");
	try {
	newtitle = newtitle.replace(/%T/g, title).replace(/%U/g, user).replace(/%Y/g, year).replace(/%M/g, month).replace(/%D/g, day).replace(/%V/g, vcode).replace(/%L/g, videoLength).replace(/%%/g, "%");
	newtitle = newtitle.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/"/g, "-").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
	//var urltitle = title.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
	//var urltitle = newtitle;
	//GMlog("urltitle: "+urltitle);
	var itag = 0;
	$ljq("#gmmnu_linksfiles, #gmmnu_linksfiles_3d").html('');
	for (var i = 0; i < orderedformats.length; i ++) {
		fmts = "";
		itag = orderedformats[i]["itag"];
		var qltytitle = '';
		//var qltytext = (formats[itag].fres !== '' ? formats[itag].fres : "");
		//(formats[itag].fres !== '' ? formats[itag].fres : "")
		try {
			qltytext = formats[itag].fres;
			//GMlog("fres: "+formats[itag].fres);
		} catch(e) {
			qltytext = "fmt"+itag;
			//GMlog("fres error: "+itag);
		}
		//try {
			//qltytitle = newtitle.replace(/%Q/g, formats[itag].fres).replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
			//GMlog("fres : "+formats[itag].fres);
			//GMlog("urltitle : "+urltitle);
		//} catch(e) {
			//qltytitle = newtitle.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
		//}
		//qltytitle = newtitle.replace(/%Q/g, qltytext).replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
		qltytitle = newtitle.replace(/%Q/g, qltytext).replace(/%/g, "%25");
		GMlog("urltitle: "+qltytitle);
		try {
			GMlog("itag: "+itag+" | quality: "+formats[itag].quality);
			//fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&title="+title+ "\" data-title=\""+formats[itag].format+", "+formats[itag].vcodec+"/"+formats[itag].acodec+"\" data-title-default=\""+formats[itag].description+"\" data-format=\""+formats[itag].format.toLowerCase()+"\" data-quality=\""+formats[itag].quality+"\" data-formatid=\""+itag+"\" class=\"\">"+formats[itag].description+"<span class=\"format\">"+formats[itag].format+"</span></a></div>";
			//fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&title="+urltitle+ "\" data-format=\""+formats[itag].format.toLowerCase()+"\" data-quality=\""+formats[itag].quality+"\" data-formatid=\""+itag+"\" class=\"\">"+formats[itag].description+"<span class=\"format\">"+formats[itag].format+"</span></a></div>";
			//fmts = "\n<div class=\"link\"><div class=\"side_size\">100MB</div><a href=\"" + orderedformats[i]["url"] + "&title="+qltytitle+ "\" data-format=\""+formats[itag].format.toLowerCase()+"\" data-quality=\""+formats[itag].quality+"\" data-formatid=\""+itag+"\" class=\"\" "+(isWebkit ? "target=\"_blank\"" : "")+">"+formats[itag].description+"<span class=\"format\">"+formats[itag].format+"</span></a></div>";
			//works//fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&title="+qltytitle+ "\" data-format=\""+formats[itag].format.toLowerCase()+"\" data-quality=\""+formats[itag].quality+"\" data-formatid=\""+itag+"\" class=\"\" "+(isWebkit ? "target=\"_blank\"" : "")+">"+formats[itag].description+"<span class=\"format\">"+formats[itag].format+"</span></a></div>";
			fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&title="+qltytitle+ "\" data-format=\""+formats[itag].format.toLowerCase()+"\" data-quality=\""+formats[itag].quality+"\" data-formatid=\""+itag+"\" class=\"\" target=\"_blank\">"+formats[itag].description+"<span class=\"format\">"+formats[itag].format+"</span></a></div>";
			//works ff, chrome restarts vid //fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&title="+qltytitle+ "\" data-format=\""+formats[itag].format.toLowerCase()+"\" data-quality=\""+formats[itag].quality+"\" data-formatid=\""+itag+"\" class=\"\">"+formats[itag].description+"<span class=\"format\">"+formats[itag].format+"</span></a></div>";
			//fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&itag="+ itag + "&title="+qltytitle+ "\" data-format=\""+formats[itag].format.toLowerCase()+"\" data-quality=\""+formats[itag].quality+"\" data-formatid=\""+itag+"\" class=\"\" "+(isWebkit ? "target=\"_blank\"" : "")+">"+formats[itag].description+"<span class=\"format\">"+formats[itag].format+"</span></a></div>";
			if (formats[itag].description.indexOf("3D") != -1) {
				$ljq("#gmmnu_linksfiles_3d").prepend(fmts);
			} else {
				//if ($ljq("#gmmnu_linksfiles .link a[data-quality='"+formats[itag].quality+"']").length > 0) {
					//skip duplicate
				//} else {
					$ljq("#gmmnu_linksfiles").prepend(fmts);
				//}
			}
		} catch(e) {
			//Unknown format - append to links
			GMlog("Unknown itag: "+itag);
			//fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&title="+urltitle+ "\" class=\"\">Unknown Format<span class=\"format\">"+itag+"</span></a></div>";
			//works//fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&title="+qltytitle+ "\" class=\"\" "+(isWebkit ? "target=\"_blank\"" : "")+">Unknown Format<span class=\"format\">"+itag+"</span></a></div>";
			fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&title="+qltytitle+ "\" class=\"\" target=\"_blank\">Unknown Format<span class=\"format\">"+itag+"</span></a></div>";
			//works ff, chrome restarts vid //fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&title="+qltytitle+ "\" class=\"\">Unknown Format<span class=\"format\">"+itag+"</span></a></div>";
			//fmts = "\n<div class=\"link\"><a href=\"" + orderedformats[i]["url"] + "&itag="+ itag + "&title="+qltytitle+ "\" class=\"\" "+(isWebkit ? "target=\"_blank\"" : "")+">Unknown Format<span class=\"format\">"+itag+"</span></a></div>";
			$ljq("#gmmnu_linksfiles").append(fmts);
		}
	}
	fmts = "";
	if ($ljq("#gmmnu_linksfiles_3d a").length != 0) {
		//$ljq("#gmmnu_links_3d").css({display: "block"});
		$ljq("#gmmnu_links_3d").show();
	}
	} catch(e) {
		showError();
	}
	//alert($ljq.trim($ljq("#gmmnu_linksfiles").text()));
	//if ($ljq.trim($ljq("#gmmnu_linksfiles").text().length == 0) || ($ljq.trim($ljq("#gmmnu_linksfiles").text().length == 0) && $ljq.trim($ljq("#gmmnu_linksfiles_3d").text().length == 0))) {
	//	showError();
	//}
	} //generate_links()
	//vidopt_update_title(false);
	newtitle = gm_title;
	generate_links();
	//alert($ljq("#gmmnu_linksfiles_3d a").length);
	
	//Replace flash with custom attr in Chrome
	if (isWebkit) {
		if ($ljq("#watch-player.flash-player").length > 0) {
			GMlog("webkit : movie_player hack");
			$ljq("#movie_player").attr('wmode', 'opaque');
			//$ljq("#movie_player").attr('wmode', 'transparent');
			//$ljq("#movie_player").css('z-index', '100');
			//alert($ljq("#movie_player").attr("wmode"));
			var embededflash = $ljq("#watch-player").html();
			//alert(embededflash);
			//$ljq("#watch_player").remove();
			$ljq("#watch-player").html(embededflash);
		}
	}
	
	if (duplicatecheck == true) {
		$ljq("#gmmnu_err #gmmnu_errmsg").html('You have 2 versions of YouTube EZ Download installed! <span id="gm_upgrade_instructions"><a href="#gm_upgrade_instructions" style="font-size:12px;text-decoration:underline;">Click here for easy upgrade instructions.</a></span>');
		showError();
	}
	
	/*
	$ljq("#gmmnu_linksfiles .link a").hover(
		function() {
			//$ljq(this).attr("data-title-default", $ljq(this).text());
			$ljq(this).text($ljq(this).attr("data-title")).addClass("format");
		},
		function () {
			$ljq(this).text($ljq(this).attr("data-title-default")).removeClass("format");
		}
	);
	*/

	$ljq("#gmmnu_linksfiles .link a").on('click', function(event) {
		event.preventDefault();
		var checkurl = $ljq(this).attr('href');
		//alert($ljq(this).attr('href'));
		GM_xmlhttpRequest({
	    method: 'HEAD',
	    url: checkurl,
	    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain'},
	    onload: function(res) {
	    	GMlog("status: "+res.status);
	    	GMlog("responseText: "+res.responseText);
			if (res.status == '200') {
				//try {
					var text = res.responseHeaders;
					//alert(text);
					//GMlog(text);
					//Content-Length: 477795378
					pattern = /.*?Content-Length:\s?([0-9]+).*/ig;
					matches = text.match(pattern);
					//alert(matches[0].replace(pattern, "$1"));
					//name = matches[0].replace(pattern, "$3");
					GMlog("content-length: "+matches[0].replace(pattern, "$1"));
					if (matches[0].replace(pattern, "$1") > 0) {
						GMlog("content-length > 0");
						getFile(checkurl);
					} else {
						GMlog("content-length = 0");
						//alert("Link expired, refresh the page and try again.");
						$ljq("#gmmnu_err .header").text('Link Expired');
						$ljq("#gmmnu_err #gmmnu_errmsg").text('Download link expired, refresh the page and try again.');
					}
				//}
			} else {
				GMlog("content-length status !== 200");
				//GMlog(res.status);
				GMlog(res.responseText);
				//alert("Link expired, refresh the page and try again.");
				$ljq("#gmmnu_err .header").text('Link Expired');
				$ljq("#gmmnu_err #gmmnu_errmsg").text('Download link expired, refresh the page and try again.');
				showError();
			}
		}
		});
		pattern = "";
		matches = "";
	});

	//Direct browser to file location
	function getFile(url) {
		GMlog("getFile: "+url);
		window.location = url;
	}
	
	//$ljq("#gmmnu_menu a").on('click', function(event) {
	//	alert($ljq(this).parent().html());
	//});
	
	$ljq("#gm_upgrade_instructions a").on('click', function(event) {
		event.preventDefault();
		if (isWebkit) {
			showUpgradeInstructions('chrome');
		} else {
			showUpgradeInstructions('firefox');
		}
		return false;
	});
	
	//span[id='playlist-bar-controls'] 
	$ljq("#playlist-bar-toggle-button").on("click", function(event) {
		playlistbarstatus("true");
	});
	
	$ljq("#gmmnu_menu .menubar div a").hover(
		function () {
			//$ljq("#gmmnu_title").html('Config');
			$ljq("#gmmnu #gmmnu_title").html($ljq(this).attr("data-title"));
		},
		function () {
			//$ljq("#gmmnu #gmmnu_title").html('YouTube Download');
			$ljq("#gmmnu #gmmnu_title").html($ljq("#gmmnu #gmmnu_title").attr("data-title"));
		}
	);
	
	$ljq("#gmmnu_menu #donate_icon").on('click', function(event) {
		event.preventDefault();
		return false;
	});
	
	//$ljq("#gmmnu_menu #donate_icon").on('click', function(event) {
	$ljq("#gmmnu_menu #donate_icon, #gmmnu_donations").hover(
		function() {
		//alert($ljq("#gmmnu_links_wrap").css("height"));
			//var newheight = $ljq("#gmmnu_links_wrap").css("height");
			var newheight = $ljq("#gmmnu_links_wrap").height();
			GMlog("newheight : "+newheight);
			//GMlog("gmmenu gmmnu_links_wrap: "+$ljq("#gmmnu #gmmnu_links_wrap").height());
			//if (newheight.replace("px", "") < 100) {
			if (newheight < 100) {
				newheight = 140;
			}
			//Is showError active?
			if ($ljq("#gmmnu_err").attr("data-active")) {
				//GMlog("data-active : "+$ljq("#gmmnu_err").attr("data-active"));
				$ljq("#gmmnu_err").hide();
			} // else {
				$ljq("#gmmnu_donations").css({height: newheight});
				$ljq("#gmmnu_links_wrap").hide();
				$ljq("#gmmnu_donations").show();
				$ljq("#gmmnu #gmmnu_title").html($ljq("#gmmnu_menu #donate_icon a").attr("data-title"));
			//}
		},
		function () {
			if ($ljq("#gmmnu_err").attr("data-active")) {
				$ljq("#gmmnu_err").show();
			} //else {
				$ljq("#gmmnu_donations").hide();
				$ljq("#gmmnu_links_wrap").show();
				$ljq("#gmmnu #gmmnu_title").html($ljq("#gmmnu #gmmnu_title").attr("data-title"));
			//}
		}
	);
	
	$ljq('#gmmnu_menu .menubar #config_icon a').on('click', function(event) {
		event.preventDefault();
		//alert("Configure!");
		showConfiguration();
		return false;
	});
	
	$ljq("#gmmnu_menu .menubar #update_icon a").on('click', function(event) {
		//if (!isWebkit) {
			event.preventDefault();
			if ($ljq("#gmmnu_menu .menubar #update_icon a").hasClass('update')) {
				alertUpdate(scriptId, name, ver, notes);
			}
		//}
		return false;
	});
	
	$ljq('#gb_update_wait').on('click', function(event) {
		event.preventDefault();
		//alert(lastCheck);
		GM_setValue('lastCheck', currentTime);
		GB_hide();
		return false;
	});
	
	$ljq('#gb_update_waitnextversion').on('click', function(event) {
		event.preventDefault();
		//return false;
		//alert(latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
		GM_setValue('lastVersion', latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
		GM_setValue('lastCheck', currentTime);
		GB_hide();
		return false;
	});
	
	if (currentTime > (lastCheck + 86400) || debugUpdate == true) { // 43200 12 hours // 86400 24 hours after last check
		//alert("updateCheck");
		GMlog("updateCheck");
		//if (!isWebkit) {
			updateCheck();
		//}
	}
	//alert("LOADED!");
	
	//browser check
	//$ljq.each($ljq.browser, function(i, val) {
		//$ljq("<div>" + i + " : <span>" + val + "</span></div>").appendTo("#gmmnu");
		//alert(i+" : "+val);
	//});
//});

/*==================
// End of script
==================*/

//
// Notes
//   Created base64 images via (make sure to check base64 checkbox)
//     http://software.hixie.ch/utilities/cgi/data/data
//  The original (un-modified) update-notification script was made by Seifer
//    You can find the original at http://userscripts.org/scripts/show/12193
//    This custom version has been nearly rewritten by Daem0nX
//  Using JSON2 from http://content.worldnow.com/global/tools/video/json2.js
//    Original doesnt work in greasemonkey for Ubuntu http://www.json.org/json2.js
//  Using a modified version of Greybox Redux
//    Required: http://jquery.com/
//    Written by: John Resig
//    Based on code by: 4mir Salihefendic (http://amix.dk)
//    License: LGPL (read more in LGPL.txt)
//  Using code from http://userscripts.org/scripts/show/62634
//    for getting available formats (MIT License)
//  Using icons from "Tango Desktop Project" http://tango.freedesktop.org/Tango_Desktop_Project
//    Used in compliance with Public Domain License
//  Using icons from PC.DE http://pc.de/icons/
//    Used in compliance with CC BY http://creativecommons.org/licenses/by/3.0/
//  Using icons from "WooFunction Icon set" http://wefunction.com/contact/
//    Used in compliance with GPL
//  Using icons from "Fugue Icons" http://p.yusukekamiyamane.com/
//  Using icons from http://www.iconfinder.com/icondetails/38605/101/paypal_straight_icon
//    Used in compliance with Free for commercial use
//  Using icons from "Silk icon set"  http://www.famfamfam.com/about/
//    Used in compliance with CC BY http://creativecommons.org/licenses/by/2.5/
//

//
// Thanks
//  Gikero - Thank you for the donation! =D
//  @UGJKA - Reported Chrome HTML5 playback issue.
//  Gandalf - Reported issue with %U using incorrect username when logged into YouTube.
//

//
// TODO
//  Add ability for the menu to reload the page in the background to request a new download link if the link has expired.
//

//
// ChangeLog
// 2014.04.26 - 0.4.9
//  Fixed broken download links due to YouTube code changes.
//  Fixed %U to use the User name (uploader) instead of the Display name.
//  Fixed Overlay showing behind the YouTube topbar.
//  Removed unused images and variables.
//  Upgraded jQuery from 1.8.3 to 2.1.0.
//  Known issue - Some download links don't work or require multiple page refreshes. This will be looked into when possible.
//
// 2013.03.20 - 0.4.8
//  Added support to check if the download link is valid on click.
//    If the download link has expired a message to refresh will be displayed.
//  Fixed broken download links due to YouTube code changes.
//  Known issue in Chrome - Clicking a download link will sometimes make the video restart or freeze.
//
// 2012.12.21 - 0.4.7
//  Fixed broken download links due to YouTube code changes.
//  Refactored code that parses download links - completely rebuilds link with expected querystring variables.
//
// 2012.12.17 - 0.4.6
//  Fixed username (code %U) using incorrect value if logged into YouTube.
//
// 2012.12.06 - 0.4.5
//  Fixed username and title (code %U and %T) not working due to YouTube code changes.
//  Modified script meta data.
//    Added @grant for GM_getValue, GM_setValue, GM_deleteValue, GM_addStyle, GM_xmlhttpRequest, GM_log.
//  Upgraded jQuery from 1.8.2 to 1.8.3.
//
// 2012.09.22 - 0.4.4
//  Added format info for 17, 36.
//  Fixed video length 00 seconds showing as 0.
//  Upgraded jQuery from 1.7.2 to 1.8.2.
//
// 2012.09.13 - 0.4.3
//  Fixed broken download links.
//
// 2012.05.05 - 0.4.2
//  Fixed HTML5 video playback in Chrome.
//
// 2012.05.03 - 0.4.1
//  Added support for HTML5 videos.
//  Fixed Chrome download breaking currently playing video.
//    Download links now open in a new tab.
//  Fixed username (video title %U) not working due to YouTube code changes.
//  Fixed menu and overlay border radius not working in Firefox 13 beta.
//  Upgraded jQuery from 1.7.1 to 1.7.2.
//    Changed jQuery calls .bind() and .unbind() to .on() and .off().
//
// 2012.02.19 - 0.4.0
//  Changed name from YouTube.com - EZ Download to YouTube - EZ Download
//    Remove the old YouTube.com EZ Download from your Greasemonkey scripts!
//    Upgrade instructions overlay added.
//  Changes to Configuration overlay.
//    Added title options for user, videoid, quality, length, upload date(year,month,day).
//    Links auto regenerate after changes, no refresh required.
//  Changed Flattr donation link.
//  Fixed undeclared variable.
//  Fixed menu error message using wrong id.
//  Fixed menu blocking playlist section due to YT changes.
//  Fixed unknown formats showing as NaN, now shows format number.
//  Fixed donation section not setting the correct height if the error section was active.
//  Added format info for 46, 82, 84, 100, 102.
//  Added 3D File section.
//  Removed unused variables.
//  Upgraded jQuery from 1.6.2 to 1.7.1.
//    Changed .live() calls to .on()
//
// 2011.08.10 - 0.3.4
//  Fixed updateCheck not returning update if HTTPS Everywhere was installed.
//    Changed USO update link from HTTP to HTTPS.
//  Modified isWebkit checks to allow update notification in Chrome.
//    Chrome v13 introduced GM_xmlhttpRequest support.
//  Enabled LocalStorage for Chrome.
//    Captures GM_get/set/delete/value commands.
//
// 2011.08.05 - 0.3.3
//  Fixed broken download links.
//    Added check for new flashvar url_encoded_fmt_stream_map.
//
// 2011.08.03 - 0.3.2
//  Menu displays error as v0.3.1 didnt correctly fix downloads.
//    Working on a fix and will release as soon as possible.
//
// 2011.08.03 - 0.3.1
//  Fixed links not loading.
//    Added check for new flashvar fmt_list.
//
// 2011.08.01 - 0.3.0
//  Chrome is now partially supported.
//    Download links work, check for script updates manually.
//  Upgraded jQuery from 1.3.2 to 1.6.2
//  Fixed list being out of order (by quality).
//  Fixed overlay tabs changing url location.
//  Fixed menu blocking playlist section.
//  Fixed menu not loading on non-standard url (ex youtube.com/watch?feature=related&v=code).
//  Added file format to link description.
//  Added detection of Webkit to disable certain features in Chrome.
//  Added a replace hack to allow Configuration overlay to show above flash in Chrome.
//  Added Twitter icon to menu bar.
//  Added new Donation options.
//    Added Flattr icon, new Paypal icon.
//  Added scroll height check for Update Alert overlay.
//  Added GM_log function GMlog for console logging.
//  Added error catching code.
//  Modified menu title attr to data-title.
//    Removes annoying hover title.
//
// 2011.07.20 - 0.2.2
//  Fixed download links not loading due to new unknown formats.
//  Known issue - List is now out of order.
//  Added error catching code.
//
// 2011.03.04 - 0.2.1
//  Added Configuration icon and overlay.
//  Added Script Homepage icon to menu bar.
//  Fixed download links not loading due to YouTube code changes.
//  Fixed some undeclared variables.
//  Fixed missing functions for skipping available update.
//  Fixed debug code for Update and Settings.
//
// 2010.12.10 - 0.2.0
//  Fixed download links.
//  Less obtrusive Update Alert (icon instead of auto prompt).
//  Added menu bar with Update and Donate icons.
//
// 2010.10.07 - 0.1
//  Initial release
//