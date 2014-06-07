// ==UserScript==
// @name           facebook old chat style
// @author         HoussemHoss
// @copyright      2011 - HoSs
// @namespace      facebook
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*

// @version        4.3
// ==/UserScript==

   
    
 (function(a,b){function cv(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cs(a){if(!cg[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ch||(ch=c.createElement("iframe"),ch.frameBorder=ch.width=ch.height=0),b.appendChild(ch);if(!ci||!ch.createElement)ci=(ch.contentWindow||ch.contentDocument).document,ci.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),ci.close();d=ci.createElement(a),ci.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ch)}cg[a]=e}return cg[a]}function cr(a,b){var c={};f.each(cm.concat.apply([],cm.slice(0,b)),function(){c[this]=a});return c}function cq(){cn=b}function cp(){setTimeout(cq,0);return cn=f.now()}function cf(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ce(){try{return new a.XMLHttpRequest}catch(b){}}function b$(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bZ(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bY(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bC.test(a)?d(a,e):bY(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)bY(a+"["+e+"]",b[e],c,d);else d(a,b)}function bX(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bR,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bX(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bX(a,c,d,e,"*",g));return l}function bW(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bN),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bA(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bv:bw;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bx(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function bm(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(be,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bl(a){f.nodeName(a,"input")?bk(a):"getElementsByTagName"in a&&f.grep(a.getElementsByTagName("input"),bk)}function bk(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bj(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bi(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bh(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bg(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function W(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(R.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function V(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function N(a,b){return(a&&a!=="*"?a+".":"")+b.replace(z,"`").replace(A,"&")}function M(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(x,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function K(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function E(){return!0}function D(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"$1-$2").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z])/ig,x=function(a,b){return b.toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!A){A=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a);return c===b||D.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(b,c,d){a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),d=c.documentElement,(!d||!d.nodeName||d.nodeName==="parsererror")&&e.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(H)return H.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g](h)}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.firstChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),p={visibility:"hidden",width:0,height:0,border:0,margin:0},m&&f.extend(p,{position:"absolute",left:-1e3,top:-1e3});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0),o.innerHTML="",n.removeChild(o);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([a-z])([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g=f.expando,h=typeof c=="string",i,j=a.nodeType,k=j?f.cache:a,l=j?a[f.expando]:a[f.expando]&&f.expando;if((!l||e&&l&&!k[l][g])&&h&&d===b)return;l||(j?a[f.expando]=l=++f.uuid:l=f.expando),k[l]||(k[l]={},j||(k[l].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?k[l][g]=f.extend(k[l][g],c):k[l]=f.extend(k[l],c);i=k[l],e&&(i[g]||(i[g]={}),i=i[g]),d!==b&&(i[f.camelCase(c)]=d);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[f.camelCase(c)]||i[c]:i}},removeData:function(b,c,d){if(!!f.acceptData(b)){var e=f.expando,g=b.nodeType,h=g?f.cache:b,i=g?b[f.expando]:f.expando;if(!h[i])return;if(c){var j=d?h[i][e]:h[i];if(j){delete j[c];if(!l(j))return}}if(d){delete h[i][e];if(!l(h[i]))return}var k=h[i][e];f.support.deleteExpando||h!=a?delete h[i]:h[i]=null,k?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=k):g&&(f.support.deleteExpando?delete b[f.expando]:b.removeAttribute?b.removeAttribute(f.expando):b[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u=/\:|^on/,v,w;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(o);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(o);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(n," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;d=e.value;return typeof d=="string"?d.replace(p,""):d==null?"":d}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);j&&(c=f.attrFix[c]||c,i=f.attrHooks[c],i||(t.test(c)?i=w:v&&c!=="className"&&(f.nodeName(a,"form")||u.test(c))&&(i=v)));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j&&(h=i.get(a,c))!==null)return h;h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.support.getSetAttribute?a.removeAttribute(b):(f.attr(a,b,""),a.removeAttributeNode(a.getAttributeNode(b))),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},tabIndex:{get:function(a){var c=a.getAttributeNode("tabIndex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}},value:{get:function(a,b){if(v&&f.nodeName(a,"button"))return v.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(v&&f.nodeName(a,"button"))return v.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);i&&(c=f.propFix[c]||c,h=f.propHooks[c]);return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==b?g:a[c]},propHooks:{}}),w={get:function(a,c){return f.prop(a,c)?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},f.support.getSetAttribute||(f.attrFix=f.propFix,v=f.attrHooks.name=f.attrHooks.title=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,c){var d=a.getAttributeNode(c);if(d){d.nodeValue=b;return b}}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var x=/\.(.*)$/,y=/^(?:textarea|input|select)$/i,z=/\./g,A=/ /g,B=/[^\w\s.|`]/g,C=function(a){return a.replace(B,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=D;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=D);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),C).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.
shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d!=null?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,N(a.origType,a.selector),f.extend({},a,{handler:M,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,N(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?E:D):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=E;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=E;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=E,this.stopPropagation()},isDefaultPrevented:D,isPropagationStopped:D,isImmediatePropagationStopped:D};var F=function(a){var b=a.relatedTarget,c=!1,d=a.type;a.type=a.data,b!==this&&(b&&(c=f.contains(this,b)),c||(f.event.handle.apply(this,arguments),a.type=d))},G=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?G:F,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?G:F)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&f(b).closest("form").length&&K("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&K("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var H,I=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},J=function(c){var d=c.target,e,g;if(!!y.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=I(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:J,beforedeactivate:J,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&J.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&J.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",I(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in H)f.event.add(this,c+".specialChange",H[c]);return y.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return y.test(this.nodeName)}},H=f.event.special.change.filters,H.focus=H.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var L={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||D,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=x.exec(h),k="",j&&(k=j[0],h=h.replace(x,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,L[h]?(a.push(L[h]+k),h=h+k):h=(L[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+N(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+N(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var O=/Until$/,P=/^(?:parents|prevUntil|prevAll)/,Q=/,/,R=/^.[^:#\[\.,]*$/,S=Array.prototype.slice,T=f.expr.match.POS,U={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(W(this,a,!1),"not",a)},filter:function(a){return this.pushStack(W(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=T.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=T.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a=="string")return f.inArray(this[0],a?f(a):this.parent().children());return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(V(c[0])||V(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=S.call(arguments);O.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!U[a]?f.unique(e):e,(this.length>1||Q.test(d))&&P.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var X=/ jQuery\d+="(?:\d+|null)"/g,Y=/^\s+/,Z=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,$=/<([\w:]+)/,_=/<tbody/i,ba=/<|&#?\w+;/,bb=/<(?:script|object|embed|option|style)/i,bc=/checked\s*(?:[^=]|=\s*.checked.)/i,bd=/\/(java|ecma)script/i,be=/^\s*<!(?:\[CDATA\[|\-\-)/,bf={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};bf.optgroup=bf.option,bf.tbody=bf.tfoot=bf.colgroup=bf.caption=bf.thead,bf.th=bf.td,f.support.htmlSerialize||(bf._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(X,""):null;if(typeof a=="string"&&!bb.test(a)&&(f.support.leadingWhitespace||!Y.test(a))&&!bf[($.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Z,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bc.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bg(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bm)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i;b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!bb.test(a[0])&&(f.support.checkClone||!bc.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j
)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bi(a,d),e=bj(a),g=bj(d);for(h=0;e[h];++h)bi(e[h],g[h])}if(b){bh(a,d);if(c){e=bj(a),g=bj(d);for(h=0;e[h];++h)bh(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!ba.test(k))k=b.createTextNode(k);else{k=k.replace(Z,"<$1></$2>");var l=($.exec(k)||["",""])[1].toLowerCase(),m=bf[l]||bf._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=_.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&Y.test(k)&&o.insertBefore(b.createTextNode(Y.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bl(k[i]);else bl(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bd.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bn=/alpha\([^)]*\)/i,bo=/opacity=([^)]*)/,bp=/([A-Z]|^ms)/g,bq=/^-?\d+(?:px)?$/i,br=/^-?\d/,bs=/^[+\-]=/,bt=/[^+\-\.\de]+/g,bu={position:"absolute",visibility:"hidden",display:"block"},bv=["Left","Right"],bw=["Top","Bottom"],bx,by,bz;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bx(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d;if(h==="number"&&isNaN(d)||d==null)return;h==="string"&&bs.test(d)&&(d=+d.replace(bt,"")+parseFloat(f.css(a,c)),h="number"),h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bx)return bx(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bA(a,b,d);f.swap(a,bu,function(){e=bA(a,b,d)});return e}},set:function(a,b){if(!bq.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bo.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle;c.zoom=1;var e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.filter=bn.test(g)?g.replace(bn,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bx(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(by=function(a,c){var d,e,g;c=c.replace(bp,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bz=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bq.test(d)&&br.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bx=by||bz,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bB=/%20/g,bC=/\[\]$/,bD=/\r?\n/g,bE=/#.*$/,bF=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bG=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bH=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,bI=/^(?:GET|HEAD)$/,bJ=/^\/\//,bK=/\?/,bL=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bM=/^(?:select|textarea)/i,bN=/\s+/,bO=/([?&])_=[^&]*/,bP=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bQ=f.fn.load,bR={},bS={},bT,bU;try{bT=e.href}catch(bV){bT=c.createElement("a"),bT.href="",bT=bT.href}bU=bP.exec(bT.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bQ)return bQ.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bL,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bM.test(this.nodeName)||bG.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bD,"\r\n")}}):{name:b.name,value:c.replace(bD,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?f.extend(!0,a,f.ajaxSettings,b):(b=a,a=f.extend(!0,f.ajaxSettings,b));for(var c in{context:1,url:1})c in b?a[c]=b[c]:c in f.ajaxSettings&&(a[c]=f.ajaxSettings[c]);return a},ajaxSettings:{url:bT,isLocal:bH.test(bU[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML}},ajaxPrefilter:bW(bR),ajaxTransport:bW(bS),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a?4:0;var o,r,u,w=l?bZ(d,v,l):b,x,y;if(a>=200&&a<300||a===304){if(d.ifModified){if(x=v.getResponseHeader("Last-Modified"))f.lastModified[k]=x;if(y=v.getResponseHeader("Etag"))f.etag[k]=y}if(a===304)c="notmodified",o=!0;else try{r=b$(d,w),c="success",o=!0}catch(z){c="parsererror",u=z}}else{u=c;if(!c||a)c="error",a<0&&(a=0)}v.status=a,v.statusText=c,o?h.resolveWith(e,[r,c,v]):h.rejectWith(e,[v,c,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,c]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bF.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bE,"").replace(bJ,bU[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bN),d.crossDomain==null&&(r=bP.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bU[1]&&r[2]==bU[2]&&(r[3]||(r[1]==="http:"?80:443))==(bU[3]||(bU[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bX(bR,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bI.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bK.test(d.url)?"&":"?")+d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bO,"$1_="+x);d.url=y+(y===d.url?(bK.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", */*; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bX(bS,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){status<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)bY(g,a[g],c,e);return d.join("&").replace(bB,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var b_=f.now(),ca=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+b_++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ca.test(b.url)||e&&ca.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ca,l),b.url===j&&(e&&(k=k.replace(ca,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cb=a.ActiveXObject?function(){for(var a in cd)cd[a](0,1)}:!1,cc=0,cd;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ce()||cf()}:ce,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cb&&delete cd[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cc,cb&&(cd||(cd={},f(a).unload(cb)),cd[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cg={},ch,ci,cj=/^(?:toggle|show|hide)$/,ck=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cl,cm=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cn,co=a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cr("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cs(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cr("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cr("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cs(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cj.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=ck.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cr("show",1),slideUp:cr("hide",1),slideToggle:cr("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function h(a){return d.step(a)}var d=this,e=f.fx,g;this.startTime=cn||cp(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,h.elem=this.elem,h()&&f.timers.push(h)&&!cl&&(co?(cl=!0,g=function(){cl&&(co(g),e.tick())},co(g)):cl=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cn||cp(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cl),cl=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var ct=/^t(?:able|d|h)$/i,cu=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cv(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!ct.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cu.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cu.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cv(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cv(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a&&a.style?parseFloat(f.css(a,d,"padding")):null},f.fn["outer"+c]=function(a){var b=this[0];return b&&b.style?parseFloat(f.css(b,d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c];return e.document.compatMode==="CSS1Compat"&&g||e.document.body["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var h=f.css(e,d),i=parseFloat(h);return f.isNaN(i)?h:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);
jQuery.noConflict();

 // Hack to access unsafeWindow in Google Chrome
if (window.opera) {
    unsafeWindow = window;
}
else if (window.navigator.vendor.match(/Google Inc./) || window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    unsafeWindow = div.onclick();
}

// Globals
var w = unsafeWindow;

Function.prototype.defer = function (b, a) {
    if (typeof this != 'function') throw new TypeError();
    b = b || 0;
    return setTimeout(this, b, a);
};

/*!
 * Facebook Sidebar Chat Reversion
 * http://hugeegosorry.com/facebookchat/
 *
 * Copyright 2011, Adam Primer
 * Released under the GPL3+ license.
 *
 * Date: Tue Jul 19 23:21:56 2011 +0900
 *
 * Minor Issues (Might be fixed in future versions):
 *
 * Firefox & Chrome:
 * - Chat can become out of sync and display people that are no longer online (Fault with Facebook)
 * - Friend lists blink when toggled on.
 * - Scroll bar of chat bar jumps to top when list updates
 * 
 * Opera: 
 * - May crash if you open the browser after closing it with Facebook open and Opera Dragonfly open
 * - A little glitchy, but overall functionality appears to work.
 *
 */

(function($){
    
    /*
    function log(a) { 
        if (typeof a == 'object') {
            a = JSON.stringify(a);
        }
        console.log(a); 
    }
    */
    
    var sidebar,
        scrollable,
        sidebar_body,
        sidebar_content,
        sidebar_gripper,
        sidebar_scrollable,
        settings,
        styles,
        num_friends,
        chat_sidebar, 
        chat_buddy_list,
        chat_buddy_list_loaded = false,
        hooks_arbiter_timer = setInterval( hooks_arbiter, 10 );

    function _initialize_chat(a, c){    
    
        settings = c;
        
        // Set the minimum width to avoid the evil hybrid
        w.ChatConfig.set({"sidebar.minimum_width":0});
            
        // Load the chat buddy list
        chat_buddy_list = new w.ChatBuddyList();
        
        // Update chat when a friend list is toggled
        chat_buddy_list._friendListHandleSwitchThrownOld = chat_buddy_list._friendListHandleSwitchThrown;
        chat_buddy_list._friendListHandleSwitchThrown = function (b) {
            chat_buddy_list._friendListHandleSwitchThrownOld(b);
            _update();
        }
        
        chat_buddy_list._renderOld = chat_buddy_list._render;
        chat_buddy_list._render = function () {
            chat_buddy_list._renderOld();
               _update();
        }
        
        chat_buddy_list._onBuddyListSettingSaveOld = chat_buddy_list._onBuddyListSettingSave;
        chat_buddy_list._onBuddyListSettingSave = function (b ,a) {
            _force_update();
            chat_buddy_list._onBuddyListSettingSaveOld(b, a);
        }

        // Loads correct list when using left hand offline link on page refresh
        w.Chat.openBuddyList = function() { w.ChatSidebar.enable(); };
    }
    
    function _initialize_buddy_list(a, c) {
        $('html').addClass('sidebarCapable');
        w.ChatConfig.set('sidebar', true);
        var d = w.DOM.find(c.root, 'div.fbNubFlyoutTitlebar');
        w.Toggler.createInstance(d).setSticky(false); 
        
        w.Arbiter.subscribe('sidebar/show', c.hide.bind(c));
        
        w.Event.listen(c.getButton(), 'click', function (event) {
            w.ChatSidebar.disable();
            w.ChatSidebar.enable();
            return false;
        }, -20);
    }
    
    function _initialize_list(a, c) {

        // Initiate the sidebar
        sidebar = $('.fbChatSidebar');
        sidebar_body = sidebar.find('.fbChatSidebarBody');
        sidebar_scrollable = sidebar_body.find('.uiScrollableAreaContent');
        sidebar_gripper = sidebar_body.find('.uiScrollableAreaGripper')
        
        sidebar.prepend(
            '<div id="closeFBChat" class="bb">' +
                '<div class="clearfix fbNubFlyoutTitlebar titlebar">' +
                    '<div class="titlebarLabel clearfix">' +
                        '<div class="titlebarTextWrapper"><span class="titlebarText">Chat (<span id="numFriends">0</span>)</span></div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );    
        sidebar_scrollable.prepend(
            '<div class="status">Loading...</div>' +
            '<div id="chatReversionContent" class="content"></div>'
        );
        
        styles = $('<style id="stylez" type="text/css"></style>');
        
        sidebar.append( styles );
        
        sidebar_content = $('#chatReversionContent');
        
        // Add the class for styling
        sidebar.addClass('fbChatBuddyList').addClass('error');
                    
        // Insert required DOM elements for new chat
        num_friends = $('#numFriends');

        // Bind the titlebar to close chat when clicked
        $('#closeFBChat').click(function(){
            w.ChatSidebar.toggle();
        });
        
        // Window Resize
        $(w).resize( _update );

        // Hook the typeahead
        search = $('.inputsearch');
        search_field = $('.fbChatSidebarFooter').find('input').last();

        search.keyup(function(){
            if (search_field.val() !== "") {
                sidebar_content.addClass('hidden_elem');
            } else {
                sidebar_content.removeClass('hidden_elem');
            }
        })
        .blur(function(){ sidebar_content.removeClass('hidden_elem'); }); 

        // Hack for Google Chrome, hopefully this one works.
        if (w.Chat.isOnline() && !! settings.getSetting('sidebar_mode')) {
            w.ChatSidebar.disable();
            w.ChatSidebar.enable();
        }
        
        // Initialise our own ScrollableArea so we can update it on the fly
        scrollable = new w.ScrollableArea;
        scrollable.init( w.DOM.find( c.getRoot(), 'div.fbChatSidebarBody' ), { presistent: true, fade: false } );
        
        // Update Chat
        _force_update();
    }
    
    function _sidebar_show(a, c) {
        if (!w.Chat.isOnline()) {
            // Automatically enables chat if you open it while offline
            w.Chat.goOnline();
        } else {          
            // Update chat on chat open
            _force_update();
        }
    }
    
    function _update(a) {
        _update_chat();
        _update_count();
        _update_gripper();
    }
    
    function _force_update(a) {
        w.AvailableList.update();
        w.AvailableList._poller.requestNow();
        _update();
    }
    
        
    function _fl_update(a, c) {
        _update();
    }
    
    function _fl_changed(a, c){
        // Only initalise the first time 
        if ( !chat_buddy_list_loaded ) {
            chat_buddy_list_loaded = true;

            // Initialise and load the chat buddy list
            chat_buddy_list.init( w.$( sidebar.attr('id') ), false, true, c.flData );
            
            // Hook to connect here in order to avoid a graphical glitch while coming online
            w.Arbiter.subscribe( 'chat/connect', _handle_online );
        }
        
        chat_buddy_list._dirtyRendering();
        _update();
    }

    function _update_chat(a) {       
        // Show the chat buddy list
        if (chat_buddy_list.contentDiv) {
            chat_buddy_list.show();
        }
        
        // Resize chat to fit the contents/window
        var window_height = $(w).height();
        if (window_height > 0 && sidebar_content) {
            var max_height = window_height - 50;
            
            if ( !sidebar_content.hasClass('hidden_elem') ) {
                // Reset height so we can measure it accurately
                sidebar_body.attr( 'style', 'height: auto !important' );
                new_height = sidebar_body.outerHeight();

                // Resize the chat bar sections
                new_height = ( (new_height + 50) > max_height ) ? max_height : (new_height + 50);
                
                sidebar.attr( 'style', 'height: ' + new_height + 'px !important' );
                sidebar_body.attr( 'style', 'height: ' + (new_height-50) + 'px !important' );
                styles.html( '.fbChatSidebar { height: ' + new_height + 'px !important; } .fbChatSidebarBody { height: ' + (new_height-50) + 'px !important; }' );
            }
        }
    }
    
    function _update_count(a) {
        // Update the counter to reflect the correct numbers
        if (w.AvailableList && w.Chat && num_friends) {
            num_online = (w.Chat.isOnline()) ? w.AvailableList.getCount() : "Offline";
            num_friends.text( num_online );
            $('#fbDockChatBuddylistNub .fbNubButton span.label').text( "Chat (" + num_online + ")" );
        }
    }
    
    function _update_gripper() {
        // Adjusts to leave space for gripper when visible
        if (scrollable) {
            scrollable.adjustGripper();
            content_width = ( sidebar_gripper.hasClass('hidden_elem') ) ? 179 : 167;
            sidebar_content.css( 'width', content_width );
        }
    }
    
    function _handle_online(a) { 
        w.ChatSidebar.enable(); 
    }
    
    function _handle_offline(a) { 
        w.ChatSidebar.disable(); 
    }
    
    function _profile_link( a, c ) {    
        var menu = w.DOM.find( c.conversation.chatWrapper, '.fbNubFlyoutTitlebar .fbDockChatDropdown .uiMenuInner' );
        w.DOM.prependContent( menu, w.HTML(
            '<li class="uiMenuItem " data-label="View Profile">' + 
                '<a class="itemAnchor" rel="ignore" href="http://www.facebook.com/profile.php?id=' + c.id + '" tabindex="0" role="menuitem">' +
                    '<span class="itemLabel fsm">View Profile</span>' +
                '</a>' +
            '</li>'
        ));
    }
        
    function hooks_arbiter() {
        if (w && w.Arbiter) {
            clearInterval( hooks_arbiter_timer );
            
            w.Arbiter.subscribe( 'chat-options/initialized', _initialize_chat );
            w.Arbiter.subscribe( 'sidebar/show', _sidebar_show );
            w.Arbiter.subscribe( 'sidebar/hide', _update_count );
            w.Arbiter.subscribe( 'buddylist/fl-changed', _fl_changed );
            w.Arbiter.subscribe( 'buddylist/count-changed', _update_count );
            w.Arbiter.subscribe( 'buddylist/updated', _update );
            w.Arbiter.subscribe( 'buddylist/availability-changed', _update );
            w.Arbiter.subscribe( 'chat/disconnect', _handle_offline );
            w.Arbiter.subscribe( 'presence/message:fl_settings', _fl_update );
            w.Arbiter.subscribe( 'presence/restarted', _force_update );
            w.Arbiter.subscribe( 'chat/conversation-opened', _profile_link );
            w.Arbiter.subscribe( 'sidebar/initialized', _initialize_list );
            w.Arbiter.subscribe( 'buddylist-nub/initialized', _initialize_buddy_list );
        }
    }
    
    // Some pretty styling to top it all off
    $('head').append( '<style type="text/css">.fbChatSidebarFooter .uiClearableTypeahead .clear{margin-top:0px!important;top:5px!important;}.fbChatOrderedList{display:none!important;}.fbChatBuddyList div.status{padding:5px;}.fbChatBuddyList .friend_list{background-position:0 21px!important;}.fbChatBuddyList .friendlist_name{overflow: hidden; width: 120px;}.fbChatBuddyList .friendlist_name,.fbChatBuddyList .switch{background-color: transparent!important; margin-bottom: 5px;}.fbChatBuddyList div.content {overflow: auto!important;}.fbChatTypeaheadView{padding-top:0px!important;background-color:#F2F4F8!important;bottom:auto!important;top:0px!important;}.fbChatSidebar{top:auto!important;right:15px!important;bottom:-1px!important;border-left:0!important;border-right:0!important;}.fbChatSidebar{z-index:3!important;height:75px!important;}.fbChatSidebarBody{overflow-y: none;height:auto!important;border-left:1px solid rgba(0,0,0,0.4);border-right:1px solid rgba(0,0,0,0.4);}.fbChatOrderedList .item{display:none;}.fbChatOrderedList .item.idle{display:block;}.fbChatOrderedList .item.active{display:block;}.fbChatSidebarFooter{border-left:1px solid rgba(0,0,0,0.4);border-right:1px solid rgba(0,0,0,0.4);}/*byEnzyme*/.fbChatSidebarFooter.uiGrid{border:1px solid rgba(0,0,0,0.4)!important;border-top:1px solid #C9D0DA!important;border-collapse:separate!important;}.sidebarBtn{display:none!important;}#chatFriendsOnline{display:block!important;}.sidebarMode .fbDockWrapper.bb{right:184px!important;}.sidebarMode #globalContainer{left:0!important;position:inherit!important;}.sidebarMode body.canvas_fixed.safari4 div#pageHead,.sidebarMode body.safari4 .fixedScrolling,.sidebarMode .safari4.fixedBody #intern_bookmark_frame,.sidebarMode .safari4.fixedBody #pageHead,.sidebarMode .safari4.fixedBody #leftCol,.sidebarMode .safari4.fixedRightCol .home_right_column,.sidebarMode .safari4.fixedHeader div#headerArea,.sidebarMode .safari4.fixedBody .MessagingReadHeader,.sidebarMode .safari4.fixedBody .MessagingContentBorder,.sidebarMode .safari4.fixedBody .fbProfilePlacesHeader{margin-left:0px!important;}#pagelet_ticker{display:none!important;}</style>' );
    
})(jQuery);
(function(a,b){function cv(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cs(a){if(!cg[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ch||(ch=c.createElement("iframe"),ch.frameBorder=ch.width=ch.height=0),b.appendChild(ch);if(!ci||!ch.createElement)ci=(ch.contentWindow||ch.contentDocument).document,ci.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),ci.close();d=ci.createElement(a),ci.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ch)}cg[a]=e}return cg[a]}function cr(a,b){var c={};f.each(cm.concat.apply([],cm.slice(0,b)),function(){c[this]=a});return c}function cq(){cn=b}function cp(){setTimeout(cq,0);return cn=f.now()}function cf(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ce(){try{return new a.XMLHttpRequest}catch(b){}}function b$(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bZ(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bY(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bC.test(a)?d(a,e):bY(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)bY(a+"["+e+"]",b[e],c,d);else d(a,b)}function bX(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bR,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bX(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bX(a,c,d,e,"*",g));return l}function bW(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bN),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bA(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bv:bw;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bx(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function bm(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(be,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bl(a){f.nodeName(a,"input")?bk(a):"getElementsByTagName"in a&&f.grep(a.getElementsByTagName("input"),bk)}function bk(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bj(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bi(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bh(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bg(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function W(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(R.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function V(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function N(a,b){return(a&&a!=="*"?a+".":"")+b.replace(z,"`").replace(A,"&")}function M(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(x,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function K(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function E(){return!0}function D(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"$1-$2").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z])/ig,x=function(a,b){return b.toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!A){A=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a);return c===b||D.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(b,c,d){a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),d=c.documentElement,(!d||!d.nodeName||d.nodeName==="parsererror")&&e.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(H)return H.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g](h)}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.firstChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),p={visibility:"hidden",width:0,height:0,border:0,margin:0},m&&f.extend(p,{position:"absolute",left:-1e3,top:-1e3});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0),o.innerHTML="",n.removeChild(o);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([a-z])([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g=f.expando,h=typeof c=="string",i,j=a.nodeType,k=j?f.cache:a,l=j?a[f.expando]:a[f.expando]&&f.expando;if((!l||e&&l&&!k[l][g])&&h&&d===b)return;l||(j?a[f.expando]=l=++f.uuid:l=f.expando),k[l]||(k[l]={},j||(k[l].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?k[l][g]=f.extend(k[l][g],c):k[l]=f.extend(k[l],c);i=k[l],e&&(i[g]||(i[g]={}),i=i[g]),d!==b&&(i[f.camelCase(c)]=d);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[f.camelCase(c)]||i[c]:i}},removeData:function(b,c,d){if(!!f.acceptData(b)){var e=f.expando,g=b.nodeType,h=g?f.cache:b,i=g?b[f.expando]:f.expando;if(!h[i])return;if(c){var j=d?h[i][e]:h[i];if(j){delete j[c];if(!l(j))return}}if(d){delete h[i][e];if(!l(h[i]))return}var k=h[i][e];f.support.deleteExpando||h!=a?delete h[i]:h[i]=null,k?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=k):g&&(f.support.deleteExpando?delete b[f.expando]:b.removeAttribute?b.removeAttribute(f.expando):b[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u=/\:|^on/,v,w;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(o);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(o);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(n," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;d=e.value;return typeof d=="string"?d.replace(p,""):d==null?"":d}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);j&&(c=f.attrFix[c]||c,i=f.attrHooks[c],i||(t.test(c)?i=w:v&&c!=="className"&&(f.nodeName(a,"form")||u.test(c))&&(i=v)));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j&&(h=i.get(a,c))!==null)return h;h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.support.getSetAttribute?a.removeAttribute(b):(f.attr(a,b,""),a.removeAttributeNode(a.getAttributeNode(b))),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},tabIndex:{get:function(a){var c=a.getAttributeNode("tabIndex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}},value:{get:function(a,b){if(v&&f.nodeName(a,"button"))return v.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(v&&f.nodeName(a,"button"))return v.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);i&&(c=f.propFix[c]||c,h=f.propHooks[c]);return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==b?g:a[c]},propHooks:{}}),w={get:function(a,c){return f.prop(a,c)?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},f.support.getSetAttribute||(f.attrFix=f.propFix,v=f.attrHooks.name=f.attrHooks.title=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,c){var d=a.getAttributeNode(c);if(d){d.nodeValue=b;return b}}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var x=/\.(.*)$/,y=/^(?:textarea|input|select)$/i,z=/\./g,A=/ /g,B=/[^\w\s.|`]/g,C=function(a){return a.replace(B,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=D;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=D);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),C).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.
shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d!=null?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,N(a.origType,a.selector),f.extend({},a,{handler:M,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,N(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?E:D):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=E;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=E;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=E,this.stopPropagation()},isDefaultPrevented:D,isPropagationStopped:D,isImmediatePropagationStopped:D};var F=function(a){var b=a.relatedTarget,c=!1,d=a.type;a.type=a.data,b!==this&&(b&&(c=f.contains(this,b)),c||(f.event.handle.apply(this,arguments),a.type=d))},G=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?G:F,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?G:F)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&f(b).closest("form").length&&K("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&K("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var H,I=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},J=function(c){var d=c.target,e,g;if(!!y.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=I(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:J,beforedeactivate:J,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&J.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&J.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",I(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in H)f.event.add(this,c+".specialChange",H[c]);return y.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return y.test(this.nodeName)}},H=f.event.special.change.filters,H.focus=H.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var L={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||D,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=x.exec(h),k="",j&&(k=j[0],h=h.replace(x,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,L[h]?(a.push(L[h]+k),h=h+k):h=(L[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+N(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+N(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var O=/Until$/,P=/^(?:parents|prevUntil|prevAll)/,Q=/,/,R=/^.[^:#\[\.,]*$/,S=Array.prototype.slice,T=f.expr.match.POS,U={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(W(this,a,!1),"not",a)},filter:function(a){return this.pushStack(W(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=T.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=T.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a=="string")return f.inArray(this[0],a?f(a):this.parent().children());return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(V(c[0])||V(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=S.call(arguments);O.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!U[a]?f.unique(e):e,(this.length>1||Q.test(d))&&P.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var X=/ jQuery\d+="(?:\d+|null)"/g,Y=/^\s+/,Z=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,$=/<([\w:]+)/,_=/<tbody/i,ba=/<|&#?\w+;/,bb=/<(?:script|object|embed|option|style)/i,bc=/checked\s*(?:[^=]|=\s*.checked.)/i,bd=/\/(java|ecma)script/i,be=/^\s*<!(?:\[CDATA\[|\-\-)/,bf={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};bf.optgroup=bf.option,bf.tbody=bf.tfoot=bf.colgroup=bf.caption=bf.thead,bf.th=bf.td,f.support.htmlSerialize||(bf._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(X,""):null;if(typeof a=="string"&&!bb.test(a)&&(f.support.leadingWhitespace||!Y.test(a))&&!bf[($.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Z,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bc.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bg(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bm)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i;b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!bb.test(a[0])&&(f.support.checkClone||!bc.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j
)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bi(a,d),e=bj(a),g=bj(d);for(h=0;e[h];++h)bi(e[h],g[h])}if(b){bh(a,d);if(c){e=bj(a),g=bj(d);for(h=0;e[h];++h)bh(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!ba.test(k))k=b.createTextNode(k);else{k=k.replace(Z,"<$1></$2>");var l=($.exec(k)||["",""])[1].toLowerCase(),m=bf[l]||bf._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=_.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&Y.test(k)&&o.insertBefore(b.createTextNode(Y.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bl(k[i]);else bl(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bd.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bn=/alpha\([^)]*\)/i,bo=/opacity=([^)]*)/,bp=/([A-Z]|^ms)/g,bq=/^-?\d+(?:px)?$/i,br=/^-?\d/,bs=/^[+\-]=/,bt=/[^+\-\.\de]+/g,bu={position:"absolute",visibility:"hidden",display:"block"},bv=["Left","Right"],bw=["Top","Bottom"],bx,by,bz;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bx(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d;if(h==="number"&&isNaN(d)||d==null)return;h==="string"&&bs.test(d)&&(d=+d.replace(bt,"")+parseFloat(f.css(a,c)),h="number"),h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bx)return bx(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bA(a,b,d);f.swap(a,bu,function(){e=bA(a,b,d)});return e}},set:function(a,b){if(!bq.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bo.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle;c.zoom=1;var e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.filter=bn.test(g)?g.replace(bn,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bx(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(by=function(a,c){var d,e,g;c=c.replace(bp,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bz=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bq.test(d)&&br.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bx=by||bz,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bB=/%20/g,bC=/\[\]$/,bD=/\r?\n/g,bE=/#.*$/,bF=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bG=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bH=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,bI=/^(?:GET|HEAD)$/,bJ=/^\/\//,bK=/\?/,bL=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bM=/^(?:select|textarea)/i,bN=/\s+/,bO=/([?&])_=[^&]*/,bP=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bQ=f.fn.load,bR={},bS={},bT,bU;try{bT=e.href}catch(bV){bT=c.createElement("a"),bT.href="",bT=bT.href}bU=bP.exec(bT.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bQ)return bQ.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bL,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bM.test(this.nodeName)||bG.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bD,"\r\n")}}):{name:b.name,value:c.replace(bD,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?f.extend(!0,a,f.ajaxSettings,b):(b=a,a=f.extend(!0,f.ajaxSettings,b));for(var c in{context:1,url:1})c in b?a[c]=b[c]:c in f.ajaxSettings&&(a[c]=f.ajaxSettings[c]);return a},ajaxSettings:{url:bT,isLocal:bH.test(bU[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML}},ajaxPrefilter:bW(bR),ajaxTransport:bW(bS),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a?4:0;var o,r,u,w=l?bZ(d,v,l):b,x,y;if(a>=200&&a<300||a===304){if(d.ifModified){if(x=v.getResponseHeader("Last-Modified"))f.lastModified[k]=x;if(y=v.getResponseHeader("Etag"))f.etag[k]=y}if(a===304)c="notmodified",o=!0;else try{r=b$(d,w),c="success",o=!0}catch(z){c="parsererror",u=z}}else{u=c;if(!c||a)c="error",a<0&&(a=0)}v.status=a,v.statusText=c,o?h.resolveWith(e,[r,c,v]):h.rejectWith(e,[v,c,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,c]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bF.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bE,"").replace(bJ,bU[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bN),d.crossDomain==null&&(r=bP.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bU[1]&&r[2]==bU[2]&&(r[3]||(r[1]==="http:"?80:443))==(bU[3]||(bU[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bX(bR,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bI.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bK.test(d.url)?"&":"?")+d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bO,"$1_="+x);d.url=y+(y===d.url?(bK.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", */*; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bX(bS,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){status<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)bY(g,a[g],c,e);return d.join("&").replace(bB,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var b_=f.now(),ca=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+b_++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ca.test(b.url)||e&&ca.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ca,l),b.url===j&&(e&&(k=k.replace(ca,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cb=a.ActiveXObject?function(){for(var a in cd)cd[a](0,1)}:!1,cc=0,cd;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ce()||cf()}:ce,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cb&&delete cd[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cc,cb&&(cd||(cd={},f(a).unload(cb)),cd[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cg={},ch,ci,cj=/^(?:toggle|show|hide)$/,ck=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cl,cm=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cn,co=a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cr("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cs(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cr("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cr("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cs(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cj.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=ck.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cr("show",1),slideUp:cr("hide",1),slideToggle:cr("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function h(a){return d.step(a)}var d=this,e=f.fx,g;this.startTime=cn||cp(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,h.elem=this.elem,h()&&f.timers.push(h)&&!cl&&(co?(cl=!0,g=function(){cl&&(co(g),e.tick())},co(g)):cl=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cn||cp(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cl),cl=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var ct=/^t(?:able|d|h)$/i,cu=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cv(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!ct.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cu.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cu.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cv(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cv(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a&&a.style?parseFloat(f.css(a,d,"padding")):null},f.fn["outer"+c]=function(a){var b=this[0];return b&&b.style?parseFloat(f.css(b,d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c];return e.document.compatMode==="CSS1Compat"&&g||e.document.body["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var h=f.css(e,d),i=parseFloat(h);return f.isNaN(i)?h:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);
jQuery.noConflict();

 // Hack to access unsafeWindow in Google Chrome
if (window.opera) {
    unsafeWindow = window;
}
else if (window.navigator.vendor.match(/Google Inc./) || window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    unsafeWindow = div.onclick();
}

// Globals
var w = unsafeWindow;

Function.prototype.defer = function (b, a) {
    if (typeof this != 'function') throw new TypeError();
    b = b || 0;
    return setTimeout(this, b, a);
};

/*!
 * Facebook Sidebar Chat Reversion
 * http://hugeegosorry.com/facebookchat/
 *
 * Copyright 2011, Adam Primer
 * Released under the GPL3+ license.
 *
 * Date: Tue Jul 19 23:21:56 2011 +0900
 *
 * Minor Issues (Might be fixed in future versions):
 *
 * Firefox & Chrome:
 * - Chat can become out of sync and display people that are no longer online (Fault with Facebook)
 * - Friend lists blink when toggled on.
 * - Scroll bar of chat bar jumps to top when list updates
 * 
 * Opera: 
 * - May crash if you open the browser after closing it with Facebook open and Opera Dragonfly open
 * - A little glitchy, but overall functionality appears to work.
 *
 */

(function($){
    
    /*
    function log(a) { 
        if (typeof a == 'object') {
            a = JSON.stringify(a);
        }
        console.log(a); 
    }
    */
    
    var sidebar,
        scrollable,
        sidebar_body,
        sidebar_content,
        sidebar_gripper,
        sidebar_scrollable,
        settings,
        styles,
        num_friends,
        chat_sidebar, 
        chat_buddy_list,
        chat_buddy_list_loaded = false,
        hooks_arbiter_timer = setInterval( hooks_arbiter, 10 );

    function _initialize_chat(a, c){    
    
        settings = c;
        
        // Set the minimum width to avoid the evil hybrid
        w.ChatConfig.set({"sidebar.minimum_width":0});
            
        // Load the chat buddy list
        chat_buddy_list = new w.ChatBuddyList();
        
        // Update chat when a friend list is toggled
        chat_buddy_list._friendListHandleSwitchThrownOld = chat_buddy_list._friendListHandleSwitchThrown;
        chat_buddy_list._friendListHandleSwitchThrown = function (b) {
            chat_buddy_list._friendListHandleSwitchThrownOld(b);
            _update();
        }
        
        chat_buddy_list._renderOld = chat_buddy_list._render;
        chat_buddy_list._render = function () {
            chat_buddy_list._renderOld();
               _update();
        }
        
        chat_buddy_list._onBuddyListSettingSaveOld = chat_buddy_list._onBuddyListSettingSave;
        chat_buddy_list._onBuddyListSettingSave = function (b ,a) {
            _force_update();
            chat_buddy_list._onBuddyListSettingSaveOld(b, a);
        }

        // Loads correct list when using left hand offline link on page refresh
        w.Chat.openBuddyList = function() { w.ChatSidebar.enable(); };
    }
    
    function _initialize_buddy_list(a, c) {
        $('html').addClass('sidebarCapable');
        w.ChatConfig.set('sidebar', true);
        var d = w.DOM.find(c.root, 'div.fbNubFlyoutTitlebar');
        w.Toggler.createInstance(d).setSticky(false); 
        
        w.Arbiter.subscribe('sidebar/show', c.hide.bind(c));
        
        w.Event.listen(c.getButton(), 'click', function (event) {
            w.ChatSidebar.disable();
            w.ChatSidebar.enable();
            return false;
        }, -20);
    }
    
    function _initialize_list(a, c) {

        // Initiate the sidebar
        sidebar = $('.fbChatSidebar');
        sidebar_body = sidebar.find('.fbChatSidebarBody');
        sidebar_scrollable = sidebar_body.find('.uiScrollableAreaContent');
        sidebar_gripper = sidebar_body.find('.uiScrollableAreaGripper')
        
        sidebar.prepend(
            '<div id="closeFBChat" class="bb">' +
                '<div class="clearfix fbNubFlyoutTitlebar titlebar">' +
                    '<div class="titlebarLabel clearfix">' +
                        '<div class="titlebarTextWrapper"><span class="titlebarText">Chat (<span id="numFriends">0</span>)</span></div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );    
        sidebar_scrollable.prepend(
            '<div class="status">Loading...</div>' +
            '<div id="chatReversionContent" class="content"></div>'
        );
        
        styles = $('<style id="stylez" type="text/css"></style>');
        
        sidebar.append( styles );
        
        sidebar_content = $('#chatReversionContent');
        
        // Add the class for styling
        sidebar.addClass('fbChatBuddyList').addClass('error');
                    
        // Insert required DOM elements for new chat
        num_friends = $('#numFriends');

        // Bind the titlebar to close chat when clicked
        $('#closeFBChat').click(function(){
            w.ChatSidebar.toggle();
        });
        
        // Window Resize
        $(w).resize( _update );

        // Hook the typeahead
        search = $('.inputsearch');
        search_field = $('.fbChatSidebarFooter').find('input').last();

        search.keyup(function(){
            if (search_field.val() !== "") {
                sidebar_content.addClass('hidden_elem');
            } else {
                sidebar_content.removeClass('hidden_elem');
            }
        })
        .blur(function(){ sidebar_content.removeClass('hidden_elem'); }); 

        // Hack for Google Chrome, hopefully this one works.
        if (w.Chat.isOnline() && !! settings.getSetting('sidebar_mode')) {
            w.ChatSidebar.disable();
            w.ChatSidebar.enable();
        }
        
        // Initialise our own ScrollableArea so we can update it on the fly
        scrollable = new w.ScrollableArea;
        scrollable.init( w.DOM.find( c.getRoot(), 'div.fbChatSidebarBody' ), { presistent: true, fade: false } );
        
        // Update Chat
        _force_update();
    }
    
    function _sidebar_show(a, c) {
        if (!w.Chat.isOnline()) {
            // Automatically enables chat if you open it while offline
            w.Chat.goOnline();
        } else {          
            // Update chat on chat open
            _force_update();
        }
    }
    
    function _update(a) {
        _update_chat();
        _update_count();
        _update_gripper();
    }
    
    function _force_update(a) {
        w.AvailableList.update();
        w.AvailableList._poller.requestNow();
        _update();
    }
    
        
    function _fl_update(a, c) {
        _update();
    }
    
    function _fl_changed(a, c){
        // Only initalise the first time 
        if ( !chat_buddy_list_loaded ) {
            chat_buddy_list_loaded = true;

            // Initialise and load the chat buddy list
            chat_buddy_list.init( w.$( sidebar.attr('id') ), false, true, c.flData );
            
            // Hook to connect here in order to avoid a graphical glitch while coming online
            w.Arbiter.subscribe( 'chat/connect', _handle_online );
        }
        
        chat_buddy_list._dirtyRendering();
        _update();
    }

    function _update_chat(a) {       
        // Show the chat buddy list
        if (chat_buddy_list.contentDiv) {
            chat_buddy_list.show();
        }
        
        // Resize chat to fit the contents/window
        var window_height = $(w).height();
        if (window_height > 0 && sidebar_content) {
            var max_height = window_height - 50;
            
            if ( !sidebar_content.hasClass('hidden_elem') ) {
                // Reset height so we can measure it accurately
                sidebar_body.attr( 'style', 'height: auto !important' );
                new_height = sidebar_body.outerHeight();

                // Resize the chat bar sections
                new_height = ( (new_height + 50) > max_height ) ? max_height : (new_height + 50);
                
                sidebar.attr( 'style', 'height: ' + new_height + 'px !important' );
                sidebar_body.attr( 'style', 'height: ' + (new_height-50) + 'px !important' );
                styles.html( '.fbChatSidebar { height: ' + new_height + 'px !important; } .fbChatSidebarBody { height: ' + (new_height-50) + 'px !important; }' );
            }
        }
    }
    
    function _update_count(a) {
        // Update the counter to reflect the correct numbers
        if (w.AvailableList && w.Chat && num_friends) {
            num_online = (w.Chat.isOnline()) ? w.AvailableList.getCount() : "Offline";
            num_friends.text( num_online );
            $('#fbDockChatBuddylistNub .fbNubButton span.label').text( "Chat (" + num_online + ")" );
        }
    }
    
    function _update_gripper() {
        // Adjusts to leave space for gripper when visible
        if (scrollable) {
            scrollable.adjustGripper();
            content_width = ( sidebar_gripper.hasClass('hidden_elem') ) ? 203 : 191;
            sidebar_content.css( 'width', content_width );
        }
    }
    
    function _handle_online(a) { 
        w.ChatSidebar.enable(); 
    }
    
    function _handle_offline(a) { 
        w.ChatSidebar.disable(); 
    }
    
    function _profile_link( a, c ) {    
        var menu = w.DOM.find( c.conversation.chatWrapper, '.fbNubFlyoutTitlebar .fbDockChatDropdown .uiMenuInner' );
        w.DOM.prependContent( menu, w.HTML(
            '<li class="uiMenuItem " data-label="View Profile">' + 
                '<a class="itemAnchor" rel="ignore" href="http://www.facebook.com/profile.php?id=' + c.id + '" tabindex="0" role="menuitem">' +
                    '<span class="itemLabel fsm">View Profile</span>' +
                '</a>' +
            '</li>'
        ));
    }
        
    function hooks_arbiter() {
        if (w && w.Arbiter) {
            clearInterval( hooks_arbiter_timer );
            
            w.Arbiter.subscribe( 'chat-options/initialized', _initialize_chat );
            w.Arbiter.subscribe( 'sidebar/show', _sidebar_show );
            w.Arbiter.subscribe( 'sidebar/hide', _update_count );
            w.Arbiter.subscribe( 'buddylist/fl-changed', _fl_changed );
            w.Arbiter.subscribe( 'buddylist/count-changed', _update_count );
            w.Arbiter.subscribe( 'buddylist/updated', _update );
            w.Arbiter.subscribe( 'buddylist/availability-changed', _update );
            w.Arbiter.subscribe( 'chat/disconnect', _handle_offline );
            w.Arbiter.subscribe( 'presence/message:fl_settings', _fl_update );
            w.Arbiter.subscribe( 'presence/restarted', _force_update );
            w.Arbiter.subscribe( 'chat/conversation-opened', _profile_link );
            w.Arbiter.subscribe( 'sidebar/initialized', _initialize_list );
            w.Arbiter.subscribe( 'buddylist-nub/initialized', _initialize_buddy_list );
        }
    }
    
    // Some pretty styling to top it all off
    $('head').append( '<style type="text/css">.fbFeedTicker{display: none}.fbSidebarGripper{display: none;}.fbChatSidebarFooter .uiClearableTypeahead .clear{margin-top:0px!important;top:5px!important;}.fbChatOrderedList{display:none!important;}.fbChatBuddyList div.status{padding:5px;}.fbChatBuddyList .friend_list{background-position:0 21px!important;}.fbChatBuddyList .friendlist_name{overflow: hidden; width: 120px;}.fbChatBuddyList .friendlist_name,.fbChatBuddyList .switch{background-color: transparent!important; margin-bottom: 5px;}.fbChatBuddyList div.content {overflow: auto!important;}.fbChatTypeaheadView{padding-top:0px!important;background-color:#F2F4F8!important;bottom:auto!important;top:0px!important;}.fbChatSidebar{top:auto!important;right:15px!important;bottom:-1px!important;border-left:0!important;border-right:0!important;}.fbChatSidebar{z-index:3!important;height:75px!important;}.fbChatSidebarBody{overflow-y: none;height:auto!important;border-left:1px solid rgba(0,0,0,0.4);border-right:1px solid rgba(0,0,0,0.4);}.fbChatOrderedList .item{display:none;}.fbChatOrderedList .item.idle{display:block;}.fbChatOrderedList .item.active{display:block;}.fbChatSidebarFooter{border-left:1px solid rgba(0,0,0,0.4);border-right:1px solid rgba(0,0,4,0.4);}/*byEnzyme*/.fbChatSidebarFooter.uiGrid{border:1px solid rgba(0,0,9,0.4)!important;border-top:1px solid #C9D0DA!important;border-collapse:separate!important;}.sidebarBtn{display:none!important;}#chatFriendsOnline{display:block!important;}.sidebarMode .fbDockWrapper.bb{right:184px!important;}.sidebarMode #globalContainer{left:0!important;position:inherit!important;}.sidebarMode body.canvas_fixed.safari4 div#pageHead,.sidebarMode body.safari4 .fixedScrolling,.sidebarMode .safari4.fixedBody #intern_bookmark_frame,.sidebarMode .safari4.fixedBody #pageHead,.sidebarMode .safari4.fixedBody #leftCol,.sidebarMode .safari4.fixedRightCol .home_right_column,.sidebarMode .safari4.fixedHeader div#headerArea,.sidebarMode .safari4.fixedBody .MessagingReadHeader,.sidebarMode .safari4.fixedBody .MessagingContentBorder,.sidebarMode .safari4.fixedBody .fbProfilePlacesHeader{margin-left:0px!important;}#pagelet_ticker{display:none!important;}</style>' );
    
})(jQuery);
(function() {

if (self != window.top) { return; } // Don't run in frames

var version = '2.3.1';
var version_timestamp = 1299644556453; // javascript:window.alert(new Date().getTime());
var release_date = 20110309;

var loc;
var page = '';
var lastPage = '';
var homePageNotModified = true;
var id = 0;
var language = 'en';
var detectedLanguage = '';
var showPopupPicTimeout;
var hidePopupPicTimeout;
var storage;

var lang = {
	// English - By Vaughan Chandler
	en : {
		'_language' : 'English',
		'AddToCalendar' : 'Add to Calendar',
		'AddToGoogleCalendar' : 'Add to Google Calendar',
		'all' : 'all',
		'All' : 'All',
		'AllPhotosLoaded' : 'All photos loaded',
		'Automatic' : 'Automatic',
		'Birthday' : '%s\'s Birthday',
		'BookmarkAdd' : 'Add New Bookmark',
		'BookmarkExists' : 'There is already a bookmark for this page.\n\nGo to the page you want to bookmark and try again.',
		'BookmarkNamePrompt' : 'Enter a name for this bookmark:\n%s',
		'BookmarksConfirmRemoval' : 'Are you sure you want to remove the following bookmarks?',
		'BookmarksManage' : 'Manage Bookmarks',
		'BookmarksRemoveSelected' : 'Remove Selected Bookmarks',
		'Bookmarks' : 'Bookmarks',
		'BrowserUnsupported' : 'Your browser does not support this feature.',
		'CreatingFile' : 'Creating File',
		'Close' : 'Close',
		'ConfigureFacebookFixer' : 'Configure FFixer',
		'ConfigureInstructions' : 'All changes are saved immediately, but some changes might not take effect in tabs that are already open.',
		'ConfAge' : 'Show people\'s age on their profile (if they provide their full birthdate).',
		'ConfApplicationWhitelist' : 'Application Whitelist - Enter the IDs of applications to prevent them from being hidden. Separate IDs with a space.',
		'ConfAutoBigAlbumPictures' : 'Automatically show bigger album pictures when the page opens.',
		'ConfAutoLoadFullAlbum' : 'Automatically load thumbnnails for all images in an album on a single page.',
		'ConfAutoLoadTaggedPhotos' : 'Automatically load thumbnnails for all tagged photos on a single page (the photos tab on people\'s profiles).',
		'ConfAutoReadMore' : 'Automatically click on "see more" links.',
		'ConfBigAlbumPictures' : 'Add a link on album pages to show bigger versions of all pictures on that page.',
		'ConfBigAlbumPicturesBorder' : 'Add a border around bigger versions of pictures.',
		'ConfBookmarks' : 'Add a Bookmarks submenu to the top menu bar.',
		'ConfBottomBarHoverOpacity' : 'On mouse-over',
		'ConfBottomBarOpacity' : 'Bottom menu bar transparency',
		'ConfCalendarBirthDate' : 'Include the person\'s birthdate in the event details.',
		'ConfCalendarFullName' : 'Use the person\'s full name as the title for birthdays (instead of just first name).',
		'ConfChatDifferentiate' : 'Use bold and italics to differentiate between available and idle buddies.',
		'ConfChatHideIdle' : 'Hide idle buddies.',
		'ConfDelayPopupPics' : 'Add a short delay before showing popup pictures.',
		'ConfDelayPopupPicsTimeout' : 'Delay before showing popup pictures, in milliseconds (default=500):',
		'ConfDownloadVideo' : 'Add a link to download the videos from video pages. (You may need an <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfDisableTheater' : 'Disable the photo theater.',
		'ConfErrorPageReload' : 'Automaticaly reload application error pages after 5 seconds.',
		'ConfExport' : 'To export your settings, copy the text below and save it in a file.',
		'ConfExternalPopup' : 'Popup full-sized versions of external images. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Language for FFixer',
		'ConfFacebookTimestamps' : 'Show Facebook timestamps (eg. "3 hours ago").',
		'ConfFBFTimestamps' : 'Add FFixer timestamps after Facebook timestamps (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Show FFixer timestamps in 24-hour format.',
		'ConfFriendRequestCountInTitle' : 'Show the number of new friend requests in the page title.',
		'ConfGoogleApps' : 'Create Google Calendar links compatible with Google Apps.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Add links to add birthdays and events to <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Hide application stories.',
		'ConfHideEgos' : 'Hide all "ego" sections (should hide most of Facebook\'s recommendations).',
		'ConfHideEventStories' : 'Hide event stories.',
		'ConfHideFacebookCountInTitle' : 'Hide Facebook\'s count of new inbox messages.',
		'ConfHideFriendStories' : 'Hide friend stories.',
		'ConfHideGroupStories' : 'Hide group stories.',
		'ConfHideHovercards' : 'Hide hovercards (the popup that appears when you mouse-over a name).',
		'ConfHideLikeStories' : 'Hide like stories.',
		'ConfHideLinkStories' : 'Hide link stories.',
		'ConfHideNoteStories' : 'Hide note stories.',
		'ConfHidePhotoStories' : 'Hide photo stories.',
		'ConfHidePlaceStories' : 'Hide place stories.',
		'ConfHideProfilePicStories' : 'Hide profile pic stories.',
		'ConfHideRead' : 'Hide items in the live feed that have been marked as read.',
		'ConfHideRelationshipStories' : 'Hide relationship stories.',
		'ConfHideStatusStories' : 'Hide status stories.',
		'ConfHideVideoStories' : 'Hide video stories.',
		'ConfHideWallStories' : 'Hide wall stories.',
		'ConfHomeBeta' : 'Show the Facebook Sneak Peek section.',
		'ConfHomeChat' : 'Show the Chat section.',
		'ConfHomeChatNames' : 'Show names in the Chat section.',
		'ConfHomeEvents' : 'Show the Events section.',
		'ConfHomeFindFriends' : 'Show the Get Connected section.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeLeftColumn' : 'Show the left column.',
		'ConfHomeLeftColumnFixed' : 'Keep the left column visible, even after scrolling down.',
		'ConfHomeLink' : 'Show the Home link in the top menu bar.',
		'ConfHomeNavigation' : 'Show the Navigation section.',
		'ConfHomePokes' : 'Show the Pokes section.',
		'ConfHomeProfile' : 'Show the Profile section.',
		'ConfHomeRecommendations' : 'Show recommendations (People You May Know, Recommended Pages etc).',
		'ConfHomeRequests' : 'Show the Requests section.',
		'ConfHomeRightColumn' : 'Show the right column.',
		'ConfHomeStretch' : 'Stretch the home page to the full width of the browser window.',
		'ConfHomeStretchMiddleColumn' : 'Stretch the contents of the middle column of the home page.',
		'ConfiCalendar' : 'Add links to download an <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfImport' : 'To import your settings later, overwrite the text below with the text you saved previously and click "Import".',
		'ConfInboxCountInTitle' : 'Show the number of new inbox messages in the page title.',
		'ConfLogoutLink' : 'Add a logout link to the top menu bar.',
		'ConfNotificationCountInTitle' : 'Show the number of new notifications in the page title.',
		'ConfNewTabSearch' : 'Make search results open in a new tab/window when pressing CTRL + Enter to search.',
		'ConfPageTitle' : 'Remove "Facebook |" from the title of every page.',
		'ConfPhotoPopup' : 'Popup bigger versions of photos on mouse over.',
		'ConfPopupAutoClose' : 'Close popup pictures automatically.',
		'ConfPopupSmartAutoClose' : 'Prevent popup pictures from closing automatically if the mouse is over it.',
		'ConfPopupPosition' : 'Position for popup pictures',
		'ConfPopupWhileTagging' : 'Show popup pictures even when tagging.',
		'ConfProcessInterval' : 'Interval at which to process the page, in milliseconds (default=1000):',
		'ConfProfileLink' : 'Show the Profile link in the top menu bar.',
		'ConfProfilePicPopup' : 'Popup bigger versions of profile pictures on mouse over',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'About FFixer',
		'ConfSectionAdvanced' : 'Advanced',
		'ConfSectionEvents' : 'Birthdays/Events',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Feeds',
		'ConfSectionHomePage' : 'Home Page',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menus/Chat',
		'ConfSectionOther' : 'Other Options',
		'ConfSectionPageTitle' : 'Page Title',
		'ConfSectionPictures' : 'Pictures',
		'ConfSectionShortcuts' : 'Keyboard Shortcuts',
		'ConfSecureLinks' : 'Force Facebook links to point to HTTPS pages.',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - FFixer configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Enable keyboard shortcuts.',
		'ConfSign' : 'Show people\'s sign on their profile (if they provide their birthdate).',
		'ConfTopBarFixed' : 'Keep the top menu bar on the screen always, even after scrolling down.',
		'ConfTopBarHoverOpacity' : 'On mouse-over',
		'ConfTopBarOpacity' : 'Top menu bar transparency',
		'ConfUpdates' : 'Check Userscripts.org daily for updates to FFixer. Or <a href="#" id="fbfUpdateLink" onclick="return false;">check now</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(This will take a while if you have a lot of friends)',
		'FacebookFixerConflict' : 'Facebook Fixer is now known as FFixer.<br /><br />Because of the name change you need to manually uninstall Facebook Fixer from your browser, or the two scripts will conflict with each other.<br /><br />If you are aren\'t sure how to uninstall a userscript, <a %s>click here for instructions</a>.',
		'fullAlbumLoaded' : 'full album loaded',
		'Import' : 'Import',
		'ImportConfirm' : 'Are you sure you want to import these settings?\nYour current settings will be lost.',
		'ImportFailure' : 'An error occurred while trying to import your settings.',
		'ImportSuccess' : 'Import complete. Would you like to refresh the page?',
		'Left' : 'Left',
		'LoadingAllPhotos' : 'Loading all photos...',
		'loadingFullAlbum' : 'loading full album...',
		'LoadingPic' : 'Loading Pic...',
		'LoadPhotosWarning' : 'Loading all photos may take a long time',
		'Months' : new Array('January','February','March','April','May','June','July','August','September','October','November','December'),
		'ProtocolSkype' : 'Call %s using Skype',
		'ProtocolMSN' : 'Chat with %s using Windows Live',
		'ProtocolYahoo' : 'Chat with %s using Yahoo Messenger',
		'ProtocolGoogle' : 'Chat with %s using Google Talk',
		'ReloadErrorPage' : 'Click to Try Again, or wait 5 seconds',
		'Refresh' : 'Refresh',
		'Remove' : 'Remove',
		'Right' : 'Right',
		'ShowBigPictures' : 'Show Big Pictures',
		'Signs' : new Array('Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius'),
		'today' : 'today', // this is the lower case version of the text Facebook uses on the home page to mark today's birthdays
		'Translators' : 'Translators',
		'UpdateAvailable1' : 'An update is available for FFixer',
		'UpdateAvailable2' : 'Would you like to update now?',
		'UpdateHomepage' : 'Go to homepage',
		'UpdateInstall' : 'Install now',
		'UpdateTomorrow' : 'Remind me tomorrow',
		'yearsOld' : '%s years old'
	},

	// Spanish - Contributed by Glen Farmer and Neo (20100626)
	es : {
		'_language' : 'Spanish',
		'AddToCalendar' : 'Añadir a Calendario',
		'AddToGoogleCalendar' : 'Añadir a Calendario Google',
		'all' : 'todo',
		'All' : 'Todo',
		'AllPhotosLoaded' : 'Todas las fotos han sido cargadas',
		'Automatic' : 'Automático',
		'Birthday' : 'El cumpleaños de %s',
		'BookmarkAdd' : 'Añadir Un Marcador Nuevo',
		'BookmarkConfirmRemoval' : '¿Está seguro que desea eliminar marcador "%s"?',
		'BookmarkDoesNotExist' : 'Esta página no ha sido marcada,\n\nVaya a la página que desea eliminar e intente de nuevo.',
		'BookmarkExists' : 'Ya existe un marcador para esta página.\n\nVaya a la página que desea marcar e intente de nuevo.',
		'BookmarkNamePrompt' : 'Introduzca un nombre para este el siguiente marcador:\n%s',
		'BookmarkRemove' : 'Eliminar el marcador',
		'Bookmarks' : 'Marcadores',
		'BrowserUnsupported' : 'Su navegador no soporta esta función.',
		'Close' : 'Cerrar',
		'ConfigureFacebookFixer' : 'Configuración de FFixer',
		'ConfigureInstructions' : 'Todos los cambios son guardados inmediatamente, pero algunos cambios tendrán efecto en ventanas que ya estén abiertas.',
		'ConfAge' : 'Mostrar edad de las personas en sus perfiles (Solo si muestran su fecha de nacimiento).',
		'ConfAutoBigAlbumPictures' : 'Mostrar automáticamente las fotos de los álbumes grandes al abrir alguno de ellos.',
		'ConfAutoLoadFullAlbum' : 'Cargar automaticamente las MINIATURAS de todas las imagenes de un álbum en una sola página.',
		'ConfAutoLoadTaggedPhotos' : 'Cargar automaticamente las MINIATURAS de todas las fotos etiquetadas de un usuario en una sola página (La pestaña Fotos de "Usuario").',
		'ConfBigAlbumPictures' : 'Añadir un enlace en la página de los álbumes para mostrar las versiones grandes de todas las fotos.',
		'ConfBookmarks' : 'Añadir el menu de Marcadores a la barra superior de menús',
		'ConfBottomBarHoverOpacity' : 'Al pasar el ratón por encima',
		'ConfBottomBarOpacity' : 'Transparencia de la barra de menu de abajo',
		'ConfCalendarBirthDate' : 'Incluir la fecha de cumpleaños de las personas en los detalles de los eventos.',
		'ConfCalendarFullName' : 'Usar el nombre completo de las personas para el titulo de los cumpleaños (en vez de solo el primer nombre).',
		'ConfChatDifferentiate' : 'Usar negrita y cursiva para diferenciar entre amigos disponibles y ausentes.',
		'ConfChatHideIdle' : 'Ocultar los amigos ausentes.',
		'ConfDelayPopupPics' : 'Esperar 0.5 segundos antes de enseñar ventana emergente de las fotos.',
		'ConfDelayPopupPicsTimeout' : 'Retardo en mili-segundos antes de enseñar las fotos (Por defecto 500 mili-segundos)',
		'ConfDownloadVideo' : 'Añadir un enlace para descargar los videos de las páginas de videos. (Puede que necesites un <a href="http://es.wikipedia.org/wiki/Flash_Video#Reproductores_FLV" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Recargar automáticamente aplicaciones con errores despues de 5 segundos',
		'ConfExport' : 'Para exportar la configuración, copie el siguiente texto y guárdelo en un archivo.',
		'ConfExternalPopup' : 'Crear una ventana emergente con las fotos externas en tamaño real. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Lenguaje del FFixer',
		'ConfFacebookTimestamps' : 'Mostrar cuanto hace que fue creado (Ejemplo: "Hace 3 horas").',
		'ConfFBFTimestamps24' : 'Mostrar las marcas de tiempo de FFixer en formato 24 horas.',
		'ConfFBFTimestamps' : 'Añadir las marcas de tiempo de FFixer después de las marcas de tiempo de Facebook (Por ejemplo "11:45").',
		'ConfFriendRequestCountInTitle' : 'Mostrar el número de personas esperando para ser amigos en el título de la página.',
		'ConfGoogleApps' : 'Crear enlaces de Calendarios de Google compatibles con las Aplicaciones de Google.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Mostrar enlaces para añadir cumpleaños y eventos a <a href="http://es.wikipedia.org/wiki/Google_Calendar" target="_blank">Calendarios de Google</a>.',
		'ConfGoogleLanguage' : 'Idiomas para <a href="http://es.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Ocultar los mensajes de las aplicaciones.',
		'ConfHideEventStories' : 'Ocultar los mensajes de eventos.',
		'ConfHideFanStories' : 'Ocultar los mensajes de los fan.',
		'ConfHideFriendStories' : 'Ocultar los mensajes de los amigos.',
		'ConfHideGroupStories' : 'Ocultar los mensajes de los grupos.',
		'ConfHideLinkStories' : 'Ocultar los mensajes de los vínculos.',
		'ConfHidePhotoStories' : 'Ocultar los mensajes de las fotos.',
		'ConfHideProfilePicStories' : 'Ocultar los mensajes de las fotos del perfil.',
		'ConfHideRead' : 'Ocultar los mensajes de Live Feed que han sido marcados como leídos.',
		'ConfHideRelationshipStories' : 'Ocultar mensajes de las relaciones.',
		'ConfHideStatusStories' : 'Ocultar mensajes de estado.',
		'ConfHideVideoStories' : 'Ocultar mensajes de los vídeos.',
		'ConfHideWallStories' : 'Ocultar mensajes de los muros.',
		'ConfHomeChat' : 'Mostrar la sección de chat.',
		'ConfHomeEvents' : 'Mostrar la sección de eventos.',
		'ConfHomeFindFriends' : 'Mostrar la sección de "Conecta con tus amigos".',
		'ConfHomeLeftAlign' : 'Alinear a la izquierda el contenido de la pagina de inicio.',
		'ConfHomeLeftAlign' : 'Alinear a la izquierda el contenido de la página principal.',
		'ConfHomeLeftColumn' : 'Mostrar la columna izquierda.',
		'ConfHomeLeftColumnFixed' : 'Mantener la columna izquierda siempre visible.',
		'ConfHomeLink' : 'Mostrar el vínculo de Home en el menú superior.',
		'ConfHomeNavigation' : 'Mostrar la sección de navegación.',
		'ConfHomePeopleYouMayKnow' : 'Mostrar la sección sugerencia de amigos.',
		'ConfHomePokes' : 'Mostrar la sección de Toques.',
		'ConfHomeProfile' : 'Mostrar la sección de perfil.',
		'ConfHomeRequests' : 'Mostrar la sección de Peticiones.',
		'ConfHomeRightColumn' : 'Mostrar la columna derecha.',
		'ConfHomeStretch' : 'Ajustar ancho de la página principal al tamaño del navegador.',
		'ConfiCalendar' : 'Añadir enlaces para descargar un archivo <a href="http://es.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con todos los cumpleaños.',
		'ConfImport' : 'Para importar la configuración, pegue aquí el texto anteriormente guardado y haga clic en "Importar".',
		'ConfInboxCountInTitle' : 'Mostrar el número de mensajes nuevos de la bandeja de entrada en el título de la página',
		'ConfLogoutLink' : 'Añadir vínculo para cerrar la sesión en el menú superior.',
		'ConfNewTabSearch' : 'Hacer que los resultados de una busqueda se abran en una nueva pestaña al pulsar CTRL + Enter.',
		'ConfNotificationCountInTitle' : 'Mostrar el número de nuevas notificaciones en el título de la página.',
		'ConfPageTitle' : 'Eliminar "Facebook |" del titulo de cada página.',
		'ConfPhotoPopup' : 'Ampliar foto en ventana emergente al pasar el ratón sobre ella.',
		'ConfPopupAutoClose' : 'Cerrar ventana emergente automáticamente.',
		'ConfPopupPosition' : 'Posicion de la ventana emergente',
		'ConfPopupSmartAutoClose' : 'Prevenir que las ventanas emergentes se cierren automáticamente cuando el ratón pase por encima de ellas.',
		'ConfProcessInterval' : 'Intervalo en mili-segundos en el cual se procesa la página (Por defecto 1000):',
		'ConfProfileLink' : 'Mostrar el vínculo del perfil en el menú superior.',
		'ConfProfilePicPopup' : 'Ampliar foto del perfil en una ventana emergente al pasar el ratón sobre ella.',
		'ConfProtocolLinks' : 'Convertir los IDs de los programas de chats de los perfiles en enlaces para comemzar un chat (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Acerca de FFixer',
		'ConfSectionAdvanced' : 'Avanzado',
		'ConfSectionEvents' : 'Cumpleaños/Eventos',
		'ConfSectionHomePage' : 'Inicio',
		'ConfSectionImportExport' : 'Importar/Exportar',
		'ConfSectionMenu' : 'Menús/Chat',
		'ConfSectionOther' : 'Otras Opciones',
		'ConfSectionPageTitle' : 'Título de la Página',
		'ConfSectionPictures' : 'Fotos',
		'ConfSectionShortcuts' : 'Atajos de Teclado',
		'ConfSecureLinks' : 'Hacer que los links apunten a paginas HTTPS.',
		'ConfShortcutList' : '<b>Atajos de Teclado</b> (sensible a la diferencia entre minúsculas y mayúsculas):<br /><br /><i>Desde cualquier página:</i><br />&nbsp;<b>A</b> - Álbumes/Fotos<br />&nbsp;<b>B</b> - Activar/Desactivar lista de amigos (Amigos conectados)<br />&nbsp;<b>C</b> - Configuración de FFixer<br />&nbsp;<b>D</b> - Cumpleaños<br />&nbsp;<b>E</b> - Eventos<br />&nbsp;<b>F</b> - Amigos<br />&nbsp;<b>H</b> - Página de Inicio<br />&nbsp;<b>I</b> - Bandeja de Entrada<br />&nbsp;<b>K</b> - Añadir Marcador<br />&nbsp;<b>L</b> - Seleccionar vínculo para terminar la sesión (presione Enter después para terminar la sesión)<br />&nbsp;<b>N</b> - Notificaciones<br />&nbsp;<b>P</b> - Perfil<br />&nbsp;<b>R</b> - Peticiones<br />&nbsp;<b>S</b> - Saltar a el campo de búsqueda<br />&nbsp;<b>T</b> - Traducir el texto seleccionado<br />&nbsp;<b>?</b> - Mostrar la información de depuración de FFixer<br />&nbsp;<b><escape></b> - Cerrar la ventana emergente creada por FFixer<br /><br /><i>Desde la página de inicio (filtros)</i>:<br />&nbsp;<b>a</b> - Páginas<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupos<br />&nbsp;<b>l</b> - Vínculos<br />&nbsp;<b>n</b> - Noticias<br />&nbsp;<b>p</b> - fotos<br />&nbsp;<b>s</b> or <b>u</b> - Estatus de las Actualizaciones<br />&nbsp;<b>t</b> - Notas<br />&nbsp;<b>v</b> - Vídeos<br /><br /><i>Desde los perfiles</i>:<br />&nbsp;<b>i</b> - Información<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Muro<br />&nbsp;<b>x</b> - Cajas<br /><br /><i>Desde las páginas con paginación (previo, siguiente, etc)</i><br />&nbsp;<b><left arrow></b> - Previo<br />&nbsp;<b><right arrow></b> - Siguiente<br />&nbsp;<b><shift> + <left arrow></b> - Primera (cuando este disponible)<br />&nbsp;<b><shift> + <right arrow></b> - Ultimo (cuando este disponible)<br /><br /><i>Al ver albumes/fotos:</i><br />&nbsp;<b>a</b> - Ver todas la miniaturas (cuando este disponible)<br />&nbsp;<b>b</b> - Ver fotos grandes<br />&nbsp;<b>c</b> - Ver comentarios<br />&nbsp;<b>k</b> - De vuelta al álbum<br />&nbsp;<b>m</b> - Fotos de (personas) y yo<br /><br /><i>Al ver albumes recientes y fotos subidas/marcadas:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Albumes Recientes<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Fotos de Móviles<br />&nbsp;<b>o</b> - Fotos de mi<br />&nbsp;<b>p</b> - Mis Fotos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Amigos Marcados', 'ConfTopBarHoverOpacity' : 'Al pasar el ratón por encima', 'FacebookFixerConflict' : 'Facebook Fixer ahora se llama FFixer.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook Fixer manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aquí para ver instrucciones</a>.',
		'ConfShortcuts' : 'Abilitar los atajos de teclado.',
		'ConfSign' : 'Mostrar los signos zodiacales de las personas en sus perfiles (Si indican fecha de nacimiento).',
		'ConfTopBarFixed' : 'Mantener la barra superior de menu en la pantalla siempre.',
		'ConfTopBarHoverOpacity' : 'Al pasar el ratón por encima',
		'ConfTopBarOpacity' : 'Transparencia de la barra de menu superior',
		'ConfUpdates' : 'Revisar Userscripts.org diarimente por si hay actualizaciones en FFixer. O <a href="#" id="fbfUpdateLink" onclick="return false;">revisar Ahora</a>.',
		'CreatingFile' : 'Creando Archivo',
		'DownloadVideo' : 'Descargar el Video',
		'ExportICalendarFile' : 'Exportar el archivo de iCalendar',
		'ExportICalendarFileWarning' : '(Esto puede tardar bastante dependiendo de la cantidad de amigos)',
		'FacebookFixerConflict' : 'Facebook Fixer ahora se llama FFixer.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook Fixer manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aquí para ver instrucciones</a>.',
		'fullAlbumLoaded' : 'álbum completamente cargado',
		'Import' : 'Importar',
		'ImportConfirm' : '¿Está seguro que desea importar esta configuración?\nPerderá la configuración actual al hacer esto.',
		'ImportFailure' : 'Ha ocurrido un error al tratar de importar la configuración.',
		'ImportSuccess' : 'Se ha importado la configuración. ¿Desea refrescar la página?',
		'Left' : 'Izquierda',
		'LoadingAllPhotos' : 'Cargando todas las fotos...',
		'loadingFullAlbum' : 'Cargando álbumes completos...',
		'LoadingPic' : 'Cargando Foto...',
		'LoadPhotosWarning' : 'Cargar todas las fotos puede tomar mucho tiempo',
		'Months' : new Array('enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'),
		'ProtocolGoogle' : 'Chatear con %s usando Google Talk',
		'ProtocolMSN' : 'Chatear con %s usando Windows Live',
		'ProtocolSkype' : 'Llamar a  %s usando Skype',
		'ProtocolYahoo' : 'Chatear con %s usando Yahoo Messenger',
		'Refresh' : 'Recargar',
		'ReloadErrorPage' : 'Hacer clic para intentar de nuevo o esperar 5 segundos',
		'Remove' : 'Eliminar',
		'Right' : 'Derecha',
		'ShowBigPictures' : 'Mostrar Imágenes Grandes',
		'Signs' : new Array('Capricornio','Acuario','Piscis','Aries','Tauro','Géminis ','Cancer','Leo','Virgo','Libra','Escorpio','Sagitario'),
		'today' : 'hoy',
		'Translators' : 'Tranductores',
		'UpdateAvailable1' : 'Hay una actualización disponible para FFixer',
		'UpdateAvailable2' : '¿Desea actualizar ahora?',
		'UpdateHomepage' : 'Ir a la página de inicio',
		'UpdateInstall' : 'Instalar ahora',
		'UpdateTomorrow' : 'Recordar mañana',
		'yearsOld' : '%s años'
	},

	// French - Contributed by Serge Thiry (20100329)
	fr : {
		'_language' : 'French',
		'AddToCalendar' : 'Ajouter &agrave; l\'Agenda',
		'AddToGoogleCalendar' : 'Ajouter au Google Agenda',
		'all' : 'tout',
		'All' : 'Tout',
		'AllPhotosLoaded' : 'Toutes les photos sont charg&eacute;es',
		'Automatic' : 'Automatique',
		'Birthday' : 'Anniversaire de %s',
		'BookmarkAdd' : 'Ajout d\'un Marque-Page',
		'BookmarkConfirmRemoval' : 'Etes vous s&ucirc;r de vouloir supprimer le marque-page "%s"?',
		'BookmarkDoesNotExist' : 'Cette page n\'a pas &eacute;t&eacute; marqu&eacute;e.\n\nAllez &agrave; la page que vous souhaitez supprimer et r&eacute;-essayez.',
		'BookmarkExists' : 'Cette page a d&eacute;j&agrave; &eacute;t&eacute; marqu&eacute;e.\n\nAllez &agrave; la page que vous souhaitez marquer et r&eacute;-essayez.',
		'BookmarkNamePrompt' : 'Entrez un nom pour ce marque-page:\n%s',
		'BookmarkRemove' : 'Supprimer le marque-page',
		'Bookmarks' : 'Marque-pages',
		'BrowserUnsupported' : 'Votre navigateur Internet ne supporte pas cette fonction.',
		'CreatingFile' : 'Cr&eacute;ation du fichier',
		'Close' : 'Fermer',
		'ConfigureFacebookFixer' : 'Configurer FFixer',
		'ConfigureInstructions' : 'Tout changement est imm&eacute;diatement sauvegard&eacute;, mais il est possible que certains changements ne s\'actualisent pas dans des onglets d&eacute;j&agrave; ouverts.',
		'ConfAge' : 'Affichage de l\'&acirc;ge des personnes sur leur profil (si la date de naissance ins&eacute;r&eacute;e est compl&egrave;te).',
		'ConfAutoBigAlbumPictures' : 'Affichage automatique des photos agrandies &agrave; l\'ouverture d\'un album.',
		'ConfAutoLoadFullAlbum' : 'Chargement automatique des aper&ccedil;us de toutes les images contenues dans l\'album, sur une seule page.',
		'ConfAutoLoadTaggedPhotos' : 'Chargement automatique des aper&ccedil;us de toutes les photos identifi&eacute;es, sur une seule page (l\'onglet Photos des profils).',
		'ConfAutoReadMore' : 'Clic automatique sur les liens "Afficher d\'avantage".',
		'ConfBigAlbumPictures' : 'Ajout d\'un lien dans les albums permettant d\'afficher une version agrandie de toutes les images de la page.',
		'ConfBookmarks' : 'Ajoute un sous-menu Marque-Pages &agrave; la barre de menu sup&eacute;rieure.',
		'ConfBottomBarHoverOpacity' : 'Au passage de la souris',
		'ConfBottomBarOpacity' : 'Transparence de la barre de menu inf&eacute;rieure',
		'ConfCalendarBirthDate' : 'Ajout de la date d\'anniversaire de la personne dans les d&eacute;tails de l\'&eacute;v&eacute;nement.',
		'ConfCalendarFullName' : 'Utilisation du nom complet de la personne lors de l\'anniversaire de celle-ci (&agrave; la place du pr&eacute;nom uniquement).',
		'ConfChatDifferentiate' : 'Utilisation du gras et de l\'italique pour diff&eacute;rencier les amis connect&eacute;s et d&eacute;connect&eacute;s.',
		'ConfChatHideIdle' : 'Cacher les amis inactifs.',
		'ConfDelayPopupPics' : 'Ajout d\'un court temps d\'attente avant l\'affichage des images en popup.',
		'ConfDelayPopupPicsTimeout' : 'Temps d\'attente avant l\'affichage des images en popup, en millisecondes (par d&eacute;faut=500):',
		'ConfDownloadVideo' : 'Ajout d\'un lien de t&eacute;l&eacute;chargement des vid&eacute;os sur la page des vid&eacute;os. (Il peut s\'av&eacute;rer n&eacute;cessaire d\'installer un <a href="http://fr.wikipedia.org/wiki/Flash_Video#Logiciels_de_lecture_de_ce_format" target="_blank">lecteur de vid&eacute;os Flash</a>)',
		'ConfErrorPageReload' : 'Rechargement automatique de la page apr&egrave;s 5 secondes en cas d\'erreur.',
		'ConfExport' : 'Pour exporter vos param&egrave;tres, copiez le texte suivant et sauvez-le dans un fichier.',
		'ConfExternalPopup' : 'Affichage en taille originale des images externes en popup. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Langue de FFixer',
		'ConfFacebookTimestamps' : 'Affichage de la datation Facebook (ex. "Il y a 3 heures").',
		'ConfFBFTimestamps' : 'Ajout de la datation FFixer apr&egrave;s la datation Facebook (ex. "11:45").',
		'ConfFBFTimestamps24' : 'Affichage de la datation FFixer au format 24 heures.',
		'ConfFriendRequestCountInTitle' : 'Affichage du nombre de demande d\'ajout &agrave; la liste d\'amis dans l\'en-t&ecirc;te de la page.',
		'ConfGoogleApps' : 'Cr&eacute;ation de liens Google Agenda compatibles avec les Google Apps.',
		'ConfGoogleAppsDomain' : 'Nom de domaine',
		'ConfGoogleCalendar' : 'Ajout d\'un lien pour ajouter les anniversaires et les &eacute;v&eacute;nements au <a href="http://fr.wikipedia.org/wiki/Google_Agenda" target="_blank">Google Agenda</a>.',
		'ConfGoogleLanguage' : 'Langue utilis&eacute;e par <a href="http://fr.wikipedia.org/wiki/Google_Traduction" target="_blank">Google Traduction</a>',
		'ConfHideApplicationStories' : 'Cache les publications des applications.',
		'ConfHideEventStories' : 'Cache les publications des &eacute;v&eacute;nements.',
		'ConfHideFanStories' : 'Cache les publications des pages fan.',
		'ConfHideFriendStories' : 'Cache les publications des ajouts &agrave; la liste d\'amis .',
		'ConfHideGroupStories' : 'Cache les publications des groupes.',
		'ConfHideLinkStories' : 'Cache les publications des liens.',
		'ConfHidePhotoStories' : 'Cache les publications des photos.',
		'ConfHideProfilePicStories' : 'Cache les publications des changements de photo de profil.',
		'ConfHideRead' : 'Cache les publications de la page principale qui ont &eacute;t&eacute; marqu&eacute;es comme lues.',
		'ConfHideRelationshipStories' : 'Cache les publications des relations.',
		'ConfHideStatusStories' : 'Cache les publications des status.',
		'ConfHideVideoStories' : 'Cache les publications des vid&eacute;os.',
		'ConfHideWallStories' : 'Cache les publications des messages sur le mur.',
		'ConfHomeChat' : 'Affichage de la section Discussion intantan&eacute;e.',
		'ConfHomeEvents' : 'Affichage de la section Ev&eacute;nements.',
		'ConfHomeFindFriends' : 'Affichage de la section Communiquez avec vos amis.',
		'ConfHomeLeftAlign' : 'Alignement &agrave; gauche du contenu de la page d\'accueil.',
		'ConfHomeLeftColumn' : 'Affichage de la colonne de gauche.',
		'ConfHomeLeftColumnFixed' : 'Maintien l\'affichage de la colonne de gauche &agrave; l\'&eacute;cran, m&ecirc;me apr&egrave;s &ecirc;tre descendu dans la page.',
		'ConfHomeLink' : 'Affichage du lien Accueil dans la barre de menu sup&eacute;rieure.',
		'ConfHomePeopleYouMayKnow' : 'Affichage de la section Suggestions.',
		'ConfHomeNavigation' : 'Affichage de la section Navigation.',
		'ConfHomePokes' : 'Affichage de la section Pokes.',
		'ConfHomeProfile' : 'Affichage de la section Profil.',
		'ConfHomeRequests' : 'Affichage de la section Invitations.',
		'ConfHomeRightColumn' : 'Affichage de la colonne de droite.',
		'ConfHomeStretch' : 'Etirement du contenu de la page d\'accueil jusqu\'&agrave; la largeur compl&egrave;te de la fen&ecirc;tre.',
		'ConfiCalendar' : 'Ajoute un lien de t&eacute;l&eacute;chargement d\'un fichier <a href="http://fr.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> contenant tous les anniversaires.',
		'ConfImport' : 'Pour importer vos param&egrave;tres, remplacez le texte suivant par celui pr&eacute;c&eacute;demment sauvegard&eacute; et cliquez sur "Importer".',
		'ConfInboxCountInTitle' : 'Affichage du nombre de nouveaux messages dans l\'en-t&ecirc;te de la page.',
		'ConfLogoutLink' : 'Ajoute un lien de d&eacute;connection dans la barre de menu sup&eacute;rieure.',
		'ConfNotificationCountInTitle' : 'Affichage du nombre de notifications dans l\'en-t&ecirc;te de la page.',
		'ConfNewTabSearch' : 'Fait appara&icirc;tre les r&eacute;sultats de la recherche dans un nouvel onglet/une nouvelle fen&ecirc;tre lors de l\'utilisation de CTRL + Enter pour valider la recherche.',
		'ConfPageTitle' : 'Suppression du "Facebook |" contenu dans l\'en-t&ecirc;te de chaque page.',
		'ConfPhotoPopup' : 'Affichage de versions plus grandes des photos en popup au passage de la souris.',
		'ConfPopupAutoClose' : 'Fermeture automatique des images en popup.',
		'ConfPopupSmartAutoClose' : 'Emp&ecirc;che la fermeture automatique des images en popup si la souris se trouve dessus.',
		'ConfPopupPosition' : 'Position des images en popup',
		'ConfProcessInterval' : 'Intervalle à laquelle la page sera trait&eacute;e, en millisecondes (par d&eacute;faut=1000):',
		'ConfProfileLink' : 'Affichage du lien Profil dans la barre de menu sup&eacute;rieure.',
		'ConfProfilePicPopup' : 'Affichage de versions plus grandes des photos de profil en popup au passage de la souris',
		'ConfProtocolLinks' : 'Transforme les identifiants de messagerie des profils en liens permettant de commencer une conversation instantan&eacute;e (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'A propos de FFixer',
		'ConfSectionAdvanced' : 'Avanc&eacute;',
		'ConfSectionEvents' : 'Anniversaires/Ev&eacute;nements',
		'ConfSectionImportExport' : 'Importer/Exporter',
		'ConfSectionFeeds' : 'Publications sur la page d\'accueil',
		'ConfSectionHomePage' : 'Page d\'accueil',
		'ConfSectionLiveFeed' : 'Fil d\'actualit&eacute;',
		'ConfSectionMenu' : 'Menus/Discussion instantan&eacute;e',
		'ConfSectionOther' : 'Autres options',
		'ConfSectionPageTitle' : 'En-t&ecirc;te de la page',
		'ConfSectionPictures' : 'Photos',
		'ConfSectionShortcuts' : 'Raccourcis clavier',
		'ConfSecureLinks' : 'Force les liens Facebook &agrave; pointer vers des pages HTTPS.',
		'ConfShortcutList' : '<b>Raccourcis clavier</b> (sensible &agrave; la casse):<br /><br /><i>Sur toutes les pages:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Affichage de la liste d\'amis (amis en ligne)<br />&nbsp;<b>C</b> - Configuration de FFixer<br />&nbsp;<b>D</b> - Anniversaires<br />&nbsp;<b>E</b> - Ev&eacute;nements<br />&nbsp;<b>F</b> - Amis<br />&nbsp;<b>H</b> - Page d\'accueil<br />&nbsp;<b>I</b> - Bo&icirc;te de r&eacute;ception<br />&nbsp;<b>K</b> - Ajout d\'un marque-page<br />&nbsp;<b>L</b> - S&eacute;lection du lien de d&eacute;connection (appuyez ensuite sur Enter pour vous d&eacute;connecter)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Votre profil<br />&nbsp;<b>R</b> - Invitations<br />&nbsp;<b>S</b> - Saut au champ de recherche<br />&nbsp;<b>T</b> - Traduction du texte s&eacute;lectionn&eacute;<br />&nbsp;<b>?</b> - Affiche les informations de debug de FFixer<br />&nbsp;<b>&lt;escape&gt;</b> - Ferme les popups cr&eacute;es par FFixer<br /><br /><i>Sur la page d\'accueil (filtres)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Fil d\'actualit&eacute;s r&eacute;centes<br />&nbsp;<b>g</b> - Groupes<br />&nbsp;<b>l</b> - Liens<br />&nbsp;<b>n</b> - Fil d\'actualit&eacute;s &agrave; la une<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Changements de status<br />&nbsp;<b>t</b> - Articles<br />&nbsp;<b>v</b> - Vid&eacute;os<br /><br /><i>Sur les profils</i>:<br />&nbsp;<b>i</b> - Infos<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Mur<br />&nbsp;<b>x</b> - Encarts<br /><br /><i>Sur les pages avec pagination (pr&eacute;c&eacute;dent, suivant, etc)</i><br />&nbsp;<b>&lt;fl&egrave;che gauche&gt;</b> - Pr&eacute;c&eacute;dent<br />&nbsp;<b>&lt;fl&egrave;che droite&gt;</b> - Suivant<br />&nbsp;<b>&lt;shift&gt; + &lt;fl&egrave;che gauche&gt;</b> - Premier (si disponible)<br />&nbsp;<b>&lt;shift&gt; + &lt;fl&egrave;che droite&gt;</b> - Dernier (si disponible)<br /><br /><i>Lors de l\'affichage d\'albums/photos:</i><br />&nbsp;<b>a</b> - Chargement de tous les aper&ccedil;us (si disponible)<br />&nbsp;<b>b</b> - Affichage de plus grandes images<br />&nbsp;<b>c</b> - Affichage des commentaires<br />&nbsp;<b>k</b> - Retour &agrave; l\'album<br />&nbsp;<b>m</b> - Photos de (la personne) et de moi<br /><br /><i>Lors de l\'affichage d\'albums r&eacute;cents et de photos ajout&eacute;es/identifi&eacute;es:</i><br />&nbsp;<b>a</b> ou &nbsp;<b>r</b> - Albums r&eacute;cents<br />&nbsp;<b>m</b> ou &nbsp;<b>u</b> - Ajout depuis un mobile<br />&nbsp;<b>o</b> - Photos de moi<br />&nbsp;<b>p</b> - Mes photos<br />&nbsp;<b>t</b> ou &nbsp;<b>f</b> - Amis identifi&eacute;s',
		'ConfShortcuts' : 'Active les raccourcis clavier.',
		'ConfSign' : 'Affiche le signe zodiacal des personnes sur leur profil (si la date de naissance ins&eacute;r&eacute;e est compl&egrave;te).',
		'ConfTopBarFixed' : 'Maintien la barre de menu sup&eacute;rieure &agrave; l\'&eacute;cran, m&ecirc;me apr&egrave;s &ecirc;tre descendu dans la page.',
		'ConfTopBarHoverOpacity' : 'Au passage de la souris',
		'ConfTopBarOpacity' : 'Transparence de la barre de menu sup&eacute;rieure',
		'ConfUpdates' : 'V&eacute;rifie quotidiennement si une mise &agrave; jour de FFixer est disponible sur Userscripts.org. Ou <a href="#" id="fbfUpdateLink" onclick="return false;">v&eacute;rifier maintenant</a>.',
		'DownloadVideo' : 'T&eacute;l&eacute;charger la vid&eacute;o',
		'ExportICalendarFile' : 'Exporter en fichier iCalendar',
		'ExportICalendarFileWarning' : '(Cette op&eacute;ration prendra un moment si vous avez beaucoup d\'amis)',
		'FacebookFixerConflict' : 'FFixer est maintenant devenu FFixer. A cause du changement de nom, vous aurez besoin de d&eacute;sinstaller manuellement FFixer de votre explorateur, ou les deux scripts rentreront en conflit. Si vous n\'&ecirc;tes pas s&ucirc;r de comment faire pour d&eacute;sinstaller un userscript, <a %s>cliquez ici pour la marche &agrave; suivre</a>.',
		'fullAlbumLoaded' : 'l\'album complet est charg&eacute;',
		'Import' : 'Importer',
		'ImportConfirm' : 'Etes-vous s&ucirc;r de vouloir importer ces param&egrave;tres?\nVotre configuration actuelle sera perdue.',
		'ImportFailure' : 'Une erreur est survenue lors de l\'importation de vos param&egrave;tres.',
		'ImportSuccess' : 'Importation r&eacute;ussie. Voulez-vous recharger la page?',
		'Left' : 'Gauche',
		'ListeningRestarted' : 'FFixer s\'est remit \340 l\'\351coute des changements \351ventuels.',
		'ListeningStopped' : 'FFixer a arret\351 d\'\352tre \340 l\'\351coute des changements \351ventuels.\nAppuyez sur L (SHIFT + l) pour r\351-activer l\'\351coute',
		'LoadingAllPhotos' : 'Chargement de toutes les photos...',
		'loadingFullAlbum' : 'chargement de l\'album complet...',
		'LoadingPic' : 'Chargement de l\'image...',
		'LoadPhotosWarning' : 'Charger toutes les photos peut prendre un moment',
		'Months' : new Array('janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'),
		'ProtocolSkype' : 'Appeler %s via Skype',
		'ProtocolMSN' : 'Discuter avec %s via Windows Live',
		'ProtocolYahoo' : 'Discuter avec %s via Yahoo Messenger',
		'ProtocolGoogle' : 'Discuter avec %s via Google Talk',
		'ReloadErrorPage' : 'Cliquez ici pour essayer &agrave; nouveau, ou attendez 5 secondes',
		'Refresh' : 'Rafra&icirc;chir',
		'Remove' : 'Enlever',
		'Right' : 'Droite',
		'ShowBigPictures' : 'Afficher les images en plus grand',
		'Signs' : new Array('Capricorne','Verseau','Poissons','Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire'),
		'today' : 'aujourd\'hui',
		'Translators' : 'Traducteurs',
		'UpdateAvailable1' : 'Une mise &agrave; jour de FFixer est disponible',
		'UpdateAvailable2' : 'Voulez-vous effectuer la mise &agrave; jour ?',
		'UpdateHomepage' : 'Aller &agrave; la page principale',
		'UpdateInstall' : 'Installer maintenant',
		'UpdateTomorrow' : 'Me le rappeler demain',
		'yearsOld' : '%s ans'
	},

	// Italian - Contributed by Dario Archetti and GorGeouS (20101028)
	it : {
		'_language' : 'Italian',
		'AddToCalendar' : 'Aggiungi al calendario',
		'AddToGoogleCalendar' : 'Aggiungi a Google Calendar',
		'all' : 'tutto',
		'All' : 'Tutto',
		'AllPhotosLoaded' : 'Tutte le foto sono state caricate.',
		'Automatic' : 'Automatico',
		'Birthday' : 'Il compleanno di %s',
		'BookmarkAdd' : 'Aggiungi un nuovo segnalibro',
		'BookmarkExists' : 'Questa pagina è già tra i segnalibri.\n\nVai alla pagina che vuoi aggiungere e riprova.',
		'BookmarkNamePrompt' : 'Inserisci un nome per questo segnalibro:\n%s',
		'BookmarksConfirmRemoval' : 'Sei sicuro di voler rimuovere i segnalibri seguenti?',
		'BookmarksManage' : 'Manage Bookmarks',
		'BookmarksRemoveSelected' : 'Rimuovi Segnalibri Selezionati',
		'Bookmarks' : 'Segnalibri',
		'BrowserUnsupported' : 'Il tuo browser mom supporta questa funzionalita\'.',
		'CreatingFile' : 'Sto creando il file',
		'Close' : 'Chiudi',
		'ConfigureFacebookFixer' : 'Impostazioni di FFixer',
		'ConfigureInstructions' : 'I cambiamenti vengono salvati immediatamente, ma alcuni possono non avere effetto nelle schede già aperte.',
		'ConfAge' : 'Mostra l\'età nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfApplicationWhitelist' : 'Whitelist Applicazioni - Inserisci gli ID delle applicazioni che non vuoi che vengano nascoste. Separa gli ID con uno spazio.',
		'ConfAutoBigAlbumPictures' : 'Negli album mostra automaticamente immagini più grandi quando la pagina si apre.',
		'ConfAutoLoadFullAlbum' : 'Carica automaticamente le anteprime di tutte le immagini in un album o in una pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Carica automaticamente le anteprime di tutte le foto taggate in una pagina (nella sezione "Foto" dei profili).',
		'ConfAutoReadMore' : 'Clicca automaticamente sui link "Mostra tutto".',
		'ConfBigAlbumPictures' : 'Aggiungi un link negli album per mostrare una versione più grande di ogni foto nella pagina.',
		'ConfBigAlbumPicturesBorder' : 'Aggiungi un bordo intorno alle foto quando vengono visualizzate in formato grande.',
		'ConfBookmarks' : 'Aggiungi il sotto-menu "Segnalibri" alla barra superiore.',
		'ConfBottomBarHoverOpacity' : 'Al passaggio del mouse',
		'ConfBottomBarOpacity' : 'Trasparenza della barra inferiore',
		'ConfCalendarBirthDate' : 'Includi il compleanno di una persona nei dettagli dell\'evento.',
		'ConfCalendarFullName' : 'Usa il nome completo di una persona come titolo per i compleanni. (invece che soltanto il nome).',
		'ConfChatDifferentiate' : 'Usa il grassetto e l\'italico per differenziare contatti disponibili e inattivi.',
		'ConfChatHideIdle' : 'Nascondi i contatti inattivi.',
		'ConfDelayPopupPics' : 'Mostra i popup con un piccolo ritardo.',
		'ConfDelayPopupPicsTimeout' : 'Ritardo prima di mostrare i popup (default=500):',
		'ConfDownloadVideo' : 'Aggiungi un link per scaricare i video. (Per riprodurli avrai bisogno di un <a href="http://it.wikipedia.org/wiki/Flash_Video" target="_blank">programma esterno</a>)',
		'ConfErrorPageReload' : 'Dopo 5 secondi ricarica automaticamente la pagina di errore di un\'applicazione.',
		'ConfExport' : 'Per esportare le tue impostazioni, copia il testo sotto e salvalo in un file.',
		'ConfExternalPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle immagini esterne. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Lingua di FFixer',
		'ConfFacebookTimestamps' : 'Mostra l\'orario dei post usando il metodo classico (es. "3 ore fa").',
		'ConfFBFTimestamps' : 'Mostra l\'orario dei post usando l\'ora esatta (es. "11:45").',
		'ConfFBFTimestamps24' : 'Mostra l\'ora dei post nel formato 24 ore.',
		'ConfFriendRequestCountInTitle' : 'Mostra il numero di richieste di amicizia nella barra del titolo.',
		'ConfGoogleApps' : 'Crea un link a Google Calendar compatibile con Google Apps.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Aggiungi link per inserire compleanni ed eventi a <a href="http://it.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Lingua per <a href="http://it.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Nascondi i post delle applicazioni.',
		'ConfHideEgos' : 'Nascondi tutte le sezioni "personali" (potrebbe nascondere la maggior parte delle raccomandazioni di Facebook).',
		'ConfHideEventStories' : 'Nascondi i post degli eventi.',
		'ConfHideFacebookCountInTitle' : 'Nascondi la visualizzazione del numero di nuovi messaggi da leggere.',
		'ConfHideFriendStories' : 'Nascondi le notizie "ha stretto amicizia con...".',
		'ConfHideGroupStories' : 'Nascondi le notizie "si è iscritto al gruppo...".',
		'ConfHideHovercards' : 'Nascondi hovercard (il popup che appare quando si passa con il mouse sopra il nome di una persona).',
		'ConfHideLikeStories' : 'Nascondi i post riguardanti i "Mi piace".',
		'ConfHideLinkStories' : 'Nascondi i post riguardanti link.',
		'ConfHideNoteStories' : 'Nascondi i post riguardanti le note.',
		'ConfHidePhotoStories' : 'Nascondi i post riguardanti foto.',
		'ConfHidePlaceStories' : 'Nascondi i post riguardanti i luoghi.',
		'ConfHideProfilePicStories' : 'Nascondi i post riguardanti foto del profilo.',
		'ConfHideRead' : 'Nascondi gli elementi del live feed che sono stati segnati come già letti.',
		'ConfHideRelationshipStories' : 'Nascondi le notizie riguardanti relazioni.',
		'ConfHideStatusStories' : 'Nascondi gli aggiornamenti di stato.',
		'ConfHideVideoStories' : 'Nascondi i post di video.',
		'ConfHideWallStories' : 'Nascondi le attività delle bacheche.',
		'ConfHomeBeta' : 'Mostra la sezione Sneak Peek di Facebook.',
		'ConfHomeChat' : 'Mostra gli amici online.',
		'ConfHomeChatNames' : 'Mostra i nomi nella sezione della chat.',
		'ConfHomeEvents' : 'Mostra la sezione "Eventi".',
		'ConfHomeFindFriends' : 'Mostra la sezione "Connettiti con i tuoi amici".',
		'ConfHomeLeftAlign' : 'Allinea a sinistra il contenuto della homepage.',
		'ConfHomeLeftColumn' : 'Mostra la colonna di sinistra.',
		'ConfHomeLeftColumnFixed' : 'Mantieni visibile la colonna di sinistra anche dopo lo scroll.',
		'ConfHomeLink' : 'Mostra il link "Home" nella barra superiore.',
		'ConfHomeNavigation' : 'Mostra i filtri.',
		'ConfHomePokes' : 'Mostra la sezione "Poke".',
		'ConfHomeProfile' : 'Mostra la propria immagine del profilo.',
		'ConfHomeRecommendations' : 'Mostra racommandazioni (Persone che potresti conoscere, Pagine raccomandate, ecc).',
		'ConfHomeRequests' : 'Mostra la sezione "Richieste".',
		'ConfHomeRightColumn' : 'Mostra la colonna di destra.',
		'ConfHomeStretch' : 'Allarga la homepage affinché si adatti alla larghezza della finestra del browser.',
		'ConfHomeStretchComments' : 'Allarga la zona dei commenti sulla homepage.',
		'ConfiCalendar' : 'Aggiungi link per scaricare un file di <a href="http://it.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con tutti i compleanni.',
		'ConfImport' : 'Successivamente, per importare le tue impostazioni, sovrascrivi il testo sottostante con quello che hai salvato precedentemente e clicca "Importa".',
		'ConfInboxCountInTitle' : 'Mostra il numero di nuovi messaggi nel titolo della pagina.',
		'ConfLogoutLink' : 'Aggiungi un link per il logout alla barra superiore',
		'ConfNotificationCountInTitle' : 'Mostra il numero di notifiche nella barra del titolo.',
		'ConfNewTabSearch' : 'Fai in modo che i risultati delle ricerche si aprano in una nuova scheda quando si preme CTRL + Invio per cercare.',
		'ConfPageTitle' : 'Rimuovi "Facebook |" dal titolo di ciascuna pagina.',
		'ConfPhotoPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle foto.',
		'ConfPopupAutoClose' : 'Chiudi i popup automaticamente.',
		'ConfPopupSmartAutoClose' : 'Non far chiudere i popup se il mouse è sopra di essi.',
		'ConfPopupPosition' : 'Posizione del popup',
		'ConfPopupWhileTagging' : 'Mostra i popup delle immagini anche sui tag.',
		'ConfProcessInterval' : 'Intervallo dopo il qualeprocessare la pagina, in millisecondi (default=1000):',
		'ConfProfileLink' : 'Mostra il link "Profilo" nella barra superiore.',
		'ConfProfilePicPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle immagini dei profili.',
		'ConfProtocolLinks' : 'Converti gli ID di messaggistica nei profili in link che iniziano una conversazione. (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Riguardo di FFixer',
		'ConfSectionAdvanced' : 'Avanzate',
		'ConfSectionEvents' : 'Compleanni/Eventi',
		'ConfSectionImportExport' : 'Importa/Esporta',
		'ConfSectionFeeds' : 'Notizie',
		'ConfSectionHomePage' : 'Home Page',
		'ConfSectionLiveFeed' : 'Aggiornamenti in tempo reale',
		'ConfSectionMenu' : 'Menu/Chat',
		'ConfSectionOther' : 'Altre opzioni',
		'ConfSectionPageTitle' : 'Titolo della pagina',
		'ConfSectionPictures' : 'Foto',
		'ConfSectionShortcuts' : 'Scorciatoie da tastiera',
		'ConfSecureLinks' : 'Forza i link di Facebook ad aprire pagine HTTPS.',
		'ConfShortcutList' : '<b>Scorciatoie da tasiera</b> (prestare attenzione a maiuscole/minuscole):<br /><br /><i>In ogni pagina</i><br /> <b>A</b> - Album/foto<br /> <b>B</b> - Apri la lista degli amici online<br /> <b>C</b> - Impostazioni di FFixer<br /> <b>D</b> - Compleanni<br /> <b>E</b> - Eventi<br /> <b>F</b> - Amici<br /> <b>H</b> - Home page<br /> <b>I</b> - Posta in arrivo<br /> <b>K</b> - Aggiungi segnalibro<br /> <b>L</b> - Seleziona il link per effettuare il logout (poi premi Invio per effettuare il logout)<br /> <b>N</b> - Notifiche<br /> <b>P</b> - Il tuo profilo<br /> <b>R</b> - Richieste<br /> <b>S</b> - Seleziona il campo di ricerca<br /> <b>T</b> - Traduci il testo selezionato<br /> <b>?</b> - Mostra le informazioni di debug di FFixer<br /> <b><escape></b> - Chiudi i pop-up creati da FFixer<br /><br /><i>Dalla home page (filtri)</i>:<br /> <b>a</b> - Pagine<br /> <b>f</b> - Notizie in tempo reale<br /> <b>g</b> - Gruppi<br /> <b>l</b> - Link<br /> <b>n</b> - Notizie<br /> <b>p</b> - Foto<br /> <b>s</b> o <b>u</b> - Aggiornamenti di stato<br /> <b>t</b> - Note<br /> <b>v</b> - Video<br /><br /><i>Dai profili</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Foto<br /> <b>w</b> - Bacheca<br /> <b>x</b> - Riquadri<br /><br /><i>Dalle pagine con paginazione (precedente, successivo, etc)</i><br /> <b><freccia sinistra></b> - Precedente<br /> <b><freccia destra></b> - Successivo<br /> <b><shift> + <freccia sinistra></b> - Primo (Quando disponibile)<br /> <b><shift> + <freccia destra></b> - Ultimo (Quando disponibile)<br /><br /><i>Mentre si guardano album/foto:</i><br /> <b>a</b> - Carica tutte le anteprime (quando disponibile)<br /> <b>b</b> - Mostra immagini grandi<br /> <b>c</b> - Mostra i commenti<br /> <b>k</b> - Torna all\' album<br /> <b>m</b> - Foto con me<br /><br /><i>Mentre si guardano album recenti e foto appena caricate/taggate:</i><br /> <b>a</b> o  <b>r</b> - Album recenti<br /> <b>m</b> o  <b>u</b> - Upload via mobile<br /> <b>o</b> - Foto con me<br /> <b>p</b> - Le mie foto<br /> <b>t</b> o  <b>f</b> - Amici taggati',
		'ConfShortcuts' : 'Attiva le scorciatoie da tastiera.',
		'ConfSign' : 'Mostra il segno zodiacale nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfTopBarFixed' : 'Mantieni fissa la posizione della barra superiore.',
		'ConfTopBarHoverOpacity' : 'Al passaggio del mouse',
		'ConfTopBarOpacity' : 'Trasparenza della barra superiore',
		'ConfUpdates' : 'Controlla ogni giorno Userscripts.org per eventuali update, oppure <a href="#" id="fbfUpdateLink" onclick="return false;">controlla adesso!</a>.',
		'DownloadVideo' : 'Scarica il video.',
		'ExportICalendarFile' : 'Esporta file di iCalendar.',
		'ExportICalendarFileWarning' : '(Questo impiegherà un po\' se hai molti amici!)',
		'FacebookFixerConflict' : 'FFixer ha cambiato nome in FFixer. A causa del cambiamento dovrai disinstallare manualmente FFixer dal tuo browser, o i due script andranno in conflitto. Se non sei sicuro di come disinstallare un userscript <a %s>clicca qui per le istruzioni</a>.',
		'fullAlbumLoaded' : 'l\'album completo è stato caricato.',
		'Import' : 'Importa',
		'ImportConfirm' : 'Sei sicuro di voler importare queste impostazioni?\nLe tue impostazioni attuali saranno sovrascritte.',
		'ImportFailure' : 'Un errore è accaduto durante l\'importazione delle impostazioni.',
		'ImportSuccess' : 'Importazione completata. Vuoi ricaricare la pagina?',
		'Left' : 'Sinistra',
		'LoadingAllPhotos' : 'Sto caricando tutte le foto...',
		'loadingFullAlbum' : 'Sto caricando l\'album completo...',
		'LoadingPic' : 'Sto caricando l\'immagine...',
		'LoadPhotosWarning' : 'Il caricamento di tutte le immagini può richiedere qualche minuto.',
		'Months' : new Array('Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'),
		'ProtocolSkype' : 'Chiama %s usando Skype',
		'ProtocolMSN' : 'Chatta con %s usando Windows Live',
		'ProtocolYahoo' : 'Chatta con %s usando Yahoo Messenger',
		'ProtocolGoogle' : 'Chatta con %s usando Google Talk.',
		'ReloadErrorPage' : 'Clicca per riprovare, oppure aspetta 5 secondi.',
		'Refresh' : 'Ricarica',
		'Remove' : 'Rimuovi',
		'Right' : 'Destra',
		'ShowBigPictures' : 'Mostra immagini a grandi dimensioni.',
		'Signs' : new Array('Capricorno','Aquario','Pesci','Ariete','Toro','Gemelli','Cancro','Leone','Vergine','Bilancia','Scorpione','Sagittario'),
		'today' : 'oggi',
		'Translators' : 'Traduttori',
		'UpdateAvailable1' : 'È disponibile un update per FFixer.',
		'UpdateAvailable2' : 'Vuoi scaricare l\'aggiornamento adesso?',
		'UpdateHomepage' : 'Visita la Homepage',
		'UpdateInstall' : 'Installa ora.',
		'UpdateTomorrow' : 'Ricordamelo domani.',
		'yearsOld' : '%s anni.'
	},

	// German - Contributed by Constantin Groß (20090830)
	de : {
		'_language' : 'German',
		'AddToCalendar' : 'Zu Kalender hinzugügen',
		'AddToGoogleCalendar' : 'Zu Google Kalender hinzufügen',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle Fotos geladen',
		'Automatic' : 'Automatisch',
		'Birthday' : '%ss Geburtstag',
		'CreatingFile' : 'Erstelle Datei',
		'Close' : 'Schließen',
		'ConfigureFacebookFixer' : 'FFixer konfigurieren',
		'ConfigureInstructions' : 'Alle Änderungen werden sofort gespeichert, aber einige Änderungen können in bereits offenen Tabs nicht angewendet werden.',
		'ConfAge' : 'Alter von Personen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfAutoBigAlbumPictures' : 'Automatisch größere Albenbilder beim öffnen der Seite anzeigen.',
		'ConfAutoLoadFullAlbum' : 'Vorschaubilder für alle Bilder eines Albums automatisch laden.',
		'ConfAutoLoadTaggedPhotos' : 'Vorschaubilder für alle getaggten Bilder automatisch laden (Fotos-Tab auf der Profilseite).',
		'ConfBigAlbumPictures' : 'Link auf Albumseiten hinzüfügen, über den größere Versionen aller Bilder angezeigt werden können.',
		'ConfBottomBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfBottomBarOpacity' : 'Transparenz der unteren Menüleiste',
		'ConfCalendarBirthDate' : 'Geburtstage in Event-Details anzeigen.',
		'ConfCalendarFullName' : 'Vollständigen Namen bei Geburtstagen anzeigen (statt nur den Vornamen).',
		'ConfChatDifferentiate' : 'Fett- und Kursiv-Formatierung zur Unterscheidung zwischen online- und offline-Freunden verwenden.',
		'ConfChatHideIdle' : 'Freunde, die offline sind verstecken.',
		'ConfDelayPopupPics' : '0,5 Sekunden warten, bevor die Popup-Bilder gezeigt werden.',
		'ConfDownloadVideo' : 'Link zum Herunterladen von Videos hinzufügen. (Es wird evtl. ein <a href="http://de.wikipedia.org/wiki/Flash_Video#Abspielen_im_Videoplayer" target="_blank">FLV-Player</a> benötigt)',
		'ConfErrorPageReload' : 'Fehlerseiten von Applikationen automatisch nach 5 Sekunden neu laden.',
		'ConfExternalPopup' : 'Externe Bilder in Originalgröße im Popup anzeigen. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Sprache für FFixer',
		'ConfGoogleApps' : 'Google Kalender Links kompatibel zu Google Apps erstellen.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Links hinzufügen, um Geburtstage und Veranstaltungen zu <a href="http://de.wikipedia.org/wiki/Google_Kalender" target="_blank">Google Kalender</a> hinzuzufügen.',
		'ConfGoogleLanguage' : 'Sprache für <a href="http://translate.google.de/#" target="_blank">Google Übersetzer</a>',
		'ConfHomeFindFriends' : '"Mit Freunden in Verbindung treten" anzeigen.',
		'ConfHomeLeftAlign' : 'Startseiteninhalte linksorientiert ausrichten.',
		'ConfHomePeopleYouMayKnow' : '"Vorschläge" anzeigen.',
		'ConfHomePokes' : '"Anstupser" anzeigen.',
		'ConfHomeRightColumn' : 'Rechte Spalte anzeigen.',
		'ConfiCalendar' : 'Link zum herunterladen einer <a href="http://de.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-Datei mit allen Geburtstagen hinzufügen.',
		'ConfShortcutList' : '<b>Tastenkürzel</b> (Groß-/Kleinschreibung beachten!):<br /><br /><i>Auf jeder Seite:</i><br />&nbsp;<b>A</b> - Alben/Fotos<br />&nbsp;<b>B</b> - Chatliste ein-/ausblenden<br />&nbsp;<b>C</b> - FFixer Einstellungen<br />&nbsp;<b>F</b> - Freunde<br />&nbsp;<b>H</b> - Startseite<br />&nbsp;<b>I</b> - Postfach<br />&nbsp;<b>L</b> - Reagieren von FFixer auf Seitenänderung ein-/ausschalten<br />&nbsp;<b>N</b> - Benachrichtigungen<br />&nbsp;<b>P</b> - Mein Profil<br />&nbsp;<b>T</b> - Markierten Text übersetzen<br />&nbsp;<b>&lt;escape&gt;</b> - Von FFixer erstellte Popups schließen<br /><br /><i>Auf der Startseite</i>:<br />&nbsp;<b>f</b> oder <b>l</b> - Live-Feed<br />&nbsp;<b>i</b> - Posted items<br />&nbsp;<b>n</b> - News-Feed<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>s</b> oder <b>u</b> - Status-Updates<br /><br /><i>Auf Profilseiten</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Pinnwand<br />&nbsp;<b>x</b> - Felder<br /><br /><i>Auf Seiten mit Seitenzahlen (zurück, vor, etc)</i><br />&nbsp;<b>&lt;Pfeil-nach-Links&gt;</b> - Zurück<br />&nbsp;<b>&lt;Pfeil-nach-Rechts&gt;</b> - Vor<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Links&gt;</b> - Erste (wenn verfügbar)<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Rechts&gt;</b> - Letzte (wenn verfügbar)<br /><br /><i>Bei der Anzeige von Alben & Fotos:</i><br />&nbsp;<b>a</b> - Alle Vorschaubilder laden (wenn verfügbar)<br />&nbsp;<b>b</b> - Große Bilder anzeigen<br />&nbsp;<b>c</b> - Kommentare anzeigen<br />&nbsp;<b>k</b> - Zurück zum Album<br />&nbsp;<b>m</b> - Fotos der Person und mir<br /><br /><i>Bei neuen Alben und getaggten/hochgeladenen Fotos:</i><br />&nbsp;<b>a</b> oder &nbsp;<b>r</b> - Neue Alben<br />&nbsp;<b>m</b> oder &nbsp;<b>u</b> - Mobile Uploads<br />&nbsp;<b>o</b> - Fotos von mir<br />&nbsp;<b>p</b> - Meine Fotos<br />&nbsp;<b>t</b> oder &nbsp;<b>f</b> - Getaggte Freunde',
		'ConfNewTabSearch' : 'Suchergebnisse in einem neuen Tab/Fenster öffnen, wenn für die Suche STRG + Enter gedrückt wurde.',
		'ConfPageTitle' : '"Facebook |" überall aus dem Seitentitel entfernen.',
		'ConfPhotoPopup' : 'Größere Versionen von Fotos im Popup anzeigen, wenn sie mit der Maus berührt werden.',
		'ConfPopupAutoClose' : 'Bilder-Popup automatisch schließen.',
		'ConfPopupPosition' : 'Position des Bilder-Popups',
		'ConfProfilePicPopup' : 'Größere Profilbilder im Popup anzeigen, wenn sie mit der Maus berührt werden',
		'ConfProtocolLinks' : 'Messenger-IDs der Profile in Links umwandeln, über die eine Kommunikation gestartet werden kann (Google Talk, Windows Live etc).',
		'ConfSecureLinks' : 'HTTPS-Verbindung für alle Facebook-Links verwenden.',
		'ConfShortcuts' : 'Tastenkürzel aktivieren. (<a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">Liste ansehen</a>)',
		'ConfSign' : 'Sternzeichen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfTopBarFixed' : 'Obere Menüleiste auch beim Scrollen anzeigen.',
		'ConfTopBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfTopBarOpacity' : 'Transparenz der oberen Menüleiste',
		'ConfUpdates' : 'UÜberprüfen Sie Userscripts.org täglich auf Updates für FFixer. <a href="#" id="fbfUpdateLink" onclick="return false;">Jetzt überprüfen</a>.',
		'DownloadVideo' : 'Video herunterladen',
		'ExportICalendarFile' : 'iCalendar-Export',
		'ExportICalendarFileWarning' : '(kann bei einer großen Zahl an Freunden eine Weile dauern)',
		'fullAlbumLoaded' : 'Album vollständig geladen',
		'Left' : 'Links',
		'ListeningRestarted' : 'FFixer reagiert wieder auf Änderungen.',
		'ListeningStopped' : 'FFixer reagiert nicht auf Änderungen.\nL (SHIFT + l) drücken, um die Reaktion wieder zu aktvieren.',
		'LoadingAllPhotos' : 'Lade alle Fotos...',
		'loadingFullAlbum' : 'Lade komplettes Album...',
		'LoadingPic' : 'Lade Bild...',
		'LoadPhotosWarning' : 'Das Laden aller Bilder kann längere Zeit dauern',
		'Months' : new Array('Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'),
		'ProtocolSkype' : '%s per Skype anrufen',
		'ProtocolMSN' : 'Mit %s per Windows Live chatten',
		'ProtocolYahoo' : 'Mit %s per Yahoo Messenger chatten',
		'ProtocolGoogle' : 'Mit %s per Google Talk chatten',
		'ReloadErrorPage' : 'Klicken, um es erneut zu versuchen, oder 5 Sekunden warten',
		'Remove' : 'Entfernen',
		'Right' : 'Rechts',
		'ShowBigPictures' : 'Große Bilder anzeigen',
		'Signs' : new Array('Steinbock','Wassermann','Fische','Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze'),
		'today' : 'heute',
		'UpdateAvailable1' : 'Es gibt ein Update für FFixer',
		'UpdateAvailable2' : 'Update jetzt herunterladen?',
		'UpdateHomepage' : 'Zur Webseite',
		'UpdateInstall' : 'Jetzt installieren',
		'UpdateTomorrow' : 'Morgen erinnern',
		'yearsOld' : '%s Jahre alt'
	},

	// Bulgarian - Contributed by Svetlozar Mladenoff (20090830)
	bg : {
		'_language' : 'Bulgarian',
		'AddToCalendar' : 'Добавяне към Календар',
		'AddToGoogleCalendar' : 'Добавяне към Google Calendar',
		'all' : 'всички',
		'All' : 'Всички',
		'AllPhotosLoaded' : 'Всички снимки са заредени',
		'Automatic' : 'Автоматично',
		'Birthday' : 'Рождения ден на %s',
		'CreatingFile' : 'Създаване на файл',
		'Close' : 'Затваряне',
		'ConfigureFacebookFixer' : 'Конфигуриране на FFixer',
		'ConfigureInstructions' : 'Всички промени се запаметяват веднага, но някои може да не придобият ефект при вече отворени табове.',
		'ConfAge' : 'Показване на възрастта (ако потребителите са представили пълна рождена дата).',
		'ConfAutoBigAlbumPictures' : 'Автоматично показване на по-големи снимки от албумите, когато страницата се зареди.',
		'ConfAutoLoadFullAlbum' : 'Автоматично зареждане на превюта за всички картини в албум, събиращи се на една страница.',
		'ConfAutoLoadTaggedPhotos' : 'Автоматично зареждане на превюта на всички тагнати снимки, събиращи се на една страница (табът Снимки на профила).',
		'ConfBigAlbumPictures' : 'Добавяне на връзка на страницата с албуми за показване на увеличени версии на всички снимки, съществуващи на тази страница.',
		'ConfBottomBarHoverOpacity' : 'При курсор отгоре',
		'ConfBottomBarOpacity' : 'Прозрачност на долното меню',
		'ConfCalendarBirthDate' : 'Включване на рождената дата на потребителя в детайлите на събитието.',
		'ConfCalendarFullName' : 'Използване на трите имена на човека като заглавие за рождените дни (в замяна на само първото име).',
		'ConfChatDifferentiate' : 'Използване на удебелен и наклонен шрифт за различаване на приятели на линия и офлайн.',
		'ConfChatHideIdle' : 'Скриване на офлайн-приятелите.',
		'ConfDelayPopupPics' : 'Изчакване от половин секунда преди показване на превю на снимка.',
		'ConfDownloadVideo' : 'Добавяне на връзка за теглене от видео страниците. (Може да ви трябва <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV плейър</a>)',
		'ConfErrorPageReload' : 'Автоматично презареждане на страниците с грешки от приложения след 5 секунди.',
		'ConfExternalPopup' : 'Пълен размер на външните картинки при превю. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Език за FFixer',
		'ConfGoogleApps' : 'Създаване на Google Calendar връзки, съвместими с Google Apps.',
		'ConfGoogleAppsDomain' : 'Домейн',
		'ConfGoogleCalendar' : 'Добавяне на връзки за прибавяне на рождени дни и събития в <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Език за <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHomeFindFriends' : 'Показване на Свържете се с приятели секцията.',
		'ConfHomeLeftAlign' : 'Ляво подравняване на съдържанието на главната страница.',
		'ConfHomePeopleYouMayKnow' : 'Показване на секция Предложения.',
		'ConfHomePokes' : 'Показване на секцията за Сръчквания.',
		'ConfHomeRightColumn' : 'Показване на дясната колона.',
		'ConfiCalendar' : 'Добавяне на връзки за изтегляне на <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-файл с всички рождени дни.',
		'ConfShortcutList' : '<b>Бързи бутони</b> (големи/малки чувствителни):<br /><br /><i>От коя да е страница:</i><br />&nbsp;<b>A</b> - Албуми/снимки<br />&nbsp;<b>B</b> - Превключване на списък Приятели на линия<br />&nbsp;<b>C</b> - Конфигуруране на FFixer<br />&nbsp;<b>F</b> - Приятели<br />&nbsp;<b>H</b> - Главна страница<br />&nbsp;<b>I</b> - Входяща кутия<br />&nbsp;<b>L</b> - Разрешаване/Забраняване на FFixer да проверява за промени по страниците<br />&nbsp;<b>N</b> - Известия<br />&nbsp;<b>P</b> - Профил<br />&nbsp;<b>T</b> - Превод на маркирания текст<br />&nbsp;<b>&lt;escape&gt;</b> - Затваряне на изскачащи прозорци, отворени от FFixer<br /><br /><i>На заглавната страница</i>:<br />&nbsp;<b>f</b> or <b>l</b> - Новини на живо<br />&nbsp;<b>i</b> - Публикации<br />&nbsp;<b>n</b> - Новини<br />&nbsp;<b>p</b> - Снимки<br />&nbsp;<b>s</b> или <b>u</b> - Промени в статуса<br /><br /><i>На профилите</i>:<br />&nbsp;<b>i</b> - Инфо<br />&nbsp;<b>p</b> - Снимки<br />&nbsp;<b>w</b> - Стена<br />&nbsp;<b>x</b> - Кутии<br /><br /><i>На страници с навигация (предишна, следваща и т.н.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Предишна<br />&nbsp;<b>&lt;right arrow&gt;</b> - Следваща<br />&nbsp;<b>&lt;Shift&gt; + &lt;left arrow&gt;</b> - Първа (когато е възможно)<br />&nbsp;<b>&lt;Shift&gt; + &lt;right arrow&gt;</b> - Последна (когато е възможно)<br /><br /><i>При разглеждане на албуми/снимки:</i><br />&nbsp;<b>a</b> - Зареждане на всички превюта (когато е възможно)<br />&nbsp;<b>b</b> - Показване на големи снимки<br />&nbsp;<b>c</b> - Преглед на коментарите<br />&nbsp;<b>k</b> - Назад към албума<br />&nbsp;<b>m</b> - Снимки на (някой) и мен<br /><br /><i>При разглеждане на скорошни албуми и качени/тагнати снимки:</i><br />&nbsp;<b>a</b> или &nbsp;<b>r</b> - Скорошни албуми<br />&nbsp;<b>m</b> или &nbsp;<b>u</b> - Качвания от мобилно устройство<br />&nbsp;<b>o</b> - Снимки с мен<br />&nbsp;<b>p</b> - Мои снимки<br />&nbsp;<b>t</b> или &nbsp;<b>f</b> - Тагнати приятели',
		'ConfNewTabSearch' : 'Резултатите от търсения да се отварят в нов таб/прозорец, когато е натиснат Ctrl + Enter при търсене.',
		'ConfPageTitle' : 'Премахване на "Facebook |" от заглавието на всяка страница.',
		'ConfPhotoPopup' : 'Показване на по-големи превюта на снимките при курсор отгоре.',
		'ConfPopupAutoClose' : 'Автоматично затваряне на изскачащите картинки.',
		'ConfPopupPosition' : 'Позиция на изскачащите картинки',
		'ConfProfilePicPopup' : 'Показване на по-големи превюта на профилните снимки при курсор отгоре',
		'ConfProtocolLinks' : 'Превръщане на ID-тата по профилите във връзки, който започват разговор (Google Talk, Windows Live и т.н.).',
		'ConfSecureLinks' : 'Принуждаване на Facebook връзките да водят до HTTPS страници.',
		'ConfShortcuts' : 'Разрешаване на Бързи бутони. (Вижте <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">списъка</a>)',
		'ConfSign' : 'Показване зодията по профилите (ако е въведена рождена дата).',
		'ConfTopBarFixed' : 'Запазване на горното меню на екрана, дори при скролиране.',
		'ConfTopBarHoverOpacity' : 'При курсор отгоре',
		'ConfTopBarOpacity' : 'Прозрачност на горното меню',
		'ConfUpdates' : 'Проверяване на Userscripts.org ежедневно за ъпдейти на FFixer. Или <a href="#" id="fbfUpdateLink" onclick="return false;">проверка сега</a>.',
		'DownloadVideo' : 'Смъкване на видеото',
		'ExportICalendarFile' : 'Експортиране в iCalendar-файл',
		'ExportICalendarFileWarning' : '(Това ще отнеме време, ако имате много приятели)',
		'fullAlbumLoaded' : 'целият албум е зареден',
		'Left' : 'Отляво',
		'ListeningRestarted' : 'FFixer възстанови проверките за промени.',
		'ListeningStopped' : 'FFixer спря проверките за промени.\nНатиснете L (Shift + l) за повторно пускане',
		'LoadingAllPhotos' : 'Зареждане на всички снимки...',
		'loadingFullAlbum' : 'зареждане на целия албум...',
		'LoadingPic' : 'Зареждане на снимката...',
		'LoadPhotosWarning' : 'Зареждането на всички снимки може да отнеме много време',
		'Months' : new Array('Януари','Февруари','Март','Април','Май','Юни','Юли','Август','Септември','Октомври','Ноември','Декември'),
		'ProtocolSkype' : 'Обаждане на %s по Skype',
		'ProtocolMSN' : 'Чат с %s чрез Windows Live',
		'ProtocolYahoo' : 'Чат с %s чрез Yahoo Messenger',
		'ProtocolGoogle' : 'Чат с %s чрез Google Talk',
		'ReloadErrorPage' : 'Кликнете за повторен опит или изчакайте 5 секунди',
		'Remove' : 'Премахване',
		'Right' : 'Отдясно',
		'ShowBigPictures' : 'Показване на големи снимки',
		'Signs' : new Array('Козирог','Водолей','Риби','Овен','Телец','Близнаци','Рак','Лъв','Дева','Везни','Скорпион','Стрелец'),
		'today' : 'днес',
		'UpdateAvailable1' : 'Излязло е обновление на FFixer',
		'UpdateAvailable2' : 'Желаете ли да обновите сега?',
		'UpdateHomepage' : 'Към главната страница',
		'UpdateInstall' : 'Инсталиране сега',
		'UpdateTomorrow' : 'Напомняне утре',
		'yearsOld' : 'на %s години'
	},

	// Greek - Contributed by Dimitris DoSMaN Sarlis (20101024)
	el : {
		'_language' : 'Greek',
		'AddToCalendar' : 'Προσθήκη στο Ημερολόγιο',
		'AddToGoogleCalendar' : 'Προσθήκη στο Ημερολόγιο του Google',
		'all' : 'όλα',
		'All' : 'Όλα',
		'AllPhotosLoaded' : 'Όλες οι φωτογραφίες φορτώθηκαν',
		'Automatic' : 'Αυτόματα',
		'Birthday' : 'Γεννέθλια %s',
		'BookmarkAdd' : 'Προσθήκη Νέου Αγαπημένου',
		'BookmarkExists' : 'Υπάρχει ήδη αγαπημένο για αυτήν την σελίδα.\n\nΠηγαίντε στην σελίδα που θέλετε να προσθέσετε και δοκιμάστε ξανά.',
		'BookmarkNamePrompt' : 'Δώστε ένα όνομα για αυτό το αγαπημένο:\n%s',
		'BookmarksConfirmRemoval' : 'Είστε σίγουρος ότι θέλετε να αφαιρέσετε τα παρακάτω αγαπημένα;',
		'BookmarksManage' : 'Διαχείριση Αγαπημένων',
		'BookmarksRemoveSelected' : 'Αφαίρεση Επιλεγμένων Αγαπημένων',
		'Bookmarks' : 'Αγαπημένα',
		'BrowserUnsupported' : 'Ο περιηγητής σας δεν υποστηρίζει αυτήν την δυνατότητα.',
		'CreatingFile' : 'Δημιουργία Αρχείου',
		'Close' : 'Κλείσιμο',
		'ConfigureFacebookFixer' : 'Διαμόρφωση FFixer',
		'ConfigureInstructions' : 'Όλες οι αλλαγές αποθηκεύονται άμεσα, αλλά κάποιες αλλαγές μπορεί να μην εφαρμοστούν σε καρτέλες που είναι ήδη ανοιχτές.',
		'ConfAge' : 'Εμφάνιση της ηλικίας ατόμων στο προφίλ τους (μόνο εφόσον έχουν δηλώσει την πλήρης ημερομηνία).',
		'ConfApplicationWhitelist' : 'Λίστα Επιτρεπτών Εφαρμογών - Εισάγετε τα IDs από τις εφαρμογές που θέλετε να εμφανίζονται. Διαχωρίστε τα IDs με κενό.',
		'ConfAutoBigAlbumPictures' : 'Αυτόματη εμφάνιση μεγάλων εικόνων άλμπουμ όταν η σελίδα ανοίξει.',
		'ConfAutoLoadFullAlbum' : 'Αυτόματη φόρτωση μικρογραφιών για όλες τις εικόνες του άλμπουμ σε μία σελίδα.',
		'ConfAutoLoadTaggedPhotos' : 'Αυτόματη φόρτωση μικρογραφιών για όλες τις "σημαδεμένες" φωτογραφίες σε μία σελίδα (στην καρτέλα φωτογραφιών, στο προφίλ των ανθρώπων).',
		'ConfAutoReadMore' : 'Αυτόματο κλικ στο σύνδεσμο "διαβάστε περισσότερα"',
		'ConfBigAlbumPictures' : 'Προσθήκη συνδέσμου στις σελίδες των άλμπουμ, για εμφάνιση μεγαλύτερων εκδοχών όλων των εικόνων στην συγκεκριμένη σελίδα.',
		'ConfBigAlbumPicturesBorder' : 'Προσθήκη ενός πλαισίου γύρω από τις μεγάλες εκδόσεις των εικόνων.',
		'ConfBookmarks' : 'Προσθήκη ενός υπομενού Αγαπημένων στην πάνω μπάρα.',
		'ConfBottomBarHoverOpacity' : 'Κατά το πέρασμα του ποντικιού',
		'ConfBottomBarOpacity' : 'Διαφάνεια της κάτω γραμμής μενού.',
		'ConfCalendarBirthDate' : 'Να συμπεριληφθεί η ημερομηνία γέννησης του ατόμου στης λεπτομέριες γεγονότων.',
		'ConfCalendarFullName' : 'Χρήση του πλήρες ονόματος του ατόμου σαν τίτλο γενεθλίων (αντί για μόνο το όνομα).',
		'ConfChatDifferentiate' : 'Χρήση έντονων και πλαγίων γραμμάτων για διαφοροποίηση μεταξύ διαθέσιμων και αδρανών φίλων.',
		'ConfChatHideIdle' : 'Απόκρυψη αδρανών φίλων.',
		'ConfDelayPopupPics' : 'Αναμονή 0.5 δευτερολέπτων πριν την εμφάνιση αναδυόμενων εικόνων.',
		'ConfDelayPopupPicsTimeout' : 'Χρονοκαθυστέριση πριν την εμφάνιση των αναδυόμενων εικόνων, σε χιλιοστά του δευτερολέπτου (προεπιλογή=500):',
		'ConfDownloadVideo' : 'Προσθήκη συνδέσμου για λήψη βίντεο από τις σελίδες βίντεο. (Μπορεί να χρειαστείτε το <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Αυτόματη επαναφόρτωση σελίδων εφαρμογών με σφάλματα, μετά από 5 δευτερόλεπτα.',
		'ConfExport' : 'Για να εξάγετε τις ρυθμίσεις σας, αντιγράψτε το κείμενο παρακάτω και σώστε το σε αρχείο.',
		'ConfExternalPopup' : 'Ανάδυση πραγματικού μεγέθους για εξωτερικές εικόνες. <sup>Δοκιμαστικό</sup>',
		'ConfFacebookFixerLanguage' : 'Γλώσσα για το FFixer',
		'ConfFacebookTimestamps' : 'Εμφάνιση της ώρας του Facebook (πχ. "Πριν 3 ώρες").',
		'ConfFBFTimestamps' : 'Προσθήκη της ώρας του FFixer μετά από την ώρα του Facebook (πχ. "11:45").',
		'ConfFBFTimestamps24' : 'Εμφάνιση της ώρας του FFixer σε 24-ωρη μορφή.',
		'ConfFriendRequestCountInTitle' : 'Εμφάνιση του αριθμού των προσκλήσεων φίλων στον τίτλο της σελίδας.',
		'ConfGoogleApps' : 'Δημιουργία Ημερολογίου Google, συμβατό με Εφαρμογές Google.',
		'ConfGoogleAppsDomain' : 'Τομέας:',
		'ConfGoogleCalendar' : 'Προσθήκη συνδέσμων για πρόσθεση γεννεθλίων και γεγονότων στο <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Ημερολόγιο Google</a>.',
		'ConfGoogleLanguage' : 'Γλώσσα για <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Μεταφραστή Google</a>',
		'ConfHideApplicationStories' : 'Απόκρυψη ιστοριών εφαρμογών.',
		'ConfHideEgos' : 'Απόκρυψη όλων των τομέων "εγώ" (θα πρέπει να κρύβει τις περισσότερες προτάσεις του Facebook).',
		'ConfHideEventStories' : 'Απόκρυψη ιστοριών εκδηλώσεων.',
		'ConfHideFacebookCountInTitle' : 'Απόκρυψη του μετρητή νέων εισερχομένων μηνυμάτων του Facebook.',
		'ConfHideFriendStories' : 'Απόκρυψη ιστοριών φίλων.',
		'ConfHideGroupStories' : 'Απόκρυψη ιστοριών ομάδων.',
		'ConfHideHovercards' : 'Απόκρυψη αναδυόμενων καρτών (η κάρτα που εμφανίζεται όταν περνάει το ποντίκι πάνω από κάποιο όνομα).',
		'ConfHideLikeStories' : 'Απόκρυψη των ιστοριών "μου αρέσει".',
		'ConfHideLinkStories' : 'Απόκρυψη ιστοριών συνδέσμων.',
		'ConfHideNoteStories' : 'Απόκρυψη των ιστοριών σημειώσεων.',
		'ConfHidePhotoStories' : 'Απόκρυψη ιστοριών φωτογραφιών.',
		'ConfHidePlaceStories' : 'Απόκρυψη ιστοριών τόπου.',
		'ConfHideProfilePicStories' : 'Απόκρυψη ιστοριών εικόνας προφίλ.',
		'ConfHideRead' : 'Απόκρυψη αντικειμένων από την τροφοδοσία νέων που έχουν σημειωθεί σαν διαβασμένα.',
		'ConfHideRelationshipStories' : 'Απόκρυψη ιστοριών φιλίας.',
		'ConfHideStatusStories' : 'Απόκρυψη ιστοριών κατάστασης.',
		'ConfHideVideoStories' : 'Απόκρυψη ιστοριών Βίντεο.',
		'ConfHideWallStories' : 'Απόκρυψη ιστοριών τοίχου.',
		'ConfHomeBeta' : 'Εμφάνιση του τομέα Δοκιμαστικής Έκδοσης του Facebook.',
		'ConfHomeChat' : 'Εμφάνιση του τομέα Συνομιλίας.',
		'ConfHomeChatNames' : 'Εμφάνιση ονομάτων στον τομέα Συνομιλίας.',
		'ConfHomeEvents' : 'Εμφάνιση της κατηγορίας εκδηλώσεων.',
		'ConfHomeFindFriends' : 'Εμφάνιση του τομέα "Συνδεθείτε με φίλους".',
		'ConfHomeLeftAlign' : 'Αριστερή στοίχιση των περιεχομένων της αρχικής σελίδας.',
		'ConfHomeLeftColumn' : 'Εμφάνιση της αριστερής στήλης.',
		'ConfHomeLeftColumnFixed' : 'Πάγωμα αριστερής στήλης, ακόμα και αν μετακινήστε προς τα κάτω.',
		'ConfHomeLink' : 'Εμφάνιση του συνδέσμου της Αρχικής Σελίδας στην πάνω μπάρα.',
		'ConfHomeNavigation' : 'Εμφάνιση του τομέα Πλοήγησης.',
		'ConfHomePokes' : 'Εμφάνιση των σκουντηγμάτων.',
		'ConfHomeProfile' : 'Εμφάνιση του τομέα Προφίλ.',
		'ConfHomeRecommendations' : 'Εμφάνιση προτάσεων (Άτομα που ίσως γνωρίζεις, Προτεινόμενες Σελίδες κλπ).',
		'ConfHomeRequests' : 'Εμφάνιση της κατηγορίας Αιτημάτων.',
		'ConfHomeRightColumn' : 'Εμφάνιση του δεξιού τμήματος.',
		'ConfHomeStretch' : 'Άνοιγμα της αρχικής σελίδας με βάση το πλάτος του παραθύρου του περιηγητή.',
		'ConfHomeStretchComments' : 'Άνοιγμα του πλάτους των σχολίων στην αρχική σελίδα.',
		'ConfiCalendar' : 'Προσθήκη συνδέσμων για λήψη αρχείου <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> με όλα τα γεννέθλια.',
		'ConfImport' : 'Για να εισάγετε τις ρυθμίσεις σας αργότερα, αντικαταστήστε το κείμενο που αποθηκεύσατε προηγουμένως και πατήστε στο κουμπί "Εισαγωγή".',
		'ConfInboxCountInTitle' : 'Εμφάνιση του πλήθους των αδιάβαστων μηνυμάτων στα εισερχόμενα στον τίτλο της σελίδας.',
		'ConfLogoutLink' : 'Προσθήκη ενός συνδέσμου για αποσύνδεση στην πάνω μπάρα.',
		'ConfNotificationCountInTitle' : 'Εμφάνιση των νέων ειδοποιήσεων στον τίτλο της σελίδας.',
		'ConfNewTabSearch' : 'Άνοιγμα αναζήτησης σε καινούργια καρτέλα ή παράθυρο όταν πιέζετε το CTRL + Enter για αναζήτηση.',
		'ConfPageTitle' : 'Αφαίρεση του "Facebook |" από τον τίτλο της κάθε σελίδας.',
		'ConfPhotoPopup' : 'Εμφάνιση αναδυόμενων φωτογραφιών σε πραγματικό μέγεθος κατά το πέρασμα του ποντικιού.',
		'ConfPopupAutoClose' : 'Κλείσιμο αναδυόμενων φωτογραφιών αυτόματα.',
		'ConfPopupSmartAutoClose' : 'Αποτροπή κλεισίματος αναδυόμενων φωτογραφιών εάν το ποντίκι είναι πάνω τους.',
		'ConfPopupPosition' : 'Θέση αναδυόμενων φωτογραφιών',
		'ConfPopupWhileTagging' : 'Εμφάνιση αναδυόμενων εικόνων ακόμα και στην προσθήκη ετικέτας.',
		'ConfProcessInterval' : 'Διάστημα που απαιτείται για να φορτώσει η σελίδα, σε χιλιοστά του δευτερολέπτου. (προεπιλογή=1000):',
		'ConfProfileLink' : 'Εμφάνιση του συνδέσμου Προφίλ στην πάνω μπάρα.',
		'ConfProfilePicPopup' : 'Εμφάνιση αναδυόμενων φωτογραφιών προφίλ σε πραγματικό μέγεθος κατά το πέρασμα του ποντικιού',
		'ConfProtocolLinks' : 'Μετατροπή του Messenger IDs των προφίλ σε συνδέσμους όπου μπορεί να ξεκινήσει συζήτηση με αυτούς (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Σχετικά με το FFixer',
		'ConfSectionAdvanced' : 'Για προχωρήμένους',
		'ConfSectionEvents' : 'Γεννέθλια/Εκδηλώσεις',
		'ConfSectionImportExport' : 'Εισαγωγή/Εξαγωγή',
		'ConfSectionFeeds' : 'Τροφοδοσίες',
		'ConfSectionHomePage' : 'Αρχική Σελίδα',
		'ConfSectionLiveFeed' : 'Τελευταία Νέα',
		'ConfSectionMenu' : 'Μενού/Συνομιλία',
		'ConfSectionOther' : 'Άλλες Επιλογές',
		'ConfSectionPageTitle' : 'Τίτλος Σελίδας',
		'ConfSectionPictures' : 'Εικόνες',
		'ConfSectionShortcuts' : 'Συντομεύσεις Πληκτρολογίου',
		'ConfSecureLinks' : 'Εξανάγκασε τους συνδέσμους του Facebook να δείχνουν σε ασφαλείς (HTTPS) σελίδες.',
		'ConfShortcutList' : '<b>Συντομεύσεις Πληκτρολογίου</b> (ευαισθησία χαρακτήρων):<br /><br /><i>Από οποιαδήποτε σελίδα:</i><br /> <b>A</b> - Άλμπουμ/Φωτογραφίες<br /> <b>B</b> - Εμφάνιση/Απόκρυψη λίστα φίλων (διαθέσιμοι φίλοι)<br /> <b>C</b> - Επιλογές FFixer<br /> <b>F</b> - Φίλοι<br /> <b>H</b> - Αρχική Σελίδα<br /> <b>I</b> - Εισερχόμενα<br /> <b>K</b> - Προσθήκη Αγαπημένου<br /> <b>L</b> - Επιλογή του συνδέσμου αποσύνδεσης (πατήστε το Enter αμέσως μετά για να αποσυνδεθείτε)<br /> <b>N</b> - Ειδοποιήσεις<br /> <b>P</b> - Το προφίλ σας<br /> <b>T</b> - Μετάφραση επιλεγμένου κειμένου<br /> <b><escape></b> - Κλείσιμο αναδυόμενων δημιουργημένα από το FFixer<br /><br /><i>Από την αρχική σελίδα</i>:<br /> <b>f</b> ή <b>l</b> - Ζωντανές τροφοδοτήσεις<br /> <b>i</b> - Δημοσιευμένα στοιχεία<br /> <b>n</b> - Τροφοδότηση Νέων<br /> <b>p</b> - Φωτογραφίες<br /> <b>s</b> ή <b>u</b> - Ανανεώσεις κατάστασης<br /><br /><i>Από προφίλ</i>:<br /> <b>i</b> - Πληροφορίες<br /> <b>p</b> - Φωτογραφίες<br /> <b>w</b> - Τοίχος<br /> <b>x</b> - Πλαίσια<br /><br /><i>Από σελίδες με πλοήγηση (προηγούμενη, επόμενη, κ.ά.)</i><br /> <b><αριστερό βελάκι></b> - Προηγούμενη<br /> <b><δεξί βελάκι></b> - Επόμενη<br /> <b><shift> + <αριστερό βελάκι></b> - Αρχική (όταν είναι διαθέσιμη)<br /> <b><shift> + <δεξί βελάκι></b> - Τελευταία (όταν είναι διαθέσιμη)<br /><br /><i>Κατά την προβολή άλμπουμ/φωτογραφίες:</i><br /> <b>a</b> - Φόρτωση όλων των μικρογραφιών (όταν είναι διαθέσιμο)<br /> <b>b</b> - Εμφάνιση μεγαλύτερων φωτογραφιών<br /> <b>c</b> - Εμφάνιση παρατηρήσεων<br /> <b>k</b> - Επιστροφή στο Άλμπουμ<br /> <b>m</b> - Φωτογραφίες από (άτομο) και εμένα<br /><br /><i>Κατά την διάρκεια πρόσφατων άλμπουμ και ανεβασμένων/σημειωμένων φωτογραφιών:</i><br /> <b>a</b> ή  <b>r</b> - Πρόσφατα Άλμπουμ<br /> <b>m</b> ή  <b>u</b> - Ανεβασμένα από κινητό<br /> <b>o</b> - Φωτογραφίες με μένα<br /> <b>p</b> - Οι φωτογραφίες μου<br /> <b>t</b> ή  <b>f</b> - Σημειωμένοι φίλοι',
		'ConfShortcuts' : 'Ενεργοποίηση συντομεύσεων πληκτρολογίου.',
		'ConfSign' : 'Εμφάνιση του ζωδίου του ατόμου στο προφίλ του (εφόσων έχει δώσει την πλήρης ημερομηνία γέννησης).',
		'ConfTopBarFixed' : 'Πάγωμα μπάρας μενού, ακόμα και αν η σελίδα κυλάει προς τα κάτω.',
		'ConfTopBarHoverOpacity' : 'Κατά το πέρασμα του ποντικιού',
		'ConfTopBarOpacity' : 'Διαφάνεια μπάρας μενού κορυφής',
		'ConfUpdates' : 'Έλεγχος Userscripts.org καθημερινά για καινούργιες ενημερώσεις του FFixer ή <a href="#" id="fbfUpdateLink" onclick="return false;">έλεγχος τώρα</a>.',
		'DownloadVideo' : 'Λήψη Βίντεο',
		'ExportICalendarFile' : 'Εξαγωγή αρχείου iCalendar',
		'ExportICalendarFileWarning' : '(Αυτό θα πάρει αρκετή ώρα αν έχετε πολλούς φίλους)',
		'FacebookFixerConflict' : 'Το FacebookFixer είναι πλέον γνωστό σαν FFixer. Λόγω της αλλαγής του ονόματος θα πρέπει να απεγκαταστήσετε χειροκίνητα το FFixer από τον περιηγητή σας, διαφορετικά τα δύο προγράμματα θα συγκρούονται μεταξύ τους. Εάν δεν είσαστε σίγουροι για το πως να απεγκαταστήσετε ένα πρόγραμμα userscript, <a %s>πατήστε εδώ για οδηγίες</a>.',
		'fullAlbumLoaded' : 'η φόρτωση του άλμπουμ ολοκληρώθηκε',
		'Import' : 'Εισαγωγή',
		'ImportConfirm' : 'Είστε σίγουρος ότι θέλετε να εισάγετε αυτές τις ρυθμίσεις;\nΟι τρέχουσες ρυθμίσεις θα χαθούν.',
		'ImportFailure' : 'Προέκυψε σφάλμα κατά την εισαγωγή των ρυθμίσεων.',
		'ImportSuccess' : 'Η εισαγωγή ολοκληρώθηκε. Θέλετε να ανανεώσετε την σελίδα;',
		'Left' : 'Αριστερά',
		'LoadingAllPhotos' : 'Φόρτωση όλων των φωτογραφιών...',
		'loadingFullAlbum' : 'Φόρτωση όλου του άλμπουμ...',
		'LoadingPic' : 'Φόρτωση εικόνας...',
		'LoadPhotosWarning' : 'Η φόρτωση όλων των φωτογραφιών μπορεί να πάρει αρκετή ώρα',
		'Months' : new Array('Ιανουάριος','Φεβρουάριος','Μάρτιος','Απρίλιος','Μάιος','Ιούνιος','Ιούλιος','Αύγουστος','Σεπτέμβριος','Οκτώβριος','Νοέμβριος','Δεκέμβριος'),
		'ProtocolSkype' : 'Κλήση %s μέσω Skype',
		'ProtocolMSN' : 'Συζήτηση με %s μέσω Windows Live',
		'ProtocolYahoo' : 'Συζήτηση με %s μέσω Yahoo Messenger',
		'ProtocolGoogle' : 'Συζήτηση με %s μέσω Google Talk',
		'ReloadErrorPage' : 'Πατήστε για δοκιμή ξανά ή περιμένετε 5 δευτερόλεπτα',
		'Refresh' : 'Ανανέωση',
		'Remove' : 'Αφαίρεση',
		'Right' : 'Δεξιά',
		'ShowBigPictures' : 'Εμφάνιση μεγαλύτερων εικόνων',
		'Signs' : new Array('Αιγόκερως','Υδροχόος','Ιχθείς','Κριός','Ταύρος','Δίδυμος','Καρκίνος','Λέων','Παρθένος','Ζυγός','Σκορπιός','Τοξότης'),
		'today' : 'σήμερα',
		'Translators' : 'Μεταφραστές',
		'UpdateAvailable1' : 'Υπάρχει καινούργια διαθέσιμη έκδοση του FFixer',
		'UpdateAvailable2' : 'Θέλετε να την ενημερώσετε τώρα;',
		'UpdateHomepage' : 'Επιστροφή στην Αρχική Σελίδα',
		'UpdateInstall' : 'Εγκατάσταση τώρα',
		'UpdateTomorrow' : 'Υπενθύμιση αύριο',
		'yearsOld' : '%s χρονών'
	},

	// Slovak - Contributed by Peter Miksik (20101028)
	sk : {
		'_language' : 'Slovak',
		'AddToCalendar' : 'Pridať do Kalendára',
		'AddToGoogleCalendar' : 'Pridať do Kalendára Google',
		'all' : 'všetko',
		'All' : 'Všetko',
		'AllPhotosLoaded' : 'Všetky fotografie načítané',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narodeniny %s',
		'BookmarkAdd' : 'Pridať novú záložku',
		'BookmarkExists' : 'Táto stránka už je v záložkách.\n\nPrejdite na stránku, ktorú chcete pridať medzi záložky a skúste to znova.',
		'BookmarkNamePrompt' : 'Zadajte názov tejto záložky:\n%s',
		'BookmarksConfirmRemoval' : 'Naozaj chcete odstrániť nasledujúce záložky?',
		'BookmarksManage' : 'Spravovať záložky',
		'BookmarksRemoveSelected' : 'Odstrániť vybrané záložky',
		'Bookmarks' : 'Záložky',
		'BrowserUnsupported' : 'Váš prehliadač túto funkciu nepodporuje.',
		'CreatingFile' : 'Vytvorenie súboru',
		'Close' : 'Zavrieť',
		'ConfigureFacebookFixer' : 'Konfigurovať FFixer',
		'ConfigureInstructions' : 'Všetky zmeny sú ukladané okamžite, ale niektoré zmeny sa nemusia prejaviť na kartách, ktoré sú už otvorené.',
		'ConfAge' : 'Zobraziť vek ľudí v ich profiloch (ak poskytli celý dátum narodenia)',
		'ConfApplicationWhitelist' : 'Zoznam povolených aplikácií – zadajte ID aplikácií, ktoré chrániť pred skrytím. ID oddeľte medzerou.',
		'ConfAutoBigAlbumPictures' : 'Automaticky pri otvorení stránky zobraziť väčšie obrázky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky načítať miniatúry všetkých obrázkov v albume na jednej stránke',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky načítať miniatúry všetkých fotografií s menovkou na jednej stránke (karta Fotky v profiloch ľudí)',
		'ConfAutoReadMore' : 'Automaticky kliknúť na odkazy "čítať ďalej"',
		'ConfBigAlbumPictures' : 'Pridať odkaz na stránkach albumu na zobrazenie väčších verzií všetkých obrázkov na tejto stránke',
		'ConfBigAlbumPicturesBorder' : 'Pridať rámček okolo väčších verzií obrázkov',
		'ConfBookmarks' : 'Pridať na panel vrchnej ponuky podponuku Záložky',
		'ConfBottomBarHoverOpacity' : 'Pri ukázaní myšou',
		'ConfBottomBarOpacity' : 'Priehľadnosť spodného panela s ponukou',
		'ConfCalendarBirthDate' : 'Zahrnúť narodeniny osoby do podrobností udalosti',
		'ConfCalendarFullName' : 'Použiť celé meno osoby ako názov narodenín (namiesto krstného mena)',
		'ConfChatDifferentiate' : 'Použiť tučné písmo a kurzívu na rozlíšenie pripojených a nečinných priateľov',
		'ConfChatHideIdle' : 'Skryť nečinných priateľov',
		'ConfDelayPopupPics' : 'Počkať 0,5 sekundy pred načítaním obrázkov v kontextovom okne',
		'ConfDelayPopupPicsTimeout' : 'Oneskorenie pred zobrazením obrázkov v kontextovom okne, v milisekundách (predvolené=500):',
		'ConfDownloadVideo' : 'Pridať odkaz na prevzatie videí zo stránok s videom (možno budete potrebovať <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">prehrávač FLV</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundách znova načítať chybové stránky aplikácií',
		'ConfExport' : 'Ak chcete exportovať nastavenia, skopírujte dole uvedený text a uložte ho do súboru.',
		'ConfExternalPopup' : 'Externé obrázky plnej veľkosti v kontextovom okne <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jazyk pre Facebook Fixer',
		'ConfFacebookTimestamps' : 'Zobraziť časové značky Facebooku (t. j. "pred 3 hodinami")',
		'ConfFBFTimestamps' : 'Pridať časové značky skriptu Facebook Fixer za časové značky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobraziť časové značky skriptu Facebook Fixer v 24-hodinovom formáte',
		'ConfFriendRequestCountInTitle' : 'Zobraziť v názve stránky počet nových žiadostí o priateľstvo',
		'ConfGoogleApps' : 'Vytvoriť odkazy pre Google Calendar kompatibilné s Google Apps',
		'ConfGoogleAppsDomain' : 'Doména',
		'ConfGoogleCalendar' : 'Pridať odkazy na zaradenie narodenín a udalostí do aplikácie <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pre <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Skryť príspevky o aplikáciách',
		'ConfHideEgos' : 'Skryť všetky sekcie "ego" (malo by skryť väčšinu odporúčaní Facebooku)',
		'ConfHideEventStories' : 'Skryť príspevky o udalostiach',
		'ConfHideFacebookCountInTitle' : 'Skryť počet nových správ na Facebooku',
		'ConfHideFriendStories' : 'Skryť príspevky o priateľoch',
		'ConfHideGroupStories' : 'Skryť príspevky o skupinách',
		'ConfHideHovercards' : 'Skryť kontextové okná zobrazujúce sa po ukázaní myšou na mená)',
		'ConfHideLikeStories' : 'Skryť príspevky "Páči sa mi to"',
		'ConfHideLinkStories' : 'Skryť príspevky o odkazoch',
		'ConfHideNoteStories' : 'Skryť príspevky o poznámkach',
		'ConfHidePhotoStories' : 'Skryť príspevky o fotkách',
		'ConfHidePlaceStories' : 'Skryť príspevky o miestach',
		'ConfHideProfilePicStories' : 'Skryť príspevky o profilových fotkách',
		'ConfHideRead' : 'Skryť položky, ktoré boli označené ako prečítané',
		'ConfHideRelationshipStories' : 'Skryť príspevky o stave vzťahu',
		'ConfHideStatusStories' : 'Skryť príspevky o statuse',
		'ConfHideVideoStories' : 'Skryť príspevky o videách',
		'ConfHideWallStories' : 'Skryť príspevky o nástenkách',
		'ConfHomeBeta' : 'Zobraziť časť Beta Tester',
		'ConfHomeChat' : 'Zobraziť časť Chat',
		'ConfHomeChatNames' : 'Zobraziť mená v časti Chat',
		'ConfHomeEvents' : 'Zobraziť časť Udalosti',
		'ConfHomeFindFriends' : 'Zobraziť časť Spojte sa s priateľmi',
		'ConfHomeLeftAlign' : 'Zarovnať obsah úvodnej stránky naľavo',
		'ConfHomeLeftColumn' : 'Zobraziť ľavý stĺpec',
		'ConfHomeLeftColumnFixed' : 'Nechať ľavý stĺpec viditeľný aj pri posúvaní nadol',
		'ConfHomeLink' : 'Zobraziť vo vrchnej ponuke odkaz na úvodnú stránku',
		'ConfHomeNavigation' : 'Zobraziť časť Navigácia',
		'ConfHomePokes' : 'Zobraziť časť Štuchnutia',
		'ConfHomeProfile' : 'Zobraziť časť Profil',
		'ConfHomeRecommendations' : 'Zobraziť odporúčania (Ľudia, ktorých poznáte; Odporúčané stránky atď.)',
		'ConfHomeRequests' : 'Zobraziť časť Žiadosti',
		'ConfHomeRightColumn' : 'Zobraziť pravý stĺpec',
		'ConfHomeStretch' : 'Roztiahnuť úvodnú stránku na šírku okna prehľadávača',
		'ConfHomeStretchComments' : 'Roztiahnuť komentáre na hlavnej stránke',
		'ConfiCalendar' : 'Pridať odkazy na prevzatie súboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> so všetkými narodeninami',
		'ConfImport' : 'Ak chcete neskôr importovať nastavenia, prepíšte dole uvedený text tým, ktorý ste predtým uložili, a kliknite na "Import".',
		'ConfInboxCountInTitle' : 'Zobraziť v názve stránky počet neprečítaných prijatých správ',
		'ConfLogoutLink' : 'Pridať do vrchnej ponuky odkaz na odhlásenie',
		'ConfNotificationCountInTitle' : 'Zobraziť v názve stránky počet nových upozornení',
		'ConfNewTabSearch' : 'Pri vyhľadávaní otvoriť stlačením Ctrl+Enter výsledky hľadania na novej karte/v novom okne',
		'ConfPageTitle' : 'Odstrániť "Facebook |" z názvu všetkých stránok',
		'ConfPhotoPopup' : 'Väčšie verzie fotiek v kontextovom okne po ukázaní myšou',
		'ConfPopupAutoClose' : 'Automaticky zatvárať kontextové okná s obrázkami',
		'ConfPopupSmartAutoClose' : 'Zabrániť autom. zatvoreniu kontextových okien s obrázkom, ak je na nich kurzor myši',
		'ConfPopupPosition' : 'Umiestnenie kontextového okna s obrázkom',
		'ConfPopupWhileTagging' : 'Zobraziť kontextové okná s obrázkami aj pri označovaní',
		'ConfProcessInterval' : 'Interval spracovania stránky, v milisekundách (predvolené=1000):',
		'ConfProfileLink' : 'Zobraziť na vrchnom paneli s ponukou odkaz na profil',
		'ConfProfilePicPopup' : 'Väčšie verzie profilových fotiek v kontextovom okne po ukázaní myšou',
		'ConfProtocolLinks' : 'Zmeniť ID pre okamžité správy na odkazy spúšťajúce konverzáciu (Google Talk, Windows Live atď.)',
		'ConfSectionAbout' : 'Čo je Facebook Fixer',
		'ConfSectionAdvanced' : 'Spresnenie',
		'ConfSectionEvents' : 'Narodeniny/Udalosti',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Novinky',
		'ConfSectionHomePage' : 'Úvodná stránka',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Ponuky/Chat',
		'ConfSectionOther' : 'Ďalšie možnosti',
		'ConfSectionPageTitle' : 'Názov stránky',
		'ConfSectionPictures' : 'Obrázky',
		'ConfSectionShortcuts' : 'Klávesové skratky',
		'ConfSecureLinks' : 'Vynútiť zmenu odkazov Facebooku na stránky HTTPS',
		'ConfShortcutList' : '<b>Klávesové skratky</b> (rozlišujú sa malé/veľké písmená):<br /><br /><i>Z ľubovoľnej stránky:</i><br /> <b>A</b> – Albumy/fotky<br /> <b>B</b> – Prepnúť zoznam priateľov (online priatelia)<br /> <b>C</b> – Konfigurácia skriptu Facebook Fixer<br /> <b>D</b> – Narodeniny<br /> <b>E</b> – Udalosti<br /> <b>F</b> – Priatelia<br /> <b>H</b> – Domov<br /> <b>I</b> – Prijaté správy<br /> <b>L</b> – Vybrať odkaz Odhlásiť sa (po odhlásení stlačte Enter)<br /> <b>N</b> – Upozornenia<br /> <b>P</b> – Váš profil<br /> <b>R</b> – Žiadosti<br /> <b>S</b> – Preskočiť na pole Hľadať<br /> <b>T</b> – Preložiť vybraný text<br /> <b>?</b> – Zobraziť informácie o ladení skriptu Facebook Fixer<br /> <b><Esc></b> – Zavrieť kontextové okná vytvorené skriptom Facebook Fixer<br /><br /><i>Zo stránky Domov (filtre)</i>:<br /> <b>a</b> – Stránky<br /> <b>f</b> – Aktuality<br /> <b>g</b> – Skupiny<br /> <b>l</b> – Odkazy<br /> <b>n</b> – Novinky<br /> <b>p</b> – Fotky<br /> <b>s</b> alebo <b>u</b> – Čo robia ostatní<br /> <b>t</b> – Poznámky<br /> <b>v</b> – Videá<br /><br /><i>Z profilov</i>:<br /> <b>i</b> – Informácie<br /> <b>p</b> – Fotky<br /> <b>w</b> – Nástenka<br /> <b>x</b> – Priečinky<br /><br /><i>Zo stránok s navigáciou (dozadu, dopredu atď.)</i><br /> <b><šípka doľava></b> – Dozadu<br /> <b><šípka doprava></b> – Dopredu<br /> <b><shift> + <šípka doľava></b> – Prvá (ak je k dispozícii)<br /> <b><shift> + <šípka doprava></b> – Posledná (ak je k dispozícii)<br /><br /><i>Počas prezerania albumov/fotiek:</i><br /> <b>a</b> – Načítať všetky miniatúry (ak je k dispozícii)<br /> <b>b</b> – Zobraziť veľké obrázky<br /> <b>c</b> – Zobraziť komentáre<br /> <b>k</b> – Späť na album<br /> <b>m</b> – Fotky osoby a mňa<br /><br /><i>Počas prezerania najnovších albumov a nahratých fotiek/fotiek s menovkou:</i><br /> <b>a</b> or  <b>r</b> – Najnovšie albumy<br /> <b>m</b> alebo  <b>u</b> – Nahraté z mobilu<br /> <b>o</b> – Fotky, na ktorých som ja<br /> <b>p</b> – Moje fotky<br /> <b>t</b> alebo  <b>f</b> Menovky priateľov',
		'ConfShortcuts' : 'Povoliť klávesové skratky',
		'ConfSign' : 'Zobraziť znamenie ľudí v ich profiloch (ak poskytli svoj dátum narodenia)',
		'ConfTopBarFixed' : 'Vždy zobraziť vrchný panel s ponukou aj pri posúvaní stránky nadol',
		'ConfTopBarHoverOpacity' : 'Pri ukázaní myšou',
		'ConfTopBarOpacity' : 'Priehľadnosť vrchného panela s ponukou',
		'ConfUpdates' : 'Denne na Userscripts.org overovať aktualizácie pre Facebook Fixer, prípadne <a href="#" id="fbfUpdateLink" onclick="return false;">skontrolovať teraz</a>.',
		'DownloadVideo' : 'Prevziať video',
		'ExportICalendarFile' : 'Exportovať súbor iCalendar',
		'ExportICalendarFileWarning' : '(Ak máte mnoho priateľov, môže to chvíľu trvať.)',
		'FacebookFixerConflict' : 'Facebook Fixer sa odteraz nazýva FFixer.<br /><br />Pretože sa zmenil názov, je potrebné ručne odinštalovať Facebook Fixer z prehliadača, inak budú v konflikte dva skripty medzi sebou navzájom.<br /><br />Ak neviete, ako skript odinštalovať, <a %s>kliknutím sem otvorte pokyny</a>.',
		'fullAlbumLoaded' : 'celý album načítaný',
		'Import' : 'Import',
		'ImportConfirm' : 'Naozaj chcete importovať tieto nastavenia?\nVaše súčasné nastavenia budú stratené.',
		'ImportFailure' : 'Počas pokusu o import nastavení došlo k chybe.',
		'ImportSuccess' : 'Import dokončený. Chcete obnoviť stránku?',
		'Left' : 'Vľavo',
		'LoadingAllPhotos' : 'Načítavajú sa všetky fotky...',
		'loadingFullAlbum' : 'Načítava sa celý album...',
		'LoadingPic' : 'Načítava sa obrázok...',
		'LoadPhotosWarning' : 'Načítavanie všetkých fotiek môže chvíľu trvať',
		'Months' : new Array('Január','Február','Marec','Apríl','Máj','Jún','Júl','August','September','Október','November','December'),
		'ProtocolSkype' : 'Volať %s pomocou Skype',
		'ProtocolMSN' : 'Chatovať s %s pomocou Windows Live',
		'ProtocolYahoo' : 'Chatovať s %s pomocou Yahoo Messenger',
		'ProtocolGoogle' : 'Chatovať s %s pomocou Google Talk',
		'ReloadErrorPage' : 'Kliknite na Skúsiť znova alebo počkajte 5 sekúnd',
		'Refresh' : 'Obnoviť',
		'Remove' : 'Odstrániť',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobraziť veľké obrázky',
		'Signs' : new Array('Kozorožec','Vodnár','Ryba','Baran','Býk','Blíženci','Rak','Lev','Panna','Váhy','Škorpión','Strelec'),
		'today' : 'dnes',
		'Translators' : 'Prekladatelia',
		'UpdateAvailable1' : 'K dispozícii je aktualizácia skriptu Facebook Fixer.',
		'UpdateAvailable2' : 'Chcete aktualizovať teraz?',
		'UpdateHomepage' : 'Prejsť na dom. stránku',
		'UpdateInstall' : 'Nainštalovať',
		'UpdateTomorrow' : 'Pripomenúť zajtra',
		'yearsOld' : '%s rokov'
	},

	// Dutch - Contributed by Larissa van Sunder (20091107)
	nl : {
		'_language' : 'Dutch',
		'AddToCalendar' : 'Toevoegen aan kalender',
		'AddToGoogleCalendar' : 'Toevoegen aan Google Calender',
		'all' : 'allemaal',
		'All' : 'Allemaal',
		'AllPhotosLoaded' : 'Alle fotos geladen',
		'Automatic' : 'Automatisch',
		'Birthday' : '%s\'s verjaardag',
		'CreatingFile' : 'Folder crëeren',
		'Close' : 'Sluit',
		'ConfigureFacebookFixer' : 'Configureer FFixer',
		'ConfigureInstructions' : 'Alle veranderingen worden onmiddelijk opgeslagen, maar sommige veranderingen zullen niet kunnen worden toegepast in vensters die al open zijn',
		'ConfAge' : 'Laat mensen hun leeftijd op hun profiel zien (wanneer zij hun volledige geboortedatum aangeven)',
		'ConfAutoBigAlbumPictures' : 'Laat automatisch grotere album foto\'s zien wanneer de pagina opent.',
		'ConfAutoLoadFullAlbum' : 'Laad automatisch miniaturen voor alle illustraties in een album op een enkele pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Laad automatisch miniaturen voor alle getagde illustraties in een album op een enkele pagina (het foto\'s venster op mensen hun profiel.',
		'ConfAutoReadMore' : 'Klik automatisch op "lees meerdere" links.',
		'ConfBigAlbumPictures' : 'Link toevoegen op album pagina\'s om grotere versies van alle foto\'s op die pagina te laten zien.',
		'ConfBottomBarHoverOpacity' : 'Bij het overscrollen',
		'ConfBottomBarOpacity' : 'Transparantie menu bar aan het einde van de pagina',
		'ConfCalendarBirthDate' : 'Includeer de persoon zijn geboortedatum in de evenementen details.',
		'ConfCalendarFullName' : 'Gebruik de persoon zijn volledige naam voor de titel van verjaardagen (in plaats van alleen de voornaam).',
		'ConfChatDifferentiate' : 'Gebruik dikgedrukt en cursief om te differentiëren tussen beschikbaar en niet beschikbaar.',
		'ConfChatHideIdle' : 'Verberg niet beschikbare vrienden.',
		'ConfDelayPopupPics' : 'Een vertraging toevoegen voor het laten zien van popup foto\'s.',
		'ConfDelayPopupPicsTimeout' : 'Vertraging voor het laten zien van popup foto\'s, in milliseconden (standaard=500):',
		'ConfDownloadVideo' : 'Een link toevoegen voor het downloaden van videos van video pagina\'s. (Je hebt misschien een <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV speler</a> nodig)',
		'ConfErrorPageReload' : 'Automatisch toepassingen error pagina\'s reloaden.',
		'ConfExternalPopup' : 'Popup versies in volledige grootte van externe illustraties. <sup>experimenteel</sup>',
		'ConfFacebookFixerLanguage' : 'Taal voor FFixer',
		'ConfFacebookTimestamps' : 'Laat Facebook timestamps zien (bijv. "3 uur geleden").',
		'ConfFBFTimestamps' : 'FFixer timestamps toevoegen na Facebook timestamps (bijv. "11:45").',
		'ConfFBFTimestamps24' : 'Laat FFixer timestamps zien in 24-uurs formaat.',
		'ConfGoogleApps' : 'Crëer Google Calendar links die werken met Google Apps.',
		'ConfGoogleAppsDomain' : 'Domein',
		'ConfGoogleCalendar' : 'Links toevoegen om verjaardagen en evenementen toe te voegen aan <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Taal voor <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideEventStories' : 'Verberg evenement overzichten in het live overzicht.',
		'ConfHideFanStories' : 'Verberg fan overzichten in het live overzicht.',
		'ConfHideFriendStories' : 'Verberg vriend overzichten in het live overzicht.',
		'ConfHideGroupStories' : 'Verberg groep overzichten in het live overzicht.',
		'ConfHideRead' : 'Verberg delen in het nieuws overzicht die rood gemarkeerd zijn.',
		'ConfHideRelationshipStories' : 'Verberg relatie overzichten in het live overzicht.',
		'ConfHomeFindFriends' : 'Laat de \'In contact komen met vrienden\' sectie zien.',
		'ConfHomeLeftAlign' : 'Links uitlijn de inhoud van de startpagina.',
		'ConfHomePeopleYouMayKnow' : 'Laat de Suggesties sectie zien.',
		'ConfHomePokes' : 'Laat de Porren sectie zien.',
		'ConfHomeRightColumn' : 'Laat de rechter kolom zien.',
		'ConfHomeStretch' : 'Stretch de startpagina naar de wijdte van het venster.',
		'ConfiCalendar' : 'Links toevoegen om een <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> folder met alle verjaardagen te downloaden.',
		'ConfInboxCountInTitle' : 'Laat het aantal ongelezen berichten in je inbox in de titelpagina zien.',
		'ConfNotificationCountInTitle' : 'Laat het aantal nieuwe noticicaties in de titelpagina zien.',
		'ConfNewTabSearch' : 'Open zoek resultaten in een nieuw venster/scherm wanneer CTRL + Enter om te zoeken wordt ingetoetst.',
		'ConfPageTitle' : 'Verwijder "Facebook |" van de titel van elke pagina.',
		'ConfPhotoPopup' : 'Grotere popup versies van foto\'s bij overscrollen.',
		'ConfPopupAutoClose' : 'Sluit popup foto\'s automatisch.',
		'ConfPopupPosition' : 'Positie voor popup foto\'s',
		'ConfProcessInterval' : 'Interval waarop de pagina moet worden verwerkt, in milliseconden (default=1000):',
		'ConfProfilePicPopup' : 'Grotere popup versies van profiel foto\'s bij overscrollen',
		'ConfProtocolLinks' : 'Verander messenger ID\'s van profielen in links die beginnen met een conversatie met hen (Google Talk, Windows Live etc).',
		'ConfSectionAdvanced' : 'Geavanceerd',
		'ConfSectionEvents' : 'Verjaardagen/Evenementen',
		'ConfSectionHomePage' : 'Startpagina',
		'ConfSectionLiveFeed' : 'Live Overzicht',
		'ConfSectionMenu' : 'Toepassingen/Chat',
		'ConfSectionOther' : 'Andere opties',
		'ConfSectionPictures' : 'Foto\'s',
		'ConfSectionShortcuts' : 'Keyboard Sneltoets',
		'ConfSecureLinks' : 'Dwing Facebook links te linken naar HTTPS pagina\'s.',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - FFixer configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Toestaan van sneltoetsen.',
		'ConfSign' : 'Laat mensen hun sterrenbeeld op hun profiel zien (wanneer zij hun geboortedatum aangeven).',
		'ConfTopBarFixed' : 'Behoud de top meny bar op het scherm, zelfs bij het naar beneden scrollen.',
		'ConfTopBarHoverOpacity' : 'Bij overscrollen',
		'ConfTopBarOpacity' : 'Top menu bar transparentie',
		'ConfUpdates' : 'Check Userscripts.org dagelijks voor updates naar FFixer. Of <a href="#" id="fbfUpdateLink" onclick="return false;">check nu</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar folder',
		'ExportICalendarFileWarning' : '(Dit duurt wel even als je veel vrienden hebt)',
		'fullAlbumLoaded' : 'volledige album geladen',
		'Left' : 'Links',
		'LoadingAllPhotos' : 'Laad alle foto\'s...',
		'loadingFullAlbum' : 'Laad hele album...',
		'LoadingPic' : 'Laad foto...',
		'LoadPhotosWarning' : 'Het laden van alle foto\'s kan wel even duren',
		'Months' : new Array('januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'),
		'ProtocolSkype' : 'Bel %s door middel van Skype',
		'ProtocolMSN' : 'Chat met %s door middel van Windows Live',
		'ProtocolYahoo' : 'Chat met %s door middel van Yahoo Messenger',
		'ProtocolGoogle' : 'Chat met %s door middel van Google Talk',
		'Refresh' : 'Vernieuw',
		'ReloadErrorPage' : 'Klik om het nogmaals te proberen, of wacht %s seconden',
		'Remove' : 'Verwijder',
		'Right' : 'Rechts',
		'ShowBigPictures' : 'Laat grote foto\'s zien',
		'Signs' : new Array('Steenbok','Waterman','Vissen','Ram','Stier','Tweelingen','Kreeft','Leeuw','Maagd','Weegschaal','Schorpioen','Boogschutter'),
		'today' : 'vandaag',
		'UpdateAvailable1' : 'Een update is beschikbaar voor FFixer',
		'UpdateAvailable2' : 'Will je nu updaten?',
		'UpdateHomepage' : 'Ga naar startpagina',
		'UpdateInstall' : 'Nu installeren',
		'UpdateTomorrow' : 'Herinner me morgen',
		'yearsOld' : '%s jaar oud'
	},

	// Chinese (Taiwan) - Contributed by By Acedia.Liu (20100422)
	zh_tw : {
		'_language' : 'Chinese (Taiwan)',
		'AddToCalendar' : '加到日曆',
		'AddToGoogleCalendar' : '加到Google日曆',
		'all' : '全部',
		'All' : '全部',
		'AllPhotosLoaded' : '讀取所有相片',
		'Automatic' : '自動',
		'Birthday' : '%s\的生日',
		'BookmarkAdd' : '增加新的書籤',
		'BookmarkConfirmRemoval' : '您確定要移除書籤嗎？ "%s"?',
		'BookmarkDoesNotExist' : '此頁面無法加入書籤。\n\n轉到您要刪除的頁面，然後再試一次。',
		'BookmarkExists' : '此頁已加入書籤。\n\n轉到您要加入書籤的頁面，然後再試一次。',
		'BookmarkNamePrompt' : '輸入新的書籤名稱：\n%s',
		'BookmarkRemove' : '移除書籤',
		'Bookmarks' : '我的最愛',
		'BrowserUnsupported' : '您的瀏覽器尚未支援此功能。',
		'CreatingFile' : '創建文件',
		'Close' : '關閉',
		'ConfigureFacebookFixer' : '設定 FFixer',
		'ConfigureInstructions' : '改變設定都應立即存檔，如遇到部份功能未生效，表示該功能或許已開放。',
		'ConfAge' : '於個人資料顯示朋友\的年齡（如果他們設定正確無誤的話）。',
		'ConfAutoBigAlbumPictures' : '開啟相簿時自動顯示較大的相簿圖片。',
		'ConfAutoLoadFullAlbum' : '於單一頁面中自動顯示所有相片的縮圖',
		'ConfAutoLoadTaggedPhotos' : '於單一頁面中自動顯示所有標記的相片縮圖 (朋友\的個人資料標籤上)。',
		'ConfAutoReadMore' : '自動點選"繼續閱讀"連結。',
		'ConfBigAlbumPictures' : '新增一個顯示較大圖片版本的連結在相本上。',
		'ConfBookmarks' : '在頂端的選單中新增『加入書籤』的選單',
		'ConfBottomBarHoverOpacity' : 'On mouse-over',
		'ConfBottomBarOpacity' : '底部選單的透明度。',
		'ConfCalendarBirthDate' : '包括朋友\的生日活動詳情。',
		'ConfCalendarFullName' : '使用朋友\的全名作為生日的標題 (而不是只有first name)。',
		'ConfChatDifferentiate' : '使用粗體和斜體區分在線及閒置的好友。',
		'ConfChatHideIdle' : '隱藏閒置的朋友。',
		'ConfDelayPopupPics' : '顯示彈出的圖片前，增加一個短暫的緩衝時間。',
		'ConfDelayPopupPicsTimeout' : '顯示彈出的圖片前延遲時間，以毫秒計算(預設值=500):',
		'ConfDownloadVideo' : '在有短片的頁面新增一個下載連結 (你也許需要 <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '應用程式錯誤的後5秒自動重新讀取。',
		'ConfExport' : '匯出您的相關設定，複製下列文字，並另存於一個文件檔案。',
		'ConfExternalPopup' : '彈出全尺寸的外連圖片。 <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'FFixer的語言選項',
		'ConfFacebookTimestamps' : '顯示Facebook原來的時間戳記 (eg. "3 hours ago").',
		'ConfFBFTimestamps' : '新增FFixer的顯示時間戳記 (eg. "11:45").',
		'ConfFBFTimestamps24' : 'FFixer的時間戳記採用24小時制。',
		'ConfFriendRequestCountInTitle' : '在網頁標題顯示新增好友的請求。',
		'ConfGoogleApps' : '創建Google日曆連結使其與Google的應用服務相容。',
		'ConfGoogleAppsDomain' : '域名',
		'ConfGoogleCalendar' : '新增一個生日及活動的連結 <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : '語言 <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : '隱藏應用程式紀錄。',
		'ConfHideEventStories' : '隱藏事件紀錄。',
		'ConfHideFanStories' : '隱藏粉絲紀錄。',
		'ConfHideFriendStories' : '隱藏朋友紀錄。',
		'ConfHideGroupStories' : '隱藏團體紀錄。',
		'ConfHideLinkStories' : '隱藏連結紀錄。',
		'ConfHidePhotoStories' : '隱藏圖片紀錄。',
		'ConfHideProfilePicStories' : '隱藏個人資料的圖片紀錄。',
		'ConfHideRead' : '隱藏標記已讀得即時動態項目。',
		'ConfHideRelationshipStories' : '隱藏關聯紀錄。',
		'ConfHideStatusStories' : '隱藏身份紀錄。',
		'ConfHideVideoStories' : '隱藏短片紀錄。',
		'ConfHideWallStories' : '隱藏塗鴉牆紀錄。',
		'ConfHomeChat' : '顯示聊天部份。',
		'ConfHomeEvents' : '顯示部份活動。',
		'ConfHomeFindFriends' : '顯示朋友連結。',
		'ConfHomeLeftAlign' : '首頁向左對齊。',
		'ConfHomeLeftColumn' : '顯示左側欄位。',
		'ConfHomeLeftColumnFixed' : '向下滾動時，保持左側欄位可見。',
		'ConfHomeLink' : '在頂端的選單中，顯示首頁的連結。',
		'ConfHomePeopleYouMayKnow' : '顯示部份建議。',
		'ConfHomeNavigation' : '顯示導覽部份。',
		'ConfHomePokes' : '顯示戳一下的部份。',
		'ConfHomeProfile' : '顯示個人資料部份。',
		'ConfHomeRequests' : '顯示部份要求。',
		'ConfHomeRightColumn' : '顯示右欄。',
		'ConfHomeStretch' : '在瀏覽器中延伸首頁的寬度。',
		'ConfiCalendar' : '增加一個下載連結 <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfImport' : '如果在將來要匯入舊有設定，直接將之前的保存設定覆蓋底下的文字，然後選擇"Import（匯入）"',
		'ConfInboxCountInTitle' : '在信箱頁面顯示未讀的郵件數量',
		'ConfLogoutLink' : '在頂部的選單中加入『登出』連結。',
		'ConfNotificationCountInTitle' : '在網頁標題顯示新的通知。',
		'ConfNewTabSearch' : '使用 CTRL + Enter 搜索時，在新的頁面顯示搜尋結果。',
		'ConfPageTitle' : '移除每個頁面的 "Facebook |" 字樣。',
		'ConfPhotoPopup' : '滑鼠停於上方，自動彈出較大的圖片。',
		'ConfPopupAutoClose' : '關閉自動彈出圖片。',
		'ConfPopupSmartAutoClose' : '如果滑鼠移動到時，防止彈出圖片自動關閉。',
		'ConfPopupPosition' : '彈出圖片的顯示位置。',
		'ConfProcessInterval' : '頁面連結的間隔時間，以毫秒計算 (預設值=1000):',
		'ConfProfileLink' : '在頂端了選單中，顯示個人資料連結。',
		'ConfProfilePicPopup' : '滑鼠停於個人資料圖片上方時，自動彈出較大的圖片。',
		'ConfProtocolLinks' : '從個人資料的ID上打開聊天視窗，進入連結後即可開始交談對話。 (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : '關於 FFixer',
		'ConfSectionAdvanced' : '進階',
		'ConfSectionEvents' : '生日/活動',
		'ConfSectionFeeds' : '即時動態',
		'ConfSectionHomePage' : '首頁',
		'ConfSectionImportExport' : '匯入/匯出',
		'ConfSectionLiveFeed' : '即時動態',
		'ConfSectionMenu' : '選單/聊天',
		'ConfSectionOther' : '其他選項',
		'ConfSectionPageTitle' : '頁面標題',
		'ConfSectionPictures' : '圖片',
		'ConfSectionShortcuts' : '鍵盤快捷鍵',
		'ConfSecureLinks' : '強迫 Facebook 連結到 HTTPS 頁面。',
		'ConfShortcutList' : '<b>鍵盤快捷鍵</b> (大小寫區分):<br /><br /><i>從任何頁面:</i><br />&nbsp;<b>A</b> - 相本/相片<br />&nbsp;<b>B</b> - 切換好友列表 (在線好友)<br />&nbsp;<b>C</b> - FFixer 設置<br />&nbsp;<b>D</b> - 生日<br />&nbsp;<b>E</b> - 活動<br />&nbsp;<b>F</b> - 朋友<br />&nbsp;<b>H</b> - 首頁<br />&nbsp;<b>I</b> - 信箱<br />&nbsp;<b>L</b> - 選擇登出連結 (按下確定後登出)<br />&nbsp;<b>N</b> - 通知<br />&nbsp;<b>P</b> - 你的個人資料<br />&nbsp;<b>R</b> - 請求<br />&nbsp;<b>S</b> - 跳到搜索欄位<br />&nbsp;<b>T</b> - 翻譯選擇的內容<br />&nbsp;<b>?</b> - 顯示FFixer除錯訊息<br />&nbsp;<b>&lt;escape&gt;</b> - 使用FFixer關閉彈出視窗<br /><br /><i>從首頁 (過濾)</i>:<br />&nbsp;<b>a</b> - 頁面<br />&nbsp;<b>f</b> - 即時動態<br />&nbsp;<b>g</b> - 團體<br />&nbsp;<b>l</b> - 連結<br />&nbsp;<b>n</b> - 新的動態<br />&nbsp;<b>p</b> - 相片<br />&nbsp;<b>s</b> or <b>u</b> - 更新狀態<br />&nbsp;<b>t</b> - 筆記<br />&nbsp;<b>v</b> - 影片<br /><br /><i>從個人資料</i>:<br />&nbsp;<b>i</b> - 信息<br />&nbsp;<b>p</b> - 相片<br />&nbsp;<b>w</b> - 牆<br />&nbsp;<b>x</b> - 盒子<br /><br /><i>從網頁的頁碼 (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - 下一個<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - 首先 (當可以使用)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - 最後 (當可以使用)<br /><br /><i>當瀏覽相本/相片:</i><br />&nbsp;<b>a</b> - 讀取所有縮圖 (當可以使用)<br />&nbsp;<b>b</b> - 顯示大張的圖片<br />&nbsp;<b>c</b> - 查看留言<br />&nbsp;<b>k</b> - 返回相本<br />&nbsp;<b>m</b> - 照片 (個人) 和我<br /><br /><i>查看最近上傳/標記的相片:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - 最新的相本<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - 手機上傳<br />&nbsp;<b>o</b> - 我的相片<br />&nbsp;<b>p</b> - 我的相片<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - 標記的朋友',
		'ConfShortcuts' : '啟用鍵盤快捷鍵。',
		'ConfSign' : '在個人資料中顯示該人\的 生日署名 (如果他們提供了生日)。',
		'ConfTopBarFixed' : '即使向下捲動，一樣保持上方選單在螢幕上',
		'ConfTopBarHoverOpacity' : '滑鼠移至上方',
		'ConfTopBarOpacity' : '頂部選單的透明度。',
		'ConfUpdates' : '檢查 Userscripts.org For FFixer 的更新。 或是 <a href="#" id="fbfUpdateLink" onclick="return false;">立即確認</a>.',
		'DownloadVideo' : '下載影片',
		'ExportICalendarFile' : '輸出 iCalendar 檔案',
		'ExportICalendarFileWarning' : '(如果你有很多的朋友的話，將要一段時間)',
		'FacebookFixerConflict' : 'Facebook Fixer現在更名為FFixer。<br /><br />由於更改名稱，你需要手動從瀏覽器中卸載舊的Facebook Fixer腳本，因為兩個腳本會相互衝突。<br /><br />如果你不確定如何去移除腳本， <a %s>點擊說明部份</a>.',
		'fullAlbumLoaded' : '載入所有相本',
		'Import' : '匯入',
		'ImportConfirm' : '您確定要輸入這些設定嗎？當前的設定將會遺失。',
		'ImportFailure' : '在匯入的過程中發生錯誤。',
		'ImportSuccess' : '匯入成功。您要立即刷新頁面？',
		'Left' : '左邊',
		'LoadingAllPhotos' : '載入所有相片...',
		'loadingFullAlbum' : '載入所有相本...',
		'LoadingPic' : '載入照片中...',
		'LoadPhotosWarning' : '載入所有的照片需要較多的時間。',
		'Months' : new Array('一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'),
		'ProtocolSkype' : '呼叫 %s 使用 Skype',
		'ProtocolMSN' : '聊天 %s 使用 MSN',
		'ProtocolYahoo' : '聊天 %s 使用 Yahoo 即時通',
		'ProtocolGoogle' : '聊天 %s 使用 Google Talk',
		'ReloadErrorPage' : '點擊後重試, 或是等待5秒鐘',
		'Refresh' : '刷新',
		'Remove' : '移除',
		'Right' : '右邊',
		'ShowBigPictures' : '顯示大的圖片',
		'Signs' : new Array('摩羯座','水瓶座','雙魚座','白羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座'),
		'today' : 'today',
		'UpdateAvailable1' : 'FFixer 有可用的更新。',
		'UpdateAvailable2' : '你要現在更新嗎？',
		'UpdateHomepage' : '到首頁',
		'UpdateInstall' : '馬上安裝',
		'UpdateTomorrow' : '明天提醒我',
		'yearsOld' : '%s 歲'
	},

	// Turkish - Contributed by Gökhan Gurbetoğlu (20100817)
	tr : {
		'_language' : 'Turkish',
		'AddToCalendar' : 'Takvime Ekle',
		'AddToGoogleCalendar' : 'Google Takvim\'e Ekle',
		'all' : 'tümü',
		'All' : 'Tümü',
		'AllPhotosLoaded' : 'Tüm fotoğraflar yüklendi',
		'Automatic' : 'Otomatik',
		'Birthday' : '%s Doğumgünü',
		'BookmarkAdd' : 'Yeni Yer İmi Ekle',
		'BookmarkExists' : 'Bu sayfa için zaten bir yer imi var. \n\nYer imlerine eklemek istediğiniz sayfaya gidin ve tekrar deneyin.',
		'BookmarkNamePrompt' : 'Bu yer imi için bir isim girin:\n%s',
		'BookmarksConfirmRemoval' : 'Bu yer imlerini kaldırmak istediğinize emin misiniz?',
		'BookmarksManage' : 'Yer İmlerini Yönet',
		'BookmarksRemoveSelected' : 'Seçili Yer İmlerini Kaldır',
		'Bookmarks' : 'Yer İmleri',
		'BrowserUnsupported' : 'Tarayıcınız bu özelliği desteklemiyor.',
		'CreatingFile' : 'Dosya Oluşturuluyor',
		'Close' : 'Kapat',
		'ConfigureFacebookFixer' : 'FFixer\'ı Yapılandır',
		'ConfigureInstructions' : 'Bütün değişiklikler hemen kaydedilir ancak bazı değişiklikler halen açık olan sekmelerde etkisini göstermeyebilir.',
		'ConfAge' : 'Kişilerin yaşını profillerinde göster (eğer tam doğum tarihlerini belirtmişlerse).',
		'ConfAlbumComments' : 'Albümde yapılmış tüm yorumları görmek için albüm sayfalarına bir bağlantı ekle.',
		'ConfApplicationWhitelist' : 'Uygulama Beyaz Listesi - Gizlenmesini istemediğiniz uygulamaların ID numaralarını girin. Birden fazla ID için aralara boşluk bırakın.',
		'ConfAutoBigAlbumPictures' : 'Büyük albüm resimlerini sayfa açıldığında otomatik olarak göster.',
		'ConfAutoLoadFullAlbum' : 'Bir albümdeki tüm küçük resimleri otomatik olarak tek sayfada yükle.',
		'ConfAutoLoadTaggedPhotos' : 'Tüm etiketlenmiş fotoğraflar için küçük resimleri otomatik olarak tek sayfada yükle (kişilerin profilindeki fotoğraflar sekmesi)',
		'ConfAutoReadMore' : '"Devamını gör" bağlantılarına otomatik olarak tıkla.',
		'ConfBigAlbumPictures' : 'Albüm sayfalarına bütün resimlerin büyük sürümlerini tek sayfada göstermek için bir bağlantı ekle.',
		'ConfBookmarks' : 'Üst menü çubuğuna bir Yer İmleri alt menüsü ekle.',
		'ConfBottomBarHoverOpacity' : 'Fare üstüne geldiğinde',
		'ConfBottomBarOpacity' : 'Alt menü çubuğu şeffaflığı',
		'ConfCalendarBirthDate' : 'Etkinlik ayrıntıları kişinin doğumgününü içersin.',
		'ConfCalendarFullName' : 'Doğumgünleri için kişinin tam adını kullan (sadece ilk adını kullanmak yerine).',
		'ConfChatDifferentiate' : 'Çevrimiçi ve boştaki arkadaşları ayırt etmek için kalın ve italik yazıtipi kullan.',
		'ConfChatHideIdle' : 'Boştaki arkadaşları gizle.',
		'ConfDelayPopupPics' : 'Açılır pencerede resimleri göstermeden önce kısa bir gecikme zamanı ekle.',
		'ConfDelayPopupPicsTimeout' : 'Açılır pencerede resimleri göstermeden önceki gecikme, milisaniye olarak (varsayılan=500):',
		'ConfDownloadVideo' : 'Video sayfalarındaki videoları indirmek için bir bağlantı ekle. (Bir <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV oynatıcı</a>\'ya ihtiyacınız olabilir)',
		'ConfErrorPageReload' : 'Uygulama hata sayfalarını 5 saniye sonra otomatik olarak yenile.',
		'ConfExport' : 'Ayarlarınızı dışa aktarmak için aşağıdaki metni kopyalayın ve bir dosyaya kaydedin.',
		'ConfExternalPopup' : 'Harici sitelerdeki fotoğrafların büyük sürümünü göster. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'FFixer\'ın Dili',
		'ConfFacebookTimestamps' : 'Facebook\'un zaman etiketlerini göster (örn. "3 saat önce").',
		'ConfFBFTimestamps' : 'Facebook\'un zaman etiketlerinin ardından FFixer zaman etiketlerini ekle (örn. "11:45").',
		'ConfFBFTimestamps24' : 'FFixer zaman etiketlerini 24-saat biçiminde göster',
		'ConfFriendRequestCountInTitle' : 'Sayfa başlığında yeni arkadaşlık isteklerinin sayısını göster.',
		'ConfGoogleApps' : 'Google Apps ile uyumlu Google Takvim bağlantıları oluştur.',
		'ConfGoogleAppsDomain' : 'Etki Alanı',
		'ConfGoogleCalendar' : '<a href="http://tr.wikipedia.org/wiki/Google_Takvim" target="_blank">Google Takvim</a>\'e doğumgünü ve etkinlikler ekleyebilmek için bağlantıları oluştur.',
		'ConfGoogleLanguage' : '<a href="http://tr.wikipedia.org/wiki/Google_%C3%87eviri" target="_blank">Google Çeviri</a> için dil',
		'ConfHideApplicationStories' : 'Uygulama haberlerini gizle.',
		'ConfHideEventStories' : 'Etkinlik haberlerini gizle.',
		'ConfHideFacebookCountInTitle' : 'Facebook\'un yeni mesaj sayısı gösterimini gizle.',
		'ConfHideFriendStories' : 'Arkadaşlık haberlerini gizle.',
		'ConfHideGroupStories' : 'Grup haberlerini gizle.',
		'ConfHideLikeStories' : 'Beğenme haberlerini gizle.',
		'ConfHideLinkStories' : 'Bağlantı haberlerini gizle.',
		'ConfHideNoteStories' : 'Not haberlerini gizle.',
		'ConfHidePhotoStories' : 'Fotoğraf haberlerini gizle.',
		'ConfHideProfilePicStories' : 'Profil resmi haberlerini gizle.',
		'ConfHideRead' : 'Canlı haberlerdeki okundu olarak işaretlenmiş öğeleri gizle.',
		'ConfHideRelationshipStories' : 'İlişki haberlerini gizle.',
		'ConfHideStatusStories' : 'Durum haberlerini gizle.',
		'ConfHideVideoStories' : 'Video haberlerini gizle.',
		'ConfHideWallStories' : 'Duvar hikayelerini gizle.',
		'ConfHomeBeta' : 'Facebook Ön Gösterim bölmesini göster.',
		'ConfHomeChat' : 'Sohbet bölmesini göster.',
		'ConfHomeEvents' : 'Etkinlik bölmesini göster.',
		'ConfHomeFindFriends' : 'Arkadaşlarınla Bağlantı Kur bölmesini göster.',
		'ConfHomeLeftAlign' : 'Ana sayfa içeriğini sola yasla.',
		'ConfHomeLeftColumn' : 'Sol sütunu göster.',
		'ConfHomeLeftColumnFixed' : 'Sayfa aşağı kaydırılsa bile sol sütunu görünür tut.',
		'ConfHomeLink' : 'Üst menü çubuğunda Ana Sayfa bağlantısını göster.',
		'ConfHomeNavigation' : 'Dolaşma bölmesini göster.',
		'ConfHomePokes' : 'Dürtme bölmesini göster.',
		'ConfHomeProfile' : 'Profil bölmesini göster.',
		'ConfHomeRecommendations' : 'Tavsiyeleri göster (Tanıyor Olabileceğin Kişiler, Tavsiye Edilen Sayfalar, vs.).',
		'ConfHomeRequests' : 'İstekler bölmesini göster.',
		'ConfHomeRightColumn' : 'Sağ sütunu göster.',
		'ConfHomeStretch' : 'Ana sayfayı tarayıcının genişliğine sığacak şekilde uzat.',
		'ConfHomeStretchComments' : 'Ana sayfadaki yorumları uzat.',
		'ConfiCalendar' : 'Bütün doğumgünlerini içeren bir <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> dosyası indirmek için bağlantıları ekle.',
		'ConfImport' : 'İleride ayarlarınızı içe aktarmak için, daha önce kaydettiğiniz metni aşağıdaki metnin yerine yapıştırın ve "İçe Aktar"a tıklayın.',
		'ConfInboxCountInTitle' : 'Sayfa başlığında gelen kutusundaki okunmamış mesaj sayısını göster.',
		'ConfLogoutLink' : 'Üst menü çubuğuna bir çıkış bağlantısı ekle.',
		'ConfNotificationCountInTitle' : 'Sayfa başlığında bildirimlerin sayısını göster.',
		'ConfNewTabSearch' : 'CTRL + Enter basarak arama yapıldığında arama sonuçlarını yeni bir sekmede/pencerede aç.',
		'ConfPageTitle' : 'Bütün sayfaların başlığından "Facebook |" yazısını kaldır.',
		'ConfPhotoPopup' : 'Fareyle üstüne gelindiğinde fotoğrafların büyük sürümlerini göster.',
		'ConfPopupAutoClose' : 'Açılan pencere resimlerini otomatik olarak kapat.',
		'ConfPopupSmartAutoClose' : 'Açılan pencere resimlerinin fare üzerindeyken otomatik olarak kapanmasını engelle.',
		'ConfPopupPosition' : 'Açılan pencere resimlerinin konumu',
		'ConfProcessInterval' : 'Sayfayı işlemek için zaman aralığı, milisaniye olarak (varsayılan=1000):',
		'ConfProfileLink' : 'Üst menü çubuğunda Profil bağlantısını göster.',
		'ConfProfilePicPopup' : 'Fareyle üstüne gelindiğinde profil resimlerinin büyük sürümlerini göster',
		'ConfProtocolLinks' : 'Profillerdeki anlık ileti adreslerini anında iletişim kurulabilecek bağlantılara dönüştür (Google Talk, Windows Live, vb.).',
		'ConfSectionAbout' : 'FFixer Hakkında',
		'ConfSectionAdvanced' : 'Gelişmiş',
		'ConfSectionEvents' : 'Doğumgünleri/Etkinlikler',
		'ConfSectionImportExport' : 'İçe/Dışa Aktar',
		'ConfSectionFeeds' : 'Kaynaklar',
		'ConfSectionHomePage' : 'Ana Sayfa',
		'ConfSectionLiveFeed' : 'Canlı Haberler',
		'ConfSectionMenu' : 'Menüler/Sohbet',
		'ConfSectionOther' : 'Diğer Seçenekler',
		'ConfSectionPageTitle' : 'Sayfa Başlığı',
		'ConfSectionPictures' : 'Resimler',
		'ConfSectionShortcuts' : 'Klavye Kısayolları',
		'ConfSecureLinks' : 'Facebook bağlantılarını HTTPS sayfalarını kullanmaya zorla.',
		'ConfShortcutList' : '<b>Klavye Kısayolları</b> (büyük/küçük harf duyarlı):<br /><br /><i>Herhangi bir sayfadan:</i><br /> <b>A</b> - Albümler/fotoğraflar<br /> <b>B</b> - Arkadaş listesini aç/kapa (çevrimiçi arkadaşlar)<br /> <b>C</b> - FFixer yapılandırması<br /> <b>D</b> - Doğumgünleri<br /> <b>E</b> - Etkinlikler<br /> <b>F</b> - Arkadaşlar<br /> <b>H</b> - Ana Sayfa<br /> <b>I</b> - Gelen Kutusu<br /> <b>L</b> - Çıkış bağlantısını seç (çıkış yapmak için bundan sonra Enter\'a basın)<br /> <b>N</b> - Bildirimler<br /> <b>P</b> - Profiliniz<br /> <b>R</b> - İstekler<br /> <b>S</b> - Arama alanına git<br /> <b>T</b> - Seçili metni tercüme et<br /> <b>?</b> - FFixer hata ayıklama bilgisini göster<br /> <b><escape></b> - FFixer tarafından açılmış pencereleri kapat<br /><br /><i>Ana sayfadan (filtreler):</i><br /> <b>a</b> - Sayfalar<br /> <b>f</b> - Canlı Haberler<br /> <b>g</b> - Gruplar<br /> <b>l</b> - Bağlantılar<br /> <b>n</b> - Haber Kaynağı<br /> <b>p</b> - Fotoğraflar<br /> <b>s</b> veya <b>u</b> - Durum güncellemeleri<br /> <b>t</b> - Notlar<br /> <b>v</b> - Videolar<br /><br /><i>Profil sayfalarından:</i><br /> <b>i</b> - Bilgi<br /> <b>p</b> - Fotoğraflar<br /> <b>w</b> - Duvar<br /> <b>x</b> - Kutular<br /><br /><i>Numaralandırılmış sayfalardan (önceki, sonraki, vb.):</i><br /> <b><sol ok></b> - Önceki<br /> <b><sağ ok></b> - Sonraki<br /> <b><shift> + <sol ok></b> - İlk (eğer mevcutsa)<br /> <b><shift> + <sağ ok></b> - Son (eğer mevcutsa)<br /><br /><i>Albümleri/fotoğrafları görüntülerken:</i><br /> <b>a</b> - Tüm küçük resimleri yükle (eğer mevcutsa)<br /> <b>b</b> - Büyük resimleri göster<br /> <b>c</b> - Yorumları göster<br /> <b>k</b> - Albüme geri dön<br /> <b>m</b> - (Kişi) ve benim fotoğraflarım<br /><br /><i>Yakın zamanlardaki albümleri ve yüklenmiş/etiketlenmiş fotoğrafları görüntülerken:</i><br /> <b>a</b> veya  <b>r</b> - Yakın Zamandaki Albümler<br /> <b>m</b> veya  <b>u</b> - Mobil yüklemeler<br /> <b>o</b> - Benim olduğum fotoğraflar<br /> <b>p</b> - Fotoğraflarım<br /> <b>t</b> veya  <b>f</b> - Etiketlenmiş arkadaşlar',
		'ConfShortcuts' : 'Klavye kısayollarını etkinleştir.',
		'ConfSign' : 'Profillerde kişilerin burçlarını göster (eğer doğum tarihlerini belirtmişlerse).',
		'ConfTopBarFixed' : 'Sayfa aşağı kaydırılsa bile üst menü çubuğunu ekranda tut.',
		'ConfTopBarHoverOpacity' : 'Fare üstüne geldiğinde',
		'ConfTopBarOpacity' : 'Üst menü çubuğu şeffaflığı',
		'ConfUpdates' : 'FFixer güncellemeleri için her gün Userscripts.org\'u ziyaret et. Ya da <a href="#" id="fbfUpdateLink" onclick="return false;">şimdi kontrol et</a>.',
		'DownloadVideo' : 'Videoyu İndir',
		'ExportICalendarFile' : 'iCalendar dosyası aktar',
		'ExportICalendarFileWarning' : '(Eğer çok arkadaşınız varsa bu biraz uzun sürebilir)',
		'FacebookFixerConflict' : 'FFixer\'ın yeni adı artık FFixer. İsim değişikliğinden dolayı FFixer\'ı tarayıcınızdan kaldırmanız gerekiyor, yoksa bu iki script birbiriyle uyuşmazlık sorunları çıkaracaktır. Eğer bir userscript\'i nasıl kaldıracağınızdan emin değilseniz <a %s>buraya tıklayarak öğrenebilirsiniz</a>.',
		'fullAlbumLoaded' : 'bütün albüm yüklendi',
		'Import' : 'İçe Aktar',
		'ImportConfirm' : 'Bu ayarları içe aktarmak istediğinize emin misiniz?\nMevcut ayarlarınız silinecek.',
		'ImportFailure' : 'Ayarlarınızı içe aktarmaya çalışırken bir hata oluştu.',
		'ImportSuccess' : 'İçe aktarma tamamlandı. Sayfayı yenilemek ister misiniz?',
		'Left' : 'Sol',
		'LoadingAllPhotos' : 'Tüm fotoğraflar yükleniyor...',
		'loadingFullAlbum' : 'tüm albüm yükleniyor...',
		'LoadingPic' : 'Resim Yükleniyor...',
		'LoadPhotosWarning' : 'Tüm fotoğrafları yüklemek uzun zaman alabilir',
		'Months' : new Array('Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'),
		'ProtocolSkype' : '%s kişisini Skype kullanarak ara',
		'ProtocolMSN' : '%s ile Windows Live kullanarak sohbet et',
		'ProtocolYahoo' : '%s ile Yahoo Messenger kullanarak sohbet et',
		'ProtocolGoogle' : '%s ile Google Talk kullanarak sohbet et',
		'ReloadErrorPage' : 'Yeniden denemek için tıklayın, ya da 5 saniye bekleyin',
		'Refresh' : 'Yenile',
		'Remove' : 'Kaldır',
		'Right' : 'Sağ',
		'ShowBigPictures' : 'Büyük Resimleri Göster',
		'Signs' : new Array('Oğlak','Kova','Balık','Koç','Boğa','İkizler','Yengeç','Aslan','Başak','Terazi','Akrep','Yay'),
		'today' : 'bugün',
		'Translators' : 'Çevirenler',
		'UpdateAvailable1' : 'FFixer için bir güncelleme mevcut',
		'UpdateAvailable2' : 'Şimdi güncellemek ister misiniz?',
		'UpdateHomepage' : 'Ana sayfaya git',
		'UpdateInstall' : 'Şimdi kur',
		'UpdateTomorrow' : 'Yarın hatırlat',
		'ViewAlbumComments' : 'Albüm Yorumlarını Göster',
		'yearsOld' : '%s yaşında'
	},

	// Serbian (Cyrillic) - Contributed by Горштак (20100817)
	sr_rs : {
		'_language' : 'Serbian (Cyrillic)',
		'AddToCalendar' : 'Додај у календар',
		'AddToGoogleCalendar' : 'Додај у Google календар',
		'all' : 'све',
		'All' : 'Све',
		'AllPhotosLoaded' : 'Све фотографије су учитане',
		'Automatic' : 'Аутоматски',
		'Birthday' : 'Рођендан корисника %s',
		'BookmarkAdd' : 'Додај нову забелешку',
		'BookmarkExists' : 'Ова страница је већ додата у забелешке.\n\nИдите на страницу коју желите да додате и покушајте поново.',
		'BookmarkNamePrompt' : 'Унесите назив ове забелешке:\n%s',
 		'BookmarksConfirmRemoval' : 'Да ли сте сигурни да желите да уклоните ове забелешке?',
 		'BookmarksManage' : 'Уреди забелешке',
 		'BookmarksRemoveSelected' : 'Уклони изабране забелешке',
		'Bookmarks' : 'Забелешке',
		'BrowserUnsupported' : 'Ваш претраживач не подржава ову опцију.',
		'CreatingFile' : 'Датотека се израђује',
		'Close' : 'Затвори',
		'ConfigureFacebookFixer' : 'Подеси FFixer',
		'ConfigureInstructions' : 'Све измене се се одмах памте, али понекад је потребно освежити отворене странице да би измене деловале.',
		'ConfAge' : 'Прикажи узраст особе на профилу (уколико је наведен пун датум пођења).',
 		'ConfAlbumComments' : 'Додај везу на страницу албума којом би се приказали сви коментари албума.',
		'ConfApplicationWhitelist' : 'Списак дозвољених апликација - Унесите ознаку апликације како бисте спречили њено сакривање. Раздвојте ознаке размаком.',
		'ConfAutoBigAlbumPictures' : 'Аутоматски прикажи веће фотографије из албума када се страница отвори.',
		'ConfAutoLoadFullAlbum' : 'Аутоматски, на једној страници, учитај сличице свих фотографија из албума.',
		'ConfAutoLoadTaggedPhotos' : 'Аутоматски, на једној страници, учитај сличице свих означених фотографија (на картици "Фотографије" унутар профила).',
		'ConfAutoReadMore' : 'Аутоматски кликни на везу "старије".',
		'ConfBigAlbumPictures' : 'На страници албума додај везу за приказивање већих сличица свих фотографија са те странице.',
		'ConfBookmarks' : 'Додај подмени "Забелешке" на горњу траку са менијима.',
		'ConfBottomBarHoverOpacity' : 'Приликом преласка мишем',
		'ConfBottomBarOpacity' : 'Провидност доње траке са менијима',
		'ConfCalendarBirthDate' : 'Укључи датум рођења корисника у детаљима догађаја.',
		'ConfCalendarFullName' : 'Додај и презиме корисника у наслову рођендана.',
		'ConfChatDifferentiate' : 'Означи доступне пријатеље подебљаним словима а неактивне косим словима.',
		'ConfChatHideIdle' : 'Сакриј неактивне пријатеље.',
		'ConfDelayPopupPics' : 'Укључи кратак застој пре приказивања увећаних слика.',
		'ConfDelayPopupPicsTimeout' : 'Застој пре приказивања увећаних слика, у милисекундама (подразумевано=500):',
		'ConfDownloadVideo' : 'Додај везу за преузимање видео снимка са странице за видео. (Можда ће вам требати <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Аутоматско поновно учитавање странице након 5 секунди, у случају грешке.',
		'ConfExport' : 'Да бисте извезли своја подешавања, копирајте текст који следи и сачувајте га у датотеку.',
		'ConfExternalPopup' : 'Прикажи увећане слике фотографија са спољашњих страница. <sup>бета</sup>',
		'ConfFacebookFixerLanguage' : 'Језик FFixer-а',
		'ConfFacebookTimestamps' : 'Прикажи Фејсбук време (нпр. "пре 3 сата").',
		'ConfFBFTimestamps' : 'Додај FFixer време после Фејсбук времена (нпр. "11:45").',
		'ConfFBFTimestamps24' : 'Прикажи FFixer времена у 24-часовном облику.',
		'ConfFriendRequestCountInTitle' : 'Прикажи број захтева за пријатељство у наслову странице.',
		'ConfGoogleApps' : 'Направи везе за Google календар, погодне за Google ове апликације.',
		'ConfGoogleAppsDomain' : 'Домен',
		'ConfGoogleCalendar' : 'Додај везе за додавање рођендана и догађаја у <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google календар</a>.',
		'ConfGoogleLanguage' : 'Језик за <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google преводилац</a>',
		'ConfHideApplicationStories' : 'Сакриј обавештења о апликацијама.',
		'ConfHideEventStories' : 'Сакриј обавештења о догађајима.',
 		'ConfHideFacebookCountInTitle' : 'Сакриј Фејсбуков број нових примљених порука.',
		'ConfHideFriendStories' : 'Сакриј обавештења о пријатељствима.',
		'ConfHideGroupStories' : 'Сакриј обавештења о групама.',
 		'ConfHideLikeStories' : 'Сакриј обавештења о "допада ми се" ставкама.',
		'ConfHideLinkStories' : 'Сакриј обавештења о везама.',
		'ConfHideNoteStories' : 'Сакриј обавештења о записима.',
		'ConfHidePhotoStories' : 'Сакриј обавештења о фотографијама.',
		'ConfHideProfilePicStories' : 'Сакриј обавештења о сликама на профилу.',
		'ConfHideRead' : 'У најновијим дешавањима сакриј ставке које су означене као прочитане.',
		'ConfHideRelationshipStories' : 'Сакриј обавештења о статусима везе.',
		'ConfHideStatusStories' : 'Сакриј промене статуса.',
		'ConfHideVideoStories' : 'Сакриј обавештења о видео записима.',
		'ConfHideWallStories' : 'Сакриј обавештења са зида.',
 		'ConfHomeBeta' : 'Прикажи одељак са Фејсбуковим најавама.',
		'ConfHomeChat' : 'Прикажи одељак са ћаскањем.',
		'ConfHomeEvents' : 'Прикажи одељак са догађајима.',
		'ConfHomeFindFriends' : 'Прикажи "Повежи се са" одељак.',
		'ConfHomeLeftAlign' : 'Поравнај садржај почетне странице по левој страни.',
		'ConfHomeLeftColumn' : 'Прикажи леву колону.',
		'ConfHomeLeftColumnFixed' : 'Нека лева колона буде видљива и приликом померања странице на доле.',
		'ConfHomeLink' : 'Прикажи везу за Почетну страницу на горњој траци са менијима.',
		'ConfHomeNavigation' : 'Прикажи одељак за навигацију.',
		'ConfHomePokes' : 'Прикажи "Боцкање" одељак.',
		'ConfHomeProfile' : 'Прикажи "Профил" одељк.',
 		'ConfHomeRecommendations' : 'Прикажи препоруке (Особе које можда познајеш, Препоручене странице итд.).',
		'ConfHomeRequests' : 'Прикажи "Захтеви" одељак.',
		'ConfHomeRightColumn' : 'Прикажи десну колону.',
		'ConfHomeStretch' : 'Рашири почетну страницу на пуну ширину прозора претраживача.',
 		'ConfHomeStretchComments' : 'Рашири коментаре на почетној страници.',
		'ConfiCalendar' : 'Додај везе за преузимање <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> датотеке са свим рођенданима.',
		'ConfImport' : 'Да бисе касније увезли своја подешавања, замените текст који следи са текстом који сте претходно сачували и кликните "Увоз".',
		'ConfInboxCountInTitle' : 'Прикажи број нових порука у наслову странице.',
		'ConfLogoutLink' : 'Додај везу за одјављивање на горњу траку са менијима.',
		'ConfNotificationCountInTitle' : 'Прикажи број нових обавештења у наслову странице.',
		'ConfNewTabSearch' : 'Када притиснем CTRL + Enter за претрагу, отвори резултате претраге у новој картици/прозору.',
		'ConfPageTitle' : 'Уклони "Facebook |" из наслова свих страница.',
		'ConfPhotoPopup' : 'Прикажи веће верзије фотографија приликом преласка мишем.',
		'ConfPopupAutoClose' : 'Аутоматски затвори увећане слике.',
		'ConfPopupSmartAutoClose' : 'Не затварај увећане слике ако је показивач миша на њима.',
		'ConfPopupPosition' : 'Положај увећаних слика',
		'ConfProcessInterval' : 'Интервал за обраду странице, у милисекундама (подразумевано=1000):',
		'ConfProfileLink' : 'Прикажи везу за Профил на горњу траку са менијима.',
		'ConfProfilePicPopup' : 'Прикажи веће верзије слика на профилу приликом преласка мишем',
		'ConfProtocolLinks' : 'Претвори надимке програма за комуникацију (Google Talk, Windows Live и др.) са профила у везе којима ће се започети ћаскање.',
		'ConfSectionAbout' : 'О додатку FFixer',
		'ConfSectionAdvanced' : 'Више опција',
		'ConfSectionEvents' : 'Рођендани/догађаји',
		'ConfSectionImportExport' : 'Увоз/Извоз',
		'ConfSectionFeeds' : 'Новости',
		'ConfSectionHomePage' : 'Почетна страница',
		'ConfSectionLiveFeed' : 'Најновије',
		'ConfSectionMenu' : 'Менији/ћаскање',
		'ConfSectionOther' : 'Остале опције',
		'ConfSectionPageTitle' : 'Наслов странице',
		'ConfSectionPictures' : 'Слике',
		'ConfSectionShortcuts' : 'Пречице са тастатуре',
		'ConfSecureLinks' : 'Присили усмеравање Фејсбук веза на HTTPS странице.',
		'ConfShortcutList' : '<b>Пречице са тастатуре</b> (разликују се мала и велика слова):<br /><br /><i>Са било које странице:</i><br /> <b>A</b> - Албуми/фотографије<br /> <b>B</b> - Списак доступних пријатеља<br /> <b>C</b> - FFixer подешавања<br /> <b>D</b> - Рођендани<br /> <b>E</b> - Догађаји<br /> <b>F</b> - Пријатељи<br /> <b>H</b> - Почетна страница<br /> <b>I</b> - Примљене поруке<br /> <b>K</b> - додај забелешку<br /> <b>L</b> - Означи везу за одјаву (притисните Ентер након тога за одјављивање)<br /> <b>N</b> - Обавештења<br /> <b>P</b> - Профил<br /> <b>R</b> - Захтеви<br /> <b>S</b> - Прелазак на поље за претрагу<br /> <b>T</b> - Преведи одабрани текст<br /> <b>?</b> - Прикажи извештај о грешци FFixer-а<br /> <b><escape></b> - Затвори искачуће прозоре које је направио FFixer<br /><br /><i>Са почетне странице (филтери)</i>:<br /> <b>a</b> - Странице<br /> <b>f</b> - Најновије<br /> <b>g</b> - Групе<br /> <b>l</b> - Везе<br /> <b>n</b> - Новости<br /> <b>p</b> - Фотографије<br /> <b>s</b> или <b>u</b> - Промене статуса<br /> <b>t</b> - Белешке<br /> <b>v</b> - Видео<br /><br /><i>Са профила</i>:<br /> <b>i</b> - Информације<br /> <b>p</b> - Фотографије<br /> <b>w</b> - Зид<br /> <b>x</b> - Оквири<br /><br /><i>Са страница са набрајањем (претходна, следћа, итд.)</i><br /> <b><стрелица лево></b> - Претходна<br /> <b><стрелица десно></b> - Следећа<br /> <b><шифт> + <стрелица лево></b> - Прва (ако је доступно)<br /> <b><шифт> + <стрелица десно></b> - Последња (ако је доступно)<br /><br /><i>Приликом прегледавања албума/фотографија:</i><br /> <b>a</b> - Учитај све сличице (ако је доступно)<br /> <b>b</b> - Прикажи велике слике<br /> <b>c</b> - Прикажи коментаре<br /> <b>k</b> - Назад на албум<br /> <b>m</b> - Фотографије са (корисником) и са мном<br /><br /><i>При прегледавању скорашњих албума и постављених/означених фотографија:</i><br /> <b>a</b> или  <b>r</b> - Скорашњи албуми<br /> <b>m</b> или  <b>u</b> - Постављено преко мобилног телефона<br /> <b>o</b> - Фотографије на којима сам ја<br /> <b>p</b> - Моје фотографије<br /> <b>t</b> или  <b>f</b> - Означени пријатељи',
		'ConfShortcuts' : 'Омогући пречице са тастатуре.',
		'ConfSign' : 'Прикажи корисников хороскопски знак на његовом профилу (уколико је наведен пун датум рођења).',
		'ConfTopBarFixed' : 'Задржи горњу траку са менијима на екрану и приликом померања странице на доле.',
		'ConfTopBarHoverOpacity' : 'Приликом преласка мишем',
		'ConfTopBarOpacity' : 'Провидност Горње траке са менијима',
		'ConfUpdates' : 'Свакодневно проверавај Userscripts.org за надоградње FFixer-а. Или <a href="#" id="fbfUpdateLink" onclick="return false;">провери сада</a>.',
		'DownloadVideo' : 'Преузми видео',
		'ExportICalendarFile' : 'Извези iCalendar датотеку',
		'ExportICalendarFileWarning' : '(Ово може да потраје ако имате много пријатеља)',
		'FacebookFixerConflict' : 'FFixer се сада зове FFixer. Због промене имена мораћете ручно да уклоните FFixer из свог прегледача да не би дошло до ометања између ове две скрипте. Ако нисте сигурни како да уклоните скрипту, <a %s>кликните овде за упутство</a>.',
		'fullAlbumLoaded' : 'цео албум је учитан',
		'Import' : 'Увоз',
		'ImportConfirm' : 'Да ли сте сигурни да желите да увезете ова подешавања?\nВаша тренутна подешавања ће бити поништена.',
		'ImportFailure' : 'Дошло је до грешке приликом увоза ваших подешавања.',
		'ImportSuccess' : 'Увоз је завршен. Да ли желите да освежите страницу?',
		'Left' : 'Лево',
		'LoadingAllPhotos' : 'Учитавање свих фотографија...',
		'loadingFullAlbum' : 'учитавање свих албума...',
		'LoadingPic' : 'Учитавање слике...',
		'LoadPhotosWarning' : 'Учитавање свих фотографија може да потраје неко време',
		'Months' : new Array('Јануар','Фебруар','Март','Април','Мај','Јун','Јул','Август','Септембар','Октобар','Новембар','Децембар'),
		'ProtocolSkype' : 'Позови корисника %s путем програма Skype',
		'ProtocolMSN' : 'Ћаскај са корисником %s путем програма Windows Live',
		'ProtocolYahoo' : 'Ћаскај са корисником %s путем програма Yahoo Messenger',
		'ProtocolGoogle' : 'Ћаскај са корисником %s путем програма Google Talk',
		'ReloadErrorPage' : 'Кликните да покушате поново, или сачекајте 5 секунди',
		'Refresh' : 'Освежи',
		'Remove' : 'Уклони',
		'Right' : 'Десно',
		'ShowBigPictures' : 'Прикажи велике слике',
		'Signs' : new Array('Јарац','Водолија','Рибе','Ован','Бик','Близанци','Рак','Лав','Девица','Вага','Шкорпија','Стрелац'),
		'today' : 'данас',
		'Translators' : 'Преводиоци',
		'UpdateAvailable1' : 'Доступне су надоградње за FFixer',
		'UpdateAvailable2' : 'Желите ли сада да надоградите?',
		'UpdateHomepage' : 'Иди на почетну страницу',
		'UpdateInstall' : 'Инсталирај одмах',
		'UpdateTomorrow' : 'Подсети ме сутра',
 		'ViewAlbumComments' : 'Прикажи коментаре албума',
		'yearsOld' : '%s година'
	},

	// Serbian (Latin) - Contributed by Gorštak (20100817)
	sr : {
		'_language' : 'Serbian (Latin)',
		'AddToCalendar' : 'Dodaj u kalendar',
		'AddToGoogleCalendar' : 'Dodaj u Google kalendar',
		'all' : 'sve',
		'All' : 'Sve',
		'AllPhotosLoaded' : 'Sve fotografije su učitane',
		'Automatic' : 'Automatski',
		'Birthday' : 'Rođendan korisnika %s',
		'BookmarkAdd' : 'Dodaj novu zabelešku',
		'BookmarkExists' : 'Ova stranica je već dodata u zabeleške.\n\nIdite na stranicu koju želite da dodate i pokušajte ponovo.',
		'BookmarkNamePrompt' : 'Unesite naziv ove zabeleške:\n%s',
 		'BookmarksConfirmRemoval' : 'Da li ste sigurni da želite da uklonite ove zabeleške?',
 		'BookmarksManage' : 'Uredi zabeleške',
 		'BookmarksRemoveSelected' : 'Ukloni izabrane zabeleške',
		'Bookmarks' : 'Zabeleške',
		'BrowserUnsupported' : 'Vaš pretraživač ne podržava ovu opciju.',
		'CreatingFile' : 'Datoteka se izrađuje',
		'Close' : 'Zatvori',
		'ConfigureFacebookFixer' : 'Podesi FFixer',
		'ConfigureInstructions' : 'Sve izmene se se odmah pamte, ali ponekad je potrebno osvežiti otvorene stranice da bi izmene delovale.',
		'ConfAge' : 'Prikaži uzrast osobe na profilu (ukoliko je naveden pun datum pođenja).',
 		'ConfAlbumComments' : 'Dodaj vezu na stranici albuma kojom bi se prikazali svi komentari albuma.',
		'ConfApplicationWhitelist' : 'Spisak dozvoljenih aplikacija - Unesite oznaku aplikacije kako biste sprečili njeno sakrivanje. Razdvojte oznake razmakom.',
		'ConfAutoBigAlbumPictures' : 'Automatski prikaži veće fotografije iz albuma kada se stranica otvori.',
		'ConfAutoLoadFullAlbum' : 'Automatski, na jednoj stranici, učitaj sličice svih fotografija iz albuma.',
		'ConfAutoLoadTaggedPhotos' : 'Automatski, na jednoj stranici, učitaj sličice svih označenih fotografija (na kartici "Fotografije" unutar profila).',
		'ConfAutoReadMore' : 'Automatski klikni na vezu "starije".',
		'ConfBigAlbumPictures' : 'Na stranici albuma dodaj vezu za prikazivanje većih sličica svih fotografija sa te stranice.',
		'ConfBookmarks' : 'Dodaj podmeni "Zabeleške" na gornju traku sa menijima.',
		'ConfBottomBarHoverOpacity' : 'Prilikom prelaska mišem',
		'ConfBottomBarOpacity' : 'Providnost donje trake sa menijima',
		'ConfCalendarBirthDate' : 'Uključi datum rođenja korisnika u detaljima događaja.',
		'ConfCalendarFullName' : 'Dodaj i prezime korisnika u naslovu rođendana.',
		'ConfChatDifferentiate' : 'Označi dostupne prijatelje podebljanim slovima a neaktivne kosim slovima.',
		'ConfChatHideIdle' : 'Sakrij neaktivne prijatelje.',
		'ConfDelayPopupPics' : 'Uključi kratak zastoj pre prikazivanja uvećanih slika.',
		'ConfDelayPopupPicsTimeout' : 'Zastoj pre prikazivanja uvećanih slika, u milisekundama (podrazumevano=500):',
		'ConfDownloadVideo' : 'Dodaj vezu za preuzimanje video snimka sa stranice za video. (Možda će vam trebati <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Automatsko ponovno učitavanje stranice nakon 5 sekundi, u slučaju greške.',
		'ConfExport' : 'Da biste izvezli svoja podešavanja, kopirajte tekst koji sledi i sačuvajte ga u datoteku.',
		'ConfExternalPopup' : 'Prikaži uvećane slike fotografija sa spoljašnjih stranica. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jezik FFixer-a',
		'ConfFacebookTimestamps' : 'Prikaži Fejsbuk vreme (npr. "pre 3 sata").',
		'ConfFBFTimestamps' : 'Dodaj FFixer vreme posle Fejsbuk vremena (npr. "11:45").',
		'ConfFBFTimestamps24' : 'Prikaži FFixer vremena u 24-časovnom obliku.',
		'ConfFriendRequestCountInTitle' : 'Prikaži broj zahteva za prijateljstvo u naslovu stranice.',
		'ConfGoogleApps' : 'Napravi veze za Google kalendar, pogodne za Google ove aplikacije.',
		'ConfGoogleAppsDomain' : 'Domen',
		'ConfGoogleCalendar' : 'Dodaj veze za dodavanje rođendana i događaja u <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalendar</a>.',
		'ConfGoogleLanguage' : 'Jezik za <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google prevodilac</a>',
		'ConfHideApplicationStories' : 'Sakrij obaveštenja o aplikacijama.',
		'ConfHideEventStories' : 'Sakrij obaveštenja o događajima.',
 		'ConfHideFacebookCountInTitle' : 'Sakrij Fejsbukov broj novih primljenih poruka.',
		'ConfHideFriendStories' : 'Sakrij obaveštenja o prijateljstvima.',
		'ConfHideGroupStories' : 'Sakrij obaveštenja o grupama.',
 		'ConfHideLikeStories' : 'Sakrij obaveštenja o "dopada mi se" stavkama.',
		'ConfHideLinkStories' : 'Sakrij obaveštenja o vezama.',
		'ConfHideNoteStories' : 'Sakrij obaveštenja o zapisima.',
		'ConfHidePhotoStories' : 'Sakrij obaveštenja o fotografijama.',
		'ConfHideProfilePicStories' : 'Sakrij obaveštenja o slikama na profilu.',
		'ConfHideRead' : 'U najnovijim dešavanjima sakrij stavke koje su označene kao pročitane.',
		'ConfHideRelationshipStories' : 'Sakrij obaveštenja o statusima veze.',
		'ConfHideStatusStories' : 'Sakrij promene statusa.',
		'ConfHideVideoStories' : 'Sakrij obaveštenja o video zapisima.',
		'ConfHideWallStories' : 'Sakrij obaveštenja sa zida.',
 		'ConfHomeBeta' : 'Prikaži odeljak sa Fejsbukovim najavama.',
		'ConfHomeChat' : 'Prikaži odeljak sa ćaskanjem.',
		'ConfHomeEvents' : 'Prikaži odeljak sa događajima.',
		'ConfHomeFindFriends' : 'Prikaži "Poveži se sa" odeljak.',
		'ConfHomeLeftAlign' : 'Poravnaj sadržaj početne stranice po levoj strani.',
		'ConfHomeLeftColumn' : 'Prikaži levu kolonu.',
		'ConfHomeLeftColumnFixed' : 'Neka leva kolona bude vidljiva i prilikom pomeranja stranice na dole.',
		'ConfHomeLink' : 'Prikaži vezu za Početnu stranicu na gornjoj traci sa menijima.',
		'ConfHomeNavigation' : 'Prikaži odeljak za navigaciju.',
		'ConfHomePokes' : 'Prikaži "Bockanje" odeljak.',
		'ConfHomeProfile' : 'Prikaži "Profil" odeljk.',
 		'ConfHomeRecommendations' : 'Prikaži preporuke (Osobe koje možda poznaješ, Preporučene stranice itd.).',
		'ConfHomeRequests' : 'Prikaži "Zahtevi" odeljak.',
		'ConfHomeRightColumn' : 'Prikaži desnu kolonu.',
		'ConfHomeStretch' : 'Raširi početnu stranicu na punu širinu prozora pretraživača.',
 		'ConfHomeStretchComments' : 'Raširi komentare na početnoj stranici.',
		'ConfiCalendar' : 'Dodaj veze za preuzimanje <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> datoteke sa svim rođendanima.',
		'ConfImport' : 'Da bise kasnije uvezli svoja podešavanja, zamenite tekst koji sledi sa tekstom koji ste prethodno sačuvali i kliknite "Uvoz".',
		'ConfInboxCountInTitle' : 'Prikaži broj novih poruka u naslovu stranice.',
		'ConfLogoutLink' : 'Dodaj vezu za odjavljivanje na gornju traku sa menijima.',
		'ConfNotificationCountInTitle' : 'Prikaži broj novih obaveštenja u naslovu stranice.',
		'ConfNewTabSearch' : 'Kada pritisnem CTRL + Enter za pretragu, otvori rezultate pretrage u novoj kartici/prozoru.',
		'ConfPageTitle' : 'Ukloni "Facebook |" iz naslova svih stranica.',
		'ConfPhotoPopup' : 'Prikaži veće verzije fotografija prilikom prelaska mišem.',
		'ConfPopupAutoClose' : 'Automatski zatvori uvećane slike.',
		'ConfPopupSmartAutoClose' : 'Ne zatvaraj uvećane slike ako je pokazivač miša na njima.',
		'ConfPopupPosition' : 'Položaj uvećanih slika',
		'ConfProcessInterval' : 'Interval za obradu stranice, u milisekundama (podrazumevano=1000):',
		'ConfProfileLink' : 'Prikaži vezu za Profil na gornju traku sa menijima.',
		'ConfProfilePicPopup' : 'Prikaži veće verzije slika na profilu prilikom prelaska mišem',
		'ConfProtocolLinks' : 'Pretvori nadimke programa za komunikaciju (Google Talk, Windows Live i dr.) sa profila u veze kojima će se započeti ćaskanje.',
		'ConfSectionAbout' : 'O dodatku FFixer',
		'ConfSectionAdvanced' : 'Više opcija',
		'ConfSectionEvents' : 'Rođendani/događaji',
		'ConfSectionImportExport' : 'Uvoz/Izvoz',
		'ConfSectionFeeds' : 'Novosti',
		'ConfSectionHomePage' : 'Početna stranica',
		'ConfSectionLiveFeed' : 'Najnovije',
		'ConfSectionMenu' : 'Meniji/ćaskanje',
		'ConfSectionOther' : 'Ostale opcije',
		'ConfSectionPageTitle' : 'Naslov stranice',
		'ConfSectionPictures' : 'Slike',
		'ConfSectionShortcuts' : 'Prečice sa tastature',
		'ConfSecureLinks' : 'Prisili usmeravanje Fejsbuk veza na HTTPS stranice.',
		'ConfShortcutList' : '<b>Prečice sa tastature</b> (razlikuju se mala i velika slova):<br /><br /><i>Sa bilo koje stranice:</i><br /> <b>A</b> - Albumi/fotografije<br /> <b>B</b> - Spisak dostupnih prijatelja<br /> <b>C</b> - FFixer podešavanja<br /> <b>D</b> - Rođendani<br /> <b>E</b> - Događaji<br /> <b>F</b> - Prijatelji<br /> <b>H</b> - Početna stranica<br /> <b>I</b> - Primljene poruke<br /> <b>K</b> - dodaj zabelešku<br /> <b>L</b> - Označi vezu za odjavu (pritisnite Enter nakon toga za odjavljivanje)<br /> <b>N</b> - Obaveštenja<br /> <b>P</b> - Profil<br /> <b>R</b> - Zahtevi<br /> <b>S</b> - Prelazak na polje za pretragu<br /> <b>T</b> - Prevedi odabrani tekst<br /> <b>?</b> - Prikaži izveštaj o grešci FFixer-a<br /> <b><escape></b> - Zatvori iskačuće prozore koje je napravio FFixer<br /><br /><i>Sa početne stranice (filteri)</i>:<br /> <b>a</b> - Stranice<br /> <b>f</b> - Najnovije<br /> <b>g</b> - Grupe<br /> <b>l</b> - Veze<br /> <b>n</b> - Novosti<br /> <b>p</b> - Fotografije<br /> <b>s</b> ili <b>u</b> - Promene statusa<br /> <b>t</b> - Beleške<br /> <b>v</b> - Video<br /><br /><i>Sa profila</i>:<br /> <b>i</b> - Informacije<br /> <b>p</b> - Fotografije<br /> <b>w</b> - Zid<br /> <b>x</b> - Okviri<br /><br /><i>Sa stranica sa nabrajanjem (prethodna, sledća, itd.)</i><br /> <b><strelica levo></b> - Prethodna<br /> <b><strelica desno></b> - Sledeća<br /> <b><šift> + <strelica levo></b> - Prva (ako je dostupno)<br /> <b><šift> + <strelica desno></b> - Poslednja (ako je dostupno)<br /><br /><i>Prilikom pregledavanja albuma/fotografija:</i><br /> <b>a</b> - Učitaj sve sličice (ako je dostupno)<br /> <b>b</b> - Prikaži velike slike<br /> <b>c</b> - Prikaži komentare<br /> <b>k</b> - Nazad na album<br /> <b>m</b> - Fotografije sa (korisnikom) i sa mnom<br /><br /><i>Pri pregledavanju skorašnjih albuma i postavljenih/označenih fotografija:</i><br /> <b>a</b> ili  <b>r</b> - Skorašnji albumi<br /> <b>m</b> ili  <b>u</b> - Postavljeno preko mobilnog telefona<br /> <b>o</b> - Fotografije na kojima sam ja<br /> <b>p</b> - Moje fotografije<br /> <b>t</b> ili  <b>f</b> - Označeni prijatelji',
		'ConfShortcuts' : 'Omogući prečice sa tastature.',
		'ConfSign' : 'Prikaži korisnikov horoskopski znak na njegovom profilu (ukoliko je naveden pun datum rođenja).',
		'ConfTopBarFixed' : 'Zadrži gornju traku sa menijima na ekranu i prilikom pomeranja stranice na dole.',
		'ConfTopBarHoverOpacity' : 'Prilikom prelaska mišem',
		'ConfTopBarOpacity' : 'Providnost Gornje trake sa menijima',
		'ConfUpdates' : 'Svakodnevno proveravaj Userscripts.org za nadogradnje FFixer-a. Ili <a href="#" id="fbfUpdateLink" onclick="return false;">proveri sada</a>.',
		'DownloadVideo' : 'Preuzmi video',
		'ExportICalendarFile' : 'Izvezi iCalendar datoteku',
		'ExportICalendarFileWarning' : '(Ovo može da potraje ako imate mnogo prijatelja)',
		'FacebookFixerConflict' : 'FFixer se sada zove FFixer. Zbog promene imena moraćete ručno da uklonite FFixer iz svog pregledača da ne bi došlo do ometanja između ove dve skripte. Ako niste sigurni kako da uklonite skriptu, <a %s>kliknite ovde za uputstvo</a>.',
		'fullAlbumLoaded' : 'ceo album je učitan',
		'Import' : 'Uvoz',
		'ImportConfirm' : 'Da li ste sigurni da želite da uvezete ova podešavanja?\nVaša trenutna podešavanja će biti poništena.',
		'ImportFailure' : 'Došlo je do greške prilikom uvoza vaših podešavanja.',
		'ImportSuccess' : 'Uvoz je završen. Da li želite da osvežite stranicu?',
		'Left' : 'Levo',
		'LoadingAllPhotos' : 'Učitavanje svih fotografija...',
		'loadingFullAlbum' : 'učitavanje svih albuma...',
		'LoadingPic' : 'Učitavanje slike...',
		'LoadPhotosWarning' : 'Učitavanje svih fotografija može da potraje neko vreme',
		'Months' : new Array('Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'),
		'ProtocolSkype' : 'Pozovi korisnika %s putem programa Skype',
		'ProtocolMSN' : 'Ćaskaj sa korisnikom %s putem programa Windows Live',
		'ProtocolYahoo' : 'Ćaskaj sa korisnikom %s putem programa Yahoo Messenger',
		'ProtocolGoogle' : 'Ćaskaj sa korisnikom %s putem programa Google Talk',
		'ReloadErrorPage' : 'Kliknite da pokušate ponovo, ili sačekajte 5 sekundi',
		'Refresh' : 'Osveži',
		'Remove' : 'Ukloni',
		'Right' : 'Desno',
		'ShowBigPictures' : 'Prikaži velike slike',
		'Signs' : new Array('Jarac','Vodolija','Ribe','Ovan','Bik','Blizanci','Rak','Lav','Devica','Vaga','Škorpija','Strelac'),
		'today' : 'danas',
		'Translators' : 'Prevodioci',
		'UpdateAvailable1' : 'Dostupne su nadogradnje za FFixer',
		'UpdateAvailable2' : 'Želite li sada da nadogradite?',
		'UpdateHomepage' : 'Idi na početnu stranicu',
		'UpdateInstall' : 'Instaliraj odmah',
		'UpdateTomorrow' : 'Podseti me sutra',
 		'ViewAlbumComments' : 'Prikaži komentare albuma',
		'yearsOld' : '%s godina'
	},

	// Danish - Contributed by Mads Jensen (20100210)
	da : {
		'_language' : 'Danish',
		'AddToCalendar' : 'Tilføj til kalender',
		'AddToGoogleCalendar' : 'Tilføj til Google Calendar',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle billeder er hentet',
		'Automatic' : 'Automatisk',
		'Birthday' : '%s\'s fødselsdag',
		'BookmarkAdd' : 'Tilføj nyt bogmærke',
		'BookmarkConfirmRemoval' : 'Er du sikker på du vil fjerne bogmærket "%s"?',
		'BookmarkDoesNotExist' : 'Denne side har intet bogmærke.\n\nGå til siden du vil fjerne og prøv igen.',
		'BookmarkExists' : 'Der er allerede et bogmærke til denne side.\n\nGå til siden du vil tilføje et bogmærke for og prøv igen.',
		'BookmarkNamePrompt' : 'Skriv et navn til dette bogmærke:\n%s',
		'BookmarkRemove' : 'Fjern bogmærke',
		'CreatingFile' : 'Opret fil',
		'Close' : 'Luk',
		'ConfigureFacebookFixer' : 'Konfigurér FFixer',
		'ConfigureInstructions' : 'Alle ændringer bliver gemt med det samme, men nogle ændringer vil ikke vises i allerede åbne faneblade.',
		'ConfAge' : 'Vis folks alder på deres profil (hvis de har oplyst fødselsdato).',
		'ConfAutoBigAlbumPictures' : 'Vis automatisk større album billeder, når siden åbnes.',
		'ConfAutoLoadFullAlbum' : 'Hent automatisk miniaturer til alle billeder i et album, på en enkelt side.',
		'ConfAutoLoadTaggedPhotos' : 'Hent automatisk miniaturer til alle taggede billeder i et album, på en enkelt side (Billeder fanebladet på folks profil).',
		'ConfAutoReadMore' : 'Tryk automatisk på  "Vis mere" links.',
		'ConfBigAlbumPictures' : 'Tilføj et link på album sider, til at vise større udgaver af alle billeder på den side.',
		'ConfBookmarks' : 'Tilføj "Bogmærker" til topmenuen.',
		'ConfBottomBarHoverOpacity' : 'Når musen er over',
		'ConfBottomBarOpacity' : 'Gennemsigtighed af menuen nederst på siden',
		'ConfCalendarBirthDate' : 'Inkludér personens fødselsdag i begivenhedens detaljer.',
		'ConfCalendarFullName' : 'Brug personens fulde navn som titlen til fødselsdage (i stedet for kun fornavn).',
		'ConfChatDifferentiate' : 'Brug fed og kursiv for at skelne mellem tilgængelige og optagede venner.',
		'ConfChatHideIdle' : 'Skjul optagede venner.',
		'ConfDelayPopupPics' : 'Tilføj en kort pause før billeder popper op.',
		'ConfDelayPopupPicsTimeout' : 'Pause før billeder popper op, i millisekunder (standard er 500)',
		'ConfDownloadVideo' : 'Tilføj et link til at hente videoer fra "Video" sider. (Du får sikkert brug for en <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV afspiller</a>)',
		'ConfErrorPageReload' : 'Genindlæs applikationsfejl sider efter 5 sekunder.',
		'ConfExternalPopup' : 'Vis eksterne billeder i fuld størrelse. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Sprog i FFixer',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsstempler (f.eks. "3 timer sider").',
		'ConfFBFTimestamps' : 'Tilføj FFixer tidsstempler efter Facebook tidsstempler (f.eks. "11:45").',
		'ConfFBFTimestamps24' : 'Vis FFixer tidsstempler i 24 timers format.',
		'ConfFriendRequestCountInTitle' : 'Vis antallet af anmodninger om venskab i siden titel.',
		'ConfGoogleApps' : 'Lav Google Calendar links kompatible med Google Apps.',
		'ConfGoogleAppsDomain' : 'Domæne',
		'ConfGoogleCalendar' : 'Tilføj links til at tilføje fødselsdage og begivenheder til <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Sprog i <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Skjul applikations beskeder.',
		'ConfHideEventStories' : 'Skjul begivenhed beskeder.',
		'ConfHideFanStories' : 'Skjul fan beskeder.',
		'ConfHideFriendStories' : 'Skjul ven beskeder.',
		'ConfHideGroupStories' : 'Skjul gruppe beskeder.',
		'ConfHideLinkStories' : 'Skjul link beskeder.',
		'ConfHidePhotoStories' : 'Skjul billede beskeder.',
		'ConfHideProfilePicStories' : 'Skjul profilbillede beskeder.',
		'ConfHideRead' : 'Skjul beskeder der er markeret som læst.',
		'ConfHideRelationshipStories' : 'Skjul parforholds beskeder.',
		'ConfHideStatusStories' : 'Skjul status beskeder.',
		'ConfHideVideoStories' : 'Skjul video beskeder.',
		'ConfHideWallStories' : 'Skjul væg beskeder.',
		'ConfHomeChat' : 'Vis Chat sektionen.',
		'ConfHomeEvents' : 'Vis Begivenheder sektionen.',
		'ConfHomeFindFriends' : 'Vis Skab forbindelser til venner sektionen.',
		'ConfHomeLeftAlign' : 'Venstrestil indholdet på forsiden.',
		'ConfHomeLeftColumn' : 'Vis venstre kolonne.',
		'ConfHomeLeftColumnFixed' : 'Hold venstre kolonne synlig, selv efter der er scrollet ned på siden.',
		'ConfHomePeopleYouMayKnow' : 'Vis Forslag sektionen.',
		'ConfHomeNavigation' : 'Vis Navigation sektionen.',
		'ConfHomePokes' : 'Vis Prik sektionen.',
		'ConfHomeProfile' : 'Vis Profil sektionen.',
		'ConfHomeRequests' : 'Vis Anmodninger sektionen.',
		'ConfHomeRightColumn' : 'Vis højre kolonne.',
		'ConfHomeStretch' : 'Stræk forsiden til browser vinduets fulde bredde.',
		'ConfiCalendar' : 'Tilføj links til at hente en <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fødselsdage.',
		'ConfInboxCountInTitle' : 'Vis antallet af nye beskeder i indbakken, i sidens titel.',
		'ConfLogoutLink' : 'Tilføj et "Log ud" link til top menuen.',
		'ConfNotificationCountInTitle' : 'Vis antallet af nye notifikationer i sidens titel.',
		'ConfNewTabSearch' : 'Tving søgeresultater til at åbne i et nyt vindue, når der trykkes CTRL + Enter ved søgning.',
		'ConfPageTitle' : 'Fjern "Facebook |" fra titlen på alle sider.',
		'ConfPhotoPopup' : 'Popop større udgaver af billeder når musen holdes over.',
		'ConfPopupAutoClose' : 'Luk popop billeder automatisk.',
		'ConfPopupSmartAutoClose' : 'Stop popop billeder fra at lukke automatisk hvis musen er over.',
		'ConfPopupPosition' : 'Position for popop billeder',
		'ConfProcessInterval' : 'Interval mellem håndtering af siden, i millisekunder (standard er 1000)',
		'ConfProfilePicPopup' : 'Popop større udgaver af profilbilleder når musen holdes over',
		'ConfProtocolLinks' : 'Lav IMs på profiler til links der starter en samtale (Google Talk, Windows Live o.s.v.).',
		'ConfSectionAbout' : 'Omkring FFixer',
		'ConfSectionAdvanced' : 'Avanceret',
		'ConfSectionEvents' : 'Fødselsdage/Begivenheder',
		'ConfSectionFeeds' : 'Beskeder',
		'ConfSectionHomePage' : 'Forside',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menu/Chat',
		'ConfSectionOther' : 'Andre indstillinger',
		'ConfSectionPageTitle' : 'Side titel',
		'ConfSectionPictures' : 'Billeder',
		'ConfSectionShortcuts' : 'Tastatur genveje',
		'ConfSecureLinks' : 'Tving Facebook links til at bruge HTTPS.',
		'ConfShortcutList' : '<b>Tastatur genveje</b> (forskel på store og små bogstaver):<br /><br /><i>Fra enhver side:</i><br />&nbsp;<b>A</b> - Album/billeder<br />&nbsp;<b>B</b> - Skift venne liste (online venner)<br />&nbsp;<b>C</b> - FFixer konfiguration<br />&nbsp;<b>D</b> - Fødselsdage<br />&nbsp;<b>E</b> - Begivenheder<br />&nbsp;<b>F</b> - Venner<br />&nbsp;<b>H</b> - Forside<br />&nbsp;<b>I</b> - Indbakke<br />&nbsp;<b>K</b> - Tilføj bogmærke<br />&nbsp;<b>L</b> - Vælg Log ud linket (tryk Enter efterfølgende for at logge ud)<br />&nbsp;<b>N</b> - Notifikationer<br />&nbsp;<b>P</b> - Din profil<br />&nbsp;<b>R</b> - Anmodninger<br />&nbsp;<b>S</b> - Hop til søgefeltet<br />&nbsp;<b>T</b> - Oversæt valgte tekst<br />&nbsp;<b>?</b> - Vis FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Luk popops fra FFixer<br /><br /><i>Fra forsiden (filtre)</i>:<br />&nbsp;<b>a</b> - Sider<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupper<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - Nyheder<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>s</b> eller <b>u</b> - Status opdateringer<br />&nbsp;<b>t</b> - Noter<br />&nbsp;<b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>w</b> - Væg<br />&nbsp;<b>x</b> - Bokse<br /><br /><i>Fra sider med bladrefunktion (frem, tilbage o.s.v.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Forrige<br />&nbsp;<b>&lt;right arrow&gt;</b> - Næste<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - Første (når muligt)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Sidste (når muligt)<br /><br /><i>Under visning af album/billeder:</i><br />&nbsp;<b>a</b> - Hent alle miniaturer (når muligt)<br />&nbsp;<b>b</b> - Vis store billeder<br />&nbsp;<b>c</b> - Se kommentarer<br />&nbsp;<b>k</b> - Tilbage til album<br />&nbsp;<b>m</b> - Billeder af (person) og mig<br /><br /><i>Under visning af nyeste album og uploadede/taggede billeder:</i><br />&nbsp;<b>a</b> eller <b>r</b> - Nyeste Album<br />&nbsp;<b>m</b> eller <b>u</b> - Telefon uploads<br />&nbsp;<b>o</b> - Billeder af mig<br />&nbsp;<b>p</b> - Mine billeder<br />&nbsp;<b>t</b> eller <b>f</b> - Tagged venner',
		'ConfShortcuts' : 'Slå tastaturgenveje til.',
		'ConfSign' : 'Vis folks stjernetegn på deres profil (hvis de har oplyst en fødsesdato).',
		'ConfTopBarFixed' : 'Hold topmenuen synlig på siden, selv efter der er scrollet ned.',
		'ConfTopBarHoverOpacity' : 'Når musen er over',
		'ConfTopBarOpacity' : 'Gennemsigtighed af topmenu linien',
		'ConfUpdates' : 'Undersøg Userscripts.org dagligt for opdateringer til FFixer. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">undersøg nu</a>.',
		'DownloadVideo' : 'Hent video',
		'ExportICalendarFile' : 'Eksportér iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil tage lang tid, hvis du har mange venner)',
		'FacebookFixerConflict' : 'FFixer vil fremover hedde FFixer. På grund af navneskiftet, skal du manuelt afinstallere FFixer fra dine browsere, da de to scripts ellers vil komme i konflikt med hinanden. Hvis du er usikker på hvordan man afinstallerer et Userscript, så <a %s>tryk her for instruktioner</a>.',
		'fullAlbumLoaded' : 'Hele albummet hentet',
		'Left' : 'Venstre',
		'ListeningRestarted' : 'FFixer lytter efter ændringer igen.',
		'ListeningStopped' : 'FFixer er stoppet med at lytte efter ændringer.\nTryk L (SHIFT + l) for at starte igen',
		'LoadingAllPhotos' : 'Henter alla billeder...',
		'loadingFullAlbum' : 'henter helt album...',
		'LoadingPic' : 'Henter billede...',
		'LoadPhotosWarning' : 'Indhentning af alle billeder tager mugligvis lang tid',
		'Months' : new Array('Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'),
		'ProtocolSkype' : 'Ring til %s med Skype',
		'ProtocolMSN' : 'Chat med %s på Windows Live',
		'ProtocolYahoo' : 'Chat med %s på Yahoo Messenger',
		'ProtocolGoogle' : 'Chat med %s på Google Talk',
		'ReloadErrorPage' : 'Tryk for at prøve igen eller vent 5 sekunder',
		'Refresh' : 'Genindlæs',
		'Remove' : 'Fjern',
		'Right' : 'Højre',
		'ShowBigPictures' : 'Vis store billeder',
		'Signs' : new Array('Stenbukken','Vandbæreren','Fiskene','Vædderen','Tyren','Tvillingerne','Krebsen','Løven','Jomfruen','Vægten','Skorpionen','Skytten'),
		'today' : 'i dag',
		'UpdateAvailable1' : 'En opdatering er tilgængelig til FFixer',
		'UpdateAvailable2' : 'Vil du opdatere nu?',
		'UpdateHomepage' : 'Gå til hjemmesiden',
		'UpdateInstall' : 'Installér nu',
		'UpdateTomorrow' : 'Påmind mig i morgen',
		'yearsOld' : '%s år gammel'
	},

	// Czech - Contributed by Caken (20100823)
	cs : {
		'_language' : 'Czech',
		'AddToCalendar' : 'Přidat do kalendáře',
		'AddToGoogleCalendar' : 'Přidat do Google kalendáře',
		'all' : 'vše',
		'All' : 'Vše',
		'AllPhotosLoaded' : 'Všechny fotografie načtené',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narozeniny %s',
		'BookmarkAdd' : 'Přidej záložku',
		'BookmarkExists' : 'Tato stránka už je v záložkách.',
		'BookmarkNamePrompt' : 'Vložte jméno této záložky:\n%s',
		'BookmarksConfirmRemoval' : 'Jste si jistí, že chcete odstranit tuto záložku?',
		'BookmarksManage' : 'Spravuj záložky',
		'BookmarksRemoveSelected' : 'Odstraň vybrané záložky',
		'Bookmarks' : 'Záložky',
		'BrowserUnsupported' : 'Váš prohlížeč nepodporuje tento program.',
		'CreatingFile' : 'Vytvoření souboru',
		'Close' : 'Zavřít',
		'ConfigureFacebookFixer' : 'Nastavení - FFixer',
		'ConfigureInstructions' : 'Všechny změny jsou ukládány okamžitě, ale některé se nemusí projevit na již otevřených kartách.',
		'ConfAge' : 'Zobrazit věk lidí v jejich profilech (pokud poskytli celý datum narození)',
		'ConfAlbumComments' : 'Přidá odkaz na stránku alba a ukáže všechny komentáře k danému albu.',
		'ConfApplicationWhitelist' : 'Seznam povolených aplikací - Vložte ID aplikace, kterou chcete chránit před skrytím. ID oddělujte mezerami.',
		'ConfAutoBigAlbumPictures' : 'Automaticky při otevření stránky zobrazit větší obrázky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky načítat miniatury všech obrázků v albumu na jedné stránce',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky načítat miniatury všech fotograficí s popisem na jedné stránce (karta Fotky v profilech lidí)',
		'ConfAutoReadMore' : 'Automaticky kliknout na odkazy &quot;číst dále&quot;',
		'ConfBigAlbumPictures' : 'Přidat odkaz na stránkách albumu na zobrazení větších verzí všech obrázků na této straně',
		'ConfBookmarks' : 'Přijde menu záložek do vrchní nabídky.',
		'ConfBottomBarHoverOpacity' : 'Při najetí myší',
		'ConfBottomBarOpacity' : 'Průhlednost spodního panelu s nabídkou',
		'ConfCalendarBirthDate' : 'Zahrnout narozeniny osoby do podrobnosti událostí',
		'ConfCalendarFullName' : 'Použít jméno celé jméno osoby jako název narozenin (namístno křestního jména)',
		'ConfChatDifferentiate' : 'Použít tučné písmo a kurzívu na rozlišení připojených a nečinných přátel',
		'ConfChatHideIdle' : 'Skrýt nečinné přátele',
		'ConfDelayPopupPics' : 'Vyčkat 0,5 sekundy před načtením obrázku v kontextovém okně',
		'ConfDelayPopupPicsTimeout' : 'Zpoždění před zobrazením obrázku v kontextovém okně v milisekundách (defaultně=500):',
		'ConfDownloadVideo' : 'Přidat odkaz na převzetí videí ze stránek s videem (možná potřeba <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV přehrávač</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundách znova načíst chybové stránky aplikácí',
		'ConfExport' : 'Pro exportování vašeho nastavení, zkopírujte následující text a uložte ho do souboru.',
		'ConfExternalPopup' : 'Externí obrázky plné velikosti v kontextovém okně <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jazyk pro FFixer',
		'ConfFacebookTimestamps' : 'Zobrazit časové značky Facebooku (t. j. "před 3 hodinami")',
		'ConfFBFTimestamps' : 'Přidat časové značky skriptu FFixer za časové značky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobrazit časové značny skriptu FFixer v 24-hodinovém formátě',
		'ConfFriendRequestCountInTitle' : 'Zobraz počet nových žádostí o přátelství v titulku stránky.',
		'ConfGoogleApps' : 'Vytvořit odkazy pro Google Calendar kompatibilní s Google Apps',
		'ConfGoogleAppsDomain' : 'Doména',
		'ConfGoogleCalendar' : 'Přidat odkazy na zařazení narozenin a událostí do aplikace <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pro <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>.',
		'ConfHideApplicationStories' : 'Skrýt v aktualitách příspěvky o aplikacích.',
		'ConfHideEventStories': 'Skrýt v aktualitách příspěvky z událostí.',
		'ConfHideFacebookCountInTitle' : 'Skrýt počet nových zpráv.',
		'ConfHideFriendStories': 'Skrýt v aktualitách příspěvky přátel.',
		'ConfHideGroupStories': 'Skrýt v aktualitách příspěvky o skupinách.',
		'ConfHideLikeStories' : 'Skrýt příspěvky uživateli xxx se líbí.',
		'ConfHideLinkStories' : 'Skrýt příspěvky o odkazech.',
		'ConfHideNoteStories' : 'Skrýt příspěvky o poznámkách.',
		'ConfHidePhotoStories' : 'Skrýt příspěvky o fotkách.',
		'ConfHideProfilePicStories' : 'Skrýt příspěvky o profilových fotkách.',
		'ConfHideRead' : 'Skrýt v aktualitách položky, které byly označené jako přečtené.',
		'ConfHideRelationshipStories' : 'Skrýt v aktualitách příspěvky o vztahu.',
		'ConfHideStatusStories' : 'Skrýt příspěvky se statusy.',
		'ConfHideVideoStories' : 'Skrýt příspěvky o videích.',
		'ConfHideWallStories' : 'Skryj příspěvky na zdi.',
		'ConfHomeBeta' : 'Zobraz Beta Tester sekci.',
		'ConfHomeChat' : 'Zobrazit část chat.',
		'ConfHomeEvents' : 'Zobrazit část Události',
		'ConfHomeFindFriends' : 'Zobrazit část Spojte se s přáteli',
		'ConfHomeLeftAlign' : 'Zarovat obsah stránky Domů doleva',
		'ConfHomeLeftColumn' : 'Zobraz levý sloupec.',
		'ConfHomeLeftColumnFixed' : 'Nech levý sloupec viditelný i při scrolování dolů.',
		'ConfHomeLink' : 'Zobraz ve vrchní nabídce odkaz na úvodní stránku.',
		'ConfHomeNavigation' : 'Zobrazit část navigace.',
		'ConfHomePokes' : 'Zobrazit část Šťouchnutí',
		'ConfHomeProfile' : 'Zobraz část Profil.',
		'ConfHomeRecommendations' : 'Zobraz doporučení (Mohli byste znát, doporučené stránky, atd.).',
		'ConfHomeRequests' : 'Zobrazit část Žádosti',
		'ConfHomeRightColumn' : 'Zobrazit pravý sloupec',
		'ConfHomeStretch' : 'Roztáhnout úvodní stránku na šířku okna prohlížeče',
		'ConfHomeStretchComments' : 'Roztáhnout komentáře na úvodní stránce.',
		'ConfiCalendar' : 'Přidat odkazy na převzetí souboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> se všemi narozeninami',
		'ConfImport' : 'Pro importování nastavení přepište následující text předem exportovaným a poté klikněte na "Import".',
		'ConfInboxCountInTitle' : 'Zobrazit v názvu stránky počet nepřečtených zpráv',
		'ConfLogoutLink' : 'Přidej odhlašovací odkaz do vrchní nabídky.',
		'ConfNotificationCountInTitle' : 'Zobraz počet nových upozornění v titulku stránky.',
		'ConfNewTabSearch' : 'Při vyhledávání otevřít stisknutím Ctrl+Enter výsledky hledání na nové kartě/v novém okně',
		'ConfPageTitle' : 'Odstranit "Facebook |" z názvu všech stránek',
		'ConfPhotoPopup' : 'Větší verze fotek v kontextovém menu po najetí myší',
		'ConfPopupAutoClose' : 'Automaticky zavírat kontextová okna s obrázkem',
		'ConfPopupSmartAutoClose' : 'Zabránit automatickému uzavření kontextového okna s obrázkem',
		'ConfPopupPosition' : 'Umístění kontextového okna s obrázkem',
		'ConfProcessInterval' : 'Interval zpracování stránky v milisekundách (defaultně=1000):',
		'ConfProfileLink' : 'Zobraz ve vrchní nabídce odkaz na profil.',
		'ConfProfilePicPopup' : 'Větší verze profilových fotek v kontextovém okně po najetí myší',
		'ConfProtocolLinks' : 'Zmenit ID pro okamžitou správu na odkazy spouštějící konverzaci (Google Talk, Windows Live atd.)',
		'ConfSectionAbout' : 'O FFixeru',
		'ConfSectionAdvanced' : 'Upřesnění',
		'ConfSectionEvents' : 'Narozeniny/Události',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Příspěvky',
		'ConfSectionHomePage' : 'Stránka Doma',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Nabídky/Chat',
		'ConfSectionOther' : 'Další možnosti',
		'ConfSectionPageTitle' : 'Titulek stránky',
		'ConfSectionPictures' : 'Obrázky',
		'ConfSectionShortcuts' : 'Klávesové zkratky',
		'ConfSecureLinks' : 'Přesměrovat odkazy Facebooku na stránky HTTPS',
		'ConfShortcutList' : '<b>Klávesové zkratky</b> (rozlišují se malá/velká písmena):<br /><br /><i>Z libovolné stránky:</i><br />&nbsp;<b>A</b> - Alba/fotky<br />&nbsp;<b>B</b> - Přepnout seznam přátel (online přátel)<br />&nbsp;<b>C</b> - Konfigurace skriptu FFixer<br />&nbsp;<b>D</b> - Narozeniny<br />&nbsp;<b>E</b> - Události<br />&nbsp;<b>F</b> - Přátelé<br />&nbsp;<b>H</b> - Domů<br />&nbsp;<b>I</b> - Přijaté zprávy<br />&nbsp;<b>K</b> - Přidej záložku<br />&nbsp;<b>L</b> - Odhlášení (po odhlášení stiskněte Enter)<br />&nbsp;<b>N</b> - Upozornění<br />&nbsp;<b>P</b> - Váš profil<br />&nbsp;<b>R</b> - Žádosti<br />&nbsp;<b>S</b> - Přeskočit na pole Hledat<br />&nbsp;<b>T</b> - Přeložit vybraný text<br />&nbsp;<b>?</b> - Zobrazit informace o ladění skriptu FFixer<br />&nbsp;<b>&lt;escape&gt;</b> - Zavřít kontextová okna vytvořené skriptem FFixer<br /><br /><i>Ze stránky Domů (filtry)</i>:<br />&nbsp;<b>a</b> - Stránky<br />&nbsp;<b>f</b> - Aktuality<br />&nbsp;<b>g</b> - Skupiny<br />&nbsp;<b>l</b> - Odkazy<br />&nbsp;<b>n</b> - Novinky<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>s</b> nebo <b>u</b> - Co dělají ostatní<br />&nbsp;<b>t</b> - Poznámky<br />&nbsp;<b>v</b> - Videa<br /><br /><i>Z profilů</i>:<br />&nbsp;<b>i</b> - Informace<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>w</b> - Zeď<br />&nbsp;<b>x</b> - Kontejner<br /><br /><i>Ze stránek s navigací (dozadu, dopredu atd.)</i><br />&nbsp;<b>&lt;levá šipka&gt;</b> - Předchozí<br />&nbsp;<b>&lt;pravá šipka&gt;</b> - Následující<br />&nbsp;<b>&lt;shift&gt; + &lt;levá šipka&gt;</b> - První (pokud je dispozici)<br />&nbsp;<b>&lt;shift&gt; + &lt;pravá šipka&gt;</b> - Poslední (pokud je k dispozici)<br /><br /><i>Při prohlížení alb/fotek:</i><br />&nbsp;<b>a</b> - Načítat všechny miniatury (pokud je k dispozici)<br />&nbsp;<b>b</b> - Zobrazit velké obrázky<br />&nbsp;<b>c</b> - Zobrazit komentáře<br />&nbsp;<b>k</b> - Zpět do alba<br />&nbsp;<b>m</b> - Fotky (osoby) a moje<br /><br /><i>Při prohlížení nejnovějších alb a nahraných/označených fotek:</i><br />&nbsp;<b>a</b> nebo &nbsp;<b>r</b> - Nejnovější alba<br />&nbsp;<b>m</b> nebo &nbsp;<b>u</b> - Nahrané z mobilu<br />&nbsp;<b>o</b> - Fotky mé osoby<br />&nbsp;<b>p</b> - Mé fotky<br />&nbsp;<b>t</b> nebo &nbsp;<b>f</b> - Označení přátelé',
		'ConfShortcuts' : 'Povolit klávesové zkratky',
		'ConfSign' : 'Zobrazit znamení lidí v jejich profilu (pokud uvedli svůj datum narození)',
		'ConfTopBarFixed' : 'Vždy zobrazit vrchní panel s nabídkou - i při posouvání stránky',
		'ConfTopBarHoverOpacity' : 'Při najetí myší',
		'ConfTopBarOpacity' : 'Průhlednost vrchního panelu s nabídkou',
		'ConfUpdates' : 'Denně na Userscripts.org ověřovat aktualizace pro FFixer, případně <a href="#" id="fbfUpdateLink" onclick="return false;">zkontrolovat nyní</a>.',
		'DownloadVideo' : 'Stáhnout video',
		'ExportICalendarFile' : 'Exportovat soubor iCalendar',
		'ExportICalendarFileWarning' : '(Pokud máte mnoho přátel, může to chvíli trvat.)',
		'FacebookFixerConflict' : 'Facebook Fifex je nyní znám jako FFixer.<br /><br />Protože se změnilo jméno, musíte manuálně odinstalovat Facebook Fixer z vašeho prohlížeče.<br /><br />Pokud si nevíte jak na to <a %s>pokračujte zde</a>.',
		'fullAlbumLoaded' : 'celý album je načtený',
		'Import' : 'Import',
		'ImportConfirm' : 'Opravdu chcete importovat toto nastavení?\nStávající nastavení bude ztraceno.',
		'ImportFailure' : 'Při importování nastavení došlo k chybě.',
		'ImportSuccess' : 'Import kompletní. Chcete aktualizovat stránku?',
		'Left' : 'Vlevo',
		'LoadingAllPhotos' : 'Načítají sa všechny fotky...',
		'loadingFullAlbum' : 'Načítá se celý album...',
		'LoadingPic' : 'Načítá se obrázek...',
		'LoadPhotosWarning' : 'Načítání všech fotek může chvíli trvat',
		'Months' : new Array('Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'),
		'ProtocolSkype' : 'Volat %s pomocí Skype',
		'ProtocolMSN' : 'Chatovat s %s pomocí Windows Live',
		'ProtocolYahoo' : 'Chatovat s %s pomocí Yahoo Messenger',
		'ProtocolGoogle' : 'Chatovat s %s pomocí Google Talk',
		'ReloadErrorPage' : 'Klikněte na Zkusit znovu nebo vyčkejte 5 sekund',
		'Refresh' : 'Obnovit',
		'Remove' : 'Odstranit',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobrazit velké obrázky',
		'Signs' : new Array('Kozoroh','Vodnář','Ryba','Beran','Býk','Blíženci','Rak','Lev','Panna','Váhy','Štír','Střelec'),
		'today' : 'dnes',
		'Translators' : 'Překladatelé',
		'UpdateAvailable1' : 'K dispozici je aktualizace skriptu FFixer.',
		'UpdateAvailable2' : 'Chcete aktualizovat nyní?',
		'UpdateHomepage' : 'Přejít na domovskou stránku',
		'UpdateInstall' : 'Nainstalovat',
		'UpdateTomorrow' : 'Připomenout zítra',
		'ViewAlbumComments' : 'Ukaž komentáře k albu',
		'yearsOld' : '%s let'
	},
	
	// Macedonian - Contributed by Goce Manevski (20100628)
	mk : {
		'_language' : 'Macedonian',
		'AddToCalendar' : 'Додади во Калентар',
		'AddToGoogleCalendar' : 'Додади во Google Калентар',
		'all' : 'сите',
		'All' : 'Сите',
		'AllPhotosLoaded' : 'Сите фотографии се вчитани',
		'Automatic' : 'Автоматски',
		'Birthday' : '%s\'s Роденден',
		'BookmarkAdd' : 'ДОдади нов обележувач',
		'BookmarkConfirmRemoval' : 'Дали си сигурен дека сакаш да избришеш обележувач "%s"?',
		'BookmarkDoesNotExist' : 'This page has not been bookmarked.\n\nGo to the page you want removed and try again.',
		'BookmarkExists' : 'Веќе има обележувач за оваа страница.\n\nОди до страницата што сакаш да ја обележиш и обиди се повторно.',
		'BookmarkNamePrompt' : 'Внеси име за овој обележувач:\n%s',
		'BookmarkRemove' : 'Избриши обележувач',
		'Bookmarks' : 'Обележувачи',
		'BrowserUnsupported' : 'Твојот пребарувач не ја поддржува опцијата.',
		'CreatingFile' : 'Креирање Датотека',
		'Close' : 'Затвори',
		'ConfigureFacebookFixer' : 'Конфигурирај го FFixer',
		'ConfigureInstructions' : 'Сите промени се веднаш зачувани, но некои промени нема да работат во веќе отворените табови.',
		'ConfAge' : 'Покажи ги годините на луѓе\-то на нивните профили (ако го имаат објавено целиот датум на раѓање).',
		'ConfApplicationWhitelist' : 'Апликациска белалиста - Внеси сметки од апликациите за да ги покажеш ако биле скриени. Раздели ги сметките со празно место.',
		'ConfAutoBigAlbumPictures' : 'Автоматски прикажувај големи албум слики кога ќе се отвори страницата.',
		'ConfAutoLoadFullAlbum' : 'Автоматски вчитувај мали сликички за сите слики во албумот на една страница.',
		'ConfAutoLoadTaggedPhotos' : 'Автоматски вчитувај мали сликички за сите обележани слики на една страница (Таб од слики на профилите на луѓе\-то).',
		'ConfAutoReadMore' : 'Автоматски кликни на "прочитај повеќе" линковите.',
		'ConfBigAlbumPictures' : 'Додади линк на албум страниците за да се покаже голема верзија на сите фотографии на таа страница.',
		'ConfBookmarks' : 'Додади подмени на горното топ мени.',
		'ConfBottomBarHoverOpacity' : 'На обележување со глувчето',
		'ConfBottomBarOpacity' : 'Проѕирност на долниот мени бар',
		'ConfCalendarBirthDate' : 'Вклучи го роденден\-от на лицето во детали за настапот.',
		'ConfCalendarFullName' : 'Користи го целото име на човек\-от како наслов за родендени (наместо само име).',
		'ConfChatDifferentiate' : 'Користи здебелено и искосено за разлика повеѓу достапните и отсутните контакти.',
		'ConfChatHideIdle' : 'Сокриј ги отсутните контакти.',
		'ConfDelayPopupPics' : 'Додади кратко задоцнување пред покажување скокачки фотографии.',
		'ConfDelayPopupPicsTimeout' : 'Задоцнување пред покажување скокачки фотографии, во милисекунди (стандард=500):',
		'ConfDownloadVideo' : 'Додади линк за превземања на видеата од видео страниците. (Може ќе ти треба <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Автоматски повторно вчитувај ги апликациите на страниците со грешки по 5 секунди.',
		'ConfExport' : 'За да ги изнесеш подесувањата, копирај го текстот предходно и зачувај го во датотека.',
		'ConfExternalPopup' : 'Скокачки целосни верзии на надворешни фотографии. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Јазик за FFixer',
		'ConfFacebookTimestamps' : 'Прикажи Facebook маркер за времето (eg. "3 часа старо").',
		'ConfFBFTimestamps' : 'Додади FFixer маркер за времето по Facebook маркерот за време (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Прикажи FFixer маркер за време во 24-часовен формат.',
		'ConfFriendRequestCountInTitle' : 'Прикажи број од нови барања за пријатели на насловот на страницата.',
		'ConfGoogleApps' : 'Креирај Google Календар линкови компатибилни со Google Апликации.',
		'ConfGoogleAppsDomain' : 'Домен',
		'ConfGoogleCalendar' : 'Дидаду линкови за да додадеш роденден и настани во <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Јазик за <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Сокриј ги приказните за апликациите.',
		'ConfHideEventStories' : 'Сокриј ги приказните за настаните.',
		'ConfHideFriendStories' : 'Сокриј ги приказните за пријателите.',
		'ConfHideGroupStories' : 'Сокриј ги приказните за групите.',
		'ConfHideLikeStories' : 'Сокриј ги приказните за "ми се допаѓа".',
		'ConfHideLinkStories' : 'Сокриј ги приказните за линковите.',
		'ConfHideNoteStories' : 'Сокриј ги приказните за белешките.',
		'ConfHidePhotoStories' : 'Сокриј ги приказните за фотографиите.',
		'ConfHideProfilePicStories' : 'Сокриј ги приказните за профил фотографиите.',
		'ConfHideRead' : 'Сокриј работи во новостите одкако ќе бидат обележани за прочитаните.',
		'ConfHideRelationshipStories' : 'Сокриј ги приказните за статус-от за врска.',
		'ConfHideStatusStories' : 'Сокриј ги приказните за статусите.',
		'ConfHideVideoStories' : 'Сокриј ги приказните за видеата.',
		'ConfHideWallStories' : 'Сокриј ги приказните за ѕидот.',
		'ConfHomeChat' : 'Покажи Разговор секција.',
		'ConfHomeEvents' : 'Покажи Настани секција.',
		'ConfHomeFindFriends' : 'Покажи Поврзан со пријатели секција.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeLeftColumn' : 'Покажи ја левата колона.',
		'ConfHomeLeftColumnFixed' : 'Задржи ја левата колона видлива, по лизгањето надоле.',
		'ConfHomeLink' : 'Покажи Почетна линк во топ мени барот.',
		'ConfHomePeopleYouMayKnow' : 'Покажи Сугестии секција.',
		'ConfHomeNavigation' : 'Покажи Навигација секција.',
		'ConfHomePokes' : 'Покажи Боцкања секција.',
		'ConfHomeProfile' : 'Покажи Профил секција.',
		'ConfHomeRequests' : 'Покажи Барања секција.',
		'ConfHomeRightColumn' : 'Покажи десна колона.',
		'ConfHomeStretch' : 'Растегни ја Почетната страница на целата ширина на пребарувачот.',
		'ConfiCalendar' : 'Додади линкови за превземање на <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> датотека со сите родендени.',
		'ConfImport' : 'За да ги внесеш твоите прилагодувања подоцна, замени го текстот погоре со текстот кој ти е зачуван предходно и кликни "Внеси".',
		'ConfInboxCountInTitle' : 'Прикажи број на нови пораки во насловот на страницата.',
		'ConfLogoutLink' : 'Додади Одјави се линк во топ мени барот.',
		'ConfNotificationCountInTitle' : 'Прикажи број на нови нотификации во насловот на страницата.',
		'ConfNewTabSearch' : 'Направи ги отворени пребарувањата во нов таб/прозорец кога притискам CTRL + Enter за да барам.',
		'ConfPageTitle' : 'Избриши "Facebook |" од насловот на секоја страница.',
		'ConfPhotoPopup' : 'Скокачки поголеми верзии на фотографии при обележување со глувчето.',
		'ConfPopupAutoClose' : 'Затвори ги скокачките фотографии автоматски.',
		'ConfPopupSmartAutoClose' : 'Спречи автоматски исклучување на скокачките фотографии ако обележувачот на глувчето е над нив',
		'ConfPopupPosition' : 'Позиција за скокачки фотографии',
		'ConfProcessInterval' : 'Интервал за обработување страница, во милисекунди (поставено=1000):',
		'ConfProfileLink' : 'Прикажи Профил линк во топ мени барот.',
		'ConfProfilePicPopup' : 'Скокачки големи верзии на профил фотографии со обележување со глувчето',
		'ConfProtocolLinks' : 'Вклучи месинџер сметки на профилите со линкови за почеток на разговор со нив (Google Talk, Windows Live и тн).',
		'ConfSectionAbout' : 'За FFixer',
		'ConfSectionAdvanced' : 'Напредно',
		'ConfSectionEvents' : 'Родендени/Настани',
		'ConfSectionImportExport' : 'Внеси/Изнеси',
		'ConfSectionFeeds' : 'Извори',
		'ConfSectionHomePage' : 'Почетна страница',
		'ConfSectionLiveFeed' : 'Новости',
		'ConfSectionMenu' : 'Мениа/Разговор',
		'ConfSectionOther' : 'Други Опции',
		'ConfSectionPageTitle' : 'Наслов на страница',
		'ConfSectionPictures' : 'Фотографии',
		'ConfSectionShortcuts' : 'Кратенки за тастатура',
		'ConfSecureLinks' : 'Сила на Facebook линковите до точка до HTTPS страници.',
		'ConfShortcutList' : '<b>Кратенки за тастатура</b> (case sensitive):<br /><br /><i>Од секоја страница:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Вклучи корисници (вклучени пријатели)<br />&nbsp;<b>C</b> - FFixer Конфигурација<br />&nbsp;<b>D</b> - Родендени<br />&nbsp;<b>E</b> - Настани<br />&nbsp;<b>F</b> - Пријатели<br />&nbsp;<b>H</b> - Почетна страница<br />&nbsp;<b>I</b> - Сандаче<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Вклучи кратенки за тастатура.',
		'ConfSign' : 'Пркажи хороскопски значи на луѓе\-то на нивните профили (Ако ја објавиле таа информација).',
		'ConfTopBarFixed' : 'Зачувај го горниот мени бар на екранот секогаш, и по лизгањето доле.',
		'ConfTopBarHoverOpacity' : 'При обележување со глувчето',
		'ConfTopBarOpacity' : 'Проѕирност на горниот мени бар',
		'ConfUpdates' : 'Провери Userscripts.org дневно за надоградби во FFixer. Или <a href="#" id="fbfUpdateLink" onclick="return false;">провери сега</a>.',
		'DownloadVideo' : 'Превземи Видео',
		'ExportICalendarFile' : 'Изнеси iCalendar датотека',
		'ExportICalendarFileWarning' : '(Тоа ќе потрае ако имаш многу пријатели)',
		'FacebookFixerConflict' : 'Facebook Fixer е сега FFixer.<br /><br />За промена на име треба сами да го избришете Facebook Fixer од вашиот пребарувач, или двете скрипти ќе создаваат проблем една на друга.<br /><br />Ако не си сигурен како да ја избришеш скриптата, <a %s>кликни тука за инструкции</a>.',
		'fullAlbumLoaded' : 'целиот албум е вчитан',
		'Import' : 'Внеси',
		'ImportConfirm' : 'Дали си сигурен дека сакаш да ги внесеш овие прилагодувања?\nТвоите сегашни прилагодувања ќе бидат изгубени.',
		'ImportFailure' : 'се појави грешка додека ги внесуваше твоите прилагодувања.',
		'ImportSuccess' : 'Внесувањето е завршено. Дали сакаш да ја освежиш страницата?',
		'Left' : 'Лево',
		'LoadingAllPhotos' : 'Се вчитуваат сите фотографии...',
		'loadingFullAlbum' : 'Се вчитува целиот албум...',
		'LoadingPic' : 'Се вчитува фотографијата...',
		'LoadPhotosWarning' : 'Вчитувањето на сите фотографии може да потрае',
		'Months' : Array('Јануари','Фебруари','Март','Април','Мај','Јуни','Јули','Август','Септември','Октомври','Ноември','Декември'),
		'ProtocolSkype' : 'Јави се %s преку Skype',
		'ProtocolMSN' : 'Разговарај со %s преку Windows Live',
		'ProtocolYahoo' : 'Разговарај со %s преку Yahoo Messenger',
		'ProtocolGoogle' : 'Разговарај со %s преку Google Talk',
		'ReloadErrorPage' : 'Пробај повторно, или почекај 5 секунди',
		'Refresh' : 'Освежи',
		'Remove' : 'Избриши',
		'Right' : 'Десно',
		'ShowBigPictures' : 'Покажи големи фотографии',
		'Signs' : Array('Јарец','Водолија','Риби','Овен','Бик','Близнаци','Рак','Лав','Девица','Вага','Скорпија','Стрелец'),
		'today' : 'денес',
		'Translators' : 'Преведувачи',
		'UpdateAvailable1' : 'Достапна е надоградба за FFixer',
		'UpdateAvailable2' : 'Дали сакаш да надоградиш сега?',
		'UpdateHomepage' : 'Оди на почетна',
		'UpdateInstall' : 'Инсталирај сега',
		'UpdateTomorrow' : 'Потсетиме утре',
		'yearsOld' : '%s години'
	},
	
	// Norwegian - Contributed by Eilif Nordseth (20100819)
	nb : {	
		'_language' : 'Norwegian',
		'AddToCalendar' : 'Legg til kalender',
		'AddToGoogleCalendar' : 'Legg til Google kalendar',
		'all' : 'alle',
		'All' : 'AllE',
		'AllPhotosLoaded' : 'Alle bilder lastet inn',
		'Automatic' : 'Automatisk',
		'Birthday' : '%s\'s fødselsdag',
		'BookmarkAdd' : 'Legg til nytt bokmerke',
		'BookmarkExists' : 'Det er allerede et bokmerke til denne siden.\n\nGå til siden du ønsker å bokmerke og forsøk igjen.',
		'BookmarkNamePrompt' : 'Legg inn et navn til dette bokmerketet:\n%s',
		'BookmarksConfirmRemoval' : 'Er du sikker på at du vil fjerne disse bokmerkene?',
		'BookmarksManage' : 'Behandle bokmerker',
		'BookmarksRemoveSelected' : 'Fjern valgte bokmerker',
		'Bookmarks' : 'Bokmerker',
		'BrowserUnsupported' : 'Nettleseren din støtter ikke dette valget.',                                 
		'CreatingFile' : 'Lager fil',
		'Close' : 'Lukk',
		'ConfigureFacebookFixer' : 'FFixer - Alternativer',
		'ConfigureInstructions' : 'Alle endringer lagres umiddelbart, men noen forandringer virker ikke i faner som allerede er åpne.',
		'ConfAge' : 'Vis en person\'s alder på profilen (om de viser hele fødselsdatoen sin).',
		'ConfAlbumComments' : 'Legg til en lenke på album-sider for å vise alle kommentarene til albumet.',
		'ConfApplicationWhitelist' : 'Applikasjoner\'s Hvit-liste - Legg in ID\'ene til applikasjoner for å hindre at de blir skjult. Adskill ID\'er med mellomrom.',
		'ConfAutoBigAlbumPictures' : 'Automatisk vis større albumbilder når siden åpnes.',
		'ConfAutoLoadFullAlbum' : 'Automatisk last inn fimerkebilder for alle bildene i et album på ei enkel side.',
		'ConfAutoLoadTaggedPhotos' : 'Automatisk last inn fimerkebilder for alle merkede bilder på ei enkel side (bildefaner på personer\'s profiler).',
		'ConfAutoReadMore' : 'Automatisk klikk på "les mer"-lenker.',
		'ConfBigAlbumPictures' : 'Legg til ei lenke på album sider for kunne vise større versjoner av alle bildene på den siden.',
		'ConfBigAlbumPicturesBorder' : 'Add a border around bigger versions of pictures.',
		'ConfBookmarks' : 'Legg en bokmerke-undermeny til toppmeny-linjen.',
		'ConfBottomBarHoverOpacity' : 'Ved mus-over',
		'ConfBottomBarOpacity' : 'Bunmeny-linjen\'s gjennomsiktighet',
		'ConfCalendarBirthDate' : 'Inkluder personen\'s fødselsdato i hendelsesdetaljer.',
		'ConfCalendarFullName' : 'Bruke personen\'s fulle navn som tittel til fødselsdager (istedenfor bare fornavn).',
		'ConfChatDifferentiate' : 'Bruke fete typer og kursiv til å skille mellom tilgjengelige og fraværende venner.',
		'ConfChatHideIdle' : 'Skjul frværende venner.',
		'ConfDelayPopupPics' : 'Legg inn en kort pause før sprettopp-bilder vises.',
		'ConfDelayPopupPicsTimeout' : 'Pause før sprettopp-bilder vises, i millisekunder (standard=500):',
		'ConfDownloadVideo' : 'Legg til en lenke for å kunne laste ned videoer fra video-sider. (Du kan få behov for en <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV-spiller</a>)',
		'ConfErrorPageReload' : 'Automatisk laste inn igjen en applikasjon\'s feilsider etter 5 sekunder.',
		'ConfExport' : 'For å eksportere oppsettet ditt, kopier teksten nedenfor og lagre den i en fil.',
		'ConfExternalPopup' : 'Sprettopp versjoner i full-størrelse av eksterne bilder. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Språk til FFixer',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsangivelse (eg. "3 timer siden").',
		'ConfFBFTimestamps' : 'Legg til FFixer tidsangivelser etter Facebook tider (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Vis FFixer tidsangivelser i 24-timers format.',
		'ConfFriendRequestCountInTitle' : 'Vis antall nye venneforespørsler i sidetittelen.',
		'ConfGoogleApps' : 'Gjør Google kalender-lenker kompatible med Google Apps.',
		'ConfGoogleAppsDomain' : 'Domene',
		'ConfGoogleCalendar' : 'Legg inn lenker til Legg til Fødselsdager og Hendelser for <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalender</a>.',
		'ConfGoogleLanguage' : 'Språk for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Oversettelse</a>',
		'ConfHideApplicationStories' : 'Skjul applikasjonsoversikter.',
		'ConfHideEventStories' : 'Skjul hendelseoversikt.',
		'ConfHideFacebookCountInTitle' : 'Skjul Facebook\'s oppsummering av nye innboks-meldiger.',
		'ConfHideFriendStories' : 'Skjul venneoversikt.',
		'ConfHideGroupStories' : 'Skjul gruppeoversikt.',
		'ConfHideLikeStories' : 'Skjul liker-oversikt.',
		'ConfHideLinkStories' : 'Skjul lenke-oversikt.',
		'ConfHideNoteStories' : 'Skjul notat-oversikt.',
		'ConfHidePhotoStories' : 'Skjul bilde-oversikt.',
		'ConfHidePlaceStories' : 'Skjul steds-hendelser.',
		'ConfHideProfilePicStories' : 'Skjul profilbilde-oversikt.',
		'ConfHideRead' : 'Skjul objekter i aktiv Notis som er blitt markert som røde.',
		'ConfHideRelationshipStories' : 'Skjul Forhold-oversikt.',
		'ConfHideStatusStories' : 'Skjul Status-oversikt.',
		'ConfHideVideoStories' : 'Skjul Video-oversikt.',
		'ConfHideWallStories' : 'Skjul Vegg-oversikt.',
		'ConfHomeBeta' : 'Vis Beta Tester seksjonen.',
		'ConfHomeChat' : 'Vis  Chat-seksjonen.',
		'ConfHomeEvents' : 'Vis Hendelse-seksjonen.',
		'ConfHomeFindFriends' : 'Vis Koble til Venner-seksjonen.',
		'ConfHomeLeftAlign' : 'Venstrestill innhold på Hjem-siden.',
		'ConfHomeLeftColumn' : 'Vis venstre kolonne.',
		'ConfHomeLeftColumnFixed' : 'Behold den venstre kolonnen synlig, selv etter rulling nedover.',
		'ConfHomeLink' : 'Vis Hjem-lenken i toppmeny-feltet.',
		'ConfHomeNavigation' : 'Vis Navigasjons-seksjonen.',
		'ConfHomePokes' : 'Vis Pokes-seksjonen.',
		'ConfHomeProfile' : 'Vis Profil-seksjonen.',
		'ConfHomeRecommendations' : 'Vis anbefalinger (Personer du kanskje kjenner, anbefalte sider etc).',
		'ConfHomeRequests' : 'Vi Forespørsel-seksjonen.',
		'ConfHomeRightColumn' : 'Vis høyre kolonne.',
		'ConfHomeStretch' : 'Strekk siden Hjem til netteleserens vidde fullt ut.',
		'ConfHomeStretchComments' : 'Strekk kommentarfeltene på Hjem-sida.',
		'ConfiCalendar' : 'Legg lenke til Laste ned en <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fødselsdagene.',
		'ConfImport' : 'For å kunne importere oppsettet ditt senere, skriver du over teksten nedenfor med teksten du lagret idligere og klikk "Import".',
		'ConfInboxCountInTitle' : 'Vis antall nye innboks-meldinger på tittellinjen til siden.',
		'ConfLogoutLink' : 'Legg til en Logg-ut lenke på topp-meny linjen.',
		'ConfNotificationCountInTitle' : 'Vis antall nye Varsler i sidetittelen.',
		'ConfNewTabSearch' : 'La søkeresultatet åpnes i ny fane/vindu ved søk med trykk av CTRL + Enter.',
		'ConfPageTitle' : 'Fjern "Facebook |" fra tittelen på hver side.',
		'ConfPhotoPopup' : 'Sprettopp større versjoner av bilder ved mus-over.',
		'ConfPopupAutoClose' : 'Lukk sprettopp-bilder automatisk.',
		'ConfPopupSmartAutoClose' : 'Hindre sprettopp-bilder i å lukkes automatisk om musen er over det.',
		'ConfPopupPosition' : 'Posisjon for sprettopp-bilder',
		'ConfProcessInterval' : 'Intervall for å lage siden, i millisekund (standard=1000):',
		'ConfProfileLink' : 'Vis Profil-lenken i toppmeny linjen.',
		'ConfProfilePicPopup' : 'Sprettopp større versjoner av profil-bilder ved musover',
		'ConfProtocolLinks' : 'Endre meldings ID\'er på profiler til lenker som starter en dialog med dem (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Om FFixer',
		'ConfSectionAdvanced' : 'Avansert',
		'ConfSectionEvents' : 'Fødselsdager/Hendelser',
		'ConfSectionImportExport' : 'Import/Eksport',
		'ConfSectionFeeds' : 'Notiser',
		'ConfSectionHomePage' : 'Hjem side',
		'ConfSectionLiveFeed' : 'Aktive Notiser',
		'ConfSectionMenu' : 'Menyer/Chat',
		'ConfSectionOther' : 'Andre alternativer',
		'ConfSectionPageTitle' : 'Sidetittel',
		'ConfSectionPictures' : 'Bilder',
		'ConfSectionShortcuts' : 'Tastatur-Snarveier',
		'ConfSecureLinks' : 'La Facebook lenker peke til HTTPS sider.',
		'ConfShortcutList' : '<b>Tastatur-Snarveier</b> (små/store sensitive):<br /><br /><i>Fra hvilken som helst side:</i><br /> <b>A</b> - Album/bilder<br /> <b>B</b> - Handtere venneliste (nettvenner)<br /> <b>C</b> - FFixer oppsett<br /> <b>D</b> - Fødselsdager<br /> <b>E</b> - Hendelser<br /> <b>F</b> - Venner<br /> <b>H</b> - Hjem side<br /> <b>I</b> - Innboks<br /> <b>K</b> - Legg til Bokmerke<br /> <b>L</b> - Velg Logg ut lenken (trykk Enter etterpå for å logge ut)<br /> <b>N</b> - Varsler<br /> <b>P</b> - Din Profil<br /> <b>R</b> - Forespørsler<br /> <b>S</b> - Hopp til søkefeltet<br /> <b>T</b> - Oversett valgt tekst<br /> <b>?</b> - Vis FFixer\'s feilrette-info<br /> <b><escape></b> - Lukk sprettopp\'er laget av FFixer<br /><br /><i>Fra Hjem siden (filtere)</i>:<br /> <b>a</b> - Sider<br /> <b>f</b> - Aktiv Notis<br /> <b>g</b> - Grupper<br /> <b>l</b> - Lenker<br /> <b>n</b> - Nyhets Notiser<br /> <b>p</b> - Bilder<br /> <b>s</b> eller <b>u</b> - Status-Oppdateringer<br /> <b>t</b> - Notater<br /> <b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Bilder<br /> <b>w</b> - Vegg<br /> <b>x</b> - Bokser<br /><br /><i>Fra sider med nummerering (forrige, neste, etc)</i><br /> <b><venstre pil></b> - Forrige<br /> <b><høyre pil></b> - Neste<br /> <b><shift> + <venstre pil></b> - Første (når tilgjengelig)<br /> <b><shift> + <høyre pil></b> - Siste (når tilgjengelig)<br /><br /><i>Mens man ser på album/bilder:</i><br /> <b>a</b> - Last alle frimerkebilder (når tilgjengelig)<br /> <b>b</b> - Vis store bilder<br /> <b>c</b> - Se på kommentarer<br /> <b>k</b> - Tilbake til album<br /> <b>m</b> - Bilder av (person) og meg<br /><br /><i>Mens man ser på siste album og opplastede/merkede bilder:</i><br /> <b>a</b> eller  <b>r</b> - Siste Album<br /> <b>m</b> eller  <b>u</b> - Mobile opplastinger<br /> <b>o</b> - Bilder av meg<br /> <b>p</b> - Mine bilder<br /> <b>t</b> eller  <b>f</b> - Merkede venner',
		'ConfShortcuts' : 'Aktiver tastatur-snarveier.',
		'ConfSign' : 'Vis en person\'s stjernetegn på profilen (om de oppgir fødselsdatoen sin).',
		'ConfTopBarFixed' : 'Behold alltid toppmeny-linjen på skjermen, til og med etter rulling nedover.',
		'ConfTopBarHoverOpacity' : 'Ved mus-over',
		'ConfTopBarOpacity' : 'Toppmenyens gjennomsiktighet',
		'ConfUpdates' : 'Sjekk Userscripts.org daglig etter oppdateinger til FFixer. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">sjekk nå</a>.',
		'DownloadVideo' : 'Last ned video',
		'ExportICalendarFile' : 'Eksporter iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil ta ei stund om du har mange venner)',
		'FacebookFixerConflict' : 'Facebook Fixer er nå kjent som FFixer.<br /><br />På grunn av navnebyttet må du manuelt avinstallere Facebook Fixer fra nettleseren din, ellers vil de to scriptene komme i konflikt med hverandre.<br /><br />Dersom du ikke er sikker på hvordan man avinstallerer et brukerscript, <a %s>klikk her for instruksjoner</a>.',
		'fullAlbumLoaded' : 'hele album lastet',
		'Import' : 'Importer',
		'ImportConfirm' : 'Er du sikker på at du vil importere dette oppsettet?\nDine nåværende valg vil bli tapt.',
		'ImportFailure' : 'En feil oppstod mmens oppsettet ditt ble forsøkt importert.',
		'ImportSuccess' : 'Importering fullført. Ønsker du å oppfriske siden?',
		'Left' : 'Venstre',
		'LoadingAllPhotos' : 'Laster alle bilder...',
		'loadingFullAlbum' : 'Laster hele album...',
		'LoadingPic' : 'Laster bilde...',
		'LoadPhotosWarning' : 'Laste alle bilder kan ta lang tid',
		'Months' : new Array('Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'),
		'ProtocolSkype' : 'Ring %s ved å bruke Skype',
		'ProtocolMSN' : 'Chat med %s ved å bruke Windows Live',
		'ProtocolYahoo' : 'Chat med %s ved å bruke Yahoo Messenger',
		'ProtocolGoogle' : 'Chat med %s ved å bruke Google Talk',
		'ReloadErrorPage' : 'Klikk for å forsøke på nytt, eller vent 5 sekunder',
		'Refresh' : 'Oppfrisk',
		'Remove' : 'Fjern',
		'Right' : 'Høyre',
		'ShowBigPictures' : 'Vis store bilder',
		'Signs' : new Array('Steinbukken','Vannmannen','Fiskene','Væren','Tyren','Tvillingene','Krepsen','Løven','Jomfruen','Vekten','Skorpionen','Skytten'),
		'today' : 'i dag',
		'Translators' : 'Oversettere',
		'UpdateAvailable1' : 'En oppdatering til FFixer er tilgjengelig',
		'UpdateAvailable2' : 'Vil du oppdatere nå?',
		'UpdateHomepage' : 'Gå til hjem siden',
		'UpdateInstall' : 'Installer nå',
		'UpdateTomorrow' : 'Minn meg på om dette i morgen',
		'ViewAlbumComments' : 'Vis album-kommentarer',
		'yearsOld' : '%s år gammel'
	},

	// Korean - Contributed by 박상빈 (20100823)
	ko : {
		'_language' : 'Korean',
		'AddToCalendar' : '달력에 추가',
		'AddToGoogleCalendar' : '구글 캘린더에 추가',
		'all' : '전체',
		'All' : '모든 사진',
		'AllPhotosLoaded' : '모든 사진을 로드했습니다',
		'Automatic' : '자동',
		'Birthday' : '%s\의 생일',
		'BookmarkAdd' : '즐겨찾기에 추가',
		'BookmarkExists' : '이 페이지는 이미 즐겨찾기 되어 있습니다.\n\n즐겨찾기 하실 페이지로 가서 다시 시도하세요.',
		'BookmarkNamePrompt' : '즐겨찾기 이름:\n%s',
		'BookmarksConfirmRemoval' : '다음의 즐겨찾기를 정말로 지우시겠습니까?',
		'BookmarksManage' : '즐겨찾기 관리',
		'BookmarksRemoveSelected' : '선택한 즐겨찾기 삭제',
		'Bookmarks' : '즐겨찾기',
		'BrowserUnsupported' : '이 기능은 현재 브라우저에서는 작동하지 않습니다.',
		'CreatingFile' : '파일 만드는 중',
		'Close' : '닫기',
		'ConfigureFacebookFixer' : 'FFixer 설정',
		'ConfigureInstructions' : '변경사항은 선택즉시 적용됩니다. 다른 열려있는 탭에는 바로 적용되지 않을 수 있습니다.',
		'ConfAge' : '친구의 프로필에 친구의 나이 표시 (생년월일을 공개한 경우).',
		'ConfAlbumComments' : '사진첩 페이지에 "사진첩에 달린 댓글 모두보기" 링크 더하기.',
		'ConfApplicationWhitelist' : '허용된 어플리케이션 - 숨기지 않을 어플리케이션의 ID를 입력하세요. ID 사이는 스페이스로 나눔.',
		'ConfAutoBigAlbumPictures' : '사진 페이지에 큰 사진첩 사진을 보이기.',
		'ConfAutoLoadFullAlbum' : '사진첩 페이지에 모든 사진을 한번에 보이기.',
		'ConfAutoLoadTaggedPhotos' : '사진 페이지에 태그달린 모든 사진을 보이기.',
		'ConfAutoReadMore' : '"지난 게시물" 링크를 자동으로 누르기.',
		'ConfBigAlbumPictures' : '사진첩 페이지에 "큰 사진 보기" 링크 더하기.',
		'ConfBookmarks' : '맨 위 메뉴 표시줄에 즐겨찾기 메뉴를 더하기.',
		'ConfBottomBarHoverOpacity' : '마우스 커서를 올려놨을때',
		'ConfBottomBarOpacity' : '아래 표시줄의 투명도',
		'ConfCalendarBirthDate' : '이벤트의 추가정보에 친구의 생일 보이기.',
		'ConfCalendarFullName' : '생일을 표시할때 성과 이름을 모두 표시하기 (기본은 성을 표시하지 않음).',
		'ConfChatDifferentiate' : '자리비움 상태인 친구와 온라인 상태인 친구를 이탤릭체와 굵은 글씨로 구분하기.',
		'ConfChatHideIdle' : '자리비움 상태의 친구는 숨기기.',
		'ConfDelayPopupPics' : '조금 기다렸다가 팝업 사진 보이기.',
		'ConfDelayPopupPicsTimeout' : '팝업 사진을 보이기 전까지의 대기 시간, 1/1000초 단위 (기본은 500):',
		'ConfDownloadVideo' : '비디오 페이지에 다운로드 링크 더하기. (<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV 플레이어</a>가 필요할수도 있습니다)',
		'ConfErrorPageReload' : '어플리케이션 오류 페이지를 5초 후에 자동으로 새로고침.',
		'ConfExport' : '설정사항을 내보내고 싶으시면 아래의 텍스트를 복사해서 파일에 저장하십시오.',
		'ConfExternalPopup' : '마우스 커서를 외부 사진에 올리면 을 큰 팝업 사진을 보이기. <sup>베타</sup>',
		'ConfFacebookFixerLanguage' : 'FFixer에 사용할 언어',
		'ConfFacebookTimestamps' : 'Facebook 형식의 타임스탬프 보이기 (예. "약 3시간 전").',
		'ConfFBFTimestamps' : 'FFixer 형식의 타임스탬프를 Facebook 타임스탬프 뒤에 보이기 (예. "11:45").',
		'ConfFBFTimestamps24' : 'FFixer 타임스탬프를 24시간 형식으로 보이기.',
		'ConfFriendRequestCountInTitle' : '페이지 제목에 친구 요청 갯수 보이기.',
		'ConfGoogleApps' : '구글 Apps와 호환되는 구글 캘린더 링크 만들기.',
		'ConfGoogleAppsDomain' : '도메인',
		'ConfGoogleCalendar' : '생일과 이벤트를 <a href="http://www.google.com/support/calendar/bin/topic.py?hl=kr&topic=13732" target="_blank">구글 캘린더</a>에 추가하는 링크 더하기.',
		'ConfGoogleLanguage' : '<a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">구글 번역</a>에 사용할 언어',
		'ConfHideApplicationStories' : '어플리케이션 게시물 숨기기.',
		'ConfHideEventStories' : '이벤트 게시물 숨기기.',
		'ConfHideFacebookCountInTitle' : 'Facebook의 쪽지 갯수 숨기기.',
		'ConfHideFriendStories' : '친구들의 게시물 숨기기.',
		'ConfHideGroupStories' : '그룹 게시물 숨기기.',
		'ConfHideLikeStories' : '"좋아요" 게시물 숨기기.',
		'ConfHideLinkStories' : '링크 게시물 숨기기.',
		'ConfHideNoteStories' : '노트 게시물 숨기기.',
		'ConfHidePhotoStories' : '사진 게시물 숨기기.',
		'ConfHideProfilePicStories' : '프로필 사진 게시물 숨기기.',
		'ConfHideRead' : '최신글 목록에서 읽은 게시물 숨기기.',
		'ConfHideRelationshipStories' : '결혼/연애 게시물 숨기기.',
		'ConfHideStatusStories' : '"내 상태" 게시물 숨기기.',
		'ConfHideVideoStories' : '비디오 게시물 숨기기.',
		'ConfHideWallStories' : '담벼락 게시물 숨기기.',
		'ConfHomeBeta' : 'Facebook Sneak Peek 보이기.',
		'ConfHomeChat' : '채팅 보이기.',
		'ConfHomeEvents' : '이벤트 보이기.',
		'ConfHomeFindFriends' : '연결하기 보이기.',
		'ConfHomeLeftAlign' : '첫 페이지를 왼쪽으로 정렬.',
		'ConfHomeLeftColumn' : '왼쪽 메뉴 보이기.',
		'ConfHomeLeftColumnFixed' : '아래로 스크롤 한 후에도 왼쪽 메뉴 보이기.',
		'ConfHomeLink' : '맨 위 메뉴 표시줄에 "첫 페이지" 링크 보이기.',
		'ConfHomeNavigation' : '네비게이션 메뉴 보이기.',
		'ConfHomePokes' : 'Pokes 보이기.',
		'ConfHomeProfile' : '프로필 보이기.',
		'ConfHomeRecommendations' : '추천 보이기.',
		'ConfHomeRequests' : '요청 보이기.',
		'ConfHomeRightColumn' : '오른쪽 메뉴 보이기.',
		'ConfHomeStretch' : '브라우저의 가로 크게에 맞게 첫 페이지 내용을 늘이기 .',
		'ConfHomeStretchComments' : '브라우저의 가로 크기에 맞게 댓글을 늘이기.',
		'ConfiCalendar' : '모든 생일을 <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> 파일로 받는 링크 더하기.',
		'ConfImport' : '설정사항을 가져오고 싶으시면 저장한 텍스트를 아래에 붙인 후 "가져오기"를 누르십시오.',
		'ConfInboxCountInTitle' : '페이지 제목에 새 쪽지 갯수 보이기.',
		'ConfLogoutLink' : '맨 위 메뉴 표시줄에 로그아웃 링크 더하기.',
		'ConfNotificationCountInTitle' : '페이지 제목에 새 알림 갯수 보이기.',
		'ConfNewTabSearch' : '검색창에서 CTRL+엔터 키를 누르면 새 탭/창에 검색결과를 보이기.',
		'ConfPageTitle' : '"Facebook |"을 페이지 제목에서 없애기.',
		'ConfPhotoPopup' : '마우스 커서를 프로필 사진에 올리면 큰 팝업 사진을 보이기.',
		'ConfPopupAutoClose' : '자동으로 팝업 사진 닫기.',
		'ConfPopupSmartAutoClose' : '마우스 커서를 올리고 있으면 팝업사진을 자동으로 닫지 않기.',
		'ConfPopupPosition' : '팝업 사진 위치',
		'ConfProcessInterval' : '페이지를 처리하는 간격, 1/1000초 단위 (기본은 1000):',
		'ConfProfileLink' : '맨 위 메뉴 표시줄에 프로필 링크 보이기.',
		'ConfProfilePicPopup' : '마우스 커서를 사진에 올리면 큰 팝업 사진을 보이기.',
		'ConfProtocolLinks' : '프로필에 있는 메신저 ID(구글토크, 윈도우 라이브 메신저, 등)를 메신저를 통해 대화를 시작하는 링크로 변환하기.',
		'ConfSectionAbout' : 'FFixer는...',
		'ConfSectionAdvanced' : '고급',
		'ConfSectionEvents' : '생일/이벤트',
		'ConfSectionImportExport' : '가져오기/내보내기',
		'ConfSectionFeeds' : '게시물',
		'ConfSectionHomePage' : '첫 페이지',
		'ConfSectionLiveFeed' : '최신글',
		'ConfSectionMenu' : '메뉴/채팅',
		'ConfSectionOther' : '그 외 설정',
		'ConfSectionPageTitle' : '페이지 제목',
		'ConfSectionPictures' : '사진',
		'ConfSectionShortcuts' : '키보드 단축키',
		'ConfSecureLinks' : '항상 HTTPS를 통해 Facebook을 사용하기.',
		'ConfShortcutList' : '<b>키보드 단축키</b> (대소문자 구분):<br /><br /><i>모든 페이지에서 작동</i>:<br />&nbsp;<b>A</b> - 사진첩/사진<br />&nbsp;<b>B</b> - 접속된 친구 보이기/숨기기<br />&nbsp;<b>C</b> - FFixer 설정<br />&nbsp;<b>D</b> - 생일<br />&nbsp;<b>E</b> - 이벤트<br />&nbsp;<b>F</b> - 친구<br />&nbsp;<b>H</b> - 첫 페이지<br />&nbsp;<b>I</b> - 쪽지<br />&nbsp;<b>K</b> - 즐겨찾기 더하기<br />&nbsp;<b>L</b> - 로그아웃 링크를 선택 (그다음 엔터키를 누르면 로그아웃)<br />&nbsp;<b>N</b> - 알림<br />&nbsp;<b>P</b> - 내 프로필<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - 검색 필드로 커서 이동<br />&nbsp;<b>T</b> - 선택한 텍스트를 번역<br />&nbsp;<b>?</b> - FFixer 디버그 정보 보기<br />&nbsp;<b>&lt;ESC&gt;</b> - FFixer 팝업 사진 닫기<br /><br /><i>홈페이지에서 작동(필터)</i>:<br />&nbsp;<b>a</b> - 페이지<br />&nbsp;<b>f</b> - 최신글<br />&nbsp;<b>g</b> - 그룹<br />&nbsp;<b>l</b> -링크<br />&nbsp;<b>n</b> - 뉴스 피드<br />&nbsp;<b>p</b> - 사진<br />&nbsp;<b>s</b> 또는 <b>u</b> - 상태 업데이트<br />&nbsp;<b>t</b> - 노트<br />&nbsp;<b>v</b> - 비디오<br /><br /><i>프로필 페이지에서 작동</i>:<br />&nbsp;<b>i</b> - 정보<br />&nbsp;<b>p</b> - 사진<br />&nbsp;<b>w</b> - 담벼락<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>이동이 가능한 페이지에서 작동(이전, 다음, 등)</i>:<br />&nbsp;<b>&lt;←&gt;</b> - 이전<br />&nbsp;<b>&lt;→&gt;</b> - 다음<br />&nbsp;<b>&lt;Shift&gt; + &lt;←&gt;</b> - 처음 (가능할때만)<br />&nbsp;<b>&lt;Shift&gt; + &lt;→&gt;</b> - 마지막 (가능할때만)<br /><br /><i>사진첩/사진을 볼때 작동</i>:<br />&nbsp;<b>a</b> - 모든 썸네일 보기 (가능할때만)<br />&nbsp;<b>b</b> - 큰 사진 보이기<br />&nbsp;<b>c</b> - 댓글 보기<br />&nbsp;<b>k</b> - 사진첩으로 돌아가기<br />&nbsp;<b>m</b> - 내가(또는 친구가) 나온 사진<br /><br /><i>최근 사진첩이나 업로드/태그된 사진을 볼때 작동:</i><br />&nbsp;<b>a</b> 또는 &nbsp;<b>r</b> - 최근 사진첩<br />&nbsp;<b>m</b> 또는 <b>u</b> - 모바일 업로드<br />&nbsp;<b>o</b> - 내가 나온 사진<br />&nbsp;<b>p</b> -내 사진<br />&nbsp;<b>t</b> 또는 <b>f</b> - 태그 된 친구들',
		'ConfShortcuts' : '키보드 단축키 사용.',
		'ConfSign' : '친구의 프로필에 친구의 별자리 표시 (생년월일을 공개한 경우).',
		'ConfTopBarFixed' : '맨 위 메뉴 표시줄을 아래로 스크롤 한 후에도 보이기.',
		'ConfTopBarHoverOpacity' : '마우스 커서를 올려놨을때',
		'ConfTopBarOpacity' : '맨 위 메뉴 표시줄의 투명도',
		'ConfUpdates' : '매일 Userscripts.org에서 FFixer 업데이트를 확인하기. <a href="#" id="fbfUpdateLink" onclick="return false;">지금 확인</a>.',
		'DownloadVideo' : '비디오 다운로드',
		'ExportICalendarFile' : 'iCalender 파일로 가져오기',
		'ExportICalendarFileWarning' : '(친구가 많으면 오래 걸릴 수 있습니다)',
		'FacebookFixerConflict' : 'Facebook Fixer의 이름이 FFixer로 바뀌었습니다.<br /><br />Facebook Fixer을 브라우저에서 제거하지 않으면 이름 변경 때문에 충돌이 일어납니다.<br /><br />userscript를 제거하는 방법을 모르겠으면 <a %s>여기를 참조하세요</a>.',
		'fullAlbumLoaded' : '앨범 전체가 로딩됨',
		'Import' : '가져오기',
		'ImportConfirm' : '정말로 설정을 가져오시겠습니까?\n현재 설정은 삭제됩니다.',
		'ImportFailure' : '설정을 가져오는 도중 에러가 났습니다.',
		'ImportSuccess' : '성공적으로 설정을 가져왔습니다. 새로고침 하시겠습니까?',
		'Left' : '왼쪽',
		'LoadingAllPhotos' : '모든 사진을 로딩중...',
		'loadingFullAlbum' : '앨범 전체를 로딩중...',
		'LoadingPic' : '사진 로딩중...',
		'LoadPhotosWarning' : '모든 사진을 로딩하는데 시간이 오래 걸릴 수 있습니다',
		'Months' : new Array('1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'),
		'ProtocolSkype' : 'Skype로 %s와 전화하기',
		'ProtocolMSN' : 'Windows Live로 %s와 채팅하기',
		'ProtocolYahoo' : '야후 메신저로 %s와 채팅하기',
		'ProtocolGoogle' : '구글 토크로  %s와 채팅하기',
		'ReloadErrorPage' : '재시도 하려면 클릭하거나 5초를 기다리세요',
		'Refresh' : '새로고침',
		'Remove' : '제거',
		'Right' : '오른쪽',
		'ShowBigPictures' : '큰 사진 보기',
		'Signs' : new Array('염소자리','물병자리','물고기자리','양자리','황소자리','쌍둥이자리','게자리','사자자리','처녀자리','천칭자리','전갈자리','궁수자리'),
		'today' : '오늘',
		'Translators' : '번역한 사람',
		'UpdateAvailable1' : 'FFixer 업데이트가 나왔습니다',
		'UpdateAvailable2' : '지금 업데이트 할까요?',
		'UpdateHomepage' : '홈페이지로 가기',
		'UpdateInstall' : '지금 인스톨 하기',
		'UpdateTomorrow' : '내일 다시 확인',
		'ViewAlbumComments' : '사진첩에 달린 댓글 모두보기',
		'yearsOld' : '%s살'
	},
	
	// Vietnamese - Contributed by Trần Đức Thịnh (20100104)
	// Hi vọng nhận được góp ý của mọi người về bản dịch, email: tranducthinh4102@gmail.com
	vi : {
		'_language' : 'Tiếng Việt',
		'AddToCalendar' : 'Thêm vào lịch',
		'AddToGoogleCalendar' : 'Thêm vào lịch của Google',
		'all' : 'tất cả',
		'All' : 'Tất cả',
		'AllPhotosLoaded' : 'Tải tất cả các bức ảnh',
		'Automatic' : 'Tự động',
		'Birthday' : 'sinh nhật của %s',
		'BookmarkAdd' : 'Thêm Bookmark mới',
		'BookmarkExists' : 'Trang này đã được đánh dấu.\n\nTruy cập vào trang bạn muốn đánh dấu và thử lại.',
		'BookmarkNamePrompt' : 'Đặt tên cho trang đánh dấu này:\n%s',
		'BookmarksConfirmRemoval' : 'Bạn muốn xóa các bookmark đã chọn?',
		'BookmarksManage' : 'Quản lý Bookmarks',
		'BookmarksRemoveSelected' : 'Xóa các Bookmarks đã chọn',
		'Bookmarks' : 'Bookmarks',
		'BrowserUnsupported' : 'Trình duyệt của bạn không hỗ trợ tính năng này.',
		'CreatingFile' : 'Tạo tập tin',
		'Close' : 'Đóng',
		'ConfigureFacebookFixer' : 'Cài đặt FFixer',
		'ConfigureInstructions' : 'Mọi thiết lập sẽ được lưu ngay lập tức, nhưng một số thay đổi không có tác dụng trong các thẻ đang mở.',
		'ConfAge' : 'Hiển thị tuổi của một người trong thông tin của họ (nếu họ cung cấp ngày sinh đầy đủ).',
		'ConfAlbumComments' : 'Thêm một liên kết để hiển thị tất cả các bình luận về album ở phía trên album',
		'ConfApplicationWhitelist' : 'Danh sách trắng các ứng dụng - Nhập ID của các ứng dụng để nó không bị ẩn. Các ID cách nhau bởi khoảng trắng (dấu cách).',
		'ConfAutoBigAlbumPictures' : 'Tự động hiển thị hình ảnh lớn hơn khi trang web mở ra.',
		'ConfAutoLoadFullAlbum' : 'Tự động tải thumbnails của tất cả hình ảnh của album trong một trang web.',
		'ConfAutoLoadTaggedPhotos' : 'Tự động tải thumbnnails cho tất cả các hình ảnh được tag trong một trang (the photos tab on people\'s profiles).',
		'ConfAutoReadMore' : 'Tự động click vào liên kết "see more".',
		'ConfBigAlbumPictures' : 'Thêm liên kết trên các album để hiển thị các phiên bản lớn hơn của các hình ảnh trên trang đó',
		'ConfBigAlbumPicturesBorder' : 'Thêm viền xung quanh phiên bản lớn hơn của hình ảnh',
		'ConfBookmarks' : 'Thêm menu Bookmarks vào thanh trình đơn trên cùng.',
		'ConfBottomBarHoverOpacity' : 'Khi chuột ở trên',
		'ConfBottomBarOpacity' : 'Độ trong suốt của thanh thực đơn phía dưới',
		'ConfCalendarBirthDate' : 'Bao gồm ngày sinh trong những chi tiết sự kiện.',
		'ConfCalendarFullName' : 'Sử dụng tên đầy đủ như tiêu đề cho ngày sinh (thay vì chỉ là tên).',
		'ConfChatDifferentiate' : 'Sử dụng chữ in đậm và in nghiêng để phân biệt bạn bè đang online và đang rỗi.',
		'ConfChatHideIdle' : 'Ẩn những bạn bè đang rỗi.',
		'ConfDelayPopupPics' : 'Thêm một khoảng trễ trước khi hiển thị hình ảnh bung ra.',
		'ConfDelayPopupPicsTimeout' : 'Thời gian trước khi hiển thị hình ảnh bung ra, trong mili giây (mặc định=500):',
		'ConfDownloadVideo' : 'Thêm một liên kết để tải xuống các video thừ các trang video. (Bạn có thể cần một <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">chương trình chơi FLV</a>)',
		'ConfErrorPageReload' : 'Tự động tải lại những trang ứng dụng lỗi sau 5 giây.',
		'ConfExport' : 'Để trích xuất các thiết lập của bạn, sao chép đoạn văn bản dưới đây và lưu nó trong một tập tin.',
		'ConfExternalPopup' : 'Phiên bản đúng kích cỡ của hình ảnh. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Ngôn ngữ cho FFixer',
		'ConfFacebookTimestamps' : 'Hiện mốc thời gian của facebook (ví dụ: "3 hours ago").',
		'ConfFBFTimestamps' : 'Thêm mốc thời gian của FFixer sau mốc thời gian của Facebook (ví dụ: "11:45").',
		'ConfFBFTimestamps24' : 'Hiển thị mốc thời gian của FFixer dạng 24 giờ.',
		'ConfFriendRequestCountInTitle' : 'Hiển thị số yêu cầu kết bạn trong tiêu đề của trang.',
		'ConfGoogleApps' : 'Tạo Google Calendar tương thích với Google Apps',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Thêm liên kết để thêm ngày sinh và các sự kiện cho <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Ẩn lịch sử của các ứng dụng.',
		'ConfHideEventStories' : 'Ẩn lịch sử các sự kiện.',
		'ConfHideFacebookCountInTitle' : 'Ẩn số tin nhắn trong hộp thư đến của  Facebook.',
		'ConfHideFriendStories' : 'Ẩn lịch sử của bạn bè.',
		'ConfHideGroupStories' : 'Ẩn lịch sử của nhóm.',
		'ConfHideLikeStories' : 'Ẩn lịch sử "Thích".',
		'ConfHideLinkStories' : 'Ẩn lịch sử của liên kết.',
		'ConfHideNoteStories' : 'Ẩn lịch sử của ghi chú.',
		'ConfHidePhotoStories' : 'Ẩn lịch sử của hình ảnh.',
		'ConfHidePlaceStories' : 'Ẩn lịch sử của địa chỉ.',
		'ConfHideProfilePicStories' : 'Ẩn lịch sử của hình ảnh profile.',
		'ConfHideRead' : 'Ẩn những mục trong feed đã đánh dấu là đã đọc.',
		'ConfHideRelationshipStories' : 'Ẩn lịch sử quan hệ.',
		'ConfHideStatusStories' : 'Ẩn lịch sử trạng thái.',
		'ConfHideVideoStories' : 'Ản lịch sử video.',
		'ConfHideWallStories' : 'Ẩn lịch sử của tường.',
		'ConfHomeBeta' : 'Hiển thị Facebook Sneak Peek.',
		'ConfHomeChat' : 'Hiển thị Chat.',
		'ConfHomeEvents' : 'Hiển thị Events.',
		'ConfHomeFindFriends' : 'Hiển thị Kết Nối.',
		'ConfHomeLeftAlign' : 'Căn trái nội dung của trang chủ.',
		'ConfHomeLeftColumn' : 'Hiển thị cột bên trái.',
		'ConfHomeLeftColumnFixed' : 'Hiển thị cột bên trái, ngay cả khi cuộn xuống.',
		'ConfHomeLink' : 'Hiển thị liên kết "Trang Chủ" trong thanh thực đơn trên cùng.',
		'ConfHomeNavigation' : 'Hiển thị Danh Mục',
		'ConfHomePokes' : 'Hiển thị Pokes',
		'ConfHomeProfile' : 'Hiển thị "Thông tin".',
		'ConfHomeRecommendations' : 'Hiển thị recommendations (People You May Know, Recommended Pages etc).',
		'ConfHomeRequests' : 'Hiển thị Requests.',
		'ConfHomeRightColumn' : 'Hiển thị cột bên phải.',
		'ConfHomeStretch' : 'Hiển thị trang chủ hết chiều rộng của trình duyệt',
		'ConfHomeStretchComments' : 'Kéo căng những bình luận trên trang chủ',
		'ConfiCalendar' : 'Thêm liên kết để tải về một tập tin <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> có tất cả ngày sinh.',
		'ConfImport' : 'Để nhập các thiết lập của bạn, ghi đè lên đoạn văn bản dưới đây bằng các đoạn bạn đã lưu trước đó và kích vào nút "Nhập Vào".',
		'ConfInboxCountInTitle' : 'Hiển thị số tin nhắn trong hộp thư đến trên tiêu đề trang.',
		'ConfLogoutLink' : 'Thêm một liên kết "Đăng xuất" vào thanh trình đơn trên cùng.',
		'ConfNotificationCountInTitle' : 'Hiển thị số thông báo mới trong tiêu đề trang.',
		'ConfNewTabSearch' : 'Để kết quả tìm kiếm mở trong một thẻ/cửa sổ mới khi nhấn Ctrl + Enter khi tìm kiếm',
		'ConfPageTitle' : 'Xóa "Facebook |" khỏi tiêu đề của mọi trang.',
		'ConfPhotoPopup' : 'Bung ra bản lớn hơn của những bức ảnh khi để chuột ở trên hình ảnh.',
		'ConfPopupAutoClose' : 'Tự động đóng hình ảnh bung ra.',
		'ConfPopupSmartAutoClose' : 'Không tự động đóng hình ảnh đã bung ra khi con chuột ở trên nó.',
		'ConfPopupPosition' : 'Vị trí bung hình ảnh',
		'ConfProcessInterval' : 'Khoảng thời gian để xử lý các trang, tính bằng mili giây (mặc định =1000):',
		'ConfProfileLink' : 'Hiển thị liên kết "Trang cá nhân" trên thanh trình đơn trên cùng.',
		'ConfProfilePicPopup' : 'Bung ra hình ảnh của ảnh cá nhân khi để chuột ở trên ảnh',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Thông tin về FFixer',
		'ConfSectionAdvanced' : 'Lựa chọn nâng cao',
		'ConfSectionEvents' : 'Sinh nhật/Sự Kiện',
		'ConfSectionImportExport' : 'Nhập Vào/Trích Xuất',
		'ConfSectionFeeds' : 'Feeds',
		'ConfSectionHomePage' : 'Trang Chủ',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menus/Chat',
		'ConfSectionOther' : 'Lựa chọn khác',
		'ConfSectionPageTitle' : 'Tiêu đề trang',
		'ConfSectionPictures' : 'Hình ảnh',
		'ConfSectionShortcuts' : 'Phím tắt',
		'ConfSecureLinks' : 'Bắt buộc các link của facebook sử dụng giao thức https:// .',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - Tùy Chỉnh FFixer<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Kích hoạt tính năng phím tắt.',
		'ConfSign' : 'Hiện chòm sao của một người trong thông tin của họ (nếu họ cung cấp đầy đủ ngày sinh).',
		'ConfTopBarFixed' : 'Giữ thanh thực đơn luôn phía trên màn hình, cả khi di chuyển xuống.',
		'ConfTopBarHoverOpacity' : 'Khi chuột ở trên',
		'ConfTopBarOpacity' : 'Độ trong suốt của thanh thực đơn phía trên',
		'ConfUpdates' : 'Hãy truy cập vào Userscripts.org hàng ngày để cập nhật FFixer. hoặc <a href="#" id="fbfUpdateLink" onclick="return false;">kiểm tra ngay</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(Điều này sẽ mất một khoảng thời gian nếu bạn có rất nhiều bạn bè)',
		'FacebookFixerConflict' : 'Facebook Fixer nay được gọi là FFixer.<br /><br />Bởi vì thay đổi tên nên bạn cần phải tự gỡ bỏ Facebook Fixer từ trình duyệt của bạn, hoặc hai kịch bản sẽ xung đột với nhau.<br /><br />Nếu bạn không biết gỡ bỏ một userscript, <a %s>bấm vào đây để được hướng dẫn</a>.',
		'fullAlbumLoaded' : 'tải đầy đủ album',
		'Import' : 'Nhập vào',
		'ImportConfirm' : 'Bạn có chắc chắn muốn nhập các thiết lập này?\nCác cài đặt hiện tại của bạn sẽ bị mất.',
		'ImportFailure' : 'Đã xảy ra lỗi khi nhập các thiết lập của bạn.',
		'ImportSuccess' : 'Quá trình nhập hoàn thành. Bạn có muốn tải lại trang?',
		'Left' : 'Bên trái',
		'LoadingAllPhotos' : 'Đang tải tất cả các ảnh...',
		'loadingFullAlbum' : 'Đang tải tất cả album...',
		'LoadingPic' : 'Đang tải ảnh...',
		'LoadPhotosWarning' : 'Tải tất cả các hình ảnh có thể mất một thời gian dài',
		'Months' : new Array('Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'),
		'ProtocolSkype' : 'Gọi cho %s bằng Skype',
		'ProtocolMSN' : 'Chat với %s bằng Windows Live',
		'ProtocolYahoo' : 'Chat với %s bằng Yahoo Messenger',
		'ProtocolGoogle' : 'Chat với %s bằng Google Talk',
		'ReloadErrorPage' : 'Click để thử lại, hoặc đợi 5 giây',
		'Refresh' : 'Làm Tươi',
		'Remove' : 'Xóa',
		'Right' : 'Bên phải',
		'ShowBigPictures' : 'Hiển thị hình ảnh lớn',
		'Signs' : new Array('Ma Kết','Bảo Bình','Song Ngư','Dương Cưu','Kim Ngưu','Song Tử','Cự Giải','Sư Tử','Xử Nữ','Thiên Bình','Hổ Cáp','Nhân Mã'),
		'today' : 'hôm nay',
		'Translators' : 'Translators',
		'UpdateAvailable1' : 'Đã có bản cập nhật mới cho FFixer',
		'UpdateAvailable2' : 'Bạn có muốn cập nhật ngay?',
		'UpdateHomepage' : 'Đi đến trang chủ',
		'UpdateInstall' : 'Cài đặt ngay',
		'UpdateTomorrow' : 'Nhắc lại sau',
		'ViewAlbumComments' : 'Xem bình luận về album',
		'yearsOld' : '%s tuổi'
	},
	
	// Indonesian - Contributed by Sindhu Pripamungkas (20110222)
	id : {
	   '_language' : 'Bahasa Indonesia',
	   'AddToCalendar' : 'Tambahkan ke kalender',
	   'AddToGoogleCalendar' : 'Tambahkan ke Kalender Google',
	   'all' : 'semua',
	   'All' : 'Semua',
	   'AllPhotosLoaded' : 'Semua foto telah dimuat',
	   'Automatic' : 'Otomatis',
	   'Birthday' : 'Ulang tahun %s',
	   'BookmarkAdd' : 'Tambahkan Bookmark Baru',
	   'BookmarkExists' : 'Sudah ada bookmark tersedia sebelumnya untuk halaman ini.\n\nPergi ke halaman yang Anda ingin bookmark dan coba lagi.',
	   'BookmarkNamePrompt' : 'Masukan nama untuk bookmark ini:\n%s',
	   'BookmarksManage' : 'Atur Bookmarks',
	   'BookmarksRemoveSelected' : 'Hapus Bookmark yang dipilih',
	   'Bookmarks' : 'Bookmark',
	   'BrowserUnsupported' : 'Browser yang Anda gunakan tidak mendukung fitur ini.',
	   'CreatingFile' : 'Membuat File',
	   'Close' : 'Tutup',
	   'ConfigureFacebookFixer' : 'Atur FFixer',
	   'ConfigureInstructions' : 'Semua perubahan telah disimpan dengan baik, tapi beberapa perubahan mungkin tidak akan berpengaruh pada tab-tab yang sudah dibuka.',
	   'ConfAge' : 'Tampilkan umur seseorang pada profilnya (apabila mereka menampilkan tanggal ulang tahunnya lengkap).',
	   'ConfApplicationWhitelist' : 'Application Whitelist - Masukan ID applikasi untuk menjaganya dari penyembunyian. Pisahkan dengan spasi.',
	   'ConfAutoBigAlbumPictures' : 'Otomatis tampilkan album gambar lebih besar ketika halaman dibuka.',
	   'ConfAutoLoadFullAlbum' : 'Otomatis memuat penuh semua gambar di dalam album pada satu halaman.',
	   'ConfAutoLoadTaggedPhotos' : 'Otomatis memuat penuh semua foto yang ditandai pada satu halaman. (tab foto pada profil seseorang).',
	   'ConfAutoReadMore' : 'Otomatis klik pada tautan "lihat selengkapnya" .',
	   'ConfBigAlbumPictures' : 'Tambahkan tautan pada halaman album untuk menampilkan versi yang lebih besar dari semua gambar pada halaman tersebut.',
	   'ConfBigAlbumPicturesBorder' : 'Tambahkan border sekitar gambar versi yang lebih besar.',
	   'ConfBookmarks' : 'Tambahkan bookmark submenu ke menu bar atas.',
	   'ConfBottomBarHoverOpacity' : 'Pada mouse-over',
	   'ConfBottomBarOpacity' : 'Menu bar bawah transparan',
	   'ConfCalendarBirthDate' : 'Masukan ulang tahun seseorang pada detail acara.',
	   'ConfCalendarFullName' : 'Gunakan nama lengkap seseorang sebagai judul untuk hari ulang tahun (biasanya hanya nama depan).',
	   'ConfChatDifferentiate' : 'Gunakan huruf tebal dan miring untuk membedakan teman yang tersedia dan diam.',
	   'ConfChatHideIdle' : 'Sembunyikan teman yang diam.',
	   'ConfDelayPopupPics' : 'Tambahkan sebuah penundaan pendek sebelum menampilkan gambar pop-up.',
	   'ConfDelayPopupPicsTimeout' : 'Penundaan sebelum menampilkan gambar popup, dalam millidetik (default=500):',
	   'ConfDownloadVideo' : 'Tambahkan tautan untuk mendownload video dari halaman video. (Anda mungkin membutuhkan <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
	   'ConfErrorPageReload' : 'Otomatis memuat ulang halaman aplikasi error setelah 5 detik.',
	   'ConfExport' : 'Untuk mengexport pengaturan Anda, salinlah teks dibawah dan simpan dalam sebuah file.',
	   'ConfExternalPopup' : 'Versi Popup ukuran penuh untuk gambar luar. <sup>beta</sup>',
	   'ConfFacebookFixerLanguage' : 'Bahasa untuk FFixer',
	   'ConfFacebookTimestamps' : 'Tampilkan cap waktu Facebook (contoh "3 jam lalu").',
	   'ConfFBFTimestamps' : 'Tambahkan cap waktu FFixer setelah cap waktu Facebook (contoh "11:45").',
	   'ConfFBFTimestamps24' : 'Tampilkan cap waktu FFixer dalam format 24 jam.',
	   'ConfFriendRequestCountInTitle' : 'Tampilkan jumlah permintaan teman pada halaman judul.',
	   'ConfGoogleApps' : 'Buat tautan Google Calender kompatibel dengan Google Apps.',
	   'ConfGoogleAppsDomain' : 'Domain',
	   'ConfGoogleCalendar' : 'Tambahkan tautan untuk menambahkan ulang tahun dan acara ke <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
	   'ConfGoogleLanguage' : 'Bahasa untuk for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
	   'ConfHideApplicationStories' : 'Sembunyikan jejak aplikasi.',
	   'ConfHideEgos' : 'Sembunyikan semua bagian "ego" (seharusnya menyembunyikan semua bagian dari rekomendasi Facebook).',
	   'ConfHideEventStories' : 'Sembunyikan jejak acara.',
	   'ConfHideFacebookCountInTitle' : 'Sembunyikan jumlah pesan di kotak masuk.',
	   'ConfHideFriendStories' : 'Sembunyikan jejak teman.',
	   'ConfHideGroupStories' : 'Sembunyikan jejak group.',
	   'ConfHideHovercards' : 'Sembunyikan hovercards (popup yang muncul ketika mouse Anda dia).',
	   'ConfHideLikeStories' : 'Sembunyikan jejak suka.',
	   'ConfHideLinkStories' : 'Sembunyikan jejak tautan.',
	   'ConfHideNoteStories' : 'Sembunyikan jejak catatan.',
	   'ConfHidePhotoStories' : 'Sembunyikan jejak foto.',
	   'ConfHidePlaceStories' : 'Sembunyikan jejak tempat.',
	   'ConfHideProfilePicStories' : 'Sembunyikan jejak foto profil.',
	   'ConfHideRead' : 'Sembunyikan item dalam feed hidup yang sudah dibaca.',
	   'ConfHideRelationshipStories' : 'Hide relationship stories.',
	   'ConfHideStatusStories' : 'Sembunyikan jejak status.',
	   'ConfHideVideoStories' : 'Sembunyikan jejak video.',
	   'ConfHideWallStories' : 'Sembunyikan jejak dinding.',
	   'ConfHomeBeta' : 'Tampilkan bagian Facebook Sneak Peek.',
	   'ConfHomeChat' : 'Tampilkan bagian chat.',
	   'ConfHomeChatNames' : 'Tampilkan nama dalam chat section.',
	   'ConfHomeEvents' : 'Tampilkan bagian event.',
	   'ConfHomeFindFriends' : 'Tampilkan bagian Get Connected.',
	   'ConfHomeLeftAlign' : 'Ratakan kiri konten pada halaman beranda.',
	   'ConfHomeLeftColumn' : 'Tampilkan kolom kiri.',
	   'ConfHomeLeftColumnFixed' : 'Pertahankan agar kolom kiri tetap terlihat, bahkan saat menscroll kebawah.',
	   'ConfHomeLink' : 'Tampilkan tautan Beranda pada menu bara atas.',
	   'ConfHomeNavigation' : 'Tampilkan bagian Navigasi.',
	   'ConfHomePokes' : 'Tampilkan bagian colek.',
	   'ConfHomeProfile' : 'Tampilkan bagian profil.',
	   'ConfHomeRecommendations' : 'Tampilkan rekomendasi (Orang yang mungkin Anda ketahui, Rekomendasi Halaman dll).',
	   'ConfHomeRequests' : 'Tampilkan bagian Permintaan.',
	   'ConfHomeRightColumn' : 'Tampilkan kolom kanan.',
	   'ConfHomeStretch' : 'Regangkan halaman beranda ke ukuran penuh dari browser.',
	   'ConfHomeStretchComments' : 'Regangkan komenter pada halaman beranda.',
	   'ConfiCalendar' : 'Tambahkan tautan unduh pada file <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> dengan semua ulang tahun.',
	   'ConfImport' : 'Untuk mengimport pengaturan Anda nanti, timpa teks di bawah dengan teks yang sudah Anda simpan sebelumnya dan klik "Import".',
	   'ConfInboxCountInTitle' : 'Tampilkan jumlah pesan di kotak masuk pada judul halaman.',
	   'ConfLogoutLink' : 'Tambahkan tautan keluar/logout ke menu bar atas.',
	   'ConfNewTabSearch' : 'Jadikan hasil pencarian terbuka di tab/jendela baru ketika menekan CTRL + Enter untuk mencari.',
	   'ConfPageTitle' : 'Hapus "Facebook |" pada judul halaman pada setiap halaman.',
	   'ConfPhotoPopup' : 'Popup versi lebih besar dari foto pada saat didekatkan mouse.',
	   'ConfPopupAutoClose' : 'Tutup gambar popup otomatis.',
	   'ConfPopupSmartAutoClose' : 'Pertahankan gambar popup dari penutupan otomatis jika mouse meninggalkan popup.',
	   'ConfPopupPosition' : 'Posisi untuk gambar popup',
	   'ConfPopupWhileTagging' : 'Tampilkan gambar popup bahkan saat menandai.',
	   'ConfProcessInterval' : 'Interval untuk memproses halaman, dalam millidetik (default=1000):',
	   'ConfProfileLink' : 'Tampilkan tautan Profil pada menu bar atas.',
	   'ConfProfilePicPopup' : 'Popup versi lebih besar untuk gambar pada saat didekatkan dengan mouse.',
	   'ConfProtocolLinks' : 'Ubah ID messenger dalam profil ke tautan untuk memulai percakapan dengan merekaTurn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
	   'ConfSectionAbout' : 'Tentang FFixer',
	   'ConfSectionAdvanced' : 'Lebih Rumit',
	   'ConfSectionEvents' : 'Ulang Tahun/Acara',
	   'ConfSectionImportExport' : 'Import/Export',
	   'ConfSectionFeeds' : 'Feed',
	   'ConfSectionHomePage' : 'Home Page',
	   'ConfSectionLiveFeed' : 'Feed Hidup',
	   'ConfSectionMenu' : 'Menu/Chat',
	   'ConfSectionOther' : 'Pengaturan lain',
	   'ConfSectionPageTitle' : 'Judul halaman',
	   'ConfSectionPictures' : 'Gambar',
	   'ConfSectionShortcuts' : 'Keyboard Shortcuts',
	   'ConfSecureLinks' : 'Perintah tautan Facebook menuju halaman HTTPS.',
	   'ConfShortcutList' : '<b>Keyboard Shortcut</b> (case sensitive):<br /><br /><i>Dari beberapa halaman:</i><br />&nbsp;<b>A</b> - Album/foto<br />&nbsp;<b>B</b> - Daftar teman (teman yang sedang online)<br />&nbsp;<b>C</b> - Pengaturan FFixer<br />&nbsp;<b>D</b> - Ulang Tahun<br />&nbsp;<b>E</b> - Acara<br />&nbsp;<b>F</b> - Teman<br />&nbsp;<b>H</b> - Halaman Beranda<br />&nbsp;<b>I</b> - Kotak Masuk<br />&nbsp;<b>K</b> - Tambahkan Bookmark<br />&nbsp;<b>L</b> - Pilih tautan keluar/logout (tekan Enter setelah itu untuk loh out)<br />&nbsp;<b>N</b> - Pemberitahuan<br />&nbsp;<b>P</b> - Profile Anda<br />&nbsp;<b>R</b> - Permintaan<br />&nbsp;<b>S</b> - Pencarian<br />&nbsp;<b>T</b> - Terjemahkan teks terpilih<br />&nbsp;<b>?</b> - Tampilkan info debug FFixer<br />&nbsp;<b>&lt;escape&gt;</b> - Tutup popp-up yang dibuat FFixer<br /><br /><i>Dari halaman beranda (filter)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - feed hidup<br />&nbsp;<b>g</b> - Group<br />&nbsp;<b>l</b> - Tautan<br />&nbsp;<b>n</b> - feed berita<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>s</b> or <b>u</b> - Status<br />&nbsp;<b>t</b> - Catatan<br />&nbsp;<b>v</b> - Video<br /><br /><i>Dari profil</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>w</b> - Dindinf<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>Dari halaman dengan pagination (previous, next, dll)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (jika tersedia)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (jika tersedia)<br /><br /><i>Ketika melihat album/foto:</i><br />&nbsp;<b>a</b> - Muat semua penuh (jika tersedia)<br />&nbsp;<b>b</b> - Tmapilkan gambar besar<br />&nbsp;<b>c</b> - Lihat komentar<br />&nbsp;<b>k</b> - Kembali ke album<br />&nbsp;<b>m</b> - Foto dari (seseorang) dan saya<br /><br /><i>Ketika melihat album sekarang dan foto yang dipload/tag:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Album sekarang<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Upload dari Hp<br />&nbsp;<b>o</b> - Foto dari saya<br />&nbsp;<b>p</b> - Foto saya<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Teman yang ditandai',
	   'ConfShortcuts' : 'Aktifkan keyboard shortcut.',
	   'ConfSign' : 'Tampilkan zodiak seseorang pada profilnya (apabila mereka menampilkan tanggal ulang tahunnya lengkap).',
	   'ConfTopBarFixed' : 'Selalu pertahankan menu bar atas pada layar, juga saat menggulung layar browser Anda.',
	   'ConfTopBarHoverOpacity' : 'Pada mouse-over',
	   'ConfTopBarOpacity' : 'Menu bar atas transparan',
	   'ConfUpdates' : 'Cek Userscripts.org setiap hari untuk update FFixer. Atau <a href="#" id="fbfUpdateLink" onclick="return false;">cek sekarang</a>.',
	   'DownloadVideo' : 'Unduh Video',
	   'ExportICalendarFile' : 'Export file iCalendar',
	   'ExportICalendarFileWarning' : '(Ini akan memakan waktu lama apabila Anda mempunyai banyak teman)',
	   'FacebookFixerConflict' : 'Facebook Fixer sekarang dikenal dengan nama FFixer.<br /><br />Karena pergantian nama Anda harus menguninstal Facebook Fixer dari browser Anda, atau dua script ini akan bertentangan satu sama lain.<br /><br />Jika Anda tidak mengetahui cara untuk menguninstal script ini, <a %s>Klick disini untuk tata caranya</a>.',
	   'fullAlbumLoaded' : 'album telah dimuat',
	   'Import' : 'Import',
	   'ImportConfirm' : 'Apakag Anda yakin ingin mengimport peraturan ini?\nPeraturan Anda sekarang akan hilang.',
	   'ImportFailure' : 'Kesalahan terjadi ketika mencoba untuk mengimport peraturan Anda.',
	   'ImportSuccess' : 'Import berhasil. Apakah Anda ingin untuk memuat ulang halaman?',
	   'Left' : 'Kiri',
	   'LoadingAllPhotos' : 'Memuat semua foto...',
	   'loadingFullAlbum' : 'memuat album lengkap...',
	   'LoadingPic' : 'Memuat Gambar...',
	   'LoadPhotosWarning' : 'Pemuatan semua foto mungkin butuh waktu lama',
	   'Months' : new Array('Januari','Februari','Maret','April','May','Junu','Julu','Agustus','September','Oktober','November','Desember'),
	   'ProtocolSkype' : 'Berbicara dengan %s menggunakan Skype',
	   'ProtocolMSN' : 'Chat dengan %s menggunakan Windows Live',
	   'ProtocolYahoo' : 'Chat dengan %s menggunakan Yahoo Messenger',
	   'ProtocolGoogle' : 'Chat dengan %s menggunakan Google Talk',
	   'ReloadErrorPage' : 'Klik untuk mencoba lagi, atau tunggu 5 detik lagi',
	   'Refresh' : 'Muat Ulang',
	   'Remove' : 'Hapus',
	   'Right' : 'Kanan',
	   'ShowBigPictures' : 'Tampilkan Gambar-gambar Besar',
	   'Signs' : new Array('Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius'),
	   'today' : 'hari ini',
	   'Translators' : 'Penerjemah',
	   'UpdateAvailable1' : 'Update tersedia untuk FFixer',
	   'UpdateAvailable2' : 'Apakah Anda ingin mengupdate sekarang?',
	   'UpdateHomepage' : 'Pergi ke halaman beranda',
	   'UpdateInstall' : 'Instal sekarang',
	   'UpdateTomorrow' : 'Peringatkan besok',
	   'yearsOld' : '%s tahun'
	},
	
	// Japanese - Contributed by Masami HIRATA (20110306)
	ja : {
		'_language' : '日本語',
		'AddToCalendar' : 'カレンダーに追加',
		'AddToGoogleCalendar' : 'Googleカレンダーに追加',
		'all' : '全て',
		'All' : '全て',
		'AllPhotosLoaded' : '全ての写真をロード',
		'Automatic' : '自動',
		'Birthday' : '%sさんの誕生日',
		'BookmarkAdd' : '新しいブックマークを追加',
		'BookmarkExists' : 'このページのブックマークは既に存在します．\n\nブックマークしたいページに移動してもう一度実行してください．',
		'BookmarkNamePrompt' : 'このブックマークの名前を入力してください:\n%s',
		'BookmarksConfirmRemoval' : '以下のブックマークを削除してよろしいですか？',
		'BookmarksManage' : 'ブックマークの管理',
		'BookmarksRemoveSelected' : '選択したブックマークを削除',
		'Bookmarks' : 'ブクマ',
		'BrowserUnsupported' : 'この機能をサポートしていないブラウザです．',
		'CreatingFile' : 'ファイルを作成しています',
		'Close' : '閉じる',
		'ConfigureFacebookFixer' : 'FFixer設定',
		'ConfigureInstructions' : '変更はすぐに保存されますが，既に開かれたタブには影響しない場合があります',
		'ConfAge' : 'プロフィールに年齢を表示する（生年月日が完全に提供されている場合）',
		'ConfApplicationWhitelist' : 'アプリケーションホワイトリスト - 記事を隠したくないアプリケーションのIDを入力してください．IDの区切りは半角スペースです．',
		'ConfAutoBigAlbumPictures' : 'ページを開いた時に大きいアルバム写真を自動的に表示する',
		'ConfAutoLoadFullAlbum' : '単独ページでアルバム内の全ての画像のサムネイルを自動的に読み込む',
		'ConfAutoLoadTaggedPhotos' : '単独ページ（プロフィールの写真タブ）で全てのタグ付けされた写真のサムネイルを自動的に読み込む',
		'ConfAutoReadMore' : '「もっと見る」リンクを自動的にクリックする',
		'ConfBigAlbumPictures' : 'アルバムページにページ内の全ての画像の大きいバージョンを表示するリンクを追加する',
		'ConfBigAlbumPicturesBorder' : '大きいバージョンの画像の周りに枠線を追加する',
		'ConfBookmarks' : '上部メニューバーにブックマークサブメニューを追加する',
		'ConfBottomBarHoverOpacity' : 'マウスオーバー時',
		'ConfBottomBarOpacity' : '下部メニューバーの透明度',
		'ConfCalendarBirthDate' : 'イベントの詳細に誕生日を含める',
		'ConfCalendarFullName' : '誕生日のタイトルに（ファーストネームだけではなく）フルネームを使う',
		'ConfChatDifferentiate' : '連絡先のチャット可能と一時退席中を太字と斜体を使って区別する',
		'ConfChatHideIdle' : '一時退席中の連絡先を隠す',
		'ConfDelayPopupPics' : 'ポップアップ画像を表示する前に短いディレイを追加する',
		'ConfDelayPopupPicsTimeout' : 'ポップアップ画像を表示する前のディレイ（ミリ秒単位，デフォルトは500ミリ秒）: ',
		'ConfDownloadVideo' : '動画のページから動画をダウンロードするリンクを追加する（<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV再生ソフト</a>が必要です）',
		'ConfDisableTheater' : '写真シアターを無効にする',
		'ConfErrorPageReload' : 'アプリケーションエラーのページは5秒後に自動更新する',
		'ConfExport' : '設定をエクスポートするには下のテキストをコピーしてファイルに保存してください．',
		'ConfExternalPopup' : '外部画像のフルサイズバージョンをポップアップする <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'FFixerの言語',
		'ConfFacebookTimestamps' : '時刻をFacebook方式で表示する（例: "3時間前"）',
		'ConfFBFTimestamps' : 'Facebook方式の時刻の後にFFxier方式の時刻を追加する（例: "11:45"）',
		'ConfFBFTimestamps24' : 'FFixer方式の時刻を24時間表示にする',
		'ConfFriendRequestCountInTitle' : 'ページタイトルに新着友達リクエストの数を表示する',
		'ConfGoogleApps' : 'Google AppsのGoogleカレンダーへのリンクを作成する',
		'ConfGoogleAppsDomain' : 'ドメイン名',
		'ConfGoogleCalendar' : '<a href="http://ja.wikipedia.org/wiki/Google%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC" target="_blank">Googleカレンダー</a>に誕生日とイベントを追加するリンクを追加する',
		'ConfGoogleLanguage' : '<a href="http://ja.wikipedia.org/wiki/Google%E7%BF%BB%E8%A8%B3" target="_blank">Google翻訳</a>の言語',
		'ConfHideApplicationStories' : 'アプリケーションの記事を隠す',
		'ConfHideEgos' : 'egoセクションを全て隠す（Facebookのおすすめをできるだけ隠します）',
		'ConfHideEventStories' : 'イベントの記事を隠す',
		'ConfHideFacebookCountInTitle' : 'Facebookの受信箱の新着メッセージ数のカウントを隠す',
		'ConfHideFriendStories' : '友達になりましたの記事を隠す',
		'ConfHideGroupStories' : 'グループの記事を隠す',
		'ConfHideHovercards' : 'Hovercard（名前をマウスオーバーした時に現れるポップアップ）を隠す',
		'ConfHideLikeStories' : 'いいね！の記事を隠す',
		'ConfHideLinkStories' : 'リンクの記事を隠す',
		'ConfHideNoteStories' : 'ノートの記事を隠す',
		'ConfHidePhotoStories' : '写真の記事を隠す',
		'ConfHidePlaceStories' : 'スポットの記事を隠す',
		'ConfHideProfilePicStories' : 'プロフィール写真を更新した友達の記事を隠す',
		'ConfHideRead' : '最新情報で閲覧済みの項目を隠す',
		'ConfHideRelationshipStories' : '交際ステータスの記事を隠す',
		'ConfHideStatusStories' : '近況の記事を隠す',
		'ConfHideVideoStories' : '動画の記事を隠す',
		'ConfHideWallStories' : 'ウォールの記事を隠す',
		'ConfHomeBeta' : 'Facebook Sneak Peekを表示する',
		'ConfHomeChat' : 'チャットを表示する',
		'ConfHomeChatNames' : 'チャットに名前を表示する',
		'ConfHomeEvents' : 'イベントを表示する',
		'ConfHomeFindFriends' : 'Facebookでつながろうを表示する',
		'ConfHomeLeftAlign' : 'ページの内容を左寄せにする',
		'ConfHomeLeftColumn' : '左カラムを表示する',
		'ConfHomeLeftColumnFixed' : '画面をスクロールしても左カラムを表示したままにする',
		'ConfHomeLink' : '上部メニューバーにホームへのリンクを表示する',
		'ConfHomeNavigation' : 'ナビゲートを表示する',
		'ConfHomePokes' : 'あいさつを表示する',
		'ConfHomeProfile' : 'プロフィールを表示する',
		'ConfHomeRecommendations' : 'おすすめを表示する（知り合いかも？，おすすめのファンページ等）',
		'ConfHomeRequests' : 'リクエストを表示する',
		'ConfHomeRightColumn' : '右カラムを表示する',
		'ConfHomeStretch' : 'ページの幅をウィンドウの幅に合わせる',
		'ConfHomeStretchMiddleColumn' : 'ページの中央カラムの幅を自動調整する',
		'ConfiCalendar' : '全ての誕生日に<a href="http://ja.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>ファイルをダウンロードするリンクを追加する',
		'ConfImport' : '後から設定をインポートする際は，下のテキストを以前保存したテキストで上書きしてから「インポート」をクリックしてください．',
		'ConfInboxCountInTitle' : 'ページタイトルに受信箱の新着メッセージ数を表示する',
		'ConfLogoutLink' : '上部メニューバーにログアウトへのリンクを追加する',
		'ConfNotificationCountInTitle' : 'ページタイトルに新しいお知らせの数を表示する',
		'ConfNewTabSearch' : 'CTRL + Enterを押して検索した時に新しいタブ/ウィンドウで検索結果を開く',
		'ConfPageTitle' : '全てのページタイトルから「Facebook |」を削除する',
		'ConfPhotoPopup' : 'マウスオーバー時に写真の大きいバージョンをポップアップする',
		'ConfPopupAutoClose' : 'ポップアップ画像を自動的に閉じる',
		'ConfPopupSmartAutoClose' : 'ポップアップ画像をマウスオーバーしている間は自動的に閉じない',
		'ConfPopupPosition' : 'ポップアップ画像の位置',
		'ConfPopupWhileTagging' : 'タグ付けしている時でもポップアップ画像を表示する',
		'ConfProcessInterval' : 'ページを処理する間隔（ミリ秒単位，デフォルトは1000ミリ秒）: ',
		'ConfProfileLink' : '上部メニューバーにプロフィールへのリンクを表示する',
		'ConfProfilePicPopup' : 'マウスオーバー時にプロフィール画像の大きいバージョンをポップアップする',
		'ConfProtocolLinks' : 'プロフィールのメッセンジャーIDを会話するためのリンクに変える（Googleトーク，Windows Live等）',
		'ConfSectionAbout' : 'FFixerについて',
		'ConfSectionAdvanced' : '詳細',
		'ConfSectionEvents' : '誕生日/イベント',
		'ConfSectionImportExport' : 'インポート/エクスポート',
		'ConfSectionFeeds' : 'フィード',
		'ConfSectionHomePage' : 'ホームページ',
		'ConfSectionLiveFeed' : 'ニュースフィード',
		'ConfSectionMenu' : 'メニュー/チャット',
		'ConfSectionOther' : 'その他のオプション',
		'ConfSectionPageTitle' : 'ページタイトル',
		'ConfSectionPictures' : '画像',
		'ConfSectionShortcuts' : 'キーボードショートカット',
		'ConfSecureLinks' : 'FacebookへのリンクでHTTPSのページを強制する',
		'ConfShortcutList' : '<b>キーボード ショートカット</b>（大文字と小文字で異なります）:<br /><br /><i>どのページでも可能:</i><br />&nbsp;<b>A</b> - アルバム/写真<br />&nbsp;<b>B</b> - 連絡先リスト（オンラインの友達）の切替え<br />&nbsp;<b>C</b> - FFixer設定<br />&nbsp;<b>D</b> - 誕生日<br />&nbsp;<b>E</b> - イベント<br />&nbsp;<b>F</b> - 友達<br />&nbsp;<b>H</b> - ホーム<br />&nbsp;<b>I</b> - 受信箱<br />&nbsp;<b>K</b> - ブックマークに追加<br />&nbsp;<b>L</b> - ログアウトへのリンクを選択 （その後でEnterを押すとログアウトします）<br />&nbsp;<b>N</b> - お知らせ<br />&nbsp;<b>P</b> - プロフィール<br />&nbsp;<b>R</b> - リクエスト<br />&nbsp;<b>S</b> - 検索ボックスにジャンプ<br />&nbsp;<b>T</b> - 選択されたテキストを翻訳<br />&nbsp;<b>?</b> - FFixerのデバッグ情報を表示<br />&nbsp;<b>&lt;escape&gt;</b> - FFixerが作成したポップアップを閉じる<br /><br /><i>ホームで可能（フィルタ）</i>:<br />&nbsp;<b>a</b> - ページ<br />&nbsp;<b>f</b> - 最新情報<br />&nbsp;<b>g</b> - グループ<br />&nbsp;<b>l</b> - リンク<br />&nbsp;<b>n</b> - ニュースフィード<br />&nbsp;<b>p</b> - 写真<br />&nbsp;<b>s</b> / <b>u</b> - 近況アップデート<br />&nbsp;<b>t</b> - ノート<br />&nbsp;<b>v</b> - 動画<br /><br /><i>プロフィールで可能</i>:<br />&nbsp;<b>i</b> - 基本データ<br />&nbsp;<b>p</b> - 写真<br />&nbsp;<b>w</b> - ウォール<br />&nbsp;<b>x</b> - ボックス<br /><br /><i>ページ付け（前へ，次へ等）があるページで可能</i><br />&nbsp;<b>←</b> - 前へ<br />&nbsp;<b>→</b> - 次へ<br />&nbsp;<b>&lt;shift&gt; + ←</b> - 最初へ（可能な時のみ）<br />&nbsp;<b>&lt;shift&gt; + →</b> - 最後へ（可能な時のみ）<br /><br /><i>アルバム/写真の閲覧時:</i><br />&nbsp;<b>a</b> - 全てのサムネイルを読み込む（可能な時のみ）<br />&nbsp;<b>b</b> - 大きい画像を表示<br />&nbsp;<b>c</b> - コメントを表示<br />&nbsp;<b>k</b> - アルバムに戻る<br />&nbsp;<b>m</b> - （誰かと）あなたの写真<br /><br /><i>友達の写真やアップロード/タグ付けされた写真の閲覧時:</i><br />&nbsp;<b>a</b> / &nbsp;<b>r</b> - 友達のアルバム<br />&nbsp;<b>m</b> / &nbsp;<b>u</b> - 携帯アップロード<br />&nbsp;<b>o</b> - 私が写っている写真<br />&nbsp;<b>p</b> - マイアルバム<br />&nbsp;<b>t</b> / &nbsp;<b>f</b> - タグ付けされている友達',
		'ConfShortcuts' : 'キーボードショートカットを有効にする．',
		'ConfSign' : 'プロフィールに星座を表示する（誕生日が提供されている場合）',
		'ConfTopBarFixed' : '画面をスクロールしても上部メニューバーを常に表示し続ける',
		'ConfTopBarHoverOpacity' : 'マウスオーバー時',
		'ConfTopBarOpacity' : '上部メニューバーの透明度',
		'ConfUpdates' : 'FFixerのアップデートを Userscripts.org で毎日確認する．または<a href="#" id="fbfUpdateLink" onclick="return false;">今すぐ確認</a>する．',
		'DownloadVideo' : '動画をダウンロード',
		'ExportICalendarFile' : 'iCalendarファイルをエクスポートする',
		'ExportICalendarFileWarning' : '（友達がたくさんいる場合は多少時間がかかります）',
		'FacebookFixerConflict' : 'Facebook FixerはFFixerに名前が変更されました．<br /><br />名前が変わったために，ブラウザからFacebook Fixerを手動でアンインストールしないと2つのスクリプトが互いにコンフリクトしてしまいます．<br /><br />userscriptをアンインストールするやり方が分からない場合は，<a %s>ここをクリックしてください．（注: 英語）</a>',
		'fullAlbumLoaded' : 'アルバムが全て読み込まれました',
		'Import' : 'インポート',
		'ImportConfirm' : 'これらの設定をインポートしてよろしいですか？\n現在の設定は失われます',
		'ImportFailure' : '設定をインポート中にエラーが発生しました．',
		'ImportSuccess' : 'インポートが完了しました．ページを更新しますか？',
		'Left' : '左',
		'LoadingAllPhotos' : '全ての写真を読み込み中...',
		'loadingFullAlbum' : '全てのアルバムを読み込み中...',
		'LoadingPic' : '画像を読み込み中...',
		'LoadPhotosWarning' : '全ての写真を読み込むには時間がかかるかもしれません',
		'Months' : new Array('1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'),
		'ProtocolSkype' : '%sさんをSkypeで呼び出す',
		'ProtocolMSN' : '%sさんとWindows Liveでチャットする',
		'ProtocolYahoo' : '%sさんとYahoo!メッセンジャーでチャットする',
		'ProtocolGoogle' : '%sさんとGoogleトークでチャットする',
		'ReloadErrorPage' : 'もう一度クリックするか5秒お待ちください',
		'Refresh' : '更新',
		'Remove' : '削除',
		'Right' : '右',
		'ShowBigPictures' : '大きい画像を表示',
		'Signs' : new Array('山羊座','水瓶座','魚座','牡羊座','牡牛座','双子座','蟹座','獅子座','乙女座','天秤座','蠍座','射手座'),
		'today' : '今日',
		'Translators' : '翻訳',
		'UpdateAvailable1' : 'FFixerをアップデートできます．',
		'UpdateAvailable2' : '今すぐアップデートしますか？',
		'UpdateHomepage' : 'ホームページへ',
		'UpdateInstall' : '今すぐインストールする',
		'UpdateTomorrow' : 'また今度インストールする',
		'yearsOld' : '%s歳'
	}
	
}

//
// Get Elements
//
function $(q, root, single) {
	if (root && typeof root == 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

//
// Greasemonkey functions / cross-browser stuff
//

// Figure out what type of storage should be used
var storage = 'none';
try {
	if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
		// Make sure greasemonkey's functions work cause some browsers lie. Yes Chrome/Chromium, I'm talking about you...
		GM_setValue('testkey', 'testvalue');
		if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
	}
} catch(x) {}
if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

//
// Implement JSON functions if they're not already defined - based on http://www.sitepoint.com/blogs/2009/08/19/javascript-json-serialization/
//
if (!this.JSON) {
	JSON = {};
	JSON.stringify = function (obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			if (t == "string") obj = '"'+obj.replace(/"/g,'\\"')+'"';
			return String(obj);
		} else {
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n]; t = typeof(v);
				if (t == "string") v = '"'+v.replace(/"/g,'\\"')+'"';
				else if (t == "object" && v !== null) v = JSON.stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	JSON.parse = function (str) {
		if (str === "") str = '""';
		eval("var p=" + str + ";");
		return p;
	};
}

function setValue(key, value) {
	prefs[key] = value;
	switch (storage) {
		case 'greasemonkey':
			GM_setValue(id+'-'+key, value);
			break;

		case 'localstorage':
			localStorage['fbf-'+id+'-'+key] = value;
			break;
	}
}

function getValue(key, value) {
	switch (storage) {
		case 'greasemonkey':
			return GM_getValue(id+'-'+key, value);

		case 'localstorage':
			var val = localStorage['fbf-'+id+'-'+key];
			if (val=='true') { return true; }
			else if (val=='false') { return false; }
			else if (val) { return val; }
			break;
	}
	return value;
}

function log(str) {
	if (typeof debug !== 'undefined') { debug(str); }
	if (typeof GM_log !== 'undefined') { GM_log(str); return true; }
	else if (typeof console !== 'undefined' && console.log) { console.log(str); return true; }
	return false;
}

function addStyle(css) {
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
}

function getStyle(elm, prop) {
	return window.getComputedStyle(elm, null).getPropertyValue(prop);
}

function registerMenuCommand(name, func) {
	if (typeof GM_registerMenuCommand !== 'undefined') { return GM_registerMenuCommand(name, func); }
}

function xmlhttpRequest(params, callBack) {
	if (typeof GM_xmlhttpRequest !== 'undefined') {
		params['onload'] = callBack;
		return GM_xmlhttpRequest(params);
	}
	return null;
}

function openInTab(url) {
	if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
	else { window.open(url); }
}

function row(cells) { return '<tr><td>' + cells.join('</td><td>') + '</td></tr>'; }


//
// Enable profile-specific settings
//
try {
	var profileLink = $("//ul[@id='pageNav']//a[@accesskey='2']",null,true);
	if (m = profileLink.href.match(/id=(\d+)\b/)) { id = m[1]; }
	else if (m = profileLink.href.match(/\/([^\/]+)$/)) { id = m[1]; }
} catch(x) {}
//log('id = ' + id); // DEBUG ONLY
var buf  =	'ProfilePicPopup,PhotoPopup,ExternalPopup,!DelayPopupPics,PopupAutoClose,!PopupSmartAutoClose,!PopupWhileTagging,BigAlbumPictures,BigAlbumPicturesBorder,!AutoBigAlbumPictures,!AutoLoadFullAlbum,!AutoLoadTaggedPhotos,!DisableTheater,'+
			'Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,!GoogleApps,'+
			'!HomeLeftAlign,!HomeStretch,!HomeStretchMiddleColumn,!HomeLeftColumnFixed,HomeLeftColumn,HomeRightColumn,HomeProfile,HomeNavigation,HomeChat,!HomeChatNames,HomePokes,HomeFindFriends,HomeEvents,HomeRequests,HomeBeta,HomeRecommendations,'+
			'Bookmarks,HomeLink,ProfileLink,LogoutLink,ChatDifferentiate,!ChatHideIdle,DownloadVideo,ErrorPageReload,PageTitle,HideFacebookCountInTitle,!FriendRequestCountInTitle,!NotificationCountInTitle,InboxCountInTitle,NewTabSearch,!SecureLinks,Updates,ProtocolLinks,!TopBarFixed,Shortcuts,!FacebookTimestamps,FBFTimestamps,FBFTimestamps24,'+
			'!HideApplicationStories,!HideEventStories,!HideFriendStories,!HideGroupStories,!HideLikeStories,!HideLinkStories,!HideNoteStories,!HidePhotoStories,!HidePlaceStories,!HideProfilePicStories,!HideRelationshipStories,!HideStatusStories,!HideVideoStories,!HideWallStories,!AutoReadMore,!HideEgos,!HideHovercards';
var booleanOptions = buf.split(',');
var prefs = {
	'FacebookFixerLanguage': getValue('FacebookFixerLanguage', 'auto'),
	'PopupPosition': getValue('PopupPosition', 'auto'),
	'GoogleAppsDomain': getValue('GoogleAppsDomain', ''),
	'TopBarOpacity': getValue('TopBarOpacity', '1.0'),
	'TopBarHoverOpacity': getValue('TopBarHoverOpacity', '1.0'),
	'BottomBarOpacity': getValue('BottomBarOpacity', '0.9'),
	'BottomBarHoverOpacity': getValue('BottomBarHoverOpacity', '1.0'),
	'GoogleLanguage': getValue('GoogleLanguage', 'en'),
	'ProcessInterval': getValue('ProcessInterval', '1000'),
	'DelayPopupPicsTimeout' : getValue('DelayPopupPicsTimeout', '500'),
	'BookmarkList' : getValue('BookmarkList', '[]'),
	'ApplicationWhitelist' : getValue('ApplicationWhitelist', '[]'),
	'CustomFeedModification' : getValue('CustomFeedModification', ''),
	'CustomCSS' : getValue('CustomCSS', '')
}
for (var i=0; i<booleanOptions.length; i++) {
	bool = true;
	if (booleanOptions[i].charAt(0)=='!') {
		booleanOptions[i] = booleanOptions[i].replace('!','');
		bool = false;
	}
	prefs[booleanOptions[i]] = getValue(booleanOptions[i], bool)
}
prefs['HideRead'] = false; // This is broken

//
// Adjust legacy prefs
//
prefs['PopupPosition'] = prefs['PopupPosition'].toLowerCase().replace(/^-/, ''); // The replace is to handle a bug in 2.1.4
setValue('PopupPosition', prefs['PopupPosition']);

//
// Figure out what language we should be using
//
buffer = document.body.className.match(/locale_([^ ]+)/i);
if (prefs['FacebookFixerLanguage'] == 'auto' && buffer) {
	language = buffer[1].toLowerCase();
	detectedLanguage = language;
	if (!lang[language]) {
		language = language.split('_')[0];
		if (!lang[language]) { language = 'en'; }
	}
} else {
	language = prefs['FacebookFixerLanguage'];
}
//log(language); // DEBUG ONLY

//
// Add styles used by script
//
addStyle(
	'.fbfPopup { padding:10px; background:#f6f6f6; border:3px double #666666; -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px; }'+
	'.fbfPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }'+
	'#ff-popup-pic-div { display:none; background:white; border:1px solid #333; position:fixed !important; top:3px !important; padding:4px; min-width:130px; z-index:99999 !important; -moz-border-radius:3px; -webkit-border-radius:3px; -khtml-border-radius:3px; border-radius:3px; }'+
	'.ff-popup-pic-div-left { left:3px !important; right:auto !important; -moz-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:5px 5px 5px rgba(0,0,0,0.6); box-shadow:5px 5px 5px rgba(0,0,0,0.6); }'+
	'.ff-popup-pic-div-right { right:3px !important; left:auto !important; -moz-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); box-shadow:-5px 5px 5px rgba(0,0,0,0.6); }'+
	'#ff-popup-pic-div img { max-height: ' + (window.innerHeight-35) + 'px; }'+
	'#ff-popup-pic-close { display:none; position:absolute; top:4px; right:10px; color:#ff9999; cursor:pointer; font-weight:bold; font-size:14px; }'+
	'#ff-popup-pic-div:hover #ff-popup-pic-close { display:block; }'+
	'#ff-popup-pic-close:hover { color:#aa6666; }'+
	'#ff-popup-pic-image { text-align:center; }'+
	'#ff-popup-pic-image img { color:#999999; display:block; }'+
	'#FBFBigAlbumContainer { padding:0 0 40px; }'+
	'#FBFBigAlbum { padding:15px 3px; margin:10px; text-align:center; position:relative; }'+
	'#FBFBigAlbum a { padding:1px; }'+
	'.FBFBigAlbumClose { color:red; cursor:pointer; font-weight:bold; padding:0 10px; }'+
	'#FBFBigAlbumClose1 { position:absolute; top:0; right:0; }'+
	'#FBFBigAlbumClose2 { position:absolute; bottom:0; right:0; }'+
	'#FBFConfigContainer { z-index:1001; }'+
	'#FBFConfig { width:700px; padding:10px; margin:20px auto 0; }'+
	'#FBFConfig label, #FBFConfig .fbfLabel { color:#666666; font-weight:normal; } '+
	'#FBFConfig .fbfHeader { font-weight:bold; }'+
	'#FBFConfigShadow, #fbfShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.8; }'+
	'#fbfUpdatePopup { max-width:450px; margin:100px auto; padding:10px; }'+
	'.fbfImportant { font-weight:bold; }'+
	'.fbfNote { color:#777777; }'+
	'.fbfRight { text-align:right; }'+
	'.ad_story .social_ad_advert { z-index:0; }'+
	'.ff-album-page td { background:#aaa; text-align:center; }'+
	'#ff-debug td { vertical-align:top; }'+
	'.ffixer-highlighted-story, .ffixer-highlighted-story * { font-weight:bold !important; }'
);
if (prefs['CustomCSS'].length>0) { addStyle(prefs['CustomCSS']); }

//
// Add div for showing big profile pics
//
var popupPicDiv = document.createElement('div');
popupPicDiv.id = 'ff-popup-pic-div';
popupPicDiv.className = 'fbfPopup ff-popup-pic-div-' + (prefs['PopupPosition']=='auto' ? 'left' : prefs['PopupPosition']);
popupPicDiv.innerHTML = '<div id="ff-popup-pic-close" title="' + $l('Close') + '">x</div><div id="ff-popup-pic-image"><span></span></div>';
try {
	document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
	on('click', '#ff-popup-pic-close', function() { document.getElementById('ff-popup-pic-div').style.display='none'; });
} catch(x) {
	var fbppdivAdder = setInterval(function() {
		try {
			document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
			on('click', '#ff-popup-pic-close', function() { document.getElementById('ff-popup-pic-div').style.display='none'; });
			if ($('#ff-popup-pic-div')) { clearInterval(fbppdivAdder); }
		} catch(x) {}
	}, 100);
}
// Listeners are added by the code for showing the popups

//
// Add div for popups and shadows
//
var popupDiv = document.createElement('div');
popupDiv.id = 'fbfPopupContainer';
popupDiv.className = 'fbfPopupContainer';
document.body.appendChild(popupDiv);
on('click', popupDiv, function(e) { if (e.target.id=='fbfPopupContainer') { hidePopup() } });
var shadowDiv = document.createElement('div');
shadowDiv.id = 'fbfShadow';
document.body.appendChild(shadowDiv);

//
// Misc. Short Functions
//

// Get a string in the current language, or default to english
function $l(key,text) {
	var string, l;
	if (lang[language][key]) { string = lang[language][key]; l = language; }
	else { string = lang['en'][key]; l = 'en'}
	if (text) { string = string.replace('%s', text); }
	return string;
}

// Pad with a 0
function $0(x) { return x<10 ? '0'+x : ''+x; }

// Add event listeners
function on(type, elm, func) {
	if (type instanceof Array) { for (var i=0; i<type.length; i++) { on(type[i], elm, func); } }
	else {
		if (elm instanceof Array) { for (var j=0; j<elm.length; j++) { on(type, elm[j], func); } }
		else { (typeof elm === 'string' ? $(elm) : elm).addEventListener(type, func, false); }
	}
}

// Add 'click' event listener
function onClick(elm, func) { (typeof elm === 'string' ? $('#'+elm) : elm).addEventListener('click', func, false); }

// Click on an element
function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initEvent('click', true, true);
	elm.dispatchEvent(evt);
}

// Click on an element selected using xpath
function clickX(path) {
	var elm = $(path, null, true);
	if (!elm) { return false; }
	click(elm);
	return true;
}

// Get an elements position
function getPosition(elm) {
	var x=0;
	var y=0;
	while (elm != null) {
		x += elm.offsetLeft;
		y += elm.offsetTop;
		elm = elm.offsetParent;
	}
	return Array(x,y);
}

// Determine if we're on the home page
function isHomePage() {
	return !!(page.match(/^((\?|home\.php).*)?$/));
}

// Log an error
function logError(category, x) {
	msg = "FBF Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber + ' while viewing ' + page;
	log(msg);
}

// Show a popup div with a shadow background
function showPopup(content, onTop, fixedPosition) {
	$('#fbfPopupContainer').innerHTML = content;
	$('#fbfPopupContainer').style.position = fixedPosition ? 'fixed' : 'absolute';
	$('#fbfShadow').style.zIndex = '1000';
	$('#fbfPopupContainer').style.zIndex = '1001';
	$('#fbfShadow').style.display = 'block';
	$('#fbfPopupContainer').style.display = 'block';
	if (!fixedPosition) { window.scroll(0,0); }
}

// Show a popup dialog - similar to showPopup() but more automated
function showDialog(content, controls, opts) {
	if (!opts) { opts=''; }
	if (!controls) { controls=''; }
	if (!opts.match(/\bnocontrols\b/)) { content+= '<div style="border-top:1px solid #ccc; margin-top:10px; padding-top:10px; text-align:right;">' + controls + (opts.match(/\bnoclose\b/) ? '' : '<input type="button" value="' + $l('Close') + '" id="ff-popup-close" />') + '</div>'; }
	showPopup('<div class="fbfPopup" style="' + (opts.match(/\bsmall\b/) ? 'max-width:450px; margin:80px auto;' : 'max-width:700px; margin:30px auto;') + '">' + content + '</div>');
	if (!opts.match(/\b(noclose|nocontrols)\b/)) { onClick($('#ff-popup-close'), hidePopup); }
}

// Hide popups created with showPopup()
function hidePopup() {
	if ($('#fbfPopupContainer')) {
		$('#fbfPopupContainer').style.display = 'none';
		$('#fbfShadow').style.display = 'none';
	}
}

// Figure out the month from a string containing a date
function $m(str) {
	// Supports: English (UK+US), Spanish, French, German, Dutch, Italian, Portuguese (Brazil+Portugal), Swedish, Greek, Serbian, Bulgarian, Slovak, Czech
	str = str.toLowerCase();
	var months = new Array (/^(.*\s)?(jan(uar[iy]?)?|enero|janvier|gennaio|janeiro|ιανουαρίου|јануар|януари|januára|leden)(\s.*)?$/,
							/^(.*\s)?(feb(ruar[iy]?)?|febrero|février|febbraio|fevereiro|φεβρουαρίου|фебруар|февруари|februára|únor)(\s.*)?$/,
							/^(.*\s)?(mar(ch)?|marzo|mars|märz|maart|março|μαρτίου|март|marca|březen)(\s.*)?$/,
							/^(.*\s)?(apr(ile?)?|abril|avril|απριλίου|април|apríla|duben)(\s.*)?$/,
							/^(.*\s)?(ma(yo?|i|j)|mei|maggio|maio|μαΐου|мај|май|mája|květen)(\s.*)?$/,
							/^(.*\s)?(june?|junio?|juin|giugno|junho|ιουνίου|јун|юни|júna|červen)(\s.*)?$/,
							/^(.*\s)?(jul[iy]?|julio|juillet|luglio|julho|ιουλίου|јул|юли|júla|červenec)(\s.*)?$/,
							/^(.*\s)?(aug(ust(i|us)?)?|agosto|août|αυγούστου|август|augusta|srpen)(\s.*)?$/,
							/^(.*\s)?(sep(tember)?|septiembre|se[pt]tembre|setembro|σεπτεμβρίου|септембар|септември|septembra|září)(\s.*)?$/,
							/^(.*\s)?(o[ck]t(ober)?|oct[ou]bre|ottobre|outubro|οκτωβρίου|октобар|октомври|októbra|říjen)(\s.*)?$/,
							/^(.*\s)?(nov(ember)?|noviembre|novembre|novembro|νοεμβρίου|новембар|ноември|novembra|listopad)(\s.*)?$/,
							/^(.*\s)?(de[cz](ember)?|dici?embre|décembre|dezembro|δεκεμβρίου|децембар|декември|decembra|prosinec)(\s.*)?$/);
	for (var i=0; i<months.length; i++) {
		if (str.match(months[i])) { return i; }
	}
	return -1;
}

// Parse a date
function $d(str) {
	str = ' ' + str.toLowerCase() + ' ';
	var m;
	var date = new Date();
	if (str.indexOf('tomorrow')!=-1) { date = date.getNextDay(); }
	else if (str.indexOf('today')==-1) {
		var month = $m(str);
		if (month==-1) return null;
		date.setMonth(month);
		if (m = str.match(/\b(\d{4})\b/)) { date.setYear(m[1]); }
		if (m = str.match(/\s(\d\d?\.?)[\s,]/)) { if (m[1]<32) { date.setDate(m[1]); } }
	}
	if (m = str.match(/\b(\d\d?):(\d\d)( (a|p)m)?/i)) {
		date.setHours(m[4]=='p' ? m[1]-0+12 : m[1]);
		date.setMinutes(m[2]);
		date.setSeconds(0);
	}
	return date;
}


//
// Rotate an object
//
function rotate(elm) {
	degrees=((elm.getAttribute('data-ff-degrees') || 0) - 0 + 90 ) % 360;
	elm.setAttribute('data-ff-degrees', degrees);
	elm.style.margin = '25px 0';
	elm.style.transform = 'rotate(' + degrees + 'deg)';
	elm.style.MozTransform = 'rotate(' + degrees + 'deg)';
	elm.style.OTransform = 'rotate(' + degrees + 'deg)';
	elm.style.WebkitTransform = 'rotate(' + degrees + 'deg)';
}


//
// Google Translate functions
//
function handleTranslateRequest() { showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translating...</b> (press escape to close this popup)</div>', true, true); }
function handleTranslateResponse(r) {
	//window.alert(r.responseText);
	//window.alert(r.responseText.match(/^\[(\[.*?\]\])/)[1]);
	//t = JSON.parse(r.responseText.replace('],,"', '],"","'));
	t = JSON.parse(r.responseText.match(/^\[(\[.*?\]\])/)[1]);
	translated = Array();
	for (var i=0; i<t.length; i++) { translated.push(t[i][0]); }
	showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translated Text via Google Translate</b> (automatically translated to ' + prefs['GoogleLanguage'] + '):<br /><br />' + translated.join(' ') + '<div style="text-align:right;"><input id="fbfCloseTranslation" type="button" value="' + $l('Close') + '" /></div></div>', true, true);
	onClick('fbfCloseTranslation', function() { hidePopup(); });
}
function googleTranslate(str) {
	if (typeof GM_xmlhttpRequest !== 'undefined') {
		handleTranslateRequest();
		xmlhttpRequest({method: "GET", url: "http://translate.google.com/translate_a/t?client=t&text=" + window.getSelection() + "&sl=auto&tl=" + prefs['GoogleLanguage']}, handleTranslateResponse);
	} else {
		window.open('http://translate.google.com/?sl=auto&tl=' + prefs['GoogleLanguage'] + '&text=' + window.getSelection());
	}
}


//
// Detect Facebook Fixer
//
if (id!=0) {
	setTimeout(function() {
		if ($('#FBPPdiv') && (true || parseInt(getValue("LastConflictCheck", "0")) + 86400000 <= (new Date().getTime()))) {
			setValue('LastConflictCheck', new Date().getTime() + "");
			showDialog('<div class="fbfImportant">FFixer</div><br />' + $l('FacebookFixerConflict', 'href="http://www.code-poet.net/userscripts/ffixer/upgrading-from-facebook-fixer.html" target="_blank"'), '', 'small');
		}
	}, 2000);
}


//
// Debug Info
//
function showDebugInfo() {
	try {
		showDialog(
			'FFixer Debug Info:<br /><br />'+
			'<table id="ff-debug">'+
			row(['version: ',version])+
			row(['release date: ',release_date])+
			row(['release timestamp: ',version_timestamp])+
			row(['id: ',id])+
			row(['page: ',page])+
			row(['homepage: ',(isHomePage()?'yes':'no')])+
			row(['language: ',language])+
			row(['detected language: ',detectedLanguage])+
			row(['storage: ',storage])+
			row(['date: ',new Date()])+
			row(['user agent: ',navigator.userAgent])+
			'</table>'
		);
	} catch(x) { logError('Debug Info', x); }
}


//
// Keyboard shortcuts
//
if (prefs['Shortcuts']) {
	window.addEventListener('keydown', function(e) {
		//log(String.fromCharCode(e.keyCode) + ' - ' + e.keyCode + ' - ' + e.shiftKey + ' - ' + e.ctrlKey + ' - ' + e.altKey + ' - ' + e.metaKey); // DEBUG ONLY
		if ((e.target.type && e.target.type!='checkbox' && e.target.type!='select') || (e.target.getAttribute('contenteditable')=='true') || e.ctrlKey || e.altKey || e.metaKey) { return; }
		function clickLink(filter, root) {
			var link;
			if (!root) { root = document; }
			if (filter.charAt(0) == ':') { return clickX("//a[contains(@href,'" + filter.replace(/^./,'') + "')]"); }
			return clickX("//a[contains(string(),'"+filter+"')]");
		}
		function gotoPage(url, preventClick) {
			url = url.replace(/^https?:\/\/www\.facebook\.com/, '');
			if (unsafeWindow && unsafeWindow.Quickling) {
				if (location.href.toLowerCase().match(/^https?:\/\/www\.facebook\.com\//)) { location.hash = '!'+url; }
				else if (preventClick || !clickLink(':' + url)) { location.href = location.protocol + '//www.facebook.com' + url; }
			} else { location.href = location.protocol + '//www.facebook.com' + url; }
		}
		function gotoPageX(path) {
			var xElm = $(path,null,true);
			if (xElm) { gotoPage(xElm.href, true); }
			//else { log('"' + path + '" could not be resolved'); } // debug
		}
		if (e.keyCode==27) {
			if (document.getElementById('fbfPopupContainer')) { document.getElementById('fbfPopupContainer').style.display = 'none'; }
			if (document.getElementById('fbfShadow')) { document.getElementById('fbfShadow').style.display = 'none'; }
			if (prefs['PhotoPopup'] || prefs['ProfilePicPopup']) { document.getElementById('ff-popup-pic-div').style.display='none'; }
		}
		else if (e.keyCode==16 || e.keyCode==17 || e.keyCode==18) {}
		else if (e.keyCode==191) { if (e.shiftKey) { showDebugInfo(); } } // ?
		else if (e.shiftKey) {
			switch(e.keyCode) {
				case 37: clickLink('First'); break; // Left Arrow
				case 39: clickLink('Last'); break; // Right Arrow
				case 65: gotoPage('/?sk=media'); break; // A
				case 66: click($("//*[@id='fbDockChatBuddylistNub']/a",null,true)); break; // B
				case 67: if (isHomePage() || !(page=='' || page.match(/^index.php/) || page.match(/^login.php/) || page.match(/^logout.php/))) { showConfig(); } break; // C
				case 68: gotoPage('/?sk=bd'); break; // D
				case 69: gotoPage('/?sk=events'); break; // E
				case 70: gotoPage('/friends/?filter=afp'); break; // F
				case 72: gotoPage('/home.php'); break; // H
				case 73: gotoPage('/?sk=messages'); break; // I
				case 75: click($('#ff-add-bookmark')); break; // K
				case 76: click($('#navAccountLink')); $('//form[@id="logout_form"]//input[@type="submit"]', null, true).focus(); break; // L
				case 78: gotoPage('/notifications.php'); break; // N
				case 80: window.location.href = 'http://www.facebook.com/' + (id.match(/^\d+$/) ? 'profile.php?id='+id+'&ref=profile' : id); break // P
				case 82: gotoPage('/reqs.php'); break; // R
				case 83: e.stopPropagation(); e.preventDefault(); document.getElementById('q').focus(); break; // S
				case 84: if (window.getSelection()!='') { googleTranslate(window.getSelection()); } break; // T
				case 86: gotoPage('/?sk=video'); break; // V
			}
		}
		else {
			if (page.indexOf('photo.php')==0) {
				switch(e.keyCode) {
					case 82: rotate($('#myphoto')); break; // r
				}
			} else if (page.indexOf('/photos/')!=-1) {
				switch(e.keyCode) {
					case 65: // a
					case 82: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=recent'; break; // r
					case 77: // m
					case 85: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=mobile'; break; // u
					case 84: // t
					case 70: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=tagged'; break; // f
					case 67: clickLink('Photo Comments'); break; // c
					case 79: clickLink('Photos of Me'); break; // o
					case 80: clickLink('My Photos'); break; // p
				}
			}
			else if (isHomePage()) {
				switch(e.keyCode) {
					case 65: gotoPage('/home.php?filter=pp'); break; // a
					case 70: gotoPage('/home.php?filter=nf'); break; // f
					case 71: gotoPage('/home.php?filter=app_2361831622'); break; // g
					case 76: gotoPage('/home.php?filter=app_2309869772'); break; // l
					case 78: gotoPage('/home.php?filter=h'); break; // n
					case 80: gotoPage('/home.php?filter=app_2305272732'); break; // p
					case 83: gotoPage('/home.php?filter=app_2915120374'); break; // s
					case 84: gotoPage('/home.php?filter=app_2347471856'); break; // t
					case 85: gotoPage('/home.php?filter=app_2915120374'); break; // u
					case 86: gotoPage('/home.php?filter=app_2392950137'); break; // v
				}
			}
			else {
				switch(e.keyCode) {
					case 66: clickLink($l('ShowBigPictures')); break; // b
					case 67: if (!clickLink('View Comments')) { if (!clickLink('Photo Comments')) { clickLink('Comments on Photos'); } } break; // c
					case 73: gotoPageX('//a[contains(@href,"v=info")][not(contains(@href,"edit"))]'); break; // i
					case 80: gotoPageX("//a[contains(@href,'v=photos')]"); break; // p
					case 87: gotoPageX("//a[contains(@href,'v=wall')]");  break; // w
					case 88: gotoPageX("//a[contains(@href,'v=box')]");  break; // x
				}
			}
			if (page.match(/^profile\.php\?.*photos/) && e.keyCode==77) { clickLink('and Me ('); }
			switch(e.keyCode) {
				case 37: if (clickLink('Prev')==-1) { clickLink('prev'); }  break; // Left Arrow
				case 39: if (clickLink('Next')==-1) { clickLink('next'); } break; // Right Arrow
				case 75: gotoPageX('//a[contains(@href,"album.php")][not(contains(@href,"page="))]'); break; // k
				case 65: click(document.getElementById('FBFLoadAllPhotos')); break; // a
			}
		}
	}, false);
}


//
// Allow script configuration
//
registerMenuCommand($l('ConfigureFacebookFixer'), showConfig);
if (menu = $('//li[@id="navAccount"]/ul',null,true)) {
	var configLink = document.createElement('li');
	configLink.innerHTML = '<a id="fbfConfigMenuLink" href="#" onclick="return false;">' + $l('ConfigureFacebookFixer') + '</a>';
	menu.insertBefore(configLink, menu.childNodes[2]);
	on('click', '#fbfConfigMenuLink', showConfig);
}
addStyle(
	'#fbfConfigContainer { width:100%; }'+
	'#fbfConfigTabs { width:200px; vertical-align:top; }'+
	'#fbfConfigTabs div { background:white; color:background:#3b5998; padding:10px 0 10px 10px; border:1px solid #cccccc; border-top-width:0; cursor:pointer; }'+
	'#fbfConfigTabs div#fbfConfigTab-0 { border-top-width:1px; }'+
	'#fbfConfigTabs div:hover { font-weight:bold; }'+
	'#fbfConfigTabs div.fbfConfigSelectedTab { background:#3b5998; color:white; font-weight:bold; }'+
	'#fbfConfigControls { background:white; border:1px solid #cccccc; vertical-align:top; }'+
	'#fbfConfigControls div { display:none; padding:5px 5px 5px 23px; }'+
	'#fbfConfigControls div.fbfConfigSelectedControl { display:block; }'+
	'#fbfConfigControls input[type=checkbox] { margin-left:-18px; margin-bottom:8px; }'
);
function showConfig() {
	var opacitySelect = '';
	for (i=100; i>=0; i-=10) { opacitySelect=opacitySelect+'<option value="' + (i==100?'1.0':'0.'+(i/10)) + '">' + (100-i) + '%</option>'; }
	function makeOpacitySelector(id1, id2) { return '<tr><td><span class="fbfLabel">' + $l('Conf'+id1) + '</span></td><td><select id="fbfConf' + id1 + '">' + opacitySelect + '<option value="-1">' + $l('Remove') + '</option></select> &nbsp; &nbsp;<span class="fbfLabel">' + $l('Conf'+id2) + '</span> &nbsp;<select id="fbfConf' + id2 + '">' + opacitySelect + '</select></td></tr>'; }
	function makeCheckBoxes(ids, prefix) {
		if (!prefix) { prefix = ''; }
		ids = ids.split(',');
		for (var i=0, buf=''; i<ids.length; i++) { buf = buf + prefix + '<input type="checkbox" id="fbfConf' + ids[i] + '" /><label for="fbfConf' + ids[i] + '">' + $l('Conf'+ids[i]) + '</label><br />'; }
		return buf;
	}
	function makeNumberInputs(ids) {
		ids = ids.split(',');
		for (var i=0, buf = ''; i<ids.length; i++) { buf = buf + $l('Conf'+ids[i]) + '<br /><input type="text" id="fbfConf' + ids[i] + '" value="' + prefs[ids[i]] + '" /><br />'; }
		return buf;
	}
	showPopup('<div id="FBFConfig" class="fbfPopup">'+
		'<div style="text-align:center;"><span class="fbfImportant">' + $l('ConfigureFacebookFixer') + '</span><br /><span class="fbfNote">(FFixer ' + version + ' - ' + release_date + ' - ' + id + ')</span></div><br />'+
		$l('ConfigureInstructions') + '<br />'+
		'<br />'+
		'<table id="fbfConfigContainer">'+
			'<tr><td id="fbfConfigTabs">'+
					'<div id="fbfConfigTab-0" class="fbfConfigSelectedTab">' + $l('ConfSectionHomePage') + '</div>'+
					'<div id="fbfConfigTab-1">' + $l('ConfSectionFeeds') + '</div>'+
					'<div id="fbfConfigTab-2">' + $l('ConfSectionPictures') + '</div>'+
					'<div id="fbfConfigTab-3">' + $l('ConfSectionEvents') + '</div>'+
					'<div id="fbfConfigTab-4">' + $l('ConfSectionMenu') + '</div>'+
					'<div id="fbfConfigTab-5">' + $l('ConfSectionPageTitle') + '</div>'+
					'<div id="fbfConfigTab-6">' + $l('ConfSectionShortcuts') + '</div>'+
					'<div id="fbfConfigTab-7">' + $l('ConfSectionOther') + '</div>'+
					'<div id="fbfConfigTab-8">' + $l('ConfSectionImportExport') + '</div>'+
					'<div id="fbfConfigTab-9">' + $l('ConfSectionAdvanced') + '</div>'+
					'<div id="fbfConfigTab-10">' + $l('ConfSectionAbout') + '</div>'+
			'</td><td id="fbfConfigControls">'+
				'<div id="fbfConfigControl-0" class="fbfConfigSelectedControl">'+
					makeCheckBoxes('HomeStretch,HomeStretchMiddleColumn,HomeLeftAlign,HomeLeftColumnFixed,HomeLeftColumn')+
					makeCheckBoxes('HomeProfile,HomeNavigation,HomeChat', ' &nbsp; &nbsp; ') +
					makeCheckBoxes('HomeChatNames', ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;') +
					makeCheckBoxes('HomeRightColumn') +
					makeCheckBoxes('HomeEvents,HomeRecommendations,HomeRequests,HomePokes,HomeFindFriends,HomeBeta', ' &nbsp; &nbsp; ') +
				'</div>'+
				'<div id="fbfConfigControl-1">'+
					makeCheckBoxes('HideApplicationStories,HideEventStories,HideFriendStories,HideGroupStories,HideLikeStories,HideLinkStories,HideNoteStories,HidePhotoStories,HidePlaceStories,HideProfilePicStories,HideRelationshipStories,HideStatusStories,HideVideoStories,HideWallStories') +
					'<br />' + $l('ConfApplicationWhitelist') + '<br /><textarea id="fbfConfApplicationWhitelist" style="width:400px; height:150px;"></textarea>' +
				'</div>'+
				'<div id="fbfConfigControl-2">'+
					makeCheckBoxes('ProfilePicPopup,PhotoPopup,ExternalPopup,DelayPopupPics,PopupAutoClose,PopupSmartAutoClose,PopupWhileTagging,BigAlbumPictures')+
					makeCheckBoxes('BigAlbumPicturesBorder', '&nbsp; &nbsp; ')+
					makeCheckBoxes('AutoBigAlbumPictures,AutoLoadFullAlbum,AutoLoadTaggedPhotos,DisableTheater') +
					'<span class="fbfLabel">' + $l('ConfPopupPosition') + ': </span><input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-auto" value="auto" /><label for="fbfConfPopupPosition-auto">' + $l('Automatic') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-left" value="left" /><label for="fbfConfPopupPosition-left">' + $l('Left') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-right" value="right" /><label for="fbfConfPopupPosition-right">' + $l('Right') + '</label><br />'+
				'</div>'+
				'<div id="fbfConfigControl-3">'+
					makeCheckBoxes('Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,GoogleApps') +
					$l('ConfGoogleAppsDomain') + ': <input id="fbfConfGoogleAppsDomain"></input><br />'+
				'</div>'+
				'<div id="fbfConfigControl-4">'+
					makeCheckBoxes('ChatHideIdle,ChatDifferentiate,Bookmarks,LogoutLink,HomeLink,ProfileLink,TopBarFixed') +
					'<table style="margin-left:-3px;">' +
					makeOpacitySelector('TopBarOpacity', 'TopBarHoverOpacity') +
					makeOpacitySelector('BottomBarOpacity', 'BottomBarHoverOpacity') +
					'</table>' +
				'</div>'+
				'<div id="fbfConfigControl-5">'+
					makeCheckBoxes('PageTitle,HideFacebookCountInTitle,FriendRequestCountInTitle,InboxCountInTitle,NotificationCountInTitle') +
				'</div>'+
				'<div id="fbfConfigControl-6">'+
					makeCheckBoxes('Shortcuts') + '<br />' + $l('ConfShortcutList')+
				'</div>'+
				'<div id="fbfConfigControl-7">'+
					makeCheckBoxes('DownloadVideo,ProtocolLinks,ErrorPageReload,NewTabSearch,SecureLinks,AutoReadMore,HideHovercards,FacebookTimestamps,FBFTimestamps,FBFTimestamps24,Updates') +
					'<table style="margin-left:-3px;">' +
					'<tr><td><span class="fbfLabel">' + $l('ConfFacebookFixerLanguage') + ':</span></td><td><select id="fbfConfFacebookFixerLanguage" style="padding:0; margin-top:3px;"><option value="auto">' + $l('Automatic') + '</option><option value="cs">Čeština (Czech)</option><option value="sr_rs">Српски (Serbian - Cyrillic)</option><option value="da">Dansk (Danish)</option><option value="el">Ελληνικά (Greek)</option><option value="en">English</option><option value="es">Español (Spanish)</option><option value="fr">Français (French)</option><option value="de">Deutsch (German)</option><option value="it">Italiano (Italian)</option><option value="id">Bahasa Indonesia (Indonesian)</option><option value="mk">македонски јазик (Macedonian)</option><option value="nl">Nederlands (Dutch)</option><option value="nb">Norsk (Norwegian)</option><option value="sk">Slovenčina (Slovak)</option><option value="sr">Srpski (Serbian - Latin)</option><option value="vi">Tiếng Việt (Vietnamese)</option><option value="tr">Türkçe (Turkish)</option><option value="bg">Български (Bulgarian)</option><option value="zh_tw">中文(台灣) (Chinese - Taiwan)</option><option value="ko">한국어 (Korean)</option><option value="ja">日本語 (Japanese)</option></select></td></tr>'+
					'<tr><td><span class="fbfLabel">' + $l('ConfGoogleLanguage') + ':</span></td><td><select id="fbfConfGoogleLanguage" style="padding:0; margin-top:3px;"><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese (Simplified)</option><option value="zh-TW">Chinese (Traditional)</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="ht">Hatian Creole</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="ko">Korean</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="ms">Malay</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option></select></td></tr>'+
					'</table>' +
				'</div>'+
				'<div id="fbfConfigControl-8">'+
					(typeof JSON == 'undefined' ? $l('BrowserUnsupported') : $l('ConfExport') + '<br />' + $l('ConfImport') + '<br /><br /><textarea id="fbfPrefsJSON" style="width:425px; height:200px;" onmouseover="this.focus();this.select()">' + JSON.stringify(prefs, null, "\n") + '</textarea><br /><input type="button" id="fbfImport" value="' + $l('Import') + '" />')+
				'</div>'+
				'<div id="fbfConfigControl-9">'+
					makeNumberInputs('ProcessInterval,DelayPopupPicsTimeout')+
					makeCheckBoxes('HideEgos')+
					'<br /><input type="button" id="fbfAnalyzeLocalization" value="Analyze Localization" />'+
					'<br /><br />Custom Feed Modification (<a href="http://www.code-poet.net/userscripts/ffixer/ffixer-guide.html#custom-feed-modification" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomFeedModification" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom Feed Modification" id="SaveCustomFeedModification" />'+
					'<br /><br />Custom CSS (<a href="http://www.code-poet.net/userscripts/ffixer/ffixer-guide.html#custom-css" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomCSS" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom CSS" id="SaveCustomCSS" />'+
				'</div>'+
				'<div id="fbfConfigControl-10">'+
					'<span xmlns:dc="http://purl.org/dc/elements/1.1/" property="dc:title"><a href="http://www.code-poet.net/userscripts/facebook-fixer/index.html" target="_blank">FFixer</a></span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Vaughan Chandler</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.<br /><br />Facebook is a registered trademark of Facebook, Inc.<br />FFixer is not related to or endorsed by Facebook, Inc. in any way.<br /><br /><a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0;" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><br /><b>' + $l('Translators') + ':</b><ul><li>Acedia.Liu - Chinese (Taiwan)</li><li>Caken - Czech</li><li>Connum - German</li><li>dnbace - Bulgarian</li><li>DoSMaN - Greek</li><li>Eilif Nordseth - Norwegian</li><li>Glen Farmer - Spanish</li><li>Goce Manevski - Macedonian</li><li>Gökhan Gurbetoğlu - Turkish</li><li>Gorgeous - Italian</li><li>Gorštak - Serbian (Cyrillic and Latin)</li><li>HeartRipper - Italian</li><li>Larissa van Sunder - Dutch</li><li>Mads Jensen - Danish</li><li>Masami HIRATA - Japanese</li><li>Neo - Spanish</li><li>Peter Miksik - Slovak</li><li><li>Serge Thiry - French</li><li>Sindhu Pripamungkas - Indonesian</li><li>Trần Đức Thịnh - Vietnamese</li><li>박상빈 - Korean</li></ul>'+
				'</div>'+
			'</td></tr>'+
		'</table>'+
		'<br /><hr /><div style="float:left; padding-top:8px;"><a href="http://www.code-poet.net/userscripts/facebook-fixer/index.html">' + $l('UpdateHomepage') + '</a></div><div style="text-align:right;"><input type="button" value="' + $l('Refresh') + '" onclick="location.reload();" /> <input type="button" id="fbfCloseConfig" value="' + $l('Close') + '" /></div>'+
		'</div>', true
	);
	// Add the listener for the close button - if nothing else we should be able to close the popup
	onClick('fbfCloseConfig', function() { hidePopup(); });

	try {

		// Update fields to match current settings and listen for changes in checkboxes
		for (var i=0; i<booleanOptions.length; i++) {
			if (prefs[booleanOptions[i]]) { $('#fbfConf'+booleanOptions[i]).checked='checked'; }
			on('click', '#fbfConf'+booleanOptions[i], function(e) {
				setValue(e.target.id.replace('fbfConf',''), e.target.checked);
				prefs[e.target.id.replace('fbfConf','')] = e.target.checked;
			});
		}
		$('#fbfConfPopupPosition-' + prefs['PopupPosition']).checked='checked';
		var positions = new Array('auto','left','right');
		var opacities = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity');
		for (var i=0; i<opacities.length; i++) { $('#fbfConf'+opacities[i]).value = prefs[opacities[i]]; }
		$('#fbfConfGoogleAppsDomain').value = prefs['GoogleAppsDomain'];
		$('#fbfConfGoogleLanguage').value = prefs['GoogleLanguage'];
		$('#fbfConfFacebookFixerLanguage').value = prefs['FacebookFixerLanguage'];
		$('#fbfConfApplicationWhitelist').value = JSON.parse(prefs['ApplicationWhitelist']).sort().join(' ');
		$('#fbfConfCustomFeedModification').value = prefs['CustomFeedModification'];
		$('#fbfConfCustomCSS').value = prefs['CustomCSS'];

		// Listen for changes
		
		on('click', '#fbfConfigTabs', function(e) {
			var current = e.target;
			if (current.tagName=='DIV' && current.className != 'fbfConfigSelectedTab') {
				var previous = $('.fbfConfigSelectedTab')[0];
				previous.className='';
				$('#fbfConfigControl-' + previous.id.match(/-(\d+)/)[1]).className = '';
				current.className = 'fbfConfigSelectedTab';
				$('#fbfConfigControl-' + current.id.match(/-(\d+)/)[1]).className = 'fbfConfigSelectedControl';
			}
		});
		
		for (var i=0; i<positions.length; i++) {
			on('click', '#fbfConfPopupPosition-'+positions[i], function(e) {
				setValue('PopupPosition', e.target.id.replace('fbfConfPopupPosition-',''));
				e.target.blur();
			});
		}
		
		on('keyup', '#fbfConfGoogleAppsDomain', function(e) {
				setValue('GoogleAppsDomain', e.target.value);
				prefs['GoogleAppsDomain'] = e.target.value;
		});
		
		on(Array('blur','keyup'), '#fbfConfApplicationWhitelist', function(e) {
				e.target.value = e.target.value.replace(/^\s+/g, '').replace(/\s*[^\d\s]/g, ' ').replace(/(\s)\s+(\S)/, '$1$2');
				var awl = JSON.stringify(e.target.value.replace(/^\s+|\s+$/g, '').split(/\s+/).sort());
				if (awl == '[""]') { awl = '[]'; }
				setValue('ApplicationWhitelist', awl);
				prefs['ApplicationWhitelist'] = awl;
		});
		
		on('click', '#fbfUpdateLink', function() { FBFUpdateCheck(true); });
		
		on('click', '#fbfImport', function() {
			if (window.confirm($l('ImportConfirm'))) {
				try {
					var importing = JSON.parse($('#fbfPrefsJSON').value);
					for (var key in importing) {
						log(key + ' => ' + importing[key]);
						setValue(key, importing[key]);
					}
					if (window.confirm($l('ImportSuccess'))) { location.reload(); }
				} catch(x) {
					logError('Import/Export', x);
					window.alert($l('ImportFailure'));
				}
			}
		});
		
		on('click', '#SaveCustomFeedModification', function() { setValue('CustomFeedModification', $('#fbfConfCustomFeedModification').value); });
		
		on('click', '#SaveCustomCSS', function() { setValue('CustomCSS', $('#fbfConfCustomCSS').value); });
		
		on('click', '#fbfAnalyzeLocalization', function() {
			var analysis = [];
			for (var key in lang.en) {
				var missing = !lang[language][key];
				var string = missing ? $l(key) : lang[language][key];
				if (typeof string == 'string') { string = "'" + string.toString().replace("'", "\\'").replace(/\n/g, "\\n") + "'"; }
				else {
					var buffer = [];
					for (var i=0; i<string.length; i++) { buffer.push("'" + string[i].replace("'", "\\'").replace(/\n/g, "\\n") + "'"); }
					string = "new Array(" + buffer.join(",") + ")";
				}
				analysis.push((missing ? '/**/' : '') + "		'" + key + "' : " + string);
			}
			showDialog(
				'<div style="margin-bottom:9px;">Below are the strings for the ' + $l('_language') + ' localization.' + (language=='en' ? ' You can use them for starting a new localization.' : '<br />Obsolete strings have been removed, and strings requiring translation have /**/ at the start of the line.') + '</div>'+
				'<textarea style="height:600px; width:694px; padding:2px;" onmouseover="this.focus(); this.select();" wrap="off" readonly="yes">' + analysis.join(',\n') + '</textarea>'
			);
		});
		
		var selects = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity','FacebookFixerLanguage','GoogleLanguage');
		for (var i=0; i<selects.length; i++) {
			on('change', '#fbfConf'+selects[i], function(e) {
				setValue(e.target.id.replace(/^fbfConf/,''),e.target.options[e.target.selectedIndex].value);
				e.target.blur();
			});
		}

		var numberInputs = new Array('ProcessInterval','DelayPopupPicsTimeout');
		for (var i=0; i<numberInputs.length; i++) {
			on('keyup', '#fbfConf'+numberInputs[i], function(e) {
				try {
					var val = parseInt(e.target.value);
					setValue(e.target.id.replace(/^fbfConf/,''), val);
				} catch(x){}
			});
		}

	} catch(x) { logError('Config Popup', x); }

	window.scroll(0,0);
}

//
// Check for Updates (very modified, originally based on code by Jarett - http://userscripts.org/users/38602)
//
var updateForced;
function FBFUpdateCheck(forced) {
	if((forced)||(parseInt(getValue("LastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {
		updateForced = forced;
		// new: http://userscripts.org/scripts/source/8861.meta.js old: http://userscripts.org/scripts/review/8861
		try { xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/source/8861.meta.js?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'}}, handleUpdateResponse); }
		catch (err) { if (forced) { alert("An error occurred while checking for updates:\n" + err); } }
	}
}
function handleUpdateResponse(r) {
	setValue('LastUpdate', new Date().getTime() + "");
	if (r.responseText.match(/@timestamp\s+(\d+)/)[1] > version_timestamp) { showUpdatePopup(); }
	else if (updateForced) { alert("No update is available for FFixer."); }
}
if (prefs['Updates']) { FBFUpdateCheck(false); }
function showUpdatePopup() {
	showDialog(
		$l('UpdateAvailable1') + '<br /><br /><div class="fbfNote">' + $l('UpdateAvailable2') + '</div>',
		'<input type="button" value="' + $l('UpdateInstall') + '" id="fbfUpdateInstall" /> '+
		'<input type="button" value="' + $l('UpdateHomepage') + '" id="fbfUpdateHomepage" /> '+
		'<input type="button" value="' + $l('UpdateTomorrow') + '" id="fbfUpdateTomorrow" /></div>',
		'small,noclose'
	);
	onClick('fbfUpdateInstall', function() { openInTab('http://userscripts.org/scripts/source/8861.user.js'); hidePopup(); });
	onClick('fbfUpdateHomepage', function() { window.open('http://userscripts.org/scripts/show/8861'); hidePopup(); });
	onClick('fbfUpdateTomorrow', hidePopup);
}


//
// Load thumbnails for entire album
//
function loadFullAlbum() {
	try {
		if (m = $('.summary')[0].textContent.split('|')[0].match(/(\d+)/g)) {
			m = m.sort(function(a,b){return a-b});
			totalImagePages = Math.ceil(m[2]/20);
			if (n=page.match(/page=(\d)/)) { thisPageNumber=n[1]; } else { thisPageNumber=1; }
			albumPagesLoaded = 0;
			totalAlbumPages = totalImagePages-1;
			$('#fbf_photo_pagination').innerHTML = '<span class="caption">' + $l('loadingFullAlbum') + '<span></span></span>';
			for (var i=1; i<totalImagePages+1; i++) {
				if (i!=thisPageNumber) {
					appendPhotos('http://www.facebook.com/' + (page.indexOf('page=')!=-1 ? page.replace(/page=\d+/,'page='+i) : page+'&page='+i) + '&quickling', $l('fullAlbumLoaded'));
				}
			}
		}
	} catch(x) { logError('Load Full Album', x); }
}


//
// Load tagged thumbnails
//
function loadTaggedPhotos() {
	try {
		if (m = $('.caption')[0].textContent.split('|')[0].replace(',','').match(/(\d+)/g)) {
			$('#fbf_photo_pagination').innerHTML = '<span class="caption">' + $l('LoadingAllPhotos') + '<span></span></span>';
			totalImagePages = Math.ceil(m[m.length-1]/15);
			albumPagesLoaded = 0;
			totalAlbumPages = totalImagePages-1;
			var thisPhoto = 0;
			if (m = page.match(/so=(\d+)/)) { thisPhoto = m[1]; }
			for (var i=0; i<totalImagePages; i++) {
				if (i*15!=thisPhoto) {
					appendPhotos('http://www.facebook.com/' + page.replace(/&so=\d+/,'') + '&so=' + (i*15), '<span class="caption">' + $l('AllPhotosLoaded') + '</span>');
				}
			}
		}
	} catch(x) { logError('Load Tagged Photos', x); }
}


//
// Add thumbnails from the specified URL
// (Abilities to show pictures in correct order, with the album page number and link displayed are based heavily on code by MysticMetal)
//
var photoTableRegex = /UIPhotoGrid_Table[^>]+>(.*?)<\\\/table/;
function appendPhotos(url, completeMessage) {
	var pageNum = (m=url.match(/\bso=(\d+)/)) ? m[1]/15+1 : url.match(/\bpage=(\d+)/)[1];
	var albumURL = (url.replace(/&quickling/, '') + '').replace(/&/g,'&amp;');
	var albumPageIdentifier = pageNum + '-' + (new Date().getTime());
	var tbody = $('.UIPhotoGrid_Table')[0]
	tbody.innerHTML = tbody.innerHTML + '<tbody><tr class="ff-album-page"><td colspan="5"><a href="' + albumURL + '"> Album page ' + pageNum + '</a></td></tr></tbody>'+
										'<tbody id="ff-album-page-' + albumPageIdentifier + '"></tbody>';
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				albumPagesLoaded++;
				$('#ff-album-page-'+albumPageIdentifier).innerHTML = photoTableRegex.exec(req.responseText)[1].replace(/\\/g,'');
				if (albumPagesLoaded>=totalAlbumPages) { $('#fbf_photo_pagination').innerHTML = completeMessage; }
				if (prefs['AutoBigAlbumPictures']) { clickX("//a[contains(string(),'"+$l('ShowBigPictures')+"')]"); }
			}
		}
	}
}


//
// Add Bookmarks sub-menu
//
if (prefs['Bookmarks'] && !$('#fbf-bookmarks')) {
	try {

		var bmArray = [];
		var bmString = '';

		function getURL() {
			var url = location.href;
			if (m = location.href.match(/^(.*?facebook\.com\/).*#!?\/?(.*)$/)) { url = m[1]+m[2]; }
			return url.replace(/\?$/, '');
		}

		function getBookmark(url) {
			for (var i=0; i<bmArray.length; i++) {
				// The second condition below is only needed until the script's name or namepsace gets changed
				// It handles a modification to getURL()
				if (bmArray[i].indexOf('|'+url+'|')!=-1 || bmArray[i].indexOf('|'+url+'?|')!=-1) { return i; }
			}
			return false;
		}

		function setBookmarkHTML() {
			var bmHTML = '';
			for (var i=0; i<bmArray.length; i++) {
				buffer = bmArray[i].split('|');
				bmHTML = bmHTML + '<li><a href="' + buffer[1] + '">' + buffer[0] + '</a></li>';
			}
			$('#fbf-bookmark-list').innerHTML = bmHTML+
				'<li><div style="padding:2px 0 0; margin:2px 5px 0; border-top:1px solid #E0E0E0;"></div></li>'+
				'<li><a id="ff-add-bookmark">' + $l('BookmarkAdd') + '</a></li>'+
				'<li><a id="ff-manage-bookmark">' + $l('BookmarksManage') + '</a></li>';
			addBookmarkListeners();
		}

		function reloadBookmarkList() {
			var bmString = getValue('BookmarkList', '');
			if (bmString.match(/^\[.*\]$/)) { bmArray = JSON.parse(bmString).sort(); }
		}

		function updateBookmarkList() {
			bmString = JSON.stringify(bmArray);
			setValue('BookmarkList', bmString);
			prefs['BookmarkList'] = bmString;
			setBookmarkHTML();
		}

		function addBookmarkListeners() {

			on('click', '#ff-add-bookmark', function() {
				var url = getURL();
				if (getBookmark(url)!==false) { window.alert($l('BookmarkExists')); }
				else {
					name = document.title.replace(/^.*[\|\)] /i, '').replace(/ on facebook$/i, '');
					if (name = window.prompt($l('BookmarkNamePrompt', url), name)) {
						bmArray.push(name + '|' + url + '|');
						updateBookmarkList();
					}
				}
			});

			on('click', '#ff-manage-bookmark', function() {
				var removalList = [];
				for (var i=0, url = getURL(); i<bmArray.length; i++) {
					var bookmark = bmArray[i].split('|');
					removalList.push('<label><input type="checkbox" value="' + bmArray[i] + '" ' + (bookmark[1]==url ? 'checked="checked"' : '') + ' />' + bookmark[0] + '</label> - ' + bookmark[1]);
				}
				showDialog(
					'<div style="max-height:500px; overflow:auto; background:white; border:1px solid #ccc; padding:5px 0;">'+
					'<form id="ff-bookmark-removal-list" style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">' + removalList.join('<br />') + '</form>'+
					'</div>',
					'<input type="button" id="ff-remove-bookmark-button" value="' + $l('BookmarksRemoveSelected') + '" /> '
				);
				on('click', '#ff-remove-bookmark-button', function() {
					var urls = Array();
					var names = Array();
					var inputs = $('input', '#ff-bookmark-removal-list');
					for (var i=0; i<inputs.length; i++) {
						if (inputs[i].checked) {
							urls.push(inputs[i].value.split('|')[1]);
							names.push(inputs[i].value.split('|')[0]);
						}
					}
					if (window.confirm($l('BookmarksConfirmRemoval') + '\n' + names.join('\n'))) {
						for (var i=0; i<urls.length; i++) {
							if ((bookmark = getBookmark(urls[i]))!==false) { bmArray.splice(bookmark,1); }
						}
						updateBookmarkList();
						hidePopup();
					}
				});
			});

		}

		var pageNav = $('#pageNav');
		if (pageNav) {

			addStyle(
				'body #fbf-bookmarks { position:relative; display:list-item; z-index:20; }'+
				'body #fbf-bookmarks:hover ul, #fbf-bookmarks:hover li { display:block; }'+
				'body #fbf-bookmarks ul a, #fbf-bookmarks ul a:focus { background:white; }'+
				'body #fbf-bookmarks li { display:block; float:none; }'+
				'body #fbf-bookmark-list { overflow:auto; }'+
				// The following line is based on: #navAccountLink img
				'#fbf-bookmarks img { background:url(/rsrc.php/z8S5R/hash/ez3x5cuc.png) no-repeat -137px 0; height:4px; left:5px; position:relative; top:-2px; width:7px; }'+
				// The following line is based on: #navAccount ul
				'#fbf-bookmarks ul { background:#fff;border:1px solid #333;border-bottom:2px solid #2d4486;display:none;margin-right:-1px;margin-top:-1px;min-width:200px;padding:10px 0 5px;position:absolute;right:0;_right:-1px;top:100%;*width:100%;_width:200px;z-index:1 }'+
				// The following line is based on: #navAccount ul a
				'#fbf-bookmarks ul a {color:#3a579a;display:block;font-weight:normal;height:auto;_margin-right:-25px;padding:4px 10px 5px;white-space:nowrap;*white-space:auto;_white-space:nowrap}'+
				// The following line is based on: #navAccount ul a:hover, #navAccount ul a:focus, #navAccount ul a:active
				'#fbf-bookmarks ul a:hover {background:#6d84b4;border-bottom:1px solid #3b5998;border-top:1px solid #3b5998;color:#fff;padding:3px 10px 4px}'+
				// The following line is based on: .openToggler #navAccountLink
				'#fbf-bookmarks:hover fbf-bookmark-link {background-color:#fff;color:#333;height:22px;position:relative;z-index:3}'
			);

			var bookmarks = document.createElement('li');
			bookmarks.id = 'fbf-bookmarks';
			bookmarks.innerHTML =	'<a href="#" onclick="return false;" id="fbf-bookmark-link" style="padding-right:16px;">' + $l('Bookmarks') + '<img src="' + (location.protocol=='https:' ? 'https://s-' : 'http://') + 'static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" class="img" style="background:url(\'/rsrc.php/z8S5R/hash/ez3x5cuc.png\') no-repeat scroll -137px 0 transparent; height:4px; left:5px; position:relative; top:-2px; width:7px;"></a>'+
									'<ul id="fbf-bookmark-list"></ul>';

			pageNav.insertBefore(bookmarks, pageNav.firstChild);

			on('mouseover', '#fbf-bookmark-link', function() {
				reloadBookmarkList();
				setBookmarkHTML();
				$('#fbf-bookmark-list').style.maxHeight = (window.innerHeight - 65) + 'px';
			});

		}


	} catch(x) { logError('Bookmarks', x); }
}

//
// Add easily accessbile Logout link
//
if (prefs['LogoutLink'] && !$('#ff-logout')) {
	try {
		newLogout = document.createElement('li');
		newLogout.innerHTML = '<a>' + $('//form[@id="logout_form"]//input[@type="submit"]', null, true).value + '</a>';
		onClick(newLogout, function() { $('#logout_form').submit(); });
		$('#pageNav').appendChild(newLogout);
	} catch(x) { logError('Logout Link', x); }
}

//
// Remove the Home link
//
if (!prefs['HomeLink']) {
	try {
		var l = $('.//a[contains(@href,"?ref=home")]', $('#pageNav'), true);
		l.parentNode.removeChild(l);
	} catch(x) { logError('Home Link', x); }
}

//
// Remove the Profile link
//
if (!prefs['ProfileLink']) {
	try {
		var l = $("//ul[@id='pageNav']//a[@accesskey='2']", null, true);
		l.parentNode.removeChild(l);
	} catch(x) { logError('Profile Link', x); }
}

//
// Top Bar Positioning
//
if (prefs['TopBarFixed']) {
	try {
		var div = document.createElement('div');
		div.id = 'fbf-page-head-container';
		$('#pageHead').parentNode.insertBefore(div, $('#pageHead').parentNode.firstChild);
		$('#fbf-page-head-container').insertBefore($('#pageHead'), $('#fbf-page-head-container').firstChild);
		addStyle(
			'#blueBar { position:fixed; z-index:15; }'+
			'#fbf-page-head-container { width:' + $('#pageHead').clientWidth + 'px; margin:0 auto; }'+
			'#pageHead { position:fixed; z-index:16; }'+
			'#headNav { width:' + $('#headNav').clientWidth + 'px; }'+
			'#content { padding-top:' + $('#blueBar').clientHeight + 'px; }'
		);
	} catch(x) { logError('Top Bar Fixed', x); }
}

//
// Top Bar Transparency
//
if ((prefs['TopBarFixed'] || prefs['TopBarOpacity'] < 0) && (prefs['TopBarOpacity']!='1.0' || prefs['TopBarHoverOpacity']!='1.0')) {
	if (prefs['TopBarOpacity'] < 0) { addStyle('#pageHead, #blueBar { display:none; } #content > div { padding-top:10px; }'); }
	else { addStyle('#pageHead, #blueBar { opacity:' + prefs['TopBarOpacity'] + '; } #pageHead #blueBar { opacity:1; } #pageHead:hover, #blueBar:hover { opacity:' + prefs['TopBarHoverOpacity'] + '; } #jewelCase .jewel { border-style:none; }'); }
}

//
// Bottom Bar Transparency
//
if (prefs['BottomBarOpacity']!='1.0' || prefs['BottomBarHoverOpacity']!='1.0') {
	if (prefs['BottomBarOpacity'] < 0) { addStyle(' #pagelet_presence { display:none; }'); }
	else { addStyle(' #pagelet_presence { opacity:' + prefs['BottomBarOpacity'] + '; } #pagelet_presence:hover { opacity:' + prefs['BottomBarHoverOpacity'] + '; }'); }
}

//
// Make CSS changes
//
var style='';
if (prefs['ChatDifferentiate'])			{ style = style + ' .fbChatBuddyList a.friend, #pagelet_friends_online .chatOnline { font-weight:bold; } .fbChatBuddyList a.idle, #pagelet_friends_online .chatIdle { font-weight:normal; font-style:italic; }'; }
if (prefs['ChatHideIdle'])				{ style = style + ' body .fbChatBuddyList a.idle { max-height:0; overflow:hidden; padding-top:0; padding-bottom:0; } #pagelet_friends_online .chatIdle { display:none; }'; }
if (prefs['HideEgos'])					{ style = style + ' .ego_column, .netego_organic, #netego_organic, #pagelet_netego, #pagelet_netego_lower, #pagelet_betabox { display:none; } #pagelet_netego_requests div.ego_column, #pagelet_netego_pokes div.ego_column { display:block; }'; }
if (prefs['HideHovercards'])			{ style = style + ' .HovercardOverlay { display:none; }'; }
if (prefs['AutoReadMore'])				{ style = style + ' .text_exposed_root .text_exposed_hide { display:none; } .text_exposed_root .text_exposed_show { display:inline; }'; }
if (prefs['BigAlbumPicturesBorder'])	{ style = style + ' #FBFBigAlbum a { padding:0 1px 1px 0; } #FBFBigAlbum img { border:1px solid #ccc; background:#fff; min-width:20px; min-height:20px; }'; }
if (prefs['HomeLeftColumnFixed'])		{ style = style + ' .home #leftCol { position:fixed; }'; }
if (prefs['HomeStretchMiddleColumn'])	{ style = style + ' .home li.uiUnifiedStory { padding-right:0; } .home form.commentable_item > ul {width: auto !important;}'; }
if (prefs['HomeStretch'])				{  style = style + ' .home #globalContainer { width:auto; margin:auto 7px; } .home #fbf-page-head-container { width:auto; } .home .hasRightCol { position:relative; } .home #contentCol #contentArea { margin-right:10px; width:auto; } .home #contentCol.hasRightCol #contentArea { margin-right:275px; width:auto; } .home .hasRightCol #rightCol { position:absolute; right:0; } .home .uiStream .hideSelector { margin-right:0; }'; }
else if (prefs['HomeLeftAlign'])		{ style = style + ' .home #globalContainer { margin:0 0 0 5px; ! important; }'; }
if (!prefs['FacebookTimestamps'])		{ style = style + ' abbr.timestamp { display:none; }'; }
if (!prefs['HomeProfile'])				{ style = style + ' #pagelet_welcome_box { display:none; }'; }
if (!prefs['HomeNavigation'])			{ style = style + ' #pagelet_navigation { display:none; }'; }
if (!prefs['HomeChat'])					{ style = style + ' #pagelet_friends_online { display:none; }'; }
if (!prefs['HomePokes'])				{ style = style + ' #pagelet_netego_pokes { display:none; }'; }
if (!prefs['HomeRecommendations'])		{ style = style + ' #pagelet_netego, #pagelet_netego_lower { display:none; }'; }
if (!prefs['HomeFindFriends'])			{ style = style + ' #pagelet_netego_lower { display:none; }'; }
if (!prefs['HomeEvents'])				{ style = style + ' #pagelet_eventbox { display:none; }'; }
if (!prefs['HomeRequests'])				{ style = style + ' #pagelet_netego_requests { display:none; }'; }
if (!prefs['HomeBeta'])					{ style = style + ' #pagelet_betabox { display:none; }'; }
if (!prefs['HomeLeftColumn'])			{ style = style + ' .fbx #mainContainer #leftCol { display:none; } .fbx #mainContainer #contentCol { margin-left:5px; }'; }
if (!prefs['HomeRightColumn'])			{ style = style + ' .fbx #mainContainer #rightCol { display:none; }'; $('#contentCol').className=$('#contentCol').className.replace(/ hasRightCol/,''); }
if (prefs['HomeChatNames']) {
	style = style+' '+
	'.fbx #pagelet_friends_online .uiListHorizontalItem { float:none; }'+
	'.fbx #pagelet_friends_online .uiTooltip .uiTooltipWrap { background:inherit; display:inline; position:relative; visibility:visible; }'+
	'.fbx #pagelet_friends_online .uiTooltipText { background-position:left center; background-color:inherit; color:inherit !important; border-right:none; display:inline-block; line-height:18px; padding:0 0 0 10px; margin-left:3px; width:130px; overflow:hidden; }'+
	'.fbx #pagelet_friends_online .uiProfilePhotoMedium { height:22px; width:22px; }'+
	'.fbx #pagelet_friends_online .chatOverlay { background-image:none !important; }';
}
if (style!='') { addStyle(style); }

try {
	if (prefs['HomeStretch']) { addStyle('.home #headNav { width:' + ($('#contentCol').clientWidth) + 'px; }'); } // must be done after the other "homestretch" css
} catch(x) { logError('Home Stretch CSS', x); }


//
// Listen for image mouseovers/mouseouts to show/hide popups
//
if (prefs['ProfilePicPopup'] || prefs['PhotoPopup']) {
	
	picRegex = /(https?:\/\/((profile\.|s-hprofile-|photos-|s-hphotos-|secure-media-).*?\.fbcdn\.net|fbcdn-(photos|profile)-a.akamaihd.net).*?(\/[aqst]\d[\d_]+|_[aqst])\.jpg)/;
	backgroundRegex = /(https?:\/\/((profile\.|s-hprofile-|photos-|s-hphotos-|secure-media-).*?\.fbcdn\.net|fbcdn-(photos|profile)-a.akamaihd.net).*?(\/[aqst]\d[\d_]+|_[aqnst])\.jpg)/;
	picRegex2 = /(src|url)=([^&]+)/;
	profilePixRegex = /\bfbcdn(.net|-profile-)/;

	function showPopupPic(e) {
		try {
			var t = e.target;
			
			var oldSrc;
			var newSrc;
			var title;

			if (t.tagName == 'IMG' && picRegex.test(t.src)) { oldSrc = t.src + '#1'; }
			else if (t.tagName == 'IMG' && (m=backgroundRegex.exec(t.style.backgroundImage))) { oldSrc = m[1] + '#2'; }
			else if (t.tagName == 'I' && (m=picRegex.exec(t.style.backgroundImage))) { oldSrc = m[1] + '#3'; }
			else if (t.parentNode && t.parentNode.firstChild.tagName == 'IMG' && (m=picRegex.exec(t.parentNode.firstChild.src))) { oldSrc = m[1] + '#4'; }
			else if (t.parentNode && t.parentNode.style && (m=picRegex.exec(t.parentNode.style.backgroundImage))) { oldSrc = m[1] + '#5'; }
			else if (t.src && (t.src.indexOf('app_full_proxy.php')!=-1 || t.src.indexOf('safe_image.php')!=-1) && (m=picRegex2.exec(t.src))) { oldSrc = unescape(m[2]) + '#6'; }
			
			// Facebook's code somtimes triggers the popup incorrectly when tagging (ie, even though the mouse is not actually over the image).
			if (oldSrc && oldSrc.match(/#4$/) && getStyle(t.parentNode.firstChild, 'cursor')=='crosshair') { return; }
			
			// Disable completely when tagging (only on the tagging image itself)
			if (!prefs['PopupWhileTagging'] && t.tagName=='IMG' && getStyle(t, 'cursor')=='crosshair') { return; }
			
			if (oldSrc || newSrc) {

				if (!newSrc) {
					if (m = oldSrc.match(/^["']+(.*)["']+$/)) { oldSrc = m[1]; } // Opera needs this, no idea why...
					newSrc = oldSrc.replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");
				}

				if (!profilePixRegex.test(newSrc)) { newSrc = newSrc + '-external'; }
				else {
					if (newSrc.indexOf('profile')!=-1) { newSrc = newSrc + '-profile'; }
					else { newSrc = newSrc + '-photo'; }
				}

				if (profilePixRegex.test(newSrc) ? (newSrc.indexOf('profile')!=-1 ? prefs['ProfilePicPopup'] : prefs['PhotoPopup']) : prefs['ExternalPopup']) {

					clearTimeout(hidePopupPicTimeout);
					t.removeEventListener('mouseout', hidePopupPic, false);
					t.addEventListener('mouseout', hidePopupPic, false);
					
					//newSrc = newSrc.replace(/^https:\/\/fbcdn-photos/, 'https://fbcdn-sphotos');
					
					if (m = newSrc.match(/\/n(\d+)_\d+\.jpg/)) { profileLink = 'http://www.facebook.com/profile.php?id=' + m[1]; }
					else if (t.href) { profileLink = t.href; }
					else if (t.parentNode.href) { profileLink = t.parentNode.href; }
					else if (t.parentNode.parentNode.href) { profileLink = t.parentNode.parentNode.href; }

					showPopupPicTimeout = setTimeout(function(){
						$('#ff-popup-pic-image').innerHTML = '<a href="' + profileLink + '"><img src="' + newSrc + '" alt="FFixer - ' + $l('LoadingPic') + '" style="max-height:' + (window.innerHeight-35) + 'px;"/></a>';
						$('#ff-popup-pic-div').style.display = 'block';
						$('#ff-popup-pic-div').className = 'fbfPopup ff-popup-pic-div-' + (prefs['PopupPosition'] == 'auto' ? (e.pageX>document.body.clientWidth/2 ? 'left' : 'right') : prefs['PopupPosition']);
					}, prefs['DelayPopupPics'] ? prefs['DelayPopupPicsTimeout'] : 0);

				}

			}

		} catch(x) { logError('Popup Pic', x); }
	}

	$('#ff-popup-pic-div').addEventListener('mouseover', function(e) { clearTimeout(hidePopupPicTimeout); }, false);

	$('#ff-popup-pic-div').addEventListener('mouseout', function(e) {
		var r = e.relatedTarget;
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
			while (r.parentNode && r.id!='ff-popup-pic-div') { r = r.parentNode; }
			if (r.id!='ff-popup-pic-div') { document.getElementById('ff-popup-pic-div').style.display = 'none'; }
		}
	}, false);

	window.addEventListener('mouseover', function(e) {
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) { showPopupPic(e); }
	}, false);

	function hidePopupPic(e) {
		if (prefs['DelayPopupPics']) { clearTimeout(showPopupPicTimeout); }
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
			hidePopupPicTimeout = setTimeout(function() { document.getElementById('ff-popup-pic-div').style.display = 'none'; }, 30);
		}
	}

}


//
// Modify search form to search results open in a new tab/window
//
if (prefs['NewTabSearch'] && $('#q')) {
	$('#q').addEventListener('keydown', function(e) {
		if (e.keyCode == 13 && e.ctrlKey) { $('#navSearch').target = '_blank'; }
		else { $('#navSearch').target = ''; }
	}, false);
}

//
// Add useful date functions
//
Date.prototype.getNextDay=function(){var nextDay=new Date(); nextDay.setTime(this.getTime()+86400000); return nextDay; }
Date.prototype.before=function(date){if(!date)date=new Date(); return this.getTime()<date.getTime();}
Date.prototype.past=function(date){if(!date)date=new Date(); var thisDate=this; thisDate.setHours(0); thisDate.setMinutes(0); thisDate.setSeconds(0); date.setYear(thisDate.getFullYear()); return thisDate.getTime()<date.getTime();}
Date.prototype.getAge=function(){var now=new Date(); return this.past(new Date())?now.getFullYear()-this.getFullYear():now.getFullYear()-this.getFullYear()-1;}
Date.prototype.toISOString=function(includeTime){return ''+this.getFullYear()+$0(this.getMonth()-0+1)+$0(this.getDate())+(includeTime?'T'+$0(this.getHours())+$0(this.getMinutes())+$0(this.getSeconds()):'');}
Date.prototype.format = function() { var monthNames = $l('Months'); return monthNames[this.getMonth()] + ' ' + this.getDate() + ', ' + this.getFullYear(); }
Date.prototype.getFormattedTime = function(use24Hours) { return (use24Hours ? $0(this.getHours()) : (this.getHours()%12==0 ? '12' : this.getHours()%12)) + ':' + $0(this.getMinutes()) + (use24Hours ? '' : (this.getHours()>11 ? 'pm' : 'am')); }
Date.prototype.getSign=function(){ var signs = $l('Signs'); var endDates=new Array(19,18,20,19,20,21,22,22,22,22,21,21); return signs[this.getDate()>endDates[this.getMonth()]?(this.getMonth()+1)%12:this.getMonth()]; }


//
// Add link for showing full-size album pictures
//
function addBigAlbumPicLinks() {
	
	if (!$('#ff-bap-link')) {
		var a = document.createElement('a');
		a.innerHTML = $l('ShowBigPictures');
		a.id = 'ff-bap-link';
		
		// albums
		if ((container = $('.uiHeaderSubTitle', '#content')) && container[0]) {
			container[0].appendChild(document.createTextNode(' · '));
			container[0].appendChild(a);
		}
		
		// photo tabs on new profiles
		else if ((container = $('.uiHeaderTitle', '#pagelet_photos_of_me')) && container[0]) {
			container[0].appendChild(document.createTextNode(' · '));
			container[0].appendChild(a);
		}
		
		// photo tabs on old profiles
		else if (container = $('//*[@id="photos_of_wrapper"]/preceding-sibling::* //div', null, true)) {
			container.appendChild(document.createTextNode(' · '));
			container.appendChild(a);
		}

		on('click', a, function(e) {
			var tables = $('./following::table[contains(@class,"fbPhotosGrid")]', e.target); // new albums/profiles use this
			if (tables.snapshotLength==0) { tables = $('./following::table[contains(@class,"UIPhotoGrid_Table")]', e.target); } // old albums/profiles use this
			var buf = '';
			for (var t=0; t<tables.snapshotLength; t++) {
				var cells = $('td', tables.snapshotItem(t));
				for (i=0; i<cells.length; i++) {
					var src = (cells[i].getAttribute('data-src',null) || cells[i].innerHTML).match(/(https?:\/\/[^"]+\.jpg)[^&]/);
					if (src) { src=src[1]; }
					else { continue; }
					var link = $('a', cells[i])[0];
					if (link.className.indexOf('uiVideoLink')!=-1) { continue; } // skip video thumbnails
					var title = ($('a', cells[i])[0].getAttribute('title') || '').replace('"', '&quot;');
					buf+=	'<a href="' + link.href + '">'+
							'<img src="' + src.replace(/\/[as]([\d_]+)\.jpg/, '/n$1.jpg').replace(/\/([\d_]+)[as]\.jpg/, '/$1n.jpg') + '" title="' + title + '" />'+
							'</a>';
				}
			}
			hidePopup();
			showPopup('<div id="FBFBigAlbumContainer"><div id="FBFBigAlbum" class="fbfPopup"><div id="FBFBigAlbumClose1" class="FBFBigAlbumClose">' + $l('Close') + '</div>' + buf + '<div id="FBFBigAlbumClose2" class="FBFBigAlbumClose">' + $l('Close') + '</div></div></div>', false);
			on('click', Array('#FBFBigAlbumClose1','#FBFBigAlbumClose2'), hidePopup);
		});
	}
}

//
// Process the page at regular intervals
//
processing = setInterval(processPage, prefs['ProcessInterval']);
processPage();

function processPage() {

	//
	// Figure out what page we're looking at
	//
	loc = window.location.href.toLowerCase();
	page = loc.split('facebook.com/')[1];
	if (page.indexOf('#')!=-1) {
		buf = page.split('#');
		page = buf[1]!='' ? buf[1] : buf[0];
	}
	page = page.replace(/^!?\//,'');
	//if (page!=lastPage) { log('Page => "' + page + '"'); }// DEBUG ONLY

	if (page != lastPage && prefs['PopupAutoClose'] && $('#ff-popup-pic-div')) {
		$('#ff-popup-pic-div').style.display = 'none';
		lastPage = page;
	}

	//
	// Show date/time of comments and feed items
	//
	if (prefs['FBFTimestamps']) {
		var today = new Date()
		var yesterday = new Date();
		yesterday.setTime(today.getTime()-24*60*60*1000);
		var fTimestamp = new Date();
		var timestamps = $('//abbr[@class="timestamp"]');
		for (var i=0; i<timestamps.snapshotLength; i++) {
			var t = timestamps.snapshotItem(i);
			fTimestamp.setTime(Date.parse(t.title));
			fTimestamp.setTime(Date.parse(t.getAttribute('data-date')));
			t.className = t.className + ' timed';
			var fbfTimestamp = document.createElement('span');
			fbfTimestamp.innerHTML = (prefs['FacebookTimestamps']?' (':'') + (fTimestamp.toISOString()==today.toISOString() ? '' : (fTimestamp.toISOString()==yesterday.toISOString() ? 'Yesterday' : fTimestamp.toISOString()) + ' at ') + fTimestamp.getFormattedTime(prefs['FBFTimestamps24']) + (prefs['FacebookTimestamps']?') ':'');
			t.parentNode.insertBefore(fbfTimestamp, t.nextSibling);
		}
	}


	//
	// Customize Home Page
	//
	if (isHomePage()) {
		try {

			homeStream = $('#home_stream');
			if (homeStream && !homeStream.className.match(/\bfbf\b/)) {
			
				homeStream.className = homeStream.className + (' fbf');
			
			}

			// Make today's events bold
			try {
				var eventDays = $('//div[contains(@class,"UIUpcoming_Item")][not(contains(@class,"fbf-handled"))]');
				for (var i=0; i<eventDays.snapshotLength; i++) {
					eventDays.snapshotItem(i).className = eventDays.snapshotItem(i).className + ' fbf-handled';
					if (eventDays.snapshotItem(i).getElementsByTagName('span')[0].innerHTML.toLowerCase().indexOf($l('today'))!=-1) {
						eventDays.snapshotItem(i).style.fontWeight = 'bold';
					}
				}
			} catch(x) { logError('Bold Events', x); }

			// Modify the live feed
			try {
				if (prefs['CustomFeedModification'].length>0 || prefs['HideApplicationStories'] || prefs['HideEventStories'] || prefs['HideFriendStories'] || prefs['HideGroupStories'] || prefs['HideLikeStories'] || prefs['HideLinkStories'] || prefs['HideNoteStories'] || prefs['HidePhotoStories'] || prefs['HidePlaceStories'] || prefs['HideProfilePicStories'] || prefs['HideRelationshipStories'] || prefs['HideStatusStories'] || prefs['HideVideoStories'] || prefs['HideWallStories']) {
					var stream = $('#pagelet_home_stream');
					var whitelist = JSON.parse(prefs['ApplicationWhitelist']);
					whitelistRegex = whitelist.length==0 ? null : new RegExp('/apps/application\\.php\\?id=(' + whitelist.join('|') + ')\\b');
					if (stream) {
						var blockedIDs = Array();
						var blockedStoryXPath = Array();
						var highlightedStoryXPath = Array();
						
						if (prefs['HideApplicationStories'])	{ blockedIDs = blockedIDs.concat(Array('237','313')); }
						if (prefs['HideEventStories'])			{ blockedIDs = blockedIDs.concat(Array('1','38','178')); }
						if (prefs['HideFriendStories']) 		{ blockedIDs = blockedIDs.concat(Array('8','12')); }
						if (prefs['HideGroupStories'])			{ blockedIDs = blockedIDs.concat(Array('4','21', '316')); }
						if (prefs['HideLikeStories'])			{ blockedIDs = blockedIDs.concat(Array('161','283')); }
						if (prefs['HideLinkStories'])			{ blockedIDs = blockedIDs.concat(Array('5','263')); }
						if (prefs['HideNoteStories'])			{ blockedIDs = blockedIDs.concat(Array('66')); }
						if (prefs['HidePhotoStories'])			{ blockedIDs = blockedIDs.concat(Array('6','7','65','247')); }
						if (prefs['HidePlaceStories'])			{ blockedIDs = blockedIDs.concat(Array('278', '285')); }
						if (prefs['HideProfilePicStories'])		{ blockedIDs = blockedIDs.concat(Array('60', '259')); }
						if (prefs['HideRelationshipStories'])	{ blockedIDs = blockedIDs.concat(Array('10')); }
						if (prefs['HideStatusStories'])			{ blockedIDs = blockedIDs.concat(Array('11','46')); }
						if (prefs['HideVideoStories'])			{ blockedIDs = blockedIDs.concat(Array('3','128','130')); }
						if (prefs['HideWallStories'])			{ blockedIDs = blockedIDs.concat(Array('56','273')); }
						if (blockedIDs.length>0) {
							blockedStoryXPath.push("contains(@data-ft,'\"sty\":" + blockedIDs.join(",') or contains(@data-ft,'\"sty\":") + ",')");
						}
						
						if (prefs['CustomFeedModification'].length>0) {
							try {
								var custom = prefs['CustomFeedModification'].split(/\r?\n\r?/);
								for (var i=0; i<custom.length; i++) {
									if (m = custom[i].match(/^[^#]+/)) {
										var rule = m[0].replace(/^\s*|\s*$/g,'');
										if (m = rule.match(/^-\s*(\d+)$/)) { blockedStoryXPath.push("contains(@data-ft,'\"sty\":" + m[1] + ",')"); }
										else if (m = rule.match(/^-\s*(.+)$/)) { blockedStoryXPath.push("contains(string()," + (m[1].indexOf("'")!=-1 ? '"'+m[1]+'"' : "'"+m[1]+"'") + ")"); }
										else if (m = rule.match(/^\+\s*(\d+)$/)) { highlightedStoryXPath.push("contains(@data-ft,'\"sty\":" + m[1] + ",')"); }
										else if (m = rule.match(/^\+\s*(.+)$/)) { highlightedStoryXPath.push("contains(string()," + (m[1].indexOf("'")!=-1 ? '"'+m[1]+'"' : "'"+m[1]+"'") + ")"); }
										else { log('Ignoring ' + rule); }
									}
								}
							} catch(x) { logError('Custom Feed Modification', x); }
						}
						
						if (blockedStoryXPath.length>0) {
							var elms = $(".//*[contains(@class,'uiUnifiedStory') and (" + blockedStoryXPath.join(' or ') + ")]", stream);
							for (var i=0; i<elms.snapshotLength; i++) {
								if (whitelistRegex===null || !whitelistRegex.test(elms.snapshotItem(i).innerHTML)) {
									elms.snapshotItem(i).parentNode.removeChild(elms.snapshotItem(i));
								}
							}
						}
						
						if (highlightedStoryXPath.length>0) {
							var elms = $(".//*[contains(@class,'uiUnifiedStory') and not(contains(@class,'ffixer-highlighted-story')) and (" + highlightedStoryXPath.join(' or ') + ")]", stream);
							for (var i=0; i<elms.snapshotLength; i++) { elms.snapshotItem(i).className=elms.snapshotItem(i).className + ' ffixer-highlighted-story'; }
						}
					}
				}
			} catch(x) { logError('Live Feed', x); }

		} catch(x0) { logError('Home', x0); }
	}

	//
	// Replace links with HTTPS versions
	//
	if (prefs['SecureLinks']) {
		var links = $("//a[contains(@href,'facebook.com')]");
		for (var i=0; i<links.snapshotLength; i++) { links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/^http:\/\/([^\.]*\.)?facebook\.com\//,'https://$1facebook.com/'); }
	}
	
	//
	// Disable Theater
	//
	if (prefs['DisableTheater']) {
		location.href='javascript:void(window.PhotoTheater=null)';
	}

	//
	// Show big album pictures
	//
	if (prefs['BigAlbumPictures']) {
		try {
			if (page.indexOf('album.php')!=-1 || page.indexOf('photo_search.php')!=-1 || page.indexOf('media/set/')!=-1 || page.indexOf('sk=photos')!=-1 || page.indexOf('v=photos')!=-1) {
				addBigAlbumPicLinks();
			}
		} catch(x) { logError('Big Album Pictures', x); }
	}

	//
	// Add calendar features to Events pages
	//
	if ((prefs['GoogleCalendar'] || prefs['iCalendar']) && page.indexOf('events.php')==0) {
		if (prefs['iCalendar'] && page.indexOf('events.php?bday=1')==0) {
			try {
				var elm = document.evaluate("//div[contains(@class,'summary_bar')][1]/div[@class='summary'][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
				if (elm!=null) {
					if (elm.className.indexOf('fbfcal')!=-1) { return; }
					elm.className = elm.className + ' fbfcal';
					elm.innerHTML = elm.innerHTML + ' | <a href="#" id="fbfical">' + $l('ExportICalendarFile') + '</a><span id="fbfcalwarning"> ' + $l('ExportICalendarFileWarning') + '</span>';
					document.getElementById('fbfical').addEventListener('click', function(e) {
						if (e.target.href.match(/#$/)) {
							e.stopPropagation();
							e.preventDefault();
							document.getElementById('fbfical').innerHTML = $l('CreatingFile');
							setTimeout(function(){
								var now = new Date();
								var day = now.getDate();
								var month = now.getMonth()+1;
								var year = now.getFullYear();
								var divs = document.evaluate("//div[@class='bdaycal_month_section']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ,null);
								var ical = 'BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0APRODID:FFixer%0D%0A';
								var eventMonth;
								var date;
								var days;
								var bdays;
								for (i=0; i<divs.snapshotLength; i++) {
									eventMonth = $m(divs.snapshotItem(i).id)+1+'';
									if (eventMonth<10) { eventMonth = '0' + eventMonth; }
									days = divs.snapshotItem(i).innerHTML.replace(/.*<\/table>/,'').split(/<br[^>]*>/g);
									for (j=0; j<days.length; j++) {
										if (m = days[j].match(/^(\d+)/)) {
											bdays = days[j].split(',');
											for (k=0; k<bdays.length; k++) {
												if (n = bdays[k].match(/[^>]+>([^<]+)/)) {
													date = ((eventMonth < month || (eventMonth == month && m[1] < day)) ? year-0+1 : year) + eventMonth + m[1];
													ical = ical + 'BEGIN:VEVENT%0D%0ASUMMARY:' + $l('Birthday',prefs['CalendarFullName'] ? n[1] : n[1].split(' ')[0]) + '%0D%0ADESCRIPTION:' + $l('Birthday',n[1]) + '%0D%0ADTSTART:' + date + '%0D%0ADTEND:' + date + '%0D%0ARRULE:FREQ=YEARLY%0D%0AEND:VEVENT%0D%0A';
												}
											}
										}
									}
								}
								e.target.href = 'data:text/calendar;charset=US-ASCII,' + ical + 'END:VCALENDAR';
								e.target.onclick='';
								location.replace(e.target.href);
								document.getElementById('fbfcalwarning').style.display = 'none';
								document.getElementById('fbfical').innerHTML = $l('ExportICalendarFile');
							},0);
						}
					}, false);
				}
			} catch(x) { logError('iCalendar', x); }
		} else if (prefs['GoogleCalendar'] && page.indexOf('events.php?archive=1')!=0) {
			var divs = $('.partyrow');
			var now = new Date();
			var year = now.getFullYear();
			var div;
			if (divs.length>0) {
				for (var i=0; i<divs.length; i++) {
					div = divs[i];
					var tds = div.getElementsByTagName('td');
					for (var j=0; j<tds.length; j++) {
						if (tds[j].className == 'actions' && tds[j].innerHTML.indexOf('class="calLink"')==-1) {
							h = div.innerHTML;
							title = h.match(/class="etitle">([^<]+)</i)[1];
							where = h.match(/Where:<\/td><td>(.+?)<\/td/i)[1];
							when = h.match(/When:<\/td><td>(.+?)<\/td/i)[1];
							host = h.match(/Hosted by:<\/td><td>(.+?)<\/td/i)[1];
							var startDate, endDate;
							if (m = when.match(/^(.*)<.+?>(.*)$/)) {
								startDate = $d(m[1]);
								endDate = $d(m[2]);
							}
							else if (m = when.match(/(.*)( \d\d?:\d\d ?(am|pm)?).*( \d\d?:\d\d ?(am|pm)?)/)) {
								startDate = $d(m[1]+m[2]);
								endDate = $d(m[1]+m[4]);
								if (endDate!=null && endDate.before(startDate)) { endDate=endDate.getNextDay(); }
							}
							if (startDate==null || endDate==null) return;
							var calLink = document.createElement('a');
							calLink.innerHTML = $l('AddToCalendar');
							calLink.className = 'calLink';
							calLink.href = 'http://www.google.com/calendar/' + (prefs['GoogleApps'] && prefs['GoogleAppsDomain']!='' ? 'hosted/'+prefs['GoogleAppsDomain']+'/' : '') + 'event?action=TEMPLATE&text=' + title + '&dates=' + startDate.toISOString(true) + '/' + endDate.toISOString(true) + '&location=' + where + '&details=Hosted by ' + host;
							tds[j].appendChild(calLink);
							break;
						}
					}
				}
			}
		}
	}

	//
	// Show birthday info and Google Calendar link
	//
	if ((prefs['Age'] || prefs['Sign'] || prefs['GoogleCalendar']) && (page.match(/^profile.php/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1))) {
		try {
			var bdayNode = $("//div[@id='pagelet_byline']//i[contains(@class,'sx_6a76d9')]/parent::span[not(contains(@class,'ffhandled'))]",null,true);
			if (bdayNode != null) {
				bdayNode.className = bdayNode.className + ' ffhandled';
				var info = [];
				var now = new Date();
				var bday = $d(bdayNode.textContent);
				if (bday!=null)  {
					var past = bday.past();
					if (prefs['Age']) { if (now.getFullYear()!=bday.getFullYear()) { info.push($l('yearsOld',bday.getAge())); } }
					if (prefs['Sign']) { info.push(bday.getSign()); }
					if (prefs['GoogleCalendar']) {
						var thisYearBday = new Date();
						thisYearBday.setTime(bday.getTime());
						thisYearBday.setYear(past ? now.getFullYear()-0+1 : now.getFullYear());
						var name = $('.profileName')[0].innerHTML;
						info.push('<a href="http://www.google.com/calendar/' + (prefs['GoogleApps'] && prefs['GoogleAppsDomain']!='' ? 'hosted/'+prefs['GoogleAppsDomain']+'/' : '') + 'event?action=TEMPLATE&text=' + $l('Birthday',prefs['CalendarFullName'] ? name : name.split(' ')[0]) + '&dates=' + thisYearBday.toISOString() + '/' + thisYearBday.getNextDay().toISOString() + '&details=' + $l('Birthday',name) + (prefs['CalendarBirthDate'] && now.getFullYear()!=bday.getFullYear() ? ' - ' + bday.format() : '') + '">' + $l('AddToGoogleCalendar') + '</a>');
					}
					if (info) { bdayNode.innerHTML = bdayNode.innerHTML + ' (' + info.join(', ') + ') '; }
				}
			}
		} catch(x) { logError('Age/Sign/Calendar', x); }
	}

	//
	// Show video download link
	//
	if (prefs['DownloadVideo'] && page.match(/^video\/video.php\?.*v=/)) {
		try {
			var parent = $("//div[@id='video_actions']/ul[@class='actionspro'][1]", null, true);
			if (!$('#fbf-video-link')) {
				var videoSrc;
				var embed = $("//embed[contains(@flashvars,'video_src')][1]", null, true);
				if (embed) { videoSrc = unescape(embed.getAttribute('flashvars')).match(/video_src=([^&]*)/)[1]; }
				else { videoSrc = unescape($("//div[@id='js_buffer']/script", null, true).text.match(/addVariable\(\"video_src\", \"(|([^\"]|\\\")*[^\\])\"/)[1]); }
				var link = document.createElement('li');
				link.id = 'fbf-video-link';
				link.className = 'actionspro_li';
				link.innerHTML = '<a class="actionspro_a" href="' + videoSrc + '" title="' + $l('DownloadVideo') + '" />' + $l('DownloadVideo') + '</a>';
				parent.insertBefore(link, parent.lastChild.nextSibling);
			}
		} catch(x) { logError('Download Video', x); }
	}

	//
	// Change page title
	//
	try {
		if (prefs['HideFacebookCountInTitle']) { document.title = document.title.replace(/Facebook \(\d+\)/, 'Facebook'); }
		if (prefs['PageTitle']) { document.title = document.title.replace(/Facebook.*?\| /, ''); }
		if (prefs['FriendRequestCountInTitle'] || prefs['NotificationCountInTitle'] || prefs['InboxCountInTitle']) {
			var counts = Array();
			if (prefs['FriendRequestCountInTitle']) {
				var count = $('//a[@id="jewelRequest"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'f'); }
			}
			if (prefs['InboxCountInTitle']) {
				var count = $('//a[@id="jewelMail"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'm'); }
			}
			if (prefs['NotificationCountInTitle']) {
				var count = $('//a[@id="jewelNotif"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'n'); }
			}
			if (counts.length>0) {
				if (document.title.charAt(0) == '(') { document.title = document.title.replace(/^\(.*?\)/, '(' + counts.join(' ') + ')'); }
				else { document.title = '(' + counts.join(' ') + ') ' + document.title; }
			} else {
				document.title = document.title.replace(/^\(.*?\)/, '');
			}
		}
	} catch(x) { logError('Page Title', x); }

	//
	// Reload Error Page
	//
	if (prefs['ErrorPageReload'] && $('#content') && $('#content').innerHTML.toLowerCase().indexOf('error while loading page from')!=-1 && $('#try_again_button')) {
		tryAgainButton=$('#try_again_button');
		if (tryAgainButton.className.indexOf('autoreload')==-1) {
			tryAgainButton.className = tryAgainButton.className + ' autoreload';
			tryAgainButton.value = $l('ReloadErrorPage');
			setTimeout("if (document.getElementById('try_again_button')) { window.location.reload(); }", 5000);
		}
	}

	//
	// Add Protocol Links
	//
	if (prefs['ProtocolLinks'] && (page.match(/profile\.php\?id=.*&v=info/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1) && page.indexOf('v=info')!=-1) && $('#info_section_info_contact') && $('#info_section_info_contact').className.indexOf('fbfhandled')==-1) {
		try {
			$('#info_section_info_contact').className = $('#info_section_info_contact').className + ' ' + 'fbfhandled';
			var dds = $('#info_section_info_contact').getElementsByTagName('dd');
			var dts = $('#info_section_info_contact').getElementsByTagName('dt');
			for (var i=0; i<dds.length; i++) {
				if (dts[i].innerHTML == 'Skype:') { dds[i].innerHTML = '<a href="skype:' + dds[i].innerHTML + '?call" title="' + $l('ProtocolSkype', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Windows Live:') { dds[i].innerHTML = '<a href="msnim:chat?contact=' + dds[i].innerHTML + '" title="' + $l('ProtocolMSN', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Yahoo:') { dds[i].innerHTML = '<a href="ymsgr:sendIM?' + dds[i].innerHTML + '" title="' + $l('ProtocolYahoo', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Google Talk:') { dds[i].innerHTML = '<a href="xmpp:' + dds[i].innerHTML + '" title="' + $l('ProtocolGoogle', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
			}
		} catch(x) { logError('Protocol Links', x); }
	}

	//
	// Load thumbnails for entire album
	//
	if (page.match(/^album.php?/)) {
		try {
			var pager = $('.pagerpro')[0];
			if (pager && pager.className.indexOf(' fbfhandled')==-1) {
				pager.id='fbf_photo_pagination';
				pager.className = pager.className + ' fbfhandled';
				if (prefs['AutoLoadFullAlbum']) {
					loadFullAlbum();
				} else {
					var loadAlbumLink = document.createElement('li');
					loadAlbumLink.className = 'pagerpro_li';
					loadAlbumLink.innerHTML = '<a id="FBFLoadAllPhotos" class="pagerpro_a" href="#" onclick="return false;" title="' + $l('LoadPhotosWarning') + '">' + $l('all') + '</a>';
					pager.insertBefore(loadAlbumLink, pager.lastChild.nextSibling);
					onClick('FBFLoadAllPhotos', function(e) {
						setTimeout(function(){ loadFullAlbum(); }, 0);
					});
				}
			}
		} catch(x) { logError('Album Thumbnails', x); }
	}

	//
	// Load thumbnails for tagged photos
	//
	if (page.match(/^profile.php?.*v=photos/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1 && page.indexOf('v=photos')!=-1)) {
		try {
			var pager = $('.pagerpro')[0];
			if (pager && pager.className.indexOf(' fbfhandled')==-1) {
				pager.id='fbf_photo_pagination';
				pager.className = pager.className + ' fbfhandled';
				if (prefs['AutoLoadTaggedPhotos']) {
					loadTaggedPhotos();
				} else {
					var loadAlbumLink = document.createElement('li');
					loadAlbumLink.className = 'pagerpro_li';
					loadAlbumLink.innerHTML = '<a id="FBFLoadAllPhotos" class="pagerpro_a" href="#" onclick="return false;" title="' + $l('LoadPhotosWarning') + '">' + $l('All') + '</a>';
					pager.insertBefore(loadAlbumLink, pager.lastChild.nextSibling);
					onClick('FBFLoadAllPhotos', function(e) {
						setTimeout(function(){ loadTaggedPhotos(); }, 0);
					});
				}
			}
		} catch(x) { logError('Tagged Photos Thumbnails', x); }
	}

}


}) ();
