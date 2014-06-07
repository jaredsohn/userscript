// Conquer Club - Card Counter, Card Redemption Value, Status Indicator
var versionString = "5.2.3.1";
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
// @name          Custom Bob
// @version       5.2.3.1
// @namespace     http://yeti_c.co.uk/conquerClubchapedit
// @description   Adds Stats, card counter, redemption value, text based map, map inspection tools
// @include       http*://*conquerclub.com*
// @match         *://*.conquerclub.com/*
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

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(namespace + name, value);
	};
	unsafeWindow = window;
}
/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);

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
	ASSASSIN:5
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
		var ret = "", index, continent, country
		for (index = 0; index < this.continents.length; index++) {
			continent = allContinents[this.continents[index]];
			ret += fillTemplate(continentTemplate, {
				name: continent.name,
				bonus: "(" + continent.bonus + ")",
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
		if (!continent.overriden[i]) {
			result += fillTemplate(continentTemplate, {
				clazz: "continent pColor" + continent.owners[i],
				title: continent.name,
				name: continent.name,
				bonus: '('+continent.bonus+')',
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
	if (gameSettings.spoils != eBonusCards.NOCARDS) {
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
	var actionForm = $('#action-form'), outerRolls = $('#rolls'), cards = $('#cards'), mapInspect = $('#mapinspect');
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
	this.href = "http://userscripts.org/scripts/source/115260.user.js";
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
	} else if (gameSettings.spoils == eBonusCards.FLATRATE) {
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
	if (gameSettings.type == eGameType.DOUBLES) {
		return Math.ceil(pid/2);
	} else if (gameSettings.type == eGameType.TRIPLES) {
		return Math.ceil(pid/3);
	} else if (gameSettings.type == eGameType.QUADRUPLES) {
		return Math.ceil(pid/4);
	}
	return pid;
}

function isTeamGame() {
	return gameSettings.type == eGameType.DOUBLES || gameSettings.type == eGameType.TRIPLES || gameSettings.type == eGameType.QUADRUPLES;
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
		if (playerNumbers[0] == "0") continue;
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
		} else if( line.has(str_eliminated) ) {
			player.skipped = 0;
			if (playerNumbers.length > 1 && playerNumbers[1] != "0") { 
				allPlayers[playerNumbers[1]].eliminatedInRound = rounds;	
			}
			TerminatorSummary += line + " in round - "+rounds+"<br/>";
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
                    player:"Team " + index/gameSettings.type,
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
function isLastOfTeam(index) {
	return isTeamGame() && index != 0 && (index % gameSettings.type == 0);
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
				pids[continent.owners[j]]++;
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

// a three phase function.
// First loop through all the continents to see if who they are owned by.
// Next loop through all the continents to see if any should be overriden.
// Once we've decided whether or not a continent is overriden - then we can assign it to the player.
function updateContinents() {
	// roll through all the continents and assign ownership to each continent.
	var i, index, continent, owner, pids;
	for (index = 0; index < allContinents.length; index++) {
		continent = allContinents[index];
		continent.owners = [];
		continent.overriden = [];

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
				pids[subcontinent.owners[j]]++;
			}
		}
		var leng = pids.length;
		if (gameSettings.fog) {
			leng--;
		}
		for (i=1;i<leng;i++) { // 1 to start to avoid Neutral player
			if (pids[i]>=continent.required) {
				continent.owners.push(i);
				continent.overriden.push(false);
			}
		}
	}

	// now we have all the owners we need to loop back through and work out if any continents need to override.
	for (index = 0; index <allContinents.length; index++) {
		continent = allContinents[index];
		// if this continent is owned by anyone then we need to see if it's overriden.
		if (continent.owners.length > 0) {
			for (i = 0; i <allContinents.length; i++) {
				var continent2 = allContinents[i];
				// don't compare the same continents.
				if (continent!=continent2) {
					// loop through overrides for this continent.
					for (var over = 0; over < continent2.overrides.length;over++) {
						// found a match.
						if (continent2.overrides[over]==index) {
							for (owner = 0; owner < continent.owners.length; owner++) {
								for (var owner2 = 0; owner2 < continent2.owners.length; owner2++) {
									if (continent.owners[owner]==continent2.owners[owner2]) {
										continent.overriden[owner]=true;
									}
								}
							}
						}
					}
				}
			}
		}
		// now we've established ownership and overriden ness we then need to assign the bonuses and owner ship to the players.
		for (owner = 0; owner < continent.owners.length; owner++) {
			var player = allPlayers[continent.owners[owner]];
			if (!continent.overriden[owner]) {
				player.continents.push(index);
				player.continentBonus += continent.bonus;
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
					toReturn += '<span class="pColor' + subcontinent.owners[index] + '"><span class="continent" title="' + continent.subcontinents[i] + ".) " + subcontinent.name + '">' + subcontinent.name +' ('+subcontinent.bonus+')</span></span>';
				} else {
					var txtMapSmallContOwner = 'class="pColor' + subcontinent.owners[index] +'"';
					txtMapSmallHtml2 += '<span ' + txtMapSmallContOwner + '><span class="continent" title="' + continent.subcontinents[i] + ".) " + subcontinent.name + '">' + subcontinent.name + ' ('+subcontinent.bonus+')</span></span>&nbsp;';
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
			if (!continent.overriden[index]) {
				if (extended) {
					toReturn += '<br><span class="pColor' + index + '"> BONUS for ' + allPlayers[continent.owners[index]].name + ' : ' + continent.bonus + ' </span>';
				} else {
					txtMapSmallOwner = 'class="pColor' + continent.owners[index] +'"';
					toReturn += '<tr><td><span ' + txtMapSmallOwner + '><b><span class="continent" title="' + continentName + ".) " + continent.name + '">' + continent.name + ' (' + continent.bonus + ')</span></b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
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
			toAdd.each(function() {
				$(this).hover(handler(playerNumber, gameSettings.type), onMouseOutHover);
				playerNumber+=gameSettings.type;
			});
			// and once for the player list
			toAdd = $("#players li").not('[class*=status]'); // team
			playerNumber = 1;
			toAdd.each(function() {
				$(this).hover(handler(playerNumber, gameSettings.type), onMouseOutHover);
				playerNumber+=gameSettings.type;
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
	var colorArray = "nrgbypcosadefhijklmqtuvwxyz",colourCode = isColourCodeOn(),i,country, quantity, base;
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
		base = $("#country" + i).css("color", col0[country.pid == UID?0:country.pid]);
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
			$('#dashboard tr:first').after("<tr><td id='snapshots' colspan=2></td></tr>");
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
			options[dt.html()] = dt.next().html();
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
var col0 = ["#FFFFFF", // Neutral
"#FF0000", // Red
"#009A04", // Blue
"#0000FF", // Green
"#FFFF00", // Yellow
"#FF00FF", // Magenta/Pink
"#00FFFF", // Cyan (bright)
"#FF9922", // Gray
"#7F7F7F" // Orange
];
//Log
var col1 = ["#000000", // Neutral has always been black in the logs
"#FF0000", "#009A04", "#0000FF", "#CCCC00", "#FF00FF", "#00CCCC", // Cyan (Muted)
"#FF9922", "#7F7F7F"];

function getMap() {
	var json = /map = (.+);/.exec($("#middleColumn script:first").html())[1];
	return JSON.parse(json);
}
function getArmies() {
	var json = $('#armies').html();
	if (json.length == 0) {
		json = /armies = (.+);/.exec($("#middleColumn script:first").html())[1];
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

	if (gameSettings.spoils == eBonusCards.FLATRATE) {
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
				wrapperDiv.css('paddingTop',"0px");
			}
			wrapperDiv.append($('#mapinspect'))
					.append($('#cards').parent().parent().css('backgroundColor',"#EEEEEE"))
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

	for (var i = 0; i < 9; i++) {
		styles += '#magicmap .player'+i+' {border-color:' + col0[i] + ';}\
.pColor'+i+' {color:' + col1[i] + (i===0?'':';font-weight: bold') +'}\
.itemBg'+i+' {background-color:' + (i===0?col0[i]:col1[i]) + ';}';
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
		if (i>7) { // create styles for this player. (BR Coding!)
			var num = i+1;
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

/*****************************************************Forum Share**********************************************************/
function initSnapToForum() {
	if(isGamePage()) {
		$("<form action=\"http://www.conquerclub.com/forum/posting.php\" method=\"post\" id=\"snapToForumForm\" name=\"snapToForumForm\" style=\"display:inline-block\"></form>").insertAfter("#snapToChat");
		$("#snapToForumForm").append($("<input type=\"hidden\" value=\"reply\" name=\"mode\">"));
		$("#snapToForumForm").append($("<input type=\"hidden\" value=\"692\" name=\"f\">"));
		$("#snapToForumForm").append($("<input type=\"hidden\" value=\"171162\" name=\"t\">"));
		$("#snapToForumForm").append($("<input type=\"hidden\" value=\"Help\" name=\"subject\">"));
		$("#snapToForumForm").append($("<input type=\"hidden\" value=\"test\" name=\"message\" id=\"snapToForumMessage\">"));
		$("#snapToForumForm").append($("<input type=\"submit\" value=\"send snapshot to forum\" name=\"post\" id=\"snapToForumSubmit\">"));
		$("#snapToForumForm").submit(function(){
			updateSnapMessage();
		});
		loadFromUrl();
	}
}
function updateSnapMessage() {
	var text = getRounds() + "~" + positionsToForum();
	var url = window.top.location + "&snap=" + text;
	var msg = "[url=" + url + "]Game " + $("#game2").val() + "[/url]";
	$("#snapToForumMessage").val(msg);
}
function loadFromUrl() {
	if (getParameter("snap")) {
		
		var base = getParameter("snap").split("~");
		var round = base[base.length - 2];
		var armies = base[base.length - 1];

		var toDraw = encoding.chatlineToPositions(armies);
		if (toDraw.length != allCountries.length) {
			alert("wrong format for snapshot.");
			return;
		}
		currentSnapshot = {
			data:toDraw,
			id:-1
		};
		$('#snapshotState').text("From url. Round " + round + ".");
		redrawArmies(toDraw);
	}
}
function getParameter ( parameterName ) {
    queryString = window.top.location.search.substring(1);
   // Add "=" to the parameter name (i.e. parameterName=value)
   var parameterName = parameterName + "=";
   if ( queryString.length > 0 ) {
      // Find the beginning of the string
      begin = queryString.indexOf ( parameterName );
      // If the parameter name is not found, skip it, otherwise return the value
      if ( begin != -1 ) {
         // Add the length (integer) to the beginning
         begin += parameterName.length;
         // Multiple parameters are separated by the "&" sign
         end = queryString.indexOf ( "&" , begin );
      if ( end == -1 ) {
         end = queryString.length
      }
      // Return the string
      return unescape ( queryString.substring ( begin, end ) );
   }
   // Return "null" if no parameter has been found
   return null;
   }
}
function positionsToForum() {
	var toReturn = "", i;
 	for (i = 0; i < allCountries.length; i++) {
 		var country = allCountries[i];
		if (country.quantity == -1) {
			toReturn += "?";
		} else {
			toReturn += switchToBase26(country.quantity, true);
			toReturn += switchToBase26(country.pid, false);
 		}
 	}
	return toReturn;
 }
function switchToBase26(number, upperCase) {
	var result="";
	while (number > 0 || result.length == 0) {
		result = String.fromCharCode((upperCase?65:97) + number%26) + result;
		number = Math.floor(number/26);
 	}
 	return result;
 }
initSnapToForum();
/*****************************************************End Forum Share**********************************************************/