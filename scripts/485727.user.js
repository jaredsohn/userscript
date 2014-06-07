// Conquer Club - Card Counter, Card Redemption Value, Status Indicator
var versionString = typeof GM_info != "undefined" ? GM_info.script.version: "5.3.0";
// This monkey is now called:

/////	 ////   /////
//  //  //  //  //  //
/////   //  //  /////
//  //  //  //  //  //
/////    ////   /////

// PLEASE READ ALL THE COMMENTS AT THE START OF THIS FILE BEFORE EDITING

//-----------------------------------------------------------------------------
// Installation
//-----------------------------------------------------------------------------
// This is a Greasemonkey user script.

// To use, first install Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.

// To uninstall, go to Tools/Manage User Scripts, select "Conquer Club - BOB", and click Uninstall.

//-----------------------------------------------------------------------------
// Meta Data - required for Greasemonkey
//-----------------------------------------------------------------------------
// ==UserScript==
// @name          Conquer Club - BOB
// @version       5.3.0
// @namespace     http://yeti_c.co.uk/conquerClub
// @description   Adds Stats, card counter, redemption value, text based map, map inspection tools
// @match         *://*.conquerclub.com/*
// @match         http://userscripts.org/scripts/source/52341.user.js
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_addStyle
// @grant         GM_deleteValue
// @grant         GM_listValues
// @grant         GM_xmlhttpRequest
// @grant         GM_info
// @include       *://*conquerclub.com/*
// ==/UserScript==

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
	var namespace = "BOB.";
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};

	GM_deleteValue = function(name) {
		localStorage.removeItem(namespace + name);
	};

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(namespace + name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.slice(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	};
	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(namespace + name, value);
	};

	GM_listValues = function() {
		var i,result = [], name;
		for (i = 0; i < localStorage.length; i++) {
			name = localStorage.key(i);
			if (name.indexOf(namespace) == 0) {
				result.push(name.slice(namespace.length));
			}
		}
		return result;
	};
	if (!GM_xmlhttpRequest) { //chrome supports this function now
		GM_xmlhttpRequest = function(obj) {
			var request=new XMLHttpRequest();
			request.onreadystatechange=function() {
				if(obj.onreadystatechange) {
					obj.onreadystatechange(request);
				};
				if(request.readyState==4 && obj.onload) {
					obj.onload(request);
				}
			};
			request.onerror=function() {
				if(obj.onerror) {
					obj.onerror(request);
				}
			};
			try {
				request.open(obj.method,obj.url,true);
			} catch(e) {
				if(obj.onerror) {
					obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} );
				}
				return request;
			}
			if (obj.headers) { 
				for(var name in obj.headers) {
					request.setRequestHeader(name,obj.headers[name]);
				}
			}
			request.send(obj.data);
			return request;
		};
	}
}
/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license */
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)
};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)
},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);

var test = window.location.toString();
test = test.slice(0,test.lastIndexOf('/'));
// global vars so refresh function still has scope on them.
var allCountries, allContinents, logFixed, allObjectives = [], allPlayers = [];

