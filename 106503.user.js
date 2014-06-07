// ==UserScript==
// @name          google plus reply+
// @namespace     gpr
// @description	  Adds reply and reply-to-author buttons to Google+ comments
// @auther        http://mesak.wablog.info
// @install       http://userscripts.org/scripts/show/106503
// @include       https://plus.google.com/*
// @exclude       https://plus.google.com/_/apps-static/*
// @icon          https://sites.google.com/a/wablog.info/mesak-project/documents/gpr/g-plus-reply.gif
// @version       1.49
// ==/UserScript==
var version = '1.49';
var debug = true;
var install = 'http://userscripts.org/scripts/show/106503';
//var $=jQuery=(function(window){
/*!
 * jQuery JavaScript Library v1.6.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Jun 30 14:16:56 2011 -0400
 */
 
(function(a,b){function cv(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cs(a){if(!cg[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ch||(ch=c.createElement("iframe"),ch.frameBorder=ch.width=ch.height=0),b.appendChild(ch);if(!ci||!ch.createElement)ci=(ch.contentWindow||ch.contentDocument).document,ci.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),ci.close();d=ci.createElement(a),ci.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ch)}cg[a]=e}return cg[a]}function cr(a,b){var c={};f.each(cm.concat.apply([],cm.slice(0,b)),function(){c[this]=a});return c}function cq(){cn=b}function cp(){setTimeout(cq,0);return cn=f.now()}function cf(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ce(){try{return new a.XMLHttpRequest}catch(b){}}function b$(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bZ(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bY(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bC.test(a)?d(a,e):bY(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)bY(a+"["+e+"]",b[e],c,d);else d(a,b)}function bX(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bR,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bX(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bX(a,c,d,e,"*",g));return l}function bW(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bN),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bA(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bv:bw;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bx(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),
c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function bm(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(be,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bl(a){f.nodeName(a,"input")?bk(a):"getElementsByTagName"in a&&f.grep(a.getElementsByTagName("input"),bk)}function bk(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bj(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bi(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bh(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bg(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function W(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(R.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function V(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function N(a,b){return(a&&a!=="*"?a+".":"")+b.replace(z,"`").replace(A,"&")}function M(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(x,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);
if(a.isImmediatePropagationStopped())break}}return b}}function K(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function E(){return!0}function D(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"$1-$2").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z])/ig,x=function(a,b){return b.toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},
each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!A){A=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a);return c===b||D.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(b,c,d){a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),d=c.documentElement,(!d||!d.nodeName||d.nodeName==="parsererror")&&e.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},
each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(H)return H.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},
resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g](h)}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.firstChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),
p={visibility:"hidden",width:0,height:0,border:0,margin:0},m&&f.extend(p,{position:"absolute",left:-1e3,top:-1e3});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0),o.innerHTML="",n.removeChild(o);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([a-z])([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g=f.expando,h=typeof c=="string",i,j=a.nodeType,k=j?f.cache:a,l=j?a[f.expando]:a[f.expando]&&f.expando;if((!l||e&&l&&!k[l][g])&&h&&d===b)return;l||(j?a[f.expando]=l=++f.uuid:l=f.expando),k[l]||(k[l]={},j||(k[l].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?k[l][g]=f.extend(k[l][g],c):k[l]=f.extend(k[l],c);i=k[l],e&&(i[g]||(i[g]={}),i=i[g]),d!==b&&(i[f.camelCase(c)]=d);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[f.camelCase(c)]||i[c]:i}},removeData:function(b,c,d){if(!!f.acceptData(b)){var e=f.expando,g=b.nodeType,h=g?f.cache:b,i=g?b[f.expando]:f.expando;if(!h[i])return;if(c){var j=d?h[i][e]:h[i];if(j){delete j[c];if(!l(j))return}}if(d){delete h[i][e];if(!l(h[i]))return}var k=h[i][e];f.support.deleteExpando||h!=a?delete h[i]:h[i]=null,k?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=k):g&&(f.support.deleteExpando?delete b[f.expando]:b.removeAttribute?b.removeAttribute(f.expando):b[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";
if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u=/\:|^on/,v,w;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(o);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(o);for(d=0,e=this.length;d<e;d++){g=this[d];
if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(n," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;d=e.value;return typeof d=="string"?d.replace(p,""):d==null?"":d}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);j&&(c=f.attrFix[c]||c,i=f.attrHooks[c],i||(t.test(c)?i=w:v&&c!=="className"&&(f.nodeName(a,"form")||u.test(c))&&(i=v)));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j&&(h=i.get(a,c))!==null)return h;h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.support.getSetAttribute?a.removeAttribute(b):(f.attr(a,b,""),a.removeAttributeNode(a.getAttributeNode(b))),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){
var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},tabIndex:{get:function(a){var c=a.getAttributeNode("tabIndex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}},value:{get:function(a,b){if(v&&f.nodeName(a,"button"))return v.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(v&&f.nodeName(a,"button"))return v.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);i&&(c=f.propFix[c]||c,h=f.propHooks[c]);return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==b?g:a[c]},propHooks:{}}),w={get:function(a,c){return f.prop(a,c)?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},f.support.getSetAttribute||(f.attrFix=f.propFix,v=f.attrHooks.name=f.attrHooks.title=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,c){var d=a.getAttributeNode(c);if(d){d.nodeValue=b;return b}}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var x=/\.(.*)$/,y=/^(?:textarea|input|select)$/i,z=/\./g,A=/ /g,B=/[^\w\s.|`]/g,C=function(a){return a.replace(B,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=D;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){
o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=D);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),C).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d!=null?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},
props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,N(a.origType,a.selector),f.extend({},a,{handler:M,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,N(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?E:D):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=E;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=E;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=E,this.stopPropagation()},isDefaultPrevented:D,isPropagationStopped:D,isImmediatePropagationStopped:D};var F=function(a){var b=a.relatedTarget,c=!1,d=a.type;a.type=a.data,b!==this&&(b&&(c=f.contains(this,b)),c||(f.event.handle.apply(this,arguments),a.type=d))},G=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?G:F,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?G:F)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",
function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&f(b).closest("form").length&&K("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&K("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var H,I=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},J=function(c){var d=c.target,e,g;if(!!y.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=I(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:J,beforedeactivate:J,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&J.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&J.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",I(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in H)f.event.add(this,c+".specialChange",H[c]);return y.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return y.test(this.nodeName)}},H=f.event.special.change.filters,H.focus=H.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){
var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var L={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||D,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=x.exec(h),k="",j&&(k=j[0],h=h.replace(x,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,L[h]?(a.push(L[h]+k),h=h+k):h=(L[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+N(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+N(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);
if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},
find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},
odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},
function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){
return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var O=/Until$/,P=/^(?:parents|prevUntil|prevAll)/,Q=/,/,R=/^.[^:#\[\.,]*$/,S=Array.prototype.slice,T=f.expr.match.POS,U={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(W(this,a,!1),"not",a)},filter:function(a){return this.pushStack(W(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=T.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=T.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a=="string")return f.inArray(this[0],a?f(a):this.parent().children());return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(V(c[0])||V(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){
return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=S.call(arguments);O.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!U[a]?f.unique(e):e,(this.length>1||Q.test(d))&&P.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var X=/ jQuery\d+="(?:\d+|null)"/g,Y=/^\s+/,Z=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,$=/<([\w:]+)/,_=/<tbody/i,ba=/<|&#?\w+;/,bb=/<(?:script|object|embed|option|style)/i,bc=/checked\s*(?:[^=]|=\s*.checked.)/i,bd=/\/(java|ecma)script/i,be=/^\s*<!(?:\[CDATA\[|\-\-)/,bf={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};bf.optgroup=bf.option,bf.tbody=bf.tfoot=bf.colgroup=bf.caption=bf.thead,bf.th=bf.td,f.support.htmlSerialize||(bf._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(X,""):null;if(typeof a=="string"&&!bb.test(a)&&(f.support.leadingWhitespace||!Y.test(a))&&!bf[($.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Z,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bc.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bg(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bm)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i;b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!bb.test(a[0])&&(f.support.checkClone||!bc.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j
)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bi(a,d),e=bj(a),g=bj(d);for(h=0;e[h];++h)bi(e[h],g[h])}if(b){bh(a,d);if(c){e=bj(a),g=bj(d);for(h=0;e[h];++h)bh(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!ba.test(k))k=b.createTextNode(k);else{k=k.replace(Z,"<$1></$2>");var l=($.exec(k)||["",""])[1].toLowerCase(),m=bf[l]||bf._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=_.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&Y.test(k)&&o.insertBefore(b.createTextNode(Y.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bl(k[i]);else bl(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bd.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bn=/alpha\([^)]*\)/i,bo=/opacity=([^)]*)/,bp=/([A-Z]|^ms)/g,bq=/^-?\d+(?:px)?$/i,br=/^-?\d/,bs=/^[+\-]=/,bt=/[^+\-\.\de]+/g,bu={position:"absolute",visibility:"hidden",display:"block"},bv=["Left","Right"],bw=["Top","Bottom"],bx,by,bz;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bx(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d;if(h==="number"&&isNaN(d)||d==null)return;h==="string"&&bs.test(d)&&(d=+d.replace(bt,"")+parseFloat(f.css(a,c)),h="number"),h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bx)return bx(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bA(a,b,d);f.swap(a,bu,function(){e=bA(a,b,d)});return e}},set:function(a,b){if(!bq.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bo.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle;c.zoom=1;var e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.filter=bn.test(g)?g.replace(bn,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bx(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(by=function(a,c){var d,e,g;c=c.replace(bp,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bz=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bq.test(d)&&br.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bx=by||bz,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bB=/%20/g,bC=/\[\]$/,bD=/\r?\n/g,bE=/#.*$/,bF=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bG=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bH=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,bI=/^(?:GET|HEAD)$/,bJ=/^\/\//,bK=/\?/,bL=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bM=/^(?:select|textarea)/i,bN=/\s+/,bO=/([?&])_=[^&]*/,bP=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bQ=f.fn.load,bR={},bS={},bT,bU;try{bT=e.href}catch(bV){bT=c.createElement("a"),bT.href="",bT=bT.href}bU=bP.exec(bT.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bQ)return bQ.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bL,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bM.test(this.nodeName)||bG.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bD,"\r\n")}}):{name:b.name,value:c.replace(bD,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?f.extend(!0,a,f.ajaxSettings,b):(b=a,a=f.extend(!0,f.ajaxSettings,b));for(var c in{context:1,url:1})c in b?a[c]=b[c]:c in f.ajaxSettings&&(a[c]=f.ajaxSettings[c]);return a},ajaxSettings:{url:bT,isLocal:bH.test(bU[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML}},ajaxPrefilter:bW(bR),ajaxTransport:bW(bS),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a?4:0;var o,r,u,w=l?bZ(d,v,l):b,x,y;if(a>=200&&a<300||a===304){if(d.ifModified){if(x=v.getResponseHeader("Last-Modified"))f.lastModified[k]=x;if(y=v.getResponseHeader("Etag"))f.etag[k]=y}if(a===304)c="notmodified",o=!0;else try{r=b$(d,w),c="success",o=!0}catch(z){c="parsererror",u=z}}else{u=c;if(!c||a)c="error",a<0&&(a=0)}v.status=a,v.statusText=c,o?h.resolveWith(e,[r,c,v]):h.rejectWith(e,[v,c,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,c]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bF.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bE,"").replace(bJ,bU[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bN),d.crossDomain==null&&(r=bP.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bU[1]&&r[2]==bU[2]&&(r[3]||(r[1]==="http:"?80:443))==(bU[3]||(bU[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bX(bR,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bI.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bK.test(d.url)?"&":"?")+d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bO,"$1_="+x);d.url=y+(y===d.url?(bK.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", */*; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bX(bS,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){status<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)bY(g,a[g],c,e);return d.join("&").replace(bB,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var b_=f.now(),ca=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+b_++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ca.test(b.url)||e&&ca.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ca,l),b.url===j&&(e&&(k=k.replace(ca,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cb=a.ActiveXObject?function(){for(var a in cd)cd[a](0,1)}:!1,cc=0,cd;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ce()||cf()}:ce,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cb&&delete cd[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cc,cb&&(cd||(cd={},f(a).unload(cb)),cd[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cg={},ch,ci,cj=/^(?:toggle|show|hide)$/,ck=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cl,cm=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cn,co=a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cr("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cs(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cr("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cr("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cs(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cj.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=ck.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cr("show",1),slideUp:cr("hide",1),slideToggle:cr("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function h(a){return d.step(a)}var d=this,e=f.fx,g;this.startTime=cn||cp(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,h.elem=this.elem,h()&&f.timers.push(h)&&!cl&&(co?(cl=!0,g=function(){cl&&(co(g),e.tick())},co(g)):cl=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cn||cp(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cl),cl=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var ct=/^t(?:able|d|h)$/i,cu=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cv(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!ct.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cu.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cu.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cv(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cv(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a&&a.style?parseFloat(f.css(a,d,"padding")):null},f.fn["outer"+c]=function(a){var b=this[0];return b&&b.style?parseFloat(f.css(b,d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c];return e.document.compatMode==="CSS1Compat"&&g||e.document.body["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var h=f.css(e,d),i=parseFloat(h);return f.isNaN(i)?h:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f
})(window);
//return window.$.noConflict(true)})(unsafeWindow);
$.type = function(o) {var _toS = Object.prototype.toString;var _types = {'undefined': 'undefined','number': 'number','boolean': 'boolean','string': 'string','[object Function]': 'function','[object RegExp]': 'regexp','[object Array]': 'array','[object Date]': 'date','[object Error]': 'error'};return _types[typeof o] || _types[_toS.call(o)] || (o ? 'object' : 'null');};
var $specialChars = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' };
var $replaceChars = function(chr) {return $specialChars[chr] || '\\u00' + Math.floor(chr.charCodeAt() / 16).toString(16) + (chr.charCodeAt() % 16).toString(16);};
$.toJSON = function(o) {var s = [];
	switch ($.type(o)){
	case 'undefined':return 'undefined';break;
	case 'null':return 'null';break;
	case 'number':
	case 'boolean':
	case 'date':
	case 'function':return o.toString();break;
	case 'string':return '"' + o.replace(/[\x00-\x1f\\"]/g, $replaceChars) + '"';break;
	case 'array':for (var i=0,l=o.length;i<l;i++) {s.push($.toJSON(o[i]));}return '[' + s.join(',') + ']';break;
	case 'error':
	case 'object':for (var p in o) {
		s.push('"'+ p +'"' + ':' + $.toJSON(o[p]));}
		return '{' + s.join(',') + '}';
	break;
	default:return '';break;}
};
var storage = 'none';
try {if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function' && $.browser.mozilla ) { storage = 'greasemonkey';}} catch (x) {}
if (storage == 'none' && typeof localStorage == 'object') { storage = 'localstorage';}
function page_check(siteurl){if( window.location.href.indexOf(siteurl) != -1){return true;}else{return false;}}
function delValue(key){	switch (storage) {case 'greasemonkey':GM_deleteValue('gpr_'+key);break;	case 'localstorage':delete localStorage['gpr_'+key];break;}}
function setValue(key, value) {switch (storage) {case 'greasemonkey':GM_setValue('gpr_'+key, value);break;case 'localstorage':localStorage['gpr_'+key] = value;break;}}
function getValue(key, value) {switch (storage) {case 'greasemonkey':return GM_getValue('gpr_'+key, value);case 'localstorage':var val = localStorage['gpr_'+key];	if (val=='true') { return true; }else if (val=='false') { return false; }else if (val) { return val; }break;}return value;}
function $ById(id,root){return root ? root.getElementById(id) : document.getElementById(id);}
var IMG = {
'BT_MUTE':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAHwSURBVEhLtZW7agJBFIZXyBYWmkIQ1EILQYQ0IhZaeMMLqIgiYmNjoRFELCwsRBHtUvgYeRrLdIEUQkDUzgf4M2eSXdb1MutABg7Lsvt/c+bMmX8UAMq9iEajz4qibPx+/9e1/yyJa7UaAoEA019OdhOgzUzi0Wj0GMAoXi6XWCwWYoDP52s4HA643W4Eg0FUKhXMZjNMJhPM53MxIBwOo1QqoVwuY71eY7Va8dQpptMpB7Bv7+Y66DUIhULodDooFot85m63i16vx2M8HnNAJBK5KKQOYNvEZ8pmsxgOh2i323oMBgMxwOPxoN9/hd1uR6PRQC6XQz6f59FqtTiA1el2BpqQns1mE+l0mkcmk0G9XucAr9d7uwYkjMViPINqtYp4PP6dSqU4hAorbCS2dW8kZm37oQVBKINCoSAGmLfnr5m2yWSSQ4QZXOtzDZJIJOQABNUgUqdRdNTpO28kNl5YAXd3lnHfD0h8OBygquoZxHgqhUVUn552+/0eNpuNQ6T8QGHi0+lEa6LYkJk87AcsAxCELUfeD0hMNaHOlPYDEh+PRzidTnk/IDENl8sl7wckpkF+Ie0HtCvcSX6fZ1eB/iLyAwPk0wjRAVb8gEFITJnoENHNdOEHZoiVu3Fr9gOC0AHUT6OF23n7b37wAzN4txWXtsebAAAAAElFTkSuQmCC',
'BT_REMOVE':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAALxSURBVEhLrVRbSNNhHN2zjz0WpdhD9BBIWPZQ7y4UUhJfQgtCwaIFBir4EHkZki7FmDrLS2mJlpo6Z6ak66abOssburbmcnmbWkLFpDztfPb/02ITZ/3hbN/vcs738V2OAoDiX6DYr8yNDFXm3w87rUYwIIdcRagy7zqJBY+mBTStVmj1dtT0zqLBOIfm1y40vPiI6p5Zkb/VYhV95FBEERqdb77xcAonVG04ntYoEJlSh6MX7shgTEh19pJDEQV/GERdahJNEjkiSQsJkphUZ69fgWOp9SBIiEgulyEJSHUfAWkDi1pmQGg7bah77kSHeR7GcTfM1jX0Tyyj3TQv8mV6m+iT94A7ySA8rgLhZ7QCB+N1W/FvMBY5b+3IuRqR3xOVBXEKvAMUiM7sQlqpGUnFEwKV3S641z348XMTrYNLOF+ylU8tHhS9FCDXRyBdN4Lk0mmklltZRMWzBZQ9XRDjq1U2UVOVDQcWuFZpQULBOHrfraK2fxUpujlcrnJB07OCxldLiM0Z9goMbS9wsXRKzGh6/w3xRQ4BCvDLqOEKthHIrB5DvMYBp3sD9S/XUNjhRrHBjeq+VdiXPDirsSPdu8qAe5B9zyvgnTHt7pyY8btnE47lDTHOebyIuJt2sMdHQKVShR2KzdVzVxM0FmTXjkLdMIGSJzO43T4DncEGTfM0ch6MIavKgjj1gDiBvScz9OQqEhMTD8fExCgPnLoyycJOwF5yyFV4vxAv9u0SIdv6gWX0rbiyppExrH/1wGg0ipjP2a8fzDpd+OBwyn5AgkR8M2AS44B+UN/Sg06DQTQtuj9Db+jCp0U3TOYhkWONIpKQ3+fMxqHRSdQ1tsmk5ZUvMlGagCJ+BbiKprZu9PUbBYmEvEItmJdAT/j/fiC//yD8gBzZDxgE6wfkyH4gCQTjB34FgvGDgAI79QMfAckTd+0HPGtuIt86zz8oP5CuJ0V4E/nP3I79QK1WixvHNy6RGRP0Bor97RF/+sEvjIol6KoTQG0AAAAASUVORK5CYII=',
'BT_TOP':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAM7SURBVEhLtZVJS1thFIYjxVbaRW03IZSWUAeaGE2HbZduumpxiGMUjQMUiRrc1AkRnNAYo+KEgjOOUMV5wgGniIr+gf6C4qZR6FXenvNBxNqbmyA1cLjJzeV9zvB+56oAqO4z/hHPzs7G/whP0rKA09NTHB4ewuVyYWdnBxsbG1hdXcXi4iJmZ2cxNTWFiYkJjIyMYHBwEL29veju7kZHRwdaW1tFgoqAk5MTFBcX3ymam5t9A46Pj0X2u7u72NzcxNramsh+bm4O09PTmJycxOjoKIaGhtDX1yey7+zsFNk3NTX5BtzrDJQclZWV9a2oqMg9MzOD3Nzc8/T09GhfDvTboiRuY/GDgwMsLy9jbGwMGRkZv8xms1EJ4heAxL/abLZznsv8/DwcDgeGh4fR1dWFtLS0nykpKS+9QXwCSNxSWFh4zpkvLCxgYGAAjY2NKC0tFUOur6+/Sk1N/ZGcnPxUDqIIoGGbCwoKROZLS0tCnIMrYBuXl5eL3wT7TVW4EhMTH96GeAWQuCk/P1+Ic8894jcBDKmoqEBPTw/o2YukpKTvJpMp4CZEFkDiX6xWq3t/f1+c4JvitwEMqaysRFtbG/vfTVU4FAH00Ke8vDwhzmtifHxcHCpvFXhaVV1djYaGBpCr3PHx8VbZVZGTkxPN/uZTe3R0BB7s3t6euPJpvj0DFnc6neD1YLfbUVdXh7KyMlCbLmJjYz8z5LpFJP6Rsj+jkMg5ksVikTIzMyXyusRCDGLXMITXAd9jJ7W3tyMhIYFFJcpciouLk0ic4ywmJubDXzNQqVQBFA80Gk1gaGjoI61WGxQeHv6Y4Nje3pYFtLS0sPj19pR1EQuzqFqtfhISEvKcRNV6vf6F0Wh8FRkZ+ZoBW1tbsgC2rD+AwLCwsGcGg0FL8YbE9REREfTVEPWWPrz81tfXZQE8WGqNcgXBwcFBUVFRGhLVURh1Ot07Drr3noMBPGTPDHiwPIOSkhLU1taC+u6zRYoV0NCxsrIi9g9D2DU8YI6qqiq/AIozIEdd8Yrm4BdOf38/7yDU1NSIdUEVXPq17Ly5iPaMk5bZJa0C0En12FL0nsXpavcL4OvlcZf//wBLhKqNqANn3AAAAABJRU5ErkJggg==',
'ICON_HEART':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAUCAYAAAD7s6+GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAIbSURBVEhLrdYxS8NAGMbxq1Inl6JLLTpU6CROfgLBxbmruClundy61I/QxS/QxaEgVKGbSKduSouTdhI3QQsOSo3/N16StrmkaXPDA+V6ee7HES6nHMdRklartUea5JUMSIPse/+PzSsxXic98kY65JQsTc91lNojTfJKBqRBQp2MlUid9Mgb6ZBT4nd6yDILfRPHkFvG8iRDauQnYl5zAqpUmYW+CdsQyi1jeZIhNfITMc/vlJ3cIJ8Ri3tw2bmbGXNk7pmLVWqDfEYs7sFl525mzJG5bqdALxIATDttGhto6EUCgGmnTWNup0DvLUIFv0ntvUWoMDcF+mgZukPxo2XojkDbFqG/dK2DbFuE/tK1LtCqReiTfkerFqFup0C3ycgStqqh21SPLGHdTu8cvbIA/aBjzT9LlbqyAP2gw+30oEUW+UqJPZ868IvUf6XE+p0uVH9CKymgXZ5dNnxCKymgXZ71O32oxl4vgH3nmWIIqTeAxa4XwL7zzETnNHSVRR/mwMr94CAS+f85XSUPc2DlfhDqnIDqXZULyHMCrJwUR7HIYFflAvKcACsnhbEzBNXYLRAvMVhBniRCBtgtEC8xWEFGdhqhGlsA0zdg5Zp3PBcywBbA9A1YuebFdkZCNTYH6m4MO+T34ULIAJsDdTeGHfJ7ZmcsVGOz4C71q7CbChlgs+Au9auQqHMmdOycXbGC9LD/J0Lizj/2NIJvUyGAngAAAABJRU5ErkJggg==',
'ICON_ANDROID':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAUCAYAAAD7s6+GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAIJSURBVEhL5ZbBSgJRFEBbCEVRbmwh9QESitCqFu36ArFc+QtC0K7PcNGilR/gQhAJggghaCVu2mREumijghRIi3A6V97IeHuToyUhLQ7OvPve3DPv3hlnyXGcpUVgTLJcLm/NKs3aQ9va85sD63iQPKwd+YxESZSBPuzpizC2DUnDpiWeI+bAiTdGohNwIKfXMLYJScO2Jb5HrA8ZiXlFd0j0Bo+wBvtQgLaREBGXFsd5iEEKPqAJUSUaJVETPiAFMchDy9yA3IRLm+MC7MMaPMIb7IyJygmJjmAAzxY5r6h7LILv0IO4T+njJOvBuxH2yvkdPzN3AEfuNXWP7pLwNaCkV/yBNdb+lj6DB8sOThJ+Zc3uF1FTxu4Mkq5wg7URVfoIyRozSLo30ZV2GZWeBMtwP6WklLyj1lSUaEVJdkwLTNpNb/yeNcvD0pPsTCWscb4BWR956eM4hOBWzUnLNbl4Wknech4C6VnpP5tslvENqKn4mUiugC550dxAwkdUHqJhmfktqTl1I1pXyUpmXNpB3gI20YSZU1TxriQ6tsjIjl3DyzftIG+Gqk9c3o82kSrj8kT7lf6F2LVtx0X0YsretL2m9NjpDx4g602I6N0cROXFPc0DM3GuiD7NQfRyHqJB/4WClNydc/WvRdcpffiXWWVHw7/JQnw0f/l6CvIx+1dzFmZHPwEm6hcLkIeDdAAAAABJRU5ErkJggg==',
'ICON_APPLE':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAUCAYAAAD7s6+GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAJaSURBVEhLzdbPK4NxHMDxh6FMHMYfwJGyoxIlBxc5OFDaaeVITSlKcfMrFHdHd+WgXJZajYvb0hqldlltIYm4eLw/T89qo32e7/fJweHVk+3b9/t+vr7bHsd1XafWkeM4jSSTySb0YAEZDGnjTd5zHacJPVhABnVzVtvqIuXFgFCJPMALbhA3idHG+JEHXF9wg7o5w4bOElfAE1YR+4PQWeIKeMIq6uY0CiWkGW2ISBDXeVxiCwOIynGwiSWkGW3w5uQ6j0tsYQBROQ7VOdVQP26Y6zK2sYIpzGANG9jHHhbRLzcV8C+WuGEsYxsrmMIM1rCBfexhEf3eTfmfoV9nlAVbkUAWr3DxhlukIWfzGV/+e3IMzjHYKJQFW5FAFq9geecNt0hDzuYzvvz35BicY1ALjbPonR8hkSauGNenhMZZ9M6PkEgTV4zr00IPa3bLJLLM+DG0KKGHNbtlEllm/BhatNC84S5Wb+KE8d0B5zNvuIvVmzhhvDenFvppGbrJ+M6A0E/L0E3Ge3NqoY+WobKj6vcpiz5ahsqOenNqodeWoUXGj2pfTyx6bRlaZPxo0NfTrmWonNULTCgfpl3LUDmrF5jQdnSERd9DxJ4qoSMs+h4i9lQL7SLyLETouhLaReRZiNB1LTRC5DhKFrHya9WrhEaIHEfJIlZ+rXqDfus7WDiFD4PYCmMm4T1kKLEdLJzCh0FshTGTiASFygNyDEt4QA47mMYcjnEP2Ul5rT3oCYpF5QE5hiU8IIcdTGMOx7iH7KS85s3ZMPTnE/9/+fvX09N/CfvZ8Q2dluFbIa+BnwAAAABJRU5ErkJggg==',
'ICON_DECEPTICONS':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAUCAYAAAD7s6+GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL6SURBVEhLlZU/blpBEId9BNpU4QgcgSNwBB8BSzkASmUpDZ2dzk1S06RHwiFSnAIpnZuQFGnScIOX+Z7mt8wO+8BGGr33ZmZ3vp0/y9XHu/upyeQq/Uw3yjp9t2zswV74/H37ZmZyndeb7iSOfFo29mCv3scD7HNw+34YABphixD4mbBHD2Kbj00OObh9PwwATbDFPfHzPcZFbwE6k10KPkcXYR0I3Tz5outSIECRUhnPELoSPByqVIA1vvZQVcWCrB22nMozzQGijiyjKyX0zKNbJ9C1BetMdoJ1KOmm9o1gR9fDO6R01Z6Uf+kAfWb9e2bPQ9BjQ9BhY02fSZdlAl04ABCCW9r7PumxocMmQK1Z5IxeN4AAWKktApR0AtSzlM4zw0ApYIT77Hr6FcFHOkFr3SyDMrEKCAjZWph8cD39iuCDDhs+Ebq0g4MyUDmbc9O9cz0ZRPBBhy1n9ThIIh4o8Y3rmWgEUHQnLVGd3D98IADRYPH+3uEu6epBCqAaKIDIFpL7NPYndsHXTX8EXQUoykzG4gDFwcKGDwdAv2odnoECqvTdZrP553157xkEkved22KP1r10BJ00BgeIR5OfLryrReKzaqUC7aBfgN0+fv3T2e/bdvvs8J/siXS/9/tf2EL5WTMEqr7ry886MuVgAApy5TZlk+zOhzLK5N8K4MfT03cHqrLsOrUJWWZNNfEKYMGYfMB07Qi2ymCCxJc1zcNTek2+BihfP61v+TbLZME0+TcD5W2VXL6nE58mn0t86K6MsPjgW/115nKFib99ASw+/W3QLHtj8ksLNK4t9Sc+J3+dDdC1pji0QCuTKjm25i0SB4orR1k71wLRtjx3egu6CJk81wLRtriUUQZKoEMtUEruvs1BSgOlDFLWVguo5O2/zkxtgccmmmiAcwtoynUYfIeb3gIY2MizWi7y1AKx5PhQgdHZjIZenQbgWGa9Azh90WbulIBjmXl/HWAjwwDP/Rag5Ly/CrAxXGSY+5XMIbxfzOB/GgvUYkeHEwcAAAAASUVORK5CYII=',
'ICON_AUTOBOT':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAUCAYAAAD7s6+GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAL5SURBVEhLnZY9jhNBEIV9BKdEu0fwEXwEh4QOOIAJV0LI2oSVnDjbJQA5QgRIOCbBAQGhj+CI2DcY6mvVGz03Pf7BUmlqqqu6Xr+uqvFotVqNhuTj88skZBoyS0GfnIsZWvtz92ocMg1ZhCxD1ino2Fgbt+K7rhuNIvEyBRD3qe/j2V0QfIglhtiyD4ki4S4FELPUu3heI8QSQ2zZR0Ad0C6SXQNSMfgS0++RQI8GSqCvAYlP7X8UUE9E4m3FJCcqvxpU+vrBdgl0a0APoT9XbPZ7NtjGlxgdbOtXDwgB/BX65wosa/UB8MHXY3X1XBuJNpkUhj+EONOAcUDug51Y9lgKKI1CsqPVJ/qntNW16muqU2z4zZJRGoMkJCehkv4I/XejVrGxpsPhr0NNBXScSSgBMbdJ21M8fxq76NgAhY/8VT5912bSfTzXIXqSHLa/JxDe0bGhuy8xHQcvQFEi4SGTw9A637Hpur+GjuiaWUPwVY0efLREEtWpWCUx+i6fsIi4DR9nc1sDvatqELYAABixpWbCxppYF/iTGRgJ70Me7ZoB6GDVLALOGrrsD6GXPZ3RaSZ/tGtWbcJaS5ftIQ85rRilTmHrbcihqssne3cdkPi+yWfZswZaGkqjKMcRV//egKIzLvofMbleMzoRGPcPG0wtKuYeKp/Cqg7eA806FUObfJ/ltS8MKNdNKZTuzhotca1Pn4HhWikFmgWWHahqkjV8+uu/BJTESwNXA9WB3OcS0DIPDXgNVHXpPoOM6gr/B+hJx4uJqjZvBbofYtS7+1ZGy6ezlqqLbwXa71nX6BDQ11kKgPcJ4Ie5FagaihL4YiXhhxkEOrcOPqm/xsjy8qBk5gOM0vk0Ul2jQ/+kBJSY/n/vCaPZxZME60BhkYZCakYBefaPNEM7S8DZepfNhQ3dm4muPxl1/wBNsGPGT7IIkL0xiq6mw6f5j/wMuxro/gFA13vz0E2gShIgmJnfGteOrczaWyUAzUNejEExia1ZPvoy/QUWbRu5VvIs2AAAAABJRU5ErkJggg==',
'BT_ARROW_BOTTOM':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAB3klEQVRYR+1XSy8DURidRS0bEo/Eb7C2YCXxO4hO25mhOxaIBGui9fwNHlGPRkM8qu20RESInSAhNqhHSKyP75QmmtA2XOlmFif35n7n3O98370z7WgAtHKirMlZuGPA6YDTAacDRTugaZrLNM01n88H3eOBpwjIIdeyrAvRVggK5ijFgNswDLy8vuE+84i7+4eCIIdcaiR3pQoDNX6//2ksOIGr6xvMzocFi5hbCOeBa4yRQ65oniV5rQoDVbJJo7Q+Mzg0jLPzCyytRBBeXs0D1xgjh1xqBNT++Qh4jvWCZl3XM729fTg+OUVkbR0rkWgWnHONMXLI/dQouQMsImeiyevVM93dPUjaaWxux7JI2ClwjTHhNn1NrqID3CPPhFR52xUIILq+kUWnZbHy2++SqzSQZ6K9re3Sq+sgOP8puQoDrpHRYDQ4PoWx0KRgCqGJaYQmZ2T8wPjnPMdhnBpJ7lJhwN0/MIiDwyOk9w9g7+0jmd5DIpVGPJnCbiKFWNzGdiyBrZ243Ind7EiNJHerMFDd4fHZhtkFv9FZEIbEyTOtAKiR5NUqDLCKBkGLoLVEkEuNkg7wHLkR32p1JYJcapTcgdxj+Oux0N/+oj9G//3N4BhwOuB0oOwdeAf11IjEeWJphQAAAABJRU5ErkJggg==',
'BT_ARROW_TOP':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAB/UlEQVRYR+1XzU4TURidpLhsYgK48BVc+QZGE16grFudf2DV7gyBRZdiW7WvoQN0hCC09GcopCEmhLiAlKTtXuvCBzh+Z5yaiYYW0iFspsnJnTvfOff75sz9bqYKAOU+ca/J+eBxAbEDsQOxAxMdUBRl5s1Gcaf4roxC6cNfvC2+x3UolMqghlrB2Bw3KSD5enUdB7UG9qt1f6weNlGrt3DYaKHe8tD02mgdHcNrn6B90kHn9CuokdzJKAqYfflK9yx7Baa1DNNchuFjCbphB1jy5yOQR40kn42iAD7FE8EzwYsAC4uLKVfTVGiqilQq5cr9hVCcXGoicYDvkQvNCx4JHmcymYppmvgx/InvwyHW19aQTqcrjAUccqmJZA/QxdEvoWmak83l0Ov10Wh6qMs+GPQH4D3GhJgIC6J4BaHkqpPN5nDZvcK2u4OtymdsCnh90e2CMXkt/xUx7nvjJl3AAhKqqjr5fB5n59/gbLn4tOn6Y/iaMXLIDTsxbQEzuq67hWIJ7eOOn/ijsx2gIiPxZ84YOeRSE9UeSNq2JX3vYW+/ht0v1bEgh1xqouqCOdu2f1mWBcMwBPoEGCCXGilgLopN+FAWeSp4Hurz0Xlw3UguNdROfRQ/CBbiGXAbMDm1Uxfwb1vfej5VF9z1f4aJ50BcQOxA7MBdO/AbgVKBjSV0zikAAAAASUVORK5CYII=',
'BT_ARROW_DN':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAABcklEQVRYR+1Wy0rDQBQNqEvBRb/DRX/A38hrEwkJoa7soq7UH1DwK3xgtAZLRURMq2vFneii4sqqoILr45yQFCIxEZJSFzNwYLhzzr13Tm5gFADKJDHR4ry4bEA6IB2QDvx/BxRFmfE87922bSxaFqwCkEMuNdQK5F6y0AGhn3McBx+fXxi+vOF5+JoLcsilhtoqGqiZpnmxsbmFweMTtnd9gX3s7PkpMMYzcsilRhSvVdHArEgyr6pquLq2jrv7Bxy0A/iHRykwxjNyyKVGgNrSn2A6vkmdiVutFVzf3CI47qIddCJwzxjP4uL1WENt6QaYYyppQtO0sLncRK9/hdOz8whh/xKM8UzwkuLURCvvvfGXIUzyjJrQdS1sLDXQ6Z5EEBMPXdczi1fZQMoJwzB6ruuC4D7r5lU78NMJDtlCDO458SPbE3LVDiR5OVyccBYluI8GLmtVNQO/5S+Ml2pg3C/mwr9ANiAdkA5IB8btwDctkKsYa5cf8AAAAABJRU5ErkJggg==',
'BT_ARROW_UP':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAABX0lEQVRYR+1Wy0rDQBQNpC4LLor/4S/on+S9Tfd1kb36IWr6iIqKJdWi4E7EhVKh7V7rwg843hMrSEmblmmpiwkcZjJz7twzJzeTGACMdWKtyblxLUA7oB3QDvx/B4z8y/Q878hxHDiODdd1U6GVpnBnbrLQgZxFTdu2YxGAj9En3gV7tRosy4qFa+aJmPWtWVRAljysVtHvD9C56SLt3GI4GIJjnMsTsSwBktyKw7CK194bmskZGq1T1AXsv/R64Bw5kyKWIcCkxVEU4fHpGXEjwUk9ydq/fc6RM/k4VAWUpNiS/YND3N0/ZImP4+YYLWmJn3vOkUMuY34LU1VAOQh8tNMuLq7aOL+8nglyyGWMCCizKFUFVIIg+PJ9n6+bwCmAC3IZI7kryxCwKYtsC3YEu3OCXMYwVtmBjfFCW9IuAiZnrLKAaQfc3ONKNbDqP+bCk1AL0A5oB7QDq3bgG8rFqAcNi1mfAAAAAElFTkSuQmCC',
'BT_ARROW_BLACK':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAACQklEQVRYR+2XXWsTQRSGEyq9NCCk1/4BLwJCvLKCvyAfKLHJbnaTko9NrGlNTbUKSUgJbRNrrRJtruoPKAGvKtYPeuuFv+g4z5hIKm1qyZaCZOFlDue8Z867Z3ZmEo+IeC4Tl1qcF58ImHRg0oEzO+A5/njn5h7cMk3zSzKZlGHgI6bo3r9yRtY4j4Ap0zR2Hacg3W5XDg4+yddv3zWw8RGDowRMDYsYddD9q4ArauJeaXFRDj8fyrv3Xck7Rbl3P6aBjY8YHMXtDosYV4A3FArNFosF/abl5RUxTEssOy12al4DGx8xOHDD4fDtwXKMK2A6kUgc7e19kGqtIen5jGSyecnlC8eAjxgcuIZhHCkB0yzFuAJ8lmXJ/n5PFywUF+ThQulEEIMDlxxV2+eGAL9t27LztiOPSkuy9LissHwKypoDlxxV3O+GgJlUKiXrGy15UnkmlZXVkYADlxxVfMYVAel0Sp6/qCrU+iP2afjNIcctAf54PP6j8nRV6o2mVOtrIwEHLjluLYEvGAwmstmMNNc3FVqy1tw4EcTgwCXHrY+QrXQ9Go32HMeR9sttaW+9lpYaN9uvNLDxEYMDlxy3tiFn+1WFG5FI5GM2m5NavSHbOx1509nVwMZHDA7cfo6+F8Y9B5iDs/0aEwcCgVwsFvvJNrPVXtdQNj5i/eJw/9wHbggYiKATtPamwh2Fu31g4yMGx/XLCAE8tJRvghOOQ4Z9DrDxEbuw63gg4tzjWEtw0X9azvw9MBEw6cB/34Ff40MrIZhsiFAAAAAASUVORK5CYII=',
}
var CSS_FILE = {
"US50247":"https://sites.google.com/a/wablog.info/mesak-project/documents/gpr/50247.css",
"OUTLOOK":"https://sites.google.com/a/wablog.info/mesak-project/documents/gpr/50935.css",
"WORD2010":"https://sites.google.com/a/wablog.info/mesak-project/documents/gpr/word.css"
};
function gpr_addScript(script){
	var a = document.createElement('script');
	a.type = 'text/javascript';
	a.innerHTML = script;
	document.getElementsByTagName('body')[0].appendChild(a);
}
function gpr_addScriptURL(script){
	var a = document.createElement('script');
	a.type = 'text/javascript';
	a.src = script;
	document.getElementsByTagName('head')[0].appendChild(a);
}
function gpr_addStyle(css){
	if(storage == 'greasemonkey'){GM_addStyle(css);}else{
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(style);
	}
}
function gpr_addStyleUrl(url){
	var style = document.createElement('link');
	style.setAttribute("rel", "stylesheet");
	style.setAttribute("type", "text/css");
	style.setAttribute("href", url.replace(/^\s+|\s+$/g,'') );
	document.getElementsByTagName("head")[0].appendChild(style);
}
//******************** debug ********************//
if(debug){
var g_content_debug = '<div id="debug" class="gpr_debug" style="display:none;background-color:#FFF;border: 1px solid #000;height: 200px;left:0;overflow:auto;position: absolute;top: 70px;width:90%;z-index:10000;"></div>';
$('body').append(g_content_debug);
function log(content){ $('#debug').prepend(content + '<br />').show(); }
function dump(b,d){var c="";d||(d=0);for(var e="",a=0;a<d+1;a++)e+="    ";if(typeof b=="object")for(var f in b)a=b[f],typeof a=="object"?(c+=e+"'"+f+"' ...\n",c+=dump(a,d+1)):c+=e+"'"+f+"' => \""+a+'"\n';else c="===>"+b+"<===("+typeof b+")";return c};
}
//******************** debug ********************//	
var gpr_name = 'google plus reply+',
block_type = $.parseJSON( getValue('block_type', '[]' ) ),
gpr_setting = $.parseJSON(getValue('gpr_setting', '{}')),
gpr_json = {"version":version},TIME={},g = {};
//******************** language start ********************//
if( typeof(getValue('gpr_setting')) != 'string'){
	var Lastlink = $('#content').next().find('a:last');
	if( Lastlink[0]){
		var tmp = Lastlink.attr('href').match(/\intl\/(.+)\/\+/);
		gpr_setting['language'] = tmp.length > 1 ? tmp[1].toLowerCase() : "en"
	}
};
jQuery.extend({
	Config:{
		options : {
			"Function":{
				'check_update'		:{label:'SET_CHECK_UPDATE'		,type:'checkbox'	,description:'','default':true},
				'more_circlesload'	:{label:'SET_MORE_CIRCLESLOAD'	,type:'checkbox'	,description:'','default':false},
				'btn_mute'			:{label:'SET_BTN_MUTE'			,type:'checkbox'	,description:'','default':true},
				'btn_remove'		:{label:'SET_BTN_REMOVE'		,type:'checkbox'	,description:'','default':true},
				'autonext'			:{label:'SET_AUTONEXT'			,type:'checkbox'	,description:'SET_AUTONEXT_DESC','default':true},
				'thumb_gif'			:{label:'SET_THUMB_GIF'			,type:'checkbox'	,description:'','default':true},
				'thumb_size'		:{label:'SET_THUMB_SIZE'		,type:'text'		,description:'','default':'100'}
			},"General":{
				'mess_toggle'		:{label:'SET_MESS_TOGGLE'		,type:'checkbox'	,description:'','default':true},
				'mess_type'			:{label:'SET_MESS_TYPE'			,type:'checkbox'	,description:'','default':true},
				'mess_autohide'		:{label:'SET_MESS_AUTOHIDE'		,type:'checkbox'	,description:'SET_MESS_AUTOHIDE_DESC','default':false},
				'mess_key'			:{label:'SET_MESS_KEY'			,type:'checkbox'	,description:'SET_MESS_KEY_DESC','default':true},
				'mess_skipread'		:{label:'SET_MESS_SKIPREAD'		,type:'checkbox'	,description:'','default':true},
				'mess_opcomm'		:{label:'SET_MESS_OPCOMM'		,type:'checkbox'	,description:'*Bug Already','default':true}
			} ,"Interface":{
				'columns_custom'	:{label:'SET_COLUMNS_CUSTOM'	,type:'checkbox'	,description:'','default':false},
				'columns_right'		:{label:'SET_COLUMNS_RIGHT'		,type:'text'		,description:'SET_COLUMNS_RIGHT_DESC','default':'180'},
				'columns_center'	:{label:'SET_COLUMNS_CENTER'	,type:'text'		,description:'SET_COLUMNS_CENTER_DESC','default':'580'},
				'columns_left'		:{label:'SET_COLUMNS_LEFT'		,type:'text'		,description:'SET_COLUMNS_LEFT_DESC','default':'180'},
				'floatbar'			:{label:'SET_FLOATBAR'			,type:'checkbox'	,description:'','default':true},
				'template'			:{label:'SET_TEMPLATE'			,type:'select'		,description:'',options:{'DEFAULT':'OPT_DEFAULT','US50247':'Distinctive Stream','OUTLOOK':'Outlook Style','WORD2010':'Word 2010 Style','CUSTOM':'OPT_CUSTOM'},'default':'DEFAULT'},
				'custom_template'	:{label:'SET_CUSTOM_TEMPLATE'	,type:'text'		,description:'','default':''},
				'icon'				:{label:'SET_ICON'				,type:'select'		,description:'',options:{'DEFAULT':'OPT_DEFAULT','HEART':'OPT_HEART','ANDROID':'OPT_ANDROID','APPLE':'OPT_APPLE','AUTOBOT':'OPT_AUTOBOT','DECEPTICONS':'OPT_DECEPTICONS','CUSTOM':'OPT_CUSTOM'},'default':'DEFAULT'},
				'custom_icon'		:{label:'SET_CUSTOM_ICON'		,type:'text'		,description:'','default':''},
				'language'			:{label:'SET_LANGUAGE'			,type:'select'		,description:'',options:{'en':'English','zh-tw':'正體中文','zh-cn':'\u7B80\u4F53\u4E2D\u6587'},'default':'en'}
			}
		},
		get: function (n) {
			for (p in this.options) if (typeof this.options[p][n] == "object") return typeof gpr_setting[n] != "undefined" ? gpr_setting[n] : this.options[p][n]["default"];
		},
		load : function(){
			var s = {};
			for (p in this.options){
				for (x in this.options[p]){
					s[x] = typeof gpr_setting[x] != "undefined" ? gpr_setting[x] : this.options[p][x]["default"];
				}
			}
			return s;
		},
		save : function(){
			var s  = this.load();
			setValue('gpr_setting', $.toJSON(s) );
		}
	}
})
gpr_setting = $.Config.load();
var gpr_lang = {
	"en":{
		"REPLY"						:"Reply",
		"UPDATE_TITLE"				:"is new version on %s,[install page]",
		"INSTALL_PAGE"				:"install page",
		"COMMENTS"					:"%s Comments",
		"COMMENT_SHOW"				:"Show %s",
		"COMMENT_OLD"				:"Old %s",
		"COMMENT_NEW"				:"New %s",
		"SETTING_GENERAL"  			:"General",
		"SETTING_FUNCTION" 			:"Function",
		"SETTING_INTERFACE" 		:"Interface",
		"SET_CHECK_UPDATE"			:"Check Update",
		"SET_THUMB_GIF"				:"Gif to thumb",
		"SET_THUMB_SIZE"			:"thumb size",
		"SET_COMM_AUTOHIDE"			:"Comment Auto Hide",
		"SET_COMM_OLD_LOAD"			:"Load Old Comment to Toggle",
		"SET_MORE_CIRCLESLOAD"		:"Load more circles",
		"SET_MESS_TOGGLE"			:"Message Toggle Mode",
		"SET_MESS_TYPE"				:"Save Message close",
		"SET_MESS_AUTOHIDE"			:"Auto Collapse Message",
		"SET_MESS_AUTOHIDE_DESC"	:"Loaded automatically the message away",
		"SET_MESS_OPCOMM"			:"Open Comment with Message",
		"SET_MESS_KEY"				:"Message keyborad contral",
		"SET_MESS_KEY_DESC"			:"Use the keyboard up and down keys to read messages",
		"SET_MESS_SKIPREAD"			:"Skip message for read",
		"SET_BTN_MUTE"				:"Show Mute Button",
		"SET_BTN_REMOVE"			:"Show Remove Button",
		"SET_AUTONEXT"				:"Auto load more page",
		"SET_AUTONEXT_DESC"			:"When the wheel rolls page to the next, automatically loading the message more",
		"SET_COLUMNS_CUSTOM"		:"Custom Columns",
		"SET_COLUMNS_RIGHT"			:"Right Columns Size",
		"SET_COLUMNS_RIGHT_DESC"	:"(Need &gt; 160px)",
		"SET_COLUMNS_CENTER"		:"Center Columns Size ",
		"SET_COLUMNS_CENTER_DESC"	:"(Need &gt; 500px)",
		"SET_COLUMNS_LEFT"			:"Left Columns Size",
		"SET_COLUMNS_LEFT_DESC"		:"(Need &gt; 160px)",
		"SET_FLOATBAR"				:"Floating page control ",
		"SET_LANGUAGE"				:"Select Language",
		"SET_TEMPLATE" 				:"Select template",
		"SET_CUSTOM_TEMPLATE"		:"Include Css file",
		"SET_ICON"					:"Select Icon",
		"SET_CUSTOM_ICON"			:"Custom Icon url (42x20)",
		"OPT_TOP"					:"Top",
		"OPT_BOTTOM"				:"Bottom",
		"OPT_BOTH"					:"Both",
		"OPT_HEART"					:"Heart",
		"OPT_ANDROID"				:"Android",
		"OPT_APPLE"					:"Apple",
		"OPT_DECEPTICONS"			:"Decepticons",
		"OPT_AUTOBOT"				:"Autobot",
		"OPT_DEFAULT"				:"Default",
		"OPT_CUSTOM"				:"Custom",
		"ALT_BTN_REMOVE"			:"Remove This Block",
		"SETTING_FEEDBACK"			:"gpr+ feedback",
		"SETTING_TITLE"				:"Google Plus Reply+ Setting",
		"SETTING_SAVE"				:"Setting Save.",
		"SETTING_SUBMIT"			:"Submit"
	},
	"zh-tw" : {
		"REPLY"             		:"回覆",
		"UPDATE_TITLE"      		:"有新的版本 %s,[install page]",
		"INSTALL_PAGE"      		:"安裝頁面",
		"COMMENTS"          		:"共有 %s 則留言",
		"COMMENT_SHOW"      		:"顯示: %s",
		"COMMENT_OLD"       		:"舊留言: %s",
		"COMMENT_NEW"       		:"新留言:%s",
		"SETTING_GENERAL"   		:"一般控制",
		"SETTING_FUNCTION"  		:"功能控制",
		"SETTING_INTERFACE" 		:"介面控制",
		"SET_CHECK_UPDATE"  		:"確認更新",
		"SET_THUMB_GIF"				:"Gif 轉換縮圖",
		"SET_THUMB_SIZE"			:"縮圖大小",
		"SET_COMM_AUTOHIDE" 		:"留言自動收合",
		"SET_COMM_OLD_LOAD"			:"打開時載入舊留言",
		"SET_MORE_CIRCLESLOAD"		:"社交圈展開",
		"SET_MESS_TOGGLE"			:"訊息收合",
		"SET_MESS_TYPE"				:"儲存訊息收合狀況",
		"SET_MESS_AUTOHIDE"			:"自動收起訊息",
		"SET_MESS_AUTOHIDE_DESC"	:"載入後自動將訊息收起",
		"SET_MESS_OPCOMM"			:"開啟訊息連帶開啟留言",
		"SET_MESS_KEY"				:"鍵盤閱讀",
		"SET_MESS_KEY_DESC"			:"使用鍵盤的上下按鍵閱讀訊息",
		"SET_MESS_SKIPREAD"			:"略過已收合的訊息",
		"SET_BTN_MUTE"				:"忽略訊息按鈕",
		"SET_BTN_REMOVE"			:"暫時移除按鈕",
		"SET_AUTONEXT"				:"自動讀取更多訊息",
		"SET_AUTONEXT_DESC"			:"當滾輪滾到網頁最下，自動載入更多的訊息",
		"SET_COLUMNS_CUSTOM"		:"自訂三欄位寬度",
		"SET_COLUMNS_RIGHT"			:"右側欄位寬度",
		"SET_COLUMNS_RIGHT_DESC"	:"(必須 &gt; 160px)",
		"SET_COLUMNS_CENTER"		:"中間欄位寬度",
		"SET_COLUMNS_CENTER_DESC"	:"(必須 &gt; 500px)",
		"SET_COLUMNS_LEFT"			:"左間欄位寬度",
		"SET_COLUMNS_LEFT_DESC"		:"(必須 &gt; 160px)",
		"SET_FLOATBAR"				:"浮動頁面控制",
		"SET_LANGUAGE" 				:"選擇語言",
		"SET_TEMPLATE" 				:"選擇佈景",
		"SET_CUSTOM_TEMPLATE"		:"外部引入CSS檔案",
		"SET_ICON"					:"選擇提示小圖示",
		"SET_CUSTOM_ICON"			:"自訂圖示網址 (42x20)",
		"OPT_TOP"					:"上面",
		"OPT_BOTTOM"				:"下面",
		"OPT_BOTH"					:"上下",
		"OPT_HEART"					:"愛心", 
		"OPT_ANDROID"				:"Android",
		"OPT_APPLE"					:"蘋果咬一口",
		"OPT_DECEPTICONS"			:"狂派",
		"OPT_AUTOBOT"				:"博派",
		"OPT_DEFAULT"				:"預設",
		"OPT_CUSTOM"				:"自訂",
		"ALT_BTN_REMOVE"			:"移除此訊息區塊",
		"SETTING_FEEDBACK"			:"gpr+ 意見回報",
		"SETTING_TITLE"     		:"Google Plus Reply+ 設定",
		"SETTING_SAVE"      		:"設定已儲存",
		"SETTING_SUBMIT"    		:"儲存"
	},
	"zh-cn" : {
		"REPLY"       				:"回复",
		"UPDATE_TITLE"   			:"有新的版本 %s,[install page]",
		"INSTALL_PAGE"   			:"安装页面",
		"COMMENTS"     				:"共有 %s 则留言",
		"COMMENT_SHOW"  			:"显示: %s",
		"COMMENT_OLD"   			:"旧留言: %s",
		"COMMENT_NEW"   			:"新留言: %s",
		"SETTING_GENERAL"  			:"一般控制",
		"SETTING_FUNCTION" 			:"功能控制",
		"SETTING_INTERFACE"			:"介面控制",
		"SET_CHECK_UPDATE" 			:"确认更新",
		"SET_THUMB_GIF"				:"Gif 转换缩图",
		"SET_THUMB_SIZE"			:"缩图大小",
		"SET_COMM_OLD_LOAD"			:"打开时载入旧留言",
		"SET_MORE_CIRCLESLOAD"		:"社交圈展开",
		"SET_MESS_TOGGLE"			:"讯息收合",
		"SET_MESS_TYPE"				:"储存讯息收合状况",
		"SET_MESS_AUTOHIDE"			:"自动收合讯息",
		"SET_MESS_AUTOHIDE_DESC"	:"载入后自动将讯息收起",
		"SET_MESS_OPCOMM"			:"开启讯息连带开启留言",
		"SET_MESS_KEY"				:"键盘阅读",
		"SET_MESS_KEY_DESC"			:"使用键盘的上下按键阅读讯息",
		"SET_MESS_SKIPREAD"			:"略過已收合的訊息",
		"SET_BTN_MUTE"				:"忽略讯息按钮",
		"SET_BTN_REMOVE"			:"暂时移除按钮",
		"SET_AUTONEXT"				:"自动读取更多讯息",
		"SET_AUTONEXT_DESC"			:"当滚轮滚到网页最下，自动载入更多的讯息",
		"SET_COLUMNS_CUSTOM"		:"自订三栏位宽度",
		"SET_COLUMNS_RIGHT"			:"右侧栏位宽度",
		"SET_COLUMNS_RIGHT_DESC"	:"(必须 &gt; 160px)",
		"SET_COLUMNS_CENTER"		:"中间栏位宽度 (&gt; 500px)",
		"SET_COLUMNS_CENTER_DESC"	:"(必须 &gt; 500px)",
		"SET_COLUMNS_LEFT"			:"左侧栏位宽度 (&gt; 160px)",
		"SET_COLUMNS_LEFT_DESC"		:"(必须 &gt; 160px)",
		"SET_FLOATBAR"				:"浮动页面控制",
		"SET_LANGUAGE"  			:"选择语言",
		"SET_TEMPLATE" 				:"选择布景",
		"SET_CUSTOM_TEMPLATE" 		:"外部引入CSS档案",
		"SET_ICON"					:"选择提示小图标",
		"SET_CUSTOM_ICON"			:"自订图标网址 (42x20)",
		"OPT_TOP"					:"上面",
		"OPT_BOTTOM"				:"下面",
		"OPT_BOTH"					:"上下",
		"OPT_HEART"					:"爱心",
		"OPT_ANDROID"				:"安卓",
		"OPT_APPLE"					:"苹果",
		"OPT_DECEPTICONS"			:"霸天虎",
		"OPT_AUTOBOT"				:"汽车人",
		"OPT_DEFAULT"				:"預設",
		"OPT_CUSTOM"				:"自订",
		"ALT_BTN_REMOVE"			:"移除此讯息区块",
		"SETTING_FEEDBACK"			:"gpr+ 意見回報",
		"SETTING_TITLE"   			:"Google Plus Reply+ 设定",
		"SETTING_SAVE"   			:"设定已储存",
		"SETTING_SUBMIT"  			:"储存"
	}
}

/*
function ns (str) {
	var i =str.indexOf('.');
	if(i== 0){
		return str.replace('.','.'+gpr_ns);
	}else{
		return i==(str.length-1) ? str + gpr_ns : gpr_ns+'_'+str ; 
	}
}
*/
var gpr_ns = 'gpr';
function ns(a){var b=a.indexOf("."); return b==0? a.replace(".","."+gpr_ns+"_"):b==a.length-1?a+gpr_ns:gpr_ns+"_"+a};
function cn(name){return name.replace(/./,'').replace(/#/,'');}
function T(a, c, b) {
    b = b ? b : $.Config.get('language');
    if( typeof gpr_lang[b] != "object" ){
    	a =  T(a, c, "en");
    }else{
    	if(  typeof gpr_lang[b][a] == "string" ){
    		a = gpr_lang[b][a]
    	}else{
    		if(typeof gpr_lang['en'][a] == "string"){
    			a =  gpr_lang['en'][a]
    		}else{
    			a = a
    		}
    	}
    }
    c != null && (a = a.replace("%s", c));
    return a
};
var BLOCK_FOCUS = '.rh',
BTN_MUTE = '.cf',
BTN_MUTEC = '.Eo'
gpr_addScriptURL('https://sites.google.com/a/wablog.info/mesak-project/documents/gpr/gpr_setting.js?'+ version );
//gpr_addScriptURL('https://sites.google.com/a/wablog.info/mesak-project/documents/gpr/gpr_setting_test.js?'+ version );
//******************** google+ ********************//
gpr_addStyle(
'.gpr_hr{height:1px;border-bottom: 1px solid #E0E0E0;display:block;}'+
'.gpr_debug{overflow:auto;height:200px;}'+
'#gpr_tbuttons{margin: 2px 0pt 2px 16px; vertical-align: top;}'+
'#gpr_gotools {cursor:pointer;height: 160px;right:0;top:400px;position:fixed;width:32px;z-index:1;}'+
'.gpr_bar { padding:6px; }'+
'.gpr_flash_close { cursor:pointer }'+
'.gpr_mess_list{margin:-16px -19px auto -21px;}'+
'.gpr_mess_bar{margin-bottom:10px;color: #666;border: 1px solid gainsboro;border: 1px solid rgba(0, 0, 0, 0.1);background-color: whiteSmoke;background-image: -webkit-linear-gradient(top,whiteSmoke,#F1F1F1);background-image: -moz-linear-gradient(top,whiteSmoke,#F1F1F1);background-image: -ms-linear-gradient(top,whiteSmoke,#F1F1F1);background-image: -o-linear-gradient(top,whiteSmoke,#F1F1F1);background-image: linear-gradient(top,whiteSmoke,#F1F1F1)}'+
'.gpr_mess_snippet{white-space:nowrap;color: #666;}'+
'.gpr_mess_content{background-color: #F0F0F0;padding:5px;margin-bottom:-16px;height:22px;position: relative;}'+
'.gpr_mess_title{white-space:nowrap;line-height:22px;text-overflow:ellipsis;overflow:hidden;}'+
'.gpr_mess_title .gpr_mess_list_img img{width:20px;height:20px;margin-left:0px;}'+
'.gpr_mess_title .gpr_mess_list_name {padding-left:6px;padding-top:6px;}'+
'.gpr_mess_preview{position:absolute;display:block;z-index:10;}'+
'.gpr_us_tools div{cursor:pointer;border-radius:2px;border:1px solid #aaa;opacity:0.5;height:16px;margin:2px;padding:0px;}'+
'.gpr_btn_mute {background:transparent url('+IMG['BT_MUTE']+') no-repeat center 0px;}'+
'.gpr_btn_remove {background:transparent url('+IMG['BT_REMOVE']+') no-repeat center 0px;}'+
'.gpr_us_tools div:hover{background-position:center -16px}'+
'.gpr_us_tools { width:48px;margin-left:-60px;margin-top:2px;float:left;clear:left;}'+
'.gpr_toggle_comm { cursor:pointer;padding-left:30px;float:left;}'+
'.gpr_comm_dialog{ float:right;width:21px;}'+
'.gpr_comm_dialog .gpr_comm_count { margin-top:2px;color:#fff;text-align:center;position:absolute; width: 21px;}'+
'.gpr_comm_icon{ background: url("//ssl.gstatic.com/gb/images/h_bedf916a.png") repeat scroll 0 -274px transparent; height: 20px; width: 21px;position:absolute;top:0:right:6px;}'+
'.gpr_comm_dialog .gpr_comm_icon.gary{background-position: -26px -274px;}'+
'.gpr_mess_dialog{ white-space:nowrap;line-height: 22px;height: 22px;width:21px; float:right; padding:2px}'+
'.gpr_mess_dialog .gpr_comm_count { margin-top:0px;color:#fff;text-align:center;position:absolute; width: 21px;}'+
'.gpr_mess_dialog .gpr_comm_icon.gary{background-position: -26px -274px;background:#999;border-radius:3px;}'+ 
'.gpr_clear { clear:both;}'+
'.conent_notifications_frame .gpr_us_tools { width:28px;margin-left:-32px;}'+
'.conent_notifications_all .gpr_us_tools { margin-left:-92px;}}'+
'.conent_notifications_all .gpr_mess_list{margin:0;background-color: #F0F0F0;}'
);
if( page_check('plus.google.com/settings/') || page_check('plus.google.com/u/0/settings/') ){
//Thanks SkyArrow C http://userscripts.org/scripts/show/106681
gpr_addStyleUrl('https://sites.google.com/site/hoverzoomplus/sources/hoverzoom_115.css');
gpr_addStyle('.gset_hr{background-color: #D2D2D2; border: 0 none; height: 1px; margin: 20px 0;}'+
'.gset_item_title{font: bold 11pt arial,sans-serif; margin-bottom: 10px;}'+
'.gset_link{margin-bottom: 35px;clear: both;}'+
'.gset_title{font-size: 17pt; margin-left: 8px;padding-top: 30px;display: block;}'+
'.gset_logo{ float: left;height: 100px;width: 100px;}'+
'.gset_table{ border-spacing: 0; margin-bottom: 5px;}'+
'.gset_td_left{ vertical-align: top; width: 210px;}'+
'.gset_td_center{ vertical-align: top; width: 140px;}'+
'.gset_td_right{ vertical-align: top; padding-left: 20px;}'
);
function get_guser(init_text){
	var user = {};
	if( init_text.substr(0,3) =='var'){
		eval( init_text );
	}
	if( OZ_initData ){
		user = {'oid': OZ_initData[2][0] ,'name': encodeURI(OZ_initData[2][1][4][3]  ) };
	}else{
		var key = init_text.indexOf('https://plus.google.com/');
		init_text = init_text.substr(key,key+100);
		var tmp = init_text.match(/https:\/\/plus\.google\.com\/(\d+)/);
		user['oid'] = tmp[1];
		user['name'] =  encodeURI( $('#gbi4t').text() )
	}
	return user;
}
if ($.browser.webkit) {
	var userinit = $('body > script:last').prev().html();
}else{
	var userinit = $('body > script:last').html();
}
var guser = {};
if( userinit.substr(4,11) == 'OZ_initData'){
	guser = get_guser(userinit);
}else{
	$('body > script').each(function(i,us){
		if( us.innerHTML.substr(4,11) == 'OZ_initData')
		{
			guser = get_guser(us.innerHTML);
		}
	})
}
	jQuery.extend({
		GPR_SETTING: {
			gpr : {},
			init : function(){
				var _this = this;
				_this.gpr['menu'] = $('#nav-general').parent().parent();
				_this.gpr['gpr_setting'] = _this.list_create( $('#nav-plus') ,'nav-gprsettingpanel' , gpr_name ) ;
				_this.gpr['gpr_chat']	 = _this.list_create( $('#nav-plus') ,'nav-gprsettingchat' , T('SETTING_FEEDBACK') ) ;
				var class_array={},class_list={};
				_this.gpr.menu.children().each(function(c,b){var a=b.getAttribute("class");typeof class_array[a]!="undefined"?class_array[a]++:class_array[a]=1});
				for(x in class_array)class_array[x]==1?class_list.hover=x:class_list.none=x;
				_this.gpr['gpr_chat'].bind( ns('click.') ,function(){
					$('.' + class_list['hover'] ).attr('class', class_list['none'] ).children().children().eq(1).hide();
					$(this).parent().attr('class', class_list['hover'] ).end().children().eq(1).show();
					//$(this).unbind( ns('click.') );
					var chat_block = '<iframe src="http://mesak.wablog.info/greasemonkey/gpr_chat.htm?oid='+ guser['oid'] +'&name='+guser['name']+'" style="border: 0 none;height: 800px;width: 100%;"></iframe>';
					_this.gpr['menu'].parent().next().children(':first').html( chat_block );
				})
				_this.gpr['gpr_setting'].bind( ns('click.') ,function(){
					$('.' + class_list['hover'] ).attr('class', class_list['none'] ).children().children().eq(1).hide();
					$(this).parent().attr('class', class_list['hover'] ).end().children().eq(1).show();
					//$(this).unbind( ns('click.') );
					document.title = T('SETTING_TITLE');
					var setting_block = '<div>'+
						'<div>'+
							'<div style="font-size: 10pt;">'+
								'<div class="gset_logo"><img src="https://sites.google.com/a/wablog.info/mesak-project/documents/gpr/g-plus-reply.gif" /></div>'+
								'<span class="gset_title">'+ T('SETTING_TITLE') +' version '+version+'</span>'+
							'</div>'+
							'<div class="gset_link"><a href="">\u00AB Google+</a></div>'+
							 _this.panel_create() + 
							'<div class="gset_hr"></div>'+
							'<div id="gpr_setting_submit" tabindex="0" role="button" class="button_style greenButton">'+T('SETTING_SUBMIT')+'</div><br />'+
						'</div>'+
						'<div class="gset_hr"></div>'+
						'<div class="gset_link"><a href="http://gplus.to/mesak">Mesak Google+</a></div>'+
						'<div class="gset_link"><a href="'+install+'">'+install+'</a></div>'+
					'</div>';
					_this.gpr['menu'].parent().next().children(':first').html( setting_block );
					_this.load();
					$('#GPR_ICON').bind(ns('change.'),function(){
						$('#ROW_CUSTOM_ICON').toggle( this.value == 'CUSTOM' );
					})
					$('#GPR_TEMPLATE').bind(ns('change.'),function(){
						$('#ROW_CUSTOM_TEMPLATE').toggle( this.value == 'CUSTOM' );
					})
					$('#ROW_CUSTOM_TEMPLATE').toggle( $('#GPR_TEMPLATE')[0].value == 'CUSTOM' );
					$('#ROW_CUSTOM_ICON').toggle( $('#GPR_ICON')[0].value == 'CUSTOM' );
					$('#gpr_setting_submit').bind(ns('click.'), _this.save );
				})
				$("<div />").addClass(class_list['none']).append( _this.gpr['gpr_setting'] ).appendTo( _this.gpr['menu'] );
				$("<div />").addClass(class_list['none']).append( _this.gpr['gpr_chat'] ).appendTo( _this.gpr['menu'] );
			},
			list_create :  function( sample , id , text){
				var clone_obj=sample.clone(),clone_child=clone_obj.children();
					clone_obj.attr("id",id).removeAttr("href");
					clone_child.length==4?clone_child.eq(1).hide().end().eq(2).html(text):clone_child.eq(1).html(text);
				return clone_obj;
			},
			save : function(){
				for (p in $.Config.options){
					for (x in $.Config.options[p]){
						var NAME = x.toUpperCase();
						switch ( $.Config.options[p][x]['type'] ){
							case "select": 		gpr_setting[x] = $ById('GPR_'+NAME).value;break;
							case "checkbox":	gpr_setting[x] = $("#GPR_"+NAME ).prop("checked");break;
							case "text": 		gpr_setting[x] = $("#GPR_"+NAME ).val();break;
						}
					}
				}
				$.Config.save();
				alert( T('SETTING_SAVE') );
			},
			load : function(){
				for (p in $.Config.options){
					for (x in $.Config.options[p]){
						var NAME = x.toUpperCase();
						var val = (typeof gpr_setting[x] != 'undefined') ?  gpr_setting[x] : $.Config.options[p][x]['default'];
						switch ( $.Config.options[p][x]['type'] ){
							case "select": 	$("#GPR_"+NAME ).val(val);break;
							case "checkbox":$("#GPR_"+NAME ).prop("checked",val);break;
							case "text": 	$("#GPR_"+NAME ).val(val);break;
						}
					}
				}
			},
			set_form_row : function ( title, content){
				return '<div id="ROW_'+title+'"><table class="gset_table"><tbody><tr><td class="gset_td_left">&nbsp;&nbsp;'+T(title)+'</td><td class="gset_td_right">'+content+'</td></tr></tbody></table></div>';
			},
			row_create : function (name,element){
				var NAME = name.toUpperCase(),
					LABEL = T(element.label) || '',
					DESCRIPTION = T(element.description) || '',
					ELEMENT = this.element_cteate(NAME, element);
				return '<div id="ROW_'+NAME+'"><table class="gset_table"><tbody><tr><td class="gset_td_left">&nbsp;&nbsp;'+ LABEL +'</td><td class="gset_td_center">'+ELEMENT+'</td><td class="gset_td_right">'+ DESCRIPTION +'</td></tr></tbody></table></div>';
			},
			element_cteate : function (NAME,element){
				var ret = '',ID='GPR_' + NAME;
				switch(element.type){
					case 'text':
						ret = '<input type="text" id="'+ ID +'" size="12" />';
						break;
					case 'checkbox':
						ret = '<input type="checkbox" id="'+ ID +'" />';
						break;
					case 'select':
						ret = '<select id="'+ ID +'" >';
						if( typeof element.options == 'object'){
							for(x in element.options){
								ret +='<option value="'+x+'">'+ T(element.options[x])+'</option>';
							}
						}
						ret += '</select>';
						break;
					default:
						break
				}
				return ret;
			},
			panel_create : function(){
				var ret = '';
				for(block in $.Config.options){
					var title = 'SETTING_' + block.toUpperCase() ;
					ret +='<div class="gset_hr"></div><div class="gset_item_title">'+T(title)+'</div>';
					for(key in $.Config.options[block]){
						ret += this.row_create(key, $.Config.options[block][key] );
					}
				}
				return ret;
			}
		}
	});
	
	var gpr_setting_init = function(a){
		if($("#nav-general").parents('div:last').find("div:eq(0) > div:last > div:first").length!=0&&a<1E3) $.GPR_SETTING.init();else{var b=arguments.callee;setTimeout(function(){b(++a)},100)}
	}(1);
	
	/*
	function gpr_setting_init(a){
		if( $("#nav-general").parents('div:last').find("div:eq(0) > div:last > div:first").length!=0&&a<1E3){
			$.GPR_SETTING.init();
		}else{
			setTimeout(function(){gpr_setting_init(++a)},100)
		}
	}
	gpr_setting_init(1);
	*/
}
jQuery.fn.editor = function(oid, name){
	var $this = this;
	setTimeout(function(){
		var $editor = $this.children().last().find(editorSelector);
		$editor.append(plus(oid, name));
		placeCaretAtEnd( $editor[0] );
	}, 1);
	return this;
};
jQuery.fn.thumb = function(){
	this.each(function(){
		var img_url = $(this).attr('src');
		var thumb_size = parseInt( $.Config.get("thumb_size"),10) || 0 ;
		var thumb_url = (! img_url.match(/\?sz|\/proxy/) ) ? img_url.replace(/\/\w\d+(-\w\d*)*\/([^\/]+)$/,'/s'+thumb_size+'/$2') : img_url;
		if( img_url == thumb_url){
			 $(this).attr('thumb','false');
		}else{
			$(this).attr('thumb','true').attr('src',thumb_url);
		}
	});
	return this;
};
jQuery.extend({
	GPR:{
		page:{},
		dom:{},
		init_home : function(){
			var _this = this;
				_this.page['frame'] = page_check('notifications/frame');
				_this.page['notifications'] = page_check('notifications/all');
				_this.dom_create();
				_this.init_home_reload();
			$( ns('.mess_bar')+','+ns('.mess_content') ).live('click',function(){
				var $block = $(this).parents( ns('.block') ),
					type = ( $(this).hasClass( ns('mess_bar') ) ) ? 'close':'open';
				if(! $.Config.get("mess_autohide") && $.Config.get("mess_type") ){
					$.GPR.message_type( $block[0].id , type );
				}
				if ( $block.children().eq(1).hasClass( ns('mess_p') ) ){
					$.GPR.message_toggle( $block , type );
				}
			});
			$( ns('.mess_bar') ).live('mouseover',function(){
				$(this).css({'opacity':'1'});
			}).live('mouseleave',function(){
				$(this).animate({'opacity':'0.1'},'fast');
			})
			$( ns('.us_tools')  +' > div').live('click',function(){
				var $this = $(this);
				if( $this.hasClass( ns('btn_mute') ) ) {
					simulateClick( $this.parents(ns('.block') ).find(BTN_MUTE) );
				}
				if( $this.hasClass( ns('btn_remove') ) ) {
					$this.parents(ns('.block')).slideUp('fast',function(){$(this).remove()});
				}
			});
			$( ns('.toggle_comm') ).live('click',function(){
				$block_comment = $(this).parent().parent().children( ns('.block_comment_p') );
				$.GPR.comment_toggle( $block_comment );
			});
			$(ns('.flash_close')).live('click',function(){
				$media_flash = $(this).parent().prev();
				$media_flash.find('iframe').remove();
				$media_flash.find('img').show();
				$(this).remove();
			})
			_this.dom.c.bind('DOMNodeInserted',function(e){
				if( $.GPR.block_check(e.target.id) ){
					$.GPR.dom_block_start( $(e.target) , 0)
				}
			})
			_this.dom.c.bind('DOMNodeRemoved',function(e){
				if ( e.target.parentNode.id == this.id ){
					$.GPR.init_home_reload();
				}
			});
			if( $.Config.get("floatbar") ){
				var g_content = '<div id="gpr_gotools">'+
					'<div id="gpr_goto_top"><img src="'+IMG['BT_ARROW_TOP']+'" /></div>'+
					'<div id="gpr_goto_up"><img src="'+IMG['BT_ARROW_UP']+'" /></div>'+
					'<div id="gpr_goto_black"><img src="'+IMG['BT_ARROW_BLACK']+'" /></div>'+
					'<div id="gpr_goto_dn"><img src="'+IMG['BT_ARROW_DN']+'" /></div>'+
					'<div id="gpr_goto_bottom"><img src="'+IMG['BT_ARROW_BOTTOM']+'" /></div>'+
				'</div>';
				$('body').append(g_content);
				_this.dom['go'] = $('#gpr_gotools');
				_this.winSet();
				_this.dom['w'].bind('resize',this.winSet);
				if( $.Config.get("autonext") ){
					_this.dom['w'].bind('scroll',function(){
						  var scrollHeight = Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
						  var remain = scrollHeight - window.innerHeight - window.scrollY;
							if( remain < g.remainHeight ) simulateClick( _this.dom.load )
					})
				}
				$('#gpr_gotools > div').click(function(){
					pageMove( this.id.replace('gpr_goto_','') );
				})
			}
			if($.Config.get("mess_key")){
				_this.dom.c.bind('keyup',function(e){
					var key = e.charCode || e.keyCode || 0;
					if( $.GPR.block_check(e.target.id) ){
						switch(key){
							case 38:
								if( $.Config.get("mess_toggle") ){ $.GPR.block_toggle('PREV'); }
								break;
							case 40:
								if( $.Config.get("mess_toggle") ){ $.GPR.block_toggle('NEXT'); }
								break;
						}
						e.stopPropagation();
					}
				})
			}
			this.check_block_first( $('div[id^="update"]:first') );
		},
		init_home_reload : function(){
			$block_praent = this.dom.c.children('div:last').find('div[id^="update"]:first').parent();
			$block_praent.addClass(ns('block_p')).parent().addClass(ns('stream_p'));
			if( page_check('notifications/all') ){
				this.dom.c.children('div:last').addClass('conent_notifications_all');
				$block_praent = $('.conent_notifications_all').find('div > div:eq(1)')
			}else{
				this.dom.c.children('div:last').addClass('gpr_cpane_c')
					.find('a[href$="/stream/incoming"]').parent().parent().addClass('gpr_cpane_outsite')
					.prev().addClass('gpr_cpane_cinput').prev().addClass('gpr_cpane_ctitle').end()
			}
			
			$('div[id^=update]:not([block])').each(function(){
				$.GPR.dom_block_start( $(this) , 0 ) 
			});
			this.dom['load'] = $block_praent.next().children('span:first');
			this.autopage();
			if( $.Config.get("more_circlesload") ){
				this.circles_check();
			}
			if( $.Config.get("columns_custom") && !this.page['frame']){
				this.columns_resize();
			}
		},
		check_block_first :function( $block_first ){
			simulateClick( $block_first );
			var class_array = $block_first.attr('class').split(' ');
			if(class_array.length != 4){
				setTimeout(function(){	$.GPR.check_block_first( $block_first ) },100);
			}else{
				BLOCK_FOCUS = (class_array[2] == 'gpr_block') ? '.' +class_array[3] :  '.' +class_array[2];
			}
		},
		columns_resize :function(){
			var COL = {
				"L": parseInt( $.Config.get("columns_left") 	,10 ),
				"C": parseInt( $.Config.get("columns_center") 	,10 ),
				"R": parseInt( $.Config.get("columns_right") 	,10 )
			}
			COL['TOTAL'] = COL.L + COL.C + COL.R;
			var $c_total 	= $(ns('.content_div')),
				$c_left		= $(ns('.sideLeft')),
				$c_right 	= $(ns('.sideRight')),
				$c_center 	= $('#contentPane');
				COL.R<160 ? $c_right.hide() : $c_right.width(COL.R-2);
				COL.L<160 ? $c_left.hide() : $c_left.width(COL.L);
				$c_total.width(COL.TOTAL);
				$c_center.add( ns('.stream_p')  ).width(COL.C);
				$( ns('.cpane_cinput') ).width(COL.C-40);
		},
		circles_check :function(){
			var circlesload = $('#content a[href$="/stream/incoming"]').prev().children('span'),more = $.trim(circlesload.html());
			if( encodeURI(more) == '%E2%96%BE' ){
				simulateClick( circlesload );
			}
		},
		winSet : function(){
			$.GPR.dom['set'] = {
				'w' : $.GPR.dom['w'].width(),
				'h' : $.GPR.dom['w'].height()
			};
			if( $.Config.get("floatbar") ){
				$.GPR.dom.go.css('top', ( $.GPR.dom.set.h / 2 ) - ( $.GPR.dom.go.height() / 2) );
			}
		},
		autopage : function autopage(){
		//source form AutoPagerize;
			var scrollHeight = getScrollHeight();
			var bottom = getElementPosition( $.GPR.dom.load ).top || (Math.round(scrollHeight * 0.8));
			g.remainHeight = scrollHeight - bottom + 400;
		},
		dom_create :function(){
			this.dom['w'] = $(window);
			this.dom['c'] = $('#contentPane'),
			this.dom['cp'] = this.dom['c'].parent(),
			this.dom['widget'] = $('#notify-widget-pane');
			this.dom['bar'] = this.dom['widget'].next();
			this.dom['bar'].addClass('gpr_gbar');
			this.dom['panel'] = this.dom['bar'].next();
			this.dom['panel'].addClass('gpr_gpanel').children(':eq(0)').addClass('gpr_gpanel_c').children()
				.eq(0).addClass('gpr_gpanel_glogo').end()
				.eq(1).addClass('gpr_gpanel_gbtn');
			this.dom['cp'].addClass('gpr_content_div').children('div:first').addClass('gpr_sideLeft').children().addClass('gpr_sideLeft_c')
				.children(':eq(0)').addClass('gpr_sideLeft_profile').end()
				.children(':eq(1)').addClass('gpr_sideLeft_circles').end()
				.children(':eq(4)').addClass('gpr_sideLeft_gtalk').end();
			this.dom['cp'].children('div:last:not([id])').addClass('gpr_sideRight');
		},
		dom_block_start : function( $block ,b_time){
			if(b_time < 30){
				if( $block.attr('block') != 'first'){
					this.dom_analyze( $block );
				}
				if( $block.children().length == 1 ){
					setTimeout(function() {	$.GPR.dom_block_start($block , ++b_time); },300);
				}else{
					this.dom_analyze_menu($block);
					if( $.Config.get("thumb_gif") ){
						$('img[src$="gif"]:not([thumb])').thumb();
					}
				}
			}
		},
		dom_analyze : function($block){
			$block.attr('block','first').addClass( ns('block'))
				  .children().eq(0).addClass( ns('mess_p') );
			var $block_c = $block.children().eq(0).children();
				$block_c.eq(0).addClass( ns('block_user_p') ).end()
						.eq(1).addClass( ns('block_content_p') ).children()
							.eq(0).addClass( ns('content') ).end()
							.eq(1).addClass( ns('content_tools') ).end().end()
							.end()
						.eq(3).addClass( ns('block_post_p') ).end()
						.eq(2).addClass( ns('block_comment_p') ).children(':last')
							.addClass( ns('comment_p') ).children()
								.eq(0).addClass( ns('comment_old') ).end()
								.eq(1).addClass( ns('comment_now') )
		},
		dom_analyze_menu : function($block){
			var btn = '';
			$block.attr('block','end').children().eq(1).addClass( ns('menu_p') )
			if( $.Config.get("btn_mute") ){
				var $btn_mute = $block.find(BTN_MUTE);
				if( $btn_mute[0] ){
					var extra='';
					if( $btn_mute.hasClass( cn(BTN_MUTEC) ) ){
						 extra=' style="background-position:center -16px"';
					}
					btn +='<div class="gpr_btn_mute" title="'+ $btn_mute.text() +'"'+extra+'>&nbsp;</div>';
				}
			}
			if( $.Config.get("btn_remove") ){
				btn +='<div class="gpr_btn_remove" title="'+T('ALT_BTN_REMOVE')+'">&nbsp;</div>';
			}
			if(btn != ''){
				btn ='<span class="gpr_hr"></span>' + btn;
			}
			$block.find( ns('.block_user_p') ).append('<div class="gpr_us_tools">'+btn+'</div>');
			if(  $.Config.get("mess_toggle") && !this.page.frame ){
				this.message_create( $block );
				if(! $.Config.get("mess_autohide") && $.Config.get("mess_type") ){
					if( this.message_type( $block[0].id , 'check') ){
						this.message_toggle($block , 'close_fast');
					}
				}else if( $.Config.get("mess_autohide") ){
					this.message_toggle($block , 'close_fast');
				}
			}
			if( !this.page.frame ){
				this.comment_create( $block.find( ns('.block_comment_p') ) );
			}
			this.message_content( $block.find( ns('.block_content_p') ) );
		},
		block_check : function(id){
			if(id){return ( id.substr(0,6) == 'update' );}else{return false;}
		},
		block_toggle : function(type){
			var $block_focus = $(BLOCK_FOCUS);
			var id = $block_focus.attr('id');
			if( $.GPR.block_check(id) ){
				if( type == 'NEXT'){
					$block_now = $block_focus;
					$block_focus = $block_now.next();
					if( $.Config.get("mess_skipread") && !$.Config.get("mess_autohide")){
					    while ( $block_focus.children(ns('mess_p')).css('display') != 'block' ) {
					        if ($block_focus.size() == 0) 
					        	return false;
					        $block_focus = $block_focus.next();
					    }
				    }
				}
				if( type == 'PREV'){
					$block_now = $block_focus;
					$block_focus = $block_now.prev();
					if( $.Config.get("mess_skipread") && !$.Config.get("mess_autohide")){
					    while ( $block_focus.children(ns('mess_p')).css('display') != 'block' ) {
					        if ($block_focus.length == 0) 
					        	return false;
					        $block_focus = $block_focus.prev();
					    }
					}
				}
				if($block_now.length == 1){
					if( $block_now.find(ns('.mess_list')).next().hasClass( ns('mess_p')) ){
						$.GPR.message_toggle( $block_now , 'close_fast' );
						$.GPR.message_type(id , 'close');
					}
				}
				if($block_focus.length == 1){
					if( $block_focus.find( ns('.mess_list') ).next().hasClass(ns('mess_p')) ){
						$.GPR.message_toggle( $block_focus , 'open_fast' );
					}
					simulateClick( $block_focus[0] );
					pageMove( $block_focus.offset().top );
					g.$block_now = $block_focus;
				}
			}else{
				setTimeout(function(){ $.GPR.block_toggle(type) },100);
			}
		},
		message_content : function($block_content){
			var $media = $block_content.find('[data-content-type="application/x-shockwave-flash"]');
			if( $media.length != 0 ){
				$media.next().bind('mouseenter',function(){
					$media_flash = $(this).prev();
					if( $media_flash.find('iframe').length > 0 && $(this).find(ns('.flash_close')).length == 0 ){
						$(this).append('<span class="'+ ns('flash_close') +'">&nbsp;-&nbsp;Close</span>');
					}
				})
			}
		},
		message_create :function( $block ){
			$block.prepend('<div class="'+ ns('mess_list') +'">'+
				'<div class="'+ ns('mess_bar') +'" style="opacity:0.1">&nbsp;</div>'+
				  '<div class="'+ ns('mess_content') +'" style="display:none">'+
					'<div class="'+ ns('mess_dialog') +'">'+
					  '<span class="'+ ns('comm_icon') +'"></span>'+
					  '<span class="'+ ns('comm_count') +'">&nbsp;</span>'+
					'</div>'+
				  '</div>'+
				'</div>');
		var $user_img = $block.find( ns('.block_user_p') +' a:first'),
			$user_p = $user_img.next(),
			$user_name = $user_p.children('span:first'),
			$user_time_p = $user_p.children('span:last'),
			$user_time = $user_time_p.children('span');
			$("<div />")
				.addClass("gpr_mess_title")
				.append( $user_img.clone().attr('class', ns('mess_list_img') ))
				.append( $user_name.clone().attr('class',ns('mess_list_name') ))
				.append('<span class="'+ $user_time_p.attr('class') + '"> &nbsp;-&nbsp; <span class="'+ $user_time_p.attr('class')+'">'+ $user_time.children().text().replace(/\(.+\)/,'') +'</span> &nbsp;-&nbsp; </span>' )
				.append('<span class="gpr_mess_snippet">' + $block.find( ns('.content')+' div > div').text() + '</span>')
				.appendTo( $block.find(  ns('.mess_content') ) );
		},
		message_toggle :function( $block , type){
			var gpr_bar 	= $block.find( ns('.mess_bar')),
				gpr_content = $block.find( ns('.mess_content') ),
				gpr_mess 	= $block.find( ns('.mess_p') ),
				gpr_snippet = $block.find( ns('.mess_snippet') );
			if( type.substr(0, 4) == 'open' ){
				gpr_bar.show();
				gpr_content.hide();
				if( type == 'open_fast'){
					gpr_mess.show();
				}else{
					gpr_mess.slideDown('fast');
				}
				if( $.Config.get("mess_opcomm")){
					/*
					var $block_comment = gpr_mess.find( ns('.block_comment_p') ),
						$block_comment_toggle =  $block_comment.children(':eq(0)')
					if( $block_comment_toggle.css('display') == 'block' ){
						if( $block_comment.data('comments') != $block_comment.data('comm_show') ){
							simulateClick( $block_comment.find(ns(".comment_old")) )
							simulateClick( $block_comment_toggle);
						}
					}
					*/
				}
				$block.attr('gpr_type','open');
			}else if(type.substr(0, 5) == 'close'){
				gpr_snippet.css({'width':'30px','overflow':'hidden'})
				if( type == 'close_fast'){
					gpr_mess.hide();
					gpr_bar.hide();
					gpr_content.show();
				}else{
					gpr_mess.slideUp('fast',function(){
						gpr_bar.hide();
						gpr_content.show();
					});
				}
				$block.attr('gpr_type','close');
			}
		},
		message_type: function( id , type ){
			var id = id.replace('update-',''),
				index = $.inArray(id,block_type);
				if( type=="check" ){
					return index==-1 ?!1:!0;
				}else{ 
					type=="open" ? index !=-1 && block_type.splice(index,1):type=="close" && index==-1 && block_type.push(id);
					block_type.length>=100 && block_type.shift();
				}
				/*
				if(type == 'open'){
					if( index != -1 ){
						block_type.splice(index,1);
					}
				}else if(type == 'close'){
					if( index == -1){
						block_type.push(id);
					}
				}
				if(block_type.length >= 100){
					block_type.shift();
				}
				*/
				setValue('block_type', '["' + block_type.join('","') + '"]' );
		},
		comment_create : function( $block_comment ){
			var _this = this;
			var $block_comment_now = $block_comment.find( ns('.comment_now') );
			/*
			$block_comment.find(':first-child').live('click',function(){
				simulateClick($block_comment.find(ns(".comment_old")));
			})
			*/
			_this.comment_reload( $block_comment );
			$block_comment_now.bind('DOMNodeInserted DOMNodeRemoved',function(e){
				if( e.target.parentNode.getAttribute('class').indexOf( ns('comment_now') ) != -1 ){
					$.GPR.comment_reload( $(this).parents(ns('.block_comment_p')) );
				}
			})
		},
		comment_reload : function( $block_comment ){
			var $block = $block_comment.parents( ns('.block') ),
				comments = $block_comment.find( ns('.comment_p') ).prev().find('span:last').prev().text().match(/[0-9]+/)[0],
				comm_show = $block_comment.find( ns('.comment_now') ).children().size();
				comments = parseInt( comments ,10 );
				comm_show = parseInt( comm_show ,10 );
				if(comm_show > comments){
					comments = comm_show;
				}
			var comm_old = comments - comm_show;
				comments_data = $.data( $block_comment , 'comments'),
				$comm_count  = $block.find( ns('.comm_count') ),
				$comm_icon 	 = $block.find( ns('.comm_icon') ),
				$mess_dialog = $block.find( ns('.mess_dialog') );
				$comm_count.html( comments );
				$mess_dialog.toggle(comments > 0);
				if( comments != comments_data ){
					$comm_icon.addClass('gary');
				}else{
					$comm_count.html( comments );
					$comm_icon.removeClass('gary');
				}
				$block_comment.data('comments',  comments );
				$block_comment.data('comm_show',  comm_show );
		},
		reply_auther_create :function( $block){
			
		}
	}
})
	/*
	$('.gpr_toggle_comm').live('click',function(){
		var $this = $(this),
			$block_c = $this.parent().parent(),
			$comments_block = $block_c.children('.gpr_block_comment_p');
			$comments_block.slideToggle('normal',function(){
			    if( $comments_block.css('display') == 'none' ){
			    	if(gpr_setting.comm_tonext){
				    	var next = g.$block_now.next();
				    	if(next[0]){
				    		if( gpr_setting.chk_messtoggle){
				    			gpr_block_toggle('NEXT');
				    		}else{
					    		simulateClick( next[0] );
					    		pageMove( next.offset().top );
				    		}
				    		//simulateKeyEvent( next[0] , 74 );
				    	}
			    	}
			    	$this.css("background",'url('+IMG['TP_DN']+') no-repeat left center');
			    }else{
						gpr_toggle_comment_load($comments_block)
			    	$this.css("background",'url('+IMG['TP_UP']+') no-repeat left center');
			    }
			});
	})
	*/
function getScrollHeight() {
  return Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
}
function getElementPosition(elem) {
  elem.nodeType || (elem=elem.length==1?elem[0]:null);
  var offsetTrail = elem
  var offsetLeft = 0
  var offsetTop  = 0
  while (offsetTrail) {
    offsetLeft += offsetTrail.offsetLeft
    offsetTop += offsetTrail.offsetTop
    offsetTrail = offsetTrail.offsetParent
  }
  offsetTop = offsetTop || null
  offsetLeft = offsetLeft || null
  return {left: offsetLeft, top: offsetTop};
}
function simulateClick(e){
	e.nodeType || (e=e.length==1?e[0]:null);
	if( e )
	{
	  var Event;
	  Event = document.createEvent("MouseEvents");
	  Event.initEvent("mousedown", true, true);
	  e.dispatchEvent(Event);
	  Event = document.createEvent("MouseEvents");
	  Event.initEvent("click", true, true);
	  e.dispatchEvent(Event);
	  Event = document.createEvent("MouseEvents");
	  Event.initEvent("mouseup", true, true);
	  e.dispatchEvent(Event);
	}
}
// http://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
function placeCaretAtEnd(el) {
	el.focus();
	if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
		var range = document.createRange();
		range.selectNodeContents(el);
		range.collapse(false);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (typeof document.body.createTextRange != "undefined") {
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.collapse(false);
		textRange.select();
	}
}
TIME['load_timeout'] = 50;
TIME['load_count'] = 0;
TIME['scroll'] = 0;
function load_page_script(){
	if(TIME['load_count'] < TIME['load_timeout']){
		if( $('#data_gpr_json').size() > 0){
			var tmp_gpr_json = $.parseJSON( $('#data_gpr_json').html() );$('#data_gpr_json').remove();
			if(typeof(tmp_gpr_json) =='object'){
				gpr_json.version = tmp_gpr_json.version;
			}
			if( $.Config.get("check_update") && (parseFloat(version) * 100 < parseFloat(gpr_json.version) * 100) ){
				var nav_log = $('#notify-widget-pane').find('div:first');
				if( nav_log.size() != 0){
					var install_log = gpr_name + T('UPDATE_TITLE',gpr_json.version);
						install_log = install_log.replace('[install page]', '<a href="'+install+'">'+ T('INSTALL_PAGE') +'</a>' );
						nav_log.show()
						setTimeout(function() {
							nav_log.hide();
						},9000);
						nav_log.children().children().eq(1).html(install_log);
				}
			}
		}else{
			TIME['load_count']++;
			setTimeout(load_page_script , 100);
		}
	}
}

function pageMove(op){
	var move_scroll = 0;
	if( typeof(op) == 'number'){
		var top = parseInt( $.GPR.dom.c.css('margin-top').replace('px','') ,10) + 50 || 0;
		move_scroll = op - 50 - top;
	}else{
		switch(op){
			case 'top': 	move_scroll = 0;break;
			case 'up':		move_scroll = '-='+ $.GPR.dom.set.h +'px';break;
			case 'black': 	move_scroll = TIME['scroll'];break;
			case 'dn':		move_scroll = '+='+ $.GPR.dom.set.h +'px';break;
			case 'bottom':	move_scroll = $(document).height() ;break;
		}
	}
	TIME['scroll'] = $.GPR.dom.w.scrollTop();
	$('html ,body').animate({scrollTop:move_scroll}, 'slow');
}
if( $ById('contentPane') ){
	var ConfigCss = $.Config.get("template");
	if ( ConfigCss !== "DEFAULT") {
	    css_url = ConfigCss !== "CUSTOM" ? typeof CSS_FILE[ConfigCss] == "string" ? CSS_FILE[ConfigCss] : "" : $.Config.get("custom_template");
	    gpr_addStyleUrl(css_url)
	};
	var ConfigIcon = $.Config.get("icon");
	if (ConfigIcon !== "DEFAULT") {
	    var icon_url = ConfigIcon !== "CUSTOM" ? typeof IMG["ICON_"+ConfigIcon] == "string" ? IMG["ICON_" + ConfigIcon] : "" : $.Config.get("custom_icon");
	    gpr_addStyle("#gbi1a {background:url(" + icon_url + ") no-repeat;background-position:-21px 0px;} #gbi1a.gbid{background-position: 0px 0px;} #gbg1 #gbgs1 #gbi1.gbids{font-size:0px}")
	};
	$.GPR.init_home();
}
load_page_script();