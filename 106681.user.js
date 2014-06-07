// ==UserScript==
// @id             google_hover_zoom
// @name           Google+ Hover Zoom
// @description    Enlarge thumbnails & profile icons on mouse hover. Display pictures in comments directly. Download albums quickly.
// @author         SkyArrow
// @website        http://userscripts.org/scripts/show/106681
// @namespace      http://zespia.tw
// @version        1.8.1
// @license        MIT License
// @include        https://plus.google.com/*
// @exclude        https://plus.google.com/ripples/*
// ==/UserScript==

/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);

/**
 * jQuery Masonry v2.1.05
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var g=this;setTimeout(function(){g.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){g.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d){f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);

var version = '1.8.1',
	developer = false,
	picRegex = /.(jpg|jpeg|gif|bmp|png|tiff)/i,
	picasaRegex = /\/\w\d+(-\w\d*)*\/([^\/]+)$/,
	gcRegex = /googleusercontent.com/,
	mouse = [],
	$content = $('#content');

// Options
var options = {
	hz_delay: parseInt(localStorage.hz_delay) || 500,
	hz_opacity: parseInt(localStorage.hz_opacity) || 100,
	hz_maxwidth: parseInt(localStorage.hz_maxwidth) || 0,
	hz_download: localStorage.hz_download || 'false',
	hz_his: localStorage.hz_his || 'false',
	hz_his_max: parseInt(localStorage.hz_his_max) || 100,
	hz_trigger: parseInt(localStorage.hz_trigger) || 0,
	hz_direct: localStorage.hz_direct || 'true',
	hz_direct_max: parseInt(localStorage.hz_direct_max) || 0,
	hz_resolution: localStorage.hz_resolution || 'false',
	hz_fullscreen: parseInt(localStorage.hz_fullscreen) || 0,
	hz_dl_key: parseInt(localStorage.hz_dl_key) || 0,
	hz_shortcut: localStorage.hz_shortcut || 'false',
	hz_album: localStorage.hz_album || 'true',
	hz_direct_yt: localStorage.hz_direct_yt || 'false',
	hz_direct_ytaspect: parseInt(localStorage.hz_direct_ytaspect) || 2,
	hz_direct_ytmaxwidth: parseInt(localStorage.hz_direct_ytmaxwidth) || 0,
	hz_language: localStorage.hz_language || navigator.language,
	hz_his_columns: parseInt(localStorage.hz_his_columns) || 5,
	hz_enable_main: localStorage.hz_enable_main || 'true',
	hz_enable_icon: localStorage.hz_enable_icon || 'true',
	hz_enable_link: localStorage.hz_enable_link || 'true',
	hz_allpics: localStorage.hz_allpics || 'false',
	hz_update: localStorage.hz_update || 'true',
	hz_dl_link: localStorage.hz_dl_link || 'true',
	hz_maxpic: localStorage.hz_maxpic || 'false',
	hz_maxpic_option: localStorage.hz_maxpic_option || '1',
	hz_hovering: localStorage.hz_hovering || 'false',
	hz_direct_post: localStorage.hz_direct_post || 'false',
	hz_direct_post_max: parseInt(localStorage.hz_direct_post_max) || 0,
	hz_ytdl: localStorage.hz_ytdl || 'true',
	hz_iframedl: localStorage.hz_iframedl || 'false',
	hz_ecomode: localStorage.hz_ecomode || 'false',
	hz_dl_link_option: localStorage.hz_dl_link_option || '0'
};

// l10n
var locale = {
	'en-US': {
		menu01: 'Off',
		menu02: 'On',
		fs01: 'Press fullscreen mode trigger or click here to exit fullscreen mode.',
		fs03: 'Download',
		fs04: 'Loading…',
		fs06: 'Page Width',
		fs07: 'Actual Size (100%)',
		fs08: 'Fullscreen',
		fs09: 'Window Size',
		fs10: 'Prev (&larr; / Right-click)',
		fs11: 'Next (&rarr; / Left-click)',
		al01: 'Download Album',
		al03: 'Open with Picasa',
		al05: 'Copy Links',
		al06: 'Open in New Tab',
		al07: 'This album is private and can\'t be fetched. Please click "Open with Picasa" button to download this album.',
		yt01: 'Remove',
		allpic01: 'Batch Download',
		piclink01: 'Download Photos',
		piclink03: 'Select All',
		piclink04: 'Cancel select',
		ytdl01: 'Download Video',
		ytdl02: 'Low',
		ytdl03: 'Standard',
		ytdl04: 'Original',
		ytdl05: 'HD',
		ytdl06: 'Full HD',
		ytdl07: 'Connection Failed',
		ytdl08: 'Incompatible',
		ytdl09: 'Unknown Format',
		maxpic01: 'Zoom',
		update01: 'Update',
		update05: 'Check Update',
		update07: 'You\'re up to date!',
		update08: 'Error!',
		update09: 'Update check is not available in development version.',
		update11: 'New version',
		update12: 'is available!',
		update13: 'Checking for update...',
		update14: 'Retry',
		update15: 'Please refresh the page manually after update is complete.',
		his01: 'History',
		his02: 'Clear',
		his03: 'Are you sure to clear all records?',
		set01: 'Settings',
		set02: 'Save',
		set03: 'Reset',
		set04: 'Are you sure to reset all options?',
		set07: 'photo',
		set08: 'photos',
		set10: 'Close',
		set11: 'General',
		set12: 'Shortcuts',
		set13: 'Other',
		set14: 'Delay:',
		set15: 'ms',
		set16: 'Opacity:',
		set17: 'Max Width:',
		set18: 'px (0: Unlimited)',
		set19: 'Enable download button',
		set20: 'Enable history, max records:',
		set21: ', columns:',
		set22: '(0: Unlimited)',
		set23: 'Trigger:',
		set24: 'None',
		set25: 'Show photo links in comments directly, max width:',
		set26: 'Show Resolution',
		set27: 'Fullscreen:',
		set28: 'Download:',
		set31: 'Show shortcuts when hovered',
		set32: 'Enable album download',
		set33: 'Show Youtube links in comments directly, video aspect:',
		set34: ', max width:',
		set35: 'Language:',
		set36: 'Enable:',
		set37: 'Contents',
		set38: 'Profile Icon',
		set39: 'Links',
		set40: 'Enable batch download',
		set41: 'Enable auto update',
		set42: 'Display download links below pictures',
		set43: 'Resize photos to stream width',
		set44: 'Apply to all photos',
		set45: 'Only apply to the first photo in album',
		set46: 'Don\'t hide photo when hovered',
		set48: 'Show photo links in posts directly, max width:',
		set49: 'Enable Youtube video download',
		set50: 'Download directly without opening in new tab',
		set51: 'Enable Eco-mode',
		set52: 'Thumbnail list (New UI)',
		set53: 'Link list (Old UI)',
		set54: 'Download directly'
	},
	'zh-TW': {
		menu01: '關閉',
		menu02: '開啟',
		fs01: '輕按全螢幕觸發鍵，或點擊此處離開全螢幕模式。',
		fs03: '下載',
		fs04: '載入中…',
		fs06: '頁面寬度',
		fs07: '實際大小 (100%)',
		fs08: '全螢幕',
		fs09: '視窗大小',
		fs10: '上一張 (&larr; / 右鍵)',
		fs11: '下一張 (&rarr; / 左鍵)',
		al01: '相簿下載',
		al03: '以 Picasa 開啟',
		al05: '複製網址',
		al06: '開啟於新分頁',
		al07: '此相簿為私密相簿，無法取得相簿內容，請點擊右上角的「以 Picasa 開啟」按鈕下載此相簿。',
		yt01: '移除',
		allpic01: '批次下載',
		piclink01: '圖片下載',
		piclink03: '全選',
		piclink04: '取消選擇',
		ytdl01: '影片下載',
		ytdl02: '低畫質',
		ytdl03: '標準畫質',
		ytdl04: '原始畫質',
		ytdl05: 'HD',
		ytdl06: 'Full HD',
		ytdl07: '連接失敗',
		ytdl08: '不相容',
		ytdl09: '未知格式',
		maxpic01: '縮放',
		update01: '更新',
		update05: '檢查更新',
		update07: '您已更新至最新版本！',
		update08: '錯誤！',
		update09: '開發版本無法使用更新檢查功能。',
		update11: '更新版本',
		update12: '已發布！',
		update13: '正在檢查更新...',
		update14: '重試',
		update15: '請在更新完成後手動重新整理頁面。',
		his01: '記錄',
		his02: '清除',
		his03: '您確定要清除所有記錄嗎？',
		set01: '設定',
		set02: '儲存',
		set03: '重設',
		set04: '您確定要重設所有設定值嗎？',
		set07: '張相片',
		set08: '張相片',
		set10: '關閉',
		set11: '一般',
		set12: '快捷鍵',
		set13: '其它',
		set14: '延遲：',
		set15: '毫秒 (ms)',
		set16: '透明度：',
		set17: '最大寬度：',
		set18: 'px (0: 無限制)',
		set19: '啟用下載按鈕',
		set20: '啟用記錄，最大記錄數：',
		set21: '，直欄數：',
		set22: '(0: 無限制)',
		set23: '觸發鍵：',
		set24: '無',
		set25: '直接顯示留言內的圖片連結，最大寬度：',
		set26: '顯示圖片解析度',
		set27: '全螢幕：',
		set28: '下載：',
		set31: '滑鼠移入時顯示快捷鍵',
		set32: '啟用相簿下載',
		set33: '直接顯示留言內的 Youtube 連結，影片長寬比例：',
		set34: '，最大寬度：',
		set35: '語言：',
		set36: '啟用：',
		set37: '內文',
		set38: '個人資料相片',
		set39: '連結',
		set40: '啟用批次下載',
		set41: '啟用自動更新',
		set42: '在圖片下方顯示下載連結',
		set43: '以訊息串寬度顯示圖片',
		set44: '套用至所有圖片',
		set45: '僅套用至相簿第一張圖片',
		set46: '滑鼠移入大圖時不隱藏',
		set48: '直接顯示文章內的圖片連結，最大寬度：',
		set49: '啟用 Youtube 影片下載',
		set50: '直接下載無須開啟新分頁',
		set51: '啟用節能模式',
		set52: '縮圖列表 (新介面)',
		set53: '連結列表 (舊介面)',
		set54: '直接下載'
	},
	'zh-CN': {
		menu01: '关闭',
		menu02: '开启',
		fs01: '轻按全屏触发键，或点击此处离开全屏模式。',
		fs03: '下载',
		fs04: '加载中…',
		fs06: '页面宽度',
		fs07: '实际大小 (100%)',
		fs08: '全屏',
		fs09: '窗口大小',
		fs10: '上一张 (&larr; / 右键)',
		fs11: '下一张 (&rarr; / 左键)',
		al01: '相簿下载',
		al03: '以 Picasa 开启',
		al05: '复制网址',
		al06: '开启于新分页',
		al07: '此相簿为私密相簿，无法取得相簿内容，请点击右上角的「以 Picasa 开启」按钮下载此相簿。',
		yt01: '移除',
		allpic01: '批量下载',
		piclink01: '图片下载',
		piclink03: '全选',
		piclink04: '取消选择',
		ytdl01: '视频下载',
		ytdl02: '低品质',
		ytdl03: '标清',
		ytdl04: '原始',
		ytdl05: '高清',
		ytdl06: '全高清',
		ytdl07: '连接失败',
		ytdl08: '不相容',
		ytdl09: '未知格式',
		maxpic01: '缩放',
		update01: '更新',
		update05: '检查更新',
		update07: '您已更新至最新版本！',
		update08: '错误！',
		update09: '开发版本无法使用更新检查功能。',
		update11: '更新版本',
		update12: '已发布！',
		update13: '正在检查更新...',
		update14: '重试',
		update15: '请在更新完成后手动刷新页面。',
		his01: '记录',
		his02: '清除',
		his03: '您确定要清除所有记录吗？',
		set01: '设置',
		set02: '保存',
		set03: '重设',
		set04: '您确定要重设所有设定值吗？',
		set07: '张相片',
		set08: '张相片',
		set10: '关闭',
		set11: '通用',
		set12: '热键',
		set13: '其它',
		set14: '延迟：',
		set15: '毫秒 (ms)',
		set16: '透明度：',
		set17: '最大宽度：',
		set18: 'px (0: 无限制)',
		set19: '启用下载按钮',
		set20: '启用记录，最大记录数：',
		set21: '，直栏数：',
		set22: '(0: 无限制)',
		set23: '触发键：',
		set24: '无',
		set25: '直接显示评论内的图片连结，最大宽度：',
		set26: '显示图片分辨率',
		set27: '全屏：',
		set28: '下载：',
		set31: '鼠标移入时显示热键',
		set32: '启用相簿下载',
		set33: '直接显示留言内的 Youtube 连结，视频长宽比例：',
		set34: '，最大宽度：',
		set35: '语言：',
		set36: '启用：',
		set37: '內文',
		set38: '个人资料相片',
		set39: '链结',
		set40: '启用批量下载',
		set41: '启用自动更新',
		set42: '在图片下方显示下载链结',
		set43: '以讯息流宽度显示图片',
		set44: '套用至所有图片',
		set45: '仅套用至相簿第一张图片',
		set46: '鼠标移入大图时不隐藏',
		set48: '直接显示文章内的图片链结，最大宽度：',
		set49: '启用 Youtube 视频下载',
		set50: '直接下载无须开启新页签',
		set51: '启用节能模式',
		set52: '缩图列表 (新介面)',
		set53: '链结列表 (旧介面)',
		set54: '直接下载'
	},
	'ja-JP': {
		menu01: 'オフ',
		menu02: 'オン',
		fs01: 'フルスクリーントリガーを押してください、まだはこちらをクリックしてフルスクリーンモードを終了します。',
		fs03: 'ダウンロード',
		fs04: '読み込み中…',
		fs06: 'ページ幅',
		fs07: 'オリジナルサイズ (100%)',
		fs08: 'フルスクリーン',
		fs09: 'ウィンドウサイズ',
		fs10: '前の画像 (&larr; / 右クリック)',
		fs11: '次の画像 (&rarr; / 左クリック)',
		al01: 'アルバムをダウンロード',
		al03: 'Picasa で閲覧',
		al05: 'リンクをコビー',
		al06: '新しいタブで開け',
		al07: 'プライベートアルバムの為、アルバムをアクセスできない。右上辺りの「Picasa で閲覧」ボタンを押して、アルバムをダウンロードして下さい。',
		yt01: '削除',
		allpic01: 'バッチダウンロード',
		piclink01: '画像をダウンロード',
		piclink03: '全選択する',
		piclink04: '選択をキャンセル',
		ytdl01: '動画をダウンロード',
		ytdl02: '低画質',
		ytdl03: '標準画質',
		ytdl04: 'オリジナル画質',
		ytdl05: 'HD 画質',
		ytdl06: 'フル HD 画質',
		ytdl07: '接続に失敗しました',
		ytdl08: '非対応',
		ytdl09: '未知の形式',
		maxpic01: 'ズーム',
		update01: 'アップデート',
		update05: 'アップデートチェック',
		update07: '最新版に更新しました！',
		update08: 'エラー！',
		update09: '開発版では、更新チェック機能は使用できません。',
		update11: '新バージョン',
		update12: 'が発表されました！',
		update13: '更新チェック中…',
		update14: 'リトライ',
		update15: '更新したあとで、ページを再表示してください。',
		his01: '閲覧記録',
		his02: 'クリア',
		his03: 'すべての記録をクリアしますか？',
		set01: '設定',
		set02: '設定保存',
		set03: 'リセット',
		set04: '全ての設定をリセットしますが？',
		set07: '枚写真',
		set08: '枚写真',
		set10: '閉じる',
		set11: '一般',
		set12: 'ショートカット',
		set13: 'その他',
		set14: '遅れ：',
		set15: 'ミリセカンド (ms)',
		set16: '不透明度：',
		set17: '最大幅：',
		set18: 'px (0：限制無し)',
		set19: 'ダウンロードボタンを有効にする',
		set20: '閲覧記録を有効にする、最大記録数：',
		set21: '、段数：',
		set22: '(0: 限制無し)',
		set23: 'トリガー：',
		set24: '無',
		set25: 'コメント欄内の画像リンクを表示、最大幅：',
		set26: '画像解像度を表示',
		set27: 'フルスクリーン：',
		set28: 'ダウンロード：',
		set31: 'マウスが図像にオーバーしたら、ショートカットを表示します',
		set32: 'アルバムダウンロードを有効にする',
		set33: 'コメント欄内の Youtube リンクを表示、長さと幅の比：',
		set34: '，最大幅：',
		set35: '言語：',
		set36: '有効にする：',
		set37: 'コンテンツ',
		set38: 'プロフィールアイコン',
		set39: 'リンク',
		set40: 'バッチダウンロードを有効にする',
		set41: '自動的にアップデートチェック',
		set42: '画像の下にダウンロードリンクを表示',
		set43: 'ストリーム幅で画像表示',
		set44: '全ての画像に適用する',
		set45: 'アルバムの一つ目の画像に適用する',
		set46: '画像にカーソルを重ねた時に画像を隠さない',
		set48: '画像の直リンクをポストで表示、最大幅：',
		set49: 'YouTube ダウンロード機能を有効にする',
		set50: 'タブを開かずに直ちに画像をダウンロードします',
		set51: 'エコモードを有効にする',
		// 待翻譯
		set52: 'Thumbnail list (New UI)',
		set53: 'Link list (Old UI)',
		set54: 'Download directly'
	},
	'index': {
		'en-US': 'English',
		'zh-TW': '正體中文',
		'zh-CN': '简体中文',
		'ja-JP': '日本語'
	}
},
lang = locale[options.hz_language] || locale['en-US'];

// Initialize
var init = {
	basic: function(){
		// Append options
		var keys = '<option value="0">'+lang.set24+'</option><option value="16">Shift</option><option value="17">Ctrl</option>';
		keys += navigator.appVersion.indexOf('Macintosh') > -1 ? '<option value="18">Option</option><option value="13">Return</option>' : '<<option value="18">Alt</option><option value="13">Enter</option>';
		for (var i=65; i<91; i++){
			keys += '<option value="'+i+'">&#'+i+';</option>';
		}
		$('#hz_trigger, #hz_fullscreen, #hz_dl_key').append(keys);

		var langTmp = '';
		for (var j in locale.index){
			langTmp += '<option value="'+j+'">'+locale.index[j]+'</option>';
		}
		$('#hz_language').html(langTmp);

		// Bind menu events
		$('body').on('click', '#disable_hz', function(){
			if (!$(this).hasClass('off')){
				disable();
				$(this).html(lang.menu01).addClass('off');
			} else {
				enable();
				$(this).html(lang.menu02).removeClass('off');
			}
		}).on('click', '#hz_set_open', setPage.open)
		.on('click', '#hz_history_open', history.display)
		.on('click', '#hz_allpic_dl', batch);

		// Close settings page
		$('#hz_set_page').on('click', '.close, .back', setPage.close)
		// Save options
		.on('click', '.save', setPage.save)
		// Reset options
		.on('click', '.reset', setPage.reset)
		// Tab events
		.find('.menu li').each(function(i){
			if (i == 0) $(this).addClass('current');
			$(this).attr('tabid', i).on('click', function(){
				setPage.tab(i);
			});
		});
	},
	history: function(){
		var $page = $('#hz_history_page');
		$page.on('click', '.white', function(){
			var sure = confirm(lang.his03);
			if (sure){
				$page.find('.inner').empty().end()
				.find('small').html('<strong>0</strong> / '+options.hz_his_max+' '+lang.set07);
				history.clear();
			}
		});
	},
	copyarea: function(){
		var $page = $('#hz_copyarea');
		$page.on('click', '.back, .close', function(){
			$page.fadeOut(300, function(){
				$(this).find('textarea').empty();
			});
		}).on('click', 'textarea', function(){
			$(this).select();
		});
	},
	lightbox: function(){
		$('#hoverzoom_fs').on('click', '.back, .close', lightbox.close)
		.on('click', '.prev', lightbox.prev)
		.on('click', '.next, img', lightbox.next)
		.on('contextmenu', 'img', lightbox.prev)
		.on('scroll', function(){
			$(this).children('.ctrl').css({top: this.scrollTop, left: this.scrollLeft});
		}).find('li').each(function(i){
			$(this).on('click', function(){
				lightbox.resize.type(i);
			});
		});
	},
	timer: function(){
		// Show Youtube links in comments directly
		$content.on('click', '.hz_closeYT', function(){
			$(this).prev().attr('style', '').end().next().remove().end().remove();
		// Album download button
		}).on('click', '.hz_albumDownload, .hz_in-albumDownload', albumDL)
		// Youtube download button
		.on('click', '.hz_tubeStacks', function(){
			if (!$(this).next().hasClass('hz_stacksDetail')){
				var html = '<div class="hz_closeButton"></div><strong>'+lang.ytdl01+'</strong><div class="notify">'+lang.fs04+'</div>',
					popup = $('<div class="hz_stacksDetail">'+html+'</div>').on('click', '.hz_closeButton', function(){
						$(this).parent().fadeOut(300);
					}).on('click', 'a', function(){
						openWindow(this.href, true);
						return false;
					});

				$(this).after(popup).next().fadeIn(300).offset({left: $(this).offset().left - 13, top: $(this).offset().top + 31});
				ytDL($(this).data('url'), popup);
			} else {
				if ($(this).next().is(':hidden')){
					$(this).next().fadeIn(300).offset({left: $(this).offset().left - 13, top: $(this).offset().top + 31});
				} else {
					$(this).next().fadeOut(300);
				}
			}
		});
	},
	links: function(){
		if (options.hz_dl_link_option === '0'){
			$('body').on('click', '.hz_stacks_downloadSelected', function(){
				$(this).parent().parent().find('input').filter(':checked').each(function(){
					openWindow(this.parentNode.dataset.original);
				});
			}).on('click', '.hz_stacks_selectAll', function(){
				var target = $(this).parent().parent().find('input');
				if (target.length == target.filter(':checked').length){
					target.prop('checked', false);
					$(this).html(lang.piclink03).prev().hide();
				} else {
					target.prop('checked', true);
					$(this).html(lang.piclink04).prev().show();
				}
			}).on('change', '.hz_stackItem input', function(){
				var target = $(this).parent().parent().find('input'),
					checked = target.filter(':checked');

				if (checked.length == target.length){
					$(this).parent().parent().children('nav').children().eq(0).show().end().eq(1).html(lang.piclink04);
				} else if (checked.length == 0) {
					$(this).parent().parent().children('nav').children().eq(0).hide();
				} else {
					$(this).parent().parent().children('nav').children().eq(0).show().end().eq(1).html(lang.piclink03);
				}
			});
		}
	},
	directDL: function(){
		$('#hoverzoom_db').on('click', function(){
			if (typeof this.href != 'undefined'){
				openWindow(this.href);
				return false;
			}
		});

		$('#hoverzoom_fs a, #hoverzoom_sc a').on('click', function(){
			openWindow(this.href);
			return false;
		});

		$content.parent().on('click', '.masonry-brick', function(){
			openWindow(this.href);
			return false;
		});
	},
	append: function(){
		var elements = {
			body: {
				main: {
					id: 'hoverzoom',
					css: 'opacity:'+options.hz_opacity / 100
				},
				loading: {
					id: 'hz_loading'
				},
				downloadButton: {
					id: 'hoverzoom_db',
					type: 'a',
					html: '<div></div>'
				},
				shortcut: {
					id: 'hoverzoom_sc',
					className: 'hz_button white',
					html: '<a>'+lang.fs03+'</a><span>'+lang.fs08+'</span>'
				},
				lightbox: {
					id: 'hoverzoom_fs',
					html: '<div class="back"></div>'
					+'<div class="main"></div>'
					+'<div class="ctrl">'
						+'<div class="close" title="'+lang.fs01+'"></div>'
						+'<div class="center">'
							+'<div class="prev" title="'+lang.fs10+'"></div>'
							+'<span></span>'
							+'<div class="next" title="'+lang.fs11+'"></div>'
						+'</div>'
						+'<div class="right">'
							+'<small></small>'
							+'<a>'+lang.fs03+'</a>'
							+'<div class="zoom">'+lang.maxpic01
								+'<ul>'
									+'<li>'+lang.fs09+'</li>'
									+'<li>'+lang.fs06+'</li>'
									+'<li>'+lang.fs07+'</li>'
								+'</ul>'
							+'</div>'
						+'</div>'
					+'</div>'
					+'<div class="loading"></div>'
				},
				history: {
					id: 'hz_history_page',
					className: 'hz_settings',
					html: '<div class="back"></div>'
					+'<div class="main">'
						+'<h3>'+lang.his01+'</h3>'
						+'<small></small>'
						+'<div class="close"></div>'
						+'<div class="wrap"><div class="inner"></div></div>'
						+'<div class="functions top">'
							+'<div class="cycle"></div>'
							+'<div class="hz_button white">'+lang.his02+'</div>'
							+'<div class="hz_button blue">'+lang.al05+'</div>'
							+'<div class="hz_button green">'+lang.al06+'</div>'
						+'</div>'
					+'</div>'
				},
				album: {
					id: 'hz_album_page',
					className: 'hz_settings',
					html: '<div class="back"></div>'
					+'<div class="main">'
						+'<h3>'+lang.al01+'</h3>'
						+'<small></small>'
						+'<div class="close"></div>'
						+'<div class="wrap"><div class="inner"></div></div>'
						+'<div class="functions top">'
							+'<div class="cycle"></div>'
							+'<div class="hz_button blue">'+lang.al05+'</div>'
							+'<div class="hz_button green">'+lang.al06+'</div>'
							+'<a class="hz_button orange">'+lang.al03+'</a>'
						+'</div>'
					+'</div>'
				},
				batch: {
					id: 'hz_batch_page',
					className: 'hz_settings',
					html: '<div class="back"></div>'
					+'<div class="main">'
						+'<h3>'+lang.allpic01+'</h3>'
						+'<small></small>'
						+'<div class="close"></div>'
						+'<div class="wrap"><div class="inner"></div></div>'
						+'<div class="functions top">'
							+'<div class="cycle"></div>'
							+'<div class="hz_button blue">'+lang.al05+'</div>'
							+'<div class="hz_button green">'+lang.al06+'</div>'
						+'</div>'
					+'</div>'
				},
				copyarea: {
					id: 'hz_copyarea',
					className: 'hz_settings',
					html: '<div class="back"></div>'
					+'<div class="main">'
						+'<h3>'+lang.al05+'</h3>'
						+'<div class="close"></div>'
						+'<textarea readonly wrap="off"></textarea>'
					+'</div>'
				},
				set: {
					id: 'hz_set_page',
					className: 'hz_settings',
					html: '<div class="back"></div>'
					+'<div class="main">'
						+'<h3>'+lang.set01+'</h3>'
						+'<small>Ver. '+version+' by <a href="https://plus.google.com/105931860008509594725" target="_blank">SkyArrow</a></small>'
						+'<div class="close"></div>'
						+'<ul class="menu">'
							+'<li>'+lang.set11+'</li>'
							+'<li>'+lang.set12+'</li>'
							+'<li>'+lang.fs03+'</li>'
							+'<li>'+lang.set13+'</li>'
							+'<li>'+lang.update01+'</li>'
						+'</ul>'
						+'<div class="tabs">'
							// General
							+'<div>'
								+'<label>'+lang.set36+'</label>'
								+'<input id="hz_enable_main" type="checkbox"><label for="hz_enable_main">'+lang.set37+'</label>'
								+'<input id="hz_enable_icon" type="checkbox"><label for="hz_enable_icon">'+lang.set38+'</label>'
								+'<input id="hz_enable_link" type="checkbox"><label for="hz_enable_link">'+lang.set39+'</label><br>'
								+'<label for="hz_delay">'+lang.set14+'</label><input id="hz_delay" type="text" maxlength="4"><label for="hz_delay">'+lang.set15+'</label><br>'
								+'<label for="hz_opacity">'+lang.set16+'</label><input id="hz_opacity" type="text" maxlength="3"><label for="hz_opacity">%</label><br>'
								+'<label for="hz_maxwidth">'+lang.set17+'</label><input id="hz_maxwidth" type="text" maxlength="4"><label for="hz_maxwidth">'+lang.set18+'</label><br>'
								+'<input id="hz_resolution" type="checkbox"><label for="hz_resolution">'+lang.set26+'</label><br>'
								+'<input id="hz_hovering" type="checkbox"><label for="hz_hovering">'+lang.set46+'</label><br>'
							// Shortcut
							+'</div><div>'
								+'<label for="hz_trigger">'+lang.set23+'</label><select id="hz_trigger"></select><br>'
								+'<label for="hz_dl_key">'+lang.set28+'</label><select id="hz_dl_key"></select><br>'
								+'<label for="hz_fullscreen">'+lang.set27+'</label><select id="hz_fullscreen"></select><br>'
								+'<input id="hz_download" type="checkbox"><label for="hz_download">'+lang.set19+'</label><br>'
								+'<input id="hz_shortcut" type="checkbox"><label for="hz_shortcut">'+lang.set31+'</label><br>'
							// Download
							+'</div><div>'
								+'<input id="hz_dl_link" type="checkbox"><label for="hz_dl_link">'+lang.set42+'</label>'
								+'<select id="hz_dl_link_option">'
									+'<option value="0">'+lang.set52+'</option>'
									+'<option value="1">'+lang.set53+'</option>'
									+'<option value="2">'+lang.set54+'</option>'
								+'</select><br>'
								+'<input id="hz_album" type="checkbox"><label for="hz_album">'+lang.set32+'</label><br>'
								+'<input id="hz_allpics" type="checkbox"><label for="hz_allpics">'+lang.set40+'</label><br>'
								+'<input id="hz_ytdl" type="checkbox"><label for="hz_ytdl">'+lang.set49+'</label><br>'
								+'<input id="hz_iframedl" type="checkbox"><label for="hz_iframedl">'+lang.set50+'</label><br>'
							// Other
							+'</div><div>'
								+'<label for="hz_language">'+lang.set35+'</label><select id="hz_language"></select><br>'
								+'<input id="hz_update" type="checkbox"><label for="hz_update">'+lang.set41+'</label><br>'
								+'<input id="hz_ecomode" type="checkbox"><label for="hz_ecomode">'+lang.set51+'</label><br>'
								+'<input id="hz_maxpic" type="checkbox"><label for="hz_maxpic">'+lang.set43+'</label>'
								+'<select id="hz_maxpic_option">'
									+'<option value="0">'+lang.set44+'</option>'
									+'<option value="1">'+lang.set45+'</option>'
								+'</select><br>'
								+'<input id="hz_direct_post" type="checkbox"><label for="hz_direct_post">'+lang.set48+'</label>'
								+'<input id="hz_direct_post_max" type="text" maxlength="4"><label for="hz_direct_post_max">'+lang.set18+'</label><br>'
								+'<input id="hz_direct" type="checkbox"><label for="hz_direct">'+lang.set25+'</label>'
								+'<input id="hz_direct_max" type="text" maxlength="4"><label for="hz_direct_max">'+lang.set18+'</label><br>'
								+'<input id="hz_direct_yt" type="checkbox"><label for="hz_direct_yt">'+lang.set33+'</label>'
								+'<select id="hz_direct_ytaspect">'
									+'<option value="1">4:3</option>'
									+'<option value="2">16:9</option>'
									+'<option value="3">16:10</option>'
								+'</select>'
								+'<label for="hz_direct_ytaspect">'+lang.set34+'</label>'
								+'<input id="hz_direct_ytmaxwidth" type="text" maxlength="4"><label for="hz_direct_ytmaxwidth">'+lang.set18+'</label><br>'
								+'<input id="hz_his" type="checkbox"><label for="hz_his">'+lang.set20+'</label>'
								+'<input id="hz_his_max" type="text" maxlength="4">'
								+'<label for="hz_his_columns">'+lang.set21+'</label><input id="hz_his_columns" type="text" maxlength="1"><br>'
							// Update
							+'</div><div></div>'
						+'</div>'
						+'<div class="functions bottom">'
							+'<div class="meta"><a id="hz_checkupdate" href="javascript:void(0)">'+lang.update05+'</a></div>'
							+'<div class="hz_button green save">'+lang.set02+'</div>'
							+'<div class="hz_button white reset">'+lang.set03+'</div>'
							+'<a class="hz_button blue update" href="http://userscripts.org/scripts/source/106681.user.js">'+lang.update01+'</a>'
						+'</div>'
					+'</div>'
				}
			},
			menu: {
				setting: {
					id: 'hz_set_open',
					html: lang.set01
				},
				history: {
					id: 'hz_history_open',
					html: lang.his01
				},
				allPic: {
					id: 'hz_allpic_dl',
					html: lang.allpic01
				}
			}
		};

		var bodyTmp = menuTmp = '';
		
		var body = function(arr){
			var _defaults = {
				id: '',
				type: 'div',
				className: '',
				html: '',
				css: ''
			};
			var arr = $.extend(_defaults, arr);
			bodyTmp += '<'+arr.type+' id="'+arr.id+'" class="'+arr.className+'" style="'+arr.css+'">'+arr.html+'</'+arr.type+'>';
		};
		
		var menu = function(arr){
			menuTmp += '<li id="'+arr.id+'">'+arr.html+'</li>';
		};

		body(elements.body.main);
		body(elements.body.loading);
		if (options.hz_download === 'true') body(elements.body.downloadButton);
		if (options.hz_shortcut === 'true') body(elements.body.shortcut);
		if (options.hz_fullscreen > 0 || options.hz_shortcut === 'true') body(elements.body.lightbox);
		if (options.hz_his === 'true') body(elements.body.history);
		if (options.hz_album === 'true') body(elements.body.album);
		if (options.hz_allpics === 'true') body(elements.body.batch);
		body(elements.body.copyarea);
		body(elements.body.set);
		$content.parent().append(bodyTmp);

		menu(elements.menu.setting);
		if (options.hz_his === 'true') menu(elements.menu.history);
		if (options.hz_allpics === 'true') menu(elements.menu.allPic);
		$content.on('click', '.Pp', function(){
			if (!$(this).data('class')){
				$('.a-q-pd').append('<div id="hz_opts"><strong>Google+ Hover Zoom</strong><ul><li id="disable_hz">'+lang.menu02+'</li>'+menuTmp+'</ul></div>');
				$(this).data('class', true);
			}
		});
	}
};

init.append();

// After page loaded completely
$(document).ready(function(){
	// Initialize
	init.basic();
	if (options.hz_his === 'true') init.history();
	init.copyarea();
	if (options.hz_fullscreen > 0 || options.hz_shortcut === 'true') init.lightbox();
	init.timer();
	if (options.hz_dl_link === 'true') init.links();
	if (options.hz_iframedl === 'true') init.directDL();

	// Enable functions
	enable();

	// Check for update automatically
	if (options.hz_update === 'true' && !developer) update.auto();
});

// Detect cursor position
document.addEventListener('mousemove', function(e){
	mouse = {x: e.pageX, y:e.pageY};
}, false);

// Hover Zoom
var hoverzoom = function(){
	var _this = this;

	var main = function(){
		var tag = _this.tagName.toUpperCase();
		if (tag == 'IMG'){
			var url = _this.src;
			url = url.match(/\?sz|\/proxy/) ? url.replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : url.replace(picasaRegex,'/s0/$2');
		} else if (tag == 'A'){
			var url = _this.href;
			if (!url.match(picRegex)) return false;
		}

		var $main = $('#hoverzoom'),
			$loading = $('#hz_loading'),
			trigger = true,
			trigger_keys = [true, true, true],
			timer2;

		var show = function(){
			$loading.show().offset({top: mouse.y - 10, left: mouse.x - 10});
			var img = new Image();
			img.src = url;
			img.onload = function(){
				if (trigger && $main.html() == ''){
					$loading.hide();
					$main.append(this).fadeIn(300);
					if (options.hz_resolution === 'true') $main.append('<small>'+this.naturalWidth+' x '+this.naturalHeight+'</small>');
					resize(this);

					if (options.hz_hovering === 'true'){
						$main.on({
							mouseenter: function(){clearTimeout(timer2);},
							mouseleave: hide
						});
					}
				}
			};

			var resize = function(img){
				var x = mouse.x,
					y = mouse.y,
					wWidth = $(window).width(),
					wHeight = $(window).height();

				if (x > wWidth / 2){
					img.style.maxWidth = options.hz_maxwidth > 0 ? options.hz_maxwidth + 'px' : x - 30 + 'px';
					img.style.maxHeight = options.hz_resolution === 'true' ? wHeight - 45 + 'px' : wHeight - 35 + 'px';
					$main.offset({top: y + 20, left: x - $main.width() - 20});
				} else {
					img.style.maxWidth = options.hz_maxwidth > 0 ? options.hz_maxwidth + 'px' : wWidth - x - 40 + 'px';
					img.style.maxHeight = options.hz_resolution === 'true' ? wHeight - 45 + 'px' : wHeight - 35 + 'px';
					$main.offset({top: y + 20, left: x + 20});
				}

				if (y + $main.height() + 20 > $(document).scrollTop() + wHeight - 20) $main.offset({top: $main.offset().top - $main.height() < $(document).scrollTop() + 20 ? $(document).scrollTop() + 10 : y - $main.height() - 20});
			};
		};

		var fullscreen = function(){
			var arr = $(_this).parentsUntil('.Ry').find('.aG'),
				links = [];

			if (arr.length > 0){
				var num = $.inArray(_this, arr);

				for (var i=0, len=arr.length; i<len; i++){
					var item = arr[i];
					links.push((item.src.match(/\?sz|\/proxy/) ? item.src.replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : item.src.replace(picasaRegex,'/s0/$2')));
				}
			} else {
				var num = 0;
				links.push(_this.href || _this.src);
			}

			hide();
			lightbox.start(links, num);
		};

		var keys = function(e){
			var code = e.keyCode || e.which;

			if (code == options.hz_trigger && trigger_keys[0]){
				show();
				trigger_keys[0] = false;
			} else if (code == options.hz_fullscreen && trigger_keys[1]){
				fullscreen();
				trigger_keys[1] = false;
			} else if (code == options.hz_dl_key && trigger_keys[2]){
				openWindow(url);
				trigger_keys[2] = false;
			}

			return false;
		};

		var shortcut = new function(){
			var $sc = $('#hoverzoom_sc'),
				timer3;

			var close = function(){
				timer3 = setTimeout(function(){
					$sc.hide().off();
				}, options.hz_delay);
			};

			return {
				show: function(){
					$sc.fadeIn(300).offset({top: mouse.y + 10, left: mouse.x + 10}).on({
						mouseenter: function(){clearTimeout(timer3);},
						mouseleave: close
					}).on('click', 'span', fullscreen)
					.children().eq(0).attr('href', url);
				},
				hide: close
			}
		};

		var hide = function(){
			timer2 = setTimeout(function(){
				trigger = false;
				$main.hide().empty().off();
				$loading.hide();
				$(_this).off('mouseleave');
				$(document).off('keydown', keys);
				clearTimeout(timer1);
			}, 100);

			if (options.hz_shortcut === 'true') shortcut.hide();
		};

		if (options.hz_trigger == 0) show();
		if (options.hz_shortcut === 'true') shortcut.show();
		if (options.hz_download === 'true') $('#hoverzoom_db').attr('href', url);
		history.create(url);
		$(_this).on('mouseleave', hide);
		$(document).on('keydown', keys);
	};

	var timer1 = setTimeout(main, options.hz_delay);
	$(this).on('mouseleave', function(){
		clearTimeout(timer1);
		$(this).off('mouseleave');
	});
};

// Enable functions
var enable = function(){
	if (options.hz_enable_main === 'true') $content.on('mouseenter', '.Mn img', hoverzoom);
	if (options.hz_enable_icon === 'true') $('body').on('mouseenter', '.Ut', hoverzoom);
	if (options.hz_enable_link === 'true') $content.on('mouseenter', '.ot-anchor', hoverzoom);

	$('#hoverzoom_db').addClass('enable');
	if (options.hz_ecomode === 'true'){
		ecomode.start();
	} else {
		timer.start();
	}
};

// Disable functions
var disable = function(){
	if (options.hz_enable_main === 'true') $content.off('mouseenter', '.Mn img', hoverzoom);
	if (options.hz_enable_icon === 'true') $('body').off('mouseenter', '.Ut', hoverzoom);
	if (options.hz_enable_link === 'true') $content.off('mouseenter', '.ot-anchor', hoverzoom);

	$('#hoverzoom_db').removeClass('enable');
	if (options.hz_ecomode === 'true'){
		ecomode.stop();
	} else {
		timer.stop();
	}
};

// Lightbox
var lightbox = new function(){
	var $fs = $('#hoverzoom_fs'),
		$main = $fs.children('.main'),
		trigger = false,
		scroll, links, i, url, length;

	var insert = function(num){
		if (!trigger){
			if (num < 0){
				num = length - 1;
			} else if (num == length){
				num = 0;
			}

			i = num;
			url = links[i];
			trigger = false;
			$fs.addClass('load').find('a').attr('href', url);
			$('<img src="'+url+'">').load(function(){
				var img = this,
					others = $main.find('img');

				if (others.length > 0){
					others.fadeOut(300, function(){
						$(this).remove();
						resize.start(img);
					});
				} else {
					resize.start(img);
				}
			});
		}
	};

	var resize = new function(){
		var $ctrl = $fs.children('.ctrl'),
			$meta = $ctrl.find('small'),
			$navi = $ctrl.find('span'),
			img, nWidth, nHeight, wWidth, wHeight;

		var main = function(top, left){
			$main.css({top: top, left: left});
			$meta.html(nWidth+' x '+nHeight+' ('+parseInt($(img).width() / nWidth * 100)+'%)');
			if (length > 1) $navi.html(parseInt(i+1)+' / '+length);
		};

		var getSize = function(){
			wWidth = $fs[0].clientWidth;
			wHeight = $fs[0].clientHeight;
		};

		var detect = function(){
			if (wWidth > nWidth && wHeight > nHeight){
				$fs.removeClass('zoom');
			} else {
				if (nWidth > wWidth){
					var html = lang.fs06+' ('+parseInt(wWidth/nWidth*100)+'%)';
					$fs.addClass('actual');
				} else {
					html = lang.fs06+' (100%)';
					$fs.removeClass('actual');
				}

				$fs.addClass('zoom').find('li').eq(0).html(lang.fs09+' ('+parseInt($(img).width() / nWidth * 100)+'%)').end().eq(1).html(html);
			}
		};

		var type = function(i){
			if (i == 0){
				$(img).css({maxWidth: wWidth - 50, maxHeight: wHeight - 50});
				main((wHeight - $(img).height()) / 2, (wWidth - $(img).width()) / 2);
			} else if (i == 1){
				$(img).css('maxHeight', 'none');
				getSize();
				$(img).css('maxWidth', wWidth);
				main(($(img).height() > wHeight ? 0 : (wHeight - $(img).height() / 2)), (wWidth - $(img).width()) / 2);
			} else if (i == 2){
				$(img).css({maxWidth: 'none', maxHeight: 'none'});
				main(($(img).height() > wHeight ? 0 : (wHeight - $(img).height() / 2)), 0);
			}

			$ctrl.find('li').css('fontWeight', 'normal').eq(i).css('fontWeight', 'bold');
		};

		return {
			start: function(obj){
				$main.append(obj);
				$fs.removeClass('load');

				trigger = false;
				img = obj;
				nWidth = obj.naturalWidth;
				nHeight = obj.naturalHeight;

				getSize();
				type(0);
				detect();

				$(obj).animate({opacity: 1}, 300);
			},
			type: type
		}
	};

	var prev = function(){
		if (length > 1) insert(i - 1);
	};

	var next = function(){
		if (length > 1) insert(i + 1);
	};

	var close = function(){
		$fs.hide().attr('class', '').children('.main').empty().end().children('.ctrl').attr('style', '');
		$('html').css('overflowY', 'auto');
		$(document).scrollTop(scroll).off('keyup').off('keydown');
	};

	return {
		start: function(arr, i){
			scroll = $(document).scrollTop();
			links = arr;
			length = arr.length;

			$('html, body').css('overflowY', 'hidden');
			insert(i);
			$fs.show();
			if (length > 1) $fs.addClass('multi');

			$(document).on({
				keyup: function(e){
					var code = e.keyCode || e.which;
					if (code == 39){
						next();
					} else if (code == 37){
						prev();
					}
				},
				keydown: function(e){
					var code = e.keyCode || e.which;
					if (code == 27 || code == options.hz_fullscreen){
						close();
					} else if (code == options.hz_dl_key){
						openWindow(url);
					}
				}
			})
		},
		prev: prev,
		next: next,
		close: close,
		resize: resize
	}
};

// Open in new window
var openWindow = function(url, force){
	var time = new Date();

	if (force){
		$content.append('<iframe src="'+url.replace(/\/s0\//, '/s0-d/')+'" id="hz_newtab'+time.getTime()+'" style="display:none"></iframe>');
	} else {
		if (options.hz_iframedl === 'true' && url.match(gcRegex)){
			$content.append('<iframe src="'+url.replace(/\/s0\//, '/s0-d/')+'" id="hz_newtab'+time.getTime()+'" style="display:none"></iframe>');
		} else {
			window.open(url, 'hz_newtab'+time.getTime());
		}
	}
};

// Process pictures and bind events for album download page
var sortPic = function(ele, arr, message){
	var wWidth = $(window).width(),
		wHeight = $(window).height(),
		$wrap = ele.find('.wrap'),
		$inner = $wrap.children('.inner'),
		length = arr.length,
		counts = 0,
		trigger = false;

	var append = function(start, end){
		var appends = '';
		trigger = true;
		counts++;

		for (var i=start; i<end; i++){
			appends += arr[i];
		}

		ele.addClass('loading');
		$inner.append(appends).imagesLoaded(function(){
			if ($(this).hasClass('masonry')){
				$(this).masonry('reload');
			} else {
				$(this).masonry({isFitWidth: true});
			}

			ele.removeClass('loading');
			trigger = false;
		});
	};

	var load = function(){
		if (this.scrollTop >= this.scrollHeight - this.offsetHeight - 200 && !trigger){
			var start = 50 * counts;
			if (length < 50 * (counts + 1)){
				var end = length;
				$wrap.off('scroll');
			} else {
				var end = 50 * (counts + 1);
			}

			append(start, end);
		}
	};

	var copyLink = function(){
		var textarea = $('#hz_copyarea').find('textarea');
		if (textarea.html() == ''){
			var appends = '';
			
			for (var i=0; i<length; i++){
				var url = $(arr[i]).attr('href') + '\n';
				appends += url.substring(0, 2) == '//' ? 'https:' + url : url;
			}

			$('#hz_copyarea').fadeIn(300).find('textarea').html(appends);
		}
	};

	var newTab = function(){
		for (var i=0; i<length; i++){
			window.open($(arr[i]).attr('href'), 'hz_newtab'+i);
		}
	};

	var close = function(){
		delete arr;
		ele.off('click').fadeOut(300, function(){
			$inner.empty();
			ele.find('small').html('');
		});
	};

	if (length > 0){
		var max = length >= 50 ? 50 : length;
		append(0, max);
		if (length > 50) $wrap.off('scroll').on('scroll', load);
	}

	ele.fadeIn(300).on('click', '.blue', copyLink)
	.on('click', '.green', newTab)
	.on('click', '.back, .close', close)
	.find('small').html(message).end()
	.children('.main').css({width: wWidth - 200, height: wHeight - 140, marginLeft: -(wWidth / 2) + 80, marginTop: -(wHeight / 2) + 50})
	.children('.wrap').scrollTop(0).css({width: wWidth - 180, height: wHeight - 190})
	.children('.inner').css('width', wWidth - 200);
};

// History
var history = new function(){
	var read = function(){
		var storage = localStorage.hz_histories;

		if (typeof storage != 'undefined' && storage != null){
			if (storage == ''){
				return [];
			} else {
				var arr = storage.split('|||'),
					length = arr.length,
					max = options.hz_his_max;

				if (length > max) arr.splice(max, length - max);

				return arr;
			}
		} else {
			return [];
		}
	};

	var save = function(url, date){
		var storage = read(),
			length = storage.length;

		if (length > 0){
			for (var i=0; i<length; i++){
				var item = storage[i];

				if (typeof item == 'undefined' || item == ''){
					storage.splice(i, 1);
				} else {
					var obj = item.split(';');
					if (obj[0] == url) storage.splice(i, 1);
				}
			}

			storage.push(url+';'+date);
			localStorage.hz_histories = storage.join('|||');
		} else {
			localStorage.hz_histories = url+';'+date;
		}
	};

	return {
		create: function(url){
			var time = new Date(),
				date = (time.getMonth() + 1)+'/'+time.getDate()+' '+time.getHours()+':'+(time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes())+':'+(time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds());
			save(url, date);
		},
		display: function(){
			var width = parseInt(($(window).width() - 200) / options.hz_his_columns - 10),
				storage = read().reverse(),
				length = storage.length,
				arr = [];

			for (var i=0; i<length; i++){
				var item = storage[i].split(';'),
					thumbnail = item[0].match(gcRegex) && item[0].match(picasaRegex) ? item[0].replace(picasaRegex, '/w'+width+'/$2') : item[0];

				arr.push('<a href="'+item[0]+'" title="'+item[1]+'"><img src="'+thumbnail+'" width="'+width+'"></a>');
			}

			sortPic($('#hz_history_page'), arr, '<strong>'+length+'</strong> / '+options.hz_his_max+' '+(length > 1 ? lang.set08 : lang.set07));
		},
		clear: function(){
			localStorage.hz_histories = '';
		}
	}
};

// Album download
var albumDL = function(){
	var $page = $('#hz_album_page'),
		data = $(this).data('url'),
		userid = data.replace(/(.*)\/photos\/(\d+)\/albums\/(\d+)/, '$2'),
		albumid = data.replace(/(.*)\/photos\/(\d+)\/albums\/(\d+)/, '$3'),
		width = parseInt(($(window).width() - 200) / options.hz_his_columns - 10),
		arr = [];

	$page.fadeIn(300).addClass('loading')
	.find('.orange').attr('href', 'picasa://downloadfeed/?url=https://picasaweb.google.com/data/feed/back_compat/user/'+userid+'/albumid/'+albumid+'?imgdl=1');

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://picasaweb.google.com/data/feed/api/user/'+userid+'/albumid/'+albumid+'?alt=json',
		onerror: function(){
			sortPic($page, arr, lang.al07);
		},
		onload: function(data){
			var feed = JSON.parse(data.responseText).feed,
				entry = feed.entry,
				links = feed.link,
				albumLink;

			$(entry).each(function(i, data){
				var a = data.media$group,
					url = a.media$content[0].url,
					original = url.replace(/(.*)\//, '$1/s0/'),
					thumbnail = url.replace(/(.*)\//, '$1/w'+width+'/');

				arr.push('<a href="'+original+'" title="'+a.media$title.$t+'"><img src="'+thumbnail+'" width="'+width+'"></a>');
			});

			for (var j=0, len=links.length; j<len; j++){
				var link = links[j];
				if (link.rel == 'alternate') albumLink = link.href;
			}

			sortPic($page, arr, '<a href="'+feed.author[0].uri.$t+'" target="_blank">'+feed.author[0].name.$t+'</a> &raquo; <a href="'+albumLink+'" target="_blank"><strong>'+feed.title.$t+'</strong></a> ('+entry.length+' '+(entry.length > 1 ? lang.set08 : lang.set07)+')');
		}
	});
};

// Batch download
var batch = function(){
	var width = parseInt(($(window).width() - 200) / options.hz_his_columns - 10),
		arr = [];

	$('.aG, .ot-anchor').filter(':visible').each(function(){
		var tag = this.tagName.toUpperCase();
		if (tag == 'IMG'){
			var url = this.src,
				thumbnail = url;
			if (url.match(gcRegex) && url.match(picasaRegex)){
				url = url.replace(picasaRegex, '/s0/$2');
				thumbnail = url.replace(picasaRegex, '/w'+width+'/$2');
			} else if (url.match(/\/proxy\?url=/)){
				url = url.split('&')[0].replace(/(.*)\?url=(.*)/, '$2');
				thumbnail = url;
			}

			arr.push('<a href="'+url+'"><img src="'+thumbnail+'" width="'+width+'"></a>');
		} else if (tag == 'A'){
			var url = this.href;
			if (url.match(picRegex)) arr.push('<a href="'+url+'"><img src="'+url+'" width="'+width+'"></a>');
		}
	});

	sortPic($('#hz_batch_page'), arr, '<strong>'+arr.length+'</strong> '+(arr.length > 1 ? lang.set08 : lang.set07));
};

// Youtube download
var ytDL = function(url, ele){
	var $notify = ele.children('.notify'),
		format = {
			// FLV
			5: {format: 'FLV', res: '224p', desc: lang.ytdl02},
			6: {format: 'FLV', res: '270p', desc: lang.ytdl02},
			34: {format: 'FLV', res: '360p', desc: lang.ytdl02},
			35: {format: 'FLV', res: '480p', desc: lang.ytdl03},
			// MP4
			18: {format: 'MP4', res: '360p', desc: lang.ytdl02},
			22: {format: 'MP4', res: '720p', desc: lang.ytdl05},
			37: {format: 'MP4', res: '1080p', desc: lang.ytdl06},
			38: {format: 'MP4', res: '2304p', desc: lang.ytdl06},
			// MP4.3D
			83: {format: 'MP4', res: '240p', desc: lang.ytdl02},
			82: {format: 'MP4', res: '360p', desc: lang.ytdl02},
			85: {format: 'MP4', res: '520p', desc: lang.ytdl03},
			84: {format: 'MP4', res: '720p', desc: lang.ytdl05},
			// WebM
			43: {format: 'WebM', res: '360p', desc: lang.ytdl02},
			44: {format: 'WebM', res: '480p', desc: lang.ytdl03},
			45: {format: 'WebM', res: '720p', desc: lang.ytdl05},
			46: {format: 'WebM', res: '1080p', desc: lang.ytdl06},
			// WebM.3D
			100: {format: 'WebM', res: '360p', desc: lang.ytdl02},
			101: {format: 'WebM', res: '480p', desc: lang.ytdl03},
			102: {format: 'WebM', res: '720p', desc: lang.ytdl05},
			// 3GP
			13: {format: '3GP', res: '176x144', desc: lang.ytdl02},
			17: {format: '3GP', res: '176x144', desc: lang.ytdl02}
		};

		var execHash = function(hash){
			var value = hash.split('&'),
				query = [];

			for (var i=0, len=value.length; i<len; i++){
				var tmp = value[i].split('=');
				query[tmp[0]] = tmp[1];
			};

			return query;
		};

		var encode = function(text){
			return text.replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
		};

		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onerror: function(){
				$notify.html(lang.ytdl07);
			},
			onload: function(data){
				var data = data.responseText,
					title = encode($(data).find('#eow-title').attr('title'));
					
				var regexp_url = new RegExp('"url_encoded_fmt_stream_map": "([^"]*)"', 'i');
				data.match(regexp_url);
				var map = RegExp.$1.split(',');

				if (map.length > 0){
					var appends = '';

					for (var i=0, len=map.length; i<len; i++){
						var item = execHash(map[i]);
						if (typeof item.url != 'undefined'){
							var url = decodeURIComponent(item.url).replace(/\\u0026quality/, '')+'&title='+title,
								itag = url.replace(/(.*)itag=(\d+)(.*)/, '$2'),
								tag = format[itag],
								desc = typeof tag != 'undefined' ? tag.desc+'<small>'+tag.format+' / '+tag.res+'</small>' : lang.ytdl09+'<small>itag='+itag+'</small>';

							appends += i == 0 ? '<a href="'+url+'" target="_blank">'+desc+'</a>' : '<br><a href="'+url+'" target="_blank">'+desc+'</a>';
						}
					}

					ele.addClass('loaded').append(appends).parentsUntil('.ow').next().find('.ii').css('position', 'static');
				} else {
					$notify.html(lang.ytdl08);
				}
			}
		});
};

// Data process
var process = {
	// Process links in comments
	comment: function(){
		if (options.hz_direct_ytaspect == 1){
			var aspect = 3/4;
		} else if (options.hz_direct_ytaspect == 3){
			var aspect = 10/16;
		} else {
			var aspect = 9/16;
		}

		var url = this.href;
		// Show photo links in comments directly
		if (options.hz_direct === 'true' && url.match(picRegex) && !$(this).hasClass('hz_img-in-comm')){
			$(this).addClass('hz_img-in-comm').html('<img src="'+url+'" style="max-width:'+(options.hz_direct_max > 0 ? options.hz_direct_max : '')+'">');
		// Show Youtube links in comments directly
		} else if (!$(this).hasClass('hz_yt-in-post') && options.hz_direct_yt === 'true'){
			if (url.match(/youtube\.com\/watch\?v=/) || url.match(/youtu\.be/)){
				var maxWidth = options.hz_direct_ytmaxwidth > 0 ? options.hz_direct_ytmaxwidth : $(this).parent().parent().width();
				url = url.match(/youtube\.com\/watch\?v=/) ? url.replace(/.*\?v=(\w+)/, 'https://www.youtube.com/v/$1?version=3&autohide=1&feature=player_embedded') : url.replace(/.*\/(\w+)/, 'https://www.youtube.com/v/$1?version=3&autohide=1&feature=player_embedded');
				$(this).after('<div class="hz_closeYT"></div><object style="width: '+maxWidth+'px; height: '+(maxWidth * aspect)+'px;"><param name="movie" value="'+url+'"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="'+url+'" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="'+maxWidth+'" height="'+(maxWidth * aspect)+'"></object>').addClass('hz_yt-in-post').css({display: 'block', fontWeight: 'bold', marginRight: 11});
			}
		}
	},
	// Append album download button to post
	album_post: function(obj){
		var url = obj.href;
		if (url.match(/\/photos\/\w+\/albums\/\w+/)){
			var button = $('<div class="hz_albumDownload hz_dlButton" aria-label="'+lang.al01+'" data-tooltip="'+lang.al01+'" role="button"><span></span></div>').data('url', url);
			$(obj).parentsUntil('.ii').next().children().eq(-1).before(button);
		}
	},
	// Append album download button to album page
	album_page: function(obj, url){
		var button = $('<div class="hz_in-albumDownload hz_button blue" role="button">'+lang.fs03+'</div>').data('url', url);
		obj.data('class', true).next().find('.Rqa').children().eq(1).before(button);
	},
	// Process links in posts
	post: function(obj){
		var url = obj.href;

		if (url.match(picRegex)){
			var auto = $(obj).parentsUntil('.ci').next().find('.ot-anchor').attr('href');

			if (url != auto){
				var width = $(obj).parent().width();
				$(obj).addClass('hz_img-in-post').html('<img src="'+url+'"'+(options.hz_direct_post_max > 0 ? ' style="max-width:' + options.hz_direct_post_max + 'px"' : '')+'>');
			}
		}
	},
	// Process Youtube video in posts
	tube: function(obj){
		var button = $('<div class="hz_tubeStacks hz_dlButton" aria-label="'+lang.ytdl01+'" data-tooltip="'+lang.ytdl01+'" role="button"><span></span></div>').data('url', $(obj).find('.ot-anchor').attr('href'));
		$(obj).parentsUntil('.ii').next().children().eq(-1).before(button);
	},
	// Display download links below pictures
	links: function(obj){
		var target = $(obj).find('.aG, .hz_img-in-post img'),
			length = target.length;

		if (length > 1){
			var postid = obj.parentNode.parentNode.parentNode.id;

			var link = $('<div class="hz_dlButton" aria-label="'+lang.piclink01+' ('+length+' '+lang.set08+')" data-tooltip="'+lang.piclink01+' ('+length+' '+lang.set08+')" role="button"><span></span><small>'+length+'</small></div>').click(function(){
				if (options.hz_dl_link_option === '2'){
					for (var i=0; i<length; i++){
						var url = target[i].src;
						url = url.match(/\?sz|\/proxy/) ? url.replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : url.replace(picasaRegex,'/s0/$2');
						openWindow(url);
					}
				} else {
					if (!$(this).next().hasClass('hz_stacksDetail')){
						var html = '<div class="hz_closeButton"></div><strong>'+lang.piclink01+'</strong>';

						for (var i=0; i<length; i++){
							var url = target[i].src,
								id = postid + '-' + i;

							url = url.match(/\?sz|\/proxy/) ? url.replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : url.replace(picasaRegex,'/s0/$2');
							if (options.hz_dl_link_option === '0'){
								html += '<div class="hz_stackItem" data-original="'+url+'"><label for="'+id+'"><img src="'+url.replace(/\/s0\//, '/w54-h54-p/')+'" width="54" height="54"></label><input id="'+id+'" type="checkbox"></div>';
							} else {
								html += i == 0 ? '<a href="'+url+'">'+(i+1)+'</a>' : ' - <a href="'+url+'">'+(i+1)+'</a>';
							}
						}

						if (options.hz_dl_link_option === '0') html += '<nav><a class="hz_stacks_downloadSelected" href="javascript:void(0)">'+lang.fs03+'</a><a class="hz_stacks_selectAll" href="javascript:void(0)">'+lang.piclink03+'</a></nav>';

						var popup = $('<div class="hz_stacksDetail">'+html+'</div>').on('click', '.hz_closeButton', function(){
							$(this).parent().fadeOut(300);
						});

						if (options.hz_dl_link_option === '1'){
							popup.on('click', 'a', function(){
								openWindow(this.href);
								return false;
							});
						}

						$(this).after(popup).next().fadeIn(300).offset({left: $(this).offset().left - 13, top: $(this).offset().top + 31}).parentsUntil('.ow').next().find('.ii').css('position', 'static');
					} else {
						if ($(this).next().is(':hidden')){
							$(this).next().fadeIn(300).offset({left: $(this).offset().left - 13, top: $(this).offset().top + 31});
						} else {
							$(this).next().fadeOut(300);
						}
					}
				}
			});
		} else if (length == 1){
			var url = target[0].src;
			url = url.match(/\?sz|\/proxy/) ? url.replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : url.replace(picasaRegex,'/s0/$2');
			var link = $('<a class="hz_dlButton" href="'+url+'" aria-label="'+lang.piclink01+'" data-tooltip="'+lang.piclink01+'" role="button"><span></span></a>').on('click', function(){
				openWindow(url);
				return false;
			});
		}

		$(obj).next().children().eq(-1).before(link);
	},
	// Resize photos in normal post to stream width
	maxPic_normal: function(obj){
		var target = $(obj).children('.Yj'),
			length = target.length,
			parentWidth = $(obj).width(),
			original = [],
			modified = [],
			button = $('<div class="hz_dlButton hz_maxPicResize" aria-label="'+lang.maxpic01+'" data-tooltip="'+lang.maxpic01+'"><span></span></div>').click(function(){
				if (target.eq(0).hasClass('hz_maxPic_container')){
					target.each(function(i){
						$(this).removeClass('hz_maxPic_container').children().children().attr('src', original[i]);
					});
				} else {
					target.each(function(i){
						$(this).addClass('hz_maxPic_container').children().children().attr('src', modified[i]);
					});
				}

				$(document).scrollTop(this.parentNode.parentNode.parentNode.parentNode.offsetTop);
			});
		
		target.each(function(i){
			var children = this.childNodes[0].childNodes[0],
				src = children.src;
			original.push(src);
			src = length == 3 && i > 0 && options.hz_maxpic_option === '1' ? src.replace(picasaRegex, '/w'+parseInt(parentWidth/2)+'-h'+parseInt(parentWidth/2)+'-p/$2') : src.replace(picasaRegex, '/w'+parentWidth+'/$2');
			
			children.src = src;
			modified.push(src);
			$(this).addClass('hz_maxPic_container');
		});

		$(obj).parentsUntil('.ii').next().children().eq(-1).before(button);
	},
	// Resize photos in shared post to stream width
	maxPic_shared: function(obj){
		var parentWidth = $(obj).parent().parent().width(),
			target = obj.childNodes[1],
			original, modified,
			button = $('<div class="hz_dlButton hz_maxPicResize" aria-label="'+lang.maxpic01+'" data-tooltip="'+lang.maxpic01+'"><span></span></div>').click(function(){
				if ($(obj).hasClass('hz_maxPic_container')){
					target.src = original;
					$(obj).parent().removeClass('hz_maxPic_container');
				} else {
					target.src = modified;
					$(obj).parent().addClass('hz_maxPic_container');
				}

				$(document).scrollTop(this.parentNode.parentNode.parentNode.parentNode.offsetTop);
			});

		var src = target.src;
		original = src;
		src = src.match(/\?sz|\/proxy/) ? src.replace(/resize_\D?=\d+/, 'resize_w='+parentWidth) : src.replace(picasaRegex,'/w'+parentWidth+'/$2');
		modified = src;
		target.src = src;
		obj.removeChild(obj.childNodes[0]);
		$(obj).parent().addClass('hz_maxPic_container').parentsUntil('.ii').next().children().eq(-1).before(button);
	}
};

// Execute every 2.5s
var timer = new function(){
	var P = process;

	// Process links in comments
	var comment = function(){
		$('.Mi .ot-anchor').each(P.comment);
	};

	// Append album download button
	var album = function(){
		var page = location.href.replace(/\?(.*)/, '');

		if (page.match(/\/photos\/\w+\/albums\/\w+/)){
			var $nav = $('.kI:visible');
			if (!$nav.data('class')){
				P.album_page($nav, page);
			}
		} else {
			$('.pc').each(function(){
				if (!$(this).data('class')){
					P.album_post(this);
					$(this).data('class', true);
				}
			});
		}
	};

	// Process links in posts
	var post = function(){
		$('.VC .ot-anchor').each(function(){
			if (!$(this).data('class')){
				P.post(this);
				$(this).data('class', true);
			}
		});
	};

	// Process Youtube video in posts
	var tube = function(){
		$('.oi').each(function(){
			if (!$(this).data('class')){
				P.tube(this);
				$(this).data('class', true);
			}
		});
	};

	// Display download links below pictures
	var links = function(){
		$('.ci').each(function(){
			if (!$(this).data('class')){
				P.links(this);
				$(this).data('class', true);
			}
		});
	};

	// Resize photos to stream width
	var maxPic = function(){
		$content.find('.dv').filter(':visible').each(function(){
			if (!$(this).data('class')){
				P.maxPic_normal(this);
				$(this).data('class', true);
			}
		});

		$content.find('.Mn.ot-anchor').filter(':visible').each(function(){
			if (!$(this).data('class')){
				P.maxPic_shared(this);
				$(this).data('class', true);
			}
		});
	};

	var chain = [comment],
		timeout;

	if (options.hz_album === 'true') chain.push(album);
	if (options.hz_direct_post === 'true') chain.push(post);
	if (options.hz_ytdl === 'true') chain.push(tube);
	if (options.hz_dl_link === 'true') chain.push(links);
	if (options.hz_maxpic === 'true') chain.push(maxPic);

	var main = function(){
		for (var i=0, len=chain.length; i<len; i++){
			chain[i]();
		}

		timeout = setTimeout(main, 2500);
	};

	return {
		start: function(){
			timeout = setTimeout(main, 2500);
		},
		stop: function(){
			clearTimeout(timeout);
		}
	}
};

// Eco-mode
var ecomode = new function(){
	var P = process;

	var post = function(){
		if (!$(this).data('class')){
			if (options.hz_album === 'true'){
				$(this).find('.pc').each(function(){
					P.album_post(this);
				});
			}
			if (options.hz_direct_post === 'true'){
				$(this).find('.VC .ot-anchor').each(function(){
					P.post(this);
				});
			}
			if (options.hz_ytdl === 'true'){
				$(this).find('.oi').each(function(){
					P.tube(this);
				})
			}
			if (options.hz_dl_link === 'true'){
				$(this).find('.ci').each(function(){
					P.links(this);
				});
			}
			if (options.hz_maxpic === 'true'){
				$(this).find('.dv').filter(':visible').each(function(){
					P.maxPic_normal(this);
				});

				$(this).find('.Mn.ot-anchor').filter(':visible').each(function(){
					P.maxPic_shared(this);
				});
			}
			$(this).data('class', true);
		}
	};

	var comment = function(){
		$(this).find('.Mi .ot-anchor').each(P.comment);
	};

	var album = function(){
		if (!$(this).data('class')){
			P.album_page($('.kI:visible'), location.href.replace(/\?(.*)/, ''));
			$(this).data('class', true);
		}
	};

	return {
		start: function(){
			$('body').on('mouseenter', '.ii', post).on('mouseenter', '.Ho', comment).on('mouseenter', '.UW', album);
		},
		stop: function(){
			$('body').off('mouseenter', '.ii', post).off('mouseenter', '.Ho', comment).off('mouseenter', '.UW', album);
		}
	}
};

// Settings page events
var setPage = new function(){
	var $set = $('#hz_set_page'),
		$list = $set.find('.menu li'),
		$tab = $set.find('.tabs div');
	return {
		open: function(){
			$set.fadeIn(300).find(':text').each(function(){
				$(this).val(options[$(this).attr('id')]);
			}).end()
			.find('select').each(function(){
				$(this).children('option[value="'+options[$(this).attr('id')]+'"]').prop('selected', true);
			}).end()
			.find(':checkbox').each(function(){
				if (options[$(this).attr('id')] === 'true') $(this).prop('checked', true);
			});
		},
		close: function(){
			$set.fadeOut(300);
		},
		save: function(){
			$set.find(':text').each(function(){
				localStorage[$(this).attr('id')] = $(this).val();
			});
			$set.find('select').each(function(){
				localStorage[$(this).attr('id')] = $(this).find(':selected').val();
			});
			$set.find(':checkbox').each(function(){
				localStorage[$(this).attr('id')] = $(this).prop('checked').toString();
			});
			location.reload();
		},
		reset: function(){
			var sure = confirm(lang.set04);
			if (sure){
				for (var opt in options){
					localStorage.removeItem(opt);
				}
				location.reload();
			}
		},
		tab: function(i, teleport){
			var $current = $list.parent().children('.current'),
				gap = 590 * (i - $current.attr('tabid')),
				height = $tab.eq(i).height();

			if (i == 4){
				$set.find('.hz_button').hide().filter('.update').show();
			} else {
				$set.find('.hz_button').show().filter('.update').hide();
			}

			$current.removeClass('current');
			$list.eq(i).addClass('current');

			if (teleport){
				$set.children('.main').css('height', height + 140)
				.find('.tabs').css('left', '-='+gap);
			} else {
				$set.children('.main').animate({height: height + 140}, 300)
				.find('.tabs').animate({left: '-='+gap}, 300);
			}
		}
	}
};

// Check for update
var update = new function(){
	var $set = $('#hz_set_page'),
		$meta = $('#hz_set_page').find('.meta');

	if (developer) $meta.html(lang.update09);

	$set.find('.update').on('click', function(){
		openWindow(this.href, true);
		$meta.html(lang.update15).attr('class', 'meta red');
		return false;
	});

	var fetch = function(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://sites.google.com/site/hoverzoomplus/sources/version.json?attredirects=0&d=1',
			onerror: function(){
				$meta.html(lang.update08+' (<a id="hz_checkupdate" href="javascript:void(0)">'+lang.update13+'</a>)').addClass('red');
			},
			onload: function(data){
				var data = JSON.parse(data.responseText),
					nowVer = version.split('.'),
					newVer = data.version.split('.'),
					content = data.content[options.hz_language] || data.content['en-US'];

				if (version == data.version){
					$meta.html(lang.update07).addClass('green');
				} else {
					var length = nowVer.length > newVer.length ? nowVer.length : newVer.length;
					for (var i=0; i<length; i++){
						if (typeof nowVer[i] == 'undefined') nowVer[i] = 0;
						if (typeof newVer[i] == 'undefined') newVer[i] = 0;

						if (newVer[i] > nowVer[i]){
							var html = '<strong>'+data.version+'</strong>:<br><ul>';
							for (var j=0, len=content.length; j<len; j++){
								html += '<li>'+content[j]+'</li>';
							}

							$meta.html(lang.update11+' <strong>'+data.version+'</strong> '+lang.update12).addClass('orange');
							$set.find('.menu li').eq(4).css('display', 'inline-block');
							$set.find('.tabs div').eq(4).html(html+'</ul>');
							if ($set.is(':hidden')) setPage.open();
							setPage.tab(4, true);
							break;
						} else if (nowVer[i] > newVer[i]){
							$meta.html(lang.update07).addClass('green');
							break;
						}
					}
				}
			}
		})
	};

	var manual = function(){
		$meta.html(lang.update13).attr('class', 'meta');
		fetch();
	};

	$('#hz_checkupdate').on('click', manual);
	return {
		auto: fetch,
		manual: manual
	}
};

// CSS
GM_addStyle("#hoverzoom{position:fixed;box-shadow:0 4px 16px rgba(0,0,0,0.2);z-index:10002;display:none;background:rgba(255,255,255,0.5)}#hoverzoom img{display:block;margin:5px}#hoverzoom small{display:block;text-align:center;line-height:1;margin:0 5px 5px}#hz_loading{width:20px;height:20px;box-shadow:0 -2px 1px 1px #dd4839;position:absolute;pointer-events:none;z-index:10000;display:none;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;animation:loading infinite 0.8s linear;-moz-animation:loading infinite 0.8s linear;-webkit-animation:loading infinite 0.8s linear}#hoverzoom_db{position:fixed;top:45%;right:-40px;background:#f5f5f5;border:1px solid #d2d2d2;border-right:none;box-shadow:0 0 5px rgba(0,0,0,0.1);width:37px;height:37px;-webkit-border-radius:2px 0 0 2px;-moz-border-radius:2px 0 0 2px;border-radius:2px 0 0 2px;-webkit-transition:0.3s;-moz-transition:0.3s;transition:0.3s}#hoverzoom_db:hover div{background:#666}#hoverzoom_db.enable{right:0}#hoverzoom_db div{margin:6px;width:25px;height:25px;background:#aaa;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;-webkit-transition:0.3s;-moz-transition:0.3s;transition:0.3s}#hoverzoom_db div:before,#hoverzoom_db div:after{position:absolute;content:''}#hoverzoom_db div:before{width:6px;height:8px;background:#f5f5f5;top:12px;left:15px}#hoverzoom_db div:after{border-style:solid;border-width:7px 8px;border-color:#f5f5f5 transparent transparent;top:19px;left:10px}#hoverzoom_sc{position:absolute;z-index:10005;box-shadow:0 4px 16px rgba(0,0,0,0.2);display:none}#hoverzoom_sc a,#hoverzoom_sc span{outline:none;cursor:pointer;color:#3366CC}#hoverzoom_sc a{border-right:1px solid #eee;padding-right:5px}#hoverzoom_sc span{border-left:1px solid #eee;padding-left:5px}#hoverzoom_sc span:hover{text-decoration:underline}div[id^='update-']:hover .hz_dlButton{background-color:#fff;border-color:#ddd;background:-webkit-gradient(linear, 50% 100%, 50% 0%, color-stop(0%, rgba(0,0,0,0.05)), color-stop(100%, rgba(0,0,0,0)));background:-webkit-linear-gradient(center bottom, rgba(0,0,0,0.05),rgba(0,0,0,0) 20px);background:-moz-linear-gradient(center bottom, rgba(0,0,0,0.05),rgba(0,0,0,0) 20px);background:linear-gradient(center bottom, rgba(0,0,0,0.05),rgba(0,0,0,0) 20px);-webkit-transition:border 0.218s;-moz-transition:border 0.218s;transition:border 0.218s}.hz_dlButton{border:1px solid #fff;cursor:pointer;float:left;height:22px;margin-left:7px;margin-top:7px;outline:none;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}.hz_dlButton:hover{border-color:#bbb !important}.hz_dlButton:active{background-color:#eee;background:-webkit-gradient(linear, 50% 0%, 50% 20, color-stop(0%, rgba(0,0,0,0.1)), color-stop(100%, rgba(0,0,0,0))) !important;background:-webkit-linear-gradient(center top, rgba(0,0,0,0.1),rgba(0,0,0,0) 20px) !important;background:-moz-linear-gradient(center top, rgba(0,0,0,0.1),rgba(0,0,0,0) 20px) !important;background:linear-gradient(center top, rgba(0,0,0,0.1),rgba(0,0,0,0) 20px) !important}.hz_dlButton span{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOTVGRUM4QzBDRTdFMzVBMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0QTQ2OEY4MzdEM0QxMUUxODVCMzg1MkFCREYxQTU2QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0QTQ2OEY4MjdEM0QxMUUxODVCMzg1MkFCREYxQTU2QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDM4MDExNzQwNzIwNjgxMTk1RkVDOEMwQ0U3RTM1QTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTk1RkVDOEMwQ0U3RTM1QTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5gRh0uAAACPElEQVR42mxTyaoaURC917Ed24U8FSHiBPHhSjRrCbjIMkvX+QDBv3GXlQST5QOTjatHDIgTRtGF03saEXGOOLR2p6q1JQ4Fze2+fc+pqnPqUkEQCEa9Xif5fF58VygUKqVSaZVBwCfFrf1+/5fjuAHP8+IZn89HAoEAUZBTpNNpEo/HxXeLxfLg8Xg+mUwmATgEADK9Xq/SbDaT6/VaPBOLxS4JjskIUalUxG6301AoJIeVRwIElUolMhqNiEQgl8uP1ZKroJQiCTUYDALLsmIF0JKg0WioBPo/ZOROAIkMtbl+7sVdgiMHpdcb90jOBGq1WnIA+9tf4ZGAP/07t3rWIJFIvE2lUo9ut5vT6/XUZrOxDMOgXwJmRUJwxOZ0Oj8ajUY6n8/Vs9msC5b+FAkikcggm81+8Hq9b4BgA4d4WDkpO2TmwRFWq9W+22w2ina7vfX7/c/onNiCy+WaR6PRzwD6A1XwVquVk1rCCvAgOMI7HA4OqtvCXhIG6/VCg/F4PG00Gl+Wy+UO+rvxC0jodrtVdbvd75VKpTaZTC5FnE6npFAovALJt8ViQa8dAjAD4GyxWHzudDr4fUkA40oGgwGSVGFkn1arlfLkHv5j+v3+b5jGJ0hwMRc3k9hqtdDSXzCNLNyH9yjgcDh8KZfLX2u12gHUv7URA0QRV9AAq8CsP0BxIyjvqlaryVwut5HAGLvd7kgklYKgTCZzZtfpdMRsNsOtVhpAsAmCD4fDmSAYDJJwOEz+CTAAkzojkqhZvcwAAAAASUVORK5CYII=') center no-repeat;width:32px;height:22px;display:-moz-inline-box;-moz-box-orient:vertical;display:inline-block;vertical-align:middle;*vertical-align:auto}.hz_dlButton span{*display:inline}.hz_dlButton small{color:#999;display:block;float:right;line-height:22px;padding-right:10px}.hz_albumDownload span{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0QTQ2OEY4NjdEM0QxMUUxODVCMzg1MkFCREYxQTU2QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0QTQ2OEY4NzdEM0QxMUUxODVCMzg1MkFCREYxQTU2QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRBNDY4Rjg0N0QzRDExRTE4NUIzODUyQUJERjFBNTZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRBNDY4Rjg1N0QzRDExRTE4NUIzODUyQUJERjFBNTZCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+eiSpJgAAArhJREFUeNpMk81PGlEUxR/MMEBAQIYPQVuNttpojFgXbdpF06TpH9Ckm/6FdWnapJtuuumqxJRECKmoBBBQGPkSkM/+ri2GmwzMvHnn3PPOPaOrudI0TblcLmWapm95eXljcXExIOvtdrteqVSKl5eXVrfbVdPp9AGjy4/NZlNOp1OFw2FbNBrdCgaDjpWVlXeQeAzDUIBGuVwuz54jiFoQqsFgcE+kCYF0XV1ddR8cHHzY3d19KwS6rh+73e7HgUBA9/l8dsqJwpHf738B5Oz29nZEKY2NKhaL2QF/TCQSz5aWlhRAky6ucrn8czgcxnk22NxFaYn3Lz0eT6DRaGQgURod1M7ODtjE60gkcu+DyCsWi1o6nf5erVbTNNlErjGZTPIccwNMBLB1c3NT1dbW1sy9vb33HMHrcDhUq9VSp6en1VQq9Zlz12u1WgcPzlFi4kc7FAqtcwyFIm+9Xj/Xtre3N1HwnEV7s9lU2Wy2kEwmDyGxOp2Ouru7E1IhybInHI/HnwrBeDz2QFDSvV5vkM6aOJvP5/9kMpmji4uLjoBn45LRIXcg05A1DBWfBBvSkWa3LEsWjyFpcv515KXmZy33s2tWMnopOyYVCMgPQD2C8wZ5hnghG+YvAfd6PSXNrq6uFLgJqmr69fX1GaGJAXwl0hYWFiaESYPMNusiJYGCuMT+bwBtpVKpz6TOdcYxRnqXESnJBEBjf3//E+fzMdLpvGSexxImSBxk5CtqujrGTAuFQhLXn+DwFuZoRDhKJrySifmS5OG8wuQMKir9fl9p0pmbKVeOkYXo1CEoj0SJeCEk0l3CRSZkzKmTk5MveID/w38fk8yaEfaQdEhU/XixIdknsvr/MY4wrkywfqH0t5gohA9fozgsciASJQ3+vzKZOD6Y8p5M1AEV6WpJXuQos/orwADII7vGiuTGvgAAAABJRU5ErkJggg==')}.hz_tubeStacks span{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowODgwMTE3NDA3MjA2ODExOTVGRUM4QzBDRTdFMzVBMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNjE1RkQ0QzdENjExMUUxODVCMzg1MkFCREYxQTU2QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNjE1RkQ0QjdENjExMUUxODVCMzg1MkFCREYxQTU2QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTREQzY5MjUzNDIwNjgxMTk1RkVDOEMwQ0U3RTM1QTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDg4MDExNzQwNzIwNjgxMTk1RkVDOEMwQ0U3RTM1QTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5tk53MAAABoklEQVR42qRTy07CQBSdaYdCtbxiCxpCF4XQEAN26daVMcR/8Nv8A3d+gAt/ABPamBiIsQFiAFOQlrbe21hCoOKCm8xmZs45954zQ8MwJIcURw4sKssy0XX9vNFodLLZLIO94D/R2Wzmmab50Ov1TKaqqmYYxnW9Xj/KZDLrW/FolNIdhsViIYiieDOfz12+3W5fNJtNvVAoEI7jIoDv+wQPl8slhT3KGFuf4UqlUsgjfkIxQRAIXthUAiAZDAYvcG6Xy+WrSqWSBsWIJO4KcbB4ljTkarUio9HI73a7z5Ik2a1Wq6NpmpLL5dYkv0ThnykACR2PxwSMerMs634ymdhBsOsv22c3tgnGcuCPASOcbKrvJcAZoXWvVqtJpVLpFiLWi8ViYiJIQJOUq9WqCuA7AMo4O8/ziVrM87wQTcPcYwUkAPBZpLCVUPxGEOO6bsDAqI/hcOjAjMcI3C58E9sFQGLb9hck9c76/b4F4EfHcS5hbnTpv99F4Sn7kMwTYF+jV5bP53lFUU6BKI3Z7kND+xTEvqFzezqdBvTQ7/wjwADqd6xM1ZfYcQAAAABJRU5ErkJggg==')}.hz_maxPicResize span{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExQTdCQTg2NEY5OUVERjdGNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMDFDRkE1NjkxMTcxMUUxQUNEQ0RDNTc1RkVFOUI1NyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMDFDRkE1NTkxMTcxMUUxQUNEQ0RDNTc1RkVFOUI1NyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkE3RjExNzQwNzIwNjgxMUE3QkE4NjRGOTlFREY3RjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Rjc3RjExNzQwNzIwNjgxMUE3QkE4NjRGOTlFREY3RjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7AhljBAAABoUlEQVR42qxTyU7CUBR9bbEtYzGRMW4Y2oULsLg3hEjDF/ibxhg/wIUmLiiU6AISsRQTItACQkMHod52bUoTfdube+6ZHuY4DvrLw4IAlMtltlAoVBmGMXEcR9vtFo3HY6Xb7UqhIFcIgvjKZrNJlmVPw+EwWq/XCMMwd1fCgwD0+/1PWHiJRCIokUigeDyOaJr+dmeBAJrNZjWdTtdt20aqqlq6riOQTrgzXwmpVIqoVCpVnudbsViMHA6H7/P5/JEkyfpisTgMAHSZXC7XoiiKHI1GSqfTuQXjlmCout/vad8UisXiMRimZzIZHrRziqLc93o9LVCMjUbjAi5fTSaTB1mWnzebTWg6ndq/HfIklEolFqLSBoOBCoad12o1AWhTENcZGCbCsuVbJEEQroFqEkryCm5fRqNRCih/tNvtG0mSVD+fPAbQMIPjuDxozVuWhcDtN1EU72B5eShirwdQEgeKgSAqN19rNps9uW4H6YgHYBgG7tZztVoh0zSPQH4dUjgJAuBJAL0yXN67PYd8cU3T8N1uR/7bb/R7PwIMAJn1wP1PMCwYAAAAAElFTkSuQmCC')}.hz_in-albumDownload{margin-left:16px;margin-right:2px;display:-moz-inline-box;-moz-box-orient:vertical;display:inline-block;vertical-align:middle;*vertical-align:auto}.hz_in-albumDownload{*display:inline}.hz_button{position:relative;cursor:pointer;font-size:11px;font-weight:bold;height:27px;line-height:27px;min-width:54px;outline:none;padding:0 8px;text-align:center;text-decoration:none !important;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;user-select:none;-moz-user-select:none;-webkit-user-select:none}.hz_button.green{background-color:#3D9400;border:1px solid #29691D;color:#fff;text-shadow:0 1px rgba(0,0,0,0.1);background:-webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, #3d9400), color-stop(100%, #398a00));background:-webkit-linear-gradient(left top, #3d9400,#398a00);background:-moz-linear-gradient(left top, #3d9400,#398a00);background:linear-gradient(left top, #3d9400,#398a00)}.hz_button.green:hover{background-color:#368200;border:1px solid #2D6200;text-shadow:0 1px rgba(0,0,0,0.3);background:-webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, #3d9400), color-stop(100%, #368200));background:-webkit-linear-gradient(left top, #3d9400,#368200);background:-moz-linear-gradient(left top, #3d9400,#368200);background:linear-gradient(left top, #3d9400,#368200)}.hz_button.green:focus,.hz_button.green:active{box-shadow:0 0 0 1px #fff inset}.hz_button.blue{background-color:#4D90FE;border:1px solid #3079ed;color:#fff;background:-webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, #4d90fe), color-stop(100%, #4787ed));background:-webkit-linear-gradient(left top, #4d90fe,#4787ed);background:-moz-linear-gradient(left top, #4d90fe,#4787ed);background:linear-gradient(left top, #4d90fe,#4787ed)}.hz_button.blue:hover{background-color:#357AE8;border:1px solid #2F5BB7;background:-webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, #4d90fe), color-stop(100%, #357ae8));background:-webkit-linear-gradient(left top, #4d90fe,#357ae8);background:-moz-linear-gradient(left top, #4d90fe,#357ae8);background:linear-gradient(left top, #4d90fe,#357ae8)}.hz_button.blue:focus,.hz_button.blue:active{box-shadow:0 0 0 1px #fff inset}.hz_button.white{background-color:#F5F5F5;border:1px solid rgba(0,0,0,0.1);color:#444;background:-webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, #f5f5f5), color-stop(100%, #f1f1f1));background:-webkit-linear-gradient(left top, #f5f5f5,#f1f1f1);background:-moz-linear-gradient(left top, #f5f5f5,#f1f1f1);background:linear-gradient(left top, #f5f5f5,#f1f1f1)}.hz_button.white:hover{background-color:#F8F8F8;border:1px solid #c6c6c6;color:#333;background:-webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, #f8f8f8), color-stop(100%, #f1f1f1));background:-webkit-linear-gradient(left top, #f8f8f8,#f1f1f1);background:-moz-linear-gradient(left top, #f8f8f8,#f1f1f1);background:linear-gradient(left top, #f8f8f8,#f1f1f1)}.hz_button.white:focus,.hz_button.white:active{box-shadow:0 1px 2px rgba(0,0,0,0.1) inset}.hz_button.orange{background-color:#D14836;color:#fff;text-shadow:0 1px rgba(0,0,0,0.1);border:1px solid transparent;background:-webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, #dd4b39), color-stop(100%, #d14836));background:-webkit-linear-gradient(left top, #dd4b39,#d14836);background:-moz-linear-gradient(left top, #dd4b39,#d14836);background:linear-gradient(left top, #dd4b39,#d14836)}.hz_button.orange:hover{background-color:#C53727;border:1px solid #B0281A;box-shadow:0 1px 1px rgba(0,0,0,0.2);background:-webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, #dd4b39), color-stop(100%, #c53727));background:-webkit-linear-gradient(left top, #dd4b39,#c53727);background:-moz-linear-gradient(left top, #dd4b39,#c53727);background:linear-gradient(left top, #dd4b39,#c53727)}.hz_button.orange:focus,.hz_button.orange:active{box-shadow:0 0 0 1px #fff inset}#hoverzoom_fs{position:fixed;top:0;left:0;height:100%;width:100%;z-index:10010;display:none;background:rgba(0,0,0,0.8);color:#ccc;text-shadow:1px 1px 2px #000;overflow:auto}#hoverzoom_fs.zoom .ctrl .right .zoom{display:inline-block}#hoverzoom_fs.load .loading{opacity:0.8}#hoverzoom_fs.multi .ctrl .center{display:block}#hoverzoom_fs.actual .ctrl .right .zoom ul li:last-of-type{display:block}#hoverzoom_fs .back{position:absolute;top:0;left:0;width:100%;height:100%}#hoverzoom_fs .main{position:absolute}#hoverzoom_fs .main img{opacity:0;box-shadow:0 4px 16px rgba(0,0,0,0.2);max-width:0;max-height:0;display:block}#hoverzoom_fs .ctrl{position:absolute;top:0;width:100%;height:100px;margin-top:-50px;opacity:0;-webkit-transition:opacity 0.5s,margin 0.5s;-moz-transition:opacity 0.5s,margin 0.5s;transition:opacity 0.5s,margin 0.5s;background:-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, rgba(0,0,0,0.8)), color-stop(50%, rgba(0,0,0,0)));background:-webkit-linear-gradient(top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 50%);background:-moz-linear-gradient(top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 50%);background:linear-gradient(top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 50%)}#hoverzoom_fs .ctrl:hover{margin-top:0;opacity:1}#hoverzoom_fs .ctrl div{-webkit-transition:0.3s;-moz-transition:0.3s;transition:0.3s}#hoverzoom_fs .ctrl div:before,#hoverzoom_fs .ctrl div:after{content:'';position:absolute}#hoverzoom_fs .ctrl .close{position:absolute;left:23px;opacity:0.3;height:50px;cursor:pointer}#hoverzoom_fs .ctrl .close:hover{opacity:1}#hoverzoom_fs .ctrl .close:before,#hoverzoom_fs .ctrl .close:after{background:#fff;height:32px;bottom:10px;width:5px}#hoverzoom_fs .ctrl .close:before{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);transform:rotate(-45deg)}#hoverzoom_fs .ctrl .close:after{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);transform:rotate(45deg)}#hoverzoom_fs .ctrl .center{position:absolute;left:50%;top:15px;width:200px;margin-left:-100px;text-align:center;display:none}#hoverzoom_fs .ctrl .center .prev,#hoverzoom_fs .ctrl .center .next{position:absolute;top:5px;cursor:pointer;opacity:0.3}#hoverzoom_fs .ctrl .center .prev:hover,#hoverzoom_fs .ctrl .center .next:hover{opacity:1}#hoverzoom_fs .ctrl .center .prev:before,#hoverzoom_fs .ctrl .center .next:before{top:50%;border-top:5px solid #fff;border-left:5px solid #fff;width:10px;height:10px}#hoverzoom_fs .ctrl .center .prev{left:0}#hoverzoom_fs .ctrl .center .prev:before{left:0;-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);transform:rotate(-45deg)}#hoverzoom_fs .ctrl .center .next{right:0}#hoverzoom_fs .ctrl .center .next:before{right:0;-webkit-transform:rotate(135deg);-moz-transform:rotate(135deg);transform:rotate(135deg)}#hoverzoom_fs .ctrl .center span{font-size:20px}#hoverzoom_fs .ctrl .right{float:right;margin:15px 25px;position:relative}#hoverzoom_fs .ctrl .right a{color:#ccc;margin-left:20px;-webkit-transition:0.3s;-moz-transition:0.3s;transition:0.3s}#hoverzoom_fs .ctrl .right a:hover{color:#fff;text-decoration:none}#hoverzoom_fs .ctrl .right small{font-size:13px}#hoverzoom_fs .ctrl .right .zoom{margin-left:20px;padding-right:15px;display:none;position:relative;cursor:pointer}#hoverzoom_fs .ctrl .right .zoom:after{border-style:solid;border-color:#ccc transparent transparent;border-width:5px;top:6px;right:0}#hoverzoom_fs .ctrl .right .zoom:hover{color:#fff;border-top-color:#fff}#hoverzoom_fs .ctrl .right .zoom:hover ul{display:block}#hoverzoom_fs .ctrl .right .zoom ul{position:absolute;top:100%;right:0;list-style:none;color:#ccc;margin:0;padding:5px 0 0;white-space:nowrap;font-size:12px;z-index:10020;display:none}#hoverzoom_fs .ctrl .right .zoom ul li{padding:5px 10px;background:rgba(0,0,0,0.8)}#hoverzoom_fs .ctrl .right .zoom ul li:hover{background:#000;color:#fff}#hoverzoom_fs .ctrl .right .zoom ul li:last-of-type{display:none}#hoverzoom_fs .loading{background:#000;border-radius:50%;width:50px;height:50px;overflow:hidden;position:absolute;top:50%;left:50%;margin-top:-25px;margin-left:-25px;opacity:0;-webkit-transition:0.3s;-moz-transition:0.3s;transition:0.3s;animation:loading 2s infinite linear;-moz-animation:loading 2s infinite linear;-webkit-animation:loading 2s infinite linear}#hoverzoom_fs .loading:before,#hoverzoom_fs .loading:after{position:absolute;content:''}#hoverzoom_fs .loading:before{border:5px solid #fff;border-radius:50%;height:24px;width:24px;top:8px;left:8px}#hoverzoom_fs .loading:after{background:#000;content:'';height:12px;width:36px;top:30px;left:7px}.hz_settings{position:fixed;top:0;left:0;width:100%;height:100%;display:none;z-index:10000}.hz_settings.loading .cycle{opacity:1 !important;animation:loading infinite 0.8s linear;-moz-animation:loading infinite 0.8s linear;-webkit-animation:loading infinite 0.8s linear}.hz_settings .back{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.75);z-index:10000}.hz_settings .wrap{display:inline-block;overflow-x:hidden;overflow-y:auto;margin:10px 0}.hz_settings .wrap img{margin-right:10px;margin-top:5px}.hz_settings .main{position:absolute;top:50%;left:50%;width:550px;height:296px;margin-top:-250px;margin-left:-285px;background:#fff;border:1px solid #acacac;border-bottom:1px solid #999;box-shadow:0 4px 16px rgba(0,0,0,0.2);z-index:10001;border-radius:2px;padding:20px;overflow:hidden}.hz_settings .main h3{font-size:20px;font-weight:normal;margin:0}.hz_settings .main small{color:#666}.hz_settings .main .close{background:url(//ssl.gstatic.com/s2/oz/images/dialogx.png) no-repeat;cursor:pointer;height:15px;width:15px;position:absolute;right:16px;top:16px}.hz_settings .main .menu{background:#f5f5f5;border-bottom:1px solid #ebebeb;border-top:1px solid #ebebeb;padding:0 5px 0 10px;margin:15px -20px 0}.hz_settings .main .menu li{display:inline-block;padding:7px 12px;color:#666;cursor:pointer}.hz_settings .main .menu li.current{font-weight:bold;color:#dd4839}.hz_settings .main .menu li:hover{color:#dd4839}.hz_settings .main .menu li:last-of-type{display:none}.hz_settings .main .tabs{border-top:1px solid #ddd;position:absolute;left:0;width:2950px;line-height:2}.hz_settings .main .tabs div{float:left;width:550px;padding:15px 20px 0}.hz_settings .main .tabs ul{padding-left:15px;margin:0}.hz_settings .main input[type='text']{border:1px solid #d9d9d9;padding:2px 5px;margin-right:5px;width:50px}.hz_settings .main input[type='checkbox']{margin:0 5px 0 0}.hz_settings .main label{margin-right:5px;display:inline-block;min-width:120px}.hz_settings .main input+label,.hz_settings .main select+label{min-width:0}.hz_settings .main textarea{border:1px solid #ccc;font:12px 'Consolas', Monaco, Courier New, Courier, monospace !important;height:251px;width:540px;padding:10px 0 0 10px;margin-top:10px;resize:none}.hz_settings .main .functions{position:absolute}.hz_settings .main .functions.top{top:20px;right:50px}.hz_settings .main .functions.top .hz_button{float:left;margin-right:16px}.hz_settings .main .functions.top .hz_button:last-child{margin-right:0}.hz_settings .main .functions.bottom{bottom:20px;left:20px;width:550px}.hz_settings .main .functions.bottom .hz_button{float:right;margin-left:16px}.hz_settings .main .functions.bottom .hz_button.update{display:none}.hz_settings .main .functions.bottom .meta{position:absolute;bottom:5px;padding-left:15px;color:#666}.hz_settings .main .functions.bottom .meta:empty{display:none}.hz_settings .main .functions.bottom .meta:before{content:'';background:#666;width:5px;height:5px;position:absolute;top:5px;left:0;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;-webkit-box-shadow:0 0 3px #666;-moz-box-shadow:0 0 3px #666;box-shadow:0 0 3px #666}.hz_settings .main .functions.bottom .meta.green:before{background:#3D9400;-webkit-box-shadow:0 0 3px #3d9400;-moz-box-shadow:0 0 3px #3d9400;box-shadow:0 0 3px #3d9400}.hz_settings .main .functions.bottom .meta.red:before{background:red;-webkit-box-shadow:0 0 3px red;-moz-box-shadow:0 0 3px red;box-shadow:0 0 3px red}.hz_settings .main .functions.bottom .meta.orange:before{background:orange;-webkit-box-shadow:0 0 3px orange;-moz-box-shadow:0 0 3px orange;box-shadow:0 0 3px orange}.hz_settings .main .functions .cycle{float:left;border:3px solid #ccc;border-radius:50%;height:16px;width:16px;margin-right:10px;position:relative;top:4px;opacity:0;-webkit-transition:opacity 0.3s;-moz-transition:opacity 0.3s;transition:opacity 0.3s}.hz_settings .main .functions .cycle:before{content:'';position:absolute;bottom:-3px;right:-3px;width:12px;height:12px;background:#fff}#hz_copyarea .back{z-index:10001}#hz_opts{border-top:1px solid #e5e5e5;color:#333;margin-top:6px;padding-top:6px}#hz_opts strong,#hz_opts li{display:block;padding:6px 24px}#hz_opts ul{list-style:none;margin:0;padding:0}#hz_opts li{cursor:pointer}#hz_opts li:hover{background:#eee}#disable_hz{position:relative}#disable_hz:after{content:'';background:#3d9400;position:absolute;top:10px;left:10px;width:5px;height:5px;box-shadow:0 0 3px #3d9400;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%}#disable_hz.off:after{box-shadow:0 0 3px #666;background:#666}.hz_img-in-comm,.hz_img-in-post{display:block}.hz_img-in-comm img,.hz_img-in-post img{max-width:100%;height:auto;display:block}.hz_img-in-post img{margin:5px 0}.hz_img-in-post+br{display:none}.hz_yt-in-post{margin:3px 0}.hz_closeYT{background:url(//ssl.gstatic.com/s2/oz/images/stars/x_off.png) no-repeat;cursor:pointer;float:right;margin-top:-22px;width:10px;height:10px}.hz_closeYT:hover{background-image:url(//ssl.gstatic.com/s2/oz/images/stars/x_hover.png)}.hz_stacksDetail{position:absolute;top:25px;left:0;background:#fff;border:1px solid #ccc;box-shadow:0 2px 4px rgba(0,0,0,0.2);padding:16px;position:absolute;z-index:980;display:none;min-width:150px;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}.hz_stacksDetail strong{display:block;margin-bottom:8px}.hz_stacksDetail a:hover{text-decoration:none;border-bottom:1px solid #36c}.hz_stacksDetail small{color:#999;position:absolute;right:16px}.hz_stacksDetail .notify{color:#999;margin-right:-16px;padding:10px 0 5px;text-align:center}.hz_stacksDetail.loaded .notify{display:none}.hz_stacksDetail:before{position:absolute;top:-9px;left:20px;border-left:9px solid transparent;border-right:9px solid transparent;border-bottom:9px dashed #ccc;content:''}.hz_stacksDetail:after{position:absolute;top:-7px;left:20px;border-left:9px solid transparent;border-right:9px solid transparent;border-bottom:9px dashed #fff;content:''}.hz_stacksDetail .hz_stackItem{display:inline-block;margin-top:2px;margin-right:4px;position:relative}.hz_stacksDetail .hz_stackItem:nth-of-type(6n){margin-right:0}.hz_stacksDetail .hz_stackItem input{position:absolute;top:0;left:0}.hz_stacksDetail nav{border-top:1px solid #ccc;height:18px;margin-top:16px;padding-top:16px}.hz_stacksDetail nav a:hover{border:none;text-decoration:underline}.hz_stacksDetail nav a:first-child{display:none;float:left}.hz_stacksDetail nav a:last-child{float:right;margin-left:20px}.hz_closeButton{background:url(//ssl.gstatic.com/ui/v1/icons/common/x_8px.png) no-repeat;cursor:pointer;height:21px;width:21px;position:absolute;right:2px;top:2px;opacity:0.4;border:1px solid transparent}.hz_closeButton:active,.hz_closeButton:focus{opacity:1;border:1px solid #71a7ff}.hz_maxPic_container{max-width:100% !important;max-height:none !important;width:auto !important;height:auto !important;background-image:none !important;float:none !important}.hz_maxPic_container img{position:static !important;max-width:100%;border-bottom:1px solid #fff}.hz_maxPic_container .ot-anchor{display:block;margin-bottom:10px}@keyframes loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@-webkit-keyframes loading{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@-moz-keyframes loading{0%{-moz-transform:rotate(0deg)}100%{-moz-transform:rotate(360deg)}}");