var images = {
	attackonly:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00SIDAT8Ocd%60%60%F8%0F%C4%14%83w%EF%DE1%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%08%14%04I%90%8B!.%94%94%94%84%BB%90%02%C3h%E8B%E40%1Cu!%A9%B1%8D%99%0EG%C3p%10%86!%25%05%05%7DJ%1Bj%B8%10%00%F6%99%89%EE%AE%84%9A%9C%00%00%00%00IEND%AEB%60%82",
	bombarded:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00%5BIDAT8Ocd%60%60%F8%0F%C4%60%F0%EE%DD%3B%18%93(ZHH%08%AE%EE%FF%FF%FF%8C0%0E%C8%400%06%1AH%12%86%E9%03%D1%40%00%22%C0f%8E%1AH%7C8%8E%86%E1h%B2%19%99Y%0F9%E5%93%CA%C6Z%DA%90j%08%C1%AC%C7%C2%C2%F2%9F%9D%9D%1D%5E%9C%91b%01%CC%85%00%16%23rE%C7(%B7)%00%00%00%00IEND%AEB%60%82",
	bombard:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00IIDAT8Ocd%60%60%F8%0F%C4%14%83%FF%FF%FF3%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%F8%EE%DD%BB%FF%A4%60d%C7%8C%1A%08%89%18R%C2%0F%A4v4%0C1%13%F6h%18%12LF%A3%C9%06%9Cl%00x%E0%90%9C%EB%B7%F2%06%00%00%00%00IEND%AEB%60%82",
	defendonly:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00JIDAT8O%ED%94%C1%0A%000%08B%ED%FF%FF%B5_p%C9%D8%D8%B9%DA-%C1c%8F%10%D1%000%5C%16I%3B%10%01%CB%0E%20d%A9%0C%13%E3%02%DD%9DY%BF%CF%0C0%97%E3d%B8%8B%9D%ED%A0%EE%26%C3O%E3%D0%BE6%DD%C0%05%90%82%90%9C%E5%9D%92.%00%00%00%00IEND%AEB%60%82",
	mutualbomb:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00IIDAT8Ocd%60%60%F8%0F%C4%60%F0%EE%DD%3B%18%93(ZHH%08%AE%EE%FF%FF%FF%8C0%0E%C8%400%06%1AH%12%86%E9%03%D1%40%00%22%C0f%8E%1AH%7C8%8E%86!E%C9%E6%3D(%CD%8E%86%E1h%18%0E%D6%E2%0B%00%3C%03%D6l4%B8H%5D%00%00%00%00IEND%AEB%60%82",
	normal:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00NIDAT8Ocd%60%60%F8%0F%C4%14%83w%EF%DE1%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%8Aa%E7%A1%EA%EF%A3%EB%83%1B%08d%FC%A7%12%86%B8%90J%86%81%1C5j%20%E5%913%1A%86%23'%0CI%2C%1Cp%16%24%E4%966%F47%10%00%AB%88%ED%BB%03%F0'%AC%00%00%00%00IEND%AEB%60%82",
	safe:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00PIDAT8Ocd%60%60%F8%0F%C4%14%83%FF%FF%FF3%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%F8%EE%DD%BB%FF%A4%60d%C7%8C%1A%08%89%18R%C2%0F%A4v4%0C1%13%F6h%18%12LF%04%93%0D%25%05%05%7DJ%1Bj%B8%10%00%0A%D1%2C4%3D%FCt%15%00%00%00%00IEND%AEB%60%82"
};

//---- Prototyping ----
String.prototype.has = function(key) {
	return this.indexOf(key) > -1;
};
Array.intersect = function(array1, array2) {
	var temp = [], i;
	for (i = 0; i < array1.length; i++){
		if ($.inArray(array1[i], array2) != -1) {
			temp.push(array1[i]);
		}
	}
	return temp;
};
Array.removeAll = function(array1, array2) {
	var temp = [], i;
	for(i = 0; i < array1.length; i++){
		if ($.inArray(array1[i], array2)== -1) {
			temp.push(array1[i]);
		}
	}
	return temp;
};
$.fn.exists = function() {
	return this.length>0;
};
//-----------------------------------------------------------------------------
// Please Wait coding - creates a Div that gets in the way of people doing things!
//-----------------------------------------------------------------------------

// Start/stop please wait
function stopWaiting() {
	$('#popup, #popupBackground').hide();
}

// Start please wait with custom message
function customStartWaiting(msg) {
	var popup = $('#popup, #popupBackground');
	if (!popup.exists()) {
		popup = $('<div id="popup"><img id="pleaseWaitImage" src="http://static.conquerclub.com/loading.gif"/><span id="pleaseWaitMessage"></span></div><div id="popupBackground"></div>').appendTo('#middleColumn');
	}
	popup.toggle(true);
	$('#pleaseWaitMessage').text(msg);
	return popup;
}

var startLogTime = new Date().getTime();

//Game Enumerations
var eGameType = {
	TERMINATOR:0,
	STANDARD:1,
	DOUBLES:2,
	TRIPLES:3,
	QUADRUPLES:4,
	ASSASSIN:5,
	"POLYMORPHIC (2)":6,
	"POLYMORPHIC (3)":7,
	"POLYMORPHIC (4)":8,
};
var ePlayOrder = {
	FREESTYLE:0,
	SEQUENTIAL:1
};
var eBonusCards = {
	"NO SPOILS":0,
	"FLAT RATE":1,
	ESCALATING:2,
	NUCLEAR:3
};
var eFortifications = {
	ADJACENT:0,
	CHAINED:1,
	UNLIMITED:2
};

//-------------------------------------------------------------------------
// OBJECTS
//-------------------------------------------------------------------------

//Player Class
function Player(pid, name){
	this.name = name;
	this.pid = pid;
	this.cards = 0;
	this.armies = 0;
	this.countries = 0;
	this.calculatedCountries = 0;
	this.continentBonus = 0;
	this.territoryBonus = 0;
	this.armiesLastTurn = 0;
	this.lastTerritoryBonus = 0;
	this.lastContinentBonus = 0;
	this.isHandingInCards = false;
	this.lastBonusFixed = false;
	this.points = 0;
	this.deferred = 0;
	this.skipped = 0;
	this.total_skipped = 0;
	this.continents = [];
	this.eliminatedInRound = 0;

	this.killToReduce = function() {
		var countries = this.countries, rem;
		if (gameSettings.fog) {
			countries = this.calculatedCountries;
		}
		if (countries < 12 ) {
			return "-";
		}
		rem = countries % 3;
		return (rem===0)?"*": ( rem == 1 ? "**" : "***") ;
	};
	this.continentsDisplay = function() {
		var ret = "", index, continent, country, pid = this.pid;
		for (index = 0; index < this.continents.length; index++) {
			continent = allContinents[this.continents[index]];
			var bonus = $.grep(continent.owners, function(owner) { return owner.player == pid})[0].bonus;
			ret += fillTemplate(continentTemplate, {
				name: continent.name,
				bonus: "(" + bonus + ")",
				title: continent.name,
				clazz: "continent",
				index: this.continents[index]
			});
		}
		for (index = 0; index < allCountries.length; index++) {
			country = allCountries[index];
			if ((country.bonus!==0) && (country.pid == this.pid)) {
				ret += fillTemplate(continentTemplate, {
					bonus:"[" + country.bonus + "]",
					name: country.name,
					title: country.name,
					clazz:"country",
					index: index
				});
			}
		}
		return ret;
	};
}

function lightUpNeighbours (country) {
	lightupCountries(country.borders, "BORDER");
	lightupCountries(country.attackedBy, "DEFEND");
	lightupCountries(country.attacks, "ATTACK");
	lightupCountries(country.bombards, "BOMBARDS");
	lightupCountries(country.bombardedBy, "BOMBARDED");
	lightupCountries(country.bombardments, "MUTUAL");
}

function createDivs() {
	var toAdd = "", i;
	for (i = 0; i < allCountries.length; i++) {
		toAdd += "<div id='" + i + "m' class='off'></div>";
	}
	return $(toAdd);
}
function updateDivs() {
	var i, country;
	for (i = 0; i < allCountries.length; i++) {
		country = allCountries[i];
		$('#' + i +"m").css({
			width: (12 + (("" + country.quantity).length)*8),
			left: country['x' + mapSize] - 11,
			top: country['y' + mapSize] - 37
		});
	}
}

function displayCountry(country) {
	var pid = country.pid, result;
	if (pid == UID) {
		pid = NID;
	}
	result = '<span class="pColor' + pid + ' country" title="' + country.name + '">' + country.name + '(' + (country.quantity ==-1?"?":country.quantity) + ') ';
	if (country.bonus != 0) {
		result += '['+country.bonus+'] ';
	}
	result += '</span>';
	return result;
}

function getInspectCountry(country) {
	var result = displayCountry(country);
	result += getInspectRepresentation(country.attacks, images.attackonly, "Attacks");
	result += getInspectRepresentation(country.borders, images.normal, "Borders");
	result += getInspectRepresentation(country.attackedBy, images.defendonly, "Attacked By");
	result += getInspectRepresentation(country.bombards, images.bombard, "Bombards");
	result += getInspectRepresentation(country.bombardedBy, images.bombarded, "Bombarded by");
	result += getInspectRepresentation(country.bombardments, images.mutualbomb, "Mutual Bombardment");
	return result;
}
function getInspectRepresentation(countries, image, text) {
	var result = "", index;
	if (countries.length > 0) {
		result +='<br><img class="attackhovers" src='+image+'>';
		result += '<span> ' + text + ' </span>';
		result += '[ ';
		for (index = 0; index < countries.length; index++) {
			result += displayCountry(allCountries[countries[index]]);
		}
		result += ' ]';
	}
	return result;
}

function lightupCountries(countries, type) {
	for (var i = 0; i < countries.length; i++) {
		lightUp(countries[i], type);
	}
}
function lightUp(index, type) {
	var country = allCountries[index], pid = country.pid, clazz, safe;
	if (pid == UID) {
		pid = NID;
	}
	clazz = 'player' + pid;
	if (type) { // show attack type
		if (type=="BORDER") {
			clazz += " typeborder";
		} else if (type=="ATTACK") {
			clazz += " typeattack";
		} else if (type=="DEFEND") {
			clazz += " typedefend";
		} else if (type=="BOMBARDS") {
			clazz += " typebombards";
		} else if (type=="BOMBARDED") {
			clazz += " typebombarded";
		} else if (type=="MUTUAL") {
			clazz += " typemutualbombard";
		}
	} else {
		safe = isSafe(country);
		if (safe === 0) {
			clazz += " h";
		} else if (safe == 1) {
			clazz += " i";
		} else {
			clazz += " j";
		}
	}
	$("#" + index + "m").attr("class", clazz).width((12 + (("" + country.quantity).length)*8));
}
function checkBorders(howSafe, pid, countries) {
	if (howSafe == 0) {
		return 0;
	}
	var k,bb;
	for (k=0; k < countries.length; k++){
		bb = allCountries[countries[k]];
		if (bb.pid == NID) {
			if (bb.armies == '?') {
				return 0;
			} //neutral is not limiting
		} else if (bb.pid != pid) {
			// it's not mine
			howSafe = 1;
			// Or team?
			if (teamNumber(bb.pid) != teamNumber(pid)) {
				return 0;
			}
		}
	}
	return howSafe;
}
		
function isSafe(country) {
	if (this.armies == '?') {
		return 0;
	}
	var howSafe = 2;
	howSafe = checkBorders(howSafe, country.pid, country.attackedBy);
	howSafe = checkBorders(howSafe, country.pid, country.borders);
	howSafe = checkBorders(howSafe, country.pid, country.bombardedBy);
	howSafe = checkBorders(howSafe, country.pid, country.bombardments);
	return howSafe;
}
var continentTemplate = "<span class='{clazz}' title='{title}' data-index='{index}'>{name} {bonus}</span>";

function fillTemplate(template, filling) {
	return template.replace(/{(\w*)}/g, function(){return (typeof(filling[arguments[1]])!='undefined')? filling[arguments[1]]:"";});
}

function displayContinent(continent) {
	var result = "", i;
	if (continent.bonus == 0) {
		return result;
	}
	for (i = 0; i < continent.owners.length; i++) {
		var owner = continent.owners[i];
		if (!owner.overriden) {
			result += fillTemplate(continentTemplate, {
				clazz: "continent pColor" + owner.player,
				title: continent.name,
				name: continent.name,
				bonus: '('+owner.bonus+')',
				index: allContinents.indexOf(continent)
			});
		}
	}
	if (continent.owners.length < 1) {
		result += fillTemplate(continentTemplate, {
			clazz: "continent pColor" + NID,
			title: continent.name,
			name: continent.name,
			bonus: '('+continent.bonus+')',
			index: allContinents.indexOf(continent)
		});
	}
	return result;
}

function Objective (name, realname) {
	this.name = name;
	this.realname = realname;
	this.countrys = [];
	this.continents = [];
	this.required = 0;
	this.owners = []; // hold the owners of this objective (note could be many more than one)
}
function lightUpContinent(continent) {
	for (var i = 0; i < continent.territories.length; i++) {
		lightUp(continent.territories[i]);
	}
	for (i = 0; i < continent.subcontinents.length; i++) {
		lightUpContinent(allContinents[continent.subcontinents[i]]);
	}
}

// Add in "Start BOB" button
function addStartBOB(){
	if ($('#startBobLink').exists()) {
		return; //already there
	}
	var bobLink = $('<a id="startBobLink">Start Bob</a>'), bobSpan = $('<span id="startbob"></span>');
	bobLink.click(startBOB);
	bobSpan.append('] [').append(bobLink).append();
	rightside.find('> a').last().after(bobSpan);
}

function startBOB() {
	$('#startbob').hide();
	forceInit = true;
	gm_ConquerClubGame();
}

function addConfirmDropGameClickHandlers(){
	var dropGameLinks = $('#middleColumn table.listing a').filter(function() {
		return this.innerHTML == 'Drop Game';
	});
	if (myOptions.confirm_drop == "On") {
		dropGameLinks.click(function() {
			var gameNr = this.href.split('=')[2];
			return confirm('Drop Game #' + gameNr + '?');
		});
	} else {
		dropGameLinks.unbind('click');
	}
}

function createGamesTogether(){
	if (!location.href.has("mode=viewprofile") || myOptions.games_together=="Off" || $('#gamesTogether').exists()) {
		return;
	}
	var allLinks = $('dl.details.left-box').find('a'), i, link;
	for(i = 0; i < allLinks.size(); i++) {
		if (allLinks.eq(i).text().has("Find all games")) {
			link = allLinks.get(i).href + "&p2=" + $("#leftColumn .vnav").find("p:first a b").html();
			allLinks.eq(i).parent().after(' | <strong><a id="gamesTogether" href="' + link + '">Show all games together</a></strong>');
		}
	}
}

function showMoreTextMap() {
	var sml = $('#showMoreLink');
	if (sml.html() == "fixed text map") {
		$('#textMap').css({
			height:"",
			overflowY:"hidden"
		});
		sml.html("scrollable text map");
	} else {
		if ($('#textMap').height()>=200) {
			$('#textMap').css({
				height:"200px",
				overflowY:"auto"
			});
			sml.html("fixed text map");
		} else {
			sml.parent().hide();
		}
	}
	updateMenuHiderHeight();
}

function deserialize(name) {
	try {
		return JSON.parse(GM_getValue(name, '{}'));
	} catch (e) {
		return {};
	}
}

function serialize(name, val) {
	GM_setValue(name, JSON.stringify(val));
}

// DEFAULT OPTIONS SETTINGS
DEFAULT_OPTIONS = {
	jumptomap:false,
	textMapType:'Off',
	fadeMap:1,
	'24hourClockFormat':'am/pm',
	mapInspect:"On",
	confirmEnds:true,
	confirmAutoAttack:false,
	confirmDeploy:false,
	statsMode:'Extended',
	floatActions:'Off',
	hideMenu:'Off',
	MinimumFormWidth:600,
	ccdd:'On',
	fulllog:'Off',
	swapavas:'Off',
	smallavas:'Off',
	hidesigs:'Off',
	confirm_drop:'Off',
	continent_overview:'Off',
	autobob:'On',
	games_together: 'On',
	chatOnTop: 'Off',
	sideStats: true,
	showSnapsOnTop:true
};

// Load Options
var myOptions = $.extend({}, DEFAULT_OPTIONS, deserialize("OPTIONS") || {});

// Changing historic values
if (myOptions.mapInspect === true) {
	myOptions.mapInspect = "On";
} else if (myOptions.mapInspect === false){
	myOptions.mapInspect = "Off";
}
serialize("OPTIONS", myOptions);

function showKillers() {
	var ret = "", index, country;
	for (index = 0; index < allCountries.length;index++) {
		country = allCountries[index];
		if (country.killer) {
			ret += '<span class="country" title="' + country.name + '">' + country.name.replace(" ","&nbsp;") + "&nbsp[" + country.neutral + "] </span>";
		}
	}
	return ret;
}

function updatePlayerCards(){
	// --- Get Player Card Counts ---
	if (gameSettings.spoils != eBonusCards["NO SPOILS"]) {
		var players = $('#players li[id^=player]');
		players.each(function(index) {			
			var cards = $(this).find('span[id*=player_cards]').html();
			allPlayers[index + 1].cards=parseInt(cards,10);
		});
	}
}

function getLoadFullLog() {
	var result = myOptions["loadFullLog" + gameSettings.gamenr];
	if ((typeof(result)) == 'undefined') {
		result = true;
	}
	return result;
}

function getMinFormWidth() {
	return myOptions.MinimumFormWidth || 600;
}

function getMinFormWidthMap() {
	return myOptions["MinimumFormWidth:" + mapName] || getMinFormWidth();
}

function checkFloatDice() {
	if (myOptions.floatActions == "On") {
		$('#rolls').css({
			position:'fixed',
			backgroundColor:"#EEEEEE",
			top:0,
			zIndex:14
		});
		if ($('#action-form').exists()) {
			if ($('#from_country').exists()) {
				$('#actionWrapper').css('paddingTop',"24px");
			} else {
				$('#actionWrapper').css('paddingTop',"0px");
			}
		}
	}
}

function showMapInspectDiv() {
	var mapInspectHTML = (myOptions.mapInspect == "On") ? "Map Inspect: <b><span id=hoverInfo /></b>":"";
	$('#mapinspect').html(mapInspectHTML);
}

var oldHandleFrom = unsafeWindow.handleFrom;
unsafeWindow.handleFrom = function(parameter) {
	oldHandleFrom(parameter);
	colourCodeDD();
};

// code to find the country in the drop down.
function findCountry(title){
	for (var i = 0; i < allCountries.length;i++) {
		if (title == allCountries[i].name) {
			return allCountries[i];
		}
	}
	// if we can't find the country - then we need to remove the brackets.
	var bracket = title.lastIndexOf("(");
	if (bracket != -1) {
		title = $.trim(title.slice(0,bracket)); // remove stuff after the bracket so that we can find the country OK.
	}
	for (i = 0; i < allCountries.length;i++) {
		if (title == allCountries[i].name) {
			return allCountries[i];
		}
	}
	return null;
}

// Colour codes & Adds army counts to the Dropdown. (Note if Colour Codes is off - then sets class name back to default)
function colourCodeDD(){
	cc_log("Color Coding the dropdowns");
	// --- Color Code the drop down ---
	if (allCountries) { // checking whether BOB was started.
		$('#to_country option').add('#from_country option').each(function() {
			var country = findCountry($(this).text());
			if (country) {
				this.innerHTML = country.name + " (" + country.quantity + ")";
				if (myOptions.ccdd=="On") {
					this.className = "itemBg"+country.pid;
				} else {
					this.className = "";
				}
			}
		});
	}
}

function prepareMenuHider(init){
	if (menuIsHidden()) {
		if (!showDiv) {
			var showDiv = $('<div id="showDiv"></div>').css({
				position:'absolute',
				width: $('#leftColumn').outerWidth() + $('#leftColumn').offset().left - $('#leftColumn').width(),
				left:0,
				top:0,
				height:document.body.clientHeight
			});
			$("body").append(showDiv);
			showDiv.mouseenter(showSideBar);
			// add div to show the menu.
			$('#leftColumn').mouseleave(hideSideBar);
		}
		if (init) {
			hideSideBar();
		}
	} else {
		$('#showDiv').remove();
		$('#leftColumn').unbind();
	}
}

function updateMenuHiderHeight() {
	if (menuIsHidden()) {
		$("#showDiv").height(document.body.clientHeight);
	}
}

function menuIsHidden() {
	return (myOptions.hideMenu=="On" ||
		(myOptions.hideMenu=="Game" && $("#inner-map").exists()) ||
		(myOptions.hideMenu=="Site" && !$("#inner-map").exists()));
}

function hideSideBar() {
	if (!menuIsHidden()) {
		return;
	}
	var leftMenu = $("#leftColumn");
	if (isGamePage() || !leftMenu.find('span.inbox').exists()) {
		// Don't hide the menu if you have a PM and are not on a game page!
		leftMenu.hide();
		$("#outerColumnContainer").css('borderLeft',"0em solid #DDEEDD");
	}
	updateMenuHiderHeight();
}

function showSideBar(){
	$("#outerColumnContainer").css("borderLeft", "14em solid #DDEEDD");
	$("#leftColumn").show();
}

function setFormWidth(){
	$('#action-form').width(Math.max(getMinFormWidthMap(), $('#outer-map').width()));
}

function toggleConfDrop() {
	toggleOnOff('confirm_drop');
	$('#menu_confirm_drop b').html(myOptions.confirm_drop);
	addConfirmDropGameClickHandlers();
}

function toggleGamesTogether() {
	toggleOnOff('games_together');
	$('#menu_games_together b').html(myOptions.games_together);
	createGamesTogether();
}

function toggleColourCodeDD() {
	toggleOnOff('ccdd');
	$('#menu_colourcode_dd b').html(myOptions.ccdd);
	colourCodeDD();
}

function toggleFullLog() {
	toggleOnOff('fulllog');
	$('#menu_fulllog b').html(myOptions.fulllog);
}
function toggleOnOff(itemName) {
	myOptions[itemName]= myOptions[itemName] == "Off"?"On":"Off";
	serialize("OPTIONS", myOptions);
}

function toggleSwapAvas() {
	toggleOnOff('swapavas');
	$('#menu_swapavas b').html(myOptions.swapavas);
	swapAvatars();
}

function toggleSmallAvas(){
	toggleOnOff('smallavas');
	$('#menu_smallavas b').html(myOptions.smallavas);
	smallAvatars();
}

function toggleHideSigs(){
	toggleOnOff('hidesigs');
	$('#menu_hidesigs b').html(myOptions.hidesigs);
	hideSigs();
}

function showContOver() {
	var on = myOptions.continent_overview == "On";
	$("#contOverviewWrapper").toggle(on);
	$("#objectives").toggle(on);
}

function toggleContOver() {
	toggleOnOff('continent_overview');
	$('#menu_contoverview b').html(myOptions.continent_overview);
	showContOver();
}
	
function moveChatToTop() {
	var chat = $('#chat');
	if (myOptions.chatOnTop == "On") {
		dashboard.before(chat.prev()).before(chat).before($("#full-chat")).before($('#chat-form'));
	} else {
		$('#middleColumn .insidegame').append(chat.prev()).append(chat).append($("#full-chat")).append($('#chat-form'));
	}
	chat[0].scrollTop = chat[0].scrollHeight;
}

function toggleChatOnTop() {
	toggleOnOff('chatOnTop');
	$('#menu_chatOnTop b').html(myOptions.chatOnTop);
	moveChatToTop();
}

function toggleFloatingActionForm(){
	// Code below stolen from edthemaster
	var actionForm = $('#action-form'), outerRolls = $('#rolls'), cards = $('#polyplayer0'), mapInspect = $('#mapinspect');
    if (cards==undefined) cards=$('#cards');
	if (myOptions.floatActions == "Off") {
		myOptions.floatActions = "On";
		showMenuOption("menu_hudWidth");
		showMenuOption("menu_hudWidthMap");
		actionForm.css({
			position:'fixed',
			bottom:0,
			zIndex:4
		});
		if (actionForm.exists()) {
			var wrapperDiv = $('<div id="actionWrapper"></div>');
			if ($('#from_country').exists()) {
				wrapperDiv.css('paddingTop',"24px");
			} else {
				wrapperDiv.css('paddingTop',"0px");
			}
			wrapperDiv.append(mapInspect).append(cards.parent().parent().css("backgroundColor","#EEEEEE"));
			actionForm.find('fieldset').append(wrapperDiv);
			setFormWidth();
		}
		outerRolls.css({
			position: 'fixed',
			backgroundColor: "#EEEEEE",
			top: 0,
			zIndex:4
		});
	} else {
		myOptions.floatActions = "Off";
		hideMenuOption("menu_hudWidth");
		hideMenuOption("menu_hudWidthMap");
		if (actionForm.exists()) {
			$('#outer-rolls').parent().before(cards.parent().parent());
			dashboard.after(mapInspect);
			actionForm.css({
				position:'relative',
				bottom:0,
				width:"100%"
			});
		}
		outerRolls.css({
			position: 'relative',
			backgroundColor: "#EEEEEE",
			top: 0
		});
	}
	serialize("OPTIONS", myOptions);
	$('#menu_hud b').html(myOptions.floatActions);
	updateMenuHiderHeight();
}
function toggleTextMapMap() {
	var current = myOptions["textMapType:" + mapName];
	if (!current) {
		myOptions["textMapType:" + mapName] = "Off";
	} else if (current == "Off") {
		myOptions["textMapType:" + mapName] = "Standard";
	} else if (current == "Standard") {
		myOptions["textMapType:" + mapName] = "Extended";
	} else {
		delete myOptions["textMapType:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	var option = $('#menu_textMap_map b');
	if (myOptions["textMapType:" + mapName]) {
		option.html(myOptions["textMapType:" + mapName]);
	} else {
		option.html("Default</b>");
	}
	setTimeout(doTextMap,100);
}

function toggleTextMap() {
	var current = myOptions.textMapType;
	if (current == "Off") {
		myOptions.textMapType = "Standard";
	} else if (current == "Standard") {
		myOptions.textMapType = "Extended";
	} else {
		myOptions.textMapType = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_textMap b').html(myOptions.textMapType);
	setTimeout(doTextMap,100);
}

function doTextMap() {
	updateTextMap();
	updateMagicMap(true);
	updateMenuHiderHeight();
	stopWaiting();
}

function toggleJumpToMap() {
	myOptions.jumptomap=!myOptions.jumptomap;
	serialize("OPTIONS", myOptions);
	$('#menu_jtm b').html(myOptions.jumptomap ? " On" : " Off");
}

function toggleStatsMode() {
	if (myOptions.statsMode == "Off") {
		myOptions.statsMode = "Standard";
	} else if (myOptions.statsMode == "Standard") {
		myOptions.statsMode = "Extended";
	} else {
		myOptions.statsMode = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_stats b').html(myOptions.statsMode);
	updateStats();
	updateMenuHiderHeight();
	stopWaiting();
}

function toggleSideStats() {
	myOptions.sideStats = !myOptions.sideStats;
	serialize("OPTIONS", myOptions);
	$('#menu_sideStats b').html(myOptions.sideStats?"On":"Off");
	updateSideStats();
}

function updateSideStats() {
	var on = myOptions.sideStats;
	$('#stats').toggle(on).prev().toggle(on);
}

function toggleMagicMap() {
	if (myOptions.mapInspect == "On") {
		myOptions.mapInspect = "Images only";
	} else if (myOptions.mapInspect == "Off") {
		myOptions.mapInspect = "On";
	} else {
		myOptions.mapInspect = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_mapInspect b').html(myOptions.mapInspect);
	showMapInspectDiv();
	updateMagicMap(false);
	updateMenuHiderHeight();
	stopWaiting();
}
function toggleLoadFullLog() {
	if (getLoadFullLog()) {
		myOptions["loadFullLog"  + gameSettings.gamenr] = false ;
	} else {
		delete myOptions["loadFullLog"  + gameSettings.gamenr];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_load_full_log b').html(getLoadFullLog()? " Yes" : " No");
}

function toggleConfirmActionsAA() {
	myOptions.confirmAutoAttack =! myOptions.confirmAutoAttack;
	serialize("OPTIONS", myOptions);
	$('#menu_conf_attack b').html(myOptions.confirmAutoAttack ? " On" : " Off");
}
function toggleConfirmActionsDeploy() {
	myOptions.confirmDeploy =! myOptions.confirmDeploy;
	serialize("OPTIONS", myOptions);
	$('#menu_conf_deploy b').html(myOptions.confirmDeploy ? " On" : " Off");
}

function toggleConfirmEnds() {
	myOptions.confirmEnds =! myOptions.confirmEnds;
	serialize("OPTIONS", myOptions);
	$('#menu_conf_phase b').html(myOptions.confirmEnds ? " On" : " Off");
}

function toggleFadeMap() {
	var cur = getMapfade();
	cur = Math.round((cur*10) - 1);
	if (cur >= 11) {
		cur = 1;
	}
	if (cur <= 0) {
		cur = 10;
	}
	myOptions["fadeMap:" + mapName] = cur/10;
	if (myOptions["fadeMap:" + mapName] == myOptions.fadeMap) {
		delete myOptions["fadeMap:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_fade b').html(Math.round(cur*10) + '%');
	applyFades();
}

function toggleFadeCircles() {
	var cur = getCirclesfade();
	cur += 1;
	if (cur >= 11) {
		cur = 0;
	}
	if (cur < 0) {
		cur = 10;
	}
	myOptions["fadeCircles:" + mapName] = cur;
	if (myOptions["fadeCircles:" + mapName] === 0) {
		delete myOptions["fadeCircles:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_circles_fade b').html(Math.round(cur*10) + '%');
	applyFades();
}

function toggleFormWidth() {
	var cur = getMinFormWidth() - 50;
	if (cur >= 1000) {
		cur = 1000;
	}
	if (cur >= 1200 || cur <= 599) {
		cur = 1200;
	}
	myOptions.MinimumFormWidth = cur;
	serialize("OPTIONS", myOptions);
	$('#menu_hudWidth b').html(cur);
	$('#menu_hudWidthMap b').html(getMinFormWidthMap());
	if (myOptions.floatActions == "On") {
		setFormWidth();
	}
}

function toggleFormWidthMap() {
	var cur = getMinFormWidthMap() - 50;
	if (cur >= 1000) {
		cur = 1000;
	}
	if (cur >= 1200 || cur <= 599) {
		cur = 1200;
	}
	myOptions["MinimumFormWidth:" + mapName] = cur;
	if (myOptions["MinimumFormWidth:" + mapName] == myOptions.MinimumFormWidth) {
		delete myOptions["MinimumFormWidth:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_hudWidthMap b').html(cur);
	if (myOptions.floatActions == "On") {
		setFormWidth();
	}
}

function resetMap() {
	delete myOptions["fadeMap:" + mapName];
	delete myOptions["fadeCircles:" + mapName];
	$('#menu_fade b').html('100%');
	$('#menu_circles_fade b').html('0%');
	applyFades();
	serialize("OPTIONS", myOptions);
}

function createOption(id, text, func, bgcolour) {
	var option = $('<li></li>'), anchor = $('<a></a>').html(text).attr("id", id).click(func);
	if (bgcolour) {
		anchor.css("backgroundColor", bgcolour);
	}
	option.append(anchor);
	return option;
}

function hideMenuOption(id) {
	$("#" + id).parent().hide();
}

function showMenuOption(id) {
	$("#" + id).parent().show();
}

function removeMenuOption(id) {
	$("#" + id).parent().remove();
}

function createGameMenu() {
	var ul = setupMenu();
	ul.append(createMapMenu('menu_sub_map', 'Map Options'));
	ul.append(createViewMenu('menu_sub_view', 'View Options'));
	ul.append(createSnapshotMenu('menu_sub_snapshots', 'Snapshots'));
	ul.append(createConfMenu('menu_sub_conf', 'Confirmations'));
	ul.find('.submenu').click(clickSubMenuItem);
	addSiteWideMenuOptions(ul);
}
function createSubmenu(id, text, ul) {
	var subAnchor = $('<a class="submenu">').html(text).attr("id",id);
	return $('<li>').append(subAnchor).append(ul);
}

function clickSubMenuItem() {
	var ulToShow = $(this).parent().find('ul');
	ulToShow.toggle();
	ulToShow.parent().parent().find('li ul').each(function() {
		if (this != ulToShow[0]) {
			$(this).hide();
		}
	});
	return false;
}

function createMapMenu(id, text) {
	var ul = $('<ul>');
	ul.append(createOption("menu_fade", "Map Opacity: <b>" + Math.round(getMapfade()*100) + '%</b>', toggleFadeMap));
	ul.append(createOption("menu_circles_fade", "Circle Whiteness: <b>" + getCirclesfade()*10 + "%</b>", toggleFadeCircles));
	ul.append(createOption("menu_textMap_map", "Text Map: <b>" + getTextMapText() + '</b>', toggleTextMapMap));
	ul.append(createOption("menu_load_full_log", "Load full log: <b>" + (getLoadFullLog()? " Yes" : " No") + '</b>', toggleLoadFullLog));
	ul.append(createOption("menu_map_reset", "Reset Map Options", resetMap));

	ul.hide();
	return createSubmenu(id, text, ul);
}

function createViewMenu(id, text) {
	var ul = $('<ul>');
	ul.append(createOption("menu_stats", "Stats: <b>" + myOptions.statsMode + '</b>', toggleStatsMode));
	ul.append(createOption("menu_sideStats", "Default stats: <b>" + (myOptions.sideStats? "On":"Off") + '</b>', toggleSideStats));
	ul.append(createOption("menu_mapInspect", "Map Inspect: <b>" + myOptions.mapInspect + '</b>', toggleMagicMap));
	ul.append(createOption("menu_textMap", "Text Map: <b>" + myOptions.textMapType + '</b>', toggleTextMap));
	ul.append(createOption("menu_contoverview", "Continent Overview: <b>" + (myOptions.continent_overview )+ '</b>', toggleContOver));
	ul.append(createOption("menu_chatOnTop", "Chat on top: <b>" + myOptions.chatOnTop + '</b>', toggleChatOnTop));
	ul.append(createOption("menu_clockformat", "Clock Format: <b>" + myOptions["24hourClockFormat"] + '</b>', toggle24HourClock));
	ul.append(createOption("menu_jtm", "Jump to Map: <b>" + (myOptions.jumptomap ? " On" : " Off")+ '</b>', toggleJumpToMap));
	ul.append(createOption("menu_hud", "HUD: <b>" + myOptions.floatActions + '</b>', toggleFloatingActionForm));
	ul.append(createOption("menu_hudWidth", "Min HUD Width: <b>"+getMinFormWidth()+'</b>', toggleFormWidth));
	ul.append(createOption("menu_hudWidthMap", "Min HUD Width(map): <b>"+getMinFormWidthMap()+'</b>', toggleFormWidthMap));
	ul.append(createOption("menu_colourcode_dd", "Colour DropDown: <b>" + myOptions.ccdd + '</b>', toggleColourCodeDD));
	if (myOptions.floatActions == "Off") {
		ul.find("#menu_hudWidth").parent().hide();
		ul.find("#menu_hudWidthMap").parent().hide();
	}
	ul.hide();
	return createSubmenu(id, text, ul);
}

function createConfMenu(id, text){
	var ul = $('<ul>');
	ul.append(createOption("menu_conf_phase", "Confirm Phase End: <b>" + (myOptions.confirmEnds ? " On" : " Off")+ '</b>', toggleConfirmEnds));
	ul.append(createOption("menu_conf_attack", "Confirm AutoAssault: <b>" + (myOptions.confirmAutoAttack ? " On" : " Off")+ '</b>', toggleConfirmActionsAA));
	ul.append(createOption("menu_conf_deploy", "Confirm Deploy: <b>" + (myOptions.confirmDeploy ? " On" : " Off")+ '</b>', toggleConfirmActionsDeploy));
	ul.hide();
	return createSubmenu(id, text, ul);
}

function createSnapshotMenu(id, text){
	var ul = $('<ul>');
	ul.append(createOption("menu_show_snaps_on_top", "Snapshots on top:<b>" + (myOptions.showSnapsOnTop ? " On" : " Off") + '</b>', switchShowSnaps));
	ul.append(createOption("menu_takesnap", "Take Snapshot", takeSnapshot));
	ul.append(createOption("menu_analyse", "Analyse Snapshot", analyse));
	var refresh = createOption("menu_refresh", "Revert To Live", reloadToLive);
	ul.append(refresh);
	ul.append(createOption("menu_delete_snaps_game", "Delete game snapshots", deleteGameSnaps));
	ul.append(createOption("menu_delete_snaps_finished", "Delete snapshots of finished games", removeFinishedGames));
	ul.append(createOption("menu_delete_snaps_all", "Delete all snapshots",deleteAllSnapshots));
	loadSnapshots(refresh);
	ul.hide();
	return createSubmenu(id, text, ul);
}
function createSideSettingsMenu(id, text) {
	var ul = $('<ul>');
	ul.append(createOption("menu_fulllog", "Full Log: <b>" + myOptions.fulllog + '</b>', toggleFullLog));
	ul.append(createOption("menu_swapavas", "Swap Avatars: <b>" + myOptions.swapavas + '</b>', toggleSwapAvas));
	ul.append(createOption("menu_smallavas", "Small Avatars: <b>" + myOptions.smallavas + '</b>', toggleSmallAvas));
	ul.append(createOption("menu_hidesigs", "Hide Signatures: <b>" + myOptions.hidesigs + '</b>', toggleHideSigs));
	ul.append(createOption("menu_confirm_drop", "Confirm drop game: <b>" + myOptions.confirm_drop + '</b>', toggleConfDrop));
	ul.append(createOption("menu_games_together", "Show games together: <b>" + myOptions.games_together + '</b>', toggleGamesTogether));
	ul.append(createOption("menu_clockformat", "Clock Format: <b>" + myOptions["24hourClockFormat"] + '</b>', toggle24HourClock));
	ul.hide();
	return createSubmenu(id, text, ul);
}

function toggleAutoBob() {
	toggleOnOff('autobob');
	$('#menu_auto b').html(myOptions.autobob);
}

function toggleHideMenu() {
	if (myOptions.hideMenu == "Off") {
		myOptions.hideMenu = "Game";
	} else if (myOptions.hideMenu == "Game") {
		myOptions.hideMenu = "Site";
	} else if (myOptions.hideMenu == "Site") {
		myOptions.hideMenu = "On";
	} else {
		myOptions.hideMenu = "Off";
	}
	serialize("OPTIONS", myOptions);
	prepareMenuHider(false);
	$('#menu_hider').html("Hide Menu: <b>" + myOptions.hideMenu + '</b>');
}
function switchShowSnaps() {
	myOptions.showSnapsOnTop = !myOptions.showSnapsOnTop;
	serialize("OPTIONS", myOptions);
	showSnapshots();
	$('#menu_show_snaps_on_top').html("Snapshots on top: <b>" + (myOptions.showSnapsOnTop?"On":"Off") + '</b>');
}

function toggle24HourClock() {
	if (myOptions["24hourClockFormat"] == "Off") {
		myOptions["24hourClockFormat"] = "am/pm";
	} else if (myOptions["24hourClockFormat"] == "am/pm") {
		myOptions["24hourClockFormat"] = "24h";
	} else {
		myOptions["24hourClockFormat"] = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_clockformat b').html(myOptions["24hourClockFormat"]);
	updateMyGamesClocks();
	adjustClock();
}

function checkForUpdate() {
	var lastversion = GM_getValue('lastupdate', 0);
	if (lastversion < new Date().getTime() - 60*60*1000) {
		GM_setValue('lastupdate', new Date().getTime() + "");
		var scriptURL = 'http://userscripts.org/scripts/source/52341.meta.js'; // ?nocache=' + Math.random();
		GM_xmlhttpRequest({
			method: 'GET',
			url: scriptURL,
			onload: updateServerNumber
		});
	}
	toggleUpdateAvailable();
}

function updateServerNumber(response) {
	try {
	 var serverVersion = /@version\s+(\d+.\d+.\d+)/.exec(response.responseText)[1];
	 GM_setValue('updateavailable', serverVersion);
	 toggleUpdateAvailable();
	} catch(e){}
}

function toggleUpdateAvailable() {
	$('#menu_upgrader').html(isNewVersion()?"<span class='attention'>Update Available</span>":"Latest version installed");
}
function isNewVersion() {
	var serverVersion = GM_getValue('updateavailable', false), newVersion, thisVersion;
	if (serverVersion) {
		thisVersion = versionString.split('.');
		var equal = 0;
		$.each(serverVersion.split('.'), function(index, value) {
			if (equal == 0) {
				var server = +value;
				var test = +thisVersion[index];
				equal = server > test?1:(server<test?-1:0);
			}
		});
		return equal > 0;
	}
	return false;
}

function setupMenu() {
	// setup menu headings.
	var gmMenu = $('<div id="bobmenu">'),
		t = $("<h3>BOB Menu <span style='font-size:7pt;' ><a href='http://www.conquerclub.com/forum/viewtopic.php?t=161049'> " + versionString + "</a></span></h3>"),
		ul = $('<ul id="bobmenuUl">');
	gmMenu.append(t).append(ul);
	$('#leftColumn').find('ul:first').parent().append(gmMenu);
	return ul;
}

function addSiteMenuOptions(ul) {
	ul.append(createSideSettingsMenu('menu_sub_sitemenu','Site Options'));
}

function addSiteWideMenuOptions(ul) {
	ul.append(createOption("menu_hider", "Hide Menu: <b>" + myOptions.hideMenu + '</b>', toggleHideMenu))
		.append(createOption("menu_auto", "Auto BOB: <b>" + myOptions.autobob + '</b>', toggleAutoBob))
		.append(createOption("menu_help", "Help/Info", showHelp	))
		.append(createOption("menu_upgrader", "Latest Version Installed", doUpgrade));
}

function hideSigs() {
	if (!location.href.has("mode=viewprofile")) {
		$("#page-body div[class*=signature]").toggle(myOptions.hidesigs!="On");
	}
}

function smallAvatars() {
	var body = $("#page-body");
	if (location.href.has("mode=viewprofile") || !body.exists()) {
		return;
	}
	var avas = body.find('dl.postprofile'), dds = avas.find('dd'), smallavas = myOptions.smallavas=="On";
	dds.not(dds.has('ul[class*=profile]')).not('.expander').toggle(!smallavas);
	dds.filter('.expander').find('input').val(smallavas?"Expand":"Collapse");
	avas.not(avas.has('.expander')).each(function() { //add buttons when needed
		var expand = createButtonDD(smallavas?"Expand":"Collapse");
		$(this).append(expand);
	});
}

function expander() {
	var expand = $(this), dds = expand.parent().parent().find('dd');
	dds.not(dds.has('ul[class*=profile]')).not('.expander').toggle(expand.val()=="Expand");
	dds.filter('.expander').find('input').val(expand.val()!="Expand"?"Expand":"Collapse");
	return false;
}

function createButtonDD(text) {
	var expandButton = $('<input type="Button"></input>')
			.val(text)
			.click(expander);
	return $('<dd class="expander"></dd>').append(expandButton);
}

function swapAvatars() {
	if (location.href.has("mode=viewprofile") || location.href.has("viewtopic.php")) {
		$("#page-body").toggleClass('swapavatars', myOptions.swapavas=="On");
	}
}

// function to change game links to load full log.
function updateGameLinks() {
	if (myOptions.fulllog=="On") {
		var hrefs = $('#middleColumn a'), i, link;
		for (i=0;i<hrefs.length;i++) { 
			link = hrefs.get(i);
			if (link.href.has("game.php")) {
				link.href += "&full_log=Y";
			}
		}
	}
}

function updateMyGamesClocks() {
	if ((location.href.indexOf("mygames")>=0 || location.href.indexOf("mode=next")>=0 || location.href.indexOf("submit=Accept")>=0) // if in mygames
     && ($('#current').text().indexOf('Active') > -1 ||  $('#current').text().indexOf('Eliminated') > -1)) { // and active tab is Active or Eliminated
		var elements = $('#middleColumn tr.even,#middleColumn tr.odd').find('td:eq(4)');
		updateMyGamesClock(elements);
	}
}

function updateMyGamesClock(elements) {
	elements.each(function (){
		var currentHTML = this.innerHTML,
			time = currentHTML.split('<br>')[2].split(" - ")[1].split(':'),
			targetDate = new Date(),
			secondsLeft = parseInt(time[2],10) + parseInt(time[1],10) * 60 + parseInt(time[0],10) * 60 * 60,
			additionalClock = $(this).find('.additionalClock');
		targetDate.setTime(targetDate.getTime() + (secondsLeft * 1000));
		if (!additionalClock.exists()) {
			additionalClock = $('<span class="additionalClock"></span>');
			$(this).append('<br>').append(additionalClock);
		}
		additionalClock.html(getAdditionalClockInfo(targetDate));
	});
}

function showHelp() {
	window.open("http://www.hometag.net/downloads/CC/BOB/help_4.6.1.htm","bobHelp","height=600, width=600px, toolbar=no, scrollbars=yes, menubar=no").focus();
}

function doUpgrade() {
	GM_setValue('updateavailable', false);
	GM_setValue('lastupdate', new Date().getTime() + "");
	this.href = "http://userscripts.org/scripts/source/52341.user.js";
}

function cc_log(text) {
	if (console && console.log) {
		if (typeof text == "string" || typeof text == 'number') {
			text = "BOB," + ((new Date()).getTime() - startLogTime) + " ms:" + arguments.callee.caller.name + ': '+text;
		}
		console.log(text);
	}
}

function padDigits(n, totalDigits){
	n = n.toString();
	var pd = '', i;
	if (totalDigits > n.length){
		for (i=0; i < (totalDigits-n.length); i++){
			pd += '0';
		}
	}
	return pd + n.toString();
}

function countDown(targetDate) {
	if (myOptions['24hourClockFormat'] !="Off") {
		var additionalClock = $('#additionalClock');
		if (!additionalClock.exists()) {
			additionalClock = $('<span id="additionalClock"></span>');
			$("#clock").after(additionalClock);
		}
		additionalClock.html(' [' + getAdditionalClockInfo(targetDate)+ ']');
	}
}

function getAdditionalClockInfo(targetDate) {
	if (myOptions['24hourClockFormat']=="Off") {
		return "";
	}
	var day = ' @ ', ampm = '', currentDate = new Date();
	if (currentDate.getDate() != targetDate.getDate()) {
		day = "Tomorrow @ ";
	} else {
		day = "Today @ ";
	}
	var hours = targetDate.getHours(), minutes = targetDate.getMinutes();
	if (myOptions['24hourClockFormat'] == "am/pm") {
		ampm = " am";
		if (hours >= 12) {
			ampm = " pm";
			hours = hours - 12;
		}
		if (hours === 0) {
			hours = 12;
		}
	} 
	return day + "<b>" + padDigits(hours, 2) + ":" + padDigits(minutes, 2) + ampm + "</b>";
}

function redemptionEscalating() {
	if( num_turnins < 5 ) {
		return num_turnins * 2 + 4;
	} else {
		return num_turnins * 5 - 10;
	}
}

function calcArmiesNextTurn(countries) {
	var ret = 0;
	if (map.reinforcements.length===0) { // old school.
		if(countries < 12 ) {
			return 3;
		}
		ret = Math.floor(countries/3);
	} else { // new territory array stuff.
		var armiesAwarded = 0;
		for (var i=0;i<map.reinforcements.length;i++) {
			var lower = map.reinforcements[i].lower;
			var upper = map.reinforcements[i].upper;
			var divisor = map.reinforcements[i].divisor;
			if (countries>=lower) {
				armiesAwarded += Math.floor((Math.min(countries, upper)-(lower-1))/divisor);
			}
		}
		ret = Math.max(armiesAwarded,map.min_reinforcement);
	}
	return ret;
}

// START TAHITIWAHINI ARMIES FROM CARDS CALCULATIONS
// Source: http://www.conquerclub.com/forum/viewtopic.php?t=15620

// Returns the probability of having a set
// when holding the given number of cards.
function getSetProbability(cards) {
	if (cards < 3) {
		return 0;
	}
	if (cards == 3){
		return 1/3;
	}
	if (cards == 4){
		return 7/9;
	}
	return 1;
}

// Returns the number of armies expected from cashing in
// a set when holding the given number of cards.
function getArmiesFromCardSet(cards) {
	if (gameSettings.spoils == eBonusCards.ESCALATING) {
		return getSetProbability(cards) * redemptionEscalating();
	} else if (gameSettings.spoils == eBonusCards["FLAT RATE"]) {
		if (cards < 3) {
			return 0;
		}
		if (cards == 3){
			return 2 + 8/9;
		}
		if (cards == 4){
			return 5 + 1/3;
		}
		return 7 + 1/3;
	}
	return 0;
}

// Returns the number of armies received from owning countries.
function getArmiesFromCountries(countries, continentBonus, missedTurns) {
	return (calcArmiesNextTurn(countries) + continentBonus) * (missedTurns + 1);
}

// Returns the estimated number of armies due for cashing in a set
// of cards.
function getEstimatedArmiesFromCards(cards, countries, totalCountries) {
	return getArmiesFromCardSet(cards) + (gameSettings.spoils != eBonusCards.NUCLEAR?(6 * getSetProbability(cards) * (countries / totalCountries)):0);
}

// Returns the calculated strength of a players position rounded to the nearest hundreth.
function getStrength(currentArmies, expectedArmies, countries) {
	return Math.round ((currentArmies + expectedArmies - ((2 / 3) * countries)) * 100) / 100;
}
// END TAHITIWAHINI ARMIES FROM CARDS CALCULATIONS

function getMapfade() {
	var fade = 1;
	if (typeof(myOptions["fadeMap:"+mapName])=="undefined") {
		fade = myOptions.fadeMap;
	} else {
		fade = myOptions["fadeMap:" + mapName];
	}
	// force Opacity to not be 0.
	if (fade===0) {
		return 1;
	} else {
		return fade;
	}
}
function getCirclesfade() {
	var fade = myOptions["fadeCircles:" + mapName];
	if (typeof(fade)=="undefined") {
		fade = 0;
	}
	return fade;
}

function getTextMapText() {
	if (typeof(myOptions["textMapType:"+mapName])=="undefined") {
		return "Default";
	}
	return myOptions["textMapType:" + mapName];
}
	
function getTextMap() {
	if (typeof(myOptions["textMapType:"+mapName])=="undefined") {
		return myOptions.textMapType;
	}
	return myOptions["textMapType:" + mapName];
}

function applyFades() {
	var fade = getCirclesfade()/10, i, country, x, y;
	// no canvas and no fade->no need to create a canvas
	if (fade === 0 && getMapfade() == 1) {
		$('#myCanvas').remove();
		return;
	}
	var canvas = getCanvas();
	canvas.css('background-color', 'rgba(255,255,255,' + (1 - getMapfade()) + ')');
	if (fade !== 0) {
		if (canvas[0].getContext) {
			var context = canvas[0].getContext('2d');
			context.clearRect(0,0,canvas.width(),canvas.height());
			context.strokeStyle = "rgba(0,0,0,1)";
			context.fillStyle = "rgba(255,255,255," + fade + ")";
			context.beginPath();
			for (i = 0; i < allCountries.length;i++) {
				country = allCountries[i];
				x = country['x' + mapSize] + 4;
				y = country['y' + mapSize] - 22;
				context.moveTo(x, y);
				context.arc(x, y, (mapSize=='L'?12:10), 0, 2 * Math.PI, false);
			}
			context.fill();
		}
	}
}
function getCanvas() {
	var canvas = $('#myCanvas'), outerMap = $('#outer-map');
	if (canvas[0]) {
		if (canvas.height() != outerMap.height()) {
			canvas.remove();
		} else {
			return canvas;
		}
	}
	canvas = $('<canvas id="myCanvas"></canvas>').css('background-color', 'rgba(255,255,255,' + (1 - getMapfade()) + ')');
	canvas.attr('height', outerMap.height());
	canvas.attr('width', outerMap.width());
	canvas.css({
		top:'0px',
		left:'0px',
		zIndex: 1,
		position:'absolute'
	});
	$("#outer-map").prepend(canvas);
	return canvas;
}

function updateTextMap() {
	var wrapper = $('#textMapWrapper'), textMap = $('#textMap');
	if (getTextMap()!="Off") {
		if (getTextMap()=="Standard") {
			textMap.children().remove();
			textMap.html(createTextMap(false));
		} else {
			textMap.children().remove();
			textMap.html(createTextMap(true));
		}
		$('#showMoreLink').parent().show();
		wrapper.show();
	} else {
		textMap.children().remove();
		textMap.html("");
		wrapper.hide();
	}
}

function teamNumber(pid) {
	// pid=0->neutrals, otherwise just split them up.
	if (pid==UID || pid === 0) {
		return 0;
	}
	return Math.ceil(pid/getAmountOfPlayersPerTeam());
}

function isTeamGame() {
	return [eGameType.DOUBLES, eGameType.TRIPLES, eGameType.QUADRUPLES, eGameType["POLYMORPHIC (2)"], eGameType["POLYMORPHIC (3)"], eGameType["POLYMORPHIC (4)"]].indexOf(gameSettings.type) > -1;
}

function getAmountOfPlayersPerTeam() {
	if ([eGameType.DOUBLES, eGameType["POLYMORPHIC (2)"]].indexOf(gameSettings.type) > -1) {
		return 2;
	} else if ([eGameType.TRIPLES, eGameType["POLYMORPHIC (3)"]].indexOf(gameSettings.type) > -1) {
		return 3;
	} else if ([eGameType.QUADRUPLES, eGameType["POLYMORPHIC (4)"]].indexOf(gameSettings.type) > -1) {
		return 4;
	}
	return 1;
}

function isLastOfTeam(index) {
	return isTeamGame() && index != 0 && (index % getAmountOfPlayersPerTeam() == 0);
}

function updateStats() {
	var wrapper = $('#statsWrapper');
	if (myOptions.statsMode == "Off") {
		$('#statsTable').html("");
		wrapper.hide();
	} else {
		$('#statsTable').html(createStats());
		$('#hideEliminated').unbind('click').click(function() {
			var shouldHide = $(this).text().has("Hide");
			if (shouldHide) {
				$('head').append('<style id="hideEliminatedStyle">tr.eliminated{display:none}</style>');
			} else {
				$('#hideEliminatedStyle').remove();
			}
			$(this).text((shouldHide?'Show':'Hide') + ' eliminated players');
		});
		wrapper.show();
		$("td.popup").hover(function() {
			var div = $('<div id="tempPopup"></div>'), that=$(this), pos = that.position();
			div.html(that.data('popup'));
			pos.top = pos.top - 15;
			div.css({
				position:'absolute',
				backgroundColor:'white',
				opacity:1,
				top:pos.top,
				left:pos.left
			});
			$('#statsWrapper').append(div);
		}, function() {
			$('#tempPopup').remove();
		});
		$('#hideConts').click(hideContinents);
	}
}

function getFullLog() {
	//if we aren't at a game-page any more, don't try to get the log
	if (!window.location.toString().has("conquerclub.com/") || !window.location.toString().has("game.php")) {
		return "";
	}
	var logHtml = $('#log').html(), thisLog, url, response, lastSend, toMatch, i, temp;
	if (logHtml.has('<br>')) {
		thisLog = logHtml.split('<br>'); //Get logs on screen
	} else {
		thisLog = logHtml.split('<BR>');// IE and Opera use BR
	}
	thisLog.pop();// remove last element, not relevant
	if (currentLog=="" && thisLog[0].has("Game has been initialized") || !getLoadFullLog()) {
		currentLog = thisLog;
	} else if (currentLog=="") {
		lastSend = new Date();
		url = test + "/game.php?game=" + gameSettings.gamenr + "&ajax=1&map_key=" + unsafeWindow.mapKey + "&chat_number=" + unsafeWindow.chatNumber+"&lastSend="+lastSend.getTime()+"&full_log=Y";
		cc_log("requesting full log");
		$.ajax({
			url: url,
			success: function(result) {
				response = result.split("&");
			},
			error: function() {
				turnOffFullLog();
			},
			async: false
		});
		if (typeof(response)=="undefined") {
			currentLog = thisLog;//best guess we have.
		} else {
			currentLog = unescape(response[16]).split('<br />');
		}
	} else {
		while (currentLog[currentLog.length - 1].length == 0) {
			currentLog.pop();
		}
		toMatch = currentLog[currentLog.length - 1];
		toMatch = toMatch.split(' - ')[1];
		i = thisLog.length;
		temp = [];
		while (thisLog[--i] && !thisLog[i].has(toMatch)) {
			temp.push(thisLog[i]);
		}

		for (i=temp.length;i>0;i--) {
			currentLog.push(temp[i - 1]);
		}
	}
	return currentLog;
}

function turnOffFullLog() {
	if (confirm("Log Downloading Failed - Would you like to retry?")) {
		location.href = location.href + "&full_log=Y";
	}
}

function getStartingLength() {
	var i,country, amountOfPlayers = allPlayers.length - 2, positionsPerPlayer, countriesToFill = 0, startingAmount = 0, neutralsPerPlayer = 0;

	if (map.positions.length >= amountOfPlayers) {
		positionsPerPlayer = Math.floor(map.positions.length/amountOfPlayers);
		for (i = 0; i < map.positions[0].territories.length; i++) {
			country = allCountries[map.positions[0].territories[i]];
			if (country.neutral) {
				neutralsPerPlayer+= positionsPerPlayer;
			}
		}
	}
	for (i = 0; i < allCountries.length; i++) {
		country = allCountries[i];
		if (!(country.neutral)) {
			countriesToFill++;
		}
	}
	if (amountOfPlayers == 2) {
		amountOfPlayers = 3;
	}
	startingAmount = Math.floor(countriesToFill/amountOfPlayers) + neutralsPerPlayer;
	return startingAmount;
}
function getDateFromLine(line) {
	  var splitted = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/.exec(line);
		if (length > 6) {
			return new Date(splitted[1],splitted[2]-1,splitted[3],splitted[4],splitted[5],splitted[6]);
		}
		return null;
}

function processLog(start, init, showProgress) {
	if (showProgress) {
		customStartWaiting("Processing Log");
	}
	var log = getFullLog(),i,player, end, index;
	cc_log("Starting Log Processing");
	if (currentSnapshot != -1) {
		end = currentSnapshot.date;
		start=0;
		init=true;
	}
	if (!init) {
		rounds = stored_rounds;
		num_turnins = stored_num_turnins;
		for (index = 0; index < allPlayers.length; index++) {
			player = allPlayers[index];
			player.skipped = stored_skipped[index];
			player.total_skipped = stored_total_skipped[index];
			player.total_skipped = stored_total_skipped[index];
			player.lastTerritoryBonus = stored_lastTerritoryBonus[index];
			player.lastContinentBonus = stored_lastContinentBonus[index];
			player.points = stored_terminator_counter[index];
			if (gameSettings.fog) {
				player.calculatedCountries = stored_countries[index];
			}
		}
		TerminatorSummary = stored_terminator_summary;
	} else {
		rounds = stored_rounds = 0;
		num_turnins = stored_num_turnins = 0;
		for (index = 0; index < allPlayers.length; index++) {
			player = allPlayers[index];
			player.skipped = stored_skipped[index] = 0;
			player.total_skipped = stored_total_skipped[index] = 0;
			player.lastTerritoryBonus = stored_lastTerritoryBonus[index] = 0;
			player.lastContinentBonus = stored_lastContinentBonus[index] = 0;
			player.armiesLastTurn = stored_armiesLastTurn[index] = 0;
			player.points = stored_terminator_counter[index] = 0;
			if (gameSettings.fog) {
				player.calculatedCountries = stored_countries[index] = getStartingLength();
			}
		}
		TerminatorSummary = stored_terminator_summary = "";
	}

	//-------------------------------------------------------------------------
	// LOGGING PATTERNS
	//-------------------------------------------------------------------------
	var str_receiveCard = " got spoils";
	var str_outOfTime = " ran out of time";
	var str_fortified = " reinforced ";
	var str_deployed = " deployed ";
	var str_attacked = " assaulted ";
	var str_conquered = "conquered";
	var str_bombarded = " bombarded ";
	var str_missedTurn = " missed a turn";
	var str_cashed = " played";
	var str_eliminated = " eliminated ";
	var str_holding = " holding ";
	var str_deferred = " deferred ";
	var str_armiesFor = "troops for";
	var str_territories = "regions";
	var str_annihilated = "annihilated";
	var str_receives = "received";
	var str_armies = "troops";
	var str_lost = " lost ";
	var str_gained = " gained ";
	var str_points = "points";
	var str_kickedOut = " was kicked out ";
	var str_incrementedRound = "Incrementing game to round";
	var str_initGame = "Game has been initialized";
	var str_autoDeploy = " got bonus of ";
	var str_wonGame = "won the game";

	var lossname, armies2, playerReg = /<span class="player(\d+)">/g, regResult, playerNumbers;
	/*---- Process Log ----*/
	for(i = start; i < log.length; i++ ) {
		var line = log[i];
		if (end) {
			if (getDateFromLine(line) >= end.getTime()) {
				break;
			}
		}
		playerNumbers = [];
		while ((regResult = playerReg.exec(line)) != null) { 
			playerNumbers.push(regResult[1]);
		}
		
		if (line.has(str_eliminated)) {
			if (playerNumbers.length > 1 && playerNumbers[1] != "0") { 
				allPlayers[playerNumbers[1]].eliminatedInRound = rounds;	
			}
			TerminatorSummary += line + " in round - "+rounds+"<br/>";
			continue;
		} else if (playerNumbers[0] == "0") {
			continue;
		}
		
		player = allPlayers[playerNumbers[0]];
		// Process the log
		if( line.has(str_receiveCard)|| line.has(str_outOfTime) || line.has(str_fortified)){
			player.skipped = 0;
			player.deferred = 0;
		} else if(line.has(str_deployed) ) {
			player.skipped = 0;
		} else if(line.has(str_attacked)) {
			player.skipped = 0;
			if (gameSettings.fog) { //add 1 to player who conquered
				player.calculatedCountries++;
				// then minus 1 from player who lost, if not neutral
				if (playerNumbers.length > 1 && playerNumbers[1] != "0") { 
					allPlayers[playerNumbers[1]].calculatedCountries--;
				}
			}
		} else if(line.has(str_bombarded)) {
			player.skipped = 0;
			if (gameSettings.fog) {
				if (playerNumbers.length > 1 && playerNumbers[1] != "0") { 
					allPlayers[playerNumbers[1]].calculatedCountries--;	
				}
			}
		} else if( line.has(str_missedTurn) ){
			player.skipped += 1;
			player.total_skipped += 1;
		} else if( line.has(str_cashed) ){
			player.skipped = 0;
			num_turnins++;
			player.isHandingInCards = true;
		} else if (line.has(str_autoDeploy)) {
			if (!player.isHandingInCards) {
				if (player.lastBonusFixed) {
					player.lastTerritoryBonus = 0;
					player.armiesLastTurn = 0;
					player.lastContinentBonus = 0;
					player.lastBonusFixed = false;
				}
				armies2 = parseInt(/got\sbonus\sof\s(-?\d+)\stroops/.exec(line)[1],10);
				if (armies2 > 0) {
					player.lastTerritoryBonus += armies2;
				}
			}
		} else if( line.has(str_receives) ) {
			if(gameSettings.fog && !line.has(str_holding) && !line.has(str_deferred)) { // territory count calculation we know this is correct thus force correction.
				var terrCount = line.slice(line.indexOf(str_armiesFor)+11,line.indexOf(str_territories)-1);
				terrCount = parseInt(terrCount,10);
				player.calculatedCountries = terrCount;
				player.isHandingInCards = false;
			}
			player.skipped = 0; // Copied from above as receives was previously checked for and did this.
			//calculate how many armies received, and add to last bonus.
			if (player.lastBonusFixed) {
				player.lastTerritoryBonus = 0;
				player.armiesLastTurn = 0;
				player.lastContinentBonus = 0;
				player.lastBonusFixed = false;
			}
			armies2 = line.slice(line.indexOf(str_receives)+8,line.indexOf(str_armies)-1);
			armies2 = parseInt(armies2,10);
			if (line.has(str_deferred)) {
				player.deferred = armies2;
			} else {
				if (line.has(str_holding)) {
					player.lastContinentBonus += armies2;
				} else {
					player.armiesLastTurn += armies2;
				}
			}
		} else if(line.has(str_lost)) {
			if (!line.has(str_points)) {
				if (gameSettings.fog) {
					player.calculatedCountries--;
				}
			} else {
				player.deferred = 0;
				TerminatorSummary += line + " in round - "+rounds+"<br/>";
				var pointsLost = line.slice(line.indexOf(str_lost)+str_lost.length,line.indexOf(str_points)-1);
				pointsLost = parseInt(pointsLost,10);
				player.points -= pointsLost;
			}
		} else if( line.has(str_gained) ){
			player.skipped = 0;
			TerminatorSummary += line + " in round - "+rounds+"<br/>";
			var points = line.slice(line.indexOf(str_gained)+str_gained.length,line.indexOf(str_points)-1);
			points = parseInt(points,10);
			player.points += points;
		} else if(line.has(str_kickedOut)) {
			player.skipped = 0;
			player.eliminatedInRound = rounds;
			TerminatorSummary += line + " in round - "+rounds+"<br/>";
			if (gameSettings.fog && isTeamGame()) {
				//work out where the armies go to after DB gives territories to team mate.
				var togo = calculateBenficiary(player);
				if (togo!=-1) {
					togo.calculatedCountries+=player.calculatedCountries;
				}
				player.calculatedCountries = 0;
			} else if (gameSettings.type != eGameType.TERMINATOR) { // if player kicked out and not terminator then blat this to 0.
				player.calculatedCountries = 0;
			}
		} else if( line.has(str_incrementedRound) || line.has(str_initGame) ) {
			stored_rounds = rounds++;
			// update starter place - and stored vars.
			logFixed=i;
			stored_num_turnins = num_turnins;
			stored_skipped = [];
			stored_total_skipped = [];
			stored_lastTerritoryBonus = [];
			stored_lastContinentBonus = [];
			stored_armiesLastTurn = [];
			stored_terminator_counter = [];
			if (gameSettings.fog) {
				stored_countries = [];
			}
			for (index = 0; index < allPlayers.length; index++) {
				player = allPlayers[index];
				stored_skipped.push(player.skipped);
				stored_total_skipped.push(player.total_skipped);
				stored_lastTerritoryBonus.push(player.lastTerritoryBonus);
				stored_lastContinentBonus.push(player.lastContinentBonus);
				stored_armiesLastTurn.push(player.armiesLastTurn);
				player.lastBonusFixed = true;
				player.deferred = 0;
				stored_terminator_counter.push(player.points);
				if (gameSettings.fog) {
					stored_countries.push(player.calculatedCountries);
				}
			}
			stored_terminator_summary = TerminatorSummary;
		} else if (line.has(str_wonGame)) {
			showDeleteAll = true;
			if (!end && !start) {
				logFixed=i+1; // Only show this on initial load.
			}
		}
	} // end of processing loops
	cc_log("Log Processing Info - Length :" + log.length);
	var termDiv = $('#summary');
	if (!termDiv.exists()) {
		termDiv = $('<div id="summary"></div>');
		$('#termWrapper').append(termDiv);
	}
	termDiv.html(TerminatorSummary + extraTerminatorInfo());
}

function extraTerminatorInfo() {
	var termCounter = "<b>Points Totals</b><br/>";
	var index,player,found = false;
	for (index = 0; index < allPlayers.length; index++) {
		player = allPlayers[index];
		if (player.pid!==0 && player.pid!=UID) {
			var nameStr = "<span class='pColor"+ player.pid +"'>"+player.name+"</span>";
			termCounter += nameStr+" scored <b>"+player.points+"</b> points in this game<br/>";
			if (player.points!==0) {
				found = true;
			}
		}
	}
	return found?termCounter:"";
}

function calculateBenficiary(curPlayer) {
	var curTeam = teamNumber(curPlayer.pid);
	for (var index = 0; index < allPlayers.length; index++) { // loop through from top to bottom.
		if (index != curPlayer.pid) { // ensure not the same player.
			if (teamNumber(index)==curTeam) { // ensure on the same team.
				var possPlayer = allPlayers[index];
				if (possPlayer.eliminatedInRound == 0) { // ensure teammate not a DB already!
					return possPlayer;
				}
			}
		}
	}
	return -1;
}

function hideContinents() {
	var button = $("#hideConts");
	if (button.val() == "Hide") {
		button.val("Show");
		button.parent().css('color',"#999999");
	} else {
		button.val("Hide");
		button.parent().css('color',"#000000");
	}
	$(".continents").toggle();
}
function getStatisticsTemplate(extended, spoils) {
	var template = "<tr {trExtra}><td>{player}</td>";
	template += spoils?"<td>{spoils}</td>":"";
	template += "<td>{missedTurns}</td><td>{troops}</td><td>{regions}</td>";
	template += extended?"<td>{strength}</td>":"";
	template += "<td {bonusExtra}>{bonus}</td><td {troopsDueExtra}>{troopsDue}</td><td>{deferredTroops}</td>";
	template += (extended && spoils && spoils != eBonusCards.NUCLEAR)?"<td>{spoilsEstimate}</td>":"";
	template += "<td {zonesExtra}>{zones}</td></tr>"
	return template;
}

function createStats() {
	var extended = myOptions.statsMode != "Standard";
	var template = getStatisticsTemplate(extended, gameSettings.spoils);
	var toReturn = "<table class='listing'><thead>" + fillTemplate(template.replace(/td/g, "th"), {
		player:"Player",
		spoils:"Spoils",
		missedTurns:"Missed turns" + (extended?" (total)":""),
		troops:"Troops",
		regions:"Regions" + (gameSettings.fog?"/Calc":""),
		strength:"Strength",
		bonus:"Last bonus",
		troopsDueExtra:"title='territory + continent + auto deploy'",
		troopsDue:"Troops due<br>(R + Z + RB)",
		deferredTroops:"Deferred troops",
		spoilsEstimate:"Spoils estimate",
		zones:"Zones <input type='button' value='Hide' id='hideConts'/>"
	}) + "</thead><tbody>";

	var player, estimatedArmiesFromCards, armiesNextTurn, pl_Strength,pctCalcCountries, pctArmies, pctCountries, nameStr, isEliminated, index, unk = "", ntr = "",team = {armies:0,territories:0,calculatedTerritories:0, strength:0, troopsNow: {armies:0,continent:0, territory:0},troopsPrevious: {armies:0,continent:0, territory:0}};

	for (index = 0; index < allPlayers.length; index++) {
		player = allPlayers[index];
		pctArmies = (totalArmies!==0)?Math.round(player.armies*100/totalArmies):0;
		pctCountries = Math.round(player.countries*100/totalCountries);
		pctCalcCountries = Math.round(player.calculatedCountries*100/totalCountries);
		isEliminated = player.eliminatedInRound != 0;

		estimatedArmiesFromCards = Math.round(getEstimatedArmiesFromCards(player.cards, player.countries, totalCountries) * 100) / 100;
		if (index && index != UID) { // if not neutral or unknown
			armiesNextTurn = isEliminated?0:calcArmiesNextTurn(gameSettings.fog?player.calculatedCountries:player.countries);
			pl_Strength = (player.armies + (((armiesNextTurn + player.continentBonus + player.territoryBonus)*(player.skipped+1))) + getArmiesFromCardSet(player.cards) - (2*player.countries/3));
			toReturn += fillTemplate(template, {
				trExtra: "class='pColor" + index + (isEliminated?" eliminated'":"'"),
				player:"<span class='player'>" + player.name + "</span>",
				spoils: '<img width="18px" height="16px" title="' + player.cards + ' Bonus Cards" alt="' + player.cards + ' Bonus Cards" class="i3 icon" src="http://static.conquerclub.com/cards.gif"/>' + player.cards + ' ',
				missedTurns: player.skipped + (extended?"&nbsp;("+player.total_skipped+")":""),
				troops: player.armies + (extended?" ( " + pctArmies +"% )":""),
				regions:player.countries + (gameSettings.fog?" / " + player.calculatedCountries:"") + (extended?" (" + (gameSettings.fog?pctCalcCountries:pctCountries) +"%)" + player.killToReduce():""),
				strength:(+pl_Strength.toFixed(2)),
				bonusExtra:"class='popup' data-popup='("+ player.armiesLastTurn +" + " + player.lastContinentBonus + " + " + player.lastTerritoryBonus + ")'",
				bonus: (player.armiesLastTurn + player.lastContinentBonus),
				troopsDue:(extended?"("+ armiesNextTurn +" + " + player.continentBonus + " + " + player.territoryBonus + ") = ":"") + (armiesNextTurn + player.continentBonus + player.territoryBonus),
				deferredTroops:(armiesNextTurn + player.continentBonus)*player.skipped,
				spoilsEstimate:estimatedArmiesFromCards,
				zonesExtra:"class='continents'",
				zones:player.continentsDisplay()
			});
			team.armies += player.armies;
			team.territories += player.countries;
			team.calculatedTerritories += player.calculatedCountries;
			team.strength += pl_Strength;
			team.troopsNow.armies += armiesNextTurn;
			team.troopsNow.continent += player.continentBonus;
			team.troopsNow.territory += player.territoryBonus;
			if (player.eliminatedInRound == 0 || player.eliminatedInRound == getRounds()) { //not killed or killed in current round
				team.troopsPrevious.armies += player.armiesLastTurn;
				team.troopsPrevious.continent += player.lastContinentBonus;
				team.troopsPrevious.territory += player.lastTerritoryBonus;
			}

			if (isLastOfTeam(index)) {
              	pctArmies = (totalArmies!==0)?Math.round(team.armies*100/totalArmies):0;
				pctCountries = Math.round(team.territories*100/totalCountries);
				pctCalcCountries = Math.round(team.calculatedTerritories*100/totalCountries);
                toReturn += fillTemplate(template, {
                    trExtra: "class='team'",
                    player:"Team " + index/getAmountOfPlayersPerTeam(),
                    troops: team.armies + (extended?" ( " + pctArmies +"% )":""),
                    regions:team.territories + (gameSettings.fog?" / " + team.calculatedTerritories:"") + (extended?" (" + (gameSettings.fog?pctCalcCountries:pctCountries) +"%)":""),
                    strength:(+team.strength.toFixed(2)),
                    bonusExtra:"class='popup' data-popup='("+ team.troopsPrevious.armies +" + " + team.troopsPrevious.continent + " + " + team.troopsPrevious.territory +")'",
                    bonus: team.troopsPrevious.armies + team.troopsPrevious.continent,
                    troopsDue:(extended?"("+ team.troopsNow.armies + " + " + team.troopsNow.continent + " + " + team.troopsNow.territory + ") = ":"") + (team.troopsNow.armies +  team.troopsNow.continent + team.troopsNow.territory)
                });
				team = {armies:0,territories:0,calculatedTerritories:0, strength:0, troopsNow: {armies:0,continent:0, territory:0},troopsPrevious: {armies:0,continent:0, territory:0}}
			}
		} else if (index==UID){ //unknown
			unk = fillTemplate(template, {
				player:"<span class='player'>" + player.name + "</span>",
				troops: player.armies + (extended?" ( " + pctArmies + "% )":""),
				regions:player.countries + (extended?" ( " + pctCountries +"% )":"")
			});
		} else { //neutral
			ntr = fillTemplate(template, {
				player:"<span class='player'>" + player.name + "</span>",
				troops:player.armies + (extended?" ( " + pctArmies + "% )":""),
				regions:player.countries + (extended?" ( " + pctCountries +"% )":""),
				zones:showKillers()
			});
		}
	}
	// add neutrals and unknowns last
	toReturn += unk + ntr +"</tbody>";
	if (extended) { // add totals
		toReturn += "<tfoot>" + fillTemplate(template, {
			player:"Totals",
			troops: totalArmies + " ( 100% )",
			regions:totalCountries + " ( 100% )"
		}) + "</tfoot>";
	}
	toReturn+= "</table>";
	return toReturn;
}

function analyseMap() {
	var tmpArmies = [], tmpCountries = [], i, pid, player;
	for (i = 0; i < allPlayers.length; i++) {
		tmpArmies.push(0);
		tmpCountries.push(0);
	}
	totalCountries = 0;
	totalArmies = 0;

	//Get individual scores
	for(i = 0; i < armies.length;i++ ) {
		if (armies[i].player == "?") {
			pid = UID;
			tmpCountries[pid]++;
		} else {
			pid = parseInt(armies[i].player, 10);
			tmpArmies[pid] += armies[i].quantity;
			tmpCountries[pid]++;
		}
	}

	for (i = 0; i < allPlayers.length; i++) {
		player = allPlayers[i];
		totalArmies += tmpArmies[i];
		player.armies = tmpArmies[i];
		totalCountries += tmpCountries[i];
		player.countries = tmpCountries[i];
		// init ownership and bonuses out for all players.
		player.continents = [];
		player.continentBonus = 0;
		player.territoryBonus = 0;
	}
}

function updateCountries() {
	var countryIndex, country, pid, player;
	for (countryIndex = 0; countryIndex < allCountries.length; countryIndex++) {
		country = allCountries[countryIndex];
		if (armies[countryIndex].player=="?") {
			pid = UID;
		} else {
			pid = parseInt(armies[countryIndex].player, 10);
		}
		country.pid = pid;
		country.quantity = armies[countryIndex].quantity;
		if (country.bonus!==0 && pid>=0 && pid != UID) {
			player = allPlayers[pid];
			if (country.bonus<0) {
				if (country.quantity + country.bonus > 1) { // if decay leaves more than 1 then bonus stands.
					player.territoryBonus = player.territoryBonus + country.bonus;
				} else { // if decay goes beyond 1 then the bonus is negative the rest plus 1.
					player.territoryBonus = (player.territoryBonus - country.quantity) + 1;
				}
			} else { // if positive always happens.
				player.territoryBonus = player.territoryBonus + country.bonus;
			}
		}
	}
}

function updateObjectives() {
	var objSummary = "", obj, objective, obSummary, i, j;
	for (obj = 0; obj < allObjectives.length; obj++) {
		objective = allObjectives[obj];
		objective.owner=-1;
		obSummary = "";
		objective.owners = [];

		var pids = [];
		for (i = 0; i < allPlayers.length; i++) { // set up empty array for holding player counts of countries.
			pids.push(0);
		}
		for (i = 0; i < objective.territories.length; i++ ) {
			var country = allCountries[objective.territories[i]];
			pids[country.pid]++;
			obSummary += displayCountry(country);
		}
		for (i = 0; i < objective.continents.length; i++ ) {
			var continent = allContinents[objective.continents[i]];
			for (j = 0; j < continent.owners.length; j++) {
				pids[continent.owners[j].player]++;
			}
			obSummary += displayContinent(continent);
		}
		var leng = pids.length;
		if (gameSettings.fog) {
			leng--;
		}
		for (i=1;i<leng;i++) { // 1 to start to avoid Neutral player
			if (pids[i]>=(objective.required == 0?(objective.territories.length + objective.continents.length):objective.required)) {
				objective.owners.push(i);
			}
		}

		if (objective.owners.length > 0) {
			for (i = 0; i < objective.owners.length; i++) {
				objSummary += '<span title="' + objective.name + '" class="objective pColor' + objective.owners[i] + '">'+objective.name+" ==> </span>";
				objSummary += obSummary + '<span class="pColor' + objective.owners[i] + '">'+" - Held by "+allPlayers[objective.owners[i]].name+"</span><br/>";
			}
		} else {
			objSummary += '<span title="' + objective.name + '" class="objective">'+objective.name+' ==> </span>';
			objSummary += obSummary;
		}
	}
	if (objSummary.length == 0) {
		return;
	}
	var objWrapperDiv = $('#objectives');
	if (!objWrapperDiv[0]) {
		objWrapperDiv = $('<div id="objectives"><h4>Objective Summary</h4></div>');
		var objDiv =$('<div id="objectivessummary"></div>');
		objWrapperDiv.append(objDiv);
		rightside.append(objWrapperDiv);
	}
	var objectiveDiv = objWrapperDiv.find('#objectivessummary');
	objectiveDiv.html(objSummary);
}

// a three-phase function.
// First loop through all the continents to see if who they are owned by.
// Next loop through all the continents to see if any should be overriden.
// Once we've decided whether or not a continent is overriden - then we can assign it to the player.
function updateContinents() {
	// roll through all the continents and assign ownership to each continent.
	var i, index, continent, owner, pids;
	for (index = 0; index < allContinents.length; index++) {
		continent = allContinents[index];
		continent.owners = [];

		pids = [];
		for (i = 0; i < allPlayers.length; i++) { // set up empty array for holding player counts of countries.
			pids.push(0);
		}
		for (i = 0; i < continent.territories.length; i++ ) {
			var country = allCountries[continent.territories[i]];
			country.inContinent = true;
			pids[country.pid]++;
		}
		for (i = 0; i < continent.subcontinents.length; i++ ) {
			var subcontinent = allContinents[continent.subcontinents[i]];
			for (var j = 0; j < subcontinent.owners.length; j++) {
				pids[subcontinent.owners[j].player]++;
			}
		}
		var leng = pids.length;
		if (gameSettings.fog) {
			leng--;
		}
		for (i=1;i<leng;i++) { // 1 to start to avoid Neutral player
			if (pids[i]>=continent.required) {
				var bonus = continent.bonus;
				if (continent.bonuses && continent.bonuses.length > 1) {
					for (var j = 0; j < continent.bonuses.length; j++) {
						var bonusContinent = continent.bonuses[j];
						if (bonusContinent.required <= pids[i]) {
							bonus = bonusContinent.bonus;
						}
					}
				}

				continent.owners.push({
					player:i,
					overriden: false,
					bonus: bonus
				});
			}
		}
	}

	// now we have all the owners we need to loop back through and work out if any continents need to override.
	for (index = 0; index <allContinents.length; index++) {
		continent = allContinents[index];
		// if this continent is owned by anyone then we need to see if it's overriden.
		if (continent.owners.length > 0) {
			var overridingContinents = $.grep(allContinents, function(toTest) { 
				return toTest != continent && toTest.overrides.indexOf(index) > -1;
			});
			for (i = 0; i <overridingContinents.length; i++) {
				var continent2 = overridingContinents[i];
				for (owner = 0; owner < continent.owners.length; owner++) {
					for (var owner2 = 0; owner2 < continent2.owners.length; owner2++) {
						if (continent.owners[owner].player == continent2.owners[owner2].player) {
							continent.owners[owner].overriden=true;
						}
					}
				}
			}
		}
		// now we've established ownership and sorted overrides we then need to assign the bonuses and ownership to the players.
		for (var ownerIndex = 0; ownerIndex < continent.owners.length; ownerIndex++) {
			owner = continent.owners[ownerIndex];
			var player = allPlayers[owner.player];
			if (!owner.overriden) {
				player.continents.push(index);
				player.continentBonus += owner.bonus;
			}
		}
	}

	var contOutput = "";

	for (i = 0; i < allContinents.length; i++) {
		contOutput += displayContinent(allContinents[i]);
	}
	$("#contOverview").html(contOutput);
	showContOver();
}

function createTextMap(extended) {
	var toReturn = "";
	// init for Text Based Map
	if (!extended) {
		toReturn += "<table align=center style='width:100%;border:1px solid #FFF;background:#eee;' rules=rows >";
	}
	var txtMapSmallHtml2 = "", txtMapSmallOwner = "", bDone = false, country, subcontinent, targetName, index, name, continentName, i;

	for (continentName = 0; continentName < allContinents.length;continentName++) {
		txtMapSmallOwner = "";
		var continent = allContinents[continentName];
		bDone = true;
		if (extended) {
			toReturn += '<h4 ><span class="continent" title="' + continentName + ".) " + continent.name + '">' + continent.name + ' (' + continent.bonus + ')</span></h4>';
		}
		txtMapSmallHtml2 = "";

		for (index = 0; index < continent.territories.length; index++ ) {
			country = allCountries[continent.territories[index]];
			country.inContinent = true;
			if (extended) {
				toReturn += displayCountry(country) + ' ==> [';
				for (i =0; i < country.borders.length; i++) {
					targetName = allCountries[country.borders[i]];
					toReturn += displayCountry(targetName);
				}
				for (i = 0; i < country.attacks.length; i++) {
					targetName = allCountries[country.attacks[i]];
					toReturn += displayCountry(targetName);
				}
				toReturn += ']';
				if ((country.bombards.length + country.bombardments.length)>0) {
					toReturn += ' __> [';
					for (i =0; i < country.bombards.length; i++) {
						targetName = allCountries[country.bombards[i]];
						toReturn += displayCountry(targetName);
					}
					toReturn += ']';
				}
				toReturn += '<br>';
			} else {
				txtMapSmallHtml2 += displayCountry(country);
			}
		}
		for (i = 0; i < continent.subcontinents.length; i++ ) {
			subcontinent = allContinents[continent.subcontinents[i]];
			for (index = 0; index < subcontinent.owners.length; index++) {
				if (extended) {
					toReturn += '<span class="pColor' + subcontinent.owners[index].player + '"><span class="continent" title="' + continent.subcontinents[i] + ".) " + subcontinent.name + '">' + subcontinent.name +' ('+subcontinent.owners[index].bonus+')</span></span>';
				} else {
					var txtMapSmallContOwner = 'class="pColor' + subcontinent.owners[index].player +'"';
					txtMapSmallHtml2 += '<span ' + txtMapSmallContOwner + '><span class="continent" title="' + continent.subcontinents[i] + ".) " + subcontinent.name + '">' + subcontinent.name + ' ('+subcontinent.owners[index].bonus+')</span></span>&nbsp;';
				}
			}
			if (subcontinent.owners.length<1) {
				if (extended) {
					toReturn += '<span class="pColor0"><span class="continent" title="' + continent.subcontinents[i] + ".) " + subcontinent.name + '">' + subcontinent.name + ' ('+subcontinent.bonus+')</span></span>';
				} else {
					txtMapSmallHtml2 += '<span class="pColor0"><span class="continent" title="' + continent.subcontinents[i] + ".) " + subcontinent.name + '">' + subcontinent.name + ' ('+subcontinent.bonus+')</span></span>&nbsp;';
				}
			}
			if (extended) {
				toReturn += '<br>';
			}
		}
		for (index = 0; index < continent.owners.length; index++) {
			if (!continent.owners[index].overriden) {
				if (extended) {
					toReturn += '<br><span class="pColor' + index + '"> BONUS for ' + allPlayers[continent.owners[index].player].name + ' : ' + continent.owners[index].bonus + ' </span>';
				} else {
					txtMapSmallOwner = 'class="pColor' + continent.owners[index].player +'"';
					toReturn += '<tr><td><span ' + txtMapSmallOwner + '><b><span class="continent" title="' + continentName + ".) " + continent.name + '">' + continent.name + ' (' + continent.owners[index].bonus + ')</span></b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
				}
			}
		}
		if (continent.owners.length<1 && !extended) {
			toReturn += '<tr><td><span ' + txtMapSmallOwner + '><b><span class="continent" title="' + continentName + ".) " + continent.name + '">' + continent.name + ' (' + continent.bonus + ')</span></b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
		}
	}
	//Add Text Map
	cc_log("Adding Text Map");

	if (bDone) {
		var txtMapHtml2 = "";
		var hasCountriesWithoutContinent = false;
		txtMapHtml2 += '<h4>No Continent</h4>';
		txtMapSmallHtml2 = "";

		for (index = 0; index < allCountries.length; index++) {
			country = allCountries[index];
			if (!country.inContinent) {
				if (!extended) {
					txtMapSmallHtml2 += displayCountry(country);
				} else {
					txtMapHtml2 += displayCountry(country) + '==> [';
					for (i =0; i < country.borders.length; i++) {
						targetName = allCountries[country.borders[i]];
						txtMapHtml2 += displayCountry(targetName);
					}
					txtMapHtml2 += ']';
					if (country.bombards.length>1) {
						txtMapHtml2 += ' __> [';
						for (i =0; i < country.bombards.length; i++) {
							targetName = allCountries[country.bombards[i]];
							txtMapHtml2 += displayCountry(targetName);
						}
					}
					txtMapHtml2 += '<br>';
				}
				hasCountriesWithoutContinent = true;
			}
		}
		if (hasCountriesWithoutContinent) {
			if (extended) {
				toReturn += txtMapHtml2;
			} else {
				toReturn += '<tr><td><span><b>No Continent</b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
			}
		}
	} else {
		if (extended) {
			toReturn += '<h2>No Continents</h2>';
		}
		for (index = 0; index < allCountries.length; index++) {
			country = allCountries[index];
			if (!extended) {
				txtMapSmallHtml2 += displayCountry(country);
			} else {
				toReturn += displayCountry(country) + ' ==> [';

				for (i =0; i < country.borders.length; i++) {
					targetName = allCountries[cc.borders[i]];
					toReturn += displayCountry(targetName);
				}
				toReturn += ' ]<br>';
			}
		}
		if (!extended) {
			toReturn += '<tr><td><span><b>No Continent</b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
		}
	}
	if (!extended) {
		toReturn += "</table>";
	}
	return toReturn;
}

function updateMagicMap(showProgress) {
	if (showProgress) {
		customStartWaiting("Updating Magic Map");
	}
	var cou, toAdd, playerNumber;
	applyFades();
	var magicmap = $("#magicmap");
	if (myOptions.mapInspect == "Off") {
		if (magicmap.find("div").length != 0){ // if map inspect is turned off, remove some stuff.
			magicmap.find("div").remove();
			for (cou = 0; cou < allCountries.length; cou++) {
				allCountries[cou].light = null;
			}
			$('#players span[class*=player]').add($('#stats span[class*=player]')).unbind();
			$("#stats tr td:first-child").not('[class*=status]').unbind();
			$("#players li").not('[class*=status]').unbind();
			$('#cards, #teammates, #contOverview, #magicmap, #textMap, #statsTable').unbind();
		}
		return;
	}
	
	if (magicmap.find("div").length == 0){ //happens once if all goes well
		magicmap.append(createDivs());
		updateDivs();
		cc_log("Attaching the hover handlers over the map");
		magicmap.on('mouseover','div[id$=m]', magicmapOver);
		$('#inner-map').on('mouseover','div[id^=country]', innermapOver);
		// Add Hovers to player names
		toAdd = $('#players span[class*=player]').add($('#stats span[class*=player]'));
		toAdd.hover(onMouseOverPlayername, onMouseOutHover);
		if (isTeamGame()) {
			// Add Hovers to Team.
			// once for the stats
			toAdd = $("#stats tr td:first-child").not('[class*=status]');
			playerNumber = 1;
			var amountOfPlayers = getAmountOfPlayersPerTeam();
			toAdd.each(function() {
				$(this).hover(handler(playerNumber, amountOfPlayers), onMouseOutHover);
				playerNumber += amountOfPlayers;
			});
			// and once for the player list
			toAdd = $("#players li").not('[class*=status]'); // team
			playerNumber = 1;
			toAdd.each(function() {
				$(this).hover(handler(playerNumber, amountOfPlayers), onMouseOutHover);
				playerNumber += amountOfPlayers;
			});
			$("#players, #stats").on('mouseover','img.icon', lightCards);
		}
		cc_log("Attaching the handlers");
		$('#cards, #teammates').on('mouseover','span.card0, span.card1, span.card2',mouseOverCards);
		$('#dashboard').on('mouseover','.continent', mouseOverContinent)
				.on('mouseover','.country', lightupCountry)
				.on('mouseover','.objective', mouseOverObjective);
		$('#cards, #teammates, #dashboard').mouseout(onMouseOutHover);
		$('#textMap, #statsTable').on('click','.continent',function(e) {
			var i = $(this).data('index');
			var continent = allContinents[i];
			cntryClickHandler(function() {
				lightUpContinent(continent);
			});
		}).on('click','.country', flashCountry).on('click','.player',function(e) {
			for (i = 0; i < allPlayers.length; i++) {
				if (allPlayers[i].name == this.innerHTML) {
					index = i;
					cntryClickHandler(function() {
						onMouseOverPlayer(index);
					});
				}
			}
		});
	} else {
		updateDivs();
	}
}

function handler(start, amount){
	return function() {
		for (var pid = 0; pid < amount; pid++) {
			onMouseOverPlayer(pid + start);
		}
	};
}
function mouseOverObjective(e) {
	var title = this.title, i, j;
	for (i = 0; i < allObjectives.length;i++) {
		if (allObjectives[i].name == title) {
			var selected = allObjectives[i];
			for (j = 0; j < selected.continents.length; j++) {
				lightUpContinent(allContinents[selected.continents[j]]);
			}
			for (j = 0; j < selected.territories.length;j++) {
				lightUp(selected.territories[j]);
			}
		}
	}
}

function mouseOverContinent(e) {
	var i =  $(this).data('index');
	lightUpContinent(allContinents[i]);
}

function lightupCountry(e) {
	for (i = 0; i < allCountries.length; i++) {
		if (allCountries[i].name == this.title) {
			lightUp(i);
			return;
		}
	}
}

function flashCountry(e) {
	for (i = 0; i < allCountries.length; i++) {
		if (allCountries[i].name == this.title) {
			var index = i;
			cntryClickHandler(function() {
				lightUp(index);
			});
			return;
		}
	}
}

function mouseOverCards(e) {
	var countryName = $(this).text();
	if (countryName[1]==":") {
		countryName = countryName.slice(2);
	}
	for (var index = 0;index < allCountries.length;index++) {
		var country = allCountries[index];
		if (country.name == countryName) {
			lightUp(index);
			$("#hoverInfo").html(getInspectCountry(country));
		}
	}
}

function innermapOver(e) {
	var id = parseInt(this.id.slice(7));		
	var country = allCountries[id];
	lightUpNeighbours(country);
	$("#hoverInfo").html(getInspectCountry(country));
}

function magicmapOver(e) {
	var id = parseInt(this.id.slice(0,this.id.length-1));		
	var country = allCountries[id];
	lightUpNeighbours(country);
	$("#hoverInfo").html(getInspectCountry(country));
}
function lightCards(e) {
	var countryName = this.title;
	countryName = countryName.slice(countryName.indexOf(':') + 2);
	countryName = countryName.replace(" (Owned)", "");
	for (var index = 0;index < allCountries.length;index++) {
		var country = allCountries[index];
		if (country.name == countryName) {
			lightUp(index);
			$("#hoverInfo").html(getInspectCountry(country));
		}
	}
}

// various map inspect functions
function onMouseOverPlayername() {
	var pattern = /(\d+)$/;
	var result = pattern.exec(this.className);
	onMouseOverPlayer(result ? result[1] : 0);
}
function onMouseOverPlayer(pid) {
	for (var i = 0; i < allCountries.length; i++) {
		var country = allCountries[i];
		if (country.pid == pid)
			lightUp(i);
	}
}

function onMouseOutHover() {
	$("#magicmap div").attr('class', 'off');
	$("#hoverInfo").html("");
}

function cntryClickHandler(handler) {
	if (myOptions.mapInspect == "Off") { // only do stuff if map inspect is on!!
		return;
	}
	window.setTimeout(jtm,100);
	window.setTimeout(handler,500);
	window.setTimeout(onMouseOutHover,1000);
	window.setTimeout(handler,1500);
	window.setTimeout(onMouseOutHover,2000);
	window.setTimeout(handler,2500);
	window.setTimeout(onMouseOutHover,3000);
	window.setTimeout(handler,3500);
	window.setTimeout(onMouseOutHover,4000);
	window.setTimeout(handler,4500);
	window.setTimeout(onMouseOutHover,5000);
	window.setTimeout(handler,5500);
	window.setTimeout(onMouseOutHover,6000);
	window.setTimeout(handler,6500);
	window.setTimeout(onMouseOutHover,7000);
	window.setTimeout(handler,7500);
	window.setTimeout(onMouseOutHover,8000);
	window.setTimeout(handler,8500);
	window.setTimeout(onMouseOutHover,9000);
	window.setTimeout(handler,9500);
	window.setTimeout(onMouseOutHover,10000);
}

function checkElimSummary() {
	$('#termWrapper').toggle(TerminatorSummary!="");
}

function snapshotToObjects(snapshotArmies, old) {
	var toReturn = [];
	var items = snapshotArmies.split(',');
	for (var i = 0; i < items.length; i++) {
		var ter = items[i].split('-');
		var toAdd = {};
		if (ter[0] == "?") {
			toAdd.quantity = -1;
			toAdd.pid = UID;
		} else {
			if (old) {
				toAdd.quantity = +ter[0];
				toAdd.pid = +ter[1];
			} else {
				toAdd.quantity = +ter[1];
				toAdd.pid = +ter[0];
			}
		}
		toReturn.push(toAdd);
	}
	return toReturn;
}
function currentToSnapshotarray() {
	var toReturn = "";
	for (var i = 0; i < allCountries.length; i++) {
		var country = allCountries[i];
		if (country.quantity == -1) {
			toReturn += "?-?,";
		} else {
				toReturn += country.quantity + "-" + country.pid + ",";
		}
	}
	return toReturn.slice(0,toReturn.length - 1);
}


function snapToChat() {
	var text = "snap :: " + getRounds() + "~" + encoding.positionsToChatline();
	if (text.length > 255) {
		alert("Too much information.. Sorry, can't take snapshot in chat.");
		return;
	}
	$('#message').val(text);
	$('#team').prop('checked', true);
	shootSubmit($('#chat-form').get(0));	
}

// Needed for now since FF < 9 doesn't understand the .submit()-jQuery method.
function shootSubmit(element) {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("submit", true, true);
	element && element.dispatchEvent(evt); 
}

function chatToSnap() {
	var chat = $("#chat");
	if (chat.html().has(": snap :: ")) {
		cc_log("checking for snaps..");
		chat.contents().each(testForSnaps);
	}
}
function testForSnaps() {
	var that = $(this);
	if (that.is("span") && that.children().size() > 0) {
		that.contents().each(testForSnaps);
	} else {
		var html = this.textContent;
		if (html.indexOf(": snap :: ") == 0) {
			var base = html.slice(10).split("~");
			html = ': <a class="snapshot">snapshot round ' +  base[base.length - 2] + '<span class="hide">' + base[base.length - 1] + '</span></a>';
			that.replaceWith(html);
		}
	}
}

/** Encoder for efficiently writing the snapshot to a chatline, thanks to Joriki for this contribution. **/
var encoding = (function() {
	// Encodes data bit by bit into a string
	// symbolSize: Amount of bits to use
	// nextChars: A function that should return the given bits to the desired char 
	function BaseEncoder(symbolSize,nextChars) {
		var bits = 0,
			nbits = 0,
			string = "",
			mask = (1 << symbolSize) - 1;

		// Encodes the given number into the result, using nencode bits.
		this.encodeBits = function(newBits,nencode) {
			bits <<= nencode;
			bits |= newBits;
			nbits += nencode;
			for (;;) {
				var shift = nbits - symbolSize;
				if (shift < 0) {
					break;
				}
				string += nextChars((bits >> shift) & mask);
				nbits = shift;
			}
		}

		// Returns the result so far.
		this.result = function() {
			if (nbits != 0) { //fill up the remaining bits
				this.encodeBits(0,symbolSize - nbits);
			}
			return string;
		}
	}
	// Decodes the data bit by bit from the given string
	// symbolSize: Amount of bits used
	// nextBits: A function that transfers the given charcode to bits
	function BaseDecoder(string,symbolSize,nextBits) {
		var bits = 0, nbits = 0, index = 0;
        
		this.decodeBits = function(ndecode) {
			while (nbits < ndecode) {
				bits <<= symbolSize;
				bits |= nextBits(string.charCodeAt(index++));
				nbits += symbolSize;
			}
			nbits -= ndecode;
			return (bits >> nbits) & ((1 << ndecode) - 1);
		}
	}

	function createUnicodeEncoder() {
		return new BaseEncoder(15, function(bits) {
			return String.fromCharCode(bits + 128);
		});
	}
	function createUnicodeDecoder(string) {
		return new BaseDecoder(string, 15, function(nextChar) {
			return nextChar - 128;
		});
	}
	//returns the number of bits in the given number
	function countBits(number) {
		var nbits = 0;
		while ((1 << nbits) <= number) {
			nbits++;
		}
		return nbits;
	}
	// Stores the positions by saving them bit by bit, 15 bits per character in chat.
	function positionsToChatline() {
		var encoder = createUnicodeEncoder(), 
			nPIDbits = countBits(allPlayers.length - 1), 
			nBigBits = 0,
            i, rest;
		for (i = 0;i < allCountries.length;i++) {
			rest = allCountries [i].quantity - 3;
			if (rest > 0)
				nBigBits = Math.max(nBigBits, countBits(countBits(rest) - 1));
		}
		for (i = 0;i < allCountries.length;i++) {
			var country = allCountries [i];
			var unknown = country.quantity == -1;
			encoder.encodeBits (unknown ? UID : country.pid, nPIDbits);
			if (!unknown) {
				rest = country.quantity - 3;
				var big = rest > 0;
				encoder.encodeBits (big ? 0 : country.quantity, 2);
				if (big) {
					var nbits = countBits(rest) - 1;
					encoder.encodeBits(nbits, nBigBits);
					encoder.encodeBits(rest - (1 << nbits), nbits);
				}
			}
		}
		return '?' + String.fromCharCode ('0'.charCodeAt (0) + nBigBits) + encoder.result();
	}
	// Retrieves the bits and recreates the positions from them.
	function chatlineToPositions(text) {
        var result = [], 
            nBigBits = text.charCodeAt(1) - '0'.charCodeAt(0),
            decoder = createUnicodeDecoder(text.slice(2)),
            nPIDbits = countBits(allPlayers.length - 1);
        for (var i = 0;i < allCountries.length;i++) {
            var next = {pid:decoder.decodeBits(nPIDbits), quantity:-1};
            if (!(gameSettings.fog && next.pid == UID)) {
                next.quantity = decoder.decodeBits(2);
                if (next.quantity == 0) {
                    var nbits = decoder.decodeBits(nBigBits);
                    next.quantity = decoder.decodeBits(nbits) + (1 << nbits) + 3;
                }
            }
            result.push(next);
        }
        return result;
    }
	// older way of storing snapshots in chat, uses A-Z for storing player number and a-z for storing quantities
	function chatlineToPositionsOld(text) {
		var arrMatch, i, pattern = new RegExp("[A-Z]+([a-z]+)|[\?]","g"), toReturn = [];
		while (arrMatch = pattern.exec(text)) {
			var toAdd = {pid:0,quantity:0};
			var playerString = /^[\?A-Z]+/.exec(arrMatch[0])[0];
			if (playerString == "?") {
				 toAdd.pid = UID;
				 toAdd.quantity = -1;
			} else {
				for(i = 0; i < playerString.length;i++) {
					toAdd.quantity = toAdd.quantity * 26 + playerString.charCodeAt(i) - 'A'.charCodeAt(0);
				}
				for(i = 0; i < arrMatch[1].length;i++) {
					toAdd.pid = toAdd.pid * 26 + arrMatch[1].charCodeAt(i) - 'a'.charCodeAt(0);
				}
			}
			toReturn.push(toAdd);
		}
		return toReturn;
	}
	
	return {
		chatlineToPositions: function(text) {
			if (text.length > 2 && text.charCodeAt (0) == '?'.charCodeAt(0) && text.charCodeAt(2) > 127) {
				return chatlineToPositions(text);
			}
			return chatlineToPositionsOld(text);
		},
		positionsToChatline: positionsToChatline
	};
})();

function takeSnapshot() {
	// get date
	var arms = currentToSnapshotarray(), savename = gameSettings.gamenr+"~"+ new Date().getTime() +"~"+getRounds();
	GM_setValue(savename, arms);
	addSnapshot(savename, $('#menu_refresh').parent());
}
function getRounds() {
	if (!getLoadFullLog()) {
		return rounds;
	}
	return $('#round').html();
}

function onSnapShot(loadName,id) {
	var data = GM_getValue(loadName), option;
	if (currentSnapshot != -1) {
		option = $("#menu_snapshot_"+currentSnapshot.id);
		option.html(option.find("b").html());
	}
	option = $("#menu_snapshot_"+id);
	if (!option.find('b').exists()) {
		option.html('<b>' + option.html() + '</b>');
	}
	currentSnapshot = getSnapshotData(loadName);
	currentSnapshot.id = id;
	// splitting in case of old snapshot
	currentSnapshot.data = snapshotToObjects(data.split("~~~~~~~~~~")[0], data.split("~~~~~~~~~~").length == 1);
	redrawArmies(currentSnapshot.data);
	var display = currentSnapshot.date.getHours()+":"+padDigits(currentSnapshot.date.getMinutes(), 2)+" - "+currentSnapshot.date.getDate()+"/"+(currentSnapshot.date.getMonth()+1)+"/"+currentSnapshot.date.getFullYear();
	$('#snapshotState').text("Round " + currentSnapshot.round + ", date/time: " + display );
	updateBOB(true);
}
function redrawArmies(countryArray) {
	var colorArray = "nrgbypcosuemvadfhijklqtwxyz",colourCode = isColourCodeOn(),i,country, quantity, base;
	for (i = 0; i < countryArray.length; i++) {
		country = countryArray[i];
		quantity = (country.quantity == -1?"?":country.quantity);
		if (colourCode) {
			if (country.pid == UID && UID != NID) {
				quantity = "?" + quantity;
			} else {
				quantity = colorArray[country.pid] + quantity;
			}
		}
		base = $("#country" + i).css("color", playerColors[country.pid == UID?0:country.pid].normal);
		if (base.text() != quantity) {
			base.add("#country" + i + "t").add("#country" + i + "b").add("#country" + i + "l").add("#country" + i + "r").text(quantity);
		}
	}
}
function isColourCodeOn() {
	return $('#player_prefix_1').is(":visible") || $('#stat_prefix_1').is(":visible");
}

function reloadToLive() {
	var option = $("#menu_snapshot_"+currentSnapshot.id);
	option.html(option.find("b").html());
	$('#snapshotState').text("Live");
	currentSnapshot = -1;
	redrawArmies(allCountries);
}

function analyse() {
	if (currentSnapshot==-1) {
		return;
	}
	// loop through arrays
	if (currentSnapshot.data.length==allCountries.length){
		var changedCountries = [], i, live, snap;
		for (i = 0; i < allCountries.length; i++) {
			live = allCountries[i];
			snap = currentSnapshot.data[i];
			if (snap.pid!=live.pid || snap.quantity!=live.quantity) {
				changedCountries.push(i);
			}
		}
		cntryClickHandler(function() {
			lightupCountries(changedCountries);
		});
	} else {
		alert("Error: army arrays are different lengths - this snapshot is invalid");
	}
}

var makeOSS = function (n,i) {
	return function () {
		onSnapShot(n,i);
	};
};

function deleteGameSnaps() {
	if (confirm("Are you sure you wish to delete this games Snapshots?")) {
		delGameSnaps();
	}
}
function getSnapshots() {
	cc_log("getting snapshots")
	var allValues = GM_listValues();

	return $.grep(allValues, function(val) {
		return (/^\d{1,9}~/).test(val);
	});
	return toReturn;
}

function removeSnapshots(gamenrs, keep) {
	var newSnapshotsArray = [], snapshots = getSnapshots(), amountDeleted = 0, i, snapshot, game, loadname;
	for (i=0;i<snapshots.length;i++) {
		snapshot = snapshots[i].split("~");
		game = snapshot[0];
		loadname = snapshots[i];
		if ($.inArray(game, gamenrs) < 0 == keep) {
			GM_deleteValue(loadname);// Remove image and data for the snapshot.
			amountDeleted++;
		} else {
			newSnapshotsArray.push(loadname);
		}
	}
	if (amountDeleted > 0) {
		alert('Deleted ' + amountDeleted + ' snapshots. Amount left: ' + newSnapshotsArray.length);
	}
	GM_setValue("SNAPSHOTS", newSnapshotsArray.toString());
}

function delGameSnaps() {
	var newSnapshotsArray = [], snapshots = getSnapshots(), i, snapshot, game, loadname;
	for (i=0;i<snapshots.length;i++) {
		snapshot = snapshots[i].split("~");
		game = snapshot[0];
		loadname = snapshots[i];
		if (game==gameSettings.gamenr) {
			GM_deleteValue(loadname);// Remove image and data for the snapshot.
		} else {
			newSnapshotsArray.push(loadname);
		}
	}
	GM_setValue("SNAPSHOTS", newSnapshotsArray.toString());
	currentSnapshot=-1;
	removeSnapshotsFromMenu();
}

function removeFinishedGames() {
	var username = $("#leftColumn .vnav").find("p:first a b").html();
	$.get('http://www.conquerclub.com/api.php', {
		mode: "gamelist",
		un: username,
		gs: "A"
	}, removeFinishedGamesInXml , 'xml');
}

// gets the current user, and removes snapshots based on the active games of that user
function removeFinishedGamesInXml(xml) {
	var pageNrs = $(xml).find('page').text().split(' of '),
		gameNrTags = $(xml).find('game_number'),
		gameNrs = $.map(gameNrTags, function(tag) {
			return $(tag).text();
		});
	// if someone has more than 1 page (=200) of active games.. add those.)
	if (pageNrs[1] > 1 && pageNrs[0] == 1) {
		for (var i = 2; i <= pageNrs[1]; i++) {
			var username = $("#leftColumn .vnav").find("p:first a b").html();
			$.ajax({
				url: 'http://www.conquerclub.com/api.php',
				data: ({
					mode: "gamelist",
					un: username,
					gs: "A",
					page: i
				}),
				success: function (xml) {
					var gameNrTags = $(xml).find('game_number');
					var gamesToAdd = $.map(gameNrTags, function(tag) {
						return $(tag).text();
					});
					gameNrs = $.merge(gameNrs, gamesToAdd);
				},
				async: false,
				dataType: 'xml'
			});
		}
	}
	removeSnapshots(gameNrs,true);
}

function removeSnapshotsFromMenu() {
	for (var i=0;i<snapshotsMenuLength;i++) {
		removeMenuOption("menu_snapshot_"+i);
	}
	snapshotsMenuLength=0;
}

function deleteAllSnapshots() {
	var snapshots = getSnapshots();
	if (snapshots.length > 0) {
		if (confirm("Are you sure you wish to delete all your Snapshots?")) {
			for (var i=snapshots.length-1;i>=0;i--) {
				var loadname = snapshots[i];
				GM_deleteValue(loadname);// Remove image and data for the snapshot.
			}
			currentSnapshot=-1;
		}
	}
	removeSnapshotsFromMenu();
}

function loadSnapshots(refresh) {
	var snapshots = getSnapshots().sort(function(a,b) {
		a = a.split("~");
		b = b.split("~");
		if (a.length < 2 || b.length < 2) {
			return 0;
		}
		return a[1] - b[1];
	});
	for (var i=0;i<snapshots.length;i++) {
		addSnapshot(snapshots[i], refresh);
	}
}
function getSnapshotData(snapshotString) {
	var snapshot = snapshotString.split("~"),
		toReturn = {},
		date = new Date(), round;
	date.setTime(snapshot[1]);
	if (snapshot.length > 2) {
		round = snapshot[2];
	}
	return {
		date:date,
		gameNr: snapshot[0],
		round: round
	};
}
function addSnapshot(snapshotString, before) {
	var snapshot = getSnapshotData(snapshotString);
	if (snapshot.gameNr == gameSettings.gamenr) {// 1st element of snapshot -> game nr.
		var display = snapshot.date.getHours()+":"+padDigits(snapshot.date.getMinutes(), 2)+" - "+snapshot.date.getDate()+"/"+(snapshot.date.getMonth()+1)+"/"+snapshot.date.getFullYear();
		if (snapshot.round) { // round number is present, add to display
			display = snapshot.round + " - "+display;
		}
		if (currentSnapshot.id == snapshotsMenuLength) { // if selected
			display = '<b>' + display + '</b>';
		}
		$(before).after(createOption("menu_snapshot_" + snapshotsMenuLength, display, makeOSS(snapshotString, snapshotsMenuLength), "#77AA77"));
		snapshotsMenuLength++;
	}
}

function showDeleteSnapshots() {
	var snapshots = getSnapshots();
	for (var i=snapshots.length-1;i>=0;i--) {
		var snapshot = snapshots[i].split("~");
		var game = snapshot[0];
		if (game==gameSettings.gamenr) {
			if (confirm("Would you like to delete Snapshots from this game?")) {
				delGameSnaps();
			}
			break; // once we found one - drop out of the loop.
		}
	}
}
function showSnapshots() {
	var snapshots = $("#snapshots");
	if (myOptions.showSnapsOnTop) {
		if (!snapshots.exists()) {
			$('#map-cell').parent().before("<tr><td id='snapshots' colspan=2></td></tr>");
			snapshots = $("#snapshots");
			snapshots.append("<div id='snapNormal'><button id='snapToChat'>take snapshot in chat</button>\
<button id='normalSnap'>take snapshot</button>\
<button id='revert'>Revert to live</button>\
<button id='showDifferences'>Show differences</button>\
<span id='snapshotState' style='margin-left:12px'>Live</span></div>");
			var hide = $('<span><a>hide</a></span>').css({
				"float":"right",
				"margin-left": "20px"
			}).click(function() {
				$('#snapshots').hide();
				return false;
			});
			snapshots.find("#snapNormal").append(hide);
			$('#snapToChat').click(snapToChat);
			$('#normalSnap').click(takeSnapshot);
			$('#revert').click(reloadToLive);
			$('#showDifferences').click(analyse);
			$('#chat').on("click", "a.snapshot", function(e) {
				var data = $(this).find(".hide").text();
				var toDraw = encoding.chatlineToPositions(data);
				if (toDraw.length != allCountries.length) {
					alert("wrong format for snapshot.");
					return;
				}
				currentSnapshot = {
					data:toDraw,
					id:-1
				};
				$('#snapshotState').text("From chat.");
				redrawArmies(toDraw);
			});
		} else {
			snapshots.show();
		}
	} else {
		snapshots.hide();
	}
	chatToSnap();
}

var jtm = function jtm() {
	if( myOptions.jumptomap ) {
		window.location.hash = "#map-cell";
	}
};

//-------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//-------------------------------------------------------------------------
var rightside = $('#right_hand_side');
var dashboard = $('#dashboard');
var gameSettings = (function() {
	var toReturn = {
		gamenr : $("#game2").val()
	};
	// ---- determine fog ----
	if (dashboard.exists()) {
		var options = {};
		dashboard.find("dl > dt").each(function() {
			var dt = $(this);
			options[dt.html()] = dt.next().text();
		});
		toReturn.fog = options["Special Gameplay"] && options["Special Gameplay"].indexOf("Fog") != -1;
		//determine speed
		toReturn.speed = dashboard.find("h3").html().indexOf("Speed") == 0;
		// ---- Get Game Modes ----
		toReturn.playOrder = ePlayOrder[options["Play Order"] ? options["Play Order"].toUpperCase() : ""];
		toReturn.type = eGameType[options["Game Type"] ? options["Game Type"].toUpperCase() : ""];
		toReturn.fortifications = eFortifications[options["Reinforcements"] ? options["Reinforcements"].toUpperCase():""];
		toReturn.spoils = eBonusCards[options["Spoils"] ? options["Spoils"].toUpperCase():""];
	}
	return toReturn;
})();

//---- Log Processing ----
var currentLog = "";
var rounds = 0;
var stored_rounds = 0;
var num_turnins = 0;
var stored_num_turnins = 0;
var stored_skipped = [];
var stored_total_skipped = [];
var stored_countries = [];
var stored_terminator_summary;
var stored_terminator_counter = [];
var stored_lastContinentBonus = [];
var stored_lastTerritoryBonus = [];
var stored_armiesLastTurn = [];

//---- Gameplay ----
var TerminatorSummary = "";
var num_players = 0;
var pIndxs;

//---- Player ----
var NID = 0; // Neutral ID
var UID = 0; // Unknown ID <-- set to 0 here to ensure a value always set

// -- Various
var map, mapName, armies, mapsize;

var totalArmies = 0;
var totalCountries = 0;
var totalStartCountries = 0;
var startCountriesInPosition = 0;
var totalPositionCountries = 0;

var snapshotsMenuLength = 0;
var currentSnapshot = -1;
var forceInit = false;

var showDeleteAll = false;

function createSiteWideMenu() {
	prepareMenuHider(true);
	var ul = setupMenu();
	addSiteMenuOptions(ul);
	addSiteWideMenuOptions(ul);
	ul.find('.submenu').click(clickSubMenuItem);
	updateMenuHiderHeight();
}
function performSiteWideAlterations() {
	updateMyGamesClocks();
	updateGameLinks();
	addConfirmDropGameClickHandlers();
	swapAvatars();
	smallAvatars();
	hideSigs();
	createGamesTogether();
	checkForUpdate();
}

function adjustClock() {
	var timeStr = $("#clock").html();
	if (!timeStr) {
		return;
	}
	var time = timeStr.split(':');
	var targetDate = new Date();
	var hoursLeft = parseInt(time[0],10);
	var minutesLeft = parseInt(time[1],10) + hoursLeft * 60;
	var secondsLeft = parseInt(time[2],10) + minutesLeft * 60;
	targetDate.setTime(targetDate.getTime() + (secondsLeft * 1000));
	countDown(targetDate);
}

// --- Add Styles ---
// Colour Defs
var playerColors = [
{ normal:"#FFFFFF", log:"#000000"}, // Neutral has always been black in the logs
{ normal:"#FF0000", log:"#FF0000"}, // Red
{ normal:"#009A04", log:"#009A04"}, // Green
{ normal:"#0000FF", log:"#0000FF"}, // Blue
{ normal:"#FFFF00", log:"#CCCC00"}, // Yellow
{ normal:"#FF00FF", log:"#FF00FF"}, // Magenta/Pink
{ normal:"#00FFFF", log:"#00CCCC"}, // Cyan
{ normal:"#FF9922", log:"#FF9922"}, // Orange
{ normal:"#7F7F7F", log:"#7F7F7F"}, // Gray
{ normal:"#9400d3", log:"#9400d3"},
{ normal:"#00ff00", log:"#00ff00"},
{ normal:"#cd5c5c", log:"#cd5c5c"},
{ normal:"#688e23", log:"#688e23"}
];
var config;
function getConfigHTML() {
	if (!config) {
		var config = $(".insidegame > script").filter(function() {
			return  $(this).html().indexOf("map = ") > -1;
		}).html();
	}
	return config;
}
function getMap() {
	var config = getConfigHTML();
	if (config) {
		var json = /map = (.+);/.exec(config)[1];
		return JSON.parse(json);
	}
	return {};
}
function getArmies() {
	var json = $('#armies').html();
	if (json.length == 0) {
		var config = getConfigHTML();
		if (config) {
			json = /armies = (.+);/.exec(config)[1];
		}
	}
	return JSON.parse(json);
}
function getMapSize() {
	return Math.round($("#outer-map").width()) == map.widthL ? "L": "S";
}
function isGamePage() {
	return /game.php\?game=[0-9]*/.test(window.location.href);
}

// this function is run ONCE on initial INIT of the script.
function gm_ConquerClubGame() {
	cc_log("Starting");
	var styles = '.vnav ul li a {color:#000000; background-color: #CCDDCC; padding-right: 1px;}.vnav ul ul li a {background-color:#77AA77}\
.swapavatars#page-body dl.postprofile {float:left;border-left:0px solid;border-right:1px solid #FFF;}\
.swapavatars#page-body div.postbody {float:right}\
.swapavatars#page-body div.online {background-position:100% 17pt}';
	// ---- Check for Required Components ----
	//If we cannot find any of the following then we're not in a game.
	if(!isGamePage()) {
		if ($('#middleColumn').exists()) { // check center exists - this may be a page within a page.
			if ($('#leftColumn ul').exists()) { // check ul exists - user may not be logged in.
				createSiteWideMenu();
				performSiteWideAlterations();
				GM_addStyle(styles);
			}
		}
		stopWaiting();
		return;
	}
	// GAME BOB
	if (myOptions.autobob=="Off" && !forceInit) {
		addStartBOB();
		return;
	}
	customStartWaiting("Initializing BOB");
	//-------------------------------------------------------------------------
	// INIT
	//-------------------------------------------------------------------------

	cc_log("Building the Settings Menu");
	// ID THE MAP
	map = getMap();
	mapName = map.title;
	mapSize = getMapSize();
		
	createGameMenu();
	prepareMenuHider(true);
	adjustClock();

	// ---- Create Divisions ----
	var statsWrapper = $("<div id='statsWrapper'><span style='float:right;margin-right:20px'>[<a id='hideEliminated'>Hide eliminated players</a>]</span><H3>Statistics</H3></div>");
	statsWrapper.hide();

	statsWrapper.append($('<div id="statsTable"></div>'));
	$('#log').prev().before(statsWrapper);

	// Create text map
	var textMapWrapper = $('<div id="textMapWrapper"><span style="float:right;margin-right:20px">[<a id="showMoreLink">scrollable text map</a>]</span><H3>Text Map</H3></div').hide();

	var textMap = $('<div id="textMap"></div>');

	textMapWrapper.append(textMap);
	$('#log').prev().before(textMapWrapper);
	$('#showMoreLink').click(showMoreTextMap);

	$('<div id="mapinspect"></div>').insertAfter(dashboard);

	if (gameSettings.spoils == eBonusCards["FLAT RATE"]) {
		$('<div id="redemption"></div>').css("backgroundColor","#EEEEEE").html("<span><font color=red><b>Red:</b></font> 4 <font color=green><b>Green:</b></font> 6 <font color=blue><b>Blue:</b></font> 8 <b>Mixed:</b> 10</span>").insertAfter(dashboard);
	}
	showSnapshots();

	var termWrapper = $('<div id="termWrapper"></div>').insertAfter('#full-log');
	if (gameSettings.type == eGameType.TERMINATOR) {
		termWrapper.html("<h3>Terminator Points Summary</h3>");
	} else {
		termWrapper.html("<h3>Elimination Summary</h3>");
	}

	var contOverviewWrapper = $('<div id="contOverviewWrapper"><H4>Continents Overview</H4></div>').hide().append('<div id="contOverview"></div>').appendTo(rightside);

	if (myOptions.floatActions == "On") {
		var actionForm = $('#action-form');
		if (actionForm.exists()) {
			actionForm.css({
				position:'fixed',
				bottom:0,
				zIndex:14
			});
			var wrapperDiv = $('<div id="actionWrapper"></div>');
			if ($('#from_country').exists()) {
				wrapperDiv.css('paddingTop',"22px");
			} else {
				wrapperDiv.css('paddingTop',"5px");
			}
			wrapperDiv.append($('#mapinspect'))
					.append($('#cards').parent().parent().css('backgroundColor',"#EEEEEE"))
           			.append($('#polyplayer0').parent().parent().css('backgroundColor',"#EEEEEE"))
					.appendTo(actionForm.find('fieldset'));
			setFormWidth();
		}
		$('#rolls').css({
			position:'fixed',
			backgroundColor:"#EEEEEE",
			top:0,
			zIndex:14
		});
	}

	styles += '#outer-map {position:relative;}\
#inner-map img {position:absolute;}\
.attackhovers {vertical-align:middle;padding-top:1px;padding-bottom:1px;}\
#summary {height:150px;overflow:auto;background-color:#eee;margin:10px 0 0 0;}\
#magicmap div {height:18px;position:absolute;z-index:3;}\
#inner-map .army_circle {z-index:10}\
#inner-map div.army_circle_shadow {z-index:2}\
div.h {opacity:1.0;padding-left:4px;padding-right:4px;border-top:thick solid ;border-bottom:thick solid;}\
div.i {opacity:0.7;border:thick solid;}\
div.j {opacity:1.0;border:thick solid;}\
div.off {opacity:0.0;border:medium dotted #FFF;}\
div.typeborder {opacity:1.0;padding-left:4px;padding-right:4px;border-top:thick solid;border-bottom:thick solid;}\
div.typeattack {opacity:1.0;padding-right:4px;border-left:thick solid;border-top:thick solid;border-bottom:thick solid;}\
div.typedefend {opacity:1.0;padding-left:4px;border-right:thick solid;border-top:thick solid;border-bottom:thick solid;}\
div.typebombards {opacity:1.0;padding-bottom:4px;border-left:thick solid;border-top:thick solid;border-right:thick solid;}\
div.typebombarded {opacity:1.0;padding-top:4px;border-left:thick solid;border-right:thick solid;border-bottom:thick solid;}\
div.typemutualbombard {opacity:1.0;padding-top:4px;padding-bottom:4px;border-left:thick solid;border-right:thick solid;}\
#statsTable tbody td {white-space: nowrap;}\
tr.eliminated td, tr.eliminated td span {text-decoration: line-through}\
table.listing th {vertical-align:middle; font-weight:normal}\
.hide {display:none}\
#pleaseWaitImage {padding-right: 2px;vertical-align:middle;}\
#statsTable {margin:10px 0 0 0;}\
#statsTable table {width:100%;border:1px solid #FFF;background-color:#eee;}\
#statsTable tbody tr:nth-child(2n) {background-color:#e6e6e6}\
#statsTable thead tr {font-weight: normal;}\
#statsTable thead th:first-letter {font-weight: bold;}\
#statsTable tfoot tr {font-weight:bold;}\
#statsTable tbody tr.team {border-top:1px solid #ccc;border-bottom:1px solid #ccc}\
#statsTable tbody span {float:left;padding-right:5px;}\
#statsTable tfoot tr {border-top:3px double #ccc}\
#mapinspect {background-color:#EEE;clear:right}\
#textMap {background-color:#EEE;margin:10px 0 0 0;}\
#termWrapper {margin:10px 0 0 0;}\
#inner-map {zIndex:2;position:absolute;}\
#contOverview {max-height: 250px; overflow-y: auto; overflow-x: hidden;}\
#contOverviewWrapper span{white-space: no-wrap; display:inline-block; padding-right:5px;}\
#popupBackground {position:absolute;height:100%;width:100%;display:none;opacity:0.5;background-color:#000;z-index:98;top:0;left:0;}\
#popup {background-color:#FFF;opacity:1;position:absolute;top:20%;left:30%;z-index:99,padding:10px;vertical-align:middle;border:1px solid black;}';

	for (var i = 0; i < playerColors.length; i++) {
		styles += '#magicmap .player'+i+' {border-color:' + playerColors[i].normal + ';}\
.pColor'+i+' {color:' + playerColors[i].log + (i===0?'':';font-weight: bold') +'}\
.itemBg'+i+' {background-color:' + (i===0?playerColors[0].normal:playerColors[i].log) + ';}';
	}
	// ---- Get Player Names ----
	cc_log("Player IDs");
	allPlayers.push(new Player(NID, "Neutral"));

	pIndxs = $('#players span[class*=player]');
	for(i = 0; i < pIndxs.length; i++) {
		var name = pIndxs.eq(i).contents().eq(1).text();
		if (name) {
			allPlayers.push(new Player(++num_players, name));
		}
		if (i > playerColors.length) { // create styles for this player. (BR Coding!)
			var num = i + 1;
			var color = $('#player_' + num).css("color");
			styles += ' #magicmap .player'+num+' { border-color:' + color + ';} ' +
			' .pColor'+num+' { color: ' + color + ';font-weight: bold} ' +
			' .itemBg'+num+' { background-color: ' + color + '; } ';
		}
	}
	GM_addStyle(styles);
	updatePlayerCards();
	updateSideStats();
	moveChatToTop();
	$('#inner-map').after('<div id="magicmap">');
	showMapInspectDiv();

	if (gameSettings.fog) { // create extra player for Unknown territories.
		UID = allPlayers.length;
		allPlayers.push(new Player(UID, 'Unknown'));
	}
	expandMap();

	/* Ishiro's Confirm Commands code */
	var newsendRequest = unsafeWindow.sendRequest;
	unsafeWindow.sendRequest = function(command) {
		/* --- Confirmation Popups --- */
		if (((command == 'End Assaults' || command == 'End Reinforcement' || (command == 'Reinforce' && gameSettings.fortifications != eFortifications.UNLIMITED)) && myOptions.confirmEnds) || (command == 'Auto-Assault' && myOptions.confirmAutoAttack) || (command == 'Deploy' && myOptions.confirmDeploy)) {
			var message = "Are you sure you wish to " + command + "?";
			if (command == "Reinforce") {
				message = "Only one reinforcement possible, are you sure?";
			}
			if (confirm(message)) {
				return newsendRequest(command);
			} else {
				return false;
			}
		} else {
			return newsendRequest(command);
		}
	};
	$('body').bind('CCGameRefresh', updateBOB);

	//Auto Scroll to Game
	if( myOptions.jumptomap ) {
		window.setTimeout(jtm,1000);
	}

	processLog(0, true, true);
	// ---- Map Analysis ----
	cc_log("Map Analysis");
	armies = getArmies();
	analyseMap();
	checkElimSummary();
	updateCountries();
	updateContinents();
	updateObjectives();
	updateTextMap();
	
	updateStats();
	updateMagicMap(false);
	colourCodeDD();
	if (myOptions.floatActions == "On") {
		setFormWidth();
	}
	if (showDeleteAll) {
		showDeleteSnapshots();
	}
	stopWaiting();
	cc_log("Done after request");
	updateMenuHiderHeight();
	checkForUpdate();
}

function expandMap() {
	var i,j,country, attackedCountry, continent;
	allCountries = map.countries;
	allContinents = map.continents;
	allObjectives = map.objectives;
	if (!allObjectives) { // in case this ever becomes acceptable.
		allObjectives = [];
	}
	// adjust minimum reinforcements - default is 3.
	if (!map.min_reinforcement) {
		map.min_reinforcement = 3;
	}
	for (i = 0; i < allCountries.length; i++) {
		country = allCountries[i];
		country.attackedBy = [];
		country.bombardedBy = [];
	}
	for (i = 0; i < allCountries.length; i++) {
		country = allCountries[i];
		for (j = 0; j < country.borders.length; j++) {
			attackedCountry = allCountries[country.borders[j]];
			attackedCountry.attackedBy.push(i);
		}
		for (j = 0; j < country.bombardments.length; j++) {
			attackedCountry = allCountries[country.bombardments[j]];
			attackedCountry.bombardedBy.push(i);
		}
	}
	for (i = 0; i < allCountries.length; i++) {
		country = allCountries[i];
		country.attacks = Array.removeAll(country.borders, country.attackedBy);
		country.borders = Array.intersect(country.borders, country.attackedBy);
		country.attackedBy = Array.removeAll(country.attackedBy, country.borders);
		country.bombards = Array.removeAll(country.bombardments, country.bombardedBy);
		country.bombardments = Array.intersect(country.bombardments, country.bombardedBy);
		country.bombardedBy = Array.removeAll(country.bombardedBy, country.bombardments);
	}
	for (i = 0; i < allContinents.length; i++) {
		continent = allContinents[i];
		if (continent.required == 0) {
			continent.required = continent.territories.length + continent.subcontinents.length;
		}
	}
}
function updateBOB(fromSnapshot) {
	if (myOptions.autobob=="Off" && !forceInit) {
		addStartBOB();
		return;
	}
	if (fromSnapshot !== true && currentSnapshot != -1) {
		var option = $("#menu_snapshot_"+currentSnapshot.id);
		option.html(option.find("b").html());
		currentSnapshot = -1;
		$('#snapshotState').text("Live");
	}
	chatToSnap();
	armies = getArmies();
	updatePlayerCards();
	mapSize = getMapSize();
	processLog(logFixed, false, false);
	if (myOptions.floatActions == "On") { // only change the form width if HUD is on.
		setFormWidth();
	}
	checkFloatDice();
	checkElimSummary();
	
	analyseMap(); // reread the armies array back into the players array
	updateCountries();
	updateContinents();
	updateObjectives();

	updateTextMap();
	updateStats();
	updateMagicMap(false);

	colourCodeDD();
	updateMenuHiderHeight();
	stopWaiting();
}
// Run init on first load.
gm_ConquerClubGame();