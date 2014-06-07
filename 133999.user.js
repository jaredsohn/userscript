// ==UserScript==
// @name           Simple Ikariam Town Resources
// @namespace      http://userscripts.org/users/465257
// @downloadURL    https://userscripts.org/scripts/source/132578.user.js
// @updateURL      http://userscripts.org/scripts/source/132578.meta.js
// @include        http://s*.ikariam.com/*
// @exclude        http://board.*.ikariam.com*
// @exclude        http://*.ikariam.*/board
// @exclude        http://fr.ikariam.com/*
// @version        1.107
// ==/UserScript==
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 1.107    Typo fix
 *
 * 1.106    Fixed typo in research calc
 *          Added more informative error logging for previous areas
 *
 * 1.105    Added army total row back in
 *          Fixed finance parse when goverment bonus in effect
 *
 * 1.104    Fixed chrome date issue
 *          Fixed chrome save/load/reset/main view change issues
 *          Fixed 'vineyard' missing
 *          Fixed building tooltip values (somehow it got reverted to a way earlier version of the function)
 *          Fixed chrome slider issue
 *          Added some cleanup code to prevent cirtain leaks.
 *
 * 1.103    Fixed army movement updates
 *          Fixed townhall level issue
 *          Added cheap error handling on specific areas
 *
 * 1.002    Quick fix for army order under chrome
 *
 * 1.001    Fixed issue rendering the army table(causing fatal script error)
 *          Fixed double load issue of museum
 *
 * 1.100    Don't have the time to list at present - its a lot
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *      Based on "Ikariam Empire Board" by oliezekat
 *                      http://userscripts.org/scripts/show/41051
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 ***********************************************************************************************************************
 * Includes
 ********************************************************************************************************************* */
/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test("Â ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.21",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0}return!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0},_mouseMove:function(b){return!a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.position.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;return i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1],this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]===e)return;var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0},top:function(b,c){if(c.at[1]===e)return;var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];return!c||!c.ownerDocument?null:b?a.isFunction(b)?this.each(function(c){a(this).offset(b.call(this,c,a(this).offset()))}):this.each(function(){a.offset.setOffset(this,b)}):h.call(this)}),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&a.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.draggable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(!this.element.data("draggable"))return;return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options;return this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(b),this.handle?(c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(b){var c=this.options;return this.helper=this._createHelper(b),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0)},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp({}),!1;this.position=d.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);var d=this.element[0],e=!1;while(d&&(d=d.parentNode))d==document&&(e=!0);if(!e&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var f=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){f._trigger("stop",b)!==!1&&f._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){return this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;return a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)}),c},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute"),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top)}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.21"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f))})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e))})},drag:function(b,c){var d=a(this).data("draggable"),e=this,f=function(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h)};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset())},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left)}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left)}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t}}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(!e.length)return;var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a}),this[0].style.zIndex=f+e.length}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.resizable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
//(function(a,b){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var b=this,c=this.options;this.element.addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=c.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var d=this.handles.split(",");this.handles={};for(var e=0;e<d.length;e++){var f=a.trim(d[e]),g="ui-resizable-"+f,h=a('<div class="ui-resizable-handle '+g+'"></div>');h.css({zIndex:c.zIndex}),"se"==f&&h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[f]=".ui-resizable-"+f,this.element.append(h)}}this._renderAxis=function(b){b=b||this.element;for(var c in this.handles){this.handles[c].constructor==String&&(this.handles[c]=a(this.handles[c],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var d=a(this.handles[c],this.element),e=0;e=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth();var f=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join("");b.css(f,e),this._proportionallyResize()}if(!a(this.handles[c]).length)continue}},this._renderAxis(this.element),this._handles=a(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!b.resizing){if(this.className)var a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=a&&a[1]?a[1]:"se"}}),c.autoHide&&(this._handles.hide(),a(this.element).addClass("ui-resizable-autohide").hover(function(){if(c.disabled)return;a(this).removeClass("ui-resizable-autohide"),b._handles.show()},function(){if(c.disabled)return;b.resizing||(a(this).addClass("ui-resizable-autohide"),b._handles.hide())})),this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(b){a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var c=this.element;c.after(this.originalElement.css({position:c.css("position"),width:c.outerWidth(),height:c.outerHeight(),top:c.css("top"),left:c.css("left")})).remove()}return this.originalElement.css("resize",this.originalResizeStyle),b(this.originalElement),this},_mouseCapture:function(b){var c=!1;for(var d in this.handles)a(this.handles[d])[0]==b.target&&(c=!0);return!this.options.disabled&&c},_mouseStart:function(b){var d=this.options,e=this.element.position(),f=this.element;this.resizing=!0,this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()},(f.is(".ui-draggable")||/absolute/.test(f.css("position")))&&f.css({position:"absolute",top:e.top,left:e.left}),this._renderProxy();var g=c(this.helper.css("left")),h=c(this.helper.css("top"));d.containment&&(g+=a(d.containment).scrollLeft()||0,h+=a(d.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:g,top:h},this.size=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalSize=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalPosition={left:g,top:h},this.sizeDiff={width:f.outerWidth()-f.width(),height:f.outerHeight()-f.height()},this.originalMousePosition={left:b.pageX,top:b.pageY},this.aspectRatio=typeof d.aspectRatio=="number"?d.aspectRatio:this.originalSize.width/this.originalSize.height||1;var i=a(".ui-resizable-"+this.axis).css("cursor");return a("body").css("cursor",i=="auto"?this.axis+"-resize":i),f.addClass("ui-resizable-resizing"),this._propagate("start",b),!0},_mouseDrag:function(b){var c=this.helper,d=this.options,e={},f=this,g=this.originalMousePosition,h=this.axis,i=b.pageX-g.left||0,j=b.pageY-g.top||0,k=this._change[h];if(!k)return!1;var l=k.apply(this,[b,i,j]),m=a.browser.msie&&a.browser.version<7,n=this.sizeDiff;this._updateVirtualBoundaries(b.shiftKey);if(this._aspectRatio||b.shiftKey)l=this._updateRatio(l,b);return l=this._respectSize(l,b),this._propagate("resize",b),c.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",b,this.ui()),!1},_mouseStop:function(b){this.resizing=!1;var c=this.options,d=this;if(this._helper){var e=this._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&a.ui.hasScroll(e[0],"left")?0:d.sizeDiff.height,h=f?0:d.sizeDiff.width,i={width:d.helper.width()-h,height:d.helper.height()-g},j=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,k=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;c.animate||this.element.css(a.extend(i,{top:k,left:j})),d.helper.height(d.size.height),d.helper.width(d.size.width),this._helper&&!c.animate&&this._proportionallyResize()}return a("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(a){var b=this.options,c,e,f,g,h;h={minWidth:d(b.minWidth)?b.minWidth:0,maxWidth:d(b.maxWidth)?b.maxWidth:Infinity,minHeight:d(b.minHeight)?b.minHeight:0,maxHeight:d(b.maxHeight)?b.maxHeight:Infinity};if(this._aspectRatio||a)c=h.minHeight*this.aspectRatio,f=h.minWidth/this.aspectRatio,e=h.maxHeight*this.aspectRatio,g=h.maxWidth/this.aspectRatio,c>h.minWidth&&(h.minWidth=c),f>h.minHeight&&(h.minHeight=f),e<h.maxWidth&&(h.maxWidth=e),g<h.maxHeight&&(h.maxHeight=g);this._vBoundaries=h},_updateCache:function(a){var b=this.options;this.offset=this.helper.offset(),d(a.left)&&(this.position.left=a.left),d(a.top)&&(this.position.top=a.top),d(a.height)&&(this.size.height=a.height),d(a.width)&&(this.size.width=a.width)},_updateRatio:function(a,b){var c=this.options,e=this.position,f=this.size,g=this.axis;return d(a.height)?a.width=a.height*this.aspectRatio:d(a.width)&&(a.height=a.width/this.aspectRatio),g=="sw"&&(a.left=e.left+(f.width-a.width),a.top=null),g=="nw"&&(a.top=e.top+(f.height-a.height),a.left=e.left+(f.width-a.width)),a},_respectSize:function(a,b){var c=this.helper,e=this._vBoundaries,f=this._aspectRatio||b.shiftKey,g=this.axis,h=d(a.width)&&e.maxWidth&&e.maxWidth<a.width,i=d(a.height)&&e.maxHeight&&e.maxHeight<a.height,j=d(a.width)&&e.minWidth&&e.minWidth>a.width,k=d(a.height)&&e.minHeight&&e.minHeight>a.height;j&&(a.width=e.minWidth),k&&(a.height=e.minHeight),h&&(a.width=e.maxWidth),i&&(a.height=e.maxHeight);var l=this.originalPosition.left+this.originalSize.width,m=this.position.top+this.size.height,n=/sw|nw|w/.test(g),o=/nw|ne|n/.test(g);j&&n&&(a.left=l-e.minWidth),h&&n&&(a.left=l-e.maxWidth),k&&o&&(a.top=m-e.minHeight),i&&o&&(a.top=m-e.maxHeight);var p=!a.width&&!a.height;return p&&!a.left&&a.top?a.top=null:p&&!a.top&&a.left&&(a.left=null),a},_proportionallyResize:function(){var b=this.options;if(!this._proportionallyResizeElements.length)return;var c=this.helper||this.element;for(var d=0;d<this._proportionallyResizeElements.length;d++){var e=this._proportionallyResizeElements[d];if(!this.borderDif){var f=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],g=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];this.borderDif=a.map(f,function(a,b){var c=parseInt(a,10)||0,d=parseInt(g[b],10)||0;return c+d})}if(!a.browser.msie||!a(c).is(":hidden")&&!a(c).parents(":hidden").length)e.css({height:c.height()-this.borderDif[0]-this.borderDif[2]||0,width:c.width()-this.borderDif[1]-this.borderDif[3]||0});else continue}},_renderProxy:function(){var b=this.element,c=this.options;this.elementOffset=b.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var d=a.browser.msie&&a.browser.version<7,e=d?1:0,f=d?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+f,height:this.element.outerHeight()+f,position:"absolute",left:this.elementOffset.left-e+"px",top:this.elementOffset.top-e+"px",zIndex:++c.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(a,b,c){return{width:this.originalSize.width+b}},w:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{left:f.left+b,width:e.width-b}},n:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{top:f.top+c,height:e.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),b!="resize"&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),a.extend(a.ui.resizable,{version:"1.8.21"}),a.ui.plugin.add("resizable","alsoResize",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=function(b){a(b).each(function(){var b=a(this);b.data("resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10)})})};typeof e.alsoResize=="object"&&!e.alsoResize.parentNode?e.alsoResize.length?(e.alsoResize=e.alsoResize[0],f(e.alsoResize)):a.each(e.alsoResize,function(a){f(a)}):f(e.alsoResize)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0},i=function(b,d){a(b).each(function(){var b=a(this),e=a(this).data("resizable-alsoresize"),f={},g=d&&d.length?d:b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(g,function(a,b){var c=(e[b]||0)+(h[b]||0);c&&c>=0&&(f[b]=c||null)}),b.css(f)})};typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?a.each(e.alsoResize,function(a,b){i(a,b)}):i(e.alsoResize)},stop:function(b,c){a(this).removeData("resizable-alsoresize")}}),a.ui.plugin.add("resizable","animate",{stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d._proportionallyResizeElements,g=f.length&&/textarea/i.test(f[0].nodeName),h=g&&a.ui.hasScroll(f[0],"left")?0:d.sizeDiff.height,i=g?0:d.sizeDiff.width,j={width:d.size.width-i,height:d.size.height-h},k=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,l=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;d.element.animate(a.extend(j,l&&k?{top:l,left:k}:{}),{duration:e.animateDuration,easing:e.animateEasing,step:function(){var c={width:parseInt(d.element.css("width"),10),height:parseInt(d.element.css("height"),10),top:parseInt(d.element.css("top"),10),left:parseInt(d.element.css("left"),10)};f&&f.length&&a(f[0]).css({width:c.width,height:c.height}),d._updateCache(c),d._propagate("resize",b)}})}}),a.ui.plugin.add("resizable","containment",{start:function(b,d){var e=a(this).data("resizable"),f=e.options,g=e.element,h=f.containment,i=h instanceof a?h.get(0):/parent/.test(h)?g.parent().get(0):h;if(!i)return;e.containerElement=a(i);if(/document/.test(h)||h==document)e.containerOffset={left:0,top:0},e.containerPosition={left:0,top:0},e.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight};else{var j=a(i),k=[];a(["Top","Right","Left","Bottom"]).each(function(a,b){k[a]=c(j.css("padding"+b))}),e.containerOffset=j.offset(),e.containerPosition=j.position(),e.containerSize={height:j.innerHeight()-k[3],width:j.innerWidth()-k[1]};var l=e.containerOffset,m=e.containerSize.height,n=e.containerSize.width,o=a.ui.hasScroll(i,"left")?i.scrollWidth:n,p=a.ui.hasScroll(i)?i.scrollHeight:m;e.parentData={element:i,left:l.left,top:l.top,width:o,height:p}}},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.containerSize,g=d.containerOffset,h=d.size,i=d.position,j=d._aspectRatio||b.shiftKey,k={top:0,left:0},l=d.containerElement;l[0]!=document&&/static/.test(l.css("position"))&&(k=g),i.left<(d._helper?g.left:0)&&(d.size.width=d.size.width+(d._helper?d.position.left-g.left:d.position.left-k.left),j&&(d.size.height=d.size.width/d.aspectRatio),d.position.left=e.helper?g.left:0),i.top<(d._helper?g.top:0)&&(d.size.height=d.size.height+(d._helper?d.position.top-g.top:d.position.top),j&&(d.size.width=d.size.height*d.aspectRatio),d.position.top=d._helper?g.top:0),d.offset.left=d.parentData.left+d.position.left,d.offset.top=d.parentData.top+d.position.top;var m=Math.abs((d._helper?d.offset.left-k.left:d.offset.left-k.left)+d.sizeDiff.width),n=Math.abs((d._helper?d.offset.top-k.top:d.offset.top-g.top)+d.sizeDiff.height),o=d.containerElement.get(0)==d.element.parent().get(0),p=/relative|absolute/.test(d.containerElement.css("position"));o&&p&&(m-=d.parentData.left),m+d.size.width>=d.parentData.width&&(d.size.width=d.parentData.width-m,j&&(d.size.height=d.size.width/d.aspectRatio)),n+d.size.height>=d.parentData.height&&(d.size.height=d.parentData.height-n,j&&(d.size.width=d.size.height*d.aspectRatio))},stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.position,g=d.containerOffset,h=d.containerPosition,i=d.containerElement,j=a(d.helper),k=j.offset(),l=j.outerWidth()-d.sizeDiff.width,m=j.outerHeight()-d.sizeDiff.height;d._helper&&!e.animate&&/relative/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m}),d._helper&&!e.animate&&/static/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m})}}),a.ui.plugin.add("resizable","ghost",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size;d.ghost=d.originalElement.clone(),d.ghost.css({opacity:.25,display:"block",position:"relative",height:f.height,width:f.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof e.ghost=="string"?e.ghost:""),d.ghost.appendTo(d.helper)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})},stop:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.helper&&d.helper.get(0).removeChild(d.ghost.get(0))}}),a.ui.plugin.add("resizable","grid",{resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size,g=d.originalSize,h=d.originalPosition,i=d.axis,j=e._aspectRatio||b.shiftKey;e.grid=typeof e.grid=="number"?[e.grid,e.grid]:e.grid;var k=Math.round((f.width-g.width)/(e.grid[0]||1))*(e.grid[0]||1),l=Math.round((f.height-g.height)/(e.grid[1]||1))*(e.grid[1]||1);/^(se|s|e)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l):/^(ne)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l):/^(sw)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.left=h.left-k):(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l,d.position.left=h.left-k)}});var c=function(a){return parseInt(a,10)||0},d=function(a){return!isNaN(parseInt(a,10))}})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.button.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c,d,e,f,g="ui-button ui-widget ui-state-default ui-corner-all",h="ui-state-hover ui-state-active ",i="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",j=function(){var b=a(this).find(":ui-button");setTimeout(function(){b.button("refresh")},1)},k=function(b){var c=b.name,d=b.form,e=a([]);return c&&(d?e=a(d).find("[name='"+c+"']"):e=a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form})),e};a.widget("ui.button",{options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",j),typeof this.options.disabled!="boolean"?this.options.disabled=!!this.element.propAttr("disabled"):this.element.propAttr("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var b=this,h=this.options,i=this.type==="checkbox"||this.type==="radio",l="ui-state-hover"+(i?"":" ui-state-active"),m="ui-state-focus";h.label===null&&(h.label=this.buttonElement.html()),this.buttonElement.addClass(g).attr("role","button").bind("mouseenter.button",function(){if(h.disabled)return;a(this).addClass("ui-state-hover"),this===c&&a(this).addClass("ui-state-active")}).bind("mouseleave.button",function(){if(h.disabled)return;a(this).removeClass(l)}).bind("click.button",function(a){h.disabled&&(a.preventDefault(),a.stopImmediatePropagation())}),this.element.bind("focus.button",function(){b.buttonElement.addClass(m)}).bind("blur.button",function(){b.buttonElement.removeClass(m)}),i&&(this.element.bind("change.button",function(){if(f)return;b.refresh()}),this.buttonElement.bind("mousedown.button",function(a){if(h.disabled)return;f=!1,d=a.pageX,e=a.pageY}).bind("mouseup.button",function(a){if(h.disabled)return;if(d!==a.pageX||e!==a.pageY)f=!0})),this.type==="checkbox"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).toggleClass("ui-state-active"),b.buttonElement.attr("aria-pressed",b.element[0].checked)}):this.type==="radio"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).addClass("ui-state-active"),b.buttonElement.attr("aria-pressed","true");var c=b.element[0];k(c).not(c).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown.button",function(){if(h.disabled)return!1;a(this).addClass("ui-state-active"),c=this,a(document).one("mouseup",function(){c=null})}).bind("mouseup.button",function(){if(h.disabled)return!1;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(b){if(h.disabled)return!1;(b.keyCode==a.ui.keyCode.SPACE||b.keyCode==a.ui.keyCode.ENTER)&&a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})),this._setOption("disabled",h.disabled),this._resetButton()},_determineButtonType:function(){this.element.is(":checkbox")?this.type="checkbox":this.element.is(":radio")?this.type="radio":this.element.is("input")?this.type="input":this.type="button";if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),b="label[for='"+this.element.attr("id")+"']";this.buttonElement=a.find(b),this.buttonElement.length||(a=a.length?a.siblings():this.element.siblings(),this.buttonElement=a.filter(b),this.buttonElement.length||(this.buttonElement=a.find(b))),this.element.addClass("ui-helper-hidden-accessible");var c=this.element.is(":checked");c&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.attr("aria-pressed",c)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(g+" "+h+" "+i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title"),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled"){c?this.element.propAttr("disabled",!0):this.element.propAttr("disabled",!1);return}this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b),this.type==="radio"?k(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if(this.type==="input"){this.options.label&&this.element.val(this.options.label);return}var b=this.buttonElement.removeClass(i),c=a("<span></span>",this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary,f=[];d.primary||d.secondary?(this.options.text&&f.push("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary")),d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>"),d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>"),this.options.text||(f.push(e?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||b.attr("title",c))):f.push("ui-button-text-only"),b.addClass(f.join(" "))}}),a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c),a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var b=this.element.css("direction")==="rtl";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(b?"ui-corner-left":"ui-corner-right").end().end()},destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"),a.Widget.prototype.destroy.call(this)}})})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.dialog.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c="ui-dialog ui-widget ui-widget-content ui-corner-all ",d={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},e={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},f=a.attrFn||{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0,click:!0};a.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;var b=this,d=b.options,e=d.title||"&#160;",f=a.ui.dialog.getTitleId(b.element),g=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass(c+d.dialogClass).css({zIndex:d.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(c){d.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(a){b.moveToTop(!1,a)}),h=b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),i=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),j=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){j.addClass("ui-state-hover")},function(){j.removeClass("ui-state-hover")}).focus(function(){j.addClass("ui-state-focus")}).blur(function(){j.removeClass("ui-state-focus")}).click(function(a){return b.close(a),!1}).appendTo(i),k=(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),l=a("<span></span>").addClass("ui-dialog-title").attr("id",f).html(e).prependTo(i);a.isFunction(d.beforeclose)&&!a.isFunction(d.beforeClose)&&(d.beforeClose=d.beforeclose),i.find("*").add(i).disableSelection(),d.draggable&&a.fn.draggable&&b._makeDraggable(),d.resizable&&a.fn.resizable&&b._makeResizable(),b._createButtons(d.buttons),b._isOpen=!1,a.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;return a.overlay&&a.overlay.destroy(),a.uiDialog.hide(),a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),a.uiDialog.remove(),a.originalTitle&&a.element.attr("title",a.originalTitle),a},widget:function(){return this.uiDialog},close:function(b){var c=this,d,e;if(!1===c._trigger("beforeClose",b))return;return c.overlay&&c.overlay.destroy(),c.uiDialog.unbind("keypress.ui-dialog"),c._isOpen=!1,c.options.hide?c.uiDialog.hide(c.options.hide,function(){c._trigger("close",b)}):(c.uiDialog.hide(),c._trigger("close",b)),a.ui.dialog.overlay.resize(),c.options.modal&&(d=0,a(".ui-dialog").each(function(){this!==c.uiDialog[0]&&(e=a(this).css("z-index"),isNaN(e)||(d=Math.max(d,e)))}),a.ui.dialog.maxZ=d),c},isOpen:function(){return this._isOpen},moveToTop:function(b,c){var d=this,e=d.options,f;return e.modal&&!b||!e.stack&&!e.modal?d._trigger("focus",c):(e.zIndex>a.ui.dialog.maxZ&&(a.ui.dialog.maxZ=e.zIndex),d.overlay&&(a.ui.dialog.maxZ+=1,d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)),f={scrollTop:d.element.scrollTop(),scrollLeft:d.element.scrollLeft()},a.ui.dialog.maxZ+=1,d.uiDialog.css("z-index",a.ui.dialog.maxZ),d.element.attr(f),d._trigger("focus",c),d)},open:function(){if(this._isOpen)return;var b=this,c=b.options,d=b.uiDialog;return b.overlay=c.modal?new a.ui.dialog.overlay(b):null,b._size(),b._position(c.position),d.show(c.show),b.moveToTop(!0),c.modal&&d.bind("keydown.ui-dialog",function(b){if(b.keyCode!==a.ui.keyCode.TAB)return;var c=a(":tabbable",this),d=c.filter(":first"),e=c.filter(":last");if(b.target===e[0]&&!b.shiftKey)return d.focus(1),!1;if(b.target===d[0]&&b.shiftKey)return e.focus(1),!1}),a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),b._isOpen=!0,b._trigger("open"),b},_createButtons:function(b){var c=this,d=!1,e=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);c.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof b=="object"&&b!==null&&a.each(b,function(){return!(d=!0)}),d&&(a.each(b,function(b,d){d=a.isFunction(d)?{click:d,text:b}:d;var e=a('<button type="button"></button>').click(function(){d.click.apply(c.element[0],arguments)}).appendTo(g);a.each(d,function(a,b){if(a==="click")return;a in f?e[a](b):e.attr(a,b)}),a.fn.button&&e.button()}),e.appendTo(c.uiDialog))},_makeDraggable:function(){function f(a){return{position:a.position,offset:a.offset}}var b=this,c=b.options,d=a(document),e;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(d,g){e=c.height==="auto"?"auto":a(this).height(),a(this).height(a(this).height()).addClass("ui-dialog-dragging"),b._trigger("dragStart",d,f(g))},drag:function(a,c){b._trigger("drag",a,f(c))},stop:function(g,h){c.position=[h.position.left-d.scrollLeft(),h.position.top-d.scrollTop()],a(this).removeClass("ui-dialog-dragging").height(e),b._trigger("dragStop",g,f(h)),a.ui.dialog.overlay.resize()}})},_makeResizable:function(c){function h(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}c=c===b?this.options.resizable:c;var d=this,e=d.options,f=d.uiDialog.css("position"),g=typeof c=="string"?c:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:g,start:function(b,c){a(this).addClass("ui-dialog-resizing"),d._trigger("resizeStart",b,h(c))},resize:function(a,b){d._trigger("resize",a,h(b))},stop:function(b,c){a(this).removeClass("ui-dialog-resizing"),e.height=a(this).height(),e.width=a(this).width(),d._trigger("resizeStop",b,h(c)),a.ui.dialog.overlay.resize()}}).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(b){var c=[],d=[0,0],e;if(b){if(typeof b=="string"||typeof b=="object"&&"0"in b)c=b.split?b.split(" "):[b[0],b[1]],c.length===1&&(c[1]=c[0]),a.each(["left","top"],function(a,b){+c[a]===c[a]&&(d[a]=c[a],c[a]=b)}),b={my:c.join(" "),at:c.join(" "),offset:d.join(" ")};b=a.extend({},a.ui.dialog.prototype.options.position,b)}else b=a.ui.dialog.prototype.options.position;e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},b)),e||this.uiDialog.hide()},_setOptions:function(b){var c=this,f={},g=!1;a.each(b,function(a,b){c._setOption(a,b),a in d&&(g=!0),a in e&&(f[a]=b)}),g&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",f)},_setOption:function(b,d){var e=this,f=e.uiDialog;switch(b){case"beforeclose":b="beforeClose";break;case"buttons":e._createButtons(d);break;case"closeText":e.uiDialogTitlebarCloseText.text(""+d);break;case"dialogClass":f.removeClass(e.options.dialogClass).addClass(c+d);break;case"disabled":d?f.addClass("ui-dialog-disabled"):f.removeClass("ui-dialog-disabled");break;case"draggable":var g=f.is(":data(draggable)");g&&!d&&f.draggable("destroy"),!g&&d&&e._makeDraggable();break;case"position":e._position(d);break;case"resizable":var h=f.is(":data(resizable)");h&&!d&&f.resizable("destroy"),h&&typeof d=="string"&&f.resizable("option","handles",d),!h&&d!==!1&&e._makeResizable(d);break;case"title":a(".ui-dialog-title",e.uiDialogTitlebar).html(""+(d||"&#160;"))}a.Widget.prototype._setOption.apply(e,arguments)},_size:function(){var b=this.options,c,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),b.minWidth>b.width&&(b.width=b.minWidth),c=this.uiDialog.css({height:"auto",width:b.width}).height(),d=Math.max(0,b.minHeight-c);if(b.height==="auto")if(a.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();var f=this.element.css("height","auto").height();e||this.uiDialog.hide(),this.element.height(Math.max(f,d))}else this.element.height(Math.max(b.height-c,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),a.extend(a.ui.dialog,{version:"1.8.21",uuid:0,maxZ:0,getTitleId:function(a){var b=a.attr("id");return b||(this.uuid+=1,b=this.uuid),"ui-dialog-title-"+b},overlay:function(b){this.$el=a.ui.dialog.overlay.create(b)}}),a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(b){this.instances.length===0&&(setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return!1})},1),a(document).bind("keydown.dialog-overlay",function(c){b.options.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}),a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize));var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});return a.fn.bgiframe&&c.bgiframe(),this.instances.push(c),c},destroy:function(b){var c=a.inArray(b,this.instances);c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]),this.instances.length===0&&a([document,window]).unbind(".dialog-overlay"),b.remove();var d=0;a.each(this.instances,function(){d=Math.max(d,this.css("z-index"))}),this.maxZ=d},height:function(){var b,c;return a.browser.msie&&a.browser.version<7?(b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),b<c?a(window).height()+"px":b+"px"):a(document).height()+"px"},width:function(){var b,c;return a.browser.msie?(b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),b<c?a(window).width()+"px":b+"px"):a(document).width()+"px"},resize:function(){var b=a([]);a.each(a.ui.dialog.overlay.instances,function(){b=b.add(this)}),b.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}}),a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.tabs.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function e(){return++c}function f(){return++d}var c=0,d=0;a.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:!1,cookie:null,collapsible:!1,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(!0)},_setOption:function(a,b){if(a=="selected"){if(this.options.collapsible&&b==this.options.selected)return;this.select(b)}else this.options[a]=b,this._tabify()},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+e()},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+f());return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(a,b){return{tab:a,panel:b,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(c){function m(b,c){b.css("display",""),!a.support.opacity&&c.opacity&&b[0].style.removeAttribute("filter")}var d=this,e=this.options,f=/^#.+/;this.list=this.element.find("ol,ul").eq(0),this.lis=a(" > li:has(a[href])",this.list),this.anchors=this.lis.map(function(){return a("a",this)[0]}),this.panels=a([]),this.anchors.each(function(b,c){var g=a(c).attr("href"),h=g.split("#")[0],i;h&&(h===location.toString().split("#")[0]||(i=a("base")[0])&&h===i.href)&&(g=c.hash,c.href=g);if(f.test(g))d.panels=d.panels.add(d.element.find(d._sanitizeSelector(g)));else if(g&&g!=="#"){a.data(c,"href.tabs",g),a.data(c,"load.tabs",g.replace(/#.*$/,""));var j=d._tabId(c);c.href="#"+j;var k=d.element.find("#"+j);k.length||(k=a(e.panelTemplate).attr("id",j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(d.panels[b-1]||d.list),k.data("destroy.tabs",!0)),d.panels=d.panels.add(k)}else e.disabled.push(b)}),c?(this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.lis.addClass("ui-state-default ui-corner-top"),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"),e.selected===b?(location.hash&&this.anchors.each(function(a,b){if(b.hash==location.hash)return e.selected=a,!1}),typeof e.selected!="number"&&e.cookie&&(e.selected=parseInt(d._cookie(),10)),typeof e.selected!="number"&&this.lis.filter(".ui-tabs-selected").length&&(e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))),e.selected=e.selected||(this.lis.length?0:-1)):e.selected===null&&(e.selected=-1),e.selected=e.selected>=0&&this.anchors[e.selected]||e.selected<0?e.selected:0,e.disabled=a.unique(e.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(a,b){return d.lis.index(a)}))).sort(),a.inArray(e.selected,e.disabled)!=-1&&e.disabled.splice(a.inArray(e.selected,e.disabled),1),this.panels.addClass("ui-tabs-hide"),this.lis.removeClass("ui-tabs-selected ui-state-active"),e.selected>=0&&this.anchors.length&&(d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass("ui-tabs-hide"),this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"),d.element.queue("tabs",function(){d._trigger("show",null,d._ui(d.anchors[e.selected],d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]))}),this.load(e.selected)),a(window).bind("unload",function(){d.lis.add(d.anchors).unbind(".tabs"),d.lis=d.anchors=d.panels=null})):e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected")),this.element[e.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible"),e.cookie&&this._cookie(e.selected,e.cookie);for(var g=0,h;h=this.lis[g];g++)a(h)[a.inArray(g,e.disabled)!=-1&&!a(h).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");e.cache===!1&&this.anchors.removeData("cache.tabs"),this.lis.add(this.anchors).unbind(".tabs");if(e.event!=="mouseover"){var i=function(a,b){b.is(":not(.ui-state-disabled)")&&b.addClass("ui-state-"+a)},j=function(a,b){b.removeClass("ui-state-"+a)};this.lis.bind("mouseover.tabs",function(){i("hover",a(this))}),this.lis.bind("mouseout.tabs",function(){j("hover",a(this))}),this.anchors.bind("focus.tabs",function(){i("focus",a(this).closest("li"))}),this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var k,l;e.fx&&(a.isArray(e.fx)?(k=e.fx[0],l=e.fx[1]):k=l=e.fx);var n=l?function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.hide().removeClass("ui-tabs-hide").animate(l,l.duration||"normal",function(){m(c,l),d._trigger("show",null,d._ui(b,c[0]))})}:function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.removeClass("ui-tabs-hide"),d._trigger("show",null,d._ui(b,c[0]))},o=k?function(a,b){b.animate(k,k.duration||"normal",function(){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),m(b,k),d.element.dequeue("tabs")})}:function(a,b,c){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),d.element.dequeue("tabs")};this.anchors.bind(e.event+".tabs",function(){var b=this,c=a(b).closest("li"),f=d.panels.filter(":not(.ui-tabs-hide)"),g=d.element.find(d._sanitizeSelector(b.hash));if(c.hasClass("ui-tabs-selected")&&!e.collapsible||c.hasClass("ui-state-disabled")||c.hasClass("ui-state-processing")||d.panels.filter(":animated").length||d._trigger("select",null,d._ui(this,g[0]))===!1)return this.blur(),!1;e.selected=d.anchors.index(this),d.abort();if(e.collapsible){if(c.hasClass("ui-tabs-selected"))return e.selected=-1,e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){o(b,f)}).dequeue("tabs"),this.blur(),!1;if(!f.length)return e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){n(b,g)}),d.load(d.anchors.index(this)),this.blur(),!1}e.cookie&&d._cookie(e.selected,e.cookie);if(g.length)f.length&&d.element.queue("tabs",function(){o(b,f)}),d.element.queue("tabs",function(){n(b,g)}),d.load(d.anchors.index(this));else throw"jQuery UI Tabs: Mismatching fragment identifier.";a.browser.msie&&this.blur()}),this.anchors.bind("click.tabs",function(){return!1})},_getIndex:function(a){return typeof a=="string"&&(a=this.anchors.index(this.anchors.filter("[href$='"+a+"']"))),a},destroy:function(){var b=this.options;return this.abort(),this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.anchors.each(function(){var b=a.data(this,"href.tabs");b&&(this.href=b);var c=a(this).unbind(".tabs");a.each(["href","load","cache"],function(a,b){c.removeData(b+".tabs")})}),this.lis.unbind(".tabs").add(this.panels).each(function(){a.data(this,"destroy.tabs")?a(this).remove():a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}),b.cookie&&this._cookie(null,b.cookie),this},add:function(c,d,e){e===b&&(e=this.anchors.length);var f=this,g=this.options,h=a(g.tabTemplate.replace(/#\{href\}/g,c).replace(/#\{label\}/g,d)),i=c.indexOf("#")?this._tabId(a("a",h)[0]):c.replace("#","");h.addClass("ui-state-default ui-corner-top").data("destroy.tabs",!0);var j=f.element.find("#"+i);return j.length||(j=a(g.panelTemplate).attr("id",i).data("destroy.tabs",!0)),j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),e>=this.lis.length?(h.appendTo(this.list),j.appendTo(this.list[0].parentNode)):(h.insertBefore(this.lis[e]),j.insertBefore(this.panels[e])),g.disabled=a.map(g.disabled,function(a,b){return a>=e?++a:a}),this._tabify(),this.anchors.length==1&&(g.selected=0,h.addClass("ui-tabs-selected ui-state-active"),j.removeClass("ui-tabs-hide"),this.element.queue("tabs",function(){f._trigger("show",null,f._ui(f.anchors[0],f.panels[0]))}),this.load(0)),this._trigger("add",null,this._ui(this.anchors[e],this.panels[e])),this},remove:function(b){b=this._getIndex(b);var c=this.options,d=this.lis.eq(b).remove(),e=this.panels.eq(b).remove();return d.hasClass("ui-tabs-selected")&&this.anchors.length>1&&this.select(b+(b+1<this.anchors.length?1:-1)),c.disabled=a.map(a.grep(c.disabled,function(a,c){return a!=b}),function(a,c){return a>=b?--a:a}),this._tabify(),this._trigger("remove",null,this._ui(d.find("a")[0],e[0])),this},enable:function(b){b=this._getIndex(b);var c=this.options;if(a.inArray(b,c.disabled)==-1)return;return this.lis.eq(b).removeClass("ui-state-disabled"),c.disabled=a.grep(c.disabled,function(a,c){return a!=b}),this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b])),this},disable:function(a){a=this._getIndex(a);var b=this,c=this.options;return a!=c.selected&&(this.lis.eq(a).addClass("ui-state-disabled"),c.disabled.push(a),c.disabled.sort(),this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a]))),this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;return this.anchors.eq(a).trigger(this.options.event+".tabs"),this},load:function(b){b=this._getIndex(b);var c=this,d=this.options,e=this.anchors.eq(b)[0],f=a.data(e,"load.tabs");this.abort();if(!f||this.element.queue("tabs").length!==0&&a.data(e,"cache.tabs")){this.element.dequeue("tabs");return}this.lis.eq(b).addClass("ui-state-processing");if(d.spinner){var g=a("span",e);g.data("label.tabs",g.html()).html(d.spinner)}return this.xhr=a.ajax(a.extend({},d.ajaxOptions,{url:f,success:function(f,g){c.element.find(c._sanitizeSelector(e.hash)).html(f),c._cleanup(),d.cache&&a.data(e,"cache.tabs",!0),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.success(f,g)}catch(h){}},error:function(a,f,g){c._cleanup(),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.error(a,f,b,e)}catch(g){}}})),c.element.dequeue("tabs"),this},abort:function(){return this.element.queue([]),this.panels.stop(!1,!0),this.element.queue("tabs",this.element.queue("tabs").splice(-2,2)),this.xhr&&(this.xhr.abort(),delete this.xhr),this._cleanup(),this},url:function(a,b){return this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",b),this},length:function(){return this.anchors.length}}),a.extend(a.ui.tabs,{version:"1.8.21"}),a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(a,b){var c=this,d=this.options,e=c._rotate||(c._rotate=function(b){clearTimeout(c.rotation),c.rotation=setTimeout(function(){var a=d.selected;c.select(++a<c.anchors.length?a:0)},a),b&&b.stopPropagation()}),f=c._unrotate||(c._unrotate=b?function(a){e()}:function(a){a.clientX&&c.rotate(null)});return a?(this.element.bind("tabsshow",e),this.anchors.bind(d.event+".tabs",f),e()):(clearTimeout(c.rotation),this.element.unbind("tabsshow",e),this.anchors.unbind(d.event+".tabs",f),delete this._rotate,delete this._unrotate),this}})})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.progressbar.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove(),a.Widget.prototype.destroy.apply(this,arguments)},value:function(a){return a===b?this._value():(this._setOption("value",a),this)},_setOption:function(b,c){b==="value"&&(this.options.value=c,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),a.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;return typeof a!="number"&&(a=0),Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var a=this.value(),b=this._percentage();this.oldValue!==a&&(this.oldValue=a,this._trigger("change")),this.valueDiv.toggle(a>this.min).toggleClass("ui-corner-right",a===this.options.max).width(b.toFixed(0)+"%"),this.element.attr("aria-valuenow",a)}}),a.extend(a.ui.progressbar,{version:"1.8.21"})})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
jQuery.effects||function(a,b){function c(b){var c;return b&&b.constructor==Array&&b.length==3?b:(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))?[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)]:(c=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))?[parseFloat(c[1])*2.55,parseFloat(c[2])*2.55,parseFloat(c[3])*2.55]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))?[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)]:(c=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))?[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)]:(c=/rgba\(0, 0, 0, 0\)/.exec(b))?e.transparent:e[a.trim(b).toLowerCase()]}function d(b,d){var e;do{e=a.curCSS(b,d);if(e!=""&&e!="transparent"||a.nodeName(b,"body"))break;d="backgroundColor"}while(b=b.parentNode);return c(e)}function h(){var a=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,b={},c,d;if(a&&a.length&&a[0]&&a[a[0]]){var e=a.length;while(e--)c=a[e],typeof a[c]=="string"&&(d=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),b[d]=a[c])}else for(c in a)typeof a[c]=="string"&&(b[c]=a[c]);return b}function i(b){var c,d;for(c in b)d=b[c],(d==null||a.isFunction(d)||c in g||/scrollbar/.test(c)||!/color/i.test(c)&&isNaN(parseFloat(d)))&&delete b[c];return b}function j(a,b){var c={_:0},d;for(d in b)a[d]!=b[d]&&(c[d]=b[d]);return c}function k(b,c,d,e){typeof b=="object"&&(e=c,d=null,c=b,b=c.effect),a.isFunction(c)&&(e=c,d=null,c={});if(typeof c=="number"||a.fx.speeds[c])e=d,d=c,c={};return a.isFunction(d)&&(e=d,d=null),c=c||{},d=d||c.duration,d=a.fx.off?0:typeof d=="number"?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,e=e||c.complete,[b,c,d,e]}function l(b){return!b||typeof b=="number"||a.fx.speeds[b]?!0:typeof b=="string"&&!a.effects[b]?!0:!1}a.effects={},a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(b,e){a.fx.step[e]=function(a){a.colorInit||(a.start=d(a.elem,e),a.end=c(a.end),a.colorInit=!0),a.elem.style[e]="rgb("+Math.max(Math.min(parseInt(a.pos*(a.end[0]-a.start[0])+a.start[0],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[1]-a.start[1])+a.start[1],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[2]-a.start[2])+a.start[2],10),255),0)+")"}});var e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},f=["add","remove","toggle"],g={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(b,c,d,e){return a.isFunction(d)&&(e=d,d=null),this.queue(function(){var g=a(this),k=g.attr("style")||" ",l=i(h.call(this)),m,n=g.attr("class")||"";a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),m=i(h.call(this)),g.attr("class",n),g.animate(j(l,m),{queue:!1,duration:c,easing:d,complete:function(){a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),typeof g.attr("style")=="object"?(g.attr("style").cssText="",g.attr("style").cssText=k):g.attr("style",k),e&&e.apply(this,arguments),a.dequeue(this)}})})},a.fn.extend({_addClass:a.fn.addClass,addClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{add:b},c,d,e]):this._addClass(b)},_removeClass:a.fn.removeClass,removeClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{remove:b},c,d,e]):this._removeClass(b)},_toggleClass:a.fn.toggleClass,toggleClass:function(c,d,e,f,g){return typeof d=="boolean"||d===b?e?a.effects.animateClass.apply(this,[d?{add:c}:{remove:c},e,f,g]):this._toggleClass(c,d):a.effects.animateClass.apply(this,[{toggle:c},d,e,f])},switchClass:function(b,c,d,e,f){return a.effects.animateClass.apply(this,[{add:c,remove:b},d,e,f])}}),a.extend(a.effects,{version:"1.8.21",save:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.data("ec.storage."+b[c],a[0].style[b[c]])},restore:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.css(b[c],a.data("ec.storage."+b[c]))},setMode:function(a,b){return b=="toggle"&&(b=a.is(":hidden")?"show":"hide"),b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e=document.activeElement;try{e.id}catch(f){e=document.body}return b.wrap(d),(b[0]===e||a.contains(b[0],e))&&a(e).focus(),d=b.parent(),b.css("position")=="static"?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),d.css(c).show()},removeWrapper:function(b){var c,d=document.activeElement;return b.parent().is(".ui-effects-wrapper")?(c=b.parent().replaceWith(b),(b[0]===d||a.contains(b[0],d))&&a(d).focus(),c):b},setTransition:function(b,c,d,e){return e=e||{},a.each(c,function(a,c){var f=b.cssUnit(c);f[0]>0&&(e[c]=f[0]*d+f[1])}),e}}),a.fn.extend({effect:function(b,c,d,e){var f=k.apply(this,arguments),g={options:f[1],duration:f[2],callback:f[3]},h=g.options.mode,i=a.effects[b];return a.fx.off||!i?h?this[h](g.duration,g.callback):this.each(function(){g.callback&&g.callback.call(this)}):i.call(this,g)},_show:a.fn.show,show:function(a){if(l(a))return this._show.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="show",this.effect.apply(this,b)},_hide:a.fn.hide,hide:function(a){if(l(a))return this._hide.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="hide",this.effect.apply(this,b)},__toggle:a.fn.toggle,toggle:function(b){if(l(b)||typeof b=="boolean"||a.isFunction(b))return this.__toggle.apply(this,arguments);var c=k.apply(this,arguments);return c[1].mode="toggle",this.effect.apply(this,c)},cssUnit:function(b){var c=this.css(b),d=[];return a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])}),d}}),a.easing.jswing=a.easing.swing,a.extend(a.easing,{def:"easeOutQuad",swing:function(b,c,d,e,f){return a.easing[a.easing.def](b,c,d,e,f)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return b==0?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;g||(g=e*.3*1.5);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return b<1?-0.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),e*(c/=f)*c*((g+1)*c-g)+d},easeOutBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),e*((c=c/f-1)*c*((g+1)*c+g)+1)+d},easeInOutBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),(c/=f/2)<1?e/2*c*c*(((g*=1.525)+1)*c-g)+d:e/2*((c-=2)*c*(((g*=1.525)+1)*c+g)+2)+d},easeInBounce:function(b,c,d,e,f){return e-a.easing.easeOutBounce(b,f-c,0,e,f)+d},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(b,c,d,e,f){return c<f/2?a.easing.easeInBounce(b,c*2,0,e,f)*.5+d:a.easing.easeOutBounce(b,c*2-f,0,e,f)*.5+e*.5+d}})}(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.fade.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.fade=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"hide");c.animate({opacity:d},{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.pulsate.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
//(function(a,b){a.effects.pulsate=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"show"),e=(b.options.times||5)*2-1,f=b.duration?b.duration/2:a.fx.speeds._default/2,g=c.is(":visible"),h=0;g||(c.css("opacity",0).show(),h=1),(d=="hide"&&g||d=="show"&&!g)&&e--;for(var i=0;i<e;i++)c.animate({opacity:h},f,b.options.easing),h=(h+1)%2;c.animate({opacity:h},f,b.options.easing,function(){h==0&&c.hide(),b.callback&&b.callback.apply(this,arguments)}),c.queue("fx",function(){c.dequeue()}).dequeue()})}})(jQuery);;

/*
 * TipTip Modification
 * original : http://code.drewwilson.com/entry/tiptip-jquery-plugin
 */
//(function(a){a.fn.tipTip=function(b){var c={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var d=a.extend(c,b);if(a(".ui-tooltip").length<=0){var e=a('<div id="tiptip_holder" style="max-width:'+d.maxWidth+';"></div>');var f=a('<div id="tiptip_content"></div>');var g=a('<div id="tiptip_arrow"></div>');a("body").append(e.html(f).prepend(g.html('<div id="tiptip_arrow_inner"></div>')))}else{var e=a(".ui-tooltip");var f=a(".ui-tooltip");var g=a("#tiptip_arrow")}return this.each(function(){var b=a(this);if(d.content){var c=d.content}else{var c=b.attr(d.attribute)}if(c!=""){if(!d.content){b.removeAttr(d.attribute)}var h=false,i=false;if(d.activation=="hover"){b.hover(function(){j()},function(){if(!d.keepAlive){k()}});if(d.keepAlive){e.hover(function(){},function(){k()})}}else if(d.activation=="focus"){b.focus(function(){j()}).blur(function(){k()})}else if(d.activation=="click"){b.click(function(){j();return false}).hover(function(){},function(){if(!d.keepAlive){k()}});if(d.keepAlive){e.hover(function(){},function(){k()})}}function j(){d.enter.call(this);i=setInterval(function(){if(d.content){c=d.content}else if(b.attr(d.attribute)){c=b.attr(d.attribute);if(c!="")b.removeAttr(d.attribute)}f.html(c)},1000);if(d.content){c=d.content}else if(b.attr(d.attribute)){c=b.attr(d.attribute);if(c!="")b.removeAttr(d.attribute)}f.html(c);e.hide().removeAttr("class").css("margin","0");g.removeAttr("style");var j=parseInt(b.offset()["top"]);var k=parseInt(b.offset()["left"]);var l=parseInt(b.outerWidth());var m=parseInt(b.outerHeight());var n=e.outerWidth();var o=e.outerHeight();var p=Math.round((l-n)/2);var q=Math.round((m-o)/2);var r=Math.round(k+p);var s=Math.round(j+m+d.edgeOffset);var t="";var u="";var v=Math.round(n-12)/2;if(d.defaultPosition=="bottom"){t="_bottom"}else if(d.defaultPosition=="top"){t="_top"}else if(d.defaultPosition=="left"){t="_left"}else if(d.defaultPosition=="right"){t="_right"}var w=p+k<parseInt(a(window).scrollLeft());var x=n+k>parseInt(a(window).width());if(w&&p<0||t=="_right"&&!x||t=="_left"&&k<n+d.edgeOffset+5){t="_right";u=Math.round(o-13)/2;v=-12;r=Math.round(k+l+d.edgeOffset);s=Math.round(j+q)}else if(x&&p<0||t=="_left"&&!w){t="_left";u=Math.round(o-13)/2;v=Math.round(n);r=Math.round(k-(n+d.edgeOffset+5));s=Math.round(j+q)}var y=j+m+d.edgeOffset+o+8>parseInt(a(window).height()+a(window).scrollTop());var z=j+m-(d.edgeOffset+o+8)<0;if(y||t=="_bottom"&&y||t=="_top"&&!z){if(t=="_top"||t=="_bottom"){t="_top"}else{t=t+"_top"}u=o;s=Math.round(j-(o+5+d.edgeOffset))}else if(z|(t=="_top"&&z)||t=="_bottom"&&!y){if(t=="_top"||t=="_bottom"){t="_bottom"}else{t=t+"_bottom"}u=-12;s=Math.round(j+m+d.edgeOffset)}if(t=="_right_top"||t=="_left_top"){s=s+5}else if(t=="_right_bottom"||t=="_left_bottom"){s=s-5}if(t=="_left_top"||t=="_left_bottom"){r=r+5}g.css({"margin-left":v+"px","margin-top":u+"px"});e.css({"margin-left":r+"px","margin-top":s+"px"}).attr("class","tip"+t);if(h){clearTimeout(h)}h=setTimeout(function(){e.stop(true,true).fadeIn(d.fadeIn)},d.delay)}function k(){d.exit.call(this);if(h){clearTimeout(h);clearInterval(i)}e.fadeOut(d.fadeOut)}}})}})(jQuery)
//  (function(b){b.fn.tipTip=function(a){var h={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var k=b.extend(h,a);if(b(".ui-tooltip").length<=0){var l=b('<div id="tiptip_holder" style="max-width:'+k.maxWidth+';"></div>');var i=b('<div id="tiptip_content"></div>');var j=b('<div id="tiptip_arrow"></div>');b('body').append(l.html(i).prepend(j.html('<div id="tiptip_arrow_inner"></div>')))}else{var l=b(".ui-tooltip");var i=b(".ui-tooltip");var j=b("#tiptip_arrow")}return this.each(function(){var d=b(this);if(k.content){var e=k.content}else{var e=d.attr(k.attribute)}if(e!=""){if(!k.content){d.removeAttr(k.attribute)}var m=false,n=false;if(k.activation=="hover"){d.hover(function(){f()},function(){if(!k.keepAlive){g()}});if(k.keepAlive){l.hover(function(){},function(){g()})}}else{if(k.activation=="focus"){d.focus(function(){f()}).blur(function(){g()})}else{if(k.activation=="click"){d.click(function(){f();return false}).hover(function(){},function(){if(!k.keepAlive){g()}});if(k.keepAlive){l.hover(function(){},function(){g()})}}}}function f(){k.enter.call(this);if(k.content){e=k.content}else{if(d.attr(k.attribute)){e=d.attr(k.attribute);if(e!=""){d.removeAttr(k.attribute)}}}i.html(e);l.hide().removeAttr("class").css("margin","0");j.removeAttr("style");var K=parseInt(d.offset()["top"]);var L=parseInt(d.offset()["left"]);var O=parseInt(d.outerWidth());var P=parseInt(d.outerHeight());var M=l.outerWidth();var N=l.outerHeight();var E=Math.round((O-M)/2);var F=Math.round((P-N)/2);var C=Math.round(L+E);var D=Math.round(K+P+k.edgeOffset);var I="";var J="";var G=Math.round(M-12)/2;if(k.defaultPosition=="bottom"){I="_bottom"}else{if(k.defaultPosition=="top"){I="_top"}else{if(k.defaultPosition=="left"){I="_left"}else{if(k.defaultPosition=="right"){I="_right"}}}}var H=E+L<parseInt(b(window).scrollLeft());var A=M+L>parseInt(b(window).width());if(H&&E<0||I=="_right"&&!A||I=="_left"&&L<M+k.edgeOffset+5){I="_right";J=Math.round(N-13)/2;G=-12;C=Math.round(L+O+k.edgeOffset);D=Math.round(K+F)}else{if(A&&E<0||I=="_left"&&!H){I="_left";J=Math.round(N-13)/2;G=Math.round(M);C=Math.round(L-(M+k.edgeOffset+5));D=Math.round(K+F)}}var B=K+P+k.edgeOffset+N+8>parseInt(b(window).height()+b(window).scrollTop());var c=K+P-(k.edgeOffset+N+8)<0;if(B||I=="_bottom"&&B||I=="_top"&&!c){if(I=="_top"||I=="_bottom"){I="_top"}else{I=I+"_top"}J=N;D=Math.round(K-(N+5+k.edgeOffset))}else{if(c|(I=="_top"&&c)||I=="_bottom"&&!B){if(I=="_top"||I=="_bottom"){I="_bottom"}else{I=I+"_bottom"}J=-12;D=Math.round(K+P+k.edgeOffset)}}if(I=="_right_top"||I=="_left_top"){D=D+5}else{if(I=="_right_bottom"||I=="_left_bottom"){D=D-5}}if(I=="_left_top"||I=="_left_bottom"){C=C+5}j.css({"margin-left":G+"px","margin-top":J+"px"});l.css({"margin-left":C+"px","margin-top":D+"px"}).attr("class","tip"+I);if(m){clearTimeout(m)}m=setTimeout(function(){l.stop(true,true).fadeIn(k.fadeIn)},k.delay)}function g(){k.exit.call(this);if(m){clearTimeout(m);clearInterval(n)}l.fadeOut(k.fadeOut)}}})}})(jQuery);

(function(a){typeof define==="function"&&define.amd?define(["jquery"],a):a(jQuery)})(function(a){function K(e,f){var g,h,i,j,k,l=a(this),m=a(document.body),n=this===document?m:l,o=l.metadata?l.metadata(f.metadata):d,p=f.metadata.type==="html5"&&o?o[f.metadata.name]:d,q=l.data(f.metadata.name||"qtipopts");try{q=typeof q==="string"?(new Function("return "+q))():q}catch(t){H("Unable to parse HTML5 attribute data: "+q)}j=a.extend(b,{},r.defaults,f,typeof q==="object"?I(q):d,I(p||o)),h=j.position,j.id=e;if("boolean"===typeof j.content.text){i=l.attr(j.content.attr);if(j.content.attr!==c&&i)j.content.text=i;else{H("Unable to locate content for tooltip! Aborting render of tooltip on element: ",l);return c}}h.container.length||(h.container=m),h.target===c&&(h.target=n),j.show.target===c&&(j.show.target=n),j.show.solo===b&&(j.show.solo=h.container.closest("body")),j.hide.target===c&&(j.hide.target=n),j.position.viewport===b&&(j.position.viewport=h.container),h.container=h.container.eq(0),h.at=new s.Corner(h.at),h.my=new s.Corner(h.my);if(a.data(this,"qtip"))if(j.overwrite)l.qtip("destroy");else if(j.overwrite===c)return c;j.suppress&&(k=a.attr(this,"title"))&&a(this).removeAttr("title").attr(F,k).attr("title",""),g=new J(l,j,e,!!i),a.data(this,"qtip",g),l.bind("remove.qtip-"+e+" removeqtip.qtip-"+e,function(){g.destroy()});return g}function J(f,g,o,p){function X(){var b=[g.show.target[0],g.hide.target[0],q.rendered&&M.tooltip[0],g.position.container[0],g.position.viewport[0],window,document];q.rendered?a([]).pushStack(a.grep(b,function(a){return typeof a==="object"})).unbind(L):g.show.target.unbind(L+"-create")}function W(){function m(a){q.rendered&&K[0].offsetWidth>0&&q.reposition(a)}function l(a){if(K.hasClass(x))return c;clearTimeout(q.timers.inactive),q.timers.inactive=setTimeout(function(){q.hide(a)},g.hide.inactive)}function k(b){if(K.hasClass(x)||H||J)return c;var f=a(b.relatedTarget||b.target),h=f.closest(y)[0]===K[0],i=f[0]===e.show[0];clearTimeout(q.timers.show),clearTimeout(q.timers.hide);if(d.target==="mouse"&&h||g.hide.fixed&&(/mouse(out|leave|move)/.test(b.type)&&(h||i)))try{b.preventDefault(),b.stopImmediatePropagation()}catch(j){}else g.hide.delay>0?q.timers.hide=setTimeout(function(){q.hide(b)},g.hide.delay):q.hide(b)}function j(a){if(K.hasClass(x))return c;clearTimeout(q.timers.show),clearTimeout(q.timers.hide);var d=function(){q.toggle(b,a)};g.show.delay>0?q.timers.show=setTimeout(d,g.show.delay):d()}var d=g.position,e={show:g.show.target,hide:g.hide.target,viewport:a(d.viewport),document:a(document),body:a(document.body),window:a(window)},h={show:a.trim(""+g.show.event).split(" "),hide:a.trim(""+g.hide.event).split(" ")},i=a.browser.msie&&parseInt(a.browser.version,10)===6;K.bind("mouseenter"+L+" mouseleave"+L,function(a){var b=a.type==="mouseenter";b&&q.focus(a),K.toggleClass(B,b)}),/mouse(out|leave)/i.test(g.hide.event)&&(g.hide.leave==="window"&&e.window.bind("mouseleave"+L+" blur"+L,function(a){!/select|option/.test(a.target.nodeName)&&!a.relatedTarget&&q.hide(a)})),g.hide.fixed?(e.hide=e.hide.add(K),K.bind("mouseover"+L,function(){K.hasClass(x)||clearTimeout(q.timers.hide)})):/mouse(over|enter)/i.test(g.show.event)&&e.hide.bind("mouseleave"+L,function(a){clearTimeout(q.timers.show)}),(""+g.hide.event).indexOf("unfocus")>-1&&d.container.closest("html").bind("mousedown"+L,function(b){var c=a(b.target),d=q.rendered&&!K.hasClass(x)&&K[0].offsetWidth>0,e=c.parents(y).filter(K[0]).length>0;c[0]!==f[0]&&c[0]!==K[0]&&!e&&!f.has(c[0]).length&&!c.attr("disabled")&&q.hide(b)}),"number"===typeof g.hide.inactive&&(e.show.bind("qtip-"+o+"-inactive",l),a.each(r.inactiveEvents,function(a,b){e.hide.add(M.tooltip).bind(b+L+"-inactive",l)})),a.each(h.hide,function(b,c){var d=a.inArray(c,h.show),f=a(e.hide);d>-1&&f.add(e.show).length===f.length||c==="unfocus"?(e.show.bind(c+L,function(a){K[0].offsetWidth>0?k(a):j(a)}),delete h.show[d]):e.hide.bind(c+L,k)}),a.each(h.show,function(a,b){e.show.bind(b+L,j)}),"number"===typeof g.hide.distance&&e.show.add(K).bind("mousemove"+L,function(a){var b=N.origin||{},c=g.hide.distance,d=Math.abs;(d(a.pageX-b.pageX)>=c||d(a.pageY-b.pageY)>=c)&&q.hide(a)}),d.target==="mouse"&&(e.show.bind("mousemove"+L,function(a){t={pageX:a.pageX,pageY:a.pageY,type:"mousemove"}}),d.adjust.mouse&&(g.hide.event&&(K.bind("mouseleave"+L,function(a){(a.relatedTarget||a.target)!==e.show[0]&&q.hide(a)}),M.target.bind("mouseenter"+L+" mouseleave"+L,function(a){N.onTarget=a.type==="mouseenter"})),e.document.bind("mousemove"+L,function(a){q.rendered&&N.onTarget&&!K.hasClass(x)&&K[0].offsetWidth>0&&q.reposition(a||t)}))),(d.adjust.resize||e.viewport.length)&&(a.event.special.resize?e.viewport:e.window).bind("resize"+L,m),(e.viewport.length||i&&K.css("position")==="fixed")&&e.viewport.bind("scroll"+L,m)}function V(b,d){function h(b){function i(e){e&&(delete h[e.src],clearTimeout(q.timers.img[e.src]),a(e).unbind(L)),a.isEmptyObject(h)&&(q.redraw(),d!==c&&q.reposition(N.event),b())}var f,h={};if((f=g.find("img[src]:not([height]):not([width])")).length===0)return i();f.each(function(b,c){if(h[c.src]===e){var d=0,f=3;(function g(){if(c.height||c.width||d>f)return i(c);d+=1,q.timers.img[c.src]=setTimeout(g,700)})(),a(c).bind("error"+L+" load"+L,function(){i(this)}),h[c.src]=c}})}var g=M.content;if(!q.rendered||!b)return c;a.isFunction(b)&&(b=b.call(f,N.event,q)||""),b.jquery&&b.length>0?g.empty().append(b.css({display:"block"})):g.html(b),q.rendered<0?K.queue("fx",h):(J=0,h(a.noop));return q}function U(b,d){var e=M.title;if(!q.rendered||!b)return c;a.isFunction(b)&&(b=b.call(f,N.event,q));if(b===c||!b&&b!=="")return Q(c);b.jquery&&b.length>0?e.empty().append(b.css({display:"block"})):e.html(b),q.redraw(),d!==c&&q.rendered&&K[0].offsetWidth>0&&q.reposition(N.event)}function T(a){var b=M.button,d=M.title;if(!q.rendered)return c;a?(d||S(),R()):b.remove()}function S(){var c=E+"-title";M.titlebar&&Q(),M.titlebar=a("<div />",{"class":v+"-titlebar "+(g.style.widget?"ui-widget-header":"")}).append(M.title=a("<div />",{id:c,"class":v+"-title","aria-atomic":b})).insertBefore(M.content).delegate(".ui-tooltip-close","mousedown keydown mouseup keyup mouseout",function(b){a(this).toggleClass("ui-state-active ui-state-focus",b.type.substr(-4)==="down")}).delegate(".ui-tooltip-close","mouseover mouseout",function(b){a(this).toggleClass("ui-state-hover",b.type==="mouseover")}),g.content.title.button?R():q.rendered&&q.redraw()}function R(){var b=g.content.title.button,d=typeof b==="string",e=d?b:"Close tooltip";M.button&&M.button.remove(),b.jquery?M.button=b:M.button=a("<a />",{"class":"ui-state-default ui-tooltip-close "+(g.style.widget?"":v+"-icon"),title:e,"aria-label":e}).prepend(a("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),M.button.appendTo(M.titlebar).attr("role","button").click(function(a){K.hasClass(x)||q.hide(a);return c}),q.redraw()}function Q(a){M.title&&(M.titlebar.remove(),M.titlebar=M.title=M.button=d,a!==c&&q.reposition())}function P(){var a=g.style.widget;K.toggleClass(w,a).toggleClass(z,g.style.def&&!a),M.content.toggleClass(w+"-content",a),M.titlebar&&M.titlebar.toggleClass(w+"-header",a),M.button&&M.button.toggleClass(v+"-icon",!a)}function O(a){var b=0,c,d=g,e=a.split(".");while(d=d[e[b++]])b<e.length&&(c=d);return[c||g,e.pop()]}var q=this,D=document.body,E=v+"-"+o,H=0,J=0,K=a(),L=".qtip-"+o,M,N;q.id=o,q.destroyed=q.rendered=c,q.elements=M={target:f},q.timers={img:{}},q.options=g,q.checks={},q.plugins={},q.cache=N={event:{},target:a(),disabled:c,attr:p,onTarget:c,lastClass:""},q.checks.builtin={"^id$":function(d,e,f){var g=f===b?r.nextid:f,h=v+"-"+g;g!==c&&g.length>0&&!a("#"+h).length&&(K[0].id=h,M.content[0].id=h+"-content",M.title[0].id=h+"-title")},"^content.text$":function(a,b,c){V(c)},"^content.title.text$":function(a,b,c){if(!c)return Q();!M.title&&c&&S(),U(c)},"^content.title.button$":function(a,b,c){T(c)},"^position.(my|at)$":function(a,b,c){"string"===typeof c&&(a[b]=new s.Corner(c))},"^position.container$":function(a,b,c){q.rendered&&K.appendTo(c)},"^show.ready$":function(){q.rendered?q.toggle(b):q.render(1)},"^style.classes$":function(a,b,c){K.attr("class",v+" qtip ui-helper-reset "+c)},"^style.widget|content.title":P,"^events.(render|show|move|hide|focus|blur)$":function(b,c,d){K[(a.isFunction(d)?"":"un")+"bind"]("tooltip"+c,d)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){var a=g.position;K.attr("tracking",a.target==="mouse"&&a.adjust.mouse),X(),W()}},a.extend(q,{render:function(d){if(q.rendered)return q;var e=g.content.text,h=g.content.title.text,i=g.position,j=a.Event("tooltiprender");a.attr(f[0],"aria-describedby",E),K=M.tooltip=a("<div/>",{id:E,"class":v+" qtip ui-helper-reset "+z+" "+g.style.classes+" "+v+"-pos-"+g.position.my.abbrev(),width:g.style.width||"",height:g.style.height||"",tracking:i.target==="mouse"&&i.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":c,"aria-describedby":E+"-content","aria-hidden":b}).toggleClass(x,N.disabled).data("qtip",q).appendTo(g.position.container).append(M.content=a("<div />",{"class":v+"-content",id:E+"-content","aria-atomic":b})),q.rendered=-1,H=J=1,h&&(S(),a.isFunction(h)||U(h,c)),a.isFunction(e)||V(e,c),q.rendered=b,P(),a.each(g.events,function(b,c){a.isFunction(c)&&K.bind(b==="toggle"?"tooltipshow tooltiphide":"tooltip"+b,c)}),a.each(s,function(){this.initialize==="render"&&this(q)}),W(),K.queue("fx",function(a){j.originalEvent=N.event,K.trigger(j,[q]),H=J=0,q.redraw(),(g.show.ready||d)&&q.toggle(b,N.event,c),a()});return q},get:function(a){var b,c;switch(a.toLowerCase()){case"dimensions":b={height:K.outerHeight(),width:K.outerWidth()};break;case"offset":b=s.offset(K,g.position.container);break;default:c=O(a.toLowerCase()),b=c[0][c[1]],b=b.precedance?b.string():b}return b},set:function(e,f){function n(a,b){var c,d,e;for(c in l)for(d in l[c])if(e=(new RegExp(d,"i")).exec(a))b.push(e),l[c][d].apply(q,b)}var h=/^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,i=/^content\.(title|attr)|style/i,j=c,k=c,l=q.checks,m;"string"===typeof e?(m=e,e={},e[m]=f):e=a.extend(b,{},e),a.each(e,function(b,c){var d=O(b.toLowerCase()),f;f=d[0][d[1]],d[0][d[1]]="object"===typeof c&&c.nodeType?a(c):c,e[b]=[d[0],d[1],c,f],j=h.test(b)||j,k=i.test(b)||k}),I(g),H=J=1,a.each(e,n),H=J=0,q.rendered&&K[0].offsetWidth>0&&(j&&q.reposition(g.position.target==="mouse"?d:N.event),k&&q.redraw());return q},toggle:function(e,f){function u(){e?(a.browser.msie&&K[0].style.removeAttribute("filter"),K.css("overflow",""),"string"===typeof i.autofocus&&a(i.autofocus,K).focus(),i.target.trigger("qtip-"+o+"-inactive")):K.css({display:"",visibility:"",opacity:"",left:"",top:""}),s=a.Event("tooltip"+(e?"visible":"hidden")),s.originalEvent=f?N.event:d,K.trigger(s,[q])}if(!q.rendered)return e?q.render(1):q;var h=e?"show":"hide",i=g[h],j=g[e?"hide":"show"],k=g.position,l=g.content,m=K[0].offsetWidth>0,n=e||i.target.length===1,p=!f||i.target.length<2||N.target[0]===f.target,r,s;(typeof e).search("boolean|number")&&(e=!m);if(!K.is(":animated")&&m===e&&p)return q;if(f){if(/over|enter/.test(f.type)&&/out|leave/.test(N.event.type)&&g.show.target.add(f.target).length===g.show.target.length&&K.has(f.relatedTarget).length)return q;N.event=a.extend({},f)}s=a.Event("tooltip"+h),s.originalEvent=f?N.event:d,K.trigger(s,[q,90]);if(s.isDefaultPrevented())return q;a.attr(K[0],"aria-hidden",!e),e?(N.origin=a.extend({},t),q.focus(f),a.isFunction(l.text)&&V(l.text,c),a.isFunction(l.title.text)&&U(l.title.text,c),!G&&k.target==="mouse"&&k.adjust.mouse&&(a(document).bind("mousemove.qtip",function(a){t={pageX:a.pageX,pageY:a.pageY,type:"mousemove"}}),G=b),q.reposition(f,arguments[2]),(s.solo=!!i.solo)&&a(y,i.solo).not(K).qtip("hide",s)):(clearTimeout(q.timers.show),delete N.origin,G&&!a(y+'[tracking="true"]:visible',i.solo).not(K).length&&(a(document).unbind("mousemove.qtip"),G=c),q.blur(f)),i.effect===c||n===c?(K[h](),u.call(K)):a.isFunction(i.effect)?(K.stop(1,1),i.effect.call(K,q),K.queue("fx",function(a){u(),a()})):K.fadeTo(90,e?1:0,u),e&&i.target.trigger("qtip-"+o+"-inactive");return q},show:function(a){return q.toggle(b,a)},hide:function(a){return q.toggle(c,a)},focus:function(b){if(!q.rendered)return q;var c=a(y),d=parseInt(K[0].style.zIndex,10),e=r.zindex+c.length,f=a.extend({},b),g,h;K.hasClass(A)||(h=a.Event("tooltipfocus"),h.originalEvent=f,K.trigger(h,[q,e]),h.isDefaultPrevented()||(d!==e&&(c.each(function(){this.style.zIndex>d&&(this.style.zIndex=this.style.zIndex-1)}),c.filter("."+A).qtip("blur",f)),K.addClass(A)[0].style.zIndex=e));return q},blur:function(b){var c=a.extend({},b),d;K.removeClass(A),d=a.Event("tooltipblur"),d.originalEvent=c,K.trigger(d,[q]);return q},reposition:function(b,d){if(!q.rendered||H)return q;H=1;var e=g.position.target,f=g.position,h=f.my,i=f.at,o=f.adjust,p=o.method.split(" "),r=K.outerWidth(),u=K.outerHeight(),v=0,w=0,x=a.Event("tooltipmove"),y=K.css("position")==="fixed",z=f.viewport,A={left:0,top:0},B=f.container,C=K[0].offsetWidth>0,D,E,F;if(a.isArray(e)&&e.length===2)i={x:k,y:j},A={left:e[0],top:e[1]};else if(e==="mouse"&&(b&&b.pageX||N.event.pageX))i={x:k,y:j},b=(b&&(b.type==="resize"||b.type==="scroll")?N.event:b&&b.pageX&&b.type==="mousemove"?b:t&&t.pageX&&(o.mouse||!b||!b.pageX)?{pageX:t.pageX,pageY:t.pageY}:!o.mouse&&N.origin&&N.origin.pageX&&g.show.distance?N.origin:b)||b||N.event||t||{},A={top:b.pageY,left:b.pageX};else{e==="event"&&b&&b.target&&b.type!=="scroll"&&b.type!=="resize"?N.target=a(b.target):e!=="event"&&(N.target=a(e.jquery?e:M.target)),e=N.target,e=a(e).eq(0);if(e.length===0)return q;e[0]===document||e[0]===window?(v=s.iOS?window.innerWidth:e.width(),w=s.iOS?window.innerHeight:e.height(),e[0]===window&&(A={top:(z||e).scrollTop(),left:(z||e).scrollLeft()})):s.imagemap&&e.is("area")?D=s.imagemap(q,e,i,s.viewport?p:c):s.svg&&typeof e[0].xmlbase==="string"?D=s.svg(q,e,i,s.viewport?p:c):(v=e.outerWidth(),w=e.outerHeight(),A=s.offset(e,B)),D&&(v=D.width,w=D.height,E=D.offset,A=D.position);if(s.iOS>3.1&&s.iOS<4.1||s.iOS>=4.3&&s.iOS<4.33||!s.iOS&&y)F=a(window),A.left-=F.scrollLeft(),A.top-=F.scrollTop();A.left+=i.x===m?v:i.x===n?v/2:0,A.top+=i.y===l?w:i.y===n?w/2:0}A.left+=o.x+(h.x===m?-r:h.x===n?-r/2:0),A.top+=o.y+(h.y===l?-u:h.y===n?-u/2:0),s.viewport?(A.adjusted=s.viewport(q,A,f,v,w,r,u),E&&A.adjusted.left&&(A.left+=E.left),E&&A.adjusted.top&&(A.top+=E.top)):A.adjusted={left:0,top:0},x.originalEvent=a.extend({},b),K.trigger(x,[q,A,z.elem||z]);if(x.isDefaultPrevented())return q;delete A.adjusted,d===c||!C||isNaN(A.left)||isNaN(A.top)||e==="mouse"||!a.isFunction(f.effect)?K.css(A):a.isFunction(f.effect)&&(f.effect.call(K,q,a.extend({},A)),K.queue(function(b){a(this).css({opacity:"",height:""}),a.browser.msie&&this.style.removeAttribute("filter"),b()})),H=0;return q},redraw:function(){if(q.rendered<1||J)return q;var a=g.position.container,b,c,d,e;J=1,g.style.height&&K.css(i,g.style.height),g.style.width?K.css(h,g.style.width):(K.css(h,"").addClass(C),c=K.width()+1,d=K.css("max-width")||"",e=K.css("min-width")||"",b=(d+e).indexOf("%")>-1?a.width()/100:0,d=(d.indexOf("%")>-1?b:1)*parseInt(d,10)||c,e=(e.indexOf("%")>-1?b:1)*parseInt(e,10)||0,c=d+e?Math.min(Math.max(c,e),d):c,K.css(h,Math.round(c)).removeClass(C)),J=0;return q},disable:function(b){"boolean"!==typeof b&&(b=!K.hasClass(x)&&!N.disabled),q.rendered?(K.toggleClass(x,b),a.attr(K[0],"aria-disabled",b)):N.disabled=!!b;return q},enable:function(){return q.disable(c)},destroy:function(){var c=f[0],d=a.attr(c,F),e=f.data("qtip");q.destroyed=b,q.rendered&&(K.stop(1,0).remove(),a.each(q.plugins,function(){this.destroy&&this.destroy()})),clearTimeout(q.timers.show),clearTimeout(q.timers.hide),X();if(!e||q===e)a.removeData(c,"qtip"),g.suppress&&d&&(a.attr(c,"title",d),f.removeAttr(F)),f.removeAttr("aria-describedby");f.unbind(".qtip-"+o),delete u[q.id];return f}})}function I(b){var e;if(!b||"object"!==typeof b)return c;if(b.metadata===d||"object"!==typeof b.metadata)b.metadata={type:b.metadata};if("content"in b){if(b.content===d||"object"!==typeof b.content||b.content.jquery)b.content={text:b.content};e=b.content.text||c,!a.isFunction(e)&&(!e&&!e.attr||e.length<1||"object"===typeof e&&!e.jquery)&&(b.content.text=c);if("title"in b.content){if(b.content.title===d||"object"!==typeof b.content.title)b.content.title={text:b.content.title};e=b.content.title.text||c,!a.isFunction(e)&&(!e&&!e.attr||e.length<1||"object"===typeof e&&!e.jquery)&&(b.content.title.text=c)}}if("position"in b)if(b.position===d||"object"!==typeof b.position)b.position={my:b.position,at:b.position};if("show"in b)if(b.show===d||"object"!==typeof b.show)b.show.jquery?b.show={target:b.show}:b.show={event:b.show};if("hide"in b)if(b.hide===d||"object"!==typeof b.hide)b.hide.jquery?b.hide={target:b.hide}:b.hide={event:b.hide};if("style"in b)if(b.style===d||"object"!==typeof b.style)b.style={classes:b.style};a.each(s,function(){this.sanitize&&this.sanitize(b)});return b}function H(){H.history=H.history||[],H.history.push(arguments);if("object"===typeof console){var a=console[console.warn?"warn":"log"],b=Array.prototype.slice.call(arguments),c;typeof arguments[0]==="string"&&(b[0]="qTip2: "+b[0]),c=a.apply?a.apply(console,b):a(b)}}"use strict";var b=!0,c=!1,d=null,e,f="x",g="y",h="width",i="height",j="top",k="left",l="bottom",m="right",n="center",o="flip",p="flipinvert",q="shift",r,s,t,u={},v="ui-tooltip",w="ui-widget",x="ui-state-disabled",y="div.qtip."+v,z=v+"-default",A=v+"-focus",B=v+"-hover",C=v+"-fluid",D="-31000px",E="_replacedByqTip",F="oldtitle",G;r=a.fn.qtip=function(f,g,h){var i=(""+f).toLowerCase(),j=d,k=a.makeArray(arguments).slice(1),l=k[k.length-1],m=this[0]?a.data(this[0],"qtip"):d;if(!arguments.length&&m||i==="api")return m;if("string"===typeof f){this.each(function(){var d=a.data(this,"qtip");if(!d)return b;l&&l.timeStamp&&(d.cache.event=l);if(i!=="option"&&i!=="options"||!g)d[i]&&d[i].apply(d[i],k);else if(a.isPlainObject(g)||h!==e)d.set(g,h);else{j=d.get(g);return c}});return j!==d?j:this}if("object"===typeof f||!arguments.length){m=I(a.extend(b,{},f));return r.bind.call(this,m,l)}},r.bind=function(d,f){return this.each(function(g){function n(b){function d(){l.render(typeof b==="object"||h.show.ready),i.show.add(i.hide).unbind(k)}if(l.cache.disabled)return c;l.cache.event=a.extend({},b),l.cache.target=b?a(b.target):[e],h.show.delay>0?(clearTimeout(l.timers.show),l.timers.show=setTimeout(d,h.show.delay),j.show!==j.hide&&i.hide.bind(j.hide,function(){clearTimeout(l.timers.show)})):d()}var h,i,j,k,l,m;m=a.isArray(d.id)?d.id[g]:d.id,m=!m||m===c||m.length<1||u[m]?r.nextid++:u[m]=m,k=".qtip-"+m+"-create",l=K.call(this,m,d);if(l===c)return b;h=l.options,a.each(s,function(){this.initialize==="initialize"&&this(l)}),i={show:h.show.target,hide:h.hide.target},j={show:a.trim(""+h.show.event).replace(/ /g,k+" ")+k,hide:a.trim(""+h.hide.event).replace(/ /g,k+" ")+k},/mouse(over|enter)/i.test(j.show)&&!/mouse(out|leave)/i.test(j.hide)&&(j.hide+=" mouseleave"+k),i.show.bind("mousemove"+k,function(a){t={pageX:a.pageX,pageY:a.pageY,type:"mousemove"},l.cache.onTarget=b}),i.show.bind(j.show,n),(h.show.ready||h.prerender)&&n(f)})},s=r.plugins={Corner:function(a){a=(""+a).replace(/([A-Z])/," $1").replace(/middle/gi,n).toLowerCase(),this.x=(a.match(/left|right/i)||a.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(a.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase();var b=a.charAt(0);this.precedance=b==="t"||b==="b"?g:f,this.string=function(){return this.precedance===g?this.y+this.x:this.x+this.y},this.abbrev=function(){var a=this.x.substr(0,1),b=this.y.substr(0,1);return a===b?a:this.precedance===g?b+a:a+b},this.invertx=function(a){this.x=this.x===k?m:this.x===m?k:a||this.x},this.inverty=function(a){this.y=this.y===j?l:this.y===l?j:a||this.y},this.clone=function(){return{x:this.x,y:this.y,precedance:this.precedance,string:this.string,abbrev:this.abbrev,clone:this.clone,invertx:this.invertx,inverty:this.inverty}}},offset:function(b,c){function j(a,b){d.left+=b*a.scrollLeft(),d.top+=b*a.scrollTop()}var d=b.offset(),e=b.closest("body")[0],f=c,g,h,i;if(f){do f.css("position")!=="static"&&(h=f.position(),d.left-=h.left+(parseInt(f.css("borderLeftWidth"),10)||0)+(parseInt(f.css("marginLeft"),10)||0),d.top-=h.top+(parseInt(f.css("borderTopWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0),!g&&(i=f.css("overflow"))!=="hidden"&&i!=="visible"&&(g=f));while((f=a(f[0].offsetParent)).length);g&&g[0]!==e&&j(g,1)}return d},iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||c,fn:{attr:function(b,c){if(this.length){var d=this[0],e="title",f=a.data(d,"qtip");if(b===e&&f&&"object"===typeof f&&f.options.suppress){if(arguments.length<2)return a.attr(d,F);f&&f.options.content.attr===e&&f.cache.attr&&f.set("content.text",c);return this.attr(F,c)}}return a.fn["attr"+E].apply(this,arguments)},clone:function(b){var c=a([]),d="title",e=a.fn["clone"+E].apply(this,arguments);b||e.filter("["+F+"]").attr("title",function(){return a.attr(this,F)}).removeAttr(F);return e}}},a.each(s.fn,function(c,d){if(!d||a.fn[c+E])return b;var e=a.fn[c+E]=a.fn[c];a.fn[c]=function(){return d.apply(this,arguments)||e.apply(this,arguments)}}),a.ui||(a["cleanData"+E]=a.cleanData,a.cleanData=function(b){for(var c=0,d;(d=b[c])!==e;c++)try{a(d).triggerHandler("removeqtip")}catch(f){}a["cleanData"+E](b)}),r.version="nightly",r.nextid=0,r.inactiveEvents="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),r.zindex=15e3,r.defaults={prerender:c,id:c,overwrite:b,suppress:b,content:{text:b,attr:"title",title:{text:c,button:c}},position:{my:"top left",at:"bottom right",target:c,container:c,viewport:c,adjust:{x:0,y:0,mouse:b,resize:b,method:"flip flip"},effect:function(b,d,e){a(this).animate(d,{duration:200,queue:c})}},show:{target:c,event:"mouseenter",effect:b,delay:90,solo:c,ready:c,autofocus:c},hide:{target:c,event:"mouseleave",effect:b,delay:0,fixed:c,inactive:c,leave:"window",distance:c},style:{classes:"",widget:c,width:c,height:c,def:b},events:{render:d,move:d,show:d,hide:d,toggle:d,visible:d,hidden:d,focus:d,blur:d}}})


/***********************************************************************************************************************
 * Globals
 **********************************************************************************************************************/
var debug = false;
var log = true;   // SITR logging pane
var uws = false;
/***********************************************************************************************************************
 * Inject button into page before the page renders the YUI menu or it will not be animated
 **********************************************************************************************************************/
$('.menu_slots > .expandable').eq($('.menu_slots > .expandable').length - 1).after('<li class="expandable slot99 SITR_Menu" onclick=""><div class="SITR_Menu2 image" style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFBhI2HMYcHHwAAA1RSURBVGje7Zl7bFvneYcfUtTh9VAkRVKi7rJutiRHcezYjhPn5mR1185OL0GDrFuaZcOaZRiCIthWdOgfHdalWdBsaJGtm5MsLZogTbI6lwVe7Nxs2ZYcO5Yt60LJsi6UxPv1kIfkISnujyPT89JkseNg2eAXOABv5zvf872/7718hKt21a7aVbtq/wumudIDxk7/pByL5NFoRvCeGkcOKnRt2o3Zbqfz9kc0nxWI9oqDRPKYxTlMFhutPc2Y6gTiR39O4PhBYqd/Uv4/AXL27cfLZnEOvb4Hvb4HT+MdOD12ErJCZG4Y33TgM4PRXkmIfP4QAPm8t3LpqwUASvEo0swovukAZ99+vPy5BTGLcxgMIiHfzKrEfACs6IwUa1wE5Soic8NMH3+FwPGDnHr5e+XPJYicTqjeKCiV1wDaYpZE3E8kBctLCXTJMJG5YWbf2sPgY7vKnzuQlCQDEPHHScejFbilhSBz8zrGIgKTQR2nJxKU4lFK8SjBk28w+Niu8pWQ2hUDiYbDADg9dsLxNP7lGOl4FDmoML0oE5YUghktYxGB92b1BOUqAIIn3+DMS3/3qaWmu9Qblof2lA/6hnn93K8wJrtwu+ChG77NQd8w74yc5KEbvs342LNYLQL5gsJLQ0XCkkJ/vQ5YUSef0WJVbLh7XWogmJvkwL5XCZ56uZzS1OEdO8PauiJGo5HGGx7QfCYg8USCt06eJJEvkmCCrKLjGd+/EFeC4Fa/T5yNMxf384tBDVVpia8PQG+Xg+iSn6BchTMFkfgKIyPqmA1CFff82cPg6Id4mEgwwFtzGepr9Swdfar8SWB0l+NGf37iYjglSNmQQpOzctxxiGefn2ZosczWJg2PPNzHhhu3IacTFM/NE39/nD5TEigRlItMBnU8+MSTzKasdAFBv58l3zyCwYicSQNw7Nc/Km/+yl9orhjI8tCe8g9GH8Hm1pEIFSufp+UEFmzYhToAtq2z0V+fZuc9PfQM9AKQy0m0r2kFIHngKFX2Wq7ZsIXd23czFdXT1OIBoFDIVwAwGDnjXWLirJZX/vmvyh6XyEcBXfJmv2HgloveJ0JF0rEyaVkNuYvzATa1w64/uo4NN25j9tw8sYiPYlYhGvJT63JRbltLKR6lfRWiulpfGa+6Wk8+l6NYUCgV8gBIqRQjZ2bZPzjJsV//qPypQRq2/qGmfnIzdZ1V2NwXnHnm3SzpWBl5scSm7C5K8SguuwW9vof2Na1kUmlWdEbMVgtCdQlTncBYoAqpZCYjpamx28nlchSzCRKxKFk5g6IoFz1bURSKBQV/WPp00loe2lOOJxI88egrhOtESk0R1QPjBbIjNkodTYSsEG+aY/19j1ZKFZPFhsliUzN+tYDBIALwwA+fJFAwYxYvSFTOFZDTEu56D4qiEAmF0BsMVzb8xhMJnv77/cQlmUlvFjDT0lONC0g2F5D0Xq7ZZeLd0bM8+rTM1q+auFW6mx59FKtowmKvJR2PshCT2Xjb9wjlaxCqgFQSJZclm80xsTCHy+Phlp27GD/1Ph8cfpecUqrsmf/upUsGWR7aU57dO8VcOEIglaS/oZnv3LkD76Jf3ZOuPM+cOExkW5bW9dUsTlZjdmiZbdwLvrtwhidx2S3ojAK9Hb9LSlOHwQCLC3NYrTVkszmWF+YwWUR6B67HItbgdNcjGIwIBjAIVRcBXfIeWR7aUx7b93h5du9UZdIAbS4ng1NncVtFepo8+OaLJOUC3iN55kcLNK2tJni2BMD72peJWNeqwAaRorFJLWkScQCy2RyJWBSXx0NrRyfFrBo0kvE4sWgMAMFgxGQ04HQ6Vyvtn5Y/kUeWh/aUR6eCfP8vn+WQ10sgKfHLb93P/Vu2MBYI4DKZCcsZ9o6PAnDI6+W6rzXReF2MwGKcus4qFifzzI9qMDu0HFf2g3An1lMnGGi8+Flr3QpVdWc4fWSMQq4fbN9Uo2EsipRK4ah1XPT7BX+SkTOzH8otuo+S0Q9e/je1drJYcVqsjAUC3NTdyU3Wzop3zkMCrOnQkl8dIxNboWebvvLa7Egx27iX+5r/lvNLmc3mWOeUqDLrWUn4qa3T4A8laIh9AO5WIsEAWTmjekQwIAjno1cOR62D4dOL/7NH4qk0373ztwB459wMt63pYO/4KMf2z7O5tZWQnGEuHKn8vqdfpPvGRva/M/0bJZqJreBsrGK/9jXuYD0mQzUAeoce5A8AaF23GaWcYfTkEdYDO7fW8fabGVKpNFarCqMoOTIZGbPZhCAYPvlmt1stfPXaAQC6HC5eXTrN00cHCSQl6mtEtvf0EJdkiu0RlleOfGjyZocWs0NL8GyJyFIJGo8QCITIZnNs6HdAZoqc4kcreMikWmnvHANsjJ48Qq3LxmPf/xY/e24QJZdFyWVJZ7JqE2c2oSi5jweJJxI8MzxMIJVka0cHfU43bqtISM5wZmkJgPoakS8PbKDP6QZgZuME0ZkI8JvDo8VxoapoFBYRO7pVmcgqRFpuJbw8jqAZRwqVEYATb58iuj7BH997Ez97bvCixKjksp8s/H5pXS9PDR9laGbmIgndsa6XAxPj9Dc0VzzlXfRz7BU/+o0JmtaqklmcVCOXs7GKyFIJs0Nbkdd5y4YOYBSyKNU34nC1UsyNMXkiXGnODAYYOfoBKf9hpFQfotV6obbLZNGtngV8JEji3RBuq8i6Rg+HvN7KXgmlJNxWEbtoYmLJzzNDR1W5jZ4GjGze7YE0nBkKM30wi+3h/IcWqN13F7pOK9GZ1xCtRVY0LgRzK3rdAi1rXGTiLk4eniItqfda9CFCfugxzfM79z7IUy8eUz2yen1sHhmcOsve8VHikkwgKTEWCGC3Wuhp8hBKSdQYTNRba6gxmFYh4Pe+sJN7193Dvevu4c/bv0F/Q3NlvP/qhfViD0Z3PSbRCEBR141et4C2oEagxo5eTBZ1pX0+tXVu664nEprnF0/+lN//Wi/5XI58Ts09H3vSOLbv8fITj76i7hdJxi6aqDGYcJvMAEzHwtz9Bztpcuux22yV+36cuBmA79gOMjoV5LjxVbTN51SpLJXQ5KzcX/uniKZF7E414hhre9AWFskm59RSP5NgZmwe72iAxQU1rO/4UhfZrMh/vHoMu7uNHbtu5+UDAQD+5p9e1HzskenYvosPAxZDed587iBdnV1s/3IbdpuNn5e+QFetiV8eGWdNQx1ysYxJp8GoFzg14eUhy/EKTGSphGOli7vEu7Ho3sPR0IdWJ7JSlIgtj+H0uCsQJquVaLDM+Mkz+HwyGzfXsenmPo4fHOPEsSAAP9yX0Vzy2e8Lrz9ffiHUxF/v3sRkWGbEL2EWLsglGg1TFixolDShQjVSMsHy0JsA9F+/lVs2X0dnnQ1rNYhnf4VdnKCopElF5pmbStPWbcHR0Mf8xDG8p+boGWhTpXUuzMjwAja7wMZtakN24sg8ibjCd19Kai65H2k0lnCUUvzr4QnWukyYhSoyilpHZZQSZcFCp1VDh1PEuJKjmJOx19bSf/1WOnuv4bXRRd6YCFbGKypppk8OcfzgGG3dFprXbkZJT+M7Fybkl5BTKcQaM81rXDS1iCTiCr7ZGL7ZGIm4gs0uXN5x0E07vqm505PCuxjmkHeRjY02snmFjFIim1c4txzEbLZgNlsISTkKvgk2D3Tzxe1b6ao1YTQaWIhJpAoQMnWzNDOOdzSASTTjaOgjm5zD74sjS5nV0kXtVzzNdlo6u9SI6b/QTCXiyuWfa93gUtjgKPHmZIBAMk1LrUg2r2DUq6tzyi9h0gs4Sim233Y7O2+9jbUuEw02Ey0OdWLpXJGcuQ1r0304PXb6tuxYzRkh5FTqQnOViSAlM6sRy4LNLpCIK8hp1RtSunj5IC1b7tM80B6mmJM5PLXIOpdFDQqzPtyigbSUZMQvsamvmz+5pRdr9WoBmpC5ub2WXX0NpHIKg/4iR8MCvRvaaGypJrY8RtDnJxrJI6eVSjI8D2axqvtDShcrUUy06C4PZGH42fI7g/9eDpm66WlysRyOMbMcYMCjrrTWaCWrNeCy6Nne08RSukCqAI2WakZWJbHWZWJJUliIy+g8/WjEr5MInUNKZlQIKVNJgufllU6pYB19rWzcXFfxhNPdepkg6SpeTHRyINVEba2LrZ0e3j6nNj9f2dhJJq+wq6+BHWvUnPLaZIT3fer3167CAtgFyOQVRlIiC+kq0imlsvLnvXH+yFXORC6aQ89AG6JFV0mSl9XqtlhK3JL9gBe8TdS73bTY7Xxjk0lNVu011NdYuN5jXIVQa6Xrm21MxAscnYsy4BFJ5QSua7Jx1JdibNbH7d12ko3/QHbqASL+ACaLgNNjp679VpzuKiKhEhqhCq1QZEVRe5/u3lpOHAuSSJcuE2TLfZoXXn++nJ0+Ae4vEo2GWcnouLnTxVK6QIN4YYhMJk2jxVLZH+flJ+cVwMQ1Di1NQg21jY2kykbWXPvbiO4FXA0tVGvV++q3PqgJDP1jWe/QoytOgdCF1ZWj/Zo+YpH3rv7re9Wu2lX7f2L/CWXeZ09gFoB4AAAAAElFTkSuQmCC); background-position:center center; background-size:122% 122%"></div></div><div class="name"><span class="namebox">SITR Resource Overview</span></div></li>');

if(window.navigator.vendor.match(/Google/))
    var isChrome = true;
/***********************************************************************************************************************
 * SITR Main Object
 **********************************************************************************************************************/
SITR = {
    version   :1.107,
    scriptId  :132578,
    scriptName:'Simple Ikariam Town Resources Board',
    db        : null,
    ikariam   : null,
    Render    : null,
    logger    : null,
    loaded    : false,

    log: function (val) {
        if (debug) console.log('SITR: ' + val);
        if (log) {
            if (this.logger) {
                this.logger.val(val + '\n' + this.logger.val());
                return true
            } else {
                $('#SITR_Tabs').append($(document.createElement("div")).attr('id', 'SITR_Log'));
                var label = '<img class="ui-icon ui-icon-info"/>';
                $('#SITR_Log').html('<div><textarea id="SITR_Logbox" rows="20" cols="120"></textarea></div>');
                $('#SITR_Tabs').tabs('add', '#SITR_Log', label);
                this.logger = $('#SITR_Logbox');
                return this.log(val)
            }
        }
    },

    Init           :function () {
        this.ikariam.Init(this);
        this.db.Init(this);
        if (!SITR.db.options.showOnIslandView && /.*view=island.*/.test(window.location.href)) return false;
        if (!SITR.db.options.showOnWorldView && /.*view=worldmap_iso.*/.test(window.location.href)) return false;
        this.Render.Init(this);


    },

    //original snippet taken from http://userscripts.org/scripts/show/20145
    CheckForUpdates : function (forced) {
        if ((forced) || ((SITR.db.globalData.LastUpdateCheck + 86400000 <= $.now()) && SITR.db.options.autoUpdates)) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
        {
            try {
                GM_xmlhttpRequest({
                    method :'GET',
                    url    :'http://userscripts.org/scripts/source/' + SITR.scriptId + '.meta.js?' + $.now(),
                    headers:{'Cache-Control':'no-cache'},
                    onload :function (resp) {
                        var remote_version, rt;
                        rt = resp.responseText;
                        SITR.db.globalData.LastUpdateCheck = $.now();
                        remote_version = parseFloat(/@version\s*(.*?)\s*$/m.exec(rt)[1]);
                        if (SITR.version != -1) {
                            if (remote_version > SITR.version) {
                                if (confirm('There is an update available for the Greasemonkey script "' + SITR.scriptName + '."\nWould you like to go to the install page now?')) {
                                    GM_openInTab('http://userscripts.org/scripts/show/' + SITR.scriptId);
                                }
                            } else if (forced)
                                SITR.Render.toast('No update is available for "' + SITR.scriptName + '."');
                        }
                        SITR.db.globalData.latestVersion = remote_version;
                    }
                });
            } catch (err) {
                if (forced)
                    SITR.Render.toast('An error occurred while checking for updates:\n' + err);
            }
        }
    },
    HardReset : function () {
    SITR.db = {};
    SITR.deleteVar("Options");
    SITR.deleteVar("cities");
    SITR.deleteVar("LocalStrings");
    SITR.deleteVar("globalData");
        SITR.Render.toast('Data Reset, reloading the page in a few seconds')
    setTimeout(function(){document.location = document.getElementById('js_cityLink').children[0].href},3500);
}
};

/***********************************************************************************************************************
 *
 * SITR.db
 *
 **********************************************************************************************************************/

SITR.db = {
    _Parent             : null,
    cities              : {},
    options             : {
        version         : 0,
        fullArmyTable   : false,
        onTop           : true,
        showOnIslandView: false,
        showOnWorldView : false,
        autoUpdates     : true,
        wineWarningTime : 24,
        largeFont       : false,
        altBuildingList : false,
        openBuilding    : -1,
        restoreRes      : -1,
        window          : {
            left     : 150,
            top      : 180,
            activeTab: 0,
            visible  : true
        },
        addOptions      : function (objVals) {
            return $.extend(this, objVals);
        }
    },
    globalData       : {
        version       : {
            lastUpdateCheck : 0,
            latestVersion   : null,
            installedVersion: 0
        },
        research      : {
            topics    : {} ,
            lastUpdate: 0
        },
        governmentType    : '',
        fleetMovements    : {},
        militaryMovements : {},

        finance       : {
            armyCost     : 0,
            armySupply   : 0,
            fleetCost    : 0,
            fleetSupply  : 0,
            sigmaExpenses: 0,
            sigmaIncome  : 0,
            lastUpdated :0,
        },
        localStrings  : {},
        addOptions      : function (objVals) {
            return $.extend(this, objVals);
        }
    },
    _BuildingCostList: null,
    _TavernWineUsage : [0, 4, 8, 13, 18, 24, 30, 37, 44, 51, 60, 68, 78, 88, 99, 110, 122, 136, 150, 165, 180, 197, 216, 235, 255, 277, 300, 325, 351, 378, 408, 439, 472, 507, 544, 584, 626, 670, 717, 766, 818, 874, 933, 995, 1060, 1129, 1202, 1278],

    Init : function (parent, host) {
        this._Parent = parent;

        if (host == undefined) host = this._Parent.ikariam.Host();

        var prefix = host;
        prefix = prefix.replace('.ikariam.', '-');
        prefix = prefix.replace('.', '-');
        this.Prefix = prefix;
        this.Load();
        this.GetLocalizationStrings();
        this.globalData.research.getSum = function() {
            var museums = 0;
            var research = 0;
            for (var cID in SITR.db.cities){
                museums += SITR.db.cities[cID].culturalGoods
                research += SITR.db.cities[cID].research
            }
            if (SITR.db.globalData.governmentType == 'demokratie')
                research += museums
            return research

        }
    },

    addCity : function(a){
        if (a){
        b = $.extend(new City_Object(), a); return b}
        else return new City_Object();
    },
    Load: function () {
        var opt = this.UnSerialize(SITR.getVar("Options", ""));
        if (typeof opt == 'object') {
            this.options.addOptions(opt)
        }

        var cs = this.UnSerialize(SITR.getVar("cities", ""));
        if (this.cities == null || this.cities == undefined || this.cities == "" || ("".cities == "NaN")) {
            this.cities = new Object();
        } else {
            if (typeof cs == 'object')
                for (var key in cs)
                    this.cities[key] = this.addCity(cs[key])
        }

//        var ls = this.UnSerialize(SITR.getVar("LocalStrings", ""));
//        if (typeof ls =='object')
//            $.extend(this.localStrings, ls)

        var gd = this.UnSerialize(SITR.getVar("globalData", ""));
        if (typeof gd == 'object')
        this.globalData.addOptions(gd);

    },

    Serialize  :function (data) {
        if (data)
        try{var ret =JSON.stringify(data)}catch(e){SITR.log('error saving')}
        return ret||null;
    },
    UnSerialize : function (data) {
        if (data)
        try{var ret =JSON.parse(data)}catch(e){SITR.log('error loading')}
        return ret||null;
    },

    Save : function () {
        SITR.setVar("cities", this.Serialize(SITR.db.cities));
        SITR.setVar("Options", this.Serialize(SITR.db.options));
        //SITR.setVar("LocalStrings", this.Serialize(SITR.dbglobalData.localStrings));
        SITR.setVar("globalData", this.Serialize(SITR.db.globalData));
    },

    OldVersion : function () {
        if (this.options.version < 1.103 && this.options.version != 0)
            SITR.HardReset()
        else this.options.version = SITR.version;
        //SITR.Render.toast('OldVersion Updated')
    },

    LocalStr : function (string) {
        var tString = string
        var lString;
        //normal building var names "townHall"
        lString = this.globalData.localStrings[tString.replace(/([A-Z])/g, "_$1").toLowerCase()];

        //space in name "town Hall"
        if (lString == undefined)
            lString = this.globalData.localStrings[tString.toLowerCase().split(' ').join('_')];
        return (lString == undefined) ? tString : lString;
    },

    AddLocalStr          :function (string, value) {
        if (this.LocalStr(string) == string)
            this.globalData.localStrings[string.toLowerCase().split(' ').join('_')] = value;
    },

    GetFleetMovementsTo : function (cityID) {
        if (this.globalData.fleetMovements)
            return (this.globalData.fleetMovements[cityID]) ? this.globalData.fleetMovements[cityID] : false;
        return false
    },

    getCityFromName : function (name) {
        for (var cID in this.cities) {
            if (this.cities[cID].name == name)
                return this.cities[cID];
        }
        return false
    },

    hasResearchedLevel   :function (research) {
                if (this.globalData.research.topics[research] != undefined)
                    return this.globalData.research.topics[research].level;
        return 0;
    },

    //Removes fleets that have NOT landed or have landed BEFORE the destination city was last visited
    CleanUpFleetMovements : function (all) {
        if (this.globalData.fleetMovements)
            for (var cityID in this.cities) {
                for (var resID in this.globalData.fleetMovements[cityID]) {
                    for (var movID in this.globalData.fleetMovements[cityID][resID]) {
                        if (this.globalData.fleetMovements[cityID][resID][movID].arrivalTime < $.now()) { //arrived?
                            if (this.cities[cityID].knownTime > this.globalData.fleetMovements[cityID][resID][movID].arrivalTime)   //updated res by visiting?
                                delete this.globalData.fleetMovements[cityID][resID][movID];                    //then remove it
                        } else if (all && movID.match('XXX')) {
                            delete this.globalData.fleetMovements[cityID][resID][movID];
                        } else {
                            if(all)delete this.globalData.fleetMovements[cityID][resID][movID]; //will be re-added via parse
                        }
                    }
                }

            }
        if (this.globalData.militaryMovements)
            for (cityID in this.cities) {
                var cityMovements = this.globalData.militaryMovements[cityID];
                for (var rowID in cityMovements)
                    if (cityMovements[rowID].arrivalTime < $.now()) {
                        for (var uID in cityMovements[rowID].troops) {
                            var i = this.cities[cityID].army.length
                            while (i) {
                                i--
                                if (this.cities[cityID].army[i].id == uID) {
                                    this.cities[cityID].army[i].count += cityMovements[rowID].troops[uID];
                                    delete this.globalData.militaryMovements[cityID][rowID]
                                    break;
                                }
                            }
                        }
                    } else if (all) delete this.globalData.militaryMovements[cityID][rowID];
            }
    },

    AddFleetMovement : function (resObj) {
        //rather be too safe atm :D
        if (resObj.mission == 'deployfleet' || resObj.mission == 'deployarmy')
        {
            if (!SITR.db.globalData.militaryMovements[resObj.targetCityId])SITR.db.globalData.militaryMovements[resObj.targetCityId] = {}
            SITR.db.globalData.militaryMovements[resObj.targetCityId][resObj.id] = resObj;
            return true;
        }


        if (resObj.id && (resObj.wood || resObj.wine || resObj.marble || resObj.glass || resObj.sulfur) && resObj.targetCityId && resObj.arrivalTime && resObj.originCityId && !isNaN(resObj.loadedTime) && resObj.mission) {
            if (!(SITR.db.globalData.fleetMovements[resObj.targetCityId])) SITR.db.globalData.fleetMovements[resObj.targetCityId] = {};

            if (!(SITR.db.globalData.fleetMovements[resObj.targetCityId].wood)) SITR.db.globalData.fleetMovements[resObj.targetCityId].wood = {};
            if (!(SITR.db.globalData.fleetMovements[resObj.targetCityId].wine)) SITR.db.globalData.fleetMovements[resObj.targetCityId].wine = {};
            if (!(SITR.db.globalData.fleetMovements[resObj.targetCityId].marble)) SITR.db.globalData.fleetMovements[resObj.targetCityId].marble = {};
            if (!(SITR.db.globalData.fleetMovements[resObj.targetCityId].glass)) SITR.db.globalData.fleetMovements[resObj.targetCityId].glass = {};
            if (!(SITR.db.globalData.fleetMovements[resObj.targetCityId].sulfur)) SITR.db.globalData.fleetMovements[resObj.targetCityId].sulfur = {};

            if (resObj.wood > 0)     SITR.db.globalData.fleetMovements[resObj.targetCityId].wood[resObj.id] = {res:resObj.wood, arrivalTime:resObj.arrivalTime, origin:resObj.originCityId, loadedTime:resObj.loadedTime, mission:resObj.mission};
            if (resObj.wine > 0)     SITR.db.globalData.fleetMovements[resObj.targetCityId].wine[resObj.id] = {res:resObj.wine, arrivalTime:resObj.arrivalTime, origin:resObj.originCityId, loadedTime:resObj.loadedTime, mission:resObj.mission};
            if (resObj.marble > 0)   SITR.db.globalData.fleetMovements[resObj.targetCityId].marble[resObj.id] = {res:resObj.marble, arrivalTime:resObj.arrivalTime, origin:resObj.originCityId, loadedTime:resObj.loadedTime, mission:resObj.mission};
            if (resObj.glass > 0)  SITR.db.globalData.fleetMovements[resObj.targetCityId].glass[resObj.id] = {res:resObj.glass, arrivalTime:resObj.arrivalTime, origin:resObj.originCityId, loadedTime:resObj.loadedTime, mission:resObj.mission};
            if (resObj.sulfur > 0)   SITR.db.globalData.fleetMovements[resObj.targetCityId].sulfur[resObj.id] = {res:resObj.sulfur, arrivalTime:resObj.arrivalTime, origin:resObj.originCityId, loadedTime:resObj.loadedTime, mission:resObj.mission};
        }
    },

    getFleetMovementForCity : function (cityID) {
        var incMovements = this.GetFleetMovementsTo(cityID);

        return [compileMovements(incMovements.wood), compileMovements(incMovements.wine), compileMovements(incMovements.marble), compileMovements(incMovements.glass), compileMovements(incMovements.sulfur)];

        function compileMovements(resMovements) {
            var total = 0;
            var incMov = {};
            if (resMovements != undefined)
                for (var movID in resMovements) {
                    if (SITR.db.cities[cityID].knownTime < resMovements[movID].arrivalTime) {
                        total += resMovements[movID].res;
                        incMov[movID] = resMovements[movID];
                    }
                }
            total = (total == 0) ? '-' : FormatNumToStr(total, true);
            return [JSON.stringify(incMov), total]
        }
    },
    getIncomingMovementTotals : function(cityID){
        var incMovements = this.GetFleetMovementsTo(cityID);
        var a = {wood:0, wine:0, marble:0, glass:0, sulfur:0};
        for (var id in incMovements){
            for (var id2 in incMovements[id])
                if (SITR.db.cities[cityID].knownTime < incMovements[id][id2].arrivalTime)
                    a[id]+=incMovements[id][id2].res
        }
        return a
    },
    getArrivedMovementTotals : function(cityID){
        var incMovements = this.GetFleetMovementsTo(cityID);
        var a = {wood:0, wine:0, marble:0, glass:0, sulfur:0};
        for (var id in incMovements){
            for (var id2 in incMovements[id])
                if (SITR.db.cities[cityID].knownTime < incMovements[id][id2].arrivalTime && incMovements[id][id2].arrivalTime < $.now())
                    a[id]+=incMovements[id][id2].res
        }
        return a
    },
    getResourceTotals :function(){
      var a = {resources:{wood:0, wine:0, marble:0, glass:0, sulfur:0},movements:{wood:0, wine:0, marble:0, glass:0, sulfur:0}}
        for (var cid in this.cities)
        {
            var movements = this.getIncomingMovementTotals(cid);
            var resources = this.cities[cid].currentResAll();
            for (var res in movements)
            {
                a.resources[res] += resources[res];
                a.movements[res] += movements[res];
            }
        }
        return a
    },
    BuildingsCost : function () {
        var that = this;
        if (this._BuildingCostList == null)
            this._BuildingCostList = {
                academy     :{
                    wood  :[64, 68, 115, 263, 382, 626, 982, 1330, 2004, 2665, 3916, 5156, 7446, 9753, 12751, 18163, 23691, 33451, 43571, 56729, 73832, 103459, 144203, 175058, 243930, 317208, 439967, 536310, 743789, 1027469, 1257244, 1736681],
                    glass :[0, 0, 0, 0, 225, 428, 744, 1089, 1748, 2454, 3786, 5216, 7862, 10729, 14599, 21627, 29321, 43020, 58213, 78724, 106414, 154857, 224146, 282571, 408877, 552141, 795252, 1006647, 1449741, 2079650, 2642546, 3790581],
                    marble:0,
                    sulfur:0,
                    wine  :0,
                    t     :{a:1440, b:1, c:1.2, d:720}
                },
                alchemist   :{
                    wood  :[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
                    glass :0,
                    marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
                    sulfur:0,
                    wine  :0,
                    t     :{a:72000, b:11, c:1.1, d:6120}
                },
                architect   :{
                    wood  :[185, 291, 413, 555, 720, 911, 1133, 1390, 1689, 2035, 2437, 2902, 3443, 4070, 4797, 5640, 6618, 7754, 9070, 10598, 12369, 14424, 16807, 19573, 22780, 26501, 30817, 35826, 41631, 48371, 56185, 65251],
                    glass :0,
                    marble:[106, 160, 222, 295, 379, 475, 587, 716, 865, 1036, 1233, 1460, 1722, 2023, 2369, 2767, 3226, 3752, 4358, 5056, 5857, 6778, 7836, 9052, 10448, 12054, 13899, 16289, 18450, 21246, 24455, 28141],
                    sulfur:0,
                    wine  :0,
                    t     :{a:125660, b:37, c:1.06, d:2628}
                },
                barracks    :{
                    wood  :[48, 114, 195, 296, 420, 574, 766, 1003, 1297, 1662, 2115, 2676, 3371, 4234, 5304, 6630, 8275, 10314, 12843, 15979, 19868, 24690, 30669, 38083, 47277, 58676, 72812, 90341, 112076, 139028, 172448, 213889, 265276, 328996, 408008, 505984],
                    glass :0,
                    marble:[0, 0, 0, 0, 0, 0, 0, 0, 178, 431, 745, 1134, 1616, 2214, 2956, 3875, 5015, 6429, 8183, 10357, 13052, 16395, 20540, 25680, 32054, 39957, 49757, 61909, 76977, 95661, 118830, 147560, 183185, 227359, 282136, 350059],
                    sulfur:0,
                    wine  :0,
                    t     :{a:25200, b:11, c:1.1, d:1728}
                },
                branchOffice:{
                    wood  :[48, 173, 346, 581, 896, 1314, 1863, 2580, 3509, 4706, 6241, 8203, 10699, 13866, 17872, 22926, 29286, 37272, 47283, 59806, 75447, 94954, 119245, 149453, 186977, 233530, 291225, 362658, 451015, 560208, 695038, 861391],
                    glass :0,
                    marble:[0, 0, 0, 0, 540, 792, 1123, 1555, 2115, 2837, 3762, 4945, 6450, 8359, 10774, 13820, 17654, 22469, 28503, 36051, 45482, 57240, 71883, 90092, 112712, 121067, 175556, 218617, 271878, 337705, 418983, 446564],
                    sulfur:0,
                    wine  :0,
                    t     :{a:108000, b:11, c:1.1, d:9360}
                },
                carpentering:{
                    wood  :[63, 122, 191, 274, 372, 486, 620, 777, 962, 1178, 1432, 1730, 2078, 2486, 2964, 3524, 4178, 4945, 5841, 6890, 8117, 9550, 11229, 13190, 15484, 18166, 21299, 24963, 29245, 34247, 40096, 46930],
                    glass :0,
                    marble:[0, 0, 0, 0, 0, 0, 0, 359, 444, 546, 669, 816, 993, 1205, 1459, 1765, 2131, 2571, 3097, 3731, 4490, 5402, 6496, 7809, 9383, 11274, 13543, 16265, 19531, 23450, 28154, 33798],
                    sulfur:0,
                    wine  :0,
                    t     :{a:125660, b:37, c:1.06, d:2808}
                },
                embassy     :{

                    wood  :[242, 415, 623, 873, 1173, 1532, 1964, 2482, 3103, 3849, 4743, 5817, 7105, 8651, 10507, 12733, 15610, 18498, 22457, 27074, 32290, 33764, 47240, 56812, 70157, 84318, 101310, 121979, 146503, 175932, 222202, 266778],
                    glass :0,
                    marble:[155, 342, 571, 850, 1190, 1606, 2112, 2730, 3484, 4404, 5527, 6896, 8566, 10604, 13090, 16123, 19824, 24339, 29846, 36564, 45216, 47097, 66967, 81859, 104537, 129580, 158759, 193849, 236659, 288888, 358869, 437985 ],
                    sulfur:0,
                    wine  :0,
                    t     :{a:96000, b:7, c:1.05, d:10080}
                },
                fireworker  :{
                    wood  :[272, 353, 445, 551, 673, 813, 974, 1159, 1373, 1618, 1899, 2223, 2596, 3025, 3517, 4084, 4736, 5485, 6346, 7338, 8478, 9790, 11297, 13030, 14990, 17317, 19954, 22986, 26472, 30484, 35096, 40398],
                    glass :0,
                    marble:[135, 212, 302, 405, 526, 665, 827, 1015, 1233, 1486, 1779, 2120, 2514, 2972, 3503, 4119, 4834, 5662, 6623, 7738, 9032, 10534, 12275, 13355, 16636, 19354, 22507, 26163, 30404, 35325, 41033, 47652],
                    sulfur:0,
                    wine  :0,
                    t     :{a:125660, b:37, c:1.06, d:2628}
                },
                forester    :{
                    wood  :[250, 430, 664, 968, 1364, 1878, 2546, 3415, 4544, 6013, 7922, 10403, 13629, 17823, 23274, 30362, 39574, 51552, 67123, 87363, 113680, 147889, 192360, 250173, 325258, 423034, 550049, 715169, 929826, 1208878, 1571646, 2043246],
                    glass :0,
                    marble:[0, 104, 237, 410, 635, 928, 1309, 1803, 2446, 3282, 4368, 5781, 7617, 10422, 13108, 17142, 22386, 29204, 38068, 49589, 64569, 84041, 109356, 142266, 185046, 240663, 312965, 406956, 529144, 687989, 894489, 1162937],
                    sulfur:0,
                    wine  :0,
                    t     :{a:72000, b:11, c:1.1, d:6120}
                },
                glassblowing:{
                    wood  :[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
                    glass :0,
                    marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
                    sulfur:0,
                    wine  :0,
                    t     :{a:72000, b:11, c:1.1, d:6120}
                },
                museum      :{
                    wood  :[560, 1435, 2748, 4716, 7669, 12099, 18744, 28710, 43661, 66086, 99724, 150181, 225866, 339394, 509686, 765124, 1148280, 1723016, 2585120, 3878276],
                    glass :0,
                    marble:[280, 1190, 2573, 4676, 7871, 12729, 20112, 31335, 48394, 74323, 113736, 173643, 264701, 403110, 613492, 933272, 1419338, 2158157, 3281164, 4988135],
                    sulfur:0,
                    wine  :0,
                    t     :{a:18000, b:1, c:1.1, d:14040}
                },
                optician    :{
                    wood  :[119, 188, 269, 362, 471, 597, 742, 912, 1108, 1335, 1600, 1906, 2261, 2673, 3152, 3706, 4348, 5096, 5962, 6966, 8131, 9482, 11050, 12868, 14978, 17424, 20262, 23553, 27373, 31804, 36943, 42904],
                    glass :0,
                    marble:[0, 35, 96, 167, 249, 345, 455, 584, 733, 905, 1106, 1338, 1608, 1921, 2283, 2704, 3191, 3759, 4416, 5178, 6062, 7087, 8276, 9656, 11257, 13113, 15267, 17762, 20662, 24024, 27922, 32447],
                    sulfur:0,
                    wine  :0,
                    t     :{a:125660, b:37, c:1.06, d:2772}
                },
                palace      :{
                    wood  :[712, 5823, 16048, 36496, 77392, 159184, 322768, 649936, 1304272, 2612944, 4743517],
                    glass :[0, 0, 0, 0, 21188, 42400, 84824, 169672, 339368, 678760, 1357543],
                    marble:[0, 1433, 4546, 10770, 23218, 48114, 97906, 197490, 396658, 794994, 1591666],
                    sulfur:[0, 0, 3088, 10300, 24725, 53573, 111269, 226661, 457445, 919013, 1842149],
                    wine  :[0, 0, 0, 10898, 22110, 44534, 89382, 179078, 358470, 717254, 1434821],
                    t     :{a:11520, b:1, c:1.4, d:0}
                },
                palaceColony:{
                    wood  :[712, 5823, 16048, 36496, 77392, 159184, 322768, 649936, 1304272, 2612944, 4743517],
                    glass :[0, 0, 0, 0, 21188, 42400, 84824, 169672, 339368, 678760, 1357543],
                    marble:[0, 1433, 4546, 10770, 23218, 48114, 97906, 197490, 396658, 794994, 1591666],
                    sulfur:[0, 0, 3088, 10300, 24725, 53573, 111269, 226661, 457445, 919013, 1842149],
                    wine  :[0, 0, 0, 10898, 22110, 44534, 89382, 179078, 358470, 717254, 1434821],
                    t     :{a:11520, b:1, c:1.4, d:0}
                },
                port        :{
                    wood  :[60, 150, 274, 429, 637, 894, 1207, 1645, 2106, 2735, 3537, 4492, 5689, 7103, 8850, 11094, 13731, 17062, 21097, 25965, 31810, 39190, 47998, 58713, 71955, 87627, 107102, 130776, 159019, 193938, 235849, 286514, 348718, 423990, 513947, 625160, 758178, 919693, 1116013, 1353517, 1642274, 1990223, 2411061],
                    glass :0,
                    marble:[0, 0, 0, 0, 0, 176, 326, 540, 791, 1138, 1598, 2176, 2928, 3859, 5051, 6628, 8566, 11089, 14265, 18241, 23197, 29642, 37636, 47703, 60556, 76367, 96639, 122156, 153753, 194089, 244300, 307174, 386955, 486969, 610992, 769302, 965792, 1212790, 1523570, 1913072, 2403313, 3015688, 3782992],
                    sulfur:0,
                    wine  :0,
                    t     :{a:50400, b:23, c:1.15, d:1512}
                },
                safehouse   :{
                    wood  :[113, 248, 402, 578, 779, 1007, 1267, 1564, 1903, 2288, 2728, 3230, 3801, 4453, 5195, 6042, 7008, 8108, 9363, 10793, 12423, 14282, 16401, 18816, 21570, 24709, 28288, 32368, 37019, 42321, 48365, 55255],
                    glass :0,
                    marble:[0, 0, 0, 129, 197, 275, 366, 471, 593, 735, 900, 1090, 1312, 1569, 1866, 2212, 2613, 3078, 3617, 4243, 4968, 5810, 6787, 7919, 9233, 10758, 12526, 14577, 16956, 19716, 22917, 26631],
                    sulfur:0,
                    wine  :0,
                    t     :{a:96000, b:7, c:1.05, d:12960}
                },
                shipyard    :{
                    wood  :[98, 202, 324, 477, 671, 914, 1222, 1609, 2096, 2711, 3485, 4459, 5688, 7238, 9190, 11648, 14746, 18650, 23568, 29765, 37573, 47412, 59808, 75428, 95108, 119906, 151151, 190520, 240124, 302626, 381378, 480605],
                    glass :0,
                    marble:[0, 0, 0, 0, 0, 778, 1052, 1397, 1832, 2381, 3070, 3941, 5037, 6420, 8161, 10354, 13118, 16601, 20989, 26517, 33484, 42261, 53321, 67256, 84814, 106938, 134814, 169937, 214192, 269954, 340214, 428741],
                    sulfur:0,
                    wine  :0,
                    t     :{a:64800, b:7, c:1.05, d:7128}
                },
                stonemason  :{
                    wood  :[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
                    glass :0,
                    marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
                    sulfur:0,
                    wine  :0,
                    t     :{a:72000, b:11, c:1.1, d:6120}
                },
                temple      :{
                    wood  :[216, 228, 333, 465, 598, 760, 958, 1197, 1432, 1773, 2112, 2512, 3082, 3655, 4458, 5126, 6232, 7167, 8687, 10247, 11784, 14228, 16752, 19265, 23156, 26663, 32026, 36830, 43256, 50782, 59591, 68528],
                    glass :0,
                    marble:[172, 189, 290, 423, 566, 752, 988, 1290, 1610, 2080, 2586, 3210, 4109, 5084, 6471, 7765, 9850, 11821, 14952, 18402, 22082, 27824, 34183, 41020, 51514, 61817, 77477, 92972, 113941, 139576, 170910, 205093],
                    sulfur:0,
                    wine  :0,
                    t     :{a:2160, b:1, c:1.1, d:0}
                },
                tavern      :{
                    wood  :[101, 222, 367, 541, 750, 1001, 1302, 1663, 2097, 2617, 3241, 3990, 4888, 5967, 7261, 8814, 10678, 12914, 15598, 18818, 22683, 27320, 32885, 39562, 47576, 57192, 68731, 82578, 99194, 119134, 143061, 171774, 206230, 247577, 297193, 356732, 428179, 513916, 616800, 740261, 888413, 1066196, 1279537, 1535545, 1842756, 2211407, 2653789 ],
                    glass :0,
                    marble:[0, 0, 0, 94, 122, 158, 206, 267, 348, 452, 587, 764, 993, 1290, 1677, 2181, 2835, 3685, 4791, 6228, 8097, 10526, 13684, 17789, 23125, 30063, 39082, 50806, 66048, 85862, 111621, 145107, 188640, 245232, 318801, 414441, 538774, 700406, 910528, 1183686, 1538791, 2000427, 2600557, 3380725, 4394943, 5713425, 7427454],
                    sulfur:0,
                    wine  :0,
                    t     :{a:10800, b:1, c:1.06, d:10440}
                },
                townHall    :{
                    wood  :[0, 158, 335, 623, 923, 1390, 2015, 2706, 3661, 4776, 6173, 8074, 10281, 13023, 16424, 20986, 25423, 32285, 40232, 49286, 61207, 74804, 93956, 113035, 141594, 170213, 210011, 258875, 314902, 387656, 471194, 572580, 695615, 854728, 1037814, 1274043, 1714396, 1876185, 2276285, 2761291],
                    glass :0,
                    marble:[0, 0, 0, 0, 285, 551, 936, 1411, 2091, 2945, 4072, 5664, 7637, 10214, 13575, 18254, 23250, 31022, 40599, 52216, 68069, 87316, 115101, 145326, 191053, 241039, 312128, 403825, 515593, 666228, 850031, 1084292, 1382826, 1783721, 2273685, 2930330, 3692589, 4756439, 6058680, 7716365],
                    sulfur:0,
                    wine  :0,
                    t     :{a:1800, b:1, c:1.17, d:-1080}
                },
                vineyard    :{
                    wood  :[339, 423, 520, 631, 758, 905, 1074, 1269, 1492, 1749, 2045, 2384, 2775, 3225, 3741, 4336, 5019, 5813, 6875, 7941, 8944, 10319, 11900, 13718, 15809, 18215, 20978, 24159, 27816, 32021, 36857, 42419],
                    glass :0,
                    marble:[123, 198, 285, 387, 504, 640, 798, 981, 1194, 1440, 1726, 2058, 2443, 2889, 3407, 4008, 4705, 5513, 6450, 7537, 8800, 10263, 11961, 13930, 16214, 18864, 21938, 25503, 29639, 34437, 40002, 46457],
                    sulfur:0,
                    wine  :0,
                    t     :{a:125660, b:37, c:1.06, d:2232}
                },
                wall        :{
                    wood  :[114, 361, 657, 1012, 1439, 1951, 2565, 3302, 4186, 5247, 6521, 8049, 9882, 12083, 14724, 17892, 21695, 26258, 31733, 38304, 46189, 55650, 67004, 80629, 96979, 116599, 140143, 168395, 202298, 242982, 291802, 350387, 420689, 505049, 606284, 727765, 873541, 1048473, 1258393, 1510294, 1812577, 2175317, 2610603, 3132948, 3759764],
                    glass :0,
                    marble:[0, 203, 516, 892, 1344, 1885, 2535, 3315, 4251, 5374, 6721, 8338, 10279, 12608, 15402, 18755, 22779, 27607, 33402, 40355, 48699, 58711, 70726, 85144, 102446, 123208, 148122, 178019, 213896, 256948, 308610, 370605, 444998, 534270, 641397, 769949, 924213, 1109328, 1331467, 1598031, 1917913, 2301767, 2762392, 3315144, 3978446],
                    sulfur:0,
                    wine  :0,
                    t     :{a:57600, b:11, c:1.1, d:3240}
                },
                warehouse   :{
                    wood  :[160, 288, 442, 626, 847, 1113, 1431, 1813, 2272, 2822, 3483, 4275, 5226, 6368, 7737, 9380, 11353, 13719, 16559, 19967, 24056, 28963, 34852, 41918, 50398, 60574, 72784, 87437, 105021, 126121, 151441, 181825, 218286, 262039, 314543, 377548, 453153, 543880, 652752, 783398],
                    glass :0,
                    marble:[0, 0, 0, 96, 211, 349, 515, 714, 953, 1240, 1584, 1997, 2492, 3086, 3800, 4656, 5683, 6915, 8394, 10169, 12299, 14855, 17922, 21602, 26019, 31319, 37678, 45310, 54468, 65458, 78645, 94471, 113461, 136249, 163595, 196409, 235787, 283041, 339745, 407790 ],
                    sulfur:0,
                    wine  :0,
                    t     :{a:2880, b:1, c:1.14, d:2160}
                },
                winegrower  :{
                    wood  :[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
                    glass :0,
                    marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
                    sulfur:0,
                    wine  :0,
                    t     :{a:72000, b:11, c:1.1, d:6120}
                },
                workshop    :{
                    wood  :[206, 383, 569, 781, 1023, 1299, 1613, 1972, 2380, 2846, 3377, 3982, 4672, 5458, 6355, 7377, 8542, 9870, 11385, 13111, 15078, 17714, 19481, 22796, 26119, 29909, 34228, 39153, 44766, 51166, 58462, 66778],
                    glass :0,
                    marble:[89, 167, 251, 349, 461, 592, 744, 920, 1125, 1362, 1637, 1956, 2326, 2755, 3253, 3831, 4500, 5279, 6180, 7226, 8439, 9776, 11477, 13373, 15570, 18118, 21074, 24503, 28481, 33095, 38447, 44656],
                    sulfur:0,
                    wine  :0,
                    t     :{a:96000, b:7, c:1.05, d:11880}
                },
                dump        :{
                    wood  :[640, 1152, 1766, 2504, 3388, 4450, 5724, 7253, 9088, 11289, 13931, 17101, 20905, 25470, 30948, 37522, 45410, 54876, 66236, 79867, 96223, 115852, 139407, 167672, 201592, 242293, 291136, 349749, 420081, 504483, 605763, 727300, 873143, 1048157, 1258171, 1510191, 1812613, 2175519, 2611007, 3133592],
                    glass :[701, 1146, 1668, 2278, 2991, 3526, 4803, 5946, 7283, 8847, 10678, 12819, 15324, 18257, 21687, 25700, 30395, 35889, 42316, 49837, 58635, 68929, 80973, 95065, 111553, 130843, 153414, 179821, 201716, 246864, 289157, 338642, 396536, 464274, 543528, 636253, 744742, 871676, 1020187, 1193945],
                    marble:[497, 932, 1445, 2051, 2762, 3609, 4604, 5778, 7164, 8799, 10728, 13005, 15691, 18862, 22602, 27016, 32225, 38371, 45623, 54181, 64278, 76194, 90256, 106847, 126424, 149528, 176787, 208956, 246913, 291702, 344555, 406921, 480512, 567350, 669817, 790730, 933408, 1101767, 1300431, 1534855],
                    sulfur:[384, 845, 1398, 2061, 2858, 3813, 4960, 6336, 7987, 9968, 12346, 15199, 18623, 22731, 27661, 33578, 40677, 49197, 59420, 71688, 86409, 104076, 125274, 150714, 181241, 217872, 261830, 314581, 377881, 453842, 544994, 654378, 785637, 943149, 1132163, 1358979, 1631159, 1957774, 2349714, 2820041],
                    wine  :0,
                    t     :{a:32000, b:13, c:1.17, d:2160}
                }
            };
        this._BuildingCostList.getBuildingLevel = function (building, level) {
            var a = {wood:0, glass:0, marble:0, sulfur:0, wine:0};
            a.wood = this[building].wood[level] || 0;
            a.glass = this[building].glass[level] || 0;
            a.marble = this[building].marble[level] || 0;
            a.sulfur = this[building].sulfur[level] || 0;
            a.wine = this[building].wine[level] || 0;
            return a
        };
        this._BuildingCostList.getBuildingMatsForLevel = function (building, level, city) {
            var a = {wood:0, glass:0, marble:0, sulfur:0, wine:0, time:0};
            var b = 0;
            if (typeof city == 'object')
                b = city.buildings;
            else if (!isNaN(city))
                b = that.cities[city].buildings;
            try {
                a.wood = this[building].wood[level] || 0;
                a.glass = this[building].glass[level] || 0;
                a.marble = this[building].marble[level] || 0;
                a.sulfur = this[building].sulfur[level] || 0;
                a.wine = this[building].wine[level] || 0;
                var t = this[building].t;
                a.time = Math.round(t.a / t.b * Math.pow(t.c, level+1) - t.d)* 1000
            } catch (e) {
            }
            if (b) {
                var bon = (that.hasResearchedLevel(2100) ? 0.14 : that.hasResearchedLevel(2060) ? 6 : that.hasResearchedLevel(2020) ? 2 : 0);
                a.wood = (a.wood * ((100 - (b['carpentering'] ? b['carpentering'].level : 0)) / 100 - bon));
                a.glass = (a.glass * ((100 - (b['optician'] ? b['optician'].level : 0)) / 100 - bon));
                a.marble = (a.marble * ((100 - (b['architect'] ? b['architect'].level : 0)) / 100 - bon));
                a.sulfur = (a.sulfur * ((100 - (b['fireworker'] ? b['fireworker'].level : 0)) / 100 - bon));
                a.wine = (a.wine * ((100 - (b['vineyard'] ? b['vineyard'].level : 0)) / 100 - bon));
            }
            return a
        };
        return this._BuildingCostList

    },

    resourceObject : function(){return {wood:0, glass:0, marble:0, sulfur:0, wine:0}}

};

//Todo: move to ikariam object
SITR.db.GetLocalizationStrings = function () {
    var ls = {};
    $.extend(ls, unsafeWindow.LocalizationStrings);
    //merge ikariams time units
    $.extend(ls, ls.timeunits.short);
    //remove extra objects
    delete ls['warnings'];
    delete ls['timeunits'];

    //merge current Localization with Ikariam strings as lower case
    for (var strID in ls) {
        this.globalData.localStrings[strID.toLowerCase()] = ls[strID]
    }
};

/***********************************************************************************************************************
 *
 * SITR.Render
 *
 **********************************************************************************************************************/

SITR.Render = {
    _Parent       :null,
    mainContentBox:null,
    _cssResLoaded    :false,
    cssResLoaded : function () {
        var ret = this._cssResLoaded;
        this._cssResLoaded = true;
        return ret;
    },

    Init : function (parent) {
        this._Parent = parent;
        this.SidePanelButton();
        this.LoadCSS();
        this.DrawContentBox();
        this.RestoreDisplayOptions();
    },

    DrawItAll : function () {


        this.DrawTables();
        this.ToolTips();
    },

    DrawSettings : function () {
        var html = '';
        html += '<div class="options"><span style="font-weight: 700;">Views</span><br>' + '<span  sitr_tip="Show board on worldview<br>(effective on page reload)"><input type="checkbox" id="SITR_ShowOnWorldView" ' + (SITR.db.options.showOnWorldView ? 'checked="checked"' : '') + ' /> Worldview</span><br>' + '<span sitr_tip="Show board on islandview<br>(effective on page reload)"><input type="checkbox" id="SITR_ShowOnIslandView" ' + (SITR.db.options.showOnIslandView ? 'checked="checked"' : '') + ' /> Islandview</span><br>' + '</div>' + '<div class="options"><span style="font-weight: 700;">Board</span><br>' + '<span sitr_tip="Show board on top of Ikariam windows"><input type="checkbox" id="SITR_OnTopCheckbox" ' + (SITR.db.options.onTop ? 'checked="checked"' : '') + ' /> Show on top</span><br>' + '<span sitr_tip="Show all possible army units on the Army tab"><input type="checkbox" id="SITR_FullArmyTable" ' + (SITR.db.options.fullArmyTable ? 'checked="checked"' : '') + ' /> Show all units</span></span><br>' + '<span sitr_tip="Use a larger font for the data tables<br>(Temporary and not fully functional)"><input type="checkbox" id="SITR_LargeFont" ' + (SITR.db.options.largeFont ? 'checked="checked"' : '') + ' /> Larger Font</span></span><br>' + '<span sitr_tip="Use an alternate order for buildings<br>(Groups reduction together then production together)"><input type="checkbox" id="SITR_AltBuildingList" ' + (SITR.db.options.altBuildingList ? 'checked="checked"' : '') + ' /> Alternate building order</span></span><br>' + '</div>' + '<div class="options"><span style="font-weight: 700;">Other</span><br>' + '<span sitr_tip="Enable automatic update checking<br>(Once every 24hrs)"><input type="checkbox" id="SITR_EnableAutoUpdates" ' + (SITR.db.options.autoUpdates ? 'checked="checked"' : '') + ' /> Enable updates</span><br>' + '<span sitr_tip="Select wine &quot;warning&quot; time">Wine warning' + '<select id="SITR_WineWarningTime")>' + '<option value=12' + ((SITR.db.options.wineWarningTime == 12) ? "selected=selected" : "" ) + '>12 ' + SITR.db.LocalStr('hour') + '</option>' + '<option value=24' + ((SITR.db.options.wineWarningTime == 24) ? "selected=selected" : "" ) + '>24 ' + SITR.db.LocalStr('hour') + '</option>' + '<option value=36' + ((SITR.db.options.wineWarningTime == 36) ? "selected=selected" : "" ) + '>36 ' + SITR.db.LocalStr('hour') + '</option>' + '<option value=48' + ((SITR.db.options.wineWarningTime == 48) ? "selected=selected" : "" ) + '>48 ' + SITR.db.LocalStr('hour') + '</option>' + '</select>' + '</span><br>' + '</div><div style="clear:left"><p>&nbsp;Current version: '+this._Parent.version+'</p></div>' + '<div class="buttons">' + '<button  sitr_tip="Reset all settings to default" id="SITR_Reset_Button">Reset</button>' + '<button  sitr_tip="Goto the scripts Userscripts.com website " id="SITR_Website_Button">Website</button>' + '<button  sitr_tip="Force a check for updates" id="SITR_Update_Button">Check for updates</button>' + '</div>';

        $('#SettingsTab').html(html);

        //Event Handlers
        $("#SITR_OnTopCheckbox").on("click", function () {
            SITR.db.options.onTop = this.checked;
            SITR.Render.mainContentBox.css('z-index', this.checked ? 65112 : 2)
        });
        $("#SITR_FullArmyTable").on("click", function () {
            SITR.db.options.fullArmyTable = this.checked;
            SITR.Render.SetAllArmyData()
        });
        $("#SITR_ShowOnWorldView").on("click", function () {
            SITR.db.options.showOnWorldView = this.checked;
        });
        $("#SITR_ShowOnIslandView").on("click", function () {
            SITR.db.options.showOnIslandView = this.checked;
        });
        $("#SITR_EnableAutoUpdates").on("click", function () {
            SITR.db.options.autoUpdates = this.checked;
        });
        $("#SITR_LargeFont").on("click", function () {
            SITR.db.options.largeFont = this.checked;
        });
        $("#SITR_AltBuildingList").on("click", function () {
            SITR.db.options.altBuildingList = this.checked;
            var that = this;
            $('.buildings tr').each(
                function(){
                    var a = $(this).find('.forester0');
                    var b = $(this).find('.carpentering0');

                    var c = $(this).find('.winegrower0');
                    var d = $(this).find('.vineyard0');

                    var e = $(this).find('.stonemason0');
                    var f = $(this).find('.architect0');

                    var g = $(this).find('.glassblowing0');
                    var h = $(this).find('.optician0');

                    if (that.checked){
                    //To alt layout
                    a.after(g.removeClass('lf').addClass('lfdash'))
                        .after(e.removeClass('lf').addClass('lfdash'))
                        .after(c.removeClass('lf').addClass('lfdash'))
                    b.after(h)
                        .after(f)
                        .after(d).removeClass('lfdash').addClass('lf')
                    }
                    else {
                    //To normal layout
                    a.after(g).after(e).after(c)
                    a.after(b.removeClass('lf').addClass('lfdash')).removeClass('lfdash').addClass('lf')
                    c.after(d).removeClass('lfdash').addClass('lf')
                    e.after(f).removeClass('lfdash').addClass('lf')
                    g.after(h).removeClass('lfdash').addClass('lf')
                    }
                     a=b=c=d=e=f=g=h =null
                });
        });
        $("#SITR_WineWarningTime").on('change', function () {
            SITR.db.options.wineWarningTime = (this.selectedIndex * 12) + 12;
        });
        $("#SITR_Website_Button").on("click", function () {
            GM_openInTab('http://userscripts.org/scripts/show/' + SITR.scriptId);
        });
        $("#SITR_Reset_Button").click(function () {
            SITR.HardReset();
        });
        $("#SITR_Update_Button").click(function () {
            SITR.CheckForUpdates(true);
        });

        //Additional Stuff
        $("#SITR_Reset_Button").button({icons:{primary:"ui-icon-alert"}, text:true});
        $("#SITR_Website_Button").button({icons:{primary:"ui-icon-home"}, text:true});
        $("#SITR_Update_Button").button({icons:{primary:"ui-icon-info"}, text:true});
    },

    toast : function (sMessage) {
        $('<div>').addClass("ui-tooltip-content ui-widget-content").text(sMessage)
            .appendTo(
                $(document.createElement("div"))
                    .addClass("ui-helper-reset ui-tooltip ui-tooltip-pos-bc ui-widget")
                    .css({position:'relative',display:'inline-block',left:'auto',top:'auto'})
                    .show()
                    .appendTo(
                        $(document.createElement("div")).addClass("toast")
                            .appendTo(document.body)
                            .delay(100).fadeIn("slow", function () {
                                $(this).delay(2000).fadeOut("slow", function () {
                                    $(this).remove();
                                });
                            })
                    )
            );
    },

    RestoreDisplayOptions : function () {
            $('#SITRBoard').css('left', this._Parent.db.options.window.left);
            $('#SITRBoard').css('top', this._Parent.db.options.window.top);
            $('#SITR_Tabs').tabs('select', this._Parent.db.options.window.activeTab);
            if (this._Parent.db.options.window['visible'])
                this.mainContentBox.fadeToggle('slow');


    },

    SaveDisplayOptions: function () {
        if (this._Parent.db.options)
            try {
                this._Parent.db.options.addOptions({window: {
                    left     : $('#SITRBoard').css('left'),
                    top      : $('#SITRBoard').css('top'),
                    visible  : ($('#SITRBoard').css('display') != 'none'),
                    activeTab: $('#SITR_Tabs').tabs('option', 'selected')}
                })
            } catch (e) {
                SITR.log(e.name + " : " + e.message)
            }
    },

    SidePanelButton : function () {
        $(".SITR_Menu").on("click", function () {
            SITR.Render.ToggleMainBox();
        });
    },

    ToggleMainBox : function () {
            this._Parent.db.options.window.visible = (this.mainContentBox.css('display') == 'none');
            this.mainContentBox.fadeToggle("slow");
    },
    updateTables: function(){
        this.SetAllArmyData(true);
        this.SetAllBuildingData(true);
        this.SetAllResourceData(true);
    },
    DrawTables       :function () {
        if ($(this.mainContentBox)) {
            $('#ArmyTab').html(this.GetArmyTable());
            $('#ResTab').html(this.GetResourceTable());
            $('#BuildTab').html(this.GetBuildingTable());
            this.DrawSettings();

            this.SetAllArmyData(true);
            this.SetAllResourceData(true);
            this.SetAllBuildingData(true);
            $('#ArmyTab .resources > tbody > tr:even , #ResTab .resources > tbody > tr:even , #BuildTab .resources > tbody > tr:even').addClass('odd');
        }

        this.AttachClickHandlers();
    },
    DrawArmyTable    :function () {
        if ($(this.mainContentBox)) {
            $('#ArmyTab').html(this.GetArmyTable());
            this.SetAllArmyData(true);
            $('#ArmyTab .resources > tbody > tr:even').addClass('odd');
        }
    },
    DrawResourceTable : function () {
        if ($(this.mainContentBox)) {
            $('#ResTab').html(this.GetResourceTable());
            this.SetAllResourceData(true);
            $('#ResTab .resources > tbody > tr:even').addClass('odd');
        }
    },
    DrawBuildingTable : function () {
        if ($(this.mainContentBox)) {
            $('#BuildTab').html(this.GetBuildingTable());
            this.SetAllBuildingData(true);
            $('#BuildTab .resources > tbody > tr:even').addClass('odd');
        }
    },

    GetResourceTable : function () {

        var elem = this.GetResourceHeader();
        for (var cID in this._Parent.db.cities) elem += this.GetResourceRow(this._Parent.db.cities[cID])
        elem += this.GetResourceFooter();
        return elem
    },

    GetArmyTable : function () {
        var counts = {};
        for (var _b in this._Parent.ikariam.OrderedArmy()) {
            //ordered init
            counts[_b] = 0;
        }
        //console.log(counts)

        var unitType = '', elem = '<table class="resources army"><thead>\n    <tr class="header_row" style="height:25px;">\n    <th class="city_name">' + this._Parent.db.LocalStr("cities") + '</th>\n    <th class="sitrap" style="background: url(skin/resources/icon_actionpoints.png) no-repeat center right;" sitr_tip="' + this._Parent.db.LocalStr("ActionPoints") + '"></th>\n    <th class="actions"></th>';

        for (var _unit in counts) {
                elem += '<th class="unit_name ';
                elem += ''+SITR.ikariam.OrderedArmy()[_unit].id + ' ' + (unitType != SITR.ikariam.OrderedArmy()[_unit].position ? ' lf"' : 'lfdash"');
                elem += 'colspan="2" style="background:url(' + getImage(_unit) + ')  no-repeat center center;background-size: 26px auto;display:none" sitr_tip="' + this._Parent.db.LocalStr(SITR.ikariam.OrderedArmy()[_unit].name);
                elem += '">&nbsp;</th>';
                unitType = SITR.ikariam.OrderedArmy()[_unit].position;

        }
        elem += '</tr></thead>\n    <tbody>';

        function getImage(unitID) {
            // /skin/characters/fleet/60x60/ship_submarine_faceright.png
            // /skin/characters/military/x60_y60/y60_medic_faceright.png
            return (SITR.ikariam.OrderedArmy()[unitID].type == 'fleet') ? 'skin/characters/fleet/60x60/' + SITR.ikariam.OrderedArmy()[unitID].name + '_faceright.png' : 'skin/characters/military/x60_y60/y60_' + SITR.ikariam.OrderedArmy()[unitID].name + '_faceright.png'
        }

        for (var _cID in this._Parent.db.cities) {
            elem += '<tr id="' + _cID + '_armyrow">';
            elem += makeRow(counts);
            elem += '</tr>';
        }

        function makeRow(unitCounts) {
            var element = '<td class="city_name"><img><span></span><sub></sub></td>\n    <td class="sitrap"></td>\n    <td class="sitractions">\n        <table>\n            <td class="deploymentfleet"></td><td class="deploymentarmy"></td>\n        </table>\n    </td>';
            unitType = '';
            for (var _unit in unitCounts) {
                    element += '<td class="army_unit ' + SITR.ikariam.OrderedArmy()[_unit].id + ' ' + (unitType != SITR.ikariam.OrderedArmy()[_unit].position ? 'lf' : 'lfdash') + '" style="display:none;"><span></span></td>';
                    element += '<td class="army_unit ' + SITR.ikariam.OrderedArmy()[_unit].id + ' nolf' + '" style="display:none;"><span class="More Green"></span><span class="More Blue"></span></td>';
                    unitType = SITR.ikariam.OrderedArmy()[_unit].position;
            }

            return element;
        }

        elem += '</tbody>';

        elem += '<tfoot><tr class="totals_row" style="height:25px;"><td class="city_name"></td><td class="sigma" colspan=2>\u03A3</td>';
        unitType = '';
        for (var _unit in counts) {
                elem += '<td colspan="2" class="army_total t_';
                elem += SITR.ikariam.OrderedArmy()[_unit].id + ' ' + (unitType != SITR.ikariam.OrderedArmy()[_unit].position ? ' lf"' : 'lfdash"');
                elem += '" style="display:none;">' + counts[_unit] + '</td>';
                unitType = SITR.ikariam.OrderedArmy()[_unit].position;
        }
        elem += '</tr></tfoot></table>';

        return elem;

    },

    GetBuildingTable : function () {

        var counts = {};
        if (this._Parent.db.options.altBuildingList) {
            for (var _b in this._Parent.ikariam.AlternateBuildingsList()) {
                //ordered init
                counts[_b] = 0;
            }
        } else {
            for (var _b in this._Parent.ikariam.BuildingsList()) {
                //ordered init
                counts[_b] = 0;
            }
        }

        for (var cID in this._Parent.db.cities) {
            for (var bName in this._Parent.db.cities[cID].buildings) {

                //if (this._Parent.db.cities[cID].buildings != null)
                if (this._Parent.db.cities[cID].buildings[bName] != undefined) {
                    if (counts[bName] < Object.keys(this._Parent.db.cities[cID].buildings[bName].levels).length) {
                        counts[bName] = Object.keys(this._Parent.db.cities[cID].buildings[bName].levels).length
                    }
                }
            }
        }
        //console.log(counts)
        var bldtype = '';
        var elem = '<table class="resources buildings"><thead>\n    <tr class="header_row" style="height:25px;">\n    <th class="city_name" colspan=2>' + this._Parent.db.LocalStr("cities") + '</th>\n    </th><th class="sitrap" style="background: url(skin/resources/icon_actionpoints.png) no-repeat center right;" sitr_tip="' + this._Parent.db.LocalStr("ActionPoints") + '"></th>\n    <th class="actions"></th>';
        for (var _bld in counts) {

                elem += '<th class="';
                elem += _bld.toLowerCase() + 0 + (bldtype != this._Parent.ikariam.Get_BuildingUsage(_bld) ? " lf" : " lfdash");
                elem += '" colspan=' + (counts[_bld]>1?counts[_bld]:1);
                elem += ' style="background:url(' + getImage(_bld) + ')  no-repeat center center;background-size: 60px 60px;display:none;" sitr_tip="' + this._Parent.db.LocalStr(_bld);
                elem += '">&nbsp;</th>';
                bldtype = this._Parent.ikariam.Get_BuildingUsage(_bld);
        }
        elem += '</tr></thead>\n    <tbody>';
        //'#'+ city.id + '_buildingsrow'
        for (var _cID in this._Parent.db.cities) {
            elem += '<tr id="' + _cID + '_buildingsrow">';
            elem += makeRow(counts);
            elem += '</tr>';
        }
        function getImage(buildingname) {
            buildingname = buildingname.toLowerCase();
            buildingname = (buildingname == 'tavern') ? 'taverne_l' : (buildingname == 'palacecolony') ? 'palaceColony_l' : (buildingname == 'wall') ? 'wall' : buildingname + '_l';
            return 'skin/img/city/' + buildingname + '.png'
        }

        function makeRow(buildingCounts) {
            var element = '<td class="city_name"><img><span></span><sub></sub></td>\n    <td class="city_info"></td><td class="sitrap">\n    <td class="sitractions">\n        <table>\n            <td class="transport"></td>\n        </table>\n    </td>';
            var _type = '';
            for (var _bldType in buildingCounts) {
                for (var i = 0; i < (buildingCounts[_bldType]>1?buildingCounts[_bldType]:1); i++) {
                    element += '<td class="' + _bldType.toLowerCase() + (i) + ' ' + (_type != SITR.ikariam.Get_BuildingUsage(_bldType) ? 'lf' : 'lfdash') + ' building" style="display:none;"><a></a></td>';
                    _type = SITR.ikariam.Get_BuildingUsage(_bldType);
                }
            }

            return element;
        }

        elem += '</tbody></table>';
        return elem;
    },

    GetResourceHeader : function () {

        var research = (SITR.db.globalData.research.lastUpdate < ($.now() - 172800000)) ? '<span style="font-size: 15px;text-align: center;" class="red" sitr_tip="Research Needs Updating">!</span>' : '';

        return '<table class="resources"><thead>\
        <tr class="header_row" style="height:25px;">\
            <th class="city_name" colspan=2>' + this._Parent.db.LocalStr("cities") + '</th>\
            <th class="sitrap" style="background: url(skin/resources/icon_actionpoints.png) no-repeat center right;" sitr_tip="' + this._Parent.db.LocalStr("ActionPoints") + '"></th>\
            <th class="actions"></th>\
            <th class="lf">' + this._Parent.db.LocalStr('citizens') + '</th>\
            <th class="lfdash" style="background: url(skin/smilies/happy.png) no-repeat center center;background-size: 20px 20px"></th>\
            <th class="lfdash" style="background: url(skin/icons/growth_positive.png) no-repeat center center;background-size: 20px 20px"></th>\
            <th class="research_header lf" sitr_tip="' + this._Parent.db.LocalStr('researchpoints') + '">' + research + ' <img id="" width="14" height="21" src="skin/layout/bulb-on.png"></th>\
            <th class="lf"><img alt="" sitr_tip="' + this._Parent.db.LocalStr("gold") + '" src="skin/resources/icon_gold.png"></th>\
            <th class="wood_header cs2 lf" colspan="2" style="background: url(skin/resources/icon_wood.png) no-repeat center center;" sitr_tip="' + this._Parent.db.LocalStr("wood") + '"></th>\
            <th class="wine_header cs2 lf" colspan="2" style="background: url(skin/resources/icon_wine.png) no-repeat center center;" sitr_tip="' + this._Parent.db.LocalStr("wine") + '"></th>\
            <th class="marble_header cs2 lf" colspan="2" style="background: url(skin/resources/icon_marble.png) no-repeat center center;" sitr_tip="' + this._Parent.db.LocalStr("marble") + '"></th>\
            <th class="glass_header cs2 lf" colspan="2" style="background: url(skin/resources/icon_glass.png) no-repeat center center;" sitr_tip="' + this._Parent.db.LocalStr("crystal") + '"></th>\
            <th class="sulfur_header cs2 lf" colspan="2" style="background: url(skin/resources/icon_sulfur.png) no-repeat center center;" sitr_tip="' + this._Parent.db.LocalStr("sulfur") + '"></th>\
        </tr></thead><tbody>'
    },

    AddIslandCSS : function () {
        if (!(/.*view=island.*/.test(window.location.href)) && !(this.islandCSS))   //&& (this._Parent.ikariam.GameVersion() != undefined)
            if (!this.cssResLoaded()) addStyleSheet('@import "http://' + this._Parent.ikariam.Host() + '/skin/compiled-' + this._Parent.ikariam.Nationality() + '-island-0.5.0.css";');
    },

    GetResourceFooter : function () {
        return '</tbody><tfoot>        <tr>\n            <td class="totals_row"></td>\n            <td class="totals_row sigma" colspan="3">\u03A3</td>\n            <td class="totals_row lf" id="t_population" colspan=3></td>\n<td class="totals_row lf" id="t_research"></td>\n            <td class="totals_row lf" id="t_goldincome"></td>\n            <td class="totals_row lf" id="t_currentwood"></td>\n            <td class="totals_row lfdash" id="t_woodincome"></td>\n            <td class="totals_row lf" id="t_currentwine"></td>\n            <td class="totals_row lfdash">\n                <span id="t_wineincome" class="More"></span>\n                <span id="t_wineconsumption" class="More"></span>\n            </td>\n            <td class="totals_row lf" id="t_currentmarble"></td>\n            <td class="totals_row lfdash" id="t_marbleincome"></td>\n            <td class="totals_row lf" id="t_currentglass"></td>\n            <td class="totals_row lfdash" id="t_glassincome"></td>\n            <td class="totals_row lf" id="t_currentsulfur"></td>\n            <td class="totals_row lfdash" id="t_sulfurincome"></td>\n        </tr>\n    </tfoot>\n</table>'

    },
    GetResourceRow   :function (city) {
        return '<tr id="' + city.id + '_row">\n<td class="city_name"><img><span></span><sub></sub></td>\n<td class="city_info"></td><td class="sitrap"></td>\n<td class="sitractions">\n    <table>\n        <td class="transport"></td>\n    </table>\n</td>\n<td class="lf population"></td>\n<td class="lfdash population_growth"><img align=right height=18 hspace=2 vspace=0></td>\n<td class="lfdash population_happiness"></td>\n<td class="lf research"></td>\n<td class="lf gold_income"><span class="More"></span><span class="More red"></span></td>' + this.CreateRes('wood') + this.CreateWineRes() + this.CreateRes('marble') + this.CreateRes('glass') + this.CreateRes('sulfur') + '</tr>'
    },

    SetAllArmyData    :function () {
        try{
        //console.time('SetAllArmyData');
        var counts = {};
        var countsA = [];
        var visible = {};
        for (var _b in this._Parent.ikariam.Units()) {
            counts[_b] = 0;
            countsA.push(_b);
        }
        function getImage(unitID) {
            // /skin/characters/fleet/60x60/ship_submarine_faceright.png
            // /skin/characters/military/x60_y60/y60_medic_faceright.png
            return (SITR.ikariam.Units()[unitID].type == 'fleet') ? 'skin/characters/fleet/60x60/' + SITR.ikariam.Units()[unitID].name + '_faceright.png' : 'skin/characters/military/x60_y60/y60_' + SITR.ikariam.Units()[unitID].name + '_faceright.png'
        }
        for (var cID in this._Parent.db.cities) {
            var city = this._Parent.db.cities[cID];
            city.processUnitBuildList();
            var $idline = $('#' + city.id + '_armyrow');
            $idline.removeClass('selected current');
            //Strange chrome render issue
            if (city.id == SITR.ikariam.CurrentCityId)
                if (isChrome) $idline.addClass('current'); else $idline.addClass('selected');

            if (!$idline.children()[0]) throw {
                name: "ArmyTableCheck",
                message: "$idline.children()[0] is undefined"
            }

            $idline.children()[0].children[0].innerHTML = '<img src="skin/resources/icon_' + tradeGoodFromID(city.tradeGood) + '.png"/>';
            $idline.children()[0].children[1].textContent = city.name;
            $idline.children()[0].children[2].textContent = city.availableBuildings;
            $idline.find('> td.sitrap')[0].textContent = city.actions;
            var unitBuilds = city.getUnitBuildsByUnit();
            var unitTransports = city.getUnitTransportsByUnit();

            var i = city.army.length;
            while(i){
                i--
                //console.log(i)
                var test = city.army[i];
                var bUnitName = test.id;
                var troopCount = test.count;

                if (troopCount != 0){
                    $idline[0].children[i*2+3].children[0].textContent = troopCount;
                    visible[bUnitName] = true;
                    counts[bUnitName] += troopCount
                }else
                $idline[0].children[i*2+3].children[0].textContent = '';
            }
            i = countsA.length
            while (i){
            var j;
            i--
                $idline[0].children[i*2+4].children[0].textContent = '';
                $idline[0].children[i*2+4].children[1].textContent = '';
            bUnitName = countsA[i]

            if (unitBuilds[bUnitName])
            {
                var ttProduction = '<table><thead><tr><th colspan="2"><img height="16" width="auto" src="' + getImage(bUnitName) + '"/></th><th>Training</th></tr></thead><tbody>';
                var sumProd = 0;
                for (j=0; j< unitBuilds[bUnitName].length; j++)
                {
                    sumProd += unitBuilds[bUnitName][j].count;
                    ttProduction += '<tr><td>+</td><td>'+unitBuilds[bUnitName][j].count+'</td><td>('+FormatTimeLengthToStr(unitBuilds[bUnitName][j].completionTime - $.now())+')</td></tr>'
                }
                ttProduction += '</tbody><tfoot><tr><td>=</td><td>'+sumProd+'</td><td><j>Full Completion</j></td></tr>'
                ttProduction += '<tr class="small"><td>\u03A3</td><td>'+(sumProd+troopCount)+'</td><td><j>'+FormatFullTimeToDateString(unitBuilds[bUnitName][unitBuilds[bUnitName].length -1].completionTime)+'</j></td></tr></tfoot>'

                $idline[0].children[i*2+4].children[0].innerHTML = '&nbsp; +'+sumProd;
                $idline[0].children[i*2+4].children[0].setAttribute('sitr_tip',ttProduction);
                visible[bUnitName] = true;
            }
            if (unitTransports[bUnitName])
            {
                var sumTran = 0;
                var ttTransport = '<table><thead><tr><th colspan="2"><img height="16" width="auto" src="' + getImage(bUnitName) + '"/></th><th>Deploying</th></tr></thead><tbody>';
                for (j=0; j< unitTransports[bUnitName].length; j++)
                {
                    sumTran += unitTransports[bUnitName][j].count;
                    ttTransport += '<tr><td>+</td><td>'+unitTransports[bUnitName][j].count+'</td><td>('+FormatTimeLengthToStr(unitTransports[bUnitName][j].arrivalTime - $.now())+')</td></tr>'
                }
                ttProduction += '</tbody><tfoot><tr><td>=</td><td>'+sumTran+'</td><td><j>Full Completion</j></td></tr>'
                ttProduction += '<tr class="small"><td>\u03A3</td><td>'+(sumTran+troopCount)+'</td><td><j>'+FormatFullTimeToDateString(unitTransports[bUnitName][unitTransports[bUnitName].length -1].arrivalTime)+'</j></td></tr></tfoot>'
                //console.log(i*2+3)
                //console.log($idline[0].children[i*2+3])
                $idline[0].children[i*2+4].children[1].innerHTML = '&nbsp; +'+sumTran;
                $idline[0].children[i*2+4].children[1].setAttribute('sitr_tip',ttTransport);
                visible[bUnitName] = true;

            }
        }
            $idline = null;

        }

            if (this._Parent.db.options.fullArmyTable)
                $('.army_unit, .army_total, .unit_name').each(function () {
                    this.style.display = '';
                }); else
                for (_b in counts)
                    if (visible[_b]) {
                        $('#ArmyTab > table.army > tbody > tr > td.' + _b + ' , #ArmyTab > table.army > thead > tr > th.' + _b + ' , #ArmyTab > table.army > tfoot > tr > td.t_' + _b).each(function () {
                            this.style.display = ''

                        });
                        $('#ArmyTab > table.army > tfoot > tr > td.t_' + _b).each(function () {
                            this.style.display = ''
                            this.textContent = counts[_b];
                        });
                    }
        //console.timeEnd('SetAllArmyData');
        this.ToolTips();
        }
        catch(e)
        {
            SITR.log('----------')
            SITR.log(e.stack)
            SITR.log(e.name + " from SetAllArmyData():" + e.message)
            SITR.log('----------')
        }
        finally
        {
            $idline = counts = countsA = visible = ttProduction = ttTransport = null;
            SITR.db.Save();
        }
    },
    SetAllBuildingData : function (force) {
        try{
        if (($('#SITR_Tabs').tabs('option', 'selected') != 1 ) && !force) return false
        var buildings = {}
        //console.time('set all data')
        for (var cID in this._Parent.db.cities) {
            var city = this._Parent.db.cities[cID];
            var $idline = $('#' + city.id + '_buildingsrow');

            $idline.removeClass('selected current');
            //Strange chrome render issue
            if (city.id == SITR.ikariam.CurrentCityId)
                if (isChrome) $idline.addClass('current'); else $idline.addClass('selected');
            $idline.children()[0].children[0].innerHTML = '<img src="skin/resources/icon_' + tradeGoodFromID(city.tradeGood) + '.png"/>';
            $idline.children()[0].children[1].textContent = city.name;
            $idline.children()[0].children[2].textContent = city.availableBuildings;

            $idline.find('td.sitrap')[0].textContent = city.actions;

            for (var bName in city.buildings) {

                var i = 0;
                var building = city.buildings[bName];

                for (var position in building.levels) {

                    buildings['' + bName + i] = 1
                    var posConst = (position == city.underConstructionPosition);
                    var progConst = (city.underConstructionTime - $.now() > 0);
                    var buildingLevel = building.levels[position];
                    var uConst = (posConst && progConst) ? '»' + (buildingLevel + 1) : '';
                        buildingLevel += (posConst && !progConst?1:0)
                    var hLink = '?' + building.link.replace(/position=[0-9]+/, 'position=' + position);
                    var buildingTD = $idline.find('td.' + bName.toLowerCase() + i)[0]

                    //link
                    buildingTD.firstChild.textContent = buildingLevel + uConst
                    buildingTD.firstChild.setAttribute('href', hLink);
                    if (progConst && posConst)
                        buildingTD.setAttribute('data-buildTicker', city.underConstructionTime); else {
                        var tip = this.getBuildingUpgradeTooltip(city, bName, buildingLevel);
                        if (tip != '') buildingTD.setAttribute('sitr_tip', tip);
                    }
                    buildingTD = null
                    i++
                }
            }
            $idline = null;
        }
        for (bName in buildings)
            $('#BuildTab table.resources tbody tr td.' + bName.toLowerCase() + ' , #BuildTab table.resources thead tr th.' + bName.toLowerCase()).each(function () {
                    this.style.display = ''
                });
        //console.timeEnd('set all data')
        this.ToolTips();
        }
        catch(e)
        {
            SITR.log('----------');
            SITR.log(e.stack);
            SITR.log(e.name + " from SetAllBuildingData():" + e.message);
            SITR.log('----------');
        }
        finally
        {
            buildingTD = $idline = null
            SITR.db.Save();
        }

    },

    getBuildingUpgradeTooltip : function (city, building, level) {
        var res = this._Parent.db.BuildingsCost().getBuildingMatsForLevel(building, level, city);
        var elem = '';
        var time = 0;
        for (var key in res) {
            if (key == 'time') {
                time = '<tr class="small"><td><img src="skin/resources/icon_time.png" style="height: 11px; float: left;"></td><td colspan=2 class="left"><i>(' + FormatTimeLengthToStr(res[key], 3, ' ') + ')</i></td></tr>';
             continue;
            }
            if (res[key]) {
                elem += '<tr><td><img src="skin/resources/icon_' + key + '.png" style="height: 11px; float: left;"></td><td>' + FormatNumToStr(res[key], false,0) + '</td>';
                elem += (city[key] < res[key] ? '<td class="red left">(' + FormatNumToStr(city[key] - res[key], true,0) + ')</td></tr>' : '<td><img src="skin/interface/check_mark_17px.png" style="height:11px; float:left;"></td></tr>')
            }
        }
        if (elem == '') return elem; else elem = '<table><tbody>' + elem +'</tbody><tfoot>'+ time+ '</tfoot></table>';
        return elem
    },

    CreateRes    :function (res) {

        return '<td class="lf"><img class="safe"/><span class="current_' + res + '" ></span><span class="More MoreGoods merchant_' + res + '" ></span>\n\n    <div class="SITR_Progress progress_' + res + '" ></div>\n</td>\n<td class="lfdash "><span class="More income_' + res + '" >&nbsp;</span></td>';

    },
    CreateWineRes : function () {
        return '<td class="lf">\n    <img class="safe"/><span class="current_wine" ></span>\n    <span class="More MoreGoods merchant_wine" ></span>\n\n    <div class="SITR_Progress progress_wine" ></div>\n</td>\n<td class="lfdash">\n    <span class="More income_wine" ></span>\n    <span class="More consume_wine" ></span>\n    <span class="More wine_hrs_left" ></span>\n</td>'

    },

    DrawContentBox : function () {
        var that = this;
        if (!this.mainContentBox) {
            $("#container").after('    <div id="SITRBoard" class="ui-widget" style="display:none;z-index:' + (SITR.db.options.onTop ? 65112 : 2) + ';position: absolute; left:70px;top:180px;">\
                                        <div id="SITR_Tabs">\
                                            <ul>\
                                                <li><a href="#ResTab" sitr_tip="Resource Overview">Resources</a></li>\
                                                <li><a href="#BuildTab" sitr_tip="Building Overview">Buildings</a></li>\
                                                <li><a href="#ArmyTab" sitr_tip="Army Overview">Army</a></li>\
                                                <li><a href="#SettingsTab" sitr_tip="Settings"><img class="ui-icon ui-icon-gear"/></a></li>\
                                            </ul>\
                                            <div id="ResTab"></div>\
                                            <div id="BuildTab"></div>\
                                            <div id="ArmyTab"></div>\
                                            <div id="SettingsTab"></div>\
                                        </div>\
                                    </div>');
            this.mainContentBox = $("#SITRBoard");

            $("#SITR_Tabs").tabs({collapsible:true, fx:{}, selected:-1 });

            this.mainContentBox.draggable({
                handle:'#SITR_Tabs > ul',
                cancel:'.ui-tabs-panel',
                stop  :function () {
                    SITR.Render.SaveDisplayOptions();
                }
            });
            $('#SITR_Tabs > ul li a').on('click', function () {
                setTimeout(function () {
                    SITR.Render.SaveDisplayOptions()
                }, 1000)
            })
            var $tabs = $('#SITR_Tabs ul li a');
            $($tabs[0]).click(function(){that.SetAllResourceData(true,true)});
            $($tabs[1]).click(function(){that.SetAllBuildingData(true)});
            $($tabs[2]).click(function(){that.SetAllArmyData(true)});
            $tabs = null;
        }
    },

    AttachClickHandlers : function () {
        var that = this;
        for (var cID in this._Parent.db.cities) (
            attachClickhandlersToTabs(this._Parent.db.cities[cID])            )

        function attachClickhandlersToTabs(city) {
            var cid = city.id;
            var islandID = city.islandID;
            var tradegood = city.tradeGood;

            // trade good Links
            var $elem = $("#" + cid + "_row");
            $elem.find('.current_' + tradeGoodFromID(city.tradeGood))
                .addClass('SITR_clickable')
                .on('click', function () {
                    if (unsafeWindow.ikariam.templateView && (unsafeWindow.ikariam.templateView.id == "resource" || unsafeWindow.ikariam.templateView.id == "tradegood")) unsafeWindow.ikariam.templateView.destroyTemplateView(true);
                    if (that._Parent.ikariam.CurrentCityId == cid){
                        that.AddIslandCSS();
                        location.href = 'javascript:void(ajaxHandlerCall('+JSON.stringify('?view=tradegood&type=' + tradegood + '&islandId='+ islandID)+'));';

                        return false;
                    }
                    else {
                        that._Parent.db.options.restoreRes = 2;
                        $("#js_cityIdOnChange").val(cid);
                        unsafeWindow.ajaxHandlerCallFromForm($("#changeCityForm")[0]);
                        return false;
                    }

                });

            $elem.find('.current_wood')
                .addClass('SITR_clickable')
                .on('click', function () {
                    if (unsafeWindow.ikariam.templateView && (unsafeWindow.ikariam.templateView.id == "resource" || unsafeWindow.ikariam.templateView.id == "tradegood")) unsafeWindow.ikariam.templateView.destroyTemplateView(true);
                    if (that._Parent.ikariam.CurrentCityId == cid){
                        that.AddIslandCSS();
                        location.href = 'javascript:void(ajaxHandlerCall('+JSON.stringify('?view=resource&type=resource&islandId='+ islandID)+'));';
                        return false;
                    }
                    else {
                        that._Parent.db.options.restoreRes = 1;
                        $("#js_cityIdOnChange").val(cid);
                        unsafeWindow.ajaxHandlerCallFromForm($("#changeCityForm")[0]);
                        return false;
                    }

                });
            //Building links
            //ajaxHandlerCall('?view=resource&type=1&islandId=XXXX')
            //$element.find('.current_wood ').attr('href', '?view=resource&type=resource&islandId=' + city.islandID)
            //http://sourceforge.net/apps/mediawiki/greasemonkey/index.php?title=UnsafeWindow
            $('#' + cid + '_buildingsrow  a')
                .addClass('SITR_clickable')
                .on('click', function(){
                    if (that._Parent.ikariam.CurrentCityId == cid){
                        location.href = 'javascript:void(ajaxHandlerCall('+JSON.stringify(this.href)+'));';
                        return false;
                    }
                    else {
                        SITR.db.options.openBuilding = $(this).attr('href').match(/position=([0-9]+)/)[1];
                        $("#js_cityIdOnChange").val(cid);
                        unsafeWindow.ajaxHandlerCallFromForm($("#changeCityForm")[0]);
                        return false;
                    }
                });

            //City links
            //$(+city.name+'_'+city.id+").click(function(){$('#changeCityForm').submit()})
            $('#' + cid + '_row .city_name span, #' + cid + '_armyrow .city_name span, #' + cid + '_buildingsrow .city_name span')
                .addClass('SITR_clickable')
                .on('click', function(){
                    $("#js_cityIdOnChange").val(cid);
                    unsafeWindow.ajaxHandlerCallFromForm($("#changeCityForm")[0]);
                    return false;
                });

            //Transport links
            //ajaxHandlerCall("?view=transport&destinationCityId=XXXXXX")
            $('#' + cid + '_row .sitractions .transport , #' + cid + '_buildingsrow .sitractions .transport')
                .on('click', function(){
                    if (that._Parent.ikariam.CurrentCityId == cid) {
                        return false;
                    } else
                        location.href = 'javascript:void(ajaxHandlerCall('+JSON.stringify("?view=transport&destinationCityId=" + cid + "&templateView=port")+'));';
                        //unsafeWindow.ajaxHandlerCall("?view=transport&destinationCityId=" + cid + "&templateView=port");
                });

            // Deployment links
            //ajaxHandlerCall("?view=transport&destinationCityId=XXXXXX")
            $('#' + cid + '_armyrow .sitractions .deploymentfleet')
                .on ('click', function(){
                if (that._Parent.ikariam.CurrentCityId == cid) {
                    return false;
                } else
                location.href = 'javascript:void(ajaxHandlerCall('+JSON.stringify('?view=deployment&deploymentType=fleet&destinationCityId=' + cid)+'));';
            });

            $('#' + cid + '_armyrow .sitractions .deploymentarmy')
                .on ('click', function(){
                if (that._Parent.ikariam.CurrentCityId == cid) {
                    return false;
                } else
                location.href = 'javascript:void(ajaxHandlerCall('+JSON.stringify('?view=deployment&deploymentType=army&destinationCityId=' + cid)+'));';
            });
         $elem = null;
        }
    },

    ToolTips: function () {
        //var tips = ;
        //tips.unbind('.qtip-tipper');
        // Dummy div
        $.fn.qtip.zindex = 999999;
        $.fn.qtip.defaults.style.widget = true;
        if (!$('#SITRBoard div.tooltips').length) $('#SITRBoard').append($('<div class="tooltips"></div>'));
        $('#SITRBoard [sitr_tip]').each(function(){
            if (!$(this).attr('qtip')==true)
                $(this).qtip({
                    overwrite : false,
                    prerender: false,
                    content: $(this).attr('sitr_tip'),
                    position: {
                        my : 'bottom center',
                        at :'top center',
                        target : $(this).is('td')?$(this):$(this).parent('td').length?$(this).parent('td'):$(this),
                        adjust: {method: 'shift flip', x:0, y:0},
                        container: $('#SITRBoard div.tooltips')
                    },
                    //            show:{effect:false},
                    //            hide:{effect:false},
                    events:{
                        //hide : function(event, api){api.destroy()},
                        show : function(event, api){api.set('content.text', $(event.originalEvent.target).attr('sitr_tip'))}
                    }




                }).attr('qtip',true)});

//        if (this._tooltipelem == undefined){
//            this._tooltipelem = $('<div>');
//
//        $.fn.qtip.zindex = 999999;
//        $.fn.qtip.defaults.style.widget = true;
//
//        //this._tooltipelem.qtip('destroy');
//        this._tooltipelem.qtip({
//            id:'tipper',
//            overwrite: true,
//            content : {text : function(e,api){
//                console.log($(this));
//                console.log(api);
//                var $this = $(this);
//                if ($this.parent('td').length) api.set('position.target', $this.parent('td'));
//                else api.set('position.target', $this);
//                return $this.attr('sitr_tip')?$this.attr('sitr_tip'):$this.parent('td').attr('sitr_tip'), $this = null;
//            }
//            },
//            position : {
//                my      : 'bottom center',
//                at      : 'top center',
//                target  : 'mouse',
//                viewport: $(window),
//                adjust  : {
//                    method: 'shift flip',
//                    x     : 0,
//                    y     : 0
//                }
//            },
//            show     : {
//                target: tips,
//                effect: false
//            },
//            hide     : {
//                target: tips,
//                effect: false
//            },
//            events   : {
//                show: function (event, api) {
//                    // Update the content of the tooltip on each show
//                    var td = $(event.originalEvent.target).parent('td');
//                    if (td.length) api.set('position.target', td);
//                    if (api.myInt)clearMyInterval(api.myInt);
//                        api.myInt = setMyInterval(function () {
//                            if (event.originalEvent.target.getAttribute('sitr_tip') != undefined)
//                            api.set('content.text', event.originalEvent.target.getAttribute('sitr_tip'));
//                        }, 1000);
//                    //target = td = null;
//                },
//                hide: function (event, api) {
//                    if (api.myInt)clearMyInterval(api.myInt);
//                }
//            },
//            style    : {
//                classes: 'ui-tooltip',
//                widget : true}
//        })}else{
//        this._tooltipelem.qtip().options.show.target.unbind('.qtip-tipper');
//        this._tooltipelem.qtip('api').set('show.target', tips);
//        this._tooltipelem.qtip('api').set('hide.target', tips);
//        }

    },

    makeIncomeTooltip : function (income, icon) {
        //income = income || 0;
        switch (icon) {
            case 'wood':
                icon = 'skin/resources/icon_wood.png';
                break;
            case 'wine':
                icon = 'skin/resources/icon_wine.png';
                break;
            case 'marble':
                icon = 'skin/resources/icon_marble.png';
                break;
            case 'glass':
                icon = 'skin/resources/icon_glass.png';
                break;
            case 'sulfur':
                icon = 'skin/resources/icon_sulfur.png';
                break;
            case 'research':
                icon = 'skin/layout/bulb-on.png';
                break;
            case 'gold':
                icon = 'skin/resources/icon_gold.png';
                break;
            default:
                icon = '';
        }
        return '<table><thead><td><img src="' + icon + '" style="height: 11px;"></td><td><b>Hour</b></td><td class="lfdash"><b>Day</b></td><td class="lfdash"><b>Week</b></td><td></td></thead><tbody>' + '<tr><td><b>+</b></td><td class="nolf">' + FormatNumToStr(income, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(income * 24, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(income * 24 * 7, false, 0) + '</td> <td class="left lfdash"><i>«Production</i></td> </tr>' + '</tbody></table>';
    },

    InitCounters : function () {
        var that = this;
        if (!this.resUpd) this.resUpd = setMyInterval(that.updateResourceCounters, 5000);
        this.updateResourceCounters(true);

    },
    StopCounters : function () {
        if (this.resUpd) {
            clearMyInterval(this.resUpd);
            this.resUpd = 0;
        }
    },
    SetAllResourceData: function (force,update) {
        try{
        if (($('#SITR_Tabs').tabs('option', 'selected') != 0 ) && !force) return false
        //console.time('SetAllResourceData')
        this.StopCounters();
        if (!update){
        for (var cID in this._Parent.db.cities) {
            var city = this._Parent.db.cities[cID];

            //Redraw static stuff
            var $idline = $("#" + city.id + "_row");

            $idline.children()[0].children[0].innerHTML = '<img src="skin/resources/icon_' + tradeGoodFromID(city.tradeGood) + '.png"/>';
            $idline.children()[0].children[1].textContent = city.name;
            $idline.children()[0].children[2].textContent = city.availableBuildings;

            $idline.removeClass('selected current');
            //Strange chrome render issue
            if (city.id == SITR.ikariam.CurrentCityId)
                if (isChrome) $idline.addClass('current'); else $idline.addClass('selected');

            $idline.find('.sitrap').text(city.actions);
            var $gi = $idline.find('.gold_income').find('span');
            $gi.get(0).textContent = (city.goldIncome == 0 ? '-' : FormatNumToStr(city.goldIncome, true, 0));
            $gi.get(1).textContent = (city.goldExpend == 0 ? '-' : FormatNumToStr(city.goldExpend, true, 0));
            $gi = null;
            var popData = city.populationData();
            $idline.find('td.population').attr('SITR_Tip', '<table><thead><td><img src="skin/resources/icon_population.png" style="height: 11px;"></td><td><b>Citizens</b></td><td class="lfdash"><b>Pop</b></td><td class="lfdash"><b>Max</b></td></thead><tbody>' + '<tr><td><b>\u03A3</b></td><td class="nolf">' + FormatNumToStr(city.citizens, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(popData.currentPop, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(popData.maxPop, false, 0) + '</td></tr></table>')[0].textContent = FormatNumToStr(popData.currentPop, false, 0) + '/' + FormatNumToStr(popData.maxPop, false, 0);
            var img = '';
            var test = popData.growth;
            if (test > 1)
                if (test < 6)
                    img = 'happy'; else img = 'ecstatic'; else if (test < 1)
                if (test < 0)
                    if (test < -6)
                        img = 'outraged'; else img = 'sad'; else img = 'neutral';

            $idline.find('td.population_growth img').attr('src', 'skin/smilies/' + img + '_x25.png').attr('sitr_tip', '<table><tbody><tr><td><b>+</b></td><td>' + FormatNumToStr(popData.satisfaction, false, 0) + '</td></tr><tr><td><b>-</b></td><td>' + FormatNumToStr(popData.currentPop, false, 0) + '</td></tr><tr><td><b>\u03A3' + (popData.happiness >= 0 ? '+' : '-') + '</b></td><td>' + FormatNumToStr(popData.happiness, false, 0) + '</td></tr></tbody></table>');
            $idline.find('td.population_happiness')[0].textContent = FormatNumToStr(popData.growth, true, 2);
            popData = null;
            // TODO: This is getting too messy tbh, clean
            $idline.find('.research').text(Math.floor(city.research));

            var fleetMovementCellData = this._Parent.db.getFleetMovementForCity(city.id);

            $idline.find('span.merchant_wood').attr('data-movements', fleetMovementCellData[0][0])[0].textContent = fleetMovementCellData[0][1]
            $idline.find('span.merchant_wine').attr('data-movements', fleetMovementCellData[1][0])[0].textContent = fleetMovementCellData[1][1]
            $idline.find('span.merchant_marble').attr('data-movements', fleetMovementCellData[2][0])[0].textContent = fleetMovementCellData[2][1]
            $idline.find('span.merchant_glass').attr('data-movements', fleetMovementCellData[3][0])[0].textContent = fleetMovementCellData[3][1]
            $idline.find('span.merchant_sulfur').attr('data-movements', fleetMovementCellData[4][0])[0].textContent = fleetMovementCellData[4][1]
            fleetMovementCellData = null;

            $idline = null;
            city = null;
        }

        document.getElementById('t_research').textContent = FormatNumToStr(SITR.db.globalData.research.getSum(), true, 0)
        document.getElementById('t_research').setAttribute('sitr_tip', this.makeIncomeTooltip(SITR.db.globalData.research.getSum(), 'research'));
        var expense = SITR.db.globalData.ArmyCost + SITR.db.globalData.ArmySupply + SITR.db.globalData.FleetCost + SITR.db.globalData.FleetSupply + SITR.db.globalData.SigmaExpenses;
        document.getElementById("t_goldincome").textContent = FormatNumToStr(SITR.db.globalData.SigmaIncome - expense, true, 0)
        document.getElementById("t_goldincome").setAttribute('sitr_tip', '<table><thead><td><img src="skin/resources/icon_gold.png" style="height: 11px;"></td><td><b>Hour</b></td><td class="lfdash"><b>Day</b></td><td class="lfdash"><b>Week</b></td><td></td></thead><tbody>' + '<tr><td><b>-</b></td><td class="nolf">' + FormatNumToStr(SITR.db.globalData.ArmyCost, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(SITR.db.globalData.ArmyCost * 24, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(SITR.db.globalData.ArmyCost * 24 * 7, false, 0) + '</td> <td class="left lfdash"><i>«Army Cost</i></td> </tr>' + '<tr><td><b>-</b></td><td class="nolf">' + FormatNumToStr(SITR.db.globalData.FleetCost, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(SITR.db.globalData.FleetCost * 24, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(SITR.db.globalData.FleetCost * 24 * 7, false, 0) + '</td> <td class="left lfdash"><i>«Fleet Cost</i></td> </tr>' + '<tr><td><b>-</b></td><td class="nolf">' + FormatNumToStr(SITR.db.globalData.ArmySupply, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(SITR.db.globalData.ArmySupply * 24, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(SITR.db.globalData.ArmySupply * 24 * 7, false, 0) + '</td> <td class="left lfdash"><i>«Army Supply</i></td> </tr>' + '<tr><td><b>-</b></td><td class="nolf">' + FormatNumToStr(SITR.db.globalData.FleetSupply, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(SITR.db.globalData.FleetSupply * 24, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(SITR.db.globalData.FleetSupply * 24 * 7, false, 0) + '</td> <td class="left lfdash"><i>«Fleet Supply</i></td></tr>' + '<tr><td><b>-</b></td><td class="nolf">' + FormatNumToStr(SITR.db.globalData.SigmaExpenses, false, 0) + '</td><td class="lfdash">' + FormatNumToStr(SITR.db.globalData.SigmaExpenses * 24, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(SITR.db.globalData.SigmaExpenses * 24 * 7, false, 0) + '</td> <td class="left lfdash"><i>«Research</i></td> </tr>' + '</tbody><tfoot>' + '<tr><td><b>+</b></td> <td class="nolf">' + FormatNumToStr(SITR.db.globalData.SigmaIncome, false, 0) + '</td><td class="lfdash">' + FormatNumToStr(SITR.db.globalData.SigmaIncome * 24, false, 0) + '</td><td class="lfdash">' + FormatNumToStr(SITR.db.globalData.SigmaIncome * 7 * 24, false, 0) + '</td><td class="left lfdash"><i>«Income</i></td></tr>' + '<tr><td><b>-</b></td> <td class="nolf">' + FormatNumToStr(expense, false, 0) + '</td><td>' + FormatNumToStr(expense * 24, false, 0) + '</td><td class="lfdash">' + FormatNumToStr(expense * 24 * 7, false, 0) + '</td><td class="left lfdash"><i>«Expenses</i></td></tr>' + '<tr style="border-top:3px solid #FDF7DD"><td><b>\u03A3 ' + ((SITR.db.globalData.SigmaIncome - expense > 0) ? '+' : '-') + '</b></td> <td class="lfdash">' + FormatNumToStr((SITR.db.globalData.SigmaIncome - expense), false, 0) + '</td><td class="lfdash">' + FormatNumToStr((SITR.db.globalData.SigmaIncome - expense) * 24, false, 0) + '</td><td class="lfdash">' + FormatNumToStr((SITR.db.globalData.SigmaIncome - expense) * 7 * 24, false, 0) + '</td><td></td></tr>' + '</tfoot></table>');
        }
        //console.timeEnd('SetAllResourceData')
        this.InitCounters();
        this.ToolTips();
        }
        catch(e)
        {
            SITR.log('----------')
            SITR.log(e.stack)
            SITR.log(e.name + " from SetAllArmyData():" + e.message)
            SITR.log('----------')
        }
        finally
        {
            fleetMovementCellData = $idline = city = null;
            SITR.db.Save();
        }
    },

    updateResourceCounters: function (force) {
        try{
            if (($('#SITR_Tabs').tabs('option', 'selected') == 0 ) || force) {
                var tot ={wood:0,wine:0, marble:0,glass:0,sulfur:0};
                var inc ={wood:0,wine:0, marble:0,glass:0,sulfur:0};
                var conWine = 0;

                for (var cid in SITR.db.cities){
                    updateCurrentResources(SITR.db.cities[cid], $('#' + SITR.db.cities[cid].id + '_row'))
                }

                $("#t_currentwood").text(FormatNumToStr(Math.round(tot['wood']), false));
                $("#t_currentwine").text(FormatNumToStr(Math.round(tot['wine']), false));
                $("#t_currentmarble").text(FormatNumToStr(Math.round(tot['marble']), false));
                $("#t_currentglass").text(FormatNumToStr(Math.round(tot['glass']), false));
                $("#t_currentsulfur").text(FormatNumToStr(Math.round(tot['sulfur']), false));

                $("#t_woodincome").text(FormatNumToStr(Math.round(inc['wood']), true)).attr('sitr_tip', SITR.Render.makeIncomeTooltip(inc['wood'], "wood"));
                $("#t_wineincome").text(FormatNumToStr(Math.round(inc['wine']), true));
                $("#t_marbleincome").text(FormatNumToStr(Math.round(inc['marble']), true)).attr('sitr_tip', SITR.Render.makeIncomeTooltip(inc['marble'], "marble"));
                $("#t_glassincome").text(FormatNumToStr(Math.round(inc['glass']), true)).attr('sitr_tip', SITR.Render.makeIncomeTooltip(inc['glass'], "glass"));
                $("#t_sulfurincome").text(FormatNumToStr(Math.round(inc['sulfur']), true)).attr('sitr_tip', SITR.Render.makeIncomeTooltip(inc['sulfur'], "sulfur"));
                var netWine = (inc['wine'] - conWine);
                $("#t_wineconsumption").text(FormatNumToStr(Math.round(conWine*-1), true)).addClass('red').parent().attr('sitr_tip', '<table><thead><td><img src="skin/resources/icon_wine.png" style="height: 11px;"> </td><td><b>Hour</b></td><td class="lfdash"><b>Day</b></td><td class="lfdash"><b>Week</b></td><td></td></thead><tbody>' + '<tr><td><b>+</b></td><td class="nolf">' + FormatNumToStr(inc['wine'], false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(inc['wine'] * 24, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(inc['wine'] * 24 * 7, false, 0) + '</td> <td class="left lfdash"><i>«Production</i></td> </tr>' + '<tr><td><b>-</b></td><td class="nolf">' + FormatNumToStr(conWine, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(conWine * 24, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(conWine * 24 * 7, false, 0) + '</td> <td class="left lfdash"><i>«Usage</i></td> </tr>' + '<tr class="small"><td colspan="3"></td><td>' + getNextWineTick(2) + '</td><td><i>«Next Tick</i></td></tr>' + '</tbody><tfoot>' + '<tr><td><b>\u03A3 ' + ((netWine > 0) ? '+' : '-') + '</b></td> <td class="lfdash">' + FormatNumToStr(netWine, false, 0) + '</td><td class="lfdash">' + FormatNumToStr(netWine * 24, false, 0) + '</td><td class="left lfdash">' + FormatNumToStr(netWine * 7 * 24, false, 0) + '</td><td class="lfdash"></td></tr>' + '</tfoot></table>');

                tot = inc = null;
            }

            if (($('#SITR_Tabs').tabs('option', 'selected') == 1 ) || force) {
                $('#SITRBoard *[data-buildTicker]').each(function () {
                    $(this).attr('sitr_tip',
                        '<table><thead><tr><th colspan=2><div class="prog" style="text-shadow:0 1px #FFFFFF"><b>Construction</b></div></th></tr></thead>' +
                            '<tbody><tr><td></td><td>' +FormatFullTimeToDateString(parseInt($(this).attr('data-buildTicker')),true)+'</td></tr></tbody>' +
                            '<tfoot><tr class="small"><td><img src="skin/resources/icon_time.png" style="height: 11px; float: left;"></td><td colspan=2 class="left"><i>(' + FormatTimeLengthToStr(parseInt($(this).attr('data-buildTicker').split(':')[0]) - $.now(), 3, ' ') + ')</i></td></tr></tfoot>')
                });
            }
        }
        catch(e)
        {
            SITR.log('----------')
            SITR.log(e.stack)
            SITR.log(e.name + " from updateResourceCounters():" + e.message)
            SITR.log('----------')
        }

            function updateCurrentResources(city, $city) {

                var tradeGood, resProd, maxCapacity, safeCapacity, currentRes, $res;
                try{
                currentRes = city.currentResAll();
                maxCapacity = city.maxCapacity;
                safeCapacity = city.maxSafeCapacity;
                tradeGood = tradeGoodFromID(city.tradeGood);
                var resConsumption = city.wineConsumption;
                conWine+=resConsumption;
                for (var res in currentRes){
                    $res = $city.find('.current_' + res);
                    tot[res] += currentRes[res];

                    if ($res.length) {

                        resProd = (tradeGood==res?city.tradeProd * 3600:res=='wood'?city.woodProd*3600:0);
                        inc[res] += resProd;
                        $res.text(FormatNumToStr(Math.round(currentRes[res])), true);
                        if (currentRes[res] <= safeCapacity) {
                            $res.prev('img').show()
                        } else {
                            $res.prev('img').hide()
                        }
                        var $breakdown = $res.parent().next('td').children('span');
                        // for all resource
                        if ($breakdown.length > 0)
                            $($breakdown[0]).text((resProd == 0) ? '- ' : FormatNumToStr(resProd, true, 0)).attr('sitr_tip', SITR.Render.makeIncomeTooltip(resProd, 'research'));
                        // for wine only
                        if ($breakdown.length == 3){
                            $($breakdown[1]).text(FormatNumToStr(resConsumption * -1, true)).attr('sitr_tip', getWineUseTooltip(resConsumption * -1));
                            var hrs = (currentRes != 0 ? currentRes[res] / ((tradeGood=='wine'?resProd:0) - resConsumption) : 0);
                            if (hrs > 0)hrs = Infinity;
                            $($breakdown[2]).text(FormatTimeLengthToStr(hrs * -3600000, 2)).addClass((hrs > 0) ? 'green' : ((hrs * -1) <= SITR.db.options.wineWarningTime) ? 'red' : 'green');
                        }
                        $res.siblings(".SITR_Progress").progressbar({max: maxCapacity, value: currentRes[res]}).attr('sitr_tip', getProgressTip(maxCapacity, safeCapacity, resProd-(res=='wine'?resConsumption:0), ((maxCapacity - currentRes[res]) / resProd) * 3600000, currentRes[res]));
                        $res.siblings(".SITR_Progress").children().removeClass('normal,warning, almostfull, full').addClass(((currentRes[res] / maxCapacity > 0.99) ? 'full' : (currentRes[res] / maxCapacity > 0.90) ? 'almostfull' : (currentRes / maxCapacity > 0.8) ? 'warning' : 'normal'));
                        $res.siblings('.MoreGoods').attr('sitr_tip', getMovementTip(JSON.parse($res.siblings('.MoreGoods').attr('data-movements')), currentRes[res]));
                        $breakdown = null;

                        $res = null
                    }
                }


                }
                finally
                {
                $city = city = $res = $breakdown = null
                }};

    }

};


function getWineUseTooltip(income) {
    //income = income || 0;
    return '<table><thead><td><img src="skin/resources/icon_wine.png" style="height: 11px;"></td><td><b>Hour</b></td><td class="lfdash"><b>Day</b></td><td class="lfdash"><b>Week</b></td><td></td></thead><tbody>' + '<tr><td><b>-</b></td><td class="nolf">' + FormatNumToStr(income, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(income * 24, false, 0) + '</td> <td class="lfdash">' + FormatNumToStr(income * 24 * 7, false, 0) + '</td> <td class="left lfdash"><i>«Usage</i></td> </tr>' + '<tr class="small"><td colspan="3"></td><td>' + getNextWineTick(2) + '</td><td class="left"><i>«Next Tick</i></td></tr></tbody></table>';
}

function getMovementTip(rMov, cRes) {
    if (Object.keys(rMov).length > 0) {
        var tTip = '<table class=sitr_movements><tbody>';
        var trades = '';
        var transp = '';
        var movTotal = 0;
        for (var movID in rMov) {
            var tMov = '';

            tMov = (rMov[movID].loadedTime > $.now() ? 'Loading: ' + getTime(rMov[movID].loadedTime - $.now(), false) : rMov[movID].arrivalTime > $.now() ? 'en route' : 'Arrived');

            tMov = '<tr><td>+</td><td>' + FormatNumToStr(rMov[movID].res, false, 0) + '</td><td class="origin_city left"><i>«' + getCityNameFromID(rMov[movID].origin) + '</i></td><td><i>' + getTime(rMov[movID].arrivalTime - $.now()) + '</i></td></tr>' + '<tr class=small><td colspan=3></td><td class="left"><i>(' + tMov + ')</i></td></tr>';
            if (rMov[movID].mission == "trade")
                trades += tMov; else if (rMov[movID].mission == "transport")
                trades += tMov;
            movTotal += rMov[movID].res
        }
        tTip += trades + transp;
        tTip += '</tbody><tfoot><tr><td>=</td><td>' + FormatNumToStr(movTotal, false, 0) + '</td><td colspan=2 class="left"><i>« Total incoming</i></td></tr>' + '<tr><td>\u03A3</td><td colspan=3 class="left">' + FormatNumToStr((movTotal + cRes), false, 0) + '</td></tr></tfoot></table>';
    } else tTip = 'No transports';
    rMov = null;
    return tTip
}

function getProgressTip(capacity, safecapacity, netIncome, fulltime, current) {
    var ret = '';
    ret = '<table><tbody><tr><td>' + FormatNumToStr(capacity, false, 0) + '</td><td class="left"><i>«Capacity</i></td></tr>' + '<tr><td>' + FormatNumToStr(safecapacity, false, 0) + '</td><td class="left"><i>«Safe</i></td></tr>' + '<tr><td>' + FormatNumToStr(Math.round((current / capacity) * 100), false) + '%</td><td class="left"><i>«Filled</i></td></tr>';

    if (netIncome > 0) ret += '<tr class="small"><td>' + FormatTimeLengthToStr(fulltime) + '</td><td class="left"><i>«to full</i></td></tr>';

    if (netIncome < 0) ret += '<tr class="small"><td>' + FormatTimeLengthToStr(-1*(current/netIncome)*3600000) + '</td><td class="left"><i>«to empty</i></td></tr>';

    //if (netIncome < 0) console.log(netIncome)
    ret += '</tbody></table>';
    return ret;
}

function getTime(time, brackets) {
    brackets = (brackets == undefined) ? true : brackets;
    var arrInTime = FormatTimeLengthToStr(time, 3, ' ');
    return (arrInTime == '') ? '' : (brackets ? '(' : '') + arrInTime + (brackets ? ')' : '');
}

function getCityNameFromID(originCity) {
    var ret = '';
    try {
        ret = SITR.db.cities[parseInt(originCity)].name
    } catch (e) {
        ret = originCity;
    }
    return ret;
}

function getNextWineTick(precision) {
    precision = precision || 1; // 1 for Mins, 2 for mins:secs
    if (precision == 1) return 60 - new Date().getMinutes(); else {
        var secs = 3600 - (new Date().getMinutes() * 60) - new Date().getSeconds();
        var ret = Math.floor(secs / 60) + SITR.db.LocalStr('minute') + ' ';
        ret += secs - (Math.floor(secs / 60) * 60) + SITR.db.LocalStr('second');
        return ret;
    }
}

SITR.Render.LoadCSS = function () {
    var default_style = <><![CDATA[
table.resources {
    border: 2px solid #ffffff;
    border-collapse: collapse;
    text-align: center;
    width: 100% !important;
}

table.resources tbody tr {
    border: 1px solid #dcc082;
}

table.resources thead {
    background: #F8E7B3 url(skin/input/button.png) repeat-x scroll 0 bottom;
}

table.resources tfoot {
    background: #E7C680 url(skin/input/button.png) repeat-x scroll 0 0;
    border-top: 2px solid #CB9B6A;
}

table.resources tbody tr {
    border-top: 1px solid #ECCF8E;
}

table.resources tr.odd {
    background-color: #FDF1D4;
}

table.resources tbody tr.selected {
    background-color: #FAE3B8;
    box-shadow: 0 0 5px #CB9B6A inset;
    border: 1px solid #CB9B6A;
    -webkit-transform: translateX(0);
}

table.resources tbody tr.current {
    background: rgba(0, 0, 0, 0.09);
}

table.resources tbody tr:hover {
    background-color: #fff;
    border: 1px solid #CB9B6A;
    box-shadow: 0 0 13px #CB9B6A;
}

table.resources tfoot tr {
    border-top: 1px solid #CB9B6A;
}

table.resources th,
table.resources td {
    border-left: 1px solid #ECCF8E;
}

table.resources th {
    height: 22px;
    width: auto;
    padding: 1px;
    padding-bottom: 2px;
    padding-left: 3px;
    text-align: center !important;
    color: #542C0F;
    font-weight: bold;
    text-shadow: 0 1px #FFFFFF;
}

table.resources td {
    height: auto;
    line-height: 11px;
    font-size: 11px;
    min-width: 10px;
    padding: 1px;
    text-align: right;
    text-shadow: 0 1px #FFFFFF;
}

table.resources th.lf, table.resources td.lf {border-left: 2px solid #CB9B6A;}

table.resources th.nolf, table.resources td.nolf {
    border-left: none;
}

table.resources th.city_name, table.resources td.city_name {
    overflow: hidden;
}

table.resources th.actions, table.resources td.actions, table.resources th.lfdash, table.resources td.lfdash {
    border-left: 1px dashed #ECCF8E;
}

table.resources th.city_name {
    width: 95px !important;
    max-width: 95px;
}

table.resources th.actions {
    width: auto !important;
    max-width: 62px;
    padding-left: 2px;
    padding-bottom: 3px;
    text-align: right !important;
    vertical-align: bottom;
}

table.resources td.city_name {
    width: 110px;
    max-width: 110px;
    padding-left: 3px;
    text-align: left;
    padding-right: 14px;
}

table.resources td.city_info {
    min-width: 0;
    border: none;
}

table.army th.unit_name {
    min-width: 25px;
    max-width: 35px;
    overflow: hidden;
    cursor: default;
}

table.Army th.upkeep {
    min-width: 20px;
    overflow: hidden;
    cursor: default;
}

table.resources tfoot td {
    font-weight: bold;
}

table.resources .More {
    clear: both;
    cursor: default;
    display: block;
    font-size: 10px;
    height: 10px !important;
    line-height: 10px !important;
    margin-top: -1px;
    text-shadow: none;
}

table.resources .MoreGoods {
    margin-top: 0;
}

.SITR_clickable {
    color: #542C0F;
    font-weight: 700;
}

.SITR_clickable:hover {
    cursor: pointer;
    text-decoration: underline;
}

table.resources tr td.sigma {
    font-size: 25px;
    font-weight: 900;
    vertical-align: inherit;
}

.Bold,
.Brown,
.DarkRed,
.Red {
    font-weight: bold;
}

.Green {
    color: green !important;
}

.Brown {
    color: #8F1D1A !important;
}

.DarkRed {
    color: #CC3300 !important;
}

.Red {
    color: red !important;
}
.Blue {
    color: blue !important;
}

 table.resources td .SITR_Progress .normal { background: #73443E;}
 table.resources td .SITR_Progress .warning { background: #8F1D1A;}
 table.resources td .SITR_Progress .almostfull { background: #B42521;}
 table.resources td .SITR_Progress .full { background: #ff0000;}

#BuildTab table.resources th {
    width: 30px;
    overflow: hidden;
    white-space: nowrap;
}

#BuildTab table.resources tr td, #BuildTab table.resources tr td a {
    text-align: center;
    font-size: 11px;
}

#BuildTab table.resources tr td.city_name, #BuildTab table.resources tr td.city_name a {
    text-align: left;
}
#BuildTab table.resources tr td.building[data-buildTicker] a {
  color: #581C90;
  font-style: italic;
}

.resources .sitractions table td {
    background-attachment: scroll;
    background-clip: border-box;
    background-color: transparent;
    background-position: 0 0;
    background-repeat: repeat;
    background-size: 24px auto;
    height: 17px;
    min-width: 21px;
    width: 21px;
}

table.resources td img.safe {float: left;
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEFJREFUeNpi/P//PwMIhOrzQhhAsPriZ0YQzYQugcxnQhaE6YABxhA9HhRdyICJAQ/AayzxOtFdzYRuFLIVAAEGANwqFwuukYKqAAAAAElFTkSuQmCC");
    display: block;
    text-indent: -99999px;
    overflow: hidden;
    background-repeat: no-repeat;
    margin:0 1px;
    width: 7px;
    height: 9px;}

.resources .sitractions .transport {
    background-image: url("skin/actions/transport.jpg");
}
.resources .selected .sitractions .transport {
    background-image: url("skin/actions/transport.jpg");
    background-position: 0 16px
}
.resources .sitractions .deploymentfleet {
    background-image: url("skin/actions/move_fleet.jpg");
}

.resources .sitractions .deploymentarmy {
    background-image: url("skin/actions/move_army.jpg");
}

.resources .selected .sitractions .transport {
    background-image: url("skin/actions/transport.jpg");
    background-position: 0 16px
}

.resources .selected .sitractions .deploymentfleet {
    background-image: url("skin/actions/move_fleet.jpg");
    background-position: 0 16px
}

.resources .selected .sitractions .deploymentarmy {
    background-image: url("skin/actions/move_army.jpg");
    background-position: 0 16px
}

.resources .sitractions td:hover {
    background-position: 0 -16px;
}

#SettingsTab table.options tr td {
    padding: 0 10px 2px 8px;
    min-width: 140px;
}

#SettingsTab table.options {
    text-align: left;
}

#SettingsTab {
    white-space: nowrap;
    overflow: hidden;
}

table.resources tr td.sitrap, table.resources tr th.sitrap {
    min-width: 15px;
    background-size: 18px 18px !important;
}
#SettingsTab .options{float:left; padding:10px}
#SettingsTab .options span:first-child{margin-left:-3px}
#SettingsTab .buttons{clear:left; padding:3px}
#SettingsTab .buttons button{margin-right:5px}
.city_name img {
    margin: 0px 1px 0px -1px;
    height: 13px;
    float: left;
}

.toast {
    display: none;
    position: fixed;
    z-index: 99999;
    width: 100%;
    text-align: center;
    bottom: 5em;
}

.toast .message {
    display: inline-block;
    color: #4C3000;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 3px 0px 15px 0 #542C0F;
    -webkit-box-shadow: 3px 0px 15px 0 #542C0F;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    background: #faf3d7;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #faf3d7), color-stop(1, #e1b06d));
}

/* Fades and background-images don't work well together in IE6, drop the image */
* html .ui-tooltip {
	background-image: none;
}

/* TipTip CSS - Version 1.2 */

.ui-tooltip {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999999;
    color: #542c0f;
    border: 1px solid #542c0f !important;
    background-color: #FDF7DD;
    background-color: rgba(253, 247, 221, 0.92);

}

.ui-tooltip table td {
    padding: 2px;
    height: auto !important;
    text-align:right;
}
.ui-tooltip table td.left {
    text-align:left;
}

.ui-tooltip table tbody {
    background-color: #FAEAC6;
    border-bottom-width: 3px;
    border-bottom-color: #FDF7DD;
    border-bottom-style: solid;
}

.ui-tooltip table tfoot {
    background-color: #FAE0AE;
}

.ui-tooltip table th.lf, .ui-tooltip table td.lf {border-left: 2px solid #CB9B6A;}

.ui-tooltip table th.nolf, .ui-tooltip table td.nolf {
    border-left: none;
}
.ui-tooltip th.lfdash, .ui-tooltip td.lfdash {
    border-left: 1px dashed #ECCF8E;
}
.ui-tooltip thead {
    background: #F8E7B3;
}
.ui-tooltip table .small td {
    padding: 2px;
    height: auto !important;
}

.ui-tooltip table td.Mission img {
    max-height: 15px;
}

.ui-tooltip table tr.small td {
    padding-top: 0px;
    font-size: 10px !important;
    line-height: 10px !important;
}

/*!
* jQuery UI CSS Framework 1.8.21
*
* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Theming/API
*/

/* Layout helpers
----------------------------------*/
.ui-helper-hidden {
    display: none;
}

.ui-helper-hidden-accessible {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
}

.ui-helper-reset {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    line-height: 1.3;
    text-decoration: none;
    font-size: 100%;
    list-style: none;
}

.ui-helper-clearfix:before, .ui-helper-clearfix:after {
    content: "";
    display: table;
}

.ui-helper-clearfix:after {
    clear: both;
}

.ui-helper-clearfix {
    zoom: 1;
}

.ui-helper-zfix {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    opacity: 0;
    filter: Alpha(Opacity = 0);
}

/* Interaction Cues
----------------------------------*/
.ui-state-disabled {
    cursor: default !important;
}

/* Icons
----------------------------------*/

/* states and images */
.ui-icon {
    display: block;
    text-indent: -99999px;
    overflow: hidden;
    background-repeat: no-repeat;
}

/* Misc visuals
----------------------------------*/

/* Overlays */
.ui-widget-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/*!
* jQuery UI CSS Framework 1.8.21
*
* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Theming/API
*
* To view and modify this theme, visit http://jqueryui.com/themeroller/?ffDefault=Verdana,Arial,sans-serif&fwDefault=bold&fsDefault=1em&cornerRadius=4px&bgColorHeader=F8E7B3&bgTextureHeader=03_highlight_soft.png&bgImgOpacityHeader=75&borderColorHeader=ffffff&fcHeader=542c0f&iconColorHeader=542C0F&bgColorContent=f6ebba&bgTextureContent=01_flat.png&bgImgOpacityContent=75&borderColorContent=eccf8e&fcContent=542c0f&iconColorContent=542c0f&bgColorDefault=eccf8e&bgTextureDefault=02_glass.png&bgImgOpacityDefault=75&borderColorDefault=eccf8e&fcDefault=542c0f&iconColorDefault=542c0f&bgColorHover=f6ebba&bgTextureHover=02_glass.png&bgImgOpacityHover=75&borderColorHover=eccf8e&fcHover=542c0f&iconColorHover=542c0f&bgColorActive=f6ebba&bgTextureActive=02_glass.png&bgImgOpacityActive=65&borderColorActive=eccf8e&fcActive=542c0f&iconColorActive=542c0f&bgColorHighlight=f6ebba&bgTextureHighlight=07_diagonals_medium.png&bgImgOpacityHighlight=100&borderColorHighlight=eccf8e&fcHighlight=542c0f&iconColorHighlight=542c0f&bgColorError=f6ebba&bgTextureError=05_inset_soft.png&bgImgOpacityError=95&borderColorError=cd0a0a&fcError=cd0a0a&iconColorError=cd0a0a&bgColorOverlay=aaaaaa&bgTextureOverlay=07_diagonals_medium.png&bgImgOpacityOverlay=75&opacityOverlay=30&bgColorShadow=aaaaaa&bgTextureShadow=01_flat.png&bgImgOpacityShadow=0&opacityShadow=30&thicknessShadow=8px&offsetTopShadow=-8px&offsetLeftShadow=-8px&cornerRadiusShadow=8px
*/

/* Component containers
----------------------------------*/
.ui-widget {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1em;
}

.ui-widget .ui-widget {
    font-size: 1em;
}

.ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1em;
}

.ui-widget-content {
    border: 1px solid #eccf8e;
    background: #f6ebba url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD0ZHJ6AAAAfUlEQVRoge3OMQGAIAAAQaR/Iiq5u0oEhht0+Etw13Ovd/zY/DpwUlAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVBtVtsEYluRKCAAAAAASUVORK5CYII=") 50% 50% repeat-x;
    color: #542c0f;
}

.ui-widget-content a {
    color: #542c0f;
}

.ui-widget-header {
    border: 2px solid #ffffff;
    background: #f8e7b3 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABkCAYAAAEwK2r2AAAAY0lEQVQYlaWPMQ6DQAwER/v/7+UhQTRH7N00QEESiUAzki17vOb1fEQAR8QDpSaUmhHkYwSAb4LEKD2vAryc3/2JpFC8IDzWfHgg0qcEd47/haT3VEZxbWUKQW89GhFffeEi3kGvSQXcQU8oAAAAAElFTkSuQmCC") 50% 50% repeat-x;
    color: #542c0f;
    font-weight: bold;
}

.ui-widget-header a {
    color: #542c0f;
}

/* Interaction states
----------------------------------*/
.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default {
    border: 1px solid #eccf8e;
    background: #eccf8e url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAYAAABvWArbAAAASklEQVQ4je3Puw2EABAD0fGw9F8KFSFqgJTgCPhEFHBCmzxN4sCs8/QToGmaz7JvC5JgMiAnhbEwjoiFPpXUXda1SPyHM03TvHEAd0QJtjgD5PAAAAAASUVORK5CYII=") 50% 50% repeat-x;
    font-weight: bold;
    color: #542c0f;
}

.ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited {
    color: #542c0f;
    text-decoration: none;
}

.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-widget-header .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus {
    border: 1px solid #eccf8e;
    background: #f6ebba url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAYAAABvWArbAAAAR0lEQVQ4je3PMQrAIABD0Z/o/Y/Wk3RwLBSqg0KXHkBKlkeGv4SrHd0AIYTf8twnBmEkDF5IBTMxlupaM1HB0ht7hzMhhC8GEiwJ5YKag9EAAAAASUVORK5CYII=") 50% 50% repeat-x;
    font-weight: bold;
    color: #542c0f;
}

.ui-state-hover a, .ui-state-hover a:hover {
    color: #542c0f;
    text-decoration: none;
}

.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active {
    border: 1px solid #eccf8e;
    background: #f6ebba url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAYAAABvWArbAAAARklEQVQ4je3PsQnAMBBD0S9l/8kyTFIaDDkXBkMgA5ig5iEdXCHafZYBQgi/5ekXrlmFpQNLxmDMTOv2rrU+kHYYE0L4YgB9ewvfYTVHjwAAAABJRU5ErkJggg==") 50% 50% repeat-x;
    font-weight: bold;
    color: #542c0f;
}

.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited {
    color: #542c0f;
    text-decoration: none;
}

.ui-widget :active {
    outline: none;
}

/* Interaction Cues
----------------------------------*/
.ui-state-highlight, .ui-widget-content .ui-state-highlight, .ui-widget-header .ui-state-highlight {
    border: 1px solid #eccf8e;
    background: #f6ebba url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAjElEQVRYhe2UOwqAMBAFx2DlMbz/kSS3MIUIWij4aZ/gK952YZohu0y3zNPGOWur3Kcfxsf7D16c5YBD0FUOoDjLAdeKHeXWVi9BRzk4f9BVDqA4y8HrBt3k0sEveDqo8nRQ5emgytNBlaeDKk8HVZ4OqjwdVHk6qPJ0UOXpoMrTQZWngypPB1Vu38EdG7NcOPXFHAMAAAAASUVORK5CYII=") 50% 50% repeat;
    color: #542c0f;
}

.ui-state-highlight a, .ui-widget-content .ui-state-highlight a, .ui-widget-header .ui-state-highlight a {
    color: #542c0f;
}

.ui-state-error, .ui-widget-content .ui-state-error, .ui-widget-header .ui-state-error {
    border: 1px solid #cd0a0a;
    background: #f6ebba url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABkCAYAAABHLFpgAAAASElEQVQYld2PMQ6DUBTDbP/7X4grde/6GACpjN0QS+QkyhC+n20CeI3MQChJJ4GEka7LEtkiRsJF2llw0G02SP5k0oxPOP2P7E3MCpW4kdm7AAAAAElFTkSuQmCC") 50% bottom repeat-x;
    color: #cd0a0a;
}

.ui-state-error a, .ui-widget-content .ui-state-error a, .ui-widget-header .ui-state-error a {
    color: #cd0a0a;
}

.ui-state-error-text, .ui-widget-content .ui-state-error-text, .ui-widget-header .ui-state-error-text {
    color: #cd0a0a;
}

.ui-priority-primary, .ui-widget-content .ui-priority-primary, .ui-widget-header .ui-priority-primary {
    font-weight: bold;
}

.ui-priority-secondary, .ui-widget-content .ui-priority-secondary, .ui-widget-header .ui-priority-secondary {
    opacity: .7;
    filter: Alpha(Opacity = 70);
    font-weight: normal;
}

.ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled {
    opacity: .35;
    filter: Alpha(Opacity = 35);
    background-image: none;
}

/* Icons
----------------------------------*/

/* states and images */
.ui-icon {
    width: 16px;
    height: 16px;
}

.ui-state-error .ui-icon, .ui-state-error-text .ui-icon {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAAA7VBMVEXMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzrDkZjAAAATnRSTlMAGBAyBAhQv4OZLiJUcEBmYBoSzQwgPBZCSEoeWiYwUiyFNIeBw2rJz8c4RBy9uXyrtaWNqa2zKP2fJO8KBgKPo2KVoa9s351GPm5+kWho0kj9AAAPhUlEQVR4nO1djWLbthEGyUiq5YSSLXtp7FpLOmfzkmxr126tmi2p03RJ1/Xe/3EGgARxPyAgRbIk2/hkSz4CJO4+HsE7AJSVysjI2AMUUOxahZ2iANhzBtZWr4BoIRSYAVN5u4QwDwQDRbcwfUi5KS3wFuDmFnQLa4Dtb//cqktwD5QEFFwfUs7PoCCA7y4bEJVFizcIob8KmhAplwwqVjt+9FBl3uINQniwEiryEyw9JHqGpQdEFNi+B4QQ7QOiHhysIPoAxUqxvdvvA9K42bsAv4S2fxfYOe57IJSRkZGRkZGxx7jxSHDHcRBXQMTyIjInBgHwBJ/bEx8PEANC+uhbpSSggCBAVODVabpI1S/k4WLZpTn6NpMhoX9Y40hxYERFpMcqUs4AloCtDQdID1YhnyXZ2hLjAYWiO9Dy1PDB7tPhIqLx+uMB8grZaR+Qxl2/C2RkZGRkZGRk7A7rBf7J0DR5/LUTjzUPIPSPGvQJiVJiB7kcQCiUOJrcFNtDZIf2xarQ3aGvLNxAVIFAabz90BFiBIlycTBhgWwOWCH0FLYHlPqwHaCvcIn2ZbosCevfPTRiFFcgvHukCjWwrc3GrGh1fsAof8EaUReKXkCB4/MzFNo97qLpFiKFYv/kNR5YQxQbQEofkZ2OuEOHqqT6gFTpru8CN7x/+jaZkZGRkZGRcV+x/rLUNcMMqUAscgnFocmpqkTzqymwVAPxfJ5PnIUUQOUKT04tEdWZyv3JCQSn96WS4pD97QfyW25A7NhSAbyhmVj0FEltA4vdiygBibXhoUYgykCUP7HwPTDeEqAIcHVMkZg7Zx4k0uFANs63hPQXCoRLAwdgGsr9Az7Qv7sgQGgg1aPl/BJLExBWgG4RFRLFImGmIquPC/klEGyCG0AuAXaJJC+B8FVe9NYQDEcXB8g6AQcjYJ1goJIggHWCrFR0S6kRHN5+4BzFi8NaoN35NRxUvL+JJdZr7PV4wK6fj8nIyMjIyNhr3OxdXAYq7FHZwB6bDSzSh4sF0utChqo0NAvaT1hLzXwFinmCzmeDucEQK18TTaQoFgP7bNC+RZ4OT4T6gQogDFYk+1QxQlj19QGSAWKiLYp8P0Ag1Gbz1ULfWHLg9iUnQNK5QQJcukm04blKLH2GgEJCY+HzXAZWCvHKco3Bp6MIaCjSXXRJyOxeqhnzEaF93MfFGW/O16ZvDL5TM4MJIjujz/cHypkQuuzRwWJ93BKdIt+wCRAPl9kpe2Ikkb2mFgGlxh/i40d3EHfdvoyMjIyMu43ylt/IAmGHnN5iIt7wKfbv01RAcJqFRl9lcjYQSnbQqKgC4fYOwSJt6N6trE0twZ9kN/PqNpTQeICvr4TLsDYC06U7BMjshS+v1/aT7IwQYD5LcgRQXMT2FrBfBLjZ6151jDElk9tPFfpUgk2yregusX25BJbwAFEfM+YI6vGAti4bTtizB+TjfQCrERyhKb2X8D6A9wX75P4t4neBYJeP6pdhg/gQl8MWvytzeSTjgOQBynQdh/iXKdxOrGJ/RkZGRsb9QmXihGr5+g8GGg9uTh+KoVZuNIzV+CwRucFBEyr1mVjx4irOxwM1BhirB6Q+2eNQi4eqR+aF6mELtoMzCR7V9RAFe/ZvQogNiyY8FPSUTFsLp8TeTmMui5mtw7bcaT0Yw2AA4wFRQIlkgq+1DQrNhkmoxS5Jq+u6bMAIGRECEANgXHTgWzwgBOhDH2l0oTQ4D8D5NMktBgNywAEMjo8rwATMZrPY7JGxBoJCkIBDQiAY09EGTUiBCWkUpISfGPR5AAwBfZiG2z7Ayc1yeKTxid39xBNwfHr4O0LA48ePFTvhYrF1r4tyAoz9n2MCqEuBtp/6GDR0oAYfG/R6wJExHYZHfhygsv7fEWCOj4bYmsP5A+pL4MkTfAnMlD4F+r3bobKvTyTA2P/w7PN+Agq2QW8piqMCpTBwenoKvX0AHGkGtP2YAPvTEWA7QUTAudn7/NxtOG46wWNmDtpBEkBzN7rBEvAFHp+YTB/q97qPAN4gHFqgBi8uLsC7qPCA6mg41G/+ErByPwEXDdoNxRhOx+M5jPEzQugS0ht+b1/Y3gEnYMAIAOIBE29/hIDucE8tmMsNOgK4B1RHFu4UCRlMHzv0xzcajcfdXWDs2h8TArBCkoDUJYDLmz6w7ip3BFS0ve5wTRwAn6keMA9I3QYbfSZ0DKbyt+7OXjGI1idPcfNyAyfAMlCrzaGqphYrxHocLHRJVycnfGUcbtT+jIyMjIw9x7Nn8fJSzG0TmFtO8rZT+XT3S3ub+tKJbbLd5diTVp50+zahyeHSslJ/YPrU0fuazrZO2CZ92/ZCCVXlGRiZKPJyPPRxyIFWeXLQBXJBKiq/3divEAN6ZwM200Qjm7EJBZeWm/PRWVCbYK7s7u2l4XaCz+lzgOfMfhMonXr7TWzeZb98dbgIzBT8Ub8eYYUqfZ4rVJ/MDbIDgPqTulJ/xvntWAtjIisqnwxOkGz0n077FARoY79GdA6HPE4rOy196NiMWHTZlSSApcOgXpy/fHV2joaNKu3ffsAnRcBf4K/6NcIG6tIxk3HyoXPjASqfUgXbYN5PzpL2njkR9QMjeDTVHDTCgRuxOegjoO0FvKzP/t/gmVdI24+G7NIe8JX6Wv3dDyldMA+4YB5wwTygtd+dwRqaTqrLb1l73zTSN52CNpnHuQOYPsDblybgxfkXh/oVtr+N1DEBJdhRJyd/Bd/q1z+cbNrD17iVKyajcnv9arhOkRPgsruuD6DmNPwpDNrLw2CoTgHni4yALr0L29+tiKAEIPn868ejx//8rpWP3OEOl5On9OwpcQm0MhafP/ey8f1uvDNIgGLQG8z4YO99ENgg95etwv4uYJYY8fUGHYH6j6fscHFZMftlAl9i+9XL73X3N/n+ZStOzfVfRvYXhrbdKOpEgVQTg/wsDuDD3kwOfQNMTJ5y+/ltUDWLunyxnRF46IqlBzGMY4X7inggREFioIyMjIyMHWCIB6ZNKAcXseo3vLTQTkVE7348dlwJJSz0+wLfmi8BhZqfw3D4ww/wHVLnEd5/fgYvXsDZ3MlsvYUbbnDjDZ3MN3TJG4+bxjAaDl8TBri9qxEw1ccao2wTNAMLHo2f+sjrXwb/9qHoYqgPMBXJTVfOpmrZH23y6uvo0LHSyY6fHGwKfHJlAuMFvObjDYrIqxBgQi20h7Hd/nYVLmno+eaNUm/eeH2GCuopntnhBJAlI2AHo9CCh1I1QxUdAbqqGY9BBLwyc3W4wYVhvY8A4BoIc1l5M7vnPWphZW9/Ses3n37y9a0uGqFwFQZsQQbd386DogpgEk+dzynsAZMJXq8+ns9NeukJ0PYrNATGGefJQlhkLo7DTXr+y3bNiOsDvrXTz/C2q1DXZH84iRNwrP88Nj+u2DjYEE6RBxD9Knj16ujVHC67A7422o02RwD3gB+t7EblWvu9geOFxSnd3ROmT+nJyQkhoPlsxVONc/3TEdBos+jtA+ZzcwHgTvD1cDjaYCcItA8w9i88A8b+mqSjc6Pvqd998QguEQPmQMeo23ODN86+p0/bn1buBkT6+oBhNZ/PYY4ZAHYb3PRd4LkZmPX68NRtMZn4ASvdA+qf0jMA5MP9eeg28Nug9QiLnj5A33U1MAES6xHAUNpz/9zFAYE1gqQDMT3G6xI9pwdw/aIgKoHCS1YGlRnSq9yCjdXjgN3j+N27YyROHxmuNAeNKPpYuXIyIyMjYy0M8eros59MF/PT2c602T7eA7zvhJ9dr/vzDjXaLp4Yc5+0wllzxzHv3gdmMMM7/CcQzKgVBqYTmFn+Z+mKm8J7k0A5F/jgCfjQ1WBhQyiOqD0lYuqBb+AyzMw9Ha2G3m6c8qQx+AlqnIceQp+Sb6i9UyQWbhr54+AjnZ0VzW2TAN0DmBT6PWmc6jDBE2PK2u+nF43dyP7Q0t1pOcX2fdRvH0mF2Q4JqN35rnHjVIeaXfIAVyUuw/aHCCiJy9iF5l1621zweI8KZrPZ9iJdb7DXJ3US0OSrtZ10imt7wHY7QesAzUMz1oZ3noB3qFJ/H18j97FYuw8QDN4oeKf30osvcSW2ExLo+VcbuAuo/sUIm8fMG9xocO3Ea19J9gFYivnHJ2KnyfovZlgW3v6ySx32abQiIyMjIyPjhlFDTLxpwIgFMnTp6A3g4IDKNY+stkwAMAoIAbasxBXqUWneSAWTMjt50lTqT29rFjvXohjsDNm2YPXDFlICmrJOZ3t6tHm8AiEAl0sCeLIIorIRt+cFbew/QRsoAXb4o1XSfoywzm0FTMAoYBNvLyFu8v8HpLBtD1iKgC17wHb7AI6d9wFbvguAIGTHd4E9wG7jgIyMjIyM+434c2R3HeV/Ffx6jtZu6ijl8h59T655jhR+rdHzDOP6beABCheb8O8/WFXeOyzgf5oAhVYnKxP7CwaAf1afJu8bSrhS6tdaXeGnrRenOqOlz9d6QwYnA/3TLd+GE7qe3chA5YF5DfY0vK3adfOX/gyNp2BW25MHdxAB9qvRiiP3/XpQQFGYDU4+Mi///XumXG8pjvaUAOsBGlf4jJt+YYEzeEzAdw06F19R3juM7D1wita86GR0CKfDHgLuXCc4Bri6vMLdfjMc4VNSUNsdodo2xu/1+Xl/K5+az8jIyMhYG/z5gJTMF1GtKq/a3rpyCvz5gJTMl9GtKq/a3rpyCmfQ4WwZmS+kXFVetb115ST48wEf/AGcfG1iw+tWbpbS2vJ3nQxcVr3lH3z5h972FUTLzYpOVk7l5hD+eYcYwDcAnewOotrZ4OtrPDucqi/LRX0/RR4qx7Nn4U8g+qjffvuN6Gf+nC85vwauHjaYyubqvWYKY4VEfSUMitdnBCT1Ue63R5439m+OgCn6DroAAaHPVQxKth/wkJgHmG8bmQMsT0D6EjDfvhVRKO3ywOQUgRA7nmL1uawZmHf1k+DPBwQ6NdcJ+k6Md1LA5f5ONdhJ8vZ5J0vLHT99srkGOjmJbd/G1r2Nriqnse1AZt1AalU5jW2HsuuG0qvKGRkZGRkZGRG0gcONyXsP9v8D0/IdJADiBNiXl3327WRGgOL/9HC/0XwlIURkRhC4tz6Z/fu7fUf2gHvfB9z3u0BGRkZGRkbGplHcnkgguQoSqtUXuhbs/wPtMwqV0HUJAvj5vk32b8IDuL23yn7qAXZ5u32hbRX7d3o82Df1FZXvbh9QOfhyxldr/+3xgXU9oKmvsHyr7F/XA269/eveBXrsv7N9QALe/tvjA0kPWAXGbvebkbHn+D/J5nMcHzx1UAAAAABJRU5ErkJggg==);
}

.ui-icon, .ui-widget-content .ui-icon, .ui-widget-header .ui-icon, .ui-state-default .ui-icon, .ui-state-hover .ui-icon, .ui-state-focus .ui-icon, .ui-state-active .ui-icon, .ui-state-highlight .ui-icon {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAAGvTnpvAAAA7VBMVEVULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxwjo40AAAATnRSTlMAGBAyBAhQv4OZLiJUcEBmYBoSzQwgPBZCSEoeWiYwUiyFNIeBw2rJz8c4RBy9uXyrtaWNqa2zKP2fJO8KBgKPo2KVoa9s351GPm5+kWho0kj9AAATX0lEQVR4nO1dC2PbthEGyUpaqJii/JgbZ3bTLNmyJns/Oi1bM7vp0q7r/f+fM+JxwOEAkNTTSoxPlqHD83AE7gAQBIUYBHSfQv0XnbsJgH02A3g5ibVzDFNtlkPI1VjIuOUa8eMclOLS1uRSPBETURnOrkbmID9T9fuPyu+cSGYYKya5efeddN9TRS1H8eD4kDjrPutBpptt2apkiqX57A4gfloj7ua9AXMQ3dWvNs8n7NCwZk6bqYSg1CgNsaCBHDAluMQjcihEWBNYSxamUYNMs15KmwMUKhm0S5UBwMQFjcqxelSYskHBtLC26X7/eWQtVB1MaWXzF1OrUyhLgOrFiBwalDwg6+tigfzbnNbM40UlTrrO3clTftcuX7jyY9gkv81RVWI9K0OxNa8Hruw+EFctu6xaqDhCGkjQ2hyMitiXKyR+7xSqx6u6AitlpI3wrBj5OSo5xv8ZShoq5VZE+p/hb/OVzuPHyHGXQLoug9b4af/OzArAqtlvq8PidqZSflOYigVIpTZ33192wQ1jHVXLgjWWeZdAfhn3UteqH43NI9EGSjns7CJ//g8h6o6++UrLBTrOZJUkhy4NxDNAblZld53kJZl34z4jE5cB0HbA5RHnzg9Txud28wwG4aS1pwzKH7t/IyxlEvW2XVQLcf0vyeCWfL9j39vk95iA1alinhtmcHDr34tiSDECRgCXwFMgynMfrB0PlAxMhdUoPyKDo7qq2yNZHa+Li9BQoynz/I9DNkNcFCQSVi2aQbTOJA7S1tIXYpwM9t+PgBYzwFI0mNdt9JjxuGBHXJuwuJO+fq8KYzpDLtDll1XoYZ6k53P9dUNdNzwQZTcsvLw0Cafa0snfyq/WGVUVDo/VxBxXF5ynLZn6zUO/FvTIdjeiw3VUeyUqv7Q5+dIiz+W/VoTs03r+4U/ERpyHVbkIFAU44dGMKQBZfrwrGeAl4litNO9TVGFXRN1TDlfTyGVqdQaVEV7T0ZNJGO/NTQ9nL18aDk29b2Ui2SaqfhltIIMn4gpz+k+TiNNXkjf0LYWzf+DXO4UzHuF49WYS9pIIN3mjcoga1CNDuZ3kKzlja00XXS71OHFZjBhkI1K98WCQ/QC/r9n3qudrYVVea6aE9iP8L1A/KnWuJMZ+jwiyz+P3SFkcguW26os1MoON1p+35uAIgB3fXnzm2hscgvkD0PBi23t8YcEsP2u+gEUvdsXAg4VrA0y2zD/ZBgCjbz07ZNd4bBvYHQMPFcBFznsTv/hBOj9hkE0yvyRHcYZCK5VoEwGHQwU+dJBlX08BOMGx8MBk+I2oMHdQbLZFkGDADfVBQcmCx8Nb6S6fwJqRehFktWEAVsSA0yNP5DQm8wcW6tNr9D/T6PzGVgS2gP3iCoyPB/L4YF2A2ZICUKoZI06GSjdZYhdlxzeOLANIWxfoGkaofzK2BDRlWaq76VMAuRDbiXyhQiYTtV1L7hBS64vLpRJ/xbYMQRcPVPRT4802P5ruaHvrAv3BtDmzxwz3IsFcru92uL4GysByOVV7H4Rx7Xaqax2xvqiNEQId74svvjAcglfgwis/o+vnFdpxsCJHV8uomprlYHfNpPvrV79B4+G75+dG5i3NEGBh0+urAGWrXZ1uItAYmWJNQl28cCs1pd6/AX+c/Q0znEddU8OOLjEDWWF4qcsp8d7DgweI1Vv85bs8or6kK+g+8scLc22/Ed/oVI3WF9iGKrNzybSd8sQsS9u2sFyqiPXbaWpgH2Xg3x0Dclm+whsRABfKOXlh2tCpCqhMo3wGz54pBkxbsAxUN0ejCKbq/xXAt/dS/BPA9VC+EFC6jiTkrS8w3Raj+Sp2U/vcdFdGprxDRcPbAOa7LwYyOtEZlWh08EyUjdA/GtU4Gjs+bDxRN0bi6HbezUEZQGzNwIMHiB+NDMugG1UD7o4YwLne9MIbbEYGKNT9dIA2gLs/ALzrc1PphlwOAO/BC/n7Vk/DuL+lE67wdleAuQEH8sEik0/U0KMNuDMF3XWkvO3+wdDEFZQm6Vh6pAX47qfXeHYGMwcMXHc/wHc/PQYyAslWXNUPjNf3xEAlocNxqJjbQEYcW6sHO6bEH/6+VSgKf75S2AReOLiEa5Y/dEuF3/yKd0ootu+mvgQCzYt04TNUmPsNG0tga4ze+ZSRkYK3DiJCPYDdAb2ZHiiA78JZt/yge6XcIk67fLbVA1jASD1QILmlBDIy9o7Bxsn1APMeG5/b6SB9cHc9sO9sApTgPNXfXbJUuC2AxWPjjUiOzI3Hc8UmphFJCWQ8eAwehjEYbs2338j4cD+Vn4vgNfOwURsvXhxPDzwDay39+UVkOhCsiHrhwPovDyfxPIXC0xVJPeBqWlCPgvVzJ0FWgPEtyGZUxuCe9MB9zUcydgZ7BdksfFhBGKTM8tg2BkGHTlnJuEKx/d56r9m6gRXF7+ByBiJW11NAm8AoCKvj9HyfP7SfkkAwkjq0nc/jio8frDsFw+P0cYU7uvrh4NWz53avCrHwyOAuOAhvZiV6HVMIUk/uyA6GEwJGl0bReIzu8CZc0AY44o0gd/9PBvIcKObhX91HzAPMHrUK2L0tqD/T/oAbEAVx56B3qorHj9VZBNJHBTSN2lQrThpbkD4EC/RmWWQAhN78BuA2yanYE9x9e1pp9+yMdWug0QXeRJ+b8krTnxr80fGjU1xeegxMBSx1Rrr8EnS8y0t5aIIQ9RN9auPZZHJmJOXNM9w8QTEwh8efewwUGHE+n+uI1zpDZKCaLpfGVcGV2b173UGlr29qUk6EgQml57CQG4QcA5TRn1EJGgbsFlOMv4AFnbEALxBdvgfNVlSXn3EMAF/XRwaVyuM5wHNFJFp3uM8A82HXGs7NjxbbRlWKSCMSv/rVCWUgCEfU5jH8Whh3ot1WNz6WbmHTT1vbzSvKgBXBye+/NByKSEYSqpteGwauDQPXhoGW9PvGT69OZr2wvcNUcHph+gXwGgvGgFZATy8vvxby0FPtz11Tf93Pjat3eL9UbtvagQ+qWkfjIwhO/iLZBsC/zWFdc4G1itWc6Lb2WDcKy2DG/aMO1vH6R3t27PjCtIXpP75Wrum0V1/Bjc5GWc2paSvKVSeR8940C1az4gykFNA34hvQJXkPVGDrh6py4wHtoY1Y+WapTwOfBt3Ob+WkQI9BG28+V/sLG+N/bgYypUt/Kt0XZsemTffmjcloOqs3kACgNcVN+ivQjx24eYRO9uwZPMOKUAlMb27YyT4DDJBoOh/HmXbeGkl+hTnp55W6SyA1ZroNZJjnG8S3AGPO9t89njijpTk4Mw+ruUs0avB2BrDuEf+mHHnAE2mlfBlAdjBjThWFg8z2++/ZAw+btanGdivMqTEVhlea0uW7ckrbzTw9UZ2dbbTjWz3h0RgG7igDlkEzTBiQwKbdStXgTB7hhRlYCQiPzMhIAxvLpsnBNjrVrRqhH3ppSv1jpg8nlP9mJoGJj+lM2910mZzNBwDMdn0xw+410wzMfIXDxiWb27aNJeAy0PHvb0PAlm0g497xX3iqXIDt3mO0KVb/A2FGszM8bg9GfHcGm2EN+KCVHh8sl4V+mL7Qy3MAS/NwPezy9UJi1op2pjkxi7ZuJWPR4+4O7+H9TvPLWBs4H+DuO4Af+txUuiGXQ40JrxLu6wE3la7HjTCgmz3OC9TDdhDxd0/Tob+I+/PvTz9h/JuYAjFzAueCHHjHMjIF8PhheogycCPiT9vjfEBVVLq3nced8f9g/FPuHU3PXAG+Czdm3sGA8wHufjfgptINuRkZIfD+YOCyWe/eGlFQEDIg/P1B+2PgviWQkREg3dYO9FRZwACWe6in2gwD+NBtV26B7kElgAwcvPxEGyiKw3GQ8QBRHPv+9K35692kXajXyBZe5INKRO5gouVBMPIoIHi4koV6Ebge4cnDAoLIQYl7hCyKn8naK4CYgHorGAqgh4HDC2AE9tsFeBM8eBfIyMjI6MfeleD9qjw+DnBbmxGRCDy6byf9ChVhdn1mtVBLnIeTCUB05MOieGZqxDigEH4CP3xo2HBQAYzAJ94FMjIyHjq2XnbfMoNgdtx7J2CD2wT9CfANgl4ZfTlAkCNwisfvzz3yLCewQEgEmgxDflgCSAXGyh8Rg1UwfMtiT+KIgHwGY8n7r9BwCT2BkfRrY9sM9pu+dwUqIyPjoaPgkzfRf0s+EhCJ3G/HvdAEAyRc0PnYCIXGz0blRotPziJ2mZcCvQyEwwaP/3CUMzDskBGARqd6HDgHTIAmMnAPR4c+veMwVn5Yg1HBwQKDT7L4rH6CryEERfAKFLQFsJsMMHQbJNrIe4oPCgiCw/wYf/wKRhIwjnsFEEbO44CMjI8ae+3BgZliWiksXKYoPLsSYIDjwDDz6W+wjN4XviWMlUrewFZBPff/I0rWn9+GDPeZBUwLNACCiLuUAJ5sTwsBL9yrYsSqhwz1iShYgIm0ACaAsIXs3K75A5lgnZ7dGBlYxx9a8hkad/QPmzIyMo4O4bvWPipEZxa+4imDCRuf//HnMIcV3bHcEYXYKrJvdUooPbPk2U3pll4OIDhJBVYgfSytZoQAgvj+AoU+rSshAL4+gZU/mgYghrpAtL2T+GX8akLkl0Q48v4EcE/PYWdkfBxQx1SucfLOZ/Ik0c/2x48POGmaKdFz9jAsF0N+F1wLOlXWVpo2h+dVuApcxelg8jc34eZgVjGp5QOE9cRjQARmhE4vg8mqx79mnpeIHlDKg1ZdKmiaotTADLrr4Zd3LpESAOiXooN7N7ppAUjrdX3C8blKbjOcwOnF/OdABSCPdmX15fUP7BSxYr4AZPU/d+FQ+hKFgnnIV+EVy4KsAMHFxUW6BcBy2bWiqXlJvCq4Un9WADJ+RQTwVKZ++hQ9TuXpf7U4ZdUhCSp76CxG8C2576EE8As6Llm0j8EdZxMIICjvmQKT+MReIS6AaqmAHAY0yF42Be+K1LXtAjWWbw8YCRj6Qn18fvpbAA3XXa4RO0NVtQpbvFLaKYCR0WGr0VQ+8zfjoeHLL3uDS3kmqR3Nz6TNe1FPnc551CmRxSOrw6K9r3L+z40Sfo7pYSHBJle+Havreg1az9Tsob2NVOSl7delPHZoQdcnXgK89NmVZyK3F5iZttOWv4LxB3pUQNYDvnr6+s3VUzJaqrqhEzl9VAsgVWH4Lfyu+8xIBaXmrxlNzU43KpqQ8NZn0NgxO27xy/sSSdIKZnDSQmslBLIFuPoFAtAC9wTwi3n3IdWnI11ACVi6BDXYQvoP8Jfu81e3QOJfYUVXjCbh6up1QMPRqKKcZUO7Turntbc2sCEAZPYfWbvSR0Yn7Q6wgf5zw4DrAnJBia8vWCbkxWbZ9dOCn1gddKmSVl+8/vtCiMXfXxuylVe/b/pe94QdLdY5DbRt85HfGfeOKR2MSy0G133R97uMWMNsOn0LtO/3bxsbQtvlVTtNBfI48BXXwxdOKf5T4l9OC6+mXQatm67FzHJkyZXO76nhli9OkYev2/J0gDOrnQ1fyUK9Cvu1Z1rWAwThej7nBLpS9MrSpR9fu3Ob/F0XNAMiwIkCEYBvReTAjUSQ50F3VboQVADdOIxIqr65kXbV0m8lc25cEkiceSTItAD+rWgci5V64OU0cb1SuPCTO3l1NTo/P/cEQASnVicunnZ/bIFjlWwBNzfd7Jxez9rnV+y+C7yUo1Fn97nNWi0WfyaFNd1f6UQAnoM/5+gxRfmbkakSiEKiBcBUAqLnDN4TTu/uTgnZnshxSokvAgt7oF6B2WL9ISPDx3sg58x+h03uu3vk6LB4Ly0HSuCD7m7y/wcbgynBmFFsnGprPSUf8eA0qBcWuNc29BjdfaC7/tJ0vvcK93lYsJONu+gzS8iKN0S3Bzqrq23Z0vWN77t/33sRzrwUhxWAqzAtvJ8HMttUVfdM29YCUMSG7/FYH0Ag6deOfE0jsUSE8KsvdtAFehYfDoEf5FgU3v1wnzwc0SAlI+PTB8zY7MRfJd0DHj3y6cYvrTnkKEAYQ0CF4AnAhFlNr7hrZsAj2C0UcsxAw0Obyq1kOAiQ5GFHAocUQKrGjDygAA7cBfhA6d67QEbGg8eDfj9s2c1s4ceG3C+sm3dskVQC9dLCTJUWG9LHhlK+bvHHRryit5NXF2Lm30Eli6qT80n3Z9ep4RzO6cK9pMGnJ/IzOVLNXur3TVIB6Fax8tahiQC+1sBV2XXpo0MN8OrFK9rm1TCgacg9p8hZUxkZGZ8I+H2AIfoW6dvN6HXL25YeAr8P8AEskFYvQrs19J2Kr8LvLA2cFsnwDy78Q7J8Ab3hcvmUhfu0zsLd1+gDkLu2CVpeO/vSMHAFJuOTaCLiBvHBjz/Ij8BvgpY3fm9swmEBcAYsbLlyX1Wa4WHaz89GSAgIXKy0gHpo/Y67sQLg9wGG6CtHX21Cr1vetvQI8PsAQ/TVt5L+9mpTet3ytqUzMjIGYHTG3uijh5yr0+k6+PvyhJ7PexUU/QIQ9LnA40cWwEPvAhkZGftA/3tFjgqFGDocrRpc0+XV/ahenOIJAAr8ED8qADvbojmAL4BCvUFvX/zuHNsKQMcXlP6IW0AM/V0gUf2PtQVsC3UAp/lmHDv+D/qKcxyg6AblAAAAAElFTkSuQmCC);
}

/* positioning */
.ui-icon-carat-1-n {
    background-position: 0 0;
}

.ui-icon-carat-1-ne {
    background-position: -16px 0;
}

.ui-icon-carat-1-e {
    background-position: -32px 0;
}

.ui-icon-carat-1-se {
    background-position: -48px 0;
}

.ui-icon-carat-1-s {
    background-position: -64px 0;
}

.ui-icon-carat-1-sw {
    background-position: -80px 0;
}

.ui-icon-carat-1-w {
    background-position: -96px 0;
}

.ui-icon-carat-1-nw {
    background-position: -112px 0;
}

.ui-icon-carat-2-n-s {
    background-position: -128px 0;
}

.ui-icon-carat-2-e-w {
    background-position: -144px 0;
}

.ui-icon-triangle-1-n {
    background-position: 0 -16px;
}

.ui-icon-triangle-1-ne {
    background-position: -16px -16px;
}

.ui-icon-triangle-1-e {
    background-position: -32px -16px;
}

.ui-icon-triangle-1-se {
    background-position: -48px -16px;
}

.ui-icon-triangle-1-s {
    background-position: -64px -16px;
}

.ui-icon-triangle-1-sw {
    background-position: -80px -16px;
}

.ui-icon-triangle-1-w {
    background-position: -96px -16px;
}

.ui-icon-triangle-1-nw {
    background-position: -112px -16px;
}

.ui-icon-triangle-2-n-s {
    background-position: -128px -16px;
}

.ui-icon-triangle-2-e-w {
    background-position: -144px -16px;
}

.ui-icon-arrow-1-n {
    background-position: 0 -32px;
}

.ui-icon-arrow-1-ne {
    background-position: -16px -32px;
}

.ui-icon-arrow-1-e {
    background-position: -32px -32px;
}

.ui-icon-arrow-1-se {
    background-position: -48px -32px;
}

.ui-icon-arrow-1-s {
    background-position: -64px -32px;
}

.ui-icon-arrow-1-sw {
    background-position: -80px -32px;
}

.ui-icon-arrow-1-w {
    background-position: -96px -32px;
}

.ui-icon-arrow-1-nw {
    background-position: -112px -32px;
}

.ui-icon-arrow-2-n-s {
    background-position: -128px -32px;
}

.ui-icon-arrow-2-ne-sw {
    background-position: -144px -32px;
}

.ui-icon-arrow-2-e-w {
    background-position: -160px -32px;
}

.ui-icon-arrow-2-se-nw {
    background-position: -176px -32px;
}

.ui-icon-arrowstop-1-n {
    background-position: -192px -32px;
}

.ui-icon-arrowstop-1-e {
    background-position: -208px -32px;
}

.ui-icon-arrowstop-1-s {
    background-position: -224px -32px;
}

.ui-icon-arrowstop-1-w {
    background-position: -240px -32px;
}

.ui-icon-arrowthick-1-n {
    background-position: 0 -48px;
}

.ui-icon-arrowthick-1-ne {
    background-position: -16px -48px;
}

.ui-icon-arrowthick-1-e {
    background-position: -32px -48px;
}

.ui-icon-arrowthick-1-se {
    background-position: -48px -48px;
}

.ui-icon-arrowthick-1-s {
    background-position: -64px -48px;
}

.ui-icon-arrowthick-1-sw {
    background-position: -80px -48px;
}

.ui-icon-arrowthick-1-w {
    background-position: -96px -48px;
}

.ui-icon-arrowthick-1-nw {
    background-position: -112px -48px;
}

.ui-icon-arrowthick-2-n-s {
    background-position: -128px -48px;
}

.ui-icon-arrowthick-2-ne-sw {
    background-position: -144px -48px;
}

.ui-icon-arrowthick-2-e-w {
    background-position: -160px -48px;
}

.ui-icon-arrowthick-2-se-nw {
    background-position: -176px -48px;
}

.ui-icon-arrowthickstop-1-n {
    background-position: -192px -48px;
}

.ui-icon-arrowthickstop-1-e {
    background-position: -208px -48px;
}

.ui-icon-arrowthickstop-1-s {
    background-position: -224px -48px;
}

.ui-icon-arrowthickstop-1-w {
    background-position: -240px -48px;
}

.ui-icon-arrowreturnthick-1-w {
    background-position: 0 -64px;
}

.ui-icon-arrowreturnthick-1-n {
    background-position: -16px -64px;
}

.ui-icon-arrowreturnthick-1-e {
    background-position: -32px -64px;
}

.ui-icon-arrowreturnthick-1-s {
    background-position: -48px -64px;
}

.ui-icon-arrowreturn-1-w {
    background-position: -64px -64px;
}

.ui-icon-arrowreturn-1-n {
    background-position: -80px -64px;
}

.ui-icon-arrowreturn-1-e {
    background-position: -96px -64px;
}

.ui-icon-arrowreturn-1-s {
    background-position: -112px -64px;
}

.ui-icon-arrowrefresh-1-w {
    background-position: -128px -64px;
}

.ui-icon-arrowrefresh-1-n {
    background-position: -144px -64px;
}

.ui-icon-arrowrefresh-1-e {
    background-position: -160px -64px;
}

.ui-icon-arrowrefresh-1-s {
    background-position: -176px -64px;
}

.ui-icon-arrow-4 {
    background-position: 0 -80px;
}

.ui-icon-arrow-4-diag {
    background-position: -16px -80px;
}

.ui-icon-extlink {
    background-position: -32px -80px;
}

.ui-icon-newwin {
    background-position: -48px -80px;
}

.ui-icon-refresh {
    background-position: -64px -80px;
}

.ui-icon-shuffle {
    background-position: -80px -80px;
}

.ui-icon-transfer-e-w {
    background-position: -96px -80px;
}

.ui-icon-transferthick-e-w {
    background-position: -112px -80px;
}

.ui-icon-folder-collapsed {
    background-position: 0 -96px;
}

.ui-icon-folder-open {
    background-position: -16px -96px;
}

.ui-icon-document {
    background-position: -32px -96px;
}

.ui-icon-document-b {
    background-position: -48px -96px;
}

.ui-icon-note {
    background-position: -64px -96px;
}

.ui-icon-mail-closed {
    background-position: -80px -96px;
}

.ui-icon-mail-open {
    background-position: -96px -96px;
}

.ui-icon-suitcase {
    background-position: -112px -96px;
}

.ui-icon-comment {
    background-position: -128px -96px;
}

.ui-icon-person {
    background-position: -144px -96px;
}

.ui-icon-print {
    background-position: -160px -96px;
}

.ui-icon-trash {
    background-position: -176px -96px;
}

.ui-icon-locked {
    background-position: -192px -96px;
}

.ui-icon-unlocked {
    background-position: -208px -96px;
}

.ui-icon-bookmark {
    background-position: -224px -96px;
}

.ui-icon-tag {
    background-position: -240px -96px;
}

.ui-icon-home {
    background-position: 0 -112px;
}

.ui-icon-flag {
    background-position: -16px -112px;
}

.ui-icon-calendar {
    background-position: -32px -112px;
}

.ui-icon-cart {
    background-position: -48px -112px;
}

.ui-icon-pencil {
    background-position: -64px -112px;
}

.ui-icon-clock {
    background-position: -80px -112px;
}

.ui-icon-disk {
    background-position: -96px -112px;
}

.ui-icon-calculator {
    background-position: -112px -112px;
}

.ui-icon-zoomin {
    background-position: -128px -112px;
}

.ui-icon-zoomout {
    background-position: -144px -112px;
}

.ui-icon-search {
    background-position: -160px -112px;
}

.ui-icon-wrench {
    background-position: -176px -112px;
}

.ui-icon-gear {
    background-position: -192px -112px;
}

.ui-icon-heart {
    background-position: -208px -112px;
}

.ui-icon-star {
    background-position: -224px -112px;
}

.ui-icon-link {
    background-position: -240px -112px;
}

.ui-icon-cancel {
    background-position: 0 -128px;
}

.ui-icon-plus {
    background-position: -16px -128px;
}

.ui-icon-plusthick {
    background-position: -32px -128px;
}

.ui-icon-minus {
    background-position: -48px -128px;
}

.ui-icon-minusthick {
    background-position: -64px -128px;
}

.ui-icon-close {
    background-position: -80px -128px;
}

.ui-icon-closethick {
    background-position: -96px -128px;
}

.ui-icon-key {
    background-position: -112px -128px;
}

.ui-icon-lightbulb {
    background-position: -128px -128px;
}

.ui-icon-scissors {
    background-position: -144px -128px;
}

.ui-icon-clipboard {
    background-position: -160px -128px;
}

.ui-icon-copy {
    background-position: -176px -128px;
}

.ui-icon-contact {
    background-position: -192px -128px;
}

.ui-icon-image {
    background-position: -208px -128px;
}

.ui-icon-video {
    background-position: -224px -128px;
}

.ui-icon-script {
    background-position: -240px -128px;
}

.ui-icon-alert {
    background-position: 0 -144px;
}

.ui-icon-info {
    background-position: -16px -144px;
}

.ui-icon-notice {
    background-position: -32px -144px;
}

.ui-icon-help {
    background-position: -48px -144px;
}

.ui-icon-check {
    background-position: -64px -144px;
}

.ui-icon-bullet {
    background-position: -80px -144px;
}

.ui-icon-radio-off {
    background-position: -96px -144px;
}

.ui-icon-radio-on {
    background-position: -112px -144px;
}

.ui-icon-pin-w {
    background-position: -128px -144px;
}

.ui-icon-pin-s {
    background-position: -144px -144px;
}

.ui-icon-play {
    background-position: 0 -160px;
}

.ui-icon-pause {
    background-position: -16px -160px;
}

.ui-icon-seek-next {
    background-position: -32px -160px;
}

.ui-icon-seek-prev {
    background-position: -48px -160px;
}

.ui-icon-seek-end {
    background-position: -64px -160px;
}

.ui-icon-seek-start {
    background-position: -80px -160px;
}

/* ui-icon-seek-first is deprecated, use ui-icon-seek-start instead */
.ui-icon-seek-first {
    background-position: -80px -160px;
}

.ui-icon-stop {
    background-position: -96px -160px;
}

.ui-icon-eject {
    background-position: -112px -160px;
}

.ui-icon-volume-off {
    background-position: -128px -160px;
}

.ui-icon-volume-on {
    background-position: -144px -160px;
}

.ui-icon-power {
    background-position: 0 -176px;
}

.ui-icon-signal-diag {
    background-position: -16px -176px;
}

.ui-icon-signal {
    background-position: -32px -176px;
}

.ui-icon-battery-0 {
    background-position: -48px -176px;
}

.ui-icon-battery-1 {
    background-position: -64px -176px;
}

.ui-icon-battery-2 {
    background-position: -80px -176px;
}

.ui-icon-battery-3 {
    background-position: -96px -176px;
}

.ui-icon-circle-plus {
    background-position: 0 -192px;
}

.ui-icon-circle-minus {
    background-position: -16px -192px;
}

.ui-icon-circle-close {
    background-position: -32px -192px;
}

.ui-icon-circle-triangle-e {
    background-position: -48px -192px;
}

.ui-icon-circle-triangle-s {
    background-position: -64px -192px;
}

.ui-icon-circle-triangle-w {
    background-position: -80px -192px;
}

.ui-icon-circle-triangle-n {
    background-position: -96px -192px;
}

.ui-icon-circle-arrow-e {
    background-position: -112px -192px;
}

.ui-icon-circle-arrow-s {
    background-position: -128px -192px;
}

.ui-icon-circle-arrow-w {
    background-position: -144px -192px;
}

.ui-icon-circle-arrow-n {
    background-position: -160px -192px;
}

.ui-icon-circle-zoomin {
    background-position: -176px -192px;
}

.ui-icon-circle-zoomout {
    background-position: -192px -192px;
}

.ui-icon-circle-check {
    background-position: -208px -192px;
}

.ui-icon-circlesmall-plus {
    background-position: 0 -208px;
}

.ui-icon-circlesmall-minus {
    background-position: -16px -208px;
}

.ui-icon-circlesmall-close {
    background-position: -32px -208px;
}

.ui-icon-squaresmall-plus {
    background-position: -48px -208px;
}

.ui-icon-squaresmall-minus {
    background-position: -64px -208px;
}

.ui-icon-squaresmall-close {
    background-position: -80px -208px;
}

.ui-icon-grip-dotted-vertical {
    background-position: 0 -224px;
}

.ui-icon-grip-dotted-horizontal {
    background-position: -16px -224px;
}

.ui-icon-grip-solid-vertical {
    background-position: -32px -224px;
}

.ui-icon-grip-solid-horizontal {
    background-position: -48px -224px;
}

.ui-icon-gripsmall-diagonal-se {
    background-position: -64px -224px;
}

.ui-icon-grip-diagonal-se {
    background-position: -80px -224px;
}

/* Misc visuals
----------------------------------*/

/* Corner radius */
.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {
    -moz-border-radius-topleft: 0px;
    -webkit-border-top-left-radius: 0px;
    -khtml-border-top-left-radius: 0px;
    border-top-left-radius: 0px;
}

.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {
    -moz-border-radius-topright: 0px;
    -webkit-border-top-right-radius: 0px;
    -khtml-border-top-right-radius: 0px;
    border-top-right-radius: 0px;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {
    -moz-border-radius-bottomleft: 0px;
    -webkit-border-bottom-left-radius: 0px;
    -khtml-border-bottom-left-radius: 0px;
    border-bottom-left-radius: 0px;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {
    -moz-border-radius-bottomright: 0px;
    -webkit-border-bottom-right-radius: 0px;
    -khtml-border-bottom-right-radius: 0px;
    border-bottom-right-radius: 0px;
}

/* Overlays */
.ui-widget-overlay {
    background: #aaaaaa url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAh0lEQVRYhe2UsQ3AIAwEL0zC/qMwhTdJiiCRpH2kfPHu0DUnbN0xxjiZU1U8p/f+ev/Bm7MccAu6ygE0ZzlgrdhRrqqWoKMczB90lQNoznLwuUE3uXRwB08HVZ4OqjwdVHk6qPJ0UOXpoMrTQZWngypPB1WeDqo8HVR5OqjydFDl6aDK7Tt4AWXCW8vnTP6PAAAAAElFTkSuQmCC") 50% 50% repeat;
    opacity: .30;
    filter: Alpha(Opacity = 30);
}

.ui-widget-shadow {
    margin: -8px 0 0 -8px;
    padding: 8px;
    background: #aaaaaa url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD0ZHJ6AAAAe0lEQVRoge3OMQHAIBAAMcC/kjdZJHTI0A4XBdkz86wfO18H3hRUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUF8O8A8WdY6opAAAAAElFTkSuQmCC") 50% 50% repeat-x;
    opacity: .30;
    filter: Alpha(Opacity = 30);
    -moz-border-radius: 8px;
    -khtml-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
}

/*!
* jQuery UI Resizable 1.8.21
*
* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Resizable#theming
*/
.ui-resizable {
    position: relative;
}

.ui-resizable-handle {
    position: absolute;
    font-size: 0.1px;
    display: block;
}

.ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle {
    display: none;
}

.ui-resizable-n {
    cursor: n-resize;
    height: 7px;
    width: 100%;
    top: -5px;
    left: 0;
}

.ui-resizable-s {
    cursor: s-resize;
    height: 7px;
    width: 100%;
    bottom: -5px;
    left: 0;
}

.ui-resizable-e {
    cursor: e-resize;
    width: 7px;
    right: -5px;
    top: 0;
    height: 100%;
}

.ui-resizable-w {
    cursor: w-resize;
    width: 7px;
    left: -5px;
    top: 0;
    height: 100%;
}

.ui-resizable-se {
    cursor: se-resize;
    width: 12px;
    height: 12px;
    right: 1px;
    bottom: 1px;
}

.ui-resizable-sw {
    cursor: sw-resize;
    width: 9px;
    height: 9px;
    left: -5px;
    bottom: -5px;
}

.ui-resizable-nw {
    cursor: nw-resize;
    width: 9px;
    height: 9px;
    left: -5px;
    top: -5px;
}

.ui-resizable-ne {
    cursor: ne-resize;
    width: 9px;
    height: 9px;
    right: -5px;
    top: -5px;
}

/*!
* jQuery UI Button 1.8.21
*
* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Button#theming
*/
.ui-button {
    display: inline-block;
    position: relative;
    padding: 0;
    margin-right: .1em;
    text-decoration: none !important;
    cursor: pointer;
    text-align: center;
    zoom: 1;
    overflow: visible;
}

/* the overflow property removes extra width in IE */
.ui-button-icon-only {
    width: 2.2em;
}

/* to make room for the icon, a width needs to be set here */
button.ui-button-icon-only {
    width: 2.4em;
}

/* button elements seem to need a little more width */
.ui-button-icons-only {
    width: 3.4em;
}

button.ui-button-icons-only {
    width: 3.7em;
}

/*button text element */
.ui-button .ui-button-text {
    display: block;
    line-height: 1.4;
}

.ui-button-text-only .ui-button-text {
    padding: .4em 1em;
}

.ui-button-icon-only .ui-button-text, .ui-button-icons-only .ui-button-text {
    padding: .4em;
    text-indent: -9999999px;
}

.ui-button-text-icon-primary .ui-button-text, .ui-button-text-icons .ui-button-text {
    padding: .4em 1em .4em 2.1em;
}

.ui-button-text-icon-secondary .ui-button-text, .ui-button-text-icons .ui-button-text {
    padding: .4em 2.1em .4em 1em;
}

.ui-button-text-icons .ui-button-text {
    padding-left: 2.1em;
    padding-right: 2.1em;
}

/* no icon support for input elements, provide padding by default */
input.ui-button {
    padding: .4em 1em;
}

/*button icon element(s) */
.ui-button-icon-only .ui-icon, .ui-button-text-icon-primary .ui-icon, .ui-button-text-icon-secondary .ui-icon, .ui-button-text-icons .ui-icon, .ui-button-icons-only .ui-icon {
    position: absolute;
    top: 50%;
    margin-top: -8px;
}

.ui-button-icon-only .ui-icon {
    left: 50%;
    margin-left: -8px;
}

.ui-button-text-icon-primary .ui-button-icon-primary, .ui-button-text-icons .ui-button-icon-primary, .ui-button-icons-only .ui-button-icon-primary {
    left: .5em;
}

.ui-button-text-icon-secondary .ui-button-icon-secondary, .ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary {
    right: .5em;
}

.ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary {
    right: .5em;
}

/*button sets*/
.ui-buttonset {
    margin-right: 7px;
}

.ui-buttonset .ui-button {
    margin-left: 0;
    margin-right: -.3em;
}

/* workarounds */
button.ui-button::-moz-focus-inner {
    border: 0;
    padding: 0;
}

/* reset extra padding in Firefox */
/*!
 * jQuery UI Dialog 1.8.21
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog#theming
 */
.ui-dialog {
    position: absolute;
    padding: .2em;
    width: 300px;
    overflow: hidden;
}

.ui-dialog .ui-dialog-titlebar {
    padding: .4em 1em;
    position: relative;
}

.ui-dialog .ui-dialog-title {
    float: left;
    margin: .1em 16px .1em 0;
}

.ui-dialog .ui-dialog-titlebar-close {
    position: absolute;
    right: .3em;
    top: 50%;
    width: 19px;
    margin: -10px 0 0 0;
    padding: 1px;
    height: 18px;
}

.ui-dialog .ui-dialog-titlebar-close span {
    display: block;
    margin: 1px;
}

.ui-dialog .ui-dialog-titlebar-close:hover, .ui-dialog .ui-dialog-titlebar-close:focus {
    padding: 0;
}

.ui-dialog .ui-dialog-content {
    position: relative;
    border: 0;
    padding: .5em;
    background: none;
    overflow: auto;
    zoom: 1;
}

.ui-dialog .ui-dialog-buttonpane {
    text-align: left;
    border-width: 1px 0 0 0;
    background-image: none;
    margin: .5em 0 0 0;
    padding: .3em 1em .5em .4em;
}

.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset {
    float: right;
}

.ui-dialog .ui-dialog-buttonpane button {
    margin: .5em .4em .5em 0;
    cursor: pointer;
}

.ui-dialog .ui-resizable-se {
    width: 14px;
    height: 14px;
    right: 3px;
    bottom: 3px;
}

.ui-draggable .ui-dialog-titlebar {
    cursor: move;
}

/*!
* jQuery UI Tabs 1.8.21
*
* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Tabs#theming
*/
.ui-tabs {
    position: relative;
    padding: 0em;
    zoom: 1;
}

/* position: relative prevents IE scroll bug (element with position: relative inside container with overflow: auto appear as "fixed") */
.ui-tabs .ui-tabs-nav {
    margin: 0;
    padding: .2em .2em 0;
}

.ui-tabs .ui-tabs-nav li {
    list-style: none;
    float: left;
    position: relative;
    top: 1px;
    margin: 0 .2em 1px 0;
    border-bottom: 0 !important;
    padding: 0;
    white-space: nowrap;
}

.ui-tabs .ui-tabs-nav li a {
    float: left;
    padding: .2em 1em;
    text-decoration: none;
}

.ui-tabs .ui-tabs-nav li.ui-tabs-selected {
    margin-bottom: 0;
    padding-bottom: 1px;
}

.ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-state-processing a {
    cursor: text;
}

.ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a {
    cursor: pointer;
}

/* first selector in group seems obsolete, but required to overcome bug in Opera applying cursor: text overall if defined elsewhere... */
.ui-tabs .ui-tabs-panel {
    display: block;
    border-width: 0;
    padding: 0em 0.1em;
    background: none;
}

.ui-tabs .ui-tabs-hide {
    display: none !important;
}

/*!
* jQuery UI Progressbar 1.8.21
*
* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Progressbar#theming
*/
.ui-progressbar {
    height: 5px;
    text-align: left;
    overflow: hidden;
}

.ui-progressbar .ui-progressbar-value {
    margin: -1px;
    height: 100%;
}

.prog {
    display: block;
    width : 100%;
    height: 100%;
    background: rgb(252, 249, 56) -moz-linear-gradient(center bottom, rgb(252, 249, 56) 37%, rgb(252, 249, 56) 69%);
    position: relative;
    overflow: hidden;
}
.prog:after {
    content: "";
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: -moz-linear-gradient(-45deg, rgba(10, 10, 10, .6) 25%, transparent 25%, transparent 50%, rgba(10, 10, 10, .6) 50%, rgba(10, 10, 10, .6) 75%, transparent 75%, transparent);
    z-index: 1;
    -webkit-background-size: 50px 50px;
    -moz-background-size: 50px 50px;
    background-size: 50px 50px;
    -webkit-animation: move 2s linear infinite;
    -moz-animation: move 2s linear infinite;
    overflow: hidden;
}

.animate > .prog:after {
    display: none;
}

@-webkit-keyframes move {
		    0% {
		       background-position: 0 0;
		    }
		    100% {
		       background-position: 50px 50px;
		    }
		}

@-moz-keyframes move {
		    0% {
		       background-position: 0 0;
		    }
		    100% {
		       background-position: 50px 50px;
		    }
		}


    ]]></>.toXMLString();

    var LF = <><![CDATA[
table.resources td {
     font-size: 12px;
     line-height: 12px;
}

table.resources .More {
     font-size: 11px;
     height: 11px ! important;
     line-height: 11px ! important;
}

#BuildTab table.resources tr td, #BuildTab table.resources tr td a {
     font-size: 12px;
     padding: 0 2px;
}

.toast .message {
     font-size: 12px;
}

.ui-tooltip table tr.small td {
     font-size: 11px ! important;
     line-height: 11px ! important;
}

    ]]></>.toXMLString();

    GM_addStyle(default_style);
    if (SITR.db.options.largeFont) GM_addStyle(LF)
};
/***********************************************************************************************************************
 *
 * SITR.ikariam
 *
 **********************************************************************************************************************/

SITR.ikariam = {
    _Parent          :null,
    _View            :null,
    _Host            :null,
    _Server          :null,
    _ActionRequest   :null,
    _currentCityId   :null,
    _chkCityId       :null,
    _chkTemplate     :null,
    _Units           :null,
    _BuildingsList   :null,
    _AltBuildingsList:null,
    _Nationality     :null,
    _GameVersion     :null,
    _TemplateView    :null,

    Host        :function () {
        if (this._Host == null) {
            this._Host = '';
            this._Host = document.location.host;
        }
        return this._Host;
    },


    Server : function (host) {
        if (this._Server == null) {
            if (host == undefined) host = this.Host();
            this._Server = '';

            var parts = host.split(".");
            var idx = 0;
            if (parts[0] == 'www') idx++;
            this._Server = parts[idx];
        }

        return this._Server;
    },

    Nationality  :function (host) {
        if (this._Nationality == null) {
            if (host == undefined) host = this.Host();
            this._Nationality = '';

            var parts = host.split(".");
            var idx = (parts[0] == 'www') ? 2 : 1;
            this._Nationality = parts[idx];
        }

        return this._Nationality;
    },

    GameVersion  :function () {
        if (this._GameVersion == null)
            this._GameVersion = $('.version a span').text().split("v ")[1];
        return this._GameVersion
    },

    get CurrentCityId() {

        this._currentCityId = (!!unsafeWindow.ikariam.model.relatedCityData?unsafeWindow.ikariam.model.relatedCityData[unsafeWindow.ikariam.model.relatedCityData.selectedCity]['id']:null);
        return this._currentCityId;

    },

    get CurrentTemplateView() {
        try {
            this._CurrentTemplateView = unsafeWindow.ikariam.templateView.id;
        } catch (e) {
            this._CurrentTemplateView = null
        }
        return this._CurrentTemplateView;
    },

    Init         :function (parent) {
        this._Parent = parent;
        this._chkCityId = this.CurrentCityId;
    },

    parseViews: function (view) {
        //try{ SITR.log(unsafeWindow.ikariam.templateView.id)}catch(e){};
        view = view || unsafeWindow.ikariam.templateView?unsafeWindow.ikariam.templateView.id:null;
        var that = this;
        if (view == null) {
            setTimeout(function () {
                if (unsafeWindow.ikariam.templateView)
                    SITR.ikariam.parseViews(unsafeWindow.ikariam.templateView.id); else SITR.ikariam.parseViews(null);
            },100);
            return false;
        }
        //SITR.log('Action: Parse Views');
        if ($('#sidebar .action_btn').length)
        if (!$('#sidebar .action_btn').data('events'))
        $('#sidebar .action_btn').on('click', function () {
            setTimeout(function () {
                SITR.ikariam.FetchItAll();
                SITR.Render.updateTables();
            }, 2000)
        });

        switch (view) {
            case 'finances':
                that.parseFinances($('#finances .table01 tr').slice(2).children('td'));
                break;
            case 'townHall':
                that.parseTownHall();
                break;
            case 'militaryAdvisor':
                that.parseMilitaryAdvisor();
                that._Parent.Render.SetAllArmyData();
                break;
            case 'cityMilitary':
                that.parseCityMilitary();
                that.parseMilitaryLocalization();
                that._Parent.Render.SetAllArmyData();
                break;
            case 'researchAdvisor':
                that.parseResearchAdvisor();
                break;
            case 'palace':
                that.parsePalace();
                break;
            case 'academy':
                that.parseAcademy();
                break;
            case 'culturalPossessions_assign':
                that.parseCulturalPossessions();
                return true;
                break;
            case 'museum':
                that.parseMuseum();
                break;
            case 'tavern':
                that.parseTavern();
                break;
            case 'transport':
                that.parseTransport();
                break;
            case 'temple':
                that.parseTemple();
                break;
            case 'barracks':case 'shipyard':
                that.parseBarracks(view);
                that._Parent.Render.SetAllArmyData();
                break;
            case 'deployment':
                that.parseMilitaryTransport();
                that._Parent.Render.SetAllArmyData();
                break;
        }
        this._Parent.Render.SetAllResourceData(false,true);
    },

    parsePalace : function () {
        this._Parent.db.globalData.governmentType = $('.government_pic img').attr('src').slice(16, -8);
        this._Parent.Render.toast('Updated: ' + $('#palace').children(":first").text());
    },

    parseCulturalPossessions : function () {
        //console.log('entered cult pos assign');
        var that = this
        setTimeout(function(){
        $('#moveCulturalGoods ul li').each(function () {
            var city = SITR.db.getCityFromName($(this).find('.city').text());
            if (city) {
                var goods = parseInt($('#textfield_city_' + city.id).val());
                if (!isNaN(goods))
                    city.culturalGoods = goods;
            }
        });
        that._Parent.Render.toast('Updated: ' + $('#culturalPossessions_assign > .header').text());
        $('#moveCulturalGoodsFormSubmit').click(function () {
            SITR.ikariam.parseCulturalPossessions()
        });
            that._Parent.Render.SetAllResourceData(true, true);
        },500);
    },
    parseMuseum : function(){
        var inc, max;
        var regText = $('#val_culturalGoodsDeposit').parent().text().match(/(\d+)/g)
        if (regText.length == 2){
            this._Parent.db.cities[this._Parent.ikariam.CurrentCityId].culturalGoods = regText[0]
        }
        this._Parent.Render.toast('Updated: ' +this._Parent.db.LocalStr('town')+' '+ $('#tab_museum > div > h3').text());
    },
    parseTavern   :function () {
    },

    resTransportObject : function () {
        return {id : null,
                      wood : 0,
                      wine : 0,
                      marble : 0,
                      glass : 0,
                      sulfur : 0,
                      targetCityId : 0,
                      arrivalTime : 0,
                      originCityId : 0,
                      loadedTime : 0,
                      mission : ''};
    },
    troopTransportObject : function () {
        return {id : null,
            troops : {},
            targetCityId : 0,
            arrivalTime : 0,
            originCityId : 0,
            returnTime : 0,
            mission : ''};
    },
    parseBarracks : function (view) {
        //console.log('entered barracks');
        var type = (view == 'barracks'?'army':view=='shipyard'?'fleet':false)
        var that = this
        var city = this._Parent.db.cities[this._Parent.ikariam.CurrentCityId]

        city.processUnitBuildList()
        city.clearUnitBuildList(type)

        var elem = $('#unitConstructionList');
        var tasks = city.unitBuildList
        tasks.push( {
            units:parseUnits(elem.find('> .army_wrapper .army')),
            completionTime:parseTime($('#buildCountDown').text()),
            type:type
        })

        elem.find('.constructionBlock').each(function(){
            tasks.push({
                units:parseUnits($(this).find('> .army_wrapper .army')),
                completionTime:parseTime($(this).find('h4 > span').text()),
                type:type
            })
        })

        function parseUnits(element) {
            var units = {}
            element.each(function () {
                    units[this.classList.toString().match(/(\d+)/g)] = parseInt(this.nextElementSibling.textContent.match(/(\d+)/g))
                });
            return units;
        }
        function parseTime(timeText){
            var completionTime = new Date()
            completionTime.setSeconds(completionTime.getSeconds() + (timeText.match(/(\d+)s/) ? parseInt(timeText.match(/(\d+)s/)[1]) : 0));
            completionTime.setMinutes(completionTime.getMinutes() + (timeText.match(/(\d+)m/) ? parseInt(timeText.match(/(\d+)m/)[1]) : 0));
            completionTime.setHours(completionTime.getHours() + (timeText.match(/(\d+)h/) ? parseInt(timeText.match(/(\d+)h/)[1]) : 0));
            completionTime.setDate(completionTime.getDate() + (timeText.match(/(\d+)D/) ? parseInt(timeText.match(/(\d+)D/)[1]) : 0));
            return completionTime.getTime();
        }
        $elem = null
        this._Parent.Render.toast('Updated: ' + $('#barracks .header.mainHeader').text());
    },

    //TODO: Cleanup
    parseTransport : function (submit) {
        submit = submit || false;
        if (submit) {
            var journeyTime = $('#journeyTime').text();
            //var arrivalTime = $('#arrival').text();
            var wood = parseInt($('#textfield_wood').val());
            var wine = parseInt($('#textfield_wine').val());
            var marble = parseInt($('#textfield_marble').val());
            var glass = parseInt($('#textfield_glass').val());
            var sulfur = parseInt($('#textfield_sulfur').val());
            var targetID = $('input:[name=destinationCityId]').val();

            var arrTime = new Date();
            var resObj = this.resTransportObject();
            resObj.id = 'XXX-' + arrTime.getTime();
            resObj.wood = wood;
            resObj.wine = wine;
            resObj.marble = marble;
            resObj.glass = glass;
            resObj.sulfur = sulfur;
            resObj.targetCityId = targetID;
            resObj.originCityId = this.CurrentCityId;
            resObj.mission = 'transport';

            //TODO: Refactor and clean this up
            var regArrTime = $('#arrival').text().match(/(\d+)/g);
            if (regArrTime[0] < new Date().getHours()) {
                arrTime.setHours(regArrTime[0] + 24)
            } else {
                arrTime.setHours(regArrTime[0])
            }
            arrTime.setSeconds(regArrTime[2]);
            arrTime.setMinutes(regArrTime[1]);
            resObj.arrivalTime = arrTime.getTime();
            arrTime.setSeconds(arrTime.getSeconds() - (journeyTime.match(/(\d+)s/) ? parseInt(journeyTime.match(/(\d+)s/)[1]) : 0));
            arrTime.setMinutes(arrTime.getMinutes() - (journeyTime.match(/(\d+)m/) ? parseInt(journeyTime.match(/(\d+)m/)[1]) : 0));
            arrTime.setHours(arrTime.getHours() - (journeyTime.match(/(\d+)h/) ? parseInt(journeyTime.match(/(\d+)h/)[1]) : 0));
            arrTime.setDate(arrTime.getDate() - (journeyTime.match(/(\d+)D/) ? parseInt(journeyTime.match(/(\d+)D/)[1]) : 0));
            resObj.loadedTime = arrTime.getTime();
            //SITR.log(resObj);
            SITR.db.AddFleetMovement(resObj);
            SITR.Render.SetAllResourceData();
            SITR.Render.toast('Updated: Movement added');

        } else {
            if ($('form#transport').length = 1) {
                if (!$('form#transport').data('events')) {
                    var that = this;
                    $('form#transport').submit(function () {
                        that.parseTransport(true);
                        $('form#transport').off('submit');
                        setTimeout(function () {
                            that.FetchItAll();
                            that._Parent.Render.SetAllResourceData();
                            if ($('#js_selectedCityAlly').length && (/.*view=city.*/.test(window.location.href) || /.*oldView=city.*/.test(window.location.href))) {
                                unsafeWindow.ikariam.templateView.destroyTemplateView(true);
                            }
                        }, 500)
                    });
                }
            }
        }

    },

    parseMilitaryTransport : function(submit){
        //$('ul.assignUnits li input.textfield')
        submit = submit || false;
        var that = this;
        if (submit) {
            var journeyTime = $('#journeyTime').text();
            var returnTime = $('#returnTime').text();
            var targetID = $('input:[name=destinationCityId]').val();

            var troops = {}
            var mission = ''
            $('ul.assignUnits li input.textfield').each(function(){
                if (this.value !== 0)troops[this.getAttribute('name').split('_').pop()] = parseInt(this.value)
                if (mission === '') mission = 'deploy'+this.getAttribute('name').match(/_(.*)_/)[1]
            })


            var arrTime = new Date();
            var transportObj = this.troopTransportObject();                                                
            transportObj.id = 'XXX-' + arrTime.getTime();
            transportObj.targetCityId = targetID;
            transportObj.originCityId = this.CurrentCityId;
            transportObj.mission = mission
            transportObj.troops = troops

            arrTime.setSeconds(arrTime.getSeconds() + (journeyTime.match(/(\d+)s/) ? parseInt(journeyTime.match(/(\d+)s/)[1]) : 0));
            arrTime.setMinutes(arrTime.getMinutes() + (journeyTime.match(/(\d+)m/) ? parseInt(journeyTime.match(/(\d+)m/)[1]) : 0));
            arrTime.setHours(arrTime.getHours() + (journeyTime.match(/(\d+)h/) ? parseInt(journeyTime.match(/(\d+)h/)[1]) : 0));
            arrTime.setDate(arrTime.getDate() + (journeyTime.match(/(\d+)D/) ? parseInt(journeyTime.match(/(\d+)D/)[1]) : 0));
            transportObj.arrivalTime = arrTime.getTime();

            arrTime = new Date();
            arrTime.setSeconds(arrTime.getSeconds() + (returnTime.match(/(\d+)s/) ? parseInt(returnTime.match(/(\d+)s/)[1]) : 0));
            arrTime.setMinutes(arrTime.getMinutes() + (returnTime.match(/(\d+)m/) ? parseInt(returnTime.match(/(\d+)m/)[1]) : 0));
            arrTime.setHours(arrTime.getHours() + (returnTime.match(/(\d+)h/) ? parseInt(returnTime.match(/(\d+)h/)[1]) : 0));
            arrTime.setDate(arrTime.getDate() + (returnTime.match(/(\d+)D/) ? parseInt(returnTime.match(/(\d+)D/)[1]) : 0));
            transportObj.returnTime = arrTime.getTime();
            
            //SITR.log(transportObj);
            console.log(transportObj)
            SITR.db.AddFleetMovement(transportObj);
            SITR.Render.SetAllResourceData();
            SITR.Render.toast('Updated: Movement added');

        } else {
            if ($('form#deploymentForm').length = 1) {
                if (!$('form#deploymentForm').data('events')) {

                    $('form#deploymentForm').submit(function () {
                        that.parseMilitaryTransport(true);
                        setTimeout(function () {
                            that._Parent.Render.SetAllArmyData();
                            console.log('update')
                            if ($('#js_selectedCityAlly').length && (/.*view=city.*/.test(window.location.href) || /.*oldView=city.*/.test(window.location.href))) {
                                unsafeWindow.ikariam.templateView.destroyTemplateView(true);
                            }
                        }, 1000)
                        return false;
                        $('form#deploymentForm').off('submit');
                    });
                }
            }
        }
    },
    parseFinances: function ($elem) {
        this._Parent.db.globalData.finance.lastUpdated = $.now();
        for (var i = 1; i < Object.keys(this._Parent.db.cities).length + 1; i++) {

            var city = this._Parent.db.getCityFromName($elem[(i * 4) - 4].textContent);
            if (city != false) {
                city.goldIncome = parseInt($elem[(i * 4) - 3].textContent.split(SITR.db.LocalStr('thousandSeperator')).join(''));
                city.goldExpend = parseInt($elem[(i * 4) - 2].textContent.split(SITR.db.LocalStr('thousandSeperator')).join(''));
                city.updateResearch();
            }
            this._Parent.db.globalData.SigmaIncome = parseInt($elem[(Object.keys(this._Parent.db.cities).length * 4) + 1].textContent.split(SITR.db.LocalStr('thousandSeperator')).join(''));
            this._Parent.db.globalData.SigmaExpenses = -1 * parseInt($elem[(Object.keys(this._Parent.db.cities).length * 4) + 2].textContent.split(SITR.db.LocalStr('thousandSeperator')).join(''));
        }
        var $breakdown = $('#finances').find('tbody tr.bottomLine td:last-child')
        this._Parent.db.globalData.ArmyCost =    parseInt($breakdown[0].textContent.split(SITR.db.LocalStr('thousandSeperator')).join(''));
        this._Parent.db.globalData.ArmySupply =  parseInt($breakdown[1].textContent.split(SITR.db.LocalStr('thousandSeperator')).join(''));
        this._Parent.db.globalData.FleetCost =   parseInt($breakdown[2].textContent.split(SITR.db.LocalStr('thousandSeperator')).join(''));
        this._Parent.db.globalData.FleetSupply = parseInt($breakdown[3].textContent.split(SITR.db.LocalStr('thousandSeperator')).join(''));

        SITR.Render.toast('Updated: ' + $('#finances').children(":first").text())
    },

    parseResearchAdvisor: function (count) {
        count = count || 0;

        if (SITR.db.globalData.research.topics == undefined) SITR.db.globalData.research.topics = new Object;
        // Fix for slow loading research tabs
        if (($('#js_researchAdvisorCurrResearchesArr li').length == 0) && (count < 15)) {
            SITR.Render.toast('Updating ... please wait');
            count++;
            setTimeout(function () {
                SITR.ikariam.parseResearchAdvisor(count)
            }, 500);
            return false;
        }
        if (count >= 15) {
            SITR.Render.toast('Update failed: Please re-click the research advisor');
            return false
        }
        this._Parent.db.AddLocalStr('researchpoints', $('li.points').text().split(':')[0]);
        $('#js_researchAdvisorCurrResearchesArr li').each(function () {
            var resID = (/[\?&]{1}researchId=([0-9]+)&?/i.exec(this.firstChild.href))[1];
            if (!isNaN(Number(resID))) {
                var level = this.textContent.match(/\((\d)\)/);
                var explored = $(this).hasClass('explored');
                SITR.db.globalData.research.topics[resID] = {
                    explored:(explored || level != null),
                    level   :(level == null) ?(explored?1:0): level[1] - 1
                };
                SITR.db.AddLocalStr('research_' + resID, this.firstChild.text)
            }
        });
        //pulled this number out of my *** as its about right and (i have 67 with futures) and its inconsequential for now
        if (Object.keys(SITR.db.globalData.research.topics).length > 58)
            SITR.db.globalData.research.lastUpdate = $.now();
        for (var cID in SITR.db.cities)
        SITR.db.cities[cID].updateResearch();
        SITR.Render.toast('Updated: ' + $('#tab_researchAdvisor').children(":first").text())
        
    },

    parseAcademy : function () {

        var city = this._Parent.db.cities[this._Parent.ikariam.CurrentCityId]
        var newVal = parseInt($('#js_academy_research_tooltip_basic_production').text());
        city.researchers = newVal;
        city.researchUpdated = $.now();

    },

    parseTownHall : function () {
        SITR.Render.toast('Updating Town Hall');
        var $cultBon = $('#js_TownHallSatisfactionOverviewCultureBoniTreatyBonusValue');
        var $priests = $('#js_TownHallPopulationGraphPriestCount');
        SITR.db.cities[SITR.ikariam.CurrentCityId].setValues({
            culturalGoods : $cultBon.length ? parseInt($cultBon.text()) / 50 : 0,
            priests : $priests.length ? parseInt($priests.text()) : 0});
        $cultBon = $priests = null;
        
    },

    parseTemple : function () {
        var $priests = $('#valuePriests');
        //SITR.log($priests.length);
        SITR.db.cities[SITR.ikariam.CurrentCityId].setValues({priests:parseInt(($priests.length ? $priests.text() : 0))});
        $priests = null;
    },

    parseMilitaryAdvisor : function () {
        var $rows = $('#js_MilitaryMovementsFleetMovementsTable tr[id]');
        var that = this;
        this._Parent.db.CleanUpFleetMovements(true);
        $rows.each(function () {
            var id = this.id;
            var mission = $('#' + id + 'MissionIcon').attr('class').split(' ').pop();
            if ($('#' + id).is('.own')) {
                var transport;
                switch(mission){
                    case 'transport':
                        transport = that.resTransportObject(); break;
                    case 'trade':
                        transport = that.resTransportObject(); break;
                    case 'deployarmy':
                        transport = that.troopTransportObject(); break;
                    case 'deployfleet':
                        transport = that.troopTransportObject(); break;
                    default: return false
                }

                transport.mission = mission;
                var tooltipDiv = $('#' + id + 'UnitDetails');
                transport.targetCityId = parseInt($('#' + id + 'TargetLink').attr('href').match(/cityId=(\d+)[&]?/)[1]);
                transport.originCityId = parseInt($('#' + id + 'OriginLink').attr('href').match(/cityId=(\d+)/)[1]);
                var arrTime = new Date();
                var regTime = $('#' + id + 'ArrivalTime').text();
                var day, hour, min, sec;
                var rDay = regTime.match(RegExp('(\\d+)' + SITR.db.LocalStr('day')));
                var rHour = regTime.match(RegExp('(\\d+)' + SITR.db.LocalStr('hour')));
                var rMin = regTime.match(RegExp('(\\d+)' + SITR.db.LocalStr('minute')));
                var rSec = regTime.match(RegExp('(\\d+)' + SITR.db.LocalStr('second')));

                day = (arrTime.getDate() + (rDay ? parseInt(rDay[1]) : 0));
                hour = (arrTime.getHours() + (rHour ? parseInt(rHour[1]) : 0));
                min = (arrTime.getMinutes() + (rMin ? parseInt(rMin[1]) : 0));
                sec = (arrTime.getSeconds() + (rSec ? parseInt(rSec[1]) : 0));

                arrTime.setDate(day);
                arrTime.setHours(hour);
                arrTime.setMinutes(min);
                arrTime.setSeconds(sec);

                if (mission == 'transport'){
                    tooltipDiv.children('div').each(function () {
                        if ($(this).is('.wood')) transport.wood += parseInt(this.textContent);
                        if ($(this).is('.wine')) transport.wine += parseInt(this.textContent);
                        if ($(this).is('.marble')) transport.marble += parseInt(this.textContent);
                        if ($(this).is('.glass'))transport.glass += parseInt(this.textContent);
                        if ($(this).is('.sulfur')) transport.sulfur += parseInt(this.textContent);
                    });

                    if ((that._Parent.db.cities[transport.originCityId]) && (that._Parent.db.cities[transport.targetCityId])) {
                        if (!$('#' + id + 'Mission').is('.arrow_right_green')) {
                            transport.loadedTime = arrTime.getTime();
                            arrTime.setMilliseconds(arrTime.getMilliseconds() + estimateTravelTime(that._Parent.db.cities[transport.originCityId].coordinates.match(/\d+/g), that._Parent.db.cities[transport.targetCityId].coordinates.match(/\d+/g)));
                        }
                    }
                } else if(mission == 'deployarmy' || mission == 'deployfleet')
                {
                    tooltipDiv.children('div').each(function () {
                        if (!$(this).is('.ship_transport')) transport.troops[SITR.ikariam.UnitNames(this.className.split(' ').pop())] = parseInt(this.textContent);
                        //console.log (this.className)
                    });
                }

                    if ($('#' + id + 'Mission').is('.arrow_left_green')) {
                        var tmp = transport.originCityId;
                        transport.originCityId = transport.targetCityId;
                        transport.targetCityId = tmp;
                    }

                transport.arrivalTime = arrTime.getTime(); // = now + time till arrival
                transport.id = parseInt(id.match(/(\d+)/g)[0]);
                //that._Parent.log(transport);
                that._Parent.db.AddFleetMovement(transport)
            }

            tooltipDiv = null;
        });
        this._Parent.Render.toast('Updated: ' + $('#js_MilitaryMovementsFleetMovements h3').text().split('/')[0]);

        $rows  = null;
    },

    parseCityMilitary : function () {

        var $elemA = $('#tabUnits > .contentBox01h td');
        var $elemS = $('#tabShips > .contentBox01h td');
        if (($elemA.length == 0) || ($elemS.length == 0)) {
            SITR.Render.toast('Failed: ' + $('#cityMilitary').children(":first").text());
            return false;
        }
        var city = this._Parent.db.cities[this.CurrentCityId];

        var cityArmy = [];
        cityArmy.push({id:301,count:parseInt($elemA[4].innerHTML)});
        cityArmy.push({id:302,count:parseInt($elemA[3].innerHTML)});
        cityArmy.push({id:303,count:parseInt($elemA[0].innerHTML)});
        cityArmy.push({id:304,count:parseInt($elemA[6].innerHTML)});
        cityArmy.push({id:305,count:parseInt($elemA[9].innerHTML)});
        cityArmy.push({id:306,count:parseInt($elemA[8].innerHTML)});
        cityArmy.push({id:307,count:parseInt($elemA[7].innerHTML)});
        cityArmy.push({id:308,count:parseInt($elemA[1].innerHTML)});
        cityArmy.push({id:309,count:parseInt($elemA[11].innerHTML)});
        cityArmy.push({id:310,count:parseInt($elemA[12].innerHTML)});
        cityArmy.push({id:311,count:parseInt($elemA[13].innerHTML)});
        cityArmy.push({id:312,count:parseInt($elemA[10].innerHTML)});
        cityArmy.push({id:313,count:parseInt($elemA[5].innerHTML)});
        cityArmy.push({id:315,count:parseInt($elemA[2].innerHTML)});

        cityArmy.push({id:210,count:parseInt($elemS[2].innerHTML)});
        cityArmy.push({id:211,count:parseInt($elemS[0].innerHTML)});
        cityArmy.push({id:212,count:parseInt($elemS[7].innerHTML)});
        cityArmy.push({id:213,count:parseInt($elemS[4].innerHTML)});
        cityArmy.push({id:214,count:parseInt($elemS[3].innerHTML)});
        cityArmy.push({id:215,count:parseInt($elemS[5].innerHTML)});
        cityArmy.push({id:216,count:parseInt($elemS[1].innerHTML)});
        cityArmy.push({id:217,count:parseInt($elemS[6].innerHTML)});
        cityArmy.push({id:218,count:parseInt($elemS[8].innerHTML)});
        cityArmy.push({id:219,count:parseInt($elemS[9].innerHTML)});
        cityArmy.push({id:220,count:parseInt($elemS[10].innerHTML)});

        var i = cityArmy.length;
        while(i){
            i--
            if (isNaN(cityArmy[i].count)) cityArmy[i].count =0;
        }
        city.army = cityArmy;

        SITR.Render.toast('Updated: ' + $('#cityMilitary').children(":first").text());
        
        $elemA = $elemS = null;
        return true;
    },

    parseMilitaryLocalization : function () {

        var $elemA = $('#tabUnits > .contentBox01h th');
        var $elemS = $('#tabShips > .contentBox01h th');

        if (($elemA.length == 0) || ($elemS.length == 0)) return false;

        this._Parent.db.AddLocalStr('phalanx', $elemA[0].getAttribute('title'));
        this._Parent.db.AddLocalStr('steamgiant', $elemA[1].getAttribute('title'));
        this._Parent.db.AddLocalStr('spearman', $elemA[2].getAttribute('title'));
        this._Parent.db.AddLocalStr('swordsman', $elemA[3].getAttribute('title'));
        this._Parent.db.AddLocalStr('slinger', $elemA[4].getAttribute('title'));
        this._Parent.db.AddLocalStr('archer', $elemA[5].getAttribute('title'));
        this._Parent.db.AddLocalStr('marksman', $elemA[6].getAttribute('title'));
        this._Parent.db.AddLocalStr('ram', $elemA[7].getAttribute('title'));
        this._Parent.db.AddLocalStr('catapult', $elemA[8].getAttribute('title'));
        this._Parent.db.AddLocalStr('mortar', $elemA[9].getAttribute('title'));
        this._Parent.db.AddLocalStr('gyrocopter', $elemA[10].getAttribute('title'));
        this._Parent.db.AddLocalStr('bombardier', $elemA[11].getAttribute('title'));
        this._Parent.db.AddLocalStr('cook', $elemA[12].getAttribute('title'));
        this._Parent.db.AddLocalStr('medic', $elemA[13].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_ram', $elemS[2].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_flamethrower', $elemS[0].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_steamboat', $elemS[1].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_ballista', $elemS[4].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_catapult', $elemS[3].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_mortar', $elemS[5].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_submarine', $elemS[7].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_paddlespeedship', $elemS[8].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_ballooncarrier', $elemS[9].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_tender', $elemS[10].getAttribute('title'));
        this._Parent.db.AddLocalStr('ship_rocketship', $elemS[6].getAttribute('title'));
        $elemA = $elemS = null
    },

    FetchAllBuildings : function () {

        var city = this._Parent.db.cities[this.CurrentCityId];
        delete city.buildings;
        var buildings = {};

        var $buildings = $('#locations .building, #position13.lockedPosition');
        for (var i = 0; i < $buildings.length; i++) {
            var $building = $('#position' + i);
            var level, link , name;
            //Fix for no 13th building spot
            if (i == 13) if ($building.find('a').attr('href') == 'javascript:void(0);') continue;

            var bdgHref = $building.find('a').attr('href').match(/view=(.*)&cityId.[0-9]+&position=([0-9]+)/); //+pos
            link = bdgHref[0];
            name = bdgHref[1];

            if (name == 'buildingGround') continue;
            level = parseInt($building.find('a').attr('title').match(/\s[0-9]+/)); //Get level from tooltip

            if ((level != undefined) && (name != undefined) && (link != undefined)) {
                level = isNaN(level) ? 0 : level;
                SITR.db.AddLocalStr(name, $building.find('a').attr('title').split(SITR.db.LocalStr('level'))[0]);
                if ((buildings[name] == null) || (buildings[name] == undefined)) {//Add new building
                    buildings[name] = {
                        level   :level,
                        link    :link,
                        position:i,
                        levels  :{}
                    };
                    buildings[name].levels[i] = level
                } else //Update
                {   //no need to check it create or update.
                    buildings[name].levels[i] = level;
                    buildings[name].level = 0;
                    for (var iPos in buildings[name].levels) {
                        buildings[name].level += buildings[name].levels[iPos];
                    }
                }
            } else {
                SITR.log('Urm...error parsing a building!');
            }

                city.wineConsumption = (buildings['vineyard'] != undefined) ? city.baseWineConsumption * ((100 - buildings['vineyard'].level) / 100) : city.baseWineConsumption;
            $building = null
        }
        city.buildings = buildings;
        $buildings = $building = buildings = null
    },

    FetchAllTowns : function () {
        var _relatedCityData = unsafeWindow.ikariam.model.relatedCityData; // store for reuse?
        var _cityId = null;
        if (_relatedCityData) {
            for (_cityId in _relatedCityData) {
                if (_cityId != 'selectedCity' && _cityId != 'additionalInfo') {
                    if (this._Parent.db.cities[_relatedCityData[_cityId]['id']] == undefined) {
                        this._Parent.db.cities[_relatedCityData[_cityId]['id']] = this._Parent.db.addCity();
                        this._Parent.db.cities[_relatedCityData[_cityId]['id']].id = _relatedCityData[_cityId]['id'];

                        this._Parent.db.cities[_relatedCityData[_cityId]['id']].tradeGood = parseInt(_relatedCityData[_cityId]['tradegood']);
                        this._Parent.db.cities[_relatedCityData[_cityId]['id']].isOwn = (_relatedCityData[_cityId]['relationship'] == 'ownCity');
                    }
                    this._Parent.db.cities[_relatedCityData[_cityId]['id']].name = _relatedCityData[_cityId]['name'];
                    this._Parent.db.cities[_relatedCityData[_cityId]['id']].coordinates = _relatedCityData[_cityId]['coords'];
                }
            }
            //remove deleted cities
            for (var cID in this._Parent.db.cities) {
                var ghost = true;
                for (_cityId in _relatedCityData) {
                    if (_relatedCityData[_cityId]['id'] == cID) ghost = false;
                }

                if (ghost) delete this._Parent.db.cities[cID]
            }
        }

    },

    FetchItAll : function (b) {
        b = b || false;
        //console.time('Fetch it all')
        this.FetchAllTowns();
        //remove cities that arent your own from the DB
        this.OccupiedCitiesRemoveTEMP();
        this._Parent.db.CleanUpFleetMovements();
        this.FetchCurrentCityData(b);
        //console.timeEnd('Fetch it all')
    },

    OccupiedCitiesRemoveTEMP : function () {
        for (var cID in this._Parent.db.cities) {
            if (!(this._Parent.db.cities[cID].isOwn)) delete this._Parent.db.cities[cID]

        }
    },

    RestoreTemplateBox : function (military) {
        var city = this._Parent.db.cities[this.CurrentCityId];
        switch (this._Parent.db.options.restoreRes) {
            case -1:
                break;
            case 1:
                SITR.Render.AddIslandCSS();
                location.href = 'javascript:void(ajaxHandlerCall('+JSON.stringify("?view=resource&type=resource&islandId=" + city.islandID)+'));';
                break;
            case 2:
                SITR.Render.AddIslandCSS();
                location.href = 'javascript:void(ajaxHandlerCall('+JSON.stringify("?view=tradegood&type=" + city.tradeGood + "&islandId=" + city.islandID)+'));';
                break;
            default:
                break;
        }
        if (this._Parent.db.options.restoreRes == -1)
            if (this._Parent.db.options.openBuilding != -1) $('#js_CityPosition' + this._Parent.db.options.openBuilding + 'Link').click();
        else if (military) location.href = 'javascript:void(ajaxHandlerCall('+JSON.stringify('?view=cityMilitary&cityId='+this.CurrentCityId)+'));'
        this._Parent.db.options.restoreRes = -1;
        this._Parent.db.options.openBuilding = -1;
    },

    FetchCurrentCityData : function (b) {
        try{
        if (!(/.*view=island.*/.test(window.location.href) || /.*view=worldmap_iso.*/.test(window.location.href)))
        this.FetchAllBuildings();

        var model = unsafeWindow.ikariam.model;
        if (!model){console.log('SITR:Model is null'); return false;}
        if (!model.relatedCityData){console.log('SITR:model.relatedCityData is null'); return false;}
        var cID = model.relatedCityData[model.relatedCityData.selectedCity]['id'];

        var city = this._Parent.db.cities[cID];

        // fix for displaying ally/occupied cities
        if (!(model.isOwnCity)) {
            return false;
        }
        if (city == undefined)//Should NEVER be undefined unless its not your city due to fetching related cities before this
        {
            this._Parent.db.cities[cID] = this._Parent.db.addCity();
        }

        city.id = cID;
        city.wood = model.currentResources['resource'];
        city.wine = model.currentResources[1];
        city.marble = model.currentResources[2];
        city.sulfur = model.currentResources[4];
        city.glass = model.currentResources[3];
        city.knownTime = $.now();
        city.woodProd = model.resourceProduction;  // Prod per SEC
        city.tradeProd = model.tradegoodProduction; // float
        //SITR.log(city.tradeProd);
        //SITR.log(city.tradeGood);
        //SITR.log(city.woodProd);
        city.maxCapacity = model.maxResources['resource'];

        if ($.inArray(model.wineSpendings, this._Parent.db._TavernWineUsage) >-1)
            city.baseWineConsumption = model.wineSpendings; else
            city.baseWineConsumption = Math.round(model.wineSpendings / ((100 - (city.buildings['vineyard']?city.buildings['vineyard'].level:0)) / 100));

            city.wineConsumption = (city.buildings['vineyard'] != undefined) ? city.baseWineConsumption * ((100 - city.buildings['vineyard'].level) / 100) : city.baseWineConsumption;

        city.actions = parseInt($('#js_GlobalMenu_maxActionPoints').text());
        SITR.db.AddLocalStr('ActionPoints', $('#js_GlobalMenu_maxActionPoints').attr('title'));
        city.islandID = $("#js_islandBread").attr("href").match(/islandId=([^&]+)/)[1];
        city.tradeWood = model.branchOfficeResources["resource"];
        city.tradeWine = model.branchOfficeResources[1];
        city.tradeMarble = model.branchOfficeResources[2];
        city.tradeGlass = model.branchOfficeResources[3];
        city.tradeSulfur = model.branchOfficeResources[4];
        city.population = model.currentResources['population'];
        city.citizens = model.currentResources['citizens'];
        if ($('.constructionSite').length > 0) {
            city.underConstructionName = 'SOMETHING IS BUILDING!'; // TODO: Parse the building
            city.underConstructionPosition = $('.constructionSite > a').attr('href').match(/position=([0-9]+)/)[1];
            //unsafeWindow.ikariam.backgroundView.screen.buildingCountdown.enddate
            city.underConstructionTime = unsafeWindow.ikariam.backgroundView.screen.buildingCountdown.enddate;
        } else {
            city.underConstructionName = '';
            city.underConstructionPosition = -1;
            city.underConstructionTime = 0;
        }
        this._Parent.db.AddLocalStr('cities', $('#js_GlobalMenu_cities > span').text());
        }
        catch(e)
        {
            SITR.log('----------')
            SITR.log(e.stack)
            SITR.log(e.name + " from FetchCurrentCityData():" + e.message)
            SITR.log('----------')
        }
        finally
        {
            city = model = null
        }
    },

    checkForChange: function (count, cID, cChange, vChange, cChk) {
        try{

        count = count || 0;
        var that = this;
        cChange = (cChange != undefined ? cChange : false);
        vChange = (vChange != undefined ? vChange : false);
        //SITR.log('city: '+this._currentCityId);
        //SITR.log(unsafeWindow.ikariam.templateView?unsafeWindow.ikariam.templateView.id:'null')
        //SITR.log(this._chkTemplate)
        cID = cID || this._chkCityId;
        this._chkCityId = this.CurrentCityId;
        // City changed
        if (cChk != this.CurrentCityId && cChk != undefined) return false
        if (cID != this.CurrentCityId && !cChange) {
            SITR.ikariam.FetchItAll();
            cChk = this.CurrentCityId;
            setTimeout(function(){SITR.Render.updateTables();},60);

            cChange = true;
        }
        //if (cChange && cID != this.CurrentCityId) return false;
        // View open
        //console.log(count+':'+this.CurrentTemplateView)
        //console.log(count+':'+this._chkTemplate)
        if (this.CurrentTemplateView != null && (!vChange || cChange)) {

            if (cChange && this._chkTemplate == 'cityMilitary')
            {

            } else
            if (this._chkTemplate != this.CurrentTemplateView)
            {
                //console.log(count+'|'+this.CurrentTemplateView)
                //console.log(count+'|'+this._chkTemplate)
                    this.parseViews(this.CurrentTemplateView);
                    vChange = true;
                    this._chkTemplate = this.CurrentTemplateView;
                    //SITR.log('parse')
            }
            else
            {   if (count > 5){
                this.parseViews(this.CurrentTemplateView);
                vChange = true;
                this._chkTemplate = this.CurrentTemplateView;
                //SITR.log('parse')
            }
            }
        }

        if ((!cChange && !vChange)||(cChange && !vChange))
            if (count < 10) {
                count++;
                setTimeout(function (){
                    that.checkForChange(count, cID, cChange, vChange, cChk);
                }, 100);
            }else
            if (cChange) SITR.ikariam.RestoreTemplateBox(this._chkTemplate == 'cityMilitary');
        if (cChange) SITR.ikariam.RestoreTemplateBox();
        }
        catch(e)
        {
            SITR.log('----------')
            SITR.log(e.stack)
            SITR.log(e.name + " from checkForChange():" + e.message)
            SITR.log('----------')
        }
    },

    get currentShips() {
        if (this.$freeTransporters == undefined)
            this.$freeTransporters = $('#js_GlobalMenu_freeTransporters');
        return parseInt(this.$freeTransporters.text())
    }
};

    SITR.ikariam.BuildingsList = function () {
    if (this._BuildingsList == null) {
        this._BuildingsList = {};
        this._BuildingsList['townHall'] = 'growth';
        this._BuildingsList['palace'] = 'growth';
        this._BuildingsList['palaceColony'] = 'growth';
        this._BuildingsList['tavern'] = 'growth';
        this._BuildingsList['museum'] = 'growth';
        this._BuildingsList['academy'] = 'research';
        this._BuildingsList['workshop'] = 'research';
        this._BuildingsList['temple'] = 'research';
        this._BuildingsList['embassy'] = 'diplomacy';
        this._BuildingsList['warehouse'] = 'trading';
        this._BuildingsList['dump'] = 'trading';
        this._BuildingsList['port'] = 'trading';
        this._BuildingsList['branchOffice'] = 'trading';
        this._BuildingsList['wall'] = 'military';
        this._BuildingsList['safehouse'] = 'military';
        this._BuildingsList['barracks'] = 'military';
        this._BuildingsList['shipyard'] = 'military';
        this._BuildingsList['forester'] = 'wood';
        this._BuildingsList['carpentering'] = 'wood';
        this._BuildingsList['winegrower'] = 'wine';
        this._BuildingsList['vineyard'] = 'wine';
        this._BuildingsList['stonemason'] = 'marble';
        this._BuildingsList['architect'] = 'marble';
        this._BuildingsList['glassblowing'] = 'glass';
        this._BuildingsList['optician'] = 'glass';
        this._BuildingsList['alchemist'] = 'sulfur';
        this._BuildingsList['fireworker'] = 'sulfur';
    }
    return this._BuildingsList;
};
SITR.ikariam.AlternateBuildingsList = function () {
    if (this._AltBuildingsList == null) {
        this._AltBuildingsList = {};
        this._AltBuildingsList['townHall'] = 'growth';
        this._AltBuildingsList['palace'] = 'growth';
        this._AltBuildingsList['palaceColony'] = 'growth';
        this._AltBuildingsList['tavern'] = 'growth';
        this._AltBuildingsList['museum'] = 'growth';

        this._AltBuildingsList['academy'] = 'research';
        this._AltBuildingsList['workshop'] = 'research';
        this._AltBuildingsList['temple'] = 'research';

        this._AltBuildingsList['embassy'] = 'diplomacy';

        this._AltBuildingsList['warehouse'] = 'trading';
        this._AltBuildingsList['dump'] = 'trading';
        this._AltBuildingsList['port'] = 'trading';
        this._AltBuildingsList['branchOffice'] = 'trading';

        this._AltBuildingsList['wall'] = 'military';
        this._AltBuildingsList['safehouse'] = 'military';
        this._AltBuildingsList['barracks'] = 'military';
        this._AltBuildingsList['shipyard'] = 'military';

        this._AltBuildingsList['forester'] = 'production';
        this._AltBuildingsList['winegrower'] = 'production';
        this._AltBuildingsList['stonemason'] = 'production';
        this._AltBuildingsList['glassblowing'] = 'production';
        this._AltBuildingsList['alchemist'] = 'production';

        this._AltBuildingsList['carpentering'] = 'reduction';
        this._AltBuildingsList['vineyard'] = 'reduction';
        this._AltBuildingsList['architect'] = 'reduction';
        this._AltBuildingsList['optician'] = 'reduction';
        this._AltBuildingsList['fireworker'] = 'reduction';
    }
    return this._AltBuildingsList;
};

SITR.ikariam.Get_BuildingUsage = function (buildingName) {
    var buildingUsage = '';
    if (this._Parent.db.options.altBuildingList)
        var orderedBuildings = this.AlternateBuildingsList(); else var orderedBuildings = this.BuildingsList();
    if (orderedBuildings[buildingName] != undefined) {
        var arrayClassNames = orderedBuildings[buildingName].split(' ');
        buildingUsage = arrayClassNames[0];
    }
    return buildingUsage;
};
SITR.ikariam.UnitBuildtime = function (barracksLevel,unitID, count){
    var unit = this._Units[unitID]
    var multiplier = (SITR.db.globalData.governmentType == 'demokratie'?(unit.type=='army'?1.05:1)
        :SITR.db.globalData.governmentType == 'diktatur'?0.98
        :SITR.db.globalData.governmentType == 'nomokratie'?1.05:1);
    return multiplier * unit.baseTime * Math.pow(0.95, barracksLevel - unit.minLevel) * count;
}
SITR.ikariam.Units = function () {
    function unitsObj(){

            // Army
            this[301]={name:'slinger',type:'army',position:'line1',minlevel:2,baseTime:90},
            this[302]={name:'swordsman',type:'army',position:'line1',minlevel:6,baseTime:180},
            this[303]={name:'phalanx',type:'army',position:'flank',minlevel:4,baseTime:300},
            this[304]={name:'marksman',type:'army',position:'flank',minlevel:13,baseTime:600},
            this[305]={name:'mortar',type:'army',position:'line2',minlevel:14,baseTime:2400},
            this[306]={name:'catapult',type:'army',position:'line2',minlevel:8,baseTime:1800},
            this[307]={name:'ram',type:'army',position:'artillery',minlevel:2,baseTime:600},
            this[308]={name:'steamgiant',type:'army',position:'artillery',minlevel:12,baseTime:900},
            this[309]={name:'bombardier',type:'army',position:'artillery',minlevel:11,baseTime:1800},
            this[310]={name:'cook',type:'army',position:'support',minlevel:5,baseTime:1200},
            this[311]={name:'medic',type:'army',position:'support',minlevel:9,baseTime:1200},
            this[312]={name:'gyrocopter',type:'army',position:'air',minlevel:10,baseTime:900},
            this[313]={name:'archer',type:'army',position:'air',minlevel:7,baseTime:240},
            this[315]={name:'spearman',type:'army',position:'air',minLevel:1,baseTime:60},
            //Fleet
            this[210]={name:'ship_ram',type:'fleet',position:'line1',minlevel:1,baseTime:2400},
            this[211]={name:'ship_flamethrower',type:'fleet',position:'line1',minlevel:4,baseTime:1800},
            this[212]={name:'ship_submarine',type:'fleet',position:'firststrike',minlevel:19,baseTime:3600},
            this[213]={name:'ship_ballista',type:'fleet',position:'line2',minlevel:3,baseTime:3000},
            this[214]={name:'ship_catapult',type:'fleet',position:'line2',minlevel:3,baseTime:3000},
            this[215]={name:'ship_mortar',type:'fleet',position:'line2',minlevel:17,baseTime:3000},
            this[216]={name:'ship_steamboat',type:'fleet',position:'line1',minlevel:15,baseTime:2400},

            this[217]={name:'ship_rocketship',type:'fleet',position:'firststrike',minlevel:11,baseTime:3600},
            this[218]={name:'ship_paddlespeedship',type:'fleet',position:'carrier',minlevel:13,baseTime:1800},
            this[219]={name:'ship_ballooncarrier',type:'fleet',position:'carrier',minlevel:7,baseTime:3900},
            this[220]={name:'ship_tender',type:'fleet',position:'support',minlevel:9,baseTime:2400}
    }

    if (this._Units == null) this._Units = new unitsObj();
    return this._Units;
};
SITR.ikariam.OrderedArmy = function(){
    function OrderedArmy(){
        var orderedArmy = []
    // Army
    orderedArmy.push({id:301,name:'slinger',type:'army',position:'line1',minlevel:2,baseTime:90});
    orderedArmy.push({id:302,name:'swordsman',type:'army',position:'line1',minlevel:6,baseTime:180});
    orderedArmy.push({id:303,name:'phalanx',type:'army',position:'flank',minlevel:4,baseTime:300});
    orderedArmy.push({id:304,name:'marksman',type:'army',position:'flank',minlevel:13,baseTime:600});
    orderedArmy.push({id:305,name:'mortar',type:'army',position:'line2',minlevel:14,baseTime:2400});
    orderedArmy.push({id:306,name:'catapult',type:'army',position:'line2',minlevel:8,baseTime:1800});
    orderedArmy.push({id:307,name:'ram',type:'army',position:'artillery',minlevel:2,baseTime:600});
    orderedArmy.push({id:308,name:'steamgiant',type:'army',position:'artillery',minlevel:12,baseTime:900});
    orderedArmy.push({id:309,name:'bombardier',type:'army',position:'artillery',minlevel:11,baseTime:1800});
    orderedArmy.push({id:310,name:'cook',type:'army',position:'support',minlevel:5,baseTime:1200});
    orderedArmy.push({id:311,name:'medic',type:'army',position:'support',minlevel:9,baseTime:1200});
    orderedArmy.push({id:312,name:'gyrocopter',type:'army',position:'air',minlevel:10,baseTime:900});
    orderedArmy.push({id:313,name:'archer',type:'army',position:'air',minlevel:7,baseTime:240});
    orderedArmy.push({id:315,name:'spearman',type:'army',position:'air',minLevel:1,baseTime:60});

    orderedArmy.push({id:210,name:'ship_ram',type:'fleet',position:'line1',minlevel:1,baseTime:2400});
    orderedArmy.push({id:211,name:'ship_flamethrower',type:'fleet',position:'line1',minlevel:4,baseTime:1800});
    orderedArmy.push({id:212,name:'ship_submarine',type:'fleet',position:'firststrike',minlevel:19,baseTime:3600});
    orderedArmy.push({id:213,name:'ship_ballista',type:'fleet',position:'line2',minlevel:3,baseTime:3000});
    orderedArmy.push({id:214,name:'ship_catapult',type:'fleet',position:'line2',minlevel:3,baseTime:3000});
    orderedArmy.push({id:215,name:'ship_mortar',type:'fleet',position:'line2',minlevel:17,baseTime:3000});
    orderedArmy.push({id:216,name:'ship_steamboat',type:'fleet',position:'line1',minlevel:15,baseTime:2400});

    orderedArmy.push({id:217,name:'ship_rocketship',type:'fleet',position:'firststrike',minlevel:11,baseTime:3600});
    orderedArmy.push({id:218,name:'ship_paddlespeedship',type:'fleet',position:'carrier',minlevel:13,baseTime:1800});
    orderedArmy.push({id:219,name:'ship_ballooncarrier',type:'fleet',position:'carrier',minlevel:7,baseTime:3900});
    orderedArmy.push({id:220,name:'ship_tender',type:'fleet',position:'support',minlevel:9,baseTime:2400});
    return orderedArmy
    }
    if (this._OrderedUnits == null) this._OrderedUnits = OrderedArmy();
    return this._OrderedUnits;
}

SITR.ikariam.UnitNames = function (name) {
    if (this._UnitsByName == null) {
        this._UnitsByName = {};
        // Army
        this._UnitsByName['slinger'] = 301;
        this._UnitsByName['swordsman'] = 302;
        this._UnitsByName['phalanx'] = 303;
        this._UnitsByName['marksman'] = 304;
        this._UnitsByName['mortar'] = 305;
        this._UnitsByName['catapult'] = 306;
        this._UnitsByName['ram'] = 307;
        this._UnitsByName['steamgiant'] = 308;
        this._UnitsByName['bombardier'] = 309;
        this._UnitsByName['cook'] = 310;
        this._UnitsByName['medic'] = 311;
        this._UnitsByName['gyrocopter'] = 312;
        this._UnitsByName['archer'] = 313;
        this._UnitsByName['spearman'] = 315;
        // Fleet
        this._UnitsByName['ship_ram'] = 210;
        this._UnitsByName['ship_flamethrower'] = 211;
        this._UnitsByName['ship_submarine'] = 212;
        this._UnitsByName['ship_ballista'] = 213;
        this._UnitsByName['ship_catapult'] = 214;
        this._UnitsByName['ship_mortar'] = 215;
        this._UnitsByName['ship_steamboat'] = 216;
        // v.0.4.x new units
        this._UnitsByName['ship_rocketship'] = 217;
        this._UnitsByName['ship_paddlespeedship'] = 218;
        this._UnitsByName['ship_ballooncarrier'] = 219;
        this._UnitsByName['ship_tender'] = 220;
    }
    if (name) return this._UnitsByName[name]
    return this._UnitsByName;
};

function City_Object() {
    this.id = 0;
    this.name = '';
    this.wood = 0;
    this.wine = 0;
    this.glass = 0;
    this.sulfur = 0;
    this.marble = 0;
    this.woodProd = 0;
    this.tradeProd = 0;
    this.tradeGood = 0;
    this.knownTime = $.now();
    this.buildings = {};
    this.maxCapacity = 0;
    this.wineConsumption = 0;
    this.actions = 0;
    this.coordinates = '';
    this.islandID = null;
    this.tradeWood = 0;
    this.tradeWine = 0;
    this.tradeMarble = 0;
    this.tradeGlass = 0;
    this.tradeSulfur = 0;
    this.underConstructionName = '';
    this.underConstructionPosition = '';
    this.underConstructionTime = '';
    this.population = 0;
    this.citizens = 0;
    this.researchers = 0;
    this.researchUpdated = 0;
    this.goldIncome = 0;
    this.goldExpend = 0;
    this.culturalGoods = 0;
    this.priests = 0;
    this.army = [];
    this.fleetMovements = {};
    this.militaryMovements = {};
    this.unitBuildList = [];
}
City_Object.prototype = {
    get _DB() {
        return SITR.db
    },
    get research() {
                var researchBonus = 1;
        researchBonus += (this._DB.globalData.governmentType == 'technokratie') ? 0.05 : 0;
        researchBonus += (this._DB.hasResearchedLevel(3020)) ? 0.02 : 0;
        researchBonus += (this._DB.hasResearchedLevel(3050)) ? 0.04 : 0;
        researchBonus += (this._DB.hasResearchedLevel(3090)) ? 0.08 : 0;
        researchBonus += (this._DB.hasResearchedLevel(3999)) ? (0.02 * this._DB.hasResearchedLevel(3999)) : 0;
        if (this._DB.globalData.governmentType == 'technokratie')
            researchBonus += 0.05
        else if (this._DB.globalData.governmentType == 'theokratie')
            researchBonus -= 0.05
        return this.researchers * researchBonus;
    },
    get currentWood() {
        return this.currentResource('wood')
    },
    get currentWine() {
        return this.currentResource('wine')
    },
    get currentMarble() {
        return this.currentResource('marble')
    },
    get currentGlass() {
        return this.currentResource('glass')
    },
    get currentSulfur() {
        return this.currentResource('sulfur')
    },
    currentResWithMovement: function (resource) {
        var inc = this._DB.getIncomingMovementTotals(this.id);
        var a = {};
        for (var res in inc)
            a[res] = this.currentResource(res) + inc[res];
        if (resource) return a[resource];
        return a;
    },
    currentResWithArrivedMovements : function (resource){
        var inc = this._DB.getArrivedMovementTotals(this.id);
        var a = {};
        for (var res in inc)
            a[res] = this.currentResource(res) + inc[res];
        if (resource) return a[resource];
        return a;
    },
    currentResAll         : function () {
        var a = {wood: 0, wine: 0, marble: 0, glass: 0, sulfur: 0};
        for (var res in a)
            a[res] = this.currentResource(res);
        return a;
    },
    get maxPopulation() {
        var mPop = 0;
        if (this.buildings['townHall'] != undefined)
            mPop = Math.floor((10 * Math.pow(this.buildings['townHall'].level, 1.5))) * 2 + 40;
        // Government bonus
        if (this._DB.hasResearchedLevel(3010) && this.buildings['palace'] != undefined) {
            mPop += 50;
        }
        if (this._DB.hasResearchedLevel(2120) && this.buildings['palace'] != undefined) {
            mPop += 200
        }
        if (this._DB.hasResearchedLevel(2080))
            mPop += 50;
        mPop += this._DB.hasResearchedLevel(2999) * 20;
        return mPop;
    },

    get availableBuildings() {
        var i = 16; //Max building count pre-research
        for (var typeID in this.buildings) {
            for (var position in this.buildings[typeID].levels) {
                i--
            }
        } //dec per building
        if (this._DB.hasResearchedLevel(2110)) i++; //bureaucracy
        return (i <= 0) ? '' : i;
    },

    get maxSafeCapacity() {
        return ((this.buildings['warehouse']) ? this.buildings['warehouse'].level * 480 : 0) + 100;
        //TODO: Premium storage safety;
    },
    get satisfaction() {
        var museum = (this.buildings['museum'] != undefined ? this.buildings['museum'].level * 20 : 0) + (this.culturalGoods > 0 ? this.culturalGoods * 50 : 0);
        var gov = this._DB.globalData.governmentType == 'demokratie' ? 75 : this._DB.globalData.governmentType == 'diktatur' ? -75 : (this._DB.globalData.governmentType == 'theokratie' && this.buildings['temple'] == undefined) ? -20 : 0;

        var tavern = 0;
        if (this.buildings['tavern']) {
            tavern += this.buildings['tavern'].level * 12;
            for (var i = 0; i < this._DB._TavernWineUsage.length; i++) {
                if (this._DB._TavernWineUsage[i] == this.baseWineConsumption) {
                    tavern += 60 * i;
                    break
                }
            }
        }

        var research = (25 * this._DB.hasResearchedLevel(2080)) + (this._DB.hasResearchedLevel(2999) * 10) + (this.buildings['palace'] ? 50 * this._DB.hasResearchedLevel(3010) : 0) + (this.buildings['palace'] ? 200 * this._DB.hasResearchedLevel(2120) : 0);

        var priestBon = 0;
        if (this._DB.globalData.governmentType == 'theokratie')
            if (this.priests) {
                priestBon = ((this.priests * 5) / this.maxPopulation * 10000) / 50;
                priestBon = (priestBon <= 150 ? priestBon : 150);
            }
        return 196 + gov + research + tavern + museum + priestBon
    },
    setValues      : function (objVals) {
        return $.extend(true, this, objVals);
    },
    populationData : function () {
        var corruption = 0;
        var plus = this.satisfaction;
        var maxPopulation = this.maxPopulation;
        var govLevel = this.buildings['palaceColony'] != undefined ? this.buildings['palaceColony'].level : this.buildings['palace'] != undefined ? this.buildings['palace'].level : 0;

        corruption += (1 - (govLevel + 1) / (Object.keys(this._DB.cities).length)) + ((this._DB.globalData.governmentType == 'aristokratie' || this._DB.globalData.governmentType == 'oligarchie') ? 0.03 : this._DB.globalData.governmentType == 'anarchie' ? 0.25 : 0);
        corruption = (corruption < 0) ? 0 : corruption;

        var happiness = (1 - corruption) * plus - this.population;
        var hours = (($.now() - this.knownTime) / 3600000);
        var pop = this.population + happiness * (1 - Math.pow(Math.E, -(hours / 50)));
        pop = (pop > maxPopulation) ? maxPopulation : pop;
        happiness = (1 - corruption) * plus - pop;
        return {currentPop: pop, maxPop: maxPopulation, satisfaction: plus, happiness: happiness, growth: happiness * 0.02}
    },
    currentResource: function (res) {
        var ret = 0;
        if (res == 'wood') {
            ret = this[res] + ((($.now() - this.knownTime) / 1000) * this.woodProd);
        } else {
            ret = this[res] + ((($.now() - this.knownTime) / 1000) * ((res == tradeGoodFromID(this.tradeGood)) ? this.tradeProd : 0));
        }
        if (res == 'wine')
            ret = ret - ((($.now() - $.now() % 3600000) - (this.knownTime - this.knownTime % 3600000)) / 3600000 * this.wineConsumption);
        return ret
    },
    updateResearch : function(){

        if (this._DB.globalData.finance.lastUpdated >= this.researchUpdated){

            var researchCostMod = 6;
            researchCostMod -= (this._DB.globalData.governmentType == 'technokratie') ? -1 : 0;
            researchCostMod -= (this._DB.hasResearchedLevel(3110)) ? 3 : 0;

            this.researchers = ((this.goldExpend * -1) / researchCostMod);
        }

    },
    processUnitBuildList: function(){
        var newList = [];
        for (var i = 0; i < this.unitBuildList.length; i++)
        {
            var list = this.unitBuildList[i]
            if (list.completionTime <= $.now()) {
                for (var uID in list.units)
                    var j = this.army.length;
                while (j){
                    j--
                    if (uID == this.army[j].id)
                        this.army[uID] += list.units[uID]
                }
            }
            else newList.push(list);
        }
        this.unitBuildList = newList;
    },
    clearUnitBuildList: function(type){
        if (type)
        {
            var newList = []
            for (var i = 0; i < this.unitBuildList.length; i++)
            {
                if (this.unitBuildList[i].type != type)
                    newList.push(this.unitBuildList[i]);
            }
        }
        this.unitBuildList = newList;
    },
    getUnitBuildsByUnit : function(){
        var ret = {}
        for (var i = 0; i < this.unitBuildList.length; i++)
            for (var uID in this.unitBuildList[i].units)
            {
                ret[uID] = ret[uID] || [];
                ret[uID].push({
                    count:this.unitBuildList[i].units[uID],
                    completionTime:this.unitBuildList[i].completionTime})
            }
        return ret;
    },
    getUnitTransportsByUnit : function(){
        var ret = {}
        var data = this._DB.globalData.militaryMovements[this.id]
        if (data)
        for (var row in data)
        for (var uID in data[row].troops)
            {
                ret[uID] = ret[uID] || [];
                ret[uID].push({
                    count:data[row].troops[uID],
                    arrivalTime:data[row].arrivalTime,
                    origin: data[row].originCityId})
            }
        return ret;
    }





};

/***********************************************************************************************************************
 *
 * General Util functions
 *
 **********************************************************************************************************************/

SITR.arrTimers = [];

function setMyInterval(a,b){
    //console.log('interval set:'+b);
    return SITR.arrTimers[SITR.arrTimers.push(setInterval(a,b))-1]
}

function clearMyInterval(a){
    SITR.arrTimers.splice(SITR.arrTimers.indexOf(a),1);
    return clearInterval(a)
}

function estimateTravelTime(city1, city2) {
    if (city1[0] == city2[0] && city1[1] == city2[1]) {
        var time = 1200 / 60 * 0.5;
    } else {
        time = 1200 / 60 * (Math.sqrt(Math.pow((city2[0] - city1[0]), 2) + Math.pow((city2[1] - city1[1]), 2)));
    }
    return time * 60 * 1000
}

function FormatNumToStr(iStr, addSign, precision) {
    precision = (isNaN(precision) ? 1 : precision);
    precision = '10e' + (precision - 1);
    var nStr = iStr;
    //SITR.log(nStr);
    var tho = SITR.db.LocalStr('thousandSeperator');
    var dec = SITR.db.LocalStr('decimalPoint');
    //if ((isNaN(nStr))) nStr = nStr.replace(SITR.db.LocalStr('thousandSeperator'), '');
    if (isNaN(nStr)) return iStr;
    if (!(isFinite(nStr))) return '\u221E';
    nStr = Math.floor(nStr * precision) / precision;
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? dec + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + tho + '$2');
    return addSign ? nStr >= 0 ? '+' + x1 + x2 : x1 + x2 : nStr >= 0 ? x1 + x2 : x1.split('-')[1] + x2;
}
FormatTimeLengthToStr = function (timeString, precision, spacer) {
    timeString = timeString || 0;
    precision = precision || 2;
    spacer = spacer || " ";
    if (!isFinite(timeString)) return ' \u221E ';
    var factors = [];
    var locStr = [];
    factors.day = 86400;
    factors.hour = 3600;
    factors.minute = 60;
    factors.second = 1;
    locStr.day = SITR.db.LocalStr('day');
    locStr.hour = SITR.db.LocalStr('hour');
    locStr.minute = SITR.db.LocalStr('minute');
    locStr.second = SITR.db.LocalStr('second');
    timeString = Math.ceil(timeString / 1000);
    var retString = "";
    for (var fact in factors) {
        var timeInSecs = Math.floor(timeString / factors[fact]);
        if (isNaN(timeInSecs)) {
            return retString;
        }
        if (precision > 0 && (timeInSecs > 0 || retString != "")) {
            timeString = timeString - timeInSecs * factors[fact];
            if (retString != "") {
                retString += spacer;
            }
            retString += timeInSecs + locStr[fact];
            precision--;
        }
    }
    return retString;
};
FormatFullTimeToDateString = function(timeString, precise){
    precise = precise || true
    timeString = timeString || 0;
    sInDay = 86400000;

    var day = '';
    var compDate = new Date(timeString);
    if (precise)
    switch(Math.floor(compDate.getTime()/sInDay) -  Math.floor($.now()/sInDay))
    {
        case 0  : day = SITR.db.LocalStr('Today'); break;
        case 1  : day = SITR.db.LocalStr('Tomorrow'); break;
        case -1 : day = SITR.db.LocalStr('Yesterday'); break;
        default : day = (!isChrome?compDate.toLocaleFormat('%a %d %b'):compDate.toString().split(' ').splice(0,5).join(' '))
    }
    if (day != '') day += ', '
    return day + compDate.toLocaleTimeString();

}


SITR.setVar = function(varname, varvalue) {
    GM_setValue(SITR.ikariam.Host() + varname, varvalue);
}
SITR.deleteVar = function (varname) {
    GM_deleteValue(SITR.ikariam.Host() + varname);
}
SITR.getVar = function(varname, vardefault) {
    var res = GM_getValue(SITR.ikariam.Host() + varname);
    if (res == undefined) {
        return vardefault;
    }
    return res;
}
function tradeGoodFromID(id) {
    return id == 1 ? 'wine' : id == 2 ? 'marble' : id == 3 ? 'glass' : id == 4 ? 'sulfur' : '';
}

function addStyleSheet(style) {
    var getHead = document.getElementsByTagName("HEAD")[0];
    var cssNode = window.document.createElement('style');
    var elementStyle = getHead.appendChild(cssNode);
    elementStyle.innerHTML = style;
    return elementStyle;
}

function fA() {
    var d = document.getElementById('SITR_Tabs').children[0];
    for (var i = 0; i < d.children.length; i++) {
        d.children[i].children[0].updated = true;
    }
}
function injScr(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

/***********************************************************************************************************************
 *
 * Main
 *
 **********************************************************************************************************************/

$(function () {

    //TODO: Stuff that needs to load AFTER the full page load
    //if (chrome && /.*view=island.*/.test(window.location.href)) return false;
    //if (chrome && /.*view=worldmap_iso.*/.test(window.location.href)) return false;

    initBoard();

    function initBoard(){
        if (!unsafeWindow.ikariam || !unsafeWindow.ikariam.model || !unsafeWindow.ikariam.model.relatedCityData){
            setTimeout(function(){initBoard()},1000);
            //console.log('Waiting for Ikariam');
            return false;
        }
        SITR.Init();
        if (!SITR.db.options.showOnIslandView && /.*view=island.*/.test(window.location.href)) return false;
        if (!SITR.db.options.showOnWorldView && /.*view=worldmap_iso.*/.test(window.location.href)) return false;
        GM_registerMenuCommand(SITR.scriptName + ' - Manual Update', function () {
            SITR.CheckForUpdates(true);
        });
        SITR.CheckForUpdates(false);

        unsafeWindow.ikariam.controller.doReplaceButtons = unsafeWindow.ikariam.controller.replaceButtons;
        unsafeWindow.ikariam.controller.replaceButtons = function () {
            injScr(fA);
            unsafeWindow.ikariam.controller.doReplaceButtons();
        };

        unsafeWindow.ikariam.getScreen().doUpdate = unsafeWindow.ikariam.getScreen().update;
        unsafeWindow.ikariam.getScreen().update = function (A) {
            SITR.ikariam.FetchItAll();
            unsafeWindow.ikariam.getScreen().doUpdate(A);
            SITR.ikariam.checkForChange()
        };
        if (unsafeWindow.ikariam.templateView) SITR.ikariam.parseViews(unsafeWindow.ikariam.templateView.id);
        if (debug) delete unsafeWindow.console;
        SITR.ikariam.FetchItAll(true);
        SITR.Render.DrawItAll();
        SITR.ikariam.RestoreTemplateBox();
        SITR.db.Save();
        SITR.loaded = true;
        SITR.db.OldVersion();
        return true;
        $(window).on("beforeunload", function () {
            setTimeout(function () {
                SITR.ikariam.FetchCurrentCityData(false);
                SITR.db.Save();
            }, 0);
        });
    }

}, false);


if (uws) {
    unsafeWindow.SITR = SITR;
    unsafeWindow.$ = $;
}